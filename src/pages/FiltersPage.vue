<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import type { Filters } from '../data'

const router = useRouter()
const filters = ref<Filters>(
  JSON.parse(sessionStorage.getItem('filters') || 'null') ?? { genres: [], ages: [], durations: [], countries: [], ratings: [] },
)

const sections: { title: string; key: keyof Filters; options: string[] }[] = [
  { title: 'Жанр', key: 'genres', options: ['Комедия', 'Ужасы', 'Драма', 'Триллер'] },
  { title: 'Возрастной рейтинг', key: 'ages', options: ['0+', '12+', '16+', '18+'] },
  { title: 'Продолжительность', key: 'durations', options: ['Короткий метр (до 40 мин)', 'Стандарт (1.5–2 часа)', 'Эпос (больше 3 часов)'] },
  { title: 'Страна', key: 'countries', options: ['Россия', 'Сша'] },
  { title: 'Рейтинг (Кинопоиск)', key: 'ratings', options: ['>7', '>8', '>9'] },
]

function toggle(list: string[], value: string) {
  const i = list.indexOf(value)
  if (i >= 0) list.splice(i, 1)
  else list.push(value)
}
function apply() {
  sessionStorage.setItem('filters', JSON.stringify(filters.value))
  router.push('/catalog')
}
function reset() {
  filters.value = { genres: [], ages: [], durations: [], countries: [], ratings: [] }
}
</script>

<template>
  <div class="page">
    <div class="actions">
      <UiButton @click="apply">Применить</UiButton>
      <UiButton variant="secondary" @click="reset">Сброс</UiButton>
    </div>

    <div v-for="s in sections" :key="s.key" class="section">
      <h2>{{ s.title }}</h2>
      <div class="chips">
        <button
          v-for="opt in s.options"
          :key="opt"
          class="chip"
          :class="{ active: filters[s.key].includes(opt) }"
          @click="toggle(filters[s.key], opt)"
        >
          {{ opt }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.actions { display: flex; gap: 8px; }
.actions button { flex: 1; }
.section { display: flex; flex-direction: column; gap: 10px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  padding: 8px 14px; border: 1px solid transparent; border-radius: 8px;
  background: var(--black); color: var(--white); font-size: 14px; cursor: pointer;
}
.chip.active { background: var(--gold); color: var(--bg); }
</style>