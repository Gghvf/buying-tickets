<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import { movies, pastTickets, user, asset } from '../data'
import type { Ticket } from '../data'
import { validateReview } from '../validation'

interface Review {
  id: number
  movieId: number
  rating: number
  text: string
  author: string
}

const router = useRouter()
const tab = ref('tickets')
const tickets = ref<Ticket[]>(JSON.parse(sessionStorage.getItem('tickets') || '[]'))
const active = computed(() => tickets.value.filter((t) => !t.refunded))

const reviews = ref<Review[]>(
  JSON.parse(sessionStorage.getItem('reviews') || 'null') ?? [
    { id: 1, movieId: 2, rating: 9, text: 'Отличная фантастика, смотрел на одном дыхании. Звук в зале шикарный.', author: 'User123' },
  ],
)
const reviewMovie = ref(movies[0].id)
const reviewRating = ref(10)
const reviewText = ref('')

const reviewError = computed(() => (reviewText.value ? validateReview(reviewText.value) : null))
const canAddReview = computed(() => !validateReview(reviewText.value))
function addReview() {
  if (!canAddReview.value) return
  reviews.value.push({
    id: Date.now(),
    movieId: reviewMovie.value,
    rating: reviewRating.value,
    text: reviewText.value.trim(),
    author: user.value || 'Гость',
  })
  sessionStorage.setItem('reviews', JSON.stringify(reviews.value))
  reviewText.value = ''
}
function movieTitle(id: number) {
  return movies.find((m) => m.id === id)?.title ?? ''
}
function moviePoster(id: number) {
  return movies.find((m) => m.id === id)?.poster ?? ''
}
</script>

<template>
  <div class="page">
    <div class="tabs">
      <button :class="{ active: tab === 'tickets' }" @click="tab = 'tickets'">мои билеты</button>
      <button :class="{ active: tab === 'reviews' }" @click="tab = 'reviews'">мои отзывы</button>
      <button @click="router.push('/')">главная</button>
      <button :class="{ active: tab === 'past' }" @click="tab = 'past'">предыдущие сеансы</button>
    </div>

    <template v-if="tab === 'tickets'">
      <div v-for="t in active" :key="t.id" class="card">
        <img :src="moviePoster(t.movieId)" class="poster" />
        <h2>{{ movieTitle(t.movieId) }}</h2>
        <p class="meta">{{ t.date }} в {{ t.time }} · {{ t.seats.map((s) => `${s.row} ряд, ${s.num} место`).join('; ') }}</p>
        <img :src="asset('/img/qr.png')" class="qr" alt="QR-код билета" />
        <div class="row">
          <UiButton variant="secondary" @click="router.push(`/ticket?id=${t.id}`)">Детали</UiButton>
          <UiButton variant="secondary" @click="router.push(`/refund?id=${t.id}`)">Отмена</UiButton>
        </div>
      </div>
      <div v-if="!active.length" class="empty">
        <p class="meta">Пока нет активных билетов</p>
        <UiButton @click="router.push('/')">Купить билет</UiButton>
      </div>
    </template>

    <template v-else-if="tab === 'past'">
      <div v-for="t in pastTickets" :key="t.id" class="card">
        <img :src="moviePoster(t.movieId)" class="poster" />
        <h2>{{ movieTitle(t.movieId) }}</h2>
        <p class="meta">{{ t.date }} в {{ t.time }} · {{ t.hall }}</p>
        <UiButton variant="secondary" @click="router.push(`/ticket?id=${t.id}`)">Детали</UiButton>
      </div>
    </template>

    <template v-else>
      <div v-for="r in reviews" :key="r.id" class="review">
        <div class="review-top">
          <span>{{ r.author }}</span>
          <span class="rating">{{ r.rating }}/10</span>
        </div>
        <p class="meta">{{ movieTitle(r.movieId) }}</p>
        <p>{{ r.text }}</p>
      </div>
      <div class="form">
        <h2>Оставить отзыв</h2>
        <select v-model="reviewMovie">
          <option v-for="m in movies" :key="m.id" :value="m.id">{{ m.title }}</option>
        </select>
        <select v-model="reviewRating">
          <option v-for="n in 10" :key="n" :value="11 - n">{{ 11 - n }}/10</option>
        </select>
        <div class="input-wrap">
          <textarea
            v-model="reviewText"
            :class="{ error: reviewError }"
            placeholder="Впечатления о фильме и зале (20–300 символов)"
            maxlength="300"
          ></textarea>
          <div class="review-meta">
            <span v-if="reviewError" class="field-error">{{ reviewError }}</span>
            <span class="counter">{{ reviewText.length }} / 300</span>
          </div>
        </div>
        <UiButton :disabled="!canAddReview" @click="addReview">Оставить отзыв</UiButton>
      </div>
    </template>
  </div>
</template>

<style scoped>
.tabs { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
.tabs button {
  min-width: max-content; height: 40px; padding: 0 14px; border: 1px solid transparent; border-radius: 8px;
  background: var(--black); color: var(--white); font-size: 14px; cursor: pointer;
}
.tabs button.active { border-color: var(--gold); color: var(--gold); }
.card { background: var(--black); border-radius: 4px; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
.poster { width: 100%; height: 160px; object-fit: cover; border-radius: 4px; }
h2 { font-size: 20px; }
.qr { width: 189px; height: 184px; align-self: center; }
.row { display: flex; gap: 8px; }
.row button { flex: 1; height: 36px; }
.empty { margin: auto; display: flex; flex-direction: column; gap: 12px; align-items: center; }
.review { background: var(--black); border-radius: 4px; padding: 15px; display: flex; flex-direction: column; gap: 6px; }
.review-top { display: flex; justify-content: space-between; }
.rating { color: var(--gold); }
.form { display: flex; flex-direction: column; gap: 10px; }
.form select { height: 40px; padding: 0 12px; border: none; border-radius: 8px; background: var(--white); color: var(--black); }
.form textarea {
  min-height: 80px; padding: 12px; border: none; border-radius: 8px;
  background: var(--white); color: var(--black); font: inherit; resize: vertical; outline: none;
}
.review-meta { display: flex; justify-content: space-between; font-size: 12px; }
.counter { color: var(--gray); margin-left: auto; }
textarea.error { outline: 1px solid var(--gold); }
</style>