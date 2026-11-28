import { S as e, o as t, t as n, y as r } from "./client-Bmlfq3Uy.js";
import { n as i, r as a } from "./useApiBase-DXTBY90j.js";
import { t as o } from "./useMessages-BGVJcrvU.js";
import { r as s, t as c } from "./useImageSrc-CSM61b-l.js";
import { n as l } from "./media-query-D7hrCu8r.js";
import { i as u } from "./usePlayerStore-C-yoD3Ut.js";
import { n as d, t as f } from "./ThumbRating-BMpV52OI.js";
import { a as p, c as m, d as h, f as g, l as _, n as v, o as y, r as b, s as ee, t as x, u as te } from "./shortcuts-C2RHlytb.js";
import { a as S } from "./usePreferencesStore-CQ3hN8jz.js";
import { t as ne } from "./useToastStore-CxO_ppM8.js";
import { n as C, t as w } from "./Icon-55iG1rR7.js";
import { t as T } from "./IconButton-DsjtwjU1.js";
import { n as E } from "./useFocusTrap-DStfPnC8.js";
import { t as re } from "./Slider-Bj5BaBUu.js";
import { t as D } from "./Select-BJFwKzUB.js";
import { a as O, c as k, d as A, f as ie, i as ae, l as oe, n as j, o as se, r as M, s as ce, t as le, u as ue } from "./captions-DV5mDPeu.js";
import { t as de } from "./Modal-D4vQLxSG.js";
import { t as fe } from "./Button-DTiNkl61.js";
import { t as pe } from "./Chip-BE4O7mqB.js";
import { t as me } from "./Spinner-DUnGSjxC.js";
import { t as he } from "./Badge-D7vacFbh.js";
import { t as ge } from "./EmptyState-DjfWh3kt.js";
import { n as _e, r as ve, t as ye } from "./SyncPlayModal-Dn1_IfXN.js";
import { n as be, o as xe, r as Se, t as N } from "./episode-order-DBEVgrOE.js";
import { t as Ce } from "./Skeleton-DDhrDRE7.js";
import { i as we } from "./usePageTitle-j6j9gAmo.js";
import { n as Te, r as Ee, t as De } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as P, Transition as Oe, computed as F, createBlock as I, createCommentVNode as L, createElementBlock as R, createElementVNode as z, createTextVNode as B, createVNode as V, defineComponent as H, inject as ke, mergeModels as Ae, nextTick as je, normalizeClass as U, normalizeStyle as W, onBeforeUnmount as Me, onMounted as Ne, onScopeDispose as Pe, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as Y, unref as X, useModel as Fe, watch as Z, withCtx as Q, withModifiers as Ie } from "vue";
import { onBeforeRouteLeave as Le, useRoute as Re, useRouter as ze } from "vue-router";
// src/components/player/transcode.ts
var Be = /* @__PURE__ */ new Set([
	"pending",
	"queued",
	"running",
	"completed",
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Ve(e, t) {
	return typeof e == "string" && Be.has(e) ? e : t;
}
var He = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Ue(e, t = "") {
	return typeof e == "string" ? e : t;
}
function We(e) {
	return e === !0 || e === "true" || e === 1;
}
function Ge(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Ke(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Ue(e.url ?? e.src);
		r !== "" && t.push({
			index: Ge(e.index),
			language: Ue(e.language ?? e.lang ?? e.srclang),
			label: Ue(e.label),
			default: We(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function qe(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Ge(e.height);
		if (r <= 0) continue;
		let i = e.playlist_url ?? e.playlistUrl;
		t.push({
			id: Ue(e.id),
			label: Ue(e.label),
			height: r,
			width: Ge(e.width),
			bitrate: Ge(e.bitrate),
			...typeof e.url == "string" && e.url !== "" ? { url: e.url } : {},
			...typeof i == "string" && i !== "" ? { playlistUrl: i } : {}
		});
	}
	return t.length > 0 ? t : null;
}
function Je(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var Ye = .7, Xe = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], Ze = 1e7, Qe = "mobile-low";
function $e(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * Ye;
}
function et(e) {
	let t = $e(e);
	if (t === void 0 || t >= Ze) return;
	let n = Qe;
	for (let [e, r] of Xe) r <= t && (n = e);
	return n;
}
function tt(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function nt(e) {
	let t = e ?? {};
	return {
		jobId: Ue(t.job_id ?? t.jobId),
		masterUrl: Ue(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Ve(t.status, "running"),
		reused: We(t.reused),
		subtitles: Ke(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: qe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function rt(e) {
	let t = e ?? {};
	return {
		jobId: Ue(t.job_id ?? t.jobId),
		status: Ve(t.status, "running"),
		playlistReady: We(t.playlist_ready ?? t.playlistReady),
		progress: Ge(t.progress),
		masterUrl: Ue(t.master_url ?? t.masterUrl),
		subtitles: Ke(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: qe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function it(e) {
	return e.playlistReady || e.status === "completed";
}
function at(e) {
	return He.has(e);
}
function ot(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
// src/composables/useHlsTranscode.ts
var st = "_master.m3u8";
function ct(e) {
	let t = K("idle"), r = K(0), i = K([]), a = K([]), o = K(-1), s = K(!0), c = K(null), l = K(null), d = K([]), f = K(-1), p = K(!1), m = K(null), h = K(null);
	function _(e) {
		if (!D) return;
		a.value = D.levels, o.value = D.getCurrentLevel(), s.value = D.autoLevelEnabled;
		let t = e ?? D.getCurrentLevel(), n = t >= 0 ? a.value.find((e) => e.index === t) : void 0;
		c.value = n ? n.height : null;
	}
	function v() {
		a.value = [], o.value = -1, s.value = !0, c.value = null, l.value = null;
	}
	function y(e) {
		D && (d.value = D.audioTracks, f.value = e ?? D.getCurrentAudioTrack());
	}
	function b() {
		D && (p.value = D.hasAudio());
	}
	function ee() {
		d.value = [], f.value = -1, p.value = !1;
	}
	function x(t) {
		if (!t || t.length === 0) return;
		let n = e.apiBase(), r = t.map((e) => ({
			...e,
			...e.url ? { url: ot(n, e.url) } : {},
			...e.playlistUrl ? { playlistUrl: ot(n, e.playlistUrl) } : {}
		}));
		ae = r, l.value = r;
	}
	function te(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		i.value = t.map((e) => ({
			...e,
			url: ot(n, e.url)
		}));
	}
	let S = e.attach ?? g, ne = e.pollIntervalMs ?? 1e3, C = e.maxWaitMs ?? 12e4, w = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), T = Math.max(1, Math.ceil(C / Math.max(1, ne))), E = e.getToken ?? lt, re = e.probeRungPlaylist ?? ((e) => pt(e, E)), D = null, O = null, k = null, A = null, ie = !1, ae = [], oe = 0, j = null, se = 0;
	function M() {
		return e.client ?? new n({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function ce(n, a, o, s) {
		pe(), ie = !1;
		let c = ++se, l = () => ie || c !== se;
		j = new AbortController(), t.value = "preparing", r.value = 0, i.value = [], v();
		try {
			let i = M(), c = nt(await i.post(Je(a, o), void 0, j.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			te(c.subtitles), x(c.variants), m.value = c.jobId, h.value = ot(e.apiBase(), c.masterUrl);
			let d = c.status === "completed";
			for (let e = 0; !d && e < T; e++) {
				let e = rt(await i.get(tt(c.jobId), void 0, j.signal));
				if (l()) return;
				if (r.value = e.progress, te(e.subtitles), x(e.variants), at(e.status)) throw Error(`transcode ${e.status}`);
				if (it(e)) {
					d = !0;
					break;
				}
				if (await w(ne), l()) return;
			}
			if (!d) throw Error("transcode timed out");
			let f = await S(n, h.value, {
				getToken: E,
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
			D = f, O = D.onLevelSwitched((e) => _(e)), k = D.onAudioTrackSwitched((e) => y(e)), A = D.onLevelLoaded(() => {
				y(), b();
			}), _(), y(), b();
			try {
				let e = u();
				e.hlsMasterUrl = h.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function le(e) {
		D && (D.setCurrentLevel(e === "auto" ? -1 : e), _());
	}
	function ue(e) {
		D && (D.setNextLevel(e === "auto" ? -1 : e), _());
	}
	function de(e) {
		D && (D.setAudioTrack(e), y());
	}
	function fe(e) {
		if (!D || !h.value) return;
		let t = ae.find((t) => t.id === e), n = t?.playlistUrl ?? dt(h.value, e), r = t?.url ?? ft(h.value, e), i = ++oe;
		(async () => {
			let e;
			try {
				e = await re(n);
			} catch {
				e = "unknown";
			}
			!ie && i === oe && D && (e === "absent" ? (console.warn(`[phlix-ui] rung mini-master unavailable (${n}) — this server has no per-rung index files; falling back to the legacy bare rung playlist (${r}). Multi-audio titles play silent on the video-only bare rung and the audio menu stays hidden (never a stale rendition list); muxed-audio titles play correctly. The menu returns once the server ships the index.`), D.loadSource(r)) : D.loadSource(n), v());
		})();
	}
	function pe() {
		if (ie = !0, oe++, j &&= (j.abort(), null), O) {
			try {
				O();
			} catch {}
			O = null;
		}
		if (k) {
			try {
				k();
			} catch {}
			k = null;
		}
		if (A) {
			try {
				A();
			} catch {}
			A = null;
		}
		if (D) {
			try {
				D.destroy();
			} catch {}
			D = null;
		}
		ae = [], m.value = null, h.value = null;
	}
	function me() {
		pe(), t.value = "idle", r.value = 0, i.value = [], v(), ee();
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
		setLevel: le,
		setNextLevel: ue,
		setAudioTrack: de,
		jobId: m,
		masterUrl: h,
		loadVariantPlaylist: fe,
		start: ce,
		cleanup: pe,
		reset: me
	};
}
function lt() {
	try {
		return t().getAccessToken();
	} catch {
		return null;
	}
}
function ut(e) {
	let t = e.indexOf("?");
	return t === -1 ? [e, ""] : [e.slice(0, t), e.slice(t)];
}
function dt(e, t) {
	let [n, r] = ut(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}${st}${r}`;
}
function ft(e, t) {
	let [n, r] = ut(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}.m3u8${r}`;
}
async function pt(e, t) {
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
var mt = ["aria-label"], ht = { class: "shortcuts__head" }, gt = { class: "shortcuts__title" }, _t = { class: "shortcuts__grid" }, vt = { class: "shortcuts__keys" }, yt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, bt = {
	key: 1,
	class: "shortcuts__key"
}, xt = { class: "shortcuts__label" }, St = /*#__PURE__*/ C(/* @__PURE__ */ H({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => b }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = o(), a = K(null);
		return E(a, Y(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (G(), R("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Ie((e) => r("close"), ["self"])
		}, [z("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [z("div", ht, [z("h3", gt, J(X(i)("player.keyboard")), 1), V(T, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), z("ul", _t, [(G(!0), R(P, null, q(e.shortcuts, (e) => (G(), R("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [z("span", vt, [(G(!0), R(P, null, q(e.keys, (e, t) => (G(), R(P, { key: t }, [e === "–" ? (G(), R("span", yt, "–")) : (G(), R("kbd", bt, [X(x)[e] ? (G(), I(w, {
			key: 0,
			name: X(x)[e],
			label: X(v)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), R(P, { key: 1 }, [B(J(e), 1)], 64))]))], 64))), 128))]), z("span", xt, J(e.label), 1)]))), 128))])], 8, mt)])) : L("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Ct = { class: "volume" }, wt = /*#__PURE__*/ C(/* @__PURE__ */ H({
	__name: "VolumeControl",
	setup(e) {
		let t = u(), n = S(), { t: r } = o(), i = F(() => t.muted ? 0 : t.volume), a = F(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function s(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (G(), R("div", Ct, [V(T, {
			name: a.value,
			label: X(t).muted ? X(r)("player.unmute") : X(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => X(t).toggleMute()
		}, null, 8, ["name", "label"]), V(re, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), Tt = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		], n = u(), { t: r } = o(), i = F(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), I(D, {
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
}), [["__scopeId", "data-v-4530b308"]]), Et = "auto", Dt = "original";
function Ot(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function kt(e) {
	return e >= 2160 ? "4K" : Ot(e);
}
function At(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Ot(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: kt(r.height)
		}));
	}
	return n;
}
function jt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Ot(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Mt(e, t) {
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
function Nt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Pt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && Mt(e, n) >= 0;
}
function Ft(e, t) {
	if (t < 0) return Et;
	let n = e.find((e) => e.index === t);
	return n ? Ot(n.height) : Et;
}
// src/components/player/QualityMenu.vue
var It = /*#__PURE__*/ C(/* @__PURE__ */ H({
	__name: "QualityMenu",
	props: /*@__PURE__*/ Ae({
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
	emits: /*@__PURE__*/ Ae(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, i = Fe(e, "open"), a = K(null);
		function s() {
			a.value?.toggleMenu();
		}
		let c = n, l = u(), d = S(), { t: f } = o(), p = F(() => At(r.levels)), m = F(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = p.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = Ot(i.height);
				e.has(a) || n && jt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: kt(i.height)
				}));
			}
			return t;
		}), h = F(() => p.value.length >= 2 ? p.value : m.value), g = F(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), _ = F(() => Mt(r.levels, g.value)), v = F(() => g.value && _.value >= 0 ? {
			value: Dt,
			label: f("player.qualityOriginal", { height: g.value.height })
		} : null), y = F(() => h.value.length >= 2), b = F(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: kt(r.activeHeight) })), ee = F(() => [
			{
				value: Et,
				label: b.value
			},
			...v.value ? [v.value] : [],
			...h.value
		]), x = F(() => r.autoEnabled ? Et : v.value && r.currentLevel === _.value && (l.quality === "original" || d.defaultQuality === "original") ? Dt : Ft(r.levels, r.currentLevel));
		function te(e) {
			let t = String(e);
			if (t === "auto") {
				l.setQuality(t), d.defaultQuality = t, c("select", "auto");
				return;
			}
			let n = t === "original" ? _.value : jt(r.levels, t);
			l.setQuality(t), d.defaultQuality = t, n >= 0 ? c("select", n) : c("select", t);
		}
		return t({ toggleMenu: s }), (e, t) => y.value || i.value ? (G(), I(D, {
			key: 0,
			ref_key: "selectRef",
			ref: a,
			class: "quality-menu",
			tone: "glass",
			"model-value": x.value,
			options: ee.value,
			label: X(f)("player.quality"),
			open: i.value,
			"onUpdate:open": t[0] ||= (e) => i.value = e,
			"onUpdate:modelValue": te
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), Lt = /*#__PURE__*/ C(/* @__PURE__ */ H({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = K(0), a = F(() => n.lifted ? i.value : 0), o = F(() => ({
			...k(n.styleConfig),
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
		Z(() => n.controlsRoot, u, { immediate: !0 }), Me(l);
		let d = null, f = null, p = null;
		function m() {
			r.value = A(d);
		}
		function h() {
			p != null && (clearTimeout(p), p = null);
		}
		function g() {
			h(), p = setTimeout(() => {
				if (p = null, !d) return;
				ce(n.video, n.language);
				let e = A(d);
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
			_(), ce(n.video, n.language);
			let e = ie(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = A(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return Z(() => [n.video, n.language], y, { immediate: !0 }), Me(_), t({ lines: r }), (t, n) => r.value.length ? (G(), R("div", {
			key: 0,
			class: U(["player__captions", { "is-lifted": e.lifted }]),
			style: W(o.value)
		}, [(G(!0), R(P, null, q(r.value, (e, t) => (G(), R("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : L("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), Rt = ["aria-label", "aria-expanded"], zt = ["aria-label"], Bt = { class: "capmenu__head" }, Vt = { class: "capmenu__title" }, Ht = ["aria-label"], Ut = ["aria-checked", "tabindex"], Wt = { class: "capmenu__check" }, Gt = { class: "capmenu__optlabel" }, Kt = [
	"aria-checked",
	"tabindex",
	"onClick"
], qt = { class: "capmenu__check" }, Jt = { class: "capmenu__optlabel" }, Yt = { class: "capmenu__check" }, Xt = { class: "capmenu__optlabel" }, Zt = { class: "capmenu__title capmenu__title--sub" }, Qt = ["aria-label"], $t = [
	"aria-checked",
	"tabindex",
	"onClick"
], en = { class: "capmenu__check" }, tn = { class: "capmenu__optlabel" }, nn = { class: "capmenu__title capmenu__title--sub" }, rn = { class: "capmenu__style" }, an = { class: "capmenu__field" }, on = { class: "capmenu__fieldlabel" }, sn = { class: "capmenu__field" }, cn = { class: "capmenu__fieldlabel" }, ln = { class: "capmenu__field" }, un = { class: "capmenu__fieldlabel" }, dn = { class: "capmenu__field" }, fn = { class: "capmenu__fieldlabel" }, pn = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		let n = e, r = t, i = u(), a = S(), { t: s } = o(), c = K(null), l = K(null), d = F(() => i.subtitleLang), f = F(() => n.tracks.some((e) => e.language === d.value)), p = F(() => f.value ? "captions" : "captions-off"), m = F(() => f.value ? n.tracks.findIndex((e) => e.language === d.value) + 1 : 0), h = F(() => n.activeAudio >= 0 ? n.activeAudio : 0);
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
		function x(e) {
			let t = ee(e, n.tracks.length + 1, m.value);
			t !== null && v(t === 0 ? null : n.tracks[t - 1].language);
		}
		function te(e) {
			let t = ee(e, n.audioTracks.length, h.value);
			t !== null && y(n.audioTracks[t].index);
		}
		function ne(e) {
			a.captionStyle = {
				...a.captionStyle,
				size: e
			};
		}
		function C(e) {
			a.captionStyle = {
				...a.captionStyle,
				textColor: String(e)
			};
		}
		function re(e) {
			a.captionStyle = {
				...a.captionStyle,
				background: e
			};
		}
		function O(e) {
			a.captionStyle = {
				...a.captionStyle,
				edge: e
			};
		}
		E(l, Y(n, "open"), {
			lockScroll: !1,
			onEscape: () => (_(), !0)
		});
		function k(e) {
			c.value && !c.value.contains(e.target) && _();
		}
		return Z(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", k, !0) : document.removeEventListener("pointerdown", k, !0));
		}, { immediate: !0 }), Me(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", k, !0);
		}), (t, n) => (G(), R("div", {
			ref_key: "rootEl",
			ref: c,
			class: "capmenu"
		}, [z("button", {
			type: "button",
			class: U(["capmenu__btn", { "is-active": f.value }]),
			"aria-label": f.value ? X(s)("player.captionsOn") : X(s)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => g(!e.open)
		}, [V(w, { name: p.value }, null, 8, ["name"])], 10, Rt), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(s)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			z("div", Bt, [z("h3", Vt, J(X(s)("player.subtitles")), 1), V(T, {
				name: "x",
				label: X(s)("common.close"),
				size: "sm",
				onClick: _
			}, null, 8, ["label"])]),
			z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(s)("player.subtitleTrack"),
				onKeydown: x
			}, [z("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !f.value,
				tabindex: m.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => v(null)
			}, [z("span", Wt, [f.value ? L("", !0) : (G(), I(w, {
				key: 0,
				name: "check"
			}))]), z("span", Gt, J(X(s)("player.off")), 1)], 8, Ut), (G(!0), R(P, null, q(e.tracks, (e, t) => (G(), R("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": d.value === e.language,
				tabindex: m.value === t + 1 ? 0 : -1,
				onClick: (t) => v(e.language)
			}, [z("span", qt, [d.value === e.language ? (G(), I(w, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", Jt, J(e.label), 1)], 8, Kt))), 128))], 40, Ht),
			z("button", {
				type: "button",
				class: "capmenu__add",
				onClick: b
			}, [z("span", Yt, [V(w, { name: "plus" })]), z("span", Xt, J(X(s)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 0 ? (G(), R(P, { key: 0 }, [z("h3", Zt, J(X(s)("player.audio")), 1), z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(s)("player.audioTrack"),
				onKeydown: te
			}, [(G(!0), R(P, null, q(e.audioTracks, (t) => (G(), R("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: h.value === t.index ? 0 : -1,
				onClick: (e) => y(t.index)
			}, [z("span", en, [e.activeAudio === t.index ? (G(), I(w, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", tn, J(t.label), 1)], 8, $t))), 128))], 40, Qt)], 64)) : L("", !0),
			z("h3", nn, J(X(s)("player.captionStyle")), 1),
			z("div", rn, [
				z("div", an, [z("span", on, J(X(s)("player.size")), 1), V(D, {
					"model-value": X(a).captionStyle.size,
					options: X(ae),
					label: X(s)("player.captionSize"),
					"onUpdate:modelValue": ne
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", sn, [z("span", cn, J(X(s)("player.color")), 1), V(D, {
					"model-value": X(a).captionStyle.textColor,
					options: X(j),
					label: X(s)("player.captionColor"),
					"onUpdate:modelValue": C
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", ln, [z("span", un, J(X(s)("player.background")), 1), V(D, {
					"model-value": X(a).captionStyle.background,
					options: X(le),
					label: X(s)("player.captionBackground"),
					"onUpdate:modelValue": re
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", dn, [z("span", fn, J(X(s)("player.edge")), 1), V(D, {
					"model-value": X(a).captionStyle.edge,
					options: X(M),
					label: X(s)("player.captionEdge"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, zt)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-12f05479"]]), mn = { class: "subsearch" }, hn = { class: "subsearch__langs" }, gn = { class: "subsearch__legend" }, _n = { class: "subsearch__chips" }, vn = { class: "subsearch__actions" }, yn = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, bn = {
	key: 2,
	class: "subsearch__prompt"
}, xn = {
	key: 3,
	class: "subsearch__list"
}, Sn = { class: "subsearch__meta" }, Cn = { class: "subsearch__release" }, wn = { class: "subsearch__signals" }, Tn = { class: "subsearch__provider" }, En = ["aria-label"], Dn = {
	key: 2,
	class: "subsearch__stat"
}, On = {
	key: 3,
	class: "subsearch__stat"
}, kn = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		let i = t, a = r, { t: s } = o(), c = ne(), l = [
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
		let d = F(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...i.preferredLangs, ...l]) {
				let r = (n || "").toLowerCase();
				r && !e.has(r) && (e.add(r), t.push(r));
			}
			return t;
		}), f = K(/* @__PURE__ */ new Set());
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
		let h = K(!1), g = K(!1), _ = K([]), v = K(/* @__PURE__ */ new Set()), y = K(/* @__PURE__ */ new Set());
		function b(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let ee = F(() => [..._.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), x = F(() => f.value.size > 0 && !h.value);
		function te() {
			return i.client ?? new n({ baseUrl: i.apiBase ?? "" });
		}
		async function S() {
			if (x.value) {
				h.value = !0, g.value = !0;
				try {
					_.value = await te().searchSubtitles(i.mediaId, [...f.value]);
				} catch {
					_.value = [], c.error(s("player.subtitleSearchError"));
				} finally {
					h.value = !1;
				}
			}
		}
		function C() {
			a("update:open", !1);
		}
		function T(t) {
			if (t instanceof e) {
				if (t.status === 429) {
					let e = t.body && typeof t.body == "object" ? t.body : {}, n = typeof e.downloadsRemaining == "number" ? e.downloadsRemaining : null, r = typeof e.resetTimeUtc == "string" ? e.resetTimeUtc : null;
					r ? c.warning(s("player.subtitleQuotaReset", { time: E(r) })) : n === null ? c.warning(s("player.subtitleQuota")) : c.warning(s("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (t.status === 404) {
					c.error(s("player.subtitleAddNotFound"));
					return;
				}
			}
			c.error(s("player.subtitleAddError"));
		}
		function E(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function re(e) {
			let t = b(e);
			if (v.value.has(t) || y.value.has(t)) return;
			let n = new Set(v.value);
			n.add(t), v.value = n;
			try {
				let n = Ke([(await te().downloadSubtitle(i.mediaId, {
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
		}, { immediate: !0 }), (e, n) => (G(), I(de, {
			"model-value": t.open,
			title: X(s)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: Q(() => [V(fe, {
				variant: "ghost",
				onClick: C
			}, {
				default: Q(() => [B(J(X(s)("common.close")), 1)]),
				_: 1
			})]),
			default: Q(() => [z("div", mn, [
				z("fieldset", hn, [z("legend", gn, J(X(s)("player.subtitleSearchLanguages")), 1), z("div", _n, [(G(!0), R(P, null, q(d.value, (e) => (G(), I(pe, {
					key: e,
					selected: f.value.has(e),
					size: "md",
					"aria-label": u(e),
					"onUpdate:selected": (t) => m(e)
				}, {
					default: Q(() => [B(J(u(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				z("div", vn, [V(fe, {
					variant: "solid",
					"left-icon": "search",
					loading: h.value,
					disabled: !x.value,
					onClick: S
				}, {
					default: Q(() => [B(J(X(s)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				h.value ? (G(), R("div", yn, [V(me, { label: X(s)("player.subtitleSearching") }, null, 8, ["label"]), z("span", null, J(X(s)("player.subtitleSearching")), 1)])) : g.value && ee.value.length === 0 ? (G(), I(ge, {
					key: 1,
					icon: "captions",
					title: X(s)("player.subtitleSearchEmpty"),
					description: X(s)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : g.value ? (G(), R("ul", xn, [(G(!0), R(P, null, q(ee.value, (e) => (G(), R("li", {
					key: b(e),
					class: "subsearch__item"
				}, [z("div", Sn, [z("p", Cn, J(e.releaseName || e.provider), 1), z("div", wn, [
					V(he, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Q(() => [B(J(u(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (G(), I(he, {
						key: 0,
						tone: "info",
						size: "sm",
						label: X(s)("player.subtitleHearingImpairedFull")
					}, {
						default: Q(() => [B(J(X(s)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : L("", !0),
					z("span", Tn, J(e.provider), 1),
					e.rating > 0 ? (G(), R("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": X(s)("player.subtitleRating", { rating: e.rating })
					}, [V(w, { name: "star" }), B(" " + J(e.rating), 1)], 8, En)) : L("", !0),
					e.downloadCount > 0 ? (G(), R("span", Dn, J(X(s)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : L("", !0),
					e.fps ? (G(), R("span", On, J(X(s)("player.subtitleFps", { fps: e.fps })), 1)) : L("", !0)
				])]), V(fe, {
					variant: "outline",
					size: "sm",
					"left-icon": y.value.has(b(e)) ? "check" : "plus",
					loading: v.value.has(b(e)),
					disabled: v.value.has(b(e)) || y.value.has(b(e)),
					"aria-label": X(s)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => re(e)
				}, {
					default: Q(() => [B(J(v.value.has(b(e)) ? X(s)("player.subtitleAdding") : X(s)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (G(), R("p", bn, J(X(s)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), An = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function jn(e, t, n, r, i, a, o) {
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
		r: An(d / m),
		g: An(f / m),
		b: An(p / m)
	};
}
function Mn(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: jn(e, t, n, 0, 0, r, n),
		right: jn(e, t, n, t - r, 0, t, n),
		center: jn(e, t, n, 0, 0, t, n)
	};
}
function Nn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
var Pn = (e) => `${Math.round(e * 1e3) / 10}%`;
function Fn(e, t = 1) {
	return In(e, t).map((e) => `radial-gradient(${Pn(e.rx)} ${Pn(e.ry)} at ${Pn(e.cx)} ${Pn(e.cy)}, ${Nn(e.color, e.alpha)}, transparent ${Pn(e.stop)})`).join(", ");
}
function In(e, t = 1) {
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
function Ln(e, t) {
	e.clearRect(0, 0, 112, 72), e.filter = "blur(3px)";
	for (let n of t) {
		let t = 8 + n.cx * 96, r = 9 + n.cy * 54, i = n.rx * 96, a = n.ry * 54;
		e.save(), e.translate(t, r), e.scale(i, a);
		let o = e.createRadialGradient(0, 0, 0, 0, 0, 1), { r: s, g: c, b: l } = n.color;
		o.addColorStop(0, Nn(n.color, n.alpha)), o.addColorStop(n.stop, `rgba(${s}, ${c}, ${l}, 0)`), e.fillStyle = o, e.fillRect((8 - t) / i, (9 - r) / a, 96 / i, 54 / a), e.restore();
	}
}
function Rn(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var zn = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		let n = e, r = K(!1), i = null;
		function a() {
			r.value = Rn(i);
		}
		let o = F(() => n.enabled && !n.reducedMotion && !r.value), s = F(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = K(null), l = K(null), u = null, d = null, f = !1;
		function p(e) {
			if (f || typeof document > "u") return null;
			try {
				if (!d && (u = document.createElement("canvas"), u.width = 112, u.height = 72, d = u.getContext("2d"), !d)) throw Error("no 2d context");
				Ln(d, In(e));
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
				let { data: n } = t.getImageData(0, 0, 32, 18), r = Mn(n, 32, 18), i = p(r);
				l.value = i, c.value = i ? null : Fn(r);
			} catch {
				_ = !0, c.value = null, l.value = null;
			}
		}
		function b(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let ee = null, x = null, te = null, S = 0, ne = !1;
		function C(e) {
			x = e, ee = e.requestVideoFrameCallback(w);
		}
		function w(e) {
			if (!ne) return;
			e - S >= 250 && (S = e, y());
			let t = n.video;
			b(t) && C(t);
		}
		function T() {
			if (ne || !o.value || !n.video) return;
			let e = n.video;
			b(e) ? (ne = !0, S = 0, C(e)) : (y(), _ || (ne = !0, te = setInterval(y, 250)));
		}
		function E() {
			ne = !1, ee != null && x && x.cancelVideoFrameCallback(ee), ee = null, x = null, te != null && (clearInterval(te), te = null);
		}
		Z(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			E(), e && t && T();
		}, { immediate: !0 }), Ne(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Me(() => {
			E(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let re = F(() => {
			let e = { opacity: String(s.value) };
			return l.value ? e.backgroundImage = `url("${l.value}")` : c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: y }), (e, t) => (G(), R("div", {
			class: U(["player__ambient", {
				"is-active": o.value,
				"is-bitmap": o.value && !!l.value
			}]),
			style: W(o.value ? re.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-ba42f7c0"]]), Bn = ["aria-label"], Vn = { class: "resume__label" }, Hn = { class: "resume__time numeric" }, Un = { class: "resume__actions" }, Wn = /*#__PURE__*/ C(/* @__PURE__ */ H({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = o(), i = F(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (G(), R("div", {
			class: "resume",
			role: "region",
			"aria-label": X(r)("player.resumePlayback")
		}, [z("p", Vn, [
			B(J(i.value[0]), 1),
			z("span", Hn, J(X(m)(e.seconds)), 1),
			B(J(i.value[1]), 1)
		]), z("div", Un, [z("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [V(w, { name: "play" }), z("span", null, J(X(r)("player.resume")), 1)]), z("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [V(w, { name: "rewind" }), z("span", null, J(X(r)("player.startOver")), 1)])])], 8, Bn));
	}
}), [["__scopeId", "data-v-271c5209"]]), Gn = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Kn = /* @__PURE__ */ new Set([
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
function qn(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Jn(...e) {
	return e.some((e) => Kn.has(qn(e)));
}
function Yn(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Xn(e) {
	return e?.error?.code === 2;
}
var Zn = 3e4;
function Qn(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && ir.get(t) === "hevc";
}
function $n(e) {
	let t = { forceTranscode: "1" };
	return Qn(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function er(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
function tr(e) {
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
var $ = 2 * Math.PI * 15;
function nr(e, t, n = $) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var rr = /* @__PURE__ */ new Map([
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
]), ir = /* @__PURE__ */ new Map([
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
]), ar = /* @__PURE__ */ new Set(["h264"]), or = /* @__PURE__ */ new Map([
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
function sr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = ir.get(t);
	return n === void 0 ? "transcode" : ar.has(n) ? "direct" : "probe";
}
function cr(e) {
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
var lr = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function ur(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return lr.get(t) ?? "video/mp4";
}
function dr(e, t = "video/mp4") {
	let n = rr.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function fr(e, t = "video/mp4") {
	if (!e) return !0;
	let n = dr(e, t);
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
async function pr(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = ir.get(n), i = r === void 0 ? void 0 : or.get(r);
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
async function mr(e, t, n = "") {
	if (Jn(...e)) return !0;
	let r = e.map((e) => qn(e)).find((e) => Gn.includes(e)) ?? "";
	if (!Gn.includes(r)) return !1;
	let i = ur(r), a = sr(n);
	if (a === "transcode" || a === "probe" && !await pr(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await fr(e.codec, i)) return !0;
	}
	return !1;
}
// src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var hr = ["aria-label"], gr = ["src"], _r = { class: "upnext__body" }, vr = { class: "upnext__eyebrow" }, yr = { class: "upnext__title" }, br = {
	key: 0,
	class: "upnext__cd numeric"
}, xr = { class: "upnext__actions" }, Sr = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Cr = ["r"], wr = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Tr = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		let { t: n } = o(), { imgSrc: r } = c(), i = e, a = t, s = F(() => i.posterUrl ?? i.media.poster_url ?? null), l = F(() => nr(i.remaining, i.total));
		return (t, i) => (G(), R("aside", {
			class: "upnext",
			role: "region",
			"aria-label": X(n)("player.upNext")
		}, [
			s.value ? (G(), R("img", {
				key: 0,
				class: "upnext__thumb",
				src: X(r)(s.value),
				alt: "",
				loading: "lazy"
			}, null, 8, gr)) : L("", !0),
			z("div", _r, [
				z("p", vr, J(X(n)("player.upNext")), 1),
				z("h4", yr, J(e.media.name), 1),
				e.counting ? (G(), R("p", br, J(e.remaining > 0 ? X(n)("player.startsIn", { count: e.remaining }) : X(n)("player.startingNow")), 1)) : L("", !0),
				z("div", xr, [z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [V(w, { name: "play" }), z("span", null, J(X(n)("player.playNow")), 1)]), z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, J(X(n)("player.cancel")), 1)])
			]),
			e.counting ? (G(), R("svg", Sr, [z("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Cr), z("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": X($),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, wr)])) : L("", !0)
		], 8, hr));
	}
}), [["__scopeId", "data-v-3fc667d0"]]), Er = {
	class: "transcode",
	role: "alert"
}, Dr = { class: "transcode__card" }, Or = { class: "transcode__heading" }, kr = { class: "transcode__body" }, Ar = /*#__PURE__*/ C(/* @__PURE__ */ H({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = o();
		return (t, i) => (G(), R("div", Er, [z("div", Dr, [
			V(w, {
				name: "alert",
				class: "transcode__icon"
			}),
			z("h3", Or, J(X(r)("player.transcodeHeading")), 1),
			z("p", kr, J(e.title ? X(r)("player.transcodeBodyTitled", { title: e.title }) : X(r)("player.transcodeBodyUntitled")), 1),
			z("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [V(w, { name: "arrow-left" }), z("span", null, J(X(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), jr = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Mr = { class: "prep__card" }, Nr = { class: "prep__heading" }, Pr = { class: "prep__body" }, Fr = ["aria-valuenow"], Ir = /*#__PURE__*/ C(/* @__PURE__ */ H({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = o(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (G(), R("div", jr, [z("div", Mr, [
			V(w, {
				name: "spinner",
				class: "prep__spinner"
			}),
			z("h3", Nr, J(X(n)("player.transcodePreparingHeading")), 1),
			z("p", Pr, J(e.title ? X(n)("player.transcodePreparingTitled", { title: e.title }) : X(n)("player.transcodePreparingUntitled")), 1),
			z("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [z("div", {
				class: "prep__bar-fill",
				style: W({ width: r() + "%" })
			}, null, 4)], 8, Fr),
			z("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [V(w, { name: "arrow-left" }), z("span", null, J(X(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Lr = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		let s = F(() => a(n.position, n.introMarker) ? {
			label: i("player.skipIntro"),
			target: n.introMarker.end
		} : a(n.position, n.outroMarker) ? {
			label: i("player.skipOutro"),
			target: n.outroMarker.end
		} : null);
		function c() {
			s.value && r("skip", s.value.target);
		}
		return (e, t) => (G(), I(Oe, { name: "skip" }, {
			default: Q(() => [s.value ? (G(), R("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ie(c, ["stop"])
			}, [z("span", null, J(s.value.label), 1), V(w, { name: "skip-forward" })])) : L("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Rr = ["aria-label"], zr = ["aria-label", "onClick"], Br = { class: "skip-controls__label" }, Vr = 5, Hr = 30, Ur = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
			let n = a(e.startMs), r = n - Vr, i = n + Hr;
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
		let d = F(() => !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => l.includes(e.type) && c(e, n.position)).sort((e, t) => e.startMs - t.startMs));
		function f(e) {
			r("skip", a(e.startMs));
		}
		return (e, t) => d.value.length > 0 ? (G(), R("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": X(i)("player.skipControls")
		}, [(G(!0), R(P, null, q(d.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${u(e.type)}`,
			onClick: Ie((t) => f(e), ["stop"])
		}, [z("span", Br, J(u(e.type)), 1), V(w, { name: "skip-forward" })], 8, zr))), 128))], 8, Rr)) : L("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Wr = ["aria-label", "aria-expanded"], Gr = ["aria-label"], Kr = { class: "chapterlist__head" }, qr = { class: "chapterlist__title" }, Jr = ["aria-label"], Yr = ["onClick"], Xr = { class: "chapterlist__index" }, Zr = { class: "chapterlist__name" }, Qr = { class: "chapterlist__meta" }, $r = { class: "chapterlist__time" }, ei = {
	key: 0,
	class: "chapterlist__duration"
}, ti = {
	key: 1,
	class: "chapterlist__empty"
}, ni = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		let c = F(() => n.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = m(e.start), a;
			if (e.end != null && e.end > e.start) {
				let t = e.end - e.start;
				a = m(t);
			}
			return {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), l = K(null), u = K(null);
		E(u, Y(n, "open"), {
			lockScroll: !1,
			onEscape: () => (a(), !0)
		});
		function d(e) {
			l.value && !l.value.contains(e.target) && a();
		}
		Z(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", d, !0) : document.removeEventListener("pointerdown", d, !0));
		}), Me(() => {
			document.removeEventListener("pointerdown", d, !0);
		});
		function f(e) {
			r("seek", e.start), a();
		}
		return (t, n) => (G(), R("div", {
			ref_key: "rootEl",
			ref: l,
			class: "chapterlist"
		}, [z("button", {
			type: "button",
			class: U(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": X(i)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: s
		}, [V(w, { name: "list" })], 10, Wr), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.chapterList"),
			tabindex: "-1"
		}, [z("div", Kr, [z("h3", qr, J(X(i)("player.chapters")), 1), V(T, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), c.value.length > 0 ? (G(), R("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": X(i)("player.chapterList")
		}, [(G(!0), R(P, null, q(c.value, (e) => (G(), R("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [z("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => f(e.chapter)
		}, [
			z("span", Xr, J(e.index), 1),
			z("span", Zr, J(e.label), 1),
			z("span", Qr, [z("span", $r, J(e.startLabel), 1), e.durationLabel ? (G(), R("span", ei, "· " + J(e.durationLabel), 1)) : L("", !0)])
		], 8, Yr)]))), 128))], 8, Jr)) : (G(), R("p", ti, J(X(i)("player.noChapters")), 1))], 8, Gr)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ri = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, ii = { class: "marker-timeline__ticks" }, ai = [
	"title",
	"aria-label",
	"onClick"
], oi = { class: "marker-timeline__tooltip" }, si = { class: "marker-timeline__tooltip-label" }, ci = { class: "marker-timeline__tooltip-time numeric" }, li = ["onClick"], ui = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		let s = F(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = F(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = F(() => c.value !== null), u = F(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (G(), R("div", {
			key: 0,
			class: U(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (G(), R("div", ri, [t[0] ||= z("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [z("polygon", { points: "5,3 19,12 5,21" })], -1), B(" " + J(u.value), 1)])) : L("", !0), z("div", ii, [(G(!0), R(P, null, q(s.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: U(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: W({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${X(m)(e.startSec)}`,
			"aria-label": `${e.label} at ${X(m)(e.startSec)}`,
			onClick: Ie((t) => d(e), ["stop"])
		}, [z("span", oi, [
			z("span", si, J(e.label), 1),
			z("span", ci, J(X(m)(e.startSec)), 1),
			z("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ie((t) => f(e), ["stop"])
			}, " Find similar ", 8, li)
		])], 14, ai))), 128))])], 2)) : L("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), di = ["aria-label", "aria-expanded"], fi = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, pi = ["aria-label"], mi = ["aria-selected", "onClick"], hi = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		], a = K(0), s = K(0), c = F(() => s.value > 0), l;
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
		let m = K(!1);
		function h() {
			c.value ? (f(0), m.value = !1) : m.value = !m.value;
		}
		function g(e) {
			f(e), m.value = !1;
		}
		return Me(() => {
			u();
		}), t({ toggleOpen: h }), (e, t) => (G(), R("div", { class: U(["sleep-timer", { "is-active": c.value }]) }, [z("button", {
			type: "button",
			class: U(["sleep-timer__trigger", { "is-active": c.value }]),
			"aria-label": c.value ? `Sleep timer: ${p(s.value)} remaining` : X(r)("player.sleepTimer"),
			"aria-expanded": m.value,
			"aria-haspopup": "listbox",
			onClick: h
		}, [V(w, { name: "moon" }), c.value ? (G(), R("span", fi, J(p(s.value)), 1)) : L("", !0)], 10, di), V(Oe, { name: "dropdown" }, {
			default: Q(() => [m.value ? (G(), R("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": X(r)("player.sleepTimer")
			}, [(G(), R(P, null, q(i, (e) => z("li", {
				key: e.value,
				class: U(["sleep-timer__option", { "is-selected": a.value === e.value }]),
				role: "option",
				"aria-selected": a.value === e.value,
				onClick: (t) => g(e.value)
			}, J(e.label), 11, mi)), 64))], 8, pi)) : L("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), gi = {
	key: 0,
	class: "syncplay-overlay"
}, _i = { class: "syncplay-overlay__badge" }, vi = { class: "syncplay-overlay__label" }, yi = { class: "syncplay-overlay__status-label" }, bi = { class: "syncplay-overlay__members" }, xi = { class: "syncplay-overlay__member-count" }, Si = { class: "syncplay-overlay__member-list" }, Ci = { class: "syncplay-overlay__member-name" }, wi = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Ti = /*#__PURE__*/ C(/* @__PURE__ */ H({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let t = e, { t: n } = o(), r = _e(), a = i(), s = F(() => t.apiBase ?? a.value), c = F(() => r.currentRoom?.name ?? "SyncPlay"), l = F(() => r.onlineMembers.length), u = F(() => r.syncStatus), d = F(() => {
			switch (u.value) {
				case "synced": return n("syncplay.synced");
				case "outOfSync": return n("syncplay.outOfSync");
				case "re-syncing": return n("syncplay.reSyncing");
				default: return n("syncplay.synced");
			}
		}), f = F(() => {
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
		return (e, t) => X(r).isInRoom ? (G(), R("div", gi, [
			z("div", _i, [V(w, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), z("span", vi, "SyncPlay: " + J(c.value), 1)]),
			z("div", { class: U(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [V(w, {
				name: f.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), z("span", yi, J(d.value), 1)], 2),
			z("div", bi, [z("span", xi, [V(w, { name: "user" }), B(" " + J(X(n)("syncplay.members", { count: l.value })), 1)]), z("ul", Si, [(G(!0), R(P, null, q(X(r).onlineMembers.slice(0, 5), (e) => (G(), R("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= z("span", { class: "syncplay-overlay__member-dot" }, null, -1), z("span", Ci, J(e.name), 1)]))), 128)), X(r).onlineMembers.length > 5 ? (G(), R("li", wi, " +" + J(X(r).onlineMembers.length - 5) + " more ", 1)) : L("", !0)])]),
			V(fe, {
				variant: "ghost",
				size: "sm",
				onClick: p
			}, {
				default: Q(() => [B(J(X(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-2dfa4284"]]), Ei = {
	key: 0,
	class: "syncplay-controls"
}, Di = ["aria-label"], Oi = { class: "syncplay-controls__wait-label" }, ki = { class: "syncplay-controls__transport" }, Ai = ["aria-label"], ji = ["aria-label"], Mi = ["aria-label"], Ni = { class: "syncplay-controls__status-label" }, Pi = 10, Fi = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		let n = e, a = t, { t: s } = o(), c = _e(), l = ne(), u = ke("phlixConfig", null), d = i(), f = F(() => n.apiBase ?? d.value);
		ve((e) => {
			l.error(r(e, u?.locale, s("syncplay.commandRejected")));
		}), Pe(() => ve(null));
		let p = K(!1), m = F(() => p.value || c.syncStatus === "re-syncing");
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
			await v(Math.max(0, n.position - Pi));
		}
		async function b() {
			await v(Math.min(n.duration, n.position + Pi));
		}
		return Z(() => c.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => X(c).isInRoom ? (G(), R("div", Ei, [
			m.value ? (G(), R("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": X(s)("syncplay.waitingForMembers")
			}, [V(w, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), z("span", Oi, J(X(s)("syncplay.waitingForMembers")), 1)], 8, Di)) : L("", !0),
			z("div", ki, [
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(s)("syncplay.rewind"),
					onClick: y
				}, [V(w, { name: "rewind" })], 8, Ai),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? X(s)("syncplay.pauseAll") : X(s)("syncplay.playAll"),
					onClick: _
				}, [V(w, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, ji),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(s)("syncplay.fastForward"),
					onClick: b
				}, [V(w, { name: "forward" })], 8, Mi)
			]),
			z("div", { class: U(["syncplay-controls__status", `syncplay-controls__status--${X(c).syncStatus}`]) }, [V(w, {
				name: X(c).syncStatus === "synced" ? "check" : X(c).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), z("span", Ni, J(X(c).syncStatus === "synced" ? X(s)("syncplay.synced") : X(c).syncStatus === "outOfSync" ? X(s)("syncplay.outOfSync") : X(s)("syncplay.reSyncing")), 1)], 2)
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-276195ff"]]);
// src/utils/subtitleSrc.ts
function Ii(e, t) {
	return String(s(e, t));
}
function Li(e, t) {
	let n = !1, r = t.map((t) => {
		let r = Ii(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
// src/components/Player.vue?vue&type=script&setup=true&lang.ts
var Ri = { class: "player__stage" }, zi = ["src", "poster"], Bi = [
	"src",
	"srclang",
	"label"
], Vi = {
	key: 0,
	class: "player__buffering"
}, Hi = {
	class: "player__buffering-text",
	"aria-hidden": "true"
}, Ui = { class: "player__meta" }, Wi = ["aria-label"], Gi = { class: "player__meta-text" }, Ki = { class: "player__eyebrow" }, qi = { class: "player__title" }, Ji = { class: "player__sub numeric" }, Yi = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Xi = {
	key: 1,
	class: "player__center"
}, Zi = ["aria-label"], Qi = ["aria-label"], $i = ["aria-label"], ea = { class: "player__btnrow" }, ta = ["aria-label"], na = ["aria-label"], ra = ["aria-label"], ia = { class: "player__time numeric" }, aa = ["aria-label", "aria-pressed"], oa = ["title"], sa = ["aria-label"], ca = ["aria-label"], la = ["aria-label", "aria-pressed"], ua = ["aria-label", "aria-pressed"], da = ["aria-label"], fa = { class: "similar-modal" }, pa = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, ma = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, ha = { class: "similar-modal__state-title" }, ga = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, _a = {
	key: 3,
	class: "similar-modal__results"
}, va = { class: "similar-modal__poster" }, ya = ["src", "alt"], ba = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, xa = { class: "similar-modal__result-body" }, Sa = { class: "similar-modal__result-title" }, Ca = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, wa = { key: 0 }, Ta = /*#__PURE__*/ C(/* @__PURE__ */ H({
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
		let { imgSrc: r } = c(), a = e, s = t, l = u(), h = S(), { t: g } = o(), _ = _e(), v = d(), b = F(() => v.isFavorite(a.media.id)), x = F(() => v.likeLevel(a.media.id));
		function te() {
			v.toggleFavorite(a.media.id, Ae());
		}
		function C(e) {
			v.setLike(a.media.id, e, Ae());
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
		], E = K(null), re = K(null), D = K(null), k = K(!0), A = K(!1), ie = K(!1), ae = K(!1), j = K(!1), M = K(!1), ce = K(!1), le = K(!1), fe = K(!1), pe = K(null), he = K(null), ge = K(!1), ve = ne(), be = K(!1);
		function xe(e) {
			ve.success(g("syncplay.joinedRoom", { name: e.name }));
		}
		let Se = F(() => M.value ? 1.35 : 1), N = K(Jn(a.streamUrl, a.media.path)), Ce = F(() => cr(a.media.streams)), we = 0;
		async function Te() {
			let e = ++we;
			if (N.value) return;
			let t = await mr([a.streamUrl, a.media.path], a.playbackAudioTracks ?? [], Ce.value);
			e === we && t && !N.value && (N.value = !0, He(E.value?.currentTime ?? 0));
		}
		Z([() => a.playbackAudioTracks, Ce], () => {
			Te();
		}, { immediate: !0 });
		let Ee = ke("phlixConfig", null), De = i(), Oe = ke("resumeReporter", null), H = !1;
		function Ae() {
			return De.value;
		}
		let W = ct({
			apiBase: () => a.apiBase ?? "",
			hlsConfig: Ee?.playerHlsConfig
		}), Pe = ee({ apiBase: () => a.apiBase ?? "" }), Y = null;
		function Fe(e) {
			Y !== null && clearTimeout(Y), Y = setTimeout(() => {
				Y = null, Pe.fetch(e);
			}, 0);
		}
		let Le = F(() => a.thumbnailAt ?? Pe.thumbnailAt), Re = F(() => N.value ? void 0 : a.streamUrl), ze = F(() => N.value && W.state.value !== "ready"), Be = F(() => N.value && (W.state.value === "preparing" || W.state.value === "idle")), Ve = F(() => N.value && W.state.value === "error");
		function He(e = 0) {
			let t = E.value, n = navigator.connection?.downlinkMax, r = et(n);
			t && W.start(t, a.media.id, r, e);
		}
		function Ue(e) {
			l.quality === "original" && e !== "auto" ? W.loadVariantPlaylist(Dt) : typeof e == "string" && e !== "auto" ? W.loadVariantPlaylist(e) : W.setLevel(e);
		}
		let We = !1;
		function Ge() {
			h.defaultQuality = Et;
		}
		function Ke() {
			let e = W.levels.value;
			if (e.length === 0) return !1;
			let t = h.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = W.variants.value;
				if (!t || t.length === 0) return !1;
				if (Pt(e, t)) W.loadVariantPlaylist(Dt);
				else {
					let t = Nt(e);
					t >= 0 && W.setNextLevel(t), Ge();
				}
				return !0;
			}
			let n = jt(e, t);
			return n >= 0 ? W.setNextLevel(n) : Ge(), !0;
		}
		Z(() => W.levels.value, (e) => {
			We || e.length === 0 || Ke() && (We = !0);
		}), Z(() => W.variants.value, (e) => {
			!We && e?.length && je(() => {
				We || Ke() && (We = !0);
			});
		}, { deep: !0 });
		let qe = K(l.resumePositionFor(a.media.id) ?? 0), Je = K(!N.value && qe.value > 0), Ye = null, Xe = K(!1), Ze = K(8), Qe, $e = K(null), tt = K(0), nt = K(!1), rt = K([]), it = K(!1), at = K(null);
		function ot(e, t) {
			$e.value = e, tt.value = t, rt.value = [], at.value = null, nt.value = !0, ft(e, t);
		}
		let st = null, lt = null, ut = null;
		function dt() {
			let e = a.apiBase ?? "";
			return (lt === null || ut !== e) && (lt = new n({ baseUrl: e }), ut = e), lt;
		}
		async function ft(e, t) {
			st?.abort(), st = new AbortController(), it.value = !0, at.value = null;
			try {
				let n = await dt().searchByMarker(e, t, 30, 20, st.signal);
				rt.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				at.value = "Couldn’t load similar titles. Please try again.", rt.value = [];
			} finally {
				it.value = !1;
			}
		}
		function pt() {
			st?.abort(), nt.value = !1, rt.value = [], at.value = null, $e.value = null;
		}
		let mt = F(() => l.upNext);
		function ht() {
			N.value = Jn(a.streamUrl, a.media.path), Te(), qe.value = l.resumePositionFor(a.media.id) ?? 0, Je.value = !N.value && qe.value > 0, Ye = null, xn = !1, cn = !1, an.value = [], rn.value = !1, ln = !1, Yt.value = -1, gn = null, We = !1, H = !1, Vt(), At = !1, Rt = 0, Ft = 0, yt(), Xe.value = !1, W.reset(), E.value && (E.value.currentTime = 0), N.value && He(), Fe(a.media.id);
		}
		function gt(e) {
			let t = E.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ye = Math.max(0, e));
		}
		function _t() {
			gt(qe.value), Je.value = !1, E.value?.play()?.catch(() => {});
		}
		function vt() {
			Ye = null, gt(0), l.clearResume(a.media.id), Je.value = !1, E.value?.play()?.catch(() => {});
		}
		function yt() {
			Qe &&= (clearInterval(Qe), void 0);
		}
		function bt() {
			Ze.value = 8, yt(), Qe = setInterval(() => {
				--Ze.value, Ze.value <= 0 && (yt(), Ct());
			}, 1e3);
		}
		function xt() {
			H || (H = !0, Oe?.finish()), fr(), k.value = !0, l.upNext && (Xe.value = !0, h.autoplay && bt());
		}
		function Ct() {
			yt(), Xe.value = !1;
			let e = l.next(a.streamUrlFor);
			e && s("play-next", e);
		}
		function Ot() {
			yt(), Xe.value = !1;
		}
		function kt() {
			if (N.value) return;
			let e = E.value, t = Xn(e) && (e?.currentTime ?? 0) === 0;
			(Yn(e) || t) && (zt(), Vt(), N.value = !0, He(e?.currentTime ?? 0));
		}
		let At = !1, Mt = null, Ft = 0, Rt = 0;
		function zt() {
			if (At) return;
			At = !0;
			let e = a.media?.id;
			e != null && e !== "" && dt().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, $n({ videoCodec: Ce.value })).catch(() => {});
		}
		function Bt() {
			if (Mt !== null || At || N.value) return;
			let e = E.value;
			e && (Ft = Date.now(), Rt = e.currentTime, Mt = setTimeout(() => {
				Mt = null;
				let e = E.value;
				e && !N.value && er(Date.now(), Ft, e.currentTime, Rt) && (zt(), N.value = !0, He(e.currentTime));
			}, Zn));
		}
		function Vt() {
			Mt !== null && (clearTimeout(Mt), Mt = null);
		}
		let Ht = K([]), Ut = K([]), Wt = K(-1), Gt = K(!1), Kt = F(() => W.state.value === "ready" && W.audioTracks.value.length > 0), qt = F(() => W.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Jt = F(() => (a.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Yt = K(-1), Xt = F(() => !Kt.value && !N.value && Ut.value.length === 0 && Jt.value.length > 1), Zt = F(() => Ut.value.length > 0 ? !1 : W.state.value === "ready" ? !Kt.value && W.hasAudio.value : !N.value && !Xt.value && Jt.value.length === 1), Qt = F(() => Kt.value ? qt.value : Xt.value ? Jt.value : Ut.value.length > 0 ? Ut.value : Zt.value ? [{
			index: 0,
			language: "",
			label: g("player.audioOriginal"),
			kind: "audio"
		}] : Ut.value), $t = F(() => {
			if (Kt.value) return W.currentAudioTrack.value;
			if (Xt.value) {
				if (Yt.value >= 0) return Yt.value;
				let e = (a.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : a.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Ut.value.length === 0 && Zt.value ? 0 : Wt.value;
		}), en = K(!1), tn = l.subtitleLang, nn = F(() => {
			let e = a.apiBase ?? "", t = N.value ? W.subtitleTracks.value : Li(e, a.playbackSubtitleTracks ?? []);
			if (an.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Li(e, an.value), i = new Set(t.map(n)), o = r.filter((e) => !i.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), rn = K(!1), an = K([]), on = F(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(h.defaultSubtitleLang), t(h.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function sn(e) {
			an.value.some((t) => t.url === e.url) || (an.value = [...an.value, e]);
		}
		let cn = !1, ln = !1;
		function un() {
			if (cn) return;
			if (h.subtitlePreferenceSet) {
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
			let e = h.defaultAudioLang;
			if (!e) return;
			let t = Qt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = $t.value;
			r >= 0 && r < t.length || (_n(n), ln = !0);
		}
		let fn = F(() => Ht.value.some((e) => e.language === l.subtitleLang));
		function mn() {
			let e = E.value;
			Ht.value = ue(e), Ut.value = oe(e), Wt.value = O(e), un(), dn();
		}
		function hn() {
			if (fn.value) tn = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = tn && Ht.value.some((e) => e.language === tn) ? tn : Ht.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			s("captions");
		}
		let gn = null;
		function _n(e) {
			if (!Zt.value) {
				if (Kt.value) W.setAudioTrack(e);
				else if (Xt.value) {
					if (e === $t.value) return;
					Yt.value = e, gn = e, N.value = !0, He(E.value?.currentTime ?? 0);
				} else se(E.value, e), Wt.value = e;
			}
		}
		Z(Kt, (e) => {
			if (!e || gn === null) return;
			let t = gn;
			gn = null, t >= 0 && t < W.audioTracks.value.length && W.setAudioTrack(t);
		}), Z(nn, () => {
			je(() => mn());
		}, { deep: !0 });
		let vn = null, yn, bn = F(() => {
			let e = [];
			a.media.year && e.push({ text: String(a.media.year) }), a.media.rating && e.push({
				text: a.media.rating,
				cert: !0
			}), a.media.runtime && e.push({ text: `${a.media.runtime}m` });
			let t = a.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), xn = !1;
		function Sn() {
			if (!a.autoplay || xn || Je.value || ze.value) return;
			let e = E.value;
			if (!e || !e.paused) return;
			xn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (l.muteForAutoplay(), e.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Cn() {
			Sn();
		}
		function wn() {
			a.prevEpisode && s("play-episode", a.prevEpisode);
		}
		function Tn() {
			a.nextEpisode && s("play-episode", a.nextEpisode);
		}
		function En() {
			let e = E.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Dn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function On() {
			if ($ !== null && (clearInterval($), $ = null), nr) {
				nr = !1;
				let e = E.value;
				e && Math.abs(e.volume - l.volume) > .001 && (e.volume = l.volume);
			}
			l.play(), l.setMediaPositionState(), Bt();
		}
		function An() {
			l.pause(), l.setMediaPositionState(), A.value = !1;
		}
		function jn() {
			A.value = !0, fr(), k.value = !0;
		}
		function Mn() {
			A.value = !1, hr();
		}
		function Nn() {
			let e = E.value;
			e && (Mt !== null && e.currentTime > Rt && Vt(), l.updateProgress(e.currentTime, e.duration, Dn(e)), _.isInRoom && _.updateLocalPosition(e.currentTime));
		}
		function Pn() {
			let e = E.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, Ye !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ye) : Ye, Ye = null), l.updateProgress(e.currentTime, e.duration, Dn(e)), l.setMediaPositionState(), mn());
		}
		function Fn() {
			let e = E.value;
			e && l.updateProgress(e.currentTime, e.duration, Dn(e));
		}
		function In() {
			let e = E.value;
			e && (!nr && Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function Ln() {
			let e = E.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate), l.setMediaPositionState();
		}
		function Rn() {
			l.setMediaPositionState();
		}
		function Bn() {
			l.setMediaPositionState();
		}
		function Vn(e) {
			let t = E.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function Hn(e) {
			Vn(l.position + e);
		}
		function Un() {
			ae.value = !0, hr();
		}
		function Gn() {
			ae.value = !1, hr();
		}
		function Kn(e) {
			let t = T.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(T[e] - l.rate) ? n : e, 0), n = T[Math.min(T.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function qn() {
			if (!a.markers) return;
			let e = l.position, t = a.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Vn(t.startMs / 1e3);
		}
		function Qn() {
			if (!a.markers) return;
			let e = l.position, t = a.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Vn(t.startMs / 1e3);
		}
		function tr() {
			pe.value?.toggleOpen();
		}
		let $ = null, nr = !1;
		function rr() {
			let e = E.value;
			if (!e) {
				l.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), l.pause();
				return;
			}
			$ !== null && (clearInterval($), $ = null), nr = !0;
			let t = .05;
			$ = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval($), $ = null, e.volume = 0, e.pause(), l.pause());
			}, 50);
		}
		p({
			playPause: En,
			seekBy: Hn,
			frameStep: (e) => {
				l.playing || Vn(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: ir,
			toggleFullscreen: or,
			toggleCaptions: hn,
			toggleTheater: ar,
			togglePip: lr,
			skipIntro: qn,
			skipOutro: Qn,
			sleepTimer: tr,
			seekToPercent: (e) => Vn(e * l.duration),
			speedStep: Kn,
			toggleHelp: () => {
				j.value = !j.value;
			},
			toggleQuality: () => {
				N.value ? (ge.value = !ge.value, he.value?.toggleMenu?.()) : ve.show({
					message: g("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !j.value && !Gt.value && !en.value && !be.value && !rn.value && !nt.value });
		function ir() {
			l.toggleMute();
		}
		function ar() {
			M.value = !M.value, s("theater", M.value);
		}
		Z(() => l.muted, (e) => {
			let t = E.value;
			t && t.muted !== e && (t.muted = e);
		}), Z(() => l.volume, (e) => {
			let t = E.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Z(() => l.rate, (e) => {
			let t = E.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Z(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? gt(e.value) : e.type === "seekBy" && gt(l.position + e.value));
		});
		function or() {
			if (typeof document > "u") return;
			if (!fe.value) {
				ar();
				return;
			}
			let e = re.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function sr() {
			ie.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function lr() {
			let e = E.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function ur() {
			ce.value = !0;
		}
		function dr() {
			ce.value = !1;
		}
		function fr() {
			yn &&= (clearTimeout(yn), void 0);
		}
		function pr() {
			fr(), !l.playing || ae.value || A.value || (yn = setTimeout(() => {
				l.playing && !ae.value && !A.value && (k.value = !1);
			}, a.idleTimeout ?? 3e3));
		}
		function hr() {
			k.value = !0, pr();
		}
		let gr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", _r = "data-phlix-prev-tabindex", vr = "__phlix_no_tabindex__";
		function yr(e) {
			let t = re.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(gr) ? [n] : Array.from(n.querySelectorAll(gr));
				for (let n of t) if (e) {
					let e = n.getAttribute(_r);
					e === null || e === vr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(_r);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(_r, n.getAttribute("tabindex") ?? vr), n.setAttribute("tabindex", "-1"));
			}
		}
		Z(k, (e) => {
			typeof document < "u" && (yr(e), !e && document.activeElement instanceof HTMLElement && re.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), Z(() => l.playing, (e) => {
			e ? (Je.value = !1, Ot(), pr()) : (fr(), A.value = !1, k.value = !0);
		});
		let br = null;
		Ne(() => {
			l.setCurrent(a.media, {
				resetPosition: !1,
				streamUrl: a.streamUrl
			}), v.hydrate(a.media), typeof document < "u" && (document.addEventListener("fullscreenchange", sr), le.value = document.pictureInPictureEnabled === !0, fe.value = document.fullscreenEnabled === !0), br = l.bindMediaSession({
				onPlay: () => void E.value?.play()?.catch(() => {}),
				onPause: () => E.value?.pause(),
				onSeek: (e) => Vn(e),
				onNext: () => Ct(),
				onPrevious: () => wn()
			}), vn = E.value?.textTracks ?? null, vn?.addEventListener?.("addtrack", mn), vn?.addEventListener?.("removetrack", mn), mn(), N.value && He(), Fe(a.media.id);
		}), Z(() => a.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: a.streamUrl
			}), ht();
		}), Z(() => a.media?.id, () => {
			v.hydrate(a.media);
		}), Z(() => _.currentSession, (e) => {
			e && (e.state === "playing" ? (E.value?.play()?.catch(() => {}), l.play()) : e.state === "paused" && (E.value?.pause(), l.pause()), _.updateLocalPosition(l.position), Math.abs(_.driftAmount) > 2 && gt(e.playbackPosition));
		});
		let xr = null;
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
				}), E.value?.play()?.catch(() => {}), l.play(), _.consumePendingPlayMedia(), xr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			xr !== n && (xr = n, s("pending-media", e.mediaId, e.title));
		}), Me(() => {
			Oe?.reportFinal?.(), fr(), yt(), W.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", sr), br?.(), vn?.removeEventListener?.("addtrack", mn), vn?.removeEventListener?.("removetrack", mn), $ !== null && (clearInterval($), $ = null), Y !== null && (clearTimeout(Y), Y = null), Vt();
		}), (t, n) => (G(), R("div", {
			ref_key: "containerRef",
			ref: re,
			class: U(["player", {
				"is-chrome-hidden": !k.value,
				"is-theater": M.value
			}]),
			"data-player-surface": "",
			onPointermove: hr,
			onPointerdown: hr,
			onFocusin: hr
		}, [V(zn, {
			video: E.value,
			enabled: X(h).atmosphere,
			playing: X(l).playing,
			"reduced-motion": X(h).effectiveReducedMotion,
			intensity: Se.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), z("div", Ri, [
			z("video", {
				ref_key: "videoRef",
				ref: E,
				class: "player__video",
				src: Re.value,
				poster: X(r)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: On,
				onPause: An,
				onTimeupdate: Nn,
				onLoadedmetadata: Pn,
				onCanplay: Cn,
				onWaiting: jn,
				onStalled: jn,
				onPlaying: Mn,
				onProgress: Fn,
				onVolumechange: In,
				onRatechange: Ln,
				onSeeked: Rn,
				onDurationchange: Bn,
				onEnded: xt,
				onError: kt,
				onEnterpictureinpicture: ur,
				onLeavepictureinpicture: dr,
				onClick: En
			}, [(G(!0), R(P, null, q(nn.value, (e) => (G(), R("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Bi))), 128))], 40, zi),
			n[22] ||= z("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[23] ||= z("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			A.value ? (G(), R("div", Vi, [V(me, {
				size: 38,
				label: X(g)("player.buffering")
			}, null, 8, ["label"]), z("span", Hi, J(X(g)("player.buffering")), 1)])) : L("", !0),
			z("div", Ui, [z("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": X(g)("player.back"),
				onClick: n[0] ||= Ie((e) => s("back"), ["stop"])
			}, [V(w, { name: "arrow-left" })], 8, Wi), z("div", Gi, [
				z("p", Ki, J(X(g)("player.nowPlaying")), 1),
				z("h2", qi, J(e.media.name), 1),
				z("div", Ji, [(G(!0), R(P, null, q(bn.value, (e, t) => (G(), R(P, { key: t }, [t > 0 && !e.cert ? (G(), R("span", Yi, "·")) : L("", !0), z("span", { class: U({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			ze.value ? L("", !0) : (G(), R("div", Xi, [
				k.value ? (G(), R("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(g)("player.seekBackward"),
					onClick: n[1] ||= Ie((e) => Hn(-10), ["stop"])
				}, [V(w, { name: "rewind" }), z("span", { class: "player__center-skip-count" }, J(10))], 8, Zi)) : L("", !0),
				z("button", {
					type: "button",
					class: U(["player__bigplay", { "is-playing": X(l).playing }]),
					"aria-label": X(l).playing ? X(g)("player.pause") : X(g)("player.play"),
					onClick: Ie(En, ["stop"])
				}, [V(w, { name: X(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Qi),
				k.value ? (G(), R("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(g)("player.seekForward"),
					onClick: n[2] ||= Ie((e) => Hn(10), ["stop"])
				}, [V(w, { name: "forward" }), z("span", { class: "player__center-skip-count" }, J(10))], 8, $i)) : L("", !0)
			])),
			V(Lt, {
				video: E.value,
				language: X(l).subtitleLang,
				"style-config": X(h).captionStyle,
				lifted: k.value,
				"controls-root": D.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			ze.value ? L("", !0) : (G(), R("div", {
				key: 2,
				ref_key: "controlsRef",
				ref: D,
				class: "player__controls",
				onClick: n[9] ||= Ie(() => {}, ["stop"])
			}, [
				V(y, {
					position: X(l).position,
					duration: X(l).duration,
					buffered: X(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": Le.value,
					onSeek: Vn,
					onScrubStart: Un,
					onScrubEnd: Gn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				X(h).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), I(ui, {
					key: 0,
					position: X(l).position,
					duration: X(l).duration,
					markers: e.markers,
					onSeek: Vn,
					onSimilar: ot
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : L("", !0),
				z("div", ea, [
					e.prevEpisode ? (G(), R("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(g)("player.previousEpisode"),
						onClick: wn
					}, [V(w, { name: "skip-back" })], 8, ta)) : L("", !0),
					z("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": X(l).playing ? X(g)("player.pause") : X(g)("player.play"),
						onClick: En
					}, [V(w, { name: X(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, na),
					e.nextEpisode ? (G(), R("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(g)("player.nextEpisode"),
						onClick: Tn
					}, [V(w, { name: "skip-forward" })], 8, ra)) : L("", !0),
					z("span", ia, [
						B(J(X(m)(X(l).position)), 1),
						n[18] ||= z("span", { class: "player__sep" }, " / ", -1),
						B(J(X(m)(X(l).duration)), 1)
					]),
					n[19] ||= z("span", { class: "player__grow" }, null, -1),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__favorite", { "is-on": b.value }]),
						"aria-label": b.value ? X(g)("itemActions.removeFavorite") : X(g)("itemActions.addFavorite"),
						"aria-pressed": b.value ? "true" : "false",
						onClick: te
					}, [V(w, { name: b.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, aa),
					V(f, {
						level: x.value,
						onCycle: C
					}, null, 8, ["level"]),
					V(wt),
					V(Tt),
					V(It, {
						ref_key: "qualityMenuRef",
						ref: he,
						open: ge.value,
						"onUpdate:open": n[3] ||= (e) => ge.value = e,
						levels: X(W).levels.value,
						variants: X(W).variants.value,
						"current-level": X(W).currentLevel.value,
						"auto-enabled": X(W).autoEnabled.value,
						"active-height": X(W).activeLevelHeight.value,
						onSelect: Ue
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					N.value ? L("", !0) : (G(), R("span", {
						key: 2,
						class: "player__direct-badge",
						title: X(g)("player.qualityDirectStream")
					}, J(X(g)("player.directStream")), 9, oa)),
					V(pn, {
						open: Gt.value,
						"onUpdate:open": n[4] ||= (e) => Gt.value = e,
						tracks: Ht.value,
						"audio-tracks": Qt.value,
						"active-audio": $t.value,
						onSelectAudio: _n,
						onAddSubtitles: n[5] ||= (e) => rn.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					V(ni, {
						open: en.value,
						"onUpdate:open": n[6] ||= (e) => en.value = e,
						chapters: e.chapters ?? [],
						onSeek: Vn
					}, null, 8, ["open", "chapters"]),
					V(hi, {
						ref_key: "sleepTimerRef",
						ref: pe,
						"on-expire": rr
					}, null, 512),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__syncplay", { "is-on": X(_).isInRoom }]),
						"aria-label": X(_).isInRoom ? X(g)("syncplay.inRoom") : X(g)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: n[7] ||= (e) => be.value = !0
					}, [V(w, { name: "user" })], 10, sa),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(g)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: n[8] ||= (e) => j.value = !0
					}, [V(w, { name: "info" })], 8, ca),
					le.value ? (G(), R("button", {
						key: 3,
						type: "button",
						class: U(["player__iconbtn", { "is-on": ce.value }]),
						"aria-label": ce.value ? X(g)("player.exitPip") : X(g)("player.pip"),
						"aria-pressed": ce.value,
						onClick: lr
					}, [V(w, { name: "pip" })], 10, la)) : L("", !0),
					z("button", {
						type: "button",
						class: U(["player__iconbtn", { "is-on": M.value }]),
						"aria-label": M.value ? X(g)("player.exitTheater") : X(g)("player.theater"),
						"aria-pressed": M.value,
						onClick: ar
					}, [V(w, { name: "theater" })], 10, ua),
					fe.value ? (G(), R("button", {
						key: 4,
						type: "button",
						class: "player__iconbtn",
						"aria-label": ie.value ? X(g)("player.exitFullscreen") : X(g)("player.fullscreen"),
						onClick: or
					}, [V(w, { name: ie.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, da)) : L("", !0)
				])
			], 512)),
			ze.value ? L("", !0) : (G(), I(Lr, {
				key: 3,
				position: X(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: Vn
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			ze.value ? L("", !0) : (G(), I(Ur, {
				key: 4,
				position: X(l).position,
				markers: e.markers,
				onSkip: Vn
			}, null, 8, ["position", "markers"])),
			Je.value && !ze.value ? (G(), I(Wn, {
				key: 5,
				seconds: qe.value,
				onResume: _t,
				onRestart: vt
			}, null, 8, ["seconds"])) : L("", !0),
			Xe.value && mt.value && !ze.value ? (G(), I(Tr, {
				key: 6,
				media: mt.value,
				remaining: Ze.value,
				total: X(8),
				counting: X(h).autoplay,
				onPlayNow: Ct,
				onCancel: Ot
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : L("", !0),
			V(de, {
				modelValue: nt.value,
				"onUpdate:modelValue": n[10] ||= (e) => nt.value = e,
				title: `Similar ${$e.value ?? "marker"}s`,
				size: "lg",
				onClose: pt
			}, {
				default: Q(() => [z("div", fa, [it.value ? (G(), R("div", pa, [V(me, { label: "Finding similar media" })])) : at.value ? (G(), R("div", ma, [V(w, {
					name: "error",
					class: "similar-modal__state-icon"
				}), z("p", ha, J(at.value), 1)])) : !it.value && rt.value.length === 0 ? (G(), R("div", ga, [
					V(w, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					n[20] ||= z("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					n[21] ||= z("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), R("ul", _a, [(G(!0), R(P, null, q(rt.value, (e) => (G(), R("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [z("div", va, [e.poster_url ? (G(), R("img", {
					key: 0,
					src: X(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, ya)) : (G(), R("div", ba, [V(w, { name: "film" })]))]), z("div", xa, [z("p", Sa, J(e.name), 1), e.year ? (G(), R("p", Ca, [B(J(e.year) + " ", 1), e.runtime ? (G(), R("span", wa, " · " + J(e.runtime) + "m", 1)) : L("", !0)])) : L("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Be.value ? (G(), I(Ir, {
				key: 7,
				title: e.media.name,
				progress: X(W).progress.value,
				onBack: n[11] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : L("", !0),
			Ve.value ? (G(), I(Ar, {
				key: 8,
				title: e.media.name,
				onBack: n[12] ||= (e) => s("back")
			}, null, 8, ["title"])) : L("", !0),
			X(_).isInRoom ? (G(), I(Fi, {
				key: 9,
				position: X(l).position,
				duration: X(l).duration,
				"is-playing": X(l).playing,
				onSeek: Vn,
				onPlay: n[13] ||= (e) => void E.value?.play()?.catch(() => {}),
				onPause: n[14] ||= (e) => void E.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : L("", !0),
			X(_).isInRoom ? (G(), I(Ti, { key: 10 })) : L("", !0),
			V(ye, {
				modelValue: be.value,
				"onUpdate:modelValue": n[15] ||= (e) => be.value = e,
				onJoined: xe
			}, null, 8, ["modelValue"]),
			V(St, {
				open: j.value,
				onClose: n[16] ||= (e) => j.value = !1
			}, null, 8, ["open"]),
			V(kn, {
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
}), [["__scopeId", "data-v-767f23d0"]]), Ea = "blur(3px) saturate(1.35)";
async function Da(e, t = document, n = 16 / 9) {
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
		"filter" in c && (c.filter = Ea), c.drawImage(r, (64 - u) / 2 - 4, (o - d) / 2 - 4, u + 8, d + 8), "filter" in c && (c.filter = "none"), c.globalCompositeOperation = "destination-in", c.save(), c.translate(32, o / 2), c.scale(32 * Math.SQRT2, o / 2 * Math.SQRT2);
		let f = c.createRadialGradient(0, 0, 0, 0, 0, 1);
		return f.addColorStop(0, "rgba(0, 0, 0, 1)"), f.addColorStop(.75, "rgba(0, 0, 0, 0)"), c.fillStyle = f, c.fillRect(-1, -1, 2, 2), c.restore(), c.globalCompositeOperation = "source-over", s.toDataURL("image/png");
	} catch {
		return null;
	}
}
// src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var Oa = { class: "player-page__stage" }, ka = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Aa = { class: "player-page__blocking-error" }, ja = /*#__PURE__*/ C(/* @__PURE__ */ H({
	__name: "PlayerPage",
	setup(t) {
		let r = /* @__PURE__ */ new Map(), s = i(), { imgSrc: f } = c(), p = a(), m = Re(), g = ze(), { t: v } = o(), y = ke("phlixConfig", null), b = u(), ee = d(), x = h(), S = K(null), ne = K(""), C = K([]), w = K(null), T = K(null), E = K([]), re = K([]), D = K(!0), O = K(null), k = K(!1), A = K(null), ie = K(!1), ae = K(null), oe = K(null), j = F(() => String(m.params.id ?? ""));
		we(() => S.value?.name);
		let se = F(() => f(S.value?.poster_url) || ""), M = K(null);
		Z(se, (e) => {
			if (M.value = null, !e) return;
			let t = typeof window < "u" && window.innerHeight > 0 ? window.innerWidth / window.innerHeight : 16 / 9;
			Da(e, document, t).then((t) => {
				se.value === e && (M.value = t);
			});
		}, { immediate: !0 });
		let ce = F(() => {
			let e = M.value ?? se.value;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), le = null, ue = !1, pe = 0;
		function me(e) {
			return ue || e.generation !== pe;
		}
		function he(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function _e(e) {
			let t = p.value || s.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function ve(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function ye(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function P(e, t, n) {
			let r = () => me(n), i = t.genres?.[0];
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
				if (r() || he(e)) return;
				b.setQueue([]);
			}
		}
		async function Oe(e, t, n) {
			let r = l(s.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function H(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Ae(e, t) {
			ae.value = Se(e, t), oe.value = N(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && b.setQueue(r);
		}
		function je(e) {
			for (let t of r.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function Pe(e, t, n) {
			if (ae.value = null, oe.value = null, !ye(t)) return;
			let i = je(t.id);
			if (i) {
				Ae(i, t.id);
				return;
			}
			let a = () => me(n);
			try {
				let i = await H(e, t, n.controller?.signal);
				if (a()) return;
				let o = await Oe(e, i.id, n.controller?.signal);
				if (a()) return;
				if (xe(o)) {
					let t = o.filter((e) => e.type === "season"), r = await Promise.all(t.map((t) => Oe(e, t.id, n.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...r.flat()];
				}
				let s = be(o);
				s.length && r.set(i.id, s), Ae(s, t.id);
			} catch (e) {
				if (a() || he(e)) return;
				ae.value = null, oe.value = null;
			}
		}
		async function q() {
			let t = j.value;
			le?.abort(), le = typeof AbortController < "u" ? new AbortController() : null, pe += 1;
			let r = {
				generation: pe,
				controller: le
			};
			if (D.value = !0, O.value = null, C.value = [], w.value = null, T.value = null, E.value = [], re.value = [], ae.value = null, oe.value = null, b.hideMiniPlayer(), !t) {
				O.value = v("common.missingMediaId"), D.value = !1;
				return;
			}
			let i = new n({ baseUrl: s.value });
			i.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, r.controller?.signal).then((e) => {
				me(r) || (C.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), w.value = ve(e?.intro_marker), T.value = ve(e?.outro_marker), E.value = tr(e?.audio_tracks), re.value = Ke(e?.subtitle_tracks));
			}).catch(() => null);
			let a = Te(t), o = Date.now();
			if (a && Ee(a, o)) {
				Y(i, a.item, r);
				return;
			}
			let c;
			try {
				c = (await i.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, r.controller?.signal)).item;
			} catch (t) {
				if (me(r) || he(t)) return;
				if (t instanceof e && (t.status === 403 || t.status === 429)) {
					let e = te(t.body, y?.locale);
					if (e !== null) {
						A.value = e, ie.value = !0, D.value = !1;
						return;
					}
				}
				if (a) {
					Y(i, a.item, r);
					return;
				}
				O.value = _(t, y?.locale), D.value = !1;
				return;
			}
			if (!me(r)) {
				if (c) De(t, c, o), Y(i, c, r);
				else {
					if (a) {
						Y(i, a.item, r);
						return;
					}
					O.value = "Couldn’t load media item", D.value = !1;
				}
			}
		}
		async function Y(e, t, n) {
			S.value = t, ee.hydrate(t), ne.value = _e(t), D.value = !1, ye(t) && (await Pe(e, t, n), me(n) || oe.value) || P(e, t, n);
		}
		Ne(q), Z(j, q), Le(() => {
			b.current && b.streamUrl && b.showMiniPlayer();
		}), Me(() => {
			ue = !0, le?.abort(), le = null, x.reset();
		});
		function Fe() {
			g?.back();
		}
		function Ie(e) {
			g?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Be(e) {
			g?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ve(e) {
			k.value = e, x.setTheaterActive(e);
		}
		function He() {
			ie.value = !1, Fe();
		}
		return (e, t) => (G(), R("div", { class: U(["player-page", { "is-theater": k.value }]) }, [
			ce.value && !D.value && !O.value ? (G(), R("div", {
				key: 0,
				class: U(["player-page__ambient", { "is-preblurred": M.value }]),
				style: W(ce.value),
				"aria-hidden": "true"
			}, null, 6)) : L("", !0),
			z("div", Oa, [D.value ? (G(), R("div", ka, [V(Ce, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : O.value ? (G(), I(ge, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: O.value
			}, {
				actions: Q(() => [V(fe, {
					variant: "solid",
					onClick: q
				}, {
					default: Q(() => [...t[1] ||= [B("Retry", -1)]]),
					_: 1
				}), V(fe, {
					variant: "ghost",
					onClick: Fe
				}, {
					default: Q(() => [...t[2] ||= [B("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : S.value ? (G(), I(Ta, {
				key: 2,
				media: S.value,
				"stream-url": ne.value,
				"stream-url-for": _e,
				"api-base": X(s),
				chapters: C.value,
				"intro-marker": w.value,
				"outro-marker": T.value,
				"playback-audio-tracks": E.value,
				"playback-subtitle-tracks": re.value,
				"prev-episode": ae.value,
				"next-episode": oe.value,
				autoplay: !0,
				onBack: Fe,
				onPlayNext: Ie,
				onPlayEpisode: Be,
				onTheater: Ve
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
			])) : L("", !0)]),
			V(de, {
				modelValue: ie.value,
				"onUpdate:modelValue": t[0] ||= (e) => ie.value = e,
				title: "Can’t start playback",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Q(() => [V(fe, {
					variant: "solid",
					onClick: He
				}, {
					default: Q(() => [...t[3] ||= [B("OK", -1)]]),
					_: 1
				})]),
				default: Q(() => [z("p", Aa, J(A.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-3ae2a661"]]);
export { ja as default };

//# sourceMappingURL=PlayerPage-D1mDSRi5.js.map