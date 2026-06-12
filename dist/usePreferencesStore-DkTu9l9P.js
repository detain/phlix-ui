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
	cardSize: 180,
	gridDensity: "comfy",
	reducedMotion: "auto",
	autoplay: !0,
	defaultVolume: 1,
	defaultQuality: "auto",
	defaultSubtitleLang: null,
	subtitlePreferenceSet: !1,
	captionStyle: { ...i },
	atmosphere: !0,
	filterPresets: []
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
	}), S = t(r.atmosphere), C = t(r.filterPresets ? [...r.filterPresets] : []), w = t(u()), T = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (T = window.matchMedia("(prefers-reduced-motion: reduce)"), T.addEventListener?.("change", (e) => w.value = e.matches));
	let E = e(() => h.value === "on" ? !0 : h.value === "off" ? !1 : w.value);
	function D() {
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
			filterPresets: C.value
		};
	}
	function O(e, t) {
		let n = {
			id: o(e),
			name: e.trim(),
			query: t
		}, r = C.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? C.value.splice(r, 1, n) : C.value.push(n), n;
	}
	function k(e) {
		C.value = C.value.filter((t) => t.id !== e);
	}
	n(D, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(s, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function A() {
		let e = a;
		l.value = e.theme, d.value = e.accent, f.value = e.density, p.value = e.cardSize, m.value = e.gridDensity, h.value = e.reducedMotion, g.value = e.autoplay, _.value = e.defaultVolume, v.value = e.defaultQuality, y.value = e.defaultSubtitleLang, b.value = e.subtitlePreferenceSet, x.value = { ...i }, S.value = e.atmosphere, C.value = [...e.filterPresets];
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
		filterPresets: C,
		systemReduced: w,
		effectiveReducedMotion: E,
		snapshot: D,
		saveFilterPreset: O,
		removeFilterPreset: k,
		reset: A
	};
});
//#endregion
export { d as a, c as i, a as n, l as r, i as t };

//# sourceMappingURL=usePreferencesStore-DkTu9l9P.js.map