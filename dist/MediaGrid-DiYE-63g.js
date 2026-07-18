import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { a as n } from "./usePreferencesStore-C9GLbD7G.js";
import { t as r } from "./MediaCard-Bw8kTlnW.js";
import { Fragment as i, Transition as a, computed as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, nextTick as p, normalizeStyle as m, onBeforeUnmount as ee, onMounted as te, openBlock as h, ref as g, renderList as _, renderSlot as v, watch as y, withCtx as b } from "vue";
var x = 3 / 2;
function S(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function C(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function w(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * x + t + n;
}
function T(e, t) {
	return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(e, Math.trunc(t));
}
function ne(e, t, n) {
	return n.hasMore && !n.loading && !n.loadingMore && e >= t;
}
function re(e) {
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
var ie = { class: "media-grid-root" }, ae = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, oe = {
	key: 1,
	class: "skel-card",
	"aria-hidden": "true"
}, se = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, ce = 16, E = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
		"remove"
	],
	setup(e, { expose: f, emit: x }) {
		let E = e, D = x, O = n(), k = o(() => E.cardSize ?? O.cardSize ?? 200), A = g(null), j = g(null), M = g(0), N = g(0), P = g(0), F = 0, I = 0;
		function L() {
			let e = A.value, t = typeof window < "u" ? window.innerHeight : 0;
			if (t > 0 && (N.value = t), e && typeof e.getBoundingClientRect == "function") {
				let t = e.getBoundingClientRect();
				t.width > 0 && (M.value = t.width), F = typeof window < "u" ? window.scrollY + t.top : 0;
			}
		}
		function R() {
			let e = performance.now();
			e - I >= ce && (I = e, P.value = typeof window < "u" ? Math.max(0, window.scrollY - F) : 0);
		}
		let z = 0;
		function B() {
			z ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				z = 0, L();
			});
		}
		let V = null, H = o(() => S(M.value, k.value, 20)), U = o(() => w(C(M.value, H.value, 20))), W = o(() => M.value > 0 && U.value > 0), le = o(() => T(E.items.length, E.total)), G = o(() => re({
			scrollTop: P.value,
			viewportHeight: N.value,
			rowHeight: U.value,
			columns: H.value,
			itemCount: le.value,
			overscan: E.overscan
		})), ue = o(() => {
			if (!W.value) return E.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = G.value;
			if (V && V.startIndex === e && V.endIndex === t) return V.items;
			let n = [];
			for (let r = e; r < t; r++) n.push({
				item: E.items[r] ?? null,
				index: r
			});
			return V = {
				startIndex: e,
				endIndex: t,
				items: n
			}, n;
		});
		y(() => [
			G.value.endIndex,
			E.items.length,
			E.hasMore,
			E.loading,
			E.loadingMore
		], ([e, t, n, r, i]) => {
			W.value && ne(e, t, {
				hasMore: n,
				loading: r,
				loadingMore: i
			}) && D("load-more");
		});
		let K;
		y(() => [
			W.value,
			G.value.startIndex,
			G.value.endIndex
		], ([e, t, n]) => {
			!e || n <= t || (clearTimeout(K), K = setTimeout(() => D("need-range", t, n), 120));
		}, { immediate: !0 });
		let q = o(() => ({ gridTemplateColumns: W.value ? `repeat(${H.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${k.value}px, 1fr))` })), de = o(() => W.value ? { height: `${G.value.totalHeight}px` } : {}), fe = o(() => W.value ? {
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
				e.some((e) => e.isIntersecting) && E.hasMore && !E.loading && !E.loadingMore && D("load-more");
			}, { rootMargin: "400px 0px" }), j.value && J.observe(j.value));
		}
		function X() {
			J?.disconnect(), J = null;
		}
		y(() => j.value, (e) => {
			X(), e && (Y(), B());
		});
		let Z = null;
		function Q() {
			Z || typeof ResizeObserver > "u" || !A.value || (Z = new ResizeObserver(B), Z.observe(A.value));
		}
		function $() {
			Z?.disconnect(), Z = null;
		}
		return y(() => A.value, (e) => {
			$(), e && (Q(), B());
		}), te(() => {
			L(), typeof window < "u" && (window.addEventListener("scroll", R, { passive: !0 }), window.addEventListener("resize", B, { passive: !0 })), Q(), Y();
		}), ee(() => {
			typeof window < "u" && (window.removeEventListener("scroll", R), window.removeEventListener("resize", B)), z &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(z) : clearTimeout(z), 0), clearTimeout(K), $(), X();
		}), y(() => E.items.length, () => p(B)), (n, o) => (h(), c("div", ie, [e.loading && e.items.length === 0 ? (h(), c("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: m(pe.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(h(!0), c(i, null, _(e.skeletonCount, (e) => (h(), c("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...o[0] ||= [
			l("div", { class: "skel-poster" }, null, -1),
			l("div", { class: "skel-title" }, null, -1),
			l("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (h(), c("div", ae, [v(n.$slots, "empty", {}, () => [
			d(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			o[1] ||= l("p", { class: "media-grid-empty__title" }, "No media found", -1),
			o[2] ||= l("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (h(), c(i, { key: 2 }, [
			l("div", {
				ref_key: "sizerEl",
				ref: A,
				class: "media-grid-sizer",
				style: m(de.value)
			}, [l("div", {
				class: "media-grid",
				style: m([q.value, fe.value])
			}, [(h(!0), c(i, null, _(ue.value, (t) => (h(), c(i, { key: t.item?.id ?? `skel-${t.index}` }, [t.item ? v(n.$slots, "card", {
				item: t.item,
				index: t.index
			}, () => [d(r, {
				item: t.item,
				"can-match": e.canMatch,
				onPlay: (e) => D("play", t.item),
				onWatchlist: (e) => D("watchlist", t.item),
				onInfo: (e) => D("info", t.item),
				onMatch: (e) => D("match", t.item),
				onMarkWatched: (e) => D("mark-watched", t.item),
				onRefresh: (e) => D("refresh", t.item),
				onChoosePoster: (e) => D("choose-poster", t.item),
				onRemove: (e) => D("remove", t.item)
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
				"onRemove"
			])], !0, 0) : (h(), c("div", oe, [...o[3] ||= [
				l("div", { class: "skel-poster" }, null, -1),
				l("div", { class: "skel-title" }, null, -1),
				l("div", { class: "skel-sub" }, null, -1)
			]]))], 64))), 128))], 4)], 4),
			e.loadingMore ? (h(), c("div", se, [...o[4] ||= [l("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), u(" Loading more… ", -1)]])) : s("", !0),
			e.hasMore && !e.loadingMore ? (h(), c("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: j,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : s("", !0)
		], 64)), d(a, { name: "media-grid-fade" }, {
			default: b(() => [me.value ? (h(), c("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: he
			}, [d(t, { name: "arrow-up" })])) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-0a2bd9da"]]);
//#endregion
export { E as t };

//# sourceMappingURL=MediaGrid-DiYE-63g.js.map