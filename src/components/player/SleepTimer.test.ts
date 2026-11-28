/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * SleepTimer (S-ui-player-21 / phlix-ui-player-026) — the role=listbox must be
 * keyboard-operable: opening (trigger ArrowDown/ArrowUp) moves a roving focus to
 * an option, arrows walk with wrap, Enter/Space select and restore focus to the
 * trigger, Escape closes and restores focus, click-outside closes; option labels
 * and the active timer name resolve through the catalog (player.off +
 * media.runtimeMinutes + player.sleepTimerRemaining), and the exposed
 * toggleOpen() cancel contract the Player shortcut relies on is preserved.
 */
import { describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SleepTimer from './SleepTimer.vue';

function mountTimer(messages?: Record<string, Record<string, string>>) {
  const onExpire = vi.fn();
  const w = mount(SleepTimer, {
    props: { onExpire },
    global: messages ? { provide: { phlixConfig: { messages } } } : {},
    attachTo: document.body,
  });
  return { w, onExpire };
}

async function flushMenu() {
  // Microtask-level flush: the open watcher focuses its first option inside a
  // nextTick — two turns drain render + watcher (real AND fake timers).
  await nextTick();
  await nextTick();
}

const menu = (w: ReturnType<typeof mount>) => w.find('.sleep-timer__menu');
const options = (w: ReturnType<typeof mount>) => w.findAll('.sleep-timer__option');
const trigger = (w: ReturnType<typeof mount>) => w.find('.sleep-timer__trigger');

describe('SleepTimer — catalog-localized options (phlix-ui-player-026)', () => {
  it('renders the option list from the catalog in English', async () => {
    const { w } = mountTimer();
    await trigger(w).trigger('keydown', { key: 'ArrowDown' });
    await flushMenu();
    expect(options(w).map((el) => el.text())).toEqual([
      'Off', '5m', '15m', '30m', '45m', '60m', '90m',
    ]);
  });

  it('localizes Off and the minute labels through player.off / media.runtimeMinutes (German)', async () => {
    const { w } = mountTimer({
      player: { off: 'Aus' },
      media: { runtimeMinutes: '{minutes} Min.' },
    });
    await trigger(w).trigger('keydown', { key: 'ArrowDown' });
    await flushMenu();
    expect(options(w).map((el) => el.text())).toEqual([
      'Aus', '5 Min.', '15 Min.', '30 Min.', '45 Min.', '60 Min.', '90 Min.',
    ]);
  });

  it('names the active trigger via the sleepTimerRemaining template, localized (French)', async () => {
    const { w } = mountTimer({
      player: {
        sleepTimer: 'Minuterie d’arrêt',
        sleepTimerRemaining: 'Minuterie d’arrêt : {time} restantes',
      },
    });
    await trigger(w).trigger('keydown', { key: 'ArrowDown' });
    await flushMenu();
    await options(w)[3].trigger('click'); // 30m
    expect(trigger(w).attributes('aria-label')).toBe('Minuterie d’arrêt : 30:00 restantes');
  });

  it('keeps the English active label text identical to the old concatenation', async () => {
    const { w } = mountTimer();
    await trigger(w).trigger('click');
    await flushMenu();
    await options(w)[1].trigger('click'); // 5m
    expect(trigger(w).attributes('aria-label')).toBe('Sleep timer: 5:00 remaining');
    expect(trigger(w).text()).toContain('5:00');
  });
});

describe('SleepTimer — keyboard-operable listbox (phlix-ui-player-026)', () => {
  it('exposes the listbox with roving-tabindex options and aria wiring', async () => {
    const { w } = mountTimer();
    expect(trigger(w).attributes('aria-haspopup')).toBe('listbox');
    expect(trigger(w).attributes('aria-expanded')).toBe('false');
    await trigger(w).trigger('keydown', { key: 'ArrowDown' });
    await flushMenu();
    expect(menu(w).exists()).toBe(true);
    expect(menu(w).attributes('role')).toBe('listbox');
    expect(menu(w).attributes('id')).toBe('sleep-timer-menu');
    expect(trigger(w).attributes('aria-controls')).toBe('sleep-timer-menu');
    expect(trigger(w).attributes('aria-expanded')).toBe('true');
    const items = options(w);
    expect(items.every((el) => el.attributes('role') === 'option')).toBe(true);
    expect(items.map((el) => el.attributes('tabindex'))).toEqual([
      '0', '-1', '-1', '-1', '-1', '-1', '-1',
    ]);
    expect(document.activeElement).toBe(items[0].element);
  });

  it('ArrowDown on the trigger opens and focuses the selected option (selected wins)', async () => {
    const { w } = mountTimer();
    await trigger(w).trigger('click');
    await flushMenu();
    await options(w)[2].trigger('click'); // pick 15m, closes
    await trigger(w).trigger('keydown', { key: 'ArrowUp' });
    await flushMenu();
    expect(document.activeElement).toBe(options(w)[2].element);
    expect(options(w)[2].attributes('aria-selected')).toBe('true');
  });

  it('arrows walk the options with wrap-around and selection follows Enter', async () => {
    const { w } = mountTimer();
    await trigger(w).trigger('keydown', { key: 'ArrowDown' });
    await flushMenu();
    await menu(w).trigger('keydown', { key: 'ArrowDown' });
    expect(document.activeElement).toBe(options(w)[1].element); // 5m
    await menu(w).trigger('keydown', { key: 'ArrowUp' });
    await menu(w).trigger('keydown', { key: 'ArrowUp' });
    expect(document.activeElement).toBe(options(w)[options(w).length - 1].element); // wrapped to 90m
    await menu(w).trigger('keydown', { key: 'Home' });
    expect(document.activeElement).toBe(options(w)[0].element);
    await menu(w).trigger('keydown', { key: 'End' });
    expect(document.activeElement).toBe(options(w)[options(w).length - 1].element);
    await menu(w).trigger('keydown', { key: 'Enter' });
    await flushMenu();
    expect(menu(w).exists()).toBe(false);
    expect(document.activeElement).toBe(trigger(w).element);
    expect(trigger(w).attributes('aria-label')).toBe('Sleep timer: 90:00 remaining');
  });

  it('Space selects the focused option', async () => {
    const { w } = mountTimer();
    await trigger(w).trigger('keydown', { key: 'ArrowDown' });
    await flushMenu();
    await menu(w).trigger('keydown', { key: 'ArrowDown' }); // focus 5m
    await menu(w).trigger('keydown', { key: ' ' });
    await flushMenu();
    expect(menu(w).exists()).toBe(false);
    expect(trigger(w).attributes('aria-label')).toBe('Sleep timer: 5:00 remaining');
  });

  it('Escape closes and restores focus to the trigger, stopping propagation', async () => {
    const { w } = mountTimer();
    const escapeSeen: Event[] = [];
    const escapeSpy = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key === 'Escape') escapeSeen.push(e);
    };
    document.addEventListener('keydown', escapeSpy);
    await trigger(w).trigger('keydown', { key: 'ArrowDown' });
    await flushMenu();
    await menu(w).trigger('keydown', { key: 'Escape' });
    await flushMenu();
    expect(menu(w).exists()).toBe(false);
    expect(document.activeElement).toBe(trigger(w).element);
    // stopPropagation keeps this Escape out of the Player's global handler.
    expect(escapeSeen).toHaveLength(0);
    document.removeEventListener('keydown', escapeSpy);
  });

  it('Tab closes without stealing focus', async () => {
    const { w } = mountTimer();
    await trigger(w).trigger('keydown', { key: 'ArrowDown' });
    await flushMenu();
    await menu(w).trigger('keydown', { key: 'Tab' });
    await flushMenu();
    expect(menu(w).exists()).toBe(false);
    expect(document.activeElement).not.toBe(trigger(w).element);
  });

  it('closes on a pointerdown outside and keeps focus where it is; inside pointerdown keeps it open', async () => {
    const { w } = mountTimer();
    await trigger(w).trigger('keydown', { key: 'ArrowDown' });
    await flushMenu();
    await options(w)[1].trigger('pointerdown'); // inside the root — must stay open
    expect(menu(w).exists()).toBe(true);
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await flushMenu();
    expect(menu(w).exists()).toBe(false);
  });

  it('clicking an option selects, closes, and restores focus to the trigger', async () => {
    const { w } = mountTimer();
    await trigger(w).trigger('click');
    await flushMenu();
    await options(w)[1].trigger('click'); // 5m
    expect(menu(w).exists()).toBe(false);
    expect(document.activeElement).toBe(trigger(w).element);
  });
});

describe('SleepTimer — countdown and Player contract preserved', () => {
  it('counts down and fires onExpire at zero', async () => {
    vi.useFakeTimers();
    const { w, onExpire } = mountTimer();
    await trigger(w).trigger('click');
    await vi.advanceTimersByTimeAsync(0); // let the open watcher focus
    await options(w)[1].trigger('click'); // 5m
    expect(trigger(w).find('.sleep-timer__remaining').text()).toBe('5:00');
    await vi.advanceTimersByTimeAsync(300_001);
    expect(onExpire).toHaveBeenCalledTimes(1);
    expect(trigger(w).attributes('aria-label')).toBe('Sleep timer');
    expect(trigger(w).find('.sleep-timer__remaining').exists()).toBe(false);
  });

  it('the exposed toggleOpen() cancels an active timer (Player shortcut contract)', async () => {
    vi.useFakeTimers();
    const { w } = mountTimer();
    await trigger(w).trigger('click');
    await vi.advanceTimersByTimeAsync(0);
    await options(w)[1].trigger('click'); // 5m active
    const vm = w.vm as unknown as { toggleOpen: () => void };
    vm.toggleOpen();
    await flushMenu();
    expect(trigger(w).attributes('aria-label')).toBe('Sleep timer'); // cancelled
    expect(menu(w).exists()).toBe(false);
    vm.toggleOpen();
    await vi.advanceTimersByTimeAsync(0);
    expect(menu(w).exists()).toBe(true);
  });

  it('picking the Off option cancels an active timer', async () => {
    vi.useFakeTimers();
    const { w, onExpire } = mountTimer();
    await trigger(w).trigger('click');
    await vi.advanceTimersByTimeAsync(0);
    await options(w)[1].trigger('click'); // 5m
    // Re-open via ArrowDown (a trigger CLICK while active is the cancel arm).
    await trigger(w).trigger('keydown', { key: 'ArrowDown' });
    await vi.advanceTimersByTimeAsync(0);
    await options(w)[0].trigger('click'); // Off
    await vi.advanceTimersByTimeAsync(300_001);
    expect(onExpire).not.toHaveBeenCalled();
    expect(trigger(w).attributes('aria-label')).toBe('Sleep timer');
  });
});
