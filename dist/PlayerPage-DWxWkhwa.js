import { n as e, t } from "./Icon-CIwTuFLd.js";
import { t as n } from "./IconButton-y6A8Bq4D.js";
import { n as r } from "./useFocusTrap-rrmOWOBy.js";
import { a as i } from "./usePreferencesStore-CFPikE8Z.js";
import { t as a } from "./useMessages-CtPA8i1l.js";
import { g as o, h as s, l as c, p as l, t as u } from "./client-BoMeMmx0.js";
import { n as d, r as f } from "./useApiBase-CV_r-Kk4.js";
import { r as p, t as m } from "./useImageSrc-KnN1T9Ga.js";
import { i as h } from "./usePlayerStore-D8A_gb_c.js";
import { t as g } from "./useToastStore-DIWpaCOl.js";
import { n as _, t as v } from "./ThumbRating-CBiAAqLZ.js";
import { a as y, n as b, o as x, r as S, s as C, t as w } from "./shortcuts-Ck2yBFUB.js";
import { t as ee } from "./Spinner-CTxXRV7r.js";
import { t as te } from "./EmptyState-BAyOxAcK.js";
import { t as T } from "./Button-BuG0GvCa.js";
import { i as ne } from "./usePageTitle-BO3GGF3M.js";
import { t as E } from "./Badge-A88fI41k.js";
import { t as D } from "./Slider-DqFxiMp4.js";
import { t as re } from "./Chip-CYhlmz6l.js";
import { t as O } from "./Select-CcWAlng_.js";
import { t as k } from "./Modal-DAhoxqe8.js";
import { t as ie } from "./Skeleton-rHw-IJtl.js";
import { n as A } from "./media-query-DKjhlX8r.js";
import { n as ae, o as oe, r as se, t as ce } from "./episode-order-C2yqgMeX.js";
import { n as le, r as ue, t as de } from "./useMediaItemCache-BKCJnCbr.js";
import { a as fe, c as pe, d as me, f as j, i as he, l as ge, n as _e, o as ve, r as ye, s as be, t as xe, u as Se } from "./captions-DoP7ce5A.js";
import { n as Ce, r as we, t as Te } from "./SyncPlayModal-a3HG-Qv3.js";
import { Fragment as M, Transition as Ee, computed as N, createBlock as P, createCommentVNode as F, createElementBlock as I, createElementVNode as L, createTextVNode as R, createVNode as z, defineComponent as B, inject as De, mergeModels as V, nextTick as Oe, normalizeClass as H, normalizeStyle as U, onBeforeUnmount as ke, onMounted as Ae, onScopeDispose as W, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as je, unref as Y, useModel as Me, watch as X, withCtx as Z, withModifiers as Ne } from "vue";
import { onBeforeRouteLeave as Pe, useRoute as Fe, useRouter as Ie } from "vue-router";
function Le(e, t) {
	if (typeof e != "object" || !e) return null;
	let n = e[t];
	return typeof n == "string" && n !== "" ? n : null;
}
function Re(e, t) {
	let n = Le(e, "code");
	if (n !== null && s(n)) return l(n, t);
	let r = Le(e, "error");
	return r === "AccessScheduled" ? "Playback blocked by access schedule. Try again during allowed hours." : r === "StreamLimitExceeded" ? "Stream limit reached. Stop another stream to continue watching." : null;
}
//#endregion
//#region src/components/player/format-time.ts
function ze(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Be = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Ve = { class: "scrubber__track" }, He = ["title"], Ue = { class: "scrubber__time numeric" }, We = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { t: r } = a(), i = e, o = n, s = K(null), c = K(!1), l = K(!1), u = K(0), d = K(0), f = (e) => Math.min(1, Math.max(0, e)), p = N(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = N(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = N(() => (c.value || l.value) && i.duration > 0), g = N(() => c.value ? u.value : d.value), _ = N(() => g.value * i.duration), v = N(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = N(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = N(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), x = N(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
		}), (t, n) => (G(), I("div", {
			ref_key: "trackEl",
			ref: s,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": Y(ze)(e.position),
			"aria-label": Y(r)("player.seek"),
			onPointerdown: C,
			onPointermove: w,
			onPointerup: ee,
			onPointercancel: ee,
			onPointerenter: te,
			onPointerleave: T,
			onKeydown: ne
		}, [L("div", Ve, [
			L("div", {
				class: "scrubber__buffered",
				style: U({ transform: `scaleX(${m.value})` })
			}, null, 4),
			L("div", {
				class: "scrubber__played",
				style: U({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(G(!0), I(M, null, q(x.value, (e, t) => (G(), I("span", {
				key: t,
				class: "scrubber__tick",
				style: U({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, He))), 128)),
			L("div", {
				class: H(["scrubber__head", { "is-dragging": c.value }]),
				style: U({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (G(), I("div", {
			key: 0,
			class: "scrubber__preview",
			style: U({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (G(), I("div", {
			key: 0,
			class: "scrubber__thumb",
			style: U({ backgroundImage: y.value })
		}, null, 4)) : F("", !0), L("span", Ue, J(Y(ze)(_.value)), 1)], 4)) : F("", !0)], 40, Be));
	}
}), [["__scopeId", "data-v-3d610715"]]), Ge = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Q(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Ke(e) {
	return e === !0 || e === "true" || e === 1;
}
function qe(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Je(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Q(e.url ?? e.src);
		r !== "" && t.push({
			index: qe(e.index),
			language: Q(e.language ?? e.lang ?? e.srclang),
			label: Q(e.label),
			default: Ke(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Ye(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = qe(e.height);
		r <= 0 || t.push({
			id: Q(e.id),
			label: Q(e.label),
			height: r,
			width: qe(e.width),
			bitrate: qe(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Xe(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var Ze = .7, Qe = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], $e = 1e7, et = "mobile-low";
function tt(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * Ze;
}
function nt(e) {
	let t = tt(e);
	if (t === void 0 || t >= $e) return;
	let n = et;
	for (let [e, r] of Qe) r <= t && (n = e);
	return n;
}
function rt(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function it(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		masterUrl: Q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Q(t.status, "running"),
		reused: Ke(t.reused),
		subtitles: Je(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ye(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function at(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		status: Q(t.status, "running"),
		playlistReady: Ke(t.playlist_ready ?? t.playlistReady),
		progress: qe(t.progress),
		masterUrl: Q(t.master_url ?? t.masterUrl),
		subtitles: Je(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ye(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function ot(e) {
	return e.playlistReady || e.status === "completed";
}
function st(e) {
	return Ge.has(e);
}
function ct(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function lt(e) {
	let t = K("idle"), n = K(0), r = K([]), i = K([]), a = K(-1), o = K(!0), s = K(null), c = K(null), l = K([]), d = K(-1), f = K(null), p = K(null);
	function m(e) {
		if (!E) return;
		i.value = E.levels, a.value = E.getCurrentLevel(), o.value = E.autoLevelEnabled;
		let t = e ?? E.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function g() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function _(e) {
		E && (l.value = E.audioTracks, d.value = e ?? E.getCurrentAudioTrack());
	}
	function v() {
		l.value = [], d.value = -1;
	}
	function y(e) {
		!e || e.length === 0 || (c.value = e);
	}
	function b(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: ct(n, e.url)
		}));
	}
	let x = e.attach ?? C, S = e.pollIntervalMs ?? 1e3, w = e.maxWaitMs ?? 12e4, ee = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), te = Math.max(1, Math.ceil(w / Math.max(1, S))), T = ut(), ne = e.getToken ?? (() => dt(T)), E = null, D = null, re = null, O = !1, k = null, ie = 0;
	function A() {
		return e.client ?? new u({
			baseUrl: e.apiBase(),
			tokenStore: T ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function ae(i, a, o, s) {
		ue(), O = !1;
		let c = ++ie, l = () => O || c !== ie;
		k = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = A(), c = it(await r.post(Xe(a, o), void 0, k.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			b(c.subtitles), y(c.variants), f.value = c.jobId, p.value = ct(e.apiBase(), c.masterUrl);
			let u = c.status === "completed";
			for (let e = 0; !u && e < te; e++) {
				let e = at(await r.get(rt(c.jobId), void 0, k.signal));
				if (l()) return;
				if (n.value = e.progress, b(e.subtitles), y(e.variants), st(e.status)) throw Error(`transcode ${e.status}`);
				if (ot(e)) {
					u = !0;
					break;
				}
				if (await ee(S), l()) return;
			}
			if (!u) throw Error("transcode timed out");
			let d = await x(i, p.value, {
				getToken: ne,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => m(),
				onError: () => {
					l() || (t.value = "error");
				}
			});
			if (l()) {
				try {
					d.destroy();
				} catch {}
				return;
			}
			E = d, D = E.onLevelSwitched((e) => m(e)), re = E.onAudioTrackSwitched((e) => _(e)), m(), _();
			try {
				let e = h();
				e.hlsMasterUrl = p.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function oe(e) {
		E && (E.setCurrentLevel(e === "auto" ? -1 : e), m());
	}
	function se(e) {
		E && (E.setNextLevel(e === "auto" ? -1 : e), m());
	}
	function ce(e) {
		E && (E.setAudioTrack(e), _());
	}
	function le(e) {
		if (!E || !p.value) return;
		let t = p.value.replace("master.m3u8", `media_v${e}.m3u8`);
		E.loadSource(t), g();
	}
	function ue() {
		if (O = !0, k &&= (k.abort(), null), D) {
			try {
				D();
			} catch {}
			D = null;
		}
		if (re) {
			try {
				re();
			} catch {}
			re = null;
		}
		if (E) {
			try {
				E.destroy();
			} catch {}
			E = null;
		}
		f.value = null, p.value = null;
	}
	function de() {
		ue(), t.value = "idle", n.value = 0, r.value = [], g(), v();
		try {
			h().hlsMasterUrl = "";
		} catch {}
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
		audioTracks: l,
		currentAudioTrack: d,
		setLevel: oe,
		setNextLevel: se,
		setAudioTrack: ce,
		jobId: f,
		masterUrl: p,
		loadVariantPlaylist: le,
		start: ae,
		cleanup: ue,
		reset: de
	};
}
function ut() {
	try {
		return new c();
	} catch {
		return null;
	}
}
function dt(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var ft = 10;
function pt(e) {
	let t = K(null), n = K(!1), r = K(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new u({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % ft, s = Math.floor(i / ft), c = a / 9 * 100, l = s / 5 * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function c(o, s) {
		if (i.has(o) && (t.value = i.get(o) ?? null, t.value !== null)) return;
		let c = s ?? e.signal;
		if (!c?.aborted) {
			n.value = !0, r.value = null;
			try {
				let e = await a().getTrickplay(o, c);
				i.set(o, e), t.value = e;
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				i.set(o, null), r.value = e instanceof Error ? e.message : "Failed to load trickplay data", t.value = null;
			} finally {
				n.value = !1;
			}
		}
	}
	function l() {
		t.value = null, n.value = !1, r.value = null, i.clear();
	}
	return {
		data: t,
		loading: n,
		error: r,
		thumbnailAt: s,
		fetch: c,
		reset: l
	};
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var mt = ["aria-label"], ht = { class: "shortcuts__head" }, gt = { class: "shortcuts__title" }, _t = { class: "shortcuts__grid" }, vt = { class: "shortcuts__keys" }, yt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, bt = {
	key: 1,
	class: "shortcuts__key"
}, xt = { class: "shortcuts__label" }, St = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => S }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = K(null);
		return r(l, je(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (G(), I("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= Ne((e) => s("close"), ["self"])
		}, [L("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [L("div", ht, [L("h3", gt, J(Y(c)("player.keyboard")), 1), z(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), L("ul", _t, [(G(!0), I(M, null, q(e.shortcuts, (e) => (G(), I("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [L("span", vt, [(G(!0), I(M, null, q(e.keys, (e, n) => (G(), I(M, { key: n }, [e === "–" ? (G(), I("span", yt, "–")) : (G(), I("kbd", bt, [Y(w)[e] ? (G(), P(t, {
			key: 0,
			name: Y(w)[e],
			label: Y(b)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), I(M, { key: 1 }, [R(J(e), 1)], 64))]))], 64))), 128))]), L("span", xt, J(e.label), 1)]))), 128))])], 8, mt)])) : F("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Ct = { class: "volume" }, wt = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "VolumeControl",
	setup(e) {
		let t = h(), r = i(), { t: o } = a(), s = N(() => t.muted ? 0 : t.volume), c = N(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return X(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (G(), I("div", Ct, [z(n, {
			name: c.value,
			label: Y(t).muted ? Y(o)("player.unmute") : Y(o)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: r[0] ||= (e) => Y(t).toggleMute()
		}, null, 8, ["name", "label"]), z(D, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), Tt = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		], n = h(), { t: r } = a(), i = N(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function o(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), P(O, {
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
}), [["__scopeId", "data-v-4530b308"]]), Et = "auto", Dt = "original";
function Ot(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function kt(e) {
	return e >= 2160 ? "4K" : Ot(e);
}
function At(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Ot(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: kt(r.height)
		}));
	}
	return n;
}
function jt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Ot(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Mt(e, t) {
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
function Nt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Pt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && Mt(e, n) >= 0;
}
function Ft(e, t) {
	if (t < 0) return Et;
	let n = e.find((e) => e.index === t);
	return n ? Ot(n.height) : Et;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var It = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let r = e, o = Me(e, "open"), s = K(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = h(), d = i(), { t: f } = a(), p = N(() => At(r.levels)), m = N(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = p.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = Ot(i.height);
				e.has(a) || n && jt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: kt(i.height)
				}));
			}
			return t;
		}), g = N(() => p.value.length >= 2 ? p.value : m.value), _ = N(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = N(() => Mt(r.levels, _.value)), y = N(() => _.value && v.value >= 0 ? {
			value: Dt,
			label: f("player.qualityOriginal", { height: _.value.height })
		} : null), b = N(() => g.value.length >= 2), x = N(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: kt(r.activeHeight) })), S = N(() => [
			{
				value: Et,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), C = N(() => r.autoEnabled ? Et : y.value && r.currentLevel === v.value && (u.quality === "original" || d.defaultQuality === "original") ? Dt : Ft(r.levels, r.currentLevel));
		function w(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), d.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : jt(r.levels, t);
			u.setQuality(t), d.defaultQuality = t, n >= 0 ? l("select", n) : l("select", t);
		}
		return t({ toggleMenu: c }), (e, t) => b.value || o.value ? (G(), P(O, {
			key: 0,
			ref_key: "selectRef",
			ref: s,
			class: "quality-menu",
			tone: "glass",
			"model-value": C.value,
			options: S.value,
			label: Y(f)("player.quality"),
			open: o.value,
			"onUpdate:open": t[0] ||= (e) => o.value = e,
			"onUpdate:modelValue": w
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), Lt = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = K(0), a = N(() => n.lifted ? i.value : 0), o = N(() => ({
			...pe(n.styleConfig),
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
		X(() => n.controlsRoot, u, { immediate: !0 }), ke(l);
		let d = null, f = null, p = null;
		function m() {
			r.value = me(d);
		}
		function h() {
			p != null && (clearTimeout(p), p = null);
		}
		function g() {
			h(), p = setTimeout(() => {
				if (p = null, !d) return;
				be(n.video, n.language);
				let e = me(d);
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
			_(), be(n.video, n.language);
			let e = j(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = me(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return X(() => [n.video, n.language], y, { immediate: !0 }), ke(_), t({ lines: r }), (t, n) => r.value.length ? (G(), I("div", {
			key: 0,
			class: H(["player__captions", { "is-lifted": e.lifted }]),
			style: U(o.value)
		}, [(G(!0), I(M, null, q(r.value, (e, t) => (G(), I("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : F("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), Rt = ["aria-label", "aria-expanded"], zt = ["aria-label"], Bt = { class: "capmenu__head" }, Vt = { class: "capmenu__title" }, Ht = ["aria-label"], Ut = ["aria-checked", "tabindex"], Wt = { class: "capmenu__check" }, Gt = { class: "capmenu__optlabel" }, Kt = [
	"aria-checked",
	"tabindex",
	"onClick"
], qt = { class: "capmenu__check" }, Jt = { class: "capmenu__optlabel" }, Yt = { class: "capmenu__check" }, Xt = { class: "capmenu__optlabel" }, Zt = { class: "capmenu__title capmenu__title--sub" }, Qt = ["aria-label"], $t = [
	"aria-checked",
	"tabindex",
	"onClick"
], en = { class: "capmenu__check" }, tn = { class: "capmenu__optlabel" }, nn = { class: "capmenu__title capmenu__title--sub" }, rn = { class: "capmenu__style" }, an = { class: "capmenu__field" }, on = { class: "capmenu__fieldlabel" }, sn = { class: "capmenu__field" }, cn = { class: "capmenu__fieldlabel" }, ln = { class: "capmenu__field" }, un = { class: "capmenu__fieldlabel" }, dn = { class: "capmenu__field" }, fn = { class: "capmenu__fieldlabel" }, pn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let s = e, c = o, l = h(), u = i(), { t: d } = a(), f = K(null), p = K(null), m = N(() => l.subtitleLang), g = N(() => s.tracks.some((e) => e.language === m.value)), _ = N(() => g.value ? "captions" : "captions-off"), v = N(() => g.value ? s.tracks.findIndex((e) => e.language === m.value) + 1 : 0), y = N(() => s.activeAudio >= 0 ? s.activeAudio : 0);
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
		function re(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		r(p, je(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function k(e) {
			f.value && !f.value.contains(e.target) && x();
		}
		return X(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", k, !0) : document.removeEventListener("pointerdown", k, !0));
		}, { immediate: !0 }), ke(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", k, !0);
		}), (r, i) => (G(), I("div", {
			ref_key: "rootEl",
			ref: f,
			class: "capmenu"
		}, [L("button", {
			type: "button",
			class: H(["capmenu__btn", { "is-active": g.value }]),
			"aria-label": g.value ? Y(d)("player.captionsOn") : Y(d)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: i[0] ||= (t) => b(!e.open)
		}, [z(t, { name: _.value }, null, 8, ["name"])], 10, Rt), e.open ? (G(), I("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			L("div", Bt, [L("h3", Vt, J(Y(d)("player.subtitles")), 1), z(n, {
				name: "x",
				label: Y(d)("common.close"),
				size: "sm",
				onClick: x
			}, null, 8, ["label"])]),
			L("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(d)("player.subtitleTrack"),
				onKeydown: te
			}, [L("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !g.value,
				tabindex: v.value === 0 ? 0 : -1,
				onClick: i[1] ||= (e) => S(null)
			}, [L("span", Wt, [g.value ? F("", !0) : (G(), P(t, {
				key: 0,
				name: "check"
			}))]), L("span", Gt, J(Y(d)("player.off")), 1)], 8, Ut), (G(!0), I(M, null, q(e.tracks, (e, n) => (G(), I("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": m.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [L("span", qt, [m.value === e.language ? (G(), P(t, {
				key: 0,
				name: "check"
			})) : F("", !0)]), L("span", Jt, J(e.label), 1)], 8, Kt))), 128))], 40, Ht),
			L("button", {
				type: "button",
				class: "capmenu__add",
				onClick: w
			}, [L("span", Yt, [z(t, { name: "plus" })]), L("span", Xt, J(Y(d)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (G(), I(M, { key: 0 }, [L("h3", Zt, J(Y(d)("player.audio")), 1), L("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(d)("player.audioTrack"),
				onKeydown: T
			}, [(G(!0), I(M, null, q(e.audioTracks, (n) => (G(), I("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: y.value === n.index ? 0 : -1,
				onClick: (e) => C(n.index)
			}, [L("span", en, [e.activeAudio === n.index ? (G(), P(t, {
				key: 0,
				name: "check"
			})) : F("", !0)]), L("span", tn, J(n.label), 1)], 8, $t))), 128))], 40, Qt)], 64)) : F("", !0),
			L("h3", nn, J(Y(d)("player.captionStyle")), 1),
			L("div", rn, [
				L("div", an, [L("span", on, J(Y(d)("player.size")), 1), z(O, {
					"model-value": Y(u).captionStyle.size,
					options: Y(he),
					label: Y(d)("player.captionSize"),
					"onUpdate:modelValue": ne
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", sn, [L("span", cn, J(Y(d)("player.color")), 1), z(O, {
					"model-value": Y(u).captionStyle.textColor,
					options: Y(_e),
					label: Y(d)("player.captionColor"),
					"onUpdate:modelValue": E
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", ln, [L("span", un, J(Y(d)("player.background")), 1), z(O, {
					"model-value": Y(u).captionStyle.background,
					options: Y(xe),
					label: Y(d)("player.captionBackground"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", dn, [L("span", fn, J(Y(d)("player.edge")), 1), z(O, {
					"model-value": Y(u).captionStyle.edge,
					options: Y(ye),
					label: Y(d)("player.captionEdge"),
					"onUpdate:modelValue": re
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, zt)) : F("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), mn = { class: "subsearch" }, hn = { class: "subsearch__langs" }, gn = { class: "subsearch__legend" }, _n = { class: "subsearch__chips" }, vn = { class: "subsearch__actions" }, yn = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, bn = {
	key: 2,
	class: "subsearch__prompt"
}, xn = {
	key: 3,
	class: "subsearch__list"
}, Sn = { class: "subsearch__meta" }, Cn = { class: "subsearch__release" }, wn = { class: "subsearch__signals" }, Tn = { class: "subsearch__provider" }, En = ["aria-label"], Dn = {
	key: 2,
	class: "subsearch__stat"
}, On = {
	key: 3,
	class: "subsearch__stat"
}, kn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let r = e, i = n, { t: s } = a(), c = g(), l = [
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
			for (let n of [...r.preferredLangs, ...l]) {
				let r = (n || "").toLowerCase();
				!r || e.has(r) || (e.add(r), t.push(r));
			}
			return t;
		}), p = K(/* @__PURE__ */ new Set());
		function m() {
			let e = /* @__PURE__ */ new Set();
			for (let t of r.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), p.value = e;
		}
		function h(e) {
			let t = new Set(p.value);
			t.has(e) ? t.delete(e) : t.add(e), p.value = t;
		}
		let _ = K(!1), v = K(!1), y = K([]), b = K(/* @__PURE__ */ new Set()), x = K(/* @__PURE__ */ new Set());
		function S(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let C = N(() => [...y.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), w = N(() => p.value.size > 0 && !_.value);
		function ne() {
			return r.client ?? new u({ baseUrl: r.apiBase ?? "" });
		}
		async function D() {
			if (w.value) {
				_.value = !0, v.value = !0;
				try {
					y.value = await ne().searchSubtitles(r.mediaId, [...p.value]);
				} catch {
					y.value = [], c.error(s("player.subtitleSearchError"));
				} finally {
					_.value = !1;
				}
			}
		}
		function O() {
			i("update:open", !1);
		}
		function ie(e) {
			if (e instanceof o) {
				if (e.status === 429) {
					let t = e.body && typeof e.body == "object" ? e.body : {}, n = typeof t.downloadsRemaining == "number" ? t.downloadsRemaining : null, r = typeof t.resetTimeUtc == "string" ? t.resetTimeUtc : null;
					r ? c.warning(s("player.subtitleQuotaReset", { time: A(r) })) : n === null ? c.warning(s("player.subtitleQuota")) : c.warning(s("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (e.status === 404) {
					c.error(s("player.subtitleAddNotFound"));
					return;
				}
			}
			c.error(s("player.subtitleAddError"));
		}
		function A(e) {
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
				let n = Je([(await ne().downloadSubtitle(r.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], a = new Set(x.value);
				a.add(t), x.value = a;
				let o = d(e.language);
				c.success(o ? s("player.subtitleAdded", { language: o }) : s("player.subtitleAddedGeneric")), n && i("added", n);
			} catch (e) {
				ie(e);
			} finally {
				let e = new Set(b.value);
				e.delete(t), b.value = e;
			}
		}
		return X(() => r.open, (e) => {
			e && (m(), y.value = [], v.value = !1, _.value = !1, b.value = /* @__PURE__ */ new Set(), x.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (n, r) => (G(), P(k, {
			"model-value": e.open,
			title: Y(s)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => i("update:open", e)
		}, {
			footer: Z(() => [z(T, {
				variant: "ghost",
				onClick: O
			}, {
				default: Z(() => [R(J(Y(s)("common.close")), 1)]),
				_: 1
			})]),
			default: Z(() => [L("div", mn, [
				L("fieldset", hn, [L("legend", gn, J(Y(s)("player.subtitleSearchLanguages")), 1), L("div", _n, [(G(!0), I(M, null, q(f.value, (e) => (G(), P(re, {
					key: e,
					selected: p.value.has(e),
					size: "md",
					"aria-label": d(e),
					"onUpdate:selected": (t) => h(e)
				}, {
					default: Z(() => [R(J(d(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				L("div", vn, [z(T, {
					variant: "solid",
					"left-icon": "search",
					loading: _.value,
					disabled: !w.value,
					onClick: D
				}, {
					default: Z(() => [R(J(Y(s)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				_.value ? (G(), I("div", yn, [z(ee, { label: Y(s)("player.subtitleSearching") }, null, 8, ["label"]), L("span", null, J(Y(s)("player.subtitleSearching")), 1)])) : v.value && C.value.length === 0 ? (G(), P(te, {
					key: 1,
					icon: "captions",
					title: Y(s)("player.subtitleSearchEmpty"),
					description: Y(s)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : v.value ? (G(), I("ul", xn, [(G(!0), I(M, null, q(C.value, (e) => (G(), I("li", {
					key: S(e),
					class: "subsearch__item"
				}, [L("div", Sn, [L("p", Cn, J(e.releaseName || e.provider), 1), L("div", wn, [
					z(E, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Z(() => [R(J(d(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (G(), P(E, {
						key: 0,
						tone: "info",
						size: "sm",
						label: Y(s)("player.subtitleHearingImpairedFull")
					}, {
						default: Z(() => [R(J(Y(s)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : F("", !0),
					L("span", Tn, J(e.provider), 1),
					e.rating > 0 ? (G(), I("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": Y(s)("player.subtitleRating", { rating: e.rating })
					}, [z(t, { name: "star" }), R(" " + J(e.rating), 1)], 8, En)) : F("", !0),
					e.downloadCount > 0 ? (G(), I("span", Dn, J(Y(s)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : F("", !0),
					e.fps ? (G(), I("span", On, J(Y(s)("player.subtitleFps", { fps: e.fps })), 1)) : F("", !0)
				])]), z(T, {
					variant: "outline",
					size: "sm",
					"left-icon": x.value.has(S(e)) ? "check" : "plus",
					loading: b.value.has(S(e)),
					disabled: b.value.has(S(e)) || x.value.has(S(e)),
					"aria-label": Y(s)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => ae(e)
				}, {
					default: Z(() => [R(J(b.value.has(S(e)) ? Y(s)("player.subtitleAdding") : Y(s)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (G(), I("p", bn, J(Y(s)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), An = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function jn(e, t, n, r, i, a, o) {
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
		r: An(d / m),
		g: An(f / m),
		b: An(p / m)
	};
}
function Mn(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: jn(e, t, n, 0, 0, r, n),
		right: jn(e, t, n, t - r, 0, t, n),
		center: jn(e, t, n, 0, 0, t, n)
	};
}
function Nn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Pn(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Nn(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Nn(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Nn(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function $(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Fn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
			r.value = $(i);
		}
		let o = N(() => n.enabled && !n.reducedMotion && !r.value), s = N(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = K(null), l = null, u = null, d = !1, f = !1;
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
				c.value = Pn(Mn(n, 32, 18));
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
		}, { immediate: !0 }), Ae(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ke(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let ee = N(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (G(), I("div", {
			class: H(["player__ambient", { "is-active": o.value }]),
			style: U(o.value ? ee.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), In = ["aria-label"], Ln = { class: "resume__label" }, Rn = { class: "resume__time numeric" }, zn = { class: "resume__actions" }, Bn = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = N(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (G(), I("div", {
			class: "resume",
			role: "region",
			"aria-label": Y(i)("player.resumePlayback")
		}, [L("p", Ln, [
			R(J(o.value[0]), 1),
			L("span", Rn, J(Y(ze)(e.seconds)), 1),
			R(J(o.value[1]), 1)
		]), L("div", zn, [L("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [z(t, { name: "play" }), L("span", null, J(Y(i)("player.resume")), 1)]), L("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [z(t, { name: "rewind" }), L("span", null, J(Y(i)("player.startOver")), 1)])])], 8, In));
	}
}), [["__scopeId", "data-v-271c5209"]]), Vn = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Hn = /* @__PURE__ */ new Set([
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
function Un(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Wn(...e) {
	return e.some((e) => Hn.has(Un(e)));
}
function Gn(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Kn(e) {
	return e?.error?.code === 2;
}
var qn = 3e4;
function Jn(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && tr.get(t) === "hevc";
}
function Yn(e) {
	let t = { forceTranscode: "1" };
	return Jn(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function Xn(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
function Zn(e) {
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
var Qn = 2 * Math.PI * 15;
function $n(e, t, n = Qn) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var er = /* @__PURE__ */ new Map([
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
]), tr = /* @__PURE__ */ new Map([
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
]), nr = /* @__PURE__ */ new Set(["h264"]), rr = /* @__PURE__ */ new Map([
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
function ir(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = tr.get(t);
	return n === void 0 ? "transcode" : nr.has(n) ? "direct" : "probe";
}
function ar(e) {
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
var or = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function sr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return or.get(t) ?? "video/mp4";
}
function cr(e, t = "video/mp4") {
	let n = er.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function lr(e, t = "video/mp4") {
	if (!e) return !0;
	let n = cr(e, t);
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
async function ur(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = tr.get(n), i = r === void 0 ? void 0 : rr.get(r);
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
async function dr(e, t, n = "") {
	if (Wn(...e)) return !0;
	let r = e.map((e) => Un(e)).find((e) => Vn.includes(e)) ?? "";
	if (!Vn.includes(r)) return !1;
	let i = sr(r), a = ir(n);
	if (a === "transcode" || a === "probe" && !await ur(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await lr(e.codec, i)) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var fr = ["aria-label"], pr = ["src"], mr = { class: "upnext__body" }, hr = { class: "upnext__eyebrow" }, gr = { class: "upnext__title" }, _r = {
	key: 0,
	class: "upnext__cd numeric"
}, vr = { class: "upnext__actions" }, yr = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, br = ["r"], xr = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Sr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { t: r } = a(), { imgSrc: i } = m(), o = e, s = n, c = N(() => o.posterUrl ?? o.media.poster_url ?? null), l = N(() => $n(o.remaining, o.total));
		return (n, a) => (G(), I("aside", {
			class: "upnext",
			role: "region",
			"aria-label": Y(r)("player.upNext")
		}, [
			c.value ? (G(), I("img", {
				key: 0,
				class: "upnext__thumb",
				src: Y(i)(c.value),
				alt: "",
				loading: "lazy"
			}, null, 8, pr)) : F("", !0),
			L("div", mr, [
				L("p", hr, J(Y(r)("player.upNext")), 1),
				L("h4", gr, J(e.media.name), 1),
				e.counting ? (G(), I("p", _r, J(Y(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : F("", !0),
				L("div", vr, [L("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: a[0] ||= (e) => s("play-now")
				}, [z(t, { name: "play" }), L("span", null, J(Y(r)("player.playNow")), 1)]), L("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: a[1] ||= (e) => s("cancel")
				}, J(Y(r)("player.cancel")), 1)])
			]),
			e.counting ? (G(), I("svg", yr, [L("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, br), L("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Y(Qn),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, xr)])) : F("", !0)
		], 8, fr));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), Cr = {
	class: "transcode",
	role: "alert"
}, wr = { class: "transcode__card" }, Tr = { class: "transcode__heading" }, Er = { class: "transcode__body" }, Dr = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (G(), I("div", Cr, [L("div", wr, [
			z(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			L("h3", Tr, J(Y(i)("player.transcodeHeading")), 1),
			L("p", Er, J(e.title ? Y(i)("player.transcodeBodyTitled", { title: e.title }) : Y(i)("player.transcodeBodyUntitled")), 1),
			L("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [z(t, { name: "arrow-left" }), L("span", null, J(Y(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Or = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, kr = { class: "prep__card" }, Ar = { class: "prep__heading" }, jr = { class: "prep__body" }, Mr = ["aria-valuenow"], Nr = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (G(), I("div", Or, [L("div", kr, [
			z(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			L("h3", Ar, J(Y(r)("player.transcodePreparingHeading")), 1),
			L("p", jr, J(e.title ? Y(r)("player.transcodePreparingTitled", { title: e.title }) : Y(r)("player.transcodePreparingUntitled")), 1),
			L("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [L("div", {
				class: "prep__bar-fill",
				style: U({ width: i() + "%" })
			}, null, 4)], 8, Mr),
			L("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [z(t, { name: "arrow-left" }), L("span", null, J(Y(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Pr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		return (e, n) => (G(), P(Ee, { name: "skip" }, {
			default: Z(() => [c.value ? (G(), I("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ne(l, ["stop"])
			}, [L("span", null, J(c.value.label), 1), z(t, { name: "skip-forward" })])) : F("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Fr = ["aria-label"], Ir = ["aria-label", "onClick"], Lr = { class: "skip-controls__label" }, Rr = 5, zr = 30, Br = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
			let n = s(e.startMs), r = n - Rr, i = n + zr;
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
		return (e, n) => f.value.length > 0 ? (G(), I("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": Y(o)("player.skipControls")
		}, [(G(!0), I(M, null, q(f.value, (e) => (G(), I("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: Ne((t) => p(e), ["stop"])
		}, [L("span", Lr, J(d(e.type)), 1), z(t, { name: "skip-forward" })], 8, Ir))), 128))], 8, Fr)) : F("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Vr = ["aria-label", "aria-expanded"], Hr = ["aria-label"], Ur = { class: "chapterlist__head" }, Wr = { class: "chapterlist__title" }, Gr = ["aria-label"], Kr = ["onClick"], qr = { class: "chapterlist__index" }, Jr = { class: "chapterlist__name" }, Yr = { class: "chapterlist__meta" }, Xr = { class: "chapterlist__time" }, Zr = {
	key: 0,
	class: "chapterlist__duration"
}, Qr = {
	key: 1,
	class: "chapterlist__empty"
}, $r = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = ze(e.start), a;
			return e.end != null && e.end > e.start && (a = ze(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = K(null), p = K(null);
		r(p, je(o, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		X(() => o.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), ke(() => {
			document.removeEventListener("pointerdown", m, !0);
		});
		function h(e) {
			s("seek", e.start), l();
		}
		return (r, i) => (G(), I("div", {
			ref_key: "rootEl",
			ref: f,
			class: "chapterlist"
		}, [L("button", {
			type: "button",
			class: H(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": Y(c)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: u
		}, [z(t, { name: "list" })], 10, Vr), e.open ? (G(), I("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(c)("player.chapterList"),
			tabindex: "-1"
		}, [L("div", Ur, [L("h3", Wr, J(Y(c)("player.chapters")), 1), z(n, {
			name: "x",
			label: Y(c)("common.close"),
			size: "sm",
			onClick: l
		}, null, 8, ["label"])]), d.value.length > 0 ? (G(), I("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": Y(c)("player.chapterList")
		}, [(G(!0), I(M, null, q(d.value, (e) => (G(), I("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [L("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => h(e.chapter)
		}, [
			L("span", qr, J(e.index), 1),
			L("span", Jr, J(e.label), 1),
			L("span", Yr, [L("span", Xr, J(e.startLabel), 1), e.durationLabel ? (G(), I("span", Zr, "· " + J(e.durationLabel), 1)) : F("", !0)])
		], 8, Kr)]))), 128))], 8, Gr)) : (G(), I("p", Qr, J(Y(c)("player.noChapters")), 1))], 8, Hr)) : F("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ei = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, ti = { class: "marker-timeline__ticks" }, ni = [
	"title",
	"aria-label",
	"onClick"
], ri = { class: "marker-timeline__tooltip" }, ii = { class: "marker-timeline__tooltip-label" }, ai = { class: "marker-timeline__tooltip-time numeric" }, oi = ["onClick"], si = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		return (e, t) => s.value.length > 0 ? (G(), I("div", {
			key: 0,
			class: H(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (G(), I("div", ei, [t[0] ||= L("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [L("polygon", { points: "5,3 19,12 5,21" })], -1), R(" " + J(u.value), 1)])) : F("", !0), L("div", ti, [(G(!0), I(M, null, q(s.value, (e) => (G(), I("button", {
			key: e.id,
			type: "button",
			class: H(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: U({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Y(ze)(e.startSec)}`,
			"aria-label": `${e.label} at ${Y(ze)(e.startSec)}`,
			onClick: Ne((t) => d(e), ["stop"])
		}, [L("span", ri, [
			L("span", ii, J(e.label), 1),
			L("span", ai, J(Y(ze)(e.startSec)), 1),
			L("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ne((t) => f(e), ["stop"])
			}, " Find similar ", 8, oi)
		])], 14, ni))), 128))])], 2)) : F("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), ci = ["aria-label", "aria-expanded"], li = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, ui = ["aria-label"], di = ["aria-selected", "onClick"], fi = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		], s = K(0), c = K(0), l = N(() => c.value > 0), u;
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
		return ke(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (G(), I("div", { class: H(["sleep-timer", { "is-active": l.value }]) }, [L("button", {
			type: "button",
			class: H(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : Y(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [z(t, { name: "moon" }), l.value ? (G(), I("span", li, J(m(c.value)), 1)) : F("", !0)], 10, ci), z(Ee, { name: "dropdown" }, {
			default: Z(() => [h.value ? (G(), I("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": Y(i)("player.sleepTimer")
			}, [(G(), I(M, null, q(o, (e) => L("li", {
				key: e.value,
				class: H(["sleep-timer__option", { "is-selected": s.value === e.value }]),
				role: "option",
				"aria-selected": s.value === e.value,
				onClick: (t) => _(e.value)
			}, J(e.label), 11, di)), 64))], 8, ui)) : F("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), pi = {
	key: 0,
	class: "syncplay-overlay"
}, mi = { class: "syncplay-overlay__badge" }, hi = { class: "syncplay-overlay__label" }, gi = { class: "syncplay-overlay__status-label" }, _i = { class: "syncplay-overlay__members" }, vi = { class: "syncplay-overlay__member-count" }, yi = { class: "syncplay-overlay__member-list" }, bi = { class: "syncplay-overlay__member-name" }, xi = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Si = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = a(), i = Ce(), o = d(), s = N(() => n.apiBase ?? o.value), c = N(() => i.currentRoom?.name ?? "SyncPlay"), l = N(() => i.onlineMembers.length), u = N(() => i.syncStatus), f = N(() => {
			switch (u.value) {
				case "synced": return r("syncplay.synced");
				case "outOfSync": return r("syncplay.outOfSync");
				case "re-syncing": return r("syncplay.reSyncing");
				default: return r("syncplay.synced");
			}
		}), p = N(() => {
			switch (u.value) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		});
		async function m() {
			await i.leaveRoom(s.value);
		}
		return (e, n) => Y(i).isInRoom ? (G(), I("div", pi, [
			L("div", mi, [z(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), L("span", hi, "SyncPlay: " + J(c.value), 1)]),
			L("div", { class: H(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [z(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), L("span", gi, J(f.value), 1)], 2),
			L("div", _i, [L("span", vi, [z(t, { name: "user" }), R(" " + J(Y(r)("syncplay.members", { count: l.value })), 1)]), L("ul", yi, [(G(!0), I(M, null, q(Y(i).onlineMembers.slice(0, 5), (e) => (G(), I("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= L("span", { class: "syncplay-overlay__member-dot" }, null, -1), L("span", bi, J(e.name), 1)]))), 128)), Y(i).onlineMembers.length > 5 ? (G(), I("li", xi, " +" + J(Y(i).onlineMembers.length - 5) + " more ", 1)) : F("", !0)])]),
			z(T, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: Z(() => [R(J(Y(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), Ci = {
	key: 0,
	class: "syncplay-controls"
}, wi = ["aria-label"], Ti = { class: "syncplay-controls__wait-label" }, Ei = { class: "syncplay-controls__transport" }, Di = ["aria-label"], Oi = ["aria-label"], ki = ["aria-label"], Ai = { class: "syncplay-controls__status-label" }, ji = 10, Mi = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let r = e, i = n, { t: o } = a(), s = Ce(), c = g(), u = De("phlixConfig", null), f = d(), p = N(() => r.apiBase ?? f.value);
		we((e) => {
			c.error(l(e, u?.locale, o("syncplay.commandRejected")));
		}), W(() => we(null));
		let m = K(!1), h = N(() => m.value || s.syncStatus === "re-syncing");
		async function _() {
			if (s.isInRoom) try {
				await s.sendCommand(p.value, "play"), i("play");
			} catch {
				c.error(o("syncplay.commandFailed"));
			}
		}
		async function v() {
			if (s.isInRoom) try {
				await s.sendCommand(p.value, "pause"), i("pause");
			} catch {
				c.error(o("syncplay.commandFailed"));
			}
		}
		async function y() {
			r.isPlaying ? await v() : await _();
		}
		async function b(e) {
			if (s.isInRoom) try {
				await s.sendCommand(p.value, "seek", { position: e }), i("seek", e);
			} catch {
				c.error(o("syncplay.commandFailed"));
			}
		}
		async function x() {
			await b(Math.max(0, r.position - ji));
		}
		async function S() {
			await b(Math.min(r.duration, r.position + ji));
		}
		return X(() => s.syncStatus, (e) => {
			e === "re-syncing" ? m.value = !0 : e === "synced" && (m.value = !1);
		}), (n, r) => Y(s).isInRoom ? (G(), I("div", Ci, [
			h.value ? (G(), I("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": Y(o)("syncplay.waitingForMembers")
			}, [z(t, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), L("span", Ti, J(Y(o)("syncplay.waitingForMembers")), 1)], 8, wi)) : F("", !0),
			L("div", Ei, [
				L("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.rewind"),
					onClick: x
				}, [z(t, { name: "rewind" })], 8, Di),
				L("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Y(o)("syncplay.pauseAll") : Y(o)("syncplay.playAll"),
					onClick: y
				}, [z(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Oi),
				L("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.fastForward"),
					onClick: S
				}, [z(t, { name: "forward" })], 8, ki)
			]),
			L("div", { class: H(["syncplay-controls__status", `syncplay-controls__status--${Y(s).syncStatus}`]) }, [z(t, {
				name: Y(s).syncStatus === "synced" ? "check" : Y(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), L("span", Ai, J(Y(s).syncStatus === "synced" ? Y(o)("syncplay.synced") : Y(s).syncStatus === "outOfSync" ? Y(o)("syncplay.outOfSync") : Y(o)("syncplay.reSyncing")), 1)], 2)
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-338c0ffc"]]);
//#endregion
//#region src/utils/subtitleSrc.ts
function Ni(e, t) {
	return String(p(e, t));
}
function Pi(e, t) {
	let n = !1, r = t.map((t) => {
		let r = Ni(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
//#endregion
//#region src/components/Player.vue?vue&type=script&setup=true&lang.ts
var Fi = { class: "player__stage" }, Ii = ["src", "poster"], Li = [
	"src",
	"srclang",
	"label"
], Ri = { class: "player__meta" }, zi = ["aria-label"], Bi = { class: "player__meta-text" }, Vi = { class: "player__eyebrow" }, Hi = { class: "player__title" }, Ui = { class: "player__sub numeric" }, Wi = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Gi = {
	key: 0,
	class: "player__center"
}, Ki = ["aria-label"], qi = ["aria-label"], Ji = ["aria-label"], Yi = { class: "player__btnrow" }, Xi = ["aria-label"], Zi = ["aria-label"], Qi = ["aria-label"], $i = { class: "player__time numeric" }, ea = ["aria-label", "aria-pressed"], ta = ["title"], na = ["aria-label"], ra = ["aria-label"], ia = ["aria-label", "aria-pressed"], aa = ["aria-label", "aria-pressed"], oa = ["aria-label"], sa = { class: "similar-modal" }, ca = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, la = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, ua = { class: "similar-modal__state-title" }, da = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, fa = {
	key: 3,
	class: "similar-modal__results"
}, pa = { class: "similar-modal__poster" }, ma = ["src", "alt"], ha = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, ga = { class: "similar-modal__result-body" }, _a = { class: "similar-modal__result-title" }, va = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, ya = { key: 0 }, ba = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { imgSrc: r } = m(), o = e, s = n, c = h(), l = i(), { t: f } = a(), p = Ce(), b = _(), x = N(() => b.isFavorite(o.media.id)), S = N(() => b.likeLevel(o.media.id));
		function C() {
			b.toggleFavorite(o.media.id, B());
		}
		function w(e) {
			b.setLike(o.media.id, e, B());
		}
		let te = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], T = K(null), ne = K(null), E = K(null), D = K(!0), re = K(!1), O = K(!1), ie = K(!1), A = K(!1), ae = K(!1), oe = K(!1), se = K(null), ce = K(null), le = K(!1), ue = g(), de = K(!1);
		function pe(e) {
			ue.success(f("syncplay.joinedRoom", { name: e.name }));
		}
		let me = N(() => A.value ? 1.35 : 1), j = K(Wn(o.streamUrl, o.media.path)), he = N(() => ar(o.media.streams)), _e = 0;
		async function ye() {
			let e = ++_e;
			if (j.value) return;
			let t = await dr([o.streamUrl, o.media.path], o.playbackAudioTracks ?? [], he.value);
			e === _e && (!t || j.value || (j.value = !0, Re(T.value?.currentTime ?? 0)));
		}
		X([() => o.playbackAudioTracks, he], () => {
			ye();
		}, { immediate: !0 });
		let be = De("phlixConfig", null), xe = d(), we = De("resumeReporter", null), Ee = !1;
		function B() {
			return xe.value;
		}
		let V = lt({
			apiBase: () => o.apiBase ?? "",
			hlsConfig: be?.playerHlsConfig
		}), U = pt({ apiBase: () => o.apiBase ?? "" }), W = null;
		function je(e) {
			W !== null && clearTimeout(W), W = setTimeout(() => {
				W = null, U.fetch(e);
			}, 0);
		}
		let Me = N(() => o.thumbnailAt ?? U.thumbnailAt), Pe = N(() => j.value ? void 0 : o.streamUrl), Fe = N(() => j.value && V.state.value !== "ready"), Ie = N(() => j.value && (V.state.value === "preparing" || V.state.value === "idle")), Le = N(() => j.value && V.state.value === "error");
		function Re(e = 0) {
			let t = T.value, n = navigator.connection?.downlinkMax, r = nt(n);
			t && V.start(t, o.media.id, r, e);
		}
		function Be(e) {
			if (c.quality === "original" && e !== "auto") {
				V.loadVariantPlaylist(Dt);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				V.loadVariantPlaylist(e);
				return;
			}
			V.setLevel(e);
		}
		let Ve = !1;
		function He() {
			l.defaultQuality = Et;
		}
		function Ue() {
			let e = V.levels.value;
			if (e.length === 0) return !1;
			let t = l.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = V.variants.value;
				if (!t || t.length === 0) return !1;
				if (Pt(e, t)) V.loadVariantPlaylist(Dt);
				else {
					let t = Nt(e);
					t >= 0 && V.setNextLevel(t), He();
				}
				return !0;
			}
			let n = jt(e, t);
			return n >= 0 ? V.setNextLevel(n) : He(), !0;
		}
		X(() => V.levels.value, (e) => {
			Ve || e.length === 0 || Ue() && (Ve = !0);
		}), X(() => V.variants.value, (e) => {
			Ve || !e?.length || Oe(() => {
				Ve || Ue() && (Ve = !0);
			});
		}, { deep: !0 });
		let Ge = K(c.resumePositionFor(o.media.id) ?? 0), Q = K(!j.value && Ge.value > 0), Ke = null, qe = K(!1), Je = K(8), Ye, Xe = K(null), Ze = K(0), Qe = K(!1), $e = K([]), et = K(!1), tt = K(null);
		function rt(e, t) {
			Xe.value = e, Ze.value = t, $e.value = [], tt.value = null, Qe.value = !0, ct(e, t);
		}
		let it = null, at = null, ot = null;
		function st() {
			let e = o.apiBase ?? "";
			return (at === null || ot !== e) && (at = new u({ baseUrl: e }), ot = e), at;
		}
		async function ct(e, t) {
			it?.abort(), it = new AbortController(), et.value = !0, tt.value = null;
			try {
				let n = await st().searchByMarker(e, t, 30, 20, it.signal);
				$e.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				tt.value = "Failed to load similar media. Please try again.", $e.value = [];
			} finally {
				et.value = !1;
			}
		}
		function ut() {
			it?.abort(), Qe.value = !1, $e.value = [], tt.value = null, Xe.value = null;
		}
		let dt = N(() => c.upNext);
		function ft() {
			j.value = Wn(o.streamUrl, o.media.path), ye(), Ge.value = c.resumePositionFor(o.media.id) ?? 0, Q.value = !j.value && Ge.value > 0, Ke = null, vn = !1, an = !1, tn.value = [], en.value = !1, on = !1, qt.value = -1, fn = null, Ve = !1, Ee = !1, zt(), Ot = !1, Mt = 0, At = 0, _t(), qe.value = !1, V.reset(), T.value && (T.value.currentTime = 0), j.value && Re(), je(o.media.id);
		}
		function mt(e) {
			let t = T.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ke = Math.max(0, e));
		}
		function ht() {
			mt(Ge.value), Q.value = !1, T.value?.play()?.catch(() => {});
		}
		function gt() {
			Ke = null, mt(0), c.clearResume(o.media.id), Q.value = !1, T.value?.play()?.catch(() => {});
		}
		function _t() {
			Ye &&= (clearInterval(Ye), void 0);
		}
		function vt() {
			Je.value = 8, _t(), Ye = setInterval(() => {
				--Je.value, Je.value <= 0 && (_t(), bt());
			}, 1e3);
		}
		function yt() {
			Ee || (Ee = !0, we?.finish()), or(), D.value = !0, c.upNext && (qe.value = !0, l.autoplay && vt());
		}
		function bt() {
			_t(), qe.value = !1;
			let e = c.next(o.streamUrlFor);
			e && s("play-next", e);
		}
		function xt() {
			_t(), qe.value = !1;
		}
		function Ct() {
			if (j.value) return;
			let e = T.value, t = Kn(e) && (e?.currentTime ?? 0) === 0;
			(Gn(e) || t) && (Ft(), zt(), j.value = !0, Re(e?.currentTime ?? 0));
		}
		let Ot = !1, kt = null, At = 0, Mt = 0;
		function Ft() {
			if (Ot) return;
			Ot = !0;
			let e = o.media?.id;
			e != null && e !== "" && st().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, Yn({ videoCodec: he.value })).catch(() => {});
		}
		function Rt() {
			if (kt !== null || Ot || j.value) return;
			let e = T.value;
			e && (At = Date.now(), Mt = e.currentTime, kt = setTimeout(() => {
				kt = null;
				let e = T.value;
				!e || j.value || Xn(Date.now(), At, e.currentTime, Mt) && (Ft(), j.value = !0, Re(e.currentTime));
			}, qn));
		}
		function zt() {
			kt !== null && (clearTimeout(kt), kt = null);
		}
		let Bt = K([]), Vt = K([]), Ht = K(-1), Ut = K(!1), Wt = N(() => V.state.value === "ready" && V.audioTracks.value.length > 0), Gt = N(() => V.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Kt = N(() => (o.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), qt = K(-1), Jt = N(() => !Wt.value && !j.value && Vt.value.length === 0 && Kt.value.length > 1), Yt = N(() => Wt.value ? Gt.value : Jt.value ? Kt.value : Vt.value), Xt = N(() => {
			if (Wt.value) return V.currentAudioTrack.value;
			if (Jt.value) {
				if (qt.value >= 0) return qt.value;
				let e = (o.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : o.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Ht.value;
		}), Zt = K(!1), Qt = c.subtitleLang, $t = N(() => {
			let e = o.apiBase ?? "", t = j.value ? V.subtitleTracks.value : Pi(e, o.playbackSubtitleTracks ?? []);
			if (tn.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Pi(e, tn.value), i = new Set(t.map(n)), a = r.filter((e) => !i.has(n(e)));
			return a.length === 0 ? t : [...t, ...a];
		}), en = K(!1), tn = K([]), nn = N(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(l.defaultSubtitleLang), t(l.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function rn(e) {
			tn.value.some((t) => t.url === e.url) || (tn.value = [...tn.value, e]);
		}
		let an = !1, on = !1;
		function sn() {
			if (an) return;
			if (l.subtitlePreferenceSet) {
				an = !0;
				return;
			}
			let e = $t.value.find((e) => e.default);
			if (!e) return;
			let t = Bt.value.find((t) => t.language === (e.language || e.label));
			t && (c.setSubtitle(t.language), Qt = t.language, an = !0);
		}
		function cn() {
			if (on) return;
			let e = l.defaultAudioLang;
			if (!e) return;
			let t = Yt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Xt.value;
			r >= 0 && r < t.length || (mn(n), on = !0);
		}
		let ln = N(() => Bt.value.some((e) => e.language === c.subtitleLang));
		function un() {
			let e = T.value;
			Bt.value = Se(e), Vt.value = ge(e), Ht.value = fe(e), sn(), cn();
		}
		function dn() {
			if (ln.value) Qt = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = Qt && Bt.value.some((e) => e.language === Qt) ? Qt : Bt.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			s("captions");
		}
		let fn = null;
		function mn(e) {
			if (Wt.value) V.setAudioTrack(e);
			else if (Jt.value) {
				if (e === Xt.value) return;
				qt.value = e, fn = e, j.value = !0, Re(T.value?.currentTime ?? 0);
			} else ve(T.value, e), Ht.value = e;
		}
		X(Wt, (e) => {
			if (!e || fn === null) return;
			let t = fn;
			fn = null, t >= 0 && t < V.audioTracks.value.length && V.setAudioTrack(t);
		}), X($t, () => {
			Oe(() => un());
		}, { deep: !0 });
		let hn = null, gn, _n = N(() => {
			let e = [];
			o.media.year && e.push({ text: String(o.media.year) }), o.media.rating && e.push({
				text: o.media.rating,
				cert: !0
			}), o.media.runtime && e.push({ text: `${o.media.runtime}m` });
			let t = o.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), vn = !1;
		function yn() {
			if (!o.autoplay || vn || Q.value || Fe.value) return;
			let e = T.value;
			if (!e || !e.paused) return;
			vn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, c.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function bn() {
			yn();
		}
		function xn() {
			o.prevEpisode && s("play-episode", o.prevEpisode);
		}
		function Sn() {
			o.nextEpisode && s("play-episode", o.nextEpisode);
		}
		function Cn() {
			let e = T.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function wn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Tn() {
			c.play(), c.setMediaPositionState(), Rt();
		}
		function En() {
			c.pause(), c.setMediaPositionState();
		}
		function Dn() {
			let e = T.value;
			e && (kt !== null && e.currentTime > Mt && zt(), c.updateProgress(e.currentTime, e.duration, wn(e)), p.isInRoom && p.updateLocalPosition(e.currentTime));
		}
		function On() {
			let e = T.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, Ke !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ke) : Ke, Ke = null), c.updateProgress(e.currentTime, e.duration, wn(e)), c.setMediaPositionState(), un());
		}
		function An() {
			let e = T.value;
			e && c.updateProgress(e.currentTime, e.duration, wn(e));
		}
		function jn() {
			let e = T.value;
			e && (Math.abs(e.volume - c.volume) > .001 && c.setVolume(e.volume), e.muted !== c.muted && c.toggleMute());
		}
		function Mn() {
			let e = T.value;
			e && e.playbackRate !== c.rate && c.setRate(e.playbackRate), c.setMediaPositionState();
		}
		function Nn() {
			c.setMediaPositionState();
		}
		function Pn() {
			c.setMediaPositionState();
		}
		function $(e) {
			let t = T.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function In(e) {
			$(c.position + e);
		}
		function Ln() {
			O.value = !0, cr();
		}
		function Rn() {
			O.value = !1, cr();
		}
		function zn(e) {
			let t = te.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(te[e] - c.rate) ? n : e, 0), n = te[Math.min(te.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		function Vn() {
			if (!o.markers) return;
			let e = c.position, t = o.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Hn() {
			if (!o.markers) return;
			let e = c.position, t = o.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Un() {
			se.value?.toggleOpen();
		}
		let Jn = null;
		function Zn() {
			let e = T.value;
			if (!e) {
				c.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), c.pause();
				return;
			}
			Jn !== null && (clearInterval(Jn), Jn = null);
			let t = .05;
			Jn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(Jn), Jn = null, e.volume = 0, e.pause(), c.pause());
			}, 50);
		}
		y({
			playPause: Cn,
			seekBy: In,
			frameStep: (e) => {
				c.playing || $(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: Qn,
			toggleFullscreen: er,
			toggleCaptions: dn,
			toggleTheater: $n,
			togglePip: nr,
			skipIntro: Vn,
			skipOutro: Hn,
			sleepTimer: Un,
			seekToPercent: (e) => $(e * c.duration),
			speedStep: zn,
			toggleHelp: () => {
				ie.value = !ie.value;
			},
			toggleQuality: () => {
				j.value ? (le.value = !le.value, ce.value?.toggleMenu?.()) : ue.show({
					message: f("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !ie.value && !Ut.value && !Zt.value });
		function Qn() {
			c.toggleMute();
		}
		function $n() {
			A.value = !A.value, s("theater", A.value);
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
			e && (e.type === "seekTo" ? mt(e.value) : e.type === "seekBy" && mt(c.position + e.value));
		});
		function er() {
			if (typeof document > "u") return;
			let e = ne.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function tr() {
			re.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function nr() {
			let e = T.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			s("pip");
		}
		function rr() {
			ae.value = !0;
		}
		function ir() {
			ae.value = !1;
		}
		function or() {
			gn &&= (clearTimeout(gn), void 0);
		}
		function sr() {
			or(), !(!c.playing || O.value) && (gn = setTimeout(() => {
				c.playing && !O.value && (D.value = !1);
			}, o.idleTimeout ?? 3e3));
		}
		function cr() {
			D.value = !0, sr();
		}
		let lr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", ur = "data-phlix-prev-tabindex", fr = "__phlix_no_tabindex__";
		function pr(e) {
			let t = ne.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(lr) ? [n] : Array.from(n.querySelectorAll(lr));
				for (let n of t) if (e) {
					let e = n.getAttribute(ur);
					e === null || e === fr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(ur);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(ur, n.getAttribute("tabindex") ?? fr), n.setAttribute("tabindex", "-1"));
			}
		}
		X(D, (e) => {
			typeof document > "u" || (pr(e), !e && document.activeElement instanceof HTMLElement && ne.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), X(() => c.playing, (e) => {
			e ? (Q.value = !1, xt(), sr()) : (or(), D.value = !0);
		});
		let mr = null;
		Ae(() => {
			c.setCurrent(o.media, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), b.hydrate(o.media), typeof document < "u" && (document.addEventListener("fullscreenchange", tr), oe.value = document.pictureInPictureEnabled === !0), mr = c.bindMediaSession({
				onPlay: () => void T.value?.play()?.catch(() => {}),
				onPause: () => T.value?.pause(),
				onSeek: (e) => $(e)
			}), hn = T.value?.textTracks ?? null, hn?.addEventListener?.("addtrack", un), hn?.addEventListener?.("removetrack", un), un(), j.value && Re(), je(o.media.id);
		}), X(() => o.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), ft();
		}), X(() => o.media?.id, () => {
			b.hydrate(o.media);
		}), X(() => p.currentSession, (e) => {
			e && (e.state === "playing" ? (T.value?.play(), c.play()) : e.state === "paused" && (T.value?.pause(), c.pause()), p.updateLocalPosition(c.position), Math.abs(p.driftAmount) > 2 && mt(e.playbackPosition));
		});
		let hr = null;
		return X(() => p.pendingPlayMedia, async (e) => {
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
				if (p.pendingPlayMedia !== e) return;
			}
			if (t) {
				c.setCurrent(t, {
					resetPosition: !0,
					streamUrl: o.streamUrlFor?.(t) ?? ""
				}), T.value?.play(), c.play(), p.consumePendingPlayMedia(), hr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			hr !== n && (hr = n, s("pending-media", e.mediaId, e.title));
		}), ke(() => {
			we?.reportFinal?.(), or(), _t(), V.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", tr), mr?.(), hn?.removeEventListener?.("addtrack", un), hn?.removeEventListener?.("removetrack", un), Jn !== null && (clearInterval(Jn), Jn = null), W !== null && (clearTimeout(W), W = null), zt();
		}), (n, i) => (G(), I("div", {
			ref_key: "containerRef",
			ref: ne,
			class: H(["player", {
				"is-chrome-hidden": !D.value,
				"is-theater": A.value
			}]),
			onPointermove: cr,
			onPointerdown: cr,
			onFocusin: cr
		}, [z(Fn, {
			video: T.value,
			enabled: Y(l).atmosphere,
			playing: Y(c).playing,
			"reduced-motion": Y(l).effectiveReducedMotion,
			intensity: me.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), L("div", Fi, [
			L("video", {
				ref_key: "videoRef",
				ref: T,
				class: "player__video",
				src: Pe.value,
				poster: Y(r)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Tn,
				onPause: En,
				onTimeupdate: Dn,
				onLoadedmetadata: On,
				onCanplay: bn,
				onProgress: An,
				onVolumechange: jn,
				onRatechange: Mn,
				onSeeked: Nn,
				onDurationchange: Pn,
				onEnded: yt,
				onError: Ct,
				onEnterpictureinpicture: rr,
				onLeavepictureinpicture: ir,
				onClick: Cn
			}, [(G(!0), I(M, null, q($t.value, (e) => (G(), I("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Li))), 128))], 40, Ii),
			i[22] ||= L("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[23] ||= L("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			L("div", Ri, [L("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Y(f)("player.back"),
				onClick: i[0] ||= Ne((e) => s("back"), ["stop"])
			}, [z(t, { name: "arrow-left" })], 8, zi), L("div", Bi, [
				L("p", Vi, J(Y(f)("player.nowPlaying")), 1),
				L("h2", Hi, J(e.media.name), 1),
				L("div", Ui, [(G(!0), I(M, null, q(_n.value, (e, t) => (G(), I(M, { key: t }, [t > 0 && !e.cert ? (G(), I("span", Wi, "·")) : F("", !0), L("span", { class: H({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			Fe.value ? F("", !0) : (G(), I("div", Gi, [
				D.value ? (G(), I("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": Y(f)("player.seekBackward"),
					onClick: i[1] ||= Ne((e) => In(-10), ["stop"])
				}, [z(t, { name: "rewind" }), L("span", { class: "player__center-skip-count" }, J(10))], 8, Ki)) : F("", !0),
				L("button", {
					type: "button",
					class: H(["player__bigplay", { "is-playing": Y(c).playing }]),
					"aria-label": Y(c).playing ? Y(f)("player.pause") : Y(f)("player.play"),
					onClick: Ne(Cn, ["stop"])
				}, [z(t, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, qi),
				D.value ? (G(), I("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": Y(f)("player.seekForward"),
					onClick: i[2] ||= Ne((e) => In(10), ["stop"])
				}, [z(t, { name: "forward" }), L("span", { class: "player__center-skip-count" }, J(10))], 8, Ji)) : F("", !0)
			])),
			z(Lt, {
				video: T.value,
				language: Y(c).subtitleLang,
				"style-config": Y(l).captionStyle,
				lifted: D.value,
				"controls-root": E.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Fe.value ? F("", !0) : (G(), I("div", {
				key: 1,
				ref_key: "controlsRef",
				ref: E,
				class: "player__controls",
				onClick: i[9] ||= Ne(() => {}, ["stop"])
			}, [
				z(We, {
					position: Y(c).position,
					duration: Y(c).duration,
					buffered: Y(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": Me.value,
					onSeek: $,
					onScrubStart: Ln,
					onScrubEnd: Rn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				Y(l).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), P(si, {
					key: 0,
					position: Y(c).position,
					duration: Y(c).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: rt
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : F("", !0),
				L("div", Yi, [
					e.prevEpisode ? (G(), I("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(f)("player.previousEpisode"),
						onClick: xn
					}, [z(t, { name: "skip-back" })], 8, Xi)) : F("", !0),
					L("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Y(c).playing ? Y(f)("player.pause") : Y(f)("player.play"),
						onClick: Cn
					}, [z(t, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Zi),
					e.nextEpisode ? (G(), I("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(f)("player.nextEpisode"),
						onClick: Sn
					}, [z(t, { name: "skip-forward" })], 8, Qi)) : F("", !0),
					L("span", $i, [
						R(J(Y(ze)(Y(c).position)), 1),
						i[18] ||= L("span", { class: "player__sep" }, " / ", -1),
						R(J(Y(ze)(Y(c).duration)), 1)
					]),
					i[19] ||= L("span", { class: "player__grow" }, null, -1),
					L("button", {
						type: "button",
						class: H(["player__iconbtn player__favorite", { "is-on": x.value }]),
						"aria-label": x.value ? Y(f)("itemActions.removeFavorite") : Y(f)("itemActions.addFavorite"),
						"aria-pressed": x.value ? "true" : "false",
						onClick: C
					}, [z(t, { name: x.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ea),
					z(v, {
						level: S.value,
						onCycle: w
					}, null, 8, ["level"]),
					z(wt),
					z(Tt),
					z(It, {
						ref_key: "qualityMenuRef",
						ref: ce,
						open: le.value,
						"onUpdate:open": i[3] ||= (e) => le.value = e,
						levels: Y(V).levels.value,
						variants: Y(V).variants.value,
						"current-level": Y(V).currentLevel.value,
						"auto-enabled": Y(V).autoEnabled.value,
						"active-height": Y(V).activeLevelHeight.value,
						onSelect: Be
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					j.value ? F("", !0) : (G(), I("span", {
						key: 2,
						class: "player__direct-badge",
						title: Y(f)("player.qualityDirectStream")
					}, J(Y(f)("player.directStream")), 9, ta)),
					z(pn, {
						open: Ut.value,
						"onUpdate:open": i[4] ||= (e) => Ut.value = e,
						tracks: Bt.value,
						"audio-tracks": Yt.value,
						"active-audio": Xt.value,
						onSelectAudio: mn,
						onAddSubtitles: i[5] ||= (e) => en.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					z($r, {
						open: Zt.value,
						"onUpdate:open": i[6] ||= (e) => Zt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					z(fi, {
						ref_key: "sleepTimerRef",
						ref: se,
						"on-expire": Zn
					}, null, 512),
					L("button", {
						type: "button",
						class: H(["player__iconbtn player__syncplay", { "is-on": Y(p).isInRoom }]),
						"aria-label": Y(p).isInRoom ? Y(f)("syncplay.inRoom") : Y(f)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[7] ||= (e) => de.value = !0
					}, [z(t, { name: "user" })], 10, na),
					L("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(f)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[8] ||= (e) => ie.value = !0
					}, [z(t, { name: "info" })], 8, ra),
					oe.value ? (G(), I("button", {
						key: 3,
						type: "button",
						class: H(["player__iconbtn", { "is-on": ae.value }]),
						"aria-label": ae.value ? Y(f)("player.exitPip") : Y(f)("player.pip"),
						"aria-pressed": ae.value,
						onClick: nr
					}, [z(t, { name: "pip" })], 10, ia)) : F("", !0),
					L("button", {
						type: "button",
						class: H(["player__iconbtn", { "is-on": A.value }]),
						"aria-label": A.value ? Y(f)("player.exitTheater") : Y(f)("player.theater"),
						"aria-pressed": A.value,
						onClick: $n
					}, [z(t, { name: "theater" })], 10, aa),
					L("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": re.value ? Y(f)("player.exitFullscreen") : Y(f)("player.fullscreen"),
						onClick: er
					}, [z(t, { name: re.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, oa)
				])
			], 512)),
			Fe.value ? F("", !0) : (G(), P(Pr, {
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
			Fe.value ? F("", !0) : (G(), P(Br, {
				key: 3,
				position: Y(c).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Q.value && !Fe.value ? (G(), P(Bn, {
				key: 4,
				seconds: Ge.value,
				onResume: ht,
				onRestart: gt
			}, null, 8, ["seconds"])) : F("", !0),
			qe.value && dt.value && !Fe.value ? (G(), P(Sr, {
				key: 5,
				media: dt.value,
				remaining: Je.value,
				total: Y(8),
				counting: Y(l).autoplay,
				onPlayNow: bt,
				onCancel: xt
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : F("", !0),
			z(k, {
				modelValue: Qe.value,
				"onUpdate:modelValue": i[10] ||= (e) => Qe.value = e,
				title: `Similar ${Xe.value ?? "marker"}s`,
				size: "lg",
				onClose: ut
			}, {
				default: Z(() => [L("div", sa, [et.value ? (G(), I("div", ca, [z(ee, { label: "Finding similar media" })])) : tt.value ? (G(), I("div", la, [z(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), L("p", ua, J(tt.value), 1)])) : !et.value && $e.value.length === 0 ? (G(), I("div", da, [
					z(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[20] ||= L("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[21] ||= L("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), I("ul", fa, [(G(!0), I(M, null, q($e.value, (e) => (G(), I("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [L("div", pa, [e.poster_url ? (G(), I("img", {
					key: 0,
					src: Y(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, ma)) : (G(), I("div", ha, [z(t, { name: "film" })]))]), L("div", ga, [L("p", _a, J(e.name), 1), e.year ? (G(), I("p", va, [R(J(e.year) + " ", 1), e.runtime ? (G(), I("span", ya, " · " + J(e.runtime) + "m", 1)) : F("", !0)])) : F("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Ie.value ? (G(), P(Nr, {
				key: 6,
				title: e.media.name,
				progress: Y(V).progress.value,
				onBack: i[11] ||= (e) => s("back")
			}, null, 8, ["title", "progress"])) : F("", !0),
			Le.value ? (G(), P(Dr, {
				key: 7,
				title: e.media.name,
				onBack: i[12] ||= (e) => s("back")
			}, null, 8, ["title"])) : F("", !0),
			Y(p).isInRoom ? (G(), P(Mi, {
				key: 8,
				position: Y(c).position,
				duration: Y(c).duration,
				"is-playing": Y(c).playing,
				onSeek: $,
				onPlay: i[13] ||= (e) => void T.value?.play(),
				onPause: i[14] ||= (e) => void T.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : F("", !0),
			Y(p).isInRoom ? (G(), P(Si, { key: 9 })) : F("", !0),
			z(Te, {
				modelValue: de.value,
				"onUpdate:modelValue": i[15] ||= (e) => de.value = e,
				onJoined: pe
			}, null, 8, ["modelValue"]),
			z(St, {
				open: ie.value,
				onClose: i[16] ||= (e) => ie.value = !1
			}, null, 8, ["open"]),
			z(kn, {
				open: en.value,
				"onUpdate:open": i[17] ||= (e) => en.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": nn.value,
				onAdded: rn
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-06928390"]]), xa = { class: "player-page__stage" }, Sa = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Ca = { class: "player-page__blocking-error" }, wa = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = d(), { imgSrc: r } = m(), i = f(), a = Fe(), s = Ie(), c = De("phlixConfig", null), l = h(), p = _(), g = x(), v = K(null), y = K(""), b = K([]), S = K(null), C = K(null), w = K([]), ee = K([]), E = K(!0), D = K(null), re = K(!1), O = K(null), fe = K(!1), pe = K(null), me = K(null), j = N(() => String(a.params.id ?? ""));
		ne(() => v.value?.name);
		let he = N(() => {
			let e = r(v.value?.poster_url);
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), ge = null, _e = !1, ve = 0;
		function ye(e) {
			return _e || e.generation !== ve;
		}
		function be(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function xe(e) {
			let t = i.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function Se(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function Ce(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function we(e, t, r) {
			let i = () => ye(r), a = t.genres?.[0];
			if (!a) {
				l.setQueue([]);
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
				l.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || be(e)) return;
				l.setQueue([]);
			}
		}
		async function Te(e, t, r) {
			let i = A(n.value, {
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
		function Ee(e, t) {
			pe.value = se(e, t), me.value = ce(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && l.setQueue(r);
		}
		function B(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function V(e, n, r) {
			if (pe.value = null, me.value = null, !Ce(n)) return;
			let i = B(n.id);
			if (i) {
				Ee(i, n.id);
				return;
			}
			let a = () => ye(r);
			try {
				let i = await M(e, n, r.controller?.signal);
				if (a()) return;
				let o = await Te(e, i.id, r.controller?.signal);
				if (a()) return;
				if (oe(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => Te(e, t.id, r.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = ae(o);
				s.length && t.set(i.id, s), Ee(s, n.id);
			} catch (e) {
				if (a() || be(e)) return;
				pe.value = null, me.value = null;
			}
		}
		async function Oe() {
			let e = j.value;
			ge?.abort(), ge = typeof AbortController < "u" ? new AbortController() : null, ve += 1;
			let t = {
				generation: ve,
				controller: ge
			};
			if (E.value = !0, D.value = null, b.value = [], S.value = null, C.value = null, w.value = [], ee.value = [], pe.value = null, me.value = null, l.hideMiniPlayer(), !e) {
				D.value = "No media id provided", E.value = !1;
				return;
			}
			let r = new u({ baseUrl: n.value });
			r.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, t.controller?.signal).then((e) => {
				ye(t) || (b.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), S.value = Se(e?.intro_marker), C.value = Se(e?.outro_marker), w.value = Zn(e?.audio_tracks), ee.value = Je(e?.subtitle_tracks));
			}).catch(() => null);
			let i = le(e), a = Date.now();
			if (i && ue(i, a)) {
				W(r, i.item, t);
				return;
			}
			let s = null;
			try {
				s = (await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t.controller?.signal)).item;
			} catch (e) {
				if (ye(t) || be(e)) return;
				if (e instanceof o && (e.status === 403 || e.status === 429)) {
					let t = Re(e.body, c?.locale);
					if (t !== null) {
						O.value = t, fe.value = !0, E.value = !1;
						return;
					}
				}
				if (i) {
					W(r, i.item, t);
					return;
				}
				D.value = e instanceof Error ? e.message : "Failed to load media", E.value = !1;
				return;
			}
			if (!ye(t)) {
				if (!s) {
					if (i) {
						W(r, i.item, t);
						return;
					}
					D.value = "Failed to load media item", E.value = !1;
					return;
				}
				de(e, s, a), W(r, s, t);
			}
		}
		async function W(e, t, n) {
			v.value = t, p.hydrate(t), y.value = xe(t), E.value = !1, !(Ce(t) && (await V(e, t, n), ye(n) || me.value)) && we(e, t, n);
		}
		Ae(Oe), X(j, Oe), Pe(() => {
			l.current && l.streamUrl && l.showMiniPlayer();
		}), ke(() => {
			_e = !0, ge?.abort(), ge = null, g.reset();
		});
		function q() {
			s?.back();
		}
		function je(e) {
			s?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Me(e) {
			s?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ne(e) {
			re.value = e, g.setTheaterActive(e);
		}
		function Le() {
			fe.value = !1, q();
		}
		return (e, t) => (G(), I("div", { class: H(["player-page", { "is-theater": re.value }]) }, [
			he.value && !E.value && !D.value ? (G(), I("div", {
				key: 0,
				class: "player-page__ambient",
				style: U(he.value),
				"aria-hidden": "true"
			}, null, 4)) : F("", !0),
			L("div", xa, [E.value ? (G(), I("div", Sa, [z(ie, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : D.value ? (G(), P(te, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: D.value
			}, {
				actions: Z(() => [z(T, {
					variant: "solid",
					onClick: Oe
				}, {
					default: Z(() => [...t[1] ||= [R("Retry", -1)]]),
					_: 1
				}), z(T, {
					variant: "ghost",
					onClick: q
				}, {
					default: Z(() => [...t[2] ||= [R("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : v.value ? (G(), P(ba, {
				key: 2,
				media: v.value,
				"stream-url": y.value,
				"stream-url-for": xe,
				"api-base": Y(n),
				chapters: b.value,
				"intro-marker": S.value,
				"outro-marker": C.value,
				"playback-audio-tracks": w.value,
				"playback-subtitle-tracks": ee.value,
				"prev-episode": pe.value,
				"next-episode": me.value,
				autoplay: !0,
				onBack: q,
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
			])) : F("", !0)]),
			z(k, {
				modelValue: fe.value,
				"onUpdate:modelValue": t[0] ||= (e) => fe.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Z(() => [z(T, {
					variant: "solid",
					onClick: Le
				}, {
					default: Z(() => [...t[3] ||= [R("OK", -1)]]),
					_: 1
				})]),
				default: Z(() => [L("p", Ca, J(O.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-4d1f516a"]]);
//#endregion
export { wa as default };

//# sourceMappingURL=PlayerPage-DWxWkhwa.js.map