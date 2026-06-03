import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./media-query-DowsWq-z.js";
import { n as r, t as i } from "./EmptyState-Ds4WcVdG.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as m, normalizeClass as h, normalizeStyle as ee, onMounted as te, openBlock as g, ref as _, renderList as v, renderSlot as y, toDisplayString as b, withCtx as x } from "vue";
import { routerKey as S } from "vue-router";
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
		return (n, r) => (g(), l("span", { class: h(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [u("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: a
		}, [e.icon ? (g(), s(t, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : c("", !0), u("span", w, [y(n.$slots, "default", {}, void 0, !0)])], 8, C), e.removable ? (g(), l("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: r[0] ||= (e) => i("remove")
		}, [f(t, { name: "x" })], 8, T)) : c("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]);
//#endregion
//#region src/composables/usePrefetch.ts
function D() {
	let e = m(S, null), t = /* @__PURE__ */ new WeakSet();
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
//#region src/components/media-poster.ts
var O = "(max-width: 600px) 45vw, 200px";
function k(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function A(e) {
	return Number(e.toFixed(3)).toString();
}
function j(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${A(e.density)}x` : t;
}
function M(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = j(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function N(e, t) {
	let n = M(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : k(n) ? {
		srcset: n,
		sizes: O
	} : { srcset: n };
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var P = { class: "media-card__poster" }, F = ["href", "aria-label"], I = { class: "visually-hidden" }, L = [
	"src",
	"srcset",
	"sizes",
	"alt"
], R = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, z = { class: "media-card__badges" }, B = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, V = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, H = ["aria-valuenow", "aria-label"], U = { class: "media-card__overlay" }, W = { class: "media-card__title" }, G = { class: "media-card__meta" }, K = {
	key: 0,
	class: "numeric"
}, ne = {
	key: 1,
	class: "media-card__dot"
}, q = {
	key: 2,
	class: "media-card__cert"
}, J = {
	key: 3,
	class: "media-card__dot"
}, Y = {
	key: 4,
	class: "numeric"
}, X = {
	key: 0,
	class: "media-card__genres"
}, Z = { class: "media-card__actions" }, re = { class: "media-card__caption" }, ie = ["title"], ae = { class: "media-card__caption-sub numeric" }, Q = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 },
		posterSrcset: {},
		posterSizes: {}
	},
	emits: [
		"play",
		"watchlist",
		"info"
	],
	setup(e, { emit: r }) {
		let i = e, s = r, p = n(), m = o(() => i.to ?? `/app/player/${i.item.id}`), { prefetch: x } = D();
		function S() {
			x(m.value);
		}
		let C = _(!1), w = _(null);
		function T() {
			C.value = !0;
		}
		te(() => {
			w.value?.complete && (C.value = !0);
		});
		let E = o(() => N(i.posterSrcset ?? i.item.poster_srcset, i.posterSizes)), O = o(() => {
			let e = i.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= i.newWithinDays * 24 * 60 * 60 * 1e3;
		}), k = o(() => {
			let e = p.resumePositionFor(i.item.id), t = i.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), A = o(() => i.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (g(), l("article", {
			class: "media-card",
			onPointerenter: S,
			onFocusin: S
		}, [u("div", P, [
			u("a", {
				href: m.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [u("span", I, b(e.item.name), 1)], 8, F),
			e.item.poster_url ? (g(), l("img", {
				key: 0,
				ref_key: "imgEl",
				ref: w,
				class: h(["media-card__img", { "is-loaded": C.value }]),
				src: e.item.poster_url,
				srcset: E.value.srcset,
				sizes: E.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: T
			}, null, 42, L)) : (g(), l("div", R, [f(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			u("div", z, [
				O.value ? (g(), l("span", B, "New")) : c("", !0),
				y(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (g(), l("span", V, b(e.quality), 1)) : c("", !0)
			]),
			k.value > 0 ? (g(), l("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(k.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [u("i", { style: ee({ width: `${k.value * 100}%` }) }, null, 4)], 8, H)) : c("", !0),
			u("div", U, [
				u("h3", W, b(e.item.name), 1),
				u("div", G, [
					e.item.year ? (g(), l("span", K, b(e.item.year), 1)) : c("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (g(), l("span", ne)) : c("", !0),
					e.item.rating ? (g(), l("span", q, b(e.item.rating), 1)) : c("", !0),
					e.item.rating && e.item.runtime ? (g(), l("span", J)) : c("", !0),
					e.item.runtime ? (g(), l("span", Y, b(e.item.runtime) + "m", 1)) : c("", !0)
				]),
				A.value.length ? (g(), l("div", X, [(g(!0), l(a, null, v(A.value, (e) => (g(), l("span", { key: e }, b(e), 1))), 128))])) : c("", !0),
				u("div", Z, [
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
					y(n.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), u("div", re, [u("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, b(e.item.name), 9, ie), u("div", ae, [
			e.item.year ? (g(), l(a, { key: 0 }, [d(b(e.item.year), 1)], 64)) : c("", !0),
			e.item.year && e.item.runtime ? (g(), l(a, { key: 1 }, [d(" · ")], 64)) : c("", !0),
			e.item.runtime ? (g(), l(a, { key: 2 }, [d(b(e.item.runtime) + "m", 1)], 64)) : c("", !0)
		])])], 32));
	}
}), [["__scopeId", "data-v-eaef0d1c"]]), oe = ["aria-label"], $ = { class: "media-row__head" }, se = { class: "media-row__title" }, ce = {
	key: 0,
	class: "media-row__count numeric"
}, le = { class: "media-row__action" }, ue = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, de = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, fe = { class: "media-row__skel-poster" }, pe = ["aria-label"], me = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		return (t, n) => m.value ? c("", !0) : (g(), l("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [u("div", $, [
			u("h2", se, b(e.title), 1),
			e.count == null ? c("", !0) : (g(), l("span", ce, b(e.count.toLocaleString()), 1)),
			u("div", le, [y(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (g(), l("div", ue, [u("span", null, b(e.error), 1), u("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => d("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (g(), l("div", de, [(g(!0), l(a, null, v(e.skeletonCount, (e) => (g(), l("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [u("div", fe, [f(r, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), f(r, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : p.value ? (g(), s(i, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: x(() => [y(t.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (g(), l("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(g(!0), l(a, null, v(e.items, (t) => (g(), l("li", {
			key: t.id,
			class: "media-row__cell"
		}, [f(Q, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => d("play", e),
			onWatchlist: n[2] ||= (e) => d("watchlist", e),
			onInfo: n[3] ||= (e) => d("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, pe))], 8, oe));
	}
}), [["__scopeId", "data-v-747f68e1"]]);
//#endregion
export { E as i, Q as n, D as r, me as t };

//# sourceMappingURL=MediaRow-DCnd5s5o.js.map