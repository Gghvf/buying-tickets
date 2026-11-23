<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import UiInput from '../components/UiInput.vue'
import { findAccount, saveAccounts, signIn } from '../data'

const router = useRouter()
const account = findAccount(sessionStorage.getItem('resetPhone') || '')
if (!account) router.push('/forgot')

const password = ref('')
const confirm = ref('')
const error = ref('')

function submit() {
  if (!account) return
  error.value = ''
  if (password.value.length < 6) {
    error.value = 'Пароль должен быть не короче 6 символов'
    return
  }
  if (password.value !== confirm.value) {
    error.value = 'Пароли не совпадают'
    return
  }
  account.password = password.value
  saveAccounts()
  sessionStorage.removeItem('resetPhone')
  signIn(account)
  router.push('/')
}
</script>

<template>
  <div class="page auth">
    <h1>Создайте новый пароль</h1>
    <UiInput v-model="password" type="password" placeholder="Пароль" />
    <UiInput v-model="confirm" type="password" placeholder="Подтверждение пароля" />
    <p v-if="error" class="error">{{ error }}</p>
    <UiButton variant="secondary" class="enter" :disabled="!password || !confirm" @click="submit">Далее</UiButton>
  </div>
</template>

<style scoped>
.auth { align-items: center; width: 314px; margin: 0 auto; padding: 110px 0 16px; gap: 9px; }
h1 { font-size: 24px; margin-bottom: 16px; text-align: center; }
.enter { width: 191px; height: 48px; margin-top: 17px; }
.error { color: var(--gold); font-size: 14px; }
</style>