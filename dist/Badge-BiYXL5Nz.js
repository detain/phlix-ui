import { h as e, m as t } from "./Button-C86XulWV.js";
import { createBlock as n, createCommentVNode as r, createElementBlock as i, defineComponent as a, normalizeClass as o, openBlock as s, renderSlot as c } from "vue";
//#region src/components/ui/Badge.vue?vue&type=script&setup=true&lang.ts
var l = ["role", "aria-label"], u = /*#__PURE__*/ e(/* @__PURE__ */ a({
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
	setup(e) {
		return (a, u) => (s(), i("span", {
			class: o(["phlix-badge", [
				`phlix-badge--${e.tone}`,
				`phlix-badge--${e.size}`,
				{ "phlix-badge--mono": e.mono }
			]]),
			role: e.label ? "img" : void 0,
			"aria-label": e.label
		}, [e.icon ? (s(), n(t, {
			key: 0,
			name: e.icon,
			class: "phlix-badge__icon"
		}, null, 8, ["name"])) : r("", !0), c(a.$slots, "default", {}, void 0, !0)], 10, l));
	}
}), [["__scopeId", "data-v-8f8d0fd2"]]);
//#endregion
export { u as t };

//# sourceMappingURL=Badge-BiYXL5Nz.js.map