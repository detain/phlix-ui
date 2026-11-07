import { n as e, r as t, t as n } from "./safeRedirect-C6gcItwQ.js";
import { t as r } from "./Button-Dfl4y6vO.js";
import { n as i, t as a } from "./Icon-55iG1rR7.js";
import { t as o } from "./useAuthStore-WCJX2cr0.js";
import { t as s } from "./useMessages-CnensOWJ.js";
import { h as c } from "./client-BLNUsFSj.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, openBlock as y, ref as b, renderSlot as x, resolveComponent as S, toDisplayString as C, unref as w, watch as T, withCtx as E, withModifiers as D } from "vue";
import { useRoute as O, useRouter as k } from "vue-router";
// src/components/LoginForm.vue?vue&type=script&setup=true&lang.ts
var A = {
	key: 0,
	class: "login__banner",
	role: "alert"
}, j = { class: "login__divider" }, M = { class: "login__oauth" }, N = /*#__PURE__*/ i(/* @__PURE__ */ _({
	__name: "LoginForm",
	emits: ["success"],
	setup(i, { emit: _ }) {
		let N = _, P = o(), F = k(), I = O(), { t: L } = s(), R = v("phlixConfig", null), z = u(() => R?.home ?? R?.routerBase ?? "/app"), B = u(() => `${R?.routerBase ?? "/app"}/signup`), V = u(() => c(P.errorCode, R?.locale, P.error ?? L("auth.signInFailed"))), H = b(""), U = b(""), W = b(null), G = b(null), K = b(!1);
		function q() {
			return W.value = H.value.trim() ? null : L("auth.identifierRequired"), G.value = U.value ? null : L("auth.passwordRequired"), !W.value && !G.value;
		}
		T(H, () => {
			W.value = null;
		}), T(U, () => {
			G.value = null;
		});
		async function J() {
			if (q()) {
				if (K.value = !1, await P.login(H.value.trim(), U.value)) {
					N("success");
					let e = n(I.query.redirect, R?.routerBase ?? "/app");
					e ? F.replace(e) : F.push(z.value);
				} else K.value = !0;
			}
		}
		return (n, i) => {
			let o = S("RouterLink");
			return y(), d(t, {
				eyebrow: w(L)("auth.loginEyebrow"),
				title: w(L)("auth.loginTitle"),
				subtitle: w(L)("auth.loginSubtitle")
			}, {
				footer: E(() => [h(C(w(L)("auth.loginFooterPrompt")) + " ", 1), g(o, {
					to: B.value,
					class: "login__link"
				}, {
					default: E(() => [h(C(w(L)("auth.signupLink")), 1)]),
					_: 1
				}, 8, ["to"])]),
				default: E(() => [K.value ? (y(), p("p", A, [g(a, {
					name: "alert",
					class: "login__banner-icon"
				}), m("span", null, C(V.value), 1)])) : f("", !0), m("form", {
					class: "login__form",
					novalidate: "",
					onSubmit: D(J, ["prevent"])
				}, [
					g(e, {
						modelValue: H.value,
						"onUpdate:modelValue": i[0] ||= (e) => H.value = e,
						name: "identifier",
						label: w(L)("auth.usernameOrEmail"),
						type: "text",
						autocomplete: "username",
						placeholder: w(L)("auth.usernameOrEmailPlaceholder"),
						error: W.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(e, {
						modelValue: U.value,
						"onUpdate:modelValue": i[1] ||= (e) => U.value = e,
						label: w(L)("auth.password"),
						type: "password",
						autocomplete: "current-password",
						placeholder: w(L)("auth.passwordPlaceholder"),
						error: G.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(r, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: w(P).loading
					}, {
						default: E(() => [h(C(w(P).loading ? w(L)("auth.signingIn") : w(L)("auth.signIn")), 1)]),
						_: 1
					}, 8, ["loading"]),
					n.$slots.oauth ? (y(), p(l, { key: 0 }, [m("div", j, C(w(L)("auth.orContinueWith")), 1), m("div", M, [x(n.$slots, "oauth", {}, void 0, !0)])], 64)) : f("", !0)
				], 32)]),
				_: 3
			}, 8, [
				"eyebrow",
				"title",
				"subtitle"
			]);
		};
	}
}), [["__scopeId", "data-v-aef53701"]]);
export { N as t };

//# sourceMappingURL=LoginForm-G-oXyRF4.js.map