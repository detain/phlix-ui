/**
 * Visual-harness entry mounting the player for the playwright visual suite.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { mountVisual } from './harness';
import PlayerHarness from './PlayerHarness.vue';

mountVisual(PlayerHarness);
