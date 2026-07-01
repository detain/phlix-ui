import { n as e, t } from "./Icon-24ngwBUH.js";
import { t as n } from "./useMessages-C21WhqOh.js";
import { a as r, f as i, l as a } from "./client-fw74f3l_.js";
import { t as o } from "./useAuthStore-CUoTkm_k.js";
import { n as s, o as c, t as l } from "./ThumbRating-uWe6prMH.js";
import { t as u } from "./useToastStore-BDoKlU6N.js";
import { t as d } from "./Button-CInT03Lp.js";
import { t as f } from "./Modal-CBoJ1z1N.js";
import { Fragment as p, Teleport as m, Transition as h, computed as g, createBlock as _, createCommentVNode as v, createElementBlock as y, createElementVNode as b, createTextVNode as x, createVNode as S, defineComponent as C, inject as w, nextTick as T, normalizeClass as E, normalizeStyle as D, onBeforeUnmount as O, onMounted as k, openBlock as A, ref as j, renderList as M, renderSlot as N, toDisplayString as P, unref as F, vModelText as I, watch as L, withCtx as R, withDirectives as z, withModifiers as B } from "vue";
import { routerKey as V } from "vue-router";
//#region src/components/ui/Spinner.vue?vue&type=script&setup=true&lang.ts
var H = ["aria-label"], U = /*#__PURE__*/ e(/* @__PURE__ */ C({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let r = e, { t: i } = n(), a = g(() => r.size === void 0 ? void 0 : typeof r.size == "number" ? `${r.size}px` : r.size);
		return (n, r) => (A(), y("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? F(i)("common.loading"),
			style: D(a.value ? { fontSize: a.value } : void 0)
		}, [S(t, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, H));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), W = ["id"], G = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"onClick",
	"onPointermove"
], K = /*#__PURE__*/ e(/* @__PURE__ */ C({
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
		let i = e, a = t, o = crypto.randomUUID(), s = g(() => `${o}-menu`), c = j(i.open);
		L(() => i.open, (e) => c.value = e), L(c, (e) => a("update:open", e));
		let l = j(null), u = j(null), d = j(-1), f = j(!1);
		function b() {
			c.value || (c.value = !0, d.value = r(i.items, "first"), T(() => {
				F(), u.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function C() {
			c.value = !1, d.value = -1, l.value?.querySelector("button,[contenteditable]")?.focus?.();
		}
		function w() {
			c.value ? C() : b();
		}
		function D(e) {
			d.value = n(i.items, d.value, e), T(() => {
				u.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" });
			});
		}
		function k(e) {
			let t = i.items[e];
			!t || t.disabled || (a("select", t, e), t.onClick?.(), C());
		}
		function F() {
			if (!l.value) return;
			let e = l.value.getBoundingClientRect(), t = window.innerHeight - e.bottom, n = e.top;
			f.value = t < 280 && n > t;
		}
		function I(e) {
			c.value || (c.value = !0, d.value = r(i.items, e), T(() => {
				F(), u.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function z(e) {
			if (!c.value) {
				if (e.key === "ArrowDown") {
					e.preventDefault(), I("first");
					return;
				}
				if (e.key === "ArrowUp") {
					e.preventDefault(), I("last");
					return;
				}
				return;
			}
			B(e);
		}
		function B(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), D(1);
					break;
				case "ArrowUp":
					e.preventDefault(), D(-1);
					break;
				case "Home":
					e.preventDefault(), d.value = r(i.items, "first"), T(() => u.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "End":
					e.preventDefault(), d.value = r(i.items, "last"), T(() => u.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), d.value >= 0 && k(d.value);
					break;
				case "Escape":
					e.preventDefault(), C();
					break;
				case "Tab":
					e.preventDefault(), C();
					break;
			}
		}
		function V(e) {
			c.value && l.value && u.value && !l.value.contains(e.target) && !u.value.contains(e.target) && C();
		}
		return L(c, (e) => {
			e ? document.addEventListener("pointerdown", V, !0) : document.removeEventListener("pointerdown", V, !0);
		}), O(() => {
			document.removeEventListener("pointerdown", V, !0);
		}), (t, n) => (A(), y("div", {
			ref_key: "triggerEl",
			ref: l,
			class: "phlix-menu",
			onClick: w,
			onKeydown: z
		}, [N(t.$slots, "default", {
			open: c.value,
			toggle: w,
			openMenu: b
		}, void 0, !0), (A(), _(m, { to: "body" }, [S(h, { name: "phlix-menu" }, {
			default: R(() => [c.value ? (A(), y("div", {
				key: 0,
				id: s.value,
				ref_key: "menuEl",
				ref: u,
				class: E(["phlix-menu__list", { "is-flipped": f.value }]),
				role: "menu",
				onKeydown: B
			}, [(A(!0), y(p, null, M(e.items, (e, n) => (A(), y("button", {
				key: n,
				type: "button",
				class: E(["phlix-menu__item", {
					"is-active": n === d.value,
					"is-danger": e.danger,
					"is-disabled": e.disabled
				}]),
				role: "menuitem",
				tabindex: n === d.value ? 0 : -1,
				"aria-disabled": e.disabled || void 0,
				"aria-label": e.danger ? e.label + " (danger)" : e.label,
				onClick: (e) => k(n),
				onPointermove: (t) => !e.disabled && (d.value = n)
			}, [N(t.$slots, "item", {
				item: e,
				index: n
			}, () => [x(P(e.label), 1)], !0)], 42, G))), 128))], 42, W)) : v("", !0)]),
			_: 3
		})]))], 544));
	}
}), [["__scopeId", "data-v-5ce5aa8e"]]);
//#endregion
//#region src/composables/usePrefetch.ts
function q() {
	let e = w(V, null), t = /* @__PURE__ */ new WeakSet();
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
var J = "(max-width: 600px) 45vw, 200px";
function Y(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function X(e) {
	return Number(e.toFixed(3)).toString();
}
function Z(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${X(e.density)}x` : t;
}
function Q(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = Z(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function ee(e, t) {
	let n = Q(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : Y(n) ? {
		srcset: n,
		sizes: J
	} : { srcset: n };
}
//#endregion
//#region src/components/mediaItemMenu.ts
var te = {
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
	let n = te, r = [
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
}, Se = ["aria-label", "aria-pressed"], Ce = ["aria-label", "aria-pressed"], we = { class: "media-card__caption" }, Te = ["title"], Ee = { class: "media-card__caption-sub numeric" }, $ = /*#__PURE__*/ e(/* @__PURE__ */ C({
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
		let r = e, i = n, a = c(), d = o(), f = s(), m = w("phlixConfig", null), h = g(() => f.isFavorite(r.item.id)), _ = g(() => f.likeLevel(r.item.id)), C = g(() => d.isAdmin), T = g(() => f.isWatched(r.item.id)), O = j(!1), F = g(() => r.item.type === "series" || r.item.type === "season"), I = g(() => ne(r.item, {
			isAdmin: C.value,
			isWatched: T.value,
			isSeriesOrSeason: F.value,
			canChoosePoster: C.value
		}));
		function L(e) {
			let t = te;
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					H();
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
		function z(e) {
			f.setLike(r.item.id, e, m?.apiBase ?? "");
		}
		function V() {
			f.toggleFavorite(r.item.id, m?.apiBase ?? ""), i("watchlist", r.item);
		}
		function H() {
			f.toggleWatched(r.item.id, m?.apiBase ?? ""), i("mark-watched", r.item);
		}
		let U = g(() => r.to ?? `/app/media/${r.item.id}`), { prefetch: W } = q();
		function G() {
			W(U.value);
		}
		let J = j(!1), Y = j(null);
		function X() {
			J.value = !0;
		}
		k(() => {
			Y.value?.complete && (J.value = !0);
		});
		let Z = g(() => ee(r.posterSrcset ?? r.item.poster_srcset, r.posterSizes)), Q = g(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), $ = g(() => {
			let e = a.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), De = g(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (A(), y("article", {
			class: "media-card",
			onPointerenter: G,
			onFocusin: G
		}, [b("div", re, [
			b("a", {
				href: U.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [b("span", ae, P(e.item.name), 1)], 8, ie),
			e.item.poster_url ? (A(), y("img", {
				key: 0,
				ref_key: "imgEl",
				ref: Y,
				class: E(["media-card__img", { "is-loaded": J.value }]),
				src: e.item.poster_url,
				srcset: Z.value.srcset,
				sizes: Z.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: X
			}, null, 42, oe)) : (A(), y("div", se, [S(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			b("div", ce, [
				Q.value ? (A(), y("span", le, "New")) : v("", !0),
				N(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (A(), y("span", ue, P(e.quality), 1)) : v("", !0)
			]),
			$.value > 0 ? (A(), y("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round($.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [b("i", { style: D({ width: `${$.value * 100}%` }) }, null, 4)], 8, de)) : v("", !0),
			b("div", fe, [
				b("h3", pe, P(e.item.name), 1),
				b("div", me, [
					e.item.year ? (A(), y("span", he, P(e.item.year), 1)) : v("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (A(), y("span", ge)) : v("", !0),
					e.item.rating ? (A(), y("span", _e, P(e.item.rating), 1)) : v("", !0),
					e.item.rating && e.item.runtime ? (A(), y("span", ve)) : v("", !0),
					e.item.runtime ? (A(), y("span", ye, P(e.item.runtime) + "m", 1)) : v("", !0)
				]),
				De.value.length ? (A(), y("div", be, [(A(!0), y(p, null, M(De.value, (e) => (A(), y("span", { key: e }, P(e), 1))), 128))])) : v("", !0),
				e.hideActions ? v("", !0) : (A(), y("div", xe, [
					b("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= B((t) => i("play", e.item), ["stop", "prevent"])
					}, [S(t, { name: "play" })]),
					S(l, {
						level: _.value,
						onCycle: z,
						onClick: r[1] ||= B(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					b("button", {
						type: "button",
						class: E(["media-card__iconbtn", { "is-active": h.value }]),
						"aria-label": h.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": h.value ? "true" : "false",
						onClick: B(V, ["stop", "prevent"])
					}, [S(t, { name: h.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Se),
					b("button", {
						type: "button",
						class: E(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": T.value }]),
						"aria-label": T.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": T.value ? "true" : "false",
						onClick: B(H, ["stop", "prevent"])
					}, [S(t, { name: T.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Ce),
					b("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= B((t) => i("info", e.item), ["stop", "prevent"])
					}, [S(t, { name: "info" })]),
					S(K, {
						open: O.value,
						"onUpdate:open": r[4] ||= (e) => O.value = e,
						items: I.value,
						onSelect: L
					}, {
						default: R(() => [b("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							onClick: r[3] ||= B(() => {}, ["stop", "prevent"])
						}, [S(t, { name: "more" })])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (A(), y("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[5] ||= B((t) => i("match", e.item), ["stop", "prevent"])
					}, [S(t, { name: "search" })])) : v("", !0),
					N(n.$slots, "actions", { item: e.item }, void 0, !0)
				]))
			])
		]), b("div", we, [b("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, P(e.item.name), 9, Te), b("div", Ee, [e.subtitle == null ? (A(), y(p, { key: 1 }, [
			e.item.year ? (A(), y(p, { key: 0 }, [x(P(e.item.year), 1)], 64)) : v("", !0),
			e.item.year && e.item.runtime ? (A(), y(p, { key: 1 }, [x(" · ")], 64)) : v("", !0),
			e.item.runtime ? (A(), y(p, { key: 2 }, [x(P(e.item.runtime) + "m", 1)], 64)) : v("", !0)
		], 64)) : (A(), y(p, { key: 0 }, [x(P(e.subtitle), 1)], 64))])])], 32));
	}
}), [["__scopeId", "data-v-396a4463"]]), De = { class: "match-modal" }, Oe = {
	key: 0,
	class: "match-modal__subject"
}, ke = {
	key: 0,
	class: "numeric"
}, Ae = { class: "match-modal__field match-modal__field--query" }, je = { class: "match-modal__field match-modal__field--year" }, Me = {
	key: 1,
	class: "match-modal__source"
}, Ne = { class: "match-modal__source-body" }, Pe = {
	key: 0,
	class: "match-modal__source-filename"
}, Fe = ["title"], Ie = ["innerHTML"], Le = {
	key: 2,
	class: "match-modal__source-tags"
}, Re = {
	key: 2,
	class: "match-modal__state",
	role: "status"
}, ze = {
	key: 3,
	class: "match-modal__state",
	role: "alert"
}, Be = { class: "match-modal__state-title" }, Ve = {
	key: 4,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, He = {
	key: 5,
	class: "match-modal__state",
	role: "status"
}, Ue = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, We = { class: "match-modal__results" }, Ge = { class: "match-modal__poster" }, Ke = ["src", "alt"], qe = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, Je = { class: "match-modal__result-body" }, Ye = { class: "match-modal__result-title" }, Xe = {
	key: 0,
	class: "match-modal__result-year numeric"
}, Ze = { class: "match-modal__result-type" }, Qe = {
	key: 0,
	class: "match-modal__result-overview"
}, $e = /*#__PURE__*/ e(/* @__PURE__ */ C({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: n }) {
		let s = e, c = n, l = o(), u = j(""), m = j(""), h = j([]), C = j(!1), w = j(!1), T = j(null), E = j(!1), D = j(null), k = j(null), N = j(null), F = j(!1), V = g({
			get: () => s.modelValue,
			set: (e) => c("update:modelValue", e)
		}), H = null;
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function G(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
		}
		function K(e) {
			return e.split(/[/\\]/).map((e) => G(e)).join(" › ");
		}
		function q(e) {
			return `${e.type}:${e.tmdb_id}`;
		}
		function J() {
			H?.abort(), H = null;
		}
		function Y() {
			h.value = [], C.value = !1, w.value = !1, T.value = null, E.value = !1, D.value = null, k.value = null, N.value = null, F.value = !1;
		}
		async function X() {
			if (!s.item) return;
			H?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			H = e;
			let t = () => H !== e;
			C.value = !0, w.value = !0, T.value = null, E.value = !1, k.value = null;
			try {
				let n = await l.client.matchSearch(s.item.id, {
					query: u.value.trim() || void 0,
					year: m.value.trim() || void 0
				}, e?.signal);
				if (t()) return;
				if (h.value = n.results, N.value = n.context ?? null, N.value?.parsed_title && !F.value) {
					let e = N.value.parsed_title;
					u.value !== e && (u.value = e);
				}
			} catch (e) {
				if (t() || W(e)) return;
				h.value = [], r(e) ? E.value = !0 : T.value = i(e, "Search failed. Please try again.");
			} finally {
				t() || (C.value = !1);
			}
		}
		function Z() {
			X();
		}
		function Q() {
			let e = s.item?.name ?? "";
			F.value = u.value !== e;
		}
		async function ee(e) {
			if (!(!s.item || D.value)) {
				D.value = q(e), k.value = null;
				try {
					c("applied", (await l.client.matchApply(s.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					})).item), V.value = !1;
				} catch (e) {
					r(e) ? E.value = !0 : e instanceof a && e.status === 422 ? k.value = "No match details were found for that result. Try another." : k.value = i(e, "Could not apply that match. Please try again.");
				} finally {
					D.value = null;
				}
			}
		}
		return L(() => s.modelValue, (e) => {
			e && s.item ? (Y(), u.value = s.item.name ?? "", m.value = s.item.year == null ? "" : String(s.item.year), X()) : e || (J(), Y());
		}, { immediate: !0 }), O(J), (n, r) => (A(), _(f, {
			modelValue: V.value,
			"onUpdate:modelValue": r[2] ||= (e) => V.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: R(() => [b("div", De, [
				e.item ? (A(), y("p", Oe, [
					r[3] ||= x(" Find the right TMDB entry for ", -1),
					b("strong", null, P(e.item.name), 1),
					e.item.year ? (A(), y("span", ke, "(" + P(e.item.year) + ")", 1)) : v("", !0),
					r[4] ||= x(". ", -1)
				])) : v("", !0),
				b("form", {
					class: "match-modal__form",
					onSubmit: B(Z, ["prevent"])
				}, [
					b("div", Ae, [r[5] ||= b("label", {
						class: "match-modal__label",
						for: "match-query"
					}, "Search", -1), z(b("input", {
						id: "match-query",
						"onUpdate:modelValue": r[0] ||= (e) => u.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off",
						onInput: Q
					}, null, 544), [[I, u.value]])]),
					b("div", je, [r[6] ||= b("label", {
						class: "match-modal__label",
						for: "match-year"
					}, "Year", -1), z(b("input", {
						id: "match-year",
						"onUpdate:modelValue": r[1] ||= (e) => m.value = e,
						type: "text",
						inputmode: "numeric",
						class: "match-modal__input numeric",
						placeholder: "Any",
						autocomplete: "off"
					}, null, 512), [[I, m.value]])]),
					S(d, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: C.value
					}, {
						default: R(() => [...r[7] ||= [x("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				N.value && (N.value.original_filename || N.value.path || N.value.tags && Object.keys(N.value.tags).length) ? (A(), y("details", Me, [r[10] ||= b("summary", { class: "match-modal__source-summary" }, "Source info", -1), b("div", Ne, [
					N.value.original_filename ? (A(), y("p", Pe, [r[8] ||= b("span", { class: "match-modal__source-label" }, "File:", -1), b("code", null, P(N.value.original_filename), 1)])) : v("", !0),
					N.value.path ? (A(), y("p", {
						key: 1,
						class: "match-modal__source-path",
						title: N.value.path
					}, [r[9] ||= b("span", { class: "match-modal__source-label" }, "Path:", -1), b("span", { innerHTML: K(N.value.path) }, null, 8, Ie)], 8, Fe)) : v("", !0),
					N.value.tags && Object.keys(N.value.tags).length ? (A(), y("dl", Le, [(A(!0), y(p, null, M(N.value.tags, (e, t) => (A(), y(p, { key: String(t) }, [b("dt", null, P(t), 1), b("dd", null, P(e), 1)], 64))), 128))])) : v("", !0)
				])])) : v("", !0),
				E.value ? (A(), y("div", Re, [
					S(t, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[11] ||= b("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[12] ||= b("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : T.value ? (A(), y("div", ze, [
					S(t, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					b("p", Be, P(T.value), 1),
					S(d, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: Z
					}, {
						default: R(() => [...r[13] ||= [x("Try again", -1)]]),
						_: 1
					})
				])) : C.value ? (A(), y("div", Ve, [S(U, { label: "Searching TMDB" })])) : w.value && h.value.length === 0 ? (A(), y("div", He, [
					S(t, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[14] ||= b("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[15] ||= b("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : h.value.length ? (A(), y(p, { key: 6 }, [k.value ? (A(), y("p", Ue, P(k.value), 1)) : v("", !0), b("ul", We, [(A(!0), y(p, null, M(h.value, (e) => (A(), y("li", {
					key: q(e),
					class: "match-modal__result"
				}, [
					b("div", Ge, [e.poster_url ? (A(), y("img", {
						key: 0,
						src: e.poster_url,
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ke)) : (A(), y("div", qe, [S(t, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					b("div", Je, [b("p", Ye, [
						x(P(e.title) + " ", 1),
						e.year ? (A(), y("span", Xe, P(e.year), 1)) : v("", !0),
						b("span", Ze, P(e.type), 1)
					]), e.overview ? (A(), y("p", Qe, P(e.overview), 1)) : v("", !0)]),
					S(d, {
						variant: "solid",
						size: "sm",
						loading: D.value === q(e),
						disabled: D.value !== null && D.value !== q(e),
						onClick: (t) => ee(e)
					}, {
						default: R(() => [...r[16] ||= [x(" Use this ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])
				]))), 128))])], 64)) : v("", !0)
			])]),
			_: 1
		}, 8, ["modelValue"]));
	}
}), [["__scopeId", "data-v-aeafa992"]]);
//#endregion
export { q as a, ne as i, $ as n, K as o, te as r, U as s, $e as t };

//# sourceMappingURL=MetadataMatchModal-ozGAKR2V.js.map