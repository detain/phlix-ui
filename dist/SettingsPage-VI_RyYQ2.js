import { n as e } from "./Icon-ax5k7_G2.js";
import { a as t, c as n, n as r, t as i } from "./Button-GJ9vHE0J.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as o } from "./Switch-CFZhdkXR.js";
import { t as s } from "./Select-CKC9vNUQ.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { n as ne, t as re } from "./EmptyState-Ds4WcVdG.js";
import { t as ie } from "./settings-m4upFcmH.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ae, normalizeClass as oe, onMounted as se, openBlock as _, reactive as v, ref as y, renderList as b, toDisplayString as x, unref as ce, withCtx as S, withModifiers as C } from "vue";
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
}, ge = ["for"], _e = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"onInput"
], ve = ["for"], ye = ["for"], be = { class: "admin-settings__row" }, xe = [
	"id",
	"type",
	"value",
	"onInput"
], Se = ["for"], Ce = [
	"id",
	"value",
	"onInput"
], we = {
	key: 5,
	class: "admin-settings__error",
	role: "alert"
}, Te = {
	key: 6,
	class: "admin-settings__help"
}, w = { class: "admin-settings__actions" }, T = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "SettingsPage",
	props: { client: {} },
	setup(e) {
		let g = e, T = ae("apiBase", ""), E = l(() => typeof T == "string" ? T : T?.value ?? ""), D = new ie(g.client ?? new r({
			baseUrl: E.value,
			tokenStore: new ee()
		})), O = te(), Ee = [
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
		], De = {
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
		}, Oe = {
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
		}, k = new Set(["tmdb.api_key", "trakt.client_secret"]), A = { "subtitles.default_language": [
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
		let F = y({}), I = y([]), L = y({}), R = y("transcoding"), z = y(!0), B = y(null), V = y(!1), H = y({}), U = v({}), W = v({}), G = v({}), ke = l(() => Object.values(G).some(Boolean)), K = l(() => De[R.value] ?? []);
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
				let e = await D.get();
				F.value = e.settings, I.value = e.overridden, L.value = e.types, q(e.settings), J(), H.value = {};
			} catch (e) {
				B.value = n(e, "Failed to load settings."), O.error(B.value);
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
			return Oe[e] ?? {};
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
				let t = await D.save(e);
				O.success("Settings saved."), F.value = t.settings, I.value = t.overridden, J(), q(t.settings);
			} catch (e) {
				if (e instanceof t && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (H.value = t.errors, O.error("Please fix the validation errors.")) : O.error(e.message);
				} else O.error(e instanceof t ? e.message : "Failed to save settings.");
			} finally {
				V.value = !1;
			}
		}
		return se(Y), (e, t) => (_(), f("section", le, [t[7] ||= p("header", { class: "admin-settings__head" }, [p("h1", {
			id: "settings-heading",
			class: "admin-settings__title"
		}, "Settings")], -1), z.value ? (_(), f("div", ue, [h(ne, {
			variant: "text",
			lines: 6
		})])) : B.value ? (_(), u(re, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: B.value
		}, {
			actions: S(() => [h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: Y
			}, {
				default: S(() => [...t[0] ||= [m("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (_(), f(c, { key: 2 }, [p("div", de, [(_(), f(c, null, b(Ee, (e) => p("button", {
			key: e.id,
			type: "button",
			role: "tab",
			"aria-selected": R.value === e.id,
			class: oe(["admin-settings__tab", { "is-active": R.value === e.id }]),
			onClick: (t) => R.value = e.id
		}, x(e.label), 11, fe)), 64))]), p("div", {
			class: "admin-settings__panel",
			role: "tabpanel",
			"aria-label": `${R.value} settings`
		}, [K.value.length === 0 ? (_(), f("p", me, " No settings in this group. ")) : (_(), f("form", {
			key: 1,
			class: "admin-settings__form",
			onSubmit: C($, ["prevent"])
		}, [(_(!0), f(c, null, b(K.value, (e) => (_(), f("div", {
			key: e,
			class: "admin-settings__field"
		}, [
			X(e) === "bool" ? (_(), f("div", he, [h(o, {
				"model-value": W[e] === "true" || W[e] === "1",
				label: N(e),
				"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), P(e) ? (_(), u(a, {
				key: 0,
				tone: "accent"
			}, {
				default: S(() => [...t[1] ||= [m("custom", -1)]]),
				_: 1
			})) : d("", !0)])) : X(e) === "int" || X(e) === "float" ? (_(), f(c, { key: 1 }, [p("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [m(x(N(e)) + " ", 1), P(e) ? (_(), u(a, {
				key: 0,
				tone: "accent"
			}, {
				default: S(() => [...t[2] ||= [m("custom", -1)]]),
				_: 1
			})) : d("", !0)], 8, ge), p("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "number",
				value: W[e],
				min: Z(e).min,
				max: Z(e).max,
				step: X(e) === "float" ? "any" : void 0,
				placeholder: Z(e).min === void 0 ? void 0 : `min: ${Z(e).min}`,
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, _e)], 64)) : Ae(e) ? (_(), f(c, { key: 2 }, [p("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [m(x(N(e)) + " ", 1), P(e) ? (_(), u(a, {
				key: 0,
				tone: "accent"
			}, {
				default: S(() => [...t[3] ||= [m("custom", -1)]]),
				_: 1
			})) : d("", !0)], 8, ve), h(s, {
				"model-value": W[e] ?? "",
				options: je(e),
				label: N(e),
				"onUpdate:modelValue": (t) => Q(e, String(t))
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"onUpdate:modelValue"
			])], 64)) : ce(k).has(e) ? (_(), f(c, { key: 3 }, [p("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [m(x(N(e)) + " ", 1), P(e) ? (_(), u(a, {
				key: 0,
				tone: "accent"
			}, {
				default: S(() => [...t[4] ||= [m("custom", -1)]]),
				_: 1
			})) : d("", !0)], 8, ye), p("div", be, [p("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: U[e] ? "text" : "password",
				autocomplete: "off",
				value: W[e],
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, xe), h(i, {
				variant: "ghost",
				size: "sm",
				"left-icon": U[e] ? "eye-off" : "eye",
				"aria-label": U[e] ? `Hide ${N(e)}` : `Show ${N(e)}`,
				onClick: (t) => Me(e)
			}, {
				default: S(() => [m(x(U[e] ? "Hide" : "Show"), 1)]),
				_: 2
			}, 1032, [
				"left-icon",
				"aria-label",
				"onClick"
			])])], 64)) : (_(), f(c, { key: 4 }, [p("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [m(x(N(e)) + " ", 1), P(e) ? (_(), u(a, {
				key: 0,
				tone: "accent"
			}, {
				default: S(() => [...t[5] ||= [m("custom", -1)]]),
				_: 1
			})) : d("", !0)], 8, Se), p("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "text",
				autocomplete: "off",
				value: W[e],
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, Ce)], 64)),
			H.value[e] ? (_(), f("span", we, x(H.value[e]), 1)) : d("", !0),
			M[e] ? (_(), f("p", Te, x(M[e]), 1)) : d("", !0)
		]))), 128)), p("div", w, [h(i, {
			type: "button",
			variant: "solid",
			size: "sm",
			disabled: !ke.value,
			loading: V.value,
			onClick: $
		}, {
			default: S(() => [...t[6] ||= [m(" Save settings ", -1)]]),
			_: 1
		}, 8, ["disabled", "loading"])])], 32))], 8, pe)], 64))]));
	}
}), [["__scopeId", "data-v-fcbf13c7"]]);
//#endregion
export { T as default };

//# sourceMappingURL=SettingsPage-VI_RyYQ2.js.map