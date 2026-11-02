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
declare const __VLS_template: () => {
    __VLS_Slots: {
        default?: (props: {}) => any;
    } & {
        actions?: (props: {}) => any;
    };
};
type __VLS_Slots = ReturnType<typeof __VLS_template>['__VLS_Slots'];
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    icon: "search" | "repeat" | "sort" | "filter" | "menu" | "table" | "video" | "image" | "play" | "pause" | "skip-back" | "skip-forward" | "rewind" | "forward" | "volume" | "volume-low" | "mute" | "shuffle" | "repeat-1" | "list-music" | "captions" | "captions-off" | "pip" | "theater" | "fullscreen" | "fullscreen-exit" | "expand" | "cast" | "settings" | "speed" | "film" | "music" | "tv" | "book" | "headphones" | "disc" | "mic" | "calendar" | "star" | "list" | "grid" | "backdrop" | "plus" | "info" | "x" | "check" | "lock" | "bookmark" | "bookmark-plus" | "heart" | "thumbs-up" | "thumbs-down" | "user" | "users" | "log-out" | "more" | "eye" | "eye-off" | "refresh" | "key" | "trash" | "arrow-left" | "arrow-right" | "arrow-up" | "arrow-down" | "chevron-down" | "chevron-up" | "chevron-left" | "chevron-right" | "chevrons-left" | "chevrons-right" | "spinner" | "alert" | "alert-circle" | "success" | "error" | "sun" | "moon" | "monitor" | "external-link";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
