<script setup>
import Citation from './Citation.vue'
import { store } from '../store.js'
</script>

<template>
  <div class="citation-list">
    <Citation v-for="citation in store.citations" :citation="citation"/>
  </div>
</template>
