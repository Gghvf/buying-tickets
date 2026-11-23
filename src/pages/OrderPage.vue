<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import UiInput from '../components/UiInput.vue'
import { movies, cinemaAddress } from '../data'
import type { Order } from '../data'

const router = useRouter()
const order: Order = JSON.parse(sessionStorage.getItem('order')!)
const movie = movies.find((m) => m.id === order.movieId)!

const email = ref(order.email)
const phone = ref(order.phone)
const agree1 = ref(false)
const agree2 = ref(false)
const total = computed(() => order.seats.reduce((sum, s) => sum + s.price, 0))
const canNext = computed(() => email.value && phone.value && agree1.value && agree2.value)

function next() {
  order.email = email.value
  order.phone = phone.value
  sessionStorage.setItem('order', JSON.stringify(order))
  router.push('/payment')
}
</script>

<template>
  <div class="page">
    <h1>{{ movie.title }}</h1>
    <p class="meta">{{ order.date }} в {{ order.time }}<br />{{ cinemaAddress }}, Зал 4</p>

    <div class="panel">
      <h2>Билеты</h2>
      <div v-for="seat in order.seats" :key="`${seat.row}-${seat.num}`" class="line">
        <span>{{ seat.row }} ряд, {{ seat.num }} место</span>
        <span>{{ seat.price.toFixed(2).replace('.', ',') }}р</span>
      </div>
      <p>Итого: {{ total.toFixed(2).replace('.', ',') }} р</p>
    </div>

    <h2>Данные для получения заказа</h2>
    <p class="meta">Укажите e-mail, куда прислать билеты и чек</p>
    <UiInput v-model="email" type="email" placeholder="email" />
    <p class="meta">Ваш номер телефона для получения билета</p>
    <UiInput v-model="phone" type="tel" placeholder="Телефон" />
    <label class="check"><input v-model="agree1" type="checkbox" /> Принимаю условия покупки билетов и товаров</label>
    <label class="check"><input v-model="agree2" type="checkbox" /> Согласен на обработку персональных данных</label>

    <div class="actions">
      <UiButton variant="secondary" @click="router.back()">Назад</UiButton>
      <UiButton :disabled="!canNext" @click="next">Продолжить</UiButton>
    </div>
  </div>
</template>

<style scoped>
.panel { background: var(--black); border-radius: 4px; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
.line { display: flex; justify-content: space-between; font-size: 14px; }
.check { display: flex; align-items: center; gap: 10px; font-size: 14px; }
.actions { display: flex; gap: 8px; margin-top: auto; }
.actions button { flex: 1; }
</style>