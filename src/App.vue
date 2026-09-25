<template>
  <nav>
    <strong>WorkBoard</strong>
    <RouterLink v-if="isSignedIn" to="/">My tasks</RouterLink>
    <RouterLink v-else to="/login">Sign in</RouterLink>
  </nav>
  <main><RouterView /></main>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const isSignedIn = computed(() => Boolean(localStorage.getItem('accessToken')));
</script>

<style>
body{font-family:Inter,system-ui;margin:0;background:#f6f7fb;color:#20242b}
nav{display:flex;justify-content:space-between;align-items:center;padding:20px 8%;background:white}
main{max-width:900px;margin:40px auto;padding:0 20px}
a{color:inherit}
</style>
