import { t as e } from "./MediaCard-B_a_4TKb.js";
import { n as t, t as n } from "./Icon-55iG1rR7.js";
import { a as r } from "./usePreferencesStore-CQ3hN8jz.js";
import { t as i } from "./useMessages-B74fpn3I.js";
import { Fragment as a, Transition as o, computed as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, nextTick as m, normalizeClass as ee, normalizeStyle as h, onBeforeUnmount as te, onMounted as ne, openBlock as g, ref as _, renderList as v, renderSlot as y, toDisplayString as b, unref as re, watch as x, withCtx as ie } from "vue";
var S = 3 / 2;
function ae(e) {
	return typeof e != "number" || !Number.isFinite(e) || e <= 0 ? 56 : e / 16 * 54 + 2;
}
var C = [
	{
		label: "Poster",
		track: "120px"
	},
	{
		label: "Title",
		track: "minmax(0, 3fr)"
	},
	{
		label: "Year",
		track: "80px"
	},
	{
		label: "Cert",
		track: "88px"
	},
	{
		label: "Runtime",
		track: "88px"
	},
	{
		label: "Genres",
		track: "minmax(0, 2fr)"
	}
], w = C.map((e) => e.track).join(" ");
function oe(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function se(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function ce(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * S + t + n;
}
function T(e) {
	return e <= 0 ? 0 : e + 24;
}
function le(e) {
	return Math.max(0, e - 24);
}
function ue(e, t) {
	return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(e, Math.trunc(t));
}
function de(e, t, n) {
	return n.hasMore && !n.loading && !n.loadingMore && e >= t;
}
function fe() {
	let e = !0, t = null;
	return {
		noteAppend(n) {
			let r = t;
			t = n, r && (n.hasMore !== r.hasMore || n.loadedCount !== r.loadedCount ? e = !0 : r.loadingMore && !n.loadingMore && n.hasMore && (e = !1));
		},
		noteScroll() {
			e = !0;
		},
		allowsEmission(t) {
			return e && !t;
		}
	};
}
function pe(e) {
	let { scrollTop: t, viewportHeight: n, rowHeight: r, columns: i, itemCount: a, overscan: o } = e, s = Math.max(1, i), c = Math.ceil(a / s), l = c * r;
	if (c === 0 || r <= 0) return {
		startRow: 0,
		endRow: c,
		startIndex: 0,
		endIndex: a,
		rowCount: c,
		padTop: 0,
		totalHeight: l
	};
	let u = Math.floor(Math.max(0, t) / r), d = Math.ceil(Math.max(0, n) / r) + 1, f = Math.max(0, u - o), p = Math.min(c, u + d + o);
	return {
		startRow: f,
		endRow: p,
		startIndex: f * s,
		endIndex: Math.min(a, p * s),
		rowCount: c,
		padTop: f * r,
		totalHeight: l
	};
}
// src/components/MediaGrid.vue?vue&type=script&setup=true&lang.ts
var me = ["role"], he = {
	key: 0,
	class: "skel-block"
}, ge = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, _e = { class: "media-grid-empty__title" }, ve = { class: "media-grid-empty__hint" }, ye = ["role"], be = ["role"], xe = {
	key: 0,
	class: "skel-block"
}, Se = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, Ce = 16, E = /*#__PURE__*/ t(/* @__PURE__ */ p({
	__name: "MediaGrid",
	props: {
		items: {},
		total: {},
		loading: {
			type: Boolean,
			default: !1
		},
		loadingMore: {
			type: Boolean,
			default: !1
		},
		hasMore: {
			type: Boolean,
			default: !1
		},
		paused: {
			type: Boolean,
			default: !1
		},
		cardSize: {},
		columns: {},
		rowHeight: {},
		gridRole: {},
		skeletonCount: { default: 18 },
		overscan: { default: 2 },
		canMatch: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"load-more",
		"need-range",
		"play",
		"watchlist",
		"info",
		"match",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove",
		"edit-metadata",
		"explore-data"
	],
	setup(t, { expose: p, emit: S }) {
		let C = t, w = S, T = r(), { t: E } = i(), D = s(() => C.cardSize ?? T.cardSize ?? 200), O = _(null), k = _(null), A = _(0), j = _(0), M = _(0), we = _(16), N = 0, P = 0;
		function F() {
			let e = O.value, t = typeof window < "u" ? window.innerHeight : 0;
			if (t > 0 && (j.value = t), e && typeof e.getBoundingClientRect == "function") {
				let t = e.getBoundingClientRect();
				t.width > 0 && (A.value = t.width), N = typeof window < "u" ? window.scrollY + t.top : 0;
			}
			if (typeof window < "u" && typeof document < "u" && typeof window.getComputedStyle == "function") {
				let e = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);
				Number.isFinite(e) && e > 0 && (we.value = e);
			}
		}
		function I() {
			let e = performance.now();
			if (e - P >= Ce) {
				P = e;
				let t = typeof window < "u" ? Math.max(0, window.scrollY - N) : 0;
				t !== M.value && (M.value = t, q.noteScroll());
			}
		}
		let L = 0;
		function R() {
			L ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				L = 0, F();
			});
		}
		let z = null, B = s(() => {
			let e = C.columns;
			return typeof e == "number" && Number.isFinite(e) && e >= 1 ? Math.trunc(e) : null;
		}), V = s(() => {
			let e = C.rowHeight;
			return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : null;
		}), H = s(() => V.value !== null), U = s(() => B.value ?? oe(A.value, D.value, 20)), W = s(() => V.value ?? ce(se(A.value, U.value, 20), ae(we.value))), G = s(() => A.value > 0 && W.value > 0), Te = s(() => ue(C.items.length, C.total)), K = s(() => pe({
			scrollTop: M.value,
			viewportHeight: j.value,
			rowHeight: W.value,
			columns: U.value,
			itemCount: Te.value,
			overscan: C.overscan
		})), Ee = s(() => {
			if (!G.value) return C.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let e = C.items, { startIndex: t, endIndex: n } = K.value;
			if (z && z.startIndex === t && z.endIndex === n && z.source === e) return z.items;
			let r = [];
			for (let i = t; i < n; i++) r.push({
				item: e[i] ?? null,
				index: i
			});
			return z = {
				startIndex: t,
				endIndex: n,
				source: e,
				items: r
			}, r;
		}), q = fe();
		x(() => [
			C.loadingMore,
			C.items.length,
			C.hasMore
		], ([e, t, n]) => q.noteAppend({
			loadingMore: e,
			loadedCount: t,
			hasMore: n
		}), { immediate: !0 }), x(() => [
			K.value.endIndex,
			C.items.length,
			C.hasMore,
			C.loading,
			C.loadingMore,
			C.paused
		], ([e, t, n, r, i, a]) => {
			G.value && q.allowsEmission(a) && de(e, t, {
				hasMore: n,
				loading: r,
				loadingMore: i
			}) && w("load-more");
		});
		let J;
		x(() => [
			G.value,
			K.value.startIndex,
			K.value.endIndex
		], ([e, t, n]) => {
			!e || n <= t || (clearTimeout(J), J = setTimeout(() => w("need-range", t, n), 120));
		}, { immediate: !0 });
		let Y = s(() => H.value ? le(V.value ?? 0) : null), X = s(() => Y.value === null ? {} : { gridAutoRows: `${Y.value}px` }), De = s(() => ({
			gridTemplateColumns: G.value || B.value !== null ? `repeat(${U.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${D.value}px, 1fr))`,
			...X.value
		})), Oe = s(() => G.value ? { height: `${K.value.totalHeight}px` } : {}), ke = s(() => G.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${K.value.padTop}px)`
		} : {}), Ae = s(() => ({
			gridTemplateColumns: B.value === null ? `repeat(auto-fill, minmax(${D.value}px, 1fr))` : `repeat(${U.value}, minmax(0, 1fr))`,
			...X.value
		})), Z = s(() => Y.value === null ? {} : { height: `${Y.value}px` }), je = s(() => C.gridRole ? "presentation" : void 0), Me = s(() => G.value && M.value > j.value * 1.5);
		function Ne() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		function Pe(e) {
			if (typeof window > "u") return;
			let t = Math.max(1, U.value), n = Math.floor(Math.max(0, e) / t) * W.value;
			window.scrollTo?.({
				top: Math.max(0, N + n),
				behavior: "auto"
			});
		}
		p({ scrollToIndex: Pe });
		let Q = null;
		function Fe() {
			Q || typeof IntersectionObserver > "u" || (Q = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && C.hasMore && !C.loading && !C.loadingMore && q.allowsEmission(C.paused) && w("load-more");
			}, { rootMargin: "400px 0px" }), k.value && Q.observe(k.value));
		}
		function Ie() {
			Q?.disconnect(), Q = null;
		}
		x(() => k.value, (e) => {
			Ie(), e && (Fe(), R());
		});
		let $ = null;
		function Le() {
			!$ && typeof ResizeObserver < "u" && O.value && ($ = new ResizeObserver(R), $.observe(O.value));
		}
		function Re() {
			$?.disconnect(), $ = null;
		}
		return x(() => O.value, (e) => {
			Re(), e && (Le(), R());
		}), ne(() => {
			F(), typeof window < "u" && (window.addEventListener("scroll", I, { passive: !0 }), window.addEventListener("resize", R, { passive: !0 })), Le(), Fe();
		}), te(() => {
			typeof window < "u" && (window.removeEventListener("scroll", I), window.removeEventListener("resize", R)), L &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(L) : clearTimeout(L), 0), clearTimeout(J), Re(), Ie();
		}), x(() => C.items.length, () => m(R)), x(() => C.gridRole, () => m(R)), (r, i) => (g(), l("div", {
			class: "media-grid-root",
			role: je.value
		}, [t.loading && t.items.length === 0 ? (g(), l("div", {
			key: 0,
			class: ee(["media-grid media-grid--skeleton", { paused: t.paused }]),
			style: h(Ae.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(g(!0), l(a, null, v(t.skeletonCount, (e) => (g(), l("div", {
			key: e,
			class: "skel-card",
			style: h(Z.value),
			"aria-hidden": "true"
		}, [H.value ? (g(), l("div", he)) : (g(), l(a, { key: 1 }, [
			i[0] ||= u("div", { class: "skel-poster" }, null, -1),
			i[1] ||= u("div", { class: "skel-title" }, null, -1),
			i[2] ||= u("div", { class: "skel-sub" }, null, -1)
		], 64))], 4))), 128))], 6)) : t.items.length === 0 ? (g(), l("div", ge, [y(r.$slots, "empty", {}, () => [
			f(n, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			u("p", _e, b(re(E)("library.noMediaTitle")), 1),
			u("p", ve, b(re(E)("library.noMediaHint")), 1)
		], !0)])) : (g(), l(a, { key: 2 }, [
			u("div", {
				ref_key: "sizerEl",
				ref: O,
				class: "media-grid-sizer",
				style: h(Oe.value),
				role: je.value
			}, [u("div", {
				class: "media-grid",
				style: h([De.value, ke.value]),
				role: t.gridRole
			}, [(g(!0), l(a, null, v(Ee.value, (n) => (g(), l(a, { key: n.item?.id ?? `skel-${n.index}` }, [n.item ? y(r.$slots, "card", {
				item: n.item,
				index: n.index
			}, () => [f(e, {
				item: n.item,
				"can-match": t.canMatch,
				onPlay: (e) => w("play", n.item),
				onWatchlist: (e) => w("watchlist", n.item),
				onInfo: (e) => w("info", n.item),
				onMatch: (e) => w("match", n.item),
				onMarkWatched: (e) => w("mark-watched", n.item),
				onRefresh: (e) => w("refresh", n.item),
				onChoosePoster: (e) => w("choose-poster", n.item),
				onRemove: (e) => w("remove", n.item),
				onEditMetadata: (e) => w("edit-metadata", n.item),
				onExploreData: (e) => w("explore-data", n.item)
			}, null, 8, [
				"item",
				"can-match",
				"onPlay",
				"onWatchlist",
				"onInfo",
				"onMatch",
				"onMarkWatched",
				"onRefresh",
				"onChoosePoster",
				"onRemove",
				"onEditMetadata",
				"onExploreData"
			])], !0, 0) : (g(), l("div", {
				key: 1,
				class: "skel-card",
				style: h(Z.value),
				"aria-hidden": "true"
			}, [H.value ? (g(), l("div", xe)) : (g(), l(a, { key: 1 }, [
				i[3] ||= u("div", { class: "skel-poster" }, null, -1),
				i[4] ||= u("div", { class: "skel-title" }, null, -1),
				i[5] ||= u("div", { class: "skel-sub" }, null, -1)
			], 64))], 4))], 64))), 128))], 12, be)], 12, ye),
			t.loadingMore ? (g(), l("div", Se, [...i[6] ||= [u("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), d(" Loading more… ", -1)]])) : c("", !0),
			t.hasMore && !t.loadingMore ? (g(), l("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: k,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : c("", !0)
		], 64)), f(o, { name: "media-grid-fade" }, {
			default: ie(() => [Me.value ? (g(), l("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: Ne
			}, [f(n, { name: "arrow-up" })])) : c("", !0)]),
			_: 1
		})], 8, me));
	}
}), [["__scopeId", "data-v-3d53cf6a"]]);
export { T as i, C as n, w as r, E as t };

//# sourceMappingURL=MediaGrid-AsTt-Kgk.js.map