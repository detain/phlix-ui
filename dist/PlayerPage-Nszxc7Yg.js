import { S as e, o as t, t as n, x as r, y as i } from "./client-Bmlfq3Uy.js";
import { n as a, r as o } from "./useApiBase-DXTBY90j.js";
import { t as s } from "./useMessages-Ds_MGz5S.js";
import { r as c, t as l } from "./useImageSrc-CSM61b-l.js";
import { n as u } from "./media-query-D7hrCu8r.js";
import { i as d } from "./usePlayerStore-BpohCwDP.js";
import { n as f, t as p } from "./ThumbRating-CPrtMc-8.js";
import { a as m, n as h, o as g, r as _, s as v, t as y } from "./shortcuts-DhDck2s-.js";
import { a as b } from "./usePreferencesStore-DrDMAwjz.js";
import { t as ee } from "./useToastStore-CxO_ppM8.js";
import { n as x, t as S } from "./Icon-55iG1rR7.js";
import { t as C } from "./IconButton-DsjtwjU1.js";
import { n as w } from "./useFocusTrap-DStfPnC8.js";
import { t as T } from "./Slider-Bj5BaBUu.js";
import { t as E } from "./Select-Bu7KxTAr.js";
import { a as te, c as D, d as O, f as k, i as ne, l as re, n as A, o as j, r as ie, s as M, t as N, u as ae } from "./captions-DV5mDPeu.js";
import { t as oe } from "./Modal-6aMhfOTF.js";
import { t as se } from "./Button-Dfl4y6vO.js";
import { t as ce } from "./Chip-DwTdWHEP.js";
import { t as le } from "./Spinner-BOeBa1zU.js";
import { t as ue } from "./Badge-D7vacFbh.js";
import { t as de } from "./EmptyState-DjfWh3kt.js";
import { n as fe, r as pe, t as me } from "./SyncPlayModal-CTCQA-m5.js";
import { n as he, o as ge, r as _e, t as ve } from "./episode-order-DBEVgrOE.js";
import { t as P } from "./Skeleton-DDhrDRE7.js";
import { i as ye } from "./usePageTitle-j6j9gAmo.js";
import { n as be, r as xe, t as Se } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as F, Transition as Ce, computed as I, createBlock as L, createCommentVNode as R, createElementBlock as z, createElementVNode as B, createTextVNode as V, createVNode as H, defineComponent as U, inject as we, mergeModels as Te, nextTick as Ee, normalizeClass as W, normalizeStyle as De, onBeforeUnmount as Oe, onMounted as ke, onScopeDispose as G, openBlock as K, ref as q, renderList as J, toDisplayString as Y, toRef as Ae, unref as X, useModel as je, watch as Z, withCtx as Q, withModifiers as Me } from "vue";
import { onBeforeRouteLeave as Ne, useRoute as Pe, useRouter as Fe } from "vue-router";
function Ie(e, t) {
	if (typeof e != "object" || !e) return null;
	let n = e[t];
	return typeof n == "string" && n !== "" ? n : null;
}
function Le(e, t) {
	let n = Ie(e, "code");
	if (n !== null && r(n)) return i(n, t);
	let a = Ie(e, "error");
	return a === "AccessScheduled" ? "Playback blocked by access schedule. Try again during allowed hours." : a === "StreamLimitExceeded" ? "Stream limit reached. Stop another stream to continue watching." : null;
}
function Re(t, n) {
	if (t instanceof e) {
		let e = Ie(t.body, "code");
		if (e !== null && r(e)) return i(e, n);
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
], Ve = { class: "scrubber__track" }, He = ["title"], Ue = { class: "scrubber__time numeric" }, We = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
		let { t: r } = s(), i = e, a = n, o = q(null), c = q(!1), l = q(!1), u = q(0), d = q(0), f = (e) => Math.min(1, Math.max(0, e)), p = I(() => c.value ? u.value : i.duration > 0 ? f(i.position / i.duration) : 0), m = I(() => i.duration > 0 ? f(i.buffered / i.duration) : 0), h = I(() => (c.value || l.value) && i.duration > 0), g = I(() => c.value ? u.value : d.value), _ = I(() => g.value * i.duration), v = I(() => h.value ? i.thumbnailAt?.(_.value) ?? null : null), y = I(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), b = I(() => `${Math.min(96, Math.max(4, g.value * 100))}%`), ee = I(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
		}), (t, n) => (K(), z("div", {
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
		}, [B("div", Ve, [
			B("div", {
				class: "scrubber__buffered",
				style: De({ transform: `scaleX(${m.value})` })
			}, null, 4),
			B("div", {
				class: "scrubber__played",
				style: De({ transform: `scaleX(${p.value})` })
			}, null, 4),
			(K(!0), z(F, null, J(ee.value, (e, t) => (K(), z("span", {
				key: t,
				class: "scrubber__tick",
				style: De({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, He))), 128)),
			B("div", {
				class: W(["scrubber__head", { "is-dragging": c.value }]),
				style: De({ left: `${p.value * 100}%` })
			}, null, 6)
		]), h.value ? (K(), z("div", {
			key: 0,
			class: "scrubber__preview",
			style: De({ left: b.value }),
			"aria-hidden": "true"
		}, [v.value ? (K(), z("div", {
			key: 0,
			class: "scrubber__thumb",
			style: De({ backgroundImage: y.value })
		}, null, 4)) : R("", !0), B("span", Ue, Y(X(ze)(_.value)), 1)], 4)) : R("", !0)], 40, Be));
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
		if (r <= 0) continue;
		let i = e.playlist_url ?? e.playlistUrl;
		t.push({
			id: $(e.id),
			label: $(e.label),
			height: r,
			width: qe(e.width),
			bitrate: qe(e.bitrate),
			...typeof e.url == "string" && e.url !== "" ? { url: e.url } : {},
			...typeof i == "string" && i !== "" ? { playlistUrl: i } : {}
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
	let t = q("idle"), r = q(0), i = q([]), a = q([]), o = q(-1), s = q(!0), c = q(null), l = q(null), u = q([]), f = q(-1), p = q(!1), m = q(null), h = q(null);
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
	function x(t) {
		if (!t || t.length === 0) return;
		let n = e.apiBase(), r = t.map((e) => ({
			...e,
			...e.url ? { url: ct(n, e.url) } : {},
			...e.playlistUrl ? { playlistUrl: ct(n, e.playlistUrl) } : {}
		}));
		ie = r, l.value = r;
	}
	function S(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		i.value = t.map((e) => ({
			...e,
			url: ct(n, e.url)
		}));
	}
	let C = e.attach ?? v, w = e.pollIntervalMs ?? 1e3, T = e.maxWaitMs ?? 12e4, E = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), te = Math.max(1, Math.ceil(T / Math.max(1, w))), D = e.getToken ?? dt, O = e.probeRungPlaylist ?? ((e) => ht(e, D)), k = null, ne = null, re = null, A = null, j = !1, ie = [], M = 0, N = null, ae = 0;
	function oe() {
		return e.client ?? new n({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function se(n, a, o, s) {
		fe(), j = !1;
		let c = ++ae, l = () => j || c !== ae;
		N = new AbortController(), t.value = "preparing", r.value = 0, i.value = [], _();
		try {
			let i = oe(), c = it(await i.post(Xe(a, o), void 0, N.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			S(c.subtitles), x(c.variants), m.value = c.jobId, h.value = ct(e.apiBase(), c.masterUrl);
			let u = c.status === "completed";
			for (let e = 0; !u && e < te; e++) {
				let e = at(await i.get(rt(c.jobId), void 0, N.signal));
				if (l()) return;
				if (r.value = e.progress, S(e.subtitles), x(e.variants), st(e.status)) throw Error(`transcode ${e.status}`);
				if (ot(e)) {
					u = !0;
					break;
				}
				if (await E(w), l()) return;
			}
			if (!u) throw Error("transcode timed out");
			let f = await C(n, h.value, {
				getToken: D,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => {
					g(), y(), b();
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
			k = f, ne = k.onLevelSwitched((e) => g(e)), re = k.onAudioTrackSwitched((e) => y(e)), A = k.onLevelLoaded(() => {
				y(), b();
			}), g(), y(), b();
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
		let t = ie.find((t) => t.id === e), n = t?.playlistUrl ?? pt(h.value, e), r = t?.url ?? mt(h.value, e), i = ++M;
		(async () => {
			let e;
			try {
				e = await O(n);
			} catch {
				e = "unknown";
			}
			!j && i === M && k && (e === "absent" ? (console.warn(`[phlix-ui] rung mini-master unavailable (${n}) — this server has no per-rung index files; falling back to the legacy bare rung playlist (${r}). Multi-audio titles play silent on the video-only bare rung and the audio menu stays hidden (never a stale rendition list); muxed-audio titles play correctly. The menu returns once the server ships the index.`), k.loadSource(r)) : k.loadSource(n), _());
		})();
	}
	function fe() {
		if (j = !0, M++, N &&= (N.abort(), null), ne) {
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
		ie = [], m.value = null, h.value = null;
	}
	function pe() {
		fe(), t.value = "idle", r.value = 0, i.value = [], _(), ee();
		try {
			d().hlsMasterUrl = "";
		} catch {}
	}
	return {
		state: t,
		progress: r,
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
function ft(e) {
	let t = e.indexOf("?");
	return t === -1 ? [e, ""] : [e.slice(0, t), e.slice(t)];
}
function pt(e, t) {
	let [n, r] = ft(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}${lt}${r}`;
}
function mt(e, t) {
	let [n, r] = ft(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}.m3u8${r}`;
}
async function ht(e, t) {
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
var gt = 10;
function _t(e) {
	let t = q(null), r = q(!1), i = q(null), a = /* @__PURE__ */ new Map();
	function o() {
		return new n({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % gt, o = Math.floor(i / gt), c = a / 9 * 100, l = o / 5 * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function l(n, s) {
		if (a.has(n) && (t.value = a.get(n) ?? null, t.value !== null)) return;
		let c = s ?? e.signal;
		if (!c?.aborted) {
			r.value = !0, i.value = null;
			try {
				let e = await o().getTrickplay(n, c);
				a.set(n, e), t.value = e;
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				a.set(n, null), i.value = e instanceof Error ? e.message : "Failed to load trickplay data", t.value = null;
			} finally {
				r.value = !1;
			}
		}
	}
	function u() {
		t.value = null, r.value = !1, i.value = null, a.clear();
	}
	return {
		data: t,
		loading: r,
		error: i,
		thumbnailAt: c,
		fetch: l,
		reset: u
	};
}
// src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var vt = ["aria-label"], yt = { class: "shortcuts__head" }, bt = { class: "shortcuts__title" }, xt = { class: "shortcuts__grid" }, St = { class: "shortcuts__keys" }, Ct = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, wt = {
	key: 1,
	class: "shortcuts__key"
}, Tt = { class: "shortcuts__label" }, Et = /*#__PURE__*/ x(/* @__PURE__ */ U({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => _ }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = s(), a = q(null);
		return w(a, Ae(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (K(), z("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Me((e) => r("close"), ["self"])
		}, [B("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [B("div", yt, [B("h3", bt, Y(X(i)("player.keyboard")), 1), H(C, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), B("ul", xt, [(K(!0), z(F, null, J(e.shortcuts, (e) => (K(), z("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [B("span", St, [(K(!0), z(F, null, J(e.keys, (e, t) => (K(), z(F, { key: t }, [e === "–" ? (K(), z("span", Ct, "–")) : (K(), z("kbd", wt, [X(y)[e] ? (K(), L(S, {
			key: 0,
			name: X(y)[e],
			label: X(h)[e] ?? e
		}, null, 8, ["name", "label"])) : (K(), z(F, { key: 1 }, [V(Y(e), 1)], 64))]))], 64))), 128))]), B("span", Tt, Y(e.label), 1)]))), 128))])], 8, vt)])) : R("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Dt = { class: "volume" }, Ot = /*#__PURE__*/ x(/* @__PURE__ */ U({
	__name: "VolumeControl",
	setup(e) {
		let t = d(), n = b(), { t: r } = s(), i = I(() => t.muted ? 0 : t.volume), a = I(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function o(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (K(), z("div", Dt, [H(C, {
			name: a.value,
			label: X(t).muted ? X(r)("player.unmute") : X(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => X(t).toggleMute()
		}, null, 8, ["name", "label"]), H(T, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), kt = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
		], n = d(), { t: r } = s(), i = I(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (K(), L(E, {
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
}), [["__scopeId", "data-v-4530b308"]]), At = "auto", jt = "original";
function Mt(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function Nt(e) {
	return e >= 2160 ? "4K" : Mt(e);
}
function Pt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Mt(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: Nt(r.height)
		}));
	}
	return n;
}
function Ft(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Mt(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function It(e, t) {
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
function Lt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Rt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && It(e, n) >= 0;
}
function zt(e, t) {
	if (t < 0) return At;
	let n = e.find((e) => e.index === t);
	return n ? Mt(n.height) : At;
}
// src/components/player/QualityMenu.vue
var Bt = /*#__PURE__*/ x(/* @__PURE__ */ U({
	__name: "QualityMenu",
	props: /*@__PURE__*/ Te({
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
	emits: /*@__PURE__*/ Te(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, i = je(e, "open"), a = q(null);
		function o() {
			a.value?.toggleMenu();
		}
		let c = n, l = d(), u = b(), { t: f } = s(), p = I(() => Pt(r.levels)), m = I(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = p.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = Mt(i.height);
				e.has(a) || n && Ft(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: Nt(i.height)
				}));
			}
			return t;
		}), h = I(() => p.value.length >= 2 ? p.value : m.value), g = I(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), _ = I(() => It(r.levels, g.value)), v = I(() => g.value && _.value >= 0 ? {
			value: jt,
			label: f("player.qualityOriginal", { height: g.value.height })
		} : null), y = I(() => h.value.length >= 2), ee = I(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: Nt(r.activeHeight) })), x = I(() => [
			{
				value: At,
				label: ee.value
			},
			...v.value ? [v.value] : [],
			...h.value
		]), S = I(() => r.autoEnabled ? At : v.value && r.currentLevel === _.value && (l.quality === "original" || u.defaultQuality === "original") ? jt : zt(r.levels, r.currentLevel));
		function C(e) {
			let t = String(e);
			if (t === "auto") {
				l.setQuality(t), u.defaultQuality = t, c("select", "auto");
				return;
			}
			let n = t === "original" ? _.value : Ft(r.levels, t);
			l.setQuality(t), u.defaultQuality = t, n >= 0 ? c("select", n) : c("select", t);
		}
		return t({ toggleMenu: o }), (e, t) => y.value || i.value ? (K(), L(E, {
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
		])) : R("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), Vt = /*#__PURE__*/ x(/* @__PURE__ */ U({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = q([]), i = q(0), a = I(() => n.lifted ? i.value : 0), o = I(() => ({
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
		return Z(() => [n.video, n.language], y, { immediate: !0 }), Oe(_), t({ lines: r }), (t, n) => r.value.length ? (K(), z("div", {
			key: 0,
			class: W(["player__captions", { "is-lifted": e.lifted }]),
			style: De(o.value)
		}, [(K(!0), z(F, null, J(r.value, (e, t) => (K(), z("p", {
			key: t,
			class: "player__caption-line"
		}, Y(e), 1))), 128))], 6)) : R("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), Ht = ["aria-label", "aria-expanded"], Ut = ["aria-label"], Wt = { class: "capmenu__head" }, Gt = { class: "capmenu__title" }, Kt = ["aria-label"], qt = ["aria-checked", "tabindex"], Jt = { class: "capmenu__check" }, Yt = { class: "capmenu__optlabel" }, Xt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Zt = { class: "capmenu__check" }, Qt = { class: "capmenu__optlabel" }, $t = { class: "capmenu__check" }, en = { class: "capmenu__optlabel" }, tn = { class: "capmenu__title capmenu__title--sub" }, nn = ["aria-label"], rn = [
	"aria-checked",
	"tabindex",
	"onClick"
], an = { class: "capmenu__check" }, on = { class: "capmenu__optlabel" }, sn = { class: "capmenu__title capmenu__title--sub" }, cn = { class: "capmenu__style" }, ln = { class: "capmenu__field" }, un = { class: "capmenu__fieldlabel" }, dn = { class: "capmenu__field" }, fn = { class: "capmenu__fieldlabel" }, pn = { class: "capmenu__field" }, mn = { class: "capmenu__fieldlabel" }, hn = { class: "capmenu__field" }, gn = { class: "capmenu__fieldlabel" }, _n = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
		let n = e, r = t, i = d(), a = b(), { t: o } = s(), c = q(null), l = q(null), u = I(() => i.subtitleLang), f = I(() => n.tracks.some((e) => e.language === u.value)), p = I(() => f.value ? "captions" : "captions-off"), m = I(() => f.value ? n.tracks.findIndex((e) => e.language === u.value) + 1 : 0), h = I(() => n.activeAudio >= 0 ? n.activeAudio : 0);
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
		w(l, Ae(n, "open"), {
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
		}), (t, n) => (K(), z("div", {
			ref_key: "rootEl",
			ref: c,
			class: "capmenu"
		}, [B("button", {
			type: "button",
			class: W(["capmenu__btn", { "is-active": f.value }]),
			"aria-label": f.value ? X(o)("player.captionsOn") : X(o)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => g(!e.open)
		}, [H(S, { name: p.value }, null, 8, ["name"])], 10, Ht), e.open ? (K(), z("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(o)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			B("div", Wt, [B("h3", Gt, Y(X(o)("player.subtitles")), 1), H(C, {
				name: "x",
				label: X(o)("common.close"),
				size: "sm",
				onClick: _
			}, null, 8, ["label"])]),
			B("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(o)("player.subtitleTrack"),
				onKeydown: T
			}, [B("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !f.value,
				tabindex: m.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => v(null)
			}, [B("span", Jt, [f.value ? R("", !0) : (K(), L(S, {
				key: 0,
				name: "check"
			}))]), B("span", Yt, Y(X(o)("player.off")), 1)], 8, qt), (K(!0), z(F, null, J(e.tracks, (e, t) => (K(), z("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": u.value === e.language,
				tabindex: m.value === t + 1 ? 0 : -1,
				onClick: (t) => v(e.language)
			}, [B("span", Zt, [u.value === e.language ? (K(), L(S, {
				key: 0,
				name: "check"
			})) : R("", !0)]), B("span", Qt, Y(e.label), 1)], 8, Xt))), 128))], 40, Kt),
			B("button", {
				type: "button",
				class: "capmenu__add",
				onClick: ee
			}, [B("span", $t, [H(S, { name: "plus" })]), B("span", en, Y(X(o)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 0 ? (K(), z(F, { key: 0 }, [B("h3", tn, Y(X(o)("player.audio")), 1), B("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": X(o)("player.audioTrack"),
				onKeydown: te
			}, [(K(!0), z(F, null, J(e.audioTracks, (t) => (K(), z("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: h.value === t.index ? 0 : -1,
				onClick: (e) => y(t.index)
			}, [B("span", an, [e.activeAudio === t.index ? (K(), L(S, {
				key: 0,
				name: "check"
			})) : R("", !0)]), B("span", on, Y(t.label), 1)], 8, rn))), 128))], 40, nn)], 64)) : R("", !0),
			B("h3", sn, Y(X(o)("player.captionStyle")), 1),
			B("div", cn, [
				B("div", ln, [B("span", un, Y(X(o)("player.size")), 1), H(E, {
					"model-value": X(a).captionStyle.size,
					options: X(ne),
					label: X(o)("player.captionSize"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				B("div", dn, [B("span", fn, Y(X(o)("player.color")), 1), H(E, {
					"model-value": X(a).captionStyle.textColor,
					options: X(A),
					label: X(o)("player.captionColor"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				B("div", pn, [B("span", mn, Y(X(o)("player.background")), 1), H(E, {
					"model-value": X(a).captionStyle.background,
					options: X(N),
					label: X(o)("player.captionBackground"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				B("div", hn, [B("span", gn, Y(X(o)("player.edge")), 1), H(E, {
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
		], 8, Ut)) : R("", !0)], 512));
	}
}), [["__scopeId", "data-v-62fcc11d"]]), vn = { class: "subsearch" }, yn = { class: "subsearch__langs" }, bn = { class: "subsearch__legend" }, xn = { class: "subsearch__chips" }, Sn = { class: "subsearch__actions" }, Cn = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, wn = {
	key: 2,
	class: "subsearch__prompt"
}, Tn = {
	key: 3,
	class: "subsearch__list"
}, En = { class: "subsearch__meta" }, Dn = { class: "subsearch__release" }, On = { class: "subsearch__signals" }, kn = { class: "subsearch__provider" }, An = ["aria-label"], jn = {
	key: 2,
	class: "subsearch__stat"
}, Mn = {
	key: 3,
	class: "subsearch__stat"
}, Nn = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
	setup(t, { emit: r }) {
		let i = t, a = r, { t: o } = s(), c = ee(), l = [
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
		let d = I(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...i.preferredLangs, ...l]) {
				let r = (n || "").toLowerCase();
				r && !e.has(r) && (e.add(r), t.push(r));
			}
			return t;
		}), f = q(/* @__PURE__ */ new Set());
		function p() {
			let e = /* @__PURE__ */ new Set();
			for (let t of i.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), f.value = e;
		}
		function m(e) {
			let t = new Set(f.value);
			t.has(e) ? t.delete(e) : t.add(e), f.value = t;
		}
		let h = q(!1), g = q(!1), _ = q([]), v = q(/* @__PURE__ */ new Set()), y = q(/* @__PURE__ */ new Set());
		function b(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let x = I(() => [..._.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), C = I(() => f.value.size > 0 && !h.value);
		function w() {
			return i.client ?? new n({ baseUrl: i.apiBase ?? "" });
		}
		async function T() {
			if (C.value) {
				h.value = !0, g.value = !0;
				try {
					_.value = await w().searchSubtitles(i.mediaId, [...f.value]);
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
		function te(t) {
			if (t instanceof e) {
				if (t.status === 429) {
					let e = t.body && typeof t.body == "object" ? t.body : {}, n = typeof e.downloadsRemaining == "number" ? e.downloadsRemaining : null, r = typeof e.resetTimeUtc == "string" ? e.resetTimeUtc : null;
					r ? c.warning(o("player.subtitleQuotaReset", { time: D(r) })) : n === null ? c.warning(o("player.subtitleQuota")) : c.warning(o("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (t.status === 404) {
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
			let n = new Set(v.value);
			n.add(t), v.value = n;
			try {
				let n = Je([(await w().downloadSubtitle(i.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], r = new Set(y.value);
				r.add(t), y.value = r;
				let s = u(e.language);
				c.success(s ? o("player.subtitleAdded", { language: s }) : o("player.subtitleAddedGeneric")), n && a("added", n);
			} catch (e) {
				te(e);
			} finally {
				let e = new Set(v.value);
				e.delete(t), v.value = e;
			}
		}
		return Z(() => i.open, (e) => {
			e && (p(), _.value = [], g.value = !1, h.value = !1, v.value = /* @__PURE__ */ new Set(), y.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (e, n) => (K(), L(oe, {
			"model-value": t.open,
			title: X(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: Q(() => [H(se, {
				variant: "ghost",
				onClick: E
			}, {
				default: Q(() => [V(Y(X(o)("common.close")), 1)]),
				_: 1
			})]),
			default: Q(() => [B("div", vn, [
				B("fieldset", yn, [B("legend", bn, Y(X(o)("player.subtitleSearchLanguages")), 1), B("div", xn, [(K(!0), z(F, null, J(d.value, (e) => (K(), L(ce, {
					key: e,
					selected: f.value.has(e),
					size: "md",
					"aria-label": u(e),
					"onUpdate:selected": (t) => m(e)
				}, {
					default: Q(() => [V(Y(u(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				B("div", Sn, [H(se, {
					variant: "solid",
					"left-icon": "search",
					loading: h.value,
					disabled: !C.value,
					onClick: T
				}, {
					default: Q(() => [V(Y(X(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				h.value ? (K(), z("div", Cn, [H(le, { label: X(o)("player.subtitleSearching") }, null, 8, ["label"]), B("span", null, Y(X(o)("player.subtitleSearching")), 1)])) : g.value && x.value.length === 0 ? (K(), L(de, {
					key: 1,
					icon: "captions",
					title: X(o)("player.subtitleSearchEmpty"),
					description: X(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : g.value ? (K(), z("ul", Tn, [(K(!0), z(F, null, J(x.value, (e) => (K(), z("li", {
					key: b(e),
					class: "subsearch__item"
				}, [B("div", En, [B("p", Dn, Y(e.releaseName || e.provider), 1), B("div", On, [
					H(ue, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Q(() => [V(Y(u(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (K(), L(ue, {
						key: 0,
						tone: "info",
						size: "sm",
						label: X(o)("player.subtitleHearingImpairedFull")
					}, {
						default: Q(() => [V(Y(X(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : R("", !0),
					B("span", kn, Y(e.provider), 1),
					e.rating > 0 ? (K(), z("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": X(o)("player.subtitleRating", { rating: e.rating })
					}, [H(S, { name: "star" }), V(" " + Y(e.rating), 1)], 8, An)) : R("", !0),
					e.downloadCount > 0 ? (K(), z("span", jn, Y(X(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : R("", !0),
					e.fps ? (K(), z("span", Mn, Y(X(o)("player.subtitleFps", { fps: e.fps })), 1)) : R("", !0)
				])]), H(se, {
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
					default: Q(() => [V(Y(v.value.has(b(e)) ? X(o)("player.subtitleAdding") : X(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (K(), z("p", wn, Y(X(o)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), Pn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Fn(e, t, n, r, i, a, o) {
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
		r: Pn(d / m),
		g: Pn(f / m),
		b: Pn(p / m)
	};
}
function In(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Fn(e, t, n, 0, 0, r, n),
		right: Fn(e, t, n, t - r, 0, t, n),
		center: Fn(e, t, n, 0, 0, t, n)
	};
}
function Ln({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
var Rn = (e) => `${Math.round(e * 1e3) / 10}%`;
function zn(e, t = 1) {
	return Bn(e, t).map((e) => `radial-gradient(${Rn(e.rx)} ${Rn(e.ry)} at ${Rn(e.cx)} ${Rn(e.cy)}, ${Ln(e.color, e.alpha)}, transparent ${Rn(e.stop)})`).join(", ");
}
function Bn(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		{
			cx: .12,
			cy: .3,
			rx: .4,
			ry: .6,
			color: e.left,
			alpha: n(.55),
			stop: .7
		},
		{
			cx: .88,
			cy: .7,
			rx: .45,
			ry: .55,
			color: e.right,
			alpha: n(.5),
			stop: .7
		},
		{
			cx: .5,
			cy: .5,
			rx: .5,
			ry: .5,
			color: e.center,
			alpha: n(.3),
			stop: .75
		}
	];
}
function Vn(e, t) {
	e.clearRect(0, 0, 112, 72), e.filter = "blur(3px)";
	for (let n of t) {
		let t = 8 + n.cx * 96, r = 9 + n.cy * 54, i = n.rx * 96, a = n.ry * 54;
		e.save(), e.translate(t, r), e.scale(i, a);
		let o = e.createRadialGradient(0, 0, 0, 0, 0, 1), { r: s, g: c, b: l } = n.color;
		o.addColorStop(0, Ln(n.color, n.alpha)), o.addColorStop(n.stop, `rgba(${s}, ${c}, ${l}, 0)`), e.fillStyle = o, e.fillRect((8 - t) / i, (9 - r) / a, 96 / i, 54 / a), e.restore();
	}
}
function Hn(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var Un = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
			r.value = Hn(i);
		}
		let o = I(() => n.enabled && !n.reducedMotion && !r.value), s = I(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = q(null), l = q(null), u = null, d = null, f = !1;
		function p(e) {
			if (f || typeof document > "u") return null;
			try {
				if (!d && (u = document.createElement("canvas"), u.width = 112, u.height = 72, d = u.getContext("2d"), !d)) throw Error("no 2d context");
				Vn(d, Bn(e));
				let t = u?.toDataURL("image/png");
				if (typeof t != "string" || !t.startsWith("data:image/")) throw Error("no bitmap");
				return t;
			} catch {
				return f = !0, d = null, u = null, null;
			}
		}
		let m = null, h = null, g = !1, _ = !1;
		function v() {
			if (g) return h;
			if (_ || typeof document > "u") return _ = !0, null;
			m = document.createElement("canvas"), m.width = 32, m.height = 18;
			try {
				h = m.getContext("2d", { willReadFrequently: !0 });
			} catch {
				h = null;
			}
			return h ? (g = !0, h) : (_ = !0, null);
		}
		function y() {
			let e = n.video;
			if (!o.value || !e || !e.videoWidth || !e.videoHeight) return;
			let t = v();
			if (t) try {
				t.drawImage(e, 0, 0, 32, 18);
				let { data: n } = t.getImageData(0, 0, 32, 18), r = In(n, 32, 18), i = p(r);
				l.value = i, c.value = i ? null : zn(r);
			} catch {
				_ = !0, c.value = null, l.value = null;
			}
		}
		function b(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let ee = null, x = null, S = null, C = 0, w = !1;
		function T(e) {
			x = e, ee = e.requestVideoFrameCallback(E);
		}
		function E(e) {
			if (!w) return;
			e - C >= 250 && (C = e, y());
			let t = n.video;
			b(t) && T(t);
		}
		function te() {
			if (w || !o.value || !n.video) return;
			let e = n.video;
			b(e) ? (w = !0, C = 0, T(e)) : (y(), _ || (w = !0, S = setInterval(y, 250)));
		}
		function D() {
			w = !1, ee != null && x && x.cancelVideoFrameCallback(ee), ee = null, x = null, S != null && (clearInterval(S), S = null);
		}
		Z(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			D(), e && t && te();
		}, { immediate: !0 }), ke(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Oe(() => {
			D(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let O = I(() => {
			let e = { opacity: String(s.value) };
			return l.value ? e.backgroundImage = `url("${l.value}")` : c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: y }), (e, t) => (K(), z("div", {
			class: W(["player__ambient", {
				"is-active": o.value,
				"is-bitmap": o.value && !!l.value
			}]),
			style: De(o.value ? O.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-ba42f7c0"]]), Wn = ["aria-label"], Gn = { class: "resume__label" }, Kn = { class: "resume__time numeric" }, qn = { class: "resume__actions" }, Jn = /*#__PURE__*/ x(/* @__PURE__ */ U({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = s(), i = I(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (K(), z("div", {
			class: "resume",
			role: "region",
			"aria-label": X(r)("player.resumePlayback")
		}, [B("p", Gn, [
			V(Y(i.value[0]), 1),
			B("span", Kn, Y(X(ze)(e.seconds)), 1),
			V(Y(i.value[1]), 1)
		]), B("div", qn, [B("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [H(S, { name: "play" }), B("span", null, Y(X(r)("player.resume")), 1)]), B("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [H(S, { name: "rewind" }), B("span", null, Y(X(r)("player.startOver")), 1)])])], 8, Wn));
	}
}), [["__scopeId", "data-v-271c5209"]]), Yn = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Xn = /* @__PURE__ */ new Set([
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
function Zn(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Qn(...e) {
	return e.some((e) => Xn.has(Zn(e)));
}
function $n(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function er(e) {
	return e?.error?.code === 2;
}
var tr = 3e4;
function nr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && lr.get(t) === "hevc";
}
function rr(e) {
	let t = { forceTranscode: "1" };
	return nr(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function ir(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
function ar(e) {
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
var or = 2 * Math.PI * 15;
function sr(e, t, n = or) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var cr = /* @__PURE__ */ new Map([
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
]), lr = /* @__PURE__ */ new Map([
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
]), ur = /* @__PURE__ */ new Set(["h264"]), dr = /* @__PURE__ */ new Map([
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
function fr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = lr.get(t);
	return n === void 0 ? "transcode" : ur.has(n) ? "direct" : "probe";
}
function pr(e) {
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
var mr = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function hr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return mr.get(t) ?? "video/mp4";
}
function gr(e, t = "video/mp4") {
	let n = cr.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function _r(e, t = "video/mp4") {
	if (!e) return !0;
	let n = gr(e, t);
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
async function vr(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = lr.get(n), i = r === void 0 ? void 0 : dr.get(r);
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
async function yr(e, t, n = "") {
	if (Qn(...e)) return !0;
	let r = e.map((e) => Zn(e)).find((e) => Yn.includes(e)) ?? "";
	if (!Yn.includes(r)) return !1;
	let i = hr(r), a = fr(n);
	if (a === "transcode" || a === "probe" && !await vr(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await _r(e.codec, i)) return !0;
	}
	return !1;
}
// src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var br = ["aria-label"], xr = ["src"], Sr = { class: "upnext__body" }, Cr = { class: "upnext__eyebrow" }, wr = { class: "upnext__title" }, Tr = {
	key: 0,
	class: "upnext__cd numeric"
}, Er = { class: "upnext__actions" }, Dr = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Or = ["r"], kr = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Ar = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
		let { t: n } = s(), { imgSrc: r } = l(), i = e, a = t, o = I(() => i.posterUrl ?? i.media.poster_url ?? null), c = I(() => sr(i.remaining, i.total));
		return (t, i) => (K(), z("aside", {
			class: "upnext",
			role: "region",
			"aria-label": X(n)("player.upNext")
		}, [
			o.value ? (K(), z("img", {
				key: 0,
				class: "upnext__thumb",
				src: X(r)(o.value),
				alt: "",
				loading: "lazy"
			}, null, 8, xr)) : R("", !0),
			B("div", Sr, [
				B("p", Cr, Y(X(n)("player.upNext")), 1),
				B("h4", wr, Y(e.media.name), 1),
				e.counting ? (K(), z("p", Tr, Y(e.remaining > 0 ? X(n)("player.startsIn", { count: e.remaining }) : X(n)("player.startingNow")), 1)) : R("", !0),
				B("div", Er, [B("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [H(S, { name: "play" }), B("span", null, Y(X(n)("player.playNow")), 1)]), B("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, Y(X(n)("player.cancel")), 1)])
			]),
			e.counting ? (K(), z("svg", Dr, [B("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Or), B("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": X(or),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, kr)])) : R("", !0)
		], 8, br));
	}
}), [["__scopeId", "data-v-3fc667d0"]]), jr = {
	class: "transcode",
	role: "alert"
}, Mr = { class: "transcode__card" }, Nr = { class: "transcode__heading" }, Pr = { class: "transcode__body" }, Fr = /*#__PURE__*/ x(/* @__PURE__ */ U({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = s();
		return (t, i) => (K(), z("div", jr, [B("div", Mr, [
			H(S, {
				name: "alert",
				class: "transcode__icon"
			}),
			B("h3", Nr, Y(X(r)("player.transcodeHeading")), 1),
			B("p", Pr, Y(e.title ? X(r)("player.transcodeBodyTitled", { title: e.title }) : X(r)("player.transcodeBodyUntitled")), 1),
			B("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [H(S, { name: "arrow-left" }), B("span", null, Y(X(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Ir = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Lr = { class: "prep__card" }, Rr = { class: "prep__heading" }, zr = { class: "prep__body" }, Br = ["aria-valuenow"], Vr = /*#__PURE__*/ x(/* @__PURE__ */ U({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = s(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (K(), z("div", Ir, [B("div", Lr, [
			H(S, {
				name: "spinner",
				class: "prep__spinner"
			}),
			B("h3", Rr, Y(X(n)("player.transcodePreparingHeading")), 1),
			B("p", zr, Y(e.title ? X(n)("player.transcodePreparingTitled", { title: e.title }) : X(n)("player.transcodePreparingUntitled")), 1),
			B("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [B("div", {
				class: "prep__bar-fill",
				style: De({ width: r() + "%" })
			}, null, 4)], 8, Br),
			B("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [H(S, { name: "arrow-left" }), B("span", null, Y(X(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Hr = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
		let o = I(() => a(n.position, n.introMarker) ? {
			label: i("player.skipIntro"),
			target: n.introMarker.end
		} : a(n.position, n.outroMarker) ? {
			label: i("player.skipOutro"),
			target: n.outroMarker.end
		} : null);
		function c() {
			o.value && r("skip", o.value.target);
		}
		return (e, t) => (K(), L(Ce, { name: "skip" }, {
			default: Q(() => [o.value ? (K(), z("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Me(c, ["stop"])
			}, [B("span", null, Y(o.value.label), 1), H(S, { name: "skip-forward" })])) : R("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Ur = ["aria-label"], Wr = ["aria-label", "onClick"], Gr = { class: "skip-controls__label" }, Kr = 5, qr = 30, Jr = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
			let n = a(e.startMs), r = n - Kr, i = n + qr;
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
		let d = I(() => !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => l.includes(e.type) && c(e, n.position)).sort((e, t) => e.startMs - t.startMs));
		function f(e) {
			r("skip", a(e.startMs));
		}
		return (e, t) => d.value.length > 0 ? (K(), z("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": X(i)("player.skipControls")
		}, [(K(!0), z(F, null, J(d.value, (e) => (K(), z("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${u(e.type)}`,
			onClick: Me((t) => f(e), ["stop"])
		}, [B("span", Gr, Y(u(e.type)), 1), H(S, { name: "skip-forward" })], 8, Wr))), 128))], 8, Ur)) : R("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Yr = ["aria-label", "aria-expanded"], Xr = ["aria-label"], Zr = { class: "chapterlist__head" }, Qr = { class: "chapterlist__title" }, $r = ["aria-label"], ei = ["onClick"], ti = { class: "chapterlist__index" }, ni = { class: "chapterlist__name" }, ri = { class: "chapterlist__meta" }, ii = { class: "chapterlist__time" }, ai = {
	key: 0,
	class: "chapterlist__duration"
}, oi = {
	key: 1,
	class: "chapterlist__empty"
}, si = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
		let c = I(() => n.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = ze(e.start), a;
			return e.end != null && e.end > e.start && (a = ze(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), l = q(null), u = q(null);
		w(u, Ae(n, "open"), {
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
		return (t, n) => (K(), z("div", {
			ref_key: "rootEl",
			ref: l,
			class: "chapterlist"
		}, [B("button", {
			type: "button",
			class: W(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": X(i)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: o
		}, [H(S, { name: "list" })], 10, Yr), e.open ? (K(), z("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": X(i)("player.chapterList"),
			tabindex: "-1"
		}, [B("div", Zr, [B("h3", Qr, Y(X(i)("player.chapters")), 1), H(C, {
			name: "x",
			label: X(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), c.value.length > 0 ? (K(), z("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": X(i)("player.chapterList")
		}, [(K(!0), z(F, null, J(c.value, (e) => (K(), z("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [B("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => f(e.chapter)
		}, [
			B("span", ti, Y(e.index), 1),
			B("span", ni, Y(e.label), 1),
			B("span", ri, [B("span", ii, Y(e.startLabel), 1), e.durationLabel ? (K(), z("span", ai, "· " + Y(e.durationLabel), 1)) : R("", !0)])
		], 8, ei)]))), 128))], 8, $r)) : (K(), z("p", oi, Y(X(i)("player.noChapters")), 1))], 8, Xr)) : R("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ci = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, li = { class: "marker-timeline__ticks" }, ui = [
	"title",
	"aria-label",
	"onClick"
], di = { class: "marker-timeline__tooltip" }, fi = { class: "marker-timeline__tooltip-label" }, pi = { class: "marker-timeline__tooltip-time numeric" }, mi = ["onClick"], hi = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
		return (e, t) => s.value.length > 0 ? (K(), z("div", {
			key: 0,
			class: W(["marker-timeline", { "is-ad-active": l.value }]),
			"aria-label": "Marker timeline"
		}, [l.value ? (K(), z("div", ci, [t[0] ||= B("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [B("polygon", { points: "5,3 19,12 5,21" })], -1), V(" " + Y(u.value), 1)])) : R("", !0), B("div", li, [(K(!0), z(F, null, J(s.value, (e) => (K(), z("button", {
			key: e.id,
			type: "button",
			class: W(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: De({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${X(ze)(e.startSec)}`,
			"aria-label": `${e.label} at ${X(ze)(e.startSec)}`,
			onClick: Me((t) => d(e), ["stop"])
		}, [B("span", di, [
			B("span", fi, Y(e.label), 1),
			B("span", pi, Y(X(ze)(e.startSec)), 1),
			B("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Me((t) => f(e), ["stop"])
			}, " Find similar ", 8, mi)
		])], 14, ui))), 128))])], 2)) : R("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), gi = ["aria-label", "aria-expanded"], _i = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, vi = ["aria-label"], yi = ["aria-selected", "onClick"], bi = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
		], a = q(0), o = q(0), c = I(() => o.value > 0), l;
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
		let m = q(!1);
		function h() {
			c.value ? (f(0), m.value = !1) : m.value = !m.value;
		}
		function g(e) {
			f(e), m.value = !1;
		}
		return Oe(() => {
			u();
		}), t({ toggleOpen: h }), (e, t) => (K(), z("div", { class: W(["sleep-timer", { "is-active": c.value }]) }, [B("button", {
			type: "button",
			class: W(["sleep-timer__trigger", { "is-active": c.value }]),
			"aria-label": c.value ? `Sleep timer: ${p(o.value)} remaining` : X(r)("player.sleepTimer"),
			"aria-expanded": m.value,
			"aria-haspopup": "listbox",
			onClick: h
		}, [H(S, { name: "moon" }), c.value ? (K(), z("span", _i, Y(p(o.value)), 1)) : R("", !0)], 10, gi), H(Ce, { name: "dropdown" }, {
			default: Q(() => [m.value ? (K(), z("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": X(r)("player.sleepTimer")
			}, [(K(), z(F, null, J(i, (e) => B("li", {
				key: e.value,
				class: W(["sleep-timer__option", { "is-selected": a.value === e.value }]),
				role: "option",
				"aria-selected": a.value === e.value,
				onClick: (t) => g(e.value)
			}, Y(e.label), 11, yi)), 64))], 8, vi)) : R("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), xi = {
	key: 0,
	class: "syncplay-overlay"
}, Si = { class: "syncplay-overlay__badge" }, Ci = { class: "syncplay-overlay__label" }, wi = { class: "syncplay-overlay__status-label" }, Ti = { class: "syncplay-overlay__members" }, Ei = { class: "syncplay-overlay__member-count" }, Di = { class: "syncplay-overlay__member-list" }, Oi = { class: "syncplay-overlay__member-name" }, ki = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Ai = /*#__PURE__*/ x(/* @__PURE__ */ U({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let t = e, { t: n } = s(), r = fe(), i = a(), o = I(() => t.apiBase ?? i.value), c = I(() => r.currentRoom?.name ?? "SyncPlay"), l = I(() => r.onlineMembers.length), u = I(() => r.syncStatus), d = I(() => {
			switch (u.value) {
				case "synced": return n("syncplay.synced");
				case "outOfSync": return n("syncplay.outOfSync");
				case "re-syncing": return n("syncplay.reSyncing");
				default: return n("syncplay.synced");
			}
		}), f = I(() => {
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
		return (e, t) => X(r).isInRoom ? (K(), z("div", xi, [
			B("div", Si, [H(S, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), B("span", Ci, "SyncPlay: " + Y(c.value), 1)]),
			B("div", { class: W(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [H(S, {
				name: f.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), B("span", wi, Y(d.value), 1)], 2),
			B("div", Ti, [B("span", Ei, [H(S, { name: "user" }), V(" " + Y(X(n)("syncplay.members", { count: l.value })), 1)]), B("ul", Di, [(K(!0), z(F, null, J(X(r).onlineMembers.slice(0, 5), (e) => (K(), z("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= B("span", { class: "syncplay-overlay__member-dot" }, null, -1), B("span", Oi, Y(e.name), 1)]))), 128)), X(r).onlineMembers.length > 5 ? (K(), z("li", ki, " +" + Y(X(r).onlineMembers.length - 5) + " more ", 1)) : R("", !0)])]),
			H(se, {
				variant: "ghost",
				size: "sm",
				onClick: p
			}, {
				default: Q(() => [V(Y(X(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : R("", !0);
	}
}), [["__scopeId", "data-v-2dfa4284"]]), ji = {
	key: 0,
	class: "syncplay-controls"
}, Mi = ["aria-label"], Ni = { class: "syncplay-controls__wait-label" }, Pi = { class: "syncplay-controls__transport" }, Fi = ["aria-label"], Ii = ["aria-label"], Li = ["aria-label"], Ri = { class: "syncplay-controls__status-label" }, zi = 10, Bi = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
		let n = e, r = t, { t: o } = s(), c = fe(), l = ee(), u = we("phlixConfig", null), d = a(), f = I(() => n.apiBase ?? d.value);
		pe((e) => {
			l.error(i(e, u?.locale, o("syncplay.commandRejected")));
		}), G(() => pe(null));
		let p = q(!1), m = I(() => p.value || c.syncStatus === "re-syncing");
		async function h() {
			if (c.isInRoom) try {
				await c.sendCommand(f.value, "play"), r("play");
			} catch {
				l.error(o("syncplay.commandFailed"));
			}
		}
		async function g() {
			if (c.isInRoom) try {
				await c.sendCommand(f.value, "pause"), r("pause");
			} catch {
				l.error(o("syncplay.commandFailed"));
			}
		}
		async function _() {
			n.isPlaying ? await g() : await h();
		}
		async function v(e) {
			if (c.isInRoom) try {
				await c.sendCommand(f.value, "seek", { position: e }), r("seek", e);
			} catch {
				l.error(o("syncplay.commandFailed"));
			}
		}
		async function y() {
			await v(Math.max(0, n.position - zi));
		}
		async function b() {
			await v(Math.min(n.duration, n.position + zi));
		}
		return Z(() => c.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => X(c).isInRoom ? (K(), z("div", ji, [
			m.value ? (K(), z("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": X(o)("syncplay.waitingForMembers")
			}, [H(S, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), B("span", Ni, Y(X(o)("syncplay.waitingForMembers")), 1)], 8, Mi)) : R("", !0),
			B("div", Pi, [
				B("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(o)("syncplay.rewind"),
					onClick: y
				}, [H(S, { name: "rewind" })], 8, Fi),
				B("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? X(o)("syncplay.pauseAll") : X(o)("syncplay.playAll"),
					onClick: _
				}, [H(S, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Ii),
				B("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": X(o)("syncplay.fastForward"),
					onClick: b
				}, [H(S, { name: "forward" })], 8, Li)
			]),
			B("div", { class: W(["syncplay-controls__status", `syncplay-controls__status--${X(c).syncStatus}`]) }, [H(S, {
				name: X(c).syncStatus === "synced" ? "check" : X(c).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), B("span", Ri, Y(X(c).syncStatus === "synced" ? X(o)("syncplay.synced") : X(c).syncStatus === "outOfSync" ? X(o)("syncplay.outOfSync") : X(o)("syncplay.reSyncing")), 1)], 2)
		])) : R("", !0);
	}
}), [["__scopeId", "data-v-276195ff"]]);
// src/utils/subtitleSrc.ts
function Vi(e, t) {
	return String(c(e, t));
}
function Hi(e, t) {
	let n = !1, r = t.map((t) => {
		let r = Vi(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
// src/components/Player.vue?vue&type=script&setup=true&lang.ts
var Ui = { class: "player__stage" }, Wi = ["src", "poster"], Gi = [
	"src",
	"srclang",
	"label"
], Ki = {
	key: 0,
	class: "player__buffering"
}, qi = {
	class: "player__buffering-text",
	"aria-hidden": "true"
}, Ji = { class: "player__meta" }, Yi = ["aria-label"], Xi = { class: "player__meta-text" }, Zi = { class: "player__eyebrow" }, Qi = { class: "player__title" }, $i = { class: "player__sub numeric" }, ea = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, ta = {
	key: 1,
	class: "player__center"
}, na = ["aria-label"], ra = ["aria-label"], ia = ["aria-label"], aa = { class: "player__btnrow" }, oa = ["aria-label"], sa = ["aria-label"], ca = ["aria-label"], la = { class: "player__time numeric" }, ua = ["aria-label", "aria-pressed"], da = ["title"], fa = ["aria-label"], pa = ["aria-label"], ma = ["aria-label", "aria-pressed"], ha = ["aria-label", "aria-pressed"], ga = ["aria-label"], _a = { class: "similar-modal" }, va = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, ya = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, ba = { class: "similar-modal__state-title" }, xa = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, Sa = {
	key: 3,
	class: "similar-modal__results"
}, Ca = { class: "similar-modal__poster" }, wa = ["src", "alt"], Ta = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Ea = { class: "similar-modal__result-body" }, Da = { class: "similar-modal__result-title" }, Oa = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, ka = { key: 0 }, Aa = /*#__PURE__*/ x(/* @__PURE__ */ U({
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
		let { imgSrc: r } = l(), i = e, o = t, c = d(), u = b(), { t: h } = s(), g = fe(), _ = f(), v = I(() => _.isFavorite(i.media.id)), y = I(() => _.likeLevel(i.media.id));
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
		], T = q(null), E = q(null), D = q(null), O = q(!0), k = q(!1), ne = q(!1), A = q(!1), ie = q(!1), M = q(!1), N = q(!1), se = q(!1), ce = q(!1), ue = q(null), de = q(null), pe = q(!1), he = ee(), ge = q(!1);
		function _e(e) {
			he.success(h("syncplay.joinedRoom", { name: e.name }));
		}
		let ve = I(() => M.value ? 1.35 : 1), P = q(Qn(i.streamUrl, i.media.path)), ye = I(() => pr(i.media.streams)), be = 0;
		async function xe() {
			let e = ++be;
			if (P.value) return;
			let t = await yr([i.streamUrl, i.media.path], i.playbackAudioTracks ?? [], ye.value);
			e === be && t && !P.value && (P.value = !0, Be(T.value?.currentTime ?? 0));
		}
		Z([() => i.playbackAudioTracks, ye], () => {
			xe();
		}, { immediate: !0 });
		let Se = we("phlixConfig", null), Ce = a(), U = we("resumeReporter", null), Te = !1;
		function De() {
			return Ce.value;
		}
		let G = ut({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: Se?.playerHlsConfig
		}), Ae = _t({ apiBase: () => i.apiBase ?? "" }), je = null;
		function Ne(e) {
			je !== null && clearTimeout(je), je = setTimeout(() => {
				je = null, Ae.fetch(e);
			}, 0);
		}
		let Pe = I(() => i.thumbnailAt ?? Ae.thumbnailAt), Fe = I(() => P.value ? void 0 : i.streamUrl), Ie = I(() => P.value && G.state.value !== "ready"), Le = I(() => P.value && (G.state.value === "preparing" || G.state.value === "idle")), Re = I(() => P.value && G.state.value === "error");
		function Be(e = 0) {
			let t = T.value, n = navigator.connection?.downlinkMax, r = nt(n);
			t && G.start(t, i.media.id, r, e);
		}
		function Ve(e) {
			c.quality === "original" && e !== "auto" ? G.loadVariantPlaylist(jt) : typeof e == "string" && e !== "auto" ? G.loadVariantPlaylist(e) : G.setLevel(e);
		}
		let He = !1;
		function Ue() {
			u.defaultQuality = At;
		}
		function Ge() {
			let e = G.levels.value;
			if (e.length === 0) return !1;
			let t = u.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = G.variants.value;
				if (!t || t.length === 0) return !1;
				if (Rt(e, t)) G.loadVariantPlaylist(jt);
				else {
					let t = Lt(e);
					t >= 0 && G.setNextLevel(t), Ue();
				}
				return !0;
			}
			let n = Ft(e, t);
			return n >= 0 ? G.setNextLevel(n) : Ue(), !0;
		}
		Z(() => G.levels.value, (e) => {
			He || e.length === 0 || Ge() && (He = !0);
		}), Z(() => G.variants.value, (e) => {
			!He && e?.length && Ee(() => {
				He || Ge() && (He = !0);
			});
		}, { deep: !0 });
		let $ = q(c.resumePositionFor(i.media.id) ?? 0), Ke = q(!P.value && $.value > 0), qe = null, Je = q(!1), Ye = q(8), Xe, Ze = q(null), Qe = q(0), $e = q(!1), et = q([]), tt = q(!1), rt = q(null);
		function it(e, t) {
			Ze.value = e, Qe.value = t, et.value = [], rt.value = null, $e.value = !0, lt(e, t);
		}
		let at = null, ot = null, st = null;
		function ct() {
			let e = i.apiBase ?? "";
			return (ot === null || st !== e) && (ot = new n({ baseUrl: e }), st = e), ot;
		}
		async function lt(e, t) {
			at?.abort(), at = new AbortController(), tt.value = !0, rt.value = null;
			try {
				let n = await ct().searchByMarker(e, t, 30, 20, at.signal);
				et.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				rt.value = "Couldn’t load similar titles. Please try again.", et.value = [];
			} finally {
				tt.value = !1;
			}
		}
		function dt() {
			at?.abort(), $e.value = !1, et.value = [], rt.value = null, Ze.value = null;
		}
		let ft = I(() => c.upNext);
		function pt() {
			P.value = Qn(i.streamUrl, i.media.path), xe(), $.value = c.resumePositionFor(i.media.id) ?? 0, Ke.value = !P.value && $.value > 0, qe = null, bn = !1, sn = !1, rn.value = [], nn.value = !1, cn = !1, Jt.value = -1, mn = null, He = !1, Te = !1, It(), wt = !1, Mt = 0, Dt = 0, vt(), Je.value = !1, G.reset(), T.value && (T.value.currentTime = 0), P.value && Be(), Ne(i.media.id);
		}
		function mt(e) {
			let t = T.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : qe = Math.max(0, e));
		}
		function ht() {
			mt($.value), Ke.value = !1, T.value?.play()?.catch(() => {});
		}
		function gt() {
			qe = null, mt(0), c.clearResume(i.media.id), Ke.value = !1, T.value?.play()?.catch(() => {});
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
			Te || (Te = !0, U?.finish()), ur(), O.value = !0, c.upNext && (Je.value = !0, u.autoplay && yt());
		}
		function xt() {
			vt(), Je.value = !1;
			let e = c.next(i.streamUrlFor);
			e && o("play-next", e);
		}
		function St() {
			vt(), Je.value = !1;
		}
		function Ct() {
			if (P.value) return;
			let e = T.value, t = er(e) && (e?.currentTime ?? 0) === 0;
			($n(e) || t) && (Nt(), It(), P.value = !0, Be(e?.currentTime ?? 0));
		}
		let wt = !1, Tt = null, Dt = 0, Mt = 0;
		function Nt() {
			if (wt) return;
			wt = !0;
			let e = i.media?.id;
			e != null && e !== "" && ct().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, rr({ videoCodec: ye.value })).catch(() => {});
		}
		function Pt() {
			if (Tt !== null || wt || P.value) return;
			let e = T.value;
			e && (Dt = Date.now(), Mt = e.currentTime, Tt = setTimeout(() => {
				Tt = null;
				let e = T.value;
				e && !P.value && ir(Date.now(), Dt, e.currentTime, Mt) && (Nt(), P.value = !0, Be(e.currentTime));
			}, tr));
		}
		function It() {
			Tt !== null && (clearTimeout(Tt), Tt = null);
		}
		let zt = q([]), Ht = q([]), Ut = q(-1), Wt = q(!1), Gt = I(() => G.state.value === "ready" && G.audioTracks.value.length > 0), Kt = I(() => G.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), qt = I(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Jt = q(-1), Yt = I(() => !Gt.value && !P.value && Ht.value.length === 0 && qt.value.length > 1), Xt = I(() => Ht.value.length > 0 ? !1 : G.state.value === "ready" ? !Gt.value && G.hasAudio.value : !P.value && !Yt.value && qt.value.length === 1), Zt = I(() => Gt.value ? Kt.value : Yt.value ? qt.value : Ht.value.length > 0 ? Ht.value : Xt.value ? [{
			index: 0,
			language: "",
			label: h("player.audioOriginal"),
			kind: "audio"
		}] : Ht.value), Qt = I(() => {
			if (Gt.value) return G.currentAudioTrack.value;
			if (Yt.value) {
				if (Jt.value >= 0) return Jt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Ht.value.length === 0 && Xt.value ? 0 : Ut.value;
		}), $t = q(!1), en = c.subtitleLang, tn = I(() => {
			let e = i.apiBase ?? "", t = P.value ? G.subtitleTracks.value : Hi(e, i.playbackSubtitleTracks ?? []);
			if (rn.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Hi(e, rn.value), a = new Set(t.map(n)), o = r.filter((e) => !a.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), nn = q(!1), rn = q([]), an = I(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(u.defaultSubtitleLang), t(u.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function on(e) {
			rn.value.some((t) => t.url === e.url) || (rn.value = [...rn.value, e]);
		}
		let sn = !1, cn = !1;
		function ln() {
			if (sn) return;
			if (u.subtitlePreferenceSet) {
				sn = !0;
				return;
			}
			let e = tn.value.find((e) => e.default);
			if (!e) return;
			let t = zt.value.find((t) => t.language === (e.language || e.label));
			t && (c.setSubtitle(t.language), en = t.language, sn = !0);
		}
		function un() {
			if (cn) return;
			let e = u.defaultAudioLang;
			if (!e) return;
			let t = Zt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Qt.value;
			r >= 0 && r < t.length || (hn(n), cn = !0);
		}
		let dn = I(() => zt.value.some((e) => e.language === c.subtitleLang));
		function fn() {
			let e = T.value;
			zt.value = ae(e), Ht.value = re(e), Ut.value = te(e), ln(), un();
		}
		function pn() {
			if (dn.value) en = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = en && zt.value.some((e) => e.language === en) ? en : zt.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			o("captions");
		}
		let mn = null;
		function hn(e) {
			if (!Xt.value) {
				if (Gt.value) G.setAudioTrack(e);
				else if (Yt.value) {
					if (e === Qt.value) return;
					Jt.value = e, mn = e, P.value = !0, Be(T.value?.currentTime ?? 0);
				} else j(T.value, e), Ut.value = e;
			}
		}
		Z(Gt, (e) => {
			if (!e || mn === null) return;
			let t = mn;
			mn = null, t >= 0 && t < G.audioTracks.value.length && G.setAudioTrack(t);
		}), Z(tn, () => {
			Ee(() => fn());
		}, { deep: !0 });
		let gn = null, vn, yn = I(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), bn = !1;
		function xn() {
			if (!i.autoplay || bn || Ke.value || Ie.value) return;
			let e = T.value;
			if (!e || !e.paused) return;
			bn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (c.muteForAutoplay(), e.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Sn() {
			xn();
		}
		function Cn() {
			i.prevEpisode && o("play-episode", i.prevEpisode);
		}
		function wn() {
			i.nextEpisode && o("play-episode", i.nextEpisode);
		}
		function Tn() {
			let e = T.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function En(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Dn() {
			c.play(), c.setMediaPositionState(), Pt();
		}
		function On() {
			c.pause(), c.setMediaPositionState(), k.value = !1;
		}
		function kn() {
			k.value = !0, ur(), O.value = !0;
		}
		function An() {
			k.value = !1, fr();
		}
		function jn() {
			let e = T.value;
			e && (Tt !== null && e.currentTime > Mt && It(), c.updateProgress(e.currentTime, e.duration, En(e)), g.isInRoom && g.updateLocalPosition(e.currentTime));
		}
		function Mn() {
			let e = T.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, qe !== null && (e.currentTime = e.duration ? Math.min(e.duration, qe) : qe, qe = null), c.updateProgress(e.currentTime, e.duration, En(e)), c.setMediaPositionState(), fn());
		}
		function Pn() {
			let e = T.value;
			e && c.updateProgress(e.currentTime, e.duration, En(e));
		}
		function Fn() {
			let e = T.value;
			e && (Math.abs(e.volume - c.volume) > .001 && c.setVolume(e.volume), e.muted !== c.muted && c.toggleMute());
		}
		function In() {
			let e = T.value;
			e && e.playbackRate !== c.rate && c.setRate(e.playbackRate), c.setMediaPositionState();
		}
		function Ln() {
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
		function Hn() {
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
		function Kn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && zn(t.startMs / 1e3);
		}
		function qn() {
			ue.value?.toggleOpen();
		}
		let Yn = null;
		function Xn() {
			let e = T.value;
			if (!e) {
				c.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), c.pause();
				return;
			}
			Yn !== null && (clearInterval(Yn), Yn = null);
			let t = .05;
			Yn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(Yn), Yn = null, e.volume = 0, e.pause(), c.pause());
			}, 50);
		}
		m({
			playPause: Tn,
			seekBy: Bn,
			frameStep: (e) => {
				c.playing || zn(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: Zn,
			toggleFullscreen: ar,
			toggleCaptions: pn,
			toggleTheater: nr,
			togglePip: sr,
			skipIntro: Gn,
			skipOutro: Kn,
			sleepTimer: qn,
			seekToPercent: (e) => zn(e * c.duration),
			speedStep: Wn,
			toggleHelp: () => {
				ie.value = !ie.value;
			},
			toggleQuality: () => {
				P.value ? (pe.value = !pe.value, de.value?.toggleMenu?.()) : he.show({
					message: h("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !ie.value && !Wt.value && !$t.value && !ge.value && !nn.value && !$e.value });
		function Zn() {
			c.toggleMute();
		}
		function nr() {
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
			e && (e.type === "seekTo" ? mt(e.value) : e.type === "seekBy" && mt(c.position + e.value));
		});
		function ar() {
			if (typeof document > "u") return;
			if (!ce.value) {
				nr();
				return;
			}
			let e = E.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function or() {
			ne.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function sr() {
			let e = T.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function cr() {
			N.value = !0;
		}
		function lr() {
			N.value = !1;
		}
		function ur() {
			vn &&= (clearTimeout(vn), void 0);
		}
		function dr() {
			ur(), !c.playing || A.value || k.value || (vn = setTimeout(() => {
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
			e ? (Ke.value = !1, St(), dr()) : (ur(), k.value = !1, O.value = !0);
		});
		let vr = null;
		ke(() => {
			c.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), _.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", or), se.value = document.pictureInPictureEnabled === !0, ce.value = document.fullscreenEnabled === !0), vr = c.bindMediaSession({
				onPlay: () => void T.value?.play()?.catch(() => {}),
				onPause: () => T.value?.pause(),
				onSeek: (e) => zn(e)
			}), gn = T.value?.textTracks ?? null, gn?.addEventListener?.("addtrack", fn), gn?.addEventListener?.("removetrack", fn), fn(), P.value && Be(), Ne(i.media.id);
		}), Z(() => i.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), pt();
		}), Z(() => i.media?.id, () => {
			_.hydrate(i.media);
		}), Z(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (T.value?.play()?.catch(() => {}), c.play()) : e.state === "paused" && (T.value?.pause(), c.pause()), g.updateLocalPosition(c.position), Math.abs(g.driftAmount) > 2 && mt(e.playbackPosition));
		});
		let br = null;
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
				}), T.value?.play()?.catch(() => {}), c.play(), g.consumePendingPlayMedia(), br = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			br !== n && (br = n, o("pending-media", e.mediaId, e.title));
		}), Oe(() => {
			U?.reportFinal?.(), ur(), vt(), G.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", or), vr?.(), gn?.removeEventListener?.("addtrack", fn), gn?.removeEventListener?.("removetrack", fn), Yn !== null && (clearInterval(Yn), Yn = null), je !== null && (clearTimeout(je), je = null), It();
		}), (t, n) => (K(), z("div", {
			ref_key: "containerRef",
			ref: E,
			class: W(["player", {
				"is-chrome-hidden": !O.value,
				"is-theater": M.value
			}]),
			onPointermove: fr,
			onPointerdown: fr,
			onFocusin: fr
		}, [H(Un, {
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
		]), B("div", Ui, [
			B("video", {
				ref_key: "videoRef",
				ref: T,
				class: "player__video",
				src: Fe.value,
				poster: X(r)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Dn,
				onPause: On,
				onTimeupdate: jn,
				onLoadedmetadata: Mn,
				onCanplay: Sn,
				onWaiting: kn,
				onStalled: kn,
				onPlaying: An,
				onProgress: Pn,
				onVolumechange: Fn,
				onRatechange: In,
				onSeeked: Ln,
				onDurationchange: Rn,
				onEnded: bt,
				onError: Ct,
				onEnterpictureinpicture: cr,
				onLeavepictureinpicture: lr,
				onClick: Tn
			}, [(K(!0), z(F, null, J(tn.value, (e) => (K(), z("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Gi))), 128))], 40, Wi),
			n[22] ||= B("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[23] ||= B("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			k.value ? (K(), z("div", Ki, [H(le, {
				size: 38,
				label: X(h)("player.buffering")
			}, null, 8, ["label"]), B("span", qi, Y(X(h)("player.buffering")), 1)])) : R("", !0),
			B("div", Ji, [B("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": X(h)("player.back"),
				onClick: n[0] ||= Me((e) => o("back"), ["stop"])
			}, [H(S, { name: "arrow-left" })], 8, Yi), B("div", Xi, [
				B("p", Zi, Y(X(h)("player.nowPlaying")), 1),
				B("h2", Qi, Y(e.media.name), 1),
				B("div", $i, [(K(!0), z(F, null, J(yn.value, (e, t) => (K(), z(F, { key: t }, [t > 0 && !e.cert ? (K(), z("span", ea, "·")) : R("", !0), B("span", { class: W({ player__cert: e.cert }) }, Y(e.text), 3)], 64))), 128))])
			])]),
			Ie.value ? R("", !0) : (K(), z("div", ta, [
				O.value ? (K(), z("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(h)("player.seekBackward"),
					onClick: n[1] ||= Me((e) => Bn(-10), ["stop"])
				}, [H(S, { name: "rewind" }), B("span", { class: "player__center-skip-count" }, Y(10))], 8, na)) : R("", !0),
				B("button", {
					type: "button",
					class: W(["player__bigplay", { "is-playing": X(c).playing }]),
					"aria-label": X(c).playing ? X(h)("player.pause") : X(h)("player.play"),
					onClick: Me(Tn, ["stop"])
				}, [H(S, { name: X(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, ra),
				O.value ? (K(), z("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": X(h)("player.seekForward"),
					onClick: n[2] ||= Me((e) => Bn(10), ["stop"])
				}, [H(S, { name: "forward" }), B("span", { class: "player__center-skip-count" }, Y(10))], 8, ia)) : R("", !0)
			])),
			H(Vt, {
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
			Ie.value ? R("", !0) : (K(), z("div", {
				key: 2,
				ref_key: "controlsRef",
				ref: D,
				class: "player__controls",
				onClick: n[9] ||= Me(() => {}, ["stop"])
			}, [
				H(We, {
					position: X(c).position,
					duration: X(c).duration,
					buffered: X(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": Pe.value,
					onSeek: zn,
					onScrubStart: Vn,
					onScrubEnd: Hn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				X(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (K(), L(hi, {
					key: 0,
					position: X(c).position,
					duration: X(c).duration,
					markers: e.markers,
					onSeek: zn,
					onSimilar: it
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : R("", !0),
				B("div", aa, [
					e.prevEpisode ? (K(), z("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(h)("player.previousEpisode"),
						onClick: Cn
					}, [H(S, { name: "skip-back" })], 8, oa)) : R("", !0),
					B("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": X(c).playing ? X(h)("player.pause") : X(h)("player.play"),
						onClick: Tn
					}, [H(S, { name: X(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, sa),
					e.nextEpisode ? (K(), z("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(h)("player.nextEpisode"),
						onClick: wn
					}, [H(S, { name: "skip-forward" })], 8, ca)) : R("", !0),
					B("span", la, [
						V(Y(X(ze)(X(c).position)), 1),
						n[18] ||= B("span", { class: "player__sep" }, " / ", -1),
						V(Y(X(ze)(X(c).duration)), 1)
					]),
					n[19] ||= B("span", { class: "player__grow" }, null, -1),
					B("button", {
						type: "button",
						class: W(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? X(h)("itemActions.removeFavorite") : X(h)("itemActions.addFavorite"),
						"aria-pressed": v.value ? "true" : "false",
						onClick: x
					}, [H(S, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ua),
					H(p, {
						level: y.value,
						onCycle: C
					}, null, 8, ["level"]),
					H(Ot),
					H(kt),
					H(Bt, {
						ref_key: "qualityMenuRef",
						ref: de,
						open: pe.value,
						"onUpdate:open": n[3] ||= (e) => pe.value = e,
						levels: X(G).levels.value,
						variants: X(G).variants.value,
						"current-level": X(G).currentLevel.value,
						"auto-enabled": X(G).autoEnabled.value,
						"active-height": X(G).activeLevelHeight.value,
						onSelect: Ve
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					P.value ? R("", !0) : (K(), z("span", {
						key: 2,
						class: "player__direct-badge",
						title: X(h)("player.qualityDirectStream")
					}, Y(X(h)("player.directStream")), 9, da)),
					H(_n, {
						open: Wt.value,
						"onUpdate:open": n[4] ||= (e) => Wt.value = e,
						tracks: zt.value,
						"audio-tracks": Zt.value,
						"active-audio": Qt.value,
						onSelectAudio: hn,
						onAddSubtitles: n[5] ||= (e) => nn.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					H(si, {
						open: $t.value,
						"onUpdate:open": n[6] ||= (e) => $t.value = e,
						chapters: e.chapters ?? [],
						onSeek: zn
					}, null, 8, ["open", "chapters"]),
					H(bi, {
						ref_key: "sleepTimerRef",
						ref: ue,
						"on-expire": Xn
					}, null, 512),
					B("button", {
						type: "button",
						class: W(["player__iconbtn player__syncplay", { "is-on": X(g).isInRoom }]),
						"aria-label": X(g).isInRoom ? X(h)("syncplay.inRoom") : X(h)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: n[7] ||= (e) => ge.value = !0
					}, [H(S, { name: "user" })], 10, fa),
					B("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": X(h)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: n[8] ||= (e) => ie.value = !0
					}, [H(S, { name: "info" })], 8, pa),
					se.value ? (K(), z("button", {
						key: 3,
						type: "button",
						class: W(["player__iconbtn", { "is-on": N.value }]),
						"aria-label": N.value ? X(h)("player.exitPip") : X(h)("player.pip"),
						"aria-pressed": N.value,
						onClick: sr
					}, [H(S, { name: "pip" })], 10, ma)) : R("", !0),
					B("button", {
						type: "button",
						class: W(["player__iconbtn", { "is-on": M.value }]),
						"aria-label": M.value ? X(h)("player.exitTheater") : X(h)("player.theater"),
						"aria-pressed": M.value,
						onClick: nr
					}, [H(S, { name: "theater" })], 10, ha),
					ce.value ? (K(), z("button", {
						key: 4,
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? X(h)("player.exitFullscreen") : X(h)("player.fullscreen"),
						onClick: ar
					}, [H(S, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ga)) : R("", !0)
				])
			], 512)),
			Ie.value ? R("", !0) : (K(), L(Hr, {
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
			Ie.value ? R("", !0) : (K(), L(Jr, {
				key: 4,
				position: X(c).position,
				markers: e.markers,
				onSkip: zn
			}, null, 8, ["position", "markers"])),
			Ke.value && !Ie.value ? (K(), L(Jn, {
				key: 5,
				seconds: $.value,
				onResume: ht,
				onRestart: gt
			}, null, 8, ["seconds"])) : R("", !0),
			Je.value && ft.value && !Ie.value ? (K(), L(Ar, {
				key: 6,
				media: ft.value,
				remaining: Ye.value,
				total: X(8),
				counting: X(u).autoplay,
				onPlayNow: xt,
				onCancel: St
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : R("", !0),
			H(oe, {
				modelValue: $e.value,
				"onUpdate:modelValue": n[10] ||= (e) => $e.value = e,
				title: `Similar ${Ze.value ?? "marker"}s`,
				size: "lg",
				onClose: dt
			}, {
				default: Q(() => [B("div", _a, [tt.value ? (K(), z("div", va, [H(le, { label: "Finding similar media" })])) : rt.value ? (K(), z("div", ya, [H(S, {
					name: "error",
					class: "similar-modal__state-icon"
				}), B("p", ba, Y(rt.value), 1)])) : !tt.value && et.value.length === 0 ? (K(), z("div", xa, [
					H(S, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					n[20] ||= B("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					n[21] ||= B("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (K(), z("ul", Sa, [(K(!0), z(F, null, J(et.value, (e) => (K(), z("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [B("div", Ca, [e.poster_url ? (K(), z("img", {
					key: 0,
					src: X(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, wa)) : (K(), z("div", Ta, [H(S, { name: "film" })]))]), B("div", Ea, [B("p", Da, Y(e.name), 1), e.year ? (K(), z("p", Oa, [V(Y(e.year) + " ", 1), e.runtime ? (K(), z("span", ka, " · " + Y(e.runtime) + "m", 1)) : R("", !0)])) : R("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Le.value ? (K(), L(Vr, {
				key: 7,
				title: e.media.name,
				progress: X(G).progress.value,
				onBack: n[11] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : R("", !0),
			Re.value ? (K(), L(Fr, {
				key: 8,
				title: e.media.name,
				onBack: n[12] ||= (e) => o("back")
			}, null, 8, ["title"])) : R("", !0),
			X(g).isInRoom ? (K(), L(Bi, {
				key: 9,
				position: X(c).position,
				duration: X(c).duration,
				"is-playing": X(c).playing,
				onSeek: zn,
				onPlay: n[13] ||= (e) => void T.value?.play()?.catch(() => {}),
				onPause: n[14] ||= (e) => void T.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : R("", !0),
			X(g).isInRoom ? (K(), L(Ai, { key: 10 })) : R("", !0),
			H(me, {
				modelValue: ge.value,
				"onUpdate:modelValue": n[15] ||= (e) => ge.value = e,
				onJoined: _e
			}, null, 8, ["modelValue"]),
			H(Et, {
				open: ie.value,
				onClose: n[16] ||= (e) => ie.value = !1
			}, null, 8, ["open"]),
			H(Nn, {
				open: nn.value,
				"onUpdate:open": n[17] ||= (e) => nn.value = e,
				"media-id": e.media.id,
				"api-base": e.apiBase ?? "",
				"preferred-langs": an.value,
				onAdded: on
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-97422d11"]]), ja = "blur(3px) saturate(1.35)";
async function Ma(e, t = document, n = 16 / 9) {
	try {
		let r = new Image();
		r.decoding = "async", r.src = e, await r.decode();
		let i = r.naturalWidth, a = r.naturalHeight;
		if (!i || !a) return null;
		let o = Math.max(1, Math.round(64 / (Number.isFinite(n) && n > 0 ? Math.min(4, Math.max(.25, n)) : 16 / 9))), s = t.createElement("canvas");
		s.width = 64, s.height = o;
		let c = s.getContext("2d");
		if (!c) return null;
		let l = Math.max(64 / i, o / a), u = i * l, d = a * l;
		"filter" in c && (c.filter = ja), c.drawImage(r, (64 - u) / 2 - 4, (o - d) / 2 - 4, u + 8, d + 8), "filter" in c && (c.filter = "none"), c.globalCompositeOperation = "destination-in", c.save(), c.translate(32, o / 2), c.scale(32 * Math.SQRT2, o / 2 * Math.SQRT2);
		let f = c.createRadialGradient(0, 0, 0, 0, 0, 1);
		return f.addColorStop(0, "rgba(0, 0, 0, 1)"), f.addColorStop(.75, "rgba(0, 0, 0, 0)"), c.fillStyle = f, c.fillRect(-1, -1, 2, 2), c.restore(), c.globalCompositeOperation = "source-over", s.toDataURL("image/png");
	} catch {
		return null;
	}
}
// src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var Na = { class: "player-page__stage" }, Pa = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Fa = { class: "player-page__blocking-error" }, Ia = /*#__PURE__*/ x(/* @__PURE__ */ U({
	__name: "PlayerPage",
	setup(t) {
		let r = /* @__PURE__ */ new Map(), i = a(), { imgSrc: c } = l(), p = o(), m = Pe(), h = Fe(), { t: _ } = s(), v = we("phlixConfig", null), y = d(), b = f(), ee = g(), x = q(null), S = q(""), C = q([]), w = q(null), T = q(null), E = q([]), te = q([]), D = q(!0), O = q(null), k = q(!1), ne = q(null), re = q(!1), A = q(null), j = q(null), ie = I(() => String(m.params.id ?? ""));
		ye(() => x.value?.name);
		let M = I(() => c(x.value?.poster_url) || ""), N = q(null);
		Z(M, (e) => {
			if (N.value = null, !e) return;
			let t = typeof window < "u" && window.innerHeight > 0 ? window.innerWidth / window.innerHeight : 16 / 9;
			Ma(e, document, t).then((t) => {
				M.value === e && (N.value = t);
			});
		}, { immediate: !0 });
		let ae = I(() => {
			let e = N.value ?? M.value;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), ce = null, le = !1, ue = 0;
		function fe(e) {
			return le || e.generation !== ue;
		}
		function pe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function me(e) {
			let t = p.value || i.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function F(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function Ce(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function U(e, t, n) {
			let r = () => fe(n), a = t.genres?.[0];
			if (!a) y.setQueue([]);
			else try {
				let o = u(i.value, {
					genres: [a],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, n.controller?.signal);
				if (r()) return;
				y.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (r() || pe(e)) return;
				y.setQueue([]);
			}
		}
		async function Te(e, t, n) {
			let r = u(i.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function Ee(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function G(e, t) {
			A.value = _e(e, t), j.value = ve(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && y.setQueue(r);
		}
		function J(e) {
			for (let t of r.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function Ae(e, t, n) {
			if (A.value = null, j.value = null, !Ce(t)) return;
			let i = J(t.id);
			if (i) {
				G(i, t.id);
				return;
			}
			let a = () => fe(n);
			try {
				let i = await Ee(e, t, n.controller?.signal);
				if (a()) return;
				let o = await Te(e, i.id, n.controller?.signal);
				if (a()) return;
				if (ge(o)) {
					let t = o.filter((e) => e.type === "season"), r = await Promise.all(t.map((t) => Te(e, t.id, n.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...r.flat()];
				}
				let s = he(o);
				s.length && r.set(i.id, s), G(s, t.id);
			} catch (e) {
				if (a() || pe(e)) return;
				A.value = null, j.value = null;
			}
		}
		async function je() {
			let t = ie.value;
			ce?.abort(), ce = typeof AbortController < "u" ? new AbortController() : null, ue += 1;
			let r = {
				generation: ue,
				controller: ce
			};
			if (D.value = !0, O.value = null, C.value = [], w.value = null, T.value = null, E.value = [], te.value = [], A.value = null, j.value = null, y.hideMiniPlayer(), !t) {
				O.value = _("common.missingMediaId"), D.value = !1;
				return;
			}
			let a = new n({ baseUrl: i.value });
			a.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, r.controller?.signal).then((e) => {
				fe(r) || (C.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), w.value = F(e?.intro_marker), T.value = F(e?.outro_marker), E.value = ar(e?.audio_tracks), te.value = Je(e?.subtitle_tracks));
			}).catch(() => null);
			let o = be(t), s = Date.now();
			if (o && xe(o, s)) {
				Me(a, o.item, r);
				return;
			}
			let c = null;
			try {
				c = (await a.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, r.controller?.signal)).item;
			} catch (t) {
				if (fe(r) || pe(t)) return;
				if (t instanceof e && (t.status === 403 || t.status === 429)) {
					let e = Le(t.body, v?.locale);
					if (e !== null) {
						ne.value = e, re.value = !0, D.value = !1;
						return;
					}
				}
				if (o) {
					Me(a, o.item, r);
					return;
				}
				O.value = Re(t, v?.locale), D.value = !1;
				return;
			}
			if (!fe(r)) {
				if (c) Se(t, c, s), Me(a, c, r);
				else {
					if (o) {
						Me(a, o.item, r);
						return;
					}
					O.value = "Couldn’t load media item", D.value = !1;
				}
			}
		}
		async function Me(e, t, n) {
			x.value = t, b.hydrate(t), S.value = me(t), D.value = !1, Ce(t) && (await Ae(e, t, n), fe(n) || j.value) || U(e, t, n);
		}
		ke(je), Z(ie, je), Ne(() => {
			y.current && y.streamUrl && y.showMiniPlayer();
		}), Oe(() => {
			le = !0, ce?.abort(), ce = null, ee.reset();
		});
		function Ie() {
			h?.back();
		}
		function ze(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Be(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ve(e) {
			k.value = e, ee.setTheaterActive(e);
		}
		function He() {
			re.value = !1, Ie();
		}
		return (e, t) => (K(), z("div", { class: W(["player-page", { "is-theater": k.value }]) }, [
			ae.value && !D.value && !O.value ? (K(), z("div", {
				key: 0,
				class: W(["player-page__ambient", { "is-preblurred": N.value }]),
				style: De(ae.value),
				"aria-hidden": "true"
			}, null, 6)) : R("", !0),
			B("div", Na, [D.value ? (K(), z("div", Pa, [H(P, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : O.value ? (K(), L(de, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: O.value
			}, {
				actions: Q(() => [H(se, {
					variant: "solid",
					onClick: je
				}, {
					default: Q(() => [...t[1] ||= [V("Retry", -1)]]),
					_: 1
				}), H(se, {
					variant: "ghost",
					onClick: Ie
				}, {
					default: Q(() => [...t[2] ||= [V("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : x.value ? (K(), L(Aa, {
				key: 2,
				media: x.value,
				"stream-url": S.value,
				"stream-url-for": me,
				"api-base": X(i),
				chapters: C.value,
				"intro-marker": w.value,
				"outro-marker": T.value,
				"playback-audio-tracks": E.value,
				"playback-subtitle-tracks": te.value,
				"prev-episode": A.value,
				"next-episode": j.value,
				autoplay: !0,
				onBack: Ie,
				onPlayNext: ze,
				onPlayEpisode: Be,
				onTheater: Ve
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
			H(oe, {
				modelValue: re.value,
				"onUpdate:modelValue": t[0] ||= (e) => re.value = e,
				title: "Can’t start playback",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Q(() => [H(se, {
					variant: "solid",
					onClick: He
				}, {
					default: Q(() => [...t[3] ||= [V("OK", -1)]]),
					_: 1
				})]),
				default: Q(() => [B("p", Fa, Y(ne.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-794d4505"]]);
export { Ia as default };

//# sourceMappingURL=PlayerPage-Nszxc7Yg.js.map