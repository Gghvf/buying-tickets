<script setup lang="ts">
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'

const router = useRouter()
</script>

<template>
  <div class="page result">
    <p>Успешная оплата, билет отправлен на ваш номер телефона и электронную почту, он так же доступен в вашем профиле.</p>
    <UiButton @click="router.push('/')">На главную</UiButton>
  </div>
</template>

<style scoped>
.result { justify-content: center; text-align: center; }
</style>