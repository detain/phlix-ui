/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import UpdateAvailableBanner from './UpdateAvailableBanner.vue';
import { AdminUpdatesApi, parseCoreUpdateStatus, type CoreUpdateStatus } from '../../api/admin/updates';
import { ApiError, NetworkError } from '../../api/errors';

/**
 * The two services' REAL payloads, built through the production parser from the
 * exact `{success, data}` envelopes phlix-server's and phlix-hub's
 * `CoreUpdateStatus::toArray()` emit. Going through `parseCoreUpdateStatus`
 * rather than hand-writing a `CoreUpdateStatus` keeps the component test honest
 * about the wire shape instead of about a convenient TypeScript object.
 */
const SERVER_COMMAND = 'curl -sSL https://phlix.tv/install.sh | sudo bash -s -- --update';
/**
 * The hub's command is a strict SUPERSTRING of the server's: identical up to the
 * end, plus ` --hub`. A component that matched loosely (`startsWith`/`includes`)
 * or that fell back to a baked-in default would still look right against ONE of
 * these; it cannot look right against both.
 */
const HUB_COMMAND = `${SERVER_COMMAND} --hub`;

function serverStatus(overrides: Record<string, unknown> = {}): CoreUpdateStatus {
  return parseCoreUpdateStatus({
    success: true,
    data: {
      currentVersion: '1.2.2',
      latestVersion: '1.3.0',
      updateAvailable: true,
      checkEnabled: true,
      lastCheckedAt: 1770000000,
      lastError: null,
      updateCommand: SERVER_COMMAND,
      ...overrides,
    },
  });
}

function hubStatus(overrides: Record<string, unknown> = {}): CoreUpdateStatus {
  return parseCoreUpdateStatus({
    success: true,
    data: {
      currentVersion: '0.5.0',
      latestVersion: '0.6.0',
      updateAvailable: true,
      checkEnabled: true,
      lastCheckedAt: 1770000000,
      lastError: null,
      updateCommand: HUB_COMMAND,
      ...overrides,
    },
  });
}

let wrapper: VueWrapper | null = null;
let writeText: ReturnType<typeof vi.fn>;

/** Mount the banner with the status endpoint resolving to `status`. */
async function mountWithStatus(status: CoreUpdateStatus): Promise<VueWrapper> {
  vi.spyOn(AdminUpdatesApi.prototype, 'getStatus').mockResolvedValue(status);
  return mountBanner();
}

/** Mount the banner with the status endpoint REJECTING with `error`. */
async function mountWithError(error: unknown): Promise<VueWrapper> {
  vi.spyOn(AdminUpdatesApi.prototype, 'getStatus').mockRejectedValue(error);
  return mountBanner();
}

async function mountBanner(): Promise<VueWrapper> {
  const w = mount(UpdateAvailableBanner, { global: { provide: { apiBase: '' } } });
  await flushPromises();
  wrapper = w;
  return w;
}

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('UpdateAvailableBanner — hidden when there is nothing to say', () => {
  it('renders NOTHING when the service reports no update and a clean check', async () => {
    const w = await mountWithStatus(serverStatus({ updateAvailable: false, latestVersion: '1.2.2' }));

    expect(w.find('.update-banner').exists()).toBe(false);
    // Not merely hidden — the whole subtree is absent.
    expect(w.html()).toBe('<!--v-if-->');
  });

  it('renders nothing for the hub payload either when it reports no update', async () => {
    const w = await mountWithStatus(hubStatus({ updateAvailable: false, latestVersion: '0.5.0' }));

    expect(w.find('.update-banner').exists()).toBe(false);
  });

  it('renders nothing while the very first request is still in flight', async () => {
    vi.spyOn(AdminUpdatesApi.prototype, 'getStatus').mockReturnValue(new Promise(() => {}));
    const w = mount(UpdateAvailableBanner, { global: { provide: { apiBase: '' } } });
    wrapper = w;

    expect(w.find('.update-banner').exists()).toBe(false);
  });
});

describe('UpdateAvailableBanner — appears when EITHER service reports an update', () => {
  it('appears for the phlix-server payload alone', async () => {
    const w = await mountWithStatus(serverStatus());

    const banner = w.find('.update-banner');
    expect(banner.exists()).toBe(true);
    expect(banner.attributes('data-variant')).toBe('update');
    expect(w.find('.update-banner__title').text()).toBe('Update available');
    expect(w.find('.update-banner__versions').text()).toBe('Running 1.2.2 — 1.3.0 is available.');
  });

  it('appears for the phlix-hub payload alone', async () => {
    const w = await mountWithStatus(hubStatus());

    const banner = w.find('.update-banner');
    expect(banner.exists()).toBe(true);
    expect(banner.attributes('data-variant')).toBe('update');
    expect(w.find('.update-banner__versions').text()).toBe('Running 0.5.0 — 0.6.0 is available.');
  });

  it('is announced as a status region with an accessible name', async () => {
    const w = await mountWithStatus(serverStatus());

    const banner = w.find('.update-banner');
    expect(banner.attributes('role')).toBe('status');
    expect(banner.attributes('aria-labelledby')).toBe('update-banner-title');
    expect(w.find('#update-banner-title').exists()).toBe(true);
  });

  it('still shows the update when the operator disabled future checks', async () => {
    // checkEnabled=false is an opt-out of NAGGING about a broken check; it must
    // not hide an update the service already found.
    const w = await mountWithStatus(serverStatus({ checkEnabled: false }));

    expect(w.find('.update-banner').attributes('data-variant')).toBe('update');
  });

  it('shows the update variant even when the last check also recorded an error', async () => {
    const w = await mountWithStatus(serverStatus({ lastError: 'transient DNS failure' }));

    expect(w.find('.update-banner').attributes('data-variant')).toBe('update');
    // …and the error is still surfaced, not dropped on the floor.
    expect(w.find('.update-banner__error').text()).toBe('transient DNS failure');
  });
});

describe('UpdateAvailableBanner — the copy-to-clipboard command comes from the endpoint', () => {
  it('renders the command phlix-server supplied, verbatim', async () => {
    const w = await mountWithStatus(serverStatus());

    expect(w.find('.update-banner__command').text()).toBe(SERVER_COMMAND);
  });

  it('renders the command phlix-hub supplied, verbatim — a SUPERSTRING of the server one', async () => {
    const w = await mountWithStatus(hubStatus());

    const rendered = w.find('.update-banner__command').text();
    expect(rendered).toBe(HUB_COMMAND);
    // Identity, not containment: the server command is a proper prefix of this
    // one, so a `toContain(SERVER_COMMAND)` assertion would pass for BOTH and
    // prove nothing. Pin that they are different strings.
    expect(rendered).not.toBe(SERVER_COMMAND);
  });

  it('copies EXACTLY the string the endpoint supplied', async () => {
    const w = await mountWithStatus(hubStatus());

    await w.find('.update-banner__copy').trigger('click');
    await flushPromises();

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(HUB_COMMAND);
    expect(writeText).not.toHaveBeenCalledWith(SERVER_COMMAND);
    expect(w.find('.update-banner__announcement').text()).toBe('Update command copied to clipboard.');
  });

  it('copies an arbitrary command the endpoint invents, proving nothing is baked in', async () => {
    const invented = 'systemctl stop phlix && /opt/phlix/bin/self-update --channel=beta';
    const w = await mountWithStatus(serverStatus({ updateCommand: invented }));

    expect(w.find('.update-banner__command').text()).toBe(invented);
    await w.find('.update-banner__copy').trigger('click');
    await flushPromises();
    expect(writeText).toHaveBeenCalledWith(invented);
  });

  it('offers no copy button when the endpoint supplied an empty command', async () => {
    const w = await mountWithStatus(serverStatus({ updateCommand: '' }));

    expect(w.find('.update-banner').exists()).toBe(true);
    expect(w.find('.update-banner__copy').exists()).toBe(false);
    expect(w.find('.update-banner__command').exists()).toBe(false);
  });

  it('never renders a command block in the warning state', async () => {
    const w = await mountWithStatus(
      serverStatus({ updateAvailable: false, lastError: 'connection refused' }),
    );

    expect(w.find('.update-banner').attributes('data-variant')).toBe('warning');
    expect(w.find('.update-banner__command').exists()).toBe(false);
    expect(w.find('.update-banner__copy').exists()).toBe(false);
  });

  it('reports a clipboard failure instead of claiming success', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    const w = await mountWithStatus(serverStatus());

    await w.find('.update-banner__copy').trigger('click');
    await flushPromises();

    expect(w.find('.update-banner__announcement').text()).toBe(
      'Could not copy the update command. Copy it manually instead.',
    );
  });

  it('contains no hard-coded update command anywhere in its source', () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), 'UpdateAvailableBanner.vue'),
      'utf8',
    );
    // The <script>+<template> must not carry an executable command literal. The
    // docblock deliberately NAMES these words while explaining the rule, so the
    // check is for a command-shaped literal, not for the bare word.
    for (const forbidden of ['curl -', 'sudo bash', 'composer install', 'git pull', 'systemctl ']) {
      expect(source).not.toContain(forbidden);
    }
  });
});

describe('UpdateAvailableBanner — a broken check is NOT the same as "up to date"', () => {
  it('warns when the service reports its own check failed', async () => {
    const w = await mountWithStatus(
      serverStatus({ updateAvailable: false, lastError: 'Could not reach the version marker' }),
    );

    const banner = w.find('.update-banner');
    expect(banner.exists()).toBe(true);
    expect(banner.attributes('data-variant')).toBe('warning');
    expect(w.find('.update-banner__title').text()).toBe('Update check is not working');
    expect(w.find('.update-banner__error').text()).toBe('Could not reach the version marker');
  });

  it('stays silent about a failed check the operator explicitly turned off', async () => {
    const w = await mountWithStatus(
      serverStatus({ updateAvailable: false, checkEnabled: false, lastError: 'timeout' }),
    );

    expect(w.find('.update-banner').exists()).toBe(false);
  });

  it('warns on a 500 from the status endpoint', async () => {
    const w = await mountWithError(new ApiError('Internal Server Error', 500));

    expect(w.find('.update-banner').attributes('data-variant')).toBe('warning');
    expect(w.find('.update-banner__error').text()).toBe('Internal Server Error');
  });

  it('warns when the status request never reached the service', async () => {
    const w = await mountWithError(new NetworkError());

    expect(w.find('.update-banner').attributes('data-variant')).toBe('warning');
  });

  it.each([
    ['404 — the back end predates S74/S75', 404],
    ['401 — a logout race', 401],
    ['403 — not an admin', 403],
  ])('stays silent on %s', async (_label, status) => {
    const w = await mountWithError(new ApiError('nope', status));

    expect(w.find('.update-banner').exists()).toBe(false);
  });

  it('renders the last successful check as a relative age', async () => {
    // Fixed clock, and the assertion is the LITERAL string a human would read —
    // not a value recomputed from the same arithmetic the component uses.
    vi.setSystemTime(new Date('2026-01-01T12:00:00Z'));
    const nowSeconds = Math.floor(Date.parse('2026-01-01T12:00:00Z') / 1000);
    const w = await mountWithStatus(
      serverStatus({
        updateAvailable: false,
        lastError: 'boom',
        lastCheckedAt: nowSeconds - 7200,
      }),
    );

    expect(w.find('.update-banner__versions').text()).toBe(
      'Running 1.2.2. Last successful check: 2h ago.',
    );
  });

  it('says "never" when the service has never completed a check', async () => {
    const w = await mountWithStatus(
      serverStatus({ updateAvailable: false, lastError: 'boom', lastCheckedAt: null }),
    );

    expect(w.find('.update-banner__versions').text()).toBe(
      'Running 1.2.2. Last successful check: never.',
    );
  });

  it('treats lastCheckedAt as SECONDS, not milliseconds', async () => {
    vi.setSystemTime(new Date('2026-01-01T12:00:00Z'));
    const nowSeconds = Math.floor(Date.parse('2026-01-01T12:00:00Z') / 1000);
    const w = await mountWithStatus(
      serverStatus({ updateAvailable: false, lastError: 'boom', lastCheckedAt: nowSeconds - 300 }),
    );

    // Reading the value as milliseconds would put the check ~56 years in the
    // past ("20…d ago"); reading it as seconds gives exactly this.
    expect(w.find('.update-banner__versions').text()).toContain('5m ago');
  });
});

describe('UpdateAvailableBanner — request wiring', () => {
  it('queries the endpoint exactly once on mount, and does not poll', async () => {
    vi.useFakeTimers();
    const spy = vi
      .spyOn(AdminUpdatesApi.prototype, 'getStatus')
      .mockResolvedValue(serverStatus({ updateAvailable: false }));

    const w = mount(UpdateAvailableBanner, { global: { provide: { apiBase: '' } } });
    wrapper = w;
    await vi.advanceTimersByTimeAsync(10 * 60 * 1000);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
