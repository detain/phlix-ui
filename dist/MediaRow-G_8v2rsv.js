import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./Skeleton-DhQmxeNg.js";
import { t as r } from "./EmptyState-ZlI5t4KT.js";
import { t as i } from "./MediaCard-B11kpZL_.js";
import { Fragment as a, computed as o, createBlock as ee, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createVNode as u, defineComponent as d, nextTick as f, onBeforeUnmount as p, onMounted as m, openBlock as h, ref as g, renderList as _, renderSlot as v, toDisplayString as y, vShow as b, watch as x, withCtx as S, withDirectives as C } from "vue";
//#region src/components/MediaRow.vue?vue&type=script&setup=true&lang.ts
var w = ["aria-label"], T = { class: "media-row__head" }, E = { class: "media-row__title" }, D = {
	key: 0,
	class: "media-row__count numeric"
}, O = { class: "media-row__action" }, k = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, A = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, j = { class: "media-row__skel-poster" }, M = {
	key: 3,
	class: "media-row__viewport"
}, N = ["aria-label"], P = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "MediaRow",
	props: {
		title: {},
		items: {},
		loading: {
			type: Boolean,
			default: !1
		},
		error: { default: null },
		count: { default: null },
		skeletonCount: { default: 6 },
		emptyText: {},
		hideWhenEmpty: {
			type: Boolean,
			default: !1
		},
		cardTo: {},
		canMatch: {
			type: Boolean,
			default: !1
		},
		fetchPriority: {}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"match",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove",
		"edit-metadata",
		"explore-data",
		"retry"
	],
	setup(e, { emit: d }) {
		let P = e, F = d, I = o(() => !P.loading && !P.error && P.items.length === 0), L = o(() => P.hideWhenEmpty && I.value), R = g(null), z = g(!1), B = g(!0), V = g(!1), H = g(!1), U = g(!1), W = o(() => z.value && !H.value && !U.value), G = o(() => W.value && !B.value), K = o(() => W.value && !V.value);
		function q() {
			let e = R.value;
			if (!e) {
				z.value = !1;
				return;
			}
			let { scrollLeft: t, scrollWidth: n, clientWidth: r } = e;
			z.value = n - r > 1, B.value = t <= 1, V.value = t >= n - r - 1;
		}
		function J(e) {
			let t = R.value;
			t && t.scrollBy({
				left: e * t.clientWidth * .9,
				behavior: H.value ? "auto" : "smooth"
			});
		}
		let Y = null, X = null, Z = null;
		function Q(e) {
			H.value = e.matches;
		}
		function $(e) {
			U.value = e.matches;
		}
		return m(() => {
			typeof window < "u" && typeof window.matchMedia == "function" && (Y = window.matchMedia("(prefers-reduced-motion: reduce)"), H.value = Y.matches, Y.addEventListener("change", Q), X = window.matchMedia("(pointer: coarse), (hover: none)"), U.value = X.matches, X.addEventListener("change", $)), typeof ResizeObserver < "u" && (Z = new ResizeObserver(() => q()), R.value && Z.observe(R.value)), typeof window < "u" && window.addEventListener("resize", q, { passive: !0 }), q();
		}), p(() => {
			Y?.removeEventListener("change", Q), X?.removeEventListener("change", $), Z?.disconnect(), Z = null, typeof window < "u" && window.removeEventListener("resize", q);
		}), x(() => R.value, (e, t) => {
			Z && (t && Z.unobserve(t), e && Z.observe(e)), e && f(q);
		}), x(() => P.items.length, () => void f(q)), (o, d) => L.value ? s("", !0) : (h(), c("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [l("div", T, [
			l("h2", E, y(e.title), 1),
			e.count == null ? s("", !0) : (h(), c("span", D, y(e.count.toLocaleString()), 1)),
			l("div", O, [v(o.$slots, "action", {}, void 0, !0)])
		]), e.error ? (h(), c("div", k, [l("span", null, y(e.error), 1), l("button", {
			type: "button",
			class: "media-row__retry",
			onClick: d[0] ||= (e) => F("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (h(), c("div", A, [(h(!0), c(a, null, _(e.skeletonCount, (e) => (h(), c("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [l("div", j, [u(n, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), u(n, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : I.value ? (h(), ee(r, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: S(() => [v(o.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (h(), c("div", M, [
			C(l("button", {
				type: "button",
				class: "media-row__arrow media-row__arrow--prev",
				"aria-label": "Scroll left",
				onClick: d[1] ||= (e) => J(-1)
			}, [u(t, {
				name: "chevron-left",
				size: 24
			})], 512), [[b, G.value]]),
			l("ul", {
				ref_key: "railEl",
				ref: R,
				class: "media-row__rail",
				"aria-label": e.title,
				onScroll: q
			}, [(h(!0), c(a, null, _(e.items, (t) => (h(), c("li", {
				key: t.id,
				class: "media-row__cell"
			}, [u(i, {
				item: t,
				to: e.cardTo ? e.cardTo(t) : void 0,
				"can-match": e.canMatch,
				"fetch-priority": e.fetchPriority,
				onPlay: d[2] ||= (e) => F("play", e),
				onWatchlist: d[3] ||= (e) => F("watchlist", e),
				onInfo: d[4] ||= (e) => F("info", e),
				onMatch: d[5] ||= (e) => F("match", e),
				onMarkWatched: d[6] ||= (e) => F("mark-watched", e),
				onRefresh: d[7] ||= (e) => F("refresh", e),
				onChoosePoster: d[8] ||= (e) => F("choose-poster", e),
				onRemove: d[9] ||= (e) => F("remove", e),
				onEditMetadata: d[10] ||= (e) => F("edit-metadata", e),
				onExploreData: d[11] ||= (e) => F("explore-data", e)
			}, null, 8, [
				"item",
				"to",
				"can-match",
				"fetch-priority"
			])]))), 128))], 40, N),
			C(l("button", {
				type: "button",
				class: "media-row__arrow media-row__arrow--next",
				"aria-label": "Scroll right",
				onClick: d[12] ||= (e) => J(1)
			}, [u(t, {
				name: "chevron-right",
				size: 24
			})], 512), [[b, K.value]])
		]))], 8, w));
	}
}), [["__scopeId", "data-v-718fdeb5"]]);
//#endregion
export { P as t };

//# sourceMappingURL=MediaRow-G_8v2rsv.js.map