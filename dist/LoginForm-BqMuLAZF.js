import { n as e, t } from "./AuthField-Bo5r7X-m.js";
import { t as n } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as r } from "./Icon-Ci10VWtp.js";
import { t as i } from "./useMessages-CMPz9FmM.js";
import { t as a } from "./useAuthStore-D2BCcJAK.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Button-AW4z0vv0.js";
import { t as c } from "./safeRedirect-D84sb04M.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, openBlock as y, ref as b, renderSlot as x, resolveComponent as S, toDisplayString as C, unref as w, withCtx as T, withModifiers as E } from "vue";
import { useRoute as D, useRouter as O } from "vue-router";
//#region src/components/LoginForm.vue?vue&type=script&setup=true&lang.ts
var k = {
	key: 0,
	class: "login__banner",
	role: "alert"
}, A = { class: "login__divider" }, j = { class: "login__oauth" }, M = /*#__PURE__*/ n(/* @__PURE__ */ _({
	__name: "LoginForm",
	emits: ["success"],
	setup(n, { emit: _ }) {
		let M = _, N = a(), P = o(), F = O(), I = D(), { t: L } = i(), R = v("phlixConfig", null), z = u(() => R?.home ?? R?.routerBase ?? "/app"), B = u(() => `${R?.routerBase ?? "/app"}/signup`), V = b(""), H = b(""), U = b(null), W = b(null);
		function G() {
			return U.value = V.value.trim() ? null : L("auth.identifierRequired"), W.value = H.value ? null : L("auth.passwordRequired"), !U.value && !W.value;
		}
		async function K() {
			if (G()) if (await N.login(V.value.trim(), H.value)) {
				M("success");
				let e = c(I.query.redirect);
				e ? F.replace(e) : F.push(z.value);
			} else P.error(N.error ?? L("auth.signInFailed"));
		}
		return (n, i) => {
			let a = S("RouterLink");
			return y(), d(e, {
				eyebrow: w(L)("auth.loginEyebrow"),
				title: w(L)("auth.loginTitle"),
				subtitle: w(L)("auth.loginSubtitle")
			}, {
				footer: T(() => [h(C(w(L)("auth.loginFooterPrompt")) + " ", 1), g(a, {
					to: B.value,
					class: "login__link"
				}, {
					default: T(() => [h(C(w(L)("auth.signupLink")), 1)]),
					_: 1
				}, 8, ["to"])]),
				default: T(() => [w(N).error ? (y(), p("p", k, [g(r, {
					name: "alert",
					class: "login__banner-icon"
				}), m("span", null, C(w(N).error), 1)])) : f("", !0), m("form", {
					class: "login__form",
					novalidate: "",
					onSubmit: E(K, ["prevent"])
				}, [
					g(t, {
						modelValue: V.value,
						"onUpdate:modelValue": i[0] ||= (e) => V.value = e,
						name: "identifier",
						label: w(L)("auth.usernameOrEmail"),
						type: "text",
						autocomplete: "username",
						placeholder: w(L)("auth.usernameOrEmailPlaceholder"),
						error: U.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g(t, {
						modelValue: H.value,
						"onUpdate:modelValue": i[1] ||= (e) => H.value = e,
						label: w(L)("auth.password"),
						type: "password",
						autocomplete: "current-password",
						placeholder: w(L)("auth.passwordPlaceholder"),
						error: W.value,
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
						default: T(() => [h(C(w(N).loading ? w(L)("auth.signingIn") : w(L)("auth.signIn")), 1)]),
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
}), [["__scopeId", "data-v-63940f4f"]]);
//#endregion
export { M as t };

//# sourceMappingURL=LoginForm-BqMuLAZF.js.map