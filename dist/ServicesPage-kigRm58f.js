import { n as e } from "./Icon-ax5k7_G2.js";
import { l as t, n, p as r, t as i } from "./Button-MsRePfWv.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Skeleton-DkSoWF3C.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { t as c } from "./services-C907MGdw.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, onMounted as y, openBlock as b, ref as x, toDisplayString as S, withCtx as C } from "vue";
import { useRoute as te, useRouter as ne } from "vue-router";
//#region src/pages/admin/ServicesPage.vue?vue&type=script&setup=true&lang.ts
var re = {
	class: "admin-services",
	"aria-labelledby": "services-heading"
}, w = {
	class: "admin-services__section",
	"aria-labelledby": "trakt-heading"
}, T = { class: "admin-services__section-head" }, E = { class: "admin-services__card" }, D = {
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
}, M = { class: "admin-services__section-head" }, ie = { class: "admin-services__card" }, ae = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, oe = {
	key: 0,
	class: "admin-services__dl"
}, se = {
	key: 1,
	class: "admin-services__hint"
}, N = { class: "admin-services__actions" }, P = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "ServicesPage",
	props: { client: {} },
	setup(e) {
		let _ = e, P = v("apiBase", ""), F = u(() => typeof P == "string" ? P : P?.value ?? ""), I = new c(_.client ?? new n({
			baseUrl: F.value,
			tokenStore: new t()
		})), L = ee(), R = te(), z = ne(), B = x(null), V = x(!0), H = x(null), U = x(!1), W = u(() => B.value?.configured === !1);
		async function G() {
			V.value = !0, H.value = null;
			try {
				B.value = await I.getTraktStatus();
			} catch (e) {
				H.value = r(e, "Failed to load Trakt status."), L.error(H.value);
			} finally {
				V.value = !1;
			}
		}
		function ce() {
			I.navigateToTraktAuthorize();
		}
		async function le() {
			if (!U.value) {
				U.value = !0;
				try {
					await I.disconnectTrakt(), L.success("Trakt disconnected."), await G();
				} catch (e) {
					L.error(r(e, "Failed to disconnect Trakt."));
				} finally {
					U.value = !1;
				}
			}
		}
		let K = x(null), q = x(!0), J = x(null), Y = x(!1), X = u(() => K.value?.api_key_set === !1);
		async function Z() {
			q.value = !0, J.value = null;
			try {
				K.value = await I.getLastfmStatus();
			} catch (e) {
				J.value = r(e, "Failed to load Last.fm status."), L.error(J.value);
			} finally {
				q.value = !1;
			}
		}
		function Q() {
			I.navigateToLastfmConnect();
		}
		async function ue() {
			if (!Y.value) {
				Y.value = !0;
				try {
					await I.disconnectLastfm(), L.success("Last.fm disconnected."), await Z();
				} catch (e) {
					L.error(r(e, "Failed to disconnect Last.fm."));
				} finally {
					Y.value = !1;
				}
			}
		}
		function de(e) {
			let t = R?.query?.[e], n = Array.isArray(t) ? t[0] : t;
			return typeof n == "string" ? n : void 0;
		}
		function fe(e) {
			if (!R || !z) return;
			let t = { ...R.query };
			delete t[e], z.replace({ query: t });
		}
		async function $(e, t) {
			let n = de(e);
			if (n === void 0) return;
			let r = e === "lastfm" ? "Last.fm" : "Trakt";
			n === "connected" ? L.success(`${r} connected.`) : n === "not_configured" ? L.error(e === "lastfm" ? "Add a Last.fm API key first." : "Add Trakt client ID and secret first.") : L.error(`${r} connection failed, please try again.`), fe(e), await t();
		}
		return y(() => {
			G(), Z(), $("lastfm", Z), $("trakt", G);
		}), (e, t) => (b(), p("section", re, [
			t[11] ||= m("header", { class: "admin-services__head" }, [m("h1", {
				id: "services-heading",
				class: "admin-services__title"
			}, "Services")], -1),
			m("section", w, [m("div", T, [t[0] ||= m("h2", {
				id: "trakt-heading",
				class: "admin-services__section-title"
			}, "Trakt.tv", -1), B.value === null ? f("", !0) : (b(), d(a, {
				key: 0,
				tone: B.value.connected ? "success" : "neutral",
				label: B.value.connected ? "Connected" : "Not connected"
			}, {
				default: C(() => [h(S(B.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), m("div", E, [V.value ? (b(), p("div", D, [g(o, {
				variant: "text",
				lines: 2
			})])) : B.value === null ? (b(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Trakt",
				description: H.value ?? void 0
			}, {
				actions: C(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: G
				}, {
					default: C(() => [...t[1] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (b(), p(l, { key: 2 }, [
				B.value.connected && B.value.username !== null ? (b(), p("dl", O, [t[2] ||= m("dt", null, "Username", -1), m("dd", null, S(B.value.username), 1)])) : f("", !0),
				!B.value.connected && W.value ? (b(), p("p", k, [...t[3] ||= [
					h(" Trakt isn't configured yet. Register an application at ", -1),
					m("a", {
						href: "https://trakt.tv/oauth/applications",
						target: "_blank",
						rel: "noopener noreferrer"
					}, "trakt.tv/oauth/applications", -1),
					h(" (set its redirect URI to this server's ", -1),
					m("code", null, "/api/v1/oauth/trakt/callback", -1),
					h("), then add the client ID and secret in Settings or via the ", -1),
					m("code", null, "TRAKT_CLIENT_ID", -1),
					h(" / ", -1),
					m("code", null, "TRAKT_CLIENT_SECRET", -1),
					h(" environment variables. ", -1)
				]])) : f("", !0),
				m("div", A, [B.value.connected ? (b(), d(i, {
					key: 1,
					variant: "outline",
					loading: U.value,
					onClick: le
				}, {
					default: C(() => [h(S(U.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (b(), d(i, {
					key: 0,
					variant: "solid",
					disabled: W.value,
					title: W.value ? "Add Trakt client ID and secret first" : void 0,
					onClick: ce
				}, {
					default: C(() => [...t[4] ||= [h(" Connect to Trakt ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])]),
			m("section", j, [m("div", M, [t[5] ||= m("h2", {
				id: "lastfm-heading",
				class: "admin-services__section-title"
			}, "Last.fm", -1), K.value === null ? f("", !0) : (b(), d(a, {
				key: 0,
				tone: K.value.connected ? "success" : "neutral",
				label: K.value.connected ? "Connected" : "Not connected"
			}, {
				default: C(() => [h(S(K.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), m("div", ie, [q.value ? (b(), p("div", ae, [g(o, {
				variant: "text",
				lines: 2
			})])) : K.value === null ? (b(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load Last.fm",
				description: J.value ?? void 0
			}, {
				actions: C(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Z
				}, {
					default: C(() => [...t[6] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (b(), p(l, { key: 2 }, [
				K.value.connected && K.value.username !== null ? (b(), p("dl", oe, [
					t[7] ||= m("dt", null, "Username", -1),
					m("dd", null, S(K.value.username), 1),
					t[8] ||= m("dt", null, "API key", -1),
					m("dd", null, S(K.value.api_key_set ? "Set" : "Not set"), 1)
				])) : f("", !0),
				!K.value.connected && X.value ? (b(), p("p", se, [...t[9] ||= [
					h(" Last.fm isn't configured yet. Register an API account at ", -1),
					m("a", {
						href: "https://www.last.fm/api/account/create",
						target: "_blank",
						rel: "noopener noreferrer"
					}, "last.fm/api/account/create", -1),
					h(", then add the Last.fm API key and secret in Settings or via the ", -1),
					m("code", null, "LASTFM_API_KEY", -1),
					h(" / ", -1),
					m("code", null, "LASTFM_API_SECRET", -1),
					h(" environment variables. ", -1)
				]])) : f("", !0),
				m("div", N, [K.value.connected ? (b(), d(i, {
					key: 1,
					variant: "outline",
					loading: Y.value,
					onClick: ue
				}, {
					default: C(() => [h(S(Y.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (b(), d(i, {
					key: 0,
					variant: "solid",
					disabled: X.value,
					title: X.value ? "Add a Last.fm API key first" : void 0,
					onClick: Q
				}, {
					default: C(() => [...t[10] ||= [h(" Connect Last.fm ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])])
		]));
	}
}), [["__scopeId", "data-v-c85fc3fe"]]);
//#endregion
export { P as default };

//# sourceMappingURL=ServicesPage-kigRm58f.js.map