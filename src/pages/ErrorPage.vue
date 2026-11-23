<script setup lang="ts">
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'

const router = useRouter()
</script>

<template>
  <div class="page result">
    <p>Ошибка оплаты, проверьте верность указанных данных или достаточно ли средств на балансе</p>
    <UiButton variant="secondary" @click="router.back()">Назад</UiButton>
  </div>
</template>

<style scoped>
.result { justify-content: center; text-align: center; }
</style>