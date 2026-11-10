import { S as e, o as t, t as n, x as r, y as i } from "./client-CdNyEcUJ.js";
import { n as a, r as o } from "./useApiBase-DXTBY90j.js";
import { t as s } from "./useMessages-D54Bje5m.js";
import { r as c, t as l } from "./useImageSrc-CSM61b-l.js";
import { n as u } from "./media-query-D7hrCu8r.js";
import { i as d } from "./usePlayerStore-BpohCwDP.js";
import { n as f, t as p } from "./ThumbRating-CnHbMeyO.js";
import { a as m, n as h, o as g, r as _, s as v, t as y } from "./shortcuts-BqUhFpRJ.js";
import { a as b } from "./usePreferencesStore-DrDMAwjz.js";
import { t as ee } from "./useToastStore-CxO_ppM8.js";
import { n as x, t as S } from "./Icon-55iG1rR7.js";
import { t as C } from "./IconButton-oCt4k5-3.js";
import { n as w } from "./useFocusTrap-DStfPnC8.js";
import { t as T } from "./Slider-Bj5BaBUu.js";
import { t as E } from "./Select-r5PX08M4.js";
import { a as te, c as D, d as O, f as k, i as ne, l as re, n as A, o as ie, r as ae, s as j, t as M, u as oe } from "./captions-DV5mDPeu.js";
import { t as se } from "./Modal-DZDXQwbG.js";
import { t as ce } from "./Button-Dfl4y6vO.js";
import { t as le } from "./Chip-DwTdWHEP.js";
import { t as ue } from "./Spinner-B2VaMLVN.js";
import { t as de } from "./Badge-D7vacFbh.js";
import { t as fe } from "./EmptyState-DjfWh3kt.js";
import { n as pe, r as me, t as he } from "./SyncPlayModal-hRQmGRs_.js";
import { n as ge, o as _e, r as ve, t as N } from "./episode-order-DBEVgrOE.js";
import { t as ye } from "./Skeleton-DDhrDRE7.js";
import { i as be } from "./usePageTitle-j6j9gAmo.js";
import { n as xe, r as Se, t as Ce } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as P, Transition as we, computed as F, createBlock as I, createCommentVNode as L, createElementBlock as R, createElementVNode as z, createTextVNode as B, createVNode as V, defineComponent as H, inject as Te, mergeModels as Ee, nextTick as De, normalizeClass as U, normalizeStyle as W, onBeforeUnmount as Oe, onMounted as ke, onScopeDispose as Ae, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as je, unref as Y, useModel as Me, watch as X, withCtx as Z, withModifiers as Ne } from "vue";
import { onBeforeRouteLeave as Pe, useRoute as Fe, useRouter as Ie } from "vue-router";
function Le(e, t) {
	if (typeof e != "object" || !e) return null;
	let n = e[t];
	return typeof n == "string" && n !== "" ? n : null;
}
function Re(e, t) {
	let n = Le(e, "code");
	if (n !== null && r(n)) return i(n, t);
	let a = Le(e, "error");
	return a === "AccessScheduled" ? "Playback blocked by access schedule. Try again during allowed hours." : a === "StreamLimitExceeded" ? "Stream limit reached. Stop another stream to continue watching." : null;
}
function ze(t, n) {
	if (t instanceof e) {
		let e = Le(t.body, "code");
		if (e !== null && r(e)) return i(e, n);
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
], He = { class: "scrubber__track" }, Ue = ["title"], We = { class: "scrubber__time numeric" }, Ge = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
			"aria-valuetext": Y(Be)(e.position),
			"aria-label": Y(r)("player.seek"),
			onPointerdown: S,
			onPointermove: C,
			onPointerup: w,
			onPointercancel: w,
			onPointerenter: T,
			onPointerleave: E,
			onKeydown: te
		}, [z("div", He, [
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
			}, null, 12, Ue))), 128)),
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
		}, null, 4)) : L("", !0), z("span", We, J(Y(Be)(_.value)), 1)], 4)) : L("", !0)], 40, Ve));
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
		if (r <= 0) continue;
		let i = e.playlist_url ?? e.playlistUrl;
		t.push({
			id: Q(e.id),
			label: Q(e.label),
			height: r,
			width: Je(e.width),
			bitrate: Je(e.bitrate),
			...typeof e.url == "string" && e.url !== "" ? { url: e.url } : {},
			...typeof i == "string" && i !== "" ? { playlistUrl: i } : {}
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
var ut = "_master.m3u8";
function dt(e) {
	let t = K("idle"), r = K(0), i = K([]), a = K([]), o = K(-1), s = K(!0), c = K(null), l = K(null), u = K([]), f = K(-1), p = K(!1), m = K(null), h = K(null);
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
			...e.url ? { url: lt(n, e.url) } : {},
			...e.playlistUrl ? { playlistUrl: lt(n, e.playlistUrl) } : {}
		}));
		ae = r, l.value = r;
	}
	function S(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		i.value = t.map((e) => ({
			...e,
			url: lt(n, e.url)
		}));
	}
	let C = e.attach ?? v, w = e.pollIntervalMs ?? 1e3, T = e.maxWaitMs ?? 12e4, E = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), te = Math.max(1, Math.ceil(T / Math.max(1, w))), D = e.getToken ?? ft, O = e.probeRungPlaylist ?? ((e) => gt(e, D)), k = null, ne = null, re = null, A = null, ie = !1, ae = [], j = 0, M = null, oe = 0;
	function se() {
		return e.client ?? new n({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function ce(n, a, o, s) {
		pe(), ie = !1;
		let c = ++oe, l = () => ie || c !== oe;
		M = new AbortController(), t.value = "preparing", r.value = 0, i.value = [], _();
		try {
			let i = se(), c = at(await i.post(Ze(a, o), void 0, M.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			S(c.subtitles), x(c.variants), m.value = c.jobId, h.value = lt(e.apiBase(), c.masterUrl);
			let u = c.status === "completed";
			for (let e = 0; !u && e < te; e++) {
				let e = ot(await i.get(it(c.jobId), void 0, M.signal));
				if (l()) return;
				if (r.value = e.progress, S(e.subtitles), x(e.variants), ct(e.status)) throw Error(`transcode ${e.status}`);
				if (st(e)) {
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
	function le(e) {
		k && (k.setCurrentLevel(e === "auto" ? -1 : e), g());
	}
	function ue(e) {
		k && (k.setNextLevel(e === "auto" ? -1 : e), g());
	}
	function de(e) {
		k && (k.setAudioTrack(e), y());
	}
	function fe(e) {
		if (!k || !h.value) return;
		let t = ae.find((t) => t.id === e), n = t?.playlistUrl ?? mt(h.value, e), r = t?.url ?? ht(h.value, e), i = ++j;
		(async () => {
			let e;
			try {
				e = await O(n);
			} catch {
				e = "unknown";
			}
			!ie && i === j && k && (e === "absent" ? (console.warn(`[phlix-ui] rung mini-master unavailable (${n}) — this server has no per-rung index files; falling back to the legacy bare rung playlist (${r}). Multi-audio titles play silent on the video-only bare rung and the audio menu stays hidden (never a stale rendition list); muxed-audio titles play correctly. The menu returns once the server ships the index.`), k.loadSource(r)) : k.loadSource(n), _());
		})();
	}
	function pe() {
		if (ie = !0, j++, M &&= (M.abort(), null), ne) {
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
		ae = [], m.value = null, h.value = null;
	}
	function me() {
		pe(), t.value = "idle", r.value = 0, i.value = [], _(), ee();
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
		setLevel: le,
		setNextLevel: ue,
		setAudioTrack: de,
		jobId: m,
		masterUrl: h,
		loadVariantPlaylist: fe,
		start: ce,
		cleanup: pe,
		reset: me
	};
}
function ft() {
	try {
		return t().getAccessToken();
	} catch {
		return null;
	}
}
function pt(e) {
	let t = e.indexOf("?");
	return t === -1 ? [e, ""] : [e.slice(0, t), e.slice(t)];
}
function mt(e, t) {
	let [n, r] = pt(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}${ut}${r}`;
}
function ht(e, t) {
	let [n, r] = pt(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}.m3u8${r}`;
}
async function gt(e, t) {
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
var _t = 10;
function vt(e) {
	let t = K(null), r = K(!1), i = K(null), a = /* @__PURE__ */ new Map();
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
		let i = r.frame, a = i % _t, o = Math.floor(i / _t), c = a / 9 * 100, l = o / 5 * 100;
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
var yt = ["aria-label"], bt = { class: "shortcuts__head" }, xt = { class: "shortcuts__title" }, St = { class: "shortcuts__grid" }, Ct = { class: "shortcuts__keys" }, wt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Tt = {
	key: 1,
	class: "shortcuts__key"
}, Et = { class: "shortcuts__label" }, Dt = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => _ }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = s(), a = K(null);
		return w(a, je(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (G(), R("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Ne((e) => r("close"), ["self"])
		}, [z("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(i)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [z("div", bt, [z("h3", xt, J(Y(i)("player.keyboard")), 1), V(C, {
			name: "x",
			label: Y(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), z("ul", St, [(G(!0), R(P, null, q(e.shortcuts, (e) => (G(), R("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [z("span", Ct, [(G(!0), R(P, null, q(e.keys, (e, t) => (G(), R(P, { key: t }, [e === "–" ? (G(), R("span", wt, "–")) : (G(), R("kbd", Tt, [Y(y)[e] ? (G(), I(S, {
			key: 0,
			name: Y(y)[e],
			label: Y(h)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), R(P, { key: 1 }, [B(J(e), 1)], 64))]))], 64))), 128))]), z("span", Et, J(e.label), 1)]))), 128))])], 8, yt)])) : L("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Ot = { class: "volume" }, kt = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "VolumeControl",
	setup(e) {
		let t = d(), n = b(), { t: r } = s(), i = F(() => t.muted ? 0 : t.volume), a = F(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function o(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return X(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (G(), R("div", Ot, [V(C, {
			name: a.value,
			label: Y(t).muted ? Y(r)("player.unmute") : Y(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => Y(t).toggleMute()
		}, null, 8, ["name", "label"]), V(T, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), At = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
}), [["__scopeId", "data-v-4530b308"]]), jt = "auto", Mt = "original";
function Nt(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function Pt(e) {
	return e >= 2160 ? "4K" : Nt(e);
}
function Ft(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Nt(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: Pt(r.height)
		}));
	}
	return n;
}
function It(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Nt(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Lt(e, t) {
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
function Rt(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function zt(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && Lt(e, n) >= 0;
}
function Bt(e, t) {
	if (t < 0) return jt;
	let n = e.find((e) => e.index === t);
	return n ? Nt(n.height) : jt;
}
// src/components/player/QualityMenu.vue
var Vt = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let r = e, i = Me(e, "open"), a = K(null);
		function o() {
			a.value?.toggleMenu();
		}
		let c = n, l = d(), u = b(), { t: f } = s(), p = F(() => Ft(r.levels)), m = F(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!r.variants) return [];
			let n = p.value.length >= 2;
			for (let i of [...r.variants].sort((e, t) => t.height - e.height)) {
				let a = Nt(i.height);
				e.has(a) || n && It(r.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: Pt(i.height)
				}));
			}
			return t;
		}), h = F(() => p.value.length >= 2 ? p.value : m.value), g = F(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), _ = F(() => Lt(r.levels, g.value)), v = F(() => g.value && _.value >= 0 ? {
			value: Mt,
			label: f("player.qualityOriginal", { height: g.value.height })
		} : null), y = F(() => h.value.length >= 2), ee = F(() => r.activeHeight == null ? f("player.qualityAuto") : f("player.qualityAutoActive", { label: Pt(r.activeHeight) })), x = F(() => [
			{
				value: jt,
				label: ee.value
			},
			...v.value ? [v.value] : [],
			...h.value
		]), S = F(() => r.autoEnabled ? jt : v.value && r.currentLevel === _.value && (l.quality === "original" || u.defaultQuality === "original") ? Mt : Bt(r.levels, r.currentLevel));
		function C(e) {
			let t = String(e);
			if (t === "auto") {
				l.setQuality(t), u.defaultQuality = t, c("select", "auto");
				return;
			}
			let n = t === "original" ? _.value : It(r.levels, t);
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
			label: Y(f)("player.quality"),
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
}), [["__scopeId", "data-v-58498bdd"]]), Ht = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		X(() => n.controlsRoot, u, { immediate: !0 }), Oe(l);
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
				j(n.video, n.language);
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
			_(), j(n.video, n.language);
			let e = k(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = O(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return X(() => [n.video, n.language], y, { immediate: !0 }), Oe(_), t({ lines: r }), (t, n) => r.value.length ? (G(), R("div", {
			key: 0,
			class: U(["player__captions", { "is-lifted": e.lifted }]),
			style: W(o.value)
		}, [(G(!0), R(P, null, q(r.value, (e, t) => (G(), R("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : L("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), Ut = ["aria-label", "aria-expanded"], Wt = ["aria-label"], Gt = { class: "capmenu__head" }, Kt = { class: "capmenu__title" }, qt = ["aria-label"], Jt = ["aria-checked", "tabindex"], Yt = { class: "capmenu__check" }, Xt = { class: "capmenu__optlabel" }, Zt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Qt = { class: "capmenu__check" }, $t = { class: "capmenu__optlabel" }, en = { class: "capmenu__check" }, tn = { class: "capmenu__optlabel" }, nn = { class: "capmenu__title capmenu__title--sub" }, rn = ["aria-label"], an = [
	"aria-checked",
	"tabindex",
	"onClick"
], on = { class: "capmenu__check" }, sn = { class: "capmenu__optlabel" }, cn = { class: "capmenu__title capmenu__title--sub" }, ln = { class: "capmenu__style" }, un = { class: "capmenu__field" }, dn = { class: "capmenu__fieldlabel" }, fn = { class: "capmenu__field" }, pn = { class: "capmenu__fieldlabel" }, mn = { class: "capmenu__field" }, hn = { class: "capmenu__fieldlabel" }, gn = { class: "capmenu__field" }, _n = { class: "capmenu__fieldlabel" }, vn = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		w(l, je(n, "open"), {
			lockScroll: !1,
			onEscape: () => (_(), !0)
		});
		function ie(e) {
			c.value && !c.value.contains(e.target) && _();
		}
		return X(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", ie, !0) : document.removeEventListener("pointerdown", ie, !0));
		}, { immediate: !0 }), Oe(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", ie, !0);
		}), (t, n) => (G(), R("div", {
			ref_key: "rootEl",
			ref: c,
			class: "capmenu"
		}, [z("button", {
			type: "button",
			class: U(["capmenu__btn", { "is-active": f.value }]),
			"aria-label": f.value ? Y(o)("player.captionsOn") : Y(o)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => g(!e.open)
		}, [V(S, { name: p.value }, null, 8, ["name"])], 10, Ut), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(o)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			z("div", Gt, [z("h3", Kt, J(Y(o)("player.subtitles")), 1), V(C, {
				name: "x",
				label: Y(o)("common.close"),
				size: "sm",
				onClick: _
			}, null, 8, ["label"])]),
			z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(o)("player.subtitleTrack"),
				onKeydown: T
			}, [z("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !f.value,
				tabindex: m.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => v(null)
			}, [z("span", Yt, [f.value ? L("", !0) : (G(), I(S, {
				key: 0,
				name: "check"
			}))]), z("span", Xt, J(Y(o)("player.off")), 1)], 8, Jt), (G(!0), R(P, null, q(e.tracks, (e, t) => (G(), R("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": u.value === e.language,
				tabindex: m.value === t + 1 ? 0 : -1,
				onClick: (t) => v(e.language)
			}, [z("span", Qt, [u.value === e.language ? (G(), I(S, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", $t, J(e.label), 1)], 8, Zt))), 128))], 40, qt),
			z("button", {
				type: "button",
				class: "capmenu__add",
				onClick: ee
			}, [z("span", en, [V(S, { name: "plus" })]), z("span", tn, J(Y(o)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 0 ? (G(), R(P, { key: 0 }, [z("h3", nn, J(Y(o)("player.audio")), 1), z("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(o)("player.audioTrack"),
				onKeydown: te
			}, [(G(!0), R(P, null, q(e.audioTracks, (t) => (G(), R("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: h.value === t.index ? 0 : -1,
				onClick: (e) => y(t.index)
			}, [z("span", on, [e.activeAudio === t.index ? (G(), I(S, {
				key: 0,
				name: "check"
			})) : L("", !0)]), z("span", sn, J(t.label), 1)], 8, an))), 128))], 40, rn)], 64)) : L("", !0),
			z("h3", cn, J(Y(o)("player.captionStyle")), 1),
			z("div", ln, [
				z("div", un, [z("span", dn, J(Y(o)("player.size")), 1), V(E, {
					"model-value": Y(a).captionStyle.size,
					options: Y(ne),
					label: Y(o)("player.captionSize"),
					"onUpdate:modelValue": D
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", fn, [z("span", pn, J(Y(o)("player.color")), 1), V(E, {
					"model-value": Y(a).captionStyle.textColor,
					options: Y(A),
					label: Y(o)("player.captionColor"),
					"onUpdate:modelValue": O
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", mn, [z("span", hn, J(Y(o)("player.background")), 1), V(E, {
					"model-value": Y(a).captionStyle.background,
					options: Y(M),
					label: Y(o)("player.captionBackground"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				z("div", gn, [z("span", _n, J(Y(o)("player.edge")), 1), V(E, {
					"model-value": Y(a).captionStyle.edge,
					options: Y(ae),
					label: Y(o)("player.captionEdge"),
					"onUpdate:modelValue": re
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Wt)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-62fcc11d"]]), yn = { class: "subsearch" }, bn = { class: "subsearch__langs" }, xn = { class: "subsearch__legend" }, Sn = { class: "subsearch__chips" }, Cn = { class: "subsearch__actions" }, wn = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, Tn = {
	key: 2,
	class: "subsearch__prompt"
}, En = {
	key: 3,
	class: "subsearch__list"
}, Dn = { class: "subsearch__meta" }, On = { class: "subsearch__release" }, kn = { class: "subsearch__signals" }, An = { class: "subsearch__provider" }, jn = ["aria-label"], Mn = {
	key: 2,
	class: "subsearch__stat"
}, Nn = {
	key: 3,
	class: "subsearch__stat"
}, Pn = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let d = F(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...i.preferredLangs, ...l]) {
				let r = (n || "").toLowerCase();
				r && !e.has(r) && (e.add(r), t.push(r));
			}
			return t;
		}), f = K(/* @__PURE__ */ new Set());
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
		let h = K(!1), g = K(!1), _ = K([]), v = K(/* @__PURE__ */ new Set()), y = K(/* @__PURE__ */ new Set());
		function b(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let x = F(() => [..._.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), C = F(() => f.value.size > 0 && !h.value);
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
				let n = Ye([(await w().downloadSubtitle(i.mediaId, {
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
		return X(() => i.open, (e) => {
			e && (p(), _.value = [], g.value = !1, h.value = !1, v.value = /* @__PURE__ */ new Set(), y.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (e, n) => (G(), I(se, {
			"model-value": t.open,
			title: Y(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: Z(() => [V(ce, {
				variant: "ghost",
				onClick: E
			}, {
				default: Z(() => [B(J(Y(o)("common.close")), 1)]),
				_: 1
			})]),
			default: Z(() => [z("div", yn, [
				z("fieldset", bn, [z("legend", xn, J(Y(o)("player.subtitleSearchLanguages")), 1), z("div", Sn, [(G(!0), R(P, null, q(d.value, (e) => (G(), I(le, {
					key: e,
					selected: f.value.has(e),
					size: "md",
					"aria-label": u(e),
					"onUpdate:selected": (t) => m(e)
				}, {
					default: Z(() => [B(J(u(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				z("div", Cn, [V(ce, {
					variant: "solid",
					"left-icon": "search",
					loading: h.value,
					disabled: !C.value,
					onClick: T
				}, {
					default: Z(() => [B(J(Y(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				h.value ? (G(), R("div", wn, [V(ue, { label: Y(o)("player.subtitleSearching") }, null, 8, ["label"]), z("span", null, J(Y(o)("player.subtitleSearching")), 1)])) : g.value && x.value.length === 0 ? (G(), I(fe, {
					key: 1,
					icon: "captions",
					title: Y(o)("player.subtitleSearchEmpty"),
					description: Y(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : g.value ? (G(), R("ul", En, [(G(!0), R(P, null, q(x.value, (e) => (G(), R("li", {
					key: b(e),
					class: "subsearch__item"
				}, [z("div", Dn, [z("p", On, J(e.releaseName || e.provider), 1), z("div", kn, [
					V(de, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Z(() => [B(J(u(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (G(), I(de, {
						key: 0,
						tone: "info",
						size: "sm",
						label: Y(o)("player.subtitleHearingImpairedFull")
					}, {
						default: Z(() => [B(J(Y(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : L("", !0),
					z("span", An, J(e.provider), 1),
					e.rating > 0 ? (G(), R("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": Y(o)("player.subtitleRating", { rating: e.rating })
					}, [V(S, { name: "star" }), B(" " + J(e.rating), 1)], 8, jn)) : L("", !0),
					e.downloadCount > 0 ? (G(), R("span", Mn, J(Y(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : L("", !0),
					e.fps ? (G(), R("span", Nn, J(Y(o)("player.subtitleFps", { fps: e.fps })), 1)) : L("", !0)
				])]), V(ce, {
					variant: "outline",
					size: "sm",
					"left-icon": y.value.has(b(e)) ? "check" : "plus",
					loading: v.value.has(b(e)),
					disabled: v.value.has(b(e)) || y.value.has(b(e)),
					"aria-label": Y(o)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => O(e)
				}, {
					default: Z(() => [B(J(v.value.has(b(e)) ? Y(o)("player.subtitleAdding") : Y(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (G(), R("p", Tn, J(Y(o)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), Fn = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function In(e, t, n, r, i, a, o) {
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
		r: Fn(d / m),
		g: Fn(f / m),
		b: Fn(p / m)
	};
}
function Ln(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: In(e, t, n, 0, 0, r, n),
		right: In(e, t, n, t - r, 0, t, n),
		center: In(e, t, n, 0, 0, t, n)
	};
}
function Rn({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
var $ = (e) => `${Math.round(e * 1e3) / 10}%`;
function zn(e, t = 1) {
	return Bn(e, t).map((e) => `radial-gradient(${$(e.rx)} ${$(e.ry)} at ${$(e.cx)} ${$(e.cy)}, ${Rn(e.color, e.alpha)}, transparent ${$(e.stop)})`).join(", ");
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
		o.addColorStop(0, Rn(n.color, n.alpha)), o.addColorStop(n.stop, `rgba(${s}, ${c}, ${l}, 0)`), e.fillStyle = o, e.fillRect((8 - t) / i, (9 - r) / a, 96 / i, 54 / a), e.restore();
	}
}
function Hn(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var Un = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
			r.value = Hn(i);
		}
		let o = F(() => n.enabled && !n.reducedMotion && !r.value), s = F(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = K(null), l = K(null), u = null, d = null, f = !1;
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
				let { data: n } = t.getImageData(0, 0, 32, 18), r = Ln(n, 32, 18), i = p(r);
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
		X(() => [
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
		let O = F(() => {
			let e = { opacity: String(s.value) };
			return l.value ? e.backgroundImage = `url("${l.value}")` : c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: y }), (e, t) => (G(), R("div", {
			class: U(["player__ambient", {
				"is-active": o.value,
				"is-bitmap": o.value && !!l.value
			}]),
			style: W(o.value ? O.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-ba42f7c0"]]), Wn = ["aria-label"], Gn = { class: "resume__label" }, Kn = { class: "resume__time numeric" }, qn = { class: "resume__actions" }, Jn = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = s(), i = F(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (G(), R("div", {
			class: "resume",
			role: "region",
			"aria-label": Y(r)("player.resumePlayback")
		}, [z("p", Gn, [
			B(J(i.value[0]), 1),
			z("span", Kn, J(Y(Be)(e.seconds)), 1),
			B(J(i.value[1]), 1)
		]), z("div", qn, [z("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [V(S, { name: "play" }), z("span", null, J(Y(r)("player.resume")), 1)]), z("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [V(S, { name: "rewind" }), z("span", null, J(Y(r)("player.startOver")), 1)])])], 8, Wn));
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
], Ar = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let { t: n } = s(), { imgSrc: r } = l(), i = e, a = t, o = F(() => i.posterUrl ?? i.media.poster_url ?? null), c = F(() => sr(i.remaining, i.total));
		return (t, i) => (G(), R("aside", {
			class: "upnext",
			role: "region",
			"aria-label": Y(n)("player.upNext")
		}, [
			o.value ? (G(), R("img", {
				key: 0,
				class: "upnext__thumb",
				src: Y(r)(o.value),
				alt: "",
				loading: "lazy"
			}, null, 8, xr)) : L("", !0),
			z("div", Sr, [
				z("p", Cr, J(Y(n)("player.upNext")), 1),
				z("h4", wr, J(e.media.name), 1),
				e.counting ? (G(), R("p", Tr, J(e.remaining > 0 ? Y(n)("player.startsIn", { count: e.remaining }) : Y(n)("player.startingNow")), 1)) : L("", !0),
				z("div", Er, [z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [V(S, { name: "play" }), z("span", null, J(Y(n)("player.playNow")), 1)]), z("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, J(Y(n)("player.cancel")), 1)])
			]),
			e.counting ? (G(), R("svg", Dr, [z("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Or), z("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Y(or),
				"stroke-dashoffset": c.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, kr)])) : L("", !0)
		], 8, br));
	}
}), [["__scopeId", "data-v-3fc667d0"]]), jr = {
	class: "transcode",
	role: "alert"
}, Mr = { class: "transcode__card" }, Nr = { class: "transcode__heading" }, Pr = { class: "transcode__body" }, Fr = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = s();
		return (t, i) => (G(), R("div", jr, [z("div", Mr, [
			V(S, {
				name: "alert",
				class: "transcode__icon"
			}),
			z("h3", Nr, J(Y(r)("player.transcodeHeading")), 1),
			z("p", Pr, J(e.title ? Y(r)("player.transcodeBodyTitled", { title: e.title }) : Y(r)("player.transcodeBodyUntitled")), 1),
			z("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [V(S, { name: "arrow-left" }), z("span", null, J(Y(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Ir = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Lr = { class: "prep__card" }, Rr = { class: "prep__heading" }, zr = { class: "prep__body" }, Br = ["aria-valuenow"], Vr = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = s(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (G(), R("div", Ir, [z("div", Lr, [
			V(S, {
				name: "spinner",
				class: "prep__spinner"
			}),
			z("h3", Rr, J(Y(n)("player.transcodePreparingHeading")), 1),
			z("p", zr, J(e.title ? Y(n)("player.transcodePreparingTitled", { title: e.title }) : Y(n)("player.transcodePreparingUntitled")), 1),
			z("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [z("div", {
				class: "prep__bar-fill",
				style: W({ width: r() + "%" })
			}, null, 4)], 8, Br),
			z("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [V(S, { name: "arrow-left" }), z("span", null, J(Y(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Hr = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
			default: Z(() => [o.value ? (G(), R("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ne(c, ["stop"])
			}, [z("span", null, J(o.value.label), 1), V(S, { name: "skip-forward" })])) : L("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Ur = ["aria-label"], Wr = ["aria-label", "onClick"], Gr = { class: "skip-controls__label" }, Kr = 5, qr = 30, Jr = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let d = F(() => !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => l.includes(e.type) && c(e, n.position)).sort((e, t) => e.startMs - t.startMs));
		function f(e) {
			r("skip", a(e.startMs));
		}
		return (e, t) => d.value.length > 0 ? (G(), R("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": Y(i)("player.skipControls")
		}, [(G(!0), R(P, null, q(d.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${u(e.type)}`,
			onClick: Ne((t) => f(e), ["stop"])
		}, [z("span", Gr, J(u(e.type)), 1), V(S, { name: "skip-forward" })], 8, Wr))), 128))], 8, Ur)) : L("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Yr = ["aria-label", "aria-expanded"], Xr = ["aria-label"], Zr = { class: "chapterlist__head" }, Qr = { class: "chapterlist__title" }, $r = ["aria-label"], ei = ["onClick"], ti = { class: "chapterlist__index" }, ni = { class: "chapterlist__name" }, ri = { class: "chapterlist__meta" }, ii = { class: "chapterlist__time" }, ai = {
	key: 0,
	class: "chapterlist__duration"
}, oi = {
	key: 1,
	class: "chapterlist__empty"
}, si = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Be(e.start), a;
			return e.end != null && e.end > e.start && (a = Be(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), l = K(null), u = K(null);
		w(u, je(n, "open"), {
			lockScroll: !1,
			onEscape: () => (a(), !0)
		});
		function d(e) {
			l.value && !l.value.contains(e.target) && a();
		}
		X(() => n.open, (e) => {
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
			"aria-label": Y(i)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: o
		}, [V(S, { name: "list" })], 10, Yr), e.open ? (G(), R("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(i)("player.chapterList"),
			tabindex: "-1"
		}, [z("div", Zr, [z("h3", Qr, J(Y(i)("player.chapters")), 1), V(C, {
			name: "x",
			label: Y(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), c.value.length > 0 ? (G(), R("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": Y(i)("player.chapterList")
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
			z("span", ti, J(e.index), 1),
			z("span", ni, J(e.label), 1),
			z("span", ri, [z("span", ii, J(e.startLabel), 1), e.durationLabel ? (G(), R("span", ai, "· " + J(e.durationLabel), 1)) : L("", !0)])
		], 8, ei)]))), 128))], 8, $r)) : (G(), R("p", oi, J(Y(i)("player.noChapters")), 1))], 8, Xr)) : L("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), ci = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, li = { class: "marker-timeline__ticks" }, ui = [
	"title",
	"aria-label",
	"onClick"
], di = { class: "marker-timeline__tooltip" }, fi = { class: "marker-timeline__tooltip-label" }, pi = { class: "marker-timeline__tooltip-time numeric" }, mi = ["onClick"], hi = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		}, [l.value ? (G(), R("div", ci, [t[0] ||= z("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [z("polygon", { points: "5,3 19,12 5,21" })], -1), B(" " + J(u.value), 1)])) : L("", !0), z("div", li, [(G(!0), R(P, null, q(s.value, (e) => (G(), R("button", {
			key: e.id,
			type: "button",
			class: U(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: W({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Y(Be)(e.startSec)}`,
			"aria-label": `${e.label} at ${Y(Be)(e.startSec)}`,
			onClick: Ne((t) => d(e), ["stop"])
		}, [z("span", di, [
			z("span", fi, J(e.label), 1),
			z("span", pi, J(Y(Be)(e.startSec)), 1),
			z("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ne((t) => f(e), ["stop"])
			}, " Find similar ", 8, mi)
		])], 14, ui))), 128))])], 2)) : L("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), gi = ["aria-label", "aria-expanded"], _i = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, vi = ["aria-label"], yi = ["aria-selected", "onClick"], bi = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
			"aria-label": c.value ? `Sleep timer: ${p(o.value)} remaining` : Y(r)("player.sleepTimer"),
			"aria-expanded": m.value,
			"aria-haspopup": "listbox",
			onClick: h
		}, [V(S, { name: "moon" }), c.value ? (G(), R("span", _i, J(p(o.value)), 1)) : L("", !0)], 10, gi), V(we, { name: "dropdown" }, {
			default: Z(() => [m.value ? (G(), R("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": Y(r)("player.sleepTimer")
			}, [(G(), R(P, null, q(i, (e) => z("li", {
				key: e.value,
				class: U(["sleep-timer__option", { "is-selected": a.value === e.value }]),
				role: "option",
				"aria-selected": a.value === e.value,
				onClick: (t) => g(e.value)
			}, J(e.label), 11, yi)), 64))], 8, vi)) : L("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), xi = {
	key: 0,
	class: "syncplay-overlay"
}, Si = { class: "syncplay-overlay__badge" }, Ci = { class: "syncplay-overlay__label" }, wi = { class: "syncplay-overlay__status-label" }, Ti = { class: "syncplay-overlay__members" }, Ei = { class: "syncplay-overlay__member-count" }, Di = { class: "syncplay-overlay__member-list" }, Oi = { class: "syncplay-overlay__member-name" }, ki = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Ai = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		return (e, t) => Y(r).isInRoom ? (G(), R("div", xi, [
			z("div", Si, [V(S, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), z("span", Ci, "SyncPlay: " + J(c.value), 1)]),
			z("div", { class: U(["syncplay-overlay__status", `syncplay-overlay__status--${u.value}`]) }, [V(S, {
				name: f.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), z("span", wi, J(d.value), 1)], 2),
			z("div", Ti, [z("span", Ei, [V(S, { name: "user" }), B(" " + J(Y(n)("syncplay.members", { count: l.value })), 1)]), z("ul", Di, [(G(!0), R(P, null, q(Y(r).onlineMembers.slice(0, 5), (e) => (G(), R("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= z("span", { class: "syncplay-overlay__member-dot" }, null, -1), z("span", Oi, J(e.name), 1)]))), 128)), Y(r).onlineMembers.length > 5 ? (G(), R("li", ki, " +" + J(Y(r).onlineMembers.length - 5) + " more ", 1)) : L("", !0)])]),
			V(ce, {
				variant: "ghost",
				size: "sm",
				onClick: p
			}, {
				default: Z(() => [B(J(Y(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : L("", !0);
	}
}), [["__scopeId", "data-v-2dfa4284"]]), ji = {
	key: 0,
	class: "syncplay-controls"
}, Mi = ["aria-label"], Ni = { class: "syncplay-controls__wait-label" }, Pi = { class: "syncplay-controls__transport" }, Fi = ["aria-label"], Ii = ["aria-label"], Li = ["aria-label"], Ri = { class: "syncplay-controls__status-label" }, zi = 10, Bi = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let n = e, r = t, { t: o } = s(), c = pe(), l = ee(), u = Te("phlixConfig", null), d = a(), f = F(() => n.apiBase ?? d.value);
		me((e) => {
			l.error(i(e, u?.locale, o("syncplay.commandRejected")));
		}), Ae(() => me(null));
		let p = K(!1), m = F(() => p.value || c.syncStatus === "re-syncing");
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
		return X(() => c.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => Y(c).isInRoom ? (G(), R("div", ji, [
			m.value ? (G(), R("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": Y(o)("syncplay.waitingForMembers")
			}, [V(S, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), z("span", Ni, J(Y(o)("syncplay.waitingForMembers")), 1)], 8, Mi)) : L("", !0),
			z("div", Pi, [
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.rewind"),
					onClick: y
				}, [V(S, { name: "rewind" })], 8, Fi),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Y(o)("syncplay.pauseAll") : Y(o)("syncplay.playAll"),
					onClick: _
				}, [V(S, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Ii),
				z("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.fastForward"),
					onClick: b
				}, [V(S, { name: "forward" })], 8, Li)
			]),
			z("div", { class: U(["syncplay-controls__status", `syncplay-controls__status--${Y(c).syncStatus}`]) }, [V(S, {
				name: Y(c).syncStatus === "synced" ? "check" : Y(c).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), z("span", Ri, J(Y(c).syncStatus === "synced" ? Y(o)("syncplay.synced") : Y(c).syncStatus === "outOfSync" ? Y(o)("syncplay.outOfSync") : Y(o)("syncplay.reSyncing")), 1)], 2)
		])) : L("", !0);
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
}, ka = { key: 0 }, Aa = /*#__PURE__*/ x(/* @__PURE__ */ H({
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
		let { imgSrc: r } = l(), i = e, o = t, c = d(), u = b(), { t: h } = s(), g = pe(), _ = f(), v = F(() => _.isFavorite(i.media.id)), y = F(() => _.likeLevel(i.media.id));
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
		], T = K(null), E = K(null), D = K(null), O = K(!0), k = K(!1), ne = K(!1), A = K(!1), ae = K(!1), j = K(!1), M = K(!1), ce = K(!1), le = K(null), de = K(null), fe = K(!1), me = ee(), ge = K(!1);
		function _e(e) {
			me.success(h("syncplay.joinedRoom", { name: e.name }));
		}
		let ve = F(() => j.value ? 1.35 : 1), N = K(Qn(i.streamUrl, i.media.path)), ye = F(() => pr(i.media.streams)), be = 0;
		async function xe() {
			let e = ++be;
			if (N.value) return;
			let t = await yr([i.streamUrl, i.media.path], i.playbackAudioTracks ?? [], ye.value);
			e === be && t && !N.value && (N.value = !0, ze(T.value?.currentTime ?? 0));
		}
		X([() => i.playbackAudioTracks, ye], () => {
			xe();
		}, { immediate: !0 });
		let Se = Te("phlixConfig", null), Ce = a(), we = Te("resumeReporter", null), H = !1;
		function Ee() {
			return Ce.value;
		}
		let W = dt({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: Se?.playerHlsConfig
		}), Ae = vt({ apiBase: () => i.apiBase ?? "" }), je = null;
		function Me(e) {
			je !== null && clearTimeout(je), je = setTimeout(() => {
				je = null, Ae.fetch(e);
			}, 0);
		}
		let Pe = F(() => i.thumbnailAt ?? Ae.thumbnailAt), Fe = F(() => N.value ? void 0 : i.streamUrl), Ie = F(() => N.value && W.state.value !== "ready"), Le = F(() => N.value && (W.state.value === "preparing" || W.state.value === "idle")), Re = F(() => N.value && W.state.value === "error");
		function ze(e = 0) {
			let t = T.value, n = navigator.connection?.downlinkMax, r = rt(n);
			t && W.start(t, i.media.id, r, e);
		}
		function Ve(e) {
			c.quality === "original" && e !== "auto" ? W.loadVariantPlaylist(Mt) : typeof e == "string" && e !== "auto" ? W.loadVariantPlaylist(e) : W.setLevel(e);
		}
		let He = !1;
		function Ue() {
			u.defaultQuality = jt;
		}
		function We() {
			let e = W.levels.value;
			if (e.length === 0) return !1;
			let t = u.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = W.variants.value;
				if (!t || t.length === 0) return !1;
				if (zt(e, t)) W.loadVariantPlaylist(Mt);
				else {
					let t = Rt(e);
					t >= 0 && W.setNextLevel(t), Ue();
				}
				return !0;
			}
			let n = It(e, t);
			return n >= 0 ? W.setNextLevel(n) : Ue(), !0;
		}
		X(() => W.levels.value, (e) => {
			He || e.length === 0 || We() && (He = !0);
		}), X(() => W.variants.value, (e) => {
			!He && e?.length && De(() => {
				He || We() && (He = !0);
			});
		}, { deep: !0 });
		let Ke = K(c.resumePositionFor(i.media.id) ?? 0), Q = K(!N.value && Ke.value > 0), qe = null, Je = K(!1), Ye = K(8), Xe, Ze = K(null), Qe = K(0), $e = K(!1), et = K([]), tt = K(!1), nt = K(null);
		function it(e, t) {
			Ze.value = e, Qe.value = t, et.value = [], nt.value = null, $e.value = !0, lt(e, t);
		}
		let at = null, ot = null, st = null;
		function ct() {
			let e = i.apiBase ?? "";
			return (ot === null || st !== e) && (ot = new n({ baseUrl: e }), st = e), ot;
		}
		async function lt(e, t) {
			at?.abort(), at = new AbortController(), tt.value = !0, nt.value = null;
			try {
				let n = await ct().searchByMarker(e, t, 30, 20, at.signal);
				et.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				nt.value = "Couldn’t load similar titles. Please try again.", et.value = [];
			} finally {
				tt.value = !1;
			}
		}
		function ut() {
			at?.abort(), $e.value = !1, et.value = [], nt.value = null, Ze.value = null;
		}
		let ft = F(() => c.upNext);
		function pt() {
			N.value = Qn(i.streamUrl, i.media.path), xe(), Ke.value = c.resumePositionFor(i.media.id) ?? 0, Q.value = !N.value && Ke.value > 0, qe = null, bn = !1, sn = !1, rn.value = [], nn.value = !1, cn = !1, Jt.value = -1, mn = null, He = !1, H = !1, Ft(), wt = !1, Ot = 0, Et = 0, _t(), Je.value = !1, W.reset(), T.value && (T.value.currentTime = 0), N.value && ze(), Me(i.media.id);
		}
		function mt(e) {
			let t = T.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : qe = Math.max(0, e));
		}
		function ht() {
			mt(Ke.value), Q.value = !1, T.value?.play()?.catch(() => {});
		}
		function gt() {
			qe = null, mt(0), c.clearResume(i.media.id), Q.value = !1, T.value?.play()?.catch(() => {});
		}
		function _t() {
			Xe &&= (clearInterval(Xe), void 0);
		}
		function yt() {
			Ye.value = 8, _t(), Xe = setInterval(() => {
				--Ye.value, Ye.value <= 0 && (_t(), xt());
			}, 1e3);
		}
		function bt() {
			H || (H = !0, we?.finish()), lr(), O.value = !0, c.upNext && (Je.value = !0, u.autoplay && yt());
		}
		function xt() {
			_t(), Je.value = !1;
			let e = c.next(i.streamUrlFor);
			e && o("play-next", e);
		}
		function St() {
			_t(), Je.value = !1;
		}
		function Ct() {
			if (N.value) return;
			let e = T.value, t = er(e) && (e?.currentTime ?? 0) === 0;
			($n(e) || t) && (Nt(), Ft(), N.value = !0, ze(e?.currentTime ?? 0));
		}
		let wt = !1, Tt = null, Et = 0, Ot = 0;
		function Nt() {
			if (wt) return;
			wt = !0;
			let e = i.media?.id;
			e != null && e !== "" && ct().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, rr({ videoCodec: ye.value })).catch(() => {});
		}
		function Pt() {
			if (Tt !== null || wt || N.value) return;
			let e = T.value;
			e && (Et = Date.now(), Ot = e.currentTime, Tt = setTimeout(() => {
				Tt = null;
				let e = T.value;
				e && !N.value && ir(Date.now(), Et, e.currentTime, Ot) && (Nt(), N.value = !0, ze(e.currentTime));
			}, tr));
		}
		function Ft() {
			Tt !== null && (clearTimeout(Tt), Tt = null);
		}
		let Lt = K([]), Bt = K([]), Ut = K(-1), Wt = K(!1), Gt = F(() => W.state.value === "ready" && W.audioTracks.value.length > 0), Kt = F(() => W.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), qt = F(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), Jt = K(-1), Yt = F(() => !Gt.value && !N.value && Bt.value.length === 0 && qt.value.length > 1), Xt = F(() => Bt.value.length > 0 ? !1 : W.state.value === "ready" ? !Gt.value && W.hasAudio.value : !N.value && !Yt.value && qt.value.length === 1), Zt = F(() => Gt.value ? Kt.value : Yt.value ? qt.value : Bt.value.length > 0 ? Bt.value : Xt.value ? [{
			index: 0,
			language: "",
			label: h("player.audioOriginal"),
			kind: "audio"
		}] : Bt.value), Qt = F(() => {
			if (Gt.value) return W.currentAudioTrack.value;
			if (Yt.value) {
				if (Jt.value >= 0) return Jt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Bt.value.length === 0 && Xt.value ? 0 : Ut.value;
		}), $t = K(!1), en = c.subtitleLang, tn = F(() => {
			let e = i.apiBase ?? "", t = N.value ? W.subtitleTracks.value : Hi(e, i.playbackSubtitleTracks ?? []);
			if (rn.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Hi(e, rn.value), a = new Set(t.map(n)), o = r.filter((e) => !a.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), nn = K(!1), rn = K([]), an = F(() => {
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
			let t = Lt.value.find((t) => t.language === (e.language || e.label));
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
		let dn = F(() => Lt.value.some((e) => e.language === c.subtitleLang));
		function fn() {
			let e = T.value;
			Lt.value = oe(e), Bt.value = re(e), Ut.value = te(e), ln(), un();
		}
		function pn() {
			if (dn.value) en = c.subtitleLang, c.setSubtitle(null);
			else {
				let e = en && Lt.value.some((e) => e.language === en) ? en : Lt.value[0]?.language ?? null;
				c.setSubtitle(e);
			}
			o("captions");
		}
		let mn = null;
		function hn(e) {
			if (!Xt.value) {
				if (Gt.value) W.setAudioTrack(e);
				else if (Yt.value) {
					if (e === Qt.value) return;
					Jt.value = e, mn = e, N.value = !0, ze(T.value?.currentTime ?? 0);
				} else ie(T.value, e), Ut.value = e;
			}
		}
		X(Gt, (e) => {
			if (!e || mn === null) return;
			let t = mn;
			mn = null, t >= 0 && t < W.audioTracks.value.length && W.setAudioTrack(t);
		}), X(tn, () => {
			De(() => fn());
		}, { deep: !0 });
		let gn = null, _n, yn = F(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), bn = !1;
		function xn() {
			if (!i.autoplay || bn || Q.value || Ie.value) return;
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
			k.value = !0, lr(), O.value = !0;
		}
		function An() {
			k.value = !1, dr();
		}
		function jn() {
			let e = T.value;
			e && (Tt !== null && e.currentTime > Ot && Ft(), c.updateProgress(e.currentTime, e.duration, En(e)), g.isInRoom && g.updateLocalPosition(e.currentTime));
		}
		function Mn() {
			let e = T.value;
			e && (e.volume = c.volume, e.muted = c.muted, e.playbackRate = c.rate, qe !== null && (e.currentTime = e.duration ? Math.min(e.duration, qe) : qe, qe = null), c.updateProgress(e.currentTime, e.duration, En(e)), c.setMediaPositionState(), fn());
		}
		function Nn() {
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
		function $(e) {
			let t = T.value;
			t && c.duration > 0 && (t.currentTime = Math.min(c.duration, Math.max(0, e)));
		}
		function zn(e) {
			$(c.position + e);
		}
		function Bn() {
			A.value = !0, dr();
		}
		function Vn() {
			A.value = !1, dr();
		}
		function Hn(e) {
			let t = w.reduce((e, t, n) => Math.abs(t - c.rate) < Math.abs(w[e] - c.rate) ? n : e, 0), n = w[Math.min(w.length - 1, Math.max(0, t + e))];
			c.setRate(n);
		}
		function Wn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Gn() {
			if (!i.markers) return;
			let e = c.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Kn() {
			le.value?.toggleOpen();
		}
		let qn = null;
		function Yn() {
			let e = T.value;
			if (!e) {
				c.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), c.pause();
				return;
			}
			qn !== null && (clearInterval(qn), qn = null);
			let t = .05;
			qn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(qn), qn = null, e.volume = 0, e.pause(), c.pause());
			}, 50);
		}
		m({
			playPause: Tn,
			seekBy: zn,
			frameStep: (e) => {
				c.playing || $(c.position + e / 30);
			},
			volumeBy: (e) => c.setVolume(c.volume + e),
			toggleMute: Xn,
			toggleFullscreen: nr,
			toggleCaptions: pn,
			toggleTheater: Zn,
			togglePip: or,
			skipIntro: Wn,
			skipOutro: Gn,
			sleepTimer: Kn,
			seekToPercent: (e) => $(e * c.duration),
			speedStep: Hn,
			toggleHelp: () => {
				ae.value = !ae.value;
			},
			toggleQuality: () => {
				N.value ? (fe.value = !fe.value, de.value?.toggleMenu?.()) : me.show({
					message: h("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !ae.value && !Wt.value && !$t.value });
		function Xn() {
			c.toggleMute();
		}
		function Zn() {
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
			e && (e.type === "seekTo" ? mt(e.value) : e.type === "seekBy" && mt(c.position + e.value));
		});
		function nr() {
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
		function sr() {
			M.value = !0;
		}
		function cr() {
			M.value = !1;
		}
		function lr() {
			_n &&= (clearTimeout(_n), void 0);
		}
		function ur() {
			lr(), !c.playing || A.value || k.value || (_n = setTimeout(() => {
				c.playing && !A.value && !k.value && (O.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function dr() {
			O.value = !0, ur();
		}
		let fr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", mr = "data-phlix-prev-tabindex", hr = "__phlix_no_tabindex__";
		function gr(e) {
			let t = E.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(fr) ? [n] : Array.from(n.querySelectorAll(fr));
				for (let n of t) if (e) {
					let e = n.getAttribute(mr);
					e === null || e === hr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(mr);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(mr, n.getAttribute("tabindex") ?? hr), n.setAttribute("tabindex", "-1"));
			}
		}
		X(O, (e) => {
			typeof document < "u" && (gr(e), !e && document.activeElement instanceof HTMLElement && E.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), X(() => c.playing, (e) => {
			e ? (Q.value = !1, St(), ur()) : (lr(), k.value = !1, O.value = !0);
		});
		let _r = null;
		ke(() => {
			c.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), _.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", ar), ce.value = document.pictureInPictureEnabled === !0), _r = c.bindMediaSession({
				onPlay: () => void T.value?.play()?.catch(() => {}),
				onPause: () => T.value?.pause(),
				onSeek: (e) => $(e)
			}), gn = T.value?.textTracks ?? null, gn?.addEventListener?.("addtrack", fn), gn?.addEventListener?.("removetrack", fn), fn(), N.value && ze(), Me(i.media.id);
		}), X(() => i.media, (e) => {
			c.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), pt();
		}), X(() => i.media?.id, () => {
			_.hydrate(i.media);
		}), X(() => g.currentSession, (e) => {
			e && (e.state === "playing" ? (T.value?.play()?.catch(() => {}), c.play()) : e.state === "paused" && (T.value?.pause(), c.pause()), g.updateLocalPosition(c.position), Math.abs(g.driftAmount) > 2 && mt(e.playbackPosition));
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
		}), Oe(() => {
			we?.reportFinal?.(), lr(), _t(), W.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", ar), _r?.(), gn?.removeEventListener?.("addtrack", fn), gn?.removeEventListener?.("removetrack", fn), qn !== null && (clearInterval(qn), qn = null), je !== null && (clearTimeout(je), je = null), Ft();
		}), (t, n) => (G(), R("div", {
			ref_key: "containerRef",
			ref: E,
			class: U(["player", {
				"is-chrome-hidden": !O.value,
				"is-theater": j.value
			}]),
			onPointermove: dr,
			onPointerdown: dr,
			onFocusin: dr
		}, [V(Un, {
			video: T.value,
			enabled: Y(u).atmosphere,
			playing: Y(c).playing,
			"reduced-motion": Y(u).effectiveReducedMotion,
			intensity: ve.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), z("div", Ui, [
			z("video", {
				ref_key: "videoRef",
				ref: T,
				class: "player__video",
				src: Fe.value,
				poster: Y(r)(e.media.poster_url) ?? void 0,
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
				onProgress: Nn,
				onVolumechange: Fn,
				onRatechange: In,
				onSeeked: Ln,
				onDurationchange: Rn,
				onEnded: bt,
				onError: Ct,
				onEnterpictureinpicture: sr,
				onLeavepictureinpicture: cr,
				onClick: Tn
			}, [(G(!0), R(P, null, q(tn.value, (e) => (G(), R("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Gi))), 128))], 40, Wi),
			n[22] ||= z("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[23] ||= z("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			k.value ? (G(), R("div", Ki, [V(ue, {
				size: 38,
				label: Y(h)("player.buffering")
			}, null, 8, ["label"]), z("span", qi, J(Y(h)("player.buffering")), 1)])) : L("", !0),
			z("div", Ji, [z("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Y(h)("player.back"),
				onClick: n[0] ||= Ne((e) => o("back"), ["stop"])
			}, [V(S, { name: "arrow-left" })], 8, Yi), z("div", Xi, [
				z("p", Zi, J(Y(h)("player.nowPlaying")), 1),
				z("h2", Qi, J(e.media.name), 1),
				z("div", $i, [(G(!0), R(P, null, q(yn.value, (e, t) => (G(), R(P, { key: t }, [t > 0 && !e.cert ? (G(), R("span", ea, "·")) : L("", !0), z("span", { class: U({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			Ie.value ? L("", !0) : (G(), R("div", ta, [
				O.value ? (G(), R("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": Y(h)("player.seekBackward"),
					onClick: n[1] ||= Ne((e) => zn(-10), ["stop"])
				}, [V(S, { name: "rewind" }), z("span", { class: "player__center-skip-count" }, J(10))], 8, na)) : L("", !0),
				z("button", {
					type: "button",
					class: U(["player__bigplay", { "is-playing": Y(c).playing }]),
					"aria-label": Y(c).playing ? Y(h)("player.pause") : Y(h)("player.play"),
					onClick: Ne(Tn, ["stop"])
				}, [V(S, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 10, ra),
				O.value ? (G(), R("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": Y(h)("player.seekForward"),
					onClick: n[2] ||= Ne((e) => zn(10), ["stop"])
				}, [V(S, { name: "forward" }), z("span", { class: "player__center-skip-count" }, J(10))], 8, ia)) : L("", !0)
			])),
			V(Ht, {
				video: T.value,
				language: Y(c).subtitleLang,
				"style-config": Y(u).captionStyle,
				lifted: O.value,
				"controls-root": D.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Ie.value ? L("", !0) : (G(), R("div", {
				key: 2,
				ref_key: "controlsRef",
				ref: D,
				class: "player__controls",
				onClick: n[9] ||= Ne(() => {}, ["stop"])
			}, [
				V(Ge, {
					position: Y(c).position,
					duration: Y(c).duration,
					buffered: Y(c).buffered,
					chapters: e.chapters,
					"thumbnail-at": Pe.value,
					onSeek: $,
					onScrubStart: Bn,
					onScrubEnd: Vn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				Y(u).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), I(hi, {
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
				])) : L("", !0),
				z("div", aa, [
					e.prevEpisode ? (G(), R("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(h)("player.previousEpisode"),
						onClick: Cn
					}, [V(S, { name: "skip-back" })], 8, oa)) : L("", !0),
					z("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Y(c).playing ? Y(h)("player.pause") : Y(h)("player.play"),
						onClick: Tn
					}, [V(S, { name: Y(c).playing ? "pause" : "play" }, null, 8, ["name"])], 8, sa),
					e.nextEpisode ? (G(), R("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(h)("player.nextEpisode"),
						onClick: wn
					}, [V(S, { name: "skip-forward" })], 8, ca)) : L("", !0),
					z("span", la, [
						B(J(Y(Be)(Y(c).position)), 1),
						n[18] ||= z("span", { class: "player__sep" }, " / ", -1),
						B(J(Y(Be)(Y(c).duration)), 1)
					]),
					n[19] ||= z("span", { class: "player__grow" }, null, -1),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__favorite", { "is-on": v.value }]),
						"aria-label": v.value ? Y(h)("itemActions.removeFavorite") : Y(h)("itemActions.addFavorite"),
						"aria-pressed": v.value ? "true" : "false",
						onClick: x
					}, [V(S, { name: v.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ua),
					V(p, {
						level: y.value,
						onCycle: C
					}, null, 8, ["level"]),
					V(kt),
					V(At),
					V(Vt, {
						ref_key: "qualityMenuRef",
						ref: de,
						open: fe.value,
						"onUpdate:open": n[3] ||= (e) => fe.value = e,
						levels: Y(W).levels.value,
						variants: Y(W).variants.value,
						"current-level": Y(W).currentLevel.value,
						"auto-enabled": Y(W).autoEnabled.value,
						"active-height": Y(W).activeLevelHeight.value,
						onSelect: Ve
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
						title: Y(h)("player.qualityDirectStream")
					}, J(Y(h)("player.directStream")), 9, da)),
					V(vn, {
						open: Wt.value,
						"onUpdate:open": n[4] ||= (e) => Wt.value = e,
						tracks: Lt.value,
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
					V(si, {
						open: $t.value,
						"onUpdate:open": n[6] ||= (e) => $t.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					V(bi, {
						ref_key: "sleepTimerRef",
						ref: le,
						"on-expire": Yn
					}, null, 512),
					z("button", {
						type: "button",
						class: U(["player__iconbtn player__syncplay", { "is-on": Y(g).isInRoom }]),
						"aria-label": Y(g).isInRoom ? Y(h)("syncplay.inRoom") : Y(h)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: n[7] ||= (e) => ge.value = !0
					}, [V(S, { name: "user" })], 10, fa),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(h)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: n[8] ||= (e) => ae.value = !0
					}, [V(S, { name: "info" })], 8, pa),
					ce.value ? (G(), R("button", {
						key: 3,
						type: "button",
						class: U(["player__iconbtn", { "is-on": M.value }]),
						"aria-label": M.value ? Y(h)("player.exitPip") : Y(h)("player.pip"),
						"aria-pressed": M.value,
						onClick: or
					}, [V(S, { name: "pip" })], 10, ma)) : L("", !0),
					z("button", {
						type: "button",
						class: U(["player__iconbtn", { "is-on": j.value }]),
						"aria-label": j.value ? Y(h)("player.exitTheater") : Y(h)("player.theater"),
						"aria-pressed": j.value,
						onClick: Zn
					}, [V(S, { name: "theater" })], 10, ha),
					z("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": ne.value ? Y(h)("player.exitFullscreen") : Y(h)("player.fullscreen"),
						onClick: nr
					}, [V(S, { name: ne.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ga)
				])
			], 512)),
			Ie.value ? L("", !0) : (G(), I(Hr, {
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
			Ie.value ? L("", !0) : (G(), I(Jr, {
				key: 4,
				position: Y(c).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Q.value && !Ie.value ? (G(), I(Jn, {
				key: 5,
				seconds: Ke.value,
				onResume: ht,
				onRestart: gt
			}, null, 8, ["seconds"])) : L("", !0),
			Je.value && ft.value && !Ie.value ? (G(), I(Ar, {
				key: 6,
				media: ft.value,
				remaining: Ye.value,
				total: Y(8),
				counting: Y(u).autoplay,
				onPlayNow: xt,
				onCancel: St
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : L("", !0),
			V(se, {
				modelValue: $e.value,
				"onUpdate:modelValue": n[10] ||= (e) => $e.value = e,
				title: `Similar ${Ze.value ?? "marker"}s`,
				size: "lg",
				onClose: ut
			}, {
				default: Z(() => [z("div", _a, [tt.value ? (G(), R("div", va, [V(ue, { label: "Finding similar media" })])) : nt.value ? (G(), R("div", ya, [V(S, {
					name: "error",
					class: "similar-modal__state-icon"
				}), z("p", ba, J(nt.value), 1)])) : !tt.value && et.value.length === 0 ? (G(), R("div", xa, [
					V(S, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					n[20] ||= z("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					n[21] ||= z("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), R("ul", Sa, [(G(!0), R(P, null, q(et.value, (e) => (G(), R("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [z("div", Ca, [e.poster_url ? (G(), R("img", {
					key: 0,
					src: Y(r)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, wa)) : (G(), R("div", Ta, [V(S, { name: "film" })]))]), z("div", Ea, [z("p", Da, J(e.name), 1), e.year ? (G(), R("p", Oa, [B(J(e.year) + " ", 1), e.runtime ? (G(), R("span", ka, " · " + J(e.runtime) + "m", 1)) : L("", !0)])) : L("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Le.value ? (G(), I(Vr, {
				key: 7,
				title: e.media.name,
				progress: Y(W).progress.value,
				onBack: n[11] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : L("", !0),
			Re.value ? (G(), I(Fr, {
				key: 8,
				title: e.media.name,
				onBack: n[12] ||= (e) => o("back")
			}, null, 8, ["title"])) : L("", !0),
			Y(g).isInRoom ? (G(), I(Bi, {
				key: 9,
				position: Y(c).position,
				duration: Y(c).duration,
				"is-playing": Y(c).playing,
				onSeek: $,
				onPlay: n[13] ||= (e) => void T.value?.play()?.catch(() => {}),
				onPause: n[14] ||= (e) => void T.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : L("", !0),
			Y(g).isInRoom ? (G(), I(Ai, { key: 10 })) : L("", !0),
			V(he, {
				modelValue: ge.value,
				"onUpdate:modelValue": n[15] ||= (e) => ge.value = e,
				onJoined: _e
			}, null, 8, ["modelValue"]),
			V(Dt, {
				open: ae.value,
				onClose: n[16] ||= (e) => ae.value = !1
			}, null, 8, ["open"]),
			V(Pn, {
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
}), [["__scopeId", "data-v-101a562c"]]), ja = "blur(3px) saturate(1.35)";
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
}, Fa = { class: "player-page__blocking-error" }, Ia = /*#__PURE__*/ x(/* @__PURE__ */ H({
	__name: "PlayerPage",
	setup(t) {
		let r = /* @__PURE__ */ new Map(), i = a(), { imgSrc: c } = l(), p = o(), m = Fe(), h = Ie(), { t: _ } = s(), v = Te("phlixConfig", null), y = d(), b = f(), ee = g(), x = K(null), S = K(""), C = K([]), w = K(null), T = K(null), E = K([]), te = K([]), D = K(!0), O = K(null), k = K(!1), ne = K(null), re = K(!1), A = K(null), ie = K(null), ae = F(() => String(m.params.id ?? ""));
		be(() => x.value?.name);
		let j = F(() => c(x.value?.poster_url) || ""), M = K(null);
		X(j, (e) => {
			if (M.value = null, !e) return;
			let t = typeof window < "u" && window.innerHeight > 0 ? window.innerWidth / window.innerHeight : 16 / 9;
			Ma(e, document, t).then((t) => {
				j.value === e && (M.value = t);
			});
		}, { immediate: !0 });
		let oe = F(() => {
			let e = M.value ?? j.value;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), le = null, ue = !1, de = 0;
		function pe(e) {
			return ue || e.generation !== de;
		}
		function me(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function he(e) {
			let t = p.value || i.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function P(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function we(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function H(e, t, n) {
			let r = () => pe(n), a = t.genres?.[0];
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
				if (r() || me(e)) return;
				y.setQueue([]);
			}
		}
		async function Ee(e, t, n) {
			let r = u(i.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function De(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Ae(e, t) {
			A.value = ve(e, t), ie.value = N(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && y.setQueue(r);
		}
		function q(e) {
			for (let t of r.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function je(e, t, n) {
			if (A.value = null, ie.value = null, !we(t)) return;
			let i = q(t.id);
			if (i) {
				Ae(i, t.id);
				return;
			}
			let a = () => pe(n);
			try {
				let i = await De(e, t, n.controller?.signal);
				if (a()) return;
				let o = await Ee(e, i.id, n.controller?.signal);
				if (a()) return;
				if (_e(o)) {
					let t = o.filter((e) => e.type === "season"), r = await Promise.all(t.map((t) => Ee(e, t.id, n.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...r.flat()];
				}
				let s = ge(o);
				s.length && r.set(i.id, s), Ae(s, t.id);
			} catch (e) {
				if (a() || me(e)) return;
				A.value = null, ie.value = null;
			}
		}
		async function Me() {
			let t = ae.value;
			le?.abort(), le = typeof AbortController < "u" ? new AbortController() : null, de += 1;
			let r = {
				generation: de,
				controller: le
			};
			if (D.value = !0, O.value = null, C.value = [], w.value = null, T.value = null, E.value = [], te.value = [], A.value = null, ie.value = null, y.hideMiniPlayer(), !t) {
				O.value = _("common.missingMediaId"), D.value = !1;
				return;
			}
			let a = new n({ baseUrl: i.value });
			a.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, r.controller?.signal).then((e) => {
				pe(r) || (C.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), w.value = P(e?.intro_marker), T.value = P(e?.outro_marker), E.value = ar(e?.audio_tracks), te.value = Ye(e?.subtitle_tracks));
			}).catch(() => null);
			let o = xe(t), s = Date.now();
			if (o && Se(o, s)) {
				Ne(a, o.item, r);
				return;
			}
			let c = null;
			try {
				c = (await a.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, r.controller?.signal)).item;
			} catch (t) {
				if (pe(r) || me(t)) return;
				if (t instanceof e && (t.status === 403 || t.status === 429)) {
					let e = Re(t.body, v?.locale);
					if (e !== null) {
						ne.value = e, re.value = !0, D.value = !1;
						return;
					}
				}
				if (o) {
					Ne(a, o.item, r);
					return;
				}
				O.value = ze(t, v?.locale), D.value = !1;
				return;
			}
			if (!pe(r)) {
				if (c) Ce(t, c, s), Ne(a, c, r);
				else {
					if (o) {
						Ne(a, o.item, r);
						return;
					}
					O.value = "Couldn’t load media item", D.value = !1;
				}
			}
		}
		async function Ne(e, t, n) {
			x.value = t, b.hydrate(t), S.value = he(t), D.value = !1, we(t) && (await je(e, t, n), pe(n) || ie.value) || H(e, t, n);
		}
		ke(Me), X(ae, Me), Pe(() => {
			y.current && y.streamUrl && y.showMiniPlayer();
		}), Oe(() => {
			ue = !0, le?.abort(), le = null, ee.reset();
		});
		function Le() {
			h?.back();
		}
		function Be(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ve(e) {
			h?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function He(e) {
			k.value = e, ee.setTheaterActive(e);
		}
		function Ue() {
			re.value = !1, Le();
		}
		return (e, t) => (G(), R("div", { class: U(["player-page", { "is-theater": k.value }]) }, [
			oe.value && !D.value && !O.value ? (G(), R("div", {
				key: 0,
				class: U(["player-page__ambient", { "is-preblurred": M.value }]),
				style: W(oe.value),
				"aria-hidden": "true"
			}, null, 6)) : L("", !0),
			z("div", Na, [D.value ? (G(), R("div", Pa, [V(ye, {
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
				actions: Z(() => [V(ce, {
					variant: "solid",
					onClick: Me
				}, {
					default: Z(() => [...t[1] ||= [B("Retry", -1)]]),
					_: 1
				}), V(ce, {
					variant: "ghost",
					onClick: Le
				}, {
					default: Z(() => [...t[2] ||= [B("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : x.value ? (G(), I(Aa, {
				key: 2,
				media: x.value,
				"stream-url": S.value,
				"stream-url-for": he,
				"api-base": Y(i),
				chapters: C.value,
				"intro-marker": w.value,
				"outro-marker": T.value,
				"playback-audio-tracks": E.value,
				"playback-subtitle-tracks": te.value,
				"prev-episode": A.value,
				"next-episode": ie.value,
				autoplay: !0,
				onBack: Le,
				onPlayNext: Be,
				onPlayEpisode: Ve,
				onTheater: He
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
				footer: Z(() => [V(ce, {
					variant: "solid",
					onClick: Ue
				}, {
					default: Z(() => [...t[3] ||= [B("OK", -1)]]),
					_: 1
				})]),
				default: Z(() => [z("p", Fa, J(ne.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-794d4505"]]);
export { Ia as default };

//# sourceMappingURL=PlayerPage-5onGq7ES.js.map