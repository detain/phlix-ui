/**
 * useSettingsPrefs tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSettingsPrefsStore } from './useSettingsPrefs';

const STORAGE_KEY = 'phlix-settings-prefs';

describe('useSettingsPrefsStore', () => {
    beforeEach(() => {
        localStorage.clear();
        setActivePinia(createPinia());
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('initial state', () => {
        it('defaults advancedMode to false', () => {
            const store = useSettingsPrefsStore();
            expect(store.advancedMode).toBe(false);
        });

        it('reads advancedMode from localStorage if present', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ advancedMode: true }));
            setActivePinia(createPinia());
            const store = useSettingsPrefsStore();
            expect(store.advancedMode).toBe(true);
        });

        it('ignores malformed JSON in localStorage', () => {
            localStorage.setItem(STORAGE_KEY, 'not-json');
            setActivePinia(createPinia());
            const store = useSettingsPrefsStore();
            expect(store.advancedMode).toBe(false);
        });

        it('handles partial localStorage data', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ advancedMode: true }));
            setActivePinia(createPinia());
            const store = useSettingsPrefsStore();
            expect(store.advancedMode).toBe(true);
        });
    });

    describe('setAdvancedMode', () => {
        it('sets advancedMode to true', () => {
            const store = useSettingsPrefsStore();
            store.setAdvancedMode(true);
            expect(store.advancedMode).toBe(true);
        });

        it('sets advancedMode to false', () => {
            const store = useSettingsPrefsStore();
            store.setAdvancedMode(true);
            store.setAdvancedMode(false);
            expect(store.advancedMode).toBe(false);
        });
    });

    describe('toggleAdvancedMode', () => {
        it('toggles from false to true', () => {
            const store = useSettingsPrefsStore();
            expect(store.advancedMode).toBe(false);
            store.toggleAdvancedMode();
            expect(store.advancedMode).toBe(true);
        });

        it('toggles from true to false', () => {
            const store = useSettingsPrefsStore();
            store.setAdvancedMode(true);
            store.toggleAdvancedMode();
            expect(store.advancedMode).toBe(false);
        });
    });

    describe('localStorage persistence', () => {
        it('persists advancedMode changes to localStorage', async () => {
            const store = useSettingsPrefsStore();
            store.setAdvancedMode(true);

            // Vue watcher is async, so wait for it to flush
            await new Promise((r) => setTimeout(r, 0));

            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
            expect(stored.advancedMode).toBe(true);
        });

        it('survives a store re-creation (reload)', async () => {
            const store1 = useSettingsPrefsStore();
            store1.setAdvancedMode(true);

            // Wait for watcher to flush
            await new Promise((r) => setTimeout(r, 0));

            // Simulate page reload by creating new pinia and store instance
            setActivePinia(createPinia());
            const store2 = useSettingsPrefsStore();

            expect(store2.advancedMode).toBe(true);
        });
    });

    describe('return shape', () => {
        it('exposes required properties and methods', () => {
            const store = useSettingsPrefsStore();
            expect(store).toHaveProperty('advancedMode');
            expect(store).toHaveProperty('setAdvancedMode');
            expect(store).toHaveProperty('toggleAdvancedMode');
            expect(typeof store.setAdvancedMode).toBe('function');
            expect(typeof store.toggleAdvancedMode).toBe('function');
        });
    });
});
