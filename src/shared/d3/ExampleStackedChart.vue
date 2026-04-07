<script setup lang="ts">
import {onMounted, ref, useTemplateRef, watch} from 'vue'
import * as d3 from 'd3'

const data = [
  {date: new Date("2015-01-01"), fruit: "apples", sales: 3840},
  {date: new Date("2015-01-01"), fruit: "bananas", sales: 1920},
  {date: new Date("2015-01-01"), fruit: "cherries", sales: 960},
  {date: new Date("2015-01-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-02-01"), fruit: "apples", sales: 1600},
  {date: new Date("2015-02-01"), fruit: "bananas", sales: 1440},
  {date: new Date("2015-02-01"), fruit: "cherries", sales: 960},
  {date: new Date("2015-02-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-03-01"), fruit: "apples", sales: 640},
  {date: new Date("2015-03-01"), fruit: "bananas", sales: 960},
  {date: new Date("2015-03-01"), fruit: "cherries", sales: 640},
  {date: new Date("2015-03-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-04-01"), fruit: "apples", sales: 320},
  {date: new Date("2015-04-01"), fruit: "bananas", sales: 480},
  {date: new Date("2015-04-01"), fruit: "cherries", sales: 640},
  {date: new Date("2015-04-01"), fruit: "durians", sales: 400}
];

const svgRef = useTemplateRef('example-stacked-chart')

const drawChart = () => {
  const series = d3.stack()
    .keys(d3.union(data.map(d => d.fruit))) // apples, bananas, cherries, …
    .value(([, group], key) => group.get(key).sales)
    (d3.index(data, d => d.date, d => d.fruit));
  const width = 500;
  const height = 300;
  const margin = {top: 20, right: 20, bottom: 30, left: 40};

// grupowanie danych po dacie
  const indexed = d3.index(data, d => d.date, d => d.fruit);

// domena X (daty)
  const x = d3.scaleBand()
    .domain(Array.from(indexed.keys()))
    .range([margin.left, width - margin.right])
    .padding(0.1);

// max Y (suma stacka)
  const maxY = d3.max(series, s => d3.max(s, d => d[1])) ?? 0;

// skala Y
  const y = d3.scaleLinear()
    .domain([0, maxY])
    .range([height - margin.bottom, margin.top]);

// kolory
  const color = d3.scaleOrdinal()
    .domain(series.map(d => d.key))
    .range(d3.schemeCategory10);

  const svg = d3.select(svgRef.value)

  svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(D => D)
    .join("rect")
    .attr("x", d => x(d.data[0]))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth());
}


onMounted(drawChart)
watch(() => data, drawChart)
</script>

<template>
  <svg ref="example-stacked-chart"></svg>
</template>

