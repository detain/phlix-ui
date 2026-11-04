import { _ as e, a as t, h as n, t as r, v as i } from "./client-fSGeXil2.js";
import { n as a, r as o } from "./useApiBase-DXTBY90j.js";
import { t as s } from "./useMessages-BD3JvKjZ.js";
import { r as c, t as l } from "./useImageSrc-CSM61b-l.js";
import { n as u } from "./media-query-D7hrCu8r.js";
import { i as d } from "./usePlayerStore-DEpGyPe5.js";
import { n as f, t as p } from "./ThumbRating-BJeVZ-kT.js";
import { a as m, n as h, o as g, r as _, s as v, t as y } from "./shortcuts-BPpemCee.js";
import { a as b } from "./usePreferencesStore-DrDMAwjz.js";
import { t as ee } from "./useToastStore-Bu-iYU7r.js";
import { n as x, t as S } from "./Icon-55iG1rR7.js";
import { t as C } from "./IconButton-oCt4k5-3.js";
import { n as w } from "./useFocusTrap-FI3Uj9O8.js";
import { t as T } from "./Slider-Bj5BaBUu.js";
import { t as E } from "./Select-C5HKod7b.js";
import { a as D, c as O, d as k, f as A, i as te, l as ne, n as re, o as ie, r as ae, s as j, t as oe, u as se } from "./captions-DV5mDPeu.js";
import { t as ce } from "./Modal-DtvOrHdx.js";
import { t as le } from "./Button-BLpPomsd.js";
import { t as ue } from "./Chip-eO7BYLEk.js";
import { t as de } from "./Spinner-Dh5qjkNO.js";
import { t as fe } from "./Badge-B_3IbdKb.js";
import { t as pe } from "./EmptyState-DjfWh3kt.js";
import { n as me, r as he, t as ge } from "./SyncPlayModal-CQ_NONPj.js";
import { n as _e, o as ve, r as ye, t as M } from "./episode-order-DBEVgrOE.js";
import { t as be } from "./Skeleton-DDhrDRE7.js";
import { i as xe } from "./usePageTitle-j6j9gAmo.js";
import { n as Se, r as Ce, t as we } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as N, Transition as Te, computed as P, createBlock as F, createCommentVNode as I, createElementBlock as L, createElementVNode as R, createTextVNode as z, createVNode as B, defineComponent as V, inject as Ee, mergeModels as De, nextTick as Oe, normalizeClass as H, normalizeStyle as U, onBeforeUnmount as ke, onMounted as Ae, onScopeDispose as je, openBlock as W, ref as G, renderList as K, toDisplayString as q, toRef as J, unref as Y, useModel as Me, watch as X, withCtx as Z, withModifiers as Ne } from "vue";
import { onBeforeRouteLeave as Pe, useRoute as Fe, useRouter as Ie } from "vue-router";
function Le(e, t) {
	if (typeof e != "object" || !e) return null;
	let n = e[t];
	return typeof n == "string" && n !== "" ? n : null;
}
function Re(t, r) {
	let i = Le(t, "code");
	if (i !== null && e(i)) return n(i, r);
	let a = Le(t, "error");
	return a === "AccessScheduled" ? "Playback blocked by access schedule. Try again during allowed hours." : a === "StreamLimitExceeded" ? "Stream limit reached. Stop another stream to continue watching." : null;
}
function ze(t, r) {
	if (t instanceof i) {
		let i = Le(t.body, "code");
		if (i !== null && e(i)) return n(i, r);
	}
	let a = t instanceof Error ? t.message : "";
	return a === "" ? "Failed to load media" : a;
}
// src/components/player/format-time.ts
function Be(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
// src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Ve = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], He = { class: "scrubber__track" }, Ue = ["title"], We = { class: "scrubber__time numeric" }, Ge = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let { t: r } = s(), i = e, a = n, o = G(null), c = G(!1), l = G(!1), u = G(0), d = G(0), f = (e) => Math.min(1, Math.max(0, e)), p = P(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = P(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = P(() => (c.value || l.value) && i.duration > 0), g = P(() => c.value ? u.value : d.value), _ = P(() => g.value * i.duration), v = P(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = P(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = P(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), ee = P(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
			...e,
			ratio: e.start / i.duration
		})) : []);
		function x(e) {
			let t = o.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : f((e.clientX - n.left) / n.width);
		}
		function S(e) {
			if (i.duration <= 0) return;
			c.value = !0;
			try {
				o.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = x(e);
			u.value = t, a("scrub-start"), e.preventDefault();
		}
		function C(e) {
			let t = x(e);
			d.value = t, c.value && (u.value = t);
		}
		function w(e) {
			if (c.value) {
				c.value = !1;
				try {
					o.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				a("seek", u.value * i.duration), a("scrub-end");
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
			a("seek", n), e.preventDefault();
		}
		return t({
			playedRatio: p,
			previewActive: h
		}), (t, n) => (W(), L("div", {
			ref_key: "trackEl",
			ref: o,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": Y(Be)(e.position),
			"aria-label": Y(r)("player.seek"),
			onPointerdown: S,
			onPointermove: C,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: T,
			onPointerleave: E,
			onKeydown: D
		}, [R("div", He, [
			R("div", {
				class: "scrubber__buffered",
				style: U({ transform: `scaleX(${m.value})` })
			}, null, 4),
			R("div", {
				class: "scrubber__played",
				style: U({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(W(!0), L(N, null, K(ee.value, (e, t) => (W(), L("span", {
				key: t,
				class: "scrubber__tick",
				style: U({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Ue))), 128)),
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
		}, null, 4)) : I("", !0), R("span", We, q(Y(Be)(_.value)), 1)], 4)) : I("", !0)], 40, Ve));
	}
}), [["__scopeId", "data-v-3d610715"]]), Ke = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Q(e, t = "") {
	return typeof e == "string" ? e : t;
}
function qe(e) {
	return e === !0 || e === "true" || e === 1;
}
function Je(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Ye(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Q(e.url ?? e.src);
		r !== "" && t.push({
			index: Je(e.index),
			language: Q(e.language ?? e.lang ?? e.srclang),
			label: Q(e.label),
			default: qe(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Xe(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Je(e.height);
		r <= 0 || t.push({
			id: Q(e.id),
			label: Q(e.label),
			height: r,
			width: Je(e.width),
			bitrate: Je(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Ze(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var Qe = .7, $e = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], et = 1e7, tt = "mobile-low";
function nt(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * Qe;
}
function rt(e) {
	let t = nt(e);
	if (t === void 0 || t >= et) return;
	let n = tt;
	for (let [e, r] of $e) r <= t && (n = e);
	return n;
}
function it(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function at(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		masterUrl: Q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Q(t.status, "running"),
		reused: qe(t.reused),
		subtitles: Ye(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Xe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function ot(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		status: Q(t.status, "running"),
		playlistReady: qe(t.playlist_ready ?? t.playlistReady),
		progress: Je(t.progress),
		masterUrl: Q(t.master_url ?? t.masterUrl),
		subtitles: Ye(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Xe(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function st(e) {
	return e.playlistReady || e.status === "completed";
}
function ct(e) {
	return Ke.has(e);
}
function lt(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
// src/composables/useHlsTranscode.ts
function ut(e) {
	let t = G("idle"), n = G(0), i = G([]), a = G([]), o = G(-1), s = G(!0), c = G(null), l = G(null), u = G([]), f = G(-1), p = G(null), m = G(null);
	function h(e) {
		if (!D) return;
		a.value = D.levels, o.value = D.getCurrentLevel(), s.value = D.autoLevelEnabled;
		let t = e ?? D.getCurrentLevel(), n = t >= 0 ? a.value.find((e) => e.index === t) : void 0;
		c.value = n ? n.height : null;
	}
	function g() {
		a.value = [], o.value = -1, s.value = !0, c.value = null, l.value = null;
	}
	function _(e) {
		D && (u.value = D.audioTracks, f.value = e ?? D.getCurrentAudioTrack());
	}
	function y() {
		u.value = [], f.value = -1;
	}
	function b(e) {
		e && e.length !== 0 && (l.value = e);
	}
	function ee(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		i.value = t.map((e) => ({
			...e,
			url: lt(n, e.url)
		}));
	}
	let x = e.attach ?? v, S = e.pollIntervalMs ?? 1e3, C = e.maxWaitMs ?? 12e4, w = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), T = Math.max(1, Math.ceil(C / Math.max(1, S))), E = e.getToken ?? dt, D = null, O = null, k = null, A = !1, te = null, ne = 0;
	function re() {
		return e.client ?? new r({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function ie(r, a, o, s) {
		ce(), A = !1;
		let c = ++ne, l = () => A || c !== ne;
		te = new AbortController(), t.value = "preparing", n.value = 0, i.value = [], g();
		try {
			let i = re(), c = at(await i.post(Ze(a, o), void 0, te.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			ee(c.subtitles), b(c.variants), p.value = c.jobId, m.value = lt(e.apiBase(), c.masterUrl);
			let u = c.status === "completed";
			for (let e = 0; !u && e < T; e++) {
				let e = ot(await i.get(it(c.jobId), void 0, te.signal));
				if (l()) return;
				if (n.value = e.progress, ee(e.subtitles), b(e.variants), ct(e.status)) throw Error(`transcode ${e.status}`);
				if (st(e)) {
					u = !0;
					break;
				}
				if (await w(S), l()) return;
			}
			if (!u) throw Error("transcode timed out");
			let f = await x(r, m.value, {
				getToken: E,
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
			D = f, O = D.onLevelSwitched((e) => h(e)), k = D.onAudioTrackSwitched((e) => _(e)), h(), _();
			try {
				let e = d();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function ae(e) {
		D && (D.setCurrentLevel(e === "auto" ? -1 : e), h());
	}
	function j(e) {
		D && (D.setNextLevel(e === "auto" ? -1 : e), h());
	}
	function oe(e) {
		D && (D.setAudioTrack(e), _());
	}
	function se(e) {
		if (!D || !m.value) return;
		let t = m.value.replace("master.m3u8", `media_v${e}.m3u8`);
		D.loadSource(t), g();
	}
	function ce() {
		if (A = !0, te &&= (te.abort(), null), O) {
			try {
				O();
			} catch {}
			O = null;
		}
		if (k) {
			try {
				k();
			} catch {}
			k = null;
		}
		if (D) {
			try {
				D.destroy();
			} catch {}
			D = null;
		}
		p.value = null, m.value = null;
	}
	function le() {
		ce(), t.value = "idle", n.value = 0, i.value = [], g(), y();
		try {
			d().hlsMasterUrl = "";
		} catch {}
	}
	return {
		state: t,
		progress: n,
		subtitleTracks: i,
		levels: a,
		currentLevel: o,
		autoEnabled: s,
		activeLevelHeight: c,
		variants: l,
		audioTracks: u,
		currentAudioTrack: f,
		setLevel: ae,
		setNextLevel: j,
		setAudioTrack: oe,
		jobId: p,
		masterUrl: m,
		loadVariantPlaylist: se,
		start: ie,
		cleanup: ce,
		reset: le
	};
}
function dt() {
	try {
		return t().getAccessToken();
	} catch {
		return null;
	}
}
// src/composables/useTrickplay.ts
var ft = 10;
function pt(e) {
	let t = G(null), n = G(!1), i = G(null), a = /* @__PURE__ */ new Map();
	function o() {
		return new r({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % ft, o = Math.floor(i / ft), c = a / 9 * 100, l = o / 5 * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function l(r, s) {
		if (a.has(r) && (t.value = a.get(r) ?? null, t.value !== null)) return;
		let c = s ?? e.signal;
		if (!c?.aborted) {
			n.value = !0, i.value = null;
			try {
				let e = await o().getTrickplay(r, c);
				a.set(r, e), t.value = e;
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				a.set(r, null), i.value = e instanceof Error ? e.message : "Failed to load trickplay data", t.value = null;
			} finally {
				n.value = !1;
			}
		}
	}
	function u() {
		t.value = null, n.value = !1, i.value = null, a.clear();
	}
	return {
		data: t,
		loading: n,
		error: i,
		thumbnailAt: c,
		fetch: l,
		reset: u
	};
}
// src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var mt = ["aria-label"], ht = { class: "shortcuts__head" }, gt = { class: "shortcuts__title" }, _t = { class: "shortcuts__grid" }, vt = { class: "shortcuts__keys" }, yt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, bt = {
	key: 1,
	class: "shortcuts__key"
}, xt = { class: "shortcuts__label" }, St = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => _ }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = s(), a = G(null);
		return w(a, J(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (W(), L("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Ne((e) => r("close"), ["self"])
		}, [R("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(i)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [R("div", ht, [R("h3", gt, q(Y(i)("player.keyboard")), 1), B(C, {
			name: "x",
			label: Y(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), R("ul", _t, [(W(!0), L(N, null, K(e.shortcuts, (e) => (W(), L("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [R("span", vt, [(W(!0), L(N, null, K(e.keys, (e, t) => (W(), L(N, { key: t }, [e === "–" ? (W(), L("span", yt, "–")) : (W(), L("kbd", bt, [Y(y)[e] ? (W(), F(S, {
			key: 0,
			name: Y(y)[e],
			label: Y(h)[e] ?? e
		}, null, 8, ["name", "label"])) : (W(), L(N, { key: 1 }, [z(q(e), 1)], 64))]))], 64))), 128))]), R("span", xt, q(e.label), 1)]))), 128))])], 8, mt)])) : I("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Ct = { class: "volume" }, wt = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "VolumeControl",
	setup(e) {
		let t = d(), n = b(), { t: r } = s(), i = P(() => t.muted ? 0 : t.volume), a = P(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function o(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return X(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (W(), L("div", Ct, [B(C, {
			name: a.value,
			label: Y(t).muted ? Y(r)("player.unmute") : Y(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => Y(t).toggleMute()
		}, null, 8, ["name", "label"]), B(T, {
			class: "volume__slider",
			"model-value": i.value,
			min: 0,
			max: 1,
			step: .05,
			label: Y(r)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": o
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]), Tt = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		], n = d(), { t: r } = s(), i = P(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (W(), F(E, {
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
// src/components/player/QualityMenu.vue
var It = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let r = e, i = Me(e, "open"), a = G(null);
		function o() {
			a.value?.toggleMenu();
		}
		let c = n, l = d(), u = b(), { t: f } = s(), p = P(() => At(r.levels)), m = P(() => {
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
		}), h = P(() => p.value.length >= 2 ? p.value : m.value), g = P(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), _ = P(() => Mt(r.levels, g.value)), v = P(() => g.value && _.value >= 0 ? {
			value: Dt,
			label: f("player.qualityOriginal", { height: g.value.height })
		} : null), y = P(() => h.value.length >= 2), ee = P(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: kt(r.activeHeight) })), x = P(() => [
			{
				value: Et,
				label: ee.value
			},
			...v.value ? [v.value] : [],
			...h.value
		]), S = P(() => r.autoEnabled ? Et : v.value && r.currentLevel === _.value && (l.quality === "original" || u.defaultQuality === "original") ? Dt : Ft(r.levels, r.currentLevel));
		function C(e) {
			let t = String(e);
			if (t === "auto") {
				l.setQuality(t), u.defaultQuality = t, c("select", "auto");
				return;
			}
			let n = t === "original" ? _.value : jt(r.levels, t);
			l.setQuality(t), u.defaultQuality = t, n >= 0 ? c("select", n) : c("select", t);
		}
		return t({ toggleMenu: o }), (e, t) => y.value || i.value ? (W(), F(E, {
			key: 0,
			ref_key: "selectRef",
			ref: a,
			class: "quality-menu",
			tone: "glass",
			"model-value": S.value,
			options: x.value,
			label: Y(f)("player.quality"),
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
}), [["__scopeId", "data-v-58498bdd"]]), Lt = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		X(() => n.controlsRoot, u, { immediate: !0 }), ke(l);
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
				j(n.video, n.language);
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
			_(), j(n.video, n.language);
			let e = A(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = k(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return X(() => [n.video, n.language], y, { immediate: !0 }), ke(_), t({ lines: r }), (t, n) => r.value.length ? (W(), L("div", {
			key: 0,
			class: H(["player__captions", { "is-lifted": e.lifted }]),
			style: U(o.value)
		}, [(W(!0), L(N, null, K(r.value, (e, t) => (W(), L("p", {
			key: t,
			class: "player__caption-line"
		}, q(e), 1))), 128))], 6)) : I("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), Rt = ["aria-label", "aria-expanded"], zt = ["aria-label"], Bt = { class: "capmenu__head" }, Vt = { class: "capmenu__title" }, Ht = ["aria-label"], Ut = ["aria-checked", "tabindex"], Wt = { class: "capmenu__check" }, Gt = { class: "capmenu__optlabel" }, Kt = [
	"aria-checked",
	"tabindex",
	"onClick"
], qt = { class: "capmenu__check" }, Jt = { class: "capmenu__optlabel" }, Yt = { class: "capmenu__check" }, Xt = { class: "capmenu__optlabel" }, Zt = { class: "capmenu__title capmenu__title--sub" }, Qt = ["aria-label"], $t = [
	"aria-checked",
	"tabindex",
	"onClick"
], en = { class: "capmenu__check" }, tn = { class: "capmenu__optlabel" }, nn = { class: "capmenu__title capmenu__title--sub" }, rn = { class: "capmenu__style" }, an = { class: "capmenu__field" }, on = { class: "capmenu__fieldlabel" }, sn = { class: "capmenu__field" }, cn = { class: "capmenu__fieldlabel" }, ln = { class: "capmenu__field" }, un = { class: "capmenu__fieldlabel" }, dn = { class: "capmenu__field" }, fn = { class: "capmenu__fieldlabel" }, pn = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let n = e, r = t, i = d(), a = b(), { t: o } = s(), c = G(null), l = G(null), u = P(() => i.subtitleLang), f = P(() => n.tracks.some((e) => e.language === u.value)), p = P(() => f.value ? "captions" : "captions-off"), m = P(() => f.value ? n.tracks.findIndex((e) => e.language === u.value) + 1 : 0), h = P(() => n.activeAudio >= 0 ? n.activeAudio : 0);
		function g(e) {
			r("update:open", e);
		}
		function _() {
			g(!1);
		}
		function v(e) {
			i.setSubtitle(e), a.defaultSubtitleLang = e, a.subtitlePreferenceSet = !0;
		}
		function y(e) {
			r("select-audio", e);
		}
		function ee() {
			r("add-subtitles"), _();
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
		function T(e) {
			let t = x(e, n.tracks.length + 1, m.value);
			t !== null && v(t === 0 ? null : n.tracks[t - 1].language);
		}
		function D(e) {
			let t = x(e, n.audioTracks.length, h.value);
			t !== null && y(n.audioTracks[t].index);
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
		function ne(e) {
			a.captionStyle = {
				...a.captionStyle,
				edge: e
			};
		}
		w(l, J(n, "open"), {
			lockScroll: !1,
			onEscape: () => (_(), !0)
		});
		function ie(e) {
			c.value && !c.value.contains(e.target) && _();
		}
		return X(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", ie, !0) : document.removeEventListener("pointerdown", ie, !0));
		}, { immediate: !0 }), ke(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", ie, !0);
		}), (t, n) => (W(), L("div", {
			ref_key: "rootEl",
			ref: c,
			class: "capmenu"
		}, [R("button", {
			type: "button",
			class: H(["capmenu__btn", { "is-active": f.value }]),
			"aria-label": f.value ? Y(o)("player.captionsOn") : Y(o)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => g(!e.open)
		}, [B(S, { name: p.value }, null, 8, ["name"])], 10, Rt), e.open ? (W(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(o)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			R("div", Bt, [R("h3", Vt, q(Y(o)("player.subtitles")), 1), B(C, {
				name: "x",
				label: Y(o)("common.close"),
				size: "sm",
				onClick: _
			}, null, 8, ["label"])]),
			R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(o)("player.subtitleTrack"),
				onKeydown: T
			}, [R("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !f.value,
				tabindex: m.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => v(null)
			}, [R("span", Wt, [f.value ? I("", !0) : (W(), F(S, {
				key: 0,
				name: "check"
			}))]), R("span", Gt, q(Y(o)("player.off")), 1)], 8, Ut), (W(!0), L(N, null, K(e.tracks, (e, t) => (W(), L("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": u.value === e.language,
				tabindex: m.value === t + 1 ? 0 : -1,
				onClick: (t) => v(e.language)
			}, [R("span", qt, [u.value === e.language ? (W(), F(S, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", Jt, q(e.label), 1)], 8, Kt))), 128))], 40, Ht),
			R("button", {
				type: "button",
				class: "capmenu__add",
				onClick: ee
			}, [R("span", Yt, [B(S, { name: "plus" })]), R("span", Xt, q(Y(o)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (W(), L(N, { key: 0 }, [R("h3", Zt, q(Y(o)("player.audio")), 1), R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(o)("player.audioTrack"),
				onKeydown: D
			}, [(W(!0), L(N, null, K(e.audioTracks, (t) => (W(), L("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: h.value === t.index ? 0 : -1,
				onClick: (e) => y(t.index)
			}, [R("span", en, [e.activeAudio === t.index ? (W(), F(S, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", tn, q(t.label), 1)], 8, $t))), 128))], 40, Qt)], 64)) : I("", !0),
			R("h3", nn, q(Y(o)("player.captionStyle")), 1),
			R("div", rn, [
				R("div", an, [R("span", on, q(Y(o)("player.size")), 1), B(E, {
					"model-value": Y(a).captionStyle.size,
					options: Y(te),
					label: Y(o)("player.captionSize"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", sn, [R("span", cn, q(Y(o)("player.color")), 1), B(E, {
					"model-value": Y(a).captionStyle.textColor,
					options: Y(re),
					label: Y(o)("player.captionColor"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", ln, [R("span", un, q(Y(o)("player.background")), 1), B(E, {
					"model-value": Y(a).captionStyle.background,
					options: Y(oe),
					label: Y(o)("player.captionBackground"),
					"onUpdate:modelValue": A
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", dn, [R("span", fn, q(Y(o)("player.edge")), 1), B(E, {
					"model-value": Y(a).captionStyle.edge,
					options: Y(ae),
					label: Y(o)("player.captionEdge"),
					"onUpdate:modelValue": ne
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, zt)) : I("", !0)], 512));
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
}, kn = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
	setup(e, { emit: t }) {
		let n = e, a = t, { t: o } = s(), c = ee(), l = [
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
		function u(e) {
			if (!e) return e;
			try {
				let t = Intl.DisplayNames;
				if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
			} catch {}
			return e;
		}
		let d = P(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let r of [...n.preferredLangs, ...l]) {
				let n = (r || "").toLowerCase();
				n && !e.has(n) && (e.add(n), t.push(n));
			}
			return t;
		}), f = G(/* @__PURE__ */ new Set());
		function p() {
			let e = /* @__PURE__ */ new Set();
			for (let t of n.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), f.value = e;
		}
		function m(e) {
			let t = new Set(f.value);
			t.has(e) ? t.delete(e) : t.add(e), f.value = t;
		}
		let h = G(!1), g = G(!1), _ = G([]), v = G(/* @__PURE__ */ new Set()), y = G(/* @__PURE__ */ new Set());
		function b(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let x = P(() => [..._.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), C = P(() => f.value.size > 0 && !h.value);
		function w() {
			return n.client ?? new r({ baseUrl: n.apiBase ?? "" });
		}
		async function T() {
			if (C.value) {
				h.value = !0, g.value = !0;
				try {
					_.value = await w().searchSubtitles(n.mediaId, [...f.value]);
				} catch {
					_.value = [], c.error(o("player.subtitleSearchError"));
				} finally {
					h.value = !1;
				}
			}
		}
		function E() {
			a("update:open", !1);
		}
		function D(e) {
			if (e instanceof i) {
				if (e.status === 429) {
					let t = e.body && typeof e.body == "object" ? e.body : {}, n = typeof t.downloadsRemaining == "number" ? t.downloadsRemaining : null, r = typeof t.resetTimeUtc == "string" ? t.resetTimeUtc : null;
					r ? c.warning(o("player.subtitleQuotaReset", { time: O(r) })) : n === null ? c.warning(o("player.subtitleQuota")) : c.warning(o("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (e.status === 404) {
					c.error(o("player.subtitleAddNotFound"));
					return;
				}
			}
			c.error(o("player.subtitleAddError"));
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
			let t = b(e);
			if (v.value.has(t) || y.value.has(t)) return;
			let r = new Set(v.value);
			r.add(t), v.value = r;
			try {
				let r = Ye([(await w().downloadSubtitle(n.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], i = new Set(y.value);
				i.add(t), y.value = i;
				let s = u(e.language);
				c.success(s ? o("player.subtitleAdded", { language: s }) : o("player.subtitleAddedGeneric")), r && a("added", r);
			} catch (e) {
				D(e);
			} finally {
				let e = new Set(v.value);
				e.delete(t), v.value = e;
			}
		}
		return X(() => n.open, (e) => {
			e && (p(), _.value = [], g.value = !1, h.value = !1, v.value = /* @__PURE__ */ new Set(), y.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (t, n) => (W(), F(ce, {
			"model-value": e.open,
			title: Y(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: Z(() => [B(le, {
				variant: "ghost",
				onClick: E
			}, {
				default: Z(() => [z(q(Y(o)("common.close")), 1)]),
				_: 1
			})]),
			default: Z(() => [R("div", mn, [
				R("fieldset", hn, [R("legend", gn, q(Y(o)("player.subtitleSearchLanguages")), 1), R("div", _n, [(W(!0), L(N, null, K(d.value, (e) => (W(), F(ue, {
					key: e,
					selected: f.value.has(e),
					size: "md",
					"aria-label": u(e),
					"onUpdate:selected": (t) => m(e)
				}, {
					default: Z(() => [z(q(u(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				R("div", vn, [B(le, {
					variant: "solid",
					"left-icon": "search",
					loading: h.value,
					disabled: !C.value,
					onClick: T
				}, {
					default: Z(() => [z(q(Y(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				h.value ? (W(), L("div", yn, [B(de, { label: Y(o)("player.subtitleSearching") }, null, 8, ["label"]), R("span", null, q(Y(o)("player.subtitleSearching")), 1)])) : g.value && x.value.length === 0 ? (W(), F(pe, {
					key: 1,
					icon: "captions",
					title: Y(o)("player.subtitleSearchEmpty"),
					description: Y(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : g.value ? (W(), L("ul", xn, [(W(!0), L(N, null, K(x.value, (e) => (W(), L("li", {
					key: b(e),
					class: "subsearch__item"
				}, [R("div", Sn, [R("p", Cn, q(e.releaseName || e.provider), 1), R("div", wn, [
					B(fe, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Z(() => [z(q(u(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (W(), F(fe, {
						key: 0,
						tone: "info",
						size: "sm",
						label: Y(o)("player.subtitleHearingImpairedFull")
					}, {
						default: Z(() => [z(q(Y(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : I("", !0),
					R("span", Tn, q(e.provider), 1),
					e.rating > 0 ? (W(), L("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": Y(o)("player.subtitleRating", { rating: e.rating })
					}, [B(S, { name: "star" }), z(" " + q(e.rating), 1)], 8, En)) : I("", !0),
					e.downloadCount > 0 ? (W(), L("span", Dn, q(Y(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : I("", !0),
					e.fps ? (W(), L("span", On, q(Y(o)("player.subtitleFps", { fps: e.fps })), 1)) : I("", !0)
				])]), B(le, {
					variant: "outline",
					size: "sm",
					"left-icon": y.value.has(b(e)) ? "check" : "plus",
					loading: v.value.has(b(e)),
					disabled: v.value.has(b(e)) || y.value.has(b(e)),
					"aria-label": Y(o)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => k(e)
				}, {
					default: Z(() => [z(q(v.value.has(b(e)) ? Y(o)("player.subtitleAdding") : Y(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (W(), L("p", bn, q(Y(o)("player.subtitleSearchPrompt")), 1))
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
function Fn(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var In = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
			r.value = Fn(i);
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
				c.value = Pn(Mn(n, 32, 18));
			} catch {
				f = !0, c.value = null;
			}
		}
		function h(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let g = null, _ = null, v = null, y = 0, b = !1;
		function ee(e) {
			_ = e, g = e.requestVideoFrameCallback(x);
		}
		function x(e) {
			if (!b) return;
			e - y >= 250 && (y = e, m());
			let t = n.video;
			h(t) && ee(t);
		}
		function S() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			h(e) ? (b = !0, y = 0, ee(e)) : (m(), f || (b = !0, v = setInterval(m, 250)));
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
		}, { immediate: !0 }), Ae(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), ke(() => {
			C(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
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
}), [["__scopeId", "data-v-88c68588"]]), Ln = ["aria-label"], Rn = { class: "resume__label" }, $ = { class: "resume__time numeric" }, zn = { class: "resume__actions" }, Bn = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = s(), i = P(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (W(), L("div", {
			class: "resume",
			role: "region",
			"aria-label": Y(r)("player.resumePlayback")
		}, [R("p", Rn, [
			z(q(i.value[0]), 1),
			R("span", $, q(Y(Be)(e.seconds)), 1),
			z(q(i.value[1]), 1)
		]), R("div", zn, [R("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [B(S, { name: "play" }), R("span", null, q(Y(r)("player.resume")), 1)]), R("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [B(S, { name: "rewind" }), R("span", null, q(Y(r)("player.startOver")), 1)])])], 8, Ln));
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
], Sr = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let { t: n } = s(), { imgSrc: r } = l(), i = e, a = t, o = P(() => i.posterUrl ?? i.media.poster_url ?? null), c = P(() => $n(i.remaining, i.total));
		return (t, i) => (W(), L("aside", {
			class: "upnext",
			role: "region",
			"aria-label": Y(n)("player.upNext")
		}, [
			o.value ? (W(), L("img", {
				key: 0,
				class: "upnext__thumb",
				src: Y(r)(o.value),
				alt: "",
				loading: "lazy"
			}, null, 8, pr)) : I("", !0),
			R("div", mr, [
				R("p", hr, q(Y(n)("player.upNext")), 1),
				R("h4", gr, q(e.media.name), 1),
				e.counting ? (W(), L("p", _r, q(e.remaining > 0 ? Y(n)("player.startsIn", { count: e.remaining }) : Y(n)("player.startingNow")), 1)) : I("", !0),
				R("div", vr, [R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [B(S, { name: "play" }), R("span", null, q(Y(n)("player.playNow")), 1)]), R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, q(Y(n)("player.cancel")), 1)])
			]),
			e.counting ? (W(), L("svg", yr, [R("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, br), R("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Y(Qn),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, xr)])) : I("", !0)
		], 8, fr));
	}
}), [["__scopeId", "data-v-3fc667d0"]]), Cr = {
	class: "transcode",
	role: "alert"
}, wr = { class: "transcode__card" }, Tr = { class: "transcode__heading" }, Er = { class: "transcode__body" }, Dr = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = s();
		return (t, i) => (W(), L("div", Cr, [R("div", wr, [
			B(S, {
				name: "alert",
				class: "transcode__icon"
			}),
			R("h3", Tr, q(Y(r)("player.transcodeHeading")), 1),
			R("p", Er, q(e.title ? Y(r)("player.transcodeBodyTitled", { title: e.title }) : Y(r)("player.transcodeBodyUntitled")), 1),
			R("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [B(S, { name: "arrow-left" }), R("span", null, q(Y(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Or = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, kr = { class: "prep__card" }, Ar = { class: "prep__heading" }, jr = { class: "prep__body" }, Mr = ["aria-valuenow"], Nr = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = s(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (W(), L("div", Or, [R("div", kr, [
			B(S, {
				name: "spinner",
				class: "prep__spinner"
			}),
			R("h3", Ar, q(Y(n)("player.transcodePreparingHeading")), 1),
			R("p", jr, q(e.title ? Y(n)("player.transcodePreparingTitled", { title: e.title }) : Y(n)("player.transcodePreparingUntitled")), 1),
			R("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [R("div", {
				class: "prep__bar-fill",
				style: U({ width: r() + "%" })
			}, null, 4)], 8, Mr),
			R("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [B(S, { name: "arrow-left" }), R("span", null, q(Y(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Pr = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = s();
		function a(e, t) {
			return !!t && t.end > t.start && e >= t.start && e < t.end;
		}
		let o = P(() => a(n.position, n.introMarker) ? {
			label: i("player.skipIntro"),
			target: n.introMarker.end
		} : a(n.position, n.outroMarker) ? {
			label: i("player.skipOutro"),
			target: n.outroMarker.end
		} : null);
		function c() {
			o.value && r("skip", o.value.target);
		}
		return (e, t) => (W(), F(Te, { name: "skip" }, {
			default: Z(() => [o.value ? (W(), L("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ne(c, ["stop"])
			}, [R("span", null, q(o.value.label), 1), B(S, { name: "skip-forward" })])) : I("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Fr = ["aria-label"], Ir = ["aria-label", "onClick"], Lr = { class: "skip-controls__label" }, Rr = 5, zr = 30, Br = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = s();
		function a(e) {
			return e / 1e3;
		}
		function o(e, t) {
			return t >= a(e.endMs);
		}
		function c(e, t) {
			if (o(e, t)) return !1;
			let n = a(e.startMs), r = n - Rr, i = n + zr;
			return t >= r && t < i;
		}
		let l = [
			"intro",
			"outro",
			"credits"
		];
		function u(e) {
			switch (e) {
				case "intro": return i("player.skipLabelIntro");
				case "outro": return i("player.skipLabelCredits");
				case "credits": return i("player.skipLabelCredits");
				case "ad": return i("player.skipLabelSkipCredits");
			}
		}
		let d = P(() => !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => l.includes(e.type) && c(e, n.position)).sort((e, t) => e.startMs - t.startMs));
		function f(e) {
			r("skip", a(e.startMs));
		}
		return (e, t) => d.value.length > 0 ? (W(), L("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": Y(i)("player.skipControls")
		}, [(W(!0), L(N, null, K(d.value, (e) => (W(), L("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${u(e.type)}`,
			onClick: Ne((t) => f(e), ["stop"])
		}, [R("span", Lr, q(u(e.type)), 1), B(S, { name: "skip-forward" })], 8, Ir))), 128))], 8, Fr)) : I("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Vr = ["aria-label", "aria-expanded"], Hr = ["aria-label"], Ur = { class: "chapterlist__head" }, Wr = { class: "chapterlist__title" }, Gr = ["aria-label"], Kr = ["onClick"], qr = { class: "chapterlist__index" }, Jr = { class: "chapterlist__name" }, Yr = { class: "chapterlist__meta" }, Xr = { class: "chapterlist__time" }, Zr = {
	key: 0,
	class: "chapterlist__duration"
}, Qr = {
	key: 1,
	class: "chapterlist__empty"
}, $r = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let n = e, r = t, { t: i } = s();
		function a() {
			r("update:open", !1);
		}
		function o() {
			r("update:open", !n.open);
		}
		let c = P(() => n.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Be(e.start), a;
			return e.end != null && e.end > e.start && (a = Be(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), l = G(null), u = G(null);
		w(u, J(n, "open"), {
			lockScroll: !1,
			onEscape: () => (a(), !0)
		});
		function d(e) {
			l.value && !l.value.contains(e.target) && a();
		}
		X(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", d, !0) : document.removeEventListener("pointerdown", d, !0));
		}), ke(() => {
			document.removeEventListener("pointerdown", d, !0);
		});
		function f(e) {
			r("seek", e.start), a();
		}
		return (t, n) => (W(), L("div", {
			ref_key: "rootEl",
			ref: l,
			class: "chapterlist"
		}, [R("button", {
			type: "button",
			class: H(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": Y(i)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: o
		}, [B(S, { name: "list" })], 10, Vr), e.open ? (W(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(i)("player.chapterList"),
			tabindex: "-1"
		}, [R("div", Ur, [R("h3", Wr, q(Y(i)("player.chapters")), 1), B(C, {
			name: "x",
			label: Y(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), c.value.length > 0 ? (W(), L("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": Y(i)("player.chapterList")
		}, [(W(!0), L(N, null, K(c.value, (e) => (W(), L("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [R("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => f(e.chapter)
		}, [
			R("span", qr, q(e.index), 1),
			R("span", Jr, q(e.label), 1),
			R("span", Yr, [R("span", Xr, q(e.startLabel), 1), e.durationLabel ? (W(), L("span", Zr, "· " + q(e.durationLabel), 1)) : I("", !0)])
		], 8, Kr)]))), 128))], 8, Gr)) : (W(), L("p", Qr, q(Y(i)("player.noChapters")), 1))], 8, Hr)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ei = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, ti = { class: "marker-timeline__ticks" }, ni = [
	"title",
	"aria-label",
	"onClick"
], ri = { class: "marker-timeline__tooltip" }, ii = { class: "marker-timeline__tooltip-label" }, ai = { class: "marker-timeline__tooltip-time numeric" }, oi = ["onClick"], si = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		}, [l.value ? (W(), L("div", ei, [t[0] ||= R("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [R("polygon", { points: "5,3 19,12 5,21" })], -1), z(" " + q(u.value), 1)])) : I("", !0), R("div", ti, [(W(!0), L(N, null, K(s.value, (e) => (W(), L("button", {
			key: e.id,
			type: "button",
			class: H(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: U({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Y(Be)(e.startSec)}`,
			"aria-label": `${e.label} at ${Y(Be)(e.startSec)}`,
			onClick: Ne((t) => d(e), ["stop"])
		}, [R("span", ri, [
			R("span", ii, q(e.label), 1),
			R("span", ai, q(Y(Be)(e.startSec)), 1),
			R("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ne((t) => f(e), ["stop"])
			}, " Find similar ", 8, oi)
		])], 14, ni))), 128))])], 2)) : I("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), ci = ["aria-label", "aria-expanded"], li = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, ui = ["aria-label"], di = ["aria-selected", "onClick"], fi = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(e, { expose: t }) {
		let n = e, { t: r } = s(), i = [
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
		], a = G(0), o = G(0), c = P(() => o.value > 0), l;
		function u() {
			l &&= (clearInterval(l), void 0);
		}
		function d(e) {
			u(), o.value = e, e <= 0 || (l = setInterval(() => {
				--o.value, o.value <= 0 && (u(), o.value = 0, n.onExpire());
			}, 1e3));
		}
		function f(e) {
			a.value = e, e === 0 ? (u(), o.value = 0) : d(e);
		}
		function p(e) {
			let t = Math.floor(e / 60), n = e % 60;
			return `${t}:${String(n).padStart(2, "0")}`;
		}
		let m = G(!1);
		function h() {
			c.value ? (f(0), m.value = !1) : m.value = !m.value;
		}
		function g(e) {
			f(e), m.value = !1;
		}
		return ke(() => {
			u();
		}), t({ toggleOpen: h }), (e, t) => (W(), L("div", { class: H(["sleep-timer", { "is-active": c.value }]) }, [R("button", {
			type: "button",
			class: H(["sleep-timer__trigger", { "is-active": c.value }]),
			"aria-label": c.value ? `Sleep timer: ${p(o.value)} remaining` : Y(r)("player.sleepTimer"),
			"aria-expanded": m.value,
			"aria-haspopup": "listbox",
			onClick: h
		}, [B(S, { name: "moon" }), c.value ? (W(), L("span", li, q(p(o.value)), 1)) : I("", !0)], 10, ci), B(Te, { name: "dropdown" }, {
			default: Z(() => [m.value ? (W(), L("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": Y(r)("player.sleepTimer")
			}, [(W(), L(N, null, K(i, (e) => R("li", {
				key: e.value,
				class: H(["sleep-timer__option", { "is-selected": a.value === e.value }]),
				role: "option",
				"aria-selected": a.value === e.value,
				onClick: (t) => g(e.value)
			}, q(e.label), 11, di)), 64))], 8, ui)) : I("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), pi = {
	key: 0,
	class: "syncplay-overlay"
}, mi = { class: "syncplay-overlay__badge" }, hi = { class: "syncplay-overlay__label" }, gi = { class: "syncplay-overlay__status-label" }, _i = { class: "syncplay-overlay__members" }, vi = { class: "syncplay-overlay__member-count" }, yi = { class: "syncplay-overlay__member-list" }, bi = { class: "syncplay-overlay__member-name" }, xi = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Si = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let t = e, { t: n } = s(), r = me(), i = a(), o = P(() => t.apiBase ?? i.value), c = P(() => r.currentRoom?.name ?? "SyncPlay"), l = P(() => r.onlineMembers.length), u = P(() => r.syncStatus), d = P(() => {
			switch (u.value) {
				case "synced": return n("syncplay.synced");
				case "outOfSync": return n("syncplay.outOfSync");
				case "re-syncing": return n("syncplay.reSyncing");
				default: return n("syncplay.synced");
			}
		}), f = P(() => {
			switch (u.value) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		});
		async function p() {
			await r.leaveRoom(o.value);
		}
		return (e, t) => Y(r).isInRoom ? (W(), L("div", pi, [
			R("div", mi, [B(S, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), R("span", hi, "SyncPlay: " + q(c.value), 1)]),
			R("div", { class: H(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [B(S, {
				name: f.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), R("span", gi, q(d.value), 1)], 2),
			R("div", _i, [R("span", vi, [B(S, { name: "user" }), z(" " + q(Y(n)("syncplay.members", { count: l.value })), 1)]), R("ul", yi, [(W(!0), L(N, null, K(Y(r).onlineMembers.slice(0, 5), (e) => (W(), L("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= R("span", { class: "syncplay-overlay__member-dot" }, null, -1), R("span", bi, q(e.name), 1)]))), 128)), Y(r).onlineMembers.length > 5 ? (W(), L("li", xi, " +" + q(Y(r).onlineMembers.length - 5) + " more ", 1)) : I("", !0)])]),
			B(le, {
				variant: "ghost",
				size: "sm",
				onClick: p
			}, {
				default: Z(() => [z(q(Y(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), Ci = {
	key: 0,
	class: "syncplay-controls"
}, wi = ["aria-label"], Ti = { class: "syncplay-controls__wait-label" }, Ei = { class: "syncplay-controls__transport" }, Di = ["aria-label"], Oi = ["aria-label"], ki = ["aria-label"], Ai = { class: "syncplay-controls__status-label" }, ji = 10, Mi = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let r = e, i = t, { t: o } = s(), c = me(), l = ee(), u = Ee("phlixConfig", null), d = a(), f = P(() => r.apiBase ?? d.value);
		he((e) => {
			l.error(n(e, u?.locale, o("syncplay.commandRejected")));
		}), je(() => he(null));
		let p = G(!1), m = P(() => p.value || c.syncStatus === "re-syncing");
		async function h() {
			if (c.isInRoom) try {
				await c.sendCommand(f.value, "play"), i("play");
			} catch {
				l.error(o("syncplay.commandFailed"));
			}
		}
		async function g() {
			if (c.isInRoom) try {
				await c.sendCommand(f.value, "pause"), i("pause");
			} catch {
				l.error(o("syncplay.commandFailed"));
			}
		}
		async function _() {
			r.isPlaying ? await g() : await h();
		}
		async function v(e) {
			if (c.isInRoom) try {
				await c.sendCommand(f.value, "seek", { position: e }), i("seek", e);
			} catch {
				l.error(o("syncplay.commandFailed"));
			}
		}
		async function y() {
			await v(Math.max(0, r.position - ji));
		}
		async function b() {
			await v(Math.min(r.duration, r.position + ji));
		}
		return X(() => c.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => Y(c).isInRoom ? (W(), L("div", Ci, [
			m.value ? (W(), L("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": Y(o)("syncplay.waitingForMembers")
			}, [B(S, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), R("span", Ti, q(Y(o)("syncplay.waitingForMembers")), 1)], 8, wi)) : I("", !0),
			R("div", Ei, [
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.rewind"),
					onClick: y
				}, [B(S, { name: "rewind" })], 8, Di),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Y(o)("syncplay.pauseAll") : Y(o)("syncplay.playAll"),
					onClick: _
				}, [B(S, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Oi),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.fastForward"),
					onClick: b
				}, [B(S, { name: "forward" })], 8, ki)
			]),
			R("div", { class: H(["syncplay-controls__status", `syncplay-controls__status--${Y(c).syncStatus}`]) }, [B(S, {
				name: Y(c).syncStatus === "synced" ? "check" : Y(c).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), R("span", Ai, q(Y(c).syncStatus === "synced" ? Y(o)("syncplay.synced") : Y(c).syncStatus === "outOfSync" ? Y(o)("syncplay.outOfSync") : Y(o)("syncplay.reSyncing")), 1)], 2)
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-338c0ffc"]]);
// src/utils/subtitleSrc.ts
function Ni(e, t) {
	return String(c(e, t));
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
], Ri = {
	key: 0,
	class: "player__buffering"
}, zi = {
	class: "player__buffering-text",
	"aria-hidden": "true"
}, Bi = { class: "player__meta" }, Vi = ["aria-label"], Hi = { class: "player__meta-text" }, Ui = { class: "player__eyebrow" }, Wi = { class: "player__title" }, Gi = { class: "player__sub numeric" }, Ki = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, qi = {
	key: 1,
	class: "player__center"
}, Ji = ["aria-label"], Yi = ["aria-label"], Xi = ["aria-label"], Zi = { class: "player__btnrow" }, Qi = ["aria-label"], $i = ["aria-label"], ea = ["aria-label"], ta = { class: "player__time numeric" }, na = ["aria-label", "aria-pressed"], ra = ["title"], ia = ["aria-label"], aa = ["aria-label"], oa = ["aria-label", "aria-pressed"], sa = ["aria-label", "aria-pressed"], ca = ["aria-label"], la = { class: "similar-modal" }, ua = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, da = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, fa = { class: "similar-modal__state-title" }, pa = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, ma = {
	key: 3,
	class: "similar-modal__results"
}, ha = { class: "similar-modal__poster" }, ga = ["src", "alt"], _a = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, va = { class: "similar-modal__result-body" }, ya = { class: "similar-modal__result-title" }, ba = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, xa = { key: 0 }, Sa = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let { imgSrc: n } = l(), i = e, o = t, c = d(), u = b(), { t: h } = s(), g = me(), _ = f(), v = P(() => _.isFavorite(i.media.id)), y = P(() => _.likeLevel(i.media.id));
		function x() {
			_.toggleFavorite(i.media.id, De());
		}
		function C(e) {
			_.setLike(i.media.id, e, De());
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
		], T = G(null), E = G(null), O = G(null), k = G(!0), A = G(!1), te = G(!1), re = G(!1), ae = G(!1), j = G(!1), oe = G(!1), le = G(!1), ue = G(null), fe = G(null), pe = G(!1), he = ee(), _e = G(!1);
		function ve(e) {
			he.success(h("syncplay.joinedRoom", { name: e.name }));
		}
		let ye = P(() => j.value ? 1.35 : 1), M = G(Wn(i.streamUrl, i.media.path)), be = P(() => ar(i.media.streams)), xe = 0;
		async function Se() {
			let e = ++xe;
			if (M.value) return;
			let t = await dr([i.streamUrl, i.media.path], i.playbackAudioTracks ?? [], be.value);
			e === xe && t && !M.value && (M.value = !0, ze(T.value?.currentTime ?? 0));
		}
		X([() => i.playbackAudioTracks, be], () => {
			Se();
		}, { immediate: !0 });
		let Ce = Ee("phlixConfig", null), we = a(), Te = Ee("resumeReporter", null), V = !1;
		function De() {
			return we.value;
		}
		let U = ut({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: Ce?.playerHlsConfig
		}), je = pt({ apiBase: () => i.apiBase ?? "" }), J = null;
		function Me(e) {
			J !== null && clearTimeout(J), J = setTimeout(() => {
				J = null, je.fetch(e);
			}, 0);
		}
		let Pe = P(() => i.thumbnailAt ?? je.thumbnailAt), Fe = P(() => M.value ? void 0 : i.streamUrl), Ie = P(() => M.value && U.state.value !== "ready"), Le = P(() => M.value && (U.state.value === "preparing" || U.state.value === "idle")), Re = P(() => M.value && U.state.value === "error");
		function ze(e = 0) {
			let t = T.value, n = navigator.connection?.downlinkMax, r = rt(n);
			t && U.start(t, i.media.id, r, e);
		}
		function Ve(e) {
			c.quality === "original" && e !== "auto" ? U.loadVariantPlaylist(Dt) : typeof e == "string" && e !== "auto" ? U.loadVariantPlaylist(e) : U.setLevel(e);
		}
		let He = !1;
		function Ue() {
			u.defaultQuality = Et;
		}
		function We() {
			let e = U.levels.value;
			if (e.length === 0) return !1;
			let t = u.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = U.variants.value;
				if (!t || t.length === 0) return !1;
				if (Pt(e, t)) U.loadVariantPlaylist(Dt);
				else {
					let t = Nt(e);
					t >= 0 && U.setNextLevel(t), Ue();
				}
				return !0;
			}
			let n = jt(e, t);
			return n >= 0 ? U.setNextLevel(n) : Ue(), !0;
		}
		X(() => U.levels.value, (e) => {
			He || e.length === 0 || We() && (He = !0);
		}), X(() => U.variants.value, (e) => {
			!He && e?.length && Oe(() => {
				He || We() && (He = !0);
			});
		}, { deep: !0 });
		let Ke = G(c.resumePositionFor(i.media.id) ?? 0), Q = G(!M.value && Ke.value > 0), qe = null, Je = G(!1), Ye = G(8), Xe, Ze = G(null), Qe = G(0), $e = G(!1), et = G([]), tt = G(!1), nt = G(null);
		function it(e, t) {
			Ze.value = e, Qe.value = t, et.value = [], nt.value = null, $e.value = !0, lt(e, t);
		}
		let at = null, ot = null, st = null;
		function ct() {
			let e = i.apiBase ?? "";
			return (ot === null || st !== e) && (ot = new r({ baseUrl: e }), st = e), ot;
		}
		async function lt(e, t) {
			at?.abort(), at = new AbortController(), tt.value = !0, nt.value = null;
			try {
				let n = await ct().searchByMarker(e, t, 30, 20, at.signal);
				et.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				nt.value = "Failed to load similar media. Please try again.", et.value = [];
			} finally {
				tt.value = !1;
			}
		}
		function dt() {
			at?.abort(), $e.value = !1, et.value = [], nt.value = null, Ze.value = null;
		}
		let ft = P(() => c.upNext);
		function mt() {
			M.value = Wn(i.streamUrl, i.media.path), Se(), Ke.value = c.resumePositionFor(i.media.id) ?? 0, Q.value = !M.value && Ke.value > 0, qe = null, yn = !1, on = !1, nn.value = [], tn.value = !1, sn = !1, Jt.value = -1, mn = null, He = !1, V = !1, Bt(), kt = !1, Ft = 0, Mt = 0, vt(), Je.value = !1, U.reset(), T.value && (T.value.currentTime = 0), M.value && ze(), Me(i.media.id);
		}
		function ht(e) {
			let t = T.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : qe = Math.max(0, e));
		}
		function gt() {
			ht(Ke.value), Q.value = !1, T.value?.play()?.catch(() => {});
		}
		function _t() {
			qe = null, ht(0), c.clearResume(i.media.id), Q.value = !1, T.value?.play()?.catch(() => {});
		}
		function vt() {
			Xe &&= (clearInterval(Xe), void 0);
		}
		function yt() {
			Ye.value = 8, vt(), Xe = setInterval(() => {
				--Ye.value, Ye.value <= 0 && (vt(), xt());
			}, 1e3);
		}
		function bt() {
			V || (V = !0, Te?.finish()), lr(), k.value = !0, c.upNext && (Je.value = !0, u.autoplay && yt());
		}
		function xt() {
			vt(), Je.value = !1;
			let e = c.next(i.streamUrlFor);
			e && o("play-next", e);
		}
		function Ct() {
			vt(), Je.value = !1;
		}
		function Ot() {
			if (M.value) return;
			let e = T.value, t = Kn(e) && (e?.currentTime ?? 0) === 0;
			(Gn(e) || t) && (Rt(), Bt(), M.value = !0, ze(e?.currentTime ?? 0));
		}
		let kt = !1, At = null, Mt = 0, Ft = 0;
		function Rt() {
			if (kt) return;
			kt = !0;
			let e = i.media?.id;
			e != null && e !== "" && ct().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, Yn({ videoCodec: be.value })).catch(() => {});
		}
		function zt() {
			if (At !== null || kt || M.value) return;
			let e = T.value;
			e && (Mt = Date.now(), Ft = e.currentTime, At = setTimeout(() => {
				At = null;
				let e = T.value;
				e && !M.value && Xn(Date.now(), Mt, e.currentTime, Ft) && (Rt(), M.value = !0, ze(e.currentTime));
			}, qn));
		}
		function Bt() {
			At !== null && (clearTimeout(At), At = null);
		}
		let Vt = G([]), Ht = G([]), Ut = G(-1), Wt = G(!1), Gt = P(() => U.state.value === "ready" && U.audioTracks.value.length > 0), Kt = P(() => U.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), qt = P(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Jt = G(-1), Yt = P(() => !Gt.value && !M.value && Ht.value.length === 0 && qt.value.length > 1), Xt = P(() => Gt.value ? Kt.value : Yt.value ? qt.value : Ht.value), Zt = P(() => {
			if (Gt.value) return U.currentAudioTrack.value;
			if (Yt.value) {
				if (Jt.value >= 0) return Jt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Ut.value;
		}), Qt = G(!1), $t = c.subtitleLang, en = P(() => {
			let e = i.apiBase ?? "", t = M.value ? U.subtitleTracks.value : Pi(e, i.playbackSubtitleTracks ?? []);
			if (nn.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Pi(e, nn.value), a = new Set(t.map(n)), o = r.filter((e) => !a.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), tn = G(!1), nn = G([]), rn = P(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(u.defaultSubtitleLang), t(u.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function an(e) {
			nn.value.some((t) => t.url === e.url) || (nn.value = [...nn.value, e]);
		}
		let on = !1, sn = !1;
		function cn() {
			if (on) return;
			if (u.subtitlePreferenceSet) {
				on = !0;
				return;
			}
			let e = en.value.find((e) => e.default);
			if (!e) return;
			let t = Vt.value.find((t) => t.language === (e.language || e.label));
			t && (c.setSubtitle(t.language), $t = t.language, on = !0);
		}
		function ln() {
			if (sn) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = Xt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Zt.value;
			r >= 0 && r < t.length || (hn(n), sn = !0);
		}
		let un = P(() => Vt.value.some((e) => e.language === c.subtitleLang));
		function dn() {
			let e = T.value;
			Vt.value = se(e), Ht.value = ne(e), Ut.value = D(e), cn(), ln();
		}
		function fn() {
			if (un.value) $t = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = $t && Vt.value.some((e) => e.language === $t) ? $t : Vt.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			o("captions");
		}
		let mn = null;
		function hn(e) {
			if (Gt.value) U.setAudioTrack(e);
			else if (Yt.value) {
				if (e === Zt.value) return;
				Jt.value = e, mn = e, M.value = !0, ze(T.value?.currentTime ?? 0);
			} else ie(T.value, e), Ut.value = e;
		}
		X(Gt, (e) => {
			if (!e || mn === null) return;
			let t = mn;
			mn = null, t >= 0 && t < U.audioTracks.value.length && U.setAudioTrack(t);
		}), X(en, () => {
			Oe(() => dn());
		}, { deep: !0 });
		let gn = null, _n, vn = P(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), yn = !1;
		function bn() {
			if (!i.autoplay || yn || Q.value || Ie.value) return;
			let e = T.value;
			if (!e || !e.paused) return;
			yn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, c.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function xn() {
			bn();
		}
		function Sn() {
			i.prevEpisode && o("play-episode", i.prevEpisode);
		}
		function Cn() {
			i.nextEpisode && o("play-episode", i.nextEpisode);
		}
		function wn() {
			let e = T.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Tn(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function En() {
			c.play(), c.setMediaPositionState(), zt();
		}
		function Dn() {
			c.pause(), c.setMediaPositionState(), A.value = !1;
		}
		function On() {
			A.value = !0, lr(), k.value = !0;
		}
		function An() {
			A.value = !1, fr();
		}
		function jn() {
			let e = T.value;
			e && (At !== null && e.currentTime > Ft && Bt(), c.updateProgress(e.currentTime, e.duration, Tn(e)), g.isInRoom && g.updateLocalPosition(e.currentTime));
		}
		function Mn() {
			let e = T.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, qe !== null && (e.currentTime = e.duration ? Math.min(e.duration, qe) : qe, qe = null), c.updateProgress(e.currentTime, e.duration, Tn(e)), c.setMediaPositionState(), dn());
		}
		function Nn() {
			let e = T.value;
			e && c.updateProgress(e.currentTime, e.duration, Tn(e));
		}
		function Pn() {
			let e = T.value;
			e && (Math.abs(e.volume - c.volume) > .001 && c.setVolume(e.volume), e.muted !== c.muted && c.toggleMute());
		}
		function Fn() {
			let e = T.value;
			e && e.playbackRate !== c.rate && c.setRate(e.playbackRate), c.setMediaPositionState();
		}
		function Ln() {
			c.setMediaPositionState();
		}
		function Rn() {
			c.setMediaPositionState();
		}
		function $(e) {
			let t = T.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function zn(e) {
			$(c.position + e);
		}
		function Vn() {
			re.value = !0, fr();
		}
		function Hn() {
			re.value = !1, fr();
		}
		function Un(e) {
			let t = w.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(w[e] - c.rate) ? n : e, 0), n = w[Math.min(w.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		function Jn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Zn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Qn() {
			ue.value?.toggleOpen();
		}
		let $n = null;
		function er() {
			let e = T.value;
			if (!e) {
				c.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), c.pause();
				return;
			}
			$n !== null && (clearInterval($n), $n = null);
			let t = .05;
			$n = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval($n), $n = null, e.volume = 0, e.pause(), c.pause());
			}, 50);
		}
		m({
			playPause: wn,
			seekBy: zn,
			frameStep: (e) => {
				c.playing || $(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: tr,
			toggleFullscreen: rr,
			toggleCaptions: fn,
			toggleTheater: nr,
			togglePip: or,
			skipIntro: Jn,
			skipOutro: Zn,
			sleepTimer: Qn,
			seekToPercent: (e) => $(e * c.duration),
			speedStep: Un,
			toggleHelp: () => {
				ae.value = !ae.value;
			},
			toggleQuality: () => {
				M.value ? (pe.value = !pe.value, fe.value?.toggleMenu?.()) : he.show({
					message: h("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !ae.value && !Wt.value && !Qt.value });
		function tr() {
			c.toggleMute();
		}
		function nr() {
			j.value = !j.value, o("theater", j.value);
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
			e && (e.type === "seekTo" ? ht(e.value) : e.type === "seekBy" && ht(c.position + e.value));
		});
		function rr() {
			if (typeof document > "u") return;
			let e = E.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function ir() {
			te.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function or() {
			let e = T.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function sr() {
			oe.value = !0;
		}
		function cr() {
			oe.value = !1;
		}
		function lr() {
			_n &&= (clearTimeout(_n), void 0);
		}
		function ur() {
			lr(), !c.playing || re.value || A.value || (_n = setTimeout(() => {
				c.playing && !re.value && !A.value && (k.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function fr() {
			k.value = !0, ur();
		}
		let pr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", mr = "data-phlix-prev-tabindex", hr = "__phlix_no_tabindex__";
		function gr(e) {
			let t = E.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(pr) ? [n] : Array.from(n.querySelectorAll(pr));
				for (let n of t) if (e) {
					let e = n.getAttribute(mr);
					e === null || e === hr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(mr);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(mr, n.getAttribute("tabindex") ?? hr), n.setAttribute("tabindex", "-1"));
			}
		}
		X(k, (e) => {
			typeof document < "u" && (gr(e), !e && document.activeElement instanceof HTMLElement && E.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), X(() => c.playing, (e) => {
			e ? (Q.value = !1, Ct(), ur()) : (lr(), A.value = !1, k.value = !0);
		});
		let _r = null;
		Ae(() => {
			c.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), _.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", ir), le.value = document.pictureInPictureEnabled === !0), _r = c.bindMediaSession({
				onPlay: () => void T.value?.play()?.catch(() => {}),
				onPause: () => T.value?.pause(),
				onSeek: (e) => $(e)
			}), gn = T.value?.textTracks ?? null, gn?.addEventListener?.("addtrack", dn), gn?.addEventListener?.("removetrack", dn), dn(), M.value && ze(), Me(i.media.id);
		}), X(() => i.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), mt();
		}), X(() => i.media?.id, () => {
			_.hydrate(i.media);
		}), X(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (T.value?.play()?.catch(() => {}), c.play()) : e.state === "paused" && (T.value?.pause(), c.pause()), g.updateLocalPosition(c.position), Math.abs(g.driftAmount) > 2 && ht(e.playbackPosition));
		});
		let vr = null;
		return X(() => g.pendingPlayMedia, async (e) => {
			if (!e) return;
			let t = null;
			if (i.resolvePendingMedia) {
				try {
					t = await i.resolvePendingMedia({
						mediaId: e.mediaId,
						title: e.title
					});
				} catch {
					t = null;
				}
				if (g.pendingPlayMedia !== e) return;
			}
			if (t) {
				c.setCurrent(t, {
					resetPosition: !0,
					streamUrl: i.streamUrlFor?.(t) ?? ""
				}), T.value?.play()?.catch(() => {}), c.play(), g.consumePendingPlayMedia(), vr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			vr !== n && (vr = n, o("pending-media", e.mediaId, e.title));
		}), ke(() => {
			Te?.reportFinal?.(), lr(), vt(), U.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", ir), _r?.(), gn?.removeEventListener?.("addtrack", dn), gn?.removeEventListener?.("removetrack", dn), $n !== null && (clearInterval($n), $n = null), J !== null && (clearTimeout(J), J = null), Bt();
		}), (t, r) => (W(), L("div", {
			ref_key: "containerRef",
			ref: E,
			class: H(["player", {
				"is-chrome-hidden": !k.value,
				"is-theater": j.value
			}]),
			onPointermove: fr,
			onPointerdown: fr,
			onFocusin: fr
		}, [B(In, {
			video: T.value,
			enabled: Y(u).atmosphere,
			playing: Y(c).playing,
			"reduced-motion": Y(u).effectiveReducedMotion,
			intensity: ye.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), R("div", Fi, [
			R("video", {
				ref_key: "videoRef",
				ref: T,
				class: "player__video",
				src: Fe.value,
				poster: Y(n)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: En,
				onPause: Dn,
				onTimeupdate: jn,
				onLoadedmetadata: Mn,
				onCanplay: xn,
				onWaiting: On,
				onStalled: On,
				onPlaying: An,
				onProgress: Nn,
				onVolumechange: Pn,
				onRatechange: Fn,
				onSeeked: Ln,
				onDurationchange: Rn,
				onEnded: bt,
				onError: Ot,
				onEnterpictureinpicture: sr,
				onLeavepictureinpicture: cr,
				onClick: wn
			}, [(W(!0), L(N, null, K(en.value, (e) => (W(), L("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Li))), 128))], 40, Ii),
			r[22] ||= R("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[23] ||= R("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			A.value ? (W(), L("div", Ri, [B(de, {
				size: 38,
				label: Y(h)("player.buffering")
			}, null, 8, ["label"]), R("span", zi, q(Y(h)("player.buffering")), 1)])) : I("", !0),
			R("div", Bi, [R("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Y(h)("player.back"),
				onClick: r[0] ||= Ne((e) => o("back"), ["stop"])
			}, [B(S, { name: "arrow-left" })], 8, Vi), R("div", Hi, [
				R("p", Ui, q(Y(h)("player.nowPlaying")), 1),
				R("h2", Wi, q(e.media.name), 1),
				R("div", Gi, [(W(!0), L(N, null, K(vn.value, (e, t) => (W(), L(N, { key: t }, [t > 0 && !e.cert ? (W(), L("span", Ki, "·")) : I("", !0), R("span", { class: H({ player__cert: e.cert }) }, q(e.text), 3)], 64))), 128))])
			])]),
			Ie.value ? I("", !0) : (W(), L("div", qi, [
				k.value ? (W(), L("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": Y(h)("player.seekBackward"),
					onClick: r[1] ||= Ne((e) => zn(-10), ["stop"])
				}, [B(S, { name: "rewind" }), R("span", { class: "player__center-skip-count" }, q(10))], 8, Ji)) : I("", !0),
				R("button", {
					type: "button",
					class: H(["player__bigplay", { "is-playing": Y(c).playing }]),
					"aria-label": Y(c).playing ? Y(h)("player.pause") : Y(h)("player.play"),
					onClick: Ne(wn, ["stop"])
				}, [B(S, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Yi),
				k.value ? (W(), L("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": Y(h)("player.seekForward"),
					onClick: r[2] ||= Ne((e) => zn(10), ["stop"])
				}, [B(S, { name: "forward" }), R("span", { class: "player__center-skip-count" }, q(10))], 8, Xi)) : I("", !0)
			])),
			B(Lt, {
				video: T.value,
				language: Y(c).subtitleLang,
				"style-config": Y(u).captionStyle,
				lifted: k.value,
				"controls-root": O.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Ie.value ? I("", !0) : (W(), L("div", {
				key: 2,
				ref_key: "controlsRef",
				ref: O,
				class: "player__controls",
				onClick: r[9] ||= Ne(() => {}, ["stop"])
			}, [
				B(Ge, {
					position: Y(c).position,
					duration: Y(c).duration,
					buffered: Y(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": Pe.value,
					onSeek: $,
					onScrubStart: Vn,
					onScrubEnd: Hn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				Y(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (W(), F(si, {
					key: 0,
					position: Y(c).position,
					duration: Y(c).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: it
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : I("", !0),
				R("div", Zi, [
					e.prevEpisode ? (W(), L("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(h)("player.previousEpisode"),
						onClick: Sn
					}, [B(S, { name: "skip-back" })], 8, Qi)) : I("", !0),
					R("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Y(c).playing ? Y(h)("player.pause") : Y(h)("player.play"),
						onClick: wn
					}, [B(S, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, $i),
					e.nextEpisode ? (W(), L("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(h)("player.nextEpisode"),
						onClick: Cn
					}, [B(S, { name: "skip-forward" })], 8, ea)) : I("", !0),
					R("span", ta, [
						z(q(Y(Be)(Y(c).position)), 1),
						r[18] ||= R("span", { class: "player__sep" }, " / ", -1),
						z(q(Y(Be)(Y(c).duration)), 1)
					]),
					r[19] ||= R("span", { class: "player__grow" }, null, -1),
					R("button", {
						type: "button",
						class: H(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? Y(h)("itemActions.removeFavorite") : Y(h)("itemActions.addFavorite"),
						"aria-pressed": v.value ? "true" : "false",
						onClick: x
					}, [B(S, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, na),
					B(p, {
						level: y.value,
						onCycle: C
					}, null, 8, ["level"]),
					B(wt),
					B(Tt),
					B(It, {
						ref_key: "qualityMenuRef",
						ref: fe,
						open: pe.value,
						"onUpdate:open": r[3] ||= (e) => pe.value = e,
						levels: Y(U).levels.value,
						variants: Y(U).variants.value,
						"current-level": Y(U).currentLevel.value,
						"auto-enabled": Y(U).autoEnabled.value,
						"active-height": Y(U).activeLevelHeight.value,
						onSelect: Ve
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
						title: Y(h)("player.qualityDirectStream")
					}, q(Y(h)("player.directStream")), 9, ra)),
					B(pn, {
						open: Wt.value,
						"onUpdate:open": r[4] ||= (e) => Wt.value = e,
						tracks: Vt.value,
						"audio-tracks": Xt.value,
						"active-audio": Zt.value,
						onSelectAudio: hn,
						onAddSubtitles: r[5] ||= (e) => tn.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					B($r, {
						open: Qt.value,
						"onUpdate:open": r[6] ||= (e) => Qt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					B(fi, {
						ref_key: "sleepTimerRef",
						ref: ue,
						"on-expire": er
					}, null, 512),
					R("button", {
						type: "button",
						class: H(["player__iconbtn player__syncplay", { "is-on": Y(g).isInRoom }]),
						"aria-label": Y(g).isInRoom ? Y(h)("syncplay.inRoom") : Y(h)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[7] ||= (e) => _e.value = !0
					}, [B(S, { name: "user" })], 10, ia),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(h)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[8] ||= (e) => ae.value = !0
					}, [B(S, { name: "info" })], 8, aa),
					le.value ? (W(), L("button", {
						key: 3,
						type: "button",
						class: H(["player__iconbtn", { "is-on": oe.value }]),
						"aria-label": oe.value ? Y(h)("player.exitPip") : Y(h)("player.pip"),
						"aria-pressed": oe.value,
						onClick: or
					}, [B(S, { name: "pip" })], 10, oa)) : I("", !0),
					R("button", {
						type: "button",
						class: H(["player__iconbtn", { "is-on": j.value }]),
						"aria-label": j.value ? Y(h)("player.exitTheater") : Y(h)("player.theater"),
						"aria-pressed": j.value,
						onClick: nr
					}, [B(S, { name: "theater" })], 10, sa),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": te.value ? Y(h)("player.exitFullscreen") : Y(h)("player.fullscreen"),
						onClick: rr
					}, [B(S, { name: te.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ca)
				])
			], 512)),
			Ie.value ? I("", !0) : (W(), F(Pr, {
				key: 3,
				position: Y(c).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Ie.value ? I("", !0) : (W(), F(Br, {
				key: 4,
				position: Y(c).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Q.value && !Ie.value ? (W(), F(Bn, {
				key: 5,
				seconds: Ke.value,
				onResume: gt,
				onRestart: _t
			}, null, 8, ["seconds"])) : I("", !0),
			Je.value && ft.value && !Ie.value ? (W(), F(Sr, {
				key: 6,
				media: ft.value,
				remaining: Ye.value,
				total: Y(8),
				counting: Y(u).autoplay,
				onPlayNow: xt,
				onCancel: Ct
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : I("", !0),
			B(ce, {
				modelValue: $e.value,
				"onUpdate:modelValue": r[10] ||= (e) => $e.value = e,
				title: `Similar ${Ze.value ?? "marker"}s`,
				size: "lg",
				onClose: dt
			}, {
				default: Z(() => [R("div", la, [tt.value ? (W(), L("div", ua, [B(de, { label: "Finding similar media" })])) : nt.value ? (W(), L("div", da, [B(S, {
					name: "error",
					class: "similar-modal__state-icon"
				}), R("p", fa, q(nt.value), 1)])) : !tt.value && et.value.length === 0 ? (W(), L("div", pa, [
					B(S, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[20] ||= R("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[21] ||= R("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (W(), L("ul", ma, [(W(!0), L(N, null, K(et.value, (e) => (W(), L("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [R("div", ha, [e.poster_url ? (W(), L("img", {
					key: 0,
					src: Y(n)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, ga)) : (W(), L("div", _a, [B(S, { name: "film" })]))]), R("div", va, [R("p", ya, q(e.name), 1), e.year ? (W(), L("p", ba, [z(q(e.year) + " ", 1), e.runtime ? (W(), L("span", xa, " · " + q(e.runtime) + "m", 1)) : I("", !0)])) : I("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Le.value ? (W(), F(Nr, {
				key: 7,
				title: e.media.name,
				progress: Y(U).progress.value,
				onBack: r[11] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : I("", !0),
			Re.value ? (W(), F(Dr, {
				key: 8,
				title: e.media.name,
				onBack: r[12] ||= (e) => o("back")
			}, null, 8, ["title"])) : I("", !0),
			Y(g).isInRoom ? (W(), F(Mi, {
				key: 9,
				position: Y(c).position,
				duration: Y(c).duration,
				"is-playing": Y(c).playing,
				onSeek: $,
				onPlay: r[13] ||= (e) => void T.value?.play()?.catch(() => {}),
				onPause: r[14] ||= (e) => void T.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : I("", !0),
			Y(g).isInRoom ? (W(), F(Si, { key: 10 })) : I("", !0),
			B(ge, {
				modelValue: _e.value,
				"onUpdate:modelValue": r[15] ||= (e) => _e.value = e,
				onJoined: ve
			}, null, 8, ["modelValue"]),
			B(St, {
				open: ae.value,
				onClose: r[16] ||= (e) => ae.value = !1
			}, null, 8, ["open"]),
			B(kn, {
				open: tn.value,
				"onUpdate:open": r[17] ||= (e) => tn.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": rn.value,
				onAdded: an
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-5479ff65"]]), Ca = { class: "player-page__stage" }, wa = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Ta = { class: "player-page__blocking-error" }, Ea = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = a(), { imgSrc: c } = l(), p = o(), m = Fe(), h = Ie(), { t: _ } = s(), v = Ee("phlixConfig", null), y = d(), b = f(), ee = g(), x = G(null), S = G(""), C = G([]), w = G(null), T = G(null), E = G([]), D = G([]), O = G(!0), k = G(null), A = G(!1), te = G(null), ne = G(!1), re = G(null), ie = G(null), ae = P(() => String(m.params.id ?? ""));
		xe(() => x.value?.name);
		let j = P(() => {
			let e = c(x.value?.poster_url);
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), oe = null, se = !1, ue = 0;
		function de(e) {
			return se || e.generation !== ue;
		}
		function fe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function me(e) {
			let t = p.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function he(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function ge(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function N(e, t, r) {
			let i = () => de(r), a = t.genres?.[0];
			if (!a) y.setQueue([]);
			else try {
				let o = u(n.value, {
					genres: [a],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, r.controller?.signal);
				if (i()) return;
				y.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || fe(e)) return;
				y.setQueue([]);
			}
		}
		async function Te(e, t, r) {
			let i = u(n.value, {
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
		function De(e, t) {
			re.value = ye(e, t), ie.value = M(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && y.setQueue(r);
		}
		function Oe(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function je(e, n, r) {
			if (re.value = null, ie.value = null, !ge(n)) return;
			let i = Oe(n.id);
			if (i) {
				De(i, n.id);
				return;
			}
			let a = () => de(r);
			try {
				let i = await V(e, n, r.controller?.signal);
				if (a()) return;
				let o = await Te(e, i.id, r.controller?.signal);
				if (a()) return;
				if (ve(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => Te(e, t.id, r.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = _e(o);
				s.length && t.set(i.id, s), De(s, n.id);
			} catch (e) {
				if (a() || fe(e)) return;
				re.value = null, ie.value = null;
			}
		}
		async function K() {
			let e = ae.value;
			oe?.abort(), oe = typeof AbortController < "u" ? new AbortController() : null, ue += 1;
			let t = {
				generation: ue,
				controller: oe
			};
			if (O.value = !0, k.value = null, C.value = [], w.value = null, T.value = null, E.value = [], D.value = [], re.value = null, ie.value = null, y.hideMiniPlayer(), !e) {
				k.value = _("common.missingMediaId"), O.value = !1;
				return;
			}
			let a = new r({ baseUrl: n.value });
			a.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, t.controller?.signal).then((e) => {
				de(t) || (C.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), w.value = he(e?.intro_marker), T.value = he(e?.outro_marker), E.value = Zn(e?.audio_tracks), D.value = Ye(e?.subtitle_tracks));
			}).catch(() => null);
			let o = Se(e), s = Date.now();
			if (o && Ce(o, s)) {
				J(a, o.item, t);
				return;
			}
			let c = null;
			try {
				c = (await a.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t.controller?.signal)).item;
			} catch (e) {
				if (de(t) || fe(e)) return;
				if (e instanceof i && (e.status === 403 || e.status === 429)) {
					let t = Re(e.body, v?.locale);
					if (t !== null) {
						te.value = t, ne.value = !0, O.value = !1;
						return;
					}
				}
				if (o) {
					J(a, o.item, t);
					return;
				}
				k.value = ze(e, v?.locale), O.value = !1;
				return;
			}
			if (!de(t)) {
				if (c) we(e, c, s), J(a, c, t);
				else {
					if (o) {
						J(a, o.item, t);
						return;
					}
					k.value = "Failed to load media item", O.value = !1;
				}
			}
		}
		async function J(e, t, n) {
			x.value = t, b.hydrate(t), S.value = me(t), O.value = !1, ge(t) && (await je(e, t, n), de(n) || ie.value) || N(e, t, n);
		}
		Ae(K), X(ae, K), Pe(() => {
			y.current && y.streamUrl && y.showMiniPlayer();
		}), ke(() => {
			se = !0, oe?.abort(), oe = null, ee.reset();
		});
		function Me() {
			h?.back();
		}
		function Ne(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Le(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Be(e) {
			A.value = e, ee.setTheaterActive(e);
		}
		function Ve() {
			ne.value = !1, Me();
		}
		return (e, t) => (W(), L("div", { class: H(["player-page", { "is-theater": A.value }]) }, [
			j.value && !O.value && !k.value ? (W(), L("div", {
				key: 0,
				class: "player-page__ambient",
				style: U(j.value),
				"aria-hidden": "true"
			}, null, 4)) : I("", !0),
			R("div", Ca, [O.value ? (W(), L("div", wa, [B(be, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : k.value ? (W(), F(pe, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: k.value
			}, {
				actions: Z(() => [B(le, {
					variant: "solid",
					onClick: K
				}, {
					default: Z(() => [...t[1] ||= [z("Retry", -1)]]),
					_: 1
				}), B(le, {
					variant: "ghost",
					onClick: Me
				}, {
					default: Z(() => [...t[2] ||= [z("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : x.value ? (W(), F(Sa, {
				key: 2,
				media: x.value,
				"stream-url": S.value,
				"stream-url-for": me,
				"api-base": Y(n),
				chapters: C.value,
				"intro-marker": w.value,
				"outro-marker": T.value,
				"playback-audio-tracks": E.value,
				"playback-subtitle-tracks": D.value,
				"prev-episode": re.value,
				"next-episode": ie.value,
				autoplay: !0,
				onBack: Me,
				onPlayNext: Ne,
				onPlayEpisode: Le,
				onTheater: Be
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
			B(ce, {
				modelValue: ne.value,
				"onUpdate:modelValue": t[0] ||= (e) => ne.value = e,
				title: "Can’t start playback",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Z(() => [B(le, {
					variant: "solid",
					onClick: Ve
				}, {
					default: Z(() => [...t[3] ||= [z("OK", -1)]]),
					_: 1
				})]),
				default: Z(() => [R("p", Ta, q(te.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-98924eb8"]]);
export { Ea as default };

//# sourceMappingURL=PlayerPage-DG4tFWV5.js.map