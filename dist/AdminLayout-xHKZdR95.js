import { n as e, t } from "./Icon-24ngwBUH.js";
import { Fragment as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createVNode as c, defineComponent as l, openBlock as u, renderList as d, toDisplayString as f, unref as p, withCtx as m } from "vue";
import { RouterLink as h, RouterView as g } from "vue-router";
//#region src/app/AdminLayout.vue?vue&type=script&setup=true&lang.ts
var _ = { class: "admin" }, v = { class: "admin__sidebar" }, y = {
	class: "admin__nav",
	"aria-labelledby": "admin-nav-heading"
}, b = { class: "admin__label" }, x = { class: "admin__content" }, S = /*#__PURE__*/ e(/* @__PURE__ */ l({
	__name: "AdminLayout",
	props: {
		base: { default: "/app" },
		pages: { default: () => [] }
	},
	setup(e) {
		let l = e, S = r(() => l.pages.map((e) => ({
			id: e.name,
			label: e.label,
			icon: e.icon,
			to: `${l.base}/admin/${e.path}`
		})));
		return (e, r) => (u(), o("div", _, [s("aside", v, [r[0] ||= s("p", {
			id: "admin-nav-heading",
			class: "admin__heading"
		}, "Admin", -1), s("nav", y, [(u(!0), o(n, null, d(S.value, (e) => (u(), i(p(h), {
			key: e.id,
			to: e.to ?? "",
			class: "admin__link"
		}, {
			default: m(() => [e.icon ? (u(), i(t, {
				key: 0,
				name: e.icon,
				class: "admin__icon",
				"aria-hidden": "true"
			}, null, 8, ["name"])) : a("", !0), s("span", b, f(e.label), 1)]),
			_: 2
		}, 1032, ["to"]))), 128))])]), s("div", x, [c(p(g))])]));
	}
}), [["__scopeId", "data-v-de0cf0d8"]]);
//#endregion
export { S as default };

//# sourceMappingURL=AdminLayout-xHKZdR95.js.map