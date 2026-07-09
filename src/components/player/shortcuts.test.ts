/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, vi } from 'vitest';
import { handleShortcut, isTypingTarget, type ShortcutActions } from './shortcuts';

function actions(): Record<keyof ShortcutActions, ReturnType<typeof vi.fn>> & ShortcutActions {
  return {
    playPause: vi.fn(),
    seekBy: vi.fn(),
    frameStep: vi.fn(),
    volumeBy: vi.fn(),
    toggleMute: vi.fn(),
    toggleFullscreen: vi.fn(),
    toggleCaptions: vi.fn(),
    toggleTheater: vi.fn(),
    togglePip: vi.fn(),
    skipIntro: vi.fn(),
    skipOutro: vi.fn(),
    sleepTimer: vi.fn(),
    seekToPercent: vi.fn(),
    speedStep: vi.fn(),
    toggleHelp: vi.fn(),
  } as never;
}

function press(key: string) {
  const a = actions();
  const handled = handleShortcut({ key } as KeyboardEvent, a);
  return { a, handled };
}

describe('handleShortcut — keymap', () => {
  it('toggles play on Space and k/K', () => {
    for (const key of [' ', 'k', 'K']) {
      const { a, handled } = press(key);
      expect(handled).toBe(true);
      expect(a.playPause).toHaveBeenCalled();
    }
  });

  it('seeks ±5s with arrows and ±10s with j/l', () => {
    expect(press('ArrowLeft').a.seekBy).toHaveBeenCalledWith(-5);
    expect(press('ArrowRight').a.seekBy).toHaveBeenCalledWith(5);
    expect(press('j').a.seekBy).toHaveBeenCalledWith(-10);
    expect(press('L').a.seekBy).toHaveBeenCalledWith(10);
  });

  it('frame-steps with , and .', () => {
    expect(press(',').a.frameStep).toHaveBeenCalledWith(-1);
    expect(press('.').a.frameStep).toHaveBeenCalledWith(1);
  });

  it('nudges volume with up/down arrows', () => {
    expect(press('ArrowUp').a.volumeBy).toHaveBeenCalledWith(0.05);
    expect(press('ArrowDown').a.volumeBy).toHaveBeenCalledWith(-0.05);
  });

  it('maps mute/fullscreen/captions/theater/pip/help', () => {
    expect(press('m').a.toggleMute).toHaveBeenCalled();
    expect(press('f').a.toggleFullscreen).toHaveBeenCalled();
    expect(press('c').a.toggleCaptions).toHaveBeenCalled();
    expect(press('t').a.toggleTheater).toHaveBeenCalled();
    expect(press('p').a.togglePip).toHaveBeenCalled();
    expect(press('?').a.toggleHelp).toHaveBeenCalled();
  });

  it('maps skipIntro/skipOutro/sleepTimer to i/o/n', () => {
    expect(press('i').a.skipIntro).toHaveBeenCalled();
    expect(press('I').a.skipIntro).toHaveBeenCalled();
    expect(press('o').a.skipOutro).toHaveBeenCalled();
    expect(press('O').a.skipOutro).toHaveBeenCalled();
    expect(press('n').a.sleepTimer).toHaveBeenCalled();
    expect(press('N').a.sleepTimer).toHaveBeenCalled();
  });

  it('steps speed with < and >', () => {
    expect(press('<').a.speedStep).toHaveBeenCalledWith(-1);
    expect(press('>').a.speedStep).toHaveBeenCalledWith(1);
  });

  it('seeks to a percentage with digit keys', () => {
    expect(press('0').a.seekToPercent).toHaveBeenCalledWith(0);
    expect(press('5').a.seekToPercent).toHaveBeenCalledWith(0.5);
    expect(press('9').a.seekToPercent).toHaveBeenCalledWith(0.9);
  });

  it('returns false (unhandled) for unmapped keys', () => {
    const { a, handled } = press('q');
    expect(handled).toBe(false);
    expect(a.playPause).not.toHaveBeenCalled();
  });

  it('does not toggle play on Space when a button/link is focused (avoids double-action)', () => {
    const a = actions();
    const onButton = handleShortcut({ key: ' ', target: document.createElement('button') } as never, a);
    expect(onButton).toBe(false);
    expect(a.playPause).not.toHaveBeenCalled();
    // k still toggles even on a focused button (k does not activate buttons)
    const k = handleShortcut({ key: 'k', target: document.createElement('button') } as never, a);
    expect(k).toBe(true);
    expect(a.playPause).toHaveBeenCalledTimes(1);
  });
});

describe('isTypingTarget', () => {
  it('is true for text-entry controls', () => {
    for (const tag of ['input', 'textarea', 'select']) {
      expect(isTypingTarget(document.createElement(tag))).toBe(true);
    }
    const ce = document.createElement('div');
    Object.defineProperty(ce, 'isContentEditable', { value: true });
    expect(isTypingTarget(ce)).toBe(true);
    const tb = document.createElement('div');
    tb.setAttribute('role', 'textbox');
    expect(isTypingTarget(tb)).toBe(true);
  });

  it('is false for non-text elements and null', () => {
    expect(isTypingTarget(document.createElement('button'))).toBe(false);
    expect(isTypingTarget(document.createElement('div'))).toBe(false);
    expect(isTypingTarget(null)).toBe(false);
  });
});
