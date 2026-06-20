import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useMessages-Dwm0lQlG.js";
import { a as r, s as i, t as a, u as o } from "./Button-9cUUJmnN.js";
import { t as s } from "./useAuthStore-BNt_Vq18.js";
import { i as c } from "./usePlayerStore-CCov4Tvr.js";
import { t as l } from "./Modal-I4tEFhoH.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, normalizeClass as b, normalizeStyle as x, onBeforeUnmount as S, onMounted as C, openBlock as w, ref as T, renderList as E, renderSlot as D, toDisplayString as O, unref as k, vModelText as A, watch as j, withCtx as M, withDirectives as N, withModifiers as ee } from "vue";
import { routerKey as P } from "vue-router";
//#region src/components/ui/Spinner.vue?vue&type=script&setup=true&lang.ts
var F = ["aria-label"], I = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let r = e, { t: i } = n(), a = d(() => r.size === void 0 ? void 0 : typeof r.size == "number" ? `${r.size}px` : r.size);
		return (n, r) => (w(), m("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? k(i)("common.loading"),
			style: x(a.value ? { fontSize: a.value } : void 0)
		}, [_(t, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, F));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]);
//#endregion
//#region src/composables/usePrefetch.ts
function L() {
	let e = y(P, null), t = /* @__PURE__ */ new WeakSet();
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
var R = "(max-width: 600px) 45vw, 200px";
function z(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function B(e) {
	return Number(e.toFixed(3)).toString();
}
function V(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${B(e.density)}x` : t;
}
function H(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = V(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function U(e, t) {
	let n = H(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : z(n) ? {
		srcset: n,
		sizes: R
	} : { srcset: n };
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var W = { class: "media-card__poster" }, G = ["href", "aria-label"], K = { class: "visually-hidden" }, q = [
	"src",
	"srcset",
	"sizes",
	"alt"
], te = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, J = { class: "media-card__badges" }, Y = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, X = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, Z = ["aria-valuenow", "aria-label"], Q = { class: "media-card__overlay" }, ne = { class: "media-card__title" }, re = { class: "media-card__meta" }, ie = {
	key: 0,
	class: "numeric"
}, ae = {
	key: 1,
	class: "media-card__dot"
}, oe = {
	key: 2,
	class: "media-card__cert"
}, se = {
	key: 3,
	class: "media-card__dot"
}, ce = {
	key: 4,
	class: "numeric"
}, le = {
	key: 0,
	class: "media-card__genres"
}, ue = { class: "media-card__actions" }, de = { class: "media-card__caption" }, fe = ["title"], pe = { class: "media-card__caption-sub numeric" }, me = /*#__PURE__*/ e(/* @__PURE__ */ v({
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
		let r = e, i = n, a = c(), o = d(() => r.to ?? `/app/media/${r.item.id}`), { prefetch: s } = L();
		function l() {
			s(o.value);
		}
		let f = T(!1), v = T(null);
		function y() {
			f.value = !0;
		}
		C(() => {
			v.value?.complete && (f.value = !0);
		});
		let S = d(() => U(r.posterSrcset ?? r.item.poster_srcset, r.posterSizes)), k = d(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), A = d(() => {
			let e = a.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), j = d(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (w(), m("article", {
			class: "media-card",
			onPointerenter: l,
			onFocusin: l
		}, [h("div", W, [
			h("a", {
				href: o.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [h("span", K, O(e.item.name), 1)], 8, G),
			e.item.poster_url ? (w(), m("img", {
				key: 0,
				ref_key: "imgEl",
				ref: v,
				class: b(["media-card__img", { "is-loaded": f.value }]),
				src: e.item.poster_url,
				srcset: S.value.srcset,
				sizes: S.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: y
			}, null, 42, q)) : (w(), m("div", te, [_(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			h("div", J, [
				k.value ? (w(), m("span", Y, "New")) : p("", !0),
				D(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (w(), m("span", X, O(e.quality), 1)) : p("", !0)
			]),
			A.value > 0 ? (w(), m("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(A.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [h("i", { style: x({ width: `${A.value * 100}%` }) }, null, 4)], 8, Z)) : p("", !0),
			h("div", Q, [
				h("h3", ne, O(e.item.name), 1),
				h("div", re, [
					e.item.year ? (w(), m("span", ie, O(e.item.year), 1)) : p("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (w(), m("span", ae)) : p("", !0),
					e.item.rating ? (w(), m("span", oe, O(e.item.rating), 1)) : p("", !0),
					e.item.rating && e.item.runtime ? (w(), m("span", se)) : p("", !0),
					e.item.runtime ? (w(), m("span", ce, O(e.item.runtime) + "m", 1)) : p("", !0)
				]),
				j.value.length ? (w(), m("div", le, [(w(!0), m(u, null, E(j.value, (e) => (w(), m("span", { key: e }, O(e), 1))), 128))])) : p("", !0),
				h("div", ue, [
					h("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= (t) => i("play", e.item)
					}, [_(t, { name: "play" })]),
					h("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: r[1] ||= (t) => i("watchlist", e.item)
					}, [_(t, { name: "bookmark-plus" })]),
					h("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= (t) => i("info", e.item)
					}, [_(t, { name: "info" })]),
					e.canMatch ? (w(), m("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[3] ||= (t) => i("match", e.item)
					}, [_(t, { name: "search" })])) : p("", !0),
					D(n.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), h("div", de, [h("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, O(e.item.name), 9, fe), h("div", pe, [
			e.item.year ? (w(), m(u, { key: 0 }, [g(O(e.item.year), 1)], 64)) : p("", !0),
			e.item.year && e.item.runtime ? (w(), m(u, { key: 1 }, [g(" · ")], 64)) : p("", !0),
			e.item.runtime ? (w(), m(u, { key: 2 }, [g(O(e.item.runtime) + "m", 1)], 64)) : p("", !0)
		])])], 32));
	}
}), [["__scopeId", "data-v-a9fbd347"]]), he = { class: "match-modal" }, ge = {
	key: 0,
	class: "match-modal__subject"
}, _e = {
	key: 0,
	class: "numeric"
}, ve = { class: "match-modal__field match-modal__field--query" }, ye = { class: "match-modal__field match-modal__field--year" }, be = {
	key: 1,
	class: "match-modal__state",
	role: "status"
}, xe = {
	key: 2,
	class: "match-modal__state",
	role: "alert"
}, Se = { class: "match-modal__state-title" }, Ce = {
	key: 3,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, we = {
	key: 4,
	class: "match-modal__state",
	role: "status"
}, $ = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, Te = { class: "match-modal__results" }, Ee = { class: "match-modal__poster" }, De = ["src", "alt"], Oe = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, ke = { class: "match-modal__result-body" }, Ae = { class: "match-modal__result-title" }, je = {
	key: 0,
	class: "match-modal__result-year numeric"
}, Me = { class: "match-modal__result-type" }, Ne = {
	key: 0,
	class: "match-modal__result-overview"
}, Pe = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: n }) {
		let c = e, v = n, y = s(), b = T(""), x = T(""), C = T([]), D = T(!1), k = T(!1), P = T(null), F = T(!1), L = T(null), R = T(null), z = d({
			get: () => c.modelValue,
			set: (e) => v("update:modelValue", e)
		}), B = null;
		function V(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function H(e) {
			return `${e.type}:${e.tmdb_id}`;
		}
		function U() {
			B?.abort(), B = null;
		}
		function W() {
			C.value = [], D.value = !1, k.value = !1, P.value = null, F.value = !1, L.value = null, R.value = null;
		}
		async function G() {
			if (!c.item) return;
			B?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			B = e;
			let t = () => B !== e;
			D.value = !0, k.value = !0, P.value = null, F.value = !1, R.value = null;
			try {
				let n = await y.client.matchSearch(c.item.id, {
					query: b.value.trim() || void 0,
					year: x.value.trim() || void 0
				}, e?.signal);
				if (t()) return;
				C.value = n.results;
			} catch (e) {
				if (t() || V(e)) return;
				C.value = [], r(e) ? F.value = !0 : P.value = o(e, "Search failed. Please try again.");
			} finally {
				t() || (D.value = !1);
			}
		}
		function K() {
			G();
		}
		async function q(e) {
			if (!(!c.item || L.value)) {
				L.value = H(e), R.value = null;
				try {
					v("applied", (await y.client.matchApply(c.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					})).item), z.value = !1;
				} catch (e) {
					r(e) ? F.value = !0 : e instanceof i && e.status === 422 ? R.value = "No match details were found for that result. Try another." : R.value = o(e, "Could not apply that match. Please try again.");
				} finally {
					L.value = null;
				}
			}
		}
		return j(() => c.modelValue, (e) => {
			e && c.item ? (W(), b.value = c.item.name ?? "", x.value = c.item.year == null ? "" : String(c.item.year), G()) : e || (U(), W());
		}, { immediate: !0 }), S(U), (n, r) => (w(), f(l, {
			modelValue: z.value,
			"onUpdate:modelValue": r[2] ||= (e) => z.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: M(() => [h("div", he, [
				e.item ? (w(), m("p", ge, [
					r[3] ||= g(" Find the right TMDB entry for ", -1),
					h("strong", null, O(e.item.name), 1),
					e.item.year ? (w(), m("span", _e, "(" + O(e.item.year) + ")", 1)) : p("", !0),
					r[4] ||= g(". ", -1)
				])) : p("", !0),
				h("form", {
					class: "match-modal__form",
					onSubmit: ee(K, ["prevent"])
				}, [
					h("div", ve, [r[5] ||= h("label", {
						class: "match-modal__label",
						for: "match-query"
					}, "Search", -1), N(h("input", {
						id: "match-query",
						"onUpdate:modelValue": r[0] ||= (e) => b.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off"
					}, null, 512), [[A, b.value]])]),
					h("div", ye, [r[6] ||= h("label", {
						class: "match-modal__label",
						for: "match-year"
					}, "Year", -1), N(h("input", {
						id: "match-year",
						"onUpdate:modelValue": r[1] ||= (e) => x.value = e,
						type: "text",
						inputmode: "numeric",
						class: "match-modal__input numeric",
						placeholder: "Any",
						autocomplete: "off"
					}, null, 512), [[A, x.value]])]),
					_(a, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: D.value
					}, {
						default: M(() => [...r[7] ||= [g("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				F.value ? (w(), m("div", be, [
					_(t, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[8] ||= h("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[9] ||= h("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : P.value ? (w(), m("div", xe, [
					_(t, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					h("p", Se, O(P.value), 1),
					_(a, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: K
					}, {
						default: M(() => [...r[10] ||= [g("Try again", -1)]]),
						_: 1
					})
				])) : D.value ? (w(), m("div", Ce, [_(I, { label: "Searching TMDB" })])) : k.value && C.value.length === 0 ? (w(), m("div", we, [
					_(t, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[11] ||= h("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[12] ||= h("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : C.value.length ? (w(), m(u, { key: 5 }, [R.value ? (w(), m("p", $, O(R.value), 1)) : p("", !0), h("ul", Te, [(w(!0), m(u, null, E(C.value, (e) => (w(), m("li", {
					key: H(e),
					class: "match-modal__result"
				}, [
					h("div", Ee, [e.poster_url ? (w(), m("img", {
						key: 0,
						src: e.poster_url,
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, De)) : (w(), m("div", Oe, [_(t, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					h("div", ke, [h("p", Ae, [
						g(O(e.title) + " ", 1),
						e.year ? (w(), m("span", je, O(e.year), 1)) : p("", !0),
						h("span", Me, O(e.type), 1)
					]), e.overview ? (w(), m("p", Ne, O(e.overview), 1)) : p("", !0)]),
					_(a, {
						variant: "solid",
						size: "sm",
						loading: L.value === H(e),
						disabled: L.value !== null && L.value !== H(e),
						onClick: (t) => q(e)
					}, {
						default: M(() => [...r[13] ||= [g(" Use this ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])
				]))), 128))])], 64)) : p("", !0)
			])]),
			_: 1
		}, 8, ["modelValue"]));
	}
}), [["__scopeId", "data-v-a72aa927"]]);
//#endregion
export { I as i, me as n, L as r, Pe as t };

//# sourceMappingURL=MetadataMatchModal-OhFsKc_u.js.map