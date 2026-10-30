import { n as e, r as t, t as n } from "./AuthField-CDCdQLi5.js";
import { t as r } from "./Button-1sKEdGjj.js";
import { n as i, t as a } from "./Icon-CIbfiPrs.js";
import { a as o } from "./usePreferencesStore-DrDMAwjz.js";
import { c as ee, i as s, l as c, s as l, u } from "./useConnectionStore-AmsgQivX.js";
import { t as te } from "./useMessages-DrceiftD.js";
import { Fragment as ne, computed as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, nextTick as y, openBlock as b, ref as x, renderList as re, toDisplayString as S, unref as C, watch as ie, withCtx as w, withModifiers as ae } from "vue";
import { useRoute as oe, useRouter as se } from "vue-router";
// src/pages/ConnectPage.vue?vue&type=script&setup=true&lang.ts
var ce = { class: "auth-page" }, le = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, ue = { class: "auth-page__center" }, de = { class: "connect__hint" }, fe = {
	key: 0,
	class: "connect__scan"
}, pe = {
	key: 0,
	class: "connect__scan-note",
	role: "status"
}, me = {
	key: 1,
	class: "connect__scan-note",
	role: "status"
}, T = ["aria-label"], E = ["onClick"], D = { class: "connect__scan-url" }, O = {
	key: 0,
	class: "connect__scan-label"
}, k = {
	key: 1,
	class: "connect__warning",
	role: "alert"
}, A = {
	key: 3,
	class: "connect__confirm",
	role: "alertdialog"
}, j = { class: "connect__confirm-text" }, M = { class: "connect__confirm-actions" }, N = /*#__PURE__*/ i(/* @__PURE__ */ _({
	__name: "ConnectPage",
	setup(i) {
		let _ = o(), N = c(), P = oe(), F = se(), { t: I } = te(), L = v("phlixConfig", null), R = d(() => L?.home ?? L?.routerBase ?? "/app"), z = x(""), B = x(null), V = x(!1), H = x(!1), U = x(null), W = d(() => U.value !== null && U.value === l(z.value)), G = x(null), K = x(null);
		ie(z, () => {
			H.value = !1, G.value = null, K.value = null;
		});
		function he() {
			let e = P.query.redirect;
			return typeof e == "string" && e ? e : R.value;
		}
		function q(e) {
			N.setApiBase(e), F.push(he());
		}
		function J(e) {
			return s(e) && !W.value ? (U.value = l(e), B.value = null, !1) : N.isNewOrigin(e) ? (K.value = e, G.value = l(e), !1) : (q(e), !0);
		}
		async function ge() {
			B.value = null, H.value = !1, G.value = null, K.value = null;
			let e = u(z.value);
			if (!e) B.value = z.value.trim() ? I("connect.invalidAddress") : I("connect.addressRequired");
			else if (s(e) && !W.value) U.value = l(e);
			else {
				V.value = !0;
				try {
					await ee(e) ? J(e) : (H.value = !0, B.value = I("connect.unreachable"));
				} finally {
					V.value = !1;
				}
			}
		}
		function _e() {
			let e = u(z.value);
			e && J(e);
		}
		function ve() {
			let e = K.value;
			G.value = null, K.value = null, e && q(e);
		}
		function ye() {
			G.value = null, K.value = null;
		}
		let Y = d(() => L?.connectScan ?? null), X = x(!1), Z = x(!1), Q = x(!1), $ = x([]);
		async function be() {
			let e = Y.value;
			if (e) {
				X.value = !0, Q.value = !1, $.value = [];
				try {
					$.value = await e(), Z.value = !0;
				} catch {
					Q.value = !0;
				} finally {
					X.value = !1;
				}
			}
		}
		async function xe(e) {
			z.value = e.url, await y(), B.value = null;
			let t = u(e.url);
			t ? J(t) : B.value = e.url.trim() ? I("connect.invalidAddress") : I("connect.addressRequired");
		}
		return (i, o) => (b(), p("div", ce, [
			g(t, {
				enabled: C(_).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			C(_).atmosphere ? (b(), p("div", le)) : f("", !0),
			m("div", ue, [g(e, {
				eyebrow: C(I)("connect.eyebrow"),
				title: C(I)("connect.title"),
				subtitle: C(I)("connect.subtitle")
			}, {
				default: w(() => [m("form", {
					class: "connect__form",
					novalidate: "",
					onSubmit: ae(ge, ["prevent"])
				}, [
					g(n, {
						modelValue: z.value,
						"onUpdate:modelValue": o[0] ||= (e) => z.value = e,
						name: "server-address",
						label: C(I)("connect.addressLabel"),
						type: "text",
						inputmode: "url",
						autocomplete: "url",
						placeholder: C(I)("connect.addressPlaceholder"),
						error: B.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					m("p", de, S(C(I)("connect.hint")), 1),
					Y.value ? (b(), p("div", fe, [g(r, {
						type: "button",
						variant: "outline",
						size: "md",
						block: "",
						"left-icon": "search",
						loading: X.value,
						onClick: be
					}, {
						default: w(() => [h(S(X.value ? C(I)("connect.scanning") : C(I)("connect.scan")), 1)]),
						_: 1
					}, 8, ["loading"]), Q.value ? (b(), p("p", pe, S(C(I)("connect.scanFailed")), 1)) : Z.value && $.value.length === 0 ? (b(), p("p", me, S(C(I)("connect.scanEmpty")), 1)) : Z.value ? (b(), p("ul", {
						key: 2,
						class: "connect__scan-list",
						"aria-label": C(I)("connect.scanListLabel")
					}, [(b(!0), p(ne, null, re($.value, (e, t) => (b(), p("li", { key: `${e.url}:${t}` }, [m("button", {
						type: "button",
						class: "connect__scan-row",
						onClick: (t) => xe(e)
					}, [m("span", D, S(e.url), 1), e.label ? (b(), p("span", O, S(e.label), 1)) : f("", !0)], 8, E)]))), 128))], 8, T)) : f("", !0)])) : f("", !0),
					W.value && !G.value ? (b(), p("p", k, [g(a, {
						name: "alert",
						class: "connect__warning-icon"
					}), m("span", null, S(C(I)("connect.plaintextWarning")), 1)])) : f("", !0),
					g(r, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: V.value
					}, {
						default: w(() => [h(S(V.value ? C(I)("connect.connecting") : C(I)("connect.connect")), 1)]),
						_: 1
					}, 8, ["loading"]),
					H.value ? (b(), p("button", {
						key: 2,
						type: "button",
						class: "connect__anyway",
						onClick: _e
					}, [g(a, {
						name: "alert",
						class: "connect__anyway-icon"
					}), m("span", null, S(C(I)("connect.connectAnyway")), 1)])) : f("", !0),
					G.value ? (b(), p("div", A, [m("p", j, S(C(I)("connect.originConfirm", { origin: G.value })), 1), m("div", M, [g(r, {
						type: "button",
						variant: "solid",
						size: "md",
						onClick: ve
					}, {
						default: w(() => [h(S(C(I)("connect.confirmContinue")), 1)]),
						_: 1
					}), g(r, {
						type: "button",
						variant: "ghost",
						size: "md",
						onClick: ye
					}, {
						default: w(() => [h(S(C(I)("connect.confirmCancel")), 1)]),
						_: 1
					})])])) : f("", !0)
				], 32)]),
				_: 1
			}, 8, [
				"eyebrow",
				"title",
				"subtitle"
			])])
		]));
	}
}), [["__scopeId", "data-v-eb1272ae"]]);
export { N as default };

//# sourceMappingURL=ConnectPage-BMaICQ7m.js.map