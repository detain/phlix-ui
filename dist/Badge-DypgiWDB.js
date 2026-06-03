import { l as e, u as t } from "./Button-DFtuAYup.js";
import { createBlock as n, createCommentVNode as r, createElementBlock as i, defineComponent as a, normalizeClass as o, openBlock as s, renderSlot as c } from "vue";
//#region src/components/ui/Badge.vue?vue&type=script&setup=true&lang.ts
var l = ["role", "aria-label"], u = /*#__PURE__*/ t(/* @__PURE__ */ a({
	__name: "Badge",
	props: {
		tone: { default: "neutral" },
		size: { default: "sm" },
		mono: {
			type: Boolean,
			default: !1
		},
		icon: {},
		label: {}
	},
	setup(t) {
		return (a, u) => (s(), i("span", {
			class: o(["phlix-badge", [
				`phlix-badge--${t.tone}`,
				`phlix-badge--${t.size}`,
				{ "phlix-badge--mono": t.mono }
			]]),
			role: t.label ? "img" : void 0,
			"aria-label": t.label
		}, [t.icon ? (s(), n(e, {
			key: 0,
			name: t.icon,
			class: "phlix-badge__icon"
		}, null, 8, ["name"])) : r("", !0), c(a.$slots, "default", {}, void 0, !0)], 10, l));
	}
}), [["__scopeId", "data-v-8f8d0fd2"]]);
//#endregion
export { u as t };

//# sourceMappingURL=Badge-DypgiWDB.js.map