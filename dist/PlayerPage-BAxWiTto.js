import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-BlNXxmNP.js";
import { t as n } from "./IconButton-BI0oqPNk.js";
import { n as r } from "./useFocusTrap-rrmOWOBy.js";
import { a as i } from "./usePreferencesStore-CFPikE8Z.js";
import { t as a } from "./useMessages-DwZkJguD.js";
import { l as o, t as s, u as c } from "./client-Dy0g66rg.js";
import { n as l, r as u } from "./useApiBase-CV_r-Kk4.js";
import { r as d, t as f } from "./useImageSrc-KnN1T9Ga.js";
import { i as p } from "./usePlayerStore-D8A_gb_c.js";
import { t as m } from "./useToastStore-BDoKlU6N.js";
import { n as h, t as g } from "./ThumbRating-D1NwvEZM.js";
import { a as _, n as v, o as y, r as b, s as x, t as S } from "./shortcuts-Ck2yBFUB.js";
import { t as C } from "./Spinner-DrQ8YjMj.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as w } from "./Button-BL3fV7FU.js";
import { t as T } from "./Badge-DbdgvC-x.js";
import { t as E } from "./Slider-8uhKUpm-.js";
import { t as D } from "./Chip-BJXvFc2X.js";
import { t as O } from "./Select-ClbFrdft.js";
import { t as te } from "./Modal-DFo-9bYG.js";
import { t as ne } from "./Skeleton-jlFj-j5t.js";
import { t as re } from "./EmptyState-BwwPJtFd.js";
import { n as k } from "./media-query-DKjhlX8r.js";
import { i as A, o as ie } from "./errors-UL1s00pu.js";
import { n as ae, o as oe, r as se, t as ce } from "./episode-order-C2yqgMeX.js";
import { n as le, r as ue, t as de } from "./useMediaItemCache-BKCJnCbr.js";
import { a as fe, c as pe, d as j, f as me, i as he, l as ge, n as _e, o as ve, r as ye, s as be, t as xe, u as Se } from "./captions-DoP7ce5A.js";
import { n as Ce, t as we } from "./SyncPlayModal-CKWGYHhp.js";
import { Fragment as M, Transition as Te, computed as N, createBlock as P, createCommentVNode as F, createElementBlock as I, createElementVNode as L, createTextVNode as R, createVNode as z, defineComponent as B, inject as Ee, mergeModels as De, nextTick as Oe, normalizeClass as V, normalizeStyle as H, onBeforeUnmount as ke, onMounted as Ae, openBlock as U, ref as W, renderList as G, toDisplayString as K, toRef as je, unref as q, useModel as Me, watch as J, withCtx as Y, withModifiers as X } from "vue";
import { onBeforeRouteLeave as Ne, useRoute as Pe, useRouter as Fe } from "vue-router";
function Ie(e, t) {
	if (typeof e != "object" || !e) return null;
	let n = e[t];
	return typeof n == "string" && n !== "" ? n : null;
}
function Le(e, t) {
	let n = Ie(e, "code");
	if (n !== null && ie(n)) return A(n, t);
	let r = Ie(e, "error");
	return r === "AccessScheduled" ? "Playback blocked by access schedule. Try again during allowed hours." : r === "StreamLimitExceeded" ? "Stream limit reached. Stop another stream to continue watching." : null;
}
//#endregion
//#region src/components/player/format-time.ts
function Z(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Re = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], ze = { class: "scrubber__track" }, Be = ["title"], Ve = { class: "scrubber__time numeric" }, He = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		}, [L("div", ze, [
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
			}, null, 12, Be))), 128)),
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
		}, null, 4)) : F("", !0), L("span", Ve, K(q(Z)(_.value)), 1)], 4)) : F("", !0)], 40, Re));
	}
}), [["__scopeId", "data-v-3d610715"]]), Ue = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Q(e, t = "") {
	return typeof e == "string" ? e : t;
}
function We(e) {
	return e === !0 || e === "true" || e === 1;
}
function Ge(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Ke(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Q(e.url ?? e.src);
		r !== "" && t.push({
			index: Ge(e.index),
			language: Q(e.language ?? e.lang ?? e.srclang),
			label: Q(e.label),
			default: We(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function qe(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Ge(e.height);
		r <= 0 || t.push({
			id: Q(e.id),
			label: Q(e.label),
			height: r,
			width: Ge(e.width),
			bitrate: Ge(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Je(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var Ye = .7, Xe = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], Ze = 1e7, Qe = "mobile-low";
function $e(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * Ye;
}
function et(e) {
	let t = $e(e);
	if (t === void 0 || t >= Ze) return;
	let n = Qe;
	for (let [e, r] of Xe) r <= t && (n = e);
	return n;
}
function tt(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function nt(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		masterUrl: Q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Q(t.status, "running"),
		reused: We(t.reused),
		subtitles: Ke(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: qe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function rt(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		status: Q(t.status, "running"),
		playlistReady: We(t.playlist_ready ?? t.playlistReady),
		progress: Ge(t.progress),
		masterUrl: Q(t.master_url ?? t.masterUrl),
		subtitles: Ke(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: qe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function it(e) {
	return e.playlistReady || e.status === "completed";
}
function at(e) {
	return Ue.has(e);
}
function ot(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function st(e) {
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
			url: ot(n, e.url)
		}));
	}
	let S = e.attach ?? x, C = e.pollIntervalMs ?? 1e3, ee = e.maxWaitMs ?? 12e4, w = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), T = Math.max(1, Math.ceil(ee / Math.max(1, C))), E = ct(), D = e.getToken ?? (() => lt(E)), O = null, te = null, ne = null, re = !1, k = null, A = 0;
	function ie() {
		return e.client ?? new s({
			baseUrl: e.apiBase(),
			tokenStore: E ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function ae(i, a, o, s) {
		ue(), re = !1;
		let c = ++A, l = () => re || c !== A;
		k = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = ie(), c = nt(await r.post(Je(a, o), void 0, k.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			b(c.subtitles), y(c.variants), f.value = c.jobId, m.value = ot(e.apiBase(), c.masterUrl);
			let u = c.status === "completed";
			for (let e = 0; !u && e < T; e++) {
				let e = rt(await r.get(tt(c.jobId), void 0, k.signal));
				if (l()) return;
				if (n.value = e.progress, b(e.subtitles), y(e.variants), at(e.status)) throw Error(`transcode ${e.status}`);
				if (it(e)) {
					u = !0;
					break;
				}
				if (await w(C), l()) return;
			}
			if (!u) throw Error("transcode timed out");
			let d = await S(i, m.value, {
				getToken: D,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => h(),
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
			O = d, te = O.onLevelSwitched((e) => h(e)), ne = O.onAudioTrackSwitched((e) => _(e)), h(), _();
			try {
				let e = p();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function oe(e) {
		O && (O.setCurrentLevel(e === "auto" ? -1 : e), h());
	}
	function se(e) {
		O && (O.setNextLevel(e === "auto" ? -1 : e), h());
	}
	function ce(e) {
		O && (O.setAudioTrack(e), _());
	}
	function le(e) {
		if (!O || !m.value) return;
		let t = m.value.replace("master.m3u8", `media_v${e}.m3u8`);
		O.loadSource(t), g();
	}
	function ue() {
		if (re = !0, k &&= (k.abort(), null), te) {
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
	function de() {
		ue(), t.value = "idle", n.value = 0, r.value = [], g(), v();
		try {
			p().hlsMasterUrl = "";
		} catch {}
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
		setLevel: oe,
		setNextLevel: se,
		setAudioTrack: ce,
		jobId: f,
		masterUrl: m,
		loadVariantPlaylist: le,
		start: ae,
		cleanup: ue,
		reset: de
	};
}
function ct() {
	try {
		return new o();
	} catch {
		return null;
	}
}
function lt(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var ut = 10;
function dt(e) {
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
		let i = r.frame, a = i % ut, s = Math.floor(i / ut), c = a / 9 * 100, l = s / 5 * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function l(o, s) {
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
var ft = ["aria-label"], pt = { class: "shortcuts__head" }, mt = { class: "shortcuts__title" }, ht = { class: "shortcuts__grid" }, gt = { class: "shortcuts__keys" }, _t = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, vt = {
	key: 1,
	class: "shortcuts__key"
}, yt = { class: "shortcuts__label" }, bt = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => b }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = W(null);
		return r(l, je(o, "open"), {
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
			"aria-label": q(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [L("div", pt, [L("h3", mt, K(q(c)("player.keyboard")), 1), z(n, {
			name: "x",
			label: q(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), L("ul", ht, [(U(!0), I(M, null, G(e.shortcuts, (e) => (U(), I("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [L("span", gt, [(U(!0), I(M, null, G(e.keys, (e, n) => (U(), I(M, { key: n }, [e === "–" ? (U(), I("span", _t, "–")) : (U(), I("kbd", vt, [q(S)[e] ? (U(), P(t, {
			key: 0,
			name: q(S)[e],
			label: q(v)[e] ?? e
		}, null, 8, ["name", "label"])) : (U(), I(M, { key: 1 }, [R(K(e), 1)], 64))]))], 64))), 128))]), L("span", yt, K(e.label), 1)]))), 128))])], 8, ft)])) : F("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), xt = { class: "volume" }, St = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "VolumeControl",
	setup(e) {
		let t = p(), r = i(), { t: o } = a(), s = N(() => t.muted ? 0 : t.volume), c = N(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return J(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (U(), I("div", xt, [z(n, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), Ct = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
}), [["__scopeId", "data-v-4530b308"]]), wt = "auto", Tt = "original";
function Et(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function Dt(e) {
	return e >= 2160 ? "4K" : Et(e);
}
function Ot(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Et(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: Dt(r.height)
		}));
	}
	return n;
}
function kt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Et(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function At(e, t) {
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
function jt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Mt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && At(e, n) >= 0;
}
function Nt(e, t) {
	if (t < 0) return wt;
	let n = e.find((e) => e.index === t);
	return n ? Et(n.height) : wt;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var Pt = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "QualityMenu",
	props: /*@__PURE__*/ De({
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
	emits: /*@__PURE__*/ De(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, o = Me(e, "open"), s = W(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = p(), d = i(), { t: f } = a(), m = N(() => Ot(r.levels)), h = N(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = m.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = Et(i.height);
				e.has(a) || n && kt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: Dt(i.height)
				}));
			}
			return t;
		}), g = N(() => m.value.length >= 2 ? m.value : h.value), _ = N(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = N(() => At(r.levels, _.value)), y = N(() => _.value && v.value >= 0 ? {
			value: Tt,
			label: f("player.qualityOriginal", { height: _.value.height })
		} : null), b = N(() => g.value.length >= 2), x = N(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: Dt(r.activeHeight) })), S = N(() => [
			{
				value: wt,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), C = N(() => r.autoEnabled ? wt : y.value && r.currentLevel === v.value && (u.quality === "original" || d.defaultQuality === "original") ? Tt : Nt(r.levels, r.currentLevel));
		function ee(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), d.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : kt(r.levels, t);
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
}), [["__scopeId", "data-v-58498bdd"]]), Ft = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		J(() => n.controlsRoot, u, { immediate: !0 }), ke(l);
		let d = null, f = null, p = null;
		function m() {
			r.value = j(d);
		}
		function h() {
			p != null && (clearTimeout(p), p = null);
		}
		function g() {
			h(), p = setTimeout(() => {
				if (p = null, !d) return;
				be(n.video, n.language);
				let e = j(d);
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
			let e = me(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = j(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return J(() => [n.video, n.language], y, { immediate: !0 }), ke(_), t({ lines: r }), (t, n) => r.value.length ? (U(), I("div", {
			key: 0,
			class: V(["player__captions", { "is-lifted": e.lifted }]),
			style: H(o.value)
		}, [(U(!0), I(M, null, G(r.value, (e, t) => (U(), I("p", {
			key: t,
			class: "player__caption-line"
		}, K(e), 1))), 128))], 6)) : F("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), It = ["aria-label", "aria-expanded"], Lt = ["aria-label"], Rt = { class: "capmenu__head" }, zt = { class: "capmenu__title" }, Bt = ["aria-label"], Vt = ["aria-checked", "tabindex"], Ht = { class: "capmenu__check" }, Ut = { class: "capmenu__optlabel" }, Wt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Gt = { class: "capmenu__check" }, Kt = { class: "capmenu__optlabel" }, qt = { class: "capmenu__check" }, Jt = { class: "capmenu__optlabel" }, Yt = { class: "capmenu__title capmenu__title--sub" }, Xt = ["aria-label"], Zt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Qt = { class: "capmenu__check" }, $t = { class: "capmenu__optlabel" }, en = { class: "capmenu__title capmenu__title--sub" }, tn = { class: "capmenu__style" }, nn = { class: "capmenu__field" }, rn = { class: "capmenu__fieldlabel" }, an = { class: "capmenu__field" }, on = { class: "capmenu__fieldlabel" }, sn = { class: "capmenu__field" }, cn = { class: "capmenu__fieldlabel" }, ln = { class: "capmenu__field" }, un = { class: "capmenu__fieldlabel" }, dn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		function re(e) {
			u.captionStyle = {
				...u.captionStyle,
				edge: e
			};
		}
		r(m, je(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function k(e) {
			f.value && !f.value.contains(e.target) && x();
		}
		return J(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", k, !0) : document.removeEventListener("pointerdown", k, !0));
		}, { immediate: !0 }), ke(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", k, !0);
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
		}, [z(t, { name: _.value }, null, 8, ["name"])], 10, It), e.open ? (U(), I("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": q(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			L("div", Rt, [L("h3", zt, K(q(d)("player.subtitles")), 1), z(n, {
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
			}, [L("span", Ht, [g.value ? F("", !0) : (U(), P(t, {
				key: 0,
				name: "check"
			}))]), L("span", Ut, K(q(d)("player.off")), 1)], 8, Vt), (U(!0), I(M, null, G(e.tracks, (e, n) => (U(), I("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [L("span", Gt, [h.value === e.language ? (U(), P(t, {
				key: 0,
				name: "check"
			})) : F("", !0)]), L("span", Kt, K(e.label), 1)], 8, Wt))), 128))], 40, Bt),
			L("button", {
				type: "button",
				class: "capmenu__add",
				onClick: ee
			}, [L("span", qt, [z(t, { name: "plus" })]), L("span", Jt, K(q(d)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (U(), I(M, { key: 0 }, [L("h3", Yt, K(q(d)("player.audio")), 1), L("div", {
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
			}, [L("span", Qt, [e.activeAudio === n.index ? (U(), P(t, {
				key: 0,
				name: "check"
			})) : F("", !0)]), L("span", $t, K(n.label), 1)], 8, Zt))), 128))], 40, Xt)], 64)) : F("", !0),
			L("h3", en, K(q(d)("player.captionStyle")), 1),
			L("div", tn, [
				L("div", nn, [L("span", rn, K(q(d)("player.size")), 1), z(O, {
					"model-value": q(u).captionStyle.size,
					options: q(he),
					label: q(d)("player.captionSize"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", an, [L("span", on, K(q(d)("player.color")), 1), z(O, {
					"model-value": q(u).captionStyle.textColor,
					options: q(_e),
					label: q(d)("player.captionColor"),
					"onUpdate:modelValue": te
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", sn, [L("span", cn, K(q(d)("player.background")), 1), z(O, {
					"model-value": q(u).captionStyle.background,
					options: q(xe),
					label: q(d)("player.captionBackground"),
					"onUpdate:modelValue": ne
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				L("div", ln, [L("span", un, K(q(d)("player.edge")), 1), z(O, {
					"model-value": q(u).captionStyle.edge,
					options: q(ye),
					label: q(d)("player.captionEdge"),
					"onUpdate:modelValue": re
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Lt)) : F("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), fn = { class: "subsearch" }, pn = { class: "subsearch__langs" }, mn = { class: "subsearch__legend" }, hn = { class: "subsearch__chips" }, gn = { class: "subsearch__actions" }, _n = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, vn = {
	key: 2,
	class: "subsearch__prompt"
}, yn = {
	key: 3,
	class: "subsearch__list"
}, bn = { class: "subsearch__meta" }, xn = { class: "subsearch__release" }, Sn = { class: "subsearch__signals" }, Cn = { class: "subsearch__provider" }, wn = ["aria-label"], Tn = {
	key: 2,
	class: "subsearch__stat"
}, En = {
	key: 3,
	class: "subsearch__stat"
}, Dn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		function k() {
			i("update:open", !1);
		}
		function A(e) {
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
				let n = Ke([(await O().downloadSubtitle(r.mediaId, {
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
				A(e);
			} finally {
				let e = new Set(b.value);
				e.delete(t), b.value = e;
			}
		}
		return J(() => r.open, (e) => {
			e && (h(), y.value = [], v.value = !1, _.value = !1, b.value = /* @__PURE__ */ new Set(), x.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (n, r) => (U(), P(te, {
			"model-value": e.open,
			title: q(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => i("update:open", e)
		}, {
			footer: Y(() => [z(w, {
				variant: "ghost",
				onClick: k
			}, {
				default: Y(() => [R(K(q(o)("common.close")), 1)]),
				_: 1
			})]),
			default: Y(() => [L("div", fn, [
				L("fieldset", pn, [L("legend", mn, K(q(o)("player.subtitleSearchLanguages")), 1), L("div", hn, [(U(!0), I(M, null, G(f.value, (e) => (U(), P(D, {
					key: e,
					selected: p.value.has(e),
					size: "md",
					"aria-label": d(e),
					"onUpdate:selected": (t) => g(e)
				}, {
					default: Y(() => [R(K(d(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				L("div", gn, [z(w, {
					variant: "solid",
					"left-icon": "search",
					loading: _.value,
					disabled: !E.value,
					onClick: ne
				}, {
					default: Y(() => [R(K(q(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				_.value ? (U(), I("div", _n, [z(C, { label: q(o)("player.subtitleSearching") }, null, 8, ["label"]), L("span", null, K(q(o)("player.subtitleSearching")), 1)])) : v.value && ee.value.length === 0 ? (U(), P(re, {
					key: 1,
					icon: "captions",
					title: q(o)("player.subtitleSearchEmpty"),
					description: q(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : v.value ? (U(), I("ul", yn, [(U(!0), I(M, null, G(ee.value, (e) => (U(), I("li", {
					key: S(e),
					class: "subsearch__item"
				}, [L("div", bn, [L("p", xn, K(e.releaseName || e.provider), 1), L("div", Sn, [
					z(T, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Y(() => [R(K(d(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (U(), P(T, {
						key: 0,
						tone: "info",
						size: "sm",
						label: q(o)("player.subtitleHearingImpairedFull")
					}, {
						default: Y(() => [R(K(q(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : F("", !0),
					L("span", Cn, K(e.provider), 1),
					e.rating > 0 ? (U(), I("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": q(o)("player.subtitleRating", { rating: e.rating })
					}, [z(t, { name: "star" }), R(" " + K(e.rating), 1)], 8, wn)) : F("", !0),
					e.downloadCount > 0 ? (U(), I("span", Tn, K(q(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : F("", !0),
					e.fps ? (U(), I("span", En, K(q(o)("player.subtitleFps", { fps: e.fps })), 1)) : F("", !0)
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
					default: Y(() => [R(K(b.value.has(S(e)) ? q(o)("player.subtitleAdding") : q(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (U(), I("p", vn, K(q(o)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), On = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function kn(e, t, n, r, i, a, o) {
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
		r: On(d / m),
		g: On(f / m),
		b: On(p / m)
	};
}
function An(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: kn(e, t, n, 0, 0, r, n),
		right: kn(e, t, n, t - r, 0, t, n),
		center: kn(e, t, n, 0, 0, t, n)
	};
}
function jn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Mn(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${jn(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${jn(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${jn(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function $(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Nn = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
			r.value = $(i);
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
				c.value = Mn(An(n, 32, 18));
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
		J(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			ee(), e && t && C();
		}, { immediate: !0 }), Ae(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ke(() => {
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
}), [["__scopeId", "data-v-88c68588"]]), Pn = ["aria-label"], Fn = { class: "resume__label" }, In = { class: "resume__time numeric" }, Ln = { class: "resume__actions" }, Rn = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = N(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (U(), I("div", {
			class: "resume",
			role: "region",
			"aria-label": q(i)("player.resumePlayback")
		}, [L("p", Fn, [
			R(K(o.value[0]), 1),
			L("span", In, K(q(Z)(e.seconds)), 1),
			R(K(o.value[1]), 1)
		]), L("div", Ln, [L("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [z(t, { name: "play" }), L("span", null, K(q(i)("player.resume")), 1)]), L("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [z(t, { name: "rewind" }), L("span", null, K(q(i)("player.startOver")), 1)])])], 8, Pn));
	}
}), [["__scopeId", "data-v-271c5209"]]), zn = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Bn = /* @__PURE__ */ new Set([
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
function Vn(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Hn(...e) {
	return e.some((e) => Bn.has(Vn(e)));
}
function Un(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Wn(e) {
	return e?.error?.code === 2;
}
var Gn = 3e4;
function Kn(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && $n.get(t) === "hevc";
}
function qn(e) {
	let t = { forceTranscode: "1" };
	return Kn(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function Jn(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
function Yn(e) {
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
var Xn = 2 * Math.PI * 15;
function Zn(e, t, n = Xn) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Qn = /* @__PURE__ */ new Map([
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
]), $n = /* @__PURE__ */ new Map([
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
]), er = /* @__PURE__ */ new Set(["h264"]), tr = /* @__PURE__ */ new Map([
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
function nr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = $n.get(t);
	return n === void 0 ? "transcode" : er.has(n) ? "direct" : "probe";
}
function rr(e) {
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
var ir = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function ar(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return ir.get(t) ?? "video/mp4";
}
function or(e, t = "video/mp4") {
	let n = Qn.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function sr(e, t = "video/mp4") {
	if (!e) return !0;
	let n = or(e, t);
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
async function cr(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = $n.get(n), i = r === void 0 ? void 0 : tr.get(r);
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
async function lr(e, t, n = "") {
	if (Hn(...e)) return !0;
	let r = e.map((e) => Vn(e)).find((e) => zn.includes(e)) ?? "";
	if (!zn.includes(r)) return !1;
	let i = ar(r), a = nr(n);
	if (a === "transcode" || a === "probe" && !await cr(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await sr(e.codec, i)) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var ur = ["aria-label"], dr = ["src"], fr = { class: "upnext__body" }, pr = { class: "upnext__eyebrow" }, mr = { class: "upnext__title" }, hr = {
	key: 0,
	class: "upnext__cd numeric"
}, gr = { class: "upnext__actions" }, _r = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, vr = ["r"], yr = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], br = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { t: r } = a(), { imgSrc: i } = f(), o = e, s = n, c = N(() => o.posterUrl ?? o.media.poster_url ?? null), l = N(() => Zn(o.remaining, o.total));
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
			}, null, 8, dr)) : F("", !0),
			L("div", fr, [
				L("p", pr, K(q(r)("player.upNext")), 1),
				L("h4", mr, K(e.media.name), 1),
				e.counting ? (U(), I("p", hr, K(q(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : F("", !0),
				L("div", gr, [L("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: a[0] ||= (e) => s("play-now")
				}, [z(t, { name: "play" }), L("span", null, K(q(r)("player.playNow")), 1)]), L("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: a[1] ||= (e) => s("cancel")
				}, K(q(r)("player.cancel")), 1)])
			]),
			e.counting ? (U(), I("svg", _r, [L("circle", {
				cx: "18",
				cy: "18",
				r: q(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, vr), L("circle", {
				cx: "18",
				cy: "18",
				r: q(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": q(Xn),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, yr)])) : F("", !0)
		], 8, ur));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), xr = {
	class: "transcode",
	role: "alert"
}, Sr = { class: "transcode__card" }, Cr = { class: "transcode__heading" }, wr = { class: "transcode__body" }, Tr = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (U(), I("div", xr, [L("div", Sr, [
			z(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			L("h3", Cr, K(q(i)("player.transcodeHeading")), 1),
			L("p", wr, K(e.title ? q(i)("player.transcodeBodyTitled", { title: e.title }) : q(i)("player.transcodeBodyUntitled")), 1),
			L("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [z(t, { name: "arrow-left" }), L("span", null, K(q(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Er = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Dr = { class: "prep__card" }, Or = { class: "prep__heading" }, kr = { class: "prep__body" }, Ar = ["aria-valuenow"], jr = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (U(), I("div", Er, [L("div", Dr, [
			z(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			L("h3", Or, K(q(r)("player.transcodePreparingHeading")), 1),
			L("p", kr, K(e.title ? q(r)("player.transcodePreparingTitled", { title: e.title }) : q(r)("player.transcodePreparingUntitled")), 1),
			L("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [L("div", {
				class: "prep__bar-fill",
				style: H({ width: i() + "%" })
			}, null, 4)], 8, Ar),
			L("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [z(t, { name: "arrow-left" }), L("span", null, K(q(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Mr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		return (e, n) => (U(), P(Te, { name: "skip" }, {
			default: Y(() => [c.value ? (U(), I("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: X(l, ["stop"])
			}, [L("span", null, K(c.value.label), 1), z(t, { name: "skip-forward" })])) : F("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Nr = ["aria-label"], Pr = ["aria-label", "onClick"], Fr = { class: "skip-controls__label" }, Ir = 5, Lr = 30, Rr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
			let n = s(e.startMs), r = n - Ir, i = n + Lr;
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
		return (e, n) => f.value.length > 0 ? (U(), I("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": q(o)("player.skipControls")
		}, [(U(!0), I(M, null, G(f.value, (e) => (U(), I("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: X((t) => p(e), ["stop"])
		}, [L("span", Fr, K(d(e.type)), 1), z(t, { name: "skip-forward" })], 8, Pr))), 128))], 8, Nr)) : F("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), zr = ["aria-label", "aria-expanded"], Br = ["aria-label"], Vr = { class: "chapterlist__head" }, Hr = { class: "chapterlist__title" }, Ur = ["aria-label"], Wr = ["onClick"], Gr = { class: "chapterlist__index" }, Kr = { class: "chapterlist__name" }, qr = { class: "chapterlist__meta" }, Jr = { class: "chapterlist__time" }, Yr = {
	key: 0,
	class: "chapterlist__duration"
}, Xr = {
	key: 1,
	class: "chapterlist__empty"
}, Zr = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		r(p, je(o, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		J(() => o.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), ke(() => {
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
		}, [z(t, { name: "list" })], 10, zr), e.open ? (U(), I("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": q(c)("player.chapterList"),
			tabindex: "-1"
		}, [L("div", Vr, [L("h3", Hr, K(q(c)("player.chapters")), 1), z(n, {
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
			L("span", Gr, K(e.index), 1),
			L("span", Kr, K(e.label), 1),
			L("span", qr, [L("span", Jr, K(e.startLabel), 1), e.durationLabel ? (U(), I("span", Yr, "· " + K(e.durationLabel), 1)) : F("", !0)])
		], 8, Wr)]))), 128))], 8, Ur)) : (U(), I("p", Xr, K(q(c)("player.noChapters")), 1))], 8, Br)) : F("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Qr = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, $r = { class: "marker-timeline__ticks" }, ei = [
	"title",
	"aria-label",
	"onClick"
], ti = { class: "marker-timeline__tooltip" }, ni = { class: "marker-timeline__tooltip-label" }, ri = { class: "marker-timeline__tooltip-time numeric" }, ii = ["onClick"], ai = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		}, [l.value ? (U(), I("div", Qr, [t[0] ||= L("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [L("polygon", { points: "5,3 19,12 5,21" })], -1), R(" " + K(u.value), 1)])) : F("", !0), L("div", $r, [(U(!0), I(M, null, G(s.value, (e) => (U(), I("button", {
			key: e.id,
			type: "button",
			class: V(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: H({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${q(Z)(e.startSec)}`,
			"aria-label": `${e.label} at ${q(Z)(e.startSec)}`,
			onClick: X((t) => d(e), ["stop"])
		}, [L("span", ti, [
			L("span", ni, K(e.label), 1),
			L("span", ri, K(q(Z)(e.startSec)), 1),
			L("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: X((t) => f(e), ["stop"])
			}, " Find similar ", 8, ii)
		])], 14, ei))), 128))])], 2)) : F("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), oi = ["aria-label", "aria-expanded"], si = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, ci = ["aria-label"], li = ["aria-selected", "onClick"], ui = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		return ke(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (U(), I("div", { class: V(["sleep-timer", { "is-active": l.value }]) }, [L("button", {
			type: "button",
			class: V(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : q(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [z(t, { name: "moon" }), l.value ? (U(), I("span", si, K(m(c.value)), 1)) : F("", !0)], 10, oi), z(Te, { name: "dropdown" }, {
			default: Y(() => [h.value ? (U(), I("ul", {
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
			}, K(e.label), 11, li)), 64))], 8, ci)) : F("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), di = {
	key: 0,
	class: "syncplay-overlay"
}, fi = { class: "syncplay-overlay__badge" }, pi = { class: "syncplay-overlay__label" }, mi = { class: "syncplay-overlay__status-label" }, hi = { class: "syncplay-overlay__members" }, gi = { class: "syncplay-overlay__member-count" }, _i = { class: "syncplay-overlay__member-list" }, vi = { class: "syncplay-overlay__member-name" }, yi = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, bi = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = a(), i = Ce(), o = l(), s = N(() => n.apiBase ?? o.value), c = N(() => i.currentRoom?.name ?? "SyncPlay"), u = N(() => i.onlineMembers.length), d = N(() => i.syncStatus), f = N(() => {
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
		return (e, n) => q(i).isInRoom ? (U(), I("div", di, [
			L("div", fi, [z(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), L("span", pi, "SyncPlay: " + K(c.value), 1)]),
			L("div", { class: V(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [z(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), L("span", mi, K(f.value), 1)], 2),
			L("div", hi, [L("span", gi, [z(t, { name: "user" }), R(" " + K(q(r)("syncplay.members", { count: u.value })), 1)]), L("ul", _i, [(U(!0), I(M, null, G(q(i).onlineMembers.slice(0, 5), (e) => (U(), I("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= L("span", { class: "syncplay-overlay__member-dot" }, null, -1), L("span", vi, K(e.name), 1)]))), 128)), q(i).onlineMembers.length > 5 ? (U(), I("li", yi, " +" + K(q(i).onlineMembers.length - 5) + " more ", 1)) : F("", !0)])]),
			z(w, {
				variant: "ghost",
				size: "sm",
				onClick: m
			}, {
				default: Y(() => [R(K(q(r)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), xi = {
	key: 0,
	class: "syncplay-controls"
}, Si = ["aria-label"], Ci = { class: "syncplay-controls__wait-label" }, wi = { class: "syncplay-controls__transport" }, Ti = ["aria-label"], Ei = ["aria-label"], Di = ["aria-label"], Oi = { class: "syncplay-controls__status-label" }, ki = 10, Ai = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let r = e, i = n, { t: o } = a(), s = Ce(), c = l(), u = N(() => r.apiBase ?? c.value), d = W(!1), f = N(() => d.value || s.syncStatus === "re-syncing");
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
			await g(Math.max(0, r.position - ki));
		}
		async function v() {
			await g(Math.min(r.duration, r.position + ki));
		}
		return J(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1);
		}), (n, r) => q(s).isInRoom ? (U(), I("div", xi, [
			f.value ? (U(), I("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": q(o)("syncplay.waitingForMembers")
			}, [z(t, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), L("span", Ci, K(q(o)("syncplay.waitingForMembers")), 1)], 8, Si)) : F("", !0),
			L("div", wi, [
				L("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": q(o)("syncplay.rewind"),
					onClick: _
				}, [z(t, { name: "rewind" })], 8, Ti),
				L("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? q(o)("syncplay.pauseAll") : q(o)("syncplay.playAll"),
					onClick: h
				}, [z(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Ei),
				L("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": q(o)("syncplay.fastForward"),
					onClick: v
				}, [z(t, { name: "forward" })], 8, Di)
			]),
			L("div", { class: V(["syncplay-controls__status", `syncplay-controls__status--${q(s).syncStatus}`]) }, [z(t, {
				name: q(s).syncStatus === "synced" ? "check" : q(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), L("span", Oi, K(q(s).syncStatus === "synced" ? q(o)("syncplay.synced") : q(s).syncStatus === "outOfSync" ? q(o)("syncplay.outOfSync") : q(o)("syncplay.reSyncing")), 1)], 2)
		])) : F("", !0);
	}
}), [["__scopeId", "data-v-3df5b737"]]);
//#endregion
//#region src/utils/subtitleSrc.ts
function ji(e, t) {
	return String(d(e, t));
}
function Mi(e, t) {
	let n = !1, r = t.map((t) => {
		let r = ji(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
//#endregion
//#region src/components/Player.vue?vue&type=script&setup=true&lang.ts
var Ni = { class: "player__stage" }, Pi = ["src", "poster"], Fi = [
	"src",
	"srclang",
	"label"
], Ii = { class: "player__meta" }, Li = ["aria-label"], Ri = { class: "player__meta-text" }, zi = { class: "player__eyebrow" }, Bi = { class: "player__title" }, Vi = { class: "player__sub numeric" }, Hi = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Ui = {
	key: 0,
	class: "player__center"
}, Wi = ["aria-label"], Gi = ["aria-label"], Ki = ["aria-label"], qi = { class: "player__btnrow" }, Ji = ["aria-label"], Yi = ["aria-label"], Xi = ["aria-label"], Zi = { class: "player__time numeric" }, Qi = ["aria-label", "aria-pressed"], $i = ["title"], ea = ["aria-label"], ta = ["aria-label"], na = ["aria-label", "aria-pressed"], ra = ["aria-label", "aria-pressed"], ia = ["aria-label"], aa = { class: "similar-modal" }, oa = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, sa = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, ca = { class: "similar-modal__state-title" }, la = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, ua = {
	key: 3,
	class: "similar-modal__results"
}, da = { class: "similar-modal__poster" }, fa = ["src", "alt"], pa = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, ma = { class: "similar-modal__result-body" }, ha = { class: "similar-modal__result-title" }, ga = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, _a = { key: 0 }, va = /*#__PURE__*/ e(/* @__PURE__ */ B({
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
		let { imgSrc: r } = f(), o = e, c = n, l = p(), u = i(), { t: d } = a(), v = Ce(), y = h(), b = N(() => y.isFavorite(o.media.id)), x = N(() => y.likeLevel(o.media.id));
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
		], T = W(null), E = W(null), D = W(null), O = W(!0), ne = W(!1), re = W(!1), k = W(!1), A = W(!1), ie = W(!1), ae = W(!1), oe = W(null), se = W(null), ce = W(!1), le = m(), ue = W(!1);
		function de(e) {
			le.success(d("syncplay.joinedRoom", { name: e.name }));
		}
		let pe = N(() => A.value ? 1.35 : 1), j = W(Hn(o.streamUrl, o.media.path)), me = N(() => rr(o.media.streams)), he = 0;
		async function _e() {
			let e = ++he;
			if (j.value) return;
			let t = await lr([o.streamUrl, o.media.path], o.playbackAudioTracks ?? [], me.value);
			e === he && (!t || j.value || (j.value = !0, Le(T.value?.currentTime ?? 0)));
		}
		J([() => o.playbackAudioTracks, me], () => {
			_e();
		}, { immediate: !0 });
		let ye = Ee("phlixConfig", null), be = Ee("resumeReporter", null), xe = !1;
		function Te() {
			return ye?.apiBase ?? "";
		}
		let B = st({
			apiBase: () => o.apiBase ?? "",
			hlsConfig: ye?.playerHlsConfig
		}), De = dt({ apiBase: () => o.apiBase ?? "" }), H = null;
		function je(e) {
			H !== null && clearTimeout(H), H = setTimeout(() => {
				H = null, De.fetch(e);
			}, 0);
		}
		let Me = N(() => o.thumbnailAt ?? De.thumbnailAt), Ne = N(() => j.value ? void 0 : o.streamUrl), Pe = N(() => j.value && B.state.value !== "ready"), Fe = N(() => j.value && (B.state.value === "preparing" || B.state.value === "idle")), Ie = N(() => j.value && B.state.value === "error");
		function Le(e = 0) {
			let t = T.value, n = navigator.connection?.downlinkMax, r = et(n);
			t && B.start(t, o.media.id, r, e);
		}
		function Re(e) {
			if (l.quality === "original" && e !== "auto") {
				B.loadVariantPlaylist(Tt);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				B.loadVariantPlaylist(e);
				return;
			}
			B.setLevel(e);
		}
		let ze = !1;
		function Be() {
			u.defaultQuality = wt;
		}
		function Ve() {
			let e = B.levels.value;
			if (e.length === 0) return !1;
			let t = u.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = B.variants.value;
				if (!t || t.length === 0) return !1;
				if (Mt(e, t)) B.loadVariantPlaylist(Tt);
				else {
					let t = jt(e);
					t >= 0 && B.setNextLevel(t), Be();
				}
				return !0;
			}
			let n = kt(e, t);
			return n >= 0 ? B.setNextLevel(n) : Be(), !0;
		}
		J(() => B.levels.value, (e) => {
			ze || e.length === 0 || Ve() && (ze = !0);
		}), J(() => B.variants.value, (e) => {
			ze || !e?.length || Oe(() => {
				ze || Ve() && (ze = !0);
			});
		}, { deep: !0 });
		let Ue = W(l.resumePositionFor(o.media.id) ?? 0), Q = W(!j.value && Ue.value > 0), We = null, Ge = W(!1), Ke = W(8), qe, Je = W(null), Ye = W(0), Xe = W(!1), Ze = W([]), Qe = W(!1), $e = W(null);
		function tt(e, t) {
			Je.value = e, Ye.value = t, Ze.value = [], $e.value = null, Xe.value = !0, ot(e, t);
		}
		let nt = null, rt = null, it = null;
		function at() {
			let e = o.apiBase ?? "";
			return (rt === null || it !== e) && (rt = new s({ baseUrl: e }), it = e), rt;
		}
		async function ot(e, t) {
			nt?.abort(), nt = new AbortController(), Qe.value = !0, $e.value = null;
			try {
				let n = await at().searchByMarker(e, t, 30, 20, nt.signal);
				Ze.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				$e.value = "Failed to load similar media. Please try again.", Ze.value = [];
			} finally {
				Qe.value = !1;
			}
		}
		function ct() {
			nt?.abort(), Xe.value = !1, Ze.value = [], $e.value = null, Je.value = null;
		}
		let lt = N(() => l.upNext);
		function ut() {
			j.value = Hn(o.streamUrl, o.media.path), _e(), Ue.value = l.resumePositionFor(o.media.id) ?? 0, Q.value = !j.value && Ue.value > 0, We = null, gn = !1, nn = !1, $t.value = [], Qt.value = !1, rn = !1, Gt.value = -1, un = null, ze = !1, xe = !1, Lt(), Et = !1, At = 0, Ot = 0, ht(), Ge.value = !1, B.reset(), T.value && (T.value.currentTime = 0), j.value && Le(), je(o.media.id);
		}
		function ft(e) {
			let t = T.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : We = Math.max(0, e));
		}
		function pt() {
			ft(Ue.value), Q.value = !1, T.value?.play()?.catch(() => {});
		}
		function mt() {
			We = null, ft(0), l.clearResume(o.media.id), Q.value = !1, T.value?.play()?.catch(() => {});
		}
		function ht() {
			qe &&= (clearInterval(qe), void 0);
		}
		function gt() {
			Ke.value = 8, ht(), qe = setInterval(() => {
				--Ke.value, Ke.value <= 0 && (ht(), vt());
			}, 1e3);
		}
		function _t() {
			xe || (xe = !0, be?.finish()), ir(), O.value = !0, l.upNext && (Ge.value = !0, u.autoplay && gt());
		}
		function vt() {
			ht(), Ge.value = !1;
			let e = l.next(o.streamUrlFor);
			e && c("play-next", e);
		}
		function yt() {
			ht(), Ge.value = !1;
		}
		function xt() {
			if (j.value) return;
			let e = T.value, t = Wn(e) && (e?.currentTime ?? 0) === 0;
			(Un(e) || t) && (Nt(), Lt(), j.value = !0, Le(e?.currentTime ?? 0));
		}
		let Et = !1, Dt = null, Ot = 0, At = 0;
		function Nt() {
			if (Et) return;
			Et = !0;
			let e = o.media?.id;
			e != null && e !== "" && at().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, qn({ videoCodec: me.value })).catch(() => {});
		}
		function It() {
			if (Dt !== null || Et || j.value) return;
			let e = T.value;
			e && (Ot = Date.now(), At = e.currentTime, Dt = setTimeout(() => {
				Dt = null;
				let e = T.value;
				!e || j.value || Jn(Date.now(), Ot, e.currentTime, At) && (Nt(), j.value = !0, Le(e.currentTime));
			}, Gn));
		}
		function Lt() {
			Dt !== null && (clearTimeout(Dt), Dt = null);
		}
		let Rt = W([]), zt = W([]), Bt = W(-1), Vt = W(!1), Ht = N(() => B.state.value === "ready" && B.audioTracks.value.length > 0), Ut = N(() => B.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Wt = N(() => (o.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Gt = W(-1), Kt = N(() => !Ht.value && !j.value && zt.value.length === 0 && Wt.value.length > 1), qt = N(() => Ht.value ? Ut.value : Kt.value ? Wt.value : zt.value), Jt = N(() => {
			if (Ht.value) return B.currentAudioTrack.value;
			if (Kt.value) {
				if (Gt.value >= 0) return Gt.value;
				let e = (o.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : o.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Bt.value;
		}), Yt = W(!1), Xt = l.subtitleLang, Zt = N(() => {
			let e = o.apiBase ?? "", t = j.value ? B.subtitleTracks.value : Mi(e, o.playbackSubtitleTracks ?? []);
			if ($t.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Mi(e, $t.value), i = new Set(t.map(n)), a = r.filter((e) => !i.has(n(e)));
			return a.length === 0 ? t : [...t, ...a];
		}), Qt = W(!1), $t = W([]), en = N(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(u.defaultSubtitleLang), t(u.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function tn(e) {
			$t.value.some((t) => t.url === e.url) || ($t.value = [...$t.value, e]);
		}
		let nn = !1, rn = !1;
		function an() {
			if (nn) return;
			if (u.subtitlePreferenceSet) {
				nn = !0;
				return;
			}
			let e = Zt.value.find((e) => e.default);
			if (!e) return;
			let t = Rt.value.find((t) => t.language === (e.language || e.label));
			t && (l.setSubtitle(t.language), Xt = t.language, nn = !0);
		}
		function on() {
			if (rn) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = qt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Jt.value;
			r >= 0 && r < t.length || (fn(n), rn = !0);
		}
		let sn = N(() => Rt.value.some((e) => e.language === l.subtitleLang));
		function cn() {
			let e = T.value;
			Rt.value = Se(e), zt.value = ge(e), Bt.value = fe(e), an(), on();
		}
		function ln() {
			if (sn.value) Xt = l.subtitleLang, l.setSubtitle(null);
			else {
				let e = Xt && Rt.value.some((e) => e.language === Xt) ? Xt : Rt.value[0]?.language ?? null;
				l.setSubtitle(e);
			}
			c("captions");
		}
		let un = null;
		function fn(e) {
			if (Ht.value) B.setAudioTrack(e);
			else if (Kt.value) {
				if (e === Jt.value) return;
				Gt.value = e, un = e, j.value = !0, Le(T.value?.currentTime ?? 0);
			} else ve(T.value, e), Bt.value = e;
		}
		J(Ht, (e) => {
			if (!e || un === null) return;
			let t = un;
			un = null, t >= 0 && t < B.audioTracks.value.length && B.setAudioTrack(t);
		}), J(Zt, () => {
			Oe(() => cn());
		}, { deep: !0 });
		let pn = null, mn, hn = N(() => {
			let e = [];
			o.media.year && e.push({ text: String(o.media.year) }), o.media.rating && e.push({
				text: o.media.rating,
				cert: !0
			}), o.media.runtime && e.push({ text: `${o.media.runtime}m` });
			let t = o.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), gn = !1;
		function _n() {
			if (!o.autoplay || gn || Q.value || Pe.value) return;
			let e = T.value;
			if (!e || !e.paused) return;
			gn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, l.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function vn() {
			_n();
		}
		function yn() {
			o.prevEpisode && c("play-episode", o.prevEpisode);
		}
		function bn() {
			o.nextEpisode && c("play-episode", o.nextEpisode);
		}
		function xn() {
			let e = T.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Sn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Cn() {
			l.play(), l.setMediaPositionState(), It();
		}
		function wn() {
			l.pause(), l.setMediaPositionState();
		}
		function Tn() {
			let e = T.value;
			e && (Dt !== null && e.currentTime > At && Lt(), l.updateProgress(e.currentTime, e.duration, Sn(e)), v.isInRoom && v.updateLocalPosition(e.currentTime));
		}
		function En() {
			let e = T.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, We !== null && (e.currentTime = e.duration ? Math.min(e.duration, We) : We, We = null), l.updateProgress(e.currentTime, e.duration, Sn(e)), l.setMediaPositionState(), cn());
		}
		function On() {
			let e = T.value;
			e && l.updateProgress(e.currentTime, e.duration, Sn(e));
		}
		function kn() {
			let e = T.value;
			e && (Math.abs(e.volume - l.volume) > .001 && l.setVolume(e.volume), e.muted !== l.muted && l.toggleMute());
		}
		function An() {
			let e = T.value;
			e && e.playbackRate !== l.rate && l.setRate(e.playbackRate), l.setMediaPositionState();
		}
		function jn() {
			l.setMediaPositionState();
		}
		function Mn() {
			l.setMediaPositionState();
		}
		function $(e) {
			let t = T.value;
			t && l.duration > 0 && (t.currentTime = Math.min(l.duration, Math.max(0, e)));
		}
		function Pn(e) {
			$(l.position + e);
		}
		function Fn() {
			re.value = !0, or();
		}
		function In() {
			re.value = !1, or();
		}
		function Ln(e) {
			let t = w.reduce((e, t, n) => Math.abs(t - l.rate) < Math.abs(w[e] - l.rate) ? n : e, 0), n = w[Math.min(w.length - 1, Math.max(0, t + e))];
			l.setRate(n);
		}
		function zn() {
			if (!o.markers) return;
			let e = l.position, t = o.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Bn() {
			if (!o.markers) return;
			let e = l.position, t = o.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Vn() {
			oe.value?.toggleOpen();
		}
		let Kn = null;
		function Yn() {
			let e = T.value;
			if (!e) {
				l.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), l.pause();
				return;
			}
			Kn !== null && (clearInterval(Kn), Kn = null);
			let t = .05;
			Kn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(Kn), Kn = null, e.volume = 0, e.pause(), l.pause());
			}, 50);
		}
		_({
			playPause: xn,
			seekBy: Pn,
			frameStep: (e) => {
				l.playing || $(l.position + e / 30);
			},
			volumeBy: (e) => l.setVolume(l.volume + e),
			toggleMute: Xn,
			toggleFullscreen: Qn,
			toggleCaptions: ln,
			toggleTheater: Zn,
			togglePip: er,
			skipIntro: zn,
			skipOutro: Bn,
			sleepTimer: Vn,
			seekToPercent: (e) => $(e * l.duration),
			speedStep: Ln,
			toggleHelp: () => {
				k.value = !k.value;
			},
			toggleQuality: () => {
				j.value ? (ce.value = !ce.value, se.value?.toggleMenu?.()) : le.show({
					message: d("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !k.value && !Vt.value && !Yt.value });
		function Xn() {
			l.toggleMute();
		}
		function Zn() {
			A.value = !A.value, c("theater", A.value);
		}
		J(() => l.muted, (e) => {
			let t = T.value;
			t && t.muted !== e && (t.muted = e);
		}), J(() => l.volume, (e) => {
			let t = T.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), J(() => l.rate, (e) => {
			let t = T.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), J(() => l.lastCommand, (e) => {
			e && (e.type === "seekTo" ? ft(e.value) : e.type === "seekBy" && ft(l.position + e.value));
		});
		function Qn() {
			if (typeof document > "u") return;
			let e = E.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function $n() {
			ne.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function er() {
			let e = T.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			c("pip");
		}
		function tr() {
			ie.value = !0;
		}
		function nr() {
			ie.value = !1;
		}
		function ir() {
			mn &&= (clearTimeout(mn), void 0);
		}
		function ar() {
			ir(), !(!l.playing || re.value) && (mn = setTimeout(() => {
				l.playing && !re.value && (O.value = !1);
			}, o.idleTimeout ?? 3e3));
		}
		function or() {
			O.value = !0, ar();
		}
		let sr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", cr = "data-phlix-prev-tabindex", ur = "__phlix_no_tabindex__";
		function dr(e) {
			let t = E.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(sr) ? [n] : Array.from(n.querySelectorAll(sr));
				for (let n of t) if (e) {
					let e = n.getAttribute(cr);
					e === null || e === ur ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(cr);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(cr, n.getAttribute("tabindex") ?? ur), n.setAttribute("tabindex", "-1"));
			}
		}
		J(O, (e) => {
			typeof document > "u" || (dr(e), !e && document.activeElement instanceof HTMLElement && E.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), J(() => l.playing, (e) => {
			e ? (Q.value = !1, yt(), ar()) : (ir(), O.value = !0);
		});
		let fr = null;
		Ae(() => {
			l.setCurrent(o.media, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), y.hydrate(o.media), typeof document < "u" && (document.addEventListener("fullscreenchange", $n), ae.value = document.pictureInPictureEnabled === !0), fr = l.bindMediaSession({
				onPlay: () => void T.value?.play()?.catch(() => {}),
				onPause: () => T.value?.pause(),
				onSeek: (e) => $(e)
			}), pn = T.value?.textTracks ?? null, pn?.addEventListener?.("addtrack", cn), pn?.addEventListener?.("removetrack", cn), cn(), j.value && Le(), je(o.media.id);
		}), J(() => o.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), ut();
		}), J(() => o.media?.id, () => {
			y.hydrate(o.media);
		}), J(() => v.currentSession, (e) => {
			e && (e.state === "playing" ? (T.value?.play(), l.play()) : e.state === "paused" && (T.value?.pause(), l.pause()), v.updateLocalPosition(l.position), Math.abs(v.driftAmount) > 2 && ft(e.playbackPosition));
		});
		let pr = null;
		return J(() => v.pendingPlayMedia, async (e) => {
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
				}), T.value?.play(), l.play(), v.consumePendingPlayMedia(), pr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			pr !== n && (pr = n, c("pending-media", e.mediaId, e.title));
		}), ke(() => {
			be?.reportFinal?.(), ir(), ht(), B.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", $n), fr?.(), pn?.removeEventListener?.("addtrack", cn), pn?.removeEventListener?.("removetrack", cn), Kn !== null && (clearInterval(Kn), Kn = null), H !== null && (clearTimeout(H), H = null), Lt();
		}), (n, i) => (U(), I("div", {
			ref_key: "containerRef",
			ref: E,
			class: V(["player", {
				"is-chrome-hidden": !O.value,
				"is-theater": A.value
			}]),
			onPointermove: or,
			onPointerdown: or,
			onFocusin: or
		}, [z(Nn, {
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
		]), L("div", Ni, [
			L("video", {
				ref_key: "videoRef",
				ref: T,
				class: "player__video",
				src: Ne.value,
				poster: q(r)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Cn,
				onPause: wn,
				onTimeupdate: Tn,
				onLoadedmetadata: En,
				onCanplay: vn,
				onProgress: On,
				onVolumechange: kn,
				onRatechange: An,
				onSeeked: jn,
				onDurationchange: Mn,
				onEnded: _t,
				onError: xt,
				onEnterpictureinpicture: tr,
				onLeavepictureinpicture: nr,
				onClick: xn
			}, [(U(!0), I(M, null, G(Zt.value, (e) => (U(), I("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Fi))), 128))], 40, Pi),
			i[22] ||= L("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[23] ||= L("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			L("div", Ii, [L("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": q(d)("player.back"),
				onClick: i[0] ||= X((e) => c("back"), ["stop"])
			}, [z(t, { name: "arrow-left" })], 8, Li), L("div", Ri, [
				L("p", zi, K(q(d)("player.nowPlaying")), 1),
				L("h2", Bi, K(e.media.name), 1),
				L("div", Vi, [(U(!0), I(M, null, G(hn.value, (e, t) => (U(), I(M, { key: t }, [t > 0 && !e.cert ? (U(), I("span", Hi, "·")) : F("", !0), L("span", { class: V({ player__cert: e.cert }) }, K(e.text), 3)], 64))), 128))])
			])]),
			Pe.value ? F("", !0) : (U(), I("div", Ui, [
				O.value ? (U(), I("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": q(d)("player.seekBackward"),
					onClick: i[1] ||= X((e) => Pn(-10), ["stop"])
				}, [z(t, { name: "rewind" }), L("span", { class: "player__center-skip-count" }, K(10))], 8, Wi)) : F("", !0),
				L("button", {
					type: "button",
					class: V(["player__bigplay", { "is-playing": q(l).playing }]),
					"aria-label": q(l).playing ? q(d)("player.pause") : q(d)("player.play"),
					onClick: X(xn, ["stop"])
				}, [z(t, { name: q(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Gi),
				O.value ? (U(), I("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": q(d)("player.seekForward"),
					onClick: i[2] ||= X((e) => Pn(10), ["stop"])
				}, [z(t, { name: "forward" }), L("span", { class: "player__center-skip-count" }, K(10))], 8, Ki)) : F("", !0)
			])),
			z(Ft, {
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
				onClick: i[9] ||= X(() => {}, ["stop"])
			}, [
				z(He, {
					position: q(l).position,
					duration: q(l).duration,
					buffered: q(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": Me.value,
					onSeek: $,
					onScrubStart: Fn,
					onScrubEnd: In
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				q(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (U(), P(ai, {
					key: 0,
					position: q(l).position,
					duration: q(l).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: tt
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : F("", !0),
				L("div", qi, [
					e.prevEpisode ? (U(), I("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": q(d)("player.previousEpisode"),
						onClick: yn
					}, [z(t, { name: "skip-back" })], 8, Ji)) : F("", !0),
					L("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": q(l).playing ? q(d)("player.pause") : q(d)("player.play"),
						onClick: xn
					}, [z(t, { name: q(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Yi),
					e.nextEpisode ? (U(), I("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": q(d)("player.nextEpisode"),
						onClick: bn
					}, [z(t, { name: "skip-forward" })], 8, Xi)) : F("", !0),
					L("span", Zi, [
						R(K(q(Z)(q(l).position)), 1),
						i[18] ||= L("span", { class: "player__sep" }, " / ", -1),
						R(K(q(Z)(q(l).duration)), 1)
					]),
					i[19] ||= L("span", { class: "player__grow" }, null, -1),
					L("button", {
						type: "button",
						class: V(["player__iconbtn player__favorite", { "is-on": b.value }]),
						"aria-label": b.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": b.value ? "true" : "false",
						onClick: S
					}, [z(t, { name: b.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Qi),
					z(g, {
						level: x.value,
						onCycle: ee
					}, null, 8, ["level"]),
					z(St),
					z(Ct),
					z(Pt, {
						ref_key: "qualityMenuRef",
						ref: se,
						open: ce.value,
						"onUpdate:open": i[3] ||= (e) => ce.value = e,
						levels: q(B).levels.value,
						variants: q(B).variants.value,
						"current-level": q(B).currentLevel.value,
						"auto-enabled": q(B).autoEnabled.value,
						"active-height": q(B).activeLevelHeight.value,
						onSelect: Re
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
					}, K(q(d)("player.directStream")), 9, $i)),
					z(dn, {
						open: Vt.value,
						"onUpdate:open": i[4] ||= (e) => Vt.value = e,
						tracks: Rt.value,
						"audio-tracks": qt.value,
						"active-audio": Jt.value,
						onSelectAudio: fn,
						onAddSubtitles: i[5] ||= (e) => Qt.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					z(Zr, {
						open: Yt.value,
						"onUpdate:open": i[6] ||= (e) => Yt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					z(ui, {
						ref_key: "sleepTimerRef",
						ref: oe,
						"on-expire": Yn
					}, null, 512),
					L("button", {
						type: "button",
						class: V(["player__iconbtn player__syncplay", { "is-on": q(v).isInRoom }]),
						"aria-label": q(v).isInRoom ? q(d)("syncplay.inRoom") : q(d)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[7] ||= (e) => ue.value = !0
					}, [z(t, { name: "user" })], 10, ea),
					L("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": q(d)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[8] ||= (e) => k.value = !0
					}, [z(t, { name: "info" })], 8, ta),
					ae.value ? (U(), I("button", {
						key: 3,
						type: "button",
						class: V(["player__iconbtn", { "is-on": ie.value }]),
						"aria-label": ie.value ? q(d)("player.exitPip") : q(d)("player.pip"),
						"aria-pressed": ie.value,
						onClick: er
					}, [z(t, { name: "pip" })], 10, na)) : F("", !0),
					L("button", {
						type: "button",
						class: V(["player__iconbtn", { "is-on": A.value }]),
						"aria-label": A.value ? q(d)("player.exitTheater") : q(d)("player.theater"),
						"aria-pressed": A.value,
						onClick: Zn
					}, [z(t, { name: "theater" })], 10, ra),
					L("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? q(d)("player.exitFullscreen") : q(d)("player.fullscreen"),
						onClick: Qn
					}, [z(t, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ia)
				])
			], 512)),
			Pe.value ? F("", !0) : (U(), P(Mr, {
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
			Pe.value ? F("", !0) : (U(), P(Rr, {
				key: 3,
				position: q(l).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Q.value && !Pe.value ? (U(), P(Rn, {
				key: 4,
				seconds: Ue.value,
				onResume: pt,
				onRestart: mt
			}, null, 8, ["seconds"])) : F("", !0),
			Ge.value && lt.value && !Pe.value ? (U(), P(br, {
				key: 5,
				media: lt.value,
				remaining: Ke.value,
				total: q(8),
				counting: q(u).autoplay,
				onPlayNow: vt,
				onCancel: yt
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : F("", !0),
			z(te, {
				modelValue: Xe.value,
				"onUpdate:modelValue": i[10] ||= (e) => Xe.value = e,
				title: `Similar ${Je.value ?? "marker"}s`,
				size: "lg",
				onClose: ct
			}, {
				default: Y(() => [L("div", aa, [Qe.value ? (U(), I("div", oa, [z(C, { label: "Finding similar media" })])) : $e.value ? (U(), I("div", sa, [z(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), L("p", ca, K($e.value), 1)])) : !Qe.value && Ze.value.length === 0 ? (U(), I("div", la, [
					z(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[20] ||= L("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[21] ||= L("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (U(), I("ul", ua, [(U(!0), I(M, null, G(Ze.value, (e) => (U(), I("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [L("div", da, [e.poster_url ? (U(), I("img", {
					key: 0,
					src: q(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, fa)) : (U(), I("div", pa, [z(t, { name: "film" })]))]), L("div", ma, [L("p", ha, K(e.name), 1), e.year ? (U(), I("p", ga, [R(K(e.year) + " ", 1), e.runtime ? (U(), I("span", _a, " · " + K(e.runtime) + "m", 1)) : F("", !0)])) : F("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Fe.value ? (U(), P(jr, {
				key: 6,
				title: e.media.name,
				progress: q(B).progress.value,
				onBack: i[11] ||= (e) => c("back")
			}, null, 8, ["title", "progress"])) : F("", !0),
			Ie.value ? (U(), P(Tr, {
				key: 7,
				title: e.media.name,
				onBack: i[12] ||= (e) => c("back")
			}, null, 8, ["title"])) : F("", !0),
			q(v).isInRoom ? (U(), P(Ai, {
				key: 8,
				position: q(l).position,
				duration: q(l).duration,
				"is-playing": q(l).playing,
				onSeek: $,
				onPlay: i[13] ||= (e) => void T.value?.play(),
				onPause: i[14] ||= (e) => void T.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : F("", !0),
			q(v).isInRoom ? (U(), P(bi, { key: 9 })) : F("", !0),
			z(we, {
				modelValue: ue.value,
				"onUpdate:modelValue": i[15] ||= (e) => ue.value = e,
				onJoined: de
			}, null, 8, ["modelValue"]),
			z(bt, {
				open: k.value,
				onClose: i[16] ||= (e) => k.value = !1
			}, null, 8, ["open"]),
			z(Dn, {
				open: Qt.value,
				"onUpdate:open": i[17] ||= (e) => Qt.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": en.value,
				onAdded: tn
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-f5f0773b"]]), ya = { class: "player-page__stage" }, ba = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, xa = { class: "player-page__blocking-error" }, Sa = /*#__PURE__*/ e(/* @__PURE__ */ B({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = l(), { imgSrc: r } = f(), i = u(), a = Pe(), o = Fe(), d = Ee("phlixConfig", null), m = p(), g = h(), _ = y(), v = W(null), b = W(""), x = W([]), S = W(null), C = W(null), T = W([]), E = W([]), D = W(!0), O = W(null), A = W(!1), ie = W(null), fe = W(!1), pe = W(null), j = W(null), me = N(() => String(a.params.id ?? ""));
		ee(() => v.value?.name);
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
				m.setQueue([]);
				return;
			}
			try {
				let o = k(n.value, {
					genres: [a],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, r.controller?.signal);
				if (i()) return;
				m.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || be(e)) return;
				m.setQueue([]);
			}
		}
		async function M(e, t, r) {
			let i = k(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function Te(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function B(e, t) {
			pe.value = se(e, t), j.value = ce(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && m.setQueue(r);
		}
		function De(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function Oe(e, n, r) {
			if (pe.value = null, j.value = null, !Ce(n)) return;
			let i = De(n.id);
			if (i) {
				B(i, n.id);
				return;
			}
			let a = () => ye(r);
			try {
				let i = await Te(e, n, r.controller?.signal);
				if (a()) return;
				let o = await M(e, i.id, r.controller?.signal);
				if (a()) return;
				if (oe(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => M(e, t.id, r.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = ae(o);
				s.length && t.set(i.id, s), B(s, n.id);
			} catch (e) {
				if (a() || be(e)) return;
				pe.value = null, j.value = null;
			}
		}
		async function G() {
			let e = me.value;
			ge?.abort(), ge = typeof AbortController < "u" ? new AbortController() : null, ve += 1;
			let t = {
				generation: ve,
				controller: ge
			};
			if (D.value = !0, O.value = null, x.value = [], S.value = null, C.value = null, T.value = [], E.value = [], pe.value = null, j.value = null, m.hideMiniPlayer(), !e) {
				O.value = "No media id provided", D.value = !1;
				return;
			}
			let r = new s({ baseUrl: n.value });
			r.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, t.controller?.signal).then((e) => {
				ye(t) || (x.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), S.value = Se(e?.intro_marker), C.value = Se(e?.outro_marker), T.value = Yn(e?.audio_tracks), E.value = Ke(e?.subtitle_tracks));
			}).catch(() => null);
			let i = le(e), a = Date.now();
			if (i && ue(i, a)) {
				je(r, i.item, t);
				return;
			}
			let o = null;
			try {
				o = (await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t.controller?.signal)).item;
			} catch (e) {
				if (ye(t) || be(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = Le(e.body, d?.locale);
					if (t !== null) {
						ie.value = t, fe.value = !0, D.value = !1;
						return;
					}
				}
				if (i) {
					je(r, i.item, t);
					return;
				}
				O.value = e instanceof Error ? e.message : "Failed to load media", D.value = !1;
				return;
			}
			if (!ye(t)) {
				if (!o) {
					if (i) {
						je(r, i.item, t);
						return;
					}
					O.value = "Failed to load media item", D.value = !1;
					return;
				}
				de(e, o, a), je(r, o, t);
			}
		}
		async function je(e, t, n) {
			v.value = t, g.hydrate(t), b.value = xe(t), D.value = !1, !(Ce(t) && (await Oe(e, t, n), ye(n) || j.value)) && we(e, t, n);
		}
		Ae(G), J(me, G), Ne(() => {
			m.current && m.streamUrl && m.showMiniPlayer();
		}), ke(() => {
			_e = !0, ge?.abort(), ge = null, _.reset();
		});
		function Me() {
			o?.back();
		}
		function X(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ie(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Z(e) {
			A.value = e, _.setTheaterActive(e);
		}
		function Re() {
			fe.value = !1, Me();
		}
		return (e, t) => (U(), I("div", { class: V(["player-page", { "is-theater": A.value }]) }, [
			he.value && !D.value && !O.value ? (U(), I("div", {
				key: 0,
				class: "player-page__ambient",
				style: H(he.value),
				"aria-hidden": "true"
			}, null, 4)) : F("", !0),
			L("div", ya, [D.value ? (U(), I("div", ba, [z(ne, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : O.value ? (U(), P(re, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: O.value
			}, {
				actions: Y(() => [z(w, {
					variant: "solid",
					onClick: G
				}, {
					default: Y(() => [...t[1] ||= [R("Retry", -1)]]),
					_: 1
				}), z(w, {
					variant: "ghost",
					onClick: Me
				}, {
					default: Y(() => [...t[2] ||= [R("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : v.value ? (U(), P(va, {
				key: 2,
				media: v.value,
				"stream-url": b.value,
				"stream-url-for": xe,
				"api-base": q(n),
				chapters: x.value,
				"intro-marker": S.value,
				"outro-marker": C.value,
				"playback-audio-tracks": T.value,
				"playback-subtitle-tracks": E.value,
				"prev-episode": pe.value,
				"next-episode": j.value,
				autoplay: !0,
				onBack: Me,
				onPlayNext: X,
				onPlayEpisode: Ie,
				onTheater: Z
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
				modelValue: fe.value,
				"onUpdate:modelValue": t[0] ||= (e) => fe.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Y(() => [z(w, {
					variant: "solid",
					onClick: Re
				}, {
					default: Y(() => [...t[3] ||= [R("OK", -1)]]),
					_: 1
				})]),
				default: Y(() => [L("p", xa, K(ie.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-dc0d3b16"]]);
//#endregion
export { Sa as default };

//# sourceMappingURL=PlayerPage-BAxWiTto.js.map