/**
 * PageTransition (R0.5) — route-level crossfade / slide. Wrap the routed
 * component:
 *
 *   <router-view v-slot="{ Component }">
 *     <PageTransition><component :is="Component" /></PageTransition>
 *   </router-view>
 *
 * mode: fade (default) | slide. `out-in` so the leaving view finishes first.
 * Fully disabled under prefers-reduced-motion.
 *
 * Contract: exactly ONE child (Vue <Transition> requirement) — the routed
 * component must have a single root, or Vue warns and the transition breaks.
 */
type __VLS_Props = {
    mode?: 'fade' | 'slide';
};
declare var __VLS_5: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    mode: "fade" | "slide";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
