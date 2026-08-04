/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S160 — `src/pages/ParentalControlsPage.vue`, routed at `/app/parental-controls`
 * by `createPhlixApp.ts`. 260 lines of ACCESS-CONTROL surface that shipped with no
 * automated test of any kind; it measured 0/260 lines the moment S139 replaced the
 * coverage allow-list with a whole-tree glob.
 *
 * ── What this suite is actually guarding ──────────────────────────────────────
 *
 * A parental-controls editor that silently fails OPEN is a different severity from
 * an untested list view, so the emphasis here is the DECISIONS, not the render:
 *
 *   1. The profile gate. Nothing is loaded, shown or mutated without a valid
 *      numeric `?profile=<id>`. `?profile=abc`, `?profile=0` and a repeated
 *      `?profile=` (which arrives as an ARRAY) must all fail closed.
 *   2. Every mutation is scoped to that id. A restriction must never be written
 *      against a different profile than the one on screen.
 *   3. Validation refuses to persist a meaningless restriction — an unnamed
 *      schedule, a malformed time, a schedule covering ZERO days, a stream cap
 *      below 1. Each of those must block the request, not merely warn.
 *   4. Destruction is two-step. Clicking Delete/Remove in a list opens a
 *      confirmation and must NOT reach the network on its own.
 *
 * ── On the VTU `disabled`-guard trap ──────────────────────────────────────────
 *
 * The program-wide hazard is that `wrapper.trigger('click')` dispatches regardless
 * of a `disabled` attribute, so a test written that way passes whether the guard
 * exists or not. That trap has NO subject here, and this was checked rather than
 * assumed: `ParentalControlsPage.vue` contains no `disabled`, no `aria-disabled`
 * and no `pointer-events` rule anywhere — there is no inertness guard to reach.
 * Every gate on this page is a JavaScript early-return, so each one is proven the
 * only way that bites: by asserting the API mock was NOT called, and by mutating
 * the production guard to confirm the assertion goes red.
 *
 * Form submission is driven with a raw `dispatchEvent` on the real `<form>` rather
 * than a `trigger('click')` on the submit button, so the assertions do not depend
 * on VTU's synthetic-click semantics.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { computed } from 'vue';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import ParentalControlsPage from './ParentalControlsPage.vue';
import Button from '../components/ui/Button.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import { useToastStore } from '../stores/useToastStore';
import type { ApiClient } from '../api/client';
import type { AccessSchedule, Profile, ProfileTag, ProfileStreamLimit } from '../api/admin/users';

const PROFILE = 7;
const PROFILE_URL = `/api/v1/admin/profiles/${PROFILE}`;
const SCHEDULES_URL = `/api/v1/admin/profiles/${PROFILE}/schedules`;
const TAGS_URL = `/api/v1/admin/profiles/${PROFILE}/tags`;
const LIMITS_URL = `/api/v1/admin/profiles/${PROFILE}/stream-limits`;

const schedule1: AccessSchedule = {
  id: 11,
  profile_id: PROFILE,
  name: 'Weekday Evenings',
  start_time: '18:00:00',
  end_time: '20:30:00',
  days_of_week: ['mon', 'tue', 'wed', 'thu', 'fri'],
  is_active: true,
};
const schedule2: AccessSchedule = {
  id: 12,
  profile_id: PROFILE,
  name: 'Weekend',
  start_time: '09:00:00',
  end_time: '21:00:00',
  days_of_week: ['sat', 'sun'],
  is_active: false,
};

const tagBlocked: ProfileTag = { id: 21, profile_id: PROFILE, tag: 'horror', tag_type: 'blocked' };
const tagAllowed: ProfileTag = { id: 22, profile_id: PROFILE, tag: 'kids', tag_type: 'allowed' };

const limits: ProfileStreamLimit = { max_concurrent_streams: 2, max_total_bandwidth_kbps: 8000 };

const profileRow: Profile = {
  id: PROFILE,
  user_id: 3,
  name: 'Robin',
  pin_hash: null,
  rating: 5,
  created_at: '2026-01-02 03:04:05',
};

interface Seed {
  schedules?: AccessSchedule[];
  tags?: ProfileTag[];
  limits?: ProfileStreamLimit;
  /** The `{ profile }` payload; pass `null` to make the profile GET reject. */
  profile?: Profile | null;
}

function makeClient(seed: Seed = {}) {
  const get = vi.fn(async (url: string): Promise<unknown> => {
    if (url === PROFILE_URL) {
      if (seed.profile === null) throw new Error('profile boom');
      return { profile: seed.profile ?? profileRow };
    }
    if (url === SCHEDULES_URL) return { schedules: seed.schedules ?? [schedule1, schedule2] };
    if (url === TAGS_URL) return { tags: seed.tags ?? [tagBlocked, tagAllowed] };
    if (url === LIMITS_URL) return seed.limits ?? limits;
    throw new Error(`unexpected GET ${url}`);
  });
  const post = vi.fn(async () => ({ id: 99, message: 'ok' }));
  const put = vi.fn(async () => ({ message: 'ok' }));
  const del = vi.fn(async () => ({ message: 'ok' }));
  const client = { get, post, put, patch: vi.fn(), delete: del } as unknown as ApiClient;
  return { client, get, post, put, del };
}

/**
 * A `get` mock that always satisfies the S203 profile fetch and delegates every
 * other URL to `rest`.
 *
 * Routing by URL rather than by call ORDER matters here: the page issues the
 * profile fetch and the section fetch from the same `onMounted`, so an
 * order-based `mockRejectedValueOnce` would attach the rejection to whichever
 * request happened to go first and silently stop testing what it names.
 */
function getWithProfile(rest: (url: string) => Promise<unknown>) {
  return vi.fn(async (url: string): Promise<unknown> => {
    if (url === PROFILE_URL) return { profile: profileRow };
    return rest(url);
  });
}

function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/parental-controls', name: 'parental', component: { template: '<div/>' } },
    ],
  });
}

/**
 * Errors Vue routed out of a component handler during the current test.
 *
 * Installed as `app.config.errorHandler` on every mount for two reasons. First it
 * is an assertion surface: a handler that throws before its `try` block writes
 * NOTHING and shows NO message, so "the API mock was not called" alone cannot tell
 * a working guard apart from a crash — see the stream-limits defect below, which
 * looks exactly like a successful validation refusal from the outside. Second,
 * without a handler Vue's dev-mode `logError` re-throws inside a `.catch`, which
 * surfaces as an unhandled rejection and fails the file.
 */
let componentErrors: unknown[] = [];

async function mountPage(
  client: ApiClient,
  query = `?profile=${PROFILE}`,
): Promise<VueWrapper> {
  setActivePinia(createPinia());
  const router = makeRouter();
  await router.push(`/app/parental-controls${query}`);
  await router.isReady();
  const w = mount(ParentalControlsPage, {
    props: { client },
    attachTo: document.body,
    global: {
      plugins: [router],
      provide: { apiBase: 'https://media.test' },
      config: { errorHandler: (err: unknown) => { componentErrors.push(err); } },
    },
  });
  await flushPromises();
  return w;
}

/** The currently-open modal panel, teleported to <body> by Modal.vue. */
function modalPanel(): HTMLElement {
  const panels = document.querySelectorAll<HTMLElement>('.phlix-modal__panel');
  return panels[panels.length - 1]!;
}

function anyModalOpen(): boolean {
  return document.querySelectorAll('.phlix-modal__panel').length > 0;
}

function findBtn(w: VueWrapper, text: string) {
  return w.findAllComponents(Button).find((b) => b.text().trim() === text);
}

function findBtnIn(w: VueWrapper, root: Element, text: string) {
  return w
    .findAllComponents(Button)
    .find((b) => b.text().trim() === text && root.contains(b.element));
}

/** Set a `.phlix-input__field` by index within the open modal. */
async function setInput(idx: number, value: string): Promise<void> {
  const el = modalPanel().querySelectorAll<HTMLInputElement>('.phlix-input__field')[idx]!;
  el.value = value;
  el.dispatchEvent(new Event('input'));
  await flushPromises();
}

/**
 * Submit the open modal's form with a REAL submit event on the real `<form>`,
 * rather than a synthetic click on the submit button. `@submit.prevent` is bound
 * to the form element, so this exercises the same listener the browser would.
 */
async function submitForm(): Promise<void> {
  const form = modalPanel().querySelector('form')!;
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  await flushPromises();
}

/** Click a tab in the Tabs strip by its visible label. */
async function clickTab(w: VueWrapper, label: string): Promise<void> {
  const tab = w.findAll('[role="tab"]').find((t) => t.text().trim() === label)!;
  await tab.trigger('click');
  await flushPromises();
}

/** The error paragraph inside the open modal, or '' when none is rendered. */
function formError(): string {
  return modalPanel().querySelector('.parental-form__error')?.textContent?.trim() ?? '';
}

beforeEach(() => {
  localStorage.clear();
  componentErrors = [];
});
afterEach(() => {
  vi.restoreAllMocks();
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 1. The profile gate — fail CLOSED                                          */
/* ══════════════════════════════════════════════════════════════════════════ */

describe('ParentalControlsPage — the profile gate (fail closed)', () => {
  it('renders the page shell and heading', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    expect(w.find('.parental-page__title').text()).toBe('Parental Controls');
    expect(w.find('.parental-page__eyebrow').text()).toBe('Profile Controls');
  });

  it('with NO ?profile= shows the empty state, renders no tabs and calls NOTHING', async () => {
    const { client, get, post, put, del } = makeClient();
    const w = await mountPage(client, '');

    expect(w.find('.parental-page__no-profile').exists()).toBe(true);
    expect(w.findComponent(EmptyState).text()).toContain('No profile selected');
    // The whole control surface is absent, not merely hidden.
    expect(w.findAll('[role="tab"]').length).toBe(0);
    expect(findBtn(w, 'Create Schedule')).toBeUndefined();
    expect(findBtn(w, 'Add Tag')).toBeUndefined();
    expect(findBtn(w, 'Update Limits')).toBeUndefined();
    // And no request of ANY verb was issued.
    expect(get).not.toHaveBeenCalled();
    expect(post).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(del).not.toHaveBeenCalled();
  });

  it.each([
    ['a non-numeric id', '?profile=abc'],
    ['a partly-numeric id', '?profile=7abc'],
    ['a repeated param, which arrives as an array', '?profile=7&profile=9'],
  ])('fails closed for %s', async (_label, query) => {
    const { client, get, post, put, del } = makeClient();
    const w = await mountPage(client, query);
    expect(w.findComponent(EmptyState).text()).toContain('No profile selected');
    expect(w.findAll('[role="tab"]').length).toBe(0);
    expect(get).not.toHaveBeenCalled();
    expect(post).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(del).not.toHaveBeenCalled();
  });

  it('fails closed for ?profile=0 — a falsy id is never a real profile', async () => {
    const { client, get } = makeClient();
    const w = await mountPage(client, '?profile=0');
    expect(w.findComponent(EmptyState).text()).toContain('No profile selected');
    expect(w.findAll('[role="tab"]').length).toBe(0);
    expect(get).not.toHaveBeenCalled();
  });

  it('opens the control surface for a valid numeric id and loads THAT profile', async () => {
    const { client, get } = makeClient();
    const w = await mountPage(client);
    expect(w.find('.parental-page__no-profile').exists()).toBe(false);
    expect(w.findAll('[role="tab"]').map((t) => t.text().trim())).toEqual([
      'Schedules',
      'Tags',
      'Stream Limits',
    ]);
    // Scoped to profile 7 — and to nothing else.
    expect(get).toHaveBeenCalledWith(SCHEDULES_URL);
    // Every call is either the profile itself or a sub-resource OF that profile —
    // `/profiles/77/...` must not satisfy this.
    expect(
      get.mock.calls.every(
        (c) => String(c[0]) === PROFILE_URL || String(c[0]).startsWith(`${PROFILE_URL}/`),
      ),
    ).toBe(true);
  });
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 2. Schedules — listing, loading, errors                                    */
/* ══════════════════════════════════════════════════════════════════════════ */

describe('ParentalControlsPage — schedules list', () => {
  it('renders one row per schedule with times trimmed to HH:MM and day labels', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    const rows = w.findAll('.parental-section__item');
    expect(rows.length).toBe(2);
    expect(rows[0]!.find('.parental-section__item-name').text()).toBe('Weekday Evenings');
    const meta = rows[0]!.find('.parental-section__item-meta').text().replace(/\s+/g, ' ');
    expect(meta).toContain('18:00');
    expect(meta).toContain('20:30');
    expect(meta).toContain('Mon, Tue, Wed, Thu, Fri');
    expect(rows[1]!.find('.parental-section__item-meta').text()).toContain('Sat, Sun');
  });

  it('badges an active schedule Active and an inactive one Inactive', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    const rows = w.findAll('.parental-section__item');
    expect(rows[0]!.text()).toContain('Active');
    expect(rows[1]!.text()).toContain('Inactive');
  });

  it('passes through an unknown day code rather than dropping it', async () => {
    // `formatDays` falls back to the raw code. A schedule whose day list the UI
    // cannot label must still show the day — silently omitting it would misreport
    // when the restriction applies.
    const odd = { ...schedule1, days_of_week: ['mon', 'funday'] };
    const { client } = makeClient({ schedules: [odd] });
    const w = await mountPage(client);
    expect(w.find('.parental-section__item-meta').text()).toContain('Mon, funday');
  });

  it('marks the clicked row as selected', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    const rows = w.findAll('.parental-section__item');
    expect(rows[0]!.classes()).toContain('is-selected');
    await rows[1]!.trigger('click');
    expect(w.findAll('.parental-section__item')[1]!.classes()).toContain('is-selected');
    expect(w.findAll('.parental-section__item')[0]!.classes()).not.toContain('is-selected');
  });

  it('shows a skeleton while schedules are loading', async () => {
    let resolve: (v: unknown) => void = () => {};
    const get = getWithProfile((url: string) =>
      url === SCHEDULES_URL ? new Promise((r) => { resolve = r; }) : Promise.resolve({}),
    );
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    setActivePinia(createPinia());
    const router = makeRouter();
    await router.push(`/app/parental-controls?profile=${PROFILE}`);
    await router.isReady();
    const w = mount(ParentalControlsPage, {
      props: { client },
      attachTo: document.body,
      global: { plugins: [router], provide: { apiBase: '' } },
    });
    await flushPromises();
    expect(w.find('.parental-section__loading').exists()).toBe(true);
    resolve({ schedules: [schedule1] });
    await flushPromises();
    expect(w.find('.parental-section__loading').exists()).toBe(false);
    expect(w.findAll('.parental-section__item').length).toBe(1);
  });

  it('shows an empty state when the profile has no schedules', async () => {
    const { client } = makeClient({ schedules: [] });
    const w = await mountPage(client);
    expect(w.text()).toContain('No access schedules');
  });

  it('shows an error state carrying the server message, and retries', async () => {
    let firstSchedulesCall = true;
    const get = getWithProfile(async () => {
      if (firstSchedulesCall) {
        firstSchedulesCall = false;
        throw new Error('schedules boom');
      }
      return { schedules: [schedule1] };
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = await mountPage(client);
    expect(w.text()).toContain("Couldn't load schedules");
    expect(w.text()).toContain('schedules boom');
    // An error must not read as "no restrictions configured".
    expect(w.text()).not.toContain('No access schedules');

    await findBtn(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.text()).not.toContain("Couldn't load schedules");
    expect(w.findAll('.parental-section__item').length).toBe(1);
  });

  it('falls back to a generic message when the failure carries none', async () => {
    const get = getWithProfile(async () => { throw {}; });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = await mountPage(client);
    expect(w.text()).toContain('Failed to load schedules.');
  });
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 3. Schedule validation — refuse to persist a meaningless restriction       */
/* ══════════════════════════════════════════════════════════════════════════ */

describe('ParentalControlsPage — schedule validation blocks the write', () => {
  async function openCreate(w: VueWrapper): Promise<void> {
    await findBtn(w, 'Create Schedule')!.trigger('click');
    await flushPromises();
  }

  it('seeds the create form with sane defaults', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    await openCreate(w);
    const inputs = modalPanel().querySelectorAll<HTMLInputElement>('.phlix-input__field');
    expect(inputs[0]!.value).toBe('');
    expect(inputs[1]!.value).toBe('08:00');
    expect(inputs[2]!.value).toBe('22:00');
    expect(modalPanel().textContent).toContain('Create Schedule');
  });

  it('refuses an unnamed schedule', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await openCreate(w);
    await submitForm();
    expect(formError()).toBe('Name is required.');
    expect(post).not.toHaveBeenCalled();
    expect(anyModalOpen()).toBe(true);
  });

  it('refuses a whitespace-only name', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await openCreate(w);
    await setInput(0, '     ');
    await submitForm();
    expect(formError()).toBe('Name is required.');
    expect(post).not.toHaveBeenCalled();
  });

  it('refuses a name longer than 100 characters', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await openCreate(w);
    await setInput(0, 'x'.repeat(101));
    await submitForm();
    expect(formError()).toBe('Name must be 100 characters or less.');
    expect(post).not.toHaveBeenCalled();
  });

  it('accepts a name of exactly 100 characters (boundary)', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await openCreate(w);
    await setInput(0, 'x'.repeat(100));
    await submitForm();
    expect(post).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['an empty start time', 1, ''],
    ['a wordy start time', 1, 'morning'],
    ['a start time with no minutes', 1, '8'],
  ])('refuses %s', async (_label, idx, value) => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await openCreate(w);
    await setInput(0, 'Nightly');
    await setInput(idx, value);
    await submitForm();
    expect(formError()).toBe('Invalid start time. Use HH:MM or HH:MM:SS.');
    expect(post).not.toHaveBeenCalled();
  });

  it('refuses a malformed end time', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await openCreate(w);
    await setInput(0, 'Nightly');
    await setInput(2, 'later');
    await submitForm();
    expect(formError()).toBe('Invalid end time. Use HH:MM or HH:MM:SS.');
    expect(post).not.toHaveBeenCalled();
  });

  it('accepts an HH:MM:SS time as well as HH:MM', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await openCreate(w);
    await setInput(0, 'Nightly');
    await setInput(1, '08:00:30');
    await submitForm();
    expect(post).toHaveBeenCalledTimes(1);
  });

  /**
   * The sharpest fail-open case on this page: a schedule that covers ZERO days
   * restricts nothing at all, so persisting one would leave an admin looking at a
   * named rule in the list that never applies.
   */
  it('refuses a schedule covering zero days', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await openCreate(w);
    await setInput(0, 'Nightly');
    // Deselect all five default weekdays via the real day toggles.
    const dayButtons = modalPanel().querySelectorAll<HTMLButtonElement>(
      '.parental-form__day-buttons button',
    );
    expect(dayButtons.length).toBe(7);
    for (const b of dayButtons) {
      if (b.className.includes('phlix-btn--solid')) b.click();
    }
    await flushPromises();
    const stillOn = [...modalPanel().querySelectorAll<HTMLButtonElement>(
      '.parental-form__day-buttons button',
    )].filter((b) => b.className.includes('phlix-btn--solid'));
    expect(stillOn.length).toBe(0);

    await submitForm();
    expect(formError()).toBe('At least one day is required.');
    expect(post).not.toHaveBeenCalled();
  });

  it('toggles a day back on and then persists it', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await openCreate(w);
    await setInput(0, 'Weekends too');
    const dayButtons = modalPanel().querySelectorAll<HTMLButtonElement>(
      '.parental-form__day-buttons button',
    );
    dayButtons[5]!.click(); // 'sat'
    await flushPromises();
    await submitForm();
    expect(post).toHaveBeenCalledWith(
      SCHEDULES_URL,
      expect.objectContaining({ days_of_week: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'] }),
    );
  });
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 4. Schedule create / edit — the exact payload, scoped to the profile       */
/* ══════════════════════════════════════════════════════════════════════════ */

describe('ParentalControlsPage — creating and editing a schedule', () => {
  it('POSTs the trimmed name and second-padded times to THIS profile, then refetches', async () => {
    const { client, post, get } = makeClient();
    const w = await mountPage(client);
    const before = get.mock.calls.filter((c) => c[0] === SCHEDULES_URL).length;

    await findBtn(w, 'Create Schedule')!.trigger('click');
    await flushPromises();
    await setInput(0, '  Bedtime  ');
    await setInput(1, '19:30');
    await setInput(2, '21:00');
    await submitForm();

    expect(post).toHaveBeenCalledWith(SCHEDULES_URL, {
      name: 'Bedtime',
      start_time: '19:30:00',
      end_time: '21:00:00',
      days_of_week: ['mon', 'tue', 'wed', 'thu', 'fri'],
      is_active: true,
    });
    expect(useToastStore().toasts.some((t) => t.message === 'Schedule created.')).toBe(true);
    expect(anyModalOpen()).toBe(false);
    expect(get.mock.calls.filter((c) => c[0] === SCHEDULES_URL).length).toBeGreaterThan(before);
  });

  it('honours the Active switch being turned off', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await findBtn(w, 'Create Schedule')!.trigger('click');
    await flushPromises();
    await setInput(0, 'Paused rule');
    const sw = modalPanel().querySelector<HTMLButtonElement>('.phlix-switch__control')!;
    expect(sw.getAttribute('aria-checked')).toBe('true');
    sw.click();
    await flushPromises();
    await submitForm();
    expect(post).toHaveBeenCalledWith(SCHEDULES_URL, expect.objectContaining({ is_active: false }));
  });

  it('keeps the modal open and shows the server message when the create fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('create boom'));
    const w = await mountPage(client);
    await findBtn(w, 'Create Schedule')!.trigger('click');
    await flushPromises();
    await setInput(0, 'Bedtime');
    await submitForm();
    expect(formError()).toBe('create boom');
    expect(anyModalOpen()).toBe(true);
  });

  it('uses a generic message when the create failure carries none', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce({});
    const w = await mountPage(client);
    await findBtn(w, 'Create Schedule')!.trigger('click');
    await flushPromises();
    await setInput(0, 'Bedtime');
    await submitForm();
    expect(formError()).toBe('Failed to save schedule.');
  });

  it('prefills the edit form from the row and titles the modal Edit Schedule', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    await findBtn(w, 'Edit')!.trigger('click');
    await flushPromises();
    const inputs = modalPanel().querySelectorAll<HTMLInputElement>('.phlix-input__field');
    expect(inputs[0]!.value).toBe('Weekday Evenings');
    // HH:MM:SS from the wire is trimmed to HH:MM for the form.
    expect(inputs[1]!.value).toBe('18:00');
    expect(inputs[2]!.value).toBe('20:30');
    expect(modalPanel().textContent).toContain('Edit Schedule');
    expect(findBtnIn(w, modalPanel(), 'Update')).toBeTruthy();
  });

  it('cancels the form without writing anything', async () => {
    const { client, post, del } = makeClient();
    const w = await mountPage(client);
    await findBtn(w, 'Create Schedule')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(anyModalOpen()).toBe(false);
    expect(post).not.toHaveBeenCalled();
    expect(del).not.toHaveBeenCalled();
  });

  /**
   * 🔴 KNOWN DEFECT, pinned as-is — reported under S160, NOT fixed here.
   *
   * There is no update endpoint, so `submitScheduleForm` implements "edit" as
   * DELETE-then-CREATE (ParentalControlsPage.vue:199-210). The two calls are not
   * atomic and there is no compensating re-create, so if the POST fails after the
   * DELETE succeeded the restriction is GONE from the server while the only signal
   * to the admin is an inline message in a modal they may simply close.
   *
   * On an access-control surface that is a fail-OPEN: the profile silently ends up
   * with NO time restriction. These two tests pin the ordering and then the data
   * loss, so the behaviour is at least visible and a future fix has a red test.
   */
  it('edits by DELETE-then-CREATE, in that order', async () => {
    const { client, post, del } = makeClient();
    const w = await mountPage(client);
    await findBtn(w, 'Edit')!.trigger('click');
    await flushPromises();
    await setInput(0, 'Weekday Evenings v2');
    await submitForm();

    expect(del).toHaveBeenCalledWith(`${SCHEDULES_URL}/11`);
    expect(post).toHaveBeenCalledWith(
      SCHEDULES_URL,
      expect.objectContaining({ name: 'Weekday Evenings v2' }),
    );
    expect(del.mock.invocationCallOrder[0]!).toBeLessThan(post.mock.invocationCallOrder[0]!);
    expect(useToastStore().toasts.some((t) => t.message === 'Schedule updated.')).toBe(true);
  });

  it('DESTROYS the schedule when the re-create fails after the delete (known defect)', async () => {
    const { client, post, del } = makeClient();
    post.mockRejectedValueOnce(new Error('recreate boom'));
    const w = await mountPage(client);
    await findBtn(w, 'Edit')!.trigger('click');
    await flushPromises();
    await setInput(0, 'Weekday Evenings v2');
    await submitForm();

    // The destructive half went through …
    expect(del).toHaveBeenCalledWith(`${SCHEDULES_URL}/11`);
    // … the restorative half did not …
    expect(post).toHaveBeenCalledTimes(1);
    expect(formError()).toBe('recreate boom');
    // … and nothing compensates: no second POST, no re-delete, no reload.
    expect(post).toHaveBeenCalledTimes(1);
    expect(del).toHaveBeenCalledTimes(1);
  });
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 5. Deleting a schedule is TWO-STEP                                         */
/* ══════════════════════════════════════════════════════════════════════════ */

describe('ParentalControlsPage — deleting a schedule requires confirmation', () => {
  it('opens a confirmation and does NOT reach the network on the first click', async () => {
    const { client, del } = makeClient();
    const w = await mountPage(client);
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    expect(anyModalOpen()).toBe(true);
    expect(modalPanel().textContent).toContain('Delete Schedule');
    expect(modalPanel().textContent).toContain('Weekday Evenings');
  });

  it('deletes only after confirming, then refetches', async () => {
    const { client, del, get } = makeClient();
    const w = await mountPage(client);
    const before = get.mock.calls.filter((c) => c[0] === SCHEDULES_URL).length;
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith(`${SCHEDULES_URL}/11`);
    expect(useToastStore().toasts.some((t) => t.message === 'Schedule deleted.')).toBe(true);
    expect(anyModalOpen()).toBe(false);
    expect(get.mock.calls.filter((c) => c[0] === SCHEDULES_URL).length).toBeGreaterThan(before);
  });

  it('cancelling the confirmation deletes nothing and closes it', async () => {
    const { client, del } = makeClient();
    const w = await mountPage(client);
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    expect(anyModalOpen()).toBe(false);
  });

  it('confirms the SECOND row when the second row is the one actioned', async () => {
    const { client, del } = makeClient();
    const w = await mountPage(client);
    const rows = w.findAll('.parental-section__item');
    await findBtnIn(w, rows[1]!.element, 'Delete')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('Weekend');
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith(`${SCHEDULES_URL}/12`);
    expect(del).toHaveBeenCalledTimes(1);
  });

  it('toasts and closes the confirmation when the delete fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('delete boom'));
    const w = await mountPage(client);
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.message === 'delete boom')).toBe(true);
    expect(anyModalOpen()).toBe(false);
  });

  it('uses a generic toast when the delete failure carries no message', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce({});
    const w = await mountPage(client);
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Delete')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.message === 'Failed to delete schedule.')).toBe(true);
  });
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 6. Tags                                                                    */
/* ══════════════════════════════════════════════════════════════════════════ */

describe('ParentalControlsPage — tags', () => {
  async function goToTags(w: VueWrapper): Promise<void> {
    await clickTab(w, 'Tags');
  }

  it('loads tags only when the Tags tab is opened', async () => {
    const { client, get } = makeClient();
    const w = await mountPage(client);
    expect(get).not.toHaveBeenCalledWith(TAGS_URL);
    await goToTags(w);
    expect(get).toHaveBeenCalledWith(TAGS_URL);
  });

  it('badges a blocked tag as error and an allowed tag as success', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    await goToTags(w);
    const rows = w.findAll('.parental-section__item');
    expect(rows.length).toBe(2);
    expect(rows[0]!.find('.parental-section__item-name').text()).toBe('horror');
    expect(rows[0]!.text()).toContain('blocked');
    expect(rows[1]!.text()).toContain('allowed');
  });

  it('shows an empty state when there are no tags', async () => {
    const { client } = makeClient({ tags: [] });
    const w = await mountPage(client);
    await goToTags(w);
    expect(w.text()).toContain('No tags');
  });

  it('shows an error state and retries', async () => {
    const get = getWithProfile(async (url: string) => {
      if (url === SCHEDULES_URL) return { schedules: [] };
      throw new Error('tags boom');
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = await mountPage(client);
    await goToTags(w);
    expect(w.text()).toContain("Couldn't load tags");
    expect(w.text()).toContain('tags boom');
    expect(w.text()).not.toContain('No tags');

    get.mockImplementation(async () => ({ tags: [tagBlocked] }));
    await findBtn(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.findAll('.parental-section__item').length).toBe(1);
  });

  it('falls back to a generic tag-load message', async () => {
    const get = getWithProfile(async (url: string) => {
      if (url === SCHEDULES_URL) return { schedules: [] };
      throw {};
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = await mountPage(client);
    await goToTags(w);
    expect(w.text()).toContain('Failed to load tags.');
  });

  it('refuses an empty tag', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await goToTags(w);
    await findBtn(w, 'Add Tag')!.trigger('click');
    await flushPromises();
    await submitForm();
    expect(formError()).toBe('Tag name is required.');
    expect(post).not.toHaveBeenCalled();
  });

  it('refuses a whitespace-only tag', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await goToTags(w);
    await findBtn(w, 'Add Tag')!.trigger('click');
    await flushPromises();
    await setInput(0, '   ');
    await submitForm();
    expect(formError()).toBe('Tag name is required.');
    expect(post).not.toHaveBeenCalled();
  });

  it('refuses a tag longer than 100 characters', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await goToTags(w);
    await findBtn(w, 'Add Tag')!.trigger('click');
    await flushPromises();
    await setInput(0, 'y'.repeat(101));
    await submitForm();
    expect(formError()).toBe('Tag must be 100 characters or less.');
    expect(post).not.toHaveBeenCalled();
  });

  it('POSTs a trimmed tag defaulting to blocked, then refetches', async () => {
    const { client, post, get } = makeClient();
    const w = await mountPage(client);
    await goToTags(w);
    const before = get.mock.calls.filter((c) => c[0] === TAGS_URL).length;
    await findBtn(w, 'Add Tag')!.trigger('click');
    await flushPromises();
    await setInput(0, '  gore  ');
    await submitForm();
    // Default must be the RESTRICTIVE option — defaulting to `allowed` would be a
    // fail-open on a form whose type select is easy to overlook.
    expect(post).toHaveBeenCalledWith(TAGS_URL, { tag: 'gore', tag_type: 'blocked' });
    expect(useToastStore().toasts.some((t) => t.message === 'Tag added.')).toBe(true);
    expect(anyModalOpen()).toBe(false);
    expect(get.mock.calls.filter((c) => c[0] === TAGS_URL).length).toBeGreaterThan(before);
  });

  it('POSTs tag_type=allowed when the select is switched', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await goToTags(w);
    await findBtn(w, 'Add Tag')!.trigger('click');
    await flushPromises();
    await setInput(0, 'documentary');
    modalPanel().querySelector<HTMLElement>('.phlix-select__trigger')!.click();
    await flushPromises();
    const options = modalPanel().querySelectorAll<HTMLElement>('.phlix-select__option');
    [...options].find((o) => o.textContent?.includes('Allowed'))!.click();
    await flushPromises();
    await submitForm();
    expect(post).toHaveBeenCalledWith(TAGS_URL, { tag: 'documentary', tag_type: 'allowed' });
  });

  it('keeps the modal open and shows the message when adding a tag fails', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce(new Error('tag boom'));
    const w = await mountPage(client);
    await goToTags(w);
    await findBtn(w, 'Add Tag')!.trigger('click');
    await flushPromises();
    await setInput(0, 'gore');
    await submitForm();
    expect(formError()).toBe('tag boom');
    expect(anyModalOpen()).toBe(true);
  });

  it('uses a generic message when the add-tag failure carries none', async () => {
    const { client, post } = makeClient();
    post.mockRejectedValueOnce({});
    const w = await mountPage(client);
    await goToTags(w);
    await findBtn(w, 'Add Tag')!.trigger('click');
    await flushPromises();
    await setInput(0, 'gore');
    await submitForm();
    expect(formError()).toBe('Failed to add tag.');
  });

  it('removing a tag requires confirmation and does not call the API first', async () => {
    const { client, del } = makeClient();
    const w = await mountPage(client);
    await goToTags(w);
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    expect(modalPanel().textContent).toContain('Remove Tag');
    expect(modalPanel().textContent).toContain('horror');
  });

  it('removes the tag after confirming, then refetches', async () => {
    const { client, del, get } = makeClient();
    const w = await mountPage(client);
    await goToTags(w);
    const before = get.mock.calls.filter((c) => c[0] === TAGS_URL).length;
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Remove')!.trigger('click');
    await flushPromises();
    expect(del).toHaveBeenCalledWith(`${TAGS_URL}/21`);
    expect(useToastStore().toasts.some((t) => t.message === 'Tag removed.')).toBe(true);
    expect(get.mock.calls.filter((c) => c[0] === TAGS_URL).length).toBeGreaterThan(before);
  });

  it('cancelling the remove confirmation deletes nothing', async () => {
    const { client, del } = makeClient();
    const w = await mountPage(client);
    await goToTags(w);
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(del).not.toHaveBeenCalled();
    expect(anyModalOpen()).toBe(false);
  });

  it('toasts when removing a tag fails', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce(new Error('remove boom'));
    const w = await mountPage(client);
    await goToTags(w);
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Remove')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.message === 'remove boom')).toBe(true);
    expect(anyModalOpen()).toBe(false);
  });

  it('uses a generic toast when the remove failure carries no message', async () => {
    const { client, del } = makeClient();
    del.mockRejectedValueOnce({});
    const w = await mountPage(client);
    await goToTags(w);
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Remove')!.trigger('click');
    await flushPromises();
    expect(useToastStore().toasts.some((t) => t.message === 'Failed to remove tag.')).toBe(true);
  });

  it('marks the clicked tag row as selected', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    await goToTags(w);
    await w.findAll('.parental-section__item')[1]!.trigger('click');
    expect(w.findAll('.parental-section__item')[1]!.classes()).toContain('is-selected');
  });
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 7. Stream limits                                                           */
/* ══════════════════════════════════════════════════════════════════════════ */

describe('ParentalControlsPage — stream limits', () => {
  async function goToLimits(w: VueWrapper): Promise<void> {
    await clickTab(w, 'Stream Limits');
  }

  it('loads limits only when the tab is opened and renders both values', async () => {
    const { client, get } = makeClient();
    const w = await mountPage(client);
    expect(get).not.toHaveBeenCalledWith(LIMITS_URL);
    await goToLimits(w);
    expect(get).toHaveBeenCalledWith(LIMITS_URL);
    const values = w.findAll('.parental-section__limits-value').map((v) => v.text());
    expect(values).toEqual(['2', '8000']);
  });

  it('renders "Not set" for an absent bandwidth cap', async () => {
    const { client } = makeClient({ limits: { max_concurrent_streams: 1, max_total_bandwidth_kbps: null } });
    const w = await mountPage(client);
    await goToLimits(w);
    expect(w.findAll('.parental-section__limits-value').map((v) => v.text())).toEqual(['1', 'Not set']);
  });

  it('shows an error state and retries', async () => {
    const get = getWithProfile(async (url: string) => {
      if (url === SCHEDULES_URL) return { schedules: [] };
      throw new Error('limits boom');
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = await mountPage(client);
    await goToLimits(w);
    expect(w.text()).toContain("Couldn't load stream limits");
    expect(w.text()).toContain('limits boom');

    get.mockImplementation(async () => limits);
    await findBtn(w, 'Retry')!.trigger('click');
    await flushPromises();
    expect(w.find('.parental-section__limits-card').exists()).toBe(true);
  });

  it('falls back to a generic limits-load message', async () => {
    const get = getWithProfile(async (url: string) => {
      if (url === SCHEDULES_URL) return { schedules: [] };
      throw {};
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = await mountPage(client);
    await goToLimits(w);
    expect(w.text()).toContain('Failed to load stream limits.');
  });

  it('prefills the edit form from the loaded limits', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    const inputs = modalPanel().querySelectorAll<HTMLInputElement>('.phlix-input__field');
    expect(inputs[0]!.value).toBe('2');
    expect(inputs[1]!.value).toBe('8000');
  });

  it('defaults to 1 stream and a blank cap when limits failed to load', async () => {
    const get = getWithProfile(async (url: string) => {
      if (url === SCHEDULES_URL) return { schedules: [] };
      throw new Error('nope');
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    const inputs = modalPanel().querySelectorAll<HTMLInputElement>('.phlix-input__field');
    expect(inputs[0]!.value).toBe('1');
    expect(inputs[1]!.value).toBe('');
  });

  /**
   * A concurrent-stream cap below 1 is not a stricter limit, it is a nonsensical
   * one — the server would be asked to allow "0 or fewer" simultaneous streams.
   * The guard must BLOCK the write, not clamp it silently.
   */
  it.each(['0', '-3'])('refuses a concurrent-stream cap of %s', async (value) => {
    const { client, put } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await setInput(0, value);
    await submitForm();
    expect(formError()).toBe('Max concurrent streams must be at least 1.');
    expect(put).not.toHaveBeenCalled();
    expect(anyModalOpen()).toBe(true);
  });

  it('accepts a cap of exactly 1 (boundary), sending a null bandwidth', async () => {
    const { client, put } = makeClient({
      limits: { max_concurrent_streams: 4, max_total_bandwidth_kbps: null },
    });
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await setInput(0, '1');
    await submitForm();
    expect(put).toHaveBeenCalledWith(LIMITS_URL, {
      max_concurrent_streams: 1,
      max_total_bandwidth_kbps: null,
    });
    expect(componentErrors).toEqual([]);
  });

  it('PUTs the edited stream cap and the untouched bandwidth cap, toasts and refetches', async () => {
    const { client, put, get } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    const before = get.mock.calls.filter((c) => c[0] === LIMITS_URL).length;
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await setInput(0, '3');
    await submitForm();
    // The prefilled bandwidth is carried through unchanged (8000), parsed out of
    // the string the form was seeded with.
    expect(put).toHaveBeenCalledWith(LIMITS_URL, {
      max_concurrent_streams: 3,
      max_total_bandwidth_kbps: 8000,
    });
    expect(useToastStore().toasts.some((t) => t.message === 'Stream limits updated.')).toBe(true);
    expect(anyModalOpen()).toBe(false);
    expect(get.mock.calls.filter((c) => c[0] === LIMITS_URL).length).toBeGreaterThan(before);
    expect(componentErrors).toEqual([]);
  });

  /* ────────────────────────────────────────────────────────────────────────── */
  /* S201 — the bandwidth cap is settable, and nothing here can fail silently    */
  /* ────────────────────────────────────────────────────────────────────────── */

  /**
   * These drive the REAL `Input` emit — `setInput` writes the DOM value and
   * dispatches a genuine `input` event, so `Input.vue`'s
   * `props.type === 'number' ? Number(target.value) : target.value` runs and the
   * model becomes a NUMBER, exactly as it does in a browser.
   *
   * ⚠ That is the whole point of the shape. Assigning a string straight to
   * `streamLimitsForm.maxTotalBandwidthKbps` would leave it a string, `.trim()`
   * would work, and the test would pass against the BROKEN code — the S201 defect
   * is only reachable through the component's own emit. Verified by mutation: with
   * `parseNumericInput` reverted to the original
   * `streamLimitsForm.value.maxTotalBandwidthKbps.trim()` above the `try`, every
   * test in this block fails.
   */
  it.each([
    ['a plausible value', '12000', 12000],
    ['a larger value', '250000', 250000],
    ['zero — the field is optional, so no cap', '0', null],
    ['a cleared field', '', null],
  ])('PUTs the bandwidth cap typed into the real number input — %s', async (_label, typed, sent) => {
    const { client, put } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await setInput(1, typed);
    await submitForm();

    expect(put).toHaveBeenCalledWith(LIMITS_URL, {
      max_concurrent_streams: 2,
      max_total_bandwidth_kbps: sent,
    });
    expect(useToastStore().toasts.some((t) => t.message === 'Stream limits updated.')).toBe(true);
    expect(anyModalOpen()).toBe(false);
    // No throw escaped the handler — the crash this step removed showed up here.
    expect(componentErrors).toEqual([]);
  });

  it('confirms the model really is a NUMBER after typing (the shape the defect needed)', async () => {
    const { client, put } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await setInput(1, '4096');
    // Read the live model, not the DOM: `Input.vue` coerces for `type="number"`,
    // so anything downstream that assumes a string is broken.
    const vm = w.vm as unknown as {
      streamLimitsForm: { maxTotalBandwidthKbps: string | number };
    };
    expect(typeof vm.streamLimitsForm.maxTotalBandwidthKbps).toBe('number');
    await submitForm();
    expect(put).toHaveBeenCalledWith(LIMITS_URL, {
      max_concurrent_streams: 2,
      max_total_bandwidth_kbps: 4096,
    });
  });

  it('edits BOTH numeric fields in one submit', async () => {
    const { client, put } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await setInput(0, '5');
    await setInput(1, '900');
    await submitForm();
    expect(put).toHaveBeenCalledWith(LIMITS_URL, {
      max_concurrent_streams: 5,
      max_total_bandwidth_kbps: 900,
    });
    expect(componentErrors).toEqual([]);
  });

  it('carries the untouched string seed through unchanged', async () => {
    // The bandwidth model is seeded via `.toString()` and stays a STRING until the
    // field is touched, so the parse has to accept both shapes — not just the
    // number the emit produces.
    const { client, put } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    const vm = w.vm as unknown as {
      streamLimitsForm: { maxTotalBandwidthKbps: string | number };
    };
    expect(typeof vm.streamLimitsForm.maxTotalBandwidthKbps).toBe('string');
    await submitForm();
    expect(put).toHaveBeenCalledWith(LIMITS_URL, {
      max_concurrent_streams: 2,
      max_total_bandwidth_kbps: 8000,
    });
  });

  /**
   * The invariant the S201 defect broke was not "the cap is wrong" — it was that
   * submitting produced NO observable outcome at all. Whatever is in the two
   * fields, exactly one of {a PUT went out, an error is on screen} must hold, and
   * nothing may escape to the error handler.
   */
  it.each([
    ['both blank', '', ''],
    ['a blank cap, a valid stream count', '3', ''],
    ['a zero stream count', '0', '12000'],
    ['a negative stream count', '-2', '12000'],
    ['a negative bandwidth', '2', '-500'],
    ['a fractional bandwidth', '2', '1500.75'],
    ['a huge bandwidth', '2', '999999999'],
  ])('submitting is never silent — %s', async (_label, streamsValue, bwValue) => {
    const { client, put } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await setInput(0, streamsValue);
    await setInput(1, bwValue);
    await submitForm();

    const wrote = put.mock.calls.length > 0;
    const complained = !anyModalOpen() || formError() !== '';
    expect(wrote || complained).toBe(true);
    expect(componentErrors).toEqual([]);
  });

  it('truncates a fractional bandwidth rather than sending a float', async () => {
    const { client, put } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await setInput(1, '1500.75');
    await submitForm();
    expect(put).toHaveBeenCalledWith(LIMITS_URL, {
      max_concurrent_streams: 2,
      max_total_bandwidth_kbps: 1500,
    });
  });

  it('treats a negative bandwidth as no cap, not as a negative cap', async () => {
    const { client, put } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await setInput(1, '-500');
    await submitForm();
    expect(put).toHaveBeenCalledWith(LIMITS_URL, {
      max_concurrent_streams: 2,
      max_total_bandwidth_kbps: null,
    });
  });

  it('keeps the modal open and shows the message when the update fails', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce(new Error('limits boom'));
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await submitForm();
    expect(formError()).toBe('limits boom');
    expect(anyModalOpen()).toBe(true);
  });

  it('uses a generic message when the update failure carries none', async () => {
    const { client, put } = makeClient();
    put.mockRejectedValueOnce({});
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await submitForm();
    expect(formError()).toBe('Failed to update stream limits.');
  });

  it('cancels without writing', async () => {
    const { client, put } = makeClient();
    const w = await mountPage(client);
    await goToLimits(w);
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(put).not.toHaveBeenCalled();
    expect(anyModalOpen()).toBe(false);
  });
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 8. Tab routing                                                             */
/* ══════════════════════════════════════════════════════════════════════════ */

describe('ParentalControlsPage — tab switching loads the matching section', () => {
  it('loads schedules first and each other section on demand, without cross-talk', async () => {
    const { client, get } = makeClient();
    const w = await mountPage(client);
    const urls = () => get.mock.calls.map((c) => c[0]);

    // The profile identity is fetched once, on mount, and never re-fetched per tab.
    expect(urls()).toEqual([PROFILE_URL, SCHEDULES_URL]);
    await clickTab(w, 'Tags');
    expect(urls()).toEqual([PROFILE_URL, SCHEDULES_URL, TAGS_URL]);
    await clickTab(w, 'Stream Limits');
    expect(urls()).toEqual([PROFILE_URL, SCHEDULES_URL, TAGS_URL, LIMITS_URL]);
    await clickTab(w, 'Schedules');
    expect(urls()).toEqual([PROFILE_URL, SCHEDULES_URL, TAGS_URL, LIMITS_URL, SCHEDULES_URL]);
  });

  it('renders only the active tab panel', async () => {
    const { client } = makeClient();
    const w = await mountPage(client);
    expect(w.text()).toContain('create');
    expect(findBtn(w, 'Create Schedule')).toBeTruthy();
    expect(findBtn(w, 'Add Tag')).toBeUndefined();
    await clickTab(w, 'Tags');
    expect(findBtn(w, 'Create Schedule')).toBeUndefined();
    expect(findBtn(w, 'Add Tag')).toBeTruthy();
  });
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 9. Dismissing a confirmation via the modal chrome                          */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * Both delete confirmations are driven by a WRITABLE computed whose setter clears
 * the pending item (`showDeleteScheduleModal` / `showDeleteTagModal`). The Cancel
 * button is not the only way out — Modal.vue's own close control and its backdrop
 * emit `update:modelValue` straight into that setter. If the setter did not clear
 * the pending item, the next confirmation would open pre-armed with the PREVIOUS
 * target, which on a destructive control is how the wrong rule gets deleted.
 */
describe('ParentalControlsPage — dismissing a confirmation via the modal close control', () => {
  it('cancels a pending schedule delete and does not leave it armed', async () => {
    const { client, del } = makeClient();
    const w = await mountPage(client);
    await findBtn(w, 'Delete')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('Weekday Evenings');

    modalPanel().querySelector<HTMLButtonElement>('.phlix-modal__close')!.click();
    await flushPromises();

    expect(anyModalOpen()).toBe(false);
    expect(del).not.toHaveBeenCalled();

    // Re-arming on the OTHER row must target that row, not the dismissed one.
    const rows = w.findAll('.parental-section__item');
    await findBtnIn(w, rows[1]!.element, 'Delete')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('Weekend');
    expect(modalPanel().textContent).not.toContain('Weekday Evenings');
  });

  it('cancels a pending tag removal and does not leave it armed', async () => {
    const { client, del } = makeClient();
    const w = await mountPage(client);
    await clickTab(w, 'Tags');
    await findBtn(w, 'Remove')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('horror');

    modalPanel().querySelector<HTMLButtonElement>('.phlix-modal__close')!.click();
    await flushPromises();

    expect(anyModalOpen()).toBe(false);
    expect(del).not.toHaveBeenCalled();

    const rows = w.findAll('.parental-section__item');
    await findBtnIn(w, rows[1]!.element, 'Remove')!.trigger('click');
    await flushPromises();
    expect(modalPanel().textContent).toContain('kids');
  });

  it('closes the schedule form via the modal close control without writing', async () => {
    const { client, post, del } = makeClient();
    const w = await mountPage(client);
    await findBtn(w, 'Create Schedule')!.trigger('click');
    await flushPromises();
    await setInput(0, 'Half-typed');
    modalPanel().querySelector<HTMLButtonElement>('.phlix-modal__close')!.click();
    await flushPromises();
    expect(anyModalOpen()).toBe(false);
    expect(post).not.toHaveBeenCalled();
    expect(del).not.toHaveBeenCalled();
  });

  it('closes the tag form via the modal close control without writing', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await clickTab(w, 'Tags');
    await findBtn(w, 'Add Tag')!.trigger('click');
    await flushPromises();
    await setInput(0, 'half-typed');
    modalPanel().querySelector<HTMLButtonElement>('.phlix-modal__close')!.click();
    await flushPromises();
    expect(anyModalOpen()).toBe(false);
    expect(post).not.toHaveBeenCalled();
  });

  it('cancels the tag form with its Cancel button without writing', async () => {
    const { client, post } = makeClient();
    const w = await mountPage(client);
    await clickTab(w, 'Tags');
    await findBtn(w, 'Add Tag')!.trigger('click');
    await flushPromises();
    await setInput(0, 'half-typed');
    await findBtnIn(w, modalPanel(), 'Cancel')!.trigger('click');
    await flushPromises();
    expect(anyModalOpen()).toBe(false);
    expect(post).not.toHaveBeenCalled();
  });

  it('closes the stream-limits form via the modal close control without writing', async () => {
    const { client, put } = makeClient();
    const w = await mountPage(client);
    await clickTab(w, 'Stream Limits');
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    modalPanel().querySelector<HTMLButtonElement>('.phlix-modal__close')!.click();
    await flushPromises();
    expect(anyModalOpen()).toBe(false);
    expect(put).not.toHaveBeenCalled();
  });
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 10. The API-client seam                                                    */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * The `client` prop is a test seam; in production the page builds its own
 * `ApiClient` from the injected `apiBase`, which `useApiBase`-style code may supply
 * either as a plain string (the media server) or as a `ComputedRef` (the hub, whose
 * base tracks the selected server). Both shapes must construct — a page that threw
 * during setup on the hub would take the whole route down.
 */
describe('ParentalControlsPage — builds its own client when no client prop is given', () => {
  async function mountBare(apiBase: unknown): Promise<VueWrapper> {
    setActivePinia(createPinia());
    const router = makeRouter();
    await router.push(`/app/parental-controls?profile=${PROFILE}`);
    await router.isReady();
    const w = mount(ParentalControlsPage, {
      attachTo: document.body,
      global: {
        plugins: [router],
        provide: { apiBase },
        config: { errorHandler: (err: unknown) => { componentErrors.push(err); } },
      },
    });
    await flushPromises();
    return w;
  }

  it('accepts a plain-string apiBase', async () => {
    const w = await mountBare('https://media.test');
    expect(w.findAll('[role="tab"]').length).toBe(3);
    expect(componentErrors).toEqual([]);
  });

  it('accepts a ComputedRef apiBase', async () => {
    const w = await mountBare(computed(() => 'https://hub.test/api/v1/servers/9/proxy'));
    expect(w.findAll('[role="tab"]').length).toBe(3);
    expect(componentErrors).toEqual([]);
  });

  it('accepts no apiBase at all', async () => {
    const w = await mountBare(undefined);
    expect(w.findAll('[role="tab"]').length).toBe(3);
    expect(componentErrors).toEqual([]);
  });
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* 11. The profile identity badge                                             */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * S203 — the page must say WHOSE restrictions are on screen.
 *
 * `loadProfiles()` used to be a stub that built `const allProfiles: Profile[] = []`
 * and assigned it, never calling the API, so `selectedProfile` was always null and
 * the header badge never rendered. The profile is chosen by an opaque `?profile=`
 * query param, so with no name rendered there was no on-screen confirmation of
 * which child was being edited — a wrong id was silently unnoticeable.
 *
 * The failure path is deliberate rather than inherited: the old `catch` was a bare
 * `// Silently fail`, which is the one thing this surface cannot afford, because a
 * page that cannot name the profile looks EXACTLY like one that can. So a load
 * failure renders an explicit "Unidentified profile" warning carrying the id and
 * the reason — and does NOT gate the editor, since blocking restriction changes on
 * a name lookup would fail in the more dangerous direction.
 */
describe('ParentalControlsPage — profile identity badge', () => {
  it('fetches the profile named by ?profile= and renders its name and rating', async () => {
    const { client, get } = makeClient();
    const w = await mountPage(client);
    expect(get).toHaveBeenCalledWith(PROFILE_URL);
    const badge = w.find('.parental-page__profile-badge');
    expect(badge.exists()).toBe(true);
    expect(badge.text()).toContain('Robin');
    // rating 5 → the TV-PG label, not the raw index.
    expect(badge.text()).toContain('TV-PG');
    expect(badge.classes()).not.toContain('parental-page__profile-badge--unknown');
  });

  /**
   * The acceptance criterion stated as a test: `profiles` IS populated, so if the
   * badge does not appear the wiring between the loaded row and the header is
   * broken — which is precisely the state master shipped in.
   */
  it('fails if profiles is populated but no badge appears', async () => {
    const { client } = makeClient({
      profile: { ...profileRow, name: 'Sam', rating: 0 },
    });
    const w = await mountPage(client);
    const vm = w.vm as unknown as { profiles: Profile[] };
    expect(vm.profiles.length).toBe(1);
    expect(w.find('.parental-page__profile-badge').exists()).toBe(true);
    expect(w.find('.parental-page__profile-badge').text()).toContain('Sam');
    expect(w.find('.parental-page__profile-badge').text()).toContain('G —');
  });

  /**
   * `user_profiles.id` is `CHAR(36)` server-side, so the wire id can arrive as a
   * STRING where the query-param id was parsed to a number. A strict `===` match
   * would then drop the profile that was just fetched by that very id and silently
   * reproduce the blank header.
   */
  it('matches a profile whose wire id is a string, not a number', async () => {
    const { client } = makeClient({
      profile: { ...profileRow, id: String(PROFILE) as unknown as number },
    });
    const w = await mountPage(client);
    expect(w.find('.parental-page__profile-badge').text()).toContain('Robin');
  });

  it('labels an out-of-range rating Unknown rather than rendering a bare number', async () => {
    const { client } = makeClient({ profile: { ...profileRow, rating: 99 } });
    const w = await mountPage(client);
    expect(w.find('.parental-page__profile-badge').text()).toContain('Unknown');
  });

  it('says the profile is UNIDENTIFIED, with the reason, when the load fails', async () => {
    const { client } = makeClient({ profile: null });
    const w = await mountPage(client);
    const badge = w.find('.parental-page__profile-badge');
    expect(badge.exists()).toBe(true);
    expect(badge.classes()).toContain('parental-page__profile-badge--unknown');
    expect(badge.text()).toContain(`Unidentified profile #${PROFILE}`);
    // The reason is shown, not swallowed — the old catch was a bare "silently fail".
    expect(badge.text()).toContain('profile boom');
    expect(componentErrors).toEqual([]);
  });

  it('falls back to a generic reason when the failure carries no message', async () => {
    const get = vi.fn(async (url: string): Promise<unknown> => {
      if (url === PROFILE_URL) throw {};
      if (url === SCHEDULES_URL) return { schedules: [] };
      throw new Error(`unexpected GET ${url}`);
    });
    const client = { get, post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } as unknown as ApiClient;
    const w = await mountPage(client);
    expect(w.find('.parental-page__profile-badge').text()).toContain('Could not load this profile.');
  });

  /**
   * The identity lookup is informational; it must never become a gate. If a failed
   * name fetch disabled the editor, an outage in profile metadata would stop an
   * admin TIGHTENING a child's restrictions — the wrong direction to fail on an
   * access-control surface.
   */
  it('does not gate the editor when the identity is unknown', async () => {
    const { client, put } = makeClient({ profile: null });
    const w = await mountPage(client);
    expect(w.findAll('[role="tab"]').length).toBe(3);
    await clickTab(w, 'Stream Limits');
    await findBtn(w, 'Update Limits')!.trigger('click');
    await flushPromises();
    await setInput(0, '3');
    await submitForm();
    expect(put).toHaveBeenCalledWith(LIMITS_URL, {
      max_concurrent_streams: 3,
      max_total_bandwidth_kbps: 8000,
    });
  });

  it('renders no badge at all — not even the unknown one — with no ?profile=', async () => {
    const { client, get } = makeClient();
    const w = await mountPage(client, '');
    expect(w.find('.parental-page__profile-badge').exists()).toBe(false);
    expect(get).not.toHaveBeenCalled();
  });

  it('fetches no profile for an id that fails the numeric gate', async () => {
    const { client, get } = makeClient();
    const w = await mountPage(client, '?profile=abc');
    expect(get).not.toHaveBeenCalled();
    expect(w.find('.parental-page__profile-badge').exists()).toBe(false);
  });
});
