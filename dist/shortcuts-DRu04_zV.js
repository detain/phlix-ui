import { n as e } from "./Icon-55iG1rR7.js";
import { t } from "./useMessages-BjPW27vR.js";
import { S as n, t as r, x as i, y as a } from "./client-Bmlfq3Uy.js";
import { Fragment as o, computed as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, defineComponent as d, normalizeClass as f, normalizeStyle as p, onBeforeUnmount as m, onMounted as h, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b } from "vue";
import { defineStore as x } from "pinia";
// src/components/player/hls-playback.ts
var S = "phlix-bandwidth-estimate";
function C(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function w() {
	try {
		let e = localStorage.getItem(S);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? C(t) : 0;
	} catch {
		return 0;
	}
}
function T(e) {
	if (!(!Number.isFinite(e) || e <= 0)) try {
		localStorage.setItem(S, String(e));
	} catch {}
}
function E(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
function D(e) {
	return e ? e.split(",").map((e) => e.trim().toLowerCase()).some((e) => e.startsWith("mp4a") || e.startsWith("ac-3") || e.startsWith("ec-3") || e.startsWith("opus")) : !1;
}
var O = /* @__PURE__ */ new Set();
function k(e) {
	O.has(e) && T(e.hls.bandwidthEstimate);
}
async function A(e, t, n = {}) {
	if (typeof MediaSource > "u" && E(e)) {
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
		let i = w(), a = new r({
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
		O.add(o), o.interval = setInterval(() => k(o), 3e4);
		function s() {
			O.has(o) && (T(a.bandwidthEstimate), O.delete(o), o.interval !== null && clearInterval(o.interval));
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
				return (a.audioTracks?.length ?? 0) > 0 || a.levels.some((e) => D(e.audioCodec));
			},
			loadSource(e) {
				a.loadSource(e);
			}
		};
	}
	throw Error("HLS is not supported in this browser");
}
// src/stores/usePlayerUiStore.ts
var j = x("phlix-player-ui", () => {
	let e = _(!1);
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
function M(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function N(e, t) {
	if (!M(e)) return null;
	let n = e[t];
	return typeof n == "string" && n !== "" ? n : null;
}
function P(e, t) {
	let n = N(e, "code");
	if (n !== null && i(n)) return a(n, t);
	let r = N(e, "error");
	return r === "AccessScheduled" ? "Playback blocked by access schedule. Try again during allowed hours." : r === "StreamLimitExceeded" ? "Stream limit reached. Stop another stream to continue watching." : null;
}
function F(e, t) {
	if (e instanceof n) {
		let n = N(e.body, "code");
		if (n !== null && i(n)) return a(n, t);
	}
	let r = e instanceof Error ? e.message : "";
	return r === "" ? "Failed to load media" : r;
}
// src/components/player/format-time.ts
function I(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
function L(e) {
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
function R(e) {
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
function z(e, t) {
	let n = 0, r = e.length - 1;
	for (; n <= r;) {
		let i = n + r >>> 1;
		if (e[i].time < t) n = i + 1;
		else if (e[i].time > t) r = i - 1;
		else return i;
	}
	return n >= e.length ? e.length - 1 : n === 0 ? 0 : t - e[n - 1].time <= e[n].time - t ? n - 1 : n;
}
function B(e, t, n) {
	let r = t % 6, i = Math.floor(t / 6), a = Math.ceil(n / 6);
	return {
		url: e,
		x: r / 5 * 100,
		y: a > 1 ? i / (a - 1) * 100 : 0
	};
}
function V(e, t) {
	return e !== void 0 && t !== void 0 ? AbortSignal.any([e, t]) : e ?? t;
}
function H(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
function U(e) {
	let t = _(null), n = _(!1), i = _(null), a = /* @__PURE__ */ new Map();
	function o() {
		return new r({ baseUrl: e.apiBase() });
	}
	function s(e) {
		let n = t.value;
		return !n || n.sprite_url === null || n.timeline.length === 0 ? null : B(n.sprite_url, z(n.timeline, e), n.timeline.length);
	}
	async function c(r, s) {
		if (a.has(r)) {
			t.value = a.get(r) ?? null;
			return;
		}
		let c = V(s, e.signal);
		if (!c?.aborted) {
			n.value = !0, i.value = null;
			try {
				let e = o(), n = L(await e.getTrickplay(r, c));
				if (n.spriteUrl === null || n.timelineUrl === null) {
					let e = {
						sprite_url: null,
						timeline: []
					};
					a.set(r, e), t.value = e;
					return;
				}
				let i = R(await e.get(n.timelineUrl, void 0, c)), s = {
					sprite_url: n.spriteUrl,
					timeline: i
				};
				a.set(r, s), t.value = s;
			} catch (e) {
				if (H(e)) return;
				a.set(r, null), i.value = e instanceof Error ? e.message : "Failed to load trickplay data", t.value = null;
			} finally {
				n.value = !1;
			}
		}
	}
	function l() {
		t.value = null, n.value = !1, i.value = null, a.clear();
	}
	return {
		data: t,
		loading: n,
		error: i,
		thumbnailAt: s,
		fetch: c,
		reset: l
	};
}
// src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var W = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], G = { class: "scrubber__track" }, K = ["title"], ee = { class: "scrubber__time numeric" }, q = 1600, J = /*#__PURE__*/ e(/* @__PURE__ */ d({
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
		let { t: i } = t(), a = e, d = r, h = _(null), x = _(!1), S = _(!1), C = _(0), w = _(0), T = _(null), E = null, D = (e) => Math.min(1, Math.max(0, e));
		function O(e) {
			T.value = D(e), E !== null && clearTimeout(E), E = setTimeout(() => {
				E = null, T.value = null;
			}, q);
		}
		function k() {
			E !== null && (clearTimeout(E), E = null), T.value = null;
		}
		m(k);
		let A = s(() => x.value ? C.value : a.duration > 0 ? D(a.position / a.duration) : 0), j = s(() => a.duration > 0 ? D(a.buffered / a.duration) : 0), M = s(() => (x.value || S.value || T.value !== null) && a.duration > 0), N = s(() => x.value ? C.value : S.value ? w.value : T.value ?? 0), P = s(() => N.value * a.duration), F = s(() => M.value ? a.thumbnailAt?.(P.value) ?? null : null), L = (e) => `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")`, R = s(() => {
			let e = F.value;
			return e === null ? {} : typeof e == "string" ? { backgroundImage: L(e) } : {
				backgroundImage: L(e.url),
				backgroundPosition: `${e.x}% ${e.y}%`,
				backgroundSize: "600% auto"
			};
		}), z = s(() => `${Math.min(96, Math.max(4, N.value * 100))}%`), B = s(() => a.duration > 0 ? a.chapters.filter((e) => e.start > 0 && e.start < a.duration).map((e) => ({
			...e,
			ratio: e.start / a.duration
		})) : []);
		function V(e) {
			let t = h.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : D((e.clientX - n.left) / n.width);
		}
		function H(e) {
			if (a.duration <= 0) return;
			k(), x.value = !0;
			try {
				h.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = V(e);
			C.value = t, d("scrub-start"), e.preventDefault();
		}
		function U(e) {
			let t = V(e);
			w.value = t, x.value && (C.value = t);
		}
		function J(e) {
			if (x.value) {
				x.value = !1;
				try {
					h.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				d("seek", C.value * a.duration), d("scrub-end");
			}
		}
		function Y() {
			k(), S.value = !0;
		}
		function X() {
			S.value = !1;
		}
		function Z(e) {
			let t = a.duration;
			if (t <= 0) return;
			let n;
			switch (e.key) {
				case "ArrowLeft":
					n = Math.max(0, a.position - a.step);
					break;
				case "ArrowRight":
					n = Math.min(t, a.position + a.step);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t;
					break;
				default: return;
			}
			d("seek", n), O(n / t), e.preventDefault();
		}
		return n({
			playedRatio: A,
			previewActive: M
		}), (t, n) => (g(), l("div", {
			ref_key: "trackEl",
			ref: h,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": b(I)(e.position),
			"aria-label": b(i)("player.seek"),
			onPointerdown: H,
			onPointermove: U,
			onPointerup: J,
			onPointercancel: J,
			onPointerenter: Y,
			onPointerleave: X,
			onKeydown: Z
		}, [u("div", G, [
			u("div", {
				class: "scrubber__buffered",
				style: p({ transform: `scaleX(${j.value})` })
			}, null, 4),
			u("div", {
				class: "scrubber__played",
				style: p({ transform: `scaleX(${A.value})` })
			}, null, 4),
			(g(!0), l(o, null, v(B.value, (e, t) => (g(), l("span", {
				key: t,
				class: "scrubber__tick",
				style: p({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, K))), 128)),
			u("div", {
				class: f(["scrubber__head", { "is-dragging": x.value }]),
				style: p({ left: `${A.value * 100}%` })
			}, null, 6)
		]), M.value ? (g(), l("div", {
			key: 0,
			class: "scrubber__preview",
			style: p({ left: z.value }),
			"aria-hidden": "true"
		}, [F.value ? (g(), l("div", {
			key: 0,
			class: "scrubber__thumb",
			style: p(R.value)
		}, null, 4)) : c("", !0), u("span", ee, y(b(I)(P.value)), 1)], 4)) : c("", !0)], 40, W));
	}
}), [["__scopeId", "data-v-e1581471"]]), Y = [
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
], X = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Z = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Q(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function $(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function te(e, t) {
	switch (e.key) {
		case " ": return !Q(e.target) && (t.playPause(), !0);
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
function ne(e, t = {}) {
	function n(n) {
		n.defaultPrevented || t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || $(n.target) || te(n, e) && n.preventDefault();
	}
	h(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), m(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
export { ne as a, I as c, j as d, A as f, $ as i, F as l, Z as n, J as o, Y as r, U as s, X as t, P as u };

//# sourceMappingURL=shortcuts-DRu04_zV.js.map