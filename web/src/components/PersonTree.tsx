import { useEffect, useRef } from "react";
import { MediumRef, Person } from "../gql/graphql";
import * as topola from "topola";

import { generateQuerySelectorFor } from "../utils/dom";
import { displayFirstname, displaySurname } from "../utils/name";
import { Maybe } from "graphql/jsutils/Maybe";
import { max } from "d3-array";
import { select } from "d3-selection";
import client from "../apolloClient";
import {
  gedcomEntriesToJson,
  JsonFam,
  JsonGedcomData,
  JsonImage,
  JsonIndi,
} from "topola";
import { useNavigate } from "react-router-dom";
import { getCutout } from "../utils/medium";
// import {
//   D3ZoomEvent,
//   zoom,
//   ZoomBehavior,
//   ZoomedElementBaseType,
//   zoomTransform,
// } from 'd3-zoom';

const data = {
  indis: [
    {
      id: "I1",
      firstName: "John",
      lastName: "Smith",
      famc: "F1",
    },
    {
      id: "I2",
      firstName: "Peter",
      lastName: "Smith",
      fams: ["F1"],
    },
    {
      id: "I3",
      firstName: "Laura",
      lastName: "Abbot",
      fams: ["F1"],
      sex: "F",
      birth: {
        date: {
          day: 31,
          month: 5,
          year: 1443,
        },
        place: "Bletsoe",
      },
      death: {
        confirmed: true,
        date: {
          day: 29,
          month: 6,
          year: 1509,
        },
      },
    },
  ],
  fams: [
    {
      id: "F1",
      husb: "I2",
      wife: "I3",
      children: ["I1"],
      marriage: {
        date: {
          day: 1,
          month: 5,
          year: 1464,
        },
        place: "Grafton Regis, Northamptonshire",
      },
    },
  ],
};

interface PersonTreeProps {
  person: Person;
}

async function toImg(mediumRef: MediumRef): Promise<JsonImage> {
  return {
    url: await getCutout(mediumRef),
    title: mediumRef.medium.description || "",
  };
}

async function toTopolaIndi(person: Person): Promise<JsonIndi> {
  const images = [];
  if (person.mediumRefs) {
    images.push(await toImg(person.mediumRefs[0]));
  }
  return {
    id: person.grampsId,
    firstName: displayFirstname(person.name),
    lastName: displaySurname(person.name),
    // famc: null,
    fams: [],
    images,
  };
}

async function toTopolaData(person: Person): Promise<JsonGedcomData> {
  const indis = {} as Record<string, JsonIndi>;
  const fams = {} as Record<string, JsonFam>;

  async function processPerson(person?: Person | Maybe<Person>) {
    if (!person) {
      return;
    }
    if (!Object.keys(indis).includes(person.grampsId)) {
      indis[person.grampsId] = await toTopolaIndi(person);
    }
  }

  await processPerson(person);
  await Promise.all(
    (person.families || []).map(async (family) => {
      if (!Object.keys(fams).includes(family.grampsId)) {
        fams[family.grampsId] = {
          id: family.grampsId,
          husb: family.father?.grampsId,
          wife: family.mother?.grampsId,
          children: family.children
            ?.map((child) => child.person?.grampsId)
            .filter((id) => id !== undefined) as string[] | undefined,
        };
        await processPerson(family.father);
        await processPerson(family.mother);
      }

      await Promise.all(
        (family.children || []).map(async (child) => {
          if (
            child.person &&
            !Object.keys(indis).includes(child.person?.grampsId)
          ) {
            await processPerson(child.person!);
          }
          indis[child.person!.grampsId].famc = family.grampsId;
        }),
      );
      // TODO what if not single parents? Shall we take the first one.
      indis[person.grampsId].fams?.push(family.grampsId);
    }),
  );

  await Promise.all(
    (person.parentFamilies || []).map(async (family) => {
      if (!Object.keys(fams).includes(family.grampsId)) {
        fams[family.grampsId] = {
          id: family.grampsId,
          husb: family.father?.grampsId,
          wife: family.mother?.grampsId,
          children: family.children
            ?.map((child) => child.person?.grampsId)
            .filter((id) => id !== undefined) as string[] | undefined,
        };
        await processPerson(family.father);
        await processPerson(family.mother);
      }
      indis[person.grampsId].famc = family.grampsId;
    }),
  );

  const topolaData = {
    indis: Object.values(indis),
    fams: Object.values(fams),
  };

  console.log(topolaData);

  return topolaData;
}

export const PersonTree = ({ person }: PersonTreeProps) => {
  const navigate = useNavigate();

  const chartRef = useRef<topola.ChartHandle | null>(null);
  const svgRef = useRef<SVGGElement>(null);
  console.log("PersonTree component for", person.grampsId);

  async function renderChart() {
    console.log("PersonTree inital render for", person.grampsId);
    if (!svgRef.current) {
      console.error("svgRef is not set");
      return;
    }

    const selector = generateQuerySelectorFor(svgRef.current);

    if (!chartRef.current) {
      const chart = topola.createChart({
        json: await toTopolaData(person),
        chartType: topola.HourglassChart,
        renderer: topola.DetailedRenderer,
        animate: true,
        updateSvgSize: false,
        svgSelector: selector,
        // indiUrl: '/people/tree/${id}',
        indiCallback: (info) => {
          console.log("indiCallback", info);
          navigate(`/people/tree/${info.id}`);
        },
      });
      chartRef.current = chart;
    } else {
      chartRef.current.setData(await toTopolaData(person));
    }

    const chartInfo = chartRef.current.render();

    const svg = svgRef.current;
    const svgParent = svg.parentElement! as Element as SVGElement;
    const parent = svgParent.parentElement! as Element as HTMLDivElement;
    const area = parent.getBoundingClientRect();
    console.log("area", area);

    const scale = 1.4;
    const dx = parent.clientWidth / 2 - chartInfo.origin[0] * scale;
    const dy = parent.clientHeight / 2 - chartInfo.origin[1] * scale;
    const offsetX =
      max([0, (parent.clientWidth - chartInfo.size[0] * scale) / 2]) || 0;
    const offsetY =
      max([0, (parent.clientHeight - chartInfo.size[1] * scale) / 2]) || 0;

    // console.log('constiner.Height', parent.clientHeight);
    // console.log('svgParent.height', svgParent.clientHeight);
    // console.log('svg.height', svg.clientHeight);
    // console.log('chartInfo.height', chartInfo.size[1]);
    // console.log('chartInfo.height (after scaling)', chartInfo.size[1] * scale);
    // console.log('difference', (parent.clientHeight - chartInfo.size[1] * scale));
    // console.log('offsetY', offsetY);

    // console.log('constiner.width', parent.clientWidth);
    // console.log('svgParent.width', svgParent.clientWidth);
    // console.log('svg.width', svg.clientWidth);
    // console.log('chartInfo.width', chartInfo.size[1]);
    // console.log('chartInfo.width (after scaling)', chartInfo.size[0] * scale);
    // console.log('difference', (parent.clientWidth - chartInfo.size[0] * scale));
    // console.log('offsetX', offsetX);

    svgParent.style.setProperty("transform-delay", "200ms");
    svgParent.style.setProperty("transform-duration", "500ms");
    svgParent.style.setProperty("width", chartInfo.size[0] + "px");
    svgParent.style.setProperty("height", chartInfo.size[1] + "px");
    svgParent.style.setProperty("scale", `${scale}`);
    console.log("transform", `translate(${offsetX}px, ${offsetY}px)`);
    svgParent.style.setProperty(
      "transform",
      `translate(${offsetX / scale}px, ${offsetY / scale}px)`,
    );
  }

  useEffect(() => {
    console.log("PersonTree render for", person.grampsId);
    renderChart();
  }, [person]);

  // useEffect(() => {
  //   console.log('PersonTree initial render for', person.grampsId);
  //   renderChart();
  // }, []);

  return (
    <div id={`PersontTree-${person.grampsId}`}>
      <h1>Person Tree</h1>
      <div
        className="chartContainer"
        style={{ width: "90%", margin: "0 auto", display: "block" }}
      >
        <svg className="chartSvg">
          <g className="chart" ref={svgRef} />
        </svg>
      </div>
    </div>
  );
};
