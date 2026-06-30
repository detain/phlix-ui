export interface MenuItem {
    label: string;
    disabled?: boolean;
    danger?: boolean;
    onClick?: () => void;
}
type __VLS_Props = {
    items: readonly MenuItem[];
    open?: boolean;
};
declare function openMenu(): void;
declare function toggleMenu(): void;
declare var __VLS_1: {
    open: boolean;
    toggle: typeof toggleMenu;
    openMenu: typeof openMenu;
}, __VLS_15: {
    item: MenuItem;
    index: number;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    item?: (props: typeof __VLS_15) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    select: (item: MenuItem, index: number) => any;
    "update:open": (v: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSelect?: ((item: MenuItem, index: number) => any) | undefined;
    "onUpdate:open"?: ((v: boolean) => any) | undefined;
}>, {
    open: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
