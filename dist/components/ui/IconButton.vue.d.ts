import { type IconName } from '../Icon.vue';
type __VLS_Props = {
    name: IconName;
    label: string;
    variant?: 'solid' | 'ghost' | 'outline' | 'subtle';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    disabled?: boolean;
    /** Toggle state — when defined, exposes aria-pressed. */
    pressed?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    size: "sm" | "md" | "lg";
    type: "button" | "submit" | "reset";
    variant: "solid" | "ghost" | "outline" | "subtle";
    loading: boolean;
    disabled: boolean;
    pressed: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
