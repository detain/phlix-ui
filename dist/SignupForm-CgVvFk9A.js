import { n as e, t } from "./AuthField-DrOuBGzc.js";
import { t as n } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as r } from "./Icon-BlNXxmNP.js";
import { t as i } from "./useMessages-CzF8Lxyp.js";
import { t as a } from "./useAuthStore-s6lZkMZy.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Button-BL3fV7FU.js";
import { i as c } from "./errors-D1ikoBpg.js";
import { t as l } from "./safeRedirect-D84sb04M.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, openBlock as b, ref as x, renderSlot as S, resolveComponent as C, toDisplayString as w, unref as T, withCtx as E, withModifiers as D } from "vue";
import { useRoute as O, useRouter as k } from "vue-router";
//#region src/components/SignupForm.vue?vue&type=script&setup=true&lang.ts
var A = {
	key: 0,
	class: "signup__banner",
	role: "alert"
}, j = { class: "signup__divider" }, M = { class: "signup__oauth" }, N = /*#__PURE__*/ n(/* @__PURE__ */ v({
	__name: "SignupForm",
	emits: ["success"],
	setup(n, { emit: v }) {
		let N = v, P = a(), F = o(), I = k(), L = O(), { t: R } = i(), z = y("phlixConfig", null), B = d(() => z?.home ?? z?.routerBase ?? "/app"), V = d(() => `${z?.routerBase ?? "/app"}/login`), H = d(() => c(P.errorCode, z?.locale, P.error ?? R("auth.signupFailed"))), U = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, W = x(""), G = x(""), K = x(""), q = x(""), J = x(null), Y = x(null), X = x(null), Z = x(null);
		function Q() {
			return J.value = W.value.trim() ? U.test(W.value.trim()) ? null : R("auth.emailInvalid") : R("auth.emailRequired"), Y.value = G.value.trim() ? G.value.trim().length < 3 ? R("auth.usernameMinLength") : null : R("auth.usernameRequired"), X.value = K.value ? K.value.length < 8 ? R("auth.passwordMinLength") : null : R("auth.passwordChoose"), Z.value = q.value === K.value ? null : R("auth.passwordMismatch"), !J.value && !Y.value && !X.value && !Z.value;
		}
		async function $() {
			if (Q()) if (await P.signup(W.value.trim(), G.value.trim(), K.value)) {
				N("success");
				let e = l(L.query.redirect);
				e ? I.replace(e) : I.push(B.value);
			} else F.error(H.value);
		}
		return (n, i) => {
			let a = C("RouterLink");
			return b(), f(e, {
				eyebrow: T(R)("auth.signupEyebrow"),
				title: T(R)("auth.signupTitle"),
				subtitle: T(R)("auth.signupSubtitle")
			}, {
				footer: E(() => [g(w(T(R)("auth.signupFooterPrompt")) + " ", 1), _(a, {
					to: V.value,
					class: "signup__link"
				}, {
					default: E(() => [g(w(T(R)("auth.signInLink")), 1)]),
					_: 1
				}, 8, ["to"])]),
				default: E(() => [T(P).error ? (b(), m("p", A, [_(r, {
					name: "alert",
					class: "signup__banner-icon"
				}), h("span", null, w(H.value), 1)])) : p("", !0), h("form", {
					class: "signup__form",
					novalidate: "",
					onSubmit: D($, ["prevent"])
				}, [
					_(t, {
						modelValue: W.value,
						"onUpdate:modelValue": i[0] ||= (e) => W.value = e,
						label: T(R)("auth.email"),
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: T(R)("auth.emailPlaceholder"),
						error: J.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					_(t, {
						modelValue: G.value,
						"onUpdate:modelValue": i[1] ||= (e) => G.value = e,
						label: T(R)("auth.username"),
						type: "text",
						autocomplete: "username",
						placeholder: T(R)("auth.usernamePlaceholder"),
						error: Y.value,
						minlength: 3,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					_(t, {
						modelValue: K.value,
						"onUpdate:modelValue": i[2] ||= (e) => K.value = e,
						label: T(R)("auth.password"),
						type: "password",
						autocomplete: "new-password",
						placeholder: T(R)("auth.passwordSignupPlaceholder"),
						error: X.value,
						minlength: 8,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					_(t, {
						modelValue: q.value,
						"onUpdate:modelValue": i[3] ||= (e) => q.value = e,
						label: T(R)("auth.confirmPassword"),
						type: "password",
						autocomplete: "new-password",
						placeholder: T(R)("auth.confirmPasswordPlaceholder"),
						error: Z.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					_(s, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: T(P).loading
					}, {
						default: E(() => [g(w(T(P).loading ? T(R)("auth.creatingAccount") : T(R)("auth.createAccount")), 1)]),
						_: 1
					}, 8, ["loading"]),
					n.$slots.oauth ? (b(), m(u, { key: 0 }, [h("div", j, w(T(R)("auth.orContinueWith")), 1), h("div", M, [S(n.$slots, "oauth", {}, void 0, !0)])], 64)) : p("", !0)
				], 32)]),
				_: 3
			}, 8, [
				"eyebrow",
				"title",
				"subtitle"
			]);
		};
	}
}), [["__scopeId", "data-v-73136cfc"]]);
//#endregion
export { N as t };

//# sourceMappingURL=SignupForm-CgVvFk9A.js.map