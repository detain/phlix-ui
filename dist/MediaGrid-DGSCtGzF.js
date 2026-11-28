import { t as e } from "./MediaCard-CBcnfo93.js";
import { n as t, t as n } from "./Icon-55iG1rR7.js";
import { a as r } from "./usePreferencesStore-BXm_CP7M.js";
import { t as i } from "./useMessages-C-PrFAcm.js";
import { Fragment as a, Transition as o, computed as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, nextTick as ee, normalizeClass as te, normalizeStyle as m, onBeforeUnmount as ne, onMounted as re, openBlock as h, ref as g, renderList as _, renderSlot as v, toDisplayString as y, unref as b, watch as x, withCtx as ie } from "vue";
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
function le(e) {
	return e <= 0 ? 0 : e + 24;
}
function ue(e) {
	return Math.max(0, e - 24);
}
function de(e, t) {
	return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(e, Math.trunc(t));
}
function fe(e, t, n) {
	return n.hasMore && !n.loading && !n.loadingMore && e >= t;
}
function pe() {
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
function me(e) {
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
var he = ["role"], ge = ["aria-label"], _e = {
	key: 0,
	class: "skel-block"
}, ve = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, ye = { class: "media-grid-empty__title" }, be = { class: "media-grid-empty__hint" }, xe = ["role"], Se = ["role"], Ce = {
	key: 0,
	class: "skel-block"
}, we = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, Te = ["aria-label"], Ee = 16, T = /*#__PURE__*/ t(/* @__PURE__ */ p({
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
		let C = t, w = S, le = r(), { t: T } = i(), E = s(() => C.cardSize ?? le.cardSize ?? 200), D = g(null), O = g(null), k = g(0), A = g(0), j = g(0), M = g(16), N = 0, P = 0;
		function F() {
			let e = D.value, t = typeof window < "u" ? window.innerHeight : 0;
			if (t > 0 && (A.value = t), e && typeof e.getBoundingClientRect == "function") {
				let t = e.getBoundingClientRect();
				t.width > 0 && (k.value = t.width), N = typeof window < "u" ? window.scrollY + t.top : 0;
			}
			if (typeof window < "u" && typeof document < "u" && typeof window.getComputedStyle == "function") {
				let e = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);
				Number.isFinite(e) && e > 0 && (M.value = e);
			}
		}
		function I() {
			let e = performance.now();
			if (e - P >= Ee) {
				P = e;
				let t = typeof window < "u" ? Math.max(0, window.scrollY - N) : 0;
				t !== j.value && (j.value = t, q.noteScroll());
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
		}), H = s(() => V.value !== null), U = s(() => B.value ?? oe(k.value, E.value, 20)), W = s(() => V.value ?? ce(se(k.value, U.value, 20), ae(M.value))), G = s(() => k.value > 0 && W.value > 0), De = s(() => de(C.items.length, C.total)), K = s(() => me({
			scrollTop: j.value,
			viewportHeight: A.value,
			rowHeight: W.value,
			columns: U.value,
			itemCount: De.value,
			overscan: C.overscan
		})), Oe = s(() => {
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
		}), q = pe();
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
			G.value && q.allowsEmission(a) && fe(e, t, {
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
		let Y = s(() => H.value ? ue(V.value ?? 0) : null), ke = s(() => Y.value === null ? {} : { gridAutoRows: `${Y.value}px` }), Ae = s(() => ({
			gridTemplateColumns: G.value || B.value !== null ? `repeat(${U.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${E.value}px, 1fr))`,
			...ke.value
		})), je = s(() => G.value ? { height: `${K.value.totalHeight}px` } : {}), Me = s(() => G.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${K.value.padTop}px)`
		} : {}), Ne = s(() => ({
			gridTemplateColumns: B.value === null ? `repeat(auto-fill, minmax(${E.value}px, 1fr))` : `repeat(${U.value}, minmax(0, 1fr))`,
			...ke.value
		})), X = s(() => Y.value === null ? {} : { height: `${Y.value}px` }), Pe = s(() => C.gridRole ? "presentation" : void 0), Fe = s(() => G.value && j.value > A.value * 1.5);
		function Ie() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		function Le(e) {
			if (typeof window > "u") return;
			let t = Math.max(1, U.value), n = Math.floor(Math.max(0, e) / t) * W.value;
			window.scrollTo?.({
				top: Math.max(0, N + n),
				behavior: "auto"
			});
		}
		p({ scrollToIndex: Le });
		let Z = null;
		function Re() {
			Z || typeof IntersectionObserver > "u" || (Z = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && C.hasMore && !C.loading && !C.loadingMore && q.allowsEmission(C.paused) && w("load-more");
			}, { rootMargin: "400px 0px" }), O.value && Z.observe(O.value));
		}
		function ze() {
			Z?.disconnect(), Z = null;
		}
		x(() => O.value, (e) => {
			ze(), e && (Re(), R());
		});
		let Q = null;
		function Be() {
			!Q && typeof ResizeObserver < "u" && D.value && (Q = new ResizeObserver(R), Q.observe(D.value));
		}
		function $() {
			Q?.disconnect(), Q = null;
		}
		return x(() => D.value, (e) => {
			$(), e && (Be(), R());
		}), re(() => {
			F(), typeof window < "u" && (window.addEventListener("scroll", I, { passive: !0 }), window.addEventListener("resize", R, { passive: !0 })), Be(), Re();
		}), ne(() => {
			typeof window < "u" && (window.removeEventListener("scroll", I), window.removeEventListener("resize", R)), L &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(L) : clearTimeout(L), 0), clearTimeout(J), $(), ze();
		}), x(() => C.items.length, () => ee(R)), x(() => C.gridRole, () => ee(R)), (r, i) => (h(), l("div", {
			class: "media-grid-root",
			role: Pe.value
		}, [t.loading && t.items.length === 0 ? (h(), l("div", {
			key: 0,
			class: te(["media-grid media-grid--skeleton", { paused: t.paused }]),
			style: m(Ne.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": b(T)("media.loadingMedia")
		}, [(h(!0), l(a, null, _(t.skeletonCount, (e) => (h(), l("div", {
			key: e,
			class: "skel-card",
			style: m(X.value),
			"aria-hidden": "true"
		}, [H.value ? (h(), l("div", _e)) : (h(), l(a, { key: 1 }, [
			i[0] ||= u("div", { class: "skel-poster" }, null, -1),
			i[1] ||= u("div", { class: "skel-title" }, null, -1),
			i[2] ||= u("div", { class: "skel-sub" }, null, -1)
		], 64))], 4))), 128))], 14, ge)) : t.items.length === 0 ? (h(), l("div", ve, [v(r.$slots, "empty", {}, () => [
			f(n, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			u("p", ye, y(b(T)("library.noMediaTitle")), 1),
			u("p", be, y(b(T)("library.noMediaHint")), 1)
		], !0)])) : (h(), l(a, { key: 2 }, [
			u("div", {
				ref_key: "sizerEl",
				ref: D,
				class: "media-grid-sizer",
				style: m(je.value),
				role: Pe.value
			}, [u("div", {
				class: "media-grid",
				style: m([Ae.value, Me.value]),
				role: t.gridRole
			}, [(h(!0), l(a, null, _(Oe.value, (n) => (h(), l(a, { key: n.item?.id ?? `skel-${n.index}` }, [n.item ? v(r.$slots, "card", {
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
			])], !0, 0) : (h(), l("div", {
				key: 1,
				class: "skel-card",
				style: m(X.value),
				"aria-hidden": "true"
			}, [H.value ? (h(), l("div", Ce)) : (h(), l(a, { key: 1 }, [
				i[3] ||= u("div", { class: "skel-poster" }, null, -1),
				i[4] ||= u("div", { class: "skel-title" }, null, -1),
				i[5] ||= u("div", { class: "skel-sub" }, null, -1)
			], 64))], 4))], 64))), 128))], 12, Se)], 12, xe),
			t.loadingMore ? (h(), l("div", we, [i[6] ||= u("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), d(" " + y(b(T)("media.loadingMore")), 1)])) : c("", !0),
			t.hasMore && !t.loadingMore ? (h(), l("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: O,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : c("", !0)
		], 64)), f(o, { name: "media-grid-fade" }, {
			default: ie(() => [Fe.value ? (h(), l("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": b(T)("media.backToTop"),
				onClick: Ie
			}, [f(n, { name: "arrow-up" })], 8, Te)) : c("", !0)]),
			_: 1
		})], 8, he));
	}
}), [["__scopeId", "data-v-3ca7ffd5"]]);
export { le as i, C as n, w as r, T as t };

//# sourceMappingURL=MediaGrid-DGSCtGzF.js.map