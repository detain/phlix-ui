import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, l as r, t as i } from "./client-D1nDQ0cP.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-btm-GCUN.js";
import { t as o } from "./Badge-D_aUH3dO.js";
import { t as s } from "./Switch-DyS2L5gX.js";
import { t as c } from "./Select-Bx8h2mSF.js";
import { t as te } from "./Skeleton-DhQmxeNg.js";
import { t as ne } from "./EmptyState-CfyGawh7.js";
import { t as re } from "./PageHint-CPoTKHik.js";
import { t as ie } from "./Tabs-D8iKNBl3.js";
import { t as ae } from "./settings-m4upFcmH.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as oe, onMounted as se, openBlock as v, reactive as y, ref as b, renderList as ce, toDisplayString as x, unref as S, withCtx as C, withModifiers as le } from "vue";
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
}, me = ["for"], he = {
	key: 1,
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
	key: 6,
	class: "admin-settings__error",
	role: "alert"
}, Te = {
	key: 7,
	class: "admin-settings__help"
}, Ee = { class: "admin-settings__actions" }, w = "metadata.genres_mode", T = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SettingsPage",
	props: { client: {} },
	setup(e) {
		let _ = e, T = oe("apiBase", ""), De = u(() => typeof T == "string" ? T : T?.value ?? ""), E = new ae(_.client ?? new i({
			baseUrl: De.value,
			tokenStore: new t()
		})), D = ee(), Oe = [{
			value: "first",
			label: "First — genres from the first source that supplies any"
		}, {
			value: "union",
			label: "Union — merge distinct genres from every source"
		}], ke = [
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
		})), Ae = {
			access: ["auth.signup_mode"],
			transcoding: [
				"hwaccel.enabled",
				"hwaccel.prefer_hardware",
				"hwaccel.probe_timeout"
			],
			metadata: ["tmdb.api_key", "metadata.genres_mode"],
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
		}, je = {
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
		}, Me = new Set(["tmdb.api_key", "trakt.client_secret"]), O = {
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
		}, k = {
			"auth.signup_mode": "Signup mode",
			"tmdb.api_key": "TMDB API Key",
			"metadata.genres_mode": "Genres mode",
			"trakt.client_id": "Trakt Client ID",
			"trakt.client_secret": "Trakt Client Secret",
			"trakt.redirect_uri": "Trakt Redirect URI"
		}, A = {
			"auth.signup_mode": "Controls who can create an account. \"Open\" lets anyone register and sign in immediately. \"Require admin approval\" creates accounts in a pending state — review them in the Users page approval queue before they can sign in. \"Disabled\" turns off new signups entirely.",
			"tmdb.api_key": "Your TMDB (The Movie Database) API key — get one free at themoviedb.org → Settings → API (v3 auth). Used to fetch movie & TV metadata, posters, and external IDs.",
			"trakt.client_id": "Register an application at trakt.tv/oauth/applications to get a client ID and secret. Saving here overrides the TRAKT_CLIENT_ID environment variable.",
			"trakt.client_secret": "The client secret paired with your Trakt client ID. Overrides the TRAKT_CLIENT_SECRET environment variable.",
			"trakt.redirect_uri": "Must exactly match the redirect URI registered in your Trakt app — this server's /api/v1/oauth/trakt/callback URL.",
			"metadata.genres_mode": "How genres are combined across sources. \"First\" takes the genres from the first source in the priority order that supplies any; \"Union\" merges the distinct genres from every contributing source."
		};
		function j(e) {
			return k[e] ? k[e] : (e.split(".").pop() ?? e).replace(/_/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function M(e) {
			return P.value.includes(e);
		}
		let N = b({}), P = b([]), F = b({}), I = b("access"), L = b(!0), R = b(null), z = b(!1), B = b({}), V = y({}), H = y({}), U = y({}), W = b("first"), Ne = u(() => Object.values(U).some(Boolean)), G = u(() => Ae[I.value] ?? []);
		function K(e) {
			for (let e of Object.keys(H)) delete H[e];
			for (let [t, n] of Object.entries(e)) t !== w && (H[t] = String(n ?? ""));
		}
		function q(e) {
			let t = e[w];
			W.value = typeof t == "string" && t !== "" ? t : "first";
		}
		function J() {
			for (let e of Object.keys(U)) delete U[e];
		}
		async function Y() {
			L.value = !0, R.value = null;
			try {
				let e = await E.get();
				N.value = e.settings, P.value = e.overridden, F.value = e.types, K(e.settings), q(e.settings), J(), B.value = {};
			} catch (e) {
				R.value = n(e, "Failed to load settings."), D.error(R.value);
			} finally {
				L.value = !1;
			}
		}
		function X(e) {
			return F.value[e] ?? "string";
		}
		function Pe(e) {
			return O[e] !== void 0;
		}
		function Fe(e) {
			return O[e] ?? [];
		}
		function Z(e) {
			return je[e] ?? {};
		}
		function Q(e, t) {
			H[e] = t, U[e] = t !== String(N.value[e] ?? "");
		}
		function Ie(e) {
			V[e] = !V[e];
		}
		function Le(e) {
			W.value = e, U[w] = e !== String(N.value[w] ?? "first");
		}
		async function $() {
			z.value = !0, B.value = {};
			try {
				let e = {};
				for (let [t, n] of Object.entries(U)) {
					if (!n) continue;
					if (t === w) {
						e[t] = W.value;
						continue;
					}
					let r = F.value[t], i = H[t] ?? "";
					r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : e[t] = i;
				}
				let t = await E.save(e);
				D.success("Settings saved."), N.value = t.settings, P.value = t.overridden, J(), K(t.settings), q(t.settings);
			} catch (e) {
				if (e instanceof r && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (B.value = t.errors, D.error("Please fix the validation errors.")) : D.error(e.message);
				} else D.error(e instanceof r ? e.message : "Failed to save settings.");
			} finally {
				z.value = !1;
			}
		}
		return se(Y), (e, t) => (v(), p("section", ue, [
			t[11] ||= m("header", { class: "admin-settings__head" }, [m("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			g(re, null, {
				default: C(() => [...t[2] ||= [
					h(" All of your server's configuration, grouped into tabs — ", -1),
					m("strong", null, "Access", -1),
					h(" (sign-up mode), ", -1),
					m("strong", null, "Transcoding", -1),
					h(", ", -1),
					m("strong", null, "Metadata", -1),
					h(" (TMDB key and genres mode), ", -1),
					m("strong", null, "Markers", -1),
					h(", ", -1),
					m("strong", null, "Subtitles", -1),
					h(", ", -1),
					m("strong", null, "Discovery", -1),
					h(", ", -1),
					m("strong", null, "Trickplay", -1),
					h(", ", -1),
					m("strong", null, "Newsletter", -1),
					h(", ", -1),
					m("strong", null, "Port Forward", -1),
					h(", and ", -1),
					m("strong", null, "Scrobblers", -1),
					h(". Change fields on any tab, then click ", -1),
					m("strong", null, "Save settings", -1),
					h(" to apply only what you changed; a ", -1),
					m("strong", null, "custom", -1),
					h(" badge marks values overridden by your environment or config file. ", -1)
				]]),
				_: 1
			}),
			L.value ? (v(), p("div", de, [g(te, {
				variant: "text",
				lines: 6
			})])) : R.value ? (v(), d(ne, {
				key: 1,
				icon: "alert",
				title: "Couldn't load settings",
				description: R.value
			}, {
				actions: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Y
				}, {
					default: C(() => [...t[3] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (v(), d(ie, {
				key: 2,
				modelValue: I.value,
				"onUpdate:modelValue": t[1] ||= (e) => I.value = e,
				tabs: S(ke),
				label: "Settings groups"
			}, {
				default: C(() => [m("div", fe, [G.value.length === 0 ? (v(), p("p", pe, " No settings in this group. ")) : (v(), p("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: le($, ["prevent"])
				}, [(v(!0), p(l, null, ce(G.value, (e) => (v(), p("div", {
					key: e,
					class: "admin-settings__field"
				}, [
					e === w ? (v(), p(l, { key: 0 }, [m("label", {
						class: "admin-settings__label",
						for: `field-${e}`
					}, [h(x(j(e)) + " ", 1), M(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[4] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0)], 8, me), g(c, {
						"model-value": W.value,
						options: Oe,
						label: j(e),
						"onUpdate:modelValue": t[0] ||= (e) => Le(String(e))
					}, null, 8, ["model-value", "label"])], 64)) : X(e) === "bool" ? (v(), p("div", he, [g(s, {
						"model-value": H[e] === "true" || H[e] === "1",
						label: j(e),
						"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					]), M(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[5] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0)])) : X(e) === "int" || X(e) === "float" ? (v(), p(l, { key: 2 }, [m("label", {
						class: "admin-settings__label",
						for: `field-${e}`
					}, [h(x(j(e)) + " ", 1), M(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[6] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0)], 8, ge), m("input", {
						id: `field-${e}`,
						class: "admin-settings__input",
						type: "number",
						value: H[e],
						min: Z(e).min,
						max: Z(e).max,
						step: X(e) === "float" ? "any" : void 0,
						placeholder: Z(e).min === void 0 ? void 0 : `min: ${Z(e).min}`,
						onInput: (t) => Q(e, t.target.value)
					}, null, 40, _e)], 64)) : Pe(e) ? (v(), p(l, { key: 3 }, [m("label", {
						class: "admin-settings__label",
						for: `field-${e}`
					}, [h(x(j(e)) + " ", 1), M(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[7] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0)], 8, ve), g(c, {
						"model-value": H[e] ?? "",
						options: Fe(e),
						label: j(e),
						"onUpdate:modelValue": (t) => Q(e, String(t))
					}, null, 8, [
						"model-value",
						"options",
						"label",
						"onUpdate:modelValue"
					])], 64)) : S(Me).has(e) ? (v(), p(l, { key: 4 }, [m("label", {
						class: "admin-settings__label",
						for: `field-${e}`
					}, [h(x(j(e)) + " ", 1), M(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[8] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0)], 8, ye), m("div", be, [m("input", {
						id: `field-${e}`,
						class: "admin-settings__input",
						type: V[e] ? "text" : "password",
						autocomplete: "off",
						value: H[e],
						onInput: (t) => Q(e, t.target.value)
					}, null, 40, xe), g(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": V[e] ? "eye-off" : "eye",
						"aria-label": V[e] ? `Hide ${j(e)}` : `Show ${j(e)}`,
						onClick: (t) => Ie(e)
					}, {
						default: C(() => [h(x(V[e] ? "Hide" : "Show"), 1)]),
						_: 2
					}, 1032, [
						"left-icon",
						"aria-label",
						"onClick"
					])])], 64)) : (v(), p(l, { key: 5 }, [m("label", {
						class: "admin-settings__label",
						for: `field-${e}`
					}, [h(x(j(e)) + " ", 1), M(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[9] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0)], 8, Se), m("input", {
						id: `field-${e}`,
						class: "admin-settings__input",
						type: "text",
						autocomplete: "off",
						value: H[e],
						onInput: (t) => Q(e, t.target.value)
					}, null, 40, Ce)], 64)),
					B.value[e] ? (v(), p("span", we, x(B.value[e]), 1)) : f("", !0),
					A[e] ? (v(), p("p", Te, x(A[e]), 1)) : f("", !0)
				]))), 128)), m("div", Ee, [g(a, {
					type: "button",
					variant: "solid",
					size: "sm",
					disabled: !Ne.value,
					loading: z.value,
					onClick: $
				}, {
					default: C(() => [...t[10] ||= [h(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])]),
				_: 1
			}, 8, ["modelValue", "tabs"]))
		]));
	}
}), [["__scopeId", "data-v-be8c770d"]]);
//#endregion
export { T as default };

//# sourceMappingURL=SettingsPage-pbxP1QpO.js.map