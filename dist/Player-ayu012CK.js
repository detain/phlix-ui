import { d as e, u as t } from "./Button-C4PyCjLX.js";
import { n, t as r } from "./useFocusTrap-BN86qgtj.js";
import { a as i } from "./usePreferencesStore-BFFMWKZp.js";
import { a } from "./media-query-DowsWq-z.js";
import { t as o } from "./Slider-f9S4ziJW.js";
import { t as s } from "./Select-CmN-4YbZ.js";
import { c, g as l, h as u, i as d, l as f, m as p, n as m, o as h, p as g, r as _, s as v, t as y } from "./captions-COgPp5bH.js";
import { Fragment as b, computed as x, createBlock as S, createCommentVNode as C, createElementBlock as w, createElementVNode as T, createTextVNode as E, createVNode as D, defineComponent as O, normalizeClass as k, normalizeStyle as A, onBeforeUnmount as j, onMounted as M, openBlock as N, ref as P, renderList as F, toDisplayString as I, toRef as ee, unref as L, watch as R, withModifiers as z } from "vue";
//#region src/components/player/format-time.ts
function B(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var te = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext"
], V = { class: "scrubber__track" }, H = ["title"], U = { class: "scrubber__time numeric" }, ne = /*#__PURE__*/ e(/* @__PURE__ */ O({
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
		let r = e, i = n, a = P(null), o = P(!1), s = P(!1), c = P(0), l = P(0), u = (e) => Math.min(1, Math.max(0, e)), d = x(() => o.value ? c.value : r.duration > 0 ? u(r.position / r.duration) : 0), f = x(() => r.duration > 0 ? u(r.buffered / r.duration) : 0), p = x(() => (o.value || s.value) && r.duration > 0), m = x(() => o.value ? c.value : l.value), h = x(() => m.value * r.duration), g = x(() => p.value ? r.thumbnailAt?.(h.value) ?? null : null), _ = x(() => g.value ? `url("${g.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), v = x(() => `${Math.min(96, Math.max(4, m.value * 100))}%`), y = x(() => r.duration > 0 ? r.chapters.filter((e) => e.start > 0 && e.start < r.duration).map((e) => ({
			...e,
			ratio: e.start / r.duration
		})) : []);
		function S(e) {
			let t = a.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : u((e.clientX - n.left) / n.width);
		}
		function E(e) {
			if (r.duration <= 0) return;
			o.value = !0;
			try {
				a.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = S(e);
			c.value = t, i("scrub-start"), i("seek", t * r.duration), e.preventDefault();
		}
		function D(e) {
			let t = S(e);
			l.value = t, o.value && (c.value = t, i("seek", t * r.duration));
		}
		function O(e) {
			if (o.value) {
				o.value = !1;
				try {
					a.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				i("scrub-end");
			}
		}
		function j() {
			s.value = !0;
		}
		function M() {
			s.value = !1;
		}
		function ee(e) {
			let t = r.duration;
			if (t <= 0) return;
			let n = null;
			switch (e.key) {
				case "ArrowLeft":
					n = Math.max(0, r.position - r.step);
					break;
				case "ArrowRight":
					n = Math.min(t, r.position + r.step);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t;
					break;
				default: return;
			}
			i("seek", n), e.preventDefault();
		}
		return t({
			playedRatio: d,
			previewActive: p
		}), (t, n) => (N(), w("div", {
			ref_key: "trackEl",
			ref: a,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": L(B)(e.position),
			"aria-label": "Seek",
			onPointerdown: E,
			onPointermove: D,
			onPointerup: O,
			onPointercancel: O,
			onPointerenter: j,
			onPointerleave: M,
			onKeydown: ee
		}, [T("div", V, [
			T("div", {
				class: "scrubber__buffered",
				style: A({ width: `${f.value * 100}%` })
			}, null, 4),
			T("div", {
				class: "scrubber__played",
				style: A({ width: `${d.value * 100}%` })
			}, null, 4),
			(N(!0), w(b, null, F(y.value, (e, t) => (N(), w("span", {
				key: t,
				class: "scrubber__tick",
				style: A({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, H))), 128)),
			T("div", {
				class: k(["scrubber__head", { "is-dragging": o.value }]),
				style: A({ left: `${d.value * 100}%` })
			}, null, 6)
		]), p.value ? (N(), w("div", {
			key: 0,
			class: "scrubber__preview",
			style: A({ left: v.value }),
			"aria-hidden": "true"
		}, [g.value ? (N(), w("div", {
			key: 0,
			class: "scrubber__thumb",
			style: A({ backgroundImage: _.value })
		}, null, 4)) : C("", !0), T("span", U, I(L(B)(h.value)), 1)], 4)) : C("", !0)], 40, te));
	}
}), [["__scopeId", "data-v-b2711211"]]), W = [
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
function re(e) {
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
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || re(n.target) || ie(n, e) && n.preventDefault();
	}
	M(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), j(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var oe = { class: "shortcuts__head" }, se = { class: "shortcuts__grid" }, ce = { class: "shortcuts__keys" }, J = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, le = {
	key: 1,
	class: "shortcuts__key"
}, ue = { class: "shortcuts__label" }, de = /*#__PURE__*/ e(/* @__PURE__ */ O({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => W }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let a = e, o = i, s = P(null);
		return r(s, ee(a, "open"), {
			lockScroll: !1,
			onEscape: () => (o("close"), !0)
		}), (r, i) => e.open ? (N(), w("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= z((e) => o("close"), ["self"])
		}, [T("div", {
			ref_key: "panelEl",
			ref: s,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Keyboard shortcuts",
			tabindex: "-1"
		}, [T("div", oe, [i[2] ||= T("h3", { class: "shortcuts__title" }, "Keyboard", -1), D(n, {
			name: "x",
			label: "Close",
			size: "sm",
			onClick: i[0] ||= (e) => o("close")
		})]), T("ul", se, [(N(!0), w(b, null, F(e.shortcuts, (e) => (N(), w("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [T("span", ce, [(N(!0), w(b, null, F(e.keys, (e, n) => (N(), w(b, { key: n }, [e === "–" ? (N(), w("span", J, "–")) : (N(), w("kbd", le, [L(G)[e] ? (N(), S(t, {
			key: 0,
			name: L(G)[e],
			label: L(K)[e] ?? e
		}, null, 8, ["name", "label"])) : (N(), w(b, { key: 1 }, [E(I(e), 1)], 64))]))], 64))), 128))]), T("span", ue, I(e.label), 1)]))), 128))])], 512)])) : C("", !0);
	}
}), [["__scopeId", "data-v-5e972c87"]]), fe = { class: "volume" }, pe = /*#__PURE__*/ e(/* @__PURE__ */ O({
	__name: "VolumeControl",
	setup(e) {
		let t = a(), r = i(), s = x(() => t.muted ? 0 : t.volume), c = x(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return R(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (N(), w("div", fe, [D(n, {
			name: c.value,
			label: L(t).muted ? "Unmute" : "Mute",
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => L(t).toggleMute()
		}, null, 8, ["name", "label"]), D(o, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: "Volume",
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, ["model-value", "format-value"])]));
	}
}), [["__scopeId", "data-v-2768c5e3"]]), me = /*#__PURE__*/ e(/* @__PURE__ */ O({
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
		], n = a(), r = x(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function i(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (N(), S(s, {
			class: "speed-menu",
			"model-value": L(n).rate,
			options: r.value,
			label: "Playback speed",
			"onUpdate:modelValue": i
		}, null, 8, ["model-value", "options"]));
	}
}), [["__scopeId", "data-v-f161a2e3"]]), he = /*#__PURE__*/ e(/* @__PURE__ */ O({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = a(), r = i(), o = x(() => t.qualities.length > 0);
		function c(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => o.value ? (N(), S(s, {
			key: 0,
			class: "quality-menu",
			"model-value": L(n).quality,
			options: e.qualities,
			label: "Quality",
			"onUpdate:modelValue": c
		}, null, 8, ["model-value", "options"])) : C("", !0);
	}
}), [["__scopeId", "data-v-49b2c767"]]), ge = /*#__PURE__*/ e(/* @__PURE__ */ O({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = P([]), i = x(() => f(n.styleConfig)), a = null;
		function o() {
			r.value = u(a);
		}
		function s() {
			a?.removeEventListener("cuechange", o), a = null;
		}
		function d() {
			s(), c(n.video, n.language);
			let e = l(n.video, n.language);
			e ? (a = e, e.addEventListener("cuechange", o), r.value = u(e)) : r.value = [];
		}
		return R(() => [n.video, n.language], d, { immediate: !0 }), j(s), t({ lines: r }), (t, n) => r.value.length ? (N(), w("div", {
			key: 0,
			class: k(["player__captions", { "is-lifted": e.lifted }]),
			style: A(i.value)
		}, [(N(!0), w(b, null, F(r.value, (e, t) => (N(), w("p", {
			key: t,
			class: "player__caption-line"
		}, I(e), 1))), 128))], 6)) : C("", !0);
	}
}), [["__scopeId", "data-v-15a0f3c5"]]), _e = ["aria-label", "aria-expanded"], ve = { class: "capmenu__head" }, Y = ["aria-checked", "tabindex"], ye = { class: "capmenu__check" }, be = [
	"aria-checked",
	"tabindex",
	"onClick"
], xe = { class: "capmenu__check" }, Se = { class: "capmenu__optlabel" }, Ce = [
	"aria-checked",
	"tabindex",
	"onClick"
], X = { class: "capmenu__check" }, we = { class: "capmenu__optlabel" }, Te = { class: "capmenu__style" }, Z = { class: "capmenu__field" }, Ee = { class: "capmenu__field" }, De = { class: "capmenu__field" }, Oe = { class: "capmenu__field" }, ke = /*#__PURE__*/ e(/* @__PURE__ */ O({
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
		let c = e, l = o, u = a(), f = i(), p = P(null), h = P(null), g = x(() => u.subtitleLang), v = x(() => c.tracks.some((e) => e.language === g.value)), E = x(() => v.value ? "captions" : "captions-off"), O = x(() => v.value ? c.tracks.findIndex((e) => e.language === g.value) + 1 : 0), A = x(() => c.activeAudio >= 0 ? c.activeAudio : 0);
		function M(e) {
			l("update:open", e);
		}
		function z() {
			M(!1);
		}
		function B(e) {
			u.setSubtitle(e), f.defaultSubtitleLang = e;
		}
		function te(e) {
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
			let t = V(e, c.tracks.length + 1, O.value);
			t !== null && B(t === 0 ? null : c.tracks[t - 1].language);
		}
		function U(e) {
			let t = V(e, c.audioTracks.length, A.value);
			t !== null && te(c.audioTracks[t].index);
		}
		function ne(e) {
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
		function G(e) {
			f.captionStyle = {
				...f.captionStyle,
				background: e
			};
		}
		function K(e) {
			f.captionStyle = {
				...f.captionStyle,
				edge: e
			};
		}
		r(h, ee(c, "open"), {
			lockScroll: !1,
			onEscape: () => (z(), !0)
		});
		function q(e) {
			p.value && !p.value.contains(e.target) && z();
		}
		return R(() => c.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", q, !0) : document.removeEventListener("pointerdown", q, !0));
		}, { immediate: !0 }), j(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", q, !0);
		}), (r, i) => (N(), w("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [T("button", {
			type: "button",
			class: k(["capmenu__btn", { "is-active": v.value }]),
			"aria-label": v.value ? "Captions (on)" : "Captions (off)",
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => M(!e.open)
		}, [D(t, { name: E.value }, null, 8, ["name"])], 10, _e), e.open ? (N(), w("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Captions and subtitles",
			tabindex: "-1"
		}, [
			T("div", ve, [i[2] ||= T("h3", { class: "capmenu__title" }, "Subtitles", -1), D(n, {
				name: "x",
				label: "Close",
				size: "sm",
				onClick: z
			})]),
			T("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": "Subtitle track",
				onKeydown: H
			}, [T("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !v.value,
				tabindex: O.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => B(null)
			}, [T("span", ye, [v.value ? C("", !0) : (N(), S(t, {
				key: 0,
				name: "check"
			}))]), i[3] ||= T("span", { class: "capmenu__optlabel" }, "Off", -1)], 8, Y), (N(!0), w(b, null, F(e.tracks, (e, n) => (N(), w("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": g.value === e.language,
				tabindex: O.value === n + 1 ? 0 : -1,
				onClick: (t) => B(e.language)
			}, [T("span", xe, [g.value === e.language ? (N(), S(t, {
				key: 0,
				name: "check"
			})) : C("", !0)]), T("span", Se, I(e.label), 1)], 8, be))), 128))], 32),
			e.audioTracks.length > 1 ? (N(), w(b, { key: 0 }, [i[4] ||= T("h3", { class: "capmenu__title capmenu__title--sub" }, "Audio", -1), T("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": "Audio track",
				onKeydown: U
			}, [(N(!0), w(b, null, F(e.audioTracks, (n) => (N(), w("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: A.value === n.index ? 0 : -1,
				onClick: (e) => te(n.index)
			}, [T("span", X, [e.activeAudio === n.index ? (N(), S(t, {
				key: 0,
				name: "check"
			})) : C("", !0)]), T("span", we, I(n.label), 1)], 8, Ce))), 128))], 32)], 64)) : C("", !0),
			i[9] ||= T("h3", { class: "capmenu__title capmenu__title--sub" }, "Caption style", -1),
			T("div", Te, [
				T("div", Z, [i[5] ||= T("span", { class: "capmenu__fieldlabel" }, "Size", -1), D(s, {
					"model-value": L(f).captionStyle.size,
					options: L(d),
					label: "Caption size",
					"onUpdate:modelValue": ne
				}, null, 8, ["model-value", "options"])]),
				T("div", Ee, [i[6] ||= T("span", { class: "capmenu__fieldlabel" }, "Color", -1), D(s, {
					"model-value": L(f).captionStyle.textColor,
					options: L(m),
					label: "Caption color",
					"onUpdate:modelValue": W
				}, null, 8, ["model-value", "options"])]),
				T("div", De, [i[7] ||= T("span", { class: "capmenu__fieldlabel" }, "Background", -1), D(s, {
					"model-value": L(f).captionStyle.background,
					options: L(y),
					label: "Caption background",
					"onUpdate:modelValue": G
				}, null, 8, ["model-value", "options"])]),
				T("div", Oe, [i[8] ||= T("span", { class: "capmenu__fieldlabel" }, "Edge", -1), D(s, {
					"model-value": L(f).captionStyle.edge,
					options: L(_),
					label: "Caption edge",
					"onUpdate:modelValue": K
				}, null, 8, ["model-value", "options"])])
			])
		], 512)) : C("", !0)], 512));
	}
}), [["__scopeId", "data-v-aff48a56"]]), Ae = 32, je = 18, Me = 250, Ne = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Pe(e, t, n, r, i, a, o) {
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
		r: Ne(d / m),
		g: Ne(f / m),
		b: Ne(p / m)
	};
}
function Fe(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Pe(e, t, n, 0, 0, r, n),
		right: Pe(e, t, n, t - r, 0, t, n),
		center: Pe(e, t, n, 0, 0, t, n)
	};
}
function Ie({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function Le({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Q(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Le(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Le(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Le(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Re(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var ze = /*#__PURE__*/ e(/* @__PURE__ */ O({
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
			r.value = Re(i);
		}
		let o = x(() => n.enabled && !n.reducedMotion && !r.value), s = x(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = P(null), l = null, u = null, d = !1, f = !1;
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
				c.value = Q(Fe(n, 32, 18));
			} catch {
				f = !0, c.value = null;
			}
		}
		function h(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let g = null, _ = null, v = null, y = 0, b = !1;
		function S(e) {
			_ = e, g = e.requestVideoFrameCallback(C);
		}
		function C(e) {
			if (!b) return;
			e - y >= 250 && (y = e, m());
			let t = n.video;
			h(t) && S(t);
		}
		function T() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			if (h(e)) {
				b = !0, y = 0, S(e);
				return;
			}
			m(), !f && (b = !0, v = setInterval(m, 250));
		}
		function E() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		R(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			E(), e && t && T();
		}, { immediate: !0 }), M(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), j(() => {
			E(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let D = x(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (N(), w("div", {
			class: k(["player__ambient", { "is-active": o.value }]),
			style: A(o.value ? D.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), Be = {
	class: "resume",
	role: "region",
	"aria-label": "Resume playback"
}, Ve = { class: "resume__label" }, He = { class: "resume__time numeric" }, Ue = { class: "resume__actions" }, We = /*#__PURE__*/ e(/* @__PURE__ */ O({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n;
		return (n, i) => (N(), w("div", Be, [T("p", Ve, [
			i[2] ||= E(" Resume from ", -1),
			T("span", He, I(L(B)(e.seconds)), 1),
			i[3] ||= E("? ", -1)
		]), T("div", Ue, [T("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: i[0] ||= (e) => r("resume")
		}, [D(t, { name: "play" }), i[4] ||= T("span", null, "Resume", -1)]), T("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: i[1] ||= (e) => r("restart")
		}, [D(t, { name: "rewind" }), i[5] ||= T("span", null, "Start over", -1)])])]));
	}
}), [["__scopeId", "data-v-766eae6c"]]), Ge = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Ke = [
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
], qe = new Set(Ke);
function Je(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Ye(...e) {
	return e.some((e) => qe.has(Je(e)));
}
function Xe(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
var Ze = 8, Qe = 15, $e = 2 * Math.PI * 15;
function $(e, t, n = $e) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var et = {
	class: "upnext",
	role: "region",
	"aria-label": "Up next"
}, tt = ["src"], nt = { class: "upnext__body" }, rt = { class: "upnext__title" }, it = {
	key: 0,
	class: "upnext__cd numeric"
}, at = { class: "upnext__actions" }, ot = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, st = ["r"], ct = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], lt = /*#__PURE__*/ e(/* @__PURE__ */ O({
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
		let r = e, i = n, a = x(() => r.posterUrl ?? r.media.poster_url ?? null), o = x(() => $(r.remaining, r.total));
		return (n, r) => (N(), w("aside", et, [
			a.value ? (N(), w("img", {
				key: 0,
				class: "upnext__thumb",
				src: a.value,
				alt: "",
				loading: "lazy"
			}, null, 8, tt)) : C("", !0),
			T("div", nt, [
				r[3] ||= T("p", { class: "upnext__eyebrow" }, "Up next", -1),
				T("h4", rt, I(e.media.name), 1),
				e.counting ? (N(), w("p", it, "Starts in " + I(Math.max(0, e.remaining)) + "s", 1)) : C("", !0),
				T("div", at, [T("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => i("play-now")
				}, [D(t, { name: "play" }), r[2] ||= T("span", null, "Play now", -1)]), T("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => i("cancel")
				}, "Cancel")])
			]),
			e.counting ? (N(), w("svg", ot, [T("circle", {
				cx: "18",
				cy: "18",
				r: L(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, st), T("circle", {
				cx: "18",
				cy: "18",
				r: L(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": L($e),
				"stroke-dashoffset": o.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, ct)])) : C("", !0)
		]));
	}
}), [["__scopeId", "data-v-f81cfb02"]]), ut = {
	class: "transcode",
	role: "alert"
}, dt = { class: "transcode__card" }, ft = { class: "transcode__body" }, pt = /*#__PURE__*/ e(/* @__PURE__ */ O({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n;
		return (n, i) => (N(), w("div", ut, [T("div", dt, [
			D(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			i[3] ||= T("h3", { class: "transcode__heading" }, "Can’t play this file here", -1),
			T("p", ft, [e.title ? (N(), w(b, { key: 0 }, [E("“" + I(e.title) + "” is", 1)], 64)) : (N(), w(b, { key: 1 }, [E("This title is")], 64)), i[1] ||= E(" in a format your browser can’t play directly (for example MKV or HEVC). Transcoding isn’t available yet. ", -1)]),
			T("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => r("back")
			}, [D(t, { name: "arrow-left" }), i[2] ||= T("span", null, "Go back", -1)])
		])]));
	}
}), [["__scopeId", "data-v-4b751a55"]]), mt = { class: "player__stage" }, ht = ["src", "poster"], gt = { class: "player__meta" }, _t = { class: "player__meta-text" }, vt = { class: "player__title" }, yt = { class: "player__sub numeric" }, bt = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, xt = {
	key: 0,
	class: "player__center"
}, St = ["aria-label"], Ct = { class: "player__btnrow" }, wt = ["aria-label"], Tt = { class: "player__time numeric" }, Et = ["aria-label", "aria-pressed"], Dt = ["aria-label", "aria-pressed"], Ot = ["aria-label"], kt = /*#__PURE__*/ e(/* @__PURE__ */ O({
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
		let r = e, o = n, s = a(), c = i(), l = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], u = P(null), d = P(null), f = P(!0), m = P(!1), _ = P(!1), y = P(!1), O = P(!1), A = P(!1), ee = P(!1), te = x(() => O.value ? 1.35 : 1), V = P(Ye(r.streamUrl, r.media.path)), H = P(s.resumePositionFor(r.media.id) ?? 0), U = P(!V.value && H.value > 0), W = null, G = P(!1), K = P(8), q, re = x(() => s.upNext);
		function ie() {
			V.value = Ye(r.streamUrl, r.media.path), H.value = s.resumePositionFor(r.media.id) ?? 0, U.value = !V.value && H.value > 0, W = null, J(), G.value = !1;
		}
		function oe(e) {
			let t = u.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : W = Math.max(0, e));
		}
		function se() {
			oe(H.value), U.value = !1, u.value?.play()?.catch(() => {});
		}
		function ce() {
			W = null, oe(0), s.clearResume(r.media.id), U.value = !1, u.value?.play()?.catch(() => {});
		}
		function J() {
			q &&= (clearInterval(q), void 0);
		}
		function le() {
			K.value = 8, J(), q = setInterval(() => {
				--K.value, K.value <= 0 && (J(), fe());
			}, 1e3);
		}
		function ue() {
			s.upNext && (G.value = !0, c.autoplay && le());
		}
		function fe() {
			J(), G.value = !1;
			let e = s.next(r.streamUrlFor);
			e && o("play-next", e);
		}
		function _e() {
			J(), G.value = !1;
		}
		function ve() {
			Xe(u.value) && (V.value = !0);
		}
		let Y = P([]), ye = P([]), be = P(-1), xe = P(!1), Se = s.subtitleLang, Ce = x(() => Y.value.some((e) => e.language === s.subtitleLang));
		function X() {
			let e = u.value;
			Y.value = p(e), ye.value = g(e), be.value = h(e);
		}
		function we() {
			if (Ce.value) Se = s.subtitleLang, s.setSubtitle(null);
			else {
				let e = Se && Y.value.some((e) => e.language === Se) ? Se : Y.value[0]?.language ?? null;
				s.setSubtitle(e);
			}
			o("captions");
		}
		function Te(e) {
			v(u.value, e), be.value = e;
		}
		let Z = null, Ee, De = x(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		});
		function Oe() {
			let e = u.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Ae(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function je() {
			s.play();
		}
		function Me() {
			s.pause();
		}
		function Ne() {
			let e = u.value;
			e && (s.updateProgress(e.currentTime, e.duration, Ae(e)), s.setMediaPositionState());
		}
		function Pe() {
			let e = u.value;
			e && (e.volume = s.volume, e.muted = s.muted, e.playbackRate = s.rate, W !== null && (e.currentTime = e.duration ? Math.min(e.duration, W) : W, W = null), s.updateProgress(e.currentTime, e.duration, Ae(e)), s.setMediaPositionState(), X());
		}
		function Fe() {
			let e = u.value;
			e && s.updateProgress(e.currentTime, e.duration, Ae(e));
		}
		function Ie() {
			let e = u.value;
			e && (Math.abs(e.volume - s.volume) > .001 && s.setVolume(e.volume), e.muted !== s.muted && s.toggleMute());
		}
		function Le() {
			let e = u.value;
			e && e.playbackRate !== s.rate && s.setRate(e.playbackRate);
		}
		function Q(e) {
			let t = u.value;
			t && s.duration > 0 && (t.currentTime = Math.min(s.duration, Math.max(0, e)));
		}
		function Re() {
			_.value = !0, $();
		}
		function Be() {
			_.value = !1, $();
		}
		function Ve(e) {
			let t = l.reduce((e, t, n) => Math.abs(t - s.rate) < Math.abs(l[e] - s.rate) ? n : e, 0), n = l[Math.min(l.length - 1, Math.max(0, t + e))];
			s.setRate(n);
		}
		ae({
			playPause: Oe,
			seekBy: (e) => Q(s.position + e),
			frameStep: (e) => {
				s.playing || Q(s.position + e / 30);
			},
			volumeBy: (e) => s.setVolume(s.volume + e),
			toggleMute: He,
			toggleFullscreen: Ge,
			toggleCaptions: we,
			toggleTheater: Ue,
			togglePip: qe,
			seekToPercent: (e) => Q(e * s.duration),
			speedStep: Ve,
			toggleHelp: () => {
				y.value = !y.value;
			}
		}, { enabled: () => !y.value && !xe.value });
		function He() {
			s.toggleMute();
		}
		function Ue() {
			O.value = !O.value, o("theater", O.value);
		}
		R(() => s.muted, (e) => {
			let t = u.value;
			t && t.muted !== e && (t.muted = e);
		}), R(() => s.volume, (e) => {
			let t = u.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), R(() => s.rate, (e) => {
			let t = u.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function Ge() {
			if (typeof document > "u") return;
			let e = d.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function Ke() {
			m.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function qe() {
			let e = u.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function Je() {
			A.value = !0;
		}
		function Ze() {
			A.value = !1;
		}
		function Qe() {
			Ee &&= (clearTimeout(Ee), void 0);
		}
		function $e() {
			Qe(), !(!s.playing || _.value) && (Ee = setTimeout(() => {
				s.playing && !_.value && (f.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function $() {
			f.value = !0, $e();
		}
		R(() => s.playing, (e) => {
			e ? (U.value = !1, _e(), $e()) : (Qe(), f.value = !0);
		});
		let et = null;
		return M(() => {
			s.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), typeof document < "u" && (document.addEventListener("fullscreenchange", Ke), ee.value = document.pictureInPictureEnabled === !0), et = s.bindMediaSession({
				onPlay: () => void u.value?.play()?.catch(() => {}),
				onPause: () => u.value?.pause(),
				onSeek: (e) => Q(e)
			}), Z = u.value?.textTracks ?? null, Z?.addEventListener?.("addtrack", X), Z?.addEventListener?.("removetrack", X), X();
		}), R(() => r.media, (e) => {
			s.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), ie();
		}), j(() => {
			Qe(), J(), typeof document < "u" && document.removeEventListener("fullscreenchange", Ke), et?.(), Z?.removeEventListener?.("addtrack", X), Z?.removeEventListener?.("removetrack", X);
		}), (n, r) => (N(), w("div", {
			ref_key: "containerRef",
			ref: d,
			class: k(["player", {
				"is-chrome-hidden": !f.value,
				"is-theater": O.value
			}]),
			onPointermove: $,
			onPointerdown: $,
			onFocusin: $
		}, [D(ze, {
			video: u.value,
			enabled: L(c).atmosphere,
			playing: L(s).playing,
			"reduced-motion": L(c).effectiveReducedMotion,
			intensity: te.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), T("div", mt, [
			T("video", {
				ref_key: "videoRef",
				ref: u,
				class: "player__video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: je,
				onPause: Me,
				onTimeupdate: Ne,
				onLoadedmetadata: Pe,
				onProgress: Fe,
				onVolumechange: Ie,
				onRatechange: Le,
				onEnded: ue,
				onError: ve,
				onEnterpictureinpicture: Je,
				onLeavepictureinpicture: Ze,
				onClick: Oe
			}, null, 40, ht),
			r[9] ||= T("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[10] ||= T("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			T("div", gt, [T("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": "Back",
				onClick: r[0] ||= z((e) => o("back"), ["stop"])
			}, [D(t, { name: "arrow-left" })]), T("div", _t, [
				r[6] ||= T("p", { class: "player__eyebrow" }, "Now playing", -1),
				T("h2", vt, I(e.media.name), 1),
				T("div", yt, [(N(!0), w(b, null, F(De.value, (e, t) => (N(), w(b, { key: t }, [t > 0 && !e.cert ? (N(), w("span", bt, "·")) : C("", !0), T("span", { class: k({ player__cert: e.cert }) }, I(e.text), 3)], 64))), 128))])
			])]),
			V.value ? C("", !0) : (N(), w("div", xt, [T("button", {
				type: "button",
				class: k(["player__bigplay", { "is-playing": L(s).playing }]),
				"aria-label": L(s).playing ? "Pause" : "Play",
				onClick: z(Oe, ["stop"])
			}, [D(t, { name: L(s).playing ? "pause" : "play" }, null, 8, ["name"])], 10, St)])),
			D(ge, {
				video: u.value,
				language: L(s).subtitleLang,
				"style-config": L(c).captionStyle,
				lifted: f.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			V.value ? C("", !0) : (N(), w("div", {
				key: 1,
				class: "player__controls",
				onClick: r[3] ||= z(() => {}, ["stop"])
			}, [D(ne, {
				position: L(s).position,
				duration: L(s).duration,
				buffered: L(s).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: Q,
				onScrubStart: Re,
				onScrubEnd: Be
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), T("div", Ct, [
				T("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": L(s).playing ? "Pause" : "Play",
					onClick: Oe
				}, [D(t, { name: L(s).playing ? "pause" : "play" }, null, 8, ["name"])], 8, wt),
				T("span", Tt, [
					E(I(L(B)(L(s).position)), 1),
					r[7] ||= T("span", { class: "player__sep" }, " / ", -1),
					E(I(L(B)(L(s).duration)), 1)
				]),
				r[8] ||= T("span", { class: "player__grow" }, null, -1),
				D(pe),
				D(me),
				D(he, { qualities: e.qualities }, null, 8, ["qualities"]),
				D(ke, {
					open: xe.value,
					"onUpdate:open": r[1] ||= (e) => xe.value = e,
					tracks: Y.value,
					"audio-tracks": ye.value,
					"active-audio": be.value,
					onSelectAudio: Te
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				T("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": "Keyboard shortcuts",
					"aria-haspopup": "dialog",
					onClick: r[2] ||= (e) => y.value = !0
				}, [D(t, { name: "info" })]),
				ee.value ? (N(), w("button", {
					key: 0,
					type: "button",
					class: k(["player__iconbtn", { "is-on": A.value }]),
					"aria-label": A.value ? "Exit picture-in-picture" : "Picture-in-picture",
					"aria-pressed": A.value,
					onClick: qe
				}, [D(t, { name: "pip" })], 10, Et)) : C("", !0),
				T("button", {
					type: "button",
					class: k(["player__iconbtn", { "is-on": O.value }]),
					"aria-label": O.value ? "Exit theater mode" : "Theater mode",
					"aria-pressed": O.value,
					onClick: Ue
				}, [D(t, { name: "theater" })], 10, Dt),
				T("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": m.value ? "Exit fullscreen" : "Fullscreen",
					onClick: Ge
				}, [D(t, { name: m.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Ot)
			])])),
			U.value && !V.value ? (N(), S(We, {
				key: 2,
				seconds: H.value,
				onResume: se,
				onRestart: ce
			}, null, 8, ["seconds"])) : C("", !0),
			G.value && re.value && !V.value ? (N(), S(lt, {
				key: 3,
				media: re.value,
				remaining: K.value,
				total: L(8),
				counting: L(c).autoplay,
				onPlayNow: fe,
				onCancel: _e
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : C("", !0),
			V.value ? (N(), S(pt, {
				key: 4,
				title: e.media.name,
				onBack: r[4] ||= (e) => o("back")
			}, null, 8, ["title"])) : C("", !0),
			D(de, {
				open: y.value,
				onClose: r[5] ||= (e) => y.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-853f8f80"]]);
//#endregion
export { G as A, Fe as C, me as D, he as E, ae as F, ne as I, B as L, W as M, ie as N, pe as O, re as P, Le as S, ge as T, Ae as _, Ke as a, Re as b, Qe as c, Ye as d, $ as f, Me as g, je as h, Ge as i, K as j, de as k, Je as l, ze as m, pt as n, Ze as o, We as p, lt as r, $e as s, kt as t, Xe as u, Q as v, ke as w, Ie as x, Pe as y };

//# sourceMappingURL=Player-ayu012CK.js.map