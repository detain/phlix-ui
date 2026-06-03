import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./IconButton-C5x9ZDfp.js";
import { t as r } from "./useFocusTrap-0JaLH3tF.js";
import { a as i } from "./usePreferencesStore-BFFMWKZp.js";
import { t as a } from "./useMessages-B-UDJLSQ.js";
import { a as o } from "./media-query-DowsWq-z.js";
import { t as s } from "./Slider-BMn_Lp_q.js";
import { t as c } from "./Select-j5ozuwYf.js";
import { c as l, g as u, h as d, i as f, l as p, m, n as h, o as g, p as _, r as v, s as y, t as b } from "./captions-COgPp5bH.js";
import { Fragment as x, computed as S, createBlock as C, createCommentVNode as w, createElementBlock as T, createElementVNode as E, createTextVNode as D, createVNode as O, defineComponent as k, normalizeClass as A, normalizeStyle as j, onBeforeUnmount as M, onMounted as ee, openBlock as N, ref as P, renderList as F, toDisplayString as I, toRef as L, unref as R, watch as z, withModifiers as te } from "vue";
//#region src/components/player/format-time.ts
function B(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var V = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], ne = { class: "scrubber__track" }, H = ["title"], U = { class: "scrubber__time numeric" }, re = /*#__PURE__*/ e(/* @__PURE__ */ k({
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
		let { t: r } = a(), i = e, o = n, s = P(null), c = P(!1), l = P(!1), u = P(0), d = P(0), f = (e) => Math.min(1, Math.max(0, e)), p = S(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = S(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = S(() => (c.value || l.value) && i.duration > 0), g = S(() => c.value ? u.value : d.value), _ = S(() => g.value * i.duration), v = S(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = S(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = S(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), C = S(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function D(e) {
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
			let t = D(e);
			u.value = t, o("scrub-start"), o("seek", t * i.duration), e.preventDefault();
		}
		function k(e) {
			let t = D(e);
			d.value = t, c.value && (u.value = t, o("seek", t * i.duration));
		}
		function M(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				o("scrub-end");
			}
		}
		function ee() {
			l.value = !0;
		}
		function L() {
			l.value = !1;
		}
		function z(e) {
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
		}), (t, n) => (N(), T("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": R(B)(e.position),
			"aria-label": R(r)("player.seek"),
			onPointerdown: O,
			onPointermove: k,
			onPointerup: M,
			onPointercancel: M,
			onPointerenter: ee,
			onPointerleave: L,
			onKeydown: z
		}, [E("div", ne, [
			E("div", {
				class: "scrubber__buffered",
				style: j({ transform: `scaleX(${m.value})` })
			}, null, 4),
			E("div", {
				class: "scrubber__played",
				style: j({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(N(!0), T(x, null, F(C.value, (e, t) => (N(), T("span", {
				key: t,
				class: "scrubber__tick",
				style: j({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, H))), 128)),
			E("div", {
				class: A(["scrubber__head", { "is-dragging": c.value }]),
				style: j({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (N(), T("div", {
			key: 0,
			class: "scrubber__preview",
			style: j({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (N(), T("div", {
			key: 0,
			class: "scrubber__thumb",
			style: j({ backgroundImage: y.value })
		}, null, 4)) : w("", !0), E("span", U, I(R(B)(_.value)), 1)], 4)) : w("", !0)], 40, V));
	}
}), [["__scopeId", "data-v-39414106"]]), W = [
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
], G = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, K = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function q(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function J(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function ie(e, t) {
	switch (e.key) {
		case " ": return q(e.target) ? !1 : (t.playPause(), !0);
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
function ae(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || J(n.target) || ie(n, e) && n.preventDefault();
	}
	ee(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), M(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var oe = ["aria-label"], se = { class: "shortcuts__head" }, ce = { class: "shortcuts__title" }, le = { class: "shortcuts__grid" }, Y = { class: "shortcuts__keys" }, ue = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, de = {
	key: 1,
	class: "shortcuts__key"
}, fe = { class: "shortcuts__label" }, pe = /*#__PURE__*/ e(/* @__PURE__ */ k({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => W }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = P(null);
		return r(l, L(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (N(), T("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= te((e) => s("close"), ["self"])
		}, [E("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": R(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [E("div", se, [E("h3", ce, I(R(c)("player.keyboard")), 1), O(n, {
			name: "x",
			label: R(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), E("ul", le, [(N(!0), T(x, null, F(e.shortcuts, (e) => (N(), T("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [E("span", Y, [(N(!0), T(x, null, F(e.keys, (e, n) => (N(), T(x, { key: n }, [e === "–" ? (N(), T("span", ue, "–")) : (N(), T("kbd", de, [R(G)[e] ? (N(), C(t, {
			key: 0,
			name: R(G)[e],
			label: R(K)[e] ?? e
		}, null, 8, ["name", "label"])) : (N(), T(x, { key: 1 }, [D(I(e), 1)], 64))]))], 64))), 128))]), E("span", fe, I(e.label), 1)]))), 128))])], 8, oe)])) : w("", !0);
	}
}), [["__scopeId", "data-v-f3720b12"]]), me = { class: "volume" }, he = /*#__PURE__*/ e(/* @__PURE__ */ k({
	__name: "VolumeControl",
	setup(e) {
		let t = o(), r = i(), { t: c } = a(), l = S(() => t.muted ? 0 : t.volume), u = S(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function d(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return z(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (N(), T("div", me, [O(n, {
			name: u.value,
			label: R(t).muted ? R(c)("player.unmute") : R(c)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => R(t).toggleMute()
		}, null, 8, ["name", "label"]), O(s, {
			class: "volume__slider",
			"model-value": l.value,
			min: 0,
			max: 1,
			step: .05,
			label: R(c)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": d
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-b3fb9c33"]]), ge = /*#__PURE__*/ e(/* @__PURE__ */ k({
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
		], n = o(), { t: r } = a(), i = S(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function s(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (N(), C(c, {
			class: "speed-menu",
			"model-value": R(n).rate,
			options: i.value,
			label: R(r)("player.playbackSpeed"),
			"onUpdate:modelValue": s
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-5b5c018e"]]), _e = /*#__PURE__*/ e(/* @__PURE__ */ k({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = o(), r = i(), { t: s } = a(), l = S(() => t.qualities.length > 0);
		function u(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => l.value ? (N(), C(c, {
			key: 0,
			class: "quality-menu",
			"model-value": R(n).quality,
			options: e.qualities,
			label: R(s)("player.quality"),
			"onUpdate:modelValue": u
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : w("", !0);
	}
}), [["__scopeId", "data-v-4de62ece"]]), ve = /*#__PURE__*/ e(/* @__PURE__ */ k({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = P([]), i = S(() => p(n.styleConfig)), a = null;
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
		return z(() => [n.video, n.language], c, { immediate: !0 }), M(s), t({ lines: r }), (t, n) => r.value.length ? (N(), T("div", {
			key: 0,
			class: A(["player__captions", { "is-lifted": e.lifted }]),
			style: j(i.value)
		}, [(N(!0), T(x, null, F(r.value, (e, t) => (N(), T("p", {
			key: t,
			class: "player__caption-line"
		}, I(e), 1))), 128))], 6)) : w("", !0);
	}
}), [["__scopeId", "data-v-15a0f3c5"]]), ye = ["aria-label", "aria-expanded"], X = ["aria-label"], be = { class: "capmenu__head" }, xe = { class: "capmenu__title" }, Se = ["aria-label"], Ce = ["aria-checked", "tabindex"], we = { class: "capmenu__check" }, Z = { class: "capmenu__optlabel" }, Te = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ee = { class: "capmenu__check" }, De = { class: "capmenu__optlabel" }, Oe = { class: "capmenu__title capmenu__title--sub" }, ke = ["aria-label"], Ae = [
	"aria-checked",
	"tabindex",
	"onClick"
], je = { class: "capmenu__check" }, Me = { class: "capmenu__optlabel" }, Ne = { class: "capmenu__title capmenu__title--sub" }, Pe = { class: "capmenu__style" }, Fe = { class: "capmenu__field" }, Ie = { class: "capmenu__fieldlabel" }, Le = { class: "capmenu__field" }, Re = { class: "capmenu__fieldlabel" }, ze = { class: "capmenu__field" }, Be = { class: "capmenu__fieldlabel" }, Ve = { class: "capmenu__field" }, He = { class: "capmenu__fieldlabel" }, Ue = /*#__PURE__*/ e(/* @__PURE__ */ k({
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
		let l = e, u = s, d = o(), p = i(), { t: m } = a(), g = P(null), _ = P(null), y = S(() => d.subtitleLang), D = S(() => l.tracks.some((e) => e.language === y.value)), k = S(() => D.value ? "captions" : "captions-off"), j = S(() => D.value ? l.tracks.findIndex((e) => e.language === y.value) + 1 : 0), ee = S(() => l.activeAudio >= 0 ? l.activeAudio : 0);
		function te(e) {
			u("update:open", e);
		}
		function B() {
			te(!1);
		}
		function V(e) {
			d.setSubtitle(e), p.defaultSubtitleLang = e;
		}
		function ne(e) {
			u("select-audio", e);
		}
		function H(e, t, n) {
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
		function U(e) {
			let t = H(e, l.tracks.length + 1, j.value);
			t !== null && V(t === 0 ? null : l.tracks[t - 1].language);
		}
		function re(e) {
			let t = H(e, l.audioTracks.length, ee.value);
			t !== null && ne(l.audioTracks[t].index);
		}
		function W(e) {
			p.captionStyle = {
				...p.captionStyle,
				size: e
			};
		}
		function G(e) {
			p.captionStyle = {
				...p.captionStyle,
				textColor: String(e)
			};
		}
		function K(e) {
			p.captionStyle = {
				...p.captionStyle,
				background: e
			};
		}
		function q(e) {
			p.captionStyle = {
				...p.captionStyle,
				edge: e
			};
		}
		r(_, L(l, "open"), {
			lockScroll: !1,
			onEscape: () => (B(), !0)
		});
		function J(e) {
			g.value && !g.value.contains(e.target) && B();
		}
		return z(() => l.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", J, !0) : document.removeEventListener("pointerdown", J, !0));
		}, { immediate: !0 }), M(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", J, !0);
		}), (r, i) => (N(), T("div", {
			ref_key: "rootEl",
			ref: g,
			class: "capmenu"
		}, [E("button", {
			type: "button",
			class: A(["capmenu__btn", { "is-active": D.value }]),
			"aria-label": D.value ? R(m)("player.captionsOn") : R(m)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => te(!e.open)
		}, [O(t, { name: k.value }, null, 8, ["name"])], 10, ye), e.open ? (N(), T("div", {
			key: 0,
			ref_key: "panelEl",
			ref: _,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": R(m)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			E("div", be, [E("h3", xe, I(R(m)("player.subtitles")), 1), O(n, {
				name: "x",
				label: R(m)("common.close"),
				size: "sm",
				onClick: B
			}, null, 8, ["label"])]),
			E("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": R(m)("player.subtitleTrack"),
				onKeydown: U
			}, [E("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !D.value,
				tabindex: j.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => V(null)
			}, [E("span", we, [D.value ? w("", !0) : (N(), C(t, {
				key: 0,
				name: "check"
			}))]), E("span", Z, I(R(m)("player.off")), 1)], 8, Ce), (N(!0), T(x, null, F(e.tracks, (e, n) => (N(), T("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": y.value === e.language,
				tabindex: j.value === n + 1 ? 0 : -1,
				onClick: (t) => V(e.language)
			}, [E("span", Ee, [y.value === e.language ? (N(), C(t, {
				key: 0,
				name: "check"
			})) : w("", !0)]), E("span", De, I(e.label), 1)], 8, Te))), 128))], 40, Se),
			e.audioTracks.length > 1 ? (N(), T(x, { key: 0 }, [E("h3", Oe, I(R(m)("player.audio")), 1), E("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": R(m)("player.audioTrack"),
				onKeydown: re
			}, [(N(!0), T(x, null, F(e.audioTracks, (n) => (N(), T("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: ee.value === n.index ? 0 : -1,
				onClick: (e) => ne(n.index)
			}, [E("span", je, [e.activeAudio === n.index ? (N(), C(t, {
				key: 0,
				name: "check"
			})) : w("", !0)]), E("span", Me, I(n.label), 1)], 8, Ae))), 128))], 40, ke)], 64)) : w("", !0),
			E("h3", Ne, I(R(m)("player.captionStyle")), 1),
			E("div", Pe, [
				E("div", Fe, [E("span", Ie, I(R(m)("player.size")), 1), O(c, {
					"model-value": R(p).captionStyle.size,
					options: R(f),
					label: R(m)("player.captionSize"),
					"onUpdate:modelValue": W
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				E("div", Le, [E("span", Re, I(R(m)("player.color")), 1), O(c, {
					"model-value": R(p).captionStyle.textColor,
					options: R(h),
					label: R(m)("player.captionColor"),
					"onUpdate:modelValue": G
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				E("div", ze, [E("span", Be, I(R(m)("player.background")), 1), O(c, {
					"model-value": R(p).captionStyle.background,
					options: R(b),
					label: R(m)("player.captionBackground"),
					"onUpdate:modelValue": K
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				E("div", Ve, [E("span", He, I(R(m)("player.edge")), 1), O(c, {
					"model-value": R(p).captionStyle.edge,
					options: R(v),
					label: R(m)("player.captionEdge"),
					"onUpdate:modelValue": q
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, X)) : w("", !0)], 512));
	}
}), [["__scopeId", "data-v-77df1b62"]]), We = 32, Ge = 18, Ke = 250, qe = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Je(e, t, n, r, i, a, o) {
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
		r: qe(d / m),
		g: qe(f / m),
		b: qe(p / m)
	};
}
function Ye(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Je(e, t, n, 0, 0, r, n),
		right: Je(e, t, n, t - r, 0, t, n),
		center: Je(e, t, n, 0, 0, t, n)
	};
}
function Xe({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function Q({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Ze(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Q(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Q(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Q(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function $(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Qe = /*#__PURE__*/ e(/* @__PURE__ */ k({
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
		let n = e, r = P(!1), i = null;
		function a() {
			r.value = $(i);
		}
		let o = S(() => n.enabled && !n.reducedMotion && !r.value), s = S(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = P(null), l = null, u = null, d = !1, f = !1;
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
				c.value = Ze(Ye(n, 32, 18));
			} catch {
				f = !0, c.value = null;
			}
		}
		function h(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let g = null, _ = null, v = null, y = 0, b = !1;
		function x(e) {
			_ = e, g = e.requestVideoFrameCallback(C);
		}
		function C(e) {
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
		function E() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		z(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			E(), e && t && w();
		}, { immediate: !0 }), ee(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), M(() => {
			E(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let D = S(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (N(), T("div", {
			class: A(["player__ambient", { "is-active": o.value }]),
			style: j(o.value ? D.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), $e = ["aria-label"], et = { class: "resume__label" }, tt = { class: "resume__time numeric" }, nt = { class: "resume__actions" }, rt = /*#__PURE__*/ e(/* @__PURE__ */ k({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = S(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (N(), T("div", {
			class: "resume",
			role: "region",
			"aria-label": R(i)("player.resumePlayback")
		}, [E("p", et, [
			D(I(o.value[0]), 1),
			E("span", tt, I(R(B)(e.seconds)), 1),
			D(I(o.value[1]), 1)
		]), E("div", nt, [E("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [O(t, { name: "play" }), E("span", null, I(R(i)("player.resume")), 1)]), E("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [O(t, { name: "rewind" }), E("span", null, I(R(i)("player.startOver")), 1)])])], 8, $e));
	}
}), [["__scopeId", "data-v-ef72b644"]]), it = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], at = [
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
], ot = new Set(at);
function st(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function ct(...e) {
	return e.some((e) => ot.has(st(e)));
}
function lt(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
var ut = 8, dt = 15, ft = 2 * Math.PI * 15;
function pt(e, t, n = ft) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var mt = ["aria-label"], ht = ["src"], gt = { class: "upnext__body" }, _t = { class: "upnext__eyebrow" }, vt = { class: "upnext__title" }, yt = {
	key: 0,
	class: "upnext__cd numeric"
}, bt = { class: "upnext__actions" }, xt = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, St = ["r"], Ct = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], wt = /*#__PURE__*/ e(/* @__PURE__ */ k({
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
		let { t: r } = a(), i = e, o = n, s = S(() => i.posterUrl ?? i.media.poster_url ?? null), c = S(() => pt(i.remaining, i.total));
		return (n, i) => (N(), T("aside", {
			class: "upnext",
			role: "region",
			"aria-label": R(r)("player.upNext")
		}, [
			s.value ? (N(), T("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, ht)) : w("", !0),
			E("div", gt, [
				E("p", _t, I(R(r)("player.upNext")), 1),
				E("h4", vt, I(e.media.name), 1),
				e.counting ? (N(), T("p", yt, I(R(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : w("", !0),
				E("div", bt, [E("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => o("play-now")
				}, [O(t, { name: "play" }), E("span", null, I(R(r)("player.playNow")), 1)]), E("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => o("cancel")
				}, I(R(r)("player.cancel")), 1)])
			]),
			e.counting ? (N(), T("svg", xt, [E("circle", {
				cx: "18",
				cy: "18",
				r: R(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, St), E("circle", {
				cx: "18",
				cy: "18",
				r: R(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": R(ft),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Ct)])) : w("", !0)
		], 8, mt));
	}
}), [["__scopeId", "data-v-c000ec99"]]), Tt = {
	class: "transcode",
	role: "alert"
}, Et = { class: "transcode__card" }, Dt = { class: "transcode__heading" }, Ot = { class: "transcode__body" }, kt = /*#__PURE__*/ e(/* @__PURE__ */ k({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (N(), T("div", Tt, [E("div", Et, [
			O(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			E("h3", Dt, I(R(i)("player.transcodeHeading")), 1),
			E("p", Ot, I(e.title ? R(i)("player.transcodeBodyTitled", { title: e.title }) : R(i)("player.transcodeBodyUntitled")), 1),
			E("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [O(t, { name: "arrow-left" }), E("span", null, I(R(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-950c7b9d"]]), At = { class: "player__stage" }, jt = ["src", "poster"], Mt = { class: "player__meta" }, Nt = ["aria-label"], Pt = { class: "player__meta-text" }, Ft = { class: "player__eyebrow" }, It = { class: "player__title" }, Lt = { class: "player__sub numeric" }, Rt = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, zt = {
	key: 0,
	class: "player__center"
}, Bt = ["aria-label"], Vt = { class: "player__btnrow" }, Ht = ["aria-label"], Ut = { class: "player__time numeric" }, Wt = ["aria-label"], Gt = ["aria-label", "aria-pressed"], Kt = ["aria-label", "aria-pressed"], qt = ["aria-label"], Jt = /*#__PURE__*/ e(/* @__PURE__ */ k({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {},
		idleTimeout: {},
		chapters: {},
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
		], f = P(null), p = P(null), h = P(!0), v = P(!1), b = P(!1), k = P(!1), j = P(!1), L = P(!1), V = P(!1), ne = S(() => j.value ? 1.35 : 1), H = P(ct(r.streamUrl, r.media.path)), U = P(c.resumePositionFor(r.media.id) ?? 0), W = P(!H.value && U.value > 0), G = null, K = P(!1), q = P(8), J, ie = S(() => c.upNext);
		function oe() {
			H.value = ct(r.streamUrl, r.media.path), U.value = c.resumePositionFor(r.media.id) ?? 0, W.value = !H.value && U.value > 0, G = null, Y(), K.value = !1;
		}
		function se(e) {
			let t = f.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : G = Math.max(0, e));
		}
		function ce() {
			se(U.value), W.value = !1, f.value?.play()?.catch(() => {});
		}
		function le() {
			G = null, se(0), c.clearResume(r.media.id), W.value = !1, f.value?.play()?.catch(() => {});
		}
		function Y() {
			J &&= (clearInterval(J), void 0);
		}
		function ue() {
			q.value = 8, Y(), J = setInterval(() => {
				--q.value, q.value <= 0 && (Y(), fe());
			}, 1e3);
		}
		function de() {
			c.upNext && (K.value = !0, l.autoplay && ue());
		}
		function fe() {
			Y(), K.value = !1;
			let e = c.next(r.streamUrlFor);
			e && s("play-next", e);
		}
		function me() {
			Y(), K.value = !1;
		}
		function ye() {
			lt(f.value) && (H.value = !0);
		}
		let X = P([]), be = P([]), xe = P(-1), Se = P(!1), Ce = c.subtitleLang, we = S(() => X.value.some((e) => e.language === c.subtitleLang));
		function Z() {
			let e = f.value;
			X.value = m(e), be.value = _(e), xe.value = g(e);
		}
		function Te() {
			if (we.value) Ce = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = Ce && X.value.some((e) => e.language === Ce) ? Ce : X.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			s("captions");
		}
		function Ee(e) {
			y(f.value, e), xe.value = e;
		}
		let De = null, Oe, ke = S(() => {
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
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, G !== null && (e.currentTime = e.duration ? Math.min(e.duration, G) : G, G = null), c.updateProgress(e.currentTime, e.duration, je(e)), c.setMediaPositionState(), Z());
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
		function ze(e) {
			let t = f.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function Be() {
			b.value = !0, $();
		}
		function Ve() {
			b.value = !1, $();
		}
		function He(e) {
			let t = d.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(d[e] - c.rate) ? n : e, 0), n = d[Math.min(d.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		ae({
			playPause: Ae,
			seekBy: (e) => ze(c.position + e),
			frameStep: (e) => {
				c.playing || ze(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: We,
			toggleFullscreen: Ke,
			toggleCaptions: Te,
			toggleTheater: Ge,
			togglePip: Je,
			seekToPercent: (e) => ze(e * c.duration),
			speedStep: He,
			toggleHelp: () => {
				k.value = !k.value;
			}
		}, { enabled: () => !k.value && !Se.value });
		function We() {
			c.toggleMute();
		}
		function Ge() {
			j.value = !j.value, s("theater", j.value);
		}
		z(() => c.muted, (e) => {
			let t = f.value;
			t && t.muted !== e && (t.muted = e);
		}), z(() => c.volume, (e) => {
			let t = f.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), z(() => c.rate, (e) => {
			let t = f.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function Ke() {
			if (typeof document > "u") return;
			let e = p.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function qe() {
			v.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Je() {
			let e = f.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function Ye() {
			L.value = !0;
		}
		function Xe() {
			L.value = !1;
		}
		function Q() {
			Oe &&= (clearTimeout(Oe), void 0);
		}
		function Ze() {
			Q(), !(!c.playing || b.value) && (Oe = setTimeout(() => {
				c.playing && !b.value && (h.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function $() {
			h.value = !0, Ze();
		}
		z(() => c.playing, (e) => {
			e ? (W.value = !1, me(), Ze()) : (Q(), h.value = !0);
		});
		let $e = null;
		return ee(() => {
			c.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), typeof document < "u" && (document.addEventListener("fullscreenchange", qe), V.value = document.pictureInPictureEnabled === !0), $e = c.bindMediaSession({
				onPlay: () => void f.value?.play()?.catch(() => {}),
				onPause: () => f.value?.pause(),
				onSeek: (e) => ze(e)
			}), De = f.value?.textTracks ?? null, De?.addEventListener?.("addtrack", Z), De?.addEventListener?.("removetrack", Z), Z();
		}), z(() => r.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), oe();
		}), M(() => {
			Q(), Y(), typeof document < "u" && document.removeEventListener("fullscreenchange", qe), $e?.(), De?.removeEventListener?.("addtrack", Z), De?.removeEventListener?.("removetrack", Z);
		}), (n, r) => (N(), T("div", {
			ref_key: "containerRef",
			ref: p,
			class: A(["player", {
				"is-chrome-hidden": !h.value,
				"is-theater": j.value
			}]),
			onPointermove: $,
			onPointerdown: $,
			onFocusin: $
		}, [O(Qe, {
			video: f.value,
			enabled: R(l).atmosphere,
			playing: R(c).playing,
			"reduced-motion": R(l).effectiveReducedMotion,
			intensity: ne.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), E("div", At, [
			E("video", {
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
				onEnded: de,
				onError: ye,
				onEnterpictureinpicture: Ye,
				onLeavepictureinpicture: Xe,
				onClick: Ae
			}, null, 40, jt),
			r[8] ||= E("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[9] ||= E("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			E("div", Mt, [E("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": R(u)("player.back"),
				onClick: r[0] ||= te((e) => s("back"), ["stop"])
			}, [O(t, { name: "arrow-left" })], 8, Nt), E("div", Pt, [
				E("p", Ft, I(R(u)("player.nowPlaying")), 1),
				E("h2", It, I(e.media.name), 1),
				E("div", Lt, [(N(!0), T(x, null, F(ke.value, (e, t) => (N(), T(x, { key: t }, [t > 0 && !e.cert ? (N(), T("span", Rt, "·")) : w("", !0), E("span", { class: A({ player__cert: e.cert }) }, I(e.text), 3)], 64))), 128))])
			])]),
			H.value ? w("", !0) : (N(), T("div", zt, [E("button", {
				type: "button",
				class: A(["player__bigplay", { "is-playing": R(c).playing }]),
				"aria-label": R(c).playing ? R(u)("player.pause") : R(u)("player.play"),
				onClick: te(Ae, ["stop"])
			}, [O(t, { name: R(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Bt)])),
			O(ve, {
				video: f.value,
				language: R(c).subtitleLang,
				"style-config": R(l).captionStyle,
				lifted: h.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			H.value ? w("", !0) : (N(), T("div", {
				key: 1,
				class: "player__controls",
				onClick: r[3] ||= te(() => {}, ["stop"])
			}, [O(re, {
				position: R(c).position,
				duration: R(c).duration,
				buffered: R(c).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: ze,
				onScrubStart: Be,
				onScrubEnd: Ve
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), E("div", Vt, [
				E("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": R(c).playing ? R(u)("player.pause") : R(u)("player.play"),
					onClick: Ae
				}, [O(t, { name: R(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Ht),
				E("span", Ut, [
					D(I(R(B)(R(c).position)), 1),
					r[6] ||= E("span", { class: "player__sep" }, " / ", -1),
					D(I(R(B)(R(c).duration)), 1)
				]),
				r[7] ||= E("span", { class: "player__grow" }, null, -1),
				O(he),
				O(ge),
				O(_e, { qualities: e.qualities }, null, 8, ["qualities"]),
				O(Ue, {
					open: Se.value,
					"onUpdate:open": r[1] ||= (e) => Se.value = e,
					tracks: X.value,
					"audio-tracks": be.value,
					"active-audio": xe.value,
					onSelectAudio: Ee
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				E("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": R(u)("player.keyboardShortcuts"),
					"aria-haspopup": "dialog",
					onClick: r[2] ||= (e) => k.value = !0
				}, [O(t, { name: "info" })], 8, Wt),
				V.value ? (N(), T("button", {
					key: 0,
					type: "button",
					class: A(["player__iconbtn", { "is-on": L.value }]),
					"aria-label": L.value ? R(u)("player.exitPip") : R(u)("player.pip"),
					"aria-pressed": L.value,
					onClick: Je
				}, [O(t, { name: "pip" })], 10, Gt)) : w("", !0),
				E("button", {
					type: "button",
					class: A(["player__iconbtn", { "is-on": j.value }]),
					"aria-label": j.value ? R(u)("player.exitTheater") : R(u)("player.theater"),
					"aria-pressed": j.value,
					onClick: Ge
				}, [O(t, { name: "theater" })], 10, Kt),
				E("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": v.value ? R(u)("player.exitFullscreen") : R(u)("player.fullscreen"),
					onClick: Ke
				}, [O(t, { name: v.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, qt)
			])])),
			W.value && !H.value ? (N(), C(rt, {
				key: 2,
				seconds: U.value,
				onResume: ce,
				onRestart: le
			}, null, 8, ["seconds"])) : w("", !0),
			K.value && ie.value && !H.value ? (N(), C(wt, {
				key: 3,
				media: ie.value,
				remaining: q.value,
				total: R(8),
				counting: R(l).autoplay,
				onPlayNow: fe,
				onCancel: me
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : w("", !0),
			H.value ? (N(), C(kt, {
				key: 4,
				title: e.media.name,
				onBack: r[4] ||= (e) => s("back")
			}, null, 8, ["title"])) : w("", !0),
			O(pe, {
				open: k.value,
				onClose: r[5] ||= (e) => k.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-5dd225c5"]]);
//#endregion
export { G as A, Ye as C, ge as D, _e as E, ae as F, re as I, B as L, W as M, ie as N, he as O, J as P, Q as S, ve as T, We as _, at as a, $ as b, dt as c, ct as d, pt as f, Ke as g, Ge as h, it as i, K as j, pe as k, st as l, Qe as m, kt as n, ut as o, rt as p, wt as r, ft as s, Jt as t, lt as u, Ze as v, Ue as w, Xe as x, Je as y };

//# sourceMappingURL=Player-BQ_9gGT8.js.map