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
import { api } from '../services/api';

type Task = { id: string; title: string; completed: boolean };

const tasks = ref<Task[]>([]);
const title = ref('');
const loading = ref(true);
const busy = ref(false);
const error = ref('');

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