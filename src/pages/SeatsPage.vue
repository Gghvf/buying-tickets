<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import { movies, hallRows, takenSeats, seatPrices, cinemaAddress, user, asset } from '../data'
import type { Order, Seat } from '../data'

const router = useRouter()
const order: Order = JSON.parse(sessionStorage.getItem('order')!)
const movie = movies.find((m) => m.id === order.movieId)!

const selected = ref<Seat[]>([])
const seatSize = ref(16)
const total = computed(() => selected.value.reduce((sum, s) => sum + s.price, 0))

function isTaken(row: number, num: number) {
  return takenSeats.includes(`${row}-${num}`)
}
function isSelected(row: number, num: number) {
  return selected.value.some((s) => s.row === row && s.num === num)
}
function icon(row: number, num: number) {
  if (isTaken(row, num)) return asset('/img/seat-taken.png')
  if (isSelected(row, num)) return asset('/img/seat-selected.png')
  return hallRows[row - 1][num - 1] === 'c' ? asset('/img/seat-comfort.png') : asset('/img/seat-free.png')
}
function toggle(row: number, num: number) {
  if (!user.value) {
    router.push('/register?returnTo=/seats')
    return
  }
  const i = selected.value.findIndex((s) => s.row === row && s.num === num)
  if (i >= 0) selected.value.splice(i, 1)
  else {
    const type = hallRows[row - 1][num - 1] === 'c' ? 'comfort' : 'place'
    selected.value.push({ row, num, type, price: seatPrices[type], tariff: 'Взрослый' })
  }
}
function next() {
  order.seats = selected.value
  sessionStorage.setItem('order', JSON.stringify(order))
  router.push('/order')
}
</script>

<template>
  <div class="page">
    <h1>{{ movie.title }}</h1>
    <p class="meta">{{ order.date }} в {{ order.time }}<br />{{ cinemaAddress }}, Зал 4</p>

    <div class="zoom">
      <button :disabled="seatSize <= 12" @click="seatSize = Math.max(12, seatSize - 4)">−</button>
      <button :disabled="seatSize >= 32" @click="seatSize = Math.min(32, seatSize + 4)">+</button>
    </div>

    <div class="viewport">
      <div class="hall">
        <div class="screen">Экран</div>
        <div v-for="(row, r) in hallRows" :key="r" class="row">
          <span class="rownum">{{ r + 1 }}</span>
          <button
            v-for="n in row.length"
            :key="n"
            class="seat"
            :style="{ width: seatSize + 'px', height: seatSize + 'px' }"
            :disabled="isTaken(r + 1, n)"
            @click="toggle(r + 1, n)"
          >
            <img :src="icon(r + 1, n)" />
          </button>
          <span class="rownum">{{ r + 1 }}</span>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="item"><img :src="asset('/img/seat-free.png')" /><span>Место<br />{{ seatPrices.place }}р</span></div>
      <div class="item"><img :src="asset('/img/seat-comfort.png')" /><span>Комфорт<br />{{ seatPrices.comfort }}р</span></div>
      <div class="item"><img :src="asset('/img/seat-taken.png')" /><span>Занято</span></div>
      <div class="item"><img :src="asset('/img/seat-selected.png')" /><span>Выбранное вами</span></div>
    </div>

    <div v-if="selected.length" class="panel">
      <h2>Ваши места</h2>
      <div v-for="(seat, i) in selected" :key="`${seat.row}-${seat.num}`" class="chosen">
        <div>
          <p>{{ seat.row }} ряд, {{ seat.num }} место</p>
          <p class="meta">{{ seat.type === 'comfort' ? 'Комфорт' : 'Место' }}</p>
          <select v-model="seat.tariff">
            <option>Взрослый</option>
            <option>Детский</option>
          </select>
        </div>
        <span class="sum">{{ seat.price }}р</span>
        <button class="remove" @click="selected.splice(i, 1)">✕</button>
      </div>
      <p>Итого: {{ total.toFixed(2).replace('.', ',') }}р</p>
    </div>
    <p v-else class="meta">Нажмите на кресло, чтобы выбрать место</p>

    <div class="actions">
      <UiButton variant="secondary" @click="router.back()">Назад</UiButton>
      <UiButton :disabled="!selected.length" @click="next">Продолжить</UiButton>
    </div>
  </div>
</template>

<style scoped>
.zoom { display: flex; justify-content: flex-end; gap: 23px; }
.zoom button {
  width: 35px; height: 35px; border: none; border-radius: 50%;
  background: var(--black); color: var(--white); font-size: 20px; cursor: pointer;
}
.zoom button:active { background: var(--gold); color: var(--bg); }
.zoom button:disabled { opacity: 0.4; cursor: default; }
.viewport {
  height: 234px;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--gold) var(--panel);
}
.viewport::-webkit-scrollbar { width: 6px; height: 6px; }
.viewport::-webkit-scrollbar-track { background: var(--panel); border-radius: 3px; }
.viewport::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }
.hall { display: flex; flex-direction: column; gap: 4px; width: max-content; margin: 0 auto; padding: 4px; }
.screen {
  width: 220px; margin: 0 auto 8px; padding-top: 4px; text-align: center;
  font-size: 12px; color: var(--gray); border-top: 2px solid var(--gray); border-radius: 100% 100% 0 0;
}
.row { display: flex; align-items: center; gap: 3px; }
.rownum { width: 16px; font-size: 10px; color: var(--gray); text-align: center; }
.seat { padding: 0; border: none; background: none; cursor: pointer; transition: width 0.15s ease, height 0.15s ease; }
.seat:disabled { cursor: default; }
.seat img { width: 100%; height: 100%; display: block; }
.legend { display: flex; flex-wrap: wrap; gap: 12px; }
.item { display: flex; align-items: center; gap: 6px; font-size: 14px; }
.item img { width: 28px; height: 28px; }
.panel { background: var(--black); border-radius: 4px; padding: 15px; display: flex; flex-direction: column; gap: 12px; }
.chosen { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; }
.chosen select {
  height: 22px; margin-top: 4px; border: none; border-radius: 4px;
  background: var(--bg); color: var(--white); font-size: 14px;
}
.sum { margin-left: auto; }
.remove { border: none; background: none; color: var(--white); cursor: pointer; }
.actions { display: flex; gap: 8px; margin-top: auto; }
.actions button { flex: 1; }
</style>