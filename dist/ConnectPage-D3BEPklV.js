import { n as e, r as t, t as ee } from "./AuthField-D69nDXtI.js";
import { n, t as r } from "./Icon-CIwTuFLd.js";
import { a as i } from "./usePreferencesStore-CFPikE8Z.js";
import { t as te } from "./useMessages-D3tJ-unA.js";
import { t as a } from "./Button-BuG0GvCa.js";
import { c as o, i as s, l as c, s as l, u } from "./useConnectionStore-DvIGHfR-.js";
import { Fragment as ne, computed as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as re, nextTick as ie, openBlock as v, ref as y, renderList as ae, toDisplayString as b, unref as x, watch as oe, withCtx as S, withModifiers as se } from "vue";
import { useRoute as ce, useRouter as le } from "vue-router";
//#region src/pages/ConnectPage.vue?vue&type=script&setup=true&lang.ts
var ue = { class: "auth-page" }, C = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, de = { class: "auth-page__center" }, w = { class: "connect__hint" }, fe = {
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
}, j = { class: "connect__confirm-text" }, M = { class: "connect__confirm-actions" }, N = /*#__PURE__*/ n(/* @__PURE__ */ _({
	__name: "ConnectPage",
	setup(n) {
		let _ = i(), N = c(), P = ce(), F = le(), { t: I } = te(), L = re("phlixConfig", null), R = d(() => L?.home ?? L?.routerBase ?? "/app"), z = y(""), B = y(null), V = y(!1), H = y(!1), U = y(null), W = d(() => U.value !== null && U.value === l(z.value)), G = y(null), K = y(null);
		oe(z, () => {
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
			if (!e) {
				B.value = z.value.trim() ? I("connect.invalidAddress") : I("connect.addressRequired");
				return;
			}
			if (s(e) && !W.value) {
				U.value = l(e);
				return;
			}
			V.value = !0;
			try {
				await o(e) ? J(e) : (H.value = !0, B.value = I("connect.unreachable"));
			} finally {
				V.value = !1;
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
		let Y = d(() => L?.connectScan ?? null), X = y(!1), Z = y(!1), Q = y(!1), $ = y([]);
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
			z.value = e.url, await ie(), B.value = null;
			let t = u(e.url);
			if (!t) {
				B.value = e.url.trim() ? I("connect.invalidAddress") : I("connect.addressRequired");
				return;
			}
			J(t);
		}
		return (n, i) => (v(), p("div", ue, [
			g(t, {
				enabled: x(_).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			x(_).atmosphere ? (v(), p("div", C)) : f("", !0),
			m("div", de, [g(e, {
				eyebrow: x(I)("connect.eyebrow"),
				title: x(I)("connect.title"),
				subtitle: x(I)("connect.subtitle")
			}, {
				default: S(() => [m("form", {
					class: "connect__form",
					novalidate: "",
					onSubmit: se(ge, ["prevent"])
				}, [
					g(ee, {
						modelValue: z.value,
						"onUpdate:modelValue": i[0] ||= (e) => z.value = e,
						name: "server-address",
						label: x(I)("connect.addressLabel"),
						type: "text",
						inputmode: "url",
						autocomplete: "url",
						placeholder: x(I)("connect.addressPlaceholder"),
						error: B.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					m("p", w, b(x(I)("connect.hint")), 1),
					Y.value ? (v(), p("div", fe, [g(a, {
						type: "button",
						variant: "outline",
						size: "md",
						block: "",
						"left-icon": "search",
						loading: X.value,
						onClick: be
					}, {
						default: S(() => [h(b(X.value ? x(I)("connect.scanning") : x(I)("connect.scan")), 1)]),
						_: 1
					}, 8, ["loading"]), Q.value ? (v(), p("p", pe, b(x(I)("connect.scanFailed")), 1)) : Z.value && $.value.length === 0 ? (v(), p("p", me, b(x(I)("connect.scanEmpty")), 1)) : Z.value ? (v(), p("ul", {
						key: 2,
						class: "connect__scan-list",
						"aria-label": x(I)("connect.scanListLabel")
					}, [(v(!0), p(ne, null, ae($.value, (e, t) => (v(), p("li", { key: `${e.url}:${t}` }, [m("button", {
						type: "button",
						class: "connect__scan-row",
						onClick: (t) => xe(e)
					}, [m("span", D, b(e.url), 1), e.label ? (v(), p("span", O, b(e.label), 1)) : f("", !0)], 8, E)]))), 128))], 8, T)) : f("", !0)])) : f("", !0),
					W.value && !G.value ? (v(), p("p", k, [g(r, {
						name: "alert",
						class: "connect__warning-icon"
					}), m("span", null, b(x(I)("connect.plaintextWarning")), 1)])) : f("", !0),
					g(a, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: V.value
					}, {
						default: S(() => [h(b(V.value ? x(I)("connect.connecting") : x(I)("connect.connect")), 1)]),
						_: 1
					}, 8, ["loading"]),
					H.value ? (v(), p("button", {
						key: 2,
						type: "button",
						class: "connect__anyway",
						onClick: _e
					}, [g(r, {
						name: "alert",
						class: "connect__anyway-icon"
					}), m("span", null, b(x(I)("connect.connectAnyway")), 1)])) : f("", !0),
					G.value ? (v(), p("div", A, [m("p", j, b(x(I)("connect.originConfirm", { origin: G.value })), 1), m("div", M, [g(a, {
						type: "button",
						variant: "solid",
						size: "md",
						onClick: ve
					}, {
						default: S(() => [h(b(x(I)("connect.confirmContinue")), 1)]),
						_: 1
					}), g(a, {
						type: "button",
						variant: "ghost",
						size: "md",
						onClick: ye
					}, {
						default: S(() => [h(b(x(I)("connect.confirmCancel")), 1)]),
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
//#endregion
export { N as default };

//# sourceMappingURL=ConnectPage-D3BEPklV.js.map