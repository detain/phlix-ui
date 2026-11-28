/**
 * ServerSelector — relative-time formatting, incl. the negative-elapsed clamp.
 *
 * A hub payload timestamp a few seconds ahead of the browser clock (clock
 * skew, or a timestamp written in the same tick) made `Math.floor(now - ts)`
 * negative and the component rendered '-4s ago' strings. The formatter must
 * floor at a non-negative age: a future timestamp reads as 'just now'.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import ServerSelector from './ServerSelector.vue';
import Select from '../ui/Select.vue';
import type { ServerListItem } from '../../api/admin/servers';

const NOW_ISO = '2026-01-01T12:00:00Z';
const NOW_SECONDS = Math.floor(Date.parse(NOW_ISO) / 1000);

/** Fix the clock so every elapsed value below is a LITERAL string, not a race. */
function freezeClock(): void {
  vi.setSystemTime(new Date(NOW_ISO));
}

function serverAt(lastSeenAt: number | null): ServerListItem {
  return {
    id: 'srv-1',
    name: 'Media Box',
    hostname: 'media-box.local',
    online: true,
    lastSeenAt,
  };
}

/** Mount with the server selected, so the status row (and options) are visible. */
function mountSelected(servers: ServerListItem[]): VueWrapper {
  return mount(ServerSelector, { props: { servers, modelValue: 'srv-1' } });
}

/** The rendered 'Last seen: …' status row text. */
function statusText(w: VueWrapper): string {
  return w.find('.server-selector__last-seen').text();
}

/** The dropdown tooltip title the selector hands to Select for the option. */
function optionTitle(w: VueWrapper): string | undefined {
  const options = w.findComponent(Select).props('options') as Array<{
    value: string;
    label: string;
    title?: string;
  }>;
  return options.find((o) => o.value === 'srv-1')?.title;
}

let wrapper: VueWrapper | null = null;

afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('ServerSelector — negative elapsed is clamped (phlix-ui-admin-036)', () => {
  it('shows "just now" — not "-4s ago" — when the hub clock is 4s ahead', () => {
    freezeClock();
    wrapper = mountSelected([serverAt(NOW_SECONDS + 4)]);

    expect(statusText(wrapper)).toBe('Last seen: just now');
  });

  it('shows "just now" for a large future skew, not "-7200s ago"', () => {
    freezeClock();
    wrapper = mountSelected([serverAt(NOW_SECONDS + 7200)]);

    // The old formatter floored every negative onto the seconds rung; pin the
    // hours-ahead case too so the clamp cannot be an off-by-one band.
    expect(statusText(wrapper)).toBe('Last seen: just now');
  });

  it.each([1, 4, 59, 60, 3600, 90071])('never renders a minus sign for %is in the future', (skew) => {
    freezeClock();
    wrapper = mountSelected([serverAt(NOW_SECONDS + skew)]);

    expect(statusText(wrapper)).toBe('Last seen: just now');
    expect(optionTitle(wrapper)).toBe('Last seen: just now');
  });

  it('clamps the dropdown tooltip title as well as the status row', () => {
    freezeClock();
    wrapper = mountSelected([serverAt(NOW_SECONDS + 4)]);

    expect(optionTitle(wrapper)).toBe('Last seen: just now');
  });
});

describe('ServerSelector — non-negative ladder is unchanged', () => {
  it('renders the exact-now boundary as "0s ago" (the clamp floor)', () => {
    freezeClock();
    wrapper = mountSelected([serverAt(NOW_SECONDS)]);

    expect(statusText(wrapper)).toBe('Last seen: 0s ago');
  });

  it.each([
    [45, 'Last seen: 45s ago'],
    [5 * 60, 'Last seen: 5m ago'],
    [59 * 60 + 59, 'Last seen: 59m ago'],
    [7 * 3600, 'Last seen: 7h ago'],
    [3 * 86400, 'Last seen: 3d ago'],
  ])('%is elapsed renders as %s', (elapsed, expected) => {
    freezeClock();
    wrapper = mountSelected([serverAt(NOW_SECONDS - elapsed)]);

    expect(statusText(wrapper)).toBe(expected);
    expect(optionTitle(wrapper)).toBe(expected);
  });

  it('still says "Never" for a null or unset timestamp', () => {
    freezeClock();
    wrapper = mountSelected([serverAt(null)]);

    expect(statusText(wrapper)).toBe('Last seen: Never');
  });
});
