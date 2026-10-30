import { n as e, t } from "./Icon-CIbfiPrs.js";
import { t as n } from "./safeHref-CxjNgvYf.js";
import { Fragment as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, createTextVNode as s, createVNode as c, defineComponent as l, normalizeClass as u, openBlock as d, renderList as f, renderSlot as p, toDisplayString as m, unref as h } from "vue";
// src/components/ui/PageHint.vue?vue&type=script&setup=true&lang.ts
var g = { class: "phlix-page-hint__icon" }, _ = { class: "phlix-page-hint__body" }, v = {
	key: 0,
	class: "phlix-page-hint__title"
}, y = { class: "phlix-page-hint__text" }, b = {
	key: 1,
	class: "phlix-page-hint__links"
}, x = ["href"], S = {
	key: 2,
	class: "phlix-page-hint__details"
}, C = /*#__PURE__*/ e(/* @__PURE__ */ l({
	__name: "PageHint",
	props: {
		title: { default: void 0 },
		tone: { default: "info" },
		links: { default: void 0 },
		details: { default: void 0 }
	},
	setup(e) {
		return (l, C) => (d(), a("aside", {
			class: u(["phlix-page-hint", `phlix-page-hint--${e.tone}`]),
			role: "note"
		}, [o("span", g, [c(t, { name: "info" })]), o("div", _, [
			e.title ? (d(), a("p", v, m(e.title), 1)) : i("", !0),
			o("p", y, [p(l.$slots, "default", {}, void 0, !0)]),
			e.links && e.links.length ? (d(), a("div", b, [(d(!0), a(r, null, f(e.links, (e) => (d(), a("a", {
				key: e.url,
				href: h(n)(e.url),
				target: "_blank",
				rel: "noopener noreferrer",
				class: "phlix-page-hint__link"
			}, [s(m(e.text), 1), c(t, {
				name: "external-link",
				class: "phlix-page-hint__link-icon"
			})], 8, x))), 128))])) : i("", !0),
			e.details ? (d(), a("details", S, [C[0] ||= o("summary", null, "Learn more", -1), o("p", null, m(e.details), 1)])) : i("", !0)
		])], 2));
	}
}), [["__scopeId", "data-v-de860535"]]);
export { C as t };

//# sourceMappingURL=PageHint-BlhPmafC.js.map