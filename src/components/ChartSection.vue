<script setup lang="ts">
  import { ref } from 'vue'
  import Map from './Map.vue'
  import Common from './Common.vue'
  import Publication from './Publication.vue'
  import Methods from './Methods.vue'

  // state
  const activeTab = ref('map')

  const setActiveTab = (tab: string) => {
    activeTab.value = tab
  }
</script>

<template>
  <div class="section-title">Charts</div>
  <div class="charts-section">
    <div class="charts-tabs">
      <button :class="{ active: activeTab === 'map'}" @click="setActiveTab('map')">Map</button>
      <button :class="{ active: activeTab === 'common'}" @click="setActiveTab('common')">Commonly used with</button>
      <button :class="{ active: activeTab === 'publication'}" @click="setActiveTab('publication')">Publication</button>
      <button :class="{ active: activeTab === 'methods'}" @click="setActiveTab('methods')">Methods</button>
    </div>

    <Map v-if="activeTab === 'map'" />
    <Common v-if="activeTab === 'common'" />
    <Publication v-if="activeTab === 'publication'" />
    <Methods v-if="activeTab === 'methods'" />
  </div>
</template>