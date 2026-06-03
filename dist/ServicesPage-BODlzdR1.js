import { a as e, i as t, n, r, t as i, u as a } from "./tokenStore-DfQvvLGI.js";
import { t as o } from "./EmptyState-Oymq15Ey.js";
import { t as s } from "./Badge-Cmz5FPqw.js";
import { t as c } from "./services-Czm8hsvH.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, onMounted as y, openBlock as b, ref as x, toDisplayString as S, withCtx as C } from "vue";
//#region src/pages/admin/ServicesPage.vue?vue&type=script&setup=true&lang.ts
var w = {
	class: "admin-services",
	"aria-labelledby": "services-heading"
}, T = {
	class: "admin-services__section",
	"aria-labelledby": "trakt-heading"
}, E = { class: "admin-services__section-head" }, D = { class: "admin-services__card" }, O = {
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
}, N = { class: "admin-services__section-head" }, P = { class: "admin-services__card" }, F = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, I = {
	key: 0,
	class: "admin-services__dl"
}, L = { class: "admin-services__actions" }, R = /*#__PURE__*/ a(/* @__PURE__ */ _({
	__name: "ServicesPage",
	props: { client: {} },
	setup(a) {
		let _ = a, R = v("apiBase", ""), z = u(() => typeof R == "string" ? R : R?.value ?? ""), B = new c(_.client ?? new e({
			baseUrl: z.value,
			tokenStore: new i()
		})), V = t(), H = x(null), U = x(!0), W = x(!1), G = u(() => H.value?.configured === !1);
		async function K() {
			try {
				H.value = await B.getTraktStatus();
			} catch (e) {
				V.error(e instanceof Error ? e.message : "Failed to load Trakt status.");
			} finally {
				U.value = !1;
			}
		}
		function q() {
			B.navigateToTraktAuthorize();
		}
		async function J() {
			if (!W.value) {
				W.value = !0;
				try {
					await B.disconnectTrakt(), V.success("Trakt disconnected."), await K();
				} catch (e) {
					V.error(e instanceof Error ? e.message : "Failed to disconnect Trakt.");
				} finally {
					W.value = !1;
				}
			}
		}
		let Y = x(null), X = x(!0), Z = x(!1);
		async function Q() {
			try {
				Y.value = await B.getLastfmStatus();
			} catch (e) {
				V.error(e instanceof Error ? e.message : "Failed to load Last.fm status.");
			} finally {
				X.value = !1;
			}
		}
		function $() {
			B.navigateToLastfmConnect();
		}
		async function ee() {
			if (!Z.value) {
				Z.value = !0;
				try {
					await B.disconnectLastfm(), V.success("Last.fm disconnected."), await Q();
				} catch (e) {
					V.error(e instanceof Error ? e.message : "Failed to disconnect Last.fm.");
				} finally {
					Z.value = !1;
				}
			}
		}
		return y(() => {
			K(), Q();
		}), (e, t) => (b(), p("section", w, [
			t[8] ||= m("header", { class: "admin-services__head" }, [m("h1", {
				id: "services-heading",
				class: "admin-services__title"
			}, "Services")], -1),
			m("section", T, [m("div", E, [t[0] ||= m("h2", {
				id: "trakt-heading",
				class: "admin-services__section-title"
			}, "Trakt.tv", -1), H.value === null ? f("", !0) : (b(), d(s, {
				key: 0,
				tone: H.value.connected ? "success" : "neutral",
				label: H.value.connected ? "Connected" : "Not connected"
			}, {
				default: C(() => [h(S(H.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), m("div", D, [U.value ? (b(), p("div", O, [g(r, {
				variant: "text",
				lines: 2
			})])) : H.value === null ? (b(), d(o, {
				key: 1,
				icon: "alert",
				title: "Unable to load Trakt status."
			})) : (b(), p(l, { key: 2 }, [
				H.value.connected && H.value.username !== null ? (b(), p("dl", k, [t[1] ||= m("dt", null, "Username", -1), m("dd", null, S(H.value.username), 1)])) : f("", !0),
				!H.value.connected && G.value ? (b(), p("p", A, [...t[2] ||= [
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
				m("div", j, [H.value.connected ? (b(), d(n, {
					key: 1,
					variant: "outline",
					loading: W.value,
					onClick: J
				}, {
					default: C(() => [h(S(W.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (b(), d(n, {
					key: 0,
					variant: "solid",
					disabled: G.value,
					title: G.value ? "Add Trakt client ID and secret first" : void 0,
					onClick: q
				}, {
					default: C(() => [...t[3] ||= [h(" Connect to Trakt ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])]),
			m("section", M, [m("div", N, [t[4] ||= m("h2", {
				id: "lastfm-heading",
				class: "admin-services__section-title"
			}, "Last.fm", -1), Y.value === null ? f("", !0) : (b(), d(s, {
				key: 0,
				tone: Y.value.connected ? "success" : "neutral",
				label: Y.value.connected ? "Connected" : "Not connected"
			}, {
				default: C(() => [h(S(Y.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), m("div", P, [X.value ? (b(), p("div", F, [g(r, {
				variant: "text",
				lines: 2
			})])) : Y.value === null ? (b(), d(o, {
				key: 1,
				icon: "alert",
				title: "Unable to load Last.fm status."
			})) : (b(), p(l, { key: 2 }, [Y.value.connected && Y.value.username !== null ? (b(), p("dl", I, [
				t[5] ||= m("dt", null, "Username", -1),
				m("dd", null, S(Y.value.username), 1),
				t[6] ||= m("dt", null, "API key", -1),
				m("dd", null, S(Y.value.api_key_set ? "Set" : "Not set"), 1)
			])) : f("", !0), m("div", L, [Y.value.connected ? (b(), d(n, {
				key: 1,
				variant: "outline",
				loading: Z.value,
				onClick: ee
			}, {
				default: C(() => [h(S(Z.value ? "Disconnecting" : "Disconnect"), 1)]),
				_: 1
			}, 8, ["loading"])) : (b(), d(n, {
				key: 0,
				variant: "solid",
				onClick: $
			}, {
				default: C(() => [...t[7] ||= [h(" Connect Last.fm ", -1)]]),
				_: 1
			}))])], 64))])])
		]));
	}
}), [["__scopeId", "data-v-06f3b61d"]]);
//#endregion
export { R as default };

//# sourceMappingURL=ServicesPage-BODlzdR1.js.map