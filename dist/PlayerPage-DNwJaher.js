import { S as e, o as t, t as n, y as r } from "./client-Bmlfq3Uy.js";
import { n as i, r as a } from "./useApiBase-DXTBY90j.js";
import { t as o } from "./useMessages-BGVJcrvU.js";
import { r as s, t as c } from "./useImageSrc-CSM61b-l.js";
import { n as l } from "./media-query-D7hrCu8r.js";
import { i as u } from "./usePlayerStore-P13f-aKf.js";
import { n as d, t as f } from "./ThumbRating-BMpV52OI.js";
import { a as p, c as m, d as h, l as g, n as _, o as v, r as y, s as b, t as x, u as ee } from "./shortcuts-BV2IjCso.js";
import { a as S } from "./usePreferencesStore-CQ3hN8jz.js";
import { t as C } from "./useToastStore-CxO_ppM8.js";
import { n as w, t as T } from "./Icon-55iG1rR7.js";
import { t as E } from "./IconButton-DsjtwjU1.js";
import { n as D } from "./useFocusTrap-DStfPnC8.js";
import { t as O } from "./Slider-Bj5BaBUu.js";
import { t as k } from "./Select-BJFwKzUB.js";
import { a as A, c as j, d as M, f as te, i as ne, l as re, n as N, o as ie, r as P, s as ae, t as oe, u as se } from "./captions-DV5mDPeu.js";
import { t as ce } from "./Modal-D4vQLxSG.js";
import { t as le } from "./Button-DTiNkl61.js";
import { t as ue } from "./Chip-BE4O7mqB.js";
import { t as de } from "./Spinner-DUnGSjxC.js";
import { t as fe } from "./Badge-D7vacFbh.js";
import { t as pe } from "./EmptyState-DjfWh3kt.js";
import { n as me, r as he, t as ge } from "./SyncPlayModal-Dn1_IfXN.js";
import { n as _e, o as ve, r as ye, t as F } from "./episode-order-DBEVgrOE.js";
import { t as be } from "./Skeleton-DDhrDRE7.js";
import { i as xe } from "./usePageTitle-j6j9gAmo.js";
import { n as Se, r as Ce, t as we } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as I, Transition as Te, computed as L, createBlock as R, createCommentVNode as z, createElementBlock as B, createElementVNode as V, createTextVNode as H, createVNode as U, defineComponent as W, inject as Ee, mergeModels as De, nextTick as Oe, normalizeClass as G, normalizeStyle as K, onBeforeUnmount as ke, onMounted as Ae, onScopeDispose as je, openBlock as q, ref as J, renderList as Y, toDisplayString as X, toRef as Me, unref as Z, useModel as Ne, watch as Q, withCtx as $, withModifiers as Pe } from "vue";
import { onBeforeRouteLeave as Fe, useRoute as Ie, useRouter as Le } from "vue-router";
// src/components/player/transcode.ts
var Re = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function ze(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Be(e) {
	return e === !0 || e === "true" || e === 1;
}
function Ve(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function He(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = ze(e.url ?? e.src);
		r !== "" && t.push({
			index: Ve(e.index),
			language: ze(e.language ?? e.lang ?? e.srclang),
			label: ze(e.label),
			default: Be(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Ue(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Ve(e.height);
		if (r <= 0) continue;
		let i = e.playlist_url ?? e.playlistUrl;
		t.push({
			id: ze(e.id),
			label: ze(e.label),
			height: r,
			width: Ve(e.width),
			bitrate: Ve(e.bitrate),
			...typeof e.url == "string" && e.url !== "" ? { url: e.url } : {},
			...typeof i == "string" && i !== "" ? { playlistUrl: i } : {}
		});
	}
	return t.length > 0 ? t : null;
}
function We(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var Ge = .7, Ke = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], qe = 1e7, Je = "mobile-low";
function Ye(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * Ge;
}
function Xe(e) {
	let t = Ye(e);
	if (t === void 0 || t >= qe) return;
	let n = Je;
	for (let [e, r] of Ke) r <= t && (n = e);
	return n;
}
function Ze(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function Qe(e) {
	let t = e ?? {};
	return {
		jobId: ze(t.job_id ?? t.jobId),
		masterUrl: ze(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: ze(t.status, "running"),
		reused: Be(t.reused),
		subtitles: He(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ue(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function $e(e) {
	let t = e ?? {};
	return {
		jobId: ze(t.job_id ?? t.jobId),
		status: ze(t.status, "running"),
		playlistReady: Be(t.playlist_ready ?? t.playlistReady),
		progress: Ve(t.progress),
		masterUrl: ze(t.master_url ?? t.masterUrl),
		subtitles: He(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ue(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function et(e) {
	return e.playlistReady || e.status === "completed";
}
function tt(e) {
	return Re.has(e);
}
function nt(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
// src/composables/useHlsTranscode.ts
var rt = "_master.m3u8";
function it(e) {
	let t = J("idle"), r = J(0), i = J([]), a = J([]), o = J(-1), s = J(!0), c = J(null), l = J(null), d = J([]), f = J(-1), p = J(!1), m = J(null), g = J(null);
	function _(e) {
		if (!A) return;
		a.value = A.levels, o.value = A.getCurrentLevel(), s.value = A.autoLevelEnabled;
		let t = e ?? A.getCurrentLevel(), n = t >= 0 ? a.value.find((e) => e.index === t) : void 0;
		c.value = n ? n.height : null;
	}
	function v() {
		a.value = [], o.value = -1, s.value = !0, c.value = null, l.value = null;
	}
	function y(e) {
		A && (d.value = A.audioTracks, f.value = e ?? A.getCurrentAudioTrack());
	}
	function b() {
		A && (p.value = A.hasAudio());
	}
	function x() {
		d.value = [], f.value = -1, p.value = !1;
	}
	function ee(t) {
		if (!t || t.length === 0) return;
		let n = e.apiBase(), r = t.map((e) => ({
			...e,
			...e.url ? { url: nt(n, e.url) } : {},
			...e.playlistUrl ? { playlistUrl: nt(n, e.playlistUrl) } : {}
		}));
		re = r, l.value = r;
	}
	function S(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		i.value = t.map((e) => ({
			...e,
			url: nt(n, e.url)
		}));
	}
	let C = e.attach ?? h, w = e.pollIntervalMs ?? 1e3, T = e.maxWaitMs ?? 12e4, E = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), D = Math.max(1, Math.ceil(T / Math.max(1, w))), O = e.getToken ?? at, k = e.probeRungPlaylist ?? ((e) => lt(e, O)), A = null, j = null, M = null, te = null, ne = !1, re = [], N = 0, ie = null, P = 0;
	function ae() {
		return e.client ?? new n({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function oe(n, a, o, s) {
		de(), ne = !1;
		let c = ++P, l = () => ne || c !== P;
		ie = new AbortController(), t.value = "preparing", r.value = 0, i.value = [], v();
		try {
			let i = ae(), c = Qe(await i.post(We(a, o), void 0, ie.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			S(c.subtitles), ee(c.variants), m.value = c.jobId, g.value = nt(e.apiBase(), c.masterUrl);
			let d = c.status === "completed";
			for (let e = 0; !d && e < D; e++) {
				let e = $e(await i.get(Ze(c.jobId), void 0, ie.signal));
				if (l()) return;
				if (r.value = e.progress, S(e.subtitles), ee(e.variants), tt(e.status)) throw Error(`transcode ${e.status}`);
				if (et(e)) {
					d = !0;
					break;
				}
				if (await E(w), l()) return;
			}
			if (!d) throw Error("transcode timed out");
			let f = await C(n, g.value, {
				getToken: O,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => {
					_(), y(), b();
				},
				onError: () => {
					l() || (t.value = "error");
				}
			});
			if (l()) {
				try {
					f.destroy();
				} catch {}
				return;
			}
			A = f, j = A.onLevelSwitched((e) => _(e)), M = A.onAudioTrackSwitched((e) => y(e)), te = A.onLevelLoaded(() => {
				y(), b();
			}), _(), y(), b();
			try {
				let e = u();
				e.hlsMasterUrl = g.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function se(e) {
		A && (A.setCurrentLevel(e === "auto" ? -1 : e), _());
	}
	function ce(e) {
		A && (A.setNextLevel(e === "auto" ? -1 : e), _());
	}
	function le(e) {
		A && (A.setAudioTrack(e), y());
	}
	function ue(e) {
		if (!A || !g.value) return;
		let t = re.find((t) => t.id === e), n = t?.playlistUrl ?? st(g.value, e), r = t?.url ?? ct(g.value, e), i = ++N;
		(async () => {
			let e;
			try {
				e = await k(n);
			} catch {
				e = "unknown";
			}
			!ne && i === N && A && (e === "absent" ? (console.warn(`[phlix-ui] rung mini-master unavailable (${n}) — this server has no per-rung index files; falling back to the legacy bare rung playlist (${r}). Multi-audio titles play silent on the video-only bare rung and the audio menu stays hidden (never a stale rendition list); muxed-audio titles play correctly. The menu returns once the server ships the index.`), A.loadSource(r)) : A.loadSource(n), v());
		})();
	}
	function de() {
		if (ne = !0, N++, ie &&= (ie.abort(), null), j) {
			try {
				j();
			} catch {}
			j = null;
		}
		if (M) {
			try {
				M();
			} catch {}
			M = null;
		}
		if (te) {
			try {
				te();
			} catch {}
			te = null;
		}
		if (A) {
			try {
				A.destroy();
			} catch {}
			A = null;
		}
		re = [], m.value = null, g.value = null;
	}
	function fe() {
		de(), t.value = "idle", r.value = 0, i.value = [], v(), x();
		try {
			u().hlsMasterUrl = "";
		} catch {}
	}
	return {
		state: t,
		progress: r,
		subtitleTracks: i,
		levels: a,
		currentLevel: o,
		autoEnabled: s,
		activeLevelHeight: c,
		variants: l,
		audioTracks: d,
		currentAudioTrack: f,
		hasAudio: p,
		setLevel: se,
		setNextLevel: ce,
		setAudioTrack: le,
		jobId: m,
		masterUrl: g,
		loadVariantPlaylist: ue,
		start: oe,
		cleanup: de,
		reset: fe
	};
}
function at() {
	try {
		return t().getAccessToken();
	} catch {
		return null;
	}
}
function ot(e) {
	let t = e.indexOf("?");
	return t === -1 ? [e, ""] : [e.slice(0, t), e.slice(t)];
}
function st(e, t) {
	let [n, r] = ot(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}${rt}${r}`;
}
function ct(e, t) {
	let [n, r] = ot(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}.m3u8${r}`;
}
async function lt(e, t) {
	try {
		let n = t(), r = await fetch(e, {
			method: "HEAD",
			headers: n ? { Authorization: `Bearer ${n}` } : void 0
		});
		return r.status === 404 ? "absent" : r.ok ? "available" : "unknown";
	} catch {
		return "unknown";
	}
}
// src/composables/useTrickplay.ts
var ut = 10;
function dt(e) {
	let t = J(null), r = J(!1), i = J(null), a = /* @__PURE__ */ new Map();
	function o() {
		return new n({ baseUrl: e.apiBase() });
	}
	function s(e, t) {
		if (!t || t.length === 0) return null;
		if (e >= t[t.length - 1].seconds) return t[t.length - 1];
		if (e <= t[0].seconds) return t[0];
		let n = 0, r = t.length - 1;
		for (; n < r;) {
			let i = Math.floor((n + r) / 2);
			t[i].seconds < e ? n = i + 1 : r = i;
		}
		if (n > 0 && t[n].seconds > e) {
			let r = t[n - 1], i = t[n], a = i.seconds - r.seconds;
			if (a > 0) {
				let t = (e - r.seconds) / a, n = r.frame + t * (i.frame - r.frame);
				return {
					seconds: e,
					frame: Math.round(n)
				};
			}
			return r;
		}
		return t[n];
	}
	function c(e) {
		let n = t.value;
		if (!n || !n.sprite_url || !n.timeline || n.timeline.length === 0) return null;
		let r = s(e, n.timeline);
		if (r === null) return null;
		let i = r.frame, a = i % ut, o = Math.floor(i / ut), c = a / 9 * 100, l = o / 5 * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function l(n, s) {
		if (a.has(n) && (t.value = a.get(n) ?? null, t.value !== null)) return;
		let c = s ?? e.signal;
		if (!c?.aborted) {
			r.value = !0, i.value = null;
			try {
				let e = await o().getTrickplay(n, c);
				a.set(n, e), t.value = e;
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				a.set(n, null), i.value = e instanceof Error ? e.message : "Failed to load trickplay data", t.value = null;
			} finally {
				r.value = !1;
			}
		}
	}
	function u() {
		t.value = null, r.value = !1, i.value = null, a.clear();
	}
	return {
		data: t,
		loading: r,
		error: i,
		thumbnailAt: c,
		fetch: l,
		reset: u
	};
}
// src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var ft = ["aria-label"], pt = { class: "shortcuts__head" }, mt = { class: "shortcuts__title" }, ht = { class: "shortcuts__grid" }, gt = { class: "shortcuts__keys" }, _t = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, vt = {
	key: 1,
	class: "shortcuts__key"
}, yt = { class: "shortcuts__label" }, bt = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => y }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = o(), a = J(null);
		return D(a, Me(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (q(), B("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Pe((e) => r("close"), ["self"])
		}, [V("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Z(i)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [V("div", pt, [V("h3", mt, X(Z(i)("player.keyboard")), 1), U(E, {
			name: "x",
			label: Z(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), V("ul", ht, [(q(!0), B(I, null, Y(e.shortcuts, (e) => (q(), B("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [V("span", gt, [(q(!0), B(I, null, Y(e.keys, (e, t) => (q(), B(I, { key: t }, [e === "–" ? (q(), B("span", _t, "–")) : (q(), B("kbd", vt, [Z(x)[e] ? (q(), R(T, {
			key: 0,
			name: Z(x)[e],
			label: Z(_)[e] ?? e
		}, null, 8, ["name", "label"])) : (q(), B(I, { key: 1 }, [H(X(e), 1)], 64))]))], 64))), 128))]), V("span", yt, X(e.label), 1)]))), 128))])], 8, ft)])) : z("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), xt = { class: "volume" }, St = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "VolumeControl",
	setup(e) {
		let t = u(), n = S(), { t: r } = o(), i = L(() => t.muted ? 0 : t.volume), a = L(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function s(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Q(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (q(), B("div", xt, [U(E, {
			name: a.value,
			label: Z(t).muted ? Z(r)("player.unmute") : Z(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => Z(t).toggleMute()
		}, null, 8, ["name", "label"]), U(O, {
			class: "volume__slider",
			"model-value": i.value,
			min: 0,
			max: 1,
			step: .05,
			label: Z(r)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": s
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), Ct = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "SpeedMenu",
	setup(e) {
		let t = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], n = u(), { t: r } = o(), i = L(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (q(), R(k, {
			class: "speed-menu",
			tone: "glass",
			"model-value": Z(n).rate,
			options: i.value,
			label: Z(r)("player.playbackSpeed"),
			"onUpdate:modelValue": a
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), wt = "auto", Tt = "original";
function Et(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function Dt(e) {
	return e >= 2160 ? "4K" : Et(e);
}
function Ot(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Et(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: Dt(r.height)
		}));
	}
	return n;
}
function kt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Et(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function At(e, t) {
	if (!t || !(t.height > 0)) return -1;
	let n = -1, r = Infinity;
	for (let i of e) {
		if (i.height !== t.height) continue;
		let e = Math.abs(i.bitrate - t.bitrate);
		e < r && (n = i.index, r = e);
	}
	if (n >= 0) return n;
	let i = -1, a = Infinity;
	for (let n of e) if (n.height >= t.height) {
		let e = n.height - t.height;
		e < a && (i = n.index, a = e);
	}
	return i;
}
function jt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Mt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && At(e, n) >= 0;
}
function Nt(e, t) {
	if (t < 0) return wt;
	let n = e.find((e) => e.index === t);
	return n ? Et(n.height) : wt;
}
// src/components/player/QualityMenu.vue
var Pt = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "QualityMenu",
	props: /*@__PURE__*/ De({
		levels: { default: () => [] },
		variants: { default: null },
		currentLevel: { default: -1 },
		autoEnabled: {
			type: Boolean,
			default: !0
		},
		activeHeight: { default: null }
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: /*@__PURE__*/ De(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, i = Ne(e, "open"), a = J(null);
		function s() {
			a.value?.toggleMenu();
		}
		let c = n, l = u(), d = S(), { t: f } = o(), p = L(() => Ot(r.levels)), m = L(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = p.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = Et(i.height);
				e.has(a) || n && kt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: Dt(i.height)
				}));
			}
			return t;
		}), h = L(() => p.value.length >= 2 ? p.value : m.value), g = L(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), _ = L(() => At(r.levels, g.value)), v = L(() => g.value && _.value >= 0 ? {
			value: Tt,
			label: f("player.qualityOriginal", { height: g.value.height })
		} : null), y = L(() => h.value.length >= 2), b = L(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: Dt(r.activeHeight) })), x = L(() => [
			{
				value: wt,
				label: b.value
			},
			...v.value ? [v.value] : [],
			...h.value
		]), ee = L(() => r.autoEnabled ? wt : v.value && r.currentLevel === _.value && (l.quality === "original" || d.defaultQuality === "original") ? Tt : Nt(r.levels, r.currentLevel));
		function C(e) {
			let t = String(e);
			if (t === "auto") {
				l.setQuality(t), d.defaultQuality = t, c("select", "auto");
				return;
			}
			let n = t === "original" ? _.value : kt(r.levels, t);
			l.setQuality(t), d.defaultQuality = t, n >= 0 ? c("select", n) : c("select", t);
		}
		return t({ toggleMenu: s }), (e, t) => y.value || i.value ? (q(), R(k, {
			key: 0,
			ref_key: "selectRef",
			ref: a,
			class: "quality-menu",
			tone: "glass",
			"model-value": ee.value,
			options: x.value,
			label: Z(f)("player.quality"),
			open: i.value,
			"onUpdate:open": t[0] ||= (e) => i.value = e,
			"onUpdate:modelValue": C
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : z("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), Ft = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = J([]), i = J(0), a = L(() => n.lifted ? i.value : 0), o = L(() => ({
			...j(n.styleConfig),
			"--phlix-sub-offset": `${a.value}px`
		})), s = null;
		function c() {
			let e = n.controlsRoot;
			i.value = e && typeof e.offsetHeight == "number" ? e.offsetHeight : 0;
		}
		function l() {
			s?.disconnect(), s = null;
		}
		function u() {
			l(), c();
			let e = n.controlsRoot;
			e && typeof ResizeObserver < "u" && (s = new ResizeObserver(() => c()), s.observe(e));
		}
		Q(() => n.controlsRoot, u, { immediate: !0 }), ke(l);
		let d = null, f = null, p = null;
		function m() {
			r.value = M(d);
		}
		function h() {
			p != null && (clearTimeout(p), p = null);
		}
		function g() {
			h(), p = setTimeout(() => {
				if (p = null, !d) return;
				ae(n.video, n.language);
				let e = M(d);
				e.length && (r.value = e);
			}, 0);
		}
		function _() {
			h(), d?.removeEventListener("cuechange", m), f?.removeEventListener("load", m), d = null, f = null;
		}
		function v(e, t) {
			let n = e?.querySelectorAll?.("track");
			if (!n) return null;
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r.track === t) return r;
			}
			return null;
		}
		function y() {
			_(), ae(n.video, n.language);
			let e = te(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = M(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return Q(() => [n.video, n.language], y, { immediate: !0 }), ke(_), t({ lines: r }), (t, n) => r.value.length ? (q(), B("div", {
			key: 0,
			class: G(["player__captions", { "is-lifted": e.lifted }]),
			style: K(o.value)
		}, [(q(!0), B(I, null, Y(r.value, (e, t) => (q(), B("p", {
			key: t,
			class: "player__caption-line"
		}, X(e), 1))), 128))], 6)) : z("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), It = ["aria-label", "aria-expanded"], Lt = ["aria-label"], Rt = { class: "capmenu__head" }, zt = { class: "capmenu__title" }, Bt = ["aria-label"], Vt = ["aria-checked", "tabindex"], Ht = { class: "capmenu__check" }, Ut = { class: "capmenu__optlabel" }, Wt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Gt = { class: "capmenu__check" }, Kt = { class: "capmenu__optlabel" }, qt = { class: "capmenu__check" }, Jt = { class: "capmenu__optlabel" }, Yt = { class: "capmenu__title capmenu__title--sub" }, Xt = ["aria-label"], Zt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Qt = { class: "capmenu__check" }, $t = { class: "capmenu__optlabel" }, en = { class: "capmenu__title capmenu__title--sub" }, tn = { class: "capmenu__style" }, nn = { class: "capmenu__field" }, rn = { class: "capmenu__fieldlabel" }, an = { class: "capmenu__field" }, on = { class: "capmenu__fieldlabel" }, sn = { class: "capmenu__field" }, cn = { class: "capmenu__fieldlabel" }, ln = { class: "capmenu__field" }, un = { class: "capmenu__fieldlabel" }, dn = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "CaptionsMenu",
	props: {
		tracks: { default: () => [] },
		audioTracks: { default: () => [] },
		activeAudio: { default: -1 },
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"update:open",
		"select-audio",
		"add-subtitles"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = u(), a = S(), { t: s } = o(), c = J(null), l = J(null), d = L(() => i.subtitleLang), f = L(() => n.tracks.some((e) => e.language === d.value)), p = L(() => f.value ? "captions" : "captions-off"), m = L(() => f.value ? n.tracks.findIndex((e) => e.language === d.value) + 1 : 0), h = L(() => n.activeAudio >= 0 ? n.activeAudio : 0);
		function g(e) {
			r("update:open", e);
		}
		function _() {
			g(!1);
		}
		function v(e) {
			i.setSubtitle(e), a.defaultSubtitleLang = e, a.subtitlePreferenceSet = !0;
		}
		function y(e) {
			r("select-audio", e);
		}
		function b() {
			r("add-subtitles"), _();
		}
		function x(e, t, n) {
			if (t === 0) return null;
			let r;
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
		function ee(e) {
			let t = x(e, n.tracks.length + 1, m.value);
			t !== null && v(t === 0 ? null : n.tracks[t - 1].language);
		}
		function C(e) {
			let t = x(e, n.audioTracks.length, h.value);
			t !== null && y(n.audioTracks[t].index);
		}
		function w(e) {
			a.captionStyle = {
				...a.captionStyle,
				size: e
			};
		}
		function O(e) {
			a.captionStyle = {
				...a.captionStyle,
				textColor: String(e)
			};
		}
		function A(e) {
			a.captionStyle = {
				...a.captionStyle,
				background: e
			};
		}
		function j(e) {
			a.captionStyle = {
				...a.captionStyle,
				edge: e
			};
		}
		D(l, Me(n, "open"), {
			lockScroll: !1,
			onEscape: () => (_(), !0)
		});
		function M(e) {
			c.value && !c.value.contains(e.target) && _();
		}
		return Q(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", M, !0) : document.removeEventListener("pointerdown", M, !0));
		}, { immediate: !0 }), ke(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", M, !0);
		}), (t, n) => (q(), B("div", {
			ref_key: "rootEl",
			ref: c,
			class: "capmenu"
		}, [V("button", {
			type: "button",
			class: G(["capmenu__btn", { "is-active": f.value }]),
			"aria-label": f.value ? Z(s)("player.captionsOn") : Z(s)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => g(!e.open)
		}, [U(T, { name: p.value }, null, 8, ["name"])], 10, It), e.open ? (q(), B("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Z(s)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			V("div", Rt, [V("h3", zt, X(Z(s)("player.subtitles")), 1), U(E, {
				name: "x",
				label: Z(s)("common.close"),
				size: "sm",
				onClick: _
			}, null, 8, ["label"])]),
			V("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Z(s)("player.subtitleTrack"),
				onKeydown: ee
			}, [V("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !f.value,
				tabindex: m.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => v(null)
			}, [V("span", Ht, [f.value ? z("", !0) : (q(), R(T, {
				key: 0,
				name: "check"
			}))]), V("span", Ut, X(Z(s)("player.off")), 1)], 8, Vt), (q(!0), B(I, null, Y(e.tracks, (e, t) => (q(), B("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": d.value === e.language,
				tabindex: m.value === t + 1 ? 0 : -1,
				onClick: (t) => v(e.language)
			}, [V("span", Gt, [d.value === e.language ? (q(), R(T, {
				key: 0,
				name: "check"
			})) : z("", !0)]), V("span", Kt, X(e.label), 1)], 8, Wt))), 128))], 40, Bt),
			V("button", {
				type: "button",
				class: "capmenu__add",
				onClick: b
			}, [V("span", qt, [U(T, { name: "plus" })]), V("span", Jt, X(Z(s)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 0 ? (q(), B(I, { key: 0 }, [V("h3", Yt, X(Z(s)("player.audio")), 1), V("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Z(s)("player.audioTrack"),
				onKeydown: C
			}, [(q(!0), B(I, null, Y(e.audioTracks, (t) => (q(), B("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: h.value === t.index ? 0 : -1,
				onClick: (e) => y(t.index)
			}, [V("span", Qt, [e.activeAudio === t.index ? (q(), R(T, {
				key: 0,
				name: "check"
			})) : z("", !0)]), V("span", $t, X(t.label), 1)], 8, Zt))), 128))], 40, Xt)], 64)) : z("", !0),
			V("h3", en, X(Z(s)("player.captionStyle")), 1),
			V("div", tn, [
				V("div", nn, [V("span", rn, X(Z(s)("player.size")), 1), U(k, {
					"model-value": Z(a).captionStyle.size,
					options: Z(ne),
					label: Z(s)("player.captionSize"),
					"onUpdate:modelValue": w
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				V("div", an, [V("span", on, X(Z(s)("player.color")), 1), U(k, {
					"model-value": Z(a).captionStyle.textColor,
					options: Z(N),
					label: Z(s)("player.captionColor"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				V("div", sn, [V("span", cn, X(Z(s)("player.background")), 1), U(k, {
					"model-value": Z(a).captionStyle.background,
					options: Z(oe),
					label: Z(s)("player.captionBackground"),
					"onUpdate:modelValue": A
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				V("div", ln, [V("span", un, X(Z(s)("player.edge")), 1), U(k, {
					"model-value": Z(a).captionStyle.edge,
					options: Z(P),
					label: Z(s)("player.captionEdge"),
					"onUpdate:modelValue": j
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Lt)) : z("", !0)], 512));
	}
}), [["__scopeId", "data-v-12f05479"]]), fn = { class: "subsearch" }, pn = { class: "subsearch__langs" }, mn = { class: "subsearch__legend" }, hn = { class: "subsearch__chips" }, gn = { class: "subsearch__actions" }, _n = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, vn = {
	key: 2,
	class: "subsearch__prompt"
}, yn = {
	key: 3,
	class: "subsearch__list"
}, bn = { class: "subsearch__meta" }, xn = { class: "subsearch__release" }, Sn = { class: "subsearch__signals" }, Cn = { class: "subsearch__provider" }, wn = ["aria-label"], Tn = {
	key: 2,
	class: "subsearch__stat"
}, En = {
	key: 3,
	class: "subsearch__stat"
}, Dn = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "SubtitleSearch",
	props: {
		open: {
			type: Boolean,
			default: !1
		},
		mediaId: {},
		apiBase: { default: "" },
		preferredLangs: { default: () => [] },
		client: { default: void 0 }
	},
	emits: ["update:open", "added"],
	setup(t, { emit: r }) {
		let i = t, a = r, { t: s } = o(), c = C(), l = [
			"en",
			"es",
			"fr",
			"de",
			"it",
			"pt",
			"nl",
			"ru",
			"ja",
			"ko",
			"zh",
			"ar"
		];
		function u(e) {
			if (!e) return e;
			try {
				let t = Intl.DisplayNames;
				if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
			} catch {}
			return e;
		}
		let d = L(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...i.preferredLangs, ...l]) {
				let r = (n || "").toLowerCase();
				r && !e.has(r) && (e.add(r), t.push(r));
			}
			return t;
		}), f = J(/* @__PURE__ */ new Set());
		function p() {
			let e = /* @__PURE__ */ new Set();
			for (let t of i.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), f.value = e;
		}
		function m(e) {
			let t = new Set(f.value);
			t.has(e) ? t.delete(e) : t.add(e), f.value = t;
		}
		let h = J(!1), g = J(!1), _ = J([]), v = J(/* @__PURE__ */ new Set()), y = J(/* @__PURE__ */ new Set());
		function b(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let x = L(() => [..._.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), ee = L(() => f.value.size > 0 && !h.value);
		function S() {
			return i.client ?? new n({ baseUrl: i.apiBase ?? "" });
		}
		async function w() {
			if (ee.value) {
				h.value = !0, g.value = !0;
				try {
					_.value = await S().searchSubtitles(i.mediaId, [...f.value]);
				} catch {
					_.value = [], c.error(s("player.subtitleSearchError"));
				} finally {
					h.value = !1;
				}
			}
		}
		function E() {
			a("update:open", !1);
		}
		function D(t) {
			if (t instanceof e) {
				if (t.status === 429) {
					let e = t.body && typeof t.body == "object" ? t.body : {}, n = typeof e.downloadsRemaining == "number" ? e.downloadsRemaining : null, r = typeof e.resetTimeUtc == "string" ? e.resetTimeUtc : null;
					r ? c.warning(s("player.subtitleQuotaReset", { time: O(r) })) : n === null ? c.warning(s("player.subtitleQuota")) : c.warning(s("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (t.status === 404) {
					c.error(s("player.subtitleAddNotFound"));
					return;
				}
			}
			c.error(s("player.subtitleAddError"));
		}
		function O(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function k(e) {
			let t = b(e);
			if (v.value.has(t) || y.value.has(t)) return;
			let n = new Set(v.value);
			n.add(t), v.value = n;
			try {
				let n = He([(await S().downloadSubtitle(i.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], r = new Set(y.value);
				r.add(t), y.value = r;
				let o = u(e.language);
				c.success(o ? s("player.subtitleAdded", { language: o }) : s("player.subtitleAddedGeneric")), n && a("added", n);
			} catch (e) {
				D(e);
			} finally {
				let e = new Set(v.value);
				e.delete(t), v.value = e;
			}
		}
		return Q(() => i.open, (e) => {
			e && (p(), _.value = [], g.value = !1, h.value = !1, v.value = /* @__PURE__ */ new Set(), y.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (e, n) => (q(), R(ce, {
			"model-value": t.open,
			title: Z(s)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: $(() => [U(le, {
				variant: "ghost",
				onClick: E
			}, {
				default: $(() => [H(X(Z(s)("common.close")), 1)]),
				_: 1
			})]),
			default: $(() => [V("div", fn, [
				V("fieldset", pn, [V("legend", mn, X(Z(s)("player.subtitleSearchLanguages")), 1), V("div", hn, [(q(!0), B(I, null, Y(d.value, (e) => (q(), R(ue, {
					key: e,
					selected: f.value.has(e),
					size: "md",
					"aria-label": u(e),
					"onUpdate:selected": (t) => m(e)
				}, {
					default: $(() => [H(X(u(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				V("div", gn, [U(le, {
					variant: "solid",
					"left-icon": "search",
					loading: h.value,
					disabled: !ee.value,
					onClick: w
				}, {
					default: $(() => [H(X(Z(s)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				h.value ? (q(), B("div", _n, [U(de, { label: Z(s)("player.subtitleSearching") }, null, 8, ["label"]), V("span", null, X(Z(s)("player.subtitleSearching")), 1)])) : g.value && x.value.length === 0 ? (q(), R(pe, {
					key: 1,
					icon: "captions",
					title: Z(s)("player.subtitleSearchEmpty"),
					description: Z(s)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : g.value ? (q(), B("ul", yn, [(q(!0), B(I, null, Y(x.value, (e) => (q(), B("li", {
					key: b(e),
					class: "subsearch__item"
				}, [V("div", bn, [V("p", xn, X(e.releaseName || e.provider), 1), V("div", Sn, [
					U(fe, {
						tone: "neutral",
						size: "sm"
					}, {
						default: $(() => [H(X(u(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (q(), R(fe, {
						key: 0,
						tone: "info",
						size: "sm",
						label: Z(s)("player.subtitleHearingImpairedFull")
					}, {
						default: $(() => [H(X(Z(s)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : z("", !0),
					V("span", Cn, X(e.provider), 1),
					e.rating > 0 ? (q(), B("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": Z(s)("player.subtitleRating", { rating: e.rating })
					}, [U(T, { name: "star" }), H(" " + X(e.rating), 1)], 8, wn)) : z("", !0),
					e.downloadCount > 0 ? (q(), B("span", Tn, X(Z(s)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : z("", !0),
					e.fps ? (q(), B("span", En, X(Z(s)("player.subtitleFps", { fps: e.fps })), 1)) : z("", !0)
				])]), U(le, {
					variant: "outline",
					size: "sm",
					"left-icon": y.value.has(b(e)) ? "check" : "plus",
					loading: v.value.has(b(e)),
					disabled: v.value.has(b(e)) || y.value.has(b(e)),
					"aria-label": Z(s)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => k(e)
				}, {
					default: $(() => [H(X(v.value.has(b(e)) ? Z(s)("player.subtitleAdding") : Z(s)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (q(), B("p", vn, X(Z(s)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), On = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function kn(e, t, n, r, i, a, o) {
	let s = Math.max(0, Math.min(t, Math.floor(r))), c = Math.max(0, Math.min(n, Math.floor(i))), l = Math.max(s, Math.min(t, Math.ceil(a))), u = Math.max(c, Math.min(n, Math.ceil(o))), d = 0, f = 0, p = 0, m = 0;
	for (let n = c; n < u; n++) for (let r = s; r < l; r++) {
		let i = (n * t + r) * 4;
		d += e[i], f += e[i + 1], p += e[i + 2], m++;
	}
	return m === 0 ? {
		r: 0,
		g: 0,
		b: 0
	} : {
		r: On(d / m),
		g: On(f / m),
		b: On(p / m)
	};
}
function An(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: kn(e, t, n, 0, 0, r, n),
		right: kn(e, t, n, t - r, 0, t, n),
		center: kn(e, t, n, 0, 0, t, n)
	};
}
function jn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
var Mn = (e) => `${Math.round(e * 1e3) / 10}%`;
function Nn(e, t = 1) {
	return Pn(e, t).map((e) => `radial-gradient(${Mn(e.rx)} ${Mn(e.ry)} at ${Mn(e.cx)} ${Mn(e.cy)}, ${jn(e.color, e.alpha)}, transparent ${Mn(e.stop)})`).join(", ");
}
function Pn(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		{
			cx: .12,
			cy: .3,
			rx: .4,
			ry: .6,
			color: e.left,
			alpha: n(.55),
			stop: .7
		},
		{
			cx: .88,
			cy: .7,
			rx: .45,
			ry: .55,
			color: e.right,
			alpha: n(.5),
			stop: .7
		},
		{
			cx: .5,
			cy: .5,
			rx: .5,
			ry: .5,
			color: e.center,
			alpha: n(.3),
			stop: .75
		}
	];
}
function Fn(e, t) {
	e.clearRect(0, 0, 112, 72), e.filter = "blur(3px)";
	for (let n of t) {
		let t = 8 + n.cx * 96, r = 9 + n.cy * 54, i = n.rx * 96, a = n.ry * 54;
		e.save(), e.translate(t, r), e.scale(i, a);
		let o = e.createRadialGradient(0, 0, 0, 0, 0, 1), { r: s, g: c, b: l } = n.color;
		o.addColorStop(0, jn(n.color, n.alpha)), o.addColorStop(n.stop, `rgba(${s}, ${c}, ${l}, 0)`), e.fillStyle = o, e.fillRect((8 - t) / i, (9 - r) / a, 96 / i, 54 / a), e.restore();
	}
}
function In(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var Ln = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "AmbientCanvas",
	props: {
		video: { default: null },
		enabled: {
			type: Boolean,
			default: !0
		},
		playing: {
			type: Boolean,
			default: !1
		},
		reducedMotion: {
			type: Boolean,
			default: !1
		},
		intensity: { default: 1 }
	},
	setup(e, { expose: t }) {
		let n = e, r = J(!1), i = null;
		function a() {
			r.value = In(i);
		}
		let o = L(() => n.enabled && !n.reducedMotion && !r.value), s = L(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = J(null), l = J(null), u = null, d = null, f = !1;
		function p(e) {
			if (f || typeof document > "u") return null;
			try {
				if (!d && (u = document.createElement("canvas"), u.width = 112, u.height = 72, d = u.getContext("2d"), !d)) throw Error("no 2d context");
				Fn(d, Pn(e));
				let t = u?.toDataURL("image/png");
				if (typeof t != "string" || !t.startsWith("data:image/")) throw Error("no bitmap");
				return t;
			} catch {
				return f = !0, d = null, u = null, null;
			}
		}
		let m = null, h = null, g = !1, _ = !1;
		function v() {
			if (g) return h;
			if (_ || typeof document > "u") return _ = !0, null;
			m = document.createElement("canvas"), m.width = 32, m.height = 18;
			try {
				h = m.getContext("2d", { willReadFrequently: !0 });
			} catch {
				h = null;
			}
			return h ? (g = !0, h) : (_ = !0, null);
		}
		function y() {
			let e = n.video;
			if (!o.value || !e || !e.videoWidth || !e.videoHeight) return;
			let t = v();
			if (t) try {
				t.drawImage(e, 0, 0, 32, 18);
				let { data: n } = t.getImageData(0, 0, 32, 18), r = An(n, 32, 18), i = p(r);
				l.value = i, c.value = i ? null : Nn(r);
			} catch {
				_ = !0, c.value = null, l.value = null;
			}
		}
		function b(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let x = null, ee = null, S = null, C = 0, w = !1;
		function T(e) {
			ee = e, x = e.requestVideoFrameCallback(E);
		}
		function E(e) {
			if (!w) return;
			e - C >= 250 && (C = e, y());
			let t = n.video;
			b(t) && T(t);
		}
		function D() {
			if (w || !o.value || !n.video) return;
			let e = n.video;
			b(e) ? (w = !0, C = 0, T(e)) : (y(), _ || (w = !0, S = setInterval(y, 250)));
		}
		function O() {
			w = !1, x != null && ee && ee.cancelVideoFrameCallback(x), x = null, ee = null, S != null && (clearInterval(S), S = null);
		}
		Q(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			O(), e && t && D();
		}, { immediate: !0 }), Ae(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ke(() => {
			O(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let k = L(() => {
			let e = { opacity: String(s.value) };
			return l.value ? e.backgroundImage = `url("${l.value}")` : c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: y }), (e, t) => (q(), B("div", {
			class: G(["player__ambient", {
				"is-active": o.value,
				"is-bitmap": o.value && !!l.value
			}]),
			style: K(o.value ? k.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-ba42f7c0"]]), Rn = ["aria-label"], zn = { class: "resume__label" }, Bn = { class: "resume__time numeric" }, Vn = { class: "resume__actions" }, Hn = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = o(), i = L(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (q(), B("div", {
			class: "resume",
			role: "region",
			"aria-label": Z(r)("player.resumePlayback")
		}, [V("p", zn, [
			H(X(i.value[0]), 1),
			V("span", Bn, X(Z(b)(e.seconds)), 1),
			H(X(i.value[1]), 1)
		]), V("div", Vn, [V("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [U(T, { name: "play" }), V("span", null, X(Z(r)("player.resume")), 1)]), V("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [U(T, { name: "rewind" }), V("span", null, X(Z(r)("player.startOver")), 1)])])], 8, Rn));
	}
}), [["__scopeId", "data-v-271c5209"]]), Un = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Wn = /* @__PURE__ */ new Set([
	"mkv",
	"avi",
	"wmv",
	"flv",
	"ts",
	"m2ts",
	"mts",
	"mpg",
	"mpeg",
	"vob",
	"divx",
	"3gp",
	"rmvb"
]);
function Gn(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Kn(...e) {
	return e.some((e) => Wn.has(Gn(e)));
}
function qn(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Jn(e) {
	return e?.error?.code === 2;
}
var Yn = 3e4;
function Xn(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && rr.get(t) === "hevc";
}
function Zn(e) {
	let t = { forceTranscode: "1" };
	return Xn(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function Qn(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
function $n(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = typeof e.index == "number" && Number.isInteger(e.index) && e.index >= 0 ? e.index : t.length, i = typeof e.language == "string" ? e.language : "", a = typeof e.title == "string" ? e.title : "", o = e.stream_index ?? e.streamIndex, s = typeof e.codec == "string" ? e.codec : "";
		t.push({
			index: r,
			streamIndex: typeof o == "number" ? o : r,
			language: i,
			label: a || i || `Audio ${r + 1}`,
			default: e.default === !0,
			codec: s
		});
	}
	return t;
}
var er = 2 * Math.PI * 15;
function tr(e, t, n = er) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var nr = /* @__PURE__ */ new Map([
	["aac", "mp4a.40.2"],
	["aac-latm", "mp4a.40.2"],
	["ac3", "ac-3"],
	["eac3", "ec-3"],
	["ec3", "ec-3"],
	["dts", "dtsc"],
	["dtshd", "dtshd"],
	["mp3", "mp4a.40.34"],
	["opus", "opus"],
	["vorbis", "vorbis"],
	["flac", "flac"],
	["truehd", "mlp"]
]), rr = /* @__PURE__ */ new Map([
	["h264", "h264"],
	["avc", "h264"],
	["avc1", "h264"],
	["x264", "h264"],
	["hevc", "hevc"],
	["h265", "hevc"],
	["hvc1", "hevc"],
	["hev1", "hevc"],
	["x265", "hevc"],
	["av1", "av1"],
	["av01", "av1"],
	["vp9", "vp9"],
	["vp09", "vp9"],
	["vp8", "vp8"],
	["vp08", "vp8"],
	["theora", "theora"]
]), ir = /* @__PURE__ */ new Set(["h264"]), ar = /* @__PURE__ */ new Map([
	["hevc", [
		"hvc1.1.6.L93.B0",
		"hvc1.1.4.L120.90",
		"hev1.1.4.L120.90",
		"hvc1.1.4.L120"
	]],
	["av1", ["av01.0.08M.08", "av01.0.05M.08"]],
	["vp9", ["vp09.00.10.08", "vp9"]],
	["vp8", ["vp8"]],
	["theora", ["theora"]]
]);
function or(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = rr.get(t);
	return n === void 0 ? "transcode" : ir.has(n) ? "direct" : "probe";
}
function sr(e) {
	if (!Array.isArray(e)) return "";
	for (let t of e) {
		if (typeof t != "object" || !t) continue;
		let e = t, n = e.stream_type ?? e.streamType;
		if (typeof n != "string" || n.trim().toLowerCase() !== "video") continue;
		let r = typeof e.codec == "string" ? e.codec.trim() : "";
		if (r !== "") return r;
	}
	return "";
}
var cr = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function lr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return cr.get(t) ?? "video/mp4";
}
function ur(e, t = "video/mp4") {
	let n = nr.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function dr(e, t = "video/mp4") {
	if (!e) return !0;
	let n = ur(e, t);
	if (!n) return !1;
	if (typeof navigator < "u" && typeof navigator.mediaCapabilities?.decodingInfo == "function") try {
		return (await navigator.mediaCapabilities.decodingInfo({
			type: "media-source",
			video: {
				contentType: t,
				width: 1920,
				height: 1080,
				bitrate: 1e7,
				framerate: 30
			},
			audio: {
				contentType: n,
				channels: 6,
				bitrate: 384e3,
				samplerate: 48e3
			}
		})).supported;
	} catch {}
	if (typeof document < "u") {
		let e = document.createElement("video").canPlayType(n);
		return e === "probably" || e === "maybe";
	}
	return !1;
}
async function fr(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = rr.get(n), i = r === void 0 ? void 0 : ar.get(r);
	if (!i || i.length === 0 || typeof navigator > "u") return !1;
	let a = navigator.mediaCapabilities;
	if (a && typeof a.decodingInfo == "function") try {
		if ((await a.decodingInfo({
			type: "media-source",
			video: {
				contentType: `${t}; codecs="${i[0]}"`,
				width: 3840,
				height: 2160,
				bitrate: 5e7,
				framerate: 60
			}
		})).supported) return !0;
	} catch {}
	if (typeof document < "u") {
		let e = document.createElement("video");
		for (let n of i) {
			let r = e.canPlayType(`${t}; codecs="${n}"`);
			if (r === "probably" || r === "maybe") return !0;
		}
	}
	return !1;
}
async function pr(e, t, n = "") {
	if (Kn(...e)) return !0;
	let r = e.map((e) => Gn(e)).find((e) => Un.includes(e)) ?? "";
	if (!Un.includes(r)) return !1;
	let i = lr(r), a = or(n);
	if (a === "transcode" || a === "probe" && !await fr(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await dr(e.codec, i)) return !0;
	}
	return !1;
}
// src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var mr = ["aria-label"], hr = ["src"], gr = { class: "upnext__body" }, _r = { class: "upnext__eyebrow" }, vr = { class: "upnext__title" }, yr = {
	key: 0,
	class: "upnext__cd numeric"
}, br = { class: "upnext__actions" }, xr = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Sr = ["r"], Cr = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], wr = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "UpNext",
	props: {
		media: {},
		remaining: { default: 0 },
		total: { default: 0 },
		counting: {
			type: Boolean,
			default: !1
		},
		posterUrl: { default: void 0 }
	},
	emits: ["play-now", "cancel"],
	setup(e, { emit: t }) {
		let { t: n } = o(), { imgSrc: r } = c(), i = e, a = t, s = L(() => i.posterUrl ?? i.media.poster_url ?? null), l = L(() => tr(i.remaining, i.total));
		return (t, i) => (q(), B("aside", {
			class: "upnext",
			role: "region",
			"aria-label": Z(n)("player.upNext")
		}, [
			s.value ? (q(), B("img", {
				key: 0,
				class: "upnext__thumb",
				src: Z(r)(s.value),
				alt: "",
				loading: "lazy"
			}, null, 8, hr)) : z("", !0),
			V("div", gr, [
				V("p", _r, X(Z(n)("player.upNext")), 1),
				V("h4", vr, X(e.media.name), 1),
				e.counting ? (q(), B("p", yr, X(e.remaining > 0 ? Z(n)("player.startsIn", { count: e.remaining }) : Z(n)("player.startingNow")), 1)) : z("", !0),
				V("div", br, [V("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [U(T, { name: "play" }), V("span", null, X(Z(n)("player.playNow")), 1)]), V("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, X(Z(n)("player.cancel")), 1)])
			]),
			e.counting ? (q(), B("svg", xr, [V("circle", {
				cx: "18",
				cy: "18",
				r: Z(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Sr), V("circle", {
				cx: "18",
				cy: "18",
				r: Z(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Z(er),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Cr)])) : z("", !0)
		], 8, mr));
	}
}), [["__scopeId", "data-v-3fc667d0"]]), Tr = {
	class: "transcode",
	role: "alert"
}, Er = { class: "transcode__card" }, Dr = { class: "transcode__heading" }, Or = { class: "transcode__body" }, kr = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = o();
		return (t, i) => (q(), B("div", Tr, [V("div", Er, [
			U(T, {
				name: "alert",
				class: "transcode__icon"
			}),
			V("h3", Dr, X(Z(r)("player.transcodeHeading")), 1),
			V("p", Or, X(e.title ? Z(r)("player.transcodeBodyTitled", { title: e.title }) : Z(r)("player.transcodeBodyUntitled")), 1),
			V("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [U(T, { name: "arrow-left" }), V("span", null, X(Z(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Ar = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, jr = { class: "prep__card" }, Mr = { class: "prep__heading" }, Nr = { class: "prep__body" }, Pr = ["aria-valuenow"], Fr = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = o(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (q(), B("div", Ar, [V("div", jr, [
			U(T, {
				name: "spinner",
				class: "prep__spinner"
			}),
			V("h3", Mr, X(Z(n)("player.transcodePreparingHeading")), 1),
			V("p", Nr, X(e.title ? Z(n)("player.transcodePreparingTitled", { title: e.title }) : Z(n)("player.transcodePreparingUntitled")), 1),
			V("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [V("div", {
				class: "prep__bar-fill",
				style: K({ width: r() + "%" })
			}, null, 4)], 8, Pr),
			V("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [U(T, { name: "arrow-left" }), V("span", null, X(Z(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Ir = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = o();
		function a(e, t) {
			return !!t && t.end > t.start && e >= t.start && e < t.end;
		}
		let s = L(() => a(n.position, n.introMarker) ? {
			label: i("player.skipIntro"),
			target: n.introMarker.end
		} : a(n.position, n.outroMarker) ? {
			label: i("player.skipOutro"),
			target: n.outroMarker.end
		} : null);
		function c() {
			s.value && r("skip", s.value.target);
		}
		return (e, t) => (q(), R(Te, { name: "skip" }, {
			default: $(() => [s.value ? (q(), B("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Pe(c, ["stop"])
			}, [V("span", null, X(s.value.label), 1), U(T, { name: "skip-forward" })])) : z("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Lr = ["aria-label"], Rr = ["aria-label", "onClick"], zr = { class: "skip-controls__label" }, Br = 5, Vr = 30, Hr = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = o();
		function a(e) {
			return e / 1e3;
		}
		function s(e, t) {
			return t >= a(e.endMs);
		}
		function c(e, t) {
			if (s(e, t)) return !1;
			let n = a(e.startMs), r = n - Br, i = n + Vr;
			return t >= r && t < i;
		}
		let l = [
			"intro",
			"outro",
			"credits"
		];
		function u(e) {
			switch (e) {
				case "intro": return i("player.skipLabelIntro");
				case "outro": return i("player.skipLabelCredits");
				case "credits": return i("player.skipLabelCredits");
				case "ad": return i("player.skipLabelSkipCredits");
			}
		}
		let d = L(() => !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => l.includes(e.type) && c(e, n.position)).sort((e, t) => e.startMs - t.startMs));
		function f(e) {
			r("skip", a(e.startMs));
		}
		return (e, t) => d.value.length > 0 ? (q(), B("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": Z(i)("player.skipControls")
		}, [(q(!0), B(I, null, Y(d.value, (e) => (q(), B("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${u(e.type)}`,
			onClick: Pe((t) => f(e), ["stop"])
		}, [V("span", zr, X(u(e.type)), 1), U(T, { name: "skip-forward" })], 8, Rr))), 128))], 8, Lr)) : z("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Ur = ["aria-label", "aria-expanded"], Wr = ["aria-label"], Gr = { class: "chapterlist__head" }, Kr = { class: "chapterlist__title" }, qr = ["aria-label"], Jr = ["onClick"], Yr = { class: "chapterlist__index" }, Xr = { class: "chapterlist__name" }, Zr = { class: "chapterlist__meta" }, Qr = { class: "chapterlist__time" }, $r = {
	key: 0,
	class: "chapterlist__duration"
}, ei = {
	key: 1,
	class: "chapterlist__empty"
}, ti = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "ChapterList",
	props: {
		chapters: { default: () => [] },
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "seek"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = o();
		function a() {
			r("update:open", !1);
		}
		function s() {
			r("update:open", !n.open);
		}
		let c = L(() => n.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = b(e.start), a;
			if (e.end != null && e.end > e.start) {
				let t = e.end - e.start;
				a = b(t);
			}
			return {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), l = J(null), u = J(null);
		D(u, Me(n, "open"), {
			lockScroll: !1,
			onEscape: () => (a(), !0)
		});
		function d(e) {
			l.value && !l.value.contains(e.target) && a();
		}
		Q(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", d, !0) : document.removeEventListener("pointerdown", d, !0));
		}), ke(() => {
			document.removeEventListener("pointerdown", d, !0);
		});
		function f(e) {
			r("seek", e.start), a();
		}
		return (t, n) => (q(), B("div", {
			ref_key: "rootEl",
			ref: l,
			class: "chapterlist"
		}, [V("button", {
			type: "button",
			class: G(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": Z(i)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: s
		}, [U(T, { name: "list" })], 10, Ur), e.open ? (q(), B("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Z(i)("player.chapterList"),
			tabindex: "-1"
		}, [V("div", Gr, [V("h3", Kr, X(Z(i)("player.chapters")), 1), U(E, {
			name: "x",
			label: Z(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), c.value.length > 0 ? (q(), B("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": Z(i)("player.chapterList")
		}, [(q(!0), B(I, null, Y(c.value, (e) => (q(), B("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [V("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => f(e.chapter)
		}, [
			V("span", Yr, X(e.index), 1),
			V("span", Xr, X(e.label), 1),
			V("span", Zr, [V("span", Qr, X(e.startLabel), 1), e.durationLabel ? (q(), B("span", $r, "· " + X(e.durationLabel), 1)) : z("", !0)])
		], 8, Jr)]))), 128))], 8, qr)) : (q(), B("p", ei, X(Z(i)("player.noChapters")), 1))], 8, Wr)) : z("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ni = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, ri = { class: "marker-timeline__ticks" }, ii = [
	"title",
	"aria-label",
	"onClick"
], ai = { class: "marker-timeline__tooltip" }, oi = { class: "marker-timeline__tooltip-label" }, si = { class: "marker-timeline__tooltip-time numeric" }, ci = ["onClick"], li = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "MarkerTimeline",
	props: {
		position: {},
		duration: {},
		markers: {}
	},
	emits: ["seek", "similar"],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function i(e) {
			return e / 1e3;
		}
		let a = {
			intro: "var(--marker-intro, #3b82f6)",
			outro: "var(--marker-outro, #f97316)",
			credits: "var(--marker-credits, #a855f7)",
			ad: "var(--marker-ad, #ef4444)"
		};
		function o(e) {
			return a[e];
		}
		let s = L(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = L(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = L(() => c.value !== null), u = L(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (q(), B("div", {
			key: 0,
			class: G(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (q(), B("div", ni, [t[0] ||= V("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [V("polygon", { points: "5,3 19,12 5,21" })], -1), H(" " + X(u.value), 1)])) : z("", !0), V("div", ri, [(q(!0), B(I, null, Y(s.value, (e) => (q(), B("button", {
			key: e.id,
			type: "button",
			class: G(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: K({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Z(b)(e.startSec)}`,
			"aria-label": `${e.label} at ${Z(b)(e.startSec)}`,
			onClick: Pe((t) => d(e), ["stop"])
		}, [V("span", ai, [
			V("span", oi, X(e.label), 1),
			V("span", si, X(Z(b)(e.startSec)), 1),
			V("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Pe((t) => f(e), ["stop"])
			}, " Find similar ", 8, ci)
		])], 14, ii))), 128))])], 2)) : z("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), ui = ["aria-label", "aria-expanded"], di = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, fi = ["aria-label"], pi = ["aria-selected", "onClick"], mi = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(e, { expose: t }) {
		let n = e, { t: r } = o(), i = [
			{
				label: "Off",
				value: 0
			},
			{
				label: "5m",
				value: 300
			},
			{
				label: "15m",
				value: 900
			},
			{
				label: "30m",
				value: 1800
			},
			{
				label: "45m",
				value: 2700
			},
			{
				label: "60m",
				value: 3600
			},
			{
				label: "90m",
				value: 5400
			}
		], a = J(0), s = J(0), c = L(() => s.value > 0), l;
		function u() {
			l &&= (clearInterval(l), void 0);
		}
		function d(e) {
			u(), s.value = e, e <= 0 || (l = setInterval(() => {
				--s.value, s.value <= 0 && (u(), s.value = 0, n.onExpire());
			}, 1e3));
		}
		function f(e) {
			a.value = e, e === 0 ? (u(), s.value = 0) : d(e);
		}
		function p(e) {
			let t = Math.floor(e / 60), n = e % 60;
			return `${t}:${String(n).padStart(2, "0")}`;
		}
		let m = J(!1);
		function h() {
			c.value ? (f(0), m.value = !1) : m.value = !m.value;
		}
		function g(e) {
			f(e), m.value = !1;
		}
		return ke(() => {
			u();
		}), t({ toggleOpen: h }), (e, t) => (q(), B("div", { class: G(["sleep-timer", { "is-active": c.value }]) }, [V("button", {
			type: "button",
			class: G(["sleep-timer__trigger", { "is-active": c.value }]),
			"aria-label": c.value ? `Sleep timer: ${p(s.value)} remaining` : Z(r)("player.sleepTimer"),
			"aria-expanded": m.value,
			"aria-haspopup": "listbox",
			onClick: h
		}, [U(T, { name: "moon" }), c.value ? (q(), B("span", di, X(p(s.value)), 1)) : z("", !0)], 10, ui), U(Te, { name: "dropdown" }, {
			default: $(() => [m.value ? (q(), B("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": Z(r)("player.sleepTimer")
			}, [(q(), B(I, null, Y(i, (e) => V("li", {
				key: e.value,
				class: G(["sleep-timer__option", { "is-selected": a.value === e.value }]),
				role: "option",
				"aria-selected": a.value === e.value,
				onClick: (t) => g(e.value)
			}, X(e.label), 11, pi)), 64))], 8, fi)) : z("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), hi = {
	key: 0,
	class: "syncplay-overlay"
}, gi = { class: "syncplay-overlay__badge" }, _i = { class: "syncplay-overlay__label" }, vi = { class: "syncplay-overlay__status-label" }, yi = { class: "syncplay-overlay__members" }, bi = { class: "syncplay-overlay__member-count" }, xi = { class: "syncplay-overlay__member-list" }, Si = { class: "syncplay-overlay__member-name" }, Ci = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, wi = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let t = e, { t: n } = o(), r = me(), a = i(), s = L(() => t.apiBase ?? a.value), c = L(() => r.currentRoom?.name ?? "SyncPlay"), l = L(() => r.onlineMembers.length), u = L(() => r.syncStatus), d = L(() => {
			switch (u.value) {
				case "synced": return n("syncplay.synced");
				case "outOfSync": return n("syncplay.outOfSync");
				case "re-syncing": return n("syncplay.reSyncing");
				default: return n("syncplay.synced");
			}
		}), f = L(() => {
			switch (u.value) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		});
		async function p() {
			await r.leaveRoom(s.value);
		}
		return (e, t) => Z(r).isInRoom ? (q(), B("div", hi, [
			V("div", gi, [U(T, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), V("span", _i, "SyncPlay: " + X(c.value), 1)]),
			V("div", { class: G(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [U(T, {
				name: f.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), V("span", vi, X(d.value), 1)], 2),
			V("div", yi, [V("span", bi, [U(T, { name: "user" }), H(" " + X(Z(n)("syncplay.members", { count: l.value })), 1)]), V("ul", xi, [(q(!0), B(I, null, Y(Z(r).onlineMembers.slice(0, 5), (e) => (q(), B("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= V("span", { class: "syncplay-overlay__member-dot" }, null, -1), V("span", Si, X(e.name), 1)]))), 128)), Z(r).onlineMembers.length > 5 ? (q(), B("li", Ci, " +" + X(Z(r).onlineMembers.length - 5) + " more ", 1)) : z("", !0)])]),
			U(le, {
				variant: "ghost",
				size: "sm",
				onClick: p
			}, {
				default: $(() => [H(X(Z(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : z("", !0);
	}
}), [["__scopeId", "data-v-2dfa4284"]]), Ti = {
	key: 0,
	class: "syncplay-controls"
}, Ei = ["aria-label"], Di = { class: "syncplay-controls__wait-label" }, Oi = { class: "syncplay-controls__transport" }, ki = ["aria-label"], Ai = ["aria-label"], ji = ["aria-label"], Mi = { class: "syncplay-controls__status-label" }, Ni = 10, Pi = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "SyncPlayControls",
	props: {
		position: {},
		duration: {},
		isPlaying: { type: Boolean },
		isBuffering: { type: Boolean },
		apiBase: {}
	},
	emits: [
		"seek",
		"play",
		"pause"
	],
	setup(e, { emit: t }) {
		let n = e, a = t, { t: s } = o(), c = me(), l = C(), u = Ee("phlixConfig", null), d = i(), f = L(() => n.apiBase ?? d.value);
		he((e) => {
			l.error(r(e, u?.locale, s("syncplay.commandRejected")));
		}), je(() => he(null));
		let p = J(!1), m = L(() => p.value || c.syncStatus === "re-syncing");
		async function h() {
			if (c.isInRoom) try {
				await c.sendCommand(f.value, "play"), a("play");
			} catch {
				l.error(s("syncplay.commandFailed"));
			}
		}
		async function g() {
			if (c.isInRoom) try {
				await c.sendCommand(f.value, "pause"), a("pause");
			} catch {
				l.error(s("syncplay.commandFailed"));
			}
		}
		async function _() {
			n.isPlaying ? await g() : await h();
		}
		async function v(e) {
			if (c.isInRoom) try {
				await c.sendCommand(f.value, "seek", { position: e }), a("seek", e);
			} catch {
				l.error(s("syncplay.commandFailed"));
			}
		}
		async function y() {
			await v(Math.max(0, n.position - Ni));
		}
		async function b() {
			await v(Math.min(n.duration, n.position + Ni));
		}
		return Q(() => c.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => Z(c).isInRoom ? (q(), B("div", Ti, [
			m.value ? (q(), B("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": Z(s)("syncplay.waitingForMembers")
			}, [U(T, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), V("span", Di, X(Z(s)("syncplay.waitingForMembers")), 1)], 8, Ei)) : z("", !0),
			V("div", Oi, [
				V("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Z(s)("syncplay.rewind"),
					onClick: y
				}, [U(T, { name: "rewind" })], 8, ki),
				V("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Z(s)("syncplay.pauseAll") : Z(s)("syncplay.playAll"),
					onClick: _
				}, [U(T, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Ai),
				V("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Z(s)("syncplay.fastForward"),
					onClick: b
				}, [U(T, { name: "forward" })], 8, ji)
			]),
			V("div", { class: G(["syncplay-controls__status", `syncplay-controls__status--${Z(c).syncStatus}`]) }, [U(T, {
				name: Z(c).syncStatus === "synced" ? "check" : Z(c).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), V("span", Mi, X(Z(c).syncStatus === "synced" ? Z(s)("syncplay.synced") : Z(c).syncStatus === "outOfSync" ? Z(s)("syncplay.outOfSync") : Z(s)("syncplay.reSyncing")), 1)], 2)
		])) : z("", !0);
	}
}), [["__scopeId", "data-v-276195ff"]]);
// src/utils/subtitleSrc.ts
function Fi(e, t) {
	return String(s(e, t));
}
function Ii(e, t) {
	let n = !1, r = t.map((t) => {
		let r = Fi(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
// src/components/Player.vue?vue&type=script&setup=true&lang.ts
var Li = { class: "player__stage" }, Ri = ["src", "poster"], zi = [
	"src",
	"srclang",
	"label"
], Bi = {
	key: 0,
	class: "player__buffering"
}, Vi = {
	class: "player__buffering-text",
	"aria-hidden": "true"
}, Hi = { class: "player__meta" }, Ui = ["aria-label"], Wi = { class: "player__meta-text" }, Gi = { class: "player__eyebrow" }, Ki = { class: "player__title" }, qi = { class: "player__sub numeric" }, Ji = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Yi = {
	key: 1,
	class: "player__center"
}, Xi = ["aria-label"], Zi = ["aria-label"], Qi = ["aria-label"], $i = { class: "player__btnrow" }, ea = ["aria-label"], ta = ["aria-label"], na = ["aria-label"], ra = { class: "player__time numeric" }, ia = ["aria-label", "aria-pressed"], aa = ["title"], oa = ["aria-label"], sa = ["aria-label"], ca = ["aria-label", "aria-pressed"], la = ["aria-label", "aria-pressed"], ua = ["aria-label"], da = { class: "similar-modal" }, fa = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, pa = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, ma = { class: "similar-modal__state-title" }, ha = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, ga = {
	key: 3,
	class: "similar-modal__results"
}, _a = { class: "similar-modal__poster" }, va = ["src", "alt"], ya = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, ba = { class: "similar-modal__result-body" }, xa = { class: "similar-modal__result-title" }, Sa = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Ca = { key: 0 }, wa = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {},
		idleTimeout: {},
		chapters: {},
		introMarker: {},
		outroMarker: {},
		markers: {},
		thumbnailAt: { type: Function },
		streamUrlFor: { type: Function },
		resolvePendingMedia: { type: Function },
		apiBase: {},
		prevEpisode: {},
		nextEpisode: {},
		playbackAudioTracks: {},
		playbackSubtitleTracks: {},
		autoplay: { type: Boolean }
	},
	emits: [
		"back",
		"captions",
		"theater",
		"pip",
		"play-next",
		"play-episode",
		"pending-media"
	],
	setup(e, { emit: t }) {
		let { imgSrc: r } = c(), a = e, s = t, l = u(), m = S(), { t: h } = o(), g = me(), _ = d(), y = L(() => _.isFavorite(a.media.id)), x = L(() => _.likeLevel(a.media.id));
		function ee() {
			_.toggleFavorite(a.media.id, De());
		}
		function w(e) {
			_.setLike(a.media.id, e, De());
		}
		let E = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], D = J(null), O = J(null), k = J(null), j = J(!0), M = J(!1), te = J(!1), ne = J(!1), N = J(!1), P = J(!1), ae = J(!1), oe = J(!1), le = J(!1), ue = J(null), fe = J(null), pe = J(!1), he = C(), _e = J(!1);
		function ve(e) {
			he.success(h("syncplay.joinedRoom", { name: e.name }));
		}
		let ye = L(() => P.value ? 1.35 : 1), F = J(Kn(a.streamUrl, a.media.path)), be = L(() => sr(a.media.streams)), xe = 0;
		async function Se() {
			let e = ++xe;
			if (F.value) return;
			let t = await pr([a.streamUrl, a.media.path], a.playbackAudioTracks ?? [], be.value);
			e === xe && t && !F.value && (F.value = !0, Be(D.value?.currentTime ?? 0));
		}
		Q([() => a.playbackAudioTracks, be], () => {
			Se();
		}, { immediate: !0 });
		let Ce = Ee("phlixConfig", null), we = i(), Te = Ee("resumeReporter", null), W = !1;
		function De() {
			return we.value;
		}
		let K = it({
			apiBase: () => a.apiBase ?? "",
			hlsConfig: Ce?.playerHlsConfig
		}), je = dt({ apiBase: () => a.apiBase ?? "" }), Me = null;
		function Ne(e) {
			Me !== null && clearTimeout(Me), Me = setTimeout(() => {
				Me = null, je.fetch(e);
			}, 0);
		}
		let Fe = L(() => a.thumbnailAt ?? je.thumbnailAt), Ie = L(() => F.value ? void 0 : a.streamUrl), Le = L(() => F.value && K.state.value !== "ready"), Re = L(() => F.value && (K.state.value === "preparing" || K.state.value === "idle")), ze = L(() => F.value && K.state.value === "error");
		function Be(e = 0) {
			let t = D.value, n = navigator.connection?.downlinkMax, r = Xe(n);
			t && K.start(t, a.media.id, r, e);
		}
		function Ve(e) {
			l.quality === "original" && e !== "auto" ? K.loadVariantPlaylist(Tt) : typeof e == "string" && e !== "auto" ? K.loadVariantPlaylist(e) : K.setLevel(e);
		}
		let He = !1;
		function Ue() {
			m.defaultQuality = wt;
		}
		function We() {
			let e = K.levels.value;
			if (e.length === 0) return !1;
			let t = m.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = K.variants.value;
				if (!t || t.length === 0) return !1;
				if (Mt(e, t)) K.loadVariantPlaylist(Tt);
				else {
					let t = jt(e);
					t >= 0 && K.setNextLevel(t), Ue();
				}
				return !0;
			}
			let n = kt(e, t);
			return n >= 0 ? K.setNextLevel(n) : Ue(), !0;
		}
		Q(() => K.levels.value, (e) => {
			He || e.length === 0 || We() && (He = !0);
		}), Q(() => K.variants.value, (e) => {
			!He && e?.length && Oe(() => {
				He || We() && (He = !0);
			});
		}, { deep: !0 });
		let Ge = J(l.resumePositionFor(a.media.id) ?? 0), Ke = J(!F.value && Ge.value > 0), qe = null, Je = J(!1), Ye = J(8), Ze, Qe = J(null), $e = J(0), et = J(!1), tt = J([]), nt = J(!1), rt = J(null);
		function at(e, t) {
			Qe.value = e, $e.value = t, tt.value = [], rt.value = null, et.value = !0, ut(e, t);
		}
		let ot = null, st = null, ct = null;
		function lt() {
			let e = a.apiBase ?? "";
			return (st === null || ct !== e) && (st = new n({ baseUrl: e }), ct = e), st;
		}
		async function ut(e, t) {
			ot?.abort(), ot = new AbortController(), nt.value = !0, rt.value = null;
			try {
				let n = await lt().searchByMarker(e, t, 30, 20, ot.signal);
				tt.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				rt.value = "Couldn’t load similar titles. Please try again.", tt.value = [];
			} finally {
				nt.value = !1;
			}
		}
		function ft() {
			ot?.abort(), et.value = !1, tt.value = [], rt.value = null, Qe.value = null;
		}
		let pt = L(() => l.upNext);
		function mt() {
			F.value = Kn(a.streamUrl, a.media.path), Se(), Ge.value = l.resumePositionFor(a.media.id) ?? 0, Ke.value = !F.value && Ge.value > 0, qe = null, bn = !1, sn = !1, rn.value = [], nn.value = !1, cn = !1, Jt.value = -1, hn = null, He = !1, W = !1, Bt(), At = !1, Lt = 0, It = 0, vt(), Je.value = !1, K.reset(), D.value && (D.value.currentTime = 0), F.value && Be(), Ne(a.media.id);
		}
		function ht(e) {
			let t = D.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : qe = Math.max(0, e));
		}
		function gt() {
			ht(Ge.value), Ke.value = !1, D.value?.play()?.catch(() => {});
		}
		function _t() {
			qe = null, ht(0), l.clearResume(a.media.id), Ke.value = !1, D.value?.play()?.catch(() => {});
		}
		function vt() {
			Ze &&= (clearInterval(Ze), void 0);
		}
		function yt() {
			Ye.value = 8, vt(), Ze = setInterval(() => {
				--Ye.value, Ye.value <= 0 && (vt(), Et());
			}, 1e3);
		}
		function xt() {
			W || (W = !0, Te?.finish()), fr(), j.value = !0, l.upNext && (Je.value = !0, m.autoplay && yt());
		}
		function Et() {
			vt(), Je.value = !1;
			let e = l.next(a.streamUrlFor);
			e && s("play-next", e);
		}
		function Dt() {
			vt(), Je.value = !1;
		}
		function Ot() {
			if (F.value) return;
			let e = D.value, t = Jn(e) && (e?.currentTime ?? 0) === 0;
			(qn(e) || t) && (Rt(), Bt(), F.value = !0, Be(e?.currentTime ?? 0));
		}
		let At = !1, Nt = null, It = 0, Lt = 0;
		function Rt() {
			if (At) return;
			At = !0;
			let e = a.media?.id;
			e != null && e !== "" && lt().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, Zn({ videoCodec: be.value })).catch(() => {});
		}
		function zt() {
			if (Nt !== null || At || F.value) return;
			let e = D.value;
			e && (It = Date.now(), Lt = e.currentTime, Nt = setTimeout(() => {
				Nt = null;
				let e = D.value;
				e && !F.value && Qn(Date.now(), It, e.currentTime, Lt) && (Rt(), F.value = !0, Be(e.currentTime));
			}, Yn));
		}
		function Bt() {
			Nt !== null && (clearTimeout(Nt), Nt = null);
		}
		let Vt = J([]), Ht = J([]), Ut = J(-1), Wt = J(!1), Gt = L(() => K.state.value === "ready" && K.audioTracks.value.length > 0), Kt = L(() => K.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), qt = L(() => (a.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Jt = J(-1), Yt = L(() => !Gt.value && !F.value && Ht.value.length === 0 && qt.value.length > 1), Xt = L(() => Ht.value.length > 0 ? !1 : K.state.value === "ready" ? !Gt.value && K.hasAudio.value : !F.value && !Yt.value && qt.value.length === 1), Zt = L(() => Gt.value ? Kt.value : Yt.value ? qt.value : Ht.value.length > 0 ? Ht.value : Xt.value ? [{
			index: 0,
			language: "",
			label: h("player.audioOriginal"),
			kind: "audio"
		}] : Ht.value), Qt = L(() => {
			if (Gt.value) return K.currentAudioTrack.value;
			if (Yt.value) {
				if (Jt.value >= 0) return Jt.value;
				let e = (a.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : a.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Ht.value.length === 0 && Xt.value ? 0 : Ut.value;
		}), $t = J(!1), en = l.subtitleLang, tn = L(() => {
			let e = a.apiBase ?? "", t = F.value ? K.subtitleTracks.value : Ii(e, a.playbackSubtitleTracks ?? []);
			if (rn.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Ii(e, rn.value), i = new Set(t.map(n)), o = r.filter((e) => !i.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), nn = J(!1), rn = J([]), an = L(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(m.defaultSubtitleLang), t(m.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function on(e) {
			rn.value.some((t) => t.url === e.url) || (rn.value = [...rn.value, e]);
		}
		let sn = !1, cn = !1;
		function ln() {
			if (sn) return;
			if (m.subtitlePreferenceSet) {
				sn = !0;
				return;
			}
			let e = tn.value.find((e) => e.default);
			if (!e) return;
			let t = Vt.value.find((t) => t.language === (e.language || e.label));
			t && (l.setSubtitle(t.language), en = t.language, sn = !0);
		}
		function un() {
			if (cn) return;
			let e = m.defaultAudioLang;
			if (!e) return;
			let t = Zt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Qt.value;
			r >= 0 && r < t.length || (gn(n), cn = !0);
		}
		let fn = L(() => Vt.value.some((e) => e.language === l.subtitleLang));
		function pn() {
			let e = D.value;
			Vt.value = se(e), Ht.value = re(e), Ut.value = A(e), ln(), un();
		}
		function mn() {
			if (fn.value) en = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = en && Vt.value.some((e) => e.language === en) ? en : Vt.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			s("captions");
		}
		let hn = null;
		function gn(e) {
			if (!Xt.value) {
				if (Gt.value) K.setAudioTrack(e);
				else if (Yt.value) {
					if (e === Qt.value) return;
					Jt.value = e, hn = e, F.value = !0, Be(D.value?.currentTime ?? 0);
				} else ie(D.value, e), Ut.value = e;
			}
		}
		Q(Gt, (e) => {
			if (!e || hn === null) return;
			let t = hn;
			hn = null, t >= 0 && t < K.audioTracks.value.length && K.setAudioTrack(t);
		}), Q(tn, () => {
			Oe(() => pn());
		}, { deep: !0 });
		let _n = null, vn, yn = L(() => {
			let e = [];
			a.media.year && e.push({ text: String(a.media.year) }), a.media.rating && e.push({
				text: a.media.rating,
				cert: !0
			}), a.media.runtime && e.push({ text: `${a.media.runtime}m` });
			let t = a.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), bn = !1;
		function xn() {
			if (!a.autoplay || bn || Ke.value || Le.value) return;
			let e = D.value;
			if (!e || !e.paused) return;
			bn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (l.muteForAutoplay(), e.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Sn() {
			xn();
		}
		function Cn() {
			a.prevEpisode && s("play-episode", a.prevEpisode);
		}
		function wn() {
			a.nextEpisode && s("play-episode", a.nextEpisode);
		}
		function Tn() {
			let e = D.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function En(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function On() {
			if (tr !== null && (clearInterval(tr), tr = null), nr) {
				nr = !1;
				let e = D.value;
				e && Math.abs(e.volume - l.volume) > .001 && (e.volume = l.volume);
			}
			l.play(), l.setMediaPositionState(), zt();
		}
		function kn() {
			l.pause(), l.setMediaPositionState(), M.value = !1;
		}
		function An() {
			M.value = !0, fr(), j.value = !0;
		}
		function jn() {
			M.value = !1, hr();
		}
		function Mn() {
			let e = D.value;
			e && (Nt !== null && e.currentTime > Lt && Bt(), l.updateProgress(e.currentTime, e.duration, En(e)), g.isInRoom && g.updateLocalPosition(e.currentTime));
		}
		function Nn() {
			let e = D.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, qe !== null && (e.currentTime = e.duration ? Math.min(e.duration, qe) : qe, qe = null), l.updateProgress(e.currentTime, e.duration, En(e)), l.setMediaPositionState(), pn());
		}
		function Pn() {
			let e = D.value;
			e && l.updateProgress(e.currentTime, e.duration, En(e));
		}
		function Fn() {
			let e = D.value;
			e && (!nr && Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function In() {
			let e = D.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate), l.setMediaPositionState();
		}
		function Rn() {
			l.setMediaPositionState();
		}
		function zn() {
			l.setMediaPositionState();
		}
		function Bn(e) {
			let t = D.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function Vn(e) {
			Bn(l.position + e);
		}
		function Un() {
			ne.value = !0, hr();
		}
		function Wn() {
			ne.value = !1, hr();
		}
		function Gn(e) {
			let t = E.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(E[e] - l.rate) ? n : e, 0), n = E[Math.min(E.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function Xn() {
			if (!a.markers) return;
			let e = l.position, t = a.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Bn(t.startMs / 1e3);
		}
		function $n() {
			if (!a.markers) return;
			let e = l.position, t = a.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Bn(t.startMs / 1e3);
		}
		function er() {
			ue.value?.toggleOpen();
		}
		let tr = null, nr = !1;
		function rr() {
			let e = D.value;
			if (!e) {
				l.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), l.pause();
				return;
			}
			tr !== null && (clearInterval(tr), tr = null), nr = !0;
			let t = .05;
			tr = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(tr), tr = null, e.volume = 0, e.pause(), l.pause());
			}, 50);
		}
		p({
			playPause: Tn,
			seekBy: Vn,
			frameStep: (e) => {
				l.playing || Bn(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: ir,
			toggleFullscreen: or,
			toggleCaptions: mn,
			toggleTheater: ar,
			togglePip: lr,
			skipIntro: Xn,
			skipOutro: $n,
			sleepTimer: er,
			seekToPercent: (e) => Bn(e * l.duration),
			speedStep: Gn,
			toggleHelp: () => {
				N.value = !N.value;
			},
			toggleQuality: () => {
				F.value ? (pe.value = !pe.value, fe.value?.toggleMenu?.()) : he.show({
					message: h("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !N.value && !Wt.value && !$t.value && !_e.value && !nn.value && !et.value });
		function ir() {
			l.toggleMute();
		}
		function ar() {
			P.value = !P.value, s("theater", P.value);
		}
		Q(() => l.muted, (e) => {
			let t = D.value;
			t && t.muted !== e && (t.muted = e);
		}), Q(() => l.volume, (e) => {
			let t = D.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Q(() => l.rate, (e) => {
			let t = D.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Q(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? ht(e.value) : e.type === "seekBy" && ht(l.position + e.value));
		});
		function or() {
			if (typeof document > "u") return;
			if (!le.value) {
				ar();
				return;
			}
			let e = O.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function cr() {
			te.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function lr() {
			let e = D.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function ur() {
			ae.value = !0;
		}
		function dr() {
			ae.value = !1;
		}
		function fr() {
			vn &&= (clearTimeout(vn), void 0);
		}
		function mr() {
			fr(), !l.playing || ne.value || M.value || (vn = setTimeout(() => {
				l.playing && !ne.value && !M.value && (j.value = !1);
			}, a.idleTimeout ?? 3e3));
		}
		function hr() {
			j.value = !0, mr();
		}
		let gr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", _r = "data-phlix-prev-tabindex", vr = "__phlix_no_tabindex__";
		function yr(e) {
			let t = O.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(gr) ? [n] : Array.from(n.querySelectorAll(gr));
				for (let n of t) if (e) {
					let e = n.getAttribute(_r);
					e === null || e === vr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(_r);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(_r, n.getAttribute("tabindex") ?? vr), n.setAttribute("tabindex", "-1"));
			}
		}
		Q(j, (e) => {
			typeof document < "u" && (yr(e), !e && document.activeElement instanceof HTMLElement && O.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), Q(() => l.playing, (e) => {
			e ? (Ke.value = !1, Dt(), mr()) : (fr(), M.value = !1, j.value = !0);
		});
		let br = null;
		Ae(() => {
			l.setCurrent(a.media, {
				resetPosition: !1,
				streamUrl: a.streamUrl
			}), _.hydrate(a.media), typeof document < "u" && (document.addEventListener("fullscreenchange", cr), oe.value = document.pictureInPictureEnabled === !0, le.value = document.fullscreenEnabled === !0), br = l.bindMediaSession({
				onPlay: () => void D.value?.play()?.catch(() => {}),
				onPause: () => D.value?.pause(),
				onSeek: (e) => Bn(e),
				onNext: () => Et(),
				onPrevious: () => Cn()
			}), _n = D.value?.textTracks ?? null, _n?.addEventListener?.("addtrack", pn), _n?.addEventListener?.("removetrack", pn), pn(), F.value && Be(), Ne(a.media.id);
		}), Q(() => a.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: a.streamUrl
			}), mt();
		}), Q(() => a.media?.id, () => {
			_.hydrate(a.media);
		}), Q(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (D.value?.play()?.catch(() => {}), l.play()) : e.state === "paused" && (D.value?.pause(), l.pause()), g.updateLocalPosition(l.position), Math.abs(g.driftAmount) > 2 && ht(e.playbackPosition));
		});
		let xr = null;
		return Q(() => g.pendingPlayMedia, async (e) => {
			if (!e) return;
			let t = null;
			if (a.resolvePendingMedia) {
				try {
					t = await a.resolvePendingMedia({
						mediaId: e.mediaId,
						title: e.title
					});
				} catch {
					t = null;
				}
				if (g.pendingPlayMedia !== e) return;
			}
			if (t) {
				l.setCurrent(t, {
					resetPosition: !0,
					streamUrl: a.streamUrlFor?.(t) ?? ""
				}), D.value?.play()?.catch(() => {}), l.play(), g.consumePendingPlayMedia(), xr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			xr !== n && (xr = n, s("pending-media", e.mediaId, e.title));
		}), ke(() => {
			Te?.reportFinal?.(), fr(), vt(), K.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", cr), br?.(), _n?.removeEventListener?.("addtrack", pn), _n?.removeEventListener?.("removetrack", pn), tr !== null && (clearInterval(tr), tr = null), Me !== null && (clearTimeout(Me), Me = null), Bt();
		}), (t, n) => (q(), B("div", {
			ref_key: "containerRef",
			ref: O,
			class: G(["player", {
				"is-chrome-hidden": !j.value,
				"is-theater": P.value
			}]),
			"data-player-surface": "",
			onPointermove: hr,
			onPointerdown: hr,
			onFocusin: hr
		}, [U(Ln, {
			video: D.value,
			enabled: Z(m).atmosphere,
			playing: Z(l).playing,
			"reduced-motion": Z(m).effectiveReducedMotion,
			intensity: ye.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), V("div", Li, [
			V("video", {
				ref_key: "videoRef",
				ref: D,
				class: "player__video",
				src: Ie.value,
				poster: Z(r)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: On,
				onPause: kn,
				onTimeupdate: Mn,
				onLoadedmetadata: Nn,
				onCanplay: Sn,
				onWaiting: An,
				onStalled: An,
				onPlaying: jn,
				onProgress: Pn,
				onVolumechange: Fn,
				onRatechange: In,
				onSeeked: Rn,
				onDurationchange: zn,
				onEnded: xt,
				onError: Ot,
				onEnterpictureinpicture: ur,
				onLeavepictureinpicture: dr,
				onClick: Tn
			}, [(q(!0), B(I, null, Y(tn.value, (e) => (q(), B("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, zi))), 128))], 40, Ri),
			n[22] ||= V("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[23] ||= V("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			M.value ? (q(), B("div", Bi, [U(de, {
				size: 38,
				label: Z(h)("player.buffering")
			}, null, 8, ["label"]), V("span", Vi, X(Z(h)("player.buffering")), 1)])) : z("", !0),
			V("div", Hi, [V("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Z(h)("player.back"),
				onClick: n[0] ||= Pe((e) => s("back"), ["stop"])
			}, [U(T, { name: "arrow-left" })], 8, Ui), V("div", Wi, [
				V("p", Gi, X(Z(h)("player.nowPlaying")), 1),
				V("h2", Ki, X(e.media.name), 1),
				V("div", qi, [(q(!0), B(I, null, Y(yn.value, (e, t) => (q(), B(I, { key: t }, [t > 0 && !e.cert ? (q(), B("span", Ji, "·")) : z("", !0), V("span", { class: G({ player__cert: e.cert }) }, X(e.text), 3)], 64))), 128))])
			])]),
			Le.value ? z("", !0) : (q(), B("div", Yi, [
				j.value ? (q(), B("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": Z(h)("player.seekBackward"),
					onClick: n[1] ||= Pe((e) => Vn(-10), ["stop"])
				}, [U(T, { name: "rewind" }), V("span", { class: "player__center-skip-count" }, X(10))], 8, Xi)) : z("", !0),
				V("button", {
					type: "button",
					class: G(["player__bigplay", { "is-playing": Z(l).playing }]),
					"aria-label": Z(l).playing ? Z(h)("player.pause") : Z(h)("player.play"),
					onClick: Pe(Tn, ["stop"])
				}, [U(T, { name: Z(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Zi),
				j.value ? (q(), B("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": Z(h)("player.seekForward"),
					onClick: n[2] ||= Pe((e) => Vn(10), ["stop"])
				}, [U(T, { name: "forward" }), V("span", { class: "player__center-skip-count" }, X(10))], 8, Qi)) : z("", !0)
			])),
			U(Ft, {
				video: D.value,
				language: Z(l).subtitleLang,
				"style-config": Z(m).captionStyle,
				lifted: j.value,
				"controls-root": k.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Le.value ? z("", !0) : (q(), B("div", {
				key: 2,
				ref_key: "controlsRef",
				ref: k,
				class: "player__controls",
				onClick: n[9] ||= Pe(() => {}, ["stop"])
			}, [
				U(v, {
					position: Z(l).position,
					duration: Z(l).duration,
					buffered: Z(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": Fe.value,
					onSeek: Bn,
					onScrubStart: Un,
					onScrubEnd: Wn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				Z(m).showMarkerTimeline && e.markers && e.markers.length > 0 ? (q(), R(li, {
					key: 0,
					position: Z(l).position,
					duration: Z(l).duration,
					markers: e.markers,
					onSeek: Bn,
					onSimilar: at
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : z("", !0),
				V("div", $i, [
					e.prevEpisode ? (q(), B("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Z(h)("player.previousEpisode"),
						onClick: Cn
					}, [U(T, { name: "skip-back" })], 8, ea)) : z("", !0),
					V("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Z(l).playing ? Z(h)("player.pause") : Z(h)("player.play"),
						onClick: Tn
					}, [U(T, { name: Z(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, ta),
					e.nextEpisode ? (q(), B("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Z(h)("player.nextEpisode"),
						onClick: wn
					}, [U(T, { name: "skip-forward" })], 8, na)) : z("", !0),
					V("span", ra, [
						H(X(Z(b)(Z(l).position)), 1),
						n[18] ||= V("span", { class: "player__sep" }, " / ", -1),
						H(X(Z(b)(Z(l).duration)), 1)
					]),
					n[19] ||= V("span", { class: "player__grow" }, null, -1),
					V("button", {
						type: "button",
						class: G(["player__iconbtn player__favorite", { "is-on": y.value }]),
						"aria-label": y.value ? Z(h)("itemActions.removeFavorite") : Z(h)("itemActions.addFavorite"),
						"aria-pressed": y.value ? "true" : "false",
						onClick: ee
					}, [U(T, { name: y.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ia),
					U(f, {
						level: x.value,
						onCycle: w
					}, null, 8, ["level"]),
					U(St),
					U(Ct),
					U(Pt, {
						ref_key: "qualityMenuRef",
						ref: fe,
						open: pe.value,
						"onUpdate:open": n[3] ||= (e) => pe.value = e,
						levels: Z(K).levels.value,
						variants: Z(K).variants.value,
						"current-level": Z(K).currentLevel.value,
						"auto-enabled": Z(K).autoEnabled.value,
						"active-height": Z(K).activeLevelHeight.value,
						onSelect: Ve
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					F.value ? z("", !0) : (q(), B("span", {
						key: 2,
						class: "player__direct-badge",
						title: Z(h)("player.qualityDirectStream")
					}, X(Z(h)("player.directStream")), 9, aa)),
					U(dn, {
						open: Wt.value,
						"onUpdate:open": n[4] ||= (e) => Wt.value = e,
						tracks: Vt.value,
						"audio-tracks": Zt.value,
						"active-audio": Qt.value,
						onSelectAudio: gn,
						onAddSubtitles: n[5] ||= (e) => nn.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					U(ti, {
						open: $t.value,
						"onUpdate:open": n[6] ||= (e) => $t.value = e,
						chapters: e.chapters ?? [],
						onSeek: Bn
					}, null, 8, ["open", "chapters"]),
					U(mi, {
						ref_key: "sleepTimerRef",
						ref: ue,
						"on-expire": rr
					}, null, 512),
					V("button", {
						type: "button",
						class: G(["player__iconbtn player__syncplay", { "is-on": Z(g).isInRoom }]),
						"aria-label": Z(g).isInRoom ? Z(h)("syncplay.inRoom") : Z(h)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: n[7] ||= (e) => _e.value = !0
					}, [U(T, { name: "user" })], 10, oa),
					V("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Z(h)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: n[8] ||= (e) => N.value = !0
					}, [U(T, { name: "info" })], 8, sa),
					oe.value ? (q(), B("button", {
						key: 3,
						type: "button",
						class: G(["player__iconbtn", { "is-on": ae.value }]),
						"aria-label": ae.value ? Z(h)("player.exitPip") : Z(h)("player.pip"),
						"aria-pressed": ae.value,
						onClick: lr
					}, [U(T, { name: "pip" })], 10, ca)) : z("", !0),
					V("button", {
						type: "button",
						class: G(["player__iconbtn", { "is-on": P.value }]),
						"aria-label": P.value ? Z(h)("player.exitTheater") : Z(h)("player.theater"),
						"aria-pressed": P.value,
						onClick: ar
					}, [U(T, { name: "theater" })], 10, la),
					le.value ? (q(), B("button", {
						key: 4,
						type: "button",
						class: "player__iconbtn",
						"aria-label": te.value ? Z(h)("player.exitFullscreen") : Z(h)("player.fullscreen"),
						onClick: or
					}, [U(T, { name: te.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ua)) : z("", !0)
				])
			], 512)),
			Le.value ? z("", !0) : (q(), R(Ir, {
				key: 3,
				position: Z(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: Bn
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Le.value ? z("", !0) : (q(), R(Hr, {
				key: 4,
				position: Z(l).position,
				markers: e.markers,
				onSkip: Bn
			}, null, 8, ["position", "markers"])),
			Ke.value && !Le.value ? (q(), R(Hn, {
				key: 5,
				seconds: Ge.value,
				onResume: gt,
				onRestart: _t
			}, null, 8, ["seconds"])) : z("", !0),
			Je.value && pt.value && !Le.value ? (q(), R(wr, {
				key: 6,
				media: pt.value,
				remaining: Ye.value,
				total: Z(8),
				counting: Z(m).autoplay,
				onPlayNow: Et,
				onCancel: Dt
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : z("", !0),
			U(ce, {
				modelValue: et.value,
				"onUpdate:modelValue": n[10] ||= (e) => et.value = e,
				title: `Similar ${Qe.value ?? "marker"}s`,
				size: "lg",
				onClose: ft
			}, {
				default: $(() => [V("div", da, [nt.value ? (q(), B("div", fa, [U(de, { label: "Finding similar media" })])) : rt.value ? (q(), B("div", pa, [U(T, {
					name: "error",
					class: "similar-modal__state-icon"
				}), V("p", ma, X(rt.value), 1)])) : !nt.value && tt.value.length === 0 ? (q(), B("div", ha, [
					U(T, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					n[20] ||= V("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					n[21] ||= V("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (q(), B("ul", ga, [(q(!0), B(I, null, Y(tt.value, (e) => (q(), B("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [V("div", _a, [e.poster_url ? (q(), B("img", {
					key: 0,
					src: Z(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, va)) : (q(), B("div", ya, [U(T, { name: "film" })]))]), V("div", ba, [V("p", xa, X(e.name), 1), e.year ? (q(), B("p", Sa, [H(X(e.year) + " ", 1), e.runtime ? (q(), B("span", Ca, " · " + X(e.runtime) + "m", 1)) : z("", !0)])) : z("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Re.value ? (q(), R(Fr, {
				key: 7,
				title: e.media.name,
				progress: Z(K).progress.value,
				onBack: n[11] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : z("", !0),
			ze.value ? (q(), R(kr, {
				key: 8,
				title: e.media.name,
				onBack: n[12] ||= (e) => s("back")
			}, null, 8, ["title"])) : z("", !0),
			Z(g).isInRoom ? (q(), R(Pi, {
				key: 9,
				position: Z(l).position,
				duration: Z(l).duration,
				"is-playing": Z(l).playing,
				onSeek: Bn,
				onPlay: n[13] ||= (e) => void D.value?.play()?.catch(() => {}),
				onPause: n[14] ||= (e) => void D.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : z("", !0),
			Z(g).isInRoom ? (q(), R(wi, { key: 10 })) : z("", !0),
			U(ge, {
				modelValue: _e.value,
				"onUpdate:modelValue": n[15] ||= (e) => _e.value = e,
				onJoined: ve
			}, null, 8, ["modelValue"]),
			U(bt, {
				open: N.value,
				onClose: n[16] ||= (e) => N.value = !1
			}, null, 8, ["open"]),
			U(Dn, {
				open: nn.value,
				"onUpdate:open": n[17] ||= (e) => nn.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": an.value,
				onAdded: on
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-767f23d0"]]), Ta = "blur(3px) saturate(1.35)";
async function Ea(e, t = document, n = 16 / 9) {
	try {
		let r = new Image();
		r.decoding = "async", r.src = e, await r.decode();
		let i = r.naturalWidth, a = r.naturalHeight;
		if (!i || !a) return null;
		let o = Math.max(1, Math.round(64 / (Number.isFinite(n) && n > 0 ? Math.min(4, Math.max(.25, n)) : 16 / 9))), s = t.createElement("canvas");
		s.width = 64, s.height = o;
		let c = s.getContext("2d");
		if (!c) return null;
		let l = Math.max(64 / i, o / a), u = i * l, d = a * l;
		"filter" in c && (c.filter = Ta), c.drawImage(r, (64 - u) / 2 - 4, (o - d) / 2 - 4, u + 8, d + 8), "filter" in c && (c.filter = "none"), c.globalCompositeOperation = "destination-in", c.save(), c.translate(32, o / 2), c.scale(32 * Math.SQRT2, o / 2 * Math.SQRT2);
		let f = c.createRadialGradient(0, 0, 0, 0, 0, 1);
		return f.addColorStop(0, "rgba(0, 0, 0, 1)"), f.addColorStop(.75, "rgba(0, 0, 0, 0)"), c.fillStyle = f, c.fillRect(-1, -1, 2, 2), c.restore(), c.globalCompositeOperation = "source-over", s.toDataURL("image/png");
	} catch {
		return null;
	}
}
// src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var Da = { class: "player-page__stage" }, Oa = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, ka = { class: "player-page__blocking-error" }, Aa = /*#__PURE__*/ w(/* @__PURE__ */ W({
	__name: "PlayerPage",
	setup(t) {
		let r = /* @__PURE__ */ new Map(), s = i(), { imgSrc: f } = c(), p = a(), h = Ie(), _ = Le(), { t: v } = o(), y = Ee("phlixConfig", null), b = u(), x = d(), S = ee(), C = J(null), w = J(""), T = J([]), E = J(null), D = J(null), O = J([]), k = J([]), A = J(!0), j = J(null), M = J(!1), te = J(null), ne = J(!1), re = J(null), N = J(null), ie = L(() => String(h.params.id ?? ""));
		xe(() => C.value?.name);
		let P = L(() => f(C.value?.poster_url) || ""), ae = J(null);
		Q(P, (e) => {
			if (ae.value = null, !e) return;
			let t = typeof window < "u" && window.innerHeight > 0 ? window.innerWidth / window.innerHeight : 16 / 9;
			Ea(e, document, t).then((t) => {
				P.value === e && (ae.value = t);
			});
		}, { immediate: !0 });
		let oe = L(() => {
			let e = ae.value ?? P.value;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), se = null, ue = !1, de = 0;
		function fe(e) {
			return ue || e.generation !== de;
		}
		function me(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function he(e) {
			let t = p.value || s.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function ge(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function I(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function Te(e, t, n) {
			let r = () => fe(n), i = t.genres?.[0];
			if (!i) b.setQueue([]);
			else try {
				let a = l(s.value, {
					genres: [i],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), o = await e.get(a, void 0, n.controller?.signal);
				if (r()) return;
				b.setQueue((o.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (r() || me(e)) return;
				b.setQueue([]);
			}
		}
		async function W(e, t, n) {
			let r = l(s.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function De(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Oe(e, t) {
			re.value = ye(e, t), N.value = F(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && b.setQueue(r);
		}
		function je(e) {
			for (let t of r.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function Y(e, t, n) {
			if (re.value = null, N.value = null, !I(t)) return;
			let i = je(t.id);
			if (i) {
				Oe(i, t.id);
				return;
			}
			let a = () => fe(n);
			try {
				let i = await De(e, t, n.controller?.signal);
				if (a()) return;
				let o = await W(e, i.id, n.controller?.signal);
				if (a()) return;
				if (ve(o)) {
					let t = o.filter((e) => e.type === "season"), r = await Promise.all(t.map((t) => W(e, t.id, n.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...r.flat()];
				}
				let s = _e(o);
				s.length && r.set(i.id, s), Oe(s, t.id);
			} catch (e) {
				if (a() || me(e)) return;
				re.value = null, N.value = null;
			}
		}
		async function Me() {
			let t = ie.value;
			se?.abort(), se = typeof AbortController < "u" ? new AbortController() : null, de += 1;
			let r = {
				generation: de,
				controller: se
			};
			if (A.value = !0, j.value = null, T.value = [], E.value = null, D.value = null, O.value = [], k.value = [], re.value = null, N.value = null, b.hideMiniPlayer(), !t) {
				j.value = v("common.missingMediaId"), A.value = !1;
				return;
			}
			let i = new n({ baseUrl: s.value });
			i.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, r.controller?.signal).then((e) => {
				fe(r) || (T.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), E.value = ge(e?.intro_marker), D.value = ge(e?.outro_marker), O.value = $n(e?.audio_tracks), k.value = He(e?.subtitle_tracks));
			}).catch(() => null);
			let a = Se(t), o = Date.now();
			if (a && Ce(a, o)) {
				Ne(i, a.item, r);
				return;
			}
			let c;
			try {
				c = (await i.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, r.controller?.signal)).item;
			} catch (t) {
				if (fe(r) || me(t)) return;
				if (t instanceof e && (t.status === 403 || t.status === 429)) {
					let e = g(t.body, y?.locale);
					if (e !== null) {
						te.value = e, ne.value = !0, A.value = !1;
						return;
					}
				}
				if (a) {
					Ne(i, a.item, r);
					return;
				}
				j.value = m(t, y?.locale), A.value = !1;
				return;
			}
			if (!fe(r)) {
				if (c) we(t, c, o), Ne(i, c, r);
				else {
					if (a) {
						Ne(i, a.item, r);
						return;
					}
					j.value = "Couldn’t load media item", A.value = !1;
				}
			}
		}
		async function Ne(e, t, n) {
			C.value = t, x.hydrate(t), w.value = he(t), A.value = !1, I(t) && (await Y(e, t, n), fe(n) || N.value) || Te(e, t, n);
		}
		Ae(Me), Q(ie, Me), Fe(() => {
			b.current && b.streamUrl && b.showMiniPlayer();
		}), ke(() => {
			ue = !0, se?.abort(), se = null, S.reset();
		});
		function Pe() {
			_?.back();
		}
		function Re(e) {
			_?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function ze(e) {
			_?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Be(e) {
			M.value = e, S.setTheaterActive(e);
		}
		function Ve() {
			ne.value = !1, Pe();
		}
		return (e, t) => (q(), B("div", { class: G(["player-page", { "is-theater": M.value }]) }, [
			oe.value && !A.value && !j.value ? (q(), B("div", {
				key: 0,
				class: G(["player-page__ambient", { "is-preblurred": ae.value }]),
				style: K(oe.value),
				"aria-hidden": "true"
			}, null, 6)) : z("", !0),
			V("div", Da, [A.value ? (q(), B("div", Oa, [U(be, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : j.value ? (q(), R(pe, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: j.value
			}, {
				actions: $(() => [U(le, {
					variant: "solid",
					onClick: Me
				}, {
					default: $(() => [...t[1] ||= [H("Retry", -1)]]),
					_: 1
				}), U(le, {
					variant: "ghost",
					onClick: Pe
				}, {
					default: $(() => [...t[2] ||= [H("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : C.value ? (q(), R(wa, {
				key: 2,
				media: C.value,
				"stream-url": w.value,
				"stream-url-for": he,
				"api-base": Z(s),
				chapters: T.value,
				"intro-marker": E.value,
				"outro-marker": D.value,
				"playback-audio-tracks": O.value,
				"playback-subtitle-tracks": k.value,
				"prev-episode": re.value,
				"next-episode": N.value,
				autoplay: !0,
				onBack: Pe,
				onPlayNext: Re,
				onPlayEpisode: ze,
				onTheater: Be
			}, null, 8, [
				"media",
				"stream-url",
				"api-base",
				"chapters",
				"intro-marker",
				"outro-marker",
				"playback-audio-tracks",
				"playback-subtitle-tracks",
				"prev-episode",
				"next-episode"
			])) : z("", !0)]),
			U(ce, {
				modelValue: ne.value,
				"onUpdate:modelValue": t[0] ||= (e) => ne.value = e,
				title: "Can’t start playback",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: $(() => [U(le, {
					variant: "solid",
					onClick: Ve
				}, {
					default: $(() => [...t[3] ||= [H("OK", -1)]]),
					_: 1
				})]),
				default: $(() => [V("p", ka, X(te.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-3ae2a661"]]);
export { Aa as default };

//# sourceMappingURL=PlayerPage-DNwJaher.js.map