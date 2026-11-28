import { n as e, t } from "./Icon-55iG1rR7.js";
import { t as n } from "./safeHref-Be5nFpx7.js";
import { t as r } from "./useMessages-Bgh_YqAN.js";
import { Fragment as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, normalizeClass as d, openBlock as f, renderList as p, renderSlot as m, toDisplayString as h, unref as g } from "vue";
// src/components/ui/PageHint.vue?vue&type=script&setup=true&lang.ts
var _ = { class: "phlix-page-hint__icon" }, v = { class: "phlix-page-hint__body" }, y = {
	key: 0,
	class: "phlix-page-hint__title"
}, b = { class: "phlix-page-hint__text" }, x = {
	key: 1,
	class: "phlix-page-hint__links"
}, S = ["href"], C = {
	key: 2,
	class: "phlix-page-hint__details"
}, w = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "PageHint",
	props: {
		title: { default: void 0 },
		tone: { default: "info" },
		links: { default: void 0 },
		details: { default: void 0 }
	},
	setup(e) {
		let { t: u } = r();
		return (r, w) => (f(), o("aside", {
			class: d(["phlix-page-hint", `phlix-page-hint--${e.tone}`]),
			role: "note"
		}, [s("span", _, [l(t, { name: "info" })]), s("div", v, [
			e.title ? (f(), o("p", y, h(e.title), 1)) : a("", !0),
			s("p", b, [m(r.$slots, "default", {}, void 0, !0)]),
			e.links && e.links.length ? (f(), o("div", x, [(f(!0), o(i, null, p(e.links, (e) => (f(), o("a", {
				key: e.url,
				href: g(n)(e.url),
				target: "_blank",
				rel: "noopener noreferrer",
				class: "phlix-page-hint__link"
			}, [c(h(e.text), 1), l(t, {
				name: "external-link",
				class: "phlix-page-hint__link-icon"
			})], 8, S))), 128))])) : a("", !0),
			e.details ? (f(), o("details", C, [s("summary", null, h(g(u)("common.learnMore")), 1), s("p", null, h(e.details), 1)])) : a("", !0)
		])], 2));
	}
}), [["__scopeId", "data-v-9da9ff2f"]]);
export { w as t };

//# sourceMappingURL=PageHint-B5gEYJ3T.js.map