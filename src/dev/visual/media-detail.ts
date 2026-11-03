/**
 * Visual-harness entry mounting the media-detail screen for the playwright visual suite.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { mountVisual } from './harness';
import DetailHarness from './DetailHarness.vue';

mountVisual(DetailHarness);
