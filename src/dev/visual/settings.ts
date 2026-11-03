/**
 * Visual-harness entry mounting the settings screens for the playwright visual suite.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { mountVisual } from './harness';
import SettingsHarness from './SettingsHarness.vue';

mountVisual(SettingsHarness);
