import { a as e, i as t, l as n, n as r, o as i, r as ee, t as te } from "./tokenStore-SjxKwmod.js";
import { t as ne } from "./Select-CfjCFQKH.js";
import { t as a } from "./Badge-wMoO7SFO.js";
import { t as o } from "./Switch-V3wRpG4-.js";
import { t as re } from "./settings-m4upFcmH.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as ie, normalizeClass as ae, onMounted as oe, openBlock as g, reactive as _, ref as v, renderList as y, toDisplayString as b, unref as x, withCtx as S, withModifiers as se } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var ce = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, le = {
	key: 0,
	class: "admin-settings__skel"
}, ue = {
	class: "admin-settings__tabs",
	role: "tablist",
	"aria-label": "Settings groups"
}, de = ["aria-selected", "onClick"], fe = ["aria-label"], pe = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, me = {
	key: 0,
	class: "admin-settings__row"
}, he = ["for"], C = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"onInput"
], ge = ["for"], _e = ["for"], ve = { class: "admin-settings__row" }, ye = [
	"id",
	"type",
	"value",
	"onInput"
], be = ["for"], xe = [
	"id",
	"value",
	"onInput"
], Se = {
	key: 5,
	class: "admin-settings__error",
	role: "alert"
}, Ce = {
	key: 6,
	class: "admin-settings__help"
}, w = { class: "admin-settings__actions" }, T = /*#__PURE__*/ n(/* @__PURE__ */ h({
	__name: "SettingsPage",
	props: { client: {} },
	setup(n) {
		let h = n, T = ie("apiBase", ""), E = c(() => typeof T == "string" ? T : T?.value ?? ""), D = new re(h.client ?? new e({
			baseUrl: E.value,
			tokenStore: new te()
		})), O = t(), k = [
			{
				id: "transcoding",
				label: "Transcoding"
			},
			{
				id: "metadata",
				label: "Metadata"
			},
			{
				id: "markers",
				label: "Markers"
			},
			{
				id: "subtitles",
				label: "Subtitles"
			},
			{
				id: "discovery",
				label: "Discovery"
			},
			{
				id: "trickplay",
				label: "Trickplay"
			},
			{
				id: "newsletter",
				label: "Newsletter"
			},
			{
				id: "port-forward",
				label: "Port Forward"
			},
			{
				id: "scrobblers",
				label: "Scrobblers"
			}
		], A = {
			transcoding: [
				"hwaccel.enabled",
				"hwaccel.prefer_hardware",
				"hwaccel.probe_timeout"
			],
			metadata: ["tmdb.api_key"],
			markers: ["marker_detection.similarity_threshold", "marker_detection.intro_max_duration"],
			subtitles: [
				"subtitles.enabled",
				"subtitles.default_language",
				"subtitles.burn_in_by_default"
			],
			discovery: ["discovery.discovery_port"],
			trickplay: ["trickplay.enabled", "trickplay.interval_seconds"],
			newsletter: ["newsletter.enabled", "newsletter.send_hour"],
			"port-forward": ["port-forward.port_forwarding.upnp_enabled"],
			scrobblers: [
				"trakt.client_id",
				"trakt.client_secret",
				"trakt.redirect_uri"
			]
		}, we = {
			"hwaccel.probe_timeout": { min: 0 },
			"marker_detection.similarity_threshold": {
				min: 0,
				max: 1
			},
			"marker_detection.intro_max_duration": { min: 0 },
			"discovery.discovery_port": {
				min: 1,
				max: 65535
			},
			"trickplay.interval_seconds": { min: 1 },
			"newsletter.send_hour": {
				min: 0,
				max: 23
			}
		}, Te = new Set(["tmdb.api_key", "trakt.client_secret"]), j = { "subtitles.default_language": [
			{
				value: "en",
				label: "English"
			},
			{
				value: "es",
				label: "Spanish"
			},
			{
				value: "fr",
				label: "French"
			},
			{
				value: "de",
				label: "German"
			},
			{
				value: "it",
				label: "Italian"
			},
			{
				value: "ja",
				label: "Japanese"
			}
		] }, M = {
			"tmdb.api_key": "TMDB API Key",
			"trakt.client_id": "Trakt Client ID",
			"trakt.client_secret": "Trakt Client Secret",
			"trakt.redirect_uri": "Trakt Redirect URI"
		}, N = {
			"tmdb.api_key": "Your TMDB (The Movie Database) API key — get one free at themoviedb.org → Settings → API (v3 auth). Used to fetch movie & TV metadata, posters, and external IDs.",
			"trakt.client_id": "Register an application at trakt.tv/oauth/applications to get a client ID and secret. Saving here overrides the TRAKT_CLIENT_ID environment variable.",
			"trakt.client_secret": "The client secret paired with your Trakt client ID. Overrides the TRAKT_CLIENT_SECRET environment variable.",
			"trakt.redirect_uri": "Must exactly match the redirect URI registered in your Trakt app — this server's /api/v1/oauth/trakt/callback URL."
		};
		function P(e) {
			return M[e] ? M[e] : (e.split(".").pop() ?? e).replace(/_/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function F(e) {
			return L.value.includes(e);
		}
		let I = v({}), L = v([]), R = v({}), z = v("transcoding"), B = v(!0), V = v(!1), H = v({}), U = _({}), W = _({}), G = _({}), K = c(() => Object.values(G).some(Boolean)), q = c(() => A[z.value] ?? []);
		function J(e) {
			for (let e of Object.keys(W)) delete W[e];
			for (let [t, n] of Object.entries(e)) W[t] = String(n ?? "");
		}
		function Y() {
			for (let e of Object.keys(G)) delete G[e];
		}
		async function Ee() {
			B.value = !0;
			try {
				let e = await D.get();
				I.value = e.settings, L.value = e.overridden, R.value = e.types, J(e.settings), Y(), H.value = {};
			} catch (e) {
				O.error(e instanceof i ? e.message : "Failed to load settings.");
			} finally {
				B.value = !1;
			}
		}
		function X(e) {
			return R.value[e] ?? "string";
		}
		function De(e) {
			return j[e] !== void 0;
		}
		function Oe(e) {
			return j[e] ?? [];
		}
		function Z(e) {
			return we[e] ?? {};
		}
		function Q(e, t) {
			W[e] = t, G[e] = t !== String(I.value[e] ?? "");
		}
		function ke(e) {
			U[e] = !U[e];
		}
		async function $() {
			V.value = !0, H.value = {};
			try {
				let e = {};
				for (let [t, n] of Object.entries(G)) {
					if (!n) continue;
					let r = R.value[t], i = W[t] ?? "";
					r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : e[t] = i;
				}
				let t = await D.save(e);
				O.success("Settings saved."), I.value = t.settings, L.value = t.overridden, Y(), J(t.settings);
			} catch (e) {
				if (e instanceof i && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (H.value = t.errors, O.error("Please fix the validation errors.")) : O.error(e.message);
				} else O.error(e instanceof i ? e.message : "Failed to save settings.");
			} finally {
				V.value = !1;
			}
		}
		return oe(Ee), (e, t) => (g(), d("section", ce, [t[6] ||= f("header", { class: "admin-settings__head" }, [f("h1", {
			id: "settings-heading",
			class: "admin-settings__title"
		}, "Settings")], -1), B.value ? (g(), d("div", le, [m(ee, {
			variant: "text",
			lines: 6
		})])) : (g(), d(s, { key: 1 }, [f("div", ue, [(g(), d(s, null, y(k, (e) => f("button", {
			key: e.id,
			type: "button",
			role: "tab",
			"aria-selected": z.value === e.id,
			class: ae(["admin-settings__tab", { "is-active": z.value === e.id }]),
			onClick: (t) => z.value = e.id
		}, b(e.label), 11, de)), 64))]), f("div", {
			class: "admin-settings__panel",
			role: "tabpanel",
			"aria-label": `${z.value} settings`
		}, [q.value.length === 0 ? (g(), d("p", pe, " No settings in this group. ")) : (g(), d("form", {
			key: 1,
			class: "admin-settings__form",
			onSubmit: se($, ["prevent"])
		}, [(g(!0), d(s, null, y(q.value, (e) => (g(), d("div", {
			key: e,
			class: "admin-settings__field"
		}, [
			X(e) === "bool" ? (g(), d("div", me, [m(o, {
				"model-value": W[e] === "true" || W[e] === "1",
				label: P(e),
				"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), F(e) ? (g(), l(a, {
				key: 0,
				tone: "accent"
			}, {
				default: S(() => [...t[0] ||= [p("custom", -1)]]),
				_: 1
			})) : u("", !0)])) : X(e) === "int" || X(e) === "float" ? (g(), d(s, { key: 1 }, [f("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [p(b(P(e)) + " ", 1), F(e) ? (g(), l(a, {
				key: 0,
				tone: "accent"
			}, {
				default: S(() => [...t[1] ||= [p("custom", -1)]]),
				_: 1
			})) : u("", !0)], 8, he), f("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "number",
				value: W[e],
				min: Z(e).min,
				max: Z(e).max,
				step: X(e) === "float" ? "any" : void 0,
				placeholder: Z(e).min === void 0 ? void 0 : `min: ${Z(e).min}`,
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, C)], 64)) : De(e) ? (g(), d(s, { key: 2 }, [f("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [p(b(P(e)) + " ", 1), F(e) ? (g(), l(a, {
				key: 0,
				tone: "accent"
			}, {
				default: S(() => [...t[2] ||= [p("custom", -1)]]),
				_: 1
			})) : u("", !0)], 8, ge), m(ne, {
				"model-value": W[e] ?? "",
				options: Oe(e),
				label: P(e),
				"onUpdate:modelValue": (t) => Q(e, String(t))
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"onUpdate:modelValue"
			])], 64)) : x(Te).has(e) ? (g(), d(s, { key: 3 }, [f("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [p(b(P(e)) + " ", 1), F(e) ? (g(), l(a, {
				key: 0,
				tone: "accent"
			}, {
				default: S(() => [...t[3] ||= [p("custom", -1)]]),
				_: 1
			})) : u("", !0)], 8, _e), f("div", ve, [f("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: U[e] ? "text" : "password",
				autocomplete: "off",
				value: W[e],
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, ye), m(r, {
				variant: "ghost",
				size: "sm",
				"left-icon": U[e] ? "eye-off" : "eye",
				"aria-label": U[e] ? `Hide ${P(e)}` : `Show ${P(e)}`,
				onClick: (t) => ke(e)
			}, {
				default: S(() => [p(b(U[e] ? "Hide" : "Show"), 1)]),
				_: 2
			}, 1032, [
				"left-icon",
				"aria-label",
				"onClick"
			])])], 64)) : (g(), d(s, { key: 4 }, [f("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [p(b(P(e)) + " ", 1), F(e) ? (g(), l(a, {
				key: 0,
				tone: "accent"
			}, {
				default: S(() => [...t[4] ||= [p("custom", -1)]]),
				_: 1
			})) : u("", !0)], 8, be), f("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "text",
				autocomplete: "off",
				value: W[e],
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, xe)], 64)),
			H.value[e] ? (g(), d("span", Se, b(H.value[e]), 1)) : u("", !0),
			N[e] ? (g(), d("p", Ce, b(N[e]), 1)) : u("", !0)
		]))), 128)), f("div", w, [m(r, {
			type: "button",
			variant: "solid",
			size: "sm",
			disabled: !K.value,
			loading: V.value,
			onClick: $
		}, {
			default: S(() => [...t[5] ||= [p(" Save settings ", -1)]]),
			_: 1
		}, 8, ["disabled", "loading"])])], 32))], 8, fe)], 64))]));
	}
}), [["__scopeId", "data-v-6962a0a2"]]);
//#endregion
export { T as default };

//# sourceMappingURL=SettingsPage-WdwvEiqN.js.map