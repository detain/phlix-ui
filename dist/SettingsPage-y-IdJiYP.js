import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CfPSBsz2.js";
import { a as n } from "./usePreferencesStore-CFPikE8Z.js";
import { t as r } from "./useMessages-BinKgH9r.js";
import { t as i } from "./useApiBase-CV_r-Kk4.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { _ as te, g as ne, n as re, t as a } from "./SecuritySettingsPage-DT49gocN.js";
import { t as ie } from "./Button-DuTfRWnu.js";
import { t as o } from "./Slider-LnnvB5jy.js";
import { t as s } from "./Switch-DyS2L5gX.js";
import { t as c } from "./Select-D5GWWuWl.js";
import { t as l } from "./Tabs-lzVIjdc-.js";
import { i as ae, n as oe, r as se, t as ce } from "./captions-DoP7ce5A.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, normalizeClass as y, normalizeStyle as b, onBeforeUnmount as le, onMounted as ue, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, withCtx as E } from "vue";
//#region src/components/AppearanceSettings.vue?vue&type=script&setup=true&lang.ts
var de = {
	key: 0,
	class: "aps"
}, fe = { class: "aps__group" }, pe = { class: "aps__title" }, me = ["aria-label"], he = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], ge = { class: "aps__theme-label" }, D = { class: "aps__group" }, O = { class: "aps__title" }, k = ["aria-label"], A = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], j = { class: "aps__group" }, M = { class: "aps__title" }, N = { class: "aps__row" }, P = {
	class: "aps__label",
	id: "aps-density"
}, F = { class: "aps__row" }, I = { class: "aps__label" }, L = { class: "aps__row" }, _e = { class: "aps__label" }, ve = { class: "aps__value" }, ye = { class: "aps__slider" }, be = { class: "aps__group" }, xe = { class: "aps__title" }, Se = { class: "aps__row aps__row--switch" }, Ce = { class: "aps__row aps__row--switch" }, we = { class: "aps__row" }, Te = { class: "aps__label" }, Ee = { class: "aps__foot" }, De = {
	class: "visually-hidden",
	role: "status",
	"aria-live": "polite"
}, Oe = {
	key: 1,
	class: "aps"
}, ke = { class: "aps__group" }, Ae = { class: "aps__title" }, je = { class: "aps__row aps__row--switch" }, Me = { class: "aps__row" }, Ne = { class: "aps__label" }, Pe = { class: "aps__value" }, Fe = { class: "aps__slider" }, Ie = { class: "aps__row" }, R = { class: "aps__label" }, Le = { class: "aps__group" }, Re = { class: "aps__title" }, ze = { class: "aps__row" }, Be = { class: "aps__label" }, Ve = { class: "aps__value" }, He = { class: "aps__slider" }, Ue = { class: "aps__row aps__row--switch" }, We = { class: "aps__row" }, Ge = { class: "aps__label" }, Ke = { class: "aps__group" }, qe = { class: "aps__title" }, Je = { class: "aps__row" }, Ye = { class: "aps__label" }, Xe = { class: "aps__row" }, Ze = { class: "aps__label" }, Qe = { class: "aps__row" }, $e = { class: "aps__label" }, et = { class: "aps__row" }, tt = { class: "aps__label" }, nt = { class: "aps__row" }, rt = { class: "aps__label" }, z = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let a = n(), l = re(), v = ee(), { t: z } = r(), B = i(), V = [
			{
				value: "nocturne",
				label: "Nocturne",
				base: "nocturne",
				tokens: {}
			},
			{
				value: "daylight",
				label: "Daylight",
				base: "daylight",
				tokens: {}
			},
			{
				value: "midnight",
				label: "Midnight",
				base: "midnight",
				tokens: {}
			}
		];
		ue(() => void l.load(B.value));
		let H = d(() => [...V, ...l.pluginThemes.map((e) => ({
			value: e.id,
			label: e.name,
			base: ne(e.id, l.items),
			tokens: te(e.id, l.items)
		}))]), U = [
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
		}], it = [
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
		], at = [
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
		], ot = [
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
		], st = [
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
		], ct = [
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
		function lt(e) {
			a.defaultSubtitleLang = e === "" ? null : String(e), a.subtitlePreferenceSet = !0;
		}
		function J(e, t) {
			a.captionStyle = {
				...a.captionStyle,
				[e]: t
			};
		}
		let Y = d(() => Math.max(0, H.value.findIndex((e) => e.value === a.theme))), X = d(() => Math.max(0, U.findIndex((e) => e.value === a.accent)));
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
		function ut(e) {
			let t = Z(e, H.value.length, Y.value);
			t !== null && (a.theme = H.value[t].value);
		}
		function dt(e) {
			let t = Z(e, U.length, X.value);
			t !== null && (a.accent = U[t].value);
		}
		let Q = S(!1), $;
		function ft() {
			if (!Q.value) {
				Q.value = !0, clearTimeout($), $ = setTimeout(() => Q.value = !1, 3500);
				return;
			}
			clearTimeout($), Q.value = !1, a.reset(), v.info(z("settings.resetDone"));
		}
		return le(() => clearTimeout($)), (n, r) => e.panel === "appearance" ? (x(), m("div", de, [
			h("section", fe, [h("h3", pe, w(T(z)("settings.theme")), 1), h("div", {
				class: "aps__themes",
				role: "radiogroup",
				"aria-label": T(z)("settings.theme"),
				onKeydown: ut
			}, [(x(!0), m(u, null, C(H.value, (e, n) => (x(), m("button", {
				key: e.value,
				type: "button",
				role: "radio",
				class: y(["aps__theme", { "is-active": T(a).theme === e.value }]),
				"aria-checked": T(a).theme === e.value,
				tabindex: Y.value === n ? 0 : -1,
				"data-theme": e.base,
				style: b(e.tokens),
				onClick: (t) => T(a).theme = e.value
			}, [r[16] ||= h("span", { class: "aps__preview" }, [h("span", { class: "aps__preview-bar" }), h("span", { class: "aps__preview-card" })], -1), h("span", ge, [g(w(e.label) + " ", 1), T(a).theme === e.value ? (x(), f(t, {
				key: 0,
				name: "check",
				class: "aps__theme-check"
			})) : p("", !0)])], 14, he))), 128))], 40, me)]),
			h("section", D, [h("h3", O, w(T(z)("settings.accent")), 1), h("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": T(z)("settings.accentColor"),
				onKeydown: dt
			}, [(x(), m(u, null, C(U, (e, n) => h("button", {
				key: e.label,
				type: "button",
				role: "radio",
				class: y(["aps__accent", { "is-active": T(a).accent === e.value }]),
				"aria-checked": T(a).accent === e.value,
				"aria-label": e.label,
				title: e.label,
				tabindex: X.value === n ? 0 : -1,
				onClick: (t) => T(a).accent = e.value
			}, [h("span", {
				class: "aps__accent-dot",
				style: b({ background: e.swatch })
			}, [T(a).accent === e.value ? (x(), f(t, {
				key: 0,
				name: "check"
			})) : p("", !0)], 4)], 10, A)), 64))], 40, k)]),
			h("section", j, [
				h("h3", M, w(T(z)("settings.display")), 1),
				h("div", N, [h("span", P, w(T(z)("settings.density")), 1), _(c, {
					"model-value": T(a).density,
					options: W,
					label: T(z)("settings.density"),
					"onUpdate:modelValue": r[0] ||= (e) => T(a).density = e
				}, null, 8, ["model-value", "label"])]),
				h("div", F, [h("span", I, w(T(z)("settings.gridDensity")), 1), _(c, {
					"model-value": T(a).gridDensity,
					options: it,
					label: T(z)("settings.gridDensity"),
					"onUpdate:modelValue": r[1] ||= (e) => T(a).gridDensity = e
				}, null, 8, ["model-value", "label"])]),
				h("div", L, [h("span", _e, [g(w(T(z)("settings.cardSize")) + " ", 1), h("span", ve, w(K(T(a).cardSize)), 1)]), h("div", ye, [_(o, {
					"model-value": T(a).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: T(z)("settings.cardSize"),
					"format-value": K,
					"onUpdate:modelValue": r[2] ||= (e) => T(a).cardSize = e
				}, null, 8, ["model-value", "label"])])])
			]),
			h("section", be, [
				h("h3", xe, w(T(z)("settings.atmosphere")), 1),
				h("div", Se, [_(s, {
					"model-value": T(a).atmosphere,
					label: T(z)("settings.filmGrainGlow"),
					"onUpdate:modelValue": r[3] ||= (e) => T(a).atmosphere = e
				}, null, 8, ["model-value", "label"])]),
				h("div", Ce, [_(s, {
					"model-value": T(a).tv,
					label: "TV mode",
					"onUpdate:modelValue": r[4] ||= (e) => T(a).tv = e
				}, null, 8, ["model-value"])]),
				r[17] ||= h("p", { class: "aps__hint" }, "Larger controls and a visible focus outline for TV / remote navigation.", -1),
				h("div", we, [h("span", Te, w(T(z)("settings.motion")), 1), _(c, {
					"model-value": T(a).reducedMotion,
					options: at,
					label: T(z)("settings.motion"),
					"onUpdate:modelValue": r[5] ||= (e) => T(a).reducedMotion = e
				}, null, 8, ["model-value", "label"])])
			]),
			h("div", Ee, [_(ie, {
				variant: "ghost",
				"left-icon": Q.value ? "alert" : "rewind",
				onClick: ft
			}, {
				default: E(() => [g(w(Q.value ? T(z)("settings.resetConfirm") : T(z)("settings.resetAll")), 1)]),
				_: 1
			}, 8, ["left-icon"]), h("span", De, w(Q.value ? T(z)("settings.resetConfirm") : ""), 1)])
		])) : (x(), m("div", Oe, [
			h("section", ke, [
				h("h3", Ae, w(T(z)("settings.playback")), 1),
				h("div", je, [_(s, {
					"model-value": T(a).autoplay,
					label: T(z)("settings.autoplayNext"),
					"onUpdate:modelValue": r[6] ||= (e) => T(a).autoplay = e
				}, null, 8, ["model-value", "label"])]),
				h("div", Me, [h("span", Ne, [g(w(T(z)("settings.defaultVolume")) + " ", 1), h("span", Pe, w(G(T(a).defaultVolume)), 1)]), h("div", Fe, [_(o, {
					"model-value": T(a).defaultVolume,
					min: 0,
					max: 1,
					step: .05,
					label: T(z)("settings.defaultVolume"),
					"format-value": G,
					"onUpdate:modelValue": r[7] ||= (e) => T(a).defaultVolume = e
				}, null, 8, ["model-value", "label"])])]),
				h("div", Ie, [h("span", R, w(T(z)("settings.defaultQuality")), 1), _(c, {
					"model-value": T(a).defaultQuality,
					options: ot,
					label: T(z)("settings.defaultQuality"),
					"onUpdate:modelValue": r[8] ||= (e) => T(a).defaultQuality = String(e)
				}, null, 8, ["model-value", "label"])])
			]),
			h("section", Le, [
				h("h3", Re, w(T(z)("settings.crossfade")), 1),
				h("div", ze, [h("span", Be, [g(w(T(z)("settings.crossfadeDuration")) + " ", 1), h("span", Ve, w(q(T(a).crossfadeDuration)), 1)]), h("div", He, [_(o, {
					"model-value": T(a).crossfadeDuration,
					min: 0,
					max: 12,
					step: 1,
					label: T(z)("settings.crossfadeDuration"),
					"format-value": q,
					"onUpdate:modelValue": r[9] ||= (e) => T(a).crossfadeDuration = e
				}, null, 8, ["model-value", "label"])])]),
				h("div", Ue, [_(s, {
					"model-value": T(a).gaplessEnabled,
					label: T(z)("settings.gaplessEnabled"),
					"onUpdate:modelValue": r[10] ||= (e) => T(a).gaplessEnabled = e
				}, null, 8, ["model-value", "label"])]),
				h("div", We, [h("span", Ge, w(T(z)("settings.preferredAudioQuality")), 1), _(c, {
					"model-value": T(a).preferredAudioQuality,
					options: ct,
					label: T(z)("settings.preferredAudioQuality"),
					"onUpdate:modelValue": r[11] ||= (e) => T(a).preferredAudioQuality = e
				}, null, 8, ["model-value", "label"])])
			]),
			h("section", Ke, [
				h("h3", qe, w(T(z)("settings.subtitles")), 1),
				h("div", Je, [h("span", Ye, w(T(z)("settings.defaultLanguage")), 1), _(c, {
					"model-value": T(a).defaultSubtitleLang ?? "",
					options: st,
					label: T(z)("settings.defaultSubtitleLanguage"),
					"onUpdate:modelValue": lt
				}, null, 8, ["model-value", "label"])]),
				h("div", Xe, [h("span", Ze, w(T(z)("settings.captionSize")), 1), _(c, {
					"model-value": T(a).captionStyle.size,
					options: T(ae),
					label: T(z)("settings.captionSize"),
					"onUpdate:modelValue": r[12] ||= (e) => J("size", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				h("div", Qe, [h("span", $e, w(T(z)("settings.captionColor")), 1), _(c, {
					"model-value": T(a).captionStyle.textColor,
					options: T(oe),
					label: T(z)("settings.captionColor"),
					"onUpdate:modelValue": r[13] ||= (e) => J("textColor", String(e))
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				h("div", et, [h("span", tt, w(T(z)("settings.captionBackground")), 1), _(c, {
					"model-value": T(a).captionStyle.background,
					options: T(ce),
					label: T(z)("settings.captionBackground"),
					"onUpdate:modelValue": r[14] ||= (e) => J("background", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				h("div", nt, [h("span", rt, w(T(z)("settings.captionEdge")), 1), _(c, {
					"model-value": T(a).captionStyle.edge,
					options: T(se),
					label: T(z)("settings.captionEdge"),
					"onUpdate:modelValue": r[15] ||= (e) => J("edge", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		]));
	}
}), [["__scopeId", "data-v-33e2e3c2"]]), B = { class: "settings-page" }, V = { class: "settings-page__head" }, H = { class: "settings-page__eyebrow" }, U = { class: "settings-page__title" }, W = /*#__PURE__*/ e(/* @__PURE__ */ v({
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
				value: "security",
				label: t("settings.tabSecurity"),
				icon: "key"
			}
		], i = S("appearance");
		return (e, r) => (x(), m("div", B, [h("header", V, [h("p", H, w(T(t)("settings.preferences")), 1), h("h1", U, w(T(t)("settings.title")), 1)]), _(l, {
			modelValue: i.value,
			"onUpdate:modelValue": r[0] ||= (e) => i.value = e,
			tabs: n,
			label: T(t)("settings.sectionsLabel")
		}, {
			appearance: E(() => [_(z, { panel: "appearance" })]),
			playback: E(() => [_(z, { panel: "playback" })]),
			security: E(() => [_(a)]),
			_: 1
		}, 8, ["modelValue", "label"])]));
	}
}), [["__scopeId", "data-v-cddf466d"]]);
//#endregion
export { W as default };

//# sourceMappingURL=SettingsPage-y-IdJiYP.js.map