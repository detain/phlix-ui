import { t as e } from "./rolldown-runtime-CGnMp29N.js";
import { s as t, v as n, x as r } from "./client-57OweUrJ.js";
import { t as ee } from "./useAuthStore-D2ZmuYZO.js";
import { t as te } from "./Modal-BU4hJGBA.js";
import { t as i } from "./Button-1sKEdGjj.js";
import { n as a, t as o } from "./Icon-CIbfiPrs.js";
import { t as s } from "./Spinner-zawWdcUT.js";
import { t as ne } from "./useImageSrc-CSM61b-l.js";
import { Fragment as c, computed as re, createBlock as ie, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, onBeforeUnmount as ae, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as oe, vModelText as y, watch as se, withCtx as b, withDirectives as x, withModifiers as ce } from "vue";
// src/components/MetadataMatchModal.vue?vue&type=script&setup=true&lang.ts
var le = { class: "match-modal" }, ue = {
	key: 0,
	class: "match-modal__subject"
}, de = {
	key: 0,
	class: "numeric"
}, fe = { class: "match-modal__field match-modal__field--query" }, pe = { class: "match-modal__field match-modal__field--year" }, me = {
	key: 1,
	class: "match-modal__source"
}, he = { class: "match-modal__source-body" }, ge = {
	key: 0,
	class: "match-modal__source-filename"
}, _e = ["title"], ve = ["innerHTML"], ye = {
	key: 2,
	class: "match-modal__source-tags"
}, be = {
	key: 2,
	class: "match-modal__state",
	role: "status"
}, xe = {
	key: 3,
	class: "match-modal__state",
	role: "alert"
}, S = { class: "match-modal__state-title" }, C = {
	key: 4,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, w = {
	key: 5,
	class: "match-modal__state",
	role: "status"
}, T = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, E = { class: "match-modal__results" }, D = { class: "match-modal__poster" }, O = ["src", "alt"], k = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, A = { class: "match-modal__result-body" }, j = { class: "match-modal__result-title" }, M = {
	key: 0,
	class: "match-modal__result-year numeric"
}, Se = { class: "match-modal__result-type" }, Ce = {
	key: 0,
	class: "match-modal__result-overview"
}, N = /*@__PURE__*/ m({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: a }) {
		let { imgSrc: m } = ne(), N = e, P = a, F = ee(), I = g(""), L = g(""), R = g([]), z = g(!1), B = g(!1), V = g(null), H = g(!1), U = g(null), W = g(null), G = g(null), K = g(!1), q = re({
			get: () => N.modelValue,
			set: (e) => P("update:modelValue", e)
		}), J = null;
		function we(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function Te(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
		}
		function Ee(e) {
			return e.split(/[/\\]/).map((e) => Te(e)).join(" › ");
		}
		function Y(e) {
			return `${e.type}:${e.tmdb_id}`;
		}
		function X() {
			J?.abort(), J = null;
		}
		function Z() {
			R.value = [], z.value = !1, B.value = !1, V.value = null, H.value = !1, U.value = null, W.value = null, G.value = null, K.value = !1;
		}
		async function Q() {
			if (!N.item) return;
			J?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			J = e;
			let n = () => J !== e;
			z.value = !0, B.value = !0, V.value = null, H.value = !1, W.value = null;
			try {
				let t = await F.client.matchSearch(N.item.id, {
					query: I.value.trim() || void 0,
					year: L.value.trim() || void 0
				}, e?.signal);
				if (n()) return;
				if (R.value = t.results, G.value = t.context ?? null, G.value?.parsed_title && !K.value) {
					let e = G.value.parsed_title;
					I.value !== e && (I.value = e);
				}
			} catch (e) {
				if (n() || we(e)) return;
				R.value = [], t(e) ? H.value = !0 : V.value = r(e, "Search failed. Please try again.");
			} finally {
				n() || (z.value = !1);
			}
		}
		function $() {
			Q();
		}
		function De() {
			let e = N.item?.name ?? "";
			K.value = I.value !== e;
		}
		async function Oe(e) {
			if (N.item && !U.value) {
				U.value = Y(e), W.value = null;
				try {
					let t = await F.client.matchApply(N.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					});
					P("applied", t.item), q.value = !1;
				} catch (e) {
					t(e) ? H.value = !0 : e instanceof n && e.status === 422 ? W.value = "No match details were found for that result. Try another." : W.value = r(e, "Could not apply that match. Please try again.");
				} finally {
					U.value = null;
				}
			}
		}
		return se(() => N.modelValue, (e) => {
			e && N.item ? (Z(), I.value = N.item.name ?? "", L.value = N.item.year == null ? "" : String(N.item.year), Q()) : e || (X(), Z());
		}, { immediate: !0 }), ae(X), (t, n) => (h(), ie(te, {
			modelValue: q.value,
			"onUpdate:modelValue": n[2] ||= (e) => q.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: b(() => [d("div", le, [
				e.item ? (h(), u("p", ue, [
					n[3] ||= f(" Find the right TMDB entry for ", -1),
					d("strong", null, v(e.item.name), 1),
					e.item.year ? (h(), u("span", de, "(" + v(e.item.year) + ")", 1)) : l("", !0),
					n[4] ||= f(". ", -1)
				])) : l("", !0),
				d("form", {
					class: "match-modal__form",
					onSubmit: ce($, ["prevent"])
				}, [
					d("div", fe, [n[5] ||= d("label", {
						class: "match-modal__label",
						for: "match-query"
					}, "Search", -1), x(d("input", {
						id: "match-query",
						"onUpdate:modelValue": n[0] ||= (e) => I.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off",
						onInput: De
					}, null, 544), [[y, I.value]])]),
					d("div", pe, [n[6] ||= d("label", {
						class: "match-modal__label",
						for: "match-year"
					}, "Year", -1), x(d("input", {
						id: "match-year",
						"onUpdate:modelValue": n[1] ||= (e) => L.value = e,
						type: "text",
						inputmode: "numeric",
						class: "match-modal__input numeric",
						placeholder: "Any",
						autocomplete: "off"
					}, null, 512), [[y, L.value]])]),
					p(i, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: z.value
					}, {
						default: b(() => [...n[7] ||= [f("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				G.value && (G.value.original_filename || G.value.path || G.value.tags && Object.keys(G.value.tags).length) ? (h(), u("details", me, [n[10] ||= d("summary", { class: "match-modal__source-summary" }, "Source info", -1), d("div", he, [
					G.value.original_filename ? (h(), u("p", ge, [n[8] ||= d("span", { class: "match-modal__source-label" }, "File:", -1), d("code", null, v(G.value.original_filename), 1)])) : l("", !0),
					G.value.path ? (h(), u("p", {
						key: 1,
						class: "match-modal__source-path",
						title: G.value.path
					}, [n[9] ||= d("span", { class: "match-modal__source-label" }, "Path:", -1), d("span", { innerHTML: Ee(G.value.path) }, null, 8, ve)], 8, _e)) : l("", !0),
					G.value.tags && Object.keys(G.value.tags).length ? (h(), u("dl", ye, [(h(!0), u(c, null, _(G.value.tags, (e, t) => (h(), u(c, { key: String(t) }, [d("dt", null, v(t), 1), d("dd", null, v(e), 1)], 64))), 128))])) : l("", !0)
				])])) : l("", !0),
				H.value ? (h(), u("div", be, [
					p(o, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					n[11] ||= d("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					n[12] ||= d("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : V.value ? (h(), u("div", xe, [
					p(o, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					d("p", S, v(V.value), 1),
					p(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: b(() => [...n[13] ||= [f("Try again", -1)]]),
						_: 1
					})
				])) : z.value ? (h(), u("div", C, [p(s, { label: "Searching TMDB" })])) : B.value && R.value.length === 0 ? (h(), u("div", w, [
					p(o, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					n[14] ||= d("p", { class: "match-modal__state-title" }, "No results found", -1),
					n[15] ||= d("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : R.value.length ? (h(), u(c, { key: 6 }, [W.value ? (h(), u("p", T, v(W.value), 1)) : l("", !0), d("ul", E, [(h(!0), u(c, null, _(R.value, (e) => (h(), u("li", {
					key: Y(e),
					class: "match-modal__result"
				}, [
					d("div", D, [e.poster_url ? (h(), u("img", {
						key: 0,
						src: oe(m)(e.poster_url),
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, O)) : (h(), u("div", k, [p(o, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					d("div", A, [d("p", j, [
						f(v(e.title) + " ", 1),
						e.year ? (h(), u("span", M, v(e.year), 1)) : l("", !0),
						d("span", Se, v(e.type), 1)
					]), e.overview ? (h(), u("p", Ce, v(e.overview), 1)) : l("", !0)]),
					p(i, {
						variant: "solid",
						size: "sm",
						loading: U.value === Y(e),
						disabled: U.value !== null && U.value !== Y(e),
						onClick: (t) => Oe(e)
					}, {
						default: b(() => [...n[16] ||= [f(" Use this ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])
				]))), 128))])], 64)) : l("", !0)
			])]),
			_: 1
		}, 8, ["modelValue"]));
	}
}), P = /* @__PURE__ */ e({ default: () => F }), F = /*#__PURE__*/ a(N, [["__scopeId", "data-v-968f9a97"]]);
export { P as n, F as t };

//# sourceMappingURL=MetadataMatchModal-DUfuzbGX.js.map