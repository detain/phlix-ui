import { n as e, t } from "./AuthField-x4OifyCO.js";
import { n, t as r } from "./Icon-ax5k7_G2.js";
import { t as i } from "./useMessages-DCJifN0R.js";
import { t as a } from "./Button-BFaMKqH5.js";
import { t as o } from "./useAuthStore-M0VE53Rh.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
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
		let A = g, j = o(), M = s(), N = E(), { t: P } = i(), F = _("phlixConfig", null), I = l(() => F?.routerBase ?? "/app"), L = l(() => `${I.value}/signup`), R = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, z = y(""), B = y(""), V = y(null), H = y(null);
		function U() {
			return V.value = z.value.trim() ? R.test(z.value.trim()) ? null : P("auth.emailInvalid") : P("auth.emailRequired"), H.value = B.value ? null : P("auth.passwordRequired"), !V.value && !H.value;
		}
		async function W() {
			U() && (await j.login(z.value.trim(), B.value) ? (A("success"), N.push(I.value)) : M.error(j.error ?? P("auth.signInFailed")));
		}
		return (n, i) => {
			let o = x("RouterLink");
			return v(), u(e, {
				eyebrow: C(P)("auth.loginEyebrow"),
				title: C(P)("auth.loginTitle"),
				subtitle: C(P)("auth.loginSubtitle")
			}, {
				footer: w(() => [m(S(C(P)("auth.loginFooterPrompt")) + " ", 1), h(o, {
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
					onSubmit: T(W, ["prevent"])
				}, [
					h(t, {
						modelValue: z.value,
						"onUpdate:modelValue": i[0] ||= (e) => z.value = e,
						label: C(P)("auth.email"),
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: C(P)("auth.emailPlaceholder"),
						error: V.value,
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
						label: C(P)("auth.password"),
						type: "password",
						autocomplete: "current-password",
						placeholder: C(P)("auth.passwordPlaceholder"),
						error: H.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					h(a, {
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
}), [["__scopeId", "data-v-2feeab2c"]]);
//#endregion
export { A as t };

//# sourceMappingURL=LoginForm-BU3enOMf.js.map