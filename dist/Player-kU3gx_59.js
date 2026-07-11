import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { n, t as r } from "./Modal-DnGvbsI9.js";
import { t as i } from "./useFocusTrap-DZxA3ZEr.js";
import { a } from "./usePreferencesStore-aFj85Ytq.js";
import { t as o } from "./useMessages-CI_jngTk.js";
import { c as s, r as c, t as l } from "./client-B65CbqT7.js";
import { n as u } from "./useApiBase-CV_r-Kk4.js";
import { o as d } from "./media-query-IVKvZvWX.js";
import { n as f, t as p } from "./ThumbRating-obRiYVSW.js";
import { t as m } from "./Spinner-DVL0OtMK.js";
import { t as h } from "./Button-CnyfCnhY.js";
import { t as g } from "./Slider-B3epfxUp.js";
import { t as _ } from "./Select-Jxt3ozRc.js";
import { c as v, g as y, h as b, i as ee, l as x, m as te, n as S, o as C, p as ne, r as re, s as w, t as T } from "./captions-COgPp5bH.js";
import { n as ie, t as ae } from "./SyncPlayModal-BSwpHbV-.js";
import { Fragment as E, Transition as D, computed as O, createBlock as k, createCommentVNode as A, createElementBlock as j, createElementVNode as M, createTextVNode as N, createVNode as P, defineComponent as F, inject as oe, nextTick as se, normalizeClass as I, normalizeStyle as L, onBeforeUnmount as ce, onMounted as le, openBlock as R, ref as z, renderList as B, toDisplayString as V, toRef as H, unref as U, watch as W, withCtx as ue, withModifiers as G } from "vue";
//#region src/components/player/format-time.ts
function K(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var de = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], fe = { class: "scrubber__track" }, pe = ["title"], me = { class: "scrubber__time numeric" }, he = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "Scrubber",
	props: {
		position: {},
		duration: {},
		buffered: { default: 0 },
		chapters: { default: () => [] },
		thumbnailAt: {},
		step: { default: 5 }
	},
	emits: [
		"seek",
		"scrub-start",
		"scrub-end"
	],
	setup(e, { expose: t, emit: n }) {
		let { t: r } = o(), i = e, a = n, s = z(null), c = z(!1), l = z(!1), u = z(0), d = z(0), f = (e) => Math.min(1, Math.max(0, e)), p = O(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = O(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = O(() => (c.value || l.value) && i.duration > 0), g = O(() => c.value ? u.value : d.value), _ = O(() => g.value * i.duration), v = O(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = O(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = O(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), ee = O(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function x(e) {
			let t = s.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : f((e.clientX - n.left) / n.width);
		}
		function te(e) {
			if (!(i.duration <= 0)) {
				c.value = !0;
				try {
					s.value?.setPointerCapture?.(e.pointerId);
				} catch {}
				u.value = x(e), a("scrub-start"), e.preventDefault();
			}
		}
		function S(e) {
			let t = x(e);
			d.value = t, c.value && (u.value = t);
		}
		function C(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				a("seek", u.value * i.duration), a("scrub-end");
			}
		}
		function ne() {
			l.value = !0;
		}
		function re() {
			l.value = !1;
		}
		function w(e) {
			let t = i.duration;
			if (t <= 0) return;
			let n = null;
			switch (e.key) {
				case "ArrowLeft":
					n = Math.max(0, i.position - i.step);
					break;
				case "ArrowRight":
					n = Math.min(t, i.position + i.step);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t;
					break;
				default: return;
			}
			a("seek", n), e.preventDefault();
		}
		return t({
			playedRatio: p,
			previewActive: h
		}), (t, n) => (R(), j("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": U(K)(e.position),
			"aria-label": U(r)("player.seek"),
			onPointerdown: te,
			onPointermove: S,
			onPointerup: C,
			onPointercancel: C,
			onPointerenter: ne,
			onPointerleave: re,
			onKeydown: w
		}, [M("div", fe, [
			M("div", {
				class: "scrubber__buffered",
				style: L({ transform: `scaleX(${m.value})` })
			}, null, 4),
			M("div", {
				class: "scrubber__played",
				style: L({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(R(!0), j(E, null, B(ee.value, (e, t) => (R(), j("span", {
				key: t,
				class: "scrubber__tick",
				style: L({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, pe))), 128)),
			M("div", {
				class: I(["scrubber__head", { "is-dragging": c.value }]),
				style: L({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (R(), j("div", {
			key: 0,
			class: "scrubber__preview",
			style: L({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (R(), j("div", {
			key: 0,
			class: "scrubber__thumb",
			style: L({ backgroundImage: y.value })
		}, null, 4)) : A("", !0), M("span", me, V(U(K)(_.value)), 1)], 4)) : A("", !0)], 40, de));
	}
}), [["__scopeId", "data-v-3d610715"]]);
//#endregion
//#region src/components/player/hls-playback.ts
function ge(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
async function q(e, t, n = {}) {
	let { default: r } = await import("./hls-Be5Qwv5L.js");
	if (r.isSupported()) {
		let i = new r({
			enableWorker: !0,
			lowLatencyMode: !1,
			startPosition: n.startPosition ?? 0,
			renderTextTracksNatively: !1,
			fragLoadPolicy: { default: {
				maxTimeToFirstByteMs: 3e4,
				maxLoadTimeMs: 12e4,
				timeoutRetry: {
					maxNumRetry: 4,
					retryDelayMs: 0,
					maxRetryDelayMs: 0
				},
				errorRetry: {
					maxNumRetry: 6,
					retryDelayMs: 1e3,
					maxRetryDelayMs: 8e3
				}
			} },
			...n.hlsConfig,
			xhrSetup: (e) => {
				let t = n.getToken?.();
				t && e.setRequestHeader("Authorization", `Bearer ${t}`);
			}
		});
		return i.on(r.Events.MANIFEST_PARSED, () => n.onReady?.()), i.on(r.Events.ERROR, (e, t) => {
			t?.fatal && (n.onError?.(t.details ?? "fatal hls error"), i.destroy());
		}), i.loadSource(t), i.attachMedia(e), {
			destroy() {
				try {
					i.destroy();
				} catch {}
			},
			get levels() {
				return i.levels.map((e, t) => ({
					index: t,
					height: e.height,
					width: e.width,
					bitrate: e.bitrate,
					name: e.name
				}));
			},
			getCurrentLevel() {
				return i.currentLevel;
			},
			setCurrentLevel(e) {
				i.currentLevel = e;
			},
			setNextLevel(e) {
				i.nextLevel = e;
			},
			get autoLevelEnabled() {
				return i.autoLevelEnabled;
			},
			get bandwidthEstimate() {
				return i.bandwidthEstimate;
			},
			onLevelSwitched(e) {
				let t = (t, n) => e(n.level);
				return i.on(r.Events.LEVEL_SWITCHED, t), () => i.off(r.Events.LEVEL_SWITCHED, t);
			},
			get audioTracks() {
				return (i.audioTracks ?? []).map((e, t) => ({
					index: t,
					name: e.name ?? "",
					lang: e.lang ?? "",
					default: e.default ?? !1,
					autoselect: e.autoselect ?? !1
				}));
			},
			getCurrentAudioTrack() {
				return i.audioTrack ?? -1;
			},
			setAudioTrack(e) {
				i.audioTrack = e;
			},
			onAudioTrackSwitched(e) {
				let t = (t, n) => e(n.id);
				return i.on(r.Events.AUDIO_TRACK_SWITCHED, t), () => i.off(r.Events.AUDIO_TRACK_SWITCHED, t);
			}
		};
	}
	if (ge(e)) {
		let r = () => n.onReady?.(), i = () => n.onError?.("native hls error");
		return e.addEventListener("loadedmetadata", r), e.addEventListener("error", i), e.src = t, n.startPosition && (e.currentTime = n.startPosition), {
			destroy() {
				e.removeEventListener("loadedmetadata", r), e.removeEventListener("error", i), e.removeAttribute("src"), e.load();
			},
			levels: [],
			getCurrentLevel: () => -1,
			setCurrentLevel: () => void 0,
			setNextLevel: () => void 0,
			autoLevelEnabled: !0,
			bandwidthEstimate: 0,
			onLevelSwitched: () => () => void 0,
			audioTracks: [],
			getCurrentAudioTrack: () => -1,
			setAudioTrack: () => void 0,
			onAudioTrackSwitched: () => () => void 0
		};
	}
	throw Error("HLS is not supported in this browser");
}
//#endregion
//#region src/components/player/transcode.ts
var _e = new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function J(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Y(e) {
	return e === !0 || e === "true" || e === 1;
}
function X(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function ve(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = J(e.url ?? e.src);
		r !== "" && t.push({
			index: X(e.index),
			language: J(e.language ?? e.lang ?? e.srclang),
			label: J(e.label),
			default: Y(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function ye(e) {
	if (e == null || !Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = X(e.height);
		r <= 0 || t.push({
			id: J(e.id),
			label: J(e.label),
			height: r,
			width: X(e.width),
			bitrate: X(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Z(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function be(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function xe(e) {
	let t = e ?? {};
	return {
		jobId: J(t.job_id ?? t.jobId),
		masterUrl: J(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: J(t.status, "running"),
		reused: Y(t.reused),
		subtitles: ve(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: ye(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Se(e) {
	let t = e ?? {};
	return {
		jobId: J(t.job_id ?? t.jobId),
		status: J(t.status, "running"),
		playlistReady: Y(t.playlist_ready ?? t.playlistReady),
		progress: X(t.progress),
		masterUrl: J(t.master_url ?? t.masterUrl),
		subtitles: ve(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: ye(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ce(e) {
	return e.playlistReady || e.status === "completed";
}
function we(e) {
	return _e.has(e);
}
function Te(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Ee(e) {
	let t = z("idle"), n = z(0), r = z([]), i = z([]), a = z(-1), o = z(!0), s = z(null), c = z(null), u = z([]), d = z(-1);
	function f(e) {
		if (!C) return;
		i.value = C.levels, a.value = C.getCurrentLevel(), o.value = C.autoLevelEnabled;
		let t = e ?? C.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function p() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function m(e) {
		C && (u.value = C.audioTracks, d.value = e ?? C.getCurrentAudioTrack());
	}
	function h() {
		u.value = [], d.value = -1;
	}
	function g(e) {
		!e || e.length === 0 || (c.value = e);
	}
	function _(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: Te(n, e.url)
		}));
	}
	let v = e.attach ?? q, y = e.pollIntervalMs ?? 1e3, b = e.maxWaitMs ?? 12e4, ee = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), x = Math.max(1, Math.ceil(b / Math.max(1, y))), te = De(), S = e.getToken ?? (() => Q(te)), C = null, ne = null, re = null, w = !1;
	function T() {
		return e.client ?? new l({
			baseUrl: e.apiBase(),
			tokenStore: te ?? void 0
		});
	}
	async function ie(i, a, o, s) {
		D(), w = !1, t.value = "preparing", n.value = 0, r.value = [], p();
		try {
			let r = T(), c = xe(await r.post(Z(a, o)));
			if (w) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			_(c.subtitles), g(c.variants);
			let l = Te(e.apiBase(), c.masterUrl), u = c.status === "completed";
			for (let e = 0; !u && e < x; e++) {
				let e = Se(await r.get(be(c.jobId)));
				if (w) return;
				if (n.value = e.progress, _(e.subtitles), g(e.variants), we(e.status)) throw Error(`transcode ${e.status}`);
				if (Ce(e)) {
					u = !0;
					break;
				}
				if (await ee(y), w) return;
			}
			if (!u) throw Error("transcode timed out");
			if (C = await v(i, l, {
				getToken: S,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => f(),
				onError: () => {
					w || (t.value = "error");
				}
			}), w) {
				C.destroy(), C = null;
				return;
			}
			ne = C.onLevelSwitched((e) => f(e)), re = C.onAudioTrackSwitched((e) => m(e)), f(), m(), t.value = "ready";
		} catch {
			w || (t.value = "error");
		}
	}
	function ae(e) {
		C && (C.setCurrentLevel(e === "auto" ? -1 : e), f());
	}
	function E(e) {
		C && (C.setAudioTrack(e), m());
	}
	function D() {
		if (w = !0, ne) {
			try {
				ne();
			} catch {}
			ne = null;
		}
		if (re) {
			try {
				re();
			} catch {}
			re = null;
		}
		if (C) {
			try {
				C.destroy();
			} catch {}
			C = null;
		}
	}
	function O() {
		D(), t.value = "idle", n.value = 0, r.value = [], p(), h();
	}
	return {
		state: t,
		progress: n,
		subtitleTracks: r,
		levels: i,
		currentLevel: a,
		autoEnabled: o,
		activeLevelHeight: s,
		variants: c,
		audioTracks: u,
		currentAudioTrack: d,
		setLevel: ae,
		setAudioTrack: E,
		start: ie,
		cleanup: D,
		reset: O
	};
}
function De() {
	try {
		return new s();
	} catch {
		return null;
	}
}
function Q(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var Oe = 10, ke = 6;
function Ae(e) {
	let t = z(null), n = z(!1), r = z(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new l({ baseUrl: e.apiBase() });
	}
	function o(e, t) {
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
	function s(e) {
		let n = t.value;
		if (!n || !n.sprite_url || !n.timeline || n.timeline.length === 0) return null;
		let r = o(e, n.timeline);
		if (r === null) return null;
		let i = r.frame, a = i % Oe, s = Math.floor(i / Oe), c = a / (Oe - 1) * 100, l = s / (ke - 1) * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function c(o, s) {
		if (!(i.has(o) && (t.value = i.get(o) ?? null, t.value !== null))) {
			n.value = !0, r.value = null;
			try {
				let n = s ?? e.signal, r = await a().getTrickplay(o, n);
				i.set(o, r), t.value = r;
			} catch (e) {
				i.set(o, null), r.value = e instanceof Error ? e.message : "Failed to load trickplay data", t.value = null;
			} finally {
				n.value = !1;
			}
		}
	}
	function u() {
		t.value = null, n.value = !1, r.value = null, i.clear();
	}
	return {
		data: t,
		loading: n,
		error: r,
		thumbnailAt: s,
		fetch: c,
		reset: u
	};
}
//#endregion
//#region src/components/player/shortcuts.ts
var je = [
	{
		id: "playpause",
		keys: ["Space", "K"],
		label: "Play / pause"
	},
	{
		id: "seek5",
		keys: ["ArrowLeft", "ArrowRight"],
		label: "Seek ±5s"
	},
	{
		id: "seek10",
		keys: ["J", "L"],
		label: "Seek ±10s"
	},
	{
		id: "frame",
		keys: [",", "."],
		label: "Frame step (paused)"
	},
	{
		id: "volume",
		keys: ["ArrowUp", "ArrowDown"],
		label: "Volume"
	},
	{
		id: "mute",
		keys: ["M"],
		label: "Mute"
	},
	{
		id: "fullscreen",
		keys: ["F"],
		label: "Fullscreen"
	},
	{
		id: "captions",
		keys: ["C"],
		label: "Captions"
	},
	{
		id: "theater",
		keys: ["T"],
		label: "Theater"
	},
	{
		id: "skipIntro",
		keys: ["I"],
		label: "Skip intro"
	},
	{
		id: "skipOutro",
		keys: ["O"],
		label: "Skip outro"
	},
	{
		id: "pip",
		keys: ["P"],
		label: "Picture-in-picture"
	},
	{
		id: "sleepTimer",
		keys: ["N"],
		label: "Sleep timer"
	},
	{
		id: "seekpct",
		keys: [
			"0",
			"–",
			"9"
		],
		label: "Seek to %"
	},
	{
		id: "speed",
		keys: ["<", ">"],
		label: "Speed"
	},
	{
		id: "help",
		keys: ["?"],
		label: "This help"
	}
], Me = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Ne = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Pe(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Fe(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Ie(e, t) {
	switch (e.key) {
		case " ": return Pe(e.target) ? !1 : (t.playPause(), !0);
		case "k":
		case "K": return t.playPause(), !0;
		case "ArrowLeft": return t.seekBy(-5), !0;
		case "ArrowRight": return t.seekBy(5), !0;
		case "j":
		case "J": return t.seekBy(-10), !0;
		case "l":
		case "L": return t.seekBy(10), !0;
		case ",": return t.frameStep(-1), !0;
		case ".": return t.frameStep(1), !0;
		case "ArrowUp": return t.volumeBy(.05), !0;
		case "ArrowDown": return t.volumeBy(-.05), !0;
		case "m":
		case "M": return t.toggleMute(), !0;
		case "f":
		case "F": return t.toggleFullscreen(), !0;
		case "c":
		case "C": return t.toggleCaptions(), !0;
		case "t":
		case "T": return t.toggleTheater(), !0;
		case "i":
		case "I": return t.skipIntro(), !0;
		case "o":
		case "O": return t.skipOutro(), !0;
		case "p":
		case "P": return t.togglePip(), !0;
		case "n":
		case "N": return t.sleepTimer(), !0;
		case "<": return t.speedStep(-1), !0;
		case ">": return t.speedStep(1), !0;
		case "?": return t.toggleHelp(), !0;
		default: return e.key >= "0" && e.key <= "9" ? (t.seekToPercent(Number(e.key) / 10), !0) : !1;
	}
}
function Le(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Fe(n.target) || Ie(n, e) && n.preventDefault();
	}
	le(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), ce(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Re = ["aria-label"], ze = { class: "shortcuts__head" }, Be = { class: "shortcuts__title" }, Ve = { class: "shortcuts__grid" }, He = { class: "shortcuts__keys" }, Ue = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, We = {
	key: 1,
	class: "shortcuts__key"
}, Ge = { class: "shortcuts__label" }, Ke = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => je }
	},
	emits: ["close"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o(), l = z(null);
		return i(l, H(a, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (R(), j("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= G((e) => s("close"), ["self"])
		}, [M("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": U(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [M("div", ze, [M("h3", Be, V(U(c)("player.keyboard")), 1), P(n, {
			name: "x",
			label: U(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), M("ul", Ve, [(R(!0), j(E, null, B(e.shortcuts, (e) => (R(), j("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [M("span", He, [(R(!0), j(E, null, B(e.keys, (e, n) => (R(), j(E, { key: n }, [e === "–" ? (R(), j("span", Ue, "–")) : (R(), j("kbd", We, [U(Me)[e] ? (R(), k(t, {
			key: 0,
			name: U(Me)[e],
			label: U(Ne)[e] ?? e
		}, null, 8, ["name", "label"])) : (R(), j(E, { key: 1 }, [N(V(e), 1)], 64))]))], 64))), 128))]), M("span", Ge, V(e.label), 1)]))), 128))])], 8, Re)])) : A("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), qe = { class: "volume" }, Je = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "VolumeControl",
	setup(e) {
		let t = d(), r = a(), { t: i } = o(), s = O(() => t.muted ? 0 : t.volume), c = O(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return W(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (R(), j("div", qe, [P(n, {
			name: c.value,
			label: U(t).muted ? U(i)("player.unmute") : U(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => U(t).toggleMute()
		}, null, 8, ["name", "label"]), P(g, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: U(i)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), Ye = /*#__PURE__*/ e(/* @__PURE__ */ F({
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
		], n = d(), { t: r } = o(), i = O(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (R(), k(_, {
			class: "speed-menu",
			tone: "glass",
			"model-value": U(n).rate,
			options: i.value,
			label: U(r)("player.playbackSpeed"),
			"onUpdate:modelValue": a
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), Xe = "auto", Ze = "original";
function Qe(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function $e(e) {
	return e >= 2160 ? "4K" : Qe(e);
}
function et(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Qe(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: $e(r.height)
		}));
	}
	return n;
}
function tt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Qe(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function nt(e, t) {
	if (!t || !(t.height > 0)) return -1;
	let n = -1, r = Infinity;
	for (let i of e) {
		if (i.height !== t.height) continue;
		let e = Math.abs(i.bitrate - t.bitrate);
		e < r && (n = i.index, r = e);
	}
	return n >= 0 ? n : tt(e, Qe(t.height));
}
function rt(e, t) {
	if (t < 0) return Xe;
	let n = e.find((e) => e.index === t);
	return n ? Qe(n.height) : Xe;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var it = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "QualityMenu",
	props: {
		levels: { default: () => [] },
		variants: { default: null },
		currentLevel: { default: -1 },
		autoEnabled: {
			type: Boolean,
			default: !0
		},
		activeHeight: { default: null }
	},
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = d(), s = a(), { t: c } = o(), l = O(() => et(n.levels)), u = O(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!n.variants) return [];
			for (let r of [...n.variants].sort((e, t) => t.height - e.height)) {
				let i = Qe(r.height);
				e.has(i) || tt(n.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: $e(r.height)
				}));
			}
			return t;
		}), f = O(() => l.value.length >= 2 ? l.value : u.value), p = O(() => n.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), m = O(() => nt(n.levels, p.value)), h = O(() => p.value && m.value >= 0 ? {
			value: Ze,
			label: c("player.qualityOriginal", { height: p.value.height })
		} : null), g = O(() => f.value.length >= 2), v = O(() => n.activeHeight == null ? c("player.qualityAuto") : c("player.qualityAutoActive", { label: $e(n.activeHeight) })), y = O(() => [
			{
				value: Xe,
				label: v.value
			},
			...h.value ? [h.value] : [],
			...f.value
		]), b = O(() => n.autoEnabled ? Xe : h.value && n.currentLevel === m.value && (i.quality === "original" || s.defaultQuality === "original") ? Ze : rt(n.levels, n.currentLevel));
		function ee(e) {
			let t = String(e);
			if (t === "auto") {
				i.setQuality(t), s.defaultQuality = t, r("select", "auto");
				return;
			}
			let a = t === "original" ? m.value : tt(n.levels, t);
			a < 0 || (i.setQuality(t), s.defaultQuality = t, r("select", a));
		}
		return (e, t) => g.value ? (R(), k(_, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": b.value,
			options: y.value,
			label: U(c)("player.quality"),
			"onUpdate:modelValue": ee
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : A("", !0);
	}
}), [["__scopeId", "data-v-719cf103"]]), at = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = z([]), i = O(() => x(n.styleConfig)), a = null, o = null;
		function s() {
			r.value = b(a);
		}
		function c() {
			a?.removeEventListener("cuechange", s), o?.removeEventListener("load", s), a = null, o = null;
		}
		function l(e, t) {
			let n = e?.querySelectorAll?.("track");
			if (!n) return null;
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r.track === t) return r;
			}
			return null;
		}
		function u() {
			c(), v(n.video, n.language);
			let e = y(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", s), r.value = b(e), !r.value.length) {
					let t = l(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", s));
				}
			} else r.value = [];
		}
		return W(() => [n.video, n.language], u, { immediate: !0 }), ce(c), t({ lines: r }), (t, n) => r.value.length ? (R(), j("div", {
			key: 0,
			class: I(["player__captions", { "is-lifted": e.lifted }]),
			style: L(i.value)
		}, [(R(!0), j(E, null, B(r.value, (e, t) => (R(), j("p", {
			key: t,
			class: "player__caption-line"
		}, V(e), 1))), 128))], 6)) : A("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), ot = ["aria-label", "aria-expanded"], st = ["aria-label"], ct = { class: "capmenu__head" }, lt = { class: "capmenu__title" }, ut = ["aria-label"], dt = ["aria-checked", "tabindex"], ft = { class: "capmenu__check" }, pt = { class: "capmenu__optlabel" }, mt = [
	"aria-checked",
	"tabindex",
	"onClick"
], ht = { class: "capmenu__check" }, gt = { class: "capmenu__optlabel" }, _t = { class: "capmenu__title capmenu__title--sub" }, vt = ["aria-label"], yt = [
	"aria-checked",
	"tabindex",
	"onClick"
], bt = { class: "capmenu__check" }, xt = { class: "capmenu__optlabel" }, St = { class: "capmenu__title capmenu__title--sub" }, Ct = { class: "capmenu__style" }, wt = { class: "capmenu__field" }, Tt = { class: "capmenu__fieldlabel" }, Et = { class: "capmenu__field" }, Dt = { class: "capmenu__fieldlabel" }, Ot = { class: "capmenu__field" }, kt = { class: "capmenu__fieldlabel" }, At = { class: "capmenu__field" }, jt = { class: "capmenu__fieldlabel" }, Mt = /*#__PURE__*/ e(/* @__PURE__ */ F({
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
	emits: ["update:open", "select-audio"],
	setup(e, { emit: r }) {
		let s = e, c = r, l = d(), u = a(), { t: f } = o(), p = z(null), m = z(null), h = O(() => l.subtitleLang), g = O(() => s.tracks.some((e) => e.language === h.value)), v = O(() => g.value ? "captions" : "captions-off"), y = O(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), b = O(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function x(e) {
			c("update:open", e);
		}
		function te() {
			x(!1);
		}
		function C(e) {
			l.setSubtitle(e), u.defaultSubtitleLang = e, u.subtitlePreferenceSet = !0;
		}
		function ne(e) {
			c("select-audio", e);
		}
		function w(e, t, n) {
			if (t === 0) return null;
			let r = n;
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
		function ie(e) {
			let t = w(e, s.tracks.length + 1, y.value);
			t !== null && C(t === 0 ? null : s.tracks[t - 1].language);
		}
		function ae(e) {
			let t = w(e, s.audioTracks.length, b.value);
			t !== null && ne(s.audioTracks[t].index);
		}
		function D(e) {
			u.captionStyle = {
				...u.captionStyle,
				size: e
			};
		}
		function N(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function F(e) {
			u.captionStyle = {
				...u.captionStyle,
				background: e
			};
		}
		function oe(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		i(m, H(s, "open"), {
			lockScroll: !1,
			onEscape: () => (te(), !0)
		});
		function se(e) {
			p.value && !p.value.contains(e.target) && te();
		}
		return W(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", se, !0) : document.removeEventListener("pointerdown", se, !0));
		}, { immediate: !0 }), ce(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", se, !0);
		}), (r, i) => (R(), j("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [M("button", {
			type: "button",
			class: I(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? U(f)("player.captionsOn") : U(f)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => x(!e.open)
		}, [P(t, { name: v.value }, null, 8, ["name"])], 10, ot), e.open ? (R(), j("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": U(f)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			M("div", ct, [M("h3", lt, V(U(f)("player.subtitles")), 1), P(n, {
				name: "x",
				label: U(f)("common.close"),
				size: "sm",
				onClick: te
			}, null, 8, ["label"])]),
			M("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": U(f)("player.subtitleTrack"),
				onKeydown: ie
			}, [M("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: y.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => C(null)
			}, [M("span", ft, [g.value ? A("", !0) : (R(), k(t, {
				key: 0,
				name: "check"
			}))]), M("span", pt, V(U(f)("player.off")), 1)], 8, dt), (R(!0), j(E, null, B(e.tracks, (e, n) => (R(), j("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: y.value === n + 1 ? 0 : -1,
				onClick: (t) => C(e.language)
			}, [M("span", ht, [h.value === e.language ? (R(), k(t, {
				key: 0,
				name: "check"
			})) : A("", !0)]), M("span", gt, V(e.label), 1)], 8, mt))), 128))], 40, ut),
			e.audioTracks.length > 1 ? (R(), j(E, { key: 0 }, [M("h3", _t, V(U(f)("player.audio")), 1), M("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": U(f)("player.audioTrack"),
				onKeydown: ae
			}, [(R(!0), j(E, null, B(e.audioTracks, (n) => (R(), j("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: b.value === n.index ? 0 : -1,
				onClick: (e) => ne(n.index)
			}, [M("span", bt, [e.activeAudio === n.index ? (R(), k(t, {
				key: 0,
				name: "check"
			})) : A("", !0)]), M("span", xt, V(n.label), 1)], 8, yt))), 128))], 40, vt)], 64)) : A("", !0),
			M("h3", St, V(U(f)("player.captionStyle")), 1),
			M("div", Ct, [
				M("div", wt, [M("span", Tt, V(U(f)("player.size")), 1), P(_, {
					"model-value": U(u).captionStyle.size,
					options: U(ee),
					label: U(f)("player.captionSize"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				M("div", Et, [M("span", Dt, V(U(f)("player.color")), 1), P(_, {
					"model-value": U(u).captionStyle.textColor,
					options: U(S),
					label: U(f)("player.captionColor"),
					"onUpdate:modelValue": N
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				M("div", Ot, [M("span", kt, V(U(f)("player.background")), 1), P(_, {
					"model-value": U(u).captionStyle.background,
					options: U(T),
					label: U(f)("player.captionBackground"),
					"onUpdate:modelValue": F
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				M("div", At, [M("span", jt, V(U(f)("player.edge")), 1), P(_, {
					"model-value": U(u).captionStyle.edge,
					options: U(re),
					label: U(f)("player.captionEdge"),
					"onUpdate:modelValue": oe
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, st)) : A("", !0)], 512));
	}
}), [["__scopeId", "data-v-bce771b9"]]), Nt = 32, Pt = 18, Ft = 250, It = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Lt(e, t, n, r, i, a, o) {
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
		r: It(d / m),
		g: It(f / m),
		b: It(p / m)
	};
}
function Rt(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Lt(e, t, n, 0, 0, r, n),
		right: Lt(e, t, n, t - r, 0, t, n),
		center: Lt(e, t, n, 0, 0, t, n)
	};
}
function zt({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function Bt({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Vt(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Bt(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Bt(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Bt(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Ht(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Ut = /*#__PURE__*/ e(/* @__PURE__ */ F({
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
		let n = e, r = z(!1), i = null;
		function a() {
			r.value = Ht(i);
		}
		let o = O(() => n.enabled && !n.reducedMotion && !r.value), s = O(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = z(null), l = null, u = null, d = !1, f = !1;
		function p() {
			if (d) return u;
			if (f || typeof document > "u") return f = !0, null;
			l = document.createElement("canvas"), l.width = 32, l.height = 18;
			try {
				u = l.getContext("2d", { willReadFrequently: !0 });
			} catch {
				u = null;
			}
			return u ? (d = !0, u) : (f = !0, null);
		}
		function m() {
			let e = n.video;
			if (!o.value || !e || !e.videoWidth || !e.videoHeight) return;
			let t = p();
			if (t) try {
				t.drawImage(e, 0, 0, 32, 18);
				let { data: n } = t.getImageData(0, 0, 32, 18);
				c.value = Vt(Rt(n, 32, 18));
			} catch {
				f = !0, c.value = null;
			}
		}
		function h(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let g = null, _ = null, v = null, y = 0, b = !1;
		function ee(e) {
			_ = e, g = e.requestVideoFrameCallback(x);
		}
		function x(e) {
			if (!b) return;
			e - y >= 250 && (y = e, m());
			let t = n.video;
			h(t) && ee(t);
		}
		function te() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			if (h(e)) {
				b = !0, y = 0, ee(e);
				return;
			}
			m(), !f && (b = !0, v = setInterval(m, 250));
		}
		function S() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		W(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			S(), e && t && te();
		}, { immediate: !0 }), le(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ce(() => {
			S(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let C = O(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (R(), j("div", {
			class: I(["player__ambient", { "is-active": o.value }]),
			style: L(o.value ? C.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Wt = ["aria-label"], Gt = { class: "resume__label" }, Kt = { class: "resume__time numeric" }, qt = { class: "resume__actions" }, Jt = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o(), a = O(() => i("player.resumeFrom").split("{time}"));
		return (n, o) => (R(), j("div", {
			class: "resume",
			role: "region",
			"aria-label": U(i)("player.resumePlayback")
		}, [M("p", Gt, [
			N(V(a.value[0]), 1),
			M("span", Kt, V(U(K)(e.seconds)), 1),
			N(V(a.value[1]), 1)
		]), M("div", qt, [M("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: o[0] ||= (e) => r("resume")
		}, [P(t, { name: "play" }), M("span", null, V(U(i)("player.resume")), 1)]), M("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: o[1] ||= (e) => r("restart")
		}, [P(t, { name: "rewind" }), M("span", null, V(U(i)("player.startOver")), 1)])])], 8, Wt));
	}
}), [["__scopeId", "data-v-271c5209"]]), Yt = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], $ = [
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
], Xt = new Set($);
function Zt(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Qt(...e) {
	return e.some((e) => Xt.has(Zt(e)));
}
function $t(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function en(e) {
	return e?.error?.code === 2;
}
function tn(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = typeof e.index == "number" && Number.isInteger(e.index) && e.index >= 0 ? e.index : t.length, i = typeof e.language == "string" ? e.language : "", a = typeof e.title == "string" ? e.title : "", o = e.stream_index ?? e.streamIndex;
		t.push({
			index: r,
			streamIndex: typeof o == "number" ? o : r,
			language: i,
			label: a || i || `Audio ${r + 1}`,
			default: e.default === !0
		});
	}
	return t;
}
var nn = 8, rn = 15, an = 2 * Math.PI * 15;
function on(e, t, n = an) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var sn = ["aria-label"], cn = ["src"], ln = { class: "upnext__body" }, un = { class: "upnext__eyebrow" }, dn = { class: "upnext__title" }, fn = {
	key: 0,
	class: "upnext__cd numeric"
}, pn = { class: "upnext__actions" }, mn = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, hn = ["r"], gn = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], _n = /*#__PURE__*/ e(/* @__PURE__ */ F({
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
	setup(e, { emit: n }) {
		let { t: r } = o(), i = e, a = n, s = O(() => i.posterUrl ?? i.media.poster_url ?? null), c = O(() => on(i.remaining, i.total));
		return (n, i) => (R(), j("aside", {
			class: "upnext",
			role: "region",
			"aria-label": U(r)("player.upNext")
		}, [
			s.value ? (R(), j("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, cn)) : A("", !0),
			M("div", ln, [
				M("p", un, V(U(r)("player.upNext")), 1),
				M("h4", dn, V(e.media.name), 1),
				e.counting ? (R(), j("p", fn, V(U(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : A("", !0),
				M("div", pn, [M("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [P(t, { name: "play" }), M("span", null, V(U(r)("player.playNow")), 1)]), M("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, V(U(r)("player.cancel")), 1)])
			]),
			e.counting ? (R(), j("svg", mn, [M("circle", {
				cx: "18",
				cy: "18",
				r: U(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, hn), M("circle", {
				cx: "18",
				cy: "18",
				r: U(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": U(an),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, gn)])) : A("", !0)
		], 8, sn));
	}
}), [["__scopeId", "data-v-85909b2d"]]), vn = {
	class: "transcode",
	role: "alert"
}, yn = { class: "transcode__card" }, bn = { class: "transcode__heading" }, xn = { class: "transcode__body" }, Sn = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o();
		return (n, a) => (R(), j("div", vn, [M("div", yn, [
			P(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			M("h3", bn, V(U(i)("player.transcodeHeading")), 1),
			M("p", xn, V(e.title ? U(i)("player.transcodeBodyTitled", { title: e.title }) : U(i)("player.transcodeBodyUntitled")), 1),
			M("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [P(t, { name: "arrow-left" }), M("span", null, V(U(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), Cn = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, wn = { class: "prep__card" }, Tn = { class: "prep__heading" }, En = { class: "prep__body" }, Dn = ["aria-valuenow"], On = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = o(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (R(), j("div", Cn, [M("div", wn, [
			P(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			M("h3", Tn, V(U(r)("player.transcodePreparingHeading")), 1),
			M("p", En, V(e.title ? U(r)("player.transcodePreparingTitled", { title: e.title }) : U(r)("player.transcodePreparingUntitled")), 1),
			M("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [M("div", {
				class: "prep__bar-fill",
				style: L({ width: i() + "%" })
			}, null, 4)], 8, Dn),
			M("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [P(t, { name: "arrow-left" }), M("span", null, V(U(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), kn = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: n }) {
		let r = e, i = n, { t: a } = o();
		function s(e, t) {
			return !!t && t.end > t.start && e >= t.start && e < t.end;
		}
		let c = O(() => s(r.position, r.introMarker) ? {
			label: a("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: a("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (R(), k(D, { name: "skip" }, {
			default: ue(() => [c.value ? (R(), j("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: G(l, ["stop"])
			}, [M("span", null, V(c.value.label), 1), P(t, { name: "skip-forward" })])) : A("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), An = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, jn = ["aria-label", "onClick"], Mn = { class: "skip-controls__label" }, Nn = 5, Pn = 30, Fn = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(e, { emit: n }) {
		let r = e, i = n, { t: a } = o();
		function s(e) {
			return e / 1e3;
		}
		function c(e, t) {
			return t >= s(e.endMs);
		}
		function l(e, t) {
			if (c(e, t)) return !1;
			let n = s(e.startMs), r = n - Nn, i = n + Pn;
			return t >= r && t < i;
		}
		let u = [
			"intro",
			"outro",
			"credits"
		];
		function d(e) {
			switch (e) {
				case "intro": return a("player.skipLabelIntro");
				case "outro": return a("player.skipLabelCredits");
				case "credits": return a("player.skipLabelCredits");
				case "ad": return a("player.skipLabelSkipCredits");
			}
		}
		let f = O(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (R(), j("div", An, [(R(!0), j(E, null, B(f.value, (e) => (R(), j("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: G((t) => p(e), ["stop"])
		}, [M("span", Mn, V(d(e.type)), 1), P(t, { name: "skip-forward" })], 8, jn))), 128))])) : A("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), In = ["aria-label", "aria-expanded"], Ln = ["aria-label"], Rn = { class: "chapterlist__head" }, zn = { class: "chapterlist__title" }, Bn = ["aria-label"], Vn = ["onClick"], Hn = { class: "chapterlist__index" }, Un = { class: "chapterlist__name" }, Wn = { class: "chapterlist__meta" }, Gn = { class: "chapterlist__time" }, Kn = {
	key: 0,
	class: "chapterlist__duration"
}, qn = {
	key: 1,
	class: "chapterlist__empty"
}, Jn = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "ChapterList",
	props: {
		chapters: { default: () => [] },
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "seek"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o();
		function l() {
			s("update:open", !1);
		}
		function u() {
			s("update:open", !a.open);
		}
		let d = O(() => a.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = K(e.start), a;
			return e.end != null && e.end > e.start && (a = K(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = z(null), p = z(null);
		i(p, H(a, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		W(() => a.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), ce(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (R(), j("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [M("button", {
			type: "button",
			class: I(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": U(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [P(t, { name: "list" })], 10, In), e.open ? (R(), j("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": U(c)("player.chapterList"),
			tabindex: "-1"
		}, [M("div", Rn, [M("h3", zn, V(U(c)("player.chapters")), 1), P(n, {
			name: "x",
			label: U(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (R(), j("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": U(c)("player.chapterList")
		}, [(R(!0), j(E, null, B(d.value, (e) => (R(), j("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [M("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			M("span", Hn, V(e.index), 1),
			M("span", Un, V(e.label), 1),
			M("span", Wn, [M("span", Gn, V(e.startLabel), 1), e.durationLabel ? (R(), j("span", Kn, "· " + V(e.durationLabel), 1)) : A("", !0)])
		], 8, Vn)]))), 128))], 8, Bn)) : (R(), j("p", qn, V(U(c)("player.noChapters")), 1))], 8, Ln)) : A("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Yn = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Xn = { class: "marker-timeline__ticks" }, Zn = [
	"title",
	"aria-label",
	"onClick"
], Qn = { class: "marker-timeline__tooltip" }, $n = { class: "marker-timeline__tooltip-label" }, er = { class: "marker-timeline__tooltip-time numeric" }, tr = ["onClick"], nr = /*#__PURE__*/ e(/* @__PURE__ */ F({
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
		let s = O(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = O(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = O(() => c.value !== null), u = O(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (R(), j("div", {
			key: 0,
			class: I(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (R(), j("div", Yn, [t[0] ||= M("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [M("polygon", { points: "5,3 19,12 5,21" })], -1), N(" " + V(u.value), 1)])) : A("", !0), M("div", Xn, [(R(!0), j(E, null, B(s.value, (e) => (R(), j("button", {
			key: e.id,
			type: "button",
			class: I(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: L({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${U(K)(e.startSec)}`,
			"aria-label": `${e.label} at ${U(K)(e.startSec)}`,
			onClick: G((t) => d(e), ["stop"])
		}, [M("span", Qn, [
			M("span", $n, V(e.label), 1),
			M("span", er, V(U(K)(e.startSec)), 1),
			M("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: G((t) => f(e), ["stop"])
			}, " Find similar ", 8, tr)
		])], 14, Zn))), 128))])], 2)) : A("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), rr = ["aria-label", "aria-expanded"], ir = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, ar = ["aria-label"], or = ["aria-selected", "onClick"], sr = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(e, { expose: n }) {
		let r = e, { t: i } = o(), a = [
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
		], s = z(0), c = z(0), l = O(() => c.value > 0), u;
		function d() {
			u &&= (clearInterval(u), void 0);
		}
		function f(e) {
			d(), c.value = e, !(e <= 0) && (u = setInterval(() => {
				--c.value, c.value <= 0 && (d(), c.value = 0, r.onExpire());
			}, 1e3));
		}
		function p(e) {
			s.value = e, e === 0 ? (d(), c.value = 0) : f(e);
		}
		function m(e) {
			let t = Math.floor(e / 60), n = e % 60;
			return `${t}:${String(n).padStart(2, "0")}`;
		}
		let h = z(!1);
		function g() {
			l.value ? (p(0), h.value = !1) : h.value = !h.value;
		}
		function _(e) {
			p(e), h.value = !1;
		}
		return ce(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (R(), j("div", { class: I(["sleep-timer", { "is-active": l.value }]) }, [M("button", {
			type: "button",
			class: I(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : U(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [P(t, { name: "moon" }), l.value ? (R(), j("span", ir, V(m(c.value)), 1)) : A("", !0)], 10, rr), P(D, { name: "dropdown" }, {
			default: ue(() => [h.value ? (R(), j("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": U(i)("player.sleepTimer")
			}, [(R(), j(E, null, B(a, (e) => M("li", {
				key: e.value,
				class: I(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, V(e.label), 11, or)), 64))], 8, ar)) : A("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), cr = {
	key: 0,
	class: "syncplay-overlay"
}, lr = { class: "syncplay-overlay__badge" }, ur = { class: "syncplay-overlay__label" }, dr = { class: "syncplay-overlay__status-label" }, fr = { class: "syncplay-overlay__members" }, pr = { class: "syncplay-overlay__member-count" }, mr = { class: "syncplay-overlay__member-list" }, hr = { class: "syncplay-overlay__member-name" }, gr = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, _r = /*#__PURE__*/ e(/* @__PURE__ */ F({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = o(), i = ie(), a = u(), s = O(() => n.apiBase ?? a.value), c = O(() => i.currentRoom?.name ?? "SyncPlay"), l = O(() => i.onlineMembers.length), d = O(() => i.syncStatus), f = O(() => {
			switch (d.value) {
				case "synced": return r("syncplay.synced");
				case "outOfSync": return r("syncplay.outOfSync");
				case "re-syncing": return r("syncplay.reSyncing");
				default: return r("syncplay.synced");
			}
		}), p = O(() => {
			switch (d.value) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		});
		async function m() {
			await i.leaveRoom(s.value);
		}
		return (e, n) => U(i).isInRoom ? (R(), j("div", cr, [
			M("div", lr, [P(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), M("span", ur, "SyncPlay: " + V(c.value), 1)]),
			M("div", { class: I(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [P(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), M("span", dr, V(f.value), 1)], 2),
			M("div", fr, [M("span", pr, [P(t, { name: "user" }), N(" " + V(l.value) + " " + V(U(r)("syncplay.members", { count: l.value })), 1)]), M("ul", mr, [(R(!0), j(E, null, B(U(i).onlineMembers.slice(0, 5), (e) => (R(), j("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= M("span", { class: "syncplay-overlay__member-dot" }, null, -1), M("span", hr, V(e.name), 1)]))), 128)), U(i).onlineMembers.length > 5 ? (R(), j("li", gr, " +" + V(U(i).onlineMembers.length - 5) + " more ", 1)) : A("", !0)])]),
			P(h, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: ue(() => [N(V(U(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : A("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), vr = {
	key: 0,
	class: "syncplay-controls"
}, yr = ["aria-label"], br = { class: "syncplay-controls__wait-label" }, xr = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, Sr = { key: 0 }, Cr = { class: "syncplay-controls__transport" }, wr = ["aria-label"], Tr = ["aria-label"], Er = ["aria-label"], Dr = { class: "syncplay-controls__status-label" }, Or = 10, kr = /*#__PURE__*/ e(/* @__PURE__ */ F({
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
	setup(e, { emit: n }) {
		let r = e, i = n, { t: a } = o(), s = ie(), c = u(), l = O(() => r.apiBase ?? c.value), d = z(!1), f = z([]), p = O(() => d.value || s.syncStatus === "re-syncing");
		async function m() {
			if (s.isInRoom) try {
				await s.sendCommand(l.value, "play"), i("play");
			} catch (e) {
				console.error("[SyncPlay] Failed to send play command:", e);
			}
		}
		async function h() {
			if (s.isInRoom) try {
				await s.sendCommand(l.value, "pause"), i("pause");
			} catch (e) {
				console.error("[SyncPlay] Failed to send pause command:", e);
			}
		}
		async function g() {
			r.isPlaying ? await h() : await m();
		}
		async function _(e) {
			if (s.isInRoom) try {
				await s.sendCommand(l.value, "seek", { position: e }), i("seek", e);
			} catch (e) {
				console.error("[SyncPlay] Failed to send seek command:", e);
			}
		}
		async function v() {
			await _(Math.max(0, r.position - Or));
		}
		async function y() {
			await _(Math.min(r.duration, r.position + Or));
		}
		return W(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => U(s).isInRoom ? (R(), j("div", vr, [
			p.value ? (R(), j("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": U(a)("syncplay.waitingForMembers")
			}, [
				P(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				M("span", br, V(U(a)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (R(), j("span", xr, [N(V(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (R(), j("span", Sr, "+" + V(f.value.length - 3), 1)) : A("", !0)])) : A("", !0)
			], 8, yr)) : A("", !0),
			M("div", Cr, [
				M("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": U(a)("syncplay.rewind"),
					onClick: v
				}, [P(t, { name: "rewind" })], 8, wr),
				M("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? U(a)("syncplay.pauseAll") : U(a)("syncplay.playAll"),
					onClick: g
				}, [P(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Tr),
				M("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": U(a)("syncplay.fastForward"),
					onClick: y
				}, [P(t, { name: "forward" })], 8, Er)
			]),
			M("div", { class: I(["syncplay-controls__status", `syncplay-controls__status--${U(s).syncStatus}`]) }, [P(t, {
				name: U(s).syncStatus === "synced" ? "check" : U(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), M("span", Dr, V(U(s).syncStatus === "synced" ? U(a)("syncplay.synced") : U(s).syncStatus === "outOfSync" ? U(a)("syncplay.outOfSync") : U(a)("syncplay.reSyncing")), 1)], 2)
		])) : A("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), Ar = { class: "player__stage" }, jr = ["src", "poster"], Mr = [
	"src",
	"srclang",
	"label",
	"default"
], Nr = { class: "player__meta" }, Pr = ["aria-label"], Fr = { class: "player__meta-text" }, Ir = { class: "player__eyebrow" }, Lr = { class: "player__title" }, Rr = { class: "player__sub numeric" }, zr = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Br = {
	key: 0,
	class: "player__center"
}, Vr = ["aria-label"], Hr = { class: "player__btnrow" }, Ur = ["aria-label"], Wr = ["aria-label"], Gr = ["aria-label"], Kr = { class: "player__time numeric" }, qr = ["aria-label", "aria-pressed"], Jr = ["aria-label"], Yr = ["aria-label"], Xr = ["aria-label", "aria-pressed"], Zr = ["aria-label", "aria-pressed"], Qr = ["aria-label"], $r = { class: "similar-modal" }, ei = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, ti = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, ni = { class: "similar-modal__state-title" }, ri = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, ii = {
	key: 3,
	class: "similar-modal__results"
}, ai = { class: "similar-modal__poster" }, oi = ["src", "alt"], si = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, ci = { class: "similar-modal__result-body" }, li = { class: "similar-modal__result-title" }, ui = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, di = { key: 0 }, fi = /*#__PURE__*/ e(/* @__PURE__ */ F({
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
		"play-episode"
	],
	setup(e, { emit: n }) {
		let i = e, s = n, l = d(), u = a(), { t: h } = o(), g = ie(), _ = f(), v = O(() => _.isFavorite(i.media.id)), y = O(() => _.likeLevel(i.media.id));
		function b() {
			_.toggleFavorite(i.media.id, J());
		}
		function ee(e) {
			_.setLike(i.media.id, e, J());
		}
		let x = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], S = z(null), re = z(null), T = z(!0), D = z(!1), F = z(!1), L = z(!1), H = z(!1), de = z(!1), fe = z(!1), pe = z(null), me = z(!1), ge = O(() => H.value ? 1.35 : 1), q = z(Qt(i.streamUrl, i.media.path)), _e = oe("phlixConfig", null);
		function J() {
			return _e?.apiBase ?? "";
		}
		let Y = Ee({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: _e?.playerHlsConfig
		}), X = Ae({ apiBase: () => i.apiBase ?? "" }), ve = O(() => i.thumbnailAt ?? X.thumbnailAt), ye = O(() => q.value ? void 0 : i.streamUrl), Z = O(() => q.value && Y.state.value !== "ready"), be = O(() => q.value && (Y.state.value === "preparing" || Y.state.value === "idle")), xe = O(() => q.value && Y.state.value === "error");
		function Se(e = 0) {
			let t = S.value;
			t && Y.start(t, i.media.id, void 0, e);
		}
		function Ce(e) {
			Y.setLevel(e);
		}
		let we = !1;
		W(() => Y.levels.value, (e) => {
			if (we || e.length === 0) return;
			we = !0;
			let t = u.defaultQuality;
			if (!t || t === "auto") return;
			let n = t === "original" ? nt(e, Y.variants.value?.find((e) => e.id === "original") ?? null) : tt(e, t);
			n >= 0 && Y.setLevel(n);
		});
		let Te = z(l.resumePositionFor(i.media.id) ?? 0), De = z(!q.value && Te.value > 0), Q = null, Oe = z(!1), ke = z(8), je, Me = z(null), Ne = z(0), Pe = z(!1), Fe = z([]), Ie = z(!1), Re = z(null);
		function ze(e, t) {
			Me.value = e, Ne.value = t, Fe.value = [], Re.value = null, Pe.value = !0, Ve(e, t);
		}
		let Be = null;
		async function Ve(e, t) {
			Be?.abort(), Be = new AbortController(), Ie.value = !0, Re.value = null;
			try {
				let n = await c.searchByMarker(e, t, 30, 20, Be.signal);
				Fe.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Re.value = "Failed to load similar media. Please try again.", Fe.value = [];
			} finally {
				Ie.value = !1;
			}
		}
		function He() {
			Be?.abort(), Pe.value = !1, Fe.value = [], Re.value = null, Me.value = null;
		}
		let Ue = O(() => l.upNext);
		function We() {
			q.value = Qt(i.streamUrl, i.media.path), Te.value = l.resumePositionFor(i.media.id) ?? 0, De.value = !q.value && Te.value > 0, Q = null, Pt = !1, xt = !1, St = !1, mt.value = -1, Ot = null, we = !1, Ze(), Oe.value = !1, Y.reset(), S.value && (S.value.currentTime = 0), q.value && Se(), X.fetch(i.media.id);
		}
		function Ge(e) {
			let t = S.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Q = Math.max(0, e));
		}
		function qe() {
			Ge(Te.value), De.value = !1, S.value?.play()?.catch(() => {});
		}
		function Xe() {
			Q = null, Ge(0), l.clearResume(i.media.id), De.value = !1, S.value?.play()?.catch(() => {});
		}
		function Ze() {
			je &&= (clearInterval(je), void 0);
		}
		function Qe() {
			ke.value = 8, Ze(), je = setInterval(() => {
				--ke.value, ke.value <= 0 && (Ze(), et());
			}, 1e3);
		}
		function $e() {
			mn(), T.value = !0, l.upNext && (Oe.value = !0, u.autoplay && Qe());
		}
		function et() {
			Ze(), Oe.value = !1;
			let e = l.next(i.streamUrlFor);
			e && s("play-next", e);
		}
		function rt() {
			Ze(), Oe.value = !1;
		}
		function ot() {
			if (q.value) return;
			let e = S.value, t = en(e) && (e?.currentTime ?? 0) === 0;
			($t(e) || t) && (q.value = !0, Se(e?.currentTime ?? 0));
		}
		let st = z([]), ct = z([]), lt = z(-1), ut = z(!1), dt = O(() => Y.state.value === "ready" && Y.audioTracks.value.length > 0), ft = O(() => Y.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), pt = O(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), mt = z(-1), ht = O(() => !dt.value && !q.value && ct.value.length === 0 && pt.value.length > 1), gt = O(() => dt.value ? ft.value : ht.value ? pt.value : ct.value), _t = O(() => {
			if (dt.value) return Y.currentAudioTrack.value;
			if (ht.value) {
				if (mt.value >= 0) return mt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return lt.value;
		}), vt = z(!1), yt = l.subtitleLang, bt = O(() => q.value ? Y.subtitleTracks.value : i.playbackSubtitleTracks ?? []), xt = !1, St = !1;
		function Ct() {
			if (xt) return;
			if (u.subtitlePreferenceSet) {
				xt = !0;
				return;
			}
			let e = bt.value.find((e) => e.default);
			if (!e) return;
			let t = st.value.find((t) => t.language === (e.language || e.label));
			t && (l.setSubtitle(t.language), yt = t.language, xt = !0);
		}
		function wt() {
			if (St) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = gt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = _t.value;
			r >= 0 && r < t.length || (kt(n), St = !0);
		}
		let Tt = O(() => st.value.some((e) => e.language === l.subtitleLang));
		function Et() {
			let e = S.value;
			st.value = te(e), ct.value = ne(e), lt.value = C(e), Ct(), wt();
		}
		function Dt() {
			if (Tt.value) yt = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = yt && st.value.some((e) => e.language === yt) ? yt : st.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			s("captions");
		}
		let Ot = null;
		function kt(e) {
			if (dt.value) Y.setAudioTrack(e);
			else if (ht.value) {
				if (e === _t.value) return;
				mt.value = e, Ot = e, q.value = !0, Se(S.value?.currentTime ?? 0);
			} else w(S.value, e), lt.value = e;
		}
		W(dt, (e) => {
			if (!e || Ot === null) return;
			let t = Ot;
			Ot = null, t >= 0 && t < Y.audioTracks.value.length && Y.setAudioTrack(t);
		}), W(bt, () => {
			se(() => Et());
		}, { deep: !0 });
		let At = null, jt, Nt = O(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Pt = !1;
		function Ft() {
			if (!i.autoplay || Pt || De.value || Z.value) return;
			let e = S.value;
			if (!e || !e.paused) return;
			Pt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, l.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function It() {
			Ft();
		}
		function Lt() {
			i.prevEpisode && s("play-episode", i.prevEpisode);
		}
		function Rt() {
			i.nextEpisode && s("play-episode", i.nextEpisode);
		}
		function zt() {
			let e = S.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Bt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Vt() {
			l.play();
		}
		function Ht() {
			l.pause();
		}
		function Wt() {
			let e = S.value;
			e && (l.updateProgress(e.currentTime, e.duration, Bt(e)), l.setMediaPositionState());
		}
		function Gt() {
			let e = S.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, Q !== null && (e.currentTime = e.duration ? Math.min(e.duration, Q) : Q, Q = null), l.updateProgress(e.currentTime, e.duration, Bt(e)), l.setMediaPositionState(), Et());
		}
		function Kt() {
			let e = S.value;
			e && l.updateProgress(e.currentTime, e.duration, Bt(e));
		}
		function qt() {
			let e = S.value;
			e && (Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function Yt() {
			let e = S.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate);
		}
		function $(e) {
			let t = S.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function Xt() {
			F.value = !0, gn();
		}
		function Zt() {
			F.value = !1, gn();
		}
		function tn(e) {
			let t = x.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(x[e] - l.rate) ? n : e, 0), n = x[Math.min(x.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function nn() {
			if (!i.markers) return;
			let e = l.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function rn() {
			if (!i.markers) return;
			let e = l.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function an() {
			pe.value?.toggleOpen();
		}
		function on() {
			let e = S.value;
			if (!e) {
				l.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), l.pause();
				return;
			}
			let t = .05, n = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(n), e.volume = 0, e.pause(), l.pause());
			}, 50);
		}
		Le({
			playPause: zt,
			seekBy: (e) => $(l.position + e),
			frameStep: (e) => {
				l.playing || $(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: sn,
			toggleFullscreen: ln,
			toggleCaptions: Dt,
			toggleTheater: cn,
			togglePip: dn,
			skipIntro: nn,
			skipOutro: rn,
			sleepTimer: an,
			seekToPercent: (e) => $(e * l.duration),
			speedStep: tn,
			toggleHelp: () => {
				L.value = !L.value;
			}
		}, { enabled: () => !L.value && !ut.value && !vt.value });
		function sn() {
			l.toggleMute();
		}
		function cn() {
			H.value = !H.value, s("theater", H.value);
		}
		W(() => l.muted, (e) => {
			let t = S.value;
			t && t.muted !== e && (t.muted = e);
		}), W(() => l.volume, (e) => {
			let t = S.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), W(() => l.rate, (e) => {
			let t = S.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), W(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Ge(e.value) : e.type === "seekBy" && Ge(l.position + e.value));
		});
		function ln() {
			if (typeof document > "u") return;
			let e = re.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function un() {
			D.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function dn() {
			let e = S.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function fn() {
			de.value = !0;
		}
		function pn() {
			de.value = !1;
		}
		function mn() {
			jt &&= (clearTimeout(jt), void 0);
		}
		function hn() {
			mn(), !(!l.playing || F.value) && (jt = setTimeout(() => {
				l.playing && !F.value && (T.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function gn() {
			T.value = !0, hn();
		}
		W(() => l.playing, (e) => {
			e ? (De.value = !1, rt(), hn()) : (mn(), T.value = !0);
		});
		let vn = null;
		return le(() => {
			l.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), _.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", un), fe.value = document.pictureInPictureEnabled === !0), vn = l.bindMediaSession({
				onPlay: () => void S.value?.play()?.catch(() => {}),
				onPause: () => S.value?.pause(),
				onSeek: (e) => $(e)
			}), At = S.value?.textTracks ?? null, At?.addEventListener?.("addtrack", Et), At?.addEventListener?.("removetrack", Et), Et(), q.value && Se(), X.fetch(i.media.id);
		}), W(() => i.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), We();
		}), W(() => i.media?.id, () => {
			_.hydrate(i.media);
		}), W(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (S.value?.play(), l.play()) : e.state === "paused" && (S.value?.pause(), l.pause()));
		}), ce(() => {
			mn(), Ze(), Y.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", un), vn?.(), At?.removeEventListener?.("addtrack", Et), At?.removeEventListener?.("removetrack", Et);
		}), (n, i) => (R(), j("div", {
			ref_key: "containerRef",
			ref: re,
			class: I(["player", {
				"is-chrome-hidden": !T.value,
				"is-theater": H.value
			}]),
			onPointermove: gn,
			onPointerdown: gn,
			onFocusin: gn
		}, [P(Ut, {
			video: S.value,
			enabled: U(u).atmosphere,
			playing: U(l).playing,
			"reduced-motion": U(u).effectiveReducedMotion,
			intensity: ge.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), M("div", Ar, [
			M("video", {
				ref_key: "videoRef",
				ref: S,
				class: "player__video",
				src: ye.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Vt,
				onPause: Ht,
				onTimeupdate: Wt,
				onLoadedmetadata: Gt,
				onCanplay: It,
				onProgress: Kt,
				onVolumechange: qt,
				onRatechange: Yt,
				onEnded: $e,
				onError: ot,
				onEnterpictureinpicture: fn,
				onLeavepictureinpicture: pn,
				onClick: zt
			}, [(R(!0), j(E, null, B(bt.value, (e) => (R(), j("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Mr))), 128))], 40, jr),
			i[17] ||= M("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[18] ||= M("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			M("div", Nr, [M("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": U(h)("player.back"),
				onClick: i[0] ||= G((e) => s("back"), ["stop"])
			}, [P(t, { name: "arrow-left" })], 8, Pr), M("div", Fr, [
				M("p", Ir, V(U(h)("player.nowPlaying")), 1),
				M("h2", Lr, V(e.media.name), 1),
				M("div", Rr, [(R(!0), j(E, null, B(Nt.value, (e, t) => (R(), j(E, { key: t }, [t > 0 && !e.cert ? (R(), j("span", zr, "·")) : A("", !0), M("span", { class: I({ player__cert: e.cert }) }, V(e.text), 3)], 64))), 128))])
			])]),
			Z.value ? A("", !0) : (R(), j("div", Br, [M("button", {
				type: "button",
				class: I(["player__bigplay", { "is-playing": U(l).playing }]),
				"aria-label": U(l).playing ? U(h)("player.pause") : U(h)("player.play"),
				onClick: G(zt, ["stop"])
			}, [P(t, { name: U(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Vr)])),
			P(at, {
				video: S.value,
				language: U(l).subtitleLang,
				"style-config": U(u).captionStyle,
				lifted: T.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			Z.value ? A("", !0) : (R(), j("div", {
				key: 1,
				class: "player__controls",
				onClick: i[5] ||= G(() => {}, ["stop"])
			}, [
				P(he, {
					position: U(l).position,
					duration: U(l).duration,
					buffered: U(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": ve.value,
					onSeek: $,
					onScrubStart: Xt,
					onScrubEnd: Zt
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				U(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (R(), k(nr, {
					key: 0,
					position: U(l).position,
					duration: U(l).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: ze
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : A("", !0),
				M("div", Hr, [
					e.prevEpisode ? (R(), j("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": U(h)("player.previousEpisode"),
						onClick: Lt
					}, [P(t, { name: "skip-back" })], 8, Ur)) : A("", !0),
					M("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": U(l).playing ? U(h)("player.pause") : U(h)("player.play"),
						onClick: zt
					}, [P(t, { name: U(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Wr),
					e.nextEpisode ? (R(), j("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": U(h)("player.nextEpisode"),
						onClick: Rt
					}, [P(t, { name: "skip-forward" })], 8, Gr)) : A("", !0),
					M("span", Kr, [
						N(V(U(K)(U(l).position)), 1),
						i[13] ||= M("span", { class: "player__sep" }, " / ", -1),
						N(V(U(K)(U(l).duration)), 1)
					]),
					i[14] ||= M("span", { class: "player__grow" }, null, -1),
					M("button", {
						type: "button",
						class: I(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": v.value ? "true" : "false",
						onClick: b
					}, [P(t, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, qr),
					P(p, {
						level: y.value,
						onCycle: ee
					}, null, 8, ["level"]),
					P(Je),
					P(Ye),
					P(it, {
						levels: U(Y).levels.value,
						variants: U(Y).variants.value,
						"current-level": U(Y).currentLevel.value,
						"auto-enabled": U(Y).autoEnabled.value,
						"active-height": U(Y).activeLevelHeight.value,
						onSelect: Ce
					}, null, 8, [
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					P(Mt, {
						open: ut.value,
						"onUpdate:open": i[1] ||= (e) => ut.value = e,
						tracks: st.value,
						"audio-tracks": gt.value,
						"active-audio": _t.value,
						onSelectAudio: kt
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					P(Jn, {
						open: vt.value,
						"onUpdate:open": i[2] ||= (e) => vt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					P(sr, {
						ref_key: "sleepTimerRef",
						ref: pe,
						"on-expire": on
					}, null, 512),
					M("button", {
						type: "button",
						class: I(["player__iconbtn player__syncplay", { "is-on": U(g).isInRoom }]),
						"aria-label": U(g).isInRoom ? U(h)("syncplay.inRoom") : U(h)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[3] ||= (e) => me.value = !0
					}, [P(t, { name: "user" })], 10, Jr),
					M("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": U(h)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[4] ||= (e) => L.value = !0
					}, [P(t, { name: "info" })], 8, Yr),
					fe.value ? (R(), j("button", {
						key: 2,
						type: "button",
						class: I(["player__iconbtn", { "is-on": de.value }]),
						"aria-label": de.value ? U(h)("player.exitPip") : U(h)("player.pip"),
						"aria-pressed": de.value,
						onClick: dn
					}, [P(t, { name: "pip" })], 10, Xr)) : A("", !0),
					M("button", {
						type: "button",
						class: I(["player__iconbtn", { "is-on": H.value }]),
						"aria-label": H.value ? U(h)("player.exitTheater") : U(h)("player.theater"),
						"aria-pressed": H.value,
						onClick: cn
					}, [P(t, { name: "theater" })], 10, Zr),
					M("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": D.value ? U(h)("player.exitFullscreen") : U(h)("player.fullscreen"),
						onClick: ln
					}, [P(t, { name: D.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Qr)
				])
			])),
			Z.value ? A("", !0) : (R(), k(kn, {
				key: 2,
				position: U(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Z.value ? A("", !0) : (R(), k(Fn, {
				key: 3,
				position: U(l).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			De.value && !Z.value ? (R(), k(Jt, {
				key: 4,
				seconds: Te.value,
				onResume: qe,
				onRestart: Xe
			}, null, 8, ["seconds"])) : A("", !0),
			Oe.value && Ue.value && !Z.value ? (R(), k(_n, {
				key: 5,
				media: Ue.value,
				remaining: ke.value,
				total: U(8),
				counting: U(u).autoplay,
				onPlayNow: et,
				onCancel: rt
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : A("", !0),
			P(r, {
				modelValue: Pe.value,
				"onUpdate:modelValue": i[6] ||= (e) => Pe.value = e,
				title: `Similar ${Me.value ?? "marker"}s`,
				size: "lg",
				onClose: He
			}, {
				default: ue(() => [M("div", $r, [Ie.value ? (R(), j("div", ei, [P(m, { label: "Finding similar media" })])) : Re.value ? (R(), j("div", ti, [P(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), M("p", ni, V(Re.value), 1)])) : !Ie.value && Fe.value.length === 0 ? (R(), j("div", ri, [
					P(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[15] ||= M("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[16] ||= M("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (R(), j("ul", ii, [(R(!0), j(E, null, B(Fe.value, (e) => (R(), j("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [M("div", ai, [e.poster_url ? (R(), j("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, oi)) : (R(), j("div", si, [P(t, { name: "film" })]))]), M("div", ci, [M("p", li, V(e.name), 1), e.year ? (R(), j("p", ui, [N(V(e.year) + " ", 1), e.runtime ? (R(), j("span", di, " · " + V(e.runtime) + "m", 1)) : A("", !0)])) : A("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			be.value ? (R(), k(On, {
				key: 6,
				title: e.media.name,
				progress: U(Y).progress.value,
				onBack: i[7] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : A("", !0),
			xe.value ? (R(), k(Sn, {
				key: 7,
				title: e.media.name,
				onBack: i[8] ||= (e) => s("back")
			}, null, 8, ["title"])) : A("", !0),
			U(g).isInRoom ? (R(), k(kr, {
				key: 8,
				position: U(l).position,
				duration: U(l).duration,
				"is-playing": U(l).playing,
				onSeek: $,
				onPlay: i[9] ||= (e) => void S.value?.play(),
				onPause: i[10] ||= (e) => void S.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : A("", !0),
			U(g).isInRoom ? (R(), k(_r, { key: 9 })) : A("", !0),
			P(ae, {
				modelValue: me.value,
				"onUpdate:modelValue": i[11] ||= (e) => me.value = e
			}, null, 8, ["modelValue"]),
			P(Ke, {
				open: L.value,
				onClose: i[12] ||= (e) => L.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-a3caed52"]]);
//#endregion
export { Ye as A, we as B, Ht as C, Mt as D, Rt as E, je as F, Te as G, ve as H, Ie as I, q as J, Z as K, Fe as L, Ke as M, Me as N, at as O, Ne as P, Le as R, Lt as S, Bt as T, xe as U, Ce as V, Se as W, he as X, ge as Y, K as Z, Ut as _, _n as a, Nt as b, nn as c, Zt as d, $t as f, Jt as g, on as h, Sn as i, Je as j, it as k, an as l, tn as m, kn as n, Yt as o, Qt as p, be as q, On as r, $ as s, fi as t, rn as u, Pt as v, zt as w, Vt as x, Ft as y, Ee as z };

//# sourceMappingURL=Player-kU3gx_59.js.map