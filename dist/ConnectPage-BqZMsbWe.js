import { i as e, n as t, r as ee, t as n } from "./safeRedirect-Cl7qL5fH.js";
import { t as r } from "./Button-Dfl4y6vO.js";
import { n as i, t as a } from "./Icon-55iG1rR7.js";
import { a as te } from "./usePreferencesStore-DrDMAwjz.js";
import { c as o, i as s, l as ne, s as c, u as l } from "./useConnectionStore-AmsgQivX.js";
import { t as re } from "./useMessages-B96K7XS0.js";
import { Fragment as ie, computed as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, nextTick as v, openBlock as y, ref as b, renderList as ae, toDisplayString as x, unref as S, watch as C, withCtx as w, withModifiers as oe } from "vue";
import { useRoute as se, useRouter as ce } from "vue-router";
// src/pages/ConnectPage.vue?vue&type=script&setup=true&lang.ts
var le = { class: "auth-page" }, ue = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, de = { class: "auth-page__center" }, fe = { class: "connect__hint" }, pe = {
	key: 0,
	class: "connect__scan"
}, me = {
	key: 0,
	class: "connect__scan-note",
	role: "status"
}, he = {
	key: 1,
	class: "connect__scan-note",
	role: "status"
}, ge = ["aria-label"], _e = ["onClick"], T = { class: "connect__scan-url" }, E = {
	key: 0,
	class: "connect__scan-label"
}, D = {
	key: 1,
	class: "connect__warning",
	role: "alert"
}, O = {
	key: 3,
	class: "connect__confirm",
	role: "alertdialog",
	"aria-labelledby": "connect-origin-confirm-text"
}, k = {
	id: "connect-origin-confirm-text",
	class: "connect__confirm-text"
}, A = { class: "connect__confirm-actions" }, j = /*#__PURE__*/ i(/* @__PURE__ */ g({
	__name: "ConnectPage",
	setup(i) {
		let g = te(), j = ne(), M = se(), N = ce(), { t: P } = re(), F = _("phlixConfig", null), I = u(() => F?.home ?? F?.routerBase ?? "/app"), L = b(""), R = b(null), z = b(!1), B = b(!1), V = b(null), H = u(() => V.value !== null && V.value === c(L.value)), U = b(null), W = b(null);
		C(L, () => {
			B.value = !1, U.value = null, W.value = null;
		});
		let G = b(null);
		C(U, async (e) => {
			e && (await v(), (G.value?.$el)?.focus?.());
		});
		function ve() {
			return n(M.query.redirect, F?.routerBase ?? "/app") ?? I.value;
		}
		function K(e) {
			j.setApiBase(e), N.push(ve());
		}
		function q(e) {
			return s(e) && !H.value ? (V.value = c(e), R.value = null, !1) : j.isNewOrigin(e) ? (W.value = e, U.value = c(e), !1) : (K(e), !0);
		}
		async function ye() {
			R.value = null, B.value = !1, U.value = null, W.value = null;
			let e = l(L.value);
			if (!e) R.value = L.value.trim() ? P("connect.invalidAddress") : P("connect.addressRequired");
			else if (s(e) && !H.value) V.value = c(e);
			else {
				z.value = !0;
				try {
					await o(e) ? q(e) : (B.value = !0, R.value = P("connect.unreachable"));
				} finally {
					z.value = !1;
				}
			}
		}
		function be() {
			let e = l(L.value);
			e && q(e);
		}
		function xe() {
			let e = W.value;
			U.value = null, W.value = null, e && K(e);
		}
		function J() {
			U.value = null, W.value = null;
		}
		let Y = u(() => F?.connectScan ?? null), X = b(!1), Z = b(!1), Q = b(!1), $ = b([]);
		async function Se() {
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
		async function Ce(e) {
			L.value = e.url, await v(), R.value = null;
			let t = l(e.url);
			t ? q(t) : R.value = e.url.trim() ? P("connect.invalidAddress") : P("connect.addressRequired");
		}
		return (n, i) => (y(), f("div", le, [
			h(e, {
				enabled: S(g).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			S(g).atmosphere ? (y(), f("div", ue)) : d("", !0),
			p("div", de, [h(ee, {
				eyebrow: S(P)("connect.eyebrow"),
				title: S(P)("connect.title"),
				subtitle: S(P)("connect.subtitle")
			}, {
				default: w(() => [p("form", {
					class: "connect__form",
					novalidate: "",
					onSubmit: oe(ye, ["prevent"])
				}, [
					h(t, {
						modelValue: L.value,
						"onUpdate:modelValue": i[0] ||= (e) => L.value = e,
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
					p("p", fe, x(S(P)("connect.hint")), 1),
					Y.value ? (y(), f("div", pe, [h(r, {
						type: "button",
						variant: "outline",
						size: "md",
						block: "",
						"left-icon": "search",
						loading: X.value,
						onClick: Se
					}, {
						default: w(() => [m(x(X.value ? S(P)("connect.scanning") : S(P)("connect.scan")), 1)]),
						_: 1
					}, 8, ["loading"]), Q.value ? (y(), f("p", me, x(S(P)("connect.scanFailed")), 1)) : Z.value && $.value.length === 0 ? (y(), f("p", he, x(S(P)("connect.scanEmpty")), 1)) : Z.value ? (y(), f("ul", {
						key: 2,
						class: "connect__scan-list",
						"aria-label": S(P)("connect.scanListLabel")
					}, [(y(!0), f(ie, null, ae($.value, (e, t) => (y(), f("li", { key: `${e.url}:${t}` }, [p("button", {
						type: "button",
						class: "connect__scan-row",
						onClick: (t) => Ce(e)
					}, [p("span", T, x(e.url), 1), e.label ? (y(), f("span", E, x(e.label), 1)) : d("", !0)], 8, _e)]))), 128))], 8, ge)) : d("", !0)])) : d("", !0),
					H.value && !U.value ? (y(), f("p", D, [h(a, {
						name: "alert",
						class: "connect__warning-icon"
					}), p("span", null, x(S(P)("connect.plaintextWarning")), 1)])) : d("", !0),
					h(r, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: z.value
					}, {
						default: w(() => [m(x(z.value ? S(P)("connect.connecting") : S(P)("connect.connect")), 1)]),
						_: 1
					}, 8, ["loading"]),
					B.value ? (y(), f("button", {
						key: 2,
						type: "button",
						class: "connect__anyway",
						onClick: be
					}, [h(a, {
						name: "alert",
						class: "connect__anyway-icon"
					}), p("span", null, x(S(P)("connect.connectAnyway")), 1)])) : d("", !0),
					U.value ? (y(), f("div", O, [p("p", k, x(S(P)("connect.originConfirm", { origin: U.value })), 1), p("div", A, [h(r, {
						ref_key: "continueBtnRef",
						ref: G,
						type: "button",
						variant: "solid",
						size: "md",
						onClick: xe
					}, {
						default: w(() => [m(x(S(P)("connect.confirmContinue")), 1)]),
						_: 1
					}, 512), h(r, {
						type: "button",
						variant: "ghost",
						size: "md",
						onClick: J
					}, {
						default: w(() => [m(x(S(P)("connect.confirmCancel")), 1)]),
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
}), [["__scopeId", "data-v-a5258f11"]]);
export { j as default };

//# sourceMappingURL=ConnectPage-BqZMsbWe.js.map