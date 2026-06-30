import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useMessages-CLrAkqxK.js";
import { a as r, f as i, l as a, t as o } from "./client-Dywsiudr.js";
import { t as s } from "./useAuthStore-BDivyavD.js";
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
}), [["__scopeId", "data-v-ebc9ef9d"]]), V = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0
}), H = L("user-item-data", () => {
	let e = D(/* @__PURE__ */ new Map()), t = null;
	function n(e) {
		return t ? t.setBaseUrl(e) : t = new o({ baseUrl: e }), t;
	}
	function r(t) {
		return e.value.get(t)?.favorite ?? !1;
	}
	function a(t) {
		return e.value.get(t) ?? { ...V };
	}
	function s(t) {
		if (!t || typeof t.id != "string") return;
		let n = t.user_data;
		e.value.set(t.id, {
			favorite: n?.favorite ?? !1,
			rating: n?.rating ?? null,
			like_level: n?.like_level ?? 0
		});
	}
	function c(t, n) {
		let r = e.value.get(t) ?? { ...V };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function l(e, t) {
		let a = r(e), o = !a;
		c(e, { favorite: o });
		try {
			let r = n(t);
			o ? await r.addFavorite(e) : await r.removeFavorite(e);
		} catch (t) {
			c(e, { favorite: a });
			let n = o ? "add to" : "remove from";
			d().error(`Failed to ${n} favorites: ${i(t)}`);
		}
	}
	function u() {
		e.value = /* @__PURE__ */ new Map(), t = null;
	}
	return {
		entries: e,
		isFavorite: r,
		get: a,
		hydrate: s,
		toggleFavorite: l,
		reset: u
	};
});
//#endregion
//#region src/composables/usePrefetch.ts
function U() {
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
var W = "(max-width: 600px) 45vw, 200px";
function G(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function K(e) {
	return Number(e.toFixed(3)).toString();
}
function q(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${K(e.density)}x` : t;
}
function J(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = q(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function ee(e, t) {
	let n = J(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : G(n) ? {
		srcset: n,
		sizes: W
	} : { srcset: n };
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var te = { class: "media-card__poster" }, Y = ["href", "aria-label"], X = { class: "visually-hidden" }, Z = [
	"src",
	"srcset",
	"sizes",
	"alt"
], Q = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, ne = { class: "media-card__badges" }, re = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, ie = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, ae = ["aria-valuenow", "aria-label"], oe = { class: "media-card__overlay" }, se = { class: "media-card__title" }, ce = { class: "media-card__meta" }, le = {
	key: 0,
	class: "numeric"
}, ue = {
	key: 1,
	class: "media-card__dot"
}, de = {
	key: 2,
	class: "media-card__cert"
}, fe = {
	key: 3,
	class: "media-card__dot"
}, pe = {
	key: 4,
	class: "numeric"
}, me = {
	key: 0,
	class: "media-card__genres"
}, he = { class: "media-card__actions" }, ge = ["aria-label", "aria-pressed"], _e = { class: "media-card__caption" }, ve = ["title"], ye = { class: "media-card__caption-sub numeric" }, be = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		let r = e, i = n, a = c(), o = H(), s = x("phlixConfig", null), l = p(() => o.isFavorite(r.item.id));
		function u() {
			o.toggleFavorite(r.item.id, s?.apiBase ?? ""), i("watchlist", r.item);
		}
		let d = p(() => r.to ?? `/app/media/${r.item.id}`), { prefetch: m } = U();
		function b() {
			m(d.value);
		}
		let w = D(!1), j = D(null);
		function M() {
			w.value = !0;
		}
		T(() => {
			j.value?.complete && (w.value = !0);
		});
		let N = p(() => ee(r.posterSrcset ?? r.item.poster_srcset, r.posterSizes)), P = p(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), F = p(() => {
			let e = a.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), L = p(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (E(), g("article", {
			class: "media-card",
			onPointerenter: b,
			onFocusin: b
		}, [_("div", te, [
			_("a", {
				href: d.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [_("span", X, A(e.item.name), 1)], 8, Y),
			e.item.poster_url ? (E(), g("img", {
				key: 0,
				ref_key: "imgEl",
				ref: j,
				class: S(["media-card__img", { "is-loaded": w.value }]),
				src: e.item.poster_url,
				srcset: N.value.srcset,
				sizes: N.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: M
			}, null, 42, Z)) : (E(), g("div", Q, [y(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			_("div", ne, [
				P.value ? (E(), g("span", re, "New")) : h("", !0),
				k(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (E(), g("span", ie, A(e.quality), 1)) : h("", !0)
			]),
			F.value > 0 ? (E(), g("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(F.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [_("i", { style: C({ width: `${F.value * 100}%` }) }, null, 4)], 8, ae)) : h("", !0),
			_("div", oe, [
				_("h3", se, A(e.item.name), 1),
				_("div", ce, [
					e.item.year ? (E(), g("span", le, A(e.item.year), 1)) : h("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (E(), g("span", ue)) : h("", !0),
					e.item.rating ? (E(), g("span", de, A(e.item.rating), 1)) : h("", !0),
					e.item.rating && e.item.runtime ? (E(), g("span", fe)) : h("", !0),
					e.item.runtime ? (E(), g("span", pe, A(e.item.runtime) + "m", 1)) : h("", !0)
				]),
				L.value.length ? (E(), g("div", me, [(E(!0), g(f, null, O(L.value, (e) => (E(), g("span", { key: e }, A(e), 1))), 128))])) : h("", !0),
				_("div", he, [
					_("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= I((t) => i("play", e.item), ["stop", "prevent"])
					}, [y(t, { name: "play" })]),
					_("button", {
						type: "button",
						class: S(["media-card__iconbtn", { "is-active": l.value }]),
						"aria-label": l.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": l.value ? "true" : "false",
						onClick: I(u, ["stop", "prevent"])
					}, [y(t, { name: l.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ge),
					_("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[1] ||= I((t) => i("info", e.item), ["stop", "prevent"])
					}, [y(t, { name: "info" })]),
					e.canMatch ? (E(), g("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[2] ||= I((t) => i("match", e.item), ["stop", "prevent"])
					}, [y(t, { name: "search" })])) : h("", !0),
					k(n.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), _("div", _e, [_("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, A(e.item.name), 9, ve), _("div", ye, [
			e.item.year ? (E(), g(f, { key: 0 }, [v(A(e.item.year), 1)], 64)) : h("", !0),
			e.item.year && e.item.runtime ? (E(), g(f, { key: 1 }, [v(" · ")], 64)) : h("", !0),
			e.item.runtime ? (E(), g(f, { key: 2 }, [v(A(e.item.runtime) + "m", 1)], 64)) : h("", !0)
		])])], 32));
	}
}), [["__scopeId", "data-v-88c5e9c5"]]), xe = { class: "match-modal" }, Se = {
	key: 0,
	class: "match-modal__subject"
}, Ce = {
	key: 0,
	class: "numeric"
}, we = { class: "match-modal__field match-modal__field--query" }, Te = { class: "match-modal__field match-modal__field--year" }, Ee = {
	key: 1,
	class: "match-modal__state",
	role: "status"
}, De = {
	key: 2,
	class: "match-modal__state",
	role: "alert"
}, Oe = { class: "match-modal__state-title" }, ke = {
	key: 3,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Ae = {
	key: 4,
	class: "match-modal__state",
	role: "status"
}, je = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, Me = { class: "match-modal__results" }, Ne = { class: "match-modal__poster" }, Pe = ["src", "alt"], $ = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, Fe = { class: "match-modal__result-body" }, Ie = { class: "match-modal__result-title" }, Le = {
	key: 0,
	class: "match-modal__result-year numeric"
}, Re = { class: "match-modal__result-type" }, ze = {
	key: 0,
	class: "match-modal__result-overview"
}, Be = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
			default: P(() => [_("div", xe, [
				e.item ? (E(), g("p", Se, [
					r[3] ||= v(" Find the right TMDB entry for ", -1),
					_("strong", null, A(e.item.name), 1),
					e.item.year ? (E(), g("span", Ce, "(" + A(e.item.year) + ")", 1)) : h("", !0),
					r[4] ||= v(". ", -1)
				])) : h("", !0),
				_("form", {
					class: "match-modal__form",
					onSubmit: I(q, ["prevent"])
				}, [
					_("div", we, [r[5] ||= _("label", {
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
					_("div", Te, [r[6] ||= _("label", {
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
				j.value ? (E(), g("div", Ee, [
					y(t, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[8] ||= _("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[9] ||= _("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : k.value ? (E(), g("div", De, [
					y(t, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					_("p", Oe, A(k.value), 1),
					y(l, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: P(() => [...r[10] ||= [v("Try again", -1)]]),
						_: 1
					})
				])) : C.value ? (E(), g("div", ke, [y(B, { label: "Searching TMDB" })])) : T.value && S.value.length === 0 ? (E(), g("div", Ae, [
					y(t, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[11] ||= _("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[12] ||= _("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : S.value.length ? (E(), g(f, { key: 5 }, [R.value ? (E(), g("p", je, A(R.value), 1)) : h("", !0), _("ul", Me, [(E(!0), g(f, null, O(S.value, (e) => (E(), g("li", {
					key: U(e),
					class: "match-modal__result"
				}, [
					_("div", Ne, [e.poster_url ? (E(), g("img", {
						key: 0,
						src: e.poster_url,
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Pe)) : (E(), g("div", $, [y(t, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					_("div", Fe, [_("p", Ie, [
						v(A(e.title) + " ", 1),
						e.year ? (E(), g("span", Le, A(e.year), 1)) : h("", !0),
						_("span", Re, A(e.type), 1)
					]), e.overview ? (E(), g("p", ze, A(e.overview), 1)) : h("", !0)]),
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
export { B as a, H as i, be as n, U as r, Be as t };

//# sourceMappingURL=MetadataMatchModal-CIp61Nci.js.map