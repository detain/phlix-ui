import { n as e, r as t, t as n } from "./AuthField-DrOuBGzc.js";
import { t as r } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as i } from "./Icon-BlNXxmNP.js";
import { a } from "./usePreferencesStore-CFPikE8Z.js";
import { t as ee } from "./useMessages-CzF8Lxyp.js";
import { c as te, i as o, l as ne, s, u as c } from "./useConnectionStore-DvIGHfR-.js";
import { t as l } from "./Button-BL3fV7FU.js";
import { Fragment as re, computed as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, nextTick as ie, openBlock as v, ref as y, renderList as ae, toDisplayString as b, unref as x, watch as oe, withCtx as S, withModifiers as se } from "vue";
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
}, j = { class: "connect__confirm-text" }, M = { class: "connect__confirm-actions" }, N = /*#__PURE__*/ r(/* @__PURE__ */ g({
	__name: "ConnectPage",
	setup(r) {
		let g = a(), N = ne(), P = ce(), F = le(), { t: I } = ee(), L = _("phlixConfig", null), R = u(() => L?.home ?? L?.routerBase ?? "/app"), z = y(""), B = y(null), V = y(!1), H = y(!1), U = y(null), W = u(() => U.value !== null && U.value === s(z.value)), G = y(null), K = y(null);
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
			return o(e) && !W.value ? (U.value = s(e), B.value = null, !1) : N.isNewOrigin(e) ? (K.value = e, G.value = s(e), !1) : (q(e), !0);
		}
		async function ge() {
			B.value = null, H.value = !1, G.value = null, K.value = null;
			let e = c(z.value);
			if (!e) {
				B.value = z.value.trim() ? I("connect.invalidAddress") : I("connect.addressRequired");
				return;
			}
			if (o(e) && !W.value) {
				U.value = s(e);
				return;
			}
			V.value = !0;
			try {
				await te(e) ? J(e) : (H.value = !0, B.value = I("connect.unreachable"));
			} finally {
				V.value = !1;
			}
		}
		function _e() {
			let e = c(z.value);
			e && J(e);
		}
		function ve() {
			let e = K.value;
			G.value = null, K.value = null, e && q(e);
		}
		function ye() {
			G.value = null, K.value = null;
		}
		let Y = u(() => L?.connectScan ?? null), X = y(!1), Z = y(!1), Q = y(!1), $ = y([]);
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
			let t = c(e.url);
			if (!t) {
				B.value = e.url.trim() ? I("connect.invalidAddress") : I("connect.addressRequired");
				return;
			}
			J(t);
		}
		return (r, a) => (v(), f("div", ue, [
			h(t, {
				enabled: x(g).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			x(g).atmosphere ? (v(), f("div", C)) : d("", !0),
			p("div", de, [h(e, {
				eyebrow: x(I)("connect.eyebrow"),
				title: x(I)("connect.title"),
				subtitle: x(I)("connect.subtitle")
			}, {
				default: S(() => [p("form", {
					class: "connect__form",
					novalidate: "",
					onSubmit: se(ge, ["prevent"])
				}, [
					h(n, {
						modelValue: z.value,
						"onUpdate:modelValue": a[0] ||= (e) => z.value = e,
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
					p("p", w, b(x(I)("connect.hint")), 1),
					Y.value ? (v(), f("div", fe, [h(l, {
						type: "button",
						variant: "outline",
						size: "md",
						block: "",
						"left-icon": "search",
						loading: X.value,
						onClick: be
					}, {
						default: S(() => [m(b(X.value ? x(I)("connect.scanning") : x(I)("connect.scan")), 1)]),
						_: 1
					}, 8, ["loading"]), Q.value ? (v(), f("p", pe, b(x(I)("connect.scanFailed")), 1)) : Z.value && $.value.length === 0 ? (v(), f("p", me, b(x(I)("connect.scanEmpty")), 1)) : Z.value ? (v(), f("ul", {
						key: 2,
						class: "connect__scan-list",
						"aria-label": x(I)("connect.scanListLabel")
					}, [(v(!0), f(re, null, ae($.value, (e, t) => (v(), f("li", { key: `${e.url}:${t}` }, [p("button", {
						type: "button",
						class: "connect__scan-row",
						onClick: (t) => xe(e)
					}, [p("span", D, b(e.url), 1), e.label ? (v(), f("span", O, b(e.label), 1)) : d("", !0)], 8, E)]))), 128))], 8, T)) : d("", !0)])) : d("", !0),
					W.value && !G.value ? (v(), f("p", k, [h(i, {
						name: "alert",
						class: "connect__warning-icon"
					}), p("span", null, b(x(I)("connect.plaintextWarning")), 1)])) : d("", !0),
					h(l, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: V.value
					}, {
						default: S(() => [m(b(V.value ? x(I)("connect.connecting") : x(I)("connect.connect")), 1)]),
						_: 1
					}, 8, ["loading"]),
					H.value ? (v(), f("button", {
						key: 2,
						type: "button",
						class: "connect__anyway",
						onClick: _e
					}, [h(i, {
						name: "alert",
						class: "connect__anyway-icon"
					}), p("span", null, b(x(I)("connect.connectAnyway")), 1)])) : d("", !0),
					G.value ? (v(), f("div", A, [p("p", j, b(x(I)("connect.originConfirm", { origin: G.value })), 1), p("div", M, [h(l, {
						type: "button",
						variant: "solid",
						size: "md",
						onClick: ve
					}, {
						default: S(() => [m(b(x(I)("connect.confirmContinue")), 1)]),
						_: 1
					}), h(l, {
						type: "button",
						variant: "ghost",
						size: "md",
						onClick: ye
					}, {
						default: S(() => [m(b(x(I)("connect.confirmCancel")), 1)]),
						_: 1
					})])])) : d("", !0)
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

//# sourceMappingURL=ConnectPage-B2aN1-1X.js.map