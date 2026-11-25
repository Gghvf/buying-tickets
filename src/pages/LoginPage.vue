<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import UiInput from '../components/UiInput.vue'
import { defaultUser, findAccount, signIn } from '../data'
import { validatePhone, validatePassword, formatPhone } from '../validation'

const router = useRouter()
const phone = ref(formatPhone(defaultUser.phone))
const password = ref(findAccount(defaultUser.phone)?.password ?? '')
const touched = ref({ phone: false, password: false })

const phoneError = computed(() => (touched.value.phone ? validatePhone(phone.value) : null))
const passwordError = computed(() => (touched.value.password ? validatePassword(password.value) : null))
const canSubmit = computed(() => !validatePhone(phone.value) && !validatePassword(password.value))

function submit() {
  touched.value.phone = true
  touched.value.password = true
  if (!canSubmit.value) return
  const account = findAccount(phone.value)
  if (!account || account.password !== password.value) {
    // показываем как ошибку на поле пароля
    password.value = ''
    return
  }
  signIn(account)
  router.push('/')
}
</script>

<template>
  <div class="page login">
    <h1>Вход</h1>
    <div class="input-wrap">
      <UiInput v-model="phone" :error="phoneError" placeholder="Номер телефона" @blur="touched.phone = true" />
      <span v-if="phoneError" class="field-error">{{ phoneError }}</span>
    </div>
    <div class="input-wrap">
      <UiInput v-model="password" type="password" :error="passwordError" placeholder="Пароль" @blur="touched.password = true" />
      <span v-if="passwordError" class="field-error">{{ passwordError }}</span>
    </div>
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
</style>