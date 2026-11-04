import { i as e, n as t, r as ee, t as te } from "./safeRedirect-B8La0mAh.js";
import { t as n } from "./Button-BLpPomsd.js";
import { n as r, t as i } from "./Icon-55iG1rR7.js";
import { a as ne } from "./usePreferencesStore-DrDMAwjz.js";
import { c as re, i as a, l as ie, s as o, u as s } from "./useConnectionStore-AmsgQivX.js";
import { t as c } from "./useMessages-ZsJ3YcDm.js";
import { Fragment as l, computed as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, nextTick as ae, openBlock as v, ref as y, renderList as oe, toDisplayString as b, unref as x, watch as se, withCtx as S, withModifiers as ce } from "vue";
import { useRoute as le, useRouter as ue } from "vue-router";
// src/pages/ConnectPage.vue?vue&type=script&setup=true&lang.ts
var de = { class: "auth-page" }, fe = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, pe = { class: "auth-page__center" }, me = { class: "connect__hint" }, he = {
	key: 0,
	class: "connect__scan"
}, ge = {
	key: 0,
	class: "connect__scan-note",
	role: "status"
}, C = {
	key: 1,
	class: "connect__scan-note",
	role: "status"
}, w = ["aria-label"], T = ["onClick"], E = { class: "connect__scan-url" }, D = {
	key: 0,
	class: "connect__scan-label"
}, O = {
	key: 1,
	class: "connect__warning",
	role: "alert"
}, k = {
	key: 3,
	class: "connect__confirm",
	role: "alertdialog"
}, A = { class: "connect__confirm-text" }, j = { class: "connect__confirm-actions" }, M = /*#__PURE__*/ r(/* @__PURE__ */ g({
	__name: "ConnectPage",
	setup(r) {
		let g = ne(), M = ie(), N = le(), P = ue(), { t: F } = c(), I = _("phlixConfig", null), L = u(() => I?.home ?? I?.routerBase ?? "/app"), R = y(""), z = y(null), B = y(!1), V = y(!1), H = y(null), U = u(() => H.value !== null && H.value === o(R.value)), W = y(null), G = y(null);
		se(R, () => {
			V.value = !1, W.value = null, G.value = null;
		});
		function _e() {
			return te(N.query.redirect) ?? L.value;
		}
		function K(e) {
			M.setApiBase(e), P.push(_e());
		}
		function q(e) {
			return a(e) && !U.value ? (H.value = o(e), z.value = null, !1) : M.isNewOrigin(e) ? (G.value = e, W.value = o(e), !1) : (K(e), !0);
		}
		async function ve() {
			z.value = null, V.value = !1, W.value = null, G.value = null;
			let e = s(R.value);
			if (!e) z.value = R.value.trim() ? F("connect.invalidAddress") : F("connect.addressRequired");
			else if (a(e) && !U.value) H.value = o(e);
			else {
				B.value = !0;
				try {
					await re(e) ? q(e) : (V.value = !0, z.value = F("connect.unreachable"));
				} finally {
					B.value = !1;
				}
			}
		}
		function J() {
			let e = s(R.value);
			e && q(e);
		}
		function ye() {
			let e = G.value;
			W.value = null, G.value = null, e && K(e);
		}
		function be() {
			W.value = null, G.value = null;
		}
		let Y = u(() => I?.connectScan ?? null), X = y(!1), Z = y(!1), Q = y(!1), $ = y([]);
		async function xe() {
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
		async function Se(e) {
			R.value = e.url, await ae(), z.value = null;
			let t = s(e.url);
			t ? q(t) : z.value = e.url.trim() ? F("connect.invalidAddress") : F("connect.addressRequired");
		}
		return (te, r) => (v(), f("div", de, [
			h(e, {
				enabled: x(g).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			x(g).atmosphere ? (v(), f("div", fe)) : d("", !0),
			p("div", pe, [h(ee, {
				eyebrow: x(F)("connect.eyebrow"),
				title: x(F)("connect.title"),
				subtitle: x(F)("connect.subtitle")
			}, {
				default: S(() => [p("form", {
					class: "connect__form",
					novalidate: "",
					onSubmit: ce(ve, ["prevent"])
				}, [
					h(t, {
						modelValue: R.value,
						"onUpdate:modelValue": r[0] ||= (e) => R.value = e,
						name: "server-address",
						label: x(F)("connect.addressLabel"),
						type: "text",
						inputmode: "url",
						autocomplete: "url",
						placeholder: x(F)("connect.addressPlaceholder"),
						error: z.value,
						required: ""
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder",
						"error"
					]),
					p("p", me, b(x(F)("connect.hint")), 1),
					Y.value ? (v(), f("div", he, [h(n, {
						type: "button",
						variant: "outline",
						size: "md",
						block: "",
						"left-icon": "search",
						loading: X.value,
						onClick: xe
					}, {
						default: S(() => [m(b(X.value ? x(F)("connect.scanning") : x(F)("connect.scan")), 1)]),
						_: 1
					}, 8, ["loading"]), Q.value ? (v(), f("p", ge, b(x(F)("connect.scanFailed")), 1)) : Z.value && $.value.length === 0 ? (v(), f("p", C, b(x(F)("connect.scanEmpty")), 1)) : Z.value ? (v(), f("ul", {
						key: 2,
						class: "connect__scan-list",
						"aria-label": x(F)("connect.scanListLabel")
					}, [(v(!0), f(l, null, oe($.value, (e, t) => (v(), f("li", { key: `${e.url}:${t}` }, [p("button", {
						type: "button",
						class: "connect__scan-row",
						onClick: (t) => Se(e)
					}, [p("span", E, b(e.url), 1), e.label ? (v(), f("span", D, b(e.label), 1)) : d("", !0)], 8, T)]))), 128))], 8, w)) : d("", !0)])) : d("", !0),
					U.value && !W.value ? (v(), f("p", O, [h(i, {
						name: "alert",
						class: "connect__warning-icon"
					}), p("span", null, b(x(F)("connect.plaintextWarning")), 1)])) : d("", !0),
					h(n, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: B.value
					}, {
						default: S(() => [m(b(B.value ? x(F)("connect.connecting") : x(F)("connect.connect")), 1)]),
						_: 1
					}, 8, ["loading"]),
					V.value ? (v(), f("button", {
						key: 2,
						type: "button",
						class: "connect__anyway",
						onClick: J
					}, [h(i, {
						name: "alert",
						class: "connect__anyway-icon"
					}), p("span", null, b(x(F)("connect.connectAnyway")), 1)])) : d("", !0),
					W.value ? (v(), f("div", k, [p("p", A, b(x(F)("connect.originConfirm", { origin: W.value })), 1), p("div", j, [h(n, {
						type: "button",
						variant: "solid",
						size: "md",
						onClick: ye
					}, {
						default: S(() => [m(b(x(F)("connect.confirmContinue")), 1)]),
						_: 1
					}), h(n, {
						type: "button",
						variant: "ghost",
						size: "md",
						onClick: be
					}, {
						default: S(() => [m(b(x(F)("connect.confirmCancel")), 1)]),
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
}), [["__scopeId", "data-v-f0760ee9"]]);
export { M as default };

//# sourceMappingURL=ConnectPage-Dos7m0aG.js.map