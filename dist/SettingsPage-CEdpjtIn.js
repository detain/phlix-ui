import { a as e, i as t, n, o as r, r as i, t as ee, u as a } from "./tokenStore-DfQvvLGI.js";
import { t as te } from "./Select-B0YIBPe2.js";
import { t as o } from "./Badge-Cmz5FPqw.js";
import { t as s } from "./Switch-BymhyT_V.js";
import { t as ne } from "./settings-m4upFcmH.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as re, normalizeClass as ie, onMounted as ae, openBlock as _, reactive as v, ref as y, renderList as b, toDisplayString as x, unref as S, withCtx as C, withModifiers as oe } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var se = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, ce = {
	key: 0,
	class: "admin-settings__skel"
}, le = {
	class: "admin-settings__tabs",
	role: "tablist",
	"aria-label": "Settings groups"
}, ue = ["aria-selected", "onClick"], de = ["aria-label"], fe = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, pe = {
	key: 0,
	class: "admin-settings__row"
}, me = ["for"], w = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"onInput"
], he = ["for"], ge = ["for"], _e = { class: "admin-settings__row" }, ve = [
	"id",
	"type",
	"value",
	"onInput"
], ye = ["for"], be = [
	"id",
	"value",
	"onInput"
], xe = {
	key: 5,
	class: "admin-settings__error",
	role: "alert"
}, Se = {
	key: 6,
	class: "admin-settings__help"
}, Ce = { class: "admin-settings__actions" }, T = /*#__PURE__*/ a(/* @__PURE__ */ g({
	__name: "SettingsPage",
	props: { client: {} },
	setup(a) {
		let g = a, T = re("apiBase", ""), E = l(() => typeof T == "string" ? T : T?.value ?? ""), D = new ne(g.client ?? new e({
			baseUrl: E.value,
			tokenStore: new ee()
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
		let I = y({}), L = y([]), R = y({}), z = y("transcoding"), B = y(!0), V = y(!1), H = y({}), U = v({}), W = v({}), G = v({}), K = l(() => Object.values(G).some(Boolean)), q = l(() => A[z.value] ?? []);
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
				O.error(e instanceof r ? e.message : "Failed to load settings.");
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
				if (e instanceof r && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (H.value = t.errors, O.error("Please fix the validation errors.")) : O.error(e.message);
				} else O.error(e instanceof r ? e.message : "Failed to save settings.");
			} finally {
				V.value = !1;
			}
		}
		return ae(Ee), (e, t) => (_(), f("section", se, [t[6] ||= p("header", { class: "admin-settings__head" }, [p("h1", {
			id: "settings-heading",
			class: "admin-settings__title"
		}, "Settings")], -1), B.value ? (_(), f("div", ce, [h(i, {
			variant: "text",
			lines: 6
		})])) : (_(), f(c, { key: 1 }, [p("div", le, [(_(), f(c, null, b(k, (e) => p("button", {
			key: e.id,
			type: "button",
			role: "tab",
			"aria-selected": z.value === e.id,
			class: ie(["admin-settings__tab", { "is-active": z.value === e.id }]),
			onClick: (t) => z.value = e.id
		}, x(e.label), 11, ue)), 64))]), p("div", {
			class: "admin-settings__panel",
			role: "tabpanel",
			"aria-label": `${z.value} settings`
		}, [q.value.length === 0 ? (_(), f("p", fe, " No settings in this group. ")) : (_(), f("form", {
			key: 1,
			class: "admin-settings__form",
			onSubmit: oe($, ["prevent"])
		}, [(_(!0), f(c, null, b(q.value, (e) => (_(), f("div", {
			key: e,
			class: "admin-settings__field"
		}, [
			X(e) === "bool" ? (_(), f("div", pe, [h(s, {
				"model-value": W[e] === "true" || W[e] === "1",
				label: P(e),
				"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), F(e) ? (_(), u(o, {
				key: 0,
				tone: "accent"
			}, {
				default: C(() => [...t[0] ||= [m("custom", -1)]]),
				_: 1
			})) : d("", !0)])) : X(e) === "int" || X(e) === "float" ? (_(), f(c, { key: 1 }, [p("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [m(x(P(e)) + " ", 1), F(e) ? (_(), u(o, {
				key: 0,
				tone: "accent"
			}, {
				default: C(() => [...t[1] ||= [m("custom", -1)]]),
				_: 1
			})) : d("", !0)], 8, me), p("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "number",
				value: W[e],
				min: Z(e).min,
				max: Z(e).max,
				step: X(e) === "float" ? "any" : void 0,
				placeholder: Z(e).min === void 0 ? void 0 : `min: ${Z(e).min}`,
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, w)], 64)) : De(e) ? (_(), f(c, { key: 2 }, [p("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [m(x(P(e)) + " ", 1), F(e) ? (_(), u(o, {
				key: 0,
				tone: "accent"
			}, {
				default: C(() => [...t[2] ||= [m("custom", -1)]]),
				_: 1
			})) : d("", !0)], 8, he), h(te, {
				"model-value": W[e] ?? "",
				options: Oe(e),
				label: P(e),
				"onUpdate:modelValue": (t) => Q(e, String(t))
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"onUpdate:modelValue"
			])], 64)) : S(Te).has(e) ? (_(), f(c, { key: 3 }, [p("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [m(x(P(e)) + " ", 1), F(e) ? (_(), u(o, {
				key: 0,
				tone: "accent"
			}, {
				default: C(() => [...t[3] ||= [m("custom", -1)]]),
				_: 1
			})) : d("", !0)], 8, ge), p("div", _e, [p("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: U[e] ? "text" : "password",
				autocomplete: "off",
				value: W[e],
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, ve), h(n, {
				variant: "ghost",
				size: "sm",
				"left-icon": U[e] ? "eye-off" : "eye",
				"aria-label": U[e] ? `Hide ${P(e)}` : `Show ${P(e)}`,
				onClick: (t) => ke(e)
			}, {
				default: C(() => [m(x(U[e] ? "Hide" : "Show"), 1)]),
				_: 2
			}, 1032, [
				"left-icon",
				"aria-label",
				"onClick"
			])])], 64)) : (_(), f(c, { key: 4 }, [p("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [m(x(P(e)) + " ", 1), F(e) ? (_(), u(o, {
				key: 0,
				tone: "accent"
			}, {
				default: C(() => [...t[4] ||= [m("custom", -1)]]),
				_: 1
			})) : d("", !0)], 8, ye), p("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "text",
				autocomplete: "off",
				value: W[e],
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, be)], 64)),
			H.value[e] ? (_(), f("span", xe, x(H.value[e]), 1)) : d("", !0),
			N[e] ? (_(), f("p", Se, x(N[e]), 1)) : d("", !0)
		]))), 128)), p("div", Ce, [h(n, {
			type: "button",
			variant: "solid",
			size: "sm",
			disabled: !K.value,
			loading: V.value,
			onClick: $
		}, {
			default: C(() => [...t[5] ||= [m(" Save settings ", -1)]]),
			_: 1
		}, 8, ["disabled", "loading"])])], 32))], 8, de)], 64))]));
	}
}), [["__scopeId", "data-v-6962a0a2"]]);
//#endregion
export { T as default };

//# sourceMappingURL=SettingsPage-CEdpjtIn.js.map