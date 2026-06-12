/**
 * Chip — compact toggle / filter pill (R0.4b).
 *
 * Two roles, composable:
 *  · Toggle (rating filters): pass `:selected` → exposes aria-pressed, click emits
 *    `update:selected`.   <Chip :selected="on" @update:selected="on=$event">R</Chip>
 *  · Removable (active-filter pills): pass `removable` → trailing ✕ emits `remove`.
 *    <Chip removable @remove="drop">Sci-Fi</Chip>
 * Optional leading icon. Keyboard-operable, :focus-visible, reduced-motion aware.
 */
import { type IconName } from '../Icon.vue';
type __VLS_Props = {
    /** When defined the chip is a toggle and reflects aria-pressed. */
    selected?: boolean;
    removable?: boolean;
    icon?: IconName;
    size?: 'sm' | 'md';
    disabled?: boolean;
    /** aria-label for the remove button; defaults to "Remove". */
    removeLabel?: string;
};
declare var __VLS_6: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: () => any;
    remove: () => any;
    "update:selected": (v: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: (() => any) | undefined;
    onRemove?: (() => any) | undefined;
    "onUpdate:selected"?: ((v: boolean) => any) | undefined;
}>, {
    size: "sm" | "md";
    disabled: boolean;
    selected: boolean;
    removable: boolean;
    removeLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
