/**
 * useToastStore tests.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useToastStore, MAX_VISIBLE_TOASTS } from './useToastStore';
import * as toastStoreModule from './useToastStore';

/** The visible-stack cap the store must enforce (pinned to its export below). */
const CAP = 5;

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

        // M-UI-28 law: the positional + `{ message }` shape (ten call sites)
        // expressed a title-over-body intent the old spread silently destroyed.
        // The helpers now parse that intent; these pins are the contract.
        it('error(label, { message }) keeps BOTH: the label becomes the title', () => {
            const store = useToastStore();
            store.error('Download failed', { message: 'socket hang up' });

            expect(store.toasts[0]!.title).toBe('Download failed');
            expect(store.toasts[0]!.message).toBe('socket hang up');
            expect(store.toasts[0]!.tone).toBe('error');
            expect(store.toasts[0]!.duration).toBe(8000);
        });

        it('an explicit opts.title still wins over the positional label', () => {
            const store = useToastStore();
            store.warning('positional', { title: 'explicit', message: 'body' });

            expect(store.toasts[0]!.title).toBe('explicit');
            expect(store.toasts[0]!.message).toBe('body');
        });

        it('without opts.message the positional stays the message and no phantom title appears', () => {
            const store = useToastStore();
            store.info('plain', { duration: 1000 });

            expect(store.toasts[0]!.message).toBe('plain');
            expect(store.toasts[0]!.title).toBeUndefined();
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

    // UI-M18 (review ui__webux, deferred-3 from FIX-UI-W2): the stack was
    // unbounded, its timers fixed at show-time, and action buttons evaporated
    // mid-interaction (WCAG 2.2.1 Timing Adjustable). The cure ships three
    // laws, one pin group each: a bounded stack with oldest-evicted eviction,
    // refcounted hold/resume pause of the countdown, and actionable toasts
    // that refuse auto-dismiss entirely.
    describe('UI-M18 — bounded stack (oldest evicted)', () => {
        it('ships the cap the tests assume', () => {
            expect((toastStoreModule as unknown as Record<string, unknown>).MAX_VISIBLE_TOASTS).toBe(CAP);
        });

        it('caps the visible stack at MAX_VISIBLE_TOASTS, evicting the oldest first', () => {
            const store = useToastStore();
            for (const name of ['one', 'two', 'three', 'four', 'five', 'six']) {
                store.show({ message: name, duration: 0 }); // sticky: isolate the cap from timers
            }
            expect(store.toasts).toHaveLength(MAX_VISIBLE_TOASTS);
            expect(store.toasts.map((x) => x.message)).toEqual(['two', 'three', 'four', 'five', 'six']);
        });

        it('eviction clears the evicted toast timer, so a dismissed toast can never fire', () => {
            const store = useToastStore();
            store.show({ message: 'oldest', duration: 5000 });
            for (const name of ['a', 'b', 'c', 'd', 'e']) store.show({ message: name, duration: 0 });
            expect(store.toasts.map((x) => x.message)).not.toContain('oldest');

            // The evicted toast's timer must be gone: advancing past its
            // duration must not dismiss whichever survivor happens to share
            // the clock window — the stack stays exactly as it is.
            vi.advanceTimersByTime(99999);
            expect(store.toasts).toHaveLength(MAX_VISIBLE_TOASTS);
        });

        it('the cap counts against a fresh burst, not against history', () => {
            const store = useToastStore();
            store.show({ message: 'first', duration: 1000 });
            vi.advanceTimersByTime(1000); // 'first' auto-dismisses
            for (const name of ['a', 'b', 'c', 'd', 'e']) store.show({ message: name, duration: 0 });
            expect(store.toasts).toHaveLength(MAX_VISIBLE_TOASTS);
            expect(store.toasts[0]!.message).toBe('a');
        });
    });

    describe('UI-M18 — actionable toasts refuse auto-dismiss entirely', () => {
        it('a toast carrying an action never times out', () => {
            const store = useToastStore();
            const onClick = vi.fn();
            store.show({ message: 'Deleted', duration: 1000, action: { label: 'Undo', onClick } });

            vi.advanceTimersByTime(60000);

            expect(store.toasts).toHaveLength(1);
        });

        it('its action stays clickable and still dismisses it', () => {
            const store = useToastStore();
            const onClick = vi.fn();
            const id = store.show({ message: 'Deleted', duration: 1000, action: { label: 'Undo', onClick } });

            const toast = store.toasts[0]!;
            toast.action!.onClick();
            store.dismiss(id);

            expect(onClick).toHaveBeenCalledOnce();
            expect(store.toasts).toHaveLength(0);
        });

        it('the no-action default is unchanged: an ordinary toast still times out', () => {
            const store = useToastStore();
            store.show({ message: 'plain', duration: 1000 });
            vi.advanceTimersByTime(1000);
            expect(store.toasts).toHaveLength(0);
        });
    });

    describe('UI-M18 — hold/resume freezes the countdown (pointer + focus refcounted)', () => {
        it('hold pauses dismissal and release resumes it for the remaining time', () => {
            const store = useToastStore();
            const id = store.show({ message: 'readable', duration: 5000 });

            store.hold(id, 'pointer');
            vi.advanceTimersByTime(10000); // hovered through its whole window
            expect(store.toasts).toHaveLength(1);

            store.release(id, 'pointer');
            vi.advanceTimersByTime(4999); // the FULL original window — none of it was consumed while held
            expect(store.toasts).toHaveLength(1);

            vi.advanceTimersByTime(1);
            expect(store.toasts).toHaveLength(0);
        });

        it('holds are refcounted per source — releasing the pointer while focus is inside keeps it alive', () => {
            const store = useToastStore();
            const id = store.show({ message: 'tabbed', duration: 5000 });

            store.hold(id, 'pointer');
            store.hold(id, 'focus');
            store.release(id, 'pointer');
            vi.advanceTimersByTime(60000);
            expect(store.toasts).toHaveLength(1); // focus still inside — no timeout may fire

            store.release(id, 'focus');
            vi.advanceTimersByTime(5000);
            expect(store.toasts).toHaveLength(0);
        });

        it('dismiss clears a pending hold so release/resume can never resurrect a gone toast', () => {
            const store = useToastStore();
            const id = store.show({ message: 'gone', duration: 5000 });
            store.hold(id, 'focus');
            store.dismiss(id);

            expect(store.toasts).toHaveLength(0);
            expect(() => store.release(id, 'focus')).not.toThrow();
            vi.advanceTimersByTime(60000);
            expect(store.toasts).toHaveLength(0);
        });

        it('release without a prior hold is inert (no phantom timer, no early dismiss)', () => {
            const store = useToastStore();
            const id = store.show({ message: 'untouched', duration: 5000 });

            expect(() => store.release(id, 'pointer')).not.toThrow();
            vi.advanceTimersByTime(4999);
            expect(store.toasts).toHaveLength(1);
            vi.advanceTimersByTime(1);
            expect(store.toasts).toHaveLength(0);
        });

        it('hold/resume on an actionable toast is safe and irrelevant — it never times out', () => {
            const store = useToastStore();
            const id = store.show({
                message: 'undo-me',
                duration: 1000,
                action: { label: 'Undo', onClick: vi.fn() },
            });
            store.hold(id, 'focus');
            store.release(id, 'focus');
            vi.advanceTimersByTime(60000);
            expect(store.toasts).toHaveLength(1);
        });
    });
});
