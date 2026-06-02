/**
 * EmptyState (R0.4e) — empty / error / no-results surface. icon + title +
 * description (prop or default slot) + optional #actions slot.
 */
import { type IconName } from '../Icon.vue';
type __VLS_Props = {
    icon?: IconName;
    title: string;
    description?: string;
};
declare var __VLS_4: {}, __VLS_6: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_4) => any;
} & {
    actions?: (props: typeof __VLS_6) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    icon: IconName;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
