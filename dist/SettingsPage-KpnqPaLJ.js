import { n as e } from "./Icon-ax5k7_G2.js";
import { l as t, n, p as r, t as i, u as a } from "./Button-MsRePfWv.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./Switch-CFZhdkXR.js";
import { t as te } from "./Select-DLwgQInL.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as re } from "./Skeleton-DkSoWF3C.js";
import { t as ie } from "./EmptyState-B2QnGIQT.js";
import { t as s } from "./Tabs-x8dUKZN5.js";
import { t as ae } from "./settings-m4upFcmH.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as oe, onMounted as se, openBlock as _, reactive as v, ref as y, renderList as ce, toDisplayString as b, unref as x, withCtx as S, withModifiers as le } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var ue = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, de = {
	key: 0,
	class: "admin-settings__skel"
}, fe = { class: "admin-settings__panel" }, pe = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, me = {
	key: 0,
	class: "admin-settings__row"
}, he = ["for"], ge = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"onInput"
], C = ["for"], _e = ["for"], ve = { class: "admin-settings__row" }, ye = [
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
}, we = { class: "admin-settings__actions" }, w = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "SettingsPage",
	props: { client: {} },
	setup(e) {
		let g = e, w = oe("apiBase", ""), Te = l(() => typeof w == "string" ? w : w?.value ?? ""), T = new ae(g.client ?? new n({
			baseUrl: Te.value,
			tokenStore: new t()
		})), E = ne(), D = [
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
		})), O = {
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
		}, De = new Set(["tmdb.api_key", "trakt.client_secret"]), k = {
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
		}, A = {
			"auth.signup_mode": "Signup mode",
			"tmdb.api_key": "TMDB API Key",
			"trakt.client_id": "Trakt Client ID",
			"trakt.client_secret": "Trakt Client Secret",
			"trakt.redirect_uri": "Trakt Redirect URI"
		}, j = {
			"auth.signup_mode": "Controls who can create an account. \"Open\" lets anyone register and sign in immediately. \"Require admin approval\" creates accounts in a pending state — review them in the Users page approval queue before they can sign in. \"Disabled\" turns off new signups entirely.",
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
		let P = y({}), F = y([]), I = y({}), L = y("access"), R = y(!0), z = y(null), B = y(!1), V = y({}), H = v({}), U = v({}), W = v({}), G = l(() => Object.values(W).some(Boolean)), K = l(() => O[L.value] ?? []);
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
				z.value = r(e, "Failed to load settings."), E.error(z.value);
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
				if (e instanceof a && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (V.value = t.errors, E.error("Please fix the validation errors.")) : E.error(e.message);
				} else E.error(e instanceof a ? e.message : "Failed to save settings.");
			} finally {
				B.value = !1;
			}
		}
		return se(Y), (e, t) => (_(), f("section", ue, [t[8] ||= p("header", { class: "admin-settings__head" }, [p("h1", {
			id: "settings-heading",
			class: "admin-settings__title"
		}, "Settings")], -1), R.value ? (_(), f("div", de, [h(re, {
			variant: "text",
			lines: 6
		})])) : z.value ? (_(), u(ie, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: z.value
		}, {
			actions: S(() => [h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: Y
			}, {
				default: S(() => [...t[1] ||= [m("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (_(), u(s, {
			key: 2,
			modelValue: L.value,
			"onUpdate:modelValue": t[0] ||= (e) => L.value = e,
			tabs: x(D),
			label: "Settings groups"
		}, {
			default: S(() => [p("div", fe, [K.value.length === 0 ? (_(), f("p", pe, " No settings in this group. ")) : (_(), f("form", {
				key: 1,
				class: "admin-settings__form",
				onSubmit: le($, ["prevent"])
			}, [(_(!0), f(c, null, ce(K.value, (e) => (_(), f("div", {
				key: e,
				class: "admin-settings__field"
			}, [
				X(e) === "bool" ? (_(), f("div", me, [h(ee, {
					"model-value": U[e] === "true" || U[e] === "1",
					label: M(e),
					"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
				}, null, 8, [
					"model-value",
					"label",
					"onUpdate:modelValue"
				]), N(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: S(() => [...t[2] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)])) : X(e) === "int" || X(e) === "float" ? (_(), f(c, { key: 1 }, [p("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [m(b(M(e)) + " ", 1), N(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: S(() => [...t[3] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)], 8, he), p("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "number",
					value: U[e],
					min: Z(e).min,
					max: Z(e).max,
					step: X(e) === "float" ? "any" : void 0,
					placeholder: Z(e).min === void 0 ? void 0 : `min: ${Z(e).min}`,
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, ge)], 64)) : Oe(e) ? (_(), f(c, { key: 2 }, [p("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [m(b(M(e)) + " ", 1), N(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: S(() => [...t[4] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)], 8, C), h(te, {
					"model-value": U[e] ?? "",
					options: ke(e),
					label: M(e),
					"onUpdate:modelValue": (t) => Q(e, String(t))
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"onUpdate:modelValue"
				])], 64)) : x(De).has(e) ? (_(), f(c, { key: 3 }, [p("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [m(b(M(e)) + " ", 1), N(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: S(() => [...t[5] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)], 8, _e), p("div", ve, [p("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: H[e] ? "text" : "password",
					autocomplete: "off",
					value: U[e],
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, ye), h(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": H[e] ? "eye-off" : "eye",
					"aria-label": H[e] ? `Hide ${M(e)}` : `Show ${M(e)}`,
					onClick: (t) => Ae(e)
				}, {
					default: S(() => [m(b(H[e] ? "Hide" : "Show"), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"aria-label",
					"onClick"
				])])], 64)) : (_(), f(c, { key: 4 }, [p("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [m(b(M(e)) + " ", 1), N(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: S(() => [...t[6] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)], 8, be), p("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "text",
					autocomplete: "off",
					value: U[e],
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, xe)], 64)),
				V.value[e] ? (_(), f("span", Se, b(V.value[e]), 1)) : d("", !0),
				j[e] ? (_(), f("p", Ce, b(j[e]), 1)) : d("", !0)
			]))), 128)), p("div", we, [h(i, {
				type: "button",
				variant: "solid",
				size: "sm",
				disabled: !G.value,
				loading: B.value,
				onClick: $
			}, {
				default: S(() => [...t[7] ||= [m(" Save settings ", -1)]]),
				_: 1
			}, 8, ["disabled", "loading"])])], 32))])]),
			_: 1
		}, 8, ["modelValue", "tabs"]))]));
	}
}), [["__scopeId", "data-v-215448d6"]]);
//#endregion
export { w as default };

//# sourceMappingURL=SettingsPage-KpnqPaLJ.js.map