/**
 * usePlayerUiStore tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePlayerUiStore } from './usePlayerUiStore';

describe('usePlayerUiStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('initial state', () => {
        it('starts with theaterActive false', () => {
            const store = usePlayerUiStore();
            expect(store.theaterActive).toBe(false);
        });
    });

    describe('setTheaterActive', () => {
        it('sets theaterActive to true', () => {
            const store = usePlayerUiStore();
            store.setTheaterActive(true);
            expect(store.theaterActive).toBe(true);
        });

        it('sets theaterActive to false', () => {
            const store = usePlayerUiStore();
            store.setTheaterActive(true);
            store.setTheaterActive(false);
            expect(store.theaterActive).toBe(false);
        });

        it('can toggle multiple times', () => {
            const store = usePlayerUiStore();
            store.setTheaterActive(true);
            store.setTheaterActive(false);
            store.setTheaterActive(true);
            expect(store.theaterActive).toBe(true);
        });
    });

    describe('reset', () => {
        it('resets theaterActive to false', () => {
            const store = usePlayerUiStore();
            store.setTheaterActive(true);
            store.reset();
            expect(store.theaterActive).toBe(false);
        });

        it('is safe to call when already false', () => {
            const store = usePlayerUiStore();
            store.reset();
            expect(store.theaterActive).toBe(false);
        });

        it('reset overrides a true state', () => {
            const store = usePlayerUiStore();
            store.setTheaterActive(true);
            store.setTheaterActive(true); // set again
            store.reset();
            expect(store.theaterActive).toBe(false);
        });
    });

    describe('return shape', () => {
        it('exposes theaterActive, setTheaterActive, and reset', () => {
            const store = usePlayerUiStore();
            expect(store).toHaveProperty('theaterActive');
            expect(store).toHaveProperty('setTheaterActive');
            expect(store).toHaveProperty('reset');
            expect(typeof store.setTheaterActive).toBe('function');
            expect(typeof store.reset).toBe('function');
        });
    });
});
