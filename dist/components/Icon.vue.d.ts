import { type IconName } from './icon-registry';
export type { IconName };
type __VLS_Props = {
    /** Icon name from the Lucide registry. */
    name: IconName;
    /** Optional CSS length (number → px). Omit to inherit 1em of the text. */
    size?: number | string;
    /** Accessible label. When set the icon is exposed as role="img"; otherwise it is aria-hidden. */
    label?: string;
    /** Stroke width override (Lucide default 2). */
    strokeWidth?: number | string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    label: string;
    size: number | string;
    strokeWidth: number | string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
