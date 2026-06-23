import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import {
  useServerStore,
  CURRENT_SERVER_ID_KEY,
  CURRENT_SERVER_NAME_KEY,
} from './useServerStore';

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('useServerStore', () => {
  it('starts with no current server when nothing is persisted', () => {
    const store = useServerStore();
    expect(store.currentServerId).toBeNull();
    expect(store.currentServerName).toBeNull();
    expect(store.hasCurrent).toBe(false);
  });

  it('setCurrent selects a server and persists it to localStorage', () => {
    const store = useServerStore();
    store.setCurrent('srv-1', 'Living Room');
    expect(store.currentServerId).toBe('srv-1');
    expect(store.currentServerName).toBe('Living Room');
    expect(store.hasCurrent).toBe(true);
    expect(localStorage.getItem(CURRENT_SERVER_ID_KEY)).toBe('srv-1');
    expect(localStorage.getItem(CURRENT_SERVER_NAME_KEY)).toBe('Living Room');
  });

  it('rehydrates the persisted selection on construction', () => {
    localStorage.setItem(CURRENT_SERVER_ID_KEY, 'srv-restored');
    localStorage.setItem(CURRENT_SERVER_NAME_KEY, 'Restored');
    // Fresh pinia so the store re-reads localStorage in its setup.
    setActivePinia(createPinia());
    const store = useServerStore();
    expect(store.currentServerId).toBe('srv-restored');
    expect(store.currentServerName).toBe('Restored');
    expect(store.hasCurrent).toBe(true);
  });

  it('setCurrent without a name clears the persisted name', () => {
    localStorage.setItem(CURRENT_SERVER_NAME_KEY, 'Old');
    setActivePinia(createPinia());
    const store = useServerStore();
    store.setCurrent('srv-2');
    expect(store.currentServerName).toBeNull();
    expect(localStorage.getItem(CURRENT_SERVER_NAME_KEY)).toBeNull();
    expect(localStorage.getItem(CURRENT_SERVER_ID_KEY)).toBe('srv-2');
  });

  it('clear() resets the selection and removes it from localStorage', () => {
    const store = useServerStore();
    store.setCurrent('srv-3', 'Den');
    store.clear();
    expect(store.currentServerId).toBeNull();
    expect(store.currentServerName).toBeNull();
    expect(store.hasCurrent).toBe(false);
    expect(localStorage.getItem(CURRENT_SERVER_ID_KEY)).toBeNull();
    expect(localStorage.getItem(CURRENT_SERVER_NAME_KEY)).toBeNull();
  });
});
