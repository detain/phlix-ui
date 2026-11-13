import { t as e } from "./Tabs-DZRiZml3.js";
import { t } from "./Switch-C607L4Vu.js";
import { t as n } from "./Slider-Bj5BaBUu.js";
import { t as r } from "./Select-CtieJ2Ym.js";
import { t as i } from "./Button-Dfl4y6vO.js";
import { n as a, t as o } from "./Icon-55iG1rR7.js";
import { a as ee } from "./usePreferencesStore-DrDMAwjz.js";
import { C as s, i as te, n as c, r as ne, t as l, w as re } from "./DeviceSessionsPage-Bihsg5Nm.js";
import { t as ie } from "./useToastStore-CxO_ppM8.js";
import { t as u } from "./useMessages-B96K7XS0.js";
import { t as ae } from "./useApiBase-DXTBY90j.js";
import { i as oe, n as se, r as ce, t as le } from "./captions-DV5mDPeu.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, normalizeClass as b, normalizeStyle as x, onBeforeUnmount as ue, onMounted as de, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, withCtx as D } from "vue";
// src/components/AppearanceSettings.vue?vue&type=script&setup=true&lang.ts
var fe = {
	key: 0,
	class: "aps"
}, pe = { class: "aps__group" }, me = { class: "aps__title" }, he = ["aria-label"], ge = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], _e = { class: "aps__theme-label" }, O = {
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
], P = { class: "aps__group" }, F = { class: "aps__title" }, I = { class: "aps__row" }, ve = {
	class: "aps__label",
	id: "aps-density"
}, ye = { class: "aps__row" }, be = { class: "aps__label" }, xe = { class: "aps__row" }, Se = { class: "aps__label" }, Ce = { class: "aps__value" }, we = { class: "aps__slider" }, Te = { class: "aps__group" }, Ee = { class: "aps__title" }, De = { class: "aps__row aps__row--switch" }, Oe = { class: "aps__row aps__row--switch" }, ke = { class: "aps__row" }, Ae = { class: "aps__label" }, je = { class: "aps__foot" }, Me = {
	class: "visually-hidden",
	role: "status",
	"aria-live": "polite"
}, Ne = {
	key: 1,
	class: "aps"
}, Pe = { class: "aps__group" }, Fe = { class: "aps__title" }, Ie = { class: "aps__row aps__row--switch" }, Le = { class: "aps__row" }, Re = { class: "aps__label" }, ze = { class: "aps__value" }, Be = { class: "aps__slider" }, Ve = { class: "aps__row" }, He = { class: "aps__label" }, L = { class: "aps__group" }, Ue = { class: "aps__title" }, We = { class: "aps__row" }, Ge = { class: "aps__label" }, Ke = { class: "aps__value" }, qe = { class: "aps__slider" }, Je = { class: "aps__row aps__row--switch" }, Ye = { class: "aps__row" }, Xe = { class: "aps__label" }, Ze = { class: "aps__group" }, Qe = { class: "aps__title" }, $e = { class: "aps__row" }, et = { class: "aps__label" }, tt = { class: "aps__row" }, nt = { class: "aps__label" }, rt = { class: "aps__row" }, it = { class: "aps__label" }, at = { class: "aps__row" }, ot = { class: "aps__label" }, st = { class: "aps__row" }, ct = { class: "aps__label" }, R = /*#__PURE__*/ a(/* @__PURE__ */ y({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let a = ee(), c = te(), l = ne(), y = ie(), { t: R } = u(), z = ae(), B = [
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
		de(() => void c.load(z.value, !0));
		let V = f(() => [...B, ...c.pluginThemes.map((e) => ({
			value: e.id,
			label: e.name,
			base: s(e.id, c.items),
			tokens: re(e.id, c.items)
		}))]), H = [
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
		], U = [{
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
		let J = f(() => Math.max(0, V.value.findIndex((e) => e.value === a.theme))), Y = f(() => Math.max(0, H.findIndex((e) => e.value === a.accent)));
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
			a.theme = e, l.queuePut(z.value, e);
		}
		function ht(e) {
			let t = X(e, V.value.length, J.value);
			t !== null && Z(V.value[t].value);
		}
		function gt(e) {
			let t = X(e, H.length, Y.value);
			t !== null && (a.accent = H[t].value);
		}
		let Q = C(!1), $;
		function _t() {
			Q.value ? (clearTimeout($), Q.value = !1, a.reset(), y.info(R("settings.resetDone"))) : (Q.value = !0, clearTimeout($), $ = setTimeout(() => Q.value = !1, 3500));
		}
		return ue(() => clearTimeout($)), (ee, s) => e.panel === "appearance" ? (S(), h("div", fe, [
			g("section", pe, [
				g("h3", me, T(E(R)("settings.theme")), 1),
				g("div", {
					class: "aps__themes",
					role: "radiogroup",
					"aria-label": E(R)("settings.theme"),
					onKeydown: ht
				}, [(S(!0), h(d, null, w(V.value, (e, t) => (S(), h("button", {
					key: e.value,
					type: "button",
					role: "radio",
					class: b(["aps__theme", { "is-active": E(a).theme === e.value }]),
					"aria-checked": E(a).theme === e.value,
					tabindex: J.value === t ? 0 : -1,
					"data-theme": e.base,
					style: x(e.tokens),
					onClick: (t) => Z(e.value)
				}, [s[16] ||= g("span", { class: "aps__preview" }, [g("span", { class: "aps__preview-bar" }), g("span", { class: "aps__preview-card" })], -1), g("span", _e, [_(T(e.label) + " ", 1), E(a).theme === e.value ? (S(), p(o, {
					key: 0,
					name: "check",
					class: "aps__theme-check"
				})) : m("", !0)])], 14, ge))), 128))], 40, he),
				E(c).error ? (S(), h("p", O, T(E(R)("settings.themeCatalogueUnavailable")), 1)) : m("", !0),
				E(l).putFailed ? (S(), h("p", k, T(E(R)("settings.themeSavedLocally")), 1)) : m("", !0)
			]),
			g("section", A, [g("h3", j, T(E(R)("settings.accent")), 1), g("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": E(R)("settings.accentColor"),
				onKeydown: gt
			}, [(S(), h(d, null, w(H, (e, t) => g("button", {
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
				g("h3", F, T(E(R)("settings.display")), 1),
				g("div", I, [g("span", ve, T(E(R)("settings.density")), 1), v(r, {
					"model-value": E(a).density,
					options: U,
					label: E(R)("settings.density"),
					"onUpdate:modelValue": s[0] ||= (e) => E(a).density = e
				}, null, 8, ["model-value", "label"])]),
				g("div", ye, [g("span", be, T(E(R)("settings.gridDensity")), 1), v(r, {
					"model-value": E(a).gridDensity,
					options: lt,
					label: E(R)("settings.gridDensity"),
					"onUpdate:modelValue": s[1] ||= (e) => E(a).gridDensity = e
				}, null, 8, ["model-value", "label"])]),
				g("div", xe, [g("span", Se, [_(T(E(R)("settings.cardSize")) + " ", 1), g("span", Ce, T(G(E(a).cardSize)), 1)]), g("div", we, [v(n, {
					"model-value": E(a).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: E(R)("settings.cardSize"),
					"format-value": G,
					"onUpdate:modelValue": s[2] ||= (e) => E(a).cardSize = e
				}, null, 8, ["model-value", "label"])])])
			]),
			g("section", Te, [
				g("h3", Ee, T(E(R)("settings.atmosphere")), 1),
				g("div", De, [v(t, {
					"model-value": E(a).atmosphere,
					label: E(R)("settings.filmGrainGlow"),
					"onUpdate:modelValue": s[3] ||= (e) => E(a).atmosphere = e
				}, null, 8, ["model-value", "label"])]),
				g("div", Oe, [v(t, {
					"model-value": E(a).tv,
					label: "TV mode",
					"onUpdate:modelValue": s[4] ||= (e) => E(a).tv = e
				}, null, 8, ["model-value"])]),
				s[17] ||= g("p", { class: "aps__hint" }, "Larger controls and a visible focus outline for TV / remote navigation.", -1),
				g("div", ke, [g("span", Ae, T(E(R)("settings.motion")), 1), v(r, {
					"model-value": E(a).reducedMotion,
					options: ut,
					label: E(R)("settings.motion"),
					"onUpdate:modelValue": s[5] ||= (e) => E(a).reducedMotion = e
				}, null, 8, ["model-value", "label"])])
			]),
			g("div", je, [v(i, {
				variant: "ghost",
				"left-icon": Q.value ? "alert" : "rewind",
				onClick: _t
			}, {
				default: D(() => [_(T(Q.value ? E(R)("settings.resetConfirm") : E(R)("settings.resetAll")), 1)]),
				_: 1
			}, 8, ["left-icon"]), g("span", Me, T(Q.value ? E(R)("settings.resetConfirm") : ""), 1)])
		])) : (S(), h("div", Ne, [
			g("section", Pe, [
				g("h3", Fe, T(E(R)("settings.playback")), 1),
				g("div", Ie, [v(t, {
					"model-value": E(a).autoplay,
					label: E(R)("settings.autoplayNext"),
					"onUpdate:modelValue": s[6] ||= (e) => E(a).autoplay = e
				}, null, 8, ["model-value", "label"])]),
				g("div", Le, [g("span", Re, [_(T(E(R)("settings.defaultVolume")) + " ", 1), g("span", ze, T(W(E(a).defaultVolume)), 1)]), g("div", Be, [v(n, {
					"model-value": E(a).defaultVolume,
					min: 0,
					max: 1,
					step: .05,
					label: E(R)("settings.defaultVolume"),
					"format-value": W,
					"onUpdate:modelValue": s[7] ||= (e) => E(a).defaultVolume = e
				}, null, 8, ["model-value", "label"])])]),
				g("div", Ve, [g("span", He, T(E(R)("settings.defaultQuality")), 1), v(r, {
					"model-value": E(a).defaultQuality,
					options: dt,
					label: E(R)("settings.defaultQuality"),
					"onUpdate:modelValue": s[8] ||= (e) => E(a).defaultQuality = String(e)
				}, null, 8, ["model-value", "label"])])
			]),
			g("section", L, [
				g("h3", Ue, T(E(R)("settings.crossfade")), 1),
				g("div", We, [g("span", Ge, [_(T(E(R)("settings.crossfadeDuration")) + " ", 1), g("span", Ke, T(K(E(a).crossfadeDuration)), 1)]), g("div", qe, [v(n, {
					"model-value": E(a).crossfadeDuration,
					min: 0,
					max: 12,
					step: 1,
					label: E(R)("settings.crossfadeDuration"),
					"format-value": K,
					"onUpdate:modelValue": s[9] ||= (e) => E(a).crossfadeDuration = e
				}, null, 8, ["model-value", "label"])])]),
				g("div", Je, [v(t, {
					"model-value": E(a).gaplessEnabled,
					label: E(R)("settings.gaplessEnabled"),
					"onUpdate:modelValue": s[10] ||= (e) => E(a).gaplessEnabled = e
				}, null, 8, ["model-value", "label"])]),
				g("div", Ye, [g("span", Xe, T(E(R)("settings.preferredAudioQuality")), 1), v(r, {
					"model-value": E(a).preferredAudioQuality,
					options: pt,
					label: E(R)("settings.preferredAudioQuality"),
					"onUpdate:modelValue": s[11] ||= (e) => E(a).preferredAudioQuality = e
				}, null, 8, ["model-value", "label"])])
			]),
			g("section", Ze, [
				g("h3", Qe, T(E(R)("settings.subtitles")), 1),
				g("div", $e, [g("span", et, T(E(R)("settings.defaultLanguage")), 1), v(r, {
					"model-value": E(a).defaultSubtitleLang ?? "",
					options: ft,
					label: E(R)("settings.defaultSubtitleLanguage"),
					"onUpdate:modelValue": mt
				}, null, 8, ["model-value", "label"])]),
				g("div", tt, [g("span", nt, T(E(R)("settings.captionSize")), 1), v(r, {
					"model-value": E(a).captionStyle.size,
					options: E(oe),
					label: E(R)("settings.captionSize"),
					"onUpdate:modelValue": s[12] ||= (e) => q("size", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				g("div", rt, [g("span", it, T(E(R)("settings.captionColor")), 1), v(r, {
					"model-value": E(a).captionStyle.textColor,
					options: E(se),
					label: E(R)("settings.captionColor"),
					"onUpdate:modelValue": s[13] ||= (e) => q("textColor", String(e))
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				g("div", at, [g("span", ot, T(E(R)("settings.captionBackground")), 1), v(r, {
					"model-value": E(a).captionStyle.background,
					options: E(le),
					label: E(R)("settings.captionBackground"),
					"onUpdate:modelValue": s[14] ||= (e) => q("background", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				g("div", st, [g("span", ct, T(E(R)("settings.captionEdge")), 1), v(r, {
					"model-value": E(a).captionStyle.edge,
					options: E(ce),
					label: E(R)("settings.captionEdge"),
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
			},
			{
				value: "sessions",
				label: n("settings.tabSessions"),
				icon: "monitor"
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
			security: D(() => [v(c)]),
			sessions: D(() => [v(l)]),
			_: 1
		}, 8, ["modelValue", "label"])]));
	}
}), [["__scopeId", "data-v-29c294b5"]]);
export { U as default };

//# sourceMappingURL=SettingsPage-CEmaz2dP.js.map