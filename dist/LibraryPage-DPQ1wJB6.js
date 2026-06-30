import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./client-CZc6ehUa.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-HphWxXcO.js";
import { n as i, o as a } from "./LoveButton-DfujAYIy.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as ee } from "./useLibrariesStore-BpHZLr2g.js";
import { i as te } from "./usePageTitle-BO3GGF3M.js";
import { t as s } from "./Button-k7aQagzg.js";
import { n as c, r as l, t as ne } from "./FilterBar-DGcF4_oK.js";
import { t as re } from "./MetadataMatchModal-H5-IXqpz.js";
import { t as u } from "./EmptyState-B2QnGIQT.js";
import { t as d } from "./media-query-C8oxSF4h.js";
import { n as ie, r as ae } from "./useResolvePlayable-DIIz32oI.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as oe, createVNode as v, defineComponent as y, normalizeClass as b, onBeforeUnmount as x, onMounted as S, openBlock as C, ref as w, renderList as T, toDisplayString as E, unref as D, watch as O, withCtx as k } from "vue";
import { useRoute as se, useRouter as ce } from "vue-router";
//#region src/components/LetterRail.vue?vue&type=script&setup=true&lang.ts
var A = {
	class: "letter-rail",
	"aria-label": "Jump to a letter"
}, j = [
	"disabled",
	"aria-label",
	"onClick"
], le = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "LetterRail",
	props: { letters: {} },
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			return e === "#" ? "non-alphabetic titles" : `titles starting with ${e}`;
		}
		return (t, i) => (C(), g("nav", A, [(C(!0), g(f, null, T(e.letters, (e) => (C(), g("button", {
			key: e.letter,
			type: "button",
			class: b(["letter-rail__btn", { "is-empty": e.count === 0 }]),
			disabled: e.count === 0,
			"aria-label": `Jump to ${r(e.letter)} (${e.count})`,
			onClick: (t) => n("jump", e.offset)
		}, E(e.letter), 11, j))), 128))]));
	}
}), [["__scopeId", "data-v-30118e52"]]);
//#endregion
//#region src/api/letter-index.ts
function M(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.letter == "string" ? {
		letter: t.letter,
		offset: typeof t.offset == "number" ? t.offset : 0,
		count: typeof t.count == "number" ? t.count : 0
	} : null;
}
async function ue(e, n = {}, r) {
	try {
		let i = (await new t({ baseUrl: e }).get(`/api/v1/media/letter-index?${d(n)}`, void 0, r))?.letters;
		return Array.isArray(i) ? i.map(M).filter((e) => e !== null) : [];
	} catch {
		return [];
	}
}
//#endregion
//#region src/pages/LibraryPage.vue?vue&type=script&setup=true&lang.ts
var de = { class: "library-page" }, fe = {
	key: 1,
	class: "library"
}, N = { class: "library-header" }, P = { class: "library-title" }, F = { class: "library-count numeric" }, I = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "LibraryPage",
	setup(e) {
		let d = n(), f = se(), y = ce(), b = c(), T = ee(), A = r(), j = a(), M = o(), I = i(), L = w(null), R = w([]), z = null, B = p(() => R.value.some((e) => e.count > 0));
		async function V() {
			if (z?.abort(), b.sort !== "name" || b.order !== "asc") {
				R.value = [];
				return;
			}
			let e = new AbortController();
			z = e;
			let t = await ue(d.value, b.queryParams, e.signal);
			e.signal.aborted || (R.value = t);
		}
		function pe(e) {
			L.value?.scrollToIndex(e);
		}
		let H = w(null), U = w(!1), W = w(!1), G = w(null);
		function me(e) {
			H.value = e, U.value = !0;
		}
		function he() {
			J();
		}
		function ge(e) {
			b.items = b.items.map((t) => t.id === e.id ? e : t), M.success(`Updated poster for "${e.name}"`);
		}
		let K = p(() => {
			let e = f.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), _e = p(() => T.byId(K.value)?.name ?? "Library");
		te(() => T.byId(K.value)?.name);
		function q() {
			K.value && (b.clearFilters(), b.setLibraryId(K.value), b.setTopLevel(!0), ve(), b.reset(), b.fetchMedia(d.value), V());
		}
		function ve() {
			let e = f.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && b.setActors(t);
			let n = f.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && b.setGenres(r);
			let i = f.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && b.setCompanies(a);
			let o = Array.isArray(f.query.match) ? f.query.match[0] : f.query.match;
			(o === "matched" || o === "unmatched") && b.setMatchStatus(o);
		}
		function J() {
			b.reset(), b.fetchMedia(d.value), V();
		}
		S(() => {
			T.load(d.value), q();
		}), O(K, q), O(d, J), x(() => {
			b.setLibraryId(void 0), b.setTopLevel(!1), b.clearFilters(), b.reset();
		});
		function ye() {
			J();
		}
		function be(e, t) {
			b.ensureRange(d.value, e, t);
		}
		function Y(e, t) {
			y?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let X = null;
		function Z(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function xe(e) {
			X?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			X = n;
			let r = () => n !== X;
			try {
				let i = await ie(new t({ baseUrl: d.value }), d.value, e, j.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					M.info("Nothing to play yet");
					return;
				}
				Y("player", i.id);
			} catch (e) {
				if (r() || Z(e)) return;
				M.info("Nothing to play yet");
			}
		}
		function Se() {}
		function Ce(e) {
			y?.hasRoute("media") && Y("media", e.id);
		}
		function we(e) {
			I.toggleFavorite(e.id, d.value), I.isFavorite(e.id) ? M.success(`Marked "${e.name}" as watched`) : M.info(`Marked "${e.name}" as unwatched`);
		}
		function Q(e) {
			H.value = e, U.value = !0;
		}
		function Te(e) {
			G.value = e, W.value = !0;
		}
		let $ = null;
		async function Ee(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			$?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			$ = n;
			let r = () => n !== $;
			try {
				if (await new t({ baseUrl: d.value }).deleteMediaItem(e.id), r()) return;
				b.items = b.items.filter((t) => t.id !== e.id), M.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || Z(t)) return;
				M.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (C(), g("div", de, [
			K.value ? (C(), g("section", fe, [
				_("div", N, [_("h1", P, E(_e.value), 1), _("span", F, E(D(b).total.toLocaleString()) + " titles", 1)]),
				v(ne, { onChange: ye }),
				D(b).error ? (C(), m(u, {
					key: 0,
					icon: "alert",
					title: "Couldn't load titles",
					description: D(b).error
				}, {
					actions: k(() => [v(s, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: J
					}, {
						default: k(() => [...t[2] ||= [oe("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : h("", !0),
				v(l, {
					ref_key: "gridRef",
					ref: L,
					items: D(b).items,
					total: D(b).total,
					loading: D(b).loading && D(b).items.length === 0,
					"loading-more": D(b).loading && D(b).items.length > 0,
					"has-more": D(b).hasMore,
					"can-match": D(A).isAdmin,
					onNeedRange: be,
					onPlay: xe,
					onWatchlist: Se,
					onInfo: Ce,
					onMatch: me,
					onMarkWatched: we,
					onRefresh: Q,
					onChoosePoster: Te,
					onRemove: Ee
				}, null, 8, [
					"items",
					"total",
					"loading",
					"loading-more",
					"has-more",
					"can-match"
				]),
				B.value ? (C(), m(le, {
					key: 1,
					letters: R.value,
					onJump: pe
				}, null, 8, ["letters"])) : h("", !0)
			])) : (C(), m(u, {
				key: 0,
				icon: "alert",
				title: "Library not found",
				description: "No library was specified."
			})),
			D(A).isAdmin ? (C(), m(re, {
				key: 2,
				modelValue: U.value,
				"onUpdate:modelValue": t[0] ||= (e) => U.value = e,
				item: H.value,
				onApplied: he
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			D(A).isAdmin ? (C(), m(ae, {
				key: 3,
				modelValue: W.value,
				"onUpdate:modelValue": t[1] ||= (e) => W.value = e,
				item: G.value,
				onApplied: ge
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-0b4647f7"]]);
//#endregion
export { I as default };

//# sourceMappingURL=LibraryPage-DPQ1wJB6.js.map