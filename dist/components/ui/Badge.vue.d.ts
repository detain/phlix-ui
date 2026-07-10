/**
 * Badge — small status / metadata label (R0.4a).
 *
 * Tones: neutral · accent · success · warning · error · info.
 * `mono` renders the label in tabular JetBrains Mono (e.g. "4K · HDR", counts).
 * Decorative by default; pass `label` for an accessible name when the badge is
 * the only conveyor of meaning. Optional leading icon.
 */
import { type IconName } from '../Icon.vue';
type __VLS_Props = {
    tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md';
    mono?: boolean;
    icon?: IconName;
    label?: string;
};
declare var __VLS_6: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    size: "sm" | "md";
    tone: "neutral" | "accent" | "success" | "warning" | "error" | "info";
    mono: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
