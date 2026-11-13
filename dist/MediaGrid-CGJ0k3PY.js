import { t as e } from "./MediaCard-Bpg2ZfsW.js";
import { n as t, t as n } from "./Icon-55iG1rR7.js";
import { a as r } from "./usePreferencesStore-DrDMAwjz.js";
import { t as i } from "./useMessages-B96K7XS0.js";
import { Fragment as a, Transition as o, computed as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, nextTick as m, normalizeStyle as h, onBeforeUnmount as ee, onMounted as te, openBlock as g, ref as _, renderList as v, renderSlot as y, toDisplayString as b, unref as x, watch as S, withCtx as ne } from "vue";
var C = 3 / 2;
function re(e) {
	return typeof e != "number" || !Number.isFinite(e) || e <= 0 ? 56 : e / 16 * 54 + 2;
}
var w = [
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
], T = w.map((e) => e.track).join(" ");
function ie(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function ae(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function oe(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * C + t + n;
}
function E(e) {
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
// src/components/MediaGrid.vue?vue&type=script&setup=true&lang.ts
var de = ["role"], fe = {
	key: 0,
	class: "skel-block"
}, pe = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, me = { class: "media-grid-empty__title" }, he = { class: "media-grid-empty__hint" }, ge = ["role"], _e = ["role"], ve = {
	key: 0,
	class: "skel-block"
}, ye = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, be = 16, D = /*#__PURE__*/ t(/* @__PURE__ */ p({
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
	setup(t, { expose: p, emit: C }) {
		let w = t, T = C, E = r(), { t: D } = i(), O = s(() => w.cardSize ?? E.cardSize ?? 200), k = _(null), A = _(null), j = _(0), M = _(0), N = _(0), P = _(16), F = 0, I = 0;
		function L() {
			let e = k.value, t = typeof window < "u" ? window.innerHeight : 0;
			if (t > 0 && (M.value = t), e && typeof e.getBoundingClientRect == "function") {
				let t = e.getBoundingClientRect();
				t.width > 0 && (j.value = t.width), F = typeof window < "u" ? window.scrollY + t.top : 0;
			}
			if (typeof window < "u" && typeof document < "u" && typeof window.getComputedStyle == "function") {
				let e = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);
				Number.isFinite(e) && e > 0 && (P.value = e);
			}
		}
		function R() {
			let e = performance.now();
			e - I >= be && (I = e, N.value = typeof window < "u" ? Math.max(0, window.scrollY - F) : 0);
		}
		let z = 0;
		function B() {
			z ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				z = 0, L();
			});
		}
		let V = null, H = s(() => {
			let e = w.columns;
			return typeof e == "number" && Number.isFinite(e) && e >= 1 ? Math.trunc(e) : null;
		}), U = s(() => {
			let e = w.rowHeight;
			return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : null;
		}), W = s(() => U.value !== null), G = s(() => H.value ?? ie(j.value, O.value, 20)), K = s(() => U.value ?? oe(ae(j.value, G.value, 20), re(P.value))), q = s(() => j.value > 0 && K.value > 0), xe = s(() => ce(w.items.length, w.total)), J = s(() => ue({
			scrollTop: N.value,
			viewportHeight: M.value,
			rowHeight: K.value,
			columns: G.value,
			itemCount: xe.value,
			overscan: w.overscan
		})), Se = s(() => {
			if (!q.value) return w.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let e = w.items, { startIndex: t, endIndex: n } = J.value;
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
		S(() => [
			J.value.endIndex,
			w.items.length,
			w.hasMore,
			w.loading,
			w.loadingMore
		], ([e, t, n, r, i]) => {
			q.value && le(e, t, {
				hasMore: n,
				loading: r,
				loadingMore: i
			}) && T("load-more");
		});
		let Y;
		S(() => [
			q.value,
			J.value.startIndex,
			J.value.endIndex
		], ([e, t, n]) => {
			!e || n <= t || (clearTimeout(Y), Y = setTimeout(() => T("need-range", t, n), 120));
		}, { immediate: !0 });
		let X = s(() => W.value ? se(U.value ?? 0) : null), Ce = s(() => X.value === null ? {} : { gridAutoRows: `${X.value}px` }), we = s(() => ({
			gridTemplateColumns: q.value || H.value !== null ? `repeat(${G.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${O.value}px, 1fr))`,
			...Ce.value
		})), Te = s(() => q.value ? { height: `${J.value.totalHeight}px` } : {}), Ee = s(() => q.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${J.value.padTop}px)`
		} : {}), De = s(() => ({
			gridTemplateColumns: H.value === null ? `repeat(auto-fill, minmax(${O.value}px, 1fr))` : `repeat(${G.value}, minmax(0, 1fr))`,
			...Ce.value
		})), Oe = s(() => X.value === null ? {} : { height: `${X.value}px` }), ke = s(() => w.gridRole ? "presentation" : void 0), Ae = s(() => q.value && N.value > M.value * 1.5);
		function je() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		function Me(e) {
			if (typeof window > "u") return;
			let t = Math.max(1, G.value), n = Math.floor(Math.max(0, e) / t) * K.value;
			window.scrollTo?.({
				top: Math.max(0, F + n),
				behavior: "auto"
			});
		}
		p({ scrollToIndex: Me });
		let Z = null;
		function Ne() {
			Z || typeof IntersectionObserver > "u" || (Z = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && w.hasMore && !w.loading && !w.loadingMore && T("load-more");
			}, { rootMargin: "400px 0px" }), A.value && Z.observe(A.value));
		}
		function Pe() {
			Z?.disconnect(), Z = null;
		}
		S(() => A.value, (e) => {
			Pe(), e && (Ne(), B());
		});
		let Q = null;
		function Fe() {
			!Q && typeof ResizeObserver < "u" && k.value && (Q = new ResizeObserver(B), Q.observe(k.value));
		}
		function $() {
			Q?.disconnect(), Q = null;
		}
		return S(() => k.value, (e) => {
			$(), e && (Fe(), B());
		}), te(() => {
			L(), typeof window < "u" && (window.addEventListener("scroll", R, { passive: !0 }), window.addEventListener("resize", B, { passive: !0 })), Fe(), Ne();
		}), ee(() => {
			typeof window < "u" && (window.removeEventListener("scroll", R), window.removeEventListener("resize", B)), z &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(z) : clearTimeout(z), 0), clearTimeout(Y), $(), Pe();
		}), S(() => w.items.length, () => m(B)), S(() => w.gridRole, () => m(B)), (r, i) => (g(), l("div", {
			class: "media-grid-root",
			role: ke.value
		}, [t.loading && t.items.length === 0 ? (g(), l("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: h(De.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(g(!0), l(a, null, v(t.skeletonCount, (e) => (g(), l("div", {
			key: e,
			class: "skel-card",
			style: h(Oe.value),
			"aria-hidden": "true"
		}, [W.value ? (g(), l("div", fe)) : (g(), l(a, { key: 1 }, [
			i[0] ||= u("div", { class: "skel-poster" }, null, -1),
			i[1] ||= u("div", { class: "skel-title" }, null, -1),
			i[2] ||= u("div", { class: "skel-sub" }, null, -1)
		], 64))], 4))), 128))], 4)) : t.items.length === 0 ? (g(), l("div", pe, [y(r.$slots, "empty", {}, () => [
			f(n, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			u("p", me, b(x(D)("library.noMediaTitle")), 1),
			u("p", he, b(x(D)("library.noMediaHint")), 1)
		], !0)])) : (g(), l(a, { key: 2 }, [
			u("div", {
				ref_key: "sizerEl",
				ref: k,
				class: "media-grid-sizer",
				style: h(Te.value),
				role: ke.value
			}, [u("div", {
				class: "media-grid",
				style: h([we.value, Ee.value]),
				role: t.gridRole
			}, [(g(!0), l(a, null, v(Se.value, (n) => (g(), l(a, { key: n.item?.id ?? `skel-${n.index}` }, [n.item ? y(r.$slots, "card", {
				item: n.item,
				index: n.index
			}, () => [f(e, {
				item: n.item,
				"can-match": t.canMatch,
				onPlay: (e) => T("play", n.item),
				onWatchlist: (e) => T("watchlist", n.item),
				onInfo: (e) => T("info", n.item),
				onMatch: (e) => T("match", n.item),
				onMarkWatched: (e) => T("mark-watched", n.item),
				onRefresh: (e) => T("refresh", n.item),
				onChoosePoster: (e) => T("choose-poster", n.item),
				onRemove: (e) => T("remove", n.item),
				onEditMetadata: (e) => T("edit-metadata", n.item),
				onExploreData: (e) => T("explore-data", n.item)
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
				style: h(Oe.value),
				"aria-hidden": "true"
			}, [W.value ? (g(), l("div", ve)) : (g(), l(a, { key: 1 }, [
				i[3] ||= u("div", { class: "skel-poster" }, null, -1),
				i[4] ||= u("div", { class: "skel-title" }, null, -1),
				i[5] ||= u("div", { class: "skel-sub" }, null, -1)
			], 64))], 4))], 64))), 128))], 12, _e)], 12, ge),
			t.loadingMore ? (g(), l("div", ye, [...i[6] ||= [u("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), d(" Loading more… ", -1)]])) : c("", !0),
			t.hasMore && !t.loadingMore ? (g(), l("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: A,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : c("", !0)
		], 64)), f(o, { name: "media-grid-fade" }, {
			default: ne(() => [Ae.value ? (g(), l("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: je
			}, [f(n, { name: "arrow-up" })])) : c("", !0)]),
			_: 1
		})], 8, de));
	}
}), [["__scopeId", "data-v-3a3e6b41"]]);
export { E as i, w as n, T as r, D as t };

//# sourceMappingURL=MediaGrid-CGJ0k3PY.js.map