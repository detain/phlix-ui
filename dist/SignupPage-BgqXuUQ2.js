import { t as e } from "./SignupForm-Jtxzeq0l.js";
import { r as t } from "./AuthField-CDCdQLi5.js";
import { a as n } from "./usePreferencesStore-DrDMAwjz.js";
import { n as r } from "./Icon-CIbfiPrs.js";
import { createCommentVNode as i, createElementBlock as a, createElementVNode as o, createSlots as s, createVNode as c, defineComponent as l, openBlock as u, renderSlot as d, unref as f, withCtx as p } from "vue";
// src/pages/SignupPage.vue?vue&type=script&setup=true&lang.ts
var m = { class: "auth-page" }, h = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, g = { class: "auth-page__center" }, _ = /*#__PURE__*/ r(/* @__PURE__ */ l({
	__name: "SignupPage",
	setup(r) {
		let l = n();
		return (n, r) => (u(), a("div", m, [
			c(t, {
				enabled: f(l).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			f(l).atmosphere ? (u(), a("div", h)) : i("", !0),
			o("div", g, [c(e, null, s({ _: 2 }, [n.$slots.oauth ? {
				name: "oauth",
				fn: p(() => [d(n.$slots, "oauth", {}, void 0, !0)]),
				key: "0"
			} : void 0]), 1024)])
		]));
	}
}), [["__scopeId", "data-v-12728681"]]);
export { _ as default };

//# sourceMappingURL=SignupPage-BgqXuUQ2.js.map