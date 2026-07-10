import { computed as e, ref as t, watch as n } from "vue";
import { defineStore as r } from "pinia";
//#region src/stores/usePreferencesStore.ts
var i = {
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, a = {
	theme: "nocturne",
	accent: null,
	density: "comfortable",
	cardSize: 200,
	gridDensity: "comfy",
	reducedMotion: "auto",
	autoplay: !0,
	defaultVolume: 1,
	defaultQuality: "auto",
	defaultSubtitleLang: null,
	defaultAudioLang: null,
	subtitlePreferenceSet: !1,
	captionStyle: { ...i },
	atmosphere: !0,
	tv: !1,
	filterPresets: [],
	showMarkerTimeline: !0,
	crossfadeDuration: 0,
	crossfadeFadeIn: .5,
	crossfadeFadeOut: .5,
	gaplessEnabled: !0,
	preferredAudioQuality: "high"
};
function o(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var s = "phlix.prefs";
function c() {
	if (typeof localStorage > "u") return { ...a };
	try {
		let e = localStorage.getItem(s);
		if (!e) return { ...a };
		let t = JSON.parse(e);
		return {
			...a,
			...t
		};
	} catch {
		return { ...a };
	}
}
function l() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(s) !== null;
	} catch {
		return !1;
	}
}
function u() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var d = r("phlix-prefs", () => {
	let r = c(), l = t(r.theme), d = t(r.accent), f = t(r.density), p = t(r.cardSize), m = t(r.gridDensity), h = t(r.reducedMotion), g = t(r.autoplay), _ = t(r.defaultVolume), v = t(r.defaultQuality), y = t(r.defaultSubtitleLang), b = t(r.defaultAudioLang), x = t(r.subtitlePreferenceSet), S = t({
		...i,
		...r.captionStyle
	}), C = t(r.atmosphere), w = t(r.tv), T = t(r.filterPresets ? [...r.filterPresets] : []), E = t(r.showMarkerTimeline), D = t(r.crossfadeDuration), O = t(r.crossfadeFadeIn), k = t(r.crossfadeFadeOut), A = t(r.gaplessEnabled), j = t(r.preferredAudioQuality), M = t(u()), N = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (N = window.matchMedia("(prefers-reduced-motion: reduce)"), N.addEventListener?.("change", (e) => M.value = e.matches));
	let P = e(() => h.value === "on" ? !0 : h.value === "off" ? !1 : M.value);
	function F() {
		return {
			theme: l.value,
			accent: d.value,
			density: f.value,
			cardSize: p.value,
			gridDensity: m.value,
			reducedMotion: h.value,
			autoplay: g.value,
			defaultVolume: _.value,
			defaultQuality: v.value,
			defaultSubtitleLang: y.value,
			defaultAudioLang: b.value,
			subtitlePreferenceSet: x.value,
			captionStyle: S.value,
			atmosphere: C.value,
			tv: w.value,
			filterPresets: T.value,
			showMarkerTimeline: E.value,
			crossfadeDuration: D.value,
			crossfadeFadeIn: O.value,
			crossfadeFadeOut: k.value,
			gaplessEnabled: A.value,
			preferredAudioQuality: j.value
		};
	}
	function I(e, t) {
		let n = {
			id: o(e),
			name: e.trim(),
			query: t
		}, r = T.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? T.value.splice(r, 1, n) : T.value.push(n), n;
	}
	function L(e) {
		T.value = T.value.filter((t) => t.id !== e);
	}
	n(F, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(s, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function R() {
		let e = a;
		l.value = e.theme, d.value = e.accent, f.value = e.density, p.value = e.cardSize, m.value = e.gridDensity, h.value = e.reducedMotion, g.value = e.autoplay, _.value = e.defaultVolume, v.value = e.defaultQuality, y.value = e.defaultSubtitleLang, b.value = e.defaultAudioLang, x.value = e.subtitlePreferenceSet, S.value = { ...i }, C.value = e.atmosphere, w.value = e.tv, T.value = [...e.filterPresets], E.value = e.showMarkerTimeline, D.value = e.crossfadeDuration, O.value = e.crossfadeFadeIn, k.value = e.crossfadeFadeOut, A.value = e.gaplessEnabled, j.value = e.preferredAudioQuality;
	}
	return {
		theme: l,
		accent: d,
		density: f,
		cardSize: p,
		gridDensity: m,
		reducedMotion: h,
		autoplay: g,
		defaultVolume: _,
		defaultQuality: v,
		defaultSubtitleLang: y,
		defaultAudioLang: b,
		subtitlePreferenceSet: x,
		captionStyle: S,
		atmosphere: C,
		tv: w,
		filterPresets: T,
		showMarkerTimeline: E,
		crossfadeDuration: D,
		crossfadeFadeIn: O,
		crossfadeFadeOut: k,
		gaplessEnabled: A,
		preferredAudioQuality: j,
		systemReduced: M,
		effectiveReducedMotion: P,
		snapshot: F,
		saveFilterPreset: I,
		removeFilterPreset: L,
		reset: R
	};
});
//#endregion
export { d as a, c as i, a as n, l as r, i as t };

//# sourceMappingURL=usePreferencesStore-aFj85Ytq.js.map