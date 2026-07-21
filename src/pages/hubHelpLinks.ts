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
export const DOCS_BASE = 'https://detain.github.io/phlix-docs';

/**
 * Build a docs link. The `.html` suffix is required — VitePress emits one file
 * per page and the site is served without a rewrite for extensionless paths.
 */
const doc = (path: string, text: string): HubHelpLink => ({ text, url: `${DOCS_BASE}/${path}.html` });

/**
 * Help content keyed by page. Keys are the lowercase-kebab short name of the
 * page (the route `name` in the web-ui trees), so `MyServersPage` → `my-servers`.
 *
 * `federation` and `federation-shares` carry `links: []` deliberately — no
 * user-facing federation documentation exists. The exclusion is pinned by a
 * test so a future pass does not fill the slot with the operator-facing policy
 * page.
 */
export const hubPageHelp: Record<string, HubPageHelp> = {
  'my-servers': {
    links: [
      doc('hub/what-is-the-hub', 'What is the hub?'),
      doc('hub/claim-server', 'Claiming a server'),
    ],
    details:
      'These are the Phlix servers you have claimed to your hub account. Claiming a ' +
      'server links it to you so you can reach it from anywhere without knowing its ' +
      'address. A server shows Online when the hub has heard from it recently, ' +
      'Connecting while a relay tunnel is still being set up, and Offline when it has ' +
      'gone quiet. Browse opens the library and is only available once the relay is ' +
      'active; Manage opens the server’s own admin page directly; Remove unlinks ' +
      'the server from your account without deleting anything on the server itself.',
  },
  'server-detail': {
    links: [doc('hub/server-detail', 'Server details')],
    details:
      'A single server’s status in detail. Server Info shows its version, whether ' +
      'it is currently reachable, its last heartbeat, and the hostnames and subdomain ' +
      'the hub knows it by. Relay Session appears when a tunnel is open and reports the ' +
      'worker node handling it and the bytes carried. TLS Status appears once the ' +
      'server has a fully-qualified name with a certificate. Heartbeat History is the ' +
      'recent record of check-ins the hub uses to decide whether the server is online.',
  },
  federation: {
    // No user-facing federation doc exists; hub-admin/federation-policy is
    // operator-level (topology, ports, migrations). An invented link is worse
    // than none. Pinned by hubHelpLinks.test.ts.
    links: [],
    details:
      'Federation links whole Phlix servers together as peers so their libraries can ' +
      'be shared across the group, rather than sharing library-by-library with ' +
      'individual people. Adding a peer needs that server’s address and public ' +
      'key, which its operator supplies. This is an administrator feature: the hub ' +
      'restricts these actions to admins, so if you are not an administrator the page ' +
      'will only show a load error. There is no user guide for federation yet, which is ' +
      'why there is no documentation link here.',
  },
  'federation-shares': {
    links: [],
    details:
      'The library shares that flow between federated servers. The Incoming tab lists ' +
      'libraries other peers have offered to this server, which you can Accept or ' +
      'Reject while they are pending. The Outgoing tab lists libraries this server has ' +
      'offered to its peers. Like the Federation page, this is an administrator ' +
      'feature and non-administrators will see only a load error. Federation shares are ' +
      'distinct from the personal library shares on the Manage Shares page, which are ' +
      'between people rather than between servers.',
  },
  'manage-shares': {
    links: [
      doc('hub/library-sharing', 'Library sharing'),
      doc('hub/share-with-friends', 'Sharing with friends'),
    ],
    details:
      'The libraries you have shared with other people. Each row shows who you shared ' +
      'with, the permission level they were granted, and an expiry date if you set one ' +
      '— an expired share is marked and no longer grants access. Revoke ends a ' +
      'share immediately. This is the granting side of sharing; the libraries other ' +
      'people have shared with you appear under Shared With Me.',
  },
  'shared-with-me': {
    links: [
      doc('hub/library-sharing', 'Library sharing'),
      doc('hub/share-with-friends', 'Sharing with friends'),
    ],
    details:
      'The libraries other people have shared with you. Each card shows the owner, the ' +
      'server the library lives on, and the permission level you were given — ' +
      'read-only, or read and write. Only shares that are currently active are listed; ' +
      'if an owner revokes a share it simply stops appearing here. This is the ' +
      'receiving side of sharing; the libraries you have shared with others appear ' +
      'under Manage Shares.',
  },
  'invite-links': {
    links: [doc('hub/invite-links', 'Invite links')],
    details:
      'Invite links let you give someone access to a library on one of your servers by ' +
      'sending them a URL, without them needing an account beforehand. New Invite ' +
      'creates a link scoped to a server and optionally a single library and permission ' +
      'level; you can cap how many times it may be used and when it expires. The list ' +
      'shows each link’s usage against its limit; Copy URL copies it to send, and ' +
      'Revoke disables it. A revoked or fully-used link stops working immediately.',
  },
  requests: {
    links: [
      doc('hub/requests', 'Media requests'),
      doc('reference/api/hub-media-requests', 'Requests API reference'),
    ],
    details:
      'Requests let you ask a server owner to add a specific movie or show. New Request ' +
      'takes the title and its TMDB id — and, for a series, an optional season and ' +
      'episode. A request moves from Pending to Approved or Rejected as the owner acts ' +
      'on it; a rejected request shows the reason. Delete withdraws a request you no ' +
      'longer want. Requesting something does not download it — it flags it for ' +
      'the owner to decide.',
  },
};
