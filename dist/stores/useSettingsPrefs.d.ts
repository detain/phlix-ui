/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
export interface SettingsPrefsState {
    advancedMode: boolean;
}
/**
 * useSettingsPrefs — tiny store for persisting the user's Advanced mode preference.
 */
export declare const useSettingsPrefsStore: import("pinia").StoreDefinition<"phlix-settings-prefs", Pick<{
    advancedMode: import("vue").Ref<boolean, boolean>;
    setAdvancedMode: (value: boolean) => void;
    toggleAdvancedMode: () => void;
}, "advancedMode">, Pick<{
    advancedMode: import("vue").Ref<boolean, boolean>;
    setAdvancedMode: (value: boolean) => void;
    toggleAdvancedMode: () => void;
}, never>, Pick<{
    advancedMode: import("vue").Ref<boolean, boolean>;
    setAdvancedMode: (value: boolean) => void;
    toggleAdvancedMode: () => void;
}, "setAdvancedMode" | "toggleAdvancedMode">>;
