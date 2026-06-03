import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./media-query-DowsWq-z.js";
import { n as r, t as i } from "./EmptyState-Ds4WcVdG.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as m, normalizeClass as h, normalizeStyle as g, onMounted as _, openBlock as v, ref as y, renderList as b, renderSlot as x, toDisplayString as S, withCtx as C } from "vue";
import { routerKey as w } from "vue-router";
//#region src/components/ui/Chip.vue?vue&type=script&setup=true&lang.ts
var T = ["disabled", "aria-pressed"], E = { class: "phlix-chip__label" }, D = ["disabled", "aria-label"], O = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		return (n, r) => (v(), l("span", { class: h(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [u("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: a
		}, [e.icon ? (v(), s(t, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : c("", !0), u("span", E, [x(n.$slots, "default", {}, void 0, !0)])], 8, T), e.removable ? (v(), l("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: r[0] ||= (e) => i("remove")
		}, [f(t, { name: "x" })], 8, D)) : c("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]);
//#endregion
//#region src/composables/usePrefetch.ts
function k() {
	let e = m(w, null), t = /* @__PURE__ */ new WeakSet();
	function n(n) {
		if (!e) return;
		let r;
		try {
			r = e.resolve(n).matched;
		} catch {
			return;
		}
		for (let e of r) {
			let n = e.components;
			if (n) {
				for (let e of Object.values(n)) if (!(typeof e != "function" || t.has(e))) {
					t.add(e);
					try {
						let t = e();
						t && typeof t.then == "function" && t.catch(() => {});
					} catch {}
				}
			}
		}
	}
	return { prefetch: n };
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var A = { class: "media-card__poster" }, j = ["href", "aria-label"], M = { class: "visually-hidden" }, N = ["src", "alt"], P = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, F = { class: "media-card__badges" }, I = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, L = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, R = ["aria-valuenow", "aria-label"], z = { class: "media-card__overlay" }, B = { class: "media-card__title" }, V = { class: "media-card__meta" }, H = {
	key: 0,
	class: "numeric"
}, U = {
	key: 1,
	class: "media-card__dot"
}, W = {
	key: 2,
	class: "media-card__cert"
}, G = {
	key: 3,
	class: "media-card__dot"
}, K = {
	key: 4,
	class: "numeric"
}, q = {
	key: 0,
	class: "media-card__genres"
}, J = { class: "media-card__actions" }, Y = { class: "media-card__caption" }, X = ["title"], Z = { class: "media-card__caption-sub numeric" }, Q = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		let i = e, s = r, p = n(), m = o(() => i.to ?? `/app/player/${i.item.id}`), { prefetch: C } = k();
		function w() {
			C(m.value);
		}
		let T = y(!1), E = y(null);
		function D() {
			T.value = !0;
		}
		_(() => {
			E.value?.complete && (T.value = !0);
		});
		let O = o(() => {
			let e = i.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= i.newWithinDays * 24 * 60 * 60 * 1e3;
		}), Q = o(() => {
			let e = p.resumePositionFor(i.item.id), t = i.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), $ = o(() => i.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (v(), l("article", {
			class: "media-card",
			onPointerenter: w,
			onFocusin: w
		}, [u("div", A, [
			u("a", {
				href: m.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [u("span", M, S(e.item.name), 1)], 8, j),
			e.item.poster_url ? (v(), l("img", {
				key: 0,
				ref_key: "imgEl",
				ref: E,
				class: h(["media-card__img", { "is-loaded": T.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: D
			}, null, 42, N)) : (v(), l("div", P, [f(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			u("div", F, [
				O.value ? (v(), l("span", I, "New")) : c("", !0),
				x(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (v(), l("span", L, S(e.quality), 1)) : c("", !0)
			]),
			Q.value > 0 ? (v(), l("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(Q.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [u("i", { style: g({ width: `${Q.value * 100}%` }) }, null, 4)], 8, R)) : c("", !0),
			u("div", z, [
				u("h3", B, S(e.item.name), 1),
				u("div", V, [
					e.item.year ? (v(), l("span", H, S(e.item.year), 1)) : c("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (v(), l("span", U)) : c("", !0),
					e.item.rating ? (v(), l("span", W, S(e.item.rating), 1)) : c("", !0),
					e.item.rating && e.item.runtime ? (v(), l("span", G)) : c("", !0),
					e.item.runtime ? (v(), l("span", K, S(e.item.runtime) + "m", 1)) : c("", !0)
				]),
				$.value.length ? (v(), l("div", q, [(v(!0), l(a, null, b($.value, (e) => (v(), l("span", { key: e }, S(e), 1))), 128))])) : c("", !0),
				u("div", J, [
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
					x(n.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), u("div", Y, [u("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, S(e.item.name), 9, X), u("div", Z, [
			e.item.year ? (v(), l(a, { key: 0 }, [d(S(e.item.year), 1)], 64)) : c("", !0),
			e.item.year && e.item.runtime ? (v(), l(a, { key: 1 }, [d(" · ")], 64)) : c("", !0),
			e.item.runtime ? (v(), l(a, { key: 2 }, [d(S(e.item.runtime) + "m", 1)], 64)) : c("", !0)
		])])], 32));
	}
}), [["__scopeId", "data-v-76ee2345"]]), $ = ["aria-label"], ee = { class: "media-row__head" }, te = { class: "media-row__title" }, ne = {
	key: 0,
	class: "media-row__count numeric"
}, re = { class: "media-row__action" }, ie = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, ae = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, oe = { class: "media-row__skel-poster" }, se = ["aria-label"], ce = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		return (t, n) => m.value ? c("", !0) : (v(), l("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [u("div", ee, [
			u("h2", te, S(e.title), 1),
			e.count == null ? c("", !0) : (v(), l("span", ne, S(e.count.toLocaleString()), 1)),
			u("div", re, [x(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (v(), l("div", ie, [u("span", null, S(e.error), 1), u("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => d("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (v(), l("div", ae, [(v(!0), l(a, null, b(e.skeletonCount, (e) => (v(), l("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [u("div", oe, [f(r, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), f(r, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : p.value ? (v(), s(i, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: C(() => [x(t.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (v(), l("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(v(!0), l(a, null, b(e.items, (t) => (v(), l("li", {
			key: t.id,
			class: "media-row__cell"
		}, [f(Q, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => d("play", e),
			onWatchlist: n[2] ||= (e) => d("watchlist", e),
			onInfo: n[3] ||= (e) => d("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, se))], 8, $));
	}
}), [["__scopeId", "data-v-c9224935"]]);
//#endregion
export { O as i, Q as n, k as r, ce as t };

//# sourceMappingURL=MediaRow-CdNxUeY-.js.map