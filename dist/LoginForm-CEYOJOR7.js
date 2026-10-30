import { n as e, t } from "./AuthField-DUwbo-xH.js";
import { t as n } from "./Button-1sKEdGjj.js";
import { n as r, t as i } from "./Icon-CIbfiPrs.js";
import { t as a } from "./useAuthStore-593BscZf.js";
import { t as o } from "./useMessages-B2u5b6BQ.js";
import { p as s } from "./client-pLl-rDdN.js";
import { t as c } from "./safeRedirect-D1bQSM1C.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, openBlock as y, ref as b, renderSlot as x, resolveComponent as S, toDisplayString as C, unref as w, withCtx as T, withModifiers as E } from "vue";
import { useRoute as D, useRouter as O } from "vue-router";
// src/components/LoginForm.vue?vue&type=script&setup=true&lang.ts
var k = {
	key: 0,
	class: "login__banner",
	role: "alert"
}, A = { class: "login__divider" }, j = { class: "login__oauth" }, M = /*#__PURE__*/ r(/* @__PURE__ */ _({
	__name: "LoginForm",
	emits: ["success"],
	setup(r, { emit: _ }) {
		let M = _, N = a(), P = O(), F = D(), { t: I } = o(), L = v("phlixConfig", null), R = u(() => L?.home ?? L?.routerBase ?? "/app"), z = u(() => `${L?.routerBase ?? "/app"}/signup`), B = u(() => s(N.errorCode, L?.locale, N.error ?? I("auth.signInFailed"))), V = b(""), H = b(""), U = b(null), W = b(null), G = b(!1);
		function K() {
			return U.value = V.value.trim() ? null : I("auth.identifierRequired"), W.value = H.value ? null : I("auth.passwordRequired"), !U.value && !W.value;
		}
		async function q() {
			if (K()) {
				if (G.value = !1, await N.login(V.value.trim(), H.value)) {
					M("success");
					let e = c(F.query.redirect);
					e ? P.replace(e) : P.push(R.value);
				} else G.value = !0;
			}
		}
		return (r, a) => {
			let o = S("RouterLink");
			return y(), d(e, {
				eyebrow: w(I)("auth.loginEyebrow"),
				title: w(I)("auth.loginTitle"),
				subtitle: w(I)("auth.loginSubtitle")
			}, {
				footer: T(() => [h(C(w(I)("auth.loginFooterPrompt")) + " ", 1), g(o, {
					to: z.value,
					class: "login__link"
				}, {
					default: T(() => [h(C(w(I)("auth.signupLink")), 1)]),
					_: 1
				}, 8, ["to"])]),
				default: T(() => [G.value ? (y(), p("p", k, [g(i, {
					name: "alert",
					class: "login__banner-icon"
				}), m("span", null, C(B.value), 1)])) : f("", !0), m("form", {
					class: "login__form",
					novalidate: "",
					onSubmit: E(q, ["prevent"])
				}, [
					g(t, {
						modelValue: V.value,
						"onUpdate:modelValue": a[0] ||= (e) => V.value = e,
						name: "identifier",
						label: w(I)("auth.usernameOrEmail"),
						type: "text",
						autocomplete: "username",
						placeholder: w(I)("auth.usernameOrEmailPlaceholder"),
						error: U.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(t, {
						modelValue: H.value,
						"onUpdate:modelValue": a[1] ||= (e) => H.value = e,
						label: w(I)("auth.password"),
						type: "password",
						autocomplete: "current-password",
						placeholder: w(I)("auth.passwordPlaceholder"),
						error: W.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(n, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: w(N).loading
					}, {
						default: T(() => [h(C(w(N).loading ? w(I)("auth.signingIn") : w(I)("auth.signIn")), 1)]),
						_: 1
					}, 8, ["loading"]),
					r.$slots.oauth ? (y(), p(l, { key: 0 }, [m("div", A, C(w(I)("auth.orContinueWith")), 1), m("div", j, [x(r.$slots, "oauth", {}, void 0, !0)])], 64)) : f("", !0)
				], 32)]),
				_: 3
			}, 8, [
				"eyebrow",
				"title",
				"subtitle"
			]);
		};
	}
}), [["__scopeId", "data-v-23b2ca3c"]]);
export { M as t };

//# sourceMappingURL=LoginForm-CEYOJOR7.js.map