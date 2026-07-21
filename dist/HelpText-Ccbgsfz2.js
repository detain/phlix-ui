import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { Fragment as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, openBlock as l, renderList as u, toDisplayString as d } from "vue";
//#region src/components/ui/HelpText.vue?vue&type=script&setup=true&lang.ts
var f = { class: "phlix-help-text" }, p = { class: "phlix-help-text__paragraph" }, m = {
	key: 0,
	class: "phlix-help-text__links"
}, h = ["href"], g = /*#__PURE__*/ e(/* @__PURE__ */ c({
	__name: "HelpText",
	props: {
		text: {},
		links: { default: void 0 }
	},
	setup(e) {
		return (c, g) => (l(), i("div", f, [a("p", p, d(e.text), 1), e.links && e.links.length ? (l(), i("ul", m, [(l(!0), i(n, null, u(e.links, (e) => (l(), i("li", { key: e.url }, [a("a", {
			href: e.url,
			target: "_blank",
			rel: "noopener noreferrer",
			class: "phlix-help-text__link"
		}, [o(d(e.text) + " ", 1), s(t, {
			name: "external-link",
			size: .85,
			"aria-hidden": "true"
		})], 8, h)]))), 128))])) : r("", !0)]));
	}
}), [["__scopeId", "data-v-46906a06"]]);
//#endregion
export { g as t };

//# sourceMappingURL=HelpText-Ccbgsfz2.js.map