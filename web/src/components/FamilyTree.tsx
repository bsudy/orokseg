import { useEffect, useRef } from "react";
import * as topola from "topola";

import { generateQuerySelectorFor } from "../utils/dom";
import { max } from "d3-array";
import { JsonGedcomData } from "topola";
import { useNavigate } from "react-router-dom";

interface FamilyTreeProps {
  tree: JsonGedcomData;
  onClickOnPerson?: (id: string) => void;
  animate?: boolean;
}

export const FamilyTree = ({
  tree,
  onClickOnPerson,
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
      const chart = topola.createChart({
        json: tree,
        chartType: topola.HourglassChart,
        renderer: topola.DetailedRenderer,
        animate,
        updateSvgSize: false,
        svgSelector: selector,
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
    const parent = svgParent.parentElement! as Element as HTMLDivElement;
    const area = parent.getBoundingClientRect();
    // console.log("area", area);

    const scale = 1.4;
    const offsetX =
      max([0, (parent.clientWidth - chartInfo.size[0] * scale) / 2]) || 0;
    const offsetY =
      max([0, (parent.clientHeight - chartInfo.size[1] * scale) / 2]) || 0;

    svgParent.style.setProperty("transform-delay", "200ms");
    svgParent.style.setProperty("transform-duration", "500ms");
    svgParent.style.setProperty("width", chartInfo.size[0] + "px");
    svgParent.style.setProperty("height", chartInfo.size[1] + "px");
    svgParent.style.setProperty("scale", `${scale}`);
    // console.log("transform", `translate(${offsetX}px, ${offsetY}px)`);
    // svgParent.style.setProperty(
    //   "transform",
    //   `translate(${offsetX / scale}px, ${offsetY / scale}px)`,
    // );
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
