import { type HelpLink } from './HelpText.vue';
type __VLS_Props = {
    /** The help text to display inside the popover. */
    helpText: string;
    /** Optional reference links shown below the help text. */
    helpLinks?: readonly HelpLink[];
    /** Optional label for the popover header. */
    title?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    title: string;
    helpLinks: readonly HelpLink[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
