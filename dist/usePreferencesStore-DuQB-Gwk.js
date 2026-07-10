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
	let r = c(), l = t(r.theme), d = t(r.accent), f = t(r.density), p = t(r.cardSize), m = t(r.gridDensity), h = t(r.reducedMotion), g = t(r.autoplay), _ = t(r.defaultVolume), v = t(r.defaultQuality), y = t(r.defaultSubtitleLang), b = t(r.subtitlePreferenceSet), x = t({
		...i,
		...r.captionStyle
	}), S = t(r.atmosphere), C = t(r.tv), w = t(r.filterPresets ? [...r.filterPresets] : []), T = t(r.showMarkerTimeline), E = t(r.crossfadeDuration), D = t(r.crossfadeFadeIn), O = t(r.crossfadeFadeOut), k = t(r.gaplessEnabled), A = t(r.preferredAudioQuality), j = t(u()), M = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (M = window.matchMedia("(prefers-reduced-motion: reduce)"), M.addEventListener?.("change", (e) => j.value = e.matches));
	let N = e(() => h.value === "on" ? !0 : h.value === "off" ? !1 : j.value);
	function P() {
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
			subtitlePreferenceSet: b.value,
			captionStyle: x.value,
			atmosphere: S.value,
			tv: C.value,
			filterPresets: w.value,
			showMarkerTimeline: T.value,
			crossfadeDuration: E.value,
			crossfadeFadeIn: D.value,
			crossfadeFadeOut: O.value,
			gaplessEnabled: k.value,
			preferredAudioQuality: A.value
		};
	}
	function F(e, t) {
		let n = {
			id: o(e),
			name: e.trim(),
			query: t
		}, r = w.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? w.value.splice(r, 1, n) : w.value.push(n), n;
	}
	function I(e) {
		w.value = w.value.filter((t) => t.id !== e);
	}
	n(P, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(s, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function L() {
		let e = a;
		l.value = e.theme, d.value = e.accent, f.value = e.density, p.value = e.cardSize, m.value = e.gridDensity, h.value = e.reducedMotion, g.value = e.autoplay, _.value = e.defaultVolume, v.value = e.defaultQuality, y.value = e.defaultSubtitleLang, b.value = e.subtitlePreferenceSet, x.value = { ...i }, S.value = e.atmosphere, C.value = e.tv, w.value = [...e.filterPresets], T.value = e.showMarkerTimeline, E.value = e.crossfadeDuration, D.value = e.crossfadeFadeIn, O.value = e.crossfadeFadeOut, k.value = e.gaplessEnabled, A.value = e.preferredAudioQuality;
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
		subtitlePreferenceSet: b,
		captionStyle: x,
		atmosphere: S,
		tv: C,
		filterPresets: w,
		showMarkerTimeline: T,
		crossfadeDuration: E,
		crossfadeFadeIn: D,
		crossfadeFadeOut: O,
		gaplessEnabled: k,
		preferredAudioQuality: A,
		systemReduced: j,
		effectiveReducedMotion: N,
		snapshot: P,
		saveFilterPreset: F,
		removeFilterPreset: I,
		reset: L
	};
});
//#endregion
export { d as a, c as i, a as n, l as r, i as t };

//# sourceMappingURL=usePreferencesStore-DuQB-Gwk.js.map