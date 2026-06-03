import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-BFFMWKZp.js";
import { t as r } from "./useMessages-B-UDJLSQ.js";
import { t as ee } from "./Button-BwQkyEkr.js";
import { t as i } from "./Slider-BMn_Lp_q.js";
import { t as a } from "./Switch-CFZhdkXR.js";
import { t as o } from "./Select-j5ozuwYf.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Tabs-x8dUKZN5.js";
import { i as ne, n as re, r as ie, t as ae } from "./captions-COgPp5bH.js";
import { t as c } from "./SettingsForm-DuSotEMX.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeClass as v, normalizeStyle as oe, onBeforeUnmount as se, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, withCtx as w } from "vue";
//#region src/components/AppearanceSettings.vue?vue&type=script&setup=true&lang.ts
var ce = {
	key: 0,
	class: "aps"
}, le = { class: "aps__group" }, ue = { class: "aps__title" }, de = ["aria-label"], fe = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], T = { class: "aps__theme-label" }, E = { class: "aps__group" }, D = { class: "aps__title" }, O = ["aria-label"], k = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], A = { class: "aps__group" }, j = { class: "aps__title" }, M = { class: "aps__row" }, N = {
	class: "aps__label",
	id: "aps-density"
}, P = { class: "aps__row" }, F = { class: "aps__label" }, I = { class: "aps__row" }, L = { class: "aps__label" }, R = { class: "aps__value" }, z = { class: "aps__slider" }, B = { class: "aps__group" }, V = { class: "aps__title" }, pe = { class: "aps__row aps__row--switch" }, me = { class: "aps__row" }, he = { class: "aps__label" }, ge = { class: "aps__foot" }, _e = {
	class: "visually-hidden",
	role: "status",
	"aria-live": "polite"
}, ve = {
	key: 1,
	class: "aps"
}, ye = { class: "aps__group" }, be = { class: "aps__title" }, xe = { class: "aps__row aps__row--switch" }, Se = { class: "aps__row" }, Ce = { class: "aps__label" }, we = { class: "aps__value" }, Te = { class: "aps__slider" }, Ee = { class: "aps__row" }, De = { class: "aps__label" }, Oe = { class: "aps__group" }, ke = { class: "aps__title" }, Ae = { class: "aps__row" }, je = { class: "aps__label" }, Me = { class: "aps__row" }, Ne = { class: "aps__label" }, Pe = { class: "aps__row" }, Fe = { class: "aps__label" }, Ie = { class: "aps__row" }, Le = { class: "aps__label" }, Re = { class: "aps__row" }, ze = { class: "aps__label" }, H = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let s = n(), c = te(), { t: _ } = r(), H = [
			{
				value: "nocturne",
				label: "Nocturne"
			},
			{
				value: "daylight",
				label: "Daylight"
			},
			{
				value: "midnight",
				label: "Midnight"
			}
		], U = [
			{
				value: null,
				label: "Amber",
				swatch: "var(--amber-500)"
			},
			{
				value: "#e5484d",
				label: "Crimson",
				swatch: "#e5484d"
			},
			{
				value: "#d6409f",
				label: "Magenta",
				swatch: "#d6409f"
			},
			{
				value: "#8e4ec6",
				label: "Violet",
				swatch: "#8e4ec6"
			},
			{
				value: "#4c6ef5",
				label: "Azure",
				swatch: "#4c6ef5"
			},
			{
				value: "#0fa3a3",
				label: "Teal",
				swatch: "#0fa3a3"
			},
			{
				value: "#6cc04a",
				label: "Lime",
				swatch: "#6cc04a"
			}
		], W = [{
			value: "comfortable",
			label: "Comfortable"
		}, {
			value: "compact",
			label: "Compact"
		}], Be = [
			{
				value: "cozy",
				label: "Cozy"
			},
			{
				value: "comfy",
				label: "Comfy"
			},
			{
				value: "dense",
				label: "Dense"
			}
		], Ve = [
			{
				value: "auto",
				label: "Match system"
			},
			{
				value: "on",
				label: "Reduced"
			},
			{
				value: "off",
				label: "Full"
			}
		], He = [
			{
				value: "auto",
				label: "Auto"
			},
			{
				value: "4k",
				label: "4K"
			},
			{
				value: "1080p",
				label: "1080p"
			},
			{
				value: "720p",
				label: "720p"
			},
			{
				value: "480p",
				label: "480p"
			}
		], Ue = [
			{
				value: "",
				label: "Off"
			},
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
				value: "ja",
				label: "Japanese"
			}
		], G = (e) => `${Math.round(e * 100)}%`, K = (e) => `${e}px`;
		function q(e) {
			s.defaultSubtitleLang = e === "" ? null : String(e);
		}
		function J(e, t) {
			s.captionStyle = {
				...s.captionStyle,
				[e]: t
			};
		}
		let Y = u(() => Math.max(0, H.findIndex((e) => e.value === s.theme))), X = u(() => Math.max(0, U.findIndex((e) => e.value === s.accent)));
		function Z(e, t, n) {
			if (t === 0) return null;
			let r = n;
			switch (e.key) {
				case "ArrowDown":
				case "ArrowRight":
					r = (n + 1) % t;
					break;
				case "ArrowUp":
				case "ArrowLeft":
					r = (n - 1 + t) % t;
					break;
				case "Home":
					r = 0;
					break;
				case "End":
					r = t - 1;
					break;
				default: return null;
			}
			return e.preventDefault(), e.currentTarget.querySelectorAll("[role=\"radio\"]")[r]?.focus(), r;
		}
		function We(e) {
			let t = Z(e, H.length, Y.value);
			t !== null && (s.theme = H[t].value);
		}
		function Ge(e) {
			let t = Z(e, U.length, X.value);
			t !== null && (s.accent = U[t].value);
		}
		let Q = b(!1), $;
		function Ke() {
			if (!Q.value) {
				Q.value = !0, clearTimeout($), $ = setTimeout(() => Q.value = !1, 3500);
				return;
			}
			clearTimeout($), Q.value = !1, s.reset(), c.info(_("settings.resetDone"));
		}
		return se(() => clearTimeout($)), (n, r) => e.panel === "appearance" ? (y(), p("div", ce, [
			m("section", le, [m("h3", ue, S(C(_)("settings.theme")), 1), m("div", {
				class: "aps__themes",
				role: "radiogroup",
				"aria-label": C(_)("settings.theme"),
				onKeydown: We
			}, [(y(), p(l, null, x(H, (e, n) => m("button", {
				key: e.value,
				type: "button",
				role: "radio",
				class: v(["aps__theme", { "is-active": C(s).theme === e.value }]),
				"aria-checked": C(s).theme === e.value,
				tabindex: Y.value === n ? 0 : -1,
				"data-theme": e.value,
				onClick: (t) => C(s).theme = e.value
			}, [r[12] ||= m("span", { class: "aps__preview" }, [m("span", { class: "aps__preview-bar" }), m("span", { class: "aps__preview-card" })], -1), m("span", T, [h(S(e.label) + " ", 1), C(s).theme === e.value ? (y(), d(t, {
				key: 0,
				name: "check",
				class: "aps__theme-check"
			})) : f("", !0)])], 10, fe)), 64))], 40, de)]),
			m("section", E, [m("h3", D, S(C(_)("settings.accent")), 1), m("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": C(_)("settings.accentColor"),
				onKeydown: Ge
			}, [(y(), p(l, null, x(U, (e, n) => m("button", {
				key: e.label,
				type: "button",
				role: "radio",
				class: v(["aps__accent", { "is-active": C(s).accent === e.value }]),
				"aria-checked": C(s).accent === e.value,
				"aria-label": e.label,
				title: e.label,
				tabindex: X.value === n ? 0 : -1,
				onClick: (t) => C(s).accent = e.value
			}, [m("span", {
				class: "aps__accent-dot",
				style: oe({ background: e.swatch })
			}, [C(s).accent === e.value ? (y(), d(t, {
				key: 0,
				name: "check"
			})) : f("", !0)], 4)], 10, k)), 64))], 40, O)]),
			m("section", A, [
				m("h3", j, S(C(_)("settings.display")), 1),
				m("div", M, [m("span", N, S(C(_)("settings.density")), 1), g(o, {
					"model-value": C(s).density,
					options: W,
					label: C(_)("settings.density"),
					"onUpdate:modelValue": r[0] ||= (e) => C(s).density = e
				}, null, 8, ["model-value", "label"])]),
				m("div", P, [m("span", F, S(C(_)("settings.gridDensity")), 1), g(o, {
					"model-value": C(s).gridDensity,
					options: Be,
					label: C(_)("settings.gridDensity"),
					"onUpdate:modelValue": r[1] ||= (e) => C(s).gridDensity = e
				}, null, 8, ["model-value", "label"])]),
				m("div", I, [m("span", L, [h(S(C(_)("settings.cardSize")) + " ", 1), m("span", R, S(K(C(s).cardSize)), 1)]), m("div", z, [g(i, {
					"model-value": C(s).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: C(_)("settings.cardSize"),
					"format-value": K,
					"onUpdate:modelValue": r[2] ||= (e) => C(s).cardSize = e
				}, null, 8, ["model-value", "label"])])])
			]),
			m("section", B, [
				m("h3", V, S(C(_)("settings.atmosphere")), 1),
				m("div", pe, [g(a, {
					"model-value": C(s).atmosphere,
					label: C(_)("settings.filmGrainGlow"),
					"onUpdate:modelValue": r[3] ||= (e) => C(s).atmosphere = e
				}, null, 8, ["model-value", "label"])]),
				m("div", me, [m("span", he, S(C(_)("settings.motion")), 1), g(o, {
					"model-value": C(s).reducedMotion,
					options: Ve,
					label: C(_)("settings.motion"),
					"onUpdate:modelValue": r[4] ||= (e) => C(s).reducedMotion = e
				}, null, 8, ["model-value", "label"])])
			]),
			m("div", ge, [g(ee, {
				variant: "ghost",
				"left-icon": Q.value ? "alert" : "rewind",
				onClick: Ke
			}, {
				default: w(() => [h(S(Q.value ? C(_)("settings.resetConfirm") : C(_)("settings.resetAll")), 1)]),
				_: 1
			}, 8, ["left-icon"]), m("span", _e, S(Q.value ? C(_)("settings.resetConfirm") : ""), 1)])
		])) : (y(), p("div", ve, [m("section", ye, [
			m("h3", be, S(C(_)("settings.playback")), 1),
			m("div", xe, [g(a, {
				"model-value": C(s).autoplay,
				label: C(_)("settings.autoplayNext"),
				"onUpdate:modelValue": r[5] ||= (e) => C(s).autoplay = e
			}, null, 8, ["model-value", "label"])]),
			m("div", Se, [m("span", Ce, [h(S(C(_)("settings.defaultVolume")) + " ", 1), m("span", we, S(G(C(s).defaultVolume)), 1)]), m("div", Te, [g(i, {
				"model-value": C(s).defaultVolume,
				min: 0,
				max: 1,
				step: .05,
				label: C(_)("settings.defaultVolume"),
				"format-value": G,
				"onUpdate:modelValue": r[6] ||= (e) => C(s).defaultVolume = e
			}, null, 8, ["model-value", "label"])])]),
			m("div", Ee, [m("span", De, S(C(_)("settings.defaultQuality")), 1), g(o, {
				"model-value": C(s).defaultQuality,
				options: He,
				label: C(_)("settings.defaultQuality"),
				"onUpdate:modelValue": r[7] ||= (e) => C(s).defaultQuality = String(e)
			}, null, 8, ["model-value", "label"])])
		]), m("section", Oe, [
			m("h3", ke, S(C(_)("settings.subtitles")), 1),
			m("div", Ae, [m("span", je, S(C(_)("settings.defaultLanguage")), 1), g(o, {
				"model-value": C(s).defaultSubtitleLang ?? "",
				options: Ue,
				label: C(_)("settings.defaultSubtitleLanguage"),
				"onUpdate:modelValue": q
			}, null, 8, ["model-value", "label"])]),
			m("div", Me, [m("span", Ne, S(C(_)("settings.captionSize")), 1), g(o, {
				"model-value": C(s).captionStyle.size,
				options: C(ne),
				label: C(_)("settings.captionSize"),
				"onUpdate:modelValue": r[8] ||= (e) => J("size", e)
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])]),
			m("div", Pe, [m("span", Fe, S(C(_)("settings.captionColor")), 1), g(o, {
				"model-value": C(s).captionStyle.textColor,
				options: C(re),
				label: C(_)("settings.captionColor"),
				"onUpdate:modelValue": r[9] ||= (e) => J("textColor", String(e))
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])]),
			m("div", Ie, [m("span", Le, S(C(_)("settings.captionBackground")), 1), g(o, {
				"model-value": C(s).captionStyle.background,
				options: C(ae),
				label: C(_)("settings.captionBackground"),
				"onUpdate:modelValue": r[10] ||= (e) => J("background", e)
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])]),
			m("div", Re, [m("span", ze, S(C(_)("settings.captionEdge")), 1), g(o, {
				"model-value": C(s).captionStyle.edge,
				options: C(ie),
				label: C(_)("settings.captionEdge"),
				"onUpdate:modelValue": r[11] ||= (e) => J("edge", e)
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])])
		])]));
	}
}), [["__scopeId", "data-v-b3106f42"]]), U = { class: "settings-page" }, W = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SettingsPage",
	setup(e) {
		let t = [
			{
				value: "appearance",
				label: "Appearance",
				icon: "sun"
			},
			{
				value: "playback",
				label: "Playback",
				icon: "play"
			},
			{
				value: "server",
				label: "Server",
				icon: "settings"
			}
		], n = b("appearance");
		return (e, r) => (y(), p("div", U, [r[1] ||= m("header", { class: "settings-page__head" }, [m("p", { class: "settings-page__eyebrow" }, "Preferences"), m("h1", { class: "settings-page__title" }, "Settings")], -1), g(s, {
			modelValue: n.value,
			"onUpdate:modelValue": r[0] ||= (e) => n.value = e,
			tabs: t,
			label: "Settings sections"
		}, {
			appearance: w(() => [g(H, { panel: "appearance" })]),
			playback: w(() => [g(H, { panel: "playback" })]),
			server: w(() => [g(c)]),
			_: 1
		}, 8, ["modelValue"])]));
	}
}), [["__scopeId", "data-v-1dba1556"]]);
//#endregion
export { W as default };

//# sourceMappingURL=SettingsPage-DK6XX8z2.js.map