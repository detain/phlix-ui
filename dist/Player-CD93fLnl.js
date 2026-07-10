import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { n, t as r } from "./Modal-BXA8fOR4.js";
import { t as i } from "./useFocusTrap-DZxA3ZEr.js";
import { a } from "./usePreferencesStore-DuQB-Gwk.js";
import { t as o } from "./useMessages-tduf5S2N.js";
import { c as s, r as c, t as l } from "./client-CGSA6iT0.js";
import { n as u } from "./useApiBase-CV_r-Kk4.js";
import { i as d } from "./usePlayerStore-C0izJMh8.js";
import { n as f, t as p } from "./ThumbRating-DL3IV5ps.js";
import { t as m } from "./Spinner-C1ovN881.js";
import { t as h } from "./Button-CnyfCnhY.js";
import { t as g } from "./Slider-B3epfxUp.js";
import { t as _ } from "./Select-BbdhXiRC.js";
import { c as v, g as y, h as b, i as x, l as S, m as C, n as w, o as ee, p as te, r as ne, s as re, t as ie } from "./captions-COgPp5bH.js";
import { n as ae, t as oe } from "./SyncPlayModal-7a46lWmy.js";
import { Fragment as T, Transition as se, computed as E, createBlock as D, createCommentVNode as O, createElementBlock as k, createElementVNode as A, createTextVNode as j, createVNode as M, defineComponent as N, inject as ce, nextTick as le, normalizeClass as P, normalizeStyle as F, onBeforeUnmount as ue, onMounted as de, openBlock as I, ref as L, renderList as R, toDisplayString as z, toRef as B, unref as V, watch as H, withCtx as fe, withModifiers as U } from "vue";
//#region src/components/player/format-time.ts
function W(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var pe = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], me = { class: "scrubber__track" }, he = ["title"], ge = { class: "scrubber__time numeric" }, _e = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		let { t: r } = o(), i = e, a = n, s = L(null), c = L(!1), l = L(!1), u = L(0), d = L(0), f = (e) => Math.min(1, Math.max(0, e)), p = E(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = E(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = E(() => (c.value || l.value) && i.duration > 0), g = E(() => c.value ? u.value : d.value), _ = E(() => g.value * i.duration), v = E(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = E(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = E(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = E(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function S(e) {
			let t = s.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : f((e.clientX - n.left) / n.width);
		}
		function C(e) {
			if (i.duration <= 0) return;
			c.value = !0;
			try {
				s.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = S(e);
			u.value = t, a("scrub-start"), a("seek", t * i.duration), e.preventDefault();
		}
		function w(e) {
			let t = S(e);
			d.value = t, c.value && (u.value = t, a("seek", t * i.duration));
		}
		function ee(e) {
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
		function ne() {
			l.value = !1;
		}
		function re(e) {
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
		}), (t, n) => (I(), k("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": V(W)(e.position),
			"aria-label": V(r)("player.seek"),
			onPointerdown: C,
			onPointermove: w,
			onPointerup: ee,
			onPointercancel: ee,
			onPointerenter: te,
			onPointerleave: ne,
			onKeydown: re
		}, [A("div", me, [
			A("div", {
				class: "scrubber__buffered",
				style: F({ transform: `scaleX(${m.value})` })
			}, null, 4),
			A("div", {
				class: "scrubber__played",
				style: F({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(I(!0), k(T, null, R(x.value, (e, t) => (I(), k("span", {
				key: t,
				class: "scrubber__tick",
				style: F({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, he))), 128)),
			A("div", {
				class: P(["scrubber__head", { "is-dragging": c.value }]),
				style: F({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (I(), k("div", {
			key: 0,
			class: "scrubber__preview",
			style: F({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (I(), k("div", {
			key: 0,
			class: "scrubber__thumb",
			style: F({ backgroundImage: y.value })
		}, null, 4)) : O("", !0), A("span", ge, z(V(W)(_.value)), 1)], 4)) : O("", !0)], 40, pe));
	}
}), [["__scopeId", "data-v-cecd6e46"]]);
//#endregion
//#region src/components/player/hls-playback.ts
function ve(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
async function G(e, t, n = {}) {
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
			}
		};
	}
	if (ve(e)) {
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
			onLevelSwitched: () => () => void 0
		};
	}
	throw Error("HLS is not supported in this browser");
}
//#endregion
//#region src/components/player/transcode.ts
var ye = new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function K(e, t = "") {
	return typeof e == "string" ? e : t;
}
function q(e) {
	return e === !0 || e === "true" || e === 1;
}
function be(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function J(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = K(e.url ?? e.src);
		r !== "" && t.push({
			index: be(e.index),
			language: K(e.language ?? e.lang ?? e.srclang),
			label: K(e.label),
			default: q(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function xe(e) {
	if (e == null || !Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = be(e.height);
		r <= 0 || t.push({
			id: K(e.id),
			label: K(e.label),
			height: r,
			width: be(e.width),
			bitrate: be(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Se(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function Ce(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function we(e) {
	let t = e ?? {};
	return {
		jobId: K(t.job_id ?? t.jobId),
		masterUrl: K(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: K(t.status, "running"),
		reused: q(t.reused),
		subtitles: J(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: xe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Te(e) {
	let t = e ?? {};
	return {
		jobId: K(t.job_id ?? t.jobId),
		status: K(t.status, "running"),
		playlistReady: q(t.playlist_ready ?? t.playlistReady),
		progress: be(t.progress),
		masterUrl: K(t.master_url ?? t.masterUrl),
		subtitles: J(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: xe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ee(e) {
	return e.playlistReady || e.status === "completed";
}
function Y(e) {
	return ye.has(e);
}
function X(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function De(e) {
	let t = L("idle"), n = L(0), r = L([]), i = L([]), a = L(-1), o = L(!0), s = L(null), c = L(null);
	function u(e) {
		if (!x) return;
		i.value = x.levels, a.value = x.getCurrentLevel(), o.value = x.autoLevelEnabled;
		let t = e ?? x.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function d() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function f(e) {
		!e || e.length === 0 || (c.value = e);
	}
	function p(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: X(n, e.url)
		}));
	}
	let m = e.attach ?? G, h = e.pollIntervalMs ?? 1e3, g = e.maxWaitMs ?? 12e4, _ = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), v = Math.max(1, Math.ceil(g / Math.max(1, h))), y = Oe(), b = e.getToken ?? (() => ke(y)), x = null, S = null, C = !1;
	function w() {
		return e.client ?? new l({
			baseUrl: e.apiBase(),
			tokenStore: y ?? void 0
		});
	}
	async function ee(i, a, o) {
		ne(), C = !1, t.value = "preparing", n.value = 0, r.value = [], d();
		try {
			let r = w(), s = we(await r.post(Se(a, o)));
			if (C) return;
			if (!s.jobId || !s.masterUrl) throw Error("transcode start returned no job");
			p(s.subtitles), f(s.variants);
			let c = X(e.apiBase(), s.masterUrl), l = s.status === "completed";
			for (let e = 0; !l && e < v; e++) {
				let e = Te(await r.get(Ce(s.jobId)));
				if (C) return;
				if (n.value = e.progress, p(e.subtitles), f(e.variants), Y(e.status)) throw Error(`transcode ${e.status}`);
				if (Ee(e)) {
					l = !0;
					break;
				}
				if (await _(h), C) return;
			}
			if (!l) throw Error("transcode timed out");
			if (x = await m(i, c, {
				getToken: b,
				hlsConfig: e.hlsConfig,
				onReady: () => u(),
				onError: () => {
					C || (t.value = "error");
				}
			}), C) {
				x.destroy(), x = null;
				return;
			}
			S = x.onLevelSwitched((e) => u(e)), u(), t.value = "ready";
		} catch {
			C || (t.value = "error");
		}
	}
	function te(e) {
		x && (x.setCurrentLevel(e === "auto" ? -1 : e), u());
	}
	function ne() {
		if (C = !0, S) {
			try {
				S();
			} catch {}
			S = null;
		}
		if (x) {
			try {
				x.destroy();
			} catch {}
			x = null;
		}
	}
	function re() {
		ne(), t.value = "idle", n.value = 0, r.value = [], d();
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
		setLevel: te,
		start: ee,
		cleanup: ne,
		reset: re
	};
}
function Oe() {
	try {
		return new s();
	} catch {
		return null;
	}
}
function ke(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/components/player/shortcuts.ts
var Ae = [
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
], je = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Me = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Ne(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Z(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Pe(e, t) {
	switch (e.key) {
		case " ": return Ne(e.target) ? !1 : (t.playPause(), !0);
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
function Fe(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Z(n.target) || Pe(n, e) && n.preventDefault();
	}
	de(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), ue(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Ie = ["aria-label"], Le = { class: "shortcuts__head" }, Re = { class: "shortcuts__title" }, ze = { class: "shortcuts__grid" }, Be = { class: "shortcuts__keys" }, Ve = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, He = {
	key: 1,
	class: "shortcuts__key"
}, Ue = { class: "shortcuts__label" }, We = /*#__PURE__*/ e(/* @__PURE__ */ N({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Ae }
	},
	emits: ["close"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o(), l = L(null);
		return i(l, B(a, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (I(), k("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= U((e) => s("close"), ["self"])
		}, [A("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": V(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [A("div", Le, [A("h3", Re, z(V(c)("player.keyboard")), 1), M(n, {
			name: "x",
			label: V(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), A("ul", ze, [(I(!0), k(T, null, R(e.shortcuts, (e) => (I(), k("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [A("span", Be, [(I(!0), k(T, null, R(e.keys, (e, n) => (I(), k(T, { key: n }, [e === "–" ? (I(), k("span", Ve, "–")) : (I(), k("kbd", He, [V(je)[e] ? (I(), D(t, {
			key: 0,
			name: V(je)[e],
			label: V(Me)[e] ?? e
		}, null, 8, ["name", "label"])) : (I(), k(T, { key: 1 }, [j(z(e), 1)], 64))]))], 64))), 128))]), A("span", Ue, z(e.label), 1)]))), 128))])], 8, Ie)])) : O("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Ge = { class: "volume" }, Ke = /*#__PURE__*/ e(/* @__PURE__ */ N({
	__name: "VolumeControl",
	setup(e) {
		let t = d(), r = a(), { t: i } = o(), s = E(() => t.muted ? 0 : t.volume), c = E(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return H(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (I(), k("div", Ge, [M(n, {
			name: c.value,
			label: V(t).muted ? V(i)("player.unmute") : V(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => V(t).toggleMute()
		}, null, 8, ["name", "label"]), M(g, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: V(i)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), qe = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		], n = d(), { t: r } = o(), i = E(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (I(), D(_, {
			class: "speed-menu",
			tone: "glass",
			"model-value": V(n).rate,
			options: i.value,
			label: V(r)("player.playbackSpeed"),
			"onUpdate:modelValue": a
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), Q = "auto";
function Je(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function Ye(e) {
	return e >= 2160 ? "4K" : Je(e);
}
function Xe(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Je(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: Ye(r.height)
		}));
	}
	return n;
}
function Ze(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Je(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Qe(e, t) {
	if (t < 0) return Q;
	let n = e.find((e) => e.index === t);
	return n ? Je(n.height) : Q;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var $e = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		let n = e, r = t, i = d(), s = a(), { t: c } = o(), l = E(() => Xe(n.levels)), u = E(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!n.variants) return [];
			for (let r of [...n.variants].sort((e, t) => t.height - e.height)) {
				let n = Je(r.height);
				e.has(n) || (e.add(n), t.push({
					value: n,
					label: Ye(r.height)
				}));
			}
			return t;
		}), f = E(() => l.value.length >= 2 ? l.value : u.value), p = E(() => f.value.length >= 2), m = E(() => n.activeHeight == null ? c("player.qualityAuto") : c("player.qualityAutoActive", { label: Ye(n.activeHeight) })), h = E(() => [{
			value: Q,
			label: m.value
		}, ...f.value]), g = E(() => n.autoEnabled ? Q : Qe(n.levels, n.currentLevel));
		function v(e) {
			let t = String(e);
			if (i.setQuality(t), s.defaultQuality = t, t === "auto") {
				r("select", "auto");
				return;
			}
			let a = Ze(n.levels, t);
			r("select", a >= 0 ? a : "auto");
		}
		return (e, t) => p.value ? (I(), D(_, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": g.value,
			options: h.value,
			label: V(c)("player.quality"),
			"onUpdate:modelValue": v
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : O("", !0);
	}
}), [["__scopeId", "data-v-795d6db3"]]), et = /*#__PURE__*/ e(/* @__PURE__ */ N({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = L([]), i = E(() => S(n.styleConfig)), a = null, o = null;
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
		return H(() => [n.video, n.language], u, { immediate: !0 }), ue(c), t({ lines: r }), (t, n) => r.value.length ? (I(), k("div", {
			key: 0,
			class: P(["player__captions", { "is-lifted": e.lifted }]),
			style: F(i.value)
		}, [(I(!0), k(T, null, R(r.value, (e, t) => (I(), k("p", {
			key: t,
			class: "player__caption-line"
		}, z(e), 1))), 128))], 6)) : O("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), tt = ["aria-label", "aria-expanded"], nt = ["aria-label"], rt = { class: "capmenu__head" }, it = { class: "capmenu__title" }, at = ["aria-label"], ot = ["aria-checked", "tabindex"], st = { class: "capmenu__check" }, ct = { class: "capmenu__optlabel" }, lt = [
	"aria-checked",
	"tabindex",
	"onClick"
], ut = { class: "capmenu__check" }, dt = { class: "capmenu__optlabel" }, ft = { class: "capmenu__title capmenu__title--sub" }, pt = ["aria-label"], mt = [
	"aria-checked",
	"tabindex",
	"onClick"
], ht = { class: "capmenu__check" }, gt = { class: "capmenu__optlabel" }, _t = { class: "capmenu__title capmenu__title--sub" }, vt = { class: "capmenu__style" }, yt = { class: "capmenu__field" }, bt = { class: "capmenu__fieldlabel" }, xt = { class: "capmenu__field" }, St = { class: "capmenu__fieldlabel" }, Ct = { class: "capmenu__field" }, wt = { class: "capmenu__fieldlabel" }, Tt = { class: "capmenu__field" }, Et = { class: "capmenu__fieldlabel" }, Dt = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		let s = e, c = r, l = d(), u = a(), { t: f } = o(), p = L(null), m = L(null), h = E(() => l.subtitleLang), g = E(() => s.tracks.some((e) => e.language === h.value)), v = E(() => g.value ? "captions" : "captions-off"), y = E(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), b = E(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function S(e) {
			c("update:open", e);
		}
		function C() {
			S(!1);
		}
		function ee(e) {
			l.setSubtitle(e), u.defaultSubtitleLang = e, u.subtitlePreferenceSet = !0;
		}
		function te(e) {
			c("select-audio", e);
		}
		function re(e, t, n) {
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
		function ae(e) {
			let t = re(e, s.tracks.length + 1, y.value);
			t !== null && ee(t === 0 ? null : s.tracks[t - 1].language);
		}
		function oe(e) {
			let t = re(e, s.audioTracks.length, b.value);
			t !== null && te(s.audioTracks[t].index);
		}
		function se(e) {
			u.captionStyle = {
				...u.captionStyle,
				size: e
			};
		}
		function j(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function N(e) {
			u.captionStyle = {
				...u.captionStyle,
				background: e
			};
		}
		function ce(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		i(m, B(s, "open"), {
			lockScroll: !1,
			onEscape: () => (C(), !0)
		});
		function le(e) {
			p.value && !p.value.contains(e.target) && C();
		}
		return H(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", le, !0) : document.removeEventListener("pointerdown", le, !0));
		}, { immediate: !0 }), ue(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", le, !0);
		}), (r, i) => (I(), k("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [A("button", {
			type: "button",
			class: P(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? V(f)("player.captionsOn") : V(f)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => S(!e.open)
		}, [M(t, { name: v.value }, null, 8, ["name"])], 10, tt), e.open ? (I(), k("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": V(f)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			A("div", rt, [A("h3", it, z(V(f)("player.subtitles")), 1), M(n, {
				name: "x",
				label: V(f)("common.close"),
				size: "sm",
				onClick: C
			}, null, 8, ["label"])]),
			A("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": V(f)("player.subtitleTrack"),
				onKeydown: ae
			}, [A("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: y.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => ee(null)
			}, [A("span", st, [g.value ? O("", !0) : (I(), D(t, {
				key: 0,
				name: "check"
			}))]), A("span", ct, z(V(f)("player.off")), 1)], 8, ot), (I(!0), k(T, null, R(e.tracks, (e, n) => (I(), k("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: y.value === n + 1 ? 0 : -1,
				onClick: (t) => ee(e.language)
			}, [A("span", ut, [h.value === e.language ? (I(), D(t, {
				key: 0,
				name: "check"
			})) : O("", !0)]), A("span", dt, z(e.label), 1)], 8, lt))), 128))], 40, at),
			e.audioTracks.length > 1 ? (I(), k(T, { key: 0 }, [A("h3", ft, z(V(f)("player.audio")), 1), A("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": V(f)("player.audioTrack"),
				onKeydown: oe
			}, [(I(!0), k(T, null, R(e.audioTracks, (n) => (I(), k("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: b.value === n.index ? 0 : -1,
				onClick: (e) => te(n.index)
			}, [A("span", ht, [e.activeAudio === n.index ? (I(), D(t, {
				key: 0,
				name: "check"
			})) : O("", !0)]), A("span", gt, z(n.label), 1)], 8, mt))), 128))], 40, pt)], 64)) : O("", !0),
			A("h3", _t, z(V(f)("player.captionStyle")), 1),
			A("div", vt, [
				A("div", yt, [A("span", bt, z(V(f)("player.size")), 1), M(_, {
					"model-value": V(u).captionStyle.size,
					options: V(x),
					label: V(f)("player.captionSize"),
					"onUpdate:modelValue": se
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				A("div", xt, [A("span", St, z(V(f)("player.color")), 1), M(_, {
					"model-value": V(u).captionStyle.textColor,
					options: V(w),
					label: V(f)("player.captionColor"),
					"onUpdate:modelValue": j
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				A("div", Ct, [A("span", wt, z(V(f)("player.background")), 1), M(_, {
					"model-value": V(u).captionStyle.background,
					options: V(ie),
					label: V(f)("player.captionBackground"),
					"onUpdate:modelValue": N
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				A("div", Tt, [A("span", Et, z(V(f)("player.edge")), 1), M(_, {
					"model-value": V(u).captionStyle.edge,
					options: V(ne),
					label: V(f)("player.captionEdge"),
					"onUpdate:modelValue": ce
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, nt)) : O("", !0)], 512));
	}
}), [["__scopeId", "data-v-bce771b9"]]), Ot = 32, kt = 18, At = 250, jt = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Mt(e, t, n, r, i, a, o) {
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
		r: jt(d / m),
		g: jt(f / m),
		b: jt(p / m)
	};
}
function $(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Mt(e, t, n, 0, 0, r, n),
		right: Mt(e, t, n, t - r, 0, t, n),
		center: Mt(e, t, n, 0, 0, t, n)
	};
}
function Nt({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function Pt({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Ft(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Pt(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Pt(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Pt(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function It(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Lt = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		let n = e, r = L(!1), i = null;
		function a() {
			r.value = It(i);
		}
		let o = E(() => n.enabled && !n.reducedMotion && !r.value), s = E(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = L(null), l = null, u = null, d = !1, f = !1;
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
				c.value = Ft($(n, 32, 18));
			} catch {
				f = !0, c.value = null;
			}
		}
		function h(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let g = null, _ = null, v = null, y = 0, b = !1;
		function x(e) {
			_ = e, g = e.requestVideoFrameCallback(S);
		}
		function S(e) {
			if (!b) return;
			e - y >= 250 && (y = e, m());
			let t = n.video;
			h(t) && x(t);
		}
		function C() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			if (h(e)) {
				b = !0, y = 0, x(e);
				return;
			}
			m(), !f && (b = !0, v = setInterval(m, 250));
		}
		function w() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		H(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			w(), e && t && C();
		}, { immediate: !0 }), de(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ue(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let ee = E(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (I(), k("div", {
			class: P(["player__ambient", { "is-active": o.value }]),
			style: F(o.value ? ee.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Rt = ["aria-label"], zt = { class: "resume__label" }, Bt = { class: "resume__time numeric" }, Vt = { class: "resume__actions" }, Ht = /*#__PURE__*/ e(/* @__PURE__ */ N({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o(), a = E(() => i("player.resumeFrom").split("{time}"));
		return (n, o) => (I(), k("div", {
			class: "resume",
			role: "region",
			"aria-label": V(i)("player.resumePlayback")
		}, [A("p", zt, [
			j(z(a.value[0]), 1),
			A("span", Bt, z(V(W)(e.seconds)), 1),
			j(z(a.value[1]), 1)
		]), A("div", Vt, [A("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: o[0] ||= (e) => r("resume")
		}, [M(t, { name: "play" }), A("span", null, z(V(i)("player.resume")), 1)]), A("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: o[1] ||= (e) => r("restart")
		}, [M(t, { name: "rewind" }), A("span", null, z(V(i)("player.startOver")), 1)])])], 8, Rt));
	}
}), [["__scopeId", "data-v-271c5209"]]), Ut = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Wt = [
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
], Gt = new Set(Wt);
function Kt(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function qt(...e) {
	return e.some((e) => Gt.has(Kt(e)));
}
function Jt(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Yt(e) {
	return e?.error?.code === 2;
}
var Xt = 8, Zt = 15, Qt = 2 * Math.PI * 15;
function $t(e, t, n = Qt) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var en = ["aria-label"], tn = ["src"], nn = { class: "upnext__body" }, rn = { class: "upnext__eyebrow" }, an = { class: "upnext__title" }, on = {
	key: 0,
	class: "upnext__cd numeric"
}, sn = { class: "upnext__actions" }, cn = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, ln = ["r"], un = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], dn = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		let { t: r } = o(), i = e, a = n, s = E(() => i.posterUrl ?? i.media.poster_url ?? null), c = E(() => $t(i.remaining, i.total));
		return (n, i) => (I(), k("aside", {
			class: "upnext",
			role: "region",
			"aria-label": V(r)("player.upNext")
		}, [
			s.value ? (I(), k("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, tn)) : O("", !0),
			A("div", nn, [
				A("p", rn, z(V(r)("player.upNext")), 1),
				A("h4", an, z(e.media.name), 1),
				e.counting ? (I(), k("p", on, z(V(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : O("", !0),
				A("div", sn, [A("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [M(t, { name: "play" }), A("span", null, z(V(r)("player.playNow")), 1)]), A("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, z(V(r)("player.cancel")), 1)])
			]),
			e.counting ? (I(), k("svg", cn, [A("circle", {
				cx: "18",
				cy: "18",
				r: V(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, ln), A("circle", {
				cx: "18",
				cy: "18",
				r: V(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": V(Qt),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, un)])) : O("", !0)
		], 8, en));
	}
}), [["__scopeId", "data-v-85909b2d"]]), fn = {
	class: "transcode",
	role: "alert"
}, pn = { class: "transcode__card" }, mn = { class: "transcode__heading" }, hn = { class: "transcode__body" }, gn = /*#__PURE__*/ e(/* @__PURE__ */ N({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o();
		return (n, a) => (I(), k("div", fn, [A("div", pn, [
			M(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			A("h3", mn, z(V(i)("player.transcodeHeading")), 1),
			A("p", hn, z(e.title ? V(i)("player.transcodeBodyTitled", { title: e.title }) : V(i)("player.transcodeBodyUntitled")), 1),
			A("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [M(t, { name: "arrow-left" }), A("span", null, z(V(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), _n = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, vn = { class: "prep__card" }, yn = { class: "prep__heading" }, bn = { class: "prep__body" }, xn = ["aria-valuenow"], Sn = /*#__PURE__*/ e(/* @__PURE__ */ N({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = o(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (I(), k("div", _n, [A("div", vn, [
			M(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			A("h3", yn, z(V(r)("player.transcodePreparingHeading")), 1),
			A("p", bn, z(e.title ? V(r)("player.transcodePreparingTitled", { title: e.title }) : V(r)("player.transcodePreparingUntitled")), 1),
			A("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [A("div", {
				class: "prep__bar-fill",
				style: F({ width: i() + "%" })
			}, null, 4)], 8, xn),
			A("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [M(t, { name: "arrow-left" }), A("span", null, z(V(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Cn = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		let c = E(() => s(r.position, r.introMarker) ? {
			label: a("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: a("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (I(), D(se, { name: "skip" }, {
			default: fe(() => [c.value ? (I(), k("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: U(l, ["stop"])
			}, [A("span", null, z(c.value.label), 1), M(t, { name: "skip-forward" })])) : O("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), wn = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, Tn = ["aria-label", "onClick"], En = { class: "skip-controls__label" }, Dn = 5, On = 30, kn = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
			let n = s(e.startMs), r = n - Dn, i = n + On;
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
		let f = E(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (I(), k("div", wn, [(I(!0), k(T, null, R(f.value, (e) => (I(), k("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: U((t) => p(e), ["stop"])
		}, [A("span", En, z(d(e.type)), 1), M(t, { name: "skip-forward" })], 8, Tn))), 128))])) : O("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), An = ["aria-label", "aria-expanded"], jn = ["aria-label"], Mn = { class: "chapterlist__head" }, Nn = { class: "chapterlist__title" }, Pn = ["aria-label"], Fn = ["onClick"], In = { class: "chapterlist__index" }, Ln = { class: "chapterlist__name" }, Rn = { class: "chapterlist__meta" }, zn = { class: "chapterlist__time" }, Bn = {
	key: 0,
	class: "chapterlist__duration"
}, Vn = {
	key: 1,
	class: "chapterlist__empty"
}, Hn = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		let d = E(() => a.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = W(e.start), a;
			return e.end != null && e.end > e.start && (a = W(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = L(null), p = L(null);
		i(p, B(a, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		H(() => a.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), ue(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (I(), k("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [A("button", {
			type: "button",
			class: P(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": V(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [M(t, { name: "list" })], 10, An), e.open ? (I(), k("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": V(c)("player.chapterList"),
			tabindex: "-1"
		}, [A("div", Mn, [A("h3", Nn, z(V(c)("player.chapters")), 1), M(n, {
			name: "x",
			label: V(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (I(), k("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": V(c)("player.chapterList")
		}, [(I(!0), k(T, null, R(d.value, (e) => (I(), k("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [A("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			A("span", In, z(e.index), 1),
			A("span", Ln, z(e.label), 1),
			A("span", Rn, [A("span", zn, z(e.startLabel), 1), e.durationLabel ? (I(), k("span", Bn, "· " + z(e.durationLabel), 1)) : O("", !0)])
		], 8, Fn)]))), 128))], 8, Pn)) : (I(), k("p", Vn, z(V(c)("player.noChapters")), 1))], 8, jn)) : O("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Un = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Wn = { class: "marker-timeline__ticks" }, Gn = [
	"title",
	"aria-label",
	"onClick"
], Kn = { class: "marker-timeline__tooltip" }, qn = { class: "marker-timeline__tooltip-label" }, Jn = { class: "marker-timeline__tooltip-time numeric" }, Yn = ["onClick"], Xn = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		let s = E(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = E(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = E(() => c.value !== null), u = E(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (I(), k("div", {
			key: 0,
			class: P(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (I(), k("div", Un, [t[0] ||= A("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [A("polygon", { points: "5,3 19,12 5,21" })], -1), j(" " + z(u.value), 1)])) : O("", !0), A("div", Wn, [(I(!0), k(T, null, R(s.value, (e) => (I(), k("button", {
			key: e.id,
			type: "button",
			class: P(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: F({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${V(W)(e.startSec)}`,
			"aria-label": `${e.label} at ${V(W)(e.startSec)}`,
			onClick: U((t) => d(e), ["stop"])
		}, [A("span", Kn, [
			A("span", qn, z(e.label), 1),
			A("span", Jn, z(V(W)(e.startSec)), 1),
			A("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: U((t) => f(e), ["stop"])
			}, " Find similar ", 8, Yn)
		])], 14, Gn))), 128))])], 2)) : O("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Zn = ["aria-label", "aria-expanded"], Qn = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, $n = ["aria-label"], er = ["aria-selected", "onClick"], tr = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		], s = L(0), c = L(0), l = E(() => c.value > 0), u;
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
		let h = L(!1);
		function g() {
			l.value ? (p(0), h.value = !1) : h.value = !h.value;
		}
		function _(e) {
			p(e), h.value = !1;
		}
		return ue(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (I(), k("div", { class: P(["sleep-timer", { "is-active": l.value }]) }, [A("button", {
			type: "button",
			class: P(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : V(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [M(t, { name: "moon" }), l.value ? (I(), k("span", Qn, z(m(c.value)), 1)) : O("", !0)], 10, Zn), M(se, { name: "dropdown" }, {
			default: fe(() => [h.value ? (I(), k("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": V(i)("player.sleepTimer")
			}, [(I(), k(T, null, R(a, (e) => A("li", {
				key: e.value,
				class: P(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, z(e.label), 11, er)), 64))], 8, $n)) : O("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), nr = {
	key: 0,
	class: "syncplay-overlay"
}, rr = { class: "syncplay-overlay__badge" }, ir = { class: "syncplay-overlay__label" }, ar = { class: "syncplay-overlay__status-label" }, or = { class: "syncplay-overlay__members" }, sr = { class: "syncplay-overlay__member-count" }, cr = { class: "syncplay-overlay__member-list" }, lr = { class: "syncplay-overlay__member-name" }, ur = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, dr = /*#__PURE__*/ e(/* @__PURE__ */ N({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = o(), i = ae(), a = u(), s = E(() => n.apiBase ?? a.value), c = E(() => i.currentRoom?.name ?? "SyncPlay"), l = E(() => i.onlineMembers.length), d = E(() => i.syncStatus), f = E(() => {
			switch (d.value) {
				case "synced": return r("syncplay.synced");
				case "outOfSync": return r("syncplay.outOfSync");
				case "re-syncing": return r("syncplay.reSyncing");
				default: return r("syncplay.synced");
			}
		}), p = E(() => {
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
		return (e, n) => V(i).isInRoom ? (I(), k("div", nr, [
			A("div", rr, [M(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), A("span", ir, "SyncPlay: " + z(c.value), 1)]),
			A("div", { class: P(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [M(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), A("span", ar, z(f.value), 1)], 2),
			A("div", or, [A("span", sr, [M(t, { name: "user" }), j(" " + z(l.value) + " " + z(V(r)("syncplay.members", { count: l.value })), 1)]), A("ul", cr, [(I(!0), k(T, null, R(V(i).onlineMembers.slice(0, 5), (e) => (I(), k("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= A("span", { class: "syncplay-overlay__member-dot" }, null, -1), A("span", lr, z(e.name), 1)]))), 128)), V(i).onlineMembers.length > 5 ? (I(), k("li", ur, " +" + z(V(i).onlineMembers.length - 5) + " more ", 1)) : O("", !0)])]),
			M(h, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: fe(() => [j(z(V(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : O("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), fr = {
	key: 0,
	class: "syncplay-controls"
}, pr = ["aria-label"], mr = { class: "syncplay-controls__wait-label" }, hr = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, gr = { key: 0 }, _r = { class: "syncplay-controls__transport" }, vr = ["aria-label"], yr = ["aria-label"], br = ["aria-label"], xr = { class: "syncplay-controls__status-label" }, Sr = 10, Cr = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		let r = e, i = n, { t: a } = o(), s = ae(), c = u(), l = E(() => r.apiBase ?? c.value), d = L(!1), f = L([]), p = E(() => d.value || s.syncStatus === "re-syncing");
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
			await _(Math.max(0, r.position - Sr));
		}
		async function y() {
			await _(Math.min(r.duration, r.position + Sr));
		}
		return H(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => V(s).isInRoom ? (I(), k("div", fr, [
			p.value ? (I(), k("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": V(a)("syncplay.waitingForMembers")
			}, [
				M(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				A("span", mr, z(V(a)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (I(), k("span", hr, [j(z(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (I(), k("span", gr, "+" + z(f.value.length - 3), 1)) : O("", !0)])) : O("", !0)
			], 8, pr)) : O("", !0),
			A("div", _r, [
				A("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": V(a)("syncplay.rewind"),
					onClick: v
				}, [M(t, { name: "rewind" })], 8, vr),
				A("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? V(a)("syncplay.pauseAll") : V(a)("syncplay.playAll"),
					onClick: g
				}, [M(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, yr),
				A("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": V(a)("syncplay.fastForward"),
					onClick: y
				}, [M(t, { name: "forward" })], 8, br)
			]),
			A("div", { class: P(["syncplay-controls__status", `syncplay-controls__status--${V(s).syncStatus}`]) }, [M(t, {
				name: V(s).syncStatus === "synced" ? "check" : V(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), A("span", xr, z(V(s).syncStatus === "synced" ? V(a)("syncplay.synced") : V(s).syncStatus === "outOfSync" ? V(a)("syncplay.outOfSync") : V(a)("syncplay.reSyncing")), 1)], 2)
		])) : O("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), wr = { class: "player__stage" }, Tr = ["src", "poster"], Er = [
	"src",
	"srclang",
	"label",
	"default"
], Dr = { class: "player__meta" }, Or = ["aria-label"], kr = { class: "player__meta-text" }, Ar = { class: "player__eyebrow" }, jr = { class: "player__title" }, Mr = { class: "player__sub numeric" }, Nr = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Pr = {
	key: 0,
	class: "player__center"
}, Fr = ["aria-label"], Ir = { class: "player__btnrow" }, Lr = ["aria-label"], Rr = ["aria-label"], zr = ["aria-label"], Br = { class: "player__time numeric" }, Vr = ["aria-label", "aria-pressed"], Hr = ["aria-label"], Ur = ["aria-label"], Wr = ["aria-label", "aria-pressed"], Gr = ["aria-label", "aria-pressed"], Kr = ["aria-label"], qr = { class: "similar-modal" }, Jr = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Yr = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, Xr = { class: "similar-modal__state-title" }, Zr = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, Qr = {
	key: 3,
	class: "similar-modal__results"
}, $r = { class: "similar-modal__poster" }, ei = ["src", "alt"], ti = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, ni = { class: "similar-modal__result-body" }, ri = { class: "similar-modal__result-title" }, ii = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, ai = { key: 0 }, oi = /*#__PURE__*/ e(/* @__PURE__ */ N({
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
		let i = e, s = n, l = d(), u = a(), { t: h } = o(), g = ae(), _ = f(), v = E(() => _.isFavorite(i.media.id)), y = E(() => _.likeLevel(i.media.id));
		function b() {
			_.toggleFavorite(i.media.id, K());
		}
		function x(e) {
			_.setLike(i.media.id, e, K());
		}
		let S = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], w = L(null), ne = L(null), ie = L(!0), se = L(!1), N = L(!1), F = L(!1), B = L(!1), pe = L(!1), me = L(!1), he = L(null), ge = L(!1), ve = E(() => B.value ? 1.35 : 1), G = L(qt(i.streamUrl, i.media.path)), ye = ce("phlixConfig", null);
		function K() {
			return ye?.apiBase ?? "";
		}
		let q = De({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: ye?.playerHlsConfig
		}), be = E(() => G.value ? void 0 : i.streamUrl), J = E(() => G.value && q.state.value !== "ready"), xe = E(() => G.value && (q.state.value === "preparing" || q.state.value === "idle")), Se = E(() => G.value && q.state.value === "error");
		function Ce() {
			let e = w.value;
			e && q.start(e, i.media.id);
		}
		function we(e) {
			q.setLevel(e);
		}
		let Te = !1;
		H(() => q.levels.value, (e) => {
			if (Te || e.length === 0) return;
			Te = !0;
			let t = u.defaultQuality;
			if (!t || t === "auto") return;
			let n = Ze(e, t);
			n >= 0 && q.setLevel(n);
		});
		let Ee = L(l.resumePositionFor(i.media.id) ?? 0), Y = L(!G.value && Ee.value > 0), X = null, Oe = L(!1), ke = L(8), Ae, je = L(null), Me = L(0), Ne = L(!1), Z = L([]), Pe = L(!1), Ie = L(null);
		function Le(e, t) {
			je.value = e, Me.value = t, Z.value = [], Ie.value = null, Ne.value = !0, Re(e, t);
		}
		async function Re(e, t) {
			Pe.value = !0, Ie.value = null;
			try {
				let n = await c.searchByMarker(e, t, 30, 20);
				Z.value = Array.isArray(n.items) ? n.items : [];
			} catch {
				Ie.value = "Failed to load similar media. Please try again.", Z.value = [];
			} finally {
				Pe.value = !1;
			}
		}
		function ze() {
			Ne.value = !1, Z.value = [], Ie.value = null, je.value = null;
		}
		let Be = E(() => l.upNext);
		function Ve() {
			G.value = qt(i.streamUrl, i.media.path), Ee.value = l.resumePositionFor(i.media.id) ?? 0, Y.value = !G.value && Ee.value > 0, X = null, vt = !1, lt = !1, Te = !1, Q(), Oe.value = !1, q.reset(), w.value && (w.value.currentTime = 0), G.value && Ce();
		}
		function He(e) {
			let t = w.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : X = Math.max(0, e));
		}
		function Ue() {
			He(Ee.value), Y.value = !1, w.value?.play()?.catch(() => {});
		}
		function Ge() {
			X = null, He(0), l.clearResume(i.media.id), Y.value = !1, w.value?.play()?.catch(() => {});
		}
		function Q() {
			Ae &&= (clearInterval(Ae), void 0);
		}
		function Je() {
			ke.value = 8, Q(), Ae = setInterval(() => {
				--ke.value, ke.value <= 0 && (Q(), Xe());
			}, 1e3);
		}
		function Ye() {
			Zt(), ie.value = !0, l.upNext && (Oe.value = !0, u.autoplay && Je());
		}
		function Xe() {
			Q(), Oe.value = !1;
			let e = l.next(i.streamUrlFor);
			e && s("play-next", e);
		}
		function Qe() {
			Q(), Oe.value = !1;
		}
		function tt() {
			if (G.value) return;
			let e = w.value, t = Yt(e) && (e?.currentTime ?? 0) === 0;
			(Jt(e) || t) && (G.value = !0, Ce());
		}
		let nt = L([]), rt = L([]), it = L(-1), at = L(!1), ot = L(!1), st = l.subtitleLang, ct = E(() => q.subtitleTracks.value), lt = !1;
		function ut() {
			if (lt) return;
			if (u.subtitlePreferenceSet) {
				lt = !0;
				return;
			}
			let e = ct.value.find((e) => e.default);
			if (!e) return;
			let t = nt.value.find((t) => t.language === (e.language || e.label));
			t && (l.setSubtitle(t.language), st = t.language, lt = !0);
		}
		let dt = E(() => nt.value.some((e) => e.language === l.subtitleLang));
		function ft() {
			let e = w.value;
			nt.value = C(e), rt.value = te(e), it.value = ee(e), ut();
		}
		function pt() {
			if (dt.value) st = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = st && nt.value.some((e) => e.language === st) ? st : nt.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			s("captions");
		}
		function mt(e) {
			re(w.value, e), it.value = e;
		}
		H(ct, () => {
			le(() => ft());
		}, { deep: !0 });
		let ht = null, gt, _t = E(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), vt = !1;
		function yt() {
			if (!i.autoplay || vt || Y.value || J.value) return;
			let e = w.value;
			if (!e || !e.paused) return;
			vt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, l.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function bt() {
			yt();
		}
		function xt() {
			i.prevEpisode && s("play-episode", i.prevEpisode);
		}
		function St() {
			i.nextEpisode && s("play-episode", i.nextEpisode);
		}
		function Ct() {
			let e = w.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function wt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Tt() {
			l.play();
		}
		function Et() {
			l.pause();
		}
		function Ot() {
			let e = w.value;
			e && (l.updateProgress(e.currentTime, e.duration, wt(e)), l.setMediaPositionState());
		}
		function kt() {
			let e = w.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, X !== null && (e.currentTime = e.duration ? Math.min(e.duration, X) : X, X = null), l.updateProgress(e.currentTime, e.duration, wt(e)), l.setMediaPositionState(), ft());
		}
		function At() {
			let e = w.value;
			e && l.updateProgress(e.currentTime, e.duration, wt(e));
		}
		function jt() {
			let e = w.value;
			e && (Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function Mt() {
			let e = w.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate);
		}
		function $(e) {
			let t = w.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function Nt() {
			N.value = !0, $t();
		}
		function Pt() {
			N.value = !1, $t();
		}
		function Ft(e) {
			let t = S.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(S[e] - l.rate) ? n : e, 0), n = S[Math.min(S.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function It() {
			if (!i.markers) return;
			let e = l.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Rt() {
			if (!i.markers) return;
			let e = l.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function zt() {
			he.value?.toggleOpen();
		}
		Fe({
			playPause: Ct,
			seekBy: (e) => $(l.position + e),
			frameStep: (e) => {
				l.playing || $(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: Bt,
			toggleFullscreen: Ut,
			toggleCaptions: pt,
			toggleTheater: Vt,
			togglePip: Gt,
			skipIntro: It,
			skipOutro: Rt,
			sleepTimer: zt,
			seekToPercent: (e) => $(e * l.duration),
			speedStep: Ft,
			toggleHelp: () => {
				F.value = !F.value;
			}
		}, { enabled: () => !F.value && !at.value && !ot.value });
		function Bt() {
			l.toggleMute();
		}
		function Vt() {
			B.value = !B.value, s("theater", B.value);
		}
		H(() => l.muted, (e) => {
			let t = w.value;
			t && t.muted !== e && (t.muted = e);
		}), H(() => l.volume, (e) => {
			let t = w.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), H(() => l.rate, (e) => {
			let t = w.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), H(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? He(e.value) : e.type === "seekBy" && He(l.position + e.value));
		});
		function Ut() {
			if (typeof document > "u") return;
			let e = ne.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function Wt() {
			se.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Gt() {
			let e = w.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function Kt() {
			pe.value = !0;
		}
		function Xt() {
			pe.value = !1;
		}
		function Zt() {
			gt &&= (clearTimeout(gt), void 0);
		}
		function Qt() {
			Zt(), !(!l.playing || N.value) && (gt = setTimeout(() => {
				l.playing && !N.value && (ie.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function $t() {
			ie.value = !0, Qt();
		}
		H(() => l.playing, (e) => {
			e ? (Y.value = !1, Qe(), Qt()) : (Zt(), ie.value = !0);
		});
		let en = null;
		return de(() => {
			l.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), _.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", Wt), me.value = document.pictureInPictureEnabled === !0), en = l.bindMediaSession({
				onPlay: () => void w.value?.play()?.catch(() => {}),
				onPause: () => w.value?.pause(),
				onSeek: (e) => $(e)
			}), ht = w.value?.textTracks ?? null, ht?.addEventListener?.("addtrack", ft), ht?.addEventListener?.("removetrack", ft), ft(), G.value && Ce();
		}), H(() => i.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), Ve();
		}), H(() => i.media?.id, () => {
			_.hydrate(i.media);
		}), H(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (w.value?.play(), l.play()) : e.state === "paused" && (w.value?.pause(), l.pause()));
		}), ue(() => {
			Zt(), Q(), q.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", Wt), en?.(), ht?.removeEventListener?.("addtrack", ft), ht?.removeEventListener?.("removetrack", ft);
		}), (n, i) => (I(), k("div", {
			ref_key: "containerRef",
			ref: ne,
			class: P(["player", {
				"is-chrome-hidden": !ie.value,
				"is-theater": B.value
			}]),
			onPointermove: $t,
			onPointerdown: $t,
			onFocusin: $t
		}, [M(Lt, {
			video: w.value,
			enabled: V(u).atmosphere,
			playing: V(l).playing,
			"reduced-motion": V(u).effectiveReducedMotion,
			intensity: ve.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), A("div", wr, [
			A("video", {
				ref_key: "videoRef",
				ref: w,
				class: "player__video",
				src: be.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Tt,
				onPause: Et,
				onTimeupdate: Ot,
				onLoadedmetadata: kt,
				onCanplay: bt,
				onProgress: At,
				onVolumechange: jt,
				onRatechange: Mt,
				onEnded: Ye,
				onError: tt,
				onEnterpictureinpicture: Kt,
				onLeavepictureinpicture: Xt,
				onClick: Ct
			}, [(I(!0), k(T, null, R(ct.value, (e) => (I(), k("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Er))), 128))], 40, Tr),
			i[17] ||= A("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[18] ||= A("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			A("div", Dr, [A("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": V(h)("player.back"),
				onClick: i[0] ||= U((e) => s("back"), ["stop"])
			}, [M(t, { name: "arrow-left" })], 8, Or), A("div", kr, [
				A("p", Ar, z(V(h)("player.nowPlaying")), 1),
				A("h2", jr, z(e.media.name), 1),
				A("div", Mr, [(I(!0), k(T, null, R(_t.value, (e, t) => (I(), k(T, { key: t }, [t > 0 && !e.cert ? (I(), k("span", Nr, "·")) : O("", !0), A("span", { class: P({ player__cert: e.cert }) }, z(e.text), 3)], 64))), 128))])
			])]),
			J.value ? O("", !0) : (I(), k("div", Pr, [A("button", {
				type: "button",
				class: P(["player__bigplay", { "is-playing": V(l).playing }]),
				"aria-label": V(l).playing ? V(h)("player.pause") : V(h)("player.play"),
				onClick: U(Ct, ["stop"])
			}, [M(t, { name: V(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Fr)])),
			M(et, {
				video: w.value,
				language: V(l).subtitleLang,
				"style-config": V(u).captionStyle,
				lifted: ie.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			J.value ? O("", !0) : (I(), k("div", {
				key: 1,
				class: "player__controls",
				onClick: i[5] ||= U(() => {}, ["stop"])
			}, [
				M(_e, {
					position: V(l).position,
					duration: V(l).duration,
					buffered: V(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": e.thumbnailAt,
					onSeek: $,
					onScrubStart: Nt,
					onScrubEnd: Pt
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				V(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (I(), D(Xn, {
					key: 0,
					position: V(l).position,
					duration: V(l).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: Le
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : O("", !0),
				A("div", Ir, [
					e.prevEpisode ? (I(), k("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": V(h)("player.previousEpisode"),
						onClick: xt
					}, [M(t, { name: "skip-back" })], 8, Lr)) : O("", !0),
					A("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": V(l).playing ? V(h)("player.pause") : V(h)("player.play"),
						onClick: Ct
					}, [M(t, { name: V(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Rr),
					e.nextEpisode ? (I(), k("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": V(h)("player.nextEpisode"),
						onClick: St
					}, [M(t, { name: "skip-forward" })], 8, zr)) : O("", !0),
					A("span", Br, [
						j(z(V(W)(V(l).position)), 1),
						i[13] ||= A("span", { class: "player__sep" }, " / ", -1),
						j(z(V(W)(V(l).duration)), 1)
					]),
					i[14] ||= A("span", { class: "player__grow" }, null, -1),
					A("button", {
						type: "button",
						class: P(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": v.value ? "true" : "false",
						onClick: b
					}, [M(t, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Vr),
					M(p, {
						level: y.value,
						onCycle: x
					}, null, 8, ["level"]),
					M(Ke),
					M(qe),
					M($e, {
						levels: V(q).levels.value,
						variants: V(q).variants.value,
						"current-level": V(q).currentLevel.value,
						"auto-enabled": V(q).autoEnabled.value,
						"active-height": V(q).activeLevelHeight.value,
						onSelect: we
					}, null, 8, [
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					M(Dt, {
						open: at.value,
						"onUpdate:open": i[1] ||= (e) => at.value = e,
						tracks: nt.value,
						"audio-tracks": rt.value,
						"active-audio": it.value,
						onSelectAudio: mt
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					M(Hn, {
						open: ot.value,
						"onUpdate:open": i[2] ||= (e) => ot.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					M(tr, {
						ref_key: "sleepTimerRef",
						ref: he,
						"on-expire": () => {
							w.value?.pause(), V(l).pause();
						}
					}, null, 8, ["on-expire"]),
					A("button", {
						type: "button",
						class: P(["player__iconbtn player__syncplay", { "is-on": V(g).isInRoom }]),
						"aria-label": V(g).isInRoom ? V(h)("syncplay.inRoom") : V(h)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[3] ||= (e) => ge.value = !0
					}, [M(t, { name: "user" })], 10, Hr),
					A("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": V(h)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[4] ||= (e) => F.value = !0
					}, [M(t, { name: "info" })], 8, Ur),
					me.value ? (I(), k("button", {
						key: 2,
						type: "button",
						class: P(["player__iconbtn", { "is-on": pe.value }]),
						"aria-label": pe.value ? V(h)("player.exitPip") : V(h)("player.pip"),
						"aria-pressed": pe.value,
						onClick: Gt
					}, [M(t, { name: "pip" })], 10, Wr)) : O("", !0),
					A("button", {
						type: "button",
						class: P(["player__iconbtn", { "is-on": B.value }]),
						"aria-label": B.value ? V(h)("player.exitTheater") : V(h)("player.theater"),
						"aria-pressed": B.value,
						onClick: Vt
					}, [M(t, { name: "theater" })], 10, Gr),
					A("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": se.value ? V(h)("player.exitFullscreen") : V(h)("player.fullscreen"),
						onClick: Ut
					}, [M(t, { name: se.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Kr)
				])
			])),
			J.value ? O("", !0) : (I(), D(Cn, {
				key: 2,
				position: V(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			J.value ? O("", !0) : (I(), D(kn, {
				key: 3,
				position: V(l).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Y.value && !J.value ? (I(), D(Ht, {
				key: 4,
				seconds: Ee.value,
				onResume: Ue,
				onRestart: Ge
			}, null, 8, ["seconds"])) : O("", !0),
			Oe.value && Be.value && !J.value ? (I(), D(dn, {
				key: 5,
				media: Be.value,
				remaining: ke.value,
				total: V(8),
				counting: V(u).autoplay,
				onPlayNow: Xe,
				onCancel: Qe
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : O("", !0),
			M(r, {
				modelValue: Ne.value,
				"onUpdate:modelValue": i[6] ||= (e) => Ne.value = e,
				title: `Similar ${je.value ?? "marker"}s`,
				size: "lg",
				onClose: ze
			}, {
				default: fe(() => [A("div", qr, [Pe.value ? (I(), k("div", Jr, [M(m, { label: "Finding similar media" })])) : Ie.value ? (I(), k("div", Yr, [M(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), A("p", Xr, z(Ie.value), 1)])) : !Pe.value && Z.value.length === 0 ? (I(), k("div", Zr, [
					M(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[15] ||= A("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[16] ||= A("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (I(), k("ul", Qr, [(I(!0), k(T, null, R(Z.value, (e) => (I(), k("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [A("div", $r, [e.poster_url ? (I(), k("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, ei)) : (I(), k("div", ti, [M(t, { name: "film" })]))]), A("div", ni, [A("p", ri, z(e.name), 1), e.year ? (I(), k("p", ii, [j(z(e.year) + " ", 1), e.runtime ? (I(), k("span", ai, " · " + z(e.runtime) + "m", 1)) : O("", !0)])) : O("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			xe.value ? (I(), D(Sn, {
				key: 6,
				title: e.media.name,
				progress: V(q).progress.value,
				onBack: i[7] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : O("", !0),
			Se.value ? (I(), D(gn, {
				key: 7,
				title: e.media.name,
				onBack: i[8] ||= (e) => s("back")
			}, null, 8, ["title"])) : O("", !0),
			V(g).isInRoom ? (I(), D(Cr, {
				key: 8,
				position: V(l).position,
				duration: V(l).duration,
				"is-playing": V(l).playing,
				onSeek: $,
				onPlay: i[9] ||= (e) => void w.value?.play(),
				onPause: i[10] ||= (e) => void w.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : O("", !0),
			V(g).isInRoom ? (I(), D(dr, { key: 9 })) : O("", !0),
			M(oe, {
				modelValue: ge.value,
				"onUpdate:modelValue": i[11] ||= (e) => ge.value = e
			}, null, 8, ["modelValue"]),
			M(We, {
				open: F.value,
				onClose: i[12] ||= (e) => F.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-27891453"]]);
//#endregion
export { Ke as A, Ee as B, Nt as C, et as D, Dt as E, Pe as F, Se as G, we as H, Z as I, ve as J, Ce as K, Fe as L, je as M, Me as N, $e as O, Ae as P, De as R, It as S, $ as T, Te as U, J as V, X as W, W as X, _e as Y, kt as _, dn as a, Ft as b, Xt as c, Kt as d, Jt as f, Lt as g, Ht as h, gn as i, We as j, qe as k, Qt as l, $t as m, Cn as n, Ut as o, qt as p, G as q, Sn as r, Wt as s, oi as t, Zt as u, At as v, Pt as w, Mt as x, Ot as y, Y as z };

//# sourceMappingURL=Player-CD93fLnl.js.map