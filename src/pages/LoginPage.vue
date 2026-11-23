<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import UiInput from '../components/UiInput.vue'
import { defaultUser, findAccount, signIn } from '../data'

const router = useRouter()
const phone = ref(defaultUser.phone)
const password = ref(findAccount(defaultUser.phone)?.password ?? '')
const error = ref('')

function submit() {
  const account = findAccount(phone.value)
  if (!account || account.password !== password.value) {
    error.value = 'Неверный номер или пароль'
    return
  }
  signIn(account)
  router.push('/')
}
</script>

<template>
  <div class="page login">
    <h1>Вход</h1>
    <UiInput v-model="phone" placeholder="Номер телефона" />
    <UiInput v-model="password" type="password" placeholder="Пароль" />
    <p v-if="error" class="error">{{ error }}</p>
    <UiButton variant="secondary" class="enter" @click="submit">Войти</UiButton>
    <div class="links">
      <RouterLink to="/forgot">Забыли пароль?</RouterLink>
      <RouterLink to="/register">Нет аккаунта? Регистрация</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.login { align-items: center; width: 314px; margin: 0 auto; padding-top: 110px; gap: 9px; }
h1 { font-size: 32px; margin-bottom: 16px; }
.enter { width: 191px; height: 48px; margin-top: 17px; }
.links { align-self: flex-start; display: flex; flex-direction: column; gap: 9px; margin-top: 9px; }
a { color: var(--white); text-decoration: none; }
.error { color: var(--gold); font-size: 14px; }
</style>