import { n as e } from "./useMessages-C-PrFAcm.js";
// src/components/player/captions.ts
function t(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function n(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function r(e, t) {
	return e.language || e.label || `track-${t}`;
}
function i(e, t) {
	if (!e) return "";
	let n = Intl.DisplayNames;
	if (!n) return e;
	let r = t ? [t.replace(/_/g, "-"), "en"] : ["en"];
	try {
		return new n(r, { type: "language" }).of(e) ?? e;
	} catch {}
	try {
		return new n(["en"], { type: "language" }).of(e) ?? e;
	} catch {
		return e;
	}
}
function a(e) {
	return e ? t(e.textTracks).filter(n).map((e, t) => ({
		index: t,
		language: r(e, t),
		label: e.label || i(e.language) || `Track ${t + 1}`,
		kind: e.kind,
		labelKind: e.label ? "title" : e.language ? "language" : "generated"
	})) : [];
}
function o(e) {
	let n = e?.audioTracks;
	return t(n).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || i(e.language) || `Audio ${t + 1}`,
		kind: "audio",
		labelKind: e.label ? "title" : e.language ? "language" : "generated"
	}));
}
function s(e, i) {
	return !e || i == null ? null : t(e.textTracks).filter(n).find((e, t) => r(e, t) === i) ?? null;
}
function c(e, i) {
	e && t(e.textTracks).filter(n).forEach((e, t) => {
		try {
			e.mode = r(e, t) === i ? "hidden" : "disabled";
		} catch {}
	});
}
function l(e, n) {
	let r = e?.audioTracks;
	t(r).forEach((e, t) => {
		try {
			e.enabled = t === n;
		} catch {}
	});
}
function u(e) {
	let n = e?.audioTracks;
	return t(n).findIndex((e) => e.enabled);
}
var d = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function f(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function p(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && f(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(d, n) ? d[n] : e;
	});
}
function m(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => p(e).trim()).filter((e) => e.length > 0) : [];
}
function h(e) {
	if (!e) return [];
	let n = t(e.activeCues), r = [];
	for (let e of n) r.push(...m(e.text));
	return r;
}
function g(e, t) {
	return e - (Number.isFinite(t) ? t : 0);
}
function _(e, n) {
	if (!e || !Number.isFinite(n)) return [];
	let r = t(e.cues), i = [];
	for (let e of r) {
		let { start: t, end: r } = e;
		typeof t == "number" && typeof r == "number" && t <= n && n < r && i.push(...m(e.text));
	}
	return i;
}
var v = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
};
function y(t, n) {
	return {
		value: t,
		label: e.player[n],
		key: `player.${n}`
	};
}
var b = [
	y("sm", "captionSizeSmall"),
	y("md", "captionSizeMedium"),
	y("lg", "captionSizeLarge"),
	y("xl", "captionSizeExtraLarge")
], x = [
	y("#ffffff", "captionColorWhite"),
	y("#ffd400", "captionColorYellow"),
	y("#66e0ff", "captionColorCyan"),
	y("#7cff7c", "captionColorGreen")
], S = [
	{
		value: "none",
		label: e.player.off,
		key: "player.off"
	},
	y("semi", "captionBackgroundSemi"),
	y("solid", "captionBackgroundSolid")
], C = [
	y("none", "captionEdgeNone"),
	y("drop-shadow", "captionEdgeDropShadow"),
	y("outline", "captionEdgeOutline"),
	y("raised", "captionEdgeRaised")
];
function w(e, t) {
	return e.map((e) => ({
		value: e.value,
		label: t(e.key)
	}));
}
function T(e, t, n) {
	return e.labelKind === "generated" ? t(e.kind === "audio" ? "player.audioTrackNumbered" : "player.trackNumbered", { number: e.index + 1 }) : e.labelKind === "language" && i(e.language, n) || e.label;
}
function E(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function D(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function O(e) {
	return {
		"--cap-scale": String(v[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": E(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": D(e.edge)
	};
}
export { T as _, u as a, g as c, o as d, a as f, s as g, _ as h, b as i, O as l, h as m, x as n, l as o, w as p, C as r, c as s, S as t, i as u };

//# sourceMappingURL=captions-GTHY6uBf.js.map