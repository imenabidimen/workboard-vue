<template>
  <section>
    <h1>My tasks</h1>
    <form @submit.prevent="add">
      <input v-model="title" placeholder="What needs doing?" minlength="2" required />
      <button :disabled="busy">Add task</button>
    </form>
    <p v-if="loading">Loading…</p>
    <p v-if="error">{{ error }}</p>
    <p v-if="!loading && !tasks.length">You are all caught up.</p>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span :class="{ done: task.completed }">{{ task.title }}</span>
        <button @click="complete(task.id)" :disabled="task.completed">
          {{ task.completed ? 'Done' : 'Complete' }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../services/api';

type Task = { id: string; title: string; completed: boolean };

const tasks = ref<Task[]>([]);
const title = ref('');
const loading = ref(true);
const busy = ref(false);
const error = ref('');
const router = useRouter();

function logout() {
  localStorage.removeItem('accessToken');
  router.push('/login');
}

async function load() {
  try {
    tasks.value = await api.tasks();
  } catch {
    error.value = 'Could not load tasks.';
  } finally {
    loading.value = false;
  }
}

async function add() {
  busy.value = true;
  error.value = '';
  try {
    tasks.value.unshift(await api.createTask(title.value));
    title.value = '';
  } catch {
    error.value = 'Could not create task.';
  } finally {
    busy.value = false;
  }
}

async function complete(id: string) {
  try {
    const updated = await api.completeTask(id);
    const index = tasks.value.findIndex((task) => task.id === id);
    if (index >= 0) tasks.value[index] = updated;
  } catch {
    error.value = 'Could not update task.';
  }
}

onMounted(load);
</script>
<style scoped>
.toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}.eyebrow{margin:0 0 4px;text-transform:uppercase;letter-spacing:.08em;font-size:.75rem;font-weight:700;color:#68707c}h1{margin:0}form{display:flex;gap:10px;margin-bottom:20px}input{flex:1;padding:12px;border:1px solid #d8dce2;border-radius:8px;font:inherit}button{padding:10px 16px;border:0;border-radius:8px;background:#20242b;color:#fff;cursor:pointer}button:disabled{opacity:.55}ul{list-style:none;padding:0;margin:0}li{display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-bottom:1px solid #eee}.done{text-decoration:line-through;color:#7b828c}@media(max-width:600px){form{flex-direction:column}.toolbar{align-items:flex-start}li{align-items:flex-start;flex-direction:column}}
</style>
