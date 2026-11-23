<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'primary' | 'secondary' }>(), { variant: 'primary' })
</script>

<template>
  <button class="ui-button" :class="variant">
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  height: 44px;
  padding: 0 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
}
.ui-button:disabled { opacity: 0.5; cursor: default; }
.primary { background: var(--gold); color: var(--bg); }
.secondary { background: transparent; border: 1px solid var(--gold); color: var(--gold); }
</style>