import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as n } from "./Modal-BXA8fOR4.js";
import { a as r, f as i, l as a } from "./client-DH50wjeq.js";
import { t as ee } from "./useAuthStore-BoiyS0RI.js";
import { t as te } from "./Spinner-C1ovN881.js";
import { t as o } from "./Button-CnyfCnhY.js";
import { Fragment as s, computed as ne, createBlock as re, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, onBeforeUnmount as ie, openBlock as m, ref as h, renderList as g, toDisplayString as _, vModelText as v, watch as ae, withCtx as y, withDirectives as b, withModifiers as oe } from "vue";
//#region src/components/MetadataMatchModal.vue?vue&type=script&setup=true&lang.ts
var se = { class: "match-modal" }, x = {
	key: 0,
	class: "match-modal__subject"
}, ce = {
	key: 0,
	class: "numeric"
}, le = { class: "match-modal__field match-modal__field--query" }, ue = { class: "match-modal__field match-modal__field--year" }, de = {
	key: 1,
	class: "match-modal__source"
}, fe = { class: "match-modal__source-body" }, pe = {
	key: 0,
	class: "match-modal__source-filename"
}, me = ["title"], he = ["innerHTML"], ge = {
	key: 2,
	class: "match-modal__source-tags"
}, _e = {
	key: 2,
	class: "match-modal__state",
	role: "status"
}, ve = {
	key: 3,
	class: "match-modal__state",
	role: "alert"
}, ye = { class: "match-modal__state-title" }, be = {
	key: 4,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, S = {
	key: 5,
	class: "match-modal__state",
	role: "status"
}, C = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, w = { class: "match-modal__results" }, T = { class: "match-modal__poster" }, E = ["src", "alt"], D = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, O = { class: "match-modal__result-body" }, k = { class: "match-modal__result-title" }, A = {
	key: 0,
	class: "match-modal__result-year numeric"
}, j = { class: "match-modal__result-type" }, M = {
	key: 0,
	class: "match-modal__result-overview"
}, N = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: p }) {
		let N = e, P = p, F = ee(), I = h(""), L = h(""), R = h([]), z = h(!1), B = h(!1), V = h(null), H = h(!1), U = h(null), W = h(null), G = h(null), K = h(!1), q = ne({
			get: () => N.modelValue,
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
			if (!N.item) return;
			J?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			J = e;
			let t = () => J !== e;
			z.value = !0, B.value = !0, V.value = null, H.value = !1, W.value = null;
			try {
				let n = await F.client.matchSearch(N.item.id, {
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
			let e = N.item?.name ?? "";
			K.value = I.value !== e;
		}
		async function Te(e) {
			if (!(!N.item || U.value)) {
				U.value = Y(e), W.value = null;
				try {
					P("applied", (await F.client.matchApply(N.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					})).item), q.value = !1;
				} catch (e) {
					r(e) ? H.value = !0 : e instanceof a && e.status === 422 ? W.value = "No match details were found for that result. Try another." : W.value = i(e, "Could not apply that match. Please try again.");
				} finally {
					U.value = null;
				}
			}
		}
		return ae(() => N.modelValue, (e) => {
			e && N.item ? (Z(), I.value = N.item.name ?? "", L.value = N.item.year == null ? "" : String(N.item.year), Q()) : e || (X(), Z());
		}, { immediate: !0 }), ie(X), (r, i) => (m(), re(n, {
			modelValue: q.value,
			"onUpdate:modelValue": i[2] ||= (e) => q.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: y(() => [u("div", se, [
				e.item ? (m(), l("p", x, [
					i[3] ||= d(" Find the right TMDB entry for ", -1),
					u("strong", null, _(e.item.name), 1),
					e.item.year ? (m(), l("span", ce, "(" + _(e.item.year) + ")", 1)) : c("", !0),
					i[4] ||= d(". ", -1)
				])) : c("", !0),
				u("form", {
					class: "match-modal__form",
					onSubmit: oe($, ["prevent"])
				}, [
					u("div", le, [i[5] ||= u("label", {
						class: "match-modal__label",
						for: "match-query"
					}, "Search", -1), b(u("input", {
						id: "match-query",
						"onUpdate:modelValue": i[0] ||= (e) => I.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off",
						onInput: we
					}, null, 544), [[v, I.value]])]),
					u("div", ue, [i[6] ||= u("label", {
						class: "match-modal__label",
						for: "match-year"
					}, "Year", -1), b(u("input", {
						id: "match-year",
						"onUpdate:modelValue": i[1] ||= (e) => L.value = e,
						type: "text",
						inputmode: "numeric",
						class: "match-modal__input numeric",
						placeholder: "Any",
						autocomplete: "off"
					}, null, 512), [[v, L.value]])]),
					f(o, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: z.value
					}, {
						default: y(() => [...i[7] ||= [d("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				G.value && (G.value.original_filename || G.value.path || G.value.tags && Object.keys(G.value.tags).length) ? (m(), l("details", de, [i[10] ||= u("summary", { class: "match-modal__source-summary" }, "Source info", -1), u("div", fe, [
					G.value.original_filename ? (m(), l("p", pe, [i[8] ||= u("span", { class: "match-modal__source-label" }, "File:", -1), u("code", null, _(G.value.original_filename), 1)])) : c("", !0),
					G.value.path ? (m(), l("p", {
						key: 1,
						class: "match-modal__source-path",
						title: G.value.path
					}, [i[9] ||= u("span", { class: "match-modal__source-label" }, "Path:", -1), u("span", { innerHTML: Ce(G.value.path) }, null, 8, he)], 8, me)) : c("", !0),
					G.value.tags && Object.keys(G.value.tags).length ? (m(), l("dl", ge, [(m(!0), l(s, null, g(G.value.tags, (e, t) => (m(), l(s, { key: String(t) }, [u("dt", null, _(t), 1), u("dd", null, _(e), 1)], 64))), 128))])) : c("", !0)
				])])) : c("", !0),
				H.value ? (m(), l("div", _e, [
					f(t, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					i[11] ||= u("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					i[12] ||= u("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : V.value ? (m(), l("div", ve, [
					f(t, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					u("p", ye, _(V.value), 1),
					f(o, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: y(() => [...i[13] ||= [d("Try again", -1)]]),
						_: 1
					})
				])) : z.value ? (m(), l("div", be, [f(te, { label: "Searching TMDB" })])) : B.value && R.value.length === 0 ? (m(), l("div", S, [
					f(t, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					i[14] ||= u("p", { class: "match-modal__state-title" }, "No results found", -1),
					i[15] ||= u("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : R.value.length ? (m(), l(s, { key: 6 }, [W.value ? (m(), l("p", C, _(W.value), 1)) : c("", !0), u("ul", w, [(m(!0), l(s, null, g(R.value, (e) => (m(), l("li", {
					key: Y(e),
					class: "match-modal__result"
				}, [
					u("div", T, [e.poster_url ? (m(), l("img", {
						key: 0,
						src: e.poster_url,
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, E)) : (m(), l("div", D, [f(t, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					u("div", O, [u("p", k, [
						d(_(e.title) + " ", 1),
						e.year ? (m(), l("span", A, _(e.year), 1)) : c("", !0),
						u("span", j, _(e.type), 1)
					]), e.overview ? (m(), l("p", M, _(e.overview), 1)) : c("", !0)]),
					f(o, {
						variant: "solid",
						size: "sm",
						loading: U.value === Y(e),
						disabled: U.value !== null && U.value !== Y(e),
						onClick: (t) => Te(e)
					}, {
						default: y(() => [...i[16] ||= [d(" Use this ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])
				]))), 128))])], 64)) : c("", !0)
			])]),
			_: 1
		}, 8, ["modelValue"]));
	}
}), [["__scopeId", "data-v-983a8107"]]);
//#endregion
export { N as t };

//# sourceMappingURL=MetadataMatchModal-BnxvreaL.js.map