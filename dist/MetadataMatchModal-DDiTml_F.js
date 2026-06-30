import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useMessages-CLrAkqxK.js";
import { a as r, f as i, l as a, t as o } from "./client-cUL8r-1I.js";
import { t as s } from "./useAuthStore-CJrazXSP.js";
import { i as c } from "./usePlayerStore-iTjrRIZa.js";
import { t as l } from "./Button-k7aQagzg.js";
import { t as u } from "./Modal-CWarEzTU.js";
import { t as d } from "./useToastStore-BDoKlU6N.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, normalizeClass as S, normalizeStyle as C, onBeforeUnmount as w, onMounted as T, openBlock as E, ref as D, renderList as O, renderSlot as k, toDisplayString as A, unref as j, vModelText as M, watch as N, withCtx as P, withDirectives as F, withModifiers as I } from "vue";
import { defineStore as L } from "pinia";
import { routerKey as R } from "vue-router";
//#region src/components/ui/Spinner.vue?vue&type=script&setup=true&lang.ts
var z = ["aria-label"], B = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let r = e, { t: i } = n(), a = p(() => r.size === void 0 ? void 0 : typeof r.size == "number" ? `${r.size}px` : r.size);
		return (n, r) => (E(), g("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? j(i)("common.loading"),
			style: C(a.value ? { fontSize: a.value } : void 0)
		}, [y(t, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, z));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), V = [
	"disabled",
	"aria-label",
	"aria-pressed",
	"data-level"
], H = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "LoveButton",
	props: {
		level: { default: 0 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["cycle", "update:level"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = p(() => {
			let e = Math.floor(Number(r.level));
			return !Number.isFinite(e) || e < 0 ? 0 : e > 3 ? 3 : e;
		}), o = p(() => a.value > 0), s = p(() => {
			switch (a.value) {
				case 1: return "Liked — click to like more";
				case 2: return "Really like — click to love";
				case 3: return "Loved — click to clear";
				default: return "Not loved — click to like";
			}
		});
		function c() {
			if (r.disabled) return;
			let e = (a.value + 1) % 4;
			i("cycle", e), i("update:level", e);
		}
		return (n, r) => (E(), g("button", {
			type: "button",
			class: S(["love-button", [`love-button--level-${a.value}`, { "is-loved": o.value }]]),
			disabled: e.disabled,
			"aria-label": s.value,
			"aria-pressed": o.value ? "true" : "false",
			"data-level": a.value,
			onClick: c
		}, [y(t, {
			name: "heart",
			class: "love-button__icon"
		})], 10, V));
	}
}), [["__scopeId", "data-v-d51bcc35"]]), U = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0
}), W = L("user-item-data", () => {
	let e = D(/* @__PURE__ */ new Map()), t = null;
	function n(e) {
		return t ? t.setBaseUrl(e) : t = new o({ baseUrl: e }), t;
	}
	function r(t) {
		return e.value.get(t)?.favorite ?? !1;
	}
	function a(t) {
		return e.value.get(t)?.like_level ?? 0;
	}
	function s(t) {
		return e.value.get(t) ?? { ...U };
	}
	function c(t) {
		if (!t || typeof t.id != "string") return;
		let n = t.user_data;
		e.value.set(t.id, {
			favorite: n?.favorite ?? !1,
			rating: n?.rating ?? null,
			like_level: n?.like_level ?? 0
		});
	}
	function l(t, n) {
		let r = e.value.get(t) ?? { ...U };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function u(e, t) {
		let a = r(e), o = !a;
		l(e, { favorite: o });
		try {
			let r = n(t);
			o ? await r.addFavorite(e) : await r.removeFavorite(e);
		} catch (t) {
			l(e, { favorite: a });
			let n = o ? "add to" : "remove from";
			d().error(`Failed to ${n} favorites: ${i(t)}`);
		}
	}
	async function f(e, t) {
		let r = a(e), o = (r + 1) % 4;
		l(e, { like_level: o });
		try {
			await n(t).setLikeLevel(e, o);
		} catch (t) {
			l(e, { like_level: r }), d().error(`Failed to set love level: ${i(t)}`);
		}
	}
	function p() {
		e.value = /* @__PURE__ */ new Map(), t = null;
	}
	return {
		entries: e,
		isFavorite: r,
		likeLevel: a,
		get: s,
		hydrate: c,
		toggleFavorite: u,
		cycleLove: f,
		reset: p
	};
});
//#endregion
//#region src/composables/usePrefetch.ts
function G() {
	let e = x(R, null), t = /* @__PURE__ */ new WeakSet();
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
var K = "(max-width: 600px) 45vw, 200px";
function q(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function J(e) {
	return Number(e.toFixed(3)).toString();
}
function ee(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${J(e.density)}x` : t;
}
function te(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = ee(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function Y(e, t) {
	let n = te(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : q(n) ? {
		srcset: n,
		sizes: K
	} : { srcset: n };
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var X = { class: "media-card__poster" }, Z = ["href", "aria-label"], Q = { class: "visually-hidden" }, ne = [
	"src",
	"srcset",
	"sizes",
	"alt"
], re = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, ie = { class: "media-card__badges" }, ae = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, oe = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, se = ["aria-valuenow", "aria-label"], ce = { class: "media-card__overlay" }, le = { class: "media-card__title" }, ue = { class: "media-card__meta" }, de = {
	key: 0,
	class: "numeric"
}, fe = {
	key: 1,
	class: "media-card__dot"
}, pe = {
	key: 2,
	class: "media-card__cert"
}, me = {
	key: 3,
	class: "media-card__dot"
}, he = {
	key: 4,
	class: "numeric"
}, ge = {
	key: 0,
	class: "media-card__genres"
}, _e = { class: "media-card__actions" }, ve = ["aria-label", "aria-pressed"], ye = { class: "media-card__caption" }, be = ["title"], xe = { class: "media-card__caption-sub numeric" }, Se = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		"match"
	],
	setup(e, { emit: n }) {
		let r = e, i = n, a = c(), o = W(), s = x("phlixConfig", null), l = p(() => o.isFavorite(r.item.id)), u = p(() => o.likeLevel(r.item.id));
		function d() {
			o.cycleLove(r.item.id, s?.apiBase ?? "");
		}
		function m() {
			o.toggleFavorite(r.item.id, s?.apiBase ?? ""), i("watchlist", r.item);
		}
		let b = p(() => r.to ?? `/app/media/${r.item.id}`), { prefetch: w } = G();
		function j() {
			w(b.value);
		}
		let M = D(!1), N = D(null);
		function P() {
			M.value = !0;
		}
		T(() => {
			N.value?.complete && (M.value = !0);
		});
		let F = p(() => Y(r.posterSrcset ?? r.item.poster_srcset, r.posterSizes)), L = p(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), R = p(() => {
			let e = a.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), z = p(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (E(), g("article", {
			class: "media-card",
			onPointerenter: j,
			onFocusin: j
		}, [_("div", X, [
			_("a", {
				href: b.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [_("span", Q, A(e.item.name), 1)], 8, Z),
			e.item.poster_url ? (E(), g("img", {
				key: 0,
				ref_key: "imgEl",
				ref: N,
				class: S(["media-card__img", { "is-loaded": M.value }]),
				src: e.item.poster_url,
				srcset: F.value.srcset,
				sizes: F.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: P
			}, null, 42, ne)) : (E(), g("div", re, [y(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			_("div", ie, [
				L.value ? (E(), g("span", ae, "New")) : h("", !0),
				k(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (E(), g("span", oe, A(e.quality), 1)) : h("", !0)
			]),
			R.value > 0 ? (E(), g("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(R.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [_("i", { style: C({ width: `${R.value * 100}%` }) }, null, 4)], 8, se)) : h("", !0),
			_("div", ce, [
				_("h3", le, A(e.item.name), 1),
				_("div", ue, [
					e.item.year ? (E(), g("span", de, A(e.item.year), 1)) : h("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (E(), g("span", fe)) : h("", !0),
					e.item.rating ? (E(), g("span", pe, A(e.item.rating), 1)) : h("", !0),
					e.item.rating && e.item.runtime ? (E(), g("span", me)) : h("", !0),
					e.item.runtime ? (E(), g("span", he, A(e.item.runtime) + "m", 1)) : h("", !0)
				]),
				z.value.length ? (E(), g("div", ge, [(E(!0), g(f, null, O(z.value, (e) => (E(), g("span", { key: e }, A(e), 1))), 128))])) : h("", !0),
				_("div", _e, [
					_("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= I((t) => i("play", e.item), ["stop", "prevent"])
					}, [y(t, { name: "play" })]),
					y(H, {
						level: u.value,
						onCycle: d,
						onClick: r[1] ||= I(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					_("button", {
						type: "button",
						class: S(["media-card__iconbtn", { "is-active": l.value }]),
						"aria-label": l.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": l.value ? "true" : "false",
						onClick: I(m, ["stop", "prevent"])
					}, [y(t, { name: l.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ve),
					_("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= I((t) => i("info", e.item), ["stop", "prevent"])
					}, [y(t, { name: "info" })]),
					e.canMatch ? (E(), g("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[3] ||= I((t) => i("match", e.item), ["stop", "prevent"])
					}, [y(t, { name: "search" })])) : h("", !0),
					k(n.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), _("div", ye, [_("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, A(e.item.name), 9, be), _("div", xe, [
			e.item.year ? (E(), g(f, { key: 0 }, [v(A(e.item.year), 1)], 64)) : h("", !0),
			e.item.year && e.item.runtime ? (E(), g(f, { key: 1 }, [v(" · ")], 64)) : h("", !0),
			e.item.runtime ? (E(), g(f, { key: 2 }, [v(A(e.item.runtime) + "m", 1)], 64)) : h("", !0)
		])])], 32));
	}
}), [["__scopeId", "data-v-66d33461"]]), Ce = { class: "match-modal" }, we = {
	key: 0,
	class: "match-modal__subject"
}, Te = {
	key: 0,
	class: "numeric"
}, Ee = { class: "match-modal__field match-modal__field--query" }, De = { class: "match-modal__field match-modal__field--year" }, Oe = {
	key: 1,
	class: "match-modal__state",
	role: "status"
}, ke = {
	key: 2,
	class: "match-modal__state",
	role: "alert"
}, Ae = { class: "match-modal__state-title" }, je = {
	key: 3,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Me = {
	key: 4,
	class: "match-modal__state",
	role: "status"
}, Ne = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, Pe = { class: "match-modal__results" }, $ = { class: "match-modal__poster" }, Fe = ["src", "alt"], Ie = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, Le = { class: "match-modal__result-body" }, Re = { class: "match-modal__result-title" }, ze = {
	key: 0,
	class: "match-modal__result-year numeric"
}, Be = { class: "match-modal__result-type" }, Ve = {
	key: 0,
	class: "match-modal__result-overview"
}, He = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: n }) {
		let o = e, c = n, d = s(), b = D(""), x = D(""), S = D([]), C = D(!1), T = D(!1), k = D(null), j = D(!1), L = D(null), R = D(null), z = p({
			get: () => o.modelValue,
			set: (e) => c("update:modelValue", e)
		}), V = null;
		function H(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function U(e) {
			return `${e.type}:${e.tmdb_id}`;
		}
		function W() {
			V?.abort(), V = null;
		}
		function G() {
			S.value = [], C.value = !1, T.value = !1, k.value = null, j.value = !1, L.value = null, R.value = null;
		}
		async function K() {
			if (!o.item) return;
			V?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			V = e;
			let t = () => V !== e;
			C.value = !0, T.value = !0, k.value = null, j.value = !1, R.value = null;
			try {
				let n = await d.client.matchSearch(o.item.id, {
					query: b.value.trim() || void 0,
					year: x.value.trim() || void 0
				}, e?.signal);
				if (t()) return;
				S.value = n.results;
			} catch (e) {
				if (t() || H(e)) return;
				S.value = [], r(e) ? j.value = !0 : k.value = i(e, "Search failed. Please try again.");
			} finally {
				t() || (C.value = !1);
			}
		}
		function q() {
			K();
		}
		async function J(e) {
			if (!(!o.item || L.value)) {
				L.value = U(e), R.value = null;
				try {
					c("applied", (await d.client.matchApply(o.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					})).item), z.value = !1;
				} catch (e) {
					r(e) ? j.value = !0 : e instanceof a && e.status === 422 ? R.value = "No match details were found for that result. Try another." : R.value = i(e, "Could not apply that match. Please try again.");
				} finally {
					L.value = null;
				}
			}
		}
		return N(() => o.modelValue, (e) => {
			e && o.item ? (G(), b.value = o.item.name ?? "", x.value = o.item.year == null ? "" : String(o.item.year), K()) : e || (W(), G());
		}, { immediate: !0 }), w(W), (n, r) => (E(), m(u, {
			modelValue: z.value,
			"onUpdate:modelValue": r[2] ||= (e) => z.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: P(() => [_("div", Ce, [
				e.item ? (E(), g("p", we, [
					r[3] ||= v(" Find the right TMDB entry for ", -1),
					_("strong", null, A(e.item.name), 1),
					e.item.year ? (E(), g("span", Te, "(" + A(e.item.year) + ")", 1)) : h("", !0),
					r[4] ||= v(". ", -1)
				])) : h("", !0),
				_("form", {
					class: "match-modal__form",
					onSubmit: I(q, ["prevent"])
				}, [
					_("div", Ee, [r[5] ||= _("label", {
						class: "match-modal__label",
						for: "match-query"
					}, "Search", -1), F(_("input", {
						id: "match-query",
						"onUpdate:modelValue": r[0] ||= (e) => b.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off"
					}, null, 512), [[M, b.value]])]),
					_("div", De, [r[6] ||= _("label", {
						class: "match-modal__label",
						for: "match-year"
					}, "Year", -1), F(_("input", {
						id: "match-year",
						"onUpdate:modelValue": r[1] ||= (e) => x.value = e,
						type: "text",
						inputmode: "numeric",
						class: "match-modal__input numeric",
						placeholder: "Any",
						autocomplete: "off"
					}, null, 512), [[M, x.value]])]),
					y(l, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: C.value
					}, {
						default: P(() => [...r[7] ||= [v("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				j.value ? (E(), g("div", Oe, [
					y(t, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[8] ||= _("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[9] ||= _("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : k.value ? (E(), g("div", ke, [
					y(t, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					_("p", Ae, A(k.value), 1),
					y(l, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: P(() => [...r[10] ||= [v("Try again", -1)]]),
						_: 1
					})
				])) : C.value ? (E(), g("div", je, [y(B, { label: "Searching TMDB" })])) : T.value && S.value.length === 0 ? (E(), g("div", Me, [
					y(t, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[11] ||= _("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[12] ||= _("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : S.value.length ? (E(), g(f, { key: 5 }, [R.value ? (E(), g("p", Ne, A(R.value), 1)) : h("", !0), _("ul", Pe, [(E(!0), g(f, null, O(S.value, (e) => (E(), g("li", {
					key: U(e),
					class: "match-modal__result"
				}, [
					_("div", $, [e.poster_url ? (E(), g("img", {
						key: 0,
						src: e.poster_url,
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Fe)) : (E(), g("div", Ie, [y(t, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					_("div", Le, [_("p", Re, [
						v(A(e.title) + " ", 1),
						e.year ? (E(), g("span", ze, A(e.year), 1)) : h("", !0),
						_("span", Be, A(e.type), 1)
					]), e.overview ? (E(), g("p", Ve, A(e.overview), 1)) : h("", !0)]),
					y(l, {
						variant: "solid",
						size: "sm",
						loading: L.value === U(e),
						disabled: L.value !== null && L.value !== U(e),
						onClick: (t) => J(e)
					}, {
						default: P(() => [...r[13] ||= [v(" Use this ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])
				]))), 128))])], 64)) : h("", !0)
			])]),
			_: 1
		}, 8, ["modelValue"]));
	}
}), [["__scopeId", "data-v-a72aa927"]]);
//#endregion
export { H as a, W as i, Se as n, B as o, G as r, He as t };

//# sourceMappingURL=MetadataMatchModal-DDiTml_F.js.map