<template>
  <nav class="nav">
    <div class="brand"><span class="brand-mark">W</span><div><strong>WorkBoard</strong><small>Personal execution space</small></div></div>
    <div class="nav-links">
      <RouterLink v-if="isAuthenticated" to="/">Workspace</RouterLink>
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
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;color:#172033;background:#f4f7fb}
*{box-sizing:border-box}body{margin:0}.nav{height:76px;display:flex;justify-content:space-between;align-items:center;padding:0 7%;background:#fff;border-bottom:1px solid #e7ebf2}.brand{display:flex;align-items:center;gap:12px}.brand-mark{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:#172033;color:#fff;font-weight:800}.brand strong{display:block;font-size:1rem}.brand small{display:block;color:#7a8495;font-size:.72rem;margin-top:2px}.nav-links{display:flex;gap:22px;align-items:center}.nav a{text-decoration:none;color:#667085;font-weight:650}.nav a.router-link-active{color:#172033}.link-button{border:0;background:none;color:#667085;cursor:pointer;font:inherit}.nav+main{max-width:1080px;margin:0 auto;padding:46px 24px}@media(max-width:650px){.nav{padding:0 18px}.brand small{display:none}.nav+main{padding:28px 16px}}
</style>