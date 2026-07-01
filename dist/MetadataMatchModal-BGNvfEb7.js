import { n as e, t } from "./Icon-24ngwBUH.js";
import { t as n } from "./useMessages-CLrAkqxK.js";
import { a as r, f as i, l as a } from "./client-fw74f3l_.js";
import { t as o } from "./useAuthStore-CUoTkm_k.js";
import { n as s, o as c, t as l } from "./ThumbRating-CEhvLFWq.js";
import { t as u } from "./useToastStore-BDoKlU6N.js";
import { t as d } from "./Button-CInT03Lp.js";
import { t as f } from "./Modal-Cf28TADR.js";
import { Fragment as p, Teleport as m, Transition as h, computed as g, createBlock as ee, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, inject as C, nextTick as w, normalizeClass as T, normalizeStyle as E, onBeforeUnmount as D, onMounted as O, openBlock as k, ref as A, renderList as j, renderSlot as M, toDisplayString as N, unref as P, vModelText as F, watch as I, withCtx as L, withDirectives as R, withModifiers as z } from "vue";
import { routerKey as B } from "vue-router";
//#region src/components/ui/Spinner.vue?vue&type=script&setup=true&lang.ts
var V = ["aria-label"], H = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let r = e, { t: i } = n(), a = g(() => r.size === void 0 ? void 0 : typeof r.size == "number" ? `${r.size}px` : r.size);
		return (n, r) => (k(), v("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? P(i)("common.loading"),
			style: E(a.value ? { fontSize: a.value } : void 0)
		}, [x(t, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, V));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), U = ["id"], W = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"onClick",
	"onPointermove"
], G = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "Menu",
	props: {
		items: {},
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "select"],
	setup(e, { emit: t }) {
		function n(e, t, n) {
			let r = e.length;
			if (r === 0) return -1;
			let i = t;
			for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
			return t;
		}
		function r(e, t) {
			return t === "first" ? n(e, -1, 1) : n(e, 0, -1);
		}
		let i = e, a = t, o = crypto.randomUUID(), s = g(() => `${o}-menu`), c = A(i.open);
		I(() => i.open, (e) => c.value = e), I(c, (e) => a("update:open", e));
		let l = A(null), u = A(null), d = A(-1), f = A(!1), y = A({});
		function S() {
			c.value || (c.value = !0, d.value = r(i.items, "first"), w(() => {
				R(), u.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function C() {
			c.value = !1, d.value = -1, l.value?.querySelector("button,[contenteditable]")?.focus?.();
		}
		function O() {
			c.value ? C() : S();
		}
		function P(e) {
			d.value = n(i.items, d.value, e), w(() => {
				u.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" });
			});
		}
		function F(e) {
			let t = i.items[e];
			!t || t.disabled || (a("select", t, e), t.onClick?.(), C());
		}
		function R() {
			if (!l.value) return;
			let e = l.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = u.value?.offsetWidth ?? 200, i = u.value?.offsetHeight ?? 280, a = n - e.bottom;
			f.value = a < i + 4 && e.top > a;
			let o = e.left;
			o + r > t - 8 && (o = t - r - 8), o < 8 && (o = 8);
			let s = f.value ? Math.max(8, e.top - i - 4) : e.bottom + 4;
			y.value = {
				left: `${Math.round(o)}px`,
				top: `${Math.round(s)}px`
			};
		}
		function z(e) {
			c.value || (c.value = !0, d.value = r(i.items, e), w(() => {
				R(), u.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function B(e) {
			if (!c.value) {
				if (e.key === "ArrowDown") {
					e.preventDefault(), z("first");
					return;
				}
				if (e.key === "ArrowUp") {
					e.preventDefault(), z("last");
					return;
				}
				return;
			}
			V(e);
		}
		function V(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), P(1);
					break;
				case "ArrowUp":
					e.preventDefault(), P(-1);
					break;
				case "Home":
					e.preventDefault(), d.value = r(i.items, "first"), w(() => u.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "End":
					e.preventDefault(), d.value = r(i.items, "last"), w(() => u.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), d.value >= 0 && F(d.value);
					break;
				case "Escape":
					e.preventDefault(), C();
					break;
				case "Tab":
					e.preventDefault(), C();
					break;
			}
		}
		function H(e) {
			c.value && l.value && u.value && !l.value.contains(e.target) && !u.value.contains(e.target) && C();
		}
		return I(c, (e) => {
			e ? document.addEventListener("pointerdown", H, !0) : document.removeEventListener("pointerdown", H, !0);
		}), D(() => {
			document.removeEventListener("pointerdown", H, !0);
		}), (t, n) => (k(), v("div", {
			ref_key: "triggerEl",
			ref: l,
			class: "phlix-menu",
			onClick: O,
			onKeydown: B
		}, [M(t.$slots, "default", {
			open: c.value,
			toggle: O,
			openMenu: S
		}, void 0, !0), (k(), ee(m, { to: "body" }, [x(h, { name: "phlix-menu" }, {
			default: L(() => [c.value ? (k(), v("div", {
				key: 0,
				id: s.value,
				ref_key: "menuEl",
				ref: u,
				class: T(["phlix-menu__list", { "is-flipped": f.value }]),
				style: E(y.value),
				role: "menu",
				onKeydown: V
			}, [(k(!0), v(p, null, j(e.items, (e, n) => (k(), v("button", {
				key: n,
				type: "button",
				class: T(["phlix-menu__item", {
					"is-active": n === d.value,
					"is-danger": e.danger,
					"is-disabled": e.disabled
				}]),
				role: "menuitem",
				tabindex: n === d.value ? 0 : -1,
				"aria-disabled": e.disabled || void 0,
				"aria-label": e.danger ? e.label + " (danger)" : e.label,
				onClick: (e) => F(n),
				onPointermove: (t) => !e.disabled && (d.value = n)
			}, [M(t.$slots, "item", {
				item: e,
				index: n
			}, () => [b(N(e.label), 1)], !0)], 42, W))), 128))], 46, U)) : _("", !0)]),
			_: 3
		})]))], 544));
	}
}), [["__scopeId", "data-v-0773c17a"]]);
//#endregion
//#region src/composables/usePrefetch.ts
function K() {
	let e = C(B, null), t = /* @__PURE__ */ new WeakSet();
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
var q = "(max-width: 600px) 45vw, 200px";
function J(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function Y(e) {
	return Number(e.toFixed(3)).toString();
}
function X(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${Y(e.density)}x` : t;
}
function Z(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = X(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function te(e, t) {
	let n = Z(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : J(n) ? {
		srcset: n,
		sizes: q
	} : { srcset: n };
}
//#endregion
//#region src/components/mediaItemMenu.ts
var Q = {
	addToPlaylist: "Add to playlist",
	like: "Like",
	dislike: "Dislike",
	markPlayed: "Mark played",
	markUnplayed: "Mark unplayed",
	download: "Download",
	missingEpisodes: "View missing episodes",
	shuffle: "Shuffle",
	refreshMetadata: "Refresh metadata",
	identify: "Identify from beginning",
	editMetadata: "Edit metadata",
	editImages: "Edit images",
	exploreData: "Explore item data",
	remove: "Remove"
};
function ne(e, t) {
	let n = Q, r = [
		{ label: n.addToPlaylist },
		{ label: n.like },
		{ label: n.dislike },
		{ label: t.isWatched ? n.markUnplayed : n.markPlayed },
		{ label: n.download }
	];
	return t.isSeriesOrSeason && r.push({ label: n.missingEpisodes }), r.push({ label: n.shuffle }), t.isAdmin && (r.push({ label: n.refreshMetadata }), r.push({ label: n.identify }), r.push({ label: n.editMetadata }), t.canChoosePoster && r.push({ label: n.editImages }), r.push({ label: n.exploreData }), e.canDelete && r.push({
		label: n.remove,
		danger: !0
	})), r;
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var re = { class: "media-card__poster" }, ie = ["href", "aria-label"], ae = { class: "visually-hidden" }, oe = [
	"src",
	"srcset",
	"sizes",
	"alt"
], se = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, ce = { class: "media-card__badges" }, le = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, ue = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, de = ["aria-valuenow", "aria-label"], fe = { class: "media-card__overlay" }, pe = { class: "media-card__title" }, me = { class: "media-card__meta" }, he = {
	key: 0,
	class: "numeric"
}, ge = {
	key: 1,
	class: "media-card__dot"
}, _e = {
	key: 2,
	class: "media-card__cert"
}, ve = {
	key: 3,
	class: "media-card__dot"
}, ye = {
	key: 4,
	class: "numeric"
}, be = {
	key: 0,
	class: "media-card__genres"
}, xe = {
	key: 1,
	class: "media-card__actions"
}, Se = ["aria-label", "aria-pressed"], Ce = ["aria-label", "aria-pressed"], we = ["aria-expanded", "onClick"], Te = { class: "media-card__caption" }, Ee = ["title"], De = { class: "media-card__caption-sub numeric" }, $ = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 },
		posterSrcset: {},
		posterSizes: {},
		canMatch: {
			type: Boolean,
			default: !1
		},
		hideActions: {
			type: Boolean,
			default: !1
		},
		subtitle: { default: null }
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"match",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove"
	],
	setup(e, { emit: n }) {
		let r = e, i = n, a = c(), d = o(), f = s(), m = C("phlixConfig", null), h = g(() => f.isFavorite(r.item.id)), ee = g(() => f.likeLevel(r.item.id)), S = g(() => d.isAdmin), w = g(() => f.isWatched(r.item.id)), D = A(!1), P = g(() => r.item.type === "series" || r.item.type === "season"), F = g(() => ne(r.item, {
			isAdmin: S.value,
			isWatched: w.value,
			isSeriesOrSeason: P.value,
			canChoosePoster: S.value
		}));
		function I(e) {
			let t = Q;
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					V();
					break;
				case t.like:
					f.setLike(r.item.id, 1, m?.apiBase ?? "");
					break;
				case t.dislike:
					f.setLike(r.item.id, -1, m?.apiBase ?? "");
					break;
				case t.refreshMetadata:
				case t.identify:
					i("refresh", r.item);
					break;
				case t.editImages:
					i("choose-poster", r.item);
					break;
				case t.remove:
					i("remove", r.item);
					break;
				default: u().info(`${e.label} isn't available yet`);
			}
		}
		function R(e) {
			f.setLike(r.item.id, e, m?.apiBase ?? "");
		}
		function B() {
			f.toggleFavorite(r.item.id, m?.apiBase ?? ""), i("watchlist", r.item);
		}
		function V() {
			f.toggleWatched(r.item.id, m?.apiBase ?? ""), i("mark-watched", r.item);
		}
		let H = g(() => r.to ?? `/app/media/${r.item.id}`), { prefetch: U } = K();
		function W() {
			U(H.value);
		}
		let q = A(!1), J = A(null);
		function Y() {
			q.value = !0;
		}
		O(() => {
			J.value?.complete && (q.value = !0);
		});
		let X = g(() => te(r.posterSrcset ?? r.item.poster_srcset, r.posterSizes)), Z = g(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), $ = g(() => {
			let e = a.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), Oe = g(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (k(), v("article", {
			class: "media-card",
			onPointerenter: W,
			onFocusin: W
		}, [y("div", re, [
			y("a", {
				href: H.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [y("span", ae, N(e.item.name), 1)], 8, ie),
			e.item.poster_url ? (k(), v("img", {
				key: 0,
				ref_key: "imgEl",
				ref: J,
				class: T(["media-card__img", { "is-loaded": q.value }]),
				src: e.item.poster_url,
				srcset: X.value.srcset,
				sizes: X.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: Y
			}, null, 42, oe)) : (k(), v("div", se, [x(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			y("div", ce, [
				Z.value ? (k(), v("span", le, "New")) : _("", !0),
				M(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (k(), v("span", ue, N(e.quality), 1)) : _("", !0)
			]),
			$.value > 0 ? (k(), v("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round($.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [y("i", { style: E({ width: `${$.value * 100}%` }) }, null, 4)], 8, de)) : _("", !0),
			y("div", fe, [
				y("h3", pe, N(e.item.name), 1),
				y("div", me, [
					e.item.year ? (k(), v("span", he, N(e.item.year), 1)) : _("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (k(), v("span", ge)) : _("", !0),
					e.item.rating ? (k(), v("span", _e, N(e.item.rating), 1)) : _("", !0),
					e.item.rating && e.item.runtime ? (k(), v("span", ve)) : _("", !0),
					e.item.runtime ? (k(), v("span", ye, N(e.item.runtime) + "m", 1)) : _("", !0)
				]),
				Oe.value.length ? (k(), v("div", be, [(k(!0), v(p, null, j(Oe.value, (e) => (k(), v("span", { key: e }, N(e), 1))), 128))])) : _("", !0),
				e.hideActions ? _("", !0) : (k(), v("div", xe, [
					y("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= z((t) => i("play", e.item), ["stop", "prevent"])
					}, [x(t, { name: "play" })]),
					x(l, {
						level: ee.value,
						onCycle: R,
						onClick: r[1] ||= z(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					y("button", {
						type: "button",
						class: T(["media-card__iconbtn", { "is-active": h.value }]),
						"aria-label": h.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": h.value ? "true" : "false",
						onClick: z(B, ["stop", "prevent"])
					}, [x(t, { name: h.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Se),
					y("button", {
						type: "button",
						class: T(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": w.value }]),
						"aria-label": w.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": w.value ? "true" : "false",
						onClick: z(V, ["stop", "prevent"])
					}, [x(t, { name: w.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Ce),
					y("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= z((t) => i("info", e.item), ["stop", "prevent"])
					}, [x(t, { name: "info" })]),
					x(G, {
						open: D.value,
						"onUpdate:open": r[3] ||= (e) => D.value = e,
						items: F.value,
						onSelect: I
					}, {
						default: L(({ toggle: e }) => [y("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							"aria-expanded": D.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: z(e, ["stop", "prevent"])
						}, [x(t, { name: "more" })], 8, we)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (k(), v("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[4] ||= z((t) => i("match", e.item), ["stop", "prevent"])
					}, [x(t, { name: "search" })])) : _("", !0),
					M(n.$slots, "actions", { item: e.item }, void 0, !0)
				]))
			])
		]), y("div", Te, [y("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, N(e.item.name), 9, Ee), y("div", De, [e.subtitle == null ? (k(), v(p, { key: 1 }, [
			e.item.year ? (k(), v(p, { key: 0 }, [b(N(e.item.year), 1)], 64)) : _("", !0),
			e.item.year && e.item.runtime ? (k(), v(p, { key: 1 }, [b(" · ")], 64)) : _("", !0),
			e.item.runtime ? (k(), v(p, { key: 2 }, [b(N(e.item.runtime) + "m", 1)], 64)) : _("", !0)
		], 64)) : (k(), v(p, { key: 0 }, [b(N(e.subtitle), 1)], 64))])])], 32));
	}
}), [["__scopeId", "data-v-ab2824bd"]]), Oe = { class: "match-modal" }, ke = {
	key: 0,
	class: "match-modal__subject"
}, Ae = {
	key: 0,
	class: "numeric"
}, je = { class: "match-modal__field match-modal__field--query" }, Me = { class: "match-modal__field match-modal__field--year" }, Ne = {
	key: 1,
	class: "match-modal__source"
}, Pe = { class: "match-modal__source-body" }, Fe = {
	key: 0,
	class: "match-modal__source-filename"
}, Ie = ["title"], Le = ["innerHTML"], Re = {
	key: 2,
	class: "match-modal__source-tags"
}, ze = {
	key: 2,
	class: "match-modal__state",
	role: "status"
}, Be = {
	key: 3,
	class: "match-modal__state",
	role: "alert"
}, Ve = { class: "match-modal__state-title" }, He = {
	key: 4,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Ue = {
	key: 5,
	class: "match-modal__state",
	role: "status"
}, We = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, Ge = { class: "match-modal__results" }, Ke = { class: "match-modal__poster" }, qe = ["src", "alt"], Je = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, Ye = { class: "match-modal__result-body" }, Xe = { class: "match-modal__result-title" }, Ze = {
	key: 0,
	class: "match-modal__result-year numeric"
}, Qe = { class: "match-modal__result-type" }, $e = {
	key: 0,
	class: "match-modal__result-overview"
}, et = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: n }) {
		let s = e, c = n, l = o(), u = A(""), m = A(""), h = A([]), S = A(!1), C = A(!1), w = A(null), T = A(!1), E = A(null), O = A(null), M = A(null), P = A(!1), B = g({
			get: () => s.modelValue,
			set: (e) => c("update:modelValue", e)
		}), V = null;
		function U(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function W(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
		}
		function G(e) {
			return e.split(/[/\\]/).map((e) => W(e)).join(" › ");
		}
		function K(e) {
			return `${e.type}:${e.tmdb_id}`;
		}
		function q() {
			V?.abort(), V = null;
		}
		function J() {
			h.value = [], S.value = !1, C.value = !1, w.value = null, T.value = !1, E.value = null, O.value = null, M.value = null, P.value = !1;
		}
		async function Y() {
			if (!s.item) return;
			V?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			V = e;
			let t = () => V !== e;
			S.value = !0, C.value = !0, w.value = null, T.value = !1, O.value = null;
			try {
				let n = await l.client.matchSearch(s.item.id, {
					query: u.value.trim() || void 0,
					year: m.value.trim() || void 0
				}, e?.signal);
				if (t()) return;
				if (h.value = n.results, M.value = n.context ?? null, M.value?.parsed_title && !P.value) {
					let e = M.value.parsed_title;
					u.value !== e && (u.value = e);
				}
			} catch (e) {
				if (t() || U(e)) return;
				h.value = [], r(e) ? T.value = !0 : w.value = i(e, "Search failed. Please try again.");
			} finally {
				t() || (S.value = !1);
			}
		}
		function X() {
			Y();
		}
		function Z() {
			let e = s.item?.name ?? "";
			P.value = u.value !== e;
		}
		async function te(e) {
			if (!(!s.item || E.value)) {
				E.value = K(e), O.value = null;
				try {
					c("applied", (await l.client.matchApply(s.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					})).item), B.value = !1;
				} catch (e) {
					r(e) ? T.value = !0 : e instanceof a && e.status === 422 ? O.value = "No match details were found for that result. Try another." : O.value = i(e, "Could not apply that match. Please try again.");
				} finally {
					E.value = null;
				}
			}
		}
		return I(() => s.modelValue, (e) => {
			e && s.item ? (J(), u.value = s.item.name ?? "", m.value = s.item.year == null ? "" : String(s.item.year), Y()) : e || (q(), J());
		}, { immediate: !0 }), D(q), (n, r) => (k(), ee(f, {
			modelValue: B.value,
			"onUpdate:modelValue": r[2] ||= (e) => B.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: L(() => [y("div", Oe, [
				e.item ? (k(), v("p", ke, [
					r[3] ||= b(" Find the right TMDB entry for ", -1),
					y("strong", null, N(e.item.name), 1),
					e.item.year ? (k(), v("span", Ae, "(" + N(e.item.year) + ")", 1)) : _("", !0),
					r[4] ||= b(". ", -1)
				])) : _("", !0),
				y("form", {
					class: "match-modal__form",
					onSubmit: z(X, ["prevent"])
				}, [
					y("div", je, [r[5] ||= y("label", {
						class: "match-modal__label",
						for: "match-query"
					}, "Search", -1), R(y("input", {
						id: "match-query",
						"onUpdate:modelValue": r[0] ||= (e) => u.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off",
						onInput: Z
					}, null, 544), [[F, u.value]])]),
					y("div", Me, [r[6] ||= y("label", {
						class: "match-modal__label",
						for: "match-year"
					}, "Year", -1), R(y("input", {
						id: "match-year",
						"onUpdate:modelValue": r[1] ||= (e) => m.value = e,
						type: "text",
						inputmode: "numeric",
						class: "match-modal__input numeric",
						placeholder: "Any",
						autocomplete: "off"
					}, null, 512), [[F, m.value]])]),
					x(d, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: S.value
					}, {
						default: L(() => [...r[7] ||= [b("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				M.value && (M.value.original_filename || M.value.path || M.value.tags && Object.keys(M.value.tags).length) ? (k(), v("details", Ne, [r[10] ||= y("summary", { class: "match-modal__source-summary" }, "Source info", -1), y("div", Pe, [
					M.value.original_filename ? (k(), v("p", Fe, [r[8] ||= y("span", { class: "match-modal__source-label" }, "File:", -1), y("code", null, N(M.value.original_filename), 1)])) : _("", !0),
					M.value.path ? (k(), v("p", {
						key: 1,
						class: "match-modal__source-path",
						title: M.value.path
					}, [r[9] ||= y("span", { class: "match-modal__source-label" }, "Path:", -1), y("span", { innerHTML: G(M.value.path) }, null, 8, Le)], 8, Ie)) : _("", !0),
					M.value.tags && Object.keys(M.value.tags).length ? (k(), v("dl", Re, [(k(!0), v(p, null, j(M.value.tags, (e, t) => (k(), v(p, { key: String(t) }, [y("dt", null, N(t), 1), y("dd", null, N(e), 1)], 64))), 128))])) : _("", !0)
				])])) : _("", !0),
				T.value ? (k(), v("div", ze, [
					x(t, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[11] ||= y("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[12] ||= y("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : w.value ? (k(), v("div", Be, [
					x(t, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					y("p", Ve, N(w.value), 1),
					x(d, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: X
					}, {
						default: L(() => [...r[13] ||= [b("Try again", -1)]]),
						_: 1
					})
				])) : S.value ? (k(), v("div", He, [x(H, { label: "Searching TMDB" })])) : C.value && h.value.length === 0 ? (k(), v("div", Ue, [
					x(t, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[14] ||= y("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[15] ||= y("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : h.value.length ? (k(), v(p, { key: 6 }, [O.value ? (k(), v("p", We, N(O.value), 1)) : _("", !0), y("ul", Ge, [(k(!0), v(p, null, j(h.value, (e) => (k(), v("li", {
					key: K(e),
					class: "match-modal__result"
				}, [
					y("div", Ke, [e.poster_url ? (k(), v("img", {
						key: 0,
						src: e.poster_url,
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, qe)) : (k(), v("div", Je, [x(t, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					y("div", Ye, [y("p", Xe, [
						b(N(e.title) + " ", 1),
						e.year ? (k(), v("span", Ze, N(e.year), 1)) : _("", !0),
						y("span", Qe, N(e.type), 1)
					]), e.overview ? (k(), v("p", $e, N(e.overview), 1)) : _("", !0)]),
					x(d, {
						variant: "solid",
						size: "sm",
						loading: E.value === K(e),
						disabled: E.value !== null && E.value !== K(e),
						onClick: (t) => te(e)
					}, {
						default: L(() => [...r[16] ||= [b(" Use this ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])
				]))), 128))])], 64)) : _("", !0)
			])]),
			_: 1
		}, 8, ["modelValue"]));
	}
}), [["__scopeId", "data-v-aeafa992"]]);
//#endregion
export { K as a, ne as i, $ as n, G as o, Q as r, H as s, et as t };

//# sourceMappingURL=MetadataMatchModal-BGNvfEb7.js.map