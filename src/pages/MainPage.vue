<script setup lang="ts">
import { useRouter } from 'vue-router'
import { mainBanner, mainRows } from '../data'

const router = useRouter()
</script>

<template>
  <div class="main">
    <h1>Новинки</h1>
    <img :src="mainBanner.img" class="banner" @click="router.push(`/movie/${mainBanner.movieId}`)" />

    <template v-for="row in mainRows" :key="row.title">
      <h1>{{ row.title }}</h1>
      <div class="row">
        <img
          v-for="item in row.items"
          :key="item.img"
          :src="item.img"
          @click="router.push(`/movie/${item.movieId}`)"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.main { display: flex; flex-direction: column; gap: 12px; padding: 12px 0; }
h1 { padding: 0 12px; }
.banner { width: 100%; object-fit: cover; cursor: pointer; }
.row { display: flex; gap: 11px; padding: 0 12px; overflow-x: auto; }
.row img { height: 174px; cursor: pointer; }
</style>