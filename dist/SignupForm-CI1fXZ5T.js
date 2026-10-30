import { n as e, t } from "./AuthField-Dtzw7vnO.js";
import { t as n } from "./Button-1sKEdGjj.js";
import { n as r, t as i } from "./Icon-CIbfiPrs.js";
import { t as a } from "./useAuthStore-D9S6HAT9.js";
import { t as o } from "./useMessages-CFBuM1_w.js";
import { p as s } from "./client-pLl-rDdN.js";
import { t as c } from "./safeRedirect-D1bQSM1C.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, openBlock as y, ref as b, renderSlot as x, resolveComponent as S, toDisplayString as C, unref as w, withCtx as T, withModifiers as E } from "vue";
import { useRoute as D, useRouter as O } from "vue-router";
// src/components/SignupForm.vue?vue&type=script&setup=true&lang.ts
var k = {
	key: 0,
	class: "signup__banner",
	role: "alert"
}, A = { class: "signup__divider" }, j = { class: "signup__oauth" }, M = /*#__PURE__*/ r(/* @__PURE__ */ _({
	__name: "SignupForm",
	emits: ["success"],
	setup(r, { emit: _ }) {
		let M = _, N = a(), P = O(), F = D(), { t: I } = o(), L = v("phlixConfig", null), R = u(() => L?.home ?? L?.routerBase ?? "/app"), z = u(() => `${L?.routerBase ?? "/app"}/login`), B = u(() => s(N.errorCode, L?.locale, N.error ?? I("auth.signupFailed"))), V = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, H = b(""), U = b(""), W = b(""), G = b(""), K = b(null), q = b(null), J = b(null), Y = b(null), X = b(!1);
		function Z() {
			return K.value = H.value.trim() ? V.test(H.value.trim()) ? null : I("auth.emailInvalid") : I("auth.emailRequired"), q.value = U.value.trim() ? U.value.trim().length < 3 ? I("auth.usernameMinLength") : null : I("auth.usernameRequired"), J.value = W.value ? W.value.length < 8 ? I("auth.passwordMinLength") : null : I("auth.passwordChoose"), Y.value = G.value === W.value ? null : I("auth.passwordMismatch"), !K.value && !q.value && !J.value && !Y.value;
		}
		async function Q() {
			if (Z()) {
				if (X.value = !1, await N.signup(H.value.trim(), U.value.trim(), W.value)) {
					M("success");
					let e = c(F.query.redirect);
					e ? P.replace(e) : P.push(R.value);
				} else X.value = !0;
			}
		}
		return (r, a) => {
			let o = S("RouterLink");
			return y(), d(e, {
				eyebrow: w(I)("auth.signupEyebrow"),
				title: w(I)("auth.signupTitle"),
				subtitle: w(I)("auth.signupSubtitle")
			}, {
				footer: T(() => [h(C(w(I)("auth.signupFooterPrompt")) + " ", 1), g(o, {
					to: z.value,
					class: "signup__link"
				}, {
					default: T(() => [h(C(w(I)("auth.signInLink")), 1)]),
					_: 1
				}, 8, ["to"])]),
				default: T(() => [X.value ? (y(), p("p", k, [g(i, {
					name: "alert",
					class: "signup__banner-icon"
				}), m("span", null, C(B.value), 1)])) : f("", !0), m("form", {
					class: "signup__form",
					novalidate: "",
					onSubmit: E(Q, ["prevent"])
				}, [
					g(t, {
						modelValue: H.value,
						"onUpdate:modelValue": a[0] ||= (e) => H.value = e,
						label: w(I)("auth.email"),
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: w(I)("auth.emailPlaceholder"),
						error: K.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(t, {
						modelValue: U.value,
						"onUpdate:modelValue": a[1] ||= (e) => U.value = e,
						label: w(I)("auth.username"),
						type: "text",
						autocomplete: "username",
						placeholder: w(I)("auth.usernamePlaceholder"),
						error: q.value,
						minlength: 3,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(t, {
						modelValue: W.value,
						"onUpdate:modelValue": a[2] ||= (e) => W.value = e,
						label: w(I)("auth.password"),
						type: "password",
						autocomplete: "new-password",
						placeholder: w(I)("auth.passwordSignupPlaceholder"),
						error: J.value,
						minlength: 8,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(t, {
						modelValue: G.value,
						"onUpdate:modelValue": a[3] ||= (e) => G.value = e,
						label: w(I)("auth.confirmPassword"),
						type: "password",
						autocomplete: "new-password",
						placeholder: w(I)("auth.confirmPasswordPlaceholder"),
						error: Y.value,
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
						default: T(() => [h(C(w(N).loading ? w(I)("auth.creatingAccount") : w(I)("auth.createAccount")), 1)]),
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
}), [["__scopeId", "data-v-9c9cae21"]]);
export { M as t };

//# sourceMappingURL=SignupForm-CI1fXZ5T.js.map