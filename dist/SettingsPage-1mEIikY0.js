import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-BFFMWKZp.js";
import { t as r } from "./Button-BwQkyEkr.js";
import { t as i } from "./Slider-BMn_Lp_q.js";
import { t as a } from "./Switch-CFZhdkXR.js";
import { t as o } from "./Select-CkOiSrAn.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { t as c } from "./Tabs-x8dUKZN5.js";
import { i as ee, n as l, r as te, t as ne } from "./captions-COgPp5bH.js";
import { t as u } from "./SettingsForm-DuSotEMX.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, normalizeClass as b, normalizeStyle as re, onBeforeUnmount as ie, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, withCtx as E } from "vue";
//#region src/components/AppearanceSettings.vue?vue&type=script&setup=true&lang.ts
var ae = {
	key: 0,
	class: "aps"
}, oe = { class: "aps__group" }, se = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], ce = { class: "aps__theme-label" }, le = { class: "aps__group" }, ue = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], de = { class: "aps__group" }, D = { class: "aps__row" }, O = { class: "aps__row" }, k = { class: "aps__row" }, A = { class: "aps__label" }, j = { class: "aps__value" }, M = { class: "aps__slider" }, N = { class: "aps__group" }, P = { class: "aps__row aps__row--switch" }, F = { class: "aps__row" }, I = { class: "aps__foot" }, L = {
	class: "visually-hidden",
	role: "status",
	"aria-live": "polite"
}, R = {
	key: 1,
	class: "aps"
}, z = { class: "aps__group" }, B = { class: "aps__row aps__row--switch" }, V = { class: "aps__row" }, H = { class: "aps__label" }, fe = { class: "aps__value" }, pe = { class: "aps__slider" }, me = { class: "aps__row" }, he = { class: "aps__group" }, ge = { class: "aps__row" }, _e = { class: "aps__row" }, ve = { class: "aps__row" }, ye = { class: "aps__row" }, be = { class: "aps__row" }, U = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let c = n(), u = s(), y = [
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
		}], G = [
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
		], xe = [
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
		], Se = [
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
		], Ce = [
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
		], K = (e) => `${Math.round(e * 100)}%`, q = (e) => `${e}px`;
		function we(e) {
			c.defaultSubtitleLang = e === "" ? null : String(e);
		}
		function J(e, t) {
			c.captionStyle = {
				...c.captionStyle,
				[e]: t
			};
		}
		let Y = f(() => Math.max(0, y.findIndex((e) => e.value === c.theme))), X = f(() => Math.max(0, U.findIndex((e) => e.value === c.accent)));
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
		function Te(e) {
			let t = Z(e, y.length, Y.value);
			t !== null && (c.theme = y[t].value);
		}
		function Ee(e) {
			let t = Z(e, U.length, X.value);
			t !== null && (c.accent = U[t].value);
		}
		let Q = S(!1), $;
		function De() {
			if (!Q.value) {
				Q.value = !0, clearTimeout($), $ = setTimeout(() => Q.value = !1, 3500);
				return;
			}
			clearTimeout($), Q.value = !1, c.reset(), u.info("Preferences reset to defaults.");
		}
		return ie(() => clearTimeout($)), (n, s) => e.panel === "appearance" ? (x(), h("div", ae, [
			g("section", oe, [s[13] ||= g("h3", { class: "aps__title" }, "Theme", -1), g("div", {
				class: "aps__themes",
				role: "radiogroup",
				"aria-label": "Theme",
				onKeydown: Te
			}, [(x(), h(d, null, C(y, (e, n) => g("button", {
				key: e.value,
				type: "button",
				role: "radio",
				class: b(["aps__theme", { "is-active": T(c).theme === e.value }]),
				"aria-checked": T(c).theme === e.value,
				tabindex: Y.value === n ? 0 : -1,
				"data-theme": e.value,
				onClick: (t) => T(c).theme = e.value
			}, [s[12] ||= g("span", { class: "aps__preview" }, [g("span", { class: "aps__preview-bar" }), g("span", { class: "aps__preview-card" })], -1), g("span", ce, [_(w(e.label) + " ", 1), T(c).theme === e.value ? (x(), p(t, {
				key: 0,
				name: "check",
				class: "aps__theme-check"
			})) : m("", !0)])], 10, se)), 64))], 32)]),
			g("section", le, [s[14] ||= g("h3", { class: "aps__title" }, "Accent", -1), g("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": "Accent color",
				onKeydown: Ee
			}, [(x(), h(d, null, C(U, (e, n) => g("button", {
				key: e.label,
				type: "button",
				role: "radio",
				class: b(["aps__accent", { "is-active": T(c).accent === e.value }]),
				"aria-checked": T(c).accent === e.value,
				"aria-label": e.label,
				title: e.label,
				tabindex: X.value === n ? 0 : -1,
				onClick: (t) => T(c).accent = e.value
			}, [g("span", {
				class: "aps__accent-dot",
				style: re({ background: e.swatch })
			}, [T(c).accent === e.value ? (x(), p(t, {
				key: 0,
				name: "check"
			})) : m("", !0)], 4)], 10, ue)), 64))], 32)]),
			g("section", de, [
				s[18] ||= g("h3", { class: "aps__title" }, "Display", -1),
				g("div", D, [s[15] ||= g("span", {
					class: "aps__label",
					id: "aps-density"
				}, "Density", -1), v(o, {
					"model-value": T(c).density,
					options: W,
					label: "Density",
					"onUpdate:modelValue": s[0] ||= (e) => T(c).density = e
				}, null, 8, ["model-value"])]),
				g("div", O, [s[16] ||= g("span", { class: "aps__label" }, "Grid density", -1), v(o, {
					"model-value": T(c).gridDensity,
					options: G,
					label: "Grid density",
					"onUpdate:modelValue": s[1] ||= (e) => T(c).gridDensity = e
				}, null, 8, ["model-value"])]),
				g("div", k, [g("span", A, [s[17] ||= _("Card size ", -1), g("span", j, w(q(T(c).cardSize)), 1)]), g("div", M, [v(i, {
					"model-value": T(c).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: "Card size",
					"format-value": q,
					"onUpdate:modelValue": s[2] ||= (e) => T(c).cardSize = e
				}, null, 8, ["model-value"])])])
			]),
			g("section", N, [
				s[20] ||= g("h3", { class: "aps__title" }, "Atmosphere", -1),
				g("div", P, [v(a, {
					"model-value": T(c).atmosphere,
					label: "Film-grain + ambient glow",
					"onUpdate:modelValue": s[3] ||= (e) => T(c).atmosphere = e
				}, null, 8, ["model-value"])]),
				g("div", F, [s[19] ||= g("span", { class: "aps__label" }, "Motion", -1), v(o, {
					"model-value": T(c).reducedMotion,
					options: xe,
					label: "Motion",
					"onUpdate:modelValue": s[4] ||= (e) => T(c).reducedMotion = e
				}, null, 8, ["model-value"])])
			]),
			g("div", I, [v(r, {
				variant: "ghost",
				"left-icon": Q.value ? "alert" : "rewind",
				onClick: De
			}, {
				default: E(() => [_(w(Q.value ? "Click again to confirm reset" : "Reset all preferences"), 1)]),
				_: 1
			}, 8, ["left-icon"]), g("span", L, w(Q.value ? "Click again to confirm reset" : ""), 1)])
		])) : (x(), h("div", R, [g("section", z, [
			s[23] ||= g("h3", { class: "aps__title" }, "Playback", -1),
			g("div", B, [v(a, {
				"model-value": T(c).autoplay,
				label: "Autoplay next episode",
				"onUpdate:modelValue": s[5] ||= (e) => T(c).autoplay = e
			}, null, 8, ["model-value"])]),
			g("div", V, [g("span", H, [s[21] ||= _("Default volume ", -1), g("span", fe, w(K(T(c).defaultVolume)), 1)]), g("div", pe, [v(i, {
				"model-value": T(c).defaultVolume,
				min: 0,
				max: 1,
				step: .05,
				label: "Default volume",
				"format-value": K,
				"onUpdate:modelValue": s[6] ||= (e) => T(c).defaultVolume = e
			}, null, 8, ["model-value"])])]),
			g("div", me, [s[22] ||= g("span", { class: "aps__label" }, "Default quality", -1), v(o, {
				"model-value": T(c).defaultQuality,
				options: Se,
				label: "Default quality",
				"onUpdate:modelValue": s[7] ||= (e) => T(c).defaultQuality = String(e)
			}, null, 8, ["model-value"])])
		]), g("section", he, [
			s[29] ||= g("h3", { class: "aps__title" }, "Subtitles", -1),
			g("div", ge, [s[24] ||= g("span", { class: "aps__label" }, "Default language", -1), v(o, {
				"model-value": T(c).defaultSubtitleLang ?? "",
				options: Ce,
				label: "Default subtitle language",
				"onUpdate:modelValue": we
			}, null, 8, ["model-value"])]),
			g("div", _e, [s[25] ||= g("span", { class: "aps__label" }, "Caption size", -1), v(o, {
				"model-value": T(c).captionStyle.size,
				options: T(ee),
				label: "Caption size",
				"onUpdate:modelValue": s[8] ||= (e) => J("size", e)
			}, null, 8, ["model-value", "options"])]),
			g("div", ve, [s[26] ||= g("span", { class: "aps__label" }, "Caption color", -1), v(o, {
				"model-value": T(c).captionStyle.textColor,
				options: T(l),
				label: "Caption color",
				"onUpdate:modelValue": s[9] ||= (e) => J("textColor", String(e))
			}, null, 8, ["model-value", "options"])]),
			g("div", ye, [s[27] ||= g("span", { class: "aps__label" }, "Caption background", -1), v(o, {
				"model-value": T(c).captionStyle.background,
				options: T(ne),
				label: "Caption background",
				"onUpdate:modelValue": s[10] ||= (e) => J("background", e)
			}, null, 8, ["model-value", "options"])]),
			g("div", be, [s[28] ||= g("span", { class: "aps__label" }, "Caption edge", -1), v(o, {
				"model-value": T(c).captionStyle.edge,
				options: T(te),
				label: "Caption edge",
				"onUpdate:modelValue": s[11] ||= (e) => J("edge", e)
			}, null, 8, ["model-value", "options"])])
		])]));
	}
}), [["__scopeId", "data-v-9396dd0f"]]), W = { class: "settings-page" }, G = /*#__PURE__*/ e(/* @__PURE__ */ y({
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
		], n = S("appearance");
		return (e, r) => (x(), h("div", W, [r[1] ||= g("header", { class: "settings-page__head" }, [g("p", { class: "settings-page__eyebrow" }, "Preferences"), g("h1", { class: "settings-page__title" }, "Settings")], -1), v(c, {
			modelValue: n.value,
			"onUpdate:modelValue": r[0] ||= (e) => n.value = e,
			tabs: t,
			label: "Settings sections"
		}, {
			appearance: E(() => [v(U, { panel: "appearance" })]),
			playback: E(() => [v(U, { panel: "playback" })]),
			server: E(() => [v(u)]),
			_: 1
		}, 8, ["modelValue"])]));
	}
}), [["__scopeId", "data-v-1dba1556"]]);
//#endregion
export { G as default };

//# sourceMappingURL=SettingsPage-1mEIikY0.js.map