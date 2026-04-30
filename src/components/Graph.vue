<script setup lang="js">
  import Graph from 'graphology';
  import Sigma from 'sigma';
  import forceAtlas2 from 'graphology-layout-forceatlas2';
  import { onMounted, onBeforeUnmount, watch } from 'vue';
  import { store } from '../store.js'
  import { animateNodes } from "sigma/utils";

  const generateGraph = () => {
    const graph = new Graph();

    store.graphData.nodes.forEach(node => {
      graph.addNode(node.id, { label: node.code, forceLabel: false, x: Math.random(), y: Math.random(), size: 10, color: "blue" });
    });

    store.graphData.links.forEach(link => {
      graph.addEdge(link.source, link.target, { size: link.value / 1000, color: "grey" });
    });
    return graph;
  }

  let hoverState = {};

  const setupListeners = (renderer) => {
    const setHoveredNode = (node) => {
      if (node) {
        hoverState.hoveredNode = node;
        hoverState.hoveredNeighbors = new Set(renderer.graph.neighbors(node));
      }

      if (!node) {
        hoverState.hoveredNode = undefined;
        hoverState.hoveredNeighbors = undefined;
      }

      renderer.refresh({
        skipIndexation: true,
      });
    }

    renderer.on("enterNode", ({ node }) => {
      setHoveredNode(node);
    });

    renderer.on("leaveNode", () => {
      setHoveredNode(undefined);
    });
  }

  const setupRendererSettings = (renderer) => {
    renderer.setSettings({
      enableCameraZooming: false,
      enableCameraPanning: false,
      enableCameraRotation: false,
      labelRenderedSizeThreshold: 1000
    });

    renderer.setSetting("nodeReducer", (node, data) => {
      const res = { ...data };

      if (hoverState.hoveredNeighbors && !hoverState.hoveredNeighbors.has(node) && hoverState.hoveredNode !== node) {
        res.label = "";
        res.color = "#f6f6f6";
      }
      return res;
    });

    renderer.setSetting("edgeReducer", (edge, data) => {
      const res = { ...data };

      if (
        hoverState.hoveredNode &&
        !renderer.graph.extremities(edge).every((n) => n === hoverState.hoveredNode || renderer.graph.areNeighbors(n, hoverState.hoveredNode))
      ) {
        res.hidden = true;
      }
      return res;
    });
  }

  const moveNodes = (renderer) => {
    const positions = forceAtlas2(renderer.graph, {iterations: 1000});

    animateNodes(renderer.graph, positions, { duration: 2000 }, () => {
      renderer.setSetting("labelRenderedSizeThreshold", 0); // this is causing errors in console when firing after the tab is closed / if we re-render the graph before this has fired.
    });
  }
  let renderer;

  const run = () => {
    if (store.graphData == null) {
      return;
    }
    const graph = generateGraph();
    renderer = new Sigma(graph, document.getElementById("container"));
    setupListeners(renderer);
    setupRendererSettings(renderer);
    moveNodes(renderer);
  }

  onMounted(() => {
    run();
  });

  // Watch for changes in graphData and re-render only when it changes
  watch(() => [store.graphData], () => {
    if (renderer) {
      renderer.kill();
    }
    run();
  });

  onBeforeUnmount(() => {
    if (renderer) {
      renderer.kill();
    }
  })
</script>

<template>
  <div id="container" style="background: white; height: 100%"></div>
  
</template>