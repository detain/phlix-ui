/**
 * useSettingsPrefs — persists the user’s Advanced settings-mode preference.
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
export declare const useSettingsPrefsStore: import("pinia").SetupStoreDefinition<"phlix-settings-prefs", {
    advancedMode: import("vue").Ref<boolean, boolean>;
    setAdvancedMode: (value: boolean) => void;
    toggleAdvancedMode: () => void;
}>;
