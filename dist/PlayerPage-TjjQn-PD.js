import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-C0x49DFi.js";
import { n, t as r } from "./Modal-MQCGYrE6.js";
import { t as i } from "./useFocusTrap-DZxA3ZEr.js";
import { a } from "./usePreferencesStore-g-d6JBr9.js";
import { t as o } from "./useMessages-CI_jngTk.js";
import { c as s, l as c, r as l, t as u } from "./client-D7B7SMZj.js";
import { n as d, r as f } from "./useApiBase-CV_r-Kk4.js";
import { n as p, o as m } from "./media-query-BdY2RILB.js";
import { n as h, t as g } from "./ThumbRating-Da67Lpax.js";
import { a as _, n as v, o as y, r as b, t as x } from "./shortcuts-DGdfkJbu.js";
import { t as S } from "./Spinner-BzsmsoQs.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as C } from "./Button-Bi3-A35D.js";
import { t as w } from "./Slider-bREoH1yi.js";
import { t as T } from "./Select-BuaZ3Wk0.js";
import { t as E } from "./Skeleton-C0F2lCpC.js";
import { t as D } from "./EmptyState-qUL7hIJh.js";
import { n as O, o as k, r as A, t as te } from "./episode-order-C2yqgMeX.js";
import { a as ne, c as re, d as ie, f as ae, i as j, l as oe, n as se, o as M, r as ce, s as le, t as N, u as ue } from "./captions-DoP7ce5A.js";
import { n as de, t as fe } from "./SyncPlayModal-B-lbw0Ek.js";
import { Fragment as P, Transition as pe, computed as F, createBlock as I, createCommentVNode as L, createElementBlock as R, createElementVNode as z, createTextVNode as B, createVNode as V, defineComponent as H, inject as me, nextTick as he, normalizeClass as U, normalizeStyle as W, onBeforeUnmount as ge, onMounted as _e, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as Y, unref as X, watch as Z, withCtx as ve, withModifiers as ye } from "vue";
import { onBeforeRouteLeave as be, useRoute as xe, useRouter as Se } from "vue-router";
//#region src/components/player/format-time.ts
function Ce(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var we = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Te = { class: "scrubber__track" }, Ee = ["title"], De = { class: "scrubber__time numeric" }, Oe = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let { t: r } = o(), i = e, a = n, s = K(null), c = K(!1), l = K(!1), u = K(0), d = K(0), f = (e) => Math.min(1, Math.max(0, e)), p = F(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = F(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = F(() => (c.value || l.value) && i.duration > 0), g = F(() => c.value ? u.value : d.value), _ = F(() => g.value * i.duration), v = F(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = F(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = F(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = F(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
			if (!(i.duration <= 0)) {
				c.value = !0;
				try {
					s.value?.setPointerCapture?.(e.pointerId);
				} catch {}
				u.value = S(e), a("scrub-start"), e.preventDefault();
			}
		}
		function C(e) {
			let t = S(e);
			d.value = t, c.value && (u.value = t);
		}
		function w(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				a("seek", u.value * i.duration), a("scrub-end");
			}
		}
		function T() {
			l.value = !0;
		}
		function E() {
			l.value = !1;
		}
		function D(e) {
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
			a("seek", n), e.preventDefault();
		}
		return t({
			playedRatio: p,
			previewActive: h
		}), (t, n) => (G(), R("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": X(Ce)(e.position),
			"aria-label": X(r)("player.seek"),
			onPointerdown: ee,
			onPointermove: C,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: T,
			onPointerleave: E,
			onKeydown: D
		}, [z("div", Te, [
			z("div", {
				class: "scrubber__buffered",
				style: W({ transform: `scaleX(${m.value})` })
			}, null, 4),
			z("div", {
				class: "scrubber__played",
				style: W({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(G(!0), R(P, null, q(x.value, (e, t) => (G(), R("span", {
				key: t,
				class: "scrubber__tick",
				style: W({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Ee))), 128)),
			z("div", {
				class: U(["scrubber__head", { "is-dragging": c.value }]),
				style: W({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (G(), R("div", {
			key: 0,
			class: "scrubber__preview",
			style: W({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (G(), R("div", {
			key: 0,
			class: "scrubber__thumb",
			style: W({ backgroundImage: y.value })
		}, null, 4)) : L("", !0), z("span", De, J(X(Ce)(_.value)), 1)], 4)) : L("", !0)], 40, we));
	}
}), [["__scopeId", "data-v-3d610715"]]), ke = new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Q(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Ae(e) {
	return e === !0 || e === "true" || e === 1;
}
function je(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Me(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Q(e.url ?? e.src);
		r !== "" && t.push({
			index: je(e.index),
			language: Q(e.language ?? e.lang ?? e.srclang),
			label: Q(e.label),
			default: Ae(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Ne(e) {
	if (e == null || !Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = je(e.height);
		r <= 0 || t.push({
			id: Q(e.id),
			label: Q(e.label),
			height: r,
			width: je(e.width),
			bitrate: je(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Pe(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function Fe(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function Ie(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		masterUrl: Q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Q(t.status, "running"),
		reused: Ae(t.reused),
		subtitles: Me(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ne(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Le(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		status: Q(t.status, "running"),
		playlistReady: Ae(t.playlist_ready ?? t.playlistReady),
		progress: je(t.progress),
		masterUrl: Q(t.master_url ?? t.masterUrl),
		subtitles: Me(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ne(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Re(e) {
	return e.playlistReady || e.status === "completed";
}
function ze(e) {
	return ke.has(e);
}
function Be(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Ve(e) {
	let t = K("idle"), n = K(0), r = K([]), i = K([]), a = K(-1), o = K(!0), s = K(null), c = K(null), l = K([]), d = K(-1);
	function f(e) {
		if (!E) return;
		i.value = E.levels, a.value = E.getCurrentLevel(), o.value = E.autoLevelEnabled;
		let t = e ?? E.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function p() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function h(e) {
		E && (l.value = E.audioTracks, d.value = e ?? E.getCurrentAudioTrack());
	}
	function g() {
		l.value = [], d.value = -1;
	}
	function _(e) {
		!e || e.length === 0 || (c.value = e);
	}
	function v(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: Be(n, e.url)
		}));
	}
	let b = e.attach ?? y, x = e.pollIntervalMs ?? 1e3, S = e.maxWaitMs ?? 12e4, ee = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), C = Math.max(1, Math.ceil(S / Math.max(1, x))), w = He(), T = e.getToken ?? (() => Ue(w)), E = null, D = null, O = null, k = !1, A = null;
	function te() {
		return e.client ?? new u({
			baseUrl: e.apiBase(),
			tokenStore: w ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function ne(i, a, o, s) {
		j(), k = !1, A = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], p();
		try {
			let r = te(), c = Ie(await r.post(Pe(a, o), void 0, A.signal));
			if (k) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			v(c.subtitles), _(c.variants);
			let l = Be(e.apiBase(), c.masterUrl), u = c.status === "completed";
			for (let e = 0; !u && e < C; e++) {
				let e = Le(await r.get(Fe(c.jobId), void 0, A.signal));
				if (k) return;
				if (n.value = e.progress, v(e.subtitles), _(e.variants), ze(e.status)) throw Error(`transcode ${e.status}`);
				if (Re(e)) {
					u = !0;
					break;
				}
				if (await ee(x), k) return;
			}
			if (!u) throw Error("transcode timed out");
			if (E = await b(i, l, {
				getToken: T,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => f(),
				onError: () => {
					k || (t.value = "error");
				}
			}), k) {
				E.destroy(), E = null;
				return;
			}
			D = E.onLevelSwitched((e) => f(e)), O = E.onAudioTrackSwitched((e) => h(e)), f(), h();
			try {
				let e = m();
				e.hlsMasterUrl = l;
			} catch {}
			t.value = "ready";
		} catch {
			k || (t.value = "error");
		}
	}
	function re(e) {
		E && (E.setCurrentLevel(e === "auto" ? -1 : e), f());
	}
	function ie(e) {
		E && (E.setNextLevel(e === "auto" ? -1 : e), f());
	}
	function ae(e) {
		E && (E.setAudioTrack(e), h());
	}
	function j() {
		if (k = !0, A &&= (A.abort(), null), D) {
			try {
				D();
			} catch {}
			D = null;
		}
		if (O) {
			try {
				O();
			} catch {}
			O = null;
		}
		if (E) {
			try {
				E.destroy();
			} catch {}
			E = null;
		}
	}
	function oe() {
		j(), t.value = "idle", n.value = 0, r.value = [], p(), g();
	}
	return {
		state: t,
		progress: n,
		subtitleTracks: r,
		levels: i,
		currentLevel: a,
		autoEnabled: o,
		activeLevelHeight: s,
		variants: c,
		audioTracks: l,
		currentAudioTrack: d,
		setLevel: re,
		setNextLevel: ie,
		setAudioTrack: ae,
		start: ne,
		cleanup: j,
		reset: oe
	};
}
function He() {
	try {
		return new s();
	} catch {
		return null;
	}
}
function Ue(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var We = 10, Ge = 6;
function Ke(e) {
	let t = K(null), n = K(!1), r = K(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new u({ baseUrl: e.apiBase() });
	}
	function o(e, t) {
		if (!t || t.length === 0) return null;
		if (e >= t[t.length - 1].seconds) return t[t.length - 1];
		if (e <= t[0].seconds) return t[0];
		let n = 0, r = t.length - 1;
		for (; n < r;) {
			let i = Math.floor((n + r) / 2);
			t[i].seconds < e ? n = i + 1 : r = i;
		}
		if (n > 0 && t[n].seconds > e) {
			let r = t[n - 1], i = t[n], a = i.seconds - r.seconds;
			if (a > 0) {
				let t = (e - r.seconds) / a, n = r.frame + t * (i.frame - r.frame);
				return {
					seconds: e,
					frame: Math.round(n)
				};
			}
			return r;
		}
		return t[n];
	}
	function s(e) {
		let n = t.value;
		if (!n || !n.sprite_url || !n.timeline || n.timeline.length === 0) return null;
		let r = o(e, n.timeline);
		if (r === null) return null;
		let i = r.frame, a = i % We, s = Math.floor(i / We), c = a / (We - 1) * 100, l = s / (Ge - 1) * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function c(o, s) {
		if (!(i.has(o) && (t.value = i.get(o) ?? null, t.value !== null))) {
			n.value = !0, r.value = null;
			try {
				let n = s ?? e.signal, r = await a().getTrickplay(o, n);
				i.set(o, r), t.value = r;
			} catch (e) {
				i.set(o, null), r.value = e instanceof Error ? e.message : "Failed to load trickplay data", t.value = null;
			} finally {
				n.value = !1;
			}
		}
	}
	function l() {
		t.value = null, n.value = !1, r.value = null, i.clear();
	}
	return {
		data: t,
		loading: n,
		error: r,
		thumbnailAt: s,
		fetch: c,
		reset: l
	};
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var qe = ["aria-label"], Je = { class: "shortcuts__head" }, Ye = { class: "shortcuts__title" }, Xe = { class: "shortcuts__grid" }, Ze = { class: "shortcuts__keys" }, Qe = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, $e = {
	key: 1,
	class: "shortcuts__key"
}, et = { class: "shortcuts__label" }, tt = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => b }
	},
	emits: ["close"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o(), l = K(null);
		return i(l, Y(a, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (G(), R("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= ye((e) => s("close"), ["self"])
		}, [z("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [z("div", Je, [z("h3", Ye, J(X(c)("player.keyboard")), 1), V(n, {
			name: "x",
			label: X(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), z("ul", Xe, [(G(!0), R(P, null, q(e.shortcuts, (e) => (G(), R("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [z("span", Ze, [(G(!0), R(P, null, q(e.keys, (e, n) => (G(), R(P, { key: n }, [e === "–" ? (G(), R("span", Qe, "–")) : (G(), R("kbd", $e, [X(x)[e] ? (G(), I(t, {
			key: 0,
			name: X(x)[e],
			label: X(v)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), R(P, { key: 1 }, [B(J(e), 1)], 64))]))], 64))), 128))]), z("span", et, J(e.label), 1)]))), 128))])], 8, qe)])) : L("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), nt = { class: "volume" }, rt = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "VolumeControl",
	setup(e) {
		let t = m(), r = a(), { t: i } = o(), s = F(() => t.muted ? 0 : t.volume), c = F(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (G(), R("div", nt, [V(n, {
			name: c.value,
			label: X(t).muted ? X(i)("player.unmute") : X(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => X(t).toggleMute()
		}, null, 8, ["name", "label"]), V(w, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: X(i)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), it = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		], n = m(), { t: r } = o(), i = F(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), I(T, {
			class: "speed-menu",
			tone: "glass",
			"model-value": X(n).rate,
			options: i.value,
			label: X(r)("player.playbackSpeed"),
			"onUpdate:modelValue": a
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), at = "auto", ot = "original";
function st(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function ct(e) {
	return e >= 2160 ? "4K" : st(e);
}
function lt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = st(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: ct(r.height)
		}));
	}
	return n;
}
function ut(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) st(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function dt(e, t) {
	if (!t || !(t.height > 0)) return -1;
	let n = -1, r = Infinity;
	for (let i of e) {
		if (i.height !== t.height) continue;
		let e = Math.abs(i.bitrate - t.bitrate);
		e < r && (n = i.index, r = e);
	}
	return n >= 0 ? n : ut(e, st(t.height));
}
function ft(e, t) {
	if (t < 0) return at;
	let n = e.find((e) => e.index === t);
	return n ? st(n.height) : at;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var pt = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "QualityMenu",
	props: {
		levels: { default: () => [] },
		variants: { default: null },
		currentLevel: { default: -1 },
		autoEnabled: {
			type: Boolean,
			default: !0
		},
		activeHeight: { default: null }
	},
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = m(), s = a(), { t: c } = o(), l = F(() => lt(n.levels)), u = F(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!n.variants) return [];
			for (let r of [...n.variants].sort((e, t) => t.height - e.height)) {
				let i = st(r.height);
				e.has(i) || ut(n.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: ct(r.height)
				}));
			}
			return t;
		}), d = F(() => l.value.length >= 2 ? l.value : u.value), f = F(() => n.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), p = F(() => dt(n.levels, f.value)), h = F(() => f.value && p.value >= 0 ? {
			value: ot,
			label: c("player.qualityOriginal", { height: f.value.height })
		} : null), g = F(() => d.value.length >= 2), _ = F(() => n.activeHeight == null ? c("player.qualityAuto") : c("player.qualityAutoActive", { label: ct(n.activeHeight) })), v = F(() => [
			{
				value: at,
				label: _.value
			},
			...h.value ? [h.value] : [],
			...d.value
		]), y = F(() => n.autoEnabled ? at : h.value && n.currentLevel === p.value && (i.quality === "original" || s.defaultQuality === "original") ? ot : ft(n.levels, n.currentLevel));
		function b(e) {
			let t = String(e);
			if (t === "auto") {
				i.setQuality(t), s.defaultQuality = t, r("select", "auto");
				return;
			}
			let a = t === "original" ? p.value : ut(n.levels, t);
			a < 0 || (i.setQuality(t), s.defaultQuality = t, r("select", a));
		}
		return (e, t) => g.value ? (G(), I(T, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": y.value,
			options: v.value,
			label: X(c)("player.quality"),
			"onUpdate:modelValue": b
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-719cf103"]]), mt = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = F(() => re(n.styleConfig)), a = null, o = null;
		function s() {
			r.value = ie(a);
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
			c(), le(n.video, n.language);
			let e = ae(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", s), r.value = ie(e), !r.value.length) {
					let t = l(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", s));
				}
			} else r.value = [];
		}
		return Z(() => [n.video, n.language], u, { immediate: !0 }), ge(c), t({ lines: r }), (t, n) => r.value.length ? (G(), R("div", {
			key: 0,
			class: U(["player__captions", { "is-lifted": e.lifted }]),
			style: W(i.value)
		}, [(G(!0), R(P, null, q(r.value, (e, t) => (G(), R("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : L("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), ht = ["aria-label", "aria-expanded"], gt = ["aria-label"], _t = { class: "capmenu__head" }, vt = { class: "capmenu__title" }, yt = ["aria-label"], bt = ["aria-checked", "tabindex"], xt = { class: "capmenu__check" }, St = { class: "capmenu__optlabel" }, Ct = [
	"aria-checked",
	"tabindex",
	"onClick"
], wt = { class: "capmenu__check" }, Tt = { class: "capmenu__optlabel" }, Et = { class: "capmenu__title capmenu__title--sub" }, Dt = ["aria-label"], Ot = [
	"aria-checked",
	"tabindex",
	"onClick"
], kt = { class: "capmenu__check" }, At = { class: "capmenu__optlabel" }, jt = { class: "capmenu__title capmenu__title--sub" }, Mt = { class: "capmenu__style" }, Nt = { class: "capmenu__field" }, Pt = { class: "capmenu__fieldlabel" }, Ft = { class: "capmenu__field" }, It = { class: "capmenu__fieldlabel" }, Lt = { class: "capmenu__field" }, Rt = { class: "capmenu__fieldlabel" }, zt = { class: "capmenu__field" }, Bt = { class: "capmenu__fieldlabel" }, Vt = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
	setup(e, { emit: r }) {
		let s = e, c = r, l = m(), u = a(), { t: d } = o(), f = K(null), p = K(null), h = F(() => l.subtitleLang), g = F(() => s.tracks.some((e) => e.language === h.value)), _ = F(() => g.value ? "captions" : "captions-off"), v = F(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = F(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function b(e) {
			c("update:open", e);
		}
		function x() {
			b(!1);
		}
		function S(e) {
			l.setSubtitle(e), u.defaultSubtitleLang = e, u.subtitlePreferenceSet = !0;
		}
		function ee(e) {
			c("select-audio", e);
		}
		function C(e, t, n) {
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
		function w(e) {
			let t = C(e, s.tracks.length + 1, v.value);
			t !== null && S(t === 0 ? null : s.tracks[t - 1].language);
		}
		function E(e) {
			let t = C(e, s.audioTracks.length, y.value);
			t !== null && ee(s.audioTracks[t].index);
		}
		function D(e) {
			u.captionStyle = {
				...u.captionStyle,
				size: e
			};
		}
		function O(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function k(e) {
			u.captionStyle = {
				...u.captionStyle,
				background: e
			};
		}
		function A(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		i(p, Y(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function te(e) {
			f.value && !f.value.contains(e.target) && x();
		}
		return Z(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", te, !0) : document.removeEventListener("pointerdown", te, !0));
		}, { immediate: !0 }), ge(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", te, !0);
		}), (r, i) => (G(), R("div", {
			ref_key: "rootEl",
			ref: f,
			class: "capmenu"
		}, [z("button", {
			type: "button",
			class: U(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? X(d)("player.captionsOn") : X(d)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [V(t, { name: _.value }, null, 8, ["name"])], 10, ht), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			z("div", _t, [z("h3", vt, J(X(d)("player.subtitles")), 1), V(n, {
				name: "x",
				label: X(d)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(d)("player.subtitleTrack"),
				onKeydown: w
			}, [z("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => S(null)
			}, [z("span", xt, [g.value ? L("", !0) : (G(), I(t, {
				key: 0,
				name: "check"
			}))]), z("span", St, J(X(d)("player.off")), 1)], 8, bt), (G(!0), R(P, null, q(e.tracks, (e, n) => (G(), R("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [z("span", wt, [h.value === e.language ? (G(), I(t, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", Tt, J(e.label), 1)], 8, Ct))), 128))], 40, yt),
			e.audioTracks.length > 1 ? (G(), R(P, { key: 0 }, [z("h3", Et, J(X(d)("player.audio")), 1), z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(d)("player.audioTrack"),
				onKeydown: E
			}, [(G(!0), R(P, null, q(e.audioTracks, (n) => (G(), R("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => ee(n.index)
			}, [z("span", kt, [e.activeAudio === n.index ? (G(), I(t, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", At, J(n.label), 1)], 8, Ot))), 128))], 40, Dt)], 64)) : L("", !0),
			z("h3", jt, J(X(d)("player.captionStyle")), 1),
			z("div", Mt, [
				z("div", Nt, [z("span", Pt, J(X(d)("player.size")), 1), V(T, {
					"model-value": X(u).captionStyle.size,
					options: X(j),
					label: X(d)("player.captionSize"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", Ft, [z("span", It, J(X(d)("player.color")), 1), V(T, {
					"model-value": X(u).captionStyle.textColor,
					options: X(se),
					label: X(d)("player.captionColor"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", Lt, [z("span", Rt, J(X(d)("player.background")), 1), V(T, {
					"model-value": X(u).captionStyle.background,
					options: X(N),
					label: X(d)("player.captionBackground"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", zt, [z("span", Bt, J(X(d)("player.edge")), 1), V(T, {
					"model-value": X(u).captionStyle.edge,
					options: X(ce),
					label: X(d)("player.captionEdge"),
					"onUpdate:modelValue": A
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, gt)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-bce771b9"]]), Ht = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Ut(e, t, n, r, i, a, o) {
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
		r: Ht(d / m),
		g: Ht(f / m),
		b: Ht(p / m)
	};
}
function Wt(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Ut(e, t, n, 0, 0, r, n),
		right: Ut(e, t, n, t - r, 0, t, n),
		center: Ut(e, t, n, 0, 0, t, n)
	};
}
function Gt({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Kt(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Gt(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Gt(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Gt(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function qt(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Jt = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let n = e, r = K(!1), i = null;
		function a() {
			r.value = qt(i);
		}
		let o = F(() => n.enabled && !n.reducedMotion && !r.value), s = F(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = K(null), l = null, u = null, d = !1, f = !1;
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
				c.value = Kt(Wt(n, 32, 18));
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
		function C() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		Z(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			C(), e && t && ee();
		}, { immediate: !0 }), _e(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ge(() => {
			C(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let w = F(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (G(), R("div", {
			class: U(["player__ambient", { "is-active": o.value }]),
			style: W(o.value ? w.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Yt = ["aria-label"], Xt = { class: "resume__label" }, Zt = { class: "resume__time numeric" }, $ = { class: "resume__actions" }, Qt = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o(), a = F(() => i("player.resumeFrom").split("{time}"));
		return (n, o) => (G(), R("div", {
			class: "resume",
			role: "region",
			"aria-label": X(i)("player.resumePlayback")
		}, [z("p", Xt, [
			B(J(a.value[0]), 1),
			z("span", Zt, J(X(Ce)(e.seconds)), 1),
			B(J(a.value[1]), 1)
		]), z("div", $, [z("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: o[0] ||= (e) => r("resume")
		}, [V(t, { name: "play" }), z("span", null, J(X(i)("player.resume")), 1)]), z("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: o[1] ||= (e) => r("restart")
		}, [V(t, { name: "rewind" }), z("span", null, J(X(i)("player.startOver")), 1)])])], 8, Yt));
	}
}), [["__scopeId", "data-v-271c5209"]]), $t = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], en = new Set([
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
]);
function tn(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function nn(...e) {
	return e.some((e) => en.has(tn(e)));
}
function rn(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function an(e) {
	return e?.error?.code === 2;
}
function on(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = typeof e.index == "number" && Number.isInteger(e.index) && e.index >= 0 ? e.index : t.length, i = typeof e.language == "string" ? e.language : "", a = typeof e.title == "string" ? e.title : "", o = e.stream_index ?? e.streamIndex, s = typeof e.codec == "string" ? e.codec : "";
		t.push({
			index: r,
			streamIndex: typeof o == "number" ? o : r,
			language: i,
			label: a || i || `Audio ${r + 1}`,
			default: e.default === !0,
			codec: s
		});
	}
	return t;
}
var sn = 2 * Math.PI * 15;
function cn(e, t, n = sn) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var ln = new Map([
	["aac", "mp4a.40.2"],
	["aac-latm", "mp4a.40.2"],
	["ac3", "ac-3"],
	["eac3", "ec-3"],
	["ec3", "ec-3"],
	["dts", "dtsc"],
	["dtshd", "dtshd"],
	["mp3", "mp4a.40.34"],
	["opus", "opus"],
	["vorbis", "vorbis"],
	["flac", "flac"],
	["truehd", "mlp"]
]), un = [
	"video/mp4; codecs=\"hvc1.1.4.L120.90\"",
	"video/mp4; codecs=\"hev1.1.4.L120.90\"",
	"video/mp4; codecs=\"hvc1.1.6.L93.B0\"",
	"video/mp4; codecs=\"hvc1.1.4.L120\""
];
function dn(e, t = "video/mp4") {
	let n = ln.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function fn(e, t = "video/mp4") {
	if (!e) return !0;
	let n = dn(e, t);
	if (!n) return !1;
	if (typeof navigator < "u" && typeof navigator.mediaCapabilities?.decodingInfo == "function") try {
		return (await navigator.mediaCapabilities.decodingInfo({
			type: "media-source",
			video: {
				contentType: t,
				width: 1920,
				height: 1080,
				bitrate: 1e7,
				framerate: 30
			},
			audio: {
				contentType: n,
				channels: 6,
				bitrate: 384e3,
				samplerate: 48e3
			}
		})).supported;
	} catch {}
	if (typeof document < "u") {
		let e = document.createElement("video").canPlayType(n);
		return e === "probably" || e === "maybe";
	}
	return !1;
}
async function pn() {
	if (typeof navigator > "u") return !1;
	let e = navigator.mediaCapabilities;
	if (e && typeof e.decodingInfo == "function") try {
		if ((await e.decodingInfo({
			type: "media-source",
			video: {
				contentType: "video/mp4",
				width: 3840,
				height: 2160,
				bitrate: 5e7,
				framerate: 60
			}
		})).supported) return !0;
	} catch {}
	if (typeof document < "u") {
		let e = document.createElement("video");
		for (let t of un) {
			let n = e.canPlayType(t);
			if (n === "probably" || n === "maybe") return !0;
		}
	}
	return !1;
}
async function mn(e, t) {
	if (nn(...e)) return !0;
	let n = e.map((e) => tn(e)).find((e) => $t.includes(e)) ?? "", r = n ? `video/${n}` : "video/mp4";
	if ($t.includes(n) && t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await fn(e.codec, r) || (n === "mp4" || n === "m4v") && !await pn()) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var hn = ["aria-label"], gn = ["src"], _n = { class: "upnext__body" }, vn = { class: "upnext__eyebrow" }, yn = { class: "upnext__title" }, bn = {
	key: 0,
	class: "upnext__cd numeric"
}, xn = { class: "upnext__actions" }, Sn = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Cn = ["r"], wn = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Tn = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let { t: r } = o(), i = e, a = n, s = F(() => i.posterUrl ?? i.media.poster_url ?? null), c = F(() => cn(i.remaining, i.total));
		return (n, i) => (G(), R("aside", {
			class: "upnext",
			role: "region",
			"aria-label": X(r)("player.upNext")
		}, [
			s.value ? (G(), R("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, gn)) : L("", !0),
			z("div", _n, [
				z("p", vn, J(X(r)("player.upNext")), 1),
				z("h4", yn, J(e.media.name), 1),
				e.counting ? (G(), R("p", bn, J(X(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : L("", !0),
				z("div", xn, [z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [V(t, { name: "play" }), z("span", null, J(X(r)("player.playNow")), 1)]), z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, J(X(r)("player.cancel")), 1)])
			]),
			e.counting ? (G(), R("svg", Sn, [z("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Cn), z("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": X(sn),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, wn)])) : L("", !0)
		], 8, hn));
	}
}), [["__scopeId", "data-v-85909b2d"]]), En = {
	class: "transcode",
	role: "alert"
}, Dn = { class: "transcode__card" }, On = { class: "transcode__heading" }, kn = { class: "transcode__body" }, An = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o();
		return (n, a) => (G(), R("div", En, [z("div", Dn, [
			V(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			z("h3", On, J(X(i)("player.transcodeHeading")), 1),
			z("p", kn, J(e.title ? X(i)("player.transcodeBodyTitled", { title: e.title }) : X(i)("player.transcodeBodyUntitled")), 1),
			z("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [V(t, { name: "arrow-left" }), z("span", null, J(X(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), jn = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Mn = { class: "prep__card" }, Nn = { class: "prep__heading" }, Pn = { class: "prep__body" }, Fn = ["aria-valuenow"], In = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = o(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (G(), R("div", jn, [z("div", Mn, [
			V(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			z("h3", Nn, J(X(r)("player.transcodePreparingHeading")), 1),
			z("p", Pn, J(e.title ? X(r)("player.transcodePreparingTitled", { title: e.title }) : X(r)("player.transcodePreparingUntitled")), 1),
			z("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [z("div", {
				class: "prep__bar-fill",
				style: W({ width: i() + "%" })
			}, null, 4)], 8, Fn),
			z("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [V(t, { name: "arrow-left" }), z("span", null, J(X(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Ln = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: n }) {
		let r = e, i = n, { t: a } = o();
		function s(e, t) {
			return !!t && t.end > t.start && e >= t.start && e < t.end;
		}
		let c = F(() => s(r.position, r.introMarker) ? {
			label: a("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: a("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (G(), I(pe, { name: "skip" }, {
			default: ve(() => [c.value ? (G(), R("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: ye(l, ["stop"])
			}, [z("span", null, J(c.value.label), 1), V(t, { name: "skip-forward" })])) : L("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Rn = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, zn = ["aria-label", "onClick"], Bn = { class: "skip-controls__label" }, Vn = 5, Hn = 30, Un = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(e, { emit: n }) {
		let r = e, i = n, { t: a } = o();
		function s(e) {
			return e / 1e3;
		}
		function c(e, t) {
			return t >= s(e.endMs);
		}
		function l(e, t) {
			if (c(e, t)) return !1;
			let n = s(e.startMs), r = n - Vn, i = n + Hn;
			return t >= r && t < i;
		}
		let u = [
			"intro",
			"outro",
			"credits"
		];
		function d(e) {
			switch (e) {
				case "intro": return a("player.skipLabelIntro");
				case "outro": return a("player.skipLabelCredits");
				case "credits": return a("player.skipLabelCredits");
				case "ad": return a("player.skipLabelSkipCredits");
			}
		}
		let f = F(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (G(), R("div", Rn, [(G(!0), R(P, null, q(f.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: ye((t) => p(e), ["stop"])
		}, [z("span", Bn, J(d(e.type)), 1), V(t, { name: "skip-forward" })], 8, zn))), 128))])) : L("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Wn = ["aria-label", "aria-expanded"], Gn = ["aria-label"], Kn = { class: "chapterlist__head" }, qn = { class: "chapterlist__title" }, Jn = ["aria-label"], Yn = ["onClick"], Xn = { class: "chapterlist__index" }, Zn = { class: "chapterlist__name" }, Qn = { class: "chapterlist__meta" }, $n = { class: "chapterlist__time" }, er = {
	key: 0,
	class: "chapterlist__duration"
}, tr = {
	key: 1,
	class: "chapterlist__empty"
}, nr = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "ChapterList",
	props: {
		chapters: { default: () => [] },
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "seek"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o();
		function l() {
			s("update:open", !1);
		}
		function u() {
			s("update:open", !a.open);
		}
		let d = F(() => a.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Ce(e.start), a;
			return e.end != null && e.end > e.start && (a = Ce(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = K(null), p = K(null);
		i(p, Y(a, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		Z(() => a.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), ge(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (G(), R("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [z("button", {
			type: "button",
			class: U(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": X(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [V(t, { name: "list" })], 10, Wn), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(c)("player.chapterList"),
			tabindex: "-1"
		}, [z("div", Kn, [z("h3", qn, J(X(c)("player.chapters")), 1), V(n, {
			name: "x",
			label: X(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (G(), R("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": X(c)("player.chapterList")
		}, [(G(!0), R(P, null, q(d.value, (e) => (G(), R("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [z("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			z("span", Xn, J(e.index), 1),
			z("span", Zn, J(e.label), 1),
			z("span", Qn, [z("span", $n, J(e.startLabel), 1), e.durationLabel ? (G(), R("span", er, "· " + J(e.durationLabel), 1)) : L("", !0)])
		], 8, Yn)]))), 128))], 8, Jn)) : (G(), R("p", tr, J(X(c)("player.noChapters")), 1))], 8, Gn)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), rr = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, ir = { class: "marker-timeline__ticks" }, ar = [
	"title",
	"aria-label",
	"onClick"
], or = { class: "marker-timeline__tooltip" }, sr = { class: "marker-timeline__tooltip-label" }, cr = { class: "marker-timeline__tooltip-time numeric" }, lr = ["onClick"], ur = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "MarkerTimeline",
	props: {
		position: {},
		duration: {},
		markers: {}
	},
	emits: ["seek", "similar"],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function i(e) {
			return e / 1e3;
		}
		let a = {
			intro: "var(--marker-intro, #3b82f6)",
			outro: "var(--marker-outro, #f97316)",
			credits: "var(--marker-credits, #a855f7)",
			ad: "var(--marker-ad, #ef4444)"
		};
		function o(e) {
			return a[e];
		}
		let s = F(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = F(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = F(() => c.value !== null), u = F(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (G(), R("div", {
			key: 0,
			class: U(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (G(), R("div", rr, [t[0] ||= z("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [z("polygon", { points: "5,3 19,12 5,21" })], -1), B(" " + J(u.value), 1)])) : L("", !0), z("div", ir, [(G(!0), R(P, null, q(s.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: U(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: W({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${X(Ce)(e.startSec)}`,
			"aria-label": `${e.label} at ${X(Ce)(e.startSec)}`,
			onClick: ye((t) => d(e), ["stop"])
		}, [z("span", or, [
			z("span", sr, J(e.label), 1),
			z("span", cr, J(X(Ce)(e.startSec)), 1),
			z("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: ye((t) => f(e), ["stop"])
			}, " Find similar ", 8, lr)
		])], 14, ar))), 128))])], 2)) : L("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), dr = ["aria-label", "aria-expanded"], fr = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, pr = ["aria-label"], mr = ["aria-selected", "onClick"], hr = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(e, { expose: n }) {
		let r = e, { t: i } = o(), a = [
			{
				label: "Off",
				value: 0
			},
			{
				label: "5m",
				value: 300
			},
			{
				label: "15m",
				value: 900
			},
			{
				label: "30m",
				value: 1800
			},
			{
				label: "45m",
				value: 2700
			},
			{
				label: "60m",
				value: 3600
			},
			{
				label: "90m",
				value: 5400
			}
		], s = K(0), c = K(0), l = F(() => c.value > 0), u;
		function d() {
			u &&= (clearInterval(u), void 0);
		}
		function f(e) {
			d(), c.value = e, !(e <= 0) && (u = setInterval(() => {
				--c.value, c.value <= 0 && (d(), c.value = 0, r.onExpire());
			}, 1e3));
		}
		function p(e) {
			s.value = e, e === 0 ? (d(), c.value = 0) : f(e);
		}
		function m(e) {
			let t = Math.floor(e / 60), n = e % 60;
			return `${t}:${String(n).padStart(2, "0")}`;
		}
		let h = K(!1);
		function g() {
			l.value ? (p(0), h.value = !1) : h.value = !h.value;
		}
		function _(e) {
			p(e), h.value = !1;
		}
		return ge(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (G(), R("div", { class: U(["sleep-timer", { "is-active": l.value }]) }, [z("button", {
			type: "button",
			class: U(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : X(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [V(t, { name: "moon" }), l.value ? (G(), R("span", fr, J(m(c.value)), 1)) : L("", !0)], 10, dr), V(pe, { name: "dropdown" }, {
			default: ve(() => [h.value ? (G(), R("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": X(i)("player.sleepTimer")
			}, [(G(), R(P, null, q(a, (e) => z("li", {
				key: e.value,
				class: U(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, J(e.label), 11, mr)), 64))], 8, pr)) : L("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), gr = {
	key: 0,
	class: "syncplay-overlay"
}, _r = { class: "syncplay-overlay__badge" }, vr = { class: "syncplay-overlay__label" }, yr = { class: "syncplay-overlay__status-label" }, br = { class: "syncplay-overlay__members" }, xr = { class: "syncplay-overlay__member-count" }, Sr = { class: "syncplay-overlay__member-list" }, Cr = { class: "syncplay-overlay__member-name" }, wr = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Tr = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = o(), i = de(), a = d(), s = F(() => n.apiBase ?? a.value), c = F(() => i.currentRoom?.name ?? "SyncPlay"), l = F(() => i.onlineMembers.length), u = F(() => i.syncStatus), f = F(() => {
			switch (u.value) {
				case "synced": return r("syncplay.synced");
				case "outOfSync": return r("syncplay.outOfSync");
				case "re-syncing": return r("syncplay.reSyncing");
				default: return r("syncplay.synced");
			}
		}), p = F(() => {
			switch (u.value) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		});
		async function m() {
			await i.leaveRoom(s.value);
		}
		return (e, n) => X(i).isInRoom ? (G(), R("div", gr, [
			z("div", _r, [V(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), z("span", vr, "SyncPlay: " + J(c.value), 1)]),
			z("div", { class: U(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [V(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), z("span", yr, J(f.value), 1)], 2),
			z("div", br, [z("span", xr, [V(t, { name: "user" }), B(" " + J(l.value) + " " + J(X(r)("syncplay.members", { count: l.value })), 1)]), z("ul", Sr, [(G(!0), R(P, null, q(X(i).onlineMembers.slice(0, 5), (e) => (G(), R("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= z("span", { class: "syncplay-overlay__member-dot" }, null, -1), z("span", Cr, J(e.name), 1)]))), 128)), X(i).onlineMembers.length > 5 ? (G(), R("li", wr, " +" + J(X(i).onlineMembers.length - 5) + " more ", 1)) : L("", !0)])]),
			V(C, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: ve(() => [B(J(X(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), Er = {
	key: 0,
	class: "syncplay-controls"
}, Dr = ["aria-label"], Or = { class: "syncplay-controls__wait-label" }, kr = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, Ar = { key: 0 }, jr = { class: "syncplay-controls__transport" }, Mr = ["aria-label"], Nr = ["aria-label"], Pr = ["aria-label"], Fr = { class: "syncplay-controls__status-label" }, Ir = 10, Lr = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "SyncPlayControls",
	props: {
		position: {},
		duration: {},
		isPlaying: { type: Boolean },
		isBuffering: { type: Boolean },
		apiBase: {}
	},
	emits: [
		"seek",
		"play",
		"pause"
	],
	setup(e, { emit: n }) {
		let r = e, i = n, { t: a } = o(), s = de(), c = d(), l = F(() => r.apiBase ?? c.value), u = K(!1), f = K([]), p = F(() => u.value || s.syncStatus === "re-syncing");
		async function m() {
			if (s.isInRoom) try {
				await s.sendCommand(l.value, "play"), i("play");
			} catch (e) {
				console.error("[SyncPlay] Failed to send play command:", e);
			}
		}
		async function h() {
			if (s.isInRoom) try {
				await s.sendCommand(l.value, "pause"), i("pause");
			} catch (e) {
				console.error("[SyncPlay] Failed to send pause command:", e);
			}
		}
		async function g() {
			r.isPlaying ? await h() : await m();
		}
		async function _(e) {
			if (s.isInRoom) try {
				await s.sendCommand(l.value, "seek", { position: e }), i("seek", e);
			} catch (e) {
				console.error("[SyncPlay] Failed to send seek command:", e);
			}
		}
		async function v() {
			await _(Math.max(0, r.position - Ir));
		}
		async function y() {
			await _(Math.min(r.duration, r.position + Ir));
		}
		return Z(() => s.syncStatus, (e) => {
			e === "re-syncing" ? u.value = !0 : e === "synced" && (u.value = !1, f.value = []);
		}), (n, r) => X(s).isInRoom ? (G(), R("div", Er, [
			p.value ? (G(), R("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": X(a)("syncplay.waitingForMembers")
			}, [
				V(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				z("span", Or, J(X(a)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (G(), R("span", kr, [B(J(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (G(), R("span", Ar, "+" + J(f.value.length - 3), 1)) : L("", !0)])) : L("", !0)
			], 8, Dr)) : L("", !0),
			z("div", jr, [
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(a)("syncplay.rewind"),
					onClick: v
				}, [V(t, { name: "rewind" })], 8, Mr),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? X(a)("syncplay.pauseAll") : X(a)("syncplay.playAll"),
					onClick: g
				}, [V(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Nr),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(a)("syncplay.fastForward"),
					onClick: y
				}, [V(t, { name: "forward" })], 8, Pr)
			]),
			z("div", { class: U(["syncplay-controls__status", `syncplay-controls__status--${X(s).syncStatus}`]) }, [V(t, {
				name: X(s).syncStatus === "synced" ? "check" : X(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), z("span", Fr, J(X(s).syncStatus === "synced" ? X(a)("syncplay.synced") : X(s).syncStatus === "outOfSync" ? X(a)("syncplay.outOfSync") : X(a)("syncplay.reSyncing")), 1)], 2)
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), Rr = { class: "player__stage" }, zr = ["src", "poster"], Br = [
	"src",
	"srclang",
	"label",
	"default"
], Vr = { class: "player__meta" }, Hr = ["aria-label"], Ur = { class: "player__meta-text" }, Wr = { class: "player__eyebrow" }, Gr = { class: "player__title" }, Kr = { class: "player__sub numeric" }, qr = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Jr = {
	key: 0,
	class: "player__center"
}, Yr = ["aria-label"], Xr = { class: "player__btnrow" }, Zr = ["aria-label"], Qr = ["aria-label"], $r = ["aria-label"], ei = { class: "player__time numeric" }, ti = ["aria-label", "aria-pressed"], ni = ["aria-label"], ri = ["aria-label"], ii = ["aria-label", "aria-pressed"], ai = ["aria-label", "aria-pressed"], oi = ["aria-label"], si = { class: "similar-modal" }, ci = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, li = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, ui = { class: "similar-modal__state-title" }, di = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, fi = {
	key: 3,
	class: "similar-modal__results"
}, pi = { class: "similar-modal__poster" }, mi = ["src", "alt"], hi = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, gi = { class: "similar-modal__result-body" }, _i = { class: "similar-modal__result-title" }, vi = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, yi = { key: 0 }, bi = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {},
		idleTimeout: {},
		chapters: {},
		introMarker: {},
		outroMarker: {},
		markers: {},
		thumbnailAt: { type: Function },
		streamUrlFor: { type: Function },
		apiBase: {},
		prevEpisode: {},
		nextEpisode: {},
		playbackAudioTracks: {},
		playbackSubtitleTracks: {},
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
		let i = e, s = n, c = m(), u = a(), { t: d } = o(), f = de(), p = h(), v = F(() => p.isFavorite(i.media.id)), y = F(() => p.likeLevel(i.media.id));
		function b() {
			p.toggleFavorite(i.media.id, le());
		}
		function x(e) {
			p.setLike(i.media.id, e, le());
		}
		let ee = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], C = K(null), w = K(null), T = K(!0), E = K(!1), D = K(!1), O = K(!1), k = K(!1), A = K(!1), te = K(!1), re = K(null), ie = K(!1), ae = F(() => k.value ? 1.35 : 1), j = K(nn(i.streamUrl, i.media.path));
		async function se() {
			if (j.value) return;
			let e = i.playbackAudioTracks ?? [];
			e.length !== 0 && await mn([i.streamUrl, i.media.path], e) && (j.value = !0);
		}
		Z(() => i.playbackAudioTracks, (e) => {
			!e || e.length === 0 || se();
		}, { immediate: !1 });
		let ce = me("phlixConfig", null);
		function le() {
			return ce?.apiBase ?? "";
		}
		let N = Ve({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: ce?.playerHlsConfig
		}), pe = Ke({ apiBase: () => i.apiBase ?? "" }), H = F(() => i.thumbnailAt ?? pe.thumbnailAt), W = F(() => j.value ? void 0 : i.streamUrl), Y = F(() => j.value && N.state.value !== "ready"), be = F(() => j.value && (N.state.value === "preparing" || N.state.value === "idle")), xe = F(() => j.value && N.state.value === "error");
		function Se(e = 0) {
			let t = C.value;
			t && N.start(t, i.media.id, void 0, e);
		}
		function we(e) {
			N.setLevel(e);
		}
		let Te = !1;
		Z(() => N.levels.value, (e) => {
			if (Te || e.length === 0) return;
			Te = !0;
			let t = u.defaultQuality;
			if (!t || t === "auto") return;
			let n = t === "original" ? dt(e, N.variants.value?.find((e) => e.id === "original") ?? null) : ut(e, t);
			n >= 0 && N.setNextLevel(n);
		});
		let Ee = K(c.resumePositionFor(i.media.id) ?? 0), De = K(!j.value && Ee.value > 0), ke = null, Q = K(!1), Ae = K(8), je, Me = K(null), Ne = K(0), Pe = K(!1), Fe = K([]), Ie = K(!1), Le = K(null);
		function Re(e, t) {
			Me.value = e, Ne.value = t, Fe.value = [], Le.value = null, Pe.value = !0, Be(e, t);
		}
		let ze = null;
		async function Be(e, t) {
			ze?.abort(), ze = new AbortController(), Ie.value = !0, Le.value = null;
			try {
				let n = await l.searchByMarker(e, t, 30, 20, ze.signal);
				Fe.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Le.value = "Failed to load similar media. Please try again.", Fe.value = [];
			} finally {
				Ie.value = !1;
			}
		}
		function He() {
			ze?.abort(), Pe.value = !1, Fe.value = [], Le.value = null, Me.value = null;
		}
		let Ue = F(() => c.upNext);
		function We() {
			j.value = nn(i.streamUrl, i.media.path), se(), Ee.value = c.resumePositionFor(i.media.id) ?? 0, De.value = !j.value && Ee.value > 0, ke = null, Pt = !1, St = !1, Ct = !1, ht.value = -1, kt = null, Te = !1, Ye(), Q.value = !1, N.reset(), C.value && (C.value.currentTime = 0), j.value && Se(), pe.fetch(i.media.id);
		}
		function Ge(e) {
			let t = C.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : ke = Math.max(0, e));
		}
		function qe() {
			Ge(Ee.value), De.value = !1, C.value?.play()?.catch(() => {});
		}
		function Je() {
			ke = null, Ge(0), c.clearResume(i.media.id), De.value = !1, C.value?.play()?.catch(() => {});
		}
		function Ye() {
			je &&= (clearInterval(je), void 0);
		}
		function Xe() {
			Ae.value = 8, Ye(), je = setInterval(() => {
				--Ae.value, Ae.value <= 0 && (Ye(), Qe());
			}, 1e3);
		}
		function Ze() {
			yn(), T.value = !0, c.upNext && (Q.value = !0, u.autoplay && Xe());
		}
		function Qe() {
			Ye(), Q.value = !1;
			let e = c.next(i.streamUrlFor);
			e && s("play-next", e);
		}
		function $e() {
			Ye(), Q.value = !1;
		}
		function et() {
			if (j.value) return;
			let e = C.value, t = an(e) && (e?.currentTime ?? 0) === 0;
			(rn(e) || t) && (j.value = !0, Se(e?.currentTime ?? 0));
		}
		let nt = K([]), at = K([]), ot = K(-1), st = K(!1), ct = F(() => N.state.value === "ready" && N.audioTracks.value.length > 0), lt = F(() => N.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), ft = F(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), ht = K(-1), gt = F(() => !ct.value && !j.value && at.value.length === 0 && ft.value.length > 1), _t = F(() => ct.value ? lt.value : gt.value ? ft.value : at.value), vt = F(() => {
			if (ct.value) return N.currentAudioTrack.value;
			if (gt.value) {
				if (ht.value >= 0) return ht.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return ot.value;
		}), yt = K(!1), bt = c.subtitleLang, xt = F(() => j.value ? N.subtitleTracks.value : i.playbackSubtitleTracks ?? []), St = !1, Ct = !1;
		function wt() {
			if (St) return;
			if (u.subtitlePreferenceSet) {
				St = !0;
				return;
			}
			let e = xt.value.find((e) => e.default);
			if (!e) return;
			let t = nt.value.find((t) => t.language === (e.language || e.label));
			t && (c.setSubtitle(t.language), bt = t.language, St = !0);
		}
		function Tt() {
			if (Ct) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = _t.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = vt.value;
			r >= 0 && r < t.length || (At(n), Ct = !0);
		}
		let Et = F(() => nt.value.some((e) => e.language === c.subtitleLang));
		function Dt() {
			let e = C.value;
			nt.value = ue(e), at.value = oe(e), ot.value = ne(e), wt(), Tt();
		}
		function Ot() {
			if (Et.value) bt = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = bt && nt.value.some((e) => e.language === bt) ? bt : nt.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			s("captions");
		}
		let kt = null;
		function At(e) {
			if (ct.value) N.setAudioTrack(e);
			else if (gt.value) {
				if (e === vt.value) return;
				ht.value = e, kt = e, j.value = !0, Se(C.value?.currentTime ?? 0);
			} else M(C.value, e), ot.value = e;
		}
		Z(ct, (e) => {
			if (!e || kt === null) return;
			let t = kt;
			kt = null, t >= 0 && t < N.audioTracks.value.length && N.setAudioTrack(t);
		}), Z(xt, () => {
			he(() => Dt());
		}, { deep: !0 });
		let jt = null, Mt, Nt = F(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Pt = !1;
		function Ft() {
			if (!i.autoplay || Pt || De.value || Y.value) return;
			let e = C.value;
			if (!e || !e.paused) return;
			Pt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, c.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function It() {
			Ft();
		}
		function Lt() {
			i.prevEpisode && s("play-episode", i.prevEpisode);
		}
		function Rt() {
			i.nextEpisode && s("play-episode", i.nextEpisode);
		}
		function zt() {
			let e = C.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Bt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Ht() {
			c.play(), c.setMediaPositionState();
		}
		function Ut() {
			c.pause(), c.setMediaPositionState();
		}
		function Wt() {
			let e = C.value;
			e && c.updateProgress(e.currentTime, e.duration, Bt(e));
		}
		function Gt() {
			let e = C.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, ke !== null && (e.currentTime = e.duration ? Math.min(e.duration, ke) : ke, ke = null), c.updateProgress(e.currentTime, e.duration, Bt(e)), c.setMediaPositionState(), Dt());
		}
		function Kt() {
			let e = C.value;
			e && c.updateProgress(e.currentTime, e.duration, Bt(e));
		}
		function qt() {
			let e = C.value;
			e && (Math.abs(e.volume - c.volume) > .001 && c.setVolume(e.volume), e.muted !== c.muted && c.toggleMute());
		}
		function Yt() {
			let e = C.value;
			e && e.playbackRate !== c.rate && c.setRate(e.playbackRate), c.setMediaPositionState();
		}
		function Xt() {
			c.setMediaPositionState();
		}
		function Zt() {
			c.setMediaPositionState();
		}
		function $(e) {
			let t = C.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function $t() {
			D.value = !0, xn();
		}
		function en() {
			D.value = !1, xn();
		}
		function tn(e) {
			let t = ee.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(ee[e] - c.rate) ? n : e, 0), n = ee[Math.min(ee.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		function on() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function sn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function cn() {
			re.value?.toggleOpen();
		}
		let ln = null;
		function un() {
			let e = C.value;
			if (!e) {
				c.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), c.pause();
				return;
			}
			ln !== null && (clearInterval(ln), ln = null);
			let t = .05;
			ln = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(ln), ln = null, e.volume = 0, e.pause(), c.pause());
			}, 50);
		}
		_({
			playPause: zt,
			seekBy: (e) => $(c.position + e),
			frameStep: (e) => {
				c.playing || $(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: dn,
			toggleFullscreen: pn,
			toggleCaptions: Ot,
			toggleTheater: fn,
			togglePip: gn,
			skipIntro: on,
			skipOutro: sn,
			sleepTimer: cn,
			seekToPercent: (e) => $(e * c.duration),
			speedStep: tn,
			toggleHelp: () => {
				O.value = !O.value;
			}
		}, { enabled: () => !O.value && !st.value && !yt.value });
		function dn() {
			c.toggleMute();
		}
		function fn() {
			k.value = !k.value, s("theater", k.value);
		}
		Z(() => c.muted, (e) => {
			let t = C.value;
			t && t.muted !== e && (t.muted = e);
		}), Z(() => c.volume, (e) => {
			let t = C.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Z(() => c.rate, (e) => {
			let t = C.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Z(() => c.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Ge(e.value) : e.type === "seekBy" && Ge(c.position + e.value));
		});
		function pn() {
			if (typeof document > "u") return;
			let e = w.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function hn() {
			E.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function gn() {
			let e = C.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function _n() {
			A.value = !0;
		}
		function vn() {
			A.value = !1;
		}
		function yn() {
			Mt &&= (clearTimeout(Mt), void 0);
		}
		function bn() {
			yn(), !(!c.playing || D.value) && (Mt = setTimeout(() => {
				c.playing && !D.value && (T.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function xn() {
			T.value = !0, bn();
		}
		Z(() => c.playing, (e) => {
			e ? (De.value = !1, $e(), bn()) : (yn(), T.value = !0);
		});
		let Sn = null;
		return _e(() => {
			c.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), p.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", hn), te.value = document.pictureInPictureEnabled === !0), Sn = c.bindMediaSession({
				onPlay: () => void C.value?.play()?.catch(() => {}),
				onPause: () => C.value?.pause(),
				onSeek: (e) => $(e)
			}), jt = C.value?.textTracks ?? null, jt?.addEventListener?.("addtrack", Dt), jt?.addEventListener?.("removetrack", Dt), Dt(), j.value && Se(), pe.fetch(i.media.id);
		}), Z(() => i.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), We();
		}), Z(() => i.media?.id, () => {
			p.hydrate(i.media);
		}), Z(() => f.currentSession, (e) => {
			e && (e.state === "playing" ? (C.value?.play(), c.play()) : e.state === "paused" && (C.value?.pause(), c.pause()));
		}), ge(() => {
			yn(), Ye(), N.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", hn), Sn?.(), jt?.removeEventListener?.("addtrack", Dt), jt?.removeEventListener?.("removetrack", Dt), ln !== null && (clearInterval(ln), ln = null);
		}), (n, i) => (G(), R("div", {
			ref_key: "containerRef",
			ref: w,
			class: U(["player", {
				"is-chrome-hidden": !T.value,
				"is-theater": k.value
			}]),
			onPointermove: xn,
			onPointerdown: xn,
			onFocusin: xn
		}, [V(Jt, {
			video: C.value,
			enabled: X(u).atmosphere,
			playing: X(c).playing,
			"reduced-motion": X(u).effectiveReducedMotion,
			intensity: ae.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), z("div", Rr, [
			z("video", {
				ref_key: "videoRef",
				ref: C,
				class: "player__video",
				src: W.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Ht,
				onPause: Ut,
				onTimeupdate: Wt,
				onLoadedmetadata: Gt,
				onCanplay: It,
				onProgress: Kt,
				onVolumechange: qt,
				onRatechange: Yt,
				onSeeked: Xt,
				onDurationchange: Zt,
				onEnded: Ze,
				onError: et,
				onEnterpictureinpicture: _n,
				onLeavepictureinpicture: vn,
				onClick: zt
			}, [(G(!0), R(P, null, q(xt.value, (e) => (G(), R("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Br))), 128))], 40, zr),
			i[17] ||= z("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[18] ||= z("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			z("div", Vr, [z("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": X(d)("player.back"),
				onClick: i[0] ||= ye((e) => s("back"), ["stop"])
			}, [V(t, { name: "arrow-left" })], 8, Hr), z("div", Ur, [
				z("p", Wr, J(X(d)("player.nowPlaying")), 1),
				z("h2", Gr, J(e.media.name), 1),
				z("div", Kr, [(G(!0), R(P, null, q(Nt.value, (e, t) => (G(), R(P, { key: t }, [t > 0 && !e.cert ? (G(), R("span", qr, "·")) : L("", !0), z("span", { class: U({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			Y.value ? L("", !0) : (G(), R("div", Jr, [z("button", {
				type: "button",
				class: U(["player__bigplay", { "is-playing": X(c).playing }]),
				"aria-label": X(c).playing ? X(d)("player.pause") : X(d)("player.play"),
				onClick: ye(zt, ["stop"])
			}, [V(t, { name: X(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Yr)])),
			V(mt, {
				video: C.value,
				language: X(c).subtitleLang,
				"style-config": X(u).captionStyle,
				lifted: T.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			Y.value ? L("", !0) : (G(), R("div", {
				key: 1,
				class: "player__controls",
				onClick: i[5] ||= ye(() => {}, ["stop"])
			}, [
				V(Oe, {
					position: X(c).position,
					duration: X(c).duration,
					buffered: X(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": H.value,
					onSeek: $,
					onScrubStart: $t,
					onScrubEnd: en
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				X(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), I(ur, {
					key: 0,
					position: X(c).position,
					duration: X(c).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: Re
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : L("", !0),
				z("div", Xr, [
					e.prevEpisode ? (G(), R("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(d)("player.previousEpisode"),
						onClick: Lt
					}, [V(t, { name: "skip-back" })], 8, Zr)) : L("", !0),
					z("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": X(c).playing ? X(d)("player.pause") : X(d)("player.play"),
						onClick: zt
					}, [V(t, { name: X(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Qr),
					e.nextEpisode ? (G(), R("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(d)("player.nextEpisode"),
						onClick: Rt
					}, [V(t, { name: "skip-forward" })], 8, $r)) : L("", !0),
					z("span", ei, [
						B(J(X(Ce)(X(c).position)), 1),
						i[13] ||= z("span", { class: "player__sep" }, " / ", -1),
						B(J(X(Ce)(X(c).duration)), 1)
					]),
					i[14] ||= z("span", { class: "player__grow" }, null, -1),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": v.value ? "true" : "false",
						onClick: b
					}, [V(t, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ti),
					V(g, {
						level: y.value,
						onCycle: x
					}, null, 8, ["level"]),
					V(rt),
					V(it),
					V(pt, {
						levels: X(N).levels.value,
						variants: X(N).variants.value,
						"current-level": X(N).currentLevel.value,
						"auto-enabled": X(N).autoEnabled.value,
						"active-height": X(N).activeLevelHeight.value,
						onSelect: we
					}, null, 8, [
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					V(Vt, {
						open: st.value,
						"onUpdate:open": i[1] ||= (e) => st.value = e,
						tracks: nt.value,
						"audio-tracks": _t.value,
						"active-audio": vt.value,
						onSelectAudio: At
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					V(nr, {
						open: yt.value,
						"onUpdate:open": i[2] ||= (e) => yt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					V(hr, {
						ref_key: "sleepTimerRef",
						ref: re,
						"on-expire": un
					}, null, 512),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__syncplay", { "is-on": X(f).isInRoom }]),
						"aria-label": X(f).isInRoom ? X(d)("syncplay.inRoom") : X(d)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[3] ||= (e) => ie.value = !0
					}, [V(t, { name: "user" })], 10, ni),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(d)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[4] ||= (e) => O.value = !0
					}, [V(t, { name: "info" })], 8, ri),
					te.value ? (G(), R("button", {
						key: 2,
						type: "button",
						class: U(["player__iconbtn", { "is-on": A.value }]),
						"aria-label": A.value ? X(d)("player.exitPip") : X(d)("player.pip"),
						"aria-pressed": A.value,
						onClick: gn
					}, [V(t, { name: "pip" })], 10, ii)) : L("", !0),
					z("button", {
						type: "button",
						class: U(["player__iconbtn", { "is-on": k.value }]),
						"aria-label": k.value ? X(d)("player.exitTheater") : X(d)("player.theater"),
						"aria-pressed": k.value,
						onClick: fn
					}, [V(t, { name: "theater" })], 10, ai),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": E.value ? X(d)("player.exitFullscreen") : X(d)("player.fullscreen"),
						onClick: pn
					}, [V(t, { name: E.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, oi)
				])
			])),
			Y.value ? L("", !0) : (G(), I(Ln, {
				key: 2,
				position: X(c).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Y.value ? L("", !0) : (G(), I(Un, {
				key: 3,
				position: X(c).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			De.value && !Y.value ? (G(), I(Qt, {
				key: 4,
				seconds: Ee.value,
				onResume: qe,
				onRestart: Je
			}, null, 8, ["seconds"])) : L("", !0),
			Q.value && Ue.value && !Y.value ? (G(), I(Tn, {
				key: 5,
				media: Ue.value,
				remaining: Ae.value,
				total: X(8),
				counting: X(u).autoplay,
				onPlayNow: Qe,
				onCancel: $e
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : L("", !0),
			V(r, {
				modelValue: Pe.value,
				"onUpdate:modelValue": i[6] ||= (e) => Pe.value = e,
				title: `Similar ${Me.value ?? "marker"}s`,
				size: "lg",
				onClose: He
			}, {
				default: ve(() => [z("div", si, [Ie.value ? (G(), R("div", ci, [V(S, { label: "Finding similar media" })])) : Le.value ? (G(), R("div", li, [V(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), z("p", ui, J(Le.value), 1)])) : !Ie.value && Fe.value.length === 0 ? (G(), R("div", di, [
					V(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[15] ||= z("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[16] ||= z("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), R("ul", fi, [(G(!0), R(P, null, q(Fe.value, (e) => (G(), R("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [z("div", pi, [e.poster_url ? (G(), R("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, mi)) : (G(), R("div", hi, [V(t, { name: "film" })]))]), z("div", gi, [z("p", _i, J(e.name), 1), e.year ? (G(), R("p", vi, [B(J(e.year) + " ", 1), e.runtime ? (G(), R("span", yi, " · " + J(e.runtime) + "m", 1)) : L("", !0)])) : L("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			be.value ? (G(), I(In, {
				key: 6,
				title: e.media.name,
				progress: X(N).progress.value,
				onBack: i[7] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : L("", !0),
			xe.value ? (G(), I(An, {
				key: 7,
				title: e.media.name,
				onBack: i[8] ||= (e) => s("back")
			}, null, 8, ["title"])) : L("", !0),
			X(f).isInRoom ? (G(), I(Lr, {
				key: 8,
				position: X(c).position,
				duration: X(c).duration,
				"is-playing": X(c).playing,
				onSeek: $,
				onPlay: i[9] ||= (e) => void C.value?.play(),
				onPause: i[10] ||= (e) => void C.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : L("", !0),
			X(f).isInRoom ? (G(), I(Tr, { key: 9 })) : L("", !0),
			V(fe, {
				modelValue: ie.value,
				"onUpdate:modelValue": i[11] ||= (e) => ie.value = e
			}, null, 8, ["modelValue"]),
			V(tt, {
				open: O.value,
				onClose: i[12] ||= (e) => O.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-84470ddb"]]), xi = { class: "player-page__stage" }, Si = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Ci = { class: "player-page__blocking-error" }, wi = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = d(), i = f(), a = xe(), o = Se(), s = m(), l = h(), g = K(null), _ = K(""), v = K([]), y = K(null), b = K(null), x = K([]), S = K([]), w = K(!0), T = K(null), ne = K(!1), re = K(null), ie = K(!1), ae = K(null), j = K(null), oe = F(() => String(a.params.id ?? ""));
		ee(() => g.value?.name);
		let se = F(() => {
			let e = g.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), M = null, ce = !1;
		function le(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function N(e) {
			let t = i.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function ue(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function de(e, r) {
			let i = M, a = () => ce || i !== M;
			if (r.type === "episode" || (r.episode_number ?? null) !== null) {
				for (let e of t.values()) if (e.some((e) => e.id === r.id)) {
					if (a()) return;
					let t = e.findIndex((e) => e.id === r.id), n = e.slice(t + 1);
					if (n.length) {
						s.setQueue(n);
						return;
					}
					break;
				}
			}
			let o = r.genres?.[0];
			if (!o) {
				s.setQueue([]);
				return;
			}
			try {
				let t = p(n.value, {
					genres: [o],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(t, void 0, i?.signal);
				if (a()) return;
				s.setQueue((c.items ?? []).filter((e) => e.id !== r.id).slice(0, 12));
			} catch (e) {
				if (a() || le(e)) return;
				s.setQueue([]);
			}
		}
		async function fe(e, t, r) {
			let i = p(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function P(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function pe(e, t) {
			ae.value = A(e, t), j.value = te(e, t);
		}
		function H(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function me(e, n) {
			if (ae.value = null, j.value = null, !(n.type === "episode" || (n.episode_number ?? null) !== null)) return;
			let r = H(n.id);
			if (r) {
				pe(r, n.id);
				return;
			}
			let i = M, a = () => ce || i !== M;
			try {
				let r = await P(e, n, i?.signal);
				if (a()) return;
				let o = await fe(e, r.id, i?.signal);
				if (a()) return;
				if (k(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => fe(e, t.id, i?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let c = O(o);
				c.length && t.set(r.id, c), pe(c, n.id);
				let l = c.findIndex((e) => e.id === n.id), u = c.slice(l + 1);
				u.length && s.setQueue(u);
			} catch (e) {
				if (a() || le(e)) return;
				ae.value = null, j.value = null;
			}
		}
		async function he() {
			let e = oe.value;
			if (M?.abort(), M = typeof AbortController < "u" ? new AbortController() : null, w.value = !0, T.value = null, v.value = [], y.value = null, b.value = null, x.value = [], S.value = [], ae.value = null, j.value = null, s.hideMiniPlayer(), !e) {
				T.value = "No media id provided", w.value = !1;
				return;
			}
			let t = new u({ baseUrl: n.value }), r = null;
			try {
				r = (await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, M?.signal)).item;
			} catch (e) {
				if (ce || le(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						re.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", ie.value = !0, w.value = !1;
						return;
					}
				}
				T.value = e instanceof Error ? e.message : "Failed to load media", w.value = !1;
				return;
			}
			if (!ce) {
				if (!r) {
					T.value = "Failed to load media item", w.value = !1;
					return;
				}
				g.value = r, l.hydrate(r), _.value = N(r), w.value = !1, r && (de(t, r), me(t, r)), t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, M?.signal).then((e) => {
					ce || (v.value = (e?.chapters ?? []).map((e) => ({
						start: e.start_seconds,
						end: e.end_seconds,
						title: e.title ?? void 0
					})), y.value = ue(e?.intro_marker), b.value = ue(e?.outro_marker), x.value = on(e?.audio_tracks), S.value = Me(e?.subtitle_tracks));
				}).catch(() => null);
			}
		}
		_e(he), Z(oe, he), be(() => {
			s.current && s.streamUrl && s.showMiniPlayer();
		}), ge(() => {
			ce = !0, M?.abort(), M = null;
		});
		function q() {
			o?.back();
		}
		function Y(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function ye(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ce(e) {
			ne.value = e;
		}
		function we() {
			ie.value = !1, q();
		}
		return (e, t) => (G(), R("div", { class: U(["player-page", { "is-theater": ne.value }]) }, [
			se.value && !w.value && !T.value ? (G(), R("div", {
				key: 0,
				class: "player-page__ambient",
				style: W(se.value),
				"aria-hidden": "true"
			}, null, 4)) : L("", !0),
			z("div", xi, [w.value ? (G(), R("div", Si, [V(E, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : T.value ? (G(), I(D, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: T.value
			}, {
				actions: ve(() => [V(C, {
					variant: "solid",
					onClick: he
				}, {
					default: ve(() => [...t[1] ||= [B("Retry", -1)]]),
					_: 1
				}), V(C, {
					variant: "ghost",
					onClick: q
				}, {
					default: ve(() => [...t[2] ||= [B("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : g.value ? (G(), I(bi, {
				key: 2,
				media: g.value,
				"stream-url": _.value,
				"stream-url-for": N,
				"api-base": X(n),
				chapters: v.value,
				"intro-marker": y.value,
				"outro-marker": b.value,
				"playback-audio-tracks": x.value,
				"playback-subtitle-tracks": S.value,
				"prev-episode": ae.value,
				"next-episode": j.value,
				autoplay: !0,
				onBack: q,
				onPlayNext: Y,
				onPlayEpisode: ye,
				onTheater: Ce
			}, null, 8, [
				"media",
				"stream-url",
				"api-base",
				"chapters",
				"intro-marker",
				"outro-marker",
				"playback-audio-tracks",
				"playback-subtitle-tracks",
				"prev-episode",
				"next-episode"
			])) : L("", !0)]),
			V(r, {
				modelValue: ie.value,
				"onUpdate:modelValue": t[0] ||= (e) => ie.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: ve(() => [V(C, {
					variant: "solid",
					onClick: we
				}, {
					default: ve(() => [...t[3] ||= [B("OK", -1)]]),
					_: 1
				})]),
				default: ve(() => [z("p", Ci, J(re.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-9c39e3c8"]]);
//#endregion
export { wi as default };

//# sourceMappingURL=PlayerPage-TjjQn-PD.js.map