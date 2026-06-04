import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./IconButton-C5x9ZDfp.js";
import { t as r } from "./useFocusTrap-0JaLH3tF.js";
import { a as i } from "./usePreferencesStore-BFFMWKZp.js";
import { t as a } from "./useMessages-D7StdIzu.js";
import { o } from "./media-query-D1H7YKGl.js";
import { t as s } from "./Slider-BMn_Lp_q.js";
import { t as c } from "./Select-DfIQHE9A.js";
import { c as l, g as u, h as d, i as f, l as p, m, n as h, o as g, p as _, r as v, s as y, t as b } from "./captions-COgPp5bH.js";
import { Fragment as x, Transition as S, computed as C, createBlock as w, createCommentVNode as T, createElementBlock as E, createElementVNode as D, createTextVNode as O, createVNode as k, defineComponent as A, normalizeClass as j, normalizeStyle as M, onBeforeUnmount as N, onMounted as P, openBlock as F, ref as I, renderList as L, toDisplayString as R, toRef as ee, unref as z, watch as B, withCtx as te, withModifiers as V } from "vue";
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
], W = { class: "scrubber__track" }, G = ["title"], K = { class: "scrubber__time numeric" }, ne = /*#__PURE__*/ e(/* @__PURE__ */ A({
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
		let { t: r } = a(), i = e, o = n, s = I(null), c = I(!1), l = I(!1), u = I(0), d = I(0), f = (e) => Math.min(1, Math.max(0, e)), p = C(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = C(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = C(() => (c.value || l.value) && i.duration > 0), g = C(() => c.value ? u.value : d.value), _ = C(() => g.value * i.duration), v = C(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = C(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = C(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), S = C(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function w(e) {
			let t = s.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : f((e.clientX - n.left) / n.width);
		}
		function O(e) {
			if (i.duration <= 0) return;
			c.value = !0;
			try {
				s.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = w(e);
			u.value = t, o("scrub-start"), o("seek", t * i.duration), e.preventDefault();
		}
		function k(e) {
			let t = w(e);
			d.value = t, c.value && (u.value = t, o("seek", t * i.duration));
		}
		function A(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				o("scrub-end");
			}
		}
		function N() {
			l.value = !0;
		}
		function P() {
			l.value = !1;
		}
		function ee(e) {
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
		}), (t, n) => (F(), E("div", {
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
			onPointerdown: O,
			onPointermove: k,
			onPointerup: A,
			onPointercancel: A,
			onPointerenter: N,
			onPointerleave: P,
			onKeydown: ee
		}, [D("div", W, [
			D("div", {
				class: "scrubber__buffered",
				style: M({ transform: `scaleX(${m.value})` })
			}, null, 4),
			D("div", {
				class: "scrubber__played",
				style: M({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(F(!0), E(x, null, L(S.value, (e, t) => (F(), E("span", {
				key: t,
				class: "scrubber__tick",
				style: M({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, G))), 128)),
			D("div", {
				class: j(["scrubber__head", { "is-dragging": c.value }]),
				style: M({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (F(), E("div", {
			key: 0,
			class: "scrubber__preview",
			style: M({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (F(), E("div", {
			key: 0,
			class: "scrubber__thumb",
			style: M({ backgroundImage: y.value })
		}, null, 4)) : T("", !0), D("span", K, R(z(H)(_.value)), 1)], 4)) : T("", !0)], 40, U));
	}
}), [["__scopeId", "data-v-39414106"]]), q = [
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
], J = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Y = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function re(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function ie(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function ae(e, t) {
	switch (e.key) {
		case " ": return re(e.target) ? !1 : (t.playPause(), !0);
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
function oe(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || ie(n.target) || ae(n, e) && n.preventDefault();
	}
	P(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), N(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var se = ["aria-label"], ce = { class: "shortcuts__head" }, X = { class: "shortcuts__title" }, le = { class: "shortcuts__grid" }, ue = { class: "shortcuts__keys" }, de = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, fe = {
	key: 1,
	class: "shortcuts__key"
}, pe = { class: "shortcuts__label" }, me = /*#__PURE__*/ e(/* @__PURE__ */ A({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => q }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = I(null);
		return r(l, ee(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (F(), E("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= V((e) => s("close"), ["self"])
		}, [D("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": z(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [D("div", ce, [D("h3", X, R(z(c)("player.keyboard")), 1), k(n, {
			name: "x",
			label: z(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), D("ul", le, [(F(!0), E(x, null, L(e.shortcuts, (e) => (F(), E("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [D("span", ue, [(F(!0), E(x, null, L(e.keys, (e, n) => (F(), E(x, { key: n }, [e === "–" ? (F(), E("span", de, "–")) : (F(), E("kbd", fe, [z(J)[e] ? (F(), w(t, {
			key: 0,
			name: z(J)[e],
			label: z(Y)[e] ?? e
		}, null, 8, ["name", "label"])) : (F(), E(x, { key: 1 }, [O(R(e), 1)], 64))]))], 64))), 128))]), D("span", pe, R(e.label), 1)]))), 128))])], 8, se)])) : T("", !0);
	}
}), [["__scopeId", "data-v-f3720b12"]]), he = { class: "volume" }, ge = /*#__PURE__*/ e(/* @__PURE__ */ A({
	__name: "VolumeControl",
	setup(e) {
		let t = o(), r = i(), { t: c } = a(), l = C(() => t.muted ? 0 : t.volume), u = C(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function d(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return B(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (F(), E("div", he, [k(n, {
			name: u.value,
			label: z(t).muted ? z(c)("player.unmute") : z(c)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => z(t).toggleMute()
		}, null, 8, ["name", "label"]), k(s, {
			class: "volume__slider",
			"model-value": l.value,
			min: 0,
			max: 1,
			step: .05,
			label: z(c)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": d
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-b3fb9c33"]]), _e = /*#__PURE__*/ e(/* @__PURE__ */ A({
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
		], n = o(), { t: r } = a(), i = C(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function s(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (F(), w(c, {
			class: "speed-menu",
			"model-value": z(n).rate,
			options: i.value,
			label: z(r)("player.playbackSpeed"),
			"onUpdate:modelValue": s
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-5b5c018e"]]), ve = /*#__PURE__*/ e(/* @__PURE__ */ A({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = o(), r = i(), { t: s } = a(), l = C(() => t.qualities.length > 0);
		function u(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => l.value ? (F(), w(c, {
			key: 0,
			class: "quality-menu",
			"model-value": z(n).quality,
			options: e.qualities,
			label: z(s)("player.quality"),
			"onUpdate:modelValue": u
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : T("", !0);
	}
}), [["__scopeId", "data-v-4de62ece"]]), ye = /*#__PURE__*/ e(/* @__PURE__ */ A({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = I([]), i = C(() => p(n.styleConfig)), a = null;
		function o() {
			r.value = d(a);
		}
		function s() {
			a?.removeEventListener("cuechange", o), a = null;
		}
		function c() {
			s(), l(n.video, n.language);
			let e = u(n.video, n.language);
			e ? (a = e, e.addEventListener("cuechange", o), r.value = d(e)) : r.value = [];
		}
		return B(() => [n.video, n.language], c, { immediate: !0 }), N(s), t({ lines: r }), (t, n) => r.value.length ? (F(), E("div", {
			key: 0,
			class: j(["player__captions", { "is-lifted": e.lifted }]),
			style: M(i.value)
		}, [(F(!0), E(x, null, L(r.value, (e, t) => (F(), E("p", {
			key: t,
			class: "player__caption-line"
		}, R(e), 1))), 128))], 6)) : T("", !0);
	}
}), [["__scopeId", "data-v-15a0f3c5"]]), be = ["aria-label", "aria-expanded"], xe = ["aria-label"], Se = { class: "capmenu__head" }, Ce = { class: "capmenu__title" }, we = ["aria-label"], Z = ["aria-checked", "tabindex"], Te = { class: "capmenu__check" }, Ee = { class: "capmenu__optlabel" }, De = [
	"aria-checked",
	"tabindex",
	"onClick"
], Oe = { class: "capmenu__check" }, ke = { class: "capmenu__optlabel" }, Ae = { class: "capmenu__title capmenu__title--sub" }, je = ["aria-label"], Me = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ne = { class: "capmenu__check" }, Pe = { class: "capmenu__optlabel" }, Fe = { class: "capmenu__title capmenu__title--sub" }, Ie = { class: "capmenu__style" }, Le = { class: "capmenu__field" }, Re = { class: "capmenu__fieldlabel" }, Q = { class: "capmenu__field" }, ze = { class: "capmenu__fieldlabel" }, Be = { class: "capmenu__field" }, Ve = { class: "capmenu__fieldlabel" }, He = { class: "capmenu__field" }, Ue = { class: "capmenu__fieldlabel" }, We = /*#__PURE__*/ e(/* @__PURE__ */ A({
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
	setup(e, { emit: s }) {
		let l = e, u = s, d = o(), p = i(), { t: m } = a(), g = I(null), _ = I(null), y = C(() => d.subtitleLang), S = C(() => l.tracks.some((e) => e.language === y.value)), O = C(() => S.value ? "captions" : "captions-off"), A = C(() => S.value ? l.tracks.findIndex((e) => e.language === y.value) + 1 : 0), M = C(() => l.activeAudio >= 0 ? l.activeAudio : 0);
		function P(e) {
			u("update:open", e);
		}
		function te() {
			P(!1);
		}
		function V(e) {
			d.setSubtitle(e), p.defaultSubtitleLang = e;
		}
		function H(e) {
			u("select-audio", e);
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
			let t = U(e, l.tracks.length + 1, A.value);
			t !== null && V(t === 0 ? null : l.tracks[t - 1].language);
		}
		function G(e) {
			let t = U(e, l.audioTracks.length, M.value);
			t !== null && H(l.audioTracks[t].index);
		}
		function K(e) {
			p.captionStyle = {
				...p.captionStyle,
				size: e
			};
		}
		function ne(e) {
			p.captionStyle = {
				...p.captionStyle,
				textColor: String(e)
			};
		}
		function q(e) {
			p.captionStyle = {
				...p.captionStyle,
				background: e
			};
		}
		function J(e) {
			p.captionStyle = {
				...p.captionStyle,
				edge: e
			};
		}
		r(_, ee(l, "open"), {
			lockScroll: !1,
			onEscape: () => (te(), !0)
		});
		function Y(e) {
			g.value && !g.value.contains(e.target) && te();
		}
		return B(() => l.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", Y, !0) : document.removeEventListener("pointerdown", Y, !0));
		}, { immediate: !0 }), N(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", Y, !0);
		}), (r, i) => (F(), E("div", {
			ref_key: "rootEl",
			ref: g,
			class: "capmenu"
		}, [D("button", {
			type: "button",
			class: j(["capmenu__btn", { "is-active": S.value }]),
			"aria-label": S.value ? z(m)("player.captionsOn") : z(m)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => P(!e.open)
		}, [k(t, { name: O.value }, null, 8, ["name"])], 10, be), e.open ? (F(), E("div", {
			key: 0,
			ref_key: "panelEl",
			ref: _,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": z(m)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			D("div", Se, [D("h3", Ce, R(z(m)("player.subtitles")), 1), k(n, {
				name: "x",
				label: z(m)("common.close"),
				size: "sm",
				onClick: te
			}, null, 8, ["label"])]),
			D("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": z(m)("player.subtitleTrack"),
				onKeydown: W
			}, [D("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !S.value,
				tabindex: A.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => V(null)
			}, [D("span", Te, [S.value ? T("", !0) : (F(), w(t, {
				key: 0,
				name: "check"
			}))]), D("span", Ee, R(z(m)("player.off")), 1)], 8, Z), (F(!0), E(x, null, L(e.tracks, (e, n) => (F(), E("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": y.value === e.language,
				tabindex: A.value === n + 1 ? 0 : -1,
				onClick: (t) => V(e.language)
			}, [D("span", Oe, [y.value === e.language ? (F(), w(t, {
				key: 0,
				name: "check"
			})) : T("", !0)]), D("span", ke, R(e.label), 1)], 8, De))), 128))], 40, we),
			e.audioTracks.length > 1 ? (F(), E(x, { key: 0 }, [D("h3", Ae, R(z(m)("player.audio")), 1), D("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": z(m)("player.audioTrack"),
				onKeydown: G
			}, [(F(!0), E(x, null, L(e.audioTracks, (n) => (F(), E("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: M.value === n.index ? 0 : -1,
				onClick: (e) => H(n.index)
			}, [D("span", Ne, [e.activeAudio === n.index ? (F(), w(t, {
				key: 0,
				name: "check"
			})) : T("", !0)]), D("span", Pe, R(n.label), 1)], 8, Me))), 128))], 40, je)], 64)) : T("", !0),
			D("h3", Fe, R(z(m)("player.captionStyle")), 1),
			D("div", Ie, [
				D("div", Le, [D("span", Re, R(z(m)("player.size")), 1), k(c, {
					"model-value": z(p).captionStyle.size,
					options: z(f),
					label: z(m)("player.captionSize"),
					"onUpdate:modelValue": K
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				D("div", Q, [D("span", ze, R(z(m)("player.color")), 1), k(c, {
					"model-value": z(p).captionStyle.textColor,
					options: z(h),
					label: z(m)("player.captionColor"),
					"onUpdate:modelValue": ne
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				D("div", Be, [D("span", Ve, R(z(m)("player.background")), 1), k(c, {
					"model-value": z(p).captionStyle.background,
					options: z(b),
					label: z(m)("player.captionBackground"),
					"onUpdate:modelValue": q
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				D("div", He, [D("span", Ue, R(z(m)("player.edge")), 1), k(c, {
					"model-value": z(p).captionStyle.edge,
					options: z(v),
					label: z(m)("player.captionEdge"),
					"onUpdate:modelValue": J
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, xe)) : T("", !0)], 512));
	}
}), [["__scopeId", "data-v-77df1b62"]]), Ge = 32, Ke = 18, qe = 250, Je = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Ye(e, t, n, r, i, a, o) {
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
		r: Je(d / m),
		g: Je(f / m),
		b: Je(p / m)
	};
}
function Xe(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Ye(e, t, n, 0, 0, r, n),
		right: Ye(e, t, n, t - r, 0, t, n),
		center: Ye(e, t, n, 0, 0, t, n)
	};
}
function Ze({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function $({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Qe(e, t = 1) {
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
function $e(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var et = /*#__PURE__*/ e(/* @__PURE__ */ A({
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
			r.value = $e(i);
		}
		let o = C(() => n.enabled && !n.reducedMotion && !r.value), s = C(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = I(null), l = null, u = null, d = !1, f = !1;
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
				c.value = Qe(Xe(n, 32, 18));
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
		function w() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			if (h(e)) {
				b = !0, y = 0, x(e);
				return;
			}
			m(), !f && (b = !0, v = setInterval(m, 250));
		}
		function T() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		B(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			T(), e && t && w();
		}, { immediate: !0 }), P(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), N(() => {
			T(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let D = C(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (F(), E("div", {
			class: j(["player__ambient", { "is-active": o.value }]),
			style: M(o.value ? D.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), tt = ["aria-label"], nt = { class: "resume__label" }, rt = { class: "resume__time numeric" }, it = { class: "resume__actions" }, at = /*#__PURE__*/ e(/* @__PURE__ */ A({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = C(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (F(), E("div", {
			class: "resume",
			role: "region",
			"aria-label": z(i)("player.resumePlayback")
		}, [D("p", nt, [
			O(R(o.value[0]), 1),
			D("span", rt, R(z(H)(e.seconds)), 1),
			O(R(o.value[1]), 1)
		]), D("div", it, [D("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [k(t, { name: "play" }), D("span", null, R(z(i)("player.resume")), 1)]), D("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [k(t, { name: "rewind" }), D("span", null, R(z(i)("player.startOver")), 1)])])], 8, tt));
	}
}), [["__scopeId", "data-v-ef72b644"]]), ot = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], st = [
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
], ct = new Set(st);
function lt(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function ut(...e) {
	return e.some((e) => ct.has(lt(e)));
}
function dt(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
var ft = 8, pt = 15, mt = 2 * Math.PI * 15;
function ht(e, t, n = mt) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var gt = ["aria-label"], _t = ["src"], vt = { class: "upnext__body" }, yt = { class: "upnext__eyebrow" }, bt = { class: "upnext__title" }, xt = {
	key: 0,
	class: "upnext__cd numeric"
}, St = { class: "upnext__actions" }, Ct = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, wt = ["r"], Tt = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Et = /*#__PURE__*/ e(/* @__PURE__ */ A({
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
		let { t: r } = a(), i = e, o = n, s = C(() => i.posterUrl ?? i.media.poster_url ?? null), c = C(() => ht(i.remaining, i.total));
		return (n, i) => (F(), E("aside", {
			class: "upnext",
			role: "region",
			"aria-label": z(r)("player.upNext")
		}, [
			s.value ? (F(), E("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, _t)) : T("", !0),
			D("div", vt, [
				D("p", yt, R(z(r)("player.upNext")), 1),
				D("h4", bt, R(e.media.name), 1),
				e.counting ? (F(), E("p", xt, R(z(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : T("", !0),
				D("div", St, [D("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => o("play-now")
				}, [k(t, { name: "play" }), D("span", null, R(z(r)("player.playNow")), 1)]), D("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => o("cancel")
				}, R(z(r)("player.cancel")), 1)])
			]),
			e.counting ? (F(), E("svg", Ct, [D("circle", {
				cx: "18",
				cy: "18",
				r: z(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, wt), D("circle", {
				cx: "18",
				cy: "18",
				r: z(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": z(mt),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Tt)])) : T("", !0)
		], 8, gt));
	}
}), [["__scopeId", "data-v-c000ec99"]]), Dt = {
	class: "transcode",
	role: "alert"
}, Ot = { class: "transcode__card" }, kt = { class: "transcode__heading" }, At = { class: "transcode__body" }, jt = /*#__PURE__*/ e(/* @__PURE__ */ A({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (F(), E("div", Dt, [D("div", Ot, [
			k(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			D("h3", kt, R(z(i)("player.transcodeHeading")), 1),
			D("p", At, R(e.title ? z(i)("player.transcodeBodyTitled", { title: e.title }) : z(i)("player.transcodeBodyUntitled")), 1),
			D("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [k(t, { name: "arrow-left" }), D("span", null, R(z(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-950c7b9d"]]), Mt = /*#__PURE__*/ e(/* @__PURE__ */ A({
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
		let c = C(() => s(r.position, r.introMarker) ? {
			label: o("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: o("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (F(), w(S, { name: "skip" }, {
			default: te(() => [c.value ? (F(), E("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: V(l, ["stop"])
			}, [D("span", null, R(c.value.label), 1), k(t, { name: "skip-forward" })])) : T("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-6156ba5d"]]), Nt = { class: "player__stage" }, Pt = ["src", "poster"], Ft = { class: "player__meta" }, It = ["aria-label"], Lt = { class: "player__meta-text" }, Rt = { class: "player__eyebrow" }, zt = { class: "player__title" }, Bt = { class: "player__sub numeric" }, Vt = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Ht = {
	key: 0,
	class: "player__center"
}, Ut = ["aria-label"], Wt = { class: "player__btnrow" }, Gt = ["aria-label"], Kt = { class: "player__time numeric" }, qt = ["aria-label"], Jt = ["aria-label", "aria-pressed"], Yt = ["aria-label", "aria-pressed"], Xt = ["aria-label"], Zt = /*#__PURE__*/ e(/* @__PURE__ */ A({
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
		streamUrlFor: { type: Function }
	},
	emits: [
		"back",
		"captions",
		"theater",
		"pip",
		"play-next"
	],
	setup(e, { emit: n }) {
		let r = e, s = n, c = o(), l = i(), { t: u } = a(), d = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], f = I(null), p = I(null), h = I(!0), v = I(!1), b = I(!1), S = I(!1), A = I(!1), M = I(!1), ee = I(!1), te = C(() => A.value ? 1.35 : 1), U = I(ut(r.streamUrl, r.media.path)), W = I(c.resumePositionFor(r.media.id) ?? 0), G = I(!U.value && W.value > 0), K = null, q = I(!1), J = I(8), Y, re = C(() => c.upNext);
		function ie() {
			U.value = ut(r.streamUrl, r.media.path), W.value = c.resumePositionFor(r.media.id) ?? 0, G.value = !U.value && W.value > 0, K = null, X(), q.value = !1;
		}
		function ae(e) {
			let t = f.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : K = Math.max(0, e));
		}
		function se() {
			ae(W.value), G.value = !1, f.value?.play()?.catch(() => {});
		}
		function ce() {
			K = null, ae(0), c.clearResume(r.media.id), G.value = !1, f.value?.play()?.catch(() => {});
		}
		function X() {
			Y &&= (clearInterval(Y), void 0);
		}
		function le() {
			J.value = 8, X(), Y = setInterval(() => {
				--J.value, J.value <= 0 && (X(), de());
			}, 1e3);
		}
		function ue() {
			c.upNext && (q.value = !0, l.autoplay && le());
		}
		function de() {
			X(), q.value = !1;
			let e = c.next(r.streamUrlFor);
			e && s("play-next", e);
		}
		function fe() {
			X(), q.value = !1;
		}
		function pe() {
			dt(f.value) && (U.value = !0);
		}
		let he = I([]), be = I([]), xe = I(-1), Se = I(!1), Ce = c.subtitleLang, we = C(() => he.value.some((e) => e.language === c.subtitleLang));
		function Z() {
			let e = f.value;
			he.value = m(e), be.value = _(e), xe.value = g(e);
		}
		function Te() {
			if (we.value) Ce = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = Ce && he.value.some((e) => e.language === Ce) ? Ce : he.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			s("captions");
		}
		function Ee(e) {
			y(f.value, e), xe.value = e;
		}
		let De = null, Oe, ke = C(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		});
		function Ae() {
			let e = f.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function je(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Me() {
			c.play();
		}
		function Ne() {
			c.pause();
		}
		function Pe() {
			let e = f.value;
			e && (c.updateProgress(e.currentTime, e.duration, je(e)), c.setMediaPositionState());
		}
		function Fe() {
			let e = f.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, K !== null && (e.currentTime = e.duration ? Math.min(e.duration, K) : K, K = null), c.updateProgress(e.currentTime, e.duration, je(e)), c.setMediaPositionState(), Z());
		}
		function Ie() {
			let e = f.value;
			e && c.updateProgress(e.currentTime, e.duration, je(e));
		}
		function Le() {
			let e = f.value;
			e && (Math.abs(e.volume - c.volume) > .001 && c.setVolume(e.volume), e.muted !== c.muted && c.toggleMute());
		}
		function Re() {
			let e = f.value;
			e && e.playbackRate !== c.rate && c.setRate(e.playbackRate);
		}
		function Q(e) {
			let t = f.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function ze() {
			b.value = !0, $();
		}
		function Be() {
			b.value = !1, $();
		}
		function Ve(e) {
			let t = d.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(d[e] - c.rate) ? n : e, 0), n = d[Math.min(d.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		oe({
			playPause: Ae,
			seekBy: (e) => Q(c.position + e),
			frameStep: (e) => {
				c.playing || Q(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: He,
			toggleFullscreen: Ge,
			toggleCaptions: Te,
			toggleTheater: Ue,
			togglePip: qe,
			seekToPercent: (e) => Q(e * c.duration),
			speedStep: Ve,
			toggleHelp: () => {
				S.value = !S.value;
			}
		}, { enabled: () => !S.value && !Se.value });
		function He() {
			c.toggleMute();
		}
		function Ue() {
			A.value = !A.value, s("theater", A.value);
		}
		B(() => c.muted, (e) => {
			let t = f.value;
			t && t.muted !== e && (t.muted = e);
		}), B(() => c.volume, (e) => {
			let t = f.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), B(() => c.rate, (e) => {
			let t = f.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function Ge() {
			if (typeof document > "u") return;
			let e = p.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function Ke() {
			v.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function qe() {
			let e = f.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function Je() {
			M.value = !0;
		}
		function Ye() {
			M.value = !1;
		}
		function Xe() {
			Oe &&= (clearTimeout(Oe), void 0);
		}
		function Ze() {
			Xe(), !(!c.playing || b.value) && (Oe = setTimeout(() => {
				c.playing && !b.value && (h.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function $() {
			h.value = !0, Ze();
		}
		B(() => c.playing, (e) => {
			e ? (G.value = !1, fe(), Ze()) : (Xe(), h.value = !0);
		});
		let Qe = null;
		return P(() => {
			c.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), typeof document < "u" && (document.addEventListener("fullscreenchange", Ke), ee.value = document.pictureInPictureEnabled === !0), Qe = c.bindMediaSession({
				onPlay: () => void f.value?.play()?.catch(() => {}),
				onPause: () => f.value?.pause(),
				onSeek: (e) => Q(e)
			}), De = f.value?.textTracks ?? null, De?.addEventListener?.("addtrack", Z), De?.addEventListener?.("removetrack", Z), Z();
		}), B(() => r.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), ie();
		}), N(() => {
			Xe(), X(), typeof document < "u" && document.removeEventListener("fullscreenchange", Ke), Qe?.(), De?.removeEventListener?.("addtrack", Z), De?.removeEventListener?.("removetrack", Z);
		}), (n, r) => (F(), E("div", {
			ref_key: "containerRef",
			ref: p,
			class: j(["player", {
				"is-chrome-hidden": !h.value,
				"is-theater": A.value
			}]),
			onPointermove: $,
			onPointerdown: $,
			onFocusin: $
		}, [k(et, {
			video: f.value,
			enabled: z(l).atmosphere,
			playing: z(c).playing,
			"reduced-motion": z(l).effectiveReducedMotion,
			intensity: te.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), D("div", Nt, [
			D("video", {
				ref_key: "videoRef",
				ref: f,
				class: "player__video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Me,
				onPause: Ne,
				onTimeupdate: Pe,
				onLoadedmetadata: Fe,
				onProgress: Ie,
				onVolumechange: Le,
				onRatechange: Re,
				onEnded: ue,
				onError: pe,
				onEnterpictureinpicture: Je,
				onLeavepictureinpicture: Ye,
				onClick: Ae
			}, null, 40, Pt),
			r[8] ||= D("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[9] ||= D("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			D("div", Ft, [D("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": z(u)("player.back"),
				onClick: r[0] ||= V((e) => s("back"), ["stop"])
			}, [k(t, { name: "arrow-left" })], 8, It), D("div", Lt, [
				D("p", Rt, R(z(u)("player.nowPlaying")), 1),
				D("h2", zt, R(e.media.name), 1),
				D("div", Bt, [(F(!0), E(x, null, L(ke.value, (e, t) => (F(), E(x, { key: t }, [t > 0 && !e.cert ? (F(), E("span", Vt, "·")) : T("", !0), D("span", { class: j({ player__cert: e.cert }) }, R(e.text), 3)], 64))), 128))])
			])]),
			U.value ? T("", !0) : (F(), E("div", Ht, [D("button", {
				type: "button",
				class: j(["player__bigplay", { "is-playing": z(c).playing }]),
				"aria-label": z(c).playing ? z(u)("player.pause") : z(u)("player.play"),
				onClick: V(Ae, ["stop"])
			}, [k(t, { name: z(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Ut)])),
			k(ye, {
				video: f.value,
				language: z(c).subtitleLang,
				"style-config": z(l).captionStyle,
				lifted: h.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			U.value ? T("", !0) : (F(), E("div", {
				key: 1,
				class: "player__controls",
				onClick: r[3] ||= V(() => {}, ["stop"])
			}, [k(ne, {
				position: z(c).position,
				duration: z(c).duration,
				buffered: z(c).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: Q,
				onScrubStart: ze,
				onScrubEnd: Be
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), D("div", Wt, [
				D("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": z(c).playing ? z(u)("player.pause") : z(u)("player.play"),
					onClick: Ae
				}, [k(t, { name: z(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Gt),
				D("span", Kt, [
					O(R(z(H)(z(c).position)), 1),
					r[6] ||= D("span", { class: "player__sep" }, " / ", -1),
					O(R(z(H)(z(c).duration)), 1)
				]),
				r[7] ||= D("span", { class: "player__grow" }, null, -1),
				k(ge),
				k(_e),
				k(ve, { qualities: e.qualities }, null, 8, ["qualities"]),
				k(We, {
					open: Se.value,
					"onUpdate:open": r[1] ||= (e) => Se.value = e,
					tracks: he.value,
					"audio-tracks": be.value,
					"active-audio": xe.value,
					onSelectAudio: Ee
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				D("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": z(u)("player.keyboardShortcuts"),
					"aria-haspopup": "dialog",
					onClick: r[2] ||= (e) => S.value = !0
				}, [k(t, { name: "info" })], 8, qt),
				ee.value ? (F(), E("button", {
					key: 0,
					type: "button",
					class: j(["player__iconbtn", { "is-on": M.value }]),
					"aria-label": M.value ? z(u)("player.exitPip") : z(u)("player.pip"),
					"aria-pressed": M.value,
					onClick: qe
				}, [k(t, { name: "pip" })], 10, Jt)) : T("", !0),
				D("button", {
					type: "button",
					class: j(["player__iconbtn", { "is-on": A.value }]),
					"aria-label": A.value ? z(u)("player.exitTheater") : z(u)("player.theater"),
					"aria-pressed": A.value,
					onClick: Ue
				}, [k(t, { name: "theater" })], 10, Yt),
				D("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": v.value ? z(u)("player.exitFullscreen") : z(u)("player.fullscreen"),
					onClick: Ge
				}, [k(t, { name: v.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Xt)
			])])),
			U.value ? T("", !0) : (F(), w(Mt, {
				key: 2,
				position: z(c).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: Q
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			G.value && !U.value ? (F(), w(at, {
				key: 3,
				seconds: W.value,
				onResume: se,
				onRestart: ce
			}, null, 8, ["seconds"])) : T("", !0),
			q.value && re.value && !U.value ? (F(), w(Et, {
				key: 4,
				media: re.value,
				remaining: J.value,
				total: z(8),
				counting: z(l).autoplay,
				onPlayNow: de,
				onCancel: fe
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : T("", !0),
			U.value ? (F(), w(jt, {
				key: 5,
				title: e.media.name,
				onBack: r[4] ||= (e) => s("back")
			}, null, 8, ["title"])) : T("", !0),
			k(me, {
				open: S.value,
				onClose: r[5] ||= (e) => S.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-302d5019"]]);
//#endregion
export { me as A, $ as C, ve as D, ye as E, ie as F, oe as I, ne as L, Y as M, q as N, _e as O, ae as P, H as R, Ze as S, We as T, qe as _, ot as a, Ye as b, mt as c, dt as d, ut as f, Ke as g, et as h, Et as i, J as j, ge as k, pt as l, at as m, Mt as n, st as o, ht as p, jt as r, ft as s, Zt as t, lt as u, Ge as v, Xe as w, $e as x, Qe as y };

//# sourceMappingURL=Player-C_rJOD0T.js.map