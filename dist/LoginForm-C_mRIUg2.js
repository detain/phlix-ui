import { n as e, t } from "./AuthField-DrOuBGzc.js";
import { t as n } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as r } from "./Icon-BlNXxmNP.js";
import { t as i } from "./useMessages-CzF8Lxyp.js";
import { t as a } from "./useAuthStore-s6lZkMZy.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Button-BL3fV7FU.js";
import { i as c } from "./errors-DYDTeHIA.js";
import { t as l } from "./safeRedirect-D84sb04M.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, openBlock as b, ref as x, renderSlot as S, resolveComponent as C, toDisplayString as w, unref as T, withCtx as E, withModifiers as D } from "vue";
import { useRoute as O, useRouter as k } from "vue-router";
//#region src/components/LoginForm.vue?vue&type=script&setup=true&lang.ts
var A = {
	key: 0,
	class: "login__banner",
	role: "alert"
}, j = { class: "login__divider" }, M = { class: "login__oauth" }, N = /*#__PURE__*/ n(/* @__PURE__ */ v({
	__name: "LoginForm",
	emits: ["success"],
	setup(n, { emit: v }) {
		let N = v, P = a(), F = o(), I = k(), L = O(), { t: R } = i(), z = y("phlixConfig", null), B = d(() => z?.home ?? z?.routerBase ?? "/app"), V = d(() => `${z?.routerBase ?? "/app"}/signup`), H = d(() => c(P.errorCode, z?.locale, P.error ?? R("auth.signInFailed"))), U = x(""), W = x(""), G = x(null), K = x(null);
		function q() {
			return G.value = U.value.trim() ? null : R("auth.identifierRequired"), K.value = W.value ? null : R("auth.passwordRequired"), !G.value && !K.value;
		}
		async function J() {
			if (q()) if (await P.login(U.value.trim(), W.value)) {
				N("success");
				let e = l(L.query.redirect);
				e ? I.replace(e) : I.push(B.value);
			} else F.error(H.value);
		}
		return (n, i) => {
			let a = C("RouterLink");
			return b(), f(e, {
				eyebrow: T(R)("auth.loginEyebrow"),
				title: T(R)("auth.loginTitle"),
				subtitle: T(R)("auth.loginSubtitle")
			}, {
				footer: E(() => [g(w(T(R)("auth.loginFooterPrompt")) + " ", 1), _(a, {
					to: V.value,
					class: "login__link"
				}, {
					default: E(() => [g(w(T(R)("auth.signupLink")), 1)]),
					_: 1
				}, 8, ["to"])]),
				default: E(() => [T(P).error ? (b(), m("p", A, [_(r, {
					name: "alert",
					class: "login__banner-icon"
				}), h("span", null, w(H.value), 1)])) : p("", !0), h("form", {
					class: "login__form",
					novalidate: "",
					onSubmit: D(J, ["prevent"])
				}, [
					_(t, {
						modelValue: U.value,
						"onUpdate:modelValue": i[0] ||= (e) => U.value = e,
						name: "identifier",
						label: T(R)("auth.usernameOrEmail"),
						type: "text",
						autocomplete: "username",
						placeholder: T(R)("auth.usernameOrEmailPlaceholder"),
						error: G.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					_(t, {
						modelValue: W.value,
						"onUpdate:modelValue": i[1] ||= (e) => W.value = e,
						label: T(R)("auth.password"),
						type: "password",
						autocomplete: "current-password",
						placeholder: T(R)("auth.passwordPlaceholder"),
						error: K.value,
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
						default: E(() => [g(w(T(P).loading ? T(R)("auth.signingIn") : T(R)("auth.signIn")), 1)]),
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
}), [["__scopeId", "data-v-fe96a2f2"]]);
//#endregion
export { N as t };

//# sourceMappingURL=LoginForm-C_mRIUg2.js.map