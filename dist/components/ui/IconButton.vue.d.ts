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
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    type: "button" | "submit" | "reset";
    loading: boolean;
    disabled: boolean;
    size: "sm" | "md" | "lg";
    variant: "solid" | "ghost" | "outline" | "subtle";
    pressed: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
