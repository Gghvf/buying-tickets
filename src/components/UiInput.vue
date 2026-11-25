<script setup lang="ts">
withDefaults(defineProps<{ error?: string | null }>(), { error: null })
const model = defineModel<string>({ required: true })
</script>

<template>
  <input v-model="model" class="ui-input" :class="{ error }" />
</template>

<style scoped>
.ui-input {
  width: 100%;
  height: 47px;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background: var(--white);
  color: var(--black);
  font-size: 16px;
  outline: none;
}
.ui-input::placeholder { color: var(--black); }
.ui-input.error {
  outline: 1px solid var(--gold);
}
</style>