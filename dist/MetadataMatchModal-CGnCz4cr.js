import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t, t as n } from "./Icon-CIwTuFLd.js";
import { g as r, o as i, y as a } from "./client-DdVqCKVh.js";
import { t as ee } from "./useAuthStore-Bi1-VYV4.js";
import { t as te } from "./useImageSrc-KnN1T9Ga.js";
import { t as ne } from "./Spinner-DFw4BJdj.js";
import { t as o } from "./Button-BuG0GvCa.js";
import { t as re } from "./Modal-eRq9Rw_4.js";
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
}, Se = {
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
}, Ce = { class: "match-modal__result-type" }, we = {
	key: 0,
	class: "match-modal__result-overview"
}, M = /*@__PURE__*/ p({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: t }) {
		let { imgSrc: p } = te(), M = e, N = t, P = ee(), F = h(""), I = h(""), L = h([]), R = h(!1), z = h(!1), B = h(null), V = h(!1), H = h(null), U = h(null), W = h(null), G = h(!1), K = ie({
			get: () => M.modelValue,
			set: (e) => N("update:modelValue", e)
		}), q = null;
		function Te(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function Ee(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
		}
		function J(e) {
			return e.split(/[/\\]/).map((e) => Ee(e)).join(" › ");
		}
		function Y(e) {
			return `${e.type}:${e.tmdb_id}`;
		}
		function X() {
			q?.abort(), q = null;
		}
		function Z() {
			L.value = [], R.value = !1, z.value = !1, B.value = null, V.value = !1, H.value = null, U.value = null, W.value = null, G.value = !1;
		}
		async function Q() {
			if (!M.item) return;
			q?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			q = e;
			let t = () => q !== e;
			R.value = !0, z.value = !0, B.value = null, V.value = !1, U.value = null;
			try {
				let n = await P.client.matchSearch(M.item.id, {
					query: F.value.trim() || void 0,
					year: I.value.trim() || void 0
				}, e?.signal);
				if (t()) return;
				if (L.value = n.results, W.value = n.context ?? null, W.value?.parsed_title && !G.value) {
					let e = W.value.parsed_title;
					F.value !== e && (F.value = e);
				}
			} catch (e) {
				if (t() || Te(e)) return;
				L.value = [], i(e) ? V.value = !0 : B.value = a(e, "Search failed. Please try again.");
			} finally {
				t() || (R.value = !1);
			}
		}
		function $() {
			Q();
		}
		function De() {
			let e = M.item?.name ?? "";
			G.value = F.value !== e;
		}
		async function Oe(e) {
			if (!(!M.item || H.value)) {
				H.value = Y(e), U.value = null;
				try {
					let t = await P.client.matchApply(M.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					});
					N("applied", t.item), K.value = !1;
				} catch (e) {
					i(e) ? V.value = !0 : e instanceof r && e.status === 422 ? U.value = "No match details were found for that result. Try another." : U.value = a(e, "Could not apply that match. Please try again.");
				} finally {
					H.value = null;
				}
			}
		}
		return ce(() => M.modelValue, (e) => {
			e && M.item ? (Z(), F.value = M.item.name ?? "", I.value = M.item.year == null ? "" : String(M.item.year), Q()) : e || (X(), Z());
		}, { immediate: !0 }), oe(X), (t, r) => (m(), ae(re, {
			modelValue: K.value,
			"onUpdate:modelValue": r[2] ||= (e) => K.value = e,
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
						"onUpdate:modelValue": r[0] ||= (e) => F.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: "Title to search for",
						autocomplete: "off",
						onInput: De
					}, null, 544), [[v, F.value]])]),
					u("div", me, [r[6] ||= u("label", {
						class: "match-modal__label",
						for: "match-year"
					}, "Year", -1), b(u("input", {
						id: "match-year",
						"onUpdate:modelValue": r[1] ||= (e) => I.value = e,
						type: "text",
						inputmode: "numeric",
						class: "match-modal__input numeric",
						placeholder: "Any",
						autocomplete: "off"
					}, null, 512), [[v, I.value]])]),
					f(o, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: R.value
					}, {
						default: y(() => [...r[7] ||= [d("Search", -1)]]),
						_: 1
					}, 8, ["loading"])
				], 32),
				W.value && (W.value.original_filename || W.value.path || W.value.tags && Object.keys(W.value.tags).length) ? (m(), l("details", he, [r[10] ||= u("summary", { class: "match-modal__source-summary" }, "Source info", -1), u("div", ge, [
					W.value.original_filename ? (m(), l("p", _e, [r[8] ||= u("span", { class: "match-modal__source-label" }, "File:", -1), u("code", null, _(W.value.original_filename), 1)])) : c("", !0),
					W.value.path ? (m(), l("p", {
						key: 1,
						class: "match-modal__source-path",
						title: W.value.path
					}, [r[9] ||= u("span", { class: "match-modal__source-label" }, "Path:", -1), u("span", { innerHTML: J(W.value.path) }, null, 8, ye)], 8, ve)) : c("", !0),
					W.value.tags && Object.keys(W.value.tags).length ? (m(), l("dl", be, [(m(!0), l(s, null, g(W.value.tags, (e, t) => (m(), l(s, { key: String(t) }, [u("dt", null, _(t), 1), u("dd", null, _(e), 1)], 64))), 128))])) : c("", !0)
				])])) : c("", !0),
				V.value ? (m(), l("div", xe, [
					f(n, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					r[11] ||= u("p", { class: "match-modal__state-title" }, "TMDB is not configured", -1),
					r[12] ||= u("p", { class: "match-modal__state-hint" }, " Configure a TMDB API key in admin settings to search for metadata matches. ", -1)
				])) : B.value ? (m(), l("div", Se, [
					f(n, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					u("p", x, _(B.value), 1),
					f(o, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: y(() => [...r[13] ||= [d("Try again", -1)]]),
						_: 1
					})
				])) : R.value ? (m(), l("div", S, [f(ne, { label: "Searching TMDB" })])) : z.value && L.value.length === 0 ? (m(), l("div", C, [
					f(n, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					r[14] ||= u("p", { class: "match-modal__state-title" }, "No results found", -1),
					r[15] ||= u("p", { class: "match-modal__state-hint" }, "Try a different title or clear the year.", -1)
				])) : L.value.length ? (m(), l(s, { key: 6 }, [U.value ? (m(), l("p", w, _(U.value), 1)) : c("", !0), u("ul", T, [(m(!0), l(s, null, g(L.value, (e) => (m(), l("li", {
					key: Y(e),
					class: "match-modal__result"
				}, [
					u("div", E, [e.poster_url ? (m(), l("img", {
						key: 0,
						src: se(p)(e.poster_url),
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, D)) : (m(), l("div", O, [f(n, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					u("div", k, [u("p", A, [
						d(_(e.title) + " ", 1),
						e.year ? (m(), l("span", j, _(e.year), 1)) : c("", !0),
						u("span", Ce, _(e.type), 1)
					]), e.overview ? (m(), l("p", we, _(e.overview), 1)) : c("", !0)]),
					f(o, {
						variant: "solid",
						size: "sm",
						loading: H.value === Y(e),
						disabled: H.value !== null && H.value !== Y(e),
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
}), N = /* @__PURE__ */ e({ default: () => P }), P = /*#__PURE__*/ t(M, [["__scopeId", "data-v-968f9a97"]]);
//#endregion
export { N as n, P as t };

//# sourceMappingURL=MetadataMatchModal-CGnCz4cr.js.map