import { S as e, o as t, t as n, y as r } from "./client-Bmlfq3Uy.js";
import { n as i, r as a } from "./useApiBase-DXTBY90j.js";
import { t as o } from "./useMessages-C-PrFAcm.js";
import { r as s, t as c } from "./useImageSrc-CSM61b-l.js";
import { n as l } from "./media-query-D7hrCu8r.js";
import { a as u, t as d } from "./usePlayerStore-CAcZwoN3.js";
import { n as f, t as p } from "./ThumbRating-GUjlQsOc.js";
import { a as m, c as h, d as g, f as _, l as v, n as y, o as b, r as x, s as S, t as C, u as w } from "./shortcuts-D4QPtfyN.js";
import { a as T } from "./usePreferencesStore-BXm_CP7M.js";
import { t as ee } from "./useToastStore-CxO_ppM8.js";
import { n as E, t as D } from "./Icon-55iG1rR7.js";
import { t as O } from "./IconButton-DsjtwjU1.js";
import { n as k } from "./useFocusTrap-DStfPnC8.js";
import { t as A } from "./Slider-Bj5BaBUu.js";
import { t as j } from "./Select-BFV1_Hsk.js";
import { _ as M, a as te, c as ne, d as re, f as ie, g as ae, h as oe, i as N, l as se, m as ce, n as le, o as ue, p as de, r as fe, s as pe, t as me, u as he, v as ge } from "./captions--D8s1c0W.js";
import { t as _e } from "./Modal-BPKuAvTH.js";
import { t as ve } from "./Button-DTiNkl61.js";
import { t as P } from "./Chip-CkvYnXR3.js";
import { t as ye } from "./Spinner-VY7YJUKF.js";
import { t as be } from "./Badge-D7vacFbh.js";
import { t as xe } from "./EmptyState-DjfWh3kt.js";
import { n as Se, r as Ce, t as we } from "./SyncPlayModal-H9mBPod2.js";
import { n as Te, o as Ee, r as De, t as Oe } from "./episode-order-DBEVgrOE.js";
import { t as ke } from "./Skeleton-DDhrDRE7.js";
import { i as F } from "./usePageTitle-j6j9gAmo.js";
import { n as Ae, r as je, t as Me } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as I, Transition as Ne, computed as L, createBlock as R, createCommentVNode as z, createElementBlock as B, createElementVNode as V, createTextVNode as H, createVNode as U, defineComponent as W, inject as Pe, mergeModels as Fe, nextTick as Ie, normalizeClass as G, normalizeStyle as Le, onBeforeUnmount as Re, onMounted as ze, onScopeDispose as Be, openBlock as K, ref as q, renderList as J, toDisplayString as Y, toRef as Ve, unref as X, useModel as He, watch as Z, withCtx as Q, withModifiers as Ue } from "vue";
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
function $(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Xe(e) {
	return e === !0 || e === "true" || e === 1;
}
function Ze(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Qe(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = $(e.url ?? e.src);
		r !== "" && t.push({
			index: Ze(e.index),
			language: $(e.language ?? e.lang ?? e.srclang),
			label: $(e.label),
			default: Xe(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function $e(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Ze(e.height);
		if (r <= 0) continue;
		let i = e.playlist_url ?? e.playlistUrl;
		t.push({
			id: $(e.id),
			label: $(e.label),
			height: r,
			width: Ze(e.width),
			bitrate: Ze(e.bitrate),
			...typeof e.url == "string" && e.url !== "" ? { url: e.url } : {},
			...typeof i == "string" && i !== "" ? { playlistUrl: i } : {}
		});
	}
	return t.length > 0 ? t : null;
}
function et(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var tt = .7, nt = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], rt = 1e7, it = "mobile-low";
function at(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * tt;
}
function ot(e) {
	let t = at(e);
	if (t === void 0 || t >= rt) return;
	let n = it;
	for (let [e, r] of nt) r <= t && (n = e);
	return n;
}
function st(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function ct(e) {
	let t = e ?? {};
	return {
		jobId: $(t.job_id ?? t.jobId),
		masterUrl: $(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Je(t.status, "running"),
		reused: Xe(t.reused),
		subtitles: Qe(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: $e(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function lt(e) {
	let t = e ?? {};
	return {
		jobId: $(t.job_id ?? t.jobId),
		status: Je(t.status, "running"),
		playlistReady: Xe(t.playlist_ready ?? t.playlistReady),
		progress: Ze(t.progress),
		masterUrl: $(t.master_url ?? t.masterUrl),
		subtitles: Qe(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: $e(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function ut(e) {
	return e.playlistReady || e.status === "completed";
}
function dt(e) {
	return Ye.has(e);
}
function ft(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
// src/composables/useHlsTranscode.ts
var pt = "_master.m3u8";
function mt(e) {
	let t = q("idle"), r = q(0), i = q([]), a = q([]), o = q(-1), s = q(!0), c = q(null), l = q(null), d = q([]), f = q(-1), p = q(!1), m = q(null), h = q(null);
	function g(e) {
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
	function S(t) {
		if (!t || t.length === 0) return;
		let n = e.apiBase(), r = t.map((e) => ({
			...e,
			...e.url ? { url: ft(n, e.url) } : {},
			...e.playlistUrl ? { playlistUrl: ft(n, e.playlistUrl) } : {}
		}));
		re = r, l.value = r;
	}
	function C(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		i.value = t.map((e) => ({
			...e,
			url: ft(n, e.url)
		}));
	}
	let w = e.attach ?? _, T = e.pollIntervalMs ?? 1e3, ee = e.maxWaitMs ?? 12e4, E = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), D = Math.max(1, Math.ceil(ee / Math.max(1, T))), O = e.getToken ?? ht, k = e.probeRungPlaylist ?? ((e) => yt(e, O)), A = null, j = null, M = null, te = null, ne = !1, re = [], ie = 0, ae = null, oe = 0;
	function N() {
		return e.client ?? new n({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function se(n, a, o, s) {
		fe(), ne = !1;
		let c = ++oe, l = () => ne || c !== oe;
		ae = new AbortController(), t.value = "preparing", r.value = 0, i.value = [], v();
		try {
			let i = N(), c = ct(await i.post(et(a, o), void 0, ae.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			C(c.subtitles), S(c.variants), m.value = c.jobId, h.value = ft(e.apiBase(), c.masterUrl);
			let d = c.status === "completed";
			for (let e = 0; !d && e < D; e++) {
				let e = lt(await i.get(st(c.jobId), void 0, ae.signal));
				if (l()) return;
				if (r.value = e.progress, C(e.subtitles), S(e.variants), dt(e.status)) throw Error(`transcode ${e.status}`);
				if (ut(e)) {
					d = !0;
					break;
				}
				if (await E(T), l()) return;
			}
			if (!d) throw Error("transcode timed out");
			let f = await w(n, h.value, {
				getToken: O,
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
			A = f, j = A.onLevelSwitched((e) => g(e)), M = A.onAudioTrackSwitched((e) => y(e)), te = A.onLevelLoaded(() => {
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
	function ce(e) {
		A && (A.setCurrentLevel(e === "auto" ? -1 : e), g());
	}
	function le(e) {
		A && (A.setNextLevel(e === "auto" ? -1 : e), g());
	}
	function ue(e) {
		A && (A.setAudioTrack(e), y());
	}
	function de(e) {
		if (!A || !h.value) return;
		let t = re.find((t) => t.id === e), n = t?.playlistUrl ?? _t(h.value, e), r = t?.url ?? vt(h.value, e), i = ++ie;
		(async () => {
			let e;
			try {
				e = await k(n);
			} catch {
				e = "unknown";
			}
			!ne && i === ie && A && (e === "absent" ? (console.warn(`[phlix-ui] rung mini-master unavailable (${n}) — this server has no per-rung index files; falling back to the legacy bare rung playlist (${r}). Multi-audio titles play silent on the video-only bare rung and the audio menu stays hidden (never a stale rendition list); muxed-audio titles play correctly. The menu returns once the server ships the index.`), A.loadSource(r)) : A.loadSource(n), v());
		})();
	}
	function fe() {
		if (ne = !0, ie++, ae &&= (ae.abort(), null), j) {
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
		re = [], m.value = null, h.value = null;
	}
	function pe() {
		fe(), t.value = "idle", r.value = 0, i.value = [], v(), x();
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
		setLevel: ce,
		setNextLevel: le,
		setAudioTrack: ue,
		jobId: m,
		masterUrl: h,
		loadVariantPlaylist: de,
		start: se,
		cleanup: fe,
		reset: pe
	};
}
function ht() {
	try {
		return t().getAccessToken();
	} catch {
		return null;
	}
}
function gt(e) {
	let t = e.indexOf("?");
	return t === -1 ? [e, ""] : [e.slice(0, t), e.slice(t)];
}
function _t(e, t) {
	let [n, r] = gt(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}${pt}${r}`;
}
function vt(e, t) {
	let [n, r] = gt(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}.m3u8${r}`;
}
async function yt(e, t) {
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
var bt = ["aria-label"], xt = { class: "shortcuts__head" }, St = { class: "shortcuts__title" }, Ct = { class: "shortcuts__grid" }, wt = { class: "shortcuts__keys" }, Tt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Et = {
	key: 1,
	class: "shortcuts__key"
}, Dt = { class: "shortcuts__label" }, Ot = /*#__PURE__*/ E(/* @__PURE__ */ W({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => x }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = o(), a = q(null);
		return k(a, Ve(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (K(), B("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Ue((e) => r("close"), ["self"])
		}, [V("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [V("div", xt, [V("h3", St, Y(X(i)("player.keyboard")), 1), U(O, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), V("ul", Ct, [(K(!0), B(I, null, J(e.shortcuts, (e) => (K(), B("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [V("span", wt, [(K(!0), B(I, null, J(e.keys, (e, t) => (K(), B(I, { key: t }, [e === "–" ? (K(), B("span", Tt, "–")) : (K(), B("kbd", Et, [X(C)[e] ? (K(), R(D, {
			key: 0,
			name: X(C)[e],
			label: X(y)[e] ?? e
		}, null, 8, ["name", "label"])) : (K(), B(I, { key: 1 }, [H(Y(e), 1)], 64))]))], 64))), 128))]), V("span", Dt, Y(e.label), 1)]))), 128))])], 8, bt)])) : z("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), kt = { class: "volume" }, At = /*#__PURE__*/ E(/* @__PURE__ */ W({
	__name: "VolumeControl",
	setup(e) {
		let t = u(), n = T(), { t: r } = o(), i = L(() => t.muted ? 0 : t.volume), a = L(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function s(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (K(), B("div", kt, [U(O, {
			name: a.value,
			label: X(t).muted ? X(r)("player.unmute") : X(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => X(t).toggleMute()
		}, null, 8, ["name", "label"]), U(A, {
			class: "volume__slider",
			"model-value": i.value,
			min: 0,
			max: 1,
			step: .05,
			label: X(r)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": s
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), jt = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		return (e, t) => (K(), R(j, {
			class: "speed-menu",
			tone: "glass",
			"model-value": X(n).rate,
			options: i.value,
			label: X(r)("player.playbackSpeed"),
			"onUpdate:modelValue": a
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), Mt = "auto", Nt = "original";
function Pt(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function Ft(e) {
	return e >= 2160 ? "4K" : Pt(e);
}
function It(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Pt(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: Ft(r.height)
		}));
	}
	return n;
}
function Lt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Pt(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Rt(e, t) {
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
function zt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Bt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && Rt(e, n) >= 0;
}
function Vt(e, t) {
	if (t < 0) return Mt;
	let n = e.find((e) => e.index === t);
	return n ? Pt(n.height) : Mt;
}
// src/components/player/QualityMenu.vue
var Ht = /*#__PURE__*/ E(/* @__PURE__ */ W({
	__name: "QualityMenu",
	props: /*@__PURE__*/ Fe({
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
	emits: /*@__PURE__*/ Fe(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, i = He(e, "open"), a = q(null);
		function s() {
			a.value?.toggleMenu();
		}
		let c = n, l = u(), d = T(), { t: f } = o(), p = L(() => It(r.levels)), m = L(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = p.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = Pt(i.height);
				e.has(a) || n && Lt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: Ft(i.height)
				}));
			}
			return t;
		}), h = L(() => p.value.length >= 2 ? p.value : m.value), g = L(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), _ = L(() => Rt(r.levels, g.value)), v = L(() => g.value && _.value >= 0 ? {
			value: Nt,
			label: f("player.qualityOriginal", { height: g.value.height })
		} : null), y = L(() => h.value.length >= 2), b = L(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: Ft(r.activeHeight) })), x = L(() => [
			{
				value: Mt,
				label: b.value
			},
			...v.value ? [v.value] : [],
			...h.value
		]), S = L(() => r.autoEnabled ? Mt : v.value && r.currentLevel === _.value && (l.quality === "original" || d.defaultQuality === "original") ? Nt : Vt(r.levels, r.currentLevel));
		function C(e) {
			let t = String(e);
			if (t === "auto") {
				l.setQuality(t), d.defaultQuality = t, c("select", "auto");
				return;
			}
			let n = t === "original" ? _.value : Lt(r.levels, t);
			l.setQuality(t), d.defaultQuality = t, n >= 0 ? c("select", n) : c("select", t);
		}
		return t({ toggleMenu: s }), (e, t) => y.value || i.value ? (K(), R(j, {
			key: 0,
			ref_key: "selectRef",
			ref: a,
			class: "quality-menu",
			tone: "glass",
			"model-value": S.value,
			options: x.value,
			label: X(f)("player.quality"),
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
}), [["__scopeId", "data-v-58498bdd"]]), Ut = /*#__PURE__*/ E(/* @__PURE__ */ W({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = u(), i = L(() => r.subtitleOffset + r.audioOffset), a = q([]), o = q(0), s = L(() => n.lifted ? o.value : 0), c = L(() => ({
			...se(n.styleConfig),
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
		Z(() => n.controlsRoot, p, { immediate: !0 }), Re(f);
		let m = null, h = null, g = null;
		function _() {
			if (!m) return [];
			if (i.value === 0) return ce(m);
			let e = m.cues;
			if (!e || typeof e.length != "number") return ce(m);
			let t = n.video && typeof n.video.currentTime == "number" ? n.video.currentTime : 0;
			return oe(m, ne(t, i.value));
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
				pe(n.video, n.language);
				let e = _();
				e.length && (a.value = e);
			}, 0);
		}
		function T() {
			C(), b(), m?.removeEventListener("cuechange", S), h?.removeEventListener("load", S), m = null, h = null;
		}
		function ee(e, t) {
			let n = e?.querySelectorAll?.("track");
			if (!n) return null;
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r.track === t) return r;
			}
			return null;
		}
		function E() {
			T(), pe(n.video, n.language);
			let e = ae(n.video, n.language);
			if (e) {
				if (m = e, e.addEventListener("cuechange", S), a.value = _(), !a.value.length) {
					let t = ee(n.video, e);
					t && t.readyState !== 2 && (h = t, t.addEventListener("load", S));
				}
				w(), x();
			} else a.value = [];
		}
		return Z(() => [n.video, n.language], E, { immediate: !0 }), Z(i, x), Re(T), t({ lines: a }), (t, n) => a.value.length ? (K(), B("div", {
			key: 0,
			class: G(["player__captions", { "is-lifted": e.lifted }]),
			style: Le(c.value)
		}, [(K(!0), B(I, null, J(a.value, (e, t) => (K(), B("p", {
			key: t,
			class: "player__caption-line"
		}, Y(e), 1))), 128))], 6)) : z("", !0);
	}
}), [["__scopeId", "data-v-0c8b04d6"]]), Wt = ["aria-label", "aria-expanded"], Gt = ["aria-label"], Kt = { class: "capmenu__head" }, qt = { class: "capmenu__title" }, Jt = ["aria-label"], Yt = ["aria-checked", "tabindex"], Xt = { class: "capmenu__check" }, Zt = { class: "capmenu__optlabel" }, Qt = [
	"aria-checked",
	"tabindex",
	"onClick"
], $t = { class: "capmenu__check" }, en = { class: "capmenu__optlabel" }, tn = { class: "capmenu__check" }, nn = { class: "capmenu__optlabel" }, rn = { class: "capmenu__title capmenu__title--sub" }, an = ["aria-label"], on = [
	"aria-checked",
	"tabindex",
	"onClick"
], sn = { class: "capmenu__check" }, cn = { class: "capmenu__optlabel" }, ln = { class: "capmenu__field" }, un = { class: "capmenu__fieldlabel" }, dn = ["aria-label"], fn = ["aria-label"], pn = { class: "capmenu__stepvalue" }, mn = ["aria-label"], hn = ["aria-label", "disabled"], gn = { class: "capmenu__field" }, _n = { class: "capmenu__fieldlabel" }, vn = ["aria-label"], yn = ["aria-label"], bn = { class: "capmenu__stepvalue" }, xn = ["aria-label"], Sn = ["aria-label", "disabled"], Cn = { class: "capmenu__title capmenu__title--sub" }, wn = { class: "capmenu__style" }, Tn = { class: "capmenu__field" }, En = { class: "capmenu__fieldlabel" }, Dn = { class: "capmenu__field" }, On = { class: "capmenu__fieldlabel" }, kn = { class: "capmenu__field" }, An = { class: "capmenu__fieldlabel" }, jn = { class: "capmenu__field" }, Mn = { class: "capmenu__fieldlabel" }, Nn = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		let n = e, r = t, i = u(), a = T(), { t: s } = o(), c = Pe("phlixConfig", null), l = L(() => c?.locale ?? null), f = L(() => de(N, s)), p = L(() => de(le, s)), m = L(() => de(me, s)), h = L(() => de(fe, s)), g = q(null), _ = q(null), v = L(() => i.subtitleLang), y = L(() => n.tracks.some((e) => ge(e) === v.value)), b = L(() => y.value ? "captions" : "captions-off"), x = L(() => y.value ? n.tracks.findIndex((e) => ge(e) === v.value) + 1 : 0), S = L(() => n.activeAudio >= 0 ? n.activeAudio : 0);
		function C(e) {
			r("update:open", e);
		}
		function w() {
			C(!1);
		}
		function ee(e) {
			i.setSubtitle(e), a.defaultSubtitleLang = e, a.subtitlePreferenceSet = !0;
		}
		function E(e) {
			r("select-audio", e);
		}
		function A() {
			r("add-subtitles"), w();
		}
		function te(e, t, n) {
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
		function ne(e) {
			let t = te(e, n.tracks.length + 1, x.value);
			t !== null && ee(t === 0 ? null : ge(n.tracks[t - 1]));
		}
		function re(e) {
			let t = te(e, n.audioTracks.length, S.value);
			t !== null && E(n.audioTracks[t].index);
		}
		function ie(e) {
			a.captionStyle = {
				...a.captionStyle,
				size: e
			};
		}
		function ae(e) {
			a.captionStyle = {
				...a.captionStyle,
				textColor: String(e)
			};
		}
		function oe(e) {
			a.captionStyle = {
				...a.captionStyle,
				background: e
			};
		}
		function se(e) {
			a.captionStyle = {
				...a.captionStyle,
				edge: e
			};
		}
		function ce(e) {
			i.setSubtitleOffset(i.subtitleOffset + e * d);
		}
		function ue(e) {
			i.setAudioOffset(i.audioOffset + e * d);
		}
		function pe() {
			i.setSubtitleOffset(0);
		}
		function he() {
			i.setAudioOffset(0);
		}
		function _e(e) {
			let t = e === 0 ? 0 : e;
			return t > 0 ? `+${t.toFixed(1)}` : t.toFixed(1);
		}
		k(_, Ve(n, "open"), {
			lockScroll: !1,
			onEscape: () => (w(), !0)
		});
		function ve(e) {
			g.value && !g.value.contains(e.target) && w();
		}
		return Z(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", ve, !0) : document.removeEventListener("pointerdown", ve, !0));
		}, { immediate: !0 }), Re(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", ve, !0);
		}), (t, n) => (K(), B("div", {
			ref_key: "rootEl",
			ref: g,
			class: "capmenu"
		}, [V("button", {
			type: "button",
			class: G(["capmenu__btn", { "is-active": y.value }]),
			"aria-label": y.value ? X(s)("player.captionsOn") : X(s)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => C(!e.open)
		}, [U(D, { name: b.value }, null, 8, ["name"])], 10, Wt), e.open ? (K(), B("div", {
			key: 0,
			ref_key: "panelEl",
			ref: _,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(s)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			V("div", Kt, [V("h3", qt, Y(X(s)("player.subtitles")), 1), U(O, {
				name: "x",
				label: X(s)("common.close"),
				size: "sm",
				onClick: w
			}, null, 8, ["label"])]),
			V("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(s)("player.subtitleTrack"),
				onKeydown: ne
			}, [V("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !y.value,
				tabindex: x.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => ee(null)
			}, [V("span", Xt, [y.value ? z("", !0) : (K(), R(D, {
				key: 0,
				name: "check"
			}))]), V("span", Zt, Y(X(s)("player.off")), 1)], 8, Yt), (K(!0), B(I, null, J(e.tracks, (e, t) => (K(), B("button", {
				key: X(ge)(e),
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": v.value === X(ge)(e),
				tabindex: x.value === t + 1 ? 0 : -1,
				onClick: (t) => ee(X(ge)(e))
			}, [V("span", $t, [v.value === X(ge)(e) ? (K(), R(D, {
				key: 0,
				name: "check"
			})) : z("", !0)]), V("span", en, Y(X(M)(e, X(s), l.value)), 1)], 8, Qt))), 128))], 40, Jt),
			V("button", {
				type: "button",
				class: "capmenu__add",
				onClick: A
			}, [V("span", tn, [U(D, { name: "plus" })]), V("span", nn, Y(X(s)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 0 ? (K(), B(I, { key: 0 }, [V("h3", rn, Y(X(s)("player.audio")), 1), V("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(s)("player.audioTrack"),
				onKeydown: re
			}, [(K(!0), B(I, null, J(e.audioTracks, (t) => (K(), B("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: S.value === t.index ? 0 : -1,
				onClick: (e) => E(t.index)
			}, [V("span", sn, [e.activeAudio === t.index ? (K(), R(D, {
				key: 0,
				name: "check"
			})) : z("", !0)]), V("span", cn, Y(X(M)(t, X(s), l.value)), 1)], 8, on))), 128))], 40, an)], 64)) : z("", !0),
			V("div", ln, [V("span", un, Y(X(s)("player.subtitleDelay")), 1), V("div", {
				class: "capmenu__stepper",
				role: "group",
				"aria-label": X(s)("player.subtitleDelay")
			}, [
				V("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": X(s)("player.delayDecrease"),
					onClick: n[2] ||= (e) => ce(-1)
				}, "−", 8, fn),
				V("span", pn, Y(X(s)("player.delayValue", { offset: _e(X(i).subtitleOffset) })), 1),
				V("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": X(s)("player.delayIncrease"),
					onClick: n[3] ||= (e) => ce(1)
				}, "+", 8, mn),
				V("button", {
					type: "button",
					class: "capmenu__stepbtn capmenu__stepreset",
					"aria-label": X(s)("player.delayReset"),
					disabled: X(i).subtitleOffset === 0,
					onClick: n[4] ||= (e) => pe()
				}, "↺", 8, hn)
			], 8, dn)]),
			V("div", gn, [V("span", _n, Y(X(s)("player.audioDelay")), 1), V("div", {
				class: "capmenu__stepper",
				role: "group",
				"aria-label": X(s)("player.audioDelay")
			}, [
				V("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": X(s)("player.delayDecrease"),
					onClick: n[5] ||= (e) => ue(-1)
				}, "−", 8, yn),
				V("span", bn, Y(X(s)("player.delayValue", { offset: _e(X(i).audioOffset) })), 1),
				V("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": X(s)("player.delayIncrease"),
					onClick: n[6] ||= (e) => ue(1)
				}, "+", 8, xn),
				V("button", {
					type: "button",
					class: "capmenu__stepbtn capmenu__stepreset",
					"aria-label": X(s)("player.delayReset"),
					disabled: X(i).audioOffset === 0,
					onClick: n[7] ||= (e) => he()
				}, "↺", 8, Sn)
			], 8, vn)]),
			V("h3", Cn, Y(X(s)("player.captionStyle")), 1),
			V("div", wn, [
				V("div", Tn, [V("span", En, Y(X(s)("player.size")), 1), U(j, {
					"model-value": X(a).captionStyle.size,
					options: f.value,
					label: X(s)("player.captionSize"),
					"onUpdate:modelValue": ie
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				V("div", Dn, [V("span", On, Y(X(s)("player.color")), 1), U(j, {
					"model-value": X(a).captionStyle.textColor,
					options: p.value,
					label: X(s)("player.captionColor"),
					"onUpdate:modelValue": ae
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				V("div", kn, [V("span", An, Y(X(s)("player.background")), 1), U(j, {
					"model-value": X(a).captionStyle.background,
					options: m.value,
					label: X(s)("player.captionBackground"),
					"onUpdate:modelValue": oe
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				V("div", jn, [V("span", Mn, Y(X(s)("player.edge")), 1), U(j, {
					"model-value": X(a).captionStyle.edge,
					options: h.value,
					label: X(s)("player.captionEdge"),
					"onUpdate:modelValue": se
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Gt)) : z("", !0)], 512));
	}
}), [["__scopeId", "data-v-78cae753"]]), Pn = { class: "subsearch" }, Fn = { class: "subsearch__langs" }, In = { class: "subsearch__legend" }, Ln = { class: "subsearch__chips" }, Rn = { class: "subsearch__actions" }, zn = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, Bn = {
	key: 2,
	class: "subsearch__prompt"
}, Vn = {
	key: 3,
	class: "subsearch__list"
}, Hn = { class: "subsearch__meta" }, Un = { class: "subsearch__release" }, Wn = { class: "subsearch__signals" }, Gn = { class: "subsearch__provider" }, Kn = ["aria-label"], qn = {
	key: 2,
	class: "subsearch__stat"
}, Jn = {
	key: 3,
	class: "subsearch__stat"
}, Yn = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		let i = t, a = r, { t: s } = o(), c = ee(), l = Pe("phlixConfig", null), u = L(() => l?.locale ?? null), d = [
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
		], f = L(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...i.preferredLangs, ...d]) {
				let r = (n || "").toLowerCase();
				r && !e.has(r) && (e.add(r), t.push(r));
			}
			return t;
		}), p = q(/* @__PURE__ */ new Set());
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
		let g = q(!1), _ = q(!1), v = q([]), y = q(/* @__PURE__ */ new Set()), b = q(/* @__PURE__ */ new Set());
		function x(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let S = L(() => [...v.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), C = L(() => p.value.size > 0 && !g.value);
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
		function E() {
			a("update:open", !1);
		}
		function O(t) {
			if (t instanceof e) {
				if (t.status === 429) {
					let e = t.body && typeof t.body == "object" ? t.body : {}, n = typeof e.downloadsRemaining == "number" ? e.downloadsRemaining : null, r = typeof e.resetTimeUtc == "string" ? e.resetTimeUtc : null;
					r ? c.warning(s("player.subtitleQuotaReset", { time: k(r) })) : n === null ? c.warning(s("player.subtitleQuota")) : c.warning(s("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (t.status === 404) {
					c.error(s("player.subtitleAddNotFound"));
					return;
				}
			}
			c.error(s("player.subtitleAddError"));
		}
		function k(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function A(e) {
			let t = x(e);
			if (y.value.has(t) || b.value.has(t)) return;
			let n = new Set(y.value);
			n.add(t), y.value = n;
			try {
				let n = Qe([(await w().downloadSubtitle(i.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], r = new Set(b.value);
				r.add(t), b.value = r;
				let o = he(e.language, u.value);
				c.success(o ? s("player.subtitleAdded", { language: o }) : s("player.subtitleAddedGeneric")), n && a("added", n);
			} catch (e) {
				O(e);
			} finally {
				let e = new Set(y.value);
				e.delete(t), y.value = e;
			}
		}
		return Z(() => i.open, (e) => {
			e && (m(), v.value = [], _.value = !1, g.value = !1, y.value = /* @__PURE__ */ new Set(), b.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (e, n) => (K(), R(_e, {
			"model-value": t.open,
			title: X(s)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: Q(() => [U(ve, {
				variant: "ghost",
				onClick: E
			}, {
				default: Q(() => [H(Y(X(s)("common.close")), 1)]),
				_: 1
			})]),
			default: Q(() => [V("div", Pn, [
				V("fieldset", Fn, [V("legend", In, Y(X(s)("player.subtitleSearchLanguages")), 1), V("div", Ln, [(K(!0), B(I, null, J(f.value, (e) => (K(), R(P, {
					key: e,
					selected: p.value.has(e),
					size: "md",
					"aria-label": X(he)(e, u.value),
					"onUpdate:selected": (t) => h(e)
				}, {
					default: Q(() => [H(Y(X(he)(e, u.value)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				V("div", Rn, [U(ve, {
					variant: "solid",
					"left-icon": "search",
					loading: g.value,
					disabled: !C.value,
					onClick: T
				}, {
					default: Q(() => [H(Y(X(s)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				g.value ? (K(), B("div", zn, [U(ye, { label: X(s)("player.subtitleSearching") }, null, 8, ["label"]), V("span", null, Y(X(s)("player.subtitleSearching")), 1)])) : _.value && S.value.length === 0 ? (K(), R(xe, {
					key: 1,
					icon: "captions",
					title: X(s)("player.subtitleSearchEmpty"),
					description: X(s)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : _.value ? (K(), B("ul", Vn, [(K(!0), B(I, null, J(S.value, (e) => (K(), B("li", {
					key: x(e),
					class: "subsearch__item"
				}, [V("div", Hn, [V("p", Un, Y(e.releaseName || e.provider), 1), V("div", Wn, [
					U(be, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Q(() => [H(Y(X(he)(e.language, u.value)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (K(), R(be, {
						key: 0,
						tone: "info",
						size: "sm",
						label: X(s)("player.subtitleHearingImpairedFull")
					}, {
						default: Q(() => [H(Y(X(s)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : z("", !0),
					V("span", Gn, Y(e.provider), 1),
					e.rating > 0 ? (K(), B("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": X(s)("player.subtitleRating", { rating: e.rating })
					}, [U(D, { name: "star" }), H(" " + Y(e.rating), 1)], 8, Kn)) : z("", !0),
					e.downloadCount > 0 ? (K(), B("span", qn, Y(X(s)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : z("", !0),
					e.fps ? (K(), B("span", Jn, Y(X(s)("player.subtitleFps", { fps: e.fps })), 1)) : z("", !0)
				])]), U(ve, {
					variant: "outline",
					size: "sm",
					"left-icon": b.value.has(x(e)) ? "check" : "plus",
					loading: y.value.has(x(e)),
					disabled: y.value.has(x(e)) || b.value.has(x(e)),
					"aria-label": X(s)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => A(e)
				}, {
					default: Q(() => [H(Y(y.value.has(x(e)) ? X(s)("player.subtitleAdding") : X(s)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (K(), B("p", Bn, Y(X(s)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-f0470f79"]]), Xn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Zn(e, t, n, r, i, a, o) {
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
		r: Xn(d / m),
		g: Xn(f / m),
		b: Xn(p / m)
	};
}
function Qn(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Zn(e, t, n, 0, 0, r, n),
		right: Zn(e, t, n, t - r, 0, t, n),
		center: Zn(e, t, n, 0, 0, t, n)
	};
}
function $n({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
var er = (e) => `${Math.round(e * 1e3) / 10}%`;
function tr(e, t = 1) {
	return nr(e, t).map((e) => `radial-gradient(${er(e.rx)} ${er(e.ry)} at ${er(e.cx)} ${er(e.cy)}, ${$n(e.color, e.alpha)}, transparent ${er(e.stop)})`).join(", ");
}
function nr(e, t = 1) {
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
function rr(e, t) {
	e.clearRect(0, 0, 112, 72), e.filter = "blur(3px)";
	for (let n of t) {
		let t = 8 + n.cx * 96, r = 9 + n.cy * 54, i = n.rx * 96, a = n.ry * 54;
		e.save(), e.translate(t, r), e.scale(i, a);
		let o = e.createRadialGradient(0, 0, 0, 0, 0, 1), { r: s, g: c, b: l } = n.color;
		o.addColorStop(0, $n(n.color, n.alpha)), o.addColorStop(n.stop, `rgba(${s}, ${c}, ${l}, 0)`), e.fillStyle = o, e.fillRect((8 - t) / i, (9 - r) / a, 96 / i, 54 / a), e.restore();
	}
}
function ir(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var ar = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		let n = e, r = q(!1), i = null;
		function a() {
			r.value = ir(i);
		}
		let o = L(() => n.enabled && !n.reducedMotion && !r.value), s = L(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = q(null), l = q(null), u = null, d = null, f = !1;
		function p(e) {
			if (f || typeof document > "u") return null;
			try {
				if (!d && (u = document.createElement("canvas"), u.width = 112, u.height = 72, d = u.getContext("2d"), !d)) throw Error("no 2d context");
				rr(d, nr(e));
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
				let { data: n } = t.getImageData(0, 0, 32, 18), r = Qn(n, 32, 18), i = p(r);
				l.value = i, c.value = i ? null : tr(r);
			} catch {
				_ = !0, c.value = null, l.value = null;
			}
		}
		function b(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let x = null, S = null, C = null, w = 0, T = !1;
		function ee(e) {
			S = e, x = e.requestVideoFrameCallback(E);
		}
		function E(e) {
			if (!T) return;
			e - w >= 250 && (w = e, y());
			let t = n.video;
			b(t) && ee(t);
		}
		function D() {
			if (T || !o.value || !n.video) return;
			let e = n.video;
			b(e) ? (T = !0, w = 0, ee(e)) : (y(), _ || (T = !0, C = setInterval(y, 250)));
		}
		function O() {
			T = !1, x != null && S && S.cancelVideoFrameCallback(x), x = null, S = null, C != null && (clearInterval(C), C = null);
		}
		Z(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			O(), e && t && D();
		}, { immediate: !0 }), ze(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Re(() => {
			O(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let k = L(() => {
			let e = { opacity: String(s.value) };
			return l.value ? e.backgroundImage = `url("${l.value}")` : c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: y }), (e, t) => (K(), B("div", {
			class: G(["player__ambient", {
				"is-active": o.value,
				"is-bitmap": o.value && !!l.value
			}]),
			style: Le(o.value ? k.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-ba42f7c0"]]), or = ["aria-label"], sr = { class: "resume__label" }, cr = { class: "resume__time numeric" }, lr = { class: "resume__actions" }, ur = /*#__PURE__*/ E(/* @__PURE__ */ W({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = o(), i = L(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (K(), B("div", {
			class: "resume",
			role: "region",
			"aria-label": X(r)("player.resumePlayback")
		}, [V("p", sr, [
			H(Y(i.value[0]), 1),
			V("span", cr, Y(X(h)(e.seconds)), 1),
			H(Y(i.value[1]), 1)
		]), V("div", lr, [V("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [U(D, { name: "play" }), V("span", null, Y(X(r)("player.resume")), 1)]), V("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [U(D, { name: "rewind" }), V("span", null, Y(X(r)("player.startOver")), 1)])])], 8, or));
	}
}), [["__scopeId", "data-v-271c5209"]]), dr = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], fr = /* @__PURE__ */ new Set([
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
function pr(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function mr(...e) {
	return e.some((e) => fr.has(pr(e)));
}
function hr(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function gr(e) {
	return e?.error?.code === 2;
}
var _r = 3e4;
function vr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && Tr.get(t) === "hevc";
}
function yr(e) {
	let t = { forceTranscode: "1" };
	return vr(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function br(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
function xr(e) {
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
var Sr = 2 * Math.PI * 15;
function Cr(e, t, n = Sr) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var wr = /* @__PURE__ */ new Map([
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
]), Tr = /* @__PURE__ */ new Map([
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
]), Er = /* @__PURE__ */ new Set(["h264"]), Dr = /* @__PURE__ */ new Map([
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
function Or(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = Tr.get(t);
	return n === void 0 ? "transcode" : Er.has(n) ? "direct" : "probe";
}
function kr(e) {
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
var Ar = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function jr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return Ar.get(t) ?? "video/mp4";
}
function Mr(e, t = "video/mp4") {
	let n = wr.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function Nr(e, t = "video/mp4") {
	if (!e) return !0;
	let n = Mr(e, t);
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
async function Pr(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = Tr.get(n), i = r === void 0 ? void 0 : Dr.get(r);
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
async function Fr(e, t, n = "") {
	if (mr(...e)) return !0;
	let r = e.map((e) => pr(e)).find((e) => dr.includes(e)) ?? "";
	if (!dr.includes(r)) return !1;
	let i = jr(r), a = Or(n);
	if (a === "transcode" || a === "probe" && !await Pr(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await Nr(e.codec, i)) return !0;
	}
	return !1;
}
// src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Ir = ["aria-label"], Lr = ["src"], Rr = { class: "upnext__body" }, zr = { class: "upnext__eyebrow" }, Br = { class: "upnext__title" }, Vr = {
	key: 0,
	class: "upnext__cd numeric"
}, Hr = { class: "upnext__actions" }, Ur = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Wr = ["r"], Gr = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Kr = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		let { t: n } = o(), { imgSrc: r } = c(), i = e, a = t, s = L(() => i.posterUrl ?? i.media.poster_url ?? null), l = L(() => Cr(i.remaining, i.total));
		return (t, i) => (K(), B("aside", {
			class: "upnext",
			role: "region",
			"aria-label": X(n)("player.upNext")
		}, [
			s.value ? (K(), B("img", {
				key: 0,
				class: "upnext__thumb",
				src: X(r)(s.value),
				alt: "",
				loading: "lazy"
			}, null, 8, Lr)) : z("", !0),
			V("div", Rr, [
				V("p", zr, Y(X(n)("player.upNext")), 1),
				V("h4", Br, Y(e.media.name), 1),
				e.counting ? (K(), B("p", Vr, Y(e.remaining > 0 ? X(n)("player.startsIn", { count: e.remaining }) : X(n)("player.startingNow")), 1)) : z("", !0),
				V("div", Hr, [V("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [U(D, { name: "play" }), V("span", null, Y(X(n)("player.playNow")), 1)]), V("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, Y(X(n)("player.cancel")), 1)])
			]),
			e.counting ? (K(), B("svg", Ur, [V("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Wr), V("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": X(Sr),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Gr)])) : z("", !0)
		], 8, Ir));
	}
}), [["__scopeId", "data-v-3fc667d0"]]), qr = {
	class: "transcode",
	role: "alert"
}, Jr = { class: "transcode__card" }, Yr = { class: "transcode__heading" }, Xr = { class: "transcode__body" }, Zr = /*#__PURE__*/ E(/* @__PURE__ */ W({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = o();
		return (t, i) => (K(), B("div", qr, [V("div", Jr, [
			U(D, {
				name: "alert",
				class: "transcode__icon"
			}),
			V("h3", Yr, Y(X(r)("player.transcodeHeading")), 1),
			V("p", Xr, Y(e.title ? X(r)("player.transcodeBodyTitled", { title: e.title }) : X(r)("player.transcodeBodyUntitled")), 1),
			V("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [U(D, { name: "arrow-left" }), V("span", null, Y(X(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Qr = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, $r = { class: "prep__card" }, ei = { class: "prep__heading" }, ti = { class: "prep__body" }, ni = ["aria-valuenow"], ri = /*#__PURE__*/ E(/* @__PURE__ */ W({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = o(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (K(), B("div", Qr, [V("div", $r, [
			U(D, {
				name: "spinner",
				class: "prep__spinner"
			}),
			V("h3", ei, Y(X(n)("player.transcodePreparingHeading")), 1),
			V("p", ti, Y(e.title ? X(n)("player.transcodePreparingTitled", { title: e.title }) : X(n)("player.transcodePreparingUntitled")), 1),
			V("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [V("div", {
				class: "prep__bar-fill",
				style: Le({ width: r() + "%" })
			}, null, 4)], 8, ni),
			V("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [U(D, { name: "arrow-left" }), V("span", null, Y(X(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), ii = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		return (e, t) => (K(), R(Ne, { name: "skip" }, {
			default: Q(() => [s.value ? (K(), B("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ue(c, ["stop"])
			}, [V("span", null, Y(s.value.label), 1), U(D, { name: "skip-forward" })])) : z("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), ai = ["aria-label"], oi = ["aria-label", "onClick"], si = { class: "skip-controls__label" }, ci = 5, li = 30, ui = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
			let n = a(e.startMs), r = n - ci, i = n + li;
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
		return (e, t) => d.value.length > 0 ? (K(), B("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": X(i)("player.skipControls")
		}, [(K(!0), B(I, null, J(d.value, (e) => (K(), B("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${u(e.type)}`,
			onClick: Ue((t) => f(e), ["stop"])
		}, [V("span", si, Y(u(e.type)), 1), U(D, { name: "skip-forward" })], 8, oi))), 128))], 8, ai)) : z("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), di = ["aria-label", "aria-expanded"], fi = ["aria-label"], pi = { class: "chapterlist__head" }, mi = { class: "chapterlist__title" }, hi = ["aria-label"], gi = ["onClick"], _i = { class: "chapterlist__index" }, vi = { class: "chapterlist__name" }, yi = { class: "chapterlist__meta" }, bi = { class: "chapterlist__time" }, xi = {
	key: 0,
	class: "chapterlist__duration"
}, Si = {
	key: 1,
	class: "chapterlist__empty"
}, Ci = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		})), l = q(null), u = q(null);
		k(u, Ve(n, "open"), {
			lockScroll: !1,
			onEscape: () => (a(), !0)
		});
		function d(e) {
			l.value && !l.value.contains(e.target) && a();
		}
		Z(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", d, !0) : document.removeEventListener("pointerdown", d, !0));
		}), Re(() => {
			document.removeEventListener("pointerdown", d, !0);
		});
		function f(e) {
			r("seek", e.start), a();
		}
		return (t, n) => (K(), B("div", {
			ref_key: "rootEl",
			ref: l,
			class: "chapterlist"
		}, [V("button", {
			type: "button",
			class: G(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": X(i)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: s
		}, [U(D, { name: "list" })], 10, di), e.open ? (K(), B("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.chapterList"),
			tabindex: "-1"
		}, [V("div", pi, [V("h3", mi, Y(X(i)("player.chapters")), 1), U(O, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), c.value.length > 0 ? (K(), B("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": X(i)("player.chapterList")
		}, [(K(!0), B(I, null, J(c.value, (e) => (K(), B("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [V("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => f(e.chapter)
		}, [
			V("span", _i, Y(e.index), 1),
			V("span", vi, Y(e.label), 1),
			V("span", yi, [V("span", bi, Y(e.startLabel), 1), e.durationLabel ? (K(), B("span", xi, "· " + Y(e.durationLabel), 1)) : z("", !0)])
		], 8, gi)]))), 128))], 8, hi)) : (K(), B("p", Si, Y(X(i)("player.noChapters")), 1))], 8, fi)) : z("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), wi = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Ti = { class: "marker-timeline__ticks" }, Ei = [
	"title",
	"aria-label",
	"onClick"
], Di = { class: "marker-timeline__tooltip" }, Oi = { class: "marker-timeline__tooltip-label" }, ki = { class: "marker-timeline__tooltip-time numeric" }, Ai = ["onClick"], ji = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		return (e, t) => s.value.length > 0 ? (K(), B("div", {
			key: 0,
			class: G(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (K(), B("div", wi, [t[0] ||= V("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [V("polygon", { points: "5,3 19,12 5,21" })], -1), H(" " + Y(u.value), 1)])) : z("", !0), V("div", Ti, [(K(!0), B(I, null, J(s.value, (e) => (K(), B("button", {
			key: e.id,
			type: "button",
			class: G(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: Le({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${X(h)(e.startSec)}`,
			"aria-label": `${e.label} at ${X(h)(e.startSec)}`,
			onClick: Ue((t) => d(e), ["stop"])
		}, [V("span", Di, [
			V("span", Oi, Y(e.label), 1),
			V("span", ki, Y(X(h)(e.startSec)), 1),
			V("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ue((t) => f(e), ["stop"])
			}, " Find similar ", 8, Ai)
		])], 14, Ei))), 128))])], 2)) : z("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Mi = ["aria-label", "aria-expanded"], Ni = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, Pi = ["aria-label"], Fi = ["aria-selected", "onClick"], Ii = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		], a = q(0), s = q(0), c = L(() => s.value > 0), l;
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
		let m = q(!1);
		function h() {
			c.value ? (f(0), m.value = !1) : m.value = !m.value;
		}
		function g(e) {
			f(e), m.value = !1;
		}
		return Re(() => {
			u();
		}), t({ toggleOpen: h }), (e, t) => (K(), B("div", { class: G(["sleep-timer", { "is-active": c.value }]) }, [V("button", {
			type: "button",
			class: G(["sleep-timer__trigger", { "is-active": c.value }]),
			"aria-label": c.value ? `Sleep timer: ${p(s.value)} remaining` : X(r)("player.sleepTimer"),
			"aria-expanded": m.value,
			"aria-haspopup": "listbox",
			onClick: h
		}, [U(D, { name: "moon" }), c.value ? (K(), B("span", Ni, Y(p(s.value)), 1)) : z("", !0)], 10, Mi), U(Ne, { name: "dropdown" }, {
			default: Q(() => [m.value ? (K(), B("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": X(r)("player.sleepTimer")
			}, [(K(), B(I, null, J(i, (e) => V("li", {
				key: e.value,
				class: G(["sleep-timer__option", { "is-selected": a.value === e.value }]),
				role: "option",
				"aria-selected": a.value === e.value,
				onClick: (t) => g(e.value)
			}, Y(e.label), 11, Fi)), 64))], 8, Pi)) : z("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Li = {
	key: 0,
	class: "syncplay-overlay"
}, Ri = { class: "syncplay-overlay__badge" }, zi = { class: "syncplay-overlay__label" }, Bi = { class: "syncplay-overlay__status-label" }, Vi = { class: "syncplay-overlay__members" }, Hi = { class: "syncplay-overlay__member-count" }, Ui = { class: "syncplay-overlay__member-list" }, Wi = { class: "syncplay-overlay__member-name" }, Gi = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Ki = /*#__PURE__*/ E(/* @__PURE__ */ W({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let t = e, { t: n } = o(), r = Se(), a = i(), s = L(() => t.apiBase ?? a.value), c = L(() => r.currentRoom?.name ?? "SyncPlay"), l = L(() => r.onlineMembers.length), u = L(() => r.syncStatus), d = L(() => {
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
		return (e, t) => X(r).isInRoom ? (K(), B("div", Li, [
			V("div", Ri, [U(D, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), V("span", zi, "SyncPlay: " + Y(c.value), 1)]),
			V("div", { class: G(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [U(D, {
				name: f.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), V("span", Bi, Y(d.value), 1)], 2),
			V("div", Vi, [V("span", Hi, [U(D, { name: "user" }), H(" " + Y(X(n)("syncplay.members", { count: l.value })), 1)]), V("ul", Ui, [(K(!0), B(I, null, J(X(r).onlineMembers.slice(0, 5), (e) => (K(), B("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= V("span", { class: "syncplay-overlay__member-dot" }, null, -1), V("span", Wi, Y(e.name), 1)]))), 128)), X(r).onlineMembers.length > 5 ? (K(), B("li", Gi, " +" + Y(X(r).onlineMembers.length - 5) + " more ", 1)) : z("", !0)])]),
			U(ve, {
				variant: "ghost",
				size: "sm",
				onClick: p
			}, {
				default: Q(() => [H(Y(X(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : z("", !0);
	}
}), [["__scopeId", "data-v-2dfa4284"]]), qi = {
	key: 0,
	class: "syncplay-controls"
}, Ji = ["aria-label"], Yi = { class: "syncplay-controls__wait-label" }, Xi = { class: "syncplay-controls__transport" }, Zi = ["aria-label"], Qi = ["aria-label"], $i = ["aria-label"], ea = { class: "syncplay-controls__status-label" }, ta = 10, na = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		let n = e, a = t, { t: s } = o(), c = Se(), l = ee(), u = Pe("phlixConfig", null), d = i(), f = L(() => n.apiBase ?? d.value);
		Ce((e) => {
			l.error(r(e, u?.locale, s("syncplay.commandRejected")));
		}), Be(() => Ce(null));
		let p = q(!1), m = L(() => p.value || c.syncStatus === "re-syncing");
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
			await v(Math.max(0, n.position - ta));
		}
		async function b() {
			await v(Math.min(n.duration, n.position + ta));
		}
		return Z(() => c.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => X(c).isInRoom ? (K(), B("div", qi, [
			m.value ? (K(), B("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": X(s)("syncplay.waitingForMembers")
			}, [U(D, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), V("span", Yi, Y(X(s)("syncplay.waitingForMembers")), 1)], 8, Ji)) : z("", !0),
			V("div", Xi, [
				V("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(s)("syncplay.rewind"),
					onClick: y
				}, [U(D, { name: "rewind" })], 8, Zi),
				V("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? X(s)("syncplay.pauseAll") : X(s)("syncplay.playAll"),
					onClick: _
				}, [U(D, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Qi),
				V("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(s)("syncplay.fastForward"),
					onClick: b
				}, [U(D, { name: "forward" })], 8, $i)
			]),
			V("div", { class: G(["syncplay-controls__status", `syncplay-controls__status--${X(c).syncStatus}`]) }, [U(D, {
				name: X(c).syncStatus === "synced" ? "check" : X(c).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), V("span", ea, Y(X(c).syncStatus === "synced" ? X(s)("syncplay.synced") : X(c).syncStatus === "outOfSync" ? X(s)("syncplay.outOfSync") : X(s)("syncplay.reSyncing")), 1)], 2)
		])) : z("", !0);
	}
}), [["__scopeId", "data-v-276195ff"]]);
// src/utils/subtitleSrc.ts
function ra(e, t) {
	return String(s(e, t));
}
function ia(e, t) {
	let n = !1, r = t.map((t) => {
		let r = ra(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
// src/components/Player.vue?vue&type=script&setup=true&lang.ts
var aa = { class: "player__stage" }, oa = ["src", "poster"], sa = [
	"src",
	"srclang",
	"label"
], ca = {
	key: 0,
	class: "player__buffering"
}, la = {
	class: "player__buffering-text",
	"aria-hidden": "true"
}, ua = { class: "player__meta" }, da = ["aria-label"], fa = { class: "player__meta-text" }, pa = { class: "player__eyebrow" }, ma = { class: "player__title" }, ha = { class: "player__sub numeric" }, ga = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, _a = {
	key: 1,
	class: "player__center"
}, va = ["aria-label"], ya = ["aria-label"], ba = ["aria-label"], xa = { class: "player__btnrow" }, Sa = ["aria-label"], Ca = ["aria-label"], wa = ["aria-label"], Ta = { class: "player__time numeric" }, Ea = ["aria-label", "aria-pressed"], Da = ["title"], Oa = ["aria-label"], ka = ["aria-label"], Aa = ["aria-label", "aria-pressed"], ja = ["aria-label", "aria-pressed"], Ma = ["aria-label"], Na = { class: "similar-modal" }, Pa = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Fa = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, Ia = { class: "similar-modal__state-title" }, La = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, Ra = {
	key: 3,
	class: "similar-modal__results"
}, za = { class: "similar-modal__poster" }, Ba = ["src", "alt"], Va = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Ha = { class: "similar-modal__result-body" }, Ua = { class: "similar-modal__result-title" }, Wa = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Ga = { key: 0 }, Ka = /*#__PURE__*/ E(/* @__PURE__ */ W({
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
		let { imgSrc: r } = c(), a = e, s = t, l = u(), d = T(), { t: g } = o(), _ = Se(), v = f(), y = L(() => v.isFavorite(a.media.id)), x = L(() => v.likeLevel(a.media.id));
		function C() {
			v.toggleFavorite(a.media.id, ke());
		}
		function w(e) {
			v.setLike(a.media.id, e, ke());
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
		], O = q(null), k = q(null), A = q(null), j = q(!0), M = q(!1), ne = q(!1), ae = q(!1), oe = q(!1), N = q(!1), se = q(!1), ce = q(!1), le = q(!1), de = q(null), fe = q(null), pe = q(!1), me = ee(), he = q(!1);
		function ge(e) {
			me.success(g("syncplay.joinedRoom", { name: e.name }));
		}
		let ve = L(() => N.value ? 1.35 : 1), P = q(mr(a.streamUrl, a.media.path)), be = L(() => kr(a.media.streams)), xe = 0;
		async function Ce() {
			let e = ++xe;
			if (P.value) return;
			let t = await Fr([a.streamUrl, a.media.path], a.playbackAudioTracks ?? [], be.value);
			e === xe && t && !P.value && (P.value = !0, Ve(O.value?.currentTime ?? 0));
		}
		Z([() => a.playbackAudioTracks, be], () => {
			Ce();
		}, { immediate: !0 });
		let Te = Pe("phlixConfig", null), Ee = i(), De = Pe("resumeReporter", null), Oe = !1;
		function ke() {
			return Ee.value;
		}
		let F = mt({
			apiBase: () => a.apiBase ?? "",
			hlsConfig: Te?.playerHlsConfig
		}), Ae = S({ apiBase: () => a.apiBase ?? "" }), je = null;
		function Me(e) {
			je !== null && clearTimeout(je), je = setTimeout(() => {
				je = null, Ae.fetch(e);
			}, 0);
		}
		let Ne = L(() => a.thumbnailAt ?? Ae.thumbnailAt), W = L(() => P.value ? void 0 : a.streamUrl), Fe = L(() => P.value && F.state.value !== "ready"), Le = L(() => P.value && (F.state.value === "preparing" || F.state.value === "idle")), Be = L(() => P.value && F.state.value === "error");
		function Ve(e = 0) {
			let t = O.value, n = navigator.connection?.downlinkMax, r = ot(n);
			t && F.start(t, a.media.id, r, e);
		}
		function He(e) {
			l.quality === "original" && e !== "auto" ? F.loadVariantPlaylist(Nt) : typeof e == "string" && e !== "auto" ? F.loadVariantPlaylist(e) : F.setLevel(e);
		}
		let We = !1;
		function Ge() {
			d.defaultQuality = Mt;
		}
		function Ke() {
			let e = F.levels.value;
			if (e.length === 0) return !1;
			let t = d.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = F.variants.value;
				if (!t || t.length === 0) return !1;
				if (Bt(e, t)) F.loadVariantPlaylist(Nt);
				else {
					let t = zt(e);
					t >= 0 && F.setNextLevel(t), Ge();
				}
				return !0;
			}
			let n = Lt(e, t);
			return n >= 0 ? F.setNextLevel(n) : Ge(), !0;
		}
		Z(() => F.levels.value, (e) => {
			We || e.length === 0 || Ke() && (We = !0);
		}), Z(() => F.variants.value, (e) => {
			!We && e?.length && Ie(() => {
				We || Ke() && (We = !0);
			});
		}, { deep: !0 });
		let qe = q(l.resumePositionFor(a.media.id) ?? 0), Je = q(!P.value && qe.value > 0), Ye = null, $ = q(!1), Xe = q(8), Ze, Qe = q(null), $e = q(0), et = q(!1), tt = q([]), nt = q(!1), rt = q(null);
		function it(e, t) {
			Qe.value = e, $e.value = t, tt.value = [], rt.value = null, et.value = !0, ut(e, t);
		}
		let at = null, st = null, ct = null;
		function lt() {
			let e = a.apiBase ?? "";
			return (st === null || ct !== e) && (st = new n({ baseUrl: e }), ct = e), st;
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
		let ft = L(() => l.upNext);
		function pt() {
			P.value = mr(a.streamUrl, a.media.path), Ce(), qe.value = l.resumePositionFor(a.media.id) ?? 0, Je.value = !P.value && qe.value > 0, Ye = null, yn = !1, sn = !1, rn.value = [], nn.value = !1, cn = !1, Jt.value = -1, mn = null, We = !1, Oe = !1, Ft(), wt = !1, Dt = 0, Et = 0, vt(), $.value = !1, F.reset(), O.value && (O.value.currentTime = 0), P.value && Ve(), Me(a.media.id);
		}
		function ht(e) {
			let t = O.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ye = Math.max(0, e));
		}
		function gt() {
			ht(qe.value), Je.value = !1, O.value?.play()?.catch(() => {});
		}
		function _t() {
			Ye = null, ht(0), l.clearResume(a.media.id), Je.value = !1, O.value?.play()?.catch(() => {});
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
			Oe || (Oe = !0, De?.finish()), rr(), j.value = !0, l.upNext && ($.value = !0, d.autoplay && yt());
		}
		function xt() {
			vt(), $.value = !1;
			let e = l.next(a.streamUrlFor);
			e && s("play-next", e);
		}
		function St() {
			vt(), $.value = !1;
		}
		function Ct() {
			if (P.value) return;
			let e = O.value, t = gr(e) && (e?.currentTime ?? 0) === 0;
			(hr(e) || t) && (kt(), Ft(), P.value = !0, Ve(e?.currentTime ?? 0));
		}
		let wt = !1, Tt = null, Et = 0, Dt = 0;
		function kt() {
			if (wt) return;
			wt = !0;
			let e = a.media?.id;
			e != null && e !== "" && lt().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, yr({ videoCodec: be.value })).catch(() => {});
		}
		function Pt() {
			if (Tt !== null || wt || P.value) return;
			let e = O.value;
			e && (Et = Date.now(), Dt = e.currentTime, Tt = setTimeout(() => {
				Tt = null;
				let e = O.value;
				e && !P.value && br(Date.now(), Et, e.currentTime, Dt) && (kt(), P.value = !0, Ve(e.currentTime));
			}, _r));
		}
		function Ft() {
			Tt !== null && (clearTimeout(Tt), Tt = null);
		}
		let It = q([]), Rt = q([]), Vt = q(-1), Wt = q(!1), Gt = L(() => F.state.value === "ready" && F.audioTracks.value.length > 0), Kt = L(() => F.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), qt = L(() => (a.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Jt = q(-1), Yt = L(() => !Gt.value && !P.value && Rt.value.length === 0 && qt.value.length > 1), Xt = L(() => Rt.value.length > 0 ? !1 : F.state.value === "ready" ? !Gt.value && F.hasAudio.value : !P.value && !Yt.value && qt.value.length === 1), Zt = L(() => Gt.value ? Kt.value : Yt.value ? qt.value : Rt.value.length > 0 ? Rt.value : Xt.value ? [{
			index: 0,
			language: "",
			label: g("player.audioOriginal"),
			kind: "audio"
		}] : Rt.value), Qt = L(() => {
			if (Gt.value) return F.currentAudioTrack.value;
			if (Yt.value) {
				if (Jt.value >= 0) return Jt.value;
				let e = (a.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : a.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Rt.value.length === 0 && Xt.value ? 0 : Vt.value;
		}), $t = q(!1), en = l.subtitleLang, tn = L(() => {
			let e = a.apiBase ?? "", t = P.value ? F.subtitleTracks.value : ia(e, a.playbackSubtitleTracks ?? []);
			if (rn.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = ia(e, rn.value), i = new Set(t.map(n)), o = r.filter((e) => !i.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), nn = q(!1), rn = q([]), an = L(() => {
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
		let dn = L(() => It.value.some((e) => e.language === l.subtitleLang));
		function fn() {
			let e = O.value;
			It.value = ie(e), Rt.value = re(e), Vt.value = te(e), ln(), un();
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
				if (Gt.value) F.setAudioTrack(e);
				else if (Yt.value) {
					if (e === Qt.value) return;
					Jt.value = e, mn = e, P.value = !0, Ve(O.value?.currentTime ?? 0);
				} else ue(O.value, e), Vt.value = e;
			}
		}
		Z(Gt, (e) => {
			if (!e || mn === null) return;
			let t = mn;
			mn = null, t >= 0 && t < F.audioTracks.value.length && F.setAudioTrack(t);
		}), Z(tn, () => {
			Ie(() => fn());
		}, { deep: !0 });
		let gn = null, _n, vn = L(() => {
			let e = [];
			a.media.year && e.push({ text: String(a.media.year) }), a.media.rating && e.push({
				text: a.media.rating,
				cert: !0
			}), a.media.runtime && e.push({ text: `${a.media.runtime}m` });
			let t = a.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), yn = !1;
		function bn() {
			if (!a.autoplay || yn || Je.value || Fe.value) return;
			let e = O.value;
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
			let e = O.value;
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
				let e = O.value;
				e && Math.abs(e.volume - l.volume) > .001 && (e.volume = l.volume);
			}
			l.play(), l.setMediaPositionState(), Pt();
		}
		function Dn() {
			l.pause(), l.setMediaPositionState(), M.value = !1;
		}
		function On() {
			M.value = !0, rr(), j.value = !0;
		}
		function kn() {
			M.value = !1, or();
		}
		function An() {
			let e = O.value;
			e && (Tt !== null && e.currentTime > Dt && Ft(), l.updateProgress(e.currentTime, e.duration, Tn(e)), _.isInRoom && _.updateLocalPosition(e.currentTime));
		}
		function jn() {
			let e = O.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, Ye !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ye) : Ye, Ye = null), l.updateProgress(e.currentTime, e.duration, Tn(e)), l.setMediaPositionState(), fn());
		}
		function Mn() {
			let e = O.value;
			e && l.updateProgress(e.currentTime, e.duration, Tn(e));
		}
		function Pn() {
			let e = O.value;
			e && (!qn && Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function Fn() {
			let e = O.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate), l.setMediaPositionState();
		}
		function In() {
			l.setMediaPositionState();
		}
		function Ln() {
			l.setMediaPositionState();
		}
		function Rn(e) {
			let t = O.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function zn(e) {
			Rn(l.position + e);
		}
		function Bn() {
			ae.value = !0, or();
		}
		function Vn() {
			ae.value = !1, or();
		}
		function Hn(e) {
			let t = E.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(E[e] - l.rate) ? n : e, 0), n = E[Math.min(E.length - 1, Math.max(0, t + e))];
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
			de.value?.toggleOpen();
		}
		let Kn = null, qn = !1;
		function Jn() {
			let e = O.value;
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
			toggleMute: Xn,
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
				oe.value = !oe.value;
			},
			toggleQuality: () => {
				P.value ? (pe.value = !pe.value, fe.value?.toggleMenu?.()) : me.show({
					message: g("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !oe.value && !Wt.value && !$t.value && !he.value && !nn.value && !et.value });
		function Xn() {
			l.toggleMute();
		}
		function Zn() {
			N.value = !N.value, s("theater", N.value);
		}
		Z(() => l.muted, (e) => {
			let t = O.value;
			t && t.muted !== e && (t.muted = e);
		}), Z(() => l.volume, (e) => {
			let t = O.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Z(() => l.rate, (e) => {
			let t = O.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Z(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? ht(e.value) : e.type === "seekBy" && ht(l.position + e.value));
		});
		function Qn() {
			if (typeof document > "u") return;
			if (!le.value) {
				Zn();
				return;
			}
			let e = k.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function $n() {
			ne.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function er() {
			let e = O.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function tr() {
			se.value = !0;
		}
		function nr() {
			se.value = !1;
		}
		function rr() {
			_n &&= (clearTimeout(_n), void 0);
		}
		function ir() {
			rr(), !l.playing || ae.value || M.value || (_n = setTimeout(() => {
				l.playing && !ae.value && !M.value && (j.value = !1);
			}, a.idleTimeout ?? 3e3));
		}
		function or() {
			j.value = !0, ir();
		}
		let sr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", cr = "data-phlix-prev-tabindex", lr = "__phlix_no_tabindex__";
		function dr(e) {
			let t = k.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(sr) ? [n] : Array.from(n.querySelectorAll(sr));
				for (let n of t) if (e) {
					let e = n.getAttribute(cr);
					e === null || e === lr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(cr);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(cr, n.getAttribute("tabindex") ?? lr), n.setAttribute("tabindex", "-1"));
			}
		}
		Z(j, (e) => {
			typeof document < "u" && (dr(e), !e && document.activeElement instanceof HTMLElement && k.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), Z(() => l.playing, (e) => {
			e ? (Je.value = !1, St(), ir()) : (rr(), M.value = !1, j.value = !0);
		});
		let fr = null;
		ze(() => {
			l.setCurrent(a.media, {
				resetPosition: !1,
				streamUrl: a.streamUrl
			}), v.hydrate(a.media), typeof document < "u" && (document.addEventListener("fullscreenchange", $n), ce.value = document.pictureInPictureEnabled === !0, le.value = document.fullscreenEnabled === !0), fr = l.bindMediaSession({
				onPlay: () => void O.value?.play()?.catch(() => {}),
				onPause: () => O.value?.pause(),
				onSeek: (e) => Rn(e),
				onNext: () => xt(),
				onPrevious: () => Sn()
			}), gn = O.value?.textTracks ?? null, gn?.addEventListener?.("addtrack", fn), gn?.addEventListener?.("removetrack", fn), fn(), P.value && Ve(), Me(a.media.id);
		}), Z(() => a.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: a.streamUrl
			}), pt();
		}), Z(() => a.media?.id, () => {
			v.hydrate(a.media);
		}), Z(() => _.currentSession, (e) => {
			e && (e.state === "playing" ? (O.value?.play()?.catch(() => {}), l.play()) : e.state === "paused" && (O.value?.pause(), l.pause()), _.updateLocalPosition(l.position), Math.abs(_.driftAmount) > 2 && ht(e.playbackPosition));
		});
		let pr = null;
		return Z(() => _.pendingPlayMedia, async (e) => {
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
				}), O.value?.play()?.catch(() => {}), l.play(), _.consumePendingPlayMedia(), pr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			pr !== n && (pr = n, s("pending-media", e.mediaId, e.title));
		}), Re(() => {
			De?.reportFinal?.(), rr(), vt(), F.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", $n), fr?.(), gn?.removeEventListener?.("addtrack", fn), gn?.removeEventListener?.("removetrack", fn), Kn !== null && (clearInterval(Kn), Kn = null), je !== null && (clearTimeout(je), je = null), Ft();
		}), (t, n) => (K(), B("div", {
			ref_key: "containerRef",
			ref: k,
			class: G(["player", {
				"is-chrome-hidden": !j.value,
				"is-theater": N.value
			}]),
			"data-player-surface": "",
			onPointermove: or,
			onPointerdown: or,
			onFocusin: or
		}, [U(ar, {
			video: O.value,
			enabled: X(d).atmosphere,
			playing: X(l).playing,
			"reduced-motion": X(d).effectiveReducedMotion,
			intensity: ve.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), V("div", aa, [
			V("video", {
				ref_key: "videoRef",
				ref: O,
				class: "player__video",
				src: W.value,
				poster: X(r)(e.media.poster_url) ?? void 0,
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
				onVolumechange: Pn,
				onRatechange: Fn,
				onSeeked: In,
				onDurationchange: Ln,
				onEnded: bt,
				onError: Ct,
				onEnterpictureinpicture: tr,
				onLeavepictureinpicture: nr,
				onClick: wn
			}, [(K(!0), B(I, null, J(tn.value, (e) => (K(), B("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, sa))), 128))], 40, oa),
			n[22] ||= V("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[23] ||= V("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			M.value ? (K(), B("div", ca, [U(ye, {
				size: 38,
				label: X(g)("player.buffering")
			}, null, 8, ["label"]), V("span", la, Y(X(g)("player.buffering")), 1)])) : z("", !0),
			V("div", ua, [V("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": X(g)("player.back"),
				onClick: n[0] ||= Ue((e) => s("back"), ["stop"])
			}, [U(D, { name: "arrow-left" })], 8, da), V("div", fa, [
				V("p", pa, Y(X(g)("player.nowPlaying")), 1),
				V("h2", ma, Y(e.media.name), 1),
				V("div", ha, [(K(!0), B(I, null, J(vn.value, (e, t) => (K(), B(I, { key: t }, [t > 0 && !e.cert ? (K(), B("span", ga, "·")) : z("", !0), V("span", { class: G({ player__cert: e.cert }) }, Y(e.text), 3)], 64))), 128))])
			])]),
			Fe.value ? z("", !0) : (K(), B("div", _a, [
				j.value ? (K(), B("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(g)("player.seekBackward"),
					onClick: n[1] ||= Ue((e) => zn(-10), ["stop"])
				}, [U(D, { name: "rewind" }), V("span", { class: "player__center-skip-count" }, Y(10))], 8, va)) : z("", !0),
				V("button", {
					type: "button",
					class: G(["player__bigplay", { "is-playing": X(l).playing }]),
					"aria-label": X(l).playing ? X(g)("player.pause") : X(g)("player.play"),
					onClick: Ue(wn, ["stop"])
				}, [U(D, { name: X(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, ya),
				j.value ? (K(), B("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(g)("player.seekForward"),
					onClick: n[2] ||= Ue((e) => zn(10), ["stop"])
				}, [U(D, { name: "forward" }), V("span", { class: "player__center-skip-count" }, Y(10))], 8, ba)) : z("", !0)
			])),
			U(Ut, {
				video: O.value,
				language: X(l).subtitleLang,
				"style-config": X(d).captionStyle,
				lifted: j.value,
				"controls-root": A.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Fe.value ? z("", !0) : (K(), B("div", {
				key: 2,
				ref_key: "controlsRef",
				ref: A,
				class: "player__controls",
				onClick: n[9] ||= Ue(() => {}, ["stop"])
			}, [
				U(b, {
					position: X(l).position,
					duration: X(l).duration,
					buffered: X(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": Ne.value,
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
				X(d).showMarkerTimeline && e.markers && e.markers.length > 0 ? (K(), R(ji, {
					key: 0,
					position: X(l).position,
					duration: X(l).duration,
					markers: e.markers,
					onSeek: Rn,
					onSimilar: it
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : z("", !0),
				V("div", xa, [
					e.prevEpisode ? (K(), B("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(g)("player.previousEpisode"),
						onClick: Sn
					}, [U(D, { name: "skip-back" })], 8, Sa)) : z("", !0),
					V("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": X(l).playing ? X(g)("player.pause") : X(g)("player.play"),
						onClick: wn
					}, [U(D, { name: X(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Ca),
					e.nextEpisode ? (K(), B("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(g)("player.nextEpisode"),
						onClick: Cn
					}, [U(D, { name: "skip-forward" })], 8, wa)) : z("", !0),
					V("span", Ta, [
						H(Y(X(h)(X(l).position)), 1),
						n[18] ||= V("span", { class: "player__sep" }, " / ", -1),
						H(Y(X(h)(X(l).duration)), 1)
					]),
					n[19] ||= V("span", { class: "player__grow" }, null, -1),
					V("button", {
						type: "button",
						class: G(["player__iconbtn player__favorite", { "is-on": y.value }]),
						"aria-label": y.value ? X(g)("itemActions.removeFavorite") : X(g)("itemActions.addFavorite"),
						"aria-pressed": y.value ? "true" : "false",
						onClick: C
					}, [U(D, { name: y.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Ea),
					U(p, {
						level: x.value,
						onCycle: w
					}, null, 8, ["level"]),
					U(At),
					U(jt),
					U(Ht, {
						ref_key: "qualityMenuRef",
						ref: fe,
						open: pe.value,
						"onUpdate:open": n[3] ||= (e) => pe.value = e,
						levels: X(F).levels.value,
						variants: X(F).variants.value,
						"current-level": X(F).currentLevel.value,
						"auto-enabled": X(F).autoEnabled.value,
						"active-height": X(F).activeLevelHeight.value,
						onSelect: He
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					P.value ? z("", !0) : (K(), B("span", {
						key: 2,
						class: "player__direct-badge",
						title: X(g)("player.qualityDirectStream")
					}, Y(X(g)("player.directStream")), 9, Da)),
					U(Nn, {
						open: Wt.value,
						"onUpdate:open": n[4] ||= (e) => Wt.value = e,
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
					U(Ci, {
						open: $t.value,
						"onUpdate:open": n[6] ||= (e) => $t.value = e,
						chapters: e.chapters ?? [],
						onSeek: Rn
					}, null, 8, ["open", "chapters"]),
					U(Ii, {
						ref_key: "sleepTimerRef",
						ref: de,
						"on-expire": Jn
					}, null, 512),
					V("button", {
						type: "button",
						class: G(["player__iconbtn player__syncplay", { "is-on": X(_).isInRoom }]),
						"aria-label": X(_).isInRoom ? X(g)("syncplay.inRoom") : X(g)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: n[7] ||= (e) => he.value = !0
					}, [U(D, { name: "user" })], 10, Oa),
					V("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(g)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: n[8] ||= (e) => oe.value = !0
					}, [U(D, { name: "info" })], 8, ka),
					ce.value ? (K(), B("button", {
						key: 3,
						type: "button",
						class: G(["player__iconbtn", { "is-on": se.value }]),
						"aria-label": se.value ? X(g)("player.exitPip") : X(g)("player.pip"),
						"aria-pressed": se.value,
						onClick: er
					}, [U(D, { name: "pip" })], 10, Aa)) : z("", !0),
					V("button", {
						type: "button",
						class: G(["player__iconbtn", { "is-on": N.value }]),
						"aria-label": N.value ? X(g)("player.exitTheater") : X(g)("player.theater"),
						"aria-pressed": N.value,
						onClick: Zn
					}, [U(D, { name: "theater" })], 10, ja),
					le.value ? (K(), B("button", {
						key: 4,
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? X(g)("player.exitFullscreen") : X(g)("player.fullscreen"),
						onClick: Qn
					}, [U(D, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Ma)) : z("", !0)
				])
			], 512)),
			Fe.value ? z("", !0) : (K(), R(ii, {
				key: 3,
				position: X(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: Rn
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Fe.value ? z("", !0) : (K(), R(ui, {
				key: 4,
				position: X(l).position,
				markers: e.markers,
				onSkip: Rn
			}, null, 8, ["position", "markers"])),
			Je.value && !Fe.value ? (K(), R(ur, {
				key: 5,
				seconds: qe.value,
				onResume: gt,
				onRestart: _t
			}, null, 8, ["seconds"])) : z("", !0),
			$.value && ft.value && !Fe.value ? (K(), R(Kr, {
				key: 6,
				media: ft.value,
				remaining: Xe.value,
				total: X(8),
				counting: X(d).autoplay,
				onPlayNow: xt,
				onCancel: St
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : z("", !0),
			U(_e, {
				modelValue: et.value,
				"onUpdate:modelValue": n[10] ||= (e) => et.value = e,
				title: `Similar ${Qe.value ?? "marker"}s`,
				size: "lg",
				onClose: dt
			}, {
				default: Q(() => [V("div", Na, [nt.value ? (K(), B("div", Pa, [U(ye, { label: "Finding similar media" })])) : rt.value ? (K(), B("div", Fa, [U(D, {
					name: "error",
					class: "similar-modal__state-icon"
				}), V("p", Ia, Y(rt.value), 1)])) : !nt.value && tt.value.length === 0 ? (K(), B("div", La, [
					U(D, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					n[20] ||= V("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					n[21] ||= V("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (K(), B("ul", Ra, [(K(!0), B(I, null, J(tt.value, (e) => (K(), B("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [V("div", za, [e.poster_url ? (K(), B("img", {
					key: 0,
					src: X(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Ba)) : (K(), B("div", Va, [U(D, { name: "film" })]))]), V("div", Ha, [V("p", Ua, Y(e.name), 1), e.year ? (K(), B("p", Wa, [H(Y(e.year) + " ", 1), e.runtime ? (K(), B("span", Ga, " · " + Y(e.runtime) + "m", 1)) : z("", !0)])) : z("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Le.value ? (K(), R(ri, {
				key: 7,
				title: e.media.name,
				progress: X(F).progress.value,
				onBack: n[11] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : z("", !0),
			Be.value ? (K(), R(Zr, {
				key: 8,
				title: e.media.name,
				onBack: n[12] ||= (e) => s("back")
			}, null, 8, ["title"])) : z("", !0),
			X(_).isInRoom ? (K(), R(na, {
				key: 9,
				position: X(l).position,
				duration: X(l).duration,
				"is-playing": X(l).playing,
				onSeek: Rn,
				onPlay: n[13] ||= (e) => void O.value?.play()?.catch(() => {}),
				onPause: n[14] ||= (e) => void O.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : z("", !0),
			X(_).isInRoom ? (K(), R(Ki, { key: 10 })) : z("", !0),
			U(we, {
				modelValue: he.value,
				"onUpdate:modelValue": n[15] ||= (e) => he.value = e,
				onJoined: ge
			}, null, 8, ["modelValue"]),
			U(Ot, {
				open: oe.value,
				onClose: n[16] ||= (e) => oe.value = !1
			}, null, 8, ["open"]),
			U(Yn, {
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
}), [["__scopeId", "data-v-767f23d0"]]), qa = "blur(3px) saturate(1.35)";
async function Ja(e, t = document, n = 16 / 9) {
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
		"filter" in c && (c.filter = qa), c.drawImage(r, (64 - u) / 2 - 4, (o - d) / 2 - 4, u + 8, d + 8), "filter" in c && (c.filter = "none"), c.globalCompositeOperation = "destination-in", c.save(), c.translate(32, o / 2), c.scale(32 * Math.SQRT2, o / 2 * Math.SQRT2);
		let f = c.createRadialGradient(0, 0, 0, 0, 0, 1);
		return f.addColorStop(0, "rgba(0, 0, 0, 1)"), f.addColorStop(.75, "rgba(0, 0, 0, 0)"), c.fillStyle = f, c.fillRect(-1, -1, 2, 2), c.restore(), c.globalCompositeOperation = "source-over", s.toDataURL("image/png");
	} catch {
		return null;
	}
}
// src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var Ya = { class: "player-page__stage" }, Xa = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Za = { class: "player-page__blocking-error" }, Qa = /*#__PURE__*/ E(/* @__PURE__ */ W({
	__name: "PlayerPage",
	setup(t) {
		let r = /* @__PURE__ */ new Map(), s = i(), { imgSrc: d } = c(), p = a(), m = Ge(), h = Ke(), { t: _ } = o(), y = Pe("phlixConfig", null), b = u(), x = f(), S = g(), C = q(null), T = q(""), ee = q([]), E = q(null), D = q(null), O = q([]), k = q([]), A = q(!0), j = q(null), M = q(!1), te = q(null), ne = q(!1), re = q(null), ie = q(null), ae = L(() => String(m.params.id ?? ""));
		F(() => C.value?.name);
		let oe = L(() => d(C.value?.poster_url) || ""), N = q(null);
		Z(oe, (e) => {
			if (N.value = null, !e) return;
			let t = typeof window < "u" && window.innerHeight > 0 ? window.innerWidth / window.innerHeight : 16 / 9;
			Ja(e, document, t).then((t) => {
				oe.value === e && (N.value = t);
			});
		}, { immediate: !0 });
		let se = L(() => {
			let e = N.value ?? oe.value;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), ce = null, le = !1, ue = 0;
		function de(e) {
			return le || e.generation !== ue;
		}
		function fe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function pe(e) {
			let t = p.value || s.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function me(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function he(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function ge(e, t, n) {
			let r = () => de(n), i = t.genres?.[0];
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
				if (r() || fe(e)) return;
				b.setQueue([]);
			}
		}
		async function P(e, t, n) {
			let r = l(s.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function ye(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function be(e, t) {
			re.value = De(e, t), ie.value = Oe(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && b.setQueue(r);
		}
		function Se(e) {
			for (let t of r.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function Ce(e, t, n) {
			if (re.value = null, ie.value = null, !he(t)) return;
			let i = Se(t.id);
			if (i) {
				be(i, t.id);
				return;
			}
			let a = () => de(n);
			try {
				let i = await ye(e, t, n.controller?.signal);
				if (a()) return;
				let o = await P(e, i.id, n.controller?.signal);
				if (a()) return;
				if (Ee(o)) {
					let t = o.filter((e) => e.type === "season"), r = await Promise.all(t.map((t) => P(e, t.id, n.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...r.flat()];
				}
				let s = Te(o);
				s.length && r.set(i.id, s), be(s, t.id);
			} catch (e) {
				if (a() || fe(e)) return;
				re.value = null, ie.value = null;
			}
		}
		async function we() {
			let t = ae.value;
			ce?.abort(), ce = typeof AbortController < "u" ? new AbortController() : null, ue += 1;
			let r = {
				generation: ue,
				controller: ce
			};
			if (A.value = !0, j.value = null, ee.value = [], E.value = null, D.value = null, O.value = [], k.value = [], re.value = null, ie.value = null, b.hideMiniPlayer(), !t) {
				j.value = _("common.missingMediaId"), A.value = !1;
				return;
			}
			let i = new n({ baseUrl: s.value });
			i.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, r.controller?.signal).then((e) => {
				de(r) || (ee.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), E.value = me(e?.intro_marker), D.value = me(e?.outro_marker), O.value = xr(e?.audio_tracks), k.value = Qe(e?.subtitle_tracks));
			}).catch(() => null);
			let a = Ae(t), o = Date.now();
			if (a && je(a, o)) {
				I(i, a.item, r);
				return;
			}
			let c;
			try {
				c = (await i.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, r.controller?.signal)).item;
			} catch (t) {
				if (de(r) || fe(t)) return;
				if (t instanceof e && (t.status === 403 || t.status === 429)) {
					let e = w(t.body, y?.locale);
					if (e !== null) {
						te.value = e, ne.value = !0, A.value = !1;
						return;
					}
				}
				if (a) {
					I(i, a.item, r);
					return;
				}
				j.value = v(t, y?.locale), A.value = !1;
				return;
			}
			if (!de(r)) {
				if (c) Me(t, c, o), I(i, c, r);
				else {
					if (a) {
						I(i, a.item, r);
						return;
					}
					j.value = "Couldn’t load media item", A.value = !1;
				}
			}
		}
		async function I(e, t, n) {
			C.value = t, x.hydrate(t), T.value = pe(t), A.value = !1, he(t) && (await Ce(e, t, n), de(n) || ie.value) || ge(e, t, n);
		}
		ze(we), Z(ae, we), We(() => {
			b.current && b.streamUrl && b.showMiniPlayer();
		}), Re(() => {
			le = !0, ce?.abort(), ce = null, S.reset();
		});
		function Ne() {
			h?.back();
		}
		function W(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Fe(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ie(e) {
			M.value = e, S.setTheaterActive(e);
		}
		function Be() {
			ne.value = !1, Ne();
		}
		return (e, t) => (K(), B("div", { class: G(["player-page", { "is-theater": M.value }]) }, [
			se.value && !A.value && !j.value ? (K(), B("div", {
				key: 0,
				class: G(["player-page__ambient", { "is-preblurred": N.value }]),
				style: Le(se.value),
				"aria-hidden": "true"
			}, null, 6)) : z("", !0),
			V("div", Ya, [A.value ? (K(), B("div", Xa, [U(ke, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : j.value ? (K(), R(xe, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: j.value
			}, {
				actions: Q(() => [U(ve, {
					variant: "solid",
					onClick: we
				}, {
					default: Q(() => [...t[1] ||= [H("Retry", -1)]]),
					_: 1
				}), U(ve, {
					variant: "ghost",
					onClick: Ne
				}, {
					default: Q(() => [...t[2] ||= [H("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : C.value ? (K(), R(Ka, {
				key: 2,
				media: C.value,
				"stream-url": T.value,
				"stream-url-for": pe,
				"api-base": X(s),
				chapters: ee.value,
				"intro-marker": E.value,
				"outro-marker": D.value,
				"playback-audio-tracks": O.value,
				"playback-subtitle-tracks": k.value,
				"prev-episode": re.value,
				"next-episode": ie.value,
				autoplay: !0,
				onBack: Ne,
				onPlayNext: W,
				onPlayEpisode: Fe,
				onTheater: Ie
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
			U(_e, {
				modelValue: ne.value,
				"onUpdate:modelValue": t[0] ||= (e) => ne.value = e,
				title: "Can’t start playback",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Q(() => [U(ve, {
					variant: "solid",
					onClick: Be
				}, {
					default: Q(() => [...t[3] ||= [H("OK", -1)]]),
					_: 1
				})]),
				default: Q(() => [V("p", Za, Y(te.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-3ae2a661"]]);
export { Qa as default };

//# sourceMappingURL=PlayerPage-BJjBnDQO.js.map