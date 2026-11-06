import { t as e } from "./Tabs-DZRiZml3.js";
import { t } from "./Switch-C607L4Vu.js";
import { t as n } from "./Slider-Bj5BaBUu.js";
import { t as r } from "./Select-BAelsVlo.js";
import { t as i } from "./Button-Dfl4y6vO.js";
import { n as a, t as o } from "./Icon-55iG1rR7.js";
import { a as ee } from "./usePreferencesStore-DrDMAwjz.js";
import { C as s, S as te, n as ne, r as c, t as l } from "./SecuritySettingsPage-ChDwCi7L.js";
import { t as re } from "./useToastStore-CxO_ppM8.js";
import { t as u } from "./useMessages-skYe1O45.js";
import { t as ie } from "./useApiBase-DXTBY90j.js";
import { i as ae, n as oe, r as se, t as ce } from "./captions-DV5mDPeu.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, normalizeClass as b, normalizeStyle as x, onBeforeUnmount as le, onMounted as ue, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, withCtx as D } from "vue";
// src/components/AppearanceSettings.vue?vue&type=script&setup=true&lang.ts
var de = {
	key: 0,
	class: "aps"
}, fe = { class: "aps__group" }, pe = { class: "aps__title" }, me = ["aria-label"], he = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], ge = { class: "aps__theme-label" }, O = {
	key: 0,
	class: "aps__hint"
}, k = {
	key: 1,
	class: "aps__hint"
}, A = { class: "aps__group" }, j = { class: "aps__title" }, M = ["aria-label"], N = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], P = { class: "aps__group" }, F = { class: "aps__title" }, I = { class: "aps__row" }, L = {
	class: "aps__label",
	id: "aps-density"
}, _e = { class: "aps__row" }, ve = { class: "aps__label" }, ye = { class: "aps__row" }, be = { class: "aps__label" }, xe = { class: "aps__value" }, Se = { class: "aps__slider" }, Ce = { class: "aps__group" }, we = { class: "aps__title" }, Te = { class: "aps__row aps__row--switch" }, Ee = { class: "aps__row aps__row--switch" }, De = { class: "aps__row" }, Oe = { class: "aps__label" }, ke = { class: "aps__foot" }, Ae = {
	class: "visually-hidden",
	role: "status",
	"aria-live": "polite"
}, je = {
	key: 1,
	class: "aps"
}, Me = { class: "aps__group" }, Ne = { class: "aps__title" }, Pe = { class: "aps__row aps__row--switch" }, Fe = { class: "aps__row" }, Ie = { class: "aps__label" }, Le = { class: "aps__value" }, Re = { class: "aps__slider" }, ze = { class: "aps__row" }, Be = { class: "aps__label" }, Ve = { class: "aps__group" }, He = { class: "aps__title" }, Ue = { class: "aps__row" }, We = { class: "aps__label" }, Ge = { class: "aps__value" }, Ke = { class: "aps__slider" }, qe = { class: "aps__row aps__row--switch" }, Je = { class: "aps__row" }, Ye = { class: "aps__label" }, Xe = { class: "aps__group" }, Ze = { class: "aps__title" }, Qe = { class: "aps__row" }, $e = { class: "aps__label" }, et = { class: "aps__row" }, tt = { class: "aps__label" }, nt = { class: "aps__row" }, rt = { class: "aps__label" }, it = { class: "aps__row" }, at = { class: "aps__label" }, ot = { class: "aps__row" }, st = { class: "aps__label" }, R = /*#__PURE__*/ a(/* @__PURE__ */ y({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let a = ee(), l = c(), y = ne(), R = re(), { t: z } = u(), B = ie(), V = [
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
		ue(() => void l.load(B.value, !0));
		let H = f(() => [...V, ...l.pluginThemes.map((e) => ({
			value: e.id,
			label: e.name,
			base: te(e.id, l.items),
			tokens: s(e.id, l.items)
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
		], ct = [{
			value: "comfortable",
			label: "Comfortable"
		}, {
			value: "compact",
			label: "Compact"
		}], lt = [
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
		], ut = [
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
		], dt = [
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
		], ft = [
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
		], pt = [
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
		], W = (e) => `${Math.round(e * 100)}%`, G = (e) => `${e}px`, K = (e) => `${e}s`;
		function mt(e) {
			a.defaultSubtitleLang = e === "" ? null : String(e), a.subtitlePreferenceSet = !0;
		}
		function q(e, t) {
			a.captionStyle = {
				...a.captionStyle,
				[e]: t
			};
		}
		let J = f(() => Math.max(0, H.value.findIndex((e) => e.value === a.theme))), Y = f(() => Math.max(0, U.findIndex((e) => e.value === a.accent)));
		function X(e, t, n) {
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
		function Z(e) {
			a.theme = e, y.queuePut(B.value, e);
		}
		function ht(e) {
			let t = X(e, H.value.length, J.value);
			t !== null && Z(H.value[t].value);
		}
		function gt(e) {
			let t = X(e, U.length, Y.value);
			t !== null && (a.accent = U[t].value);
		}
		let Q = C(!1), $;
		function _t() {
			Q.value ? (clearTimeout($), Q.value = !1, a.reset(), R.info(z("settings.resetDone"))) : (Q.value = !0, clearTimeout($), $ = setTimeout(() => Q.value = !1, 3500));
		}
		return le(() => clearTimeout($)), (ee, s) => e.panel === "appearance" ? (S(), h("div", de, [
			g("section", fe, [
				g("h3", pe, T(E(z)("settings.theme")), 1),
				g("div", {
					class: "aps__themes",
					role: "radiogroup",
					"aria-label": E(z)("settings.theme"),
					onKeydown: ht
				}, [(S(!0), h(d, null, w(H.value, (e, t) => (S(), h("button", {
					key: e.value,
					type: "button",
					role: "radio",
					class: b(["aps__theme", { "is-active": E(a).theme === e.value }]),
					"aria-checked": E(a).theme === e.value,
					tabindex: J.value === t ? 0 : -1,
					"data-theme": e.base,
					style: x(e.tokens),
					onClick: (t) => Z(e.value)
				}, [s[16] ||= g("span", { class: "aps__preview" }, [g("span", { class: "aps__preview-bar" }), g("span", { class: "aps__preview-card" })], -1), g("span", ge, [_(T(e.label) + " ", 1), E(a).theme === e.value ? (S(), p(o, {
					key: 0,
					name: "check",
					class: "aps__theme-check"
				})) : m("", !0)])], 14, he))), 128))], 40, me),
				E(l).error ? (S(), h("p", O, T(E(z)("settings.themeCatalogueUnavailable")), 1)) : m("", !0),
				E(y).putFailed ? (S(), h("p", k, T(E(z)("settings.themeSavedLocally")), 1)) : m("", !0)
			]),
			g("section", A, [g("h3", j, T(E(z)("settings.accent")), 1), g("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": E(z)("settings.accentColor"),
				onKeydown: gt
			}, [(S(), h(d, null, w(U, (e, t) => g("button", {
				key: e.label,
				type: "button",
				role: "radio",
				class: b(["aps__accent", { "is-active": E(a).accent === e.value }]),
				"aria-checked": E(a).accent === e.value,
				"aria-label": e.label,
				title: e.label,
				tabindex: Y.value === t ? 0 : -1,
				onClick: (t) => E(a).accent = e.value
			}, [g("span", {
				class: "aps__accent-dot",
				style: x({ background: e.swatch })
			}, [E(a).accent === e.value ? (S(), p(o, {
				key: 0,
				name: "check"
			})) : m("", !0)], 4)], 10, N)), 64))], 40, M)]),
			g("section", P, [
				g("h3", F, T(E(z)("settings.display")), 1),
				g("div", I, [g("span", L, T(E(z)("settings.density")), 1), v(r, {
					"model-value": E(a).density,
					options: ct,
					label: E(z)("settings.density"),
					"onUpdate:modelValue": s[0] ||= (e) => E(a).density = e
				}, null, 8, ["model-value", "label"])]),
				g("div", _e, [g("span", ve, T(E(z)("settings.gridDensity")), 1), v(r, {
					"model-value": E(a).gridDensity,
					options: lt,
					label: E(z)("settings.gridDensity"),
					"onUpdate:modelValue": s[1] ||= (e) => E(a).gridDensity = e
				}, null, 8, ["model-value", "label"])]),
				g("div", ye, [g("span", be, [_(T(E(z)("settings.cardSize")) + " ", 1), g("span", xe, T(G(E(a).cardSize)), 1)]), g("div", Se, [v(n, {
					"model-value": E(a).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: E(z)("settings.cardSize"),
					"format-value": G,
					"onUpdate:modelValue": s[2] ||= (e) => E(a).cardSize = e
				}, null, 8, ["model-value", "label"])])])
			]),
			g("section", Ce, [
				g("h3", we, T(E(z)("settings.atmosphere")), 1),
				g("div", Te, [v(t, {
					"model-value": E(a).atmosphere,
					label: E(z)("settings.filmGrainGlow"),
					"onUpdate:modelValue": s[3] ||= (e) => E(a).atmosphere = e
				}, null, 8, ["model-value", "label"])]),
				g("div", Ee, [v(t, {
					"model-value": E(a).tv,
					label: "TV mode",
					"onUpdate:modelValue": s[4] ||= (e) => E(a).tv = e
				}, null, 8, ["model-value"])]),
				s[17] ||= g("p", { class: "aps__hint" }, "Larger controls and a visible focus outline for TV / remote navigation.", -1),
				g("div", De, [g("span", Oe, T(E(z)("settings.motion")), 1), v(r, {
					"model-value": E(a).reducedMotion,
					options: ut,
					label: E(z)("settings.motion"),
					"onUpdate:modelValue": s[5] ||= (e) => E(a).reducedMotion = e
				}, null, 8, ["model-value", "label"])])
			]),
			g("div", ke, [v(i, {
				variant: "ghost",
				"left-icon": Q.value ? "alert" : "rewind",
				onClick: _t
			}, {
				default: D(() => [_(T(Q.value ? E(z)("settings.resetConfirm") : E(z)("settings.resetAll")), 1)]),
				_: 1
			}, 8, ["left-icon"]), g("span", Ae, T(Q.value ? E(z)("settings.resetConfirm") : ""), 1)])
		])) : (S(), h("div", je, [
			g("section", Me, [
				g("h3", Ne, T(E(z)("settings.playback")), 1),
				g("div", Pe, [v(t, {
					"model-value": E(a).autoplay,
					label: E(z)("settings.autoplayNext"),
					"onUpdate:modelValue": s[6] ||= (e) => E(a).autoplay = e
				}, null, 8, ["model-value", "label"])]),
				g("div", Fe, [g("span", Ie, [_(T(E(z)("settings.defaultVolume")) + " ", 1), g("span", Le, T(W(E(a).defaultVolume)), 1)]), g("div", Re, [v(n, {
					"model-value": E(a).defaultVolume,
					min: 0,
					max: 1,
					step: .05,
					label: E(z)("settings.defaultVolume"),
					"format-value": W,
					"onUpdate:modelValue": s[7] ||= (e) => E(a).defaultVolume = e
				}, null, 8, ["model-value", "label"])])]),
				g("div", ze, [g("span", Be, T(E(z)("settings.defaultQuality")), 1), v(r, {
					"model-value": E(a).defaultQuality,
					options: dt,
					label: E(z)("settings.defaultQuality"),
					"onUpdate:modelValue": s[8] ||= (e) => E(a).defaultQuality = String(e)
				}, null, 8, ["model-value", "label"])])
			]),
			g("section", Ve, [
				g("h3", He, T(E(z)("settings.crossfade")), 1),
				g("div", Ue, [g("span", We, [_(T(E(z)("settings.crossfadeDuration")) + " ", 1), g("span", Ge, T(K(E(a).crossfadeDuration)), 1)]), g("div", Ke, [v(n, {
					"model-value": E(a).crossfadeDuration,
					min: 0,
					max: 12,
					step: 1,
					label: E(z)("settings.crossfadeDuration"),
					"format-value": K,
					"onUpdate:modelValue": s[9] ||= (e) => E(a).crossfadeDuration = e
				}, null, 8, ["model-value", "label"])])]),
				g("div", qe, [v(t, {
					"model-value": E(a).gaplessEnabled,
					label: E(z)("settings.gaplessEnabled"),
					"onUpdate:modelValue": s[10] ||= (e) => E(a).gaplessEnabled = e
				}, null, 8, ["model-value", "label"])]),
				g("div", Je, [g("span", Ye, T(E(z)("settings.preferredAudioQuality")), 1), v(r, {
					"model-value": E(a).preferredAudioQuality,
					options: pt,
					label: E(z)("settings.preferredAudioQuality"),
					"onUpdate:modelValue": s[11] ||= (e) => E(a).preferredAudioQuality = e
				}, null, 8, ["model-value", "label"])])
			]),
			g("section", Xe, [
				g("h3", Ze, T(E(z)("settings.subtitles")), 1),
				g("div", Qe, [g("span", $e, T(E(z)("settings.defaultLanguage")), 1), v(r, {
					"model-value": E(a).defaultSubtitleLang ?? "",
					options: ft,
					label: E(z)("settings.defaultSubtitleLanguage"),
					"onUpdate:modelValue": mt
				}, null, 8, ["model-value", "label"])]),
				g("div", et, [g("span", tt, T(E(z)("settings.captionSize")), 1), v(r, {
					"model-value": E(a).captionStyle.size,
					options: E(ae),
					label: E(z)("settings.captionSize"),
					"onUpdate:modelValue": s[12] ||= (e) => q("size", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				g("div", nt, [g("span", rt, T(E(z)("settings.captionColor")), 1), v(r, {
					"model-value": E(a).captionStyle.textColor,
					options: E(oe),
					label: E(z)("settings.captionColor"),
					"onUpdate:modelValue": s[13] ||= (e) => q("textColor", String(e))
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				g("div", it, [g("span", at, T(E(z)("settings.captionBackground")), 1), v(r, {
					"model-value": E(a).captionStyle.background,
					options: E(ce),
					label: E(z)("settings.captionBackground"),
					"onUpdate:modelValue": s[14] ||= (e) => q("background", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				g("div", ot, [g("span", st, T(E(z)("settings.captionEdge")), 1), v(r, {
					"model-value": E(a).captionStyle.edge,
					options: E(se),
					label: E(z)("settings.captionEdge"),
					"onUpdate:modelValue": s[15] ||= (e) => q("edge", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		]));
	}
}), [["__scopeId", "data-v-24c79770"]]), z = { class: "settings-page" }, B = { class: "settings-page__head" }, V = { class: "settings-page__eyebrow" }, H = { class: "settings-page__title" }, U = /*#__PURE__*/ a(/* @__PURE__ */ y({
	__name: "SettingsPage",
	setup(t) {
		let { t: n } = u(), r = [
			{
				value: "appearance",
				label: n("settings.tabAppearance"),
				icon: "sun"
			},
			{
				value: "playback",
				label: n("settings.tabPlayback"),
				icon: "play"
			},
			{
				value: "security",
				label: n("settings.tabSecurity"),
				icon: "key"
			}
		], i = C("appearance");
		return (t, a) => (S(), h("div", z, [g("header", B, [g("p", V, T(E(n)("settings.preferences")), 1), g("h1", H, T(E(n)("settings.title")), 1)]), v(e, {
			modelValue: i.value,
			"onUpdate:modelValue": a[0] ||= (e) => i.value = e,
			tabs: r,
			label: E(n)("settings.sectionsLabel")
		}, {
			appearance: D(() => [v(R, { panel: "appearance" })]),
			playback: D(() => [v(R, { panel: "playback" })]),
			security: D(() => [v(l)]),
			_: 1
		}, 8, ["modelValue", "label"])]));
	}
}), [["__scopeId", "data-v-cddf466d"]]);
export { U as default };

//# sourceMappingURL=SettingsPage-CqCrXzeU.js.map