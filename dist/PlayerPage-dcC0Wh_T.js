import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./IconButton-BBHxcjCo.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { a as i } from "./usePreferencesStore-C9GLbD7G.js";
import { t as a } from "./useMessages-3JohNwBc.js";
import { c as o, l as s, t as c } from "./client-BzWwyWKr.js";
import { n as l, r as u } from "./useApiBase-CV_r-Kk4.js";
import { i as d } from "./usePlayerStore-Dgw0JCWb.js";
import { t as f } from "./useToastStore-BDoKlU6N.js";
import { n as p, t as m } from "./ThumbRating-DHcCwq-B.js";
import { a as h, n as g, o as _, r as v, t as y } from "./shortcuts-BJjIEmOV.js";
import { t as b } from "./Spinner-C4utUvmQ.js";
import { i as x } from "./usePageTitle-BO3GGF3M.js";
import { t as S } from "./Button-DWa6Ld_Z.js";
import { t as C } from "./Badge-B6MgOwKQ.js";
import { t as w } from "./Slider-LnnvB5jy.js";
import { t as ee } from "./Chip-DHwBdvXS.js";
import { t as T } from "./Select-Cvp-73pF.js";
import { t as te } from "./Modal-aFganlu3.js";
import { t as ne } from "./Skeleton-DhQmxeNg.js";
import { t as E } from "./EmptyState-ZlI5t4KT.js";
import { n as D } from "./media-query-DKjhlX8r.js";
import { n as O, o as k, r as A, t as re } from "./episode-order-C2yqgMeX.js";
import { n as ie, r as ae, t as oe } from "./useMediaItemCache-BKCJnCbr.js";
import { a as se, c as ce, d as le, f as j, i as ue, l as M, n as de, o as fe, r as pe, s as N, t as me, u as he } from "./captions-DoP7ce5A.js";
import { n as ge, t as _e } from "./SyncPlayModal-BIRer0ap.js";
import { Fragment as P, Transition as ve, computed as F, createBlock as I, createCommentVNode as L, createElementBlock as R, createElementVNode as z, createTextVNode as B, createVNode as V, defineComponent as H, inject as ye, mergeModels as be, nextTick as xe, normalizeClass as U, normalizeStyle as W, onBeforeUnmount as Se, onMounted as Ce, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as we, unref as Y, useModel as Te, watch as X, withCtx as Z, withModifiers as Ee } from "vue";
import { onBeforeRouteLeave as De, useRoute as Oe, useRouter as ke } from "vue-router";
//#region src/components/player/format-time.ts
function Ae(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var je = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Me = { class: "scrubber__track" }, Ne = ["title"], Pe = { class: "scrubber__time numeric" }, Fe = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		function ee(e) {
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
		function te() {
			l.value = !1;
		}
		function ne(e) {
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
			"aria-valuetext": Y(Ae)(e.position),
			"aria-label": Y(r)("player.seek"),
			onPointerdown: C,
			onPointermove: w,
			onPointerup: ee,
			onPointercancel: ee,
			onPointerenter: T,
			onPointerleave: te,
			onKeydown: ne
		}, [z("div", Me, [
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
			}, null, 12, Ne))), 128)),
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
		}, null, 4)) : L("", !0), z("span", Pe, J(Y(Ae)(_.value)), 1)], 4)) : L("", !0)], 40, je));
	}
}), [["__scopeId", "data-v-3d610715"]]), Ie = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Q(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Le(e) {
	return e === !0 || e === "true" || e === 1;
}
function Re(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function ze(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Q(e.url ?? e.src);
		r !== "" && t.push({
			index: Re(e.index),
			language: Q(e.language ?? e.lang ?? e.srclang),
			label: Q(e.label),
			default: Le(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Be(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Re(e.height);
		r <= 0 || t.push({
			id: Q(e.id),
			label: Q(e.label),
			height: r,
			width: Re(e.width),
			bitrate: Re(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Ve(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function He(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function Ue(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		masterUrl: Q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Q(t.status, "running"),
		reused: Le(t.reused),
		subtitles: ze(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Be(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function We(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		status: Q(t.status, "running"),
		playlistReady: Le(t.playlist_ready ?? t.playlistReady),
		progress: Re(t.progress),
		masterUrl: Q(t.master_url ?? t.masterUrl),
		subtitles: ze(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Be(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ge(e) {
	return e.playlistReady || e.status === "completed";
}
function Ke(e) {
	return Ie.has(e);
}
function qe(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Je(e) {
	let t = K("idle"), n = K(0), r = K([]), i = K([]), a = K(-1), o = K(!0), s = K(null), l = K(null), u = K([]), f = K(-1), p = K(null), m = K(null);
	function h(e) {
		if (!E) return;
		i.value = E.levels, a.value = E.getCurrentLevel(), o.value = E.autoLevelEnabled;
		let t = e ?? E.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function g() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, l.value = null;
	}
	function v(e) {
		E && (u.value = E.audioTracks, f.value = e ?? E.getCurrentAudioTrack());
	}
	function y() {
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
			url: qe(n, e.url)
		}));
	}
	let S = e.attach ?? _, C = e.pollIntervalMs ?? 1e3, w = e.maxWaitMs ?? 12e4, ee = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), T = Math.max(1, Math.ceil(w / Math.max(1, C))), te = Ye(), ne = e.getToken ?? (() => Xe(te)), E = null, D = null, O = null, k = !1, A = null;
	function re() {
		return e.client ?? new c({
			baseUrl: e.apiBase(),
			tokenStore: te ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function ie(i, a, o, s) {
		le(), k = !1, A = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = re(), c = Ue(await r.post(Ve(a, o), void 0, A.signal));
			if (k) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			x(c.subtitles), b(c.variants), p.value = c.jobId, m.value = qe(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < T; e++) {
				let e = We(await r.get(He(c.jobId), void 0, A.signal));
				if (k) return;
				if (n.value = e.progress, x(e.subtitles), b(e.variants), Ke(e.status)) throw Error(`transcode ${e.status}`);
				if (Ge(e)) {
					l = !0;
					break;
				}
				if (await ee(C), k) return;
			}
			if (!l) throw Error("transcode timed out");
			if (E = await S(i, m.value, {
				getToken: ne,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => h(),
				onError: () => {
					k || (t.value = "error");
				}
			}), k) {
				E.destroy(), E = null;
				return;
			}
			D = E.onLevelSwitched((e) => h(e)), O = E.onAudioTrackSwitched((e) => v(e)), h(), v();
			try {
				let e = d();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			k || (t.value = "error");
		}
	}
	function ae(e) {
		E && (E.setCurrentLevel(e === "auto" ? -1 : e), h());
	}
	function oe(e) {
		E && (E.setNextLevel(e === "auto" ? -1 : e), h());
	}
	function se(e) {
		E && (E.setAudioTrack(e), v());
	}
	function ce(e) {
		if (!E || !m.value) return;
		let t = m.value.replace("master.m3u8", `media_v${e}.m3u8`);
		E.loadSource(t), g();
	}
	function le() {
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
		p.value = null, m.value = null;
	}
	function j() {
		le(), t.value = "idle", n.value = 0, r.value = [], g(), y();
	}
	return {
		state: t,
		progress: n,
		subtitleTracks: r,
		levels: i,
		currentLevel: a,
		autoEnabled: o,
		activeLevelHeight: s,
		variants: l,
		audioTracks: u,
		currentAudioTrack: f,
		setLevel: ae,
		setNextLevel: oe,
		setAudioTrack: se,
		jobId: p,
		masterUrl: m,
		loadVariantPlaylist: ce,
		start: ie,
		cleanup: le,
		reset: j
	};
}
function Ye() {
	try {
		return new o();
	} catch {
		return null;
	}
}
function Xe(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var Ze = 10, Qe = 6;
function $e(e) {
	let t = K(null), n = K(!1), r = K(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new c({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % Ze, s = Math.floor(i / Ze), c = a / (Ze - 1) * 100, l = s / (Qe - 1) * 100;
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
		thumbnailAt: s,
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
}, st = { class: "shortcuts__label" }, ct = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => v }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = K(null);
		return r(l, we(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (G(), R("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= Ee((e) => s("close"), ["self"])
		}, [z("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [z("div", tt, [z("h3", nt, J(Y(c)("player.keyboard")), 1), V(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), z("ul", rt, [(G(!0), R(P, null, q(e.shortcuts, (e) => (G(), R("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [z("span", it, [(G(!0), R(P, null, q(e.keys, (e, n) => (G(), R(P, { key: n }, [e === "–" ? (G(), R("span", at, "–")) : (G(), R("kbd", ot, [Y(y)[e] ? (G(), I(t, {
			key: 0,
			name: Y(y)[e],
			label: Y(g)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), R(P, { key: 1 }, [B(J(e), 1)], 64))]))], 64))), 128))]), z("span", st, J(e.label), 1)]))), 128))])], 8, et)])) : L("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), lt = { class: "volume" }, ut = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "VolumeControl",
	setup(e) {
		let t = d(), r = i(), { t: o } = a(), s = F(() => t.muted ? 0 : t.volume), c = F(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return X(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (G(), R("div", lt, [V(n, {
			name: c.value,
			label: Y(t).muted ? Y(o)("player.unmute") : Y(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => Y(t).toggleMute()
		}, null, 8, ["name", "label"]), V(w, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), dt = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		return (e, t) => (G(), I(T, {
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
var St = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let r = e, o = Te(e, "open"), s = K(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = d(), f = i(), { t: p } = a(), m = F(() => gt(r.levels)), h = F(() => {
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
		}), g = F(() => m.value.length >= 2 ? m.value : h.value), _ = F(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = F(() => vt(r.levels, _.value)), y = F(() => _.value && v.value >= 0 ? {
			value: pt,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = F(() => g.value.length >= 2), x = F(() => r.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: ht(r.activeHeight) })), S = F(() => [
			{
				value: ft,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), C = F(() => r.autoEnabled ? ft : y.value && r.currentLevel === v.value && (u.quality === "original" || f.defaultQuality === "original") ? pt : xt(r.levels, r.currentLevel));
		function w(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), f.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : _t(r.levels, t);
			u.setQuality(t), f.defaultQuality = t, n >= 0 ? l("select", n) : l("select", t);
		}
		return t({ toggleMenu: c }), (e, t) => b.value || o.value ? (G(), I(T, {
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
}), [["__scopeId", "data-v-58498bdd"]]), Ct = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = F(() => ce(n.styleConfig)), a = null, o = null;
		function s() {
			r.value = le(a);
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
			c(), N(n.video, n.language);
			let e = j(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", s), r.value = le(e), !r.value.length) {
					let t = l(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", s));
				}
			} else r.value = [];
		}
		return X(() => [n.video, n.language], u, { immediate: !0 }), Se(c), t({ lines: r }), (t, n) => r.value.length ? (G(), R("div", {
			key: 0,
			class: U(["player__captions", { "is-lifted": e.lifted }]),
			style: W(i.value)
		}, [(G(!0), R(P, null, q(r.value, (e, t) => (G(), R("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : L("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), wt = ["aria-label", "aria-expanded"], Tt = ["aria-label"], Et = { class: "capmenu__head" }, Dt = { class: "capmenu__title" }, Ot = ["aria-label"], kt = ["aria-checked", "tabindex"], At = { class: "capmenu__check" }, jt = { class: "capmenu__optlabel" }, Mt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Nt = { class: "capmenu__check" }, Pt = { class: "capmenu__optlabel" }, Ft = { class: "capmenu__check" }, It = { class: "capmenu__optlabel" }, Lt = { class: "capmenu__title capmenu__title--sub" }, Rt = ["aria-label"], zt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Bt = { class: "capmenu__check" }, Vt = { class: "capmenu__optlabel" }, Ht = { class: "capmenu__title capmenu__title--sub" }, Ut = { class: "capmenu__style" }, Wt = { class: "capmenu__field" }, Gt = { class: "capmenu__fieldlabel" }, Kt = { class: "capmenu__field" }, qt = { class: "capmenu__fieldlabel" }, Jt = { class: "capmenu__field" }, Yt = { class: "capmenu__fieldlabel" }, Xt = { class: "capmenu__field" }, Zt = { class: "capmenu__fieldlabel" }, Qt = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		r(m, we(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function A(e) {
			p.value && !p.value.contains(e.target) && x();
		}
		return X(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", A, !0) : document.removeEventListener("pointerdown", A, !0));
		}, { immediate: !0 }), Se(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", A, !0);
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
		}, [V(t, { name: _.value }, null, 8, ["name"])], 10, wt), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(f)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			z("div", Et, [z("h3", Dt, J(Y(f)("player.subtitles")), 1), V(n, {
				name: "x",
				label: Y(f)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(f)("player.subtitleTrack"),
				onKeydown: te
			}, [z("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => S(null)
			}, [z("span", At, [g.value ? L("", !0) : (G(), I(t, {
				key: 0,
				name: "check"
			}))]), z("span", jt, J(Y(f)("player.off")), 1)], 8, kt), (G(!0), R(P, null, q(e.tracks, (e, n) => (G(), R("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [z("span", Nt, [h.value === e.language ? (G(), I(t, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", Pt, J(e.label), 1)], 8, Mt))), 128))], 40, Ot),
			z("button", {
				type: "button",
				class: "capmenu__add",
				onClick: w
			}, [z("span", Ft, [V(t, { name: "plus" })]), z("span", It, J(Y(f)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (G(), R(P, { key: 0 }, [z("h3", Lt, J(Y(f)("player.audio")), 1), z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(f)("player.audioTrack"),
				onKeydown: ne
			}, [(G(!0), R(P, null, q(e.audioTracks, (n) => (G(), R("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => C(n.index)
			}, [z("span", Bt, [e.activeAudio === n.index ? (G(), I(t, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", Vt, J(n.label), 1)], 8, zt))), 128))], 40, Rt)], 64)) : L("", !0),
			z("h3", Ht, J(Y(f)("player.captionStyle")), 1),
			z("div", Ut, [
				z("div", Wt, [z("span", Gt, J(Y(f)("player.size")), 1), V(T, {
					"model-value": Y(u).captionStyle.size,
					options: Y(ue),
					label: Y(f)("player.captionSize"),
					"onUpdate:modelValue": E
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", Kt, [z("span", qt, J(Y(f)("player.color")), 1), V(T, {
					"model-value": Y(u).captionStyle.textColor,
					options: Y(de),
					label: Y(f)("player.captionColor"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", Jt, [z("span", Yt, J(Y(f)("player.background")), 1), V(T, {
					"model-value": Y(u).captionStyle.background,
					options: Y(me),
					label: Y(f)("player.captionBackground"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", Xt, [z("span", Zt, J(Y(f)("player.edge")), 1), V(T, {
					"model-value": Y(u).captionStyle.edge,
					options: Y(pe),
					label: Y(f)("player.captionEdge"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Tt)) : L("", !0)], 512));
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
}, cn = { class: "subsearch__meta" }, ln = { class: "subsearch__release" }, un = { class: "subsearch__signals" }, dn = { class: "subsearch__provider" }, fn = {
	key: 1,
	class: "subsearch__stat"
}, pn = {
	key: 2,
	class: "subsearch__stat"
}, mn = {
	key: 3,
	class: "subsearch__stat"
}, hn = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let _ = K(!1), v = K(!1), y = K([]), x = K(/* @__PURE__ */ new Set()), w = K(/* @__PURE__ */ new Set());
		function T(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let ne = F(() => [...y.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), D = F(() => m.value.size > 0 && !_.value);
		function O() {
			return r.client ?? new c({ baseUrl: r.apiBase ?? "" });
		}
		async function k() {
			if (D.value) {
				_.value = !0, v.value = !0;
				try {
					y.value = await O().searchSubtitles(r.mediaId, [...m.value]);
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
			if (e instanceof s) {
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
			let t = T(e);
			if (x.value.has(t) || w.value.has(t)) return;
			let n = new Set(x.value);
			n.add(t), x.value = n;
			try {
				let n = ze([(await O().downloadSubtitle(r.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], a = new Set(w.value);
				a.add(t), w.value = a;
				let s = d(e.language);
				l.success(s ? o("player.subtitleAdded", { language: s }) : o("player.subtitleAddedGeneric")), n && i("added", n);
			} catch (e) {
				re(e);
			} finally {
				let e = new Set(x.value);
				e.delete(t), x.value = e;
			}
		}
		return X(() => r.open, (e) => {
			e && (h(), y.value = [], v.value = !1, _.value = !1, x.value = /* @__PURE__ */ new Set(), w.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (n, r) => (G(), I(te, {
			"model-value": e.open,
			title: Y(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => i("update:open", e)
		}, {
			footer: Z(() => [V(S, {
				variant: "ghost",
				onClick: A
			}, {
				default: Z(() => [B(J(Y(o)("common.close")), 1)]),
				_: 1
			})]),
			default: Z(() => [z("div", $t, [
				z("fieldset", en, [z("legend", tn, J(Y(o)("player.subtitleSearchLanguages")), 1), z("div", nn, [(G(!0), R(P, null, q(p.value, (e) => (G(), I(ee, {
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
				z("div", rn, [V(S, {
					variant: "solid",
					"left-icon": "search",
					loading: _.value,
					disabled: !D.value,
					onClick: k
				}, {
					default: Z(() => [B(J(Y(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				_.value ? (G(), R("div", an, [V(b, { label: Y(o)("player.subtitleSearching") }, null, 8, ["label"]), z("span", null, J(Y(o)("player.subtitleSearching")), 1)])) : v.value && ne.value.length === 0 ? (G(), I(E, {
					key: 1,
					icon: "captions",
					title: Y(o)("player.subtitleSearchEmpty"),
					description: Y(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : v.value ? (G(), R("ul", sn, [(G(!0), R(P, null, q(ne.value, (e) => (G(), R("li", {
					key: T(e),
					class: "subsearch__item"
				}, [z("div", cn, [z("p", ln, J(e.releaseName || e.provider), 1), z("div", un, [
					V(C, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Z(() => [B(J(d(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (G(), I(C, {
						key: 0,
						tone: "info",
						size: "sm",
						label: Y(o)("player.subtitleHearingImpairedFull")
					}, {
						default: Z(() => [B(J(Y(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : L("", !0),
					z("span", dn, J(e.provider), 1),
					e.rating > 0 ? (G(), R("span", fn, [V(t, { name: "star" }), B(" " + J(e.rating), 1)])) : L("", !0),
					e.downloadCount > 0 ? (G(), R("span", pn, J(Y(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : L("", !0),
					e.fps ? (G(), R("span", mn, J(Y(o)("player.subtitleFps", { fps: e.fps })), 1)) : L("", !0)
				])]), V(S, {
					variant: "outline",
					size: "sm",
					"left-icon": w.value.has(T(e)) ? "check" : "plus",
					loading: x.value.has(T(e)),
					disabled: x.value.has(T(e)) || w.value.has(T(e)),
					"aria-label": Y(o)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => ae(e)
				}, {
					default: Z(() => [B(J(x.value.has(T(e)) ? Y(o)("player.subtitleAdding") : Y(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (G(), R("p", on, J(Y(o)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-815b62e0"]]), gn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function $(e, t, n, r, i, a, o) {
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
function _n(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: $(e, t, n, 0, 0, r, n),
		right: $(e, t, n, t - r, 0, t, n),
		center: $(e, t, n, 0, 0, t, n)
	};
}
function vn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function yn(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${vn(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${vn(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${vn(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function bn(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var xn = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
			r.value = bn(i);
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
				c.value = yn(_n(n, 32, 18));
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
		}, { immediate: !0 }), Ce(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Se(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let ee = F(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (G(), R("div", {
			class: U(["player__ambient", { "is-active": o.value }]),
			style: W(o.value ? ee.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Sn = ["aria-label"], Cn = { class: "resume__label" }, wn = { class: "resume__time numeric" }, Tn = { class: "resume__actions" }, En = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = F(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (G(), R("div", {
			class: "resume",
			role: "region",
			"aria-label": Y(i)("player.resumePlayback")
		}, [z("p", Cn, [
			B(J(o.value[0]), 1),
			z("span", wn, J(Y(Ae)(e.seconds)), 1),
			B(J(o.value[1]), 1)
		]), z("div", Tn, [z("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [V(t, { name: "play" }), z("span", null, J(Y(i)("player.resume")), 1)]), z("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [V(t, { name: "rewind" }), z("span", null, J(Y(i)("player.startOver")), 1)])])], 8, Sn));
	}
}), [["__scopeId", "data-v-271c5209"]]), Dn = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], On = /* @__PURE__ */ new Set([
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
function kn(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function An(...e) {
	return e.some((e) => On.has(kn(e)));
}
function jn(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Mn(e) {
	return e?.error?.code === 2;
}
function Nn(e) {
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
var Pn = 2 * Math.PI * 15;
function Fn(e, t, n = Pn) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var In = /* @__PURE__ */ new Map([
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
]), Ln = [
	"video/mp4; codecs=\"hvc1.1.4.L120.90\"",
	"video/mp4; codecs=\"hev1.1.4.L120.90\"",
	"video/mp4; codecs=\"hvc1.1.6.L93.B0\"",
	"video/mp4; codecs=\"hvc1.1.4.L120\""
];
function Rn(e, t = "video/mp4") {
	let n = In.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function zn(e, t = "video/mp4") {
	if (!e) return !0;
	let n = Rn(e, t);
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
async function Bn() {
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
		for (let t of Ln) {
			let n = e.canPlayType(t);
			if (n === "probably" || n === "maybe") return !0;
		}
	}
	return !1;
}
async function Vn(e, t) {
	if (An(...e)) return !0;
	let n = e.map((e) => kn(e)).find((e) => Dn.includes(e)) ?? "", r = n ? `video/${n}` : "video/mp4";
	if (Dn.includes(n) && t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await zn(e.codec, r) || (n === "mp4" || n === "m4v") && !await Bn()) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Hn = ["aria-label"], Un = ["src"], Wn = { class: "upnext__body" }, Gn = { class: "upnext__eyebrow" }, Kn = { class: "upnext__title" }, qn = {
	key: 0,
	class: "upnext__cd numeric"
}, Jn = { class: "upnext__actions" }, Yn = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Xn = ["r"], Zn = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Qn = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let { t: r } = a(), i = e, o = n, s = F(() => i.posterUrl ?? i.media.poster_url ?? null), c = F(() => Fn(i.remaining, i.total));
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
			}, null, 8, Un)) : L("", !0),
			z("div", Wn, [
				z("p", Gn, J(Y(r)("player.upNext")), 1),
				z("h4", Kn, J(e.media.name), 1),
				e.counting ? (G(), R("p", qn, J(Y(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : L("", !0),
				z("div", Jn, [z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => o("play-now")
				}, [V(t, { name: "play" }), z("span", null, J(Y(r)("player.playNow")), 1)]), z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => o("cancel")
				}, J(Y(r)("player.cancel")), 1)])
			]),
			e.counting ? (G(), R("svg", Yn, [z("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Xn), z("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Y(Pn),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Zn)])) : L("", !0)
		], 8, Hn));
	}
}), [["__scopeId", "data-v-85909b2d"]]), $n = {
	class: "transcode",
	role: "alert"
}, er = { class: "transcode__card" }, tr = { class: "transcode__heading" }, nr = { class: "transcode__body" }, rr = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (G(), R("div", $n, [z("div", er, [
			V(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			z("h3", tr, J(Y(i)("player.transcodeHeading")), 1),
			z("p", nr, J(e.title ? Y(i)("player.transcodeBodyTitled", { title: e.title }) : Y(i)("player.transcodeBodyUntitled")), 1),
			z("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [V(t, { name: "arrow-left" }), z("span", null, J(Y(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), ir = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, ar = { class: "prep__card" }, or = { class: "prep__heading" }, sr = { class: "prep__body" }, cr = ["aria-valuenow"], lr = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (G(), R("div", ir, [z("div", ar, [
			V(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			z("h3", or, J(Y(r)("player.transcodePreparingHeading")), 1),
			z("p", sr, J(e.title ? Y(r)("player.transcodePreparingTitled", { title: e.title }) : Y(r)("player.transcodePreparingUntitled")), 1),
			z("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [z("div", {
				class: "prep__bar-fill",
				style: W({ width: i() + "%" })
			}, null, 4)], 8, cr),
			z("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [V(t, { name: "arrow-left" }), z("span", null, J(Y(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), ur = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		return (e, n) => (G(), I(ve, { name: "skip" }, {
			default: Z(() => [c.value ? (G(), R("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ee(l, ["stop"])
			}, [z("span", null, J(c.value.label), 1), V(t, { name: "skip-forward" })])) : L("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), dr = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, fr = ["aria-label", "onClick"], pr = { class: "skip-controls__label" }, mr = 5, hr = 30, gr = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
			let n = s(e.startMs), r = n - mr, i = n + hr;
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
		return (e, n) => f.value.length > 0 ? (G(), R("div", dr, [(G(!0), R(P, null, q(f.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: Ee((t) => p(e), ["stop"])
		}, [z("span", pr, J(d(e.type)), 1), V(t, { name: "skip-forward" })], 8, fr))), 128))])) : L("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), _r = ["aria-label", "aria-expanded"], vr = ["aria-label"], yr = { class: "chapterlist__head" }, br = { class: "chapterlist__title" }, xr = ["aria-label"], Sr = ["onClick"], Cr = { class: "chapterlist__index" }, wr = { class: "chapterlist__name" }, Tr = { class: "chapterlist__meta" }, Er = { class: "chapterlist__time" }, Dr = {
	key: 0,
	class: "chapterlist__duration"
}, Or = {
	key: 1,
	class: "chapterlist__empty"
}, kr = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Ae(e.start), a;
			return e.end != null && e.end > e.start && (a = Ae(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = K(null), p = K(null);
		r(p, we(o, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		X(() => o.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), Se(() => {
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
		}, [V(t, { name: "list" })], 10, _r), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.chapterList"),
			tabindex: "-1"
		}, [z("div", yr, [z("h3", br, J(Y(c)("player.chapters")), 1), V(n, {
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
			z("span", Cr, J(e.index), 1),
			z("span", wr, J(e.label), 1),
			z("span", Tr, [z("span", Er, J(e.startLabel), 1), e.durationLabel ? (G(), R("span", Dr, "· " + J(e.durationLabel), 1)) : L("", !0)])
		], 8, Sr)]))), 128))], 8, xr)) : (G(), R("p", Or, J(Y(c)("player.noChapters")), 1))], 8, vr)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Ar = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, jr = { class: "marker-timeline__ticks" }, Mr = [
	"title",
	"aria-label",
	"onClick"
], Nr = { class: "marker-timeline__tooltip" }, Pr = { class: "marker-timeline__tooltip-label" }, Fr = { class: "marker-timeline__tooltip-time numeric" }, Ir = ["onClick"], Lr = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		}, [l.value ? (G(), R("div", Ar, [t[0] ||= z("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [z("polygon", { points: "5,3 19,12 5,21" })], -1), B(" " + J(u.value), 1)])) : L("", !0), z("div", jr, [(G(!0), R(P, null, q(s.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: U(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: W({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Y(Ae)(e.startSec)}`,
			"aria-label": `${e.label} at ${Y(Ae)(e.startSec)}`,
			onClick: Ee((t) => d(e), ["stop"])
		}, [z("span", Nr, [
			z("span", Pr, J(e.label), 1),
			z("span", Fr, J(Y(Ae)(e.startSec)), 1),
			z("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ee((t) => f(e), ["stop"])
			}, " Find similar ", 8, Ir)
		])], 14, Mr))), 128))])], 2)) : L("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Rr = ["aria-label", "aria-expanded"], zr = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, Br = ["aria-label"], Vr = ["aria-selected", "onClick"], Hr = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		return Se(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (G(), R("div", { class: U(["sleep-timer", { "is-active": l.value }]) }, [z("button", {
			type: "button",
			class: U(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : Y(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [V(t, { name: "moon" }), l.value ? (G(), R("span", zr, J(m(c.value)), 1)) : L("", !0)], 10, Rr), V(ve, { name: "dropdown" }, {
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
			}, J(e.label), 11, Vr)), 64))], 8, Br)) : L("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Ur = {
	key: 0,
	class: "syncplay-overlay"
}, Wr = { class: "syncplay-overlay__badge" }, Gr = { class: "syncplay-overlay__label" }, Kr = { class: "syncplay-overlay__status-label" }, qr = { class: "syncplay-overlay__members" }, Jr = { class: "syncplay-overlay__member-count" }, Yr = { class: "syncplay-overlay__member-list" }, Xr = { class: "syncplay-overlay__member-name" }, Zr = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Qr = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = a(), i = ge(), o = l(), s = F(() => n.apiBase ?? o.value), c = F(() => i.currentRoom?.name ?? "SyncPlay"), u = F(() => i.onlineMembers.length), d = F(() => i.syncStatus), f = F(() => {
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
		return (e, n) => Y(i).isInRoom ? (G(), R("div", Ur, [
			z("div", Wr, [V(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), z("span", Gr, "SyncPlay: " + J(c.value), 1)]),
			z("div", { class: U(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [V(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), z("span", Kr, J(f.value), 1)], 2),
			z("div", qr, [z("span", Jr, [V(t, { name: "user" }), B(" " + J(u.value) + " " + J(Y(r)("syncplay.members", { count: u.value })), 1)]), z("ul", Yr, [(G(!0), R(P, null, q(Y(i).onlineMembers.slice(0, 5), (e) => (G(), R("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= z("span", { class: "syncplay-overlay__member-dot" }, null, -1), z("span", Xr, J(e.name), 1)]))), 128)), Y(i).onlineMembers.length > 5 ? (G(), R("li", Zr, " +" + J(Y(i).onlineMembers.length - 5) + " more ", 1)) : L("", !0)])]),
			V(S, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: Z(() => [B(J(Y(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), $r = {
	key: 0,
	class: "syncplay-controls"
}, ei = ["aria-label"], ti = { class: "syncplay-controls__wait-label" }, ni = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, ri = { key: 0 }, ii = { class: "syncplay-controls__transport" }, ai = ["aria-label"], oi = ["aria-label"], si = ["aria-label"], ci = { class: "syncplay-controls__status-label" }, li = 10, ui = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let r = e, i = n, { t: o } = a(), s = ge(), c = l(), u = F(() => r.apiBase ?? c.value), d = K(!1), f = K([]), p = F(() => d.value || s.syncStatus === "re-syncing");
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
			await _(Math.max(0, r.position - li));
		}
		async function y() {
			await _(Math.min(r.duration, r.position + li));
		}
		return X(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => Y(s).isInRoom ? (G(), R("div", $r, [
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
				z("span", ti, J(Y(o)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (G(), R("span", ni, [B(J(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (G(), R("span", ri, "+" + J(f.value.length - 3), 1)) : L("", !0)])) : L("", !0)
			], 8, ei)) : L("", !0),
			z("div", ii, [
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.rewind"),
					onClick: v
				}, [V(t, { name: "rewind" })], 8, ai),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Y(o)("syncplay.pauseAll") : Y(o)("syncplay.playAll"),
					onClick: g
				}, [V(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, oi),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.fastForward"),
					onClick: y
				}, [V(t, { name: "forward" })], 8, si)
			]),
			z("div", { class: U(["syncplay-controls__status", `syncplay-controls__status--${Y(s).syncStatus}`]) }, [V(t, {
				name: Y(s).syncStatus === "synced" ? "check" : Y(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), z("span", ci, J(Y(s).syncStatus === "synced" ? Y(o)("syncplay.synced") : Y(s).syncStatus === "outOfSync" ? Y(o)("syncplay.outOfSync") : Y(o)("syncplay.reSyncing")), 1)], 2)
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), di = { class: "player__stage" }, fi = ["src", "poster"], pi = [
	"src",
	"srclang",
	"label",
	"default"
], mi = { class: "player__meta" }, hi = ["aria-label"], gi = { class: "player__meta-text" }, _i = { class: "player__eyebrow" }, vi = { class: "player__title" }, yi = { class: "player__sub numeric" }, bi = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, xi = {
	key: 0,
	class: "player__center"
}, Si = ["aria-label"], Ci = { class: "player__btnrow" }, wi = ["aria-label"], Ti = ["aria-label"], Ei = ["aria-label"], Di = { class: "player__time numeric" }, Oi = ["aria-label", "aria-pressed"], ki = ["title"], Ai = ["aria-label"], ji = ["aria-label"], Mi = ["aria-label", "aria-pressed"], Ni = ["aria-label", "aria-pressed"], Pi = ["aria-label"], Fi = { class: "similar-modal" }, Ii = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Li = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, Ri = { class: "similar-modal__state-title" }, zi = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, Bi = {
	key: 3,
	class: "similar-modal__results"
}, Vi = { class: "similar-modal__poster" }, Hi = ["src", "alt"], Ui = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Wi = { class: "similar-modal__result-body" }, Gi = { class: "similar-modal__result-title" }, Ki = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, qi = { key: 0 }, Ji = /*#__PURE__*/ e(/* @__PURE__ */ H({
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
		let r = e, o = n, s = d(), l = i(), { t: u } = a(), g = ge(), _ = p(), v = F(() => _.isFavorite(r.media.id)), y = F(() => _.likeLevel(r.media.id));
		function x() {
			_.toggleFavorite(r.media.id, pe());
		}
		function S(e) {
			_.setLike(r.media.id, e, pe());
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
		], w = K(null), ee = K(null), T = K(!0), ne = K(!1), E = K(!1), D = K(!1), O = K(!1), k = K(!1), A = K(!1), re = K(null), ie = K(null), ae = K(!1), oe = f(), ce = K(!1), le = F(() => O.value ? 1.35 : 1), j = K(An(r.streamUrl, r.media.path));
		async function ue() {
			if (j.value) return;
			let e = r.playbackAudioTracks ?? [];
			e.length !== 0 && await Vn([r.streamUrl, r.media.path], e) && (j.value = !0);
		}
		X(() => r.playbackAudioTracks, (e) => {
			!e || e.length === 0 || ue();
		}, { immediate: !1 });
		let de = ye("phlixConfig", null);
		function pe() {
			return de?.apiBase ?? "";
		}
		let N = Je({
			apiBase: () => r.apiBase ?? "",
			hlsConfig: de?.playerHlsConfig
		}), me = $e({ apiBase: () => r.apiBase ?? "" }), ve = null;
		function H(e) {
			ve !== null && clearTimeout(ve), ve = setTimeout(() => {
				ve = null, me.fetch(e);
			}, 0);
		}
		let be = F(() => r.thumbnailAt ?? me.thumbnailAt), W = F(() => j.value ? void 0 : r.streamUrl), we = F(() => j.value && N.state.value !== "ready"), Te = F(() => j.value && (N.state.value === "preparing" || N.state.value === "idle")), De = F(() => j.value && N.state.value === "error");
		function Oe(e = 0) {
			let t = w.value;
			t && N.start(t, r.media.id, void 0, e);
		}
		function ke(e) {
			if (s.quality === "original" && e !== "auto") {
				N.loadVariantPlaylist(pt);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				N.loadVariantPlaylist(e);
				return;
			}
			N.setLevel(e);
		}
		let je = !1;
		function Me() {
			l.defaultQuality = ft;
		}
		function Ne() {
			let e = N.levels.value;
			if (e.length === 0) return !1;
			let t = l.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = N.variants.value;
				if (!t || t.length === 0) return !1;
				if (bt(e, t)) N.loadVariantPlaylist(pt);
				else {
					let t = yt(e);
					t >= 0 && N.setNextLevel(t), Me();
				}
				return !0;
			}
			let n = _t(e, t);
			return n >= 0 ? N.setNextLevel(n) : Me(), !0;
		}
		X(() => N.levels.value, (e) => {
			je || e.length === 0 || Ne() && (je = !0);
		}), X(() => N.variants.value, (e) => {
			je || !e?.length || xe(() => {
				je || Ne() && (je = !0);
			});
		}, { deep: !0 });
		let Pe = K(s.resumePositionFor(r.media.id) ?? 0), Ie = K(!j.value && Pe.value > 0), Q = null, Le = K(!1), Re = K(8), ze, Be = K(null), Ve = K(0), He = K(!1), Ue = K([]), We = K(!1), Ge = K(null);
		function Ke(e, t) {
			Be.value = e, Ve.value = t, Ue.value = [], Ge.value = null, He.value = !0, Qe(e, t);
		}
		let qe = null, Ye = null, Xe = null;
		function Ze() {
			let e = r.apiBase ?? "";
			return (Ye === null || Xe !== e) && (Ye = new c({ baseUrl: e }), Xe = e), Ye;
		}
		async function Qe(e, t) {
			qe?.abort(), qe = new AbortController(), We.value = !0, Ge.value = null;
			try {
				let n = await Ze().searchByMarker(e, t, 30, 20, qe.signal);
				Ue.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Ge.value = "Failed to load similar media. Please try again.", Ue.value = [];
			} finally {
				We.value = !1;
			}
		}
		function et() {
			qe?.abort(), He.value = !1, Ue.value = [], Ge.value = null, Be.value = null;
		}
		let tt = F(() => s.upNext);
		function nt() {
			j.value = An(r.streamUrl, r.media.path), ue(), Pe.value = s.resumePositionFor(r.media.id) ?? 0, Ie.value = !j.value && Pe.value > 0, Q = null, $t = !1, Bt = !1, Lt.value = [], It.value = !1, Vt = !1, kt.value = -1, qt = null, je = !1, ot(), Le.value = !1, N.reset(), w.value && (w.value.currentTime = 0), j.value && Oe(), H(r.media.id);
		}
		function rt(e) {
			let t = w.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Q = Math.max(0, e));
		}
		function it() {
			rt(Pe.value), Ie.value = !1, w.value?.play()?.catch(() => {});
		}
		function at() {
			Q = null, rt(0), s.clearResume(r.media.id), Ie.value = !1, w.value?.play()?.catch(() => {});
		}
		function ot() {
			ze &&= (clearInterval(ze), void 0);
		}
		function st() {
			Re.value = 8, ot(), ze = setInterval(() => {
				--Re.value, Re.value <= 0 && (ot(), mt());
			}, 1e3);
		}
		function lt() {
			Ln(), T.value = !0, s.upNext && (Le.value = !0, l.autoplay && st());
		}
		function mt() {
			ot(), Le.value = !1;
			let e = s.next(r.streamUrlFor);
			e && o("play-next", e);
		}
		function ht() {
			ot(), Le.value = !1;
		}
		function gt() {
			if (j.value) return;
			let e = w.value, t = Mn(e) && (e?.currentTime ?? 0) === 0;
			(jn(e) || t) && (j.value = !0, Oe(e?.currentTime ?? 0));
		}
		let vt = K([]), xt = K([]), wt = K(-1), Tt = K(!1), Et = F(() => N.state.value === "ready" && N.audioTracks.value.length > 0), Dt = F(() => N.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Ot = F(() => (r.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), kt = K(-1), At = F(() => !Et.value && !j.value && xt.value.length === 0 && Ot.value.length > 1), jt = F(() => Et.value ? Dt.value : At.value ? Ot.value : xt.value), Mt = F(() => {
			if (Et.value) return N.currentAudioTrack.value;
			if (At.value) {
				if (kt.value >= 0) return kt.value;
				let e = (r.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : r.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return wt.value;
		}), Nt = K(!1), Pt = s.subtitleLang, Ft = F(() => {
			let e = j.value ? N.subtitleTracks.value : r.playbackSubtitleTracks ?? [];
			if (Lt.value.length === 0) return e;
			let t = new Set(e.map((e) => e.url)), n = Lt.value.filter((e) => !t.has(e.url));
			return n.length === 0 ? e : [...e, ...n];
		}), It = K(!1), Lt = K([]), Rt = F(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(l.defaultSubtitleLang), t(l.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function zt(e) {
			Lt.value.some((t) => t.url === e.url) || (Lt.value = [...Lt.value, e]);
		}
		let Bt = !1, Vt = !1;
		function Ht() {
			if (Bt) return;
			if (l.subtitlePreferenceSet) {
				Bt = !0;
				return;
			}
			let e = Ft.value.find((e) => e.default);
			if (!e) return;
			let t = vt.value.find((t) => t.language === (e.language || e.label));
			t && (s.setSubtitle(t.language), Pt = t.language, Bt = !0);
		}
		function Ut() {
			if (Vt) return;
			let e = l.defaultAudioLang;
			if (!e) return;
			let t = jt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Mt.value;
			r >= 0 && r < t.length || (Jt(n), Vt = !0);
		}
		let Wt = F(() => vt.value.some((e) => e.language === s.subtitleLang));
		function Gt() {
			let e = w.value;
			vt.value = he(e), xt.value = M(e), wt.value = se(e), Ht(), Ut();
		}
		function Kt() {
			if (Wt.value) Pt = s.subtitleLang, s.setSubtitle(null);
			else {
				let e = Pt && vt.value.some((e) => e.language === Pt) ? Pt : vt.value[0]?.language ?? null;
				s.setSubtitle(e);
			}
			o("captions");
		}
		let qt = null;
		function Jt(e) {
			if (Et.value) N.setAudioTrack(e);
			else if (At.value) {
				if (e === Mt.value) return;
				kt.value = e, qt = e, j.value = !0, Oe(w.value?.currentTime ?? 0);
			} else fe(w.value, e), wt.value = e;
		}
		X(Et, (e) => {
			if (!e || qt === null) return;
			let t = qt;
			qt = null, t >= 0 && t < N.audioTracks.value.length && N.setAudioTrack(t);
		}), X(Ft, () => {
			xe(() => Gt());
		}, { deep: !0 });
		let Yt = null, Xt, Zt = F(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), $t = !1;
		function en() {
			if (!r.autoplay || $t || Ie.value || we.value) return;
			let e = w.value;
			if (!e || !e.paused) return;
			$t = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, s.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function tn() {
			en();
		}
		function nn() {
			r.prevEpisode && o("play-episode", r.prevEpisode);
		}
		function rn() {
			r.nextEpisode && o("play-episode", r.nextEpisode);
		}
		function an() {
			let e = w.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function on(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function sn() {
			s.play(), s.setMediaPositionState();
		}
		function cn() {
			s.pause(), s.setMediaPositionState();
		}
		function ln() {
			let e = w.value;
			e && s.updateProgress(e.currentTime, e.duration, on(e));
		}
		function un() {
			let e = w.value;
			e && (e.volume = s.volume, e.muted = s.muted, e.playbackRate = s.rate, Q !== null && (e.currentTime = e.duration ? Math.min(e.duration, Q) : Q, Q = null), s.updateProgress(e.currentTime, e.duration, on(e)), s.setMediaPositionState(), Gt());
		}
		function dn() {
			let e = w.value;
			e && s.updateProgress(e.currentTime, e.duration, on(e));
		}
		function fn() {
			let e = w.value;
			e && (Math.abs(e.volume - s.volume) > .001 && s.setVolume(e.volume), e.muted !== s.muted && s.toggleMute());
		}
		function pn() {
			let e = w.value;
			e && e.playbackRate !== s.rate && s.setRate(e.playbackRate), s.setMediaPositionState();
		}
		function mn() {
			s.setMediaPositionState();
		}
		function gn() {
			s.setMediaPositionState();
		}
		function $(e) {
			let t = w.value;
			t && s.duration > 0 && (t.currentTime = Math.min(s.duration, Math.max(0, e)));
		}
		function _n() {
			E.value = !0, zn();
		}
		function vn() {
			E.value = !1, zn();
		}
		function yn(e) {
			let t = C.reduce((e, t, n) => Math.abs(t - s.rate) < Math.abs(C[e] - s.rate) ? n : e, 0), n = C[Math.min(C.length - 1, Math.max(0, t + e))];
			s.setRate(n);
		}
		function bn() {
			if (!r.markers) return;
			let e = s.position, t = r.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Sn() {
			if (!r.markers) return;
			let e = s.position, t = r.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Cn() {
			re.value?.toggleOpen();
		}
		let wn = null;
		function Tn() {
			let e = w.value;
			if (!e) {
				s.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), s.pause();
				return;
			}
			wn !== null && (clearInterval(wn), wn = null);
			let t = .05;
			wn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(wn), wn = null, e.volume = 0, e.pause(), s.pause());
			}, 50);
		}
		h({
			playPause: an,
			seekBy: (e) => $(s.position + e),
			frameStep: (e) => {
				s.playing || $(s.position + e / 30);
			},
			volumeBy: (e) => s.setVolume(s.volume + e),
			toggleMute: Dn,
			toggleFullscreen: kn,
			toggleCaptions: Kt,
			toggleTheater: On,
			togglePip: Pn,
			skipIntro: bn,
			skipOutro: Sn,
			sleepTimer: Cn,
			seekToPercent: (e) => $(e * s.duration),
			speedStep: yn,
			toggleHelp: () => {
				D.value = !D.value;
			},
			toggleQuality: () => {
				j.value ? (ae.value = !ae.value, ie.value?.toggleMenu?.()) : oe.show({
					message: u("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !D.value && !Tt.value && !Nt.value });
		function Dn() {
			s.toggleMute();
		}
		function On() {
			O.value = !O.value, o("theater", O.value);
		}
		X(() => s.muted, (e) => {
			let t = w.value;
			t && t.muted !== e && (t.muted = e);
		}), X(() => s.volume, (e) => {
			let t = w.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), X(() => s.rate, (e) => {
			let t = w.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), X(() => s.lastCommand, (e) => {
			e && (e.type === "seekTo" ? rt(e.value) : e.type === "seekBy" && rt(s.position + e.value));
		});
		function kn() {
			if (typeof document > "u") return;
			let e = ee.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function Nn() {
			ne.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Pn() {
			let e = w.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function Fn() {
			k.value = !0;
		}
		function In() {
			k.value = !1;
		}
		function Ln() {
			Xt &&= (clearTimeout(Xt), void 0);
		}
		function Rn() {
			Ln(), !(!s.playing || E.value) && (Xt = setTimeout(() => {
				s.playing && !E.value && (T.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function zn() {
			T.value = !0, Rn();
		}
		X(() => s.playing, (e) => {
			e ? (Ie.value = !1, ht(), Rn()) : (Ln(), T.value = !0);
		});
		let Bn = null;
		return Ce(() => {
			s.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), _.hydrate(r.media), typeof document < "u" && (document.addEventListener("fullscreenchange", Nn), A.value = document.pictureInPictureEnabled === !0), Bn = s.bindMediaSession({
				onPlay: () => void w.value?.play()?.catch(() => {}),
				onPause: () => w.value?.pause(),
				onSeek: (e) => $(e)
			}), Yt = w.value?.textTracks ?? null, Yt?.addEventListener?.("addtrack", Gt), Yt?.addEventListener?.("removetrack", Gt), Gt(), j.value && Oe(), H(r.media.id);
		}), X(() => r.media, (e) => {
			s.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), nt();
		}), X(() => r.media?.id, () => {
			_.hydrate(r.media);
		}), X(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (w.value?.play(), s.play()) : e.state === "paused" && (w.value?.pause(), s.pause()), g.updateLocalPosition(s.position), Math.abs(g.driftAmount) > 2 && rt(e.playbackPosition));
		}), Se(() => {
			Ln(), ot(), N.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", Nn), Bn?.(), Yt?.removeEventListener?.("addtrack", Gt), Yt?.removeEventListener?.("removetrack", Gt), wn !== null && (clearInterval(wn), wn = null), ve !== null && (clearTimeout(ve), ve = null);
		}), (n, r) => (G(), R("div", {
			ref_key: "containerRef",
			ref: ee,
			class: U(["player", {
				"is-chrome-hidden": !T.value,
				"is-theater": O.value
			}]),
			onPointermove: zn,
			onPointerdown: zn,
			onFocusin: zn
		}, [V(xn, {
			video: w.value,
			enabled: Y(l).atmosphere,
			playing: Y(s).playing,
			"reduced-motion": Y(l).effectiveReducedMotion,
			intensity: le.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), z("div", di, [
			z("video", {
				ref_key: "videoRef",
				ref: w,
				class: "player__video",
				src: W.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: sn,
				onPause: cn,
				onTimeupdate: ln,
				onLoadedmetadata: un,
				onCanplay: tn,
				onProgress: dn,
				onVolumechange: fn,
				onRatechange: pn,
				onSeeked: mn,
				onDurationchange: gn,
				onEnded: lt,
				onError: gt,
				onEnterpictureinpicture: Fn,
				onLeavepictureinpicture: In,
				onClick: an
			}, [(G(!0), R(P, null, q(Ft.value, (e) => (G(), R("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, pi))), 128))], 40, fi),
			r[20] ||= z("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[21] ||= z("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			z("div", mi, [z("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Y(u)("player.back"),
				onClick: r[0] ||= Ee((e) => o("back"), ["stop"])
			}, [V(t, { name: "arrow-left" })], 8, hi), z("div", gi, [
				z("p", _i, J(Y(u)("player.nowPlaying")), 1),
				z("h2", vi, J(e.media.name), 1),
				z("div", yi, [(G(!0), R(P, null, q(Zt.value, (e, t) => (G(), R(P, { key: t }, [t > 0 && !e.cert ? (G(), R("span", bi, "·")) : L("", !0), z("span", { class: U({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			we.value ? L("", !0) : (G(), R("div", xi, [z("button", {
				type: "button",
				class: U(["player__bigplay", { "is-playing": Y(s).playing }]),
				"aria-label": Y(s).playing ? Y(u)("player.pause") : Y(u)("player.play"),
				onClick: Ee(an, ["stop"])
			}, [V(t, { name: Y(s).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Si)])),
			V(Ct, {
				video: w.value,
				language: Y(s).subtitleLang,
				"style-config": Y(l).captionStyle,
				lifted: T.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			we.value ? L("", !0) : (G(), R("div", {
				key: 1,
				class: "player__controls",
				onClick: r[7] ||= Ee(() => {}, ["stop"])
			}, [
				V(Fe, {
					position: Y(s).position,
					duration: Y(s).duration,
					buffered: Y(s).buffered,
					chapters: e.chapters,
					"thumbnail-at": be.value,
					onSeek: $,
					onScrubStart: _n,
					onScrubEnd: vn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				Y(l).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), I(Lr, {
					key: 0,
					position: Y(s).position,
					duration: Y(s).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: Ke
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : L("", !0),
				z("div", Ci, [
					e.prevEpisode ? (G(), R("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(u)("player.previousEpisode"),
						onClick: nn
					}, [V(t, { name: "skip-back" })], 8, wi)) : L("", !0),
					z("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Y(s).playing ? Y(u)("player.pause") : Y(u)("player.play"),
						onClick: an
					}, [V(t, { name: Y(s).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Ti),
					e.nextEpisode ? (G(), R("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(u)("player.nextEpisode"),
						onClick: rn
					}, [V(t, { name: "skip-forward" })], 8, Ei)) : L("", !0),
					z("span", Di, [
						B(J(Y(Ae)(Y(s).position)), 1),
						r[16] ||= z("span", { class: "player__sep" }, " / ", -1),
						B(J(Y(Ae)(Y(s).duration)), 1)
					]),
					r[17] ||= z("span", { class: "player__grow" }, null, -1),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": v.value ? "true" : "false",
						onClick: x
					}, [V(t, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Oi),
					V(m, {
						level: y.value,
						onCycle: S
					}, null, 8, ["level"]),
					V(ut),
					V(dt),
					V(St, {
						ref_key: "qualityMenuRef",
						ref: ie,
						open: ae.value,
						"onUpdate:open": r[1] ||= (e) => ae.value = e,
						levels: Y(N).levels.value,
						variants: Y(N).variants.value,
						"current-level": Y(N).currentLevel.value,
						"auto-enabled": Y(N).autoEnabled.value,
						"active-height": Y(N).activeLevelHeight.value,
						onSelect: ke
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					j.value ? L("", !0) : (G(), R("span", {
						key: 2,
						class: "player__direct-badge",
						title: Y(u)("player.qualityDirectStream")
					}, J(Y(u)("player.directStream")), 9, ki)),
					V(Qt, {
						open: Tt.value,
						"onUpdate:open": r[2] ||= (e) => Tt.value = e,
						tracks: vt.value,
						"audio-tracks": jt.value,
						"active-audio": Mt.value,
						onSelectAudio: Jt,
						onAddSubtitles: r[3] ||= (e) => It.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					V(kr, {
						open: Nt.value,
						"onUpdate:open": r[4] ||= (e) => Nt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					V(Hr, {
						ref_key: "sleepTimerRef",
						ref: re,
						"on-expire": Tn
					}, null, 512),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__syncplay", { "is-on": Y(g).isInRoom }]),
						"aria-label": Y(g).isInRoom ? Y(u)("syncplay.inRoom") : Y(u)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[5] ||= (e) => ce.value = !0
					}, [V(t, { name: "user" })], 10, Ai),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(u)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[6] ||= (e) => D.value = !0
					}, [V(t, { name: "info" })], 8, ji),
					A.value ? (G(), R("button", {
						key: 3,
						type: "button",
						class: U(["player__iconbtn", { "is-on": k.value }]),
						"aria-label": k.value ? Y(u)("player.exitPip") : Y(u)("player.pip"),
						"aria-pressed": k.value,
						onClick: Pn
					}, [V(t, { name: "pip" })], 10, Mi)) : L("", !0),
					z("button", {
						type: "button",
						class: U(["player__iconbtn", { "is-on": O.value }]),
						"aria-label": O.value ? Y(u)("player.exitTheater") : Y(u)("player.theater"),
						"aria-pressed": O.value,
						onClick: On
					}, [V(t, { name: "theater" })], 10, Ni),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? Y(u)("player.exitFullscreen") : Y(u)("player.fullscreen"),
						onClick: kn
					}, [V(t, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Pi)
				])
			])),
			we.value ? L("", !0) : (G(), I(ur, {
				key: 2,
				position: Y(s).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			we.value ? L("", !0) : (G(), I(gr, {
				key: 3,
				position: Y(s).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Ie.value && !we.value ? (G(), I(En, {
				key: 4,
				seconds: Pe.value,
				onResume: it,
				onRestart: at
			}, null, 8, ["seconds"])) : L("", !0),
			Le.value && tt.value && !we.value ? (G(), I(Qn, {
				key: 5,
				media: tt.value,
				remaining: Re.value,
				total: Y(8),
				counting: Y(l).autoplay,
				onPlayNow: mt,
				onCancel: ht
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : L("", !0),
			V(te, {
				modelValue: He.value,
				"onUpdate:modelValue": r[8] ||= (e) => He.value = e,
				title: `Similar ${Be.value ?? "marker"}s`,
				size: "lg",
				onClose: et
			}, {
				default: Z(() => [z("div", Fi, [We.value ? (G(), R("div", Ii, [V(b, { label: "Finding similar media" })])) : Ge.value ? (G(), R("div", Li, [V(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), z("p", Ri, J(Ge.value), 1)])) : !We.value && Ue.value.length === 0 ? (G(), R("div", zi, [
					V(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[18] ||= z("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[19] ||= z("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), R("ul", Bi, [(G(!0), R(P, null, q(Ue.value, (e) => (G(), R("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [z("div", Vi, [e.poster_url ? (G(), R("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Hi)) : (G(), R("div", Ui, [V(t, { name: "film" })]))]), z("div", Wi, [z("p", Gi, J(e.name), 1), e.year ? (G(), R("p", Ki, [B(J(e.year) + " ", 1), e.runtime ? (G(), R("span", qi, " · " + J(e.runtime) + "m", 1)) : L("", !0)])) : L("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Te.value ? (G(), I(lr, {
				key: 6,
				title: e.media.name,
				progress: Y(N).progress.value,
				onBack: r[9] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : L("", !0),
			De.value ? (G(), I(rr, {
				key: 7,
				title: e.media.name,
				onBack: r[10] ||= (e) => o("back")
			}, null, 8, ["title"])) : L("", !0),
			Y(g).isInRoom ? (G(), I(ui, {
				key: 8,
				position: Y(s).position,
				duration: Y(s).duration,
				"is-playing": Y(s).playing,
				onSeek: $,
				onPlay: r[11] ||= (e) => void w.value?.play(),
				onPause: r[12] ||= (e) => void w.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : L("", !0),
			Y(g).isInRoom ? (G(), I(Qr, { key: 9 })) : L("", !0),
			V(_e, {
				modelValue: ce.value,
				"onUpdate:modelValue": r[13] ||= (e) => ce.value = e
			}, null, 8, ["modelValue"]),
			V(ct, {
				open: D.value,
				onClose: r[14] ||= (e) => D.value = !1
			}, null, 8, ["open"]),
			V(hn, {
				open: It.value,
				"onUpdate:open": r[15] ||= (e) => It.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": Rt.value,
				onAdded: zt
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-1badfe6e"]]), Yi = { class: "player-page__stage" }, Xi = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Zi = { class: "player-page__blocking-error" }, Qi = /*#__PURE__*/ e(/* @__PURE__ */ H({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = l(), r = u(), i = Oe(), a = ke(), o = d(), f = p(), m = K(null), h = K(""), g = K([]), _ = K(null), v = K(null), y = K([]), b = K([]), C = K(!0), w = K(null), ee = K(!1), T = K(null), se = K(!1), ce = K(null), le = K(null), j = F(() => String(i.params.id ?? ""));
		x(() => m.value?.name);
		let ue = F(() => {
			let e = m.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), M = null, de = !1;
		function fe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function pe(e) {
			let t = r.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function N(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function me(e, r) {
			let i = M, a = () => de || i !== M;
			if (r.type === "episode" || (r.episode_number ?? null) !== null) {
				for (let e of t.values()) if (e.some((e) => e.id === r.id)) {
					if (a()) return;
					let t = e.findIndex((e) => e.id === r.id), n = e.slice(t + 1);
					if (n.length) {
						o.setQueue(n);
						return;
					}
					break;
				}
			}
			let s = r.genres?.[0];
			if (!s) {
				o.setQueue([]);
				return;
			}
			try {
				let t = D(n.value, {
					genres: [s],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(t, void 0, i?.signal);
				if (a()) return;
				o.setQueue((c.items ?? []).filter((e) => e.id !== r.id).slice(0, 12));
			} catch (e) {
				if (a() || fe(e)) return;
				o.setQueue([]);
			}
		}
		async function he(e, t, r) {
			let i = D(n.value, {
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
		function _e(e, t) {
			ce.value = A(e, t), le.value = re(e, t);
		}
		function P(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function ve(e, n) {
			if (ce.value = null, le.value = null, !(n.type === "episode" || (n.episode_number ?? null) !== null)) return;
			let r = P(n.id);
			if (r) {
				_e(r, n.id);
				return;
			}
			let i = M, a = () => de || i !== M;
			try {
				let r = await ge(e, n, i?.signal);
				if (a()) return;
				let s = await he(e, r.id, i?.signal);
				if (a()) return;
				if (k(s)) {
					let t = s.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => he(e, t.id, i?.signal).catch(() => [])));
					if (a()) return;
					s = [...s.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let c = O(s);
				c.length && t.set(r.id, c), _e(c, n.id);
				let l = c.findIndex((e) => e.id === n.id), u = c.slice(l + 1);
				u.length && o.setQueue(u);
			} catch (e) {
				if (a() || fe(e)) return;
				ce.value = null, le.value = null;
			}
		}
		async function H() {
			let e = j.value;
			if (M?.abort(), M = typeof AbortController < "u" ? new AbortController() : null, C.value = !0, w.value = null, g.value = [], _.value = null, v.value = null, y.value = [], b.value = [], ce.value = null, le.value = null, o.hideMiniPlayer(), !e) {
				w.value = "No media id provided", C.value = !1;
				return;
			}
			let t = new c({ baseUrl: n.value });
			t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, M?.signal).then((e) => {
				de || (g.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), _.value = N(e?.intro_marker), v.value = N(e?.outro_marker), y.value = Nn(e?.audio_tracks), b.value = ze(e?.subtitle_tracks));
			}).catch(() => null);
			let r = ie(e), i = Date.now();
			if (r && ae(r, i)) {
				ye(t, r.item);
				return;
			}
			let a = null;
			try {
				a = (await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, M?.signal)).item;
			} catch (e) {
				if (de || fe(e)) return;
				if (e instanceof s && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						T.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", se.value = !0, C.value = !1;
						return;
					}
				}
				if (r) {
					ye(t, r.item);
					return;
				}
				w.value = e instanceof Error ? e.message : "Failed to load media", C.value = !1;
				return;
			}
			if (!de) {
				if (!a) {
					if (r) {
						ye(t, r.item);
						return;
					}
					w.value = "Failed to load media item", C.value = !1;
					return;
				}
				oe(e, a, i), ye(t, a);
			}
		}
		async function ye(e, t) {
			m.value = t, f.hydrate(t), h.value = pe(t), C.value = !1;
			let n = (t.episode_number ?? null) !== null;
			me(e, t), n && await ve(e, t);
		}
		Ce(H), X(j, H), De(() => {
			o.current && o.streamUrl && o.showMiniPlayer();
		}), Se(() => {
			de = !0, M?.abort(), M = null;
		});
		function be() {
			a?.back();
		}
		function xe(e) {
			a?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function q(e) {
			a?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function we(e) {
			ee.value = e;
		}
		function Te() {
			se.value = !1, be();
		}
		return (e, t) => (G(), R("div", { class: U(["player-page", { "is-theater": ee.value }]) }, [
			ue.value && !C.value && !w.value ? (G(), R("div", {
				key: 0,
				class: "player-page__ambient",
				style: W(ue.value),
				"aria-hidden": "true"
			}, null, 4)) : L("", !0),
			z("div", Yi, [C.value ? (G(), R("div", Xi, [V(ne, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : w.value ? (G(), I(E, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: w.value
			}, {
				actions: Z(() => [V(S, {
					variant: "solid",
					onClick: H
				}, {
					default: Z(() => [...t[1] ||= [B("Retry", -1)]]),
					_: 1
				}), V(S, {
					variant: "ghost",
					onClick: be
				}, {
					default: Z(() => [...t[2] ||= [B("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : m.value ? (G(), I(Ji, {
				key: 2,
				media: m.value,
				"stream-url": h.value,
				"stream-url-for": pe,
				"api-base": Y(n),
				chapters: g.value,
				"intro-marker": _.value,
				"outro-marker": v.value,
				"playback-audio-tracks": y.value,
				"playback-subtitle-tracks": b.value,
				"prev-episode": ce.value,
				"next-episode": le.value,
				autoplay: !0,
				onBack: be,
				onPlayNext: xe,
				onPlayEpisode: q,
				onTheater: we
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
			V(te, {
				modelValue: se.value,
				"onUpdate:modelValue": t[0] ||= (e) => se.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Z(() => [V(S, {
					variant: "solid",
					onClick: Te
				}, {
					default: Z(() => [...t[3] ||= [B("OK", -1)]]),
					_: 1
				})]),
				default: Z(() => [z("p", Zi, J(T.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-bc15dbd5"]]);
//#endregion
export { Qi as default };

//# sourceMappingURL=PlayerPage-dcC0Wh_T.js.map