<script setup lang="ts">
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'

const router = useRouter()
const phone = sessionStorage.getItem('resetPhone') || ''
</script>

<template>
  <div class="page result">
    <p>На ваш номер телефона отправлена ссылка для сброса пароля</p>
    <p v-if="phone" class="meta">{{ phone }}</p>
    <UiButton variant="secondary" @click="router.push('/forgot/new')">Открыть ссылку из СМС</UiButton>
    <p class="meta">Учебный проект: СМС не отправляется по-настоящему</p>
  </div>
</template>

<style scoped>
.result { justify-content: center; text-align: center; }
</style>