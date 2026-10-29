import { n as e, t } from "./Icon-CIwTuFLd.js";
import { t as n } from "./safeHref-C9H0Sqte.js";
import { Fragment as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, createTextVNode as s, createVNode as c, defineComponent as l, openBlock as u, renderList as d, toDisplayString as f, unref as p } from "vue";
//#region src/components/ui/HelpText.vue?vue&type=script&setup=true&lang.ts
var m = { class: "phlix-help-text" }, h = { class: "phlix-help-text__paragraph" }, g = {
	key: 0,
	class: "phlix-help-text__links"
}, _ = ["href"], v = /*#__PURE__*/ e(/* @__PURE__ */ l({
	__name: "HelpText",
	props: {
		text: {},
		links: { default: void 0 }
	},
	setup(e) {
		return (l, v) => (u(), a("div", m, [o("p", h, f(e.text), 1), e.links && e.links.length ? (u(), a("ul", g, [(u(!0), a(r, null, d(e.links, (e) => (u(), a("li", { key: e.url }, [o("a", {
			href: p(n)(e.url),
			target: "_blank",
			rel: "noopener noreferrer",
			class: "phlix-help-text__link"
		}, [s(f(e.text) + " ", 1), c(t, {
			name: "external-link",
			size: .85,
			"aria-hidden": "true"
		})], 8, _)]))), 128))])) : i("", !0)]));
	}
}), [["__scopeId", "data-v-e245a4fb"]]);
//#endregion
export { v as t };

//# sourceMappingURL=HelpText-aA3EQtU4.js.map