import { n as e } from "./Icon-ax5k7_G2.js";
import { a as t, c as n, n as r, t as i } from "./Button-BFaMKqH5.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as te } from "./Switch-CFZhdkXR.js";
import { t as ne } from "./Select-MLr8Xr5n.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { n as ie, t as ae } from "./EmptyState-Ds4WcVdG.js";
import { t as o } from "./Tabs-x8dUKZN5.js";
import { t as oe } from "./settings-m4upFcmH.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as se, onMounted as ce, openBlock as g, reactive as _, ref as v, renderList as le, toDisplayString as y, unref as b, withCtx as x, withModifiers as ue } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var de = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, fe = {
	key: 0,
	class: "admin-settings__skel"
}, pe = { class: "admin-settings__panel" }, me = {
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
], S = ["for"], ve = ["for"], ye = { class: "admin-settings__row" }, be = [
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
}, Te = { class: "admin-settings__actions" }, C = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "SettingsPage",
	props: { client: {} },
	setup(e) {
		let h = e, C = se("apiBase", ""), w = c(() => typeof C == "string" ? C : C?.value ?? ""), T = new oe(h.client ?? new r({
			baseUrl: w.value,
			tokenStore: new ee()
		})), E = re(), D = [
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
		].map((e) => ({
			value: e.id,
			label: e.label
		})), O = {
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
		}, Ee = {
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
		}, De = new Set(["tmdb.api_key", "trakt.client_secret"]), k = { "subtitles.default_language": [
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
		] }, A = {
			"tmdb.api_key": "TMDB API Key",
			"trakt.client_id": "Trakt Client ID",
			"trakt.client_secret": "Trakt Client Secret",
			"trakt.redirect_uri": "Trakt Redirect URI"
		}, j = {
			"tmdb.api_key": "Your TMDB (The Movie Database) API key — get one free at themoviedb.org → Settings → API (v3 auth). Used to fetch movie & TV metadata, posters, and external IDs.",
			"trakt.client_id": "Register an application at trakt.tv/oauth/applications to get a client ID and secret. Saving here overrides the TRAKT_CLIENT_ID environment variable.",
			"trakt.client_secret": "The client secret paired with your Trakt client ID. Overrides the TRAKT_CLIENT_SECRET environment variable.",
			"trakt.redirect_uri": "Must exactly match the redirect URI registered in your Trakt app — this server's /api/v1/oauth/trakt/callback URL."
		};
		function M(e) {
			return A[e] ? A[e] : (e.split(".").pop() ?? e).replace(/_/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function N(e) {
			return F.value.includes(e);
		}
		let P = v({}), F = v([]), I = v({}), L = v("transcoding"), R = v(!0), z = v(null), B = v(!1), V = v({}), H = _({}), U = _({}), W = _({}), G = c(() => Object.values(W).some(Boolean)), K = c(() => O[L.value] ?? []);
		function q(e) {
			for (let e of Object.keys(U)) delete U[e];
			for (let [t, n] of Object.entries(e)) U[t] = String(n ?? "");
		}
		function J() {
			for (let e of Object.keys(W)) delete W[e];
		}
		async function Y() {
			R.value = !0, z.value = null;
			try {
				let e = await T.get();
				P.value = e.settings, F.value = e.overridden, I.value = e.types, q(e.settings), J(), V.value = {};
			} catch (e) {
				z.value = n(e, "Failed to load settings."), E.error(z.value);
			} finally {
				R.value = !1;
			}
		}
		function X(e) {
			return I.value[e] ?? "string";
		}
		function Oe(e) {
			return k[e] !== void 0;
		}
		function ke(e) {
			return k[e] ?? [];
		}
		function Z(e) {
			return Ee[e] ?? {};
		}
		function Q(e, t) {
			U[e] = t, W[e] = t !== String(P.value[e] ?? "");
		}
		function Ae(e) {
			H[e] = !H[e];
		}
		async function $() {
			B.value = !0, V.value = {};
			try {
				let e = {};
				for (let [t, n] of Object.entries(W)) {
					if (!n) continue;
					let r = I.value[t], i = U[t] ?? "";
					r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : e[t] = i;
				}
				let t = await T.save(e);
				E.success("Settings saved."), P.value = t.settings, F.value = t.overridden, J(), q(t.settings);
			} catch (e) {
				if (e instanceof t && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (V.value = t.errors, E.error("Please fix the validation errors.")) : E.error(e.message);
				} else E.error(e instanceof t ? e.message : "Failed to save settings.");
			} finally {
				B.value = !1;
			}
		}
		return ce(Y), (e, t) => (g(), d("section", de, [t[8] ||= f("header", { class: "admin-settings__head" }, [f("h1", {
			id: "settings-heading",
			class: "admin-settings__title"
		}, "Settings")], -1), R.value ? (g(), d("div", fe, [m(ie, {
			variant: "text",
			lines: 6
		})])) : z.value ? (g(), l(ae, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: z.value
		}, {
			actions: x(() => [m(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: Y
			}, {
				default: x(() => [...t[1] ||= [p("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (g(), l(o, {
			key: 2,
			modelValue: L.value,
			"onUpdate:modelValue": t[0] ||= (e) => L.value = e,
			tabs: b(D),
			label: "Settings groups"
		}, {
			default: x(() => [f("div", pe, [K.value.length === 0 ? (g(), d("p", me, " No settings in this group. ")) : (g(), d("form", {
				key: 1,
				class: "admin-settings__form",
				onSubmit: ue($, ["prevent"])
			}, [(g(!0), d(s, null, le(K.value, (e) => (g(), d("div", {
				key: e,
				class: "admin-settings__field"
			}, [
				X(e) === "bool" ? (g(), d("div", he, [m(te, {
					"model-value": U[e] === "true" || U[e] === "1",
					label: M(e),
					"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
				}, null, 8, [
					"model-value",
					"label",
					"onUpdate:modelValue"
				]), N(e) ? (g(), l(a, {
					key: 0,
					tone: "accent"
				}, {
					default: x(() => [...t[2] ||= [p("custom", -1)]]),
					_: 1
				})) : u("", !0)])) : X(e) === "int" || X(e) === "float" ? (g(), d(s, { key: 1 }, [f("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [p(y(M(e)) + " ", 1), N(e) ? (g(), l(a, {
					key: 0,
					tone: "accent"
				}, {
					default: x(() => [...t[3] ||= [p("custom", -1)]]),
					_: 1
				})) : u("", !0)], 8, ge), f("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "number",
					value: U[e],
					min: Z(e).min,
					max: Z(e).max,
					step: X(e) === "float" ? "any" : void 0,
					placeholder: Z(e).min === void 0 ? void 0 : `min: ${Z(e).min}`,
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, _e)], 64)) : Oe(e) ? (g(), d(s, { key: 2 }, [f("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [p(y(M(e)) + " ", 1), N(e) ? (g(), l(a, {
					key: 0,
					tone: "accent"
				}, {
					default: x(() => [...t[4] ||= [p("custom", -1)]]),
					_: 1
				})) : u("", !0)], 8, S), m(ne, {
					"model-value": U[e] ?? "",
					options: ke(e),
					label: M(e),
					"onUpdate:modelValue": (t) => Q(e, String(t))
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"onUpdate:modelValue"
				])], 64)) : b(De).has(e) ? (g(), d(s, { key: 3 }, [f("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [p(y(M(e)) + " ", 1), N(e) ? (g(), l(a, {
					key: 0,
					tone: "accent"
				}, {
					default: x(() => [...t[5] ||= [p("custom", -1)]]),
					_: 1
				})) : u("", !0)], 8, ve), f("div", ye, [f("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: H[e] ? "text" : "password",
					autocomplete: "off",
					value: U[e],
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, be), m(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": H[e] ? "eye-off" : "eye",
					"aria-label": H[e] ? `Hide ${M(e)}` : `Show ${M(e)}`,
					onClick: (t) => Ae(e)
				}, {
					default: x(() => [p(y(H[e] ? "Hide" : "Show"), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"aria-label",
					"onClick"
				])])], 64)) : (g(), d(s, { key: 4 }, [f("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [p(y(M(e)) + " ", 1), N(e) ? (g(), l(a, {
					key: 0,
					tone: "accent"
				}, {
					default: x(() => [...t[6] ||= [p("custom", -1)]]),
					_: 1
				})) : u("", !0)], 8, xe), f("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "text",
					autocomplete: "off",
					value: U[e],
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, Se)], 64)),
				V.value[e] ? (g(), d("span", Ce, y(V.value[e]), 1)) : u("", !0),
				j[e] ? (g(), d("p", we, y(j[e]), 1)) : u("", !0)
			]))), 128)), f("div", Te, [m(i, {
				type: "button",
				variant: "solid",
				size: "sm",
				disabled: !G.value,
				loading: B.value,
				onClick: $
			}, {
				default: x(() => [...t[7] ||= [p(" Save settings ", -1)]]),
				_: 1
			}, 8, ["disabled", "loading"])])], 32))])]),
			_: 1
		}, 8, ["modelValue", "tabs"]))]));
	}
}), [["__scopeId", "data-v-b5234e12"]]);
//#endregion
export { C as default };

//# sourceMappingURL=SettingsPage-Dh0DJXfV.js.map