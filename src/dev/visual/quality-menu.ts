/**
 * Visual-harness entry mounting the quality menu for the playwright visual suite.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { mountVisual } from './harness';
import QualityMenuHarness from './QualityMenuHarness.vue';

mountVisual(QualityMenuHarness);
