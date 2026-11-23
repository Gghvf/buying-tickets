<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from './UiButton.vue'
import { user, asset} from '../data'

const router = useRouter()
const query = ref('')

function search() {
  router.push({ path: '/catalog', query: { q: query.value } })
}

function logout() {
  user.value = null
  sessionStorage.removeItem('userName')
  router.push('/')
}
</script>

<template>
  <header>
    <div class="top">
      <img :src="asset('/logo.jpg')" alt="Логотип" class="logo" @click="router.push('/')" />

      <UiButton
        v-if="user"
        variant="secondary"
        class="small user"
        @click="router.push('/profile')"
      >
        {{ user }}
      </UiButton>

      <UiButton
        v-if="user"
        variant="secondary"
        class="small logout"
        @click="logout"
      >
        выйти
      </UiButton>

      <template v-else>
        <UiButton variant="secondary" class="small" @click="router.push('/login')">войти</UiButton>
        <UiButton class="small" @click="router.push('/register')">регистрация</UiButton>
      </template>
    </div>

    <div class="search">
      <input v-model="query" placeholder="поиск" @keyup.enter="search" />
      <svg width="18" height="19" viewBox="0 0 18 19" @click="router.push('/filters')">
        <line x1="0" y1="2" x2="18" y2="2" stroke="#000" />
        <line x1="0" y1="10" x2="18" y2="10" stroke="#000" />
        <line x1="0" y1="18" x2="18" y2="18" stroke="#000" />
        <circle cx="4" cy="2" r="2" fill="#000" />
        <circle cx="10" cy="10" r="2" fill="#000" />
        <circle cx="15" cy="18" r="2" fill="#000" />
      </svg>
    </div>
  </header>
</template>

<style scoped>
header {
  background: var(--panel);
  border: 1px solid var(--gold);
  padding: 7px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.top { display: flex; align-items: center; gap: 8px; }
.logo { width: 110px; height: 61px; object-fit: cover; margin-right: auto; cursor: pointer; }
.small { height: 32px; }
.user { max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.logout { padding: 0 12px; }
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 11px;
  border-radius: 12px;
  background: var(--white);
}
.search input { flex: 1; border: none; outline: none; background: none; color: var(--black); }
.search input::placeholder { color: var(--black); }
.search svg { cursor: pointer; flex-shrink: 0; }
</style>