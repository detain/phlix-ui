import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { n, t as r } from "./Modal-CqhoiLRk.js";
import { t as i } from "./useFocusTrap-DZxA3ZEr.js";
import { a } from "./usePreferencesStore-C9GLbD7G.js";
import { t as o } from "./useMessages-3JohNwBc.js";
import { c as s, l as c, t as l } from "./client-BzWwyWKr.js";
import { n as u, r as d } from "./useApiBase-CV_r-Kk4.js";
import { i as f } from "./usePlayerStore-Dgw0JCWb.js";
import { t as p } from "./useToastStore-BDoKlU6N.js";
import { n as m, t as h } from "./ThumbRating-BxiWuYAs.js";
import { a as g, n as _, o as v, r as y, s as b, t as x } from "./shortcuts-C7eaVLrT.js";
import { t as S } from "./Spinner-C4utUvmQ.js";
import { i as C } from "./usePageTitle-BO3GGF3M.js";
import { t as w } from "./Button-DWa6Ld_Z.js";
import { t as T } from "./Badge-B6MgOwKQ.js";
import { t as E } from "./Slider-LnnvB5jy.js";
import { t as D } from "./Chip-DHwBdvXS.js";
import { t as O } from "./Select-Cvp-73pF.js";
import { t as k } from "./Skeleton-DhQmxeNg.js";
import { t as A } from "./EmptyState-ZlI5t4KT.js";
import { n as j } from "./media-query-DKjhlX8r.js";
import { n as M, o as ee, r as te, t as ne } from "./episode-order-C2yqgMeX.js";
import { n as re, r as ie, t as ae } from "./useMediaItemCache-BKCJnCbr.js";
import { a as oe, c as se, d as N, f as ce, i as le, l as ue, n as de, o as fe, r as pe, s as me, t as P, u as he } from "./captions-DoP7ce5A.js";
import { n as ge, t as _e } from "./SyncPlayModal-CFyEx4SX.js";
import { Fragment as F, Transition as ve, computed as I, createBlock as L, createCommentVNode as R, createElementBlock as z, createElementVNode as B, createTextVNode as V, createVNode as H, defineComponent as U, inject as ye, mergeModels as be, nextTick as xe, normalizeClass as W, normalizeStyle as Se, onBeforeUnmount as Ce, onMounted as we, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as Te, unref as Y, useModel as Ee, watch as X, withCtx as Z, withModifiers as De } from "vue";
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
], Ne = { class: "scrubber__track" }, Pe = ["title"], Fe = { class: "scrubber__time numeric" }, Ie = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		let { t: r } = o(), i = e, a = n, s = K(null), c = K(!1), l = K(!1), u = K(0), d = K(0), f = (e) => Math.min(1, Math.max(0, e)), p = I(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = I(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = I(() => (c.value || l.value) && i.duration > 0), g = I(() => c.value ? u.value : d.value), _ = I(() => g.value * i.duration), v = I(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = I(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = I(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = I(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
			u.value = t, a("scrub-start"), e.preventDefault();
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
				a("seek", u.value * i.duration), a("scrub-end");
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
			a("seek", n), e.preventDefault();
		}
		return t({
			playedRatio: p,
			previewActive: h
		}), (t, n) => (G(), z("div", {
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
			onKeydown: O
		}, [B("div", Ne, [
			B("div", {
				class: "scrubber__buffered",
				style: Se({ transform: `scaleX(${m.value})` })
			}, null, 4),
			B("div", {
				class: "scrubber__played",
				style: Se({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(G(!0), z(F, null, q(x.value, (e, t) => (G(), z("span", {
				key: t,
				class: "scrubber__tick",
				style: Se({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Pe))), 128)),
			B("div", {
				class: W(["scrubber__head", { "is-dragging": c.value }]),
				style: Se({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (G(), z("div", {
			key: 0,
			class: "scrubber__preview",
			style: Se({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (G(), z("div", {
			key: 0,
			class: "scrubber__thumb",
			style: Se({ backgroundImage: y.value })
		}, null, 4)) : R("", !0), B("span", Fe, J(Y(je)(_.value)), 1)], 4)) : R("", !0)], 40, Me));
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
	let t = K("idle"), n = K(0), r = K([]), i = K([]), a = K(-1), o = K(!0), s = K(null), c = K(null), u = K([]), d = K(-1), p = K(null), m = K(null);
	function h(e) {
		if (!k) return;
		i.value = k.levels, a.value = k.getCurrentLevel(), o.value = k.autoLevelEnabled;
		let t = e ?? k.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function g() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function _(e) {
		k && (u.value = k.audioTracks, d.value = e ?? k.getCurrentAudioTrack());
	}
	function v() {
		u.value = [], d.value = -1;
	}
	function y(e) {
		!e || e.length === 0 || (c.value = e);
	}
	function x(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: Je(n, e.url)
		}));
	}
	let S = e.attach ?? b, C = e.pollIntervalMs ?? 1e3, w = e.maxWaitMs ?? 12e4, T = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), E = Math.max(1, Math.ceil(w / Math.max(1, C))), D = Xe(), O = e.getToken ?? (() => Ze(D)), k = null, A = null, j = null, M = !1, ee = null;
	function te() {
		return e.client ?? new l({
			baseUrl: e.apiBase(),
			tokenStore: D ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function ne(i, a, o, s) {
		se(), M = !1, ee = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = te(), c = We(await r.post(He(a, o), void 0, ee.signal));
			if (M) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			x(c.subtitles), y(c.variants), p.value = c.jobId, m.value = Je(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < E; e++) {
				let e = Ge(await r.get(Ue(c.jobId), void 0, ee.signal));
				if (M) return;
				if (n.value = e.progress, x(e.subtitles), y(e.variants), qe(e.status)) throw Error(`transcode ${e.status}`);
				if (Ke(e)) {
					l = !0;
					break;
				}
				if (await T(C), M) return;
			}
			if (!l) throw Error("transcode timed out");
			if (k = await S(i, m.value, {
				getToken: O,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => h(),
				onError: () => {
					M || (t.value = "error");
				}
			}), M) {
				k.destroy(), k = null;
				return;
			}
			A = k.onLevelSwitched((e) => h(e)), j = k.onAudioTrackSwitched((e) => _(e)), h(), _();
			try {
				let e = f();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			M || (t.value = "error");
		}
	}
	function re(e) {
		k && (k.setCurrentLevel(e === "auto" ? -1 : e), h());
	}
	function ie(e) {
		k && (k.setNextLevel(e === "auto" ? -1 : e), h());
	}
	function ae(e) {
		k && (k.setAudioTrack(e), _());
	}
	function oe(e) {
		if (!k || !m.value) return;
		let t = m.value.replace("master.m3u8", `media_v${e}.m3u8`);
		k.loadSource(t), g();
	}
	function se() {
		if (M = !0, ee &&= (ee.abort(), null), A) {
			try {
				A();
			} catch {}
			A = null;
		}
		if (j) {
			try {
				j();
			} catch {}
			j = null;
		}
		if (k) {
			try {
				k.destroy();
			} catch {}
			k = null;
		}
		p.value = null, m.value = null;
	}
	function N() {
		se(), t.value = "idle", n.value = 0, r.value = [], g(), v();
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
		setLevel: re,
		setNextLevel: ie,
		setAudioTrack: ae,
		jobId: p,
		masterUrl: m,
		loadVariantPlaylist: oe,
		start: ne,
		cleanup: se,
		reset: N
	};
}
function Xe() {
	try {
		return new s();
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
		let i = r.frame, a = i % Qe, s = Math.floor(i / Qe), c = a / (Qe - 1) * 100, l = s / ($e - 1) * 100;
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
var tt = ["aria-label"], nt = { class: "shortcuts__head" }, rt = { class: "shortcuts__title" }, it = { class: "shortcuts__grid" }, at = { class: "shortcuts__keys" }, ot = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, st = {
	key: 1,
	class: "shortcuts__key"
}, ct = { class: "shortcuts__label" }, lt = /*#__PURE__*/ e(/* @__PURE__ */ U({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => y }
	},
	emits: ["close"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o(), l = K(null);
		return i(l, Te(a, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (G(), z("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= De((e) => s("close"), ["self"])
		}, [B("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [B("div", nt, [B("h3", rt, J(Y(c)("player.keyboard")), 1), H(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), B("ul", it, [(G(!0), z(F, null, q(e.shortcuts, (e) => (G(), z("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [B("span", at, [(G(!0), z(F, null, q(e.keys, (e, n) => (G(), z(F, { key: n }, [e === "–" ? (G(), z("span", ot, "–")) : (G(), z("kbd", st, [Y(x)[e] ? (G(), L(t, {
			key: 0,
			name: Y(x)[e],
			label: Y(_)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), z(F, { key: 1 }, [V(J(e), 1)], 64))]))], 64))), 128))]), B("span", ct, J(e.label), 1)]))), 128))])], 8, tt)])) : R("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), ut = { class: "volume" }, dt = /*#__PURE__*/ e(/* @__PURE__ */ U({
	__name: "VolumeControl",
	setup(e) {
		let t = f(), r = a(), { t: i } = o(), s = I(() => t.muted ? 0 : t.volume), c = I(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return X(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (G(), z("div", ut, [H(n, {
			name: c.value,
			label: Y(t).muted ? Y(i)("player.unmute") : Y(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => Y(t).toggleMute()
		}, null, 8, ["name", "label"]), H(E, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), ft = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		], n = f(), { t: r } = o(), i = I(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), L(O, {
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
var Ct = /*#__PURE__*/ e(/* @__PURE__ */ U({
	__name: "QualityMenu",
	props: /*@__PURE__*/ be({
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
	emits: /*@__PURE__*/ be(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, i = Ee(e, "open"), s = K(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = f(), d = a(), { t: p } = o(), m = I(() => _t(r.levels)), h = I(() => {
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
		}), g = I(() => m.value.length >= 2 ? m.value : h.value), _ = I(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = I(() => yt(r.levels, _.value)), y = I(() => _.value && v.value >= 0 ? {
			value: mt,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = I(() => g.value.length >= 2), x = I(() => r.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: gt(r.activeHeight) })), S = I(() => [
			{
				value: pt,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), C = I(() => r.autoEnabled ? pt : y.value && r.currentLevel === v.value && (u.quality === "original" || d.defaultQuality === "original") ? mt : St(r.levels, r.currentLevel));
		function w(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), d.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : vt(r.levels, t);
			u.setQuality(t), d.defaultQuality = t, n >= 0 ? l("select", n) : l("select", t);
		}
		return t({ toggleMenu: c }), (e, t) => b.value || i.value ? (G(), L(O, {
			key: 0,
			ref_key: "selectRef",
			ref: s,
			class: "quality-menu",
			tone: "glass",
			"model-value": C.value,
			options: S.value,
			label: Y(p)("player.quality"),
			open: i.value,
			"onUpdate:open": t[0] ||= (e) => i.value = e,
			"onUpdate:modelValue": w
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : R("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), wt = /*#__PURE__*/ e(/* @__PURE__ */ U({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = I(() => se(n.styleConfig)), a = null, o = null, s = null;
		function c() {
			r.value = N(a);
		}
		function l() {
			s != null && (clearTimeout(s), s = null);
		}
		function u() {
			l(), s = setTimeout(() => {
				if (s = null, !a) return;
				me(n.video, n.language);
				let e = N(a);
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
			let e = ce(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", c), r.value = N(e), !r.value.length) {
					let t = f(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", c));
				}
				u();
			} else r.value = [];
		}
		return X(() => [n.video, n.language], p, { immediate: !0 }), Ce(d), t({ lines: r }), (t, n) => r.value.length ? (G(), z("div", {
			key: 0,
			class: W(["player__captions", { "is-lifted": e.lifted }]),
			style: Se(i.value)
		}, [(G(!0), z(F, null, q(r.value, (e, t) => (G(), z("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : R("", !0);
	}
}), [["__scopeId", "data-v-b9f35f44"]]), Tt = ["aria-label", "aria-expanded"], Et = ["aria-label"], Dt = { class: "capmenu__head" }, Ot = { class: "capmenu__title" }, kt = ["aria-label"], At = ["aria-checked", "tabindex"], jt = { class: "capmenu__check" }, Mt = { class: "capmenu__optlabel" }, Nt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Pt = { class: "capmenu__check" }, Ft = { class: "capmenu__optlabel" }, It = { class: "capmenu__check" }, Lt = { class: "capmenu__optlabel" }, Rt = { class: "capmenu__title capmenu__title--sub" }, zt = ["aria-label"], Bt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Vt = { class: "capmenu__check" }, Ht = { class: "capmenu__optlabel" }, Ut = { class: "capmenu__title capmenu__title--sub" }, Wt = { class: "capmenu__style" }, Gt = { class: "capmenu__field" }, Kt = { class: "capmenu__fieldlabel" }, qt = { class: "capmenu__field" }, Jt = { class: "capmenu__fieldlabel" }, Yt = { class: "capmenu__field" }, Xt = { class: "capmenu__fieldlabel" }, Zt = { class: "capmenu__field" }, Qt = { class: "capmenu__fieldlabel" }, $t = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
	setup(e, { emit: r }) {
		let s = e, c = r, l = f(), u = a(), { t: d } = o(), p = K(null), m = K(null), h = I(() => l.subtitleLang), g = I(() => s.tracks.some((e) => e.language === h.value)), _ = I(() => g.value ? "captions" : "captions-off"), v = I(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = I(() => s.activeAudio >= 0 ? s.activeAudio : 0);
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
		function A(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function j(e) {
			u.captionStyle = {
				...u.captionStyle,
				background: e
			};
		}
		function M(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		i(m, Te(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function ee(e) {
			p.value && !p.value.contains(e.target) && x();
		}
		return X(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", ee, !0) : document.removeEventListener("pointerdown", ee, !0));
		}, { immediate: !0 }), Ce(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", ee, !0);
		}), (r, i) => (G(), z("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [B("button", {
			type: "button",
			class: W(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? Y(d)("player.captionsOn") : Y(d)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [H(t, { name: _.value }, null, 8, ["name"])], 10, Tt), e.open ? (G(), z("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			B("div", Dt, [B("h3", Ot, J(Y(d)("player.subtitles")), 1), H(n, {
				name: "x",
				label: Y(d)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			B("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(d)("player.subtitleTrack"),
				onKeydown: E
			}, [B("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => S(null)
			}, [B("span", jt, [g.value ? R("", !0) : (G(), L(t, {
				key: 0,
				name: "check"
			}))]), B("span", Mt, J(Y(d)("player.off")), 1)], 8, At), (G(!0), z(F, null, q(e.tracks, (e, n) => (G(), z("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [B("span", Pt, [h.value === e.language ? (G(), L(t, {
				key: 0,
				name: "check"
			})) : R("", !0)]), B("span", Ft, J(e.label), 1)], 8, Nt))), 128))], 40, kt),
			B("button", {
				type: "button",
				class: "capmenu__add",
				onClick: w
			}, [B("span", It, [H(t, { name: "plus" })]), B("span", Lt, J(Y(d)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (G(), z(F, { key: 0 }, [B("h3", Rt, J(Y(d)("player.audio")), 1), B("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(d)("player.audioTrack"),
				onKeydown: D
			}, [(G(!0), z(F, null, q(e.audioTracks, (n) => (G(), z("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => C(n.index)
			}, [B("span", Vt, [e.activeAudio === n.index ? (G(), L(t, {
				key: 0,
				name: "check"
			})) : R("", !0)]), B("span", Ht, J(n.label), 1)], 8, Bt))), 128))], 40, zt)], 64)) : R("", !0),
			B("h3", Ut, J(Y(d)("player.captionStyle")), 1),
			B("div", Wt, [
				B("div", Gt, [B("span", Kt, J(Y(d)("player.size")), 1), H(O, {
					"model-value": Y(u).captionStyle.size,
					options: Y(le),
					label: Y(d)("player.captionSize"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				B("div", qt, [B("span", Jt, J(Y(d)("player.color")), 1), H(O, {
					"model-value": Y(u).captionStyle.textColor,
					options: Y(de),
					label: Y(d)("player.captionColor"),
					"onUpdate:modelValue": A
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				B("div", Yt, [B("span", Xt, J(Y(d)("player.background")), 1), H(O, {
					"model-value": Y(u).captionStyle.background,
					options: Y(P),
					label: Y(d)("player.captionBackground"),
					"onUpdate:modelValue": j
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				B("div", Zt, [B("span", Qt, J(Y(d)("player.edge")), 1), H(O, {
					"model-value": Y(u).captionStyle.edge,
					options: Y(pe),
					label: Y(d)("player.captionEdge"),
					"onUpdate:modelValue": M
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Et)) : R("", !0)], 512));
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
}, gn = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		let i = e, a = n, { t: s } = o(), u = p(), d = [
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
		function f(e) {
			if (!e) return e;
			try {
				let t = Intl.DisplayNames;
				if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
			} catch {}
			return e;
		}
		let m = I(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...i.preferredLangs, ...d]) {
				let r = (n || "").toLowerCase();
				!r || e.has(r) || (e.add(r), t.push(r));
			}
			return t;
		}), h = K(/* @__PURE__ */ new Set());
		function g() {
			let e = /* @__PURE__ */ new Set();
			for (let t of i.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), h.value = e;
		}
		function _(e) {
			let t = new Set(h.value);
			t.has(e) ? t.delete(e) : t.add(e), h.value = t;
		}
		let v = K(!1), y = K(!1), b = K([]), x = K(/* @__PURE__ */ new Set()), C = K(/* @__PURE__ */ new Set());
		function E(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let O = I(() => [...b.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), k = I(() => h.value.size > 0 && !v.value);
		function j() {
			return i.client ?? new l({ baseUrl: i.apiBase ?? "" });
		}
		async function M() {
			if (k.value) {
				v.value = !0, y.value = !0;
				try {
					b.value = await j().searchSubtitles(i.mediaId, [...h.value]);
				} catch {
					b.value = [], u.error(s("player.subtitleSearchError"));
				} finally {
					v.value = !1;
				}
			}
		}
		function ee() {
			a("update:open", !1);
		}
		function te(e) {
			if (e instanceof c) {
				if (e.status === 429) {
					let t = e.body && typeof e.body == "object" ? e.body : {}, n = typeof t.downloadsRemaining == "number" ? t.downloadsRemaining : null, r = typeof t.resetTimeUtc == "string" ? t.resetTimeUtc : null;
					r ? u.warning(s("player.subtitleQuotaReset", { time: ne(r) })) : n === null ? u.warning(s("player.subtitleQuota")) : u.warning(s("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (e.status === 404) {
					u.error(s("player.subtitleAddNotFound"));
					return;
				}
			}
			u.error(s("player.subtitleAddError"));
		}
		function ne(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function re(e) {
			let t = E(e);
			if (x.value.has(t) || C.value.has(t)) return;
			let n = new Set(x.value);
			n.add(t), x.value = n;
			try {
				let n = Be([(await j().downloadSubtitle(i.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], r = new Set(C.value);
				r.add(t), C.value = r;
				let o = f(e.language);
				u.success(o ? s("player.subtitleAdded", { language: o }) : s("player.subtitleAddedGeneric")), n && a("added", n);
			} catch (e) {
				te(e);
			} finally {
				let e = new Set(x.value);
				e.delete(t), x.value = e;
			}
		}
		return X(() => i.open, (e) => {
			e && (g(), b.value = [], y.value = !1, v.value = !1, x.value = /* @__PURE__ */ new Set(), C.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (n, i) => (G(), L(r, {
			"model-value": e.open,
			title: Y(s)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": i[0] ||= (e) => a("update:open", e)
		}, {
			footer: Z(() => [H(w, {
				variant: "ghost",
				onClick: ee
			}, {
				default: Z(() => [V(J(Y(s)("common.close")), 1)]),
				_: 1
			})]),
			default: Z(() => [B("div", en, [
				B("fieldset", tn, [B("legend", nn, J(Y(s)("player.subtitleSearchLanguages")), 1), B("div", rn, [(G(!0), z(F, null, q(m.value, (e) => (G(), L(D, {
					key: e,
					selected: h.value.has(e),
					size: "md",
					"aria-label": f(e),
					"onUpdate:selected": (t) => _(e)
				}, {
					default: Z(() => [V(J(f(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				B("div", an, [H(w, {
					variant: "solid",
					"left-icon": "search",
					loading: v.value,
					disabled: !k.value,
					onClick: M
				}, {
					default: Z(() => [V(J(Y(s)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				v.value ? (G(), z("div", on, [H(S, { label: Y(s)("player.subtitleSearching") }, null, 8, ["label"]), B("span", null, J(Y(s)("player.subtitleSearching")), 1)])) : y.value && O.value.length === 0 ? (G(), L(A, {
					key: 1,
					icon: "captions",
					title: Y(s)("player.subtitleSearchEmpty"),
					description: Y(s)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : y.value ? (G(), z("ul", cn, [(G(!0), z(F, null, q(O.value, (e) => (G(), z("li", {
					key: E(e),
					class: "subsearch__item"
				}, [B("div", ln, [B("p", un, J(e.releaseName || e.provider), 1), B("div", dn, [
					H(T, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Z(() => [V(J(f(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (G(), L(T, {
						key: 0,
						tone: "info",
						size: "sm",
						label: Y(s)("player.subtitleHearingImpairedFull")
					}, {
						default: Z(() => [V(J(Y(s)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : R("", !0),
					B("span", fn, J(e.provider), 1),
					e.rating > 0 ? (G(), z("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": Y(s)("player.subtitleRating", { rating: e.rating })
					}, [H(t, { name: "star" }), V(" " + J(e.rating), 1)], 8, pn)) : R("", !0),
					e.downloadCount > 0 ? (G(), z("span", mn, J(Y(s)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : R("", !0),
					e.fps ? (G(), z("span", hn, J(Y(s)("player.subtitleFps", { fps: e.fps })), 1)) : R("", !0)
				])]), H(w, {
					variant: "outline",
					size: "sm",
					"left-icon": C.value.has(E(e)) ? "check" : "plus",
					loading: x.value.has(E(e)),
					disabled: x.value.has(E(e)) || C.value.has(E(e)),
					"aria-label": Y(s)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => re(e)
				}, {
					default: Z(() => [V(J(x.value.has(E(e)) ? Y(s)("player.subtitleAdding") : Y(s)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (G(), z("p", sn, J(Y(s)("player.subtitleSearchPrompt")), 1))
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
function $(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: vn(e, t, n, 0, 0, r, n),
		right: vn(e, t, n, t - r, 0, t, n),
		center: vn(e, t, n, 0, 0, t, n)
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
var Sn = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		let o = I(() => n.enabled && !n.reducedMotion && !r.value), s = I(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = K(null), l = null, u = null, d = !1, f = !1;
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
				c.value = bn($(n, 32, 18));
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
		let T = I(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (G(), z("div", {
			class: W(["player__ambient", { "is-active": o.value }]),
			style: Se(o.value ? T.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Cn = ["aria-label"], wn = { class: "resume__label" }, Tn = { class: "resume__time numeric" }, En = { class: "resume__actions" }, Dn = /*#__PURE__*/ e(/* @__PURE__ */ U({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o(), a = I(() => i("player.resumeFrom").split("{time}"));
		return (n, o) => (G(), z("div", {
			class: "resume",
			role: "region",
			"aria-label": Y(i)("player.resumePlayback")
		}, [B("p", wn, [
			V(J(a.value[0]), 1),
			B("span", Tn, J(Y(je)(e.seconds)), 1),
			V(J(a.value[1]), 1)
		]), B("div", En, [B("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: o[0] ||= (e) => r("resume")
		}, [H(t, { name: "play" }), B("span", null, J(Y(i)("player.resume")), 1)]), B("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: o[1] ||= (e) => r("restart")
		}, [H(t, { name: "rewind" }), B("span", null, J(Y(i)("player.startOver")), 1)])])], 8, Cn));
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
]), Rn = [
	"video/mp4; codecs=\"hvc1.1.4.L120.90\"",
	"video/mp4; codecs=\"hev1.1.4.L120.90\"",
	"video/mp4; codecs=\"hvc1.1.6.L93.B0\"",
	"video/mp4; codecs=\"hvc1.1.4.L120\""
];
function zn(e, t = "video/mp4") {
	let n = Ln.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function Bn(e, t = "video/mp4") {
	if (!e) return !0;
	let n = zn(e, t);
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
async function Vn() {
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
		for (let t of Rn) {
			let n = e.canPlayType(t);
			if (n === "probably" || n === "maybe") return !0;
		}
	}
	return !1;
}
async function Hn(e, t) {
	if (jn(...e)) return !0;
	let n = e.map((e) => An(e)).find((e) => On.includes(e)) ?? "", r = n ? `video/${n}` : "video/mp4";
	if (On.includes(n) && t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await Bn(e.codec, r) || (n === "mp4" || n === "m4v") && !await Vn()) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Un = ["aria-label"], Wn = ["src"], Gn = { class: "upnext__body" }, Kn = { class: "upnext__eyebrow" }, qn = { class: "upnext__title" }, Jn = {
	key: 0,
	class: "upnext__cd numeric"
}, Yn = { class: "upnext__actions" }, Xn = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Zn = ["r"], Qn = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], $n = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		let { t: r } = o(), i = e, a = n, s = I(() => i.posterUrl ?? i.media.poster_url ?? null), c = I(() => In(i.remaining, i.total));
		return (n, i) => (G(), z("aside", {
			class: "upnext",
			role: "region",
			"aria-label": Y(r)("player.upNext")
		}, [
			s.value ? (G(), z("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, Wn)) : R("", !0),
			B("div", Gn, [
				B("p", Kn, J(Y(r)("player.upNext")), 1),
				B("h4", qn, J(e.media.name), 1),
				e.counting ? (G(), z("p", Jn, J(Y(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : R("", !0),
				B("div", Yn, [B("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [H(t, { name: "play" }), B("span", null, J(Y(r)("player.playNow")), 1)]), B("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, J(Y(r)("player.cancel")), 1)])
			]),
			e.counting ? (G(), z("svg", Xn, [B("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Zn), B("circle", {
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
			}, null, 8, Qn)])) : R("", !0)
		], 8, Un));
	}
}), [["__scopeId", "data-v-85909b2d"]]), er = {
	class: "transcode",
	role: "alert"
}, tr = { class: "transcode__card" }, nr = { class: "transcode__heading" }, rr = { class: "transcode__body" }, ir = /*#__PURE__*/ e(/* @__PURE__ */ U({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o();
		return (n, a) => (G(), z("div", er, [B("div", tr, [
			H(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			B("h3", nr, J(Y(i)("player.transcodeHeading")), 1),
			B("p", rr, J(e.title ? Y(i)("player.transcodeBodyTitled", { title: e.title }) : Y(i)("player.transcodeBodyUntitled")), 1),
			B("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [H(t, { name: "arrow-left" }), B("span", null, J(Y(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), ar = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, or = { class: "prep__card" }, sr = { class: "prep__heading" }, cr = { class: "prep__body" }, lr = ["aria-valuenow"], ur = /*#__PURE__*/ e(/* @__PURE__ */ U({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = o(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (G(), z("div", ar, [B("div", or, [
			H(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			B("h3", sr, J(Y(r)("player.transcodePreparingHeading")), 1),
			B("p", cr, J(e.title ? Y(r)("player.transcodePreparingTitled", { title: e.title }) : Y(r)("player.transcodePreparingUntitled")), 1),
			B("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [B("div", {
				class: "prep__bar-fill",
				style: Se({ width: i() + "%" })
			}, null, 4)], 8, lr),
			B("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [H(t, { name: "arrow-left" }), B("span", null, J(Y(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), dr = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		let c = I(() => s(r.position, r.introMarker) ? {
			label: a("player.skipIntro"),
			target: r.introMarker.end
		} : s(r.position, r.outroMarker) ? {
			label: a("player.skipOutro"),
			target: r.outroMarker.end
		} : null);
		function l() {
			c.value && i("skip", c.value.target);
		}
		return (e, n) => (G(), L(ve, { name: "skip" }, {
			default: Z(() => [c.value ? (G(), z("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: De(l, ["stop"])
			}, [B("span", null, J(c.value.label), 1), H(t, { name: "skip-forward" })])) : R("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), fr = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, pr = ["aria-label", "onClick"], mr = { class: "skip-controls__label" }, hr = 5, gr = 30, _r = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
			let n = s(e.startMs), r = n - hr, i = n + gr;
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
		let f = I(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (G(), z("div", fr, [(G(!0), z(F, null, q(f.value, (e) => (G(), z("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: De((t) => p(e), ["stop"])
		}, [B("span", mr, J(d(e.type)), 1), H(t, { name: "skip-forward" })], 8, pr))), 128))])) : R("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), vr = ["aria-label", "aria-expanded"], yr = ["aria-label"], br = { class: "chapterlist__head" }, xr = { class: "chapterlist__title" }, Sr = ["aria-label"], Cr = ["onClick"], wr = { class: "chapterlist__index" }, Tr = { class: "chapterlist__name" }, Er = { class: "chapterlist__meta" }, Dr = { class: "chapterlist__time" }, Or = {
	key: 0,
	class: "chapterlist__duration"
}, kr = {
	key: 1,
	class: "chapterlist__empty"
}, Ar = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		let d = I(() => a.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = je(e.start), a;
			return e.end != null && e.end > e.start && (a = je(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = K(null), p = K(null);
		i(p, Te(a, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		X(() => a.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), Ce(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (G(), z("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [B("button", {
			type: "button",
			class: W(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": Y(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [H(t, { name: "list" })], 10, vr), e.open ? (G(), z("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.chapterList"),
			tabindex: "-1"
		}, [B("div", br, [B("h3", xr, J(Y(c)("player.chapters")), 1), H(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (G(), z("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": Y(c)("player.chapterList")
		}, [(G(!0), z(F, null, q(d.value, (e) => (G(), z("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [B("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			B("span", wr, J(e.index), 1),
			B("span", Tr, J(e.label), 1),
			B("span", Er, [B("span", Dr, J(e.startLabel), 1), e.durationLabel ? (G(), z("span", Or, "· " + J(e.durationLabel), 1)) : R("", !0)])
		], 8, Cr)]))), 128))], 8, Sr)) : (G(), z("p", kr, J(Y(c)("player.noChapters")), 1))], 8, yr)) : R("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), jr = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Mr = { class: "marker-timeline__ticks" }, Nr = [
	"title",
	"aria-label",
	"onClick"
], Pr = { class: "marker-timeline__tooltip" }, Fr = { class: "marker-timeline__tooltip-label" }, Ir = { class: "marker-timeline__tooltip-time numeric" }, Lr = ["onClick"], Rr = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		let s = I(() => n.duration <= 0 || !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => {
			let t = i(e.startMs);
			return t > 0 && t < n.duration;
		}).map((e) => ({
			...e,
			startSec: i(e.startMs),
			endSec: i(e.endMs),
			ratio: i(e.startMs) / n.duration,
			color: o(e.type),
			isAd: e.type === "ad"
		}))), c = I(() => n.markers ? n.markers.find((e) => e.type === "ad" && n.position >= i(e.startMs) && n.position <= i(e.endMs)) ?? null : null), l = I(() => c.value !== null), u = I(() => c.value?.label ?? "Ad");
		function d(e) {
			r("seek", e.startSec);
		}
		function f(e) {
			r("similar", e.type, e.startMs);
		}
		return (e, t) => s.value.length > 0 ? (G(), z("div", {
			key: 0,
			class: W(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (G(), z("div", jr, [t[0] ||= B("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [B("polygon", { points: "5,3 19,12 5,21" })], -1), V(" " + J(u.value), 1)])) : R("", !0), B("div", Mr, [(G(!0), z(F, null, q(s.value, (e) => (G(), z("button", {
			key: e.id,
			type: "button",
			class: W(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: Se({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Y(je)(e.startSec)}`,
			"aria-label": `${e.label} at ${Y(je)(e.startSec)}`,
			onClick: De((t) => d(e), ["stop"])
		}, [B("span", Pr, [
			B("span", Fr, J(e.label), 1),
			B("span", Ir, J(Y(je)(e.startSec)), 1),
			B("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: De((t) => f(e), ["stop"])
			}, " Find similar ", 8, Lr)
		])], 14, Nr))), 128))])], 2)) : R("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), zr = ["aria-label", "aria-expanded"], Br = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, Vr = ["aria-label"], Hr = ["aria-selected", "onClick"], Ur = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		], s = K(0), c = K(0), l = I(() => c.value > 0), u;
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
		}), n({ toggleOpen: g }), (e, n) => (G(), z("div", { class: W(["sleep-timer", { "is-active": l.value }]) }, [B("button", {
			type: "button",
			class: W(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : Y(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [H(t, { name: "moon" }), l.value ? (G(), z("span", Br, J(m(c.value)), 1)) : R("", !0)], 10, zr), H(ve, { name: "dropdown" }, {
			default: Z(() => [h.value ? (G(), z("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": Y(i)("player.sleepTimer")
			}, [(G(), z(F, null, q(a, (e) => B("li", {
				key: e.value,
				class: W(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, J(e.label), 11, Hr)), 64))], 8, Vr)) : R("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Wr = {
	key: 0,
	class: "syncplay-overlay"
}, Gr = { class: "syncplay-overlay__badge" }, Kr = { class: "syncplay-overlay__label" }, qr = { class: "syncplay-overlay__status-label" }, Jr = { class: "syncplay-overlay__members" }, Yr = { class: "syncplay-overlay__member-count" }, Xr = { class: "syncplay-overlay__member-list" }, Zr = { class: "syncplay-overlay__member-name" }, Qr = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, $r = /*#__PURE__*/ e(/* @__PURE__ */ U({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = o(), i = ge(), a = u(), s = I(() => n.apiBase ?? a.value), c = I(() => i.currentRoom?.name ?? "SyncPlay"), l = I(() => i.onlineMembers.length), d = I(() => i.syncStatus), f = I(() => {
			switch (d.value) {
				case "synced": return r("syncplay.synced");
				case "outOfSync": return r("syncplay.outOfSync");
				case "re-syncing": return r("syncplay.reSyncing");
				default: return r("syncplay.synced");
			}
		}), p = I(() => {
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
		return (e, n) => Y(i).isInRoom ? (G(), z("div", Wr, [
			B("div", Gr, [H(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), B("span", Kr, "SyncPlay: " + J(c.value), 1)]),
			B("div", { class: W(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [H(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), B("span", qr, J(f.value), 1)], 2),
			B("div", Jr, [B("span", Yr, [H(t, { name: "user" }), V(" " + J(l.value) + " " + J(Y(r)("syncplay.members", { count: l.value })), 1)]), B("ul", Xr, [(G(!0), z(F, null, q(Y(i).onlineMembers.slice(0, 5), (e) => (G(), z("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= B("span", { class: "syncplay-overlay__member-dot" }, null, -1), B("span", Zr, J(e.name), 1)]))), 128)), Y(i).onlineMembers.length > 5 ? (G(), z("li", Qr, " +" + J(Y(i).onlineMembers.length - 5) + " more ", 1)) : R("", !0)])]),
			H(w, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: Z(() => [V(J(Y(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : R("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), ei = {
	key: 0,
	class: "syncplay-controls"
}, ti = ["aria-label"], ni = { class: "syncplay-controls__wait-label" }, ri = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, ii = { key: 0 }, ai = { class: "syncplay-controls__transport" }, oi = ["aria-label"], si = ["aria-label"], ci = ["aria-label"], li = { class: "syncplay-controls__status-label" }, ui = 10, di = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		let r = e, i = n, { t: a } = o(), s = ge(), c = u(), l = I(() => r.apiBase ?? c.value), d = K(!1), f = K([]), p = I(() => d.value || s.syncStatus === "re-syncing");
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
			await _(Math.max(0, r.position - ui));
		}
		async function y() {
			await _(Math.min(r.duration, r.position + ui));
		}
		return X(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => Y(s).isInRoom ? (G(), z("div", ei, [
			p.value ? (G(), z("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": Y(a)("syncplay.waitingForMembers")
			}, [
				H(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				B("span", ni, J(Y(a)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (G(), z("span", ri, [V(J(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (G(), z("span", ii, "+" + J(f.value.length - 3), 1)) : R("", !0)])) : R("", !0)
			], 8, ti)) : R("", !0),
			B("div", ai, [
				B("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(a)("syncplay.rewind"),
					onClick: v
				}, [H(t, { name: "rewind" })], 8, oi),
				B("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Y(a)("syncplay.pauseAll") : Y(a)("syncplay.playAll"),
					onClick: g
				}, [H(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, si),
				B("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(a)("syncplay.fastForward"),
					onClick: y
				}, [H(t, { name: "forward" })], 8, ci)
			]),
			B("div", { class: W(["syncplay-controls__status", `syncplay-controls__status--${Y(s).syncStatus}`]) }, [H(t, {
				name: Y(s).syncStatus === "synced" ? "check" : Y(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), B("span", li, J(Y(s).syncStatus === "synced" ? Y(a)("syncplay.synced") : Y(s).syncStatus === "outOfSync" ? Y(a)("syncplay.outOfSync") : Y(a)("syncplay.reSyncing")), 1)], 2)
		])) : R("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), fi = { class: "player__stage" }, pi = ["src", "poster"], mi = [
	"src",
	"srclang",
	"label"
], hi = { class: "player__meta" }, gi = ["aria-label"], _i = { class: "player__meta-text" }, vi = { class: "player__eyebrow" }, yi = { class: "player__title" }, bi = { class: "player__sub numeric" }, xi = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Si = {
	key: 0,
	class: "player__center"
}, Ci = ["aria-label"], wi = { class: "player__btnrow" }, Ti = ["aria-label"], Ei = ["aria-label"], Di = ["aria-label"], Oi = { class: "player__time numeric" }, ki = ["aria-label", "aria-pressed"], Ai = ["title"], ji = ["aria-label"], Mi = ["aria-label"], Ni = ["aria-label", "aria-pressed"], Pi = ["aria-label", "aria-pressed"], Fi = ["aria-label"], Ii = { class: "similar-modal" }, Li = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Ri = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, zi = { class: "similar-modal__state-title" }, Bi = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, Vi = {
	key: 3,
	class: "similar-modal__results"
}, Hi = { class: "similar-modal__poster" }, Ui = ["src", "alt"], Wi = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Gi = { class: "similar-modal__result-body" }, Ki = { class: "similar-modal__result-title" }, qi = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Ji = { key: 0 }, Yi = /*#__PURE__*/ e(/* @__PURE__ */ U({
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
		let i = e, s = n, c = f(), u = a(), { t: d } = o(), _ = ge(), v = m(), y = I(() => v.isFavorite(i.media.id)), b = I(() => v.likeLevel(i.media.id));
		function x() {
			v.toggleFavorite(i.media.id, me());
		}
		function C(e) {
			v.setLike(i.media.id, e, me());
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
		], T = K(null), E = K(null), D = K(!0), O = K(!1), k = K(!1), A = K(!1), j = K(!1), M = K(!1), ee = K(!1), te = K(null), ne = K(null), re = K(!1), ie = p(), ae = K(!1), se = I(() => j.value ? 1.35 : 1), N = K(jn(i.streamUrl, i.media.path));
		async function ce() {
			if (N.value) return;
			let e = i.playbackAudioTracks ?? [];
			e.length !== 0 && await Hn([i.streamUrl, i.media.path], e) && (N.value = !0);
		}
		X(() => i.playbackAudioTracks, (e) => {
			!e || e.length === 0 || ce();
		}, { immediate: !1 });
		let le = ye("phlixConfig", null), de = ye("resumeReporter", null), pe = !1;
		function me() {
			return le?.apiBase ?? "";
		}
		let P = Ye({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: le?.playerHlsConfig
		}), ve = et({ apiBase: () => i.apiBase ?? "" }), U = null;
		function be(e) {
			U !== null && clearTimeout(U), U = setTimeout(() => {
				U = null, ve.fetch(e);
			}, 0);
		}
		let Se = I(() => i.thumbnailAt ?? ve.thumbnailAt), Te = I(() => N.value ? void 0 : i.streamUrl), Ee = I(() => N.value && P.state.value !== "ready"), Oe = I(() => N.value && (P.state.value === "preparing" || P.state.value === "idle")), ke = I(() => N.value && P.state.value === "error");
		function Ae(e = 0) {
			let t = T.value;
			t && P.start(t, i.media.id, void 0, e);
		}
		function Me(e) {
			if (c.quality === "original" && e !== "auto") {
				P.loadVariantPlaylist(mt);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				P.loadVariantPlaylist(e);
				return;
			}
			P.setLevel(e);
		}
		let Ne = !1;
		function Pe() {
			u.defaultQuality = pt;
		}
		function Fe() {
			let e = P.levels.value;
			if (e.length === 0) return !1;
			let t = u.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = P.variants.value;
				if (!t || t.length === 0) return !1;
				if (xt(e, t)) P.loadVariantPlaylist(mt);
				else {
					let t = bt(e);
					t >= 0 && P.setNextLevel(t), Pe();
				}
				return !0;
			}
			let n = vt(e, t);
			return n >= 0 ? P.setNextLevel(n) : Pe(), !0;
		}
		X(() => P.levels.value, (e) => {
			Ne || e.length === 0 || Fe() && (Ne = !0);
		}), X(() => P.variants.value, (e) => {
			Ne || !e?.length || xe(() => {
				Ne || Fe() && (Ne = !0);
			});
		}, { deep: !0 });
		let Le = K(c.resumePositionFor(i.media.id) ?? 0), Q = K(!N.value && Le.value > 0), Re = null, ze = K(!1), Be = K(8), Ve, He = K(null), Ue = K(0), We = K(!1), Ge = K([]), Ke = K(!1), qe = K(null);
		function Je(e, t) {
			He.value = e, Ue.value = t, Ge.value = [], qe.value = null, We.value = !0, tt(e, t);
		}
		let Xe = null, Ze = null, Qe = null;
		function $e() {
			let e = i.apiBase ?? "";
			return (Ze === null || Qe !== e) && (Ze = new l({ baseUrl: e }), Qe = e), Ze;
		}
		async function tt(e, t) {
			Xe?.abort(), Xe = new AbortController(), Ke.value = !0, qe.value = null;
			try {
				let n = await $e().searchByMarker(e, t, 30, 20, Xe.signal);
				Ge.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				qe.value = "Failed to load similar media. Please try again.", Ge.value = [];
			} finally {
				Ke.value = !1;
			}
		}
		function nt() {
			Xe?.abort(), We.value = !1, Ge.value = [], qe.value = null, He.value = null;
		}
		let rt = I(() => c.upNext);
		function it() {
			N.value = jn(i.streamUrl, i.media.path), ce(), Le.value = c.resumePositionFor(i.media.id) ?? 0, Q.value = !N.value && Le.value > 0, Re = null, tn = !1, Ht = !1, zt.value = [], Rt.value = !1, Ut = !1, jt.value = -1, Yt = null, Ne = !1, pe = !1, ct(), ze.value = !1, P.reset(), T.value && (T.value.currentTime = 0), N.value && Ae(), be(i.media.id);
		}
		function at(e) {
			let t = T.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Re = Math.max(0, e));
		}
		function ot() {
			at(Le.value), Q.value = !1, T.value?.play()?.catch(() => {});
		}
		function st() {
			Re = null, at(0), c.clearResume(i.media.id), Q.value = !1, T.value?.play()?.catch(() => {});
		}
		function ct() {
			Ve &&= (clearInterval(Ve), void 0);
		}
		function ut() {
			Be.value = 8, ct(), Ve = setInterval(() => {
				--Be.value, Be.value <= 0 && (ct(), gt());
			}, 1e3);
		}
		function ht() {
			pe || (pe = !0, de?.finish()), zn(), D.value = !0, c.upNext && (ze.value = !0, u.autoplay && ut());
		}
		function gt() {
			ct(), ze.value = !1;
			let e = c.next(i.streamUrlFor);
			e && s("play-next", e);
		}
		function _t() {
			ct(), ze.value = !1;
		}
		function yt() {
			if (N.value) return;
			let e = T.value, t = Nn(e) && (e?.currentTime ?? 0) === 0;
			(Mn(e) || t) && (N.value = !0, Ae(e?.currentTime ?? 0));
		}
		let St = K([]), Tt = K([]), Et = K(-1), Dt = K(!1), Ot = I(() => P.state.value === "ready" && P.audioTracks.value.length > 0), kt = I(() => P.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), At = I(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), jt = K(-1), Mt = I(() => !Ot.value && !N.value && Tt.value.length === 0 && At.value.length > 1), Nt = I(() => Ot.value ? kt.value : Mt.value ? At.value : Tt.value), Pt = I(() => {
			if (Ot.value) return P.currentAudioTrack.value;
			if (Mt.value) {
				if (jt.value >= 0) return jt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Et.value;
		}), Ft = K(!1), It = c.subtitleLang, Lt = I(() => {
			let e = N.value ? P.subtitleTracks.value : i.playbackSubtitleTracks ?? [];
			if (zt.value.length === 0) return e;
			let t = (e) => e.url.split("?")[0], n = new Set(e.map(t)), r = zt.value.filter((e) => !n.has(t(e)));
			return r.length === 0 ? e : [...e, ...r];
		}), Rt = K(!1), zt = K([]), Bt = I(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(u.defaultSubtitleLang), t(u.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function Vt(e) {
			zt.value.some((t) => t.url === e.url) || (zt.value = [...zt.value, e]);
		}
		let Ht = !1, Ut = !1;
		function Wt() {
			if (Ht) return;
			if (u.subtitlePreferenceSet) {
				Ht = !0;
				return;
			}
			let e = Lt.value.find((e) => e.default);
			if (!e) return;
			let t = St.value.find((t) => t.language === (e.language || e.label));
			t && (c.setSubtitle(t.language), It = t.language, Ht = !0);
		}
		function Gt() {
			if (Ut) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = Nt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Pt.value;
			r >= 0 && r < t.length || (Xt(n), Ut = !0);
		}
		let Kt = I(() => St.value.some((e) => e.language === c.subtitleLang));
		function qt() {
			let e = T.value;
			St.value = he(e), Tt.value = ue(e), Et.value = oe(e), Wt(), Gt();
		}
		function Jt() {
			if (Kt.value) It = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = It && St.value.some((e) => e.language === It) ? It : St.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			s("captions");
		}
		let Yt = null;
		function Xt(e) {
			if (Ot.value) P.setAudioTrack(e);
			else if (Mt.value) {
				if (e === Pt.value) return;
				jt.value = e, Yt = e, N.value = !0, Ae(T.value?.currentTime ?? 0);
			} else fe(T.value, e), Et.value = e;
		}
		X(Ot, (e) => {
			if (!e || Yt === null) return;
			let t = Yt;
			Yt = null, t >= 0 && t < P.audioTracks.value.length && P.setAudioTrack(t);
		}), X(Lt, () => {
			xe(() => qt());
		}, { deep: !0 });
		let Zt = null, Qt, en = I(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), tn = !1;
		function nn() {
			if (!i.autoplay || tn || Q.value || Ee.value) return;
			let e = T.value;
			if (!e || !e.paused) return;
			tn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, c.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function rn() {
			nn();
		}
		function an() {
			i.prevEpisode && s("play-episode", i.prevEpisode);
		}
		function on() {
			i.nextEpisode && s("play-episode", i.nextEpisode);
		}
		function sn() {
			let e = T.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function cn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function ln() {
			c.play(), c.setMediaPositionState();
		}
		function un() {
			c.pause(), c.setMediaPositionState();
		}
		function dn() {
			let e = T.value;
			e && c.updateProgress(e.currentTime, e.duration, cn(e));
		}
		function fn() {
			let e = T.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, Re !== null && (e.currentTime = e.duration ? Math.min(e.duration, Re) : Re, Re = null), c.updateProgress(e.currentTime, e.duration, cn(e)), c.setMediaPositionState(), qt());
		}
		function pn() {
			let e = T.value;
			e && c.updateProgress(e.currentTime, e.duration, cn(e));
		}
		function mn() {
			let e = T.value;
			e && (Math.abs(e.volume - c.volume) > .001 && c.setVolume(e.volume), e.muted !== c.muted && c.toggleMute());
		}
		function hn() {
			let e = T.value;
			e && e.playbackRate !== c.rate && c.setRate(e.playbackRate), c.setMediaPositionState();
		}
		function _n() {
			c.setMediaPositionState();
		}
		function vn() {
			c.setMediaPositionState();
		}
		function $(e) {
			let t = T.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function yn() {
			k.value = !0, Vn();
		}
		function bn() {
			k.value = !1, Vn();
		}
		function xn(e) {
			let t = w.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(w[e] - c.rate) ? n : e, 0), n = w[Math.min(w.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		function Cn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function wn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Tn() {
			te.value?.toggleOpen();
		}
		let En = null;
		function On() {
			let e = T.value;
			if (!e) {
				c.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), c.pause();
				return;
			}
			En !== null && (clearInterval(En), En = null);
			let t = .05;
			En = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(En), En = null, e.volume = 0, e.pause(), c.pause());
			}, 50);
		}
		g({
			playPause: sn,
			seekBy: (e) => $(c.position + e),
			frameStep: (e) => {
				c.playing || $(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: kn,
			toggleFullscreen: Pn,
			toggleCaptions: Jt,
			toggleTheater: An,
			togglePip: In,
			skipIntro: Cn,
			skipOutro: wn,
			sleepTimer: Tn,
			seekToPercent: (e) => $(e * c.duration),
			speedStep: xn,
			toggleHelp: () => {
				A.value = !A.value;
			},
			toggleQuality: () => {
				N.value ? (re.value = !re.value, ne.value?.toggleMenu?.()) : ie.show({
					message: d("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !A.value && !Dt.value && !Ft.value });
		function kn() {
			c.toggleMute();
		}
		function An() {
			j.value = !j.value, s("theater", j.value);
		}
		X(() => c.muted, (e) => {
			let t = T.value;
			t && t.muted !== e && (t.muted = e);
		}), X(() => c.volume, (e) => {
			let t = T.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), X(() => c.rate, (e) => {
			let t = T.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), X(() => c.lastCommand, (e) => {
			e && (e.type === "seekTo" ? at(e.value) : e.type === "seekBy" && at(c.position + e.value));
		});
		function Pn() {
			if (typeof document > "u") return;
			let e = E.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function Fn() {
			O.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function In() {
			let e = T.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function Ln() {
			M.value = !0;
		}
		function Rn() {
			M.value = !1;
		}
		function zn() {
			Qt &&= (clearTimeout(Qt), void 0);
		}
		function Bn() {
			zn(), !(!c.playing || k.value) && (Qt = setTimeout(() => {
				c.playing && !k.value && (D.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function Vn() {
			D.value = !0, Bn();
		}
		X(() => c.playing, (e) => {
			e ? (Q.value = !1, _t(), Bn()) : (zn(), D.value = !0);
		});
		let Un = null;
		return we(() => {
			c.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), v.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", Fn), ee.value = document.pictureInPictureEnabled === !0), Un = c.bindMediaSession({
				onPlay: () => void T.value?.play()?.catch(() => {}),
				onPause: () => T.value?.pause(),
				onSeek: (e) => $(e)
			}), Zt = T.value?.textTracks ?? null, Zt?.addEventListener?.("addtrack", qt), Zt?.addEventListener?.("removetrack", qt), qt(), N.value && Ae(), be(i.media.id);
		}), X(() => i.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), it();
		}), X(() => i.media?.id, () => {
			v.hydrate(i.media);
		}), X(() => _.currentSession, (e) => {
			e && (e.state === "playing" ? (T.value?.play(), c.play()) : e.state === "paused" && (T.value?.pause(), c.pause()), _.updateLocalPosition(c.position), Math.abs(_.driftAmount) > 2 && at(e.playbackPosition));
		}), Ce(() => {
			zn(), ct(), P.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", Fn), Un?.(), Zt?.removeEventListener?.("addtrack", qt), Zt?.removeEventListener?.("removetrack", qt), En !== null && (clearInterval(En), En = null), U !== null && (clearTimeout(U), U = null);
		}), (n, i) => (G(), z("div", {
			ref_key: "containerRef",
			ref: E,
			class: W(["player", {
				"is-chrome-hidden": !D.value,
				"is-theater": j.value
			}]),
			onPointermove: Vn,
			onPointerdown: Vn,
			onFocusin: Vn
		}, [H(Sn, {
			video: T.value,
			enabled: Y(u).atmosphere,
			playing: Y(c).playing,
			"reduced-motion": Y(u).effectiveReducedMotion,
			intensity: se.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), B("div", fi, [
			B("video", {
				ref_key: "videoRef",
				ref: T,
				class: "player__video",
				src: Te.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: ln,
				onPause: un,
				onTimeupdate: dn,
				onLoadedmetadata: fn,
				onCanplay: rn,
				onProgress: pn,
				onVolumechange: mn,
				onRatechange: hn,
				onSeeked: _n,
				onDurationchange: vn,
				onEnded: ht,
				onError: yt,
				onEnterpictureinpicture: Ln,
				onLeavepictureinpicture: Rn,
				onClick: sn
			}, [(G(!0), z(F, null, q(Lt.value, (e) => (G(), z("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, mi))), 128))], 40, pi),
			i[20] ||= B("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[21] ||= B("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			B("div", hi, [B("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Y(d)("player.back"),
				onClick: i[0] ||= De((e) => s("back"), ["stop"])
			}, [H(t, { name: "arrow-left" })], 8, gi), B("div", _i, [
				B("p", vi, J(Y(d)("player.nowPlaying")), 1),
				B("h2", yi, J(e.media.name), 1),
				B("div", bi, [(G(!0), z(F, null, q(en.value, (e, t) => (G(), z(F, { key: t }, [t > 0 && !e.cert ? (G(), z("span", xi, "·")) : R("", !0), B("span", { class: W({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			Ee.value ? R("", !0) : (G(), z("div", Si, [B("button", {
				type: "button",
				class: W(["player__bigplay", { "is-playing": Y(c).playing }]),
				"aria-label": Y(c).playing ? Y(d)("player.pause") : Y(d)("player.play"),
				onClick: De(sn, ["stop"])
			}, [H(t, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Ci)])),
			H(wt, {
				video: T.value,
				language: Y(c).subtitleLang,
				"style-config": Y(u).captionStyle,
				lifted: D.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			Ee.value ? R("", !0) : (G(), z("div", {
				key: 1,
				class: "player__controls",
				onClick: i[7] ||= De(() => {}, ["stop"])
			}, [
				H(Ie, {
					position: Y(c).position,
					duration: Y(c).duration,
					buffered: Y(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": Se.value,
					onSeek: $,
					onScrubStart: yn,
					onScrubEnd: bn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				Y(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), L(Rr, {
					key: 0,
					position: Y(c).position,
					duration: Y(c).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: Je
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : R("", !0),
				B("div", wi, [
					e.prevEpisode ? (G(), z("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(d)("player.previousEpisode"),
						onClick: an
					}, [H(t, { name: "skip-back" })], 8, Ti)) : R("", !0),
					B("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Y(c).playing ? Y(d)("player.pause") : Y(d)("player.play"),
						onClick: sn
					}, [H(t, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Ei),
					e.nextEpisode ? (G(), z("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(d)("player.nextEpisode"),
						onClick: on
					}, [H(t, { name: "skip-forward" })], 8, Di)) : R("", !0),
					B("span", Oi, [
						V(J(Y(je)(Y(c).position)), 1),
						i[16] ||= B("span", { class: "player__sep" }, " / ", -1),
						V(J(Y(je)(Y(c).duration)), 1)
					]),
					i[17] ||= B("span", { class: "player__grow" }, null, -1),
					B("button", {
						type: "button",
						class: W(["player__iconbtn player__favorite", { "is-on": y.value }]),
						"aria-label": y.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": y.value ? "true" : "false",
						onClick: x
					}, [H(t, { name: y.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ki),
					H(h, {
						level: b.value,
						onCycle: C
					}, null, 8, ["level"]),
					H(dt),
					H(ft),
					H(Ct, {
						ref_key: "qualityMenuRef",
						ref: ne,
						open: re.value,
						"onUpdate:open": i[1] ||= (e) => re.value = e,
						levels: Y(P).levels.value,
						variants: Y(P).variants.value,
						"current-level": Y(P).currentLevel.value,
						"auto-enabled": Y(P).autoEnabled.value,
						"active-height": Y(P).activeLevelHeight.value,
						onSelect: Me
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					N.value ? R("", !0) : (G(), z("span", {
						key: 2,
						class: "player__direct-badge",
						title: Y(d)("player.qualityDirectStream")
					}, J(Y(d)("player.directStream")), 9, Ai)),
					H($t, {
						open: Dt.value,
						"onUpdate:open": i[2] ||= (e) => Dt.value = e,
						tracks: St.value,
						"audio-tracks": Nt.value,
						"active-audio": Pt.value,
						onSelectAudio: Xt,
						onAddSubtitles: i[3] ||= (e) => Rt.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					H(Ar, {
						open: Ft.value,
						"onUpdate:open": i[4] ||= (e) => Ft.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					H(Ur, {
						ref_key: "sleepTimerRef",
						ref: te,
						"on-expire": On
					}, null, 512),
					B("button", {
						type: "button",
						class: W(["player__iconbtn player__syncplay", { "is-on": Y(_).isInRoom }]),
						"aria-label": Y(_).isInRoom ? Y(d)("syncplay.inRoom") : Y(d)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[5] ||= (e) => ae.value = !0
					}, [H(t, { name: "user" })], 10, ji),
					B("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(d)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[6] ||= (e) => A.value = !0
					}, [H(t, { name: "info" })], 8, Mi),
					ee.value ? (G(), z("button", {
						key: 3,
						type: "button",
						class: W(["player__iconbtn", { "is-on": M.value }]),
						"aria-label": M.value ? Y(d)("player.exitPip") : Y(d)("player.pip"),
						"aria-pressed": M.value,
						onClick: In
					}, [H(t, { name: "pip" })], 10, Ni)) : R("", !0),
					B("button", {
						type: "button",
						class: W(["player__iconbtn", { "is-on": j.value }]),
						"aria-label": j.value ? Y(d)("player.exitTheater") : Y(d)("player.theater"),
						"aria-pressed": j.value,
						onClick: An
					}, [H(t, { name: "theater" })], 10, Pi),
					B("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": O.value ? Y(d)("player.exitFullscreen") : Y(d)("player.fullscreen"),
						onClick: Pn
					}, [H(t, { name: O.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Fi)
				])
			])),
			Ee.value ? R("", !0) : (G(), L(dr, {
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
			Ee.value ? R("", !0) : (G(), L(_r, {
				key: 3,
				position: Y(c).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Q.value && !Ee.value ? (G(), L(Dn, {
				key: 4,
				seconds: Le.value,
				onResume: ot,
				onRestart: st
			}, null, 8, ["seconds"])) : R("", !0),
			ze.value && rt.value && !Ee.value ? (G(), L($n, {
				key: 5,
				media: rt.value,
				remaining: Be.value,
				total: Y(8),
				counting: Y(u).autoplay,
				onPlayNow: gt,
				onCancel: _t
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : R("", !0),
			H(r, {
				modelValue: We.value,
				"onUpdate:modelValue": i[8] ||= (e) => We.value = e,
				title: `Similar ${He.value ?? "marker"}s`,
				size: "lg",
				onClose: nt
			}, {
				default: Z(() => [B("div", Ii, [Ke.value ? (G(), z("div", Li, [H(S, { label: "Finding similar media" })])) : qe.value ? (G(), z("div", Ri, [H(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), B("p", zi, J(qe.value), 1)])) : !Ke.value && Ge.value.length === 0 ? (G(), z("div", Bi, [
					H(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[18] ||= B("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[19] ||= B("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), z("ul", Vi, [(G(!0), z(F, null, q(Ge.value, (e) => (G(), z("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [B("div", Hi, [e.poster_url ? (G(), z("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Ui)) : (G(), z("div", Wi, [H(t, { name: "film" })]))]), B("div", Gi, [B("p", Ki, J(e.name), 1), e.year ? (G(), z("p", qi, [V(J(e.year) + " ", 1), e.runtime ? (G(), z("span", Ji, " · " + J(e.runtime) + "m", 1)) : R("", !0)])) : R("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Oe.value ? (G(), L(ur, {
				key: 6,
				title: e.media.name,
				progress: Y(P).progress.value,
				onBack: i[9] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : R("", !0),
			ke.value ? (G(), L(ir, {
				key: 7,
				title: e.media.name,
				onBack: i[10] ||= (e) => s("back")
			}, null, 8, ["title"])) : R("", !0),
			Y(_).isInRoom ? (G(), L(di, {
				key: 8,
				position: Y(c).position,
				duration: Y(c).duration,
				"is-playing": Y(c).playing,
				onSeek: $,
				onPlay: i[11] ||= (e) => void T.value?.play(),
				onPause: i[12] ||= (e) => void T.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : R("", !0),
			Y(_).isInRoom ? (G(), L($r, { key: 9 })) : R("", !0),
			H(_e, {
				modelValue: ae.value,
				"onUpdate:modelValue": i[13] ||= (e) => ae.value = e
			}, null, 8, ["modelValue"]),
			H(lt, {
				open: A.value,
				onClose: i[14] ||= (e) => A.value = !1
			}, null, 8, ["open"]),
			H(gn, {
				open: Rt.value,
				"onUpdate:open": i[15] ||= (e) => Rt.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": Bt.value,
				onAdded: Vt
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-c0c2782d"]]), Xi = { class: "player-page__stage" }, Zi = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Qi = { class: "player-page__blocking-error" }, $i = /*#__PURE__*/ e(/* @__PURE__ */ U({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = u(), i = d(), a = ke(), o = Ae(), s = f(), p = m(), h = v(), g = K(null), _ = K(""), y = K([]), b = K(null), x = K(null), S = K([]), T = K([]), E = K(!0), D = K(null), O = K(!1), oe = K(null), se = K(!1), N = K(null), ce = K(null), le = I(() => String(a.params.id ?? ""));
		C(() => g.value?.name);
		let ue = I(() => {
			let e = g.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), de = null, fe = !1;
		function pe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function me(e) {
			let t = i.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function P(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function he(e, t) {
			let r = de, i = () => fe || r !== de, a = t.genres?.[0];
			if (!a) {
				s.setQueue([]);
				return;
			}
			try {
				let o = j(n.value, {
					genres: [a],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(o, void 0, r?.signal);
				if (i()) return;
				s.setQueue((c.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || pe(e)) return;
				s.setQueue([]);
			}
		}
		async function ge(e, t, r) {
			let i = j(n.value, {
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
		function F(e, t) {
			N.value = te(e, t), ce.value = ne(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && s.setQueue(r);
		}
		function ve(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function U(e, n) {
			if (N.value = null, ce.value = null, !(n.type === "episode" || (n.episode_number ?? null) !== null)) return;
			let r = ve(n.id);
			if (r) {
				F(r, n.id);
				return;
			}
			let i = de, a = () => fe || i !== de;
			try {
				let r = await _e(e, n, i?.signal);
				if (a()) return;
				let o = await ge(e, r.id, i?.signal);
				if (a()) return;
				if (ee(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => ge(e, t.id, i?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = M(o);
				s.length && t.set(r.id, s), F(s, n.id);
			} catch (e) {
				if (a() || pe(e)) return;
				N.value = null, ce.value = null;
			}
		}
		async function ye() {
			let e = le.value;
			if (de?.abort(), de = typeof AbortController < "u" ? new AbortController() : null, E.value = !0, D.value = null, y.value = [], b.value = null, x.value = null, S.value = [], T.value = [], N.value = null, ce.value = null, s.hideMiniPlayer(), !e) {
				D.value = "No media id provided", E.value = !1;
				return;
			}
			let t = new l({ baseUrl: n.value });
			t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, de?.signal).then((e) => {
				fe || (y.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), b.value = P(e?.intro_marker), x.value = P(e?.outro_marker), S.value = Pn(e?.audio_tracks), T.value = Be(e?.subtitle_tracks));
			}).catch(() => null);
			let r = re(e), i = Date.now();
			if (r && ie(r, i)) {
				be(t, r.item);
				return;
			}
			let a = null;
			try {
				a = (await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, de?.signal)).item;
			} catch (e) {
				if (fe || pe(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						oe.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", se.value = !0, E.value = !1;
						return;
					}
				}
				if (r) {
					be(t, r.item);
					return;
				}
				D.value = e instanceof Error ? e.message : "Failed to load media", E.value = !1;
				return;
			}
			if (!fe) {
				if (!a) {
					if (r) {
						be(t, r.item);
						return;
					}
					D.value = "Failed to load media item", E.value = !1;
					return;
				}
				ae(e, a, i), be(t, a);
			}
		}
		async function be(e, t) {
			g.value = t, p.hydrate(t), _.value = me(t), E.value = !1, !((t.episode_number ?? null) !== null && (await U(e, t), ce.value)) && he(e, t);
		}
		we(ye), X(le, ye), Oe(() => {
			s.current && s.streamUrl && s.showMiniPlayer();
		}), Ce(() => {
			fe = !0, de?.abort(), de = null, h.reset();
		});
		function xe() {
			o?.back();
		}
		function q(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Te(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ee(e) {
			O.value = e, h.setTheaterActive(e);
		}
		function De() {
			se.value = !1, xe();
		}
		return (e, t) => (G(), z("div", { class: W(["player-page", { "is-theater": O.value }]) }, [
			ue.value && !E.value && !D.value ? (G(), z("div", {
				key: 0,
				class: "player-page__ambient",
				style: Se(ue.value),
				"aria-hidden": "true"
			}, null, 4)) : R("", !0),
			B("div", Xi, [E.value ? (G(), z("div", Zi, [H(k, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : D.value ? (G(), L(A, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: D.value
			}, {
				actions: Z(() => [H(w, {
					variant: "solid",
					onClick: ye
				}, {
					default: Z(() => [...t[1] ||= [V("Retry", -1)]]),
					_: 1
				}), H(w, {
					variant: "ghost",
					onClick: xe
				}, {
					default: Z(() => [...t[2] ||= [V("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : g.value ? (G(), L(Yi, {
				key: 2,
				media: g.value,
				"stream-url": _.value,
				"stream-url-for": me,
				"api-base": Y(n),
				chapters: y.value,
				"intro-marker": b.value,
				"outro-marker": x.value,
				"playback-audio-tracks": S.value,
				"playback-subtitle-tracks": T.value,
				"prev-episode": N.value,
				"next-episode": ce.value,
				autoplay: !0,
				onBack: xe,
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
			])) : R("", !0)]),
			H(r, {
				modelValue: se.value,
				"onUpdate:modelValue": t[0] ||= (e) => se.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Z(() => [H(w, {
					variant: "solid",
					onClick: De
				}, {
					default: Z(() => [...t[3] ||= [V("OK", -1)]]),
					_: 1
				})]),
				default: Z(() => [B("p", Qi, J(oe.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-3153e8a3"]]);
//#endregion
export { $i as default };

//# sourceMappingURL=PlayerPage-D6ssy-kx.js.map