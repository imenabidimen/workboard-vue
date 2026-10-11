import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Dashboard from './Dashboard.vue';
import { api } from '../services/api';

vi.mock('../services/api', () => ({
  api: {
    tasks: vi.fn(),
    createTask: vi.fn(),
    completeTask: vi.fn(),
  },
}));

const mockedApi = vi.mocked(api);

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not show the empty state when loading tasks fails', async () => {
    mockedApi.tasks.mockRejectedValueOnce(new Error('network unavailable'));

    const wrapper = mount(Dashboard);
    await flushPromises();

    expect(wrapper.text()).toContain('Could not load tasks.');
    expect(wrapper.text()).not.toContain('Nothing queued');
  });

  it('rejects a task title made only of spaces', async () => {
    mockedApi.tasks.mockResolvedValueOnce([]);

    const wrapper = mount(Dashboard);
    await flushPromises();

    await wrapper.get('input[aria-label="New task"]').setValue('   ');
    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(wrapper.text()).toContain('Enter a task with at least 2 characters.');
    expect(mockedApi.createTask).not.toHaveBeenCalled();
  });

  it('keeps the task open and shows an error when completion fails', async () => {
    mockedApi.tasks.mockResolvedValueOnce([
      { id: 'task-1', title: 'Prepare release', completed: false },
    ]);
    mockedApi.completeTask.mockRejectedValueOnce(new Error('network unavailable'));

    const wrapper = mount(Dashboard);
    await flushPromises();

    await wrapper.get('button.complete').trigger('click');
    await flushPromises();

    expect(wrapper.text()).toContain('Could not update task.');
    expect(wrapper.text()).toContain('Prepare release');
    expect(wrapper.find('button.complete').text()).toBe('Complete');
  });

  it('sends a trimmed title and adds the returned task', async () => {
    const task = { id: 'task-1', title: 'Prepare release', completed: false };
    mockedApi.tasks.mockResolvedValueOnce([]);
    mockedApi.createTask.mockResolvedValueOnce(task);

    const wrapper = mount(Dashboard);
    await flushPromises();

    await wrapper.get('input[aria-label="New task"]').setValue('  Prepare release  ');
    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(mockedApi.createTask).toHaveBeenCalledWith('Prepare release');
    expect(wrapper.text()).toContain('Prepare release');
  });
});
