import { d as e, u as t } from "./Button-C4PyCjLX.js";
import { Fragment as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, normalizeClass as l, normalizeStyle as u, openBlock as d, renderList as f, renderSlot as p, toDisplayString as m } from "vue";
//#region src/components/ui/Skeleton.vue?vue&type=script&setup=true&lang.ts
var h = {
	key: 0,
	class: "phlix-skel-text",
	"aria-hidden": "true"
}, g = /*#__PURE__*/ e(/* @__PURE__ */ c({
	__name: "Skeleton",
	props: {
		variant: { default: "rect" },
		width: {},
		height: {},
		radius: {},
		lines: { default: 1 }
	},
	setup(e) {
		return (t, r) => e.variant === "text" ? (d(), i("div", h, [(d(!0), i(n, null, f(e.lines, (t) => (d(), i("span", {
			key: t,
			class: "phlix-skel phlix-skel--text",
			style: u({ width: t === e.lines && e.lines > 1 ? "60%" : e.width })
		}, null, 4))), 128))])) : (d(), i("span", {
			key: 1,
			class: l(["phlix-skel", `phlix-skel--${e.variant}`]),
			"aria-hidden": "true",
			style: u({
				width: e.width,
				height: e.height,
				borderRadius: e.radius
			})
		}, null, 6));
	}
}), [["__scopeId", "data-v-c34e4066"]]), _ = {
	class: "phlix-empty",
	role: "status"
}, v = { class: "phlix-empty__icon" }, y = { class: "phlix-empty__title" }, b = {
	key: 0,
	class: "phlix-empty__desc"
}, x = {
	key: 1,
	class: "phlix-empty__actions"
}, S = /*#__PURE__*/ e(/* @__PURE__ */ c({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (n, c) => (d(), i("div", _, [
			a("span", v, [s(t, { name: e.icon }, null, 8, ["name"])]),
			a("h3", y, m(e.title), 1),
			e.description || n.$slots.default ? (d(), i("p", b, [p(n.$slots, "default", {}, () => [o(m(e.description), 1)], !0)])) : r("", !0),
			n.$slots.actions ? (d(), i("div", x, [p(n.$slots, "actions", {}, void 0, !0)])) : r("", !0)
		]));
	}
}), [["__scopeId", "data-v-9c6d2458"]]);
//#endregion
export { g as n, S as t };

//# sourceMappingURL=EmptyState-BEMIpc2l.js.map