import { n as e, t } from "./Icon-24ngwBUH.js";
import { t as n } from "./useMessages-C21WhqOh.js";
import { a as r, f as i, l as a } from "./client-fw74f3l_.js";
import { t as o } from "./useAuthStore-CUoTkm_k.js";
import { n as s, o as c, t as l } from "./ThumbRating-CDDVfYEs.js";
import { t as u } from "./Button-CInT03Lp.js";
import { t as d } from "./Modal-CBoJ1z1N.js";
import { Fragment as f, Teleport as p, Transition as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, inject as C, nextTick as w, normalizeClass as T, normalizeStyle as E, onBeforeUnmount as D, onMounted as O, openBlock as k, ref as A, renderList as j, renderSlot as M, toDisplayString as N, unref as P, vModelText as F, watch as I, withCtx as L, withDirectives as R, withModifiers as z } from "vue";
import { routerKey as B } from "vue-router";
//#region src/components/ui/Spinner.vue?vue&type=script&setup=true&lang.ts
var V = ["aria-label"], H = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let r = e, { t: i } = n(), a = h(() => r.size === void 0 ? void 0 : typeof r.size == "number" ? `${r.size}px` : r.size);
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
		let i = e, a = t, o = crypto.randomUUID(), s = h(() => `${o}-menu`), c = A(i.open);
		I(() => i.open, (e) => c.value = e), I(c, (e) => a("update:open", e));
		let l = A(null), u = A(null), d = A(-1), y = A(!1);
		function S() {
			c.value || (c.value = !0, d.value = r(i.items, "first"), w(() => {
				F(), u.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function C() {
			c.value = !1, d.value = -1, l.value?.querySelector("button,[contenteditable]")?.focus?.();
		}
		function E() {
			c.value ? C() : S();
		}
		function O(e) {
			d.value = n(i.items, d.value, e), w(() => {
				u.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" });
			});
		}
		function P(e) {
			let t = i.items[e];
			!t || t.disabled || (a("select", t, e), t.onClick?.(), C());
		}
		function F() {
			if (!l.value) return;
			let e = l.value.getBoundingClientRect(), t = window.innerHeight - e.bottom, n = e.top;
			y.value = t < 280 && n > t;
		}
		function R(e) {
			c.value || (c.value = !0, d.value = r(i.items, e), w(() => {
				F(), u.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function z(e) {
			if (!c.value) {
				if (e.key === "ArrowDown") {
					e.preventDefault(), R("first");
					return;
				}
				if (e.key === "ArrowUp") {
					e.preventDefault(), R("last");
					return;
				}
				return;
			}
			B(e);
		}
		function B(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), O(1);
					break;
				case "ArrowUp":
					e.preventDefault(), O(-1);
					break;
				case "Home":
					e.preventDefault(), d.value = r(i.items, "first"), w(() => u.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "End":
					e.preventDefault(), d.value = r(i.items, "last"), w(() => u.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), d.value >= 0 && P(d.value);
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
		return I(c, (e) => {
			e ? document.addEventListener("pointerdown", V, !0) : document.removeEventListener("pointerdown", V, !0);
		}), D(() => {
			document.removeEventListener("pointerdown", V, !0);
		}), (t, n) => (k(), v("div", {
			ref_key: "triggerEl",
			ref: l,
			class: "phlix-menu",
			onClick: E,
			onKeydown: z
		}, [M(t.$slots, "default", {
			open: c.value,
			toggle: E,
			openMenu: S
		}, void 0, !0), (k(), g(p, { to: "body" }, [x(m, { name: "phlix-menu" }, {
			default: L(() => [c.value ? (k(), v("div", {
				key: 0,
				id: s.value,
				ref_key: "menuEl",
				ref: u,
				class: T(["phlix-menu__list", { "is-flipped": y.value }]),
				role: "menu",
				onKeydown: B
			}, [(k(!0), v(f, null, j(e.items, (e, n) => (k(), v("button", {
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
				onClick: (e) => P(n),
				onPointermove: (t) => !e.disabled && (d.value = n)
			}, [M(t.$slots, "item", {
				item: e,
				index: n
			}, () => [b(N(e.label), 1)], !0)], 42, W))), 128))], 42, U)) : _("", !0)]),
			_: 3
		})]))], 544));
	}
}), [["__scopeId", "data-v-5ce5aa8e"]]);
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
function Q(e, t) {
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
function $(e, t) {
	let n = [];
	return n.push({ label: t.isWatched ? "Mark unwatched" : "Mark watched" }), t.isAdmin && (n.push({ label: "Refresh/Match…" }), t.canChoosePoster && n.push({ label: "Choose poster…" }), e.canDelete && n.push({
		label: "Remove",
		danger: !0
	})), n;
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var ee = { class: "media-card__poster" }, te = ["href", "aria-label"], ne = { class: "visually-hidden" }, re = [
	"src",
	"srcset",
	"sizes",
	"alt"
], ie = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, ae = { class: "media-card__badges" }, oe = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, se = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, ce = ["aria-valuenow", "aria-label"], le = { class: "media-card__overlay" }, ue = { class: "media-card__title" }, de = { class: "media-card__meta" }, fe = {
	key: 0,
	class: "numeric"
}, pe = {
	key: 1,
	class: "media-card__dot"
}, me = {
	key: 2,
	class: "media-card__cert"
}, he = {
	key: 3,
	class: "media-card__dot"
}, ge = {
	key: 4,
	class: "numeric"
}, _e = {
	key: 0,
	class: "media-card__genres"
}, ve = { class: "media-card__actions" }, ye = ["aria-label", "aria-pressed"], be = { class: "media-card__caption" }, xe = ["title"], Se = { class: "media-card__caption-sub numeric" }, Ce = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		}
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
		let r = e, i = n, a = c(), u = o(), d = s(), p = C("phlixConfig", null), m = h(() => d.isFavorite(r.item.id)), g = h(() => d.likeLevel(r.item.id)), S = h(() => u.isAdmin), w = h(() => d.isFavorite(r.item.id)), D = A(!1), P = h(() => $(r.item, {
			isAdmin: S.value,
			isWatched: w.value,
			canChoosePoster: S.value
		}));
		function F(e) {
			switch (e.label) {
				case "Mark watched":
				case "Mark unwatched":
					i("mark-watched", r.item);
					break;
				case "Refresh/Match…":
					i("refresh", r.item);
					break;
				case "Choose poster…":
					i("choose-poster", r.item);
					break;
				case "Remove":
					i("remove", r.item);
					break;
			}
		}
		function I(e) {
			d.setLike(r.item.id, e, p?.apiBase ?? "");
		}
		function R() {
			d.toggleFavorite(r.item.id, p?.apiBase ?? ""), i("watchlist", r.item);
		}
		let B = h(() => r.to ?? `/app/media/${r.item.id}`), { prefetch: V } = K();
		function H() {
			V(B.value);
		}
		let U = A(!1), W = A(null);
		function q() {
			U.value = !0;
		}
		O(() => {
			W.value?.complete && (U.value = !0);
		});
		let J = h(() => Q(r.posterSrcset ?? r.item.poster_srcset, r.posterSizes)), Y = h(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), X = h(() => {
			let e = a.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), Z = h(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (k(), v("article", {
			class: "media-card",
			onPointerenter: H,
			onFocusin: H
		}, [y("div", ee, [
			y("a", {
				href: B.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [y("span", ne, N(e.item.name), 1)], 8, te),
			e.item.poster_url ? (k(), v("img", {
				key: 0,
				ref_key: "imgEl",
				ref: W,
				class: T(["media-card__img", { "is-loaded": U.value }]),
				src: e.item.poster_url,
				srcset: J.value.srcset,
				sizes: J.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: q
			}, null, 42, re)) : (k(), v("div", ie, [x(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			y("div", ae, [
				Y.value ? (k(), v("span", oe, "New")) : _("", !0),
				M(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (k(), v("span", se, N(e.quality), 1)) : _("", !0)
			]),
			X.value > 0 ? (k(), v("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(X.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [y("i", { style: E({ width: `${X.value * 100}%` }) }, null, 4)], 8, ce)) : _("", !0),
			y("div", le, [
				y("h3", ue, N(e.item.name), 1),
				y("div", de, [
					e.item.year ? (k(), v("span", fe, N(e.item.year), 1)) : _("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (k(), v("span", pe)) : _("", !0),
					e.item.rating ? (k(), v("span", me, N(e.item.rating), 1)) : _("", !0),
					e.item.rating && e.item.runtime ? (k(), v("span", he)) : _("", !0),
					e.item.runtime ? (k(), v("span", ge, N(e.item.runtime) + "m", 1)) : _("", !0)
				]),
				Z.value.length ? (k(), v("div", _e, [(k(!0), v(f, null, j(Z.value, (e) => (k(), v("span", { key: e }, N(e), 1))), 128))])) : _("", !0),
				y("div", ve, [
					y("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= z((t) => i("play", e.item), ["stop", "prevent"])
					}, [x(t, { name: "play" })]),
					x(l, {
						level: g.value,
						onCycle: I,
						onClick: r[1] ||= z(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					y("button", {
						type: "button",
						class: T(["media-card__iconbtn", { "is-active": m.value }]),
						"aria-label": m.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": m.value ? "true" : "false",
						onClick: z(R, ["stop", "prevent"])
					}, [x(t, { name: m.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ye),
					y("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= z((t) => i("info", e.item), ["stop", "prevent"])
					}, [x(t, { name: "info" })]),
					x(G, {
						open: D.value,
						"onUpdate:open": r[4] ||= (e) => D.value = e,
						items: P.value,
						onSelect: F
					}, {
						default: L(() => [y("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							onClick: r[3] ||= z(() => {}, ["stop", "prevent"])
						}, [x(t, { name: "more" })])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (k(), v("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[5] ||= z((t) => i("match", e.item), ["stop", "prevent"])
					}, [x(t, { name: "search" })])) : _("", !0),
					M(n.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), y("div", be, [y("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, N(e.item.name), 9, xe), y("div", Se, [
			e.item.year ? (k(), v(f, { key: 0 }, [b(N(e.item.year), 1)], 64)) : _("", !0),
			e.item.year && e.item.runtime ? (k(), v(f, { key: 1 }, [b(" · ")], 64)) : _("", !0),
			e.item.runtime ? (k(), v(f, { key: 2 }, [b(N(e.item.runtime) + "m", 1)], 64)) : _("", !0)
		])])], 32));
	}
}), [["__scopeId", "data-v-9a262606"]]), we = { class: "match-modal" }, Te = {
	key: 0,
	class: "match-modal__subject"
}, Ee = {
	key: 0,
	class: "numeric"
}, De = { class: "match-modal__field match-modal__field--query" }, Oe = { class: "match-modal__field match-modal__field--year" }, ke = {
	key: 1,
	class: "match-modal__source"
}, Ae = { class: "match-modal__source-body" }, je = {
	key: 0,
	class: "match-modal__source-filename"
}, Me = ["title"], Ne = ["innerHTML"], Pe = {
	key: 2,
	class: "match-modal__source-tags"
}, Fe = {
	key: 2,
	class: "match-modal__state",
	role: "status"
}, Ie = {
	key: 3,
	class: "match-modal__state",
	role: "alert"
}, Le = { class: "match-modal__state-title" }, Re = {
	key: 4,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, ze = {
	key: 5,
	class: "match-modal__state",
	role: "status"
}, Be = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, Ve = { class: "match-modal__results" }, He = { class: "match-modal__poster" }, Ue = ["src", "alt"], We = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, Ge = { class: "match-modal__result-body" }, Ke = { class: "match-modal__result-title" }, qe = {
	key: 0,
	class: "match-modal__result-year numeric"
}, Je = { class: "match-modal__result-type" }, Ye = {
	key: 0,
	class: "match-modal__result-overview"
}, Xe = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: n }) {
		let s = e, c = n, l = o(), p = A(""), m = A(""), S = A([]), C = A(!1), w = A(!1), T = A(null), E = A(!1), O = A(null), M = A(null), P = A(null), B = A(!1), V = h({
			get: () => s.modelValue,
			set: (e) => c("update:modelValue", e)
		}), U = null;
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
			U?.abort(), U = null;
		}
		function Y() {
			S.value = [], C.value = !1, w.value = !1, T.value = null, E.value = !1, O.value = null, M.value = null, P.value = null, B.value = !1;
		}
		async function X() {
			if (!s.item) return;
			U?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			U = e;
			let t = () => U !== e;
			C.value = !0, w.value = !0, T.value = null, E.value = !1, M.value = null;
			try {
				let n = await l.client.matchSearch(s.item.id, {
					query: p.value.trim() || void 0,
					year: m.value.trim() || void 0
				}, e?.signal);
				if (t()) return;
				if (S.value = n.results, P.value = n.context ?? null, P.value?.parsed_title && !B.value) {
					let e = P.value.parsed_title;
					p.value !== e && (p.value = e);
				}
			} catch (e) {
				if (t() || W(e)) return;
				S.value = [], r(e) ? E.value = !0 : T.value = i(e, "Search failed. Please try again.");
			} finally {
				t() || (C.value = !1);
			}
		}
		function Z() {
			X();
		}
		function Q() {
			let e = s.item?.name ?? "";
			B.value = p.value !== e;
		}
		async function $(e) {
			if (!(!s.item || O.value)) {
				O.value = q(e), M.value = null;
				try {
					c("applied", (await l.client.matchApply(s.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					})).item), V.value = !1;
				} catch (e) {
					r(e) ? E.value = !0 : e instanceof a && e.status === 422 ? M.value = "No match details were found for that result. Try another." : M.value = i(e, "Could not apply that match. Please try again.");
				} finally {
					O.value = null;
				}
			}
		}
		return I(() => s.modelValue, (e) => {
			e && s.item ? (Y(), p.value = s.item.name ?? "", m.value = s.item.year == null ? "" : String(s.item.year), X()) : e || (J(), Y());
		}, { immediate: !0 }), D(J), (n, r) => (k(), g(d, {
			modelValue: V.value,
			"onUpdate:modelValue": r[2] ||= (e) => V.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: L(() => [y("div", we, [
				e.item ? (k(), v("p", Te, [
					r[3] ||= b(" Find the right TMDB entry for ", -1),
					y("strong", null, N(e.item.name), 1),
					e.item.year ? (k(), v("span", Ee, "(" + N(e.item.year) + ")", 1)) : _("", !0),
					r[4] ||= b(". ", -1)
				])) : _("", !0),
				y("form", {
					class: "match-modal__form",
					onSubmit: z(Z, ["prevent"])
				}, [
					y("div", De, [r[5] ||= y("label", {
						class: "match-modal__label",
						for: "match-query"
					}, "Search", -1), R(y("input", {
						id: "match-query",
						"onUpdate:modelValue": r[0] ||= (e) => p.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off",
						onInput: Q
					}, null, 544), [[F, p.value]])]),
					y("div", Oe, [r[6] ||= y("label", {
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
					x(u, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: C.value
					}, {
						default: L(() => [...r[7] ||= [b("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				P.value && (P.value.original_filename || P.value.path || P.value.tags && Object.keys(P.value.tags).length) ? (k(), v("details", ke, [r[10] ||= y("summary", { class: "match-modal__source-summary" }, "Source info", -1), y("div", Ae, [
					P.value.original_filename ? (k(), v("p", je, [r[8] ||= y("span", { class: "match-modal__source-label" }, "File:", -1), y("code", null, N(P.value.original_filename), 1)])) : _("", !0),
					P.value.path ? (k(), v("p", {
						key: 1,
						class: "match-modal__source-path",
						title: P.value.path
					}, [r[9] ||= y("span", { class: "match-modal__source-label" }, "Path:", -1), y("span", { innerHTML: K(P.value.path) }, null, 8, Ne)], 8, Me)) : _("", !0),
					P.value.tags && Object.keys(P.value.tags).length ? (k(), v("dl", Pe, [(k(!0), v(f, null, j(P.value.tags, (e, t) => (k(), v(f, { key: String(t) }, [y("dt", null, N(t), 1), y("dd", null, N(e), 1)], 64))), 128))])) : _("", !0)
				])])) : _("", !0),
				E.value ? (k(), v("div", Fe, [
					x(t, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[11] ||= y("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[12] ||= y("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : T.value ? (k(), v("div", Ie, [
					x(t, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					y("p", Le, N(T.value), 1),
					x(u, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: Z
					}, {
						default: L(() => [...r[13] ||= [b("Try again", -1)]]),
						_: 1
					})
				])) : C.value ? (k(), v("div", Re, [x(H, { label: "Searching TMDB" })])) : w.value && S.value.length === 0 ? (k(), v("div", ze, [
					x(t, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[14] ||= y("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[15] ||= y("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : S.value.length ? (k(), v(f, { key: 6 }, [M.value ? (k(), v("p", Be, N(M.value), 1)) : _("", !0), y("ul", Ve, [(k(!0), v(f, null, j(S.value, (e) => (k(), v("li", {
					key: q(e),
					class: "match-modal__result"
				}, [
					y("div", He, [e.poster_url ? (k(), v("img", {
						key: 0,
						src: e.poster_url,
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ue)) : (k(), v("div", We, [x(t, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					y("div", Ge, [y("p", Ke, [
						b(N(e.title) + " ", 1),
						e.year ? (k(), v("span", qe, N(e.year), 1)) : _("", !0),
						y("span", Je, N(e.type), 1)
					]), e.overview ? (k(), v("p", Ye, N(e.overview), 1)) : _("", !0)]),
					x(u, {
						variant: "solid",
						size: "sm",
						loading: O.value === q(e),
						disabled: O.value !== null && O.value !== q(e),
						onClick: (t) => $(e)
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
export { G as a, K as i, Ce as n, H as o, $ as r, Xe as t };

//# sourceMappingURL=MetadataMatchModal-Cd3M7_Wl.js.map