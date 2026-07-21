/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * Per-page help content for the user-facing HUB management pages
 * (plan_settings.md Phase 9 extension).
 *
 * These are the pages a signed-in user reaches to manage their own servers,
 * shares, invites and requests through the hub — NOT the admin section. They
 * live in `src/pages/*.vue` and are routed by the consuming web-ui trees
 * (`phlix-hub/web-ui/src/main.ts`, `phlix-server/web-ui/src/main.ts`), not by
 * this library's `src/app/admin.ts`. That is why they have their own corpus and
 * their own guard (`hubHelpLinks.test.ts`) rather than joining the admin
 * `helpLinks.ts` map, whose test walks the admin route table.
 *
 * ## Rules for editing (identical spirit to the admin corpus)
 *
 * - **Only link to pages that exist.** Every URL here was probed and returned
 *   200 against the live docs site, with deliberately-fake siblings probed
 *   alongside (they 404) to prove the check discriminates. Do not add a
 *   plausible-looking URL without probing it.
 * - **Do not invent a link to fill a slot.** Federation has NO user-facing
 *   documentation page — the only coverage is the operator-facing
 *   `hub-admin/federation-policy`, which documents master/leaf topology and
 *   migration internals, not how a user shares a library. Those pages get
 *   `links: []` and lean on `details`, exactly as Cast Devices does in the
 *   admin corpus.
 * - **`details` is rendered as plain text** by `PageHint` (`{{ }}`
 *   interpolation), so markup shows up literally.
 * - **Only claim what is true.** Every sentence below was checked against the
 *   SPA source or the hub controller it calls. Where a page has a known defect
 *   the fix is not part of this pass, the text does not pretend otherwise.
 */
/** A single external documentation link, matching `PageHint`'s `links` prop. */
export interface HubHelpLink {
    /** Visible link text. Mirrors the docs sidebar label. */
    text: string;
    /** Absolute URL. Always under {@link DOCS_BASE}. */
    url: string;
}
/** The help payload for one hub page. */
export interface HubPageHelp {
    /** Documentation links rendered as a row beneath the hint body. May be empty. */
    links: HubHelpLink[];
    /** Longer explanation shown behind the "Learn more" disclosure. */
    details: string;
}
/** Base URL of the published documentation site (VitePress, GitHub Pages). */
export declare const DOCS_BASE = "https://detain.github.io/phlix-docs";
/**
 * Help content keyed by page. Keys are the lowercase-kebab short name of the
 * page (the route `name` in the web-ui trees), so `MyServersPage` → `my-servers`.
 *
 * `federation` and `federation-shares` carry `links: []` deliberately — no
 * user-facing federation documentation exists. The exclusion is pinned by a
 * test so a future pass does not fill the slot with the operator-facing policy
 * page.
 */
export declare const hubPageHelp: Record<string, HubPageHelp>;
