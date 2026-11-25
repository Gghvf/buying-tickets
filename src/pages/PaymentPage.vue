<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import UiInput from '../components/UiInput.vue'
import { movies, saveTicket } from '../data'
import { validateEmail } from '../validation'
import type { Order } from '../data'

const router = useRouter()
const order: Order = JSON.parse(sessionStorage.getItem('order')!)
const movie = movies.find((m) => m.id === order.movieId)!
const total = computed(() => order.seats.reduce((sum, s) => sum + s.price, 0))

const showDetails = ref(false)
const receipt = ref(true)
const email = ref(order.email)
const touched = ref(false)

const emailError = computed(() => (touched.value && receipt.value ? validateEmail(email.value) : null))
const canPay = computed(() => !receipt.value || !validateEmail(email.value))

function paySbp() {
  if (receipt.value) touched.value = true
  if (!canPay.value) return
  saveTicket(order)
  router.push('/success')
}
</script>

<template>
  <div class="bank">
    <div class="top">
      <svg width="15" height="22" viewBox="0 0 15 22" @click="router.back()">
        <path d="M13 2L3 11L13 20" stroke="#000" stroke-width="2" fill="none" />
      </svg>
      <span class="bank-name">Банк</span>
    </div>

    <button class="amount" @click="showDetails = !showDetails">
      <span>{{ total.toFixed(2).replace('.', ',') }}р</span>
      <span class="details-toggle">Детали заказа ⌄</span>
    </button>

    <div v-if="showDetails" class="details">
      <p><span>Название:</span> {{ movie.title }} {{ movie.age }}</p>
      <p><span>Дата и время:</span> {{ order.date }} {{ order.time }}</p>
      <p><span>Место в зале:</span> Зал 4; {{ order.seats.map((s) => `${s.row} ряд, ${s.num} место`).join('; ') }}</p>
      <p><span>Тип места:</span> {{ order.seats.some((s) => s.type === 'comfort') ? 'Комфорт' : 'Место' }}</p>
      <p><span>Цена билета(сумма):</span> {{ total.toFixed(2).replace('.', ',') }}р</p>
    </div>

    <div class="email-box">
      <label class="check"><input v-model="receipt" type="checkbox" /> Получить чек на e-mail</label>
      <div v-if="receipt" class="input-wrap">
        <UiInput v-model="email" :error="emailError" type="email" placeholder="Электронная почта" @blur="touched = true" />
        <span v-if="emailError" class="field-error">{{ emailError }}</span>
      </div>
    </div>

    <button class="pay" :disabled="!canPay" @click="router.push('/payment/card')">Оплатить картой</button>
    <button class="pay sbp" :disabled="!canPay" @click="paySbp">Оплатить СБП</button>
    <p class="terms">Нажимая “Оплатить”, вы соглашаетесь с условиями сервиса</p>
  </div>
</template>

<style scoped>
.bank { min-height: 100dvh; padding: 24px 22px; background: var(--white); color: var(--black); display: flex; flex-direction: column; gap: 13px; }
.top { display: flex; align-items: center; gap: 7px; }
.top svg { cursor: pointer; }
.bank-name { font-size: 36px; }
.amount {
  height: 52px; padding: 0 15px; border: none; border-radius: 12px; background: var(--black); color: var(--white);
  display: flex; align-items: center; justify-content: space-between; font-size: 20px; cursor: pointer;
}
.details-toggle { font-size: 14px; }
.details { background: var(--black); color: var(--white); border-radius: 12px; padding: 15px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
.details span { color: var(--gray); }
.email-box { background: var(--black); color: var(--white); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 15px; }
.check { display: flex; align-items: center; gap: 10px; }
.check input { width: 23px; height: 23px; accent-color: var(--white); }
.pay { height: 52px; border: none; border-radius: 12px; background: var(--black); color: var(--white); font-size: 16px; cursor: pointer; }
.pay:disabled { opacity: 0.5; cursor: default; }
.sbp { background: var(--white); color: var(--black); border: 1px solid var(--black); }
.terms { font-size: 20px; text-align: center; }
</style>