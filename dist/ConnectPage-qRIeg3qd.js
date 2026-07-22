import { n as e, r as t, t as n } from "./AuthField-Cuf4LZ7t.js";
import { t as r } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as i } from "./Icon-CGig46Dx.js";
import { a } from "./usePreferencesStore-C9GLbD7G.js";
import { t as o } from "./useMessages-3JohNwBc.js";
import { c as s, i as c, l, s as u, u as d } from "./useConnectionStore-DvIGHfR-.js";
import { t as f } from "./Button-DWa6Ld_Z.js";
import { computed as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, openBlock as x, ref as S, toDisplayString as C, unref as w, watch as T, withCtx as E, withModifiers as D } from "vue";
import { useRoute as O, useRouter as k } from "vue-router";
//#region src/pages/ConnectPage.vue?vue&type=script&setup=true&lang.ts
var A = { class: "auth-page" }, j = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, M = { class: "auth-page__center" }, ee = { class: "connect__hint" }, N = {
	key: 0,
	class: "connect__warning",
	role: "alert"
}, P = {
	key: 2,
	class: "connect__confirm",
	role: "alertdialog"
}, F = { class: "connect__confirm-text" }, I = { class: "connect__confirm-actions" }, L = /*#__PURE__*/ r(/* @__PURE__ */ y({
	__name: "ConnectPage",
	setup(r) {
		let y = a(), L = l(), R = O(), z = k(), { t: B } = o(), V = b("phlixConfig", null), H = p(() => V?.home ?? V?.routerBase ?? "/app"), U = S(""), W = S(null), G = S(!1), K = S(!1), q = S(null), J = p(() => q.value !== null && q.value === u(U.value)), Y = S(null), X = S(null);
		T(U, () => {
			K.value = !1, Y.value = null, X.value = null;
		});
		function Z() {
			let e = R.query.redirect;
			return typeof e == "string" && e ? e : H.value;
		}
		function Q(e) {
			L.setApiBase(e), z.push(Z());
		}
		function $(e) {
			return c(e) && !J.value ? (q.value = u(e), W.value = null, !1) : L.isNewOrigin(e) ? (X.value = e, Y.value = u(e), !1) : (Q(e), !0);
		}
		async function te() {
			W.value = null, K.value = !1, Y.value = null, X.value = null;
			let e = d(U.value);
			if (!e) {
				W.value = U.value.trim() ? B("connect.invalidAddress") : B("connect.addressRequired");
				return;
			}
			if (c(e) && !J.value) {
				q.value = u(e);
				return;
			}
			G.value = !0;
			try {
				await s(e) ? $(e) : (K.value = !0, W.value = B("connect.unreachable"));
			} finally {
				G.value = !1;
			}
		}
		function ne() {
			let e = d(U.value);
			e && $(e);
		}
		function re() {
			let e = X.value;
			Y.value = null, X.value = null, e && Q(e);
		}
		function ie() {
			Y.value = null, X.value = null;
		}
		return (r, a) => (x(), h("div", A, [
			v(t, {
				enabled: w(y).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			w(y).atmosphere ? (x(), h("div", j)) : m("", !0),
			g("div", M, [v(e, {
				eyebrow: w(B)("connect.eyebrow"),
				title: w(B)("connect.title"),
				subtitle: w(B)("connect.subtitle")
			}, {
				default: E(() => [g("form", {
					class: "connect__form",
					novalidate: "",
					onSubmit: D(te, ["prevent"])
				}, [
					v(n, {
						modelValue: U.value,
						"onUpdate:modelValue": a[0] ||= (e) => U.value = e,
						name: "server-address",
						label: w(B)("connect.addressLabel"),
						type: "text",
						inputmode: "url",
						autocomplete: "url",
						placeholder: w(B)("connect.addressPlaceholder"),
						error: W.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					g("p", ee, C(w(B)("connect.hint")), 1),
					J.value && !Y.value ? (x(), h("p", N, [v(i, {
						name: "alert",
						class: "connect__warning-icon"
					}), g("span", null, C(w(B)("connect.plaintextWarning")), 1)])) : m("", !0),
					v(f, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: G.value
					}, {
						default: E(() => [_(C(G.value ? w(B)("connect.connecting") : w(B)("connect.connect")), 1)]),
						_: 1
					}, 8, ["loading"]),
					K.value ? (x(), h("button", {
						key: 1,
						type: "button",
						class: "connect__anyway",
						onClick: ne
					}, [v(i, {
						name: "alert",
						class: "connect__anyway-icon"
					}), g("span", null, C(w(B)("connect.connectAnyway")), 1)])) : m("", !0),
					Y.value ? (x(), h("div", P, [g("p", F, C(w(B)("connect.originConfirm", { origin: Y.value })), 1), g("div", I, [v(f, {
						type: "button",
						variant: "solid",
						size: "md",
						onClick: re
					}, {
						default: E(() => [_(C(w(B)("connect.confirmContinue")), 1)]),
						_: 1
					}), v(f, {
						type: "button",
						variant: "ghost",
						size: "md",
						onClick: ie
					}, {
						default: E(() => [_(C(w(B)("connect.confirmCancel")), 1)]),
						_: 1
					})])])) : m("", !0)
				], 32)]),
				_: 1
			}, 8, [
				"eyebrow",
				"title",
				"subtitle"
			])])
		]));
	}
}), [["__scopeId", "data-v-140b7326"]]);
//#endregion
export { L as default };

//# sourceMappingURL=ConnectPage-qRIeg3qd.js.map