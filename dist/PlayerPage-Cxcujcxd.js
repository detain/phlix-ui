import { _ as e, a as t, h as n, t as r, v as i } from "./client-57OweUrJ.js";
import { n as a, r as o } from "./useApiBase-DXTBY90j.js";
import { r as s, t as c } from "./useImageSrc-CSM61b-l.js";
import { n as l } from "./media-query-D7hrCu8r.js";
import { i as u } from "./usePlayerStore-B7mnqLe3.js";
import { n as d, t as f } from "./ThumbRating-CHBeIZgN.js";
import { a as p, n as m, o as h, r as g, s as _, t as v } from "./shortcuts-CQXQp0In.js";
import { a as y } from "./usePreferencesStore-DrDMAwjz.js";
import { t as b } from "./useToastStore-Bu-iYU7r.js";
import { n as x, t as S } from "./Icon-CIbfiPrs.js";
import { t as C } from "./useMessages-DrceiftD.js";
import { t as w } from "./IconButton-Cp0n7kCc.js";
import { n as T } from "./useFocusTrap-FI3Uj9O8.js";
import { t as E } from "./Slider-CjiPl8gE.js";
import { t as D } from "./Select-ChFXd0gU.js";
import { a as O, c as ee, d as k, f as te, i as A, l as ne, n as re, o as ie, r as j, s as ae, t as oe, u as se } from "./captions-DV5mDPeu.js";
import { t as ce } from "./Modal-BU4hJGBA.js";
import { t as le } from "./Button-1sKEdGjj.js";
import { t as ue } from "./Chip-DC0SQtfn.js";
import { t as de } from "./Spinner-zawWdcUT.js";
import { t as fe } from "./Badge-C6LNO9Kk.js";
import { t as pe } from "./EmptyState-BjOJ1k_A.js";
import { n as me, r as he, t as ge } from "./SyncPlayModal-bHwEXjwC.js";
import { n as _e, o as ve, r as M, t as ye } from "./episode-order-DBEVgrOE.js";
import { t as be } from "./Skeleton-B2Mt2L00.js";
import { i as xe } from "./usePageTitle-j6j9gAmo.js";
import { n as Se, r as Ce, t as we } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as N, Transition as Te, computed as P, createBlock as F, createCommentVNode as I, createElementBlock as L, createElementVNode as R, createTextVNode as z, createVNode as B, defineComponent as V, inject as Ee, mergeModels as H, nextTick as De, normalizeClass as U, normalizeStyle as W, onBeforeUnmount as Oe, onMounted as ke, onScopeDispose as Ae, openBlock as G, ref as K, renderList as q, toDisplayString as J, toRef as je, unref as Y, useModel as Me, watch as X, withCtx as Z, withModifiers as Ne } from "vue";
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
], Ve = { class: "scrubber__track" }, He = ["title"], Ue = { class: "scrubber__time numeric" }, We = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let { t: r } = C(), i = e, a = n, o = K(null), s = K(!1), c = K(!1), l = K(0), u = K(0), d = (e) => Math.min(1, Math.max(0, e)), f = P(() => s.value ? l.value : i.duration > 0 ? d(i.position / i.duration) : 0), p = P(() => i.duration > 0 ? d(i.buffered / i.duration) : 0), m = P(() => (s.value || c.value) && i.duration > 0), h = P(() => s.value ? l.value : u.value), g = P(() => h.value * i.duration), _ = P(() => m.value ? i.thumbnailAt?.(g.value) ?? null : null), v = P(() => _.value ? `url("${_.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), y = P(() => `${Math.min(96, Math.max(4, h.value * 100))}%`), b = P(() => i.duration > 0 ? i.chapters.filter((e) => e.start > 0 && e.start < i.duration).map((e) => ({
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
		function O(e) {
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
		}), (t, n) => (G(), L("div", {
			ref_key: "trackEl",
			ref: o,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": Y(ze)(e.position),
			"aria-label": Y(r)("player.seek"),
			onPointerdown: S,
			onPointermove: w,
			onPointerup: T,
			onPointercancel: T,
			onPointerenter: E,
			onPointerleave: D,
			onKeydown: O
		}, [R("div", Ve, [
			R("div", {
				class: "scrubber__buffered",
				style: W({ transform: `scaleX(${p.value})` })
			}, null, 4),
			R("div", {
				class: "scrubber__played",
				style: W({ transform: `scaleX(${f.value})` })
			}, null, 4),
			(G(!0), L(N, null, q(b.value, (e, t) => (G(), L("span", {
				key: t,
				class: "scrubber__tick",
				style: W({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, He))), 128)),
			R("div", {
				class: U(["scrubber__head", { "is-dragging": s.value }]),
				style: W({ left: `${f.value * 100}%` })
			}, null, 6)
		]), m.value ? (G(), L("div", {
			key: 0,
			class: "scrubber__preview",
			style: W({ left: y.value }),
			"aria-hidden": "true"
		}, [_.value ? (G(), L("div", {
			key: 0,
			class: "scrubber__thumb",
			style: W({ backgroundImage: v.value })
		}, null, 4)) : I("", !0), R("span", Ue, J(Y(ze)(g.value)), 1)], 4)) : I("", !0)], 40, Be));
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
// src/composables/useHlsTranscode.ts
function lt(e) {
	let t = K("idle"), n = K(0), i = K([]), a = K([]), o = K(-1), s = K(!0), c = K(null), l = K(null), d = K([]), f = K(-1), p = K(null), m = K(null);
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
		i.value = t.map((e) => ({
			...e,
			url: ct(n, e.url)
		}));
	}
	let S = e.attach ?? _, C = e.pollIntervalMs ?? 1e3, w = e.maxWaitMs ?? 12e4, T = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), E = Math.max(1, Math.ceil(w / Math.max(1, C))), D = e.getToken ?? ut, O = null, ee = null, k = null, te = !1, A = null, ne = 0;
	function re() {
		return e.client ?? new r({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function ie(r, a, o, s) {
		ce(), te = !1;
		let c = ++ne, l = () => te || c !== ne;
		A = new AbortController(), t.value = "preparing", n.value = 0, i.value = [], g();
		try {
			let i = re(), c = it(await i.post(Xe(a, o), void 0, A.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			x(c.subtitles), b(c.variants), p.value = c.jobId, m.value = ct(e.apiBase(), c.masterUrl);
			let d = c.status === "completed";
			for (let e = 0; !d && e < E; e++) {
				let e = at(await i.get(rt(c.jobId), void 0, A.signal));
				if (l()) return;
				if (n.value = e.progress, x(e.subtitles), b(e.variants), st(e.status)) throw Error(`transcode ${e.status}`);
				if (ot(e)) {
					d = !0;
					break;
				}
				if (await T(C), l()) return;
			}
			if (!d) throw Error("transcode timed out");
			let f = await S(r, m.value, {
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
					f.destroy();
				} catch {}
				return;
			}
			O = f, ee = O.onLevelSwitched((e) => h(e)), k = O.onAudioTrackSwitched((e) => v(e)), h(), v();
			try {
				let e = u();
				e.hlsMasterUrl = m.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function j(e) {
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
		if (te = !0, A &&= (A.abort(), null), ee) {
			try {
				ee();
			} catch {}
			ee = null;
		}
		if (k) {
			try {
				k();
			} catch {}
			k = null;
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
		ce(), t.value = "idle", n.value = 0, i.value = [], g(), y();
		try {
			u().hlsMasterUrl = "";
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
		audioTracks: d,
		currentAudioTrack: f,
		setLevel: j,
		setNextLevel: ae,
		setAudioTrack: oe,
		jobId: p,
		masterUrl: m,
		loadVariantPlaylist: se,
		start: ie,
		cleanup: ce,
		reset: le
	};
}
function ut() {
	try {
		return t().getAccessToken();
	} catch {
		return null;
	}
}
// src/composables/useTrickplay.ts
var dt = 10;
function ft(e) {
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
		let i = r.frame, a = i % dt, o = Math.floor(i / dt), c = a / 9 * 100, l = o / 5 * 100;
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
var pt = ["aria-label"], mt = { class: "shortcuts__head" }, ht = { class: "shortcuts__title" }, gt = { class: "shortcuts__grid" }, _t = { class: "shortcuts__keys" }, vt = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, yt = {
	key: 1,
	class: "shortcuts__key"
}, bt = { class: "shortcuts__label" }, xt = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => g }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = C(), a = K(null);
		return T(a, je(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (G(), L("div", {
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
		}, [R("div", mt, [R("h3", ht, J(Y(i)("player.keyboard")), 1), B(w, {
			name: "x",
			label: Y(i)("common.close"),
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		}, null, 8, ["label"])]), R("ul", gt, [(G(!0), L(N, null, q(e.shortcuts, (e) => (G(), L("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [R("span", _t, [(G(!0), L(N, null, q(e.keys, (e, t) => (G(), L(N, { key: t }, [e === "–" ? (G(), L("span", vt, "–")) : (G(), L("kbd", yt, [Y(v)[e] ? (G(), F(S, {
			key: 0,
			name: Y(v)[e],
			label: Y(m)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), L(N, { key: 1 }, [z(J(e), 1)], 64))]))], 64))), 128))]), R("span", bt, J(e.label), 1)]))), 128))])], 8, pt)])) : I("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), St = { class: "volume" }, Ct = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "VolumeControl",
	setup(e) {
		let t = u(), n = y(), { t: r } = C(), i = P(() => t.muted ? 0 : t.volume), a = P(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function o(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return X(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (G(), L("div", St, [B(w, {
			name: a.value,
			label: Y(t).muted ? Y(r)("player.unmute") : Y(r)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => Y(t).toggleMute()
		}, null, 8, ["name", "label"]), B(E, {
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
}), [["__scopeId", "data-v-e76a3b82"]]), wt = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		], n = u(), { t: r } = C(), i = P(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), F(D, {
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
var Ft = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let r = e, i = Me(e, "open"), a = K(null);
		function o() {
			a.value?.toggleMenu();
		}
		let s = n, c = u(), l = y(), { t: d } = C(), f = P(() => kt(r.levels)), p = P(() => {
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
		}), m = P(() => f.value.length >= 2 ? f.value : p.value), h = P(() => r.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), g = P(() => jt(r.levels, h.value)), _ = P(() => h.value && g.value >= 0 ? {
			value: Et,
			label: d("player.qualityOriginal", { height: h.value.height })
		} : null), v = P(() => m.value.length >= 2), b = P(() => r.activeHeight == null ? d("player.qualityAuto") : d("player.qualityAutoActive", { label: Ot(r.activeHeight) })), x = P(() => [
			{
				value: Tt,
				label: b.value
			},
			..._.value ? [_.value] : [],
			...m.value
		]), S = P(() => r.autoEnabled ? Tt : _.value && r.currentLevel === g.value && (c.quality === "original" || l.defaultQuality === "original") ? Et : Pt(r.levels, r.currentLevel));
		function w(e) {
			let t = String(e);
			if (t === "auto") {
				c.setQuality(t), l.defaultQuality = t, s("select", "auto");
				return;
			}
			let n = t === "original" ? g.value : At(r.levels, t);
			c.setQuality(t), l.defaultQuality = t, n >= 0 ? s("select", n) : s("select", t);
		}
		return t({ toggleMenu: o }), (e, t) => v.value || i.value ? (G(), F(D, {
			key: 0,
			ref_key: "selectRef",
			ref: a,
			class: "quality-menu",
			tone: "glass",
			"model-value": S.value,
			options: x.value,
			label: Y(d)("player.quality"),
			open: i.value,
			"onUpdate:open": t[0] ||= (e) => i.value = e,
			"onUpdate:modelValue": w
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]), It = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = K(0), a = P(() => n.lifted ? i.value : 0), o = P(() => ({
			...ee(n.styleConfig),
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
			r.value = k(d);
		}
		function h() {
			p != null && (clearTimeout(p), p = null);
		}
		function g() {
			h(), p = setTimeout(() => {
				if (p = null, !d) return;
				ae(n.video, n.language);
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
			_(), ae(n.video, n.language);
			let e = te(n.video, n.language);
			if (e) {
				if (d = e, e.addEventListener("cuechange", m), r.value = k(e), !r.value.length) {
					let t = v(n.video, e);
					t && t.readyState !== 2 && (f = t, t.addEventListener("load", m));
				}
				g();
			} else r.value = [];
		}
		return X(() => [n.video, n.language], y, { immediate: !0 }), Oe(_), t({ lines: r }), (t, n) => r.value.length ? (G(), L("div", {
			key: 0,
			class: U(["player__captions", { "is-lifted": e.lifted }]),
			style: W(o.value)
		}, [(G(!0), L(N, null, q(r.value, (e, t) => (G(), L("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : I("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), Lt = ["aria-label", "aria-expanded"], Rt = ["aria-label"], zt = { class: "capmenu__head" }, Bt = { class: "capmenu__title" }, Vt = ["aria-label"], Ht = ["aria-checked", "tabindex"], Ut = { class: "capmenu__check" }, Wt = { class: "capmenu__optlabel" }, Gt = [
	"aria-checked",
	"tabindex",
	"onClick"
], Kt = { class: "capmenu__check" }, qt = { class: "capmenu__optlabel" }, Jt = { class: "capmenu__check" }, Yt = { class: "capmenu__optlabel" }, Xt = { class: "capmenu__title capmenu__title--sub" }, Zt = ["aria-label"], Qt = [
	"aria-checked",
	"tabindex",
	"onClick"
], $t = { class: "capmenu__check" }, en = { class: "capmenu__optlabel" }, tn = { class: "capmenu__title capmenu__title--sub" }, nn = { class: "capmenu__style" }, rn = { class: "capmenu__field" }, an = { class: "capmenu__fieldlabel" }, on = { class: "capmenu__field" }, sn = { class: "capmenu__fieldlabel" }, cn = { class: "capmenu__field" }, ln = { class: "capmenu__fieldlabel" }, un = { class: "capmenu__field" }, dn = { class: "capmenu__fieldlabel" }, fn = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let n = e, r = t, i = u(), a = y(), { t: o } = C(), s = K(null), c = K(null), l = P(() => i.subtitleLang), d = P(() => n.tracks.some((e) => e.language === l.value)), f = P(() => d.value ? "captions" : "captions-off"), p = P(() => d.value ? n.tracks.findIndex((e) => e.language === l.value) + 1 : 0), m = P(() => n.activeAudio >= 0 ? n.activeAudio : 0);
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
		function O(e) {
			let t = x(e, n.audioTracks.length, m.value);
			t !== null && v(n.audioTracks[t].index);
		}
		function ee(e) {
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
		function te(e) {
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
		T(c, je(n, "open"), {
			lockScroll: !1,
			onEscape: () => (g(), !0)
		});
		function ie(e) {
			s.value && !s.value.contains(e.target) && g();
		}
		return X(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", ie, !0) : document.removeEventListener("pointerdown", ie, !0));
		}, { immediate: !0 }), Oe(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", ie, !0);
		}), (t, n) => (G(), L("div", {
			ref_key: "rootEl",
			ref: s,
			class: "capmenu"
		}, [R("button", {
			type: "button",
			class: U(["capmenu__btn", { "is-active": d.value }]),
			"aria-label": d.value ? Y(o)("player.captionsOn") : Y(o)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => h(!e.open)
		}, [B(S, { name: f.value }, null, 8, ["name"])], 10, Lt), e.open ? (G(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: c,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(o)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			R("div", zt, [R("h3", Bt, J(Y(o)("player.subtitles")), 1), B(w, {
				name: "x",
				label: Y(o)("common.close"),
				size: "sm",
				onClick: g
			}, null, 8, ["label"])]),
			R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(o)("player.subtitleTrack"),
				onKeydown: E
			}, [R("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !d.value,
				tabindex: p.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => _(null)
			}, [R("span", Ut, [d.value ? I("", !0) : (G(), F(S, {
				key: 0,
				name: "check"
			}))]), R("span", Wt, J(Y(o)("player.off")), 1)], 8, Ht), (G(!0), L(N, null, q(e.tracks, (e, t) => (G(), L("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": l.value === e.language,
				tabindex: p.value === t + 1 ? 0 : -1,
				onClick: (t) => _(e.language)
			}, [R("span", Kt, [l.value === e.language ? (G(), F(S, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", qt, J(e.label), 1)], 8, Gt))), 128))], 40, Vt),
			R("button", {
				type: "button",
				class: "capmenu__add",
				onClick: b
			}, [R("span", Jt, [B(S, { name: "plus" })]), R("span", Yt, J(Y(o)("player.addSubtitles")), 1)]),
			e.audioTracks.length > 1 ? (G(), L(N, { key: 0 }, [R("h3", Xt, J(Y(o)("player.audio")), 1), R("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": Y(o)("player.audioTrack"),
				onKeydown: O
			}, [(G(!0), L(N, null, q(e.audioTracks, (t) => (G(), L("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: m.value === t.index ? 0 : -1,
				onClick: (e) => v(t.index)
			}, [R("span", $t, [e.activeAudio === t.index ? (G(), F(S, {
				key: 0,
				name: "check"
			})) : I("", !0)]), R("span", en, J(t.label), 1)], 8, Qt))), 128))], 40, Zt)], 64)) : I("", !0),
			R("h3", tn, J(Y(o)("player.captionStyle")), 1),
			R("div", nn, [
				R("div", rn, [R("span", an, J(Y(o)("player.size")), 1), B(D, {
					"model-value": Y(a).captionStyle.size,
					options: Y(A),
					label: Y(o)("player.captionSize"),
					"onUpdate:modelValue": ee
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", on, [R("span", sn, J(Y(o)("player.color")), 1), B(D, {
					"model-value": Y(a).captionStyle.textColor,
					options: Y(re),
					label: Y(o)("player.captionColor"),
					"onUpdate:modelValue": k
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", cn, [R("span", ln, J(Y(o)("player.background")), 1), B(D, {
					"model-value": Y(a).captionStyle.background,
					options: Y(oe),
					label: Y(o)("player.captionBackground"),
					"onUpdate:modelValue": te
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				R("div", un, [R("span", dn, J(Y(o)("player.edge")), 1), B(D, {
					"model-value": Y(a).captionStyle.edge,
					options: Y(j),
					label: Y(o)("player.captionEdge"),
					"onUpdate:modelValue": ne
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Rt)) : I("", !0)], 512));
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
}, On = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let n = e, a = t, { t: o } = C(), s = b(), c = [
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
		let u = P(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let r of [...n.preferredLangs, ...c]) {
				let n = (r || "").toLowerCase();
				n && !e.has(n) && (e.add(n), t.push(n));
			}
			return t;
		}), d = K(/* @__PURE__ */ new Set());
		function f() {
			let e = /* @__PURE__ */ new Set();
			for (let t of n.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), d.value = e;
		}
		function p(e) {
			let t = new Set(d.value);
			t.has(e) ? t.delete(e) : t.add(e), d.value = t;
		}
		let m = K(!1), h = K(!1), g = K([]), _ = K(/* @__PURE__ */ new Set()), v = K(/* @__PURE__ */ new Set());
		function y(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let x = P(() => [...g.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), w = P(() => d.value.size > 0 && !m.value);
		function T() {
			return n.client ?? new r({ baseUrl: n.apiBase ?? "" });
		}
		async function E() {
			if (w.value) {
				m.value = !0, h.value = !0;
				try {
					g.value = await T().searchSubtitles(n.mediaId, [...d.value]);
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
		function O(e) {
			if (e instanceof i) {
				if (e.status === 429) {
					let t = e.body && typeof e.body == "object" ? e.body : {}, n = typeof t.downloadsRemaining == "number" ? t.downloadsRemaining : null, r = typeof t.resetTimeUtc == "string" ? t.resetTimeUtc : null;
					r ? s.warning(o("player.subtitleQuotaReset", { time: ee(r) })) : n === null ? s.warning(o("player.subtitleQuota")) : s.warning(o("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (e.status === 404) {
					s.error(o("player.subtitleAddNotFound"));
					return;
				}
			}
			s.error(o("player.subtitleAddError"));
		}
		function ee(e) {
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
			let r = new Set(_.value);
			r.add(t), _.value = r;
			try {
				let r = Je([(await T().downloadSubtitle(n.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], i = new Set(v.value);
				i.add(t), v.value = i;
				let c = l(e.language);
				s.success(c ? o("player.subtitleAdded", { language: c }) : o("player.subtitleAddedGeneric")), r && a("added", r);
			} catch (e) {
				O(e);
			} finally {
				let e = new Set(_.value);
				e.delete(t), _.value = e;
			}
		}
		return X(() => n.open, (e) => {
			e && (f(), g.value = [], h.value = !1, m.value = !1, _.value = /* @__PURE__ */ new Set(), v.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (t, n) => (G(), F(ce, {
			"model-value": e.open,
			title: Y(o)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": n[0] ||= (e) => a("update:open", e)
		}, {
			footer: Z(() => [B(le, {
				variant: "ghost",
				onClick: D
			}, {
				default: Z(() => [z(J(Y(o)("common.close")), 1)]),
				_: 1
			})]),
			default: Z(() => [R("div", pn, [
				R("fieldset", mn, [R("legend", hn, J(Y(o)("player.subtitleSearchLanguages")), 1), R("div", gn, [(G(!0), L(N, null, q(u.value, (e) => (G(), F(ue, {
					key: e,
					selected: d.value.has(e),
					size: "md",
					"aria-label": l(e),
					"onUpdate:selected": (t) => p(e)
				}, {
					default: Z(() => [z(J(l(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				R("div", _n, [B(le, {
					variant: "solid",
					"left-icon": "search",
					loading: m.value,
					disabled: !w.value,
					onClick: E
				}, {
					default: Z(() => [z(J(Y(o)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				m.value ? (G(), L("div", vn, [B(de, { label: Y(o)("player.subtitleSearching") }, null, 8, ["label"]), R("span", null, J(Y(o)("player.subtitleSearching")), 1)])) : h.value && x.value.length === 0 ? (G(), F(pe, {
					key: 1,
					icon: "captions",
					title: Y(o)("player.subtitleSearchEmpty"),
					description: Y(o)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : h.value ? (G(), L("ul", bn, [(G(!0), L(N, null, q(x.value, (e) => (G(), L("li", {
					key: y(e),
					class: "subsearch__item"
				}, [R("div", xn, [R("p", Sn, J(e.releaseName || e.provider), 1), R("div", Cn, [
					B(fe, {
						tone: "neutral",
						size: "sm"
					}, {
						default: Z(() => [z(J(l(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (G(), F(fe, {
						key: 0,
						tone: "info",
						size: "sm",
						label: Y(o)("player.subtitleHearingImpairedFull")
					}, {
						default: Z(() => [z(J(Y(o)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : I("", !0),
					R("span", wn, J(e.provider), 1),
					e.rating > 0 ? (G(), L("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": Y(o)("player.subtitleRating", { rating: e.rating })
					}, [B(S, { name: "star" }), z(" " + J(e.rating), 1)], 8, Tn)) : I("", !0),
					e.downloadCount > 0 ? (G(), L("span", En, J(Y(o)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : I("", !0),
					e.fps ? (G(), L("span", Dn, J(Y(o)("player.subtitleFps", { fps: e.fps })), 1)) : I("", !0)
				])]), B(le, {
					variant: "outline",
					size: "sm",
					"left-icon": v.value.has(y(e)) ? "check" : "plus",
					loading: _.value.has(y(e)),
					disabled: _.value.has(y(e)) || v.value.has(y(e)),
					"aria-label": Y(o)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => k(e)
				}, {
					default: Z(() => [z(J(_.value.has(y(e)) ? Y(o)("player.subtitleAdding") : Y(o)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (G(), L("p", yn, J(Y(o)("player.subtitleSearchPrompt")), 1))
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
var Fn = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
			r.value = Pn(i);
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
		X(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			w(), e && t && C();
		}, { immediate: !0 }), ke(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), Oe(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let T = P(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (G(), L("div", {
			class: U(["player__ambient", { "is-active": o.value }]),
			style: W(o.value ? T.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), $ = ["aria-label"], In = { class: "resume__label" }, Ln = { class: "resume__time numeric" }, Rn = { class: "resume__actions" }, zn = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = C(), i = P(() => r("player.resumeFrom").split("{time}"));
		return (t, a) => (G(), L("div", {
			class: "resume",
			role: "region",
			"aria-label": Y(r)("player.resumePlayback")
		}, [R("p", In, [
			z(J(i.value[0]), 1),
			R("span", Ln, J(Y(ze)(e.seconds)), 1),
			z(J(i.value[1]), 1)
		]), R("div", Rn, [R("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: a[0] ||= (e) => n("resume")
		}, [B(S, { name: "play" }), R("span", null, J(Y(r)("player.resume")), 1)]), R("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: a[1] ||= (e) => n("restart")
		}, [B(S, { name: "rewind" }), R("span", null, J(Y(r)("player.startOver")), 1)])])], 8, $));
	}
}), [["__scopeId", "data-v-271c5209"]]), Bn = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Vn = /* @__PURE__ */ new Set([
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
function Hn(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Un(...e) {
	return e.some((e) => Vn.has(Hn(e)));
}
function Wn(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Gn(e) {
	return e?.error?.code === 2;
}
var Kn = 3e4;
function qn(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && er.get(t) === "hevc";
}
function Jn(e) {
	let t = { forceTranscode: "1" };
	return qn(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function Yn(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
function Xn(e) {
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
var Zn = 2 * Math.PI * 15;
function Qn(e, t, n = Zn) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var $n = /* @__PURE__ */ new Map([
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
]), er = /* @__PURE__ */ new Map([
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
]), tr = /* @__PURE__ */ new Set(["h264"]), nr = /* @__PURE__ */ new Map([
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
function rr(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = er.get(t);
	return n === void 0 ? "transcode" : tr.has(n) ? "direct" : "probe";
}
function ir(e) {
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
var ar = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function or(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return ar.get(t) ?? "video/mp4";
}
function sr(e, t = "video/mp4") {
	let n = $n.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function cr(e, t = "video/mp4") {
	if (!e) return !0;
	let n = sr(e, t);
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
async function lr(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = er.get(n), i = r === void 0 ? void 0 : nr.get(r);
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
async function ur(e, t, n = "") {
	if (Un(...e)) return !0;
	let r = e.map((e) => Hn(e)).find((e) => Bn.includes(e)) ?? "";
	if (!Bn.includes(r)) return !1;
	let i = or(r), a = rr(n);
	if (a === "transcode" || a === "probe" && !await lr(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await cr(e.codec, i)) return !0;
	}
	return !1;
}
// src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var dr = ["aria-label"], fr = ["src"], pr = { class: "upnext__body" }, mr = { class: "upnext__eyebrow" }, hr = { class: "upnext__title" }, gr = {
	key: 0,
	class: "upnext__cd numeric"
}, _r = { class: "upnext__actions" }, vr = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, yr = ["r"], br = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], xr = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let { t: n } = C(), { imgSrc: r } = c(), i = e, a = t, o = P(() => i.posterUrl ?? i.media.poster_url ?? null), s = P(() => Qn(i.remaining, i.total));
		return (t, i) => (G(), L("aside", {
			class: "upnext",
			role: "region",
			"aria-label": Y(n)("player.upNext")
		}, [
			o.value ? (G(), L("img", {
				key: 0,
				class: "upnext__thumb",
				src: Y(r)(o.value),
				alt: "",
				loading: "lazy"
			}, null, 8, fr)) : I("", !0),
			R("div", pr, [
				R("p", mr, J(Y(n)("player.upNext")), 1),
				R("h4", hr, J(e.media.name), 1),
				e.counting ? (G(), L("p", gr, J(Y(n)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : I("", !0),
				R("div", _r, [R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: i[0] ||= (e) => a("play-now")
				}, [B(S, { name: "play" }), R("span", null, J(Y(n)("player.playNow")), 1)]), R("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: i[1] ||= (e) => a("cancel")
				}, J(Y(n)("player.cancel")), 1)])
			]),
			e.counting ? (G(), L("svg", vr, [R("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, yr), R("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Y(Zn),
				"stroke-dashoffset": s.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, br)])) : I("", !0)
		], 8, dr));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), Sr = {
	class: "transcode",
	role: "alert"
}, Cr = { class: "transcode__card" }, wr = { class: "transcode__heading" }, Tr = { class: "transcode__body" }, Er = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = C();
		return (t, i) => (G(), L("div", Sr, [R("div", Cr, [
			B(S, {
				name: "alert",
				class: "transcode__icon"
			}),
			R("h3", wr, J(Y(r)("player.transcodeHeading")), 1),
			R("p", Tr, J(e.title ? Y(r)("player.transcodeBodyTitled", { title: e.title }) : Y(r)("player.transcodeBodyUntitled")), 1),
			R("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [B(S, { name: "arrow-left" }), R("span", null, J(Y(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Dr = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Or = { class: "prep__card" }, kr = { class: "prep__heading" }, Ar = { class: "prep__body" }, jr = ["aria-valuenow"], Mr = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = C(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (G(), L("div", Dr, [R("div", Or, [
			B(S, {
				name: "spinner",
				class: "prep__spinner"
			}),
			R("h3", kr, J(Y(n)("player.transcodePreparingHeading")), 1),
			R("p", Ar, J(e.title ? Y(n)("player.transcodePreparingTitled", { title: e.title }) : Y(n)("player.transcodePreparingUntitled")), 1),
			R("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [R("div", {
				class: "prep__bar-fill",
				style: W({ width: r() + "%" })
			}, null, 4)], 8, jr),
			R("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [B(S, { name: "arrow-left" }), R("span", null, J(Y(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Nr = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let o = P(() => a(n.position, n.introMarker) ? {
			label: i("player.skipIntro"),
			target: n.introMarker.end
		} : a(n.position, n.outroMarker) ? {
			label: i("player.skipOutro"),
			target: n.outroMarker.end
		} : null);
		function s() {
			o.value && r("skip", o.value.target);
		}
		return (e, t) => (G(), F(Te, { name: "skip" }, {
			default: Z(() => [o.value ? (G(), L("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: Ne(s, ["stop"])
			}, [R("span", null, J(o.value.label), 1), B(S, { name: "skip-forward" })])) : I("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Pr = ["aria-label"], Fr = ["aria-label", "onClick"], Ir = { class: "skip-controls__label" }, Lr = 5, Rr = 30, zr = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
			let n = a(e.startMs), r = n - Lr, i = n + Rr;
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
		let u = P(() => !n.markers || n.markers.length === 0 ? [] : n.markers.filter((e) => c.includes(e.type) && s(e, n.position)).sort((e, t) => e.startMs - t.startMs));
		function d(e) {
			r("skip", a(e.startMs));
		}
		return (e, t) => u.value.length > 0 ? (G(), L("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": Y(i)("player.skipControls")
		}, [(G(!0), L(N, null, q(u.value, (e) => (G(), L("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${l(e.type)}`,
			onClick: Ne((t) => d(e), ["stop"])
		}, [R("span", Ir, J(l(e.type)), 1), B(S, { name: "skip-forward" })], 8, Fr))), 128))], 8, Pr)) : I("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Br = ["aria-label", "aria-expanded"], Vr = ["aria-label"], Hr = { class: "chapterlist__head" }, Ur = { class: "chapterlist__title" }, Wr = ["aria-label"], Gr = ["onClick"], Kr = { class: "chapterlist__index" }, qr = { class: "chapterlist__name" }, Jr = { class: "chapterlist__meta" }, Yr = { class: "chapterlist__time" }, Xr = {
	key: 0,
	class: "chapterlist__duration"
}, Zr = {
	key: 1,
	class: "chapterlist__empty"
}, Qr = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let s = P(() => n.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = ze(e.start), a;
			return e.end != null && e.end > e.start && (a = ze(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), c = K(null), l = K(null);
		T(l, je(n, "open"), {
			lockScroll: !1,
			onEscape: () => (a(), !0)
		});
		function u(e) {
			c.value && !c.value.contains(e.target) && a();
		}
		X(() => n.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", u, !0) : document.removeEventListener("pointerdown", u, !0));
		}), Oe(() => {
			document.removeEventListener("pointerdown", u, !0);
		});
		function d(e) {
			r("seek", e.start), a();
		}
		return (t, n) => (G(), L("div", {
			ref_key: "rootEl",
			ref: c,
			class: "chapterlist"
		}, [R("button", {
			type: "button",
			class: U(["chapterlist__btn player__iconbtn", { "is-active": e.open }]),
			"aria-label": Y(i)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: o
		}, [B(S, { name: "list" })], 10, Br), e.open ? (G(), L("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": Y(i)("player.chapterList"),
			tabindex: "-1"
		}, [R("div", Hr, [R("h3", Ur, J(Y(i)("player.chapters")), 1), B(w, {
			name: "x",
			label: Y(i)("common.close"),
			size: "sm",
			onClick: a
		}, null, 8, ["label"])]), s.value.length > 0 ? (G(), L("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": Y(i)("player.chapterList")
		}, [(G(!0), L(N, null, q(s.value, (e) => (G(), L("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [R("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => d(e.chapter)
		}, [
			R("span", Kr, J(e.index), 1),
			R("span", qr, J(e.label), 1),
			R("span", Jr, [R("span", Yr, J(e.startLabel), 1), e.durationLabel ? (G(), L("span", Xr, "· " + J(e.durationLabel), 1)) : I("", !0)])
		], 8, Gr)]))), 128))], 8, Wr)) : (G(), L("p", Zr, J(Y(i)("player.noChapters")), 1))], 8, Vr)) : I("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), $r = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, ei = { class: "marker-timeline__ticks" }, ti = [
	"title",
	"aria-label",
	"onClick"
], ni = { class: "marker-timeline__tooltip" }, ri = { class: "marker-timeline__tooltip-label" }, ii = { class: "marker-timeline__tooltip-time numeric" }, ai = ["onClick"], oi = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		}, [l.value ? (G(), L("div", $r, [t[0] ||= R("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [R("polygon", { points: "5,3 19,12 5,21" })], -1), z(" " + J(u.value), 1)])) : I("", !0), R("div", ei, [(G(!0), L(N, null, q(s.value, (e) => (G(), L("button", {
			key: e.id,
			type: "button",
			class: U(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: W({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${Y(ze)(e.startSec)}`,
			"aria-label": `${e.label} at ${Y(ze)(e.startSec)}`,
			onClick: Ne((t) => d(e), ["stop"])
		}, [R("span", ni, [
			R("span", ri, J(e.label), 1),
			R("span", ii, J(Y(ze)(e.startSec)), 1),
			R("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: Ne((t) => f(e), ["stop"])
			}, " Find similar ", 8, ai)
		])], 14, ti))), 128))])], 2)) : I("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), si = ["aria-label", "aria-expanded"], ci = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, li = ["aria-label"], ui = ["aria-selected", "onClick"], di = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		], a = K(0), o = K(0), s = P(() => o.value > 0), c;
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
		let p = K(!1);
		function m() {
			s.value ? (d(0), p.value = !1) : p.value = !p.value;
		}
		function h(e) {
			d(e), p.value = !1;
		}
		return Oe(() => {
			l();
		}), t({ toggleOpen: m }), (e, t) => (G(), L("div", { class: U(["sleep-timer", { "is-active": s.value }]) }, [R("button", {
			type: "button",
			class: U(["sleep-timer__trigger", { "is-active": s.value }]),
			"aria-label": s.value ? `Sleep timer: ${f(o.value)} remaining` : Y(r)("player.sleepTimer"),
			"aria-expanded": p.value,
			"aria-haspopup": "listbox",
			onClick: m
		}, [B(S, { name: "moon" }), s.value ? (G(), L("span", ci, J(f(o.value)), 1)) : I("", !0)], 10, si), B(Te, { name: "dropdown" }, {
			default: Z(() => [p.value ? (G(), L("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": Y(r)("player.sleepTimer")
			}, [(G(), L(N, null, q(i, (e) => R("li", {
				key: e.value,
				class: U(["sleep-timer__option", { "is-selected": a.value === e.value }]),
				role: "option",
				"aria-selected": a.value === e.value,
				onClick: (t) => h(e.value)
			}, J(e.label), 11, ui)), 64))], 8, li)) : I("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), fi = {
	key: 0,
	class: "syncplay-overlay"
}, pi = { class: "syncplay-overlay__badge" }, mi = { class: "syncplay-overlay__label" }, hi = { class: "syncplay-overlay__status-label" }, gi = { class: "syncplay-overlay__members" }, _i = { class: "syncplay-overlay__member-count" }, vi = { class: "syncplay-overlay__member-list" }, yi = { class: "syncplay-overlay__member-name" }, bi = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, xi = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(e) {
		let t = e, { t: n } = C(), r = me(), i = a(), o = P(() => t.apiBase ?? i.value), s = P(() => r.currentRoom?.name ?? "SyncPlay"), c = P(() => r.onlineMembers.length), l = P(() => r.syncStatus), u = P(() => {
			switch (l.value) {
				case "synced": return n("syncplay.synced");
				case "outOfSync": return n("syncplay.outOfSync");
				case "re-syncing": return n("syncplay.reSyncing");
				default: return n("syncplay.synced");
			}
		}), d = P(() => {
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
		return (e, t) => Y(r).isInRoom ? (G(), L("div", fi, [
			R("div", pi, [B(S, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), R("span", mi, "SyncPlay: " + J(s.value), 1)]),
			R("div", { class: U(["syncplay-overlay__status", `syncplay-overlay__status--${l.value}`]) }, [B(S, {
				name: d.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), R("span", hi, J(u.value), 1)], 2),
			R("div", gi, [R("span", _i, [B(S, { name: "user" }), z(" " + J(Y(n)("syncplay.members", { count: c.value })), 1)]), R("ul", vi, [(G(!0), L(N, null, q(Y(r).onlineMembers.slice(0, 5), (e) => (G(), L("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [t[0] ||= R("span", { class: "syncplay-overlay__member-dot" }, null, -1), R("span", yi, J(e.name), 1)]))), 128)), Y(r).onlineMembers.length > 5 ? (G(), L("li", bi, " +" + J(Y(r).onlineMembers.length - 5) + " more ", 1)) : I("", !0)])]),
			B(le, {
				variant: "ghost",
				size: "sm",
				onClick: f
			}, {
				default: Z(() => [z(J(Y(n)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), Si = {
	key: 0,
	class: "syncplay-controls"
}, Ci = ["aria-label"], wi = { class: "syncplay-controls__wait-label" }, Ti = { class: "syncplay-controls__transport" }, Ei = ["aria-label"], Di = ["aria-label"], Oi = ["aria-label"], ki = { class: "syncplay-controls__status-label" }, Ai = 10, ji = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let r = e, i = t, { t: o } = C(), s = me(), c = b(), l = Ee("phlixConfig", null), u = a(), d = P(() => r.apiBase ?? u.value);
		he((e) => {
			c.error(n(e, l?.locale, o("syncplay.commandRejected")));
		}), Ae(() => he(null));
		let f = K(!1), p = P(() => f.value || s.syncStatus === "re-syncing");
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
			r.isPlaying ? await h() : await m();
		}
		async function _(e) {
			if (s.isInRoom) try {
				await s.sendCommand(d.value, "seek", { position: e }), i("seek", e);
			} catch {
				c.error(o("syncplay.commandFailed"));
			}
		}
		async function v() {
			await _(Math.max(0, r.position - Ai));
		}
		async function y() {
			await _(Math.min(r.duration, r.position + Ai));
		}
		return X(() => s.syncStatus, (e) => {
			e === "re-syncing" ? f.value = !0 : e === "synced" && (f.value = !1);
		}), (t, n) => Y(s).isInRoom ? (G(), L("div", Si, [
			p.value ? (G(), L("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": Y(o)("syncplay.waitingForMembers")
			}, [B(S, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), R("span", wi, J(Y(o)("syncplay.waitingForMembers")), 1)], 8, Ci)) : I("", !0),
			R("div", Ti, [
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.rewind"),
					onClick: v
				}, [B(S, { name: "rewind" })], 8, Ei),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? Y(o)("syncplay.pauseAll") : Y(o)("syncplay.playAll"),
					onClick: g
				}, [B(S, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Di),
				R("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": Y(o)("syncplay.fastForward"),
					onClick: y
				}, [B(S, { name: "forward" })], 8, Oi)
			]),
			R("div", { class: U(["syncplay-controls__status", `syncplay-controls__status--${Y(s).syncStatus}`]) }, [B(S, {
				name: Y(s).syncStatus === "synced" ? "check" : Y(s).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), R("span", ki, J(Y(s).syncStatus === "synced" ? Y(o)("syncplay.synced") : Y(s).syncStatus === "outOfSync" ? Y(o)("syncplay.outOfSync") : Y(o)("syncplay.reSyncing")), 1)], 2)
		])) : I("", !0);
	}
}), [["__scopeId", "data-v-338c0ffc"]]);
// src/utils/subtitleSrc.ts
function Mi(e, t) {
	return String(s(e, t));
}
function Ni(e, t) {
	let n = !1, r = t.map((t) => {
		let r = Mi(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
// src/components/Player.vue?vue&type=script&setup=true&lang.ts
var Pi = { class: "player__stage" }, Fi = ["src", "poster"], Ii = [
	"src",
	"srclang",
	"label"
], Li = { class: "player__meta" }, Ri = ["aria-label"], zi = { class: "player__meta-text" }, Bi = { class: "player__eyebrow" }, Vi = { class: "player__title" }, Hi = { class: "player__sub numeric" }, Ui = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Wi = {
	key: 0,
	class: "player__center"
}, Gi = ["aria-label"], Ki = ["aria-label"], qi = ["aria-label"], Ji = { class: "player__btnrow" }, Yi = ["aria-label"], Xi = ["aria-label"], Zi = ["aria-label"], Qi = { class: "player__time numeric" }, $i = ["aria-label", "aria-pressed"], ea = ["title"], ta = ["aria-label"], na = ["aria-label"], ra = ["aria-label", "aria-pressed"], ia = ["aria-label", "aria-pressed"], aa = ["aria-label"], oa = { class: "similar-modal" }, sa = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, ca = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, la = { class: "similar-modal__state-title" }, ua = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, da = {
	key: 3,
	class: "similar-modal__results"
}, fa = { class: "similar-modal__poster" }, pa = ["src", "alt"], ma = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, ha = { class: "similar-modal__result-body" }, ga = { class: "similar-modal__result-title" }, _a = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, va = { key: 0 }, ya = /*#__PURE__*/ x(/* @__PURE__ */ V({
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
		let { imgSrc: n } = c(), i = e, o = t, s = u(), l = y(), { t: m } = C(), h = me(), g = d(), _ = P(() => g.isFavorite(i.media.id)), v = P(() => g.likeLevel(i.media.id));
		function x() {
			g.toggleFavorite(i.media.id, V());
		}
		function w(e) {
			g.setLike(i.media.id, e, V());
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
		], E = K(null), D = K(null), ee = K(null), k = K(!0), te = K(!1), A = K(!1), re = K(!1), j = K(!1), ae = K(!1), oe = K(!1), le = K(null), ue = K(null), fe = K(!1), pe = b(), he = K(!1);
		function _e(e) {
			pe.success(m("syncplay.joinedRoom", { name: e.name }));
		}
		let ve = P(() => j.value ? 1.35 : 1), M = K(Un(i.streamUrl, i.media.path)), ye = P(() => ir(i.media.streams)), be = 0;
		async function xe() {
			let e = ++be;
			if (M.value) return;
			let t = await ur([i.streamUrl, i.media.path], i.playbackAudioTracks ?? [], ye.value);
			e === be && t && !M.value && (M.value = !0, Re(E.value?.currentTime ?? 0));
		}
		X([() => i.playbackAudioTracks, ye], () => {
			xe();
		}, { immediate: !0 });
		let Se = Ee("phlixConfig", null), Ce = a(), we = Ee("resumeReporter", null), Te = !1;
		function V() {
			return Ce.value;
		}
		let H = lt({
			apiBase: () => i.apiBase ?? "",
			hlsConfig: Se?.playerHlsConfig
		}), W = ft({ apiBase: () => i.apiBase ?? "" }), Ae = null;
		function je(e) {
			Ae !== null && clearTimeout(Ae), Ae = setTimeout(() => {
				Ae = null, W.fetch(e);
			}, 0);
		}
		let Me = P(() => i.thumbnailAt ?? W.thumbnailAt), Pe = P(() => M.value ? void 0 : i.streamUrl), Fe = P(() => M.value && H.state.value !== "ready"), Ie = P(() => M.value && (H.state.value === "preparing" || H.state.value === "idle")), Le = P(() => M.value && H.state.value === "error");
		function Re(e = 0) {
			let t = E.value, n = navigator.connection?.downlinkMax, r = nt(n);
			t && H.start(t, i.media.id, r, e);
		}
		function Be(e) {
			s.quality === "original" && e !== "auto" ? H.loadVariantPlaylist(Et) : typeof e == "string" && e !== "auto" ? H.loadVariantPlaylist(e) : H.setLevel(e);
		}
		let Ve = !1;
		function He() {
			l.defaultQuality = Tt;
		}
		function Ue() {
			let e = H.levels.value;
			if (e.length === 0) return !1;
			let t = l.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = H.variants.value;
				if (!t || t.length === 0) return !1;
				if (Nt(e, t)) H.loadVariantPlaylist(Et);
				else {
					let t = Mt(e);
					t >= 0 && H.setNextLevel(t), He();
				}
				return !0;
			}
			let n = At(e, t);
			return n >= 0 ? H.setNextLevel(n) : He(), !0;
		}
		X(() => H.levels.value, (e) => {
			Ve || e.length === 0 || Ue() && (Ve = !0);
		}), X(() => H.variants.value, (e) => {
			!Ve && e?.length && De(() => {
				Ve || Ue() && (Ve = !0);
			});
		}, { deep: !0 });
		let Ge = K(s.resumePositionFor(i.media.id) ?? 0), Q = K(!M.value && Ge.value > 0), Ke = null, qe = K(!1), Je = K(8), Ye, Xe = K(null), Ze = K(0), Qe = K(!1), $e = K([]), et = K(!1), tt = K(null);
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
		function ut() {
			it?.abort(), Qe.value = !1, $e.value = [], tt.value = null, Xe.value = null;
		}
		let dt = P(() => s.upNext);
		function pt() {
			M.value = Un(i.streamUrl, i.media.path), xe(), Ge.value = s.resumePositionFor(i.media.id) ?? 0, Q.value = !M.value && Ge.value > 0, Ke = null, vn = !1, an = !1, tn.value = [], en.value = !1, on = !1, qt.value = -1, pn = null, Ve = !1, Te = !1, zt(), Ot = !1, Pt = 0, jt = 0, _t(), qe.value = !1, H.reset(), E.value && (E.value.currentTime = 0), M.value && Re(), je(i.media.id);
		}
		function mt(e) {
			let t = E.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ke = Math.max(0, e));
		}
		function ht() {
			mt(Ge.value), Q.value = !1, E.value?.play()?.catch(() => {});
		}
		function gt() {
			Ke = null, mt(0), s.clearResume(i.media.id), Q.value = !1, E.value?.play()?.catch(() => {});
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
			Te || (Te = !0, we?.finish()), or(), k.value = !0, s.upNext && (qe.value = !0, l.autoplay && vt());
		}
		function bt() {
			_t(), qe.value = !1;
			let e = s.next(i.streamUrlFor);
			e && o("play-next", e);
		}
		function St() {
			_t(), qe.value = !1;
		}
		function Dt() {
			if (M.value) return;
			let e = E.value, t = Gn(e) && (e?.currentTime ?? 0) === 0;
			(Wn(e) || t) && (Lt(), zt(), M.value = !0, Re(e?.currentTime ?? 0));
		}
		let Ot = !1, kt = null, jt = 0, Pt = 0;
		function Lt() {
			if (Ot) return;
			Ot = !0;
			let e = i.media?.id;
			e != null && e !== "" && st().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, Jn({ videoCodec: ye.value })).catch(() => {});
		}
		function Rt() {
			if (kt !== null || Ot || M.value) return;
			let e = E.value;
			e && (jt = Date.now(), Pt = e.currentTime, kt = setTimeout(() => {
				kt = null;
				let e = E.value;
				e && !M.value && Yn(Date.now(), jt, e.currentTime, Pt) && (Lt(), M.value = !0, Re(e.currentTime));
			}, Kn));
		}
		function zt() {
			kt !== null && (clearTimeout(kt), kt = null);
		}
		let Bt = K([]), Vt = K([]), Ht = K(-1), Ut = K(!1), Wt = P(() => H.state.value === "ready" && H.audioTracks.value.length > 0), Gt = P(() => H.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), Kt = P(() => (i.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), qt = K(-1), Jt = P(() => !Wt.value && !M.value && Vt.value.length === 0 && Kt.value.length > 1), Yt = P(() => Wt.value ? Gt.value : Jt.value ? Kt.value : Vt.value), Xt = P(() => {
			if (Wt.value) return H.currentAudioTrack.value;
			if (Jt.value) {
				if (qt.value >= 0) return qt.value;
				let e = (i.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : i.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Ht.value;
		}), Zt = K(!1), Qt = s.subtitleLang, $t = P(() => {
			let e = i.apiBase ?? "", t = M.value ? H.subtitleTracks.value : Ni(e, i.playbackSubtitleTracks ?? []);
			if (tn.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Ni(e, tn.value), a = new Set(t.map(n)), o = r.filter((e) => !a.has(n(e)));
			return o.length === 0 ? t : [...t, ...o];
		}), en = K(!1), tn = K([]), nn = P(() => {
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
			t && (s.setSubtitle(t.language), Qt = t.language, an = !0);
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
		let ln = P(() => Bt.value.some((e) => e.language === s.subtitleLang));
		function un() {
			let e = E.value;
			Bt.value = se(e), Vt.value = ne(e), Ht.value = O(e), sn(), cn();
		}
		function dn() {
			if (ln.value) Qt = s.subtitleLang, s.setSubtitle(null);
			else {
				let e = Qt && Bt.value.some((e) => e.language === Qt) ? Qt : Bt.value[0]?.language ?? null;
				s.setSubtitle(e);
			}
			o("captions");
		}
		let pn = null;
		function mn(e) {
			if (Wt.value) H.setAudioTrack(e);
			else if (Jt.value) {
				if (e === Xt.value) return;
				qt.value = e, pn = e, M.value = !0, Re(E.value?.currentTime ?? 0);
			} else ie(E.value, e), Ht.value = e;
		}
		X(Wt, (e) => {
			if (!e || pn === null) return;
			let t = pn;
			pn = null, t >= 0 && t < H.audioTracks.value.length && H.setAudioTrack(t);
		}), X($t, () => {
			De(() => un());
		}, { deep: !0 });
		let hn = null, gn, _n = P(() => {
			let e = [];
			i.media.year && e.push({ text: String(i.media.year) }), i.media.rating && e.push({
				text: i.media.rating,
				cert: !0
			}), i.media.runtime && e.push({ text: `${i.media.runtime}m` });
			let t = i.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), vn = !1;
		function yn() {
			if (!i.autoplay || vn || Q.value || Fe.value) return;
			let e = E.value;
			if (!e || !e.paused) return;
			vn = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, s.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function bn() {
			yn();
		}
		function xn() {
			i.prevEpisode && o("play-episode", i.prevEpisode);
		}
		function Sn() {
			i.nextEpisode && o("play-episode", i.nextEpisode);
		}
		function Cn() {
			let e = E.value;
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
			s.play(), s.setMediaPositionState(), Rt();
		}
		function En() {
			s.pause(), s.setMediaPositionState();
		}
		function Dn() {
			let e = E.value;
			e && (kt !== null && e.currentTime > Pt && zt(), s.updateProgress(e.currentTime, e.duration, wn(e)), h.isInRoom && h.updateLocalPosition(e.currentTime));
		}
		function kn() {
			let e = E.value;
			e && (e.volume = s.volume, e.muted = s.muted, e.playbackRate = s.rate, Ke !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ke) : Ke, Ke = null), s.updateProgress(e.currentTime, e.duration, wn(e)), s.setMediaPositionState(), un());
		}
		function An() {
			let e = E.value;
			e && s.updateProgress(e.currentTime, e.duration, wn(e));
		}
		function jn() {
			let e = E.value;
			e && (Math.abs(e.volume - s.volume) > .001 && s.setVolume(e.volume), e.muted !== s.muted && s.toggleMute());
		}
		function Mn() {
			let e = E.value;
			e && e.playbackRate !== s.rate && s.setRate(e.playbackRate), s.setMediaPositionState();
		}
		function Nn() {
			s.setMediaPositionState();
		}
		function Pn() {
			s.setMediaPositionState();
		}
		function $(e) {
			let t = E.value;
			t && s.duration > 0 && (t.currentTime = Math.min(s.duration, Math.max(0, e)));
		}
		function In(e) {
			$(s.position + e);
		}
		function Ln() {
			A.value = !0, cr();
		}
		function Rn() {
			A.value = !1, cr();
		}
		function Bn(e) {
			let t = T.reduce((e, t, n) => Math.abs(t - s.rate) < Math.abs(T[e] - s.rate) ? n : e, 0), n = T[Math.min(T.length - 1, Math.max(0, t + e))];
			s.setRate(n);
		}
		function Vn() {
			if (!i.markers) return;
			let e = s.position, t = i.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function Hn() {
			if (!i.markers) return;
			let e = s.position, t = i.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && $(t.startMs / 1e3);
		}
		function qn() {
			le.value?.toggleOpen();
		}
		let Xn = null;
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
			Xn !== null && (clearInterval(Xn), Xn = null);
			let t = .05;
			Xn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(Xn), Xn = null, e.volume = 0, e.pause(), s.pause());
			}, 50);
		}
		p({
			playPause: Cn,
			seekBy: In,
			frameStep: (e) => {
				s.playing || $(s.position + e / 30);
			},
			volumeBy: (e) => s.setVolume(s.volume + e),
			toggleMute: Qn,
			toggleFullscreen: er,
			toggleCaptions: dn,
			toggleTheater: $n,
			togglePip: nr,
			skipIntro: Vn,
			skipOutro: Hn,
			sleepTimer: qn,
			seekToPercent: (e) => $(e * s.duration),
			speedStep: Bn,
			toggleHelp: () => {
				re.value = !re.value;
			},
			toggleQuality: () => {
				M.value ? (fe.value = !fe.value, ue.value?.toggleMenu?.()) : pe.show({
					message: m("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !re.value && !Ut.value && !Zt.value });
		function Qn() {
			s.toggleMute();
		}
		function $n() {
			j.value = !j.value, o("theater", j.value);
		}
		X(() => s.muted, (e) => {
			let t = E.value;
			t && t.muted !== e && (t.muted = e);
		}), X(() => s.volume, (e) => {
			let t = E.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), X(() => s.rate, (e) => {
			let t = E.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), X(() => s.lastCommand, (e) => {
			e && (e.type === "seekTo" ? mt(e.value) : e.type === "seekBy" && mt(s.position + e.value));
		});
		function er() {
			if (typeof document > "u") return;
			let e = D.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function tr() {
			te.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function nr() {
			let e = E.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			o("pip");
		}
		function rr() {
			ae.value = !0;
		}
		function ar() {
			ae.value = !1;
		}
		function or() {
			gn &&= (clearTimeout(gn), void 0);
		}
		function sr() {
			or(), s.playing && !A.value && (gn = setTimeout(() => {
				s.playing && !A.value && (k.value = !1);
			}, i.idleTimeout ?? 3e3));
		}
		function cr() {
			k.value = !0, sr();
		}
		let lr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", dr = "data-phlix-prev-tabindex", fr = "__phlix_no_tabindex__";
		function pr(e) {
			let t = D.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(lr) ? [n] : Array.from(n.querySelectorAll(lr));
				for (let n of t) if (e) {
					let e = n.getAttribute(dr);
					e === null || e === fr ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(dr);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(dr, n.getAttribute("tabindex") ?? fr), n.setAttribute("tabindex", "-1"));
			}
		}
		X(k, (e) => {
			typeof document < "u" && (pr(e), !e && document.activeElement instanceof HTMLElement && D.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), X(() => s.playing, (e) => {
			e ? (Q.value = !1, St(), sr()) : (or(), k.value = !0);
		});
		let mr = null;
		ke(() => {
			s.setCurrent(i.media, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), g.hydrate(i.media), typeof document < "u" && (document.addEventListener("fullscreenchange", tr), oe.value = document.pictureInPictureEnabled === !0), mr = s.bindMediaSession({
				onPlay: () => void E.value?.play()?.catch(() => {}),
				onPause: () => E.value?.pause(),
				onSeek: (e) => $(e)
			}), hn = E.value?.textTracks ?? null, hn?.addEventListener?.("addtrack", un), hn?.addEventListener?.("removetrack", un), un(), M.value && Re(), je(i.media.id);
		}), X(() => i.media, (e) => {
			s.setCurrent(e, {
				resetPosition: !1,
				streamUrl: i.streamUrl
			}), pt();
		}), X(() => i.media?.id, () => {
			g.hydrate(i.media);
		}), X(() => h.currentSession, (e) => {
			e && (e.state === "playing" ? (E.value?.play(), s.play()) : e.state === "paused" && (E.value?.pause(), s.pause()), h.updateLocalPosition(s.position), Math.abs(h.driftAmount) > 2 && mt(e.playbackPosition));
		});
		let hr = null;
		return X(() => h.pendingPlayMedia, async (e) => {
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
				if (h.pendingPlayMedia !== e) return;
			}
			if (t) {
				s.setCurrent(t, {
					resetPosition: !0,
					streamUrl: i.streamUrlFor?.(t) ?? ""
				}), E.value?.play(), s.play(), h.consumePendingPlayMedia(), hr = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			hr !== n && (hr = n, o("pending-media", e.mediaId, e.title));
		}), Oe(() => {
			we?.reportFinal?.(), or(), _t(), H.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", tr), mr?.(), hn?.removeEventListener?.("addtrack", un), hn?.removeEventListener?.("removetrack", un), Xn !== null && (clearInterval(Xn), Xn = null), Ae !== null && (clearTimeout(Ae), Ae = null), zt();
		}), (t, r) => (G(), L("div", {
			ref_key: "containerRef",
			ref: D,
			class: U(["player", {
				"is-chrome-hidden": !k.value,
				"is-theater": j.value
			}]),
			onPointermove: cr,
			onPointerdown: cr,
			onFocusin: cr
		}, [B(Fn, {
			video: E.value,
			enabled: Y(l).atmosphere,
			playing: Y(s).playing,
			"reduced-motion": Y(l).effectiveReducedMotion,
			intensity: ve.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), R("div", Pi, [
			R("video", {
				ref_key: "videoRef",
				ref: E,
				class: "player__video",
				src: Pe.value,
				poster: Y(n)(e.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Tn,
				onPause: En,
				onTimeupdate: Dn,
				onLoadedmetadata: kn,
				onCanplay: bn,
				onProgress: An,
				onVolumechange: jn,
				onRatechange: Mn,
				onSeeked: Nn,
				onDurationchange: Pn,
				onEnded: yt,
				onError: Dt,
				onEnterpictureinpicture: rr,
				onLeavepictureinpicture: ar,
				onClick: Cn
			}, [(G(!0), L(N, null, q($t.value, (e) => (G(), L("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Ii))), 128))], 40, Fi),
			r[22] ||= R("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[23] ||= R("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			R("div", Li, [R("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": Y(m)("player.back"),
				onClick: r[0] ||= Ne((e) => o("back"), ["stop"])
			}, [B(S, { name: "arrow-left" })], 8, Ri), R("div", zi, [
				R("p", Bi, J(Y(m)("player.nowPlaying")), 1),
				R("h2", Vi, J(e.media.name), 1),
				R("div", Hi, [(G(!0), L(N, null, q(_n.value, (e, t) => (G(), L(N, { key: t }, [t > 0 && !e.cert ? (G(), L("span", Ui, "·")) : I("", !0), R("span", { class: U({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			Fe.value ? I("", !0) : (G(), L("div", Wi, [
				k.value ? (G(), L("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": Y(m)("player.seekBackward"),
					onClick: r[1] ||= Ne((e) => In(-10), ["stop"])
				}, [B(S, { name: "rewind" }), R("span", { class: "player__center-skip-count" }, J(10))], 8, Gi)) : I("", !0),
				R("button", {
					type: "button",
					class: U(["player__bigplay", { "is-playing": Y(s).playing }]),
					"aria-label": Y(s).playing ? Y(m)("player.pause") : Y(m)("player.play"),
					onClick: Ne(Cn, ["stop"])
				}, [B(S, { name: Y(s).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Ki),
				k.value ? (G(), L("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": Y(m)("player.seekForward"),
					onClick: r[2] ||= Ne((e) => In(10), ["stop"])
				}, [B(S, { name: "forward" }), R("span", { class: "player__center-skip-count" }, J(10))], 8, qi)) : I("", !0)
			])),
			B(It, {
				video: E.value,
				language: Y(s).subtitleLang,
				"style-config": Y(l).captionStyle,
				lifted: k.value,
				"controls-root": ee.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Fe.value ? I("", !0) : (G(), L("div", {
				key: 1,
				ref_key: "controlsRef",
				ref: ee,
				class: "player__controls",
				onClick: r[9] ||= Ne(() => {}, ["stop"])
			}, [
				B(We, {
					position: Y(s).position,
					duration: Y(s).duration,
					buffered: Y(s).buffered,
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
				Y(l).showMarkerTimeline && e.markers && e.markers.length > 0 ? (G(), F(oi, {
					key: 0,
					position: Y(s).position,
					duration: Y(s).duration,
					markers: e.markers,
					onSeek: $,
					onSimilar: rt
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : I("", !0),
				R("div", Ji, [
					e.prevEpisode ? (G(), L("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(m)("player.previousEpisode"),
						onClick: xn
					}, [B(S, { name: "skip-back" })], 8, Yi)) : I("", !0),
					R("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": Y(s).playing ? Y(m)("player.pause") : Y(m)("player.play"),
						onClick: Cn
					}, [B(S, { name: Y(s).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Xi),
					e.nextEpisode ? (G(), L("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(m)("player.nextEpisode"),
						onClick: Sn
					}, [B(S, { name: "skip-forward" })], 8, Zi)) : I("", !0),
					R("span", Qi, [
						z(J(Y(ze)(Y(s).position)), 1),
						r[18] ||= R("span", { class: "player__sep" }, " / ", -1),
						z(J(Y(ze)(Y(s).duration)), 1)
					]),
					r[19] ||= R("span", { class: "player__grow" }, null, -1),
					R("button", {
						type: "button",
						class: U(["player__iconbtn player__favorite", { "is-on": _.value }]),
						"aria-label": _.value ? Y(m)("itemActions.removeFavorite") : Y(m)("itemActions.addFavorite"),
						"aria-pressed": _.value ? "true" : "false",
						onClick: x
					}, [B(S, { name: _.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, $i),
					B(f, {
						level: v.value,
						onCycle: w
					}, null, 8, ["level"]),
					B(Ct),
					B(wt),
					B(Ft, {
						ref_key: "qualityMenuRef",
						ref: ue,
						open: fe.value,
						"onUpdate:open": r[3] ||= (e) => fe.value = e,
						levels: Y(H).levels.value,
						variants: Y(H).variants.value,
						"current-level": Y(H).currentLevel.value,
						"auto-enabled": Y(H).autoEnabled.value,
						"active-height": Y(H).activeLevelHeight.value,
						onSelect: Be
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					M.value ? I("", !0) : (G(), L("span", {
						key: 2,
						class: "player__direct-badge",
						title: Y(m)("player.qualityDirectStream")
					}, J(Y(m)("player.directStream")), 9, ea)),
					B(fn, {
						open: Ut.value,
						"onUpdate:open": r[4] ||= (e) => Ut.value = e,
						tracks: Bt.value,
						"audio-tracks": Yt.value,
						"active-audio": Xt.value,
						onSelectAudio: mn,
						onAddSubtitles: r[5] ||= (e) => en.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					B(Qr, {
						open: Zt.value,
						"onUpdate:open": r[6] ||= (e) => Zt.value = e,
						chapters: e.chapters ?? [],
						onSeek: $
					}, null, 8, ["open", "chapters"]),
					B(di, {
						ref_key: "sleepTimerRef",
						ref: le,
						"on-expire": Zn
					}, null, 512),
					R("button", {
						type: "button",
						class: U(["player__iconbtn player__syncplay", { "is-on": Y(h).isInRoom }]),
						"aria-label": Y(h).isInRoom ? Y(m)("syncplay.inRoom") : Y(m)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[7] ||= (e) => he.value = !0
					}, [B(S, { name: "user" })], 10, ta),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": Y(m)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[8] ||= (e) => re.value = !0
					}, [B(S, { name: "info" })], 8, na),
					oe.value ? (G(), L("button", {
						key: 3,
						type: "button",
						class: U(["player__iconbtn", { "is-on": ae.value }]),
						"aria-label": ae.value ? Y(m)("player.exitPip") : Y(m)("player.pip"),
						"aria-pressed": ae.value,
						onClick: nr
					}, [B(S, { name: "pip" })], 10, ra)) : I("", !0),
					R("button", {
						type: "button",
						class: U(["player__iconbtn", { "is-on": j.value }]),
						"aria-label": j.value ? Y(m)("player.exitTheater") : Y(m)("player.theater"),
						"aria-pressed": j.value,
						onClick: $n
					}, [B(S, { name: "theater" })], 10, ia),
					R("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": te.value ? Y(m)("player.exitFullscreen") : Y(m)("player.fullscreen"),
						onClick: er
					}, [B(S, { name: te.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, aa)
				])
			], 512)),
			Fe.value ? I("", !0) : (G(), F(Nr, {
				key: 2,
				position: Y(s).position,
				"intro-marker": e.introMarker,
				"outro-marker": e.outroMarker,
				onSkip: $
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Fe.value ? I("", !0) : (G(), F(zr, {
				key: 3,
				position: Y(s).position,
				markers: e.markers,
				onSkip: $
			}, null, 8, ["position", "markers"])),
			Q.value && !Fe.value ? (G(), F(zn, {
				key: 4,
				seconds: Ge.value,
				onResume: ht,
				onRestart: gt
			}, null, 8, ["seconds"])) : I("", !0),
			qe.value && dt.value && !Fe.value ? (G(), F(xr, {
				key: 5,
				media: dt.value,
				remaining: Je.value,
				total: Y(8),
				counting: Y(l).autoplay,
				onPlayNow: bt,
				onCancel: St
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : I("", !0),
			B(ce, {
				modelValue: Qe.value,
				"onUpdate:modelValue": r[10] ||= (e) => Qe.value = e,
				title: `Similar ${Xe.value ?? "marker"}s`,
				size: "lg",
				onClose: ut
			}, {
				default: Z(() => [R("div", oa, [et.value ? (G(), L("div", sa, [B(de, { label: "Finding similar media" })])) : tt.value ? (G(), L("div", ca, [B(S, {
					name: "error",
					class: "similar-modal__state-icon"
				}), R("p", la, J(tt.value), 1)])) : !et.value && $e.value.length === 0 ? (G(), L("div", ua, [
					B(S, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[20] ||= R("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[21] ||= R("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (G(), L("ul", da, [(G(!0), L(N, null, q($e.value, (e) => (G(), L("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [R("div", fa, [e.poster_url ? (G(), L("img", {
					key: 0,
					src: Y(n)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, pa)) : (G(), L("div", ma, [B(S, { name: "film" })]))]), R("div", ha, [R("p", ga, J(e.name), 1), e.year ? (G(), L("p", _a, [z(J(e.year) + " ", 1), e.runtime ? (G(), L("span", va, " · " + J(e.runtime) + "m", 1)) : I("", !0)])) : I("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Ie.value ? (G(), F(Mr, {
				key: 6,
				title: e.media.name,
				progress: Y(H).progress.value,
				onBack: r[11] ||= (e) => o("back")
			}, null, 8, ["title", "progress"])) : I("", !0),
			Le.value ? (G(), F(Er, {
				key: 7,
				title: e.media.name,
				onBack: r[12] ||= (e) => o("back")
			}, null, 8, ["title"])) : I("", !0),
			Y(h).isInRoom ? (G(), F(ji, {
				key: 8,
				position: Y(s).position,
				duration: Y(s).duration,
				"is-playing": Y(s).playing,
				onSeek: $,
				onPlay: r[13] ||= (e) => void E.value?.play(),
				onPause: r[14] ||= (e) => void E.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : I("", !0),
			Y(h).isInRoom ? (G(), F(xi, { key: 9 })) : I("", !0),
			B(ge, {
				modelValue: he.value,
				"onUpdate:modelValue": r[15] ||= (e) => he.value = e,
				onJoined: _e
			}, null, 8, ["modelValue"]),
			B(xt, {
				open: re.value,
				onClose: r[16] ||= (e) => re.value = !1
			}, null, 8, ["open"]),
			B(On, {
				open: en.value,
				"onUpdate:open": r[17] ||= (e) => en.value = e,
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
}), [["__scopeId", "data-v-06928390"]]), ba = { class: "player-page__stage" }, xa = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Sa = { class: "player-page__blocking-error" }, Ca = /*#__PURE__*/ x(/* @__PURE__ */ V({
	__name: "PlayerPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), n = a(), { imgSrc: s } = c(), f = o(), p = Fe(), m = Ie(), g = Ee("phlixConfig", null), _ = u(), v = d(), y = h(), b = K(null), x = K(""), S = K([]), C = K(null), w = K(null), T = K([]), E = K([]), D = K(!0), O = K(null), ee = K(!1), k = K(null), te = K(!1), A = K(null), ne = K(null), re = P(() => String(p.params.id ?? ""));
		xe(() => b.value?.name);
		let ie = P(() => {
			let e = s(b.value?.poster_url);
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), j = null, ae = !1, oe = 0;
		function se(e) {
			return ae || e.generation !== oe;
		}
		function ue(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function de(e) {
			let t = f.value || n.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function fe(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		function me(e) {
			return e.type === "episode" || (e.episode_number ?? null) !== null;
		}
		async function he(e, t, r) {
			let i = () => se(r), a = t.genres?.[0];
			if (!a) _.setQueue([]);
			else try {
				let o = l(n.value, {
					genres: [a],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, r.controller?.signal);
				if (i()) return;
				_.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || ue(e)) return;
				_.setQueue([]);
			}
		}
		async function ge(e, t, r) {
			let i = l(n.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(i, void 0, r)).items ?? [];
		}
		async function N(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Te(e, t) {
			A.value = M(e, t), ne.value = ye(e, t);
			let n = e.findIndex((e) => e.id === t), r = n >= 0 ? e.slice(n + 1) : [];
			r.length && _.setQueue(r);
		}
		function V(e) {
			for (let n of t.values()) if (n.some((t) => t.id === e)) return n;
			return null;
		}
		async function H(e, n, r) {
			if (A.value = null, ne.value = null, !me(n)) return;
			let i = V(n.id);
			if (i) {
				Te(i, n.id);
				return;
			}
			let a = () => se(r);
			try {
				let i = await N(e, n, r.controller?.signal);
				if (a()) return;
				let o = await ge(e, i.id, r.controller?.signal);
				if (a()) return;
				if (ve(o)) {
					let t = o.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => ge(e, t.id, r.controller?.signal).catch(() => [])));
					if (a()) return;
					o = [...o.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let s = _e(o);
				s.length && t.set(i.id, s), Te(s, n.id);
			} catch (e) {
				if (a() || ue(e)) return;
				A.value = null, ne.value = null;
			}
		}
		async function De() {
			let e = re.value;
			j?.abort(), j = typeof AbortController < "u" ? new AbortController() : null, oe += 1;
			let t = {
				generation: oe,
				controller: j
			};
			if (D.value = !0, O.value = null, S.value = [], C.value = null, w.value = null, T.value = [], E.value = [], A.value = null, ne.value = null, _.hideMiniPlayer(), !e) {
				O.value = "No media id provided", D.value = !1;
				return;
			}
			let a = new r({ baseUrl: n.value });
			a.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, t.controller?.signal).then((e) => {
				se(t) || (S.value = (e?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), C.value = fe(e?.intro_marker), w.value = fe(e?.outro_marker), T.value = Xn(e?.audio_tracks), E.value = Je(e?.subtitle_tracks));
			}).catch(() => null);
			let o = Se(e), s = Date.now();
			if (o && Ce(o, s)) {
				Ae(a, o.item, t);
				return;
			}
			let c = null;
			try {
				c = (await a.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t.controller?.signal)).item;
			} catch (e) {
				if (se(t) || ue(e)) return;
				if (e instanceof i && (e.status === 403 || e.status === 429)) {
					let t = Re(e.body, g?.locale);
					if (t !== null) {
						k.value = t, te.value = !0, D.value = !1;
						return;
					}
				}
				if (o) {
					Ae(a, o.item, t);
					return;
				}
				O.value = e instanceof Error ? e.message : "Failed to load media", D.value = !1;
				return;
			}
			if (!se(t)) {
				if (c) we(e, c, s), Ae(a, c, t);
				else {
					if (o) {
						Ae(a, o.item, t);
						return;
					}
					O.value = "Failed to load media item", D.value = !1;
				}
			}
		}
		async function Ae(e, t, n) {
			b.value = t, v.hydrate(t), x.value = de(t), D.value = !1, me(t) && (await H(e, t, n), se(n) || ne.value) || he(e, t, n);
		}
		ke(De), X(re, De), Pe(() => {
			_.current && _.streamUrl && _.showMiniPlayer();
		}), Oe(() => {
			ae = !0, j?.abort(), j = null, y.reset();
		});
		function q() {
			m?.back();
		}
		function je(e) {
			m?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Me(e) {
			m?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ne(e) {
			ee.value = e, y.setTheaterActive(e);
		}
		function Le() {
			te.value = !1, q();
		}
		return (e, t) => (G(), L("div", { class: U(["player-page", { "is-theater": ee.value }]) }, [
			ie.value && !D.value && !O.value ? (G(), L("div", {
				key: 0,
				class: "player-page__ambient",
				style: W(ie.value),
				"aria-hidden": "true"
			}, null, 4)) : I("", !0),
			R("div", ba, [D.value ? (G(), L("div", xa, [B(be, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : O.value ? (G(), F(pe, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn’t play this title",
				description: O.value
			}, {
				actions: Z(() => [B(le, {
					variant: "solid",
					onClick: De
				}, {
					default: Z(() => [...t[1] ||= [z("Retry", -1)]]),
					_: 1
				}), B(le, {
					variant: "ghost",
					onClick: q
				}, {
					default: Z(() => [...t[2] ||= [z("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : b.value ? (G(), F(ya, {
				key: 2,
				media: b.value,
				"stream-url": x.value,
				"stream-url-for": de,
				"api-base": Y(n),
				chapters: S.value,
				"intro-marker": C.value,
				"outro-marker": w.value,
				"playback-audio-tracks": T.value,
				"playback-subtitle-tracks": E.value,
				"prev-episode": A.value,
				"next-episode": ne.value,
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
			])) : I("", !0)]),
			B(ce, {
				modelValue: te.value,
				"onUpdate:modelValue": t[0] ||= (e) => te.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: Z(() => [B(le, {
					variant: "solid",
					onClick: Le
				}, {
					default: Z(() => [...t[3] ||= [z("OK", -1)]]),
					_: 1
				})]),
				default: Z(() => [R("p", Sa, J(k.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-4d1f516a"]]);
export { Ca as default };

//# sourceMappingURL=PlayerPage-Cxcujcxd.js.map