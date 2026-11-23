<script setup lang="ts">
import { useRouter } from 'vue-router'
import UiButton from '../components/UiButton.vue'

const router = useRouter()
</script>

<template>
  <div class="page result">
    <p>Деньги отправлены на счет, с которого проводилась оплата</p>
    <UiButton @click="router.push('/')">На главную</UiButton>
  </div>
</template>

<style scoped>
.result { justify-content: center; text-align: center; }
</style>