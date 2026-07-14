import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { n, t as r } from "./Modal-CSaTqZvF.js";
import { t as i } from "./useFocusTrap-DZxA3ZEr.js";
import { a } from "./usePreferencesStore-g-d6JBr9.js";
import { t as o } from "./useMessages-QU3qvt7A.js";
import { c as s, l as c, t as l } from "./client-D1nDQ0cP.js";
import { n as u, r as d } from "./useApiBase-CV_r-Kk4.js";
import { i as f } from "./usePlayerStore-fCCh6mOw.js";
import { n as p, t as m } from "./ThumbRating-jRpqLBjb.js";
import { a as h, n as g, o as _, r as v, t as y } from "./shortcuts-DGdfkJbu.js";
import { t as b } from "./Spinner-D1bwTvld.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as x } from "./Button-btm-GCUN.js";
import { t as S } from "./Slider-LnnvB5jy.js";
import { t as C } from "./Select-Bx8h2mSF.js";
import { t as te } from "./Skeleton-DhQmxeNg.js";
import { t as ne } from "./EmptyState-CfyGawh7.js";
import { n as w } from "./media-query-DKjhlX8r.js";
import { n as re, o as T, r as E, t as D } from "./episode-order-C2yqgMeX.js";
import { n as ie, r as ae, t as oe } from "./useMediaItemCache-BKCJnCbr.js";
import { a as se, c as ce, d as O, f as le, i as ue, l as de, n as fe, o as pe, r as k, s as me, t as A, u as he } from "./captions-DoP7ce5A.js";
import { n as ge, t as _e } from "./SyncPlayModal-D7PFksqD.js";
import { Fragment as j, Transition as ve, computed as M, createBlock as N, createCommentVNode as P, createElementBlock as F, createElementVNode as I, createTextVNode as L, createVNode as R, defineComponent as z, inject as ye, nextTick as be, normalizeClass as B, normalizeStyle as V, onBeforeUnmount as xe, onMounted as Se, openBlock as H, ref as U, renderList as W, toDisplayString as G, toRef as K, unref as q, watch as J, withCtx as Ce, withModifiers as Y } from "vue";
import { onBeforeRouteLeave as we, useRoute as Te, useRouter as Ee } from "vue-router";
//#region src/components/player/format-time.ts
function X(e) {
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
], Oe = { class: "scrubber__track" }, ke = ["title"], Ae = { class: "scrubber__time numeric" }, je = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let { t: r } = o(), i = e, a = n, s = U(null), c = U(!1), l = U(!1), u = U(0), d = U(0), f = (e) => Math.min(1, Math.max(0, e)), p = M(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = M(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = M(() => (c.value || l.value) && i.duration > 0), g = M(() => c.value ? u.value : d.value), _ = M(() => g.value * i.duration), v = M(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = M(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = M(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), ee = M(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function x(e) {
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
				u.value = x(e), a("scrub-start"), e.preventDefault();
			}
		}
		function C(e) {
			let t = x(e);
			d.value = t, c.value && (u.value = t);
		}
		function te(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				a("seek", u.value * i.duration), a("scrub-end");
			}
		}
		function ne() {
			l.value = !0;
		}
		function w() {
			l.value = !1;
		}
		function re(e) {
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
		}), (t, n) => (H(), F("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": q(X)(e.position),
			"aria-label": q(r)("player.seek"),
			onPointerdown: S,
			onPointermove: C,
			onPointerup: te,
			onPointercancel: te,
			onPointerenter: ne,
			onPointerleave: w,
			onKeydown: re
		}, [I("div", Oe, [
			I("div", {
				class: "scrubber__buffered",
				style: V({ transform: `scaleX(${m.value})` })
			}, null, 4),
			I("div", {
				class: "scrubber__played",
				style: V({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(H(!0), F(j, null, W(ee.value, (e, t) => (H(), F("span", {
				key: t,
				class: "scrubber__tick",
				style: V({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, ke))), 128)),
			I("div", {
				class: B(["scrubber__head", { "is-dragging": c.value }]),
				style: V({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (H(), F("div", {
			key: 0,
			class: "scrubber__preview",
			style: V({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (H(), F("div", {
			key: 0,
			class: "scrubber__thumb",
			style: V({ backgroundImage: y.value })
		}, null, 4)) : P("", !0), I("span", Ae, G(q(X)(_.value)), 1)], 4)) : P("", !0)], 40, De));
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
	let t = U("idle"), n = U(0), r = U([]), i = U([]), a = U(-1), o = U(!0), s = U(null), c = U(null), u = U([]), d = U(-1);
	function p(e) {
		if (!w) return;
		i.value = w.levels, a.value = w.getCurrentLevel(), o.value = w.autoLevelEnabled;
		let t = e ?? w.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function m() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function h(e) {
		w && (u.value = w.audioTracks, d.value = e ?? w.getCurrentAudioTrack());
	}
	function g() {
		u.value = [], d.value = -1;
	}
	function v(e) {
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
	let b = e.attach ?? _, ee = e.pollIntervalMs ?? 1e3, x = e.maxWaitMs ?? 12e4, S = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), C = Math.max(1, Math.ceil(x / Math.max(1, ee))), te = Ge(), ne = e.getToken ?? (() => Ke(te)), w = null, re = null, T = null, E = !1, D = null;
	function ie() {
		return e.client ?? new l({
			baseUrl: e.apiBase(),
			tokenStore: te ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function ae(i, a, o, s) {
		O(), E = !1, D = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], m();
		try {
			let r = ie(), c = ze(await r.post(Le(a, o), void 0, D.signal));
			if (E) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			y(c.subtitles), v(c.variants);
			let l = Ue(e.apiBase(), c.masterUrl), u = c.status === "completed";
			for (let e = 0; !u && e < C; e++) {
				let e = Be(await r.get(Re(c.jobId), void 0, D.signal));
				if (E) return;
				if (n.value = e.progress, y(e.subtitles), v(e.variants), He(e.status)) throw Error(`transcode ${e.status}`);
				if (Ve(e)) {
					u = !0;
					break;
				}
				if (await S(ee), E) return;
			}
			if (!u) throw Error("transcode timed out");
			if (w = await b(i, l, {
				getToken: ne,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => p(),
				onError: () => {
					E || (t.value = "error");
				}
			}), E) {
				w.destroy(), w = null;
				return;
			}
			re = w.onLevelSwitched((e) => p(e)), T = w.onAudioTrackSwitched((e) => h(e)), p(), h();
			try {
				let e = f();
				e.hlsMasterUrl = l;
			} catch {}
			t.value = "ready";
		} catch {
			E || (t.value = "error");
		}
	}
	function oe(e) {
		w && (w.setCurrentLevel(e === "auto" ? -1 : e), p());
	}
	function se(e) {
		w && (w.setNextLevel(e === "auto" ? -1 : e), p());
	}
	function ce(e) {
		w && (w.setAudioTrack(e), h());
	}
	function O() {
		if (E = !0, D &&= (D.abort(), null), re) {
			try {
				re();
			} catch {}
			re = null;
		}
		if (T) {
			try {
				T();
			} catch {}
			T = null;
		}
		if (w) {
			try {
				w.destroy();
			} catch {}
			w = null;
		}
	}
	function le() {
		O(), t.value = "idle", n.value = 0, r.value = [], m(), g();
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
		setLevel: oe,
		setNextLevel: se,
		setAudioTrack: ce,
		start: ae,
		cleanup: O,
		reset: le
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
	let t = U(null), n = U(!1), r = U(null), i = /* @__PURE__ */ new Map();
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
}, rt = { class: "shortcuts__label" }, it = /*#__PURE__*/ e(/* @__PURE__ */ z({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => v }
	},
	emits: ["close"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o(), l = U(null);
		return i(l, K(a, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (H(), F("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= Y((e) => s("close"), ["self"])
		}, [I("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": q(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [I("div", Ze, [I("h3", Qe, G(q(c)("player.keyboard")), 1), R(n, {
			name: "x",
			label: q(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), I("ul", $e, [(H(!0), F(j, null, W(e.shortcuts, (e) => (H(), F("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [I("span", et, [(H(!0), F(j, null, W(e.keys, (e, n) => (H(), F(j, { key: n }, [e === "–" ? (H(), F("span", tt, "–")) : (H(), F("kbd", nt, [q(y)[e] ? (H(), N(t, {
			key: 0,
			name: q(y)[e],
			label: q(g)[e] ?? e
		}, null, 8, ["name", "label"])) : (H(), F(j, { key: 1 }, [L(G(e), 1)], 64))]))], 64))), 128))]), I("span", rt, G(e.label), 1)]))), 128))])], 8, Xe)])) : P("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), at = { class: "volume" }, ot = /*#__PURE__*/ e(/* @__PURE__ */ z({
	__name: "VolumeControl",
	setup(e) {
		let t = f(), r = a(), { t: i } = o(), s = M(() => t.muted ? 0 : t.volume), c = M(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return J(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (H(), F("div", at, [R(n, {
			name: c.value,
			label: q(t).muted ? q(i)("player.unmute") : q(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => q(t).toggleMute()
		}, null, 8, ["name", "label"]), R(S, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: q(i)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), st = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		], n = f(), { t: r } = o(), i = M(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (H(), N(C, {
			class: "speed-menu",
			tone: "glass",
			"model-value": q(n).rate,
			options: i.value,
			label: q(r)("player.playbackSpeed"),
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
	if (n >= 0) return n;
	let i = -1, a = Infinity;
	for (let n of e) if (n.height >= t.height) {
		let e = n.height - t.height;
		e < a && (i = n.index, a = e);
	}
	return i;
}
function mt(e, t) {
	if (t < 0) return ct;
	let n = e.find((e) => e.index === t);
	return n ? Q(n.height) : ct;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var ht = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let n = e, r = t, i = f(), s = a(), { t: c } = o(), l = M(() => dt(n.levels)), u = M(() => {
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
		}), d = M(() => l.value.length >= 2 ? l.value : u.value), p = M(() => n.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), m = M(() => pt(n.levels, p.value)), h = M(() => p.value && m.value >= 0 ? {
			value: lt,
			label: c("player.qualityOriginal", { height: p.value.height })
		} : null), g = M(() => d.value.length >= 2), _ = M(() => n.activeHeight == null ? c("player.qualityAuto") : c("player.qualityAutoActive", { label: ut(n.activeHeight) })), v = M(() => [
			{
				value: ct,
				label: _.value
			},
			...h.value ? [h.value] : [],
			...d.value
		]), y = M(() => n.autoEnabled ? ct : h.value && n.currentLevel === m.value && (i.quality === "original" || s.defaultQuality === "original") ? lt : mt(n.levels, n.currentLevel));
		function b(e) {
			let t = String(e);
			if (t === "auto") {
				i.setQuality(t), s.defaultQuality = t, r("select", "auto");
				return;
			}
			let a = t === "original" ? m.value : ft(n.levels, t);
			a < 0 || (i.setQuality(t), s.defaultQuality = t, r("select", a));
		}
		return (e, t) => g.value ? (H(), N(C, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": y.value,
			options: v.value,
			label: q(c)("player.quality"),
			"onUpdate:modelValue": b
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : P("", !0);
	}
}), [["__scopeId", "data-v-719cf103"]]), gt = /*#__PURE__*/ e(/* @__PURE__ */ z({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = U([]), i = M(() => ce(n.styleConfig)), a = null, o = null;
		function s() {
			r.value = O(a);
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
			c(), me(n.video, n.language);
			let e = le(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", s), r.value = O(e), !r.value.length) {
					let t = l(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", s));
				}
			} else r.value = [];
		}
		return J(() => [n.video, n.language], u, { immediate: !0 }), xe(c), t({ lines: r }), (t, n) => r.value.length ? (H(), F("div", {
			key: 0,
			class: B(["player__captions", { "is-lifted": e.lifted }]),
			style: V(i.value)
		}, [(H(!0), F(j, null, W(r.value, (e, t) => (H(), F("p", {
			key: t,
			class: "player__caption-line"
		}, G(e), 1))), 128))], 6)) : P("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), _t = ["aria-label", "aria-expanded"], vt = ["aria-label"], yt = { class: "capmenu__head" }, bt = { class: "capmenu__title" }, xt = ["aria-label"], St = ["aria-checked", "tabindex"], Ct = { class: "capmenu__check" }, wt = { class: "capmenu__optlabel" }, Tt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Et = { class: "capmenu__check" }, Dt = { class: "capmenu__optlabel" }, Ot = { class: "capmenu__title capmenu__title--sub" }, kt = ["aria-label"], At = [
	"aria-checked",
	"tabindex",
	"onClick"
], jt = { class: "capmenu__check" }, Mt = { class: "capmenu__optlabel" }, Nt = { class: "capmenu__title capmenu__title--sub" }, Pt = { class: "capmenu__style" }, Ft = { class: "capmenu__field" }, It = { class: "capmenu__fieldlabel" }, Lt = { class: "capmenu__field" }, Rt = { class: "capmenu__fieldlabel" }, zt = { class: "capmenu__field" }, Bt = { class: "capmenu__fieldlabel" }, Vt = { class: "capmenu__field" }, Ht = { class: "capmenu__fieldlabel" }, Ut = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let s = e, c = r, l = f(), u = a(), { t: d } = o(), p = U(null), m = U(null), h = M(() => l.subtitleLang), g = M(() => s.tracks.some((e) => e.language === h.value)), _ = M(() => g.value ? "captions" : "captions-off"), v = M(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = M(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function b(e) {
			c("update:open", e);
		}
		function ee() {
			b(!1);
		}
		function x(e) {
			l.setSubtitle(e), u.defaultSubtitleLang = e, u.subtitlePreferenceSet = !0;
		}
		function S(e) {
			c("select-audio", e);
		}
		function te(e, t, n) {
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
		function ne(e) {
			let t = te(e, s.tracks.length + 1, v.value);
			t !== null && x(t === 0 ? null : s.tracks[t - 1].language);
		}
		function w(e) {
			let t = te(e, s.audioTracks.length, y.value);
			t !== null && S(s.audioTracks[t].index);
		}
		function re(e) {
			u.captionStyle = {
				...u.captionStyle,
				size: e
			};
		}
		function T(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function E(e) {
			u.captionStyle = {
				...u.captionStyle,
				background: e
			};
		}
		function D(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		i(m, K(s, "open"), {
			lockScroll: !1,
			onEscape: () => (ee(), !0)
		});
		function ie(e) {
			p.value && !p.value.contains(e.target) && ee();
		}
		return J(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", ie, !0) : document.removeEventListener("pointerdown", ie, !0));
		}, { immediate: !0 }), xe(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", ie, !0);
		}), (r, i) => (H(), F("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [I("button", {
			type: "button",
			class: B(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? q(d)("player.captionsOn") : q(d)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [R(t, { name: _.value }, null, 8, ["name"])], 10, _t), e.open ? (H(), F("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": q(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			I("div", yt, [I("h3", bt, G(q(d)("player.subtitles")), 1), R(n, {
				name: "x",
				label: q(d)("common.close"),
				size: "sm",
				onClick: ee
			}, null, 8, ["label"])]),
			I("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": q(d)("player.subtitleTrack"),
				onKeydown: ne
			}, [I("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => x(null)
			}, [I("span", Ct, [g.value ? P("", !0) : (H(), N(t, {
				key: 0,
				name: "check"
			}))]), I("span", wt, G(q(d)("player.off")), 1)], 8, St), (H(!0), F(j, null, W(e.tracks, (e, n) => (H(), F("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => x(e.language)
			}, [I("span", Et, [h.value === e.language ? (H(), N(t, {
				key: 0,
				name: "check"
			})) : P("", !0)]), I("span", Dt, G(e.label), 1)], 8, Tt))), 128))], 40, xt),
			e.audioTracks.length > 1 ? (H(), F(j, { key: 0 }, [I("h3", Ot, G(q(d)("player.audio")), 1), I("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": q(d)("player.audioTrack"),
				onKeydown: w
			}, [(H(!0), F(j, null, W(e.audioTracks, (n) => (H(), F("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => S(n.index)
			}, [I("span", jt, [e.activeAudio === n.index ? (H(), N(t, {
				key: 0,
				name: "check"
			})) : P("", !0)]), I("span", Mt, G(n.label), 1)], 8, At))), 128))], 40, kt)], 64)) : P("", !0),
			I("h3", Nt, G(q(d)("player.captionStyle")), 1),
			I("div", Pt, [
				I("div", Ft, [I("span", It, G(q(d)("player.size")), 1), R(C, {
					"model-value": q(u).captionStyle.size,
					options: q(ue),
					label: q(d)("player.captionSize"),
					"onUpdate:modelValue": re
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				I("div", Lt, [I("span", Rt, G(q(d)("player.color")), 1), R(C, {
					"model-value": q(u).captionStyle.textColor,
					options: q(fe),
					label: q(d)("player.captionColor"),
					"onUpdate:modelValue": T
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				I("div", zt, [I("span", Bt, G(q(d)("player.background")), 1), R(C, {
					"model-value": q(u).captionStyle.background,
					options: q(A),
					label: q(d)("player.captionBackground"),
					"onUpdate:modelValue": E
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				I("div", Vt, [I("span", Ht, G(q(d)("player.edge")), 1), R(C, {
					"model-value": q(u).captionStyle.edge,
					options: q(k),
					label: q(d)("player.captionEdge"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, vt)) : P("", !0)], 512));
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
var Xt = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let n = e, r = U(!1), i = null;
		function a() {
			r.value = Yt(i);
		}
		let o = M(() => n.enabled && !n.reducedMotion && !r.value), s = M(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = U(null), l = null, u = null, d = !1, f = !1;
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
		J(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			C(), e && t && S();
		}, { immediate: !0 }), Se(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), xe(() => {
			C(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let te = M(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (H(), F("div", {
			class: B(["player__ambient", { "is-active": o.value }]),
			style: V(o.value ? te.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Zt = ["aria-label"], Qt = { class: "resume__label" }, $t = { class: "resume__time numeric" }, en = { class: "resume__actions" }, tn = /*#__PURE__*/ e(/* @__PURE__ */ z({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o(), a = M(() => i("player.resumeFrom").split("{time}"));
		return (n, o) => (H(), F("div", {
			class: "resume",
			role: "region",
			"aria-label": q(i)("player.resumePlayback")
		}, [I("p", Qt, [
			L(G(a.value[0]), 1),
			I("span", $t, G(q(X)(e.seconds)), 1),
			L(G(a.value[1]), 1)
		]), I("div", en, [I("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: o[0] ||= (e) => r("resume")
		}, [R(t, { name: "play" }), I("span", null, G(q(i)("player.resume")), 1)]), I("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: o[1] ||= (e) => r("restart")
		}, [R(t, { name: "rewind" }), I("span", null, G(q(i)("player.startOver")), 1)])])], 8, Zt));
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
], Dn = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let { t: r } = o(), i = e, a = n, s = M(() => i.posterUrl ?? i.media.poster_url ?? null), c = M(() => un(i.remaining, i.total));
		return (n, i) => (H(), F("aside", {
			class: "upnext",
			role: "region",
			"aria-label": q(r)("player.upNext")
		}, [
			s.value ? (H(), F("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, vn)) : P("", !0),
			I("div", yn, [
				I("p", bn, G(q(r)("player.upNext")), 1),
				I("h4", xn, G(e.media.name), 1),
				e.counting ? (H(), F("p", Sn, G(q(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : P("", !0),
				I("div", Cn, [I("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [R(t, { name: "play" }), I("span", null, G(q(r)("player.playNow")), 1)]), I("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, G(q(r)("player.cancel")), 1)])
			]),
			e.counting ? (H(), F("svg", wn, [I("circle", {
				cx: "18",
				cy: "18",
				r: q(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Tn), I("circle", {
				cx: "18",
				cy: "18",
				r: q(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": q(ln),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, En)])) : P("", !0)
		], 8, _n));
	}
}), [["__scopeId", "data-v-85909b2d"]]), On = {
	class: "transcode",
	role: "alert"
}, kn = { class: "transcode__card" }, An = { class: "transcode__heading" }, jn = { class: "transcode__body" }, Mn = /*#__PURE__*/ e(/* @__PURE__ */ z({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o();
		return (n, a) => (H(), F("div", On, [I("div", kn, [
			R(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			I("h3", An, G(q(i)("player.transcodeHeading")), 1),
			I("p", jn, G(e.title ? q(i)("player.transcodeBodyTitled", { title: e.title }) : q(i)("player.transcodeBodyUntitled")), 1),
			I("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [R(t, { name: "arrow-left" }), I("span", null, G(q(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), Nn = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Pn = { class: "prep__card" }, Fn = { class: "prep__heading" }, In = { class: "prep__body" }, Ln = ["aria-valuenow"], Rn = /*#__PURE__*/ e(/* @__PURE__ */ z({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = o(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (H(), F("div", Nn, [I("div", Pn, [
			R(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			I("h3", Fn, G(q(r)("player.transcodePreparingHeading")), 1),
			I("p", In, G(e.title ? q(r)("player.transcodePreparingTitled", { title: e.title }) : q(r)("player.transcodePreparingUntitled")), 1),
			I("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [I("div", {
				class: "prep__bar-fill",
				style: V({ width: i() + "%" })
			}, null, 4)], 8, Ln),
			I("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [R(t, { name: "arrow-left" }), I("span", null, G(q(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), zn = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let c = M(() => s(r.position, r.introMarker) ? {
			label: a("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: a("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (H(), N(ve, { name: "skip" }, {
			default: Ce(() => [c.value ? (H(), F("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Y(l, ["stop"])
			}, [I("span", null, G(c.value.label), 1), R(t, { name: "skip-forward" })])) : P("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Bn = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, Vn = ["aria-label", "onClick"], Hn = { class: "skip-controls__label" }, Un = 5, Wn = 30, Gn = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let f = M(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (H(), F("div", Bn, [(H(!0), F(j, null, W(f.value, (e) => (H(), F("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: Y((t) => p(e), ["stop"])
		}, [I("span", Hn, G(d(e.type)), 1), R(t, { name: "skip-forward" })], 8, Vn))), 128))])) : P("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Kn = ["aria-label", "aria-expanded"], qn = ["aria-label"], Jn = { class: "chapterlist__head" }, Yn = { class: "chapterlist__title" }, Xn = ["aria-label"], Zn = ["onClick"], Qn = { class: "chapterlist__index" }, $n = { class: "chapterlist__name" }, er = { class: "chapterlist__meta" }, tr = { class: "chapterlist__time" }, nr = {
	key: 0,
	class: "chapterlist__duration"
}, rr = {
	key: 1,
	class: "chapterlist__empty"
}, ir = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let d = M(() => a.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = X(e.start), a;
			return e.end != null && e.end > e.start && (a = X(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = U(null), p = U(null);
		i(p, K(a, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		J(() => a.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), xe(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (H(), F("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [I("button", {
			type: "button",
			class: B(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": q(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [R(t, { name: "list" })], 10, Kn), e.open ? (H(), F("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": q(c)("player.chapterList"),
			tabindex: "-1"
		}, [I("div", Jn, [I("h3", Yn, G(q(c)("player.chapters")), 1), R(n, {
			name: "x",
			label: q(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (H(), F("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": q(c)("player.chapterList")
		}, [(H(!0), F(j, null, W(d.value, (e) => (H(), F("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [I("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			I("span", Qn, G(e.index), 1),
			I("span", $n, G(e.label), 1),
			I("span", er, [I("span", tr, G(e.startLabel), 1), e.durationLabel ? (H(), F("span", nr, "· " + G(e.durationLabel), 1)) : P("", !0)])
		], 8, Zn)]))), 128))], 8, Xn)) : (H(), F("p", rr, G(q(c)("player.noChapters")), 1))], 8, qn)) : P("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ar = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, or = { class: "marker-timeline__ticks" }, sr = [
	"title",
	"aria-label",
	"onClick"
], cr = { class: "marker-timeline__tooltip" }, lr = { class: "marker-timeline__tooltip-label" }, ur = { class: "marker-timeline__tooltip-time numeric" }, dr = ["onClick"], fr = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let s = M(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = M(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = M(() => c.value !== null), u = M(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (H(), F("div", {
			key: 0,
			class: B(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (H(), F("div", ar, [t[0] ||= I("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [I("polygon", { points: "5,3 19,12 5,21" })], -1), L(" " + G(u.value), 1)])) : P("", !0), I("div", or, [(H(!0), F(j, null, W(s.value, (e) => (H(), F("button", {
			key: e.id,
			type: "button",
			class: B(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: V({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${q(X)(e.startSec)}`,
			"aria-label": `${e.label} at ${q(X)(e.startSec)}`,
			onClick: Y((t) => d(e), ["stop"])
		}, [I("span", cr, [
			I("span", lr, G(e.label), 1),
			I("span", ur, G(q(X)(e.startSec)), 1),
			I("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Y((t) => f(e), ["stop"])
			}, " Find similar ", 8, dr)
		])], 14, sr))), 128))])], 2)) : P("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), pr = ["aria-label", "aria-expanded"], mr = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, hr = ["aria-label"], gr = ["aria-selected", "onClick"], _r = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		], s = U(0), c = U(0), l = M(() => c.value > 0), u;
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
		let h = U(!1);
		function g() {
			l.value ? (p(0), h.value = !1) : h.value = !h.value;
		}
		function _(e) {
			p(e), h.value = !1;
		}
		return xe(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (H(), F("div", { class: B(["sleep-timer", { "is-active": l.value }]) }, [I("button", {
			type: "button",
			class: B(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : q(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [R(t, { name: "moon" }), l.value ? (H(), F("span", mr, G(m(c.value)), 1)) : P("", !0)], 10, pr), R(ve, { name: "dropdown" }, {
			default: Ce(() => [h.value ? (H(), F("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": q(i)("player.sleepTimer")
			}, [(H(), F(j, null, W(a, (e) => I("li", {
				key: e.value,
				class: B(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, G(e.label), 11, gr)), 64))], 8, hr)) : P("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), vr = {
	key: 0,
	class: "syncplay-overlay"
}, yr = { class: "syncplay-overlay__badge" }, br = { class: "syncplay-overlay__label" }, xr = { class: "syncplay-overlay__status-label" }, Sr = { class: "syncplay-overlay__members" }, Cr = { class: "syncplay-overlay__member-count" }, wr = { class: "syncplay-overlay__member-list" }, Tr = { class: "syncplay-overlay__member-name" }, Er = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Dr = /*#__PURE__*/ e(/* @__PURE__ */ z({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = o(), i = ge(), a = u(), s = M(() => n.apiBase ?? a.value), c = M(() => i.currentRoom?.name ?? "SyncPlay"), l = M(() => i.onlineMembers.length), d = M(() => i.syncStatus), f = M(() => {
			switch (d.value) {
				case "synced": return r("syncplay.synced");
				case "outOfSync": return r("syncplay.outOfSync");
				case "re-syncing": return r("syncplay.reSyncing");
				default: return r("syncplay.synced");
			}
		}), p = M(() => {
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
		return (e, n) => q(i).isInRoom ? (H(), F("div", vr, [
			I("div", yr, [R(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), I("span", br, "SyncPlay: " + G(c.value), 1)]),
			I("div", { class: B(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [R(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), I("span", xr, G(f.value), 1)], 2),
			I("div", Sr, [I("span", Cr, [R(t, { name: "user" }), L(" " + G(l.value) + " " + G(q(r)("syncplay.members", { count: l.value })), 1)]), I("ul", wr, [(H(!0), F(j, null, W(q(i).onlineMembers.slice(0, 5), (e) => (H(), F("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= I("span", { class: "syncplay-overlay__member-dot" }, null, -1), I("span", Tr, G(e.name), 1)]))), 128)), q(i).onlineMembers.length > 5 ? (H(), F("li", Er, " +" + G(q(i).onlineMembers.length - 5) + " more ", 1)) : P("", !0)])]),
			R(x, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: Ce(() => [L(G(q(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : P("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), Or = {
	key: 0,
	class: "syncplay-controls"
}, kr = ["aria-label"], Ar = { class: "syncplay-controls__wait-label" }, jr = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, Mr = { key: 0 }, Nr = { class: "syncplay-controls__transport" }, Pr = ["aria-label"], Fr = ["aria-label"], Ir = ["aria-label"], Lr = { class: "syncplay-controls__status-label" }, Rr = 10, zr = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let r = e, i = n, { t: a } = o(), s = ge(), c = u(), l = M(() => r.apiBase ?? c.value), d = U(!1), f = U([]), p = M(() => d.value || s.syncStatus === "re-syncing");
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
		return J(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => q(s).isInRoom ? (H(), F("div", Or, [
			p.value ? (H(), F("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": q(a)("syncplay.waitingForMembers")
			}, [
				R(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				I("span", Ar, G(q(a)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (H(), F("span", jr, [L(G(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (H(), F("span", Mr, "+" + G(f.value.length - 3), 1)) : P("", !0)])) : P("", !0)
			], 8, kr)) : P("", !0),
			I("div", Nr, [
				I("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": q(a)("syncplay.rewind"),
					onClick: v
				}, [R(t, { name: "rewind" })], 8, Pr),
				I("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? q(a)("syncplay.pauseAll") : q(a)("syncplay.playAll"),
					onClick: g
				}, [R(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Fr),
				I("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": q(a)("syncplay.fastForward"),
					onClick: y
				}, [R(t, { name: "forward" })], 8, Ir)
			]),
			I("div", { class: B(["syncplay-controls__status", `syncplay-controls__status--${q(s).syncStatus}`]) }, [R(t, {
				name: q(s).syncStatus === "synced" ? "check" : q(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), I("span", Lr, G(q(s).syncStatus === "synced" ? q(a)("syncplay.synced") : q(s).syncStatus === "outOfSync" ? q(a)("syncplay.outOfSync") : q(a)("syncplay.reSyncing")), 1)], 2)
		])) : P("", !0);
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
}, xi = { key: 0 }, Si = /*#__PURE__*/ e(/* @__PURE__ */ z({
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
		let i = e, s = n, c = f(), u = a(), { t: d } = o(), g = ge(), _ = p(), v = M(() => _.isFavorite(i.media.id)), y = M(() => _.likeLevel(i.media.id));
		function ee() {
			_.toggleFavorite(i.media.id, fe());
		}
		function x(e) {
			_.setLike(i.media.id, e, fe());
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
		], C = U(null), te = U(null), ne = U(!0), w = U(!1), re = U(!1), T = U(!1), E = U(!1), D = U(!1), ie = U(!1), ae = U(null), oe = U(!1), ce = M(() => E.value ? 1.35 : 1), O = U(an(i.streamUrl, i.media.path));
		async function le() {
			if (O.value) return;
			let e = i.playbackAudioTracks ?? [];
			e.length !== 0 && await gn([i.streamUrl, i.media.path], e) && (O.value = !0);
		}
		J(() => i.playbackAudioTracks, (e) => {
			!e || e.length === 0 || le();
		}, { immediate: !1 });
		let ue = ye("phlixConfig", null);
		function fe() {
			return ue?.apiBase ?? "";
		}
		let k = We({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: ue?.playerHlsConfig
		}), me = Ye({ apiBase: () => i.apiBase ?? "" }), A = null;
		function ve(e) {
			A !== null && clearTimeout(A), A = setTimeout(() => {
				A = null, me.fetch(e);
			}, 0);
		}
		let z = M(() => i.thumbnailAt ?? me.thumbnailAt), V = M(() => O.value ? void 0 : i.streamUrl), K = M(() => O.value && k.state.value !== "ready"), we = M(() => O.value && (k.state.value === "preparing" || k.state.value === "idle")), Te = M(() => O.value && k.state.value === "error");
		function Ee(e = 0) {
			let t = C.value;
			t && k.start(t, i.media.id, void 0, e);
		}
		function De(e) {
			k.setLevel(e);
		}
		let Oe = !1;
		J(() => k.levels.value, (e) => {
			if (Oe || e.length === 0) return;
			Oe = !0;
			let t = u.defaultQuality;
			if (!t || t === "auto") return;
			let n = t === "original" ? pt(e, k.variants.value?.find((e) => e.id === "original") ?? null) : ft(e, t);
			n >= 0 && k.setNextLevel(n);
		}), J(() => k.variants.value, (e) => {
			e?.length && !Oe && (Oe = !1, be(() => {
				if (k.levels.value.length > 0) {
					Oe = !0;
					let t = u.defaultQuality;
					if (!t || t === "auto") return;
					let n = t === "original" ? pt(k.levels.value, e.find((e) => e.id === "original") ?? null) : ft(k.levels.value, t);
					n >= 0 && k.setNextLevel(n);
				}
			}));
		}, { deep: !0 });
		let ke = U(c.resumePositionFor(i.media.id) ?? 0), Ae = U(!O.value && ke.value > 0), Me = null, Z = U(!1), Ne = U(8), Pe, Fe = U(null), Ie = U(0), Le = U(!1), Re = U([]), ze = U(!1), Be = U(null);
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
		let Xe = M(() => c.upNext);
		function Ze() {
			O.value = an(i.streamUrl, i.media.path), le(), ke.value = c.resumePositionFor(i.media.id) ?? 0, Ae.value = !O.value && ke.value > 0, Me = null, zt = !1, Dt = !1, Ot = !1, bt.value = -1, Pt = null, Oe = !1, tt(), Z.value = !1, k.reset(), C.value && (C.value.currentTime = 0), O.value && Ee(), ve(i.media.id);
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
			wn(), ne.value = !0, c.upNext && (Z.value = !0, u.autoplay && nt());
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
			if (O.value) return;
			let e = C.value, t = sn(e) && (e?.currentTime ?? 0) === 0;
			(on(e) || t) && (O.value = !0, Ee(e?.currentTime ?? 0));
		}
		let Q = U([]), ut = U([]), dt = U(-1), mt = U(!1), _t = M(() => k.state.value === "ready" && k.audioTracks.value.length > 0), vt = M(() => k.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), yt = M(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), bt = U(-1), xt = M(() => !_t.value && !O.value && ut.value.length === 0 && yt.value.length > 1), St = M(() => _t.value ? vt.value : xt.value ? yt.value : ut.value), Ct = M(() => {
			if (_t.value) return k.currentAudioTrack.value;
			if (xt.value) {
				if (bt.value >= 0) return bt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return dt.value;
		}), wt = U(!1), Tt = c.subtitleLang, Et = M(() => O.value ? k.subtitleTracks.value : i.playbackSubtitleTracks ?? []), Dt = !1, Ot = !1;
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
		let jt = M(() => Q.value.some((e) => e.language === c.subtitleLang));
		function Mt() {
			let e = C.value;
			Q.value = he(e), ut.value = de(e), dt.value = se(e), kt(), At();
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
			if (_t.value) k.setAudioTrack(e);
			else if (xt.value) {
				if (e === Ct.value) return;
				bt.value = e, Pt = e, O.value = !0, Ee(C.value?.currentTime ?? 0);
			} else pe(C.value, e), dt.value = e;
		}
		J(_t, (e) => {
			if (!e || Pt === null) return;
			let t = Pt;
			Pt = null, t >= 0 && t < k.audioTracks.value.length && k.setAudioTrack(t);
		}), J(Et, () => {
			be(() => Mt());
		}, { deep: !0 });
		let It = null, Lt, Rt = M(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), zt = !1;
		function Bt() {
			if (!i.autoplay || zt || Ae.value || K.value) return;
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
			re.value = !0, En();
		}
		function ln() {
			re.value = !1, En();
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
			ae.value?.toggleOpen();
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
		h({
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
				T.value = !T.value;
			}
		}, { enabled: () => !T.value && !mt.value && !wt.value });
		function _n() {
			c.toggleMute();
		}
		function vn() {
			E.value = !E.value, s("theater", E.value);
		}
		J(() => c.muted, (e) => {
			let t = C.value;
			t && t.muted !== e && (t.muted = e);
		}), J(() => c.volume, (e) => {
			let t = C.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), J(() => c.rate, (e) => {
			let t = C.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), J(() => c.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Qe(e.value) : e.type === "seekBy" && Qe(c.position + e.value));
		});
		function yn() {
			if (typeof document > "u") return;
			let e = te.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function bn() {
			w.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function xn() {
			let e = C.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function Sn() {
			D.value = !0;
		}
		function Cn() {
			D.value = !1;
		}
		function wn() {
			Lt &&= (clearTimeout(Lt), void 0);
		}
		function Tn() {
			wn(), !(!c.playing || re.value) && (Lt = setTimeout(() => {
				c.playing && !re.value && (ne.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function En() {
			ne.value = !0, Tn();
		}
		J(() => c.playing, (e) => {
			e ? (Ae.value = !1, ct(), Tn()) : (wn(), ne.value = !0);
		});
		let On = null;
		return Se(() => {
			c.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), _.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", bn), ie.value = document.pictureInPictureEnabled === !0), On = c.bindMediaSession({
				onPlay: () => void C.value?.play()?.catch(() => {}),
				onPause: () => C.value?.pause(),
				onSeek: (e) => $(e)
			}), It = C.value?.textTracks ?? null, It?.addEventListener?.("addtrack", Mt), It?.addEventListener?.("removetrack", Mt), Mt(), O.value && Ee(), ve(i.media.id);
		}), J(() => i.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), Ze();
		}), J(() => i.media?.id, () => {
			_.hydrate(i.media);
		}), J(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (C.value?.play(), c.play()) : e.state === "paused" && (C.value?.pause(), c.pause()), g.updateLocalPosition(c.position), Math.abs(g.driftAmount) > 2 && Qe(e.playbackPosition));
		}), xe(() => {
			wn(), tt(), k.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", bn), On?.(), It?.removeEventListener?.("addtrack", Mt), It?.removeEventListener?.("removetrack", Mt), mn !== null && (clearInterval(mn), mn = null), A !== null && (clearTimeout(A), A = null);
		}), (n, i) => (H(), F("div", {
			ref_key: "containerRef",
			ref: te,
			class: B(["player", {
				"is-chrome-hidden": !ne.value,
				"is-theater": E.value
			}]),
			onPointermove: En,
			onPointerdown: En,
			onFocusin: En
		}, [R(Xt, {
			video: C.value,
			enabled: q(u).atmosphere,
			playing: q(c).playing,
			"reduced-motion": q(u).effectiveReducedMotion,
			intensity: ce.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), I("div", Br, [
			I("video", {
				ref_key: "videoRef",
				ref: C,
				class: "player__video",
				src: V.value,
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
			}, [(H(!0), F(j, null, W(Et.value, (e) => (H(), F("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Hr))), 128))], 40, Vr),
			i[17] ||= I("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[18] ||= I("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			I("div", Ur, [I("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": q(d)("player.back"),
				onClick: i[0] ||= Y((e) => s("back"), ["stop"])
			}, [R(t, { name: "arrow-left" })], 8, Wr), I("div", Gr, [
				I("p", Kr, G(q(d)("player.nowPlaying")), 1),
				I("h2", qr, G(e.media.name), 1),
				I("div", Jr, [(H(!0), F(j, null, W(Rt.value, (e, t) => (H(), F(j, { key: t }, [t > 0 && !e.cert ? (H(), F("span", Yr, "·")) : P("", !0), I("span", { class: B({ player__cert: e.cert }) }, G(e.text), 3)], 64))), 128))])
			])]),
			K.value ? P("", !0) : (H(), F("div", Xr, [I("button", {
				type: "button",
				class: B(["player__bigplay", { "is-playing": q(c).playing }]),
				"aria-label": q(c).playing ? q(d)("player.pause") : q(d)("player.play"),
				onClick: Y(Gt, ["stop"])
			}, [R(t, { name: q(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Zr)])),
			R(gt, {
				video: C.value,
				language: q(c).subtitleLang,
				"style-config": q(u).captionStyle,
				lifted: ne.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			K.value ? P("", !0) : (H(), F("div", {
				key: 1,
				class: "player__controls",
				onClick: i[5] ||= Y(() => {}, ["stop"])
			}, [
				R(je, {
					position: q(c).position,
					duration: q(c).duration,
					buffered: q(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": z.value,
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
				q(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (H(), N(fr, {
					key: 0,
					position: q(c).position,
					duration: q(c).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: Ve
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : P("", !0),
				I("div", Qr, [
					e.prevEpisode ? (H(), F("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": q(d)("player.previousEpisode"),
						onClick: Ht
					}, [R(t, { name: "skip-back" })], 8, $r)) : P("", !0),
					I("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": q(c).playing ? q(d)("player.pause") : q(d)("player.play"),
						onClick: Gt
					}, [R(t, { name: q(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, ei),
					e.nextEpisode ? (H(), F("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": q(d)("player.nextEpisode"),
						onClick: Wt
					}, [R(t, { name: "skip-forward" })], 8, ti)) : P("", !0),
					I("span", ni, [
						L(G(q(X)(q(c).position)), 1),
						i[13] ||= I("span", { class: "player__sep" }, " / ", -1),
						L(G(q(X)(q(c).duration)), 1)
					]),
					i[14] ||= I("span", { class: "player__grow" }, null, -1),
					I("button", {
						type: "button",
						class: B(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": v.value ? "true" : "false",
						onClick: ee
					}, [R(t, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ri),
					R(m, {
						level: y.value,
						onCycle: x
					}, null, 8, ["level"]),
					R(ot),
					R(st),
					R(ht, {
						levels: q(k).levels.value,
						variants: q(k).variants.value,
						"current-level": q(k).currentLevel.value,
						"auto-enabled": q(k).autoEnabled.value,
						"active-height": q(k).activeLevelHeight.value,
						onSelect: De
					}, null, 8, [
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					R(Ut, {
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
					R(ir, {
						open: wt.value,
						"onUpdate:open": i[2] ||= (e) => wt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					R(_r, {
						ref_key: "sleepTimerRef",
						ref: ae,
						"on-expire": hn
					}, null, 512),
					I("button", {
						type: "button",
						class: B(["player__iconbtn player__syncplay", { "is-on": q(g).isInRoom }]),
						"aria-label": q(g).isInRoom ? q(d)("syncplay.inRoom") : q(d)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[3] ||= (e) => oe.value = !0
					}, [R(t, { name: "user" })], 10, ii),
					I("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": q(d)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[4] ||= (e) => T.value = !0
					}, [R(t, { name: "info" })], 8, ai),
					ie.value ? (H(), F("button", {
						key: 2,
						type: "button",
						class: B(["player__iconbtn", { "is-on": D.value }]),
						"aria-label": D.value ? q(d)("player.exitPip") : q(d)("player.pip"),
						"aria-pressed": D.value,
						onClick: xn
					}, [R(t, { name: "pip" })], 10, oi)) : P("", !0),
					I("button", {
						type: "button",
						class: B(["player__iconbtn", { "is-on": E.value }]),
						"aria-label": E.value ? q(d)("player.exitTheater") : q(d)("player.theater"),
						"aria-pressed": E.value,
						onClick: vn
					}, [R(t, { name: "theater" })], 10, si),
					I("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": w.value ? q(d)("player.exitFullscreen") : q(d)("player.fullscreen"),
						onClick: yn
					}, [R(t, { name: w.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ci)
				])
			])),
			K.value ? P("", !0) : (H(), N(zn, {
				key: 2,
				position: q(c).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			K.value ? P("", !0) : (H(), N(Gn, {
				key: 3,
				position: q(c).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Ae.value && !K.value ? (H(), N(tn, {
				key: 4,
				seconds: ke.value,
				onResume: $e,
				onRestart: et
			}, null, 8, ["seconds"])) : P("", !0),
			Z.value && Xe.value && !K.value ? (H(), N(Dn, {
				key: 5,
				media: Xe.value,
				remaining: Ne.value,
				total: q(8),
				counting: q(u).autoplay,
				onPlayNow: at,
				onCancel: ct
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : P("", !0),
			R(r, {
				modelValue: Le.value,
				"onUpdate:modelValue": i[6] ||= (e) => Le.value = e,
				title: `Similar ${Fe.value ?? "marker"}s`,
				size: "lg",
				onClose: Je
			}, {
				default: Ce(() => [I("div", li, [ze.value ? (H(), F("div", ui, [R(b, { label: "Finding similar media" })])) : Be.value ? (H(), F("div", di, [R(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), I("p", fi, G(Be.value), 1)])) : !ze.value && Re.value.length === 0 ? (H(), F("div", pi, [
					R(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[15] ||= I("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[16] ||= I("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (H(), F("ul", mi, [(H(!0), F(j, null, W(Re.value, (e) => (H(), F("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [I("div", hi, [e.poster_url ? (H(), F("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, gi)) : (H(), F("div", _i, [R(t, { name: "film" })]))]), I("div", vi, [I("p", yi, G(e.name), 1), e.year ? (H(), F("p", bi, [L(G(e.year) + " ", 1), e.runtime ? (H(), F("span", xi, " · " + G(e.runtime) + "m", 1)) : P("", !0)])) : P("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			we.value ? (H(), N(Rn, {
				key: 6,
				title: e.media.name,
				progress: q(k).progress.value,
				onBack: i[7] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : P("", !0),
			Te.value ? (H(), N(Mn, {
				key: 7,
				title: e.media.name,
				onBack: i[8] ||= (e) => s("back")
			}, null, 8, ["title"])) : P("", !0),
			q(g).isInRoom ? (H(), N(zr, {
				key: 8,
				position: q(c).position,
				duration: q(c).duration,
				"is-playing": q(c).playing,
				onSeek: $,
				onPlay: i[9] ||= (e) => void C.value?.play(),
				onPause: i[10] ||= (e) => void C.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : P("", !0),
			q(g).isInRoom ? (H(), N(Dr, { key: 9 })) : P("", !0),
			R(_e, {
				modelValue: oe.value,
				"onUpdate:modelValue": i[11] ||= (e) => oe.value = e
			}, null, 8, ["modelValue"]),
			R(it, {
				open: T.value,
				onClose: i[12] ||= (e) => T.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-cb8de521"]]), Ci = { class: "player-page__stage" }, wi = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Ti = { class: "player-page__blocking-error" }, Ei = /*#__PURE__*/ e(/* @__PURE__ */ z({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = u(), i = d(), a = Te(), o = Ee(), s = f(), m = p(), h = U(null), g = U(""), _ = U([]), v = U(null), y = U(null), b = U([]), S = U([]), C = U(!0), se = U(null), ce = U(!1), O = U(null), le = U(!1), ue = U(null), de = U(null), fe = M(() => String(a.params.id ?? ""));
		ee(() => h.value?.name);
		let pe = M(() => {
			let e = h.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), k = null, me = !1;
		function A(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function he(e) {
			let t = i.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function ge(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function _e(e, r) {
			let i = k, a = () => me || i !== k;
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
				let t = w(n.value, {
					genres: [o],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(t, void 0, i?.signal);
				if (a()) return;
				s.setQueue((c.items ?? []).filter((e) => e.id !== r.id).slice(0, 12));
			} catch (e) {
				if (a() || A(e)) return;
				s.setQueue([]);
			}
		}
		async function j(e, t, r) {
			let i = w(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function ve(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function z(e, t) {
			ue.value = E(e, t), de.value = D(e, t);
		}
		function ye(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function be(e, n) {
			if (ue.value = null, de.value = null, !(n.type === "episode" || (n.episode_number ?? null) !== null)) return;
			let r = ye(n.id);
			if (r) {
				z(r, n.id);
				return;
			}
			let i = k, a = () => me || i !== k;
			try {
				let r = await ve(e, n, i?.signal);
				if (a()) return;
				let o = await j(e, r.id, i?.signal);
				if (a()) return;
				if (T(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => j(e, t.id, i?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let c = re(o);
				c.length && t.set(r.id, c), z(c, n.id);
				let l = c.findIndex((e) => e.id === n.id), u = c.slice(l + 1);
				u.length && s.setQueue(u);
			} catch (e) {
				if (a() || A(e)) return;
				ue.value = null, de.value = null;
			}
		}
		async function W() {
			let e = fe.value;
			if (k?.abort(), k = typeof AbortController < "u" ? new AbortController() : null, C.value = !0, se.value = null, _.value = [], v.value = null, y.value = null, b.value = [], S.value = [], ue.value = null, de.value = null, s.hideMiniPlayer(), !e) {
				se.value = "No media id provided", C.value = !1;
				return;
			}
			let t = new l({ baseUrl: n.value });
			t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, k?.signal).then((e) => {
				me || (_.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), v.value = ge(e?.intro_marker), y.value = ge(e?.outro_marker), b.value = cn(e?.audio_tracks), S.value = Fe(e?.subtitle_tracks));
			}).catch(() => null);
			let r = ie(e), i = Date.now();
			if (r && ae(r, i)) {
				K(t, r.item);
				return;
			}
			let a = null;
			try {
				a = (await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, k?.signal)).item;
			} catch (e) {
				if (me || A(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						O.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", le.value = !0, C.value = !1;
						return;
					}
				}
				if (r) {
					K(t, r.item);
					return;
				}
				se.value = e instanceof Error ? e.message : "Failed to load media", C.value = !1;
				return;
			}
			if (!me) {
				if (!a) {
					if (r) {
						K(t, r.item);
						return;
					}
					se.value = "Failed to load media item", C.value = !1;
					return;
				}
				oe(e, a, i), K(t, a);
			}
		}
		async function K(e, t) {
			h.value = t, m.hydrate(t), g.value = he(t), C.value = !1;
			let n = (t.episode_number ?? null) !== null;
			_e(e, t), n && await be(e, t);
		}
		Se(W), J(fe, W), we(() => {
			s.current && s.streamUrl && s.showMiniPlayer();
		}), xe(() => {
			me = !0, k?.abort(), k = null;
		});
		function Y() {
			o?.back();
		}
		function X(e) {
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
			ce.value = e;
		}
		function ke() {
			le.value = !1, Y();
		}
		return (e, t) => (H(), F("div", { class: B(["player-page", { "is-theater": ce.value }]) }, [
			pe.value && !C.value && !se.value ? (H(), F("div", {
				key: 0,
				class: "player-page__ambient",
				style: V(pe.value),
				"aria-hidden": "true"
			}, null, 4)) : P("", !0),
			I("div", Ci, [C.value ? (H(), F("div", wi, [R(te, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : se.value ? (H(), N(ne, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: se.value
			}, {
				actions: Ce(() => [R(x, {
					variant: "solid",
					onClick: W
				}, {
					default: Ce(() => [...t[1] ||= [L("Retry", -1)]]),
					_: 1
				}), R(x, {
					variant: "ghost",
					onClick: Y
				}, {
					default: Ce(() => [...t[2] ||= [L("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : h.value ? (H(), N(Si, {
				key: 2,
				media: h.value,
				"stream-url": g.value,
				"stream-url-for": he,
				"api-base": q(n),
				chapters: _.value,
				"intro-marker": v.value,
				"outro-marker": y.value,
				"playback-audio-tracks": b.value,
				"playback-subtitle-tracks": S.value,
				"prev-episode": ue.value,
				"next-episode": de.value,
				autoplay: !0,
				onBack: Y,
				onPlayNext: X,
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
			])) : P("", !0)]),
			R(r, {
				modelValue: le.value,
				"onUpdate:modelValue": t[0] ||= (e) => le.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Ce(() => [R(x, {
					variant: "solid",
					onClick: ke
				}, {
					default: Ce(() => [...t[3] ||= [L("OK", -1)]]),
					_: 1
				})]),
				default: Ce(() => [I("p", Ti, G(O.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-bc15dbd5"]]);
//#endregion
export { Ei as default };

//# sourceMappingURL=PlayerPage-C1czli0x.js.map