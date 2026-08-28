import { n as e, t } from "./Icon-CkTBN_k5.js";
import { a as n } from "./usePreferencesStore-CFPikE8Z.js";
import { t as r } from "./MediaCard-BcNPkyJz.js";
import { Fragment as i, Transition as a, computed as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, nextTick as p, normalizeStyle as m, onBeforeUnmount as ee, onMounted as te, openBlock as h, ref as g, renderList as _, renderSlot as v, watch as y, withCtx as ne } from "vue";
var b = 3 / 2;
function re(e) {
	return typeof e != "number" || !Number.isFinite(e) || e <= 0 ? 56 : e / 16 * 54 + 2;
}
120 * b, 200 * b, 120 * b;
var x = [
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
], S = x.map((e) => e.track).join(" ");
function ie(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function ae(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function oe(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * b + t + n;
}
function C(e) {
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
var de = ["role"], fe = {
	key: 0,
	class: "skel-block"
}, pe = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, me = ["role"], he = ["role"], ge = {
	key: 0,
	class: "skel-block"
}, _e = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, ve = 16, w = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
	setup(e, { expose: f, emit: b }) {
		let x = e, S = b, C = n(), w = o(() => x.cardSize ?? C.cardSize ?? 200), T = g(null), E = g(null), D = g(0), O = g(0), k = g(0), A = g(16), j = 0, M = 0;
		function N() {
			let e = T.value, t = typeof window < "u" ? window.innerHeight : 0;
			if (t > 0 && (O.value = t), e && typeof e.getBoundingClientRect == "function") {
				let t = e.getBoundingClientRect();
				t.width > 0 && (D.value = t.width), j = typeof window < "u" ? window.scrollY + t.top : 0;
			}
			if (typeof window < "u" && typeof document < "u" && typeof window.getComputedStyle == "function") {
				let e = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);
				Number.isFinite(e) && e > 0 && (A.value = e);
			}
		}
		function P() {
			let e = performance.now();
			e - M >= ve && (M = e, k.value = typeof window < "u" ? Math.max(0, window.scrollY - j) : 0);
		}
		let F = 0;
		function I() {
			F ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				F = 0, N();
			});
		}
		let L = null, R = o(() => {
			let e = x.columns;
			return typeof e == "number" && Number.isFinite(e) && e >= 1 ? Math.trunc(e) : null;
		}), z = o(() => {
			let e = x.rowHeight;
			return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : null;
		}), B = o(() => z.value !== null), V = o(() => R.value ?? ie(D.value, w.value, 20)), H = o(() => z.value ?? oe(ae(D.value, V.value, 20), re(A.value))), U = o(() => D.value > 0 && H.value > 0), ye = o(() => ce(x.items.length, x.total)), W = o(() => ue({
			scrollTop: k.value,
			viewportHeight: O.value,
			rowHeight: H.value,
			columns: V.value,
			itemCount: ye.value,
			overscan: x.overscan
		})), be = o(() => {
			if (!U.value) return x.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let e = x.items, { startIndex: t, endIndex: n } = W.value;
			if (L && L.startIndex === t && L.endIndex === n && L.source === e) return L.items;
			let r = [];
			for (let i = t; i < n; i++) r.push({
				item: e[i] ?? null,
				index: i
			});
			return L = {
				startIndex: t,
				endIndex: n,
				source: e,
				items: r
			}, r;
		});
		y(() => [
			W.value.endIndex,
			x.items.length,
			x.hasMore,
			x.loading,
			x.loadingMore
		], ([e, t, n, r, i]) => {
			U.value && le(e, t, {
				hasMore: n,
				loading: r,
				loadingMore: i
			}) && S("load-more");
		});
		let G;
		y(() => [
			U.value,
			W.value.startIndex,
			W.value.endIndex
		], ([e, t, n]) => {
			!e || n <= t || (clearTimeout(G), G = setTimeout(() => S("need-range", t, n), 120));
		}, { immediate: !0 });
		let K = o(() => B.value ? se(z.value ?? 0) : null), q = o(() => K.value === null ? {} : { gridAutoRows: `${K.value}px` }), xe = o(() => ({
			gridTemplateColumns: U.value || R.value !== null ? `repeat(${V.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${w.value}px, 1fr))`,
			...q.value
		})), Se = o(() => U.value ? { height: `${W.value.totalHeight}px` } : {}), Ce = o(() => U.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${W.value.padTop}px)`
		} : {}), we = o(() => ({
			gridTemplateColumns: R.value === null ? `repeat(auto-fill, minmax(${w.value}px, 1fr))` : `repeat(${V.value}, minmax(0, 1fr))`,
			...q.value
		})), J = o(() => K.value === null ? {} : { height: `${K.value}px` }), Y = o(() => x.gridRole ? "presentation" : void 0), Te = o(() => U.value && k.value > O.value * 1.5);
		function Ee() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		function De(e) {
			if (typeof window > "u") return;
			let t = Math.max(1, V.value), n = Math.floor(Math.max(0, e) / t) * H.value;
			window.scrollTo?.({
				top: Math.max(0, j + n),
				behavior: "auto"
			});
		}
		f({ scrollToIndex: De });
		let X = null;
		function Z() {
			X || typeof IntersectionObserver > "u" || (X = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && x.hasMore && !x.loading && !x.loadingMore && S("load-more");
			}, { rootMargin: "400px 0px" }), E.value && X.observe(E.value));
		}
		function Oe() {
			X?.disconnect(), X = null;
		}
		y(() => E.value, (e) => {
			Oe(), e && (Z(), I());
		});
		let Q = null;
		function ke() {
			Q || typeof ResizeObserver > "u" || !T.value || (Q = new ResizeObserver(I), Q.observe(T.value));
		}
		function $() {
			Q?.disconnect(), Q = null;
		}
		return y(() => T.value, (e) => {
			$(), e && (ke(), I());
		}), te(() => {
			N(), typeof window < "u" && (window.addEventListener("scroll", P, { passive: !0 }), window.addEventListener("resize", I, { passive: !0 })), ke(), Z();
		}), ee(() => {
			typeof window < "u" && (window.removeEventListener("scroll", P), window.removeEventListener("resize", I)), F &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(F) : clearTimeout(F), 0), clearTimeout(G), $(), Oe();
		}), y(() => x.items.length, () => p(I)), y(() => x.gridRole, () => p(I)), (n, o) => (h(), c("div", {
			class: "media-grid-root",
			role: Y.value
		}, [e.loading && e.items.length === 0 ? (h(), c("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: m(we.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(h(!0), c(i, null, _(e.skeletonCount, (e) => (h(), c("div", {
			key: e,
			class: "skel-card",
			style: m(J.value),
			"aria-hidden": "true"
		}, [B.value ? (h(), c("div", fe)) : (h(), c(i, { key: 1 }, [
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
				ref: T,
				class: "media-grid-sizer",
				style: m(Se.value),
				role: Y.value
			}, [l("div", {
				class: "media-grid",
				style: m([xe.value, Ce.value]),
				role: e.gridRole
			}, [(h(!0), c(i, null, _(be.value, (t) => (h(), c(i, { key: t.item?.id ?? `skel-${t.index}` }, [t.item ? v(n.$slots, "card", {
				item: t.item,
				index: t.index
			}, () => [d(r, {
				item: t.item,
				"can-match": e.canMatch,
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
				style: m(J.value),
				"aria-hidden": "true"
			}, [B.value ? (h(), c("div", ge)) : (h(), c(i, { key: 1 }, [
				o[5] ||= l("div", { class: "skel-poster" }, null, -1),
				o[6] ||= l("div", { class: "skel-title" }, null, -1),
				o[7] ||= l("div", { class: "skel-sub" }, null, -1)
			], 64))], 4))], 64))), 128))], 12, he)], 12, me),
			e.loadingMore ? (h(), c("div", _e, [...o[8] ||= [l("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), u(" Loading more… ", -1)]])) : s("", !0),
			e.hasMore && !e.loadingMore ? (h(), c("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: E,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : s("", !0)
		], 64)), d(a, { name: "media-grid-fade" }, {
			default: ne(() => [Te.value ? (h(), c("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: Ee
			}, [d(t, { name: "arrow-up" })])) : s("", !0)]),
			_: 1
		})], 8, de));
	}
}), [["__scopeId", "data-v-7898dc3e"]]);
//#endregion
export { C as i, x as n, S as r, w as t };

//# sourceMappingURL=MediaGrid-DZcfApdw.js.map