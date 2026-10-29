import { n as e } from "./Icon-CIwTuFLd.js";
import { l as t, t as n, y as r } from "./client-CSOeqVlU.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./EmptyState-BAyOxAcK.js";
import { t as o } from "./Button-BuG0GvCa.js";
import { t as s } from "./Badge-A88fI41k.js";
import { t as c } from "./Skeleton-rHw-IJtl.js";
import { t as ee } from "./PageHint-BGYg6qRJ.js";
import { t as l } from "./services-C907MGdw.js";
import { t as u } from "./helpLinks-B4Y1FteC.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onMounted as x, openBlock as S, ref as C, toDisplayString as w, unref as T, withCtx as E } from "vue";
import { useRoute as te, useRouter as D } from "vue-router";
//#region src/pages/admin/ServicesPage.vue?vue&type=script&setup=true&lang.ts
var ne = {
	class: "admin-services",
	"aria-labelledby": "services-heading"
}, re = {
	class: "admin-services__section",
	"aria-labelledby": "trakt-heading"
}, ie = { class: "admin-services__section-head" }, ae = { class: "admin-services__card" }, O = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, k = {
	key: 0,
	class: "admin-services__dl"
}, A = {
	key: 1,
	class: "admin-services__hint"
}, j = { class: "admin-services__actions" }, M = {
	class: "admin-services__section",
	"aria-labelledby": "lastfm-heading"
}, oe = { class: "admin-services__section-head" }, se = { class: "admin-services__card" }, ce = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, le = {
	key: 0,
	class: "admin-services__dl"
}, N = {
	key: 1,
	class: "admin-services__hint"
}, P = { class: "admin-services__actions" }, F = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "ServicesPage",
	props: { client: {} },
	setup(e) {
		let y = e, F = b("apiBase", ""), I = f(() => typeof F == "string" ? F : F?.value ?? ""), L = new l(y.client ?? new n({
			baseUrl: I.value,
			tokenStore: new t()
		})), R = i(), z = te(), B = D(), V = C(null), H = C(!0), U = C(null), W = C(!1), G = f(() => V.value?.configured === !1);
		async function K() {
			H.value = !0, U.value = null;
			try {
				V.value = await L.getTraktStatus();
			} catch (e) {
				U.value = r(e, "Failed to load Trakt status."), R.error(U.value);
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
					R.error(r(e, "Failed to disconnect Trakt."));
				} finally {
					W.value = !1;
				}
			}
		}
		let q = C(null), J = C(!0), Y = C(null), X = C(!1), Z = f(() => q.value?.api_key_set === !1);
		async function Q() {
			J.value = !0, Y.value = null;
			try {
				q.value = await L.getLastfmStatus();
			} catch (e) {
				Y.value = r(e, "Failed to load Last.fm status."), R.error(Y.value);
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
					R.error(r(e, "Failed to disconnect Last.fm."));
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
		return x(() => {
			K(), Q(), $("lastfm", Q), $("trakt", K);
		}), (e, t) => (S(), h("section", ne, [
			t[12] ||= g("header", { class: "admin-services__head" }, [g("h1", {
				id: "services-heading",
				class: "admin-services__title"
			}, "Services")], -1),
			v(ee, {
				links: T(u).services.links,
				details: T(u).services.details
			}, {
				default: E(() => [...t[0] ||= [
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
			}, 8, ["links", "details"]),
			g("section", re, [g("div", ie, [t[1] ||= g("h2", {
				id: "trakt-heading",
				class: "admin-services__section-title"
			}, "Trakt.tv", -1), V.value === null ? m("", !0) : (S(), p(s, {
				key: 0,
				tone: V.value.connected ? "success" : "neutral",
				label: V.value.connected ? "Connected" : "Not connected"
			}, {
				default: E(() => [_(w(V.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), g("div", ae, [H.value ? (S(), h("div", O, [v(c, {
				variant: "text",
				lines: 2
			})])) : V.value === null ? (S(), p(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Trakt",
				description: U.value ?? void 0
			}, {
				actions: E(() => [v(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: E(() => [...t[2] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (S(), h(d, { key: 2 }, [
				V.value.connected && V.value.username !== null ? (S(), h("dl", k, [t[3] ||= g("dt", null, "Username", -1), g("dd", null, w(V.value.username), 1)])) : m("", !0),
				!V.value.connected && G.value ? (S(), h("p", A, [...t[4] ||= [
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
				g("div", j, [V.value.connected ? (S(), p(o, {
					key: 1,
					variant: "outline",
					loading: W.value,
					onClick: de
				}, {
					default: E(() => [_(w(W.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (S(), p(o, {
					key: 0,
					variant: "solid",
					disabled: G.value,
					title: G.value ? "Add Trakt client ID and secret first" : void 0,
					onClick: ue
				}, {
					default: E(() => [...t[5] ||= [_(" Connect to Trakt ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])]),
			g("section", M, [g("div", oe, [t[6] ||= g("h2", {
				id: "lastfm-heading",
				class: "admin-services__section-title"
			}, "Last.fm", -1), q.value === null ? m("", !0) : (S(), p(s, {
				key: 0,
				tone: q.value.connected ? "success" : "neutral",
				label: q.value.connected ? "Connected" : "Not connected"
			}, {
				default: E(() => [_(w(q.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), g("div", se, [J.value ? (S(), h("div", ce, [v(c, {
				variant: "text",
				lines: 2
			})])) : q.value === null ? (S(), p(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Last.fm",
				description: Y.value ?? void 0
			}, {
				actions: E(() => [v(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: E(() => [...t[7] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (S(), h(d, { key: 2 }, [
				q.value.connected && q.value.username !== null ? (S(), h("dl", le, [
					t[8] ||= g("dt", null, "Username", -1),
					g("dd", null, w(q.value.username), 1),
					t[9] ||= g("dt", null, "API key", -1),
					g("dd", null, w(q.value.api_key_set ? "Set" : "Not set"), 1)
				])) : m("", !0),
				!q.value.connected && Z.value ? (S(), h("p", N, [...t[10] ||= [
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
				g("div", P, [q.value.connected ? (S(), p(o, {
					key: 1,
					variant: "outline",
					loading: X.value,
					onClick: pe
				}, {
					default: E(() => [_(w(X.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (S(), p(o, {
					key: 0,
					variant: "solid",
					disabled: Z.value,
					title: Z.value ? "Add a Last.fm API key first" : void 0,
					onClick: fe
				}, {
					default: E(() => [...t[11] ||= [_(" Connect Last.fm ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])])
		]));
	}
}), [["__scopeId", "data-v-d08c9924"]]);
//#endregion
export { F as default };

//# sourceMappingURL=ServicesPage-DbhWhTh_.js.map