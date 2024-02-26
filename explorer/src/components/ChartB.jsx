import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data_KOPIS from '../data/data_KOPIS.json';

//https://www.kopis.or.kr/por/stats/perfo/prefoStatsPerformance.do?menuId=MNU_000151&searchWord=&searchType=total

const ChartB = () => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 60, bottom: 60, left: 60 };
    const svgWidth = 800;
    const svgHeight = 400;
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
                  .attr("width", svgWidth)
                  .attr("height", svgHeight);

    // X 축 스케일 설정
    const xScale = d3.scaleBand()
                      .range([0, chartWidth])
                      .domain(data_KOPIS.map(d => d.period))
                      .padding(0.1);

    // Y 축 스케일 설정 (좌측 - 티켓 판매수)
    const yScaleLeft = d3.scaleLinear()
                         .range([chartHeight, 0])
                         .domain([0, d3.max(data_KOPIS, d => d.total_ticket_sales_count)]);

    // Y 축 스케일 설정 (우측 - 티켓 판매액)
    const yScaleRight = d3.scaleLinear()
                          .range([chartHeight, 0])
                          .domain([0, d3.max(data_KOPIS, d => d.total_ticket_sales_amount)]);

    // 축을 그립니다.
    svg.append("g")
       .attr("transform", `translate(${margin.left}, ${chartHeight + margin.top})`)
       .call(d3.axisBottom(xScale).tickSizeOuter(0));

    svg.append("g")
       .attr("transform", `translate(${margin.left}, ${margin.top})`)
       .call(d3.axisLeft(yScaleLeft));

    svg.append("g")
       .attr("transform", `translate(${svgWidth - margin.right}, ${margin.top})`)
       .call(d3.axisRight(yScaleRight));

    // 판매수 데이터로 바 차트를 그립니다.
    svg.selectAll(".bar")
       .data(data_KOPIS)
       .join("rect")
       .attr("class", "bar")
       .attr("x", d => xScale(d.period) + margin.left)
       .attr("y", d => yScaleLeft(d.total_ticket_sales_count) + margin.top)
       .attr("width", xScale.bandwidth())
       .attr("height", d => chartHeight - yScaleLeft(d.total_ticket_sales_count))
       .attr("fill", "steelblue");

    // 판매액 데이터로 라인 차트를 그립니다.
    const lineGenerator = d3.line()
                            .x(d => xScale(d.period) + margin.left + xScale.bandwidth() / 2)
                            .y(d => yScaleRight(d.total_ticket_sales_amount) + margin.top)
                            .curve(d3.curveMonotoneX); // 라인을 부드럽게 만듭니다.

    svg.append("path")
       .datum(data_KOPIS)
       .attr("fill", "none")
       .attr("stroke", "red")
       .attr("stroke-width", 2)
       .attr("d", lineGenerator);
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default ChartB;
