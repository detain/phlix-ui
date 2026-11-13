export interface MenuItem {
    /** Stable dispatch id — consumers switch on this, never on the (translated) label. */
    key?: string;
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
declare const __VLS_template: () => {
    __VLS_Slots: {
        default?: (props: {
            open: boolean;
            toggle: typeof toggleMenu;
            openMenu: typeof openMenu;
        }) => any;
    } & {
        item?: (props: {
            item: MenuItem;
            index: number;
        }) => any;
    };
};
type __VLS_Slots = ReturnType<typeof __VLS_template>['__VLS_Slots'];
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
