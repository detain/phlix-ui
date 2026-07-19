import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-Ci10VWtp.js";
import { a as n } from "./usePreferencesStore-C9GLbD7G.js";
import { t as r } from "./useMessages-CMPz9FmM.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as ee } from "./Button-AW4z0vv0.js";
import { t as a } from "./Slider-LnnvB5jy.js";
import { t as o } from "./Switch-DyS2L5gX.js";
import { t as s } from "./Select-nIPW0HYh.js";
import { t as c } from "./Tabs-CwjlCw7u.js";
import { n as l, t as u } from "./SecuritySettingsPage-9h7gIGxJ.js";
import { i as te, n as ne, r as re, t as ie } from "./captions-DoP7ce5A.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, normalizeClass as b, normalizeStyle as ae, onBeforeUnmount as oe, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, withCtx as E } from "vue";
//#region src/components/AppearanceSettings.vue?vue&type=script&setup=true&lang.ts
var se = {
	key: 0,
	class: "aps"
}, ce = { class: "aps__group" }, le = { class: "aps__title" }, ue = ["aria-label"], de = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], fe = { class: "aps__theme-label" }, pe = { class: "aps__group" }, me = { class: "aps__title" }, he = ["aria-label"], ge = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], D = { class: "aps__group" }, O = { class: "aps__title" }, k = { class: "aps__row" }, A = {
	class: "aps__label",
	id: "aps-density"
}, j = { class: "aps__row" }, M = { class: "aps__label" }, N = { class: "aps__row" }, P = { class: "aps__label" }, F = { class: "aps__value" }, I = { class: "aps__slider" }, L = { class: "aps__group" }, _e = { class: "aps__title" }, ve = { class: "aps__row aps__row--switch" }, ye = { class: "aps__row aps__row--switch" }, be = { class: "aps__row" }, xe = { class: "aps__label" }, Se = { class: "aps__foot" }, Ce = {
	class: "visually-hidden",
	role: "status",
	"aria-live": "polite"
}, we = {
	key: 1,
	class: "aps"
}, Te = { class: "aps__group" }, Ee = { class: "aps__title" }, De = { class: "aps__row aps__row--switch" }, Oe = { class: "aps__row" }, ke = { class: "aps__label" }, Ae = { class: "aps__value" }, je = { class: "aps__slider" }, Me = { class: "aps__row" }, Ne = { class: "aps__label" }, R = { class: "aps__group" }, Pe = { class: "aps__title" }, Fe = { class: "aps__row" }, Ie = { class: "aps__label" }, Le = { class: "aps__value" }, Re = { class: "aps__slider" }, ze = { class: "aps__row aps__row--switch" }, Be = { class: "aps__row" }, Ve = { class: "aps__label" }, He = { class: "aps__group" }, Ue = { class: "aps__title" }, We = { class: "aps__row" }, Ge = { class: "aps__label" }, Ke = { class: "aps__row" }, qe = { class: "aps__label" }, Je = { class: "aps__row" }, Ye = { class: "aps__label" }, Xe = { class: "aps__row" }, Ze = { class: "aps__label" }, Qe = { class: "aps__row" }, $e = { class: "aps__label" }, z = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let c = n(), l = i(), { t: u } = r(), y = [
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
		], z = [
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
		], B = [{
			value: "comfortable",
			label: "Comfortable"
		}, {
			value: "compact",
			label: "Compact"
		}], V = [
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
		], H = [
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
		], U = [
			{
				value: "auto",
				label: "Auto"
			},
			{
				value: "2160p",
				label: "4K"
			},
			{
				value: "1440p",
				label: "1440p"
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
			},
			{
				value: "360p",
				label: "360p"
			},
			{
				value: "240p",
				label: "240p"
			}
		], W = [
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
		], et = [
			{
				value: "low",
				label: "Low"
			},
			{
				value: "medium",
				label: "Medium"
			},
			{
				value: "high",
				label: "High"
			},
			{
				value: "lossless",
				label: "Lossless"
			}
		], G = (e) => `${Math.round(e * 100)}%`, K = (e) => `${e}px`, q = (e) => `${e}s`;
		function tt(e) {
			c.defaultSubtitleLang = e === "" ? null : String(e), c.subtitlePreferenceSet = !0;
		}
		function J(e, t) {
			c.captionStyle = {
				...c.captionStyle,
				[e]: t
			};
		}
		let Y = f(() => Math.max(0, y.findIndex((e) => e.value === c.theme))), X = f(() => Math.max(0, z.findIndex((e) => e.value === c.accent)));
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
		function nt(e) {
			let t = Z(e, y.length, Y.value);
			t !== null && (c.theme = y[t].value);
		}
		function rt(e) {
			let t = Z(e, z.length, X.value);
			t !== null && (c.accent = z[t].value);
		}
		let Q = S(!1), $;
		function it() {
			if (!Q.value) {
				Q.value = !0, clearTimeout($), $ = setTimeout(() => Q.value = !1, 3500);
				return;
			}
			clearTimeout($), Q.value = !1, c.reset(), l.info(u("settings.resetDone"));
		}
		return oe(() => clearTimeout($)), (n, r) => e.panel === "appearance" ? (x(), h("div", se, [
			g("section", ce, [g("h3", le, w(T(u)("settings.theme")), 1), g("div", {
				class: "aps__themes",
				role: "radiogroup",
				"aria-label": T(u)("settings.theme"),
				onKeydown: nt
			}, [(x(), h(d, null, C(y, (e, n) => g("button", {
				key: e.value,
				type: "button",
				role: "radio",
				class: b(["aps__theme", { "is-active": T(c).theme === e.value }]),
				"aria-checked": T(c).theme === e.value,
				tabindex: Y.value === n ? 0 : -1,
				"data-theme": e.value,
				onClick: (t) => T(c).theme = e.value
			}, [r[16] ||= g("span", { class: "aps__preview" }, [g("span", { class: "aps__preview-bar" }), g("span", { class: "aps__preview-card" })], -1), g("span", fe, [_(w(e.label) + " ", 1), T(c).theme === e.value ? (x(), p(t, {
				key: 0,
				name: "check",
				class: "aps__theme-check"
			})) : m("", !0)])], 10, de)), 64))], 40, ue)]),
			g("section", pe, [g("h3", me, w(T(u)("settings.accent")), 1), g("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": T(u)("settings.accentColor"),
				onKeydown: rt
			}, [(x(), h(d, null, C(z, (e, n) => g("button", {
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
				style: ae({ background: e.swatch })
			}, [T(c).accent === e.value ? (x(), p(t, {
				key: 0,
				name: "check"
			})) : m("", !0)], 4)], 10, ge)), 64))], 40, he)]),
			g("section", D, [
				g("h3", O, w(T(u)("settings.display")), 1),
				g("div", k, [g("span", A, w(T(u)("settings.density")), 1), v(s, {
					"model-value": T(c).density,
					options: B,
					label: T(u)("settings.density"),
					"onUpdate:modelValue": r[0] ||= (e) => T(c).density = e
				}, null, 8, ["model-value", "label"])]),
				g("div", j, [g("span", M, w(T(u)("settings.gridDensity")), 1), v(s, {
					"model-value": T(c).gridDensity,
					options: V,
					label: T(u)("settings.gridDensity"),
					"onUpdate:modelValue": r[1] ||= (e) => T(c).gridDensity = e
				}, null, 8, ["model-value", "label"])]),
				g("div", N, [g("span", P, [_(w(T(u)("settings.cardSize")) + " ", 1), g("span", F, w(K(T(c).cardSize)), 1)]), g("div", I, [v(a, {
					"model-value": T(c).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: T(u)("settings.cardSize"),
					"format-value": K,
					"onUpdate:modelValue": r[2] ||= (e) => T(c).cardSize = e
				}, null, 8, ["model-value", "label"])])])
			]),
			g("section", L, [
				g("h3", _e, w(T(u)("settings.atmosphere")), 1),
				g("div", ve, [v(o, {
					"model-value": T(c).atmosphere,
					label: T(u)("settings.filmGrainGlow"),
					"onUpdate:modelValue": r[3] ||= (e) => T(c).atmosphere = e
				}, null, 8, ["model-value", "label"])]),
				g("div", ye, [v(o, {
					"model-value": T(c).tv,
					label: "TV mode",
					"onUpdate:modelValue": r[4] ||= (e) => T(c).tv = e
				}, null, 8, ["model-value"])]),
				r[17] ||= g("p", { class: "aps__hint" }, "Larger controls and a visible focus outline for TV / remote navigation.", -1),
				g("div", be, [g("span", xe, w(T(u)("settings.motion")), 1), v(s, {
					"model-value": T(c).reducedMotion,
					options: H,
					label: T(u)("settings.motion"),
					"onUpdate:modelValue": r[5] ||= (e) => T(c).reducedMotion = e
				}, null, 8, ["model-value", "label"])])
			]),
			g("div", Se, [v(ee, {
				variant: "ghost",
				"left-icon": Q.value ? "alert" : "rewind",
				onClick: it
			}, {
				default: E(() => [_(w(Q.value ? T(u)("settings.resetConfirm") : T(u)("settings.resetAll")), 1)]),
				_: 1
			}, 8, ["left-icon"]), g("span", Ce, w(Q.value ? T(u)("settings.resetConfirm") : ""), 1)])
		])) : (x(), h("div", we, [
			g("section", Te, [
				g("h3", Ee, w(T(u)("settings.playback")), 1),
				g("div", De, [v(o, {
					"model-value": T(c).autoplay,
					label: T(u)("settings.autoplayNext"),
					"onUpdate:modelValue": r[6] ||= (e) => T(c).autoplay = e
				}, null, 8, ["model-value", "label"])]),
				g("div", Oe, [g("span", ke, [_(w(T(u)("settings.defaultVolume")) + " ", 1), g("span", Ae, w(G(T(c).defaultVolume)), 1)]), g("div", je, [v(a, {
					"model-value": T(c).defaultVolume,
					min: 0,
					max: 1,
					step: .05,
					label: T(u)("settings.defaultVolume"),
					"format-value": G,
					"onUpdate:modelValue": r[7] ||= (e) => T(c).defaultVolume = e
				}, null, 8, ["model-value", "label"])])]),
				g("div", Me, [g("span", Ne, w(T(u)("settings.defaultQuality")), 1), v(s, {
					"model-value": T(c).defaultQuality,
					options: U,
					label: T(u)("settings.defaultQuality"),
					"onUpdate:modelValue": r[8] ||= (e) => T(c).defaultQuality = String(e)
				}, null, 8, ["model-value", "label"])])
			]),
			g("section", R, [
				g("h3", Pe, w(T(u)("settings.crossfade")), 1),
				g("div", Fe, [g("span", Ie, [_(w(T(u)("settings.crossfadeDuration")) + " ", 1), g("span", Le, w(q(T(c).crossfadeDuration)), 1)]), g("div", Re, [v(a, {
					"model-value": T(c).crossfadeDuration,
					min: 0,
					max: 12,
					step: 1,
					label: T(u)("settings.crossfadeDuration"),
					"format-value": q,
					"onUpdate:modelValue": r[9] ||= (e) => T(c).crossfadeDuration = e
				}, null, 8, ["model-value", "label"])])]),
				g("div", ze, [v(o, {
					"model-value": T(c).gaplessEnabled,
					label: T(u)("settings.gaplessEnabled"),
					"onUpdate:modelValue": r[10] ||= (e) => T(c).gaplessEnabled = e
				}, null, 8, ["model-value", "label"])]),
				g("div", Be, [g("span", Ve, w(T(u)("settings.preferredAudioQuality")), 1), v(s, {
					"model-value": T(c).preferredAudioQuality,
					options: et,
					label: T(u)("settings.preferredAudioQuality"),
					"onUpdate:modelValue": r[11] ||= (e) => T(c).preferredAudioQuality = e
				}, null, 8, ["model-value", "label"])])
			]),
			g("section", He, [
				g("h3", Ue, w(T(u)("settings.subtitles")), 1),
				g("div", We, [g("span", Ge, w(T(u)("settings.defaultLanguage")), 1), v(s, {
					"model-value": T(c).defaultSubtitleLang ?? "",
					options: W,
					label: T(u)("settings.defaultSubtitleLanguage"),
					"onUpdate:modelValue": tt
				}, null, 8, ["model-value", "label"])]),
				g("div", Ke, [g("span", qe, w(T(u)("settings.captionSize")), 1), v(s, {
					"model-value": T(c).captionStyle.size,
					options: T(te),
					label: T(u)("settings.captionSize"),
					"onUpdate:modelValue": r[12] ||= (e) => J("size", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				g("div", Je, [g("span", Ye, w(T(u)("settings.captionColor")), 1), v(s, {
					"model-value": T(c).captionStyle.textColor,
					options: T(ne),
					label: T(u)("settings.captionColor"),
					"onUpdate:modelValue": r[13] ||= (e) => J("textColor", String(e))
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				g("div", Xe, [g("span", Ze, w(T(u)("settings.captionBackground")), 1), v(s, {
					"model-value": T(c).captionStyle.background,
					options: T(ie),
					label: T(u)("settings.captionBackground"),
					"onUpdate:modelValue": r[14] ||= (e) => J("background", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				g("div", Qe, [g("span", $e, w(T(u)("settings.captionEdge")), 1), v(s, {
					"model-value": T(c).captionStyle.edge,
					options: T(re),
					label: T(u)("settings.captionEdge"),
					"onUpdate:modelValue": r[15] ||= (e) => J("edge", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		]));
	}
}), [["__scopeId", "data-v-c9d58599"]]), B = { class: "settings-page" }, V = { class: "settings-page__head" }, H = { class: "settings-page__eyebrow" }, U = { class: "settings-page__title" }, W = /*#__PURE__*/ e(/* @__PURE__ */ y({
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
			},
			{
				value: "security",
				label: t("settings.tabSecurity"),
				icon: "key"
			}
		], i = S("appearance");
		return (e, r) => (x(), h("div", B, [g("header", V, [g("p", H, w(T(t)("settings.preferences")), 1), g("h1", U, w(T(t)("settings.title")), 1)]), v(c, {
			modelValue: i.value,
			"onUpdate:modelValue": r[0] ||= (e) => i.value = e,
			tabs: n,
			label: T(t)("settings.sectionsLabel")
		}, {
			appearance: E(() => [v(z, { panel: "appearance" })]),
			playback: E(() => [v(z, { panel: "playback" })]),
			server: E(() => [v(l)]),
			security: E(() => [v(u)]),
			_: 1
		}, 8, ["modelValue", "label"])]));
	}
}), [["__scopeId", "data-v-9a84cce9"]]);
//#endregion
export { W as default };

//# sourceMappingURL=SettingsPage-D0FpLdNM.js.map