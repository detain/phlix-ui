import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./IconButton-BBHxcjCo.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { a as i } from "./usePreferencesStore-C9GLbD7G.js";
import { t as a } from "./useMessages-CMPz9FmM.js";
import { c as o, l as s, t as c } from "./client-D80As4Gx.js";
import { n as l, r as u } from "./useApiBase-CV_r-Kk4.js";
import { i as d } from "./usePlayerStore-Dgw0JCWb.js";
import { t as f } from "./useToastStore-BDoKlU6N.js";
import { n as p, t as m } from "./ThumbRating-CtGvXtns.js";
import { a as h, n as g, o as _, r as v, t as y } from "./shortcuts-BJjIEmOV.js";
import { t as b } from "./Spinner-Cu31rC4d.js";
import { i as x } from "./usePageTitle-BO3GGF3M.js";
import { t as S } from "./Button-DWa6Ld_Z.js";
import { t as C } from "./Slider-LnnvB5jy.js";
import { t as w } from "./Select-B27Qs6LN.js";
import { t as ee } from "./Modal-ovdBg3Sx.js";
import { t as te } from "./Skeleton-DhQmxeNg.js";
import { t as T } from "./EmptyState-ZlI5t4KT.js";
import { n as ne } from "./media-query-DKjhlX8r.js";
import { n as E, o as D, r as O, t as k } from "./episode-order-C2yqgMeX.js";
import { n as re, r as ie, t as ae } from "./useMediaItemCache-BKCJnCbr.js";
import { a as oe, c as se, d as ce, f as le, i as ue, l as de, n as A, o as fe, r as pe, s as me, t as he, u as ge } from "./captions-DoP7ce5A.js";
import { n as _e, t as ve } from "./SyncPlayModal-CxtHRQ-w.js";
import { Fragment as j, Transition as M, computed as N, createBlock as P, createCommentVNode as F, createElementBlock as I, createElementVNode as L, createTextVNode as R, createVNode as z, defineComponent as B, inject as ye, mergeModels as V, nextTick as be, normalizeClass as H, normalizeStyle as U, onBeforeUnmount as xe, onMounted as Se, openBlock as W, ref as G, renderList as K, toDisplayString as q, toRef as Ce, unref as J, useModel as we, watch as Y, withCtx as Te, withModifiers as Ee } from "vue";
import { onBeforeRouteLeave as De, useRoute as Oe, useRouter as ke } from "vue-router";
//#region src/components/player/format-time.ts
function X(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Ae = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], je = { class: "scrubber__track" }, Me = ["title"], Ne = { class: "scrubber__time numeric" }, Pe = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { t: r } = a(), i = e, o = n, s = G(null), c = G(!1), l = G(!1), u = G(0), d = G(0), f = (e) => Math.min(1, Math.max(0, e)), p = N(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = N(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = N(() => (c.value || l.value) && i.duration > 0), g = N(() => c.value ? u.value : d.value), _ = N(() => g.value * i.duration), v = N(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = N(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = N(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = N(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
		function te() {
			l.value = !0;
		}
		function T() {
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
		}), (t, n) => (W(), I("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": J(X)(e.position),
			"aria-label": J(r)("player.seek"),
			onPointerdown: C,
			onPointermove: w,
			onPointerup: ee,
			onPointercancel: ee,
			onPointerenter: te,
			onPointerleave: T,
			onKeydown: ne
		}, [L("div", je, [
			L("div", {
				class: "scrubber__buffered",
				style: U({ transform: `scaleX(${m.value})` })
			}, null, 4),
			L("div", {
				class: "scrubber__played",
				style: U({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(W(!0), I(j, null, K(x.value, (e, t) => (W(), I("span", {
				key: t,
				class: "scrubber__tick",
				style: U({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Me))), 128)),
			L("div", {
				class: H(["scrubber__head", { "is-dragging": c.value }]),
				style: U({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (W(), I("div", {
			key: 0,
			class: "scrubber__preview",
			style: U({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (W(), I("div", {
			key: 0,
			class: "scrubber__thumb",
			style: U({ backgroundImage: y.value })
		}, null, 4)) : F("", !0), L("span", Ne, q(J(X)(_.value)), 1)], 4)) : F("", !0)], 40, Ae));
	}
}), [["__scopeId", "data-v-3d610715"]]), Fe = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Z(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Ie(e) {
	return e === !0 || e === "true" || e === 1;
}
function Q(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Le(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Z(e.url ?? e.src);
		r !== "" && t.push({
			index: Q(e.index),
			language: Z(e.language ?? e.lang ?? e.srclang),
			label: Z(e.label),
			default: Ie(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Re(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Q(e.height);
		r <= 0 || t.push({
			id: Z(e.id),
			label: Z(e.label),
			height: r,
			width: Q(e.width),
			bitrate: Q(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function ze(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function Be(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function Ve(e) {
	let t = e ?? {};
	return {
		jobId: Z(t.job_id ?? t.jobId),
		masterUrl: Z(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Z(t.status, "running"),
		reused: Ie(t.reused),
		subtitles: Le(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Re(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function He(e) {
	let t = e ?? {};
	return {
		jobId: Z(t.job_id ?? t.jobId),
		status: Z(t.status, "running"),
		playlistReady: Ie(t.playlist_ready ?? t.playlistReady),
		progress: Q(t.progress),
		masterUrl: Z(t.master_url ?? t.masterUrl),
		subtitles: Le(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Re(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ue(e) {
	return e.playlistReady || e.status === "completed";
}
function We(e) {
	return Fe.has(e);
}
function Ge(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Ke(e) {
	let t = G("idle"), n = G(0), r = G([]), i = G([]), a = G(-1), o = G(!0), s = G(null), l = G(null), u = G([]), f = G(-1), p = G(null), m = G(null);
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
			url: Ge(n, e.url)
		}));
	}
	let S = e.attach ?? _, C = e.pollIntervalMs ?? 1e3, w = e.maxWaitMs ?? 12e4, ee = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), te = Math.max(1, Math.ceil(w / Math.max(1, C))), T = qe(), ne = e.getToken ?? (() => Je(T)), E = null, D = null, O = null, k = !1, re = null;
	function ie() {
		return e.client ?? new c({
			baseUrl: e.apiBase(),
			tokenStore: T ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function ae(i, a, o, s) {
		ue(), k = !1, re = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = ie(), c = Ve(await r.post(ze(a, o), void 0, re.signal));
			if (k) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			x(c.subtitles), b(c.variants), p.value = c.jobId, m.value = Ge(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < te; e++) {
				let e = He(await r.get(Be(c.jobId), void 0, re.signal));
				if (k) return;
				if (n.value = e.progress, x(e.subtitles), b(e.variants), We(e.status)) throw Error(`transcode ${e.status}`);
				if (Ue(e)) {
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
	function oe(e) {
		E && (E.setCurrentLevel(e === "auto" ? -1 : e), h());
	}
	function se(e) {
		E && (E.setNextLevel(e === "auto" ? -1 : e), h());
	}
	function ce(e) {
		E && (E.setAudioTrack(e), v());
	}
	function le(e) {
		if (!E || !m.value) return;
		let t = m.value.replace("master.m3u8", `media_v${e}.m3u8`);
		E.loadSource(t), g();
	}
	function ue() {
		if (k = !0, re &&= (re.abort(), null), D) {
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
		variants: l,
		audioTracks: u,
		currentAudioTrack: f,
		setLevel: oe,
		setNextLevel: se,
		setAudioTrack: ce,
		jobId: p,
		masterUrl: m,
		loadVariantPlaylist: le,
		start: ae,
		cleanup: ue,
		reset: de
	};
}
function qe() {
	try {
		return new o();
	} catch {
		return null;
	}
}
function Je(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var Ye = 10, Xe = 6;
function Ze(e) {
	let t = G(null), n = G(!1), r = G(null), i = /* @__PURE__ */ new Map();
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
		let i = r.frame, a = i % Ye, s = Math.floor(i / Ye), c = a / (Ye - 1) * 100, l = s / (Xe - 1) * 100;
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
var Qe = ["aria-label"], $e = { class: "shortcuts__head" }, et = { class: "shortcuts__title" }, tt = { class: "shortcuts__grid" }, nt = { class: "shortcuts__keys" }, rt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, it = {
	key: 1,
	class: "shortcuts__key"
}, at = { class: "shortcuts__label" }, ot = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => v }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = G(null);
		return r(l, Ce(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (W(), I("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= Ee((e) => s("close"), ["self"])
		}, [L("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [L("div", $e, [L("h3", et, q(J(c)("player.keyboard")), 1), z(n, {
			name: "x",
			label: J(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), L("ul", tt, [(W(!0), I(j, null, K(e.shortcuts, (e) => (W(), I("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [L("span", nt, [(W(!0), I(j, null, K(e.keys, (e, n) => (W(), I(j, { key: n }, [e === "–" ? (W(), I("span", rt, "–")) : (W(), I("kbd", it, [J(y)[e] ? (W(), P(t, {
			key: 0,
			name: J(y)[e],
			label: J(g)[e] ?? e
		}, null, 8, ["name", "label"])) : (W(), I(j, { key: 1 }, [R(q(e), 1)], 64))]))], 64))), 128))]), L("span", at, q(e.label), 1)]))), 128))])], 8, Qe)])) : F("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), st = { class: "volume" }, ct = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "VolumeControl",
	setup(e) {
		let t = d(), r = i(), { t: o } = a(), s = N(() => t.muted ? 0 : t.volume), c = N(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Y(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (W(), I("div", st, [z(n, {
			name: c.value,
			label: J(t).muted ? J(o)("player.unmute") : J(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => J(t).toggleMute()
		}, null, 8, ["name", "label"]), z(C, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), lt = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		], n = d(), { t: r } = a(), i = N(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function o(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (W(), P(w, {
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
}), [["__scopeId", "data-v-4530b308"]]), ut = "auto", dt = "original";
function ft(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function pt(e) {
	return e >= 2160 ? "4K" : ft(e);
}
function mt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = ft(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: pt(r.height)
		}));
	}
	return n;
}
function ht(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) ft(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function gt(e, t) {
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
function _t(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function vt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && gt(e, n) >= 0;
}
function yt(e, t) {
	if (t < 0) return ut;
	let n = e.find((e) => e.index === t);
	return n ? ft(n.height) : ut;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var bt = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "QualityMenu",
	props: /*@__PURE__*/ V({
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
	emits: /*@__PURE__*/ V(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, o = we(e, "open"), s = G(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = d(), f = i(), { t: p } = a(), m = N(() => mt(r.levels)), h = N(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = m.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = ft(i.height);
				e.has(a) || n && ht(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: pt(i.height)
				}));
			}
			return t;
		}), g = N(() => m.value.length >= 2 ? m.value : h.value), _ = N(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = N(() => gt(r.levels, _.value)), y = N(() => _.value && v.value >= 0 ? {
			value: dt,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = N(() => g.value.length >= 2), x = N(() => r.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: pt(r.activeHeight) })), S = N(() => [
			{
				value: ut,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), C = N(() => r.autoEnabled ? ut : y.value && r.currentLevel === v.value && (u.quality === "original" || f.defaultQuality === "original") ? dt : yt(r.levels, r.currentLevel));
		function ee(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), f.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : ht(r.levels, t);
			u.setQuality(t), f.defaultQuality = t, n >= 0 ? l("select", n) : l("select", t);
		}
		return t({ toggleMenu: c }), (e, t) => b.value || o.value ? (W(), P(w, {
			key: 0,
			ref_key: "selectRef",
			ref: s,
			class: "quality-menu",
			tone: "glass",
			"model-value": C.value,
			options: S.value,
			label: J(p)("player.quality"),
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
}), [["__scopeId", "data-v-58498bdd"]]), xt = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = G([]), i = N(() => se(n.styleConfig)), a = null, o = null;
		function s() {
			r.value = ce(a);
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
				if (a = e, e.addEventListener("cuechange", s), r.value = ce(e), !r.value.length) {
					let t = l(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", s));
				}
			} else r.value = [];
		}
		return Y(() => [n.video, n.language], u, { immediate: !0 }), xe(c), t({ lines: r }), (t, n) => r.value.length ? (W(), I("div", {
			key: 0,
			class: H(["player__captions", { "is-lifted": e.lifted }]),
			style: U(i.value)
		}, [(W(!0), I(j, null, K(r.value, (e, t) => (W(), I("p", {
			key: t,
			class: "player__caption-line"
		}, q(e), 1))), 128))], 6)) : F("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), St = ["aria-label", "aria-expanded"], Ct = ["aria-label"], wt = { class: "capmenu__head" }, Tt = { class: "capmenu__title" }, Et = ["aria-label"], Dt = ["aria-checked", "tabindex"], Ot = { class: "capmenu__check" }, kt = { class: "capmenu__optlabel" }, At = [
	"aria-checked",
	"tabindex",
	"onClick"
], jt = { class: "capmenu__check" }, Mt = { class: "capmenu__optlabel" }, Nt = { class: "capmenu__title capmenu__title--sub" }, Pt = ["aria-label"], Ft = [
	"aria-checked",
	"tabindex",
	"onClick"
], It = { class: "capmenu__check" }, Lt = { class: "capmenu__optlabel" }, Rt = { class: "capmenu__title capmenu__title--sub" }, zt = { class: "capmenu__style" }, Bt = { class: "capmenu__field" }, Vt = { class: "capmenu__fieldlabel" }, Ht = { class: "capmenu__field" }, Ut = { class: "capmenu__fieldlabel" }, Wt = { class: "capmenu__field" }, Gt = { class: "capmenu__fieldlabel" }, Kt = { class: "capmenu__field" }, qt = { class: "capmenu__fieldlabel" }, Jt = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
	setup(e, { emit: o }) {
		let s = e, c = o, l = d(), u = i(), { t: f } = a(), p = G(null), m = G(null), h = N(() => l.subtitleLang), g = N(() => s.tracks.some((e) => e.language === h.value)), _ = N(() => g.value ? "captions" : "captions-off"), v = N(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = N(() => s.activeAudio >= 0 ? s.activeAudio : 0);
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
		function T(e) {
			let t = ee(e, s.audioTracks.length, y.value);
			t !== null && C(s.audioTracks[t].index);
		}
		function ne(e) {
			u.captionStyle = {
				...u.captionStyle,
				size: e
			};
		}
		function E(e) {
			u.captionStyle = {
				...u.captionStyle,
				textColor: String(e)
			};
		}
		function D(e) {
			u.captionStyle = {
				...u.captionStyle,
				background: e
			};
		}
		function O(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		r(m, Ce(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function k(e) {
			p.value && !p.value.contains(e.target) && x();
		}
		return Y(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", k, !0) : document.removeEventListener("pointerdown", k, !0));
		}, { immediate: !0 }), xe(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", k, !0);
		}), (r, i) => (W(), I("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [L("button", {
			type: "button",
			class: H(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? J(f)("player.captionsOn") : J(f)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [z(t, { name: _.value }, null, 8, ["name"])], 10, St), e.open ? (W(), I("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(f)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			L("div", wt, [L("h3", Tt, q(J(f)("player.subtitles")), 1), z(n, {
				name: "x",
				label: J(f)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			L("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": J(f)("player.subtitleTrack"),
				onKeydown: te
			}, [L("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => S(null)
			}, [L("span", Ot, [g.value ? F("", !0) : (W(), P(t, {
				key: 0,
				name: "check"
			}))]), L("span", kt, q(J(f)("player.off")), 1)], 8, Dt), (W(!0), I(j, null, K(e.tracks, (e, n) => (W(), I("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [L("span", jt, [h.value === e.language ? (W(), P(t, {
				key: 0,
				name: "check"
			})) : F("", !0)]), L("span", Mt, q(e.label), 1)], 8, At))), 128))], 40, Et),
			e.audioTracks.length > 1 ? (W(), I(j, { key: 0 }, [L("h3", Nt, q(J(f)("player.audio")), 1), L("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": J(f)("player.audioTrack"),
				onKeydown: T
			}, [(W(!0), I(j, null, K(e.audioTracks, (n) => (W(), I("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => C(n.index)
			}, [L("span", It, [e.activeAudio === n.index ? (W(), P(t, {
				key: 0,
				name: "check"
			})) : F("", !0)]), L("span", Lt, q(n.label), 1)], 8, Ft))), 128))], 40, Pt)], 64)) : F("", !0),
			L("h3", Rt, q(J(f)("player.captionStyle")), 1),
			L("div", zt, [
				L("div", Bt, [L("span", Vt, q(J(f)("player.size")), 1), z(w, {
					"model-value": J(u).captionStyle.size,
					options: J(ue),
					label: J(f)("player.captionSize"),
					"onUpdate:modelValue": ne
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", Ht, [L("span", Ut, q(J(f)("player.color")), 1), z(w, {
					"model-value": J(u).captionStyle.textColor,
					options: J(A),
					label: J(f)("player.captionColor"),
					"onUpdate:modelValue": E
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", Wt, [L("span", Gt, q(J(f)("player.background")), 1), z(w, {
					"model-value": J(u).captionStyle.background,
					options: J(he),
					label: J(f)("player.captionBackground"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", Kt, [L("span", qt, q(J(f)("player.edge")), 1), z(w, {
					"model-value": J(u).captionStyle.edge,
					options: J(pe),
					label: J(f)("player.captionEdge"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Ct)) : F("", !0)], 512));
	}
}), [["__scopeId", "data-v-bce771b9"]]), Yt = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Xt(e, t, n, r, i, a, o) {
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
		r: Yt(d / m),
		g: Yt(f / m),
		b: Yt(p / m)
	};
}
function Zt(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Xt(e, t, n, 0, 0, r, n),
		right: Xt(e, t, n, t - r, 0, t, n),
		center: Xt(e, t, n, 0, 0, t, n)
	};
}
function Qt({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function $t(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Qt(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Qt(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Qt(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function en(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var tn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
			r.value = en(i);
		}
		let o = N(() => n.enabled && !n.reducedMotion && !r.value), s = N(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = G(null), l = null, u = null, d = !1, f = !1;
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
				c.value = $t(Zt(n, 32, 18));
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
		}, { immediate: !0 }), Se(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), xe(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let ee = N(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (W(), I("div", {
			class: H(["player__ambient", { "is-active": o.value }]),
			style: U(o.value ? ee.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), nn = ["aria-label"], rn = { class: "resume__label" }, an = { class: "resume__time numeric" }, on = { class: "resume__actions" }, sn = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = N(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (W(), I("div", {
			class: "resume",
			role: "region",
			"aria-label": J(i)("player.resumePlayback")
		}, [L("p", rn, [
			R(q(o.value[0]), 1),
			L("span", an, q(J(X)(e.seconds)), 1),
			R(q(o.value[1]), 1)
		]), L("div", on, [L("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [z(t, { name: "play" }), L("span", null, q(J(i)("player.resume")), 1)]), L("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [z(t, { name: "rewind" }), L("span", null, q(J(i)("player.startOver")), 1)])])], 8, nn));
	}
}), [["__scopeId", "data-v-271c5209"]]), cn = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], ln = /* @__PURE__ */ new Set([
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
function un(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function dn(...e) {
	return e.some((e) => ln.has(un(e)));
}
function fn(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function pn(e) {
	return e?.error?.code === 2;
}
function mn(e) {
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
var hn = 2 * Math.PI * 15;
function gn(e, t, n = hn) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var $ = /* @__PURE__ */ new Map([
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
]), _n = [
	"video/mp4; codecs=\"hvc1.1.4.L120.90\"",
	"video/mp4; codecs=\"hev1.1.4.L120.90\"",
	"video/mp4; codecs=\"hvc1.1.6.L93.B0\"",
	"video/mp4; codecs=\"hvc1.1.4.L120\""
];
function vn(e, t = "video/mp4") {
	let n = $.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function yn(e, t = "video/mp4") {
	if (!e) return !0;
	let n = vn(e, t);
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
async function bn() {
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
		for (let t of _n) {
			let n = e.canPlayType(t);
			if (n === "probably" || n === "maybe") return !0;
		}
	}
	return !1;
}
async function xn(e, t) {
	if (dn(...e)) return !0;
	let n = e.map((e) => un(e)).find((e) => cn.includes(e)) ?? "", r = n ? `video/${n}` : "video/mp4";
	if (cn.includes(n) && t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await yn(e.codec, r) || (n === "mp4" || n === "m4v") && !await bn()) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Sn = ["aria-label"], Cn = ["src"], wn = { class: "upnext__body" }, Tn = { class: "upnext__eyebrow" }, En = { class: "upnext__title" }, Dn = {
	key: 0,
	class: "upnext__cd numeric"
}, On = { class: "upnext__actions" }, kn = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, An = ["r"], jn = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Mn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { t: r } = a(), i = e, o = n, s = N(() => i.posterUrl ?? i.media.poster_url ?? null), c = N(() => gn(i.remaining, i.total));
		return (n, i) => (W(), I("aside", {
			class: "upnext",
			role: "region",
			"aria-label": J(r)("player.upNext")
		}, [
			s.value ? (W(), I("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, Cn)) : F("", !0),
			L("div", wn, [
				L("p", Tn, q(J(r)("player.upNext")), 1),
				L("h4", En, q(e.media.name), 1),
				e.counting ? (W(), I("p", Dn, q(J(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : F("", !0),
				L("div", On, [L("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => o("play-now")
				}, [z(t, { name: "play" }), L("span", null, q(J(r)("player.playNow")), 1)]), L("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => o("cancel")
				}, q(J(r)("player.cancel")), 1)])
			]),
			e.counting ? (W(), I("svg", kn, [L("circle", {
				cx: "18",
				cy: "18",
				r: J(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, An), L("circle", {
				cx: "18",
				cy: "18",
				r: J(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": J(hn),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, jn)])) : F("", !0)
		], 8, Sn));
	}
}), [["__scopeId", "data-v-85909b2d"]]), Nn = {
	class: "transcode",
	role: "alert"
}, Pn = { class: "transcode__card" }, Fn = { class: "transcode__heading" }, In = { class: "transcode__body" }, Ln = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (W(), I("div", Nn, [L("div", Pn, [
			z(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			L("h3", Fn, q(J(i)("player.transcodeHeading")), 1),
			L("p", In, q(e.title ? J(i)("player.transcodeBodyTitled", { title: e.title }) : J(i)("player.transcodeBodyUntitled")), 1),
			L("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [z(t, { name: "arrow-left" }), L("span", null, q(J(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), Rn = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, zn = { class: "prep__card" }, Bn = { class: "prep__heading" }, Vn = { class: "prep__body" }, Hn = ["aria-valuenow"], Un = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (W(), I("div", Rn, [L("div", zn, [
			z(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			L("h3", Bn, q(J(r)("player.transcodePreparingHeading")), 1),
			L("p", Vn, q(e.title ? J(r)("player.transcodePreparingTitled", { title: e.title }) : J(r)("player.transcodePreparingUntitled")), 1),
			L("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [L("div", {
				class: "prep__bar-fill",
				style: U({ width: i() + "%" })
			}, null, 4)], 8, Hn),
			L("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [z(t, { name: "arrow-left" }), L("span", null, q(J(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Wn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		return (e, n) => (W(), P(M, { name: "skip" }, {
			default: Te(() => [c.value ? (W(), I("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ee(l, ["stop"])
			}, [L("span", null, q(c.value.label), 1), z(t, { name: "skip-forward" })])) : F("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Gn = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, Kn = ["aria-label", "onClick"], qn = { class: "skip-controls__label" }, Jn = 5, Yn = 30, Xn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
			let n = s(e.startMs), r = n - Jn, i = n + Yn;
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
		return (e, n) => f.value.length > 0 ? (W(), I("div", Gn, [(W(!0), I(j, null, K(f.value, (e) => (W(), I("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: Ee((t) => p(e), ["stop"])
		}, [L("span", qn, q(d(e.type)), 1), z(t, { name: "skip-forward" })], 8, Kn))), 128))])) : F("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Zn = ["aria-label", "aria-expanded"], Qn = ["aria-label"], $n = { class: "chapterlist__head" }, er = { class: "chapterlist__title" }, tr = ["aria-label"], nr = ["onClick"], rr = { class: "chapterlist__index" }, ir = { class: "chapterlist__name" }, ar = { class: "chapterlist__meta" }, or = { class: "chapterlist__time" }, sr = {
	key: 0,
	class: "chapterlist__duration"
}, cr = {
	key: 1,
	class: "chapterlist__empty"
}, lr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = X(e.start), a;
			return e.end != null && e.end > e.start && (a = X(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = G(null), p = G(null);
		r(p, Ce(o, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		Y(() => o.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), xe(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (W(), I("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [L("button", {
			type: "button",
			class: H(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": J(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [z(t, { name: "list" })], 10, Zn), e.open ? (W(), I("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(c)("player.chapterList"),
			tabindex: "-1"
		}, [L("div", $n, [L("h3", er, q(J(c)("player.chapters")), 1), z(n, {
			name: "x",
			label: J(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (W(), I("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": J(c)("player.chapterList")
		}, [(W(!0), I(j, null, K(d.value, (e) => (W(), I("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [L("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			L("span", rr, q(e.index), 1),
			L("span", ir, q(e.label), 1),
			L("span", ar, [L("span", or, q(e.startLabel), 1), e.durationLabel ? (W(), I("span", sr, "· " + q(e.durationLabel), 1)) : F("", !0)])
		], 8, nr)]))), 128))], 8, tr)) : (W(), I("p", cr, q(J(c)("player.noChapters")), 1))], 8, Qn)) : F("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ur = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, dr = { class: "marker-timeline__ticks" }, fr = [
	"title",
	"aria-label",
	"onClick"
], pr = { class: "marker-timeline__tooltip" }, mr = { class: "marker-timeline__tooltip-label" }, hr = { class: "marker-timeline__tooltip-time numeric" }, gr = ["onClick"], _r = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		return (e, t) => s.value.length > 0 ? (W(), I("div", {
			key: 0,
			class: H(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (W(), I("div", ur, [t[0] ||= L("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [L("polygon", { points: "5,3 19,12 5,21" })], -1), R(" " + q(u.value), 1)])) : F("", !0), L("div", dr, [(W(!0), I(j, null, K(s.value, (e) => (W(), I("button", {
			key: e.id,
			type: "button",
			class: H(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: U({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${J(X)(e.startSec)}`,
			"aria-label": `${e.label} at ${J(X)(e.startSec)}`,
			onClick: Ee((t) => d(e), ["stop"])
		}, [L("span", pr, [
			L("span", mr, q(e.label), 1),
			L("span", hr, q(J(X)(e.startSec)), 1),
			L("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ee((t) => f(e), ["stop"])
			}, " Find similar ", 8, gr)
		])], 14, fr))), 128))])], 2)) : F("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), vr = ["aria-label", "aria-expanded"], yr = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, br = ["aria-label"], xr = ["aria-selected", "onClick"], Sr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		], s = G(0), c = G(0), l = N(() => c.value > 0), u;
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
		return xe(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (W(), I("div", { class: H(["sleep-timer", { "is-active": l.value }]) }, [L("button", {
			type: "button",
			class: H(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : J(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [z(t, { name: "moon" }), l.value ? (W(), I("span", yr, q(m(c.value)), 1)) : F("", !0)], 10, vr), z(M, { name: "dropdown" }, {
			default: Te(() => [h.value ? (W(), I("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": J(i)("player.sleepTimer")
			}, [(W(), I(j, null, K(o, (e) => L("li", {
				key: e.value,
				class: H(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, q(e.label), 11, xr)), 64))], 8, br)) : F("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Cr = {
	key: 0,
	class: "syncplay-overlay"
}, wr = { class: "syncplay-overlay__badge" }, Tr = { class: "syncplay-overlay__label" }, Er = { class: "syncplay-overlay__status-label" }, Dr = { class: "syncplay-overlay__members" }, Or = { class: "syncplay-overlay__member-count" }, kr = { class: "syncplay-overlay__member-list" }, Ar = { class: "syncplay-overlay__member-name" }, jr = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Mr = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = a(), i = _e(), o = l(), s = N(() => n.apiBase ?? o.value), c = N(() => i.currentRoom?.name ?? "SyncPlay"), u = N(() => i.onlineMembers.length), d = N(() => i.syncStatus), f = N(() => {
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
		return (e, n) => J(i).isInRoom ? (W(), I("div", Cr, [
			L("div", wr, [z(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), L("span", Tr, "SyncPlay: " + q(c.value), 1)]),
			L("div", { class: H(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [z(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), L("span", Er, q(f.value), 1)], 2),
			L("div", Dr, [L("span", Or, [z(t, { name: "user" }), R(" " + q(u.value) + " " + q(J(r)("syncplay.members", { count: u.value })), 1)]), L("ul", kr, [(W(!0), I(j, null, K(J(i).onlineMembers.slice(0, 5), (e) => (W(), I("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= L("span", { class: "syncplay-overlay__member-dot" }, null, -1), L("span", Ar, q(e.name), 1)]))), 128)), J(i).onlineMembers.length > 5 ? (W(), I("li", jr, " +" + q(J(i).onlineMembers.length - 5) + " more ", 1)) : F("", !0)])]),
			z(S, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: Te(() => [R(q(J(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), Nr = {
	key: 0,
	class: "syncplay-controls"
}, Pr = ["aria-label"], Fr = { class: "syncplay-controls__wait-label" }, Ir = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, Lr = { key: 0 }, Rr = { class: "syncplay-controls__transport" }, zr = ["aria-label"], Br = ["aria-label"], Vr = ["aria-label"], Hr = { class: "syncplay-controls__status-label" }, Ur = 10, Wr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let r = e, i = n, { t: o } = a(), s = _e(), c = l(), u = N(() => r.apiBase ?? c.value), d = G(!1), f = G([]), p = N(() => d.value || s.syncStatus === "re-syncing");
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
			await _(Math.max(0, r.position - Ur));
		}
		async function y() {
			await _(Math.min(r.duration, r.position + Ur));
		}
		return Y(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => J(s).isInRoom ? (W(), I("div", Nr, [
			p.value ? (W(), I("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": J(o)("syncplay.waitingForMembers")
			}, [
				z(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				L("span", Fr, q(J(o)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (W(), I("span", Ir, [R(q(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (W(), I("span", Lr, "+" + q(f.value.length - 3), 1)) : F("", !0)])) : F("", !0)
			], 8, Pr)) : F("", !0),
			L("div", Rr, [
				L("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": J(o)("syncplay.rewind"),
					onClick: v
				}, [z(t, { name: "rewind" })], 8, zr),
				L("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? J(o)("syncplay.pauseAll") : J(o)("syncplay.playAll"),
					onClick: g
				}, [z(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Br),
				L("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": J(o)("syncplay.fastForward"),
					onClick: y
				}, [z(t, { name: "forward" })], 8, Vr)
			]),
			L("div", { class: H(["syncplay-controls__status", `syncplay-controls__status--${J(s).syncStatus}`]) }, [z(t, {
				name: J(s).syncStatus === "synced" ? "check" : J(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), L("span", Hr, q(J(s).syncStatus === "synced" ? J(o)("syncplay.synced") : J(s).syncStatus === "outOfSync" ? J(o)("syncplay.outOfSync") : J(o)("syncplay.reSyncing")), 1)], 2)
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), Gr = { class: "player__stage" }, Kr = ["src", "poster"], qr = [
	"src",
	"srclang",
	"label",
	"default"
], Jr = { class: "player__meta" }, Yr = ["aria-label"], Xr = { class: "player__meta-text" }, Zr = { class: "player__eyebrow" }, Qr = { class: "player__title" }, $r = { class: "player__sub numeric" }, ei = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, ti = {
	key: 0,
	class: "player__center"
}, ni = ["aria-label"], ri = { class: "player__btnrow" }, ii = ["aria-label"], ai = ["aria-label"], oi = ["aria-label"], si = { class: "player__time numeric" }, ci = ["aria-label", "aria-pressed"], li = ["title"], ui = ["aria-label"], di = ["aria-label"], fi = ["aria-label", "aria-pressed"], pi = ["aria-label", "aria-pressed"], mi = ["aria-label"], hi = { class: "similar-modal" }, gi = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, _i = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, vi = { class: "similar-modal__state-title" }, yi = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, bi = {
	key: 3,
	class: "similar-modal__results"
}, xi = { class: "similar-modal__poster" }, Si = ["src", "alt"], Ci = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, wi = { class: "similar-modal__result-body" }, Ti = { class: "similar-modal__result-title" }, Ei = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Di = { key: 0 }, Oi = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let r = e, o = n, s = d(), l = i(), { t: u } = a(), g = _e(), _ = p(), v = N(() => _.isFavorite(r.media.id)), y = N(() => _.likeLevel(r.media.id));
		function x() {
			_.toggleFavorite(r.media.id, he());
		}
		function S(e) {
			_.setLike(r.media.id, e, he());
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
		], w = G(null), te = G(null), T = G(!0), ne = G(!1), E = G(!1), D = G(!1), O = G(!1), k = G(!1), re = G(!1), ie = G(null), ae = G(null), se = G(!1), ce = f(), le = G(!1), ue = N(() => O.value ? 1.35 : 1), A = G(dn(r.streamUrl, r.media.path));
		async function pe() {
			if (A.value) return;
			let e = r.playbackAudioTracks ?? [];
			e.length !== 0 && await xn([r.streamUrl, r.media.path], e) && (A.value = !0);
		}
		Y(() => r.playbackAudioTracks, (e) => {
			!e || e.length === 0 || pe();
		}, { immediate: !1 });
		let me = ye("phlixConfig", null);
		function he() {
			return me?.apiBase ?? "";
		}
		let M = Ke({
			apiBase: () => r.apiBase ?? "",
			hlsConfig: me?.playerHlsConfig
		}), B = Ze({ apiBase: () => r.apiBase ?? "" }), V = null;
		function U(e) {
			V !== null && clearTimeout(V), V = setTimeout(() => {
				V = null, B.fetch(e);
			}, 0);
		}
		let Ce = N(() => r.thumbnailAt ?? B.thumbnailAt), we = N(() => A.value ? void 0 : r.streamUrl), De = N(() => A.value && M.state.value !== "ready"), Oe = N(() => A.value && (M.state.value === "preparing" || M.state.value === "idle")), ke = N(() => A.value && M.state.value === "error");
		function Ae(e = 0) {
			let t = w.value;
			t && M.start(t, r.media.id, void 0, e);
		}
		function je(e) {
			if (s.quality === "original" && e !== "auto") {
				M.loadVariantPlaylist(dt);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				M.loadVariantPlaylist(e);
				return;
			}
			M.setLevel(e);
		}
		let Me = !1;
		function Ne() {
			l.defaultQuality = ut;
		}
		function Fe() {
			let e = M.levels.value;
			if (e.length === 0) return !1;
			let t = l.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = M.variants.value;
				if (!t || t.length === 0) return !1;
				if (vt(e, t)) M.loadVariantPlaylist(dt);
				else {
					let t = _t(e);
					t >= 0 && M.setNextLevel(t), Ne();
				}
				return !0;
			}
			let n = ht(e, t);
			return n >= 0 ? M.setNextLevel(n) : Ne(), !0;
		}
		Y(() => M.levels.value, (e) => {
			Me || e.length === 0 || Fe() && (Me = !0);
		}), Y(() => M.variants.value, (e) => {
			Me || !e?.length || be(() => {
				Me || Fe() && (Me = !0);
			});
		}, { deep: !0 });
		let Z = G(s.resumePositionFor(r.media.id) ?? 0), Ie = G(!A.value && Z.value > 0), Q = null, Le = G(!1), Re = G(8), ze, Be = G(null), Ve = G(0), He = G(!1), Ue = G([]), We = G(!1), Ge = G(null);
		function qe(e, t) {
			Be.value = e, Ve.value = t, Ue.value = [], Ge.value = null, He.value = !0, $e(e, t);
		}
		let Je = null, Ye = null, Xe = null;
		function Qe() {
			let e = r.apiBase ?? "";
			return (Ye === null || Xe !== e) && (Ye = new c({ baseUrl: e }), Xe = e), Ye;
		}
		async function $e(e, t) {
			Je?.abort(), Je = new AbortController(), We.value = !0, Ge.value = null;
			try {
				let n = await Qe().searchByMarker(e, t, 30, 20, Je.signal);
				Ue.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Ge.value = "Failed to load similar media. Please try again.", Ue.value = [];
			} finally {
				We.value = !1;
			}
		}
		function et() {
			Je?.abort(), He.value = !1, Ue.value = [], Ge.value = null, Be.value = null;
		}
		let tt = N(() => s.upNext);
		function nt() {
			A.value = dn(r.streamUrl, r.media.path), pe(), Z.value = s.resumePositionFor(r.media.id) ?? 0, Ie.value = !A.value && Z.value > 0, Q = null, Yt = !1, It = !1, Lt = !1, kt.value = -1, Ut = null, Me = !1, st(), Le.value = !1, M.reset(), w.value && (w.value.currentTime = 0), A.value && Ae(), U(r.media.id);
		}
		function rt(e) {
			let t = w.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Q = Math.max(0, e));
		}
		function it() {
			rt(Z.value), Ie.value = !1, w.value?.play()?.catch(() => {});
		}
		function at() {
			Q = null, rt(0), s.clearResume(r.media.id), Ie.value = !1, w.value?.play()?.catch(() => {});
		}
		function st() {
			ze &&= (clearInterval(ze), void 0);
		}
		function ft() {
			Re.value = 8, st(), ze = setInterval(() => {
				--Re.value, Re.value <= 0 && (st(), mt());
			}, 1e3);
		}
		function pt() {
			Pn(), T.value = !0, s.upNext && (Le.value = !0, l.autoplay && ft());
		}
		function mt() {
			st(), Le.value = !1;
			let e = s.next(r.streamUrlFor);
			e && o("play-next", e);
		}
		function gt() {
			st(), Le.value = !1;
		}
		function yt() {
			if (A.value) return;
			let e = w.value, t = pn(e) && (e?.currentTime ?? 0) === 0;
			(fn(e) || t) && (A.value = !0, Ae(e?.currentTime ?? 0));
		}
		let St = G([]), Ct = G([]), wt = G(-1), Tt = G(!1), Et = N(() => M.state.value === "ready" && M.audioTracks.value.length > 0), Dt = N(() => M.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Ot = N(() => (r.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), kt = G(-1), At = N(() => !Et.value && !A.value && Ct.value.length === 0 && Ot.value.length > 1), jt = N(() => Et.value ? Dt.value : At.value ? Ot.value : Ct.value), Mt = N(() => {
			if (Et.value) return M.currentAudioTrack.value;
			if (At.value) {
				if (kt.value >= 0) return kt.value;
				let e = (r.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : r.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return wt.value;
		}), Nt = G(!1), Pt = s.subtitleLang, Ft = N(() => A.value ? M.subtitleTracks.value : r.playbackSubtitleTracks ?? []), It = !1, Lt = !1;
		function Rt() {
			if (It) return;
			if (l.subtitlePreferenceSet) {
				It = !0;
				return;
			}
			let e = Ft.value.find((e) => e.default);
			if (!e) return;
			let t = St.value.find((t) => t.language === (e.language || e.label));
			t && (s.setSubtitle(t.language), Pt = t.language, It = !0);
		}
		function zt() {
			if (Lt) return;
			let e = l.defaultAudioLang;
			if (!e) return;
			let t = jt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Mt.value;
			r >= 0 && r < t.length || (Wt(n), Lt = !0);
		}
		let Bt = N(() => St.value.some((e) => e.language === s.subtitleLang));
		function Vt() {
			let e = w.value;
			St.value = ge(e), Ct.value = de(e), wt.value = oe(e), Rt(), zt();
		}
		function Ht() {
			if (Bt.value) Pt = s.subtitleLang, s.setSubtitle(null);
			else {
				let e = Pt && St.value.some((e) => e.language === Pt) ? Pt : St.value[0]?.language ?? null;
				s.setSubtitle(e);
			}
			o("captions");
		}
		let Ut = null;
		function Wt(e) {
			if (Et.value) M.setAudioTrack(e);
			else if (At.value) {
				if (e === Mt.value) return;
				kt.value = e, Ut = e, A.value = !0, Ae(w.value?.currentTime ?? 0);
			} else fe(w.value, e), wt.value = e;
		}
		Y(Et, (e) => {
			if (!e || Ut === null) return;
			let t = Ut;
			Ut = null, t >= 0 && t < M.audioTracks.value.length && M.setAudioTrack(t);
		}), Y(Ft, () => {
			be(() => Vt());
		}, { deep: !0 });
		let Gt = null, Kt, qt = N(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Yt = !1;
		function Xt() {
			if (!r.autoplay || Yt || Ie.value || De.value) return;
			let e = w.value;
			if (!e || !e.paused) return;
			Yt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, s.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Zt() {
			Xt();
		}
		function Qt() {
			r.prevEpisode && o("play-episode", r.prevEpisode);
		}
		function $t() {
			r.nextEpisode && o("play-episode", r.nextEpisode);
		}
		function en() {
			let e = w.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function nn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function rn() {
			s.play(), s.setMediaPositionState();
		}
		function an() {
			s.pause(), s.setMediaPositionState();
		}
		function on() {
			let e = w.value;
			e && s.updateProgress(e.currentTime, e.duration, nn(e));
		}
		function cn() {
			let e = w.value;
			e && (e.volume = s.volume, e.muted = s.muted, e.playbackRate = s.rate, Q !== null && (e.currentTime = e.duration ? Math.min(e.duration, Q) : Q, Q = null), s.updateProgress(e.currentTime, e.duration, nn(e)), s.setMediaPositionState(), Vt());
		}
		function ln() {
			let e = w.value;
			e && s.updateProgress(e.currentTime, e.duration, nn(e));
		}
		function un() {
			let e = w.value;
			e && (Math.abs(e.volume - s.volume) > .001 && s.setVolume(e.volume), e.muted !== s.muted && s.toggleMute());
		}
		function mn() {
			let e = w.value;
			e && e.playbackRate !== s.rate && s.setRate(e.playbackRate), s.setMediaPositionState();
		}
		function hn() {
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
			E.value = !0, In();
		}
		function vn() {
			E.value = !1, In();
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
			ie.value?.toggleOpen();
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
			playPause: en,
			seekBy: (e) => $(s.position + e),
			frameStep: (e) => {
				s.playing || $(s.position + e / 30);
			},
			volumeBy: (e) => s.setVolume(s.volume + e),
			toggleMute: En,
			toggleFullscreen: On,
			toggleCaptions: Ht,
			toggleTheater: Dn,
			togglePip: An,
			skipIntro: bn,
			skipOutro: Sn,
			sleepTimer: Cn,
			seekToPercent: (e) => $(e * s.duration),
			speedStep: yn,
			toggleHelp: () => {
				D.value = !D.value;
			},
			toggleQuality: () => {
				A.value ? (se.value = !se.value, ae.value?.toggleMenu?.()) : ce.show({
					message: u("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !D.value && !Tt.value && !Nt.value });
		function En() {
			s.toggleMute();
		}
		function Dn() {
			O.value = !O.value, o("theater", O.value);
		}
		Y(() => s.muted, (e) => {
			let t = w.value;
			t && t.muted !== e && (t.muted = e);
		}), Y(() => s.volume, (e) => {
			let t = w.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Y(() => s.rate, (e) => {
			let t = w.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Y(() => s.lastCommand, (e) => {
			e && (e.type === "seekTo" ? rt(e.value) : e.type === "seekBy" && rt(s.position + e.value));
		});
		function On() {
			if (typeof document > "u") return;
			let e = te.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function kn() {
			ne.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function An() {
			let e = w.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function jn() {
			k.value = !0;
		}
		function Nn() {
			k.value = !1;
		}
		function Pn() {
			Kt &&= (clearTimeout(Kt), void 0);
		}
		function Fn() {
			Pn(), !(!s.playing || E.value) && (Kt = setTimeout(() => {
				s.playing && !E.value && (T.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function In() {
			T.value = !0, Fn();
		}
		Y(() => s.playing, (e) => {
			e ? (Ie.value = !1, gt(), Fn()) : (Pn(), T.value = !0);
		});
		let Rn = null;
		return Se(() => {
			s.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), _.hydrate(r.media), typeof document < "u" && (document.addEventListener("fullscreenchange", kn), re.value = document.pictureInPictureEnabled === !0), Rn = s.bindMediaSession({
				onPlay: () => void w.value?.play()?.catch(() => {}),
				onPause: () => w.value?.pause(),
				onSeek: (e) => $(e)
			}), Gt = w.value?.textTracks ?? null, Gt?.addEventListener?.("addtrack", Vt), Gt?.addEventListener?.("removetrack", Vt), Vt(), A.value && Ae(), U(r.media.id);
		}), Y(() => r.media, (e) => {
			s.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), nt();
		}), Y(() => r.media?.id, () => {
			_.hydrate(r.media);
		}), Y(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (w.value?.play(), s.play()) : e.state === "paused" && (w.value?.pause(), s.pause()), g.updateLocalPosition(s.position), Math.abs(g.driftAmount) > 2 && rt(e.playbackPosition));
		}), xe(() => {
			Pn(), st(), M.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", kn), Rn?.(), Gt?.removeEventListener?.("addtrack", Vt), Gt?.removeEventListener?.("removetrack", Vt), wn !== null && (clearInterval(wn), wn = null), V !== null && (clearTimeout(V), V = null);
		}), (n, r) => (W(), I("div", {
			ref_key: "containerRef",
			ref: te,
			class: H(["player", {
				"is-chrome-hidden": !T.value,
				"is-theater": O.value
			}]),
			onPointermove: In,
			onPointerdown: In,
			onFocusin: In
		}, [z(tn, {
			video: w.value,
			enabled: J(l).atmosphere,
			playing: J(s).playing,
			"reduced-motion": J(l).effectiveReducedMotion,
			intensity: ue.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), L("div", Gr, [
			L("video", {
				ref_key: "videoRef",
				ref: w,
				class: "player__video",
				src: we.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: rn,
				onPause: an,
				onTimeupdate: on,
				onLoadedmetadata: cn,
				onCanplay: Zt,
				onProgress: ln,
				onVolumechange: un,
				onRatechange: mn,
				onSeeked: hn,
				onDurationchange: gn,
				onEnded: pt,
				onError: yt,
				onEnterpictureinpicture: jn,
				onLeavepictureinpicture: Nn,
				onClick: en
			}, [(W(!0), I(j, null, K(Ft.value, (e) => (W(), I("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, qr))), 128))], 40, Kr),
			r[18] ||= L("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[19] ||= L("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			L("div", Jr, [L("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": J(u)("player.back"),
				onClick: r[0] ||= Ee((e) => o("back"), ["stop"])
			}, [z(t, { name: "arrow-left" })], 8, Yr), L("div", Xr, [
				L("p", Zr, q(J(u)("player.nowPlaying")), 1),
				L("h2", Qr, q(e.media.name), 1),
				L("div", $r, [(W(!0), I(j, null, K(qt.value, (e, t) => (W(), I(j, { key: t }, [t > 0 && !e.cert ? (W(), I("span", ei, "·")) : F("", !0), L("span", { class: H({ player__cert: e.cert }) }, q(e.text), 3)], 64))), 128))])
			])]),
			De.value ? F("", !0) : (W(), I("div", ti, [L("button", {
				type: "button",
				class: H(["player__bigplay", { "is-playing": J(s).playing }]),
				"aria-label": J(s).playing ? J(u)("player.pause") : J(u)("player.play"),
				onClick: Ee(en, ["stop"])
			}, [z(t, { name: J(s).playing ? "pause" : "play" }, null, 8, ["name"])], 10, ni)])),
			z(xt, {
				video: w.value,
				language: J(s).subtitleLang,
				"style-config": J(l).captionStyle,
				lifted: T.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			De.value ? F("", !0) : (W(), I("div", {
				key: 1,
				class: "player__controls",
				onClick: r[6] ||= Ee(() => {}, ["stop"])
			}, [
				z(Pe, {
					position: J(s).position,
					duration: J(s).duration,
					buffered: J(s).buffered,
					chapters: e.chapters,
					"thumbnail-at": Ce.value,
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
				J(l).showMarkerTimeline && e.markers && e.markers.length > 0 ? (W(), P(_r, {
					key: 0,
					position: J(s).position,
					duration: J(s).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: qe
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : F("", !0),
				L("div", ri, [
					e.prevEpisode ? (W(), I("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(u)("player.previousEpisode"),
						onClick: Qt
					}, [z(t, { name: "skip-back" })], 8, ii)) : F("", !0),
					L("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": J(s).playing ? J(u)("player.pause") : J(u)("player.play"),
						onClick: en
					}, [z(t, { name: J(s).playing ? "pause" : "play" }, null, 8, ["name"])], 8, ai),
					e.nextEpisode ? (W(), I("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(u)("player.nextEpisode"),
						onClick: $t
					}, [z(t, { name: "skip-forward" })], 8, oi)) : F("", !0),
					L("span", si, [
						R(q(J(X)(J(s).position)), 1),
						r[14] ||= L("span", { class: "player__sep" }, " / ", -1),
						R(q(J(X)(J(s).duration)), 1)
					]),
					r[15] ||= L("span", { class: "player__grow" }, null, -1),
					L("button", {
						type: "button",
						class: H(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": v.value ? "true" : "false",
						onClick: x
					}, [z(t, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ci),
					z(m, {
						level: y.value,
						onCycle: S
					}, null, 8, ["level"]),
					z(ct),
					z(lt),
					z(bt, {
						ref_key: "qualityMenuRef",
						ref: ae,
						open: se.value,
						"onUpdate:open": r[1] ||= (e) => se.value = e,
						levels: J(M).levels.value,
						variants: J(M).variants.value,
						"current-level": J(M).currentLevel.value,
						"auto-enabled": J(M).autoEnabled.value,
						"active-height": J(M).activeLevelHeight.value,
						onSelect: je
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					A.value ? F("", !0) : (W(), I("span", {
						key: 2,
						class: "player__direct-badge",
						title: J(u)("player.qualityDirectStream")
					}, q(J(u)("player.directStream")), 9, li)),
					z(Jt, {
						open: Tt.value,
						"onUpdate:open": r[2] ||= (e) => Tt.value = e,
						tracks: St.value,
						"audio-tracks": jt.value,
						"active-audio": Mt.value,
						onSelectAudio: Wt
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					z(lr, {
						open: Nt.value,
						"onUpdate:open": r[3] ||= (e) => Nt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					z(Sr, {
						ref_key: "sleepTimerRef",
						ref: ie,
						"on-expire": Tn
					}, null, 512),
					L("button", {
						type: "button",
						class: H(["player__iconbtn player__syncplay", { "is-on": J(g).isInRoom }]),
						"aria-label": J(g).isInRoom ? J(u)("syncplay.inRoom") : J(u)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[4] ||= (e) => le.value = !0
					}, [z(t, { name: "user" })], 10, ui),
					L("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(u)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[5] ||= (e) => D.value = !0
					}, [z(t, { name: "info" })], 8, di),
					re.value ? (W(), I("button", {
						key: 3,
						type: "button",
						class: H(["player__iconbtn", { "is-on": k.value }]),
						"aria-label": k.value ? J(u)("player.exitPip") : J(u)("player.pip"),
						"aria-pressed": k.value,
						onClick: An
					}, [z(t, { name: "pip" })], 10, fi)) : F("", !0),
					L("button", {
						type: "button",
						class: H(["player__iconbtn", { "is-on": O.value }]),
						"aria-label": O.value ? J(u)("player.exitTheater") : J(u)("player.theater"),
						"aria-pressed": O.value,
						onClick: Dn
					}, [z(t, { name: "theater" })], 10, pi),
					L("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? J(u)("player.exitFullscreen") : J(u)("player.fullscreen"),
						onClick: On
					}, [z(t, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, mi)
				])
			])),
			De.value ? F("", !0) : (W(), P(Wn, {
				key: 2,
				position: J(s).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			De.value ? F("", !0) : (W(), P(Xn, {
				key: 3,
				position: J(s).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Ie.value && !De.value ? (W(), P(sn, {
				key: 4,
				seconds: Z.value,
				onResume: it,
				onRestart: at
			}, null, 8, ["seconds"])) : F("", !0),
			Le.value && tt.value && !De.value ? (W(), P(Mn, {
				key: 5,
				media: tt.value,
				remaining: Re.value,
				total: J(8),
				counting: J(l).autoplay,
				onPlayNow: mt,
				onCancel: gt
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : F("", !0),
			z(ee, {
				modelValue: He.value,
				"onUpdate:modelValue": r[7] ||= (e) => He.value = e,
				title: `Similar ${Be.value ?? "marker"}s`,
				size: "lg",
				onClose: et
			}, {
				default: Te(() => [L("div", hi, [We.value ? (W(), I("div", gi, [z(b, { label: "Finding similar media" })])) : Ge.value ? (W(), I("div", _i, [z(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), L("p", vi, q(Ge.value), 1)])) : !We.value && Ue.value.length === 0 ? (W(), I("div", yi, [
					z(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[16] ||= L("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[17] ||= L("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (W(), I("ul", bi, [(W(!0), I(j, null, K(Ue.value, (e) => (W(), I("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [L("div", xi, [e.poster_url ? (W(), I("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Si)) : (W(), I("div", Ci, [z(t, { name: "film" })]))]), L("div", wi, [L("p", Ti, q(e.name), 1), e.year ? (W(), I("p", Ei, [R(q(e.year) + " ", 1), e.runtime ? (W(), I("span", Di, " · " + q(e.runtime) + "m", 1)) : F("", !0)])) : F("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Oe.value ? (W(), P(Un, {
				key: 6,
				title: e.media.name,
				progress: J(M).progress.value,
				onBack: r[8] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : F("", !0),
			ke.value ? (W(), P(Ln, {
				key: 7,
				title: e.media.name,
				onBack: r[9] ||= (e) => o("back")
			}, null, 8, ["title"])) : F("", !0),
			J(g).isInRoom ? (W(), P(Wr, {
				key: 8,
				position: J(s).position,
				duration: J(s).duration,
				"is-playing": J(s).playing,
				onSeek: $,
				onPlay: r[10] ||= (e) => void w.value?.play(),
				onPause: r[11] ||= (e) => void w.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : F("", !0),
			J(g).isInRoom ? (W(), P(Mr, { key: 9 })) : F("", !0),
			z(ve, {
				modelValue: le.value,
				"onUpdate:modelValue": r[12] ||= (e) => le.value = e
			}, null, 8, ["modelValue"]),
			z(ot, {
				open: D.value,
				onClose: r[13] ||= (e) => D.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-8c6fd305"]]), ki = { class: "player-page__stage" }, Ai = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, ji = { class: "player-page__blocking-error" }, Mi = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = l(), r = u(), i = Oe(), a = ke(), o = d(), f = p(), m = G(null), h = G(""), g = G([]), _ = G(null), v = G(null), y = G([]), b = G([]), C = G(!0), w = G(null), oe = G(!1), se = G(null), ce = G(!1), le = G(null), ue = G(null), de = N(() => String(i.params.id ?? ""));
		x(() => m.value?.name);
		let A = N(() => {
			let e = m.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), fe = null, pe = !1;
		function me(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function he(e) {
			let t = r.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function ge(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function _e(e, r) {
			let i = fe, a = () => pe || i !== fe;
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
				let t = ne(n.value, {
					genres: [s],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(t, void 0, i?.signal);
				if (a()) return;
				o.setQueue((c.items ?? []).filter((e) => e.id !== r.id).slice(0, 12));
			} catch (e) {
				if (a() || me(e)) return;
				o.setQueue([]);
			}
		}
		async function ve(e, t, r) {
			let i = ne(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function j(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function M(e, t) {
			le.value = O(e, t), ue.value = k(e, t);
		}
		function B(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function ye(e, n) {
			if (le.value = null, ue.value = null, !(n.type === "episode" || (n.episode_number ?? null) !== null)) return;
			let r = B(n.id);
			if (r) {
				M(r, n.id);
				return;
			}
			let i = fe, a = () => pe || i !== fe;
			try {
				let r = await j(e, n, i?.signal);
				if (a()) return;
				let s = await ve(e, r.id, i?.signal);
				if (a()) return;
				if (D(s)) {
					let t = s.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => ve(e, t.id, i?.signal).catch(() => [])));
					if (a()) return;
					s = [...s.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let c = E(s);
				c.length && t.set(r.id, c), M(c, n.id);
				let l = c.findIndex((e) => e.id === n.id), u = c.slice(l + 1);
				u.length && o.setQueue(u);
			} catch (e) {
				if (a() || me(e)) return;
				le.value = null, ue.value = null;
			}
		}
		async function V() {
			let e = de.value;
			if (fe?.abort(), fe = typeof AbortController < "u" ? new AbortController() : null, C.value = !0, w.value = null, g.value = [], _.value = null, v.value = null, y.value = [], b.value = [], le.value = null, ue.value = null, o.hideMiniPlayer(), !e) {
				w.value = "No media id provided", C.value = !1;
				return;
			}
			let t = new c({ baseUrl: n.value });
			t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, fe?.signal).then((e) => {
				pe || (g.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), _.value = ge(e?.intro_marker), v.value = ge(e?.outro_marker), y.value = mn(e?.audio_tracks), b.value = Le(e?.subtitle_tracks));
			}).catch(() => null);
			let r = re(e), i = Date.now();
			if (r && ie(r, i)) {
				be(t, r.item);
				return;
			}
			let a = null;
			try {
				a = (await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, fe?.signal)).item;
			} catch (e) {
				if (pe || me(e)) return;
				if (e instanceof s && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						se.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", ce.value = !0, C.value = !1;
						return;
					}
				}
				if (r) {
					be(t, r.item);
					return;
				}
				w.value = e instanceof Error ? e.message : "Failed to load media", C.value = !1;
				return;
			}
			if (!pe) {
				if (!a) {
					if (r) {
						be(t, r.item);
						return;
					}
					w.value = "Failed to load media item", C.value = !1;
					return;
				}
				ae(e, a, i), be(t, a);
			}
		}
		async function be(e, t) {
			m.value = t, f.hydrate(t), h.value = he(t), C.value = !1;
			let n = (t.episode_number ?? null) !== null;
			_e(e, t), n && await ye(e, t);
		}
		Se(V), Y(de, V), De(() => {
			o.current && o.streamUrl && o.showMiniPlayer();
		}), xe(() => {
			pe = !0, fe?.abort(), fe = null;
		});
		function K() {
			a?.back();
		}
		function Ce(e) {
			a?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function we(e) {
			a?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ee(e) {
			oe.value = e;
		}
		function X() {
			ce.value = !1, K();
		}
		return (e, t) => (W(), I("div", { class: H(["player-page", { "is-theater": oe.value }]) }, [
			A.value && !C.value && !w.value ? (W(), I("div", {
				key: 0,
				class: "player-page__ambient",
				style: U(A.value),
				"aria-hidden": "true"
			}, null, 4)) : F("", !0),
			L("div", ki, [C.value ? (W(), I("div", Ai, [z(te, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : w.value ? (W(), P(T, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: w.value
			}, {
				actions: Te(() => [z(S, {
					variant: "solid",
					onClick: V
				}, {
					default: Te(() => [...t[1] ||= [R("Retry", -1)]]),
					_: 1
				}), z(S, {
					variant: "ghost",
					onClick: K
				}, {
					default: Te(() => [...t[2] ||= [R("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : m.value ? (W(), P(Oi, {
				key: 2,
				media: m.value,
				"stream-url": h.value,
				"stream-url-for": he,
				"api-base": J(n),
				chapters: g.value,
				"intro-marker": _.value,
				"outro-marker": v.value,
				"playback-audio-tracks": y.value,
				"playback-subtitle-tracks": b.value,
				"prev-episode": le.value,
				"next-episode": ue.value,
				autoplay: !0,
				onBack: K,
				onPlayNext: Ce,
				onPlayEpisode: we,
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
			])) : F("", !0)]),
			z(ee, {
				modelValue: ce.value,
				"onUpdate:modelValue": t[0] ||= (e) => ce.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Te(() => [z(S, {
					variant: "solid",
					onClick: X
				}, {
					default: Te(() => [...t[3] ||= [R("OK", -1)]]),
					_: 1
				})]),
				default: Te(() => [L("p", ji, q(se.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-bc15dbd5"]]);
//#endregion
export { Mi as default };

//# sourceMappingURL=PlayerPage-YuB_tkqS.js.map