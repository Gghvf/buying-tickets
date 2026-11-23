<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import UiInput from '../components/UiInput.vue'
import { accounts, findAccount, saveAccounts, signIn } from '../data'

const route = useRoute()
const router = useRouter()
const fio = ref('')
const phone = ref('')
const password = ref('')
const confirm = ref('')
const agree = ref(false)
const error = ref('')

const canSubmit = computed(() => fio.value && phone.value && password.value && confirm.value && agree.value)

function submit() {
  error.value = ''
  if (password.value.length < 6) {
    error.value = 'Пароль должен быть не короче 6 символов'
    return
  }
  if (password.value !== confirm.value) {
    error.value = 'Пароли не совпадают'
    return
  }
  if (findAccount(phone.value)) {
    error.value = 'Этот номер уже зарегистрирован'
    return
  }
  const account = { name: fio.value.trim(), phone: phone.value.trim(), password: password.value }
  accounts.value.push(account)
  saveAccounts()
  signIn(account)
  router.push(route.query.returnTo ? String(route.query.returnTo) : '/')
}
</script>

<template>
  <div class="page auth">
    <h1>Регистрация</h1>
    <UiInput v-model="fio" placeholder="ФИО" />
    <UiInput v-model="phone" type="tel" placeholder="Номер телефона" />
    <UiInput v-model="password" type="password" placeholder="Пароль" />
    <UiInput v-model="confirm" type="password" placeholder="Подтверждение пароля" />
    <label class="check"><input v-model="agree" type="checkbox" /> Согласен на обработку персональных данных</label>
    <p v-if="error" class="error">{{ error }}</p>
    <UiButton variant="secondary" class="enter" :disabled="!canSubmit" @click="submit">Регистрация</UiButton>
  </div>
</template>

<style scoped>
.auth { align-items: center; width: 314px; margin: 0 auto; padding: 40px 0 16px; gap: 9px; }
h1 { font-size: 32px; margin-bottom: 16px; text-align: center; }
.check { display: flex; align-items: center; gap: 10px; font-size: 14px; align-self: flex-start; margin-top: 8px; }
.enter { width: 191px; height: 48px; margin-top: 17px; }
.error { color: var(--gold); font-size: 14px; }
</style>