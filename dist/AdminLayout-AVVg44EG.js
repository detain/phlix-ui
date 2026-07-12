import { t as e } from "./Icon-X5skTbAE.js";
import { Fragment as t, computed as n, createBlock as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, createVNode as s, defineComponent as c, openBlock as l, renderList as u, toDisplayString as d, unref as f, withCtx as p } from "vue";
import { RouterLink as m, RouterView as h } from "vue-router";
//#region src/app/AdminLayout.vue?vue&type=script&setup=true&lang.ts
var g = { class: "admin" }, _ = { class: "admin__sidebar" }, v = {
	class: "admin__nav",
	"aria-labelledby": "admin-nav-heading"
}, y = { class: "admin__label" }, b = { class: "admin__content" }, x = /* @__PURE__ */ c({
	__name: "AdminLayout",
	props: {
		base: { default: "/app" },
		pages: { default: () => [] }
	},
	setup(c) {
		let x = c, S = n(() => x.pages.map((e) => ({
			id: e.name,
			label: e.label,
			icon: e.icon,
			to: `${x.base}/admin/${e.path}`
		})));
		return (n, c) => (l(), a("div", g, [o("aside", _, [c[0] ||= o("p", {
			id: "admin-nav-heading",
			class: "admin__heading"
		}, "Admin", -1), o("nav", v, [(l(!0), a(t, null, u(S.value, (t) => (l(), r(f(m), {
			key: t.id,
			to: t.to ?? "",
			class: "admin__link"
		}, {
			default: p(() => [t.icon ? (l(), r(e, {
				key: 0,
				name: t.icon,
				class: "admin__icon",
				"aria-hidden": "true"
			}, null, 8, ["name"])) : i("", !0), o("span", y, d(t.label), 1)]),
			_: 2
		}, 1032, ["to"]))), 128))])]), o("div", b, [s(f(h))])]));
	}
});
//#endregion
export { x as default };

//# sourceMappingURL=AdminLayout-AVVg44EG.js.map