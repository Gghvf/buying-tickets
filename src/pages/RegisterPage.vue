<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import UiInput from '../components/UiInput.vue'
import { accounts, findAccount, saveAccounts, signIn } from '../data'
import {
  validateFio, validatePhone, validatePassword, validateConfirm, formatPhone,} from '../validation'

const route = useRoute()
const router = useRouter()
const fio = ref('')
const phone = ref('')
const password = ref('')
const confirm = ref('')
const agree = ref(false)
const touched = ref({ fio: false, phone: false, password: false, confirm: false })

const errors = computed(() => ({
  fio: touched.value.fio ? validateFio(fio.value) : null,
  phone: touched.value.phone ? validatePhone(phone.value) : null,
  password: touched.value.password ? validatePassword(password.value) : null,
  confirm: touched.value.confirm ? validateConfirm(password.value, confirm.value) : null,
}))

const canSubmit = computed(
  () =>
    !validateFio(fio.value) &&
    !validatePhone(phone.value) &&
    !validatePassword(password.value) &&
    !validateConfirm(password.value, confirm.value) &&
    agree.value,
)

function submit() {
  touched.value = { fio: true, phone: true, password: true, confirm: true }
  if (!canSubmit.value) return
  if (findAccount(phone.value)) {
    touched.value.phone = true
    return
  }
  const account = { name: fio.value.trim(), phone: phone.value, password: password.value }
  accounts.value.push(account)
  saveAccounts()
  signIn(account)
  router.push(route.query.returnTo ? String(route.query.returnTo) : '/')
}
</script>

<template>
  <div class="page auth">
    <h1>Регистрация</h1>
    <div class="input-wrap">
      <UiInput v-model="fio" :error="errors.fio" placeholder="ФИО" @blur="touched.fio = true" />
      <span v-if="errors.fio" class="field-error">{{ errors.fio }}</span>
    </div>
    <div class="input-wrap">
      <UiInput v-model="phone" :error="errors.phone" placeholder="Номер телефона" @blur="touched.phone = true" />
      <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
    </div>
    <div class="input-wrap">
      <UiInput v-model="password" type="password" :error="errors.password" placeholder="Пароль" @blur="touched.password = true" />
      <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
    </div>
    <div class="input-wrap">
      <UiInput v-model="confirm" type="password" :error="errors.confirm" placeholder="Подтверждение пароля" @blur="touched.confirm = true" />
      <span v-if="errors.confirm" class="field-error">{{ errors.confirm }}</span>
    </div>
    <label class="check"><input v-model="agree" type="checkbox" /> Согласен на обработку персональных данных</label>
    <UiButton variant="secondary" class="enter" :disabled="!canSubmit" @click="submit">Регистрация</UiButton>
  </div>
</template>

<style scoped>
.auth { align-items: center; width: 314px; margin: 0 auto; padding: 40px 0 16px; gap: 9px; }
h1 { font-size: 32px; margin-bottom: 16px; text-align: center; }
.check { display: flex; align-items: center; gap: 10px; font-size: 14px; align-self: flex-start; margin-top: 8px; }
.enter { width: 191px; height: 48px; margin-top: 17px; }
</style>