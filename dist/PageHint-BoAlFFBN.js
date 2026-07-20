import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { Fragment as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, normalizeClass as l, openBlock as u, renderList as d, renderSlot as f, toDisplayString as p } from "vue";
//#region src/components/ui/PageHint.vue?vue&type=script&setup=true&lang.ts
var m = { class: "phlix-page-hint__icon" }, h = { class: "phlix-page-hint__body" }, g = {
	key: 0,
	class: "phlix-page-hint__title"
}, _ = { class: "phlix-page-hint__text" }, v = {
	key: 1,
	class: "phlix-page-hint__links"
}, y = ["href"], b = {
	key: 2,
	class: "phlix-page-hint__details"
}, x = /*#__PURE__*/ e(/* @__PURE__ */ c({
	__name: "PageHint",
	props: {
		title: { default: void 0 },
		tone: { default: "info" },
		links: { default: void 0 },
		details: { default: void 0 }
	},
	setup(e) {
		return (c, x) => (u(), i("aside", {
			class: l(["phlix-page-hint", `phlix-page-hint--${e.tone}`]),
			role: "note"
		}, [a("span", m, [s(t, { name: "info" })]), a("div", h, [
			e.title ? (u(), i("p", g, p(e.title), 1)) : r("", !0),
			a("p", _, [f(c.$slots, "default", {}, void 0, !0)]),
			e.links && e.links.length ? (u(), i("div", v, [(u(!0), i(n, null, d(e.links, (e) => (u(), i("a", {
				key: e.url,
				href: e.url,
				target: "_blank",
				rel: "noopener noreferrer",
				class: "phlix-page-hint__link"
			}, [o(p(e.text), 1), s(t, {
				name: "external-link",
				class: "phlix-page-hint__link-icon"
			})], 8, y))), 128))])) : r("", !0),
			e.details ? (u(), i("details", b, [x[0] ||= a("summary", null, "Learn more", -1), a("p", null, p(e.details), 1)])) : r("", !0)
		])], 2));
	}
}), [["__scopeId", "data-v-c7b87c36"]]);
//#endregion
export { x as t };

//# sourceMappingURL=PageHint-BoAlFFBN.js.map