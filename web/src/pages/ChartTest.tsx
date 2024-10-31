import { useEffect, useId, useRef } from "react";
import * as d3 from "d3";
import { Widgets } from "@mui/icons-material";

class FanChart {

  private svg: d3.Selection<SVGGElement, unknown, null, undefined>;
  private width: number;
  // private height: number;
  private num_of_levels: number;

  private full_arc = Math.PI * 0.98;
  private center_radius = 1;
  private padding = 2; // Padding between arcs

  private simpleArcHeight;
  private familyArcHeight;
  private highArcHeight;
  private highArcMinLevel;

  constructor(svg: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, num_of_levels: number) {
    this.svg = svg;
    this.width = width;
    // this.height = this.width / (2 * (num_of_levels + this.center_radius));
    const simpleArcHeightWeight = 1;
    const familyArcHeightWeight = 0.25;
    const highArcHeightWeight = 2;
    const highArcMinLevel = 3;

    const divider = (simpleArcHeightWeight + familyArcHeightWeight + 2 * this.padding) * Math.min(num_of_levels, highArcMinLevel) * simpleArcHeightWeight
      + (highArcHeightWeight + familyArcHeightWeight + this.padding) * Math.max(0, num_of_levels - highArcMinLevel) + 0.5;

    this.simpleArcHeight = (this.width / divider) * simpleArcHeightWeight;
    this.familyArcHeight = (this.width / divider) * familyArcHeightWeight;
    this.highArcHeight = (this.width / divider) * highArcHeightWeight;
    this.highArcMinLevel = highArcMinLevel;
    this.num_of_levels = num_of_levels;
  }

  private addText(arc: d3.Arc<any, d3.DefaultArcObject>, placement: number, maxFontSize: number, text: string, text1PathId: string) {
    //@ts-ignore
    const innnerRadius: number = arc.innerRadius()();
    //@ts-ignore
    const outerRadius: number = arc.outerRadius()();
    //@ts-ignore
    const startAngle: number = arc.startAngle()();
    //@ts-ignore
    const endAngle: number = arc.endAngle()();
    const text1Radius = innnerRadius + (outerRadius - innnerRadius) * placement;
    const text1Arc = d3.arc()
      .innerRadius(text1Radius)
      .outerRadius(text1Radius)
      .startAngle(startAngle)
      .endAngle(endAngle);
      

    this.svg.append("path")
      .attr("id", text1PathId)
      .attr("d", text1Arc as unknown as string)
      // .attr("stroke", "black")
      // .attr("stroke-width", 2) // Add border width
      .attr("fill", "none");
      
    // @ts-ignore
    const textPathLength = this.svg.select(`#${text1PathId}`).node().getTotalLength() * 0.45;
    if (textPathLength < outerRadius - innnerRadius) {
      const increment = (endAngle - startAngle) * 2;
      //@ts-ignore
      const centroid = arc.centroid({ startAngle: startAngle + increment, endAngle: endAngle + increment });
      const angle = (startAngle + endAngle) / 2 * (180 / Math.PI) + 90;
      const maxTextLength = (outerRadius - innnerRadius) * 0.9;


      const text1Element = this.svg.append("text")
        .attr("x", centroid[0])
        .attr("y", centroid[1])
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("transform", `rotate(${angle}, ${centroid[0]}, ${centroid[1]})`)
        .text(text);
      
      
      // Adjust the font size to fit the text within the path
      // @ts-ignore
      let textLength = text1Element.node().getComputedTextLength();
      let text1FontSize = Math.min(maxFontSize, (maxTextLength / textLength) * 16); // Adjust the base font size as needed
      text1Element.style("font-size", `${text1FontSize}px`);
      
      while (true) {
        //@ts-ignore
        const textLength = text1Element.node().getComputedTextLength();
        if (textLength > maxTextLength) {
          text1FontSize *= 0.9;   
          text1Element.style("font-size", `${text1FontSize}px`);
        } else {
          break;
        }
      }
      
      return text1Element;
    } else {

      
      // console.log(`Text path length: ${textPathLength} on level ${l} and person ${i}`);
      
      const text1Element = this.svg.append("text")
      .append("textPath")
      .attr("xlink:href", `#${text1PathId}`)
      .attr("startOffset", "25%") // Center the text along the path
      .attr("text-anchor", "middle")
      // .attr("textLength", textPathLength)
      // .attr("lengthAdjust", "spacingAndGlyphs")
      .text(text);
      
      
      // Adjust the font size to fit the text within the path
      // @ts-ignore
      let textLength = text1Element.node().getComputedTextLength();
      let text1FontSize = Math.min(maxFontSize, (textPathLength / textLength) * 16); // Adjust the base font size as needed
      text1Element.style("font-size", `${text1FontSize}px`);
      
      while (true) {
        //@ts-ignore
        const textLength = text1Element.node().getComputedTextLength();
        if (textLength > textPathLength) {
          text1FontSize *= 0.9;   
          text1Element.style("font-size", `${text1FontSize}px`);
        } else {
          break;
        }
      }
      return text1Element;
    }
    
  }

  private addFamilyArc(level: number, i: number, text: string | undefined = undefined) {
    const num_of_families = 2 ** level;

    const startAngle = (this.full_arc / num_of_families) * i - this.full_arc / 2;
    const endAngle = (this.full_arc / num_of_families) * (i + 1) - this.full_arc / 2;

    const innerRadius = (this.simpleArcHeight + this.familyArcHeight + this.padding) * Math.min(level, this.highArcMinLevel) + this.simpleArcHeight * 0.5 + this.padding;
    const outerRadius = innerRadius + this.familyArcHeight;

    const arcG = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)
        .cornerRadius(10); // Add corner radius
      
    const pathId = `familyArcPath${level}-${i}`;

    const path = this.svg.append("path")
      .attr("id", pathId)
      .attr("d", arcG as unknown as string)
      .attr("fill", "none")
      .attr("stroke", i % 2 === 0 ? "green" : "pink")
      .attr("stroke-width", 2); // Add border width
    
    
    
    if (text !== undefined) {
      // @ts-ignore
      const maxTextLength = this.svg.select(`#${pathId}`).node().getTotalLength() * 0.45;
    
      const text1Element = this.svg.append("text")
        .append("textPath")
        .attr("xlink:href", `#${pathId}`)
        .attr("startOffset", "25%") // Center the text along the path
        .attr("text-anchor", "middle")
        // .attr("textLength", textPathLength)
        // .attr("lengthAdjust", "spacingAndGlyphs")
        .text(text);
    }
    
  }

  private addPersonArc(level: number, i: number, text1: string, text2: string) {
    const num_of_people = 2 ** (level + 1);

    const startAngle = (this.full_arc / num_of_people) * i - this.full_arc / 2;
    const endAngle = (this.full_arc / num_of_people) * (i + 1) - this.full_arc / 2;

    const innerRadius = (this.simpleArcHeight + this.familyArcHeight + this.padding) * Math.min(level, this.highArcMinLevel) +
      (this.highArcHeight + this.familyArcHeight + this.padding) * Math.max(0, level - this.highArcMinLevel) + this.simpleArcHeight * 0.5 + this.familyArcHeight + this.padding;
    // console.log(level, this.highArcMinLevel, innerRadius, this.simpleArcHeight, this.familyArcHeight, this.highArcHeight);

    // const innnerRadius = this.height * level + (this.height / 2) * this.center_radius + this.padding;
    const outerRadius = innerRadius + (level < this.highArcMinLevel ? this.simpleArcHeight : this.highArcHeight);

    const arcG = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)
        .cornerRadius(10); // Add corner radius
      
    const pathId = `arcPath${level}-${i}`;


    this.svg.append("path")
      .attr("id", pathId)
      .attr("d", arcG as unknown as string)
      .attr("fill", "none")
      .attr("stroke", i % 2 === 0 ? "blue" : "red")
      .attr("stroke-width", 2); // Add border width
    
    // TODO generate better id
    if (text1 !== undefined) {
      const text1El = this.addText(arcG, 0.6, 16, `Lorem Ipsum Test text ${i + 1}`, `text1-${level}-${i}`);
      const text1FontSize = Number.parseInt(text1El.style("font-size").replace("px", ""));
      if (text2 !== undefined) {
        this.addText(arcG, 0.3, text1FontSize * 0.8, `Subtext ${i + 1}`, `text2-${level}-${i}`);
      }
    }
  }

  public render() {
    for (let l = 0; l < this.num_of_levels; l++) {
      for (let familyIdx = 0; familyIdx < 2**l; familyIdx++) {
        console.log(l, familyIdx);
        this.addFamilyArc(l, familyIdx, `Family ${familyIdx + 1}`);
        this.addPersonArc(l, familyIdx * 2, `Lorem Ipsum Test text`, `Subtext`);
        this.addPersonArc(l, familyIdx * 2 + 1, `Lorem Ipsum Test text`, `Subtext`);
      }
    }
  }

}


export function ChartTest() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 1000;
    const num_of_levels = 4;
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", width / 2)
      .append("g")
      .attr("transform", `translate(${width/2}, ${width/2})`);

    const fanChart = new FanChart(svg, width, num_of_levels);
    fanChart.render();
  }, []);

  return (
    <div id="chartTest">
      <h1>Hello World!</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
}