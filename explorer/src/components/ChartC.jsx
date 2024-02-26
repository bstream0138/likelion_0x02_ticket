import React from 'react';
import { useEffect, useRef } from "react";

import * as d3 from "d3";
import data_KOPIS from "../data/data_KOPIS.json";


const ChartC = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 400;
    const margin = { top:20, left:90, right:30, bottom:40}

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    
    const xScale = d3.scaleBand()
      .domain(data_KOPIS.map(d => d.period))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data_KOPIS, d => Math.max(d.sales_count, d.cancellation_count))])
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    svg.selectAll(".bar-sales")
      .data(data_KOPIS)
      .join("rect")
      .attr("class", "bar-sales")
      .attr("x", d => xScale(d.period))
      .attr("y", d => yScale(d.sales_count))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", d => height - margin.bottom - yScale(d.sales_count))
      .attr("fill", "green");

    svg.selectAll(".bar-cancellation")
      .data(data_KOPIS)
      .join("rect")
      .attr("class", "bar-cancellation")
      .attr("x", d => xScale(d.period) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.cancellation_count))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", d => height - margin.bottom - yScale(d.cancellation_count))
      .attr("fill", "orange");
  }, []);

  return <svg ref={svgRef} />;
};

export default ChartC;
