<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as d3 from 'd3'

const { data, width = 400, height = 200 } = defineProps<{
  data: number[],
  width?: number,
  height?: number
}>()

const svg = ref<unknown>(null)

const drawChart = () => {
  const svgEl = d3.select(svg.value)
  svgEl.selectAll('*').remove() // Clear previous renders

  svgEl.attr('width', width).attr('height', height)

  const x = d3
    .scaleBand()
    .domain(data.map((d, i) => i))
    .range([0, width])
    .padding(0.1)

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .nice()
    .range([height, 0])

  svgEl
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (_, i) => x(i))
    .attr('y', d => y(d))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d))
    .attr('fill', 'steelblue')
}

onMounted(drawChart)
watch(() => data, drawChart)
</script>

<template>
  <svg ref="svg"></svg>
</template>

