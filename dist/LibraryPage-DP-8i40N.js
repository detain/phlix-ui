import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n } from "./Button-5ZSsUmsI.js";
import { t as r } from "./useAuthStore-DWVaTITC.js";
import { t as i } from "./useLibrariesStore-CsoGNIah.js";
import { i as a } from "./usePageTitle-BO3GGF3M.js";
import { n as o, r as s, t as c } from "./FilterBar-BQYkC1LI.js";
import { t as l } from "./MetadataMatchModal-DEJW4hCM.js";
import { t as u } from "./EmptyState-B2QnGIQT.js";
import { t as d } from "./media-query-BJZQTDXd.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as ee, normalizeClass as x, onBeforeUnmount as S, onMounted as C, openBlock as w, ref as T, renderList as E, toDisplayString as D, unref as O, watch as k, withCtx as A } from "vue";
import { useRoute as te, useRouter as ne } from "vue-router";
//#region src/components/LetterRail.vue?vue&type=script&setup=true&lang.ts
var j = {
	class: "letter-rail",
	"aria-label": "Jump to a letter"
}, M = [
	"disabled",
	"aria-label",
	"onClick"
], N = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "LetterRail",
	props: { letters: {} },
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			return e === "#" ? "non-alphabetic titles" : `titles starting with ${e}`;
		}
		return (t, i) => (w(), g("nav", j, [(w(!0), g(f, null, E(e.letters, (e) => (w(), g("button", {
			key: e.letter,
			type: "button",
			class: x(["letter-rail__btn", { "is-empty": e.count === 0 }]),
			disabled: e.count === 0,
			"aria-label": `Jump to ${r(e.letter)} (${e.count})`,
			onClick: (t) => n("jump", e.offset)
		}, D(e.letter), 11, M))), 128))]));
	}
}), [["__scopeId", "data-v-30118e52"]]);
//#endregion
//#region src/api/letter-index.ts
function P(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.letter == "string" ? {
		letter: t.letter,
		offset: typeof t.offset == "number" ? t.offset : 0,
		count: typeof t.count == "number" ? t.count : 0
	} : null;
}
async function F(e, n = {}, r) {
	try {
		let i = (await new t({ baseUrl: e }).get(`/api/v1/media/letter-index?${d(n)}`, void 0, r))?.letters;
		return Array.isArray(i) ? i.map(P).filter((e) => e !== null) : [];
	} catch {
		return [];
	}
}
//#endregion
//#region src/pages/LibraryPage.vue?vue&type=script&setup=true&lang.ts
var I = { class: "library-page" }, L = {
	key: 1,
	class: "library"
}, R = { class: "library-header" }, z = { class: "library-title" }, B = { class: "library-count numeric" }, V = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "LibraryPage",
	setup(e) {
		let t = ee("apiBase", ""), d = p(() => typeof t == "string" ? t : t?.value ?? ""), f = te(), b = ne(), x = o(), E = i(), j = r(), M = T(null), P = T([]), V = null, H = p(() => P.value.some((e) => e.count > 0));
		async function U() {
			if (V?.abort(), x.sort !== "name" || x.order !== "asc") {
				P.value = [];
				return;
			}
			let e = new AbortController();
			V = e;
			let t = await F(d.value, x.queryParams, e.signal);
			e.signal.aborted || (P.value = t);
		}
		function W(e) {
			M.value?.scrollToIndex(e);
		}
		let G = T(null), K = T(!1);
		function q(e) {
			G.value = e, K.value = !0;
		}
		function J() {
			Q();
		}
		let Y = p(() => {
			let e = f.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), X = p(() => E.byId(Y.value)?.name ?? "Library");
		a(() => E.byId(Y.value)?.name);
		function Z() {
			Y.value && (x.clearFilters(), x.setLibraryId(Y.value), x.setTopLevel(!0), re(), x.reset(), x.fetchMedia(d.value), U());
		}
		function re() {
			let e = f.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && x.setActors(t);
			let n = Array.isArray(f.query.match) ? f.query.match[0] : f.query.match;
			(n === "matched" || n === "unmatched") && x.setMatchStatus(n);
		}
		function Q() {
			x.reset(), x.fetchMedia(d.value), U();
		}
		C(() => {
			E.load(d.value), Z();
		}), k(Y, Z), k(d, Q), S(() => {
			x.setLibraryId(void 0), x.setTopLevel(!1), x.clearFilters(), x.reset();
		});
		function ie() {
			Q();
		}
		function ae(e, t) {
			x.ensureRange(d.value, e, t);
		}
		function $(e, t) {
			b?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function oe(e) {
			if (e.type === "series" && b?.hasRoute("media")) {
				$("media", e.id);
				return;
			}
			$("player", e.id);
		}
		function se() {}
		function ce(e) {
			b?.hasRoute("media") && $("media", e.id);
		}
		return (e, t) => (w(), g("div", I, [Y.value ? (w(), g("section", L, [
			_("div", R, [_("h1", z, D(X.value), 1), _("span", B, D(O(x).total.toLocaleString()) + " titles", 1)]),
			y(c, { onChange: ie }),
			O(x).error ? (w(), m(u, {
				key: 0,
				icon: "alert",
				title: "Couldn't load titles",
				description: O(x).error
			}, {
				actions: A(() => [y(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: A(() => [...t[1] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : h("", !0),
			y(s, {
				ref_key: "gridRef",
				ref: M,
				items: O(x).items,
				total: O(x).total,
				loading: O(x).loading && O(x).items.length === 0,
				"loading-more": O(x).loading && O(x).items.length > 0,
				"has-more": O(x).hasMore,
				"can-match": O(j).isAdmin,
				onNeedRange: ae,
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
			H.value ? (w(), m(N, {
				key: 1,
				letters: P.value,
				onJump: W
			}, null, 8, ["letters"])) : h("", !0)
		])) : (w(), m(u, {
			key: 0,
			icon: "alert",
			title: "Library not found",
			description: "No library was specified."
		})), O(j).isAdmin ? (w(), m(l, {
			key: 2,
			modelValue: K.value,
			"onUpdate:modelValue": t[0] ||= (e) => K.value = e,
			item: G.value,
			onApplied: J
		}, null, 8, ["modelValue", "item"])) : h("", !0)]));
	}
}), [["__scopeId", "data-v-68f63a92"]]);
//#endregion
export { V as default };

//# sourceMappingURL=LibraryPage-DP-8i40N.js.map