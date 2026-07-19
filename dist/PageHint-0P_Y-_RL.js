import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-Ci10VWtp.js";
import { createCommentVNode as n, createElementBlock as r, createElementVNode as i, createVNode as a, defineComponent as o, normalizeClass as s, openBlock as c, renderSlot as l, toDisplayString as u } from "vue";
//#region src/components/ui/PageHint.vue?vue&type=script&setup=true&lang.ts
var d = { class: "phlix-page-hint__icon" }, f = { class: "phlix-page-hint__body" }, p = {
	key: 0,
	class: "phlix-page-hint__title"
}, m = { class: "phlix-page-hint__text" }, h = /*#__PURE__*/ e(/* @__PURE__ */ o({
	__name: "PageHint",
	props: {
		title: { default: void 0 },
		tone: { default: "info" }
	},
	setup(e) {
		return (o, h) => (c(), r("aside", {
			class: s(["phlix-page-hint", `phlix-page-hint--${e.tone}`]),
			role: "note"
		}, [i("span", d, [a(t, { name: "info" })]), i("div", f, [e.title ? (c(), r("p", p, u(e.title), 1)) : n("", !0), i("p", m, [l(o.$slots, "default", {}, void 0, !0)])])], 2));
	}
}), [["__scopeId", "data-v-fee2e38b"]]);
//#endregion
export { h as t };

//# sourceMappingURL=PageHint-0P_Y-_RL.js.map