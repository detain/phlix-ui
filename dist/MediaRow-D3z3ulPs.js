import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./Skeleton-DkSoWF3C.js";
import { n } from "./MetadataMatchModal-zcWQDvkg.js";
import { t as r } from "./EmptyState-B2QnGIQT.js";
import { Fragment as i, computed as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createVNode as u, defineComponent as d, openBlock as f, renderList as p, renderSlot as m, toDisplayString as h, withCtx as g } from "vue";
//#region src/components/MediaRow.vue?vue&type=script&setup=true&lang.ts
var _ = ["aria-label"], v = { class: "media-row__head" }, y = { class: "media-row__title" }, b = {
	key: 0,
	class: "media-row__count numeric"
}, x = { class: "media-row__action" }, S = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, C = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, w = { class: "media-row__skel-poster" }, T = ["aria-label"], E = /*#__PURE__*/ e(/* @__PURE__ */ d({
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
		}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"match",
		"retry"
	],
	setup(e, { emit: d }) {
		let E = e, D = d, O = a(() => !E.loading && !E.error && E.items.length === 0), k = a(() => E.hideWhenEmpty && O.value);
		return (a, d) => k.value ? s("", !0) : (f(), c("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [l("div", v, [
			l("h2", y, h(e.title), 1),
			e.count == null ? s("", !0) : (f(), c("span", b, h(e.count.toLocaleString()), 1)),
			l("div", x, [m(a.$slots, "action", {}, void 0, !0)])
		]), e.error ? (f(), c("div", S, [l("span", null, h(e.error), 1), l("button", {
			type: "button",
			class: "media-row__retry",
			onClick: d[0] ||= (e) => D("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (f(), c("div", C, [(f(!0), c(i, null, p(e.skeletonCount, (e) => (f(), c("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [l("div", w, [u(t, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), u(t, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : O.value ? (f(), o(r, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: g(() => [m(a.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (f(), c("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(f(!0), c(i, null, p(e.items, (t) => (f(), c("li", {
			key: t.id,
			class: "media-row__cell"
		}, [u(n, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			"can-match": e.canMatch,
			onPlay: d[1] ||= (e) => D("play", e),
			onWatchlist: d[2] ||= (e) => D("watchlist", e),
			onInfo: d[3] ||= (e) => D("info", e),
			onMatch: d[4] ||= (e) => D("match", e)
		}, null, 8, [
			"item",
			"to",
			"can-match"
		])]))), 128))], 8, T))], 8, _));
	}
}), [["__scopeId", "data-v-0574ce31"]]);
//#endregion
export { E as t };

//# sourceMappingURL=MediaRow-D3z3ulPs.js.map