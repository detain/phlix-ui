import { n as e, t } from "./Icon-55iG1rR7.js";
import { t as n } from "./MediaCard-BXdDCI4E.js";
import { t as r } from "./EmptyState-DjfWh3kt.js";
import { t as i } from "./Skeleton-DDhrDRE7.js";
import { t as a } from "./useMessages-BGVJcrvU.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createVNode as f, defineComponent as p, nextTick as m, onBeforeUnmount as h, onMounted as g, openBlock as _, ref as v, renderList as y, renderSlot as b, toDisplayString as x, unref as S, vShow as C, watch as w, withCtx as ee, withDirectives as T } from "vue";
// src/components/MediaRow.vue?vue&type=script&setup=true&lang.ts
var te = ["aria-label"], ne = { class: "media-row__head" }, re = { class: "media-row__title" }, E = {
	key: 0,
	class: "media-row__count numeric"
}, D = { class: "media-row__action" }, O = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, k = ["aria-label"], A = { class: "media-row__skel-poster" }, j = {
	key: 3,
	class: "media-row__viewport"
}, M = ["aria-label"], ie = ["aria-label"], ae = ["aria-label"], N = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
	setup(e, { emit: p }) {
		let { t: N } = a(), P = e, F = p, I = s(() => !P.loading && !P.error && P.items.length === 0), L = s(() => P.hideWhenEmpty && I.value), R = v(null), z = v(!1), B = v(!0), V = v(!1), H = v(!1), U = v(!1), W = s(() => z.value && !H.value && !U.value), G = s(() => W.value && !B.value), K = s(() => W.value && !V.value);
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
		return g(() => {
			typeof window < "u" && typeof window.matchMedia == "function" && (Y = window.matchMedia("(prefers-reduced-motion: reduce)"), H.value = Y.matches, Y.addEventListener("change", Q), X = window.matchMedia("(pointer: coarse), (hover: none)"), U.value = X.matches, X.addEventListener("change", $)), typeof ResizeObserver < "u" && (Z = new ResizeObserver(() => q()), R.value && Z.observe(R.value)), typeof window < "u" && window.addEventListener("resize", q, { passive: !0 }), q();
		}), h(() => {
			Y?.removeEventListener("change", Q), X?.removeEventListener("change", $), Z?.disconnect(), Z = null, typeof window < "u" && window.removeEventListener("resize", q);
		}), w(() => R.value, (e, t) => {
			Z && (t && Z.unobserve(t), e && Z.observe(e)), e && m(q);
		}), w(() => P.items.length, () => void m(q)), (a, s) => L.value ? l("", !0) : (_(), u("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [d("div", ne, [
			d("h2", re, x(e.title), 1),
			e.count == null ? l("", !0) : (_(), u("span", E, x(e.count.toLocaleString()), 1)),
			d("div", D, [b(a.$slots, "action", {}, void 0, !0)])
		]), e.error ? (_(), u("div", O, [d("span", null, x(e.error), 1), d("button", {
			type: "button",
			class: "media-row__retry",
			onClick: s[0] ||= (e) => F("retry")
		}, x(S(N)("common.retry")), 1)])) : e.loading && e.items.length === 0 ? (_(), u("div", {
			key: 1,
			class: "media-row__rail",
			role: "status",
			"aria-busy": "true",
			"aria-label": S(N)("common.loading")
		}, [(_(!0), u(o, null, y(e.skeletonCount, (e) => (_(), u("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [d("div", A, [f(i, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), f(i, {
			variant: "text",
			width: "80%"
		})]))), 128))], 8, k)) : I.value ? (_(), c(r, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: ee(() => [b(a.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (_(), u("div", j, [
			T(d("button", {
				type: "button",
				class: "media-row__arrow media-row__arrow--prev",
				"aria-label": S(N)("common.scrollLeft"),
				onClick: s[1] ||= (e) => J(-1)
			}, [f(t, {
				name: "chevron-left",
				size: 24
			})], 8, M), [[C, G.value]]),
			d("ul", {
				ref_key: "railEl",
				ref: R,
				class: "media-row__rail",
				"aria-label": e.title,
				onScroll: q
			}, [(_(!0), u(o, null, y(e.items, (t) => (_(), u("li", {
				key: t.id,
				class: "media-row__cell"
			}, [f(n, {
				item: t,
				to: e.cardTo ? e.cardTo(t) : void 0,
				"can-match": e.canMatch,
				"fetch-priority": e.fetchPriority,
				onPlay: s[2] ||= (e) => F("play", e),
				onWatchlist: s[3] ||= (e) => F("watchlist", e),
				onInfo: s[4] ||= (e) => F("info", e),
				onMatch: s[5] ||= (e) => F("match", e),
				onMarkWatched: s[6] ||= (e) => F("mark-watched", e),
				onRefresh: s[7] ||= (e) => F("refresh", e),
				onChoosePoster: s[8] ||= (e) => F("choose-poster", e),
				onRemove: s[9] ||= (e) => F("remove", e),
				onEditMetadata: s[10] ||= (e) => F("edit-metadata", e),
				onExploreData: s[11] ||= (e) => F("explore-data", e)
			}, null, 8, [
				"item",
				"to",
				"can-match",
				"fetch-priority"
			])]))), 128))], 40, ie),
			T(d("button", {
				type: "button",
				class: "media-row__arrow media-row__arrow--next",
				"aria-label": S(N)("common.scrollRight"),
				onClick: s[12] ||= (e) => J(1)
			}, [f(t, {
				name: "chevron-right",
				size: 24
			})], 8, ae), [[C, K.value]])
		]))], 8, te));
	}
}), [["__scopeId", "data-v-702f7d9e"]]);
export { N as t };

//# sourceMappingURL=MediaRow-CmsmkLCE.js.map