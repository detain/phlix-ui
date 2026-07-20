import { r as e } from "./AuthField-CR9Z7kA1.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { a as n } from "./usePreferencesStore-C9GLbD7G.js";
import { t as r } from "./SignupForm-oMk4EZMq.js";
import { createCommentVNode as i, createElementBlock as a, createElementVNode as o, createSlots as s, createVNode as c, defineComponent as l, openBlock as u, renderSlot as d, unref as f, withCtx as p } from "vue";
//#region src/pages/SignupPage.vue?vue&type=script&setup=true&lang.ts
var m = { class: "auth-page" }, h = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, g = { class: "auth-page__center" }, _ = /*#__PURE__*/ t(/* @__PURE__ */ l({
	__name: "SignupPage",
	setup(t) {
		let l = n();
		return (t, n) => (u(), a("div", m, [
			c(e, {
				enabled: f(l).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			f(l).atmosphere ? (u(), a("div", h)) : i("", !0),
			o("div", g, [c(r, null, s({ _: 2 }, [t.$slots.oauth ? {
				name: "oauth",
				fn: p(() => [d(t.$slots, "oauth", {}, void 0, !0)]),
				key: "0"
			} : void 0]), 1024)])
		]));
	}
}), [["__scopeId", "data-v-12728681"]]);
//#endregion
export { _ as default };

//# sourceMappingURL=SignupPage-DXa5L2y8.js.map