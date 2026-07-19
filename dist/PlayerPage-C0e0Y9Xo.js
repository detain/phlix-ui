import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-Ci10VWtp.js";
import { n, t as r } from "./Modal-BkHcWnO5.js";
import { t as i } from "./useFocusTrap-DZxA3ZEr.js";
import { a } from "./usePreferencesStore-C9GLbD7G.js";
import { t as o } from "./useMessages-CMPz9FmM.js";
import { c as s, l as c, t as l } from "./client-D80As4Gx.js";
import { n as u, r as d } from "./useApiBase-CV_r-Kk4.js";
import { i as f } from "./usePlayerStore-Dgw0JCWb.js";
import { t as p } from "./useToastStore-BDoKlU6N.js";
import { n as m, t as h } from "./ThumbRating-DV17BrTc.js";
import { a as g, n as _, o as v, r as y, t as b } from "./shortcuts-BJjIEmOV.js";
import { t as x } from "./Spinner-BarUExCr.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as S } from "./Button-AW4z0vv0.js";
import { t as C } from "./Slider-LnnvB5jy.js";
import { t as w } from "./Select-nIPW0HYh.js";
import { t as te } from "./Skeleton-DhQmxeNg.js";
import { t as T } from "./EmptyState-CLDEIm6E.js";
import { n as ne } from "./media-query-DKjhlX8r.js";
import { n as E, o as D, r as O, t as k } from "./episode-order-C2yqgMeX.js";
import { n as re, r as ie, t as ae } from "./useMediaItemCache-BKCJnCbr.js";
import { a as oe, c as se, d as ce, f as le, i as ue, l as de, n as A, o as j, r as fe, s as pe, t as me, u as he } from "./captions-DoP7ce5A.js";
import { n as ge, t as _e } from "./SyncPlayModal-B4keIxvi.js";
import { Fragment as M, Transition as N, computed as P, createBlock as F, createCommentVNode as I, createElementBlock as L, createElementVNode as R, createTextVNode as z, createVNode as B, defineComponent as V, inject as ve, mergeModels as H, nextTick as ye, normalizeClass as U, normalizeStyle as W, onBeforeUnmount as be, onMounted as xe, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as Se, unref as Y, useModel as Ce, watch as X, withCtx as we, withModifiers as Te } from "vue";
import { onBeforeRouteLeave as Ee, useRoute as De, useRouter as Oe } from "vue-router";
//#region src/components/player/format-time.ts
function Z(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var ke = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Ae = { class: "scrubber__track" }, je = ["title"], Me = { class: "scrubber__time numeric" }, Ne = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { t: r } = o(), i = e, a = n, s = K(null), c = K(!1), l = K(!1), u = K(0), d = K(0), f = (e) => Math.min(1, Math.max(0, e)), p = P(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = P(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = P(() => (c.value || l.value) && i.duration > 0), g = P(() => c.value ? u.value : d.value), _ = P(() => g.value * i.duration), v = P(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = P(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = P(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = P(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
			if (i.duration <= 0) return;
			c.value = !0;
			try {
				s.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = ee(e);
			u.value = t, a("scrub-start"), e.preventDefault();
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
			a("seek", n), e.preventDefault();
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
			"aria-valuetext": Y(Z)(e.position),
			"aria-label": Y(r)("player.seek"),
			onPointerdown: S,
			onPointermove: C,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: te,
			onPointerleave: T,
			onKeydown: ne
		}, [R("div", Ae, [
			R("div", {
				class: "scrubber__buffered",
				style: W({ transform: `scaleX(${m.value})` })
			}, null, 4),
			R("div", {
				class: "scrubber__played",
				style: W({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(G(!0), L(M, null, q(x.value, (e, t) => (G(), L("span", {
				key: t,
				class: "scrubber__tick",
				style: W({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, je))), 128)),
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
		}, null, 4)) : I("", !0), R("span", Me, J(Y(Z)(_.value)), 1)], 4)) : I("", !0)], 40, ke));
	}
}), [["__scopeId", "data-v-3d610715"]]), Pe = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Q(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Fe(e) {
	return e === !0 || e === "true" || e === 1;
}
function Ie(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Le(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Q(e.url ?? e.src);
		r !== "" && t.push({
			index: Ie(e.index),
			language: Q(e.language ?? e.lang ?? e.srclang),
			label: Q(e.label),
			default: Fe(e.default ?? e.isDefault),
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
		let e = n, r = Ie(e.height);
		r <= 0 || t.push({
			id: Q(e.id),
			label: Q(e.label),
			height: r,
			width: Ie(e.width),
			bitrate: Ie(e.bitrate)
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
		jobId: Q(t.job_id ?? t.jobId),
		masterUrl: Q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Q(t.status, "running"),
		reused: Fe(t.reused),
		subtitles: Le(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Re(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function He(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		status: Q(t.status, "running"),
		playlistReady: Fe(t.playlist_ready ?? t.playlistReady),
		progress: Ie(t.progress),
		masterUrl: Q(t.master_url ?? t.masterUrl),
		subtitles: Le(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Re(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ue(e) {
	return e.playlistReady || e.status === "completed";
}
function We(e) {
	return Pe.has(e);
}
function Ge(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Ke(e) {
	let t = K("idle"), n = K(0), r = K([]), i = K([]), a = K(-1), o = K(!0), s = K(null), c = K(null), u = K([]), d = K(-1), p = K(null), m = K(null);
	function h(e) {
		if (!E) return;
		i.value = E.levels, a.value = E.getCurrentLevel(), o.value = E.autoLevelEnabled;
		let t = e ?? E.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function g() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function _(e) {
		E && (u.value = E.audioTracks, d.value = e ?? E.getCurrentAudioTrack());
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
			url: Ge(n, e.url)
		}));
	}
	let ee = e.attach ?? v, S = e.pollIntervalMs ?? 1e3, C = e.maxWaitMs ?? 12e4, w = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), te = Math.max(1, Math.ceil(C / Math.max(1, S))), T = qe(), ne = e.getToken ?? (() => Je(T)), E = null, D = null, O = null, k = !1, re = null;
	function ie() {
		return e.client ?? new l({
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
				if (await w(S), k) return;
			}
			if (!l) throw Error("transcode timed out");
			if (E = await ee(i, m.value, {
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
			D = E.onLevelSwitched((e) => h(e)), O = E.onAudioTrackSwitched((e) => _(e)), h(), _();
			try {
				let e = f();
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
		E && (E.setAudioTrack(e), _());
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
		variants: c,
		audioTracks: u,
		currentAudioTrack: d,
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
		return new s();
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
		let i = r.frame, a = i % Ye, s = Math.floor(i / Ye), c = a / (Ye - 1) * 100, l = s / (Xe - 1) * 100;
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
var Qe = ["aria-label"], $e = { class: "shortcuts__head" }, et = { class: "shortcuts__title" }, tt = { class: "shortcuts__grid" }, nt = { class: "shortcuts__keys" }, rt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, it = {
	key: 1,
	class: "shortcuts__key"
}, at = { class: "shortcuts__label" }, ot = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => y }
	},
	emits: ["close"],
	setup(e, { emit: r }) {
		let a = e, s = r, { t: c } = o(), l = K(null);
		return i(l, Se(a, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (G(), L("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= Te((e) => s("close"), ["self"])
		}, [R("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [R("div", $e, [R("h3", et, J(Y(c)("player.keyboard")), 1), B(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), R("ul", tt, [(G(!0), L(M, null, q(e.shortcuts, (e) => (G(), L("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [R("span", nt, [(G(!0), L(M, null, q(e.keys, (e, n) => (G(), L(M, { key: n }, [e === "–" ? (G(), L("span", rt, "–")) : (G(), L("kbd", it, [Y(b)[e] ? (G(), F(t, {
			key: 0,
			name: Y(b)[e],
			label: Y(_)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), L(M, { key: 1 }, [z(J(e), 1)], 64))]))], 64))), 128))]), R("span", at, J(e.label), 1)]))), 128))])], 8, Qe)])) : I("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), st = { class: "volume" }, ct = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "VolumeControl",
	setup(e) {
		let t = f(), r = a(), { t: i } = o(), s = P(() => t.muted ? 0 : t.volume), c = P(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return X(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (G(), L("div", st, [B(n, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), lt = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		], n = f(), { t: r } = o(), i = P(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), F(w, {
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
function _t(e, t) {
	if (t < 0) return ut;
	let n = e.find((e) => e.index === t);
	return n ? ft(n.height) : ut;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var vt = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let r = e, i = Ce(e, "open"), s = K(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = f(), d = a(), { t: p } = o(), m = P(() => mt(r.levels)), h = P(() => {
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
		}), g = P(() => m.value.length >= 2 ? m.value : h.value), _ = P(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = P(() => gt(r.levels, _.value)), y = P(() => _.value && v.value >= 0 ? {
			value: dt,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = P(() => g.value.length >= 2), x = P(() => r.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: pt(r.activeHeight) })), ee = P(() => [
			{
				value: ut,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), S = P(() => r.autoEnabled ? ut : y.value && r.currentLevel === v.value && (u.quality === "original" || d.defaultQuality === "original") ? dt : _t(r.levels, r.currentLevel));
		function C(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), d.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : ht(r.levels, t);
			u.setQuality(t), d.defaultQuality = t, n >= 0 ? l("select", n) : l("select", t);
		}
		return t({ toggleMenu: c }), (e, t) => b.value || i.value ? (G(), F(w, {
			key: 0,
			ref_key: "selectRef",
			ref: s,
			class: "quality-menu",
			tone: "glass",
			"model-value": S.value,
			options: ee.value,
			label: Y(p)("player.quality"),
			open: i.value,
			"onUpdate:open": t[0] ||= (e) => i.value = e,
			"onUpdate:modelValue": C
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), yt = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = P(() => se(n.styleConfig)), a = null, o = null;
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
			c(), pe(n.video, n.language);
			let e = le(n.video, n.language);
			if (e) {
				if (a = e, e.addEventListener("cuechange", s), r.value = ce(e), !r.value.length) {
					let t = l(n.video, e);
					t && t.readyState !== 2 && (o = t, t.addEventListener("load", s));
				}
			} else r.value = [];
		}
		return X(() => [n.video, n.language], u, { immediate: !0 }), be(c), t({ lines: r }), (t, n) => r.value.length ? (G(), L("div", {
			key: 0,
			class: U(["player__captions", { "is-lifted": e.lifted }]),
			style: W(i.value)
		}, [(G(!0), L(M, null, q(r.value, (e, t) => (G(), L("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : I("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), bt = ["aria-label", "aria-expanded"], xt = ["aria-label"], St = { class: "capmenu__head" }, Ct = { class: "capmenu__title" }, wt = ["aria-label"], Tt = ["aria-checked", "tabindex"], Et = { class: "capmenu__check" }, Dt = { class: "capmenu__optlabel" }, Ot = [
	"aria-checked",
	"tabindex",
	"onClick"
], kt = { class: "capmenu__check" }, At = { class: "capmenu__optlabel" }, jt = { class: "capmenu__title capmenu__title--sub" }, Mt = ["aria-label"], Nt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Pt = { class: "capmenu__check" }, Ft = { class: "capmenu__optlabel" }, It = { class: "capmenu__title capmenu__title--sub" }, Lt = { class: "capmenu__style" }, Rt = { class: "capmenu__field" }, zt = { class: "capmenu__fieldlabel" }, Bt = { class: "capmenu__field" }, Vt = { class: "capmenu__fieldlabel" }, Ht = { class: "capmenu__field" }, Ut = { class: "capmenu__fieldlabel" }, Wt = { class: "capmenu__field" }, Gt = { class: "capmenu__fieldlabel" }, Kt = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let s = e, c = r, l = f(), u = a(), { t: d } = o(), p = K(null), m = K(null), h = P(() => l.subtitleLang), g = P(() => s.tracks.some((e) => e.language === h.value)), _ = P(() => g.value ? "captions" : "captions-off"), v = P(() => g.value ? s.tracks.findIndex((e) => e.language === h.value) + 1 : 0), y = P(() => s.activeAudio >= 0 ? s.activeAudio : 0);
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
		i(m, Se(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function k(e) {
			p.value && !p.value.contains(e.target) && x();
		}
		return X(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", k, !0) : document.removeEventListener("pointerdown", k, !0));
		}, { immediate: !0 }), be(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", k, !0);
		}), (r, i) => (G(), L("div", {
			ref_key: "rootEl",
			ref: p,
			class: "capmenu"
		}, [R("button", {
			type: "button",
			class: U(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? Y(d)("player.captionsOn") : Y(d)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [B(t, { name: _.value }, null, 8, ["name"])], 10, bt), e.open ? (G(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			R("div", St, [R("h3", Ct, J(Y(d)("player.subtitles")), 1), B(n, {
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
			}, [R("span", Et, [g.value ? I("", !0) : (G(), F(t, {
				key: 0,
				name: "check"
			}))]), R("span", Dt, J(Y(d)("player.off")), 1)], 8, Tt), (G(!0), L(M, null, q(e.tracks, (e, n) => (G(), L("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => ee(e.language)
			}, [R("span", kt, [h.value === e.language ? (G(), F(t, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", At, J(e.label), 1)], 8, Ot))), 128))], 40, wt),
			e.audioTracks.length > 1 ? (G(), L(M, { key: 0 }, [R("h3", jt, J(Y(d)("player.audio")), 1), R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(d)("player.audioTrack"),
				onKeydown: T
			}, [(G(!0), L(M, null, q(e.audioTracks, (n) => (G(), L("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => S(n.index)
			}, [R("span", Pt, [e.activeAudio === n.index ? (G(), F(t, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", Ft, J(n.label), 1)], 8, Nt))), 128))], 40, Mt)], 64)) : I("", !0),
			R("h3", It, J(Y(d)("player.captionStyle")), 1),
			R("div", Lt, [
				R("div", Rt, [R("span", zt, J(Y(d)("player.size")), 1), B(w, {
					"model-value": Y(u).captionStyle.size,
					options: Y(ue),
					label: Y(d)("player.captionSize"),
					"onUpdate:modelValue": ne
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", Bt, [R("span", Vt, J(Y(d)("player.color")), 1), B(w, {
					"model-value": Y(u).captionStyle.textColor,
					options: Y(A),
					label: Y(d)("player.captionColor"),
					"onUpdate:modelValue": E
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", Ht, [R("span", Ut, J(Y(d)("player.background")), 1), B(w, {
					"model-value": Y(u).captionStyle.background,
					options: Y(me),
					label: Y(d)("player.captionBackground"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", Wt, [R("span", Gt, J(Y(d)("player.edge")), 1), B(w, {
					"model-value": Y(u).captionStyle.edge,
					options: Y(fe),
					label: Y(d)("player.captionEdge"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, xt)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-bce771b9"]]), qt = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Jt(e, t, n, r, i, a, o) {
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
		r: qt(d / m),
		g: qt(f / m),
		b: qt(p / m)
	};
}
function Yt(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Jt(e, t, n, 0, 0, r, n),
		right: Jt(e, t, n, t - r, 0, t, n),
		center: Jt(e, t, n, 0, 0, t, n)
	};
}
function Xt({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Zt(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Xt(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Xt(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Xt(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Qt(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var $t = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			r.value = Qt(i);
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
				c.value = Zt(Yt(n, 32, 18));
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
		}, { immediate: !0 }), xe(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), be(() => {
			C(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let w = P(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (G(), L("div", {
			class: U(["player__ambient", { "is-active": o.value }]),
			style: W(o.value ? w.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), en = ["aria-label"], tn = { class: "resume__label" }, nn = { class: "resume__time numeric" }, rn = { class: "resume__actions" }, an = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o(), a = P(() => i("player.resumeFrom").split("{time}"));
		return (n, o) => (G(), L("div", {
			class: "resume",
			role: "region",
			"aria-label": Y(i)("player.resumePlayback")
		}, [R("p", tn, [
			z(J(a.value[0]), 1),
			R("span", nn, J(Y(Z)(e.seconds)), 1),
			z(J(a.value[1]), 1)
		]), R("div", rn, [R("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: o[0] ||= (e) => r("resume")
		}, [B(t, { name: "play" }), R("span", null, J(Y(i)("player.resume")), 1)]), R("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: o[1] ||= (e) => r("restart")
		}, [B(t, { name: "rewind" }), R("span", null, J(Y(i)("player.startOver")), 1)])])], 8, en));
	}
}), [["__scopeId", "data-v-271c5209"]]), on = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], sn = /* @__PURE__ */ new Set([
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
function cn(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function ln(...e) {
	return e.some((e) => sn.has(cn(e)));
}
function un(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function dn(e) {
	return e?.error?.code === 2;
}
function $(e) {
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
var fn = 2 * Math.PI * 15;
function pn(e, t, n = fn) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var mn = /* @__PURE__ */ new Map([
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
]), hn = [
	"video/mp4; codecs=\"hvc1.1.4.L120.90\"",
	"video/mp4; codecs=\"hev1.1.4.L120.90\"",
	"video/mp4; codecs=\"hvc1.1.6.L93.B0\"",
	"video/mp4; codecs=\"hvc1.1.4.L120\""
];
function gn(e, t = "video/mp4") {
	let n = mn.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function _n(e, t = "video/mp4") {
	if (!e) return !0;
	let n = gn(e, t);
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
async function vn() {
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
		for (let t of hn) {
			let n = e.canPlayType(t);
			if (n === "probably" || n === "maybe") return !0;
		}
	}
	return !1;
}
async function yn(e, t) {
	if (ln(...e)) return !0;
	let n = e.map((e) => cn(e)).find((e) => on.includes(e)) ?? "", r = n ? `video/${n}` : "video/mp4";
	if (on.includes(n) && t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await _n(e.codec, r) || (n === "mp4" || n === "m4v") && !await vn()) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var bn = ["aria-label"], xn = ["src"], Sn = { class: "upnext__body" }, Cn = { class: "upnext__eyebrow" }, wn = { class: "upnext__title" }, Tn = {
	key: 0,
	class: "upnext__cd numeric"
}, En = { class: "upnext__actions" }, Dn = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, On = ["r"], kn = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], An = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { t: r } = o(), i = e, a = n, s = P(() => i.posterUrl ?? i.media.poster_url ?? null), c = P(() => pn(i.remaining, i.total));
		return (n, i) => (G(), L("aside", {
			class: "upnext",
			role: "region",
			"aria-label": Y(r)("player.upNext")
		}, [
			s.value ? (G(), L("img", {
				key: 0,
				class: "upnext__thumb",
				src: s.value,
				alt: "",
				loading: "lazy"
			}, null, 8, xn)) : I("", !0),
			R("div", Sn, [
				R("p", Cn, J(Y(r)("player.upNext")), 1),
				R("h4", wn, J(e.media.name), 1),
				e.counting ? (G(), L("p", Tn, J(Y(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : I("", !0),
				R("div", En, [R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [B(t, { name: "play" }), R("span", null, J(Y(r)("player.playNow")), 1)]), R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, J(Y(r)("player.cancel")), 1)])
			]),
			e.counting ? (G(), L("svg", Dn, [R("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, On), R("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Y(fn),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, kn)])) : I("", !0)
		], 8, bn));
	}
}), [["__scopeId", "data-v-85909b2d"]]), jn = {
	class: "transcode",
	role: "alert"
}, Mn = { class: "transcode__card" }, Nn = { class: "transcode__heading" }, Pn = { class: "transcode__body" }, Fn = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = o();
		return (n, a) => (G(), L("div", jn, [R("div", Mn, [
			B(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			R("h3", Nn, J(Y(i)("player.transcodeHeading")), 1),
			R("p", Pn, J(e.title ? Y(i)("player.transcodeBodyTitled", { title: e.title }) : Y(i)("player.transcodeBodyUntitled")), 1),
			R("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [B(t, { name: "arrow-left" }), R("span", null, J(Y(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), In = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Ln = { class: "prep__card" }, Rn = { class: "prep__heading" }, zn = { class: "prep__body" }, Bn = ["aria-valuenow"], Vn = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = o(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (G(), L("div", In, [R("div", Ln, [
			B(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			R("h3", Rn, J(Y(r)("player.transcodePreparingHeading")), 1),
			R("p", zn, J(e.title ? Y(r)("player.transcodePreparingTitled", { title: e.title }) : Y(r)("player.transcodePreparingUntitled")), 1),
			R("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [R("div", {
				class: "prep__bar-fill",
				style: W({ width: i() + "%" })
			}, null, 4)], 8, Bn),
			R("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [B(t, { name: "arrow-left" }), R("span", null, J(Y(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Hn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		return (e, n) => (G(), F(N, { name: "skip" }, {
			default: we(() => [c.value ? (G(), L("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Te(l, ["stop"])
			}, [R("span", null, J(c.value.label), 1), B(t, { name: "skip-forward" })])) : I("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Un = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, Wn = ["aria-label", "onClick"], Gn = { class: "skip-controls__label" }, Kn = 5, qn = 30, Jn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			let n = s(e.startMs), r = n - Kn, i = n + qn;
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
		return (e, n) => f.value.length > 0 ? (G(), L("div", Un, [(G(!0), L(M, null, q(f.value, (e) => (G(), L("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: Te((t) => p(e), ["stop"])
		}, [R("span", Gn, J(d(e.type)), 1), B(t, { name: "skip-forward" })], 8, Wn))), 128))])) : I("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Yn = ["aria-label", "aria-expanded"], Xn = ["aria-label"], Zn = { class: "chapterlist__head" }, Qn = { class: "chapterlist__title" }, $n = ["aria-label"], er = ["onClick"], tr = { class: "chapterlist__index" }, nr = { class: "chapterlist__name" }, rr = { class: "chapterlist__meta" }, ir = { class: "chapterlist__time" }, ar = {
	key: 0,
	class: "chapterlist__duration"
}, or = {
	key: 1,
	class: "chapterlist__empty"
}, sr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Z(e.start), a;
			return e.end != null && e.end > e.start && (a = Z(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = K(null), p = K(null);
		i(p, Se(a, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		X(() => a.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), be(() => {
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
			"aria-label": Y(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [B(t, { name: "list" })], 10, Yn), e.open ? (G(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.chapterList"),
			tabindex: "-1"
		}, [R("div", Zn, [R("h3", Qn, J(Y(c)("player.chapters")), 1), B(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (G(), L("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": Y(c)("player.chapterList")
		}, [(G(!0), L(M, null, q(d.value, (e) => (G(), L("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [R("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			R("span", tr, J(e.index), 1),
			R("span", nr, J(e.label), 1),
			R("span", rr, [R("span", ir, J(e.startLabel), 1), e.durationLabel ? (G(), L("span", ar, "· " + J(e.durationLabel), 1)) : I("", !0)])
		], 8, er)]))), 128))], 8, $n)) : (G(), L("p", or, J(Y(c)("player.noChapters")), 1))], 8, Xn)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), cr = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, lr = { class: "marker-timeline__ticks" }, ur = [
	"title",
	"aria-label",
	"onClick"
], dr = { class: "marker-timeline__tooltip" }, fr = { class: "marker-timeline__tooltip-label" }, pr = { class: "marker-timeline__tooltip-time numeric" }, mr = ["onClick"], hr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		}, [l.value ? (G(), L("div", cr, [t[0] ||= R("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [R("polygon", { points: "5,3 19,12 5,21" })], -1), z(" " + J(u.value), 1)])) : I("", !0), R("div", lr, [(G(!0), L(M, null, q(s.value, (e) => (G(), L("button", {
			key: e.id,
			type: "button",
			class: U(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: W({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Y(Z)(e.startSec)}`,
			"aria-label": `${e.label} at ${Y(Z)(e.startSec)}`,
			onClick: Te((t) => d(e), ["stop"])
		}, [R("span", dr, [
			R("span", fr, J(e.label), 1),
			R("span", pr, J(Y(Z)(e.startSec)), 1),
			R("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Te((t) => f(e), ["stop"])
			}, " Find similar ", 8, mr)
		])], 14, ur))), 128))])], 2)) : I("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), gr = ["aria-label", "aria-expanded"], _r = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, vr = ["aria-label"], yr = ["aria-selected", "onClick"], br = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		return be(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (G(), L("div", { class: U(["sleep-timer", { "is-active": l.value }]) }, [R("button", {
			type: "button",
			class: U(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : Y(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [B(t, { name: "moon" }), l.value ? (G(), L("span", _r, J(m(c.value)), 1)) : I("", !0)], 10, gr), B(N, { name: "dropdown" }, {
			default: we(() => [h.value ? (G(), L("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": Y(i)("player.sleepTimer")
			}, [(G(), L(M, null, q(a, (e) => R("li", {
				key: e.value,
				class: U(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, J(e.label), 11, yr)), 64))], 8, vr)) : I("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), xr = {
	key: 0,
	class: "syncplay-overlay"
}, Sr = { class: "syncplay-overlay__badge" }, Cr = { class: "syncplay-overlay__label" }, wr = { class: "syncplay-overlay__status-label" }, Tr = { class: "syncplay-overlay__members" }, Er = { class: "syncplay-overlay__member-count" }, Dr = { class: "syncplay-overlay__member-list" }, Or = { class: "syncplay-overlay__member-name" }, kr = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Ar = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = o(), i = ge(), a = u(), s = P(() => n.apiBase ?? a.value), c = P(() => i.currentRoom?.name ?? "SyncPlay"), l = P(() => i.onlineMembers.length), d = P(() => i.syncStatus), f = P(() => {
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
		return (e, n) => Y(i).isInRoom ? (G(), L("div", xr, [
			R("div", Sr, [B(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), R("span", Cr, "SyncPlay: " + J(c.value), 1)]),
			R("div", { class: U(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [B(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), R("span", wr, J(f.value), 1)], 2),
			R("div", Tr, [R("span", Er, [B(t, { name: "user" }), z(" " + J(l.value) + " " + J(Y(r)("syncplay.members", { count: l.value })), 1)]), R("ul", Dr, [(G(!0), L(M, null, q(Y(i).onlineMembers.slice(0, 5), (e) => (G(), L("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= R("span", { class: "syncplay-overlay__member-dot" }, null, -1), R("span", Or, J(e.name), 1)]))), 128)), Y(i).onlineMembers.length > 5 ? (G(), L("li", kr, " +" + J(Y(i).onlineMembers.length - 5) + " more ", 1)) : I("", !0)])]),
			B(S, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: we(() => [z(J(Y(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), jr = {
	key: 0,
	class: "syncplay-controls"
}, Mr = ["aria-label"], Nr = { class: "syncplay-controls__wait-label" }, Pr = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, Fr = { key: 0 }, Ir = { class: "syncplay-controls__transport" }, Lr = ["aria-label"], Rr = ["aria-label"], zr = ["aria-label"], Br = { class: "syncplay-controls__status-label" }, Vr = 10, Hr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let r = e, i = n, { t: a } = o(), s = ge(), c = u(), l = P(() => r.apiBase ?? c.value), d = K(!1), f = K([]), p = P(() => d.value || s.syncStatus === "re-syncing");
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
			await _(Math.max(0, r.position - Vr));
		}
		async function y() {
			await _(Math.min(r.duration, r.position + Vr));
		}
		return X(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1, f.value = []);
		}), (n, r) => Y(s).isInRoom ? (G(), L("div", jr, [
			p.value ? (G(), L("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": Y(a)("syncplay.waitingForMembers")
			}, [
				B(t, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				R("span", Nr, J(Y(a)("syncplay.waitingForMembers")), 1),
				f.value.length > 0 ? (G(), L("span", Pr, [z(J(f.value.slice(0, 3).join(", ")) + " ", 1), f.value.length > 3 ? (G(), L("span", Fr, "+" + J(f.value.length - 3), 1)) : I("", !0)])) : I("", !0)
			], 8, Mr)) : I("", !0),
			R("div", Ir, [
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(a)("syncplay.rewind"),
					onClick: v
				}, [B(t, { name: "rewind" })], 8, Lr),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Y(a)("syncplay.pauseAll") : Y(a)("syncplay.playAll"),
					onClick: g
				}, [B(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Rr),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(a)("syncplay.fastForward"),
					onClick: y
				}, [B(t, { name: "forward" })], 8, zr)
			]),
			R("div", { class: U(["syncplay-controls__status", `syncplay-controls__status--${Y(s).syncStatus}`]) }, [B(t, {
				name: Y(s).syncStatus === "synced" ? "check" : Y(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), R("span", Br, J(Y(s).syncStatus === "synced" ? Y(a)("syncplay.synced") : Y(s).syncStatus === "outOfSync" ? Y(a)("syncplay.outOfSync") : Y(a)("syncplay.reSyncing")), 1)], 2)
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), Ur = { class: "player__stage" }, Wr = ["src", "poster"], Gr = [
	"src",
	"srclang",
	"label",
	"default"
], Kr = { class: "player__meta" }, qr = ["aria-label"], Jr = { class: "player__meta-text" }, Yr = { class: "player__eyebrow" }, Xr = { class: "player__title" }, Zr = { class: "player__sub numeric" }, Qr = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, $r = {
	key: 0,
	class: "player__center"
}, ei = ["aria-label"], ti = { class: "player__btnrow" }, ni = ["aria-label"], ri = ["aria-label"], ii = ["aria-label"], ai = { class: "player__time numeric" }, oi = ["aria-label", "aria-pressed"], si = ["title"], ci = ["aria-label"], li = ["aria-label"], ui = ["aria-label", "aria-pressed"], di = ["aria-label", "aria-pressed"], fi = ["aria-label"], pi = { class: "similar-modal" }, mi = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, hi = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, gi = { class: "similar-modal__state-title" }, _i = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, vi = {
	key: 3,
	class: "similar-modal__results"
}, yi = { class: "similar-modal__poster" }, bi = ["src", "alt"], xi = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Si = { class: "similar-modal__result-body" }, Ci = { class: "similar-modal__result-title" }, wi = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Ti = { key: 0 }, Ei = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let i = e, s = n, c = f(), u = a(), { t: d } = o(), _ = ge(), v = m(), y = P(() => v.isFavorite(i.media.id)), b = P(() => v.likeLevel(i.media.id));
		function ee() {
			v.toggleFavorite(i.media.id, me());
		}
		function S(e) {
			v.setLike(i.media.id, e, me());
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
		], w = K(null), te = K(null), T = K(!0), ne = K(!1), E = K(!1), D = K(!1), O = K(!1), k = K(!1), re = K(!1), ie = K(null), ae = K(null), se = K(!1), ce = p(), le = K(!1), ue = P(() => O.value ? 1.35 : 1), A = K(ln(i.streamUrl, i.media.path));
		async function fe() {
			if (A.value) return;
			let e = i.playbackAudioTracks ?? [];
			e.length !== 0 && await yn([i.streamUrl, i.media.path], e) && (A.value = !0);
		}
		X(() => i.playbackAudioTracks, (e) => {
			!e || e.length === 0 || fe();
		}, { immediate: !1 });
		let pe = ve("phlixConfig", null);
		function me() {
			return pe?.apiBase ?? "";
		}
		let N = Ke({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: pe?.playerHlsConfig
		}), V = Ze({ apiBase: () => i.apiBase ?? "" }), H = null;
		function W(e) {
			H !== null && clearTimeout(H), H = setTimeout(() => {
				H = null, V.fetch(e);
			}, 0);
		}
		let Se = P(() => i.thumbnailAt ?? V.thumbnailAt), Ce = P(() => A.value ? void 0 : i.streamUrl), Ee = P(() => A.value && N.state.value !== "ready"), De = P(() => A.value && (N.state.value === "preparing" || N.state.value === "idle")), Oe = P(() => A.value && N.state.value === "error");
		function ke(e = 0) {
			let t = w.value;
			t && N.start(t, i.media.id, void 0, e);
		}
		function Ae(e) {
			if (c.quality === "original" && e !== "auto") {
				N.loadVariantPlaylist(dt);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				N.loadVariantPlaylist(e);
				return;
			}
			N.setLevel(e);
		}
		let je = !1;
		X(() => N.levels.value, (e) => {
			if (je || e.length === 0) return;
			je = !0;
			let t = u.defaultQuality;
			if (!t || t === "auto") return;
			if (t === "original") {
				N.loadVariantPlaylist(dt);
				return;
			}
			let n = ht(e, t);
			n >= 0 && N.setNextLevel(n);
		}), X(() => N.variants.value, (e) => {
			e?.length && !je && (je = !1, ye(() => {
				if (N.levels.value.length > 0) {
					je = !0;
					let e = u.defaultQuality;
					if (!e || e === "auto") return;
					if (e === "original") {
						N.loadVariantPlaylist(dt);
						return;
					}
					let t = ht(N.levels.value, e);
					t >= 0 && N.setNextLevel(t);
				}
			}));
		}, { deep: !0 });
		let Me = K(c.resumePositionFor(i.media.id) ?? 0), Pe = K(!A.value && Me.value > 0), Q = null, Fe = K(!1), Ie = K(8), Le, Re = K(null), ze = K(0), Be = K(!1), Ve = K([]), He = K(!1), Ue = K(null);
		function We(e, t) {
			Re.value = e, ze.value = t, Ve.value = [], Ue.value = null, Be.value = !0, Xe(e, t);
		}
		let Ge = null, qe = null, Je = null;
		function Ye() {
			let e = i.apiBase ?? "";
			return (qe === null || Je !== e) && (qe = new l({ baseUrl: e }), Je = e), qe;
		}
		async function Xe(e, t) {
			Ge?.abort(), Ge = new AbortController(), He.value = !0, Ue.value = null;
			try {
				let n = await Ye().searchByMarker(e, t, 30, 20, Ge.signal);
				Ve.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Ue.value = "Failed to load similar media. Please try again.", Ve.value = [];
			} finally {
				He.value = !1;
			}
		}
		function Qe() {
			Ge?.abort(), Be.value = !1, Ve.value = [], Ue.value = null, Re.value = null;
		}
		let $e = P(() => c.upNext);
		function et() {
			A.value = ln(i.streamUrl, i.media.path), fe(), Me.value = c.resumePositionFor(i.media.id) ?? 0, Pe.value = !A.value && Me.value > 0, Q = null, Ut = !1, jt = !1, Mt = !1, wt.value = -1, Rt = null, je = !1, it(), Fe.value = !1, N.reset(), w.value && (w.value.currentTime = 0), A.value && ke(), W(i.media.id);
		}
		function tt(e) {
			let t = w.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Q = Math.max(0, e));
		}
		function nt() {
			tt(Me.value), Pe.value = !1, w.value?.play()?.catch(() => {});
		}
		function rt() {
			Q = null, tt(0), c.clearResume(i.media.id), Pe.value = !1, w.value?.play()?.catch(() => {});
		}
		function it() {
			Le &&= (clearInterval(Le), void 0);
		}
		function at() {
			Ie.value = 8, it(), Le = setInterval(() => {
				--Ie.value, Ie.value <= 0 && (it(), ut());
			}, 1e3);
		}
		function st() {
			On(), T.value = !0, c.upNext && (Fe.value = !0, u.autoplay && at());
		}
		function ut() {
			it(), Fe.value = !1;
			let e = c.next(i.streamUrlFor);
			e && s("play-next", e);
		}
		function ft() {
			it(), Fe.value = !1;
		}
		function pt() {
			if (A.value) return;
			let e = w.value, t = dn(e) && (e?.currentTime ?? 0) === 0;
			(un(e) || t) && (A.value = !0, ke(e?.currentTime ?? 0));
		}
		let mt = K([]), gt = K([]), _t = K(-1), bt = K(!1), xt = P(() => N.state.value === "ready" && N.audioTracks.value.length > 0), St = P(() => N.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Ct = P(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), wt = K(-1), Tt = P(() => !xt.value && !A.value && gt.value.length === 0 && Ct.value.length > 1), Et = P(() => xt.value ? St.value : Tt.value ? Ct.value : gt.value), Dt = P(() => {
			if (xt.value) return N.currentAudioTrack.value;
			if (Tt.value) {
				if (wt.value >= 0) return wt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return _t.value;
		}), Ot = K(!1), kt = c.subtitleLang, At = P(() => A.value ? N.subtitleTracks.value : i.playbackSubtitleTracks ?? []), jt = !1, Mt = !1;
		function Nt() {
			if (jt) return;
			if (u.subtitlePreferenceSet) {
				jt = !0;
				return;
			}
			let e = At.value.find((e) => e.default);
			if (!e) return;
			let t = mt.value.find((t) => t.language === (e.language || e.label));
			t && (c.setSubtitle(t.language), kt = t.language, jt = !0);
		}
		function Pt() {
			if (Mt) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = Et.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Dt.value;
			r >= 0 && r < t.length || (zt(n), Mt = !0);
		}
		let Ft = P(() => mt.value.some((e) => e.language === c.subtitleLang));
		function It() {
			let e = w.value;
			mt.value = he(e), gt.value = de(e), _t.value = oe(e), Nt(), Pt();
		}
		function Lt() {
			if (Ft.value) kt = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = kt && mt.value.some((e) => e.language === kt) ? kt : mt.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			s("captions");
		}
		let Rt = null;
		function zt(e) {
			if (xt.value) N.setAudioTrack(e);
			else if (Tt.value) {
				if (e === Dt.value) return;
				wt.value = e, Rt = e, A.value = !0, ke(w.value?.currentTime ?? 0);
			} else j(w.value, e), _t.value = e;
		}
		X(xt, (e) => {
			if (!e || Rt === null) return;
			let t = Rt;
			Rt = null, t >= 0 && t < N.audioTracks.value.length && N.setAudioTrack(t);
		}), X(At, () => {
			ye(() => It());
		}, { deep: !0 });
		let Bt = null, Vt, Ht = P(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Ut = !1;
		function Wt() {
			if (!i.autoplay || Ut || Pe.value || Ee.value) return;
			let e = w.value;
			if (!e || !e.paused) return;
			Ut = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, c.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Gt() {
			Wt();
		}
		function qt() {
			i.prevEpisode && s("play-episode", i.prevEpisode);
		}
		function Jt() {
			i.nextEpisode && s("play-episode", i.nextEpisode);
		}
		function Yt() {
			let e = w.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Xt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Zt() {
			c.play(), c.setMediaPositionState();
		}
		function Qt() {
			c.pause(), c.setMediaPositionState();
		}
		function en() {
			let e = w.value;
			e && c.updateProgress(e.currentTime, e.duration, Xt(e));
		}
		function tn() {
			let e = w.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, Q !== null && (e.currentTime = e.duration ? Math.min(e.duration, Q) : Q, Q = null), c.updateProgress(e.currentTime, e.duration, Xt(e)), c.setMediaPositionState(), It());
		}
		function nn() {
			let e = w.value;
			e && c.updateProgress(e.currentTime, e.duration, Xt(e));
		}
		function rn() {
			let e = w.value;
			e && (Math.abs(e.volume - c.volume) > .001 && c.setVolume(e.volume), e.muted !== c.muted && c.toggleMute());
		}
		function on() {
			let e = w.value;
			e && e.playbackRate !== c.rate && c.setRate(e.playbackRate), c.setMediaPositionState();
		}
		function sn() {
			c.setMediaPositionState();
		}
		function cn() {
			c.setMediaPositionState();
		}
		function $(e) {
			let t = w.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function fn() {
			E.value = !0, jn();
		}
		function pn() {
			E.value = !1, jn();
		}
		function mn(e) {
			let t = C.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(C[e] - c.rate) ? n : e, 0), n = C[Math.min(C.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		function hn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function gn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function _n() {
			ie.value?.toggleOpen();
		}
		let vn = null;
		function bn() {
			let e = w.value;
			if (!e) {
				c.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), c.pause();
				return;
			}
			vn !== null && (clearInterval(vn), vn = null);
			let t = .05;
			vn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(vn), vn = null, e.volume = 0, e.pause(), c.pause());
			}, 50);
		}
		g({
			playPause: Yt,
			seekBy: (e) => $(c.position + e),
			frameStep: (e) => {
				c.playing || $(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: xn,
			toggleFullscreen: Cn,
			toggleCaptions: Lt,
			toggleTheater: Sn,
			togglePip: Tn,
			skipIntro: hn,
			skipOutro: gn,
			sleepTimer: _n,
			seekToPercent: (e) => $(e * c.duration),
			speedStep: mn,
			toggleHelp: () => {
				D.value = !D.value;
			},
			toggleQuality: () => {
				A.value ? (se.value = !se.value, ae.value?.toggleMenu?.()) : ce.show({
					message: d("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !D.value && !bt.value && !Ot.value });
		function xn() {
			c.toggleMute();
		}
		function Sn() {
			O.value = !O.value, s("theater", O.value);
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
			e && (e.type === "seekTo" ? tt(e.value) : e.type === "seekBy" && tt(c.position + e.value));
		});
		function Cn() {
			if (typeof document > "u") return;
			let e = te.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function wn() {
			ne.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Tn() {
			let e = w.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function En() {
			k.value = !0;
		}
		function Dn() {
			k.value = !1;
		}
		function On() {
			Vt &&= (clearTimeout(Vt), void 0);
		}
		function kn() {
			On(), !(!c.playing || E.value) && (Vt = setTimeout(() => {
				c.playing && !E.value && (T.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function jn() {
			T.value = !0, kn();
		}
		X(() => c.playing, (e) => {
			e ? (Pe.value = !1, ft(), kn()) : (On(), T.value = !0);
		});
		let Mn = null;
		return xe(() => {
			c.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), v.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", wn), re.value = document.pictureInPictureEnabled === !0), Mn = c.bindMediaSession({
				onPlay: () => void w.value?.play()?.catch(() => {}),
				onPause: () => w.value?.pause(),
				onSeek: (e) => $(e)
			}), Bt = w.value?.textTracks ?? null, Bt?.addEventListener?.("addtrack", It), Bt?.addEventListener?.("removetrack", It), It(), A.value && ke(), W(i.media.id);
		}), X(() => i.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), et();
		}), X(() => i.media?.id, () => {
			v.hydrate(i.media);
		}), X(() => _.currentSession, (e) => {
			e && (e.state === "playing" ? (w.value?.play(), c.play()) : e.state === "paused" && (w.value?.pause(), c.pause()), _.updateLocalPosition(c.position), Math.abs(_.driftAmount) > 2 && tt(e.playbackPosition));
		}), be(() => {
			On(), it(), N.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", wn), Mn?.(), Bt?.removeEventListener?.("addtrack", It), Bt?.removeEventListener?.("removetrack", It), vn !== null && (clearInterval(vn), vn = null), H !== null && (clearTimeout(H), H = null);
		}), (n, i) => (G(), L("div", {
			ref_key: "containerRef",
			ref: te,
			class: U(["player", {
				"is-chrome-hidden": !T.value,
				"is-theater": O.value
			}]),
			onPointermove: jn,
			onPointerdown: jn,
			onFocusin: jn
		}, [B($t, {
			video: w.value,
			enabled: Y(u).atmosphere,
			playing: Y(c).playing,
			"reduced-motion": Y(u).effectiveReducedMotion,
			intensity: ue.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), R("div", Ur, [
			R("video", {
				ref_key: "videoRef",
				ref: w,
				class: "player__video",
				src: Ce.value,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Zt,
				onPause: Qt,
				onTimeupdate: en,
				onLoadedmetadata: tn,
				onCanplay: Gt,
				onProgress: nn,
				onVolumechange: rn,
				onRatechange: on,
				onSeeked: sn,
				onDurationchange: cn,
				onEnded: st,
				onError: pt,
				onEnterpictureinpicture: En,
				onLeavepictureinpicture: Dn,
				onClick: Yt
			}, [(G(!0), L(M, null, q(At.value, (e) => (G(), L("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Gr))), 128))], 40, Wr),
			i[18] ||= R("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[19] ||= R("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			R("div", Kr, [R("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Y(d)("player.back"),
				onClick: i[0] ||= Te((e) => s("back"), ["stop"])
			}, [B(t, { name: "arrow-left" })], 8, qr), R("div", Jr, [
				R("p", Yr, J(Y(d)("player.nowPlaying")), 1),
				R("h2", Xr, J(e.media.name), 1),
				R("div", Zr, [(G(!0), L(M, null, q(Ht.value, (e, t) => (G(), L(M, { key: t }, [t > 0 && !e.cert ? (G(), L("span", Qr, "·")) : I("", !0), R("span", { class: U({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			Ee.value ? I("", !0) : (G(), L("div", $r, [R("button", {
				type: "button",
				class: U(["player__bigplay", { "is-playing": Y(c).playing }]),
				"aria-label": Y(c).playing ? Y(d)("player.pause") : Y(d)("player.play"),
				onClick: Te(Yt, ["stop"])
			}, [B(t, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, ei)])),
			B(yt, {
				video: w.value,
				language: Y(c).subtitleLang,
				"style-config": Y(u).captionStyle,
				lifted: T.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			Ee.value ? I("", !0) : (G(), L("div", {
				key: 1,
				class: "player__controls",
				onClick: i[6] ||= Te(() => {}, ["stop"])
			}, [
				B(Ne, {
					position: Y(c).position,
					duration: Y(c).duration,
					buffered: Y(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": Se.value,
					onSeek: $,
					onScrubStart: fn,
					onScrubEnd: pn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				Y(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), F(hr, {
					key: 0,
					position: Y(c).position,
					duration: Y(c).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: We
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : I("", !0),
				R("div", ti, [
					e.prevEpisode ? (G(), L("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(d)("player.previousEpisode"),
						onClick: qt
					}, [B(t, { name: "skip-back" })], 8, ni)) : I("", !0),
					R("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Y(c).playing ? Y(d)("player.pause") : Y(d)("player.play"),
						onClick: Yt
					}, [B(t, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, ri),
					e.nextEpisode ? (G(), L("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(d)("player.nextEpisode"),
						onClick: Jt
					}, [B(t, { name: "skip-forward" })], 8, ii)) : I("", !0),
					R("span", ai, [
						z(J(Y(Z)(Y(c).position)), 1),
						i[14] ||= R("span", { class: "player__sep" }, " / ", -1),
						z(J(Y(Z)(Y(c).duration)), 1)
					]),
					i[15] ||= R("span", { class: "player__grow" }, null, -1),
					R("button", {
						type: "button",
						class: U(["player__iconbtn player__favorite", { "is-on": y.value }]),
						"aria-label": y.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": y.value ? "true" : "false",
						onClick: ee
					}, [B(t, { name: y.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, oi),
					B(h, {
						level: b.value,
						onCycle: S
					}, null, 8, ["level"]),
					B(ct),
					B(lt),
					B(vt, {
						ref_key: "qualityMenuRef",
						ref: ae,
						open: se.value,
						"onUpdate:open": i[1] ||= (e) => se.value = e,
						levels: Y(N).levels.value,
						variants: Y(N).variants.value,
						"current-level": Y(N).currentLevel.value,
						"auto-enabled": Y(N).autoEnabled.value,
						"active-height": Y(N).activeLevelHeight.value,
						onSelect: Ae
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					A.value ? I("", !0) : (G(), L("span", {
						key: 2,
						class: "player__direct-badge",
						title: Y(d)("player.qualityDirectStream")
					}, J(Y(d)("player.directStream")), 9, si)),
					B(Kt, {
						open: bt.value,
						"onUpdate:open": i[2] ||= (e) => bt.value = e,
						tracks: mt.value,
						"audio-tracks": Et.value,
						"active-audio": Dt.value,
						onSelectAudio: zt
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					B(sr, {
						open: Ot.value,
						"onUpdate:open": i[3] ||= (e) => Ot.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					B(br, {
						ref_key: "sleepTimerRef",
						ref: ie,
						"on-expire": bn
					}, null, 512),
					R("button", {
						type: "button",
						class: U(["player__iconbtn player__syncplay", { "is-on": Y(_).isInRoom }]),
						"aria-label": Y(_).isInRoom ? Y(d)("syncplay.inRoom") : Y(d)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[4] ||= (e) => le.value = !0
					}, [B(t, { name: "user" })], 10, ci),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(d)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[5] ||= (e) => D.value = !0
					}, [B(t, { name: "info" })], 8, li),
					re.value ? (G(), L("button", {
						key: 3,
						type: "button",
						class: U(["player__iconbtn", { "is-on": k.value }]),
						"aria-label": k.value ? Y(d)("player.exitPip") : Y(d)("player.pip"),
						"aria-pressed": k.value,
						onClick: Tn
					}, [B(t, { name: "pip" })], 10, ui)) : I("", !0),
					R("button", {
						type: "button",
						class: U(["player__iconbtn", { "is-on": O.value }]),
						"aria-label": O.value ? Y(d)("player.exitTheater") : Y(d)("player.theater"),
						"aria-pressed": O.value,
						onClick: Sn
					}, [B(t, { name: "theater" })], 10, di),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? Y(d)("player.exitFullscreen") : Y(d)("player.fullscreen"),
						onClick: Cn
					}, [B(t, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, fi)
				])
			])),
			Ee.value ? I("", !0) : (G(), F(Hn, {
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
			Ee.value ? I("", !0) : (G(), F(Jn, {
				key: 3,
				position: Y(c).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Pe.value && !Ee.value ? (G(), F(an, {
				key: 4,
				seconds: Me.value,
				onResume: nt,
				onRestart: rt
			}, null, 8, ["seconds"])) : I("", !0),
			Fe.value && $e.value && !Ee.value ? (G(), F(An, {
				key: 5,
				media: $e.value,
				remaining: Ie.value,
				total: Y(8),
				counting: Y(u).autoplay,
				onPlayNow: ut,
				onCancel: ft
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : I("", !0),
			B(r, {
				modelValue: Be.value,
				"onUpdate:modelValue": i[7] ||= (e) => Be.value = e,
				title: `Similar ${Re.value ?? "marker"}s`,
				size: "lg",
				onClose: Qe
			}, {
				default: we(() => [R("div", pi, [He.value ? (G(), L("div", mi, [B(x, { label: "Finding similar media" })])) : Ue.value ? (G(), L("div", hi, [B(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), R("p", gi, J(Ue.value), 1)])) : !He.value && Ve.value.length === 0 ? (G(), L("div", _i, [
					B(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[16] ||= R("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[17] ||= R("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), L("ul", vi, [(G(!0), L(M, null, q(Ve.value, (e) => (G(), L("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [R("div", yi, [e.poster_url ? (G(), L("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, bi)) : (G(), L("div", xi, [B(t, { name: "film" })]))]), R("div", Si, [R("p", Ci, J(e.name), 1), e.year ? (G(), L("p", wi, [z(J(e.year) + " ", 1), e.runtime ? (G(), L("span", Ti, " · " + J(e.runtime) + "m", 1)) : I("", !0)])) : I("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			De.value ? (G(), F(Vn, {
				key: 6,
				title: e.media.name,
				progress: Y(N).progress.value,
				onBack: i[8] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : I("", !0),
			Oe.value ? (G(), F(Fn, {
				key: 7,
				title: e.media.name,
				onBack: i[9] ||= (e) => s("back")
			}, null, 8, ["title"])) : I("", !0),
			Y(_).isInRoom ? (G(), F(Hr, {
				key: 8,
				position: Y(c).position,
				duration: Y(c).duration,
				"is-playing": Y(c).playing,
				onSeek: $,
				onPlay: i[10] ||= (e) => void w.value?.play(),
				onPause: i[11] ||= (e) => void w.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : I("", !0),
			Y(_).isInRoom ? (G(), F(Ar, { key: 9 })) : I("", !0),
			B(_e, {
				modelValue: le.value,
				"onUpdate:modelValue": i[12] ||= (e) => le.value = e
			}, null, 8, ["modelValue"]),
			B(ot, {
				open: D.value,
				onClose: i[13] ||= (e) => D.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-f4c4d917"]]), Di = { class: "player-page__stage" }, Oi = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, ki = { class: "player-page__blocking-error" }, Ai = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = u(), i = d(), a = De(), o = Oe(), s = f(), p = m(), h = K(null), g = K(""), _ = K([]), v = K(null), y = K(null), b = K([]), x = K([]), C = K(!0), w = K(null), oe = K(!1), se = K(null), ce = K(!1), le = K(null), ue = K(null), de = P(() => String(a.params.id ?? ""));
		ee(() => h.value?.name);
		let A = P(() => {
			let e = h.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), j = null, fe = !1;
		function pe(e) {
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
				let t = ne(n.value, {
					genres: [o],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(t, void 0, i?.signal);
				if (a()) return;
				s.setQueue((c.items ?? []).filter((e) => e.id !== r.id).slice(0, 12));
			} catch (e) {
				if (a() || pe(e)) return;
				s.setQueue([]);
			}
		}
		async function _e(e, t, r) {
			let i = ne(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function M(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function N(e, t) {
			le.value = O(e, t), ue.value = k(e, t);
		}
		function V(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function ve(e, n) {
			if (le.value = null, ue.value = null, !(n.type === "episode" || (n.episode_number ?? null) !== null)) return;
			let r = V(n.id);
			if (r) {
				N(r, n.id);
				return;
			}
			let i = j, a = () => fe || i !== j;
			try {
				let r = await M(e, n, i?.signal);
				if (a()) return;
				let o = await _e(e, r.id, i?.signal);
				if (a()) return;
				if (D(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => _e(e, t.id, i?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let c = E(o);
				c.length && t.set(r.id, c), N(c, n.id);
				let l = c.findIndex((e) => e.id === n.id), u = c.slice(l + 1);
				u.length && s.setQueue(u);
			} catch (e) {
				if (a() || pe(e)) return;
				le.value = null, ue.value = null;
			}
		}
		async function H() {
			let e = de.value;
			if (j?.abort(), j = typeof AbortController < "u" ? new AbortController() : null, C.value = !0, w.value = null, _.value = [], v.value = null, y.value = null, b.value = [], x.value = [], le.value = null, ue.value = null, s.hideMiniPlayer(), !e) {
				w.value = "No media id provided", C.value = !1;
				return;
			}
			let t = new l({ baseUrl: n.value });
			t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, j?.signal).then((e) => {
				fe || (_.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), v.value = he(e?.intro_marker), y.value = he(e?.outro_marker), b.value = $(e?.audio_tracks), x.value = Le(e?.subtitle_tracks));
			}).catch(() => null);
			let r = re(e), i = Date.now();
			if (r && ie(r, i)) {
				ye(t, r.item);
				return;
			}
			let a = null;
			try {
				a = (await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, j?.signal)).item;
			} catch (e) {
				if (fe || pe(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						se.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", ce.value = !0, C.value = !1;
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
			if (!fe) {
				if (!a) {
					if (r) {
						ye(t, r.item);
						return;
					}
					w.value = "Failed to load media item", C.value = !1;
					return;
				}
				ae(e, a, i), ye(t, a);
			}
		}
		async function ye(e, t) {
			h.value = t, p.hydrate(t), g.value = me(t), C.value = !1;
			let n = (t.episode_number ?? null) !== null;
			ge(e, t), n && await ve(e, t);
		}
		xe(H), X(de, H), Ee(() => {
			s.current && s.streamUrl && s.showMiniPlayer();
		}), be(() => {
			fe = !0, j?.abort(), j = null;
		});
		function q() {
			o?.back();
		}
		function Se(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ce(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Te(e) {
			oe.value = e;
		}
		function Z() {
			ce.value = !1, q();
		}
		return (e, t) => (G(), L("div", { class: U(["player-page", { "is-theater": oe.value }]) }, [
			A.value && !C.value && !w.value ? (G(), L("div", {
				key: 0,
				class: "player-page__ambient",
				style: W(A.value),
				"aria-hidden": "true"
			}, null, 4)) : I("", !0),
			R("div", Di, [C.value ? (G(), L("div", Oi, [B(te, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : w.value ? (G(), F(T, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: w.value
			}, {
				actions: we(() => [B(S, {
					variant: "solid",
					onClick: H
				}, {
					default: we(() => [...t[1] ||= [z("Retry", -1)]]),
					_: 1
				}), B(S, {
					variant: "ghost",
					onClick: q
				}, {
					default: we(() => [...t[2] ||= [z("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : h.value ? (G(), F(Ei, {
				key: 2,
				media: h.value,
				"stream-url": g.value,
				"stream-url-for": me,
				"api-base": Y(n),
				chapters: _.value,
				"intro-marker": v.value,
				"outro-marker": y.value,
				"playback-audio-tracks": b.value,
				"playback-subtitle-tracks": x.value,
				"prev-episode": le.value,
				"next-episode": ue.value,
				autoplay: !0,
				onBack: q,
				onPlayNext: Se,
				onPlayEpisode: Ce,
				onTheater: Te
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
				modelValue: ce.value,
				"onUpdate:modelValue": t[0] ||= (e) => ce.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: we(() => [B(S, {
					variant: "solid",
					onClick: Z
				}, {
					default: we(() => [...t[3] ||= [z("OK", -1)]]),
					_: 1
				})]),
				default: we(() => [R("p", ki, J(se.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-bc15dbd5"]]);
//#endregion
export { Ai as default };

//# sourceMappingURL=PlayerPage-C0e0Y9Xo.js.map