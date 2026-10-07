<template>
  <section class="auth-shell">
    <div class="intro">
      <span class="pill">TODAY · TASKS · DONE</span>
      <h1>Keep today's work in one place.</h1>
      <p>A small workspace for the work you need to get through today.</p>
      <div class="benefits"><div><b>01</b><span>Capture work quickly</span></div><div><b>02</b><span>Track what is still open</span></div><div><b>03</b><span>Close the loop</span></div></div>
    </div>
    <section class="card">
      <p class="eyebrow">{{ mode === 'login' ? 'WELCOME BACK' : 'GET STARTED' }}</p>
      <h2>{{ mode === 'login' ? 'Sign in to WorkBoard' : 'Create your account' }}</h2>
      <p class="muted">{{ mode === 'login' ? 'Pick up where you left off.' : 'Start with a simple workspace.' }}</p>
      <form @submit.prevent="submit">
        <label>Email<input v-model="email" type="email" autocomplete="email" placeholder="you@example.com" required /></label>
        <label>Password<input v-model="password" type="password" :autocomplete="mode === 'login' ? 'current-password' : 'new-password'" placeholder="Minimum 8 characters" minlength="8" required /></label>
        <button class="primary" :disabled="busy">{{ busy ? 'Working…' : mode === 'login' ? 'Sign in →' : 'Create account →' }}</button>
      </form>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <button class="switch" @click="toggleMode">{{ mode === 'login' ? 'New here? Create an account' : 'Already registered? Sign in' }}</button>
    </section>
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
    const result =
      mode.value === 'login'
        ? await api.login(email.value, password.value)
        : await api.register(email.value, password.value);

    localStorage.setItem('accessToken', result.accessToken);
    router.push('/');
  } catch (err) {
    error.value =
      mode.value === 'login'
        ? 'Unable to sign in. Check your credentials.'
        : err instanceof Error
          ? err.message
          : 'Unable to create the account.';
  } finally {
    busy.value = false;
  }
}
</script>

<style scoped>
.auth-shell{display:grid;grid-template-columns:1.15fr .85fr;gap:70px;align-items:center;min-height:calc(100vh - 170px)}.intro{max-width:580px}.pill{display:inline-block;padding:7px 10px;border:1px solid #d9e0ea;border-radius:999px;font-size:.7rem;font-weight:800;letter-spacing:.1em;color:#536074}.intro h1{font-size:clamp(2.6rem,5vw,4.4rem);line-height:1.02;letter-spacing:-.055em;margin:20px 0}.intro>p{font-size:1.08rem;line-height:1.7;color:#68758a;max-width:500px}.benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:42px}.benefits div{padding:16px;background:#fff;border:1px solid #e4e9f0;border-radius:14px}.benefits b{display:block;font-size:.72rem;color:#8a94a6;margin-bottom:20px}.benefits span{font-weight:700;font-size:.85rem}.card{background:#fff;border:1px solid #e2e7ef;border-radius:22px;padding:34px;box-shadow:0 20px 60px rgba(23,32,51,.08)}.eyebrow{font-size:.7rem;letter-spacing:.12em;font-weight:800;color:#738097}.card h2{font-size:1.65rem;margin:10px 0}.muted{color:#7a8495;margin-bottom:24px}.card form{display:grid;gap:14px}.card label{display:grid;gap:7px;font-size:.78rem;font-weight:750}.card input{width:100%;padding:13px 14px;border:1px solid #d8dee8;border-radius:10px;font:inherit;outline:none}.card input:focus{border-color:#172033;box-shadow:0 0 0 3px #17203312}.primary{padding:13px 16px;border:0;border-radius:10px;background:#172033;color:#fff;font:inherit;font-weight:750;cursor:pointer;margin-top:4px}.primary:disabled{opacity:.55}.switch{border:0;background:none;color:#5d687a;font:inherit;font-size:.82rem;margin-top:20px;padding:0;cursor:pointer}.error{color:#a13d3d;font-size:.84rem}@media(max-width:850px){.auth-shell{grid-template-columns:1fr;gap:28px}.intro h1{font-size:3rem}.benefits{display:none}}
</style>