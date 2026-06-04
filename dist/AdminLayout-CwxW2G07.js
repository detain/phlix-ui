import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./admin-Dr_pRNXD.js";
import { Fragment as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createVNode as l, defineComponent as u, openBlock as d, renderList as f, toDisplayString as p, unref as m, withCtx as h } from "vue";
import { RouterLink as g, RouterView as _ } from "vue-router";
//#region src/app/AdminLayout.vue?vue&type=script&setup=true&lang.ts
var v = { class: "admin" }, y = { class: "admin__sidebar" }, b = {
	class: "admin__nav",
	"aria-labelledby": "admin-nav-heading"
}, x = { class: "admin__label" }, S = { class: "admin__content" }, C = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "AdminLayout",
	props: { base: { default: "/app" } },
	setup(e) {
		let u = e, C = i(() => n(u.base)[0]?.children ?? []);
		return (e, n) => (d(), s("div", v, [c("aside", y, [n[0] ||= c("p", {
			id: "admin-nav-heading",
			class: "admin__heading"
		}, "Admin", -1), c("nav", b, [(d(!0), s(r, null, f(C.value, (e) => (d(), a(m(g), {
			key: e.id,
			to: e.to ?? "",
			class: "admin__link"
		}, {
			default: h(() => [e.icon ? (d(), a(t, {
				key: 0,
				name: e.icon,
				class: "admin__icon",
				"aria-hidden": "true"
			}, null, 8, ["name"])) : o("", !0), c("span", x, p(e.label), 1)]),
			_: 2
		}, 1032, ["to"]))), 128))])]), c("div", S, [l(m(_))])]));
	}
}), [["__scopeId", "data-v-3f5a9984"]]);
//#endregion
export { C as default };

//# sourceMappingURL=AdminLayout-CwxW2G07.js.map