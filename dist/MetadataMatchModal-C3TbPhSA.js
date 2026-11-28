import { t as e } from "./rolldown-runtime-CGnMp29N.js";
import { S as t, T as n, c as r } from "./client-Bmlfq3Uy.js";
import { t as ee } from "./useAuthStore-B16gRg1-.js";
import { t as te } from "./Modal-BPKuAvTH.js";
import { t as i } from "./Button-DTiNkl61.js";
import { n as a, t as o } from "./Icon-55iG1rR7.js";
import { t as ne } from "./Spinner-VY7YJUKF.js";
import { t as re } from "./useImageSrc-CSM61b-l.js";
import { t as ie } from "./useMessages-C-PrFAcm.js";
import { Fragment as s, computed as ae, createBlock as oe, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, onBeforeUnmount as se, openBlock as m, ref as h, renderList as g, toDisplayString as _, unref as v, vModelText as y, watch as ce, withCtx as b, withDirectives as x, withModifiers as le } from "vue";
// src/components/MetadataMatchModal.vue?vue&type=script&setup=true&lang.ts
var ue = { class: "match-modal" }, de = {
	key: 0,
	class: "match-modal__subject"
}, fe = { class: "match-modal__field match-modal__field--query" }, pe = {
	class: "match-modal__label",
	for: "match-query"
}, me = ["placeholder"], he = { class: "match-modal__field match-modal__field--year" }, ge = {
	class: "match-modal__label",
	for: "match-year"
}, _e = ["placeholder"], ve = {
	key: 1,
	class: "match-modal__source"
}, ye = { class: "match-modal__source-summary" }, be = { class: "match-modal__source-body" }, xe = {
	key: 0,
	class: "match-modal__source-filename"
}, Se = { class: "match-modal__source-label" }, Ce = ["title"], S = { class: "match-modal__source-label" }, C = ["innerHTML"], w = {
	key: 2,
	class: "match-modal__source-tags"
}, T = {
	key: 2,
	class: "match-modal__state",
	role: "status"
}, E = { class: "match-modal__state-title" }, D = { class: "match-modal__state-hint" }, O = {
	key: 3,
	class: "match-modal__state",
	role: "alert"
}, k = { class: "match-modal__state-title" }, A = {
	key: 4,
	class: "match-modal__loading",
	role: "status",
	"aria-busy": "true"
}, we = {
	key: 5,
	class: "match-modal__state",
	role: "status"
}, Te = { class: "match-modal__state-title" }, Ee = { class: "match-modal__state-hint" }, De = {
	key: 0,
	class: "match-modal__apply-error",
	role: "alert"
}, Oe = { class: "match-modal__results" }, ke = { class: "match-modal__poster" }, Ae = ["src", "alt"], je = {
	key: 1,
	class: "match-modal__poster-fallback",
	"aria-hidden": "true"
}, j = { class: "match-modal__result-body" }, Me = { class: "match-modal__result-title" }, Ne = {
	key: 0,
	class: "match-modal__result-year numeric"
}, Pe = { class: "match-modal__result-type" }, Fe = {
	key: 0,
	class: "match-modal__result-overview"
}, M = /*@__PURE__*/ p({
	__name: "MetadataMatchModal",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: a }) {
		let { imgSrc: p } = re(), M = e, N = a, P = ee(), { t: F } = ie(), I = h(""), L = h(""), R = h([]), z = h(!1), B = h(!1), V = h(null), H = h(!1), U = h(null), W = h(null), G = h(null), K = h(!1), q = ae({
			get: () => M.modelValue,
			set: (e) => N("update:modelValue", e)
		}), J = null;
		function Ie(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function Le(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
		}
		function Re(e) {
			return e.split(/[/\\]/).map((e) => Le(e)).join(" › ");
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
			if (!M.item) return;
			J?.abort();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			J = e;
			let t = () => J !== e;
			z.value = !0, B.value = !0, V.value = null, H.value = !1, W.value = null;
			try {
				let n = await P.client.matchSearch(M.item.id, {
					query: I.value.trim() || void 0,
					year: L.value.trim() || void 0
				}, e?.signal);
				if (t()) return;
				if (R.value = n.results, G.value = n.context ?? null, G.value?.parsed_title && !K.value) {
					let e = G.value.parsed_title;
					I.value !== e && (I.value = e);
				}
			} catch (e) {
				if (t() || Ie(e)) return;
				R.value = [], r(e) ? H.value = !0 : V.value = n(e, "Search failed. Please try again.");
			} finally {
				t() || (z.value = !1);
			}
		}
		function $() {
			Q();
		}
		function ze() {
			let e = M.item?.name ?? "";
			K.value = I.value !== e;
		}
		async function Be(e) {
			if (M.item && !U.value) {
				U.value = Y(e), W.value = null;
				try {
					let t = await P.client.matchApply(M.item.id, {
						tmdb_id: e.tmdb_id,
						type: e.type
					});
					N("applied", t.item), q.value = !1;
				} catch (e) {
					r(e) ? H.value = !0 : e instanceof t && e.status === 422 ? W.value = F("match.noDetails") : W.value = n(e, "Could not apply that match. Please try again.");
				} finally {
					U.value = null;
				}
			}
		}
		return ce(() => M.modelValue, (e) => {
			e && M.item ? (Z(), I.value = M.item.name ?? "", L.value = M.item.year == null ? "" : String(M.item.year), Q()) : e || (X(), Z());
		}, { immediate: !0 }), se(X), (t, n) => (m(), oe(te, {
			modelValue: q.value,
			"onUpdate:modelValue": n[2] ||= (e) => q.value = e,
			title: v(F)("itemActions.matchMetadata"),
			size: "lg"
		}, {
			default: b(() => [u("div", ue, [
				e.item ? (m(), l("p", de, _(e.item.year ? v(F)("match.subjectWithYear", {
					name: e.item.name,
					year: e.item.year
				}) : v(F)("match.subjectNoYear", { name: e.item.name })), 1)) : c("", !0),
				u("form", {
					class: "match-modal__form",
					onSubmit: le($, ["prevent"])
				}, [
					u("div", fe, [u("label", pe, _(v(F)("match.search")), 1), x(u("input", {
						id: "match-query",
						"onUpdate:modelValue": n[0] ||= (e) => I.value = e,
						type: "text",
						class: "match-modal__input",
						placeholder: v(F)("match.titlePlaceholder"),
						autocomplete: "off",
						onInput: ze
					}, null, 40, me), [[y, I.value]])]),
					u("div", he, [u("label", ge, _(v(F)("filter.year")), 1), x(u("input", {
						id: "match-year",
						"onUpdate:modelValue": n[1] ||= (e) => L.value = e,
						type: "text",
						inputmode: "numeric",
						class: "match-modal__input numeric",
						placeholder: v(F)("match.yearPlaceholder"),
						autocomplete: "off"
					}, null, 8, _e), [[y, L.value]])]),
					f(i, {
						type: "submit",
						variant: "solid",
						"left-icon": "search",
						loading: z.value
					}, {
						default: b(() => [d(_(v(F)("match.search")), 1)]),
						_: 1
					}, 8, ["loading"])
				], 32),
				G.value && (G.value.original_filename || G.value.path || G.value.tags && Object.keys(G.value.tags).length) ? (m(), l("details", ve, [u("summary", ye, _(v(F)("match.sourceInfo")), 1), u("div", be, [
					G.value.original_filename ? (m(), l("p", xe, [u("span", Se, _(v(F)("match.fileLabel")), 1), u("code", null, _(G.value.original_filename), 1)])) : c("", !0),
					G.value.path ? (m(), l("p", {
						key: 1,
						class: "match-modal__source-path",
						title: G.value.path
					}, [u("span", S, _(v(F)("match.pathLabel")), 1), u("span", { innerHTML: Re(G.value.path) }, null, 8, C)], 8, Ce)) : c("", !0),
					G.value.tags && Object.keys(G.value.tags).length ? (m(), l("dl", w, [(m(!0), l(s, null, g(G.value.tags, (e, t) => (m(), l(s, { key: String(t) }, [u("dt", null, _(t), 1), u("dd", null, _(e), 1)], 64))), 128))])) : c("", !0)
				])])) : c("", !0),
				H.value ? (m(), l("div", T, [
					f(o, {
						name: "alert",
						class: "match-modal__state-icon"
					}),
					u("p", E, _(v(F)("media.tmdbNotConfigured")), 1),
					u("p", D, _(v(F)("media.tmdbMetadataHint")), 1)
				])) : V.value ? (m(), l("div", O, [
					f(o, {
						name: "error",
						class: "match-modal__state-icon"
					}),
					u("p", k, _(V.value), 1),
					f(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: b(() => [d(_(v(F)("match.tryAgain")), 1)]),
						_: 1
					})
				])) : z.value ? (m(), l("div", A, [f(ne, { label: v(F)("match.searching") }, null, 8, ["label"])])) : B.value && R.value.length === 0 ? (m(), l("div", we, [
					f(o, {
						name: "search",
						class: "match-modal__state-icon"
					}),
					u("p", Te, _(v(F)("match.noResults")), 1),
					u("p", Ee, _(v(F)("match.noResultsHint")), 1)
				])) : R.value.length ? (m(), l(s, { key: 6 }, [W.value ? (m(), l("p", De, _(W.value), 1)) : c("", !0), u("ul", Oe, [(m(!0), l(s, null, g(R.value, (e) => (m(), l("li", {
					key: Y(e),
					class: "match-modal__result"
				}, [
					u("div", ke, [e.poster_url ? (m(), l("img", {
						key: 0,
						src: v(p)(e.poster_url),
						alt: e.title,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ae)) : (m(), l("div", je, [f(o, { name: e.type === "tv" ? "tv" : "film" }, null, 8, ["name"])]))]),
					u("div", j, [u("p", Me, [
						d(_(e.title) + " ", 1),
						e.year ? (m(), l("span", Ne, _(e.year), 1)) : c("", !0),
						u("span", Pe, _(e.type), 1)
					]), e.overview ? (m(), l("p", Fe, _(e.overview), 1)) : c("", !0)]),
					f(i, {
						variant: "solid",
						size: "sm",
						loading: U.value === Y(e),
						disabled: U.value !== null && U.value !== Y(e),
						onClick: (t) => Be(e)
					}, {
						default: b(() => [d(_(v(F)("match.useThis")), 1)]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])
				]))), 128))])], 64)) : c("", !0)
			])]),
			_: 1
		}, 8, ["modelValue", "title"]));
	}
}), N = /* @__PURE__ */ e({ default: () => P }), P = /*#__PURE__*/ a(M, [["__scopeId", "data-v-853762f0"]]);
export { N as n, P as t };

//# sourceMappingURL=MetadataMatchModal-C3TbPhSA.js.map