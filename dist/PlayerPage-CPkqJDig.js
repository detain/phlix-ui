import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-BlNXxmNP.js";
import { t as n } from "./IconButton-BI0oqPNk.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { a as i } from "./usePreferencesStore-CFPikE8Z.js";
import { t as a } from "./useMessages-CWq429TV.js";
import { l as o, t as s, u as c } from "./client-BoVYipAG.js";
import { n as l, r as u } from "./useApiBase-CV_r-Kk4.js";
import { r as d, t as f } from "./useImageSrc-KnN1T9Ga.js";
import { i as p } from "./usePlayerStore-DhgapSoa.js";
import { t as m } from "./useToastStore-BDoKlU6N.js";
import { n as h, t as g } from "./ThumbRating-YDkRXLef.js";
import { a as _, n as v, o as y, r as b, s as x, t as S } from "./shortcuts-Ck2yBFUB.js";
import { t as C } from "./Spinner-CEc78iJz.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as w } from "./Button-BL3fV7FU.js";
import { t as T } from "./Badge-DbdgvC-x.js";
import { t as E } from "./Slider-LnnvB5jy.js";
import { t as D } from "./Chip-BJXvFc2X.js";
import { t as O } from "./Select-B_7Gkn8F.js";
import { t as te } from "./Modal-B5BQA5yV.js";
import { t as ne } from "./Skeleton-jlFj-j5t.js";
import { t as k } from "./EmptyState-BwwPJtFd.js";
import { n as A } from "./media-query-DKjhlX8r.js";
import { n as re, o as ie, r as ae, t as oe } from "./episode-order-C2yqgMeX.js";
import { n as se, r as ce, t as le } from "./useMediaItemCache-BKCJnCbr.js";
import { a as ue, c as de, d as fe, f as pe, i as j, l as me, n as he, o as ge, r as _e, s as ve, t as ye, u as be } from "./captions-DoP7ce5A.js";
import { n as xe, t as Se } from "./SyncPlayModal-CyQkpBNq.js";
import { Fragment as M, Transition as Ce, computed as N, createBlock as P, createCommentVNode as F, createElementBlock as I, createElementVNode as L, createTextVNode as R, createVNode as z, defineComponent as B, inject as we, mergeModels as Te, nextTick as Ee, normalizeClass as V, normalizeStyle as H, onBeforeUnmount as De, onMounted as Oe, openBlock as U, ref as W, renderList as G, toDisplayString as K, toRef as ke, unref as q, useModel as J, watch as Y, withCtx as X, withModifiers as Ae } from "vue";
import { onBeforeRouteLeave as je, useRoute as Me, useRouter as Ne } from "vue-router";
//#region src/components/player/format-time.ts
function Z(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Pe = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Fe = { class: "scrubber__track" }, Ie = ["title"], Le = { class: "scrubber__time numeric" }, Re = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { t: r } = a(), i = e, o = n, s = W(null), c = W(!1), l = W(!1), u = W(0), d = W(0), f = (e) => Math.min(1, Math.max(0, e)), p = N(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = N(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = N(() => (c.value || l.value) && i.duration > 0), g = N(() => c.value ? u.value : d.value), _ = N(() => g.value * i.duration), v = N(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = N(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = N(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = N(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
			if (i.duration <= 0) return;
			c.value = !0;
			try {
				s.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = S(e);
			u.value = t, o("scrub-start"), e.preventDefault();
		}
		function ee(e) {
			let t = S(e);
			d.value = t, c.value && (u.value = t);
		}
		function w(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				o("seek", u.value * i.duration), o("scrub-end");
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
			o("seek", n), e.preventDefault();
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
			"aria-valuetext": q(Z)(e.position),
			"aria-label": q(r)("player.seek"),
			onPointerdown: C,
			onPointermove: ee,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: T,
			onPointerleave: E,
			onKeydown: D
		}, [L("div", Fe, [
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
			}, null, 12, Ie))), 128)),
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
		}, null, 4)) : F("", !0), L("span", Le, K(q(Z)(_.value)), 1)], 4)) : F("", !0)], 40, Pe));
	}
}), [["__scopeId", "data-v-3d610715"]]), ze = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Q(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Be(e) {
	return e === !0 || e === "true" || e === 1;
}
function Ve(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function He(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Q(e.url ?? e.src);
		r !== "" && t.push({
			index: Ve(e.index),
			language: Q(e.language ?? e.lang ?? e.srclang),
			label: Q(e.label),
			default: Be(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Ue(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Ve(e.height);
		r <= 0 || t.push({
			id: Q(e.id),
			label: Q(e.label),
			height: r,
			width: Ve(e.width),
			bitrate: Ve(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function We(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function Ge(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function Ke(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		masterUrl: Q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Q(t.status, "running"),
		reused: Be(t.reused),
		subtitles: He(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ue(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function qe(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		status: Q(t.status, "running"),
		playlistReady: Be(t.playlist_ready ?? t.playlistReady),
		progress: Ve(t.progress),
		masterUrl: Q(t.master_url ?? t.masterUrl),
		subtitles: He(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ue(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Je(e) {
	return e.playlistReady || e.status === "completed";
}
function Ye(e) {
	return ze.has(e);
}
function Xe(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Ze(e) {
	let t = W("idle"), n = W(0), r = W([]), i = W([]), a = W(-1), o = W(!0), c = W(null), l = W(null), u = W([]), d = W(-1), f = W(null), m = W(null);
	function h(e) {
		if (!O) return;
		i.value = O.levels, a.value = O.getCurrentLevel(), o.value = O.autoLevelEnabled;
		let t = e ?? O.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		c.value = n ? n.height : null;
	}
	function g() {
		i.value = [], a.value = -1, o.value = !0, c.value = null, l.value = null;
	}
	function _(e) {
		O && (u.value = O.audioTracks, d.value = e ?? O.getCurrentAudioTrack());
	}
	function v() {
		u.value = [], d.value = -1;
	}
	function y(e) {
		!e || e.length === 0 || (l.value = e);
	}
	function b(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: Xe(n, e.url)
		}));
	}
	let S = e.attach ?? x, C = e.pollIntervalMs ?? 1e3, ee = e.maxWaitMs ?? 12e4, w = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), T = Math.max(1, Math.ceil(ee / Math.max(1, C))), E = Qe(), D = e.getToken ?? (() => $e(E)), O = null, te = null, ne = null, k = !1, A = null;
	function re() {
		return e.client ?? new s({
			baseUrl: e.apiBase(),
			tokenStore: E ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function ie(i, a, o, s) {
		le(), k = !1, A = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = re(), c = Ke(await r.post(We(a, o), void 0, A.signal));
			if (k) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			b(c.subtitles), y(c.variants), f.value = c.jobId, m.value = Xe(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < T; e++) {
				let e = qe(await r.get(Ge(c.jobId), void 0, A.signal));
				if (k) return;
				if (n.value = e.progress, b(e.subtitles), y(e.variants), Ye(e.status)) throw Error(`transcode ${e.status}`);
				if (Je(e)) {
					l = !0;
					break;
				}
				if (await w(C), k) return;
			}
			if (!l) throw Error("transcode timed out");
			if (O = await S(i, m.value, {
				getToken: D,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => h(),
				onError: () => {
					k || (t.value = "error");
				}
			}), k) {
				O.destroy(), O = null;
				return;
			}
			te = O.onLevelSwitched((e) => h(e)), ne = O.onAudioTrackSwitched((e) => _(e)), h(), _();
			try {
				let e = p();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			k || (t.value = "error");
		}
	}
	function ae(e) {
		O && (O.setCurrentLevel(e === "auto" ? -1 : e), h());
	}
	function oe(e) {
		O && (O.setNextLevel(e === "auto" ? -1 : e), h());
	}
	function se(e) {
		O && (O.setAudioTrack(e), _());
	}
	function ce(e) {
		if (!O || !m.value) return;
		let t = m.value.replace("master.m3u8", `media_v${e}.m3u8`);
		O.loadSource(t), g();
	}
	function le() {
		if (k = !0, A &&= (A.abort(), null), te) {
			try {
				te();
			} catch {}
			te = null;
		}
		if (ne) {
			try {
				ne();
			} catch {}
			ne = null;
		}
		if (O) {
			try {
				O.destroy();
			} catch {}
			O = null;
		}
		f.value = null, m.value = null;
	}
	function ue() {
		le(), t.value = "idle", n.value = 0, r.value = [], g(), v();
	}
	return {
		state: t,
		progress: n,
		subtitleTracks: r,
		levels: i,
		currentLevel: a,
		autoEnabled: o,
		activeLevelHeight: c,
		variants: l,
		audioTracks: u,
		currentAudioTrack: d,
		setLevel: ae,
		setNextLevel: oe,
		setAudioTrack: se,
		jobId: f,
		masterUrl: m,
		loadVariantPlaylist: ce,
		start: ie,
		cleanup: le,
		reset: ue
	};
}
function Qe() {
	try {
		return new o();
	} catch {
		return null;
	}
}
function $e(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var et = 10;
function tt(e) {
	let t = W(null), n = W(!1), r = W(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new s({ baseUrl: e.apiBase() });
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
	function c(e) {
		let n = t.value;
		if (!n || !n.sprite_url || !n.timeline || n.timeline.length === 0) return null;
		let r = o(e, n.timeline);
		if (r === null) return null;
		let i = r.frame, a = i % et, s = Math.floor(i / et), c = a / 9 * 100, l = s / 5 * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function l(o, s) {
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
		thumbnailAt: c,
		fetch: l,
		reset: u
	};
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var nt = ["aria-label"], rt = { class: "shortcuts__head" }, it = { class: "shortcuts__title" }, at = { class: "shortcuts__grid" }, ot = { class: "shortcuts__keys" }, st = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, ct = {
	key: 1,
	class: "shortcuts__key"
}, lt = { class: "shortcuts__label" }, ut = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => b }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = W(null);
		return r(l, ke(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (U(), I("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= Ae((e) => s("close"), ["self"])
		}, [L("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": q(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [L("div", rt, [L("h3", it, K(q(c)("player.keyboard")), 1), z(n, {
			name: "x",
			label: q(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), L("ul", at, [(U(!0), I(M, null, G(e.shortcuts, (e) => (U(), I("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [L("span", ot, [(U(!0), I(M, null, G(e.keys, (e, n) => (U(), I(M, { key: n }, [e === "–" ? (U(), I("span", st, "–")) : (U(), I("kbd", ct, [q(S)[e] ? (U(), P(t, {
			key: 0,
			name: q(S)[e],
			label: q(v)[e] ?? e
		}, null, 8, ["name", "label"])) : (U(), I(M, { key: 1 }, [R(K(e), 1)], 64))]))], 64))), 128))]), L("span", lt, K(e.label), 1)]))), 128))])], 8, nt)])) : F("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), dt = { class: "volume" }, ft = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "VolumeControl",
	setup(e) {
		let t = p(), r = i(), { t: o } = a(), s = N(() => t.muted ? 0 : t.volume), c = N(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Y(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (U(), I("div", dt, [z(n, {
			name: c.value,
			label: q(t).muted ? q(o)("player.unmute") : q(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => q(t).toggleMute()
		}, null, 8, ["name", "label"]), z(E, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: q(o)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), pt = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		], n = p(), { t: r } = a(), i = N(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function o(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (U(), P(O, {
			class: "speed-menu",
			tone: "glass",
			"model-value": q(n).rate,
			options: i.value,
			label: q(r)("player.playbackSpeed"),
			"onUpdate:modelValue": o
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), mt = "auto", ht = "original";
function gt(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function _t(e) {
	return e >= 2160 ? "4K" : gt(e);
}
function vt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = gt(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: _t(r.height)
		}));
	}
	return n;
}
function yt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) gt(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function bt(e, t) {
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
function xt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function St(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && bt(e, n) >= 0;
}
function Ct(e, t) {
	if (t < 0) return mt;
	let n = e.find((e) => e.index === t);
	return n ? gt(n.height) : mt;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var wt = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "QualityMenu",
	props: /*@__PURE__*/ Te({
		levels: { default: () => [] },
		variants: { default: null },
		currentLevel: { default: -1 },
		autoEnabled: {
			type: Boolean,
			default: !0
		},
		activeHeight: { default: null }
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: /*@__PURE__*/ Te(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, o = J(e, "open"), s = W(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = p(), d = i(), { t: f } = a(), m = N(() => vt(r.levels)), h = N(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = m.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = gt(i.height);
				e.has(a) || n && yt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: _t(i.height)
				}));
			}
			return t;
		}), g = N(() => m.value.length >= 2 ? m.value : h.value), _ = N(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = N(() => bt(r.levels, _.value)), y = N(() => _.value && v.value >= 0 ? {
			value: ht,
			label: f("player.qualityOriginal", { height: _.value.height })
		} : null), b = N(() => g.value.length >= 2), x = N(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: _t(r.activeHeight) })), S = N(() => [
			{
				value: mt,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), C = N(() => r.autoEnabled ? mt : y.value && r.currentLevel === v.value && (u.quality === "original" || d.defaultQuality === "original") ? ht : Ct(r.levels, r.currentLevel));
		function ee(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), d.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : yt(r.levels, t);
			u.setQuality(t), d.defaultQuality = t, n >= 0 ? l("select", n) : l("select", t);
		}
		return t({ toggleMenu: c }), (e, t) => b.value || o.value ? (U(), P(O, {
			key: 0,
			ref_key: "selectRef",
			ref: s,
			class: "quality-menu",
			tone: "glass",
			"model-value": C.value,
			options: S.value,
			label: q(f)("player.quality"),
			open: o.value,
			"onUpdate:open": t[0] ||= (e) => o.value = e,
			"onUpdate:modelValue": ee
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), Tt = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = W([]), i = W(0), a = N(() => n.lifted ? i.value : 0), o = N(() => ({
			...de(n.styleConfig),
			"--phlix-sub-offset": `${a.value}px`
		})), s = null;
		function c() {
			let e = n.controlsRoot;
			i.value = e && typeof e.offsetHeight == "number" ? e.offsetHeight : 0;
		}
		function l() {
			s?.disconnect(), s = null;
		}
		function u() {
			l(), c();
			let e = n.controlsRoot;
			!e || typeof ResizeObserver > "u" || (s = new ResizeObserver(() => c()), s.observe(e));
		}
		Y(() => n.controlsRoot, u, { immediate: !0 }), De(l);
		let d = null, f = null, p = null;
		function m() {
			r.value = fe(d);
		}
		function h() {
			p != null && (clearTimeout(p), p = null);
		}
		function g() {
			h(), p = setTimeout(() => {
				if (p = null, !d) return;
				ve(n.video, n.language);
				let e = fe(d);
				e.length && (r.value = e);
			}, 0);
		}
		function _() {
			h(), d?.removeEventListener("cuechange", m), f?.removeEventListener("load", m), d = null, f = null;
		}
		function v(e, t) {
			let n = e?.querySelectorAll?.("track");
			if (!n) return null;
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r.track === t) return r;
			}
			return null;
		}
		function y() {
			_(), ve(n.video, n.language);
			let e = pe(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = fe(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return Y(() => [n.video, n.language], y, { immediate: !0 }), De(_), t({ lines: r }), (t, n) => r.value.length ? (U(), I("div", {
			key: 0,
			class: V(["player__captions", { "is-lifted": e.lifted }]),
			style: H(o.value)
		}, [(U(!0), I(M, null, G(r.value, (e, t) => (U(), I("p", {
			key: t,
			class: "player__caption-line"
		}, K(e), 1))), 128))], 6)) : F("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), Et = ["aria-label", "aria-expanded"], Dt = ["aria-label"], Ot = { class: "capmenu__head" }, kt = { class: "capmenu__title" }, At = ["aria-label"], jt = ["aria-checked", "tabindex"], Mt = { class: "capmenu__check" }, Nt = { class: "capmenu__optlabel" }, Pt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ft = { class: "capmenu__check" }, It = { class: "capmenu__optlabel" }, Lt = { class: "capmenu__check" }, Rt = { class: "capmenu__optlabel" }, zt = { class: "capmenu__title capmenu__title--sub" }, Bt = ["aria-label"], Vt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ht = { class: "capmenu__check" }, Ut = { class: "capmenu__optlabel" }, Wt = { class: "capmenu__title capmenu__title--sub" }, Gt = { class: "capmenu__style" }, Kt = { class: "capmenu__field" }, qt = { class: "capmenu__fieldlabel" }, Jt = { class: "capmenu__field" }, Yt = { class: "capmenu__fieldlabel" }, Xt = { class: "capmenu__field" }, Zt = { class: "capmenu__fieldlabel" }, Qt = { class: "capmenu__field" }, $t = { class: "capmenu__fieldlabel" }, en = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
	emits: [
		"update:open",
		"select-audio",
		"add-subtitles"
	],
	setup(e, { emit: o }) {
		let s = e, c = o, l = p(), u = i(), { t: d } = a(), f = W(null), m = W(null), h = N(() => l.subtitleLang), g = N(() => s.tracks.some((e) => e.language === h.value)), _ = N(() => g.value ? "captions" : "captions-off"), v = N(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = N(() => s.activeAudio >= 0 ? s.activeAudio : 0);
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
		function ee() {
			c("add-subtitles"), x();
		}
		function w(e, t, n) {
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
		function T(e) {
			let t = w(e, s.tracks.length + 1, v.value);
			t !== null && S(t === 0 ? null : s.tracks[t - 1].language);
		}
		function E(e) {
			let t = w(e, s.audioTracks.length, y.value);
			t !== null && C(s.audioTracks[t].index);
		}
		function D(e) {
			u.captionStyle = {
				...u.captionStyle,
				size: e
			};
		}
		function te(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function ne(e) {
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
		r(m, ke(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function A(e) {
			f.value && !f.value.contains(e.target) && x();
		}
		return Y(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", A, !0) : document.removeEventListener("pointerdown", A, !0));
		}, { immediate: !0 }), De(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", A, !0);
		}), (r, i) => (U(), I("div", {
			ref_key: "rootEl",
			ref: f,
			class: "capmenu"
		}, [L("button", {
			type: "button",
			class: V(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? q(d)("player.captionsOn") : q(d)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [z(t, { name: _.value }, null, 8, ["name"])], 10, Et), e.open ? (U(), I("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": q(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			L("div", Ot, [L("h3", kt, K(q(d)("player.subtitles")), 1), z(n, {
				name: "x",
				label: q(d)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			L("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": q(d)("player.subtitleTrack"),
				onKeydown: T
			}, [L("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => S(null)
			}, [L("span", Mt, [g.value ? F("", !0) : (U(), P(t, {
				key: 0,
				name: "check"
			}))]), L("span", Nt, K(q(d)("player.off")), 1)], 8, jt), (U(!0), I(M, null, G(e.tracks, (e, n) => (U(), I("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [L("span", Ft, [h.value === e.language ? (U(), P(t, {
				key: 0,
				name: "check"
			})) : F("", !0)]), L("span", It, K(e.label), 1)], 8, Pt))), 128))], 40, At),
			L("button", {
				type: "button",
				class: "capmenu__add",
				onClick: ee
			}, [L("span", Lt, [z(t, { name: "plus" })]), L("span", Rt, K(q(d)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (U(), I(M, { key: 0 }, [L("h3", zt, K(q(d)("player.audio")), 1), L("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": q(d)("player.audioTrack"),
				onKeydown: E
			}, [(U(!0), I(M, null, G(e.audioTracks, (n) => (U(), I("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => C(n.index)
			}, [L("span", Ht, [e.activeAudio === n.index ? (U(), P(t, {
				key: 0,
				name: "check"
			})) : F("", !0)]), L("span", Ut, K(n.label), 1)], 8, Vt))), 128))], 40, Bt)], 64)) : F("", !0),
			L("h3", Wt, K(q(d)("player.captionStyle")), 1),
			L("div", Gt, [
				L("div", Kt, [L("span", qt, K(q(d)("player.size")), 1), z(O, {
					"model-value": q(u).captionStyle.size,
					options: q(j),
					label: q(d)("player.captionSize"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", Jt, [L("span", Yt, K(q(d)("player.color")), 1), z(O, {
					"model-value": q(u).captionStyle.textColor,
					options: q(he),
					label: q(d)("player.captionColor"),
					"onUpdate:modelValue": te
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", Xt, [L("span", Zt, K(q(d)("player.background")), 1), z(O, {
					"model-value": q(u).captionStyle.background,
					options: q(ye),
					label: q(d)("player.captionBackground"),
					"onUpdate:modelValue": ne
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", Qt, [L("span", $t, K(q(d)("player.edge")), 1), z(O, {
					"model-value": q(u).captionStyle.edge,
					options: q(_e),
					label: q(d)("player.captionEdge"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Dt)) : F("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), tn = { class: "subsearch" }, nn = { class: "subsearch__langs" }, rn = { class: "subsearch__legend" }, an = { class: "subsearch__chips" }, on = { class: "subsearch__actions" }, sn = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, cn = {
	key: 2,
	class: "subsearch__prompt"
}, ln = {
	key: 3,
	class: "subsearch__list"
}, un = { class: "subsearch__meta" }, dn = { class: "subsearch__release" }, fn = { class: "subsearch__signals" }, pn = { class: "subsearch__provider" }, mn = ["aria-label"], hn = {
	key: 2,
	class: "subsearch__stat"
}, gn = {
	key: 3,
	class: "subsearch__stat"
}, _n = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "SubtitleSearch",
	props: {
		open: {
			type: Boolean,
			default: !1
		},
		mediaId: {},
		apiBase: { default: "" },
		preferredLangs: { default: () => [] },
		client: { default: void 0 }
	},
	emits: ["update:open", "added"],
	setup(e, { emit: n }) {
		let r = e, i = n, { t: o } = a(), l = m(), u = [
			"en",
			"es",
			"fr",
			"de",
			"it",
			"pt",
			"nl",
			"ru",
			"ja",
			"ko",
			"zh",
			"ar"
		];
		function d(e) {
			if (!e) return e;
			try {
				let t = Intl.DisplayNames;
				if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
			} catch {}
			return e;
		}
		let f = N(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...r.preferredLangs, ...u]) {
				let r = (n || "").toLowerCase();
				!r || e.has(r) || (e.add(r), t.push(r));
			}
			return t;
		}), p = W(/* @__PURE__ */ new Set());
		function h() {
			let e = /* @__PURE__ */ new Set();
			for (let t of r.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), p.value = e;
		}
		function g(e) {
			let t = new Set(p.value);
			t.has(e) ? t.delete(e) : t.add(e), p.value = t;
		}
		let _ = W(!1), v = W(!1), y = W([]), b = W(/* @__PURE__ */ new Set()), x = W(/* @__PURE__ */ new Set());
		function S(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let ee = N(() => [...y.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), E = N(() => p.value.size > 0 && !_.value);
		function O() {
			return r.client ?? new s({ baseUrl: r.apiBase ?? "" });
		}
		async function ne() {
			if (E.value) {
				_.value = !0, v.value = !0;
				try {
					y.value = await O().searchSubtitles(r.mediaId, [...p.value]);
				} catch {
					y.value = [], l.error(o("player.subtitleSearchError"));
				} finally {
					_.value = !1;
				}
			}
		}
		function A() {
			i("update:open", !1);
		}
		function re(e) {
			if (e instanceof c) {
				if (e.status === 429) {
					let t = e.body && typeof e.body == "object" ? e.body : {}, n = typeof t.downloadsRemaining == "number" ? t.downloadsRemaining : null, r = typeof t.resetTimeUtc == "string" ? t.resetTimeUtc : null;
					r ? l.warning(o("player.subtitleQuotaReset", { time: ie(r) })) : n === null ? l.warning(o("player.subtitleQuota")) : l.warning(o("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (e.status === 404) {
					l.error(o("player.subtitleAddNotFound"));
					return;
				}
			}
			l.error(o("player.subtitleAddError"));
		}
		function ie(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function ae(e) {
			let t = S(e);
			if (b.value.has(t) || x.value.has(t)) return;
			let n = new Set(b.value);
			n.add(t), b.value = n;
			try {
				let n = He([(await O().downloadSubtitle(r.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], a = new Set(x.value);
				a.add(t), x.value = a;
				let s = d(e.language);
				l.success(s ? o("player.subtitleAdded", { language: s }) : o("player.subtitleAddedGeneric")), n && i("added", n);
			} catch (e) {
				re(e);
			} finally {
				let e = new Set(b.value);
				e.delete(t), b.value = e;
			}
		}
		return Y(() => r.open, (e) => {
			e && (h(), y.value = [], v.value = !1, _.value = !1, b.value = /* @__PURE__ */ new Set(), x.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (n, r) => (U(), P(te, {
			"model-value": e.open,
			title: q(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => i("update:open", e)
		}, {
			footer: X(() => [z(w, {
				variant: "ghost",
				onClick: A
			}, {
				default: X(() => [R(K(q(o)("common.close")), 1)]),
				_: 1
			})]),
			default: X(() => [L("div", tn, [
				L("fieldset", nn, [L("legend", rn, K(q(o)("player.subtitleSearchLanguages")), 1), L("div", an, [(U(!0), I(M, null, G(f.value, (e) => (U(), P(D, {
					key: e,
					selected: p.value.has(e),
					size: "md",
					"aria-label": d(e),
					"onUpdate:selected": (t) => g(e)
				}, {
					default: X(() => [R(K(d(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				L("div", on, [z(w, {
					variant: "solid",
					"left-icon": "search",
					loading: _.value,
					disabled: !E.value,
					onClick: ne
				}, {
					default: X(() => [R(K(q(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				_.value ? (U(), I("div", sn, [z(C, { label: q(o)("player.subtitleSearching") }, null, 8, ["label"]), L("span", null, K(q(o)("player.subtitleSearching")), 1)])) : v.value && ee.value.length === 0 ? (U(), P(k, {
					key: 1,
					icon: "captions",
					title: q(o)("player.subtitleSearchEmpty"),
					description: q(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : v.value ? (U(), I("ul", ln, [(U(!0), I(M, null, G(ee.value, (e) => (U(), I("li", {
					key: S(e),
					class: "subsearch__item"
				}, [L("div", un, [L("p", dn, K(e.releaseName || e.provider), 1), L("div", fn, [
					z(T, {
						tone: "neutral",
						size: "sm"
					}, {
						default: X(() => [R(K(d(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (U(), P(T, {
						key: 0,
						tone: "info",
						size: "sm",
						label: q(o)("player.subtitleHearingImpairedFull")
					}, {
						default: X(() => [R(K(q(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : F("", !0),
					L("span", pn, K(e.provider), 1),
					e.rating > 0 ? (U(), I("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": q(o)("player.subtitleRating", { rating: e.rating })
					}, [z(t, { name: "star" }), R(" " + K(e.rating), 1)], 8, mn)) : F("", !0),
					e.downloadCount > 0 ? (U(), I("span", hn, K(q(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : F("", !0),
					e.fps ? (U(), I("span", gn, K(q(o)("player.subtitleFps", { fps: e.fps })), 1)) : F("", !0)
				])]), z(w, {
					variant: "outline",
					size: "sm",
					"left-icon": x.value.has(S(e)) ? "check" : "plus",
					loading: b.value.has(S(e)),
					disabled: b.value.has(S(e)) || x.value.has(S(e)),
					"aria-label": q(o)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => ae(e)
				}, {
					default: X(() => [R(K(b.value.has(S(e)) ? q(o)("player.subtitleAdding") : q(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (U(), I("p", cn, K(q(o)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), vn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function yn(e, t, n, r, i, a, o) {
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
		r: vn(d / m),
		g: vn(f / m),
		b: vn(p / m)
	};
}
function bn(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: yn(e, t, n, 0, 0, r, n),
		right: yn(e, t, n, t - r, 0, t, n),
		center: yn(e, t, n, 0, 0, t, n)
	};
}
function xn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Sn(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${xn(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${xn(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${xn(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Cn(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var wn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
			r.value = Cn(i);
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
				c.value = Sn(bn(n, 32, 18));
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
		function ee() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		Y(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			ee(), e && t && C();
		}, { immediate: !0 }), Oe(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), De(() => {
			ee(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let w = N(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (U(), I("div", {
			class: V(["player__ambient", { "is-active": o.value }]),
			style: H(o.value ? w.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Tn = ["aria-label"], $ = { class: "resume__label" }, En = { class: "resume__time numeric" }, Dn = { class: "resume__actions" }, On = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = N(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (U(), I("div", {
			class: "resume",
			role: "region",
			"aria-label": q(i)("player.resumePlayback")
		}, [L("p", $, [
			R(K(o.value[0]), 1),
			L("span", En, K(q(Z)(e.seconds)), 1),
			R(K(o.value[1]), 1)
		]), L("div", Dn, [L("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [z(t, { name: "play" }), L("span", null, K(q(i)("player.resume")), 1)]), L("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [z(t, { name: "rewind" }), L("span", null, K(q(i)("player.startOver")), 1)])])], 8, Tn));
	}
}), [["__scopeId", "data-v-271c5209"]]), kn = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], An = /* @__PURE__ */ new Set([
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
function jn(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Mn(...e) {
	return e.some((e) => An.has(jn(e)));
}
function Nn(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Pn(e) {
	return e?.error?.code === 2;
}
function Fn(e) {
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
var In = 2 * Math.PI * 15;
function Ln(e, t, n = In) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Rn = /* @__PURE__ */ new Map([
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
]), zn = /* @__PURE__ */ new Map([
	["h264", "h264"],
	["avc", "h264"],
	["avc1", "h264"],
	["x264", "h264"],
	["hevc", "hevc"],
	["h265", "hevc"],
	["hvc1", "hevc"],
	["hev1", "hevc"],
	["x265", "hevc"],
	["av1", "av1"],
	["av01", "av1"],
	["vp9", "vp9"],
	["vp09", "vp9"],
	["vp8", "vp8"],
	["vp08", "vp8"],
	["theora", "theora"]
]), Bn = /* @__PURE__ */ new Set(["h264"]), Vn = /* @__PURE__ */ new Map([
	["hevc", [
		"hvc1.1.6.L93.B0",
		"hvc1.1.4.L120.90",
		"hev1.1.4.L120.90",
		"hvc1.1.4.L120"
	]],
	["av1", ["av01.0.08M.08", "av01.0.05M.08"]],
	["vp9", ["vp09.00.10.08", "vp9"]],
	["vp8", ["vp8"]],
	["theora", ["theora"]]
]);
function Hn(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = zn.get(t);
	return n === void 0 ? "transcode" : Bn.has(n) ? "direct" : "probe";
}
function Un(e) {
	if (!Array.isArray(e)) return "";
	for (let t of e) {
		if (typeof t != "object" || !t) continue;
		let e = t, n = e.stream_type ?? e.streamType;
		if (typeof n != "string" || n.trim().toLowerCase() !== "video") continue;
		let r = typeof e.codec == "string" ? e.codec.trim() : "";
		if (r !== "") return r;
	}
	return "";
}
var Wn = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function Gn(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return Wn.get(t) ?? "video/mp4";
}
function Kn(e, t = "video/mp4") {
	let n = Rn.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function qn(e, t = "video/mp4") {
	if (!e) return !0;
	let n = Kn(e, t);
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
async function Jn(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = zn.get(n), i = r === void 0 ? void 0 : Vn.get(r);
	if (!i || i.length === 0 || typeof navigator > "u") return !1;
	let a = navigator.mediaCapabilities;
	if (a && typeof a.decodingInfo == "function") try {
		if ((await a.decodingInfo({
			type: "media-source",
			video: {
				contentType: `${t}; codecs="${i[0]}"`,
				width: 3840,
				height: 2160,
				bitrate: 5e7,
				framerate: 60
			}
		})).supported) return !0;
	} catch {}
	if (typeof document < "u") {
		let e = document.createElement("video");
		for (let n of i) {
			let r = e.canPlayType(`${t}; codecs="${n}"`);
			if (r === "probably" || r === "maybe") return !0;
		}
	}
	return !1;
}
async function Yn(e, t, n = "") {
	if (Mn(...e)) return !0;
	let r = e.map((e) => jn(e)).find((e) => kn.includes(e)) ?? "";
	if (!kn.includes(r)) return !1;
	let i = Gn(r), a = Hn(n);
	if (a === "transcode" || a === "probe" && !await Jn(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await qn(e.codec, i)) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Xn = ["aria-label"], Zn = ["src"], Qn = { class: "upnext__body" }, $n = { class: "upnext__eyebrow" }, er = { class: "upnext__title" }, tr = {
	key: 0,
	class: "upnext__cd numeric"
}, nr = { class: "upnext__actions" }, rr = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, ir = ["r"], ar = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], or = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { t: r } = a(), { imgSrc: i } = f(), o = e, s = n, c = N(() => o.posterUrl ?? o.media.poster_url ?? null), l = N(() => Ln(o.remaining, o.total));
		return (n, a) => (U(), I("aside", {
			class: "upnext",
			role: "region",
			"aria-label": q(r)("player.upNext")
		}, [
			c.value ? (U(), I("img", {
				key: 0,
				class: "upnext__thumb",
				src: q(i)(c.value),
				alt: "",
				loading: "lazy"
			}, null, 8, Zn)) : F("", !0),
			L("div", Qn, [
				L("p", $n, K(q(r)("player.upNext")), 1),
				L("h4", er, K(e.media.name), 1),
				e.counting ? (U(), I("p", tr, K(q(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : F("", !0),
				L("div", nr, [L("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: a[0] ||= (e) => s("play-now")
				}, [z(t, { name: "play" }), L("span", null, K(q(r)("player.playNow")), 1)]), L("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: a[1] ||= (e) => s("cancel")
				}, K(q(r)("player.cancel")), 1)])
			]),
			e.counting ? (U(), I("svg", rr, [L("circle", {
				cx: "18",
				cy: "18",
				r: q(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, ir), L("circle", {
				cx: "18",
				cy: "18",
				r: q(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": q(In),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, ar)])) : F("", !0)
		], 8, Xn));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), sr = {
	class: "transcode",
	role: "alert"
}, cr = { class: "transcode__card" }, lr = { class: "transcode__heading" }, ur = { class: "transcode__body" }, dr = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (U(), I("div", sr, [L("div", cr, [
			z(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			L("h3", lr, K(q(i)("player.transcodeHeading")), 1),
			L("p", ur, K(e.title ? q(i)("player.transcodeBodyTitled", { title: e.title }) : q(i)("player.transcodeBodyUntitled")), 1),
			L("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [z(t, { name: "arrow-left" }), L("span", null, K(q(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), fr = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, pr = { class: "prep__card" }, mr = { class: "prep__heading" }, hr = { class: "prep__body" }, gr = ["aria-valuenow"], _r = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (U(), I("div", fr, [L("div", pr, [
			z(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			L("h3", mr, K(q(r)("player.transcodePreparingHeading")), 1),
			L("p", hr, K(e.title ? q(r)("player.transcodePreparingTitled", { title: e.title }) : q(r)("player.transcodePreparingUntitled")), 1),
			L("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [L("div", {
				class: "prep__bar-fill",
				style: H({ width: i() + "%" })
			}, null, 4)], 8, gr),
			L("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [z(t, { name: "arrow-left" }), L("span", null, K(q(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), vr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let c = N(() => s(r.position, r.introMarker) ? {
			label: o("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: o("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (U(), P(Ce, { name: "skip" }, {
			default: X(() => [c.value ? (U(), I("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ae(l, ["stop"])
			}, [L("span", null, K(c.value.label), 1), z(t, { name: "skip-forward" })])) : F("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), yr = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, br = ["aria-label", "onClick"], xr = { class: "skip-controls__label" }, Sr = 5, Cr = 30, wr = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(e, { emit: n }) {
		let r = e, i = n, { t: o } = a();
		function s(e) {
			return e / 1e3;
		}
		function c(e, t) {
			return t >= s(e.endMs);
		}
		function l(e, t) {
			if (c(e, t)) return !1;
			let n = s(e.startMs), r = n - Sr, i = n + Cr;
			return t >= r && t < i;
		}
		let u = [
			"intro",
			"outro",
			"credits"
		];
		function d(e) {
			switch (e) {
				case "intro": return o("player.skipLabelIntro");
				case "outro": return o("player.skipLabelCredits");
				case "credits": return o("player.skipLabelCredits");
				case "ad": return o("player.skipLabelSkipCredits");
			}
		}
		let f = N(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (U(), I("div", yr, [(U(!0), I(M, null, G(f.value, (e) => (U(), I("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: Ae((t) => p(e), ["stop"])
		}, [L("span", xr, K(d(e.type)), 1), z(t, { name: "skip-forward" })], 8, br))), 128))])) : F("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Tr = ["aria-label", "aria-expanded"], Er = ["aria-label"], Dr = { class: "chapterlist__head" }, Or = { class: "chapterlist__title" }, kr = ["aria-label"], Ar = ["onClick"], jr = { class: "chapterlist__index" }, Mr = { class: "chapterlist__name" }, Nr = { class: "chapterlist__meta" }, Pr = { class: "chapterlist__time" }, Fr = {
	key: 0,
	class: "chapterlist__duration"
}, Ir = {
	key: 1,
	class: "chapterlist__empty"
}, Lr = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ChapterList",
	props: {
		chapters: { default: () => [] },
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "seek"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a();
		function l() {
			s("update:open", !1);
		}
		function u() {
			s("update:open", !o.open);
		}
		let d = N(() => o.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Z(e.start), a;
			return e.end != null && e.end > e.start && (a = Z(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = W(null), p = W(null);
		r(p, ke(o, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		Y(() => o.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), De(() => {
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
			"aria-label": q(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [z(t, { name: "list" })], 10, Tr), e.open ? (U(), I("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": q(c)("player.chapterList"),
			tabindex: "-1"
		}, [L("div", Dr, [L("h3", Or, K(q(c)("player.chapters")), 1), z(n, {
			name: "x",
			label: q(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (U(), I("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": q(c)("player.chapterList")
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
			L("span", jr, K(e.index), 1),
			L("span", Mr, K(e.label), 1),
			L("span", Nr, [L("span", Pr, K(e.startLabel), 1), e.durationLabel ? (U(), I("span", Fr, "· " + K(e.durationLabel), 1)) : F("", !0)])
		], 8, Ar)]))), 128))], 8, kr)) : (U(), I("p", Ir, K(q(c)("player.noChapters")), 1))], 8, Er)) : F("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Rr = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, zr = { class: "marker-timeline__ticks" }, Br = [
	"title",
	"aria-label",
	"onClick"
], Vr = { class: "marker-timeline__tooltip" }, Hr = { class: "marker-timeline__tooltip-label" }, Ur = { class: "marker-timeline__tooltip-time numeric" }, Wr = ["onClick"], Gr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		}, [l.value ? (U(), I("div", Rr, [t[0] ||= L("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [L("polygon", { points: "5,3 19,12 5,21" })], -1), R(" " + K(u.value), 1)])) : F("", !0), L("div", zr, [(U(!0), I(M, null, G(s.value, (e) => (U(), I("button", {
			key: e.id,
			type: "button",
			class: V(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: H({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${q(Z)(e.startSec)}`,
			"aria-label": `${e.label} at ${q(Z)(e.startSec)}`,
			onClick: Ae((t) => d(e), ["stop"])
		}, [L("span", Vr, [
			L("span", Hr, K(e.label), 1),
			L("span", Ur, K(q(Z)(e.startSec)), 1),
			L("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ae((t) => f(e), ["stop"])
			}, " Find similar ", 8, Wr)
		])], 14, Br))), 128))])], 2)) : F("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Kr = ["aria-label", "aria-expanded"], qr = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, Jr = ["aria-label"], Yr = ["aria-selected", "onClick"], Xr = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(e, { expose: n }) {
		let r = e, { t: i } = a(), o = [
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
		return De(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (U(), I("div", { class: V(["sleep-timer", { "is-active": l.value }]) }, [L("button", {
			type: "button",
			class: V(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : q(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [z(t, { name: "moon" }), l.value ? (U(), I("span", qr, K(m(c.value)), 1)) : F("", !0)], 10, Kr), z(Ce, { name: "dropdown" }, {
			default: X(() => [h.value ? (U(), I("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": q(i)("player.sleepTimer")
			}, [(U(), I(M, null, G(o, (e) => L("li", {
				key: e.value,
				class: V(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, K(e.label), 11, Yr)), 64))], 8, Jr)) : F("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Zr = {
	key: 0,
	class: "syncplay-overlay"
}, Qr = { class: "syncplay-overlay__badge" }, $r = { class: "syncplay-overlay__label" }, ei = { class: "syncplay-overlay__status-label" }, ti = { class: "syncplay-overlay__members" }, ni = { class: "syncplay-overlay__member-count" }, ri = { class: "syncplay-overlay__member-list" }, ii = { class: "syncplay-overlay__member-name" }, ai = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, oi = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = a(), i = xe(), o = l(), s = N(() => n.apiBase ?? o.value), c = N(() => i.currentRoom?.name ?? "SyncPlay"), u = N(() => i.onlineMembers.length), d = N(() => i.syncStatus), f = N(() => {
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
		return (e, n) => q(i).isInRoom ? (U(), I("div", Zr, [
			L("div", Qr, [z(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), L("span", $r, "SyncPlay: " + K(c.value), 1)]),
			L("div", { class: V(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [z(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), L("span", ei, K(f.value), 1)], 2),
			L("div", ti, [L("span", ni, [z(t, { name: "user" }), R(" " + K(q(r)("syncplay.members", { count: u.value })), 1)]), L("ul", ri, [(U(!0), I(M, null, G(q(i).onlineMembers.slice(0, 5), (e) => (U(), I("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= L("span", { class: "syncplay-overlay__member-dot" }, null, -1), L("span", ii, K(e.name), 1)]))), 128)), q(i).onlineMembers.length > 5 ? (U(), I("li", ai, " +" + K(q(i).onlineMembers.length - 5) + " more ", 1)) : F("", !0)])]),
			z(w, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: X(() => [R(K(q(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), si = {
	key: 0,
	class: "syncplay-controls"
}, ci = ["aria-label"], li = { class: "syncplay-controls__wait-label" }, ui = { class: "syncplay-controls__transport" }, di = ["aria-label"], fi = ["aria-label"], pi = ["aria-label"], mi = { class: "syncplay-controls__status-label" }, hi = 10, gi = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let r = e, i = n, { t: o } = a(), s = xe(), c = l(), u = N(() => r.apiBase ?? c.value), d = W(!1), f = N(() => d.value || s.syncStatus === "re-syncing");
		async function p() {
			if (s.isInRoom) try {
				await s.sendCommand(u.value, "play"), i("play");
			} catch (e) {
				console.error("[SyncPlay] Failed to send play command:", e);
			}
		}
		async function m() {
			if (s.isInRoom) try {
				await s.sendCommand(u.value, "pause"), i("pause");
			} catch (e) {
				console.error("[SyncPlay] Failed to send pause command:", e);
			}
		}
		async function h() {
			r.isPlaying ? await m() : await p();
		}
		async function g(e) {
			if (s.isInRoom) try {
				await s.sendCommand(u.value, "seek", { position: e }), i("seek", e);
			} catch (e) {
				console.error("[SyncPlay] Failed to send seek command:", e);
			}
		}
		async function _() {
			await g(Math.max(0, r.position - hi));
		}
		async function v() {
			await g(Math.min(r.duration, r.position + hi));
		}
		return Y(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1);
		}), (n, r) => q(s).isInRoom ? (U(), I("div", si, [
			f.value ? (U(), I("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": q(o)("syncplay.waitingForMembers")
			}, [z(t, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), L("span", li, K(q(o)("syncplay.waitingForMembers")), 1)], 8, ci)) : F("", !0),
			L("div", ui, [
				L("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": q(o)("syncplay.rewind"),
					onClick: _
				}, [z(t, { name: "rewind" })], 8, di),
				L("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? q(o)("syncplay.pauseAll") : q(o)("syncplay.playAll"),
					onClick: h
				}, [z(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, fi),
				L("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": q(o)("syncplay.fastForward"),
					onClick: v
				}, [z(t, { name: "forward" })], 8, pi)
			]),
			L("div", { class: V(["syncplay-controls__status", `syncplay-controls__status--${q(s).syncStatus}`]) }, [z(t, {
				name: q(s).syncStatus === "synced" ? "check" : q(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), L("span", mi, K(q(s).syncStatus === "synced" ? q(o)("syncplay.synced") : q(s).syncStatus === "outOfSync" ? q(o)("syncplay.outOfSync") : q(o)("syncplay.reSyncing")), 1)], 2)
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-3df5b737"]]);
//#endregion
//#region src/utils/subtitleSrc.ts
function _i(e, t) {
	return String(d(e, t));
}
function vi(e, t) {
	let n = !1, r = t.map((t) => {
		let r = _i(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
//#endregion
//#region src/components/Player.vue?vue&type=script&setup=true&lang.ts
var yi = { class: "player__stage" }, bi = ["src", "poster"], xi = [
	"src",
	"srclang",
	"label"
], Si = { class: "player__meta" }, Ci = ["aria-label"], wi = { class: "player__meta-text" }, Ti = { class: "player__eyebrow" }, Ei = { class: "player__title" }, Di = { class: "player__sub numeric" }, Oi = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, ki = {
	key: 0,
	class: "player__center"
}, Ai = ["aria-label"], ji = { class: "player__btnrow" }, Mi = ["aria-label"], Ni = ["aria-label"], Pi = ["aria-label"], Fi = { class: "player__time numeric" }, Ii = ["aria-label", "aria-pressed"], Li = ["title"], Ri = ["aria-label"], zi = ["aria-label"], Bi = ["aria-label", "aria-pressed"], Vi = ["aria-label", "aria-pressed"], Hi = ["aria-label"], Ui = { class: "similar-modal" }, Wi = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Gi = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, Ki = { class: "similar-modal__state-title" }, qi = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, Ji = {
	key: 3,
	class: "similar-modal__results"
}, Yi = { class: "similar-modal__poster" }, Xi = ["src", "alt"], Zi = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Qi = { class: "similar-modal__result-body" }, $i = { class: "similar-modal__result-title" }, ea = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, ta = { key: 0 }, na = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		resolvePendingMedia: { type: Function },
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
		"play-episode",
		"pending-media"
	],
	setup(e, { emit: n }) {
		let { imgSrc: r } = f(), o = e, c = n, l = p(), u = i(), { t: d } = a(), v = xe(), y = h(), b = N(() => y.isFavorite(o.media.id)), x = N(() => y.likeLevel(o.media.id));
		function S() {
			y.toggleFavorite(o.media.id, Te());
		}
		function ee(e) {
			y.setLike(o.media.id, e, Te());
		}
		let w = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], T = W(null), E = W(null), D = W(null), O = W(!0), ne = W(!1), k = W(!1), A = W(!1), re = W(!1), ie = W(!1), ae = W(!1), oe = W(null), se = W(null), ce = W(!1), le = m(), de = W(!1);
		function fe(e) {
			le.success(d("syncplay.joinedRoom", { name: e.name }));
		}
		let pe = N(() => re.value ? 1.35 : 1), j = W(Mn(o.streamUrl, o.media.path)), he = N(() => Un(o.media.streams)), _e = 0;
		async function ve() {
			let e = ++_e;
			if (j.value) return;
			let t = await Yn([o.streamUrl, o.media.path], o.playbackAudioTracks ?? [], he.value);
			e === _e && (!t || j.value || (j.value = !0, Le(T.value?.currentTime ?? 0)));
		}
		Y([() => o.playbackAudioTracks, he], () => {
			ve();
		}, { immediate: !0 });
		let ye = we("phlixConfig", null), Ce = we("resumeReporter", null), B = !1;
		function Te() {
			return ye?.apiBase ?? "";
		}
		let H = Ze({
			apiBase: () => o.apiBase ?? "",
			hlsConfig: ye?.playerHlsConfig
		}), ke = tt({ apiBase: () => o.apiBase ?? "" }), J = null;
		function je(e) {
			J !== null && clearTimeout(J), J = setTimeout(() => {
				J = null, ke.fetch(e);
			}, 0);
		}
		let Me = N(() => o.thumbnailAt ?? ke.thumbnailAt), Ne = N(() => j.value ? void 0 : o.streamUrl), Pe = N(() => j.value && H.state.value !== "ready"), Fe = N(() => j.value && (H.state.value === "preparing" || H.state.value === "idle")), Ie = N(() => j.value && H.state.value === "error");
		function Le(e = 0) {
			let t = T.value;
			t && H.start(t, o.media.id, void 0, e);
		}
		function ze(e) {
			if (l.quality === "original" && e !== "auto") {
				H.loadVariantPlaylist(ht);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				H.loadVariantPlaylist(e);
				return;
			}
			H.setLevel(e);
		}
		let Q = !1;
		function Be() {
			u.defaultQuality = mt;
		}
		function Ve() {
			let e = H.levels.value;
			if (e.length === 0) return !1;
			let t = u.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = H.variants.value;
				if (!t || t.length === 0) return !1;
				if (St(e, t)) H.loadVariantPlaylist(ht);
				else {
					let t = xt(e);
					t >= 0 && H.setNextLevel(t), Be();
				}
				return !0;
			}
			let n = yt(e, t);
			return n >= 0 ? H.setNextLevel(n) : Be(), !0;
		}
		Y(() => H.levels.value, (e) => {
			Q || e.length === 0 || Ve() && (Q = !0);
		}), Y(() => H.variants.value, (e) => {
			Q || !e?.length || Ee(() => {
				Q || Ve() && (Q = !0);
			});
		}, { deep: !0 });
		let He = W(l.resumePositionFor(o.media.id) ?? 0), Ue = W(!j.value && He.value > 0), We = null, Ge = W(!1), Ke = W(8), qe, Je = W(null), Ye = W(0), Xe = W(!1), Qe = W([]), $e = W(!1), et = W(null);
		function nt(e, t) {
			Je.value = e, Ye.value = t, Qe.value = [], et.value = null, Xe.value = !0, st(e, t);
		}
		let rt = null, it = null, at = null;
		function ot() {
			let e = o.apiBase ?? "";
			return (it === null || at !== e) && (it = new s({ baseUrl: e }), at = e), it;
		}
		async function st(e, t) {
			rt?.abort(), rt = new AbortController(), $e.value = !0, et.value = null;
			try {
				let n = await ot().searchByMarker(e, t, 30, 20, rt.signal);
				Qe.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				et.value = "Failed to load similar media. Please try again.", Qe.value = [];
			} finally {
				$e.value = !1;
			}
		}
		function ct() {
			rt?.abort(), Xe.value = !1, Qe.value = [], et.value = null, Je.value = null;
		}
		let lt = N(() => l.upNext);
		function dt() {
			j.value = Mn(o.streamUrl, o.media.path), ve(), He.value = l.resumePositionFor(o.media.id) ?? 0, Ue.value = !j.value && He.value > 0, We = null, cn = !1, Jt = !1, Gt.value = [], Wt.value = !1, Yt = !1, Lt.value = -1, nn = null, Q = !1, B = !1, bt(), Ge.value = !1, H.reset(), T.value && (T.value.currentTime = 0), j.value && Le(), je(o.media.id);
		}
		function gt(e) {
			let t = T.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : We = Math.max(0, e));
		}
		function _t() {
			gt(He.value), Ue.value = !1, T.value?.play()?.catch(() => {});
		}
		function vt() {
			We = null, gt(0), l.clearResume(o.media.id), Ue.value = !1, T.value?.play()?.catch(() => {});
		}
		function bt() {
			qe &&= (clearInterval(qe), void 0);
		}
		function Ct() {
			Ke.value = 8, bt(), qe = setInterval(() => {
				--Ke.value, Ke.value <= 0 && (bt(), Dt());
			}, 1e3);
		}
		function Et() {
			B || (B = !0, Ce?.finish()), Kn(), O.value = !0, l.upNext && (Ge.value = !0, u.autoplay && Ct());
		}
		function Dt() {
			bt(), Ge.value = !1;
			let e = l.next(o.streamUrlFor);
			e && c("play-next", e);
		}
		function Ot() {
			bt(), Ge.value = !1;
		}
		function kt() {
			if (j.value) return;
			let e = T.value, t = Pn(e) && (e?.currentTime ?? 0) === 0;
			(Nn(e) || t) && (j.value = !0, Le(e?.currentTime ?? 0));
		}
		let At = W([]), jt = W([]), Mt = W(-1), Nt = W(!1), Pt = N(() => H.state.value === "ready" && H.audioTracks.value.length > 0), Ft = N(() => H.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), It = N(() => (o.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Lt = W(-1), Rt = N(() => !Pt.value && !j.value && jt.value.length === 0 && It.value.length > 1), zt = N(() => Pt.value ? Ft.value : Rt.value ? It.value : jt.value), Bt = N(() => {
			if (Pt.value) return H.currentAudioTrack.value;
			if (Rt.value) {
				if (Lt.value >= 0) return Lt.value;
				let e = (o.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : o.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Mt.value;
		}), Vt = W(!1), Ht = l.subtitleLang, Ut = N(() => {
			let e = o.apiBase ?? "", t = j.value ? H.subtitleTracks.value : vi(e, o.playbackSubtitleTracks ?? []);
			if (Gt.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = vi(e, Gt.value), i = new Set(t.map(n)), a = r.filter((e) => !i.has(n(e)));
			return a.length === 0 ? t : [...t, ...a];
		}), Wt = W(!1), Gt = W([]), Kt = N(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(u.defaultSubtitleLang), t(u.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function qt(e) {
			Gt.value.some((t) => t.url === e.url) || (Gt.value = [...Gt.value, e]);
		}
		let Jt = !1, Yt = !1;
		function Xt() {
			if (Jt) return;
			if (u.subtitlePreferenceSet) {
				Jt = !0;
				return;
			}
			let e = Ut.value.find((e) => e.default);
			if (!e) return;
			let t = At.value.find((t) => t.language === (e.language || e.label));
			t && (l.setSubtitle(t.language), Ht = t.language, Jt = !0);
		}
		function Zt() {
			if (Yt) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = zt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Bt.value;
			r >= 0 && r < t.length || (rn(n), Yt = !0);
		}
		let Qt = N(() => At.value.some((e) => e.language === l.subtitleLang));
		function $t() {
			let e = T.value;
			At.value = be(e), jt.value = me(e), Mt.value = ue(e), Xt(), Zt();
		}
		function tn() {
			if (Qt.value) Ht = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = Ht && At.value.some((e) => e.language === Ht) ? Ht : At.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			c("captions");
		}
		let nn = null;
		function rn(e) {
			if (Pt.value) H.setAudioTrack(e);
			else if (Rt.value) {
				if (e === Bt.value) return;
				Lt.value = e, nn = e, j.value = !0, Le(T.value?.currentTime ?? 0);
			} else ge(T.value, e), Mt.value = e;
		}
		Y(Pt, (e) => {
			if (!e || nn === null) return;
			let t = nn;
			nn = null, t >= 0 && t < H.audioTracks.value.length && H.setAudioTrack(t);
		}), Y(Ut, () => {
			Ee(() => $t());
		}, { deep: !0 });
		let an = null, on, sn = N(() => {
			let e = [];
			o.media.year && e.push({ text: String(o.media.year) }), o.media.rating && e.push({
				text: o.media.rating,
				cert: !0
			}), o.media.runtime && e.push({ text: `${o.media.runtime}m` });
			let t = o.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), cn = !1;
		function ln() {
			if (!o.autoplay || cn || Ue.value || Pe.value) return;
			let e = T.value;
			if (!e || !e.paused) return;
			cn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, l.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function un() {
			ln();
		}
		function dn() {
			o.prevEpisode && c("play-episode", o.prevEpisode);
		}
		function fn() {
			o.nextEpisode && c("play-episode", o.nextEpisode);
		}
		function pn() {
			let e = T.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function mn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function hn() {
			l.play(), l.setMediaPositionState();
		}
		function gn() {
			l.pause(), l.setMediaPositionState();
		}
		function vn() {
			let e = T.value;
			e && (l.updateProgress(e.currentTime, e.duration, mn(e)), v.isInRoom && v.updateLocalPosition(e.currentTime));
		}
		function yn() {
			let e = T.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, We !== null && (e.currentTime = e.duration ? Math.min(e.duration, We) : We, We = null), l.updateProgress(e.currentTime, e.duration, mn(e)), l.setMediaPositionState(), $t());
		}
		function bn() {
			let e = T.value;
			e && l.updateProgress(e.currentTime, e.duration, mn(e));
		}
		function xn() {
			let e = T.value;
			e && (Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function Sn() {
			let e = T.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate), l.setMediaPositionState();
		}
		function Cn() {
			l.setMediaPositionState();
		}
		function Tn() {
			l.setMediaPositionState();
		}
		function $(e) {
			let t = T.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function En() {
			k.value = !0, Jn();
		}
		function Dn() {
			k.value = !1, Jn();
		}
		function kn(e) {
			let t = w.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(w[e] - l.rate) ? n : e, 0), n = w[Math.min(w.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function An() {
			if (!o.markers) return;
			let e = l.position, t = o.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function jn() {
			if (!o.markers) return;
			let e = l.position, t = o.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Fn() {
			oe.value?.toggleOpen();
		}
		let In = null;
		function Ln() {
			let e = T.value;
			if (!e) {
				l.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), l.pause();
				return;
			}
			In !== null && (clearInterval(In), In = null);
			let t = .05;
			In = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(In), In = null, e.volume = 0, e.pause(), l.pause());
			}, 50);
		}
		_({
			playPause: pn,
			seekBy: (e) => $(l.position + e),
			frameStep: (e) => {
				l.playing || $(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: Rn,
			toggleFullscreen: Bn,
			toggleCaptions: tn,
			toggleTheater: zn,
			togglePip: Hn,
			skipIntro: An,
			skipOutro: jn,
			sleepTimer: Fn,
			seekToPercent: (e) => $(e * l.duration),
			speedStep: kn,
			toggleHelp: () => {
				A.value = !A.value;
			},
			toggleQuality: () => {
				j.value ? (ce.value = !ce.value, se.value?.toggleMenu?.()) : le.show({
					message: d("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !A.value && !Nt.value && !Vt.value });
		function Rn() {
			l.toggleMute();
		}
		function zn() {
			re.value = !re.value, c("theater", re.value);
		}
		Y(() => l.muted, (e) => {
			let t = T.value;
			t && t.muted !== e && (t.muted = e);
		}), Y(() => l.volume, (e) => {
			let t = T.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Y(() => l.rate, (e) => {
			let t = T.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Y(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? gt(e.value) : e.type === "seekBy" && gt(l.position + e.value));
		});
		function Bn() {
			if (typeof document > "u") return;
			let e = E.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function Vn() {
			ne.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Hn() {
			let e = T.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			c("pip");
		}
		function Wn() {
			ie.value = !0;
		}
		function Gn() {
			ie.value = !1;
		}
		function Kn() {
			on &&= (clearTimeout(on), void 0);
		}
		function qn() {
			Kn(), !(!l.playing || k.value) && (on = setTimeout(() => {
				l.playing && !k.value && (O.value = !1);
			}, o.idleTimeout ?? 3e3));
		}
		function Jn() {
			O.value = !0, qn();
		}
		Y(() => l.playing, (e) => {
			e ? (Ue.value = !1, Ot(), qn()) : (Kn(), O.value = !0);
		});
		let Xn = null;
		Oe(() => {
			l.setCurrent(o.media, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), y.hydrate(o.media), typeof document < "u" && (document.addEventListener("fullscreenchange", Vn), ae.value = document.pictureInPictureEnabled === !0), Xn = l.bindMediaSession({
				onPlay: () => void T.value?.play()?.catch(() => {}),
				onPause: () => T.value?.pause(),
				onSeek: (e) => $(e)
			}), an = T.value?.textTracks ?? null, an?.addEventListener?.("addtrack", $t), an?.addEventListener?.("removetrack", $t), $t(), j.value && Le(), je(o.media.id);
		}), Y(() => o.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), dt();
		}), Y(() => o.media?.id, () => {
			y.hydrate(o.media);
		}), Y(() => v.currentSession, (e) => {
			e && (e.state === "playing" ? (T.value?.play(), l.play()) : e.state === "paused" && (T.value?.pause(), l.pause()), v.updateLocalPosition(l.position), Math.abs(v.driftAmount) > 2 && gt(e.playbackPosition));
		});
		let Zn = null;
		return Y(() => v.pendingPlayMedia, async (e) => {
			if (!e) return;
			let t = null;
			if (o.resolvePendingMedia) {
				try {
					t = await o.resolvePendingMedia({
						mediaId: e.mediaId,
						title: e.title
					});
				} catch {
					t = null;
				}
				if (v.pendingPlayMedia !== e) return;
			}
			if (t) {
				l.setCurrent(t, {
					resetPosition: !0,
					streamUrl: o.streamUrlFor?.(t) ?? ""
				}), T.value?.play(), l.play(), v.consumePendingPlayMedia(), Zn = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			Zn !== n && (Zn = n, c("pending-media", e.mediaId, e.title));
		}), De(() => {
			Kn(), bt(), H.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", Vn), Xn?.(), an?.removeEventListener?.("addtrack", $t), an?.removeEventListener?.("removetrack", $t), In !== null && (clearInterval(In), In = null), J !== null && (clearTimeout(J), J = null);
		}), (n, i) => (U(), I("div", {
			ref_key: "containerRef",
			ref: E,
			class: V(["player", {
				"is-chrome-hidden": !O.value,
				"is-theater": re.value
			}]),
			onPointermove: Jn,
			onPointerdown: Jn,
			onFocusin: Jn
		}, [z(wn, {
			video: T.value,
			enabled: q(u).atmosphere,
			playing: q(l).playing,
			"reduced-motion": q(u).effectiveReducedMotion,
			intensity: pe.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), L("div", yi, [
			L("video", {
				ref_key: "videoRef",
				ref: T,
				class: "player__video",
				src: Ne.value,
				poster: q(r)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: hn,
				onPause: gn,
				onTimeupdate: vn,
				onLoadedmetadata: yn,
				onCanplay: un,
				onProgress: bn,
				onVolumechange: xn,
				onRatechange: Sn,
				onSeeked: Cn,
				onDurationchange: Tn,
				onEnded: Et,
				onError: kt,
				onEnterpictureinpicture: Wn,
				onLeavepictureinpicture: Gn,
				onClick: pn
			}, [(U(!0), I(M, null, G(Ut.value, (e) => (U(), I("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, xi))), 128))], 40, bi),
			i[20] ||= L("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[21] ||= L("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			L("div", Si, [L("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": q(d)("player.back"),
				onClick: i[0] ||= Ae((e) => c("back"), ["stop"])
			}, [z(t, { name: "arrow-left" })], 8, Ci), L("div", wi, [
				L("p", Ti, K(q(d)("player.nowPlaying")), 1),
				L("h2", Ei, K(e.media.name), 1),
				L("div", Di, [(U(!0), I(M, null, G(sn.value, (e, t) => (U(), I(M, { key: t }, [t > 0 && !e.cert ? (U(), I("span", Oi, "·")) : F("", !0), L("span", { class: V({ player__cert: e.cert }) }, K(e.text), 3)], 64))), 128))])
			])]),
			Pe.value ? F("", !0) : (U(), I("div", ki, [L("button", {
				type: "button",
				class: V(["player__bigplay", { "is-playing": q(l).playing }]),
				"aria-label": q(l).playing ? q(d)("player.pause") : q(d)("player.play"),
				onClick: Ae(pn, ["stop"])
			}, [z(t, { name: q(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Ai)])),
			z(Tt, {
				video: T.value,
				language: q(l).subtitleLang,
				"style-config": q(u).captionStyle,
				lifted: O.value,
				"controls-root": D.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Pe.value ? F("", !0) : (U(), I("div", {
				key: 1,
				ref_key: "controlsRef",
				ref: D,
				class: "player__controls",
				onClick: i[7] ||= Ae(() => {}, ["stop"])
			}, [
				z(Re, {
					position: q(l).position,
					duration: q(l).duration,
					buffered: q(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": Me.value,
					onSeek: $,
					onScrubStart: En,
					onScrubEnd: Dn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				q(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (U(), P(Gr, {
					key: 0,
					position: q(l).position,
					duration: q(l).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: nt
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : F("", !0),
				L("div", ji, [
					e.prevEpisode ? (U(), I("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": q(d)("player.previousEpisode"),
						onClick: dn
					}, [z(t, { name: "skip-back" })], 8, Mi)) : F("", !0),
					L("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": q(l).playing ? q(d)("player.pause") : q(d)("player.play"),
						onClick: pn
					}, [z(t, { name: q(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Ni),
					e.nextEpisode ? (U(), I("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": q(d)("player.nextEpisode"),
						onClick: fn
					}, [z(t, { name: "skip-forward" })], 8, Pi)) : F("", !0),
					L("span", Fi, [
						R(K(q(Z)(q(l).position)), 1),
						i[16] ||= L("span", { class: "player__sep" }, " / ", -1),
						R(K(q(Z)(q(l).duration)), 1)
					]),
					i[17] ||= L("span", { class: "player__grow" }, null, -1),
					L("button", {
						type: "button",
						class: V(["player__iconbtn player__favorite", { "is-on": b.value }]),
						"aria-label": b.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": b.value ? "true" : "false",
						onClick: S
					}, [z(t, { name: b.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Ii),
					z(g, {
						level: x.value,
						onCycle: ee
					}, null, 8, ["level"]),
					z(ft),
					z(pt),
					z(wt, {
						ref_key: "qualityMenuRef",
						ref: se,
						open: ce.value,
						"onUpdate:open": i[1] ||= (e) => ce.value = e,
						levels: q(H).levels.value,
						variants: q(H).variants.value,
						"current-level": q(H).currentLevel.value,
						"auto-enabled": q(H).autoEnabled.value,
						"active-height": q(H).activeLevelHeight.value,
						onSelect: ze
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					j.value ? F("", !0) : (U(), I("span", {
						key: 2,
						class: "player__direct-badge",
						title: q(d)("player.qualityDirectStream")
					}, K(q(d)("player.directStream")), 9, Li)),
					z(en, {
						open: Nt.value,
						"onUpdate:open": i[2] ||= (e) => Nt.value = e,
						tracks: At.value,
						"audio-tracks": zt.value,
						"active-audio": Bt.value,
						onSelectAudio: rn,
						onAddSubtitles: i[3] ||= (e) => Wt.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					z(Lr, {
						open: Vt.value,
						"onUpdate:open": i[4] ||= (e) => Vt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					z(Xr, {
						ref_key: "sleepTimerRef",
						ref: oe,
						"on-expire": Ln
					}, null, 512),
					L("button", {
						type: "button",
						class: V(["player__iconbtn player__syncplay", { "is-on": q(v).isInRoom }]),
						"aria-label": q(v).isInRoom ? q(d)("syncplay.inRoom") : q(d)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[5] ||= (e) => de.value = !0
					}, [z(t, { name: "user" })], 10, Ri),
					L("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": q(d)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[6] ||= (e) => A.value = !0
					}, [z(t, { name: "info" })], 8, zi),
					ae.value ? (U(), I("button", {
						key: 3,
						type: "button",
						class: V(["player__iconbtn", { "is-on": ie.value }]),
						"aria-label": ie.value ? q(d)("player.exitPip") : q(d)("player.pip"),
						"aria-pressed": ie.value,
						onClick: Hn
					}, [z(t, { name: "pip" })], 10, Bi)) : F("", !0),
					L("button", {
						type: "button",
						class: V(["player__iconbtn", { "is-on": re.value }]),
						"aria-label": re.value ? q(d)("player.exitTheater") : q(d)("player.theater"),
						"aria-pressed": re.value,
						onClick: zn
					}, [z(t, { name: "theater" })], 10, Vi),
					L("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? q(d)("player.exitFullscreen") : q(d)("player.fullscreen"),
						onClick: Bn
					}, [z(t, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Hi)
				])
			], 512)),
			Pe.value ? F("", !0) : (U(), P(vr, {
				key: 2,
				position: q(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Pe.value ? F("", !0) : (U(), P(wr, {
				key: 3,
				position: q(l).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Ue.value && !Pe.value ? (U(), P(On, {
				key: 4,
				seconds: He.value,
				onResume: _t,
				onRestart: vt
			}, null, 8, ["seconds"])) : F("", !0),
			Ge.value && lt.value && !Pe.value ? (U(), P(or, {
				key: 5,
				media: lt.value,
				remaining: Ke.value,
				total: q(8),
				counting: q(u).autoplay,
				onPlayNow: Dt,
				onCancel: Ot
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : F("", !0),
			z(te, {
				modelValue: Xe.value,
				"onUpdate:modelValue": i[8] ||= (e) => Xe.value = e,
				title: `Similar ${Je.value ?? "marker"}s`,
				size: "lg",
				onClose: ct
			}, {
				default: X(() => [L("div", Ui, [$e.value ? (U(), I("div", Wi, [z(C, { label: "Finding similar media" })])) : et.value ? (U(), I("div", Gi, [z(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), L("p", Ki, K(et.value), 1)])) : !$e.value && Qe.value.length === 0 ? (U(), I("div", qi, [
					z(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[18] ||= L("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[19] ||= L("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (U(), I("ul", Ji, [(U(!0), I(M, null, G(Qe.value, (e) => (U(), I("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [L("div", Yi, [e.poster_url ? (U(), I("img", {
					key: 0,
					src: q(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Xi)) : (U(), I("div", Zi, [z(t, { name: "film" })]))]), L("div", Qi, [L("p", $i, K(e.name), 1), e.year ? (U(), I("p", ea, [R(K(e.year) + " ", 1), e.runtime ? (U(), I("span", ta, " · " + K(e.runtime) + "m", 1)) : F("", !0)])) : F("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Fe.value ? (U(), P(_r, {
				key: 6,
				title: e.media.name,
				progress: q(H).progress.value,
				onBack: i[9] ||= (e) => c("back")
			}, null, 8, ["title", "progress"])) : F("", !0),
			Ie.value ? (U(), P(dr, {
				key: 7,
				title: e.media.name,
				onBack: i[10] ||= (e) => c("back")
			}, null, 8, ["title"])) : F("", !0),
			q(v).isInRoom ? (U(), P(gi, {
				key: 8,
				position: q(l).position,
				duration: q(l).duration,
				"is-playing": q(l).playing,
				onSeek: $,
				onPlay: i[11] ||= (e) => void T.value?.play(),
				onPause: i[12] ||= (e) => void T.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : F("", !0),
			q(v).isInRoom ? (U(), P(oi, { key: 9 })) : F("", !0),
			z(Se, {
				modelValue: de.value,
				"onUpdate:modelValue": i[13] ||= (e) => de.value = e,
				onJoined: fe
			}, null, 8, ["modelValue"]),
			z(ut, {
				open: A.value,
				onClose: i[14] ||= (e) => A.value = !1
			}, null, 8, ["open"]),
			z(_n, {
				open: Wt.value,
				"onUpdate:open": i[15] ||= (e) => Wt.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": Kt.value,
				onAdded: qt
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-c2fd38f3"]]), ra = { class: "player-page__stage" }, ia = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, aa = { class: "player-page__blocking-error" }, oa = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = l(), { imgSrc: r } = f(), i = u(), a = Me(), o = Ne(), d = p(), m = h(), g = y(), _ = W(null), v = W(""), b = W([]), x = W(null), S = W(null), C = W([]), T = W([]), E = W(!0), D = W(null), O = W(!1), ue = W(null), de = W(!1), fe = W(null), pe = W(null), j = N(() => String(a.params.id ?? ""));
		ee(() => _.value?.name);
		let me = N(() => {
			let e = r(_.value?.poster_url);
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), he = null, ge = !1, _e = 0;
		function ve(e) {
			return ge || e.generation !== _e;
		}
		function ye(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function be(e) {
			let t = i.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function xe(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function Se(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function M(e, t, r) {
			let i = () => ve(r), a = t.genres?.[0];
			if (!a) {
				d.setQueue([]);
				return;
			}
			try {
				let o = A(n.value, {
					genres: [a],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, r.controller?.signal);
				if (i()) return;
				d.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || ye(e)) return;
				d.setQueue([]);
			}
		}
		async function Ce(e, t, r) {
			let i = A(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function B(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function we(e, t) {
			fe.value = ae(e, t), pe.value = oe(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && d.setQueue(r);
		}
		function Te(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function Ee(e, n, r) {
			if (fe.value = null, pe.value = null, !Se(n)) return;
			let i = Te(n.id);
			if (i) {
				we(i, n.id);
				return;
			}
			let a = () => ve(r);
			try {
				let i = await B(e, n, r.controller?.signal);
				if (a()) return;
				let o = await Ce(e, i.id, r.controller?.signal);
				if (a()) return;
				if (ie(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => Ce(e, t.id, r.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = re(o);
				s.length && t.set(i.id, s), we(s, n.id);
			} catch (e) {
				if (a() || ye(e)) return;
				fe.value = null, pe.value = null;
			}
		}
		async function G() {
			let e = j.value;
			he?.abort(), he = typeof AbortController < "u" ? new AbortController() : null, _e += 1;
			let t = {
				generation: _e,
				controller: he
			};
			if (E.value = !0, D.value = null, b.value = [], x.value = null, S.value = null, C.value = [], T.value = [], fe.value = null, pe.value = null, d.hideMiniPlayer(), !e) {
				D.value = "No media id provided", E.value = !1;
				return;
			}
			let r = new s({ baseUrl: n.value });
			r.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, t.controller?.signal).then((e) => {
				ve(t) || (b.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), x.value = xe(e?.intro_marker), S.value = xe(e?.outro_marker), C.value = Fn(e?.audio_tracks), T.value = He(e?.subtitle_tracks));
			}).catch(() => null);
			let i = se(e), a = Date.now();
			if (i && ce(i, a)) {
				ke(r, i.item, t);
				return;
			}
			let o = null;
			try {
				o = (await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t.controller?.signal)).item;
			} catch (e) {
				if (ve(t) || ye(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						ue.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", de.value = !0, E.value = !1;
						return;
					}
				}
				if (i) {
					ke(r, i.item, t);
					return;
				}
				D.value = e instanceof Error ? e.message : "Failed to load media", E.value = !1;
				return;
			}
			if (!ve(t)) {
				if (!o) {
					if (i) {
						ke(r, i.item, t);
						return;
					}
					D.value = "Failed to load media item", E.value = !1;
					return;
				}
				le(e, o, a), ke(r, o, t);
			}
		}
		async function ke(e, t, n) {
			_.value = t, m.hydrate(t), v.value = be(t), E.value = !1, !(Se(t) && (await Ee(e, t, n), ve(n) || pe.value)) && M(e, t, n);
		}
		Oe(G), Y(j, G), je(() => {
			d.current && d.streamUrl && d.showMiniPlayer();
		}), De(() => {
			ge = !0, he?.abort(), he = null, g.reset();
		});
		function J() {
			o?.back();
		}
		function Ae(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Z(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Pe(e) {
			O.value = e, g.setTheaterActive(e);
		}
		function Fe() {
			de.value = !1, J();
		}
		return (e, t) => (U(), I("div", { class: V(["player-page", { "is-theater": O.value }]) }, [
			me.value && !E.value && !D.value ? (U(), I("div", {
				key: 0,
				class: "player-page__ambient",
				style: H(me.value),
				"aria-hidden": "true"
			}, null, 4)) : F("", !0),
			L("div", ra, [E.value ? (U(), I("div", ia, [z(ne, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : D.value ? (U(), P(k, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: D.value
			}, {
				actions: X(() => [z(w, {
					variant: "solid",
					onClick: G
				}, {
					default: X(() => [...t[1] ||= [R("Retry", -1)]]),
					_: 1
				}), z(w, {
					variant: "ghost",
					onClick: J
				}, {
					default: X(() => [...t[2] ||= [R("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : _.value ? (U(), P(na, {
				key: 2,
				media: _.value,
				"stream-url": v.value,
				"stream-url-for": be,
				"api-base": q(n),
				chapters: b.value,
				"intro-marker": x.value,
				"outro-marker": S.value,
				"playback-audio-tracks": C.value,
				"playback-subtitle-tracks": T.value,
				"prev-episode": fe.value,
				"next-episode": pe.value,
				autoplay: !0,
				onBack: J,
				onPlayNext: Ae,
				onPlayEpisode: Z,
				onTheater: Pe
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
			z(te, {
				modelValue: de.value,
				"onUpdate:modelValue": t[0] ||= (e) => de.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: X(() => [z(w, {
					variant: "solid",
					onClick: Fe
				}, {
					default: X(() => [...t[3] ||= [R("OK", -1)]]),
					_: 1
				})]),
				default: X(() => [L("p", aa, K(ue.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-7d3bf33d"]]);
//#endregion
export { oa as default };

//# sourceMappingURL=PlayerPage-CPkqJDig.js.map