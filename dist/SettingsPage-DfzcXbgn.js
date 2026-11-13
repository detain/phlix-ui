import { t as e } from "./Tabs-DZRiZml3.js";
import { t } from "./Switch-C607L4Vu.js";
import { t as n } from "./Slider-Bj5BaBUu.js";
import { t as r } from "./Select-BGqFb9UH.js";
import { t as i } from "./Button-Dfl4y6vO.js";
import { n as a, t as o } from "./Icon-55iG1rR7.js";
import { a as s } from "./usePreferencesStore-DrDMAwjz.js";
import { C as c, i as ee, n as l, r as te, t as u, w as ne } from "./DeviceSessionsPage-xPiIOEgy.js";
import { t as re } from "./useToastStore-CxO_ppM8.js";
import { t as d } from "./useMessages-DA8YXaVD.js";
import { t as ie } from "./useApiBase-DXTBY90j.js";
import { i as ae, n as oe, r as se, t as ce } from "./captions-DV5mDPeu.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, normalizeClass as x, normalizeStyle as S, onBeforeUnmount as le, onMounted as ue, openBlock as C, ref as w, renderList as T, toDisplayString as E, unref as D, watch as O, withCtx as k } from "vue";
import { useRoute as A, useRouter as j } from "vue-router";
// src/components/AppearanceSettings.vue?vue&type=script&setup=true&lang.ts
var de = {
	key: 0,
	class: "aps"
}, fe = { class: "aps__group" }, pe = { class: "aps__title" }, me = ["aria-label"], he = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], ge = { class: "aps__theme-label" }, _e = {
	key: 0,
	class: "aps__hint"
}, M = {
	key: 1,
	class: "aps__hint"
}, N = { class: "aps__group" }, P = { class: "aps__title" }, F = ["aria-label"], I = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], ve = { class: "aps__group" }, ye = { class: "aps__title" }, be = { class: "aps__row" }, xe = {
	class: "aps__label",
	id: "aps-density"
}, Se = { class: "aps__row" }, Ce = { class: "aps__label" }, we = { class: "aps__row" }, Te = { class: "aps__label" }, Ee = { class: "aps__value" }, De = { class: "aps__slider" }, Oe = { class: "aps__group" }, ke = { class: "aps__title" }, Ae = { class: "aps__row aps__row--switch" }, je = { class: "aps__row aps__row--switch" }, Me = { class: "aps__row" }, Ne = { class: "aps__label" }, Pe = { class: "aps__foot" }, Fe = {
	class: "visually-hidden",
	role: "status",
	"aria-live": "polite"
}, Ie = {
	key: 1,
	class: "aps"
}, Le = { class: "aps__group" }, Re = { class: "aps__title" }, ze = { class: "aps__row aps__row--switch" }, Be = { class: "aps__row" }, Ve = { class: "aps__label" }, He = { class: "aps__value" }, Ue = { class: "aps__slider" }, We = { class: "aps__row" }, L = { class: "aps__label" }, Ge = { class: "aps__group" }, Ke = { class: "aps__title" }, qe = { class: "aps__row" }, Je = { class: "aps__label" }, Ye = { class: "aps__value" }, Xe = { class: "aps__slider" }, Ze = { class: "aps__row aps__row--switch" }, Qe = { class: "aps__row" }, $e = { class: "aps__label" }, et = { class: "aps__group" }, tt = { class: "aps__title" }, nt = { class: "aps__row" }, rt = { class: "aps__label" }, it = { class: "aps__row" }, at = { class: "aps__label" }, ot = { class: "aps__row" }, st = { class: "aps__label" }, ct = { class: "aps__row" }, lt = { class: "aps__label" }, ut = { class: "aps__row" }, dt = { class: "aps__label" }, R = /*#__PURE__*/ a(/* @__PURE__ */ b({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let a = s(), l = ee(), u = te(), b = re(), { t: O } = d(), A = ie(), j = [
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
		ue(() => void l.load(A.value, !0));
		let R = p(() => [...j, ...l.pluginThemes.map((e) => ({
			value: e.id,
			label: e.name,
			base: c(e.id, l.items),
			tokens: ne(e.id, l.items)
		}))]), z = [
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
		let J = p(() => Math.max(0, R.value.findIndex((e) => e.value === a.theme))), Y = p(() => Math.max(0, z.findIndex((e) => e.value === a.accent)));
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
			a.theme = e, u.queuePut(A.value, e);
		}
		function ht(e) {
			let t = X(e, R.value.length, J.value);
			t !== null && Z(R.value[t].value);
		}
		function gt(e) {
			let t = X(e, z.length, Y.value);
			t !== null && (a.accent = z[t].value);
		}
		let Q = w(!1), $;
		function _t() {
			Q.value ? (clearTimeout($), Q.value = !1, a.reset(), b.info(O("settings.resetDone"))) : (Q.value = !0, clearTimeout($), $ = setTimeout(() => Q.value = !1, 3500));
		}
		return le(() => clearTimeout($)), (s, c) => e.panel === "appearance" ? (C(), g("div", de, [
			_("section", fe, [
				_("h3", pe, E(D(O)("settings.theme")), 1),
				_("div", {
					class: "aps__themes",
					role: "radiogroup",
					"aria-label": D(O)("settings.theme"),
					onKeydown: ht
				}, [(C(!0), g(f, null, T(R.value, (e, t) => (C(), g("button", {
					key: e.value,
					type: "button",
					role: "radio",
					class: x(["aps__theme", { "is-active": D(a).theme === e.value }]),
					"aria-checked": D(a).theme === e.value,
					tabindex: J.value === t ? 0 : -1,
					"data-theme": e.base,
					style: S(e.tokens),
					onClick: (t) => Z(e.value)
				}, [c[16] ||= _("span", { class: "aps__preview" }, [_("span", { class: "aps__preview-bar" }), _("span", { class: "aps__preview-card" })], -1), _("span", ge, [v(E(e.label) + " ", 1), D(a).theme === e.value ? (C(), m(o, {
					key: 0,
					name: "check",
					class: "aps__theme-check"
				})) : h("", !0)])], 14, he))), 128))], 40, me),
				D(l).error ? (C(), g("p", _e, E(D(O)("settings.themeCatalogueUnavailable")), 1)) : h("", !0),
				D(u).putFailed ? (C(), g("p", M, E(D(O)("settings.themeSavedLocally")), 1)) : h("", !0)
			]),
			_("section", N, [_("h3", P, E(D(O)("settings.accent")), 1), _("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": D(O)("settings.accentColor"),
				onKeydown: gt
			}, [(C(), g(f, null, T(z, (e, t) => _("button", {
				key: e.label,
				type: "button",
				role: "radio",
				class: x(["aps__accent", { "is-active": D(a).accent === e.value }]),
				"aria-checked": D(a).accent === e.value,
				"aria-label": e.label,
				title: e.label,
				tabindex: Y.value === t ? 0 : -1,
				onClick: (t) => D(a).accent = e.value
			}, [_("span", {
				class: "aps__accent-dot",
				style: S({ background: e.swatch })
			}, [D(a).accent === e.value ? (C(), m(o, {
				key: 0,
				name: "check"
			})) : h("", !0)], 4)], 10, I)), 64))], 40, F)]),
			_("section", ve, [
				_("h3", ye, E(D(O)("settings.display")), 1),
				_("div", be, [_("span", xe, E(D(O)("settings.density")), 1), y(r, {
					"model-value": D(a).density,
					options: B,
					label: D(O)("settings.density"),
					"onUpdate:modelValue": c[0] ||= (e) => D(a).density = e
				}, null, 8, ["model-value", "label"])]),
				_("div", Se, [_("span", Ce, E(D(O)("settings.gridDensity")), 1), y(r, {
					"model-value": D(a).gridDensity,
					options: V,
					label: D(O)("settings.gridDensity"),
					"onUpdate:modelValue": c[1] ||= (e) => D(a).gridDensity = e
				}, null, 8, ["model-value", "label"])]),
				_("div", we, [_("span", Te, [v(E(D(O)("settings.cardSize")) + " ", 1), _("span", Ee, E(G(D(a).cardSize)), 1)]), _("div", De, [y(n, {
					"model-value": D(a).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: D(O)("settings.cardSize"),
					"format-value": G,
					"onUpdate:modelValue": c[2] ||= (e) => D(a).cardSize = e
				}, null, 8, ["model-value", "label"])])])
			]),
			_("section", Oe, [
				_("h3", ke, E(D(O)("settings.atmosphere")), 1),
				_("div", Ae, [y(t, {
					"model-value": D(a).atmosphere,
					label: D(O)("settings.filmGrainGlow"),
					"onUpdate:modelValue": c[3] ||= (e) => D(a).atmosphere = e
				}, null, 8, ["model-value", "label"])]),
				_("div", je, [y(t, {
					"model-value": D(a).tv,
					label: "TV mode",
					"onUpdate:modelValue": c[4] ||= (e) => D(a).tv = e
				}, null, 8, ["model-value"])]),
				c[17] ||= _("p", { class: "aps__hint" }, "Larger controls and a visible focus outline for TV / remote navigation.", -1),
				_("div", Me, [_("span", Ne, E(D(O)("settings.motion")), 1), y(r, {
					"model-value": D(a).reducedMotion,
					options: H,
					label: D(O)("settings.motion"),
					"onUpdate:modelValue": c[5] ||= (e) => D(a).reducedMotion = e
				}, null, 8, ["model-value", "label"])])
			]),
			_("div", Pe, [y(i, {
				variant: "ghost",
				"left-icon": Q.value ? "alert" : "rewind",
				onClick: _t
			}, {
				default: k(() => [v(E(Q.value ? D(O)("settings.resetConfirm") : D(O)("settings.resetAll")), 1)]),
				_: 1
			}, 8, ["left-icon"]), _("span", Fe, E(Q.value ? D(O)("settings.resetConfirm") : ""), 1)])
		])) : (C(), g("div", Ie, [
			_("section", Le, [
				_("h3", Re, E(D(O)("settings.playback")), 1),
				_("div", ze, [y(t, {
					"model-value": D(a).autoplay,
					label: D(O)("settings.autoplayNext"),
					"onUpdate:modelValue": c[6] ||= (e) => D(a).autoplay = e
				}, null, 8, ["model-value", "label"])]),
				_("div", Be, [_("span", Ve, [v(E(D(O)("settings.defaultVolume")) + " ", 1), _("span", He, E(W(D(a).defaultVolume)), 1)]), _("div", Ue, [y(n, {
					"model-value": D(a).defaultVolume,
					min: 0,
					max: 1,
					step: .05,
					label: D(O)("settings.defaultVolume"),
					"format-value": W,
					"onUpdate:modelValue": c[7] ||= (e) => D(a).defaultVolume = e
				}, null, 8, ["model-value", "label"])])]),
				_("div", We, [_("span", L, E(D(O)("settings.defaultQuality")), 1), y(r, {
					"model-value": D(a).defaultQuality,
					options: U,
					label: D(O)("settings.defaultQuality"),
					"onUpdate:modelValue": c[8] ||= (e) => D(a).defaultQuality = String(e)
				}, null, 8, ["model-value", "label"])])
			]),
			_("section", Ge, [
				_("h3", Ke, E(D(O)("settings.crossfade")), 1),
				_("div", qe, [_("span", Je, [v(E(D(O)("settings.crossfadeDuration")) + " ", 1), _("span", Ye, E(K(D(a).crossfadeDuration)), 1)]), _("div", Xe, [y(n, {
					"model-value": D(a).crossfadeDuration,
					min: 0,
					max: 12,
					step: 1,
					label: D(O)("settings.crossfadeDuration"),
					"format-value": K,
					"onUpdate:modelValue": c[9] ||= (e) => D(a).crossfadeDuration = e
				}, null, 8, ["model-value", "label"])])]),
				_("div", Ze, [y(t, {
					"model-value": D(a).gaplessEnabled,
					label: D(O)("settings.gaplessEnabled"),
					"onUpdate:modelValue": c[10] ||= (e) => D(a).gaplessEnabled = e
				}, null, 8, ["model-value", "label"])]),
				_("div", Qe, [_("span", $e, E(D(O)("settings.preferredAudioQuality")), 1), y(r, {
					"model-value": D(a).preferredAudioQuality,
					options: pt,
					label: D(O)("settings.preferredAudioQuality"),
					"onUpdate:modelValue": c[11] ||= (e) => D(a).preferredAudioQuality = e
				}, null, 8, ["model-value", "label"])])
			]),
			_("section", et, [
				_("h3", tt, E(D(O)("settings.subtitles")), 1),
				_("div", nt, [_("span", rt, E(D(O)("settings.defaultLanguage")), 1), y(r, {
					"model-value": D(a).defaultSubtitleLang ?? "",
					options: ft,
					label: D(O)("settings.defaultSubtitleLanguage"),
					"onUpdate:modelValue": mt
				}, null, 8, ["model-value", "label"])]),
				_("div", it, [_("span", at, E(D(O)("settings.captionSize")), 1), y(r, {
					"model-value": D(a).captionStyle.size,
					options: D(ae),
					label: D(O)("settings.captionSize"),
					"onUpdate:modelValue": c[12] ||= (e) => q("size", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				_("div", ot, [_("span", st, E(D(O)("settings.captionColor")), 1), y(r, {
					"model-value": D(a).captionStyle.textColor,
					options: D(oe),
					label: D(O)("settings.captionColor"),
					"onUpdate:modelValue": c[13] ||= (e) => q("textColor", String(e))
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				_("div", ct, [_("span", lt, E(D(O)("settings.captionBackground")), 1), y(r, {
					"model-value": D(a).captionStyle.background,
					options: D(ce),
					label: D(O)("settings.captionBackground"),
					"onUpdate:modelValue": c[14] ||= (e) => q("background", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				_("div", ut, [_("span", dt, E(D(O)("settings.captionEdge")), 1), y(r, {
					"model-value": D(a).captionStyle.edge,
					options: D(se),
					label: D(O)("settings.captionEdge"),
					"onUpdate:modelValue": c[15] ||= (e) => q("edge", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		]));
	}
}), [["__scopeId", "data-v-24c79770"]]), z = { class: "settings-page" }, B = { class: "settings-page__head" }, V = { class: "settings-page__eyebrow" }, H = { class: "settings-page__title" }, U = /*#__PURE__*/ a(/* @__PURE__ */ b({
	__name: "SettingsPage",
	setup(t) {
		let { t: n } = d(), r = [
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
		], i = A(), a = j(), o = r.map((e) => e.value);
		function s() {
			let e = i?.query?.tab, t = Array.isArray(e) ? e[0] : e;
			return typeof t == "string" && o.includes(t) ? t : o[0];
		}
		let c = w(s());
		return O(() => i?.query?.tab, () => {
			c.value = s();
		}), O(c, (e) => {
			a && i && i.query.tab !== e && a.replace({ query: {
				...i.query,
				tab: e
			} });
		}), (t, i) => (C(), g("div", z, [_("header", B, [_("p", V, E(D(n)("settings.preferences")), 1), _("h1", H, E(D(n)("settings.title")), 1)]), y(e, {
			modelValue: c.value,
			"onUpdate:modelValue": i[0] ||= (e) => c.value = e,
			tabs: r,
			label: D(n)("settings.sectionsLabel")
		}, {
			appearance: k(() => [y(R, { panel: "appearance" })]),
			playback: k(() => [y(R, { panel: "playback" })]),
			security: k(() => [y(l)]),
			sessions: k(() => [y(u)]),
			_: 1
		}, 8, ["modelValue", "label"])]));
	}
}), [["__scopeId", "data-v-cd270171"]]);
export { U as default };

//# sourceMappingURL=SettingsPage-DfzcXbgn.js.map