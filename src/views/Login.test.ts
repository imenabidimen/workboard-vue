import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Login from './Login.vue';

vi.mock('../services/api', () => ({
  api: { login: vi.fn() },
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('Login', () => {
  it('renders the fields and sign-in action', () => {
    const w = mount(Login);
    expect(w.find('input[type="email"]').exists()).toBe(true);
    expect(w.find('input[type="password"]').exists()).toBe(true);
    expect(w.find('button').text()).toContain('Sign in');
  });

  it('shows a useful message when authentication fails', async () => {
    const { api } = await import('../services/api');
    vi.mocked(api.login).mockRejectedValueOnce(new Error('bad credentials'));

    const w = mount(Login);
    await w.find('input[type="email"]').setValue('dev@example.com');
    await w.find('input[type="password"]').setValue('wrongpass');
    await w.find('form').trigger('submit');

    expect(w.text()).toContain('Unable to sign in. Check your credentials.');
  });
});