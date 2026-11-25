<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import UiInput from '../components/UiInput.vue'
import { defaultUser, findAccount } from '../data'
import { validatePhone, formatPhone } from '../validation'

const router = useRouter()
const phone = ref(formatPhone(defaultUser.phone))
const touched = ref(false)
const serverError = ref('')

const phoneError = computed(() => {
  if (!touched.value) return null
  const e = validatePhone(phone.value)
  return e || (findAccount(phone.value) ? null : 'Аккаунт с таким номером не найден')
})
const canSubmit = computed(() => !validatePhone(phone.value) && !!findAccount(phone.value))

function submit() {
  touched.value = true
  if (!findAccount(phone.value)) {
    serverError.value = 'Аккаунт с таким номером не найден'
    return
  }
  serverError.value = ''
  sessionStorage.setItem('resetPhone', phone.value)
  router.push('/forgot/sent')
}
</script>

<template>
  <div class="page auth">
    <h1>Восстановление доступа</h1>
    <div class="input-wrap">
      <UiInput v-model="phone" :error="phoneError || serverError" placeholder="Номер телефона" @blur="touched = true" />
      <span v-if="phoneError" class="field-error">{{ phoneError }}</span>
      <span v-else-if="serverError" class="field-error">{{ serverError }}</span>
    </div>
    <UiButton variant="secondary" class="enter" :disabled="!canSubmit" @click="submit">Далее</UiButton>
  </div>
</template>

<style scoped>
.auth { align-items: center; width: 314px; margin: 0 auto; padding: 110px 0 16px; gap: 9px; }
h1 { font-size: 24px; margin-bottom: 16px; text-align: center; }
.enter { width: 191px; height: 48px; margin-top: 17px; }
</style>