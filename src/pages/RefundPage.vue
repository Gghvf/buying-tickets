<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import { movies } from '../data'
import type { Ticket } from '../data'

const route = useRoute()
const router = useRouter()
const tickets: Ticket[] = JSON.parse(sessionStorage.getItem('tickets') || '[]')
const ticket = tickets.find((t) => t.id === Number(route.query.id) && !t.refunded)
const movie = ticket && movies.find((m) => m.id === ticket.movieId)!
if (!ticket) router.push('/profile')

const reason = ref('')
const reasons = [
  'Билет куплен по ошибке',
  'Хочу выбрать другой сеанс',
  'Хочу выбрать другое место в зале',
  'Не интересен фильм',
  'Хочу выбрать другой фильм',
  'Буду смотреть в другом месте',
  'Другое',
]
const card = sessionStorage.getItem('card') || '****3417'

function submit() {
  if (!ticket) return
  ticket.refunded = true
  sessionStorage.setItem('tickets', JSON.stringify(tickets))
  router.push('/refund/done')
}
</script>

<template>
  <div v-if="ticket && movie" class="page">
    <UiButton variant="secondary" class="back" @click="router.back()">Назад</UiButton>
    <h1>Возврат средств</h1>
    <img :src="movie.poster" class="poster" />
    <h2>{{ movie.title }}</h2>
    <p class="meta">{{ movie.rating }} {{ movie.year }}, {{ movie.genres }}<br />{{ movie.country }}, {{ movie.duration }}, {{ movie.age }}</p>

    <h2>Почему вы решили вернуть билет?</h2>
    <label v-for="r in reasons" :key="r" class="reason">
      <input v-model="reason" type="radio" name="reason" :value="r" /> {{ r }}
    </label>

    <div class="panel">
      <p>Сумма к возврату: {{ ticket.total }}р</p>
      <p class="meta">Счет: {{ card }}</p>
    </div>

    <div class="actions">
      <UiButton variant="secondary" @click="router.back()">Назад</UiButton>
      <UiButton :disabled="!reason" @click="submit">Продолжить</UiButton>
    </div>
  </div>
</template>

<style scoped>
.back { align-self: flex-start; height: 33px; }
.poster { width: 100%; height: 180px; object-fit: cover; }
.reason { display: flex; align-items: center; gap: 10px; font-size: 16px; }
.reason input { width: 18px; height: 18px; accent-color: var(--gold); flex-shrink: 0; }
.panel { background: var(--black); border-radius: 4px; padding: 15px; display: flex; flex-direction: column; gap: 6px; }
.actions { display: flex; gap: 8px; margin-top: auto; }
.actions button { flex: 1; }
</style>