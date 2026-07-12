import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { n, t as r } from "./Modal-BnAzb9-y.js";
import { t as i } from "./useFocusTrap-DZxA3ZEr.js";
import { a } from "./usePreferencesStore-g-d6JBr9.js";
import { t as o } from "./useMessages-CI_jngTk.js";
import { c as s, l as c, t as l } from "./client-C0AMSEun.js";
import { n as u, r as d } from "./useApiBase-CV_r-Kk4.js";
import { n as f, o as p } from "./media-query-BdY2RILB.js";
import { n as m, t as h } from "./ThumbRating-DGyicxT5.js";
import { a as g, n as _, o as v, r as y, t as b } from "./shortcuts-DGdfkJbu.js";
import { t as x } from "./Spinner-DxxkAO-G.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as S } from "./Button-btm-GCUN.js";
import { t as C } from "./Slider-LnnvB5jy.js";
import { t as w } from "./Select-BiOUcacP.js";
import { t as te } from "./Skeleton-DhQmxeNg.js";
import { t as T } from "./EmptyState-CfyGawh7.js";
import { n as E, o as D, r as O, t as k } from "./episode-order-C2yqgMeX.js";
import { n as ne, r as re, t as ie } from "./useMediaItemCache-BKCJnCbr.js";
import { a as ae, c as oe, d as A, f as se, i as ce, l as le, n as ue, o as de, r as j, s as fe, t as M, u as pe } from "./captions-DoP7ce5A.js";
import { n as me, t as he } from "./SyncPlayModal-DbHYqwvS.js";
import { Fragment as N, Transition as ge, computed as P, createBlock as F, createCommentVNode as I, createElementBlock as L, createElementVNode as R, createTextVNode as z, createVNode as B, defineComponent as V, inject as _e, nextTick as ve, normalizeClass as H, normalizeStyle as U, onBeforeUnmount as ye, onMounted as be, openBlock as W, ref as G, renderList as K, toDisplayString as q, toRef as J, unref as Y, watch as X, withCtx as xe, withModifiers as Se } from "vue";
import { onBeforeRouteLeave as Ce, useRoute as we, useRouter as Te } from "vue-router";
//#region src/components/player/format-time.ts
function Ee(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var De = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Oe = { class: "scrubber__track" }, ke = ["title"], Ae = { class: "scrubber__time numeric" }, je = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { t: r } = o(), i = e, a = n, s = G(null), c = G(!1), l = G(!1), u = G(0), d = G(0), f = (e) => Math.min(1, Math.max(0, e)), p = P(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = P(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = P(() => (c.value || l.value) && i.duration > 0), g = P(() => c.value ? u.value : d.value), _ = P(() => g.value * i.duration), v = P(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = P(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = P(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = P(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function ee(e) {
			let t = s.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : f((e.clientX - n.left) / n.width);
		}
		function S(e) {
			if (!(i.duration <= 0)) {
				c.value = !0;
				try {
					s.value?.setPointerCapture?.(e.pointerId);
				} catch {}
				u.value = ee(e), a("scrub-start"), e.preventDefault();
			}
		}
		function C(e) {
			let t = ee(e);
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
		function te() {
			l.value = !0;
		}
		function T() {
			l.value = !1;
		}
		function E(e) {
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
		}), (t, n) => (W(), L("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": Y(Ee)(e.position),
			"aria-label": Y(r)("player.seek"),
			onPointerdown: S,
			onPointermove: C,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: te,
			onPointerleave: T,
			onKeydown: E
		}, [R("div", Oe, [
			R("div", {
				class: "scrubber__buffered",
				style: U({ transform: `scaleX(${m.value})` })
			}, null, 4),
			R("div", {
				class: "scrubber__played",
				style: U({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(W(!0), L(N, null, K(x.value, (e, t) => (W(), L("span", {
				key: t,
				class: "scrubber__tick",
				style: U({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, ke))), 128)),
			R("div", {
				class: H(["scrubber__head", { "is-dragging": c.value }]),
				style: U({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (W(), L("div", {
			key: 0,
			class: "scrubber__preview",
			style: U({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (W(), L("div", {
			key: 0,
			class: "scrubber__thumb",
			style: U({ backgroundImage: y.value })
		}, null, 4)) : I("", !0), R("span", Ae, q(Y(Ee)(_.value)), 1)], 4)) : I("", !0)], 40, De));
	}
}), [["__scopeId", "data-v-3d610715"]]), Me = new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Z(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Ne(e) {
	return e === !0 || e === "true" || e === 1;
}
function Pe(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Fe(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Z(e.url ?? e.src);
		r !== "" && t.push({
			index: Pe(e.index),
			language: Z(e.language ?? e.lang ?? e.srclang),
			label: Z(e.label),
			default: Ne(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Ie(e) {
	if (e == null || !Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Pe(e.height);
		r <= 0 || t.push({
			id: Z(e.id),
			label: Z(e.label),
			height: r,
			width: Pe(e.width),
			bitrate: Pe(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Le(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function Re(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function ze(e) {
	let t = e ?? {};
	return {
		jobId: Z(t.job_id ?? t.jobId),
		masterUrl: Z(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Z(t.status, "running"),
		reused: Ne(t.reused),
		subtitles: Fe(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ie(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Be(e) {
	let t = e ?? {};
	return {
		jobId: Z(t.job_id ?? t.jobId),
		status: Z(t.status, "running"),
		playlistReady: Ne(t.playlist_ready ?? t.playlistReady),
		progress: Pe(t.progress),
		masterUrl: Z(t.master_url ?? t.masterUrl),
		subtitles: Fe(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ie(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ve(e) {
	return e.playlistReady || e.status === "completed";
}
function He(e) {
	return Me.has(e);
}
function Ue(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function We(e) {
	let t = G("idle"), n = G(0), r = G([]), i = G([]), a = G(-1), o = G(!0), s = G(null), c = G(null), u = G([]), d = G(-1);
	function f(e) {
		if (!T) return;
		i.value = T.levels, a.value = T.getCurrentLevel(), o.value = T.autoLevelEnabled;
		let t = e ?? T.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function m() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function h(e) {
		T && (u.value = T.audioTracks, d.value = e ?? T.getCurrentAudioTrack());
	}
	function g() {
		u.value = [], d.value = -1;
	}
	function _(e) {
		!e || e.length === 0 || (c.value = e);
	}
	function y(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: Ue(n, e.url)
		}));
	}
	let b = e.attach ?? v, x = e.pollIntervalMs ?? 1e3, ee = e.maxWaitMs ?? 12e4, S = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), C = Math.max(1, Math.ceil(ee / Math.max(1, x))), w = Ge(), te = e.getToken ?? (() => Ke(w)), T = null, E = null, D = null, O = !1, k = null;
	function ne() {
		return e.client ?? new l({
			baseUrl: e.apiBase(),
			tokenStore: w ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function re(i, a, o, s) {
		A(), O = !1, k = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], m();
		try {
			let r = ne(), c = ze(await r.post(Le(a, o), void 0, k.signal));
			if (O) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			y(c.subtitles), _(c.variants);
			let l = Ue(e.apiBase(), c.masterUrl), u = c.status === "completed";
			for (let e = 0; !u && e < C; e++) {
				let e = Be(await r.get(Re(c.jobId), void 0, k.signal));
				if (O) return;
				if (n.value = e.progress, y(e.subtitles), _(e.variants), He(e.status)) throw Error(`transcode ${e.status}`);
				if (Ve(e)) {
					u = !0;
					break;
				}
				if (await S(x), O) return;
			}
			if (!u) throw Error("transcode timed out");
			if (T = await b(i, l, {
				getToken: te,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => f(),
				onError: () => {
					O || (t.value = "error");
				}
			}), O) {
				T.destroy(), T = null;
				return;
			}
			E = T.onLevelSwitched((e) => f(e)), D = T.onAudioTrackSwitched((e) => h(e)), f(), h();
			try {
				let e = p();
				e.hlsMasterUrl = l;
			} catch {}
			t.value = "ready";
		} catch {
			O || (t.value = "error");
		}
	}
	function ie(e) {
		T && (T.setCurrentLevel(e === "auto" ? -1 : e), f());
	}
	function ae(e) {
		T && (T.setNextLevel(e === "auto" ? -1 : e), f());
	}
	function oe(e) {
		T && (T.setAudioTrack(e), h());
	}
	function A() {
		if (O = !0, k &&= (k.abort(), null), E) {
			try {
				E();
			} catch {}
			E = null;
		}
		if (D) {
			try {
				D();
			} catch {}
			D = null;
		}
		if (T) {
			try {
				T.destroy();
			} catch {}
			T = null;
		}
	}
	function se() {
		A(), t.value = "idle", n.value = 0, r.value = [], m(), g();
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
		audioTracks: u,
		currentAudioTrack: d,
		setLevel: ie,
		setNextLevel: ae,
		setAudioTrack: oe,
		start: re,
		cleanup: A,
		reset: se
	};
}
function Ge() {
	try {
		return new s();
	} catch {
		return null;
	}
}
function Ke(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var qe = 10, Je = 6;
function Ye(e) {
	let t = G(null), n = G(!1), r = G(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new l({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % qe, s = Math.floor(i / qe), c = a / (qe - 1) * 100, l = s / (Je - 1) * 100;
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
	function u() {
		t.value = null, n.value = !1, r.value = null, i.clear();
	}
	return {
		data: t,
		loading: n,
		error: r,
		thumbnailAt: s,
		fetch: c,
		reset: u
	};
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Xe = ["aria-label"], Ze = { class: "shortcuts__head" }, Qe = { class: "shortcuts__title" }, $e = { class: "shortcuts__grid" }, et = { class: "shortcuts__keys" }, tt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, nt = {
	key: 1,
	class: "shortcuts__key"
}, rt = { class: "shortcuts__label" }, it = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => y }
	},
	emits: ["close"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o(), l = G(null);
		return i(l, J(a, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (W(), L("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= Se((e) => s("close"), ["self"])
		}, [R("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [R("div", Ze, [R("h3", Qe, q(Y(c)("player.keyboard")), 1), B(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), R("ul", $e, [(W(!0), L(N, null, K(e.shortcuts, (e) => (W(), L("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [R("span", et, [(W(!0), L(N, null, K(e.keys, (e, n) => (W(), L(N, { key: n }, [e === "–" ? (W(), L("span", tt, "–")) : (W(), L("kbd", nt, [Y(b)[e] ? (W(), F(t, {
			key: 0,
			name: Y(b)[e],
			label: Y(_)[e] ?? e
		}, null, 8, ["name", "label"])) : (W(), L(N, { key: 1 }, [z(q(e), 1)], 64))]))], 64))), 128))]), R("span", rt, q(e.label), 1)]))), 128))])], 8, Xe)])) : I("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), at = { class: "volume" }, ot = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "VolumeControl",
	setup(e) {
		let t = p(), r = a(), { t: i } = o(), s = P(() => t.muted ? 0 : t.volume), c = P(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return X(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (W(), L("div", at, [B(n, {
			name: c.value,
			label: Y(t).muted ? Y(i)("player.unmute") : Y(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => Y(t).toggleMute()
		}, null, 8, ["name", "label"]), B(C, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: Y(i)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), st = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		], n = p(), { t: r } = o(), i = P(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (W(), F(w, {
			class: "speed-menu",
			tone: "glass",
			"model-value": Y(n).rate,
			options: i.value,
			label: Y(r)("player.playbackSpeed"),
			"onUpdate:modelValue": a
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), ct = "auto", lt = "original";
function Q(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function ut(e) {
	return e >= 2160 ? "4K" : Q(e);
}
function dt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Q(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: ut(r.height)
		}));
	}
	return n;
}
function ft(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Q(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function pt(e, t) {
	if (!t || !(t.height > 0)) return -1;
	let n = -1, r = Infinity;
	for (let i of e) {
		if (i.height !== t.height) continue;
		let e = Math.abs(i.bitrate - t.bitrate);
		e < r && (n = i.index, r = e);
	}
	return n >= 0 ? n : ft(e, Q(t.height));
}
function mt(e, t) {
	if (t < 0) return ct;
	let n = e.find((e) => e.index === t);
	return n ? Q(n.height) : ct;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var ht = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let n = e, r = t, i = p(), s = a(), { t: c } = o(), l = P(() => dt(n.levels)), u = P(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!n.variants) return [];
			for (let r of [...n.variants].sort((e, t) => t.height - e.height)) {
				let i = Q(r.height);
				e.has(i) || ft(n.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: ut(r.height)
				}));
			}
			return t;
		}), d = P(() => l.value.length >= 2 ? l.value : u.value), f = P(() => n.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), m = P(() => pt(n.levels, f.value)), h = P(() => f.value && m.value >= 0 ? {
			value: lt,
			label: c("player.qualityOriginal", { height: f.value.height })
		} : null), g = P(() => d.value.length >= 2), _ = P(() => n.activeHeight == null ? c("player.qualityAuto") : c("player.qualityAutoActive", { label: ut(n.activeHeight) })), v = P(() => [
			{
				value: ct,
				label: _.value
			},
			...h.value ? [h.value] : [],
			...d.value
		]), y = P(() => n.autoEnabled ? ct : h.value && n.currentLevel === m.value && (i.quality === "original" || s.defaultQuality === "original") ? lt : mt(n.levels, n.currentLevel));
		function b(e) {
			let t = String(e);
			if (t === "auto") {
				i.setQuality(t), s.defaultQuality = t, r("select", "auto");
				return;
			}
			let a = t === "original" ? m.value : ft(n.levels, t);
			a < 0 || (i.setQuality(t), s.defaultQuality = t, r("select", a));
		}
		return (e, t) => g.value ? (W(), F(w, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": y.value,
			options: v.value,
			label: Y(c)("player.quality"),
			"onUpdate:modelValue": b
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-719cf103"]]), gt = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = G([]), i = P(() => oe(n.styleConfig)), a = null, o = null;
		function s() {
			r.value = A(a);
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
			c(), fe(n.video, n.language);
			let e = se(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", s), r.value = A(e), !r.value.length) {
					let t = l(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", s));
				}
			} else r.value = [];
		}
		return X(() => [n.video, n.language], u, { immediate: !0 }), ye(c), t({ lines: r }), (t, n) => r.value.length ? (W(), L("div", {
			key: 0,
			class: H(["player__captions", { "is-lifted": e.lifted }]),
			style: U(i.value)
		}, [(W(!0), L(N, null, K(r.value, (e, t) => (W(), L("p", {
			key: t,
			class: "player__caption-line"
		}, q(e), 1))), 128))], 6)) : I("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), _t = ["aria-label", "aria-expanded"], vt = ["aria-label"], yt = { class: "capmenu__head" }, bt = { class: "capmenu__title" }, xt = ["aria-label"], St = ["aria-checked", "tabindex"], Ct = { class: "capmenu__check" }, wt = { class: "capmenu__optlabel" }, Tt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Et = { class: "capmenu__check" }, Dt = { class: "capmenu__optlabel" }, Ot = { class: "capmenu__title capmenu__title--sub" }, kt = ["aria-label"], At = [
	"aria-checked",
	"tabindex",
	"onClick"
], jt = { class: "capmenu__check" }, Mt = { class: "capmenu__optlabel" }, Nt = { class: "capmenu__title capmenu__title--sub" }, Pt = { class: "capmenu__style" }, Ft = { class: "capmenu__field" }, It = { class: "capmenu__fieldlabel" }, Lt = { class: "capmenu__field" }, Rt = { class: "capmenu__fieldlabel" }, zt = { class: "capmenu__field" }, Bt = { class: "capmenu__fieldlabel" }, Vt = { class: "capmenu__field" }, Ht = { class: "capmenu__fieldlabel" }, Ut = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let s = e, c = r, l = p(), u = a(), { t: d } = o(), f = G(null), m = G(null), h = P(() => l.subtitleLang), g = P(() => s.tracks.some((e) => e.language === h.value)), _ = P(() => g.value ? "captions" : "captions-off"), v = P(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = P(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function b(e) {
			c("update:open", e);
		}
		function x() {
			b(!1);
		}
		function ee(e) {
			l.setSubtitle(e), u.defaultSubtitleLang = e, u.subtitlePreferenceSet = !0;
		}
		function S(e) {
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
		function te(e) {
			let t = C(e, s.tracks.length + 1, v.value);
			t !== null && ee(t === 0 ? null : s.tracks[t - 1].language);
		}
		function T(e) {
			let t = C(e, s.audioTracks.length, y.value);
			t !== null && S(s.audioTracks[t].index);
		}
		function E(e) {
			u.captionStyle = {
				...u.captionStyle,
				size: e
			};
		}
		function D(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function O(e) {
			u.captionStyle = {
				...u.captionStyle,
				background: e
			};
		}
		function k(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		i(m, J(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function ne(e) {
			f.value && !f.value.contains(e.target) && x();
		}
		return X(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", ne, !0) : document.removeEventListener("pointerdown", ne, !0));
		}, { immediate: !0 }), ye(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", ne, !0);
		}), (r, i) => (W(), L("div", {
			ref_key: "rootEl",
			ref: f,
			class: "capmenu"
		}, [R("button", {
			type: "button",
			class: H(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? Y(d)("player.captionsOn") : Y(d)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [B(t, { name: _.value }, null, 8, ["name"])], 10, _t), e.open ? (W(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			R("div", yt, [R("h3", bt, q(Y(d)("player.subtitles")), 1), B(n, {
				name: "x",
				label: Y(d)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(d)("player.subtitleTrack"),
				onKeydown: te
			}, [R("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => ee(null)
			}, [R("span", Ct, [g.value ? I("", !0) : (W(), F(t, {
				key: 0,
				name: "check"
			}))]), R("span", wt, q(Y(d)("player.off")), 1)], 8, St), (W(!0), L(N, null, K(e.tracks, (e, n) => (W(), L("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => ee(e.language)
			}, [R("span", Et, [h.value === e.language ? (W(), F(t, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", Dt, q(e.label), 1)], 8, Tt))), 128))], 40, xt),
			e.audioTracks.length > 1 ? (W(), L(N, { key: 0 }, [R("h3", Ot, q(Y(d)("player.audio")), 1), R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(d)("player.audioTrack"),
				onKeydown: T
			}, [(W(!0), L(N, null, K(e.audioTracks, (n) => (W(), L("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => S(n.index)
			}, [R("span", jt, [e.activeAudio === n.index ? (W(), F(t, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", Mt, q(n.label), 1)], 8, At))), 128))], 40, kt)], 64)) : I("", !0),
			R("h3", Nt, q(Y(d)("player.captionStyle")), 1),
			R("div", Pt, [
				R("div", Ft, [R("span", It, q(Y(d)("player.size")), 1), B(w, {
					"model-value": Y(u).captionStyle.size,
					options: Y(ce),
					label: Y(d)("player.captionSize"),
					"onUpdate:modelValue": E
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", Lt, [R("span", Rt, q(Y(d)("player.color")), 1), B(w, {
					"model-value": Y(u).captionStyle.textColor,
					options: Y(ue),
					label: Y(d)("player.captionColor"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", zt, [R("span", Bt, q(Y(d)("player.background")), 1), B(w, {
					"model-value": Y(u).captionStyle.background,
					options: Y(M),
					label: Y(d)("player.captionBackground"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", Vt, [R("span", Ht, q(Y(d)("player.edge")), 1), B(w, {
					"model-value": Y(u).captionStyle.edge,
					options: Y(j),
					label: Y(d)("player.captionEdge"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, vt)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-bce771b9"]]), Wt = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Gt(e, t, n, r, i, a, o) {
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
		r: Wt(d / m),
		g: Wt(f / m),
		b: Wt(p / m)
	};
}
function Kt(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Gt(e, t, n, 0, 0, r, n),
		right: Gt(e, t, n, t - r, 0, t, n),
		center: Gt(e, t, n, 0, 0, t, n)
	};
}
function qt({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Jt(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${qt(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${qt(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${qt(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Yt(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Xt = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let n = e, r = G(!1), i = null;
		function a() {
			r.value = Yt(i);
		}
		let o = P(() => n.enabled && !n.reducedMotion && !r.value), s = P(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = G(null), l = null, u = null, d = !1, f = !1;
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
				c.value = Jt(Kt(n, 32, 18));
			} catch {
				f = !0, c.value = null;
			}
		}
		function h(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let g = null, _ = null, v = null, y = 0, b = !1;
		function x(e) {
			_ = e, g = e.requestVideoFrameCallback(ee);
		}
		function ee(e) {
			if (!b) return;
			e - y >= 250 && (y = e, m());
			let t = n.video;
			h(t) && x(t);
		}
		function S() {
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
		X(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			C(), e && t && S();
		}, { immediate: !0 }), be(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ye(() => {
			C(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let w = P(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (W(), L("div", {
			class: H(["player__ambient", { "is-active": o.value }]),
			style: U(o.value ? w.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Zt = ["aria-label"], Qt = { class: "resume__label" }, $t = { class: "resume__time numeric" }, en = { class: "resume__actions" }, tn = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o(), a = P(() => i("player.resumeFrom").split("{time}"));
		return (n, o) => (W(), L("div", {
			class: "resume",
			role: "region",
			"aria-label": Y(i)("player.resumePlayback")
		}, [R("p", Qt, [
			z(q(a.value[0]), 1),
			R("span", $t, q(Y(Ee)(e.seconds)), 1),
			z(q(a.value[1]), 1)
		]), R("div", en, [R("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: o[0] ||= (e) => r("resume")
		}, [B(t, { name: "play" }), R("span", null, q(Y(i)("player.resume")), 1)]), R("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: o[1] ||= (e) => r("restart")
		}, [B(t, { name: "rewind" }), R("span", null, q(Y(i)("player.startOver")), 1)])])], 8, Zt));
	}
}), [["__scopeId", "data-v-271c5209"]]), nn = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], rn = new Set([
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
function $(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function an(...e) {
	return e.some((e) => rn.has($(e)));
}
function on(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function sn(e) {
	return e?.error?.code === 2;
}
function cn(e) {
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
var ln = 2 * Math.PI * 15;
function un(e, t, n = ln) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var dn = new Map([
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
]), fn = [
	"video/mp4; codecs=\"hvc1.1.4.L120.90\"",
	"video/mp4; codecs=\"hev1.1.4.L120.90\"",
	"video/mp4; codecs=\"hvc1.1.6.L93.B0\"",
	"video/mp4; codecs=\"hvc1.1.4.L120\""
];
function pn(e, t = "video/mp4") {
	let n = dn.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function mn(e, t = "video/mp4") {
	if (!e) return !0;
	let n = pn(e, t);
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
async function hn() {
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
		for (let t of fn) {
			let n = e.canPlayType(t);
			if (n === "probably" || n === "maybe") return !0;
		}
	}
	return !1;
}
async function gn(e, t) {
	if (an(...e)) return !0;
	let n = e.map((e) => $(e)).find((e) => nn.includes(e)) ?? "", r = n ? `video/${n}` : "video/mp4";
	if (nn.includes(n) && t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await mn(e.codec, r) || (n === "mp4" || n === "m4v") && !await hn()) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var _n = ["aria-label"], vn = ["src"], yn = { class: "upnext__body" }, bn = { class: "upnext__eyebrow" }, xn = { class: "upnext__title" }, Sn = {
	key: 0,
	class: "upnext__cd numeric"
}, Cn = { class: "upnext__actions" }, wn = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Tn = ["r"], En = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Dn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { t: r } = o(), i = e, a = n, s = P(() => i.posterUrl ?? i.media.poster_url ?? null), c = P(() => un(i.remaining, i.total));
		return (n, i) => (W(), L("aside", {
			class: "upnext",
			role: "region",
			"aria-label": Y(r)("player.upNext")
		}, [
			s.value ? (W(), L("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, vn)) : I("", !0),
			R("div", yn, [
				R("p", bn, q(Y(r)("player.upNext")), 1),
				R("h4", xn, q(e.media.name), 1),
				e.counting ? (W(), L("p", Sn, q(Y(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : I("", !0),
				R("div", Cn, [R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [B(t, { name: "play" }), R("span", null, q(Y(r)("player.playNow")), 1)]), R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, q(Y(r)("player.cancel")), 1)])
			]),
			e.counting ? (W(), L("svg", wn, [R("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Tn), R("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Y(ln),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, En)])) : I("", !0)
		], 8, _n));
	}
}), [["__scopeId", "data-v-85909b2d"]]), On = {
	class: "transcode",
	role: "alert"
}, kn = { class: "transcode__card" }, An = { class: "transcode__heading" }, jn = { class: "transcode__body" }, Mn = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o();
		return (n, a) => (W(), L("div", On, [R("div", kn, [
			B(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			R("h3", An, q(Y(i)("player.transcodeHeading")), 1),
			R("p", jn, q(e.title ? Y(i)("player.transcodeBodyTitled", { title: e.title }) : Y(i)("player.transcodeBodyUntitled")), 1),
			R("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [B(t, { name: "arrow-left" }), R("span", null, q(Y(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), Nn = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Pn = { class: "prep__card" }, Fn = { class: "prep__heading" }, In = { class: "prep__body" }, Ln = ["aria-valuenow"], Rn = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = o(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (W(), L("div", Nn, [R("div", Pn, [
			B(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			R("h3", Fn, q(Y(r)("player.transcodePreparingHeading")), 1),
			R("p", In, q(e.title ? Y(r)("player.transcodePreparingTitled", { title: e.title }) : Y(r)("player.transcodePreparingUntitled")), 1),
			R("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [R("div", {
				class: "prep__bar-fill",
				style: U({ width: i() + "%" })
			}, null, 4)], 8, Ln),
			R("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [B(t, { name: "arrow-left" }), R("span", null, q(Y(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), zn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let c = P(() => s(r.position, r.introMarker) ? {
			label: a("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: a("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (W(), F(ge, { name: "skip" }, {
			default: xe(() => [c.value ? (W(), L("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Se(l, ["stop"])
			}, [R("span", null, q(c.value.label), 1), B(t, { name: "skip-forward" })])) : I("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Bn = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, Vn = ["aria-label", "onClick"], Hn = { class: "skip-controls__label" }, Un = 5, Wn = 30, Gn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			let n = s(e.startMs), r = n - Un, i = n + Wn;
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
		let f = P(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (W(), L("div", Bn, [(W(!0), L(N, null, K(f.value, (e) => (W(), L("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: Se((t) => p(e), ["stop"])
		}, [R("span", Hn, q(d(e.type)), 1), B(t, { name: "skip-forward" })], 8, Vn))), 128))])) : I("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Kn = ["aria-label", "aria-expanded"], qn = ["aria-label"], Jn = { class: "chapterlist__head" }, Yn = { class: "chapterlist__title" }, Xn = ["aria-label"], Zn = ["onClick"], Qn = { class: "chapterlist__index" }, $n = { class: "chapterlist__name" }, er = { class: "chapterlist__meta" }, tr = { class: "chapterlist__time" }, nr = {
	key: 0,
	class: "chapterlist__duration"
}, rr = {
	key: 1,
	class: "chapterlist__empty"
}, ir = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let d = P(() => a.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Ee(e.start), a;
			return e.end != null && e.end > e.start && (a = Ee(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = G(null), p = G(null);
		i(p, J(a, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		X(() => a.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), ye(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (W(), L("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [R("button", {
			type: "button",
			class: H(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": Y(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [B(t, { name: "list" })], 10, Kn), e.open ? (W(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.chapterList"),
			tabindex: "-1"
		}, [R("div", Jn, [R("h3", Yn, q(Y(c)("player.chapters")), 1), B(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (W(), L("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": Y(c)("player.chapterList")
		}, [(W(!0), L(N, null, K(d.value, (e) => (W(), L("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [R("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			R("span", Qn, q(e.index), 1),
			R("span", $n, q(e.label), 1),
			R("span", er, [R("span", tr, q(e.startLabel), 1), e.durationLabel ? (W(), L("span", nr, "· " + q(e.durationLabel), 1)) : I("", !0)])
		], 8, Zn)]))), 128))], 8, Xn)) : (W(), L("p", rr, q(Y(c)("player.noChapters")), 1))], 8, qn)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ar = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, or = { class: "marker-timeline__ticks" }, sr = [
	"title",
	"aria-label",
	"onClick"
], cr = { class: "marker-timeline__tooltip" }, lr = { class: "marker-timeline__tooltip-label" }, ur = { class: "marker-timeline__tooltip-time numeric" }, dr = ["onClick"], fr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let s = P(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = P(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = P(() => c.value !== null), u = P(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (W(), L("div", {
			key: 0,
			class: H(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (W(), L("div", ar, [t[0] ||= R("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [R("polygon", { points: "5,3 19,12 5,21" })], -1), z(" " + q(u.value), 1)])) : I("", !0), R("div", or, [(W(!0), L(N, null, K(s.value, (e) => (W(), L("button", {
			key: e.id,
			type: "button",
			class: H(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: U({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Y(Ee)(e.startSec)}`,
			"aria-label": `${e.label} at ${Y(Ee)(e.startSec)}`,
			onClick: Se((t) => d(e), ["stop"])
		}, [R("span", cr, [
			R("span", lr, q(e.label), 1),
			R("span", ur, q(Y(Ee)(e.startSec)), 1),
			R("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Se((t) => f(e), ["stop"])
			}, " Find similar ", 8, dr)
		])], 14, sr))), 128))])], 2)) : I("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), pr = ["aria-label", "aria-expanded"], mr = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, hr = ["aria-label"], gr = ["aria-selected", "onClick"], _r = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		], s = G(0), c = G(0), l = P(() => c.value > 0), u;
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
		let h = G(!1);
		function g() {
			l.value ? (p(0), h.value = !1) : h.value = !h.value;
		}
		function _(e) {
			p(e), h.value = !1;
		}
		return ye(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (W(), L("div", { class: H(["sleep-timer", { "is-active": l.value }]) }, [R("button", {
			type: "button",
			class: H(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : Y(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [B(t, { name: "moon" }), l.value ? (W(), L("span", mr, q(m(c.value)), 1)) : I("", !0)], 10, pr), B(ge, { name: "dropdown" }, {
			default: xe(() => [h.value ? (W(), L("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": Y(i)("player.sleepTimer")
			}, [(W(), L(N, null, K(a, (e) => R("li", {
				key: e.value,
				class: H(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, q(e.label), 11, gr)), 64))], 8, hr)) : I("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), vr = {
	key: 0,
	class: "syncplay-overlay"
}, yr = { class: "syncplay-overlay__badge" }, br = { class: "syncplay-overlay__label" }, xr = { class: "syncplay-overlay__status-label" }, Sr = { class: "syncplay-overlay__members" }, Cr = { class: "syncplay-overlay__member-count" }, wr = { class: "syncplay-overlay__member-list" }, Tr = { class: "syncplay-overlay__member-name" }, Er = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Dr = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = o(), i = me(), a = u(), s = P(() => n.apiBase ?? a.value), c = P(() => i.currentRoom?.name ?? "SyncPlay"), l = P(() => i.onlineMembers.length), d = P(() => i.syncStatus), f = P(() => {
			switch (d.value) {
				case "synced": return r("syncplay.synced");
				case "outOfSync": return r("syncplay.outOfSync");
				case "re-syncing": return r("syncplay.reSyncing");
				default: return r("syncplay.synced");
			}
		}), p = P(() => {
			switch (d.value) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		});
		async function m() {
			await i.leaveRoom(s.value);
		}
		return (e, n) => Y(i).isInRoom ? (W(), L("div", vr, [
			R("div", yr, [B(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), R("span", br, "SyncPlay: " + q(c.value), 1)]),
			R("div", { class: H(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [B(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), R("span", xr, q(f.value), 1)], 2),
			R("div", Sr, [R("span", Cr, [B(t, { name: "user" }), z(" " + q(l.value) + " " + q(Y(r)("syncplay.members", { count: l.value })), 1)]), R("ul", wr, [(W(!0), L(N, null, K(Y(i).onlineMembers.slice(0, 5), (e) => (W(), L("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= R("span", { class: "syncplay-overlay__member-dot" }, null, -1), R("span", Tr, q(e.name), 1)]))), 128)), Y(i).onlineMembers.length > 5 ? (W(), L("li", Er, " +" + q(Y(i).onlineMembers.length - 5) + " more ", 1)) : I("", !0)])]),
			B(S, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: xe(() => [z(q(Y(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), Or = {
	key: 0,
	class: "syncplay-controls"
}, kr = ["aria-label"], Ar = { class: "syncplay-controls__wait-label" }, jr = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, Mr = { key: 0 }, Nr = { class: "syncplay-controls__transport" }, Pr = ["aria-label"], Fr = ["aria-label"], Ir = ["aria-label"], Lr = { class: "syncplay-controls__status-label" }, Rr = 10, zr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let r = e, i = n, { t: a } = o(), s = me(), c = u(), l = P(() => r.apiBase ?? c.value), d = G(!1), f = G([]), p = P(() => d.value || s.syncStatus === "re-syncing");
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
			await _(Math.max(0, r.position - Rr));
		}
		async function y() {
			await _(Math.min(r.duration, r.position + Rr));
		}
		return X(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => Y(s).isInRoom ? (W(), L("div", Or, [
			p.value ? (W(), L("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": Y(a)("syncplay.waitingForMembers")
			}, [
				B(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				R("span", Ar, q(Y(a)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (W(), L("span", jr, [z(q(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (W(), L("span", Mr, "+" + q(f.value.length - 3), 1)) : I("", !0)])) : I("", !0)
			], 8, kr)) : I("", !0),
			R("div", Nr, [
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(a)("syncplay.rewind"),
					onClick: v
				}, [B(t, { name: "rewind" })], 8, Pr),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Y(a)("syncplay.pauseAll") : Y(a)("syncplay.playAll"),
					onClick: g
				}, [B(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Fr),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(a)("syncplay.fastForward"),
					onClick: y
				}, [B(t, { name: "forward" })], 8, Ir)
			]),
			R("div", { class: H(["syncplay-controls__status", `syncplay-controls__status--${Y(s).syncStatus}`]) }, [B(t, {
				name: Y(s).syncStatus === "synced" ? "check" : Y(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), R("span", Lr, q(Y(s).syncStatus === "synced" ? Y(a)("syncplay.synced") : Y(s).syncStatus === "outOfSync" ? Y(a)("syncplay.outOfSync") : Y(a)("syncplay.reSyncing")), 1)], 2)
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), Br = { class: "player__stage" }, Vr = ["src", "poster"], Hr = [
	"src",
	"srclang",
	"label",
	"default"
], Ur = { class: "player__meta" }, Wr = ["aria-label"], Gr = { class: "player__meta-text" }, Kr = { class: "player__eyebrow" }, qr = { class: "player__title" }, Jr = { class: "player__sub numeric" }, Yr = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Xr = {
	key: 0,
	class: "player__center"
}, Zr = ["aria-label"], Qr = { class: "player__btnrow" }, $r = ["aria-label"], ei = ["aria-label"], ti = ["aria-label"], ni = { class: "player__time numeric" }, ri = ["aria-label", "aria-pressed"], ii = ["aria-label"], ai = ["aria-label"], oi = ["aria-label", "aria-pressed"], si = ["aria-label", "aria-pressed"], ci = ["aria-label"], li = { class: "similar-modal" }, ui = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, di = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, fi = { class: "similar-modal__state-title" }, pi = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, mi = {
	key: 3,
	class: "similar-modal__results"
}, hi = { class: "similar-modal__poster" }, gi = ["src", "alt"], _i = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, vi = { class: "similar-modal__result-body" }, yi = { class: "similar-modal__result-title" }, bi = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, xi = { key: 0 }, Si = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let i = e, s = n, c = p(), u = a(), { t: d } = o(), f = me(), _ = m(), v = P(() => _.isFavorite(i.media.id)), y = P(() => _.likeLevel(i.media.id));
		function b() {
			_.toggleFavorite(i.media.id, ue());
		}
		function ee(e) {
			_.setLike(i.media.id, e, ue());
		}
		let S = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], C = G(null), w = G(null), te = G(!0), T = G(!1), E = G(!1), D = G(!1), O = G(!1), k = G(!1), ne = G(!1), re = G(null), ie = G(!1), oe = P(() => O.value ? 1.35 : 1), A = G(an(i.streamUrl, i.media.path));
		async function se() {
			if (A.value) return;
			let e = i.playbackAudioTracks ?? [];
			e.length !== 0 && await gn([i.streamUrl, i.media.path], e) && (A.value = !0);
		}
		X(() => i.playbackAudioTracks, (e) => {
			!e || e.length === 0 || se();
		}, { immediate: !1 });
		let ce = _e("phlixConfig", null);
		function ue() {
			return ce?.apiBase ?? "";
		}
		let j = We({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: ce?.playerHlsConfig
		}), fe = Ye({ apiBase: () => i.apiBase ?? "" }), M = null;
		function ge(e) {
			M !== null && clearTimeout(M), M = setTimeout(() => {
				M = null, fe.fetch(e);
			}, 0);
		}
		let V = P(() => i.thumbnailAt ?? fe.thumbnailAt), U = P(() => A.value ? void 0 : i.streamUrl), J = P(() => A.value && j.state.value !== "ready"), Ce = P(() => A.value && (j.state.value === "preparing" || j.state.value === "idle")), we = P(() => A.value && j.state.value === "error");
		function Te(e = 0) {
			let t = C.value;
			t && j.start(t, i.media.id, void 0, e);
		}
		function De(e) {
			j.setLevel(e);
		}
		let Oe = !1;
		X(() => j.levels.value, (e) => {
			if (Oe || e.length === 0) return;
			Oe = !0;
			let t = u.defaultQuality;
			if (!t || t === "auto") return;
			let n = t === "original" ? pt(e, j.variants.value?.find((e) => e.id === "original") ?? null) : ft(e, t);
			n >= 0 && j.setNextLevel(n);
		});
		let ke = G(c.resumePositionFor(i.media.id) ?? 0), Ae = G(!A.value && ke.value > 0), Me = null, Z = G(!1), Ne = G(8), Pe, Fe = G(null), Ie = G(0), Le = G(!1), Re = G([]), ze = G(!1), Be = G(null);
		function Ve(e, t) {
			Fe.value = e, Ie.value = t, Re.value = [], Be.value = null, Le.value = !0, qe(e, t);
		}
		let He = null, Ue = null, Ge = null;
		function Ke() {
			let e = i.apiBase ?? "";
			return (Ue === null || Ge !== e) && (Ue = new l({ baseUrl: e }), Ge = e), Ue;
		}
		async function qe(e, t) {
			He?.abort(), He = new AbortController(), ze.value = !0, Be.value = null;
			try {
				let n = await Ke().searchByMarker(e, t, 30, 20, He.signal);
				Re.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Be.value = "Failed to load similar media. Please try again.", Re.value = [];
			} finally {
				ze.value = !1;
			}
		}
		function Je() {
			He?.abort(), Le.value = !1, Re.value = [], Be.value = null, Fe.value = null;
		}
		let Xe = P(() => c.upNext);
		function Ze() {
			A.value = an(i.streamUrl, i.media.path), se(), ke.value = c.resumePositionFor(i.media.id) ?? 0, Ae.value = !A.value && ke.value > 0, Me = null, zt = !1, Dt = !1, Ot = !1, bt.value = -1, Pt = null, Oe = !1, tt(), Z.value = !1, j.reset(), C.value && (C.value.currentTime = 0), A.value && Te(), ge(i.media.id);
		}
		function Qe(e) {
			let t = C.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Me = Math.max(0, e));
		}
		function $e() {
			Qe(ke.value), Ae.value = !1, C.value?.play()?.catch(() => {});
		}
		function et() {
			Me = null, Qe(0), c.clearResume(i.media.id), Ae.value = !1, C.value?.play()?.catch(() => {});
		}
		function tt() {
			Pe &&= (clearInterval(Pe), void 0);
		}
		function nt() {
			Ne.value = 8, tt(), Pe = setInterval(() => {
				--Ne.value, Ne.value <= 0 && (tt(), at());
			}, 1e3);
		}
		function rt() {
			wn(), te.value = !0, c.upNext && (Z.value = !0, u.autoplay && nt());
		}
		function at() {
			tt(), Z.value = !1;
			let e = c.next(i.streamUrlFor);
			e && s("play-next", e);
		}
		function ct() {
			tt(), Z.value = !1;
		}
		function lt() {
			if (A.value) return;
			let e = C.value, t = sn(e) && (e?.currentTime ?? 0) === 0;
			(on(e) || t) && (A.value = !0, Te(e?.currentTime ?? 0));
		}
		let Q = G([]), ut = G([]), dt = G(-1), mt = G(!1), _t = P(() => j.state.value === "ready" && j.audioTracks.value.length > 0), vt = P(() => j.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), yt = P(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), bt = G(-1), xt = P(() => !_t.value && !A.value && ut.value.length === 0 && yt.value.length > 1), St = P(() => _t.value ? vt.value : xt.value ? yt.value : ut.value), Ct = P(() => {
			if (_t.value) return j.currentAudioTrack.value;
			if (xt.value) {
				if (bt.value >= 0) return bt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return dt.value;
		}), wt = G(!1), Tt = c.subtitleLang, Et = P(() => A.value ? j.subtitleTracks.value : i.playbackSubtitleTracks ?? []), Dt = !1, Ot = !1;
		function kt() {
			if (Dt) return;
			if (u.subtitlePreferenceSet) {
				Dt = !0;
				return;
			}
			let e = Et.value.find((e) => e.default);
			if (!e) return;
			let t = Q.value.find((t) => t.language === (e.language || e.label));
			t && (c.setSubtitle(t.language), Tt = t.language, Dt = !0);
		}
		function At() {
			if (Ot) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = St.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Ct.value;
			r >= 0 && r < t.length || (Ft(n), Ot = !0);
		}
		let jt = P(() => Q.value.some((e) => e.language === c.subtitleLang));
		function Mt() {
			let e = C.value;
			Q.value = pe(e), ut.value = le(e), dt.value = ae(e), kt(), At();
		}
		function Nt() {
			if (jt.value) Tt = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = Tt && Q.value.some((e) => e.language === Tt) ? Tt : Q.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			s("captions");
		}
		let Pt = null;
		function Ft(e) {
			if (_t.value) j.setAudioTrack(e);
			else if (xt.value) {
				if (e === Ct.value) return;
				bt.value = e, Pt = e, A.value = !0, Te(C.value?.currentTime ?? 0);
			} else de(C.value, e), dt.value = e;
		}
		X(_t, (e) => {
			if (!e || Pt === null) return;
			let t = Pt;
			Pt = null, t >= 0 && t < j.audioTracks.value.length && j.setAudioTrack(t);
		}), X(Et, () => {
			ve(() => Mt());
		}, { deep: !0 });
		let It = null, Lt, Rt = P(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), zt = !1;
		function Bt() {
			if (!i.autoplay || zt || Ae.value || J.value) return;
			let e = C.value;
			if (!e || !e.paused) return;
			zt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, c.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Vt() {
			Bt();
		}
		function Ht() {
			i.prevEpisode && s("play-episode", i.prevEpisode);
		}
		function Wt() {
			i.nextEpisode && s("play-episode", i.nextEpisode);
		}
		function Gt() {
			let e = C.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Kt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function qt() {
			c.play(), c.setMediaPositionState();
		}
		function Jt() {
			c.pause(), c.setMediaPositionState();
		}
		function Yt() {
			let e = C.value;
			e && c.updateProgress(e.currentTime, e.duration, Kt(e));
		}
		function Zt() {
			let e = C.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, Me !== null && (e.currentTime = e.duration ? Math.min(e.duration, Me) : Me, Me = null), c.updateProgress(e.currentTime, e.duration, Kt(e)), c.setMediaPositionState(), Mt());
		}
		function Qt() {
			let e = C.value;
			e && c.updateProgress(e.currentTime, e.duration, Kt(e));
		}
		function $t() {
			let e = C.value;
			e && (Math.abs(e.volume - c.volume) > .001 && c.setVolume(e.volume), e.muted !== c.muted && c.toggleMute());
		}
		function en() {
			let e = C.value;
			e && e.playbackRate !== c.rate && c.setRate(e.playbackRate), c.setMediaPositionState();
		}
		function nn() {
			c.setMediaPositionState();
		}
		function rn() {
			c.setMediaPositionState();
		}
		function $(e) {
			let t = C.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function cn() {
			E.value = !0, En();
		}
		function ln() {
			E.value = !1, En();
		}
		function un(e) {
			let t = S.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(S[e] - c.rate) ? n : e, 0), n = S[Math.min(S.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		function dn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function fn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function pn() {
			re.value?.toggleOpen();
		}
		let mn = null;
		function hn() {
			let e = C.value;
			if (!e) {
				c.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), c.pause();
				return;
			}
			mn !== null && (clearInterval(mn), mn = null);
			let t = .05;
			mn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(mn), mn = null, e.volume = 0, e.pause(), c.pause());
			}, 50);
		}
		g({
			playPause: Gt,
			seekBy: (e) => $(c.position + e),
			frameStep: (e) => {
				c.playing || $(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: _n,
			toggleFullscreen: yn,
			toggleCaptions: Nt,
			toggleTheater: vn,
			togglePip: xn,
			skipIntro: dn,
			skipOutro: fn,
			sleepTimer: pn,
			seekToPercent: (e) => $(e * c.duration),
			speedStep: un,
			toggleHelp: () => {
				D.value = !D.value;
			}
		}, { enabled: () => !D.value && !mt.value && !wt.value });
		function _n() {
			c.toggleMute();
		}
		function vn() {
			O.value = !O.value, s("theater", O.value);
		}
		X(() => c.muted, (e) => {
			let t = C.value;
			t && t.muted !== e && (t.muted = e);
		}), X(() => c.volume, (e) => {
			let t = C.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), X(() => c.rate, (e) => {
			let t = C.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), X(() => c.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Qe(e.value) : e.type === "seekBy" && Qe(c.position + e.value));
		});
		function yn() {
			if (typeof document > "u") return;
			let e = w.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function bn() {
			T.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function xn() {
			let e = C.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function Sn() {
			k.value = !0;
		}
		function Cn() {
			k.value = !1;
		}
		function wn() {
			Lt &&= (clearTimeout(Lt), void 0);
		}
		function Tn() {
			wn(), !(!c.playing || E.value) && (Lt = setTimeout(() => {
				c.playing && !E.value && (te.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function En() {
			te.value = !0, Tn();
		}
		X(() => c.playing, (e) => {
			e ? (Ae.value = !1, ct(), Tn()) : (wn(), te.value = !0);
		});
		let On = null;
		return be(() => {
			c.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), _.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", bn), ne.value = document.pictureInPictureEnabled === !0), On = c.bindMediaSession({
				onPlay: () => void C.value?.play()?.catch(() => {}),
				onPause: () => C.value?.pause(),
				onSeek: (e) => $(e)
			}), It = C.value?.textTracks ?? null, It?.addEventListener?.("addtrack", Mt), It?.addEventListener?.("removetrack", Mt), Mt(), A.value && Te(), ge(i.media.id);
		}), X(() => i.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), Ze();
		}), X(() => i.media?.id, () => {
			_.hydrate(i.media);
		}), X(() => f.currentSession, (e) => {
			e && (e.state === "playing" ? (C.value?.play(), c.play()) : e.state === "paused" && (C.value?.pause(), c.pause()), f.updateLocalPosition(c.position), Math.abs(f.driftAmount) > 2 && Qe(e.playbackPosition));
		}), ye(() => {
			wn(), tt(), j.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", bn), On?.(), It?.removeEventListener?.("addtrack", Mt), It?.removeEventListener?.("removetrack", Mt), mn !== null && (clearInterval(mn), mn = null), M !== null && (clearTimeout(M), M = null);
		}), (n, i) => (W(), L("div", {
			ref_key: "containerRef",
			ref: w,
			class: H(["player", {
				"is-chrome-hidden": !te.value,
				"is-theater": O.value
			}]),
			onPointermove: En,
			onPointerdown: En,
			onFocusin: En
		}, [B(Xt, {
			video: C.value,
			enabled: Y(u).atmosphere,
			playing: Y(c).playing,
			"reduced-motion": Y(u).effectiveReducedMotion,
			intensity: oe.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), R("div", Br, [
			R("video", {
				ref_key: "videoRef",
				ref: C,
				class: "player__video",
				src: U.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: qt,
				onPause: Jt,
				onTimeupdate: Yt,
				onLoadedmetadata: Zt,
				onCanplay: Vt,
				onProgress: Qt,
				onVolumechange: $t,
				onRatechange: en,
				onSeeked: nn,
				onDurationchange: rn,
				onEnded: rt,
				onError: lt,
				onEnterpictureinpicture: Sn,
				onLeavepictureinpicture: Cn,
				onClick: Gt
			}, [(W(!0), L(N, null, K(Et.value, (e) => (W(), L("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Hr))), 128))], 40, Vr),
			i[17] ||= R("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[18] ||= R("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			R("div", Ur, [R("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Y(d)("player.back"),
				onClick: i[0] ||= Se((e) => s("back"), ["stop"])
			}, [B(t, { name: "arrow-left" })], 8, Wr), R("div", Gr, [
				R("p", Kr, q(Y(d)("player.nowPlaying")), 1),
				R("h2", qr, q(e.media.name), 1),
				R("div", Jr, [(W(!0), L(N, null, K(Rt.value, (e, t) => (W(), L(N, { key: t }, [t > 0 && !e.cert ? (W(), L("span", Yr, "·")) : I("", !0), R("span", { class: H({ player__cert: e.cert }) }, q(e.text), 3)], 64))), 128))])
			])]),
			J.value ? I("", !0) : (W(), L("div", Xr, [R("button", {
				type: "button",
				class: H(["player__bigplay", { "is-playing": Y(c).playing }]),
				"aria-label": Y(c).playing ? Y(d)("player.pause") : Y(d)("player.play"),
				onClick: Se(Gt, ["stop"])
			}, [B(t, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Zr)])),
			B(gt, {
				video: C.value,
				language: Y(c).subtitleLang,
				"style-config": Y(u).captionStyle,
				lifted: te.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			J.value ? I("", !0) : (W(), L("div", {
				key: 1,
				class: "player__controls",
				onClick: i[5] ||= Se(() => {}, ["stop"])
			}, [
				B(je, {
					position: Y(c).position,
					duration: Y(c).duration,
					buffered: Y(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": V.value,
					onSeek: $,
					onScrubStart: cn,
					onScrubEnd: ln
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				Y(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (W(), F(fr, {
					key: 0,
					position: Y(c).position,
					duration: Y(c).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: Ve
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : I("", !0),
				R("div", Qr, [
					e.prevEpisode ? (W(), L("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(d)("player.previousEpisode"),
						onClick: Ht
					}, [B(t, { name: "skip-back" })], 8, $r)) : I("", !0),
					R("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Y(c).playing ? Y(d)("player.pause") : Y(d)("player.play"),
						onClick: Gt
					}, [B(t, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, ei),
					e.nextEpisode ? (W(), L("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(d)("player.nextEpisode"),
						onClick: Wt
					}, [B(t, { name: "skip-forward" })], 8, ti)) : I("", !0),
					R("span", ni, [
						z(q(Y(Ee)(Y(c).position)), 1),
						i[13] ||= R("span", { class: "player__sep" }, " / ", -1),
						z(q(Y(Ee)(Y(c).duration)), 1)
					]),
					i[14] ||= R("span", { class: "player__grow" }, null, -1),
					R("button", {
						type: "button",
						class: H(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": v.value ? "true" : "false",
						onClick: b
					}, [B(t, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ri),
					B(h, {
						level: y.value,
						onCycle: ee
					}, null, 8, ["level"]),
					B(ot),
					B(st),
					B(ht, {
						levels: Y(j).levels.value,
						variants: Y(j).variants.value,
						"current-level": Y(j).currentLevel.value,
						"auto-enabled": Y(j).autoEnabled.value,
						"active-height": Y(j).activeLevelHeight.value,
						onSelect: De
					}, null, 8, [
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					B(Ut, {
						open: mt.value,
						"onUpdate:open": i[1] ||= (e) => mt.value = e,
						tracks: Q.value,
						"audio-tracks": St.value,
						"active-audio": Ct.value,
						onSelectAudio: Ft
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					B(ir, {
						open: wt.value,
						"onUpdate:open": i[2] ||= (e) => wt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					B(_r, {
						ref_key: "sleepTimerRef",
						ref: re,
						"on-expire": hn
					}, null, 512),
					R("button", {
						type: "button",
						class: H(["player__iconbtn player__syncplay", { "is-on": Y(f).isInRoom }]),
						"aria-label": Y(f).isInRoom ? Y(d)("syncplay.inRoom") : Y(d)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[3] ||= (e) => ie.value = !0
					}, [B(t, { name: "user" })], 10, ii),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(d)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[4] ||= (e) => D.value = !0
					}, [B(t, { name: "info" })], 8, ai),
					ne.value ? (W(), L("button", {
						key: 2,
						type: "button",
						class: H(["player__iconbtn", { "is-on": k.value }]),
						"aria-label": k.value ? Y(d)("player.exitPip") : Y(d)("player.pip"),
						"aria-pressed": k.value,
						onClick: xn
					}, [B(t, { name: "pip" })], 10, oi)) : I("", !0),
					R("button", {
						type: "button",
						class: H(["player__iconbtn", { "is-on": O.value }]),
						"aria-label": O.value ? Y(d)("player.exitTheater") : Y(d)("player.theater"),
						"aria-pressed": O.value,
						onClick: vn
					}, [B(t, { name: "theater" })], 10, si),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": T.value ? Y(d)("player.exitFullscreen") : Y(d)("player.fullscreen"),
						onClick: yn
					}, [B(t, { name: T.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ci)
				])
			])),
			J.value ? I("", !0) : (W(), F(zn, {
				key: 2,
				position: Y(c).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			J.value ? I("", !0) : (W(), F(Gn, {
				key: 3,
				position: Y(c).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Ae.value && !J.value ? (W(), F(tn, {
				key: 4,
				seconds: ke.value,
				onResume: $e,
				onRestart: et
			}, null, 8, ["seconds"])) : I("", !0),
			Z.value && Xe.value && !J.value ? (W(), F(Dn, {
				key: 5,
				media: Xe.value,
				remaining: Ne.value,
				total: Y(8),
				counting: Y(u).autoplay,
				onPlayNow: at,
				onCancel: ct
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : I("", !0),
			B(r, {
				modelValue: Le.value,
				"onUpdate:modelValue": i[6] ||= (e) => Le.value = e,
				title: `Similar ${Fe.value ?? "marker"}s`,
				size: "lg",
				onClose: Je
			}, {
				default: xe(() => [R("div", li, [ze.value ? (W(), L("div", ui, [B(x, { label: "Finding similar media" })])) : Be.value ? (W(), L("div", di, [B(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), R("p", fi, q(Be.value), 1)])) : !ze.value && Re.value.length === 0 ? (W(), L("div", pi, [
					B(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[15] ||= R("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[16] ||= R("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (W(), L("ul", mi, [(W(!0), L(N, null, K(Re.value, (e) => (W(), L("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [R("div", hi, [e.poster_url ? (W(), L("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, gi)) : (W(), L("div", _i, [B(t, { name: "film" })]))]), R("div", vi, [R("p", yi, q(e.name), 1), e.year ? (W(), L("p", bi, [z(q(e.year) + " ", 1), e.runtime ? (W(), L("span", xi, " · " + q(e.runtime) + "m", 1)) : I("", !0)])) : I("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Ce.value ? (W(), F(Rn, {
				key: 6,
				title: e.media.name,
				progress: Y(j).progress.value,
				onBack: i[7] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : I("", !0),
			we.value ? (W(), F(Mn, {
				key: 7,
				title: e.media.name,
				onBack: i[8] ||= (e) => s("back")
			}, null, 8, ["title"])) : I("", !0),
			Y(f).isInRoom ? (W(), F(zr, {
				key: 8,
				position: Y(c).position,
				duration: Y(c).duration,
				"is-playing": Y(c).playing,
				onSeek: $,
				onPlay: i[9] ||= (e) => void C.value?.play(),
				onPause: i[10] ||= (e) => void C.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : I("", !0),
			Y(f).isInRoom ? (W(), F(Dr, { key: 9 })) : I("", !0),
			B(he, {
				modelValue: ie.value,
				"onUpdate:modelValue": i[11] ||= (e) => ie.value = e
			}, null, 8, ["modelValue"]),
			B(it, {
				open: D.value,
				onClose: i[12] ||= (e) => D.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-34dca0c3"]]), Ci = { class: "player-page__stage" }, wi = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Ti = { class: "player-page__blocking-error" }, Ei = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = u(), i = d(), a = we(), o = Te(), s = p(), h = m(), g = G(null), _ = G(""), v = G([]), y = G(null), b = G(null), x = G([]), C = G([]), w = G(!0), ae = G(null), oe = G(!1), A = G(null), se = G(!1), ce = G(null), le = G(null), ue = P(() => String(a.params.id ?? ""));
		ee(() => g.value?.name);
		let de = P(() => {
			let e = g.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), j = null, fe = !1;
		function M(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function pe(e) {
			let t = i.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function me(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function he(e, r) {
			let i = j, a = () => fe || i !== j;
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
				let t = f(n.value, {
					genres: [o],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(t, void 0, i?.signal);
				if (a()) return;
				s.setQueue((c.items ?? []).filter((e) => e.id !== r.id).slice(0, 12));
			} catch (e) {
				if (a() || M(e)) return;
				s.setQueue([]);
			}
		}
		async function N(e, t, r) {
			let i = f(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function ge(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function V(e, t) {
			ce.value = O(e, t), le.value = k(e, t);
		}
		function _e(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function ve(e, n) {
			if (ce.value = null, le.value = null, !(n.type === "episode" || (n.episode_number ?? null) !== null)) return;
			let r = _e(n.id);
			if (r) {
				V(r, n.id);
				return;
			}
			let i = j, a = () => fe || i !== j;
			try {
				let r = await ge(e, n, i?.signal);
				if (a()) return;
				let o = await N(e, r.id, i?.signal);
				if (a()) return;
				if (D(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => N(e, t.id, i?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let c = E(o);
				c.length && t.set(r.id, c), V(c, n.id);
				let l = c.findIndex((e) => e.id === n.id), u = c.slice(l + 1);
				u.length && s.setQueue(u);
			} catch (e) {
				if (a() || M(e)) return;
				ce.value = null, le.value = null;
			}
		}
		async function K() {
			let e = ue.value;
			if (j?.abort(), j = typeof AbortController < "u" ? new AbortController() : null, w.value = !0, ae.value = null, v.value = [], y.value = null, b.value = null, x.value = [], C.value = [], ce.value = null, le.value = null, s.hideMiniPlayer(), !e) {
				ae.value = "No media id provided", w.value = !1;
				return;
			}
			let t = new l({ baseUrl: n.value });
			t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, j?.signal).then((e) => {
				fe || (v.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), y.value = me(e?.intro_marker), b.value = me(e?.outro_marker), x.value = cn(e?.audio_tracks), C.value = Fe(e?.subtitle_tracks));
			}).catch(() => null);
			let r = ne(e), i = Date.now();
			if (r && re(r, i)) {
				J(t, r.item);
				return;
			}
			let a = null;
			try {
				a = (await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, j?.signal)).item;
			} catch (e) {
				if (fe || M(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						A.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", se.value = !0, w.value = !1;
						return;
					}
				}
				if (r) {
					J(t, r.item);
					return;
				}
				ae.value = e instanceof Error ? e.message : "Failed to load media", w.value = !1;
				return;
			}
			if (!fe) {
				if (!a) {
					if (r) {
						J(t, r.item);
						return;
					}
					ae.value = "Failed to load media item", w.value = !1;
					return;
				}
				ie(e, a, i), J(t, a);
			}
		}
		function J(e, t) {
			g.value = t, h.hydrate(t), _.value = pe(t), w.value = !1, he(e, t), ve(e, t);
		}
		be(K), X(ue, K), Ce(() => {
			s.current && s.streamUrl && s.showMiniPlayer();
		}), ye(() => {
			fe = !0, j?.abort(), j = null;
		});
		function Se() {
			o?.back();
		}
		function Ee(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function De(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Oe(e) {
			oe.value = e;
		}
		function ke() {
			se.value = !1, Se();
		}
		return (e, t) => (W(), L("div", { class: H(["player-page", { "is-theater": oe.value }]) }, [
			de.value && !w.value && !ae.value ? (W(), L("div", {
				key: 0,
				class: "player-page__ambient",
				style: U(de.value),
				"aria-hidden": "true"
			}, null, 4)) : I("", !0),
			R("div", Ci, [w.value ? (W(), L("div", wi, [B(te, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : ae.value ? (W(), F(T, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: ae.value
			}, {
				actions: xe(() => [B(S, {
					variant: "solid",
					onClick: K
				}, {
					default: xe(() => [...t[1] ||= [z("Retry", -1)]]),
					_: 1
				}), B(S, {
					variant: "ghost",
					onClick: Se
				}, {
					default: xe(() => [...t[2] ||= [z("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : g.value ? (W(), F(Si, {
				key: 2,
				media: g.value,
				"stream-url": _.value,
				"stream-url-for": pe,
				"api-base": Y(n),
				chapters: v.value,
				"intro-marker": y.value,
				"outro-marker": b.value,
				"playback-audio-tracks": x.value,
				"playback-subtitle-tracks": C.value,
				"prev-episode": ce.value,
				"next-episode": le.value,
				autoplay: !0,
				onBack: Se,
				onPlayNext: Ee,
				onPlayEpisode: De,
				onTheater: Oe
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
			])) : I("", !0)]),
			B(r, {
				modelValue: se.value,
				"onUpdate:modelValue": t[0] ||= (e) => se.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: xe(() => [B(S, {
					variant: "solid",
					onClick: ke
				}, {
					default: xe(() => [...t[3] ||= [z("OK", -1)]]),
					_: 1
				})]),
				default: xe(() => [R("p", Ti, q(A.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-6c64191e"]]);
//#endregion
export { Ei as default };

//# sourceMappingURL=PlayerPage-BachyM0H.js.map