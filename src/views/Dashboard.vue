<template>
  <section class="dashboard">
    <div class="hero"><div><p class="eyebrow">TODAY'S WORKSPACE</p><h1>My tasks</h1><p class="sub">A focused list for the things that need to move forward.</p></div><div class="date-card"><span>STATUS</span><b>{{ completedCount }} / {{ tasks.length }}</b><small>completed</small></div></div>
    <div class="stats"><div><span>Open</span><strong>{{ openCount }}</strong></div><div><span>Completed</span><strong>{{ completedCount }}</strong></div><div><span>Total</span><strong>{{ tasks.length }}</strong></div></div>
    <section class="board">
      <form @submit.prevent="add" class="composer"><input v-model="title" placeholder="What needs doing?" minlength="2" required aria-label="New task" /><button :disabled="busy">{{ busy ? 'Adding…' : 'Add task' }}</button></form>
      <p v-if="loading" class="muted">Loading your workspace…</p><p v-if="error" class="error">{{ error }}</p>
      <div v-if="!loading && !tasks.length" class="empty"><span>✓</span><div><b>Nothing queued</b><p>You are all caught up. Add your next task above.</p></div></div>
      <ul v-else class="tasks"><li v-for="task in tasks" :key="task.id" :class="{completed:task.completed}"><div class="task-main"><span class="status-dot"></span><div><strong>{{ task.title }}</strong><small>{{ task.completed ? 'Completed' : 'In progress' }}</small></div></div><button class="complete" @click="complete(task.id)" :disabled="task.completed">{{ task.completed ? 'Done' : 'Complete' }}</button></li></ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { api } from '../services/api';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const tasks = ref<Task[]>([]);
const title = ref('');
const loading = ref(true);
const busy = ref(false);
const error = ref('');

const completedCount = computed(
  () => tasks.value.filter((task) => task.completed).length
);

const openCount = computed(
  () => tasks.value.length - completedCount.value
);

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
    const task = await api.createTask(title.value);
    tasks.value.unshift(task);
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

    if (index >= 0) {
      tasks.value[index] = updated;
    }
  } catch {
    error.value = 'Could not update task.';
  }
}

onMounted(load);
</script>

<style scoped>
.dashboard{max-width:920px;margin:auto}.hero{display:flex;justify-content:space-between;gap:25px;align-items:flex-end;margin-bottom:28px}.eyebrow{font-size:.7rem;letter-spacing:.12em;font-weight:800;color:#7c8799;margin:0 0 8px}.hero h1{font-size:2.5rem;letter-spacing:-.04em;margin:0 0 7px}.sub{color:#748095;margin:0}.date-card{min-width:125px;padding:15px 17px;background:#fff;border:1px solid #e2e7ef;border-radius:15px}.date-card span,.date-card small{display:block;color:#8791a2;font-size:.67rem;font-weight:750}.date-card b{display:block;font-size:1.45rem;margin:5px 0}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}.stats div{padding:17px 19px;background:#fff;border:1px solid #e3e8f0;border-radius:14px}.stats span{display:block;color:#7b8698;font-size:.75rem}.stats strong{font-size:1.45rem}.board{background:#fff;border:1px solid #e0e6ef;border-radius:20px;padding:20px;box-shadow:0 15px 45px rgba(23,32,51,.06)}.composer{display:flex;gap:10px;margin-bottom:16px}.composer input{flex:1;padding:13px 14px;border:1px solid #d8dee8;border-radius:10px;font:inherit}.composer button,.complete{padding:11px 15px;border:0;border-radius:9px;background:#172033;color:#fff;font:inherit;font-weight:700;cursor:pointer}.composer button:disabled,.complete:disabled{opacity:.55}.tasks{list-style:none;padding:0;margin:0}.tasks li{display:flex;justify-content:space-between;align-items:center;gap:15px;padding:17px 6px;border-top:1px solid #edf0f4}.task-main{display:flex;gap:13px;align-items:center}.status-dot{width:9px;height:9px;border-radius:50%;background:#172033}.task-main strong{display:block;font-size:.93rem}.task-main small{display:block;color:#8a94a5;margin-top:4px}.completed strong{text-decoration:line-through;color:#8a94a5}.completed .status-dot{background:#aab3c0}.complete:disabled{background:#eef1f5;color:#778294}.empty{display:flex;gap:15px;align-items:center;padding:32px 10px;color:#657185}.empty>span{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:#eef1f5;font-weight:800}.empty p{margin:5px 0 0;color:#8a94a5}.muted,.error{color:#7b8698}.error{color:#a13d3d}@media(max-width:650px){.hero{align-items:flex-start;flex-direction:column}.stats{grid-template-columns:1fr}.composer{flex-direction:column}}
</style>