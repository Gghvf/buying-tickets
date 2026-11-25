<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import UiInput from '../components/UiInput.vue'
import { findAccount, saveAccounts, signIn } from '../data'
import { validatePassword, validateConfirm } from '../validation'

const router = useRouter()
const account = findAccount(sessionStorage.getItem('resetPhone') || '')
if (!account) router.push('/forgot')

const password = ref('')
const confirm = ref('')
const touched = ref({ password: false, confirm: false })

const errors = computed(() => ({
  password: touched.value.password ? validatePassword(password.value) : null,
  confirm: touched.value.confirm ? validateConfirm(password.value, confirm.value) : null,
}))
const canSubmit = computed(
  () => !validatePassword(password.value) && !validateConfirm(password.value, confirm.value),
)

function submit() {
  if (!account) return
  touched.value = { password: true, confirm: true }
  if (!canSubmit.value) return
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
    <div class="input-wrap">
      <UiInput v-model="password" type="password" :error="errors.password" placeholder="Пароль" @blur="touched.password = true" />
      <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
    </div>
    <div class="input-wrap">
      <UiInput v-model="confirm" type="password" :error="errors.confirm" placeholder="Подтверждение пароля" @blur="touched.confirm = true" />
      <span v-if="errors.confirm" class="field-error">{{ errors.confirm }}</span>
    </div>
    <UiButton variant="secondary" class="enter" :disabled="!canSubmit" @click="submit">Далее</UiButton>
  </div>
</template>

<style scoped>
.auth { align-items: center; width: 314px; margin: 0 auto; padding: 110px 0 16px; gap: 9px; }
h1 { font-size: 24px; margin-bottom: 16px; text-align: center; }
.enter { width: 191px; height: 48px; margin-top: 17px; }
</style>