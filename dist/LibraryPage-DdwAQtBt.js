import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n } from "./Button-5ZSsUmsI.js";
import { t as r } from "./useAuthStore-DWVaTITC.js";
import { t as i } from "./useLibrariesStore-CsoGNIah.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { n as a, r as o, t as s } from "./FilterBar-BawX2ngN.js";
import { t as c } from "./MetadataMatchModal-DEJW4hCM.js";
import { t as l } from "./EmptyState-B2QnGIQT.js";
import { i as u, n as d } from "./useApiBase-DHZp4E4v.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as te, createVNode as v, defineComponent as y, normalizeClass as b, onBeforeUnmount as x, onMounted as S, openBlock as C, ref as w, renderList as T, toDisplayString as E, unref as D, watch as O, withCtx as k } from "vue";
import { useRoute as A, useRouter as j } from "vue-router";
//#region src/components/LetterRail.vue?vue&type=script&setup=true&lang.ts
var M = {
	class: "letter-rail",
	"aria-label": "Jump to a letter"
}, N = [
	"disabled",
	"aria-label",
	"onClick"
], P = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "LetterRail",
	props: { letters: {} },
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			return e === "#" ? "non-alphabetic titles" : `titles starting with ${e}`;
		}
		return (t, i) => (C(), g("nav", M, [(C(!0), g(f, null, T(e.letters, (e) => (C(), g("button", {
			key: e.letter,
			type: "button",
			class: b(["letter-rail__btn", { "is-empty": e.count === 0 }]),
			disabled: e.count === 0,
			"aria-label": `Jump to ${r(e.letter)} (${e.count})`,
			onClick: (t) => n("jump", e.offset)
		}, E(e.letter), 11, N))), 128))]));
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
		let i = (await new t({ baseUrl: e }).get(`/api/v1/media/letter-index?${u(n)}`, void 0, r))?.letters;
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
}, z = { class: "library-header" }, B = { class: "library-title" }, V = { class: "library-count numeric" }, H = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "LibraryPage",
	setup(e) {
		let t = d(), u = A(), f = j(), y = a(), b = i(), T = r(), M = w(null), N = w([]), F = null, H = p(() => N.value.some((e) => e.count > 0));
		async function U() {
			if (F?.abort(), y.sort !== "name" || y.order !== "asc") {
				N.value = [];
				return;
			}
			let e = new AbortController();
			F = e;
			let n = await I(t.value, y.queryParams, e.signal);
			e.signal.aborted || (N.value = n);
		}
		function W(e) {
			M.value?.scrollToIndex(e);
		}
		let G = w(null), K = w(!1);
		function q(e) {
			G.value = e, K.value = !0;
		}
		function J() {
			Q();
		}
		let Y = p(() => {
			let e = u.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), X = p(() => b.byId(Y.value)?.name ?? "Library");
		ee(() => b.byId(Y.value)?.name);
		function Z() {
			Y.value && (y.clearFilters(), y.setLibraryId(Y.value), y.setTopLevel(!0), ne(), y.reset(), y.fetchMedia(t.value), U());
		}
		function ne() {
			let e = u.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && y.setActors(t);
			let n = Array.isArray(u.query.match) ? u.query.match[0] : u.query.match;
			(n === "matched" || n === "unmatched") && y.setMatchStatus(n);
		}
		function Q() {
			y.reset(), y.fetchMedia(t.value), U();
		}
		S(() => {
			b.load(t.value), Z();
		}), O(Y, Z), O(t, Q), x(() => {
			y.setLibraryId(void 0), y.setTopLevel(!1), y.clearFilters(), y.reset();
		});
		function re() {
			Q();
		}
		function ie(e, n) {
			y.ensureRange(t.value, e, n);
		}
		function $(e, t) {
			f?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function ae(e) {
			if (e.type === "series" && f?.hasRoute("media")) {
				$("media", e.id);
				return;
			}
			$("player", e.id);
		}
		function oe() {}
		function se(e) {
			f?.hasRoute("media") && $("media", e.id);
		}
		return (e, t) => (C(), g("div", L, [Y.value ? (C(), g("section", R, [
			_("div", z, [_("h1", B, E(X.value), 1), _("span", V, E(D(y).total.toLocaleString()) + " titles", 1)]),
			v(s, { onChange: re }),
			D(y).error ? (C(), m(l, {
				key: 0,
				icon: "alert",
				title: "Couldn't load titles",
				description: D(y).error
			}, {
				actions: k(() => [v(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: k(() => [...t[1] ||= [te("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : h("", !0),
			v(o, {
				ref_key: "gridRef",
				ref: M,
				items: D(y).items,
				total: D(y).total,
				loading: D(y).loading && D(y).items.length === 0,
				"loading-more": D(y).loading && D(y).items.length > 0,
				"has-more": D(y).hasMore,
				"can-match": D(T).isAdmin,
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
			H.value ? (C(), m(P, {
				key: 1,
				letters: N.value,
				onJump: W
			}, null, 8, ["letters"])) : h("", !0)
		])) : (C(), m(l, {
			key: 0,
			icon: "alert",
			title: "Library not found",
			description: "No library was specified."
		})), D(T).isAdmin ? (C(), m(c, {
			key: 2,
			modelValue: K.value,
			"onUpdate:modelValue": t[0] ||= (e) => K.value = e,
			item: G.value,
			onApplied: J
		}, null, 8, ["modelValue", "item"])) : h("", !0)]));
	}
}), [["__scopeId", "data-v-0467e68e"]]);
//#endregion
export { H as default };

//# sourceMappingURL=LibraryPage-DdwAQtBt.js.map