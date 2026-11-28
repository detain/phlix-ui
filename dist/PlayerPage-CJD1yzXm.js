import { S as e, o as t, t as n, y as r } from "./client-Bmlfq3Uy.js";
import { n as i, r as a } from "./useApiBase-DXTBY90j.js";
import { t as o } from "./useMessages-Bgh_YqAN.js";
import { r as s, t as c } from "./useImageSrc-CSM61b-l.js";
import { n as l } from "./media-query-D7hrCu8r.js";
import { a as u, t as d } from "./usePlayerStore-CAcZwoN3.js";
import { n as f, t as p } from "./ThumbRating-C8J1Fv8P.js";
import { a as m, c as h, d as g, f as _, l as v, n as y, o as b, r as x, s as S, t as C, u as w } from "./shortcuts-ChrVSQvG.js";
import { a as T } from "./usePreferencesStore-BXm_CP7M.js";
import { t as E } from "./useToastStore-CxO_ppM8.js";
import { n as D, t as O } from "./Icon-55iG1rR7.js";
import { t as k } from "./IconButton-DsjtwjU1.js";
import { n as A } from "./useFocusTrap-DStfPnC8.js";
import { t as j } from "./Slider-Bj5BaBUu.js";
import { t as M } from "./Select-BnpfIHZ2.js";
import { _ as N, a as ee, c as te, d as ne, f as re, g as ie, h as ae, i as P, l as oe, m as se, n as ce, o as le, p as ue, r as de, s as fe, t as pe, u as me, v as he } from "./captions-Cm_KIn16.js";
import { t as ge } from "./Modal-DU4sjMUz.js";
import { t as _e } from "./Button-DTiNkl61.js";
import { t as F } from "./Chip-BlQ-UqQ0.js";
import { t as ve } from "./Spinner-DCC4q3LN.js";
import { t as ye } from "./Badge-D7vacFbh.js";
import { t as be } from "./EmptyState-DjfWh3kt.js";
import { n as xe, r as Se, t as Ce } from "./SyncPlayModal-Cvc8b0Z7.js";
import { n as we, o as Te, r as Ee, t as De } from "./episode-order-DBEVgrOE.js";
import { t as Oe } from "./Skeleton-DDhrDRE7.js";
import { i as I } from "./usePageTitle-j6j9gAmo.js";
import { n as ke, r as Ae, t as je } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as L, Transition as Me, computed as R, createBlock as z, createCommentVNode as B, createElementBlock as V, createElementVNode as H, createTextVNode as U, createVNode as W, defineComponent as G, inject as Ne, mergeModels as Pe, nextTick as Fe, normalizeClass as K, normalizeStyle as Ie, onBeforeUnmount as Le, onMounted as Re, onScopeDispose as ze, openBlock as q, ref as J, renderList as Y, toDisplayString as X, toRef as Be, unref as Z, useModel as Ve, watch as Q, withCtx as $, withKeys as He, withModifiers as Ue } from "vue";
import { onBeforeRouteLeave as We, useRoute as Ge, useRouter as Ke } from "vue-router";
// src/components/player/transcode.ts
var qe = /* @__PURE__ */ new Set([
	"pending",
	"queued",
	"running",
	"completed",
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Je(e, t) {
	return typeof e == "string" && qe.has(e) ? e : t;
}
var Ye = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Xe(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Ze(e) {
	return e === !0 || e === "true" || e === 1;
}
function Qe(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function $e(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Xe(e.url ?? e.src);
		r !== "" && t.push({
			index: Qe(e.index),
			language: Xe(e.language ?? e.lang ?? e.srclang),
			label: Xe(e.label),
			default: Ze(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function et(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Qe(e.height);
		if (r <= 0) continue;
		let i = e.playlist_url ?? e.playlistUrl;
		t.push({
			id: Xe(e.id),
			label: Xe(e.label),
			height: r,
			width: Qe(e.width),
			bitrate: Qe(e.bitrate),
			...typeof e.url == "string" && e.url !== "" ? { url: e.url } : {},
			...typeof i == "string" && i !== "" ? { playlistUrl: i } : {}
		});
	}
	return t.length > 0 ? t : null;
}
function tt(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var nt = .7, rt = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], it = 1e7, at = "mobile-low";
function ot(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * nt;
}
function st(e) {
	let t = ot(e);
	if (t === void 0 || t >= it) return;
	let n = at;
	for (let [e, r] of rt) r <= t && (n = e);
	return n;
}
function ct(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function lt(e) {
	let t = e ?? {};
	return {
		jobId: Xe(t.job_id ?? t.jobId),
		masterUrl: Xe(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Je(t.status, "running"),
		reused: Ze(t.reused),
		subtitles: $e(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: et(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function ut(e) {
	let t = e ?? {};
	return {
		jobId: Xe(t.job_id ?? t.jobId),
		status: Je(t.status, "running"),
		playlistReady: Ze(t.playlist_ready ?? t.playlistReady),
		progress: Qe(t.progress),
		masterUrl: Xe(t.master_url ?? t.masterUrl),
		subtitles: $e(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: et(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function dt(e) {
	return e.playlistReady || e.status === "completed";
}
function ft(e) {
	return Ye.has(e);
}
function pt(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
// src/composables/useHlsTranscode.ts
var mt = "_master.m3u8";
function ht(e) {
	let t = J("idle"), r = J(0), i = J([]), a = J([]), o = J(-1), s = J(!0), c = J(null), l = J(null), d = J([]), f = J(-1), p = J(!1), m = J(null), h = J(null);
	function g(e) {
		if (!j) return;
		a.value = j.levels, o.value = j.getCurrentLevel(), s.value = j.autoLevelEnabled;
		let t = e ?? j.getCurrentLevel(), n = t >= 0 ? a.value.find((e) => e.index === t) : void 0;
		c.value = n ? n.height : null;
	}
	function v() {
		a.value = [], o.value = -1, s.value = !0, c.value = null, l.value = null;
	}
	function y(e) {
		j && (d.value = j.audioTracks, f.value = e ?? j.getCurrentAudioTrack());
	}
	function b() {
		j && (p.value = j.hasAudio());
	}
	function x() {
		d.value = [], f.value = -1, p.value = !1;
	}
	function S(t) {
		if (!t || t.length === 0) return;
		let n = e.apiBase(), r = t.map((e) => ({
			...e,
			...e.url ? { url: pt(n, e.url) } : {},
			...e.playlistUrl ? { playlistUrl: pt(n, e.playlistUrl) } : {}
		}));
		ne = r, l.value = r;
	}
	function C(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		i.value = t.map((e) => ({
			...e,
			url: pt(n, e.url)
		}));
	}
	let w = e.attach ?? _, T = e.pollIntervalMs ?? 1e3, E = e.maxWaitMs ?? 12e4, D = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), O = Math.max(1, Math.ceil(E / Math.max(1, T))), k = e.getToken ?? gt, A = e.probeRungPlaylist ?? ((e) => bt(e, k)), j = null, M = null, N = null, ee = null, te = !1, ne = [], re = 0, ie = null, ae = 0;
	function P() {
		return e.client ?? new n({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function oe(n, a, o, s) {
		de(), te = !1;
		let c = ++ae, l = () => te || c !== ae;
		ie = new AbortController(), t.value = "preparing", r.value = 0, i.value = [], v();
		try {
			let i = P(), c = lt(await i.post(tt(a, o), void 0, ie.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			C(c.subtitles), S(c.variants), m.value = c.jobId, h.value = pt(e.apiBase(), c.masterUrl);
			let d = c.status === "completed";
			for (let e = 0; !d && e < O; e++) {
				let e = ut(await i.get(ct(c.jobId), void 0, ie.signal));
				if (l()) return;
				if (r.value = e.progress, C(e.subtitles), S(e.variants), ft(e.status)) throw Error(`transcode ${e.status}`);
				if (dt(e)) {
					d = !0;
					break;
				}
				if (await D(T), l()) return;
			}
			if (!d) throw Error("transcode timed out");
			let f = await w(n, h.value, {
				getToken: k,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => {
					g(), y(), b();
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
			j = f, M = j.onLevelSwitched((e) => g(e)), N = j.onAudioTrackSwitched((e) => y(e)), ee = j.onLevelLoaded(() => {
				y(), b();
			}), g(), y(), b();
			try {
				let e = u();
				e.hlsMasterUrl = h.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function se(e) {
		j && (j.setCurrentLevel(e === "auto" ? -1 : e), g());
	}
	function ce(e) {
		j && (j.setNextLevel(e === "auto" ? -1 : e), g());
	}
	function le(e) {
		j && (j.setAudioTrack(e), y());
	}
	function ue(e) {
		if (!j || !h.value) return;
		let t = ne.find((t) => t.id === e), n = t?.playlistUrl ?? vt(h.value, e), r = t?.url ?? yt(h.value, e), i = ++re;
		(async () => {
			let e;
			try {
				e = await A(n);
			} catch {
				e = "unknown";
			}
			!te && i === re && j && (e === "absent" ? (console.warn(`[phlix-ui] rung mini-master unavailable (${n}) — this server has no per-rung index files; falling back to the legacy bare rung playlist (${r}). Multi-audio titles play silent on the video-only bare rung and the audio menu stays hidden (never a stale rendition list); muxed-audio titles play correctly. The menu returns once the server ships the index.`), j.loadSource(r)) : j.loadSource(n), v());
		})();
	}
	function de() {
		if (te = !0, re++, ie &&= (ie.abort(), null), M) {
			try {
				M();
			} catch {}
			M = null;
		}
		if (N) {
			try {
				N();
			} catch {}
			N = null;
		}
		if (ee) {
			try {
				ee();
			} catch {}
			ee = null;
		}
		if (j) {
			try {
				j.destroy();
			} catch {}
			j = null;
		}
		ne = [], m.value = null, h.value = null;
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
		masterUrl: h,
		loadVariantPlaylist: ue,
		start: oe,
		cleanup: de,
		reset: fe
	};
}
function gt() {
	try {
		return t().getAccessToken();
	} catch {
		return null;
	}
}
function _t(e) {
	let t = e.indexOf("?");
	return t === -1 ? [e, ""] : [e.slice(0, t), e.slice(t)];
}
function vt(e, t) {
	let [n, r] = _t(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}${mt}${r}`;
}
function yt(e, t) {
	let [n, r] = _t(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}.m3u8${r}`;
}
async function bt(e, t) {
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
// src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var xt = ["aria-label"], St = { class: "shortcuts__head" }, Ct = { class: "shortcuts__title" }, wt = { class: "shortcuts__grid" }, Tt = { class: "shortcuts__keys" }, Et = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Dt = {
	key: 1,
	class: "shortcuts__key"
}, Ot = { class: "shortcuts__label" }, kt = /*#__PURE__*/ D(/* @__PURE__ */ G({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => x }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = o(), a = J(null);
		return A(a, Be(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (q(), V("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Ue((e) => r("close"), ["self"])
		}, [H("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Z(i)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [H("div", St, [H("h3", Ct, X(Z(i)("player.keyboard")), 1), W(k, {
			name: "x",
			label: Z(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), H("ul", wt, [(q(!0), V(L, null, Y(e.shortcuts, (e) => (q(), V("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [H("span", Tt, [(q(!0), V(L, null, Y(e.keys, (e, t) => (q(), V(L, { key: t }, [e === "–" ? (q(), V("span", Et, "–")) : (q(), V("kbd", Dt, [Z(C)[e] ? (q(), z(O, {
			key: 0,
			name: Z(C)[e],
			label: Z(y)[e] ?? e
		}, null, 8, ["name", "label"])) : (q(), V(L, { key: 1 }, [U(X(e), 1)], 64))]))], 64))), 128))]), H("span", Ot, X(e.label), 1)]))), 128))])], 8, xt)])) : B("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), At = { class: "volume" }, jt = /*#__PURE__*/ D(/* @__PURE__ */ G({
	__name: "VolumeControl",
	setup(e) {
		let t = u(), n = T(), { t: r } = o(), i = R(() => t.muted ? 0 : t.volume), a = R(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function s(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Q(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (q(), V("div", At, [W(k, {
			name: a.value,
			label: Z(t).muted ? Z(r)("player.unmute") : Z(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => Z(t).toggleMute()
		}, null, 8, ["name", "label"]), W(j, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), Mt = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
		], n = u(), { t: r } = o(), i = R(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (q(), z(M, {
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
}), [["__scopeId", "data-v-4530b308"]]), Nt = "auto", Pt = "original";
function Ft(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function It(e) {
	return e >= 2160 ? "4K" : Ft(e);
}
function Lt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Ft(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: It(r.height)
		}));
	}
	return n;
}
function Rt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Ft(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function zt(e, t) {
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
function Bt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Vt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && zt(e, n) >= 0;
}
function Ht(e, t) {
	if (t < 0) return Nt;
	let n = e.find((e) => e.index === t);
	return n ? Ft(n.height) : Nt;
}
// src/components/player/QualityMenu.vue
var Ut = /*#__PURE__*/ D(/* @__PURE__ */ G({
	__name: "QualityMenu",
	props: /*@__PURE__*/ Pe({
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
	emits: /*@__PURE__*/ Pe(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, i = Ve(e, "open"), a = J(null);
		function s() {
			a.value?.toggleMenu();
		}
		let c = n, l = u(), d = T(), { t: f } = o(), p = R(() => Lt(r.levels)), m = R(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = p.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = Ft(i.height);
				e.has(a) || n && Rt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: It(i.height)
				}));
			}
			return t;
		}), h = R(() => p.value.length >= 2 ? p.value : m.value), g = R(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), _ = R(() => zt(r.levels, g.value)), v = R(() => g.value && _.value >= 0 ? {
			value: Pt,
			label: f("player.qualityOriginal", { height: g.value.height })
		} : null), y = R(() => h.value.length >= 2), b = R(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: It(r.activeHeight) })), x = R(() => [
			{
				value: Nt,
				label: b.value
			},
			...v.value ? [v.value] : [],
			...h.value
		]), S = R(() => r.autoEnabled ? Nt : v.value && r.currentLevel === _.value && (l.quality === "original" || d.defaultQuality === "original") ? Pt : Ht(r.levels, r.currentLevel));
		function C(e) {
			let t = String(e);
			if (t === "auto") {
				l.setQuality(t), d.defaultQuality = t, c("select", "auto");
				return;
			}
			let n = t === "original" ? _.value : Rt(r.levels, t);
			l.setQuality(t), d.defaultQuality = t, n >= 0 ? c("select", n) : c("select", t);
		}
		return t({ toggleMenu: s }), (e, t) => y.value || i.value ? (q(), z(M, {
			key: 0,
			ref_key: "selectRef",
			ref: a,
			class: "quality-menu",
			tone: "glass",
			"model-value": S.value,
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
		])) : B("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), Wt = /*#__PURE__*/ D(/* @__PURE__ */ G({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = u(), i = R(() => r.subtitleOffset + r.audioOffset), a = J([]), o = J(0), s = R(() => n.lifted ? o.value : 0), c = R(() => ({
			...oe(n.styleConfig),
			"--phlix-sub-offset": `${s.value}px`
		})), l = null;
		function d() {
			let e = n.controlsRoot;
			o.value = e && typeof e.offsetHeight == "number" ? e.offsetHeight : 0;
		}
		function f() {
			l?.disconnect(), l = null;
		}
		function p() {
			f(), d();
			let e = n.controlsRoot;
			e && typeof ResizeObserver < "u" && (l = new ResizeObserver(() => d()), l.observe(e));
		}
		Q(() => n.controlsRoot, p, { immediate: !0 }), Le(f);
		let m = null, h = null, g = null;
		function _() {
			if (!m) return [];
			if (i.value === 0) return se(m);
			let e = m.cues;
			if (!e || typeof e.length != "number") return se(m);
			let t = n.video && typeof n.video.currentTime == "number" ? n.video.currentTime : 0;
			return ae(m, te(t, i.value));
		}
		let v = null;
		function y() {
			a.value = _();
		}
		function b() {
			v?.removeEventListener?.("timeupdate", y), v = null;
		}
		function x() {
			let e = n.video, t = i.value !== 0 && !!m && !!e && typeof e.addEventListener == "function";
			t && e && v !== e ? (b(), e.addEventListener("timeupdate", y), v = e) : !t && v && b(), a.value = _();
		}
		function S() {
			a.value = _();
		}
		function C() {
			g != null && (clearTimeout(g), g = null);
		}
		function w() {
			C(), g = setTimeout(() => {
				if (g = null, !m) return;
				fe(n.video, n.language);
				let e = _();
				e.length && (a.value = e);
			}, 0);
		}
		function T() {
			C(), b(), m?.removeEventListener("cuechange", S), h?.removeEventListener("load", S), m = null, h = null;
		}
		function E(e, t) {
			let n = e?.querySelectorAll?.("track");
			if (!n) return null;
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r.track === t) return r;
			}
			return null;
		}
		function D() {
			T(), fe(n.video, n.language);
			let e = ie(n.video, n.language);
			if (e) {
				if (m = e, e.addEventListener("cuechange", S), a.value = _(), !a.value.length) {
					let t = E(n.video, e);
					t && t.readyState !== 2 && (h = t, t.addEventListener("load", S));
				}
				w(), x();
			} else a.value = [];
		}
		return Q(() => [n.video, n.language], D, { immediate: !0 }), Q(i, x), Le(T), t({ lines: a }), (t, n) => a.value.length ? (q(), V("div", {
			key: 0,
			class: K(["player__captions", { "is-lifted": e.lifted }]),
			style: Ie(c.value)
		}, [(q(!0), V(L, null, Y(a.value, (e, t) => (q(), V("p", {
			key: t,
			class: "player__caption-line"
		}, X(e), 1))), 128))], 6)) : B("", !0);
	}
}), [["__scopeId", "data-v-0c8b04d6"]]), Gt = ["aria-label", "aria-expanded"], Kt = ["aria-label"], qt = { class: "capmenu__head" }, Jt = { class: "capmenu__title" }, Yt = ["aria-label"], Xt = ["aria-checked", "tabindex"], Zt = { class: "capmenu__check" }, Qt = { class: "capmenu__optlabel" }, $t = [
	"aria-checked",
	"tabindex",
	"onClick"
], en = { class: "capmenu__check" }, tn = { class: "capmenu__optlabel" }, nn = { class: "capmenu__check" }, rn = { class: "capmenu__optlabel" }, an = { class: "capmenu__title capmenu__title--sub" }, on = ["aria-label"], sn = [
	"aria-checked",
	"tabindex",
	"onClick"
], cn = { class: "capmenu__check" }, ln = { class: "capmenu__optlabel" }, un = { class: "capmenu__field" }, dn = { class: "capmenu__fieldlabel" }, fn = ["aria-label"], pn = ["aria-label"], mn = { class: "capmenu__stepvalue" }, hn = ["aria-label"], gn = ["aria-label", "disabled"], _n = { class: "capmenu__field" }, vn = { class: "capmenu__fieldlabel" }, yn = ["aria-label"], bn = ["aria-label"], xn = { class: "capmenu__stepvalue" }, Sn = ["aria-label"], Cn = ["aria-label", "disabled"], wn = { class: "capmenu__title capmenu__title--sub" }, Tn = { class: "capmenu__style" }, En = { class: "capmenu__field" }, Dn = { class: "capmenu__fieldlabel" }, On = { class: "capmenu__field" }, kn = { class: "capmenu__fieldlabel" }, An = { class: "capmenu__field" }, jn = { class: "capmenu__fieldlabel" }, Mn = { class: "capmenu__field" }, Nn = { class: "capmenu__fieldlabel" }, Pn = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
		let n = e, r = t, i = u(), a = T(), { t: s } = o(), c = Ne("phlixConfig", null), l = R(() => c?.locale ?? null), f = R(() => ue(P, s)), p = R(() => ue(ce, s)), m = R(() => ue(pe, s)), h = R(() => ue(de, s)), g = J(null), _ = J(null), v = R(() => i.subtitleLang), y = R(() => n.tracks.some((e) => he(e) === v.value)), b = R(() => y.value ? "captions" : "captions-off"), x = R(() => y.value ? n.tracks.findIndex((e) => he(e) === v.value) + 1 : 0), S = R(() => n.activeAudio >= 0 ? n.activeAudio : 0);
		function C(e) {
			r("update:open", e);
		}
		function w() {
			C(!1);
		}
		function E(e) {
			i.setSubtitle(e), a.defaultSubtitleLang = e, a.subtitlePreferenceSet = !0;
		}
		function D(e) {
			r("select-audio", e);
		}
		function j() {
			r("add-subtitles"), w();
		}
		function ee(e, t, n) {
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
		function te(e) {
			let t = ee(e, n.tracks.length + 1, x.value);
			t !== null && E(t === 0 ? null : he(n.tracks[t - 1]));
		}
		function ne(e) {
			let t = ee(e, n.audioTracks.length, S.value);
			t !== null && D(n.audioTracks[t].index);
		}
		function re(e) {
			a.captionStyle = {
				...a.captionStyle,
				size: e
			};
		}
		function ie(e) {
			a.captionStyle = {
				...a.captionStyle,
				textColor: String(e)
			};
		}
		function ae(e) {
			a.captionStyle = {
				...a.captionStyle,
				background: e
			};
		}
		function oe(e) {
			a.captionStyle = {
				...a.captionStyle,
				edge: e
			};
		}
		function se(e) {
			i.setSubtitleOffset(i.subtitleOffset + e * d);
		}
		function le(e) {
			i.setAudioOffset(i.audioOffset + e * d);
		}
		function fe() {
			i.setSubtitleOffset(0);
		}
		function me() {
			i.setAudioOffset(0);
		}
		function ge(e) {
			let t = e === 0 ? 0 : e;
			return t > 0 ? `+${t.toFixed(1)}` : t.toFixed(1);
		}
		A(_, Be(n, "open"), {
			lockScroll: !1,
			onEscape: () => (w(), !0)
		});
		function _e(e) {
			g.value && !g.value.contains(e.target) && w();
		}
		return Q(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", _e, !0) : document.removeEventListener("pointerdown", _e, !0));
		}, { immediate: !0 }), Le(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", _e, !0);
		}), (t, n) => (q(), V("div", {
			ref_key: "rootEl",
			ref: g,
			class: "capmenu"
		}, [H("button", {
			type: "button",
			class: K(["capmenu__btn", { "is-active": y.value }]),
			"aria-label": y.value ? Z(s)("player.captionsOn") : Z(s)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => C(!e.open)
		}, [W(O, { name: b.value }, null, 8, ["name"])], 10, Gt), e.open ? (q(), V("div", {
			key: 0,
			ref_key: "panelEl",
			ref: _,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Z(s)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			H("div", qt, [H("h3", Jt, X(Z(s)("player.subtitles")), 1), W(k, {
				name: "x",
				label: Z(s)("common.close"),
				size: "sm",
				onClick: w
			}, null, 8, ["label"])]),
			H("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Z(s)("player.subtitleTrack"),
				onKeydown: te
			}, [H("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !y.value,
				tabindex: x.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => E(null)
			}, [H("span", Zt, [y.value ? B("", !0) : (q(), z(O, {
				key: 0,
				name: "check"
			}))]), H("span", Qt, X(Z(s)("player.off")), 1)], 8, Xt), (q(!0), V(L, null, Y(e.tracks, (e, t) => (q(), V("button", {
				key: Z(he)(e),
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": v.value === Z(he)(e),
				tabindex: x.value === t + 1 ? 0 : -1,
				onClick: (t) => E(Z(he)(e))
			}, [H("span", en, [v.value === Z(he)(e) ? (q(), z(O, {
				key: 0,
				name: "check"
			})) : B("", !0)]), H("span", tn, X(Z(N)(e, Z(s), l.value)), 1)], 8, $t))), 128))], 40, Yt),
			H("button", {
				type: "button",
				class: "capmenu__add",
				onClick: j
			}, [H("span", nn, [W(O, { name: "plus" })]), H("span", rn, X(Z(s)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 0 ? (q(), V(L, { key: 0 }, [H("h3", an, X(Z(s)("player.audio")), 1), H("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Z(s)("player.audioTrack"),
				onKeydown: ne
			}, [(q(!0), V(L, null, Y(e.audioTracks, (t) => (q(), V("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: S.value === t.index ? 0 : -1,
				onClick: (e) => D(t.index)
			}, [H("span", cn, [e.activeAudio === t.index ? (q(), z(O, {
				key: 0,
				name: "check"
			})) : B("", !0)]), H("span", ln, X(Z(N)(t, Z(s), l.value)), 1)], 8, sn))), 128))], 40, on)], 64)) : B("", !0),
			H("div", un, [H("span", dn, X(Z(s)("player.subtitleDelay")), 1), H("div", {
				class: "capmenu__stepper",
				role: "group",
				"aria-label": Z(s)("player.subtitleDelay")
			}, [
				H("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": Z(s)("player.delayDecrease"),
					onClick: n[2] ||= (e) => se(-1)
				}, "−", 8, pn),
				H("span", mn, X(Z(s)("player.delayValue", { offset: ge(Z(i).subtitleOffset) })), 1),
				H("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": Z(s)("player.delayIncrease"),
					onClick: n[3] ||= (e) => se(1)
				}, "+", 8, hn),
				H("button", {
					type: "button",
					class: "capmenu__stepbtn capmenu__stepreset",
					"aria-label": Z(s)("player.delayReset"),
					disabled: Z(i).subtitleOffset === 0,
					onClick: n[4] ||= (e) => fe()
				}, "↺", 8, gn)
			], 8, fn)]),
			H("div", _n, [H("span", vn, X(Z(s)("player.audioDelay")), 1), H("div", {
				class: "capmenu__stepper",
				role: "group",
				"aria-label": Z(s)("player.audioDelay")
			}, [
				H("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": Z(s)("player.delayDecrease"),
					onClick: n[5] ||= (e) => le(-1)
				}, "−", 8, bn),
				H("span", xn, X(Z(s)("player.delayValue", { offset: ge(Z(i).audioOffset) })), 1),
				H("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": Z(s)("player.delayIncrease"),
					onClick: n[6] ||= (e) => le(1)
				}, "+", 8, Sn),
				H("button", {
					type: "button",
					class: "capmenu__stepbtn capmenu__stepreset",
					"aria-label": Z(s)("player.delayReset"),
					disabled: Z(i).audioOffset === 0,
					onClick: n[7] ||= (e) => me()
				}, "↺", 8, Cn)
			], 8, yn)]),
			H("h3", wn, X(Z(s)("player.captionStyle")), 1),
			H("div", Tn, [
				H("div", En, [H("span", Dn, X(Z(s)("player.size")), 1), W(M, {
					"model-value": Z(a).captionStyle.size,
					options: f.value,
					label: Z(s)("player.captionSize"),
					"onUpdate:modelValue": re
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				H("div", On, [H("span", kn, X(Z(s)("player.color")), 1), W(M, {
					"model-value": Z(a).captionStyle.textColor,
					options: p.value,
					label: Z(s)("player.captionColor"),
					"onUpdate:modelValue": ie
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				H("div", An, [H("span", jn, X(Z(s)("player.background")), 1), W(M, {
					"model-value": Z(a).captionStyle.background,
					options: m.value,
					label: Z(s)("player.captionBackground"),
					"onUpdate:modelValue": ae
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				H("div", Mn, [H("span", Nn, X(Z(s)("player.edge")), 1), W(M, {
					"model-value": Z(a).captionStyle.edge,
					options: h.value,
					label: Z(s)("player.captionEdge"),
					"onUpdate:modelValue": oe
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Kt)) : B("", !0)], 512));
	}
}), [["__scopeId", "data-v-78cae753"]]), Fn = { class: "subsearch" }, In = { class: "subsearch__langs" }, Ln = { class: "subsearch__legend" }, Rn = { class: "subsearch__chips" }, zn = { class: "subsearch__actions" }, Bn = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, Vn = {
	key: 2,
	class: "subsearch__prompt"
}, Hn = {
	key: 3,
	class: "subsearch__list"
}, Un = { class: "subsearch__meta" }, Wn = { class: "subsearch__release" }, Gn = { class: "subsearch__signals" }, Kn = { class: "subsearch__provider" }, qn = ["aria-label"], Jn = {
	key: 2,
	class: "subsearch__stat"
}, Yn = {
	key: 3,
	class: "subsearch__stat"
}, Xn = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
		let i = t, a = r, { t: s } = o(), c = E(), l = Ne("phlixConfig", null), u = R(() => l?.locale ?? null), d = [
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
		], f = R(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...i.preferredLangs, ...d]) {
				let r = (n || "").toLowerCase();
				r && !e.has(r) && (e.add(r), t.push(r));
			}
			return t;
		}), p = J(/* @__PURE__ */ new Set());
		function m() {
			let e = /* @__PURE__ */ new Set();
			for (let t of i.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), p.value = e;
		}
		function h(e) {
			let t = new Set(p.value);
			t.has(e) ? t.delete(e) : t.add(e), p.value = t;
		}
		let g = J(!1), _ = J(!1), v = J([]), y = J(/* @__PURE__ */ new Set()), b = J(/* @__PURE__ */ new Set());
		function x(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let S = R(() => [...v.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), C = R(() => p.value.size > 0 && !g.value);
		function w() {
			return i.client ?? new n({ baseUrl: i.apiBase ?? "" });
		}
		async function T() {
			if (C.value) {
				g.value = !0, _.value = !0;
				try {
					v.value = await w().searchSubtitles(i.mediaId, [...p.value]);
				} catch {
					v.value = [], c.error(s("player.subtitleSearchError"));
				} finally {
					g.value = !1;
				}
			}
		}
		function D() {
			a("update:open", !1);
		}
		function k(t) {
			if (t instanceof e) {
				if (t.status === 429) {
					let e = t.body && typeof t.body == "object" ? t.body : {}, n = typeof e.downloadsRemaining == "number" ? e.downloadsRemaining : null, r = typeof e.resetTimeUtc == "string" ? e.resetTimeUtc : null;
					r ? c.warning(s("player.subtitleQuotaReset", { time: A(r) })) : n === null ? c.warning(s("player.subtitleQuota")) : c.warning(s("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (t.status === 404) {
					c.error(s("player.subtitleAddNotFound"));
					return;
				}
			}
			c.error(s("player.subtitleAddError"));
		}
		function A(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function j(e) {
			let t = x(e);
			if (y.value.has(t) || b.value.has(t)) return;
			let n = new Set(y.value);
			n.add(t), y.value = n;
			try {
				let n = $e([(await w().downloadSubtitle(i.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], r = new Set(b.value);
				r.add(t), b.value = r;
				let o = me(e.language, u.value);
				c.success(o ? s("player.subtitleAdded", { language: o }) : s("player.subtitleAddedGeneric")), n && a("added", n);
			} catch (e) {
				k(e);
			} finally {
				let e = new Set(y.value);
				e.delete(t), y.value = e;
			}
		}
		return Q(() => i.open, (e) => {
			e && (m(), v.value = [], _.value = !1, g.value = !1, y.value = /* @__PURE__ */ new Set(), b.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (e, n) => (q(), z(ge, {
			"model-value": t.open,
			title: Z(s)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: $(() => [W(_e, {
				variant: "ghost",
				onClick: D
			}, {
				default: $(() => [U(X(Z(s)("common.close")), 1)]),
				_: 1
			})]),
			default: $(() => [H("div", Fn, [
				H("fieldset", In, [H("legend", Ln, X(Z(s)("player.subtitleSearchLanguages")), 1), H("div", Rn, [(q(!0), V(L, null, Y(f.value, (e) => (q(), z(F, {
					key: e,
					selected: p.value.has(e),
					size: "md",
					"aria-label": Z(me)(e, u.value),
					"onUpdate:selected": (t) => h(e)
				}, {
					default: $(() => [U(X(Z(me)(e, u.value)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				H("div", zn, [W(_e, {
					variant: "solid",
					"left-icon": "search",
					loading: g.value,
					disabled: !C.value,
					onClick: T
				}, {
					default: $(() => [U(X(Z(s)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				g.value ? (q(), V("div", Bn, [W(ve, { label: Z(s)("player.subtitleSearching") }, null, 8, ["label"]), H("span", null, X(Z(s)("player.subtitleSearching")), 1)])) : _.value && S.value.length === 0 ? (q(), z(be, {
					key: 1,
					icon: "captions",
					title: Z(s)("player.subtitleSearchEmpty"),
					description: Z(s)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : _.value ? (q(), V("ul", Hn, [(q(!0), V(L, null, Y(S.value, (e) => (q(), V("li", {
					key: x(e),
					class: "subsearch__item"
				}, [H("div", Un, [H("p", Wn, X(e.releaseName || e.provider), 1), H("div", Gn, [
					W(ye, {
						tone: "neutral",
						size: "sm"
					}, {
						default: $(() => [U(X(Z(me)(e.language, u.value)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (q(), z(ye, {
						key: 0,
						tone: "info",
						size: "sm",
						label: Z(s)("player.subtitleHearingImpairedFull")
					}, {
						default: $(() => [U(X(Z(s)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : B("", !0),
					H("span", Kn, X(e.provider), 1),
					e.rating > 0 ? (q(), V("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": Z(s)("player.subtitleRating", { rating: e.rating })
					}, [W(O, { name: "star" }), U(" " + X(e.rating), 1)], 8, qn)) : B("", !0),
					e.downloadCount > 0 ? (q(), V("span", Jn, X(Z(s)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : B("", !0),
					e.fps ? (q(), V("span", Yn, X(Z(s)("player.subtitleFps", { fps: e.fps })), 1)) : B("", !0)
				])]), W(_e, {
					variant: "outline",
					size: "sm",
					"left-icon": b.value.has(x(e)) ? "check" : "plus",
					loading: y.value.has(x(e)),
					disabled: y.value.has(x(e)) || b.value.has(x(e)),
					"aria-label": Z(s)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => j(e)
				}, {
					default: $(() => [U(X(y.value.has(x(e)) ? Z(s)("player.subtitleAdding") : Z(s)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (q(), V("p", Vn, X(Z(s)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-f0470f79"]]), Zn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Qn(e, t, n, r, i, a, o) {
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
		r: Zn(d / m),
		g: Zn(f / m),
		b: Zn(p / m)
	};
}
function $n(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Qn(e, t, n, 0, 0, r, n),
		right: Qn(e, t, n, t - r, 0, t, n),
		center: Qn(e, t, n, 0, 0, t, n)
	};
}
function er({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
var tr = (e) => `${Math.round(e * 1e3) / 10}%`;
function nr(e, t = 1) {
	return rr(e, t).map((e) => `radial-gradient(${tr(e.rx)} ${tr(e.ry)} at ${tr(e.cx)} ${tr(e.cy)}, ${er(e.color, e.alpha)}, transparent ${tr(e.stop)})`).join(", ");
}
function rr(e, t = 1) {
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
function ir(e, t) {
	e.clearRect(0, 0, 112, 72), e.filter = "blur(3px)";
	for (let n of t) {
		let t = 8 + n.cx * 96, r = 9 + n.cy * 54, i = n.rx * 96, a = n.ry * 54;
		e.save(), e.translate(t, r), e.scale(i, a);
		let o = e.createRadialGradient(0, 0, 0, 0, 0, 1), { r: s, g: c, b: l } = n.color;
		o.addColorStop(0, er(n.color, n.alpha)), o.addColorStop(n.stop, `rgba(${s}, ${c}, ${l}, 0)`), e.fillStyle = o, e.fillRect((8 - t) / i, (9 - r) / a, 96 / i, 54 / a), e.restore();
	}
}
function ar(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var or = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
			r.value = ar(i);
		}
		let o = R(() => n.enabled && !n.reducedMotion && !r.value), s = R(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = J(null), l = J(null), u = null, d = null, f = !1;
		function p(e) {
			if (f || typeof document > "u") return null;
			try {
				if (!d && (u = document.createElement("canvas"), u.width = 112, u.height = 72, d = u.getContext("2d"), !d)) throw Error("no 2d context");
				ir(d, rr(e));
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
				let { data: n } = t.getImageData(0, 0, 32, 18), r = $n(n, 32, 18), i = p(r);
				l.value = i, c.value = i ? null : nr(r);
			} catch {
				_ = !0, c.value = null, l.value = null;
			}
		}
		function b(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let x = null, S = null, C = null, w = 0, T = !1;
		function E(e) {
			S = e, x = e.requestVideoFrameCallback(D);
		}
		function D(e) {
			if (!T) return;
			e - w >= 250 && (w = e, y());
			let t = n.video;
			b(t) && E(t);
		}
		function O() {
			if (T || !o.value || !n.video) return;
			let e = n.video;
			b(e) ? (T = !0, w = 0, E(e)) : (y(), _ || (T = !0, C = setInterval(y, 250)));
		}
		function k() {
			T = !1, x != null && S && S.cancelVideoFrameCallback(x), x = null, S = null, C != null && (clearInterval(C), C = null);
		}
		Q(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			k(), e && t && O();
		}, { immediate: !0 }), Re(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Le(() => {
			k(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let A = R(() => {
			let e = { opacity: String(s.value) };
			return l.value ? e.backgroundImage = `url("${l.value}")` : c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: y }), (e, t) => (q(), V("div", {
			class: K(["player__ambient", {
				"is-active": o.value,
				"is-bitmap": o.value && !!l.value
			}]),
			style: Ie(o.value ? A.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-ba42f7c0"]]), sr = ["aria-label"], cr = { class: "resume__label" }, lr = { class: "resume__time numeric" }, ur = { class: "resume__actions" }, dr = /*#__PURE__*/ D(/* @__PURE__ */ G({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = o(), i = R(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (q(), V("div", {
			class: "resume",
			role: "region",
			"aria-label": Z(r)("player.resumePlayback")
		}, [H("p", cr, [
			U(X(i.value[0]), 1),
			H("span", lr, X(Z(h)(e.seconds)), 1),
			U(X(i.value[1]), 1)
		]), H("div", ur, [H("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [W(O, { name: "play" }), H("span", null, X(Z(r)("player.resume")), 1)]), H("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [W(O, { name: "rewind" }), H("span", null, X(Z(r)("player.startOver")), 1)])])], 8, sr));
	}
}), [["__scopeId", "data-v-271c5209"]]), fr = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], pr = /* @__PURE__ */ new Set([
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
function mr(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function hr(...e) {
	return e.some((e) => pr.has(mr(e)));
}
function gr(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function _r(e) {
	return e?.error?.code === 2;
}
var vr = 3e4;
function yr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && Er.get(t) === "hevc";
}
function br(e) {
	let t = { forceTranscode: "1" };
	return yr(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function xr(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
function Sr(e) {
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
			labelKind: a ? "title" : i ? void 0 : "generated",
			default: e.default === !0,
			codec: s
		});
	}
	return t;
}
var Cr = 2 * Math.PI * 15;
function wr(e, t, n = Cr) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Tr = /* @__PURE__ */ new Map([
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
]), Er = /* @__PURE__ */ new Map([
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
]), Dr = /* @__PURE__ */ new Set(["h264"]), Or = /* @__PURE__ */ new Map([
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
function kr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = Er.get(t);
	return n === void 0 ? "transcode" : Dr.has(n) ? "direct" : "probe";
}
function Ar(e) {
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
var jr = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function Mr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return jr.get(t) ?? "video/mp4";
}
function Nr(e, t = "video/mp4") {
	let n = Tr.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function Pr(e, t = "video/mp4") {
	if (!e) return !0;
	let n = Nr(e, t);
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
async function Fr(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = Er.get(n), i = r === void 0 ? void 0 : Or.get(r);
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
async function Ir(e, t, n = "") {
	if (hr(...e)) return !0;
	let r = e.map((e) => mr(e)).find((e) => fr.includes(e)) ?? "";
	if (!fr.includes(r)) return !1;
	let i = Mr(r), a = kr(n);
	if (a === "transcode" || a === "probe" && !await Fr(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await Pr(e.codec, i)) return !0;
	}
	return !1;
}
// src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Lr = ["aria-label"], Rr = ["src"], zr = { class: "upnext__body" }, Br = { class: "upnext__eyebrow" }, Vr = { class: "upnext__title" }, Hr = {
	key: 0,
	class: "upnext__cd numeric"
}, Ur = { class: "upnext__actions" }, Wr = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Gr = ["r"], Kr = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], qr = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
		let { t: n } = o(), { imgSrc: r } = c(), i = e, a = t, s = R(() => i.posterUrl ?? i.media.poster_url ?? null), l = R(() => wr(i.remaining, i.total));
		return (t, i) => (q(), V("aside", {
			class: "upnext",
			role: "region",
			"aria-label": Z(n)("player.upNext")
		}, [
			s.value ? (q(), V("img", {
				key: 0,
				class: "upnext__thumb",
				src: Z(r)(s.value),
				alt: "",
				loading: "lazy"
			}, null, 8, Rr)) : B("", !0),
			H("div", zr, [
				H("p", Br, X(Z(n)("player.upNext")), 1),
				H("h4", Vr, X(e.media.name), 1),
				e.counting ? (q(), V("p", Hr, X(e.remaining > 0 ? Z(n)("player.startsIn", { count: e.remaining }) : Z(n)("player.startingNow")), 1)) : B("", !0),
				H("div", Ur, [H("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [W(O, { name: "play" }), H("span", null, X(Z(n)("player.playNow")), 1)]), H("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, X(Z(n)("player.cancel")), 1)])
			]),
			e.counting ? (q(), V("svg", Wr, [H("circle", {
				cx: "18",
				cy: "18",
				r: Z(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Gr), H("circle", {
				cx: "18",
				cy: "18",
				r: Z(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Z(Cr),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Kr)])) : B("", !0)
		], 8, Lr));
	}
}), [["__scopeId", "data-v-3fc667d0"]]), Jr = {
	class: "transcode",
	role: "alert"
}, Yr = { class: "transcode__card" }, Xr = { class: "transcode__heading" }, Zr = { class: "transcode__body" }, Qr = /*#__PURE__*/ D(/* @__PURE__ */ G({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = o();
		return (t, i) => (q(), V("div", Jr, [H("div", Yr, [
			W(O, {
				name: "alert",
				class: "transcode__icon"
			}),
			H("h3", Xr, X(Z(r)("player.transcodeHeading")), 1),
			H("p", Zr, X(e.title ? Z(r)("player.transcodeBodyTitled", { title: e.title }) : Z(r)("player.transcodeBodyUntitled")), 1),
			H("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [W(O, { name: "arrow-left" }), H("span", null, X(Z(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), $r = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, ei = { class: "prep__card" }, ti = { class: "prep__heading" }, ni = { class: "prep__body" }, ri = ["aria-valuenow"], ii = /*#__PURE__*/ D(/* @__PURE__ */ G({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = o(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (q(), V("div", $r, [H("div", ei, [
			W(O, {
				name: "spinner",
				class: "prep__spinner"
			}),
			H("h3", ti, X(Z(n)("player.transcodePreparingHeading")), 1),
			H("p", ni, X(e.title ? Z(n)("player.transcodePreparingTitled", { title: e.title }) : Z(n)("player.transcodePreparingUntitled")), 1),
			H("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [H("div", {
				class: "prep__bar-fill",
				style: Ie({ width: r() + "%" })
			}, null, 4)], 8, ri),
			H("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [W(O, { name: "arrow-left" }), H("span", null, X(Z(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), ai = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
		let s = R(() => a(n.position, n.introMarker) ? {
			label: i("player.skipIntro"),
			target: n.introMarker.end
		} : a(n.position, n.outroMarker) ? {
			label: i("player.skipOutro"),
			target: n.outroMarker.end
		} : null);
		function c() {
			s.value && r("skip", s.value.target);
		}
		return (e, t) => (q(), z(Me, { name: "skip" }, {
			default: $(() => [s.value ? (q(), V("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ue(c, ["stop"])
			}, [H("span", null, X(s.value.label), 1), W(O, { name: "skip-forward" })])) : B("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), oi = ["aria-label"], si = ["onClick"], ci = { class: "skip-controls__label" }, li = 5, ui = 30, di = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
			let n = a(e.startMs), r = n - li, i = n + ui;
			return t >= r && t < i;
		}
		let l = [
			"intro",
			"outro",
			"credits"
		];
		function u(e) {
			return l.includes(e);
		}
		function d(e) {
			return u(e.type);
		}
		function f(e) {
			switch (e) {
				case "intro": return i("player.skipIntro");
				case "outro": return i("player.skipOutro");
				case "credits": return i("player.skipLabelSkipCredits");
			}
		}
		let p = R(() => !n.markers || n.markers.length === 0 ? [] : n.markers.filter(d).filter((e) => c(e, n.position)).sort((e, t) => e.startMs - t.startMs));
		function m(e) {
			r("skip", a(e.startMs));
		}
		return (e, t) => p.value.length > 0 ? (q(), V("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": Z(i)("player.skipControls")
		}, [(q(!0), V(L, null, Y(p.value, (e) => (q(), V("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			onClick: Ue((t) => m(e), ["stop"])
		}, [H("span", ci, X(f(e.type)), 1), W(O, { name: "skip-forward" })], 8, si))), 128))], 8, oi)) : B("", !0);
	}
}), [["__scopeId", "data-v-29a255de"]]), fi = ["aria-label", "aria-expanded"], pi = ["aria-label"], mi = { class: "chapterlist__head" }, hi = { class: "chapterlist__title" }, gi = ["aria-label"], _i = ["onClick"], vi = { class: "chapterlist__index" }, yi = { class: "chapterlist__name" }, bi = { class: "chapterlist__meta" }, xi = { class: "chapterlist__time" }, Si = {
	key: 0,
	class: "chapterlist__duration"
}, Ci = {
	key: 1,
	class: "chapterlist__empty"
}, wi = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
		let c = R(() => n.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = h(e.start), a;
			if (e.end != null && e.end > e.start) {
				let t = e.end - e.start;
				a = h(t);
			}
			return {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), l = J(null), u = J(null);
		A(u, Be(n, "open"), {
			lockScroll: !1,
			onEscape: () => (a(), !0)
		});
		function d(e) {
			l.value && !l.value.contains(e.target) && a();
		}
		Q(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", d, !0) : document.removeEventListener("pointerdown", d, !0));
		}), Le(() => {
			document.removeEventListener("pointerdown", d, !0);
		});
		function f(e) {
			r("seek", e.start), a();
		}
		return (t, n) => (q(), V("div", {
			ref_key: "rootEl",
			ref: l,
			class: "chapterlist"
		}, [H("button", {
			type: "button",
			class: K(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": Z(i)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: s
		}, [W(O, { name: "list" })], 10, fi), e.open ? (q(), V("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Z(i)("player.chapterList"),
			tabindex: "-1"
		}, [H("div", mi, [H("h3", hi, X(Z(i)("player.chapters")), 1), W(k, {
			name: "x",
			label: Z(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), c.value.length > 0 ? (q(), V("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": Z(i)("player.chapterList")
		}, [(q(!0), V(L, null, Y(c.value, (e) => (q(), V("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [H("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => f(e.chapter)
		}, [
			H("span", vi, X(e.index), 1),
			H("span", yi, X(e.label), 1),
			H("span", bi, [H("span", xi, X(e.startLabel), 1), e.durationLabel ? (q(), V("span", Si, "· " + X(e.durationLabel), 1)) : B("", !0)])
		], 8, _i)]))), 128))], 8, gi)) : (q(), V("p", Ci, X(Z(i)("player.noChapters")), 1))], 8, pi)) : B("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Ti = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Ei = { class: "marker-timeline__ticks" }, Di = [
	"title",
	"aria-label",
	"onClick"
], Oi = { class: "marker-timeline__tooltip" }, ki = { class: "marker-timeline__tooltip-label" }, Ai = { class: "marker-timeline__tooltip-time numeric" }, ji = ["onClick"], Mi = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
		let s = R(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = R(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = R(() => c.value !== null), u = R(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (q(), V("div", {
			key: 0,
			class: K(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (q(), V("div", Ti, [t[0] ||= H("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [H("polygon", { points: "5,3 19,12 5,21" })], -1), U(" " + X(u.value), 1)])) : B("", !0), H("div", Ei, [(q(!0), V(L, null, Y(s.value, (e) => (q(), V("button", {
			key: e.id,
			type: "button",
			class: K(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: Ie({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Z(h)(e.startSec)}`,
			"aria-label": `${e.label} at ${Z(h)(e.startSec)}`,
			onClick: Ue((t) => d(e), ["stop"])
		}, [H("span", Oi, [
			H("span", ki, X(e.label), 1),
			H("span", Ai, X(Z(h)(e.startSec)), 1),
			H("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ue((t) => f(e), ["stop"])
			}, " Find similar ", 8, ji)
		])], 14, Di))), 128))])], 2)) : B("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Ni = [
	"aria-label",
	"aria-expanded",
	"aria-controls",
	"onKeydown"
], Pi = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, Fi = ["aria-label"], Ii = [
	"aria-selected",
	"tabindex",
	"onFocus",
	"onClick"
], Li = /*#__PURE__*/ D(/* @__PURE__ */ G({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(e, { expose: t }) {
		let n = e, { t: r } = o(), i = [
			5,
			15,
			30,
			45,
			60,
			90
		], a = R(() => [{
			value: 0,
			label: r("player.off")
		}, ...i.map((e) => ({
			value: e * 60,
			label: r("media.runtimeMinutes", { minutes: e })
		}))]), s = J(0), c = J(0), l = R(() => c.value > 0), u;
		function d() {
			u &&= (clearInterval(u), void 0);
		}
		function f(e) {
			d(), c.value = e, e <= 0 || (u = setInterval(() => {
				--c.value, c.value <= 0 && (d(), c.value = 0, n.onExpire());
			}, 1e3));
		}
		function p(e) {
			s.value = e, e === 0 ? (d(), c.value = 0) : f(e);
		}
		function m(e) {
			let t = Math.floor(e / 60), n = e % 60;
			return `${t}:${String(n).padStart(2, "0")}`;
		}
		let h = J(!1), g = J(null), _ = J(null), v = J(null), y = J(0);
		function b() {
			l.value ? (p(0), h.value = !1) : h.value = !h.value;
		}
		function x() {
			return Array.from(v.value?.querySelectorAll("[role=\"option\"]") ?? []);
		}
		function S(e, t) {
			e.length !== 0 && e[(t % e.length + e.length) % e.length]?.focus();
		}
		function C() {
			let e = a.value.findIndex((e) => e.value === s.value);
			y.value = e >= 0 ? e : 0, h.value = !0;
		}
		function w(e) {
			h.value = !1, e && Fe(() => _.value?.focus());
		}
		function T(e, t = !0) {
			p(e), h.value = !1, t && Fe(() => _.value?.focus());
		}
		function E(e) {
			let t = x();
			if (t.length !== 0) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), S(t, y.value + 1);
					break;
				case "ArrowUp":
					e.preventDefault(), S(t, y.value - 1);
					break;
				case "Home":
					e.preventDefault(), S(t, 0);
					break;
				case "End":
					e.preventDefault(), S(t, t.length - 1);
					break;
				case "Enter":
				case " ":
					e.preventDefault(), T(a.value[y.value]?.value ?? 0);
					break;
				case "Escape":
					e.preventDefault(), e.stopPropagation(), w(!0);
					break;
				case "Tab": w(!1);
			}
		}
		function D(e) {
			y.value = e;
		}
		function k(e) {
			g.value && e.target instanceof Node && !g.value.contains(e.target) && w(!1);
		}
		return Q(h, (e) => {
			typeof document < "u" && (e ? (document.addEventListener("pointerdown", k, !0), Fe(() => S(x(), y.value))) : document.removeEventListener("pointerdown", k, !0));
		}), Le(() => {
			d(), typeof document < "u" && document.removeEventListener("pointerdown", k, !0);
		}), t({ toggleOpen: b }), (e, t) => (q(), V("div", {
			ref_key: "rootEl",
			ref: g,
			class: K(["sleep-timer", { "is-active": l.value }])
		}, [H("button", {
			ref_key: "triggerEl",
			ref: _,
			type: "button",
			class: K(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? Z(r)("player.sleepTimerRemaining", { time: m(c.value) }) : Z(r)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			"aria-controls": h.value ? "sleep-timer-menu" : void 0,
			onClick: b,
			onKeydown: [He(Ue(C, ["prevent"]), ["down"]), He(Ue(C, ["prevent"]), ["up"])]
		}, [W(O, { name: "moon" }), l.value ? (q(), V("span", Pi, X(m(c.value)), 1)) : B("", !0)], 42, Ni), W(Me, { name: "dropdown" }, {
			default: $(() => [h.value ? (q(), V("ul", {
				key: 0,
				ref_key: "menuEl",
				ref: v,
				id: "sleep-timer-menu",
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": Z(r)("player.sleepTimer"),
				onKeydown: E
			}, [(q(!0), V(L, null, Y(a.value, (e, t) => (q(), V("li", {
				key: e.value,
				class: K(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				tabindex: y.value === t ? 0 : -1,
				onFocus: (e) => D(t),
				onClick: (t) => T(e.value)
			}, X(e.label), 43, Ii))), 128))], 40, Fi)) : B("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-8fd9146b"]]), Ri = {
	key: 0,
	class: "syncplay-overlay"
}, zi = { class: "syncplay-overlay__badge" }, Bi = { class: "syncplay-overlay__label" }, Vi = { class: "syncplay-overlay__status-label" }, Hi = { class: "syncplay-overlay__members" }, Ui = { class: "syncplay-overlay__member-count" }, Wi = { class: "syncplay-overlay__member-list" }, Gi = { class: "syncplay-overlay__member-name" }, Ki = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, qi = /*#__PURE__*/ D(/* @__PURE__ */ G({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let t = e, { t: n } = o(), r = xe(), a = i(), s = R(() => t.apiBase ?? a.value), c = R(() => r.currentRoom?.name ?? "SyncPlay"), l = R(() => r.onlineMembers.length), u = R(() => r.syncStatus), d = R(() => {
			switch (u.value) {
				case "synced": return n("syncplay.synced");
				case "outOfSync": return n("syncplay.outOfSync");
				case "re-syncing": return n("syncplay.reSyncing");
				default: return n("syncplay.synced");
			}
		}), f = R(() => {
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
		return (e, t) => Z(r).isInRoom ? (q(), V("div", Ri, [
			H("div", zi, [W(O, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), H("span", Bi, "SyncPlay: " + X(c.value), 1)]),
			H("div", { class: K(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [W(O, {
				name: f.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), H("span", Vi, X(d.value), 1)], 2),
			H("div", Hi, [H("span", Ui, [W(O, { name: "user" }), U(" " + X(Z(n)("syncplay.members", { count: l.value })), 1)]), H("ul", Wi, [(q(!0), V(L, null, Y(Z(r).onlineMembers.slice(0, 5), (e) => (q(), V("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= H("span", { class: "syncplay-overlay__member-dot" }, null, -1), H("span", Gi, X(e.name), 1)]))), 128)), Z(r).onlineMembers.length > 5 ? (q(), V("li", Ki, " +" + X(Z(r).onlineMembers.length - 5) + " more ", 1)) : B("", !0)])]),
			W(_e, {
				variant: "ghost",
				size: "sm",
				onClick: p
			}, {
				default: $(() => [U(X(Z(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : B("", !0);
	}
}), [["__scopeId", "data-v-2dfa4284"]]), Ji = {
	key: 0,
	class: "syncplay-controls"
}, Yi = ["aria-label"], Xi = { class: "syncplay-controls__wait-label" }, Zi = { class: "syncplay-controls__transport" }, Qi = ["aria-label"], $i = ["aria-label"], ea = ["aria-label"], ta = { class: "syncplay-controls__status-label" }, na = 10, ra = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
		let n = e, a = t, { t: s } = o(), c = xe(), l = E(), u = Ne("phlixConfig", null), d = i(), f = R(() => n.apiBase ?? d.value);
		Se((e) => {
			l.error(r(e, u?.locale, s("syncplay.commandRejected")));
		}), ze(() => Se(null));
		let p = J(!1), m = R(() => p.value || c.syncStatus === "re-syncing");
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
			await v(Math.max(0, n.position - na));
		}
		async function b() {
			await v(Math.min(n.duration, n.position + na));
		}
		return Q(() => c.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => Z(c).isInRoom ? (q(), V("div", Ji, [
			m.value ? (q(), V("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": Z(s)("syncplay.waitingForMembers")
			}, [W(O, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), H("span", Xi, X(Z(s)("syncplay.waitingForMembers")), 1)], 8, Yi)) : B("", !0),
			H("div", Zi, [
				H("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Z(s)("syncplay.rewind"),
					onClick: y
				}, [W(O, { name: "rewind" })], 8, Qi),
				H("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Z(s)("syncplay.pauseAll") : Z(s)("syncplay.playAll"),
					onClick: _
				}, [W(O, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, $i),
				H("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Z(s)("syncplay.fastForward"),
					onClick: b
				}, [W(O, { name: "forward" })], 8, ea)
			]),
			H("div", { class: K(["syncplay-controls__status", `syncplay-controls__status--${Z(c).syncStatus}`]) }, [W(O, {
				name: Z(c).syncStatus === "synced" ? "check" : Z(c).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), H("span", ta, X(Z(c).syncStatus === "synced" ? Z(s)("syncplay.synced") : Z(c).syncStatus === "outOfSync" ? Z(s)("syncplay.outOfSync") : Z(s)("syncplay.reSyncing")), 1)], 2)
		])) : B("", !0);
	}
}), [["__scopeId", "data-v-276195ff"]]);
// src/utils/subtitleSrc.ts
function ia(e, t) {
	return String(s(e, t));
}
function aa(e, t) {
	let n = !1, r = t.map((t) => {
		let r = ia(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
// src/components/Player.vue?vue&type=script&setup=true&lang.ts
var oa = { class: "player__stage" }, sa = ["src", "poster"], ca = [
	"src",
	"srclang",
	"label"
], la = {
	key: 0,
	class: "player__buffering"
}, ua = {
	class: "player__buffering-text",
	"aria-hidden": "true"
}, da = { class: "player__meta" }, fa = ["aria-label"], pa = { class: "player__meta-text" }, ma = { class: "player__eyebrow" }, ha = { class: "player__title" }, ga = { class: "player__sub numeric" }, _a = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, va = {
	key: 1,
	class: "player__center"
}, ya = ["aria-label"], ba = ["aria-label"], xa = ["aria-label"], Sa = { class: "player__btnrow" }, Ca = ["aria-label"], wa = ["aria-label"], Ta = ["aria-label"], Ea = { class: "player__time numeric" }, Da = ["aria-label", "aria-pressed"], Oa = ["title"], ka = ["aria-label"], Aa = ["aria-label"], ja = ["aria-label", "aria-pressed"], Ma = ["aria-label", "aria-pressed"], Na = ["aria-label"], Pa = { class: "similar-modal" }, Fa = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Ia = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, La = { class: "similar-modal__state-title" }, Ra = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, za = {
	key: 3,
	class: "similar-modal__results"
}, Ba = { class: "similar-modal__poster" }, Va = ["src", "alt"], Ha = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Ua = { class: "similar-modal__result-body" }, Wa = { class: "similar-modal__result-title" }, Ga = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Ka = { key: 0 }, qa = /*#__PURE__*/ D(/* @__PURE__ */ G({
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
		let { imgSrc: r } = c(), a = e, s = t, l = u(), d = T(), { t: g } = o(), _ = xe(), v = f(), y = R(() => v.isFavorite(a.media.id)), x = R(() => v.likeLevel(a.media.id));
		function C() {
			v.toggleFavorite(a.media.id, Oe());
		}
		function w(e) {
			v.setLike(a.media.id, e, Oe());
		}
		let D = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], k = J(null), A = J(null), j = J(null), M = J(!0), N = J(!1), te = J(!1), ie = J(!1), ae = J(!1), P = J(!1), oe = J(!1), se = J(!1), ce = J(!1), ue = J(null), de = J(null), fe = J(!1), pe = E(), me = J(!1);
		function he(e) {
			pe.success(g("syncplay.joinedRoom", { name: e.name }));
		}
		let _e = R(() => P.value ? 1.35 : 1), F = J(hr(a.streamUrl, a.media.path)), ye = R(() => Ar(a.media.streams)), be = 0;
		async function Se() {
			let e = ++be;
			if (F.value) return;
			let t = await Ir([a.streamUrl, a.media.path], a.playbackAudioTracks ?? [], ye.value);
			e === be && t && !F.value && (F.value = !0, Be(k.value?.currentTime ?? 0));
		}
		Q([() => a.playbackAudioTracks, ye], () => {
			Se();
		}, { immediate: !0 });
		let we = Ne("phlixConfig", null), Te = i(), Ee = Ne("resumeReporter", null), De = !1;
		function Oe() {
			return Te.value;
		}
		let I = ht({
			apiBase: () => a.apiBase ?? "",
			hlsConfig: we?.playerHlsConfig
		}), ke = S({ apiBase: () => a.apiBase ?? "" }), Ae = null;
		function je(e) {
			Ae !== null && clearTimeout(Ae), Ae = setTimeout(() => {
				Ae = null, ke.fetch(e);
			}, 0);
		}
		let Me = R(() => a.thumbnailAt ?? ke.thumbnailAt), G = R(() => F.value ? void 0 : a.streamUrl), Pe = R(() => F.value && I.state.value !== "ready"), Ie = R(() => F.value && (I.state.value === "preparing" || I.state.value === "idle")), ze = R(() => F.value && I.state.value === "error");
		function Be(e = 0) {
			let t = k.value, n = navigator.connection?.downlinkMax, r = st(n);
			t && I.start(t, a.media.id, r, e);
		}
		function Ve(e) {
			l.quality === "original" && e !== "auto" ? I.loadVariantPlaylist(Pt) : typeof e == "string" && e !== "auto" ? I.loadVariantPlaylist(e) : I.setLevel(e);
		}
		let He = !1;
		function We() {
			d.defaultQuality = Nt;
		}
		function Ge() {
			let e = I.levels.value;
			if (e.length === 0) return !1;
			let t = d.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = I.variants.value;
				if (!t || t.length === 0) return !1;
				if (Vt(e, t)) I.loadVariantPlaylist(Pt);
				else {
					let t = Bt(e);
					t >= 0 && I.setNextLevel(t), We();
				}
				return !0;
			}
			let n = Rt(e, t);
			return n >= 0 ? I.setNextLevel(n) : We(), !0;
		}
		Q(() => I.levels.value, (e) => {
			He || e.length === 0 || Ge() && (He = !0);
		}), Q(() => I.variants.value, (e) => {
			!He && e?.length && Fe(() => {
				He || Ge() && (He = !0);
			});
		}, { deep: !0 });
		let Ke = J(l.resumePositionFor(a.media.id) ?? 0), qe = J(!F.value && Ke.value > 0), Je = null, Ye = J(!1), Xe = J(8), Ze, Qe = J(null), $e = J(0), et = J(!1), tt = J([]), nt = J(!1), rt = J(null);
		function it(e, t) {
			Qe.value = e, $e.value = t, tt.value = [], rt.value = null, et.value = !0, ut(e, t);
		}
		let at = null, ot = null, ct = null;
		function lt() {
			let e = a.apiBase ?? "";
			return (ot === null || ct !== e) && (ot = new n({ baseUrl: e }), ct = e), ot;
		}
		async function ut(e, t) {
			at?.abort(), at = new AbortController(), nt.value = !0, rt.value = null;
			try {
				let n = await lt().searchByMarker(e, t, 30, 20, at.signal);
				tt.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				rt.value = "Couldn’t load similar titles. Please try again.", tt.value = [];
			} finally {
				nt.value = !1;
			}
		}
		function dt() {
			at?.abort(), et.value = !1, tt.value = [], rt.value = null, Qe.value = null;
		}
		let ft = R(() => l.upNext);
		function pt() {
			F.value = hr(a.streamUrl, a.media.path), Se(), Ke.value = l.resumePositionFor(a.media.id) ?? 0, qe.value = !F.value && Ke.value > 0, Je = null, yn = !1, sn = !1, rn.value = [], nn.value = !1, cn = !1, Jt.value = -1, mn = null, He = !1, De = !1, Ft(), wt = !1, Dt = 0, Et = 0, vt(), Ye.value = !1, I.reset(), k.value && (k.value.currentTime = 0), F.value && Be(), je(a.media.id);
		}
		function mt(e) {
			let t = k.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Je = Math.max(0, e));
		}
		function gt() {
			mt(Ke.value), qe.value = !1, k.value?.play()?.catch(() => {});
		}
		function _t() {
			Je = null, mt(0), l.clearResume(a.media.id), qe.value = !1, k.value?.play()?.catch(() => {});
		}
		function vt() {
			Ze &&= (clearInterval(Ze), void 0);
		}
		function yt() {
			Xe.value = 8, vt(), Ze = setInterval(() => {
				--Xe.value, Xe.value <= 0 && (vt(), xt());
			}, 1e3);
		}
		function bt() {
			De || (De = !0, Ee?.finish()), rr(), M.value = !0, l.upNext && (Ye.value = !0, d.autoplay && yt());
		}
		function xt() {
			vt(), Ye.value = !1;
			let e = l.next(a.streamUrlFor);
			e && s("play-next", e);
		}
		function St() {
			vt(), Ye.value = !1;
		}
		function Ct() {
			if (F.value) return;
			let e = k.value, t = _r(e) && (e?.currentTime ?? 0) === 0;
			(gr(e) || t) && (Ot(), Ft(), F.value = !0, Be(e?.currentTime ?? 0));
		}
		let wt = !1, Tt = null, Et = 0, Dt = 0;
		function Ot() {
			if (wt) return;
			wt = !0;
			let e = a.media?.id;
			e != null && e !== "" && lt().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, br({ videoCodec: ye.value })).catch(() => {});
		}
		function At() {
			if (Tt !== null || wt || F.value) return;
			let e = k.value;
			e && (Et = Date.now(), Dt = e.currentTime, Tt = setTimeout(() => {
				Tt = null;
				let e = k.value;
				e && !F.value && xr(Date.now(), Et, e.currentTime, Dt) && (Ot(), F.value = !0, Be(e.currentTime));
			}, vr));
		}
		function Ft() {
			Tt !== null && (clearTimeout(Tt), Tt = null);
		}
		let It = J([]), Lt = J([]), zt = J(-1), Ht = J(!1), Gt = R(() => I.state.value === "ready" && I.audioTracks.value.length > 0), Kt = R(() => I.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), qt = R(() => (a.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Jt = J(-1), Yt = R(() => !Gt.value && !F.value && Lt.value.length === 0 && qt.value.length > 1), Xt = R(() => Lt.value.length > 0 ? !1 : I.state.value === "ready" ? !Gt.value && I.hasAudio.value : !F.value && !Yt.value && qt.value.length === 1), Zt = R(() => Gt.value ? Kt.value : Yt.value ? qt.value : Lt.value.length > 0 ? Lt.value : Xt.value ? [{
			index: 0,
			language: "",
			label: g("player.audioOriginal"),
			kind: "audio"
		}] : Lt.value), Qt = R(() => {
			if (Gt.value) return I.currentAudioTrack.value;
			if (Yt.value) {
				if (Jt.value >= 0) return Jt.value;
				let e = (a.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : a.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Lt.value.length === 0 && Xt.value ? 0 : zt.value;
		}), $t = J(!1), en = l.subtitleLang, tn = R(() => {
			let e = a.apiBase ?? "", t = F.value ? I.subtitleTracks.value : aa(e, a.playbackSubtitleTracks ?? []);
			if (rn.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = aa(e, rn.value), i = new Set(t.map(n)), o = r.filter((e) => !i.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), nn = J(!1), rn = J([]), an = R(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(d.defaultSubtitleLang), t(d.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function on(e) {
			rn.value.some((t) => t.url === e.url) || (rn.value = [...rn.value, e]);
		}
		let sn = !1, cn = !1;
		function ln() {
			if (sn) return;
			if (d.subtitlePreferenceSet) {
				sn = !0;
				return;
			}
			let e = tn.value.find((e) => e.default);
			if (!e) return;
			let t = It.value.find((t) => t.language === (e.language || e.label));
			t && (l.setSubtitle(t.language), en = t.language, sn = !0);
		}
		function un() {
			if (cn) return;
			let e = d.defaultAudioLang;
			if (!e) return;
			let t = Zt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Qt.value;
			r >= 0 && r < t.length || (hn(n), cn = !0);
		}
		let dn = R(() => It.value.some((e) => e.language === l.subtitleLang));
		function fn() {
			let e = k.value;
			It.value = re(e), Lt.value = ne(e), zt.value = ee(e), ln(), un();
		}
		function pn() {
			if (dn.value) en = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = en && It.value.some((e) => e.language === en) ? en : It.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			s("captions");
		}
		let mn = null;
		function hn(e) {
			if (!Xt.value) {
				if (Gt.value) I.setAudioTrack(e);
				else if (Yt.value) {
					if (e === Qt.value) return;
					Jt.value = e, mn = e, F.value = !0, Be(k.value?.currentTime ?? 0);
				} else le(k.value, e), zt.value = e;
			}
		}
		Q(Gt, (e) => {
			if (!e || mn === null) return;
			let t = mn;
			mn = null, t >= 0 && t < I.audioTracks.value.length && I.setAudioTrack(t);
		}), Q(tn, () => {
			Fe(() => fn());
		}, { deep: !0 });
		let gn = null, _n, vn = R(() => {
			let e = [];
			a.media.year && e.push({ text: String(a.media.year) }), a.media.rating && e.push({
				text: a.media.rating,
				cert: !0
			}), a.media.runtime && e.push({ text: `${a.media.runtime}m` });
			let t = a.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), yn = !1;
		function bn() {
			if (!a.autoplay || yn || qe.value || Pe.value) return;
			let e = k.value;
			if (!e || !e.paused) return;
			yn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (l.muteForAutoplay(), e.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function xn() {
			bn();
		}
		function Sn() {
			a.prevEpisode && s("play-episode", a.prevEpisode);
		}
		function Cn() {
			a.nextEpisode && s("play-episode", a.nextEpisode);
		}
		function wn() {
			let e = k.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Tn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function En() {
			if (Kn !== null && (clearInterval(Kn), Kn = null), qn) {
				qn = !1;
				let e = k.value;
				e && Math.abs(e.volume - l.volume) > .001 && (e.volume = l.volume);
			}
			l.play(), l.setMediaPositionState(), At();
		}
		function Dn() {
			l.pause(), l.setMediaPositionState(), N.value = !1;
		}
		function On() {
			N.value = !0, rr(), M.value = !0;
		}
		function kn() {
			N.value = !1, ar();
		}
		function An() {
			let e = k.value;
			e && (Tt !== null && e.currentTime > Dt && Ft(), l.updateProgress(e.currentTime, e.duration, Tn(e)), _.isInRoom && _.updateLocalPosition(e.currentTime));
		}
		function jn() {
			let e = k.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, Je !== null && (e.currentTime = e.duration ? Math.min(e.duration, Je) : Je, Je = null), l.updateProgress(e.currentTime, e.duration, Tn(e)), l.setMediaPositionState(), fn());
		}
		function Mn() {
			let e = k.value;
			e && l.updateProgress(e.currentTime, e.duration, Tn(e));
		}
		function Nn() {
			let e = k.value;
			e && (!qn && Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function Fn() {
			let e = k.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate), l.setMediaPositionState();
		}
		function In() {
			l.setMediaPositionState();
		}
		function Ln() {
			l.setMediaPositionState();
		}
		function Rn(e) {
			let t = k.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function zn(e) {
			Rn(l.position + e);
		}
		function Bn() {
			ie.value = !0, ar();
		}
		function Vn() {
			ie.value = !1, ar();
		}
		function Hn(e) {
			let t = D.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(D[e] - l.rate) ? n : e, 0), n = D[Math.min(D.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function Un() {
			if (!a.markers) return;
			let e = l.position, t = a.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Rn(t.startMs / 1e3);
		}
		function Wn() {
			if (!a.markers) return;
			let e = l.position, t = a.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Rn(t.startMs / 1e3);
		}
		function Gn() {
			ue.value?.toggleOpen();
		}
		let Kn = null, qn = !1;
		function Jn() {
			let e = k.value;
			if (!e) {
				l.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), l.pause();
				return;
			}
			Kn !== null && (clearInterval(Kn), Kn = null), qn = !0;
			let t = .05;
			Kn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(Kn), Kn = null, e.volume = 0, e.pause(), l.pause());
			}, 50);
		}
		m({
			playPause: wn,
			seekBy: zn,
			frameStep: (e) => {
				l.playing || Rn(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: Yn,
			toggleFullscreen: Qn,
			toggleCaptions: pn,
			toggleTheater: Zn,
			togglePip: er,
			skipIntro: Un,
			skipOutro: Wn,
			sleepTimer: Gn,
			seekToPercent: (e) => Rn(e * l.duration),
			speedStep: Hn,
			toggleHelp: () => {
				ae.value = !ae.value;
			},
			toggleQuality: () => {
				F.value ? (fe.value = !fe.value, de.value?.toggleMenu?.()) : pe.show({
					message: g("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !ae.value && !Ht.value && !$t.value && !me.value && !nn.value && !et.value });
		function Yn() {
			l.toggleMute();
		}
		function Zn() {
			P.value = !P.value, s("theater", P.value);
		}
		Q(() => l.muted, (e) => {
			let t = k.value;
			t && t.muted !== e && (t.muted = e);
		}), Q(() => l.volume, (e) => {
			let t = k.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Q(() => l.rate, (e) => {
			let t = k.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Q(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? mt(e.value) : e.type === "seekBy" && mt(l.position + e.value));
		});
		function Qn() {
			if (typeof document > "u") return;
			if (!ce.value) {
				Zn();
				return;
			}
			let e = A.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function $n() {
			te.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function er() {
			let e = k.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function tr() {
			oe.value = !0;
		}
		function nr() {
			oe.value = !1;
		}
		function rr() {
			_n &&= (clearTimeout(_n), void 0);
		}
		function ir() {
			rr(), !l.playing || ie.value || N.value || (_n = setTimeout(() => {
				l.playing && !ie.value && !N.value && (M.value = !1);
			}, a.idleTimeout ?? 3e3));
		}
		function ar() {
			M.value = !0, ir();
		}
		let sr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", cr = "data-phlix-prev-tabindex", lr = "__phlix_no_tabindex__";
		function ur(e) {
			let t = A.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(sr) ? [n] : Array.from(n.querySelectorAll(sr));
				for (let n of t) if (e) {
					let e = n.getAttribute(cr);
					e === null || e === lr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(cr);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(cr, n.getAttribute("tabindex") ?? lr), n.setAttribute("tabindex", "-1"));
			}
		}
		Q(M, (e) => {
			typeof document < "u" && (ur(e), !e && document.activeElement instanceof HTMLElement && A.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), Q(() => l.playing, (e) => {
			e ? (qe.value = !1, St(), ir()) : (rr(), N.value = !1, M.value = !0);
		});
		let fr = null;
		Re(() => {
			l.setCurrent(a.media, {
				resetPosition: !1,
				streamUrl: a.streamUrl
			}), v.hydrate(a.media), typeof document < "u" && (document.addEventListener("fullscreenchange", $n), se.value = document.pictureInPictureEnabled === !0, ce.value = document.fullscreenEnabled === !0), fr = l.bindMediaSession({
				onPlay: () => void k.value?.play()?.catch(() => {}),
				onPause: () => k.value?.pause(),
				onSeek: (e) => Rn(e),
				onNext: () => xt(),
				onPrevious: () => Sn()
			}), gn = k.value?.textTracks ?? null, gn?.addEventListener?.("addtrack", fn), gn?.addEventListener?.("removetrack", fn), fn(), F.value && Be(), je(a.media.id);
		}), Q(() => a.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: a.streamUrl
			}), pt();
		}), Q(() => a.media?.id, () => {
			v.hydrate(a.media);
		}), Q(() => _.currentSession, (e) => {
			e && (e.state === "playing" ? (k.value?.play()?.catch(() => {}), l.play()) : e.state === "paused" && (k.value?.pause(), l.pause()), _.updateLocalPosition(l.position), Math.abs(_.driftAmount) > 2 && mt(e.playbackPosition));
		});
		let pr = null;
		return Q(() => _.pendingPlayMedia, async (e) => {
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
				if (_.pendingPlayMedia !== e) return;
			}
			if (t) {
				l.setCurrent(t, {
					resetPosition: !0,
					streamUrl: a.streamUrlFor?.(t) ?? ""
				}), k.value?.play()?.catch(() => {}), l.play(), _.consumePendingPlayMedia(), pr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			pr !== n && (pr = n, s("pending-media", e.mediaId, e.title));
		}), Le(() => {
			Ee?.reportFinal?.(), rr(), vt(), I.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", $n), fr?.(), gn?.removeEventListener?.("addtrack", fn), gn?.removeEventListener?.("removetrack", fn), Kn !== null && (clearInterval(Kn), Kn = null), Ae !== null && (clearTimeout(Ae), Ae = null), Ft();
		}), (t, n) => (q(), V("div", {
			ref_key: "containerRef",
			ref: A,
			class: K(["player", {
				"is-chrome-hidden": !M.value,
				"is-theater": P.value
			}]),
			"data-player-surface": "",
			onPointermove: ar,
			onPointerdown: ar,
			onFocusin: ar
		}, [W(or, {
			video: k.value,
			enabled: Z(d).atmosphere,
			playing: Z(l).playing,
			"reduced-motion": Z(d).effectiveReducedMotion,
			intensity: _e.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), H("div", oa, [
			H("video", {
				ref_key: "videoRef",
				ref: k,
				class: "player__video",
				src: G.value,
				poster: Z(r)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: En,
				onPause: Dn,
				onTimeupdate: An,
				onLoadedmetadata: jn,
				onCanplay: xn,
				onWaiting: On,
				onStalled: On,
				onPlaying: kn,
				onProgress: Mn,
				onVolumechange: Nn,
				onRatechange: Fn,
				onSeeked: In,
				onDurationchange: Ln,
				onEnded: bt,
				onError: Ct,
				onEnterpictureinpicture: tr,
				onLeavepictureinpicture: nr,
				onClick: wn
			}, [(q(!0), V(L, null, Y(tn.value, (e) => (q(), V("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, ca))), 128))], 40, sa),
			n[22] ||= H("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[23] ||= H("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			N.value ? (q(), V("div", la, [W(ve, {
				size: 38,
				label: Z(g)("player.buffering")
			}, null, 8, ["label"]), H("span", ua, X(Z(g)("player.buffering")), 1)])) : B("", !0),
			H("div", da, [H("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Z(g)("player.back"),
				onClick: n[0] ||= Ue((e) => s("back"), ["stop"])
			}, [W(O, { name: "arrow-left" })], 8, fa), H("div", pa, [
				H("p", ma, X(Z(g)("player.nowPlaying")), 1),
				H("h2", ha, X(e.media.name), 1),
				H("div", ga, [(q(!0), V(L, null, Y(vn.value, (e, t) => (q(), V(L, { key: t }, [t > 0 && !e.cert ? (q(), V("span", _a, "·")) : B("", !0), H("span", { class: K({ player__cert: e.cert }) }, X(e.text), 3)], 64))), 128))])
			])]),
			Pe.value ? B("", !0) : (q(), V("div", va, [
				M.value ? (q(), V("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": Z(g)("player.seekBackward"),
					onClick: n[1] ||= Ue((e) => zn(-10), ["stop"])
				}, [W(O, { name: "rewind" }), H("span", { class: "player__center-skip-count" }, X(10))], 8, ya)) : B("", !0),
				H("button", {
					type: "button",
					class: K(["player__bigplay", { "is-playing": Z(l).playing }]),
					"aria-label": Z(l).playing ? Z(g)("player.pause") : Z(g)("player.play"),
					onClick: Ue(wn, ["stop"])
				}, [W(O, { name: Z(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, ba),
				M.value ? (q(), V("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": Z(g)("player.seekForward"),
					onClick: n[2] ||= Ue((e) => zn(10), ["stop"])
				}, [W(O, { name: "forward" }), H("span", { class: "player__center-skip-count" }, X(10))], 8, xa)) : B("", !0)
			])),
			W(Wt, {
				video: k.value,
				language: Z(l).subtitleLang,
				"style-config": Z(d).captionStyle,
				lifted: M.value,
				"controls-root": j.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Pe.value ? B("", !0) : (q(), V("div", {
				key: 2,
				ref_key: "controlsRef",
				ref: j,
				class: "player__controls",
				onClick: n[9] ||= Ue(() => {}, ["stop"])
			}, [
				W(b, {
					position: Z(l).position,
					duration: Z(l).duration,
					buffered: Z(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": Me.value,
					onSeek: Rn,
					onScrubStart: Bn,
					onScrubEnd: Vn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				Z(d).showMarkerTimeline && e.markers && e.markers.length > 0 ? (q(), z(Mi, {
					key: 0,
					position: Z(l).position,
					duration: Z(l).duration,
					markers: e.markers,
					onSeek: Rn,
					onSimilar: it
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : B("", !0),
				H("div", Sa, [
					e.prevEpisode ? (q(), V("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Z(g)("player.previousEpisode"),
						onClick: Sn
					}, [W(O, { name: "skip-back" })], 8, Ca)) : B("", !0),
					H("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Z(l).playing ? Z(g)("player.pause") : Z(g)("player.play"),
						onClick: wn
					}, [W(O, { name: Z(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, wa),
					e.nextEpisode ? (q(), V("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Z(g)("player.nextEpisode"),
						onClick: Cn
					}, [W(O, { name: "skip-forward" })], 8, Ta)) : B("", !0),
					H("span", Ea, [
						U(X(Z(h)(Z(l).position)), 1),
						n[18] ||= H("span", { class: "player__sep" }, " / ", -1),
						U(X(Z(h)(Z(l).duration)), 1)
					]),
					n[19] ||= H("span", { class: "player__grow" }, null, -1),
					H("button", {
						type: "button",
						class: K(["player__iconbtn player__favorite", { "is-on": y.value }]),
						"aria-label": y.value ? Z(g)("itemActions.removeFavorite") : Z(g)("itemActions.addFavorite"),
						"aria-pressed": y.value ? "true" : "false",
						onClick: C
					}, [W(O, { name: y.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Da),
					W(p, {
						level: x.value,
						onCycle: w
					}, null, 8, ["level"]),
					W(jt),
					W(Mt),
					W(Ut, {
						ref_key: "qualityMenuRef",
						ref: de,
						open: fe.value,
						"onUpdate:open": n[3] ||= (e) => fe.value = e,
						levels: Z(I).levels.value,
						variants: Z(I).variants.value,
						"current-level": Z(I).currentLevel.value,
						"auto-enabled": Z(I).autoEnabled.value,
						"active-height": Z(I).activeLevelHeight.value,
						onSelect: Ve
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					F.value ? B("", !0) : (q(), V("span", {
						key: 2,
						class: "player__direct-badge",
						title: Z(g)("player.qualityDirectStream")
					}, X(Z(g)("player.directStream")), 9, Oa)),
					W(Pn, {
						open: Ht.value,
						"onUpdate:open": n[4] ||= (e) => Ht.value = e,
						tracks: It.value,
						"audio-tracks": Zt.value,
						"active-audio": Qt.value,
						onSelectAudio: hn,
						onAddSubtitles: n[5] ||= (e) => nn.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					W(wi, {
						open: $t.value,
						"onUpdate:open": n[6] ||= (e) => $t.value = e,
						chapters: e.chapters ?? [],
						onSeek: Rn
					}, null, 8, ["open", "chapters"]),
					W(Li, {
						ref_key: "sleepTimerRef",
						ref: ue,
						"on-expire": Jn
					}, null, 512),
					H("button", {
						type: "button",
						class: K(["player__iconbtn player__syncplay", { "is-on": Z(_).isInRoom }]),
						"aria-label": Z(_).isInRoom ? Z(g)("syncplay.inRoom") : Z(g)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: n[7] ||= (e) => me.value = !0
					}, [W(O, { name: "user" })], 10, ka),
					H("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Z(g)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: n[8] ||= (e) => ae.value = !0
					}, [W(O, { name: "info" })], 8, Aa),
					se.value ? (q(), V("button", {
						key: 3,
						type: "button",
						class: K(["player__iconbtn", { "is-on": oe.value }]),
						"aria-label": oe.value ? Z(g)("player.exitPip") : Z(g)("player.pip"),
						"aria-pressed": oe.value,
						onClick: er
					}, [W(O, { name: "pip" })], 10, ja)) : B("", !0),
					H("button", {
						type: "button",
						class: K(["player__iconbtn", { "is-on": P.value }]),
						"aria-label": P.value ? Z(g)("player.exitTheater") : Z(g)("player.theater"),
						"aria-pressed": P.value,
						onClick: Zn
					}, [W(O, { name: "theater" })], 10, Ma),
					ce.value ? (q(), V("button", {
						key: 4,
						type: "button",
						class: "player__iconbtn",
						"aria-label": te.value ? Z(g)("player.exitFullscreen") : Z(g)("player.fullscreen"),
						onClick: Qn
					}, [W(O, { name: te.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Na)) : B("", !0)
				])
			], 512)),
			Pe.value ? B("", !0) : (q(), z(ai, {
				key: 3,
				position: Z(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: Rn
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Pe.value ? B("", !0) : (q(), z(di, {
				key: 4,
				position: Z(l).position,
				markers: e.markers,
				onSkip: Rn
			}, null, 8, ["position", "markers"])),
			qe.value && !Pe.value ? (q(), z(dr, {
				key: 5,
				seconds: Ke.value,
				onResume: gt,
				onRestart: _t
			}, null, 8, ["seconds"])) : B("", !0),
			Ye.value && ft.value && !Pe.value ? (q(), z(qr, {
				key: 6,
				media: ft.value,
				remaining: Xe.value,
				total: Z(8),
				counting: Z(d).autoplay,
				onPlayNow: xt,
				onCancel: St
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : B("", !0),
			W(ge, {
				modelValue: et.value,
				"onUpdate:modelValue": n[10] ||= (e) => et.value = e,
				title: `Similar ${Qe.value ?? "marker"}s`,
				size: "lg",
				onClose: dt
			}, {
				default: $(() => [H("div", Pa, [nt.value ? (q(), V("div", Fa, [W(ve, { label: "Finding similar media" })])) : rt.value ? (q(), V("div", Ia, [W(O, {
					name: "error",
					class: "similar-modal__state-icon"
				}), H("p", La, X(rt.value), 1)])) : !nt.value && tt.value.length === 0 ? (q(), V("div", Ra, [
					W(O, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					n[20] ||= H("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					n[21] ||= H("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (q(), V("ul", za, [(q(!0), V(L, null, Y(tt.value, (e) => (q(), V("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [H("div", Ba, [e.poster_url ? (q(), V("img", {
					key: 0,
					src: Z(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Va)) : (q(), V("div", Ha, [W(O, { name: "film" })]))]), H("div", Ua, [H("p", Wa, X(e.name), 1), e.year ? (q(), V("p", Ga, [U(X(e.year) + " ", 1), e.runtime ? (q(), V("span", Ka, " · " + X(e.runtime) + "m", 1)) : B("", !0)])) : B("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Ie.value ? (q(), z(ii, {
				key: 7,
				title: e.media.name,
				progress: Z(I).progress.value,
				onBack: n[11] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : B("", !0),
			ze.value ? (q(), z(Qr, {
				key: 8,
				title: e.media.name,
				onBack: n[12] ||= (e) => s("back")
			}, null, 8, ["title"])) : B("", !0),
			Z(_).isInRoom ? (q(), z(ra, {
				key: 9,
				position: Z(l).position,
				duration: Z(l).duration,
				"is-playing": Z(l).playing,
				onSeek: Rn,
				onPlay: n[13] ||= (e) => void k.value?.play()?.catch(() => {}),
				onPause: n[14] ||= (e) => void k.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : B("", !0),
			Z(_).isInRoom ? (q(), z(qi, { key: 10 })) : B("", !0),
			W(Ce, {
				modelValue: me.value,
				"onUpdate:modelValue": n[15] ||= (e) => me.value = e,
				onJoined: he
			}, null, 8, ["modelValue"]),
			W(kt, {
				open: ae.value,
				onClose: n[16] ||= (e) => ae.value = !1
			}, null, 8, ["open"]),
			W(Xn, {
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
}), [["__scopeId", "data-v-767f23d0"]]), Ja = "blur(3px) saturate(1.35)";
async function Ya(e, t = document, n = 16 / 9) {
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
		"filter" in c && (c.filter = Ja), c.drawImage(r, (64 - u) / 2 - 4, (o - d) / 2 - 4, u + 8, d + 8), "filter" in c && (c.filter = "none"), c.globalCompositeOperation = "destination-in", c.save(), c.translate(32, o / 2), c.scale(32 * Math.SQRT2, o / 2 * Math.SQRT2);
		let f = c.createRadialGradient(0, 0, 0, 0, 0, 1);
		return f.addColorStop(0, "rgba(0, 0, 0, 1)"), f.addColorStop(.75, "rgba(0, 0, 0, 0)"), c.fillStyle = f, c.fillRect(-1, -1, 2, 2), c.restore(), c.globalCompositeOperation = "source-over", s.toDataURL("image/png");
	} catch {
		return null;
	}
}
// src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var Xa = { class: "player-page__stage" }, Za = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Qa = { class: "player-page__blocking-error" }, $a = /*#__PURE__*/ D(/* @__PURE__ */ G({
	__name: "PlayerPage",
	setup(t) {
		let r = /* @__PURE__ */ new Map(), s = i(), { imgSrc: d } = c(), p = a(), m = Ge(), h = Ke(), { t: _ } = o(), y = Ne("phlixConfig", null), b = u(), x = f(), S = g(), C = J(null), T = J(""), E = J([]), D = J(null), O = J(null), k = J([]), A = J([]), j = J(!0), M = J(null), N = J(!1), ee = J(null), te = J(!1), ne = J(null), re = J(null), ie = R(() => String(m.params.id ?? ""));
		I(() => C.value?.name);
		let ae = R(() => d(C.value?.poster_url) || ""), P = J(null);
		Q(ae, (e) => {
			if (P.value = null, !e) return;
			let t = typeof window < "u" && window.innerHeight > 0 ? window.innerWidth / window.innerHeight : 16 / 9;
			Ya(e, document, t).then((t) => {
				ae.value === e && (P.value = t);
			});
		}, { immediate: !0 });
		let oe = R(() => {
			let e = P.value ?? ae.value;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), se = null, ce = !1, le = 0;
		function ue(e) {
			return ce || e.generation !== le;
		}
		function de(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function fe(e) {
			let t = p.value || s.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function pe(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function me(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function he(e, t, n) {
			let r = () => ue(n), i = t.genres?.[0];
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
				if (r() || de(e)) return;
				b.setQueue([]);
			}
		}
		async function F(e, t, n) {
			let r = l(s.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function ve(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function ye(e, t) {
			ne.value = Ee(e, t), re.value = De(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && b.setQueue(r);
		}
		function xe(e) {
			for (let t of r.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function Se(e, t, n) {
			if (ne.value = null, re.value = null, !me(t)) return;
			let i = xe(t.id);
			if (i) {
				ye(i, t.id);
				return;
			}
			let a = () => ue(n);
			try {
				let i = await ve(e, t, n.controller?.signal);
				if (a()) return;
				let o = await F(e, i.id, n.controller?.signal);
				if (a()) return;
				if (Te(o)) {
					let t = o.filter((e) => e.type === "season"), r = await Promise.all(t.map((t) => F(e, t.id, n.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...r.flat()];
				}
				let s = we(o);
				s.length && r.set(i.id, s), ye(s, t.id);
			} catch (e) {
				if (a() || de(e)) return;
				ne.value = null, re.value = null;
			}
		}
		async function Ce() {
			let t = ie.value;
			se?.abort(), se = typeof AbortController < "u" ? new AbortController() : null, le += 1;
			let r = {
				generation: le,
				controller: se
			};
			if (j.value = !0, M.value = null, E.value = [], D.value = null, O.value = null, k.value = [], A.value = [], ne.value = null, re.value = null, b.hideMiniPlayer(), !t) {
				M.value = _("common.missingMediaId"), j.value = !1;
				return;
			}
			let i = new n({ baseUrl: s.value });
			i.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, r.controller?.signal).then((e) => {
				ue(r) || (E.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), D.value = pe(e?.intro_marker), O.value = pe(e?.outro_marker), k.value = Sr(e?.audio_tracks), A.value = $e(e?.subtitle_tracks));
			}).catch(() => null);
			let a = ke(t), o = Date.now();
			if (a && Ae(a, o)) {
				L(i, a.item, r);
				return;
			}
			let c;
			try {
				c = (await i.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, r.controller?.signal)).item;
			} catch (t) {
				if (ue(r) || de(t)) return;
				if (t instanceof e && (t.status === 403 || t.status === 429)) {
					let e = w(t.body, y?.locale);
					if (e !== null) {
						ee.value = e, te.value = !0, j.value = !1;
						return;
					}
				}
				if (a) {
					L(i, a.item, r);
					return;
				}
				M.value = v(t, y?.locale), j.value = !1;
				return;
			}
			if (!ue(r)) {
				if (c) je(t, c, o), L(i, c, r);
				else {
					if (a) {
						L(i, a.item, r);
						return;
					}
					M.value = "Couldn’t load media item", j.value = !1;
				}
			}
		}
		async function L(e, t, n) {
			C.value = t, x.hydrate(t), T.value = fe(t), j.value = !1, me(t) && (await Se(e, t, n), ue(n) || re.value) || he(e, t, n);
		}
		Re(Ce), Q(ie, Ce), We(() => {
			b.current && b.streamUrl && b.showMiniPlayer();
		}), Le(() => {
			ce = !0, se?.abort(), se = null, S.reset();
		});
		function Me() {
			h?.back();
		}
		function G(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Pe(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Fe(e) {
			N.value = e, S.setTheaterActive(e);
		}
		function ze() {
			te.value = !1, Me();
		}
		return (e, t) => (q(), V("div", { class: K(["player-page", { "is-theater": N.value }]) }, [
			oe.value && !j.value && !M.value ? (q(), V("div", {
				key: 0,
				class: K(["player-page__ambient", { "is-preblurred": P.value }]),
				style: Ie(oe.value),
				"aria-hidden": "true"
			}, null, 6)) : B("", !0),
			H("div", Xa, [j.value ? (q(), V("div", Za, [W(Oe, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : M.value ? (q(), z(be, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: M.value
			}, {
				actions: $(() => [W(_e, {
					variant: "solid",
					onClick: Ce
				}, {
					default: $(() => [...t[1] ||= [U("Retry", -1)]]),
					_: 1
				}), W(_e, {
					variant: "ghost",
					onClick: Me
				}, {
					default: $(() => [...t[2] ||= [U("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : C.value ? (q(), z(qa, {
				key: 2,
				media: C.value,
				"stream-url": T.value,
				"stream-url-for": fe,
				"api-base": Z(s),
				chapters: E.value,
				"intro-marker": D.value,
				"outro-marker": O.value,
				"playback-audio-tracks": k.value,
				"playback-subtitle-tracks": A.value,
				"prev-episode": ne.value,
				"next-episode": re.value,
				autoplay: !0,
				onBack: Me,
				onPlayNext: G,
				onPlayEpisode: Pe,
				onTheater: Fe
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
			])) : B("", !0)]),
			W(ge, {
				modelValue: te.value,
				"onUpdate:modelValue": t[0] ||= (e) => te.value = e,
				title: "Can’t start playback",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: $(() => [W(_e, {
					variant: "solid",
					onClick: ze
				}, {
					default: $(() => [...t[3] ||= [U("OK", -1)]]),
					_: 1
				})]),
				default: $(() => [H("p", Qa, X(ee.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-3ae2a661"]]);
export { $a as default };

//# sourceMappingURL=PlayerPage-CJD1yzXm.js.map