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
	let r = c(), l = t(r.theme), d = t(r.accent), f = t(r.density), p = t(r.cardSize), m = t(r.gridDensity), h = t(r.reducedMotion), g = t(r.autoplay), _ = t(r.defaultVolume), v = t(r.defaultQuality), y = t(r.defaultSubtitleLang), b = t({
		...i,
		...r.captionStyle
	}), x = t(r.atmosphere), S = t(r.filterPresets ? [...r.filterPresets] : []), C = t(u()), w = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (w = window.matchMedia("(prefers-reduced-motion: reduce)"), w.addEventListener?.("change", (e) => C.value = e.matches));
	let T = e(() => h.value === "on" ? !0 : h.value === "off" ? !1 : C.value);
	function E() {
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
			captionStyle: b.value,
			atmosphere: x.value,
			filterPresets: S.value
		};
	}
	function D(e, t) {
		let n = {
			id: o(e),
			name: e.trim(),
			query: t
		}, r = S.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? S.value.splice(r, 1, n) : S.value.push(n), n;
	}
	function O(e) {
		S.value = S.value.filter((t) => t.id !== e);
	}
	n(E, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(s, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function k() {
		let e = a;
		l.value = e.theme, d.value = e.accent, f.value = e.density, p.value = e.cardSize, m.value = e.gridDensity, h.value = e.reducedMotion, g.value = e.autoplay, _.value = e.defaultVolume, v.value = e.defaultQuality, y.value = e.defaultSubtitleLang, b.value = { ...i }, x.value = e.atmosphere, S.value = [...e.filterPresets];
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
		captionStyle: b,
		atmosphere: x,
		filterPresets: S,
		systemReduced: C,
		effectiveReducedMotion: T,
		snapshot: E,
		saveFilterPreset: D,
		removeFilterPreset: O,
		reset: k
	};
});
//#endregion
export { d as a, c as i, a as n, l as r, i as t };

//# sourceMappingURL=usePreferencesStore-BFFMWKZp.js.map