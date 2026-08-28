import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t, t as n } from "./Icon-CkTBN_k5.js";
import { o as r, p as i, u as a } from "./client-DA-5QZXw.js";
import { t as ee } from "./useAuthStore-vm6oniX7.js";
import { t as te } from "./useImageSrc-KnN1T9Ga.js";
import { t as ne } from "./Spinner-COUSlhgo.js";
import { t as o } from "./Button-Cw8Wl4QR.js";
import { t as re } from "./Modal-Cfz25d3h.js";
import { Fragment as s, computed as ie, createBlock as ae, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, onBeforeUnmount as oe, openBlock as m, ref as h, renderList as g, toDisplayString as _, unref as se, vModelText as v, watch as ce, withCtx as y, withDirectives as b, withModifiers as le } from "vue";
//#region src/components/MetadataMatchModal.vue?vue&type=script&setup=true&lang.ts
var ue = { class: "match-modal" }, de = {
	key: 0,
	class: "match-modal__subject"
}, fe = {
	key: 0,
	class: "numeric"
}, pe = { class: "match-modal__field match-modal__field--query" }, me = { class: "match-modal__field match-modal__field--year" }, he = {
	key: 1,
	class: "match-modal__source"
}, ge = { class: "match-modal__source-body" }, _e = {
	key: 0,
	class: "match-modal__source-filename"
}, ve = ["title"], ye = ["innerHTML"], be = {
	key: 2,
	class: "match-modal__source-tags"
}, xe = {
	key: 2,
	class: "match-modal__state",
	role: "status"
}, x = {
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
}, N = /*@__PURE__*/ p({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: t }) {
		let { imgSrc: p } = te(), N = e, P = t, F = ee(), I = h(""), L = h(""), R = h([]), z = h(!1), B = h(!1), V = h(null), H = h(!1), U = h(null), W = h(null), G = h(null), K = h(!1), q = ie({
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
				if (t() || we(e)) return;
				R.value = [], r(e) ? H.value = !0 : V.value = i(e, "Search failed. Please try again.");
			} finally {
				t() || (z.value = !1);
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
			if (!(!N.item || U.value)) {
				U.value = Y(e), W.value = null;
				try {
					let t = await F.client.matchApply(N.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					});
					P("applied", t.item), q.value = !1;
				} catch (e) {
					r(e) ? H.value = !0 : e instanceof a && e.status === 422 ? W.value = "No match details were found for that result. Try another." : W.value = i(e, "Could not apply that match. Please try again.");
				} finally {
					U.value = null;
				}
			}
		}
		return ce(() => N.modelValue, (e) => {
			e && N.item ? (Z(), I.value = N.item.name ?? "", L.value = N.item.year == null ? "" : String(N.item.year), Q()) : e || (X(), Z());
		}, { immediate: !0 }), oe(X), (t, r) => (m(), ae(re, {
			modelValue: q.value,
			"onUpdate:modelValue": r[2] ||= (e) => q.value = e,
			title: "Match metadata",
			size: "lg"
		}, {
			default: y(() => [u("div", ue, [
				e.item ? (m(), l("p", de, [
					r[3] ||= d(" Find the right TMDB entry for ", -1),
					u("strong", null, _(e.item.name), 1),
					e.item.year ? (m(), l("span", fe, "(" + _(e.item.year) + ")", 1)) : c("", !0),
					r[4] ||= d(". ", -1)
				])) : c("", !0),
				u("form", {
					class: "match-modal__form",
					onSubmit: le($, ["prevent"])
				}, [
					u("div", pe, [r[5] ||= u("label", {
						class: "match-modal__label",
						for: "match-query"
					}, "Search", -1), b(u("input", {
						id: "match-query",
						"onUpdate:modelValue": r[0] ||= (e) => I.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off",
						onInput: De
					}, null, 544), [[v, I.value]])]),
					u("div", me, [r[6] ||= u("label", {
						class: "match-modal__label",
						for: "match-year"
					}, "Year", -1), b(u("input", {
						id: "match-year",
						"onUpdate:modelValue": r[1] ||= (e) => L.value = e,
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
						default: y(() => [...r[7] ||= [d("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				G.value && (G.value.original_filename || G.value.path || G.value.tags && Object.keys(G.value.tags).length) ? (m(), l("details", he, [r[10] ||= u("summary", { class: "match-modal__source-summary" }, "Source info", -1), u("div", ge, [
					G.value.original_filename ? (m(), l("p", _e, [r[8] ||= u("span", { class: "match-modal__source-label" }, "File:", -1), u("code", null, _(G.value.original_filename), 1)])) : c("", !0),
					G.value.path ? (m(), l("p", {
						key: 1,
						class: "match-modal__source-path",
						title: G.value.path
					}, [r[9] ||= u("span", { class: "match-modal__source-label" }, "Path:", -1), u("span", { innerHTML: Ee(G.value.path) }, null, 8, ye)], 8, ve)) : c("", !0),
					G.value.tags && Object.keys(G.value.tags).length ? (m(), l("dl", be, [(m(!0), l(s, null, g(G.value.tags, (e, t) => (m(), l(s, { key: String(t) }, [u("dt", null, _(t), 1), u("dd", null, _(e), 1)], 64))), 128))])) : c("", !0)
				])])) : c("", !0),
				H.value ? (m(), l("div", xe, [
					f(n, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[11] ||= u("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[12] ||= u("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : V.value ? (m(), l("div", x, [
					f(n, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					u("p", S, _(V.value), 1),
					f(o, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: y(() => [...r[13] ||= [d("Try again", -1)]]),
						_: 1
					})
				])) : z.value ? (m(), l("div", C, [f(ne, { label: "Searching TMDB" })])) : B.value && R.value.length === 0 ? (m(), l("div", w, [
					f(n, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[14] ||= u("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[15] ||= u("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : R.value.length ? (m(), l(s, { key: 6 }, [W.value ? (m(), l("p", T, _(W.value), 1)) : c("", !0), u("ul", E, [(m(!0), l(s, null, g(R.value, (e) => (m(), l("li", {
					key: Y(e),
					class: "match-modal__result"
				}, [
					u("div", D, [e.poster_url ? (m(), l("img", {
						key: 0,
						src: se(p)(e.poster_url),
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, O)) : (m(), l("div", k, [f(n, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					u("div", A, [u("p", j, [
						d(_(e.title) + " ", 1),
						e.year ? (m(), l("span", M, _(e.year), 1)) : c("", !0),
						u("span", Se, _(e.type), 1)
					]), e.overview ? (m(), l("p", Ce, _(e.overview), 1)) : c("", !0)]),
					f(o, {
						variant: "solid",
						size: "sm",
						loading: U.value === Y(e),
						disabled: U.value !== null && U.value !== Y(e),
						onClick: (t) => Oe(e)
					}, {
						default: y(() => [...r[16] ||= [d(" Use this ", -1)]]),
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
}), P = /* @__PURE__ */ e({ default: () => F }), F = /*#__PURE__*/ t(N, [["__scopeId", "data-v-968f9a97"]]);
//#endregion
export { P as n, F as t };

//# sourceMappingURL=MetadataMatchModal-D-SLpTGq.js.map