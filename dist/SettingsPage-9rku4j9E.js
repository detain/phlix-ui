import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-BFFMWKZp.js";
import { t as r } from "./useMessages-Cvd20ZUW.js";
import { t as i } from "./Button-BwQkyEkr.js";
import { t as a } from "./Slider-BMn_Lp_q.js";
import { t as o } from "./Switch-CFZhdkXR.js";
import { t as s } from "./Select-Ba3KZxNb.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as c } from "./Tabs-x8dUKZN5.js";
import { i as te, n as ne, r as re, t as ie } from "./captions-COgPp5bH.js";
import { t as l } from "./SettingsForm-Dz4g0Hwh.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, normalizeClass as y, normalizeStyle as ae, onBeforeUnmount as oe, openBlock as b, ref as x, renderList as S, toDisplayString as C, unref as w, withCtx as T } from "vue";
//#region src/components/AppearanceSettings.vue?vue&type=script&setup=true&lang.ts
var se = {
	key: 0,
	class: "aps"
}, ce = { class: "aps__group" }, le = { class: "aps__title" }, ue = ["aria-label"], de = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], fe = { class: "aps__theme-label" }, pe = { class: "aps__group" }, me = { class: "aps__title" }, he = ["aria-label"], E = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], D = { class: "aps__group" }, O = { class: "aps__title" }, k = { class: "aps__row" }, A = {
	class: "aps__label",
	id: "aps-density"
}, j = { class: "aps__row" }, M = { class: "aps__label" }, N = { class: "aps__row" }, P = { class: "aps__label" }, F = { class: "aps__value" }, I = { class: "aps__slider" }, L = { class: "aps__group" }, R = { class: "aps__title" }, ge = { class: "aps__row aps__row--switch" }, _e = { class: "aps__row" }, ve = { class: "aps__label" }, ye = { class: "aps__foot" }, be = {
	class: "visually-hidden",
	role: "status",
	"aria-live": "polite"
}, xe = {
	key: 1,
	class: "aps"
}, Se = { class: "aps__group" }, Ce = { class: "aps__title" }, we = { class: "aps__row aps__row--switch" }, Te = { class: "aps__row" }, Ee = { class: "aps__label" }, De = { class: "aps__value" }, Oe = { class: "aps__slider" }, ke = { class: "aps__row" }, Ae = { class: "aps__label" }, je = { class: "aps__group" }, Me = { class: "aps__title" }, Ne = { class: "aps__row" }, Pe = { class: "aps__label" }, Fe = { class: "aps__row" }, Ie = { class: "aps__label" }, Le = { class: "aps__row" }, Re = { class: "aps__label" }, ze = { class: "aps__row" }, Be = { class: "aps__label" }, Ve = { class: "aps__row" }, He = { class: "aps__label" }, z = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let c = n(), l = ee(), { t: v } = r(), z = [
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
		], B = [
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
		], V = [{
			value: "comfortable",
			label: "Comfortable"
		}, {
			value: "compact",
			label: "Compact"
		}], H = [
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
		], U = [
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
		], W = [
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
			c.defaultSubtitleLang = e === "" ? null : String(e);
		}
		function J(e, t) {
			c.captionStyle = {
				...c.captionStyle,
				[e]: t
			};
		}
		let Y = d(() => Math.max(0, z.findIndex((e) => e.value === c.theme))), X = d(() => Math.max(0, B.findIndex((e) => e.value === c.accent)));
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
			let t = Z(e, z.length, Y.value);
			t !== null && (c.theme = z[t].value);
		}
		function Ge(e) {
			let t = Z(e, B.length, X.value);
			t !== null && (c.accent = B[t].value);
		}
		let Q = x(!1), $;
		function Ke() {
			if (!Q.value) {
				Q.value = !0, clearTimeout($), $ = setTimeout(() => Q.value = !1, 3500);
				return;
			}
			clearTimeout($), Q.value = !1, c.reset(), l.info(v("settings.resetDone"));
		}
		return oe(() => clearTimeout($)), (n, r) => e.panel === "appearance" ? (b(), m("div", se, [
			h("section", ce, [h("h3", le, C(w(v)("settings.theme")), 1), h("div", {
				class: "aps__themes",
				role: "radiogroup",
				"aria-label": w(v)("settings.theme"),
				onKeydown: We
			}, [(b(), m(u, null, S(z, (e, n) => h("button", {
				key: e.value,
				type: "button",
				role: "radio",
				class: y(["aps__theme", { "is-active": w(c).theme === e.value }]),
				"aria-checked": w(c).theme === e.value,
				tabindex: Y.value === n ? 0 : -1,
				"data-theme": e.value,
				onClick: (t) => w(c).theme = e.value
			}, [r[12] ||= h("span", { class: "aps__preview" }, [h("span", { class: "aps__preview-bar" }), h("span", { class: "aps__preview-card" })], -1), h("span", fe, [g(C(e.label) + " ", 1), w(c).theme === e.value ? (b(), f(t, {
				key: 0,
				name: "check",
				class: "aps__theme-check"
			})) : p("", !0)])], 10, de)), 64))], 40, ue)]),
			h("section", pe, [h("h3", me, C(w(v)("settings.accent")), 1), h("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": w(v)("settings.accentColor"),
				onKeydown: Ge
			}, [(b(), m(u, null, S(B, (e, n) => h("button", {
				key: e.label,
				type: "button",
				role: "radio",
				class: y(["aps__accent", { "is-active": w(c).accent === e.value }]),
				"aria-checked": w(c).accent === e.value,
				"aria-label": e.label,
				title: e.label,
				tabindex: X.value === n ? 0 : -1,
				onClick: (t) => w(c).accent = e.value
			}, [h("span", {
				class: "aps__accent-dot",
				style: ae({ background: e.swatch })
			}, [w(c).accent === e.value ? (b(), f(t, {
				key: 0,
				name: "check"
			})) : p("", !0)], 4)], 10, E)), 64))], 40, he)]),
			h("section", D, [
				h("h3", O, C(w(v)("settings.display")), 1),
				h("div", k, [h("span", A, C(w(v)("settings.density")), 1), _(s, {
					"model-value": w(c).density,
					options: V,
					label: w(v)("settings.density"),
					"onUpdate:modelValue": r[0] ||= (e) => w(c).density = e
				}, null, 8, ["model-value", "label"])]),
				h("div", j, [h("span", M, C(w(v)("settings.gridDensity")), 1), _(s, {
					"model-value": w(c).gridDensity,
					options: H,
					label: w(v)("settings.gridDensity"),
					"onUpdate:modelValue": r[1] ||= (e) => w(c).gridDensity = e
				}, null, 8, ["model-value", "label"])]),
				h("div", N, [h("span", P, [g(C(w(v)("settings.cardSize")) + " ", 1), h("span", F, C(K(w(c).cardSize)), 1)]), h("div", I, [_(a, {
					"model-value": w(c).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: w(v)("settings.cardSize"),
					"format-value": K,
					"onUpdate:modelValue": r[2] ||= (e) => w(c).cardSize = e
				}, null, 8, ["model-value", "label"])])])
			]),
			h("section", L, [
				h("h3", R, C(w(v)("settings.atmosphere")), 1),
				h("div", ge, [_(o, {
					"model-value": w(c).atmosphere,
					label: w(v)("settings.filmGrainGlow"),
					"onUpdate:modelValue": r[3] ||= (e) => w(c).atmosphere = e
				}, null, 8, ["model-value", "label"])]),
				h("div", _e, [h("span", ve, C(w(v)("settings.motion")), 1), _(s, {
					"model-value": w(c).reducedMotion,
					options: U,
					label: w(v)("settings.motion"),
					"onUpdate:modelValue": r[4] ||= (e) => w(c).reducedMotion = e
				}, null, 8, ["model-value", "label"])])
			]),
			h("div", ye, [_(i, {
				variant: "ghost",
				"left-icon": Q.value ? "alert" : "rewind",
				onClick: Ke
			}, {
				default: T(() => [g(C(Q.value ? w(v)("settings.resetConfirm") : w(v)("settings.resetAll")), 1)]),
				_: 1
			}, 8, ["left-icon"]), h("span", be, C(Q.value ? w(v)("settings.resetConfirm") : ""), 1)])
		])) : (b(), m("div", xe, [h("section", Se, [
			h("h3", Ce, C(w(v)("settings.playback")), 1),
			h("div", we, [_(o, {
				"model-value": w(c).autoplay,
				label: w(v)("settings.autoplayNext"),
				"onUpdate:modelValue": r[5] ||= (e) => w(c).autoplay = e
			}, null, 8, ["model-value", "label"])]),
			h("div", Te, [h("span", Ee, [g(C(w(v)("settings.defaultVolume")) + " ", 1), h("span", De, C(G(w(c).defaultVolume)), 1)]), h("div", Oe, [_(a, {
				"model-value": w(c).defaultVolume,
				min: 0,
				max: 1,
				step: .05,
				label: w(v)("settings.defaultVolume"),
				"format-value": G,
				"onUpdate:modelValue": r[6] ||= (e) => w(c).defaultVolume = e
			}, null, 8, ["model-value", "label"])])]),
			h("div", ke, [h("span", Ae, C(w(v)("settings.defaultQuality")), 1), _(s, {
				"model-value": w(c).defaultQuality,
				options: W,
				label: w(v)("settings.defaultQuality"),
				"onUpdate:modelValue": r[7] ||= (e) => w(c).defaultQuality = String(e)
			}, null, 8, ["model-value", "label"])])
		]), h("section", je, [
			h("h3", Me, C(w(v)("settings.subtitles")), 1),
			h("div", Ne, [h("span", Pe, C(w(v)("settings.defaultLanguage")), 1), _(s, {
				"model-value": w(c).defaultSubtitleLang ?? "",
				options: Ue,
				label: w(v)("settings.defaultSubtitleLanguage"),
				"onUpdate:modelValue": q
			}, null, 8, ["model-value", "label"])]),
			h("div", Fe, [h("span", Ie, C(w(v)("settings.captionSize")), 1), _(s, {
				"model-value": w(c).captionStyle.size,
				options: w(te),
				label: w(v)("settings.captionSize"),
				"onUpdate:modelValue": r[8] ||= (e) => J("size", e)
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])]),
			h("div", Le, [h("span", Re, C(w(v)("settings.captionColor")), 1), _(s, {
				"model-value": w(c).captionStyle.textColor,
				options: w(ne),
				label: w(v)("settings.captionColor"),
				"onUpdate:modelValue": r[9] ||= (e) => J("textColor", String(e))
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])]),
			h("div", ze, [h("span", Be, C(w(v)("settings.captionBackground")), 1), _(s, {
				"model-value": w(c).captionStyle.background,
				options: w(ie),
				label: w(v)("settings.captionBackground"),
				"onUpdate:modelValue": r[10] ||= (e) => J("background", e)
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])]),
			h("div", Ve, [h("span", He, C(w(v)("settings.captionEdge")), 1), _(s, {
				"model-value": w(c).captionStyle.edge,
				options: w(re),
				label: w(v)("settings.captionEdge"),
				"onUpdate:modelValue": r[11] ||= (e) => J("edge", e)
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])])
		])]));
	}
}), [["__scopeId", "data-v-b3106f42"]]), B = { class: "settings-page" }, V = { class: "settings-page__head" }, H = { class: "settings-page__eyebrow" }, U = { class: "settings-page__title" }, W = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "SettingsPage",
	setup(e) {
		let { t } = r(), n = [
			{
				value: "appearance",
				label: t("settings.tabAppearance"),
				icon: "sun"
			},
			{
				value: "playback",
				label: t("settings.tabPlayback"),
				icon: "play"
			},
			{
				value: "server",
				label: t("settings.tabServer"),
				icon: "settings"
			}
		], i = x("appearance");
		return (e, r) => (b(), m("div", B, [h("header", V, [h("p", H, C(w(t)("settings.preferences")), 1), h("h1", U, C(w(t)("settings.title")), 1)]), _(c, {
			modelValue: i.value,
			"onUpdate:modelValue": r[0] ||= (e) => i.value = e,
			tabs: n,
			label: w(t)("settings.sectionsLabel")
		}, {
			appearance: T(() => [_(z, { panel: "appearance" })]),
			playback: T(() => [_(z, { panel: "playback" })]),
			server: T(() => [_(l)]),
			_: 1
		}, 8, ["modelValue", "label"])]));
	}
}), [["__scopeId", "data-v-def84db9"]]);
//#endregion
export { W as default };

//# sourceMappingURL=SettingsPage-9rku4j9E.js.map