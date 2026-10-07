const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(API_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const body = await response.json();
      message = body.message ?? message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  login: (email: string, password: string) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email: string, password: string) => request('/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) }),
  tasks: () => request('/tasks'),
  createTask: (title: string) => request('/tasks', { method: 'POST', body: JSON.stringify({ title }) }),
  completeTask: (id: string) => request('/tasks/' + id + '/complete', { method: 'POST' }),
};
