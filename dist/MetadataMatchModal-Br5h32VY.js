import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useMessages-CLrAkqxK.js";
import { a as r, f as i, l as a } from "./client-cUL8r-1I.js";
import { t as o } from "./useAuthStore-CJrazXSP.js";
import { n as s, o as c, t as l } from "./useUserItemDataStore-q9SuHhBR.js";
import { t as u } from "./Button-k7aQagzg.js";
import { t as d } from "./Modal-CWarEzTU.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, normalizeClass as S, normalizeStyle as C, onBeforeUnmount as w, onMounted as T, openBlock as E, ref as D, renderList as O, renderSlot as k, toDisplayString as A, unref as j, vModelText as M, watch as N, withCtx as P, withDirectives as F, withModifiers as I } from "vue";
import { routerKey as L } from "vue-router";
//#region src/components/ui/Spinner.vue?vue&type=script&setup=true&lang.ts
var R = ["aria-label"], z = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		})], 12, R));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]);
//#endregion
//#region src/composables/usePrefetch.ts
function B() {
	let e = x(L, null), t = /* @__PURE__ */ new WeakSet();
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
var V = "(max-width: 600px) 45vw, 200px";
function H(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function U(e) {
	return Number(e.toFixed(3)).toString();
}
function W(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${U(e.density)}x` : t;
}
function G(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = W(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function K(e, t) {
	let n = G(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : H(n) ? {
		srcset: n,
		sizes: V
	} : { srcset: n };
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var q = { class: "media-card__poster" }, J = ["href", "aria-label"], ee = { class: "visually-hidden" }, te = [
	"src",
	"srcset",
	"sizes",
	"alt"
], Y = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, X = { class: "media-card__badges" }, Z = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Q = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, ne = ["aria-valuenow", "aria-label"], re = { class: "media-card__overlay" }, ie = { class: "media-card__title" }, ae = { class: "media-card__meta" }, oe = {
	key: 0,
	class: "numeric"
}, se = {
	key: 1,
	class: "media-card__dot"
}, ce = {
	key: 2,
	class: "media-card__cert"
}, le = {
	key: 3,
	class: "media-card__dot"
}, ue = {
	key: 4,
	class: "numeric"
}, de = {
	key: 0,
	class: "media-card__genres"
}, fe = { class: "media-card__actions" }, pe = ["aria-label", "aria-pressed"], me = { class: "media-card__caption" }, he = ["title"], ge = { class: "media-card__caption-sub numeric" }, _e = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		let r = e, i = n, a = c(), o = l(), u = x("phlixConfig", null), d = p(() => o.isFavorite(r.item.id)), m = p(() => o.likeLevel(r.item.id));
		function b() {
			o.cycleLove(r.item.id, u?.apiBase ?? "");
		}
		function w() {
			o.toggleFavorite(r.item.id, u?.apiBase ?? ""), i("watchlist", r.item);
		}
		let j = p(() => r.to ?? `/app/media/${r.item.id}`), { prefetch: M } = B();
		function N() {
			M(j.value);
		}
		let P = D(!1), F = D(null);
		function L() {
			P.value = !0;
		}
		T(() => {
			F.value?.complete && (P.value = !0);
		});
		let R = p(() => K(r.posterSrcset ?? r.item.poster_srcset, r.posterSizes)), z = p(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), V = p(() => {
			let e = a.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), H = p(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (E(), g("article", {
			class: "media-card",
			onPointerenter: N,
			onFocusin: N
		}, [_("div", q, [
			_("a", {
				href: j.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [_("span", ee, A(e.item.name), 1)], 8, J),
			e.item.poster_url ? (E(), g("img", {
				key: 0,
				ref_key: "imgEl",
				ref: F,
				class: S(["media-card__img", { "is-loaded": P.value }]),
				src: e.item.poster_url,
				srcset: R.value.srcset,
				sizes: R.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: L
			}, null, 42, te)) : (E(), g("div", Y, [y(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			_("div", X, [
				z.value ? (E(), g("span", Z, "New")) : h("", !0),
				k(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (E(), g("span", Q, A(e.quality), 1)) : h("", !0)
			]),
			V.value > 0 ? (E(), g("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(V.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [_("i", { style: C({ width: `${V.value * 100}%` }) }, null, 4)], 8, ne)) : h("", !0),
			_("div", re, [
				_("h3", ie, A(e.item.name), 1),
				_("div", ae, [
					e.item.year ? (E(), g("span", oe, A(e.item.year), 1)) : h("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (E(), g("span", se)) : h("", !0),
					e.item.rating ? (E(), g("span", ce, A(e.item.rating), 1)) : h("", !0),
					e.item.rating && e.item.runtime ? (E(), g("span", le)) : h("", !0),
					e.item.runtime ? (E(), g("span", ue, A(e.item.runtime) + "m", 1)) : h("", !0)
				]),
				H.value.length ? (E(), g("div", de, [(E(!0), g(f, null, O(H.value, (e) => (E(), g("span", { key: e }, A(e), 1))), 128))])) : h("", !0),
				_("div", fe, [
					_("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= I((t) => i("play", e.item), ["stop", "prevent"])
					}, [y(t, { name: "play" })]),
					y(s, {
						level: m.value,
						onCycle: b,
						onClick: r[1] ||= I(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					_("button", {
						type: "button",
						class: S(["media-card__iconbtn", { "is-active": d.value }]),
						"aria-label": d.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": d.value ? "true" : "false",
						onClick: I(w, ["stop", "prevent"])
					}, [y(t, { name: d.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, pe),
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
		]), _("div", me, [_("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, A(e.item.name), 9, he), _("div", ge, [
			e.item.year ? (E(), g(f, { key: 0 }, [v(A(e.item.year), 1)], 64)) : h("", !0),
			e.item.year && e.item.runtime ? (E(), g(f, { key: 1 }, [v(" · ")], 64)) : h("", !0),
			e.item.runtime ? (E(), g(f, { key: 2 }, [v(A(e.item.runtime) + "m", 1)], 64)) : h("", !0)
		])])], 32));
	}
}), [["__scopeId", "data-v-66d33461"]]), ve = { class: "match-modal" }, ye = {
	key: 0,
	class: "match-modal__subject"
}, be = {
	key: 0,
	class: "numeric"
}, xe = { class: "match-modal__field match-modal__field--query" }, Se = { class: "match-modal__field match-modal__field--year" }, Ce = {
	key: 1,
	class: "match-modal__state",
	role: "status"
}, we = {
	key: 2,
	class: "match-modal__state",
	role: "alert"
}, Te = { class: "match-modal__state-title" }, Ee = {
	key: 3,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, De = {
	key: 4,
	class: "match-modal__state",
	role: "status"
}, $ = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, Oe = { class: "match-modal__results" }, ke = { class: "match-modal__poster" }, Ae = ["src", "alt"], je = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, Me = { class: "match-modal__result-body" }, Ne = { class: "match-modal__result-title" }, Pe = {
	key: 0,
	class: "match-modal__result-year numeric"
}, Fe = { class: "match-modal__result-type" }, Ie = {
	key: 0,
	class: "match-modal__result-overview"
}, Le = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: n }) {
		let s = e, c = n, l = o(), b = D(""), x = D(""), S = D([]), C = D(!1), T = D(!1), k = D(null), j = D(!1), L = D(null), R = D(null), B = p({
			get: () => s.modelValue,
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
			if (!s.item) return;
			V?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			V = e;
			let t = () => V !== e;
			C.value = !0, T.value = !0, k.value = null, j.value = !1, R.value = null;
			try {
				let n = await l.client.matchSearch(s.item.id, {
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
			if (!(!s.item || L.value)) {
				L.value = U(e), R.value = null;
				try {
					c("applied", (await l.client.matchApply(s.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					})).item), B.value = !1;
				} catch (e) {
					r(e) ? j.value = !0 : e instanceof a && e.status === 422 ? R.value = "No match details were found for that result. Try another." : R.value = i(e, "Could not apply that match. Please try again.");
				} finally {
					L.value = null;
				}
			}
		}
		return N(() => s.modelValue, (e) => {
			e && s.item ? (G(), b.value = s.item.name ?? "", x.value = s.item.year == null ? "" : String(s.item.year), K()) : e || (W(), G());
		}, { immediate: !0 }), w(W), (n, r) => (E(), m(d, {
			modelValue: B.value,
			"onUpdate:modelValue": r[2] ||= (e) => B.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: P(() => [_("div", ve, [
				e.item ? (E(), g("p", ye, [
					r[3] ||= v(" Find the right TMDB entry for ", -1),
					_("strong", null, A(e.item.name), 1),
					e.item.year ? (E(), g("span", be, "(" + A(e.item.year) + ")", 1)) : h("", !0),
					r[4] ||= v(". ", -1)
				])) : h("", !0),
				_("form", {
					class: "match-modal__form",
					onSubmit: I(q, ["prevent"])
				}, [
					_("div", xe, [r[5] ||= _("label", {
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
					_("div", Se, [r[6] ||= _("label", {
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
					y(u, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: C.value
					}, {
						default: P(() => [...r[7] ||= [v("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				j.value ? (E(), g("div", Ce, [
					y(t, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[8] ||= _("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[9] ||= _("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : k.value ? (E(), g("div", we, [
					y(t, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					_("p", Te, A(k.value), 1),
					y(u, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: P(() => [...r[10] ||= [v("Try again", -1)]]),
						_: 1
					})
				])) : C.value ? (E(), g("div", Ee, [y(z, { label: "Searching TMDB" })])) : T.value && S.value.length === 0 ? (E(), g("div", De, [
					y(t, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[11] ||= _("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[12] ||= _("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : S.value.length ? (E(), g(f, { key: 5 }, [R.value ? (E(), g("p", $, A(R.value), 1)) : h("", !0), _("ul", Oe, [(E(!0), g(f, null, O(S.value, (e) => (E(), g("li", {
					key: U(e),
					class: "match-modal__result"
				}, [
					_("div", ke, [e.poster_url ? (E(), g("img", {
						key: 0,
						src: e.poster_url,
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ae)) : (E(), g("div", je, [y(t, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					_("div", Me, [_("p", Ne, [
						v(A(e.title) + " ", 1),
						e.year ? (E(), g("span", Pe, A(e.year), 1)) : h("", !0),
						_("span", Fe, A(e.type), 1)
					]), e.overview ? (E(), g("p", Ie, A(e.overview), 1)) : h("", !0)]),
					y(u, {
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
export { z as i, _e as n, B as r, Le as t };

//# sourceMappingURL=MetadataMatchModal-Br5h32VY.js.map