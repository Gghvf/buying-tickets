<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import { movies, pastTickets, cinemaAddress } from '../data'
import type { Ticket } from '../data'

const route = useRoute()
const router = useRouter()
const id = Number(route.query.id)
const tickets: Ticket[] = JSON.parse(sessionStorage.getItem('tickets') || '[]')
const ticket = tickets.find((t) => t.id === id) || pastTickets.find((t) => t.id === id)
const movie = ticket && movies.find((m) => m.id === ticket.movieId)!
if (!ticket) router.push('/profile')
</script>

<template>
  <div v-if="ticket && movie" class="page">
    <UiButton variant="secondary" class="back" @click="router.back()">Назад</UiButton>
    <img :src="movie.poster" class="poster" />
    <h1>{{ movie.title }}</h1>
    <p class="meta">{{ movie.rating }} {{ movie.year }}, {{ movie.genres }}<br />{{ movie.country }}, {{ movie.duration }}, {{ movie.age }}</p>

    <div class="panel">
      <h2>Детали</h2>
      <p><span>Сеанс:</span> {{ ticket.date }} {{ ticket.time }}</p>
      <p><span>Место в зале:</span> {{ ticket.hall || 'Зал 4' }}; {{ ticket.seats.map((s) => `Ряд ${s.row}, место ${s.num}`).join('; ') }}</p>
      <p><span>Адрес:</span> {{ cinemaAddress }}, этаж 1</p>
      <p><span>Тип места:</span> {{ ticket.seats.some((s) => s.type === 'comfort') ? 'комфорт' : 'место' }}</p>
      <p><span>Цена билета(сумма):</span> {{ ticket.total.toFixed(2).replace('.', ',') }}р</p>
    </div>
  </div>
</template>

<style scoped>
.back { align-self: flex-start; height: 33px; }
.poster { width: 100%; height: 200px; object-fit: cover; }
.panel { background: var(--black); border-radius: 4px; padding: 15px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
.panel span { color: var(--gray); }
</style>