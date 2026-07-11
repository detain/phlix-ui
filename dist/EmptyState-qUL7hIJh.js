import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-C0x49DFi.js";
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
}, g = /*#__PURE__*/ e(/* @__PURE__ */ s({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (s, g) => (c(), r("div", d, [
			i("span", f, [o(t, { name: e.icon }, null, 8, ["name"])]),
			i("h3", p, u(e.title), 1),
			e.description || s.$slots.default ? (c(), r("p", m, [l(s.$slots, "default", {}, () => [a(u(e.description), 1)], !0)])) : n("", !0),
			s.$slots.actions ? (c(), r("div", h, [l(s.$slots, "actions", {}, void 0, !0)])) : n("", !0)
		]));
	}
}), [["__scopeId", "data-v-1790dcf5"]]);
//#endregion
export { g as t };

//# sourceMappingURL=EmptyState-qUL7hIJh.js.map