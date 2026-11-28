import { n as e } from "./Icon-55iG1rR7.js";
import { t } from "./useMessages-vcPOKXXR.js";
import { t as n } from "./client-Bmlfq3Uy.js";
import { Fragment as r, computed as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, defineComponent as c, normalizeClass as l, normalizeStyle as u, onBeforeUnmount as d, onMounted as f, openBlock as p, ref as m, renderList as h, toDisplayString as g, unref as _ } from "vue";
import { defineStore as v } from "pinia";
// src/components/player/hls-playback.ts
var y = "phlix-bandwidth-estimate";
function b(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function x() {
	try {
		let e = localStorage.getItem(y);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? b(t) : 0;
	} catch {
		return 0;
	}
}
function S(e) {
	if (!(!Number.isFinite(e) || e <= 0)) try {
		localStorage.setItem(y, String(e));
	} catch {}
}
function C(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
function w(e) {
	return e ? e.split(",").map((e) => e.trim().toLowerCase()).some((e) => e.startsWith("mp4a") || e.startsWith("ac-3") || e.startsWith("ec-3") || e.startsWith("opus")) : !1;
}
var T = /* @__PURE__ */ new Set();
function E(e) {
	T.has(e) && S(e.hls.bandwidthEstimate);
}
async function D(e, t, n = {}) {
	if (typeof MediaSource > "u" && C(e)) {
		let r = n.startPosition && n.startPosition > 0 ? n.startPosition : 0, i = () => {
			if (r <= 0) return;
			let t = r;
			r = 0;
			try {
				e.currentTime = t;
			} catch {}
		}, a = () => {
			i(), n.onReady?.();
		}, o = () => n.onError?.("native hls error");
		return e.addEventListener("loadedmetadata", a), e.addEventListener("error", o), e.src = t, e.readyState >= 1 && i(), {
			destroy() {
				r = 0, e.removeEventListener("loadedmetadata", a), e.removeEventListener("error", o), e.removeAttribute("src"), e.load();
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
			onAudioTrackSwitched: () => () => void 0,
			loadSource(t) {
				e.src = t;
			},
			onLevelLoaded: () => () => void 0,
			hasAudio: () => !1
		};
	}
	let { default: r } = await import("./hls-fNqmoNsg.js");
	if (r.isSupported()) {
		let i = x(), a = new r({
			enableWorker: !0,
			lowLatencyMode: !1,
			startPosition: n.startPosition ?? 0,
			backBufferLength: 90,
			maxBufferLength: 60,
			abrEwmaDefaultEstimate: i,
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
		}), o = {
			hls: a,
			interval: null
		};
		T.add(o), o.interval = setInterval(() => E(o), 3e4);
		function s() {
			T.has(o) && (S(a.bandwidthEstimate), T.delete(o), o.interval !== null && clearInterval(o.interval));
		}
		a.on(r.Events.MANIFEST_PARSED, () => n.onReady?.()), a.on(r.Events.ERROR, (e, t) => {
			t?.fatal && (n.onError?.(t.details ?? "fatal hls error"), s(), a.destroy());
		});
		let c = [];
		return a.on(r.Events.LEVEL_LOADED, () => {
			for (let e of [...c]) e();
		}), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				s();
				try {
					a.destroy();
				} catch {}
			},
			get levels() {
				return a.levels.map((e, t) => ({
					index: t,
					height: e.height,
					width: e.width,
					bitrate: e.bitrate,
					name: e.name
				}));
			},
			getCurrentLevel() {
				return a.currentLevel;
			},
			setCurrentLevel(e) {
				a.currentLevel = e;
			},
			setNextLevel(e) {
				a.nextLevel = e;
			},
			get autoLevelEnabled() {
				return a.autoLevelEnabled;
			},
			get bandwidthEstimate() {
				return a.bandwidthEstimate;
			},
			onLevelSwitched(e) {
				let t = (t, n) => e(n.level);
				return a.on(r.Events.LEVEL_SWITCHED, t), () => a.off(r.Events.LEVEL_SWITCHED, t);
			},
			get audioTracks() {
				return (a.audioTracks ?? []).map((e, t) => ({
					index: t,
					name: e.name ?? "",
					lang: e.lang ?? "",
					default: e.default ?? !1,
					autoselect: e.autoselect ?? !1
				}));
			},
			getCurrentAudioTrack() {
				return a.audioTrack ?? -1;
			},
			setAudioTrack(e) {
				a.audioTrack = e;
			},
			onAudioTrackSwitched(e) {
				let t = (t, n) => e(n.id);
				return a.on(r.Events.AUDIO_TRACK_SWITCHED, t), () => a.off(r.Events.AUDIO_TRACK_SWITCHED, t);
			},
			onLevelLoaded(e) {
				return c.push(e), () => {
					let t = c.indexOf(e);
					t >= 0 && c.splice(t, 1);
				};
			},
			hasAudio() {
				return (a.audioTracks?.length ?? 0) > 0 || a.levels.some((e) => w(e.audioCodec));
			},
			loadSource(e) {
				a.loadSource(e);
			}
		};
	}
	throw Error("HLS is not supported in this browser");
}
// src/stores/usePlayerUiStore.ts
var O = v("phlix-player-ui", () => {
	let e = m(!1);
	function t(t) {
		e.value = t;
	}
	function n() {
		e.value = !1;
	}
	return {
		theaterActive: e,
		setTheaterActive: t,
		reset: n
	};
});
// src/components/player/format-time.ts
function k(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
function A(e) {
	if (typeof e != "object" || !e) return {
		spriteUrl: null,
		timelineUrl: null
	};
	let t = e;
	return {
		spriteUrl: typeof t.sprite_url == "string" && t.sprite_url !== "" ? t.sprite_url : null,
		timelineUrl: typeof t.timeline_url == "string" && t.timeline_url !== "" ? t.timeline_url : null
	};
}
function j(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let { time: e, x: r, y: i } = n;
		typeof e == "number" && Number.isFinite(e) && typeof r == "number" && Number.isFinite(r) && typeof i == "number" && Number.isFinite(i) && t.push({
			time: e,
			x: r,
			y: i
		});
	}
	return t.sort((e, t) => e.time - t.time), t;
}
function M(e, t) {
	let n = 0, r = e.length - 1;
	for (; n <= r;) {
		let i = n + r >>> 1;
		if (e[i].time < t) n = i + 1;
		else if (e[i].time > t) r = i - 1;
		else return i;
	}
	return n >= e.length ? e.length - 1 : n === 0 ? 0 : t - e[n - 1].time <= e[n].time - t ? n - 1 : n;
}
function N(e, t, n) {
	let r = t % 6, i = Math.floor(t / 6), a = Math.ceil(n / 6);
	return {
		url: e,
		x: r / 5 * 100,
		y: a > 1 ? i / (a - 1) * 100 : 0
	};
}
function P(e, t) {
	return e !== void 0 && t !== void 0 ? AbortSignal.any([e, t]) : e ?? t;
}
function F(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
function I(e) {
	let t = m(null), r = m(!1), i = m(null), a = /* @__PURE__ */ new Map();
	function o() {
		return new n({ baseUrl: e.apiBase() });
	}
	function s(e) {
		let n = t.value;
		return !n || n.sprite_url === null || n.timeline.length === 0 ? null : N(n.sprite_url, M(n.timeline, e), n.timeline.length);
	}
	async function c(n, s) {
		if (a.has(n)) {
			t.value = a.get(n) ?? null;
			return;
		}
		let c = P(s, e.signal);
		if (!c?.aborted) {
			r.value = !0, i.value = null;
			try {
				let e = o(), r = A(await e.getTrickplay(n, c));
				if (r.spriteUrl === null || r.timelineUrl === null) {
					let e = {
						sprite_url: null,
						timeline: []
					};
					a.set(n, e), t.value = e;
					return;
				}
				let i = j(await e.get(r.timelineUrl, void 0, c)), s = {
					sprite_url: r.spriteUrl,
					timeline: i
				};
				a.set(n, s), t.value = s;
			} catch (e) {
				if (F(e)) return;
				a.set(n, null), i.value = e instanceof Error ? e.message : "Failed to load trickplay data", t.value = null;
			} finally {
				r.value = !1;
			}
		}
	}
	function l() {
		t.value = null, r.value = !1, i.value = null, a.clear();
	}
	return {
		data: t,
		loading: r,
		error: i,
		thumbnailAt: s,
		fetch: c,
		reset: l
	};
}
// src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var L = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], R = { class: "scrubber__track" }, z = ["title"], B = { class: "scrubber__time numeric" }, V = 1600, H = /*#__PURE__*/ e(/* @__PURE__ */ c({
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
	setup(e, { expose: n, emit: c }) {
		let { t: f } = t(), v = e, y = c, b = m(null), x = m(!1), S = m(!1), C = m(0), w = m(0), T = m(null), E = null, D = (e) => Math.min(1, Math.max(0, e));
		function O(e) {
			T.value = D(e), E !== null && clearTimeout(E), E = setTimeout(() => {
				E = null, T.value = null;
			}, V);
		}
		function A() {
			E !== null && (clearTimeout(E), E = null), T.value = null;
		}
		d(A);
		let j = i(() => x.value ? C.value : v.duration > 0 ? D(v.position / v.duration) : 0), M = i(() => v.duration > 0 ? D(v.buffered / v.duration) : 0), N = i(() => (x.value || S.value || T.value !== null) && v.duration > 0), P = i(() => x.value ? C.value : S.value ? w.value : T.value ?? 0), F = i(() => P.value * v.duration), I = i(() => N.value ? v.thumbnailAt?.(F.value) ?? null : null), H = (e) => `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")`, U = i(() => {
			let e = I.value;
			return e === null ? {} : typeof e == "string" ? { backgroundImage: H(e) } : {
				backgroundImage: H(e.url),
				backgroundPosition: `${e.x}% ${e.y}%`,
				backgroundSize: "600% auto"
			};
		}), W = i(() => `${Math.min(96, Math.max(4, P.value * 100))}%`), G = i(() => v.duration > 0 ? v.chapters.filter((e) => e.start > 0 && e.start < v.duration).map((e) => ({
			...e,
			ratio: e.start / v.duration
		})) : []);
		function K(e) {
			let t = b.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : D((e.clientX - n.left) / n.width);
		}
		function q(e) {
			if (v.duration <= 0) return;
			A(), x.value = !0;
			try {
				b.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = K(e);
			C.value = t, y("scrub-start"), e.preventDefault();
		}
		function J(e) {
			let t = K(e);
			w.value = t, x.value && (C.value = t);
		}
		function Y(e) {
			if (x.value) {
				x.value = !1;
				try {
					b.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				y("seek", C.value * v.duration), y("scrub-end");
			}
		}
		function X() {
			A(), S.value = !0;
		}
		function Z() {
			S.value = !1;
		}
		function Q(e) {
			let t = v.duration;
			if (t <= 0) return;
			let n;
			switch (e.key) {
				case "ArrowLeft":
					n = Math.max(0, v.position - v.step);
					break;
				case "ArrowRight":
					n = Math.min(t, v.position + v.step);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t;
					break;
				default: return;
			}
			y("seek", n), O(n / t), e.preventDefault();
		}
		return n({
			playedRatio: j,
			previewActive: N
		}), (t, n) => (p(), o("div", {
			ref_key: "trackEl",
			ref: b,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": _(k)(e.position),
			"aria-label": _(f)("player.seek"),
			onPointerdown: q,
			onPointermove: J,
			onPointerup: Y,
			onPointercancel: Y,
			onPointerenter: X,
			onPointerleave: Z,
			onKeydown: Q
		}, [s("div", R, [
			s("div", {
				class: "scrubber__buffered",
				style: u({ transform: `scaleX(${M.value})` })
			}, null, 4),
			s("div", {
				class: "scrubber__played",
				style: u({ transform: `scaleX(${j.value})` })
			}, null, 4),
			(p(!0), o(r, null, h(G.value, (e, t) => (p(), o("span", {
				key: t,
				class: "scrubber__tick",
				style: u({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, z))), 128)),
			s("div", {
				class: l(["scrubber__head", { "is-dragging": x.value }]),
				style: u({ left: `${j.value * 100}%` })
			}, null, 6)
		]), N.value ? (p(), o("div", {
			key: 0,
			class: "scrubber__preview",
			style: u({ left: W.value }),
			"aria-hidden": "true"
		}, [I.value ? (p(), o("div", {
			key: 0,
			class: "scrubber__thumb",
			style: u(U.value)
		}, null, 4)) : a("", !0), s("span", B, g(_(k)(F.value)), 1)], 4)) : a("", !0)], 40, L));
	}
}), [["__scopeId", "data-v-e1581471"]]), U = [
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
		id: "quality",
		keys: ["Q"],
		label: "Quality"
	},
	{
		id: "help",
		keys: ["?"],
		label: "This help"
	}
], W = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, G = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function K(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function q(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function J(e, t) {
	switch (e.key) {
		case " ": return !K(e.target) && (t.playPause(), !0);
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
		case "q":
		case "Q": return t.toggleQuality(), !0;
		default: return e.key >= "0" && e.key <= "9" && (t.seekToPercent(Number(e.key) / 10), !0);
	}
}
function Y(e, t = {}) {
	function n(n) {
		n.defaultPrevented || t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || q(n.target) || J(n, e) && n.preventDefault();
	}
	f(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), d(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
export { Y as a, k as c, q as i, O as l, G as n, H as o, U as r, I as s, W as t, D as u };

//# sourceMappingURL=shortcuts-DPo-Hn2Q.js.map