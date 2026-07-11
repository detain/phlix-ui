import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-C0x49DFi.js";
import { a as n } from "./usePreferencesStore-g-d6JBr9.js";
import { t as r } from "./MediaCard-DBCDtyDU.js";
import { Fragment as i, Transition as a, computed as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, nextTick as p, normalizeStyle as m, onBeforeUnmount as ee, onMounted as te, openBlock as h, ref as g, renderList as _, renderSlot as v, watch as y, withCtx as ne } from "vue";
var b = 3 / 2;
function re(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function ie(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function x(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * b + t + n;
}
function ae(e, t) {
	return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(e, Math.trunc(t));
}
function oe(e, t, n) {
	return n.hasMore && !n.loading && !n.loadingMore && e >= t;
}
function S(e) {
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
}, D = 16, O = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
	setup(e, { expose: f, emit: b }) {
		let O = e, k = b, se = n(), A = o(() => O.cardSize ?? se.cardSize ?? 200), j = g(null), M = g(null), N = g(0), P = g(0), F = g(0), I = 0, L = 0;
		function R() {
			let e = j.value, t = typeof window < "u" ? window.innerHeight : 0;
			if (t > 0 && (P.value = t), e && typeof e.getBoundingClientRect == "function") {
				let t = e.getBoundingClientRect();
				t.width > 0 && (N.value = t.width), I = typeof window < "u" ? window.scrollY + t.top : 0;
			}
		}
		function z() {
			let e = performance.now();
			e - L >= D && (L = e, F.value = typeof window < "u" ? Math.max(0, window.scrollY - I) : 0, R());
		}
		let B = 0;
		function V() {
			B ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				B = 0, R();
			});
		}
		let H = g(null), U = o(() => re(N.value, A.value, 20)), W = o(() => x(ie(N.value, U.value, 20))), G = o(() => N.value > 0 && W.value > 0), ce = o(() => ae(O.items.length, O.total)), K = o(() => S({
			scrollTop: F.value,
			viewportHeight: P.value,
			rowHeight: W.value,
			columns: U.value,
			itemCount: ce.value,
			overscan: O.overscan
		})), le = o(() => {
			if (!G.value) return O.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = K.value;
			if (H.value && H.value.startIndex === e && H.value.endIndex === t) return H.value.items;
			let n = [];
			for (let r = e; r < t; r++) n.push({
				item: O.items[r] ?? null,
				index: r
			});
			return H.value = {
				startIndex: e,
				endIndex: t,
				items: n
			}, n;
		});
		y(() => [
			K.value.endIndex,
			O.items.length,
			O.hasMore,
			O.loading,
			O.loadingMore
		], ([e, t, n, r, i]) => {
			G.value && oe(e, t, {
				hasMore: n,
				loading: r,
				loadingMore: i
			}) && k("load-more");
		});
		let q;
		y(() => [
			G.value,
			K.value.startIndex,
			K.value.endIndex
		], ([e, t, n]) => {
			!e || n <= t || (clearTimeout(q), q = setTimeout(() => k("need-range", t, n), 120));
		}, { immediate: !0 });
		let ue = o(() => ({ gridTemplateColumns: G.value ? `repeat(${U.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${A.value}px, 1fr))` })), de = o(() => G.value ? { height: `${K.value.totalHeight}px` } : {}), fe = o(() => G.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${K.value.padTop}px)`
		} : {}), pe = o(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${A.value}px, 1fr))` })), me = o(() => G.value && F.value > P.value * 1.5);
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
			let t = Math.max(1, U.value), n = Math.floor(Math.max(0, e) / t) * W.value;
			window.scrollTo?.({
				top: Math.max(0, I + n),
				behavior: "auto"
			});
		}
		f({ scrollToIndex: ge });
		let J = null;
		function Y() {
			J || typeof IntersectionObserver > "u" || (J = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && O.hasMore && !O.loading && !O.loadingMore && k("load-more");
			}, { rootMargin: "400px 0px" }), M.value && J.observe(M.value));
		}
		function X() {
			J?.disconnect(), J = null;
		}
		y(() => M.value, (e) => {
			X(), e && (Y(), V());
		});
		let Z = null;
		function Q() {
			Z || typeof ResizeObserver > "u" || !j.value || (Z = new ResizeObserver(V), Z.observe(j.value));
		}
		function $() {
			Z?.disconnect(), Z = null;
		}
		return y(() => j.value, (e) => {
			$(), e && (Q(), V());
		}), te(() => {
			R(), typeof window < "u" && (window.addEventListener("scroll", z, { passive: !0 }), window.addEventListener("resize", V, { passive: !0 })), Q(), Y();
		}), ee(() => {
			typeof window < "u" && (window.removeEventListener("scroll", z), window.removeEventListener("resize", V)), B &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(B) : clearTimeout(B), 0), clearTimeout(q), $(), X();
		}), y(() => O.items.length, () => p(V)), (n, o) => (h(), c("div", C, [e.loading && e.items.length === 0 ? (h(), c("div", {
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
		]]))), 128))], 4)) : e.items.length === 0 ? (h(), c("div", w, [v(n.$slots, "empty", {}, () => [
			d(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			o[1] ||= l("p", { class: "media-grid-empty__title" }, "No media found", -1),
			o[2] ||= l("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (h(), c(i, { key: 2 }, [
			l("div", {
				ref_key: "sizerEl",
				ref: j,
				class: "media-grid-sizer",
				style: m(de.value)
			}, [l("div", {
				class: "media-grid",
				style: m([ue.value, fe.value])
			}, [(h(!0), c(i, null, _(le.value, (t) => (h(), c(i, { key: t.item?.id ?? `skel-${t.index}` }, [t.item ? v(n.$slots, "card", {
				key: 0,
				item: t.item,
				index: t.index
			}, () => [d(r, {
				item: t.item,
				"can-match": e.canMatch,
				onPlay: (e) => k("play", t.item),
				onWatchlist: (e) => k("watchlist", t.item),
				onInfo: (e) => k("info", t.item),
				onMatch: (e) => k("match", t.item),
				onMarkWatched: (e) => k("mark-watched", t.item),
				onRefresh: (e) => k("refresh", t.item),
				onChoosePoster: (e) => k("choose-poster", t.item),
				onRemove: (e) => k("remove", t.item)
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
			])], !0) : (h(), c("div", T, [...o[3] ||= [
				l("div", { class: "skel-poster" }, null, -1),
				l("div", { class: "skel-title" }, null, -1),
				l("div", { class: "skel-sub" }, null, -1)
			]]))], 64))), 128))], 4)], 4),
			e.loadingMore ? (h(), c("div", E, [...o[4] ||= [l("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), u(" Loading more… ", -1)]])) : s("", !0),
			e.hasMore && !e.loadingMore ? (h(), c("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: M,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : s("", !0)
		], 64)), d(a, { name: "media-grid-fade" }, {
			default: ne(() => [me.value ? (h(), c("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: he
			}, [d(t, { name: "arrow-up" })])) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-ed850eb0"]]);
//#endregion
export { O as t };

//# sourceMappingURL=MediaGrid-D-V5xpxR.js.map