import { t as e } from "./Tabs-DZRiZml3.js";
import { t } from "./Switch-C607L4Vu.js";
import { t as n } from "./Slider-Bj5BaBUu.js";
import { t as r } from "./Select-Bu7KxTAr.js";
import { t as i } from "./Button-Dfl4y6vO.js";
import { n as a, t as o } from "./Icon-55iG1rR7.js";
import { a as s } from "./usePreferencesStore-DrDMAwjz.js";
import { C as c, i as ee, n as l, r as te, t as u, w as ne } from "./DeviceSessionsPage-C0frB2xM.js";
import { t as re } from "./useToastStore-CxO_ppM8.js";
import { t as d } from "./useMessages-Ds_MGz5S.js";
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
}, ve = {
	key: 1,
	class: "aps__hint"
}, M = { class: "aps__group" }, N = { class: "aps__title" }, P = ["aria-label"], F = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], ye = { class: "aps__group" }, be = { class: "aps__title" }, xe = { class: "aps__row" }, Se = {
	class: "aps__label",
	id: "aps-density"
}, Ce = { class: "aps__row" }, we = { class: "aps__label" }, Te = { class: "aps__row" }, Ee = { class: "aps__label" }, De = { class: "aps__value" }, Oe = { class: "aps__slider" }, ke = { class: "aps__group" }, Ae = { class: "aps__title" }, je = { class: "aps__row aps__row--switch" }, Me = { class: "aps__row aps__row--switch" }, Ne = { class: "aps__row" }, Pe = { class: "aps__label" }, Fe = { class: "aps__foot" }, Ie = {
	class: "visually-hidden",
	role: "status",
	"aria-live": "polite"
}, Le = {
	key: 1,
	class: "aps"
}, Re = { class: "aps__group" }, ze = { class: "aps__title" }, Be = { class: "aps__row aps__row--switch" }, Ve = { class: "aps__row" }, He = { class: "aps__label" }, Ue = { class: "aps__value" }, We = { class: "aps__slider" }, Ge = { class: "aps__row" }, Ke = { class: "aps__label" }, qe = { class: "aps__group" }, Je = { class: "aps__title" }, Ye = { class: "aps__row" }, Xe = { class: "aps__label" }, Ze = { class: "aps__value" }, Qe = { class: "aps__slider" }, $e = { class: "aps__row aps__row--switch" }, et = { class: "aps__row" }, tt = { class: "aps__label" }, nt = { class: "aps__group" }, I = { class: "aps__title" }, rt = { class: "aps__row" }, it = { class: "aps__label" }, at = { class: "aps__row" }, ot = { class: "aps__label" }, st = { class: "aps__row" }, ct = { class: "aps__label" }, lt = { class: "aps__row" }, ut = { class: "aps__label" }, dt = { class: "aps__row" }, ft = { class: "aps__label" }, L = /*#__PURE__*/ a(/* @__PURE__ */ b({
	__name: "AppearanceSettings",
	props: {
		panel: { default: "appearance" },
		subtitleLanguages: { default: () => [] }
	},
	setup(e) {
		let a = e, l = s(), u = ee(), b = te(), O = re(), { t: A } = d(), j = ie(), L = [
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
		ue(() => void u.load(j.value, !0));
		let R = p(() => [...L, ...u.pluginThemes.map((e) => ({
			value: e.id,
			label: e.name,
			base: c(e.id, u.items),
			tokens: ne(e.id, u.items)
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
		], pt = [
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
		];
		function U(e) {
			try {
				let t = Intl.DisplayNames;
				if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
			} catch {}
			return e;
		}
		let mt = [
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
		], ht = p(() => {
			let e = /* @__PURE__ */ new Set([""]), t = [];
			for (let n of a.subtitleLanguages) {
				let r = typeof n == "string" ? n : n.language;
				if (!r || e.has(r)) continue;
				e.add(r);
				let i = typeof n == "string" ? "" : n.label ?? "";
				t.push({
					value: r,
					label: i || U(r)
				});
			}
			let n = t.length > 0 ? [{
				value: "",
				label: "Off"
			}, ...t] : [...mt], r = l.defaultSubtitleLang;
			return r && !n.some((e) => e.value === r) && n.push({
				value: r,
				label: U(r)
			}), n;
		}), gt = [
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
		function _t(e) {
			l.defaultSubtitleLang = e === "" ? null : String(e), l.subtitlePreferenceSet = !0;
		}
		function q(e, t) {
			l.captionStyle = {
				...l.captionStyle,
				[e]: t
			};
		}
		let J = p(() => Math.max(0, R.value.findIndex((e) => e.value === l.theme))), Y = p(() => Math.max(0, z.findIndex((e) => e.value === l.accent)));
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
			l.theme = e, b.queuePut(j.value, e);
		}
		function vt(e) {
			let t = X(e, R.value.length, J.value);
			t !== null && Z(R.value[t].value);
		}
		function yt(e) {
			let t = X(e, z.length, Y.value);
			t !== null && (l.accent = z[t].value);
		}
		let Q = w(!1), $;
		function bt() {
			Q.value ? (clearTimeout($), Q.value = !1, l.reset(), O.info(A("settings.resetDone"))) : (Q.value = !0, clearTimeout($), $ = setTimeout(() => Q.value = !1, 3500));
		}
		return le(() => clearTimeout($)), (a, s) => e.panel === "appearance" ? (C(), g("div", de, [
			_("section", fe, [
				_("h3", pe, E(D(A)("settings.theme")), 1),
				_("div", {
					class: "aps__themes",
					role: "radiogroup",
					"aria-label": D(A)("settings.theme"),
					onKeydown: vt
				}, [(C(!0), g(f, null, T(R.value, (e, t) => (C(), g("button", {
					key: e.value,
					type: "button",
					role: "radio",
					class: x(["aps__theme", { "is-active": D(l).theme === e.value }]),
					"aria-checked": D(l).theme === e.value,
					tabindex: J.value === t ? 0 : -1,
					"data-theme": e.base,
					style: S(e.tokens),
					onClick: (t) => Z(e.value)
				}, [s[16] ||= _("span", { class: "aps__preview" }, [_("span", { class: "aps__preview-bar" }), _("span", { class: "aps__preview-card" })], -1), _("span", ge, [v(E(e.label) + " ", 1), D(l).theme === e.value ? (C(), m(o, {
					key: 0,
					name: "check",
					class: "aps__theme-check"
				})) : h("", !0)])], 14, he))), 128))], 40, me),
				D(u).error ? (C(), g("p", _e, E(D(A)("settings.themeCatalogueUnavailable")), 1)) : h("", !0),
				D(b).putFailed ? (C(), g("p", ve, E(D(A)("settings.themeSavedLocally")), 1)) : h("", !0)
			]),
			_("section", M, [_("h3", N, E(D(A)("settings.accent")), 1), _("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": D(A)("settings.accentColor"),
				onKeydown: yt
			}, [(C(), g(f, null, T(z, (e, t) => _("button", {
				key: e.label,
				type: "button",
				role: "radio",
				class: x(["aps__accent", { "is-active": D(l).accent === e.value }]),
				"aria-checked": D(l).accent === e.value,
				"aria-label": e.label,
				title: e.label,
				tabindex: Y.value === t ? 0 : -1,
				onClick: (t) => D(l).accent = e.value
			}, [_("span", {
				class: "aps__accent-dot",
				style: S({ background: e.swatch })
			}, [D(l).accent === e.value ? (C(), m(o, {
				key: 0,
				name: "check"
			})) : h("", !0)], 4)], 10, F)), 64))], 40, P)]),
			_("section", ye, [
				_("h3", be, E(D(A)("settings.display")), 1),
				_("div", xe, [_("span", Se, E(D(A)("settings.density")), 1), y(r, {
					"model-value": D(l).density,
					options: B,
					label: D(A)("settings.density"),
					"onUpdate:modelValue": s[0] ||= (e) => D(l).density = e
				}, null, 8, ["model-value", "label"])]),
				_("div", Ce, [_("span", we, E(D(A)("settings.gridDensity")), 1), y(r, {
					"model-value": D(l).gridDensity,
					options: V,
					label: D(A)("settings.gridDensity"),
					"onUpdate:modelValue": s[1] ||= (e) => D(l).gridDensity = e
				}, null, 8, ["model-value", "label"])]),
				_("div", Te, [_("span", Ee, [v(E(D(A)("settings.cardSize")) + " ", 1), _("span", De, E(G(D(l).cardSize)), 1)]), _("div", Oe, [y(n, {
					"model-value": D(l).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: D(A)("settings.cardSize"),
					"format-value": G,
					"onUpdate:modelValue": s[2] ||= (e) => D(l).cardSize = e
				}, null, 8, ["model-value", "label"])])])
			]),
			_("section", ke, [
				_("h3", Ae, E(D(A)("settings.atmosphere")), 1),
				_("div", je, [y(t, {
					"model-value": D(l).atmosphere,
					label: D(A)("settings.filmGrainGlow"),
					"onUpdate:modelValue": s[3] ||= (e) => D(l).atmosphere = e
				}, null, 8, ["model-value", "label"])]),
				_("div", Me, [y(t, {
					"model-value": D(l).tv,
					label: "TV mode",
					"onUpdate:modelValue": s[4] ||= (e) => D(l).tv = e
				}, null, 8, ["model-value"])]),
				s[17] ||= _("p", { class: "aps__hint" }, "Larger controls and a visible focus outline for TV / remote navigation.", -1),
				_("div", Ne, [_("span", Pe, E(D(A)("settings.motion")), 1), y(r, {
					"model-value": D(l).reducedMotion,
					options: H,
					label: D(A)("settings.motion"),
					"onUpdate:modelValue": s[5] ||= (e) => D(l).reducedMotion = e
				}, null, 8, ["model-value", "label"])])
			]),
			_("div", Fe, [y(i, {
				variant: "ghost",
				"left-icon": Q.value ? "alert" : "rewind",
				onClick: bt
			}, {
				default: k(() => [v(E(Q.value ? D(A)("settings.resetConfirm") : D(A)("settings.resetAll")), 1)]),
				_: 1
			}, 8, ["left-icon"]), _("span", Ie, E(Q.value ? D(A)("settings.resetConfirm") : ""), 1)])
		])) : (C(), g("div", Le, [
			_("section", Re, [
				_("h3", ze, E(D(A)("settings.playback")), 1),
				_("div", Be, [y(t, {
					"model-value": D(l).autoplay,
					label: D(A)("settings.autoplayNext"),
					"onUpdate:modelValue": s[6] ||= (e) => D(l).autoplay = e
				}, null, 8, ["model-value", "label"])]),
				_("div", Ve, [_("span", He, [v(E(D(A)("settings.defaultVolume")) + " ", 1), _("span", Ue, E(W(D(l).defaultVolume)), 1)]), _("div", We, [y(n, {
					"model-value": D(l).defaultVolume,
					min: 0,
					max: 1,
					step: .05,
					label: D(A)("settings.defaultVolume"),
					"format-value": W,
					"onUpdate:modelValue": s[7] ||= (e) => D(l).defaultVolume = e
				}, null, 8, ["model-value", "label"])])]),
				_("div", Ge, [_("span", Ke, E(D(A)("settings.defaultQuality")), 1), y(r, {
					"model-value": D(l).defaultQuality,
					options: pt,
					label: D(A)("settings.defaultQuality"),
					"onUpdate:modelValue": s[8] ||= (e) => D(l).defaultQuality = String(e)
				}, null, 8, ["model-value", "label"])])
			]),
			_("section", qe, [
				_("h3", Je, E(D(A)("settings.crossfade")), 1),
				_("div", Ye, [_("span", Xe, [v(E(D(A)("settings.crossfadeDuration")) + " ", 1), _("span", Ze, E(K(D(l).crossfadeDuration)), 1)]), _("div", Qe, [y(n, {
					"model-value": D(l).crossfadeDuration,
					min: 0,
					max: 12,
					step: 1,
					label: D(A)("settings.crossfadeDuration"),
					"format-value": K,
					"onUpdate:modelValue": s[9] ||= (e) => D(l).crossfadeDuration = e
				}, null, 8, ["model-value", "label"])])]),
				_("div", $e, [y(t, {
					"model-value": D(l).gaplessEnabled,
					label: D(A)("settings.gaplessEnabled"),
					"onUpdate:modelValue": s[10] ||= (e) => D(l).gaplessEnabled = e
				}, null, 8, ["model-value", "label"])]),
				_("div", et, [_("span", tt, E(D(A)("settings.preferredAudioQuality")), 1), y(r, {
					"model-value": D(l).preferredAudioQuality,
					options: gt,
					label: D(A)("settings.preferredAudioQuality"),
					"onUpdate:modelValue": s[11] ||= (e) => D(l).preferredAudioQuality = e
				}, null, 8, ["model-value", "label"])])
			]),
			_("section", nt, [
				_("h3", I, E(D(A)("settings.subtitles")), 1),
				_("div", rt, [_("span", it, E(D(A)("settings.defaultLanguage")), 1), y(r, {
					"model-value": D(l).defaultSubtitleLang ?? "",
					options: ht.value,
					label: D(A)("settings.defaultSubtitleLanguage"),
					"onUpdate:modelValue": _t
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				_("div", at, [_("span", ot, E(D(A)("settings.captionSize")), 1), y(r, {
					"model-value": D(l).captionStyle.size,
					options: D(ae),
					label: D(A)("settings.captionSize"),
					"onUpdate:modelValue": s[12] ||= (e) => q("size", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				_("div", st, [_("span", ct, E(D(A)("settings.captionColor")), 1), y(r, {
					"model-value": D(l).captionStyle.textColor,
					options: D(oe),
					label: D(A)("settings.captionColor"),
					"onUpdate:modelValue": s[13] ||= (e) => q("textColor", String(e))
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				_("div", lt, [_("span", ut, E(D(A)("settings.captionBackground")), 1), y(r, {
					"model-value": D(l).captionStyle.background,
					options: D(ce),
					label: D(A)("settings.captionBackground"),
					"onUpdate:modelValue": s[14] ||= (e) => q("background", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				_("div", dt, [_("span", ft, E(D(A)("settings.captionEdge")), 1), y(r, {
					"model-value": D(l).captionStyle.edge,
					options: D(se),
					label: D(A)("settings.captionEdge"),
					"onUpdate:modelValue": s[15] ||= (e) => q("edge", e)
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		]));
	}
}), [["__scopeId", "data-v-f4ffdec6"]]), R = { class: "settings-page" }, z = { class: "settings-page__head" }, B = { class: "settings-page__eyebrow" }, V = { class: "settings-page__title" }, H = /*#__PURE__*/ a(/* @__PURE__ */ b({
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
		}), (t, i) => (C(), g("div", R, [_("header", z, [_("p", B, E(D(n)("settings.preferences")), 1), _("h1", V, E(D(n)("settings.title")), 1)]), y(e, {
			modelValue: c.value,
			"onUpdate:modelValue": i[0] ||= (e) => c.value = e,
			tabs: r,
			label: D(n)("settings.sectionsLabel")
		}, {
			appearance: k(() => [y(L, { panel: "appearance" })]),
			playback: k(() => [y(L, { panel: "playback" })]),
			security: k(() => [y(l)]),
			sessions: k(() => [y(u)]),
			_: 1
		}, 8, ["modelValue", "label"])]));
	}
}), [["__scopeId", "data-v-cd270171"]]);
export { H as default };

//# sourceMappingURL=SettingsPage-SqvaMmt_.js.map