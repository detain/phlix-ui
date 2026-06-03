import { type App as VueApp } from 'vue';
import { type RouteRecordRaw } from 'vue-router';
import type { PhlixAppConfig } from './types';
declare global {
    interface Window {
        __PHLIX__?: PhlixAppConfig;
    }
}
/**
 * Build the router route table from config. Exported from this module (but NOT
 * re-exported by `index.ts`, so it stays out of the public package API) so R6.1a
 * tests can assert the built-in pages are lazy `() => import()` route chunks.
 */
export declare function buildRoutes(config: PhlixAppConfig): RouteRecordRaw[];
export declare function createPhlixApp(config?: Partial<PhlixAppConfig>): VueApp;
