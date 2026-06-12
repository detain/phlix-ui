import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useMessages-Dwm0lQlG.js";
import { t as r } from "./Skeleton-DkSoWF3C.js";
import { t as i } from "./EmptyState-B2QnGIQT.js";
import { t as a } from "./MediaCard-BUq_DyAQ.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createVNode as f, defineComponent as p, normalizeStyle as m, openBlock as h, renderList as g, renderSlot as _, toDisplayString as v, unref as y, withCtx as b } from "vue";
//#region src/components/ui/Spinner.vue?vue&type=script&setup=true&lang.ts
var x = ["aria-label"], S = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let r = e, { t: i } = n(), a = s(() => r.size === void 0 ? void 0 : typeof r.size == "number" ? `${r.size}px` : r.size);
		return (n, r) => (h(), u("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? y(i)("common.loading"),
			style: m(a.value ? { fontSize: a.value } : void 0)
		}, [f(t, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, x));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), C = ["aria-label"], w = { class: "media-row__head" }, T = { class: "media-row__title" }, E = {
	key: 0,
	class: "media-row__count numeric"
}, D = { class: "media-row__action" }, O = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, k = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, A = { class: "media-row__skel-poster" }, j = ["aria-label"], M = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		cardTo: {}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"retry"
	],
	setup(e, { emit: t }) {
		let n = e, p = t, m = s(() => !n.loading && !n.error && n.items.length === 0), y = s(() => n.hideWhenEmpty && m.value);
		return (t, n) => y.value ? l("", !0) : (h(), u("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [d("div", w, [
			d("h2", T, v(e.title), 1),
			e.count == null ? l("", !0) : (h(), u("span", E, v(e.count.toLocaleString()), 1)),
			d("div", D, [_(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (h(), u("div", O, [d("span", null, v(e.error), 1), d("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => p("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (h(), u("div", k, [(h(!0), u(o, null, g(e.skeletonCount, (e) => (h(), u("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [d("div", A, [f(r, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), f(r, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : m.value ? (h(), c(i, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: b(() => [_(t.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (h(), u("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(h(!0), u(o, null, g(e.items, (t) => (h(), u("li", {
			key: t.id,
			class: "media-row__cell"
		}, [f(a, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => p("play", e),
			onWatchlist: n[2] ||= (e) => p("watchlist", e),
			onInfo: n[3] ||= (e) => p("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, j))], 8, C));
	}
}), [["__scopeId", "data-v-6f567cc7"]]);
//#endregion
export { S as n, M as t };

//# sourceMappingURL=MediaRow-CUlaxo3r.js.map