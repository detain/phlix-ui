import { n as e } from "./Icon-55iG1rR7.js";
import { t } from "./useMessages-BGVJcrvU.js";
import { S as n, x as r, y as i } from "./client-Bmlfq3Uy.js";
import { Fragment as a, computed as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, defineComponent as u, normalizeClass as d, normalizeStyle as f, onBeforeUnmount as p, onMounted as m, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as y } from "vue";
import { defineStore as b } from "pinia";
// src/components/player/hls-playback.ts
var x = "phlix-bandwidth-estimate";
function S(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function C() {
	try {
		let e = localStorage.getItem(x);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? S(t) : 0;
	} catch {
		return 0;
	}
}
function w(e) {
	try {
		localStorage.setItem(x, String(e));
	} catch {}
}
function T(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
function E(e) {
	return e ? e.split(",").map((e) => e.trim().toLowerCase()).some((e) => e.startsWith("mp4a") || e.startsWith("ac-3") || e.startsWith("ec-3") || e.startsWith("opus")) : !1;
}
var D = null, O = null;
function k() {
	D && w(D.bandwidthEstimate);
}
async function A(e, t, n = {}) {
	if (typeof MediaSource > "u" && T(e)) {
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
		let i = C(), a = new r({
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
		});
		a.on(r.Events.MANIFEST_PARSED, () => n.onReady?.()), a.on(r.Events.ERROR, (e, t) => {
			t?.fatal && (n.onError?.(t.details ?? "fatal hls error"), a.destroy());
		});
		let o = [];
		return a.on(r.Events.LEVEL_LOADED, () => {
			for (let e of [...o]) e();
		}), D = a, O !== null && clearInterval(O), O = setInterval(k, 3e4), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				w(a.bandwidthEstimate), O !== null && (clearInterval(O), O = null), D = null;
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
				return o.push(e), () => {
					let t = o.indexOf(e);
					t >= 0 && o.splice(t, 1);
				};
			},
			hasAudio() {
				return (a.audioTracks?.length ?? 0) > 0 || a.levels.some((e) => E(e.audioCodec));
			},
			loadSource(e) {
				a.loadSource(e);
			}
		};
	}
	throw Error("HLS is not supported in this browser");
}
// src/stores/usePlayerUiStore.ts
var j = b("phlix-player-ui", () => {
	let e = g(!1);
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
function M(e, t) {
	if (typeof e != "object" || !e) return null;
	let n = e[t];
	return typeof n == "string" && n !== "" ? n : null;
}
function N(e, t) {
	let n = M(e, "code");
	if (n !== null && r(n)) return i(n, t);
	let a = M(e, "error");
	return a === "AccessScheduled" ? "Playback blocked by access schedule. Try again during allowed hours." : a === "StreamLimitExceeded" ? "Stream limit reached. Stop another stream to continue watching." : null;
}
function P(e, t) {
	if (e instanceof n) {
		let n = M(e.body, "code");
		if (n !== null && r(n)) return i(n, t);
	}
	let a = e instanceof Error ? e.message : "";
	return a === "" ? "Failed to load media" : a;
}
// src/components/player/format-time.ts
function F(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
// src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var I = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], L = { class: "scrubber__track" }, R = ["title"], z = { class: "scrubber__time numeric" }, B = /*#__PURE__*/ e(/* @__PURE__ */ u({
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
	setup(e, { expose: n, emit: r }) {
		let { t: i } = t(), u = e, p = r, m = g(null), b = g(!1), x = g(!1), S = g(0), C = g(0), w = (e) => Math.min(1, Math.max(0, e)), T = o(() => b.value ? S.value : u.duration > 0 ? w(u.position / u.duration) : 0), E = o(() => u.duration > 0 ? w(u.buffered / u.duration) : 0), D = o(() => (b.value || x.value) && u.duration > 0), O = o(() => b.value ? S.value : C.value), k = o(() => O.value * u.duration), A = o(() => D.value ? u.thumbnailAt?.(k.value) ?? null : null), j = o(() => A.value ? `url("${A.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), M = o(() => `${Math.min(96, Math.max(4, O.value * 100))}%`), N = o(() => u.duration > 0 ? u.chapters.filter((e) => e.start > 0 && e.start < u.duration).map((e) => ({
			...e,
			ratio: e.start / u.duration
		})) : []);
		function P(e) {
			let t = m.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : w((e.clientX - n.left) / n.width);
		}
		function B(e) {
			if (u.duration <= 0) return;
			b.value = !0;
			try {
				m.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = P(e);
			S.value = t, p("scrub-start"), e.preventDefault();
		}
		function V(e) {
			let t = P(e);
			C.value = t, b.value && (S.value = t);
		}
		function H(e) {
			if (b.value) {
				b.value = !1;
				try {
					m.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				p("seek", S.value * u.duration), p("scrub-end");
			}
		}
		function U() {
			x.value = !0;
		}
		function W() {
			x.value = !1;
		}
		function G(e) {
			let t = u.duration;
			if (t <= 0) return;
			let n;
			switch (e.key) {
				case "ArrowLeft":
					n = Math.max(0, u.position - u.step);
					break;
				case "ArrowRight":
					n = Math.min(t, u.position + u.step);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t;
					break;
				default: return;
			}
			p("seek", n), e.preventDefault();
		}
		return n({
			playedRatio: T,
			previewActive: D
		}), (t, n) => (h(), c("div", {
			ref_key: "trackEl",
			ref: m,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": y(F)(e.position),
			"aria-label": y(i)("player.seek"),
			onPointerdown: B,
			onPointermove: V,
			onPointerup: H,
			onPointercancel: H,
			onPointerenter: U,
			onPointerleave: W,
			onKeydown: G
		}, [l("div", L, [
			l("div", {
				class: "scrubber__buffered",
				style: f({ transform: `scaleX(${E.value})` })
			}, null, 4),
			l("div", {
				class: "scrubber__played",
				style: f({ transform: `scaleX(${T.value})` })
			}, null, 4),
			(h(!0), c(a, null, _(N.value, (e, t) => (h(), c("span", {
				key: t,
				class: "scrubber__tick",
				style: f({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, R))), 128)),
			l("div", {
				class: d(["scrubber__head", { "is-dragging": b.value }]),
				style: f({ left: `${T.value * 100}%` })
			}, null, 6)
		]), D.value ? (h(), c("div", {
			key: 0,
			class: "scrubber__preview",
			style: f({ left: M.value }),
			"aria-hidden": "true"
		}, [A.value ? (h(), c("div", {
			key: 0,
			class: "scrubber__thumb",
			style: f({ backgroundImage: j.value })
		}, null, 4)) : s("", !0), l("span", z, v(y(F)(k.value)), 1)], 4)) : s("", !0)], 40, I));
	}
}), [["__scopeId", "data-v-868e2818"]]), V = [
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
], H = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, U = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function W(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function G(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function K(e, t) {
	switch (e.key) {
		case " ": return !W(e.target) && (t.playPause(), !0);
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
function q(e, t = {}) {
	function n(n) {
		n.defaultPrevented || t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || G(n.target) || K(n, e) && n.preventDefault();
	}
	m(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), p(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
export { q as a, P as c, A as d, G as i, N as l, U as n, B as o, V as r, F as s, H as t, j as u };

//# sourceMappingURL=shortcuts-BV2IjCso.js.map