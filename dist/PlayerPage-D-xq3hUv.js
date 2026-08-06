import { n as e, t } from "./Icon-CkTBN_k5.js";
import { t as n } from "./IconButton-3ZuilWzd.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { a as i } from "./usePreferencesStore-CFPikE8Z.js";
import { t as a } from "./useMessages-nO4j4SSL.js";
import { l as o, t as s, u as c } from "./client-COHWZ2KC.js";
import { n as l, r as u } from "./useApiBase-CV_r-Kk4.js";
import { t as d } from "./useImageSrc-KnN1T9Ga.js";
import { i as f } from "./usePlayerStore-DhgapSoa.js";
import { t as p } from "./useToastStore-BDoKlU6N.js";
import { n as m, t as h } from "./ThumbRating-DZt3qThy.js";
import { a as g, n as _, o as v, r as y, s as b, t as x } from "./shortcuts-Ck2yBFUB.js";
import { t as S } from "./Spinner-C27IqGQo.js";
import { i as C } from "./usePageTitle-BO3GGF3M.js";
import { t as w } from "./Button-Cw8Wl4QR.js";
import { t as T } from "./Badge-D1_MN41Y.js";
import { t as E } from "./Slider-tWx3oJhB.js";
import { t as D } from "./Chip-4LSLVIhi.js";
import { t as O } from "./Select-C5dvTnnx.js";
import { t as k } from "./Modal-Nn1mtFl3.js";
import { t as ee } from "./Skeleton-C3OpJbf1.js";
import { t as te } from "./EmptyState-CwWtkhEJ.js";
import { n as A } from "./media-query-DKjhlX8r.js";
import { n as j, o as ne, r as re, t as ie } from "./episode-order-C2yqgMeX.js";
import { n as ae, r as oe, t as se } from "./useMediaItemCache-BKCJnCbr.js";
import { a as ce, c as le, d as ue, f as M, i as de, l as fe, n as pe, o as me, r as he, s as ge, t as _e, u as ve } from "./captions-DoP7ce5A.js";
import { n as ye, t as be } from "./SyncPlayModal-DYmCHDWU.js";
import { Fragment as N, Transition as xe, computed as P, createBlock as F, createCommentVNode as I, createElementBlock as L, createElementVNode as R, createTextVNode as z, createVNode as B, defineComponent as V, inject as Se, mergeModels as H, nextTick as Ce, normalizeClass as U, normalizeStyle as W, onBeforeUnmount as we, onMounted as Te, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as Y, unref as X, useModel as Ee, watch as Z, withCtx as Q, withModifiers as De } from "vue";
import { onBeforeRouteLeave as Oe, useRoute as ke, useRouter as Ae } from "vue-router";
//#region src/components/player/format-time.ts
function je(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Me = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Ne = { class: "scrubber__track" }, Pe = ["title"], Fe = { class: "scrubber__time numeric" }, Ie = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { t: r } = a(), i = e, o = n, s = K(null), c = K(!1), l = K(!1), u = K(0), d = K(0), f = (e) => Math.min(1, Math.max(0, e)), p = P(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = P(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = P(() => (c.value || l.value) && i.duration > 0), g = P(() => c.value ? u.value : d.value), _ = P(() => g.value * i.duration), v = P(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = P(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = P(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = P(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
		function w(e) {
			let t = S(e);
			d.value = t, c.value && (u.value = t);
		}
		function T(e) {
			if (c.value) {
				c.value = !1;
				try {
					s.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				o("seek", u.value * i.duration), o("scrub-end");
			}
		}
		function E() {
			l.value = !0;
		}
		function D() {
			l.value = !1;
		}
		function O(e) {
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
		}), (t, n) => (G(), L("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": X(je)(e.position),
			"aria-label": X(r)("player.seek"),
			onPointerdown: C,
			onPointermove: w,
			onPointerup: T,
			onPointercancel: T,
			onPointerenter: E,
			onPointerleave: D,
			onKeydown: O
		}, [R("div", Ne, [
			R("div", {
				class: "scrubber__buffered",
				style: W({ transform: `scaleX(${m.value})` })
			}, null, 4),
			R("div", {
				class: "scrubber__played",
				style: W({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(G(!0), L(N, null, q(x.value, (e, t) => (G(), L("span", {
				key: t,
				class: "scrubber__tick",
				style: W({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Pe))), 128)),
			R("div", {
				class: U(["scrubber__head", { "is-dragging": c.value }]),
				style: W({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (G(), L("div", {
			key: 0,
			class: "scrubber__preview",
			style: W({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (G(), L("div", {
			key: 0,
			class: "scrubber__thumb",
			style: W({ backgroundImage: y.value })
		}, null, 4)) : I("", !0), R("span", Fe, J(X(je)(_.value)), 1)], 4)) : I("", !0)], 40, Me));
	}
}), [["__scopeId", "data-v-3d610715"]]), Le = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function $(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Re(e) {
	return e === !0 || e === "true" || e === 1;
}
function ze(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Be(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = $(e.url ?? e.src);
		r !== "" && t.push({
			index: ze(e.index),
			language: $(e.language ?? e.lang ?? e.srclang),
			label: $(e.label),
			default: Re(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Ve(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = ze(e.height);
		r <= 0 || t.push({
			id: $(e.id),
			label: $(e.label),
			height: r,
			width: ze(e.width),
			bitrate: ze(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function He(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function Ue(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function We(e) {
	let t = e ?? {};
	return {
		jobId: $(t.job_id ?? t.jobId),
		masterUrl: $(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: $(t.status, "running"),
		reused: Re(t.reused),
		subtitles: Be(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ve(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ge(e) {
	let t = e ?? {};
	return {
		jobId: $(t.job_id ?? t.jobId),
		status: $(t.status, "running"),
		playlistReady: Re(t.playlist_ready ?? t.playlistReady),
		progress: ze(t.progress),
		masterUrl: $(t.master_url ?? t.masterUrl),
		subtitles: Be(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ve(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ke(e) {
	return e.playlistReady || e.status === "completed";
}
function qe(e) {
	return Le.has(e);
}
function Je(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Ye(e) {
	let t = K("idle"), n = K(0), r = K([]), i = K([]), a = K(-1), o = K(!0), c = K(null), l = K(null), u = K([]), d = K(-1), p = K(null), m = K(null);
	function h(e) {
		if (!k) return;
		i.value = k.levels, a.value = k.getCurrentLevel(), o.value = k.autoLevelEnabled;
		let t = e ?? k.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		c.value = n ? n.height : null;
	}
	function g() {
		i.value = [], a.value = -1, o.value = !0, c.value = null, l.value = null;
	}
	function _(e) {
		k && (u.value = k.audioTracks, d.value = e ?? k.getCurrentAudioTrack());
	}
	function v() {
		u.value = [], d.value = -1;
	}
	function y(e) {
		!e || e.length === 0 || (l.value = e);
	}
	function x(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: Je(n, e.url)
		}));
	}
	let S = e.attach ?? b, C = e.pollIntervalMs ?? 1e3, w = e.maxWaitMs ?? 12e4, T = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), E = Math.max(1, Math.ceil(w / Math.max(1, C))), D = Xe(), O = e.getToken ?? (() => Ze(D)), k = null, ee = null, te = null, A = !1, j = null;
	function ne() {
		return e.client ?? new s({
			baseUrl: e.apiBase(),
			tokenStore: D ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function re(i, a, o, s) {
		ce(), A = !1, j = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = ne(), c = We(await r.post(He(a, o), void 0, j.signal));
			if (A) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			x(c.subtitles), y(c.variants), p.value = c.jobId, m.value = Je(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < E; e++) {
				let e = Ge(await r.get(Ue(c.jobId), void 0, j.signal));
				if (A) return;
				if (n.value = e.progress, x(e.subtitles), y(e.variants), qe(e.status)) throw Error(`transcode ${e.status}`);
				if (Ke(e)) {
					l = !0;
					break;
				}
				if (await T(C), A) return;
			}
			if (!l) throw Error("transcode timed out");
			if (k = await S(i, m.value, {
				getToken: O,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => h(),
				onError: () => {
					A || (t.value = "error");
				}
			}), A) {
				k.destroy(), k = null;
				return;
			}
			ee = k.onLevelSwitched((e) => h(e)), te = k.onAudioTrackSwitched((e) => _(e)), h(), _();
			try {
				let e = f();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			A || (t.value = "error");
		}
	}
	function ie(e) {
		k && (k.setCurrentLevel(e === "auto" ? -1 : e), h());
	}
	function ae(e) {
		k && (k.setNextLevel(e === "auto" ? -1 : e), h());
	}
	function oe(e) {
		k && (k.setAudioTrack(e), _());
	}
	function se(e) {
		if (!k || !m.value) return;
		let t = m.value.replace("master.m3u8", `media_v${e}.m3u8`);
		k.loadSource(t), g();
	}
	function ce() {
		if (A = !0, j &&= (j.abort(), null), ee) {
			try {
				ee();
			} catch {}
			ee = null;
		}
		if (te) {
			try {
				te();
			} catch {}
			te = null;
		}
		if (k) {
			try {
				k.destroy();
			} catch {}
			k = null;
		}
		p.value = null, m.value = null;
	}
	function le() {
		ce(), t.value = "idle", n.value = 0, r.value = [], g(), v();
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
		setLevel: ie,
		setNextLevel: ae,
		setAudioTrack: oe,
		jobId: p,
		masterUrl: m,
		loadVariantPlaylist: se,
		start: re,
		cleanup: ce,
		reset: le
	};
}
function Xe() {
	try {
		return new o();
	} catch {
		return null;
	}
}
function Ze(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var Qe = 10;
function $e(e) {
	let t = K(null), n = K(!1), r = K(null), i = /* @__PURE__ */ new Map();
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
		let i = r.frame, a = i % Qe, s = Math.floor(i / Qe), c = a / 9 * 100, l = s / 5 * 100;
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
var et = ["aria-label"], tt = { class: "shortcuts__head" }, nt = { class: "shortcuts__title" }, rt = { class: "shortcuts__grid" }, it = { class: "shortcuts__keys" }, at = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, ot = {
	key: 1,
	class: "shortcuts__key"
}, st = { class: "shortcuts__label" }, ct = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => y }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = K(null);
		return r(l, Y(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (G(), L("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= De((e) => s("close"), ["self"])
		}, [R("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [R("div", tt, [R("h3", nt, J(X(c)("player.keyboard")), 1), B(n, {
			name: "x",
			label: X(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), R("ul", rt, [(G(!0), L(N, null, q(e.shortcuts, (e) => (G(), L("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [R("span", it, [(G(!0), L(N, null, q(e.keys, (e, n) => (G(), L(N, { key: n }, [e === "–" ? (G(), L("span", at, "–")) : (G(), L("kbd", ot, [X(x)[e] ? (G(), F(t, {
			key: 0,
			name: X(x)[e],
			label: X(_)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), L(N, { key: 1 }, [z(J(e), 1)], 64))]))], 64))), 128))]), R("span", st, J(e.label), 1)]))), 128))])], 8, et)])) : I("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), lt = { class: "volume" }, ut = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "VolumeControl",
	setup(e) {
		let t = f(), r = i(), { t: o } = a(), s = P(() => t.muted ? 0 : t.volume), c = P(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (G(), L("div", lt, [B(n, {
			name: c.value,
			label: X(t).muted ? X(o)("player.unmute") : X(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => X(t).toggleMute()
		}, null, 8, ["name", "label"]), B(E, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: X(o)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), dt = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		], n = f(), { t: r } = a(), i = P(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function o(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), F(O, {
			class: "speed-menu",
			tone: "glass",
			"model-value": X(n).rate,
			options: i.value,
			label: X(r)("player.playbackSpeed"),
			"onUpdate:modelValue": o
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), ft = "auto", pt = "original";
function mt(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function ht(e) {
	return e >= 2160 ? "4K" : mt(e);
}
function gt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = mt(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: ht(r.height)
		}));
	}
	return n;
}
function _t(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) mt(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function vt(e, t) {
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
function yt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function bt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && vt(e, n) >= 0;
}
function xt(e, t) {
	if (t < 0) return ft;
	let n = e.find((e) => e.index === t);
	return n ? mt(n.height) : ft;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var St = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "QualityMenu",
	props: /*@__PURE__*/ H({
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
	emits: /*@__PURE__*/ H(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, o = Ee(e, "open"), s = K(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = f(), d = i(), { t: p } = a(), m = P(() => gt(r.levels)), h = P(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = m.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = mt(i.height);
				e.has(a) || n && _t(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: ht(i.height)
				}));
			}
			return t;
		}), g = P(() => m.value.length >= 2 ? m.value : h.value), _ = P(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = P(() => vt(r.levels, _.value)), y = P(() => _.value && v.value >= 0 ? {
			value: pt,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = P(() => g.value.length >= 2), x = P(() => r.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: ht(r.activeHeight) })), S = P(() => [
			{
				value: ft,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), C = P(() => r.autoEnabled ? ft : y.value && r.currentLevel === v.value && (u.quality === "original" || d.defaultQuality === "original") ? pt : xt(r.levels, r.currentLevel));
		function w(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), d.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : _t(r.levels, t);
			u.setQuality(t), d.defaultQuality = t, n >= 0 ? l("select", n) : l("select", t);
		}
		return t({ toggleMenu: c }), (e, t) => b.value || o.value ? (G(), F(O, {
			key: 0,
			ref_key: "selectRef",
			ref: s,
			class: "quality-menu",
			tone: "glass",
			"model-value": C.value,
			options: S.value,
			label: X(p)("player.quality"),
			open: o.value,
			"onUpdate:open": t[0] ||= (e) => o.value = e,
			"onUpdate:modelValue": w
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), Ct = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = P(() => le(n.styleConfig)), a = null, o = null, s = null;
		function c() {
			r.value = ue(a);
		}
		function l() {
			s != null && (clearTimeout(s), s = null);
		}
		function u() {
			l(), s = setTimeout(() => {
				if (s = null, !a) return;
				ge(n.video, n.language);
				let e = ue(a);
				e.length && (r.value = e);
			}, 0);
		}
		function d() {
			l(), a?.removeEventListener("cuechange", c), o?.removeEventListener("load", c), a = null, o = null;
		}
		function f(e, t) {
			let n = e?.querySelectorAll?.("track");
			if (!n) return null;
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r.track === t) return r;
			}
			return null;
		}
		function p() {
			d(), ge(n.video, n.language);
			let e = M(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", c), r.value = ue(e), !r.value.length) {
					let t = f(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", c));
				}
				u();
			} else r.value = [];
		}
		return Z(() => [n.video, n.language], p, { immediate: !0 }), we(d), t({ lines: r }), (t, n) => r.value.length ? (G(), L("div", {
			key: 0,
			class: U(["player__captions", { "is-lifted": e.lifted }]),
			style: W(i.value)
		}, [(G(!0), L(N, null, q(r.value, (e, t) => (G(), L("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : I("", !0);
	}
}), [["__scopeId", "data-v-b9f35f44"]]), wt = ["aria-label", "aria-expanded"], Tt = ["aria-label"], Et = { class: "capmenu__head" }, Dt = { class: "capmenu__title" }, Ot = ["aria-label"], kt = ["aria-checked", "tabindex"], At = { class: "capmenu__check" }, jt = { class: "capmenu__optlabel" }, Mt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Nt = { class: "capmenu__check" }, Pt = { class: "capmenu__optlabel" }, Ft = { class: "capmenu__check" }, It = { class: "capmenu__optlabel" }, Lt = { class: "capmenu__title capmenu__title--sub" }, Rt = ["aria-label"], zt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Bt = { class: "capmenu__check" }, Vt = { class: "capmenu__optlabel" }, Ht = { class: "capmenu__title capmenu__title--sub" }, Ut = { class: "capmenu__style" }, Wt = { class: "capmenu__field" }, Gt = { class: "capmenu__fieldlabel" }, Kt = { class: "capmenu__field" }, qt = { class: "capmenu__fieldlabel" }, Jt = { class: "capmenu__field" }, Yt = { class: "capmenu__fieldlabel" }, Xt = { class: "capmenu__field" }, Zt = { class: "capmenu__fieldlabel" }, Qt = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let s = e, c = o, l = f(), u = i(), { t: d } = a(), p = K(null), m = K(null), h = P(() => l.subtitleLang), g = P(() => s.tracks.some((e) => e.language === h.value)), _ = P(() => g.value ? "captions" : "captions-off"), v = P(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = P(() => s.activeAudio >= 0 ? s.activeAudio : 0);
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
		function w() {
			c("add-subtitles"), x();
		}
		function T(e, t, n) {
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
		function E(e) {
			let t = T(e, s.tracks.length + 1, v.value);
			t !== null && S(t === 0 ? null : s.tracks[t - 1].language);
		}
		function D(e) {
			let t = T(e, s.audioTracks.length, y.value);
			t !== null && C(s.audioTracks[t].index);
		}
		function k(e) {
			u.captionStyle = {
				...u.captionStyle,
				size: e
			};
		}
		function ee(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function te(e) {
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
		r(m, Y(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function j(e) {
			p.value && !p.value.contains(e.target) && x();
		}
		return Z(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", j, !0) : document.removeEventListener("pointerdown", j, !0));
		}, { immediate: !0 }), we(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", j, !0);
		}), (r, i) => (G(), L("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [R("button", {
			type: "button",
			class: U(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? X(d)("player.captionsOn") : X(d)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [B(t, { name: _.value }, null, 8, ["name"])], 10, wt), e.open ? (G(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			R("div", Et, [R("h3", Dt, J(X(d)("player.subtitles")), 1), B(n, {
				name: "x",
				label: X(d)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(d)("player.subtitleTrack"),
				onKeydown: E
			}, [R("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => S(null)
			}, [R("span", At, [g.value ? I("", !0) : (G(), F(t, {
				key: 0,
				name: "check"
			}))]), R("span", jt, J(X(d)("player.off")), 1)], 8, kt), (G(!0), L(N, null, q(e.tracks, (e, n) => (G(), L("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [R("span", Nt, [h.value === e.language ? (G(), F(t, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", Pt, J(e.label), 1)], 8, Mt))), 128))], 40, Ot),
			R("button", {
				type: "button",
				class: "capmenu__add",
				onClick: w
			}, [R("span", Ft, [B(t, { name: "plus" })]), R("span", It, J(X(d)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (G(), L(N, { key: 0 }, [R("h3", Lt, J(X(d)("player.audio")), 1), R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(d)("player.audioTrack"),
				onKeydown: D
			}, [(G(!0), L(N, null, q(e.audioTracks, (n) => (G(), L("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => C(n.index)
			}, [R("span", Bt, [e.activeAudio === n.index ? (G(), F(t, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", Vt, J(n.label), 1)], 8, zt))), 128))], 40, Rt)], 64)) : I("", !0),
			R("h3", Ht, J(X(d)("player.captionStyle")), 1),
			R("div", Ut, [
				R("div", Wt, [R("span", Gt, J(X(d)("player.size")), 1), B(O, {
					"model-value": X(u).captionStyle.size,
					options: X(de),
					label: X(d)("player.captionSize"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", Kt, [R("span", qt, J(X(d)("player.color")), 1), B(O, {
					"model-value": X(u).captionStyle.textColor,
					options: X(pe),
					label: X(d)("player.captionColor"),
					"onUpdate:modelValue": ee
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", Jt, [R("span", Yt, J(X(d)("player.background")), 1), B(O, {
					"model-value": X(u).captionStyle.background,
					options: X(_e),
					label: X(d)("player.captionBackground"),
					"onUpdate:modelValue": te
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", Xt, [R("span", Zt, J(X(d)("player.edge")), 1), B(O, {
					"model-value": X(u).captionStyle.edge,
					options: X(he),
					label: X(d)("player.captionEdge"),
					"onUpdate:modelValue": A
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Tt)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), $t = { class: "subsearch" }, en = { class: "subsearch__langs" }, tn = { class: "subsearch__legend" }, nn = { class: "subsearch__chips" }, rn = { class: "subsearch__actions" }, an = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, on = {
	key: 2,
	class: "subsearch__prompt"
}, sn = {
	key: 3,
	class: "subsearch__list"
}, cn = { class: "subsearch__meta" }, ln = { class: "subsearch__release" }, un = { class: "subsearch__signals" }, dn = { class: "subsearch__provider" }, fn = ["aria-label"], pn = {
	key: 2,
	class: "subsearch__stat"
}, mn = {
	key: 3,
	class: "subsearch__stat"
}, hn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let r = e, i = n, { t: o } = a(), l = p(), u = [
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
		let f = P(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...r.preferredLangs, ...u]) {
				let r = (n || "").toLowerCase();
				!r || e.has(r) || (e.add(r), t.push(r));
			}
			return t;
		}), m = K(/* @__PURE__ */ new Set());
		function h() {
			let e = /* @__PURE__ */ new Set();
			for (let t of r.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), m.value = e;
		}
		function g(e) {
			let t = new Set(m.value);
			t.has(e) ? t.delete(e) : t.add(e), m.value = t;
		}
		let _ = K(!1), v = K(!1), y = K([]), b = K(/* @__PURE__ */ new Set()), x = K(/* @__PURE__ */ new Set());
		function C(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let E = P(() => [...y.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), O = P(() => m.value.size > 0 && !_.value);
		function ee() {
			return r.client ?? new s({ baseUrl: r.apiBase ?? "" });
		}
		async function A() {
			if (O.value) {
				_.value = !0, v.value = !0;
				try {
					y.value = await ee().searchSubtitles(r.mediaId, [...m.value]);
				} catch {
					y.value = [], l.error(o("player.subtitleSearchError"));
				} finally {
					_.value = !1;
				}
			}
		}
		function j() {
			i("update:open", !1);
		}
		function ne(e) {
			if (e instanceof c) {
				if (e.status === 429) {
					let t = e.body && typeof e.body == "object" ? e.body : {}, n = typeof t.downloadsRemaining == "number" ? t.downloadsRemaining : null, r = typeof t.resetTimeUtc == "string" ? t.resetTimeUtc : null;
					r ? l.warning(o("player.subtitleQuotaReset", { time: re(r) })) : n === null ? l.warning(o("player.subtitleQuota")) : l.warning(o("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (e.status === 404) {
					l.error(o("player.subtitleAddNotFound"));
					return;
				}
			}
			l.error(o("player.subtitleAddError"));
		}
		function re(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function ie(e) {
			let t = C(e);
			if (b.value.has(t) || x.value.has(t)) return;
			let n = new Set(b.value);
			n.add(t), b.value = n;
			try {
				let n = Be([(await ee().downloadSubtitle(r.mediaId, {
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
				ne(e);
			} finally {
				let e = new Set(b.value);
				e.delete(t), b.value = e;
			}
		}
		return Z(() => r.open, (e) => {
			e && (h(), y.value = [], v.value = !1, _.value = !1, b.value = /* @__PURE__ */ new Set(), x.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (n, r) => (G(), F(k, {
			"model-value": e.open,
			title: X(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => i("update:open", e)
		}, {
			footer: Q(() => [B(w, {
				variant: "ghost",
				onClick: j
			}, {
				default: Q(() => [z(J(X(o)("common.close")), 1)]),
				_: 1
			})]),
			default: Q(() => [R("div", $t, [
				R("fieldset", en, [R("legend", tn, J(X(o)("player.subtitleSearchLanguages")), 1), R("div", nn, [(G(!0), L(N, null, q(f.value, (e) => (G(), F(D, {
					key: e,
					selected: m.value.has(e),
					size: "md",
					"aria-label": d(e),
					"onUpdate:selected": (t) => g(e)
				}, {
					default: Q(() => [z(J(d(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				R("div", rn, [B(w, {
					variant: "solid",
					"left-icon": "search",
					loading: _.value,
					disabled: !O.value,
					onClick: A
				}, {
					default: Q(() => [z(J(X(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				_.value ? (G(), L("div", an, [B(S, { label: X(o)("player.subtitleSearching") }, null, 8, ["label"]), R("span", null, J(X(o)("player.subtitleSearching")), 1)])) : v.value && E.value.length === 0 ? (G(), F(te, {
					key: 1,
					icon: "captions",
					title: X(o)("player.subtitleSearchEmpty"),
					description: X(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : v.value ? (G(), L("ul", sn, [(G(!0), L(N, null, q(E.value, (e) => (G(), L("li", {
					key: C(e),
					class: "subsearch__item"
				}, [R("div", cn, [R("p", ln, J(e.releaseName || e.provider), 1), R("div", un, [
					B(T, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Q(() => [z(J(d(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (G(), F(T, {
						key: 0,
						tone: "info",
						size: "sm",
						label: X(o)("player.subtitleHearingImpairedFull")
					}, {
						default: Q(() => [z(J(X(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : I("", !0),
					R("span", dn, J(e.provider), 1),
					e.rating > 0 ? (G(), L("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": X(o)("player.subtitleRating", { rating: e.rating })
					}, [B(t, { name: "star" }), z(" " + J(e.rating), 1)], 8, fn)) : I("", !0),
					e.downloadCount > 0 ? (G(), L("span", pn, J(X(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : I("", !0),
					e.fps ? (G(), L("span", mn, J(X(o)("player.subtitleFps", { fps: e.fps })), 1)) : I("", !0)
				])]), B(w, {
					variant: "outline",
					size: "sm",
					"left-icon": x.value.has(C(e)) ? "check" : "plus",
					loading: b.value.has(C(e)),
					disabled: b.value.has(C(e)) || x.value.has(C(e)),
					"aria-label": X(o)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => ie(e)
				}, {
					default: Q(() => [z(J(b.value.has(C(e)) ? X(o)("player.subtitleAdding") : X(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (G(), L("p", on, J(X(o)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), gn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function _n(e, t, n, r, i, a, o) {
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
		r: gn(d / m),
		g: gn(f / m),
		b: gn(p / m)
	};
}
function vn(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: _n(e, t, n, 0, 0, r, n),
		right: _n(e, t, n, t - r, 0, t, n),
		center: _n(e, t, n, 0, 0, t, n)
	};
}
function yn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function bn(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${yn(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${yn(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${yn(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function xn(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Sn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			r.value = xn(i);
		}
		let o = P(() => n.enabled && !n.reducedMotion && !r.value), s = P(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = K(null), l = null, u = null, d = !1, f = !1;
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
				c.value = bn(vn(n, 32, 18));
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
		Z(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			w(), e && t && C();
		}, { immediate: !0 }), Te(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), we(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let T = P(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (G(), L("div", {
			class: U(["player__ambient", { "is-active": o.value }]),
			style: W(o.value ? T.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Cn = ["aria-label"], wn = { class: "resume__label" }, Tn = { class: "resume__time numeric" }, En = { class: "resume__actions" }, Dn = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = P(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (G(), L("div", {
			class: "resume",
			role: "region",
			"aria-label": X(i)("player.resumePlayback")
		}, [R("p", wn, [
			z(J(o.value[0]), 1),
			R("span", Tn, J(X(je)(e.seconds)), 1),
			z(J(o.value[1]), 1)
		]), R("div", En, [R("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [B(t, { name: "play" }), R("span", null, J(X(i)("player.resume")), 1)]), R("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [B(t, { name: "rewind" }), R("span", null, J(X(i)("player.startOver")), 1)])])], 8, Cn));
	}
}), [["__scopeId", "data-v-271c5209"]]), On = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], kn = /* @__PURE__ */ new Set([
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
function An(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function jn(...e) {
	return e.some((e) => kn.has(An(e)));
}
function Mn(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Nn(e) {
	return e?.error?.code === 2;
}
function Pn(e) {
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
var Fn = 2 * Math.PI * 15;
function In(e, t, n = Fn) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Ln = /* @__PURE__ */ new Map([
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
]), Rn = /* @__PURE__ */ new Map([
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
]), zn = /* @__PURE__ */ new Set(["h264"]), Bn = /* @__PURE__ */ new Map([
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
function Vn(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = Rn.get(t);
	return n === void 0 ? "transcode" : zn.has(n) ? "direct" : "probe";
}
function Hn(e) {
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
var Un = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function Wn(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return Un.get(t) ?? "video/mp4";
}
function Gn(e, t = "video/mp4") {
	let n = Ln.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function Kn(e, t = "video/mp4") {
	if (!e) return !0;
	let n = Gn(e, t);
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
async function qn(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = Rn.get(n), i = r === void 0 ? void 0 : Bn.get(r);
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
async function Jn(e, t, n = "") {
	if (jn(...e)) return !0;
	let r = e.map((e) => An(e)).find((e) => On.includes(e)) ?? "";
	if (!On.includes(r)) return !1;
	let i = Wn(r), a = Vn(n);
	if (a === "transcode" || a === "probe" && !await qn(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await Kn(e.codec, i)) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Yn = ["aria-label"], Xn = ["src"], Zn = { class: "upnext__body" }, Qn = { class: "upnext__eyebrow" }, $n = { class: "upnext__title" }, er = {
	key: 0,
	class: "upnext__cd numeric"
}, tr = { class: "upnext__actions" }, nr = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, rr = ["r"], ir = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], ar = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { t: r } = a(), { imgSrc: i } = d(), o = e, s = n, c = P(() => o.posterUrl ?? o.media.poster_url ?? null), l = P(() => In(o.remaining, o.total));
		return (n, a) => (G(), L("aside", {
			class: "upnext",
			role: "region",
			"aria-label": X(r)("player.upNext")
		}, [
			c.value ? (G(), L("img", {
				key: 0,
				class: "upnext__thumb",
				src: X(i)(c.value),
				alt: "",
				loading: "lazy"
			}, null, 8, Xn)) : I("", !0),
			R("div", Zn, [
				R("p", Qn, J(X(r)("player.upNext")), 1),
				R("h4", $n, J(e.media.name), 1),
				e.counting ? (G(), L("p", er, J(X(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : I("", !0),
				R("div", tr, [R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: a[0] ||= (e) => s("play-now")
				}, [B(t, { name: "play" }), R("span", null, J(X(r)("player.playNow")), 1)]), R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: a[1] ||= (e) => s("cancel")
				}, J(X(r)("player.cancel")), 1)])
			]),
			e.counting ? (G(), L("svg", nr, [R("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, rr), R("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": X(Fn),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, ir)])) : I("", !0)
		], 8, Yn));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), or = {
	class: "transcode",
	role: "alert"
}, sr = { class: "transcode__card" }, cr = { class: "transcode__heading" }, lr = { class: "transcode__body" }, ur = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (G(), L("div", or, [R("div", sr, [
			B(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			R("h3", cr, J(X(i)("player.transcodeHeading")), 1),
			R("p", lr, J(e.title ? X(i)("player.transcodeBodyTitled", { title: e.title }) : X(i)("player.transcodeBodyUntitled")), 1),
			R("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [B(t, { name: "arrow-left" }), R("span", null, J(X(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), dr = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, fr = { class: "prep__card" }, pr = { class: "prep__heading" }, mr = { class: "prep__body" }, hr = ["aria-valuenow"], gr = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (G(), L("div", dr, [R("div", fr, [
			B(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			R("h3", pr, J(X(r)("player.transcodePreparingHeading")), 1),
			R("p", mr, J(e.title ? X(r)("player.transcodePreparingTitled", { title: e.title }) : X(r)("player.transcodePreparingUntitled")), 1),
			R("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [R("div", {
				class: "prep__bar-fill",
				style: W({ width: i() + "%" })
			}, null, 4)], 8, hr),
			R("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [B(t, { name: "arrow-left" }), R("span", null, J(X(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), _r = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let c = P(() => s(r.position, r.introMarker) ? {
			label: o("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: o("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (G(), F(xe, { name: "skip" }, {
			default: Q(() => [c.value ? (G(), L("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: De(l, ["stop"])
			}, [R("span", null, J(c.value.label), 1), B(t, { name: "skip-forward" })])) : I("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), vr = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, yr = ["aria-label", "onClick"], br = { class: "skip-controls__label" }, xr = 5, Sr = 30, Cr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			let n = s(e.startMs), r = n - xr, i = n + Sr;
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
		let f = P(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (G(), L("div", vr, [(G(!0), L(N, null, q(f.value, (e) => (G(), L("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: De((t) => p(e), ["stop"])
		}, [R("span", br, J(d(e.type)), 1), B(t, { name: "skip-forward" })], 8, yr))), 128))])) : I("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), wr = ["aria-label", "aria-expanded"], Tr = ["aria-label"], Er = { class: "chapterlist__head" }, Dr = { class: "chapterlist__title" }, Or = ["aria-label"], kr = ["onClick"], Ar = { class: "chapterlist__index" }, jr = { class: "chapterlist__name" }, Mr = { class: "chapterlist__meta" }, Nr = { class: "chapterlist__time" }, Pr = {
	key: 0,
	class: "chapterlist__duration"
}, Fr = {
	key: 1,
	class: "chapterlist__empty"
}, Ir = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let d = P(() => o.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = je(e.start), a;
			return e.end != null && e.end > e.start && (a = je(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = K(null), p = K(null);
		r(p, Y(o, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		Z(() => o.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), we(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (G(), L("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [R("button", {
			type: "button",
			class: U(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": X(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [B(t, { name: "list" })], 10, wr), e.open ? (G(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(c)("player.chapterList"),
			tabindex: "-1"
		}, [R("div", Er, [R("h3", Dr, J(X(c)("player.chapters")), 1), B(n, {
			name: "x",
			label: X(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (G(), L("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": X(c)("player.chapterList")
		}, [(G(!0), L(N, null, q(d.value, (e) => (G(), L("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [R("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			R("span", Ar, J(e.index), 1),
			R("span", jr, J(e.label), 1),
			R("span", Mr, [R("span", Nr, J(e.startLabel), 1), e.durationLabel ? (G(), L("span", Pr, "· " + J(e.durationLabel), 1)) : I("", !0)])
		], 8, kr)]))), 128))], 8, Or)) : (G(), L("p", Fr, J(X(c)("player.noChapters")), 1))], 8, Tr)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Lr = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Rr = { class: "marker-timeline__ticks" }, zr = [
	"title",
	"aria-label",
	"onClick"
], Br = { class: "marker-timeline__tooltip" }, Vr = { class: "marker-timeline__tooltip-label" }, Hr = { class: "marker-timeline__tooltip-time numeric" }, Ur = ["onClick"], Wr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		return (e, t) => s.value.length > 0 ? (G(), L("div", {
			key: 0,
			class: U(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (G(), L("div", Lr, [t[0] ||= R("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [R("polygon", { points: "5,3 19,12 5,21" })], -1), z(" " + J(u.value), 1)])) : I("", !0), R("div", Rr, [(G(!0), L(N, null, q(s.value, (e) => (G(), L("button", {
			key: e.id,
			type: "button",
			class: U(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: W({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${X(je)(e.startSec)}`,
			"aria-label": `${e.label} at ${X(je)(e.startSec)}`,
			onClick: De((t) => d(e), ["stop"])
		}, [R("span", Br, [
			R("span", Vr, J(e.label), 1),
			R("span", Hr, J(X(je)(e.startSec)), 1),
			R("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: De((t) => f(e), ["stop"])
			}, " Find similar ", 8, Ur)
		])], 14, zr))), 128))])], 2)) : I("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Gr = ["aria-label", "aria-expanded"], Kr = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, qr = ["aria-label"], Jr = ["aria-selected", "onClick"], Yr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		], s = K(0), c = K(0), l = P(() => c.value > 0), u;
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
		return we(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (G(), L("div", { class: U(["sleep-timer", { "is-active": l.value }]) }, [R("button", {
			type: "button",
			class: U(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : X(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [B(t, { name: "moon" }), l.value ? (G(), L("span", Kr, J(m(c.value)), 1)) : I("", !0)], 10, Gr), B(xe, { name: "dropdown" }, {
			default: Q(() => [h.value ? (G(), L("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": X(i)("player.sleepTimer")
			}, [(G(), L(N, null, q(o, (e) => R("li", {
				key: e.value,
				class: U(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, J(e.label), 11, Jr)), 64))], 8, qr)) : I("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Xr = {
	key: 0,
	class: "syncplay-overlay"
}, Zr = { class: "syncplay-overlay__badge" }, Qr = { class: "syncplay-overlay__label" }, $r = { class: "syncplay-overlay__status-label" }, ei = { class: "syncplay-overlay__members" }, ti = { class: "syncplay-overlay__member-count" }, ni = { class: "syncplay-overlay__member-list" }, ri = { class: "syncplay-overlay__member-name" }, ii = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, ai = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = a(), i = ye(), o = l(), s = P(() => n.apiBase ?? o.value), c = P(() => i.currentRoom?.name ?? "SyncPlay"), u = P(() => i.onlineMembers.length), d = P(() => i.syncStatus), f = P(() => {
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
		return (e, n) => X(i).isInRoom ? (G(), L("div", Xr, [
			R("div", Zr, [B(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), R("span", Qr, "SyncPlay: " + J(c.value), 1)]),
			R("div", { class: U(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [B(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), R("span", $r, J(f.value), 1)], 2),
			R("div", ei, [R("span", ti, [B(t, { name: "user" }), z(" " + J(X(r)("syncplay.members", { count: u.value })), 1)]), R("ul", ni, [(G(!0), L(N, null, q(X(i).onlineMembers.slice(0, 5), (e) => (G(), L("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= R("span", { class: "syncplay-overlay__member-dot" }, null, -1), R("span", ri, J(e.name), 1)]))), 128)), X(i).onlineMembers.length > 5 ? (G(), L("li", ii, " +" + J(X(i).onlineMembers.length - 5) + " more ", 1)) : I("", !0)])]),
			B(w, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: Q(() => [z(J(X(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), oi = {
	key: 0,
	class: "syncplay-controls"
}, si = ["aria-label"], ci = { class: "syncplay-controls__wait-label" }, li = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, ui = { key: 0 }, di = { class: "syncplay-controls__transport" }, fi = ["aria-label"], pi = ["aria-label"], mi = ["aria-label"], hi = { class: "syncplay-controls__status-label" }, gi = 10, _i = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let r = e, i = n, { t: o } = a(), s = ye(), c = l(), u = P(() => r.apiBase ?? c.value), d = K(!1), f = K([]), p = P(() => d.value || s.syncStatus === "re-syncing");
		async function m() {
			if (s.isInRoom) try {
				await s.sendCommand(u.value, "play"), i("play");
			} catch (e) {
				console.error("[SyncPlay] Failed to send play command:", e);
			}
		}
		async function h() {
			if (s.isInRoom) try {
				await s.sendCommand(u.value, "pause"), i("pause");
			} catch (e) {
				console.error("[SyncPlay] Failed to send pause command:", e);
			}
		}
		async function g() {
			r.isPlaying ? await h() : await m();
		}
		async function _(e) {
			if (s.isInRoom) try {
				await s.sendCommand(u.value, "seek", { position: e }), i("seek", e);
			} catch (e) {
				console.error("[SyncPlay] Failed to send seek command:", e);
			}
		}
		async function v() {
			await _(Math.max(0, r.position - gi));
		}
		async function y() {
			await _(Math.min(r.duration, r.position + gi));
		}
		return Z(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => X(s).isInRoom ? (G(), L("div", oi, [
			p.value ? (G(), L("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": X(o)("syncplay.waitingForMembers")
			}, [
				B(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				R("span", ci, J(X(o)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (G(), L("span", li, [z(J(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (G(), L("span", ui, "+" + J(f.value.length - 3), 1)) : I("", !0)])) : I("", !0)
			], 8, si)) : I("", !0),
			R("div", di, [
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(o)("syncplay.rewind"),
					onClick: v
				}, [B(t, { name: "rewind" })], 8, fi),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? X(o)("syncplay.pauseAll") : X(o)("syncplay.playAll"),
					onClick: g
				}, [B(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, pi),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(o)("syncplay.fastForward"),
					onClick: y
				}, [B(t, { name: "forward" })], 8, mi)
			]),
			R("div", { class: U(["syncplay-controls__status", `syncplay-controls__status--${X(s).syncStatus}`]) }, [B(t, {
				name: X(s).syncStatus === "synced" ? "check" : X(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), R("span", hi, J(X(s).syncStatus === "synced" ? X(o)("syncplay.synced") : X(s).syncStatus === "outOfSync" ? X(o)("syncplay.outOfSync") : X(o)("syncplay.reSyncing")), 1)], 2)
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), vi = { class: "player__stage" }, yi = ["src", "poster"], bi = [
	"src",
	"srclang",
	"label"
], xi = { class: "player__meta" }, Si = ["aria-label"], Ci = { class: "player__meta-text" }, wi = { class: "player__eyebrow" }, Ti = { class: "player__title" }, Ei = { class: "player__sub numeric" }, Di = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Oi = {
	key: 0,
	class: "player__center"
}, ki = ["aria-label"], Ai = { class: "player__btnrow" }, ji = ["aria-label"], Mi = ["aria-label"], Ni = ["aria-label"], Pi = { class: "player__time numeric" }, Fi = ["aria-label", "aria-pressed"], Ii = ["title"], Li = ["aria-label"], Ri = ["aria-label"], zi = ["aria-label", "aria-pressed"], Bi = ["aria-label", "aria-pressed"], Vi = ["aria-label"], Hi = { class: "similar-modal" }, Ui = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Wi = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, Gi = { class: "similar-modal__state-title" }, Ki = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, qi = {
	key: 3,
	class: "similar-modal__results"
}, Ji = { class: "similar-modal__poster" }, Yi = ["src", "alt"], Xi = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Zi = { class: "similar-modal__result-body" }, Qi = { class: "similar-modal__result-title" }, $i = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, ea = { key: 0 }, ta = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { imgSrc: r } = d(), o = e, c = n, l = f(), u = i(), { t: _ } = a(), v = ye(), y = m(), b = P(() => y.isFavorite(o.media.id)), x = P(() => y.likeLevel(o.media.id));
		function C() {
			y.toggleFavorite(o.media.id, V());
		}
		function w(e) {
			y.setLike(o.media.id, e, V());
		}
		let T = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], E = K(null), D = K(null), O = K(!0), ee = K(!1), te = K(!1), A = K(!1), j = K(!1), ne = K(!1), re = K(!1), ie = K(null), ae = K(null), oe = K(!1), se = p(), le = K(!1), ue = P(() => j.value ? 1.35 : 1), M = K(jn(o.streamUrl, o.media.path)), de = P(() => Hn(o.media.streams)), pe = 0;
		async function he() {
			let e = ++pe;
			if (M.value) return;
			let t = await Jn([o.streamUrl, o.media.path], o.playbackAudioTracks ?? [], de.value);
			e === pe && (!t || M.value || (M.value = !0, Pe(E.value?.currentTime ?? 0)));
		}
		Z([() => o.playbackAudioTracks, de], () => {
			he();
		}, { immediate: !0 });
		let ge = Se("phlixConfig", null), _e = Se("resumeReporter", null), xe = !1;
		function V() {
			return ge?.apiBase ?? "";
		}
		let H = Ye({
			apiBase: () => o.apiBase ?? "",
			hlsConfig: ge?.playerHlsConfig
		}), W = $e({ apiBase: () => o.apiBase ?? "" }), Y = null;
		function Ee(e) {
			Y !== null && clearTimeout(Y), Y = setTimeout(() => {
				Y = null, W.fetch(e);
			}, 0);
		}
		let Oe = P(() => o.thumbnailAt ?? W.thumbnailAt), ke = P(() => M.value ? void 0 : o.streamUrl), Ae = P(() => M.value && H.state.value !== "ready"), Me = P(() => M.value && (H.state.value === "preparing" || H.state.value === "idle")), Ne = P(() => M.value && H.state.value === "error");
		function Pe(e = 0) {
			let t = E.value;
			t && H.start(t, o.media.id, void 0, e);
		}
		function Fe(e) {
			if (l.quality === "original" && e !== "auto") {
				H.loadVariantPlaylist(pt);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				H.loadVariantPlaylist(e);
				return;
			}
			H.setLevel(e);
		}
		let Le = !1;
		function $() {
			u.defaultQuality = ft;
		}
		function Re() {
			let e = H.levels.value;
			if (e.length === 0) return !1;
			let t = u.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = H.variants.value;
				if (!t || t.length === 0) return !1;
				if (bt(e, t)) H.loadVariantPlaylist(pt);
				else {
					let t = yt(e);
					t >= 0 && H.setNextLevel(t), $();
				}
				return !0;
			}
			let n = _t(e, t);
			return n >= 0 ? H.setNextLevel(n) : $(), !0;
		}
		Z(() => H.levels.value, (e) => {
			Le || e.length === 0 || Re() && (Le = !0);
		}), Z(() => H.variants.value, (e) => {
			Le || !e?.length || Ce(() => {
				Le || Re() && (Le = !0);
			});
		}, { deep: !0 });
		let ze = K(l.resumePositionFor(o.media.id) ?? 0), Be = K(!M.value && ze.value > 0), Ve = null, He = K(!1), Ue = K(8), We, Ge = K(null), Ke = K(0), qe = K(!1), Je = K([]), Xe = K(!1), Ze = K(null);
		function Qe(e, t) {
			Ge.value = e, Ke.value = t, Je.value = [], Ze.value = null, qe.value = !0, it(e, t);
		}
		let et = null, tt = null, nt = null;
		function rt() {
			let e = o.apiBase ?? "";
			return (tt === null || nt !== e) && (tt = new s({ baseUrl: e }), nt = e), tt;
		}
		async function it(e, t) {
			et?.abort(), et = new AbortController(), Xe.value = !0, Ze.value = null;
			try {
				let n = await rt().searchByMarker(e, t, 30, 20, et.signal);
				Je.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Ze.value = "Failed to load similar media. Please try again.", Je.value = [];
			} finally {
				Xe.value = !1;
			}
		}
		function at() {
			et?.abort(), qe.value = !1, Je.value = [], Ze.value = null, Ge.value = null;
		}
		let ot = P(() => l.upNext);
		function st() {
			M.value = jn(o.streamUrl, o.media.path), he(), ze.value = l.resumePositionFor(o.media.id) ?? 0, Be.value = !M.value && ze.value > 0, Ve = null, an = !1, Gt = !1, Ht.value = [], Vt.value = !1, Kt = !1, Pt.value = -1, $t = null, Le = !1, xe = !1, gt(), He.value = !1, H.reset(), E.value && (E.value.currentTime = 0), M.value && Pe(), Ee(o.media.id);
		}
		function lt(e) {
			let t = E.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ve = Math.max(0, e));
		}
		function mt() {
			lt(ze.value), Be.value = !1, E.value?.play()?.catch(() => {});
		}
		function ht() {
			Ve = null, lt(0), l.clearResume(o.media.id), Be.value = !1, E.value?.play()?.catch(() => {});
		}
		function gt() {
			We &&= (clearInterval(We), void 0);
		}
		function vt() {
			Ue.value = 8, gt(), We = setInterval(() => {
				--Ue.value, Ue.value <= 0 && (gt(), wt());
			}, 1e3);
		}
		function xt() {
			xe || (xe = !0, _e?.finish()), Wn(), O.value = !0, l.upNext && (He.value = !0, u.autoplay && vt());
		}
		function wt() {
			gt(), He.value = !1;
			let e = l.next(o.streamUrlFor);
			e && c("play-next", e);
		}
		function Tt() {
			gt(), He.value = !1;
		}
		function Et() {
			if (M.value) return;
			let e = E.value, t = Nn(e) && (e?.currentTime ?? 0) === 0;
			(Mn(e) || t) && (M.value = !0, Pe(e?.currentTime ?? 0));
		}
		let Dt = K([]), Ot = K([]), kt = K(-1), At = K(!1), jt = P(() => H.state.value === "ready" && H.audioTracks.value.length > 0), Mt = P(() => H.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Nt = P(() => (o.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Pt = K(-1), Ft = P(() => !jt.value && !M.value && Ot.value.length === 0 && Nt.value.length > 1), It = P(() => jt.value ? Mt.value : Ft.value ? Nt.value : Ot.value), Lt = P(() => {
			if (jt.value) return H.currentAudioTrack.value;
			if (Ft.value) {
				if (Pt.value >= 0) return Pt.value;
				let e = (o.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : o.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return kt.value;
		}), Rt = K(!1), zt = l.subtitleLang, Bt = P(() => {
			let e = M.value ? H.subtitleTracks.value : o.playbackSubtitleTracks ?? [];
			if (Ht.value.length === 0) return e;
			let t = (e) => e.url.split("?")[0], n = new Set(e.map(t)), r = Ht.value.filter((e) => !n.has(t(e)));
			return r.length === 0 ? e : [...e, ...r];
		}), Vt = K(!1), Ht = K([]), Ut = P(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(u.defaultSubtitleLang), t(u.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function Wt(e) {
			Ht.value.some((t) => t.url === e.url) || (Ht.value = [...Ht.value, e]);
		}
		let Gt = !1, Kt = !1;
		function qt() {
			if (Gt) return;
			if (u.subtitlePreferenceSet) {
				Gt = !0;
				return;
			}
			let e = Bt.value.find((e) => e.default);
			if (!e) return;
			let t = Dt.value.find((t) => t.language === (e.language || e.label));
			t && (l.setSubtitle(t.language), zt = t.language, Gt = !0);
		}
		function Jt() {
			if (Kt) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = It.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Lt.value;
			r >= 0 && r < t.length || (en(n), Kt = !0);
		}
		let Yt = P(() => Dt.value.some((e) => e.language === l.subtitleLang));
		function Xt() {
			let e = E.value;
			Dt.value = ve(e), Ot.value = fe(e), kt.value = ce(e), qt(), Jt();
		}
		function Zt() {
			if (Yt.value) zt = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = zt && Dt.value.some((e) => e.language === zt) ? zt : Dt.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			c("captions");
		}
		let $t = null;
		function en(e) {
			if (jt.value) H.setAudioTrack(e);
			else if (Ft.value) {
				if (e === Lt.value) return;
				Pt.value = e, $t = e, M.value = !0, Pe(E.value?.currentTime ?? 0);
			} else me(E.value, e), kt.value = e;
		}
		Z(jt, (e) => {
			if (!e || $t === null) return;
			let t = $t;
			$t = null, t >= 0 && t < H.audioTracks.value.length && H.setAudioTrack(t);
		}), Z(Bt, () => {
			Ce(() => Xt());
		}, { deep: !0 });
		let tn = null, nn, rn = P(() => {
			let e = [];
			o.media.year && e.push({ text: String(o.media.year) }), o.media.rating && e.push({
				text: o.media.rating,
				cert: !0
			}), o.media.runtime && e.push({ text: `${o.media.runtime}m` });
			let t = o.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), an = !1;
		function on() {
			if (!o.autoplay || an || Be.value || Ae.value) return;
			let e = E.value;
			if (!e || !e.paused) return;
			an = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, l.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function sn() {
			on();
		}
		function cn() {
			o.prevEpisode && c("play-episode", o.prevEpisode);
		}
		function ln() {
			o.nextEpisode && c("play-episode", o.nextEpisode);
		}
		function un() {
			let e = E.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function dn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function fn() {
			l.play(), l.setMediaPositionState();
		}
		function pn() {
			l.pause(), l.setMediaPositionState();
		}
		function mn() {
			let e = E.value;
			e && l.updateProgress(e.currentTime, e.duration, dn(e));
		}
		function gn() {
			let e = E.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, Ve !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ve) : Ve, Ve = null), l.updateProgress(e.currentTime, e.duration, dn(e)), l.setMediaPositionState(), Xt());
		}
		function _n() {
			let e = E.value;
			e && l.updateProgress(e.currentTime, e.duration, dn(e));
		}
		function vn() {
			let e = E.value;
			e && (Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function yn() {
			let e = E.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate), l.setMediaPositionState();
		}
		function bn() {
			l.setMediaPositionState();
		}
		function xn() {
			l.setMediaPositionState();
		}
		function Cn(e) {
			let t = E.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function wn() {
			te.value = !0, Kn();
		}
		function Tn() {
			te.value = !1, Kn();
		}
		function En(e) {
			let t = T.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(T[e] - l.rate) ? n : e, 0), n = T[Math.min(T.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function On() {
			if (!o.markers) return;
			let e = l.position, t = o.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Cn(t.startMs / 1e3);
		}
		function kn() {
			if (!o.markers) return;
			let e = l.position, t = o.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Cn(t.startMs / 1e3);
		}
		function An() {
			ie.value?.toggleOpen();
		}
		let Pn = null;
		function Fn() {
			let e = E.value;
			if (!e) {
				l.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), l.pause();
				return;
			}
			Pn !== null && (clearInterval(Pn), Pn = null);
			let t = .05;
			Pn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(Pn), Pn = null, e.volume = 0, e.pause(), l.pause());
			}, 50);
		}
		g({
			playPause: un,
			seekBy: (e) => Cn(l.position + e),
			frameStep: (e) => {
				l.playing || Cn(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: In,
			toggleFullscreen: Rn,
			toggleCaptions: Zt,
			toggleTheater: Ln,
			togglePip: Bn,
			skipIntro: On,
			skipOutro: kn,
			sleepTimer: An,
			seekToPercent: (e) => Cn(e * l.duration),
			speedStep: En,
			toggleHelp: () => {
				A.value = !A.value;
			},
			toggleQuality: () => {
				M.value ? (oe.value = !oe.value, ae.value?.toggleMenu?.()) : se.show({
					message: _("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !A.value && !At.value && !Rt.value });
		function In() {
			l.toggleMute();
		}
		function Ln() {
			j.value = !j.value, c("theater", j.value);
		}
		Z(() => l.muted, (e) => {
			let t = E.value;
			t && t.muted !== e && (t.muted = e);
		}), Z(() => l.volume, (e) => {
			let t = E.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Z(() => l.rate, (e) => {
			let t = E.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Z(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? lt(e.value) : e.type === "seekBy" && lt(l.position + e.value));
		});
		function Rn() {
			if (typeof document > "u") return;
			let e = D.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function zn() {
			ee.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Bn() {
			let e = E.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			c("pip");
		}
		function Vn() {
			ne.value = !0;
		}
		function Un() {
			ne.value = !1;
		}
		function Wn() {
			nn &&= (clearTimeout(nn), void 0);
		}
		function Gn() {
			Wn(), !(!l.playing || te.value) && (nn = setTimeout(() => {
				l.playing && !te.value && (O.value = !1);
			}, o.idleTimeout ?? 3e3));
		}
		function Kn() {
			O.value = !0, Gn();
		}
		Z(() => l.playing, (e) => {
			e ? (Be.value = !1, Tt(), Gn()) : (Wn(), O.value = !0);
		});
		let qn = null;
		return Te(() => {
			l.setCurrent(o.media, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), y.hydrate(o.media), typeof document < "u" && (document.addEventListener("fullscreenchange", zn), re.value = document.pictureInPictureEnabled === !0), qn = l.bindMediaSession({
				onPlay: () => void E.value?.play()?.catch(() => {}),
				onPause: () => E.value?.pause(),
				onSeek: (e) => Cn(e)
			}), tn = E.value?.textTracks ?? null, tn?.addEventListener?.("addtrack", Xt), tn?.addEventListener?.("removetrack", Xt), Xt(), M.value && Pe(), Ee(o.media.id);
		}), Z(() => o.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), st();
		}), Z(() => o.media?.id, () => {
			y.hydrate(o.media);
		}), Z(() => v.currentSession, (e) => {
			e && (e.state === "playing" ? (E.value?.play(), l.play()) : e.state === "paused" && (E.value?.pause(), l.pause()), v.updateLocalPosition(l.position), Math.abs(v.driftAmount) > 2 && lt(e.playbackPosition));
		}), we(() => {
			Wn(), gt(), H.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", zn), qn?.(), tn?.removeEventListener?.("addtrack", Xt), tn?.removeEventListener?.("removetrack", Xt), Pn !== null && (clearInterval(Pn), Pn = null), Y !== null && (clearTimeout(Y), Y = null);
		}), (n, i) => (G(), L("div", {
			ref_key: "containerRef",
			ref: D,
			class: U(["player", {
				"is-chrome-hidden": !O.value,
				"is-theater": j.value
			}]),
			onPointermove: Kn,
			onPointerdown: Kn,
			onFocusin: Kn
		}, [B(Sn, {
			video: E.value,
			enabled: X(u).atmosphere,
			playing: X(l).playing,
			"reduced-motion": X(u).effectiveReducedMotion,
			intensity: ue.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), R("div", vi, [
			R("video", {
				ref_key: "videoRef",
				ref: E,
				class: "player__video",
				src: ke.value,
				poster: X(r)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: fn,
				onPause: pn,
				onTimeupdate: mn,
				onLoadedmetadata: gn,
				onCanplay: sn,
				onProgress: _n,
				onVolumechange: vn,
				onRatechange: yn,
				onSeeked: bn,
				onDurationchange: xn,
				onEnded: xt,
				onError: Et,
				onEnterpictureinpicture: Vn,
				onLeavepictureinpicture: Un,
				onClick: un
			}, [(G(!0), L(N, null, q(Bt.value, (e) => (G(), L("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, bi))), 128))], 40, yi),
			i[20] ||= R("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[21] ||= R("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			R("div", xi, [R("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": X(_)("player.back"),
				onClick: i[0] ||= De((e) => c("back"), ["stop"])
			}, [B(t, { name: "arrow-left" })], 8, Si), R("div", Ci, [
				R("p", wi, J(X(_)("player.nowPlaying")), 1),
				R("h2", Ti, J(e.media.name), 1),
				R("div", Ei, [(G(!0), L(N, null, q(rn.value, (e, t) => (G(), L(N, { key: t }, [t > 0 && !e.cert ? (G(), L("span", Di, "·")) : I("", !0), R("span", { class: U({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			Ae.value ? I("", !0) : (G(), L("div", Oi, [R("button", {
				type: "button",
				class: U(["player__bigplay", { "is-playing": X(l).playing }]),
				"aria-label": X(l).playing ? X(_)("player.pause") : X(_)("player.play"),
				onClick: De(un, ["stop"])
			}, [B(t, { name: X(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, ki)])),
			B(Ct, {
				video: E.value,
				language: X(l).subtitleLang,
				"style-config": X(u).captionStyle,
				lifted: O.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			Ae.value ? I("", !0) : (G(), L("div", {
				key: 1,
				class: "player__controls",
				onClick: i[7] ||= De(() => {}, ["stop"])
			}, [
				B(Ie, {
					position: X(l).position,
					duration: X(l).duration,
					buffered: X(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": Oe.value,
					onSeek: Cn,
					onScrubStart: wn,
					onScrubEnd: Tn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				X(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), F(Wr, {
					key: 0,
					position: X(l).position,
					duration: X(l).duration,
					markers: e.markers,
					onSeek: Cn,
					onSimilar: Qe
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : I("", !0),
				R("div", Ai, [
					e.prevEpisode ? (G(), L("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(_)("player.previousEpisode"),
						onClick: cn
					}, [B(t, { name: "skip-back" })], 8, ji)) : I("", !0),
					R("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": X(l).playing ? X(_)("player.pause") : X(_)("player.play"),
						onClick: un
					}, [B(t, { name: X(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Mi),
					e.nextEpisode ? (G(), L("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(_)("player.nextEpisode"),
						onClick: ln
					}, [B(t, { name: "skip-forward" })], 8, Ni)) : I("", !0),
					R("span", Pi, [
						z(J(X(je)(X(l).position)), 1),
						i[16] ||= R("span", { class: "player__sep" }, " / ", -1),
						z(J(X(je)(X(l).duration)), 1)
					]),
					i[17] ||= R("span", { class: "player__grow" }, null, -1),
					R("button", {
						type: "button",
						class: U(["player__iconbtn player__favorite", { "is-on": b.value }]),
						"aria-label": b.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": b.value ? "true" : "false",
						onClick: C
					}, [B(t, { name: b.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Fi),
					B(h, {
						level: x.value,
						onCycle: w
					}, null, 8, ["level"]),
					B(ut),
					B(dt),
					B(St, {
						ref_key: "qualityMenuRef",
						ref: ae,
						open: oe.value,
						"onUpdate:open": i[1] ||= (e) => oe.value = e,
						levels: X(H).levels.value,
						variants: X(H).variants.value,
						"current-level": X(H).currentLevel.value,
						"auto-enabled": X(H).autoEnabled.value,
						"active-height": X(H).activeLevelHeight.value,
						onSelect: Fe
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					M.value ? I("", !0) : (G(), L("span", {
						key: 2,
						class: "player__direct-badge",
						title: X(_)("player.qualityDirectStream")
					}, J(X(_)("player.directStream")), 9, Ii)),
					B(Qt, {
						open: At.value,
						"onUpdate:open": i[2] ||= (e) => At.value = e,
						tracks: Dt.value,
						"audio-tracks": It.value,
						"active-audio": Lt.value,
						onSelectAudio: en,
						onAddSubtitles: i[3] ||= (e) => Vt.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					B(Ir, {
						open: Rt.value,
						"onUpdate:open": i[4] ||= (e) => Rt.value = e,
						chapters: e.chapters ?? [],
						onSeek: Cn
					}, null, 8, ["open", "chapters"]),
					B(Yr, {
						ref_key: "sleepTimerRef",
						ref: ie,
						"on-expire": Fn
					}, null, 512),
					R("button", {
						type: "button",
						class: U(["player__iconbtn player__syncplay", { "is-on": X(v).isInRoom }]),
						"aria-label": X(v).isInRoom ? X(_)("syncplay.inRoom") : X(_)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[5] ||= (e) => le.value = !0
					}, [B(t, { name: "user" })], 10, Li),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(_)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[6] ||= (e) => A.value = !0
					}, [B(t, { name: "info" })], 8, Ri),
					re.value ? (G(), L("button", {
						key: 3,
						type: "button",
						class: U(["player__iconbtn", { "is-on": ne.value }]),
						"aria-label": ne.value ? X(_)("player.exitPip") : X(_)("player.pip"),
						"aria-pressed": ne.value,
						onClick: Bn
					}, [B(t, { name: "pip" })], 10, zi)) : I("", !0),
					R("button", {
						type: "button",
						class: U(["player__iconbtn", { "is-on": j.value }]),
						"aria-label": j.value ? X(_)("player.exitTheater") : X(_)("player.theater"),
						"aria-pressed": j.value,
						onClick: Ln
					}, [B(t, { name: "theater" })], 10, Bi),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": ee.value ? X(_)("player.exitFullscreen") : X(_)("player.fullscreen"),
						onClick: Rn
					}, [B(t, { name: ee.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Vi)
				])
			])),
			Ae.value ? I("", !0) : (G(), F(_r, {
				key: 2,
				position: X(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: Cn
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Ae.value ? I("", !0) : (G(), F(Cr, {
				key: 3,
				position: X(l).position,
				markers: e.markers,
				onSkip: Cn
			}, null, 8, ["position", "markers"])),
			Be.value && !Ae.value ? (G(), F(Dn, {
				key: 4,
				seconds: ze.value,
				onResume: mt,
				onRestart: ht
			}, null, 8, ["seconds"])) : I("", !0),
			He.value && ot.value && !Ae.value ? (G(), F(ar, {
				key: 5,
				media: ot.value,
				remaining: Ue.value,
				total: X(8),
				counting: X(u).autoplay,
				onPlayNow: wt,
				onCancel: Tt
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : I("", !0),
			B(k, {
				modelValue: qe.value,
				"onUpdate:modelValue": i[8] ||= (e) => qe.value = e,
				title: `Similar ${Ge.value ?? "marker"}s`,
				size: "lg",
				onClose: at
			}, {
				default: Q(() => [R("div", Hi, [Xe.value ? (G(), L("div", Ui, [B(S, { label: "Finding similar media" })])) : Ze.value ? (G(), L("div", Wi, [B(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), R("p", Gi, J(Ze.value), 1)])) : !Xe.value && Je.value.length === 0 ? (G(), L("div", Ki, [
					B(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[18] ||= R("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[19] ||= R("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), L("ul", qi, [(G(!0), L(N, null, q(Je.value, (e) => (G(), L("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [R("div", Ji, [e.poster_url ? (G(), L("img", {
					key: 0,
					src: X(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Yi)) : (G(), L("div", Xi, [B(t, { name: "film" })]))]), R("div", Zi, [R("p", Qi, J(e.name), 1), e.year ? (G(), L("p", $i, [z(J(e.year) + " ", 1), e.runtime ? (G(), L("span", ea, " · " + J(e.runtime) + "m", 1)) : I("", !0)])) : I("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Me.value ? (G(), F(gr, {
				key: 6,
				title: e.media.name,
				progress: X(H).progress.value,
				onBack: i[9] ||= (e) => c("back")
			}, null, 8, ["title", "progress"])) : I("", !0),
			Ne.value ? (G(), F(ur, {
				key: 7,
				title: e.media.name,
				onBack: i[10] ||= (e) => c("back")
			}, null, 8, ["title"])) : I("", !0),
			X(v).isInRoom ? (G(), F(_i, {
				key: 8,
				position: X(l).position,
				duration: X(l).duration,
				"is-playing": X(l).playing,
				onSeek: Cn,
				onPlay: i[11] ||= (e) => void E.value?.play(),
				onPause: i[12] ||= (e) => void E.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : I("", !0),
			X(v).isInRoom ? (G(), F(ai, { key: 9 })) : I("", !0),
			B(be, {
				modelValue: le.value,
				"onUpdate:modelValue": i[13] ||= (e) => le.value = e
			}, null, 8, ["modelValue"]),
			B(ct, {
				open: A.value,
				onClose: i[14] ||= (e) => A.value = !1
			}, null, 8, ["open"]),
			B(hn, {
				open: Vt.value,
				"onUpdate:open": i[15] ||= (e) => Vt.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": Ut.value,
				onAdded: Wt
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-c59b9206"]]), na = { class: "player-page__stage" }, ra = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, ia = { class: "player-page__blocking-error" }, aa = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = l(), { imgSrc: r } = d(), i = u(), a = ke(), o = Ae(), p = f(), h = m(), g = v(), _ = K(null), y = K(""), b = K([]), x = K(null), S = K(null), T = K([]), E = K([]), D = K(!0), O = K(null), ce = K(!1), le = K(null), ue = K(!1), M = K(null), de = K(null), fe = P(() => String(a.params.id ?? ""));
		C(() => _.value?.name);
		let pe = P(() => {
			let e = r(_.value?.poster_url);
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), me = null, he = !1, ge = 0;
		function _e(e) {
			return he || e.generation !== ge;
		}
		function ve(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function ye(e) {
			let t = i.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function be(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function N(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function xe(e, t, r) {
			let i = () => _e(r), a = t.genres?.[0];
			if (!a) {
				p.setQueue([]);
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
				p.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || ve(e)) return;
				p.setQueue([]);
			}
		}
		async function V(e, t, r) {
			let i = A(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function Se(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function H(e, t) {
			M.value = re(e, t), de.value = ie(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && p.setQueue(r);
		}
		function Ce(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function q(e, n, r) {
			if (M.value = null, de.value = null, !N(n)) return;
			let i = Ce(n.id);
			if (i) {
				H(i, n.id);
				return;
			}
			let a = () => _e(r);
			try {
				let i = await Se(e, n, r.controller?.signal);
				if (a()) return;
				let o = await V(e, i.id, r.controller?.signal);
				if (a()) return;
				if (ne(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => V(e, t.id, r.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = j(o);
				s.length && t.set(i.id, s), H(s, n.id);
			} catch (e) {
				if (a() || ve(e)) return;
				M.value = null, de.value = null;
			}
		}
		async function Y() {
			let e = fe.value;
			me?.abort(), me = typeof AbortController < "u" ? new AbortController() : null, ge += 1;
			let t = {
				generation: ge,
				controller: me
			};
			if (D.value = !0, O.value = null, b.value = [], x.value = null, S.value = null, T.value = [], E.value = [], M.value = null, de.value = null, p.hideMiniPlayer(), !e) {
				O.value = "No media id provided", D.value = !1;
				return;
			}
			let r = new s({ baseUrl: n.value });
			r.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, t.controller?.signal).then((e) => {
				_e(t) || (b.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), x.value = be(e?.intro_marker), S.value = be(e?.outro_marker), T.value = Pn(e?.audio_tracks), E.value = Be(e?.subtitle_tracks));
			}).catch(() => null);
			let i = ae(e), a = Date.now();
			if (i && oe(i, a)) {
				Ee(r, i.item, t);
				return;
			}
			let o = null;
			try {
				o = (await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t.controller?.signal)).item;
			} catch (e) {
				if (_e(t) || ve(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						le.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", ue.value = !0, D.value = !1;
						return;
					}
				}
				if (i) {
					Ee(r, i.item, t);
					return;
				}
				O.value = e instanceof Error ? e.message : "Failed to load media", D.value = !1;
				return;
			}
			if (!_e(t)) {
				if (!o) {
					if (i) {
						Ee(r, i.item, t);
						return;
					}
					O.value = "Failed to load media item", D.value = !1;
					return;
				}
				se(e, o, a), Ee(r, o, t);
			}
		}
		async function Ee(e, t, n) {
			_.value = t, h.hydrate(t), y.value = ye(t), D.value = !1, !(N(t) && (await q(e, t, n), _e(n) || de.value)) && xe(e, t, n);
		}
		Te(Y), Z(fe, Y), Oe(() => {
			p.current && p.streamUrl && p.showMiniPlayer();
		}), we(() => {
			he = !0, me?.abort(), me = null, g.reset();
		});
		function De() {
			o?.back();
		}
		function je(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Me(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ne(e) {
			ce.value = e, g.setTheaterActive(e);
		}
		function Pe() {
			ue.value = !1, De();
		}
		return (e, t) => (G(), L("div", { class: U(["player-page", { "is-theater": ce.value }]) }, [
			pe.value && !D.value && !O.value ? (G(), L("div", {
				key: 0,
				class: "player-page__ambient",
				style: W(pe.value),
				"aria-hidden": "true"
			}, null, 4)) : I("", !0),
			R("div", na, [D.value ? (G(), L("div", ra, [B(ee, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : O.value ? (G(), F(te, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: O.value
			}, {
				actions: Q(() => [B(w, {
					variant: "solid",
					onClick: Y
				}, {
					default: Q(() => [...t[1] ||= [z("Retry", -1)]]),
					_: 1
				}), B(w, {
					variant: "ghost",
					onClick: De
				}, {
					default: Q(() => [...t[2] ||= [z("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : _.value ? (G(), F(ta, {
				key: 2,
				media: _.value,
				"stream-url": y.value,
				"stream-url-for": ye,
				"api-base": X(n),
				chapters: b.value,
				"intro-marker": x.value,
				"outro-marker": S.value,
				"playback-audio-tracks": T.value,
				"playback-subtitle-tracks": E.value,
				"prev-episode": M.value,
				"next-episode": de.value,
				autoplay: !0,
				onBack: De,
				onPlayNext: je,
				onPlayEpisode: Me,
				onTheater: Ne
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
			B(k, {
				modelValue: ue.value,
				"onUpdate:modelValue": t[0] ||= (e) => ue.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Q(() => [B(w, {
					variant: "solid",
					onClick: Pe
				}, {
					default: Q(() => [...t[3] ||= [z("OK", -1)]]),
					_: 1
				})]),
				default: Q(() => [R("p", ia, J(le.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-f833f9a4"]]);
//#endregion
export { aa as default };

//# sourceMappingURL=PlayerPage-D-xq3hUv.js.map