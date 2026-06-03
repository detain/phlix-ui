import { n as e, t } from "./AuthField-OP0_HNX2.js";
import { n, t as r } from "./Icon-ax5k7_G2.js";
import { t as i } from "./Button-GJ9vHE0J.js";
import { t as a } from "./useAuthStore-qz0h59p0.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, openBlock as _, ref as v, renderSlot as y, resolveComponent as b, toDisplayString as x, unref as S, withCtx as C, withModifiers as w } from "vue";
import { useRouter as T } from "vue-router";
//#region src/components/SignupForm.vue?vue&type=script&setup=true&lang.ts
var E = {
	key: 0,
	class: "signup__banner",
	role: "alert"
}, D = { class: "signup__oauth" }, O = /*#__PURE__*/ n(/* @__PURE__ */ h({
	__name: "SignupForm",
	emits: ["success"],
	setup(n, { emit: h }) {
		let O = h, k = a(), A = o(), j = T(), M = g("phlixConfig", null), N = c(() => M?.routerBase ?? "/app"), P = c(() => `${N.value}/login`), F = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, I = v(""), L = v(""), R = v(""), z = v(""), B = v(null), V = v(null), H = v(null), U = v(null);
		function W() {
			return B.value = I.value.trim() ? F.test(I.value.trim()) ? null : "Enter a valid email address." : "Enter your email.", V.value = L.value.trim() ? L.value.trim().length < 3 ? "Username must be at least 3 characters." : null : "Choose a username.", H.value = R.value ? R.value.length < 8 ? "Password must be at least 8 characters." : null : "Choose a password.", U.value = z.value === R.value ? null : "Passwords do not match.", !B.value && !V.value && !H.value && !U.value;
		}
		async function G() {
			W() && (await k.signup(I.value.trim(), L.value.trim(), R.value) ? (O("success"), j.push(N.value)) : A.error(k.error ?? "Registration failed."));
		}
		return (n, a) => {
			let o = b("RouterLink");
			return _(), l(e, {
				eyebrow: "Now showing",
				title: "Create your account",
				subtitle: "Your private cinema, anywhere."
			}, {
				footer: C(() => [a[6] ||= p(" Already have an account? ", -1), m(o, {
					to: P.value,
					class: "signup__link"
				}, {
					default: C(() => [...a[5] ||= [p("Sign in", -1)]]),
					_: 1
				}, 8, ["to"])]),
				default: C(() => [S(k).error ? (_(), d("p", E, [m(r, {
					name: "alert",
					class: "signup__banner-icon"
				}), f("span", null, x(S(k).error), 1)])) : u("", !0), f("form", {
					class: "signup__form",
					novalidate: "",
					onSubmit: w(G, ["prevent"])
				}, [
					m(t, {
						modelValue: I.value,
						"onUpdate:modelValue": a[0] ||= (e) => I.value = e,
						label: "Email",
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: "you@example.com",
						error: B.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					m(t, {
						modelValue: L.value,
						"onUpdate:modelValue": a[1] ||= (e) => L.value = e,
						label: "Username",
						type: "text",
						autocomplete: "username",
						placeholder: "Your username",
						error: V.value,
						minlength: 3,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					m(t, {
						modelValue: R.value,
						"onUpdate:modelValue": a[2] ||= (e) => R.value = e,
						label: "Password",
						type: "password",
						autocomplete: "new-password",
						placeholder: "At least 8 characters",
						error: H.value,
						minlength: 8,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					m(t, {
						modelValue: z.value,
						"onUpdate:modelValue": a[3] ||= (e) => z.value = e,
						label: "Confirm password",
						type: "password",
						autocomplete: "new-password",
						placeholder: "Repeat your password",
						error: U.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					m(i, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: S(k).loading
					}, {
						default: C(() => [p(x(S(k).loading ? "Creating account…" : "Create account"), 1)]),
						_: 1
					}, 8, ["loading"]),
					n.$slots.oauth ? (_(), d(s, { key: 0 }, [a[4] ||= f("div", { class: "signup__divider" }, "or continue with", -1), f("div", D, [y(n.$slots, "oauth", {}, void 0, !0)])], 64)) : u("", !0)
				], 32)]),
				_: 3
			});
		};
	}
}), [["__scopeId", "data-v-21a11f2c"]]);
//#endregion
export { O as t };

//# sourceMappingURL=SignupForm-Djo0Oqq9.js.map