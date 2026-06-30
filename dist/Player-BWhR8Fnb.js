import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./IconButton-C5x9ZDfp.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { a as i } from "./usePreferencesStore-CXHWLjml.js";
import { t as a } from "./useMessages-C21WhqOh.js";
import { c as o, t as s } from "./client-CZc6ehUa.js";
import { n as c, o as l, t as u } from "./LoveButton-BYayoxla.js";
import { t as d } from "./Slider-BMn_Lp_q.js";
import { t as f } from "./Select-Bjsgj4BN.js";
import { c as p, g as m, h, i as g, l as _, m as v, n as y, o as b, p as ee, r as x, s as te, t as ne } from "./captions-COgPp5bH.js";
import { Fragment as S, Transition as C, computed as w, createBlock as T, createCommentVNode as E, createElementBlock as D, createElementVNode as O, createTextVNode as k, createVNode as A, defineComponent as j, inject as re, nextTick as ie, normalizeClass as M, normalizeStyle as N, onBeforeUnmount as ae, onMounted as oe, openBlock as P, ref as F, renderList as I, toDisplayString as L, toRef as R, unref as z, watch as B, withCtx as V, withModifiers as se } from "vue";
//#region src/components/player/format-time.ts
function H(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var U = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], ce = { class: "scrubber__track" }, le = ["title"], W = { class: "scrubber__time numeric" }, ue = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		function te(e) {
			if (i.duration <= 0) return;
			c.value = !0;
			try {
				s.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = x(e);
			u.value = t, o("scrub-start"), o("seek", t * i.duration), e.preventDefault();
		}
		function ne(e) {
			let t = x(e);
			d.value = t, c.value && (u.value = t, o("seek", t * i.duration));
		}
		function C(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				o("scrub-end");
			}
		}
		function T() {
			l.value = !0;
		}
		function k() {
			l.value = !1;
		}
		function A(e) {
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
			"aria-valuetext": z(H)(e.position),
			"aria-label": z(r)("player.seek"),
			onPointerdown: te,
			onPointermove: ne,
			onPointerup: C,
			onPointercancel: C,
			onPointerenter: T,
			onPointerleave: k,
			onKeydown: A
		}, [O("div", ce, [
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
			}, null, 12, le))), 128)),
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
		}, null, 4)) : E("", !0), O("span", W, L(z(H)(_.value)), 1)], 4)) : E("", !0)], 40, U));
	}
}), [["__scopeId", "data-v-39414106"]]);
//#endregion
//#region src/components/player/hls-playback.ts
function de(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
async function fe(e, t, n = {}) {
	let { default: r } = await import("./hls-Be5Qwv5L.js");
	if (r.isSupported()) {
		let i = new r({
			enableWorker: !0,
			lowLatencyMode: !1,
			...n.hlsConfig,
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
	if (de(e)) {
		let r = () => n.onReady?.(), i = () => n.onError?.("native hls error");
		return e.addEventListener("loadedmetadata", r), e.addEventListener("error", i), e.src = t, { destroy() {
			e.removeEventListener("loadedmetadata", r), e.removeEventListener("error", i), e.removeAttribute("src"), e.load();
		} };
	}
	throw Error("HLS is not supported in this browser");
}
//#endregion
//#region src/components/player/transcode.ts
var G = new Set([
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
function pe(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function me(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = K(e.url ?? e.src);
		r !== "" && t.push({
			index: pe(e.index),
			language: K(e.language ?? e.lang ?? e.srclang),
			label: K(e.label),
			default: q(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function he(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function J(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function Y(e) {
	let t = e ?? {};
	return {
		jobId: K(t.job_id ?? t.jobId),
		masterUrl: K(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: K(t.status, "running"),
		reused: q(t.reused),
		subtitles: me(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks)
	};
}
function X(e) {
	let t = e ?? {};
	return {
		jobId: K(t.job_id ?? t.jobId),
		status: K(t.status, "running"),
		playlistReady: q(t.playlist_ready ?? t.playlistReady),
		progress: pe(t.progress),
		masterUrl: K(t.master_url ?? t.masterUrl),
		subtitles: me(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks)
	};
}
function Z(e) {
	return e.playlistReady || e.status === "completed";
}
function ge(e) {
	return G.has(e);
}
function _e(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function ve(e) {
	let t = F("idle"), n = F(0), r = F([]);
	function i(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: _e(n, e.url)
		}));
	}
	let a = e.attach ?? fe, o = e.pollIntervalMs ?? 1e3, c = e.maxWaitMs ?? 12e4, l = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), u = Math.max(1, Math.ceil(c / Math.max(1, o))), d = ye(), f = e.getToken ?? (() => be(d)), p = null, m = !1;
	function h() {
		return e.client ?? new s({
			baseUrl: e.apiBase(),
			tokenStore: d ?? void 0
		});
	}
	async function g(s, c, d) {
		_(), m = !1, t.value = "preparing", n.value = 0, r.value = [];
		try {
			let r = h(), g = Y(await r.post(he(c, d)));
			if (m) return;
			if (!g.jobId || !g.masterUrl) throw Error("transcode start returned no job");
			i(g.subtitles);
			let _ = _e(e.apiBase(), g.masterUrl), v = g.status === "completed";
			for (let e = 0; !v && e < u; e++) {
				let e = X(await r.get(J(g.jobId)));
				if (m) return;
				if (n.value = e.progress, i(e.subtitles), ge(e.status)) throw Error(`transcode ${e.status}`);
				if (Z(e)) {
					v = !0;
					break;
				}
				if (await l(o), m) return;
			}
			if (!v) throw Error("transcode timed out");
			if (p = await a(s, _, {
				getToken: f,
				hlsConfig: e.hlsConfig,
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
function ye() {
	try {
		return new o();
	} catch {
		return null;
	}
}
function be(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/components/player/shortcuts.ts
var xe = [
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
], Se = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Ce = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function we(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Te(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Ee(e, t) {
	switch (e.key) {
		case " ": return we(e.target) ? !1 : (t.playPause(), !0);
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
function De(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Te(n.target) || Ee(n, e) && n.preventDefault();
	}
	oe(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), ae(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Oe = ["aria-label"], ke = { class: "shortcuts__head" }, Ae = { class: "shortcuts__title" }, Q = { class: "shortcuts__grid" }, je = { class: "shortcuts__keys" }, Me = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Ne = {
	key: 1,
	class: "shortcuts__key"
}, Pe = { class: "shortcuts__label" }, Fe = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => xe }
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
			onClick: i[1] ||= se((e) => s("close"), ["self"])
		}, [O("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": z(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [O("div", ke, [O("h3", Ae, L(z(c)("player.keyboard")), 1), A(n, {
			name: "x",
			label: z(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), O("ul", Q, [(P(!0), D(S, null, I(e.shortcuts, (e) => (P(), D("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [O("span", je, [(P(!0), D(S, null, I(e.keys, (e, n) => (P(), D(S, { key: n }, [e === "–" ? (P(), D("span", Me, "–")) : (P(), D("kbd", Ne, [z(Se)[e] ? (P(), T(t, {
			key: 0,
			name: z(Se)[e],
			label: z(Ce)[e] ?? e
		}, null, 8, ["name", "label"])) : (P(), D(S, { key: 1 }, [k(L(e), 1)], 64))]))], 64))), 128))]), O("span", Pe, L(e.label), 1)]))), 128))])], 8, Oe)])) : E("", !0);
	}
}), [["__scopeId", "data-v-f3720b12"]]), Ie = { class: "volume" }, Le = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "VolumeControl",
	setup(e) {
		let t = l(), r = i(), { t: o } = a(), s = w(() => t.muted ? 0 : t.volume), c = w(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function u(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return B(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (P(), D("div", Ie, [A(n, {
			name: c.value,
			label: z(t).muted ? z(o)("player.unmute") : z(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => z(t).toggleMute()
		}, null, 8, ["name", "label"]), A(d, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: z(o)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": u
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-b3fb9c33"]]), Re = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		], n = l(), { t: r } = a(), i = w(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function o(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (P(), T(f, {
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
}), [["__scopeId", "data-v-d8e96c28"]]), ze = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = l(), r = i(), { t: o } = a(), s = w(() => t.qualities.length > 0);
		function c(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => s.value ? (P(), T(f, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": z(n).quality,
			options: e.qualities,
			label: z(o)("player.quality"),
			"onUpdate:modelValue": c
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : E("", !0);
	}
}), [["__scopeId", "data-v-791c32d2"]]), Be = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = F([]), i = w(() => _(n.styleConfig)), a = null;
		function o() {
			r.value = h(a);
		}
		function s() {
			a?.removeEventListener("cuechange", o), a = null;
		}
		function c() {
			s(), p(n.video, n.language);
			let e = m(n.video, n.language);
			e ? (a = e, e.addEventListener("cuechange", o), r.value = h(e)) : r.value = [];
		}
		return B(() => [n.video, n.language], c, { immediate: !0 }), ae(s), t({ lines: r }), (t, n) => r.value.length ? (P(), D("div", {
			key: 0,
			class: M(["player__captions", { "is-lifted": e.lifted }]),
			style: N(i.value)
		}, [(P(!0), D(S, null, I(r.value, (e, t) => (P(), D("p", {
			key: t,
			class: "player__caption-line"
		}, L(e), 1))), 128))], 6)) : E("", !0);
	}
}), [["__scopeId", "data-v-15a0f3c5"]]), Ve = ["aria-label", "aria-expanded"], He = ["aria-label"], Ue = { class: "capmenu__head" }, $ = { class: "capmenu__title" }, We = ["aria-label"], Ge = ["aria-checked", "tabindex"], Ke = { class: "capmenu__check" }, qe = { class: "capmenu__optlabel" }, Je = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ye = { class: "capmenu__check" }, Xe = { class: "capmenu__optlabel" }, Ze = { class: "capmenu__title capmenu__title--sub" }, Qe = ["aria-label"], $e = [
	"aria-checked",
	"tabindex",
	"onClick"
], et = { class: "capmenu__check" }, tt = { class: "capmenu__optlabel" }, nt = { class: "capmenu__title capmenu__title--sub" }, rt = { class: "capmenu__style" }, it = { class: "capmenu__field" }, at = { class: "capmenu__fieldlabel" }, ot = { class: "capmenu__field" }, st = { class: "capmenu__fieldlabel" }, ct = { class: "capmenu__field" }, lt = { class: "capmenu__fieldlabel" }, ut = { class: "capmenu__field" }, dt = { class: "capmenu__fieldlabel" }, ft = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let s = e, c = o, u = l(), d = i(), { t: p } = a(), m = F(null), h = F(null), _ = w(() => u.subtitleLang), v = w(() => s.tracks.some((e) => e.language === _.value)), b = w(() => v.value ? "captions" : "captions-off"), ee = w(() => v.value ? s.tracks.findIndex((e) => e.language === _.value) + 1 : 0), te = w(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function C(e) {
			c("update:open", e);
		}
		function k() {
			C(!1);
		}
		function j(e) {
			u.setSubtitle(e), d.defaultSubtitleLang = e, d.subtitlePreferenceSet = !0;
		}
		function re(e) {
			c("select-audio", e);
		}
		function ie(e, t, n) {
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
		function N(e) {
			let t = ie(e, s.tracks.length + 1, ee.value);
			t !== null && j(t === 0 ? null : s.tracks[t - 1].language);
		}
		function oe(e) {
			let t = ie(e, s.audioTracks.length, te.value);
			t !== null && re(s.audioTracks[t].index);
		}
		function V(e) {
			d.captionStyle = {
				...d.captionStyle,
				size: e
			};
		}
		function se(e) {
			d.captionStyle = {
				...d.captionStyle,
				textColor: String(e)
			};
		}
		function H(e) {
			d.captionStyle = {
				...d.captionStyle,
				background: e
			};
		}
		function U(e) {
			d.captionStyle = {
				...d.captionStyle,
				edge: e
			};
		}
		r(h, R(s, "open"), {
			lockScroll: !1,
			onEscape: () => (k(), !0)
		});
		function ce(e) {
			m.value && !m.value.contains(e.target) && k();
		}
		return B(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", ce, !0) : document.removeEventListener("pointerdown", ce, !0));
		}, { immediate: !0 }), ae(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", ce, !0);
		}), (r, i) => (P(), D("div", {
			ref_key: "rootEl",
			ref: m,
			class: "capmenu"
		}, [O("button", {
			type: "button",
			class: M(["capmenu__btn", { "is-active": v.value }]),
			"aria-label": v.value ? z(p)("player.captionsOn") : z(p)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => C(!e.open)
		}, [A(t, { name: b.value }, null, 8, ["name"])], 10, Ve), e.open ? (P(), D("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": z(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			O("div", Ue, [O("h3", $, L(z(p)("player.subtitles")), 1), A(n, {
				name: "x",
				label: z(p)("common.close"),
				size: "sm",
				onClick: k
			}, null, 8, ["label"])]),
			O("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": z(p)("player.subtitleTrack"),
				onKeydown: N
			}, [O("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !v.value,
				tabindex: ee.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => j(null)
			}, [O("span", Ke, [v.value ? E("", !0) : (P(), T(t, {
				key: 0,
				name: "check"
			}))]), O("span", qe, L(z(p)("player.off")), 1)], 8, Ge), (P(!0), D(S, null, I(e.tracks, (e, n) => (P(), D("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": _.value === e.language,
				tabindex: ee.value === n + 1 ? 0 : -1,
				onClick: (t) => j(e.language)
			}, [O("span", Ye, [_.value === e.language ? (P(), T(t, {
				key: 0,
				name: "check"
			})) : E("", !0)]), O("span", Xe, L(e.label), 1)], 8, Je))), 128))], 40, We),
			e.audioTracks.length > 1 ? (P(), D(S, { key: 0 }, [O("h3", Ze, L(z(p)("player.audio")), 1), O("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": z(p)("player.audioTrack"),
				onKeydown: oe
			}, [(P(!0), D(S, null, I(e.audioTracks, (n) => (P(), D("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: te.value === n.index ? 0 : -1,
				onClick: (e) => re(n.index)
			}, [O("span", et, [e.activeAudio === n.index ? (P(), T(t, {
				key: 0,
				name: "check"
			})) : E("", !0)]), O("span", tt, L(n.label), 1)], 8, $e))), 128))], 40, Qe)], 64)) : E("", !0),
			O("h3", nt, L(z(p)("player.captionStyle")), 1),
			O("div", rt, [
				O("div", it, [O("span", at, L(z(p)("player.size")), 1), A(f, {
					"model-value": z(d).captionStyle.size,
					options: z(g),
					label: z(p)("player.captionSize"),
					"onUpdate:modelValue": V
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				O("div", ot, [O("span", st, L(z(p)("player.color")), 1), A(f, {
					"model-value": z(d).captionStyle.textColor,
					options: z(y),
					label: z(p)("player.captionColor"),
					"onUpdate:modelValue": se
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				O("div", ct, [O("span", lt, L(z(p)("player.background")), 1), A(f, {
					"model-value": z(d).captionStyle.background,
					options: z(ne),
					label: z(p)("player.captionBackground"),
					"onUpdate:modelValue": H
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				O("div", ut, [O("span", dt, L(z(p)("player.edge")), 1), A(f, {
					"model-value": z(d).captionStyle.edge,
					options: z(x),
					label: z(p)("player.captionEdge"),
					"onUpdate:modelValue": U
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, He)) : E("", !0)], 512));
	}
}), [["__scopeId", "data-v-3219a7db"]]), pt = 32, mt = 18, ht = 250, gt = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function _t(e, t, n, r, i, a, o) {
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
		r: gt(d / m),
		g: gt(f / m),
		b: gt(p / m)
	};
}
function vt(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: _t(e, t, n, 0, 0, r, n),
		right: _t(e, t, n, t - r, 0, t, n),
		center: _t(e, t, n, 0, 0, t, n)
	};
}
function yt({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function bt({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function xt(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${bt(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${bt(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${bt(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function St(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Ct = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
			r.value = St(i);
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
				c.value = xt(vt(n, 32, 18));
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
		function ne() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		B(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			ne(), e && t && te();
		}, { immediate: !0 }), oe(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ae(() => {
			ne(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let S = w(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (P(), D("div", {
			class: M(["player__ambient", { "is-active": o.value }]),
			style: N(o.value ? S.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), wt = ["aria-label"], Tt = { class: "resume__label" }, Et = { class: "resume__time numeric" }, Dt = { class: "resume__actions" }, Ot = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = w(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (P(), D("div", {
			class: "resume",
			role: "region",
			"aria-label": z(i)("player.resumePlayback")
		}, [O("p", Tt, [
			k(L(o.value[0]), 1),
			O("span", Et, L(z(H)(e.seconds)), 1),
			k(L(o.value[1]), 1)
		]), O("div", Dt, [O("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [A(t, { name: "play" }), O("span", null, L(z(i)("player.resume")), 1)]), O("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [A(t, { name: "rewind" }), O("span", null, L(z(i)("player.startOver")), 1)])])], 8, wt));
	}
}), [["__scopeId", "data-v-ef72b644"]]), kt = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], At = [
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
], jt = new Set(At);
function Mt(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Nt(...e) {
	return e.some((e) => jt.has(Mt(e)));
}
function Pt(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Ft(e) {
	return e?.error?.code === 2;
}
var It = 8, Lt = 15, Rt = 2 * Math.PI * 15;
function zt(e, t, n = Rt) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Bt = ["aria-label"], Vt = ["src"], Ht = { class: "upnext__body" }, Ut = { class: "upnext__eyebrow" }, Wt = { class: "upnext__title" }, Gt = {
	key: 0,
	class: "upnext__cd numeric"
}, Kt = { class: "upnext__actions" }, qt = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Jt = ["r"], Yt = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Xt = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let { t: r } = a(), i = e, o = n, s = w(() => i.posterUrl ?? i.media.poster_url ?? null), c = w(() => zt(i.remaining, i.total));
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
			}, null, 8, Vt)) : E("", !0),
			O("div", Ht, [
				O("p", Ut, L(z(r)("player.upNext")), 1),
				O("h4", Wt, L(e.media.name), 1),
				e.counting ? (P(), D("p", Gt, L(z(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : E("", !0),
				O("div", Kt, [O("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => o("play-now")
				}, [A(t, { name: "play" }), O("span", null, L(z(r)("player.playNow")), 1)]), O("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => o("cancel")
				}, L(z(r)("player.cancel")), 1)])
			]),
			e.counting ? (P(), D("svg", qt, [O("circle", {
				cx: "18",
				cy: "18",
				r: z(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Jt), O("circle", {
				cx: "18",
				cy: "18",
				r: z(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": z(Rt),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Yt)])) : E("", !0)
		], 8, Bt));
	}
}), [["__scopeId", "data-v-c000ec99"]]), Zt = {
	class: "transcode",
	role: "alert"
}, Qt = { class: "transcode__card" }, $t = { class: "transcode__heading" }, en = { class: "transcode__body" }, tn = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (P(), D("div", Zt, [O("div", Qt, [
			A(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			O("h3", $t, L(z(i)("player.transcodeHeading")), 1),
			O("p", en, L(e.title ? z(i)("player.transcodeBodyTitled", { title: e.title }) : z(i)("player.transcodeBodyUntitled")), 1),
			O("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [A(t, { name: "arrow-left" }), O("span", null, L(z(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-950c7b9d"]]), nn = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, rn = { class: "prep__card" }, an = { class: "prep__heading" }, on = { class: "prep__body" }, sn = ["aria-valuenow"], cn = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (P(), D("div", nn, [O("div", rn, [
			A(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			O("h3", an, L(z(r)("player.transcodePreparingHeading")), 1),
			O("p", on, L(e.title ? z(r)("player.transcodePreparingTitled", { title: e.title }) : z(r)("player.transcodePreparingUntitled")), 1),
			O("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [O("div", {
				class: "prep__bar-fill",
				style: N({ width: i() + "%" })
			}, null, 4)], 8, sn),
			O("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [A(t, { name: "arrow-left" }), O("span", null, L(z(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-d91acff4"]]), ln = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
				onClick: se(l, ["stop"])
			}, [O("span", null, L(c.value.label), 1), A(t, { name: "skip-forward" })])) : E("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-6156ba5d"]]), un = { class: "player__stage" }, dn = ["src", "poster"], fn = [
	"src",
	"srclang",
	"label",
	"default"
], pn = { class: "player__meta" }, mn = ["aria-label"], hn = { class: "player__meta-text" }, gn = { class: "player__eyebrow" }, _n = { class: "player__title" }, vn = { class: "player__sub numeric" }, yn = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, bn = {
	key: 0,
	class: "player__center"
}, xn = ["aria-label"], Sn = { class: "player__btnrow" }, Cn = ["aria-label"], wn = ["aria-label"], Tn = ["aria-label"], En = { class: "player__time numeric" }, Dn = ["aria-label", "aria-pressed"], On = ["aria-label"], kn = ["aria-label", "aria-pressed"], An = ["aria-label", "aria-pressed"], jn = ["aria-label"], Mn = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let r = e, o = n, s = l(), d = i(), { t: f } = a(), p = c(), m = w(() => p.isFavorite(r.media.id)), h = w(() => p.likeLevel(r.media.id));
		function g() {
			p.toggleFavorite(r.media.id, fe());
		}
		function _() {
			p.cycleLove(r.media.id, fe());
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
		], x = F(null), ne = F(null), C = F(!0), j = F(!1), N = F(!1), R = F(!1), V = F(!1), U = F(!1), ce = F(!1), le = w(() => V.value ? 1.35 : 1), W = F(Nt(r.streamUrl, r.media.path)), de = re("phlixConfig", null);
		function fe() {
			return de?.apiBase ?? "";
		}
		let G = ve({
			apiBase: () => r.apiBase ?? "",
			hlsConfig: de?.playerHlsConfig
		}), K = w(() => W.value ? void 0 : r.streamUrl), q = w(() => W.value && G.state.value !== "ready"), pe = w(() => W.value && (G.state.value === "preparing" || G.state.value === "idle")), me = w(() => W.value && G.state.value === "error");
		function he() {
			let e = x.value;
			e && G.start(e, r.media.id);
		}
		let J = F(s.resumePositionFor(r.media.id) ?? 0), Y = F(!W.value && J.value > 0), X = null, Z = F(!1), ge = F(8), _e, ye = w(() => s.upNext);
		function be() {
			W.value = Nt(r.streamUrl, r.media.path), J.value = s.resumePositionFor(r.media.id) ?? 0, Y.value = !W.value && J.value > 0, X = null, Ye = !1, Ve = !1, we(), Z.value = !1, G.reset(), W.value && he();
		}
		function xe(e) {
			let t = x.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : X = Math.max(0, e));
		}
		function Se() {
			xe(J.value), Y.value = !1, x.value?.play()?.catch(() => {});
		}
		function Ce() {
			X = null, xe(0), s.clearResume(r.media.id), Y.value = !1, x.value?.play()?.catch(() => {});
		}
		function we() {
			_e &&= (clearInterval(_e), void 0);
		}
		function Te() {
			ge.value = 8, we(), _e = setInterval(() => {
				--ge.value, ge.value <= 0 && (we(), Oe());
			}, 1e3);
		}
		function Ee() {
			xt(), C.value = !0, s.upNext && (Z.value = !0, d.autoplay && Te());
		}
		function Oe() {
			we(), Z.value = !1;
			let e = s.next(r.streamUrlFor);
			e && o("play-next", e);
		}
		function ke() {
			we(), Z.value = !1;
		}
		function Ae() {
			if (W.value) return;
			let e = x.value, t = Ft(e) && (e?.currentTime ?? 0) === 0;
			(Pt(e) || t) && (W.value = !0, he());
		}
		let Q = F([]), je = F([]), Me = F(-1), Ne = F(!1), Pe = s.subtitleLang, Ie = w(() => G.subtitleTracks.value), Ve = !1;
		function He() {
			if (Ve) return;
			if (d.subtitlePreferenceSet) {
				Ve = !0;
				return;
			}
			let e = Ie.value.find((e) => e.default);
			if (!e) return;
			let t = Q.value.find((t) => t.language === (e.language || e.label));
			t && (s.setSubtitle(t.language), Pe = t.language, Ve = !0);
		}
		let Ue = w(() => Q.value.some((e) => e.language === s.subtitleLang));
		function $() {
			let e = x.value;
			Q.value = v(e), je.value = ee(e), Me.value = b(e), He();
		}
		function We() {
			if (Ue.value) Pe = s.subtitleLang, s.setSubtitle(null);
			else {
				let e = Pe && Q.value.some((e) => e.language === Pe) ? Pe : Q.value[0]?.language ?? null;
				s.setSubtitle(e);
			}
			o("captions");
		}
		function Ge(e) {
			te(x.value, e), Me.value = e;
		}
		B(Ie, () => {
			ie(() => $());
		}, { deep: !0 });
		let Ke = null, qe, Je = w(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Ye = !1;
		function Xe() {
			if (!r.autoplay || Ye || Y.value || q.value) return;
			let e = x.value;
			if (!e || !e.paused) return;
			Ye = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, s.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Ze() {
			Xe();
		}
		function Qe() {
			r.prevEpisode && o("play-episode", r.prevEpisode);
		}
		function $e() {
			r.nextEpisode && o("play-episode", r.nextEpisode);
		}
		function et() {
			let e = x.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function tt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function nt() {
			s.play();
		}
		function rt() {
			s.pause();
		}
		function it() {
			let e = x.value;
			e && (s.updateProgress(e.currentTime, e.duration, tt(e)), s.setMediaPositionState());
		}
		function at() {
			let e = x.value;
			e && (e.volume = s.volume, e.muted = s.muted, e.playbackRate = s.rate, X !== null && (e.currentTime = e.duration ? Math.min(e.duration, X) : X, X = null), s.updateProgress(e.currentTime, e.duration, tt(e)), s.setMediaPositionState(), $());
		}
		function ot() {
			let e = x.value;
			e && s.updateProgress(e.currentTime, e.duration, tt(e));
		}
		function st() {
			let e = x.value;
			e && (Math.abs(e.volume - s.volume) > .001 && s.setVolume(e.volume), e.muted !== s.muted && s.toggleMute());
		}
		function ct() {
			let e = x.value;
			e && e.playbackRate !== s.rate && s.setRate(e.playbackRate);
		}
		function lt(e) {
			let t = x.value;
			t && s.duration > 0 && (t.currentTime = Math.min(s.duration, Math.max(0, e)));
		}
		function ut() {
			N.value = !0, wt();
		}
		function dt() {
			N.value = !1, wt();
		}
		function pt(e) {
			let t = y.reduce((e, t, n) => Math.abs(t - s.rate) < Math.abs(y[e] - s.rate) ? n : e, 0), n = y[Math.min(y.length - 1, Math.max(0, t + e))];
			s.setRate(n);
		}
		De({
			playPause: et,
			seekBy: (e) => lt(s.position + e),
			frameStep: (e) => {
				s.playing || lt(s.position + e / 30);
			},
			volumeBy: (e) => s.setVolume(s.volume + e),
			toggleMute: mt,
			toggleFullscreen: gt,
			toggleCaptions: We,
			toggleTheater: ht,
			togglePip: vt,
			seekToPercent: (e) => lt(e * s.duration),
			speedStep: pt,
			toggleHelp: () => {
				R.value = !R.value;
			}
		}, { enabled: () => !R.value && !Ne.value });
		function mt() {
			s.toggleMute();
		}
		function ht() {
			V.value = !V.value, o("theater", V.value);
		}
		B(() => s.muted, (e) => {
			let t = x.value;
			t && t.muted !== e && (t.muted = e);
		}), B(() => s.volume, (e) => {
			let t = x.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), B(() => s.rate, (e) => {
			let t = x.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), B(() => s.lastCommand, (e) => {
			e && (e.type === "seekTo" ? xe(e.value) : e.type === "seekBy" && xe(s.position + e.value));
		});
		function gt() {
			if (typeof document > "u") return;
			let e = ne.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function _t() {
			j.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function vt() {
			let e = x.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function yt() {
			U.value = !0;
		}
		function bt() {
			U.value = !1;
		}
		function xt() {
			qe &&= (clearTimeout(qe), void 0);
		}
		function St() {
			xt(), !(!s.playing || N.value) && (qe = setTimeout(() => {
				s.playing && !N.value && (C.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function wt() {
			C.value = !0, St();
		}
		B(() => s.playing, (e) => {
			e ? (Y.value = !1, ke(), St()) : (xt(), C.value = !0);
		});
		let Tt = null;
		return oe(() => {
			s.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), p.hydrate(r.media), typeof document < "u" && (document.addEventListener("fullscreenchange", _t), ce.value = document.pictureInPictureEnabled === !0), Tt = s.bindMediaSession({
				onPlay: () => void x.value?.play()?.catch(() => {}),
				onPause: () => x.value?.pause(),
				onSeek: (e) => lt(e)
			}), Ke = x.value?.textTracks ?? null, Ke?.addEventListener?.("addtrack", $), Ke?.addEventListener?.("removetrack", $), $(), W.value && he();
		}), B(() => r.media, (e) => {
			s.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), be();
		}), B(() => r.media?.id, () => {
			p.hydrate(r.media);
		}), ae(() => {
			xt(), we(), G.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", _t), Tt?.(), Ke?.removeEventListener?.("addtrack", $), Ke?.removeEventListener?.("removetrack", $);
		}), (n, r) => (P(), D("div", {
			ref_key: "containerRef",
			ref: ne,
			class: M(["player", {
				"is-chrome-hidden": !C.value,
				"is-theater": V.value
			}]),
			onPointermove: wt,
			onPointerdown: wt,
			onFocusin: wt
		}, [A(Ct, {
			video: x.value,
			enabled: z(d).atmosphere,
			playing: z(s).playing,
			"reduced-motion": z(d).effectiveReducedMotion,
			intensity: le.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), O("div", un, [
			O("video", {
				ref_key: "videoRef",
				ref: x,
				class: "player__video",
				src: K.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: nt,
				onPause: rt,
				onTimeupdate: it,
				onLoadedmetadata: at,
				onCanplay: Ze,
				onProgress: ot,
				onVolumechange: st,
				onRatechange: ct,
				onEnded: Ee,
				onError: Ae,
				onEnterpictureinpicture: yt,
				onLeavepictureinpicture: bt,
				onClick: et
			}, [(P(!0), D(S, null, I(Ie.value, (e) => (P(), D("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, fn))), 128))], 40, dn),
			r[9] ||= O("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[10] ||= O("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			O("div", pn, [O("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": z(f)("player.back"),
				onClick: r[0] ||= se((e) => o("back"), ["stop"])
			}, [A(t, { name: "arrow-left" })], 8, mn), O("div", hn, [
				O("p", gn, L(z(f)("player.nowPlaying")), 1),
				O("h2", _n, L(e.media.name), 1),
				O("div", vn, [(P(!0), D(S, null, I(Je.value, (e, t) => (P(), D(S, { key: t }, [t > 0 && !e.cert ? (P(), D("span", yn, "·")) : E("", !0), O("span", { class: M({ player__cert: e.cert }) }, L(e.text), 3)], 64))), 128))])
			])]),
			q.value ? E("", !0) : (P(), D("div", bn, [O("button", {
				type: "button",
				class: M(["player__bigplay", { "is-playing": z(s).playing }]),
				"aria-label": z(s).playing ? z(f)("player.pause") : z(f)("player.play"),
				onClick: se(et, ["stop"])
			}, [A(t, { name: z(s).playing ? "pause" : "play" }, null, 8, ["name"])], 10, xn)])),
			A(Be, {
				video: x.value,
				language: z(s).subtitleLang,
				"style-config": z(d).captionStyle,
				lifted: C.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			q.value ? E("", !0) : (P(), D("div", {
				key: 1,
				class: "player__controls",
				onClick: r[3] ||= se(() => {}, ["stop"])
			}, [A(ue, {
				position: z(s).position,
				duration: z(s).duration,
				buffered: z(s).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: lt,
				onScrubStart: ut,
				onScrubEnd: dt
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), O("div", Sn, [
				e.prevEpisode ? (P(), D("button", {
					key: 0,
					type: "button",
					class: "player__iconbtn",
					"aria-label": z(f)("player.previousEpisode"),
					onClick: Qe
				}, [A(t, { name: "skip-back" })], 8, Cn)) : E("", !0),
				O("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": z(s).playing ? z(f)("player.pause") : z(f)("player.play"),
					onClick: et
				}, [A(t, { name: z(s).playing ? "pause" : "play" }, null, 8, ["name"])], 8, wn),
				e.nextEpisode ? (P(), D("button", {
					key: 1,
					type: "button",
					class: "player__iconbtn",
					"aria-label": z(f)("player.nextEpisode"),
					onClick: $e
				}, [A(t, { name: "skip-forward" })], 8, Tn)) : E("", !0),
				O("span", En, [
					k(L(z(H)(z(s).position)), 1),
					r[7] ||= O("span", { class: "player__sep" }, " / ", -1),
					k(L(z(H)(z(s).duration)), 1)
				]),
				r[8] ||= O("span", { class: "player__grow" }, null, -1),
				O("button", {
					type: "button",
					class: M(["player__iconbtn player__favorite", { "is-on": m.value }]),
					"aria-label": m.value ? "Remove from favorites" : "Add to favorites",
					"aria-pressed": m.value ? "true" : "false",
					onClick: g
				}, [A(t, { name: m.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Dn),
				A(u, {
					level: h.value,
					onCycle: _
				}, null, 8, ["level"]),
				A(Le),
				A(Re),
				A(ze, { qualities: e.qualities }, null, 8, ["qualities"]),
				A(ft, {
					open: Ne.value,
					"onUpdate:open": r[1] ||= (e) => Ne.value = e,
					tracks: Q.value,
					"audio-tracks": je.value,
					"active-audio": Me.value,
					onSelectAudio: Ge
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				O("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": z(f)("player.keyboardShortcuts"),
					"aria-haspopup": "dialog",
					onClick: r[2] ||= (e) => R.value = !0
				}, [A(t, { name: "info" })], 8, On),
				ce.value ? (P(), D("button", {
					key: 2,
					type: "button",
					class: M(["player__iconbtn", { "is-on": U.value }]),
					"aria-label": U.value ? z(f)("player.exitPip") : z(f)("player.pip"),
					"aria-pressed": U.value,
					onClick: vt
				}, [A(t, { name: "pip" })], 10, kn)) : E("", !0),
				O("button", {
					type: "button",
					class: M(["player__iconbtn", { "is-on": V.value }]),
					"aria-label": V.value ? z(f)("player.exitTheater") : z(f)("player.theater"),
					"aria-pressed": V.value,
					onClick: ht
				}, [A(t, { name: "theater" })], 10, An),
				O("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": j.value ? z(f)("player.exitFullscreen") : z(f)("player.fullscreen"),
					onClick: gt
				}, [A(t, { name: j.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, jn)
			])])),
			q.value ? E("", !0) : (P(), T(ln, {
				key: 2,
				position: z(s).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: lt
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Y.value && !q.value ? (P(), T(Ot, {
				key: 3,
				seconds: J.value,
				onResume: Se,
				onRestart: Ce
			}, null, 8, ["seconds"])) : E("", !0),
			Z.value && ye.value && !q.value ? (P(), T(Xt, {
				key: 4,
				media: ye.value,
				remaining: ge.value,
				total: z(8),
				counting: z(d).autoplay,
				onPlayNow: Oe,
				onCancel: ke
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : E("", !0),
			pe.value ? (P(), T(cn, {
				key: 5,
				title: e.media.name,
				progress: z(G).progress.value,
				onBack: r[4] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : E("", !0),
			me.value ? (P(), T(tn, {
				key: 6,
				title: e.media.name,
				onBack: r[5] ||= (e) => o("back")
			}, null, 8, ["title"])) : E("", !0),
			A(Fe, {
				open: R.value,
				onClose: r[6] ||= (e) => R.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-51f06309"]]);
//#endregion
export { Le as A, Z as B, yt as C, Be as D, ft as E, Ee as F, he as G, Y as H, Te as I, de as J, J as K, De as L, Se as M, Ce as N, ze as O, xe as P, ve as R, St as S, vt as T, X as U, me as V, _e as W, H as X, ue as Y, mt as _, Xt as a, xt as b, It as c, Mt as d, Pt as f, Ct as g, Ot as h, tn as i, Fe as j, Re as k, Rt as l, zt as m, ln as n, kt as o, Nt as p, fe as q, cn as r, At as s, Mn as t, Lt as u, ht as v, bt as w, _t as x, pt as y, ge as z };

//# sourceMappingURL=Player-BWhR8Fnb.js.map