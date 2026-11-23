<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import { movies, sessions, seatPrices } from '../data'

const route = useRoute()
const router = useRouter()
const movie = movies.find((m) => m.id === Number(route.params.id))!

const day = ref(0)
const customDate = ref('')
const dateLabel = computed(() => {
  if (day.value === 2) {
    return customDate.value
      ? new Date(customDate.value).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'выберите дату'
  }
  return new Date(Date.now() + day.value * 86400000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
})

function choose(time: string) {
  sessionStorage.setItem('order', JSON.stringify({ movieId: movie.id, date: dateLabel.value, time, seats: [], email: '', phone: '' }))
  router.push('/seats')
}
</script>

<template>
  <div class="page">
    <UiButton variant="secondary" class="back" @click="router.back()">Назад</UiButton>
    <h1 class="center">{{ movie.title }}</h1>
    <img :src="movie.poster" class="poster" />
    <p class="meta center">{{ movie.rating }} {{ movie.year }}, {{ movie.genres }}<br />{{ movie.country }}, {{ movie.duration }}, {{ movie.age }}</p>
    <div class="days">
      <button v-for="(label, i) in ['сегодня', 'завтра', 'дата']" :key="label" :class="{ active: day === i }" @click="day = i">
        {{ label }}
      </button>
    </div>
    <input v-if="day === 2" v-model="customDate" type="date" class="date" />
    <div class="sessions">
      <button v-for="s in sessions" :key="s.start" class="session" :disabled="day === 2 && !customDate" @click="choose(s.start)">
        <span class="price">от {{ seatPrices.comfort }}р</span>
        <span class="time">{{ s.start }} → {{ s.end }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.back { align-self: flex-start; height: 33px; }
.center { text-align: center; }
.poster { width: 100%; height: 207px; object-fit: cover; }
.days { display: flex; gap: 8px; overflow-x: auto; }
.days button {
  min-width: 176px; height: 62px; border: 1px solid transparent; border-radius: 8px;
  background: var(--black); color: var(--white); font-size: 20px; cursor: pointer;
}
.days button.active { border-color: var(--gold); }
.date { height: 47px; padding: 0 16px; border: none; border-radius: 8px; background: var(--white); color: var(--black); }
.sessions { display: flex; gap: 10px; overflow-x: auto; }
.session {
  min-width: 183px; height: 100px; padding: 7px 12px; border: none; border-radius: 8px;
  background: var(--black); color: var(--white); cursor: pointer;
  display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start;
}
.session:disabled { opacity: 0.5; cursor: default; }
.price { font-size: 14px; }
.time { font-size: 20px; }
</style>