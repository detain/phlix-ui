import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./media-query-DowsWq-z.js";
import { n as r, t as i } from "./EmptyState-Ds4WcVdG.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, normalizeClass as m, normalizeStyle as h, onMounted as g, openBlock as _, ref as v, renderList as y, renderSlot as b, toDisplayString as x, withCtx as S } from "vue";
//#region src/components/ui/Chip.vue?vue&type=script&setup=true&lang.ts
var C = ["disabled", "aria-pressed"], w = { class: "phlix-chip__label" }, T = ["disabled", "aria-label"], E = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "Chip",
	props: {
		selected: {
			type: Boolean,
			default: void 0
		},
		removable: {
			type: Boolean,
			default: !1
		},
		icon: {},
		size: { default: "sm" },
		disabled: {
			type: Boolean,
			default: !1
		},
		removeLabel: { default: "Remove" }
	},
	emits: [
		"update:selected",
		"click",
		"remove"
	],
	setup(e, { emit: n }) {
		let r = e, i = n;
		function a() {
			r.disabled || (r.selected !== void 0 && i("update:selected", !r.selected), i("click"));
		}
		return (n, r) => (_(), l("span", { class: m(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [u("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: a
		}, [e.icon ? (_(), s(t, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : c("", !0), u("span", w, [b(n.$slots, "default", {}, void 0, !0)])], 8, C), e.removable ? (_(), l("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: r[0] ||= (e) => i("remove")
		}, [f(t, { name: "x" })], 8, T)) : c("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]), D = { class: "media-card" }, O = { class: "media-card__poster" }, k = ["href", "aria-label"], A = { class: "visually-hidden" }, j = ["src", "alt"], M = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, N = { class: "media-card__badges" }, P = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, F = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, I = ["aria-valuenow", "aria-label"], L = { class: "media-card__overlay" }, R = { class: "media-card__title" }, z = { class: "media-card__meta" }, B = {
	key: 0,
	class: "numeric"
}, V = {
	key: 1,
	class: "media-card__dot"
}, H = {
	key: 2,
	class: "media-card__cert"
}, U = {
	key: 3,
	class: "media-card__dot"
}, ee = {
	key: 4,
	class: "numeric"
}, W = {
	key: 0,
	class: "media-card__genres"
}, G = { class: "media-card__actions" }, K = { class: "media-card__caption" }, q = ["title"], J = { class: "media-card__caption-sub numeric" }, Y = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 }
	},
	emits: [
		"play",
		"watchlist",
		"info"
	],
	setup(e, { emit: r }) {
		let i = e, s = r, p = n(), S = o(() => i.to ?? `/app/player/${i.item.id}`), C = v(!1), w = v(null);
		function T() {
			C.value = !0;
		}
		g(() => {
			w.value?.complete && (C.value = !0);
		});
		let E = o(() => {
			let e = i.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= i.newWithinDays * 24 * 60 * 60 * 1e3;
		}), Y = o(() => {
			let e = p.resumePositionFor(i.item.id), t = i.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), X = o(() => i.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (_(), l("article", D, [u("div", O, [
			u("a", {
				href: S.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [u("span", A, x(e.item.name), 1)], 8, k),
			e.item.poster_url ? (_(), l("img", {
				key: 0,
				ref_key: "imgEl",
				ref: w,
				class: m(["media-card__img", { "is-loaded": C.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: T
			}, null, 42, j)) : (_(), l("div", M, [f(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			u("div", N, [
				E.value ? (_(), l("span", P, "New")) : c("", !0),
				b(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (_(), l("span", F, x(e.quality), 1)) : c("", !0)
			]),
			Y.value > 0 ? (_(), l("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(Y.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [u("i", { style: h({ width: `${Y.value * 100}%` }) }, null, 4)], 8, I)) : c("", !0),
			u("div", L, [
				u("h3", R, x(e.item.name), 1),
				u("div", z, [
					e.item.year ? (_(), l("span", B, x(e.item.year), 1)) : c("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (_(), l("span", V)) : c("", !0),
					e.item.rating ? (_(), l("span", H, x(e.item.rating), 1)) : c("", !0),
					e.item.rating && e.item.runtime ? (_(), l("span", U)) : c("", !0),
					e.item.runtime ? (_(), l("span", ee, x(e.item.runtime) + "m", 1)) : c("", !0)
				]),
				X.value.length ? (_(), l("div", W, [(_(!0), l(a, null, y(X.value, (e) => (_(), l("span", { key: e }, x(e), 1))), 128))])) : c("", !0),
				u("div", G, [
					u("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= (t) => s("play", e.item)
					}, [f(t, { name: "play" })]),
					u("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: r[1] ||= (t) => s("watchlist", e.item)
					}, [f(t, { name: "bookmark-plus" })]),
					u("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= (t) => s("info", e.item)
					}, [f(t, { name: "info" })]),
					b(n.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), u("div", K, [u("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, x(e.item.name), 9, q), u("div", J, [
			e.item.year ? (_(), l(a, { key: 0 }, [d(x(e.item.year), 1)], 64)) : c("", !0),
			e.item.year && e.item.runtime ? (_(), l(a, { key: 1 }, [d(" · ")], 64)) : c("", !0),
			e.item.runtime ? (_(), l(a, { key: 2 }, [d(x(e.item.runtime) + "m", 1)], 64)) : c("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), X = ["aria-label"], Z = { class: "media-row__head" }, Q = { class: "media-row__title" }, $ = {
	key: 0,
	class: "media-row__count numeric"
}, te = { class: "media-row__action" }, ne = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, re = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, ie = { class: "media-row__skel-poster" }, ae = ["aria-label"], oe = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		let n = e, d = t, p = o(() => !n.loading && !n.error && n.items.length === 0), m = o(() => n.hideWhenEmpty && p.value);
		return (t, n) => m.value ? c("", !0) : (_(), l("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [u("div", Z, [
			u("h2", Q, x(e.title), 1),
			e.count == null ? c("", !0) : (_(), l("span", $, x(e.count.toLocaleString()), 1)),
			u("div", te, [b(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (_(), l("div", ne, [u("span", null, x(e.error), 1), u("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => d("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (_(), l("div", re, [(_(!0), l(a, null, y(e.skeletonCount, (e) => (_(), l("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [u("div", ie, [f(r, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), f(r, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : p.value ? (_(), s(i, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: S(() => [b(t.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (_(), l("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(_(!0), l(a, null, y(e.items, (t) => (_(), l("li", {
			key: t.id,
			class: "media-row__cell"
		}, [f(Y, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => d("play", e),
			onWatchlist: n[2] ||= (e) => d("watchlist", e),
			onInfo: n[3] ||= (e) => d("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, ae))], 8, X));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
export { Y as n, E as r, oe as t };

//# sourceMappingURL=MediaRow-CQOxRkOG.js.map