import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { n, t as r } from "./Modal-DnGvbsI9.js";
import { t as i } from "./useFocusTrap-DZxA3ZEr.js";
import { a } from "./usePreferencesStore-aFj85Ytq.js";
import { t as o } from "./useMessages-CI_jngTk.js";
import { c as s, r as c, t as l } from "./client-DH50wjeq.js";
import { n as u } from "./useApiBase-CV_r-Kk4.js";
import { o as d } from "./media-query-IVKvZvWX.js";
import { n as f, t as p } from "./ThumbRating-BJEUrMHi.js";
import { t as m } from "./Spinner-DVL0OtMK.js";
import { t as h } from "./Button-CnyfCnhY.js";
import { t as g } from "./Slider-B3epfxUp.js";
import { t as _ } from "./Select-Jxt3ozRc.js";
import { c as v, g as y, h as b, i as ee, l as x, m as S, n as C, o as w, p as te, r as T, s as E, t as ne } from "./captions-COgPp5bH.js";
import { n as re, t as ie } from "./SyncPlayModal-C9yn9zTa.js";
import { Fragment as D, Transition as O, computed as k, createBlock as A, createCommentVNode as j, createElementBlock as M, createElementVNode as N, createTextVNode as P, createVNode as F, defineComponent as I, inject as ae, nextTick as oe, normalizeClass as L, normalizeStyle as R, onBeforeUnmount as se, onMounted as ce, openBlock as z, ref as B, renderList as V, toDisplayString as H, toRef as U, unref as W, watch as G, withCtx as le, withModifiers as K } from "vue";
//#region src/components/player/format-time.ts
function q(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var ue = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], de = { class: "scrubber__track" }, fe = ["title"], pe = { class: "scrubber__time numeric" }, me = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let { t: r } = o(), i = e, a = n, s = B(null), c = B(!1), l = B(!1), u = B(0), d = B(0), f = (e) => Math.min(1, Math.max(0, e)), p = k(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = k(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = k(() => (c.value || l.value) && i.duration > 0), g = k(() => c.value ? u.value : d.value), _ = k(() => g.value * i.duration), v = k(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = k(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = k(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), ee = k(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function x(e) {
			let t = s.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : f((e.clientX - n.left) / n.width);
		}
		function S(e) {
			if (i.duration <= 0) return;
			c.value = !0;
			try {
				s.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = x(e);
			u.value = t, a("scrub-start"), a("seek", t * i.duration), e.preventDefault();
		}
		function C(e) {
			let t = x(e);
			d.value = t, c.value && (u.value = t, a("seek", t * i.duration));
		}
		function w(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				a("scrub-end");
			}
		}
		function te() {
			l.value = !0;
		}
		function T() {
			l.value = !1;
		}
		function E(e) {
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
		}), (t, n) => (z(), M("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": W(q)(e.position),
			"aria-label": W(r)("player.seek"),
			onPointerdown: S,
			onPointermove: C,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: te,
			onPointerleave: T,
			onKeydown: E
		}, [N("div", de, [
			N("div", {
				class: "scrubber__buffered",
				style: R({ transform: `scaleX(${m.value})` })
			}, null, 4),
			N("div", {
				class: "scrubber__played",
				style: R({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(z(!0), M(D, null, V(ee.value, (e, t) => (z(), M("span", {
				key: t,
				class: "scrubber__tick",
				style: R({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, fe))), 128)),
			N("div", {
				class: L(["scrubber__head", { "is-dragging": c.value }]),
				style: R({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (z(), M("div", {
			key: 0,
			class: "scrubber__preview",
			style: R({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (z(), M("div", {
			key: 0,
			class: "scrubber__thumb",
			style: R({ backgroundImage: y.value })
		}, null, 4)) : j("", !0), N("span", pe, H(W(q)(_.value)), 1)], 4)) : j("", !0)], 40, ue));
	}
}), [["__scopeId", "data-v-cecd6e46"]]);
//#endregion
//#region src/components/player/hls-playback.ts
function he(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
async function J(e, t, n = {}) {
	let { default: r } = await import("./hls-Be5Qwv5L.js");
	if (r.isSupported()) {
		let i = new r({
			enableWorker: !0,
			lowLatencyMode: !1,
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
	if (he(e)) {
		let r = () => n.onReady?.(), i = () => n.onError?.("native hls error");
		return e.addEventListener("loadedmetadata", r), e.addEventListener("error", i), e.src = t, {
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
var ge = new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Y(e, t = "") {
	return typeof e == "string" ? e : t;
}
function X(e) {
	return e === !0 || e === "true" || e === 1;
}
function _e(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function ve(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Y(e.url ?? e.src);
		r !== "" && t.push({
			index: _e(e.index),
			language: Y(e.language ?? e.lang ?? e.srclang),
			label: Y(e.label),
			default: X(e.default ?? e.isDefault),
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
		let e = n, r = _e(e.height);
		r <= 0 || t.push({
			id: Y(e.id),
			label: Y(e.label),
			height: r,
			width: _e(e.width),
			bitrate: _e(e.bitrate)
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
		jobId: Y(t.job_id ?? t.jobId),
		masterUrl: Y(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Y(t.status, "running"),
		reused: X(t.reused),
		subtitles: ve(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: ye(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Se(e) {
	let t = e ?? {};
	return {
		jobId: Y(t.job_id ?? t.jobId),
		status: Y(t.status, "running"),
		playlistReady: X(t.playlist_ready ?? t.playlistReady),
		progress: _e(t.progress),
		masterUrl: Y(t.master_url ?? t.masterUrl),
		subtitles: ve(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: ye(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ce(e) {
	return e.playlistReady || e.status === "completed";
}
function we(e) {
	return ge.has(e);
}
function Te(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Ee(e) {
	let t = B("idle"), n = B(0), r = B([]), i = B([]), a = B(-1), o = B(!0), s = B(null), c = B(null), u = B([]), d = B(-1);
	function f(e) {
		if (!w) return;
		i.value = w.levels, a.value = w.getCurrentLevel(), o.value = w.autoLevelEnabled;
		let t = e ?? w.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function p() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function m(e) {
		w && (u.value = w.audioTracks, d.value = e ?? w.getCurrentAudioTrack());
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
	let v = e.attach ?? J, y = e.pollIntervalMs ?? 1e3, b = e.maxWaitMs ?? 12e4, ee = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), x = Math.max(1, Math.ceil(b / Math.max(1, y))), S = De(), C = e.getToken ?? (() => Oe(S)), w = null, te = null, T = null, E = !1;
	function ne() {
		return e.client ?? new l({
			baseUrl: e.apiBase(),
			tokenStore: S ?? void 0
		});
	}
	async function re(i, a, o) {
		O(), E = !1, t.value = "preparing", n.value = 0, r.value = [], p();
		try {
			let r = ne(), s = xe(await r.post(Z(a, o)));
			if (E) return;
			if (!s.jobId || !s.masterUrl) throw Error("transcode start returned no job");
			_(s.subtitles), g(s.variants);
			let c = Te(e.apiBase(), s.masterUrl), l = s.status === "completed";
			for (let e = 0; !l && e < x; e++) {
				let e = Se(await r.get(be(s.jobId)));
				if (E) return;
				if (n.value = e.progress, _(e.subtitles), g(e.variants), we(e.status)) throw Error(`transcode ${e.status}`);
				if (Ce(e)) {
					l = !0;
					break;
				}
				if (await ee(y), E) return;
			}
			if (!l) throw Error("transcode timed out");
			if (w = await v(i, c, {
				getToken: C,
				hlsConfig: e.hlsConfig,
				onReady: () => f(),
				onError: () => {
					E || (t.value = "error");
				}
			}), E) {
				w.destroy(), w = null;
				return;
			}
			te = w.onLevelSwitched((e) => f(e)), T = w.onAudioTrackSwitched((e) => m(e)), f(), m(), t.value = "ready";
		} catch {
			E || (t.value = "error");
		}
	}
	function ie(e) {
		w && (w.setCurrentLevel(e === "auto" ? -1 : e), f());
	}
	function D(e) {
		w && (w.setAudioTrack(e), m());
	}
	function O() {
		if (E = !0, te) {
			try {
				te();
			} catch {}
			te = null;
		}
		if (T) {
			try {
				T();
			} catch {}
			T = null;
		}
		if (w) {
			try {
				w.destroy();
			} catch {}
			w = null;
		}
	}
	function k() {
		O(), t.value = "idle", n.value = 0, r.value = [], p(), h();
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
		setLevel: ie,
		setAudioTrack: D,
		start: re,
		cleanup: O,
		reset: k
	};
}
function De() {
	try {
		return new s();
	} catch {
		return null;
	}
}
function Oe(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var ke = 10, Ae = 6;
function je() {
	let e = B(null), t = B(!1), n = B(null);
	function r(e, t) {
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
	function i(t) {
		let n = e.value;
		if (!n || !n.sprite_url || !n.timeline || n.timeline.length === 0) return null;
		let i = r(t, n.timeline);
		if (i === null) return null;
		let a = i.frame, o = a % ke, s = Math.floor(a / ke), c = o / (ke - 1) * 100, l = s / (Ae - 1) * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function a(r) {
		t.value = !0, n.value = null;
		try {
			e.value = await c.getTrickplay(r);
		} catch (t) {
			n.value = t instanceof Error ? t.message : "Failed to load trickplay data", e.value = null;
		} finally {
			t.value = !1;
		}
	}
	function o() {
		e.value = null, t.value = !1, n.value = null;
	}
	return {
		data: e,
		loading: t,
		error: n,
		thumbnailAt: i,
		fetch: a,
		reset: o
	};
}
//#endregion
//#region src/components/player/shortcuts.ts
var Me = [
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
], Ne = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Pe = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Fe(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Ie(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Le(e, t) {
	switch (e.key) {
		case " ": return Fe(e.target) ? !1 : (t.playPause(), !0);
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
function Re(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Ie(n.target) || Le(n, e) && n.preventDefault();
	}
	ce(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), se(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var ze = ["aria-label"], Be = { class: "shortcuts__head" }, Ve = { class: "shortcuts__title" }, He = { class: "shortcuts__grid" }, Ue = { class: "shortcuts__keys" }, We = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Ge = {
	key: 1,
	class: "shortcuts__key"
}, Ke = { class: "shortcuts__label" }, qe = /*#__PURE__*/ e(/* @__PURE__ */ I({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Me }
	},
	emits: ["close"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o(), l = B(null);
		return i(l, U(a, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (z(), M("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= K((e) => s("close"), ["self"])
		}, [N("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": W(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [N("div", Be, [N("h3", Ve, H(W(c)("player.keyboard")), 1), F(n, {
			name: "x",
			label: W(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), N("ul", He, [(z(!0), M(D, null, V(e.shortcuts, (e) => (z(), M("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [N("span", Ue, [(z(!0), M(D, null, V(e.keys, (e, n) => (z(), M(D, { key: n }, [e === "–" ? (z(), M("span", We, "–")) : (z(), M("kbd", Ge, [W(Ne)[e] ? (z(), A(t, {
			key: 0,
			name: W(Ne)[e],
			label: W(Pe)[e] ?? e
		}, null, 8, ["name", "label"])) : (z(), M(D, { key: 1 }, [P(H(e), 1)], 64))]))], 64))), 128))]), N("span", Ke, H(e.label), 1)]))), 128))])], 8, ze)])) : j("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Je = { class: "volume" }, Ye = /*#__PURE__*/ e(/* @__PURE__ */ I({
	__name: "VolumeControl",
	setup(e) {
		let t = d(), r = a(), { t: i } = o(), s = k(() => t.muted ? 0 : t.volume), c = k(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return G(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (z(), M("div", Je, [F(n, {
			name: c.value,
			label: W(t).muted ? W(i)("player.unmute") : W(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => W(t).toggleMute()
		}, null, 8, ["name", "label"]), F(g, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: W(i)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), Xe = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		], n = d(), { t: r } = o(), i = k(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (z(), A(_, {
			class: "speed-menu",
			tone: "glass",
			"model-value": W(n).rate,
			options: i.value,
			label: W(r)("player.playbackSpeed"),
			"onUpdate:modelValue": a
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), Q = "auto", Ze = "original";
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
	if (t < 0) return Q;
	let n = e.find((e) => e.index === t);
	return n ? Qe(n.height) : Q;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var it = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let n = e, r = t, i = d(), s = a(), { t: c } = o(), l = k(() => et(n.levels)), u = k(() => {
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
		}), f = k(() => l.value.length >= 2 ? l.value : u.value), p = k(() => n.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), m = k(() => nt(n.levels, p.value)), h = k(() => p.value && m.value >= 0 ? {
			value: Ze,
			label: c("player.qualityOriginal", { height: p.value.height })
		} : null), g = k(() => f.value.length >= 2), v = k(() => n.activeHeight == null ? c("player.qualityAuto") : c("player.qualityAutoActive", { label: $e(n.activeHeight) })), y = k(() => [
			{
				value: Q,
				label: v.value
			},
			...h.value ? [h.value] : [],
			...f.value
		]), b = k(() => n.autoEnabled ? Q : h.value && n.currentLevel === m.value && (i.quality === "original" || s.defaultQuality === "original") ? Ze : rt(n.levels, n.currentLevel));
		function ee(e) {
			let t = String(e);
			if (t === "auto") {
				i.setQuality(t), s.defaultQuality = t, r("select", "auto");
				return;
			}
			let a = t === "original" ? m.value : tt(n.levels, t);
			a < 0 || (i.setQuality(t), s.defaultQuality = t, r("select", a));
		}
		return (e, t) => g.value ? (z(), A(_, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": b.value,
			options: y.value,
			label: W(c)("player.quality"),
			"onUpdate:modelValue": ee
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : j("", !0);
	}
}), [["__scopeId", "data-v-719cf103"]]), at = /*#__PURE__*/ e(/* @__PURE__ */ I({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = B([]), i = k(() => x(n.styleConfig)), a = null, o = null;
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
		return G(() => [n.video, n.language], u, { immediate: !0 }), se(c), t({ lines: r }), (t, n) => r.value.length ? (z(), M("div", {
			key: 0,
			class: L(["player__captions", { "is-lifted": e.lifted }]),
			style: R(i.value)
		}, [(z(!0), M(D, null, V(r.value, (e, t) => (z(), M("p", {
			key: t,
			class: "player__caption-line"
		}, H(e), 1))), 128))], 6)) : j("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), ot = ["aria-label", "aria-expanded"], st = ["aria-label"], ct = { class: "capmenu__head" }, lt = { class: "capmenu__title" }, ut = ["aria-label"], dt = ["aria-checked", "tabindex"], ft = { class: "capmenu__check" }, pt = { class: "capmenu__optlabel" }, mt = [
	"aria-checked",
	"tabindex",
	"onClick"
], ht = { class: "capmenu__check" }, gt = { class: "capmenu__optlabel" }, _t = { class: "capmenu__title capmenu__title--sub" }, vt = ["aria-label"], yt = [
	"aria-checked",
	"tabindex",
	"onClick"
], bt = { class: "capmenu__check" }, xt = { class: "capmenu__optlabel" }, St = { class: "capmenu__title capmenu__title--sub" }, Ct = { class: "capmenu__style" }, wt = { class: "capmenu__field" }, Tt = { class: "capmenu__fieldlabel" }, Et = { class: "capmenu__field" }, Dt = { class: "capmenu__fieldlabel" }, Ot = { class: "capmenu__field" }, kt = { class: "capmenu__fieldlabel" }, At = { class: "capmenu__field" }, jt = { class: "capmenu__fieldlabel" }, Mt = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let s = e, c = r, l = d(), u = a(), { t: f } = o(), p = B(null), m = B(null), h = k(() => l.subtitleLang), g = k(() => s.tracks.some((e) => e.language === h.value)), v = k(() => g.value ? "captions" : "captions-off"), y = k(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), b = k(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function x(e) {
			c("update:open", e);
		}
		function S() {
			x(!1);
		}
		function w(e) {
			l.setSubtitle(e), u.defaultSubtitleLang = e, u.subtitlePreferenceSet = !0;
		}
		function te(e) {
			c("select-audio", e);
		}
		function E(e, t, n) {
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
		function re(e) {
			let t = E(e, s.tracks.length + 1, y.value);
			t !== null && w(t === 0 ? null : s.tracks[t - 1].language);
		}
		function ie(e) {
			let t = E(e, s.audioTracks.length, b.value);
			t !== null && te(s.audioTracks[t].index);
		}
		function O(e) {
			u.captionStyle = {
				...u.captionStyle,
				size: e
			};
		}
		function P(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function I(e) {
			u.captionStyle = {
				...u.captionStyle,
				background: e
			};
		}
		function ae(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		i(m, U(s, "open"), {
			lockScroll: !1,
			onEscape: () => (S(), !0)
		});
		function oe(e) {
			p.value && !p.value.contains(e.target) && S();
		}
		return G(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", oe, !0) : document.removeEventListener("pointerdown", oe, !0));
		}, { immediate: !0 }), se(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", oe, !0);
		}), (r, i) => (z(), M("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [N("button", {
			type: "button",
			class: L(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? W(f)("player.captionsOn") : W(f)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => x(!e.open)
		}, [F(t, { name: v.value }, null, 8, ["name"])], 10, ot), e.open ? (z(), M("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": W(f)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			N("div", ct, [N("h3", lt, H(W(f)("player.subtitles")), 1), F(n, {
				name: "x",
				label: W(f)("common.close"),
				size: "sm",
				onClick: S
			}, null, 8, ["label"])]),
			N("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": W(f)("player.subtitleTrack"),
				onKeydown: re
			}, [N("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: y.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => w(null)
			}, [N("span", ft, [g.value ? j("", !0) : (z(), A(t, {
				key: 0,
				name: "check"
			}))]), N("span", pt, H(W(f)("player.off")), 1)], 8, dt), (z(!0), M(D, null, V(e.tracks, (e, n) => (z(), M("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: y.value === n + 1 ? 0 : -1,
				onClick: (t) => w(e.language)
			}, [N("span", ht, [h.value === e.language ? (z(), A(t, {
				key: 0,
				name: "check"
			})) : j("", !0)]), N("span", gt, H(e.label), 1)], 8, mt))), 128))], 40, ut),
			e.audioTracks.length > 1 ? (z(), M(D, { key: 0 }, [N("h3", _t, H(W(f)("player.audio")), 1), N("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": W(f)("player.audioTrack"),
				onKeydown: ie
			}, [(z(!0), M(D, null, V(e.audioTracks, (n) => (z(), M("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: b.value === n.index ? 0 : -1,
				onClick: (e) => te(n.index)
			}, [N("span", bt, [e.activeAudio === n.index ? (z(), A(t, {
				key: 0,
				name: "check"
			})) : j("", !0)]), N("span", xt, H(n.label), 1)], 8, yt))), 128))], 40, vt)], 64)) : j("", !0),
			N("h3", St, H(W(f)("player.captionStyle")), 1),
			N("div", Ct, [
				N("div", wt, [N("span", Tt, H(W(f)("player.size")), 1), F(_, {
					"model-value": W(u).captionStyle.size,
					options: W(ee),
					label: W(f)("player.captionSize"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				N("div", Et, [N("span", Dt, H(W(f)("player.color")), 1), F(_, {
					"model-value": W(u).captionStyle.textColor,
					options: W(C),
					label: W(f)("player.captionColor"),
					"onUpdate:modelValue": P
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				N("div", Ot, [N("span", kt, H(W(f)("player.background")), 1), F(_, {
					"model-value": W(u).captionStyle.background,
					options: W(ne),
					label: W(f)("player.captionBackground"),
					"onUpdate:modelValue": I
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				N("div", At, [N("span", jt, H(W(f)("player.edge")), 1), F(_, {
					"model-value": W(u).captionStyle.edge,
					options: W(T),
					label: W(f)("player.captionEdge"),
					"onUpdate:modelValue": ae
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, st)) : j("", !0)], 512));
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
var Ut = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let n = e, r = B(!1), i = null;
		function a() {
			r.value = Ht(i);
		}
		let o = k(() => n.enabled && !n.reducedMotion && !r.value), s = k(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = B(null), l = null, u = null, d = !1, f = !1;
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
		function S() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			if (h(e)) {
				b = !0, y = 0, ee(e);
				return;
			}
			m(), !f && (b = !0, v = setInterval(m, 250));
		}
		function C() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		G(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			C(), e && t && S();
		}, { immediate: !0 }), ce(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), se(() => {
			C(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let w = k(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (z(), M("div", {
			class: L(["player__ambient", { "is-active": o.value }]),
			style: R(o.value ? w.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Wt = ["aria-label"], Gt = { class: "resume__label" }, Kt = { class: "resume__time numeric" }, qt = { class: "resume__actions" }, Jt = /*#__PURE__*/ e(/* @__PURE__ */ I({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o(), a = k(() => i("player.resumeFrom").split("{time}"));
		return (n, o) => (z(), M("div", {
			class: "resume",
			role: "region",
			"aria-label": W(i)("player.resumePlayback")
		}, [N("p", Gt, [
			P(H(a.value[0]), 1),
			N("span", Kt, H(W(q)(e.seconds)), 1),
			P(H(a.value[1]), 1)
		]), N("div", qt, [N("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: o[0] ||= (e) => r("resume")
		}, [F(t, { name: "play" }), N("span", null, H(W(i)("player.resume")), 1)]), N("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: o[1] ||= (e) => r("restart")
		}, [F(t, { name: "rewind" }), N("span", null, H(W(i)("player.startOver")), 1)])])], 8, Wt));
	}
}), [["__scopeId", "data-v-271c5209"]]), $ = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Yt = [
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
], Xt = new Set(Yt);
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
], _n = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let { t: r } = o(), i = e, a = n, s = k(() => i.posterUrl ?? i.media.poster_url ?? null), c = k(() => on(i.remaining, i.total));
		return (n, i) => (z(), M("aside", {
			class: "upnext",
			role: "region",
			"aria-label": W(r)("player.upNext")
		}, [
			s.value ? (z(), M("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, cn)) : j("", !0),
			N("div", ln, [
				N("p", un, H(W(r)("player.upNext")), 1),
				N("h4", dn, H(e.media.name), 1),
				e.counting ? (z(), M("p", fn, H(W(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : j("", !0),
				N("div", pn, [N("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [F(t, { name: "play" }), N("span", null, H(W(r)("player.playNow")), 1)]), N("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, H(W(r)("player.cancel")), 1)])
			]),
			e.counting ? (z(), M("svg", mn, [N("circle", {
				cx: "18",
				cy: "18",
				r: W(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, hn), N("circle", {
				cx: "18",
				cy: "18",
				r: W(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": W(an),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, gn)])) : j("", !0)
		], 8, sn));
	}
}), [["__scopeId", "data-v-85909b2d"]]), vn = {
	class: "transcode",
	role: "alert"
}, yn = { class: "transcode__card" }, bn = { class: "transcode__heading" }, xn = { class: "transcode__body" }, Sn = /*#__PURE__*/ e(/* @__PURE__ */ I({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o();
		return (n, a) => (z(), M("div", vn, [N("div", yn, [
			F(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			N("h3", bn, H(W(i)("player.transcodeHeading")), 1),
			N("p", xn, H(e.title ? W(i)("player.transcodeBodyTitled", { title: e.title }) : W(i)("player.transcodeBodyUntitled")), 1),
			N("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [F(t, { name: "arrow-left" }), N("span", null, H(W(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), Cn = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, wn = { class: "prep__card" }, Tn = { class: "prep__heading" }, En = { class: "prep__body" }, Dn = ["aria-valuenow"], On = /*#__PURE__*/ e(/* @__PURE__ */ I({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = o(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (z(), M("div", Cn, [N("div", wn, [
			F(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			N("h3", Tn, H(W(r)("player.transcodePreparingHeading")), 1),
			N("p", En, H(e.title ? W(r)("player.transcodePreparingTitled", { title: e.title }) : W(r)("player.transcodePreparingUntitled")), 1),
			N("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [N("div", {
				class: "prep__bar-fill",
				style: R({ width: i() + "%" })
			}, null, 4)], 8, Dn),
			N("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [F(t, { name: "arrow-left" }), N("span", null, H(W(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), kn = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let c = k(() => s(r.position, r.introMarker) ? {
			label: a("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: a("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (z(), A(O, { name: "skip" }, {
			default: le(() => [c.value ? (z(), M("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: K(l, ["stop"])
			}, [N("span", null, H(c.value.label), 1), F(t, { name: "skip-forward" })])) : j("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), An = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, jn = ["aria-label", "onClick"], Mn = { class: "skip-controls__label" }, Nn = 5, Pn = 30, Fn = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let f = k(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (z(), M("div", An, [(z(!0), M(D, null, V(f.value, (e) => (z(), M("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: K((t) => p(e), ["stop"])
		}, [N("span", Mn, H(d(e.type)), 1), F(t, { name: "skip-forward" })], 8, jn))), 128))])) : j("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), In = ["aria-label", "aria-expanded"], Ln = ["aria-label"], Rn = { class: "chapterlist__head" }, zn = { class: "chapterlist__title" }, Bn = ["aria-label"], Vn = ["onClick"], Hn = { class: "chapterlist__index" }, Un = { class: "chapterlist__name" }, Wn = { class: "chapterlist__meta" }, Gn = { class: "chapterlist__time" }, Kn = {
	key: 0,
	class: "chapterlist__duration"
}, qn = {
	key: 1,
	class: "chapterlist__empty"
}, Jn = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let d = k(() => a.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = q(e.start), a;
			return e.end != null && e.end > e.start && (a = q(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = B(null), p = B(null);
		i(p, U(a, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		G(() => a.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), se(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (z(), M("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [N("button", {
			type: "button",
			class: L(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": W(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [F(t, { name: "list" })], 10, In), e.open ? (z(), M("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": W(c)("player.chapterList"),
			tabindex: "-1"
		}, [N("div", Rn, [N("h3", zn, H(W(c)("player.chapters")), 1), F(n, {
			name: "x",
			label: W(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (z(), M("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": W(c)("player.chapterList")
		}, [(z(!0), M(D, null, V(d.value, (e) => (z(), M("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [N("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			N("span", Hn, H(e.index), 1),
			N("span", Un, H(e.label), 1),
			N("span", Wn, [N("span", Gn, H(e.startLabel), 1), e.durationLabel ? (z(), M("span", Kn, "· " + H(e.durationLabel), 1)) : j("", !0)])
		], 8, Vn)]))), 128))], 8, Bn)) : (z(), M("p", qn, H(W(c)("player.noChapters")), 1))], 8, Ln)) : j("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Yn = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Xn = { class: "marker-timeline__ticks" }, Zn = [
	"title",
	"aria-label",
	"onClick"
], Qn = { class: "marker-timeline__tooltip" }, $n = { class: "marker-timeline__tooltip-label" }, er = { class: "marker-timeline__tooltip-time numeric" }, tr = ["onClick"], nr = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let s = k(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = k(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = k(() => c.value !== null), u = k(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (z(), M("div", {
			key: 0,
			class: L(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (z(), M("div", Yn, [t[0] ||= N("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [N("polygon", { points: "5,3 19,12 5,21" })], -1), P(" " + H(u.value), 1)])) : j("", !0), N("div", Xn, [(z(!0), M(D, null, V(s.value, (e) => (z(), M("button", {
			key: e.id,
			type: "button",
			class: L(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: R({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${W(q)(e.startSec)}`,
			"aria-label": `${e.label} at ${W(q)(e.startSec)}`,
			onClick: K((t) => d(e), ["stop"])
		}, [N("span", Qn, [
			N("span", $n, H(e.label), 1),
			N("span", er, H(W(q)(e.startSec)), 1),
			N("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: K((t) => f(e), ["stop"])
			}, " Find similar ", 8, tr)
		])], 14, Zn))), 128))])], 2)) : j("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), rr = ["aria-label", "aria-expanded"], ir = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, ar = ["aria-label"], or = ["aria-selected", "onClick"], sr = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		], s = B(0), c = B(0), l = k(() => c.value > 0), u;
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
		let h = B(!1);
		function g() {
			l.value ? (p(0), h.value = !1) : h.value = !h.value;
		}
		function _(e) {
			p(e), h.value = !1;
		}
		return se(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (z(), M("div", { class: L(["sleep-timer", { "is-active": l.value }]) }, [N("button", {
			type: "button",
			class: L(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : W(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [F(t, { name: "moon" }), l.value ? (z(), M("span", ir, H(m(c.value)), 1)) : j("", !0)], 10, rr), F(O, { name: "dropdown" }, {
			default: le(() => [h.value ? (z(), M("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": W(i)("player.sleepTimer")
			}, [(z(), M(D, null, V(a, (e) => N("li", {
				key: e.value,
				class: L(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, H(e.label), 11, or)), 64))], 8, ar)) : j("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), cr = {
	key: 0,
	class: "syncplay-overlay"
}, lr = { class: "syncplay-overlay__badge" }, ur = { class: "syncplay-overlay__label" }, dr = { class: "syncplay-overlay__status-label" }, fr = { class: "syncplay-overlay__members" }, pr = { class: "syncplay-overlay__member-count" }, mr = { class: "syncplay-overlay__member-list" }, hr = { class: "syncplay-overlay__member-name" }, gr = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, _r = /*#__PURE__*/ e(/* @__PURE__ */ I({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = o(), i = re(), a = u(), s = k(() => n.apiBase ?? a.value), c = k(() => i.currentRoom?.name ?? "SyncPlay"), l = k(() => i.onlineMembers.length), d = k(() => i.syncStatus), f = k(() => {
			switch (d.value) {
				case "synced": return r("syncplay.synced");
				case "outOfSync": return r("syncplay.outOfSync");
				case "re-syncing": return r("syncplay.reSyncing");
				default: return r("syncplay.synced");
			}
		}), p = k(() => {
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
		return (e, n) => W(i).isInRoom ? (z(), M("div", cr, [
			N("div", lr, [F(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), N("span", ur, "SyncPlay: " + H(c.value), 1)]),
			N("div", { class: L(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [F(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), N("span", dr, H(f.value), 1)], 2),
			N("div", fr, [N("span", pr, [F(t, { name: "user" }), P(" " + H(l.value) + " " + H(W(r)("syncplay.members", { count: l.value })), 1)]), N("ul", mr, [(z(!0), M(D, null, V(W(i).onlineMembers.slice(0, 5), (e) => (z(), M("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= N("span", { class: "syncplay-overlay__member-dot" }, null, -1), N("span", hr, H(e.name), 1)]))), 128)), W(i).onlineMembers.length > 5 ? (z(), M("li", gr, " +" + H(W(i).onlineMembers.length - 5) + " more ", 1)) : j("", !0)])]),
			F(h, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: le(() => [P(H(W(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : j("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), vr = {
	key: 0,
	class: "syncplay-controls"
}, yr = ["aria-label"], br = { class: "syncplay-controls__wait-label" }, xr = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, Sr = { key: 0 }, Cr = { class: "syncplay-controls__transport" }, wr = ["aria-label"], Tr = ["aria-label"], Er = ["aria-label"], Dr = { class: "syncplay-controls__status-label" }, Or = 10, kr = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let r = e, i = n, { t: a } = o(), s = re(), c = u(), l = k(() => r.apiBase ?? c.value), d = B(!1), f = B([]), p = k(() => d.value || s.syncStatus === "re-syncing");
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
		return G(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => W(s).isInRoom ? (z(), M("div", vr, [
			p.value ? (z(), M("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": W(a)("syncplay.waitingForMembers")
			}, [
				F(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				N("span", br, H(W(a)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (z(), M("span", xr, [P(H(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (z(), M("span", Sr, "+" + H(f.value.length - 3), 1)) : j("", !0)])) : j("", !0)
			], 8, yr)) : j("", !0),
			N("div", Cr, [
				N("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": W(a)("syncplay.rewind"),
					onClick: v
				}, [F(t, { name: "rewind" })], 8, wr),
				N("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? W(a)("syncplay.pauseAll") : W(a)("syncplay.playAll"),
					onClick: g
				}, [F(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Tr),
				N("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": W(a)("syncplay.fastForward"),
					onClick: y
				}, [F(t, { name: "forward" })], 8, Er)
			]),
			N("div", { class: L(["syncplay-controls__status", `syncplay-controls__status--${W(s).syncStatus}`]) }, [F(t, {
				name: W(s).syncStatus === "synced" ? "check" : W(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), N("span", Dr, H(W(s).syncStatus === "synced" ? W(a)("syncplay.synced") : W(s).syncStatus === "outOfSync" ? W(a)("syncplay.outOfSync") : W(a)("syncplay.reSyncing")), 1)], 2)
		])) : j("", !0);
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
}, di = { key: 0 }, fi = /*#__PURE__*/ e(/* @__PURE__ */ I({
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
		let i = e, s = n, l = d(), u = a(), { t: h } = o(), g = re(), _ = f(), v = k(() => _.isFavorite(i.media.id)), y = k(() => _.likeLevel(i.media.id));
		function b() {
			_.toggleFavorite(i.media.id, Y());
		}
		function ee(e) {
			_.setLike(i.media.id, e, Y());
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
		], C = B(null), T = B(null), ne = B(!0), O = B(!1), I = B(!1), R = B(!1), U = B(!1), ue = B(!1), de = B(!1), fe = B(null), pe = B(!1), he = k(() => U.value ? 1.35 : 1), J = B(Qt(i.streamUrl, i.media.path)), ge = ae("phlixConfig", null);
		function Y() {
			return ge?.apiBase ?? "";
		}
		let X = Ee({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: ge?.playerHlsConfig
		}), _e = je(), ve = k(() => i.thumbnailAt ?? _e.thumbnailAt), ye = k(() => J.value ? void 0 : i.streamUrl), Z = k(() => J.value && X.state.value !== "ready"), be = k(() => J.value && (X.state.value === "preparing" || X.state.value === "idle")), xe = k(() => J.value && X.state.value === "error");
		function Se() {
			let e = C.value;
			e && X.start(e, i.media.id);
		}
		function Ce(e) {
			X.setLevel(e);
		}
		let we = !1;
		G(() => X.levels.value, (e) => {
			if (we || e.length === 0) return;
			we = !0;
			let t = u.defaultQuality;
			if (!t || t === "auto") return;
			let n = t === "original" ? nt(e, X.variants.value?.find((e) => e.id === "original") ?? null) : tt(e, t);
			n >= 0 && X.setLevel(n);
		});
		let Te = B(l.resumePositionFor(i.media.id) ?? 0), De = B(!J.value && Te.value > 0), Oe = null, ke = B(!1), Ae = B(8), Me, Ne = B(null), Pe = B(0), Fe = B(!1), Ie = B([]), Le = B(!1), ze = B(null);
		function Be(e, t) {
			Ne.value = e, Pe.value = t, Ie.value = [], ze.value = null, Fe.value = !0, Ve(e, t);
		}
		async function Ve(e, t) {
			Le.value = !0, ze.value = null;
			try {
				let n = await c.searchByMarker(e, t, 30, 20);
				Ie.value = Array.isArray(n.items) ? n.items : [];
			} catch {
				ze.value = "Failed to load similar media. Please try again.", Ie.value = [];
			} finally {
				Le.value = !1;
			}
		}
		function He() {
			Fe.value = !1, Ie.value = [], ze.value = null, Ne.value = null;
		}
		let Ue = k(() => l.upNext);
		function We() {
			J.value = Qt(i.streamUrl, i.media.path), Te.value = l.resumePositionFor(i.media.id) ?? 0, De.value = !J.value && Te.value > 0, Oe = null, Nt = !1, bt = !1, xt = !1, pt.value = -1, Dt = null, we = !1, Q(), ke.value = !1, X.reset(), C.value && (C.value.currentTime = 0), J.value && Se(), _e.fetch(i.media.id);
		}
		function Ge(e) {
			let t = C.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Oe = Math.max(0, e));
		}
		function Ke() {
			Ge(Te.value), De.value = !1, C.value?.play()?.catch(() => {});
		}
		function Je() {
			Oe = null, Ge(0), l.clearResume(i.media.id), De.value = !1, C.value?.play()?.catch(() => {});
		}
		function Q() {
			Me &&= (clearInterval(Me), void 0);
		}
		function Ze() {
			Ae.value = 8, Q(), Me = setInterval(() => {
				--Ae.value, Ae.value <= 0 && (Q(), $e());
			}, 1e3);
		}
		function Qe() {
			pn(), ne.value = !0, l.upNext && (ke.value = !0, u.autoplay && Ze());
		}
		function $e() {
			Q(), ke.value = !1;
			let e = l.next(i.streamUrlFor);
			e && s("play-next", e);
		}
		function et() {
			Q(), ke.value = !1;
		}
		function rt() {
			if (J.value) return;
			let e = C.value, t = en(e) && (e?.currentTime ?? 0) === 0;
			($t(e) || t) && (J.value = !0, Se());
		}
		let ot = B([]), st = B([]), ct = B(-1), lt = B(!1), ut = k(() => X.state.value === "ready" && X.audioTracks.value.length > 0), dt = k(() => X.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), ft = k(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), pt = B(-1), mt = k(() => !ut.value && !J.value && st.value.length === 0 && ft.value.length > 1), ht = k(() => ut.value ? dt.value : mt.value ? ft.value : st.value), gt = k(() => {
			if (ut.value) return X.currentAudioTrack.value;
			if (mt.value) {
				if (pt.value >= 0) return pt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return ct.value;
		}), _t = B(!1), vt = l.subtitleLang, yt = k(() => J.value ? X.subtitleTracks.value : i.playbackSubtitleTracks ?? []), bt = !1, xt = !1;
		function St() {
			if (bt) return;
			if (u.subtitlePreferenceSet) {
				bt = !0;
				return;
			}
			let e = yt.value.find((e) => e.default);
			if (!e) return;
			let t = ot.value.find((t) => t.language === (e.language || e.label));
			t && (l.setSubtitle(t.language), vt = t.language, bt = !0);
		}
		function Ct() {
			if (xt) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = ht.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = gt.value;
			r >= 0 && r < t.length || (Ot(n), xt = !0);
		}
		let wt = k(() => ot.value.some((e) => e.language === l.subtitleLang));
		function Tt() {
			let e = C.value;
			ot.value = S(e), st.value = te(e), ct.value = w(e), St(), Ct();
		}
		function Et() {
			if (wt.value) vt = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = vt && ot.value.some((e) => e.language === vt) ? vt : ot.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			s("captions");
		}
		let Dt = null;
		function Ot(e) {
			if (ut.value) X.setAudioTrack(e);
			else if (mt.value) {
				if (e === gt.value) return;
				pt.value = e, Dt = e, J.value = !0, Se();
			} else E(C.value, e), ct.value = e;
		}
		G(ut, (e) => {
			if (!e || Dt === null) return;
			let t = Dt;
			Dt = null, t >= 0 && t < X.audioTracks.value.length && X.setAudioTrack(t);
		}), G(yt, () => {
			oe(() => Tt());
		}, { deep: !0 });
		let kt = null, At, jt = k(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Nt = !1;
		function Pt() {
			if (!i.autoplay || Nt || De.value || Z.value) return;
			let e = C.value;
			if (!e || !e.paused) return;
			Nt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, l.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Ft() {
			Pt();
		}
		function It() {
			i.prevEpisode && s("play-episode", i.prevEpisode);
		}
		function Lt() {
			i.nextEpisode && s("play-episode", i.nextEpisode);
		}
		function Rt() {
			let e = C.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function zt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Bt() {
			l.play();
		}
		function Vt() {
			l.pause();
		}
		function Ht() {
			let e = C.value;
			e && (l.updateProgress(e.currentTime, e.duration, zt(e)), l.setMediaPositionState());
		}
		function Wt() {
			let e = C.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, Oe !== null && (e.currentTime = e.duration ? Math.min(e.duration, Oe) : Oe, Oe = null), l.updateProgress(e.currentTime, e.duration, zt(e)), l.setMediaPositionState(), Tt());
		}
		function Gt() {
			let e = C.value;
			e && l.updateProgress(e.currentTime, e.duration, zt(e));
		}
		function Kt() {
			let e = C.value;
			e && (Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function qt() {
			let e = C.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate);
		}
		function $(e) {
			let t = C.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function Yt() {
			I.value = !0, hn();
		}
		function Xt() {
			I.value = !1, hn();
		}
		function Zt(e) {
			let t = x.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(x[e] - l.rate) ? n : e, 0), n = x[Math.min(x.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function tn() {
			if (!i.markers) return;
			let e = l.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function nn() {
			if (!i.markers) return;
			let e = l.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function rn() {
			fe.value?.toggleOpen();
		}
		function an() {
			let e = C.value;
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
		Re({
			playPause: Rt,
			seekBy: (e) => $(l.position + e),
			frameStep: (e) => {
				l.playing || $(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: on,
			toggleFullscreen: cn,
			toggleCaptions: Et,
			toggleTheater: sn,
			togglePip: un,
			skipIntro: tn,
			skipOutro: nn,
			sleepTimer: rn,
			seekToPercent: (e) => $(e * l.duration),
			speedStep: Zt,
			toggleHelp: () => {
				R.value = !R.value;
			}
		}, { enabled: () => !R.value && !lt.value && !_t.value });
		function on() {
			l.toggleMute();
		}
		function sn() {
			U.value = !U.value, s("theater", U.value);
		}
		G(() => l.muted, (e) => {
			let t = C.value;
			t && t.muted !== e && (t.muted = e);
		}), G(() => l.volume, (e) => {
			let t = C.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), G(() => l.rate, (e) => {
			let t = C.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), G(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Ge(e.value) : e.type === "seekBy" && Ge(l.position + e.value));
		});
		function cn() {
			if (typeof document > "u") return;
			let e = T.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function ln() {
			O.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function un() {
			let e = C.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function dn() {
			ue.value = !0;
		}
		function fn() {
			ue.value = !1;
		}
		function pn() {
			At &&= (clearTimeout(At), void 0);
		}
		function mn() {
			pn(), !(!l.playing || I.value) && (At = setTimeout(() => {
				l.playing && !I.value && (ne.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function hn() {
			ne.value = !0, mn();
		}
		G(() => l.playing, (e) => {
			e ? (De.value = !1, et(), mn()) : (pn(), ne.value = !0);
		});
		let gn = null;
		return ce(() => {
			l.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), _.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", ln), de.value = document.pictureInPictureEnabled === !0), gn = l.bindMediaSession({
				onPlay: () => void C.value?.play()?.catch(() => {}),
				onPause: () => C.value?.pause(),
				onSeek: (e) => $(e)
			}), kt = C.value?.textTracks ?? null, kt?.addEventListener?.("addtrack", Tt), kt?.addEventListener?.("removetrack", Tt), Tt(), J.value && Se();
		}), G(() => i.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), We();
		}), G(() => i.media?.id, () => {
			_.hydrate(i.media);
		}), G(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (C.value?.play(), l.play()) : e.state === "paused" && (C.value?.pause(), l.pause()));
		}), se(() => {
			pn(), Q(), X.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", ln), gn?.(), kt?.removeEventListener?.("addtrack", Tt), kt?.removeEventListener?.("removetrack", Tt);
		}), (n, i) => (z(), M("div", {
			ref_key: "containerRef",
			ref: T,
			class: L(["player", {
				"is-chrome-hidden": !ne.value,
				"is-theater": U.value
			}]),
			onPointermove: hn,
			onPointerdown: hn,
			onFocusin: hn
		}, [F(Ut, {
			video: C.value,
			enabled: W(u).atmosphere,
			playing: W(l).playing,
			"reduced-motion": W(u).effectiveReducedMotion,
			intensity: he.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), N("div", Ar, [
			N("video", {
				ref_key: "videoRef",
				ref: C,
				class: "player__video",
				src: ye.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Bt,
				onPause: Vt,
				onTimeupdate: Ht,
				onLoadedmetadata: Wt,
				onCanplay: Ft,
				onProgress: Gt,
				onVolumechange: Kt,
				onRatechange: qt,
				onEnded: Qe,
				onError: rt,
				onEnterpictureinpicture: dn,
				onLeavepictureinpicture: fn,
				onClick: Rt
			}, [(z(!0), M(D, null, V(yt.value, (e) => (z(), M("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Mr))), 128))], 40, jr),
			i[17] ||= N("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[18] ||= N("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			N("div", Nr, [N("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": W(h)("player.back"),
				onClick: i[0] ||= K((e) => s("back"), ["stop"])
			}, [F(t, { name: "arrow-left" })], 8, Pr), N("div", Fr, [
				N("p", Ir, H(W(h)("player.nowPlaying")), 1),
				N("h2", Lr, H(e.media.name), 1),
				N("div", Rr, [(z(!0), M(D, null, V(jt.value, (e, t) => (z(), M(D, { key: t }, [t > 0 && !e.cert ? (z(), M("span", zr, "·")) : j("", !0), N("span", { class: L({ player__cert: e.cert }) }, H(e.text), 3)], 64))), 128))])
			])]),
			Z.value ? j("", !0) : (z(), M("div", Br, [N("button", {
				type: "button",
				class: L(["player__bigplay", { "is-playing": W(l).playing }]),
				"aria-label": W(l).playing ? W(h)("player.pause") : W(h)("player.play"),
				onClick: K(Rt, ["stop"])
			}, [F(t, { name: W(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Vr)])),
			F(at, {
				video: C.value,
				language: W(l).subtitleLang,
				"style-config": W(u).captionStyle,
				lifted: ne.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			Z.value ? j("", !0) : (z(), M("div", {
				key: 1,
				class: "player__controls",
				onClick: i[5] ||= K(() => {}, ["stop"])
			}, [
				F(me, {
					position: W(l).position,
					duration: W(l).duration,
					buffered: W(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": ve.value,
					onSeek: $,
					onScrubStart: Yt,
					onScrubEnd: Xt
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				W(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (z(), A(nr, {
					key: 0,
					position: W(l).position,
					duration: W(l).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: Be
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : j("", !0),
				N("div", Hr, [
					e.prevEpisode ? (z(), M("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": W(h)("player.previousEpisode"),
						onClick: It
					}, [F(t, { name: "skip-back" })], 8, Ur)) : j("", !0),
					N("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": W(l).playing ? W(h)("player.pause") : W(h)("player.play"),
						onClick: Rt
					}, [F(t, { name: W(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Wr),
					e.nextEpisode ? (z(), M("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": W(h)("player.nextEpisode"),
						onClick: Lt
					}, [F(t, { name: "skip-forward" })], 8, Gr)) : j("", !0),
					N("span", Kr, [
						P(H(W(q)(W(l).position)), 1),
						i[13] ||= N("span", { class: "player__sep" }, " / ", -1),
						P(H(W(q)(W(l).duration)), 1)
					]),
					i[14] ||= N("span", { class: "player__grow" }, null, -1),
					N("button", {
						type: "button",
						class: L(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": v.value ? "true" : "false",
						onClick: b
					}, [F(t, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, qr),
					F(p, {
						level: y.value,
						onCycle: ee
					}, null, 8, ["level"]),
					F(Ye),
					F(Xe),
					F(it, {
						levels: W(X).levels.value,
						variants: W(X).variants.value,
						"current-level": W(X).currentLevel.value,
						"auto-enabled": W(X).autoEnabled.value,
						"active-height": W(X).activeLevelHeight.value,
						onSelect: Ce
					}, null, 8, [
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					F(Mt, {
						open: lt.value,
						"onUpdate:open": i[1] ||= (e) => lt.value = e,
						tracks: ot.value,
						"audio-tracks": ht.value,
						"active-audio": gt.value,
						onSelectAudio: Ot
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					F(Jn, {
						open: _t.value,
						"onUpdate:open": i[2] ||= (e) => _t.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					F(sr, {
						ref_key: "sleepTimerRef",
						ref: fe,
						"on-expire": an
					}, null, 512),
					N("button", {
						type: "button",
						class: L(["player__iconbtn player__syncplay", { "is-on": W(g).isInRoom }]),
						"aria-label": W(g).isInRoom ? W(h)("syncplay.inRoom") : W(h)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[3] ||= (e) => pe.value = !0
					}, [F(t, { name: "user" })], 10, Jr),
					N("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": W(h)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[4] ||= (e) => R.value = !0
					}, [F(t, { name: "info" })], 8, Yr),
					de.value ? (z(), M("button", {
						key: 2,
						type: "button",
						class: L(["player__iconbtn", { "is-on": ue.value }]),
						"aria-label": ue.value ? W(h)("player.exitPip") : W(h)("player.pip"),
						"aria-pressed": ue.value,
						onClick: un
					}, [F(t, { name: "pip" })], 10, Xr)) : j("", !0),
					N("button", {
						type: "button",
						class: L(["player__iconbtn", { "is-on": U.value }]),
						"aria-label": U.value ? W(h)("player.exitTheater") : W(h)("player.theater"),
						"aria-pressed": U.value,
						onClick: sn
					}, [F(t, { name: "theater" })], 10, Zr),
					N("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": O.value ? W(h)("player.exitFullscreen") : W(h)("player.fullscreen"),
						onClick: cn
					}, [F(t, { name: O.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Qr)
				])
			])),
			Z.value ? j("", !0) : (z(), A(kn, {
				key: 2,
				position: W(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Z.value ? j("", !0) : (z(), A(Fn, {
				key: 3,
				position: W(l).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			De.value && !Z.value ? (z(), A(Jt, {
				key: 4,
				seconds: Te.value,
				onResume: Ke,
				onRestart: Je
			}, null, 8, ["seconds"])) : j("", !0),
			ke.value && Ue.value && !Z.value ? (z(), A(_n, {
				key: 5,
				media: Ue.value,
				remaining: Ae.value,
				total: W(8),
				counting: W(u).autoplay,
				onPlayNow: $e,
				onCancel: et
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : j("", !0),
			F(r, {
				modelValue: Fe.value,
				"onUpdate:modelValue": i[6] ||= (e) => Fe.value = e,
				title: `Similar ${Ne.value ?? "marker"}s`,
				size: "lg",
				onClose: He
			}, {
				default: le(() => [N("div", $r, [Le.value ? (z(), M("div", ei, [F(m, { label: "Finding similar media" })])) : ze.value ? (z(), M("div", ti, [F(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), N("p", ni, H(ze.value), 1)])) : !Le.value && Ie.value.length === 0 ? (z(), M("div", ri, [
					F(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[15] ||= N("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[16] ||= N("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (z(), M("ul", ii, [(z(!0), M(D, null, V(Ie.value, (e) => (z(), M("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [N("div", ai, [e.poster_url ? (z(), M("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, oi)) : (z(), M("div", si, [F(t, { name: "film" })]))]), N("div", ci, [N("p", li, H(e.name), 1), e.year ? (z(), M("p", ui, [P(H(e.year) + " ", 1), e.runtime ? (z(), M("span", di, " · " + H(e.runtime) + "m", 1)) : j("", !0)])) : j("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			be.value ? (z(), A(On, {
				key: 6,
				title: e.media.name,
				progress: W(X).progress.value,
				onBack: i[7] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : j("", !0),
			xe.value ? (z(), A(Sn, {
				key: 7,
				title: e.media.name,
				onBack: i[8] ||= (e) => s("back")
			}, null, 8, ["title"])) : j("", !0),
			W(g).isInRoom ? (z(), A(kr, {
				key: 8,
				position: W(l).position,
				duration: W(l).duration,
				"is-playing": W(l).playing,
				onSeek: $,
				onPlay: i[9] ||= (e) => void C.value?.play(),
				onPause: i[10] ||= (e) => void C.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : j("", !0),
			W(g).isInRoom ? (z(), A(_r, { key: 9 })) : j("", !0),
			F(ie, {
				modelValue: pe.value,
				"onUpdate:modelValue": i[11] ||= (e) => pe.value = e
			}, null, 8, ["modelValue"]),
			F(qe, {
				open: R.value,
				onClose: i[12] ||= (e) => R.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-75122bb6"]]);
//#endregion
export { Xe as A, we as B, Ht as C, Mt as D, Rt as E, Me as F, Te as G, ve as H, Le as I, J, Z as K, Ie as L, qe as M, Ne as N, at as O, Pe as P, Re as R, Lt as S, Bt as T, xe as U, Ce as V, Se as W, me as X, he as Y, q as Z, Ut as _, _n as a, Nt as b, nn as c, Zt as d, $t as f, Jt as g, on as h, Sn as i, Ye as j, it as k, an as l, tn as m, kn as n, $ as o, Qt as p, be as q, On as r, Yt as s, fi as t, rn as u, Pt as v, zt as w, Vt as x, Ft as y, Ee as z };

//# sourceMappingURL=Player-DKYl0U3Z.js.map