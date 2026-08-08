/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S243 — McpTokensPage.
 *
 * The assertions here are on RENDERED / SENT values, never on "a function was
 * called": a no-op passes the latter. Three shapes deserve calling out:
 *
 *  - the show-once reveal is asserted by what is in `document.body` before and
 *    after each dismissal attempt, so a guard that stopped working would be
 *    visible as the plaintext disappearing (or persisting) at the wrong moment;
 *  - the `disabled` gates are exercised with a RAW `dispatchEvent`, never VTU's
 *    `trigger()`. `trigger()` refuses to fire on a disabled element, so a test
 *    built on it passes against a guard that has been deleted. Each such test
 *    also asserts the element it dispatched at actually exists and is disabled,
 *    so a zero-effect result cannot come from having aimed at nothing;
 *  - the scope tests assert the POST BODY, because "cannot submit a value the
 *    server rejects" is a statement about the wire, not about the checkboxes.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import McpTokensPage from './McpTokensPage.vue';
import Button from '../components/ui/Button.vue';
import { useToastStore } from '../stores/useToastStore';
import type { ApiClient } from '../api/client';
import { MCP_SCOPES, MCP_DEFAULT_SCOPES } from '../api/mcp-tokens';

/**
 * What the MOCK HUB reports in `available_scopes` — deliberately a proper
 * subset of this build's {@link MCP_SCOPES} (it omits `mcp:playback:control`).
 * Keeping it narrower is what makes "the checkboxes come from the server, not
 * from the constant" a real assertion rather than a coincidence.
 */
const SCOPES = ['mcp:servers:read', 'mcp:library:read', 'mcp:playback:read'];

const activeToken = {
    id: 'tok-1',
    name: 'Claude Desktop',
    scopes: ['mcp:servers:read', 'mcp:library:read'],
    created_at: 1746057600,
    expires_at: 4070908800,
    last_used_at: 1746144000,
    revoked: false,
    expired: false,
};

const PLAINTEXT = 'phlix-mcp-0123456789abcdef';

interface Overrides {
    tokens?: unknown[];
    /** One entry per GET, in order; the last entry repeats. */
    scopeSequence?: string[][];
    minted?: unknown;
}

function makeClient(over: Overrides = {}) {
    let getCount = 0;
    const get = vi.fn(async (endpoint: string) => {
        if (endpoint !== '/api/v1/me/mcp-tokens') throw new Error(`unexpected GET ${endpoint}`);
        const seq = over.scopeSequence ?? [SCOPES];
        const scopes = seq[Math.min(getCount, seq.length - 1)];
        getCount += 1;
        return { tokens: over.tokens ?? [activeToken], available_scopes: scopes };
    });
    const post = vi.fn(async (_endpoint: string, _body?: unknown) => ({
        id: 'tok-new',
        token: PLAINTEXT,
        name: 'Claude Desktop',
        scopes: SCOPES,
        expires_at: 4070908800,
        ...(over.minted ?? {}),
    }));
    const del = vi.fn(async () => ({ revoked: true, id: 'tok-1' }));
    return { client: { get, post, delete: del } as unknown as ApiClient, get, post, del };
}

function mountPage(client: ApiClient): VueWrapper {
    return mount(McpTokensPage, { props: { client }, attachTo: document.body });
}

function btn(text: string): HTMLButtonElement | undefined {
    return [...document.body.querySelectorAll('button')].find(
        (b) => (b.textContent ?? '').trim() === text,
    ) as HTMLButtonElement | undefined;
}

/** Click as the browser's DOM would, NOT via VTU's disabled-aware `trigger()`. */
function rawClick(el: Element): void {
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
}

function bodyText(): string {
    return document.body.textContent ?? '';
}

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
    writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
});
afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
});

// ─────────────────────────────────────────────────────────────────────────────

describe('McpTokensPage — list and states', () => {
    it('loads from the hub path on mount and renders the token', async () => {
        const { client, get } = makeClient();
        const w = mountPage(client);
        await flushPromises();
        expect(get).toHaveBeenCalledWith('/api/v1/me/mcp-tokens');
        expect(w.text()).toContain('Claude Desktop');
        expect(w.text()).toContain('mcp:servers:read');
        expect(w.text()).toContain('mcp:library:read');
        expect(w.text()).toContain('Active');
        w.unmount();
    });

    it('shows a skeleton while the first load is in flight', async () => {
        let resolve: (v: unknown) => void = () => {};
        const get = vi.fn(() => new Promise((r) => (resolve = r)));
        const w = mountPage({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
        expect(w.find('.mcp-tokens__skel').exists()).toBe(true);
        resolve({ tokens: [activeToken], available_scopes: SCOPES });
        await flushPromises();
        expect(w.find('.mcp-tokens__skel').exists()).toBe(false);
        w.unmount();
    });

    it('shows the empty state when the user has no tokens', async () => {
        const { client } = makeClient({ tokens: [] });
        const w = mountPage(client);
        await flushPromises();
        expect(w.text()).toContain('No MCP tokens');
        w.unmount();
    });

    it('shows an error state and toasts when the load fails', async () => {
        const get = vi.fn().mockRejectedValue(new Error('hub down'));
        const w = mountPage({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
        const toasts = useToastStore();
        await flushPromises();
        expect(w.text()).toContain("Couldn't load MCP tokens");
        expect(toasts.toasts.some((t) => t.tone === 'error' && t.message === 'hub down')).toBe(true);
        w.unmount();
    });

    it('renders an unnamed token with a placeholder rather than a blank row', async () => {
        const { client } = makeClient({ tokens: [{ ...activeToken, name: '   ' }] });
        const w = mountPage(client);
        await flushPromises();
        expect(w.text()).toContain('Unnamed token');
        w.unmount();
    });

    it('labels revoked / expired / active distinctly, revoked winning over expired', async () => {
        const { client } = makeClient({
            tokens: [
                { ...activeToken, id: 'a', name: 'Alive' },
                { ...activeToken, id: 'b', name: 'Gone', revoked: true, expired: false },
                { ...activeToken, id: 'c', name: 'Stale', revoked: false, expired: true },
                { ...activeToken, id: 'd', name: 'Both', revoked: true, expired: true },
            ],
        });
        const w = mountPage(client);
        await flushPromises();
        const cards = w.findAll('.mcp-token-card');
        expect(cards).toHaveLength(4);
        expect(cards[0].text()).toContain('Active');
        expect(cards[1].text()).toContain('Revoked');
        expect(cards[2].text()).toContain('Expired');
        // A revoked-AND-expired token reads "Revoked": it is dead by decision,
        // not merely by clock, and the clock reason is the less actionable one.
        expect(cards[3].text()).toContain('Revoked');
        expect(cards[3].text()).not.toContain('Expired');
        w.unmount();
    });

    it('reports a never-used token as such rather than as an epoch date', async () => {
        const { client } = makeClient({ tokens: [{ ...activeToken, last_used_at: null }] });
        const w = mountPage(client);
        await flushPromises();
        expect(w.text()).toContain('Never used');
        expect(w.text()).not.toContain('1970');
        w.unmount();
    });

    it('offers no Revoke action on an already-revoked token', async () => {
        const { client } = makeClient({
            tokens: [
                { ...activeToken, id: 'a', name: 'Alive' },
                { ...activeToken, id: 'b', name: 'Gone', revoked: true },
            ],
        });
        const w = mountPage(client);
        await flushPromises();
        const cards = w.findAll('.mcp-token-card');
        expect(cards[0].findAllComponents(Button)).toHaveLength(1);
        expect(cards[1].findAllComponents(Button)).toHaveLength(0);
        w.unmount();
    });
});

// ─────────────────────────────────────────────────────────────────────────────

describe('McpTokensPage — scope selection comes from the server', () => {
    async function openForm(client: ApiClient) {
        const w = mountPage(client);
        await flushPromises();
        rawClick(btn('New Token')!);
        await flushPromises();
        return w;
    }

    it('renders one checkbox per scope the HUB reported, not a hardcoded list', async () => {
        // A vocabulary that deliberately disagrees with this build's constant:
        // one scope dropped, one the UI has never heard of.
        const { client } = makeClient({
            scopeSequence: [['mcp:servers:read', 'mcp:future:write']],
        });
        const w = await openForm(client);
        const boxes = [...document.body.querySelectorAll('.mcp-scope__box')] as HTMLInputElement[];
        expect(boxes.map((b) => b.value)).toEqual(['mcp:servers:read', 'mcp:future:write']);
        // The unknown scope is still nameable, so it is usable rather than blank.
        expect(bodyText()).toContain('mcp:future:write');
        w.unmount();
    });

    it('falls back to this build s vocabulary when the hub omits available_scopes', async () => {
        const get = vi.fn(async () => ({ tokens: [] }));
        const w = await openForm({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);
        const boxes = [...document.body.querySelectorAll('.mcp-scope__box')] as HTMLInputElement[];
        // Against MCP_SCOPES, not the `SCOPES` server mock: the mock is
        // deliberately NARROWER than the build's vocabulary (it omits
        // mcp:playback:control), which is what makes the other tests in this
        // block prove the boxes come from the server. This one is the opposite
        // case — the server said nothing, so the build's own list must show.
        expect(boxes.map((b) => b.value)).toEqual([...MCP_SCOPES]);
        // Anti-vacuity: an empty fallback would render zero boxes and satisfy
        // the equality above against an empty MCP_SCOPES.
        expect(boxes.length).toBeGreaterThanOrEqual(4);
        w.unmount();
    });

    it('posts the name and exactly the checked scopes', async () => {
        const { client, post } = makeClient();
        const w = await openForm(client);
        const boxes = [...document.body.querySelectorAll('.mcp-scope__box')] as HTMLInputElement[];
        // Uncheck the middle scope.
        boxes[1].dispatchEvent(new Event('change', { bubbles: true }));
        await flushPromises();
        const nameInput = document.body.querySelector('.phlix-input__field') as HTMLInputElement;
        nameInput.value = '  My Agent  ';
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        await flushPromises();

        rawClick(btn('Create token')!);
        await flushPromises();

        expect(post).toHaveBeenCalledWith('/api/v1/me/mcp-tokens', {
            name: 'My Agent',
            scopes: ['mcp:servers:read', 'mcp:playback:read'],
        });
        w.unmount();
    });

    it('never posts a scope the hub no longer offers', async () => {
        // The selection is seeded from the FIRST vocabulary and is sticky; the
        // hub then drops a scope on a later refresh. Without the intersection in
        // `submittableScopes` the stale value would be posted and 400.
        const { client, post, del } = makeClient({
            scopeSequence: [
                ['mcp:servers:read', 'mcp:library:read', 'mcp:playback:read'],
                ['mcp:servers:read', 'mcp:library:read'],
            ],
        });
        const w = mountPage(client);
        await flushPromises();

        // Force the second GET (a revoke refetches the list).
        rawClick(btn('Revoke')!);
        await flushPromises();
        rawClick(btn('Revoke token')!);
        await flushPromises();
        expect(del).toHaveBeenCalled();

        rawClick(btn('New Token')!);
        await flushPromises();
        const boxes = [...document.body.querySelectorAll('.mcp-scope__box')] as HTMLInputElement[];
        expect(boxes.map((b) => b.value)).toEqual(['mcp:servers:read', 'mcp:library:read']);

        rawClick(btn('Create token')!);
        await flushPromises();

        const body = post.mock.calls[0]?.[1] as { scopes: string[] };
        expect(body.scopes).toEqual(['mcp:servers:read', 'mcp:library:read']);
        expect(body.scopes).not.toContain('mcp:playback:read');
        w.unmount();
    });

    it('keeps a deliberate narrowing across a list refresh', async () => {
        // The seed runs ONCE. Re-seeding on every refresh would silently restore
        // scopes the user had just removed — the opposite of least privilege —
        // and would do it invisibly, because the modal is closed at the time.
        const { client } = makeClient();
        const w = await openForm(client);
        const boxes = [...document.body.querySelectorAll('.mcp-scope__box')] as HTMLInputElement[];
        boxes[2].dispatchEvent(new Event('change', { bubbles: true })); // drop playback:read
        await flushPromises();
        rawClick(btn('Cancel')!);
        await flushPromises();

        // A revoke refetches the list — the moment a re-seed would fire.
        rawClick(btn('Revoke')!);
        await flushPromises();
        rawClick(btn('Revoke token')!);
        await flushPromises();

        rawClick(btn('New Token')!);
        await flushPromises();
        const after = [...document.body.querySelectorAll('.mcp-scope__box')] as HTMLInputElement[];
        expect(after.map((b) => b.checked)).toEqual([true, true, false]);
        w.unmount();
    });

    it('mints once even when Create is clicked twice in the same tick', async () => {
        // A double mint costs the user a token whose plaintext they never see:
        // only the LAST reveal renders, so the first token is unrecoverable and
        // un-obvious. `creating` is the guard; the button's loading state is chrome.
        let release: (v: unknown) => void = () => {};
        const { client } = makeClient();
        const post = vi.fn(() => new Promise((r) => (release = r)));
        const slow = { ...client, post } as unknown as ApiClient;
        const w = await openForm(slow);
        const create = document.body.querySelector('.mcp-tokens__create') as HTMLButtonElement;
        rawClick(create);
        rawClick(create);
        await flushPromises();
        expect(post.mock.calls).toHaveLength(1);
        release({ id: 'x', token: PLAINTEXT, name: '', scopes: SCOPES, expires_at: 1 });
        await flushPromises();
        w.unmount();
    });

    it('refuses to post with no scope selected — the guard, not the disabled attribute', async () => {
        const { client, post } = makeClient();
        const w = await openForm(client);
        const boxes = [...document.body.querySelectorAll('.mcp-scope__box')] as HTMLInputElement[];
        for (const box of boxes) {
            box.dispatchEvent(new Event('change', { bubbles: true }));
        }
        await flushPromises();

        const create = document.body.querySelector('.mcp-tokens__create') as HTMLButtonElement;
        // Non-inertness: the target exists, and the disabled attribute IS set —
        // so a zero-POST result below is the guard working, not a missing button.
        expect(create, 'the Create button must exist to dispatch at').toBeTruthy();
        expect(create.disabled).toBe(true);

        rawClick(create);
        await flushPromises();

        const toasts = useToastStore();
        expect(post).not.toHaveBeenCalled();
        expect(toasts.toasts.some((t) => t.message === 'Select at least one scope.')).toBe(true);
        expect(bodyText()).toContain('Select at least one scope');
        w.unmount();
    });
});

// ─────────────────────────────────────────────────────────────────────────────

/**
 * S261 — which boxes the create form arrives TICKED.
 *
 * The whole block runs against a hub that advertises ALL FOUR scopes, i.e. a
 * deployment with `playback_control` switched ON. That is the only
 * configuration in which the defect is reachable: with the flag off the hub
 * omits `mcp:playback:control` from `available_scopes` entirely, so the rest of
 * this file (whose `SCOPES` mock is the three read scopes) is structurally
 * blind to it. Reusing that mock here would have produced a green block that
 * proved nothing.
 *
 * ⚠ Every assertion is on the RENDERED `<input>.checked`, never on the
 * component's `selectedScopes`. Reading the source array would pass against a
 * template that ignored it.
 *
 * ⚠ The fixture puts `mcp:playback:read` and `mcp:playback:control` in the same
 * form with OPPOSITE expected states, which is what makes the exactness real
 * rather than described. `mcp:playback` is a strict prefix of the write scope,
 * so a `startsWith('mcp:playback')` deny-rule unticks both and an
 * `includes('mcp:playback')` allow-rule ticks both — either way this block
 * reds. Mutations M2/M3 are those two rules, spelled out.
 */
describe('McpTokensPage — the default scope selection is read-only (S261)', () => {
    /**
     * The one scope that can CHANGE anything. Named once, compared exactly.
     *
     * Annotated `string` on purpose: left as a literal, TS narrows the const
     * tuples so hard that `MCP_DEFAULT_SCOPES.filter((s) => s === WRITE_SCOPE)`
     * becomes a compile ERROR for having no overlap — i.e. the type system
     * answers the question and the runtime check never gets to. The runtime
     * check is the one that has to hold against a mutated constant.
     */
    const WRITE_SCOPE: string = 'mcp:playback:control';
    /** A hub with `playback_control` ON advertises the full vocabulary. */
    const FLAG_ON_SCOPES = [...MCP_SCOPES];
    const READ_ONLY = ['mcp:servers:read', 'mcp:library:read', 'mcp:playback:read'];

    function scopeBoxes(): HTMLInputElement[] {
        return [...document.body.querySelectorAll('.mcp-scope__box')] as HTMLInputElement[];
    }

    /** value → rendered checked state, for every box actually in the document. */
    function renderedTicks(): Record<string, boolean> {
        return Object.fromEntries(scopeBoxes().map((b) => [b.value, b.checked]));
    }

    function boxFor(scope: string): HTMLInputElement {
        const found = scopeBoxes().find((b) => b.value === scope);
        expect(found, `no checkbox rendered for ${scope}`).toBeTruthy();
        return found as HTMLInputElement;
    }

    async function openForm(client: ApiClient) {
        const w = mountPage(client);
        await flushPromises();
        rawClick(btn('New Token')!);
        await flushPromises();
        return w;
    }

    it('the fixture is non-vacuous: the write scope really is in the vocabulary', () => {
        // Without this, every "the write scope is not ticked" assertion below
        // could be satisfied by the scope having been renamed out of existence.
        expect(MCP_SCOPES.filter((s) => s === WRITE_SCOPE)).toEqual([WRITE_SCOPE]);
        expect(MCP_DEFAULT_SCOPES.filter((s) => s === WRITE_SCOPE)).toEqual([]);
        // And the default really is the hub's `McpScopes::readOnly()` set.
        expect([...MCP_DEFAULT_SCOPES]).toEqual(READ_ONLY);
    });

    it('offers all four boxes but arrives with the WRITE scope unticked', async () => {
        const { client } = makeClient({ scopeSequence: [FLAG_ON_SCOPES] });
        const w = await openForm(client);

        // Anti-vacuity first: the write scope's box EXISTS, so "not ticked"
        // below is a rendered state and not a missing element.
        expect(boxFor(WRITE_SCOPE)).toBeTruthy();
        expect(scopeBoxes()).toHaveLength(4);

        // The whole rendered picture in one exact compare — an assertion that
        // names what IS ticked as well as what is not, so a fix that ticked
        // nothing at all would red here too.
        expect(renderedTicks()).toEqual({
            'mcp:servers:read': true,
            'mcp:library:read': true,
            'mcp:playback:read': true,
            'mcp:playback:control': false,
        });

        // Restated per member with exact equality, never a substring test:
        // `mcp:playback` is a prefix of `mcp:playback:control`.
        const ticked = scopeBoxes()
            .filter((b) => b.checked)
            .map((b) => b.value);
        expect(ticked).toEqual(READ_ONLY);
        for (const value of ticked) {
            expect(value).not.toBe(WRITE_SCOPE);
        }
        w.unmount();
    });

    it('posts exactly the read-only set when the user changes nothing', async () => {
        // The rendered ticks are only half the claim; this is what reaches the
        // wire, which is what actually decides the token's capability.
        const { client, post } = makeClient({ scopeSequence: [FLAG_ON_SCOPES] });
        const w = await openForm(client);
        rawClick(btn('Create token')!);
        await flushPromises();

        expect(post).toHaveBeenCalledTimes(1);
        const body = post.mock.calls[0]?.[1] as { scopes: string[] };
        expect(body.scopes).toEqual(READ_ONLY);
        for (const scope of body.scopes) {
            expect(scope).not.toBe(WRITE_SCOPE);
        }
        w.unmount();
    });

    it('SUCCEEDING CONTROL: ticking the write scope still mints it', async () => {
        // Proving a default is not the same as proving a ban, and only this
        // pair distinguishes them. Without it, a form that simply refused to
        // offer `mcp:playback:control` would pass every test above — and would
        // be a different, wrong decision: the hub honours an explicit request
        // for that scope regardless of the feature flag, deliberately.
        const { client, post } = makeClient({
            scopeSequence: [FLAG_ON_SCOPES],
            minted: { scopes: [...FLAG_ON_SCOPES] },
        });
        const w = await openForm(client);

        const writeBox = boxFor(WRITE_SCOPE);
        expect(writeBox.checked, 'precondition: it starts unticked').toBe(false);
        writeBox.dispatchEvent(new Event('change', { bubbles: true }));
        await flushPromises();

        // The tick is visible to the user before it is sent.
        expect(boxFor(WRITE_SCOPE).checked).toBe(true);
        expect(renderedTicks()).toEqual({
            'mcp:servers:read': true,
            'mcp:library:read': true,
            'mcp:playback:read': true,
            'mcp:playback:control': true,
        });

        rawClick(btn('Create token')!);
        await flushPromises();

        expect(post).toHaveBeenCalledTimes(1);
        const body = post.mock.calls[0]?.[1] as { scopes: string[] };
        expect(body.scopes).toEqual([...FLAG_ON_SCOPES]);
        expect(body.scopes.filter((s) => s === WRITE_SCOPE)).toEqual([WRITE_SCOPE]);
        w.unmount();
    });

    it('does not pre-tick the write scope on the OFFLINE FALLBACK path either', async () => {
        // The second route to a pre-ticked write scope, and it never touches
        // the hub's filtering: when the list response omits `available_scopes`,
        // the form falls back to this build's own `MCP_SCOPES` constant, which
        // contains all four. Fixing only the hub would have left this open.
        const get = vi.fn(async () => ({ tokens: [] }));
        const w = await openForm({ get, post: vi.fn(), delete: vi.fn() } as unknown as ApiClient);

        // The fallback still OFFERS all four — deliberately. An older hub does
        // honour the write scope, so withdrawing the checkbox would make it
        // un-mintable rather than merely un-defaulted.
        expect(scopeBoxes().map((b) => b.value)).toEqual([...MCP_SCOPES]);
        expect(renderedTicks()[WRITE_SCOPE]).toBe(false);
        expect(
            scopeBoxes()
                .filter((b) => b.checked)
                .map((b) => b.value),
        ).toEqual(READ_ONLY);
        w.unmount();
    });

    it('offers a scope this build has never heard of, but does not pre-tick it', async () => {
        // The allow-list fails CLOSED. A deny-list ("everything except the one
        // write scope we know about") would pre-tick `mcp:library:sync` the day
        // a newer hub advertised it, with nothing to notice.
        const { client } = makeClient({
            scopeSequence: [['mcp:servers:read', 'mcp:library:sync', WRITE_SCOPE]],
        });
        const w = await openForm(client);
        expect(renderedTicks()).toEqual({
            'mcp:servers:read': true,
            'mcp:library:sync': false,
            'mcp:playback:control': false,
        });
        w.unmount();
    });

    it('leaves nothing ticked when the hub offers only unknown scopes', async () => {
        // The empty intersection is left EMPTY rather than falling back to
        // "tick everything" — that fallback would pre-tick unknown capabilities
        // in exactly the case where this build understands them least.
        const { client, post } = makeClient({
            scopeSequence: [['mcp:library:sync', 'mcp:servers:manage']],
        });
        const w = await openForm(client);
        expect(scopeBoxes()).toHaveLength(2);
        expect(scopeBoxes().some((b) => b.checked)).toBe(false);
        expect(bodyText()).toContain('Select at least one scope');

        const create = document.body.querySelector('.mcp-tokens__create') as HTMLButtonElement;
        expect(create.disabled).toBe(true);
        rawClick(create);
        await flushPromises();
        expect(post).not.toHaveBeenCalled();
        w.unmount();
    });

    it('the read-only default is NOT re-seeded over a deliberate widening', async () => {
        // The user opts into the write scope, then something refetches the
        // list. A seed that ran again would silently revoke their choice — the
        // same stickiness bug as the narrowing case, pointed the other way.
        const { client } = makeClient({ scopeSequence: [FLAG_ON_SCOPES] });
        const w = await openForm(client);
        boxFor(WRITE_SCOPE).dispatchEvent(new Event('change', { bubbles: true }));
        await flushPromises();
        rawClick(btn('Cancel')!);
        await flushPromises();

        rawClick(btn('Revoke')!);
        await flushPromises();
        rawClick(btn('Revoke token')!);
        await flushPromises();

        rawClick(btn('New Token')!);
        await flushPromises();
        expect(boxFor(WRITE_SCOPE).checked).toBe(true);
        w.unmount();
    });
});

// ─────────────────────────────────────────────────────────────────────────────

describe('McpTokensPage — the show-once reveal', () => {
    async function mint(over: Overrides = {}) {
        const { client, get, post } = makeClient(over);
        const w = mountPage(client);
        await flushPromises();
        rawClick(btn('New Token')!);
        await flushPromises();
        rawClick(btn('Create token')!);
        await flushPromises();
        return { w, get, post };
    }

    it('shows the plaintext, the warning and a copy affordance', async () => {
        const { w } = await mint();
        const code = document.body.querySelector('[data-testid="mcp-token-plaintext"]');
        expect(code?.textContent).toBe(PLAINTEXT);
        expect(bodyText()).toContain('only time this token will ever be shown');
        expect(btn('Copy')).toBeTruthy();
        w.unmount();
    });

    it('copies the exact plaintext to the clipboard', async () => {
        const { w } = await mint();
        rawClick(btn('Copy')!);
        await flushPromises();
        expect(writeText).toHaveBeenCalledWith(PLAINTEXT);
        w.unmount();
    });

    it('has no ✕, and Escape / backdrop cannot close it even once acknowledged', async () => {
        // ⚠ The acknowledgement is ticked FIRST on purpose. With it unticked,
        // `closeReveal`'s own guard refuses every close, so `:dismissible="false"`
        // would be untestable — flipping it to `true` changed NOTHING and the
        // test still passed (measured: mutation M1 survived the first draft of
        // this test). Ticking the box empties the other guard's window, leaving
        // `dismissible` as the only thing that can still block Esc/backdrop.
        const { w } = await mint();
        const ack = document.body.querySelector(
            '[data-testid="mcp-token-ack"]',
        ) as HTMLInputElement;
        ack.checked = true;
        ack.dispatchEvent(new Event('change', { bubbles: true }));
        await flushPromises();

        const backdrop = document.body.querySelector('.phlix-modal') as HTMLElement;
        const panel = document.body.querySelector('.phlix-modal__panel') as HTMLElement;
        expect(panel.querySelector('.phlix-modal__close'), 'the reveal must have no ✕').toBeNull();

        // Capture-phase listener on document, so a bubbling keydown reaches it.
        panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await flushPromises();
        expect(bodyText()).toContain(PLAINTEXT);

        backdrop.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        await flushPromises();
        expect(bodyText()).toContain(PLAINTEXT);

        // Control: the dialog IS closable — so the two refusals above are the
        // dismissal paths being blocked, not "nothing can ever close this".
        rawClick(document.body.querySelector('.mcp-reveal__done') as HTMLButtonElement);
        await flushPromises();
        expect(bodyText()).not.toContain(PLAINTEXT);
        w.unmount();
    });

    it('will not close until the acknowledgement is ticked', async () => {
        const { w } = await mint();
        const done = document.body.querySelector('.mcp-reveal__done') as HTMLButtonElement;
        expect(done, 'the Done button must exist to dispatch at').toBeTruthy();
        expect(done.disabled).toBe(true);

        // Raw dispatch reaches the handler even on a disabled button, so this
        // exercises `closeReveal`'s own re-check rather than the attribute.
        rawClick(done);
        await flushPromises();
        expect(bodyText()).toContain(PLAINTEXT);
        w.unmount();
    });

    it('closes on Done once acknowledged, and the plaintext leaves the document', async () => {
        const { w } = await mint();
        const ack = document.body.querySelector(
            '[data-testid="mcp-token-ack"]',
        ) as HTMLInputElement;
        ack.checked = true;
        ack.dispatchEvent(new Event('change', { bubbles: true }));
        await flushPromises();

        const done = document.body.querySelector('.mcp-reveal__done') as HTMLButtonElement;
        expect(done.disabled).toBe(false);
        rawClick(done);
        await flushPromises();

        expect(bodyText()).not.toContain(PLAINTEXT);
        expect(document.body.querySelector('[data-testid="mcp-token-plaintext"]')).toBeNull();
        w.unmount();
    });

    it('is not re-fetchable: nothing the page can call brings the plaintext back', async () => {
        const { w, get } = await mint();
        const ack = document.body.querySelector(
            '[data-testid="mcp-token-ack"]',
        ) as HTMLInputElement;
        ack.checked = true;
        ack.dispatchEvent(new Event('change', { bubbles: true }));
        await flushPromises();
        rawClick(document.body.querySelector('.mcp-reveal__done') as HTMLButtonElement);
        await flushPromises();

        // Every list response the page has received — the mount load and the
        // post-mint refresh — and none of them carries a `token` field.
        const responses = await Promise.all(get.mock.results.map((r) => r.value));
        expect(responses.length).toBeGreaterThanOrEqual(2);
        for (const res of responses) {
            for (const row of (res as { tokens: Record<string, unknown>[] }).tokens) {
                expect('token' in row).toBe(false);
            }
        }

        // And a fresh mount — the only "reload" a user has — never shows it.
        w.unmount();
        document.body.innerHTML = '';
        const { client } = makeClient();
        const w2 = mountPage(client);
        await flushPromises();
        expect(bodyText()).not.toContain(PLAINTEXT);
        w2.unmount();
    });

    it('reveals the token even if the follow-up list refresh fails', async () => {
        // The plaintext is unrecoverable, so it must be on screen regardless of
        // what happens to the list behind it.
        let call = 0;
        const get = vi.fn(async () => {
            call += 1;
            if (call === 1) return { tokens: [], available_scopes: SCOPES };
            throw new Error('refresh exploded');
        });
        const post = vi.fn(async () => ({
            id: 'tok-new',
            token: PLAINTEXT,
            name: '',
            scopes: SCOPES,
            expires_at: 4070908800,
        }));
        const w = mountPage({ get, post, delete: vi.fn() } as unknown as ApiClient);
        await flushPromises();
        rawClick(btn('New Token')!);
        await flushPromises();
        rawClick(btn('Create token')!);
        await flushPromises();
        expect(bodyText()).toContain(PLAINTEXT);
        w.unmount();
    });

    it('surfaces a mint failure as a toast and reveals nothing', async () => {
        const { client } = makeClient();
        const failing = {
            ...client,
            post: vi.fn().mockRejectedValue(new Error('mint refused')),
        } as unknown as ApiClient;
        const w = mountPage(failing);
        await flushPromises();
        rawClick(btn('New Token')!);
        await flushPromises();
        rawClick(btn('Create token')!);
        await flushPromises();
        const toasts = useToastStore();
        expect(toasts.toasts.some((t) => t.message === 'mint refused')).toBe(true);
        expect(document.body.querySelector('[data-testid="mcp-token-plaintext"]')).toBeNull();
        w.unmount();
    });
});

// ─────────────────────────────────────────────────────────────────────────────

describe('McpTokensPage — revoke is behind a confirm', () => {
    it('a Revoke click only opens the dialog; it does not call the API', async () => {
        const { client, del } = makeClient();
        const w = mountPage(client);
        await flushPromises();
        rawClick(btn('Revoke')!);
        await flushPromises();
        expect(del).not.toHaveBeenCalled();
        expect(bodyText()).toContain('Revoke this token?');
        expect(bodyText()).toContain('Claude Desktop');
        w.unmount();
    });

    it('Cancel closes the dialog without revoking', async () => {
        const { client, del } = makeClient();
        const w = mountPage(client);
        await flushPromises();
        rawClick(btn('Revoke')!);
        await flushPromises();
        rawClick(btn('Cancel')!);
        await flushPromises();
        expect(del).not.toHaveBeenCalled();
        expect(bodyText()).not.toContain('Revoke this token?');
        w.unmount();
    });

    it('confirming deletes that id and refetches the list', async () => {
        const { client, del, get } = makeClient();
        const w = mountPage(client);
        await flushPromises();
        expect(get).toHaveBeenCalledTimes(1);
        rawClick(btn('Revoke')!);
        await flushPromises();
        rawClick(btn('Revoke token')!);
        await flushPromises();
        expect(del).toHaveBeenCalledWith('/api/v1/me/mcp-tokens/tok-1');
        expect(get).toHaveBeenCalledTimes(2);
        w.unmount();
    });

    it('toasts and keeps the row when the revoke fails', async () => {
        const { client } = makeClient();
        const failing = {
            ...client,
            delete: vi.fn().mockRejectedValue(new Error('revoke refused')),
        } as unknown as ApiClient;
        const w = mountPage(failing);
        await flushPromises();
        rawClick(btn('Revoke')!);
        await flushPromises();
        rawClick(btn('Revoke token')!);
        await flushPromises();
        const toasts = useToastStore();
        expect(toasts.toasts.some((t) => t.message === 'revoke refused')).toBe(true);
        expect(w.text()).toContain('Claude Desktop');
        w.unmount();
    });
});
