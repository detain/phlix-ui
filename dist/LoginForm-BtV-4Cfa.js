import { n as e, t } from "./AuthField-BsALi_RI.js";
import { d as n, t as r, u as i } from "./Button-C4PyCjLX.js";
import { t as a } from "./useAuthStore-D139Ow7E.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, openBlock as _, ref as v, renderSlot as y, resolveComponent as b, toDisplayString as x, unref as S, withCtx as C, withModifiers as w } from "vue";
import { useRouter as T } from "vue-router";
//#region src/components/LoginForm.vue?vue&type=script&setup=true&lang.ts
var E = {
	key: 0,
	class: "login__banner",
	role: "alert"
}, D = { class: "login__oauth" }, O = /*#__PURE__*/ n(/* @__PURE__ */ h({
	__name: "LoginForm",
	emits: ["success"],
	setup(n, { emit: h }) {
		let O = h, k = a(), A = o(), j = T(), M = g("phlixConfig", null), N = c(() => M?.routerBase ?? "/app"), P = c(() => `${N.value}/signup`), F = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, I = v(""), L = v(""), R = v(null), z = v(null);
		function B() {
			return R.value = I.value.trim() ? F.test(I.value.trim()) ? null : "Enter a valid email address." : "Enter your email.", z.value = L.value ? null : "Enter your password.", !R.value && !z.value;
		}
		async function V() {
			B() && (await k.login(I.value.trim(), L.value) ? (O("success"), j.push(N.value)) : A.error(k.error ?? "Sign in failed."));
		}
		return (n, a) => {
			let o = b("RouterLink");
			return _(), l(e, {
				eyebrow: "Member access",
				title: "Welcome back",
				subtitle: "Sign in to continue to your cinema."
			}, {
				footer: C(() => [a[4] ||= p(" New to Phlix? ", -1), m(o, {
					to: P.value,
					class: "login__link"
				}, {
					default: C(() => [...a[3] ||= [p("Create an account", -1)]]),
					_: 1
				}, 8, ["to"])]),
				default: C(() => [S(k).error ? (_(), d("p", E, [m(i, {
					name: "alert",
					class: "login__banner-icon"
				}), f("span", null, x(S(k).error), 1)])) : u("", !0), f("form", {
					class: "login__form",
					novalidate: "",
					onSubmit: w(V, ["prevent"])
				}, [
					m(t, {
						modelValue: I.value,
						"onUpdate:modelValue": a[0] ||= (e) => I.value = e,
						label: "Email",
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: "you@example.com",
						error: R.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					m(t, {
						modelValue: L.value,
						"onUpdate:modelValue": a[1] ||= (e) => L.value = e,
						label: "Password",
						type: "password",
						autocomplete: "current-password",
						placeholder: "Your password",
						error: z.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					m(r, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: S(k).loading
					}, {
						default: C(() => [p(x(S(k).loading ? "Signing in…" : "Sign in"), 1)]),
						_: 1
					}, 8, ["loading"]),
					n.$slots.oauth ? (_(), d(s, { key: 0 }, [a[2] ||= f("div", { class: "login__divider" }, "or continue with", -1), f("div", D, [y(n.$slots, "oauth", {}, void 0, !0)])], 64)) : u("", !0)
				], 32)]),
				_: 3
			});
		};
	}
}), [["__scopeId", "data-v-b06a8c9c"]]);
//#endregion
export { O as t };

//# sourceMappingURL=LoginForm-BtV-4Cfa.js.map