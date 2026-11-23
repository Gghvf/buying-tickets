<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'
import UiInput from '../components/UiInput.vue'
import { defaultUser, findAccount } from '../data'

const router = useRouter()
const phone = ref(defaultUser.phone)
const error = ref('')

function submit() {
  if (!findAccount(phone.value)) {
    error.value = 'Аккаунт с таким номером не найден'
    return
  }
  sessionStorage.setItem('resetPhone', phone.value)
  router.push('/forgot/sent')
}
</script>

<template>
  <div class="page auth">
    <h1>Восстановление доступа</h1>
    <UiInput v-model="phone" type="tel" placeholder="Номер телефона" />
    <p v-if="error" class="error">{{ error }}</p>
    <UiButton variant="secondary" class="enter" :disabled="!phone" @click="submit">Далее</UiButton>
  </div>
</template>

<style scoped>
.auth { align-items: center; width: 314px; margin: 0 auto; padding: 110px 0 16px; gap: 9px; }
h1 { font-size: 24px; margin-bottom: 16px; text-align: center; }
.enter { width: 191px; height: 48px; margin-top: 17px; }
.error { color: var(--gold); font-size: 14px; }
</style>