<script setup lang="ts">
import { useRoute } from 'vue-router'
import UiHeader from './components/UiHeader.vue'

const route = useRoute()
</script>

<template>
  <UiHeader v-if="!route.path.startsWith('/payment')" />
  <RouterView />
</template>