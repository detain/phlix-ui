import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./IconButton-C5x9ZDfp.js";
import { t as r } from "./useFocusTrap-0JaLH3tF.js";
import { a as i } from "./usePreferencesStore-DkTu9l9P.js";
import { t as a } from "./useMessages-Dwm0lQlG.js";
import { n as o, s } from "./Button-5ZSsUmsI.js";
import { i as c } from "./usePlayerStore-CCov4Tvr.js";
import { t as l } from "./Slider-BMn_Lp_q.js";
import { t as u } from "./Select-DLwgQInL.js";
import { c as d, g as f, h as p, i as m, l as h, m as g, n as _, o as v, p as y, r as b, s as ee, t as x } from "./captions-COgPp5bH.js";
import { Fragment as S, Transition as C, computed as w, createBlock as T, createCommentVNode as E, createElementBlock as D, createElementVNode as O, createTextVNode as k, createVNode as A, defineComponent as j, nextTick as te, normalizeClass as M, normalizeStyle as N, onBeforeUnmount as ne, onMounted as re, openBlock as P, ref as F, renderList as I, toDisplayString as L, toRef as R, unref as z, watch as B, withCtx as V, withModifiers as H } from "vue";
//#region src/components/player/format-time.ts
function U(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var ie = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], W = { class: "scrubber__track" }, ae = ["title"], oe = { class: "scrubber__time numeric" }, se = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let { t: r } = a(), i = e, o = n, s = F(null), c = F(!1), l = F(!1), u = F(0), d = F(0), f = (e) => Math.min(1, Math.max(0, e)), p = w(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = w(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = w(() => (c.value || l.value) && i.duration > 0), g = w(() => c.value ? u.value : d.value), _ = w(() => g.value * i.duration), v = w(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = w(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = w(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), ee = w(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function x(e) {
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
			let t = x(e);
			u.value = t, o("scrub-start"), o("seek", t * i.duration), e.preventDefault();
		}
		function T(e) {
			let t = x(e);
			d.value = t, c.value && (u.value = t, o("seek", t * i.duration));
		}
		function k(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				o("scrub-end");
			}
		}
		function A() {
			l.value = !0;
		}
		function j() {
			l.value = !1;
		}
		function te(e) {
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
		}), (t, n) => (P(), D("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": z(U)(e.position),
			"aria-label": z(r)("player.seek"),
			onPointerdown: C,
			onPointermove: T,
			onPointerup: k,
			onPointercancel: k,
			onPointerenter: A,
			onPointerleave: j,
			onKeydown: te
		}, [O("div", W, [
			O("div", {
				class: "scrubber__buffered",
				style: N({ transform: `scaleX(${m.value})` })
			}, null, 4),
			O("div", {
				class: "scrubber__played",
				style: N({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(P(!0), D(S, null, I(ee.value, (e, t) => (P(), D("span", {
				key: t,
				class: "scrubber__tick",
				style: N({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, ae))), 128)),
			O("div", {
				class: M(["scrubber__head", { "is-dragging": c.value }]),
				style: N({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (P(), D("div", {
			key: 0,
			class: "scrubber__preview",
			style: N({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (P(), D("div", {
			key: 0,
			class: "scrubber__thumb",
			style: N({ backgroundImage: y.value })
		}, null, 4)) : E("", !0), O("span", oe, L(z(U)(_.value)), 1)], 4)) : E("", !0)], 40, ie));
	}
}), [["__scopeId", "data-v-39414106"]]);
//#endregion
//#region src/components/player/hls-playback.ts
function ce(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
async function G(e, t, n = {}) {
	let { default: r } = await import("./hls-Be5Qwv5L.js");
	if (r.isSupported()) {
		let i = new r({
			enableWorker: !0,
			lowLatencyMode: !1,
			xhrSetup: (e) => {
				let t = n.getToken?.();
				t && e.setRequestHeader("Authorization", `Bearer ${t}`);
			}
		});
		return i.on(r.Events.MANIFEST_PARSED, () => n.onReady?.()), i.on(r.Events.ERROR, (e, t) => {
			t?.fatal && (n.onError?.(t.details ?? "fatal hls error"), i.destroy());
		}), i.loadSource(t), i.attachMedia(e), { destroy() {
			try {
				i.destroy();
			} catch {}
		} };
	}
	if (ce(e)) {
		let r = () => n.onReady?.(), i = () => n.onError?.("native hls error");
		return e.addEventListener("loadedmetadata", r), e.addEventListener("error", i), e.src = t, { destroy() {
			e.removeEventListener("loadedmetadata", r), e.removeEventListener("error", i), e.removeAttribute("src"), e.load();
		} };
	}
	throw Error("HLS is not supported in this browser");
}
//#endregion
//#region src/components/player/transcode.ts
var K = new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function q(e, t = "") {
	return typeof e == "string" ? e : t;
}
function J(e) {
	return e === !0 || e === "true" || e === 1;
}
function le(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function ue(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = q(e.url ?? e.src);
		r !== "" && t.push({
			index: le(e.index),
			language: q(e.language ?? e.lang ?? e.srclang),
			label: q(e.label),
			default: J(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function de(e, t = "web") {
	return `/api/v1/media/${encodeURIComponent(e)}/transcode?profile=${encodeURIComponent(t)}`;
}
function fe(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function pe(e) {
	let t = e ?? {};
	return {
		jobId: q(t.job_id ?? t.jobId),
		masterUrl: q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: q(t.status, "running"),
		reused: J(t.reused),
		subtitles: ue(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks)
	};
}
function me(e) {
	let t = e ?? {};
	return {
		jobId: q(t.job_id ?? t.jobId),
		status: q(t.status, "running"),
		playlistReady: J(t.playlist_ready ?? t.playlistReady),
		progress: le(t.progress),
		masterUrl: q(t.master_url ?? t.masterUrl),
		subtitles: ue(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks)
	};
}
function he(e) {
	return e.playlistReady || e.status === "completed";
}
function Y(e) {
	return K.has(e);
}
function ge(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function _e(e) {
	let t = F("idle"), n = F(0), r = F([]);
	function i(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: ge(n, e.url)
		}));
	}
	let a = e.attach ?? G, s = e.pollIntervalMs ?? 1e3, c = e.maxWaitMs ?? 12e4, l = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), u = Math.max(1, Math.ceil(c / Math.max(1, s))), d = ve(), f = e.getToken ?? (() => ye(d)), p = null, m = !1;
	function h() {
		return e.client ?? new o({
			baseUrl: e.apiBase(),
			tokenStore: d ?? void 0
		});
	}
	async function g(o, c, d = "web") {
		_(), m = !1, t.value = "preparing", n.value = 0, r.value = [];
		try {
			let r = h(), g = pe(await r.post(de(c, d)));
			if (m) return;
			if (!g.jobId || !g.masterUrl) throw Error("transcode start returned no job");
			i(g.subtitles);
			let _ = ge(e.apiBase(), g.masterUrl), v = g.status === "completed";
			for (let e = 0; !v && e < u; e++) {
				let e = me(await r.get(fe(g.jobId)));
				if (m) return;
				if (n.value = e.progress, i(e.subtitles), Y(e.status)) throw Error(`transcode ${e.status}`);
				if (he(e)) {
					v = !0;
					break;
				}
				if (await l(s), m) return;
			}
			if (!v) throw Error("transcode timed out");
			if (p = await a(o, _, {
				getToken: f,
				onError: () => {
					m || (t.value = "error");
				}
			}), m) {
				p.destroy(), p = null;
				return;
			}
			t.value = "ready";
		} catch {
			m || (t.value = "error");
		}
	}
	function _() {
		if (m = !0, p) {
			try {
				p.destroy();
			} catch {}
			p = null;
		}
	}
	function v() {
		_(), t.value = "idle", n.value = 0, r.value = [];
	}
	return {
		state: t,
		progress: n,
		subtitleTracks: r,
		start: g,
		cleanup: _,
		reset: v
	};
}
function ve() {
	try {
		return new s();
	} catch {
		return null;
	}
}
function ye(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/components/player/shortcuts.ts
var be = [
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
], xe = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, X = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Se(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Ce(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function we(e, t) {
	switch (e.key) {
		case " ": return Se(e.target) ? !1 : (t.playPause(), !0);
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
function Te(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Ce(n.target) || we(n, e) && n.preventDefault();
	}
	re(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), ne(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Ee = ["aria-label"], De = { class: "shortcuts__head" }, Oe = { class: "shortcuts__title" }, ke = { class: "shortcuts__grid" }, Ae = { class: "shortcuts__keys" }, Z = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, je = {
	key: 1,
	class: "shortcuts__key"
}, Me = { class: "shortcuts__label" }, Ne = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => be }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = F(null);
		return r(l, R(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (P(), D("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= H((e) => s("close"), ["self"])
		}, [O("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": z(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [O("div", De, [O("h3", Oe, L(z(c)("player.keyboard")), 1), A(n, {
			name: "x",
			label: z(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), O("ul", ke, [(P(!0), D(S, null, I(e.shortcuts, (e) => (P(), D("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [O("span", Ae, [(P(!0), D(S, null, I(e.keys, (e, n) => (P(), D(S, { key: n }, [e === "–" ? (P(), D("span", Z, "–")) : (P(), D("kbd", je, [z(xe)[e] ? (P(), T(t, {
			key: 0,
			name: z(xe)[e],
			label: z(X)[e] ?? e
		}, null, 8, ["name", "label"])) : (P(), D(S, { key: 1 }, [k(L(e), 1)], 64))]))], 64))), 128))]), O("span", Me, L(e.label), 1)]))), 128))])], 8, Ee)])) : E("", !0);
	}
}), [["__scopeId", "data-v-f3720b12"]]), Pe = { class: "volume" }, Fe = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "VolumeControl",
	setup(e) {
		let t = c(), r = i(), { t: o } = a(), s = w(() => t.muted ? 0 : t.volume), u = w(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function d(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return B(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (P(), D("div", Pe, [A(n, {
			name: u.value,
			label: z(t).muted ? z(o)("player.unmute") : z(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => z(t).toggleMute()
		}, null, 8, ["name", "label"]), A(l, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: z(o)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": d
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-b3fb9c33"]]), Ie = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		], n = c(), { t: r } = a(), i = w(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function o(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (P(), T(u, {
			class: "speed-menu",
			tone: "glass",
			"model-value": z(n).rate,
			options: i.value,
			label: z(r)("player.playbackSpeed"),
			"onUpdate:modelValue": o
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-d8e96c28"]]), Le = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = c(), r = i(), { t: o } = a(), s = w(() => t.qualities.length > 0);
		function l(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => s.value ? (P(), T(u, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": z(n).quality,
			options: e.qualities,
			label: z(o)("player.quality"),
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : E("", !0);
	}
}), [["__scopeId", "data-v-791c32d2"]]), Re = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = F([]), i = w(() => h(n.styleConfig)), a = null;
		function o() {
			r.value = p(a);
		}
		function s() {
			a?.removeEventListener("cuechange", o), a = null;
		}
		function c() {
			s(), d(n.video, n.language);
			let e = f(n.video, n.language);
			e ? (a = e, e.addEventListener("cuechange", o), r.value = p(e)) : r.value = [];
		}
		return B(() => [n.video, n.language], c, { immediate: !0 }), ne(s), t({ lines: r }), (t, n) => r.value.length ? (P(), D("div", {
			key: 0,
			class: M(["player__captions", { "is-lifted": e.lifted }]),
			style: N(i.value)
		}, [(P(!0), D(S, null, I(r.value, (e, t) => (P(), D("p", {
			key: t,
			class: "player__caption-line"
		}, L(e), 1))), 128))], 6)) : E("", !0);
	}
}), [["__scopeId", "data-v-15a0f3c5"]]), ze = ["aria-label", "aria-expanded"], Be = ["aria-label"], Ve = { class: "capmenu__head" }, He = { class: "capmenu__title" }, Ue = ["aria-label"], We = ["aria-checked", "tabindex"], Ge = { class: "capmenu__check" }, Ke = { class: "capmenu__optlabel" }, qe = [
	"aria-checked",
	"tabindex",
	"onClick"
], Je = { class: "capmenu__check" }, Ye = { class: "capmenu__optlabel" }, Xe = { class: "capmenu__title capmenu__title--sub" }, Ze = ["aria-label"], Qe = [
	"aria-checked",
	"tabindex",
	"onClick"
], $e = { class: "capmenu__check" }, et = { class: "capmenu__optlabel" }, Q = { class: "capmenu__title capmenu__title--sub" }, tt = { class: "capmenu__style" }, nt = { class: "capmenu__field" }, rt = { class: "capmenu__fieldlabel" }, it = { class: "capmenu__field" }, at = { class: "capmenu__fieldlabel" }, ot = { class: "capmenu__field" }, st = { class: "capmenu__fieldlabel" }, ct = { class: "capmenu__field" }, lt = { class: "capmenu__fieldlabel" }, ut = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let s = e, l = o, d = c(), f = i(), { t: p } = a(), h = F(null), g = F(null), v = w(() => d.subtitleLang), y = w(() => s.tracks.some((e) => e.language === v.value)), ee = w(() => y.value ? "captions" : "captions-off"), C = w(() => y.value ? s.tracks.findIndex((e) => e.language === v.value) + 1 : 0), k = w(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function j(e) {
			l("update:open", e);
		}
		function te() {
			j(!1);
		}
		function N(e) {
			d.setSubtitle(e), f.defaultSubtitleLang = e, f.subtitlePreferenceSet = !0;
		}
		function re(e) {
			l("select-audio", e);
		}
		function V(e, t, n) {
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
		function H(e) {
			let t = V(e, s.tracks.length + 1, C.value);
			t !== null && N(t === 0 ? null : s.tracks[t - 1].language);
		}
		function U(e) {
			let t = V(e, s.audioTracks.length, k.value);
			t !== null && re(s.audioTracks[t].index);
		}
		function ie(e) {
			f.captionStyle = {
				...f.captionStyle,
				size: e
			};
		}
		function W(e) {
			f.captionStyle = {
				...f.captionStyle,
				textColor: String(e)
			};
		}
		function ae(e) {
			f.captionStyle = {
				...f.captionStyle,
				background: e
			};
		}
		function oe(e) {
			f.captionStyle = {
				...f.captionStyle,
				edge: e
			};
		}
		r(g, R(s, "open"), {
			lockScroll: !1,
			onEscape: () => (te(), !0)
		});
		function se(e) {
			h.value && !h.value.contains(e.target) && te();
		}
		return B(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", se, !0) : document.removeEventListener("pointerdown", se, !0));
		}, { immediate: !0 }), ne(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", se, !0);
		}), (r, i) => (P(), D("div", {
			ref_key: "rootEl",
			ref: h,
			class: "capmenu"
		}, [O("button", {
			type: "button",
			class: M(["capmenu__btn", { "is-active": y.value }]),
			"aria-label": y.value ? z(p)("player.captionsOn") : z(p)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => j(!e.open)
		}, [A(t, { name: ee.value }, null, 8, ["name"])], 10, ze), e.open ? (P(), D("div", {
			key: 0,
			ref_key: "panelEl",
			ref: g,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": z(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			O("div", Ve, [O("h3", He, L(z(p)("player.subtitles")), 1), A(n, {
				name: "x",
				label: z(p)("common.close"),
				size: "sm",
				onClick: te
			}, null, 8, ["label"])]),
			O("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": z(p)("player.subtitleTrack"),
				onKeydown: H
			}, [O("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !y.value,
				tabindex: C.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => N(null)
			}, [O("span", Ge, [y.value ? E("", !0) : (P(), T(t, {
				key: 0,
				name: "check"
			}))]), O("span", Ke, L(z(p)("player.off")), 1)], 8, We), (P(!0), D(S, null, I(e.tracks, (e, n) => (P(), D("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": v.value === e.language,
				tabindex: C.value === n + 1 ? 0 : -1,
				onClick: (t) => N(e.language)
			}, [O("span", Je, [v.value === e.language ? (P(), T(t, {
				key: 0,
				name: "check"
			})) : E("", !0)]), O("span", Ye, L(e.label), 1)], 8, qe))), 128))], 40, Ue),
			e.audioTracks.length > 1 ? (P(), D(S, { key: 0 }, [O("h3", Xe, L(z(p)("player.audio")), 1), O("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": z(p)("player.audioTrack"),
				onKeydown: U
			}, [(P(!0), D(S, null, I(e.audioTracks, (n) => (P(), D("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: k.value === n.index ? 0 : -1,
				onClick: (e) => re(n.index)
			}, [O("span", $e, [e.activeAudio === n.index ? (P(), T(t, {
				key: 0,
				name: "check"
			})) : E("", !0)]), O("span", et, L(n.label), 1)], 8, Qe))), 128))], 40, Ze)], 64)) : E("", !0),
			O("h3", Q, L(z(p)("player.captionStyle")), 1),
			O("div", tt, [
				O("div", nt, [O("span", rt, L(z(p)("player.size")), 1), A(u, {
					"model-value": z(f).captionStyle.size,
					options: z(m),
					label: z(p)("player.captionSize"),
					"onUpdate:modelValue": ie
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				O("div", it, [O("span", at, L(z(p)("player.color")), 1), A(u, {
					"model-value": z(f).captionStyle.textColor,
					options: z(_),
					label: z(p)("player.captionColor"),
					"onUpdate:modelValue": W
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				O("div", ot, [O("span", st, L(z(p)("player.background")), 1), A(u, {
					"model-value": z(f).captionStyle.background,
					options: z(x),
					label: z(p)("player.captionBackground"),
					"onUpdate:modelValue": ae
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				O("div", ct, [O("span", lt, L(z(p)("player.edge")), 1), A(u, {
					"model-value": z(f).captionStyle.edge,
					options: z(b),
					label: z(p)("player.captionEdge"),
					"onUpdate:modelValue": oe
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Be)) : E("", !0)], 512));
	}
}), [["__scopeId", "data-v-3219a7db"]]), dt = 32, ft = 18, pt = 250, $ = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function mt(e, t, n, r, i, a, o) {
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
		r: $(d / m),
		g: $(f / m),
		b: $(p / m)
	};
}
function ht(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: mt(e, t, n, 0, 0, r, n),
		right: mt(e, t, n, t - r, 0, t, n),
		center: mt(e, t, n, 0, 0, t, n)
	};
}
function gt({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function _t({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function vt(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${_t(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${_t(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${_t(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function yt(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var bt = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let n = e, r = F(!1), i = null;
		function a() {
			r.value = yt(i);
		}
		let o = w(() => n.enabled && !n.reducedMotion && !r.value), s = w(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = F(null), l = null, u = null, d = !1, f = !1;
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
				c.value = vt(ht(n, 32, 18));
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
		B(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			C(), e && t && S();
		}, { immediate: !0 }), re(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ne(() => {
			C(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let T = w(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (P(), D("div", {
			class: M(["player__ambient", { "is-active": o.value }]),
			style: N(o.value ? T.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), xt = ["aria-label"], St = { class: "resume__label" }, Ct = { class: "resume__time numeric" }, wt = { class: "resume__actions" }, Tt = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = w(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (P(), D("div", {
			class: "resume",
			role: "region",
			"aria-label": z(i)("player.resumePlayback")
		}, [O("p", St, [
			k(L(o.value[0]), 1),
			O("span", Ct, L(z(U)(e.seconds)), 1),
			k(L(o.value[1]), 1)
		]), O("div", wt, [O("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [A(t, { name: "play" }), O("span", null, L(z(i)("player.resume")), 1)]), O("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [A(t, { name: "rewind" }), O("span", null, L(z(i)("player.startOver")), 1)])])], 8, xt));
	}
}), [["__scopeId", "data-v-ef72b644"]]), Et = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Dt = [
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
], Ot = new Set(Dt);
function kt(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function At(...e) {
	return e.some((e) => Ot.has(kt(e)));
}
function jt(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
var Mt = 8, Nt = 15, Pt = 2 * Math.PI * 15;
function Ft(e, t, n = Pt) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var It = ["aria-label"], Lt = ["src"], Rt = { class: "upnext__body" }, zt = { class: "upnext__eyebrow" }, Bt = { class: "upnext__title" }, Vt = {
	key: 0,
	class: "upnext__cd numeric"
}, Ht = { class: "upnext__actions" }, Ut = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Wt = ["r"], Gt = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Kt = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let { t: r } = a(), i = e, o = n, s = w(() => i.posterUrl ?? i.media.poster_url ?? null), c = w(() => Ft(i.remaining, i.total));
		return (n, i) => (P(), D("aside", {
			class: "upnext",
			role: "region",
			"aria-label": z(r)("player.upNext")
		}, [
			s.value ? (P(), D("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, Lt)) : E("", !0),
			O("div", Rt, [
				O("p", zt, L(z(r)("player.upNext")), 1),
				O("h4", Bt, L(e.media.name), 1),
				e.counting ? (P(), D("p", Vt, L(z(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : E("", !0),
				O("div", Ht, [O("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => o("play-now")
				}, [A(t, { name: "play" }), O("span", null, L(z(r)("player.playNow")), 1)]), O("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => o("cancel")
				}, L(z(r)("player.cancel")), 1)])
			]),
			e.counting ? (P(), D("svg", Ut, [O("circle", {
				cx: "18",
				cy: "18",
				r: z(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Wt), O("circle", {
				cx: "18",
				cy: "18",
				r: z(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": z(Pt),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Gt)])) : E("", !0)
		], 8, It));
	}
}), [["__scopeId", "data-v-c000ec99"]]), qt = {
	class: "transcode",
	role: "alert"
}, Jt = { class: "transcode__card" }, Yt = { class: "transcode__heading" }, Xt = { class: "transcode__body" }, Zt = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (P(), D("div", qt, [O("div", Jt, [
			A(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			O("h3", Yt, L(z(i)("player.transcodeHeading")), 1),
			O("p", Xt, L(e.title ? z(i)("player.transcodeBodyTitled", { title: e.title }) : z(i)("player.transcodeBodyUntitled")), 1),
			O("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [A(t, { name: "arrow-left" }), O("span", null, L(z(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-950c7b9d"]]), Qt = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, $t = { class: "prep__card" }, en = { class: "prep__heading" }, tn = { class: "prep__body" }, nn = ["aria-valuenow"], rn = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (P(), D("div", Qt, [O("div", $t, [
			A(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			O("h3", en, L(z(r)("player.transcodePreparingHeading")), 1),
			O("p", tn, L(e.title ? z(r)("player.transcodePreparingTitled", { title: e.title }) : z(r)("player.transcodePreparingUntitled")), 1),
			O("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [O("div", {
				class: "prep__bar-fill",
				style: N({ width: i() + "%" })
			}, null, 4)], 8, nn),
			O("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [A(t, { name: "arrow-left" }), O("span", null, L(z(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-d91acff4"]]), an = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let c = w(() => s(r.position, r.introMarker) ? {
			label: o("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: o("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (P(), T(C, { name: "skip" }, {
			default: V(() => [c.value ? (P(), D("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: H(l, ["stop"])
			}, [O("span", null, L(c.value.label), 1), A(t, { name: "skip-forward" })])) : E("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-6156ba5d"]]), on = { class: "player__stage" }, sn = ["src", "poster"], cn = [
	"src",
	"srclang",
	"label",
	"default"
], ln = { class: "player__meta" }, un = ["aria-label"], dn = { class: "player__meta-text" }, fn = { class: "player__eyebrow" }, pn = { class: "player__title" }, mn = { class: "player__sub numeric" }, hn = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, gn = {
	key: 0,
	class: "player__center"
}, _n = ["aria-label"], vn = { class: "player__btnrow" }, yn = ["aria-label"], bn = ["aria-label"], xn = ["aria-label"], Sn = { class: "player__time numeric" }, Cn = ["aria-label"], wn = ["aria-label", "aria-pressed"], Tn = ["aria-label", "aria-pressed"], En = ["aria-label"], Dn = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {},
		idleTimeout: {},
		chapters: {},
		introMarker: {},
		outroMarker: {},
		thumbnailAt: { type: Function },
		qualities: {},
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
		let r = e, o = n, s = c(), l = i(), { t: u } = a(), d = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], f = F(null), p = F(null), m = F(!0), h = F(!1), _ = F(!1), b = F(!1), x = F(!1), C = F(!1), j = F(!1), N = w(() => x.value ? 1.35 : 1), R = F(At(r.streamUrl, r.media.path)), V = _e({ apiBase: () => r.apiBase ?? "" }), ie = w(() => R.value ? void 0 : r.streamUrl), W = w(() => R.value && V.state.value !== "ready"), ae = w(() => R.value && (V.state.value === "preparing" || V.state.value === "idle")), oe = w(() => R.value && V.state.value === "error");
		function ce() {
			let e = f.value;
			e && V.start(e, r.media.id);
		}
		let G = F(s.resumePositionFor(r.media.id) ?? 0), K = F(!R.value && G.value > 0), q = null, J = F(!1), le = F(8), ue, de = w(() => s.upNext);
		function fe() {
			R.value = At(r.streamUrl, r.media.path), G.value = s.resumePositionFor(r.media.id) ?? 0, K.value = !R.value && G.value > 0, q = null, Ve = !1, Oe = !1, Y(), J.value = !1, V.reset(), R.value && ce();
		}
		function pe(e) {
			let t = f.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : q = Math.max(0, e));
		}
		function me() {
			pe(G.value), K.value = !1, f.value?.play()?.catch(() => {});
		}
		function he() {
			q = null, pe(0), s.clearResume(r.media.id), K.value = !1, f.value?.play()?.catch(() => {});
		}
		function Y() {
			ue &&= (clearInterval(ue), void 0);
		}
		function ge() {
			le.value = 8, Y(), ue = setInterval(() => {
				--le.value, le.value <= 0 && (Y(), ye());
			}, 1e3);
		}
		function ve() {
			ft(), m.value = !0, s.upNext && (J.value = !0, l.autoplay && ge());
		}
		function ye() {
			Y(), J.value = !1;
			let e = s.next(r.streamUrlFor);
			e && o("play-next", e);
		}
		function be() {
			Y(), J.value = !1;
		}
		function xe() {
			!R.value && jt(f.value) && (R.value = !0, ce());
		}
		let X = F([]), Se = F([]), Ce = F(-1), we = F(!1), Ee = s.subtitleLang, De = w(() => V.subtitleTracks.value), Oe = !1;
		function ke() {
			if (Oe) return;
			if (l.subtitlePreferenceSet) {
				Oe = !0;
				return;
			}
			let e = De.value.find((e) => e.default);
			if (!e) return;
			let t = X.value.find((t) => t.language === (e.language || e.label));
			t && (s.setSubtitle(t.language), Ee = t.language, Oe = !0);
		}
		let Ae = w(() => X.value.some((e) => e.language === s.subtitleLang));
		function Z() {
			let e = f.value;
			X.value = g(e), Se.value = y(e), Ce.value = v(e), ke();
		}
		function je() {
			if (Ae.value) Ee = s.subtitleLang, s.setSubtitle(null);
			else {
				let e = Ee && X.value.some((e) => e.language === Ee) ? Ee : X.value[0]?.language ?? null;
				s.setSubtitle(e);
			}
			o("captions");
		}
		function Me(e) {
			ee(f.value, e), Ce.value = e;
		}
		B(De, () => {
			te(() => Z());
		}, { deep: !0 });
		let Pe = null, ze, Be = w(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Ve = !1;
		function He() {
			if (!r.autoplay || Ve || K.value || W.value) return;
			let e = f.value;
			if (!e || !e.paused) return;
			Ve = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, s.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Ue() {
			He();
		}
		function We() {
			r.prevEpisode && o("play-episode", r.prevEpisode);
		}
		function Ge() {
			r.nextEpisode && o("play-episode", r.nextEpisode);
		}
		function Ke() {
			let e = f.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function qe(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Je() {
			s.play();
		}
		function Ye() {
			s.pause();
		}
		function Xe() {
			let e = f.value;
			e && (s.updateProgress(e.currentTime, e.duration, qe(e)), s.setMediaPositionState());
		}
		function Ze() {
			let e = f.value;
			e && (e.volume = s.volume, e.muted = s.muted, e.playbackRate = s.rate, q !== null && (e.currentTime = e.duration ? Math.min(e.duration, q) : q, q = null), s.updateProgress(e.currentTime, e.duration, qe(e)), s.setMediaPositionState(), Z());
		}
		function Qe() {
			let e = f.value;
			e && s.updateProgress(e.currentTime, e.duration, qe(e));
		}
		function $e() {
			let e = f.value;
			e && (Math.abs(e.volume - s.volume) > .001 && s.setVolume(e.volume), e.muted !== s.muted && s.toggleMute());
		}
		function et() {
			let e = f.value;
			e && e.playbackRate !== s.rate && s.setRate(e.playbackRate);
		}
		function Q(e) {
			let t = f.value;
			t && s.duration > 0 && (t.currentTime = Math.min(s.duration, Math.max(0, e)));
		}
		function tt() {
			_.value = !0, $();
		}
		function nt() {
			_.value = !1, $();
		}
		function rt(e) {
			let t = d.reduce((e, t, n) => Math.abs(t - s.rate) < Math.abs(d[e] - s.rate) ? n : e, 0), n = d[Math.min(d.length - 1, Math.max(0, t + e))];
			s.setRate(n);
		}
		Te({
			playPause: Ke,
			seekBy: (e) => Q(s.position + e),
			frameStep: (e) => {
				s.playing || Q(s.position + e / 30);
			},
			volumeBy: (e) => s.setVolume(s.volume + e),
			toggleMute: it,
			toggleFullscreen: ot,
			toggleCaptions: je,
			toggleTheater: at,
			togglePip: ct,
			seekToPercent: (e) => Q(e * s.duration),
			speedStep: rt,
			toggleHelp: () => {
				b.value = !b.value;
			}
		}, { enabled: () => !b.value && !we.value });
		function it() {
			s.toggleMute();
		}
		function at() {
			x.value = !x.value, o("theater", x.value);
		}
		B(() => s.muted, (e) => {
			let t = f.value;
			t && t.muted !== e && (t.muted = e);
		}), B(() => s.volume, (e) => {
			let t = f.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), B(() => s.rate, (e) => {
			let t = f.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function ot() {
			if (typeof document > "u") return;
			let e = p.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function st() {
			h.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function ct() {
			let e = f.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function lt() {
			C.value = !0;
		}
		function dt() {
			C.value = !1;
		}
		function ft() {
			ze &&= (clearTimeout(ze), void 0);
		}
		function pt() {
			ft(), !(!s.playing || _.value) && (ze = setTimeout(() => {
				s.playing && !_.value && (m.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function $() {
			m.value = !0, pt();
		}
		B(() => s.playing, (e) => {
			e ? (K.value = !1, be(), pt()) : (ft(), m.value = !0);
		});
		let mt = null;
		return re(() => {
			s.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), typeof document < "u" && (document.addEventListener("fullscreenchange", st), j.value = document.pictureInPictureEnabled === !0), mt = s.bindMediaSession({
				onPlay: () => void f.value?.play()?.catch(() => {}),
				onPause: () => f.value?.pause(),
				onSeek: (e) => Q(e)
			}), Pe = f.value?.textTracks ?? null, Pe?.addEventListener?.("addtrack", Z), Pe?.addEventListener?.("removetrack", Z), Z(), R.value && ce();
		}), B(() => r.media, (e) => {
			s.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), fe();
		}), ne(() => {
			ft(), Y(), V.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", st), mt?.(), Pe?.removeEventListener?.("addtrack", Z), Pe?.removeEventListener?.("removetrack", Z);
		}), (n, r) => (P(), D("div", {
			ref_key: "containerRef",
			ref: p,
			class: M(["player", {
				"is-chrome-hidden": !m.value,
				"is-theater": x.value
			}]),
			onPointermove: $,
			onPointerdown: $,
			onFocusin: $
		}, [A(bt, {
			video: f.value,
			enabled: z(l).atmosphere,
			playing: z(s).playing,
			"reduced-motion": z(l).effectiveReducedMotion,
			intensity: N.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), O("div", on, [
			O("video", {
				ref_key: "videoRef",
				ref: f,
				class: "player__video",
				src: ie.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Je,
				onPause: Ye,
				onTimeupdate: Xe,
				onLoadedmetadata: Ze,
				onCanplay: Ue,
				onProgress: Qe,
				onVolumechange: $e,
				onRatechange: et,
				onEnded: ve,
				onError: xe,
				onEnterpictureinpicture: lt,
				onLeavepictureinpicture: dt,
				onClick: Ke
			}, [(P(!0), D(S, null, I(De.value, (e) => (P(), D("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, cn))), 128))], 40, sn),
			r[9] ||= O("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[10] ||= O("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			O("div", ln, [O("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": z(u)("player.back"),
				onClick: r[0] ||= H((e) => o("back"), ["stop"])
			}, [A(t, { name: "arrow-left" })], 8, un), O("div", dn, [
				O("p", fn, L(z(u)("player.nowPlaying")), 1),
				O("h2", pn, L(e.media.name), 1),
				O("div", mn, [(P(!0), D(S, null, I(Be.value, (e, t) => (P(), D(S, { key: t }, [t > 0 && !e.cert ? (P(), D("span", hn, "·")) : E("", !0), O("span", { class: M({ player__cert: e.cert }) }, L(e.text), 3)], 64))), 128))])
			])]),
			W.value ? E("", !0) : (P(), D("div", gn, [O("button", {
				type: "button",
				class: M(["player__bigplay", { "is-playing": z(s).playing }]),
				"aria-label": z(s).playing ? z(u)("player.pause") : z(u)("player.play"),
				onClick: H(Ke, ["stop"])
			}, [A(t, { name: z(s).playing ? "pause" : "play" }, null, 8, ["name"])], 10, _n)])),
			A(Re, {
				video: f.value,
				language: z(s).subtitleLang,
				"style-config": z(l).captionStyle,
				lifted: m.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			W.value ? E("", !0) : (P(), D("div", {
				key: 1,
				class: "player__controls",
				onClick: r[3] ||= H(() => {}, ["stop"])
			}, [A(se, {
				position: z(s).position,
				duration: z(s).duration,
				buffered: z(s).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: Q,
				onScrubStart: tt,
				onScrubEnd: nt
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), O("div", vn, [
				e.prevEpisode ? (P(), D("button", {
					key: 0,
					type: "button",
					class: "player__iconbtn",
					"aria-label": z(u)("player.previousEpisode"),
					onClick: We
				}, [A(t, { name: "skip-back" })], 8, yn)) : E("", !0),
				O("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": z(s).playing ? z(u)("player.pause") : z(u)("player.play"),
					onClick: Ke
				}, [A(t, { name: z(s).playing ? "pause" : "play" }, null, 8, ["name"])], 8, bn),
				e.nextEpisode ? (P(), D("button", {
					key: 1,
					type: "button",
					class: "player__iconbtn",
					"aria-label": z(u)("player.nextEpisode"),
					onClick: Ge
				}, [A(t, { name: "skip-forward" })], 8, xn)) : E("", !0),
				O("span", Sn, [
					k(L(z(U)(z(s).position)), 1),
					r[7] ||= O("span", { class: "player__sep" }, " / ", -1),
					k(L(z(U)(z(s).duration)), 1)
				]),
				r[8] ||= O("span", { class: "player__grow" }, null, -1),
				A(Fe),
				A(Ie),
				A(Le, { qualities: e.qualities }, null, 8, ["qualities"]),
				A(ut, {
					open: we.value,
					"onUpdate:open": r[1] ||= (e) => we.value = e,
					tracks: X.value,
					"audio-tracks": Se.value,
					"active-audio": Ce.value,
					onSelectAudio: Me
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				O("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": z(u)("player.keyboardShortcuts"),
					"aria-haspopup": "dialog",
					onClick: r[2] ||= (e) => b.value = !0
				}, [A(t, { name: "info" })], 8, Cn),
				j.value ? (P(), D("button", {
					key: 2,
					type: "button",
					class: M(["player__iconbtn", { "is-on": C.value }]),
					"aria-label": C.value ? z(u)("player.exitPip") : z(u)("player.pip"),
					"aria-pressed": C.value,
					onClick: ct
				}, [A(t, { name: "pip" })], 10, wn)) : E("", !0),
				O("button", {
					type: "button",
					class: M(["player__iconbtn", { "is-on": x.value }]),
					"aria-label": x.value ? z(u)("player.exitTheater") : z(u)("player.theater"),
					"aria-pressed": x.value,
					onClick: at
				}, [A(t, { name: "theater" })], 10, Tn),
				O("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": h.value ? z(u)("player.exitFullscreen") : z(u)("player.fullscreen"),
					onClick: ot
				}, [A(t, { name: h.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, En)
			])])),
			W.value ? E("", !0) : (P(), T(an, {
				key: 2,
				position: z(s).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: Q
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			K.value && !W.value ? (P(), T(Tt, {
				key: 3,
				seconds: G.value,
				onResume: me,
				onRestart: he
			}, null, 8, ["seconds"])) : E("", !0),
			J.value && de.value && !W.value ? (P(), T(Kt, {
				key: 4,
				media: de.value,
				remaining: le.value,
				total: z(8),
				counting: z(l).autoplay,
				onPlayNow: ye,
				onCancel: be
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : E("", !0),
			ae.value ? (P(), T(rn, {
				key: 5,
				title: e.media.name,
				progress: z(V).progress.value,
				onBack: r[4] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : E("", !0),
			oe.value ? (P(), T(Zt, {
				key: 6,
				title: e.media.name,
				onBack: r[5] ||= (e) => o("back")
			}, null, 8, ["title"])) : E("", !0),
			A(Ne, {
				open: b.value,
				onClose: r[6] ||= (e) => b.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-726c32bf"]]);
//#endregion
export { Fe as A, he as B, gt as C, Re as D, ut as E, we as F, de as G, pe as H, Ce as I, ce as J, fe as K, Te as L, xe as M, X as N, Le as O, be as P, _e as R, yt as S, ht as T, me as U, ue as V, ge as W, U as X, se as Y, ft as _, Kt as a, vt as b, Mt as c, kt as d, jt as f, bt as g, Tt as h, Zt as i, Ne as j, Ie as k, Pt as l, Ft as m, an as n, Et as o, At as p, G as q, rn as r, Dt as s, Dn as t, Nt as u, pt as v, _t as w, mt as x, dt as y, Y as z };

//# sourceMappingURL=Player-jbJMxv3h.js.map