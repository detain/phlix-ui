import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./Button-9cUUJmnN.js";
import { t as n } from "./useAuthStore-BNt_Vq18.js";
import { t as r } from "./useLibrariesStore-BehDWfBH.js";
import { i } from "./usePageTitle-BO3GGF3M.js";
import { n as a, r as ee, t as o } from "./FilterBar-COpk4qrX.js";
import { t as te } from "./MetadataMatchModal-OhFsKc_u.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { t as c } from "./media-query-BJZQTDXd.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, normalizeClass as y, onBeforeUnmount as b, onMounted as x, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, watch as D, withCtx as O } from "vue";
import { useRoute as k, useRouter as A } from "vue-router";
//#region src/components/LetterRail.vue?vue&type=script&setup=true&lang.ts
var j = {
	class: "letter-rail",
	"aria-label": "Jump to a letter"
}, M = [
	"disabled",
	"aria-label",
	"onClick"
], ne = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LetterRail",
	props: { letters: {} },
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			return e === "#" ? "non-alphabetic titles" : `titles starting with ${e}`;
		}
		return (t, i) => (S(), p("nav", j, [(S(!0), p(l, null, w(e.letters, (e) => (S(), p("button", {
			key: e.letter,
			type: "button",
			class: y(["letter-rail__btn", { "is-empty": e.count === 0 }]),
			disabled: e.count === 0,
			"aria-label": `Jump to ${r(e.letter)} (${e.count})`,
			onClick: (t) => n("jump", e.offset)
		}, T(e.letter), 11, M))), 128))]));
	}
}), [["__scopeId", "data-v-30118e52"]]);
//#endregion
//#region src/api/letter-index.ts
function N(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.letter == "string" ? {
		letter: t.letter,
		offset: typeof t.offset == "number" ? t.offset : 0,
		count: typeof t.count == "number" ? t.count : 0
	} : null;
}
async function P(e, t = {}, n) {
	try {
		let r = await fetch(`${e}/api/v1/media/letter-index?${c(t)}`, { signal: n });
		if (!r.ok) return [];
		let i = (await r.json())?.letters;
		return Array.isArray(i) ? i.map(N).filter((e) => e !== null) : [];
	} catch {
		return [];
	}
}
//#endregion
//#region src/pages/LibraryPage.vue?vue&type=script&setup=true&lang.ts
var F = { class: "library-page" }, I = {
	key: 1,
	class: "library"
}, L = { class: "library-header" }, R = { class: "library-title" }, z = { class: "library-count numeric" }, B = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LibraryPage",
	setup(e) {
		let c = v("apiBase", ""), l = u(() => typeof c == "string" ? c : c?.value ?? ""), _ = k(), y = A(), w = a(), j = r(), M = n(), N = C(null), B = C([]), V = null, H = u(() => B.value.some((e) => e.count > 0));
		async function U() {
			if (V?.abort(), w.sort !== "name" || w.order !== "asc") {
				B.value = [];
				return;
			}
			let e = new AbortController();
			V = e;
			let t = await P(l.value, w.queryParams, e.signal);
			e.signal.aborted || (B.value = t);
		}
		function W(e) {
			N.value?.scrollToIndex(e);
		}
		let G = C(null), K = C(!1);
		function q(e) {
			G.value = e, K.value = !0;
		}
		function J() {
			Q();
		}
		let Y = u(() => {
			let e = _.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), X = u(() => j.byId(Y.value)?.name ?? "Library");
		i(() => j.byId(Y.value)?.name);
		function Z() {
			Y.value && (w.clearFilters(), w.setLibraryId(Y.value), w.setTopLevel(!0), re(), w.reset(), w.fetchMedia(l.value), U());
		}
		function re() {
			let e = _.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && w.setActors(t);
			let n = Array.isArray(_.query.match) ? _.query.match[0] : _.query.match;
			(n === "matched" || n === "unmatched") && w.setMatchStatus(n);
		}
		function Q() {
			w.reset(), w.fetchMedia(l.value), U();
		}
		x(() => {
			j.load(l.value), Z();
		}), D(Y, Z), D(l, Q), b(() => {
			w.setLibraryId(void 0), w.setTopLevel(!1), w.clearFilters(), w.reset();
		});
		function ie() {
			Q();
		}
		function ae() {
			w.loadMore(l.value);
		}
		function $(e, t) {
			y?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function oe(e) {
			if (e.type === "series" && y?.hasRoute("media")) {
				$("media", e.id);
				return;
			}
			$("player", e.id);
		}
		function se() {}
		function ce(e) {
			y?.hasRoute("media") && $("media", e.id);
		}
		return (e, n) => (S(), p("div", F, [Y.value ? (S(), p("section", I, [
			m("div", L, [m("h1", R, T(X.value), 1), m("span", z, T(E(w).total.toLocaleString()) + " titles", 1)]),
			g(o, { onChange: ie }),
			E(w).error ? (S(), d(s, {
				key: 0,
				icon: "alert",
				title: "Couldn't load titles",
				description: E(w).error
			}, {
				actions: O(() => [g(t, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: O(() => [...n[1] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : f("", !0),
			g(ee, {
				ref_key: "gridRef",
				ref: N,
				items: E(w).items,
				total: E(w).total,
				loading: E(w).loading && E(w).items.length === 0,
				"loading-more": E(w).loading && E(w).items.length > 0,
				"has-more": E(w).hasMore,
				"can-match": E(M).isAdmin,
				onLoadMore: ae,
				onPlay: oe,
				onWatchlist: se,
				onInfo: ce,
				onMatch: q
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match"
			]),
			H.value ? (S(), d(ne, {
				key: 1,
				letters: B.value,
				onJump: W
			}, null, 8, ["letters"])) : f("", !0)
		])) : (S(), d(s, {
			key: 0,
			icon: "alert",
			title: "Library not found",
			description: "No library was specified."
		})), E(M).isAdmin ? (S(), d(te, {
			key: 2,
			modelValue: K.value,
			"onUpdate:modelValue": n[0] ||= (e) => K.value = e,
			item: G.value,
			onApplied: J
		}, null, 8, ["modelValue", "item"])) : f("", !0)]));
	}
}), [["__scopeId", "data-v-f4ac4566"]]);
//#endregion
export { B as default };

//# sourceMappingURL=LibraryPage-i0j1Kagf.js.map