import { n as e, t } from "./Icon-24ngwBUH.js";
import { t as n } from "./IconButton-tqdU5uf9.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { a as i } from "./usePreferencesStore-DqGc5jlA.js";
import { t as a } from "./useMessages--P0Tza-Y.js";
import { c as o, t as s } from "./client-fw74f3l_.js";
import { n as c, o as l, t as u } from "./ThumbRating-CEhvLFWq.js";
import { t as d } from "./Slider-CaOjV5mW.js";
import { t as f } from "./Select-BStd8O6i.js";
import { c as p, g as m, h, i as g, l as _, m as v, n as y, o as b, p as x, r as S, s as ee, t as te } from "./captions-COgPp5bH.js";
import { Fragment as C, Transition as w, computed as T, createBlock as E, createCommentVNode as D, createElementBlock as O, createElementVNode as k, createTextVNode as A, createVNode as j, defineComponent as M, inject as ne, nextTick as re, normalizeClass as N, normalizeStyle as P, onBeforeUnmount as ie, onMounted as ae, openBlock as F, ref as I, renderList as L, toDisplayString as R, toRef as z, unref as B, watch as V, withCtx as H, withModifiers as oe } from "vue";
//#region src/components/player/format-time.ts
function se(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var ce = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], le = { class: "scrubber__track" }, ue = ["title"], U = { class: "scrubber__time numeric" }, de = /*#__PURE__*/ e(/* @__PURE__ */ M({
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
		let { t: r } = a(), i = e, o = n, s = I(null), c = I(!1), l = I(!1), u = I(0), d = I(0), f = (e) => Math.min(1, Math.max(0, e)), p = T(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = T(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = T(() => (c.value || l.value) && i.duration > 0), g = T(() => c.value ? u.value : d.value), _ = T(() => g.value * i.duration), v = T(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = T(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = T(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = T(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function S(e) {
			let t = s.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : f((e.clientX - n.left) / n.width);
		}
		function ee(e) {
			if (i.duration <= 0) return;
			c.value = !0;
			try {
				s.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = S(e);
			u.value = t, o("scrub-start"), o("seek", t * i.duration), e.preventDefault();
		}
		function te(e) {
			let t = S(e);
			d.value = t, c.value && (u.value = t, o("seek", t * i.duration));
		}
		function w(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				o("scrub-end");
			}
		}
		function E() {
			l.value = !0;
		}
		function A() {
			l.value = !1;
		}
		function j(e) {
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
			o("seek", n), e.preventDefault();
		}
		return t({
			playedRatio: p,
			previewActive: h
		}), (t, n) => (F(), O("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": B(se)(e.position),
			"aria-label": B(r)("player.seek"),
			onPointerdown: ee,
			onPointermove: te,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: E,
			onPointerleave: A,
			onKeydown: j
		}, [k("div", le, [
			k("div", {
				class: "scrubber__buffered",
				style: P({ transform: `scaleX(${m.value})` })
			}, null, 4),
			k("div", {
				class: "scrubber__played",
				style: P({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(F(!0), O(C, null, L(x.value, (e, t) => (F(), O("span", {
				key: t,
				class: "scrubber__tick",
				style: P({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, ue))), 128)),
			k("div", {
				class: N(["scrubber__head", { "is-dragging": c.value }]),
				style: P({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (F(), O("div", {
			key: 0,
			class: "scrubber__preview",
			style: P({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (F(), O("div", {
			key: 0,
			class: "scrubber__thumb",
			style: P({ backgroundImage: y.value })
		}, null, 4)) : D("", !0), k("span", U, R(B(se)(_.value)), 1)], 4)) : D("", !0)], 40, ce));
	}
}), [["__scopeId", "data-v-39414106"]]);
//#endregion
//#region src/components/player/hls-playback.ts
function fe(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
async function pe(e, t, n = {}) {
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
	if (fe(e)) {
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
var W = new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function G(e, t = "") {
	return typeof e == "string" ? e : t;
}
function K(e) {
	return e === !0 || e === "true" || e === 1;
}
function me(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function he(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = G(e.url ?? e.src);
		r !== "" && t.push({
			index: me(e.index),
			language: G(e.language ?? e.lang ?? e.srclang),
			label: G(e.label),
			default: K(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function ge(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function _e(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function ve(e) {
	let t = e ?? {};
	return {
		jobId: G(t.job_id ?? t.jobId),
		masterUrl: G(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: G(t.status, "running"),
		reused: K(t.reused),
		subtitles: he(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks)
	};
}
function ye(e) {
	let t = e ?? {};
	return {
		jobId: G(t.job_id ?? t.jobId),
		status: G(t.status, "running"),
		playlistReady: K(t.playlist_ready ?? t.playlistReady),
		progress: me(t.progress),
		masterUrl: G(t.master_url ?? t.masterUrl),
		subtitles: he(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks)
	};
}
function q(e) {
	return e.playlistReady || e.status === "completed";
}
function J(e) {
	return W.has(e);
}
function Y(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function be(e) {
	let t = I("idle"), n = I(0), r = I([]), i = I([]), a = I(-1), o = I(!0), c = I(null);
	function l(e) {
		if (!y) return;
		i.value = y.levels, a.value = y.getCurrentLevel(), o.value = y.autoLevelEnabled;
		let t = e ?? y.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		c.value = n ? n.height : null;
	}
	function u() {
		i.value = [], a.value = -1, o.value = !0, c.value = null;
	}
	function d(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: Y(n, e.url)
		}));
	}
	let f = e.attach ?? pe, p = e.pollIntervalMs ?? 1e3, m = e.maxWaitMs ?? 12e4, h = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), g = Math.max(1, Math.ceil(m / Math.max(1, p))), _ = xe(), v = e.getToken ?? (() => Se(_)), y = null, b = null, x = !1;
	function S() {
		return e.client ?? new s({
			baseUrl: e.apiBase(),
			tokenStore: _ ?? void 0
		});
	}
	async function ee(i, a, o) {
		C(), x = !1, t.value = "preparing", n.value = 0, r.value = [], u();
		try {
			let r = S(), s = ve(await r.post(ge(a, o)));
			if (x) return;
			if (!s.jobId || !s.masterUrl) throw Error("transcode start returned no job");
			d(s.subtitles);
			let c = Y(e.apiBase(), s.masterUrl), u = s.status === "completed";
			for (let e = 0; !u && e < g; e++) {
				let e = ye(await r.get(_e(s.jobId)));
				if (x) return;
				if (n.value = e.progress, d(e.subtitles), J(e.status)) throw Error(`transcode ${e.status}`);
				if (q(e)) {
					u = !0;
					break;
				}
				if (await h(p), x) return;
			}
			if (!u) throw Error("transcode timed out");
			if (y = await f(i, c, {
				getToken: v,
				hlsConfig: e.hlsConfig,
				onReady: () => l(),
				onError: () => {
					x || (t.value = "error");
				}
			}), x) {
				y.destroy(), y = null;
				return;
			}
			b = y.onLevelSwitched((e) => l(e)), l(), t.value = "ready";
		} catch {
			x || (t.value = "error");
		}
	}
	function te(e) {
		y && (y.setCurrentLevel(e === "auto" ? -1 : e), l());
	}
	function C() {
		if (x = !0, b) {
			try {
				b();
			} catch {}
			b = null;
		}
		if (y) {
			try {
				y.destroy();
			} catch {}
			y = null;
		}
	}
	function w() {
		C(), t.value = "idle", n.value = 0, r.value = [], u();
	}
	return {
		state: t,
		progress: n,
		subtitleTracks: r,
		levels: i,
		currentLevel: a,
		autoEnabled: o,
		activeLevelHeight: c,
		setLevel: te,
		start: ee,
		cleanup: C,
		reset: w
	};
}
function xe() {
	try {
		return new o();
	} catch {
		return null;
	}
}
function Se(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/components/player/shortcuts.ts
var Ce = [
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
		id: "pip",
		keys: ["I"],
		label: "Picture-in-picture"
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
], we = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Te = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Ee(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function De(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function X(e, t) {
	switch (e.key) {
		case " ": return Ee(e.target) ? !1 : (t.playPause(), !0);
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
		case "I": return t.togglePip(), !0;
		case "<": return t.speedStep(-1), !0;
		case ">": return t.speedStep(1), !0;
		case "?": return t.toggleHelp(), !0;
		default: return e.key >= "0" && e.key <= "9" ? (t.seekToPercent(Number(e.key) / 10), !0) : !1;
	}
}
function Oe(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || De(n.target) || X(n, e) && n.preventDefault();
	}
	ae(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), ie(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var ke = ["aria-label"], Ae = { class: "shortcuts__head" }, je = { class: "shortcuts__title" }, Me = { class: "shortcuts__grid" }, Ne = { class: "shortcuts__keys" }, Pe = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Fe = {
	key: 1,
	class: "shortcuts__key"
}, Ie = { class: "shortcuts__label" }, Le = /*#__PURE__*/ e(/* @__PURE__ */ M({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Ce }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = I(null);
		return r(l, z(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (F(), O("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= oe((e) => s("close"), ["self"])
		}, [k("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": B(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [k("div", Ae, [k("h3", je, R(B(c)("player.keyboard")), 1), j(n, {
			name: "x",
			label: B(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), k("ul", Me, [(F(!0), O(C, null, L(e.shortcuts, (e) => (F(), O("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [k("span", Ne, [(F(!0), O(C, null, L(e.keys, (e, n) => (F(), O(C, { key: n }, [e === "–" ? (F(), O("span", Pe, "–")) : (F(), O("kbd", Fe, [B(we)[e] ? (F(), E(t, {
			key: 0,
			name: B(we)[e],
			label: B(Te)[e] ?? e
		}, null, 8, ["name", "label"])) : (F(), O(C, { key: 1 }, [A(R(e), 1)], 64))]))], 64))), 128))]), k("span", Ie, R(e.label), 1)]))), 128))])], 8, ke)])) : D("", !0);
	}
}), [["__scopeId", "data-v-f3720b12"]]), Re = { class: "volume" }, ze = /*#__PURE__*/ e(/* @__PURE__ */ M({
	__name: "VolumeControl",
	setup(e) {
		let t = l(), r = i(), { t: o } = a(), s = T(() => t.muted ? 0 : t.volume), c = T(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function u(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return V(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (F(), O("div", Re, [j(n, {
			name: c.value,
			label: B(t).muted ? B(o)("player.unmute") : B(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => B(t).toggleMute()
		}, null, 8, ["name", "label"]), j(d, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: B(o)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": u
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-b3fb9c33"]]), Be = /*#__PURE__*/ e(/* @__PURE__ */ M({
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
		], n = l(), { t: r } = a(), i = T(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function o(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (F(), E(f, {
			class: "speed-menu",
			tone: "glass",
			"model-value": B(n).rate,
			options: i.value,
			label: B(r)("player.playbackSpeed"),
			"onUpdate:modelValue": o
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-d8e96c28"]]), Z = "auto";
function Ve(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function He(e) {
	return e >= 2160 ? "4K" : Ve(e);
}
function Ue(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Ve(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: He(r.height)
		}));
	}
	return n;
}
function We(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Ve(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Ge(e, t) {
	if (t < 0) return Z;
	let n = e.find((e) => e.index === t);
	return n ? Ve(n.height) : Z;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var Ke = /*#__PURE__*/ e(/* @__PURE__ */ M({
	__name: "QualityMenu",
	props: {
		levels: { default: () => [] },
		currentLevel: { default: -1 },
		autoEnabled: {
			type: Boolean,
			default: !0
		},
		activeHeight: { default: null }
	},
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, r = t, o = l(), s = i(), { t: c } = a(), u = T(() => Ue(n.levels)), d = T(() => u.value.length >= 2), p = T(() => n.activeHeight == null ? c("player.qualityAuto") : c("player.qualityAutoActive", { label: He(n.activeHeight) })), m = T(() => [{
			value: Z,
			label: p.value
		}, ...u.value]), h = T(() => n.autoEnabled ? Z : Ge(n.levels, n.currentLevel));
		function g(e) {
			let t = String(e);
			if (o.setQuality(t), s.defaultQuality = t, t === "auto") {
				r("select", "auto");
				return;
			}
			let i = We(n.levels, t);
			r("select", i >= 0 ? i : "auto");
		}
		return (e, t) => d.value ? (F(), E(f, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": h.value,
			options: m.value,
			label: B(c)("player.quality"),
			"onUpdate:modelValue": g
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : D("", !0);
	}
}), [["__scopeId", "data-v-d764e376"]]), qe = /*#__PURE__*/ e(/* @__PURE__ */ M({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = I([]), i = T(() => _(n.styleConfig)), a = null, o = null;
		function s() {
			r.value = h(a);
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
			c(), p(n.video, n.language);
			let e = m(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", s), r.value = h(e), !r.value.length) {
					let t = l(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", s));
				}
			} else r.value = [];
		}
		return V(() => [n.video, n.language], u, { immediate: !0 }), ie(c), t({ lines: r }), (t, n) => r.value.length ? (F(), O("div", {
			key: 0,
			class: N(["player__captions", { "is-lifted": e.lifted }]),
			style: P(i.value)
		}, [(F(!0), O(C, null, L(r.value, (e, t) => (F(), O("p", {
			key: t,
			class: "player__caption-line"
		}, R(e), 1))), 128))], 6)) : D("", !0);
	}
}), [["__scopeId", "data-v-4780408d"]]), Q = ["aria-label", "aria-expanded"], Je = ["aria-label"], Ye = { class: "capmenu__head" }, Xe = { class: "capmenu__title" }, Ze = ["aria-label"], Qe = ["aria-checked", "tabindex"], $e = { class: "capmenu__check" }, et = { class: "capmenu__optlabel" }, tt = [
	"aria-checked",
	"tabindex",
	"onClick"
], nt = { class: "capmenu__check" }, rt = { class: "capmenu__optlabel" }, it = { class: "capmenu__title capmenu__title--sub" }, at = ["aria-label"], ot = [
	"aria-checked",
	"tabindex",
	"onClick"
], st = { class: "capmenu__check" }, ct = { class: "capmenu__optlabel" }, lt = { class: "capmenu__title capmenu__title--sub" }, ut = { class: "capmenu__style" }, dt = { class: "capmenu__field" }, ft = { class: "capmenu__fieldlabel" }, pt = { class: "capmenu__field" }, mt = { class: "capmenu__fieldlabel" }, ht = { class: "capmenu__field" }, gt = { class: "capmenu__fieldlabel" }, _t = { class: "capmenu__field" }, vt = { class: "capmenu__fieldlabel" }, yt = /*#__PURE__*/ e(/* @__PURE__ */ M({
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
	setup(e, { emit: o }) {
		let s = e, c = o, u = l(), d = i(), { t: p } = a(), m = I(null), h = I(null), _ = T(() => u.subtitleLang), v = T(() => s.tracks.some((e) => e.language === _.value)), b = T(() => v.value ? "captions" : "captions-off"), x = T(() => v.value ? s.tracks.findIndex((e) => e.language === _.value) + 1 : 0), ee = T(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function w(e) {
			c("update:open", e);
		}
		function A() {
			w(!1);
		}
		function M(e) {
			u.setSubtitle(e), d.defaultSubtitleLang = e, d.subtitlePreferenceSet = !0;
		}
		function ne(e) {
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
		function P(e) {
			let t = re(e, s.tracks.length + 1, x.value);
			t !== null && M(t === 0 ? null : s.tracks[t - 1].language);
		}
		function ae(e) {
			let t = re(e, s.audioTracks.length, ee.value);
			t !== null && ne(s.audioTracks[t].index);
		}
		function H(e) {
			d.captionStyle = {
				...d.captionStyle,
				size: e
			};
		}
		function oe(e) {
			d.captionStyle = {
				...d.captionStyle,
				textColor: String(e)
			};
		}
		function se(e) {
			d.captionStyle = {
				...d.captionStyle,
				background: e
			};
		}
		function ce(e) {
			d.captionStyle = {
				...d.captionStyle,
				edge: e
			};
		}
		r(h, z(s, "open"), {
			lockScroll: !1,
			onEscape: () => (A(), !0)
		});
		function le(e) {
			m.value && !m.value.contains(e.target) && A();
		}
		return V(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", le, !0) : document.removeEventListener("pointerdown", le, !0));
		}, { immediate: !0 }), ie(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", le, !0);
		}), (r, i) => (F(), O("div", {
			ref_key: "rootEl",
			ref: m,
			class: "capmenu"
		}, [k("button", {
			type: "button",
			class: N(["capmenu__btn", { "is-active": v.value }]),
			"aria-label": v.value ? B(p)("player.captionsOn") : B(p)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => w(!e.open)
		}, [j(t, { name: b.value }, null, 8, ["name"])], 10, Q), e.open ? (F(), O("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": B(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			k("div", Ye, [k("h3", Xe, R(B(p)("player.subtitles")), 1), j(n, {
				name: "x",
				label: B(p)("common.close"),
				size: "sm",
				onClick: A
			}, null, 8, ["label"])]),
			k("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": B(p)("player.subtitleTrack"),
				onKeydown: P
			}, [k("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !v.value,
				tabindex: x.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => M(null)
			}, [k("span", $e, [v.value ? D("", !0) : (F(), E(t, {
				key: 0,
				name: "check"
			}))]), k("span", et, R(B(p)("player.off")), 1)], 8, Qe), (F(!0), O(C, null, L(e.tracks, (e, n) => (F(), O("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": _.value === e.language,
				tabindex: x.value === n + 1 ? 0 : -1,
				onClick: (t) => M(e.language)
			}, [k("span", nt, [_.value === e.language ? (F(), E(t, {
				key: 0,
				name: "check"
			})) : D("", !0)]), k("span", rt, R(e.label), 1)], 8, tt))), 128))], 40, Ze),
			e.audioTracks.length > 1 ? (F(), O(C, { key: 0 }, [k("h3", it, R(B(p)("player.audio")), 1), k("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": B(p)("player.audioTrack"),
				onKeydown: ae
			}, [(F(!0), O(C, null, L(e.audioTracks, (n) => (F(), O("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: ee.value === n.index ? 0 : -1,
				onClick: (e) => ne(n.index)
			}, [k("span", st, [e.activeAudio === n.index ? (F(), E(t, {
				key: 0,
				name: "check"
			})) : D("", !0)]), k("span", ct, R(n.label), 1)], 8, ot))), 128))], 40, at)], 64)) : D("", !0),
			k("h3", lt, R(B(p)("player.captionStyle")), 1),
			k("div", ut, [
				k("div", dt, [k("span", ft, R(B(p)("player.size")), 1), j(f, {
					"model-value": B(d).captionStyle.size,
					options: B(g),
					label: B(p)("player.captionSize"),
					"onUpdate:modelValue": H
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				k("div", pt, [k("span", mt, R(B(p)("player.color")), 1), j(f, {
					"model-value": B(d).captionStyle.textColor,
					options: B(y),
					label: B(p)("player.captionColor"),
					"onUpdate:modelValue": oe
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				k("div", ht, [k("span", gt, R(B(p)("player.background")), 1), j(f, {
					"model-value": B(d).captionStyle.background,
					options: B(te),
					label: B(p)("player.captionBackground"),
					"onUpdate:modelValue": se
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				k("div", _t, [k("span", vt, R(B(p)("player.edge")), 1), j(f, {
					"model-value": B(d).captionStyle.edge,
					options: B(S),
					label: B(p)("player.captionEdge"),
					"onUpdate:modelValue": ce
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Je)) : D("", !0)], 512));
	}
}), [["__scopeId", "data-v-3219a7db"]]), bt = 32, xt = 18, St = 250, Ct = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function wt(e, t, n, r, i, a, o) {
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
		r: Ct(d / m),
		g: Ct(f / m),
		b: Ct(p / m)
	};
}
function Tt(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: wt(e, t, n, 0, 0, r, n),
		right: wt(e, t, n, t - r, 0, t, n),
		center: wt(e, t, n, 0, 0, t, n)
	};
}
function Et({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function $({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Dt(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${$(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${$(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${$(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Ot(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var kt = /*#__PURE__*/ e(/* @__PURE__ */ M({
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
		let n = e, r = I(!1), i = null;
		function a() {
			r.value = Ot(i);
		}
		let o = T(() => n.enabled && !n.reducedMotion && !r.value), s = T(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = I(null), l = null, u = null, d = !1, f = !1;
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
				c.value = Dt(Tt(n, 32, 18));
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
		function ee() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			if (h(e)) {
				b = !0, y = 0, x(e);
				return;
			}
			m(), !f && (b = !0, v = setInterval(m, 250));
		}
		function te() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		V(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			te(), e && t && ee();
		}, { immediate: !0 }), ae(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ie(() => {
			te(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let C = T(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (F(), O("div", {
			class: N(["player__ambient", { "is-active": o.value }]),
			style: P(o.value ? C.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), At = ["aria-label"], jt = { class: "resume__label" }, Mt = { class: "resume__time numeric" }, Nt = { class: "resume__actions" }, Pt = /*#__PURE__*/ e(/* @__PURE__ */ M({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = T(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (F(), O("div", {
			class: "resume",
			role: "region",
			"aria-label": B(i)("player.resumePlayback")
		}, [k("p", jt, [
			A(R(o.value[0]), 1),
			k("span", Mt, R(B(se)(e.seconds)), 1),
			A(R(o.value[1]), 1)
		]), k("div", Nt, [k("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [j(t, { name: "play" }), k("span", null, R(B(i)("player.resume")), 1)]), k("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [j(t, { name: "rewind" }), k("span", null, R(B(i)("player.startOver")), 1)])])], 8, At));
	}
}), [["__scopeId", "data-v-ef72b644"]]), Ft = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], It = [
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
], Lt = new Set(It);
function Rt(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function zt(...e) {
	return e.some((e) => Lt.has(Rt(e)));
}
function Bt(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Vt(e) {
	return e?.error?.code === 2;
}
var Ht = 8, Ut = 15, Wt = 2 * Math.PI * 15;
function Gt(e, t, n = Wt) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Kt = ["aria-label"], qt = ["src"], Jt = { class: "upnext__body" }, Yt = { class: "upnext__eyebrow" }, Xt = { class: "upnext__title" }, Zt = {
	key: 0,
	class: "upnext__cd numeric"
}, Qt = { class: "upnext__actions" }, $t = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, en = ["r"], tn = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], nn = /*#__PURE__*/ e(/* @__PURE__ */ M({
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
		let { t: r } = a(), i = e, o = n, s = T(() => i.posterUrl ?? i.media.poster_url ?? null), c = T(() => Gt(i.remaining, i.total));
		return (n, i) => (F(), O("aside", {
			class: "upnext",
			role: "region",
			"aria-label": B(r)("player.upNext")
		}, [
			s.value ? (F(), O("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, qt)) : D("", !0),
			k("div", Jt, [
				k("p", Yt, R(B(r)("player.upNext")), 1),
				k("h4", Xt, R(e.media.name), 1),
				e.counting ? (F(), O("p", Zt, R(B(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : D("", !0),
				k("div", Qt, [k("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => o("play-now")
				}, [j(t, { name: "play" }), k("span", null, R(B(r)("player.playNow")), 1)]), k("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => o("cancel")
				}, R(B(r)("player.cancel")), 1)])
			]),
			e.counting ? (F(), O("svg", $t, [k("circle", {
				cx: "18",
				cy: "18",
				r: B(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, en), k("circle", {
				cx: "18",
				cy: "18",
				r: B(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": B(Wt),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, tn)])) : D("", !0)
		], 8, Kt));
	}
}), [["__scopeId", "data-v-c000ec99"]]), rn = {
	class: "transcode",
	role: "alert"
}, an = { class: "transcode__card" }, on = { class: "transcode__heading" }, sn = { class: "transcode__body" }, cn = /*#__PURE__*/ e(/* @__PURE__ */ M({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (F(), O("div", rn, [k("div", an, [
			j(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			k("h3", on, R(B(i)("player.transcodeHeading")), 1),
			k("p", sn, R(e.title ? B(i)("player.transcodeBodyTitled", { title: e.title }) : B(i)("player.transcodeBodyUntitled")), 1),
			k("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [j(t, { name: "arrow-left" }), k("span", null, R(B(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-950c7b9d"]]), ln = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, un = { class: "prep__card" }, dn = { class: "prep__heading" }, fn = { class: "prep__body" }, pn = ["aria-valuenow"], mn = /*#__PURE__*/ e(/* @__PURE__ */ M({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (F(), O("div", ln, [k("div", un, [
			j(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			k("h3", dn, R(B(r)("player.transcodePreparingHeading")), 1),
			k("p", fn, R(e.title ? B(r)("player.transcodePreparingTitled", { title: e.title }) : B(r)("player.transcodePreparingUntitled")), 1),
			k("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [k("div", {
				class: "prep__bar-fill",
				style: P({ width: i() + "%" })
			}, null, 4)], 8, pn),
			k("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [j(t, { name: "arrow-left" }), k("span", null, R(B(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-d91acff4"]]), hn = /*#__PURE__*/ e(/* @__PURE__ */ M({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: n }) {
		let r = e, i = n, { t: o } = a();
		function s(e, t) {
			return !!t && t.end > t.start && e >= t.start && e < t.end;
		}
		let c = T(() => s(r.position, r.introMarker) ? {
			label: o("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: o("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (F(), E(w, { name: "skip" }, {
			default: H(() => [c.value ? (F(), O("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: oe(l, ["stop"])
			}, [k("span", null, R(c.value.label), 1), j(t, { name: "skip-forward" })])) : D("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-6156ba5d"]]), gn = { class: "player__stage" }, _n = ["src", "poster"], vn = [
	"src",
	"srclang",
	"label",
	"default"
], yn = { class: "player__meta" }, bn = ["aria-label"], xn = { class: "player__meta-text" }, Sn = { class: "player__eyebrow" }, Cn = { class: "player__title" }, wn = { class: "player__sub numeric" }, Tn = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, En = {
	key: 0,
	class: "player__center"
}, Dn = ["aria-label"], On = { class: "player__btnrow" }, kn = ["aria-label"], An = ["aria-label"], jn = ["aria-label"], Mn = { class: "player__time numeric" }, Nn = ["aria-label", "aria-pressed"], Pn = ["aria-label"], Fn = ["aria-label", "aria-pressed"], In = ["aria-label", "aria-pressed"], Ln = ["aria-label"], Rn = /*#__PURE__*/ e(/* @__PURE__ */ M({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {},
		idleTimeout: {},
		chapters: {},
		introMarker: {},
		outroMarker: {},
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
		let r = e, o = n, s = l(), d = i(), { t: f } = a(), p = c(), m = T(() => p.isFavorite(r.media.id)), h = T(() => p.likeLevel(r.media.id));
		function g() {
			p.toggleFavorite(r.media.id, pe());
		}
		function _(e) {
			p.setLike(r.media.id, e, pe());
		}
		let y = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], S = I(null), te = I(null), w = I(!0), M = I(!1), P = I(!1), z = I(!1), H = I(!1), ce = I(!1), le = I(!1), ue = T(() => H.value ? 1.35 : 1), U = I(zt(r.streamUrl, r.media.path)), fe = ne("phlixConfig", null);
		function pe() {
			return fe?.apiBase ?? "";
		}
		let W = be({
			apiBase: () => r.apiBase ?? "",
			hlsConfig: fe?.playerHlsConfig
		}), G = T(() => U.value ? void 0 : r.streamUrl), K = T(() => U.value && W.state.value !== "ready"), me = T(() => U.value && (W.state.value === "preparing" || W.state.value === "idle")), he = T(() => U.value && W.state.value === "error");
		function ge() {
			let e = S.value;
			e && W.start(e, r.media.id);
		}
		function _e(e) {
			W.setLevel(e);
		}
		let ve = !1;
		V(() => W.levels.value, (e) => {
			if (ve || e.length === 0) return;
			ve = !0;
			let t = d.defaultQuality;
			if (!t || t === "auto") return;
			let n = We(e, t);
			n >= 0 && W.setLevel(n);
		});
		let ye = I(s.resumePositionFor(r.media.id) ?? 0), q = I(!U.value && ye.value > 0), J = null, Y = I(!1), xe = I(8), Se, Ce = T(() => s.upNext);
		function we() {
			U.value = zt(r.streamUrl, r.media.path), ye.value = s.resumePositionFor(r.media.id) ?? 0, q.value = !U.value && ye.value > 0, J = null, $e = !1, He = !1, ve = !1, X(), Y.value = !1, W.reset(), S.value && (S.value.currentTime = 0), U.value && ge();
		}
		function Te(e) {
			let t = S.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : J = Math.max(0, e));
		}
		function Ee() {
			Te(ye.value), q.value = !1, S.value?.play()?.catch(() => {});
		}
		function De() {
			J = null, Te(0), s.clearResume(r.media.id), q.value = !1, S.value?.play()?.catch(() => {});
		}
		function X() {
			Se &&= (clearInterval(Se), void 0);
		}
		function ke() {
			xe.value = 8, X(), Se = setInterval(() => {
				--xe.value, xe.value <= 0 && (X(), je());
			}, 1e3);
		}
		function Ae() {
			Tt(), w.value = !0, s.upNext && (Y.value = !0, d.autoplay && ke());
		}
		function je() {
			X(), Y.value = !1;
			let e = s.next(r.streamUrlFor);
			e && o("play-next", e);
		}
		function Me() {
			X(), Y.value = !1;
		}
		function Ne() {
			if (U.value) return;
			let e = S.value, t = Vt(e) && (e?.currentTime ?? 0) === 0;
			(Bt(e) || t) && (U.value = !0, ge());
		}
		let Pe = I([]), Fe = I([]), Ie = I(-1), Re = I(!1), Z = s.subtitleLang, Ve = T(() => W.subtitleTracks.value), He = !1;
		function Ue() {
			if (He) return;
			if (d.subtitlePreferenceSet) {
				He = !0;
				return;
			}
			let e = Ve.value.find((e) => e.default);
			if (!e) return;
			let t = Pe.value.find((t) => t.language === (e.language || e.label));
			t && (s.setSubtitle(t.language), Z = t.language, He = !0);
		}
		let Ge = T(() => Pe.value.some((e) => e.language === s.subtitleLang));
		function Q() {
			let e = S.value;
			Pe.value = v(e), Fe.value = x(e), Ie.value = b(e), Ue();
		}
		function Je() {
			if (Ge.value) Z = s.subtitleLang, s.setSubtitle(null);
			else {
				let e = Z && Pe.value.some((e) => e.language === Z) ? Z : Pe.value[0]?.language ?? null;
				s.setSubtitle(e);
			}
			o("captions");
		}
		function Ye(e) {
			ee(S.value, e), Ie.value = e;
		}
		V(Ve, () => {
			re(() => Q());
		}, { deep: !0 });
		let Xe = null, Ze, Qe = T(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), $e = !1;
		function et() {
			if (!r.autoplay || $e || q.value || K.value) return;
			let e = S.value;
			if (!e || !e.paused) return;
			$e = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, s.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function tt() {
			et();
		}
		function nt() {
			r.prevEpisode && o("play-episode", r.prevEpisode);
		}
		function rt() {
			r.nextEpisode && o("play-episode", r.nextEpisode);
		}
		function it() {
			let e = S.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function at(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function ot() {
			s.play();
		}
		function st() {
			s.pause();
		}
		function ct() {
			let e = S.value;
			e && (s.updateProgress(e.currentTime, e.duration, at(e)), s.setMediaPositionState());
		}
		function lt() {
			let e = S.value;
			e && (e.volume = s.volume, e.muted = s.muted, e.playbackRate = s.rate, J !== null && (e.currentTime = e.duration ? Math.min(e.duration, J) : J, J = null), s.updateProgress(e.currentTime, e.duration, at(e)), s.setMediaPositionState(), Q());
		}
		function ut() {
			let e = S.value;
			e && s.updateProgress(e.currentTime, e.duration, at(e));
		}
		function dt() {
			let e = S.value;
			e && (Math.abs(e.volume - s.volume) > .001 && s.setVolume(e.volume), e.muted !== s.muted && s.toggleMute());
		}
		function ft() {
			let e = S.value;
			e && e.playbackRate !== s.rate && s.setRate(e.playbackRate);
		}
		function pt(e) {
			let t = S.value;
			t && s.duration > 0 && (t.currentTime = Math.min(s.duration, Math.max(0, e)));
		}
		function mt() {
			P.value = !0, $();
		}
		function ht() {
			P.value = !1, $();
		}
		function gt(e) {
			let t = y.reduce((e, t, n) => Math.abs(t - s.rate) < Math.abs(y[e] - s.rate) ? n : e, 0), n = y[Math.min(y.length - 1, Math.max(0, t + e))];
			s.setRate(n);
		}
		Oe({
			playPause: it,
			seekBy: (e) => pt(s.position + e),
			frameStep: (e) => {
				s.playing || pt(s.position + e / 30);
			},
			volumeBy: (e) => s.setVolume(s.volume + e),
			toggleMute: _t,
			toggleFullscreen: bt,
			toggleCaptions: Je,
			toggleTheater: vt,
			togglePip: St,
			seekToPercent: (e) => pt(e * s.duration),
			speedStep: gt,
			toggleHelp: () => {
				z.value = !z.value;
			}
		}, { enabled: () => !z.value && !Re.value });
		function _t() {
			s.toggleMute();
		}
		function vt() {
			H.value = !H.value, o("theater", H.value);
		}
		V(() => s.muted, (e) => {
			let t = S.value;
			t && t.muted !== e && (t.muted = e);
		}), V(() => s.volume, (e) => {
			let t = S.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), V(() => s.rate, (e) => {
			let t = S.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), V(() => s.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Te(e.value) : e.type === "seekBy" && Te(s.position + e.value));
		});
		function bt() {
			if (typeof document > "u") return;
			let e = te.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function xt() {
			M.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function St() {
			let e = S.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function Ct() {
			ce.value = !0;
		}
		function wt() {
			ce.value = !1;
		}
		function Tt() {
			Ze &&= (clearTimeout(Ze), void 0);
		}
		function Et() {
			Tt(), !(!s.playing || P.value) && (Ze = setTimeout(() => {
				s.playing && !P.value && (w.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function $() {
			w.value = !0, Et();
		}
		V(() => s.playing, (e) => {
			e ? (q.value = !1, Me(), Et()) : (Tt(), w.value = !0);
		});
		let Dt = null;
		return ae(() => {
			s.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), p.hydrate(r.media), typeof document < "u" && (document.addEventListener("fullscreenchange", xt), le.value = document.pictureInPictureEnabled === !0), Dt = s.bindMediaSession({
				onPlay: () => void S.value?.play()?.catch(() => {}),
				onPause: () => S.value?.pause(),
				onSeek: (e) => pt(e)
			}), Xe = S.value?.textTracks ?? null, Xe?.addEventListener?.("addtrack", Q), Xe?.addEventListener?.("removetrack", Q), Q(), U.value && ge();
		}), V(() => r.media, (e) => {
			s.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), we();
		}), V(() => r.media?.id, () => {
			p.hydrate(r.media);
		}), ie(() => {
			Tt(), X(), W.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", xt), Dt?.(), Xe?.removeEventListener?.("addtrack", Q), Xe?.removeEventListener?.("removetrack", Q);
		}), (n, r) => (F(), O("div", {
			ref_key: "containerRef",
			ref: te,
			class: N(["player", {
				"is-chrome-hidden": !w.value,
				"is-theater": H.value
			}]),
			onPointermove: $,
			onPointerdown: $,
			onFocusin: $
		}, [j(kt, {
			video: S.value,
			enabled: B(d).atmosphere,
			playing: B(s).playing,
			"reduced-motion": B(d).effectiveReducedMotion,
			intensity: ue.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), k("div", gn, [
			k("video", {
				ref_key: "videoRef",
				ref: S,
				class: "player__video",
				src: G.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: ot,
				onPause: st,
				onTimeupdate: ct,
				onLoadedmetadata: lt,
				onCanplay: tt,
				onProgress: ut,
				onVolumechange: dt,
				onRatechange: ft,
				onEnded: Ae,
				onError: Ne,
				onEnterpictureinpicture: Ct,
				onLeavepictureinpicture: wt,
				onClick: it
			}, [(F(!0), O(C, null, L(Ve.value, (e) => (F(), O("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, vn))), 128))], 40, _n),
			r[9] ||= k("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[10] ||= k("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			k("div", yn, [k("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": B(f)("player.back"),
				onClick: r[0] ||= oe((e) => o("back"), ["stop"])
			}, [j(t, { name: "arrow-left" })], 8, bn), k("div", xn, [
				k("p", Sn, R(B(f)("player.nowPlaying")), 1),
				k("h2", Cn, R(e.media.name), 1),
				k("div", wn, [(F(!0), O(C, null, L(Qe.value, (e, t) => (F(), O(C, { key: t }, [t > 0 && !e.cert ? (F(), O("span", Tn, "·")) : D("", !0), k("span", { class: N({ player__cert: e.cert }) }, R(e.text), 3)], 64))), 128))])
			])]),
			K.value ? D("", !0) : (F(), O("div", En, [k("button", {
				type: "button",
				class: N(["player__bigplay", { "is-playing": B(s).playing }]),
				"aria-label": B(s).playing ? B(f)("player.pause") : B(f)("player.play"),
				onClick: oe(it, ["stop"])
			}, [j(t, { name: B(s).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Dn)])),
			j(qe, {
				video: S.value,
				language: B(s).subtitleLang,
				"style-config": B(d).captionStyle,
				lifted: w.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			K.value ? D("", !0) : (F(), O("div", {
				key: 1,
				class: "player__controls",
				onClick: r[3] ||= oe(() => {}, ["stop"])
			}, [j(de, {
				position: B(s).position,
				duration: B(s).duration,
				buffered: B(s).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: pt,
				onScrubStart: mt,
				onScrubEnd: ht
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), k("div", On, [
				e.prevEpisode ? (F(), O("button", {
					key: 0,
					type: "button",
					class: "player__iconbtn",
					"aria-label": B(f)("player.previousEpisode"),
					onClick: nt
				}, [j(t, { name: "skip-back" })], 8, kn)) : D("", !0),
				k("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": B(s).playing ? B(f)("player.pause") : B(f)("player.play"),
					onClick: it
				}, [j(t, { name: B(s).playing ? "pause" : "play" }, null, 8, ["name"])], 8, An),
				e.nextEpisode ? (F(), O("button", {
					key: 1,
					type: "button",
					class: "player__iconbtn",
					"aria-label": B(f)("player.nextEpisode"),
					onClick: rt
				}, [j(t, { name: "skip-forward" })], 8, jn)) : D("", !0),
				k("span", Mn, [
					A(R(B(se)(B(s).position)), 1),
					r[7] ||= k("span", { class: "player__sep" }, " / ", -1),
					A(R(B(se)(B(s).duration)), 1)
				]),
				r[8] ||= k("span", { class: "player__grow" }, null, -1),
				k("button", {
					type: "button",
					class: N(["player__iconbtn player__favorite", { "is-on": m.value }]),
					"aria-label": m.value ? "Remove from favorites" : "Add to favorites",
					"aria-pressed": m.value ? "true" : "false",
					onClick: g
				}, [j(t, { name: m.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Nn),
				j(u, {
					level: h.value,
					onCycle: _
				}, null, 8, ["level"]),
				j(ze),
				j(Be),
				j(Ke, {
					levels: B(W).levels.value,
					"current-level": B(W).currentLevel.value,
					"auto-enabled": B(W).autoEnabled.value,
					"active-height": B(W).activeLevelHeight.value,
					onSelect: _e
				}, null, 8, [
					"levels",
					"current-level",
					"auto-enabled",
					"active-height"
				]),
				j(yt, {
					open: Re.value,
					"onUpdate:open": r[1] ||= (e) => Re.value = e,
					tracks: Pe.value,
					"audio-tracks": Fe.value,
					"active-audio": Ie.value,
					onSelectAudio: Ye
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				k("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": B(f)("player.keyboardShortcuts"),
					"aria-haspopup": "dialog",
					onClick: r[2] ||= (e) => z.value = !0
				}, [j(t, { name: "info" })], 8, Pn),
				le.value ? (F(), O("button", {
					key: 2,
					type: "button",
					class: N(["player__iconbtn", { "is-on": ce.value }]),
					"aria-label": ce.value ? B(f)("player.exitPip") : B(f)("player.pip"),
					"aria-pressed": ce.value,
					onClick: St
				}, [j(t, { name: "pip" })], 10, Fn)) : D("", !0),
				k("button", {
					type: "button",
					class: N(["player__iconbtn", { "is-on": H.value }]),
					"aria-label": H.value ? B(f)("player.exitTheater") : B(f)("player.theater"),
					"aria-pressed": H.value,
					onClick: vt
				}, [j(t, { name: "theater" })], 10, In),
				k("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": M.value ? B(f)("player.exitFullscreen") : B(f)("player.fullscreen"),
					onClick: bt
				}, [j(t, { name: M.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Ln)
			])])),
			K.value ? D("", !0) : (F(), E(hn, {
				key: 2,
				position: B(s).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: pt
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			q.value && !K.value ? (F(), E(Pt, {
				key: 3,
				seconds: ye.value,
				onResume: Ee,
				onRestart: De
			}, null, 8, ["seconds"])) : D("", !0),
			Y.value && Ce.value && !K.value ? (F(), E(nn, {
				key: 4,
				media: Ce.value,
				remaining: xe.value,
				total: B(8),
				counting: B(d).autoplay,
				onPlayNow: je,
				onCancel: Me
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : D("", !0),
			me.value ? (F(), E(mn, {
				key: 5,
				title: e.media.name,
				progress: B(W).progress.value,
				onBack: r[4] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : D("", !0),
			he.value ? (F(), E(cn, {
				key: 6,
				title: e.media.name,
				onBack: r[5] ||= (e) => o("back")
			}, null, 8, ["title"])) : D("", !0),
			j(Le, {
				open: z.value,
				onClose: r[6] ||= (e) => z.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-b2e03f58"]]);
//#endregion
export { ze as A, q as B, Et as C, qe as D, yt as E, X as F, ge as G, ve as H, De as I, fe as J, _e as K, Oe as L, we as M, Te as N, Ke as O, Ce as P, be as R, Ot as S, Tt as T, ye as U, he as V, Y as W, se as X, de as Y, xt as _, nn as a, Dt as b, Ht as c, Rt as d, Bt as f, kt as g, Pt as h, cn as i, Le as j, Be as k, Wt as l, Gt as m, hn as n, Ft as o, zt as p, pe as q, mn as r, It as s, Rn as t, Ut as u, St as v, $ as w, wt as x, bt as y, J as z };

//# sourceMappingURL=Player-DSdht6ay.js.map