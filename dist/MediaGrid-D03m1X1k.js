import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CfPSBsz2.js";
import { a as n } from "./usePreferencesStore-CFPikE8Z.js";
import { t as r } from "./MediaCard-BvKc8NXt.js";
import { Fragment as i, Transition as a, computed as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, nextTick as p, normalizeStyle as m, onBeforeUnmount as ee, onMounted as te, openBlock as h, ref as g, renderList as _, renderSlot as v, watch as y, withCtx as ne } from "vue";
var b = 3 / 2;
function re(e) {
	return typeof e != "number" || !Number.isFinite(e) || e <= 0 ? 56 : e / 16 * 54 + 2;
}
120 * b, 200 * b;
function ie(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function ae(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function oe(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * b + t + n;
}
function x(e) {
	return e <= 0 ? 0 : e + 24;
}
function se(e) {
	return Math.max(0, e - 24);
}
function ce(e, t) {
	return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(e, Math.trunc(t));
}
function le(e, t, n) {
	return n.hasMore && !n.loading && !n.loadingMore && e >= t;
}
function ue(e) {
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
//#endregion
//#region src/components/MediaGrid.vue?vue&type=script&setup=true&lang.ts
var de = { class: "media-grid-root" }, fe = {
	key: 0,
	class: "skel-block"
}, pe = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, me = {
	key: 0,
	class: "skel-block"
}, he = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, ge = 16, S = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
		cardSize: {},
		columns: {},
		rowHeight: {},
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
	setup(e, { expose: f, emit: b }) {
		let x = e, S = b, _e = n(), C = o(() => x.cardSize ?? _e.cardSize ?? 200), w = g(null), T = g(null), E = g(0), D = g(0), O = g(0), k = g(16), A = 0, j = 0;
		function M() {
			let e = w.value, t = typeof window < "u" ? window.innerHeight : 0;
			if (t > 0 && (D.value = t), e && typeof e.getBoundingClientRect == "function") {
				let t = e.getBoundingClientRect();
				t.width > 0 && (E.value = t.width), A = typeof window < "u" ? window.scrollY + t.top : 0;
			}
			if (typeof window < "u" && typeof document < "u" && typeof window.getComputedStyle == "function") {
				let e = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);
				Number.isFinite(e) && e > 0 && (k.value = e);
			}
		}
		function N() {
			let e = performance.now();
			e - j >= ge && (j = e, O.value = typeof window < "u" ? Math.max(0, window.scrollY - A) : 0);
		}
		let P = 0;
		function F() {
			P ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				P = 0, M();
			});
		}
		let I = null, L = o(() => {
			let e = x.columns;
			return typeof e == "number" && Number.isFinite(e) && e >= 1 ? Math.trunc(e) : null;
		}), R = o(() => {
			let e = x.rowHeight;
			return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : null;
		}), z = o(() => R.value !== null), B = o(() => L.value ?? ie(E.value, C.value, 20)), V = o(() => R.value ?? oe(ae(E.value, B.value, 20), re(k.value))), H = o(() => E.value > 0 && V.value > 0), ve = o(() => ce(x.items.length, x.total)), U = o(() => ue({
			scrollTop: O.value,
			viewportHeight: D.value,
			rowHeight: V.value,
			columns: B.value,
			itemCount: ve.value,
			overscan: x.overscan
		})), ye = o(() => {
			if (!H.value) return x.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let e = x.items, { startIndex: t, endIndex: n } = U.value;
			if (I && I.startIndex === t && I.endIndex === n && I.source === e) return I.items;
			let r = [];
			for (let i = t; i < n; i++) r.push({
				item: e[i] ?? null,
				index: i
			});
			return I = {
				startIndex: t,
				endIndex: n,
				source: e,
				items: r
			}, r;
		});
		y(() => [
			U.value.endIndex,
			x.items.length,
			x.hasMore,
			x.loading,
			x.loadingMore
		], ([e, t, n, r, i]) => {
			H.value && le(e, t, {
				hasMore: n,
				loading: r,
				loadingMore: i
			}) && S("load-more");
		});
		let W;
		y(() => [
			H.value,
			U.value.startIndex,
			U.value.endIndex
		], ([e, t, n]) => {
			!e || n <= t || (clearTimeout(W), W = setTimeout(() => S("need-range", t, n), 120));
		}, { immediate: !0 });
		let G = o(() => z.value ? se(R.value ?? 0) : null), K = o(() => G.value === null ? {} : { gridAutoRows: `${G.value}px` }), be = o(() => ({
			gridTemplateColumns: H.value || L.value !== null ? `repeat(${B.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${C.value}px, 1fr))`,
			...K.value
		})), xe = o(() => H.value ? { height: `${U.value.totalHeight}px` } : {}), Se = o(() => H.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${U.value.padTop}px)`
		} : {}), Ce = o(() => ({
			gridTemplateColumns: L.value === null ? `repeat(auto-fill, minmax(${C.value}px, 1fr))` : `repeat(${B.value}, minmax(0, 1fr))`,
			...K.value
		})), q = o(() => G.value === null ? {} : { height: `${G.value}px` }), we = o(() => H.value && O.value > D.value * 1.5);
		function Te() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		function Ee(e) {
			if (typeof window > "u") return;
			let t = Math.max(1, B.value), n = Math.floor(Math.max(0, e) / t) * V.value;
			window.scrollTo?.({
				top: Math.max(0, A + n),
				behavior: "auto"
			});
		}
		f({ scrollToIndex: Ee });
		let J = null;
		function Y() {
			J || typeof IntersectionObserver > "u" || (J = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && x.hasMore && !x.loading && !x.loadingMore && S("load-more");
			}, { rootMargin: "400px 0px" }), T.value && J.observe(T.value));
		}
		function X() {
			J?.disconnect(), J = null;
		}
		y(() => T.value, (e) => {
			X(), e && (Y(), F());
		});
		let Z = null;
		function Q() {
			Z || typeof ResizeObserver > "u" || !w.value || (Z = new ResizeObserver(F), Z.observe(w.value));
		}
		function $() {
			Z?.disconnect(), Z = null;
		}
		return y(() => w.value, (e) => {
			$(), e && (Q(), F());
		}), te(() => {
			M(), typeof window < "u" && (window.addEventListener("scroll", N, { passive: !0 }), window.addEventListener("resize", F, { passive: !0 })), Q(), Y();
		}), ee(() => {
			typeof window < "u" && (window.removeEventListener("scroll", N), window.removeEventListener("resize", F)), P &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(P) : clearTimeout(P), 0), clearTimeout(W), $(), X();
		}), y(() => x.items.length, () => p(F)), (n, o) => (h(), c("div", de, [e.loading && e.items.length === 0 ? (h(), c("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: m(Ce.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(h(!0), c(i, null, _(e.skeletonCount, (e) => (h(), c("div", {
			key: e,
			class: "skel-card",
			style: m(q.value),
			"aria-hidden": "true"
		}, [z.value ? (h(), c("div", fe)) : (h(), c(i, { key: 1 }, [
			o[0] ||= l("div", { class: "skel-poster" }, null, -1),
			o[1] ||= l("div", { class: "skel-title" }, null, -1),
			o[2] ||= l("div", { class: "skel-sub" }, null, -1)
		], 64))], 4))), 128))], 4)) : e.items.length === 0 ? (h(), c("div", pe, [v(n.$slots, "empty", {}, () => [
			d(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			o[3] ||= l("p", { class: "media-grid-empty__title" }, "No media found", -1),
			o[4] ||= l("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (h(), c(i, { key: 2 }, [
			l("div", {
				ref_key: "sizerEl",
				ref: w,
				class: "media-grid-sizer",
				style: m(xe.value)
			}, [l("div", {
				class: "media-grid",
				style: m([be.value, Se.value])
			}, [(h(!0), c(i, null, _(ye.value, (t) => (h(), c(i, { key: t.item?.id ?? `skel-${t.index}` }, [t.item ? v(n.$slots, "card", {
				item: t.item,
				index: t.index
			}, () => [d(r, {
				item: t.item,
				"can-match": e.canMatch,
				lazy: !1,
				onPlay: (e) => S("play", t.item),
				onWatchlist: (e) => S("watchlist", t.item),
				onInfo: (e) => S("info", t.item),
				onMatch: (e) => S("match", t.item),
				onMarkWatched: (e) => S("mark-watched", t.item),
				onRefresh: (e) => S("refresh", t.item),
				onChoosePoster: (e) => S("choose-poster", t.item),
				onRemove: (e) => S("remove", t.item),
				onEditMetadata: (e) => S("edit-metadata", t.item),
				onExploreData: (e) => S("explore-data", t.item)
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
			])], !0, 0) : (h(), c("div", {
				key: 1,
				class: "skel-card",
				style: m(q.value),
				"aria-hidden": "true"
			}, [z.value ? (h(), c("div", me)) : (h(), c(i, { key: 1 }, [
				o[5] ||= l("div", { class: "skel-poster" }, null, -1),
				o[6] ||= l("div", { class: "skel-title" }, null, -1),
				o[7] ||= l("div", { class: "skel-sub" }, null, -1)
			], 64))], 4))], 64))), 128))], 4)], 4),
			e.loadingMore ? (h(), c("div", he, [...o[8] ||= [l("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), u(" Loading more… ", -1)]])) : s("", !0),
			e.hasMore && !e.loadingMore ? (h(), c("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: T,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : s("", !0)
		], 64)), d(a, { name: "media-grid-fade" }, {
			default: ne(() => [we.value ? (h(), c("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: Te
			}, [d(t, { name: "arrow-up" })])) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-9ab1c553"]]);
//#endregion
export { x as n, S as t };

//# sourceMappingURL=MediaGrid-D03m1X1k.js.map