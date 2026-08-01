/**
 * useToastStore tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useToastStore } from './useToastStore';

describe('useToastStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe('show', () => {
        it('adds toast to the list with default tone and duration', () => {
            const store = useToastStore();
            const id = store.show({ message: 'Hello' });

            expect(id).toBe(1);
            expect(store.toasts).toHaveLength(1);
            expect(store.toasts[0]!.message).toBe('Hello');
            expect(store.toasts[0]!.tone).toBe('neutral');
            expect(store.toasts[0]!.duration).toBe(5000);
        });

        it('uses provided tone and duration', () => {
            const store = useToastStore();
            store.show({ message: 'Error!', tone: 'error', duration: 8000 });

            expect(store.toasts[0]!.tone).toBe('error');
            expect(store.toasts[0]!.duration).toBe(8000);
        });

        it('assigns sequential IDs', () => {
            const store = useToastStore();
            const id1 = store.show({ message: 'One' });
            const id2 = store.show({ message: 'Two' });
            const id3 = store.show({ message: 'Three' });

            expect(id1).toBe(1);
            expect(id2).toBe(2);
            expect(id3).toBe(3);
            expect(store.toasts[2]!.id).toBe(3);
        });

        it('includes optional title and icon', () => {
            const store = useToastStore();
            store.show({ message: 'Msg', title: 'Title', icon: 'check' });

            expect(store.toasts[0]!.title).toBe('Title');
            expect(store.toasts[0]!.icon).toBe('check');
        });

        it('includes optional action', () => {
            const store = useToastStore();
            const onClick = vi.fn();
            store.show({ message: 'Msg', action: { label: 'Undo', onClick } });

            expect(store.toasts[0]!.action).toBeDefined();
            expect(store.toasts[0]!.action!.label).toBe('Undo');
        });

        it('schedules auto-dismiss for non-zero duration', () => {
            const store = useToastStore();
            const id = store.show({ message: 'Auto-dismiss', duration: 3000 });

            expect(store.toasts[0]!.id).toBe(id);
        });

        it('does not schedule timer for duration=0 (sticky)', () => {
            const store = useToastStore();
            store.show({ message: 'Sticky', duration: 0 });

            expect(store.toasts[0]!.duration).toBe(0);
        });
    });

    describe('dismiss', () => {
        it('removes toast by id', () => {
            const store = useToastStore();
            const id = store.show({ message: 'To remove' });
            expect(store.toasts).toHaveLength(1);

            store.dismiss(id);

            expect(store.toasts).toHaveLength(0);
        });

        it('is safe to call with unknown id', () => {
            const store = useToastStore();
            store.show({ message: 'Hello' });

            expect(() => store.dismiss(999)).not.toThrow();
            expect(store.toasts).toHaveLength(1);
        });

        it('clears the timer on dismiss', () => {
            const store = useToastStore();
            const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

            const id = store.show({ message: 'With timer', duration: 5000 });
            store.dismiss(id);

            expect(clearTimeoutSpy).toHaveBeenCalled();
        });
    });

    describe('clear', () => {
        it('removes all toasts', () => {
            const store = useToastStore();
            store.show({ message: 'One' });
            store.show({ message: 'Two' });
            store.show({ message: 'Three' });
            expect(store.toasts).toHaveLength(3);

            store.clear();

            expect(store.toasts).toHaveLength(0);
        });

        it('clears all timers', () => {
            const store = useToastStore();
            store.show({ message: 'One', duration: 5000 });
            store.show({ message: 'Two', duration: 5000 });
            const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

            store.clear();

            expect(clearTimeoutSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe('convenience methods', () => {
        it('success creates a success toast', () => {
            const store = useToastStore();
            const id = store.success('Saved!');

            expect(store.toasts[0]!.tone).toBe('success');
            expect(store.toasts[0]!.message).toBe('Saved!');
            expect(store.toasts[0]!.id).toBe(id);
        });

        it('error creates an error toast with 8000ms duration', () => {
            const store = useToastStore();
            store.error('Failed');

            expect(store.toasts[0]!.tone).toBe('error');
            expect(store.toasts[0]!.message).toBe('Failed');
            expect(store.toasts[0]!.duration).toBe(8000);
        });

        it('warning creates a warning toast', () => {
            const store = useToastStore();
            store.warning('Caution');

            expect(store.toasts[0]!.tone).toBe('warning');
            expect(store.toasts[0]!.message).toBe('Caution');
        });

        it('info creates an info toast', () => {
            const store = useToastStore();
            store.info('FYI');

            expect(store.toasts[0]!.tone).toBe('info');
            expect(store.toasts[0]!.message).toBe('FYI');
        });

        it('convenience methods accept optional overrides', () => {
            const store = useToastStore();
            store.success('Custom', { duration: 3000 });

            expect(store.toasts[0]!.duration).toBe(3000);
        });
    });

    describe('auto-dismiss behavior', () => {
        it('auto-dismisses after the specified duration', () => {
            const store = useToastStore();
            store.show({ message: 'Auto', duration: 3000 });

            expect(store.toasts).toHaveLength(1);

            vi.advanceTimersByTime(3000);

            expect(store.toasts).toHaveLength(0);
        });

        it('does not auto-dismiss sticky toasts', () => {
            const store = useToastStore();
            store.show({ message: 'Sticky', duration: 0 });

            vi.advanceTimersByTime(999999);

            expect(store.toasts).toHaveLength(1);
        });

        it('only dismisses the correct toast when multiple exist', () => {
            const store = useToastStore();
            const id1 = store.show({ message: 'Fast', duration: 1000 });
            store.show({ message: 'Slow', duration: 5000 });

            vi.advanceTimersByTime(1000);

            expect(store.toasts).toHaveLength(1);
            expect(store.toasts[0]!.id).toBe(id1 + 1);
        });
    });

    describe('timer management', () => {
        it('replaces timer on duplicate dismiss call', () => {
            const store = useToastStore();
            const id = store.show({ message: 'Test', duration: 5000 });

            // Clear the original timer spy
            vi.spyOn(global, 'clearTimeout').mockClear();

            store.dismiss(id);
            store.dismiss(id); // second call should be safe

            // clearTimeout should only be called once (the first dismiss)
            expect(vi.spyOn(global, 'clearTimeout')).toHaveBeenCalledTimes(1);
        });
    });
});
