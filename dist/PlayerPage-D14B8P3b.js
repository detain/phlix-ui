import { S as e, o as t, t as n, y as r } from "./client-Bmlfq3Uy.js";
import { n as i, r as a } from "./useApiBase-DXTBY90j.js";
import { t as o } from "./useMessages-BjPW27vR.js";
import { r as s, t as c } from "./useImageSrc-CSM61b-l.js";
import { n as l } from "./media-query-D7hrCu8r.js";
import { a as u, t as d } from "./usePlayerStore-CAcZwoN3.js";
import { n as f, t as p } from "./ThumbRating-BcsfUUwy.js";
import { a as m, c as h, d as g, f as _, l as v, n as y, o as b, r as x, s as S, t as C, u as ee } from "./shortcuts-DRu04_zV.js";
import { a as w } from "./usePreferencesStore-BXm_CP7M.js";
import { t as te } from "./useToastStore-CxO_ppM8.js";
import { n as T, t as E } from "./Icon-55iG1rR7.js";
import { t as D } from "./IconButton-DsjtwjU1.js";
import { n as ne } from "./useFocusTrap-DStfPnC8.js";
import { t as O } from "./Slider-Bj5BaBUu.js";
import { t as k } from "./Select-CxtuZBlT.js";
import { a as re, c as A, d as ie, f as j, i as ae, l as M, m as N, n as oe, o as se, p as ce, r as le, s as ue, t as de, u as fe } from "./captions-f2yYSqAs.js";
import { t as pe } from "./Modal-Dr66jtzn.js";
import { t as me } from "./Button-DTiNkl61.js";
import { t as he } from "./Chip-SkWKSllm.js";
import { t as ge } from "./Spinner-B-nY5uPl.js";
import { t as _e } from "./Badge-D7vacFbh.js";
import { t as ve } from "./EmptyState-DjfWh3kt.js";
import { n as ye, r as be, t as xe } from "./SyncPlayModal-DXkhcTlr.js";
import { n as P, o as Se, r as Ce, t as we } from "./episode-order-DBEVgrOE.js";
import { t as Te } from "./Skeleton-DDhrDRE7.js";
import { i as Ee } from "./usePageTitle-j6j9gAmo.js";
import { n as De, r as Oe, t as ke } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as F, Transition as I, computed as L, createBlock as R, createCommentVNode as z, createElementBlock as B, createElementVNode as V, createTextVNode as H, createVNode as U, defineComponent as W, inject as Ae, mergeModels as je, nextTick as Me, normalizeClass as G, normalizeStyle as Ne, onBeforeUnmount as Pe, onMounted as Fe, onScopeDispose as Ie, openBlock as K, ref as q, renderList as J, toDisplayString as Y, toRef as Le, unref as X, useModel as Re, watch as Z, withCtx as Q, withModifiers as ze } from "vue";
import { onBeforeRouteLeave as Be, useRoute as Ve, useRouter as He } from "vue-router";
// src/components/player/transcode.ts
var Ue = /* @__PURE__ */ new Set([
	"pending",
	"queued",
	"running",
	"completed",
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function We(e, t) {
	return typeof e == "string" && Ue.has(e) ? e : t;
}
var Ge = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Ke(e, t = "") {
	return typeof e == "string" ? e : t;
}
function qe(e) {
	return e === !0 || e === "true" || e === 1;
}
function Je(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Ye(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Ke(e.url ?? e.src);
		r !== "" && t.push({
			index: Je(e.index),
			language: Ke(e.language ?? e.lang ?? e.srclang),
			label: Ke(e.label),
			default: qe(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Xe(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Je(e.height);
		if (r <= 0) continue;
		let i = e.playlist_url ?? e.playlistUrl;
		t.push({
			id: Ke(e.id),
			label: Ke(e.label),
			height: r,
			width: Je(e.width),
			bitrate: Je(e.bitrate),
			...typeof e.url == "string" && e.url !== "" ? { url: e.url } : {},
			...typeof i == "string" && i !== "" ? { playlistUrl: i } : {}
		});
	}
	return t.length > 0 ? t : null;
}
function Ze(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var Qe = .7, $e = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], et = 1e7, tt = "mobile-low";
function nt(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * Qe;
}
function rt(e) {
	let t = nt(e);
	if (t === void 0 || t >= et) return;
	let n = tt;
	for (let [e, r] of $e) r <= t && (n = e);
	return n;
}
function it(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function at(e) {
	let t = e ?? {};
	return {
		jobId: Ke(t.job_id ?? t.jobId),
		masterUrl: Ke(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: We(t.status, "running"),
		reused: qe(t.reused),
		subtitles: Ye(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Xe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function ot(e) {
	let t = e ?? {};
	return {
		jobId: Ke(t.job_id ?? t.jobId),
		status: We(t.status, "running"),
		playlistReady: qe(t.playlist_ready ?? t.playlistReady),
		progress: Je(t.progress),
		masterUrl: Ke(t.master_url ?? t.masterUrl),
		subtitles: Ye(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Xe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function st(e) {
	return e.playlistReady || e.status === "completed";
}
function ct(e) {
	return Ge.has(e);
}
function lt(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
// src/composables/useHlsTranscode.ts
var ut = "_master.m3u8";
function dt(e) {
	let t = q("idle"), r = q(0), i = q([]), a = q([]), o = q(-1), s = q(!0), c = q(null), l = q(null), d = q([]), f = q(-1), p = q(!1), m = q(null), h = q(null);
	function g(e) {
		if (!O) return;
		a.value = O.levels, o.value = O.getCurrentLevel(), s.value = O.autoLevelEnabled;
		let t = e ?? O.getCurrentLevel(), n = t >= 0 ? a.value.find((e) => e.index === t) : void 0;
		c.value = n ? n.height : null;
	}
	function v() {
		a.value = [], o.value = -1, s.value = !0, c.value = null, l.value = null;
	}
	function y(e) {
		O && (d.value = O.audioTracks, f.value = e ?? O.getCurrentAudioTrack());
	}
	function b() {
		O && (p.value = O.hasAudio());
	}
	function x() {
		d.value = [], f.value = -1, p.value = !1;
	}
	function S(t) {
		if (!t || t.length === 0) return;
		let n = e.apiBase(), r = t.map((e) => ({
			...e,
			...e.url ? { url: lt(n, e.url) } : {},
			...e.playlistUrl ? { playlistUrl: lt(n, e.playlistUrl) } : {}
		}));
		j = r, l.value = r;
	}
	function C(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		i.value = t.map((e) => ({
			...e,
			url: lt(n, e.url)
		}));
	}
	let ee = e.attach ?? _, w = e.pollIntervalMs ?? 1e3, te = e.maxWaitMs ?? 12e4, T = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), E = Math.max(1, Math.ceil(te / Math.max(1, w))), D = e.getToken ?? ft, ne = e.probeRungPlaylist ?? ((e) => gt(e, D)), O = null, k = null, re = null, A = null, ie = !1, j = [], ae = 0, M = null, N = 0;
	function oe() {
		return e.client ?? new n({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function se(n, a, o, s) {
		fe(), ie = !1;
		let c = ++N, l = () => ie || c !== N;
		M = new AbortController(), t.value = "preparing", r.value = 0, i.value = [], v();
		try {
			let i = oe(), c = at(await i.post(Ze(a, o), void 0, M.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			C(c.subtitles), S(c.variants), m.value = c.jobId, h.value = lt(e.apiBase(), c.masterUrl);
			let d = c.status === "completed";
			for (let e = 0; !d && e < E; e++) {
				let e = ot(await i.get(it(c.jobId), void 0, M.signal));
				if (l()) return;
				if (r.value = e.progress, C(e.subtitles), S(e.variants), ct(e.status)) throw Error(`transcode ${e.status}`);
				if (st(e)) {
					d = !0;
					break;
				}
				if (await T(w), l()) return;
			}
			if (!d) throw Error("transcode timed out");
			let f = await ee(n, h.value, {
				getToken: D,
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
			O = f, k = O.onLevelSwitched((e) => g(e)), re = O.onAudioTrackSwitched((e) => y(e)), A = O.onLevelLoaded(() => {
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
		O && (O.setCurrentLevel(e === "auto" ? -1 : e), g());
	}
	function le(e) {
		O && (O.setNextLevel(e === "auto" ? -1 : e), g());
	}
	function ue(e) {
		O && (O.setAudioTrack(e), y());
	}
	function de(e) {
		if (!O || !h.value) return;
		let t = j.find((t) => t.id === e), n = t?.playlistUrl ?? mt(h.value, e), r = t?.url ?? ht(h.value, e), i = ++ae;
		(async () => {
			let e;
			try {
				e = await ne(n);
			} catch {
				e = "unknown";
			}
			!ie && i === ae && O && (e === "absent" ? (console.warn(`[phlix-ui] rung mini-master unavailable (${n}) — this server has no per-rung index files; falling back to the legacy bare rung playlist (${r}). Multi-audio titles play silent on the video-only bare rung and the audio menu stays hidden (never a stale rendition list); muxed-audio titles play correctly. The menu returns once the server ships the index.`), O.loadSource(r)) : O.loadSource(n), v());
		})();
	}
	function fe() {
		if (ie = !0, ae++, M &&= (M.abort(), null), k) {
			try {
				k();
			} catch {}
			k = null;
		}
		if (re) {
			try {
				re();
			} catch {}
			re = null;
		}
		if (A) {
			try {
				A();
			} catch {}
			A = null;
		}
		if (O) {
			try {
				O.destroy();
			} catch {}
			O = null;
		}
		j = [], m.value = null, h.value = null;
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
function ft() {
	try {
		return t().getAccessToken();
	} catch {
		return null;
	}
}
function pt(e) {
	let t = e.indexOf("?");
	return t === -1 ? [e, ""] : [e.slice(0, t), e.slice(t)];
}
function mt(e, t) {
	let [n, r] = pt(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}${ut}${r}`;
}
function ht(e, t) {
	let [n, r] = pt(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}.m3u8${r}`;
}
async function gt(e, t) {
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
var _t = ["aria-label"], vt = { class: "shortcuts__head" }, yt = { class: "shortcuts__title" }, bt = { class: "shortcuts__grid" }, xt = { class: "shortcuts__keys" }, St = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Ct = {
	key: 1,
	class: "shortcuts__key"
}, wt = { class: "shortcuts__label" }, Tt = /*#__PURE__*/ T(/* @__PURE__ */ W({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => x }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = o(), a = q(null);
		return ne(a, Le(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (K(), B("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= ze((e) => r("close"), ["self"])
		}, [V("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [V("div", vt, [V("h3", yt, Y(X(i)("player.keyboard")), 1), U(D, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), V("ul", bt, [(K(!0), B(F, null, J(e.shortcuts, (e) => (K(), B("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [V("span", xt, [(K(!0), B(F, null, J(e.keys, (e, t) => (K(), B(F, { key: t }, [e === "–" ? (K(), B("span", St, "–")) : (K(), B("kbd", Ct, [X(C)[e] ? (K(), R(E, {
			key: 0,
			name: X(C)[e],
			label: X(y)[e] ?? e
		}, null, 8, ["name", "label"])) : (K(), B(F, { key: 1 }, [H(Y(e), 1)], 64))]))], 64))), 128))]), V("span", wt, Y(e.label), 1)]))), 128))])], 8, _t)])) : z("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Et = { class: "volume" }, Dt = /*#__PURE__*/ T(/* @__PURE__ */ W({
	__name: "VolumeControl",
	setup(e) {
		let t = u(), n = w(), { t: r } = o(), i = L(() => t.muted ? 0 : t.volume), a = L(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function s(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (K(), B("div", Et, [U(D, {
			name: a.value,
			label: X(t).muted ? X(r)("player.unmute") : X(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => X(t).toggleMute()
		}, null, 8, ["name", "label"]), U(O, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), Ot = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
		return (e, t) => (K(), R(k, {
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
}), [["__scopeId", "data-v-4530b308"]]), kt = "auto", At = "original";
function jt(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function Mt(e) {
	return e >= 2160 ? "4K" : jt(e);
}
function Nt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = jt(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: Mt(r.height)
		}));
	}
	return n;
}
function Pt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) jt(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Ft(e, t) {
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
function It(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Lt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && Ft(e, n) >= 0;
}
function Rt(e, t) {
	if (t < 0) return kt;
	let n = e.find((e) => e.index === t);
	return n ? jt(n.height) : kt;
}
// src/components/player/QualityMenu.vue
var zt = /*#__PURE__*/ T(/* @__PURE__ */ W({
	__name: "QualityMenu",
	props: /*@__PURE__*/ je({
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
	emits: /*@__PURE__*/ je(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, i = Re(e, "open"), a = q(null);
		function s() {
			a.value?.toggleMenu();
		}
		let c = n, l = u(), d = w(), { t: f } = o(), p = L(() => Nt(r.levels)), m = L(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = p.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = jt(i.height);
				e.has(a) || n && Pt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: Mt(i.height)
				}));
			}
			return t;
		}), h = L(() => p.value.length >= 2 ? p.value : m.value), g = L(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), _ = L(() => Ft(r.levels, g.value)), v = L(() => g.value && _.value >= 0 ? {
			value: At,
			label: f("player.qualityOriginal", { height: g.value.height })
		} : null), y = L(() => h.value.length >= 2), b = L(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: Mt(r.activeHeight) })), x = L(() => [
			{
				value: kt,
				label: b.value
			},
			...v.value ? [v.value] : [],
			...h.value
		]), S = L(() => r.autoEnabled ? kt : v.value && r.currentLevel === _.value && (l.quality === "original" || d.defaultQuality === "original") ? At : Rt(r.levels, r.currentLevel));
		function C(e) {
			let t = String(e);
			if (t === "auto") {
				l.setQuality(t), d.defaultQuality = t, c("select", "auto");
				return;
			}
			let n = t === "original" ? _.value : Pt(r.levels, t);
			l.setQuality(t), d.defaultQuality = t, n >= 0 ? c("select", n) : c("select", t);
		}
		return t({ toggleMenu: s }), (e, t) => y.value || i.value ? (K(), R(k, {
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
}), [["__scopeId", "data-v-58498bdd"]]), Bt = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
			...M(n.styleConfig),
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
		Z(() => n.controlsRoot, p, { immediate: !0 }), Pe(f);
		let m = null, h = null, g = null;
		function _() {
			if (!m) return [];
			if (i.value === 0) return j(m);
			let e = m.cues;
			if (!e || typeof e.length != "number") return j(m);
			let t = n.video && typeof n.video.currentTime == "number" ? n.video.currentTime : 0;
			return ce(m, A(t, i.value));
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
		function ee() {
			C(), g = setTimeout(() => {
				if (g = null, !m) return;
				ue(n.video, n.language);
				let e = _();
				e.length && (a.value = e);
			}, 0);
		}
		function w() {
			C(), b(), m?.removeEventListener("cuechange", S), h?.removeEventListener("load", S), m = null, h = null;
		}
		function te(e, t) {
			let n = e?.querySelectorAll?.("track");
			if (!n) return null;
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r.track === t) return r;
			}
			return null;
		}
		function T() {
			w(), ue(n.video, n.language);
			let e = N(n.video, n.language);
			if (e) {
				if (m = e, e.addEventListener("cuechange", S), a.value = _(), !a.value.length) {
					let t = te(n.video, e);
					t && t.readyState !== 2 && (h = t, t.addEventListener("load", S));
				}
				ee(), x();
			} else a.value = [];
		}
		return Z(() => [n.video, n.language], T, { immediate: !0 }), Z(i, x), Pe(w), t({ lines: a }), (t, n) => a.value.length ? (K(), B("div", {
			key: 0,
			class: G(["player__captions", { "is-lifted": e.lifted }]),
			style: Ne(c.value)
		}, [(K(!0), B(F, null, J(a.value, (e, t) => (K(), B("p", {
			key: t,
			class: "player__caption-line"
		}, Y(e), 1))), 128))], 6)) : z("", !0);
	}
}), [["__scopeId", "data-v-0c8b04d6"]]), Vt = ["aria-label", "aria-expanded"], Ht = ["aria-label"], Ut = { class: "capmenu__head" }, Wt = { class: "capmenu__title" }, Gt = ["aria-label"], Kt = ["aria-checked", "tabindex"], qt = { class: "capmenu__check" }, Jt = { class: "capmenu__optlabel" }, Yt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Xt = { class: "capmenu__check" }, Zt = { class: "capmenu__optlabel" }, Qt = { class: "capmenu__check" }, $t = { class: "capmenu__optlabel" }, en = { class: "capmenu__title capmenu__title--sub" }, tn = ["aria-label"], nn = [
	"aria-checked",
	"tabindex",
	"onClick"
], rn = { class: "capmenu__check" }, an = { class: "capmenu__optlabel" }, on = { class: "capmenu__field" }, sn = { class: "capmenu__fieldlabel" }, cn = ["aria-label"], ln = ["aria-label"], un = { class: "capmenu__stepvalue" }, dn = ["aria-label"], fn = ["aria-label", "disabled"], pn = { class: "capmenu__field" }, mn = { class: "capmenu__fieldlabel" }, hn = ["aria-label"], gn = ["aria-label"], _n = { class: "capmenu__stepvalue" }, vn = ["aria-label"], yn = ["aria-label", "disabled"], bn = { class: "capmenu__title capmenu__title--sub" }, xn = { class: "capmenu__style" }, Sn = { class: "capmenu__field" }, Cn = { class: "capmenu__fieldlabel" }, wn = { class: "capmenu__field" }, Tn = { class: "capmenu__fieldlabel" }, En = { class: "capmenu__field" }, Dn = { class: "capmenu__fieldlabel" }, On = { class: "capmenu__field" }, kn = { class: "capmenu__fieldlabel" }, An = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
		let n = e, r = t, i = u(), a = w(), { t: s } = o(), c = q(null), l = q(null), f = L(() => i.subtitleLang), p = L(() => n.tracks.some((e) => e.language === f.value)), m = L(() => p.value ? "captions" : "captions-off"), h = L(() => p.value ? n.tracks.findIndex((e) => e.language === f.value) + 1 : 0), g = L(() => n.activeAudio >= 0 ? n.activeAudio : 0);
		function _(e) {
			r("update:open", e);
		}
		function v() {
			_(!1);
		}
		function y(e) {
			i.setSubtitle(e), a.defaultSubtitleLang = e, a.subtitlePreferenceSet = !0;
		}
		function b(e) {
			r("select-audio", e);
		}
		function x() {
			r("add-subtitles"), v();
		}
		function S(e, t, n) {
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
		function C(e) {
			let t = S(e, n.tracks.length + 1, h.value);
			t !== null && y(t === 0 ? null : n.tracks[t - 1].language);
		}
		function ee(e) {
			let t = S(e, n.audioTracks.length, g.value);
			t !== null && b(n.audioTracks[t].index);
		}
		function te(e) {
			a.captionStyle = {
				...a.captionStyle,
				size: e
			};
		}
		function T(e) {
			a.captionStyle = {
				...a.captionStyle,
				textColor: String(e)
			};
		}
		function O(e) {
			a.captionStyle = {
				...a.captionStyle,
				background: e
			};
		}
		function re(e) {
			a.captionStyle = {
				...a.captionStyle,
				edge: e
			};
		}
		function A(e) {
			i.setSubtitleOffset(i.subtitleOffset + e * d);
		}
		function ie(e) {
			i.setAudioOffset(i.audioOffset + e * d);
		}
		function j() {
			i.setSubtitleOffset(0);
		}
		function M() {
			i.setAudioOffset(0);
		}
		function N(e) {
			let t = e === 0 ? 0 : e;
			return t > 0 ? `+${t.toFixed(1)}` : t.toFixed(1);
		}
		ne(l, Le(n, "open"), {
			lockScroll: !1,
			onEscape: () => (v(), !0)
		});
		function se(e) {
			c.value && !c.value.contains(e.target) && v();
		}
		return Z(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", se, !0) : document.removeEventListener("pointerdown", se, !0));
		}, { immediate: !0 }), Pe(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", se, !0);
		}), (t, n) => (K(), B("div", {
			ref_key: "rootEl",
			ref: c,
			class: "capmenu"
		}, [V("button", {
			type: "button",
			class: G(["capmenu__btn", { "is-active": p.value }]),
			"aria-label": p.value ? X(s)("player.captionsOn") : X(s)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => _(!e.open)
		}, [U(E, { name: m.value }, null, 8, ["name"])], 10, Vt), e.open ? (K(), B("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(s)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			V("div", Ut, [V("h3", Wt, Y(X(s)("player.subtitles")), 1), U(D, {
				name: "x",
				label: X(s)("common.close"),
				size: "sm",
				onClick: v
			}, null, 8, ["label"])]),
			V("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(s)("player.subtitleTrack"),
				onKeydown: C
			}, [V("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !p.value,
				tabindex: h.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => y(null)
			}, [V("span", qt, [p.value ? z("", !0) : (K(), R(E, {
				key: 0,
				name: "check"
			}))]), V("span", Jt, Y(X(s)("player.off")), 1)], 8, Kt), (K(!0), B(F, null, J(e.tracks, (e, t) => (K(), B("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": f.value === e.language,
				tabindex: h.value === t + 1 ? 0 : -1,
				onClick: (t) => y(e.language)
			}, [V("span", Xt, [f.value === e.language ? (K(), R(E, {
				key: 0,
				name: "check"
			})) : z("", !0)]), V("span", Zt, Y(e.label), 1)], 8, Yt))), 128))], 40, Gt),
			V("button", {
				type: "button",
				class: "capmenu__add",
				onClick: x
			}, [V("span", Qt, [U(E, { name: "plus" })]), V("span", $t, Y(X(s)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 0 ? (K(), B(F, { key: 0 }, [V("h3", en, Y(X(s)("player.audio")), 1), V("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(s)("player.audioTrack"),
				onKeydown: ee
			}, [(K(!0), B(F, null, J(e.audioTracks, (t) => (K(), B("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: g.value === t.index ? 0 : -1,
				onClick: (e) => b(t.index)
			}, [V("span", rn, [e.activeAudio === t.index ? (K(), R(E, {
				key: 0,
				name: "check"
			})) : z("", !0)]), V("span", an, Y(t.label), 1)], 8, nn))), 128))], 40, tn)], 64)) : z("", !0),
			V("div", on, [V("span", sn, Y(X(s)("player.subtitleDelay")), 1), V("div", {
				class: "capmenu__stepper",
				role: "group",
				"aria-label": X(s)("player.subtitleDelay")
			}, [
				V("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": X(s)("player.delayDecrease"),
					onClick: n[2] ||= (e) => A(-1)
				}, "−", 8, ln),
				V("span", un, Y(X(s)("player.delayValue", { offset: N(X(i).subtitleOffset) })), 1),
				V("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": X(s)("player.delayIncrease"),
					onClick: n[3] ||= (e) => A(1)
				}, "+", 8, dn),
				V("button", {
					type: "button",
					class: "capmenu__stepbtn capmenu__stepreset",
					"aria-label": X(s)("player.delayReset"),
					disabled: X(i).subtitleOffset === 0,
					onClick: n[4] ||= (e) => j()
				}, "↺", 8, fn)
			], 8, cn)]),
			V("div", pn, [V("span", mn, Y(X(s)("player.audioDelay")), 1), V("div", {
				class: "capmenu__stepper",
				role: "group",
				"aria-label": X(s)("player.audioDelay")
			}, [
				V("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": X(s)("player.delayDecrease"),
					onClick: n[5] ||= (e) => ie(-1)
				}, "−", 8, gn),
				V("span", _n, Y(X(s)("player.delayValue", { offset: N(X(i).audioOffset) })), 1),
				V("button", {
					type: "button",
					class: "capmenu__stepbtn",
					"aria-label": X(s)("player.delayIncrease"),
					onClick: n[6] ||= (e) => ie(1)
				}, "+", 8, vn),
				V("button", {
					type: "button",
					class: "capmenu__stepbtn capmenu__stepreset",
					"aria-label": X(s)("player.delayReset"),
					disabled: X(i).audioOffset === 0,
					onClick: n[7] ||= (e) => M()
				}, "↺", 8, yn)
			], 8, hn)]),
			V("h3", bn, Y(X(s)("player.captionStyle")), 1),
			V("div", xn, [
				V("div", Sn, [V("span", Cn, Y(X(s)("player.size")), 1), U(k, {
					"model-value": X(a).captionStyle.size,
					options: X(ae),
					label: X(s)("player.captionSize"),
					"onUpdate:modelValue": te
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				V("div", wn, [V("span", Tn, Y(X(s)("player.color")), 1), U(k, {
					"model-value": X(a).captionStyle.textColor,
					options: X(oe),
					label: X(s)("player.captionColor"),
					"onUpdate:modelValue": T
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				V("div", En, [V("span", Dn, Y(X(s)("player.background")), 1), U(k, {
					"model-value": X(a).captionStyle.background,
					options: X(de),
					label: X(s)("player.captionBackground"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				V("div", On, [V("span", kn, Y(X(s)("player.edge")), 1), U(k, {
					"model-value": X(a).captionStyle.edge,
					options: X(le),
					label: X(s)("player.captionEdge"),
					"onUpdate:modelValue": re
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Ht)) : z("", !0)], 512));
	}
}), [["__scopeId", "data-v-948ac721"]]), jn = { class: "subsearch" }, Mn = { class: "subsearch__langs" }, Nn = { class: "subsearch__legend" }, Pn = { class: "subsearch__chips" }, Fn = { class: "subsearch__actions" }, In = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, Ln = {
	key: 2,
	class: "subsearch__prompt"
}, Rn = {
	key: 3,
	class: "subsearch__list"
}, zn = { class: "subsearch__meta" }, Bn = { class: "subsearch__release" }, Vn = { class: "subsearch__signals" }, Hn = { class: "subsearch__provider" }, Un = ["aria-label"], Wn = {
	key: 2,
	class: "subsearch__stat"
}, Gn = {
	key: 3,
	class: "subsearch__stat"
}, Kn = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
		let i = t, a = r, { t: s } = o(), c = te(), l = [
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
		}), f = q(/* @__PURE__ */ new Set());
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
		let h = q(!1), g = q(!1), _ = q([]), v = q(/* @__PURE__ */ new Set()), y = q(/* @__PURE__ */ new Set());
		function b(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let x = L(() => [..._.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), S = L(() => f.value.size > 0 && !h.value);
		function C() {
			return i.client ?? new n({ baseUrl: i.apiBase ?? "" });
		}
		async function ee() {
			if (S.value) {
				h.value = !0, g.value = !0;
				try {
					_.value = await C().searchSubtitles(i.mediaId, [...f.value]);
				} catch {
					_.value = [], c.error(s("player.subtitleSearchError"));
				} finally {
					h.value = !1;
				}
			}
		}
		function w() {
			a("update:open", !1);
		}
		function T(t) {
			if (t instanceof e) {
				if (t.status === 429) {
					let e = t.body && typeof t.body == "object" ? t.body : {}, n = typeof e.downloadsRemaining == "number" ? e.downloadsRemaining : null, r = typeof e.resetTimeUtc == "string" ? e.resetTimeUtc : null;
					r ? c.warning(s("player.subtitleQuotaReset", { time: D(r) })) : n === null ? c.warning(s("player.subtitleQuota")) : c.warning(s("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (t.status === 404) {
					c.error(s("player.subtitleAddNotFound"));
					return;
				}
			}
			c.error(s("player.subtitleAddError"));
		}
		function D(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function ne(e) {
			let t = b(e);
			if (v.value.has(t) || y.value.has(t)) return;
			let n = new Set(v.value);
			n.add(t), v.value = n;
			try {
				let n = Ye([(await C().downloadSubtitle(i.mediaId, {
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
				T(e);
			} finally {
				let e = new Set(v.value);
				e.delete(t), v.value = e;
			}
		}
		return Z(() => i.open, (e) => {
			e && (p(), _.value = [], g.value = !1, h.value = !1, v.value = /* @__PURE__ */ new Set(), y.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (e, n) => (K(), R(pe, {
			"model-value": t.open,
			title: X(s)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: Q(() => [U(me, {
				variant: "ghost",
				onClick: w
			}, {
				default: Q(() => [H(Y(X(s)("common.close")), 1)]),
				_: 1
			})]),
			default: Q(() => [V("div", jn, [
				V("fieldset", Mn, [V("legend", Nn, Y(X(s)("player.subtitleSearchLanguages")), 1), V("div", Pn, [(K(!0), B(F, null, J(d.value, (e) => (K(), R(he, {
					key: e,
					selected: f.value.has(e),
					size: "md",
					"aria-label": u(e),
					"onUpdate:selected": (t) => m(e)
				}, {
					default: Q(() => [H(Y(u(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				V("div", Fn, [U(me, {
					variant: "solid",
					"left-icon": "search",
					loading: h.value,
					disabled: !S.value,
					onClick: ee
				}, {
					default: Q(() => [H(Y(X(s)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				h.value ? (K(), B("div", In, [U(ge, { label: X(s)("player.subtitleSearching") }, null, 8, ["label"]), V("span", null, Y(X(s)("player.subtitleSearching")), 1)])) : g.value && x.value.length === 0 ? (K(), R(ve, {
					key: 1,
					icon: "captions",
					title: X(s)("player.subtitleSearchEmpty"),
					description: X(s)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : g.value ? (K(), B("ul", Rn, [(K(!0), B(F, null, J(x.value, (e) => (K(), B("li", {
					key: b(e),
					class: "subsearch__item"
				}, [V("div", zn, [V("p", Bn, Y(e.releaseName || e.provider), 1), V("div", Vn, [
					U(_e, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Q(() => [H(Y(u(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (K(), R(_e, {
						key: 0,
						tone: "info",
						size: "sm",
						label: X(s)("player.subtitleHearingImpairedFull")
					}, {
						default: Q(() => [H(Y(X(s)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : z("", !0),
					V("span", Hn, Y(e.provider), 1),
					e.rating > 0 ? (K(), B("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": X(s)("player.subtitleRating", { rating: e.rating })
					}, [U(E, { name: "star" }), H(" " + Y(e.rating), 1)], 8, Un)) : z("", !0),
					e.downloadCount > 0 ? (K(), B("span", Wn, Y(X(s)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : z("", !0),
					e.fps ? (K(), B("span", Gn, Y(X(s)("player.subtitleFps", { fps: e.fps })), 1)) : z("", !0)
				])]), U(me, {
					variant: "outline",
					size: "sm",
					"left-icon": y.value.has(b(e)) ? "check" : "plus",
					loading: v.value.has(b(e)),
					disabled: v.value.has(b(e)) || y.value.has(b(e)),
					"aria-label": X(s)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => ne(e)
				}, {
					default: Q(() => [H(Y(v.value.has(b(e)) ? X(s)("player.subtitleAdding") : X(s)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (K(), B("p", Ln, Y(X(s)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), qn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function $(e, t, n, r, i, a, o) {
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
		r: qn(d / m),
		g: qn(f / m),
		b: qn(p / m)
	};
}
function Jn(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: $(e, t, n, 0, 0, r, n),
		right: $(e, t, n, t - r, 0, t, n),
		center: $(e, t, n, 0, 0, t, n)
	};
}
function Yn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
var Xn = (e) => `${Math.round(e * 1e3) / 10}%`;
function Zn(e, t = 1) {
	return Qn(e, t).map((e) => `radial-gradient(${Xn(e.rx)} ${Xn(e.ry)} at ${Xn(e.cx)} ${Xn(e.cy)}, ${Yn(e.color, e.alpha)}, transparent ${Xn(e.stop)})`).join(", ");
}
function Qn(e, t = 1) {
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
function $n(e, t) {
	e.clearRect(0, 0, 112, 72), e.filter = "blur(3px)";
	for (let n of t) {
		let t = 8 + n.cx * 96, r = 9 + n.cy * 54, i = n.rx * 96, a = n.ry * 54;
		e.save(), e.translate(t, r), e.scale(i, a);
		let o = e.createRadialGradient(0, 0, 0, 0, 0, 1), { r: s, g: c, b: l } = n.color;
		o.addColorStop(0, Yn(n.color, n.alpha)), o.addColorStop(n.stop, `rgba(${s}, ${c}, ${l}, 0)`), e.fillStyle = o, e.fillRect((8 - t) / i, (9 - r) / a, 96 / i, 54 / a), e.restore();
	}
}
function er(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var tr = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
			r.value = er(i);
		}
		let o = L(() => n.enabled && !n.reducedMotion && !r.value), s = L(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = q(null), l = q(null), u = null, d = null, f = !1;
		function p(e) {
			if (f || typeof document > "u") return null;
			try {
				if (!d && (u = document.createElement("canvas"), u.width = 112, u.height = 72, d = u.getContext("2d"), !d)) throw Error("no 2d context");
				$n(d, Qn(e));
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
				let { data: n } = t.getImageData(0, 0, 32, 18), r = Jn(n, 32, 18), i = p(r);
				l.value = i, c.value = i ? null : Zn(r);
			} catch {
				_ = !0, c.value = null, l.value = null;
			}
		}
		function b(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let x = null, S = null, C = null, ee = 0, w = !1;
		function te(e) {
			S = e, x = e.requestVideoFrameCallback(T);
		}
		function T(e) {
			if (!w) return;
			e - ee >= 250 && (ee = e, y());
			let t = n.video;
			b(t) && te(t);
		}
		function E() {
			if (w || !o.value || !n.video) return;
			let e = n.video;
			b(e) ? (w = !0, ee = 0, te(e)) : (y(), _ || (w = !0, C = setInterval(y, 250)));
		}
		function D() {
			w = !1, x != null && S && S.cancelVideoFrameCallback(x), x = null, S = null, C != null && (clearInterval(C), C = null);
		}
		Z(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			D(), e && t && E();
		}, { immediate: !0 }), Fe(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Pe(() => {
			D(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let ne = L(() => {
			let e = { opacity: String(s.value) };
			return l.value ? e.backgroundImage = `url("${l.value}")` : c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: y }), (e, t) => (K(), B("div", {
			class: G(["player__ambient", {
				"is-active": o.value,
				"is-bitmap": o.value && !!l.value
			}]),
			style: Ne(o.value ? ne.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-ba42f7c0"]]), nr = ["aria-label"], rr = { class: "resume__label" }, ir = { class: "resume__time numeric" }, ar = { class: "resume__actions" }, or = /*#__PURE__*/ T(/* @__PURE__ */ W({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = o(), i = L(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (K(), B("div", {
			class: "resume",
			role: "region",
			"aria-label": X(r)("player.resumePlayback")
		}, [V("p", rr, [
			H(Y(i.value[0]), 1),
			V("span", ir, Y(X(h)(e.seconds)), 1),
			H(Y(i.value[1]), 1)
		]), V("div", ar, [V("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [U(E, { name: "play" }), V("span", null, Y(X(r)("player.resume")), 1)]), V("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [U(E, { name: "rewind" }), V("span", null, Y(X(r)("player.startOver")), 1)])])], 8, nr));
	}
}), [["__scopeId", "data-v-271c5209"]]), sr = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], cr = /* @__PURE__ */ new Set([
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
function lr(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function ur(...e) {
	return e.some((e) => cr.has(lr(e)));
}
function dr(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function fr(e) {
	return e?.error?.code === 2;
}
var pr = 3e4;
function mr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && xr.get(t) === "hevc";
}
function hr(e) {
	let t = { forceTranscode: "1" };
	return mr(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function gr(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
function _r(e) {
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
var vr = 2 * Math.PI * 15;
function yr(e, t, n = vr) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var br = /* @__PURE__ */ new Map([
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
]), xr = /* @__PURE__ */ new Map([
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
]), Sr = /* @__PURE__ */ new Set(["h264"]), Cr = /* @__PURE__ */ new Map([
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
function wr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = xr.get(t);
	return n === void 0 ? "transcode" : Sr.has(n) ? "direct" : "probe";
}
function Tr(e) {
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
var Er = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function Dr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return Er.get(t) ?? "video/mp4";
}
function Or(e, t = "video/mp4") {
	let n = br.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function kr(e, t = "video/mp4") {
	if (!e) return !0;
	let n = Or(e, t);
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
async function Ar(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = xr.get(n), i = r === void 0 ? void 0 : Cr.get(r);
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
async function jr(e, t, n = "") {
	if (ur(...e)) return !0;
	let r = e.map((e) => lr(e)).find((e) => sr.includes(e)) ?? "";
	if (!sr.includes(r)) return !1;
	let i = Dr(r), a = wr(n);
	if (a === "transcode" || a === "probe" && !await Ar(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await kr(e.codec, i)) return !0;
	}
	return !1;
}
// src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Mr = ["aria-label"], Nr = ["src"], Pr = { class: "upnext__body" }, Fr = { class: "upnext__eyebrow" }, Ir = { class: "upnext__title" }, Lr = {
	key: 0,
	class: "upnext__cd numeric"
}, Rr = { class: "upnext__actions" }, zr = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Br = ["r"], Vr = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Hr = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
		let { t: n } = o(), { imgSrc: r } = c(), i = e, a = t, s = L(() => i.posterUrl ?? i.media.poster_url ?? null), l = L(() => yr(i.remaining, i.total));
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
			}, null, 8, Nr)) : z("", !0),
			V("div", Pr, [
				V("p", Fr, Y(X(n)("player.upNext")), 1),
				V("h4", Ir, Y(e.media.name), 1),
				e.counting ? (K(), B("p", Lr, Y(e.remaining > 0 ? X(n)("player.startsIn", { count: e.remaining }) : X(n)("player.startingNow")), 1)) : z("", !0),
				V("div", Rr, [V("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [U(E, { name: "play" }), V("span", null, Y(X(n)("player.playNow")), 1)]), V("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, Y(X(n)("player.cancel")), 1)])
			]),
			e.counting ? (K(), B("svg", zr, [V("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Br), V("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": X(vr),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Vr)])) : z("", !0)
		], 8, Mr));
	}
}), [["__scopeId", "data-v-3fc667d0"]]), Ur = {
	class: "transcode",
	role: "alert"
}, Wr = { class: "transcode__card" }, Gr = { class: "transcode__heading" }, Kr = { class: "transcode__body" }, qr = /*#__PURE__*/ T(/* @__PURE__ */ W({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = o();
		return (t, i) => (K(), B("div", Ur, [V("div", Wr, [
			U(E, {
				name: "alert",
				class: "transcode__icon"
			}),
			V("h3", Gr, Y(X(r)("player.transcodeHeading")), 1),
			V("p", Kr, Y(e.title ? X(r)("player.transcodeBodyTitled", { title: e.title }) : X(r)("player.transcodeBodyUntitled")), 1),
			V("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [U(E, { name: "arrow-left" }), V("span", null, Y(X(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Jr = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Yr = { class: "prep__card" }, Xr = { class: "prep__heading" }, Zr = { class: "prep__body" }, Qr = ["aria-valuenow"], $r = /*#__PURE__*/ T(/* @__PURE__ */ W({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = o(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (K(), B("div", Jr, [V("div", Yr, [
			U(E, {
				name: "spinner",
				class: "prep__spinner"
			}),
			V("h3", Xr, Y(X(n)("player.transcodePreparingHeading")), 1),
			V("p", Zr, Y(e.title ? X(n)("player.transcodePreparingTitled", { title: e.title }) : X(n)("player.transcodePreparingUntitled")), 1),
			V("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [V("div", {
				class: "prep__bar-fill",
				style: Ne({ width: r() + "%" })
			}, null, 4)], 8, Qr),
			V("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [U(E, { name: "arrow-left" }), V("span", null, Y(X(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), ei = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
		return (e, t) => (K(), R(I, { name: "skip" }, {
			default: Q(() => [s.value ? (K(), B("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: ze(c, ["stop"])
			}, [V("span", null, Y(s.value.label), 1), U(E, { name: "skip-forward" })])) : z("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), ti = ["aria-label"], ni = ["aria-label", "onClick"], ri = { class: "skip-controls__label" }, ii = 5, ai = 30, oi = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
			let n = a(e.startMs), r = n - ii, i = n + ai;
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
		}, [(K(!0), B(F, null, J(d.value, (e) => (K(), B("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${u(e.type)}`,
			onClick: ze((t) => f(e), ["stop"])
		}, [V("span", ri, Y(u(e.type)), 1), U(E, { name: "skip-forward" })], 8, ni))), 128))], 8, ti)) : z("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), si = ["aria-label", "aria-expanded"], ci = ["aria-label"], li = { class: "chapterlist__head" }, ui = { class: "chapterlist__title" }, di = ["aria-label"], fi = ["onClick"], pi = { class: "chapterlist__index" }, mi = { class: "chapterlist__name" }, hi = { class: "chapterlist__meta" }, gi = { class: "chapterlist__time" }, _i = {
	key: 0,
	class: "chapterlist__duration"
}, vi = {
	key: 1,
	class: "chapterlist__empty"
}, yi = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
		ne(u, Le(n, "open"), {
			lockScroll: !1,
			onEscape: () => (a(), !0)
		});
		function d(e) {
			l.value && !l.value.contains(e.target) && a();
		}
		Z(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", d, !0) : document.removeEventListener("pointerdown", d, !0));
		}), Pe(() => {
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
		}, [U(E, { name: "list" })], 10, si), e.open ? (K(), B("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.chapterList"),
			tabindex: "-1"
		}, [V("div", li, [V("h3", ui, Y(X(i)("player.chapters")), 1), U(D, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), c.value.length > 0 ? (K(), B("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": X(i)("player.chapterList")
		}, [(K(!0), B(F, null, J(c.value, (e) => (K(), B("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [V("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => f(e.chapter)
		}, [
			V("span", pi, Y(e.index), 1),
			V("span", mi, Y(e.label), 1),
			V("span", hi, [V("span", gi, Y(e.startLabel), 1), e.durationLabel ? (K(), B("span", _i, "· " + Y(e.durationLabel), 1)) : z("", !0)])
		], 8, fi)]))), 128))], 8, di)) : (K(), B("p", vi, Y(X(i)("player.noChapters")), 1))], 8, ci)) : z("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), bi = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, xi = { class: "marker-timeline__ticks" }, Si = [
	"title",
	"aria-label",
	"onClick"
], Ci = { class: "marker-timeline__tooltip" }, wi = { class: "marker-timeline__tooltip-label" }, Ti = { class: "marker-timeline__tooltip-time numeric" }, Ei = ["onClick"], Di = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
		}, [l.value ? (K(), B("div", bi, [t[0] ||= V("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [V("polygon", { points: "5,3 19,12 5,21" })], -1), H(" " + Y(u.value), 1)])) : z("", !0), V("div", xi, [(K(!0), B(F, null, J(s.value, (e) => (K(), B("button", {
			key: e.id,
			type: "button",
			class: G(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: Ne({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${X(h)(e.startSec)}`,
			"aria-label": `${e.label} at ${X(h)(e.startSec)}`,
			onClick: ze((t) => d(e), ["stop"])
		}, [V("span", Ci, [
			V("span", wi, Y(e.label), 1),
			V("span", Ti, Y(X(h)(e.startSec)), 1),
			V("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: ze((t) => f(e), ["stop"])
			}, " Find similar ", 8, Ei)
		])], 14, Si))), 128))])], 2)) : z("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Oi = ["aria-label", "aria-expanded"], ki = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, Ai = ["aria-label"], ji = ["aria-selected", "onClick"], Mi = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
		return Pe(() => {
			u();
		}), t({ toggleOpen: h }), (e, t) => (K(), B("div", { class: G(["sleep-timer", { "is-active": c.value }]) }, [V("button", {
			type: "button",
			class: G(["sleep-timer__trigger", { "is-active": c.value }]),
			"aria-label": c.value ? `Sleep timer: ${p(s.value)} remaining` : X(r)("player.sleepTimer"),
			"aria-expanded": m.value,
			"aria-haspopup": "listbox",
			onClick: h
		}, [U(E, { name: "moon" }), c.value ? (K(), B("span", ki, Y(p(s.value)), 1)) : z("", !0)], 10, Oi), U(I, { name: "dropdown" }, {
			default: Q(() => [m.value ? (K(), B("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": X(r)("player.sleepTimer")
			}, [(K(), B(F, null, J(i, (e) => V("li", {
				key: e.value,
				class: G(["sleep-timer__option", { "is-selected": a.value === e.value }]),
				role: "option",
				"aria-selected": a.value === e.value,
				onClick: (t) => g(e.value)
			}, Y(e.label), 11, ji)), 64))], 8, Ai)) : z("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Ni = {
	key: 0,
	class: "syncplay-overlay"
}, Pi = { class: "syncplay-overlay__badge" }, Fi = { class: "syncplay-overlay__label" }, Ii = { class: "syncplay-overlay__status-label" }, Li = { class: "syncplay-overlay__members" }, Ri = { class: "syncplay-overlay__member-count" }, zi = { class: "syncplay-overlay__member-list" }, Bi = { class: "syncplay-overlay__member-name" }, Vi = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Hi = /*#__PURE__*/ T(/* @__PURE__ */ W({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let t = e, { t: n } = o(), r = ye(), a = i(), s = L(() => t.apiBase ?? a.value), c = L(() => r.currentRoom?.name ?? "SyncPlay"), l = L(() => r.onlineMembers.length), u = L(() => r.syncStatus), d = L(() => {
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
		return (e, t) => X(r).isInRoom ? (K(), B("div", Ni, [
			V("div", Pi, [U(E, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), V("span", Fi, "SyncPlay: " + Y(c.value), 1)]),
			V("div", { class: G(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [U(E, {
				name: f.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), V("span", Ii, Y(d.value), 1)], 2),
			V("div", Li, [V("span", Ri, [U(E, { name: "user" }), H(" " + Y(X(n)("syncplay.members", { count: l.value })), 1)]), V("ul", zi, [(K(!0), B(F, null, J(X(r).onlineMembers.slice(0, 5), (e) => (K(), B("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= V("span", { class: "syncplay-overlay__member-dot" }, null, -1), V("span", Bi, Y(e.name), 1)]))), 128)), X(r).onlineMembers.length > 5 ? (K(), B("li", Vi, " +" + Y(X(r).onlineMembers.length - 5) + " more ", 1)) : z("", !0)])]),
			U(me, {
				variant: "ghost",
				size: "sm",
				onClick: p
			}, {
				default: Q(() => [H(Y(X(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : z("", !0);
	}
}), [["__scopeId", "data-v-2dfa4284"]]), Ui = {
	key: 0,
	class: "syncplay-controls"
}, Wi = ["aria-label"], Gi = { class: "syncplay-controls__wait-label" }, Ki = { class: "syncplay-controls__transport" }, qi = ["aria-label"], Ji = ["aria-label"], Yi = ["aria-label"], Xi = { class: "syncplay-controls__status-label" }, Zi = 10, Qi = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
		let n = e, a = t, { t: s } = o(), c = ye(), l = te(), u = Ae("phlixConfig", null), d = i(), f = L(() => n.apiBase ?? d.value);
		be((e) => {
			l.error(r(e, u?.locale, s("syncplay.commandRejected")));
		}), Ie(() => be(null));
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
			await v(Math.max(0, n.position - Zi));
		}
		async function b() {
			await v(Math.min(n.duration, n.position + Zi));
		}
		return Z(() => c.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => X(c).isInRoom ? (K(), B("div", Ui, [
			m.value ? (K(), B("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": X(s)("syncplay.waitingForMembers")
			}, [U(E, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), V("span", Gi, Y(X(s)("syncplay.waitingForMembers")), 1)], 8, Wi)) : z("", !0),
			V("div", Ki, [
				V("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(s)("syncplay.rewind"),
					onClick: y
				}, [U(E, { name: "rewind" })], 8, qi),
				V("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? X(s)("syncplay.pauseAll") : X(s)("syncplay.playAll"),
					onClick: _
				}, [U(E, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Ji),
				V("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(s)("syncplay.fastForward"),
					onClick: b
				}, [U(E, { name: "forward" })], 8, Yi)
			]),
			V("div", { class: G(["syncplay-controls__status", `syncplay-controls__status--${X(c).syncStatus}`]) }, [U(E, {
				name: X(c).syncStatus === "synced" ? "check" : X(c).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), V("span", Xi, Y(X(c).syncStatus === "synced" ? X(s)("syncplay.synced") : X(c).syncStatus === "outOfSync" ? X(s)("syncplay.outOfSync") : X(s)("syncplay.reSyncing")), 1)], 2)
		])) : z("", !0);
	}
}), [["__scopeId", "data-v-276195ff"]]);
// src/utils/subtitleSrc.ts
function $i(e, t) {
	return String(s(e, t));
}
function ea(e, t) {
	let n = !1, r = t.map((t) => {
		let r = $i(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
// src/components/Player.vue?vue&type=script&setup=true&lang.ts
var ta = { class: "player__stage" }, na = ["src", "poster"], ra = [
	"src",
	"srclang",
	"label"
], ia = {
	key: 0,
	class: "player__buffering"
}, aa = {
	class: "player__buffering-text",
	"aria-hidden": "true"
}, oa = { class: "player__meta" }, sa = ["aria-label"], ca = { class: "player__meta-text" }, la = { class: "player__eyebrow" }, ua = { class: "player__title" }, da = { class: "player__sub numeric" }, fa = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, pa = {
	key: 1,
	class: "player__center"
}, ma = ["aria-label"], ha = ["aria-label"], ga = ["aria-label"], _a = { class: "player__btnrow" }, va = ["aria-label"], ya = ["aria-label"], ba = ["aria-label"], xa = { class: "player__time numeric" }, Sa = ["aria-label", "aria-pressed"], Ca = ["title"], wa = ["aria-label"], Ta = ["aria-label"], Ea = ["aria-label", "aria-pressed"], Da = ["aria-label", "aria-pressed"], Oa = ["aria-label"], ka = { class: "similar-modal" }, Aa = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, ja = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, Ma = { class: "similar-modal__state-title" }, Na = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, Pa = {
	key: 3,
	class: "similar-modal__results"
}, Fa = { class: "similar-modal__poster" }, Ia = ["src", "alt"], La = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Ra = { class: "similar-modal__result-body" }, za = { class: "similar-modal__result-title" }, Ba = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Va = { key: 0 }, Ha = /*#__PURE__*/ T(/* @__PURE__ */ W({
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
		let { imgSrc: r } = c(), a = e, s = t, l = u(), d = w(), { t: g } = o(), _ = ye(), v = f(), y = L(() => v.isFavorite(a.media.id)), x = L(() => v.likeLevel(a.media.id));
		function C() {
			v.toggleFavorite(a.media.id, ke());
		}
		function ee(e) {
			v.setLike(a.media.id, e, ke());
		}
		let T = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], D = q(null), ne = q(null), O = q(null), k = q(!0), A = q(!1), j = q(!1), ae = q(!1), M = q(!1), N = q(!1), oe = q(!1), ce = q(!1), le = q(!1), ue = q(null), de = q(null), me = q(!1), he = te(), _e = q(!1);
		function ve(e) {
			he.success(g("syncplay.joinedRoom", { name: e.name }));
		}
		let be = L(() => N.value ? 1.35 : 1), P = q(ur(a.streamUrl, a.media.path)), Se = L(() => Tr(a.media.streams)), Ce = 0;
		async function we() {
			let e = ++Ce;
			if (P.value) return;
			let t = await jr([a.streamUrl, a.media.path], a.playbackAudioTracks ?? [], Se.value);
			e === Ce && t && !P.value && (P.value = !0, He(D.value?.currentTime ?? 0));
		}
		Z([() => a.playbackAudioTracks, Se], () => {
			we();
		}, { immediate: !0 });
		let Te = Ae("phlixConfig", null), Ee = i(), De = Ae("resumeReporter", null), Oe = !1;
		function ke() {
			return Ee.value;
		}
		let I = dt({
			apiBase: () => a.apiBase ?? "",
			hlsConfig: Te?.playerHlsConfig
		}), W = S({ apiBase: () => a.apiBase ?? "" }), je = null;
		function Ne(e) {
			je !== null && clearTimeout(je), je = setTimeout(() => {
				je = null, W.fetch(e);
			}, 0);
		}
		let Ie = L(() => a.thumbnailAt ?? W.thumbnailAt), Le = L(() => P.value ? void 0 : a.streamUrl), Re = L(() => P.value && I.state.value !== "ready"), Be = L(() => P.value && (I.state.value === "preparing" || I.state.value === "idle")), Ve = L(() => P.value && I.state.value === "error");
		function He(e = 0) {
			let t = D.value, n = navigator.connection?.downlinkMax, r = rt(n);
			t && I.start(t, a.media.id, r, e);
		}
		function Ue(e) {
			l.quality === "original" && e !== "auto" ? I.loadVariantPlaylist(At) : typeof e == "string" && e !== "auto" ? I.loadVariantPlaylist(e) : I.setLevel(e);
		}
		let We = !1;
		function Ge() {
			d.defaultQuality = kt;
		}
		function Ke() {
			let e = I.levels.value;
			if (e.length === 0) return !1;
			let t = d.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = I.variants.value;
				if (!t || t.length === 0) return !1;
				if (Lt(e, t)) I.loadVariantPlaylist(At);
				else {
					let t = It(e);
					t >= 0 && I.setNextLevel(t), Ge();
				}
				return !0;
			}
			let n = Pt(e, t);
			return n >= 0 ? I.setNextLevel(n) : Ge(), !0;
		}
		Z(() => I.levels.value, (e) => {
			We || e.length === 0 || Ke() && (We = !0);
		}), Z(() => I.variants.value, (e) => {
			!We && e?.length && Me(() => {
				We || Ke() && (We = !0);
			});
		}, { deep: !0 });
		let qe = q(l.resumePositionFor(a.media.id) ?? 0), Je = q(!P.value && qe.value > 0), Ye = null, Xe = q(!1), Ze = q(8), Qe, $e = q(null), et = q(0), tt = q(!1), nt = q([]), it = q(!1), at = q(null);
		function ot(e, t) {
			$e.value = e, et.value = t, nt.value = [], at.value = null, tt.value = !0, ft(e, t);
		}
		let st = null, ct = null, lt = null;
		function ut() {
			let e = a.apiBase ?? "";
			return (ct === null || lt !== e) && (ct = new n({ baseUrl: e }), lt = e), ct;
		}
		async function ft(e, t) {
			st?.abort(), st = new AbortController(), it.value = !0, at.value = null;
			try {
				let n = await ut().searchByMarker(e, t, 30, 20, st.signal);
				nt.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				at.value = "Couldn’t load similar titles. Please try again.", nt.value = [];
			} finally {
				it.value = !1;
			}
		}
		function pt() {
			st?.abort(), tt.value = !1, nt.value = [], at.value = null, $e.value = null;
		}
		let mt = L(() => l.upNext);
		function ht() {
			P.value = ur(a.streamUrl, a.media.path), we(), qe.value = l.resumePositionFor(a.media.id) ?? 0, Je.value = !P.value && qe.value > 0, Ye = null, bn = !1, cn = !1, an.value = [], rn.value = !1, ln = !1, Yt.value = -1, hn = null, We = !1, Oe = !1, Vt(), Et = !1, Nt = 0, Mt = 0, yt(), Xe.value = !1, I.reset(), D.value && (D.value.currentTime = 0), P.value && He(), Ne(a.media.id);
		}
		function gt(e) {
			let t = D.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ye = Math.max(0, e));
		}
		function _t() {
			gt(qe.value), Je.value = !1, D.value?.play()?.catch(() => {});
		}
		function vt() {
			Ye = null, gt(0), l.clearResume(a.media.id), Je.value = !1, D.value?.play()?.catch(() => {});
		}
		function yt() {
			Qe &&= (clearInterval(Qe), void 0);
		}
		function bt() {
			Ze.value = 8, yt(), Qe = setInterval(() => {
				--Ze.value, Ze.value <= 0 && (yt(), St());
			}, 1e3);
		}
		function xt() {
			Oe || (Oe = !0, De?.finish()), ir(), k.value = !0, l.upNext && (Xe.value = !0, d.autoplay && bt());
		}
		function St() {
			yt(), Xe.value = !1;
			let e = l.next(a.streamUrlFor);
			e && s("play-next", e);
		}
		function Ct() {
			yt(), Xe.value = !1;
		}
		function wt() {
			if (P.value) return;
			let e = D.value, t = fr(e) && (e?.currentTime ?? 0) === 0;
			(dr(e) || t) && (Ft(), Vt(), P.value = !0, He(e?.currentTime ?? 0));
		}
		let Et = !1, jt = null, Mt = 0, Nt = 0;
		function Ft() {
			if (Et) return;
			Et = !0;
			let e = a.media?.id;
			e != null && e !== "" && ut().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, hr({ videoCodec: Se.value })).catch(() => {});
		}
		function Rt() {
			if (jt !== null || Et || P.value) return;
			let e = D.value;
			e && (Mt = Date.now(), Nt = e.currentTime, jt = setTimeout(() => {
				jt = null;
				let e = D.value;
				e && !P.value && gr(Date.now(), Mt, e.currentTime, Nt) && (Ft(), P.value = !0, He(e.currentTime));
			}, pr));
		}
		function Vt() {
			jt !== null && (clearTimeout(jt), jt = null);
		}
		let Ht = q([]), Ut = q([]), Wt = q(-1), Gt = q(!1), Kt = L(() => I.state.value === "ready" && I.audioTracks.value.length > 0), qt = L(() => I.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Jt = L(() => (a.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Yt = q(-1), Xt = L(() => !Kt.value && !P.value && Ut.value.length === 0 && Jt.value.length > 1), Zt = L(() => Ut.value.length > 0 ? !1 : I.state.value === "ready" ? !Kt.value && I.hasAudio.value : !P.value && !Xt.value && Jt.value.length === 1), Qt = L(() => Kt.value ? qt.value : Xt.value ? Jt.value : Ut.value.length > 0 ? Ut.value : Zt.value ? [{
			index: 0,
			language: "",
			label: g("player.audioOriginal"),
			kind: "audio"
		}] : Ut.value), $t = L(() => {
			if (Kt.value) return I.currentAudioTrack.value;
			if (Xt.value) {
				if (Yt.value >= 0) return Yt.value;
				let e = (a.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : a.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Ut.value.length === 0 && Zt.value ? 0 : Wt.value;
		}), en = q(!1), tn = l.subtitleLang, nn = L(() => {
			let e = a.apiBase ?? "", t = P.value ? I.subtitleTracks.value : ea(e, a.playbackSubtitleTracks ?? []);
			if (an.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = ea(e, an.value), i = new Set(t.map(n)), o = r.filter((e) => !i.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), rn = q(!1), an = q([]), on = L(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(d.defaultSubtitleLang), t(d.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function sn(e) {
			an.value.some((t) => t.url === e.url) || (an.value = [...an.value, e]);
		}
		let cn = !1, ln = !1;
		function un() {
			if (cn) return;
			if (d.subtitlePreferenceSet) {
				cn = !0;
				return;
			}
			let e = nn.value.find((e) => e.default);
			if (!e) return;
			let t = Ht.value.find((t) => t.language === (e.language || e.label));
			t && (l.setSubtitle(t.language), tn = t.language, cn = !0);
		}
		function dn() {
			if (ln) return;
			let e = d.defaultAudioLang;
			if (!e) return;
			let t = Qt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = $t.value;
			r >= 0 && r < t.length || (gn(n), ln = !0);
		}
		let fn = L(() => Ht.value.some((e) => e.language === l.subtitleLang));
		function pn() {
			let e = D.value;
			Ht.value = ie(e), Ut.value = fe(e), Wt.value = re(e), un(), dn();
		}
		function mn() {
			if (fn.value) tn = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = tn && Ht.value.some((e) => e.language === tn) ? tn : Ht.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			s("captions");
		}
		let hn = null;
		function gn(e) {
			if (!Zt.value) {
				if (Kt.value) I.setAudioTrack(e);
				else if (Xt.value) {
					if (e === $t.value) return;
					Yt.value = e, hn = e, P.value = !0, He(D.value?.currentTime ?? 0);
				} else se(D.value, e), Wt.value = e;
			}
		}
		Z(Kt, (e) => {
			if (!e || hn === null) return;
			let t = hn;
			hn = null, t >= 0 && t < I.audioTracks.value.length && I.setAudioTrack(t);
		}), Z(nn, () => {
			Me(() => pn());
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
			if (!a.autoplay || bn || Je.value || Re.value) return;
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
		function Dn() {
			if ($ !== null && (clearInterval($), $ = null), Jn) {
				Jn = !1;
				let e = D.value;
				e && Math.abs(e.volume - l.volume) > .001 && (e.volume = l.volume);
			}
			l.play(), l.setMediaPositionState(), Rt();
		}
		function On() {
			l.pause(), l.setMediaPositionState(), A.value = !1;
		}
		function kn() {
			A.value = !0, ir(), k.value = !0;
		}
		function jn() {
			A.value = !1, sr();
		}
		function Mn() {
			let e = D.value;
			e && (jt !== null && e.currentTime > Nt && Vt(), l.updateProgress(e.currentTime, e.duration, En(e)), _.isInRoom && _.updateLocalPosition(e.currentTime));
		}
		function Nn() {
			let e = D.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, Ye !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ye) : Ye, Ye = null), l.updateProgress(e.currentTime, e.duration, En(e)), l.setMediaPositionState(), pn());
		}
		function Pn() {
			let e = D.value;
			e && l.updateProgress(e.currentTime, e.duration, En(e));
		}
		function Fn() {
			let e = D.value;
			e && (!Jn && Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function In() {
			let e = D.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate), l.setMediaPositionState();
		}
		function Ln() {
			l.setMediaPositionState();
		}
		function Rn() {
			l.setMediaPositionState();
		}
		function zn(e) {
			let t = D.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function Bn(e) {
			zn(l.position + e);
		}
		function Vn() {
			ae.value = !0, sr();
		}
		function Hn() {
			ae.value = !1, sr();
		}
		function Un(e) {
			let t = T.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(T[e] - l.rate) ? n : e, 0), n = T[Math.min(T.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function Wn() {
			if (!a.markers) return;
			let e = l.position, t = a.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && zn(t.startMs / 1e3);
		}
		function Gn() {
			if (!a.markers) return;
			let e = l.position, t = a.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && zn(t.startMs / 1e3);
		}
		function qn() {
			ue.value?.toggleOpen();
		}
		let $ = null, Jn = !1;
		function Yn() {
			let e = D.value;
			if (!e) {
				l.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), l.pause();
				return;
			}
			$ !== null && (clearInterval($), $ = null), Jn = !0;
			let t = .05;
			$ = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval($), $ = null, e.volume = 0, e.pause(), l.pause());
			}, 50);
		}
		m({
			playPause: Tn,
			seekBy: Bn,
			frameStep: (e) => {
				l.playing || zn(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: Xn,
			toggleFullscreen: Qn,
			toggleCaptions: mn,
			toggleTheater: Zn,
			togglePip: er,
			skipIntro: Wn,
			skipOutro: Gn,
			sleepTimer: qn,
			seekToPercent: (e) => zn(e * l.duration),
			speedStep: Un,
			toggleHelp: () => {
				M.value = !M.value;
			},
			toggleQuality: () => {
				P.value ? (me.value = !me.value, de.value?.toggleMenu?.()) : he.show({
					message: g("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !M.value && !Gt.value && !en.value && !_e.value && !rn.value && !tt.value });
		function Xn() {
			l.toggleMute();
		}
		function Zn() {
			N.value = !N.value, s("theater", N.value);
		}
		Z(() => l.muted, (e) => {
			let t = D.value;
			t && t.muted !== e && (t.muted = e);
		}), Z(() => l.volume, (e) => {
			let t = D.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Z(() => l.rate, (e) => {
			let t = D.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Z(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? gt(e.value) : e.type === "seekBy" && gt(l.position + e.value));
		});
		function Qn() {
			if (typeof document > "u") return;
			if (!le.value) {
				Zn();
				return;
			}
			let e = ne.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function $n() {
			j.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function er() {
			let e = D.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function nr() {
			oe.value = !0;
		}
		function rr() {
			oe.value = !1;
		}
		function ir() {
			vn &&= (clearTimeout(vn), void 0);
		}
		function ar() {
			ir(), !l.playing || ae.value || A.value || (vn = setTimeout(() => {
				l.playing && !ae.value && !A.value && (k.value = !1);
			}, a.idleTimeout ?? 3e3));
		}
		function sr() {
			k.value = !0, ar();
		}
		let cr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", lr = "data-phlix-prev-tabindex", mr = "__phlix_no_tabindex__";
		function _r(e) {
			let t = ne.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(cr) ? [n] : Array.from(n.querySelectorAll(cr));
				for (let n of t) if (e) {
					let e = n.getAttribute(lr);
					e === null || e === mr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(lr);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(lr, n.getAttribute("tabindex") ?? mr), n.setAttribute("tabindex", "-1"));
			}
		}
		Z(k, (e) => {
			typeof document < "u" && (_r(e), !e && document.activeElement instanceof HTMLElement && ne.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), Z(() => l.playing, (e) => {
			e ? (Je.value = !1, Ct(), ar()) : (ir(), A.value = !1, k.value = !0);
		});
		let vr = null;
		Fe(() => {
			l.setCurrent(a.media, {
				resetPosition: !1,
				streamUrl: a.streamUrl
			}), v.hydrate(a.media), typeof document < "u" && (document.addEventListener("fullscreenchange", $n), ce.value = document.pictureInPictureEnabled === !0, le.value = document.fullscreenEnabled === !0), vr = l.bindMediaSession({
				onPlay: () => void D.value?.play()?.catch(() => {}),
				onPause: () => D.value?.pause(),
				onSeek: (e) => zn(e),
				onNext: () => St(),
				onPrevious: () => Cn()
			}), _n = D.value?.textTracks ?? null, _n?.addEventListener?.("addtrack", pn), _n?.addEventListener?.("removetrack", pn), pn(), P.value && He(), Ne(a.media.id);
		}), Z(() => a.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: a.streamUrl
			}), ht();
		}), Z(() => a.media?.id, () => {
			v.hydrate(a.media);
		}), Z(() => _.currentSession, (e) => {
			e && (e.state === "playing" ? (D.value?.play()?.catch(() => {}), l.play()) : e.state === "paused" && (D.value?.pause(), l.pause()), _.updateLocalPosition(l.position), Math.abs(_.driftAmount) > 2 && gt(e.playbackPosition));
		});
		let yr = null;
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
				}), D.value?.play()?.catch(() => {}), l.play(), _.consumePendingPlayMedia(), yr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			yr !== n && (yr = n, s("pending-media", e.mediaId, e.title));
		}), Pe(() => {
			De?.reportFinal?.(), ir(), yt(), I.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", $n), vr?.(), _n?.removeEventListener?.("addtrack", pn), _n?.removeEventListener?.("removetrack", pn), $ !== null && (clearInterval($), $ = null), je !== null && (clearTimeout(je), je = null), Vt();
		}), (t, n) => (K(), B("div", {
			ref_key: "containerRef",
			ref: ne,
			class: G(["player", {
				"is-chrome-hidden": !k.value,
				"is-theater": N.value
			}]),
			"data-player-surface": "",
			onPointermove: sr,
			onPointerdown: sr,
			onFocusin: sr
		}, [U(tr, {
			video: D.value,
			enabled: X(d).atmosphere,
			playing: X(l).playing,
			"reduced-motion": X(d).effectiveReducedMotion,
			intensity: be.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), V("div", ta, [
			V("video", {
				ref_key: "videoRef",
				ref: D,
				class: "player__video",
				src: Le.value,
				poster: X(r)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Dn,
				onPause: On,
				onTimeupdate: Mn,
				onLoadedmetadata: Nn,
				onCanplay: Sn,
				onWaiting: kn,
				onStalled: kn,
				onPlaying: jn,
				onProgress: Pn,
				onVolumechange: Fn,
				onRatechange: In,
				onSeeked: Ln,
				onDurationchange: Rn,
				onEnded: xt,
				onError: wt,
				onEnterpictureinpicture: nr,
				onLeavepictureinpicture: rr,
				onClick: Tn
			}, [(K(!0), B(F, null, J(nn.value, (e) => (K(), B("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, ra))), 128))], 40, na),
			n[22] ||= V("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[23] ||= V("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			A.value ? (K(), B("div", ia, [U(ge, {
				size: 38,
				label: X(g)("player.buffering")
			}, null, 8, ["label"]), V("span", aa, Y(X(g)("player.buffering")), 1)])) : z("", !0),
			V("div", oa, [V("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": X(g)("player.back"),
				onClick: n[0] ||= ze((e) => s("back"), ["stop"])
			}, [U(E, { name: "arrow-left" })], 8, sa), V("div", ca, [
				V("p", la, Y(X(g)("player.nowPlaying")), 1),
				V("h2", ua, Y(e.media.name), 1),
				V("div", da, [(K(!0), B(F, null, J(yn.value, (e, t) => (K(), B(F, { key: t }, [t > 0 && !e.cert ? (K(), B("span", fa, "·")) : z("", !0), V("span", { class: G({ player__cert: e.cert }) }, Y(e.text), 3)], 64))), 128))])
			])]),
			Re.value ? z("", !0) : (K(), B("div", pa, [
				k.value ? (K(), B("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(g)("player.seekBackward"),
					onClick: n[1] ||= ze((e) => Bn(-10), ["stop"])
				}, [U(E, { name: "rewind" }), V("span", { class: "player__center-skip-count" }, Y(10))], 8, ma)) : z("", !0),
				V("button", {
					type: "button",
					class: G(["player__bigplay", { "is-playing": X(l).playing }]),
					"aria-label": X(l).playing ? X(g)("player.pause") : X(g)("player.play"),
					onClick: ze(Tn, ["stop"])
				}, [U(E, { name: X(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, ha),
				k.value ? (K(), B("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(g)("player.seekForward"),
					onClick: n[2] ||= ze((e) => Bn(10), ["stop"])
				}, [U(E, { name: "forward" }), V("span", { class: "player__center-skip-count" }, Y(10))], 8, ga)) : z("", !0)
			])),
			U(Bt, {
				video: D.value,
				language: X(l).subtitleLang,
				"style-config": X(d).captionStyle,
				lifted: k.value,
				"controls-root": O.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Re.value ? z("", !0) : (K(), B("div", {
				key: 2,
				ref_key: "controlsRef",
				ref: O,
				class: "player__controls",
				onClick: n[9] ||= ze(() => {}, ["stop"])
			}, [
				U(b, {
					position: X(l).position,
					duration: X(l).duration,
					buffered: X(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": Ie.value,
					onSeek: zn,
					onScrubStart: Vn,
					onScrubEnd: Hn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				X(d).showMarkerTimeline && e.markers && e.markers.length > 0 ? (K(), R(Di, {
					key: 0,
					position: X(l).position,
					duration: X(l).duration,
					markers: e.markers,
					onSeek: zn,
					onSimilar: ot
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : z("", !0),
				V("div", _a, [
					e.prevEpisode ? (K(), B("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(g)("player.previousEpisode"),
						onClick: Cn
					}, [U(E, { name: "skip-back" })], 8, va)) : z("", !0),
					V("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": X(l).playing ? X(g)("player.pause") : X(g)("player.play"),
						onClick: Tn
					}, [U(E, { name: X(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, ya),
					e.nextEpisode ? (K(), B("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(g)("player.nextEpisode"),
						onClick: wn
					}, [U(E, { name: "skip-forward" })], 8, ba)) : z("", !0),
					V("span", xa, [
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
					}, [U(E, { name: y.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Sa),
					U(p, {
						level: x.value,
						onCycle: ee
					}, null, 8, ["level"]),
					U(Dt),
					U(Ot),
					U(zt, {
						ref_key: "qualityMenuRef",
						ref: de,
						open: me.value,
						"onUpdate:open": n[3] ||= (e) => me.value = e,
						levels: X(I).levels.value,
						variants: X(I).variants.value,
						"current-level": X(I).currentLevel.value,
						"auto-enabled": X(I).autoEnabled.value,
						"active-height": X(I).activeLevelHeight.value,
						onSelect: Ue
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
					}, Y(X(g)("player.directStream")), 9, Ca)),
					U(An, {
						open: Gt.value,
						"onUpdate:open": n[4] ||= (e) => Gt.value = e,
						tracks: Ht.value,
						"audio-tracks": Qt.value,
						"active-audio": $t.value,
						onSelectAudio: gn,
						onAddSubtitles: n[5] ||= (e) => rn.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					U(yi, {
						open: en.value,
						"onUpdate:open": n[6] ||= (e) => en.value = e,
						chapters: e.chapters ?? [],
						onSeek: zn
					}, null, 8, ["open", "chapters"]),
					U(Mi, {
						ref_key: "sleepTimerRef",
						ref: ue,
						"on-expire": Yn
					}, null, 512),
					V("button", {
						type: "button",
						class: G(["player__iconbtn player__syncplay", { "is-on": X(_).isInRoom }]),
						"aria-label": X(_).isInRoom ? X(g)("syncplay.inRoom") : X(g)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: n[7] ||= (e) => _e.value = !0
					}, [U(E, { name: "user" })], 10, wa),
					V("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(g)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: n[8] ||= (e) => M.value = !0
					}, [U(E, { name: "info" })], 8, Ta),
					ce.value ? (K(), B("button", {
						key: 3,
						type: "button",
						class: G(["player__iconbtn", { "is-on": oe.value }]),
						"aria-label": oe.value ? X(g)("player.exitPip") : X(g)("player.pip"),
						"aria-pressed": oe.value,
						onClick: er
					}, [U(E, { name: "pip" })], 10, Ea)) : z("", !0),
					V("button", {
						type: "button",
						class: G(["player__iconbtn", { "is-on": N.value }]),
						"aria-label": N.value ? X(g)("player.exitTheater") : X(g)("player.theater"),
						"aria-pressed": N.value,
						onClick: Zn
					}, [U(E, { name: "theater" })], 10, Da),
					le.value ? (K(), B("button", {
						key: 4,
						type: "button",
						class: "player__iconbtn",
						"aria-label": j.value ? X(g)("player.exitFullscreen") : X(g)("player.fullscreen"),
						onClick: Qn
					}, [U(E, { name: j.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Oa)) : z("", !0)
				])
			], 512)),
			Re.value ? z("", !0) : (K(), R(ei, {
				key: 3,
				position: X(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: zn
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Re.value ? z("", !0) : (K(), R(oi, {
				key: 4,
				position: X(l).position,
				markers: e.markers,
				onSkip: zn
			}, null, 8, ["position", "markers"])),
			Je.value && !Re.value ? (K(), R(or, {
				key: 5,
				seconds: qe.value,
				onResume: _t,
				onRestart: vt
			}, null, 8, ["seconds"])) : z("", !0),
			Xe.value && mt.value && !Re.value ? (K(), R(Hr, {
				key: 6,
				media: mt.value,
				remaining: Ze.value,
				total: X(8),
				counting: X(d).autoplay,
				onPlayNow: St,
				onCancel: Ct
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : z("", !0),
			U(pe, {
				modelValue: tt.value,
				"onUpdate:modelValue": n[10] ||= (e) => tt.value = e,
				title: `Similar ${$e.value ?? "marker"}s`,
				size: "lg",
				onClose: pt
			}, {
				default: Q(() => [V("div", ka, [it.value ? (K(), B("div", Aa, [U(ge, { label: "Finding similar media" })])) : at.value ? (K(), B("div", ja, [U(E, {
					name: "error",
					class: "similar-modal__state-icon"
				}), V("p", Ma, Y(at.value), 1)])) : !it.value && nt.value.length === 0 ? (K(), B("div", Na, [
					U(E, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					n[20] ||= V("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					n[21] ||= V("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (K(), B("ul", Pa, [(K(!0), B(F, null, J(nt.value, (e) => (K(), B("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [V("div", Fa, [e.poster_url ? (K(), B("img", {
					key: 0,
					src: X(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Ia)) : (K(), B("div", La, [U(E, { name: "film" })]))]), V("div", Ra, [V("p", za, Y(e.name), 1), e.year ? (K(), B("p", Ba, [H(Y(e.year) + " ", 1), e.runtime ? (K(), B("span", Va, " · " + Y(e.runtime) + "m", 1)) : z("", !0)])) : z("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Be.value ? (K(), R($r, {
				key: 7,
				title: e.media.name,
				progress: X(I).progress.value,
				onBack: n[11] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : z("", !0),
			Ve.value ? (K(), R(qr, {
				key: 8,
				title: e.media.name,
				onBack: n[12] ||= (e) => s("back")
			}, null, 8, ["title"])) : z("", !0),
			X(_).isInRoom ? (K(), R(Qi, {
				key: 9,
				position: X(l).position,
				duration: X(l).duration,
				"is-playing": X(l).playing,
				onSeek: zn,
				onPlay: n[13] ||= (e) => void D.value?.play()?.catch(() => {}),
				onPause: n[14] ||= (e) => void D.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : z("", !0),
			X(_).isInRoom ? (K(), R(Hi, { key: 10 })) : z("", !0),
			U(xe, {
				modelValue: _e.value,
				"onUpdate:modelValue": n[15] ||= (e) => _e.value = e,
				onJoined: ve
			}, null, 8, ["modelValue"]),
			U(Tt, {
				open: M.value,
				onClose: n[16] ||= (e) => M.value = !1
			}, null, 8, ["open"]),
			U(Kn, {
				open: rn.value,
				"onUpdate:open": n[17] ||= (e) => rn.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": on.value,
				onAdded: sn
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-767f23d0"]]), Ua = "blur(3px) saturate(1.35)";
async function Wa(e, t = document, n = 16 / 9) {
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
		"filter" in c && (c.filter = Ua), c.drawImage(r, (64 - u) / 2 - 4, (o - d) / 2 - 4, u + 8, d + 8), "filter" in c && (c.filter = "none"), c.globalCompositeOperation = "destination-in", c.save(), c.translate(32, o / 2), c.scale(32 * Math.SQRT2, o / 2 * Math.SQRT2);
		let f = c.createRadialGradient(0, 0, 0, 0, 0, 1);
		return f.addColorStop(0, "rgba(0, 0, 0, 1)"), f.addColorStop(.75, "rgba(0, 0, 0, 0)"), c.fillStyle = f, c.fillRect(-1, -1, 2, 2), c.restore(), c.globalCompositeOperation = "source-over", s.toDataURL("image/png");
	} catch {
		return null;
	}
}
// src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var Ga = { class: "player-page__stage" }, Ka = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, qa = { class: "player-page__blocking-error" }, Ja = /*#__PURE__*/ T(/* @__PURE__ */ W({
	__name: "PlayerPage",
	setup(t) {
		let r = /* @__PURE__ */ new Map(), s = i(), { imgSrc: d } = c(), p = a(), m = Ve(), h = He(), { t: _ } = o(), y = Ae("phlixConfig", null), b = u(), x = f(), S = g(), C = q(null), w = q(""), te = q([]), T = q(null), E = q(null), D = q([]), ne = q([]), O = q(!0), k = q(null), re = q(!1), A = q(null), ie = q(!1), j = q(null), ae = q(null), M = L(() => String(m.params.id ?? ""));
		Ee(() => C.value?.name);
		let N = L(() => d(C.value?.poster_url) || ""), oe = q(null);
		Z(N, (e) => {
			if (oe.value = null, !e) return;
			let t = typeof window < "u" && window.innerHeight > 0 ? window.innerWidth / window.innerHeight : 16 / 9;
			Wa(e, document, t).then((t) => {
				N.value === e && (oe.value = t);
			});
		}, { immediate: !0 });
		let se = L(() => {
			let e = oe.value ?? N.value;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), ce = null, le = !1, ue = 0;
		function de(e) {
			return le || e.generation !== ue;
		}
		function fe(e) {
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
		function _e(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function ye(e, t, n) {
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
		async function be(e, t, n) {
			let r = l(s.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function xe(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function F(e, t) {
			j.value = Ce(e, t), ae.value = we(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && b.setQueue(r);
		}
		function I(e) {
			for (let t of r.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function W(e, t, n) {
			if (j.value = null, ae.value = null, !_e(t)) return;
			let i = I(t.id);
			if (i) {
				F(i, t.id);
				return;
			}
			let a = () => de(n);
			try {
				let i = await xe(e, t, n.controller?.signal);
				if (a()) return;
				let o = await be(e, i.id, n.controller?.signal);
				if (a()) return;
				if (Se(o)) {
					let t = o.filter((e) => e.type === "season"), r = await Promise.all(t.map((t) => be(e, t.id, n.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...r.flat()];
				}
				let s = P(o);
				s.length && r.set(i.id, s), F(s, t.id);
			} catch (e) {
				if (a() || fe(e)) return;
				j.value = null, ae.value = null;
			}
		}
		async function je() {
			let t = M.value;
			ce?.abort(), ce = typeof AbortController < "u" ? new AbortController() : null, ue += 1;
			let r = {
				generation: ue,
				controller: ce
			};
			if (O.value = !0, k.value = null, te.value = [], T.value = null, E.value = null, D.value = [], ne.value = [], j.value = null, ae.value = null, b.hideMiniPlayer(), !t) {
				k.value = _("common.missingMediaId"), O.value = !1;
				return;
			}
			let i = new n({ baseUrl: s.value });
			i.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, r.controller?.signal).then((e) => {
				de(r) || (te.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), T.value = ge(e?.intro_marker), E.value = ge(e?.outro_marker), D.value = _r(e?.audio_tracks), ne.value = Ye(e?.subtitle_tracks));
			}).catch(() => null);
			let a = De(t), o = Date.now();
			if (a && Oe(a, o)) {
				Me(i, a.item, r);
				return;
			}
			let c;
			try {
				c = (await i.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, r.controller?.signal)).item;
			} catch (t) {
				if (de(r) || fe(t)) return;
				if (t instanceof e && (t.status === 403 || t.status === 429)) {
					let e = ee(t.body, y?.locale);
					if (e !== null) {
						A.value = e, ie.value = !0, O.value = !1;
						return;
					}
				}
				if (a) {
					Me(i, a.item, r);
					return;
				}
				k.value = v(t, y?.locale), O.value = !1;
				return;
			}
			if (!de(r)) {
				if (c) ke(t, c, o), Me(i, c, r);
				else {
					if (a) {
						Me(i, a.item, r);
						return;
					}
					k.value = "Couldn’t load media item", O.value = !1;
				}
			}
		}
		async function Me(e, t, n) {
			C.value = t, x.hydrate(t), w.value = he(t), O.value = !1, _e(t) && (await W(e, t, n), de(n) || ae.value) || ye(e, t, n);
		}
		Fe(je), Z(M, je), Be(() => {
			b.current && b.streamUrl && b.showMiniPlayer();
		}), Pe(() => {
			le = !0, ce?.abort(), ce = null, S.reset();
		});
		function Ie() {
			h?.back();
		}
		function J(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Le(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Re(e) {
			re.value = e, S.setTheaterActive(e);
		}
		function ze() {
			ie.value = !1, Ie();
		}
		return (e, t) => (K(), B("div", { class: G(["player-page", { "is-theater": re.value }]) }, [
			se.value && !O.value && !k.value ? (K(), B("div", {
				key: 0,
				class: G(["player-page__ambient", { "is-preblurred": oe.value }]),
				style: Ne(se.value),
				"aria-hidden": "true"
			}, null, 6)) : z("", !0),
			V("div", Ga, [O.value ? (K(), B("div", Ka, [U(Te, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : k.value ? (K(), R(ve, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: k.value
			}, {
				actions: Q(() => [U(me, {
					variant: "solid",
					onClick: je
				}, {
					default: Q(() => [...t[1] ||= [H("Retry", -1)]]),
					_: 1
				}), U(me, {
					variant: "ghost",
					onClick: Ie
				}, {
					default: Q(() => [...t[2] ||= [H("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : C.value ? (K(), R(Ha, {
				key: 2,
				media: C.value,
				"stream-url": w.value,
				"stream-url-for": he,
				"api-base": X(s),
				chapters: te.value,
				"intro-marker": T.value,
				"outro-marker": E.value,
				"playback-audio-tracks": D.value,
				"playback-subtitle-tracks": ne.value,
				"prev-episode": j.value,
				"next-episode": ae.value,
				autoplay: !0,
				onBack: Ie,
				onPlayNext: J,
				onPlayEpisode: Le,
				onTheater: Re
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
			U(pe, {
				modelValue: ie.value,
				"onUpdate:modelValue": t[0] ||= (e) => ie.value = e,
				title: "Can’t start playback",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Q(() => [U(me, {
					variant: "solid",
					onClick: ze
				}, {
					default: Q(() => [...t[3] ||= [H("OK", -1)]]),
					_: 1
				})]),
				default: Q(() => [V("p", qa, Y(A.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-3ae2a661"]]);
export { Ja as default };

//# sourceMappingURL=PlayerPage-D14B8P3b.js.map