import { n as e } from "./Icon-24ngwBUH.js";
import { c as t, f as n, t as r } from "./client-fw74f3l_.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CInT03Lp.js";
import { t as o } from "./Badge-DnDrMVUo.js";
import { t as s } from "./Skeleton-BUq2D39t.js";
import { t as c } from "./EmptyState-0XgHKEGf.js";
import { t as l } from "./PageHint-DR8OWfto.js";
import { t as u } from "./services-C907MGdw.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onMounted as x, openBlock as S, ref as C, toDisplayString as w, withCtx as T } from "vue";
import { useRoute as E, useRouter as D } from "vue-router";
//#region src/pages/admin/ServicesPage.vue?vue&type=script&setup=true&lang.ts
var O = {
	class: "admin-services",
	"aria-labelledby": "services-heading"
}, k = {
	class: "admin-services__section",
	"aria-labelledby": "trakt-heading"
}, A = { class: "admin-services__section-head" }, ee = { class: "admin-services__card" }, te = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, ne = {
	key: 0,
	class: "admin-services__dl"
}, re = {
	key: 1,
	class: "admin-services__hint"
}, ie = { class: "admin-services__actions" }, ae = {
	class: "admin-services__section",
	"aria-labelledby": "lastfm-heading"
}, oe = { class: "admin-services__section-head" }, se = { class: "admin-services__card" }, ce = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, j = {
	key: 0,
	class: "admin-services__dl"
}, M = {
	key: 1,
	class: "admin-services__hint"
}, N = { class: "admin-services__actions" }, P = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "ServicesPage",
	props: { client: {} },
	setup(e) {
		let y = e, P = b("apiBase", ""), F = f(() => typeof P == "string" ? P : P?.value ?? ""), I = new u(y.client ?? new r({
			baseUrl: F.value,
			tokenStore: new t()
		})), L = i(), R = E(), z = D(), B = C(null), V = C(!0), H = C(null), U = C(!1), W = f(() => B.value?.configured === !1);
		async function G() {
			V.value = !0, H.value = null;
			try {
				B.value = await I.getTraktStatus();
			} catch (e) {
				H.value = n(e, "Failed to load Trakt status."), L.error(H.value);
			} finally {
				V.value = !1;
			}
		}
		function le() {
			I.navigateToTraktAuthorize();
		}
		async function ue() {
			if (!U.value) {
				U.value = !0;
				try {
					await I.disconnectTrakt(), L.success("Trakt disconnected."), await G();
				} catch (e) {
					L.error(n(e, "Failed to disconnect Trakt."));
				} finally {
					U.value = !1;
				}
			}
		}
		let K = C(null), q = C(!0), J = C(null), Y = C(!1), X = f(() => K.value?.api_key_set === !1);
		async function Z() {
			q.value = !0, J.value = null;
			try {
				K.value = await I.getLastfmStatus();
			} catch (e) {
				J.value = n(e, "Failed to load Last.fm status."), L.error(J.value);
			} finally {
				q.value = !1;
			}
		}
		function Q() {
			I.navigateToLastfmConnect();
		}
		async function de() {
			if (!Y.value) {
				Y.value = !0;
				try {
					await I.disconnectLastfm(), L.success("Last.fm disconnected."), await Z();
				} catch (e) {
					L.error(n(e, "Failed to disconnect Last.fm."));
				} finally {
					Y.value = !1;
				}
			}
		}
		function fe(e) {
			let t = R?.query?.[e], n = Array.isArray(t) ? t[0] : t;
			return typeof n == "string" ? n : void 0;
		}
		function pe(e) {
			if (!R || !z) return;
			let t = { ...R.query };
			delete t[e], z.replace({ query: t });
		}
		async function $(e, t) {
			let n = fe(e);
			if (n === void 0) return;
			let r = e === "lastfm" ? "Last.fm" : "Trakt";
			n === "connected" ? L.success(`${r} connected.`) : n === "not_configured" ? L.error(e === "lastfm" ? "Add a Last.fm API key first." : "Add Trakt client ID and secret first.") : L.error(`${r} connection failed, please try again.`), pe(e), await t();
		}
		return x(() => {
			G(), Z(), $("lastfm", Z), $("trakt", G);
		}), (e, t) => (S(), h("section", O, [
			t[12] ||= g("header", { class: "admin-services__head" }, [g("h1", {
				id: "services-heading",
				class: "admin-services__title"
			}, "Services")], -1),
			v(l, null, {
				default: T(() => [...t[0] ||= [
					_(" Link your ", -1),
					g("strong", null, "Trakt.tv", -1),
					_(" and ", -1),
					g("strong", null, "Last.fm", -1),
					_(" accounts so watches and listens are scrobbled automatically. ", -1),
					g("strong", null, "Connect", -1),
					_(" starts the sign-in flow for a service (it's greyed out until you add that service's API keys under Settings), and ", -1),
					g("strong", null, "Disconnect", -1),
					_(" unlinks it. The badge beside each service shows whether it's currently connected. ", -1)
				]]),
				_: 1
			}),
			g("section", k, [g("div", A, [t[1] ||= g("h2", {
				id: "trakt-heading",
				class: "admin-services__section-title"
			}, "Trakt.tv", -1), B.value === null ? m("", !0) : (S(), p(o, {
				key: 0,
				tone: B.value.connected ? "success" : "neutral",
				label: B.value.connected ? "Connected" : "Not connected"
			}, {
				default: T(() => [_(w(B.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), g("div", ee, [V.value ? (S(), h("div", te, [v(s, {
				variant: "text",
				lines: 2
			})])) : B.value === null ? (S(), p(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Trakt",
				description: H.value ?? void 0
			}, {
				actions: T(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: G
				}, {
					default: T(() => [...t[2] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (S(), h(d, { key: 2 }, [
				B.value.connected && B.value.username !== null ? (S(), h("dl", ne, [t[3] ||= g("dt", null, "Username", -1), g("dd", null, w(B.value.username), 1)])) : m("", !0),
				!B.value.connected && W.value ? (S(), h("p", re, [...t[4] ||= [
					_(" Trakt isn't configured yet. Register an application at ", -1),
					g("a", {
						href: "https://trakt.tv/oauth/applications",
						target: "_blank",
						rel: "noopener noreferrer"
					}, "trakt.tv/oauth/applications", -1),
					_(" (set its redirect URI to this server's ", -1),
					g("code", null, "/api/v1/oauth/trakt/callback", -1),
					_("), then add the client ID and secret in Settings or via the ", -1),
					g("code", null, "TRAKT_CLIENT_ID", -1),
					_(" / ", -1),
					g("code", null, "TRAKT_CLIENT_SECRET", -1),
					_(" environment variables. ", -1)
				]])) : m("", !0),
				g("div", ie, [B.value.connected ? (S(), p(a, {
					key: 1,
					variant: "outline",
					loading: U.value,
					onClick: ue
				}, {
					default: T(() => [_(w(U.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (S(), p(a, {
					key: 0,
					variant: "solid",
					disabled: W.value,
					title: W.value ? "Add Trakt client ID and secret first" : void 0,
					onClick: le
				}, {
					default: T(() => [...t[5] ||= [_(" Connect to Trakt ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])]),
			g("section", ae, [g("div", oe, [t[6] ||= g("h2", {
				id: "lastfm-heading",
				class: "admin-services__section-title"
			}, "Last.fm", -1), K.value === null ? m("", !0) : (S(), p(o, {
				key: 0,
				tone: K.value.connected ? "success" : "neutral",
				label: K.value.connected ? "Connected" : "Not connected"
			}, {
				default: T(() => [_(w(K.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), g("div", se, [q.value ? (S(), h("div", ce, [v(s, {
				variant: "text",
				lines: 2
			})])) : K.value === null ? (S(), p(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Last.fm",
				description: J.value ?? void 0
			}, {
				actions: T(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Z
				}, {
					default: T(() => [...t[7] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (S(), h(d, { key: 2 }, [
				K.value.connected && K.value.username !== null ? (S(), h("dl", j, [
					t[8] ||= g("dt", null, "Username", -1),
					g("dd", null, w(K.value.username), 1),
					t[9] ||= g("dt", null, "API key", -1),
					g("dd", null, w(K.value.api_key_set ? "Set" : "Not set"), 1)
				])) : m("", !0),
				!K.value.connected && X.value ? (S(), h("p", M, [...t[10] ||= [
					_(" Last.fm isn't configured yet. Register an API account at ", -1),
					g("a", {
						href: "https://www.last.fm/api/account/create",
						target: "_blank",
						rel: "noopener noreferrer"
					}, "last.fm/api/account/create", -1),
					_(", then add the Last.fm API key and secret in Settings or via the ", -1),
					g("code", null, "LASTFM_API_KEY", -1),
					_(" / ", -1),
					g("code", null, "LASTFM_API_SECRET", -1),
					_(" environment variables. ", -1)
				]])) : m("", !0),
				g("div", N, [K.value.connected ? (S(), p(a, {
					key: 1,
					variant: "outline",
					loading: Y.value,
					onClick: de
				}, {
					default: T(() => [_(w(Y.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (S(), p(a, {
					key: 0,
					variant: "solid",
					disabled: X.value,
					title: X.value ? "Add a Last.fm API key first" : void 0,
					onClick: Q
				}, {
					default: T(() => [...t[11] ||= [_(" Connect Last.fm ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])])
		]));
	}
}), [["__scopeId", "data-v-a1f92571"]]);
//#endregion
export { P as default };

//# sourceMappingURL=ServicesPage-DqylvCVE.js.map