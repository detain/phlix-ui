import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { a as n } from "./usePreferencesStore-C9GLbD7G.js";
import { t as r } from "./MediaCard-B11kpZL_.js";
import { Fragment as i, Transition as a, computed as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, nextTick as p, normalizeStyle as m, onBeforeUnmount as h, onMounted as ee, openBlock as g, ref as _, renderList as v, renderSlot as y, watch as b, withCtx as te } from "vue";
var x = 3 / 2;
function ne(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function re(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function S(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * x + t + n;
}
function ie(e, t) {
	return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(e, Math.trunc(t));
}
function ae(e, t, n) {
	return n.hasMore && !n.loading && !n.loadingMore && e >= t;
}
function oe(e) {
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
var C = { class: "media-grid-root" }, w = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, T = {
	key: 1,
	class: "skel-card",
	"aria-hidden": "true"
}, E = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, se = 16, D = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
	setup(e, { expose: f, emit: x }) {
		let D = e, O = x, ce = n(), k = o(() => D.cardSize ?? ce.cardSize ?? 200), A = _(null), j = _(null), M = _(0), N = _(0), P = _(0), F = 0, I = 0;
		function L() {
			let e = A.value, t = typeof window < "u" ? window.innerHeight : 0;
			if (t > 0 && (N.value = t), e && typeof e.getBoundingClientRect == "function") {
				let t = e.getBoundingClientRect();
				t.width > 0 && (M.value = t.width), F = typeof window < "u" ? window.scrollY + t.top : 0;
			}
		}
		function R() {
			let e = performance.now();
			e - I >= se && (I = e, P.value = typeof window < "u" ? Math.max(0, window.scrollY - F) : 0);
		}
		let z = 0;
		function B() {
			z ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				z = 0, L();
			});
		}
		let V = null, H = o(() => ne(M.value, k.value, 20)), U = o(() => S(re(M.value, H.value, 20))), W = o(() => M.value > 0 && U.value > 0), le = o(() => ie(D.items.length, D.total)), G = o(() => oe({
			scrollTop: P.value,
			viewportHeight: N.value,
			rowHeight: U.value,
			columns: H.value,
			itemCount: le.value,
			overscan: D.overscan
		})), ue = o(() => {
			if (!W.value) return D.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let e = D.items, { startIndex: t, endIndex: n } = G.value;
			if (V && V.startIndex === t && V.endIndex === n && V.source === e) return V.items;
			let r = [];
			for (let i = t; i < n; i++) r.push({
				item: e[i] ?? null,
				index: i
			});
			return V = {
				startIndex: t,
				endIndex: n,
				source: e,
				items: r
			}, r;
		});
		b(() => [
			G.value.endIndex,
			D.items.length,
			D.hasMore,
			D.loading,
			D.loadingMore
		], ([e, t, n, r, i]) => {
			W.value && ae(e, t, {
				hasMore: n,
				loading: r,
				loadingMore: i
			}) && O("load-more");
		});
		let K;
		b(() => [
			W.value,
			G.value.startIndex,
			G.value.endIndex
		], ([e, t, n]) => {
			!e || n <= t || (clearTimeout(K), K = setTimeout(() => O("need-range", t, n), 120));
		}, { immediate: !0 });
		let de = o(() => ({ gridTemplateColumns: W.value ? `repeat(${H.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${k.value}px, 1fr))` })), fe = o(() => W.value ? { height: `${G.value.totalHeight}px` } : {}), q = o(() => W.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${G.value.padTop}px)`
		} : {}), pe = o(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${k.value}px, 1fr))` })), me = o(() => W.value && P.value > N.value * 1.5);
		function he() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		function ge(e) {
			if (typeof window > "u") return;
			let t = Math.max(1, H.value), n = Math.floor(Math.max(0, e) / t) * U.value;
			window.scrollTo?.({
				top: Math.max(0, F + n),
				behavior: "auto"
			});
		}
		f({ scrollToIndex: ge });
		let J = null;
		function Y() {
			J || typeof IntersectionObserver > "u" || (J = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && D.hasMore && !D.loading && !D.loadingMore && O("load-more");
			}, { rootMargin: "400px 0px" }), j.value && J.observe(j.value));
		}
		function X() {
			J?.disconnect(), J = null;
		}
		b(() => j.value, (e) => {
			X(), e && (Y(), B());
		});
		let Z = null;
		function Q() {
			Z || typeof ResizeObserver > "u" || !A.value || (Z = new ResizeObserver(B), Z.observe(A.value));
		}
		function $() {
			Z?.disconnect(), Z = null;
		}
		return b(() => A.value, (e) => {
			$(), e && (Q(), B());
		}), ee(() => {
			L(), typeof window < "u" && (window.addEventListener("scroll", R, { passive: !0 }), window.addEventListener("resize", B, { passive: !0 })), Q(), Y();
		}), h(() => {
			typeof window < "u" && (window.removeEventListener("scroll", R), window.removeEventListener("resize", B)), z &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(z) : clearTimeout(z), 0), clearTimeout(K), $(), X();
		}), b(() => D.items.length, () => p(B)), (n, o) => (g(), c("div", C, [e.loading && e.items.length === 0 ? (g(), c("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: m(pe.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(g(!0), c(i, null, v(e.skeletonCount, (e) => (g(), c("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...o[0] ||= [
			l("div", { class: "skel-poster" }, null, -1),
			l("div", { class: "skel-title" }, null, -1),
			l("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (g(), c("div", w, [y(n.$slots, "empty", {}, () => [
			d(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			o[1] ||= l("p", { class: "media-grid-empty__title" }, "No media found", -1),
			o[2] ||= l("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (g(), c(i, { key: 2 }, [
			l("div", {
				ref_key: "sizerEl",
				ref: A,
				class: "media-grid-sizer",
				style: m(fe.value)
			}, [l("div", {
				class: "media-grid",
				style: m([de.value, q.value])
			}, [(g(!0), c(i, null, v(ue.value, (t) => (g(), c(i, { key: t.item?.id ?? `skel-${t.index}` }, [t.item ? y(n.$slots, "card", {
				item: t.item,
				index: t.index
			}, () => [d(r, {
				item: t.item,
				"can-match": e.canMatch,
				lazy: !1,
				onPlay: (e) => O("play", t.item),
				onWatchlist: (e) => O("watchlist", t.item),
				onInfo: (e) => O("info", t.item),
				onMatch: (e) => O("match", t.item),
				onMarkWatched: (e) => O("mark-watched", t.item),
				onRefresh: (e) => O("refresh", t.item),
				onChoosePoster: (e) => O("choose-poster", t.item),
				onRemove: (e) => O("remove", t.item),
				onEditMetadata: (e) => O("edit-metadata", t.item),
				onExploreData: (e) => O("explore-data", t.item)
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
			])], !0, 0) : (g(), c("div", T, [...o[3] ||= [
				l("div", { class: "skel-poster" }, null, -1),
				l("div", { class: "skel-title" }, null, -1),
				l("div", { class: "skel-sub" }, null, -1)
			]]))], 64))), 128))], 4)], 4),
			e.loadingMore ? (g(), c("div", E, [...o[4] ||= [l("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), u(" Loading more… ", -1)]])) : s("", !0),
			e.hasMore && !e.loadingMore ? (g(), c("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: j,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : s("", !0)
		], 64)), d(a, { name: "media-grid-fade" }, {
			default: te(() => [me.value ? (g(), c("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: he
			}, [d(t, { name: "arrow-up" })])) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-39820c7a"]]);
//#endregion
export { D as t };

//# sourceMappingURL=MediaGrid-Yj9pcv98.js.map