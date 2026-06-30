import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useMessages-CLrAkqxK.js";
import { a as r, f as i, l as a } from "./client-CX6TRWS-.js";
import { t as o } from "./useAuthStore-Co09iQFW.js";
import { n as s, o as c, t as l } from "./LoveButton-By5cp7rf.js";
import { t as u } from "./Button-k7aQagzg.js";
import { t as d } from "./Modal-CWarEzTU.js";
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
function ee(e, t) {
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
function Q(e, t) {
	let n = [];
	return n.push({ label: t.isWatched ? "Mark unwatched" : "Mark watched" }), t.isAdmin && (n.push({ label: "Refresh/Match…" }), t.canChoosePoster && n.push({ label: "Choose poster…" }), e.canDelete && n.push({
		label: "Remove",
		danger: !0
	})), n;
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var te = { class: "media-card__poster" }, ne = ["href", "aria-label"], re = { class: "visually-hidden" }, ie = [
	"src",
	"srcset",
	"sizes",
	"alt"
], ae = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, oe = { class: "media-card__badges" }, se = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, ce = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, le = ["aria-valuenow", "aria-label"], ue = { class: "media-card__overlay" }, de = { class: "media-card__title" }, fe = { class: "media-card__meta" }, pe = {
	key: 0,
	class: "numeric"
}, me = {
	key: 1,
	class: "media-card__dot"
}, he = {
	key: 2,
	class: "media-card__cert"
}, ge = {
	key: 3,
	class: "media-card__dot"
}, _e = {
	key: 4,
	class: "numeric"
}, ve = {
	key: 0,
	class: "media-card__genres"
}, ye = { class: "media-card__actions" }, be = ["aria-label", "aria-pressed"], xe = { class: "media-card__caption" }, Se = ["title"], Ce = { class: "media-card__caption-sub numeric" }, we = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		let r = e, i = n, a = c(), u = o(), d = s(), p = C("phlixConfig", null), m = h(() => d.isFavorite(r.item.id)), g = h(() => d.likeLevel(r.item.id)), S = h(() => u.isAdmin), w = h(() => d.isFavorite(r.item.id)), D = A(!1), P = h(() => Q(r.item, {
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
		function I() {
			d.cycleLove(r.item.id, p?.apiBase ?? "");
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
		let J = h(() => ee(r.posterSrcset ?? r.item.poster_srcset, r.posterSizes)), Y = h(() => {
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
		}, [y("div", te, [
			y("a", {
				href: B.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [y("span", re, N(e.item.name), 1)], 8, ne),
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
			}, null, 42, ie)) : (k(), v("div", ae, [x(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			y("div", oe, [
				Y.value ? (k(), v("span", se, "New")) : _("", !0),
				M(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (k(), v("span", ce, N(e.quality), 1)) : _("", !0)
			]),
			X.value > 0 ? (k(), v("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(X.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [y("i", { style: E({ width: `${X.value * 100}%` }) }, null, 4)], 8, le)) : _("", !0),
			y("div", ue, [
				y("h3", de, N(e.item.name), 1),
				y("div", fe, [
					e.item.year ? (k(), v("span", pe, N(e.item.year), 1)) : _("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (k(), v("span", me)) : _("", !0),
					e.item.rating ? (k(), v("span", he, N(e.item.rating), 1)) : _("", !0),
					e.item.rating && e.item.runtime ? (k(), v("span", ge)) : _("", !0),
					e.item.runtime ? (k(), v("span", _e, N(e.item.runtime) + "m", 1)) : _("", !0)
				]),
				Z.value.length ? (k(), v("div", ve, [(k(!0), v(f, null, j(Z.value, (e) => (k(), v("span", { key: e }, N(e), 1))), 128))])) : _("", !0),
				y("div", ye, [
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
					}, [x(t, { name: m.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, be),
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
		]), y("div", xe, [y("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, N(e.item.name), 9, Se), y("div", Ce, [
			e.item.year ? (k(), v(f, { key: 0 }, [b(N(e.item.year), 1)], 64)) : _("", !0),
			e.item.year && e.item.runtime ? (k(), v(f, { key: 1 }, [b(" · ")], 64)) : _("", !0),
			e.item.runtime ? (k(), v(f, { key: 2 }, [b(N(e.item.runtime) + "m", 1)], 64)) : _("", !0)
		])])], 32));
	}
}), [["__scopeId", "data-v-85036bc7"]]), Te = { class: "match-modal" }, Ee = {
	key: 0,
	class: "match-modal__subject"
}, De = {
	key: 0,
	class: "numeric"
}, Oe = { class: "match-modal__field match-modal__field--query" }, ke = { class: "match-modal__field match-modal__field--year" }, Ae = {
	key: 1,
	class: "match-modal__state",
	role: "status"
}, je = {
	key: 2,
	class: "match-modal__state",
	role: "alert"
}, Me = { class: "match-modal__state-title" }, Ne = {
	key: 3,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Pe = {
	key: 4,
	class: "match-modal__state",
	role: "status"
}, $ = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, Fe = { class: "match-modal__results" }, Ie = { class: "match-modal__poster" }, Le = ["src", "alt"], Re = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, ze = { class: "match-modal__result-body" }, Be = { class: "match-modal__result-title" }, Ve = {
	key: 0,
	class: "match-modal__result-year numeric"
}, He = { class: "match-modal__result-type" }, Ue = {
	key: 0,
	class: "match-modal__result-overview"
}, We = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: n }) {
		let s = e, c = n, l = o(), p = A(""), m = A(""), S = A([]), C = A(!1), w = A(!1), T = A(null), E = A(!1), O = A(null), M = A(null), P = h({
			get: () => s.modelValue,
			set: (e) => c("update:modelValue", e)
		}), B = null;
		function V(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function U(e) {
			return `${e.type}:${e.tmdb_id}`;
		}
		function W() {
			B?.abort(), B = null;
		}
		function G() {
			S.value = [], C.value = !1, w.value = !1, T.value = null, E.value = !1, O.value = null, M.value = null;
		}
		async function K() {
			if (!s.item) return;
			B?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			B = e;
			let t = () => B !== e;
			C.value = !0, w.value = !0, T.value = null, E.value = !1, M.value = null;
			try {
				let n = await l.client.matchSearch(s.item.id, {
					query: p.value.trim() || void 0,
					year: m.value.trim() || void 0
				}, e?.signal);
				if (t()) return;
				S.value = n.results;
			} catch (e) {
				if (t() || V(e)) return;
				S.value = [], r(e) ? E.value = !0 : T.value = i(e, "Search failed. Please try again.");
			} finally {
				t() || (C.value = !1);
			}
		}
		function q() {
			K();
		}
		async function J(e) {
			if (!(!s.item || O.value)) {
				O.value = U(e), M.value = null;
				try {
					c("applied", (await l.client.matchApply(s.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					})).item), P.value = !1;
				} catch (e) {
					r(e) ? E.value = !0 : e instanceof a && e.status === 422 ? M.value = "No match details were found for that result. Try another." : M.value = i(e, "Could not apply that match. Please try again.");
				} finally {
					O.value = null;
				}
			}
		}
		return I(() => s.modelValue, (e) => {
			e && s.item ? (G(), p.value = s.item.name ?? "", m.value = s.item.year == null ? "" : String(s.item.year), K()) : e || (W(), G());
		}, { immediate: !0 }), D(W), (n, r) => (k(), g(d, {
			modelValue: P.value,
			"onUpdate:modelValue": r[2] ||= (e) => P.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: L(() => [y("div", Te, [
				e.item ? (k(), v("p", Ee, [
					r[3] ||= b(" Find the right TMDB entry for ", -1),
					y("strong", null, N(e.item.name), 1),
					e.item.year ? (k(), v("span", De, "(" + N(e.item.year) + ")", 1)) : _("", !0),
					r[4] ||= b(". ", -1)
				])) : _("", !0),
				y("form", {
					class: "match-modal__form",
					onSubmit: z(q, ["prevent"])
				}, [
					y("div", Oe, [r[5] ||= y("label", {
						class: "match-modal__label",
						for: "match-query"
					}, "Search", -1), R(y("input", {
						id: "match-query",
						"onUpdate:modelValue": r[0] ||= (e) => p.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off"
					}, null, 512), [[F, p.value]])]),
					y("div", ke, [r[6] ||= y("label", {
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
				E.value ? (k(), v("div", Ae, [
					x(t, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[8] ||= y("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[9] ||= y("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : T.value ? (k(), v("div", je, [
					x(t, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					y("p", Me, N(T.value), 1),
					x(u, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: L(() => [...r[10] ||= [b("Try again", -1)]]),
						_: 1
					})
				])) : C.value ? (k(), v("div", Ne, [x(H, { label: "Searching TMDB" })])) : w.value && S.value.length === 0 ? (k(), v("div", Pe, [
					x(t, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[11] ||= y("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[12] ||= y("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : S.value.length ? (k(), v(f, { key: 5 }, [M.value ? (k(), v("p", $, N(M.value), 1)) : _("", !0), y("ul", Fe, [(k(!0), v(f, null, j(S.value, (e) => (k(), v("li", {
					key: U(e),
					class: "match-modal__result"
				}, [
					y("div", Ie, [e.poster_url ? (k(), v("img", {
						key: 0,
						src: e.poster_url,
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Le)) : (k(), v("div", Re, [x(t, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					y("div", ze, [y("p", Be, [
						b(N(e.title) + " ", 1),
						e.year ? (k(), v("span", Ve, N(e.year), 1)) : _("", !0),
						y("span", He, N(e.type), 1)
					]), e.overview ? (k(), v("p", Ue, N(e.overview), 1)) : _("", !0)]),
					x(u, {
						variant: "solid",
						size: "sm",
						loading: O.value === U(e),
						disabled: O.value !== null && O.value !== U(e),
						onClick: (t) => J(e)
					}, {
						default: L(() => [...r[13] ||= [b(" Use this ", -1)]]),
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
}), [["__scopeId", "data-v-a72aa927"]]);
//#endregion
export { G as a, K as i, we as n, H as o, Q as r, We as t };

//# sourceMappingURL=MetadataMatchModal-DcbN9Cga.js.map