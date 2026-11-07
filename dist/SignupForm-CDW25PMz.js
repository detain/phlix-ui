import { n as e, r as t, t as n } from "./safeRedirect-BuBp4Fmn.js";
import { t as r } from "./Button-Dfl4y6vO.js";
import { n as i, t as a } from "./Icon-55iG1rR7.js";
import { t as o } from "./useAuthStore-B-KYdhYS.js";
import { t as s } from "./useMessages-D54Bje5m.js";
import { h as c } from "./client-BLNUsFSj.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, openBlock as y, ref as b, renderSlot as x, resolveComponent as S, toDisplayString as C, unref as w, watch as T, withCtx as E, withModifiers as D } from "vue";
import { useRoute as O, useRouter as k } from "vue-router";
// src/components/SignupForm.vue?vue&type=script&setup=true&lang.ts
var A = {
	key: 0,
	class: "signup__banner",
	role: "alert"
}, j = { class: "signup__divider" }, M = { class: "signup__oauth" }, N = /*#__PURE__*/ i(/* @__PURE__ */ _({
	__name: "SignupForm",
	emits: ["success"],
	setup(i, { emit: _ }) {
		let N = _, P = o(), F = k(), I = O(), { t: L } = s(), R = v("phlixConfig", null), z = u(() => R?.home ?? R?.routerBase ?? "/app"), B = u(() => `${R?.routerBase ?? "/app"}/login`), V = u(() => c(P.errorCode, R?.locale, P.error ?? L("auth.signupFailed"))), H = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, U = b(""), W = b(""), G = b(""), K = b(""), q = b(null), J = b(null), Y = b(null), X = b(null), Z = b(!1);
		function Q() {
			return q.value = U.value.trim() ? H.test(U.value.trim()) ? null : L("auth.emailInvalid") : L("auth.emailRequired"), J.value = W.value.trim() ? W.value.trim().length < 3 ? L("auth.usernameMinLength") : null : L("auth.usernameRequired"), Y.value = G.value ? G.value.length < 8 ? L("auth.passwordMinLength") : null : L("auth.passwordChoose"), X.value = K.value ? K.value === G.value ? null : L("auth.passwordMismatch") : L("auth.confirmPasswordRequired"), !q.value && !J.value && !Y.value && !X.value;
		}
		T(U, () => {
			q.value = null;
		}), T(W, () => {
			J.value = null;
		}), T(G, () => {
			Y.value = null;
		}), T(K, () => {
			X.value = null;
		});
		async function $() {
			if (Q()) {
				if (Z.value = !1, await P.signup(U.value.trim(), W.value.trim(), G.value)) {
					N("success");
					let e = n(I.query.redirect, R?.routerBase ?? "/app");
					e ? F.replace(e) : F.push(z.value);
				} else Z.value = !0;
			}
		}
		return (n, i) => {
			let o = S("RouterLink");
			return y(), d(t, {
				eyebrow: w(L)("auth.signupEyebrow"),
				title: w(L)("auth.signupTitle"),
				subtitle: w(L)("auth.signupSubtitle")
			}, {
				footer: E(() => [h(C(w(L)("auth.signupFooterPrompt")) + " ", 1), g(o, {
					to: B.value,
					class: "signup__link"
				}, {
					default: E(() => [h(C(w(L)("auth.signInLink")), 1)]),
					_: 1
				}, 8, ["to"])]),
				default: E(() => [Z.value ? (y(), p("p", A, [g(a, {
					name: "alert",
					class: "signup__banner-icon"
				}), m("span", null, C(V.value), 1)])) : f("", !0), m("form", {
					class: "signup__form",
					novalidate: "",
					onSubmit: D($, ["prevent"])
				}, [
					g(e, {
						modelValue: U.value,
						"onUpdate:modelValue": i[0] ||= (e) => U.value = e,
						label: w(L)("auth.email"),
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: w(L)("auth.emailPlaceholder"),
						error: q.value,
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
						label: w(L)("auth.username"),
						type: "text",
						autocomplete: "username",
						placeholder: w(L)("auth.usernamePlaceholder"),
						error: J.value,
						minlength: 3,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(e, {
						modelValue: G.value,
						"onUpdate:modelValue": i[2] ||= (e) => G.value = e,
						label: w(L)("auth.password"),
						type: "password",
						autocomplete: "new-password",
						placeholder: w(L)("auth.passwordSignupPlaceholder"),
						error: Y.value,
						minlength: 8,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(e, {
						modelValue: K.value,
						"onUpdate:modelValue": i[3] ||= (e) => K.value = e,
						label: w(L)("auth.confirmPassword"),
						type: "password",
						autocomplete: "new-password",
						placeholder: w(L)("auth.confirmPasswordPlaceholder"),
						error: X.value,
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
						default: E(() => [h(C(w(P).loading ? w(L)("auth.creatingAccount") : w(L)("auth.createAccount")), 1)]),
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
}), [["__scopeId", "data-v-23b3c2d5"]]);
export { N as t };

//# sourceMappingURL=SignupForm-CDW25PMz.js.map