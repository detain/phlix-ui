import { type App as VueApp } from 'vue';
import type { PhlixAppConfig } from './types';
declare global {
    interface Window {
        __PHLIX__?: PhlixAppConfig;
    }
}
export declare function createPhlixApp(config?: Partial<PhlixAppConfig>): VueApp;
