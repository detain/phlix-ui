import { n as e } from "./useMessages-vcPOKXXR.js";
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
function r(e) {
	return e.uid ?? e.language;
}
function i(e, t, n) {
	let r = n(e[t], t), i = 0;
	for (let a = 0; a <= t; a++) n(e[a], a) === r && (i += 1);
	return i > 1 ? `${r}#${i}` : r;
}
function a(e, t) {
	return i(e, t, (e, t) => e.language || e.id || e.label || `track-${t}`);
}
function o(e, t) {
	return i(e, t, (e, t) => e.language || e.id || `audio-${t}`);
}
function s(e, t) {
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
function c(e) {
	if (!e) return [];
	let r = t(e.textTracks).filter(n);
	return r.map((e, t) => {
		let n = a(r, t);
		return {
			index: t,
			language: n,
			uid: n,
			trackLanguage: e.language || "",
			label: e.label || s(e.language) || `Track ${t + 1}`,
			kind: e.kind,
			labelKind: e.label ? "title" : e.language ? "language" : "generated"
		};
	});
}
function l(e) {
	let n = e?.audioTracks;
	if (!n) return [];
	let r = t(n);
	return r.map((e, t) => {
		let n = o(r, t);
		return {
			index: t,
			language: n,
			uid: n,
			trackLanguage: e.language || "",
			label: e.label || s(e.language) || `Audio ${t + 1}`,
			kind: "audio",
			labelKind: e.label ? "title" : e.language ? "language" : "generated"
		};
	});
}
function u(e, r) {
	if (!e || r == null) return null;
	let i = t(e.textTracks).filter(n);
	return i.find((e, t) => a(i, t) === r) ?? null;
}
function d(e, r) {
	if (!e) return;
	let i = t(e.textTracks).filter(n);
	i.forEach((e, t) => {
		try {
			e.mode = a(i, t) === r ? "hidden" : "disabled";
		} catch {}
	});
}
function f(e, n) {
	let r = e?.audioTracks;
	t(r).forEach((e, t) => {
		try {
			e.enabled = t === n;
		} catch {}
	});
}
function p(e) {
	let n = e?.audioTracks;
	return t(n).findIndex((e) => e.enabled);
}
var m = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function h(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function g(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && h(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(m, n) ? m[n] : e;
	});
}
function _(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => g(e).trim()).filter((e) => e.length > 0) : [];
}
function v(e) {
	if (!e) return [];
	let n = t(e.activeCues), r = [];
	for (let e of n) r.push(..._(e.text));
	return r;
}
function y(e, t) {
	return e - (Number.isFinite(t) ? t : 0);
}
function b(e, n) {
	if (!e || !Number.isFinite(n)) return [];
	let r = t(e.cues), i = [];
	for (let e of r) {
		let { start: t, end: r } = e;
		typeof t == "number" && typeof r == "number" && t <= n && n < r && i.push(..._(e.text));
	}
	return i;
}
var x = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
};
function S(t, n) {
	return {
		value: t,
		label: e.player[n],
		key: `player.${n}`
	};
}
var C = [
	S("sm", "captionSizeSmall"),
	S("md", "captionSizeMedium"),
	S("lg", "captionSizeLarge"),
	S("xl", "captionSizeExtraLarge")
], w = [
	S("#ffffff", "captionColorWhite"),
	S("#ffd400", "captionColorYellow"),
	S("#66e0ff", "captionColorCyan"),
	S("#7cff7c", "captionColorGreen")
], T = [
	{
		value: "none",
		label: e.player.off,
		key: "player.off"
	},
	S("semi", "captionBackgroundSemi"),
	S("solid", "captionBackgroundSolid")
], E = [
	S("none", "captionEdgeNone"),
	S("drop-shadow", "captionEdgeDropShadow"),
	S("outline", "captionEdgeOutline"),
	S("raised", "captionEdgeRaised")
];
function D(e, t) {
	return e.map((e) => ({
		value: e.value,
		label: t(e.key)
	}));
}
function O(e, t, n) {
	if (e.labelKind === "generated") return t(e.kind === "audio" ? "player.audioTrackNumbered" : "player.trackNumbered", { number: e.index + 1 });
	if (e.labelKind === "language") {
		let r = e.trackLanguage ?? e.language;
		return e.language === r ? s(r, n) || e.label : t(e.kind === "audio" ? "player.audioTrackNumbered" : "player.trackNumbered", { number: e.index + 1 });
	}
	return e.label;
}
function k(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function A(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function j(e) {
	return {
		"--cap-scale": String(x[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": k(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": A(e.edge)
	};
}
export { O as _, p as a, y as c, l as d, c as f, u as g, b as h, C as i, j as l, v as m, w as n, f as o, D as p, E as r, d as s, T as t, s as u, r as v };

//# sourceMappingURL=captions-xDMUgvF-.js.map