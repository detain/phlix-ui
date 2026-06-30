import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, l as r, t as i } from "./client-CX6TRWS-.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-k7aQagzg.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as te } from "./Switch-CFZhdkXR.js";
import { t as s } from "./Select-BR5EXV0L.js";
import { t as ne } from "./Skeleton-DkSoWF3C.js";
import { t as re } from "./EmptyState-B2QnGIQT.js";
import { t as ie } from "./Tabs-x8dUKZN5.js";
import { n as ae, r as oe, t as se } from "./metadata-sources-ChdcZ749.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ce, onMounted as le, openBlock as _, reactive as v, ref as y, renderList as b, toDisplayString as x, unref as S, watch as ue, withCtx as C, withModifiers as de } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, pe = {
	key: 0,
	class: "admin-settings__skel"
}, me = { class: "admin-settings__panel" }, he = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, ge = { class: "admin-settings__label" }, _e = {
	key: 0,
	class: "admin-settings__help"
}, ve = { class: "admin-settings__priority" }, ye = { class: "admin-settings__priority-title" }, be = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, xe = ["for"], Se = {
	key: 2,
	class: "admin-settings__row"
}, Ce = ["for"], we = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"onInput"
], Te = ["for"], Ee = ["for"], De = { class: "admin-settings__row" }, Oe = [
	"id",
	"type",
	"value",
	"onInput"
], ke = ["for"], Ae = [
	"id",
	"value",
	"onInput"
], je = {
	key: 7,
	class: "admin-settings__error",
	role: "alert"
}, Me = {
	key: 8,
	class: "admin-settings__help"
}, Ne = { class: "admin-settings__actions" }, w = "metadata.provider_priority", T = "metadata.genres_mode", E = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "SettingsPage",
	props: { client: {} },
	setup(e) {
		let g = e, E = ce("apiBase", ""), Pe = l(() => typeof E == "string" ? E : E?.value ?? ""), D = g.client ?? new i({
			baseUrl: Pe.value,
			tokenStore: new t()
		}), O = new ae(D), Fe = new se(D), k = ee(), Ie = [{
			value: "first",
			label: "First — genres from the first source that supplies any"
		}, {
			value: "union",
			label: "Union — merge distinct genres from every source"
		}], Le = [
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
		})), Re = {
			access: ["auth.signup_mode"],
			transcoding: [
				"hwaccel.enabled",
				"hwaccel.prefer_hardware",
				"hwaccel.probe_timeout"
			],
			metadata: [
				"tmdb.api_key",
				"metadata.provider_priority",
				"metadata.genres_mode"
			],
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
		}, ze = {
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
		}, Be = new Set(["tmdb.api_key", "trakt.client_secret"]), A = {
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
			"metadata.provider_priority": "Metadata source priority",
			"metadata.genres_mode": "Genres mode",
			"trakt.client_id": "Trakt Client ID",
			"trakt.client_secret": "Trakt Client Secret",
			"trakt.redirect_uri": "Trakt Redirect URI"
		}, M = {
			"auth.signup_mode": "Controls who can create an account. \"Open\" lets anyone register and sign in immediately. \"Require admin approval\" creates accounts in a pending state — review them in the Users page approval queue before they can sign in. \"Disabled\" turns off new signups entirely.",
			"tmdb.api_key": "Your TMDB (The Movie Database) API key — get one free at themoviedb.org → Settings → API (v3 auth). Used to fetch movie & TV metadata, posters, and external IDs.",
			"trakt.client_id": "Register an application at trakt.tv/oauth/applications to get a client ID and secret. Saving here overrides the TRAKT_CLIENT_ID environment variable.",
			"trakt.client_secret": "The client secret paired with your Trakt client ID. Overrides the TRAKT_CLIENT_SECRET environment variable.",
			"trakt.redirect_uri": "Must exactly match the redirect URI registered in your Trakt app — this server's /api/v1/oauth/trakt/callback URL.",
			"metadata.provider_priority": "For each media type, the ordered list of metadata sources the matcher walks per field — the first source supplying a non-empty value wins. Reorder with the up/down buttons; remove or add sources per type. A media type left empty falls back to the server default.",
			"metadata.genres_mode": "How genres are combined across sources. \"First\" takes the genres from the first source in the priority order that supplies any; \"Union\" merges the distinct genres from every contributing source."
		};
		function N(e) {
			return j[e] ? j[e] : (e.split(".").pop() ?? e).replace(/_/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function P(e) {
			return I.value.includes(e);
		}
		let F = y({}), I = y([]), L = y({}), R = y("access"), z = y(!0), B = y(null), V = y(!1), H = y({}), U = v({}), W = v({}), G = v({}), K = y([]), q = y({}), J = y("first"), Ve = l(() => Object.values(G).some(Boolean)), He = l(() => Re[R.value] ?? []), Ue = l(() => Object.keys(q.value));
		function We(e) {
			if (typeof e != "object" || !e || Array.isArray(e)) return {};
			let t = {};
			for (let [n, r] of Object.entries(e)) t[n] = Array.isArray(r) ? r.filter((e) => typeof e == "string") : [];
			return t;
		}
		function Ge(e) {
			for (let e of Object.keys(W)) delete W[e];
			for (let [t, n] of Object.entries(e)) t === w || t === T || (W[t] = String(n ?? ""));
		}
		function Y(e) {
			q.value = We(e[w]);
			let t = e[T];
			J.value = typeof t == "string" && t !== "" ? t : "first";
		}
		function Ke() {
			for (let e of Object.keys(G)) delete G[e];
		}
		async function qe() {
			z.value = !0, B.value = null;
			try {
				let e = await O.get();
				F.value = e.settings, I.value = e.overridden, L.value = e.types, Ge(e.settings), Y(e.settings), Ke(), H.value = {};
			} catch (e) {
				B.value = n(e, "Failed to load settings."), k.error(B.value);
			} finally {
				z.value = !1;
			}
		}
		function X(e) {
			return L.value[e] ?? "string";
		}
		function Je(e) {
			return A[e] !== void 0;
		}
		function Ye(e) {
			return A[e] ?? [];
		}
		function Z(e) {
			return ze[e] ?? {};
		}
		function Q(e, t) {
			W[e] = t, G[e] = t !== String(F.value[e] ?? "");
		}
		function Xe(e) {
			U[e] = !U[e];
		}
		function Ze(e, t) {
			q.value = {
				...q.value,
				[e]: t
			}, G[w] = !0;
		}
		function Qe(e) {
			J.value = e, G[T] = e !== String(F.value[T] ?? "first");
		}
		async function $e() {
			V.value = !0, H.value = {};
			try {
				let e = {};
				for (let [t, n] of Object.entries(G)) {
					if (!n) continue;
					if (t === w) {
						e[t] = q.value;
						continue;
					}
					if (t === T) {
						e[t] = J.value;
						continue;
					}
					let r = L.value[t], i = W[t] ?? "";
					r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : e[t] = i;
				}
				let t = await O.save(e);
				k.success("Settings saved."), F.value = t.settings, I.value = t.overridden, Ke(), Ge(t.settings), Y(t.settings);
			} catch (e) {
				if (e instanceof r && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (H.value = t.errors, k.error("Please fix the validation errors.")) : k.error(e.message);
				} else k.error(e instanceof r ? e.message : "Failed to save settings.");
			} finally {
				V.value = !1;
			}
		}
		let $ = y(!1);
		async function et() {
			if (!$.value) {
				$.value = !0;
				try {
					K.value = await Fe.listSources();
				} catch {
					K.value = [];
				}
			}
		}
		return ue(R, (e) => {
			e === "metadata" && et();
		}), le(qe), (e, t) => (_(), f("section", fe, [t[11] ||= p("header", { class: "admin-settings__head" }, [p("h1", {
			id: "settings-heading",
			class: "admin-settings__title"
		}, "Settings")], -1), z.value ? (_(), f("div", pe, [h(ne, {
			variant: "text",
			lines: 6
		})])) : B.value ? (_(), u(re, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: B.value
		}, {
			actions: C(() => [h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: qe
			}, {
				default: C(() => [...t[2] ||= [m("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (_(), u(ie, {
			key: 2,
			modelValue: R.value,
			"onUpdate:modelValue": t[1] ||= (e) => R.value = e,
			tabs: S(Le),
			label: "Settings groups"
		}, {
			default: C(() => [p("div", me, [He.value.length === 0 ? (_(), f("p", he, " No settings in this group. ")) : (_(), f("form", {
				key: 1,
				class: "admin-settings__form",
				onSubmit: de($e, ["prevent"])
			}, [(_(!0), f(c, null, b(He.value, (e) => (_(), f("div", {
				key: e,
				class: "admin-settings__field"
			}, [
				e === w ? (_(), f(c, { key: 0 }, [
					p("span", ge, [m(x(N(e)) + " ", 1), P(e) ? (_(), u(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[3] ||= [m("custom", -1)]]),
						_: 1
					})) : d("", !0)]),
					M[e] ? (_(), f("p", _e, x(M[e]), 1)) : d("", !0),
					p("div", ve, [(_(!0), f(c, null, b(Ue.value, (e) => (_(), f("div", {
						key: e,
						class: "admin-settings__priority-group"
					}, [p("h3", ye, x(e), 1), h(oe, {
						"model-value": q.value[e] ?? [],
						available: K.value,
						label: `${e} sources`,
						"onUpdate:modelValue": (t) => Ze(e, t)
					}, null, 8, [
						"model-value",
						"available",
						"label",
						"onUpdate:modelValue"
					])]))), 128)), Ue.value.length === 0 ? (_(), f("p", be, " No media-type priority lists configured. ")) : d("", !0)])
				], 64)) : e === T ? (_(), f(c, { key: 1 }, [p("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [m(x(N(e)) + " ", 1), P(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[4] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)], 8, xe), h(s, {
					"model-value": J.value,
					options: Ie,
					label: N(e),
					"onUpdate:modelValue": t[0] ||= (e) => Qe(String(e))
				}, null, 8, ["model-value", "label"])], 64)) : X(e) === "bool" ? (_(), f("div", Se, [h(te, {
					"model-value": W[e] === "true" || W[e] === "1",
					label: N(e),
					"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
				}, null, 8, [
					"model-value",
					"label",
					"onUpdate:modelValue"
				]), P(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[5] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)])) : X(e) === "int" || X(e) === "float" ? (_(), f(c, { key: 3 }, [p("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [m(x(N(e)) + " ", 1), P(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[6] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)], 8, Ce), p("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "number",
					value: W[e],
					min: Z(e).min,
					max: Z(e).max,
					step: X(e) === "float" ? "any" : void 0,
					placeholder: Z(e).min === void 0 ? void 0 : `min: ${Z(e).min}`,
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, we)], 64)) : Je(e) ? (_(), f(c, { key: 4 }, [p("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [m(x(N(e)) + " ", 1), P(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[7] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)], 8, Te), h(s, {
					"model-value": W[e] ?? "",
					options: Ye(e),
					label: N(e),
					"onUpdate:modelValue": (t) => Q(e, String(t))
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"onUpdate:modelValue"
				])], 64)) : S(Be).has(e) ? (_(), f(c, { key: 5 }, [p("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [m(x(N(e)) + " ", 1), P(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[8] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)], 8, Ee), p("div", De, [p("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: U[e] ? "text" : "password",
					autocomplete: "off",
					value: W[e],
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, Oe), h(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": U[e] ? "eye-off" : "eye",
					"aria-label": U[e] ? `Hide ${N(e)}` : `Show ${N(e)}`,
					onClick: (t) => Xe(e)
				}, {
					default: C(() => [m(x(U[e] ? "Hide" : "Show"), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"aria-label",
					"onClick"
				])])], 64)) : (_(), f(c, { key: 6 }, [p("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [m(x(N(e)) + " ", 1), P(e) ? (_(), u(o, {
					key: 0,
					tone: "accent"
				}, {
					default: C(() => [...t[9] ||= [m("custom", -1)]]),
					_: 1
				})) : d("", !0)], 8, ke), p("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "text",
					autocomplete: "off",
					value: W[e],
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, Ae)], 64)),
				H.value[e] ? (_(), f("span", je, x(H.value[e]), 1)) : d("", !0),
				M[e] && e !== w ? (_(), f("p", Me, x(M[e]), 1)) : d("", !0)
			]))), 128)), p("div", Ne, [h(a, {
				type: "button",
				variant: "solid",
				size: "sm",
				disabled: !Ve.value,
				loading: V.value,
				onClick: $e
			}, {
				default: C(() => [...t[10] ||= [m(" Save settings ", -1)]]),
				_: 1
			}, 8, ["disabled", "loading"])])], 32))])]),
			_: 1
		}, 8, ["modelValue", "tabs"]))]));
	}
}), [["__scopeId", "data-v-0550c0c1"]]);
//#endregion
export { E as default };

//# sourceMappingURL=SettingsPage-DRwUSJf-.js.map