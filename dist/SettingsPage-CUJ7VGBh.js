import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, d as n, n as r, s as i, t as a } from "./Button-5ZSsUmsI.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as s } from "./Switch-CFZhdkXR.js";
import { t as ee } from "./Select-DLwgQInL.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as c } from "./Skeleton-DkSoWF3C.js";
import { t as ne } from "./EmptyState-B2QnGIQT.js";
import { t as re } from "./Tabs-x8dUKZN5.js";
import { t as ie } from "./settings-m4upFcmH.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ae, onMounted as oe, openBlock as v, reactive as y, ref as b, renderList as se, toDisplayString as x, unref as S, withCtx as C, withModifiers as ce } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var le = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, ue = {
	key: 0,
	class: "admin-settings__skel"
}, de = { class: "admin-settings__panel" }, fe = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, pe = {
	key: 0,
	class: "admin-settings__row"
}, me = ["for"], he = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"onInput"
], ge = ["for"], w = ["for"], _e = { class: "admin-settings__row" }, ve = [
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
}, Ce = { class: "admin-settings__actions" }, T = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SettingsPage",
	props: { client: {} },
	setup(e) {
		let _ = e, T = ae("apiBase", ""), we = u(() => typeof T == "string" ? T : T?.value ?? ""), E = new ie(_.client ?? new r({
			baseUrl: we.value,
			tokenStore: new i()
		})), D = te(), O = [
			{
				id: "access",
				label: "Access"
			},
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
		})), k = {
			access: ["auth.signup_mode"],
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
		}, Te = {
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
		}, Ee = new Set(["tmdb.api_key", "trakt.client_secret"]), A = {
			"auth.signup_mode": [
				{
					value: "open",
					label: "Open — anyone can sign up"
				},
				{
					value: "approval",
					label: "Require admin approval"
				},
				{
					value: "disabled",
					label: "Disabled — no new signups"
				}
			],
			"subtitles.default_language": [
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
			]
		}, j = {
			"auth.signup_mode": "Signup mode",
			"tmdb.api_key": "TMDB API Key",
			"trakt.client_id": "Trakt Client ID",
			"trakt.client_secret": "Trakt Client Secret",
			"trakt.redirect_uri": "Trakt Redirect URI"
		}, M = {
			"auth.signup_mode": "Controls who can create an account. \"Open\" lets anyone register and sign in immediately. \"Require admin approval\" creates accounts in a pending state — review them in the Users page approval queue before they can sign in. \"Disabled\" turns off new signups entirely.",
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
		let F = b({}), I = b([]), L = b({}), R = b("access"), z = b(!0), B = b(null), V = b(!1), H = b({}), U = y({}), W = y({}), G = y({}), De = u(() => Object.values(G).some(Boolean)), K = u(() => k[R.value] ?? []);
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
				let e = await E.get();
				F.value = e.settings, I.value = e.overridden, L.value = e.types, q(e.settings), J(), H.value = {};
			} catch (e) {
				B.value = n(e, "Failed to load settings."), D.error(B.value);
			} finally {
				z.value = !1;
			}
		}
		function X(e) {
			return L.value[e] ?? "string";
		}
		function Oe(e) {
			return A[e] !== void 0;
		}
		function ke(e) {
			return A[e] ?? [];
		}
		function Z(e) {
			return Te[e] ?? {};
		}
		function Q(e, t) {
			W[e] = t, G[e] = t !== String(F.value[e] ?? "");
		}
		function Ae(e) {
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
				let t = await E.save(e);
				D.success("Settings saved."), F.value = t.settings, I.value = t.overridden, J(), q(t.settings);
			} catch (e) {
				if (e instanceof t && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (H.value = t.errors, D.error("Please fix the validation errors.")) : D.error(e.message);
				} else D.error(e instanceof t ? e.message : "Failed to save settings.");
			} finally {
				V.value = !1;
			}
		}
		return oe(Y), (e, t) => (v(), p("section", le, [t[8] ||= m("header", { class: "admin-settings__head" }, [m("h1", {
			id: "settings-heading",
			class: "admin-settings__title"
		}, "Settings")], -1), z.value ? (v(), p("div", ue, [g(c, {
			variant: "text",
			lines: 6
		})])) : B.value ? (v(), d(ne, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: B.value
		}, {
			actions: C(() => [g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: Y
			}, {
				default: C(() => [...t[1] ||= [h("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (v(), d(re, {
			key: 2,
			modelValue: R.value,
			"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
			tabs: S(O),
			label: "Settings groups"
		}, {
			default: C(() => [m("div", de, [K.value.length === 0 ? (v(), p("p", fe, " No settings in this group. ")) : (v(), p("form", {
				key: 1,
				class: "admin-settings__form",
				onSubmit: ce($, ["prevent"])
			}, [(v(!0), p(l, null, se(K.value, (e) => (v(), p("div", {
				key: e,
				class: "admin-settings__field"
			}, [
				X(e) === "bool" ? (v(), p("div", pe, [g(s, {
					"model-value": W[e] === "true" || W[e] === "1",
					label: N(e),
					"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
				}, null, 8, [
					"model-value",
					"label",
					"onUpdate:modelValue"
				]), P(e) ? (v(), d(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[2] ||= [h("custom", -1)]]),
					_: 1
				})) : f("", !0)])) : X(e) === "int" || X(e) === "float" ? (v(), p(l, { key: 1 }, [m("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [h(x(N(e)) + " ", 1), P(e) ? (v(), d(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[3] ||= [h("custom", -1)]]),
					_: 1
				})) : f("", !0)], 8, me), m("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "number",
					value: W[e],
					min: Z(e).min,
					max: Z(e).max,
					step: X(e) === "float" ? "any" : void 0,
					placeholder: Z(e).min === void 0 ? void 0 : `min: ${Z(e).min}`,
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, he)], 64)) : Oe(e) ? (v(), p(l, { key: 2 }, [m("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [h(x(N(e)) + " ", 1), P(e) ? (v(), d(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[4] ||= [h("custom", -1)]]),
					_: 1
				})) : f("", !0)], 8, ge), g(ee, {
					"model-value": W[e] ?? "",
					options: ke(e),
					label: N(e),
					"onUpdate:modelValue": (t) => Q(e, String(t))
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"onUpdate:modelValue"
				])], 64)) : S(Ee).has(e) ? (v(), p(l, { key: 3 }, [m("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [h(x(N(e)) + " ", 1), P(e) ? (v(), d(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[5] ||= [h("custom", -1)]]),
					_: 1
				})) : f("", !0)], 8, w), m("div", _e, [m("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: U[e] ? "text" : "password",
					autocomplete: "off",
					value: W[e],
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, ve), g(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": U[e] ? "eye-off" : "eye",
					"aria-label": U[e] ? `Hide ${N(e)}` : `Show ${N(e)}`,
					onClick: (t) => Ae(e)
				}, {
					default: C(() => [h(x(U[e] ? "Hide" : "Show"), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"aria-label",
					"onClick"
				])])], 64)) : (v(), p(l, { key: 4 }, [m("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [h(x(N(e)) + " ", 1), P(e) ? (v(), d(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[6] ||= [h("custom", -1)]]),
					_: 1
				})) : f("", !0)], 8, ye), m("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "text",
					autocomplete: "off",
					value: W[e],
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, be)], 64)),
				H.value[e] ? (v(), p("span", xe, x(H.value[e]), 1)) : f("", !0),
				M[e] ? (v(), p("p", Se, x(M[e]), 1)) : f("", !0)
			]))), 128)), m("div", Ce, [g(a, {
				type: "button",
				variant: "solid",
				size: "sm",
				disabled: !De.value,
				loading: V.value,
				onClick: $
			}, {
				default: C(() => [...t[7] ||= [h(" Save settings ", -1)]]),
				_: 1
			}, 8, ["disabled", "loading"])])], 32))])]),
			_: 1
		}, 8, ["modelValue", "tabs"]))]));
	}
}), [["__scopeId", "data-v-215448d6"]]);
//#endregion
export { T as default };

//# sourceMappingURL=SettingsPage-CUJ7VGBh.js.map