<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import { movies, emptyFilters } from '../data'
import type { Filters, Movie } from '../data'

const route = useRoute()
const router = useRouter()
const filters: Filters = JSON.parse(sessionStorage.getItem('filters') || 'null') ?? emptyFilters

function minutes(m: Movie) {
  const [h, min] = m.duration.match(/\d+/g)!.map(Number)
  return h * 60 + min
}

const list = computed(() => {
  const q = String(route.query.q || '').toLowerCase()
  return movies.filter((m) => {
    if (q && !m.title.toLowerCase().includes(q)) return false
    if (filters.genres.length && !filters.genres.some((g) => m.genres.toLowerCase().includes(g.toLowerCase()))) return false
    if (filters.ages.length && !filters.ages.includes(m.age)) return false
    if (filters.countries.length && !filters.countries.some((c) => c.toLowerCase() === m.country.toLowerCase())) return false
    if (filters.ratings.length && !filters.ratings.some((r) => parseFloat(m.rating) > Number(r.slice(1)))) return false
    if (filters.durations.length) {
      const mins = minutes(m)
      const ok = filters.durations.some((d) =>
        d.startsWith('Короткий') ? mins < 40 : d.startsWith('Стандарт') ? mins >= 90 && mins <= 120 : mins > 180,
      )
      if (!ok) return false
    }
    return true
  })
})
</script>

<template>
  <div class="page">
    <p v-if="route.query.q" class="meta">Результаты по запросу «{{ route.query.q }}»</p>

    <div v-for="m in list" :key="m.id" class="card" @click="router.push(`/movie/${m.id}`)">
      <img :src="m.poster" class="poster" />
      <h2>{{ m.title }}</h2>
      <p class="meta">{{ m.rating }} {{ m.year }}, {{ m.genres }}<br />{{ m.country }}, {{ m.duration }}, {{ m.age }}</p>
    </div>

    <div v-if="!list.length" class="empty">
      <p>По вашим фильтрам ничего не найдено</p>
      <UiButton @click="router.push('/')">На главную</UiButton>
      <UiButton variant="secondary" @click="router.push('/filters')">Изменить фильтры</UiButton>
    </div>
  </div>
</template>

<style scoped>
.card { display: flex; flex-direction: column; gap: 8px; cursor: pointer; }
.poster { width: 100%; height: 200px; object-fit: cover; }
h2 { font-size: 20px; }
.empty { margin: auto; display: flex; flex-direction: column; gap: 12px; text-align: center; }
</style>