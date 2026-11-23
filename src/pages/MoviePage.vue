<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import { movies } from '../data'

const route = useRoute()
const router = useRouter()
const movie = movies.find((m) => m.id === Number(route.params.id))!
</script>

<template>
  <div class="page">
    <UiButton variant="secondary" class="back" @click="router.back()">Назад</UiButton>
    <img :src="movie.hero || movie.poster" class="hero" />
    <h1>{{ movie.title }}</h1>
    <p class="meta">{{ movie.rating }} {{ movie.year }}, {{ movie.genres }}<br />{{ movie.country }}, {{ movie.duration }}, {{ movie.age }}</p>
    <UiButton @click="router.push(`/sessions/${movie.id}`)">Купить билеты</UiButton>
    <p v-if="movie.premiere">Премьера: {{ movie.premiere }}</p>
    <p v-if="movie.cast">В главных ролях: {{ movie.cast }}</p>
    <p v-if="movie.description">{{ movie.description }}</p>
    <template v-if="movie.trailer">
      <h1>Трейлеры и тизеры</h1>
      <img :src="movie.trailer" class="trailer" />
    </template>
  </div>
</template>

<style scoped>
.back { align-self: flex-start; height: 33px; }
.hero { width: 100%; height: 263px; object-fit: cover; }
.trailer { width: 100%; height: 204px; object-fit: cover; border-radius: 12px; }
</style>