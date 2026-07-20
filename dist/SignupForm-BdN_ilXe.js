import { n as e, t } from "./AuthField-DtBLBf3z.js";
import { t as n } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as r } from "./Icon-CGig46Dx.js";
import { t as i } from "./useMessages-CMPz9FmM.js";
import { t as a } from "./useAuthStore-D2BCcJAK.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Button-DWa6Ld_Z.js";
import { t as c } from "./safeRedirect-D84sb04M.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, openBlock as y, ref as b, renderSlot as x, resolveComponent as S, toDisplayString as C, unref as w, withCtx as T, withModifiers as E } from "vue";
import { useRoute as D, useRouter as O } from "vue-router";
//#region src/components/SignupForm.vue?vue&type=script&setup=true&lang.ts
var k = {
	key: 0,
	class: "signup__banner",
	role: "alert"
}, A = { class: "signup__divider" }, j = { class: "signup__oauth" }, M = /*#__PURE__*/ n(/* @__PURE__ */ _({
	__name: "SignupForm",
	emits: ["success"],
	setup(n, { emit: _ }) {
		let M = _, N = a(), P = o(), F = O(), I = D(), { t: L } = i(), R = v("phlixConfig", null), z = u(() => R?.home ?? R?.routerBase ?? "/app"), B = u(() => `${R?.routerBase ?? "/app"}/login`), V = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, H = b(""), U = b(""), W = b(""), G = b(""), K = b(null), q = b(null), J = b(null), Y = b(null);
		function X() {
			return K.value = H.value.trim() ? V.test(H.value.trim()) ? null : L("auth.emailInvalid") : L("auth.emailRequired"), q.value = U.value.trim() ? U.value.trim().length < 3 ? L("auth.usernameMinLength") : null : L("auth.usernameRequired"), J.value = W.value ? W.value.length < 8 ? L("auth.passwordMinLength") : null : L("auth.passwordChoose"), Y.value = G.value === W.value ? null : L("auth.passwordMismatch"), !K.value && !q.value && !J.value && !Y.value;
		}
		async function Z() {
			if (X()) if (await N.signup(H.value.trim(), U.value.trim(), W.value)) {
				M("success");
				let e = c(I.query.redirect);
				e ? F.replace(e) : F.push(z.value);
			} else P.error(N.error ?? L("auth.signupFailed"));
		}
		return (n, i) => {
			let a = S("RouterLink");
			return y(), d(e, {
				eyebrow: w(L)("auth.signupEyebrow"),
				title: w(L)("auth.signupTitle"),
				subtitle: w(L)("auth.signupSubtitle")
			}, {
				footer: T(() => [h(C(w(L)("auth.signupFooterPrompt")) + " ", 1), g(a, {
					to: B.value,
					class: "signup__link"
				}, {
					default: T(() => [h(C(w(L)("auth.signInLink")), 1)]),
					_: 1
				}, 8, ["to"])]),
				default: T(() => [w(N).error ? (y(), p("p", k, [g(r, {
					name: "alert",
					class: "signup__banner-icon"
				}), m("span", null, C(w(N).error), 1)])) : f("", !0), m("form", {
					class: "signup__form",
					novalidate: "",
					onSubmit: E(Z, ["prevent"])
				}, [
					g(t, {
						modelValue: H.value,
						"onUpdate:modelValue": i[0] ||= (e) => H.value = e,
						label: w(L)("auth.email"),
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: w(L)("auth.emailPlaceholder"),
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
						"onUpdate:modelValue": i[1] ||= (e) => U.value = e,
						label: w(L)("auth.username"),
						type: "text",
						autocomplete: "username",
						placeholder: w(L)("auth.usernamePlaceholder"),
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
						"onUpdate:modelValue": i[2] ||= (e) => W.value = e,
						label: w(L)("auth.password"),
						type: "password",
						autocomplete: "new-password",
						placeholder: w(L)("auth.passwordSignupPlaceholder"),
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
						"onUpdate:modelValue": i[3] ||= (e) => G.value = e,
						label: w(L)("auth.confirmPassword"),
						type: "password",
						autocomplete: "new-password",
						placeholder: w(L)("auth.confirmPasswordPlaceholder"),
						error: Y.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(s, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: w(N).loading
					}, {
						default: T(() => [h(C(w(N).loading ? w(L)("auth.creatingAccount") : w(L)("auth.createAccount")), 1)]),
						_: 1
					}, 8, ["loading"]),
					n.$slots.oauth ? (y(), p(l, { key: 0 }, [m("div", A, C(w(L)("auth.orContinueWith")), 1), m("div", j, [x(n.$slots, "oauth", {}, void 0, !0)])], 64)) : f("", !0)
				], 32)]),
				_: 3
			}, 8, [
				"eyebrow",
				"title",
				"subtitle"
			]);
		};
	}
}), [["__scopeId", "data-v-bc7fb978"]]);
//#endregion
export { M as t };

//# sourceMappingURL=SignupForm-BdN_ilXe.js.map