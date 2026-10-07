<template>
  <nav>
    <strong>WorkBoard</strong>
    <div class="nav-links">
      <RouterLink v-if="isAuthenticated" to="/">My tasks</RouterLink>
      <RouterLink v-else to="/login">Sign in</RouterLink>
      <button v-if="isAuthenticated" class="link-button" @click="logout">Log out</button>
    </div>
  </nav>
  <main><RouterView /></main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = computed(() => Boolean(localStorage.getItem('accessToken')));

function logout() {
  localStorage.removeItem('accessToken');
  router.push('/login');
}
</script>

<style>
body{font-family:Inter,system-ui;margin:0;background:#f6f7fb;color:#20242b}
nav{display:flex;justify-content:space-between;align-items:center;padding:20px 8%;background:white;border-bottom:1px solid #eceef2}
.nav-links{display:flex;gap:18px;align-items:center}.link-button{border:0;background:none;color:#20242b;cursor:pointer;font:inherit;padding:0}
main{max-width:900px;margin:40px auto;padding:0 20px}a{color:inherit}
</style>
