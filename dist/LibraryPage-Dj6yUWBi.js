import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./client-BQ-In3oB.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-CYrYtx9s.js";
import { t as i } from "./useLibrariesStore-HxuEuBCt.js";
import { i as a } from "./usePageTitle-BO3GGF3M.js";
import { t as o } from "./Button-k7aQagzg.js";
import { n as s, r as c, t as l } from "./FilterBar-DLe8EZJp.js";
import { t as u } from "./MetadataMatchModal-CWlraWTW.js";
import { t as d } from "./EmptyState-B2QnGIQT.js";
import { t as f } from "./media-query-C8oxSF4h.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, normalizeClass as S, onBeforeUnmount as C, onMounted as ee, openBlock as w, ref as T, renderList as E, toDisplayString as D, unref as O, watch as k, withCtx as A } from "vue";
import { useRoute as j, useRouter as M } from "vue-router";
//#region src/components/LetterRail.vue?vue&type=script&setup=true&lang.ts
var N = {
	class: "letter-rail",
	"aria-label": "Jump to a letter"
}, P = [
	"disabled",
	"aria-label",
	"onClick"
], te = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "LetterRail",
	props: { letters: {} },
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			return e === "#" ? "non-alphabetic titles" : `titles starting with ${e}`;
		}
		return (t, i) => (w(), _("nav", N, [(w(!0), _(p, null, E(e.letters, (e) => (w(), _("button", {
			key: e.letter,
			type: "button",
			class: S(["letter-rail__btn", { "is-empty": e.count === 0 }]),
			disabled: e.count === 0,
			"aria-label": `Jump to ${r(e.letter)} (${e.count})`,
			onClick: (t) => n("jump", e.offset)
		}, D(e.letter), 11, P))), 128))]));
	}
}), [["__scopeId", "data-v-30118e52"]]);
//#endregion
//#region src/api/letter-index.ts
function F(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.letter == "string" ? {
		letter: t.letter,
		offset: typeof t.offset == "number" ? t.offset : 0,
		count: typeof t.count == "number" ? t.count : 0
	} : null;
}
async function I(e, n = {}, r) {
	try {
		let i = (await new t({ baseUrl: e }).get(`/api/v1/media/letter-index?${f(n)}`, void 0, r))?.letters;
		return Array.isArray(i) ? i.map(F).filter((e) => e !== null) : [];
	} catch {
		return [];
	}
}
//#endregion
//#region src/pages/LibraryPage.vue?vue&type=script&setup=true&lang.ts
var L = { class: "library-page" }, R = {
	key: 1,
	class: "library"
}, z = { class: "library-header" }, B = { class: "library-title" }, V = { class: "library-count numeric" }, H = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "LibraryPage",
	setup(e) {
		let t = n(), f = j(), p = M(), x = s(), S = i(), E = r(), N = T(null), P = T([]), F = null, H = m(() => P.value.some((e) => e.count > 0));
		async function U() {
			if (F?.abort(), x.sort !== "name" || x.order !== "asc") {
				P.value = [];
				return;
			}
			let e = new AbortController();
			F = e;
			let n = await I(t.value, x.queryParams, e.signal);
			e.signal.aborted || (P.value = n);
		}
		function W(e) {
			N.value?.scrollToIndex(e);
		}
		let G = T(null), K = T(!1);
		function q(e) {
			G.value = e, K.value = !0;
		}
		function J() {
			Q();
		}
		let Y = m(() => {
			let e = f.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), X = m(() => S.byId(Y.value)?.name ?? "Library");
		a(() => S.byId(Y.value)?.name);
		function Z() {
			Y.value && (x.clearFilters(), x.setLibraryId(Y.value), x.setTopLevel(!0), ne(), x.reset(), x.fetchMedia(t.value), U());
		}
		function ne() {
			let e = f.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && x.setActors(t);
			let n = f.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && x.setGenres(r);
			let i = f.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && x.setCompanies(a);
			let o = Array.isArray(f.query.match) ? f.query.match[0] : f.query.match;
			(o === "matched" || o === "unmatched") && x.setMatchStatus(o);
		}
		function Q() {
			x.reset(), x.fetchMedia(t.value), U();
		}
		ee(() => {
			S.load(t.value), Z();
		}), k(Y, Z), k(t, Q), C(() => {
			x.setLibraryId(void 0), x.setTopLevel(!1), x.clearFilters(), x.reset();
		});
		function re() {
			Q();
		}
		function ie(e, n) {
			x.ensureRange(t.value, e, n);
		}
		function $(e, t) {
			p?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function ae(e) {
			if (e.type === "series" && p?.hasRoute("media")) {
				$("media", e.id);
				return;
			}
			$("player", e.id);
		}
		function oe() {}
		function se(e) {
			p?.hasRoute("media") && $("media", e.id);
		}
		return (e, t) => (w(), _("div", L, [Y.value ? (w(), _("section", R, [
			v("div", z, [v("h1", B, D(X.value), 1), v("span", V, D(O(x).total.toLocaleString()) + " titles", 1)]),
			b(l, { onChange: re }),
			O(x).error ? (w(), h(d, {
				key: 0,
				icon: "alert",
				title: "Couldn't load titles",
				description: O(x).error
			}, {
				actions: A(() => [b(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: A(() => [...t[1] ||= [y("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : g("", !0),
			b(c, {
				ref_key: "gridRef",
				ref: N,
				items: O(x).items,
				total: O(x).total,
				loading: O(x).loading && O(x).items.length === 0,
				"loading-more": O(x).loading && O(x).items.length > 0,
				"has-more": O(x).hasMore,
				"can-match": O(E).isAdmin,
				onNeedRange: ie,
				onPlay: ae,
				onWatchlist: oe,
				onInfo: se,
				onMatch: q
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match"
			]),
			H.value ? (w(), h(te, {
				key: 1,
				letters: P.value,
				onJump: W
			}, null, 8, ["letters"])) : g("", !0)
		])) : (w(), h(d, {
			key: 0,
			icon: "alert",
			title: "Library not found",
			description: "No library was specified."
		})), O(E).isAdmin ? (w(), h(u, {
			key: 2,
			modelValue: K.value,
			"onUpdate:modelValue": t[0] ||= (e) => K.value = e,
			item: G.value,
			onApplied: J
		}, null, 8, ["modelValue", "item"])) : g("", !0)]));
	}
}), [["__scopeId", "data-v-df467edc"]]);
//#endregion
export { H as default };

//# sourceMappingURL=LibraryPage-Dj6yUWBi.js.map