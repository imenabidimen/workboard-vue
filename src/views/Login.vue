<template>
  <section class="card">
    <p class="eyebrow">WorkBoard</p>
    <h1>{{ mode === 'login' ? 'Welcome back' : 'Create your workspace' }}</h1>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" autocomplete="email" placeholder="Email" required />
      <input v-model="password" type="password" :autocomplete="mode === 'login' ? 'current-password' : 'new-password'" placeholder="Password" minlength="8" required />
      <button :disabled="busy">{{ busy ? 'Working…' : mode === 'login' ? 'Sign in' : 'Create account' }}</button>
    </form>
    <p v-if="error" role="alert">{{ error }}</p>
    <button class="switch" @click="toggleMode">{{ mode === 'login' ? 'Need an account?' : 'Already have an account?' }}</button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../services/api';

const mode = ref<'login' | 'register'>('login');
const email = ref('');
const password = ref('');
const error = ref('');
const busy = ref(false);
const router = useRouter();

function toggleMode() {
  mode.value = mode.value === 'login' ? 'register' : 'login';
  error.value = '';
}

async function submit() {
  busy.value = true;
  error.value = '';
  try {
    const result = mode.value === 'login'
      ? await api.login(email.value, password.value)
      : await api.register(email.value, password.value);
    localStorage.setItem('accessToken', result.accessToken);
    router.push('/');
  } catch (err) {
    if (mode.value === 'login') {
      error.value = 'Unable to sign in. Check your credentials.';
    } else {
      error.value = err instanceof Error ? err.message : 'Unable to create the account.';
    }
  } finally {
    busy.value = false;
  }
</script>

<style scoped>
.card{background:#fff;border:1px solid #e7e9ee;border-radius:14px;padding:32px;max-width:460px;margin:0 auto;box-shadow:0 8px 30px rgba(20,25,35,.05)}.eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:.75rem;font-weight:700;color:#68707c}form{display:grid;gap:12px}input{padding:12px;border:1px solid #d8dce2;border-radius:8px;font:inherit}button{padding:11px 16px;border:0;border-radius:8px;background:#20242b;color:#fff;font:inherit;cursor:pointer}button:disabled{opacity:.55}.switch{background:none;color:#20242b;padding:12px 0 0;text-decoration:underline}
</style>
