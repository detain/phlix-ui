import { n as e, t } from "./Icon-CkTBN_k5.js";
import { t as n } from "./IconButton-3ZuilWzd.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { a as i } from "./usePreferencesStore-CFPikE8Z.js";
import { t as a } from "./useMessages-nO4j4SSL.js";
import { l as o, t as s, u as c } from "./client-COHWZ2KC.js";
import { n as l, r as u } from "./useApiBase-CV_r-Kk4.js";
import { r as d, t as f } from "./useImageSrc-KnN1T9Ga.js";
import { i as p } from "./usePlayerStore-DhgapSoa.js";
import { t as m } from "./useToastStore-BDoKlU6N.js";
import { n as h, t as g } from "./ThumbRating-DZt3qThy.js";
import { a as _, n as v, o as y, r as b, s as x, t as S } from "./shortcuts-Ck2yBFUB.js";
import { t as C } from "./Spinner-C27IqGQo.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as w } from "./Button-Cw8Wl4QR.js";
import { t as T } from "./Badge-D1_MN41Y.js";
import { t as E } from "./Slider-tWx3oJhB.js";
import { t as D } from "./Chip-4LSLVIhi.js";
import { t as O } from "./Select-C5dvTnnx.js";
import { t as te } from "./Modal-Nn1mtFl3.js";
import { t as k } from "./Skeleton-C3OpJbf1.js";
import { t as A } from "./EmptyState-CwWtkhEJ.js";
import { n as j } from "./media-query-DKjhlX8r.js";
import { n as ne, o as re, r as ie, t as ae } from "./episode-order-C2yqgMeX.js";
import { n as oe, r as se, t as ce } from "./useMediaItemCache-BKCJnCbr.js";
import { a as le, c as ue, d as M, f as de, i as fe, l as pe, n as me, o as he, r as ge, s as _e, t as ve, u as ye } from "./captions-DoP7ce5A.js";
import { n as be, t as xe } from "./SyncPlayModal-DvBKI-u7.js";
import { Fragment as N, Transition as Se, computed as P, createBlock as F, createCommentVNode as I, createElementBlock as L, createElementVNode as R, createTextVNode as z, createVNode as B, defineComponent as V, inject as Ce, mergeModels as we, nextTick as Te, normalizeClass as H, normalizeStyle as U, onBeforeUnmount as Ee, onMounted as De, openBlock as W, ref as G, renderList as K, toDisplayString as q, toRef as Oe, unref as J, useModel as ke, watch as Y, withCtx as X, withModifiers as Ae } from "vue";
import { onBeforeRouteLeave as je, useRoute as Me, useRouter as Ne } from "vue-router";
//#region src/components/player/format-time.ts
function Pe(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Fe = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Ie = { class: "scrubber__track" }, Le = ["title"], Re = { class: "scrubber__time numeric" }, ze = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { t: r } = a(), i = e, o = n, s = G(null), c = G(!1), l = G(!1), u = G(0), d = G(0), f = (e) => Math.min(1, Math.max(0, e)), p = P(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = P(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = P(() => (c.value || l.value) && i.duration > 0), g = P(() => c.value ? u.value : d.value), _ = P(() => g.value * i.duration), v = P(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = P(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = P(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = P(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
			"aria-valuetext": J(Pe)(e.position),
			"aria-label": J(r)("player.seek"),
			onPointerdown: C,
			onPointermove: ee,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: T,
			onPointerleave: E,
			onKeydown: D
		}, [R("div", Ie, [
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
			}, null, 12, Le))), 128)),
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
		}, null, 4)) : I("", !0), R("span", Re, q(J(Pe)(_.value)), 1)], 4)) : I("", !0)], 40, Fe));
	}
}), [["__scopeId", "data-v-3d610715"]]), Be = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Z(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Ve(e) {
	return e === !0 || e === "true" || e === 1;
}
function He(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Ue(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Z(e.url ?? e.src);
		r !== "" && t.push({
			index: He(e.index),
			language: Z(e.language ?? e.lang ?? e.srclang),
			label: Z(e.label),
			default: Ve(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function We(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = He(e.height);
		r <= 0 || t.push({
			id: Z(e.id),
			label: Z(e.label),
			height: r,
			width: He(e.width),
			bitrate: He(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Ge(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function Ke(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function qe(e) {
	let t = e ?? {};
	return {
		jobId: Z(t.job_id ?? t.jobId),
		masterUrl: Z(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Z(t.status, "running"),
		reused: Ve(t.reused),
		subtitles: Ue(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: We(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Je(e) {
	let t = e ?? {};
	return {
		jobId: Z(t.job_id ?? t.jobId),
		status: Z(t.status, "running"),
		playlistReady: Ve(t.playlist_ready ?? t.playlistReady),
		progress: He(t.progress),
		masterUrl: Z(t.master_url ?? t.masterUrl),
		subtitles: Ue(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: We(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ye(e) {
	return e.playlistReady || e.status === "completed";
}
function Xe(e) {
	return Be.has(e);
}
function Ze(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Qe(e) {
	let t = G("idle"), n = G(0), r = G([]), i = G([]), a = G(-1), o = G(!0), c = G(null), l = G(null), u = G([]), d = G(-1), f = G(null), m = G(null);
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
			url: Ze(n, e.url)
		}));
	}
	let S = e.attach ?? x, C = e.pollIntervalMs ?? 1e3, ee = e.maxWaitMs ?? 12e4, w = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), T = Math.max(1, Math.ceil(ee / Math.max(1, C))), E = $e(), D = e.getToken ?? (() => et(E)), O = null, te = null, k = null, A = !1, j = null;
	function ne() {
		return e.client ?? new s({
			baseUrl: e.apiBase(),
			tokenStore: E ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function re(i, a, o, s) {
		ce(), A = !1, j = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = ne(), c = qe(await r.post(Ge(a, o), void 0, j.signal));
			if (A) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			b(c.subtitles), y(c.variants), f.value = c.jobId, m.value = Ze(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < T; e++) {
				let e = Je(await r.get(Ke(c.jobId), void 0, j.signal));
				if (A) return;
				if (n.value = e.progress, b(e.subtitles), y(e.variants), Xe(e.status)) throw Error(`transcode ${e.status}`);
				if (Ye(e)) {
					l = !0;
					break;
				}
				if (await w(C), A) return;
			}
			if (!l) throw Error("transcode timed out");
			if (O = await S(i, m.value, {
				getToken: D,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => h(),
				onError: () => {
					A || (t.value = "error");
				}
			}), A) {
				O.destroy(), O = null;
				return;
			}
			te = O.onLevelSwitched((e) => h(e)), k = O.onAudioTrackSwitched((e) => _(e)), h(), _();
			try {
				let e = p();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			A || (t.value = "error");
		}
	}
	function ie(e) {
		O && (O.setCurrentLevel(e === "auto" ? -1 : e), h());
	}
	function ae(e) {
		O && (O.setNextLevel(e === "auto" ? -1 : e), h());
	}
	function oe(e) {
		O && (O.setAudioTrack(e), _());
	}
	function se(e) {
		if (!O || !m.value) return;
		let t = m.value.replace("master.m3u8", `media_v${e}.m3u8`);
		O.loadSource(t), g();
	}
	function ce() {
		if (A = !0, j &&= (j.abort(), null), te) {
			try {
				te();
			} catch {}
			te = null;
		}
		if (k) {
			try {
				k();
			} catch {}
			k = null;
		}
		if (O) {
			try {
				O.destroy();
			} catch {}
			O = null;
		}
		f.value = null, m.value = null;
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
		jobId: f,
		masterUrl: m,
		loadVariantPlaylist: se,
		start: re,
		cleanup: ce,
		reset: le
	};
}
function $e() {
	try {
		return new o();
	} catch {
		return null;
	}
}
function et(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var tt = 10;
function nt(e) {
	let t = G(null), n = G(!1), r = G(null), i = /* @__PURE__ */ new Map();
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
		let i = r.frame, a = i % tt, s = Math.floor(i / tt), c = a / 9 * 100, l = s / 5 * 100;
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
var rt = ["aria-label"], it = { class: "shortcuts__head" }, at = { class: "shortcuts__title" }, ot = { class: "shortcuts__grid" }, st = { class: "shortcuts__keys" }, ct = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, lt = {
	key: 1,
	class: "shortcuts__key"
}, ut = { class: "shortcuts__label" }, dt = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => b }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = G(null);
		return r(l, Oe(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (W(), L("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= Ae((e) => s("close"), ["self"])
		}, [R("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [R("div", it, [R("h3", at, q(J(c)("player.keyboard")), 1), B(n, {
			name: "x",
			label: J(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), R("ul", ot, [(W(!0), L(N, null, K(e.shortcuts, (e) => (W(), L("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [R("span", st, [(W(!0), L(N, null, K(e.keys, (e, n) => (W(), L(N, { key: n }, [e === "–" ? (W(), L("span", ct, "–")) : (W(), L("kbd", lt, [J(S)[e] ? (W(), F(t, {
			key: 0,
			name: J(S)[e],
			label: J(v)[e] ?? e
		}, null, 8, ["name", "label"])) : (W(), L(N, { key: 1 }, [z(q(e), 1)], 64))]))], 64))), 128))]), R("span", ut, q(e.label), 1)]))), 128))])], 8, rt)])) : I("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), ft = { class: "volume" }, pt = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "VolumeControl",
	setup(e) {
		let t = p(), r = i(), { t: o } = a(), s = P(() => t.muted ? 0 : t.volume), c = P(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Y(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (W(), L("div", ft, [B(n, {
			name: c.value,
			label: J(t).muted ? J(o)("player.unmute") : J(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => J(t).toggleMute()
		}, null, 8, ["name", "label"]), B(E, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: J(o)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), mt = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		], n = p(), { t: r } = a(), i = P(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function o(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (W(), F(O, {
			class: "speed-menu",
			tone: "glass",
			"model-value": J(n).rate,
			options: i.value,
			label: J(r)("player.playbackSpeed"),
			"onUpdate:modelValue": o
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), ht = "auto", gt = "original";
function _t(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function vt(e) {
	return e >= 2160 ? "4K" : _t(e);
}
function yt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = _t(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: vt(r.height)
		}));
	}
	return n;
}
function bt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) _t(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function xt(e, t) {
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
function St(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Ct(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && xt(e, n) >= 0;
}
function wt(e, t) {
	if (t < 0) return ht;
	let n = e.find((e) => e.index === t);
	return n ? _t(n.height) : ht;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var Tt = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "QualityMenu",
	props: /*@__PURE__*/ we({
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
	emits: /*@__PURE__*/ we(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, o = ke(e, "open"), s = G(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = p(), d = i(), { t: f } = a(), m = P(() => yt(r.levels)), h = P(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = m.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = _t(i.height);
				e.has(a) || n && bt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: vt(i.height)
				}));
			}
			return t;
		}), g = P(() => m.value.length >= 2 ? m.value : h.value), _ = P(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = P(() => xt(r.levels, _.value)), y = P(() => _.value && v.value >= 0 ? {
			value: gt,
			label: f("player.qualityOriginal", { height: _.value.height })
		} : null), b = P(() => g.value.length >= 2), x = P(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: vt(r.activeHeight) })), S = P(() => [
			{
				value: ht,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), C = P(() => r.autoEnabled ? ht : y.value && r.currentLevel === v.value && (u.quality === "original" || d.defaultQuality === "original") ? gt : wt(r.levels, r.currentLevel));
		function ee(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), d.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : bt(r.levels, t);
			u.setQuality(t), d.defaultQuality = t, n >= 0 ? l("select", n) : l("select", t);
		}
		return t({ toggleMenu: c }), (e, t) => b.value || o.value ? (W(), F(O, {
			key: 0,
			ref_key: "selectRef",
			ref: s,
			class: "quality-menu",
			tone: "glass",
			"model-value": C.value,
			options: S.value,
			label: J(f)("player.quality"),
			open: o.value,
			"onUpdate:open": t[0] ||= (e) => o.value = e,
			"onUpdate:modelValue": ee
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), Et = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = G([]), i = P(() => ue(n.styleConfig)), a = null, o = null, s = null;
		function c() {
			r.value = M(a);
		}
		function l() {
			s != null && (clearTimeout(s), s = null);
		}
		function u() {
			l(), s = setTimeout(() => {
				if (s = null, !a) return;
				_e(n.video, n.language);
				let e = M(a);
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
			d(), _e(n.video, n.language);
			let e = de(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", c), r.value = M(e), !r.value.length) {
					let t = f(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", c));
				}
				u();
			} else r.value = [];
		}
		return Y(() => [n.video, n.language], p, { immediate: !0 }), Ee(d), t({ lines: r }), (t, n) => r.value.length ? (W(), L("div", {
			key: 0,
			class: H(["player__captions", { "is-lifted": e.lifted }]),
			style: U(i.value)
		}, [(W(!0), L(N, null, K(r.value, (e, t) => (W(), L("p", {
			key: t,
			class: "player__caption-line"
		}, q(e), 1))), 128))], 6)) : I("", !0);
	}
}), [["__scopeId", "data-v-b9f35f44"]]), Dt = ["aria-label", "aria-expanded"], Ot = ["aria-label"], kt = { class: "capmenu__head" }, At = { class: "capmenu__title" }, jt = ["aria-label"], Mt = ["aria-checked", "tabindex"], Nt = { class: "capmenu__check" }, Pt = { class: "capmenu__optlabel" }, Ft = [
	"aria-checked",
	"tabindex",
	"onClick"
], It = { class: "capmenu__check" }, Lt = { class: "capmenu__optlabel" }, Rt = { class: "capmenu__check" }, zt = { class: "capmenu__optlabel" }, Bt = { class: "capmenu__title capmenu__title--sub" }, Vt = ["aria-label"], Ht = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ut = { class: "capmenu__check" }, Wt = { class: "capmenu__optlabel" }, Gt = { class: "capmenu__title capmenu__title--sub" }, Kt = { class: "capmenu__style" }, qt = { class: "capmenu__field" }, Jt = { class: "capmenu__fieldlabel" }, Yt = { class: "capmenu__field" }, Xt = { class: "capmenu__fieldlabel" }, Zt = { class: "capmenu__field" }, Qt = { class: "capmenu__fieldlabel" }, $t = { class: "capmenu__field" }, en = { class: "capmenu__fieldlabel" }, tn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let s = e, c = o, l = p(), u = i(), { t: d } = a(), f = G(null), m = G(null), h = P(() => l.subtitleLang), g = P(() => s.tracks.some((e) => e.language === h.value)), _ = P(() => g.value ? "captions" : "captions-off"), v = P(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = P(() => s.activeAudio >= 0 ? s.activeAudio : 0);
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
		r(m, Oe(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function j(e) {
			f.value && !f.value.contains(e.target) && x();
		}
		return Y(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", j, !0) : document.removeEventListener("pointerdown", j, !0));
		}, { immediate: !0 }), Ee(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", j, !0);
		}), (r, i) => (W(), L("div", {
			ref_key: "rootEl",
			ref: f,
			class: "capmenu"
		}, [R("button", {
			type: "button",
			class: H(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? J(d)("player.captionsOn") : J(d)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [B(t, { name: _.value }, null, 8, ["name"])], 10, Dt), e.open ? (W(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			R("div", kt, [R("h3", At, q(J(d)("player.subtitles")), 1), B(n, {
				name: "x",
				label: J(d)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": J(d)("player.subtitleTrack"),
				onKeydown: T
			}, [R("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => S(null)
			}, [R("span", Nt, [g.value ? I("", !0) : (W(), F(t, {
				key: 0,
				name: "check"
			}))]), R("span", Pt, q(J(d)("player.off")), 1)], 8, Mt), (W(!0), L(N, null, K(e.tracks, (e, n) => (W(), L("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [R("span", It, [h.value === e.language ? (W(), F(t, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", Lt, q(e.label), 1)], 8, Ft))), 128))], 40, jt),
			R("button", {
				type: "button",
				class: "capmenu__add",
				onClick: ee
			}, [R("span", Rt, [B(t, { name: "plus" })]), R("span", zt, q(J(d)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (W(), L(N, { key: 0 }, [R("h3", Bt, q(J(d)("player.audio")), 1), R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": J(d)("player.audioTrack"),
				onKeydown: E
			}, [(W(!0), L(N, null, K(e.audioTracks, (n) => (W(), L("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => C(n.index)
			}, [R("span", Ut, [e.activeAudio === n.index ? (W(), F(t, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", Wt, q(n.label), 1)], 8, Ht))), 128))], 40, Vt)], 64)) : I("", !0),
			R("h3", Gt, q(J(d)("player.captionStyle")), 1),
			R("div", Kt, [
				R("div", qt, [R("span", Jt, q(J(d)("player.size")), 1), B(O, {
					"model-value": J(u).captionStyle.size,
					options: J(fe),
					label: J(d)("player.captionSize"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", Yt, [R("span", Xt, q(J(d)("player.color")), 1), B(O, {
					"model-value": J(u).captionStyle.textColor,
					options: J(me),
					label: J(d)("player.captionColor"),
					"onUpdate:modelValue": te
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", Zt, [R("span", Qt, q(J(d)("player.background")), 1), B(O, {
					"model-value": J(u).captionStyle.background,
					options: J(ve),
					label: J(d)("player.captionBackground"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", $t, [R("span", en, q(J(d)("player.edge")), 1), B(O, {
					"model-value": J(u).captionStyle.edge,
					options: J(ge),
					label: J(d)("player.captionEdge"),
					"onUpdate:modelValue": A
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Ot)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), nn = { class: "subsearch" }, rn = { class: "subsearch__langs" }, an = { class: "subsearch__legend" }, on = { class: "subsearch__chips" }, sn = { class: "subsearch__actions" }, cn = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, ln = {
	key: 2,
	class: "subsearch__prompt"
}, un = {
	key: 3,
	class: "subsearch__list"
}, dn = { class: "subsearch__meta" }, fn = { class: "subsearch__release" }, pn = { class: "subsearch__signals" }, mn = { class: "subsearch__provider" }, hn = ["aria-label"], gn = {
	key: 2,
	class: "subsearch__stat"
}, _n = {
	key: 3,
	class: "subsearch__stat"
}, vn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let f = P(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...r.preferredLangs, ...u]) {
				let r = (n || "").toLowerCase();
				!r || e.has(r) || (e.add(r), t.push(r));
			}
			return t;
		}), p = G(/* @__PURE__ */ new Set());
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
		let _ = G(!1), v = G(!1), y = G([]), b = G(/* @__PURE__ */ new Set()), x = G(/* @__PURE__ */ new Set());
		function S(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let ee = P(() => [...y.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), E = P(() => p.value.size > 0 && !_.value);
		function O() {
			return r.client ?? new s({ baseUrl: r.apiBase ?? "" });
		}
		async function k() {
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
			let t = S(e);
			if (b.value.has(t) || x.value.has(t)) return;
			let n = new Set(b.value);
			n.add(t), b.value = n;
			try {
				let n = Ue([(await O().downloadSubtitle(r.mediaId, {
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
		return Y(() => r.open, (e) => {
			e && (h(), y.value = [], v.value = !1, _.value = !1, b.value = /* @__PURE__ */ new Set(), x.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (n, r) => (W(), F(te, {
			"model-value": e.open,
			title: J(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => i("update:open", e)
		}, {
			footer: X(() => [B(w, {
				variant: "ghost",
				onClick: j
			}, {
				default: X(() => [z(q(J(o)("common.close")), 1)]),
				_: 1
			})]),
			default: X(() => [R("div", nn, [
				R("fieldset", rn, [R("legend", an, q(J(o)("player.subtitleSearchLanguages")), 1), R("div", on, [(W(!0), L(N, null, K(f.value, (e) => (W(), F(D, {
					key: e,
					selected: p.value.has(e),
					size: "md",
					"aria-label": d(e),
					"onUpdate:selected": (t) => g(e)
				}, {
					default: X(() => [z(q(d(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				R("div", sn, [B(w, {
					variant: "solid",
					"left-icon": "search",
					loading: _.value,
					disabled: !E.value,
					onClick: k
				}, {
					default: X(() => [z(q(J(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				_.value ? (W(), L("div", cn, [B(C, { label: J(o)("player.subtitleSearching") }, null, 8, ["label"]), R("span", null, q(J(o)("player.subtitleSearching")), 1)])) : v.value && ee.value.length === 0 ? (W(), F(A, {
					key: 1,
					icon: "captions",
					title: J(o)("player.subtitleSearchEmpty"),
					description: J(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : v.value ? (W(), L("ul", un, [(W(!0), L(N, null, K(ee.value, (e) => (W(), L("li", {
					key: S(e),
					class: "subsearch__item"
				}, [R("div", dn, [R("p", fn, q(e.releaseName || e.provider), 1), R("div", pn, [
					B(T, {
						tone: "neutral",
						size: "sm"
					}, {
						default: X(() => [z(q(d(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (W(), F(T, {
						key: 0,
						tone: "info",
						size: "sm",
						label: J(o)("player.subtitleHearingImpairedFull")
					}, {
						default: X(() => [z(q(J(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : I("", !0),
					R("span", mn, q(e.provider), 1),
					e.rating > 0 ? (W(), L("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": J(o)("player.subtitleRating", { rating: e.rating })
					}, [B(t, { name: "star" }), z(" " + q(e.rating), 1)], 8, hn)) : I("", !0),
					e.downloadCount > 0 ? (W(), L("span", gn, q(J(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : I("", !0),
					e.fps ? (W(), L("span", _n, q(J(o)("player.subtitleFps", { fps: e.fps })), 1)) : I("", !0)
				])]), B(w, {
					variant: "outline",
					size: "sm",
					"left-icon": x.value.has(S(e)) ? "check" : "plus",
					loading: b.value.has(S(e)),
					disabled: b.value.has(S(e)) || x.value.has(S(e)),
					"aria-label": J(o)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => ie(e)
				}, {
					default: X(() => [z(q(b.value.has(S(e)) ? J(o)("player.subtitleAdding") : J(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (W(), L("p", ln, q(J(o)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), yn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function bn(e, t, n, r, i, a, o) {
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
		r: yn(d / m),
		g: yn(f / m),
		b: yn(p / m)
	};
}
function xn(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: bn(e, t, n, 0, 0, r, n),
		right: bn(e, t, n, t - r, 0, t, n),
		center: bn(e, t, n, 0, 0, t, n)
	};
}
function Sn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Cn(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Sn(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Sn(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Sn(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Q(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var wn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			r.value = Q(i);
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
				c.value = Cn(xn(n, 32, 18));
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
		}, { immediate: !0 }), De(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Ee(() => {
			ee(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
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
}), [["__scopeId", "data-v-88c68588"]]), Tn = ["aria-label"], En = { class: "resume__label" }, Dn = { class: "resume__time numeric" }, On = { class: "resume__actions" }, kn = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = P(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (W(), L("div", {
			class: "resume",
			role: "region",
			"aria-label": J(i)("player.resumePlayback")
		}, [R("p", En, [
			z(q(o.value[0]), 1),
			R("span", Dn, q(J(Pe)(e.seconds)), 1),
			z(q(o.value[1]), 1)
		]), R("div", On, [R("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [B(t, { name: "play" }), R("span", null, q(J(i)("player.resume")), 1)]), R("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [B(t, { name: "rewind" }), R("span", null, q(J(i)("player.startOver")), 1)])])], 8, Tn));
	}
}), [["__scopeId", "data-v-271c5209"]]), An = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], jn = /* @__PURE__ */ new Set([
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
function Mn(...e) {
	return e.some((e) => jn.has($(e)));
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
	let r = e.map((e) => $(e)).find((e) => An.includes(e)) ?? "";
	if (!An.includes(r)) return !1;
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
], or = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { t: r } = a(), { imgSrc: i } = f(), o = e, s = n, c = P(() => o.posterUrl ?? o.media.poster_url ?? null), l = P(() => Ln(o.remaining, o.total));
		return (n, a) => (W(), L("aside", {
			class: "upnext",
			role: "region",
			"aria-label": J(r)("player.upNext")
		}, [
			c.value ? (W(), L("img", {
				key: 0,
				class: "upnext__thumb",
				src: J(i)(c.value),
				alt: "",
				loading: "lazy"
			}, null, 8, Zn)) : I("", !0),
			R("div", Qn, [
				R("p", $n, q(J(r)("player.upNext")), 1),
				R("h4", er, q(e.media.name), 1),
				e.counting ? (W(), L("p", tr, q(J(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : I("", !0),
				R("div", nr, [R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: a[0] ||= (e) => s("play-now")
				}, [B(t, { name: "play" }), R("span", null, q(J(r)("player.playNow")), 1)]), R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: a[1] ||= (e) => s("cancel")
				}, q(J(r)("player.cancel")), 1)])
			]),
			e.counting ? (W(), L("svg", rr, [R("circle", {
				cx: "18",
				cy: "18",
				r: J(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, ir), R("circle", {
				cx: "18",
				cy: "18",
				r: J(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": J(In),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, ar)])) : I("", !0)
		], 8, Xn));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), sr = {
	class: "transcode",
	role: "alert"
}, cr = { class: "transcode__card" }, lr = { class: "transcode__heading" }, ur = { class: "transcode__body" }, dr = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (W(), L("div", sr, [R("div", cr, [
			B(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			R("h3", lr, q(J(i)("player.transcodeHeading")), 1),
			R("p", ur, q(e.title ? J(i)("player.transcodeBodyTitled", { title: e.title }) : J(i)("player.transcodeBodyUntitled")), 1),
			R("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [B(t, { name: "arrow-left" }), R("span", null, q(J(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), fr = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, pr = { class: "prep__card" }, mr = { class: "prep__heading" }, hr = { class: "prep__body" }, gr = ["aria-valuenow"], _r = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (W(), L("div", fr, [R("div", pr, [
			B(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			R("h3", mr, q(J(r)("player.transcodePreparingHeading")), 1),
			R("p", hr, q(e.title ? J(r)("player.transcodePreparingTitled", { title: e.title }) : J(r)("player.transcodePreparingUntitled")), 1),
			R("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [R("div", {
				class: "prep__bar-fill",
				style: U({ width: i() + "%" })
			}, null, 4)], 8, gr),
			R("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [B(t, { name: "arrow-left" }), R("span", null, q(J(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), vr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		return (e, n) => (W(), F(Se, { name: "skip" }, {
			default: X(() => [c.value ? (W(), L("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ae(l, ["stop"])
			}, [R("span", null, q(c.value.label), 1), B(t, { name: "skip-forward" })])) : I("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), yr = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, br = ["aria-label", "onClick"], xr = { class: "skip-controls__label" }, Sr = 5, Cr = 30, wr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let f = P(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (W(), L("div", yr, [(W(!0), L(N, null, K(f.value, (e) => (W(), L("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: Ae((t) => p(e), ["stop"])
		}, [R("span", xr, q(d(e.type)), 1), B(t, { name: "skip-forward" })], 8, br))), 128))])) : I("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Tr = ["aria-label", "aria-expanded"], Er = ["aria-label"], Dr = { class: "chapterlist__head" }, Or = { class: "chapterlist__title" }, kr = ["aria-label"], Ar = ["onClick"], jr = { class: "chapterlist__index" }, Mr = { class: "chapterlist__name" }, Nr = { class: "chapterlist__meta" }, Pr = { class: "chapterlist__time" }, Fr = {
	key: 0,
	class: "chapterlist__duration"
}, Ir = {
	key: 1,
	class: "chapterlist__empty"
}, Lr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Pe(e.start), a;
			return e.end != null && e.end > e.start && (a = Pe(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = G(null), p = G(null);
		r(p, Oe(o, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		Y(() => o.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), Ee(() => {
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
			"aria-label": J(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [B(t, { name: "list" })], 10, Tr), e.open ? (W(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(c)("player.chapterList"),
			tabindex: "-1"
		}, [R("div", Dr, [R("h3", Or, q(J(c)("player.chapters")), 1), B(n, {
			name: "x",
			label: J(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (W(), L("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": J(c)("player.chapterList")
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
			R("span", jr, q(e.index), 1),
			R("span", Mr, q(e.label), 1),
			R("span", Nr, [R("span", Pr, q(e.startLabel), 1), e.durationLabel ? (W(), L("span", Fr, "· " + q(e.durationLabel), 1)) : I("", !0)])
		], 8, Ar)]))), 128))], 8, kr)) : (W(), L("p", Ir, q(J(c)("player.noChapters")), 1))], 8, Er)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Rr = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, zr = { class: "marker-timeline__ticks" }, Br = [
	"title",
	"aria-label",
	"onClick"
], Vr = { class: "marker-timeline__tooltip" }, Hr = { class: "marker-timeline__tooltip-label" }, Ur = { class: "marker-timeline__tooltip-time numeric" }, Wr = ["onClick"], Gr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		}, [l.value ? (W(), L("div", Rr, [t[0] ||= R("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [R("polygon", { points: "5,3 19,12 5,21" })], -1), z(" " + q(u.value), 1)])) : I("", !0), R("div", zr, [(W(!0), L(N, null, K(s.value, (e) => (W(), L("button", {
			key: e.id,
			type: "button",
			class: H(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: U({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${J(Pe)(e.startSec)}`,
			"aria-label": `${e.label} at ${J(Pe)(e.startSec)}`,
			onClick: Ae((t) => d(e), ["stop"])
		}, [R("span", Vr, [
			R("span", Hr, q(e.label), 1),
			R("span", Ur, q(J(Pe)(e.startSec)), 1),
			R("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ae((t) => f(e), ["stop"])
			}, " Find similar ", 8, Wr)
		])], 14, Br))), 128))])], 2)) : I("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Kr = ["aria-label", "aria-expanded"], qr = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, Jr = ["aria-label"], Yr = ["aria-selected", "onClick"], Xr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		return Ee(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (W(), L("div", { class: H(["sleep-timer", { "is-active": l.value }]) }, [R("button", {
			type: "button",
			class: H(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : J(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [B(t, { name: "moon" }), l.value ? (W(), L("span", qr, q(m(c.value)), 1)) : I("", !0)], 10, Kr), B(Se, { name: "dropdown" }, {
			default: X(() => [h.value ? (W(), L("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": J(i)("player.sleepTimer")
			}, [(W(), L(N, null, K(o, (e) => R("li", {
				key: e.value,
				class: H(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, q(e.label), 11, Yr)), 64))], 8, Jr)) : I("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Zr = {
	key: 0,
	class: "syncplay-overlay"
}, Qr = { class: "syncplay-overlay__badge" }, $r = { class: "syncplay-overlay__label" }, ei = { class: "syncplay-overlay__status-label" }, ti = { class: "syncplay-overlay__members" }, ni = { class: "syncplay-overlay__member-count" }, ri = { class: "syncplay-overlay__member-list" }, ii = { class: "syncplay-overlay__member-name" }, ai = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, oi = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = a(), i = be(), o = l(), s = P(() => n.apiBase ?? o.value), c = P(() => i.currentRoom?.name ?? "SyncPlay"), u = P(() => i.onlineMembers.length), d = P(() => i.syncStatus), f = P(() => {
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
		return (e, n) => J(i).isInRoom ? (W(), L("div", Zr, [
			R("div", Qr, [B(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), R("span", $r, "SyncPlay: " + q(c.value), 1)]),
			R("div", { class: H(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [B(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), R("span", ei, q(f.value), 1)], 2),
			R("div", ti, [R("span", ni, [B(t, { name: "user" }), z(" " + q(J(r)("syncplay.members", { count: u.value })), 1)]), R("ul", ri, [(W(!0), L(N, null, K(J(i).onlineMembers.slice(0, 5), (e) => (W(), L("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= R("span", { class: "syncplay-overlay__member-dot" }, null, -1), R("span", ii, q(e.name), 1)]))), 128)), J(i).onlineMembers.length > 5 ? (W(), L("li", ai, " +" + q(J(i).onlineMembers.length - 5) + " more ", 1)) : I("", !0)])]),
			B(w, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: X(() => [z(q(J(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), si = {
	key: 0,
	class: "syncplay-controls"
}, ci = ["aria-label"], li = { class: "syncplay-controls__wait-label" }, ui = { class: "syncplay-controls__transport" }, di = ["aria-label"], fi = ["aria-label"], pi = ["aria-label"], mi = { class: "syncplay-controls__status-label" }, hi = 10, gi = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let r = e, i = n, { t: o } = a(), s = be(), c = l(), u = P(() => r.apiBase ?? c.value), d = G(!1), f = P(() => d.value || s.syncStatus === "re-syncing");
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
		}), (n, r) => J(s).isInRoom ? (W(), L("div", si, [
			f.value ? (W(), L("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": J(o)("syncplay.waitingForMembers")
			}, [B(t, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), R("span", li, q(J(o)("syncplay.waitingForMembers")), 1)], 8, ci)) : I("", !0),
			R("div", ui, [
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": J(o)("syncplay.rewind"),
					onClick: _
				}, [B(t, { name: "rewind" })], 8, di),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? J(o)("syncplay.pauseAll") : J(o)("syncplay.playAll"),
					onClick: h
				}, [B(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, fi),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": J(o)("syncplay.fastForward"),
					onClick: v
				}, [B(t, { name: "forward" })], 8, pi)
			]),
			R("div", { class: H(["syncplay-controls__status", `syncplay-controls__status--${J(s).syncStatus}`]) }, [B(t, {
				name: J(s).syncStatus === "synced" ? "check" : J(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), R("span", mi, q(J(s).syncStatus === "synced" ? J(o)("syncplay.synced") : J(s).syncStatus === "outOfSync" ? J(o)("syncplay.outOfSync") : J(o)("syncplay.reSyncing")), 1)], 2)
		])) : I("", !0);
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
}, ta = { key: 0 }, na = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { imgSrc: r } = f(), o = e, c = n, l = p(), u = i(), { t: d } = a(), v = be(), y = h(), b = P(() => y.isFavorite(o.media.id)), x = P(() => y.likeLevel(o.media.id));
		function S() {
			y.toggleFavorite(o.media.id, Se());
		}
		function ee(e) {
			y.setLike(o.media.id, e, Se());
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
		], T = G(null), E = G(null), D = G(!0), O = G(!1), k = G(!1), A = G(!1), j = G(!1), ne = G(!1), re = G(!1), ie = G(null), ae = G(null), oe = G(!1), se = m(), ce = G(!1), ue = P(() => j.value ? 1.35 : 1), M = G(Mn(o.streamUrl, o.media.path)), de = P(() => Un(o.media.streams)), fe = 0;
		async function me() {
			let e = ++fe;
			if (M.value) return;
			let t = await Yn([o.streamUrl, o.media.path], o.playbackAudioTracks ?? [], de.value);
			e === fe && (!t || M.value || (M.value = !0, Ie(T.value?.currentTime ?? 0)));
		}
		Y([() => o.playbackAudioTracks, de], () => {
			me();
		}, { immediate: !0 });
		let ge = Ce("phlixConfig", null), _e = Ce("resumeReporter", null), ve = !1;
		function Se() {
			return ge?.apiBase ?? "";
		}
		let V = Qe({
			apiBase: () => o.apiBase ?? "",
			hlsConfig: ge?.playerHlsConfig
		}), we = nt({ apiBase: () => o.apiBase ?? "" }), U = null;
		function Oe(e) {
			U !== null && clearTimeout(U), U = setTimeout(() => {
				U = null, we.fetch(e);
			}, 0);
		}
		let ke = P(() => o.thumbnailAt ?? we.thumbnailAt), je = P(() => M.value ? void 0 : o.streamUrl), Me = P(() => M.value && V.state.value !== "ready"), Ne = P(() => M.value && (V.state.value === "preparing" || V.state.value === "idle")), Fe = P(() => M.value && V.state.value === "error");
		function Ie(e = 0) {
			let t = T.value;
			t && V.start(t, o.media.id, void 0, e);
		}
		function Le(e) {
			if (l.quality === "original" && e !== "auto") {
				V.loadVariantPlaylist(gt);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				V.loadVariantPlaylist(e);
				return;
			}
			V.setLevel(e);
		}
		let Re = !1;
		function Be() {
			u.defaultQuality = ht;
		}
		function Z() {
			let e = V.levels.value;
			if (e.length === 0) return !1;
			let t = u.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = V.variants.value;
				if (!t || t.length === 0) return !1;
				if (Ct(e, t)) V.loadVariantPlaylist(gt);
				else {
					let t = St(e);
					t >= 0 && V.setNextLevel(t), Be();
				}
				return !0;
			}
			let n = bt(e, t);
			return n >= 0 ? V.setNextLevel(n) : Be(), !0;
		}
		Y(() => V.levels.value, (e) => {
			Re || e.length === 0 || Z() && (Re = !0);
		}), Y(() => V.variants.value, (e) => {
			Re || !e?.length || Te(() => {
				Re || Z() && (Re = !0);
			});
		}, { deep: !0 });
		let Ve = G(l.resumePositionFor(o.media.id) ?? 0), He = G(!M.value && Ve.value > 0), Ue = null, We = G(!1), Ge = G(8), Ke, qe = G(null), Je = G(0), Ye = G(!1), Xe = G([]), Ze = G(!1), $e = G(null);
		function et(e, t) {
			qe.value = e, Je.value = t, Xe.value = [], $e.value = null, Ye.value = !0, ot(e, t);
		}
		let tt = null, rt = null, it = null;
		function at() {
			let e = o.apiBase ?? "";
			return (rt === null || it !== e) && (rt = new s({ baseUrl: e }), it = e), rt;
		}
		async function ot(e, t) {
			tt?.abort(), tt = new AbortController(), Ze.value = !0, $e.value = null;
			try {
				let n = await at().searchByMarker(e, t, 30, 20, tt.signal);
				Xe.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				$e.value = "Failed to load similar media. Please try again.", Xe.value = [];
			} finally {
				Ze.value = !1;
			}
		}
		function st() {
			tt?.abort(), Ye.value = !1, Xe.value = [], $e.value = null, qe.value = null;
		}
		let ct = P(() => l.upNext);
		function lt() {
			M.value = Mn(o.streamUrl, o.media.path), me(), Ve.value = l.resumePositionFor(o.media.id) ?? 0, He.value = !M.value && Ve.value > 0, Ue = null, sn = !1, qt = !1, Wt.value = [], Ut.value = !1, Jt = !1, It.value = -1, en = null, Re = !1, ve = !1, vt(), We.value = !1, V.reset(), T.value && (T.value.currentTime = 0), M.value && Ie(), Oe(o.media.id);
		}
		function ut(e) {
			let t = T.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ue = Math.max(0, e));
		}
		function ft() {
			ut(Ve.value), He.value = !1, T.value?.play()?.catch(() => {});
		}
		function _t() {
			Ue = null, ut(0), l.clearResume(o.media.id), He.value = !1, T.value?.play()?.catch(() => {});
		}
		function vt() {
			Ke &&= (clearInterval(Ke), void 0);
		}
		function yt() {
			Ge.value = 8, vt(), Ke = setInterval(() => {
				--Ge.value, Ge.value <= 0 && (vt(), wt());
			}, 1e3);
		}
		function xt() {
			ve || (ve = !0, _e?.finish()), Wn(), D.value = !0, l.upNext && (We.value = !0, u.autoplay && yt());
		}
		function wt() {
			vt(), We.value = !1;
			let e = l.next(o.streamUrlFor);
			e && c("play-next", e);
		}
		function Dt() {
			vt(), We.value = !1;
		}
		function Ot() {
			if (M.value) return;
			let e = T.value, t = Pn(e) && (e?.currentTime ?? 0) === 0;
			(Nn(e) || t) && (M.value = !0, Ie(e?.currentTime ?? 0));
		}
		let kt = G([]), At = G([]), jt = G(-1), Mt = G(!1), Nt = P(() => V.state.value === "ready" && V.audioTracks.value.length > 0), Pt = P(() => V.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Ft = P(() => (o.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), It = G(-1), Lt = P(() => !Nt.value && !M.value && At.value.length === 0 && Ft.value.length > 1), Rt = P(() => Nt.value ? Pt.value : Lt.value ? Ft.value : At.value), zt = P(() => {
			if (Nt.value) return V.currentAudioTrack.value;
			if (Lt.value) {
				if (It.value >= 0) return It.value;
				let e = (o.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : o.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return jt.value;
		}), Bt = G(!1), Vt = l.subtitleLang, Ht = P(() => {
			let e = o.apiBase ?? "", t = M.value ? V.subtitleTracks.value : vi(e, o.playbackSubtitleTracks ?? []);
			if (Wt.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = vi(e, Wt.value), i = new Set(t.map(n)), a = r.filter((e) => !i.has(n(e)));
			return a.length === 0 ? t : [...t, ...a];
		}), Ut = G(!1), Wt = G([]), Gt = P(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(u.defaultSubtitleLang), t(u.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function Kt(e) {
			Wt.value.some((t) => t.url === e.url) || (Wt.value = [...Wt.value, e]);
		}
		let qt = !1, Jt = !1;
		function Yt() {
			if (qt) return;
			if (u.subtitlePreferenceSet) {
				qt = !0;
				return;
			}
			let e = Ht.value.find((e) => e.default);
			if (!e) return;
			let t = kt.value.find((t) => t.language === (e.language || e.label));
			t && (l.setSubtitle(t.language), Vt = t.language, qt = !0);
		}
		function Xt() {
			if (Jt) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = Rt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = zt.value;
			r >= 0 && r < t.length || (nn(n), Jt = !0);
		}
		let Zt = P(() => kt.value.some((e) => e.language === l.subtitleLang));
		function Qt() {
			let e = T.value;
			kt.value = ye(e), At.value = pe(e), jt.value = le(e), Yt(), Xt();
		}
		function $t() {
			if (Zt.value) Vt = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = Vt && kt.value.some((e) => e.language === Vt) ? Vt : kt.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			c("captions");
		}
		let en = null;
		function nn(e) {
			if (Nt.value) V.setAudioTrack(e);
			else if (Lt.value) {
				if (e === zt.value) return;
				It.value = e, en = e, M.value = !0, Ie(T.value?.currentTime ?? 0);
			} else he(T.value, e), jt.value = e;
		}
		Y(Nt, (e) => {
			if (!e || en === null) return;
			let t = en;
			en = null, t >= 0 && t < V.audioTracks.value.length && V.setAudioTrack(t);
		}), Y(Ht, () => {
			Te(() => Qt());
		}, { deep: !0 });
		let rn = null, an, on = P(() => {
			let e = [];
			o.media.year && e.push({ text: String(o.media.year) }), o.media.rating && e.push({
				text: o.media.rating,
				cert: !0
			}), o.media.runtime && e.push({ text: `${o.media.runtime}m` });
			let t = o.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), sn = !1;
		function cn() {
			if (!o.autoplay || sn || He.value || Me.value) return;
			let e = T.value;
			if (!e || !e.paused) return;
			sn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, l.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function ln() {
			cn();
		}
		function un() {
			o.prevEpisode && c("play-episode", o.prevEpisode);
		}
		function dn() {
			o.nextEpisode && c("play-episode", o.nextEpisode);
		}
		function fn() {
			let e = T.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function pn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function mn() {
			l.play(), l.setMediaPositionState();
		}
		function hn() {
			l.pause(), l.setMediaPositionState();
		}
		function gn() {
			let e = T.value;
			e && l.updateProgress(e.currentTime, e.duration, pn(e));
		}
		function _n() {
			let e = T.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, Ue !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ue) : Ue, Ue = null), l.updateProgress(e.currentTime, e.duration, pn(e)), l.setMediaPositionState(), Qt());
		}
		function yn() {
			let e = T.value;
			e && l.updateProgress(e.currentTime, e.duration, pn(e));
		}
		function bn() {
			let e = T.value;
			e && (Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function xn() {
			let e = T.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate), l.setMediaPositionState();
		}
		function Sn() {
			l.setMediaPositionState();
		}
		function Cn() {
			l.setMediaPositionState();
		}
		function Q(e) {
			let t = T.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function Tn() {
			k.value = !0, Kn();
		}
		function En() {
			k.value = !1, Kn();
		}
		function Dn(e) {
			let t = w.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(w[e] - l.rate) ? n : e, 0), n = w[Math.min(w.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function On() {
			if (!o.markers) return;
			let e = l.position, t = o.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Q(t.startMs / 1e3);
		}
		function An() {
			if (!o.markers) return;
			let e = l.position, t = o.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Q(t.startMs / 1e3);
		}
		function jn() {
			ie.value?.toggleOpen();
		}
		let $ = null;
		function Fn() {
			let e = T.value;
			if (!e) {
				l.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), l.pause();
				return;
			}
			$ !== null && (clearInterval($), $ = null);
			let t = .05;
			$ = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval($), $ = null, e.volume = 0, e.pause(), l.pause());
			}, 50);
		}
		_({
			playPause: fn,
			seekBy: (e) => Q(l.position + e),
			frameStep: (e) => {
				l.playing || Q(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: In,
			toggleFullscreen: Rn,
			toggleCaptions: $t,
			toggleTheater: Ln,
			togglePip: Bn,
			skipIntro: On,
			skipOutro: An,
			sleepTimer: jn,
			seekToPercent: (e) => Q(e * l.duration),
			speedStep: Dn,
			toggleHelp: () => {
				A.value = !A.value;
			},
			toggleQuality: () => {
				M.value ? (oe.value = !oe.value, ae.value?.toggleMenu?.()) : se.show({
					message: d("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !A.value && !Mt.value && !Bt.value });
		function In() {
			l.toggleMute();
		}
		function Ln() {
			j.value = !j.value, c("theater", j.value);
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
			e && (e.type === "seekTo" ? ut(e.value) : e.type === "seekBy" && ut(l.position + e.value));
		});
		function Rn() {
			if (typeof document > "u") return;
			let e = E.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function zn() {
			O.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Bn() {
			let e = T.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			c("pip");
		}
		function Vn() {
			ne.value = !0;
		}
		function Hn() {
			ne.value = !1;
		}
		function Wn() {
			an &&= (clearTimeout(an), void 0);
		}
		function Gn() {
			Wn(), !(!l.playing || k.value) && (an = setTimeout(() => {
				l.playing && !k.value && (D.value = !1);
			}, o.idleTimeout ?? 3e3));
		}
		function Kn() {
			D.value = !0, Gn();
		}
		Y(() => l.playing, (e) => {
			e ? (He.value = !1, Dt(), Gn()) : (Wn(), D.value = !0);
		});
		let qn = null;
		return De(() => {
			l.setCurrent(o.media, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), y.hydrate(o.media), typeof document < "u" && (document.addEventListener("fullscreenchange", zn), re.value = document.pictureInPictureEnabled === !0), qn = l.bindMediaSession({
				onPlay: () => void T.value?.play()?.catch(() => {}),
				onPause: () => T.value?.pause(),
				onSeek: (e) => Q(e)
			}), rn = T.value?.textTracks ?? null, rn?.addEventListener?.("addtrack", Qt), rn?.addEventListener?.("removetrack", Qt), Qt(), M.value && Ie(), Oe(o.media.id);
		}), Y(() => o.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), lt();
		}), Y(() => o.media?.id, () => {
			y.hydrate(o.media);
		}), Y(() => v.currentSession, (e) => {
			e && (e.state === "playing" ? (T.value?.play(), l.play()) : e.state === "paused" && (T.value?.pause(), l.pause()), v.updateLocalPosition(l.position), Math.abs(v.driftAmount) > 2 && ut(e.playbackPosition));
		}), Ee(() => {
			Wn(), vt(), V.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", zn), qn?.(), rn?.removeEventListener?.("addtrack", Qt), rn?.removeEventListener?.("removetrack", Qt), $ !== null && (clearInterval($), $ = null), U !== null && (clearTimeout(U), U = null);
		}), (n, i) => (W(), L("div", {
			ref_key: "containerRef",
			ref: E,
			class: H(["player", {
				"is-chrome-hidden": !D.value,
				"is-theater": j.value
			}]),
			onPointermove: Kn,
			onPointerdown: Kn,
			onFocusin: Kn
		}, [B(wn, {
			video: T.value,
			enabled: J(u).atmosphere,
			playing: J(l).playing,
			"reduced-motion": J(u).effectiveReducedMotion,
			intensity: ue.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), R("div", yi, [
			R("video", {
				ref_key: "videoRef",
				ref: T,
				class: "player__video",
				src: je.value,
				poster: J(r)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: mn,
				onPause: hn,
				onTimeupdate: gn,
				onLoadedmetadata: _n,
				onCanplay: ln,
				onProgress: yn,
				onVolumechange: bn,
				onRatechange: xn,
				onSeeked: Sn,
				onDurationchange: Cn,
				onEnded: xt,
				onError: Ot,
				onEnterpictureinpicture: Vn,
				onLeavepictureinpicture: Hn,
				onClick: fn
			}, [(W(!0), L(N, null, K(Ht.value, (e) => (W(), L("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, xi))), 128))], 40, bi),
			i[20] ||= R("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[21] ||= R("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			R("div", Si, [R("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": J(d)("player.back"),
				onClick: i[0] ||= Ae((e) => c("back"), ["stop"])
			}, [B(t, { name: "arrow-left" })], 8, Ci), R("div", wi, [
				R("p", Ti, q(J(d)("player.nowPlaying")), 1),
				R("h2", Ei, q(e.media.name), 1),
				R("div", Di, [(W(!0), L(N, null, K(on.value, (e, t) => (W(), L(N, { key: t }, [t > 0 && !e.cert ? (W(), L("span", Oi, "·")) : I("", !0), R("span", { class: H({ player__cert: e.cert }) }, q(e.text), 3)], 64))), 128))])
			])]),
			Me.value ? I("", !0) : (W(), L("div", ki, [R("button", {
				type: "button",
				class: H(["player__bigplay", { "is-playing": J(l).playing }]),
				"aria-label": J(l).playing ? J(d)("player.pause") : J(d)("player.play"),
				onClick: Ae(fn, ["stop"])
			}, [B(t, { name: J(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Ai)])),
			B(Et, {
				video: T.value,
				language: J(l).subtitleLang,
				"style-config": J(u).captionStyle,
				lifted: D.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			Me.value ? I("", !0) : (W(), L("div", {
				key: 1,
				class: "player__controls",
				onClick: i[7] ||= Ae(() => {}, ["stop"])
			}, [
				B(ze, {
					position: J(l).position,
					duration: J(l).duration,
					buffered: J(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": ke.value,
					onSeek: Q,
					onScrubStart: Tn,
					onScrubEnd: En
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				J(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (W(), F(Gr, {
					key: 0,
					position: J(l).position,
					duration: J(l).duration,
					markers: e.markers,
					onSeek: Q,
					onSimilar: et
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : I("", !0),
				R("div", ji, [
					e.prevEpisode ? (W(), L("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(d)("player.previousEpisode"),
						onClick: un
					}, [B(t, { name: "skip-back" })], 8, Mi)) : I("", !0),
					R("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": J(l).playing ? J(d)("player.pause") : J(d)("player.play"),
						onClick: fn
					}, [B(t, { name: J(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Ni),
					e.nextEpisode ? (W(), L("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(d)("player.nextEpisode"),
						onClick: dn
					}, [B(t, { name: "skip-forward" })], 8, Pi)) : I("", !0),
					R("span", Fi, [
						z(q(J(Pe)(J(l).position)), 1),
						i[16] ||= R("span", { class: "player__sep" }, " / ", -1),
						z(q(J(Pe)(J(l).duration)), 1)
					]),
					i[17] ||= R("span", { class: "player__grow" }, null, -1),
					R("button", {
						type: "button",
						class: H(["player__iconbtn player__favorite", { "is-on": b.value }]),
						"aria-label": b.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": b.value ? "true" : "false",
						onClick: S
					}, [B(t, { name: b.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Ii),
					B(g, {
						level: x.value,
						onCycle: ee
					}, null, 8, ["level"]),
					B(pt),
					B(mt),
					B(Tt, {
						ref_key: "qualityMenuRef",
						ref: ae,
						open: oe.value,
						"onUpdate:open": i[1] ||= (e) => oe.value = e,
						levels: J(V).levels.value,
						variants: J(V).variants.value,
						"current-level": J(V).currentLevel.value,
						"auto-enabled": J(V).autoEnabled.value,
						"active-height": J(V).activeLevelHeight.value,
						onSelect: Le
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					M.value ? I("", !0) : (W(), L("span", {
						key: 2,
						class: "player__direct-badge",
						title: J(d)("player.qualityDirectStream")
					}, q(J(d)("player.directStream")), 9, Li)),
					B(tn, {
						open: Mt.value,
						"onUpdate:open": i[2] ||= (e) => Mt.value = e,
						tracks: kt.value,
						"audio-tracks": Rt.value,
						"active-audio": zt.value,
						onSelectAudio: nn,
						onAddSubtitles: i[3] ||= (e) => Ut.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					B(Lr, {
						open: Bt.value,
						"onUpdate:open": i[4] ||= (e) => Bt.value = e,
						chapters: e.chapters ?? [],
						onSeek: Q
					}, null, 8, ["open", "chapters"]),
					B(Xr, {
						ref_key: "sleepTimerRef",
						ref: ie,
						"on-expire": Fn
					}, null, 512),
					R("button", {
						type: "button",
						class: H(["player__iconbtn player__syncplay", { "is-on": J(v).isInRoom }]),
						"aria-label": J(v).isInRoom ? J(d)("syncplay.inRoom") : J(d)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[5] ||= (e) => ce.value = !0
					}, [B(t, { name: "user" })], 10, Ri),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(d)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[6] ||= (e) => A.value = !0
					}, [B(t, { name: "info" })], 8, zi),
					re.value ? (W(), L("button", {
						key: 3,
						type: "button",
						class: H(["player__iconbtn", { "is-on": ne.value }]),
						"aria-label": ne.value ? J(d)("player.exitPip") : J(d)("player.pip"),
						"aria-pressed": ne.value,
						onClick: Bn
					}, [B(t, { name: "pip" })], 10, Bi)) : I("", !0),
					R("button", {
						type: "button",
						class: H(["player__iconbtn", { "is-on": j.value }]),
						"aria-label": j.value ? J(d)("player.exitTheater") : J(d)("player.theater"),
						"aria-pressed": j.value,
						onClick: Ln
					}, [B(t, { name: "theater" })], 10, Vi),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": O.value ? J(d)("player.exitFullscreen") : J(d)("player.fullscreen"),
						onClick: Rn
					}, [B(t, { name: O.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Hi)
				])
			])),
			Me.value ? I("", !0) : (W(), F(vr, {
				key: 2,
				position: J(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: Q
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Me.value ? I("", !0) : (W(), F(wr, {
				key: 3,
				position: J(l).position,
				markers: e.markers,
				onSkip: Q
			}, null, 8, ["position", "markers"])),
			He.value && !Me.value ? (W(), F(kn, {
				key: 4,
				seconds: Ve.value,
				onResume: ft,
				onRestart: _t
			}, null, 8, ["seconds"])) : I("", !0),
			We.value && ct.value && !Me.value ? (W(), F(or, {
				key: 5,
				media: ct.value,
				remaining: Ge.value,
				total: J(8),
				counting: J(u).autoplay,
				onPlayNow: wt,
				onCancel: Dt
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : I("", !0),
			B(te, {
				modelValue: Ye.value,
				"onUpdate:modelValue": i[8] ||= (e) => Ye.value = e,
				title: `Similar ${qe.value ?? "marker"}s`,
				size: "lg",
				onClose: st
			}, {
				default: X(() => [R("div", Ui, [Ze.value ? (W(), L("div", Wi, [B(C, { label: "Finding similar media" })])) : $e.value ? (W(), L("div", Gi, [B(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), R("p", Ki, q($e.value), 1)])) : !Ze.value && Xe.value.length === 0 ? (W(), L("div", qi, [
					B(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[18] ||= R("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[19] ||= R("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (W(), L("ul", Ji, [(W(!0), L(N, null, K(Xe.value, (e) => (W(), L("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [R("div", Yi, [e.poster_url ? (W(), L("img", {
					key: 0,
					src: J(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Xi)) : (W(), L("div", Zi, [B(t, { name: "film" })]))]), R("div", Qi, [R("p", $i, q(e.name), 1), e.year ? (W(), L("p", ea, [z(q(e.year) + " ", 1), e.runtime ? (W(), L("span", ta, " · " + q(e.runtime) + "m", 1)) : I("", !0)])) : I("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Ne.value ? (W(), F(_r, {
				key: 6,
				title: e.media.name,
				progress: J(V).progress.value,
				onBack: i[9] ||= (e) => c("back")
			}, null, 8, ["title", "progress"])) : I("", !0),
			Fe.value ? (W(), F(dr, {
				key: 7,
				title: e.media.name,
				onBack: i[10] ||= (e) => c("back")
			}, null, 8, ["title"])) : I("", !0),
			J(v).isInRoom ? (W(), F(gi, {
				key: 8,
				position: J(l).position,
				duration: J(l).duration,
				"is-playing": J(l).playing,
				onSeek: Q,
				onPlay: i[11] ||= (e) => void T.value?.play(),
				onPause: i[12] ||= (e) => void T.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : I("", !0),
			J(v).isInRoom ? (W(), F(oi, { key: 9 })) : I("", !0),
			B(xe, {
				modelValue: ce.value,
				"onUpdate:modelValue": i[13] ||= (e) => ce.value = e
			}, null, 8, ["modelValue"]),
			B(dt, {
				open: A.value,
				onClose: i[14] ||= (e) => A.value = !1
			}, null, 8, ["open"]),
			B(vn, {
				open: Ut.value,
				"onUpdate:open": i[15] ||= (e) => Ut.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": Gt.value,
				onAdded: Kt
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-9aee8ea6"]]), ra = { class: "player-page__stage" }, ia = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, aa = { class: "player-page__blocking-error" }, oa = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = l(), { imgSrc: r } = f(), i = u(), a = Me(), o = Ne(), d = p(), m = h(), g = y(), _ = G(null), v = G(""), b = G([]), x = G(null), S = G(null), C = G([]), T = G([]), E = G(!0), D = G(null), O = G(!1), le = G(null), ue = G(!1), M = G(null), de = G(null), fe = P(() => String(a.params.id ?? ""));
		ee(() => _.value?.name);
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
		function xe(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function N(e, t, r) {
			let i = () => _e(r), a = t.genres?.[0];
			if (!a) {
				d.setQueue([]);
				return;
			}
			try {
				let o = j(n.value, {
					genres: [a],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, r.controller?.signal);
				if (i()) return;
				d.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || ve(e)) return;
				d.setQueue([]);
			}
		}
		async function Se(e, t, r) {
			let i = j(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function V(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Ce(e, t) {
			M.value = ie(e, t), de.value = ae(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && d.setQueue(r);
		}
		function we(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function Te(e, n, r) {
			if (M.value = null, de.value = null, !xe(n)) return;
			let i = we(n.id);
			if (i) {
				Ce(i, n.id);
				return;
			}
			let a = () => _e(r);
			try {
				let i = await V(e, n, r.controller?.signal);
				if (a()) return;
				let o = await Se(e, i.id, r.controller?.signal);
				if (a()) return;
				if (re(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => Se(e, t.id, r.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = ne(o);
				s.length && t.set(i.id, s), Ce(s, n.id);
			} catch (e) {
				if (a() || ve(e)) return;
				M.value = null, de.value = null;
			}
		}
		async function K() {
			let e = fe.value;
			me?.abort(), me = typeof AbortController < "u" ? new AbortController() : null, ge += 1;
			let t = {
				generation: ge,
				controller: me
			};
			if (E.value = !0, D.value = null, b.value = [], x.value = null, S.value = null, C.value = [], T.value = [], M.value = null, de.value = null, d.hideMiniPlayer(), !e) {
				D.value = "No media id provided", E.value = !1;
				return;
			}
			let r = new s({ baseUrl: n.value });
			r.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, t.controller?.signal).then((e) => {
				_e(t) || (b.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), x.value = be(e?.intro_marker), S.value = be(e?.outro_marker), C.value = Fn(e?.audio_tracks), T.value = Ue(e?.subtitle_tracks));
			}).catch(() => null);
			let i = oe(e), a = Date.now();
			if (i && se(i, a)) {
				Oe(r, i.item, t);
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
						le.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", ue.value = !0, E.value = !1;
						return;
					}
				}
				if (i) {
					Oe(r, i.item, t);
					return;
				}
				D.value = e instanceof Error ? e.message : "Failed to load media", E.value = !1;
				return;
			}
			if (!_e(t)) {
				if (!o) {
					if (i) {
						Oe(r, i.item, t);
						return;
					}
					D.value = "Failed to load media item", E.value = !1;
					return;
				}
				ce(e, o, a), Oe(r, o, t);
			}
		}
		async function Oe(e, t, n) {
			_.value = t, m.hydrate(t), v.value = ye(t), E.value = !1, !(xe(t) && (await Te(e, t, n), _e(n) || de.value)) && N(e, t, n);
		}
		De(K), Y(fe, K), je(() => {
			d.current && d.streamUrl && d.showMiniPlayer();
		}), Ee(() => {
			he = !0, me?.abort(), me = null, g.reset();
		});
		function ke() {
			o?.back();
		}
		function Ae(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Pe(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Fe(e) {
			O.value = e, g.setTheaterActive(e);
		}
		function Ie() {
			ue.value = !1, ke();
		}
		return (e, t) => (W(), L("div", { class: H(["player-page", { "is-theater": O.value }]) }, [
			pe.value && !E.value && !D.value ? (W(), L("div", {
				key: 0,
				class: "player-page__ambient",
				style: U(pe.value),
				"aria-hidden": "true"
			}, null, 4)) : I("", !0),
			R("div", ra, [E.value ? (W(), L("div", ia, [B(k, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : D.value ? (W(), F(A, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: D.value
			}, {
				actions: X(() => [B(w, {
					variant: "solid",
					onClick: K
				}, {
					default: X(() => [...t[1] ||= [z("Retry", -1)]]),
					_: 1
				}), B(w, {
					variant: "ghost",
					onClick: ke
				}, {
					default: X(() => [...t[2] ||= [z("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : _.value ? (W(), F(na, {
				key: 2,
				media: _.value,
				"stream-url": v.value,
				"stream-url-for": ye,
				"api-base": J(n),
				chapters: b.value,
				"intro-marker": x.value,
				"outro-marker": S.value,
				"playback-audio-tracks": C.value,
				"playback-subtitle-tracks": T.value,
				"prev-episode": M.value,
				"next-episode": de.value,
				autoplay: !0,
				onBack: ke,
				onPlayNext: Ae,
				onPlayEpisode: Pe,
				onTheater: Fe
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
			B(te, {
				modelValue: ue.value,
				"onUpdate:modelValue": t[0] ||= (e) => ue.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: X(() => [B(w, {
					variant: "solid",
					onClick: Ie
				}, {
					default: X(() => [...t[3] ||= [z("OK", -1)]]),
					_: 1
				})]),
				default: X(() => [R("p", aa, q(le.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-f833f9a4"]]);
//#endregion
export { oa as default };

//# sourceMappingURL=PlayerPage-C6_5YgAs.js.map