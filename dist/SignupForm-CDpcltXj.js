import { n as e, t } from "./AuthField-BCxtf4gP.js";
import { t as n } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as r } from "./Icon-X5skTbAE.js";
import { t as i } from "./useMessages-QU3qvt7A.js";
import { t as a } from "./useAuthStore-C_Rnq3Bo.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Button-btm-GCUN.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, openBlock as v, ref as y, renderSlot as b, resolveComponent as x, toDisplayString as S, unref as C, withCtx as w, withModifiers as T } from "vue";
import { useRouter as E } from "vue-router";
//#region src/components/SignupForm.vue?vue&type=script&setup=true&lang.ts
var D = {
	key: 0,
	class: "signup__banner",
	role: "alert"
}, O = { class: "signup__divider" }, k = { class: "signup__oauth" }, A = /*#__PURE__*/ n(/* @__PURE__ */ g({
	__name: "SignupForm",
	emits: ["success"],
	setup(n, { emit: g }) {
		let A = g, j = a(), M = o(), N = E(), { t: P } = i(), F = _("phlixConfig", null), I = l(() => F?.home ?? F?.routerBase ?? "/app"), L = l(() => `${F?.routerBase ?? "/app"}/login`), R = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, z = y(""), B = y(""), V = y(""), H = y(""), U = y(null), W = y(null), G = y(null), K = y(null);
		function q() {
			return U.value = z.value.trim() ? R.test(z.value.trim()) ? null : P("auth.emailInvalid") : P("auth.emailRequired"), W.value = B.value.trim() ? B.value.trim().length < 3 ? P("auth.usernameMinLength") : null : P("auth.usernameRequired"), G.value = V.value ? V.value.length < 8 ? P("auth.passwordMinLength") : null : P("auth.passwordChoose"), K.value = H.value === V.value ? null : P("auth.passwordMismatch"), !U.value && !W.value && !G.value && !K.value;
		}
		async function J() {
			q() && (await j.signup(z.value.trim(), B.value.trim(), V.value) ? (A("success"), N.push(I.value)) : M.error(j.error ?? P("auth.signupFailed")));
		}
		return (n, i) => {
			let a = x("RouterLink");
			return v(), u(e, {
				eyebrow: C(P)("auth.signupEyebrow"),
				title: C(P)("auth.signupTitle"),
				subtitle: C(P)("auth.signupSubtitle")
			}, {
				footer: w(() => [m(S(C(P)("auth.signupFooterPrompt")) + " ", 1), h(a, {
					to: L.value,
					class: "signup__link"
				}, {
					default: w(() => [m(S(C(P)("auth.signInLink")), 1)]),
					_: 1
				}, 8, ["to"])]),
				default: w(() => [C(j).error ? (v(), f("p", D, [h(r, {
					name: "alert",
					class: "signup__banner-icon"
				}), p("span", null, S(C(j).error), 1)])) : d("", !0), p("form", {
					class: "signup__form",
					novalidate: "",
					onSubmit: T(J, ["prevent"])
				}, [
					h(t, {
						modelValue: z.value,
						"onUpdate:modelValue": i[0] ||= (e) => z.value = e,
						label: C(P)("auth.email"),
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: C(P)("auth.emailPlaceholder"),
						error: U.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					h(t, {
						modelValue: B.value,
						"onUpdate:modelValue": i[1] ||= (e) => B.value = e,
						label: C(P)("auth.username"),
						type: "text",
						autocomplete: "username",
						placeholder: C(P)("auth.usernamePlaceholder"),
						error: W.value,
						minlength: 3,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					h(t, {
						modelValue: V.value,
						"onUpdate:modelValue": i[2] ||= (e) => V.value = e,
						label: C(P)("auth.password"),
						type: "password",
						autocomplete: "new-password",
						placeholder: C(P)("auth.passwordSignupPlaceholder"),
						error: G.value,
						minlength: 8,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					h(t, {
						modelValue: H.value,
						"onUpdate:modelValue": i[3] ||= (e) => H.value = e,
						label: C(P)("auth.confirmPassword"),
						type: "password",
						autocomplete: "new-password",
						placeholder: C(P)("auth.confirmPasswordPlaceholder"),
						error: K.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					h(s, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: C(j).loading
					}, {
						default: w(() => [m(S(C(j).loading ? C(P)("auth.creatingAccount") : C(P)("auth.createAccount")), 1)]),
						_: 1
					}, 8, ["loading"]),
					n.$slots.oauth ? (v(), f(c, { key: 0 }, [p("div", O, S(C(P)("auth.orContinueWith")), 1), p("div", k, [b(n.$slots, "oauth", {}, void 0, !0)])], 64)) : d("", !0)
				], 32)]),
				_: 3
			}, 8, [
				"eyebrow",
				"title",
				"subtitle"
			]);
		};
	}
}), [["__scopeId", "data-v-a3d17a58"]]);
//#endregion
export { A as t };

//# sourceMappingURL=SignupForm-CDpcltXj.js.map