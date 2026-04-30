<script setup lang="js">
  import { store } from '../store.js'

  import { Chart, LinearScale, PointElement } from 'chart.js'
  import { ForceDirectedGraphController, EdgeLine, Chart } from 'chartjs-chart-graph'
  import { ChartD } from 'chartjs-plugin-datalabels';
  Chart.register(ForceDirectedGraphController, LinearScale, PointElement, EdgeLine)
  import miserables from './miserables.json';
  import { onMounted } from 'vue';

  onMounted(() => {
    let x = document.getElementById("my-chart-id");
    new Chart(x, {
      type: 'forceDirectedGraph',
      data: {
        labels: store.graphData.nodes.map((d) => d.id),
        datasets: [{
          pointBackgroundColor: 'steelblue',
          pointRadius: 20,
          hoverRadius: 22,
          edgeLineBorderWidth: 10,
          data: store.graphData.nodes,
          edges: store.graphData.links
        }],
      }
    });
  });
</script>

<template>
  <canvas id="my-chart-id"></canvas>
</template>