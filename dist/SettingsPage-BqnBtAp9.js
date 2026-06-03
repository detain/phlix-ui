import { a as e, c as t, d as n, n as r, t as i } from "./Button-C4PyCjLX.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as a } from "./Badge-D9Tdn6WP.js";
import { t as te } from "./Switch-R1pbcsd-.js";
import { t as ne } from "./Select-CmN-4YbZ.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { n as s, t as c } from "./EmptyState-BEMIpc2l.js";
import { t as re } from "./settings-m4upFcmH.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ie, normalizeClass as ae, onMounted as oe, openBlock as v, reactive as y, ref as b, renderList as x, toDisplayString as S, unref as se, withCtx as C, withModifiers as ce } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var le = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, ue = {
	key: 0,
	class: "admin-settings__skel"
}, de = {
	class: "admin-settings__tabs",
	role: "tablist",
	"aria-label": "Settings groups"
}, fe = ["aria-selected", "onClick"], pe = ["aria-label"], me = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, he = {
	key: 0,
	class: "admin-settings__row"
}, w = ["for"], ge = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"onInput"
], _e = ["for"], ve = ["for"], ye = { class: "admin-settings__row" }, be = [
	"id",
	"type",
	"value",
	"onInput"
], xe = ["for"], Se = [
	"id",
	"value",
	"onInput"
], Ce = {
	key: 5,
	class: "admin-settings__error",
	role: "alert"
}, we = {
	key: 6,
	class: "admin-settings__help"
}, T = { class: "admin-settings__actions" }, E = /*#__PURE__*/ n(/* @__PURE__ */ _({
	__name: "SettingsPage",
	props: { client: {} },
	setup(n) {
		let _ = n, E = ie("apiBase", ""), D = u(() => typeof E == "string" ? E : E?.value ?? ""), O = new re(_.client ?? new r({
			baseUrl: D.value,
			tokenStore: new ee()
		})), k = o(), Te = [
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
		], Ee = {
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
		}, De = {
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
		}, Oe = new Set(["tmdb.api_key", "trakt.client_secret"]), A = { "subtitles.default_language": [
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
		] }, j = {
			"tmdb.api_key": "TMDB API Key",
			"trakt.client_id": "Trakt Client ID",
			"trakt.client_secret": "Trakt Client Secret",
			"trakt.redirect_uri": "Trakt Redirect URI"
		}, M = {
			"tmdb.api_key": "Your TMDB (The Movie Database) API key — get one free at themoviedb.org → Settings → API (v3 auth). Used to fetch movie & TV metadata, posters, and external IDs.",
			"trakt.client_id": "Register an application at trakt.tv/oauth/applications to get a client ID and secret. Saving here overrides the TRAKT_CLIENT_ID environment variable.",
			"trakt.client_secret": "The client secret paired with your Trakt client ID. Overrides the TRAKT_CLIENT_SECRET environment variable.",
			"trakt.redirect_uri": "Must exactly match the redirect URI registered in your Trakt app — this server's /api/v1/oauth/trakt/callback URL."
		};
		function N(e) {
			return j[e] ? j[e] : (e.split(".").pop() ?? e).replace(/_/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function P(e) {
			return I.value.includes(e);
		}
		let F = b({}), I = b([]), L = b({}), R = b("transcoding"), z = b(!0), B = b(null), V = b(!1), H = b({}), U = y({}), W = y({}), G = y({}), ke = u(() => Object.values(G).some(Boolean)), K = u(() => Ee[R.value] ?? []);
		function q(e) {
			for (let e of Object.keys(W)) delete W[e];
			for (let [t, n] of Object.entries(e)) W[t] = String(n ?? "");
		}
		function J() {
			for (let e of Object.keys(G)) delete G[e];
		}
		async function Y() {
			z.value = !0, B.value = null;
			try {
				let e = await O.get();
				F.value = e.settings, I.value = e.overridden, L.value = e.types, q(e.settings), J(), H.value = {};
			} catch (e) {
				B.value = t(e, "Failed to load settings."), k.error(B.value);
			} finally {
				z.value = !1;
			}
		}
		function X(e) {
			return L.value[e] ?? "string";
		}
		function Ae(e) {
			return A[e] !== void 0;
		}
		function je(e) {
			return A[e] ?? [];
		}
		function Z(e) {
			return De[e] ?? {};
		}
		function Q(e, t) {
			W[e] = t, G[e] = t !== String(F.value[e] ?? "");
		}
		function Me(e) {
			U[e] = !U[e];
		}
		async function $() {
			V.value = !0, H.value = {};
			try {
				let e = {};
				for (let [t, n] of Object.entries(G)) {
					if (!n) continue;
					let r = L.value[t], i = W[t] ?? "";
					r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : e[t] = i;
				}
				let t = await O.save(e);
				k.success("Settings saved."), F.value = t.settings, I.value = t.overridden, J(), q(t.settings);
			} catch (t) {
				if (t instanceof e && t.status === 400) {
					let e = t.body;
					e?.errors && Object.keys(e.errors).length > 0 ? (H.value = e.errors, k.error("Please fix the validation errors.")) : k.error(t.message);
				} else k.error(t instanceof e ? t.message : "Failed to save settings.");
			} finally {
				V.value = !1;
			}
		}
		return oe(Y), (e, t) => (v(), p("section", le, [t[7] ||= m("header", { class: "admin-settings__head" }, [m("h1", {
			id: "settings-heading",
			class: "admin-settings__title"
		}, "Settings")], -1), z.value ? (v(), p("div", ue, [g(s, {
			variant: "text",
			lines: 6
		})])) : B.value ? (v(), d(c, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: B.value
		}, {
			actions: C(() => [g(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: Y
			}, {
				default: C(() => [...t[0] ||= [h("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (v(), p(l, { key: 2 }, [m("div", de, [(v(), p(l, null, x(Te, (e) => m("button", {
			key: e.id,
			type: "button",
			role: "tab",
			"aria-selected": R.value === e.id,
			class: ae(["admin-settings__tab", { "is-active": R.value === e.id }]),
			onClick: (t) => R.value = e.id
		}, S(e.label), 11, fe)), 64))]), m("div", {
			class: "admin-settings__panel",
			role: "tabpanel",
			"aria-label": `${R.value} settings`
		}, [K.value.length === 0 ? (v(), p("p", me, " No settings in this group. ")) : (v(), p("form", {
			key: 1,
			class: "admin-settings__form",
			onSubmit: ce($, ["prevent"])
		}, [(v(!0), p(l, null, x(K.value, (e) => (v(), p("div", {
			key: e,
			class: "admin-settings__field"
		}, [
			X(e) === "bool" ? (v(), p("div", he, [g(te, {
				"model-value": W[e] === "true" || W[e] === "1",
				label: N(e),
				"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), P(e) ? (v(), d(a, {
				key: 0,
				tone: "accent"
			}, {
				default: C(() => [...t[1] ||= [h("custom", -1)]]),
				_: 1
			})) : f("", !0)])) : X(e) === "int" || X(e) === "float" ? (v(), p(l, { key: 1 }, [m("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [h(S(N(e)) + " ", 1), P(e) ? (v(), d(a, {
				key: 0,
				tone: "accent"
			}, {
				default: C(() => [...t[2] ||= [h("custom", -1)]]),
				_: 1
			})) : f("", !0)], 8, w), m("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "number",
				value: W[e],
				min: Z(e).min,
				max: Z(e).max,
				step: X(e) === "float" ? "any" : void 0,
				placeholder: Z(e).min === void 0 ? void 0 : `min: ${Z(e).min}`,
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, ge)], 64)) : Ae(e) ? (v(), p(l, { key: 2 }, [m("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [h(S(N(e)) + " ", 1), P(e) ? (v(), d(a, {
				key: 0,
				tone: "accent"
			}, {
				default: C(() => [...t[3] ||= [h("custom", -1)]]),
				_: 1
			})) : f("", !0)], 8, _e), g(ne, {
				"model-value": W[e] ?? "",
				options: je(e),
				label: N(e),
				"onUpdate:modelValue": (t) => Q(e, String(t))
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"onUpdate:modelValue"
			])], 64)) : se(Oe).has(e) ? (v(), p(l, { key: 3 }, [m("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [h(S(N(e)) + " ", 1), P(e) ? (v(), d(a, {
				key: 0,
				tone: "accent"
			}, {
				default: C(() => [...t[4] ||= [h("custom", -1)]]),
				_: 1
			})) : f("", !0)], 8, ve), m("div", ye, [m("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: U[e] ? "text" : "password",
				autocomplete: "off",
				value: W[e],
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, be), g(i, {
				variant: "ghost",
				size: "sm",
				"left-icon": U[e] ? "eye-off" : "eye",
				"aria-label": U[e] ? `Hide ${N(e)}` : `Show ${N(e)}`,
				onClick: (t) => Me(e)
			}, {
				default: C(() => [h(S(U[e] ? "Hide" : "Show"), 1)]),
				_: 2
			}, 1032, [
				"left-icon",
				"aria-label",
				"onClick"
			])])], 64)) : (v(), p(l, { key: 4 }, [m("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [h(S(N(e)) + " ", 1), P(e) ? (v(), d(a, {
				key: 0,
				tone: "accent"
			}, {
				default: C(() => [...t[5] ||= [h("custom", -1)]]),
				_: 1
			})) : f("", !0)], 8, xe), m("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "text",
				autocomplete: "off",
				value: W[e],
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, Se)], 64)),
			H.value[e] ? (v(), p("span", Ce, S(H.value[e]), 1)) : f("", !0),
			M[e] ? (v(), p("p", we, S(M[e]), 1)) : f("", !0)
		]))), 128)), m("div", T, [g(i, {
			type: "button",
			variant: "solid",
			size: "sm",
			disabled: !ke.value,
			loading: V.value,
			onClick: $
		}, {
			default: C(() => [...t[6] ||= [h(" Save settings ", -1)]]),
			_: 1
		}, 8, ["disabled", "loading"])])], 32))], 8, pe)], 64))]));
	}
}), [["__scopeId", "data-v-fcbf13c7"]]);
//#endregion
export { E as default };

//# sourceMappingURL=SettingsPage-BqnBtAp9.js.map