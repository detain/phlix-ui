import { f as e, p as t } from "./tokenStore-qhLkSDAW.js";
import { createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, normalizeClass as l, openBlock as u, renderSlot as d, toDisplayString as f } from "vue";
//#region src/components/ui/EmptyState.vue?vue&type=script&setup=true&lang.ts
var p = {
	class: "phlix-empty",
	role: "status"
}, m = { class: "phlix-empty__icon" }, h = { class: "phlix-empty__title" }, g = {
	key: 0,
	class: "phlix-empty__desc"
}, _ = {
	key: 1,
	class: "phlix-empty__actions"
}, v = /*#__PURE__*/ t(/* @__PURE__ */ c({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(t) {
		return (n, c) => (u(), i("div", p, [
			a("span", m, [s(e, { name: t.icon }, null, 8, ["name"])]),
			a("h3", h, f(t.title), 1),
			t.description || n.$slots.default ? (u(), i("p", g, [d(n.$slots, "default", {}, () => [o(f(t.description), 1)], !0)])) : r("", !0),
			n.$slots.actions ? (u(), i("div", _, [d(n.$slots, "actions", {}, void 0, !0)])) : r("", !0)
		]));
	}
}), [["__scopeId", "data-v-9c6d2458"]]), y = ["role", "aria-label"], b = /*#__PURE__*/ t(/* @__PURE__ */ c({
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
		return (a, o) => (u(), i("span", {
			class: l(["phlix-badge", [
				`phlix-badge--${t.tone}`,
				`phlix-badge--${t.size}`,
				{ "phlix-badge--mono": t.mono }
			]]),
			role: t.label ? "img" : void 0,
			"aria-label": t.label
		}, [t.icon ? (u(), n(e, {
			key: 0,
			name: t.icon,
			class: "phlix-badge__icon"
		}, null, 8, ["name"])) : r("", !0), d(a.$slots, "default", {}, void 0, !0)], 10, y));
	}
}), [["__scopeId", "data-v-8f8d0fd2"]]);
//#endregion
export { v as n, b as t };

//# sourceMappingURL=Badge-dkNW5XAf.js.map