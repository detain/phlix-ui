import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, t as r } from "./client-CZc6ehUa.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-k7aQagzg.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { t as l } from "./services-C907MGdw.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, onMounted as b, openBlock as x, ref as S, toDisplayString as C, withCtx as w } from "vue";
import { useRoute as T, useRouter as E } from "vue-router";
//#region src/pages/admin/ServicesPage.vue?vue&type=script&setup=true&lang.ts
var ee = {
	class: "admin-services",
	"aria-labelledby": "services-heading"
}, te = {
	class: "admin-services__section",
	"aria-labelledby": "trakt-heading"
}, ne = { class: "admin-services__section-head" }, re = { class: "admin-services__card" }, ie = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, ae = {
	key: 0,
	class: "admin-services__dl"
}, D = {
	key: 1,
	class: "admin-services__hint"
}, O = { class: "admin-services__actions" }, k = {
	class: "admin-services__section",
	"aria-labelledby": "lastfm-heading"
}, A = { class: "admin-services__section-head" }, j = { class: "admin-services__card" }, M = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, N = {
	key: 0,
	class: "admin-services__dl"
}, oe = {
	key: 1,
	class: "admin-services__hint"
}, P = { class: "admin-services__actions" }, F = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "ServicesPage",
	props: { client: {} },
	setup(e) {
		let v = e, F = y("apiBase", ""), I = d(() => typeof F == "string" ? F : F?.value ?? ""), L = new l(v.client ?? new r({
			baseUrl: I.value,
			tokenStore: new t()
		})), R = i(), z = T(), B = E(), V = S(null), H = S(!0), U = S(null), W = S(!1), G = d(() => V.value?.configured === !1);
		async function K() {
			H.value = !0, U.value = null;
			try {
				V.value = await L.getTraktStatus();
			} catch (e) {
				U.value = n(e, "Failed to load Trakt status."), R.error(U.value);
			} finally {
				H.value = !1;
			}
		}
		function se() {
			L.navigateToTraktAuthorize();
		}
		async function ce() {
			if (!W.value) {
				W.value = !0;
				try {
					await L.disconnectTrakt(), R.success("Trakt disconnected."), await K();
				} catch (e) {
					R.error(n(e, "Failed to disconnect Trakt."));
				} finally {
					W.value = !1;
				}
			}
		}
		let q = S(null), J = S(!0), Y = S(null), X = S(!1), Z = d(() => q.value?.api_key_set === !1);
		async function Q() {
			J.value = !0, Y.value = null;
			try {
				q.value = await L.getLastfmStatus();
			} catch (e) {
				Y.value = n(e, "Failed to load Last.fm status."), R.error(Y.value);
			} finally {
				J.value = !1;
			}
		}
		function le() {
			L.navigateToLastfmConnect();
		}
		async function ue() {
			if (!X.value) {
				X.value = !0;
				try {
					await L.disconnectLastfm(), R.success("Last.fm disconnected."), await Q();
				} catch (e) {
					R.error(n(e, "Failed to disconnect Last.fm."));
				} finally {
					X.value = !1;
				}
			}
		}
		function de(e) {
			let t = z?.query?.[e], n = Array.isArray(t) ? t[0] : t;
			return typeof n == "string" ? n : void 0;
		}
		function fe(e) {
			if (!z || !B) return;
			let t = { ...z.query };
			delete t[e], B.replace({ query: t });
		}
		async function $(e, t) {
			let n = de(e);
			if (n === void 0) return;
			let r = e === "lastfm" ? "Last.fm" : "Trakt";
			n === "connected" ? R.success(`${r} connected.`) : n === "not_configured" ? R.error(e === "lastfm" ? "Add a Last.fm API key first." : "Add Trakt client ID and secret first.") : R.error(`${r} connection failed, please try again.`), fe(e), await t();
		}
		return b(() => {
			K(), Q(), $("lastfm", Q), $("trakt", K);
		}), (e, t) => (x(), m("section", ee, [
			t[11] ||= h("header", { class: "admin-services__head" }, [h("h1", {
				id: "services-heading",
				class: "admin-services__title"
			}, "Services")], -1),
			h("section", te, [h("div", ne, [t[0] ||= h("h2", {
				id: "trakt-heading",
				class: "admin-services__section-title"
			}, "Trakt.tv", -1), V.value === null ? p("", !0) : (x(), f(o, {
				key: 0,
				tone: V.value.connected ? "success" : "neutral",
				label: V.value.connected ? "Connected" : "Not connected"
			}, {
				default: w(() => [g(C(V.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), h("div", re, [H.value ? (x(), m("div", ie, [_(s, {
				variant: "text",
				lines: 2
			})])) : V.value === null ? (x(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Trakt",
				description: U.value ?? void 0
			}, {
				actions: w(() => [_(a, {
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
				V.value.connected && V.value.username !== null ? (x(), m("dl", ae, [t[2] ||= h("dt", null, "Username", -1), h("dd", null, C(V.value.username), 1)])) : p("", !0),
				!V.value.connected && G.value ? (x(), m("p", D, [...t[3] ||= [
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
				h("div", O, [V.value.connected ? (x(), f(a, {
					key: 1,
					variant: "outline",
					loading: W.value,
					onClick: ce
				}, {
					default: w(() => [g(C(W.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (x(), f(a, {
					key: 0,
					variant: "solid",
					disabled: G.value,
					title: G.value ? "Add Trakt client ID and secret first" : void 0,
					onClick: se
				}, {
					default: w(() => [...t[4] ||= [g(" Connect to Trakt ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])]),
			h("section", k, [h("div", A, [t[5] ||= h("h2", {
				id: "lastfm-heading",
				class: "admin-services__section-title"
			}, "Last.fm", -1), q.value === null ? p("", !0) : (x(), f(o, {
				key: 0,
				tone: q.value.connected ? "success" : "neutral",
				label: q.value.connected ? "Connected" : "Not connected"
			}, {
				default: w(() => [g(C(q.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), h("div", j, [J.value ? (x(), m("div", M, [_(s, {
				variant: "text",
				lines: 2
			})])) : q.value === null ? (x(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Last.fm",
				description: Y.value ?? void 0
			}, {
				actions: w(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: w(() => [...t[6] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (x(), m(u, { key: 2 }, [
				q.value.connected && q.value.username !== null ? (x(), m("dl", N, [
					t[7] ||= h("dt", null, "Username", -1),
					h("dd", null, C(q.value.username), 1),
					t[8] ||= h("dt", null, "API key", -1),
					h("dd", null, C(q.value.api_key_set ? "Set" : "Not set"), 1)
				])) : p("", !0),
				!q.value.connected && Z.value ? (x(), m("p", oe, [...t[9] ||= [
					g(" Last.fm isn't configured yet. Register an API account at ", -1),
					h("a", {
						href: "https://www.last.fm/api/account/create",
						target: "_blank",
						rel: "noopener noreferrer"
					}, "last.fm/api/account/create", -1),
					g(", then add the Last.fm API key and secret in Settings or via the ", -1),
					h("code", null, "LASTFM_API_KEY", -1),
					g(" / ", -1),
					h("code", null, "LASTFM_API_SECRET", -1),
					g(" environment variables. ", -1)
				]])) : p("", !0),
				h("div", P, [q.value.connected ? (x(), f(a, {
					key: 1,
					variant: "outline",
					loading: X.value,
					onClick: ue
				}, {
					default: w(() => [g(C(X.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (x(), f(a, {
					key: 0,
					variant: "solid",
					disabled: Z.value,
					title: Z.value ? "Add a Last.fm API key first" : void 0,
					onClick: le
				}, {
					default: w(() => [...t[10] ||= [g(" Connect Last.fm ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])])
		]));
	}
}), [["__scopeId", "data-v-c85fc3fe"]]);
//#endregion
export { F as default };

//# sourceMappingURL=ServicesPage-Dy7_4cjt.js.map