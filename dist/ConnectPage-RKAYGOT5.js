import { n as e, r as t, t as n } from "./AuthField-CYy4bPYt.js";
import { n as r, t as i } from "./Icon-ax5k7_G2.js";
import { a } from "./usePreferencesStore-FeMLCFE3.js";
import { t as o } from "./useMessages-ClxxG1xp.js";
import { a as s, i as c, r as l } from "./useConnectionStore-93rGJB21.js";
import { t as u } from "./Button-k7aQagzg.js";
import { computed as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, openBlock as y, ref as b, toDisplayString as x, unref as S, withCtx as C, withModifiers as w } from "vue";
import { useRoute as T, useRouter as E } from "vue-router";
//#region src/pages/ConnectPage.vue?vue&type=script&setup=true&lang.ts
var D = { class: "auth-page" }, O = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, k = { class: "auth-page__center" }, A = { class: "connect__hint" }, j = /*#__PURE__*/ r(/* @__PURE__ */ _({
	__name: "ConnectPage",
	setup(r) {
		let _ = a(), j = c(), M = T(), N = E(), { t: P } = o(), F = v("phlixConfig", null), I = d(() => F?.home ?? F?.routerBase ?? "/app"), L = b(""), R = b(null), z = b(!1), B = b(!1);
		function V() {
			let e = M.query.redirect;
			return typeof e == "string" && e ? e : I.value;
		}
		function H(e) {
			j.setApiBase(e), N.push(V());
		}
		async function U() {
			R.value = null, B.value = !1;
			let e = s(L.value);
			if (!e) {
				R.value = P("connect.addressRequired");
				return;
			}
			z.value = !0;
			try {
				await l(e) ? H(e) : (B.value = !0, R.value = P("connect.unreachable"));
			} finally {
				z.value = !1;
			}
		}
		function W() {
			let e = s(L.value);
			e && H(e);
		}
		return (r, a) => (y(), p("div", D, [
			g(t, {
				enabled: S(_).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			S(_).atmosphere ? (y(), p("div", O)) : f("", !0),
			m("div", k, [g(e, {
				eyebrow: S(P)("connect.eyebrow"),
				title: S(P)("connect.title"),
				subtitle: S(P)("connect.subtitle")
			}, {
				default: C(() => [m("form", {
					class: "connect__form",
					novalidate: "",
					onSubmit: w(U, ["prevent"])
				}, [
					g(n, {
						modelValue: L.value,
						"onUpdate:modelValue": a[0] ||= (e) => L.value = e,
						name: "server-address",
						label: S(P)("connect.addressLabel"),
						type: "text",
						inputmode: "url",
						autocomplete: "url",
						placeholder: S(P)("connect.addressPlaceholder"),
						error: R.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					m("p", A, x(S(P)("connect.hint")), 1),
					g(u, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: z.value
					}, {
						default: C(() => [h(x(z.value ? S(P)("connect.connecting") : S(P)("connect.connect")), 1)]),
						_: 1
					}, 8, ["loading"]),
					B.value ? (y(), p("button", {
						key: 0,
						type: "button",
						class: "connect__anyway",
						onClick: W
					}, [g(i, {
						name: "alert",
						class: "connect__anyway-icon"
					}), m("span", null, x(S(P)("connect.connectAnyway")), 1)])) : f("", !0)
				], 32)]),
				_: 1
			}, 8, [
				"eyebrow",
				"title",
				"subtitle"
			])])
		]));
	}
}), [["__scopeId", "data-v-980b1012"]]);
//#endregion
export { j as default };

//# sourceMappingURL=ConnectPage-RKAYGOT5.js.map