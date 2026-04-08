<script setup lang="ts">
import ImageThumbnail from './ImageThumbnail.vue'

defineProps({
  citation: Object
})
</script>

<template>
  <div class="citation-card">
    <div class="citation-title">
      {{ citation.title }}
    </div>
    <div class="citation-meta">
      <strong>Journal:</strong> {{ citation.journal }}<br>
      <strong>Date:</strong> {{ citation.published_date }}<br>
      <strong>Author:</strong> {{ citation.authors }}
    </div>
    <span class="citation-readmore">Read more</span>
    <div class="citation-icons">
      <ImageThumbnail v-for="url in citation.image_urls" :url="url"/>
    </div>
    <div class="citation-tags">
      <span class="citation-tag">WB</span>
      <span class="citation-tag">Liver</span>
      <span class="citation-tag">Mus Musculus (House Mouse)</span>
    </div>
  </div>
</template>

<style scoped>

</style>
