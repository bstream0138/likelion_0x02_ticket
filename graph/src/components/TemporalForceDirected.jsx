import * as d3 from "d3";
// import { ForceGraph } from "@d3/force-directed-graph-component";
import { useEffect, useRef, useState } from "react";

const TemporalForceDirected = () => {
  const [data, setData] = useState([10, 20, 30, 40, 50]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current); // selection 객체

    svg
      .selectAll("circle")
      .data(data)
      .join(
        (enter) => enter.append("circle"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
      <button
        onClick={() => {
          setData(data.map((el) => el + 5));
        }}
      >
        increase + 5
      </button>
      <button
        onClick={() => {
          setData(data.filter((el) => el > 35));
        }}
      >
        filter circle r should gt 35
      </button>
    </>
  );
};

export default TemporalForceDirected;
