/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * Per-page help content for the admin section (plan_settings.md Phase 9).
 *
 * Every admin page carries a `PageHint` describing what the page does. This
 * module supplies the two slots that were previously unused everywhere: the
 * `links` row of documentation links, and the collapsible `details` panel.
 *
 * ## Why this is a module and not inline in each page
 *
 * The plan records "no owner for the 80+ help links going stale" as an
 * unaddressed gap, and two in-tree Trakt links had already 404'd by the time it
 * was written. Centralising the URLs gives them exactly one owner and makes them
 * mechanically checkable — `helpLinks.test.ts` asserts that every routed admin
 * page has an entry, that every entry is actually rendered by its page, and
 * (opt-in, networked) that every URL still resolves.
 *
 * ## Rules for editing
 *
 * - **Only link to pages that exist.** Every URL here was verified to return 200
 *   against the live docs site, with a deliberately-fake URL checked alongside to
 *   confirm the check discriminates (it 404s). Adding a plausible-looking URL
 *   without probing it is how the four non-existent Wikipedia articles nearly
 *   shipped.
 * - **Do not invent a link to fill a slot.** A page with no genuinely relevant
 *   documentation gets `links: []` and leans on `details` instead. Cast Devices
 *   is the live example.
 * - **`details` is rendered as plain text**, not HTML — `PageHint` interpolates
 *   it with `{{ }}`. Markup will show up literally.
 * - **Only claim what is true.** Everything asserted in `details` below was
 *   checked against the server or SPA source; where a feature is known to be
 *   incomplete (DLNA playback), the text says so rather than implying it works.
 */
/** A single external documentation link, matching `PageHint`'s `links` prop. */
export interface HelpLink {
    /** Visible link text. Mirrors the docs sidebar label so the two stay consistent. */
    text: string;
    /** Absolute URL. Always under {@link DOCS_BASE}. */
    url: string;
}
/** The help payload for one admin page. */
export interface PageHelp {
    /** Documentation links rendered as a row beneath the hint body. May be empty. */
    links: HelpLink[];
    /** Longer explanation shown behind the "Learn more" disclosure. */
    details: string;
}
/** Base URL of the published documentation site (VitePress, GitHub Pages). */
export declare const DOCS_BASE = "https://detain.github.io/phlix-docs";
/**
 * Help content keyed by admin page. Keys match the `admin-*` route names in
 * `src/app/admin.ts` with the `admin-` prefix dropped.
 *
 * `admin-webhook-logs` is deliberately absent: `WebhookLogsPage.vue` is routed by
 * nothing (its only reference in `src/` is its own docblock) and all three of its
 * API calls target endpoints the server does not implement, so giving it help
 * text would document a page no one can reach.
 */
export declare const adminPageHelp: {
    dashboard: {
        links: HelpLink[];
        details: string;
    };
    metrics: {
        links: HelpLink[];
        details: string;
    };
    users: {
        links: HelpLink[];
        details: string;
    };
    logs: {
        links: HelpLink[];
        details: string;
    };
    webhooks: {
        links: HelpLink[];
        details: string;
    };
    services: {
        links: HelpLink[];
        details: string;
    };
    integrations: {
        links: HelpLink[];
        details: string;
    };
    backup: {
        links: HelpLink[];
        details: string;
    };
    cast: {
        links: never[];
        details: string;
    };
    dlna: {
        links: HelpLink[];
        details: string;
    };
    'remote-access': {
        links: HelpLink[];
        details: string;
    };
    livetv: {
        links: HelpLink[];
        details: string;
    };
    collections: {
        links: HelpLink[];
        details: string;
    };
    history: {
        links: HelpLink[];
        details: string;
    };
    syncplay: {
        links: HelpLink[];
        details: string;
    };
    libraries: {
        links: HelpLink[];
        details: string;
    };
    duplicates: {
        links: HelpLink[];
        details: string;
    };
    plugins: {
        links: HelpLink[];
        details: string;
    };
    transcoding: {
        links: HelpLink[];
        details: string;
    };
    settings: {
        links: HelpLink[];
        details: string;
    };
    requests: {
        links: HelpLink[];
        details: string;
    };
    'hub-dashboard': {
        links: HelpLink[];
        details: string;
    };
};
/** Route-name suffixes covered by {@link adminPageHelp}. */
export type AdminHelpKey = keyof typeof adminPageHelp;
