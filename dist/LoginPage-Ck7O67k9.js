import { t as e } from "./LoginForm-YAwiU1vE.js";
import { t } from "./AuthRedirectNotice-JxQbbsdr.js";
import { i as n } from "./safeRedirect-CyrIxtQH.js";
import { a as r } from "./usePreferencesStore-DrDMAwjz.js";
import { n as i } from "./Icon-55iG1rR7.js";
import { createCommentVNode as a, createElementBlock as o, createElementVNode as s, createSlots as c, createVNode as l, defineComponent as u, openBlock as d, renderSlot as f, unref as p, withCtx as m } from "vue";
// src/pages/LoginPage.vue?vue&type=script&setup=true&lang.ts
var h = { class: "auth-page" }, g = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, _ = { class: "auth-page__center" }, v = { class: "auth-page__stack" }, y = /*#__PURE__*/ i(/* @__PURE__ */ u({
	__name: "LoginPage",
	setup(i) {
		let u = r();
		return (r, i) => (d(), o("div", h, [
			l(n, {
				enabled: p(u).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			p(u).atmosphere ? (d(), o("div", g)) : a("", !0),
			s("div", _, [s("div", v, [l(t), l(e, null, c({ _: 2 }, [r.$slots.oauth ? {
				name: "oauth",
				fn: m(() => [f(r.$slots, "oauth", {}, void 0, !0)]),
				key: "0"
			} : void 0]), 1024)])])
		]));
	}
}), [["__scopeId", "data-v-00b3963d"]]);
export { y as default };

//# sourceMappingURL=LoginPage-Ck7O67k9.js.map