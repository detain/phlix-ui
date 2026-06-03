import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, n, t as r } from "./Button-BFaMKqH5.js";
import { t as i } from "./tokenStore-CGMYSpg6.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { n as s, t as c } from "./EmptyState-Ds4WcVdG.js";
import { t as l } from "./services-Czm8hsvH.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, onMounted as b, openBlock as x, ref as S, toDisplayString as C, withCtx as w } from "vue";
//#region src/pages/admin/ServicesPage.vue?vue&type=script&setup=true&lang.ts
var T = {
	class: "admin-services",
	"aria-labelledby": "services-heading"
}, E = {
	class: "admin-services__section",
	"aria-labelledby": "trakt-heading"
}, D = { class: "admin-services__section-head" }, O = { class: "admin-services__card" }, k = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, A = {
	key: 0,
	class: "admin-services__dl"
}, j = {
	key: 1,
	class: "admin-services__hint"
}, ee = { class: "admin-services__actions" }, te = {
	class: "admin-services__section",
	"aria-labelledby": "lastfm-heading"
}, M = { class: "admin-services__section-head" }, N = { class: "admin-services__card" }, P = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, F = {
	key: 0,
	class: "admin-services__dl"
}, I = { class: "admin-services__actions" }, L = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "ServicesPage",
	props: { client: {} },
	setup(e) {
		let v = e, L = y("apiBase", ""), R = d(() => typeof L == "string" ? L : L?.value ?? ""), z = new l(v.client ?? new n({
			baseUrl: R.value,
			tokenStore: new i()
		})), B = o(), V = S(null), H = S(!0), U = S(null), W = S(!1), G = d(() => V.value?.configured === !1);
		async function K() {
			H.value = !0, U.value = null;
			try {
				V.value = await z.getTraktStatus();
			} catch (e) {
				U.value = t(e, "Failed to load Trakt status."), B.error(U.value);
			} finally {
				H.value = !1;
			}
		}
		function q() {
			z.navigateToTraktAuthorize();
		}
		async function J() {
			if (!W.value) {
				W.value = !0;
				try {
					await z.disconnectTrakt(), B.success("Trakt disconnected."), await K();
				} catch (e) {
					B.error(t(e, "Failed to disconnect Trakt."));
				} finally {
					W.value = !1;
				}
			}
		}
		let Y = S(null), X = S(!0), Z = S(null), Q = S(!1);
		async function $() {
			X.value = !0, Z.value = null;
			try {
				Y.value = await z.getLastfmStatus();
			} catch (e) {
				Z.value = t(e, "Failed to load Last.fm status."), B.error(Z.value);
			} finally {
				X.value = !1;
			}
		}
		function ne() {
			z.navigateToLastfmConnect();
		}
		async function re() {
			if (!Q.value) {
				Q.value = !0;
				try {
					await z.disconnectLastfm(), B.success("Last.fm disconnected."), await $();
				} catch (e) {
					B.error(t(e, "Failed to disconnect Last.fm."));
				} finally {
					Q.value = !1;
				}
			}
		}
		return b(() => {
			K(), $();
		}), (e, t) => (x(), m("section", T, [
			t[10] ||= h("header", { class: "admin-services__head" }, [h("h1", {
				id: "services-heading",
				class: "admin-services__title"
			}, "Services")], -1),
			h("section", E, [h("div", D, [t[0] ||= h("h2", {
				id: "trakt-heading",
				class: "admin-services__section-title"
			}, "Trakt.tv", -1), V.value === null ? p("", !0) : (x(), f(a, {
				key: 0,
				tone: V.value.connected ? "success" : "neutral",
				label: V.value.connected ? "Connected" : "Not connected"
			}, {
				default: w(() => [g(C(V.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), h("div", O, [H.value ? (x(), m("div", k, [_(s, {
				variant: "text",
				lines: 2
			})])) : V.value === null ? (x(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Trakt",
				description: U.value ?? void 0
			}, {
				actions: w(() => [_(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: w(() => [...t[1] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (x(), m(u, { key: 2 }, [
				V.value.connected && V.value.username !== null ? (x(), m("dl", A, [t[2] ||= h("dt", null, "Username", -1), h("dd", null, C(V.value.username), 1)])) : p("", !0),
				!V.value.connected && G.value ? (x(), m("p", j, [...t[3] ||= [
					g(" Trakt isn't configured yet. Register an application at ", -1),
					h("a", {
						href: "https://trakt.tv/oauth/applications",
						target: "_blank",
						rel: "noopener noreferrer"
					}, "trakt.tv/oauth/applications", -1),
					g(" (set its redirect URI to this server's ", -1),
					h("code", null, "/api/v1/oauth/trakt/callback", -1),
					g("), then add the client ID and secret in Settings or via the ", -1),
					h("code", null, "TRAKT_CLIENT_ID", -1),
					g(" / ", -1),
					h("code", null, "TRAKT_CLIENT_SECRET", -1),
					g(" environment variables. ", -1)
				]])) : p("", !0),
				h("div", ee, [V.value.connected ? (x(), f(r, {
					key: 1,
					variant: "outline",
					loading: W.value,
					onClick: J
				}, {
					default: w(() => [g(C(W.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (x(), f(r, {
					key: 0,
					variant: "solid",
					disabled: G.value,
					title: G.value ? "Add Trakt client ID and secret first" : void 0,
					onClick: q
				}, {
					default: w(() => [...t[4] ||= [g(" Connect to Trakt ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])]),
			h("section", te, [h("div", M, [t[5] ||= h("h2", {
				id: "lastfm-heading",
				class: "admin-services__section-title"
			}, "Last.fm", -1), Y.value === null ? p("", !0) : (x(), f(a, {
				key: 0,
				tone: Y.value.connected ? "success" : "neutral",
				label: Y.value.connected ? "Connected" : "Not connected"
			}, {
				default: w(() => [g(C(Y.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), h("div", N, [X.value ? (x(), m("div", P, [_(s, {
				variant: "text",
				lines: 2
			})])) : Y.value === null ? (x(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Last.fm",
				description: Z.value ?? void 0
			}, {
				actions: w(() => [_(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: w(() => [...t[6] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (x(), m(u, { key: 2 }, [Y.value.connected && Y.value.username !== null ? (x(), m("dl", F, [
				t[7] ||= h("dt", null, "Username", -1),
				h("dd", null, C(Y.value.username), 1),
				t[8] ||= h("dt", null, "API key", -1),
				h("dd", null, C(Y.value.api_key_set ? "Set" : "Not set"), 1)
			])) : p("", !0), h("div", I, [Y.value.connected ? (x(), f(r, {
				key: 1,
				variant: "outline",
				loading: Q.value,
				onClick: re
			}, {
				default: w(() => [g(C(Q.value ? "Disconnecting" : "Disconnect"), 1)]),
				_: 1
			}, 8, ["loading"])) : (x(), f(r, {
				key: 0,
				variant: "solid",
				onClick: ne
			}, {
				default: w(() => [...t[9] ||= [g(" Connect Last.fm ", -1)]]),
				_: 1
			}))])], 64))])])
		]));
	}
}), [["__scopeId", "data-v-7dcbc386"]]);
//#endregion
export { L as default };

//# sourceMappingURL=ServicesPage-Bq_rvKfP.js.map