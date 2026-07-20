import { type HelpLink } from './HelpText.vue';
type __VLS_Props = {
    /** The help text to display inside the popover. */
    helpText: string;
    /** Optional reference links shown below the help text. */
    helpLinks?: readonly HelpLink[];
    /** Optional label for the popover header. */
    title?: string;
    /**
     * Name of the field this help belongs to. Used to build a distinct
     * accessible name for the trigger ("Help for Discovery port") so a screen
     * reader user on a tab with a dozen fields can tell the (?) buttons apart.
     */
    fieldLabel?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    title: string;
    helpLinks: readonly HelpLink[];
    fieldLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
