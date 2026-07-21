import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D80As4Gx.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as o } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-ZlI5t4KT.js";
import { t as te } from "./PageHint-BoAlFFBN.js";
import { t as c } from "./services-C907MGdw.js";
import { t as l } from "./helpLinks-BI4oN4Or.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, onMounted as b, openBlock as x, ref as S, toDisplayString as C, unref as w, withCtx as T } from "vue";
import { useRoute as ne, useRouter as E } from "vue-router";
//#region src/pages/admin/ServicesPage.vue?vue&type=script&setup=true&lang.ts
var re = {
	class: "admin-services",
	"aria-labelledby": "services-heading"
}, ie = {
	class: "admin-services__section",
	"aria-labelledby": "trakt-heading"
}, ae = { class: "admin-services__section-head" }, oe = { class: "admin-services__card" }, D = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, O = {
	key: 0,
	class: "admin-services__dl"
}, k = {
	key: 1,
	class: "admin-services__hint"
}, A = { class: "admin-services__actions" }, j = {
	class: "admin-services__section",
	"aria-labelledby": "lastfm-heading"
}, M = { class: "admin-services__section-head" }, se = { class: "admin-services__card" }, ce = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, le = {
	key: 0,
	class: "admin-services__dl"
}, N = {
	key: 1,
	class: "admin-services__hint"
}, P = { class: "admin-services__actions" }, F = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "ServicesPage",
	props: { client: {} },
	setup(e) {
		let v = e, F = y("apiBase", ""), I = d(() => typeof F == "string" ? F : F?.value ?? ""), L = new c(v.client ?? new r({
			baseUrl: I.value,
			tokenStore: new t()
		})), R = ee(), z = ne(), B = E(), V = S(null), H = S(!0), U = S(null), W = S(!1), G = d(() => V.value?.configured === !1);
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
		function ue() {
			L.navigateToTraktAuthorize();
		}
		async function de() {
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
		function fe() {
			L.navigateToLastfmConnect();
		}
		async function pe() {
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
		function me(e) {
			let t = z?.query?.[e], n = Array.isArray(t) ? t[0] : t;
			return typeof n == "string" ? n : void 0;
		}
		function he(e) {
			if (!z || !B) return;
			let t = { ...z.query };
			delete t[e], B.replace({ query: t });
		}
		async function $(e, t) {
			let n = me(e);
			if (n === void 0) return;
			let r = e === "lastfm" ? "Last.fm" : "Trakt";
			n === "connected" ? R.success(`${r} connected.`) : n === "not_configured" ? R.error(e === "lastfm" ? "Add a Last.fm API key first." : "Add Trakt client ID and secret first.") : R.error(`${r} connection failed, please try again.`), he(e), await t();
		}
		return b(() => {
			K(), Q(), $("lastfm", Q), $("trakt", K);
		}), (e, t) => (x(), m("section", re, [
			t[12] ||= h("header", { class: "admin-services__head" }, [h("h1", {
				id: "services-heading",
				class: "admin-services__title"
			}, "Services")], -1),
			_(te, {
				links: w(l).services.links,
				details: w(l).services.details
			}, {
				default: T(() => [...t[0] ||= [
					g(" Link your ", -1),
					h("strong", null, "Trakt.tv", -1),
					g(" and ", -1),
					h("strong", null, "Last.fm", -1),
					g(" accounts so watches and listens are scrobbled automatically. ", -1),
					h("strong", null, "Connect", -1),
					g(" starts the sign-in flow for a service (it's greyed out until you add that service's API keys under Settings), and ", -1),
					h("strong", null, "Disconnect", -1),
					g(" unlinks it. The badge beside each service shows whether it's currently connected. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			h("section", ie, [h("div", ae, [t[1] ||= h("h2", {
				id: "trakt-heading",
				class: "admin-services__section-title"
			}, "Trakt.tv", -1), V.value === null ? p("", !0) : (x(), f(a, {
				key: 0,
				tone: V.value.connected ? "success" : "neutral",
				label: V.value.connected ? "Connected" : "Not connected"
			}, {
				default: T(() => [g(C(V.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), h("div", oe, [H.value ? (x(), m("div", D, [_(o, {
				variant: "text",
				lines: 2
			})])) : V.value === null ? (x(), f(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Trakt",
				description: U.value ?? void 0
			}, {
				actions: T(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: T(() => [...t[2] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (x(), m(u, { key: 2 }, [
				V.value.connected && V.value.username !== null ? (x(), m("dl", O, [t[3] ||= h("dt", null, "Username", -1), h("dd", null, C(V.value.username), 1)])) : p("", !0),
				!V.value.connected && G.value ? (x(), m("p", k, [...t[4] ||= [
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
				h("div", A, [V.value.connected ? (x(), f(i, {
					key: 1,
					variant: "outline",
					loading: W.value,
					onClick: de
				}, {
					default: T(() => [g(C(W.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (x(), f(i, {
					key: 0,
					variant: "solid",
					disabled: G.value,
					title: G.value ? "Add Trakt client ID and secret first" : void 0,
					onClick: ue
				}, {
					default: T(() => [...t[5] ||= [g(" Connect to Trakt ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])]),
			h("section", j, [h("div", M, [t[6] ||= h("h2", {
				id: "lastfm-heading",
				class: "admin-services__section-title"
			}, "Last.fm", -1), q.value === null ? p("", !0) : (x(), f(a, {
				key: 0,
				tone: q.value.connected ? "success" : "neutral",
				label: q.value.connected ? "Connected" : "Not connected"
			}, {
				default: T(() => [g(C(q.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), h("div", se, [J.value ? (x(), m("div", ce, [_(o, {
				variant: "text",
				lines: 2
			})])) : q.value === null ? (x(), f(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Last.fm",
				description: Y.value ?? void 0
			}, {
				actions: T(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: T(() => [...t[7] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (x(), m(u, { key: 2 }, [
				q.value.connected && q.value.username !== null ? (x(), m("dl", le, [
					t[8] ||= h("dt", null, "Username", -1),
					h("dd", null, C(q.value.username), 1),
					t[9] ||= h("dt", null, "API key", -1),
					h("dd", null, C(q.value.api_key_set ? "Set" : "Not set"), 1)
				])) : p("", !0),
				!q.value.connected && Z.value ? (x(), m("p", N, [...t[10] ||= [
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
				h("div", P, [q.value.connected ? (x(), f(i, {
					key: 1,
					variant: "outline",
					loading: X.value,
					onClick: pe
				}, {
					default: T(() => [g(C(X.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (x(), f(i, {
					key: 0,
					variant: "solid",
					disabled: Z.value,
					title: Z.value ? "Add a Last.fm API key first" : void 0,
					onClick: fe
				}, {
					default: T(() => [...t[11] ||= [g(" Connect Last.fm ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])])
		]));
	}
}), [["__scopeId", "data-v-558dffff"]]);
//#endregion
export { F as default };

//# sourceMappingURL=ServicesPage-sjvtAN2N.js.map