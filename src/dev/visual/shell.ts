/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { mountVisual } from './harness';
import ShellHarness from './ShellHarness.vue';

mountVisual(ShellHarness, {
  setup() {
    // Signed-in shell: a token makes UserMenu render the avatar. mountVisual clears
    // localStorage first, so this is the only auth state present.
    if (typeof localStorage !== 'undefined') localStorage.setItem('access_token', 'demo-token');
  },
});
