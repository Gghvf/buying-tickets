<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import UiInput from '../components/UiInput.vue'
import { saveTicket } from '../data'
import type { Order } from '../data'

const router = useRouter()
const order: Order = JSON.parse(sessionStorage.getItem('order')!)
const total = order.seats.reduce((sum, s) => sum + s.price, 0)

const savedCard = ref(sessionStorage.getItem('card'))
const adding = ref(!savedCard.value)
const number = ref('')
const month = ref('')
const year = ref('')
const cvc = ref('')
const holder = ref('')
const canPay = computed(() => number.value && month.value && year.value && cvc.value && holder.value)

function pay() {
  const digits = number.value.replace(/\s/g, '')
  if (digits.endsWith('0000')) {
    router.push('/error') // демо-правило: карта на 0000 → ошибка оплаты
    return
  }
  sessionStorage.setItem('card', '****' + digits.slice(-4))
  saveTicket(order)
  router.push('/success')
}
function paySaved() {
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
    <div class="amount">{{ total.toFixed(2).replace('.', ',') }}р</div>

    <template v-if="savedCard && !adding">
      <div class="saved">{{ savedCard }}</div>
      <button class="pay" @click="paySaved">Оплатить этой картой</button>
      <button class="pay light" @click="adding = true">Добавить карту</button>
    </template>

    <template v-else>
      <UiInput v-model="number" class="field" placeholder="Номер карты" />
      <div class="exp">
        <select v-model="month" class="field">
          <option value="" disabled>Месяц</option>
          <option v-for="m in 12" :key="m" :value="m">{{ String(m).padStart(2, '0') }}</option>
        </select>
        <select v-model="year" class="field">
          <option value="" disabled>Год</option>
          <option v-for="y in 8" :key="y" :value="25 + y">{{ 25 + y }}</option>
        </select>
      </div>
      <UiInput v-model="cvc" class="field" type="password" placeholder="CVC/CVV" />
      <UiInput v-model="holder" class="field" placeholder="Держатель карты" />
      <button class="pay" :disabled="!canPay" @click="pay">Оплатить картой</button>
    </template>

    <p class="terms">Нажимая “Оплатить”, вы соглашаетесь с условиями сервиса</p>
  </div>
</template>

<style scoped>
.bank { min-height: 100dvh; padding: 24px 22px; background: var(--white); color: var(--black); display: flex; flex-direction: column; gap: 13px; }
.top { display: flex; align-items: center; gap: 7px; }
.top svg { cursor: pointer; }
.bank-name { font-size: 36px; }
.amount { height: 52px; padding: 0 15px; border-radius: 12px; background: var(--black); color: var(--white); font-size: 20px; display: flex; align-items: center; }
.saved { height: 52px; padding: 0 15px; border: 1px solid var(--black); border-radius: 12px; display: flex; align-items: center; }
.field { border: 1px solid var(--black); border-radius: 12px; height: 52px; }
.exp { display: flex; gap: 13px; }
.exp select { flex: 1; padding: 0 12px; background: var(--white); color: var(--black); }
.pay { height: 52px; border: none; border-radius: 12px; background: var(--black); color: var(--white); font-size: 16px; cursor: pointer; }
.pay:disabled { opacity: 0.5; cursor: default; }
.light { background: var(--white); color: var(--black); border: 1px solid var(--black); }
.terms { font-size: 20px; text-align: center; }
</style>