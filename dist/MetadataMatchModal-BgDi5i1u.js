import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-X5skTbAE.js";
import { t as ee } from "./Modal-BtA0owzl.js";
import { a as r, f as i, l as te } from "./client-D1nDQ0cP.js";
import { t as ne } from "./useAuthStore-C_Rnq3Bo.js";
import { t as re } from "./Spinner-DjAfI4qB.js";
import { t as a } from "./Button-DGsvHynO.js";
import { Fragment as o, computed as ie, createBlock as ae, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, onBeforeUnmount as oe, openBlock as p, ref as m, renderList as h, toDisplayString as g, vModelText as _, watch as se, withCtx as v, withDirectives as y, withModifiers as ce } from "vue";
//#region src/components/MetadataMatchModal.vue?vue&type=script&setup=true&lang.ts
var le = { class: "match-modal" }, ue = {
	key: 0,
	class: "match-modal__subject"
}, de = {
	key: 0,
	class: "numeric"
}, fe = { class: "match-modal__field match-modal__field--query" }, b = { class: "match-modal__field match-modal__field--year" }, pe = {
	key: 1,
	class: "match-modal__source"
}, me = { class: "match-modal__source-body" }, he = {
	key: 0,
	class: "match-modal__source-filename"
}, ge = ["title"], _e = ["innerHTML"], ve = {
	key: 2,
	class: "match-modal__source-tags"
}, ye = {
	key: 2,
	class: "match-modal__state",
	role: "status"
}, be = {
	key: 3,
	class: "match-modal__state",
	role: "alert"
}, x = { class: "match-modal__state-title" }, S = {
	key: 4,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, C = {
	key: 5,
	class: "match-modal__state",
	role: "status"
}, w = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, T = { class: "match-modal__results" }, E = { class: "match-modal__poster" }, D = ["src", "alt"], O = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, k = { class: "match-modal__result-body" }, A = { class: "match-modal__result-title" }, j = {
	key: 0,
	class: "match-modal__result-year numeric"
}, M = { class: "match-modal__result-type" }, N = {
	key: 0,
	class: "match-modal__result-overview"
}, P = /*@__PURE__*/ f({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: t }) {
		let f = e, P = t, F = ne(), I = m(""), L = m(""), R = m([]), z = m(!1), B = m(!1), V = m(null), H = m(!1), U = m(null), W = m(null), G = m(null), K = m(!1), q = ie({
			get: () => f.modelValue,
			set: (e) => P("update:modelValue", e)
		}), J = null;
		function xe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function Se(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
		}
		function Ce(e) {
			return e.split(/[/\\]/).map((e) => Se(e)).join(" › ");
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
			if (!f.item) return;
			J?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			J = e;
			let t = () => J !== e;
			z.value = !0, B.value = !0, V.value = null, H.value = !1, W.value = null;
			try {
				let n = await F.client.matchSearch(f.item.id, {
					query: I.value.trim() || void 0,
					year: L.value.trim() || void 0
				}, e?.signal);
				if (t()) return;
				if (R.value = n.results, G.value = n.context ?? null, G.value?.parsed_title && !K.value) {
					let e = G.value.parsed_title;
					I.value !== e && (I.value = e);
				}
			} catch (e) {
				if (t() || xe(e)) return;
				R.value = [], r(e) ? H.value = !0 : V.value = i(e, "Search failed. Please try again.");
			} finally {
				t() || (z.value = !1);
			}
		}
		function $() {
			Q();
		}
		function we() {
			let e = f.item?.name ?? "";
			K.value = I.value !== e;
		}
		async function Te(e) {
			if (!(!f.item || U.value)) {
				U.value = Y(e), W.value = null;
				try {
					let t = await F.client.matchApply(f.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					});
					P("applied", t.item), q.value = !1;
				} catch (e) {
					r(e) ? H.value = !0 : e instanceof te && e.status === 422 ? W.value = "No match details were found for that result. Try another." : W.value = i(e, "Could not apply that match. Please try again.");
				} finally {
					U.value = null;
				}
			}
		}
		return se(() => f.modelValue, (e) => {
			e && f.item ? (Z(), I.value = f.item.name ?? "", L.value = f.item.year == null ? "" : String(f.item.year), Q()) : e || (X(), Z());
		}, { immediate: !0 }), oe(X), (t, r) => (p(), ae(ee, {
			modelValue: q.value,
			"onUpdate:modelValue": r[2] ||= (e) => q.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: v(() => [l("div", le, [
				e.item ? (p(), c("p", ue, [
					r[3] ||= u(" Find the right TMDB entry for ", -1),
					l("strong", null, g(e.item.name), 1),
					e.item.year ? (p(), c("span", de, "(" + g(e.item.year) + ")", 1)) : s("", !0),
					r[4] ||= u(". ", -1)
				])) : s("", !0),
				l("form", {
					class: "match-modal__form",
					onSubmit: ce($, ["prevent"])
				}, [
					l("div", fe, [r[5] ||= l("label", {
						class: "match-modal__label",
						for: "match-query"
					}, "Search", -1), y(l("input", {
						id: "match-query",
						"onUpdate:modelValue": r[0] ||= (e) => I.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off",
						onInput: we
					}, null, 544), [[_, I.value]])]),
					l("div", b, [r[6] ||= l("label", {
						class: "match-modal__label",
						for: "match-year"
					}, "Year", -1), y(l("input", {
						id: "match-year",
						"onUpdate:modelValue": r[1] ||= (e) => L.value = e,
						type: "text",
						inputmode: "numeric",
						class: "match-modal__input numeric",
						placeholder: "Any",
						autocomplete: "off"
					}, null, 512), [[_, L.value]])]),
					d(a, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: z.value
					}, {
						default: v(() => [...r[7] ||= [u("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				G.value && (G.value.original_filename || G.value.path || G.value.tags && Object.keys(G.value.tags).length) ? (p(), c("details", pe, [r[10] ||= l("summary", { class: "match-modal__source-summary" }, "Source info", -1), l("div", me, [
					G.value.original_filename ? (p(), c("p", he, [r[8] ||= l("span", { class: "match-modal__source-label" }, "File:", -1), l("code", null, g(G.value.original_filename), 1)])) : s("", !0),
					G.value.path ? (p(), c("p", {
						key: 1,
						class: "match-modal__source-path",
						title: G.value.path
					}, [r[9] ||= l("span", { class: "match-modal__source-label" }, "Path:", -1), l("span", { innerHTML: Ce(G.value.path) }, null, 8, _e)], 8, ge)) : s("", !0),
					G.value.tags && Object.keys(G.value.tags).length ? (p(), c("dl", ve, [(p(!0), c(o, null, h(G.value.tags, (e, t) => (p(), c(o, { key: String(t) }, [l("dt", null, g(t), 1), l("dd", null, g(e), 1)], 64))), 128))])) : s("", !0)
				])])) : s("", !0),
				H.value ? (p(), c("div", ye, [
					d(n, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[11] ||= l("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[12] ||= l("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : V.value ? (p(), c("div", be, [
					d(n, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					l("p", x, g(V.value), 1),
					d(a, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: v(() => [...r[13] ||= [u("Try again", -1)]]),
						_: 1
					})
				])) : z.value ? (p(), c("div", S, [d(re, { label: "Searching TMDB" })])) : B.value && R.value.length === 0 ? (p(), c("div", C, [
					d(n, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[14] ||= l("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[15] ||= l("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : R.value.length ? (p(), c(o, { key: 6 }, [W.value ? (p(), c("p", w, g(W.value), 1)) : s("", !0), l("ul", T, [(p(!0), c(o, null, h(R.value, (e) => (p(), c("li", {
					key: Y(e),
					class: "match-modal__result"
				}, [
					l("div", E, [e.poster_url ? (p(), c("img", {
						key: 0,
						src: e.poster_url,
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, D)) : (p(), c("div", O, [d(n, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					l("div", k, [l("p", A, [
						u(g(e.title) + " ", 1),
						e.year ? (p(), c("span", j, g(e.year), 1)) : s("", !0),
						l("span", M, g(e.type), 1)
					]), e.overview ? (p(), c("p", N, g(e.overview), 1)) : s("", !0)]),
					d(a, {
						variant: "solid",
						size: "sm",
						loading: U.value === Y(e),
						disabled: U.value !== null && U.value !== Y(e),
						onClick: (t) => Te(e)
					}, {
						default: v(() => [...r[16] ||= [u(" Use this ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])
				]))), 128))])], 64)) : s("", !0)
			])]),
			_: 1
		}, 8, ["modelValue"]));
	}
}), F = /* @__PURE__ */ e({ default: () => I }), I = /*#__PURE__*/ t(P, [["__scopeId", "data-v-983a8107"]]);
//#endregion
export { F as n, I as t };

//# sourceMappingURL=MetadataMatchModal-BgDi5i1u.js.map