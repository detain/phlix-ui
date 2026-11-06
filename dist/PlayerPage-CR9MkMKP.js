import { _ as e, a as t, h as n, t as r, v as i } from "./client-fSGeXil2.js";
import { n as a, r as o } from "./useApiBase-DXTBY90j.js";
import { t as s } from "./useMessages--_PEquyw.js";
import { r as c, t as l } from "./useImageSrc-CSM61b-l.js";
import { n as u } from "./media-query-D7hrCu8r.js";
import { i as d } from "./usePlayerStore-BpohCwDP.js";
import { n as f, t as p } from "./ThumbRating-MBDCSCkZ.js";
import { a as m, n as h, o as g, r as _, s as v, t as y } from "./shortcuts-BqUhFpRJ.js";
import { a as b } from "./usePreferencesStore-DrDMAwjz.js";
import { t as ee } from "./useToastStore-CxO_ppM8.js";
import { n as x, t as S } from "./Icon-55iG1rR7.js";
import { t as C } from "./IconButton-oCt4k5-3.js";
import { n as w } from "./useFocusTrap-FI3Uj9O8.js";
import { t as T } from "./Slider-Bj5BaBUu.js";
import { t as E } from "./Select-Deeh6I8k.js";
import { a as te, c as D, d as O, f as k, i as ne, l as re, n as A, o as j, r as ie, s as M, t as ae, u as oe } from "./captions-DV5mDPeu.js";
import { t as se } from "./Modal-CTJDmjI2.js";
import { t as ce } from "./Button-BLpPomsd.js";
import { t as le } from "./Chip-eO7BYLEk.js";
import { t as ue } from "./Spinner-DCf8geCi.js";
import { t as de } from "./Badge-B_3IbdKb.js";
import { t as fe } from "./EmptyState-DjfWh3kt.js";
import { n as pe, r as me, t as he } from "./SyncPlayModal-D8yPeIHw.js";
import { n as ge, o as _e, r as ve, t as N } from "./episode-order-DBEVgrOE.js";
import { t as ye } from "./Skeleton-DDhrDRE7.js";
import { i as be } from "./usePageTitle-j6j9gAmo.js";
import { n as xe, r as Se, t as Ce } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as P, Transition as we, computed as F, createBlock as I, createCommentVNode as L, createElementBlock as R, createElementVNode as z, createTextVNode as B, createVNode as V, defineComponent as H, inject as Te, mergeModels as Ee, nextTick as De, normalizeClass as U, normalizeStyle as W, onBeforeUnmount as Oe, onMounted as ke, onScopeDispose as Ae, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as Y, unref as X, useModel as je, watch as Z, withCtx as Q, withModifiers as Me } from "vue";
import { onBeforeRouteLeave as Ne, useRoute as Pe, useRouter as Fe } from "vue-router";
function Ie(e, t) {
	if (typeof e != "object" || !e) return null;
	let n = e[t];
	return typeof n == "string" && n !== "" ? n : null;
}
function Le(t, r) {
	let i = Ie(t, "code");
	if (i !== null && e(i)) return n(i, r);
	let a = Ie(t, "error");
	return a === "AccessScheduled" ? "Playback blocked by access schedule. Try again during allowed hours." : a === "StreamLimitExceeded" ? "Stream limit reached. Stop another stream to continue watching." : null;
}
function Re(t, r) {
	if (t instanceof i) {
		let i = Ie(t.body, "code");
		if (i !== null && e(i)) return n(i, r);
	}
	let a = t instanceof Error ? t.message : "";
	return a === "" ? "Failed to load media" : a;
}
// src/components/player/format-time.ts
function ze(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
// src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Be = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Ve = { class: "scrubber__track" }, He = ["title"], Ue = { class: "scrubber__time numeric" }, We = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let { t: r } = s(), i = e, a = n, o = K(null), c = K(!1), l = K(!1), u = K(0), d = K(0), f = (e) => Math.min(1, Math.max(0, e)), p = F(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = F(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = F(() => (c.value || l.value) && i.duration > 0), g = F(() => c.value ? u.value : d.value), _ = F(() => g.value * i.duration), v = F(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = F(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = F(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), ee = F(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
		function te(e) {
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
		}), (t, n) => (G(), R("div", {
			ref_key: "trackEl",
			ref: o,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": X(ze)(e.position),
			"aria-label": X(r)("player.seek"),
			onPointerdown: S,
			onPointermove: C,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: T,
			onPointerleave: E,
			onKeydown: te
		}, [z("div", Ve, [
			z("div", {
				class: "scrubber__buffered",
				style: W({ transform: `scaleX(${m.value})` })
			}, null, 4),
			z("div", {
				class: "scrubber__played",
				style: W({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(G(!0), R(P, null, q(ee.value, (e, t) => (G(), R("span", {
				key: t,
				class: "scrubber__tick",
				style: W({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, He))), 128)),
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
		}, null, 4)) : L("", !0), z("span", Ue, J(X(ze)(_.value)), 1)], 4)) : L("", !0)], 40, Be));
	}
}), [["__scopeId", "data-v-3d610715"]]), Ge = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function $(e, t = "") {
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
		let e = n, r = $(e.url ?? e.src);
		r !== "" && t.push({
			index: qe(e.index),
			language: $(e.language ?? e.lang ?? e.srclang),
			label: $(e.label),
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
			id: $(e.id),
			label: $(e.label),
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
		jobId: $(t.job_id ?? t.jobId),
		masterUrl: $(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: $(t.status, "running"),
		reused: Ke(t.reused),
		subtitles: Je(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ye(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function at(e) {
	let t = e ?? {};
	return {
		jobId: $(t.job_id ?? t.jobId),
		status: $(t.status, "running"),
		playlistReady: Ke(t.playlist_ready ?? t.playlistReady),
		progress: qe(t.progress),
		masterUrl: $(t.master_url ?? t.masterUrl),
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
// src/composables/useHlsTranscode.ts
var lt = "_master.m3u8";
function ut(e) {
	let t = K("idle"), n = K(0), i = K([]), a = K([]), o = K(-1), s = K(!0), c = K(null), l = K(null), u = K([]), f = K(-1), p = K(!1), m = K(null), h = K(null);
	function g(e) {
		if (!k) return;
		a.value = k.levels, o.value = k.getCurrentLevel(), s.value = k.autoLevelEnabled;
		let t = e ?? k.getCurrentLevel(), n = t >= 0 ? a.value.find((e) => e.index === t) : void 0;
		c.value = n ? n.height : null;
	}
	function _() {
		a.value = [], o.value = -1, s.value = !0, c.value = null, l.value = null;
	}
	function y(e) {
		k && (u.value = k.audioTracks, f.value = e ?? k.getCurrentAudioTrack());
	}
	function b() {
		k && (p.value = k.hasAudio());
	}
	function ee() {
		u.value = [], f.value = -1, p.value = !1;
	}
	function x(e) {
		e && e.length !== 0 && (l.value = e);
	}
	function S(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		i.value = t.map((e) => ({
			...e,
			url: ct(n, e.url)
		}));
	}
	let C = e.attach ?? v, w = e.pollIntervalMs ?? 1e3, T = e.maxWaitMs ?? 12e4, E = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), te = Math.max(1, Math.ceil(T / Math.max(1, w))), D = e.getToken ?? dt, O = e.probeRungPlaylist ?? ((e) => ft(e, D)), k = null, ne = null, re = null, A = null, j = !1, ie = 0, M = null, ae = 0;
	function oe() {
		return e.client ?? new r({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function se(r, a, o, s) {
		fe(), j = !1;
		let c = ++ae, l = () => j || c !== ae;
		M = new AbortController(), t.value = "preparing", n.value = 0, i.value = [], _();
		try {
			let i = oe(), c = it(await i.post(Xe(a, o), void 0, M.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			S(c.subtitles), x(c.variants), m.value = c.jobId, h.value = ct(e.apiBase(), c.masterUrl);
			let u = c.status === "completed";
			for (let e = 0; !u && e < te; e++) {
				let e = at(await i.get(rt(c.jobId), void 0, M.signal));
				if (l()) return;
				if (n.value = e.progress, S(e.subtitles), x(e.variants), st(e.status)) throw Error(`transcode ${e.status}`);
				if (ot(e)) {
					u = !0;
					break;
				}
				if (await E(w), l()) return;
			}
			if (!u) throw Error("transcode timed out");
			let f = await C(r, h.value, {
				getToken: D,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => {
					g(), b();
				},
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
			k = f, ne = k.onLevelSwitched((e) => g(e)), re = k.onAudioTrackSwitched((e) => y(e)), A = k.onLevelLoaded(() => b()), g(), y(), b();
			try {
				let e = d();
				e.hlsMasterUrl = h.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function ce(e) {
		k && (k.setCurrentLevel(e === "auto" ? -1 : e), g());
	}
	function le(e) {
		k && (k.setNextLevel(e === "auto" ? -1 : e), g());
	}
	function ue(e) {
		k && (k.setAudioTrack(e), y());
	}
	function de(e) {
		if (!k || !h.value) return;
		let t = h.value.replace("master.m3u8", `media_v${e}`), n = `${t}${lt}`, r = `${t}.m3u8`, i = ++ie;
		(async () => {
			let e;
			try {
				e = await O(n);
			} catch {
				e = "unknown";
			}
			!j && i === ie && k && (e === "absent" ? (console.warn(`[phlix-ui] rung mini-master unavailable (${n}) — this server has no per-rung index files; falling back to the legacy bare rung playlist (${r}). Multi-audio titles play without selectable audio tracks until the server ships the index.`), k.loadSource(r)) : k.loadSource(n), _());
		})();
	}
	function fe() {
		if (j = !0, ie++, M &&= (M.abort(), null), ne) {
			try {
				ne();
			} catch {}
			ne = null;
		}
		if (re) {
			try {
				re();
			} catch {}
			re = null;
		}
		if (A) {
			try {
				A();
			} catch {}
			A = null;
		}
		if (k) {
			try {
				k.destroy();
			} catch {}
			k = null;
		}
		m.value = null, h.value = null;
	}
	function pe() {
		fe(), t.value = "idle", n.value = 0, i.value = [], _(), ee();
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
		hasAudio: p,
		setLevel: ce,
		setNextLevel: le,
		setAudioTrack: ue,
		jobId: m,
		masterUrl: h,
		loadVariantPlaylist: de,
		start: se,
		cleanup: fe,
		reset: pe
	};
}
function dt() {
	try {
		return t().getAccessToken();
	} catch {
		return null;
	}
}
async function ft(e, t) {
	try {
		let n = t(), r = await fetch(e, {
			method: "HEAD",
			headers: n ? { Authorization: `Bearer ${n}` } : void 0
		});
		return r.status === 404 ? "absent" : r.ok ? "available" : "unknown";
	} catch {
		return "unknown";
	}
}
// src/composables/useTrickplay.ts
var pt = 10;
function mt(e) {
	let t = K(null), n = K(!1), i = K(null), a = /* @__PURE__ */ new Map();
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
		let i = r.frame, a = i % pt, o = Math.floor(i / pt), c = a / 9 * 100, l = o / 5 * 100;
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
var ht = ["aria-label"], gt = { class: "shortcuts__head" }, _t = { class: "shortcuts__title" }, vt = { class: "shortcuts__grid" }, yt = { class: "shortcuts__keys" }, bt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, xt = {
	key: 1,
	class: "shortcuts__key"
}, St = { class: "shortcuts__label" }, Ct = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => _ }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = s(), a = K(null);
		return w(a, Y(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (G(), R("div", {
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
		}, [z("div", gt, [z("h3", _t, J(X(i)("player.keyboard")), 1), V(C, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), z("ul", vt, [(G(!0), R(P, null, q(e.shortcuts, (e) => (G(), R("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [z("span", yt, [(G(!0), R(P, null, q(e.keys, (e, t) => (G(), R(P, { key: t }, [e === "–" ? (G(), R("span", bt, "–")) : (G(), R("kbd", xt, [X(y)[e] ? (G(), I(S, {
			key: 0,
			name: X(y)[e],
			label: X(h)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), R(P, { key: 1 }, [B(J(e), 1)], 64))]))], 64))), 128))]), z("span", St, J(e.label), 1)]))), 128))])], 8, ht)])) : L("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), wt = { class: "volume" }, Tt = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "VolumeControl",
	setup(e) {
		let t = d(), n = b(), { t: r } = s(), i = F(() => t.muted ? 0 : t.volume), a = F(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function o(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (G(), R("div", wt, [V(C, {
			name: a.value,
			label: X(t).muted ? X(r)("player.unmute") : X(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => X(t).toggleMute()
		}, null, 8, ["name", "label"]), V(T, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), Et = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		], n = d(), { t: r } = s(), i = F(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), I(E, {
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
}), [["__scopeId", "data-v-4530b308"]]), Dt = "auto", Ot = "original";
function kt(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function At(e) {
	return e >= 2160 ? "4K" : kt(e);
}
function jt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = kt(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: At(r.height)
		}));
	}
	return n;
}
function Mt(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) kt(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Nt(e, t) {
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
function Pt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Ft(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && Nt(e, n) >= 0;
}
function It(e, t) {
	if (t < 0) return Dt;
	let n = e.find((e) => e.index === t);
	return n ? kt(n.height) : Dt;
}
// src/components/player/QualityMenu.vue
var Lt = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let r = e, i = je(e, "open"), a = K(null);
		function o() {
			a.value?.toggleMenu();
		}
		let c = n, l = d(), u = b(), { t: f } = s(), p = F(() => jt(r.levels)), m = F(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = p.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = kt(i.height);
				e.has(a) || n && Mt(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: At(i.height)
				}));
			}
			return t;
		}), h = F(() => p.value.length >= 2 ? p.value : m.value), g = F(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), _ = F(() => Nt(r.levels, g.value)), v = F(() => g.value && _.value >= 0 ? {
			value: Ot,
			label: f("player.qualityOriginal", { height: g.value.height })
		} : null), y = F(() => h.value.length >= 2), ee = F(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: At(r.activeHeight) })), x = F(() => [
			{
				value: Dt,
				label: ee.value
			},
			...v.value ? [v.value] : [],
			...h.value
		]), S = F(() => r.autoEnabled ? Dt : v.value && r.currentLevel === _.value && (l.quality === "original" || u.defaultQuality === "original") ? Ot : It(r.levels, r.currentLevel));
		function C(e) {
			let t = String(e);
			if (t === "auto") {
				l.setQuality(t), u.defaultQuality = t, c("select", "auto");
				return;
			}
			let n = t === "original" ? _.value : Mt(r.levels, t);
			l.setQuality(t), u.defaultQuality = t, n >= 0 ? c("select", n) : c("select", t);
		}
		return t({ toggleMenu: o }), (e, t) => y.value || i.value ? (G(), I(E, {
			key: 0,
			ref_key: "selectRef",
			ref: a,
			class: "quality-menu",
			tone: "glass",
			"model-value": S.value,
			options: x.value,
			label: X(f)("player.quality"),
			open: i.value,
			"onUpdate:open": t[0] ||= (e) => i.value = e,
			"onUpdate:modelValue": C
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), Rt = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = K(0), a = F(() => n.lifted ? i.value : 0), o = F(() => ({
			...D(n.styleConfig),
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
		Z(() => n.controlsRoot, u, { immediate: !0 }), Oe(l);
		let d = null, f = null, p = null;
		function m() {
			r.value = O(d);
		}
		function h() {
			p != null && (clearTimeout(p), p = null);
		}
		function g() {
			h(), p = setTimeout(() => {
				if (p = null, !d) return;
				M(n.video, n.language);
				let e = O(d);
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
			_(), M(n.video, n.language);
			let e = k(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = O(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return Z(() => [n.video, n.language], y, { immediate: !0 }), Oe(_), t({ lines: r }), (t, n) => r.value.length ? (G(), R("div", {
			key: 0,
			class: U(["player__captions", { "is-lifted": e.lifted }]),
			style: W(o.value)
		}, [(G(!0), R(P, null, q(r.value, (e, t) => (G(), R("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : L("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), zt = ["aria-label", "aria-expanded"], Bt = ["aria-label"], Vt = { class: "capmenu__head" }, Ht = { class: "capmenu__title" }, Ut = ["aria-label"], Wt = ["aria-checked", "tabindex"], Gt = { class: "capmenu__check" }, Kt = { class: "capmenu__optlabel" }, qt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Jt = { class: "capmenu__check" }, Yt = { class: "capmenu__optlabel" }, Xt = { class: "capmenu__check" }, Zt = { class: "capmenu__optlabel" }, Qt = { class: "capmenu__title capmenu__title--sub" }, $t = ["aria-label"], en = [
	"aria-checked",
	"tabindex",
	"onClick"
], tn = { class: "capmenu__check" }, nn = { class: "capmenu__optlabel" }, rn = { class: "capmenu__title capmenu__title--sub" }, an = { class: "capmenu__style" }, on = { class: "capmenu__field" }, sn = { class: "capmenu__fieldlabel" }, cn = { class: "capmenu__field" }, ln = { class: "capmenu__fieldlabel" }, un = { class: "capmenu__field" }, dn = { class: "capmenu__fieldlabel" }, fn = { class: "capmenu__field" }, pn = { class: "capmenu__fieldlabel" }, mn = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let n = e, r = t, i = d(), a = b(), { t: o } = s(), c = K(null), l = K(null), u = F(() => i.subtitleLang), f = F(() => n.tracks.some((e) => e.language === u.value)), p = F(() => f.value ? "captions" : "captions-off"), m = F(() => f.value ? n.tracks.findIndex((e) => e.language === u.value) + 1 : 0), h = F(() => n.activeAudio >= 0 ? n.activeAudio : 0);
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
		function te(e) {
			let t = x(e, n.audioTracks.length, h.value);
			t !== null && y(n.audioTracks[t].index);
		}
		function D(e) {
			a.captionStyle = {
				...a.captionStyle,
				size: e
			};
		}
		function O(e) {
			a.captionStyle = {
				...a.captionStyle,
				textColor: String(e)
			};
		}
		function k(e) {
			a.captionStyle = {
				...a.captionStyle,
				background: e
			};
		}
		function re(e) {
			a.captionStyle = {
				...a.captionStyle,
				edge: e
			};
		}
		w(l, Y(n, "open"), {
			lockScroll: !1,
			onEscape: () => (_(), !0)
		});
		function j(e) {
			c.value && !c.value.contains(e.target) && _();
		}
		return Z(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", j, !0) : document.removeEventListener("pointerdown", j, !0));
		}, { immediate: !0 }), Oe(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", j, !0);
		}), (t, n) => (G(), R("div", {
			ref_key: "rootEl",
			ref: c,
			class: "capmenu"
		}, [z("button", {
			type: "button",
			class: U(["capmenu__btn", { "is-active": f.value }]),
			"aria-label": f.value ? X(o)("player.captionsOn") : X(o)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => g(!e.open)
		}, [V(S, { name: p.value }, null, 8, ["name"])], 10, zt), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(o)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			z("div", Vt, [z("h3", Ht, J(X(o)("player.subtitles")), 1), V(C, {
				name: "x",
				label: X(o)("common.close"),
				size: "sm",
				onClick: _
			}, null, 8, ["label"])]),
			z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(o)("player.subtitleTrack"),
				onKeydown: T
			}, [z("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !f.value,
				tabindex: m.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => v(null)
			}, [z("span", Gt, [f.value ? L("", !0) : (G(), I(S, {
				key: 0,
				name: "check"
			}))]), z("span", Kt, J(X(o)("player.off")), 1)], 8, Wt), (G(!0), R(P, null, q(e.tracks, (e, t) => (G(), R("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": u.value === e.language,
				tabindex: m.value === t + 1 ? 0 : -1,
				onClick: (t) => v(e.language)
			}, [z("span", Jt, [u.value === e.language ? (G(), I(S, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", Yt, J(e.label), 1)], 8, qt))), 128))], 40, Ut),
			z("button", {
				type: "button",
				class: "capmenu__add",
				onClick: ee
			}, [z("span", Xt, [V(S, { name: "plus" })]), z("span", Zt, J(X(o)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 0 ? (G(), R(P, { key: 0 }, [z("h3", Qt, J(X(o)("player.audio")), 1), z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(o)("player.audioTrack"),
				onKeydown: te
			}, [(G(!0), R(P, null, q(e.audioTracks, (t) => (G(), R("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: h.value === t.index ? 0 : -1,
				onClick: (e) => y(t.index)
			}, [z("span", tn, [e.activeAudio === t.index ? (G(), I(S, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", nn, J(t.label), 1)], 8, en))), 128))], 40, $t)], 64)) : L("", !0),
			z("h3", rn, J(X(o)("player.captionStyle")), 1),
			z("div", an, [
				z("div", on, [z("span", sn, J(X(o)("player.size")), 1), V(E, {
					"model-value": X(a).captionStyle.size,
					options: X(ne),
					label: X(o)("player.captionSize"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", cn, [z("span", ln, J(X(o)("player.color")), 1), V(E, {
					"model-value": X(a).captionStyle.textColor,
					options: X(A),
					label: X(o)("player.captionColor"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", un, [z("span", dn, J(X(o)("player.background")), 1), V(E, {
					"model-value": X(a).captionStyle.background,
					options: X(ae),
					label: X(o)("player.captionBackground"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", fn, [z("span", pn, J(X(o)("player.edge")), 1), V(E, {
					"model-value": X(a).captionStyle.edge,
					options: X(ie),
					label: X(o)("player.captionEdge"),
					"onUpdate:modelValue": re
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Bt)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-62fcc11d"]]), hn = { class: "subsearch" }, gn = { class: "subsearch__langs" }, _n = { class: "subsearch__legend" }, vn = { class: "subsearch__chips" }, yn = { class: "subsearch__actions" }, bn = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, xn = {
	key: 2,
	class: "subsearch__prompt"
}, Sn = {
	key: 3,
	class: "subsearch__list"
}, Cn = { class: "subsearch__meta" }, wn = { class: "subsearch__release" }, Tn = { class: "subsearch__signals" }, En = { class: "subsearch__provider" }, Dn = ["aria-label"], On = {
	key: 2,
	class: "subsearch__stat"
}, kn = {
	key: 3,
	class: "subsearch__stat"
}, An = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let d = F(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let r of [...n.preferredLangs, ...l]) {
				let n = (r || "").toLowerCase();
				n && !e.has(n) && (e.add(n), t.push(n));
			}
			return t;
		}), f = K(/* @__PURE__ */ new Set());
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
		let h = K(!1), g = K(!1), _ = K([]), v = K(/* @__PURE__ */ new Set()), y = K(/* @__PURE__ */ new Set());
		function b(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let x = F(() => [..._.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), C = F(() => f.value.size > 0 && !h.value);
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
		function te(e) {
			if (e instanceof i) {
				if (e.status === 429) {
					let t = e.body && typeof e.body == "object" ? e.body : {}, n = typeof t.downloadsRemaining == "number" ? t.downloadsRemaining : null, r = typeof t.resetTimeUtc == "string" ? t.resetTimeUtc : null;
					r ? c.warning(o("player.subtitleQuotaReset", { time: D(r) })) : n === null ? c.warning(o("player.subtitleQuota")) : c.warning(o("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (e.status === 404) {
					c.error(o("player.subtitleAddNotFound"));
					return;
				}
			}
			c.error(o("player.subtitleAddError"));
		}
		function D(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function O(e) {
			let t = b(e);
			if (v.value.has(t) || y.value.has(t)) return;
			let r = new Set(v.value);
			r.add(t), v.value = r;
			try {
				let r = Je([(await w().downloadSubtitle(n.mediaId, {
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
				te(e);
			} finally {
				let e = new Set(v.value);
				e.delete(t), v.value = e;
			}
		}
		return Z(() => n.open, (e) => {
			e && (p(), _.value = [], g.value = !1, h.value = !1, v.value = /* @__PURE__ */ new Set(), y.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (t, n) => (G(), I(se, {
			"model-value": e.open,
			title: X(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: Q(() => [V(ce, {
				variant: "ghost",
				onClick: E
			}, {
				default: Q(() => [B(J(X(o)("common.close")), 1)]),
				_: 1
			})]),
			default: Q(() => [z("div", hn, [
				z("fieldset", gn, [z("legend", _n, J(X(o)("player.subtitleSearchLanguages")), 1), z("div", vn, [(G(!0), R(P, null, q(d.value, (e) => (G(), I(le, {
					key: e,
					selected: f.value.has(e),
					size: "md",
					"aria-label": u(e),
					"onUpdate:selected": (t) => m(e)
				}, {
					default: Q(() => [B(J(u(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				z("div", yn, [V(ce, {
					variant: "solid",
					"left-icon": "search",
					loading: h.value,
					disabled: !C.value,
					onClick: T
				}, {
					default: Q(() => [B(J(X(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				h.value ? (G(), R("div", bn, [V(ue, { label: X(o)("player.subtitleSearching") }, null, 8, ["label"]), z("span", null, J(X(o)("player.subtitleSearching")), 1)])) : g.value && x.value.length === 0 ? (G(), I(fe, {
					key: 1,
					icon: "captions",
					title: X(o)("player.subtitleSearchEmpty"),
					description: X(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : g.value ? (G(), R("ul", Sn, [(G(!0), R(P, null, q(x.value, (e) => (G(), R("li", {
					key: b(e),
					class: "subsearch__item"
				}, [z("div", Cn, [z("p", wn, J(e.releaseName || e.provider), 1), z("div", Tn, [
					V(de, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Q(() => [B(J(u(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (G(), I(de, {
						key: 0,
						tone: "info",
						size: "sm",
						label: X(o)("player.subtitleHearingImpairedFull")
					}, {
						default: Q(() => [B(J(X(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : L("", !0),
					z("span", En, J(e.provider), 1),
					e.rating > 0 ? (G(), R("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": X(o)("player.subtitleRating", { rating: e.rating })
					}, [V(S, { name: "star" }), B(" " + J(e.rating), 1)], 8, Dn)) : L("", !0),
					e.downloadCount > 0 ? (G(), R("span", On, J(X(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : L("", !0),
					e.fps ? (G(), R("span", kn, J(X(o)("player.subtitleFps", { fps: e.fps })), 1)) : L("", !0)
				])]), V(ce, {
					variant: "outline",
					size: "sm",
					"left-icon": y.value.has(b(e)) ? "check" : "plus",
					loading: v.value.has(b(e)),
					disabled: v.value.has(b(e)) || y.value.has(b(e)),
					"aria-label": X(o)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => O(e)
				}, {
					default: Q(() => [B(J(v.value.has(b(e)) ? X(o)("player.subtitleAdding") : X(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (G(), R("p", xn, J(X(o)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), jn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Mn(e, t, n, r, i, a, o) {
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
		r: jn(d / m),
		g: jn(f / m),
		b: jn(p / m)
	};
}
function Nn(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Mn(e, t, n, 0, 0, r, n),
		right: Mn(e, t, n, t - r, 0, t, n),
		center: Mn(e, t, n, 0, 0, t, n)
	};
}
function Pn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Fn(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Pn(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Pn(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Pn(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function In(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var Ln = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
			r.value = In(i);
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
				c.value = Fn(Nn(n, 32, 18));
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
		Z(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			C(), e && t && S();
		}, { immediate: !0 }), ke(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Oe(() => {
			C(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let w = F(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (G(), R("div", {
			class: U(["player__ambient", { "is-active": o.value }]),
			style: W(o.value ? w.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Rn = ["aria-label"], zn = { class: "resume__label" }, Bn = { class: "resume__time numeric" }, Vn = { class: "resume__actions" }, Hn = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = s(), i = F(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (G(), R("div", {
			class: "resume",
			role: "region",
			"aria-label": X(r)("player.resumePlayback")
		}, [z("p", zn, [
			B(J(i.value[0]), 1),
			z("span", Bn, J(X(ze)(e.seconds)), 1),
			B(J(i.value[1]), 1)
		]), z("div", Vn, [z("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [V(S, { name: "play" }), z("span", null, J(X(r)("player.resume")), 1)]), z("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [V(S, { name: "rewind" }), z("span", null, J(X(r)("player.startOver")), 1)])])], 8, Rn));
	}
}), [["__scopeId", "data-v-271c5209"]]), Un = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Wn = /* @__PURE__ */ new Set([
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
function Gn(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Kn(...e) {
	return e.some((e) => Wn.has(Gn(e)));
}
function qn(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Jn(e) {
	return e?.error?.code === 2;
}
var Yn = 3e4;
function Xn(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && rr.get(t) === "hevc";
}
function Zn(e) {
	let t = { forceTranscode: "1" };
	return Xn(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function Qn(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
function $n(e) {
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
var er = 2 * Math.PI * 15;
function tr(e, t, n = er) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var nr = /* @__PURE__ */ new Map([
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
]), rr = /* @__PURE__ */ new Map([
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
]), ir = /* @__PURE__ */ new Set(["h264"]), ar = /* @__PURE__ */ new Map([
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
function or(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = rr.get(t);
	return n === void 0 ? "transcode" : ir.has(n) ? "direct" : "probe";
}
function sr(e) {
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
var cr = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function lr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return cr.get(t) ?? "video/mp4";
}
function ur(e, t = "video/mp4") {
	let n = nr.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function dr(e, t = "video/mp4") {
	if (!e) return !0;
	let n = ur(e, t);
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
async function fr(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = rr.get(n), i = r === void 0 ? void 0 : ar.get(r);
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
async function pr(e, t, n = "") {
	if (Kn(...e)) return !0;
	let r = e.map((e) => Gn(e)).find((e) => Un.includes(e)) ?? "";
	if (!Un.includes(r)) return !1;
	let i = lr(r), a = or(n);
	if (a === "transcode" || a === "probe" && !await fr(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await dr(e.codec, i)) return !0;
	}
	return !1;
}
// src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var mr = ["aria-label"], hr = ["src"], gr = { class: "upnext__body" }, _r = { class: "upnext__eyebrow" }, vr = { class: "upnext__title" }, yr = {
	key: 0,
	class: "upnext__cd numeric"
}, br = { class: "upnext__actions" }, xr = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Sr = ["r"], Cr = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], wr = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let { t: n } = s(), { imgSrc: r } = l(), i = e, a = t, o = F(() => i.posterUrl ?? i.media.poster_url ?? null), c = F(() => tr(i.remaining, i.total));
		return (t, i) => (G(), R("aside", {
			class: "upnext",
			role: "region",
			"aria-label": X(n)("player.upNext")
		}, [
			o.value ? (G(), R("img", {
				key: 0,
				class: "upnext__thumb",
				src: X(r)(o.value),
				alt: "",
				loading: "lazy"
			}, null, 8, hr)) : L("", !0),
			z("div", gr, [
				z("p", _r, J(X(n)("player.upNext")), 1),
				z("h4", vr, J(e.media.name), 1),
				e.counting ? (G(), R("p", yr, J(e.remaining > 0 ? X(n)("player.startsIn", { count: e.remaining }) : X(n)("player.startingNow")), 1)) : L("", !0),
				z("div", br, [z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [V(S, { name: "play" }), z("span", null, J(X(n)("player.playNow")), 1)]), z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, J(X(n)("player.cancel")), 1)])
			]),
			e.counting ? (G(), R("svg", xr, [z("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Sr), z("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": X(er),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Cr)])) : L("", !0)
		], 8, mr));
	}
}), [["__scopeId", "data-v-3fc667d0"]]), Tr = {
	class: "transcode",
	role: "alert"
}, Er = { class: "transcode__card" }, Dr = { class: "transcode__heading" }, Or = { class: "transcode__body" }, kr = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = s();
		return (t, i) => (G(), R("div", Tr, [z("div", Er, [
			V(S, {
				name: "alert",
				class: "transcode__icon"
			}),
			z("h3", Dr, J(X(r)("player.transcodeHeading")), 1),
			z("p", Or, J(e.title ? X(r)("player.transcodeBodyTitled", { title: e.title }) : X(r)("player.transcodeBodyUntitled")), 1),
			z("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [V(S, { name: "arrow-left" }), z("span", null, J(X(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Ar = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, jr = { class: "prep__card" }, Mr = { class: "prep__heading" }, Nr = { class: "prep__body" }, Pr = ["aria-valuenow"], Fr = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = s(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (G(), R("div", Ar, [z("div", jr, [
			V(S, {
				name: "spinner",
				class: "prep__spinner"
			}),
			z("h3", Mr, J(X(n)("player.transcodePreparingHeading")), 1),
			z("p", Nr, J(e.title ? X(n)("player.transcodePreparingTitled", { title: e.title }) : X(n)("player.transcodePreparingUntitled")), 1),
			z("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [z("div", {
				class: "prep__bar-fill",
				style: W({ width: r() + "%" })
			}, null, 4)], 8, Pr),
			z("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [V(S, { name: "arrow-left" }), z("span", null, J(X(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Ir = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let o = F(() => a(n.position, n.introMarker) ? {
			label: i("player.skipIntro"),
			target: n.introMarker.end
		} : a(n.position, n.outroMarker) ? {
			label: i("player.skipOutro"),
			target: n.outroMarker.end
		} : null);
		function c() {
			o.value && r("skip", o.value.target);
		}
		return (e, t) => (G(), I(we, { name: "skip" }, {
			default: Q(() => [o.value ? (G(), R("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Me(c, ["stop"])
			}, [z("span", null, J(o.value.label), 1), V(S, { name: "skip-forward" })])) : L("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Lr = ["aria-label"], Rr = ["aria-label", "onClick"], zr = { class: "skip-controls__label" }, Br = 5, Vr = 30, Hr = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
			let n = a(e.startMs), r = n - Br, i = n + Vr;
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
		let d = F(() => !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => l.includes(e.type) && c(e, n.position)).sort((e, t) => e.startMs - t.startMs));
		function f(e) {
			r("skip", a(e.startMs));
		}
		return (e, t) => d.value.length > 0 ? (G(), R("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": X(i)("player.skipControls")
		}, [(G(!0), R(P, null, q(d.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${u(e.type)}`,
			onClick: Me((t) => f(e), ["stop"])
		}, [z("span", zr, J(u(e.type)), 1), V(S, { name: "skip-forward" })], 8, Rr))), 128))], 8, Lr)) : L("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Ur = ["aria-label", "aria-expanded"], Wr = ["aria-label"], Gr = { class: "chapterlist__head" }, Kr = { class: "chapterlist__title" }, qr = ["aria-label"], Jr = ["onClick"], Yr = { class: "chapterlist__index" }, Xr = { class: "chapterlist__name" }, Zr = { class: "chapterlist__meta" }, Qr = { class: "chapterlist__time" }, $r = {
	key: 0,
	class: "chapterlist__duration"
}, ei = {
	key: 1,
	class: "chapterlist__empty"
}, ti = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let c = F(() => n.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = ze(e.start), a;
			return e.end != null && e.end > e.start && (a = ze(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), l = K(null), u = K(null);
		w(u, Y(n, "open"), {
			lockScroll: !1,
			onEscape: () => (a(), !0)
		});
		function d(e) {
			l.value && !l.value.contains(e.target) && a();
		}
		Z(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", d, !0) : document.removeEventListener("pointerdown", d, !0));
		}), Oe(() => {
			document.removeEventListener("pointerdown", d, !0);
		});
		function f(e) {
			r("seek", e.start), a();
		}
		return (t, n) => (G(), R("div", {
			ref_key: "rootEl",
			ref: l,
			class: "chapterlist"
		}, [z("button", {
			type: "button",
			class: U(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": X(i)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: o
		}, [V(S, { name: "list" })], 10, Ur), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.chapterList"),
			tabindex: "-1"
		}, [z("div", Gr, [z("h3", Kr, J(X(i)("player.chapters")), 1), V(C, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), c.value.length > 0 ? (G(), R("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": X(i)("player.chapterList")
		}, [(G(!0), R(P, null, q(c.value, (e) => (G(), R("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [z("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => f(e.chapter)
		}, [
			z("span", Yr, J(e.index), 1),
			z("span", Xr, J(e.label), 1),
			z("span", Zr, [z("span", Qr, J(e.startLabel), 1), e.durationLabel ? (G(), R("span", $r, "· " + J(e.durationLabel), 1)) : L("", !0)])
		], 8, Jr)]))), 128))], 8, qr)) : (G(), R("p", ei, J(X(i)("player.noChapters")), 1))], 8, Wr)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ni = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, ri = { class: "marker-timeline__ticks" }, ii = [
	"title",
	"aria-label",
	"onClick"
], ai = { class: "marker-timeline__tooltip" }, oi = { class: "marker-timeline__tooltip-label" }, si = { class: "marker-timeline__tooltip-time numeric" }, ci = ["onClick"], li = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		}, [l.value ? (G(), R("div", ni, [t[0] ||= z("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [z("polygon", { points: "5,3 19,12 5,21" })], -1), B(" " + J(u.value), 1)])) : L("", !0), z("div", ri, [(G(!0), R(P, null, q(s.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: U(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: W({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${X(ze)(e.startSec)}`,
			"aria-label": `${e.label} at ${X(ze)(e.startSec)}`,
			onClick: Me((t) => d(e), ["stop"])
		}, [z("span", ai, [
			z("span", oi, J(e.label), 1),
			z("span", si, J(X(ze)(e.startSec)), 1),
			z("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Me((t) => f(e), ["stop"])
			}, " Find similar ", 8, ci)
		])], 14, ii))), 128))])], 2)) : L("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), ui = ["aria-label", "aria-expanded"], di = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, fi = ["aria-label"], pi = ["aria-selected", "onClick"], mi = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		], a = K(0), o = K(0), c = F(() => o.value > 0), l;
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
		let m = K(!1);
		function h() {
			c.value ? (f(0), m.value = !1) : m.value = !m.value;
		}
		function g(e) {
			f(e), m.value = !1;
		}
		return Oe(() => {
			u();
		}), t({ toggleOpen: h }), (e, t) => (G(), R("div", { class: U(["sleep-timer", { "is-active": c.value }]) }, [z("button", {
			type: "button",
			class: U(["sleep-timer__trigger", { "is-active": c.value }]),
			"aria-label": c.value ? `Sleep timer: ${p(o.value)} remaining` : X(r)("player.sleepTimer"),
			"aria-expanded": m.value,
			"aria-haspopup": "listbox",
			onClick: h
		}, [V(S, { name: "moon" }), c.value ? (G(), R("span", di, J(p(o.value)), 1)) : L("", !0)], 10, ui), V(we, { name: "dropdown" }, {
			default: Q(() => [m.value ? (G(), R("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": X(r)("player.sleepTimer")
			}, [(G(), R(P, null, q(i, (e) => z("li", {
				key: e.value,
				class: U(["sleep-timer__option", { "is-selected": a.value === e.value }]),
				role: "option",
				"aria-selected": a.value === e.value,
				onClick: (t) => g(e.value)
			}, J(e.label), 11, pi)), 64))], 8, fi)) : L("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), hi = {
	key: 0,
	class: "syncplay-overlay"
}, gi = { class: "syncplay-overlay__badge" }, _i = { class: "syncplay-overlay__label" }, vi = { class: "syncplay-overlay__status-label" }, yi = { class: "syncplay-overlay__members" }, bi = { class: "syncplay-overlay__member-count" }, xi = { class: "syncplay-overlay__member-list" }, Si = { class: "syncplay-overlay__member-name" }, Ci = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, wi = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let t = e, { t: n } = s(), r = pe(), i = a(), o = F(() => t.apiBase ?? i.value), c = F(() => r.currentRoom?.name ?? "SyncPlay"), l = F(() => r.onlineMembers.length), u = F(() => r.syncStatus), d = F(() => {
			switch (u.value) {
				case "synced": return n("syncplay.synced");
				case "outOfSync": return n("syncplay.outOfSync");
				case "re-syncing": return n("syncplay.reSyncing");
				default: return n("syncplay.synced");
			}
		}), f = F(() => {
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
		return (e, t) => X(r).isInRoom ? (G(), R("div", hi, [
			z("div", gi, [V(S, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), z("span", _i, "SyncPlay: " + J(c.value), 1)]),
			z("div", { class: U(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [V(S, {
				name: f.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), z("span", vi, J(d.value), 1)], 2),
			z("div", yi, [z("span", bi, [V(S, { name: "user" }), B(" " + J(X(n)("syncplay.members", { count: l.value })), 1)]), z("ul", xi, [(G(!0), R(P, null, q(X(r).onlineMembers.slice(0, 5), (e) => (G(), R("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= z("span", { class: "syncplay-overlay__member-dot" }, null, -1), z("span", Si, J(e.name), 1)]))), 128)), X(r).onlineMembers.length > 5 ? (G(), R("li", Ci, " +" + J(X(r).onlineMembers.length - 5) + " more ", 1)) : L("", !0)])]),
			V(ce, {
				variant: "ghost",
				size: "sm",
				onClick: p
			}, {
				default: Q(() => [B(J(X(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), Ti = {
	key: 0,
	class: "syncplay-controls"
}, Ei = ["aria-label"], Di = { class: "syncplay-controls__wait-label" }, Oi = { class: "syncplay-controls__transport" }, ki = ["aria-label"], Ai = ["aria-label"], ji = ["aria-label"], Mi = { class: "syncplay-controls__status-label" }, Ni = 10, Pi = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let r = e, i = t, { t: o } = s(), c = pe(), l = ee(), u = Te("phlixConfig", null), d = a(), f = F(() => r.apiBase ?? d.value);
		me((e) => {
			l.error(n(e, u?.locale, o("syncplay.commandRejected")));
		}), Ae(() => me(null));
		let p = K(!1), m = F(() => p.value || c.syncStatus === "re-syncing");
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
			await v(Math.max(0, r.position - Ni));
		}
		async function b() {
			await v(Math.min(r.duration, r.position + Ni));
		}
		return Z(() => c.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => X(c).isInRoom ? (G(), R("div", Ti, [
			m.value ? (G(), R("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": X(o)("syncplay.waitingForMembers")
			}, [V(S, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), z("span", Di, J(X(o)("syncplay.waitingForMembers")), 1)], 8, Ei)) : L("", !0),
			z("div", Oi, [
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(o)("syncplay.rewind"),
					onClick: y
				}, [V(S, { name: "rewind" })], 8, ki),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? X(o)("syncplay.pauseAll") : X(o)("syncplay.playAll"),
					onClick: _
				}, [V(S, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Ai),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(o)("syncplay.fastForward"),
					onClick: b
				}, [V(S, { name: "forward" })], 8, ji)
			]),
			z("div", { class: U(["syncplay-controls__status", `syncplay-controls__status--${X(c).syncStatus}`]) }, [V(S, {
				name: X(c).syncStatus === "synced" ? "check" : X(c).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), z("span", Mi, J(X(c).syncStatus === "synced" ? X(o)("syncplay.synced") : X(c).syncStatus === "outOfSync" ? X(o)("syncplay.outOfSync") : X(o)("syncplay.reSyncing")), 1)], 2)
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-338c0ffc"]]);
// src/utils/subtitleSrc.ts
function Fi(e, t) {
	return String(c(e, t));
}
function Ii(e, t) {
	let n = !1, r = t.map((t) => {
		let r = Fi(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
// src/components/Player.vue?vue&type=script&setup=true&lang.ts
var Li = { class: "player__stage" }, Ri = ["src", "poster"], zi = [
	"src",
	"srclang",
	"label"
], Bi = {
	key: 0,
	class: "player__buffering"
}, Vi = {
	class: "player__buffering-text",
	"aria-hidden": "true"
}, Hi = { class: "player__meta" }, Ui = ["aria-label"], Wi = { class: "player__meta-text" }, Gi = { class: "player__eyebrow" }, Ki = { class: "player__title" }, qi = { class: "player__sub numeric" }, Ji = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Yi = {
	key: 1,
	class: "player__center"
}, Xi = ["aria-label"], Zi = ["aria-label"], Qi = ["aria-label"], $i = { class: "player__btnrow" }, ea = ["aria-label"], ta = ["aria-label"], na = ["aria-label"], ra = { class: "player__time numeric" }, ia = ["aria-label", "aria-pressed"], aa = ["title"], oa = ["aria-label"], sa = ["aria-label"], ca = ["aria-label", "aria-pressed"], la = ["aria-label", "aria-pressed"], ua = ["aria-label"], da = { class: "similar-modal" }, fa = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, pa = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, ma = { class: "similar-modal__state-title" }, ha = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, ga = {
	key: 3,
	class: "similar-modal__results"
}, _a = { class: "similar-modal__poster" }, va = ["src", "alt"], ya = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, ba = { class: "similar-modal__result-body" }, xa = { class: "similar-modal__result-title" }, Sa = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Ca = { key: 0 }, wa = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let { imgSrc: n } = l(), i = e, o = t, c = d(), u = b(), { t: h } = s(), g = pe(), _ = f(), v = F(() => _.isFavorite(i.media.id)), y = F(() => _.likeLevel(i.media.id));
		function x() {
			_.toggleFavorite(i.media.id, Ee());
		}
		function C(e) {
			_.setLike(i.media.id, e, Ee());
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
		], T = K(null), E = K(null), D = K(null), O = K(!0), k = K(!1), ne = K(!1), A = K(!1), ie = K(!1), M = K(!1), ae = K(!1), ce = K(!1), le = K(null), de = K(null), fe = K(!1), me = ee(), ge = K(!1);
		function _e(e) {
			me.success(h("syncplay.joinedRoom", { name: e.name }));
		}
		let ve = F(() => M.value ? 1.35 : 1), N = K(Kn(i.streamUrl, i.media.path)), ye = F(() => sr(i.media.streams)), be = 0;
		async function xe() {
			let e = ++be;
			if (N.value) return;
			let t = await pr([i.streamUrl, i.media.path], i.playbackAudioTracks ?? [], ye.value);
			e === be && t && !N.value && (N.value = !0, Re(T.value?.currentTime ?? 0));
		}
		Z([() => i.playbackAudioTracks, ye], () => {
			xe();
		}, { immediate: !0 });
		let Se = Te("phlixConfig", null), Ce = a(), we = Te("resumeReporter", null), H = !1;
		function Ee() {
			return Ce.value;
		}
		let W = ut({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: Se?.playerHlsConfig
		}), Ae = mt({ apiBase: () => i.apiBase ?? "" }), Y = null;
		function je(e) {
			Y !== null && clearTimeout(Y), Y = setTimeout(() => {
				Y = null, Ae.fetch(e);
			}, 0);
		}
		let Ne = F(() => i.thumbnailAt ?? Ae.thumbnailAt), Pe = F(() => N.value ? void 0 : i.streamUrl), Fe = F(() => N.value && W.state.value !== "ready"), Ie = F(() => N.value && (W.state.value === "preparing" || W.state.value === "idle")), Le = F(() => N.value && W.state.value === "error");
		function Re(e = 0) {
			let t = T.value, n = navigator.connection?.downlinkMax, r = nt(n);
			t && W.start(t, i.media.id, r, e);
		}
		function Be(e) {
			c.quality === "original" && e !== "auto" ? W.loadVariantPlaylist(Ot) : typeof e == "string" && e !== "auto" ? W.loadVariantPlaylist(e) : W.setLevel(e);
		}
		let Ve = !1;
		function He() {
			u.defaultQuality = Dt;
		}
		function Ue() {
			let e = W.levels.value;
			if (e.length === 0) return !1;
			let t = u.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = W.variants.value;
				if (!t || t.length === 0) return !1;
				if (Ft(e, t)) W.loadVariantPlaylist(Ot);
				else {
					let t = Pt(e);
					t >= 0 && W.setNextLevel(t), He();
				}
				return !0;
			}
			let n = Mt(e, t);
			return n >= 0 ? W.setNextLevel(n) : He(), !0;
		}
		Z(() => W.levels.value, (e) => {
			Ve || e.length === 0 || Ue() && (Ve = !0);
		}), Z(() => W.variants.value, (e) => {
			!Ve && e?.length && De(() => {
				Ve || Ue() && (Ve = !0);
			});
		}, { deep: !0 });
		let Ge = K(c.resumePositionFor(i.media.id) ?? 0), $ = K(!N.value && Ge.value > 0), Ke = null, qe = K(!1), Je = K(8), Ye, Xe = K(null), Ze = K(0), Qe = K(!1), $e = K([]), et = K(!1), tt = K(null);
		function rt(e, t) {
			Xe.value = e, Ze.value = t, $e.value = [], tt.value = null, Qe.value = !0, ct(e, t);
		}
		let it = null, at = null, ot = null;
		function st() {
			let e = i.apiBase ?? "";
			return (at === null || ot !== e) && (at = new r({ baseUrl: e }), ot = e), at;
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
		function lt() {
			it?.abort(), Qe.value = !1, $e.value = [], tt.value = null, Xe.value = null;
		}
		let dt = F(() => c.upNext);
		function ft() {
			N.value = Kn(i.streamUrl, i.media.path), xe(), Ge.value = c.resumePositionFor(i.media.id) ?? 0, $.value = !N.value && Ge.value > 0, Ke = null, yn = !1, on = !1, nn.value = [], tn.value = !1, sn = !1, qt.value = -1, pn = null, Ve = !1, H = !1, zt(), wt = !1, jt = 0, At = 0, _t(), qe.value = !1, W.reset(), T.value && (T.value.currentTime = 0), N.value && Re(), je(i.media.id);
		}
		function pt(e) {
			let t = T.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ke = Math.max(0, e));
		}
		function ht() {
			pt(Ge.value), $.value = !1, T.value?.play()?.catch(() => {});
		}
		function gt() {
			Ke = null, pt(0), c.clearResume(i.media.id), $.value = !1, T.value?.play()?.catch(() => {});
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
			H || (H = !0, we?.finish()), ur(), O.value = !0, c.upNext && (qe.value = !0, u.autoplay && vt());
		}
		function bt() {
			_t(), qe.value = !1;
			let e = c.next(i.streamUrlFor);
			e && o("play-next", e);
		}
		function xt() {
			_t(), qe.value = !1;
		}
		function St() {
			if (N.value) return;
			let e = T.value, t = Jn(e) && (e?.currentTime ?? 0) === 0;
			(qn(e) || t) && (Nt(), zt(), N.value = !0, Re(e?.currentTime ?? 0));
		}
		let wt = !1, kt = null, At = 0, jt = 0;
		function Nt() {
			if (wt) return;
			wt = !0;
			let e = i.media?.id;
			e != null && e !== "" && st().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, Zn({ videoCodec: ye.value })).catch(() => {});
		}
		function It() {
			if (kt !== null || wt || N.value) return;
			let e = T.value;
			e && (At = Date.now(), jt = e.currentTime, kt = setTimeout(() => {
				kt = null;
				let e = T.value;
				e && !N.value && Qn(Date.now(), At, e.currentTime, jt) && (Nt(), N.value = !0, Re(e.currentTime));
			}, Yn));
		}
		function zt() {
			kt !== null && (clearTimeout(kt), kt = null);
		}
		let Bt = K([]), Vt = K([]), Ht = K(-1), Ut = K(!1), Wt = F(() => W.state.value === "ready" && W.audioTracks.value.length > 0), Gt = F(() => W.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Kt = F(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), qt = K(-1), Jt = F(() => !Wt.value && !N.value && Vt.value.length === 0 && Kt.value.length > 1), Yt = F(() => Vt.value.length > 0 ? !1 : W.state.value === "ready" ? !Wt.value && W.hasAudio.value : !N.value && !Jt.value && Kt.value.length === 1), Xt = F(() => Wt.value ? Gt.value : Jt.value ? Kt.value : Vt.value.length > 0 ? Vt.value : Yt.value ? [{
			index: 0,
			language: "",
			label: h("player.audioOriginal"),
			kind: "audio"
		}] : Vt.value), Zt = F(() => {
			if (Wt.value) return W.currentAudioTrack.value;
			if (Jt.value) {
				if (qt.value >= 0) return qt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Vt.value.length === 0 && Yt.value ? 0 : Ht.value;
		}), Qt = K(!1), $t = c.subtitleLang, en = F(() => {
			let e = i.apiBase ?? "", t = N.value ? W.subtitleTracks.value : Ii(e, i.playbackSubtitleTracks ?? []);
			if (nn.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Ii(e, nn.value), a = new Set(t.map(n)), o = r.filter((e) => !a.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), tn = K(!1), nn = K([]), rn = F(() => {
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
			let t = Bt.value.find((t) => t.language === (e.language || e.label));
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
		let un = F(() => Bt.value.some((e) => e.language === c.subtitleLang));
		function dn() {
			let e = T.value;
			Bt.value = oe(e), Vt.value = re(e), Ht.value = te(e), cn(), ln();
		}
		function fn() {
			if (un.value) $t = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = $t && Bt.value.some((e) => e.language === $t) ? $t : Bt.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			o("captions");
		}
		let pn = null;
		function hn(e) {
			if (!Yt.value) {
				if (Wt.value) W.setAudioTrack(e);
				else if (Jt.value) {
					if (e === Zt.value) return;
					qt.value = e, pn = e, N.value = !0, Re(T.value?.currentTime ?? 0);
				} else j(T.value, e), Ht.value = e;
			}
		}
		Z(Wt, (e) => {
			if (!e || pn === null) return;
			let t = pn;
			pn = null, t >= 0 && t < W.audioTracks.value.length && W.setAudioTrack(t);
		}), Z(en, () => {
			De(() => dn());
		}, { deep: !0 });
		let gn = null, _n, vn = F(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), yn = !1;
		function bn() {
			if (!i.autoplay || yn || $.value || Fe.value) return;
			let e = T.value;
			if (!e || !e.paused) return;
			yn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (c.muteForAutoplay(), e.muted = !0, e.play()?.catch(() => {}));
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
			c.play(), c.setMediaPositionState(), It();
		}
		function Dn() {
			c.pause(), c.setMediaPositionState(), k.value = !1;
		}
		function On() {
			k.value = !0, ur(), O.value = !0;
		}
		function kn() {
			k.value = !1, fr();
		}
		function jn() {
			let e = T.value;
			e && (kt !== null && e.currentTime > jt && zt(), c.updateProgress(e.currentTime, e.duration, Tn(e)), g.isInRoom && g.updateLocalPosition(e.currentTime));
		}
		function Mn() {
			let e = T.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, Ke !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ke) : Ke, Ke = null), c.updateProgress(e.currentTime, e.duration, Tn(e)), c.setMediaPositionState(), dn());
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
		function In() {
			c.setMediaPositionState();
		}
		function Rn() {
			c.setMediaPositionState();
		}
		function zn(e) {
			let t = T.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function Bn(e) {
			zn(c.position + e);
		}
		function Vn() {
			A.value = !0, fr();
		}
		function Un() {
			A.value = !1, fr();
		}
		function Wn(e) {
			let t = w.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(w[e] - c.rate) ? n : e, 0), n = w[Math.min(w.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		function Gn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && zn(t.startMs / 1e3);
		}
		function Xn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && zn(t.startMs / 1e3);
		}
		function $n() {
			le.value?.toggleOpen();
		}
		let er = null;
		function tr() {
			let e = T.value;
			if (!e) {
				c.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), c.pause();
				return;
			}
			er !== null && (clearInterval(er), er = null);
			let t = .05;
			er = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(er), er = null, e.volume = 0, e.pause(), c.pause());
			}, 50);
		}
		m({
			playPause: wn,
			seekBy: Bn,
			frameStep: (e) => {
				c.playing || zn(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: nr,
			toggleFullscreen: ir,
			toggleCaptions: fn,
			toggleTheater: rr,
			togglePip: or,
			skipIntro: Gn,
			skipOutro: Xn,
			sleepTimer: $n,
			seekToPercent: (e) => zn(e * c.duration),
			speedStep: Wn,
			toggleHelp: () => {
				ie.value = !ie.value;
			},
			toggleQuality: () => {
				N.value ? (fe.value = !fe.value, de.value?.toggleMenu?.()) : me.show({
					message: h("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !ie.value && !Ut.value && !Qt.value });
		function nr() {
			c.toggleMute();
		}
		function rr() {
			M.value = !M.value, o("theater", M.value);
		}
		Z(() => c.muted, (e) => {
			let t = T.value;
			t && t.muted !== e && (t.muted = e);
		}), Z(() => c.volume, (e) => {
			let t = T.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Z(() => c.rate, (e) => {
			let t = T.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), Z(() => c.lastCommand, (e) => {
			e && (e.type === "seekTo" ? pt(e.value) : e.type === "seekBy" && pt(c.position + e.value));
		});
		function ir() {
			if (typeof document > "u") return;
			let e = E.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function ar() {
			ne.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function or() {
			let e = T.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function cr() {
			ae.value = !0;
		}
		function lr() {
			ae.value = !1;
		}
		function ur() {
			_n &&= (clearTimeout(_n), void 0);
		}
		function dr() {
			ur(), !c.playing || A.value || k.value || (_n = setTimeout(() => {
				c.playing && !A.value && !k.value && (O.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function fr() {
			O.value = !0, dr();
		}
		let mr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", hr = "data-phlix-prev-tabindex", gr = "__phlix_no_tabindex__";
		function _r(e) {
			let t = E.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(mr) ? [n] : Array.from(n.querySelectorAll(mr));
				for (let n of t) if (e) {
					let e = n.getAttribute(hr);
					e === null || e === gr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(hr);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(hr, n.getAttribute("tabindex") ?? gr), n.setAttribute("tabindex", "-1"));
			}
		}
		Z(O, (e) => {
			typeof document < "u" && (_r(e), !e && document.activeElement instanceof HTMLElement && E.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), Z(() => c.playing, (e) => {
			e ? ($.value = !1, xt(), dr()) : (ur(), k.value = !1, O.value = !0);
		});
		let vr = null;
		ke(() => {
			c.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), _.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", ar), ce.value = document.pictureInPictureEnabled === !0), vr = c.bindMediaSession({
				onPlay: () => void T.value?.play()?.catch(() => {}),
				onPause: () => T.value?.pause(),
				onSeek: (e) => zn(e)
			}), gn = T.value?.textTracks ?? null, gn?.addEventListener?.("addtrack", dn), gn?.addEventListener?.("removetrack", dn), dn(), N.value && Re(), je(i.media.id);
		}), Z(() => i.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), ft();
		}), Z(() => i.media?.id, () => {
			_.hydrate(i.media);
		}), Z(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (T.value?.play()?.catch(() => {}), c.play()) : e.state === "paused" && (T.value?.pause(), c.pause()), g.updateLocalPosition(c.position), Math.abs(g.driftAmount) > 2 && pt(e.playbackPosition));
		});
		let yr = null;
		return Z(() => g.pendingPlayMedia, async (e) => {
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
				}), T.value?.play()?.catch(() => {}), c.play(), g.consumePendingPlayMedia(), yr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			yr !== n && (yr = n, o("pending-media", e.mediaId, e.title));
		}), Oe(() => {
			we?.reportFinal?.(), ur(), _t(), W.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", ar), vr?.(), gn?.removeEventListener?.("addtrack", dn), gn?.removeEventListener?.("removetrack", dn), er !== null && (clearInterval(er), er = null), Y !== null && (clearTimeout(Y), Y = null), zt();
		}), (t, r) => (G(), R("div", {
			ref_key: "containerRef",
			ref: E,
			class: U(["player", {
				"is-chrome-hidden": !O.value,
				"is-theater": M.value
			}]),
			onPointermove: fr,
			onPointerdown: fr,
			onFocusin: fr
		}, [V(Ln, {
			video: T.value,
			enabled: X(u).atmosphere,
			playing: X(c).playing,
			"reduced-motion": X(u).effectiveReducedMotion,
			intensity: ve.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), z("div", Li, [
			z("video", {
				ref_key: "videoRef",
				ref: T,
				class: "player__video",
				src: Pe.value,
				poster: X(n)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: En,
				onPause: Dn,
				onTimeupdate: jn,
				onLoadedmetadata: Mn,
				onCanplay: xn,
				onWaiting: On,
				onStalled: On,
				onPlaying: kn,
				onProgress: Nn,
				onVolumechange: Pn,
				onRatechange: Fn,
				onSeeked: In,
				onDurationchange: Rn,
				onEnded: yt,
				onError: St,
				onEnterpictureinpicture: cr,
				onLeavepictureinpicture: lr,
				onClick: wn
			}, [(G(!0), R(P, null, q(en.value, (e) => (G(), R("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, zi))), 128))], 40, Ri),
			r[22] ||= z("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[23] ||= z("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			k.value ? (G(), R("div", Bi, [V(ue, {
				size: 38,
				label: X(h)("player.buffering")
			}, null, 8, ["label"]), z("span", Vi, J(X(h)("player.buffering")), 1)])) : L("", !0),
			z("div", Hi, [z("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": X(h)("player.back"),
				onClick: r[0] ||= Me((e) => o("back"), ["stop"])
			}, [V(S, { name: "arrow-left" })], 8, Ui), z("div", Wi, [
				z("p", Gi, J(X(h)("player.nowPlaying")), 1),
				z("h2", Ki, J(e.media.name), 1),
				z("div", qi, [(G(!0), R(P, null, q(vn.value, (e, t) => (G(), R(P, { key: t }, [t > 0 && !e.cert ? (G(), R("span", Ji, "·")) : L("", !0), z("span", { class: U({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			Fe.value ? L("", !0) : (G(), R("div", Yi, [
				O.value ? (G(), R("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(h)("player.seekBackward"),
					onClick: r[1] ||= Me((e) => Bn(-10), ["stop"])
				}, [V(S, { name: "rewind" }), z("span", { class: "player__center-skip-count" }, J(10))], 8, Xi)) : L("", !0),
				z("button", {
					type: "button",
					class: U(["player__bigplay", { "is-playing": X(c).playing }]),
					"aria-label": X(c).playing ? X(h)("player.pause") : X(h)("player.play"),
					onClick: Me(wn, ["stop"])
				}, [V(S, { name: X(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Zi),
				O.value ? (G(), R("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(h)("player.seekForward"),
					onClick: r[2] ||= Me((e) => Bn(10), ["stop"])
				}, [V(S, { name: "forward" }), z("span", { class: "player__center-skip-count" }, J(10))], 8, Qi)) : L("", !0)
			])),
			V(Rt, {
				video: T.value,
				language: X(c).subtitleLang,
				"style-config": X(u).captionStyle,
				lifted: O.value,
				"controls-root": D.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Fe.value ? L("", !0) : (G(), R("div", {
				key: 2,
				ref_key: "controlsRef",
				ref: D,
				class: "player__controls",
				onClick: r[9] ||= Me(() => {}, ["stop"])
			}, [
				V(We, {
					position: X(c).position,
					duration: X(c).duration,
					buffered: X(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": Ne.value,
					onSeek: zn,
					onScrubStart: Vn,
					onScrubEnd: Un
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				X(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), I(li, {
					key: 0,
					position: X(c).position,
					duration: X(c).duration,
					markers: e.markers,
					onSeek: zn,
					onSimilar: rt
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : L("", !0),
				z("div", $i, [
					e.prevEpisode ? (G(), R("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(h)("player.previousEpisode"),
						onClick: Sn
					}, [V(S, { name: "skip-back" })], 8, ea)) : L("", !0),
					z("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": X(c).playing ? X(h)("player.pause") : X(h)("player.play"),
						onClick: wn
					}, [V(S, { name: X(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, ta),
					e.nextEpisode ? (G(), R("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(h)("player.nextEpisode"),
						onClick: Cn
					}, [V(S, { name: "skip-forward" })], 8, na)) : L("", !0),
					z("span", ra, [
						B(J(X(ze)(X(c).position)), 1),
						r[18] ||= z("span", { class: "player__sep" }, " / ", -1),
						B(J(X(ze)(X(c).duration)), 1)
					]),
					r[19] ||= z("span", { class: "player__grow" }, null, -1),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? X(h)("itemActions.removeFavorite") : X(h)("itemActions.addFavorite"),
						"aria-pressed": v.value ? "true" : "false",
						onClick: x
					}, [V(S, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ia),
					V(p, {
						level: y.value,
						onCycle: C
					}, null, 8, ["level"]),
					V(Tt),
					V(Et),
					V(Lt, {
						ref_key: "qualityMenuRef",
						ref: de,
						open: fe.value,
						"onUpdate:open": r[3] ||= (e) => fe.value = e,
						levels: X(W).levels.value,
						variants: X(W).variants.value,
						"current-level": X(W).currentLevel.value,
						"auto-enabled": X(W).autoEnabled.value,
						"active-height": X(W).activeLevelHeight.value,
						onSelect: Be
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					N.value ? L("", !0) : (G(), R("span", {
						key: 2,
						class: "player__direct-badge",
						title: X(h)("player.qualityDirectStream")
					}, J(X(h)("player.directStream")), 9, aa)),
					V(mn, {
						open: Ut.value,
						"onUpdate:open": r[4] ||= (e) => Ut.value = e,
						tracks: Bt.value,
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
					V(ti, {
						open: Qt.value,
						"onUpdate:open": r[6] ||= (e) => Qt.value = e,
						chapters: e.chapters ?? [],
						onSeek: zn
					}, null, 8, ["open", "chapters"]),
					V(mi, {
						ref_key: "sleepTimerRef",
						ref: le,
						"on-expire": tr
					}, null, 512),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__syncplay", { "is-on": X(g).isInRoom }]),
						"aria-label": X(g).isInRoom ? X(h)("syncplay.inRoom") : X(h)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[7] ||= (e) => ge.value = !0
					}, [V(S, { name: "user" })], 10, oa),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(h)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[8] ||= (e) => ie.value = !0
					}, [V(S, { name: "info" })], 8, sa),
					ce.value ? (G(), R("button", {
						key: 3,
						type: "button",
						class: U(["player__iconbtn", { "is-on": ae.value }]),
						"aria-label": ae.value ? X(h)("player.exitPip") : X(h)("player.pip"),
						"aria-pressed": ae.value,
						onClick: or
					}, [V(S, { name: "pip" })], 10, ca)) : L("", !0),
					z("button", {
						type: "button",
						class: U(["player__iconbtn", { "is-on": M.value }]),
						"aria-label": M.value ? X(h)("player.exitTheater") : X(h)("player.theater"),
						"aria-pressed": M.value,
						onClick: rr
					}, [V(S, { name: "theater" })], 10, la),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? X(h)("player.exitFullscreen") : X(h)("player.fullscreen"),
						onClick: ir
					}, [V(S, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ua)
				])
			], 512)),
			Fe.value ? L("", !0) : (G(), I(Ir, {
				key: 3,
				position: X(c).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: zn
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Fe.value ? L("", !0) : (G(), I(Hr, {
				key: 4,
				position: X(c).position,
				markers: e.markers,
				onSkip: zn
			}, null, 8, ["position", "markers"])),
			$.value && !Fe.value ? (G(), I(Hn, {
				key: 5,
				seconds: Ge.value,
				onResume: ht,
				onRestart: gt
			}, null, 8, ["seconds"])) : L("", !0),
			qe.value && dt.value && !Fe.value ? (G(), I(wr, {
				key: 6,
				media: dt.value,
				remaining: Je.value,
				total: X(8),
				counting: X(u).autoplay,
				onPlayNow: bt,
				onCancel: xt
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : L("", !0),
			V(se, {
				modelValue: Qe.value,
				"onUpdate:modelValue": r[10] ||= (e) => Qe.value = e,
				title: `Similar ${Xe.value ?? "marker"}s`,
				size: "lg",
				onClose: lt
			}, {
				default: Q(() => [z("div", da, [et.value ? (G(), R("div", fa, [V(ue, { label: "Finding similar media" })])) : tt.value ? (G(), R("div", pa, [V(S, {
					name: "error",
					class: "similar-modal__state-icon"
				}), z("p", ma, J(tt.value), 1)])) : !et.value && $e.value.length === 0 ? (G(), R("div", ha, [
					V(S, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[20] ||= z("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[21] ||= z("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), R("ul", ga, [(G(!0), R(P, null, q($e.value, (e) => (G(), R("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [z("div", _a, [e.poster_url ? (G(), R("img", {
					key: 0,
					src: X(n)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, va)) : (G(), R("div", ya, [V(S, { name: "film" })]))]), z("div", ba, [z("p", xa, J(e.name), 1), e.year ? (G(), R("p", Sa, [B(J(e.year) + " ", 1), e.runtime ? (G(), R("span", Ca, " · " + J(e.runtime) + "m", 1)) : L("", !0)])) : L("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Ie.value ? (G(), I(Fr, {
				key: 7,
				title: e.media.name,
				progress: X(W).progress.value,
				onBack: r[11] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : L("", !0),
			Le.value ? (G(), I(kr, {
				key: 8,
				title: e.media.name,
				onBack: r[12] ||= (e) => o("back")
			}, null, 8, ["title"])) : L("", !0),
			X(g).isInRoom ? (G(), I(Pi, {
				key: 9,
				position: X(c).position,
				duration: X(c).duration,
				"is-playing": X(c).playing,
				onSeek: zn,
				onPlay: r[13] ||= (e) => void T.value?.play()?.catch(() => {}),
				onPause: r[14] ||= (e) => void T.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : L("", !0),
			X(g).isInRoom ? (G(), I(wi, { key: 10 })) : L("", !0),
			V(he, {
				modelValue: ge.value,
				"onUpdate:modelValue": r[15] ||= (e) => ge.value = e,
				onJoined: _e
			}, null, 8, ["modelValue"]),
			V(Ct, {
				open: ie.value,
				onClose: r[16] ||= (e) => ie.value = !1
			}, null, 8, ["open"]),
			V(An, {
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
}), [["__scopeId", "data-v-3bab76a6"]]), Ta = { class: "player-page__stage" }, Ea = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Da = { class: "player-page__blocking-error" }, Oa = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = a(), { imgSrc: c } = l(), p = o(), m = Pe(), h = Fe(), { t: _ } = s(), v = Te("phlixConfig", null), y = d(), b = f(), ee = g(), x = K(null), S = K(""), C = K([]), w = K(null), T = K(null), E = K([]), te = K([]), D = K(!0), O = K(null), k = K(!1), ne = K(null), re = K(!1), A = K(null), j = K(null), ie = F(() => String(m.params.id ?? ""));
		be(() => x.value?.name);
		let M = F(() => {
			let e = c(x.value?.poster_url);
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), ae = null, oe = !1, le = 0;
		function ue(e) {
			return oe || e.generation !== le;
		}
		function de(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function pe(e) {
			let t = p.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function me(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function he(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function P(e, t, r) {
			let i = () => ue(r), a = t.genres?.[0];
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
				if (i() || de(e)) return;
				y.setQueue([]);
			}
		}
		async function we(e, t, r) {
			let i = u(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function H(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Ee(e, t) {
			A.value = ve(e, t), j.value = N(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && y.setQueue(r);
		}
		function De(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function Ae(e, n, r) {
			if (A.value = null, j.value = null, !he(n)) return;
			let i = De(n.id);
			if (i) {
				Ee(i, n.id);
				return;
			}
			let a = () => ue(r);
			try {
				let i = await H(e, n, r.controller?.signal);
				if (a()) return;
				let o = await we(e, i.id, r.controller?.signal);
				if (a()) return;
				if (_e(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => we(e, t.id, r.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = ge(o);
				s.length && t.set(i.id, s), Ee(s, n.id);
			} catch (e) {
				if (a() || de(e)) return;
				A.value = null, j.value = null;
			}
		}
		async function q() {
			let e = ie.value;
			ae?.abort(), ae = typeof AbortController < "u" ? new AbortController() : null, le += 1;
			let t = {
				generation: le,
				controller: ae
			};
			if (D.value = !0, O.value = null, C.value = [], w.value = null, T.value = null, E.value = [], te.value = [], A.value = null, j.value = null, y.hideMiniPlayer(), !e) {
				O.value = _("common.missingMediaId"), D.value = !1;
				return;
			}
			let a = new r({ baseUrl: n.value });
			a.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, t.controller?.signal).then((e) => {
				ue(t) || (C.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), w.value = me(e?.intro_marker), T.value = me(e?.outro_marker), E.value = $n(e?.audio_tracks), te.value = Je(e?.subtitle_tracks));
			}).catch(() => null);
			let o = xe(e), s = Date.now();
			if (o && Se(o, s)) {
				Y(a, o.item, t);
				return;
			}
			let c = null;
			try {
				c = (await a.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t.controller?.signal)).item;
			} catch (e) {
				if (ue(t) || de(e)) return;
				if (e instanceof i && (e.status === 403 || e.status === 429)) {
					let t = Le(e.body, v?.locale);
					if (t !== null) {
						ne.value = t, re.value = !0, D.value = !1;
						return;
					}
				}
				if (o) {
					Y(a, o.item, t);
					return;
				}
				O.value = Re(e, v?.locale), D.value = !1;
				return;
			}
			if (!ue(t)) {
				if (c) Ce(e, c, s), Y(a, c, t);
				else {
					if (o) {
						Y(a, o.item, t);
						return;
					}
					O.value = "Failed to load media item", D.value = !1;
				}
			}
		}
		async function Y(e, t, n) {
			x.value = t, b.hydrate(t), S.value = pe(t), D.value = !1, he(t) && (await Ae(e, t, n), ue(n) || j.value) || P(e, t, n);
		}
		ke(q), Z(ie, q), Ne(() => {
			y.current && y.streamUrl && y.showMiniPlayer();
		}), Oe(() => {
			oe = !0, ae?.abort(), ae = null, ee.reset();
		});
		function je() {
			h?.back();
		}
		function Me(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ie(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function ze(e) {
			k.value = e, ee.setTheaterActive(e);
		}
		function Be() {
			re.value = !1, je();
		}
		return (e, t) => (G(), R("div", { class: U(["player-page", { "is-theater": k.value }]) }, [
			M.value && !D.value && !O.value ? (G(), R("div", {
				key: 0,
				class: "player-page__ambient",
				style: W(M.value),
				"aria-hidden": "true"
			}, null, 4)) : L("", !0),
			z("div", Ta, [D.value ? (G(), R("div", Ea, [V(ye, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : O.value ? (G(), I(fe, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: O.value
			}, {
				actions: Q(() => [V(ce, {
					variant: "solid",
					onClick: q
				}, {
					default: Q(() => [...t[1] ||= [B("Retry", -1)]]),
					_: 1
				}), V(ce, {
					variant: "ghost",
					onClick: je
				}, {
					default: Q(() => [...t[2] ||= [B("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : x.value ? (G(), I(wa, {
				key: 2,
				media: x.value,
				"stream-url": S.value,
				"stream-url-for": pe,
				"api-base": X(n),
				chapters: C.value,
				"intro-marker": w.value,
				"outro-marker": T.value,
				"playback-audio-tracks": E.value,
				"playback-subtitle-tracks": te.value,
				"prev-episode": A.value,
				"next-episode": j.value,
				autoplay: !0,
				onBack: je,
				onPlayNext: Me,
				onPlayEpisode: Ie,
				onTheater: ze
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
				modelValue: re.value,
				"onUpdate:modelValue": t[0] ||= (e) => re.value = e,
				title: "Can’t start playback",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Q(() => [V(ce, {
					variant: "solid",
					onClick: Be
				}, {
					default: Q(() => [...t[3] ||= [B("OK", -1)]]),
					_: 1
				})]),
				default: Q(() => [z("p", Da, J(ne.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-98924eb8"]]);
export { Oa as default };

//# sourceMappingURL=PlayerPage-CR9MkMKP.js.map