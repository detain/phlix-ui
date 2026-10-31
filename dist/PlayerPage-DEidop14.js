import { g as e, h as t, l as n, p as r, t as i } from "./client-CW4dUyY-.js";
import { n as a, r as o } from "./useApiBase-DXTBY90j.js";
import { r as s, t as c } from "./useImageSrc-CSM61b-l.js";
import { n as l } from "./media-query-D7hrCu8r.js";
import { i as u } from "./usePlayerStore-B7mnqLe3.js";
import { n as d, t as f } from "./ThumbRating-Bi26fH2C.js";
import { a as p, n as m, o as h, r as g, s as _, t as v } from "./shortcuts-CQXQp0In.js";
import { a as y } from "./usePreferencesStore-DrDMAwjz.js";
import { t as b } from "./useToastStore-Bu-iYU7r.js";
import { n as x, t as S } from "./Icon-CIbfiPrs.js";
import { t as C } from "./useMessages-DrceiftD.js";
import { t as w } from "./IconButton-Cp0n7kCc.js";
import { n as T } from "./useFocusTrap-FI3Uj9O8.js";
import { t as E } from "./Slider-CjiPl8gE.js";
import { t as D } from "./Select-ChFXd0gU.js";
import { a as ee, c as O, d as k, f as A, i as te, l as j, n as ne, o as re, r as M, s as ie, t as ae, u as oe } from "./captions-DV5mDPeu.js";
import { t as se } from "./Modal-BU4hJGBA.js";
import { t as ce } from "./Button-1sKEdGjj.js";
import { t as le } from "./Chip-DC0SQtfn.js";
import { t as ue } from "./Spinner-zawWdcUT.js";
import { t as de } from "./Badge-C6LNO9Kk.js";
import { t as fe } from "./EmptyState-BjOJ1k_A.js";
import { n as pe, r as me, t as he } from "./SyncPlayModal-Di_E9UCN.js";
import { n as ge, o as _e, r as N, t as ve } from "./episode-order-DBEVgrOE.js";
import { t as ye } from "./Skeleton-B2Mt2L00.js";
import { i as be } from "./usePageTitle-j6j9gAmo.js";
import { n as xe, r as Se, t as Ce } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as P, Transition as we, computed as F, createBlock as I, createCommentVNode as L, createElementBlock as R, createElementVNode as z, createTextVNode as B, createVNode as V, defineComponent as H, inject as Te, mergeModels as U, nextTick as Ee, normalizeClass as W, normalizeStyle as G, onBeforeUnmount as De, onMounted as Oe, onScopeDispose as ke, openBlock as K, ref as q, renderList as J, toDisplayString as Y, toRef as Ae, unref as X, useModel as je, watch as Z, withCtx as Q, withModifiers as Me } from "vue";
import { onBeforeRouteLeave as Ne, useRoute as Pe, useRouter as Fe } from "vue-router";
function Ie(e, t) {
	if (typeof e != "object" || !e) return null;
	let n = e[t];
	return typeof n == "string" && n !== "" ? n : null;
}
function Le(e, n) {
	let i = Ie(e, "code");
	if (i !== null && t(i)) return r(i, n);
	let a = Ie(e, "error");
	return a === "AccessScheduled" ? "Playback blocked by access schedule. Try again during allowed hours." : a === "StreamLimitExceeded" ? "Stream limit reached. Stop another stream to continue watching." : null;
}
// src/components/player/format-time.ts
function Re(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
// src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var ze = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Be = { class: "scrubber__track" }, Ve = ["title"], He = { class: "scrubber__time numeric" }, Ue = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let { t: r } = C(), i = e, a = n, o = q(null), s = q(!1), c = q(!1), l = q(0), u = q(0), d = (e) => Math.min(1, Math.max(0, e)), f = F(() => s.value ? l.value : i.duration > 0 ? d(i.position / i.duration) : 0), p = F(() => i.duration > 0 ? d(i.buffered / i.duration) : 0), m = F(() => (s.value || c.value) && i.duration > 0), h = F(() => s.value ? l.value : u.value), g = F(() => h.value * i.duration), _ = F(() => m.value ? i.thumbnailAt?.(g.value) ?? null : null), v = F(() => _.value ? `url("${_.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), y = F(() => `${Math.min(96, Math.max(4, h.value * 100))}%`), b = F(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function x(e) {
			let t = o.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : d((e.clientX - n.left) / n.width);
		}
		function S(e) {
			if (i.duration <= 0) return;
			s.value = !0;
			try {
				o.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = x(e);
			l.value = t, a("scrub-start"), e.preventDefault();
		}
		function w(e) {
			let t = x(e);
			u.value = t, s.value && (l.value = t);
		}
		function T(e) {
			if (s.value) {
				s.value = !1;
				try {
					o.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				a("seek", l.value * i.duration), a("scrub-end");
			}
		}
		function E() {
			c.value = !0;
		}
		function D() {
			c.value = !1;
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
			a("seek", n), e.preventDefault();
		}
		return t({
			playedRatio: f,
			previewActive: m
		}), (t, n) => (K(), R("div", {
			ref_key: "trackEl",
			ref: o,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": X(Re)(e.position),
			"aria-label": X(r)("player.seek"),
			onPointerdown: S,
			onPointermove: w,
			onPointerup: T,
			onPointercancel: T,
			onPointerenter: E,
			onPointerleave: D,
			onKeydown: ee
		}, [z("div", Be, [
			z("div", {
				class: "scrubber__buffered",
				style: G({ transform: `scaleX(${p.value})` })
			}, null, 4),
			z("div", {
				class: "scrubber__played",
				style: G({ transform: `scaleX(${f.value})` })
			}, null, 4),
			(K(!0), R(P, null, J(b.value, (e, t) => (K(), R("span", {
				key: t,
				class: "scrubber__tick",
				style: G({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Ve))), 128)),
			z("div", {
				class: W(["scrubber__head", { "is-dragging": s.value }]),
				style: G({ left: `${f.value * 100}%` })
			}, null, 6)
		]), m.value ? (K(), R("div", {
			key: 0,
			class: "scrubber__preview",
			style: G({ left: y.value }),
			"aria-hidden": "true"
		}, [_.value ? (K(), R("div", {
			key: 0,
			class: "scrubber__thumb",
			style: G({ backgroundImage: v.value })
		}, null, 4)) : L("", !0), z("span", He, Y(X(Re)(g.value)), 1)], 4)) : L("", !0)], 40, ze));
	}
}), [["__scopeId", "data-v-3d610715"]]), We = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function $(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Ge(e) {
	return e === !0 || e === "true" || e === 1;
}
function Ke(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function qe(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = $(e.url ?? e.src);
		r !== "" && t.push({
			index: Ke(e.index),
			language: $(e.language ?? e.lang ?? e.srclang),
			label: $(e.label),
			default: Ge(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Je(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Ke(e.height);
		r <= 0 || t.push({
			id: $(e.id),
			label: $(e.label),
			height: r,
			width: Ke(e.width),
			bitrate: Ke(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Ye(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var Xe = .7, Ze = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], Qe = 1e7, $e = "mobile-low";
function et(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * Xe;
}
function tt(e) {
	let t = et(e);
	if (t === void 0 || t >= Qe) return;
	let n = $e;
	for (let [e, r] of Ze) r <= t && (n = e);
	return n;
}
function nt(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function rt(e) {
	let t = e ?? {};
	return {
		jobId: $(t.job_id ?? t.jobId),
		masterUrl: $(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: $(t.status, "running"),
		reused: Ge(t.reused),
		subtitles: qe(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Je(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function it(e) {
	let t = e ?? {};
	return {
		jobId: $(t.job_id ?? t.jobId),
		status: $(t.status, "running"),
		playlistReady: Ge(t.playlist_ready ?? t.playlistReady),
		progress: Ke(t.progress),
		masterUrl: $(t.master_url ?? t.masterUrl),
		subtitles: qe(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Je(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function at(e) {
	return e.playlistReady || e.status === "completed";
}
function ot(e) {
	return We.has(e);
}
function st(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
// src/composables/useHlsTranscode.ts
function ct(e) {
	let t = q("idle"), n = q(0), r = q([]), a = q([]), o = q(-1), s = q(!0), c = q(null), l = q(null), d = q([]), f = q(-1), p = q(null), m = q(null);
	function h(e) {
		if (!O) return;
		a.value = O.levels, o.value = O.getCurrentLevel(), s.value = O.autoLevelEnabled;
		let t = e ?? O.getCurrentLevel(), n = t >= 0 ? a.value.find((e) => e.index === t) : void 0;
		c.value = n ? n.height : null;
	}
	function g() {
		a.value = [], o.value = -1, s.value = !0, c.value = null, l.value = null;
	}
	function v(e) {
		O && (d.value = O.audioTracks, f.value = e ?? O.getCurrentAudioTrack());
	}
	function y() {
		d.value = [], f.value = -1;
	}
	function b(e) {
		e && e.length !== 0 && (l.value = e);
	}
	function x(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: st(n, e.url)
		}));
	}
	let S = e.attach ?? _, C = e.pollIntervalMs ?? 1e3, w = e.maxWaitMs ?? 12e4, T = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), E = Math.max(1, Math.ceil(w / Math.max(1, C))), D = lt(), ee = e.getToken ?? (() => ut(D)), O = null, k = null, A = null, te = !1, j = null, ne = 0;
	function re() {
		return e.client ?? new i({
			baseUrl: e.apiBase(),
			tokenStore: D ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function M(i, a, o, s) {
		ce(), te = !1;
		let c = ++ne, l = () => te || c !== ne;
		j = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], g();
		try {
			let r = re(), c = rt(await r.post(Ye(a, o), void 0, j.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			x(c.subtitles), b(c.variants), p.value = c.jobId, m.value = st(e.apiBase(), c.masterUrl);
			let d = c.status === "completed";
			for (let e = 0; !d && e < E; e++) {
				let e = it(await r.get(nt(c.jobId), void 0, j.signal));
				if (l()) return;
				if (n.value = e.progress, x(e.subtitles), b(e.variants), ot(e.status)) throw Error(`transcode ${e.status}`);
				if (at(e)) {
					d = !0;
					break;
				}
				if (await T(C), l()) return;
			}
			if (!d) throw Error("transcode timed out");
			let f = await S(i, m.value, {
				getToken: ee,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => h(),
				onError: () => {
					l() || (t.value = "error");
				}
			});
			if (l()) {
				try {
					f.destroy();
				} catch {}
				return;
			}
			O = f, k = O.onLevelSwitched((e) => h(e)), A = O.onAudioTrackSwitched((e) => v(e)), h(), v();
			try {
				let e = u();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function ie(e) {
		O && (O.setCurrentLevel(e === "auto" ? -1 : e), h());
	}
	function ae(e) {
		O && (O.setNextLevel(e === "auto" ? -1 : e), h());
	}
	function oe(e) {
		O && (O.setAudioTrack(e), v());
	}
	function se(e) {
		if (!O || !m.value) return;
		let t = m.value.replace("master.m3u8", `media_v${e}.m3u8`);
		O.loadSource(t), g();
	}
	function ce() {
		if (te = !0, j &&= (j.abort(), null), k) {
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
	function le() {
		ce(), t.value = "idle", n.value = 0, r.value = [], g(), y();
		try {
			u().hlsMasterUrl = "";
		} catch {}
	}
	return {
		state: t,
		progress: n,
		subtitleTracks: r,
		levels: a,
		currentLevel: o,
		autoEnabled: s,
		activeLevelHeight: c,
		variants: l,
		audioTracks: d,
		currentAudioTrack: f,
		setLevel: ie,
		setNextLevel: ae,
		setAudioTrack: oe,
		jobId: p,
		masterUrl: m,
		loadVariantPlaylist: se,
		start: M,
		cleanup: ce,
		reset: le
	};
}
function lt() {
	try {
		return new n();
	} catch {
		return null;
	}
}
function ut(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
// src/composables/useTrickplay.ts
var dt = 10;
function ft(e) {
	let t = q(null), n = q(!1), r = q(null), a = /* @__PURE__ */ new Map();
	function o() {
		return new i({ baseUrl: e.apiBase() });
	}
	function s(e, t) {
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
		let r = s(e, n.timeline);
		if (r === null) return null;
		let i = r.frame, a = i % dt, o = Math.floor(i / dt), c = a / 9 * 100, l = o / 5 * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function l(i, s) {
		if (a.has(i) && (t.value = a.get(i) ?? null, t.value !== null)) return;
		let c = s ?? e.signal;
		if (!c?.aborted) {
			n.value = !0, r.value = null;
			try {
				let e = await o().getTrickplay(i, c);
				a.set(i, e), t.value = e;
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				a.set(i, null), r.value = e instanceof Error ? e.message : "Failed to load trickplay data", t.value = null;
			} finally {
				n.value = !1;
			}
		}
	}
	function u() {
		t.value = null, n.value = !1, r.value = null, a.clear();
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
// src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var pt = ["aria-label"], mt = { class: "shortcuts__head" }, ht = { class: "shortcuts__title" }, gt = { class: "shortcuts__grid" }, _t = { class: "shortcuts__keys" }, vt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, yt = {
	key: 1,
	class: "shortcuts__key"
}, bt = { class: "shortcuts__label" }, xt = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => g }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = C(), a = q(null);
		return T(a, Ae(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (K(), R("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Me((e) => r("close"), ["self"])
		}, [z("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [z("div", mt, [z("h3", ht, Y(X(i)("player.keyboard")), 1), V(w, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), z("ul", gt, [(K(!0), R(P, null, J(e.shortcuts, (e) => (K(), R("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [z("span", _t, [(K(!0), R(P, null, J(e.keys, (e, t) => (K(), R(P, { key: t }, [e === "–" ? (K(), R("span", vt, "–")) : (K(), R("kbd", yt, [X(v)[e] ? (K(), I(S, {
			key: 0,
			name: X(v)[e],
			label: X(m)[e] ?? e
		}, null, 8, ["name", "label"])) : (K(), R(P, { key: 1 }, [B(Y(e), 1)], 64))]))], 64))), 128))]), z("span", bt, Y(e.label), 1)]))), 128))])], 8, pt)])) : L("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), St = { class: "volume" }, Ct = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "VolumeControl",
	setup(e) {
		let t = u(), n = y(), { t: r } = C(), i = F(() => t.muted ? 0 : t.volume), a = F(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function o(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (K(), R("div", St, [V(w, {
			name: a.value,
			label: X(t).muted ? X(r)("player.unmute") : X(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => X(t).toggleMute()
		}, null, 8, ["name", "label"]), V(E, {
			class: "volume__slider",
			"model-value": i.value,
			min: 0,
			max: 1,
			step: .05,
			label: X(r)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": o
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), wt = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		], n = u(), { t: r } = C(), i = F(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (K(), I(D, {
			class: "speed-menu",
			tone: "glass",
			"model-value": X(n).rate,
			options: i.value,
			label: X(r)("player.playbackSpeed"),
			"onUpdate:modelValue": a
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), Tt = "auto", Et = "original";
function Dt(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function Ot(e) {
	return e >= 2160 ? "4K" : Dt(e);
}
function kt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Dt(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: Ot(r.height)
		}));
	}
	return n;
}
function At(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Dt(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function jt(e, t) {
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
function Mt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Nt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && jt(e, n) >= 0;
}
function Pt(e, t) {
	if (t < 0) return Tt;
	let n = e.find((e) => e.index === t);
	return n ? Dt(n.height) : Tt;
}
// src/components/player/QualityMenu.vue
var Ft = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "QualityMenu",
	props: /*@__PURE__*/ U({
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
	emits: /*@__PURE__*/ U(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, i = je(e, "open"), a = q(null);
		function o() {
			a.value?.toggleMenu();
		}
		let s = n, c = u(), l = y(), { t: d } = C(), f = F(() => kt(r.levels)), p = F(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = f.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = Dt(i.height);
				e.has(a) || n && At(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: Ot(i.height)
				}));
			}
			return t;
		}), m = F(() => f.value.length >= 2 ? f.value : p.value), h = F(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), g = F(() => jt(r.levels, h.value)), _ = F(() => h.value && g.value >= 0 ? {
			value: Et,
			label: d("player.qualityOriginal", { height: h.value.height })
		} : null), v = F(() => m.value.length >= 2), b = F(() => r.activeHeight == null ? d("player.qualityAuto") : d("player.qualityAutoActive", { label: Ot(r.activeHeight) })), x = F(() => [
			{
				value: Tt,
				label: b.value
			},
			..._.value ? [_.value] : [],
			...m.value
		]), S = F(() => r.autoEnabled ? Tt : _.value && r.currentLevel === g.value && (c.quality === "original" || l.defaultQuality === "original") ? Et : Pt(r.levels, r.currentLevel));
		function w(e) {
			let t = String(e);
			if (t === "auto") {
				c.setQuality(t), l.defaultQuality = t, s("select", "auto");
				return;
			}
			let n = t === "original" ? g.value : At(r.levels, t);
			c.setQuality(t), l.defaultQuality = t, n >= 0 ? s("select", n) : s("select", t);
		}
		return t({ toggleMenu: o }), (e, t) => v.value || i.value ? (K(), I(D, {
			key: 0,
			ref_key: "selectRef",
			ref: a,
			class: "quality-menu",
			tone: "glass",
			"model-value": S.value,
			options: x.value,
			label: X(d)("player.quality"),
			open: i.value,
			"onUpdate:open": t[0] ||= (e) => i.value = e,
			"onUpdate:modelValue": w
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), It = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = q([]), i = q(0), a = F(() => n.lifted ? i.value : 0), o = F(() => ({
			...O(n.styleConfig),
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
			e && typeof ResizeObserver < "u" && (s = new ResizeObserver(() => c()), s.observe(e));
		}
		Z(() => n.controlsRoot, u, { immediate: !0 }), De(l);
		let d = null, f = null, p = null;
		function m() {
			r.value = k(d);
		}
		function h() {
			p != null && (clearTimeout(p), p = null);
		}
		function g() {
			h(), p = setTimeout(() => {
				if (p = null, !d) return;
				ie(n.video, n.language);
				let e = k(d);
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
			_(), ie(n.video, n.language);
			let e = A(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = k(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return Z(() => [n.video, n.language], y, { immediate: !0 }), De(_), t({ lines: r }), (t, n) => r.value.length ? (K(), R("div", {
			key: 0,
			class: W(["player__captions", { "is-lifted": e.lifted }]),
			style: G(o.value)
		}, [(K(!0), R(P, null, J(r.value, (e, t) => (K(), R("p", {
			key: t,
			class: "player__caption-line"
		}, Y(e), 1))), 128))], 6)) : L("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), Lt = ["aria-label", "aria-expanded"], Rt = ["aria-label"], zt = { class: "capmenu__head" }, Bt = { class: "capmenu__title" }, Vt = ["aria-label"], Ht = ["aria-checked", "tabindex"], Ut = { class: "capmenu__check" }, Wt = { class: "capmenu__optlabel" }, Gt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Kt = { class: "capmenu__check" }, qt = { class: "capmenu__optlabel" }, Jt = { class: "capmenu__check" }, Yt = { class: "capmenu__optlabel" }, Xt = { class: "capmenu__title capmenu__title--sub" }, Zt = ["aria-label"], Qt = [
	"aria-checked",
	"tabindex",
	"onClick"
], $t = { class: "capmenu__check" }, en = { class: "capmenu__optlabel" }, tn = { class: "capmenu__title capmenu__title--sub" }, nn = { class: "capmenu__style" }, rn = { class: "capmenu__field" }, an = { class: "capmenu__fieldlabel" }, on = { class: "capmenu__field" }, sn = { class: "capmenu__fieldlabel" }, cn = { class: "capmenu__field" }, ln = { class: "capmenu__fieldlabel" }, un = { class: "capmenu__field" }, dn = { class: "capmenu__fieldlabel" }, fn = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
	setup(e, { emit: t }) {
		let n = e, r = t, i = u(), a = y(), { t: o } = C(), s = q(null), c = q(null), l = F(() => i.subtitleLang), d = F(() => n.tracks.some((e) => e.language === l.value)), f = F(() => d.value ? "captions" : "captions-off"), p = F(() => d.value ? n.tracks.findIndex((e) => e.language === l.value) + 1 : 0), m = F(() => n.activeAudio >= 0 ? n.activeAudio : 0);
		function h(e) {
			r("update:open", e);
		}
		function g() {
			h(!1);
		}
		function _(e) {
			i.setSubtitle(e), a.defaultSubtitleLang = e, a.subtitlePreferenceSet = !0;
		}
		function v(e) {
			r("select-audio", e);
		}
		function b() {
			r("add-subtitles"), g();
		}
		function x(e, t, n) {
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
			let t = x(e, n.tracks.length + 1, p.value);
			t !== null && _(t === 0 ? null : n.tracks[t - 1].language);
		}
		function ee(e) {
			let t = x(e, n.audioTracks.length, m.value);
			t !== null && v(n.audioTracks[t].index);
		}
		function O(e) {
			a.captionStyle = {
				...a.captionStyle,
				size: e
			};
		}
		function k(e) {
			a.captionStyle = {
				...a.captionStyle,
				textColor: String(e)
			};
		}
		function A(e) {
			a.captionStyle = {
				...a.captionStyle,
				background: e
			};
		}
		function j(e) {
			a.captionStyle = {
				...a.captionStyle,
				edge: e
			};
		}
		T(c, Ae(n, "open"), {
			lockScroll: !1,
			onEscape: () => (g(), !0)
		});
		function re(e) {
			s.value && !s.value.contains(e.target) && g();
		}
		return Z(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", re, !0) : document.removeEventListener("pointerdown", re, !0));
		}, { immediate: !0 }), De(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", re, !0);
		}), (t, n) => (K(), R("div", {
			ref_key: "rootEl",
			ref: s,
			class: "capmenu"
		}, [z("button", {
			type: "button",
			class: W(["capmenu__btn", { "is-active": d.value }]),
			"aria-label": d.value ? X(o)("player.captionsOn") : X(o)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => h(!e.open)
		}, [V(S, { name: f.value }, null, 8, ["name"])], 10, Lt), e.open ? (K(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: c,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(o)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			z("div", zt, [z("h3", Bt, Y(X(o)("player.subtitles")), 1), V(w, {
				name: "x",
				label: X(o)("common.close"),
				size: "sm",
				onClick: g
			}, null, 8, ["label"])]),
			z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(o)("player.subtitleTrack"),
				onKeydown: E
			}, [z("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !d.value,
				tabindex: p.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => _(null)
			}, [z("span", Ut, [d.value ? L("", !0) : (K(), I(S, {
				key: 0,
				name: "check"
			}))]), z("span", Wt, Y(X(o)("player.off")), 1)], 8, Ht), (K(!0), R(P, null, J(e.tracks, (e, t) => (K(), R("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": l.value === e.language,
				tabindex: p.value === t + 1 ? 0 : -1,
				onClick: (t) => _(e.language)
			}, [z("span", Kt, [l.value === e.language ? (K(), I(S, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", qt, Y(e.label), 1)], 8, Gt))), 128))], 40, Vt),
			z("button", {
				type: "button",
				class: "capmenu__add",
				onClick: b
			}, [z("span", Jt, [V(S, { name: "plus" })]), z("span", Yt, Y(X(o)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (K(), R(P, { key: 0 }, [z("h3", Xt, Y(X(o)("player.audio")), 1), z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(o)("player.audioTrack"),
				onKeydown: ee
			}, [(K(!0), R(P, null, J(e.audioTracks, (t) => (K(), R("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: m.value === t.index ? 0 : -1,
				onClick: (e) => v(t.index)
			}, [z("span", $t, [e.activeAudio === t.index ? (K(), I(S, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", en, Y(t.label), 1)], 8, Qt))), 128))], 40, Zt)], 64)) : L("", !0),
			z("h3", tn, Y(X(o)("player.captionStyle")), 1),
			z("div", nn, [
				z("div", rn, [z("span", an, Y(X(o)("player.size")), 1), V(D, {
					"model-value": X(a).captionStyle.size,
					options: X(te),
					label: X(o)("player.captionSize"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", on, [z("span", sn, Y(X(o)("player.color")), 1), V(D, {
					"model-value": X(a).captionStyle.textColor,
					options: X(ne),
					label: X(o)("player.captionColor"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", cn, [z("span", ln, Y(X(o)("player.background")), 1), V(D, {
					"model-value": X(a).captionStyle.background,
					options: X(ae),
					label: X(o)("player.captionBackground"),
					"onUpdate:modelValue": A
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", un, [z("span", dn, Y(X(o)("player.edge")), 1), V(D, {
					"model-value": X(a).captionStyle.edge,
					options: X(M),
					label: X(o)("player.captionEdge"),
					"onUpdate:modelValue": j
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Rt)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), pn = { class: "subsearch" }, mn = { class: "subsearch__langs" }, hn = { class: "subsearch__legend" }, gn = { class: "subsearch__chips" }, _n = { class: "subsearch__actions" }, vn = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, yn = {
	key: 2,
	class: "subsearch__prompt"
}, bn = {
	key: 3,
	class: "subsearch__list"
}, xn = { class: "subsearch__meta" }, Sn = { class: "subsearch__release" }, Cn = { class: "subsearch__signals" }, wn = { class: "subsearch__provider" }, Tn = ["aria-label"], En = {
	key: 2,
	class: "subsearch__stat"
}, Dn = {
	key: 3,
	class: "subsearch__stat"
}, On = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
	setup(t, { emit: n }) {
		let r = t, a = n, { t: o } = C(), s = b(), c = [
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
		function l(e) {
			if (!e) return e;
			try {
				let t = Intl.DisplayNames;
				if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
			} catch {}
			return e;
		}
		let u = F(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...r.preferredLangs, ...c]) {
				let r = (n || "").toLowerCase();
				r && !e.has(r) && (e.add(r), t.push(r));
			}
			return t;
		}), d = q(/* @__PURE__ */ new Set());
		function f() {
			let e = /* @__PURE__ */ new Set();
			for (let t of r.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), d.value = e;
		}
		function p(e) {
			let t = new Set(d.value);
			t.has(e) ? t.delete(e) : t.add(e), d.value = t;
		}
		let m = q(!1), h = q(!1), g = q([]), _ = q(/* @__PURE__ */ new Set()), v = q(/* @__PURE__ */ new Set());
		function y(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let x = F(() => [...g.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), w = F(() => d.value.size > 0 && !m.value);
		function T() {
			return r.client ?? new i({ baseUrl: r.apiBase ?? "" });
		}
		async function E() {
			if (w.value) {
				m.value = !0, h.value = !0;
				try {
					g.value = await T().searchSubtitles(r.mediaId, [...d.value]);
				} catch {
					g.value = [], s.error(o("player.subtitleSearchError"));
				} finally {
					m.value = !1;
				}
			}
		}
		function D() {
			a("update:open", !1);
		}
		function ee(t) {
			if (t instanceof e) {
				if (t.status === 429) {
					let e = t.body && typeof t.body == "object" ? t.body : {}, n = typeof e.downloadsRemaining == "number" ? e.downloadsRemaining : null, r = typeof e.resetTimeUtc == "string" ? e.resetTimeUtc : null;
					r ? s.warning(o("player.subtitleQuotaReset", { time: O(r) })) : n === null ? s.warning(o("player.subtitleQuota")) : s.warning(o("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (t.status === 404) {
					s.error(o("player.subtitleAddNotFound"));
					return;
				}
			}
			s.error(o("player.subtitleAddError"));
		}
		function O(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function k(e) {
			let t = y(e);
			if (_.value.has(t) || v.value.has(t)) return;
			let n = new Set(_.value);
			n.add(t), _.value = n;
			try {
				let n = qe([(await T().downloadSubtitle(r.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], i = new Set(v.value);
				i.add(t), v.value = i;
				let c = l(e.language);
				s.success(c ? o("player.subtitleAdded", { language: c }) : o("player.subtitleAddedGeneric")), n && a("added", n);
			} catch (e) {
				ee(e);
			} finally {
				let e = new Set(_.value);
				e.delete(t), _.value = e;
			}
		}
		return Z(() => r.open, (e) => {
			e && (f(), g.value = [], h.value = !1, m.value = !1, _.value = /* @__PURE__ */ new Set(), v.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (e, n) => (K(), I(se, {
			"model-value": t.open,
			title: X(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: Q(() => [V(ce, {
				variant: "ghost",
				onClick: D
			}, {
				default: Q(() => [B(Y(X(o)("common.close")), 1)]),
				_: 1
			})]),
			default: Q(() => [z("div", pn, [
				z("fieldset", mn, [z("legend", hn, Y(X(o)("player.subtitleSearchLanguages")), 1), z("div", gn, [(K(!0), R(P, null, J(u.value, (e) => (K(), I(le, {
					key: e,
					selected: d.value.has(e),
					size: "md",
					"aria-label": l(e),
					"onUpdate:selected": (t) => p(e)
				}, {
					default: Q(() => [B(Y(l(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				z("div", _n, [V(ce, {
					variant: "solid",
					"left-icon": "search",
					loading: m.value,
					disabled: !w.value,
					onClick: E
				}, {
					default: Q(() => [B(Y(X(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				m.value ? (K(), R("div", vn, [V(ue, { label: X(o)("player.subtitleSearching") }, null, 8, ["label"]), z("span", null, Y(X(o)("player.subtitleSearching")), 1)])) : h.value && x.value.length === 0 ? (K(), I(fe, {
					key: 1,
					icon: "captions",
					title: X(o)("player.subtitleSearchEmpty"),
					description: X(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : h.value ? (K(), R("ul", bn, [(K(!0), R(P, null, J(x.value, (e) => (K(), R("li", {
					key: y(e),
					class: "subsearch__item"
				}, [z("div", xn, [z("p", Sn, Y(e.releaseName || e.provider), 1), z("div", Cn, [
					V(de, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Q(() => [B(Y(l(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (K(), I(de, {
						key: 0,
						tone: "info",
						size: "sm",
						label: X(o)("player.subtitleHearingImpairedFull")
					}, {
						default: Q(() => [B(Y(X(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : L("", !0),
					z("span", wn, Y(e.provider), 1),
					e.rating > 0 ? (K(), R("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": X(o)("player.subtitleRating", { rating: e.rating })
					}, [V(S, { name: "star" }), B(" " + Y(e.rating), 1)], 8, Tn)) : L("", !0),
					e.downloadCount > 0 ? (K(), R("span", En, Y(X(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : L("", !0),
					e.fps ? (K(), R("span", Dn, Y(X(o)("player.subtitleFps", { fps: e.fps })), 1)) : L("", !0)
				])]), V(ce, {
					variant: "outline",
					size: "sm",
					"left-icon": v.value.has(y(e)) ? "check" : "plus",
					loading: _.value.has(y(e)),
					disabled: _.value.has(y(e)) || v.value.has(y(e)),
					"aria-label": X(o)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => k(e)
				}, {
					default: Q(() => [B(Y(_.value.has(y(e)) ? X(o)("player.subtitleAdding") : X(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (K(), R("p", yn, Y(X(o)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), kn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function An(e, t, n, r, i, a, o) {
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
		r: kn(d / m),
		g: kn(f / m),
		b: kn(p / m)
	};
}
function jn(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: An(e, t, n, 0, 0, r, n),
		right: An(e, t, n, t - r, 0, t, n),
		center: An(e, t, n, 0, 0, t, n)
	};
}
function Mn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Nn(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Mn(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Mn(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Mn(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Pn(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var Fn = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let n = e, r = q(!1), i = null;
		function a() {
			r.value = Pn(i);
		}
		let o = F(() => n.enabled && !n.reducedMotion && !r.value), s = F(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = q(null), l = null, u = null, d = !1, f = !1;
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
				c.value = Nn(jn(n, 32, 18));
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
			h(e) ? (b = !0, y = 0, x(e)) : (m(), f || (b = !0, v = setInterval(m, 250)));
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
		}, { immediate: !0 }), Oe(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), De(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let T = F(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (K(), R("div", {
			class: W(["player__ambient", { "is-active": o.value }]),
			style: G(o.value ? T.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), In = ["aria-label"], Ln = { class: "resume__label" }, Rn = { class: "resume__time numeric" }, zn = { class: "resume__actions" }, Bn = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = C(), i = F(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (K(), R("div", {
			class: "resume",
			role: "region",
			"aria-label": X(r)("player.resumePlayback")
		}, [z("p", Ln, [
			B(Y(i.value[0]), 1),
			z("span", Rn, Y(X(Re)(e.seconds)), 1),
			B(Y(i.value[1]), 1)
		]), z("div", zn, [z("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [V(S, { name: "play" }), z("span", null, Y(X(r)("player.resume")), 1)]), z("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [V(S, { name: "rewind" }), z("span", null, Y(X(r)("player.startOver")), 1)])])], 8, In));
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
// src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
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
], Sr = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
	setup(e, { emit: t }) {
		let { t: n } = C(), { imgSrc: r } = c(), i = e, a = t, o = F(() => i.posterUrl ?? i.media.poster_url ?? null), s = F(() => $n(i.remaining, i.total));
		return (t, i) => (K(), R("aside", {
			class: "upnext",
			role: "region",
			"aria-label": X(n)("player.upNext")
		}, [
			o.value ? (K(), R("img", {
				key: 0,
				class: "upnext__thumb",
				src: X(r)(o.value),
				alt: "",
				loading: "lazy"
			}, null, 8, pr)) : L("", !0),
			z("div", mr, [
				z("p", hr, Y(X(n)("player.upNext")), 1),
				z("h4", gr, Y(e.media.name), 1),
				e.counting ? (K(), R("p", _r, Y(X(n)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : L("", !0),
				z("div", vr, [z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [V(S, { name: "play" }), z("span", null, Y(X(n)("player.playNow")), 1)]), z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, Y(X(n)("player.cancel")), 1)])
			]),
			e.counting ? (K(), R("svg", yr, [z("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, br), z("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": X(Qn),
				"stroke-dashoffset": s.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, xr)])) : L("", !0)
		], 8, fr));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), Cr = {
	class: "transcode",
	role: "alert"
}, wr = { class: "transcode__card" }, Tr = { class: "transcode__heading" }, Er = { class: "transcode__body" }, Dr = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = C();
		return (t, i) => (K(), R("div", Cr, [z("div", wr, [
			V(S, {
				name: "alert",
				class: "transcode__icon"
			}),
			z("h3", Tr, Y(X(r)("player.transcodeHeading")), 1),
			z("p", Er, Y(e.title ? X(r)("player.transcodeBodyTitled", { title: e.title }) : X(r)("player.transcodeBodyUntitled")), 1),
			z("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [V(S, { name: "arrow-left" }), z("span", null, Y(X(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Or = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, kr = { class: "prep__card" }, Ar = { class: "prep__heading" }, jr = { class: "prep__body" }, Mr = ["aria-valuenow"], Nr = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = C(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (K(), R("div", Or, [z("div", kr, [
			V(S, {
				name: "spinner",
				class: "prep__spinner"
			}),
			z("h3", Ar, Y(X(n)("player.transcodePreparingHeading")), 1),
			z("p", jr, Y(e.title ? X(n)("player.transcodePreparingTitled", { title: e.title }) : X(n)("player.transcodePreparingUntitled")), 1),
			z("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [z("div", {
				class: "prep__bar-fill",
				style: G({ width: r() + "%" })
			}, null, 4)], 8, Mr),
			z("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [V(S, { name: "arrow-left" }), z("span", null, Y(X(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Pr = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = C();
		function a(e, t) {
			return !!t && t.end > t.start && e >= t.start && e < t.end;
		}
		let o = F(() => a(n.position, n.introMarker) ? {
			label: i("player.skipIntro"),
			target: n.introMarker.end
		} : a(n.position, n.outroMarker) ? {
			label: i("player.skipOutro"),
			target: n.outroMarker.end
		} : null);
		function s() {
			o.value && r("skip", o.value.target);
		}
		return (e, t) => (K(), I(we, { name: "skip" }, {
			default: Q(() => [o.value ? (K(), R("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Me(s, ["stop"])
			}, [z("span", null, Y(o.value.label), 1), V(S, { name: "skip-forward" })])) : L("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Fr = ["aria-label"], Ir = ["aria-label", "onClick"], Lr = { class: "skip-controls__label" }, Rr = 5, zr = 30, Br = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = C();
		function a(e) {
			return e / 1e3;
		}
		function o(e, t) {
			return t >= a(e.endMs);
		}
		function s(e, t) {
			if (o(e, t)) return !1;
			let n = a(e.startMs), r = n - Rr, i = n + zr;
			return t >= r && t < i;
		}
		let c = [
			"intro",
			"outro",
			"credits"
		];
		function l(e) {
			switch (e) {
				case "intro": return i("player.skipLabelIntro");
				case "outro": return i("player.skipLabelCredits");
				case "credits": return i("player.skipLabelCredits");
				case "ad": return i("player.skipLabelSkipCredits");
			}
		}
		let u = F(() => !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => c.includes(e.type) && s(e, n.position)).sort((e, t) => e.startMs - t.startMs));
		function d(e) {
			r("skip", a(e.startMs));
		}
		return (e, t) => u.value.length > 0 ? (K(), R("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": X(i)("player.skipControls")
		}, [(K(!0), R(P, null, J(u.value, (e) => (K(), R("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${l(e.type)}`,
			onClick: Me((t) => d(e), ["stop"])
		}, [z("span", Lr, Y(l(e.type)), 1), V(S, { name: "skip-forward" })], 8, Ir))), 128))], 8, Fr)) : L("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Vr = ["aria-label", "aria-expanded"], Hr = ["aria-label"], Ur = { class: "chapterlist__head" }, Wr = { class: "chapterlist__title" }, Gr = ["aria-label"], Kr = ["onClick"], qr = { class: "chapterlist__index" }, Jr = { class: "chapterlist__name" }, Yr = { class: "chapterlist__meta" }, Xr = { class: "chapterlist__time" }, Zr = {
	key: 0,
	class: "chapterlist__duration"
}, Qr = {
	key: 1,
	class: "chapterlist__empty"
}, $r = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "ChapterList",
	props: {
		chapters: { default: () => [] },
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "seek"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = C();
		function a() {
			r("update:open", !1);
		}
		function o() {
			r("update:open", !n.open);
		}
		let s = F(() => n.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Re(e.start), a;
			return e.end != null && e.end > e.start && (a = Re(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), c = q(null), l = q(null);
		T(l, Ae(n, "open"), {
			lockScroll: !1,
			onEscape: () => (a(), !0)
		});
		function u(e) {
			c.value && !c.value.contains(e.target) && a();
		}
		Z(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", u, !0) : document.removeEventListener("pointerdown", u, !0));
		}), De(() => {
			document.removeEventListener("pointerdown", u, !0);
		});
		function d(e) {
			r("seek", e.start), a();
		}
		return (t, n) => (K(), R("div", {
			ref_key: "rootEl",
			ref: c,
			class: "chapterlist"
		}, [z("button", {
			type: "button",
			class: W(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": X(i)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: o
		}, [V(S, { name: "list" })], 10, Vr), e.open ? (K(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.chapterList"),
			tabindex: "-1"
		}, [z("div", Ur, [z("h3", Wr, Y(X(i)("player.chapters")), 1), V(w, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), s.value.length > 0 ? (K(), R("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": X(i)("player.chapterList")
		}, [(K(!0), R(P, null, J(s.value, (e) => (K(), R("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [z("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => d(e.chapter)
		}, [
			z("span", qr, Y(e.index), 1),
			z("span", Jr, Y(e.label), 1),
			z("span", Yr, [z("span", Xr, Y(e.startLabel), 1), e.durationLabel ? (K(), R("span", Zr, "· " + Y(e.durationLabel), 1)) : L("", !0)])
		], 8, Kr)]))), 128))], 8, Gr)) : (K(), R("p", Qr, Y(X(i)("player.noChapters")), 1))], 8, Hr)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ei = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, ti = { class: "marker-timeline__ticks" }, ni = [
	"title",
	"aria-label",
	"onClick"
], ri = { class: "marker-timeline__tooltip" }, ii = { class: "marker-timeline__tooltip-label" }, ai = { class: "marker-timeline__tooltip-time numeric" }, oi = ["onClick"], si = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		return (e, t) => s.value.length > 0 ? (K(), R("div", {
			key: 0,
			class: W(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (K(), R("div", ei, [t[0] ||= z("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [z("polygon", { points: "5,3 19,12 5,21" })], -1), B(" " + Y(u.value), 1)])) : L("", !0), z("div", ti, [(K(!0), R(P, null, J(s.value, (e) => (K(), R("button", {
			key: e.id,
			type: "button",
			class: W(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: G({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${X(Re)(e.startSec)}`,
			"aria-label": `${e.label} at ${X(Re)(e.startSec)}`,
			onClick: Me((t) => d(e), ["stop"])
		}, [z("span", ri, [
			z("span", ii, Y(e.label), 1),
			z("span", ai, Y(X(Re)(e.startSec)), 1),
			z("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Me((t) => f(e), ["stop"])
			}, " Find similar ", 8, oi)
		])], 14, ni))), 128))])], 2)) : L("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), ci = ["aria-label", "aria-expanded"], li = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, ui = ["aria-label"], di = ["aria-selected", "onClick"], fi = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(e, { expose: t }) {
		let n = e, { t: r } = C(), i = [
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
		], a = q(0), o = q(0), s = F(() => o.value > 0), c;
		function l() {
			c &&= (clearInterval(c), void 0);
		}
		function u(e) {
			l(), o.value = e, e <= 0 || (c = setInterval(() => {
				--o.value, o.value <= 0 && (l(), o.value = 0, n.onExpire());
			}, 1e3));
		}
		function d(e) {
			a.value = e, e === 0 ? (l(), o.value = 0) : u(e);
		}
		function f(e) {
			let t = Math.floor(e / 60), n = e % 60;
			return `${t}:${String(n).padStart(2, "0")}`;
		}
		let p = q(!1);
		function m() {
			s.value ? (d(0), p.value = !1) : p.value = !p.value;
		}
		function h(e) {
			d(e), p.value = !1;
		}
		return De(() => {
			l();
		}), t({ toggleOpen: m }), (e, t) => (K(), R("div", { class: W(["sleep-timer", { "is-active": s.value }]) }, [z("button", {
			type: "button",
			class: W(["sleep-timer__trigger", { "is-active": s.value }]),
			"aria-label": s.value ? `Sleep timer: ${f(o.value)} remaining` : X(r)("player.sleepTimer"),
			"aria-expanded": p.value,
			"aria-haspopup": "listbox",
			onClick: m
		}, [V(S, { name: "moon" }), s.value ? (K(), R("span", li, Y(f(o.value)), 1)) : L("", !0)], 10, ci), V(we, { name: "dropdown" }, {
			default: Q(() => [p.value ? (K(), R("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": X(r)("player.sleepTimer")
			}, [(K(), R(P, null, J(i, (e) => z("li", {
				key: e.value,
				class: W(["sleep-timer__option", { "is-selected": a.value === e.value }]),
				role: "option",
				"aria-selected": a.value === e.value,
				onClick: (t) => h(e.value)
			}, Y(e.label), 11, di)), 64))], 8, ui)) : L("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), pi = {
	key: 0,
	class: "syncplay-overlay"
}, mi = { class: "syncplay-overlay__badge" }, hi = { class: "syncplay-overlay__label" }, gi = { class: "syncplay-overlay__status-label" }, _i = { class: "syncplay-overlay__members" }, vi = { class: "syncplay-overlay__member-count" }, yi = { class: "syncplay-overlay__member-list" }, bi = { class: "syncplay-overlay__member-name" }, xi = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Si = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let t = e, { t: n } = C(), r = pe(), i = a(), o = F(() => t.apiBase ?? i.value), s = F(() => r.currentRoom?.name ?? "SyncPlay"), c = F(() => r.onlineMembers.length), l = F(() => r.syncStatus), u = F(() => {
			switch (l.value) {
				case "synced": return n("syncplay.synced");
				case "outOfSync": return n("syncplay.outOfSync");
				case "re-syncing": return n("syncplay.reSyncing");
				default: return n("syncplay.synced");
			}
		}), d = F(() => {
			switch (l.value) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		});
		async function f() {
			await r.leaveRoom(o.value);
		}
		return (e, t) => X(r).isInRoom ? (K(), R("div", pi, [
			z("div", mi, [V(S, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), z("span", hi, "SyncPlay: " + Y(s.value), 1)]),
			z("div", { class: W(["syncplay-overlay__status", `syncplay-overlay__status--${l.value}`]) }, [V(S, {
				name: d.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), z("span", gi, Y(u.value), 1)], 2),
			z("div", _i, [z("span", vi, [V(S, { name: "user" }), B(" " + Y(X(n)("syncplay.members", { count: c.value })), 1)]), z("ul", yi, [(K(!0), R(P, null, J(X(r).onlineMembers.slice(0, 5), (e) => (K(), R("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= z("span", { class: "syncplay-overlay__member-dot" }, null, -1), z("span", bi, Y(e.name), 1)]))), 128)), X(r).onlineMembers.length > 5 ? (K(), R("li", xi, " +" + Y(X(r).onlineMembers.length - 5) + " more ", 1)) : L("", !0)])]),
			V(ce, {
				variant: "ghost",
				size: "sm",
				onClick: f
			}, {
				default: Q(() => [B(Y(X(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), Ci = {
	key: 0,
	class: "syncplay-controls"
}, wi = ["aria-label"], Ti = { class: "syncplay-controls__wait-label" }, Ei = { class: "syncplay-controls__transport" }, Di = ["aria-label"], Oi = ["aria-label"], ki = ["aria-label"], Ai = { class: "syncplay-controls__status-label" }, ji = 10, Mi = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
	setup(e, { emit: t }) {
		let n = e, i = t, { t: o } = C(), s = pe(), c = b(), l = Te("phlixConfig", null), u = a(), d = F(() => n.apiBase ?? u.value);
		me((e) => {
			c.error(r(e, l?.locale, o("syncplay.commandRejected")));
		}), ke(() => me(null));
		let f = q(!1), p = F(() => f.value || s.syncStatus === "re-syncing");
		async function m() {
			if (s.isInRoom) try {
				await s.sendCommand(d.value, "play"), i("play");
			} catch {
				c.error(o("syncplay.commandFailed"));
			}
		}
		async function h() {
			if (s.isInRoom) try {
				await s.sendCommand(d.value, "pause"), i("pause");
			} catch {
				c.error(o("syncplay.commandFailed"));
			}
		}
		async function g() {
			n.isPlaying ? await h() : await m();
		}
		async function _(e) {
			if (s.isInRoom) try {
				await s.sendCommand(d.value, "seek", { position: e }), i("seek", e);
			} catch {
				c.error(o("syncplay.commandFailed"));
			}
		}
		async function v() {
			await _(Math.max(0, n.position - ji));
		}
		async function y() {
			await _(Math.min(n.duration, n.position + ji));
		}
		return Z(() => s.syncStatus, (e) => {
			e === "re-syncing" ? f.value = !0 : e === "synced" && (f.value = !1);
		}), (t, n) => X(s).isInRoom ? (K(), R("div", Ci, [
			p.value ? (K(), R("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": X(o)("syncplay.waitingForMembers")
			}, [V(S, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), z("span", Ti, Y(X(o)("syncplay.waitingForMembers")), 1)], 8, wi)) : L("", !0),
			z("div", Ei, [
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(o)("syncplay.rewind"),
					onClick: v
				}, [V(S, { name: "rewind" })], 8, Di),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? X(o)("syncplay.pauseAll") : X(o)("syncplay.playAll"),
					onClick: g
				}, [V(S, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Oi),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(o)("syncplay.fastForward"),
					onClick: y
				}, [V(S, { name: "forward" })], 8, ki)
			]),
			z("div", { class: W(["syncplay-controls__status", `syncplay-controls__status--${X(s).syncStatus}`]) }, [V(S, {
				name: X(s).syncStatus === "synced" ? "check" : X(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), z("span", Ai, Y(X(s).syncStatus === "synced" ? X(o)("syncplay.synced") : X(s).syncStatus === "outOfSync" ? X(o)("syncplay.outOfSync") : X(o)("syncplay.reSyncing")), 1)], 2)
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-338c0ffc"]]);
// src/utils/subtitleSrc.ts
function Ni(e, t) {
	return String(s(e, t));
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
// src/components/Player.vue?vue&type=script&setup=true&lang.ts
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
}, ya = { key: 0 }, ba = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
	setup(e, { emit: t }) {
		let { imgSrc: n } = c(), r = e, o = t, s = u(), l = y(), { t: m } = C(), h = pe(), g = d(), _ = F(() => g.isFavorite(r.media.id)), v = F(() => g.likeLevel(r.media.id));
		function x() {
			g.toggleFavorite(r.media.id, H());
		}
		function w(e) {
			g.setLike(r.media.id, e, H());
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
		], E = q(null), D = q(null), O = q(null), k = q(!0), A = q(!1), te = q(!1), ne = q(!1), M = q(!1), ie = q(!1), ae = q(!1), ce = q(null), le = q(null), de = q(!1), fe = b(), me = q(!1);
		function ge(e) {
			fe.success(m("syncplay.joinedRoom", { name: e.name }));
		}
		let _e = F(() => M.value ? 1.35 : 1), N = q(Wn(r.streamUrl, r.media.path)), ve = F(() => ar(r.media.streams)), ye = 0;
		async function be() {
			let e = ++ye;
			if (N.value) return;
			let t = await dr([r.streamUrl, r.media.path], r.playbackAudioTracks ?? [], ve.value);
			e === ye && t && !N.value && (N.value = !0, Le(E.value?.currentTime ?? 0));
		}
		Z([() => r.playbackAudioTracks, ve], () => {
			be();
		}, { immediate: !0 });
		let xe = Te("phlixConfig", null), Se = a(), Ce = Te("resumeReporter", null), we = !1;
		function H() {
			return Se.value;
		}
		let U = ct({
			apiBase: () => r.apiBase ?? "",
			hlsConfig: xe?.playerHlsConfig
		}), G = ft({ apiBase: () => r.apiBase ?? "" }), ke = null;
		function Ae(e) {
			ke !== null && clearTimeout(ke), ke = setTimeout(() => {
				ke = null, G.fetch(e);
			}, 0);
		}
		let je = F(() => r.thumbnailAt ?? G.thumbnailAt), Ne = F(() => N.value ? void 0 : r.streamUrl), Pe = F(() => N.value && U.state.value !== "ready"), Fe = F(() => N.value && (U.state.value === "preparing" || U.state.value === "idle")), Ie = F(() => N.value && U.state.value === "error");
		function Le(e = 0) {
			let t = E.value, n = navigator.connection?.downlinkMax, i = tt(n);
			t && U.start(t, r.media.id, i, e);
		}
		function ze(e) {
			s.quality === "original" && e !== "auto" ? U.loadVariantPlaylist(Et) : typeof e == "string" && e !== "auto" ? U.loadVariantPlaylist(e) : U.setLevel(e);
		}
		let Be = !1;
		function Ve() {
			l.defaultQuality = Tt;
		}
		function He() {
			let e = U.levels.value;
			if (e.length === 0) return !1;
			let t = l.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = U.variants.value;
				if (!t || t.length === 0) return !1;
				if (Nt(e, t)) U.loadVariantPlaylist(Et);
				else {
					let t = Mt(e);
					t >= 0 && U.setNextLevel(t), Ve();
				}
				return !0;
			}
			let n = At(e, t);
			return n >= 0 ? U.setNextLevel(n) : Ve(), !0;
		}
		Z(() => U.levels.value, (e) => {
			Be || e.length === 0 || He() && (Be = !0);
		}), Z(() => U.variants.value, (e) => {
			!Be && e?.length && Ee(() => {
				Be || He() && (Be = !0);
			});
		}, { deep: !0 });
		let We = q(s.resumePositionFor(r.media.id) ?? 0), $ = q(!N.value && We.value > 0), Ge = null, Ke = q(!1), qe = q(8), Je, Ye = q(null), Xe = q(0), Ze = q(!1), Qe = q([]), $e = q(!1), et = q(null);
		function nt(e, t) {
			Ye.value = e, Xe.value = t, Qe.value = [], et.value = null, Ze.value = !0, st(e, t);
		}
		let rt = null, it = null, at = null;
		function ot() {
			let e = r.apiBase ?? "";
			return (it === null || at !== e) && (it = new i({ baseUrl: e }), at = e), it;
		}
		async function st(e, t) {
			rt?.abort(), rt = new AbortController(), $e.value = !0, et.value = null;
			try {
				let n = await ot().searchByMarker(e, t, 30, 20, rt.signal);
				Qe.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				et.value = "Failed to load similar media. Please try again.", Qe.value = [];
			} finally {
				$e.value = !1;
			}
		}
		function lt() {
			rt?.abort(), Ze.value = !1, Qe.value = [], et.value = null, Ye.value = null;
		}
		let ut = F(() => s.upNext);
		function dt() {
			N.value = Wn(r.streamUrl, r.media.path), be(), We.value = s.resumePositionFor(r.media.id) ?? 0, $.value = !N.value && We.value > 0, Ge = null, _n = !1, rn = !1, en.value = [], $t.value = !1, an = !1, Kt.value = -1, dn = null, Be = !1, we = !1, Rt(), Dt = !1, jt = 0, kt = 0, gt(), Ke.value = !1, U.reset(), E.value && (E.value.currentTime = 0), N.value && Le(), Ae(r.media.id);
		}
		function pt(e) {
			let t = E.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ge = Math.max(0, e));
		}
		function mt() {
			pt(We.value), $.value = !1, E.value?.play()?.catch(() => {});
		}
		function ht() {
			Ge = null, pt(0), s.clearResume(r.media.id), $.value = !1, E.value?.play()?.catch(() => {});
		}
		function gt() {
			Je &&= (clearInterval(Je), void 0);
		}
		function _t() {
			qe.value = 8, gt(), Je = setInterval(() => {
				--qe.value, qe.value <= 0 && (gt(), yt());
			}, 1e3);
		}
		function vt() {
			we || (we = !0, Ce?.finish()), or(), k.value = !0, s.upNext && (Ke.value = !0, l.autoplay && _t());
		}
		function yt() {
			gt(), Ke.value = !1;
			let e = s.next(r.streamUrlFor);
			e && o("play-next", e);
		}
		function bt() {
			gt(), Ke.value = !1;
		}
		function St() {
			if (N.value) return;
			let e = E.value, t = Kn(e) && (e?.currentTime ?? 0) === 0;
			(Gn(e) || t) && (Pt(), Rt(), N.value = !0, Le(e?.currentTime ?? 0));
		}
		let Dt = !1, Ot = null, kt = 0, jt = 0;
		function Pt() {
			if (Dt) return;
			Dt = !0;
			let e = r.media?.id;
			e != null && e !== "" && ot().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, Yn({ videoCodec: ve.value })).catch(() => {});
		}
		function Lt() {
			if (Ot !== null || Dt || N.value) return;
			let e = E.value;
			e && (kt = Date.now(), jt = e.currentTime, Ot = setTimeout(() => {
				Ot = null;
				let e = E.value;
				e && !N.value && Xn(Date.now(), kt, e.currentTime, jt) && (Pt(), N.value = !0, Le(e.currentTime));
			}, qn));
		}
		function Rt() {
			Ot !== null && (clearTimeout(Ot), Ot = null);
		}
		let zt = q([]), Bt = q([]), Vt = q(-1), Ht = q(!1), Ut = F(() => U.state.value === "ready" && U.audioTracks.value.length > 0), Wt = F(() => U.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Gt = F(() => (r.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Kt = q(-1), qt = F(() => !Ut.value && !N.value && Bt.value.length === 0 && Gt.value.length > 1), Jt = F(() => Ut.value ? Wt.value : qt.value ? Gt.value : Bt.value), Yt = F(() => {
			if (Ut.value) return U.currentAudioTrack.value;
			if (qt.value) {
				if (Kt.value >= 0) return Kt.value;
				let e = (r.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : r.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Vt.value;
		}), Xt = q(!1), Zt = s.subtitleLang, Qt = F(() => {
			let e = r.apiBase ?? "", t = N.value ? U.subtitleTracks.value : Pi(e, r.playbackSubtitleTracks ?? []);
			if (en.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], i = Pi(e, en.value), a = new Set(t.map(n)), o = i.filter((e) => !a.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), $t = q(!1), en = q([]), tn = F(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(l.defaultSubtitleLang), t(l.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function nn(e) {
			en.value.some((t) => t.url === e.url) || (en.value = [...en.value, e]);
		}
		let rn = !1, an = !1;
		function on() {
			if (rn) return;
			if (l.subtitlePreferenceSet) {
				rn = !0;
				return;
			}
			let e = Qt.value.find((e) => e.default);
			if (!e) return;
			let t = zt.value.find((t) => t.language === (e.language || e.label));
			t && (s.setSubtitle(t.language), Zt = t.language, rn = !0);
		}
		function sn() {
			if (an) return;
			let e = l.defaultAudioLang;
			if (!e) return;
			let t = Jt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Yt.value;
			r >= 0 && r < t.length || (pn(n), an = !0);
		}
		let cn = F(() => zt.value.some((e) => e.language === s.subtitleLang));
		function ln() {
			let e = E.value;
			zt.value = oe(e), Bt.value = j(e), Vt.value = ee(e), on(), sn();
		}
		function un() {
			if (cn.value) Zt = s.subtitleLang, s.setSubtitle(null);
			else {
				let e = Zt && zt.value.some((e) => e.language === Zt) ? Zt : zt.value[0]?.language ?? null;
				s.setSubtitle(e);
			}
			o("captions");
		}
		let dn = null;
		function pn(e) {
			if (Ut.value) U.setAudioTrack(e);
			else if (qt.value) {
				if (e === Yt.value) return;
				Kt.value = e, dn = e, N.value = !0, Le(E.value?.currentTime ?? 0);
			} else re(E.value, e), Vt.value = e;
		}
		Z(Ut, (e) => {
			if (!e || dn === null) return;
			let t = dn;
			dn = null, t >= 0 && t < U.audioTracks.value.length && U.setAudioTrack(t);
		}), Z(Qt, () => {
			Ee(() => ln());
		}, { deep: !0 });
		let mn = null, hn, gn = F(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), _n = !1;
		function vn() {
			if (!r.autoplay || _n || $.value || Pe.value) return;
			let e = E.value;
			if (!e || !e.paused) return;
			_n = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, s.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function yn() {
			vn();
		}
		function bn() {
			r.prevEpisode && o("play-episode", r.prevEpisode);
		}
		function xn() {
			r.nextEpisode && o("play-episode", r.nextEpisode);
		}
		function Sn() {
			let e = E.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Cn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function wn() {
			s.play(), s.setMediaPositionState(), Lt();
		}
		function Tn() {
			s.pause(), s.setMediaPositionState();
		}
		function En() {
			let e = E.value;
			e && (Ot !== null && e.currentTime > jt && Rt(), s.updateProgress(e.currentTime, e.duration, Cn(e)), h.isInRoom && h.updateLocalPosition(e.currentTime));
		}
		function Dn() {
			let e = E.value;
			e && (e.volume = s.volume, e.muted = s.muted, e.playbackRate = s.rate, Ge !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ge) : Ge, Ge = null), s.updateProgress(e.currentTime, e.duration, Cn(e)), s.setMediaPositionState(), ln());
		}
		function kn() {
			let e = E.value;
			e && s.updateProgress(e.currentTime, e.duration, Cn(e));
		}
		function An() {
			let e = E.value;
			e && (Math.abs(e.volume - s.volume) > .001 && s.setVolume(e.volume), e.muted !== s.muted && s.toggleMute());
		}
		function jn() {
			let e = E.value;
			e && e.playbackRate !== s.rate && s.setRate(e.playbackRate), s.setMediaPositionState();
		}
		function Mn() {
			s.setMediaPositionState();
		}
		function Nn() {
			s.setMediaPositionState();
		}
		function Pn(e) {
			let t = E.value;
			t && s.duration > 0 && (t.currentTime = Math.min(s.duration, Math.max(0, e)));
		}
		function In(e) {
			Pn(s.position + e);
		}
		function Ln() {
			te.value = !0, cr();
		}
		function Rn() {
			te.value = !1, cr();
		}
		function zn(e) {
			let t = T.reduce((e, t, n) => Math.abs(t - s.rate) < Math.abs(T[e] - s.rate) ? n : e, 0), n = T[Math.min(T.length - 1, Math.max(0, t + e))];
			s.setRate(n);
		}
		function Vn() {
			if (!r.markers) return;
			let e = s.position, t = r.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Pn(t.startMs / 1e3);
		}
		function Hn() {
			if (!r.markers) return;
			let e = s.position, t = r.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && Pn(t.startMs / 1e3);
		}
		function Un() {
			ce.value?.toggleOpen();
		}
		let Jn = null;
		function Zn() {
			let e = E.value;
			if (!e) {
				s.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), s.pause();
				return;
			}
			Jn !== null && (clearInterval(Jn), Jn = null);
			let t = .05;
			Jn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(Jn), Jn = null, e.volume = 0, e.pause(), s.pause());
			}, 50);
		}
		p({
			playPause: Sn,
			seekBy: In,
			frameStep: (e) => {
				s.playing || Pn(s.position + e / 30);
			},
			volumeBy: (e) => s.setVolume(s.volume + e),
			toggleMute: Qn,
			toggleFullscreen: er,
			toggleCaptions: un,
			toggleTheater: $n,
			togglePip: nr,
			skipIntro: Vn,
			skipOutro: Hn,
			sleepTimer: Un,
			seekToPercent: (e) => Pn(e * s.duration),
			speedStep: zn,
			toggleHelp: () => {
				ne.value = !ne.value;
			},
			toggleQuality: () => {
				N.value ? (de.value = !de.value, le.value?.toggleMenu?.()) : fe.show({
					message: m("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !ne.value && !Ht.value && !Xt.value });
		function Qn() {
			s.toggleMute();
		}
		function $n() {
			M.value = !M.value, o("theater", M.value);
		}
		Z(() => s.muted, (e) => {
			let t = E.value;
			t && t.muted !== e && (t.muted = e);
		}), Z(() => s.volume, (e) => {
			let t = E.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Z(() => s.rate, (e) => {
			let t = E.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Z(() => s.lastCommand, (e) => {
			e && (e.type === "seekTo" ? pt(e.value) : e.type === "seekBy" && pt(s.position + e.value));
		});
		function er() {
			if (typeof document > "u") return;
			let e = D.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function tr() {
			A.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function nr() {
			let e = E.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function rr() {
			ie.value = !0;
		}
		function ir() {
			ie.value = !1;
		}
		function or() {
			hn &&= (clearTimeout(hn), void 0);
		}
		function sr() {
			or(), s.playing && !te.value && (hn = setTimeout(() => {
				s.playing && !te.value && (k.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function cr() {
			k.value = !0, sr();
		}
		let lr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", ur = "data-phlix-prev-tabindex", fr = "__phlix_no_tabindex__";
		function pr(e) {
			let t = D.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(lr) ? [n] : Array.from(n.querySelectorAll(lr));
				for (let n of t) if (e) {
					let e = n.getAttribute(ur);
					e === null || e === fr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(ur);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(ur, n.getAttribute("tabindex") ?? fr), n.setAttribute("tabindex", "-1"));
			}
		}
		Z(k, (e) => {
			typeof document < "u" && (pr(e), !e && document.activeElement instanceof HTMLElement && D.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), Z(() => s.playing, (e) => {
			e ? ($.value = !1, bt(), sr()) : (or(), k.value = !0);
		});
		let mr = null;
		Oe(() => {
			s.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), g.hydrate(r.media), typeof document < "u" && (document.addEventListener("fullscreenchange", tr), ae.value = document.pictureInPictureEnabled === !0), mr = s.bindMediaSession({
				onPlay: () => void E.value?.play()?.catch(() => {}),
				onPause: () => E.value?.pause(),
				onSeek: (e) => Pn(e)
			}), mn = E.value?.textTracks ?? null, mn?.addEventListener?.("addtrack", ln), mn?.addEventListener?.("removetrack", ln), ln(), N.value && Le(), Ae(r.media.id);
		}), Z(() => r.media, (e) => {
			s.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), dt();
		}), Z(() => r.media?.id, () => {
			g.hydrate(r.media);
		}), Z(() => h.currentSession, (e) => {
			e && (e.state === "playing" ? (E.value?.play(), s.play()) : e.state === "paused" && (E.value?.pause(), s.pause()), h.updateLocalPosition(s.position), Math.abs(h.driftAmount) > 2 && pt(e.playbackPosition));
		});
		let hr = null;
		return Z(() => h.pendingPlayMedia, async (e) => {
			if (!e) return;
			let t = null;
			if (r.resolvePendingMedia) {
				try {
					t = await r.resolvePendingMedia({
						mediaId: e.mediaId,
						title: e.title
					});
				} catch {
					t = null;
				}
				if (h.pendingPlayMedia !== e) return;
			}
			if (t) {
				s.setCurrent(t, {
					resetPosition: !0,
					streamUrl: r.streamUrlFor?.(t) ?? ""
				}), E.value?.play(), s.play(), h.consumePendingPlayMedia(), hr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			hr !== n && (hr = n, o("pending-media", e.mediaId, e.title));
		}), De(() => {
			Ce?.reportFinal?.(), or(), gt(), U.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", tr), mr?.(), mn?.removeEventListener?.("addtrack", ln), mn?.removeEventListener?.("removetrack", ln), Jn !== null && (clearInterval(Jn), Jn = null), ke !== null && (clearTimeout(ke), ke = null), Rt();
		}), (t, r) => (K(), R("div", {
			ref_key: "containerRef",
			ref: D,
			class: W(["player", {
				"is-chrome-hidden": !k.value,
				"is-theater": M.value
			}]),
			onPointermove: cr,
			onPointerdown: cr,
			onFocusin: cr
		}, [V(Fn, {
			video: E.value,
			enabled: X(l).atmosphere,
			playing: X(s).playing,
			"reduced-motion": X(l).effectiveReducedMotion,
			intensity: _e.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), z("div", Fi, [
			z("video", {
				ref_key: "videoRef",
				ref: E,
				class: "player__video",
				src: Ne.value,
				poster: X(n)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: wn,
				onPause: Tn,
				onTimeupdate: En,
				onLoadedmetadata: Dn,
				onCanplay: yn,
				onProgress: kn,
				onVolumechange: An,
				onRatechange: jn,
				onSeeked: Mn,
				onDurationchange: Nn,
				onEnded: vt,
				onError: St,
				onEnterpictureinpicture: rr,
				onLeavepictureinpicture: ir,
				onClick: Sn
			}, [(K(!0), R(P, null, J(Qt.value, (e) => (K(), R("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Li))), 128))], 40, Ii),
			r[22] ||= z("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[23] ||= z("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			z("div", Ri, [z("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": X(m)("player.back"),
				onClick: r[0] ||= Me((e) => o("back"), ["stop"])
			}, [V(S, { name: "arrow-left" })], 8, zi), z("div", Bi, [
				z("p", Vi, Y(X(m)("player.nowPlaying")), 1),
				z("h2", Hi, Y(e.media.name), 1),
				z("div", Ui, [(K(!0), R(P, null, J(gn.value, (e, t) => (K(), R(P, { key: t }, [t > 0 && !e.cert ? (K(), R("span", Wi, "·")) : L("", !0), z("span", { class: W({ player__cert: e.cert }) }, Y(e.text), 3)], 64))), 128))])
			])]),
			Pe.value ? L("", !0) : (K(), R("div", Gi, [
				k.value ? (K(), R("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(m)("player.seekBackward"),
					onClick: r[1] ||= Me((e) => In(-10), ["stop"])
				}, [V(S, { name: "rewind" }), z("span", { class: "player__center-skip-count" }, Y(10))], 8, Ki)) : L("", !0),
				z("button", {
					type: "button",
					class: W(["player__bigplay", { "is-playing": X(s).playing }]),
					"aria-label": X(s).playing ? X(m)("player.pause") : X(m)("player.play"),
					onClick: Me(Sn, ["stop"])
				}, [V(S, { name: X(s).playing ? "pause" : "play" }, null, 8, ["name"])], 10, qi),
				k.value ? (K(), R("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(m)("player.seekForward"),
					onClick: r[2] ||= Me((e) => In(10), ["stop"])
				}, [V(S, { name: "forward" }), z("span", { class: "player__center-skip-count" }, Y(10))], 8, Ji)) : L("", !0)
			])),
			V(It, {
				video: E.value,
				language: X(s).subtitleLang,
				"style-config": X(l).captionStyle,
				lifted: k.value,
				"controls-root": O.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Pe.value ? L("", !0) : (K(), R("div", {
				key: 1,
				ref_key: "controlsRef",
				ref: O,
				class: "player__controls",
				onClick: r[9] ||= Me(() => {}, ["stop"])
			}, [
				V(Ue, {
					position: X(s).position,
					duration: X(s).duration,
					buffered: X(s).buffered,
					chapters: e.chapters,
					"thumbnail-at": je.value,
					onSeek: Pn,
					onScrubStart: Ln,
					onScrubEnd: Rn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				X(l).showMarkerTimeline && e.markers && e.markers.length > 0 ? (K(), I(si, {
					key: 0,
					position: X(s).position,
					duration: X(s).duration,
					markers: e.markers,
					onSeek: Pn,
					onSimilar: nt
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : L("", !0),
				z("div", Yi, [
					e.prevEpisode ? (K(), R("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(m)("player.previousEpisode"),
						onClick: bn
					}, [V(S, { name: "skip-back" })], 8, Xi)) : L("", !0),
					z("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": X(s).playing ? X(m)("player.pause") : X(m)("player.play"),
						onClick: Sn
					}, [V(S, { name: X(s).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Zi),
					e.nextEpisode ? (K(), R("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(m)("player.nextEpisode"),
						onClick: xn
					}, [V(S, { name: "skip-forward" })], 8, Qi)) : L("", !0),
					z("span", $i, [
						B(Y(X(Re)(X(s).position)), 1),
						r[18] ||= z("span", { class: "player__sep" }, " / ", -1),
						B(Y(X(Re)(X(s).duration)), 1)
					]),
					r[19] ||= z("span", { class: "player__grow" }, null, -1),
					z("button", {
						type: "button",
						class: W(["player__iconbtn player__favorite", { "is-on": _.value }]),
						"aria-label": _.value ? X(m)("itemActions.removeFavorite") : X(m)("itemActions.addFavorite"),
						"aria-pressed": _.value ? "true" : "false",
						onClick: x
					}, [V(S, { name: _.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ea),
					V(f, {
						level: v.value,
						onCycle: w
					}, null, 8, ["level"]),
					V(Ct),
					V(wt),
					V(Ft, {
						ref_key: "qualityMenuRef",
						ref: le,
						open: de.value,
						"onUpdate:open": r[3] ||= (e) => de.value = e,
						levels: X(U).levels.value,
						variants: X(U).variants.value,
						"current-level": X(U).currentLevel.value,
						"auto-enabled": X(U).autoEnabled.value,
						"active-height": X(U).activeLevelHeight.value,
						onSelect: ze
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					N.value ? L("", !0) : (K(), R("span", {
						key: 2,
						class: "player__direct-badge",
						title: X(m)("player.qualityDirectStream")
					}, Y(X(m)("player.directStream")), 9, ta)),
					V(fn, {
						open: Ht.value,
						"onUpdate:open": r[4] ||= (e) => Ht.value = e,
						tracks: zt.value,
						"audio-tracks": Jt.value,
						"active-audio": Yt.value,
						onSelectAudio: pn,
						onAddSubtitles: r[5] ||= (e) => $t.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					V($r, {
						open: Xt.value,
						"onUpdate:open": r[6] ||= (e) => Xt.value = e,
						chapters: e.chapters ?? [],
						onSeek: Pn
					}, null, 8, ["open", "chapters"]),
					V(fi, {
						ref_key: "sleepTimerRef",
						ref: ce,
						"on-expire": Zn
					}, null, 512),
					z("button", {
						type: "button",
						class: W(["player__iconbtn player__syncplay", { "is-on": X(h).isInRoom }]),
						"aria-label": X(h).isInRoom ? X(m)("syncplay.inRoom") : X(m)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[7] ||= (e) => me.value = !0
					}, [V(S, { name: "user" })], 10, na),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(m)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[8] ||= (e) => ne.value = !0
					}, [V(S, { name: "info" })], 8, ra),
					ae.value ? (K(), R("button", {
						key: 3,
						type: "button",
						class: W(["player__iconbtn", { "is-on": ie.value }]),
						"aria-label": ie.value ? X(m)("player.exitPip") : X(m)("player.pip"),
						"aria-pressed": ie.value,
						onClick: nr
					}, [V(S, { name: "pip" })], 10, ia)) : L("", !0),
					z("button", {
						type: "button",
						class: W(["player__iconbtn", { "is-on": M.value }]),
						"aria-label": M.value ? X(m)("player.exitTheater") : X(m)("player.theater"),
						"aria-pressed": M.value,
						onClick: $n
					}, [V(S, { name: "theater" })], 10, aa),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": A.value ? X(m)("player.exitFullscreen") : X(m)("player.fullscreen"),
						onClick: er
					}, [V(S, { name: A.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, oa)
				])
			], 512)),
			Pe.value ? L("", !0) : (K(), I(Pr, {
				key: 2,
				position: X(s).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: Pn
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Pe.value ? L("", !0) : (K(), I(Br, {
				key: 3,
				position: X(s).position,
				markers: e.markers,
				onSkip: Pn
			}, null, 8, ["position", "markers"])),
			$.value && !Pe.value ? (K(), I(Bn, {
				key: 4,
				seconds: We.value,
				onResume: mt,
				onRestart: ht
			}, null, 8, ["seconds"])) : L("", !0),
			Ke.value && ut.value && !Pe.value ? (K(), I(Sr, {
				key: 5,
				media: ut.value,
				remaining: qe.value,
				total: X(8),
				counting: X(l).autoplay,
				onPlayNow: yt,
				onCancel: bt
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : L("", !0),
			V(se, {
				modelValue: Ze.value,
				"onUpdate:modelValue": r[10] ||= (e) => Ze.value = e,
				title: `Similar ${Ye.value ?? "marker"}s`,
				size: "lg",
				onClose: lt
			}, {
				default: Q(() => [z("div", sa, [$e.value ? (K(), R("div", ca, [V(ue, { label: "Finding similar media" })])) : et.value ? (K(), R("div", la, [V(S, {
					name: "error",
					class: "similar-modal__state-icon"
				}), z("p", ua, Y(et.value), 1)])) : !$e.value && Qe.value.length === 0 ? (K(), R("div", da, [
					V(S, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[20] ||= z("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[21] ||= z("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (K(), R("ul", fa, [(K(!0), R(P, null, J(Qe.value, (e) => (K(), R("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [z("div", pa, [e.poster_url ? (K(), R("img", {
					key: 0,
					src: X(n)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, ma)) : (K(), R("div", ha, [V(S, { name: "film" })]))]), z("div", ga, [z("p", _a, Y(e.name), 1), e.year ? (K(), R("p", va, [B(Y(e.year) + " ", 1), e.runtime ? (K(), R("span", ya, " · " + Y(e.runtime) + "m", 1)) : L("", !0)])) : L("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Fe.value ? (K(), I(Nr, {
				key: 6,
				title: e.media.name,
				progress: X(U).progress.value,
				onBack: r[11] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : L("", !0),
			Ie.value ? (K(), I(Dr, {
				key: 7,
				title: e.media.name,
				onBack: r[12] ||= (e) => o("back")
			}, null, 8, ["title"])) : L("", !0),
			X(h).isInRoom ? (K(), I(Mi, {
				key: 8,
				position: X(s).position,
				duration: X(s).duration,
				"is-playing": X(s).playing,
				onSeek: Pn,
				onPlay: r[13] ||= (e) => void E.value?.play(),
				onPause: r[14] ||= (e) => void E.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : L("", !0),
			X(h).isInRoom ? (K(), I(Si, { key: 9 })) : L("", !0),
			V(he, {
				modelValue: me.value,
				"onUpdate:modelValue": r[15] ||= (e) => me.value = e,
				onJoined: ge
			}, null, 8, ["modelValue"]),
			V(xt, {
				open: ne.value,
				onClose: r[16] ||= (e) => ne.value = !1
			}, null, 8, ["open"]),
			V(On, {
				open: $t.value,
				"onUpdate:open": r[17] ||= (e) => $t.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": tn.value,
				onAdded: nn
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
}, Ca = { class: "player-page__blocking-error" }, wa = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "PlayerPage",
	setup(t) {
		let n = /* @__PURE__ */ new Map(), r = a(), { imgSrc: s } = c(), f = o(), p = Pe(), m = Fe(), g = Te("phlixConfig", null), _ = u(), v = d(), y = h(), b = q(null), x = q(""), S = q([]), C = q(null), w = q(null), T = q([]), E = q([]), D = q(!0), ee = q(null), O = q(!1), k = q(null), A = q(!1), te = q(null), j = q(null), ne = F(() => String(p.params.id ?? ""));
		be(() => b.value?.name);
		let re = F(() => {
			let e = s(b.value?.poster_url);
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), M = null, ie = !1, ae = 0;
		function oe(e) {
			return ie || e.generation !== ae;
		}
		function le(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function ue(e) {
			let t = f.value || r.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function de(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function pe(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function me(e, t, n) {
			let i = () => oe(n), a = t.genres?.[0];
			if (!a) _.setQueue([]);
			else try {
				let o = l(r.value, {
					genres: [a],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, n.controller?.signal);
				if (i()) return;
				_.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || le(e)) return;
				_.setQueue([]);
			}
		}
		async function he(e, t, n) {
			let i = l(r.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, n)).items ?? [];
		}
		async function P(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function we(e, t) {
			te.value = N(e, t), j.value = ve(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && _.setQueue(r);
		}
		function H(e) {
			for (let t of n.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function U(e, t, r) {
			if (te.value = null, j.value = null, !pe(t)) return;
			let i = H(t.id);
			if (i) {
				we(i, t.id);
				return;
			}
			let a = () => oe(r);
			try {
				let i = await P(e, t, r.controller?.signal);
				if (a()) return;
				let o = await he(e, i.id, r.controller?.signal);
				if (a()) return;
				if (_e(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => he(e, t.id, r.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = ge(o);
				s.length && n.set(i.id, s), we(s, t.id);
			} catch (e) {
				if (a() || le(e)) return;
				te.value = null, j.value = null;
			}
		}
		async function Ee() {
			let t = ne.value;
			M?.abort(), M = typeof AbortController < "u" ? new AbortController() : null, ae += 1;
			let n = {
				generation: ae,
				controller: M
			};
			if (D.value = !0, ee.value = null, S.value = [], C.value = null, w.value = null, T.value = [], E.value = [], te.value = null, j.value = null, _.hideMiniPlayer(), !t) {
				ee.value = "No media id provided", D.value = !1;
				return;
			}
			let a = new i({ baseUrl: r.value });
			a.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, n.controller?.signal).then((e) => {
				oe(n) || (S.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), C.value = de(e?.intro_marker), w.value = de(e?.outro_marker), T.value = Zn(e?.audio_tracks), E.value = qe(e?.subtitle_tracks));
			}).catch(() => null);
			let o = xe(t), s = Date.now();
			if (o && Se(o, s)) {
				ke(a, o.item, n);
				return;
			}
			let c = null;
			try {
				c = (await a.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, n.controller?.signal)).item;
			} catch (t) {
				if (oe(n) || le(t)) return;
				if (t instanceof e && (t.status === 403 || t.status === 429)) {
					let e = Le(t.body, g?.locale);
					if (e !== null) {
						k.value = e, A.value = !0, D.value = !1;
						return;
					}
				}
				if (o) {
					ke(a, o.item, n);
					return;
				}
				ee.value = t instanceof Error ? t.message : "Failed to load media", D.value = !1;
				return;
			}
			if (!oe(n)) {
				if (c) Ce(t, c, s), ke(a, c, n);
				else {
					if (o) {
						ke(a, o.item, n);
						return;
					}
					ee.value = "Failed to load media item", D.value = !1;
				}
			}
		}
		async function ke(e, t, n) {
			b.value = t, v.hydrate(t), x.value = ue(t), D.value = !1, pe(t) && (await U(e, t, n), oe(n) || j.value) || me(e, t, n);
		}
		Oe(Ee), Z(ne, Ee), Ne(() => {
			_.current && _.streamUrl && _.showMiniPlayer();
		}), De(() => {
			ie = !0, M?.abort(), M = null, y.reset();
		});
		function J() {
			m?.back();
		}
		function Ae(e) {
			m?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function je(e) {
			m?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Me(e) {
			O.value = e, y.setTheaterActive(e);
		}
		function Ie() {
			A.value = !1, J();
		}
		return (e, t) => (K(), R("div", { class: W(["player-page", { "is-theater": O.value }]) }, [
			re.value && !D.value && !ee.value ? (K(), R("div", {
				key: 0,
				class: "player-page__ambient",
				style: G(re.value),
				"aria-hidden": "true"
			}, null, 4)) : L("", !0),
			z("div", xa, [D.value ? (K(), R("div", Sa, [V(ye, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : ee.value ? (K(), I(fe, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: ee.value
			}, {
				actions: Q(() => [V(ce, {
					variant: "solid",
					onClick: Ee
				}, {
					default: Q(() => [...t[1] ||= [B("Retry", -1)]]),
					_: 1
				}), V(ce, {
					variant: "ghost",
					onClick: J
				}, {
					default: Q(() => [...t[2] ||= [B("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : b.value ? (K(), I(ba, {
				key: 2,
				media: b.value,
				"stream-url": x.value,
				"stream-url-for": ue,
				"api-base": X(r),
				chapters: S.value,
				"intro-marker": C.value,
				"outro-marker": w.value,
				"playback-audio-tracks": T.value,
				"playback-subtitle-tracks": E.value,
				"prev-episode": te.value,
				"next-episode": j.value,
				autoplay: !0,
				onBack: J,
				onPlayNext: Ae,
				onPlayEpisode: je,
				onTheater: Me
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
			V(se, {
				modelValue: A.value,
				"onUpdate:modelValue": t[0] ||= (e) => A.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Q(() => [V(ce, {
					variant: "solid",
					onClick: Ie
				}, {
					default: Q(() => [...t[3] ||= [B("OK", -1)]]),
					_: 1
				})]),
				default: Q(() => [z("p", Ca, Y(k.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-4d1f516a"]]);
export { wa as default };

//# sourceMappingURL=PlayerPage-DEidop14.js.map