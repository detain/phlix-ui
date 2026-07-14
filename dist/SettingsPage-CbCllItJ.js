import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { a as n } from "./usePreferencesStore-g-d6JBr9.js";
import { t as r } from "./useMessages-QU3qvt7A.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as ee } from "./Button-DGsvHynO.js";
import { t as a } from "./Slider-LnnvB5jy.js";
import { t as o } from "./Switch-DyS2L5gX.js";
import { t as s } from "./Select-Bx8h2mSF.js";
import { t as c } from "./Tabs-D8iKNBl3.js";
import { t as l } from "./SettingsForm-D89Wscu8.js";
import { i as te, n as ne, r as re, t as ie } from "./captions-DoP7ce5A.js";
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
], fe = { class: "aps__theme-label" }, pe = { class: "aps__group" }, me = { class: "aps__title" }, he = ["aria-label"], ge = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], E = { class: "aps__group" }, D = { class: "aps__title" }, O = { class: "aps__row" }, k = {
	class: "aps__label",
	id: "aps-density"
}, A = { class: "aps__row" }, j = { class: "aps__label" }, M = { class: "aps__row" }, N = { class: "aps__label" }, P = { class: "aps__value" }, F = { class: "aps__slider" }, I = { class: "aps__group" }, L = { class: "aps__title" }, _e = { class: "aps__row aps__row--switch" }, ve = { class: "aps__row aps__row--switch" }, ye = { class: "aps__row" }, be = { class: "aps__label" }, xe = { class: "aps__foot" }, Se = {
	class: "visually-hidden",
	role: "status",
	"aria-live": "polite"
}, Ce = {
	key: 1,
	class: "aps"
}, we = { class: "aps__group" }, Te = { class: "aps__title" }, Ee = { class: "aps__row aps__row--switch" }, De = { class: "aps__row" }, Oe = { class: "aps__label" }, ke = { class: "aps__value" }, Ae = { class: "aps__slider" }, je = { class: "aps__row" }, Me = { class: "aps__label" }, Ne = { class: "aps__group" }, Pe = { class: "aps__title" }, Fe = { class: "aps__row" }, Ie = { class: "aps__label" }, Le = { class: "aps__value" }, Re = { class: "aps__slider" }, ze = { class: "aps__row aps__row--switch" }, Be = { class: "aps__row" }, Ve = { class: "aps__label" }, He = { class: "aps__group" }, R = { class: "aps__title" }, Ue = { class: "aps__row" }, We = { class: "aps__label" }, Ge = { class: "aps__row" }, Ke = { class: "aps__label" }, qe = { class: "aps__row" }, Je = { class: "aps__label" }, Ye = { class: "aps__row" }, Xe = { class: "aps__label" }, Ze = { class: "aps__row" }, Qe = { class: "aps__label" }, z = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let c = n(), l = i(), { t: v } = r(), z = [
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
		], $e = [
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
		function nt(e) {
			let t = Z(e, z.length, Y.value);
			t !== null && (c.theme = z[t].value);
		}
		function rt(e) {
			let t = Z(e, B.length, X.value);
			t !== null && (c.accent = B[t].value);
		}
		let Q = x(!1), $;
		function it() {
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
				onKeydown: nt
			}, [(b(), m(u, null, S(z, (e, n) => h("button", {
				key: e.value,
				type: "button",
				role: "radio",
				class: y(["aps__theme", { "is-active": w(c).theme === e.value }]),
				"aria-checked": w(c).theme === e.value,
				tabindex: Y.value === n ? 0 : -1,
				"data-theme": e.value,
				onClick: (t) => w(c).theme = e.value
			}, [r[16] ||= h("span", { class: "aps__preview" }, [h("span", { class: "aps__preview-bar" }), h("span", { class: "aps__preview-card" })], -1), h("span", fe, [g(C(e.label) + " ", 1), w(c).theme === e.value ? (b(), f(t, {
				key: 0,
				name: "check",
				class: "aps__theme-check"
			})) : p("", !0)])], 10, de)), 64))], 40, ue)]),
			h("section", pe, [h("h3", me, C(w(v)("settings.accent")), 1), h("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": w(v)("settings.accentColor"),
				onKeydown: rt
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
			})) : p("", !0)], 4)], 10, ge)), 64))], 40, he)]),
			h("section", E, [
				h("h3", D, C(w(v)("settings.display")), 1),
				h("div", O, [h("span", k, C(w(v)("settings.density")), 1), _(s, {
					"model-value": w(c).density,
					options: V,
					label: w(v)("settings.density"),
					"onUpdate:modelValue": r[0] ||= (e) => w(c).density = e
				}, null, 8, ["model-value", "label"])]),
				h("div", A, [h("span", j, C(w(v)("settings.gridDensity")), 1), _(s, {
					"model-value": w(c).gridDensity,
					options: H,
					label: w(v)("settings.gridDensity"),
					"onUpdate:modelValue": r[1] ||= (e) => w(c).gridDensity = e
				}, null, 8, ["model-value", "label"])]),
				h("div", M, [h("span", N, [g(C(w(v)("settings.cardSize")) + " ", 1), h("span", P, C(K(w(c).cardSize)), 1)]), h("div", F, [_(a, {
					"model-value": w(c).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: w(v)("settings.cardSize"),
					"format-value": K,
					"onUpdate:modelValue": r[2] ||= (e) => w(c).cardSize = e
				}, null, 8, ["model-value", "label"])])])
			]),
			h("section", I, [
				h("h3", L, C(w(v)("settings.atmosphere")), 1),
				h("div", _e, [_(o, {
					"model-value": w(c).atmosphere,
					label: w(v)("settings.filmGrainGlow"),
					"onUpdate:modelValue": r[3] ||= (e) => w(c).atmosphere = e
				}, null, 8, ["model-value", "label"])]),
				h("div", ve, [_(o, {
					"model-value": w(c).tv,
					label: "TV mode",
					"onUpdate:modelValue": r[4] ||= (e) => w(c).tv = e
				}, null, 8, ["model-value"])]),
				r[17] ||= h("p", { class: "aps__hint" }, "Larger controls and a visible focus outline for TV / remote navigation.", -1),
				h("div", ye, [h("span", be, C(w(v)("settings.motion")), 1), _(s, {
					"model-value": w(c).reducedMotion,
					options: U,
					label: w(v)("settings.motion"),
					"onUpdate:modelValue": r[5] ||= (e) => w(c).reducedMotion = e
				}, null, 8, ["model-value", "label"])])
			]),
			h("div", xe, [_(ee, {
				variant: "ghost",
				"left-icon": Q.value ? "alert" : "rewind",
				onClick: it
			}, {
				default: T(() => [g(C(Q.value ? w(v)("settings.resetConfirm") : w(v)("settings.resetAll")), 1)]),
				_: 1
			}, 8, ["left-icon"]), h("span", Se, C(Q.value ? w(v)("settings.resetConfirm") : ""), 1)])
		])) : (b(), m("div", Ce, [
			h("section", we, [
				h("h3", Te, C(w(v)("settings.playback")), 1),
				h("div", Ee, [_(o, {
					"model-value": w(c).autoplay,
					label: w(v)("settings.autoplayNext"),
					"onUpdate:modelValue": r[6] ||= (e) => w(c).autoplay = e
				}, null, 8, ["model-value", "label"])]),
				h("div", De, [h("span", Oe, [g(C(w(v)("settings.defaultVolume")) + " ", 1), h("span", ke, C(G(w(c).defaultVolume)), 1)]), h("div", Ae, [_(a, {
					"model-value": w(c).defaultVolume,
					min: 0,
					max: 1,
					step: .05,
					label: w(v)("settings.defaultVolume"),
					"format-value": G,
					"onUpdate:modelValue": r[7] ||= (e) => w(c).defaultVolume = e
				}, null, 8, ["model-value", "label"])])]),
				h("div", je, [h("span", Me, C(w(v)("settings.defaultQuality")), 1), _(s, {
					"model-value": w(c).defaultQuality,
					options: W,
					label: w(v)("settings.defaultQuality"),
					"onUpdate:modelValue": r[8] ||= (e) => w(c).defaultQuality = String(e)
				}, null, 8, ["model-value", "label"])])
			]),
			h("section", Ne, [
				h("h3", Pe, C(w(v)("settings.crossfade")), 1),
				h("div", Fe, [h("span", Ie, [g(C(w(v)("settings.crossfadeDuration")) + " ", 1), h("span", Le, C(q(w(c).crossfadeDuration)), 1)]), h("div", Re, [_(a, {
					"model-value": w(c).crossfadeDuration,
					min: 0,
					max: 12,
					step: 1,
					label: w(v)("settings.crossfadeDuration"),
					"format-value": q,
					"onUpdate:modelValue": r[9] ||= (e) => w(c).crossfadeDuration = e
				}, null, 8, ["model-value", "label"])])]),
				h("div", ze, [_(o, {
					"model-value": w(c).gaplessEnabled,
					label: w(v)("settings.gaplessEnabled"),
					"onUpdate:modelValue": r[10] ||= (e) => w(c).gaplessEnabled = e
				}, null, 8, ["model-value", "label"])]),
				h("div", Be, [h("span", Ve, C(w(v)("settings.preferredAudioQuality")), 1), _(s, {
					"model-value": w(c).preferredAudioQuality,
					options: et,
					label: w(v)("settings.preferredAudioQuality"),
					"onUpdate:modelValue": r[11] ||= (e) => w(c).preferredAudioQuality = e
				}, null, 8, ["model-value", "label"])])
			]),
			h("section", He, [
				h("h3", R, C(w(v)("settings.subtitles")), 1),
				h("div", Ue, [h("span", We, C(w(v)("settings.defaultLanguage")), 1), _(s, {
					"model-value": w(c).defaultSubtitleLang ?? "",
					options: $e,
					label: w(v)("settings.defaultSubtitleLanguage"),
					"onUpdate:modelValue": tt
				}, null, 8, ["model-value", "label"])]),
				h("div", Ge, [h("span", Ke, C(w(v)("settings.captionSize")), 1), _(s, {
					"model-value": w(c).captionStyle.size,
					options: w(te),
					label: w(v)("settings.captionSize"),
					"onUpdate:modelValue": r[12] ||= (e) => J("size", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				h("div", qe, [h("span", Je, C(w(v)("settings.captionColor")), 1), _(s, {
					"model-value": w(c).captionStyle.textColor,
					options: w(ne),
					label: w(v)("settings.captionColor"),
					"onUpdate:modelValue": r[13] ||= (e) => J("textColor", String(e))
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				h("div", Ye, [h("span", Xe, C(w(v)("settings.captionBackground")), 1), _(s, {
					"model-value": w(c).captionStyle.background,
					options: w(ie),
					label: w(v)("settings.captionBackground"),
					"onUpdate:modelValue": r[14] ||= (e) => J("background", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				h("div", Ze, [h("span", Qe, C(w(v)("settings.captionEdge")), 1), _(s, {
					"model-value": w(c).captionStyle.edge,
					options: w(re),
					label: w(v)("settings.captionEdge"),
					"onUpdate:modelValue": r[15] ||= (e) => J("edge", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		]));
	}
}), [["__scopeId", "data-v-c9d58599"]]), B = { class: "settings-page" }, V = { class: "settings-page__head" }, H = { class: "settings-page__eyebrow" }, U = { class: "settings-page__title" }, W = /*#__PURE__*/ e(/* @__PURE__ */ v({
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
}), [["__scopeId", "data-v-508edbb4"]]);
//#endregion
export { W as default };

//# sourceMappingURL=SettingsPage-CbCllItJ.js.map