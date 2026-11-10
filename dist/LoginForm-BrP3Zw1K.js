import { n as e, r as t, t as n } from "./safeRedirect-BuBp4Fmn.js";
import { t as r } from "./Button-Dfl4y6vO.js";
import { n as i, t as a } from "./Icon-55iG1rR7.js";
import { t as o } from "./useAuthStore-BW5BEgYM.js";
import { t as s } from "./useMessages-D54Bje5m.js";
import { y as c } from "./client-CdNyEcUJ.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, openBlock as y, ref as b, renderSlot as x, resolveComponent as S, toDisplayString as C, unref as w, watch as T, withCtx as E, withModifiers as D } from "vue";
import { useRoute as O, useRouter as k } from "vue-router";
// src/components/LoginForm.vue?vue&type=script&setup=true&lang.ts
var A = {
	key: 0,
	class: "login__banner",
	role: "alert"
}, j = { class: "login__divider" }, M = { class: "login__oauth" }, N = { class: "login__hint" }, P = /*#__PURE__*/ i(/* @__PURE__ */ _({
	__name: "LoginForm",
	emits: ["success"],
	setup(i, { emit: _ }) {
		let P = _, F = o(), I = k(), L = O(), { t: R } = s(), z = v("phlixConfig", null), B = u(() => z?.home ?? z?.routerBase ?? "/app"), V = u(() => `${z?.routerBase ?? "/app"}/signup`), H = u(() => c(F.errorCode, z?.locale, F.error ?? R("auth.signInFailed"))), U = b(""), W = b(""), G = b(null), K = b(null), q = b(!1);
		function J() {
			return G.value = U.value.trim() ? null : R("auth.identifierRequired"), K.value = W.value ? null : R("auth.passwordRequired"), !G.value && !K.value;
		}
		T(U, () => {
			G.value = null;
		}), T(W, () => {
			K.value = null;
		});
		async function Y() {
			if (J()) {
				if (q.value = !1, await F.login(U.value.trim(), W.value)) {
					P("success");
					let e = n(L.query.redirect, z?.routerBase ?? "/app");
					e ? I.replace(e) : I.push(B.value);
				} else q.value = !0;
			}
		}
		return (n, i) => {
			let o = S("RouterLink");
			return y(), d(t, {
				eyebrow: w(R)("auth.loginEyebrow"),
				title: w(R)("auth.loginTitle"),
				subtitle: w(R)("auth.loginSubtitle")
			}, {
				footer: E(() => [
					h(C(w(R)("auth.loginFooterPrompt")) + " ", 1),
					g(o, {
						to: V.value,
						class: "login__link"
					}, {
						default: E(() => [h(C(w(R)("auth.signupLink")), 1)]),
						_: 1
					}, 8, ["to"]),
					m("p", N, C(w(R)("auth.passwordRecoveryHint")), 1)
				]),
				default: E(() => [q.value ? (y(), p("p", A, [g(a, {
					name: "alert",
					class: "login__banner-icon"
				}), m("span", null, C(H.value), 1)])) : f("", !0), m("form", {
					class: "login__form",
					novalidate: "",
					onSubmit: D(Y, ["prevent"])
				}, [
					g(e, {
						modelValue: U.value,
						"onUpdate:modelValue": i[0] ||= (e) => U.value = e,
						name: "identifier",
						label: w(R)("auth.usernameOrEmail"),
						type: "text",
						autocomplete: "username",
						placeholder: w(R)("auth.usernameOrEmailPlaceholder"),
						error: G.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(e, {
						modelValue: W.value,
						"onUpdate:modelValue": i[1] ||= (e) => W.value = e,
						label: w(R)("auth.password"),
						type: "password",
						autocomplete: "current-password",
						placeholder: w(R)("auth.passwordPlaceholder"),
						error: K.value,
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
						loading: w(F).loading
					}, {
						default: E(() => [h(C(w(F).loading ? w(R)("auth.signingIn") : w(R)("auth.signIn")), 1)]),
						_: 1
					}, 8, ["loading"]),
					n.$slots.oauth ? (y(), p(l, { key: 0 }, [m("div", j, C(w(R)("auth.orContinueWith")), 1), m("div", M, [x(n.$slots, "oauth", {}, void 0, !0)])], 64)) : f("", !0)
				], 32)]),
				_: 3
			}, 8, [
				"eyebrow",
				"title",
				"subtitle"
			]);
		};
	}
}), [["__scopeId", "data-v-0c8ffdc9"]]);
export { P as t };

//# sourceMappingURL=LoginForm-BrP3Zw1K.js.map