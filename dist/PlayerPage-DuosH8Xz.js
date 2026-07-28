import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-ZHw1Bisb.js";
import { t as n } from "./IconButton-LO3ol6oE.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { a as i } from "./usePreferencesStore-CFPikE8Z.js";
import { t as a } from "./useMessages-BinKgH9r.js";
import { l as o, t as s, u as c } from "./client-CkSYnkSD.js";
import { n as l, r as u } from "./useApiBase-CV_r-Kk4.js";
import { i as d } from "./usePlayerStore-DhgapSoa.js";
import { t as f } from "./useToastStore-BDoKlU6N.js";
import { n as p, t as m } from "./ThumbRating-ClFY8tyW.js";
import { a as h, n as g, o as _, r as v, s as y, t as b } from "./shortcuts-C7eaVLrT.js";
import { t as x } from "./Spinner-D26_4u3_.js";
import { i as S } from "./usePageTitle-BO3GGF3M.js";
import { t as C } from "./Button-CsFYgW7R.js";
import { t as w } from "./Badge-WQUcXG1J.js";
import { t as T } from "./Slider-LnnvB5jy.js";
import { t as E } from "./Chip-BKTcATe3.js";
import { t as D } from "./Select-vBQKdJBt.js";
import { t as ee } from "./Modal-BbdR-K2V.js";
import { t as O } from "./Skeleton-DhQmxeNg.js";
import { t as k } from "./EmptyState-CxJYcONU.js";
import { n as A } from "./media-query-DKjhlX8r.js";
import { n as j, o as te, r as ne, t as re } from "./episode-order-C2yqgMeX.js";
import { n as ie, r as ae, t as oe } from "./useMediaItemCache-BKCJnCbr.js";
import { a as se, c as ce, d as M, f as le, i as ue, l as de, n as N, o as fe, r as pe, s as me, t as he, u as ge } from "./captions-DoP7ce5A.js";
import { n as _e, t as ve } from "./SyncPlayModal-OklpgGyw.js";
import { Fragment as P, Transition as ye, computed as F, createBlock as I, createCommentVNode as L, createElementBlock as R, createElementVNode as z, createTextVNode as B, createVNode as V, defineComponent as H, inject as be, mergeModels as xe, nextTick as Se, normalizeClass as U, normalizeStyle as W, onBeforeUnmount as Ce, onMounted as we, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as Te, unref as Y, useModel as Ee, watch as X, withCtx as Z, withModifiers as De } from "vue";
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
], Ne = { class: "scrubber__track" }, Pe = ["title"], Fe = { class: "scrubber__time numeric" }, Ie = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let { t: r } = a(), i = e, o = n, s = K(null), c = K(!1), l = K(!1), u = K(0), d = K(0), f = (e) => Math.min(1, Math.max(0, e)), p = F(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = F(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = F(() => (c.value || l.value) && i.duration > 0), g = F(() => c.value ? u.value : d.value), _ = F(() => g.value * i.duration), v = F(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = F(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = F(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = F(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
			"aria-valuetext": Y(je)(e.position),
			"aria-label": Y(r)("player.seek"),
			onPointerdown: C,
			onPointermove: w,
			onPointerup: T,
			onPointercancel: T,
			onPointerenter: E,
			onPointerleave: D,
			onKeydown: ee
		}, [z("div", Ne, [
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
			}, null, 12, Pe))), 128)),
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
		}, null, 4)) : L("", !0), z("span", Fe, J(Y(je)(_.value)), 1)], 4)) : L("", !0)], 40, Me));
	}
}), [["__scopeId", "data-v-3d610715"]]), Le = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Q(e, t = "") {
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
		let e = n, r = Q(e.url ?? e.src);
		r !== "" && t.push({
			index: ze(e.index),
			language: Q(e.language ?? e.lang ?? e.srclang),
			label: Q(e.label),
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
			id: Q(e.id),
			label: Q(e.label),
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
		jobId: Q(t.job_id ?? t.jobId),
		masterUrl: Q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Q(t.status, "running"),
		reused: Re(t.reused),
		subtitles: Be(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ve(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ge(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		status: Q(t.status, "running"),
		playlistReady: Re(t.playlist_ready ?? t.playlistReady),
		progress: ze(t.progress),
		masterUrl: Q(t.master_url ?? t.masterUrl),
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
	let t = K("idle"), n = K(0), r = K([]), i = K([]), a = K(-1), o = K(!0), c = K(null), l = K(null), u = K([]), f = K(-1), p = K(null), m = K(null);
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
		O && (u.value = O.audioTracks, f.value = e ?? O.getCurrentAudioTrack());
	}
	function v() {
		u.value = [], f.value = -1;
	}
	function b(e) {
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
	let S = e.attach ?? y, C = e.pollIntervalMs ?? 1e3, w = e.maxWaitMs ?? 12e4, T = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), E = Math.max(1, Math.ceil(w / Math.max(1, C))), D = Xe(), ee = e.getToken ?? (() => Ze(D)), O = null, k = null, A = null, j = !1, te = null;
	function ne() {
		return e.client ?? new s({
			baseUrl: e.apiBase(),
			tokenStore: D ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function re(i, a, o, s) {
		ce(), j = !1, te = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = ne(), c = We(await r.post(He(a, o), void 0, te.signal));
			if (j) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			x(c.subtitles), b(c.variants), p.value = c.jobId, m.value = Je(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < E; e++) {
				let e = Ge(await r.get(Ue(c.jobId), void 0, te.signal));
				if (j) return;
				if (n.value = e.progress, x(e.subtitles), b(e.variants), qe(e.status)) throw Error(`transcode ${e.status}`);
				if (Ke(e)) {
					l = !0;
					break;
				}
				if (await T(C), j) return;
			}
			if (!l) throw Error("transcode timed out");
			if (O = await S(i, m.value, {
				getToken: ee,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => h(),
				onError: () => {
					j || (t.value = "error");
				}
			}), j) {
				O.destroy(), O = null;
				return;
			}
			k = O.onLevelSwitched((e) => h(e)), A = O.onAudioTrackSwitched((e) => _(e)), h(), _();
			try {
				let e = d();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			j || (t.value = "error");
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
		if (j = !0, te &&= (te.abort(), null), k) {
			try {
				k();
			} catch {}
			k = null;
		}
		if (A) {
			try {
				A();
			} catch {}
			A = null;
		}
		if (O) {
			try {
				O.destroy();
			} catch {}
			O = null;
		}
		p.value = null, m.value = null;
	}
	function M() {
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
		currentAudioTrack: f,
		setLevel: ie,
		setNextLevel: ae,
		setAudioTrack: oe,
		jobId: p,
		masterUrl: m,
		loadVariantPlaylist: se,
		start: re,
		cleanup: ce,
		reset: M
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
var Qe = 10, $e = 6;
function et(e) {
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
		let i = r.frame, a = i % Qe, s = Math.floor(i / Qe), c = a / (Qe - 1) * 100, l = s / ($e - 1) * 100;
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
var tt = ["aria-label"], nt = { class: "shortcuts__head" }, rt = { class: "shortcuts__title" }, it = { class: "shortcuts__grid" }, at = { class: "shortcuts__keys" }, ot = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, st = {
	key: 1,
	class: "shortcuts__key"
}, ct = { class: "shortcuts__label" }, lt = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => v }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = K(null);
		return r(l, Te(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (G(), R("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= De((e) => s("close"), ["self"])
		}, [z("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [z("div", nt, [z("h3", rt, J(Y(c)("player.keyboard")), 1), V(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), z("ul", it, [(G(!0), R(P, null, q(e.shortcuts, (e) => (G(), R("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [z("span", at, [(G(!0), R(P, null, q(e.keys, (e, n) => (G(), R(P, { key: n }, [e === "–" ? (G(), R("span", ot, "–")) : (G(), R("kbd", st, [Y(b)[e] ? (G(), I(t, {
			key: 0,
			name: Y(b)[e],
			label: Y(g)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), R(P, { key: 1 }, [B(J(e), 1)], 64))]))], 64))), 128))]), z("span", ct, J(e.label), 1)]))), 128))])], 8, tt)])) : L("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), ut = { class: "volume" }, dt = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "VolumeControl",
	setup(e) {
		let t = d(), r = i(), { t: o } = a(), s = F(() => t.muted ? 0 : t.volume), c = F(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return X(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (G(), R("div", ut, [V(n, {
			name: c.value,
			label: Y(t).muted ? Y(o)("player.unmute") : Y(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => Y(t).toggleMute()
		}, null, 8, ["name", "label"]), V(T, {
			class: "volume__slider",
			"model-value": s.value,
			min: 0,
			max: 1,
			step: .05,
			label: Y(o)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), ft = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		], n = d(), { t: r } = a(), i = F(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function o(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), I(D, {
			class: "speed-menu",
			tone: "glass",
			"model-value": Y(n).rate,
			options: i.value,
			label: Y(r)("player.playbackSpeed"),
			"onUpdate:modelValue": o
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), pt = "auto", mt = "original";
function ht(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function gt(e) {
	return e >= 2160 ? "4K" : ht(e);
}
function _t(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = ht(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: gt(r.height)
		}));
	}
	return n;
}
function vt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) ht(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function yt(e, t) {
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
function bt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function xt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && yt(e, n) >= 0;
}
function St(e, t) {
	if (t < 0) return pt;
	let n = e.find((e) => e.index === t);
	return n ? ht(n.height) : pt;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var Ct = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "QualityMenu",
	props: /*@__PURE__*/ xe({
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
	emits: /*@__PURE__*/ xe(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, o = Ee(e, "open"), s = K(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = d(), f = i(), { t: p } = a(), m = F(() => _t(r.levels)), h = F(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = m.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = ht(i.height);
				e.has(a) || n && vt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: gt(i.height)
				}));
			}
			return t;
		}), g = F(() => m.value.length >= 2 ? m.value : h.value), _ = F(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = F(() => yt(r.levels, _.value)), y = F(() => _.value && v.value >= 0 ? {
			value: mt,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = F(() => g.value.length >= 2), x = F(() => r.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: gt(r.activeHeight) })), S = F(() => [
			{
				value: pt,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), C = F(() => r.autoEnabled ? pt : y.value && r.currentLevel === v.value && (u.quality === "original" || f.defaultQuality === "original") ? mt : St(r.levels, r.currentLevel));
		function w(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), f.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : vt(r.levels, t);
			u.setQuality(t), f.defaultQuality = t, n >= 0 ? l("select", n) : l("select", t);
		}
		return t({ toggleMenu: c }), (e, t) => b.value || o.value ? (G(), I(D, {
			key: 0,
			ref_key: "selectRef",
			ref: s,
			class: "quality-menu",
			tone: "glass",
			"model-value": C.value,
			options: S.value,
			label: Y(p)("player.quality"),
			open: o.value,
			"onUpdate:open": t[0] ||= (e) => o.value = e,
			"onUpdate:modelValue": w
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), wt = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = F(() => ce(n.styleConfig)), a = null, o = null, s = null;
		function c() {
			r.value = M(a);
		}
		function l() {
			s != null && (clearTimeout(s), s = null);
		}
		function u() {
			l(), s = setTimeout(() => {
				if (s = null, !a) return;
				me(n.video, n.language);
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
			d(), me(n.video, n.language);
			let e = le(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", c), r.value = M(e), !r.value.length) {
					let t = f(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", c));
				}
				u();
			} else r.value = [];
		}
		return X(() => [n.video, n.language], p, { immediate: !0 }), Ce(d), t({ lines: r }), (t, n) => r.value.length ? (G(), R("div", {
			key: 0,
			class: U(["player__captions", { "is-lifted": e.lifted }]),
			style: W(i.value)
		}, [(G(!0), R(P, null, q(r.value, (e, t) => (G(), R("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : L("", !0);
	}
}), [["__scopeId", "data-v-b9f35f44"]]), Tt = ["aria-label", "aria-expanded"], Et = ["aria-label"], Dt = { class: "capmenu__head" }, Ot = { class: "capmenu__title" }, kt = ["aria-label"], At = ["aria-checked", "tabindex"], jt = { class: "capmenu__check" }, Mt = { class: "capmenu__optlabel" }, Nt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Pt = { class: "capmenu__check" }, Ft = { class: "capmenu__optlabel" }, It = { class: "capmenu__check" }, Lt = { class: "capmenu__optlabel" }, Rt = { class: "capmenu__title capmenu__title--sub" }, zt = ["aria-label"], Bt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Vt = { class: "capmenu__check" }, Ht = { class: "capmenu__optlabel" }, Ut = { class: "capmenu__title capmenu__title--sub" }, Wt = { class: "capmenu__style" }, Gt = { class: "capmenu__field" }, Kt = { class: "capmenu__fieldlabel" }, qt = { class: "capmenu__field" }, Jt = { class: "capmenu__fieldlabel" }, Yt = { class: "capmenu__field" }, Xt = { class: "capmenu__fieldlabel" }, Zt = { class: "capmenu__field" }, Qt = { class: "capmenu__fieldlabel" }, $t = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let s = e, c = o, l = d(), u = i(), { t: f } = a(), p = K(null), m = K(null), h = F(() => l.subtitleLang), g = F(() => s.tracks.some((e) => e.language === h.value)), _ = F(() => g.value ? "captions" : "captions-off"), v = F(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = F(() => s.activeAudio >= 0 ? s.activeAudio : 0);
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
		function ee(e) {
			let t = T(e, s.audioTracks.length, y.value);
			t !== null && C(s.audioTracks[t].index);
		}
		function O(e) {
			u.captionStyle = {
				...u.captionStyle,
				size: e
			};
		}
		function k(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function A(e) {
			u.captionStyle = {
				...u.captionStyle,
				background: e
			};
		}
		function j(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		r(m, Te(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function te(e) {
			p.value && !p.value.contains(e.target) && x();
		}
		return X(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", te, !0) : document.removeEventListener("pointerdown", te, !0));
		}, { immediate: !0 }), Ce(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", te, !0);
		}), (r, i) => (G(), R("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [z("button", {
			type: "button",
			class: U(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? Y(f)("player.captionsOn") : Y(f)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [V(t, { name: _.value }, null, 8, ["name"])], 10, Tt), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(f)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			z("div", Dt, [z("h3", Ot, J(Y(f)("player.subtitles")), 1), V(n, {
				name: "x",
				label: Y(f)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(f)("player.subtitleTrack"),
				onKeydown: E
			}, [z("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => S(null)
			}, [z("span", jt, [g.value ? L("", !0) : (G(), I(t, {
				key: 0,
				name: "check"
			}))]), z("span", Mt, J(Y(f)("player.off")), 1)], 8, At), (G(!0), R(P, null, q(e.tracks, (e, n) => (G(), R("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [z("span", Pt, [h.value === e.language ? (G(), I(t, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", Ft, J(e.label), 1)], 8, Nt))), 128))], 40, kt),
			z("button", {
				type: "button",
				class: "capmenu__add",
				onClick: w
			}, [z("span", It, [V(t, { name: "plus" })]), z("span", Lt, J(Y(f)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (G(), R(P, { key: 0 }, [z("h3", Rt, J(Y(f)("player.audio")), 1), z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(f)("player.audioTrack"),
				onKeydown: ee
			}, [(G(!0), R(P, null, q(e.audioTracks, (n) => (G(), R("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => C(n.index)
			}, [z("span", Vt, [e.activeAudio === n.index ? (G(), I(t, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", Ht, J(n.label), 1)], 8, Bt))), 128))], 40, zt)], 64)) : L("", !0),
			z("h3", Ut, J(Y(f)("player.captionStyle")), 1),
			z("div", Wt, [
				z("div", Gt, [z("span", Kt, J(Y(f)("player.size")), 1), V(D, {
					"model-value": Y(u).captionStyle.size,
					options: Y(ue),
					label: Y(f)("player.captionSize"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", qt, [z("span", Jt, J(Y(f)("player.color")), 1), V(D, {
					"model-value": Y(u).captionStyle.textColor,
					options: Y(N),
					label: Y(f)("player.captionColor"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", Yt, [z("span", Xt, J(Y(f)("player.background")), 1), V(D, {
					"model-value": Y(u).captionStyle.background,
					options: Y(he),
					label: Y(f)("player.captionBackground"),
					"onUpdate:modelValue": A
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", Zt, [z("span", Qt, J(Y(f)("player.edge")), 1), V(D, {
					"model-value": Y(u).captionStyle.edge,
					options: Y(pe),
					label: Y(f)("player.captionEdge"),
					"onUpdate:modelValue": j
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Et)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), en = { class: "subsearch" }, tn = { class: "subsearch__langs" }, nn = { class: "subsearch__legend" }, rn = { class: "subsearch__chips" }, an = { class: "subsearch__actions" }, on = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, sn = {
	key: 2,
	class: "subsearch__prompt"
}, cn = {
	key: 3,
	class: "subsearch__list"
}, ln = { class: "subsearch__meta" }, un = { class: "subsearch__release" }, dn = { class: "subsearch__signals" }, fn = { class: "subsearch__provider" }, pn = ["aria-label"], mn = {
	key: 2,
	class: "subsearch__stat"
}, hn = {
	key: 3,
	class: "subsearch__stat"
}, gn = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let r = e, i = n, { t: o } = a(), l = f(), u = [
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
		let p = F(() => {
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
		let _ = K(!1), v = K(!1), y = K([]), b = K(/* @__PURE__ */ new Set()), S = K(/* @__PURE__ */ new Set());
		function T(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let D = F(() => [...y.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), O = F(() => m.value.size > 0 && !_.value);
		function A() {
			return r.client ?? new s({ baseUrl: r.apiBase ?? "" });
		}
		async function j() {
			if (O.value) {
				_.value = !0, v.value = !0;
				try {
					y.value = await A().searchSubtitles(r.mediaId, [...m.value]);
				} catch {
					y.value = [], l.error(o("player.subtitleSearchError"));
				} finally {
					_.value = !1;
				}
			}
		}
		function te() {
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
			let t = T(e);
			if (b.value.has(t) || S.value.has(t)) return;
			let n = new Set(b.value);
			n.add(t), b.value = n;
			try {
				let n = Be([(await A().downloadSubtitle(r.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], a = new Set(S.value);
				a.add(t), S.value = a;
				let s = d(e.language);
				l.success(s ? o("player.subtitleAdded", { language: s }) : o("player.subtitleAddedGeneric")), n && i("added", n);
			} catch (e) {
				ne(e);
			} finally {
				let e = new Set(b.value);
				e.delete(t), b.value = e;
			}
		}
		return X(() => r.open, (e) => {
			e && (h(), y.value = [], v.value = !1, _.value = !1, b.value = /* @__PURE__ */ new Set(), S.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (n, r) => (G(), I(ee, {
			"model-value": e.open,
			title: Y(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => i("update:open", e)
		}, {
			footer: Z(() => [V(C, {
				variant: "ghost",
				onClick: te
			}, {
				default: Z(() => [B(J(Y(o)("common.close")), 1)]),
				_: 1
			})]),
			default: Z(() => [z("div", en, [
				z("fieldset", tn, [z("legend", nn, J(Y(o)("player.subtitleSearchLanguages")), 1), z("div", rn, [(G(!0), R(P, null, q(p.value, (e) => (G(), I(E, {
					key: e,
					selected: m.value.has(e),
					size: "md",
					"aria-label": d(e),
					"onUpdate:selected": (t) => g(e)
				}, {
					default: Z(() => [B(J(d(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				z("div", an, [V(C, {
					variant: "solid",
					"left-icon": "search",
					loading: _.value,
					disabled: !O.value,
					onClick: j
				}, {
					default: Z(() => [B(J(Y(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				_.value ? (G(), R("div", on, [V(x, { label: Y(o)("player.subtitleSearching") }, null, 8, ["label"]), z("span", null, J(Y(o)("player.subtitleSearching")), 1)])) : v.value && D.value.length === 0 ? (G(), I(k, {
					key: 1,
					icon: "captions",
					title: Y(o)("player.subtitleSearchEmpty"),
					description: Y(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : v.value ? (G(), R("ul", cn, [(G(!0), R(P, null, q(D.value, (e) => (G(), R("li", {
					key: T(e),
					class: "subsearch__item"
				}, [z("div", ln, [z("p", un, J(e.releaseName || e.provider), 1), z("div", dn, [
					V(w, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Z(() => [B(J(d(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (G(), I(w, {
						key: 0,
						tone: "info",
						size: "sm",
						label: Y(o)("player.subtitleHearingImpairedFull")
					}, {
						default: Z(() => [B(J(Y(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : L("", !0),
					z("span", fn, J(e.provider), 1),
					e.rating > 0 ? (G(), R("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": Y(o)("player.subtitleRating", { rating: e.rating })
					}, [V(t, { name: "star" }), B(" " + J(e.rating), 1)], 8, pn)) : L("", !0),
					e.downloadCount > 0 ? (G(), R("span", mn, J(Y(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : L("", !0),
					e.fps ? (G(), R("span", hn, J(Y(o)("player.subtitleFps", { fps: e.fps })), 1)) : L("", !0)
				])]), V(C, {
					variant: "outline",
					size: "sm",
					"left-icon": S.value.has(T(e)) ? "check" : "plus",
					loading: b.value.has(T(e)),
					disabled: b.value.has(T(e)) || S.value.has(T(e)),
					"aria-label": Y(o)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => ie(e)
				}, {
					default: Z(() => [B(J(b.value.has(T(e)) ? Y(o)("player.subtitleAdding") : Y(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (G(), R("p", sn, J(Y(o)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), _n = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function vn(e, t, n, r, i, a, o) {
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
		r: _n(d / m),
		g: _n(f / m),
		b: _n(p / m)
	};
}
function yn(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: vn(e, t, n, 0, 0, r, n),
		right: vn(e, t, n, t - r, 0, t, n),
		center: vn(e, t, n, 0, 0, t, n)
	};
}
function bn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function $(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${bn(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${bn(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${bn(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function xn(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Sn = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
				c.value = $(yn(n, 32, 18));
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
		X(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			w(), e && t && C();
		}, { immediate: !0 }), we(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Ce(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let T = F(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (G(), R("div", {
			class: U(["player__ambient", { "is-active": o.value }]),
			style: W(o.value ? T.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Cn = ["aria-label"], wn = { class: "resume__label" }, Tn = { class: "resume__time numeric" }, En = { class: "resume__actions" }, Dn = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = F(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (G(), R("div", {
			class: "resume",
			role: "region",
			"aria-label": Y(i)("player.resumePlayback")
		}, [z("p", wn, [
			B(J(o.value[0]), 1),
			z("span", Tn, J(Y(je)(e.seconds)), 1),
			B(J(o.value[1]), 1)
		]), z("div", En, [z("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [V(t, { name: "play" }), z("span", null, J(Y(i)("player.resume")), 1)]), z("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [V(t, { name: "rewind" }), z("span", null, J(Y(i)("player.startOver")), 1)])])], 8, Cn));
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
], ar = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let { t: r } = a(), i = e, o = n, s = F(() => i.posterUrl ?? i.media.poster_url ?? null), c = F(() => In(i.remaining, i.total));
		return (n, i) => (G(), R("aside", {
			class: "upnext",
			role: "region",
			"aria-label": Y(r)("player.upNext")
		}, [
			s.value ? (G(), R("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, Xn)) : L("", !0),
			z("div", Zn, [
				z("p", Qn, J(Y(r)("player.upNext")), 1),
				z("h4", $n, J(e.media.name), 1),
				e.counting ? (G(), R("p", er, J(Y(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : L("", !0),
				z("div", tr, [z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => o("play-now")
				}, [V(t, { name: "play" }), z("span", null, J(Y(r)("player.playNow")), 1)]), z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => o("cancel")
				}, J(Y(r)("player.cancel")), 1)])
			]),
			e.counting ? (G(), R("svg", nr, [z("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, rr), z("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Y(Fn),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, ir)])) : L("", !0)
		], 8, Yn));
	}
}), [["__scopeId", "data-v-85909b2d"]]), or = {
	class: "transcode",
	role: "alert"
}, sr = { class: "transcode__card" }, cr = { class: "transcode__heading" }, lr = { class: "transcode__body" }, ur = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (G(), R("div", or, [z("div", sr, [
			V(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			z("h3", cr, J(Y(i)("player.transcodeHeading")), 1),
			z("p", lr, J(e.title ? Y(i)("player.transcodeBodyTitled", { title: e.title }) : Y(i)("player.transcodeBodyUntitled")), 1),
			z("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [V(t, { name: "arrow-left" }), z("span", null, J(Y(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), dr = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, fr = { class: "prep__card" }, pr = { class: "prep__heading" }, mr = { class: "prep__body" }, hr = ["aria-valuenow"], gr = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (G(), R("div", dr, [z("div", fr, [
			V(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			z("h3", pr, J(Y(r)("player.transcodePreparingHeading")), 1),
			z("p", mr, J(e.title ? Y(r)("player.transcodePreparingTitled", { title: e.title }) : Y(r)("player.transcodePreparingUntitled")), 1),
			z("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [z("div", {
				class: "prep__bar-fill",
				style: W({ width: i() + "%" })
			}, null, 4)], 8, hr),
			z("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [V(t, { name: "arrow-left" }), z("span", null, J(Y(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), _r = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let c = F(() => s(r.position, r.introMarker) ? {
			label: o("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: o("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (G(), I(ye, { name: "skip" }, {
			default: Z(() => [c.value ? (G(), R("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: De(l, ["stop"])
			}, [z("span", null, J(c.value.label), 1), V(t, { name: "skip-forward" })])) : L("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), vr = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, yr = ["aria-label", "onClick"], br = { class: "skip-controls__label" }, xr = 5, Sr = 30, Cr = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let f = F(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (G(), R("div", vr, [(G(!0), R(P, null, q(f.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: De((t) => p(e), ["stop"])
		}, [z("span", br, J(d(e.type)), 1), V(t, { name: "skip-forward" })], 8, yr))), 128))])) : L("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), wr = ["aria-label", "aria-expanded"], Tr = ["aria-label"], Er = { class: "chapterlist__head" }, Dr = { class: "chapterlist__title" }, Or = ["aria-label"], kr = ["onClick"], Ar = { class: "chapterlist__index" }, jr = { class: "chapterlist__name" }, Mr = { class: "chapterlist__meta" }, Nr = { class: "chapterlist__time" }, Pr = {
	key: 0,
	class: "chapterlist__duration"
}, Fr = {
	key: 1,
	class: "chapterlist__empty"
}, Ir = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let d = F(() => o.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = je(e.start), a;
			return e.end != null && e.end > e.start && (a = je(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = K(null), p = K(null);
		r(p, Te(o, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		X(() => o.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), Ce(() => {
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
			"aria-label": Y(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [V(t, { name: "list" })], 10, wr), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.chapterList"),
			tabindex: "-1"
		}, [z("div", Er, [z("h3", Dr, J(Y(c)("player.chapters")), 1), V(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (G(), R("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": Y(c)("player.chapterList")
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
			z("span", Ar, J(e.index), 1),
			z("span", jr, J(e.label), 1),
			z("span", Mr, [z("span", Nr, J(e.startLabel), 1), e.durationLabel ? (G(), R("span", Pr, "· " + J(e.durationLabel), 1)) : L("", !0)])
		], 8, kr)]))), 128))], 8, Or)) : (G(), R("p", Fr, J(Y(c)("player.noChapters")), 1))], 8, Tr)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Lr = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Rr = { class: "marker-timeline__ticks" }, zr = [
	"title",
	"aria-label",
	"onClick"
], Br = { class: "marker-timeline__tooltip" }, Vr = { class: "marker-timeline__tooltip-label" }, Hr = { class: "marker-timeline__tooltip-time numeric" }, Ur = ["onClick"], Wr = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		}, [l.value ? (G(), R("div", Lr, [t[0] ||= z("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [z("polygon", { points: "5,3 19,12 5,21" })], -1), B(" " + J(u.value), 1)])) : L("", !0), z("div", Rr, [(G(!0), R(P, null, q(s.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: U(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: W({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Y(je)(e.startSec)}`,
			"aria-label": `${e.label} at ${Y(je)(e.startSec)}`,
			onClick: De((t) => d(e), ["stop"])
		}, [z("span", Br, [
			z("span", Vr, J(e.label), 1),
			z("span", Hr, J(Y(je)(e.startSec)), 1),
			z("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: De((t) => f(e), ["stop"])
			}, " Find similar ", 8, Ur)
		])], 14, zr))), 128))])], 2)) : L("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Gr = ["aria-label", "aria-expanded"], Kr = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, qr = ["aria-label"], Jr = ["aria-selected", "onClick"], Yr = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		return Ce(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (G(), R("div", { class: U(["sleep-timer", { "is-active": l.value }]) }, [z("button", {
			type: "button",
			class: U(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : Y(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [V(t, { name: "moon" }), l.value ? (G(), R("span", Kr, J(m(c.value)), 1)) : L("", !0)], 10, Gr), V(ye, { name: "dropdown" }, {
			default: Z(() => [h.value ? (G(), R("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": Y(i)("player.sleepTimer")
			}, [(G(), R(P, null, q(o, (e) => z("li", {
				key: e.value,
				class: U(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, J(e.label), 11, Jr)), 64))], 8, qr)) : L("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Xr = {
	key: 0,
	class: "syncplay-overlay"
}, Zr = { class: "syncplay-overlay__badge" }, Qr = { class: "syncplay-overlay__label" }, $r = { class: "syncplay-overlay__status-label" }, ei = { class: "syncplay-overlay__members" }, ti = { class: "syncplay-overlay__member-count" }, ni = { class: "syncplay-overlay__member-list" }, ri = { class: "syncplay-overlay__member-name" }, ii = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, ai = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = a(), i = _e(), o = l(), s = F(() => n.apiBase ?? o.value), c = F(() => i.currentRoom?.name ?? "SyncPlay"), u = F(() => i.onlineMembers.length), d = F(() => i.syncStatus), f = F(() => {
			switch (d.value) {
				case "synced": return r("syncplay.synced");
				case "outOfSync": return r("syncplay.outOfSync");
				case "re-syncing": return r("syncplay.reSyncing");
				default: return r("syncplay.synced");
			}
		}), p = F(() => {
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
		return (e, n) => Y(i).isInRoom ? (G(), R("div", Xr, [
			z("div", Zr, [V(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), z("span", Qr, "SyncPlay: " + J(c.value), 1)]),
			z("div", { class: U(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [V(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), z("span", $r, J(f.value), 1)], 2),
			z("div", ei, [z("span", ti, [V(t, { name: "user" }), B(" " + J(u.value) + " " + J(Y(r)("syncplay.members", { count: u.value })), 1)]), z("ul", ni, [(G(!0), R(P, null, q(Y(i).onlineMembers.slice(0, 5), (e) => (G(), R("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= z("span", { class: "syncplay-overlay__member-dot" }, null, -1), z("span", ri, J(e.name), 1)]))), 128)), Y(i).onlineMembers.length > 5 ? (G(), R("li", ii, " +" + J(Y(i).onlineMembers.length - 5) + " more ", 1)) : L("", !0)])]),
			V(C, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: Z(() => [B(J(Y(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), oi = {
	key: 0,
	class: "syncplay-controls"
}, si = ["aria-label"], ci = { class: "syncplay-controls__wait-label" }, li = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, ui = { key: 0 }, di = { class: "syncplay-controls__transport" }, fi = ["aria-label"], pi = ["aria-label"], mi = ["aria-label"], hi = { class: "syncplay-controls__status-label" }, gi = 10, _i = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let r = e, i = n, { t: o } = a(), s = _e(), c = l(), u = F(() => r.apiBase ?? c.value), d = K(!1), f = K([]), p = F(() => d.value || s.syncStatus === "re-syncing");
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
		return X(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => Y(s).isInRoom ? (G(), R("div", oi, [
			p.value ? (G(), R("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": Y(o)("syncplay.waitingForMembers")
			}, [
				V(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				z("span", ci, J(Y(o)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (G(), R("span", li, [B(J(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (G(), R("span", ui, "+" + J(f.value.length - 3), 1)) : L("", !0)])) : L("", !0)
			], 8, si)) : L("", !0),
			z("div", di, [
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.rewind"),
					onClick: v
				}, [V(t, { name: "rewind" })], 8, fi),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Y(o)("syncplay.pauseAll") : Y(o)("syncplay.playAll"),
					onClick: g
				}, [V(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, pi),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.fastForward"),
					onClick: y
				}, [V(t, { name: "forward" })], 8, mi)
			]),
			z("div", { class: U(["syncplay-controls__status", `syncplay-controls__status--${Y(s).syncStatus}`]) }, [V(t, {
				name: Y(s).syncStatus === "synced" ? "check" : Y(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), z("span", hi, J(Y(s).syncStatus === "synced" ? Y(o)("syncplay.synced") : Y(s).syncStatus === "outOfSync" ? Y(o)("syncplay.outOfSync") : Y(o)("syncplay.reSyncing")), 1)], 2)
		])) : L("", !0);
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
}, ea = { key: 0 }, ta = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let r = e, o = n, c = d(), l = i(), { t: u } = a(), g = _e(), _ = p(), v = F(() => _.isFavorite(r.media.id)), y = F(() => _.likeLevel(r.media.id));
		function b() {
			_.toggleFavorite(r.media.id, ye());
		}
		function S(e) {
			_.setLike(r.media.id, e, ye());
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
		], w = K(null), T = K(null), E = K(!0), D = K(!1), O = K(!1), k = K(!1), A = K(!1), j = K(!1), te = K(!1), ne = K(null), re = K(null), ie = K(!1), ae = f(), oe = K(!1), ce = F(() => A.value ? 1.35 : 1), M = K(jn(r.streamUrl, r.media.path)), le = F(() => Hn(r.media.streams)), ue = 0;
		async function N() {
			let e = ++ue;
			if (M.value) return;
			let t = await Jn([r.streamUrl, r.media.path], r.playbackAudioTracks ?? [], le.value);
			e === ue && (!t || M.value || (M.value = !0, Ne(w.value?.currentTime ?? 0)));
		}
		X([() => r.playbackAudioTracks, le], () => {
			N();
		}, { immediate: !0 });
		let pe = be("phlixConfig", null), me = be("resumeReporter", null), he = !1;
		function ye() {
			return pe?.apiBase ?? "";
		}
		let H = Ye({
			apiBase: () => r.apiBase ?? "",
			hlsConfig: pe?.playerHlsConfig
		}), xe = et({ apiBase: () => r.apiBase ?? "" }), W = null;
		function Te(e) {
			W !== null && clearTimeout(W), W = setTimeout(() => {
				W = null, xe.fetch(e);
			}, 0);
		}
		let Ee = F(() => r.thumbnailAt ?? xe.thumbnailAt), Oe = F(() => M.value ? void 0 : r.streamUrl), ke = F(() => M.value && H.state.value !== "ready"), Ae = F(() => M.value && (H.state.value === "preparing" || H.state.value === "idle")), Me = F(() => M.value && H.state.value === "error");
		function Ne(e = 0) {
			let t = w.value;
			t && H.start(t, r.media.id, void 0, e);
		}
		function Pe(e) {
			if (c.quality === "original" && e !== "auto") {
				H.loadVariantPlaylist(mt);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				H.loadVariantPlaylist(e);
				return;
			}
			H.setLevel(e);
		}
		let Fe = !1;
		function Le() {
			l.defaultQuality = pt;
		}
		function Q() {
			let e = H.levels.value;
			if (e.length === 0) return !1;
			let t = l.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = H.variants.value;
				if (!t || t.length === 0) return !1;
				if (xt(e, t)) H.loadVariantPlaylist(mt);
				else {
					let t = bt(e);
					t >= 0 && H.setNextLevel(t), Le();
				}
				return !0;
			}
			let n = vt(e, t);
			return n >= 0 ? H.setNextLevel(n) : Le(), !0;
		}
		X(() => H.levels.value, (e) => {
			Fe || e.length === 0 || Q() && (Fe = !0);
		}), X(() => H.variants.value, (e) => {
			Fe || !e?.length || Se(() => {
				Fe || Q() && (Fe = !0);
			});
		}, { deep: !0 });
		let Re = K(c.resumePositionFor(r.media.id) ?? 0), ze = K(!M.value && Re.value > 0), Be = null, Ve = K(!1), He = K(8), Ue, We = K(null), Ge = K(0), Ke = K(!1), qe = K([]), Je = K(!1), Xe = K(null);
		function Ze(e, t) {
			We.value = e, Ge.value = t, qe.value = [], Xe.value = null, Ke.value = !0, rt(e, t);
		}
		let Qe = null, $e = null, tt = null;
		function nt() {
			let e = r.apiBase ?? "";
			return ($e === null || tt !== e) && ($e = new s({ baseUrl: e }), tt = e), $e;
		}
		async function rt(e, t) {
			Qe?.abort(), Qe = new AbortController(), Je.value = !0, Xe.value = null;
			try {
				let n = await nt().searchByMarker(e, t, 30, 20, Qe.signal);
				qe.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Xe.value = "Failed to load similar media. Please try again.", qe.value = [];
			} finally {
				Je.value = !1;
			}
		}
		function it() {
			Qe?.abort(), Ke.value = !1, qe.value = [], Xe.value = null, We.value = null;
		}
		let at = F(() => c.upNext);
		function ot() {
			M.value = jn(r.streamUrl, r.media.path), N(), Re.value = c.resumePositionFor(r.media.id) ?? 0, ze.value = !M.value && Re.value > 0, Be = null, rn = !1, Wt = !1, Vt.value = [], Bt.value = !1, Gt = !1, Nt.value = -1, Zt = null, Fe = !1, he = !1, ht(), Ve.value = !1, H.reset(), w.value && (w.value.currentTime = 0), M.value && Ne(), Te(r.media.id);
		}
		function st(e) {
			let t = w.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Be = Math.max(0, e));
		}
		function ct() {
			st(Re.value), ze.value = !1, w.value?.play()?.catch(() => {});
		}
		function ut() {
			Be = null, st(0), c.clearResume(r.media.id), ze.value = !1, w.value?.play()?.catch(() => {});
		}
		function ht() {
			Ue &&= (clearInterval(Ue), void 0);
		}
		function gt() {
			He.value = 8, ht(), Ue = setInterval(() => {
				--He.value, He.value <= 0 && (ht(), yt());
			}, 1e3);
		}
		function _t() {
			he || (he = !0, me?.finish()), Vn(), E.value = !0, c.upNext && (Ve.value = !0, l.autoplay && gt());
		}
		function yt() {
			ht(), Ve.value = !1;
			let e = c.next(r.streamUrlFor);
			e && o("play-next", e);
		}
		function St() {
			ht(), Ve.value = !1;
		}
		function Tt() {
			if (M.value) return;
			let e = w.value, t = Nn(e) && (e?.currentTime ?? 0) === 0;
			(Mn(e) || t) && (M.value = !0, Ne(e?.currentTime ?? 0));
		}
		let Et = K([]), Dt = K([]), Ot = K(-1), kt = K(!1), At = F(() => H.state.value === "ready" && H.audioTracks.value.length > 0), jt = F(() => H.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Mt = F(() => (r.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Nt = K(-1), Pt = F(() => !At.value && !M.value && Dt.value.length === 0 && Mt.value.length > 1), Ft = F(() => At.value ? jt.value : Pt.value ? Mt.value : Dt.value), It = F(() => {
			if (At.value) return H.currentAudioTrack.value;
			if (Pt.value) {
				if (Nt.value >= 0) return Nt.value;
				let e = (r.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : r.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Ot.value;
		}), Lt = K(!1), Rt = c.subtitleLang, zt = F(() => {
			let e = M.value ? H.subtitleTracks.value : r.playbackSubtitleTracks ?? [];
			if (Vt.value.length === 0) return e;
			let t = (e) => e.url.split("?")[0], n = new Set(e.map(t)), i = Vt.value.filter((e) => !n.has(t(e)));
			return i.length === 0 ? e : [...e, ...i];
		}), Bt = K(!1), Vt = K([]), Ht = F(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(l.defaultSubtitleLang), t(l.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function Ut(e) {
			Vt.value.some((t) => t.url === e.url) || (Vt.value = [...Vt.value, e]);
		}
		let Wt = !1, Gt = !1;
		function Kt() {
			if (Wt) return;
			if (l.subtitlePreferenceSet) {
				Wt = !0;
				return;
			}
			let e = zt.value.find((e) => e.default);
			if (!e) return;
			let t = Et.value.find((t) => t.language === (e.language || e.label));
			t && (c.setSubtitle(t.language), Rt = t.language, Wt = !0);
		}
		function qt() {
			if (Gt) return;
			let e = l.defaultAudioLang;
			if (!e) return;
			let t = Ft.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = It.value;
			r >= 0 && r < t.length || (Qt(n), Gt = !0);
		}
		let Jt = F(() => Et.value.some((e) => e.language === c.subtitleLang));
		function Yt() {
			let e = w.value;
			Et.value = ge(e), Dt.value = de(e), Ot.value = se(e), Kt(), qt();
		}
		function Xt() {
			if (Jt.value) Rt = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = Rt && Et.value.some((e) => e.language === Rt) ? Rt : Et.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			o("captions");
		}
		let Zt = null;
		function Qt(e) {
			if (At.value) H.setAudioTrack(e);
			else if (Pt.value) {
				if (e === It.value) return;
				Nt.value = e, Zt = e, M.value = !0, Ne(w.value?.currentTime ?? 0);
			} else fe(w.value, e), Ot.value = e;
		}
		X(At, (e) => {
			if (!e || Zt === null) return;
			let t = Zt;
			Zt = null, t >= 0 && t < H.audioTracks.value.length && H.setAudioTrack(t);
		}), X(zt, () => {
			Se(() => Yt());
		}, { deep: !0 });
		let en = null, tn, nn = F(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), rn = !1;
		function an() {
			if (!r.autoplay || rn || ze.value || ke.value) return;
			let e = w.value;
			if (!e || !e.paused) return;
			rn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, c.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function on() {
			an();
		}
		function sn() {
			r.prevEpisode && o("play-episode", r.prevEpisode);
		}
		function cn() {
			r.nextEpisode && o("play-episode", r.nextEpisode);
		}
		function ln() {
			let e = w.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function un(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function dn() {
			c.play(), c.setMediaPositionState();
		}
		function fn() {
			c.pause(), c.setMediaPositionState();
		}
		function pn() {
			let e = w.value;
			e && c.updateProgress(e.currentTime, e.duration, un(e));
		}
		function mn() {
			let e = w.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, Be !== null && (e.currentTime = e.duration ? Math.min(e.duration, Be) : Be, Be = null), c.updateProgress(e.currentTime, e.duration, un(e)), c.setMediaPositionState(), Yt());
		}
		function hn() {
			let e = w.value;
			e && c.updateProgress(e.currentTime, e.duration, un(e));
		}
		function _n() {
			let e = w.value;
			e && (Math.abs(e.volume - c.volume) > .001 && c.setVolume(e.volume), e.muted !== c.muted && c.toggleMute());
		}
		function vn() {
			let e = w.value;
			e && e.playbackRate !== c.rate && c.setRate(e.playbackRate), c.setMediaPositionState();
		}
		function yn() {
			c.setMediaPositionState();
		}
		function bn() {
			c.setMediaPositionState();
		}
		function $(e) {
			let t = w.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function xn() {
			O.value = !0, Wn();
		}
		function Cn() {
			O.value = !1, Wn();
		}
		function wn(e) {
			let t = C.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(C[e] - c.rate) ? n : e, 0), n = C[Math.min(C.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		function Tn() {
			if (!r.markers) return;
			let e = c.position, t = r.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function En() {
			if (!r.markers) return;
			let e = c.position, t = r.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function On() {
			ne.value?.toggleOpen();
		}
		let kn = null;
		function An() {
			let e = w.value;
			if (!e) {
				c.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), c.pause();
				return;
			}
			kn !== null && (clearInterval(kn), kn = null);
			let t = .05;
			kn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(kn), kn = null, e.volume = 0, e.pause(), c.pause());
			}, 50);
		}
		h({
			playPause: ln,
			seekBy: (e) => $(c.position + e),
			frameStep: (e) => {
				c.playing || $(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: Pn,
			toggleFullscreen: In,
			toggleCaptions: Xt,
			toggleTheater: Fn,
			togglePip: Rn,
			skipIntro: Tn,
			skipOutro: En,
			sleepTimer: On,
			seekToPercent: (e) => $(e * c.duration),
			speedStep: wn,
			toggleHelp: () => {
				k.value = !k.value;
			},
			toggleQuality: () => {
				M.value ? (ie.value = !ie.value, re.value?.toggleMenu?.()) : ae.show({
					message: u("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !k.value && !kt.value && !Lt.value });
		function Pn() {
			c.toggleMute();
		}
		function Fn() {
			A.value = !A.value, o("theater", A.value);
		}
		X(() => c.muted, (e) => {
			let t = w.value;
			t && t.muted !== e && (t.muted = e);
		}), X(() => c.volume, (e) => {
			let t = w.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), X(() => c.rate, (e) => {
			let t = w.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), X(() => c.lastCommand, (e) => {
			e && (e.type === "seekTo" ? st(e.value) : e.type === "seekBy" && st(c.position + e.value));
		});
		function In() {
			if (typeof document > "u") return;
			let e = T.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function Ln() {
			D.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Rn() {
			let e = w.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function zn() {
			j.value = !0;
		}
		function Bn() {
			j.value = !1;
		}
		function Vn() {
			tn &&= (clearTimeout(tn), void 0);
		}
		function Un() {
			Vn(), !(!c.playing || O.value) && (tn = setTimeout(() => {
				c.playing && !O.value && (E.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function Wn() {
			E.value = !0, Un();
		}
		X(() => c.playing, (e) => {
			e ? (ze.value = !1, St(), Un()) : (Vn(), E.value = !0);
		});
		let Gn = null;
		return we(() => {
			c.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), _.hydrate(r.media), typeof document < "u" && (document.addEventListener("fullscreenchange", Ln), te.value = document.pictureInPictureEnabled === !0), Gn = c.bindMediaSession({
				onPlay: () => void w.value?.play()?.catch(() => {}),
				onPause: () => w.value?.pause(),
				onSeek: (e) => $(e)
			}), en = w.value?.textTracks ?? null, en?.addEventListener?.("addtrack", Yt), en?.addEventListener?.("removetrack", Yt), Yt(), M.value && Ne(), Te(r.media.id);
		}), X(() => r.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), ot();
		}), X(() => r.media?.id, () => {
			_.hydrate(r.media);
		}), X(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (w.value?.play(), c.play()) : e.state === "paused" && (w.value?.pause(), c.pause()), g.updateLocalPosition(c.position), Math.abs(g.driftAmount) > 2 && st(e.playbackPosition));
		}), Ce(() => {
			Vn(), ht(), H.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", Ln), Gn?.(), en?.removeEventListener?.("addtrack", Yt), en?.removeEventListener?.("removetrack", Yt), kn !== null && (clearInterval(kn), kn = null), W !== null && (clearTimeout(W), W = null);
		}), (n, r) => (G(), R("div", {
			ref_key: "containerRef",
			ref: T,
			class: U(["player", {
				"is-chrome-hidden": !E.value,
				"is-theater": A.value
			}]),
			onPointermove: Wn,
			onPointerdown: Wn,
			onFocusin: Wn
		}, [V(Sn, {
			video: w.value,
			enabled: Y(l).atmosphere,
			playing: Y(c).playing,
			"reduced-motion": Y(l).effectiveReducedMotion,
			intensity: ce.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), z("div", vi, [
			z("video", {
				ref_key: "videoRef",
				ref: w,
				class: "player__video",
				src: Oe.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: dn,
				onPause: fn,
				onTimeupdate: pn,
				onLoadedmetadata: mn,
				onCanplay: on,
				onProgress: hn,
				onVolumechange: _n,
				onRatechange: vn,
				onSeeked: yn,
				onDurationchange: bn,
				onEnded: _t,
				onError: Tt,
				onEnterpictureinpicture: zn,
				onLeavepictureinpicture: Bn,
				onClick: ln
			}, [(G(!0), R(P, null, q(zt.value, (e) => (G(), R("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, bi))), 128))], 40, yi),
			r[20] ||= z("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[21] ||= z("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			z("div", xi, [z("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Y(u)("player.back"),
				onClick: r[0] ||= De((e) => o("back"), ["stop"])
			}, [V(t, { name: "arrow-left" })], 8, Si), z("div", Ci, [
				z("p", wi, J(Y(u)("player.nowPlaying")), 1),
				z("h2", Ti, J(e.media.name), 1),
				z("div", Ei, [(G(!0), R(P, null, q(nn.value, (e, t) => (G(), R(P, { key: t }, [t > 0 && !e.cert ? (G(), R("span", Di, "·")) : L("", !0), z("span", { class: U({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			ke.value ? L("", !0) : (G(), R("div", Oi, [z("button", {
				type: "button",
				class: U(["player__bigplay", { "is-playing": Y(c).playing }]),
				"aria-label": Y(c).playing ? Y(u)("player.pause") : Y(u)("player.play"),
				onClick: De(ln, ["stop"])
			}, [V(t, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, ki)])),
			V(wt, {
				video: w.value,
				language: Y(c).subtitleLang,
				"style-config": Y(l).captionStyle,
				lifted: E.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			ke.value ? L("", !0) : (G(), R("div", {
				key: 1,
				class: "player__controls",
				onClick: r[7] ||= De(() => {}, ["stop"])
			}, [
				V(Ie, {
					position: Y(c).position,
					duration: Y(c).duration,
					buffered: Y(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": Ee.value,
					onSeek: $,
					onScrubStart: xn,
					onScrubEnd: Cn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				Y(l).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), I(Wr, {
					key: 0,
					position: Y(c).position,
					duration: Y(c).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: Ze
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : L("", !0),
				z("div", Ai, [
					e.prevEpisode ? (G(), R("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(u)("player.previousEpisode"),
						onClick: sn
					}, [V(t, { name: "skip-back" })], 8, ji)) : L("", !0),
					z("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Y(c).playing ? Y(u)("player.pause") : Y(u)("player.play"),
						onClick: ln
					}, [V(t, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Mi),
					e.nextEpisode ? (G(), R("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(u)("player.nextEpisode"),
						onClick: cn
					}, [V(t, { name: "skip-forward" })], 8, Ni)) : L("", !0),
					z("span", Pi, [
						B(J(Y(je)(Y(c).position)), 1),
						r[16] ||= z("span", { class: "player__sep" }, " / ", -1),
						B(J(Y(je)(Y(c).duration)), 1)
					]),
					r[17] ||= z("span", { class: "player__grow" }, null, -1),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": v.value ? "true" : "false",
						onClick: b
					}, [V(t, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Fi),
					V(m, {
						level: y.value,
						onCycle: S
					}, null, 8, ["level"]),
					V(dt),
					V(ft),
					V(Ct, {
						ref_key: "qualityMenuRef",
						ref: re,
						open: ie.value,
						"onUpdate:open": r[1] ||= (e) => ie.value = e,
						levels: Y(H).levels.value,
						variants: Y(H).variants.value,
						"current-level": Y(H).currentLevel.value,
						"auto-enabled": Y(H).autoEnabled.value,
						"active-height": Y(H).activeLevelHeight.value,
						onSelect: Pe
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					M.value ? L("", !0) : (G(), R("span", {
						key: 2,
						class: "player__direct-badge",
						title: Y(u)("player.qualityDirectStream")
					}, J(Y(u)("player.directStream")), 9, Ii)),
					V($t, {
						open: kt.value,
						"onUpdate:open": r[2] ||= (e) => kt.value = e,
						tracks: Et.value,
						"audio-tracks": Ft.value,
						"active-audio": It.value,
						onSelectAudio: Qt,
						onAddSubtitles: r[3] ||= (e) => Bt.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					V(Ir, {
						open: Lt.value,
						"onUpdate:open": r[4] ||= (e) => Lt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					V(Yr, {
						ref_key: "sleepTimerRef",
						ref: ne,
						"on-expire": An
					}, null, 512),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__syncplay", { "is-on": Y(g).isInRoom }]),
						"aria-label": Y(g).isInRoom ? Y(u)("syncplay.inRoom") : Y(u)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[5] ||= (e) => oe.value = !0
					}, [V(t, { name: "user" })], 10, Li),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(u)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[6] ||= (e) => k.value = !0
					}, [V(t, { name: "info" })], 8, Ri),
					te.value ? (G(), R("button", {
						key: 3,
						type: "button",
						class: U(["player__iconbtn", { "is-on": j.value }]),
						"aria-label": j.value ? Y(u)("player.exitPip") : Y(u)("player.pip"),
						"aria-pressed": j.value,
						onClick: Rn
					}, [V(t, { name: "pip" })], 10, zi)) : L("", !0),
					z("button", {
						type: "button",
						class: U(["player__iconbtn", { "is-on": A.value }]),
						"aria-label": A.value ? Y(u)("player.exitTheater") : Y(u)("player.theater"),
						"aria-pressed": A.value,
						onClick: Fn
					}, [V(t, { name: "theater" })], 10, Bi),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": D.value ? Y(u)("player.exitFullscreen") : Y(u)("player.fullscreen"),
						onClick: In
					}, [V(t, { name: D.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Vi)
				])
			])),
			ke.value ? L("", !0) : (G(), I(_r, {
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
			ke.value ? L("", !0) : (G(), I(Cr, {
				key: 3,
				position: Y(c).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			ze.value && !ke.value ? (G(), I(Dn, {
				key: 4,
				seconds: Re.value,
				onResume: ct,
				onRestart: ut
			}, null, 8, ["seconds"])) : L("", !0),
			Ve.value && at.value && !ke.value ? (G(), I(ar, {
				key: 5,
				media: at.value,
				remaining: He.value,
				total: Y(8),
				counting: Y(l).autoplay,
				onPlayNow: yt,
				onCancel: St
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : L("", !0),
			V(ee, {
				modelValue: Ke.value,
				"onUpdate:modelValue": r[8] ||= (e) => Ke.value = e,
				title: `Similar ${We.value ?? "marker"}s`,
				size: "lg",
				onClose: it
			}, {
				default: Z(() => [z("div", Hi, [Je.value ? (G(), R("div", Ui, [V(x, { label: "Finding similar media" })])) : Xe.value ? (G(), R("div", Wi, [V(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), z("p", Gi, J(Xe.value), 1)])) : !Je.value && qe.value.length === 0 ? (G(), R("div", Ki, [
					V(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[18] ||= z("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[19] ||= z("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), R("ul", qi, [(G(!0), R(P, null, q(qe.value, (e) => (G(), R("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [z("div", Ji, [e.poster_url ? (G(), R("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Yi)) : (G(), R("div", Xi, [V(t, { name: "film" })]))]), z("div", Zi, [z("p", Qi, J(e.name), 1), e.year ? (G(), R("p", $i, [B(J(e.year) + " ", 1), e.runtime ? (G(), R("span", ea, " · " + J(e.runtime) + "m", 1)) : L("", !0)])) : L("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Ae.value ? (G(), I(gr, {
				key: 6,
				title: e.media.name,
				progress: Y(H).progress.value,
				onBack: r[9] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : L("", !0),
			Me.value ? (G(), I(ur, {
				key: 7,
				title: e.media.name,
				onBack: r[10] ||= (e) => o("back")
			}, null, 8, ["title"])) : L("", !0),
			Y(g).isInRoom ? (G(), I(_i, {
				key: 8,
				position: Y(c).position,
				duration: Y(c).duration,
				"is-playing": Y(c).playing,
				onSeek: $,
				onPlay: r[11] ||= (e) => void w.value?.play(),
				onPause: r[12] ||= (e) => void w.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : L("", !0),
			Y(g).isInRoom ? (G(), I(ai, { key: 9 })) : L("", !0),
			V(ve, {
				modelValue: oe.value,
				"onUpdate:modelValue": r[13] ||= (e) => oe.value = e
			}, null, 8, ["modelValue"]),
			V(lt, {
				open: k.value,
				onClose: r[14] ||= (e) => k.value = !1
			}, null, 8, ["open"]),
			V(gn, {
				open: Bt.value,
				"onUpdate:open": r[15] ||= (e) => Bt.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": Ht.value,
				onAdded: Ut
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-c8efba03"]]), na = { class: "player-page__stage" }, ra = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, ia = { class: "player-page__blocking-error" }, aa = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = l(), r = u(), i = ke(), a = Ae(), o = d(), f = p(), m = _(), h = K(null), g = K(""), v = K([]), y = K(null), b = K(null), x = K([]), w = K([]), T = K(!0), E = K(null), D = K(!1), se = K(null), ce = K(!1), M = K(null), le = K(null), ue = F(() => String(i.params.id ?? ""));
		S(() => h.value?.name);
		let de = F(() => {
			let e = h.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), N = null, fe = !1;
		function pe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function me(e) {
			let t = r.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function he(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function ge(e, t) {
			let r = N, i = () => fe || r !== N, a = t.genres?.[0];
			if (!a) {
				o.setQueue([]);
				return;
			}
			try {
				let s = A(n.value, {
					genres: [a],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(s, void 0, r?.signal);
				if (i()) return;
				o.setQueue((c.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || pe(e)) return;
				o.setQueue([]);
			}
		}
		async function _e(e, t, r) {
			let i = A(n.value, {
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
		function P(e, t) {
			M.value = ne(e, t), le.value = re(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && o.setQueue(r);
		}
		function ye(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function H(e, n) {
			if (M.value = null, le.value = null, !(n.type === "episode" || (n.episode_number ?? null) !== null)) return;
			let r = ye(n.id);
			if (r) {
				P(r, n.id);
				return;
			}
			let i = N, a = () => fe || i !== N;
			try {
				let r = await ve(e, n, i?.signal);
				if (a()) return;
				let o = await _e(e, r.id, i?.signal);
				if (a()) return;
				if (te(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => _e(e, t.id, i?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = j(o);
				s.length && t.set(r.id, s), P(s, n.id);
			} catch (e) {
				if (a() || pe(e)) return;
				M.value = null, le.value = null;
			}
		}
		async function be() {
			let e = ue.value;
			if (N?.abort(), N = typeof AbortController < "u" ? new AbortController() : null, T.value = !0, E.value = null, v.value = [], y.value = null, b.value = null, x.value = [], w.value = [], M.value = null, le.value = null, o.hideMiniPlayer(), !e) {
				E.value = "No media id provided", T.value = !1;
				return;
			}
			let t = new s({ baseUrl: n.value });
			t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, N?.signal).then((e) => {
				fe || (v.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), y.value = he(e?.intro_marker), b.value = he(e?.outro_marker), x.value = Pn(e?.audio_tracks), w.value = Be(e?.subtitle_tracks));
			}).catch(() => null);
			let r = ie(e), i = Date.now();
			if (r && ae(r, i)) {
				xe(t, r.item);
				return;
			}
			let a = null;
			try {
				a = (await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, N?.signal)).item;
			} catch (e) {
				if (fe || pe(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						se.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", ce.value = !0, T.value = !1;
						return;
					}
				}
				if (r) {
					xe(t, r.item);
					return;
				}
				E.value = e instanceof Error ? e.message : "Failed to load media", T.value = !1;
				return;
			}
			if (!fe) {
				if (!a) {
					if (r) {
						xe(t, r.item);
						return;
					}
					E.value = "Failed to load media item", T.value = !1;
					return;
				}
				oe(e, a, i), xe(t, a);
			}
		}
		async function xe(e, t) {
			h.value = t, f.hydrate(t), g.value = me(t), T.value = !1, !((t.episode_number ?? null) !== null && (await H(e, t), le.value)) && ge(e, t);
		}
		we(be), X(ue, be), Oe(() => {
			o.current && o.streamUrl && o.showMiniPlayer();
		}), Ce(() => {
			fe = !0, N?.abort(), N = null, m.reset();
		});
		function Se() {
			a?.back();
		}
		function q(e) {
			a?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Te(e) {
			a?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ee(e) {
			D.value = e, m.setTheaterActive(e);
		}
		function De() {
			ce.value = !1, Se();
		}
		return (e, t) => (G(), R("div", { class: U(["player-page", { "is-theater": D.value }]) }, [
			de.value && !T.value && !E.value ? (G(), R("div", {
				key: 0,
				class: "player-page__ambient",
				style: W(de.value),
				"aria-hidden": "true"
			}, null, 4)) : L("", !0),
			z("div", na, [T.value ? (G(), R("div", ra, [V(O, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : E.value ? (G(), I(k, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: E.value
			}, {
				actions: Z(() => [V(C, {
					variant: "solid",
					onClick: be
				}, {
					default: Z(() => [...t[1] ||= [B("Retry", -1)]]),
					_: 1
				}), V(C, {
					variant: "ghost",
					onClick: Se
				}, {
					default: Z(() => [...t[2] ||= [B("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : h.value ? (G(), I(ta, {
				key: 2,
				media: h.value,
				"stream-url": g.value,
				"stream-url-for": me,
				"api-base": Y(n),
				chapters: v.value,
				"intro-marker": y.value,
				"outro-marker": b.value,
				"playback-audio-tracks": x.value,
				"playback-subtitle-tracks": w.value,
				"prev-episode": M.value,
				"next-episode": le.value,
				autoplay: !0,
				onBack: Se,
				onPlayNext: q,
				onPlayEpisode: Te,
				onTheater: Ee
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
			V(ee, {
				modelValue: ce.value,
				"onUpdate:modelValue": t[0] ||= (e) => ce.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Z(() => [V(C, {
					variant: "solid",
					onClick: De
				}, {
					default: Z(() => [...t[3] ||= [B("OK", -1)]]),
					_: 1
				})]),
				default: Z(() => [z("p", ia, J(se.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-3153e8a3"]]);
//#endregion
export { aa as default };

//# sourceMappingURL=PlayerPage-DuosH8Xz.js.map