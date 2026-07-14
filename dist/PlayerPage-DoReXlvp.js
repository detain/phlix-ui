import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { n, t as r } from "./Modal-CSaTqZvF.js";
import { t as i } from "./useFocusTrap-DZxA3ZEr.js";
import { a } from "./usePreferencesStore-g-d6JBr9.js";
import { t as o } from "./useMessages-QU3qvt7A.js";
import { c as s, l as c, t as l } from "./client-D1nDQ0cP.js";
import { n as u, r as d } from "./useApiBase-CV_r-Kk4.js";
import { i as f } from "./usePlayerStore-fCCh6mOw.js";
import { n as p, t as m } from "./ThumbRating-Db3pVsxe.js";
import { a as h, n as g, o as _, r as v, t as y } from "./shortcuts-BqRA1aW9.js";
import { t as b } from "./Spinner-D1bwTvld.js";
import { i as x } from "./usePageTitle-BO3GGF3M.js";
import { t as S } from "./Button-btm-GCUN.js";
import { t as C } from "./Slider-LnnvB5jy.js";
import { t as w } from "./Select-Bx8h2mSF.js";
import { t as ee } from "./Skeleton-DhQmxeNg.js";
import { t as te } from "./EmptyState-CfyGawh7.js";
import { n as ne } from "./media-query-DKjhlX8r.js";
import { n as re, o as T, r as E, t as D } from "./episode-order-C2yqgMeX.js";
import { n as O, r as ie, t as ae } from "./useMediaItemCache-BKCJnCbr.js";
import { a as oe, c as se, d as k, f as ce, i as le, l as ue, n as de, o as fe, r as A, s as pe, t as j, u as me } from "./captions-DoP7ce5A.js";
import { n as he, t as ge } from "./SyncPlayModal-D7PFksqD.js";
import { Fragment as M, Transition as _e, computed as N, createBlock as P, createCommentVNode as F, createElementBlock as I, createElementVNode as L, createTextVNode as R, createVNode as z, defineComponent as B, inject as ve, nextTick as ye, normalizeClass as V, normalizeStyle as H, onBeforeUnmount as be, onMounted as xe, openBlock as U, ref as W, renderList as G, toDisplayString as K, toRef as q, unref as J, watch as Y, withCtx as Se, withModifiers as X } from "vue";
import { onBeforeRouteLeave as Ce, useRoute as we, useRouter as Te } from "vue-router";
//#region src/components/player/format-time.ts
function Z(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Ee = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], De = { class: "scrubber__track" }, Oe = ["title"], ke = { class: "scrubber__time numeric" }, Ae = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { t: r } = o(), i = e, a = n, s = W(null), c = W(!1), l = W(!1), u = W(0), d = W(0), f = (e) => Math.min(1, Math.max(0, e)), p = N(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = N(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = N(() => (c.value || l.value) && i.duration > 0), g = N(() => c.value ? u.value : d.value), _ = N(() => g.value * i.duration), v = N(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = N(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = N(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = N(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function S(e) {
			let t = s.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : f((e.clientX - n.left) / n.width);
		}
		function C(e) {
			if (!(i.duration <= 0)) {
				c.value = !0;
				try {
					s.value?.setPointerCapture?.(e.pointerId);
				} catch {}
				u.value = S(e), a("scrub-start"), e.preventDefault();
			}
		}
		function w(e) {
			let t = S(e);
			d.value = t, c.value && (u.value = t);
		}
		function ee(e) {
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
		function ne() {
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
		}), (t, n) => (U(), I("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": J(Z)(e.position),
			"aria-label": J(r)("player.seek"),
			onPointerdown: C,
			onPointermove: w,
			onPointerup: ee,
			onPointercancel: ee,
			onPointerenter: te,
			onPointerleave: ne,
			onKeydown: re
		}, [L("div", De, [
			L("div", {
				class: "scrubber__buffered",
				style: H({ transform: `scaleX(${m.value})` })
			}, null, 4),
			L("div", {
				class: "scrubber__played",
				style: H({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(U(!0), I(M, null, G(x.value, (e, t) => (U(), I("span", {
				key: t,
				class: "scrubber__tick",
				style: H({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Oe))), 128)),
			L("div", {
				class: V(["scrubber__head", { "is-dragging": c.value }]),
				style: H({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (U(), I("div", {
			key: 0,
			class: "scrubber__preview",
			style: H({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (U(), I("div", {
			key: 0,
			class: "scrubber__thumb",
			style: H({ backgroundImage: y.value })
		}, null, 4)) : F("", !0), L("span", ke, K(J(Z)(_.value)), 1)], 4)) : F("", !0)], 40, Ee));
	}
}), [["__scopeId", "data-v-3d610715"]]), je = new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Q(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Me(e) {
	return e === !0 || e === "true" || e === 1;
}
function Ne(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Pe(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Q(e.url ?? e.src);
		r !== "" && t.push({
			index: Ne(e.index),
			language: Q(e.language ?? e.lang ?? e.srclang),
			label: Q(e.label),
			default: Me(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Fe(e) {
	if (e == null || !Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Ne(e.height);
		r <= 0 || t.push({
			id: Q(e.id),
			label: Q(e.label),
			height: r,
			width: Ne(e.width),
			bitrate: Ne(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Ie(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function Le(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function Re(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		masterUrl: Q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Q(t.status, "running"),
		reused: Me(t.reused),
		subtitles: Pe(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Fe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function ze(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		status: Q(t.status, "running"),
		playlistReady: Me(t.playlist_ready ?? t.playlistReady),
		progress: Ne(t.progress),
		masterUrl: Q(t.master_url ?? t.masterUrl),
		subtitles: Pe(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Fe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Be(e) {
	return e.playlistReady || e.status === "completed";
}
function Ve(e) {
	return je.has(e);
}
function He(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Ue(e) {
	let t = W("idle"), n = W(0), r = W([]), i = W([]), a = W(-1), o = W(!0), s = W(null), c = W(null), u = W([]), d = W(-1), p = W(null), m = W(null);
	function h(e) {
		if (!T) return;
		i.value = T.levels, a.value = T.getCurrentLevel(), o.value = T.autoLevelEnabled;
		let t = e ?? T.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function g() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function v(e) {
		T && (u.value = T.audioTracks, d.value = e ?? T.getCurrentAudioTrack());
	}
	function y() {
		u.value = [], d.value = -1;
	}
	function b(e) {
		!e || e.length === 0 || (c.value = e);
	}
	function x(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: He(n, e.url)
		}));
	}
	let S = e.attach ?? _, C = e.pollIntervalMs ?? 1e3, w = e.maxWaitMs ?? 12e4, ee = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), te = Math.max(1, Math.ceil(w / Math.max(1, C))), ne = We(), re = e.getToken ?? (() => Ge(ne)), T = null, E = null, D = null, O = !1, ie = null;
	function ae() {
		return e.client ?? new l({
			baseUrl: e.apiBase(),
			tokenStore: ne ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function oe(i, a, o, s) {
		ue(), O = !1, ie = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = ae(), c = Re(await r.post(Ie(a, o), void 0, ie.signal));
			if (O) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			x(c.subtitles), b(c.variants), p.value = c.jobId, m.value = He(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < te; e++) {
				let e = ze(await r.get(Le(c.jobId), void 0, ie.signal));
				if (O) return;
				if (n.value = e.progress, x(e.subtitles), b(e.variants), Ve(e.status)) throw Error(`transcode ${e.status}`);
				if (Be(e)) {
					l = !0;
					break;
				}
				if (await ee(C), O) return;
			}
			if (!l) throw Error("transcode timed out");
			if (T = await S(i, m.value, {
				getToken: re,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => h(),
				onError: () => {
					O || (t.value = "error");
				}
			}), O) {
				T.destroy(), T = null;
				return;
			}
			E = T.onLevelSwitched((e) => h(e)), D = T.onAudioTrackSwitched((e) => v(e)), h(), v();
			try {
				let e = f();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			O || (t.value = "error");
		}
	}
	function se(e) {
		T && (T.setCurrentLevel(e === "auto" ? -1 : e), h());
	}
	function k(e) {
		T && (T.setNextLevel(e === "auto" ? -1 : e), h());
	}
	function ce(e) {
		T && (T.setAudioTrack(e), v());
	}
	function le(e) {
		if (!T || !m.value) return;
		let t = m.value.replace("master.m3u8", `media_v${e}.m3u8`);
		T.loadSource(t), g();
	}
	function ue() {
		if (O = !0, ie &&= (ie.abort(), null), E) {
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
		p.value = null, m.value = null;
	}
	function de() {
		ue(), t.value = "idle", n.value = 0, r.value = [], g(), y();
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
		setLevel: se,
		setNextLevel: k,
		setAudioTrack: ce,
		jobId: p,
		masterUrl: m,
		loadVariantPlaylist: le,
		start: oe,
		cleanup: ue,
		reset: de
	};
}
function We() {
	try {
		return new s();
	} catch {
		return null;
	}
}
function Ge(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var Ke = 10, qe = 6;
function Je(e) {
	let t = W(null), n = W(!1), r = W(null), i = /* @__PURE__ */ new Map();
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
		let i = r.frame, a = i % Ke, s = Math.floor(i / Ke), c = a / (Ke - 1) * 100, l = s / (qe - 1) * 100;
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
var Ye = ["aria-label"], Xe = { class: "shortcuts__head" }, Ze = { class: "shortcuts__title" }, Qe = { class: "shortcuts__grid" }, $e = { class: "shortcuts__keys" }, et = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, tt = {
	key: 1,
	class: "shortcuts__key"
}, nt = { class: "shortcuts__label" }, rt = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => v }
	},
	emits: ["close"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o(), l = W(null);
		return i(l, q(a, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (U(), I("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= X((e) => s("close"), ["self"])
		}, [L("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [L("div", Xe, [L("h3", Ze, K(J(c)("player.keyboard")), 1), z(n, {
			name: "x",
			label: J(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), L("ul", Qe, [(U(!0), I(M, null, G(e.shortcuts, (e) => (U(), I("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [L("span", $e, [(U(!0), I(M, null, G(e.keys, (e, n) => (U(), I(M, { key: n }, [e === "–" ? (U(), I("span", et, "–")) : (U(), I("kbd", tt, [J(y)[e] ? (U(), P(t, {
			key: 0,
			name: J(y)[e],
			label: J(g)[e] ?? e
		}, null, 8, ["name", "label"])) : (U(), I(M, { key: 1 }, [R(K(e), 1)], 64))]))], 64))), 128))]), L("span", nt, K(e.label), 1)]))), 128))])], 8, Ye)])) : F("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), it = { class: "volume" }, at = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "VolumeControl",
	setup(e) {
		let t = f(), r = a(), { t: i } = o(), s = N(() => t.muted ? 0 : t.volume), c = N(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Y(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (U(), I("div", it, [z(n, {
			name: c.value,
			label: J(t).muted ? J(i)("player.unmute") : J(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => J(t).toggleMute()
		}, null, 8, ["name", "label"]), z(C, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: J(i)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), ot = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		], n = f(), { t: r } = o(), i = N(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (U(), P(w, {
			class: "speed-menu",
			tone: "glass",
			"model-value": J(n).rate,
			options: i.value,
			label: J(r)("player.playbackSpeed"),
			"onUpdate:modelValue": a
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), st = "auto", ct = "original";
function lt(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function ut(e) {
	return e >= 2160 ? "4K" : lt(e);
}
function dt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = lt(r.height);
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
	for (let i of e) lt(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
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
	if (t < 0) return st;
	let n = e.find((e) => e.index === t);
	return n ? lt(n.height) : st;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var ht = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let n = e, r = t, i = f(), s = a(), { t: c } = o(), l = N(() => dt(n.levels)), u = N(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!n.variants) return [];
			let r = l.value.length >= 2;
			for (let i of [...n.variants].sort((e, t) => t.height - e.height)) {
				let a = lt(i.height);
				e.has(a) || r && ft(n.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: ut(i.height)
				}));
			}
			return t;
		}), d = N(() => l.value.length >= 2 ? l.value : u.value), p = N(() => n.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), m = N(() => pt(n.levels, p.value)), h = N(() => p.value && m.value >= 0 ? {
			value: ct,
			label: c("player.qualityOriginal", { height: p.value.height })
		} : null), g = N(() => d.value.length >= 2), _ = N(() => n.activeHeight == null ? c("player.qualityAuto") : c("player.qualityAutoActive", { label: ut(n.activeHeight) })), v = N(() => [
			{
				value: st,
				label: _.value
			},
			...h.value ? [h.value] : [],
			...d.value
		]), y = N(() => n.autoEnabled ? st : h.value && n.currentLevel === m.value && (i.quality === "original" || s.defaultQuality === "original") ? ct : mt(n.levels, n.currentLevel));
		function b(e) {
			let t = String(e);
			if (t === "auto") {
				i.setQuality(t), s.defaultQuality = t, r("select", "auto");
				return;
			}
			let a = t === "original" ? m.value : ft(n.levels, t);
			i.setQuality(t), s.defaultQuality = t, a >= 0 ? r("select", a) : r("select", t);
		}
		return (e, t) => g.value ? (U(), P(w, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": y.value,
			options: v.value,
			label: J(c)("player.quality"),
			"onUpdate:modelValue": b
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-b87f53e6"]]), gt = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = W([]), i = N(() => se(n.styleConfig)), a = null, o = null;
		function s() {
			r.value = k(a);
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
			c(), pe(n.video, n.language);
			let e = ce(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", s), r.value = k(e), !r.value.length) {
					let t = l(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", s));
				}
			} else r.value = [];
		}
		return Y(() => [n.video, n.language], u, { immediate: !0 }), be(c), t({ lines: r }), (t, n) => r.value.length ? (U(), I("div", {
			key: 0,
			class: V(["player__captions", { "is-lifted": e.lifted }]),
			style: H(i.value)
		}, [(U(!0), I(M, null, G(r.value, (e, t) => (U(), I("p", {
			key: t,
			class: "player__caption-line"
		}, K(e), 1))), 128))], 6)) : F("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), _t = ["aria-label", "aria-expanded"], vt = ["aria-label"], yt = { class: "capmenu__head" }, bt = { class: "capmenu__title" }, xt = ["aria-label"], St = ["aria-checked", "tabindex"], Ct = { class: "capmenu__check" }, wt = { class: "capmenu__optlabel" }, Tt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Et = { class: "capmenu__check" }, Dt = { class: "capmenu__optlabel" }, Ot = { class: "capmenu__title capmenu__title--sub" }, kt = ["aria-label"], At = [
	"aria-checked",
	"tabindex",
	"onClick"
], jt = { class: "capmenu__check" }, Mt = { class: "capmenu__optlabel" }, Nt = { class: "capmenu__title capmenu__title--sub" }, Pt = { class: "capmenu__style" }, Ft = { class: "capmenu__field" }, It = { class: "capmenu__fieldlabel" }, Lt = { class: "capmenu__field" }, Rt = { class: "capmenu__fieldlabel" }, zt = { class: "capmenu__field" }, Bt = { class: "capmenu__fieldlabel" }, Vt = { class: "capmenu__field" }, Ht = { class: "capmenu__fieldlabel" }, Ut = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let s = e, c = r, l = f(), u = a(), { t: d } = o(), p = W(null), m = W(null), h = N(() => l.subtitleLang), g = N(() => s.tracks.some((e) => e.language === h.value)), _ = N(() => g.value ? "captions" : "captions-off"), v = N(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = N(() => s.activeAudio >= 0 ? s.activeAudio : 0);
		function b(e) {
			c("update:open", e);
		}
		function x() {
			b(!1);
		}
		function S(e) {
			l.setSubtitle(e), u.defaultSubtitleLang = e, u.subtitlePreferenceSet = !0;
		}
		function C(e) {
			c("select-audio", e);
		}
		function ee(e, t, n) {
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
			let t = ee(e, s.tracks.length + 1, v.value);
			t !== null && S(t === 0 ? null : s.tracks[t - 1].language);
		}
		function ne(e) {
			let t = ee(e, s.audioTracks.length, y.value);
			t !== null && C(s.audioTracks[t].index);
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
		i(m, q(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function O(e) {
			p.value && !p.value.contains(e.target) && x();
		}
		return Y(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", O, !0) : document.removeEventListener("pointerdown", O, !0));
		}, { immediate: !0 }), be(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", O, !0);
		}), (r, i) => (U(), I("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [L("button", {
			type: "button",
			class: V(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? J(d)("player.captionsOn") : J(d)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [z(t, { name: _.value }, null, 8, ["name"])], 10, _t), e.open ? (U(), I("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			L("div", yt, [L("h3", bt, K(J(d)("player.subtitles")), 1), z(n, {
				name: "x",
				label: J(d)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			L("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": J(d)("player.subtitleTrack"),
				onKeydown: te
			}, [L("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => S(null)
			}, [L("span", Ct, [g.value ? F("", !0) : (U(), P(t, {
				key: 0,
				name: "check"
			}))]), L("span", wt, K(J(d)("player.off")), 1)], 8, St), (U(!0), I(M, null, G(e.tracks, (e, n) => (U(), I("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [L("span", Et, [h.value === e.language ? (U(), P(t, {
				key: 0,
				name: "check"
			})) : F("", !0)]), L("span", Dt, K(e.label), 1)], 8, Tt))), 128))], 40, xt),
			e.audioTracks.length > 1 ? (U(), I(M, { key: 0 }, [L("h3", Ot, K(J(d)("player.audio")), 1), L("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": J(d)("player.audioTrack"),
				onKeydown: ne
			}, [(U(!0), I(M, null, G(e.audioTracks, (n) => (U(), I("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => C(n.index)
			}, [L("span", jt, [e.activeAudio === n.index ? (U(), P(t, {
				key: 0,
				name: "check"
			})) : F("", !0)]), L("span", Mt, K(n.label), 1)], 8, At))), 128))], 40, kt)], 64)) : F("", !0),
			L("h3", Nt, K(J(d)("player.captionStyle")), 1),
			L("div", Pt, [
				L("div", Ft, [L("span", It, K(J(d)("player.size")), 1), z(w, {
					"model-value": J(u).captionStyle.size,
					options: J(le),
					label: J(d)("player.captionSize"),
					"onUpdate:modelValue": re
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", Lt, [L("span", Rt, K(J(d)("player.color")), 1), z(w, {
					"model-value": J(u).captionStyle.textColor,
					options: J(de),
					label: J(d)("player.captionColor"),
					"onUpdate:modelValue": T
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", zt, [L("span", Bt, K(J(d)("player.background")), 1), z(w, {
					"model-value": J(u).captionStyle.background,
					options: J(j),
					label: J(d)("player.captionBackground"),
					"onUpdate:modelValue": E
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", Vt, [L("span", Ht, K(J(d)("player.edge")), 1), z(w, {
					"model-value": J(u).captionStyle.edge,
					options: J(A),
					label: J(d)("player.captionEdge"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, vt)) : F("", !0)], 512));
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
var Xt = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let n = e, r = W(!1), i = null;
		function a() {
			r.value = Yt(i);
		}
		let o = N(() => n.enabled && !n.reducedMotion && !r.value), s = N(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = W(null), l = null, u = null, d = !1, f = !1;
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
			_ = e, g = e.requestVideoFrameCallback(S);
		}
		function S(e) {
			if (!b) return;
			e - y >= 250 && (y = e, m());
			let t = n.video;
			h(t) && x(t);
		}
		function C() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			if (h(e)) {
				b = !0, y = 0, x(e);
				return;
			}
			m(), !f && (b = !0, v = setInterval(m, 250));
		}
		function w() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		Y(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			w(), e && t && C();
		}, { immediate: !0 }), xe(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), be(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let ee = N(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (U(), I("div", {
			class: V(["player__ambient", { "is-active": o.value }]),
			style: H(o.value ? ee.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Zt = ["aria-label"], Qt = { class: "resume__label" }, $t = { class: "resume__time numeric" }, en = { class: "resume__actions" }, tn = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o(), a = N(() => i("player.resumeFrom").split("{time}"));
		return (n, o) => (U(), I("div", {
			class: "resume",
			role: "region",
			"aria-label": J(i)("player.resumePlayback")
		}, [L("p", Qt, [
			R(K(a.value[0]), 1),
			L("span", $t, K(J(Z)(e.seconds)), 1),
			R(K(a.value[1]), 1)
		]), L("div", en, [L("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: o[0] ||= (e) => r("resume")
		}, [z(t, { name: "play" }), L("span", null, K(J(i)("player.resume")), 1)]), L("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: o[1] ||= (e) => r("restart")
		}, [z(t, { name: "rewind" }), L("span", null, K(J(i)("player.startOver")), 1)])])], 8, Zt));
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
], Dn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { t: r } = o(), i = e, a = n, s = N(() => i.posterUrl ?? i.media.poster_url ?? null), c = N(() => un(i.remaining, i.total));
		return (n, i) => (U(), I("aside", {
			class: "upnext",
			role: "region",
			"aria-label": J(r)("player.upNext")
		}, [
			s.value ? (U(), I("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, vn)) : F("", !0),
			L("div", yn, [
				L("p", bn, K(J(r)("player.upNext")), 1),
				L("h4", xn, K(e.media.name), 1),
				e.counting ? (U(), I("p", Sn, K(J(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : F("", !0),
				L("div", Cn, [L("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [z(t, { name: "play" }), L("span", null, K(J(r)("player.playNow")), 1)]), L("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, K(J(r)("player.cancel")), 1)])
			]),
			e.counting ? (U(), I("svg", wn, [L("circle", {
				cx: "18",
				cy: "18",
				r: J(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Tn), L("circle", {
				cx: "18",
				cy: "18",
				r: J(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": J(ln),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, En)])) : F("", !0)
		], 8, _n));
	}
}), [["__scopeId", "data-v-85909b2d"]]), On = {
	class: "transcode",
	role: "alert"
}, kn = { class: "transcode__card" }, An = { class: "transcode__heading" }, jn = { class: "transcode__body" }, Mn = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o();
		return (n, a) => (U(), I("div", On, [L("div", kn, [
			z(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			L("h3", An, K(J(i)("player.transcodeHeading")), 1),
			L("p", jn, K(e.title ? J(i)("player.transcodeBodyTitled", { title: e.title }) : J(i)("player.transcodeBodyUntitled")), 1),
			L("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [z(t, { name: "arrow-left" }), L("span", null, K(J(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), Nn = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Pn = { class: "prep__card" }, Fn = { class: "prep__heading" }, In = { class: "prep__body" }, Ln = ["aria-valuenow"], Rn = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = o(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (U(), I("div", Nn, [L("div", Pn, [
			z(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			L("h3", Fn, K(J(r)("player.transcodePreparingHeading")), 1),
			L("p", In, K(e.title ? J(r)("player.transcodePreparingTitled", { title: e.title }) : J(r)("player.transcodePreparingUntitled")), 1),
			L("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [L("div", {
				class: "prep__bar-fill",
				style: H({ width: i() + "%" })
			}, null, 4)], 8, Ln),
			L("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [z(t, { name: "arrow-left" }), L("span", null, K(J(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), zn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let c = N(() => s(r.position, r.introMarker) ? {
			label: a("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: a("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (U(), P(_e, { name: "skip" }, {
			default: Se(() => [c.value ? (U(), I("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: X(l, ["stop"])
			}, [L("span", null, K(c.value.label), 1), z(t, { name: "skip-forward" })])) : F("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Bn = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, Vn = ["aria-label", "onClick"], Hn = { class: "skip-controls__label" }, Un = 5, Wn = 30, Gn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let f = N(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (U(), I("div", Bn, [(U(!0), I(M, null, G(f.value, (e) => (U(), I("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: X((t) => p(e), ["stop"])
		}, [L("span", Hn, K(d(e.type)), 1), z(t, { name: "skip-forward" })], 8, Vn))), 128))])) : F("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Kn = ["aria-label", "aria-expanded"], qn = ["aria-label"], Jn = { class: "chapterlist__head" }, Yn = { class: "chapterlist__title" }, Xn = ["aria-label"], Zn = ["onClick"], Qn = { class: "chapterlist__index" }, $n = { class: "chapterlist__name" }, er = { class: "chapterlist__meta" }, tr = { class: "chapterlist__time" }, nr = {
	key: 0,
	class: "chapterlist__duration"
}, rr = {
	key: 1,
	class: "chapterlist__empty"
}, ir = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let d = N(() => a.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Z(e.start), a;
			return e.end != null && e.end > e.start && (a = Z(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = W(null), p = W(null);
		i(p, q(a, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		Y(() => a.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), be(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (U(), I("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [L("button", {
			type: "button",
			class: V(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": J(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [z(t, { name: "list" })], 10, Kn), e.open ? (U(), I("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(c)("player.chapterList"),
			tabindex: "-1"
		}, [L("div", Jn, [L("h3", Yn, K(J(c)("player.chapters")), 1), z(n, {
			name: "x",
			label: J(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (U(), I("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": J(c)("player.chapterList")
		}, [(U(!0), I(M, null, G(d.value, (e) => (U(), I("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [L("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			L("span", Qn, K(e.index), 1),
			L("span", $n, K(e.label), 1),
			L("span", er, [L("span", tr, K(e.startLabel), 1), e.durationLabel ? (U(), I("span", nr, "· " + K(e.durationLabel), 1)) : F("", !0)])
		], 8, Zn)]))), 128))], 8, Xn)) : (U(), I("p", rr, K(J(c)("player.noChapters")), 1))], 8, qn)) : F("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ar = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, or = { class: "marker-timeline__ticks" }, sr = [
	"title",
	"aria-label",
	"onClick"
], cr = { class: "marker-timeline__tooltip" }, lr = { class: "marker-timeline__tooltip-label" }, ur = { class: "marker-timeline__tooltip-time numeric" }, dr = ["onClick"], fr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let s = N(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = N(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = N(() => c.value !== null), u = N(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (U(), I("div", {
			key: 0,
			class: V(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (U(), I("div", ar, [t[0] ||= L("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [L("polygon", { points: "5,3 19,12 5,21" })], -1), R(" " + K(u.value), 1)])) : F("", !0), L("div", or, [(U(!0), I(M, null, G(s.value, (e) => (U(), I("button", {
			key: e.id,
			type: "button",
			class: V(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: H({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${J(Z)(e.startSec)}`,
			"aria-label": `${e.label} at ${J(Z)(e.startSec)}`,
			onClick: X((t) => d(e), ["stop"])
		}, [L("span", cr, [
			L("span", lr, K(e.label), 1),
			L("span", ur, K(J(Z)(e.startSec)), 1),
			L("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: X((t) => f(e), ["stop"])
			}, " Find similar ", 8, dr)
		])], 14, sr))), 128))])], 2)) : F("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), pr = ["aria-label", "aria-expanded"], mr = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, hr = ["aria-label"], gr = ["aria-selected", "onClick"], _r = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		], s = W(0), c = W(0), l = N(() => c.value > 0), u;
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
		let h = W(!1);
		function g() {
			l.value ? (p(0), h.value = !1) : h.value = !h.value;
		}
		function _(e) {
			p(e), h.value = !1;
		}
		return be(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (U(), I("div", { class: V(["sleep-timer", { "is-active": l.value }]) }, [L("button", {
			type: "button",
			class: V(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : J(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [z(t, { name: "moon" }), l.value ? (U(), I("span", mr, K(m(c.value)), 1)) : F("", !0)], 10, pr), z(_e, { name: "dropdown" }, {
			default: Se(() => [h.value ? (U(), I("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": J(i)("player.sleepTimer")
			}, [(U(), I(M, null, G(a, (e) => L("li", {
				key: e.value,
				class: V(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, K(e.label), 11, gr)), 64))], 8, hr)) : F("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), vr = {
	key: 0,
	class: "syncplay-overlay"
}, yr = { class: "syncplay-overlay__badge" }, br = { class: "syncplay-overlay__label" }, xr = { class: "syncplay-overlay__status-label" }, Sr = { class: "syncplay-overlay__members" }, Cr = { class: "syncplay-overlay__member-count" }, wr = { class: "syncplay-overlay__member-list" }, Tr = { class: "syncplay-overlay__member-name" }, Er = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Dr = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = o(), i = he(), a = u(), s = N(() => n.apiBase ?? a.value), c = N(() => i.currentRoom?.name ?? "SyncPlay"), l = N(() => i.onlineMembers.length), d = N(() => i.syncStatus), f = N(() => {
			switch (d.value) {
				case "synced": return r("syncplay.synced");
				case "outOfSync": return r("syncplay.outOfSync");
				case "re-syncing": return r("syncplay.reSyncing");
				default: return r("syncplay.synced");
			}
		}), p = N(() => {
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
		return (e, n) => J(i).isInRoom ? (U(), I("div", vr, [
			L("div", yr, [z(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), L("span", br, "SyncPlay: " + K(c.value), 1)]),
			L("div", { class: V(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [z(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), L("span", xr, K(f.value), 1)], 2),
			L("div", Sr, [L("span", Cr, [z(t, { name: "user" }), R(" " + K(l.value) + " " + K(J(r)("syncplay.members", { count: l.value })), 1)]), L("ul", wr, [(U(!0), I(M, null, G(J(i).onlineMembers.slice(0, 5), (e) => (U(), I("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= L("span", { class: "syncplay-overlay__member-dot" }, null, -1), L("span", Tr, K(e.name), 1)]))), 128)), J(i).onlineMembers.length > 5 ? (U(), I("li", Er, " +" + K(J(i).onlineMembers.length - 5) + " more ", 1)) : F("", !0)])]),
			z(S, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: Se(() => [R(K(J(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), Or = {
	key: 0,
	class: "syncplay-controls"
}, kr = ["aria-label"], Ar = { class: "syncplay-controls__wait-label" }, jr = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, Mr = { key: 0 }, Nr = { class: "syncplay-controls__transport" }, Pr = ["aria-label"], Fr = ["aria-label"], Ir = ["aria-label"], Lr = { class: "syncplay-controls__status-label" }, Rr = 10, zr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let r = e, i = n, { t: a } = o(), s = he(), c = u(), l = N(() => r.apiBase ?? c.value), d = W(!1), f = W([]), p = N(() => d.value || s.syncStatus === "re-syncing");
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
		return Y(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => J(s).isInRoom ? (U(), I("div", Or, [
			p.value ? (U(), I("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": J(a)("syncplay.waitingForMembers")
			}, [
				z(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				L("span", Ar, K(J(a)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (U(), I("span", jr, [R(K(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (U(), I("span", Mr, "+" + K(f.value.length - 3), 1)) : F("", !0)])) : F("", !0)
			], 8, kr)) : F("", !0),
			L("div", Nr, [
				L("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": J(a)("syncplay.rewind"),
					onClick: v
				}, [z(t, { name: "rewind" })], 8, Pr),
				L("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? J(a)("syncplay.pauseAll") : J(a)("syncplay.playAll"),
					onClick: g
				}, [z(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Fr),
				L("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": J(a)("syncplay.fastForward"),
					onClick: y
				}, [z(t, { name: "forward" })], 8, Ir)
			]),
			L("div", { class: V(["syncplay-controls__status", `syncplay-controls__status--${J(s).syncStatus}`]) }, [z(t, {
				name: J(s).syncStatus === "synced" ? "check" : J(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), L("span", Lr, K(J(s).syncStatus === "synced" ? J(a)("syncplay.synced") : J(s).syncStatus === "outOfSync" ? J(a)("syncplay.outOfSync") : J(a)("syncplay.reSyncing")), 1)], 2)
		])) : F("", !0);
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
}, xi = { key: 0 }, Si = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let i = e, s = n, c = f(), u = a(), { t: d } = o(), g = he(), _ = p(), v = N(() => _.isFavorite(i.media.id)), y = N(() => _.likeLevel(i.media.id));
		function x() {
			_.toggleFavorite(i.media.id, de());
		}
		function S(e) {
			_.setLike(i.media.id, e, de());
		}
		let C = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], w = W(null), ee = W(null), te = W(!0), ne = W(!1), re = W(!1), T = W(!1), E = W(!1), D = W(!1), O = W(!1), ie = W(null), ae = W(!1), se = N(() => E.value ? 1.35 : 1), k = W(an(i.streamUrl, i.media.path));
		async function ce() {
			if (k.value) return;
			let e = i.playbackAudioTracks ?? [];
			e.length !== 0 && await gn([i.streamUrl, i.media.path], e) && (k.value = !0);
		}
		Y(() => i.playbackAudioTracks, (e) => {
			!e || e.length === 0 || ce();
		}, { immediate: !1 });
		let le = ve("phlixConfig", null);
		function de() {
			return le?.apiBase ?? "";
		}
		let A = Ue({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: le?.playerHlsConfig
		}), pe = Je({ apiBase: () => i.apiBase ?? "" }), j = null;
		function _e(e) {
			j !== null && clearTimeout(j), j = setTimeout(() => {
				j = null, pe.fetch(e);
			}, 0);
		}
		let B = N(() => i.thumbnailAt ?? pe.thumbnailAt), H = N(() => k.value ? void 0 : i.streamUrl), q = N(() => k.value && A.state.value !== "ready"), Ce = N(() => k.value && (A.state.value === "preparing" || A.state.value === "idle")), we = N(() => k.value && A.state.value === "error");
		function Te(e = 0) {
			let t = w.value;
			t && A.start(t, i.media.id, void 0, e);
		}
		function Ee(e) {
			if (c.quality === "original" && e !== "auto") {
				A.loadVariantPlaylist(ct);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				A.loadVariantPlaylist(e);
				return;
			}
			A.setLevel(e);
		}
		let De = !1;
		Y(() => A.levels.value, (e) => {
			if (De || e.length === 0) return;
			De = !0;
			let t = u.defaultQuality;
			if (!t || t === "auto") return;
			if (t === "original") {
				A.loadVariantPlaylist(ct);
				return;
			}
			let n = ft(e, t);
			n >= 0 && A.setNextLevel(n);
		}), Y(() => A.variants.value, (e) => {
			e?.length && !De && (De = !1, ye(() => {
				if (A.levels.value.length > 0) {
					De = !0;
					let e = u.defaultQuality;
					if (!e || e === "auto") return;
					if (e === "original") {
						A.loadVariantPlaylist(ct);
						return;
					}
					let t = ft(A.levels.value, e);
					t >= 0 && A.setNextLevel(t);
				}
			}));
		}, { deep: !0 });
		let Oe = W(c.resumePositionFor(i.media.id) ?? 0), ke = W(!k.value && Oe.value > 0), je = null, Q = W(!1), Me = W(8), Ne, Pe = W(null), Fe = W(0), Ie = W(!1), Le = W([]), Re = W(!1), ze = W(null);
		function Be(e, t) {
			Pe.value = e, Fe.value = t, Le.value = [], ze.value = null, Ie.value = !0, Ke(e, t);
		}
		let Ve = null, He = null, We = null;
		function Ge() {
			let e = i.apiBase ?? "";
			return (He === null || We !== e) && (He = new l({ baseUrl: e }), We = e), He;
		}
		async function Ke(e, t) {
			Ve?.abort(), Ve = new AbortController(), Re.value = !0, ze.value = null;
			try {
				let n = await Ge().searchByMarker(e, t, 30, 20, Ve.signal);
				Le.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				ze.value = "Failed to load similar media. Please try again.", Le.value = [];
			} finally {
				Re.value = !1;
			}
		}
		function qe() {
			Ve?.abort(), Ie.value = !1, Le.value = [], ze.value = null, Pe.value = null;
		}
		let Ye = N(() => c.upNext);
		function Xe() {
			k.value = an(i.streamUrl, i.media.path), ce(), Oe.value = c.resumePositionFor(i.media.id) ?? 0, ke.value = !k.value && Oe.value > 0, je = null, zt = !1, Dt = !1, Ot = !1, bt.value = -1, Pt = null, De = !1, et(), Q.value = !1, A.reset(), w.value && (w.value.currentTime = 0), k.value && Te(), _e(i.media.id);
		}
		function Ze(e) {
			let t = w.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : je = Math.max(0, e));
		}
		function Qe() {
			Ze(Oe.value), ke.value = !1, w.value?.play()?.catch(() => {});
		}
		function $e() {
			je = null, Ze(0), c.clearResume(i.media.id), ke.value = !1, w.value?.play()?.catch(() => {});
		}
		function et() {
			Ne &&= (clearInterval(Ne), void 0);
		}
		function tt() {
			Me.value = 8, et(), Ne = setInterval(() => {
				--Me.value, Me.value <= 0 && (et(), it());
			}, 1e3);
		}
		function nt() {
			wn(), te.value = !0, c.upNext && (Q.value = !0, u.autoplay && tt());
		}
		function it() {
			et(), Q.value = !1;
			let e = c.next(i.streamUrlFor);
			e && s("play-next", e);
		}
		function st() {
			et(), Q.value = !1;
		}
		function lt() {
			if (k.value) return;
			let e = w.value, t = sn(e) && (e?.currentTime ?? 0) === 0;
			(on(e) || t) && (k.value = !0, Te(e?.currentTime ?? 0));
		}
		let ut = W([]), dt = W([]), pt = W(-1), mt = W(!1), _t = N(() => A.state.value === "ready" && A.audioTracks.value.length > 0), vt = N(() => A.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), yt = N(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), bt = W(-1), xt = N(() => !_t.value && !k.value && dt.value.length === 0 && yt.value.length > 1), St = N(() => _t.value ? vt.value : xt.value ? yt.value : dt.value), Ct = N(() => {
			if (_t.value) return A.currentAudioTrack.value;
			if (xt.value) {
				if (bt.value >= 0) return bt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return pt.value;
		}), wt = W(!1), Tt = c.subtitleLang, Et = N(() => k.value ? A.subtitleTracks.value : i.playbackSubtitleTracks ?? []), Dt = !1, Ot = !1;
		function kt() {
			if (Dt) return;
			if (u.subtitlePreferenceSet) {
				Dt = !0;
				return;
			}
			let e = Et.value.find((e) => e.default);
			if (!e) return;
			let t = ut.value.find((t) => t.language === (e.language || e.label));
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
		let jt = N(() => ut.value.some((e) => e.language === c.subtitleLang));
		function Mt() {
			let e = w.value;
			ut.value = me(e), dt.value = ue(e), pt.value = oe(e), kt(), At();
		}
		function Nt() {
			if (jt.value) Tt = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = Tt && ut.value.some((e) => e.language === Tt) ? Tt : ut.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			s("captions");
		}
		let Pt = null;
		function Ft(e) {
			if (_t.value) A.setAudioTrack(e);
			else if (xt.value) {
				if (e === Ct.value) return;
				bt.value = e, Pt = e, k.value = !0, Te(w.value?.currentTime ?? 0);
			} else fe(w.value, e), pt.value = e;
		}
		Y(_t, (e) => {
			if (!e || Pt === null) return;
			let t = Pt;
			Pt = null, t >= 0 && t < A.audioTracks.value.length && A.setAudioTrack(t);
		}), Y(Et, () => {
			ye(() => Mt());
		}, { deep: !0 });
		let It = null, Lt, Rt = N(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), zt = !1;
		function Bt() {
			if (!i.autoplay || zt || ke.value || q.value) return;
			let e = w.value;
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
			let e = w.value;
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
			let e = w.value;
			e && c.updateProgress(e.currentTime, e.duration, Kt(e));
		}
		function Zt() {
			let e = w.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, je !== null && (e.currentTime = e.duration ? Math.min(e.duration, je) : je, je = null), c.updateProgress(e.currentTime, e.duration, Kt(e)), c.setMediaPositionState(), Mt());
		}
		function Qt() {
			let e = w.value;
			e && c.updateProgress(e.currentTime, e.duration, Kt(e));
		}
		function $t() {
			let e = w.value;
			e && (Math.abs(e.volume - c.volume) > .001 && c.setVolume(e.volume), e.muted !== c.muted && c.toggleMute());
		}
		function en() {
			let e = w.value;
			e && e.playbackRate !== c.rate && c.setRate(e.playbackRate), c.setMediaPositionState();
		}
		function nn() {
			c.setMediaPositionState();
		}
		function rn() {
			c.setMediaPositionState();
		}
		function $(e) {
			let t = w.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function cn() {
			re.value = !0, En();
		}
		function ln() {
			re.value = !1, En();
		}
		function un(e) {
			let t = C.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(C[e] - c.rate) ? n : e, 0), n = C[Math.min(C.length - 1, Math.max(0, t + e))];
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
			ie.value?.toggleOpen();
		}
		let mn = null;
		function hn() {
			let e = w.value;
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
		Y(() => c.muted, (e) => {
			let t = w.value;
			t && t.muted !== e && (t.muted = e);
		}), Y(() => c.volume, (e) => {
			let t = w.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Y(() => c.rate, (e) => {
			let t = w.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Y(() => c.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Ze(e.value) : e.type === "seekBy" && Ze(c.position + e.value));
		});
		function yn() {
			if (typeof document > "u") return;
			let e = ee.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function bn() {
			ne.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function xn() {
			let e = w.value;
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
				c.playing && !re.value && (te.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function En() {
			te.value = !0, Tn();
		}
		Y(() => c.playing, (e) => {
			e ? (ke.value = !1, st(), Tn()) : (wn(), te.value = !0);
		});
		let On = null;
		return xe(() => {
			c.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), _.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", bn), O.value = document.pictureInPictureEnabled === !0), On = c.bindMediaSession({
				onPlay: () => void w.value?.play()?.catch(() => {}),
				onPause: () => w.value?.pause(),
				onSeek: (e) => $(e)
			}), It = w.value?.textTracks ?? null, It?.addEventListener?.("addtrack", Mt), It?.addEventListener?.("removetrack", Mt), Mt(), k.value && Te(), _e(i.media.id);
		}), Y(() => i.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), Xe();
		}), Y(() => i.media?.id, () => {
			_.hydrate(i.media);
		}), Y(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (w.value?.play(), c.play()) : e.state === "paused" && (w.value?.pause(), c.pause()), g.updateLocalPosition(c.position), Math.abs(g.driftAmount) > 2 && Ze(e.playbackPosition));
		}), be(() => {
			wn(), et(), A.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", bn), On?.(), It?.removeEventListener?.("addtrack", Mt), It?.removeEventListener?.("removetrack", Mt), mn !== null && (clearInterval(mn), mn = null), j !== null && (clearTimeout(j), j = null);
		}), (n, i) => (U(), I("div", {
			ref_key: "containerRef",
			ref: ee,
			class: V(["player", {
				"is-chrome-hidden": !te.value,
				"is-theater": E.value
			}]),
			onPointermove: En,
			onPointerdown: En,
			onFocusin: En
		}, [z(Xt, {
			video: w.value,
			enabled: J(u).atmosphere,
			playing: J(c).playing,
			"reduced-motion": J(u).effectiveReducedMotion,
			intensity: se.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), L("div", Br, [
			L("video", {
				ref_key: "videoRef",
				ref: w,
				class: "player__video",
				src: H.value,
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
				onEnded: nt,
				onError: lt,
				onEnterpictureinpicture: Sn,
				onLeavepictureinpicture: Cn,
				onClick: Gt
			}, [(U(!0), I(M, null, G(Et.value, (e) => (U(), I("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Hr))), 128))], 40, Vr),
			i[17] ||= L("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[18] ||= L("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			L("div", Ur, [L("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": J(d)("player.back"),
				onClick: i[0] ||= X((e) => s("back"), ["stop"])
			}, [z(t, { name: "arrow-left" })], 8, Wr), L("div", Gr, [
				L("p", Kr, K(J(d)("player.nowPlaying")), 1),
				L("h2", qr, K(e.media.name), 1),
				L("div", Jr, [(U(!0), I(M, null, G(Rt.value, (e, t) => (U(), I(M, { key: t }, [t > 0 && !e.cert ? (U(), I("span", Yr, "·")) : F("", !0), L("span", { class: V({ player__cert: e.cert }) }, K(e.text), 3)], 64))), 128))])
			])]),
			q.value ? F("", !0) : (U(), I("div", Xr, [L("button", {
				type: "button",
				class: V(["player__bigplay", { "is-playing": J(c).playing }]),
				"aria-label": J(c).playing ? J(d)("player.pause") : J(d)("player.play"),
				onClick: X(Gt, ["stop"])
			}, [z(t, { name: J(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Zr)])),
			z(gt, {
				video: w.value,
				language: J(c).subtitleLang,
				"style-config": J(u).captionStyle,
				lifted: te.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			q.value ? F("", !0) : (U(), I("div", {
				key: 1,
				class: "player__controls",
				onClick: i[5] ||= X(() => {}, ["stop"])
			}, [
				z(Ae, {
					position: J(c).position,
					duration: J(c).duration,
					buffered: J(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": B.value,
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
				J(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (U(), P(fr, {
					key: 0,
					position: J(c).position,
					duration: J(c).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: Be
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : F("", !0),
				L("div", Qr, [
					e.prevEpisode ? (U(), I("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(d)("player.previousEpisode"),
						onClick: Ht
					}, [z(t, { name: "skip-back" })], 8, $r)) : F("", !0),
					L("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": J(c).playing ? J(d)("player.pause") : J(d)("player.play"),
						onClick: Gt
					}, [z(t, { name: J(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, ei),
					e.nextEpisode ? (U(), I("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(d)("player.nextEpisode"),
						onClick: Wt
					}, [z(t, { name: "skip-forward" })], 8, ti)) : F("", !0),
					L("span", ni, [
						R(K(J(Z)(J(c).position)), 1),
						i[13] ||= L("span", { class: "player__sep" }, " / ", -1),
						R(K(J(Z)(J(c).duration)), 1)
					]),
					i[14] ||= L("span", { class: "player__grow" }, null, -1),
					L("button", {
						type: "button",
						class: V(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": v.value ? "true" : "false",
						onClick: x
					}, [z(t, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ri),
					z(m, {
						level: y.value,
						onCycle: S
					}, null, 8, ["level"]),
					z(at),
					z(ot),
					z(ht, {
						levels: J(A).levels.value,
						variants: J(A).variants.value,
						"current-level": J(A).currentLevel.value,
						"auto-enabled": J(A).autoEnabled.value,
						"active-height": J(A).activeLevelHeight.value,
						onSelect: Ee
					}, null, 8, [
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					z(Ut, {
						open: mt.value,
						"onUpdate:open": i[1] ||= (e) => mt.value = e,
						tracks: ut.value,
						"audio-tracks": St.value,
						"active-audio": Ct.value,
						onSelectAudio: Ft
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					z(ir, {
						open: wt.value,
						"onUpdate:open": i[2] ||= (e) => wt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					z(_r, {
						ref_key: "sleepTimerRef",
						ref: ie,
						"on-expire": hn
					}, null, 512),
					L("button", {
						type: "button",
						class: V(["player__iconbtn player__syncplay", { "is-on": J(g).isInRoom }]),
						"aria-label": J(g).isInRoom ? J(d)("syncplay.inRoom") : J(d)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[3] ||= (e) => ae.value = !0
					}, [z(t, { name: "user" })], 10, ii),
					L("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(d)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[4] ||= (e) => T.value = !0
					}, [z(t, { name: "info" })], 8, ai),
					O.value ? (U(), I("button", {
						key: 2,
						type: "button",
						class: V(["player__iconbtn", { "is-on": D.value }]),
						"aria-label": D.value ? J(d)("player.exitPip") : J(d)("player.pip"),
						"aria-pressed": D.value,
						onClick: xn
					}, [z(t, { name: "pip" })], 10, oi)) : F("", !0),
					L("button", {
						type: "button",
						class: V(["player__iconbtn", { "is-on": E.value }]),
						"aria-label": E.value ? J(d)("player.exitTheater") : J(d)("player.theater"),
						"aria-pressed": E.value,
						onClick: vn
					}, [z(t, { name: "theater" })], 10, si),
					L("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? J(d)("player.exitFullscreen") : J(d)("player.fullscreen"),
						onClick: yn
					}, [z(t, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ci)
				])
			])),
			q.value ? F("", !0) : (U(), P(zn, {
				key: 2,
				position: J(c).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			q.value ? F("", !0) : (U(), P(Gn, {
				key: 3,
				position: J(c).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			ke.value && !q.value ? (U(), P(tn, {
				key: 4,
				seconds: Oe.value,
				onResume: Qe,
				onRestart: $e
			}, null, 8, ["seconds"])) : F("", !0),
			Q.value && Ye.value && !q.value ? (U(), P(Dn, {
				key: 5,
				media: Ye.value,
				remaining: Me.value,
				total: J(8),
				counting: J(u).autoplay,
				onPlayNow: it,
				onCancel: st
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : F("", !0),
			z(r, {
				modelValue: Ie.value,
				"onUpdate:modelValue": i[6] ||= (e) => Ie.value = e,
				title: `Similar ${Pe.value ?? "marker"}s`,
				size: "lg",
				onClose: qe
			}, {
				default: Se(() => [L("div", li, [Re.value ? (U(), I("div", ui, [z(b, { label: "Finding similar media" })])) : ze.value ? (U(), I("div", di, [z(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), L("p", fi, K(ze.value), 1)])) : !Re.value && Le.value.length === 0 ? (U(), I("div", pi, [
					z(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[15] ||= L("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[16] ||= L("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (U(), I("ul", mi, [(U(!0), I(M, null, G(Le.value, (e) => (U(), I("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [L("div", hi, [e.poster_url ? (U(), I("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, gi)) : (U(), I("div", _i, [z(t, { name: "film" })]))]), L("div", vi, [L("p", yi, K(e.name), 1), e.year ? (U(), I("p", bi, [R(K(e.year) + " ", 1), e.runtime ? (U(), I("span", xi, " · " + K(e.runtime) + "m", 1)) : F("", !0)])) : F("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Ce.value ? (U(), P(Rn, {
				key: 6,
				title: e.media.name,
				progress: J(A).progress.value,
				onBack: i[7] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : F("", !0),
			we.value ? (U(), P(Mn, {
				key: 7,
				title: e.media.name,
				onBack: i[8] ||= (e) => s("back")
			}, null, 8, ["title"])) : F("", !0),
			J(g).isInRoom ? (U(), P(zr, {
				key: 8,
				position: J(c).position,
				duration: J(c).duration,
				"is-playing": J(c).playing,
				onSeek: $,
				onPlay: i[9] ||= (e) => void w.value?.play(),
				onPause: i[10] ||= (e) => void w.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : F("", !0),
			J(g).isInRoom ? (U(), P(Dr, { key: 9 })) : F("", !0),
			z(ge, {
				modelValue: ae.value,
				"onUpdate:modelValue": i[11] ||= (e) => ae.value = e
			}, null, 8, ["modelValue"]),
			z(rt, {
				open: T.value,
				onClose: i[12] ||= (e) => T.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-0ea924f3"]]), Ci = { class: "player-page__stage" }, wi = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Ti = { class: "player-page__blocking-error" }, Ei = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = u(), i = d(), a = we(), o = Te(), s = f(), m = p(), h = W(null), g = W(""), _ = W([]), v = W(null), y = W(null), b = W([]), C = W([]), w = W(!0), oe = W(null), se = W(!1), k = W(null), ce = W(!1), le = W(null), ue = W(null), de = N(() => String(a.params.id ?? ""));
		x(() => h.value?.name);
		let fe = N(() => {
			let e = h.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), A = null, pe = !1;
		function j(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function me(e) {
			let t = i.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function he(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function ge(e, r) {
			let i = A, a = () => pe || i !== A;
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
				let t = ne(n.value, {
					genres: [o],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(t, void 0, i?.signal);
				if (a()) return;
				s.setQueue((c.items ?? []).filter((e) => e.id !== r.id).slice(0, 12));
			} catch (e) {
				if (a() || j(e)) return;
				s.setQueue([]);
			}
		}
		async function M(e, t, r) {
			let i = ne(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function _e(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function B(e, t) {
			le.value = E(e, t), ue.value = D(e, t);
		}
		function ve(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function ye(e, n) {
			if (le.value = null, ue.value = null, !(n.type === "episode" || (n.episode_number ?? null) !== null)) return;
			let r = ve(n.id);
			if (r) {
				B(r, n.id);
				return;
			}
			let i = A, a = () => pe || i !== A;
			try {
				let r = await _e(e, n, i?.signal);
				if (a()) return;
				let o = await M(e, r.id, i?.signal);
				if (a()) return;
				if (T(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => M(e, t.id, i?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let c = re(o);
				c.length && t.set(r.id, c), B(c, n.id);
				let l = c.findIndex((e) => e.id === n.id), u = c.slice(l + 1);
				u.length && s.setQueue(u);
			} catch (e) {
				if (a() || j(e)) return;
				le.value = null, ue.value = null;
			}
		}
		async function G() {
			let e = de.value;
			if (A?.abort(), A = typeof AbortController < "u" ? new AbortController() : null, w.value = !0, oe.value = null, _.value = [], v.value = null, y.value = null, b.value = [], C.value = [], le.value = null, ue.value = null, s.hideMiniPlayer(), !e) {
				oe.value = "No media id provided", w.value = !1;
				return;
			}
			let t = new l({ baseUrl: n.value });
			t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, A?.signal).then((e) => {
				pe || (_.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), v.value = he(e?.intro_marker), y.value = he(e?.outro_marker), b.value = cn(e?.audio_tracks), C.value = Pe(e?.subtitle_tracks));
			}).catch(() => null);
			let r = O(e), i = Date.now();
			if (r && ie(r, i)) {
				q(t, r.item);
				return;
			}
			let a = null;
			try {
				a = (await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, A?.signal)).item;
			} catch (e) {
				if (pe || j(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						k.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", ce.value = !0, w.value = !1;
						return;
					}
				}
				if (r) {
					q(t, r.item);
					return;
				}
				oe.value = e instanceof Error ? e.message : "Failed to load media", w.value = !1;
				return;
			}
			if (!pe) {
				if (!a) {
					if (r) {
						q(t, r.item);
						return;
					}
					oe.value = "Failed to load media item", w.value = !1;
					return;
				}
				ae(e, a, i), q(t, a);
			}
		}
		async function q(e, t) {
			h.value = t, m.hydrate(t), g.value = me(t), w.value = !1;
			let n = (t.episode_number ?? null) !== null;
			ge(e, t), n && await ye(e, t);
		}
		xe(G), Y(de, G), Ce(() => {
			s.current && s.streamUrl && s.showMiniPlayer();
		}), be(() => {
			pe = !0, A?.abort(), A = null;
		});
		function X() {
			o?.back();
		}
		function Z(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ee(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function De(e) {
			se.value = e;
		}
		function Oe() {
			ce.value = !1, X();
		}
		return (e, t) => (U(), I("div", { class: V(["player-page", { "is-theater": se.value }]) }, [
			fe.value && !w.value && !oe.value ? (U(), I("div", {
				key: 0,
				class: "player-page__ambient",
				style: H(fe.value),
				"aria-hidden": "true"
			}, null, 4)) : F("", !0),
			L("div", Ci, [w.value ? (U(), I("div", wi, [z(ee, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : oe.value ? (U(), P(te, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: oe.value
			}, {
				actions: Se(() => [z(S, {
					variant: "solid",
					onClick: G
				}, {
					default: Se(() => [...t[1] ||= [R("Retry", -1)]]),
					_: 1
				}), z(S, {
					variant: "ghost",
					onClick: X
				}, {
					default: Se(() => [...t[2] ||= [R("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : h.value ? (U(), P(Si, {
				key: 2,
				media: h.value,
				"stream-url": g.value,
				"stream-url-for": me,
				"api-base": J(n),
				chapters: _.value,
				"intro-marker": v.value,
				"outro-marker": y.value,
				"playback-audio-tracks": b.value,
				"playback-subtitle-tracks": C.value,
				"prev-episode": le.value,
				"next-episode": ue.value,
				autoplay: !0,
				onBack: X,
				onPlayNext: Z,
				onPlayEpisode: Ee,
				onTheater: De
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
			])) : F("", !0)]),
			z(r, {
				modelValue: ce.value,
				"onUpdate:modelValue": t[0] ||= (e) => ce.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Se(() => [z(S, {
					variant: "solid",
					onClick: Oe
				}, {
					default: Se(() => [...t[3] ||= [R("OK", -1)]]),
					_: 1
				})]),
				default: Se(() => [L("p", Ti, K(k.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-bc15dbd5"]]);
//#endregion
export { Ei as default };

//# sourceMappingURL=PlayerPage-DoReXlvp.js.map