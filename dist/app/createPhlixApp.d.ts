import { type App as VueApp } from 'vue';
import { type RouteRecordRaw, type RouteLocationNormalized, type RouteLocationRaw } from 'vue-router';
import type { PhlixAppConfig } from './types';
/**
 * Route names reachable WITHOUT authentication. Everything else is gated by
 * {@link authGuard} — an unauthenticated visit redirects to `login`. A consumer
 * route can also opt out by setting `meta: { public: true }`.
 */
export declare const PUBLIC_ROUTE_NAMES: readonly string[];
/**
 * Navigation guard: send unauthenticated users to the login page for any
 * non-public route. Pure (the auth state is passed in) so it unit-tests without
 * a live router/store. Returns `true` to allow, or a redirect location.
 */
export declare function authGuard(to: RouteLocationNormalized, isLoggedIn: boolean): true | RouteLocationRaw;
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
