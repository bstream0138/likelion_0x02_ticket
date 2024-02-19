import * as d3 from "d3";
import { useEffect, useRef } from "react";
import data from "../data/data.json";

const ForceDirected = () => {
  const svgRef = useRef();

  const links = data.links.map((d) => ({ ...d }));
  const nodes = data.nodes.map((d) => ({ ...d }));

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    const width = 1000;
    const height = 1000;

    // 애니메이션
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-100)) // 노드들이 서로 밀치는 힘
      .force("center", d3.forceCenter(width / 2, height / 2)) // 노드들을 중앙으로
      .on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
        node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      });

    // 그래프 컨테이너
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // 연결선
    const link = svg
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "black")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    // 노드
    const node = svg
      .selectAll("g")
      .data(nodes)
      .join("g")
      .each(function (d) {
        d3.select(this).append("circle").attr("r", 10).attr("fill", color);
        d3.select(this)
          .append("text")
          .text((d) => d.id)
          .attr("x", -5)
          .attr("y", 5);
      });
  }, [nodes, links]);
  return <svg ref={svgRef} />;
};

export default ForceDirected;
