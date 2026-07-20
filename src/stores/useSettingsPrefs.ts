/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export interface SettingsPrefsState {
  advancedMode: boolean;
}

const STORAGE_KEY = 'phlix-settings-prefs';

const DEFAULT_STATE: SettingsPrefsState = {
  advancedMode: false,
};

function readFromStorage(): SettingsPrefsState {
  if (typeof localStorage === 'undefined') return { ...DEFAULT_STATE };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw) as Partial<SettingsPrefsState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

/**
 * useSettingsPrefs — tiny store for persisting the user's Advanced mode preference.
 */
export const useSettingsPrefsStore = defineStore('phlix-settings-prefs', () => {
  const initial = readFromStorage();

  const advancedMode = ref<boolean>(initial.advancedMode);

  function setAdvancedMode(value: boolean): void {
    advancedMode.value = value;
  }

  function toggleAdvancedMode(): void {
    advancedMode.value = !advancedMode.value;
  }

  function snapshot(): SettingsPrefsState {
    return { advancedMode: advancedMode.value };
  }

  watch(snapshot, (val) => {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    } catch {
      /* quota / private mode — ignore */
    }
  }, { deep: true });

  return {
    advancedMode,
    setAdvancedMode,
    toggleAdvancedMode,
  };
});
