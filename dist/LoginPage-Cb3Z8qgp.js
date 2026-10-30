import { t as e } from "./LoginForm-qAbuIl4Y.js";
import { r as t } from "./AuthField-Dtzw7vnO.js";
import { a as n } from "./usePreferencesStore-DrDMAwjz.js";
import { n as r } from "./Icon-CIbfiPrs.js";
import { createCommentVNode as i, createElementBlock as a, createElementVNode as o, createSlots as s, createVNode as c, defineComponent as l, openBlock as u, renderSlot as d, unref as f, withCtx as p } from "vue";
// src/pages/LoginPage.vue?vue&type=script&setup=true&lang.ts
var m = { class: "auth-page" }, h = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, g = { class: "auth-page__center" }, _ = /*#__PURE__*/ r(/* @__PURE__ */ l({
	__name: "LoginPage",
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
}), [["__scopeId", "data-v-f2de0e35"]]);
export { _ as default };

//# sourceMappingURL=LoginPage-Cb3Z8qgp.js.map