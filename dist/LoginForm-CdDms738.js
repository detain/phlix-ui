import { n as e, t } from "./AuthField-DG2s2h_e.js";
import { n, t as r } from "./Icon-ax5k7_G2.js";
import { t as i } from "./useMessages-C21WhqOh.js";
import { t as a } from "./useAuthStore-HphWxXcO.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Button-k7aQagzg.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, openBlock as v, ref as y, renderSlot as b, resolveComponent as x, toDisplayString as S, unref as C, withCtx as w, withModifiers as T } from "vue";
import { useRouter as E } from "vue-router";
//#region src/components/LoginForm.vue?vue&type=script&setup=true&lang.ts
var D = {
	key: 0,
	class: "login__banner",
	role: "alert"
}, O = { class: "login__divider" }, k = { class: "login__oauth" }, A = /*#__PURE__*/ n(/* @__PURE__ */ g({
	__name: "LoginForm",
	emits: ["success"],
	setup(n, { emit: g }) {
		let A = g, j = a(), M = o(), N = E(), { t: P } = i(), F = _("phlixConfig", null), I = l(() => F?.home ?? F?.routerBase ?? "/app"), L = l(() => `${F?.routerBase ?? "/app"}/signup`), R = y(""), z = y(""), B = y(null), V = y(null);
		function H() {
			return B.value = R.value.trim() ? null : P("auth.identifierRequired"), V.value = z.value ? null : P("auth.passwordRequired"), !B.value && !V.value;
		}
		async function U() {
			H() && (await j.login(R.value.trim(), z.value) ? (A("success"), N.push(I.value)) : M.error(j.error ?? P("auth.signInFailed")));
		}
		return (n, i) => {
			let a = x("RouterLink");
			return v(), u(e, {
				eyebrow: C(P)("auth.loginEyebrow"),
				title: C(P)("auth.loginTitle"),
				subtitle: C(P)("auth.loginSubtitle")
			}, {
				footer: w(() => [m(S(C(P)("auth.loginFooterPrompt")) + " ", 1), h(a, {
					to: L.value,
					class: "login__link"
				}, {
					default: w(() => [m(S(C(P)("auth.signupLink")), 1)]),
					_: 1
				}, 8, ["to"])]),
				default: w(() => [C(j).error ? (v(), f("p", D, [h(r, {
					name: "alert",
					class: "login__banner-icon"
				}), p("span", null, S(C(j).error), 1)])) : d("", !0), p("form", {
					class: "login__form",
					novalidate: "",
					onSubmit: T(U, ["prevent"])
				}, [
					h(t, {
						modelValue: R.value,
						"onUpdate:modelValue": i[0] ||= (e) => R.value = e,
						name: "identifier",
						label: C(P)("auth.usernameOrEmail"),
						type: "text",
						autocomplete: "username",
						placeholder: C(P)("auth.usernameOrEmailPlaceholder"),
						error: B.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					h(t, {
						modelValue: z.value,
						"onUpdate:modelValue": i[1] ||= (e) => z.value = e,
						label: C(P)("auth.password"),
						type: "password",
						autocomplete: "current-password",
						placeholder: C(P)("auth.passwordPlaceholder"),
						error: V.value,
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
						default: w(() => [m(S(C(j).loading ? C(P)("auth.signingIn") : C(P)("auth.signIn")), 1)]),
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
}), [["__scopeId", "data-v-10a405d3"]]);
//#endregion
export { A as t };

//# sourceMappingURL=LoginForm-CdDms738.js.map