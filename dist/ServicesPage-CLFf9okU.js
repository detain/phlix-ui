import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./services-B4wAPAEg.js";
import { t as r } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Button-1sKEdGjj.js";
import { t as a } from "./PageHint-BlhPmafC.js";
import { t as o } from "./helpLinks-iarZuNmw.js";
import { t as s } from "./Badge-C6LNO9Kk.js";
import { t as c } from "./Skeleton-B2Mt2L00.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { n as u } from "./Icon-CIbfiPrs.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as ee, onMounted as b, openBlock as x, ref as S, toDisplayString as C, unref as w, withCtx as T } from "vue";
import { useRoute as E, useRouter as D } from "vue-router";
// src/pages/admin/ServicesPage.vue?vue&type=script&setup=true&lang.ts
var O = {
	class: "admin-services",
	"aria-labelledby": "services-heading"
}, k = {
	class: "admin-services__section",
	"aria-labelledby": "trakt-heading"
}, A = { class: "admin-services__section-head" }, j = { class: "admin-services__card" }, M = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, N = {
	key: 0,
	class: "admin-services__dl"
}, te = {
	key: 1,
	class: "admin-services__hint"
}, ne = { class: "admin-services__actions" }, re = {
	class: "admin-services__section",
	"aria-labelledby": "lastfm-heading"
}, ie = { class: "admin-services__section-head" }, ae = { class: "admin-services__card" }, oe = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, se = {
	key: 0,
	class: "admin-services__dl"
}, ce = {
	key: 1,
	class: "admin-services__hint"
}, P = { class: "admin-services__actions" }, F = /*#__PURE__*/ u(/* @__PURE__ */ y({
	__name: "ServicesPage",
	props: { client: {} },
	setup(u) {
		let y = u, F = ee("apiBase", ""), I = f(() => typeof F == "string" ? F : F?.value ?? ""), L = new n(y.client ?? new e({ baseUrl: I.value })), R = r(), z = E(), B = D(), V = S(null), H = S(!0), U = S(null), W = S(!1), G = f(() => V.value?.configured === !1);
		async function K() {
			H.value = !0, U.value = null;
			try {
				V.value = await L.getTraktStatus();
			} catch (e) {
				U.value = t(e, "Failed to load Trakt status."), R.error(U.value);
			} finally {
				H.value = !1;
			}
		}
		function le() {
			L.navigateToTraktAuthorize();
		}
		async function ue() {
			if (!W.value) {
				W.value = !0;
				try {
					await L.disconnectTrakt(), R.success("Trakt disconnected."), await K();
				} catch (e) {
					R.error(t(e, "Failed to disconnect Trakt."));
				} finally {
					W.value = !1;
				}
			}
		}
		let q = S(null), J = S(!0), Y = S(null), X = S(!1), Z = f(() => q.value?.api_key_set === !1);
		async function Q() {
			J.value = !0, Y.value = null;
			try {
				q.value = await L.getLastfmStatus();
			} catch (e) {
				Y.value = t(e, "Failed to load Last.fm status."), R.error(Y.value);
			} finally {
				J.value = !1;
			}
		}
		function de() {
			L.navigateToLastfmConnect();
		}
		async function fe() {
			if (!X.value) {
				X.value = !0;
				try {
					await L.disconnectLastfm(), R.success("Last.fm disconnected."), await Q();
				} catch (e) {
					R.error(t(e, "Failed to disconnect Last.fm."));
				} finally {
					X.value = !1;
				}
			}
		}
		function pe(e) {
			let t = z?.query?.[e], n = Array.isArray(t) ? t[0] : t;
			return typeof n == "string" ? n : void 0;
		}
		function me(e) {
			if (!z || !B) return;
			let t = { ...z.query };
			delete t[e], B.replace({ query: t });
		}
		async function $(e, t) {
			let n = pe(e);
			if (n === void 0) return;
			let r = e === "lastfm" ? "Last.fm" : "Trakt";
			n === "connected" ? R.success(`${r} connected.`) : n === "not_configured" ? R.error(e === "lastfm" ? "Add a Last.fm API key first." : "Add Trakt client ID and secret first.") : R.error(`${r} connection failed, please try again.`), me(e), await t();
		}
		return b(() => {
			K(), Q(), $("lastfm", Q), $("trakt", K);
		}), (e, t) => (x(), h("section", O, [
			t[12] ||= g("header", { class: "admin-services__head" }, [g("h1", {
				id: "services-heading",
				class: "admin-services__title"
			}, "Services")], -1),
			v(a, {
				links: w(o).services.links,
				details: w(o).services.details
			}, {
				default: T(() => [...t[0] ||= [
					_(" Link your ", -1),
					g("strong", null, "Trakt.tv", -1),
					_(" and ", -1),
					g("strong", null, "Last.fm", -1),
					_(" accounts so watches and listens are scrobbled automatically. ", -1),
					g("strong", null, "Connect", -1),
					_(" starts the sign-in flow for a service (it's greyed out until you add that service's API keys under Settings), and ", -1),
					g("strong", null, "Disconnect", -1),
					_(" unlinks it. The badge beside each service shows whether it’s currently connected. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			g("section", k, [g("div", A, [t[1] ||= g("h2", {
				id: "trakt-heading",
				class: "admin-services__section-title"
			}, "Trakt.tv", -1), V.value === null ? m("", !0) : (x(), p(s, {
				key: 0,
				tone: V.value.connected ? "success" : "neutral",
				label: V.value.connected ? "Connected" : "Not connected"
			}, {
				default: T(() => [_(C(V.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), g("div", j, [H.value ? (x(), h("div", M, [v(c, {
				variant: "text",
				lines: 2
			})])) : V.value === null ? (x(), p(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load Trakt",
				description: U.value ?? void 0
			}, {
				actions: T(() => [v(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: T(() => [...t[2] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (x(), h(d, { key: 2 }, [
				V.value.connected && V.value.username !== null ? (x(), h("dl", N, [t[3] ||= g("dt", null, "Username", -1), g("dd", null, C(V.value.username), 1)])) : m("", !0),
				!V.value.connected && G.value ? (x(), h("p", te, [...t[4] ||= [
					_(" Trakt isn’t configured yet. Register an application at ", -1),
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
				g("div", ne, [V.value.connected ? (x(), p(i, {
					key: 1,
					variant: "outline",
					loading: W.value,
					onClick: ue
				}, {
					default: T(() => [_(C(W.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (x(), p(i, {
					key: 0,
					variant: "solid",
					disabled: G.value,
					title: G.value ? "Add Trakt client ID and secret first" : void 0,
					onClick: le
				}, {
					default: T(() => [...t[5] ||= [_(" Connect to Trakt ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])]),
			g("section", re, [g("div", ie, [t[6] ||= g("h2", {
				id: "lastfm-heading",
				class: "admin-services__section-title"
			}, "Last.fm", -1), q.value === null ? m("", !0) : (x(), p(s, {
				key: 0,
				tone: q.value.connected ? "success" : "neutral",
				label: q.value.connected ? "Connected" : "Not connected"
			}, {
				default: T(() => [_(C(q.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), g("div", ae, [J.value ? (x(), h("div", oe, [v(c, {
				variant: "text",
				lines: 2
			})])) : q.value === null ? (x(), p(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load Last.fm",
				description: Y.value ?? void 0
			}, {
				actions: T(() => [v(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: T(() => [...t[7] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (x(), h(d, { key: 2 }, [
				q.value.connected && q.value.username !== null ? (x(), h("dl", se, [
					t[8] ||= g("dt", null, "Username", -1),
					g("dd", null, C(q.value.username), 1),
					t[9] ||= g("dt", null, "API key", -1),
					g("dd", null, C(q.value.api_key_set ? "Set" : "Not set"), 1)
				])) : m("", !0),
				!q.value.connected && Z.value ? (x(), h("p", ce, [...t[10] ||= [
					_(" Last.fm isn’t configured yet. Register an API account at ", -1),
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
				g("div", P, [q.value.connected ? (x(), p(i, {
					key: 1,
					variant: "outline",
					loading: X.value,
					onClick: fe
				}, {
					default: T(() => [_(C(X.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (x(), p(i, {
					key: 0,
					variant: "solid",
					disabled: Z.value,
					title: Z.value ? "Add a Last.fm API key first" : void 0,
					onClick: de
				}, {
					default: T(() => [...t[11] ||= [_(" Connect Last.fm ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])])
		]));
	}
}), [["__scopeId", "data-v-20851091"]]);
export { F as default };

//# sourceMappingURL=ServicesPage-CLFf9okU.js.map