import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./client-cUL8r-1I.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-CJrazXSP.js";
import { o as i } from "./LoveButton-Cfe3jzXL.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./useLibrariesStore-Bpp1SwfJ.js";
import { i as s } from "./usePageTitle-BO3GGF3M.js";
import { t as c } from "./Button-k7aQagzg.js";
import { n as ee, r as te, t as l } from "./FilterBar-CSA4h7rU.js";
import { t as u } from "./MetadataMatchModal-CQ_WXyf-.js";
import { t as d } from "./EmptyState-B2QnGIQT.js";
import { t as f } from "./media-query-C8oxSF4h.js";
import { t as ne } from "./useResolvePlayable-GiHzTTtK.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, normalizeClass as S, onBeforeUnmount as re, onMounted as C, openBlock as w, ref as T, renderList as E, toDisplayString as D, unref as O, watch as k, withCtx as A } from "vue";
import { useRoute as ie, useRouter as ae } from "vue-router";
//#region src/components/LetterRail.vue?vue&type=script&setup=true&lang.ts
var j = {
	class: "letter-rail",
	"aria-label": "Jump to a letter"
}, M = [
	"disabled",
	"aria-label",
	"onClick"
], oe = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "LetterRail",
	props: { letters: {} },
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			return e === "#" ? "non-alphabetic titles" : `titles starting with ${e}`;
		}
		return (t, i) => (w(), _("nav", j, [(w(!0), _(p, null, E(e.letters, (e) => (w(), _("button", {
			key: e.letter,
			type: "button",
			class: S(["letter-rail__btn", { "is-empty": e.count === 0 }]),
			disabled: e.count === 0,
			"aria-label": `Jump to ${r(e.letter)} (${e.count})`,
			onClick: (t) => n("jump", e.offset)
		}, D(e.letter), 11, M))), 128))]));
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
async function P(e, n = {}, r) {
	try {
		let i = (await new t({ baseUrl: e }).get(`/api/v1/media/letter-index?${f(n)}`, void 0, r))?.letters;
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
}, L = { class: "library-header" }, R = { class: "library-title" }, z = { class: "library-count numeric" }, B = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "LibraryPage",
	setup(e) {
		let f = n(), p = ie(), x = ae(), S = ee(), E = o(), j = r(), M = i(), N = a(), B = T(null), V = T([]), H = null, U = m(() => V.value.some((e) => e.count > 0));
		async function W() {
			if (H?.abort(), S.sort !== "name" || S.order !== "asc") {
				V.value = [];
				return;
			}
			let e = new AbortController();
			H = e;
			let t = await P(f.value, S.queryParams, e.signal);
			e.signal.aborted || (V.value = t);
		}
		function G(e) {
			B.value?.scrollToIndex(e);
		}
		let K = T(null), q = T(!1);
		function se(e) {
			K.value = e, q.value = !0;
		}
		function ce() {
			Z();
		}
		let J = m(() => {
			let e = p.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), le = m(() => E.byId(J.value)?.name ?? "Library");
		s(() => E.byId(J.value)?.name);
		function Y() {
			J.value && (S.clearFilters(), S.setLibraryId(J.value), S.setTopLevel(!0), X(), S.reset(), S.fetchMedia(f.value), W());
		}
		function X() {
			let e = p.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && S.setActors(t);
			let n = p.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && S.setGenres(r);
			let i = p.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && S.setCompanies(a);
			let o = Array.isArray(p.query.match) ? p.query.match[0] : p.query.match;
			(o === "matched" || o === "unmatched") && S.setMatchStatus(o);
		}
		function Z() {
			S.reset(), S.fetchMedia(f.value), W();
		}
		C(() => {
			E.load(f.value), Y();
		}), k(J, Y), k(f, Z), re(() => {
			S.setLibraryId(void 0), S.setTopLevel(!1), S.clearFilters(), S.reset();
		});
		function ue() {
			Z();
		}
		function de(e, t) {
			S.ensureRange(f.value, e, t);
		}
		function Q(e, t) {
			x?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let $ = null;
		function fe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function pe(e) {
			$?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			$ = n;
			let r = () => n !== $;
			try {
				let i = await ne(new t({ baseUrl: f.value }), f.value, e, M.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					N.info("Nothing to play yet");
					return;
				}
				Q("player", i.id);
			} catch (e) {
				if (r() || fe(e)) return;
				N.info("Nothing to play yet");
			}
		}
		function me() {}
		function he(e) {
			x?.hasRoute("media") && Q("media", e.id);
		}
		return (e, t) => (w(), _("div", F, [J.value ? (w(), _("section", I, [
			v("div", L, [v("h1", R, D(le.value), 1), v("span", z, D(O(S).total.toLocaleString()) + " titles", 1)]),
			b(l, { onChange: ue }),
			O(S).error ? (w(), h(d, {
				key: 0,
				icon: "alert",
				title: "Couldn't load titles",
				description: O(S).error
			}, {
				actions: A(() => [b(c, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Z
				}, {
					default: A(() => [...t[1] ||= [y("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : g("", !0),
			b(te, {
				ref_key: "gridRef",
				ref: B,
				items: O(S).items,
				total: O(S).total,
				loading: O(S).loading && O(S).items.length === 0,
				"loading-more": O(S).loading && O(S).items.length > 0,
				"has-more": O(S).hasMore,
				"can-match": O(j).isAdmin,
				onNeedRange: de,
				onPlay: pe,
				onWatchlist: me,
				onInfo: he,
				onMatch: se
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match"
			]),
			U.value ? (w(), h(oe, {
				key: 1,
				letters: V.value,
				onJump: G
			}, null, 8, ["letters"])) : g("", !0)
		])) : (w(), h(d, {
			key: 0,
			icon: "alert",
			title: "Library not found",
			description: "No library was specified."
		})), O(j).isAdmin ? (w(), h(u, {
			key: 2,
			modelValue: q.value,
			"onUpdate:modelValue": t[0] ||= (e) => q.value = e,
			item: K.value,
			onApplied: ce
		}, null, 8, ["modelValue", "item"])) : g("", !0)]));
	}
}), [["__scopeId", "data-v-a414ee65"]]);
//#endregion
export { B as default };

//# sourceMappingURL=LibraryPage-wrVHS3a9.js.map