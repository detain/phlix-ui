import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./IconButton-C5x9ZDfp.js";
import { t as r } from "./useFocusTrap-0JaLH3tF.js";
import { a as i } from "./usePreferencesStore-BFFMWKZp.js";
import { t as a } from "./useMessages-Dwm0lQlG.js";
import { n as o } from "./Button-BwQkyEkr.js";
import { t as s } from "./tokenStore-CGMYSpg6.js";
import { i as c } from "./usePlayerStore-Cffo63UC.js";
import { t as l } from "./Slider-BMn_Lp_q.js";
import { t as u } from "./Select-DLwgQInL.js";
import { c as d, g as f, h as p, i as m, l as h, m as g, n as _, o as v, p as y, r as b, s as ee, t as x } from "./captions-COgPp5bH.js";
import { Fragment as S, Transition as C, computed as w, createBlock as T, createCommentVNode as E, createElementBlock as D, createElementVNode as O, createTextVNode as k, createVNode as A, defineComponent as j, normalizeClass as M, normalizeStyle as N, onBeforeUnmount as P, onMounted as te, openBlock as F, ref as I, renderList as L, toDisplayString as R, toRef as z, unref as B, watch as V, withCtx as H, withModifiers as U } from "vue";
//#region src/components/player/format-time.ts
function W(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var ne = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], G = { class: "scrubber__track" }, re = ["title"], ie = { class: "scrubber__time numeric" }, ae = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let { t: r } = a(), i = e, o = n, s = I(null), c = I(!1), l = I(!1), u = I(0), d = I(0), f = (e) => Math.min(1, Math.max(0, e)), p = w(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = w(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = w(() => (c.value || l.value) && i.duration > 0), g = w(() => c.value ? u.value : d.value), _ = w(() => g.value * i.duration), v = w(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = w(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = w(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), ee = w(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
		function P(e) {
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
		}), (t, n) => (F(), D("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": B(W)(e.position),
			"aria-label": B(r)("player.seek"),
			onPointerdown: C,
			onPointermove: T,
			onPointerup: k,
			onPointercancel: k,
			onPointerenter: A,
			onPointerleave: j,
			onKeydown: P
		}, [O("div", G, [
			O("div", {
				class: "scrubber__buffered",
				style: N({ transform: `scaleX(${m.value})` })
			}, null, 4),
			O("div", {
				class: "scrubber__played",
				style: N({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(F(!0), D(S, null, L(ee.value, (e, t) => (F(), D("span", {
				key: t,
				class: "scrubber__tick",
				style: N({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, re))), 128)),
			O("div", {
				class: M(["scrubber__head", { "is-dragging": c.value }]),
				style: N({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (F(), D("div", {
			key: 0,
			class: "scrubber__preview",
			style: N({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (F(), D("div", {
			key: 0,
			class: "scrubber__thumb",
			style: N({ backgroundImage: y.value })
		}, null, 4)) : E("", !0), O("span", ie, R(B(W)(_.value)), 1)], 4)) : E("", !0)], 40, ne));
	}
}), [["__scopeId", "data-v-39414106"]]);
//#endregion
//#region src/components/player/hls-playback.ts
function K(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
async function q(e, t, n = {}) {
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
	if (K(e)) {
		let r = () => n.onReady?.(), i = () => n.onError?.("native hls error");
		return e.addEventListener("loadedmetadata", r), e.addEventListener("error", i), e.src = t, { destroy() {
			e.removeEventListener("loadedmetadata", r), e.removeEventListener("error", i), e.removeAttribute("src"), e.load();
		} };
	}
	throw Error("HLS is not supported in this browser");
}
//#endregion
//#region src/components/player/transcode.ts
var J = new Set([
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
function oe(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function se(e, t = "web") {
	return `/api/v1/media/${encodeURIComponent(e)}/transcode?profile=${encodeURIComponent(t)}`;
}
function ce(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function le(e) {
	let t = e ?? {};
	return {
		jobId: Y(t.job_id ?? t.jobId),
		masterUrl: Y(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Y(t.status, "running"),
		reused: X(t.reused)
	};
}
function ue(e) {
	let t = e ?? {};
	return {
		jobId: Y(t.job_id ?? t.jobId),
		status: Y(t.status, "running"),
		playlistReady: X(t.playlist_ready ?? t.playlistReady),
		progress: oe(t.progress),
		masterUrl: Y(t.master_url ?? t.masterUrl)
	};
}
function de(e) {
	return e.playlistReady || e.status === "completed";
}
function fe(e) {
	return J.has(e);
}
function Z(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function pe(e) {
	let t = I("idle"), n = I(0), r = e.attach ?? q, i = e.pollIntervalMs ?? 1e3, a = e.maxWaitMs ?? 12e4, s = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), c = Math.max(1, Math.ceil(a / Math.max(1, i))), l = me(), u = e.getToken ?? (() => he(l)), d = null, f = !1;
	function p() {
		return e.client ?? new o({
			baseUrl: e.apiBase(),
			tokenStore: l ?? void 0
		});
	}
	async function m(a, o, l = "web") {
		h(), f = !1, t.value = "preparing", n.value = 0;
		try {
			let m = p(), h = le(await m.post(se(o, l)));
			if (f) return;
			if (!h.jobId || !h.masterUrl) throw Error("transcode start returned no job");
			let g = Z(e.apiBase(), h.masterUrl), _ = h.status === "completed";
			for (let e = 0; !_ && e < c; e++) {
				let e = ue(await m.get(ce(h.jobId)));
				if (f) return;
				if (n.value = e.progress, fe(e.status)) throw Error(`transcode ${e.status}`);
				if (de(e)) {
					_ = !0;
					break;
				}
				if (await s(i), f) return;
			}
			if (!_) throw Error("transcode timed out");
			if (d = await r(a, g, {
				getToken: u,
				onError: () => {
					f || (t.value = "error");
				}
			}), f) {
				d.destroy(), d = null;
				return;
			}
			t.value = "ready";
		} catch {
			f || (t.value = "error");
		}
	}
	function h() {
		if (f = !0, d) {
			try {
				d.destroy();
			} catch {}
			d = null;
		}
	}
	function g() {
		h(), t.value = "idle", n.value = 0;
	}
	return {
		state: t,
		progress: n,
		start: m,
		cleanup: h,
		reset: g
	};
}
function me() {
	try {
		return new s();
	} catch {
		return null;
	}
}
function he(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/components/player/shortcuts.ts
var ge = [
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
], _e = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, ve = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function ye(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function be(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function xe(e, t) {
	switch (e.key) {
		case " ": return ye(e.target) ? !1 : (t.playPause(), !0);
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
function Se(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || be(n.target) || xe(n, e) && n.preventDefault();
	}
	te(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), P(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Ce = ["aria-label"], we = { class: "shortcuts__head" }, Te = { class: "shortcuts__title" }, Q = { class: "shortcuts__grid" }, Ee = { class: "shortcuts__keys" }, De = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Oe = {
	key: 1,
	class: "shortcuts__key"
}, ke = { class: "shortcuts__label" }, Ae = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => ge }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = I(null);
		return r(l, z(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (F(), D("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= U((e) => s("close"), ["self"])
		}, [O("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": B(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [O("div", we, [O("h3", Te, R(B(c)("player.keyboard")), 1), A(n, {
			name: "x",
			label: B(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), O("ul", Q, [(F(!0), D(S, null, L(e.shortcuts, (e) => (F(), D("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [O("span", Ee, [(F(!0), D(S, null, L(e.keys, (e, n) => (F(), D(S, { key: n }, [e === "–" ? (F(), D("span", De, "–")) : (F(), D("kbd", Oe, [B(_e)[e] ? (F(), T(t, {
			key: 0,
			name: B(_e)[e],
			label: B(ve)[e] ?? e
		}, null, 8, ["name", "label"])) : (F(), D(S, { key: 1 }, [k(R(e), 1)], 64))]))], 64))), 128))]), O("span", ke, R(e.label), 1)]))), 128))])], 8, Ce)])) : E("", !0);
	}
}), [["__scopeId", "data-v-f3720b12"]]), je = { class: "volume" }, Me = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "VolumeControl",
	setup(e) {
		let t = c(), r = i(), { t: o } = a(), s = w(() => t.muted ? 0 : t.volume), u = w(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function d(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return V(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (F(), D("div", je, [A(n, {
			name: u.value,
			label: B(t).muted ? B(o)("player.unmute") : B(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => B(t).toggleMute()
		}, null, 8, ["name", "label"]), A(l, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: B(o)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": d
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-b3fb9c33"]]), Ne = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		return (e, t) => (F(), T(u, {
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
}), [["__scopeId", "data-v-d8e96c28"]]), Pe = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = c(), r = i(), { t: o } = a(), s = w(() => t.qualities.length > 0);
		function l(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => s.value ? (F(), T(u, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": B(n).quality,
			options: e.qualities,
			label: B(o)("player.quality"),
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : E("", !0);
	}
}), [["__scopeId", "data-v-791c32d2"]]), Fe = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = I([]), i = w(() => h(n.styleConfig)), a = null;
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
		return V(() => [n.video, n.language], c, { immediate: !0 }), P(s), t({ lines: r }), (t, n) => r.value.length ? (F(), D("div", {
			key: 0,
			class: M(["player__captions", { "is-lifted": e.lifted }]),
			style: N(i.value)
		}, [(F(!0), D(S, null, L(r.value, (e, t) => (F(), D("p", {
			key: t,
			class: "player__caption-line"
		}, R(e), 1))), 128))], 6)) : E("", !0);
	}
}), [["__scopeId", "data-v-15a0f3c5"]]), Ie = ["aria-label", "aria-expanded"], Le = ["aria-label"], Re = { class: "capmenu__head" }, ze = { class: "capmenu__title" }, Be = ["aria-label"], Ve = ["aria-checked", "tabindex"], He = { class: "capmenu__check" }, Ue = { class: "capmenu__optlabel" }, We = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ge = { class: "capmenu__check" }, Ke = { class: "capmenu__optlabel" }, qe = { class: "capmenu__title capmenu__title--sub" }, Je = ["aria-label"], Ye = [
	"aria-checked",
	"tabindex",
	"onClick"
], $ = { class: "capmenu__check" }, Xe = { class: "capmenu__optlabel" }, Ze = { class: "capmenu__title capmenu__title--sub" }, Qe = { class: "capmenu__style" }, $e = { class: "capmenu__field" }, et = { class: "capmenu__fieldlabel" }, tt = { class: "capmenu__field" }, nt = { class: "capmenu__fieldlabel" }, rt = { class: "capmenu__field" }, it = { class: "capmenu__fieldlabel" }, at = { class: "capmenu__field" }, ot = { class: "capmenu__fieldlabel" }, st = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let s = e, l = o, d = c(), f = i(), { t: p } = a(), h = I(null), g = I(null), v = w(() => d.subtitleLang), y = w(() => s.tracks.some((e) => e.language === v.value)), ee = w(() => y.value ? "captions" : "captions-off"), C = w(() => y.value ? s.tracks.findIndex((e) => e.language === v.value) + 1 : 0), k = w(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function j(e) {
			l("update:open", e);
		}
		function N() {
			j(!1);
		}
		function te(e) {
			d.setSubtitle(e), f.defaultSubtitleLang = e;
		}
		function H(e) {
			l("select-audio", e);
		}
		function U(e, t, n) {
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
		function W(e) {
			let t = U(e, s.tracks.length + 1, C.value);
			t !== null && te(t === 0 ? null : s.tracks[t - 1].language);
		}
		function ne(e) {
			let t = U(e, s.audioTracks.length, k.value);
			t !== null && H(s.audioTracks[t].index);
		}
		function G(e) {
			f.captionStyle = {
				...f.captionStyle,
				size: e
			};
		}
		function re(e) {
			f.captionStyle = {
				...f.captionStyle,
				textColor: String(e)
			};
		}
		function ie(e) {
			f.captionStyle = {
				...f.captionStyle,
				background: e
			};
		}
		function ae(e) {
			f.captionStyle = {
				...f.captionStyle,
				edge: e
			};
		}
		r(g, z(s, "open"), {
			lockScroll: !1,
			onEscape: () => (N(), !0)
		});
		function K(e) {
			h.value && !h.value.contains(e.target) && N();
		}
		return V(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", K, !0) : document.removeEventListener("pointerdown", K, !0));
		}, { immediate: !0 }), P(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", K, !0);
		}), (r, i) => (F(), D("div", {
			ref_key: "rootEl",
			ref: h,
			class: "capmenu"
		}, [O("button", {
			type: "button",
			class: M(["capmenu__btn", { "is-active": y.value }]),
			"aria-label": y.value ? B(p)("player.captionsOn") : B(p)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => j(!e.open)
		}, [A(t, { name: ee.value }, null, 8, ["name"])], 10, Ie), e.open ? (F(), D("div", {
			key: 0,
			ref_key: "panelEl",
			ref: g,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": B(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			O("div", Re, [O("h3", ze, R(B(p)("player.subtitles")), 1), A(n, {
				name: "x",
				label: B(p)("common.close"),
				size: "sm",
				onClick: N
			}, null, 8, ["label"])]),
			O("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": B(p)("player.subtitleTrack"),
				onKeydown: W
			}, [O("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !y.value,
				tabindex: C.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => te(null)
			}, [O("span", He, [y.value ? E("", !0) : (F(), T(t, {
				key: 0,
				name: "check"
			}))]), O("span", Ue, R(B(p)("player.off")), 1)], 8, Ve), (F(!0), D(S, null, L(e.tracks, (e, n) => (F(), D("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": v.value === e.language,
				tabindex: C.value === n + 1 ? 0 : -1,
				onClick: (t) => te(e.language)
			}, [O("span", Ge, [v.value === e.language ? (F(), T(t, {
				key: 0,
				name: "check"
			})) : E("", !0)]), O("span", Ke, R(e.label), 1)], 8, We))), 128))], 40, Be),
			e.audioTracks.length > 1 ? (F(), D(S, { key: 0 }, [O("h3", qe, R(B(p)("player.audio")), 1), O("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": B(p)("player.audioTrack"),
				onKeydown: ne
			}, [(F(!0), D(S, null, L(e.audioTracks, (n) => (F(), D("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: k.value === n.index ? 0 : -1,
				onClick: (e) => H(n.index)
			}, [O("span", $, [e.activeAudio === n.index ? (F(), T(t, {
				key: 0,
				name: "check"
			})) : E("", !0)]), O("span", Xe, R(n.label), 1)], 8, Ye))), 128))], 40, Je)], 64)) : E("", !0),
			O("h3", Ze, R(B(p)("player.captionStyle")), 1),
			O("div", Qe, [
				O("div", $e, [O("span", et, R(B(p)("player.size")), 1), A(u, {
					"model-value": B(f).captionStyle.size,
					options: B(m),
					label: B(p)("player.captionSize"),
					"onUpdate:modelValue": G
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				O("div", tt, [O("span", nt, R(B(p)("player.color")), 1), A(u, {
					"model-value": B(f).captionStyle.textColor,
					options: B(_),
					label: B(p)("player.captionColor"),
					"onUpdate:modelValue": re
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				O("div", rt, [O("span", it, R(B(p)("player.background")), 1), A(u, {
					"model-value": B(f).captionStyle.background,
					options: B(x),
					label: B(p)("player.captionBackground"),
					"onUpdate:modelValue": ie
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				O("div", at, [O("span", ot, R(B(p)("player.edge")), 1), A(u, {
					"model-value": B(f).captionStyle.edge,
					options: B(b),
					label: B(p)("player.captionEdge"),
					"onUpdate:modelValue": ae
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Le)) : E("", !0)], 512));
	}
}), [["__scopeId", "data-v-77df1b62"]]), ct = 32, lt = 18, ut = 250, dt = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function ft(e, t, n, r, i, a, o) {
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
		r: dt(d / m),
		g: dt(f / m),
		b: dt(p / m)
	};
}
function pt(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: ft(e, t, n, 0, 0, r, n),
		right: ft(e, t, n, t - r, 0, t, n),
		center: ft(e, t, n, 0, 0, t, n)
	};
}
function mt({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function ht({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function gt(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${ht(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${ht(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${ht(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function _t(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var vt = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
			r.value = _t(i);
		}
		let o = w(() => n.enabled && !n.reducedMotion && !r.value), s = w(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = I(null), l = null, u = null, d = !1, f = !1;
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
				c.value = gt(pt(n, 32, 18));
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
		V(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			C(), e && t && S();
		}, { immediate: !0 }), te(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), P(() => {
			C(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let T = w(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (F(), D("div", {
			class: M(["player__ambient", { "is-active": o.value }]),
			style: N(o.value ? T.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), yt = ["aria-label"], bt = { class: "resume__label" }, xt = { class: "resume__time numeric" }, St = { class: "resume__actions" }, Ct = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = w(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (F(), D("div", {
			class: "resume",
			role: "region",
			"aria-label": B(i)("player.resumePlayback")
		}, [O("p", bt, [
			k(R(o.value[0]), 1),
			O("span", xt, R(B(W)(e.seconds)), 1),
			k(R(o.value[1]), 1)
		]), O("div", St, [O("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [A(t, { name: "play" }), O("span", null, R(B(i)("player.resume")), 1)]), O("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [A(t, { name: "rewind" }), O("span", null, R(B(i)("player.startOver")), 1)])])], 8, yt));
	}
}), [["__scopeId", "data-v-ef72b644"]]), wt = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Tt = [
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
], Et = new Set(Tt);
function Dt(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Ot(...e) {
	return e.some((e) => Et.has(Dt(e)));
}
function kt(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
var At = 8, jt = 15, Mt = 2 * Math.PI * 15;
function Nt(e, t, n = Mt) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Pt = ["aria-label"], Ft = ["src"], It = { class: "upnext__body" }, Lt = { class: "upnext__eyebrow" }, Rt = { class: "upnext__title" }, zt = {
	key: 0,
	class: "upnext__cd numeric"
}, Bt = { class: "upnext__actions" }, Vt = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Ht = ["r"], Ut = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Wt = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		let { t: r } = a(), i = e, o = n, s = w(() => i.posterUrl ?? i.media.poster_url ?? null), c = w(() => Nt(i.remaining, i.total));
		return (n, i) => (F(), D("aside", {
			class: "upnext",
			role: "region",
			"aria-label": B(r)("player.upNext")
		}, [
			s.value ? (F(), D("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, Ft)) : E("", !0),
			O("div", It, [
				O("p", Lt, R(B(r)("player.upNext")), 1),
				O("h4", Rt, R(e.media.name), 1),
				e.counting ? (F(), D("p", zt, R(B(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : E("", !0),
				O("div", Bt, [O("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => o("play-now")
				}, [A(t, { name: "play" }), O("span", null, R(B(r)("player.playNow")), 1)]), O("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => o("cancel")
				}, R(B(r)("player.cancel")), 1)])
			]),
			e.counting ? (F(), D("svg", Vt, [O("circle", {
				cx: "18",
				cy: "18",
				r: B(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Ht), O("circle", {
				cx: "18",
				cy: "18",
				r: B(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": B(Mt),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Ut)])) : E("", !0)
		], 8, Pt));
	}
}), [["__scopeId", "data-v-c000ec99"]]), Gt = {
	class: "transcode",
	role: "alert"
}, Kt = { class: "transcode__card" }, qt = { class: "transcode__heading" }, Jt = { class: "transcode__body" }, Yt = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (F(), D("div", Gt, [O("div", Kt, [
			A(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			O("h3", qt, R(B(i)("player.transcodeHeading")), 1),
			O("p", Jt, R(e.title ? B(i)("player.transcodeBodyTitled", { title: e.title }) : B(i)("player.transcodeBodyUntitled")), 1),
			O("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [A(t, { name: "arrow-left" }), O("span", null, R(B(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-950c7b9d"]]), Xt = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Zt = { class: "prep__card" }, Qt = { class: "prep__heading" }, $t = { class: "prep__body" }, en = ["aria-valuenow"], tn = /*#__PURE__*/ e(/* @__PURE__ */ j({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (F(), D("div", Xt, [O("div", Zt, [
			A(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			O("h3", Qt, R(B(r)("player.transcodePreparingHeading")), 1),
			O("p", $t, R(e.title ? B(r)("player.transcodePreparingTitled", { title: e.title }) : B(r)("player.transcodePreparingUntitled")), 1),
			O("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [O("div", {
				class: "prep__bar-fill",
				style: N({ width: i() + "%" })
			}, null, 4)], 8, en),
			O("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [A(t, { name: "arrow-left" }), O("span", null, R(B(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-d91acff4"]]), nn = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		return (e, n) => (F(), T(C, { name: "skip" }, {
			default: H(() => [c.value ? (F(), D("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: U(l, ["stop"])
			}, [O("span", null, R(c.value.label), 1), A(t, { name: "skip-forward" })])) : E("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-6156ba5d"]]), rn = { class: "player__stage" }, an = ["src", "poster"], on = { class: "player__meta" }, sn = ["aria-label"], cn = { class: "player__meta-text" }, ln = { class: "player__eyebrow" }, un = { class: "player__title" }, dn = { class: "player__sub numeric" }, fn = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, pn = {
	key: 0,
	class: "player__center"
}, mn = ["aria-label"], hn = { class: "player__btnrow" }, gn = ["aria-label"], _n = ["aria-label"], vn = ["aria-label"], yn = { class: "player__time numeric" }, bn = ["aria-label"], xn = ["aria-label", "aria-pressed"], Sn = ["aria-label", "aria-pressed"], Cn = ["aria-label"], wn = /*#__PURE__*/ e(/* @__PURE__ */ j({
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
		], f = I(null), p = I(null), m = I(!0), h = I(!1), _ = I(!1), b = I(!1), x = I(!1), C = I(!1), j = I(!1), N = w(() => x.value ? 1.35 : 1), z = I(Ot(r.streamUrl, r.media.path)), H = pe({ apiBase: () => r.apiBase ?? "" }), ne = w(() => z.value ? void 0 : r.streamUrl), G = w(() => z.value && H.state.value !== "ready"), re = w(() => z.value && (H.state.value === "preparing" || H.state.value === "idle")), ie = w(() => z.value && H.state.value === "error");
		function K() {
			let e = f.value;
			e && H.start(e, r.media.id);
		}
		let q = I(s.resumePositionFor(r.media.id) ?? 0), J = I(!z.value && q.value > 0), Y = null, X = I(!1), oe = I(8), se, ce = w(() => s.upNext);
		function le() {
			z.value = Ot(r.streamUrl, r.media.path), q.value = s.resumePositionFor(r.media.id) ?? 0, J.value = !z.value && q.value > 0, Y = null, Ie = !1, Z(), X.value = !1, H.reset(), z.value && K();
		}
		function ue(e) {
			let t = f.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Y = Math.max(0, e));
		}
		function de() {
			ue(q.value), J.value = !1, f.value?.play()?.catch(() => {});
		}
		function fe() {
			Y = null, ue(0), s.clearResume(r.media.id), J.value = !1, f.value?.play()?.catch(() => {});
		}
		function Z() {
			se &&= (clearInterval(se), void 0);
		}
		function me() {
			oe.value = 8, Z(), se = setInterval(() => {
				--oe.value, oe.value <= 0 && (Z(), ge());
			}, 1e3);
		}
		function he() {
			s.upNext && (X.value = !0, l.autoplay && me());
		}
		function ge() {
			Z(), X.value = !1;
			let e = s.next(r.streamUrlFor);
			e && o("play-next", e);
		}
		function _e() {
			Z(), X.value = !1;
		}
		function ve() {
			!z.value && kt(f.value) && (z.value = !0, K());
		}
		let ye = I([]), be = I([]), xe = I(-1), Ce = I(!1), we = s.subtitleLang, Te = w(() => ye.value.some((e) => e.language === s.subtitleLang));
		function Q() {
			let e = f.value;
			ye.value = g(e), be.value = y(e), xe.value = v(e);
		}
		function Ee() {
			if (Te.value) we = s.subtitleLang, s.setSubtitle(null);
			else {
				let e = we && ye.value.some((e) => e.language === we) ? we : ye.value[0]?.language ?? null;
				s.setSubtitle(e);
			}
			o("captions");
		}
		function De(e) {
			ee(f.value, e), xe.value = e;
		}
		let Oe = null, ke, je = w(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Ie = !1;
		function Le() {
			if (!r.autoplay || Ie || J.value || G.value) return;
			let e = f.value;
			if (!e || !e.paused) return;
			Ie = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, s.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Re() {
			Le();
		}
		function ze() {
			r.prevEpisode && o("play-episode", r.prevEpisode);
		}
		function Be() {
			r.nextEpisode && o("play-episode", r.nextEpisode);
		}
		function Ve() {
			let e = f.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function He(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Ue() {
			s.play();
		}
		function We() {
			s.pause();
		}
		function Ge() {
			let e = f.value;
			e && (s.updateProgress(e.currentTime, e.duration, He(e)), s.setMediaPositionState());
		}
		function Ke() {
			let e = f.value;
			e && (e.volume = s.volume, e.muted = s.muted, e.playbackRate = s.rate, Y !== null && (e.currentTime = e.duration ? Math.min(e.duration, Y) : Y, Y = null), s.updateProgress(e.currentTime, e.duration, He(e)), s.setMediaPositionState(), Q());
		}
		function qe() {
			let e = f.value;
			e && s.updateProgress(e.currentTime, e.duration, He(e));
		}
		function Je() {
			let e = f.value;
			e && (Math.abs(e.volume - s.volume) > .001 && s.setVolume(e.volume), e.muted !== s.muted && s.toggleMute());
		}
		function Ye() {
			let e = f.value;
			e && e.playbackRate !== s.rate && s.setRate(e.playbackRate);
		}
		function $(e) {
			let t = f.value;
			t && s.duration > 0 && (t.currentTime = Math.min(s.duration, Math.max(0, e)));
		}
		function Xe() {
			_.value = !0, lt();
		}
		function Ze() {
			_.value = !1, lt();
		}
		function Qe(e) {
			let t = d.reduce((e, t, n) => Math.abs(t - s.rate) < Math.abs(d[e] - s.rate) ? n : e, 0), n = d[Math.min(d.length - 1, Math.max(0, t + e))];
			s.setRate(n);
		}
		Se({
			playPause: Ve,
			seekBy: (e) => $(s.position + e),
			frameStep: (e) => {
				s.playing || $(s.position + e / 30);
			},
			volumeBy: (e) => s.setVolume(s.volume + e),
			toggleMute: $e,
			toggleFullscreen: tt,
			toggleCaptions: Ee,
			toggleTheater: et,
			togglePip: rt,
			seekToPercent: (e) => $(e * s.duration),
			speedStep: Qe,
			toggleHelp: () => {
				b.value = !b.value;
			}
		}, { enabled: () => !b.value && !Ce.value });
		function $e() {
			s.toggleMute();
		}
		function et() {
			x.value = !x.value, o("theater", x.value);
		}
		V(() => s.muted, (e) => {
			let t = f.value;
			t && t.muted !== e && (t.muted = e);
		}), V(() => s.volume, (e) => {
			let t = f.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), V(() => s.rate, (e) => {
			let t = f.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function tt() {
			if (typeof document > "u") return;
			let e = p.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function nt() {
			h.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function rt() {
			let e = f.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function it() {
			C.value = !0;
		}
		function at() {
			C.value = !1;
		}
		function ot() {
			ke &&= (clearTimeout(ke), void 0);
		}
		function ct() {
			ot(), !(!s.playing || _.value) && (ke = setTimeout(() => {
				s.playing && !_.value && (m.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function lt() {
			m.value = !0, ct();
		}
		V(() => s.playing, (e) => {
			e ? (J.value = !1, _e(), ct()) : (ot(), m.value = !0);
		});
		let ut = null;
		return te(() => {
			s.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), typeof document < "u" && (document.addEventListener("fullscreenchange", nt), j.value = document.pictureInPictureEnabled === !0), ut = s.bindMediaSession({
				onPlay: () => void f.value?.play()?.catch(() => {}),
				onPause: () => f.value?.pause(),
				onSeek: (e) => $(e)
			}), Oe = f.value?.textTracks ?? null, Oe?.addEventListener?.("addtrack", Q), Oe?.addEventListener?.("removetrack", Q), Q(), z.value && K();
		}), V(() => r.media, (e) => {
			s.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), le();
		}), P(() => {
			ot(), Z(), H.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", nt), ut?.(), Oe?.removeEventListener?.("addtrack", Q), Oe?.removeEventListener?.("removetrack", Q);
		}), (n, r) => (F(), D("div", {
			ref_key: "containerRef",
			ref: p,
			class: M(["player", {
				"is-chrome-hidden": !m.value,
				"is-theater": x.value
			}]),
			onPointermove: lt,
			onPointerdown: lt,
			onFocusin: lt
		}, [A(vt, {
			video: f.value,
			enabled: B(l).atmosphere,
			playing: B(s).playing,
			"reduced-motion": B(l).effectiveReducedMotion,
			intensity: N.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), O("div", rn, [
			O("video", {
				ref_key: "videoRef",
				ref: f,
				class: "player__video",
				src: ne.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Ue,
				onPause: We,
				onTimeupdate: Ge,
				onLoadedmetadata: Ke,
				onCanplay: Re,
				onProgress: qe,
				onVolumechange: Je,
				onRatechange: Ye,
				onEnded: he,
				onError: ve,
				onEnterpictureinpicture: it,
				onLeavepictureinpicture: at,
				onClick: Ve
			}, null, 40, an),
			r[9] ||= O("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[10] ||= O("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			O("div", on, [O("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": B(u)("player.back"),
				onClick: r[0] ||= U((e) => o("back"), ["stop"])
			}, [A(t, { name: "arrow-left" })], 8, sn), O("div", cn, [
				O("p", ln, R(B(u)("player.nowPlaying")), 1),
				O("h2", un, R(e.media.name), 1),
				O("div", dn, [(F(!0), D(S, null, L(je.value, (e, t) => (F(), D(S, { key: t }, [t > 0 && !e.cert ? (F(), D("span", fn, "·")) : E("", !0), O("span", { class: M({ player__cert: e.cert }) }, R(e.text), 3)], 64))), 128))])
			])]),
			G.value ? E("", !0) : (F(), D("div", pn, [O("button", {
				type: "button",
				class: M(["player__bigplay", { "is-playing": B(s).playing }]),
				"aria-label": B(s).playing ? B(u)("player.pause") : B(u)("player.play"),
				onClick: U(Ve, ["stop"])
			}, [A(t, { name: B(s).playing ? "pause" : "play" }, null, 8, ["name"])], 10, mn)])),
			A(Fe, {
				video: f.value,
				language: B(s).subtitleLang,
				"style-config": B(l).captionStyle,
				lifted: m.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			G.value ? E("", !0) : (F(), D("div", {
				key: 1,
				class: "player__controls",
				onClick: r[3] ||= U(() => {}, ["stop"])
			}, [A(ae, {
				position: B(s).position,
				duration: B(s).duration,
				buffered: B(s).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: $,
				onScrubStart: Xe,
				onScrubEnd: Ze
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), O("div", hn, [
				e.prevEpisode ? (F(), D("button", {
					key: 0,
					type: "button",
					class: "player__iconbtn",
					"aria-label": B(u)("player.previousEpisode"),
					onClick: ze
				}, [A(t, { name: "skip-back" })], 8, gn)) : E("", !0),
				O("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": B(s).playing ? B(u)("player.pause") : B(u)("player.play"),
					onClick: Ve
				}, [A(t, { name: B(s).playing ? "pause" : "play" }, null, 8, ["name"])], 8, _n),
				e.nextEpisode ? (F(), D("button", {
					key: 1,
					type: "button",
					class: "player__iconbtn",
					"aria-label": B(u)("player.nextEpisode"),
					onClick: Be
				}, [A(t, { name: "skip-forward" })], 8, vn)) : E("", !0),
				O("span", yn, [
					k(R(B(W)(B(s).position)), 1),
					r[7] ||= O("span", { class: "player__sep" }, " / ", -1),
					k(R(B(W)(B(s).duration)), 1)
				]),
				r[8] ||= O("span", { class: "player__grow" }, null, -1),
				A(Me),
				A(Ne),
				A(Pe, { qualities: e.qualities }, null, 8, ["qualities"]),
				A(st, {
					open: Ce.value,
					"onUpdate:open": r[1] ||= (e) => Ce.value = e,
					tracks: ye.value,
					"audio-tracks": be.value,
					"active-audio": xe.value,
					onSelectAudio: De
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				O("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": B(u)("player.keyboardShortcuts"),
					"aria-haspopup": "dialog",
					onClick: r[2] ||= (e) => b.value = !0
				}, [A(t, { name: "info" })], 8, bn),
				j.value ? (F(), D("button", {
					key: 2,
					type: "button",
					class: M(["player__iconbtn", { "is-on": C.value }]),
					"aria-label": C.value ? B(u)("player.exitPip") : B(u)("player.pip"),
					"aria-pressed": C.value,
					onClick: rt
				}, [A(t, { name: "pip" })], 10, xn)) : E("", !0),
				O("button", {
					type: "button",
					class: M(["player__iconbtn", { "is-on": x.value }]),
					"aria-label": x.value ? B(u)("player.exitTheater") : B(u)("player.theater"),
					"aria-pressed": x.value,
					onClick: et
				}, [A(t, { name: "theater" })], 10, Sn),
				O("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": h.value ? B(u)("player.exitFullscreen") : B(u)("player.fullscreen"),
					onClick: tt
				}, [A(t, { name: h.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Cn)
			])])),
			G.value ? E("", !0) : (F(), T(nn, {
				key: 2,
				position: B(s).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			J.value && !G.value ? (F(), T(Ct, {
				key: 3,
				seconds: q.value,
				onResume: de,
				onRestart: fe
			}, null, 8, ["seconds"])) : E("", !0),
			X.value && ce.value && !G.value ? (F(), T(Wt, {
				key: 4,
				media: ce.value,
				remaining: oe.value,
				total: B(8),
				counting: B(l).autoplay,
				onPlayNow: ge,
				onCancel: _e
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : E("", !0),
			re.value ? (F(), T(tn, {
				key: 5,
				title: e.media.name,
				progress: B(H).progress.value,
				onBack: r[4] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : E("", !0),
			ie.value ? (F(), T(Yt, {
				key: 6,
				title: e.media.name,
				onBack: r[5] ||= (e) => o("back")
			}, null, 8, ["title"])) : E("", !0),
			A(Ae, {
				open: b.value,
				onClose: r[6] ||= (e) => b.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-818e0136"]]);
//#endregion
export { Me as A, de as B, mt as C, Fe as D, st as E, xe as F, ce as G, ue as H, be as I, ae as J, q as K, Se as L, _e as M, ve as N, Pe as O, ge as P, pe as R, _t as S, pt as T, Z as U, le as V, se as W, W as Y, lt as _, Wt as a, gt as b, At as c, Dt as d, kt as f, vt as g, Ct as h, Yt as i, Ae as j, Ne as k, Mt as l, Nt as m, nn as n, wt as o, Ot as p, K as q, tn as r, Tt as s, wn as t, jt as u, ut as v, ht as w, ft as x, ct as y, fe as z };

//# sourceMappingURL=Player-DzfjYQlb.js.map