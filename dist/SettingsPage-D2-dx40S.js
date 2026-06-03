import { a as e, f as t, h as n, i as r, l as i, n as a, o as ee, r as te, t as o } from "./Button-C86XulWV.js";
import { t as s } from "./Select-CjbYOZGH.js";
import { t as c } from "./Badge-BiYXL5Nz.js";
import { t as ne } from "./Switch-BRVGpfuc.js";
import { t as l } from "./settings-m4upFcmH.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as re, normalizeClass as ie, onMounted as ae, openBlock as y, reactive as b, ref as x, renderList as S, toDisplayString as C, unref as oe, withCtx as w, withModifiers as se } from "vue";
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
}, he = ["for"], T = [
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
}, we = { class: "admin-settings__actions" }, E = /*#__PURE__*/ n(/* @__PURE__ */ v({
	__name: "SettingsPage",
	props: { client: {} },
	setup(n) {
		let v = n, E = re("apiBase", ""), D = d(() => typeof E == "string" ? E : E?.value ?? ""), O = new l(v.client ?? new ee({
			baseUrl: D.value,
			tokenStore: new e()
		})), k = r(), Te = [
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
		let F = x({}), I = x([]), L = x({}), R = x("transcoding"), z = x(!0), B = x(null), V = x(!1), H = x({}), U = b({}), W = b({}), G = b({}), ke = d(() => Object.values(G).some(Boolean)), K = d(() => Ee[R.value] ?? []);
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
			} catch (e) {
				if (e instanceof i && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (H.value = t.errors, k.error("Please fix the validation errors.")) : k.error(e.message);
				} else k.error(e instanceof i ? e.message : "Failed to save settings.");
			} finally {
				V.value = !1;
			}
		}
		return ae(Y), (e, t) => (y(), m("section", ce, [t[7] ||= h("header", { class: "admin-settings__head" }, [h("h1", {
			id: "settings-heading",
			class: "admin-settings__title"
		}, "Settings")], -1), z.value ? (y(), m("div", le, [_(a, {
			variant: "text",
			lines: 6
		})])) : B.value ? (y(), f(te, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: B.value
		}, {
			actions: w(() => [_(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: Y
			}, {
				default: w(() => [...t[0] ||= [g("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (y(), m(u, { key: 2 }, [h("div", ue, [(y(), m(u, null, S(Te, (e) => h("button", {
			key: e.id,
			type: "button",
			role: "tab",
			"aria-selected": R.value === e.id,
			class: ie(["admin-settings__tab", { "is-active": R.value === e.id }]),
			onClick: (t) => R.value = e.id
		}, C(e.label), 11, de)), 64))]), h("div", {
			class: "admin-settings__panel",
			role: "tabpanel",
			"aria-label": `${R.value} settings`
		}, [K.value.length === 0 ? (y(), m("p", pe, " No settings in this group. ")) : (y(), m("form", {
			key: 1,
			class: "admin-settings__form",
			onSubmit: se($, ["prevent"])
		}, [(y(!0), m(u, null, S(K.value, (e) => (y(), m("div", {
			key: e,
			class: "admin-settings__field"
		}, [
			X(e) === "bool" ? (y(), m("div", me, [_(ne, {
				"model-value": W[e] === "true" || W[e] === "1",
				label: N(e),
				"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), P(e) ? (y(), f(c, {
				key: 0,
				tone: "accent"
			}, {
				default: w(() => [...t[1] ||= [g("custom", -1)]]),
				_: 1
			})) : p("", !0)])) : X(e) === "int" || X(e) === "float" ? (y(), m(u, { key: 1 }, [h("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [g(C(N(e)) + " ", 1), P(e) ? (y(), f(c, {
				key: 0,
				tone: "accent"
			}, {
				default: w(() => [...t[2] ||= [g("custom", -1)]]),
				_: 1
			})) : p("", !0)], 8, he), h("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "number",
				value: W[e],
				min: Z(e).min,
				max: Z(e).max,
				step: X(e) === "float" ? "any" : void 0,
				placeholder: Z(e).min === void 0 ? void 0 : `min: ${Z(e).min}`,
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, T)], 64)) : Ae(e) ? (y(), m(u, { key: 2 }, [h("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [g(C(N(e)) + " ", 1), P(e) ? (y(), f(c, {
				key: 0,
				tone: "accent"
			}, {
				default: w(() => [...t[3] ||= [g("custom", -1)]]),
				_: 1
			})) : p("", !0)], 8, ge), _(s, {
				"model-value": W[e] ?? "",
				options: je(e),
				label: N(e),
				"onUpdate:modelValue": (t) => Q(e, String(t))
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"onUpdate:modelValue"
			])], 64)) : oe(Oe).has(e) ? (y(), m(u, { key: 3 }, [h("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [g(C(N(e)) + " ", 1), P(e) ? (y(), f(c, {
				key: 0,
				tone: "accent"
			}, {
				default: w(() => [...t[4] ||= [g("custom", -1)]]),
				_: 1
			})) : p("", !0)], 8, _e), h("div", ve, [h("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: U[e] ? "text" : "password",
				autocomplete: "off",
				value: W[e],
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, ye), _(o, {
				variant: "ghost",
				size: "sm",
				"left-icon": U[e] ? "eye-off" : "eye",
				"aria-label": U[e] ? `Hide ${N(e)}` : `Show ${N(e)}`,
				onClick: (t) => Me(e)
			}, {
				default: w(() => [g(C(U[e] ? "Hide" : "Show"), 1)]),
				_: 2
			}, 1032, [
				"left-icon",
				"aria-label",
				"onClick"
			])])], 64)) : (y(), m(u, { key: 4 }, [h("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [g(C(N(e)) + " ", 1), P(e) ? (y(), f(c, {
				key: 0,
				tone: "accent"
			}, {
				default: w(() => [...t[5] ||= [g("custom", -1)]]),
				_: 1
			})) : p("", !0)], 8, be), h("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "text",
				autocomplete: "off",
				value: W[e],
				onInput: (t) => Q(e, t.target.value)
			}, null, 40, xe)], 64)),
			H.value[e] ? (y(), m("span", Se, C(H.value[e]), 1)) : p("", !0),
			M[e] ? (y(), m("p", Ce, C(M[e]), 1)) : p("", !0)
		]))), 128)), h("div", we, [_(o, {
			type: "button",
			variant: "solid",
			size: "sm",
			disabled: !ke.value,
			loading: V.value,
			onClick: $
		}, {
			default: w(() => [...t[6] ||= [g(" Save settings ", -1)]]),
			_: 1
		}, 8, ["disabled", "loading"])])], 32))], 8, fe)], 64))]));
	}
}), [["__scopeId", "data-v-fcbf13c7"]]);
//#endregion
export { E as default };

//# sourceMappingURL=SettingsPage-D2-dx40S.js.map