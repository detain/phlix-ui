/**
 * Visual-harness entry mounting the auth screens for the playwright visual suite.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { mountVisual } from './harness';
import AuthHarness from './AuthHarness.vue';

mountVisual(AuthHarness);
