import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-BlNXxmNP.js";
import { t as n } from "./IconButton-BI0oqPNk.js";
import { t as r } from "./useFocusTrap-DvFIVWQz.js";
import { a as i } from "./usePreferencesStore-CFPikE8Z.js";
import { t as a } from "./useMessages-CzF8Lxyp.js";
import { l as o, t as s, u as c } from "./client-BoVYipAG.js";
import { n as l, r as u } from "./useApiBase-CV_r-Kk4.js";
import { r as d, t as f } from "./useImageSrc-KnN1T9Ga.js";
import { i as p } from "./usePlayerStore-DhgapSoa.js";
import { t as m } from "./useToastStore-BDoKlU6N.js";
import { n as h, t as g } from "./ThumbRating-CeN5cs1K.js";
import { a as _, n as v, o as y, r as b, s as x, t as S } from "./shortcuts-Ck2yBFUB.js";
import { t as C } from "./Spinner-CbyAsXDA.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as w } from "./Button-BL3fV7FU.js";
import { t as T } from "./Badge-DbdgvC-x.js";
import { t as E } from "./Slider-LnnvB5jy.js";
import { t as D } from "./Chip-BJXvFc2X.js";
import { t as O } from "./Select-sAC20h0R.js";
import { t as te } from "./Modal-d2UIV8Ln.js";
import { t as ne } from "./Skeleton-jlFj-j5t.js";
import { t as k } from "./EmptyState-BwwPJtFd.js";
import { n as A } from "./media-query-DKjhlX8r.js";
import { i as j, o as re } from "./errors-DYDTeHIA.js";
import { n as ie, o as ae, r as oe, t as se } from "./episode-order-C2yqgMeX.js";
import { n as ce, r as le, t as ue } from "./useMediaItemCache-BKCJnCbr.js";
import { a as de, c as fe, d as M, f as pe, i as me, l as he, n as ge, o as _e, r as ve, s as ye, t as be, u as xe } from "./captions-DoP7ce5A.js";
import { n as Se, t as Ce } from "./SyncPlayModal-C5SYb5s_.js";
import { Fragment as N, Transition as we, computed as P, createBlock as F, createCommentVNode as I, createElementBlock as L, createElementVNode as R, createTextVNode as z, createVNode as B, defineComponent as V, inject as Te, mergeModels as Ee, nextTick as De, normalizeClass as H, normalizeStyle as U, onBeforeUnmount as Oe, onMounted as ke, openBlock as W, ref as G, renderList as K, toDisplayString as q, toRef as Ae, unref as J, useModel as je, watch as Y, withCtx as X, withModifiers as Z } from "vue";
import { onBeforeRouteLeave as Me, useRoute as Ne, useRouter as Pe } from "vue-router";
function Fe(e, t) {
	if (typeof e != "object" || !e) return null;
	let n = e[t];
	return typeof n == "string" && n !== "" ? n : null;
}
function Ie(e, t) {
	let n = Fe(e, "code");
	if (n !== null && re(n)) return j(n, t);
	let r = Fe(e, "error");
	return r === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : r === "StreamLimitExceeded" ? "Stream limit reached. Stop another stream to continue watching." : null;
}
//#endregion
//#region src/components/player/format-time.ts
function Le(e) {
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
], ze = { class: "scrubber__track" }, Be = ["title"], Ve = { class: "scrubber__time numeric" }, He = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			"aria-valuetext": J(Le)(e.position),
			"aria-label": J(r)("player.seek"),
			onPointerdown: C,
			onPointermove: ee,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: T,
			onPointerleave: E,
			onKeydown: D
		}, [R("div", ze, [
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
			}, null, 12, Be))), 128)),
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
		}, null, 4)) : I("", !0), R("span", Ve, q(J(Le)(_.value)), 1)], 4)) : I("", !0)], 40, Re));
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
			url: ot(n, e.url)
		}));
	}
	let S = e.attach ?? x, C = e.pollIntervalMs ?? 1e3, ee = e.maxWaitMs ?? 12e4, w = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), T = Math.max(1, Math.ceil(ee / Math.max(1, C))), E = ct(), D = e.getToken ?? (() => lt(E)), O = null, te = null, ne = null, k = !1, A = null;
	function j() {
		return e.client ?? new s({
			baseUrl: e.apiBase(),
			tokenStore: E ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function re(i, a, o, s) {
		ce(), k = !1, A = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = j(), c = nt(await r.post(Je(a, o), void 0, A.signal));
			if (k) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			b(c.subtitles), y(c.variants), f.value = c.jobId, m.value = ot(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < T; e++) {
				let e = rt(await r.get(tt(c.jobId), void 0, A.signal));
				if (k) return;
				if (n.value = e.progress, b(e.subtitles), y(e.variants), at(e.status)) throw Error(`transcode ${e.status}`);
				if (it(e)) {
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
		let i = r.frame, a = i % ut, s = Math.floor(i / ut), c = a / 9 * 100, l = s / 5 * 100;
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
var ft = ["aria-label"], pt = { class: "shortcuts__head" }, mt = { class: "shortcuts__title" }, ht = { class: "shortcuts__grid" }, gt = { class: "shortcuts__keys" }, _t = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, vt = {
	key: 1,
	class: "shortcuts__key"
}, yt = { class: "shortcuts__label" }, bt = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => b }
	},
	emits: ["close"],
	setup(e, { emit: i }) {
		let o = e, s = i, { t: c } = a(), l = G(null);
		return r(l, Ae(o, "open"), {
			lockScroll: !1,
			onEscape: () => (s("close"), !0)
		}), (r, i) => e.open ? (W(), L("div", {
			key: 0,
			class: "shortcuts",
			onClick: i[1] ||= Z((e) => s("close"), ["self"])
		}, [R("div", {
			ref_key: "panelEl",
			ref: l,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(c)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [R("div", pt, [R("h3", mt, q(J(c)("player.keyboard")), 1), B(n, {
			name: "x",
			label: J(c)("common.close"),
			size: "sm",
			onClick: i[0] ||= (e) => s("close")
		}, null, 8, ["label"])]), R("ul", ht, [(W(!0), L(N, null, K(e.shortcuts, (e) => (W(), L("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [R("span", gt, [(W(!0), L(N, null, K(e.keys, (e, n) => (W(), L(N, { key: n }, [e === "–" ? (W(), L("span", _t, "–")) : (W(), L("kbd", vt, [J(S)[e] ? (W(), F(t, {
			key: 0,
			name: J(S)[e],
			label: J(v)[e] ?? e
		}, null, 8, ["name", "label"])) : (W(), L(N, { key: 1 }, [z(q(e), 1)], 64))]))], 64))), 128))]), R("span", yt, q(e.label), 1)]))), 128))])], 8, ft)])) : I("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), xt = { class: "volume" }, St = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "VolumeControl",
	setup(e) {
		let t = p(), r = i(), { t: o } = a(), s = P(() => t.muted ? 0 : t.volume), c = P(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function l(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Y(() => t.volume, (e) => {
			r.defaultVolume = e;
		}), (e, r) => (W(), L("div", xt, [B(n, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), Ct = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
var Pt = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "QualityMenu",
	props: /*@__PURE__*/ Ee({
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
	emits: /*@__PURE__*/ Ee(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, o = je(e, "open"), s = G(null);
		function c() {
			s.value?.toggleMenu();
		}
		let l = n, u = p(), d = i(), { t: f } = a(), m = P(() => Ot(r.levels)), h = P(() => {
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
		}), g = P(() => m.value.length >= 2 ? m.value : h.value), _ = P(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = P(() => At(r.levels, _.value)), y = P(() => _.value && v.value >= 0 ? {
			value: Tt,
			label: f("player.qualityOriginal", { height: _.value.height })
		} : null), b = P(() => g.value.length >= 2), x = P(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: Dt(r.activeHeight) })), S = P(() => [
			{
				value: wt,
				label: x.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), C = P(() => r.autoEnabled ? wt : y.value && r.currentLevel === v.value && (u.quality === "original" || d.defaultQuality === "original") ? Tt : Nt(r.levels, r.currentLevel));
		function ee(e) {
			let t = String(e);
			if (t === "auto") {
				u.setQuality(t), d.defaultQuality = t, l("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : kt(r.levels, t);
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
}), [["__scopeId", "data-v-58498bdd"]]), Ft = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = G([]), i = G(0), a = P(() => n.lifted ? i.value : 0), o = P(() => ({
			...fe(n.styleConfig),
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
		Y(() => n.controlsRoot, u, { immediate: !0 }), Oe(l);
		let d = null, f = null, p = null;
		function m() {
			r.value = M(d);
		}
		function h() {
			p != null && (clearTimeout(p), p = null);
		}
		function g() {
			h(), p = setTimeout(() => {
				if (p = null, !d) return;
				ye(n.video, n.language);
				let e = M(d);
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
			_(), ye(n.video, n.language);
			let e = pe(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = M(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return Y(() => [n.video, n.language], y, { immediate: !0 }), Oe(_), t({ lines: r }), (t, n) => r.value.length ? (W(), L("div", {
			key: 0,
			class: H(["player__captions", { "is-lifted": e.lifted }]),
			style: U(o.value)
		}, [(W(!0), L(N, null, K(r.value, (e, t) => (W(), L("p", {
			key: t,
			class: "player__caption-line"
		}, q(e), 1))), 128))], 6)) : I("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), It = ["aria-label", "aria-expanded"], Lt = ["aria-label"], Rt = { class: "capmenu__head" }, zt = { class: "capmenu__title" }, Bt = ["aria-label"], Vt = ["aria-checked", "tabindex"], Ht = { class: "capmenu__check" }, Ut = { class: "capmenu__optlabel" }, Wt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Gt = { class: "capmenu__check" }, Kt = { class: "capmenu__optlabel" }, qt = { class: "capmenu__check" }, Jt = { class: "capmenu__optlabel" }, Yt = { class: "capmenu__title capmenu__title--sub" }, Xt = ["aria-label"], Zt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Qt = { class: "capmenu__check" }, $t = { class: "capmenu__optlabel" }, en = { class: "capmenu__title capmenu__title--sub" }, tn = { class: "capmenu__style" }, nn = { class: "capmenu__field" }, rn = { class: "capmenu__fieldlabel" }, an = { class: "capmenu__field" }, on = { class: "capmenu__fieldlabel" }, sn = { class: "capmenu__field" }, cn = { class: "capmenu__fieldlabel" }, ln = { class: "capmenu__field" }, un = { class: "capmenu__fieldlabel" }, dn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		r(m, Ae(s, "open"), {
			lockScroll: !1,
			onEscape: () => (x(), !0)
		});
		function A(e) {
			f.value && !f.value.contains(e.target) && x();
		}
		return Y(() => s.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", A, !0) : document.removeEventListener("pointerdown", A, !0));
		}, { immediate: !0 }), Oe(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", A, !0);
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
		}, [B(t, { name: _.value }, null, 8, ["name"])], 10, It), e.open ? (W(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: m,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(d)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			R("div", Rt, [R("h3", zt, q(J(d)("player.subtitles")), 1), B(n, {
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
			}, [R("span", Ht, [g.value ? I("", !0) : (W(), F(t, {
				key: 0,
				name: "check"
			}))]), R("span", Ut, q(J(d)("player.off")), 1)], 8, Vt), (W(!0), L(N, null, K(e.tracks, (e, n) => (W(), L("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": h.value === e.language,
				tabindex: v.value === n + 1 ? 0 : -1,
				onClick: (t) => S(e.language)
			}, [R("span", Gt, [h.value === e.language ? (W(), F(t, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", Kt, q(e.label), 1)], 8, Wt))), 128))], 40, Bt),
			R("button", {
				type: "button",
				class: "capmenu__add",
				onClick: ee
			}, [R("span", qt, [B(t, { name: "plus" })]), R("span", Jt, q(J(d)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (W(), L(N, { key: 0 }, [R("h3", Yt, q(J(d)("player.audio")), 1), R("div", {
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
			}, [R("span", Qt, [e.activeAudio === n.index ? (W(), F(t, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", $t, q(n.label), 1)], 8, Zt))), 128))], 40, Xt)], 64)) : I("", !0),
			R("h3", en, q(J(d)("player.captionStyle")), 1),
			R("div", tn, [
				R("div", nn, [R("span", rn, q(J(d)("player.size")), 1), B(O, {
					"model-value": J(u).captionStyle.size,
					options: J(me),
					label: J(d)("player.captionSize"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", an, [R("span", on, q(J(d)("player.color")), 1), B(O, {
					"model-value": J(u).captionStyle.textColor,
					options: J(ge),
					label: J(d)("player.captionColor"),
					"onUpdate:modelValue": te
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", sn, [R("span", cn, q(J(d)("player.background")), 1), B(O, {
					"model-value": J(u).captionStyle.background,
					options: J(be),
					label: J(d)("player.captionBackground"),
					"onUpdate:modelValue": ne
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", ln, [R("span", un, q(J(d)("player.edge")), 1), B(O, {
					"model-value": J(u).captionStyle.edge,
					options: J(ve),
					label: J(d)("player.captionEdge"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Lt)) : I("", !0)], 512));
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
}, Dn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		function j(e) {
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
				j(e);
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
				onClick: A
			}, {
				default: X(() => [z(q(J(o)("common.close")), 1)]),
				_: 1
			})]),
			default: X(() => [R("div", fn, [
				R("fieldset", pn, [R("legend", mn, q(J(o)("player.subtitleSearchLanguages")), 1), R("div", hn, [(W(!0), L(N, null, K(f.value, (e) => (W(), F(D, {
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
				R("div", gn, [B(w, {
					variant: "solid",
					"left-icon": "search",
					loading: _.value,
					disabled: !E.value,
					onClick: ne
				}, {
					default: X(() => [z(q(J(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				_.value ? (W(), L("div", _n, [B(C, { label: J(o)("player.subtitleSearching") }, null, 8, ["label"]), R("span", null, q(J(o)("player.subtitleSearching")), 1)])) : v.value && ee.value.length === 0 ? (W(), F(k, {
					key: 1,
					icon: "captions",
					title: J(o)("player.subtitleSearchEmpty"),
					description: J(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : v.value ? (W(), L("ul", yn, [(W(!0), L(N, null, K(ee.value, (e) => (W(), L("li", {
					key: S(e),
					class: "subsearch__item"
				}, [R("div", bn, [R("p", xn, q(e.releaseName || e.provider), 1), R("div", Sn, [
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
					R("span", Cn, q(e.provider), 1),
					e.rating > 0 ? (W(), L("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": J(o)("player.subtitleRating", { rating: e.rating })
					}, [B(t, { name: "star" }), z(" " + q(e.rating), 1)], 8, wn)) : I("", !0),
					e.downloadCount > 0 ? (W(), L("span", Tn, q(J(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : I("", !0),
					e.fps ? (W(), L("span", En, q(J(o)("player.subtitleFps", { fps: e.fps })), 1)) : I("", !0)
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
				])]))), 128))])) : (W(), L("p", vn, q(J(o)("player.subtitleSearchPrompt")), 1))
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
var Nn = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			r.value = $(i);
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
		Y(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			ee(), e && t && C();
		}, { immediate: !0 }), ke(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Oe(() => {
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
}), [["__scopeId", "data-v-88c68588"]]), Pn = ["aria-label"], Fn = { class: "resume__label" }, In = { class: "resume__time numeric" }, Ln = { class: "resume__actions" }, Rn = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a(), o = P(() => i("player.resumeFrom").split("{time}"));
		return (n, a) => (W(), L("div", {
			class: "resume",
			role: "region",
			"aria-label": J(i)("player.resumePlayback")
		}, [R("p", Fn, [
			z(q(o.value[0]), 1),
			R("span", In, q(J(Le)(e.seconds)), 1),
			z(q(o.value[1]), 1)
		]), R("div", Ln, [R("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => r("resume")
		}, [B(t, { name: "play" }), R("span", null, q(J(i)("player.resume")), 1)]), R("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => r("restart")
		}, [B(t, { name: "rewind" }), R("span", null, q(J(i)("player.startOver")), 1)])])], 8, Pn));
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
], br = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { t: r } = a(), { imgSrc: i } = f(), o = e, s = n, c = P(() => o.posterUrl ?? o.media.poster_url ?? null), l = P(() => Zn(o.remaining, o.total));
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
			}, null, 8, dr)) : I("", !0),
			R("div", fr, [
				R("p", pr, q(J(r)("player.upNext")), 1),
				R("h4", mr, q(e.media.name), 1),
				e.counting ? (W(), L("p", hr, q(J(r)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : I("", !0),
				R("div", gr, [R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: a[0] ||= (e) => s("play-now")
				}, [B(t, { name: "play" }), R("span", null, q(J(r)("player.playNow")), 1)]), R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: a[1] ||= (e) => s("cancel")
				}, q(J(r)("player.cancel")), 1)])
			]),
			e.counting ? (W(), L("svg", _r, [R("circle", {
				cx: "18",
				cy: "18",
				r: J(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, vr), R("circle", {
				cx: "18",
				cy: "18",
				r: J(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": J(Xn),
				"stroke-dashoffset": l.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, yr)])) : I("", !0)
		], 8, ur));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), xr = {
	class: "transcode",
	role: "alert"
}, Sr = { class: "transcode__card" }, Cr = { class: "transcode__heading" }, wr = { class: "transcode__body" }, Tr = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n, { t: i } = a();
		return (n, a) => (W(), L("div", xr, [R("div", Sr, [
			B(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			R("h3", Cr, q(J(i)("player.transcodeHeading")), 1),
			R("p", wr, q(e.title ? J(i)("player.transcodeBodyTitled", { title: e.title }) : J(i)("player.transcodeBodyUntitled")), 1),
			R("button", {
				type: "button",
				class: "transcode__back",
				onClick: a[0] ||= (e) => r("back")
			}, [B(t, { name: "arrow-left" }), R("span", null, q(J(i)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Er = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Dr = { class: "prep__card" }, Or = { class: "prep__heading" }, kr = { class: "prep__body" }, Ar = ["aria-valuenow"], jr = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let n = e, { t: r } = a(), i = () => Math.max(0, Math.min(100, Math.round(n.progress ?? 0)));
		return (n, a) => (W(), L("div", Er, [R("div", Dr, [
			B(t, {
				name: "spinner",
				class: "prep__spinner"
			}),
			R("h3", Or, q(J(r)("player.transcodePreparingHeading")), 1),
			R("p", kr, q(e.title ? J(r)("player.transcodePreparingTitled", { title: e.title }) : J(r)("player.transcodePreparingUntitled")), 1),
			R("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": i(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [R("div", {
				class: "prep__bar-fill",
				style: U({ width: i() + "%" })
			}, null, 4)], 8, Ar),
			R("button", {
				type: "button",
				class: "prep__back",
				onClick: a[0] ||= (e) => n.$emit("back")
			}, [B(t, { name: "arrow-left" }), R("span", null, q(J(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Mr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		return (e, n) => (W(), F(we, { name: "skip" }, {
			default: X(() => [c.value ? (W(), L("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Z(l, ["stop"])
			}, [R("span", null, q(c.value.label), 1), B(t, { name: "skip-forward" })])) : I("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Nr = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, Pr = ["aria-label", "onClick"], Fr = { class: "skip-controls__label" }, Ir = 5, Lr = 30, Rr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let f = P(() => !r.markers || r.markers.length === 0 ? [] : r.markers.filter((e) => u.includes(e.type) && l(e, r.position)).sort((e, t) => e.startMs - t.startMs));
		function p(e) {
			i("skip", s(e.startMs));
		}
		return (e, n) => f.value.length > 0 ? (W(), L("div", Nr, [(W(!0), L(N, null, K(f.value, (e) => (W(), L("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${d(e.type)}`,
			onClick: Z((t) => p(e), ["stop"])
		}, [R("span", Fr, q(d(e.type)), 1), B(t, { name: "skip-forward" })], 8, Pr))), 128))])) : I("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), zr = ["aria-label", "aria-expanded"], Br = ["aria-label"], Vr = { class: "chapterlist__head" }, Hr = { class: "chapterlist__title" }, Ur = ["aria-label"], Wr = ["onClick"], Gr = { class: "chapterlist__index" }, Kr = { class: "chapterlist__name" }, qr = { class: "chapterlist__meta" }, Jr = { class: "chapterlist__time" }, Yr = {
	key: 0,
	class: "chapterlist__duration"
}, Xr = {
	key: 1,
	class: "chapterlist__empty"
}, Zr = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Le(e.start), a;
			return e.end != null && e.end > e.start && (a = Le(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), f = G(null), p = G(null);
		r(p, Ae(o, "open"), {
			lockScroll: !1,
			onEscape: () => (l(), !0)
		});
		function m(e) {
			f.value && !f.value.contains(e.target) && l();
		}
		Y(() => o.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", m, !0) : document.removeEventListener("pointerdown", m, !0));
		}), Oe(() => {
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
		}, [B(t, { name: "list" })], 10, zr), e.open ? (W(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: p,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": J(c)("player.chapterList"),
			tabindex: "-1"
		}, [R("div", Vr, [R("h3", Hr, q(J(c)("player.chapters")), 1), B(n, {
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
			R("span", Gr, q(e.index), 1),
			R("span", Kr, q(e.label), 1),
			R("span", qr, [R("span", Jr, q(e.startLabel), 1), e.durationLabel ? (W(), L("span", Yr, "· " + q(e.durationLabel), 1)) : I("", !0)])
		], 8, Wr)]))), 128))], 8, Ur)) : (W(), L("p", Xr, q(J(c)("player.noChapters")), 1))], 8, Br)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Qr = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, $r = { class: "marker-timeline__ticks" }, ei = [
	"title",
	"aria-label",
	"onClick"
], ti = { class: "marker-timeline__tooltip" }, ni = { class: "marker-timeline__tooltip-label" }, ri = { class: "marker-timeline__tooltip-time numeric" }, ii = ["onClick"], ai = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		}, [l.value ? (W(), L("div", Qr, [t[0] ||= R("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [R("polygon", { points: "5,3 19,12 5,21" })], -1), z(" " + q(u.value), 1)])) : I("", !0), R("div", $r, [(W(!0), L(N, null, K(s.value, (e) => (W(), L("button", {
			key: e.id,
			type: "button",
			class: H(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: U({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${J(Le)(e.startSec)}`,
			"aria-label": `${e.label} at ${J(Le)(e.startSec)}`,
			onClick: Z((t) => d(e), ["stop"])
		}, [R("span", ti, [
			R("span", ni, q(e.label), 1),
			R("span", ri, q(J(Le)(e.startSec)), 1),
			R("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Z((t) => f(e), ["stop"])
			}, " Find similar ", 8, ii)
		])], 14, ei))), 128))])], 2)) : I("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), oi = ["aria-label", "aria-expanded"], si = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, ci = ["aria-label"], li = ["aria-selected", "onClick"], ui = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		return Oe(() => {
			d();
		}), n({ toggleOpen: g }), (e, n) => (W(), L("div", { class: H(["sleep-timer", { "is-active": l.value }]) }, [R("button", {
			type: "button",
			class: H(["sleep-timer__trigger", { "is-active": l.value }]),
			"aria-label": l.value ? `Sleep timer: ${m(c.value)} remaining` : J(i)("player.sleepTimer"),
			"aria-expanded": h.value,
			"aria-haspopup": "listbox",
			onClick: g
		}, [B(t, { name: "moon" }), l.value ? (W(), L("span", si, q(m(c.value)), 1)) : I("", !0)], 10, oi), B(we, { name: "dropdown" }, {
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
			}, q(e.label), 11, li)), 64))], 8, ci)) : I("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), di = {
	key: 0,
	class: "syncplay-overlay"
}, fi = { class: "syncplay-overlay__badge" }, pi = { class: "syncplay-overlay__label" }, mi = { class: "syncplay-overlay__status-label" }, hi = { class: "syncplay-overlay__members" }, gi = { class: "syncplay-overlay__member-count" }, _i = { class: "syncplay-overlay__member-list" }, vi = { class: "syncplay-overlay__member-name" }, yi = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, bi = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let n = e, { t: r } = a(), i = Se(), o = l(), s = P(() => n.apiBase ?? o.value), c = P(() => i.currentRoom?.name ?? "SyncPlay"), u = P(() => i.onlineMembers.length), d = P(() => i.syncStatus), f = P(() => {
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
		return (e, n) => J(i).isInRoom ? (W(), L("div", di, [
			R("div", fi, [B(t, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), R("span", pi, "SyncPlay: " + q(c.value), 1)]),
			R("div", { class: H(["syncplay-overlay__status", `syncplay-overlay__status--${d.value}`]) }, [B(t, {
				name: p.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), R("span", mi, q(f.value), 1)], 2),
			R("div", hi, [R("span", gi, [B(t, { name: "user" }), z(" " + q(J(r)("syncplay.members", { count: u.value })), 1)]), R("ul", _i, [(W(!0), L(N, null, K(J(i).onlineMembers.slice(0, 5), (e) => (W(), L("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= R("span", { class: "syncplay-overlay__member-dot" }, null, -1), R("span", vi, q(e.name), 1)]))), 128)), J(i).onlineMembers.length > 5 ? (W(), L("li", yi, " +" + q(J(i).onlineMembers.length - 5) + " more ", 1)) : I("", !0)])]),
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
}), [["__scopeId", "data-v-3f63f0ac"]]), xi = {
	key: 0,
	class: "syncplay-controls"
}, Si = ["aria-label"], Ci = { class: "syncplay-controls__wait-label" }, wi = { class: "syncplay-controls__transport" }, Ti = ["aria-label"], Ei = ["aria-label"], Di = ["aria-label"], Oi = { class: "syncplay-controls__status-label" }, ki = 10, Ai = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let r = e, i = n, { t: o } = a(), s = Se(), c = l(), u = P(() => r.apiBase ?? c.value), d = G(!1), f = P(() => d.value || s.syncStatus === "re-syncing");
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
		return Y(() => s.syncStatus, (e) => {
			e === "re-syncing" ? d.value = !0 : e === "synced" && (d.value = !1);
		}), (n, r) => J(s).isInRoom ? (W(), L("div", xi, [
			f.value ? (W(), L("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": J(o)("syncplay.waitingForMembers")
			}, [B(t, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), R("span", Ci, q(J(o)("syncplay.waitingForMembers")), 1)], 8, Si)) : I("", !0),
			R("div", wi, [
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": J(o)("syncplay.rewind"),
					onClick: _
				}, [B(t, { name: "rewind" })], 8, Ti),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? J(o)("syncplay.pauseAll") : J(o)("syncplay.playAll"),
					onClick: h
				}, [B(t, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Ei),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": J(o)("syncplay.fastForward"),
					onClick: v
				}, [B(t, { name: "forward" })], 8, Di)
			]),
			R("div", { class: H(["syncplay-controls__status", `syncplay-controls__status--${J(s).syncStatus}`]) }, [B(t, {
				name: J(s).syncStatus === "synced" ? "check" : J(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), R("span", Oi, q(J(s).syncStatus === "synced" ? J(o)("syncplay.synced") : J(s).syncStatus === "outOfSync" ? J(o)("syncplay.outOfSync") : J(o)("syncplay.reSyncing")), 1)], 2)
		])) : I("", !0);
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
}, _a = { key: 0 }, va = /*#__PURE__*/ e(/* @__PURE__ */ V({
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
		let { imgSrc: r } = f(), o = e, c = n, l = p(), u = i(), { t: d } = a(), v = Se(), y = h(), b = P(() => y.isFavorite(o.media.id)), x = P(() => y.likeLevel(o.media.id));
		function S() {
			y.toggleFavorite(o.media.id, we());
		}
		function ee(e) {
			y.setLike(o.media.id, e, we());
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
		], T = G(null), E = G(null), D = G(null), O = G(!0), ne = G(!1), k = G(!1), A = G(!1), j = G(!1), re = G(!1), ie = G(!1), ae = G(null), oe = G(null), se = G(!1), ce = m(), le = G(!1);
		function ue(e) {
			ce.success(d("syncplay.joinedRoom", { name: e.name }));
		}
		let fe = P(() => j.value ? 1.35 : 1), M = G(Hn(o.streamUrl, o.media.path)), pe = P(() => rr(o.media.streams)), me = 0;
		async function ge() {
			let e = ++me;
			if (M.value) return;
			let t = await lr([o.streamUrl, o.media.path], o.playbackAudioTracks ?? [], pe.value);
			e === me && (!t || M.value || (M.value = !0, Ie(T.value?.currentTime ?? 0)));
		}
		Y([() => o.playbackAudioTracks, pe], () => {
			ge();
		}, { immediate: !0 });
		let ve = Te("phlixConfig", null), ye = Te("resumeReporter", null), be = !1;
		function we() {
			return ve?.apiBase ?? "";
		}
		let V = st({
			apiBase: () => o.apiBase ?? "",
			hlsConfig: ve?.playerHlsConfig
		}), Ee = dt({ apiBase: () => o.apiBase ?? "" }), U = null;
		function Ae(e) {
			U !== null && clearTimeout(U), U = setTimeout(() => {
				U = null, Ee.fetch(e);
			}, 0);
		}
		let je = P(() => o.thumbnailAt ?? Ee.thumbnailAt), Me = P(() => M.value ? void 0 : o.streamUrl), Ne = P(() => M.value && V.state.value !== "ready"), Pe = P(() => M.value && (V.state.value === "preparing" || V.state.value === "idle")), Fe = P(() => M.value && V.state.value === "error");
		function Ie(e = 0) {
			let t = T.value, n = navigator.connection?.downlinkMax, r = et(n);
			t && V.start(t, o.media.id, r, e);
		}
		function Re(e) {
			if (l.quality === "original" && e !== "auto") {
				V.loadVariantPlaylist(Tt);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				V.loadVariantPlaylist(e);
				return;
			}
			V.setLevel(e);
		}
		let ze = !1;
		function Be() {
			u.defaultQuality = wt;
		}
		function Ve() {
			let e = V.levels.value;
			if (e.length === 0) return !1;
			let t = u.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = V.variants.value;
				if (!t || t.length === 0) return !1;
				if (Mt(e, t)) V.loadVariantPlaylist(Tt);
				else {
					let t = jt(e);
					t >= 0 && V.setNextLevel(t), Be();
				}
				return !0;
			}
			let n = kt(e, t);
			return n >= 0 ? V.setNextLevel(n) : Be(), !0;
		}
		Y(() => V.levels.value, (e) => {
			ze || e.length === 0 || Ve() && (ze = !0);
		}), Y(() => V.variants.value, (e) => {
			ze || !e?.length || De(() => {
				ze || Ve() && (ze = !0);
			});
		}, { deep: !0 });
		let Ue = G(l.resumePositionFor(o.media.id) ?? 0), Q = G(!M.value && Ue.value > 0), We = null, Ge = G(!1), Ke = G(8), qe, Je = G(null), Ye = G(0), Xe = G(!1), Ze = G([]), Qe = G(!1), $e = G(null);
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
		let lt = P(() => l.upNext);
		function ut() {
			M.value = Hn(o.streamUrl, o.media.path), ge(), Ue.value = l.resumePositionFor(o.media.id) ?? 0, Q.value = !M.value && Ue.value > 0, We = null, gn = !1, nn = !1, $t.value = [], Qt.value = !1, rn = !1, Gt.value = -1, un = null, ze = !1, be = !1, Lt(), Et = !1, At = 0, Ot = 0, ht(), Ge.value = !1, V.reset(), T.value && (T.value.currentTime = 0), M.value && Ie(), Ae(o.media.id);
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
			be || (be = !0, ye?.finish()), ir(), O.value = !0, l.upNext && (Ge.value = !0, u.autoplay && gt());
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
			if (M.value) return;
			let e = T.value, t = Wn(e) && (e?.currentTime ?? 0) === 0;
			(Un(e) || t) && (Nt(), Lt(), M.value = !0, Ie(e?.currentTime ?? 0));
		}
		let Et = !1, Dt = null, Ot = 0, At = 0;
		function Nt() {
			if (Et) return;
			Et = !0;
			let e = o.media?.id;
			e != null && e !== "" && at().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, qn({ videoCodec: pe.value })).catch(() => {});
		}
		function It() {
			if (Dt !== null || Et || M.value) return;
			let e = T.value;
			e && (Ot = Date.now(), At = e.currentTime, Dt = setTimeout(() => {
				Dt = null;
				let e = T.value;
				!e || M.value || Jn(Date.now(), Ot, e.currentTime, At) && (Nt(), M.value = !0, Ie(e.currentTime));
			}, Gn));
		}
		function Lt() {
			Dt !== null && (clearTimeout(Dt), Dt = null);
		}
		let Rt = G([]), zt = G([]), Bt = G(-1), Vt = G(!1), Ht = P(() => V.state.value === "ready" && V.audioTracks.value.length > 0), Ut = P(() => V.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Wt = P(() => (o.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Gt = G(-1), Kt = P(() => !Ht.value && !M.value && zt.value.length === 0 && Wt.value.length > 1), qt = P(() => Ht.value ? Ut.value : Kt.value ? Wt.value : zt.value), Jt = P(() => {
			if (Ht.value) return V.currentAudioTrack.value;
			if (Kt.value) {
				if (Gt.value >= 0) return Gt.value;
				let e = (o.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : o.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Bt.value;
		}), Yt = G(!1), Xt = l.subtitleLang, Zt = P(() => {
			let e = o.apiBase ?? "", t = M.value ? V.subtitleTracks.value : Mi(e, o.playbackSubtitleTracks ?? []);
			if ($t.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Mi(e, $t.value), i = new Set(t.map(n)), a = r.filter((e) => !i.has(n(e)));
			return a.length === 0 ? t : [...t, ...a];
		}), Qt = G(!1), $t = G([]), en = P(() => {
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
		let sn = P(() => Rt.value.some((e) => e.language === l.subtitleLang));
		function cn() {
			let e = T.value;
			Rt.value = xe(e), zt.value = he(e), Bt.value = de(e), an(), on();
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
			if (Ht.value) V.setAudioTrack(e);
			else if (Kt.value) {
				if (e === Jt.value) return;
				Gt.value = e, un = e, M.value = !0, Ie(T.value?.currentTime ?? 0);
			} else _e(T.value, e), Bt.value = e;
		}
		Y(Ht, (e) => {
			if (!e || un === null) return;
			let t = un;
			un = null, t >= 0 && t < V.audioTracks.value.length && V.setAudioTrack(t);
		}), Y(Zt, () => {
			De(() => cn());
		}, { deep: !0 });
		let pn = null, mn, hn = P(() => {
			let e = [];
			o.media.year && e.push({ text: String(o.media.year) }), o.media.rating && e.push({
				text: o.media.rating,
				cert: !0
			}), o.media.runtime && e.push({ text: `${o.media.runtime}m` });
			let t = o.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), gn = !1;
		function _n() {
			if (!o.autoplay || gn || Q.value || Ne.value) return;
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
			k.value = !0, or();
		}
		function In() {
			k.value = !1, or();
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
			ae.value?.toggleOpen();
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
				A.value = !A.value;
			},
			toggleQuality: () => {
				M.value ? (se.value = !se.value, oe.value?.toggleMenu?.()) : ce.show({
					message: d("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !A.value && !Vt.value && !Yt.value });
		function Xn() {
			l.toggleMute();
		}
		function Zn() {
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
			re.value = !0;
		}
		function nr() {
			re.value = !1;
		}
		function ir() {
			mn &&= (clearTimeout(mn), void 0);
		}
		function ar() {
			ir(), !(!l.playing || k.value) && (mn = setTimeout(() => {
				l.playing && !k.value && (O.value = !1);
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
		Y(O, (e) => {
			typeof document > "u" || (dr(e), !e && document.activeElement instanceof HTMLElement && E.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), Y(() => l.playing, (e) => {
			e ? (Q.value = !1, yt(), ar()) : (ir(), O.value = !0);
		});
		let fr = null;
		ke(() => {
			l.setCurrent(o.media, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), y.hydrate(o.media), typeof document < "u" && (document.addEventListener("fullscreenchange", $n), ie.value = document.pictureInPictureEnabled === !0), fr = l.bindMediaSession({
				onPlay: () => void T.value?.play()?.catch(() => {}),
				onPause: () => T.value?.pause(),
				onSeek: (e) => $(e)
			}), pn = T.value?.textTracks ?? null, pn?.addEventListener?.("addtrack", cn), pn?.addEventListener?.("removetrack", cn), cn(), M.value && Ie(), Ae(o.media.id);
		}), Y(() => o.media, (e) => {
			l.setCurrent(e, {
				resetPosition: !1,
				streamUrl: o.streamUrl
			}), ut();
		}), Y(() => o.media?.id, () => {
			y.hydrate(o.media);
		}), Y(() => v.currentSession, (e) => {
			e && (e.state === "playing" ? (T.value?.play(), l.play()) : e.state === "paused" && (T.value?.pause(), l.pause()), v.updateLocalPosition(l.position), Math.abs(v.driftAmount) > 2 && ft(e.playbackPosition));
		});
		let pr = null;
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
				}), T.value?.play(), l.play(), v.consumePendingPlayMedia(), pr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			pr !== n && (pr = n, c("pending-media", e.mediaId, e.title));
		}), Oe(() => {
			ye?.reportFinal?.(), ir(), ht(), V.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", $n), fr?.(), pn?.removeEventListener?.("addtrack", cn), pn?.removeEventListener?.("removetrack", cn), Kn !== null && (clearInterval(Kn), Kn = null), U !== null && (clearTimeout(U), U = null), Lt();
		}), (n, i) => (W(), L("div", {
			ref_key: "containerRef",
			ref: E,
			class: H(["player", {
				"is-chrome-hidden": !O.value,
				"is-theater": j.value
			}]),
			onPointermove: or,
			onPointerdown: or,
			onFocusin: or
		}, [B(Nn, {
			video: T.value,
			enabled: J(u).atmosphere,
			playing: J(l).playing,
			"reduced-motion": J(u).effectiveReducedMotion,
			intensity: fe.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), R("div", Ni, [
			R("video", {
				ref_key: "videoRef",
				ref: T,
				class: "player__video",
				src: Me.value,
				poster: J(r)(e.media.poster_url) ?? void 0,
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
			}, [(W(!0), L(N, null, K(Zt.value, (e) => (W(), L("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Fi))), 128))], 40, Pi),
			i[22] ||= R("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			i[23] ||= R("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			R("div", Ii, [R("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": J(d)("player.back"),
				onClick: i[0] ||= Z((e) => c("back"), ["stop"])
			}, [B(t, { name: "arrow-left" })], 8, Li), R("div", Ri, [
				R("p", zi, q(J(d)("player.nowPlaying")), 1),
				R("h2", Bi, q(e.media.name), 1),
				R("div", Vi, [(W(!0), L(N, null, K(hn.value, (e, t) => (W(), L(N, { key: t }, [t > 0 && !e.cert ? (W(), L("span", Hi, "·")) : I("", !0), R("span", { class: H({ player__cert: e.cert }) }, q(e.text), 3)], 64))), 128))])
			])]),
			Ne.value ? I("", !0) : (W(), L("div", Ui, [
				O.value ? (W(), L("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": J(d)("player.seekBackward"),
					onClick: i[1] ||= Z((e) => Pn(-10), ["stop"])
				}, [B(t, { name: "rewind" }), R("span", { class: "player__center-skip-count" }, q(10))], 8, Wi)) : I("", !0),
				R("button", {
					type: "button",
					class: H(["player__bigplay", { "is-playing": J(l).playing }]),
					"aria-label": J(l).playing ? J(d)("player.pause") : J(d)("player.play"),
					onClick: Z(xn, ["stop"])
				}, [B(t, { name: J(l).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Gi),
				O.value ? (W(), L("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": J(d)("player.seekForward"),
					onClick: i[2] ||= Z((e) => Pn(10), ["stop"])
				}, [B(t, { name: "forward" }), R("span", { class: "player__center-skip-count" }, q(10))], 8, Ki)) : I("", !0)
			])),
			B(Ft, {
				video: T.value,
				language: J(l).subtitleLang,
				"style-config": J(u).captionStyle,
				lifted: O.value,
				"controls-root": D.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Ne.value ? I("", !0) : (W(), L("div", {
				key: 1,
				ref_key: "controlsRef",
				ref: D,
				class: "player__controls",
				onClick: i[9] ||= Z(() => {}, ["stop"])
			}, [
				B(He, {
					position: J(l).position,
					duration: J(l).duration,
					buffered: J(l).buffered,
					chapters: e.chapters,
					"thumbnail-at": je.value,
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
				J(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (W(), F(ai, {
					key: 0,
					position: J(l).position,
					duration: J(l).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: tt
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : I("", !0),
				R("div", qi, [
					e.prevEpisode ? (W(), L("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(d)("player.previousEpisode"),
						onClick: yn
					}, [B(t, { name: "skip-back" })], 8, Ji)) : I("", !0),
					R("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": J(l).playing ? J(d)("player.pause") : J(d)("player.play"),
						onClick: xn
					}, [B(t, { name: J(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Yi),
					e.nextEpisode ? (W(), L("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(d)("player.nextEpisode"),
						onClick: bn
					}, [B(t, { name: "skip-forward" })], 8, Xi)) : I("", !0),
					R("span", Zi, [
						z(q(J(Le)(J(l).position)), 1),
						i[18] ||= R("span", { class: "player__sep" }, " / ", -1),
						z(q(J(Le)(J(l).duration)), 1)
					]),
					i[19] ||= R("span", { class: "player__grow" }, null, -1),
					R("button", {
						type: "button",
						class: H(["player__iconbtn player__favorite", { "is-on": b.value }]),
						"aria-label": b.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": b.value ? "true" : "false",
						onClick: S
					}, [B(t, { name: b.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Qi),
					B(g, {
						level: x.value,
						onCycle: ee
					}, null, 8, ["level"]),
					B(St),
					B(Ct),
					B(Pt, {
						ref_key: "qualityMenuRef",
						ref: oe,
						open: se.value,
						"onUpdate:open": i[3] ||= (e) => se.value = e,
						levels: J(V).levels.value,
						variants: J(V).variants.value,
						"current-level": J(V).currentLevel.value,
						"auto-enabled": J(V).autoEnabled.value,
						"active-height": J(V).activeLevelHeight.value,
						onSelect: Re
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
					}, q(J(d)("player.directStream")), 9, $i)),
					B(dn, {
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
					B(Zr, {
						open: Yt.value,
						"onUpdate:open": i[6] ||= (e) => Yt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					B(ui, {
						ref_key: "sleepTimerRef",
						ref: ae,
						"on-expire": Yn
					}, null, 512),
					R("button", {
						type: "button",
						class: H(["player__iconbtn player__syncplay", { "is-on": J(v).isInRoom }]),
						"aria-label": J(v).isInRoom ? J(d)("syncplay.inRoom") : J(d)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: i[7] ||= (e) => le.value = !0
					}, [B(t, { name: "user" })], 10, ea),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": J(d)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: i[8] ||= (e) => A.value = !0
					}, [B(t, { name: "info" })], 8, ta),
					ie.value ? (W(), L("button", {
						key: 3,
						type: "button",
						class: H(["player__iconbtn", { "is-on": re.value }]),
						"aria-label": re.value ? J(d)("player.exitPip") : J(d)("player.pip"),
						"aria-pressed": re.value,
						onClick: er
					}, [B(t, { name: "pip" })], 10, na)) : I("", !0),
					R("button", {
						type: "button",
						class: H(["player__iconbtn", { "is-on": j.value }]),
						"aria-label": j.value ? J(d)("player.exitTheater") : J(d)("player.theater"),
						"aria-pressed": j.value,
						onClick: Zn
					}, [B(t, { name: "theater" })], 10, ra),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? J(d)("player.exitFullscreen") : J(d)("player.fullscreen"),
						onClick: Qn
					}, [B(t, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ia)
				])
			], 512)),
			Ne.value ? I("", !0) : (W(), F(Mr, {
				key: 2,
				position: J(l).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Ne.value ? I("", !0) : (W(), F(Rr, {
				key: 3,
				position: J(l).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Q.value && !Ne.value ? (W(), F(Rn, {
				key: 4,
				seconds: Ue.value,
				onResume: pt,
				onRestart: mt
			}, null, 8, ["seconds"])) : I("", !0),
			Ge.value && lt.value && !Ne.value ? (W(), F(br, {
				key: 5,
				media: lt.value,
				remaining: Ke.value,
				total: J(8),
				counting: J(u).autoplay,
				onPlayNow: vt,
				onCancel: yt
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : I("", !0),
			B(te, {
				modelValue: Xe.value,
				"onUpdate:modelValue": i[10] ||= (e) => Xe.value = e,
				title: `Similar ${Je.value ?? "marker"}s`,
				size: "lg",
				onClose: ct
			}, {
				default: X(() => [R("div", aa, [Qe.value ? (W(), L("div", oa, [B(C, { label: "Finding similar media" })])) : $e.value ? (W(), L("div", sa, [B(t, {
					name: "error",
					class: "similar-modal__state-icon"
				}), R("p", ca, q($e.value), 1)])) : !Qe.value && Ze.value.length === 0 ? (W(), L("div", la, [
					B(t, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					i[20] ||= R("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					i[21] ||= R("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (W(), L("ul", ua, [(W(!0), L(N, null, K(Ze.value, (e) => (W(), L("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [R("div", da, [e.poster_url ? (W(), L("img", {
					key: 0,
					src: J(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, fa)) : (W(), L("div", pa, [B(t, { name: "film" })]))]), R("div", ma, [R("p", ha, q(e.name), 1), e.year ? (W(), L("p", ga, [z(q(e.year) + " ", 1), e.runtime ? (W(), L("span", _a, " · " + q(e.runtime) + "m", 1)) : I("", !0)])) : I("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Pe.value ? (W(), F(jr, {
				key: 6,
				title: e.media.name,
				progress: J(V).progress.value,
				onBack: i[11] ||= (e) => c("back")
			}, null, 8, ["title", "progress"])) : I("", !0),
			Fe.value ? (W(), F(Tr, {
				key: 7,
				title: e.media.name,
				onBack: i[12] ||= (e) => c("back")
			}, null, 8, ["title"])) : I("", !0),
			J(v).isInRoom ? (W(), F(Ai, {
				key: 8,
				position: J(l).position,
				duration: J(l).duration,
				"is-playing": J(l).playing,
				onSeek: $,
				onPlay: i[13] ||= (e) => void T.value?.play(),
				onPause: i[14] ||= (e) => void T.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : I("", !0),
			J(v).isInRoom ? (W(), F(bi, { key: 9 })) : I("", !0),
			B(Ce, {
				modelValue: le.value,
				"onUpdate:modelValue": i[15] ||= (e) => le.value = e,
				onJoined: ue
			}, null, 8, ["modelValue"]),
			B(bt, {
				open: A.value,
				onClose: i[16] ||= (e) => A.value = !1
			}, null, 8, ["open"]),
			B(Dn, {
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
}, xa = { class: "player-page__blocking-error" }, Sa = /*#__PURE__*/ e(/* @__PURE__ */ V({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = l(), { imgSrc: r } = f(), i = u(), a = Ne(), o = Pe(), d = Te("phlixConfig", null), m = p(), g = h(), _ = y(), v = G(null), b = G(""), x = G([]), S = G(null), C = G(null), T = G([]), E = G([]), D = G(!0), O = G(null), j = G(!1), re = G(null), de = G(!1), fe = G(null), M = G(null), pe = P(() => String(a.params.id ?? ""));
		ee(() => v.value?.name);
		let me = P(() => {
			let e = r(v.value?.poster_url);
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
		async function Ce(e, t, r) {
			let i = () => ve(r), a = t.genres?.[0];
			if (!a) {
				m.setQueue([]);
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
				m.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || ye(e)) return;
				m.setQueue([]);
			}
		}
		async function N(e, t, r) {
			let i = A(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function we(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function V(e, t) {
			fe.value = oe(e, t), M.value = se(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && m.setQueue(r);
		}
		function Ee(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function De(e, n, r) {
			if (fe.value = null, M.value = null, !Se(n)) return;
			let i = Ee(n.id);
			if (i) {
				V(i, n.id);
				return;
			}
			let a = () => ve(r);
			try {
				let i = await we(e, n, r.controller?.signal);
				if (a()) return;
				let o = await N(e, i.id, r.controller?.signal);
				if (a()) return;
				if (ae(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => N(e, t.id, r.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = ie(o);
				s.length && t.set(i.id, s), V(s, n.id);
			} catch (e) {
				if (a() || ye(e)) return;
				fe.value = null, M.value = null;
			}
		}
		async function K() {
			let e = pe.value;
			he?.abort(), he = typeof AbortController < "u" ? new AbortController() : null, _e += 1;
			let t = {
				generation: _e,
				controller: he
			};
			if (D.value = !0, O.value = null, x.value = [], S.value = null, C.value = null, T.value = [], E.value = [], fe.value = null, M.value = null, m.hideMiniPlayer(), !e) {
				O.value = "No media id provided", D.value = !1;
				return;
			}
			let r = new s({ baseUrl: n.value });
			r.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, t.controller?.signal).then((e) => {
				ve(t) || (x.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), S.value = xe(e?.intro_marker), C.value = xe(e?.outro_marker), T.value = Yn(e?.audio_tracks), E.value = Ke(e?.subtitle_tracks));
			}).catch(() => null);
			let i = ce(e), a = Date.now();
			if (i && le(i, a)) {
				Ae(r, i.item, t);
				return;
			}
			let o = null;
			try {
				o = (await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t.controller?.signal)).item;
			} catch (e) {
				if (ve(t) || ye(e)) return;
				if (e instanceof c && (e.status === 403 || e.status === 429)) {
					let t = Ie(e.body, d?.locale);
					if (t !== null) {
						re.value = t, de.value = !0, D.value = !1;
						return;
					}
				}
				if (i) {
					Ae(r, i.item, t);
					return;
				}
				O.value = e instanceof Error ? e.message : "Failed to load media", D.value = !1;
				return;
			}
			if (!ve(t)) {
				if (!o) {
					if (i) {
						Ae(r, i.item, t);
						return;
					}
					O.value = "Failed to load media item", D.value = !1;
					return;
				}
				ue(e, o, a), Ae(r, o, t);
			}
		}
		async function Ae(e, t, n) {
			v.value = t, g.hydrate(t), b.value = be(t), D.value = !1, !(Se(t) && (await De(e, t, n), ve(n) || M.value)) && Ce(e, t, n);
		}
		ke(K), Y(pe, K), Me(() => {
			m.current && m.streamUrl && m.showMiniPlayer();
		}), Oe(() => {
			ge = !0, he?.abort(), he = null, _.reset();
		});
		function je() {
			o?.back();
		}
		function Z(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Fe(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Le(e) {
			j.value = e, _.setTheaterActive(e);
		}
		function Re() {
			de.value = !1, je();
		}
		return (e, t) => (W(), L("div", { class: H(["player-page", { "is-theater": j.value }]) }, [
			me.value && !D.value && !O.value ? (W(), L("div", {
				key: 0,
				class: "player-page__ambient",
				style: U(me.value),
				"aria-hidden": "true"
			}, null, 4)) : I("", !0),
			R("div", ya, [D.value ? (W(), L("div", ba, [B(ne, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : O.value ? (W(), F(k, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: O.value
			}, {
				actions: X(() => [B(w, {
					variant: "solid",
					onClick: K
				}, {
					default: X(() => [...t[1] ||= [z("Retry", -1)]]),
					_: 1
				}), B(w, {
					variant: "ghost",
					onClick: je
				}, {
					default: X(() => [...t[2] ||= [z("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : v.value ? (W(), F(va, {
				key: 2,
				media: v.value,
				"stream-url": b.value,
				"stream-url-for": be,
				"api-base": J(n),
				chapters: x.value,
				"intro-marker": S.value,
				"outro-marker": C.value,
				"playback-audio-tracks": T.value,
				"playback-subtitle-tracks": E.value,
				"prev-episode": fe.value,
				"next-episode": M.value,
				autoplay: !0,
				onBack: je,
				onPlayNext: Z,
				onPlayEpisode: Fe,
				onTheater: Le
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
				modelValue: de.value,
				"onUpdate:modelValue": t[0] ||= (e) => de.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: X(() => [B(w, {
					variant: "solid",
					onClick: Re
				}, {
					default: X(() => [...t[3] ||= [z("OK", -1)]]),
					_: 1
				})]),
				default: X(() => [R("p", xa, q(re.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-a39eeb42"]]);
//#endregion
export { Sa as default };

//# sourceMappingURL=PlayerPage-C93oVqpM.js.map