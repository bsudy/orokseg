import { useEffect, useRef } from "react";
import * as topola from "topola";

import { generateQuerySelectorFor } from "../utils/dom";
import { max, min } from "d3-array";
import { useNavigate } from "react-router-dom";
import { DetailedWithPageNumberRenderer } from "./charts/DetailedWithPageNumberRenderer";
import { createChart, OroksegJsonGedcomData } from "./charts/OroksegChart";

interface FamilyTreeProps {
  tree: OroksegJsonGedcomData;
  onClickOnPerson?: (id: string) => void;
  onClickOnFamily?: (id: string) => void;
  animate?: boolean;
}

export const FamilyTree = ({
  tree,
  onClickOnPerson,
  onClickOnFamily,
  animate = true,
}: FamilyTreeProps) => {
  const navigate = useNavigate();

  const chartRef = useRef<topola.ChartHandle | null>(null);
  const svgRef = useRef<SVGGElement>(null);

  async function renderChart() {
    if (!svgRef.current) {
      console.error("svgRef is not set");
      return;
    }

    const selector = generateQuerySelectorFor(svgRef.current);

    if (!chartRef.current) {
      // topola.
      const chart = createChart({
        json: tree,
        chartType: topola.HourglassChart,
        renderer: DetailedWithPageNumberRenderer,
        animate,
        updateSvgSize: false,
        svgSelector: selector,
        famCallback: (info) => {
          if (onClickOnFamily) {
            onClickOnFamily(info.id);
          }
        },
        indiCallback: (info) => {
          if (onClickOnPerson) {
            onClickOnPerson(info.id);
          } else {
            navigate(`/people/tree/${info.id}`);
          }
        },
      });

      chartRef.current = chart;
    } else {
      chartRef.current.setData(tree);
    }

    const chartInfo = chartRef.current.render();

    const svg = svgRef.current;
    const svgParent = svg.parentElement! as Element as SVGElement;
    // TODO this is a hack to get the parent div
    const parent = svgParent.parentElement!
      .parentElement! as Element as HTMLDivElement;

    const xScale = parent.clientWidth / chartInfo.size[0];
    const yScale = parent.clientHeight / chartInfo.size[1];

    // Maximum scale is 1.4. Otherwise the chart can get too big.
    const scale = min([xScale, yScale, 1.4]) || 1;

    const offsetX = -(chartInfo.size[0] - chartInfo.size[0] * scale) / 2;
    const offsetY = -(chartInfo.size[1] - chartInfo.size[1] * scale) / 2;

    svgParent.style.setProperty("transform-delay", "200ms");
    svgParent.style.setProperty("transform-duration", "500ms");
    svgParent.style.setProperty("width", chartInfo.size[0] + "px");
    svgParent.style.setProperty("height", chartInfo.size[1] + "px");
    svgParent.style.setProperty("scale", `${scale}`);
    svgParent.parentElement!.style.setProperty(
      "width",
      chartInfo.size[0] * scale + "px",
    );
    svgParent.parentElement!.style.setProperty(
      "height",
      chartInfo.size[1] * scale + "px",
    );

    svgParent.style.setProperty(
      "transform",
      `translate(${offsetX / scale}px, ${offsetY / scale}px)`,
    );
  }

  useEffect(() => {
    renderChart();
  }, [tree]);

  return (
    <div className="chartContainer">
      <svg className="chartSvg">
        <g className="chart" ref={svgRef} />
      </svg>
    </div>
  );
};
