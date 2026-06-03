import { l as e, u as t } from "./Button-DFtuAYup.js";
import { createCommentVNode as n, createElementBlock as r, createElementVNode as i, createTextVNode as a, createVNode as o, defineComponent as s, openBlock as c, renderSlot as l, toDisplayString as u } from "vue";
//#region src/components/ui/EmptyState.vue?vue&type=script&setup=true&lang.ts
var d = {
	class: "phlix-empty",
	role: "status"
}, f = { class: "phlix-empty__icon" }, p = { class: "phlix-empty__title" }, m = {
	key: 0,
	class: "phlix-empty__desc"
}, h = {
	key: 1,
	class: "phlix-empty__actions"
}, g = /*#__PURE__*/ t(/* @__PURE__ */ s({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(t) {
		return (s, g) => (c(), r("div", d, [
			i("span", f, [o(e, { name: t.icon }, null, 8, ["name"])]),
			i("h3", p, u(t.title), 1),
			t.description || s.$slots.default ? (c(), r("p", m, [l(s.$slots, "default", {}, () => [a(u(t.description), 1)], !0)])) : n("", !0),
			s.$slots.actions ? (c(), r("div", h, [l(s.$slots, "actions", {}, void 0, !0)])) : n("", !0)
		]));
	}
}), [["__scopeId", "data-v-9c6d2458"]]);
//#endregion
export { g as t };

//# sourceMappingURL=EmptyState-DPlVvQLn.js.map