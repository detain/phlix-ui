import { n as e } from "./Icon-24ngwBUH.js";
import { t } from "./client-fw74f3l_.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-CUoTkm_k.js";
import { n as i, o as a } from "./ThumbRating-CDDVfYEs.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as ee } from "./useLibrariesStore-alvdv0Y4.js";
import { i as s } from "./usePageTitle-BO3GGF3M.js";
import { t as c } from "./Button-CInT03Lp.js";
import { n as l, r as u, t as te } from "./FilterBar-C0XHaJ8-.js";
import { t as ne } from "./MetadataMatchModal-Cd3M7_Wl.js";
import { t as d } from "./EmptyState-0XgHKEGf.js";
import { n as re, r as ie } from "./useResolvePlayable-Dvi5ysCP.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as ae, createVNode as v, defineComponent as y, normalizeClass as b, onBeforeUnmount as oe, onMounted as se, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, watch as E, withCtx as D } from "vue";
import { useRoute as ce, useRouter as le } from "vue-router";
//#region src/components/IndexRail.vue?vue&type=script&setup=true&lang.ts
var O = ["aria-label"], k = [
	"disabled",
	"aria-label",
	"onClick"
], ue = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "IndexRail",
	props: {
		buckets: {},
		cssPrefix: { default: "index-rail" },
		navLabel: { default: "Jump to a bucket" }
	},
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (x(), g("nav", {
			class: "index-rail",
			"aria-label": e.navLabel
		}, [(x(!0), g(f, null, C(e.buckets, (t) => (x(), g("button", {
			key: t.key,
			type: "button",
			class: b([`${e.cssPrefix}__btn`, { "is-empty": t.count === 0 }]),
			disabled: t.count === 0,
			"aria-label": t.ariaLabel ?? `Jump to ${t.label} (${t.count})`,
			onClick: (e) => n("jump", t.offset)
		}, w(t.label), 11, k))), 128))], 8, O));
	}
}), [["__scopeId", "data-v-3f1ccaf4"]]), A = /* @__PURE__ */ new Map();
function j(e) {
	return e ?? "";
}
async function M(e, n, r) {
	let i = new t({ baseUrl: e }), a = {};
	a.field = n.field, n.order && (a.order = n.order), n.libraryId && (a.libraryId = n.libraryId), n.query && (a.search = n.query), n.topLevel && (a.topLevel = "1"), n.yearMin !== void 0 && (a.yearFrom = String(n.yearMin)), n.yearMax !== void 0 && (a.yearTo = String(n.yearMax)), n.match && (a.match = n.match), n.genres?.forEach((e) => a["genres[]"] = e), n.ratings?.forEach((e) => a["ratings[]"] = String(e)), n.actors?.forEach((e) => a["actors[]"] = e), n.studios?.forEach((e) => a["companies[]"] = e);
	let o = await i.get("/api/v1/media/index", a, r);
	return {
		field: o.field ?? n.field,
		buckets: Array.isArray(o.buckets) ? o.buckets : [],
		total: typeof o.total == "number" ? o.total : 0
	};
}
async function de(e, t, n) {
	let r = j(t.libraryId), i = A.get(r);
	if (i && Date.now() - i.ts < 3e5) return i.data;
	try {
		let i = await M(e, t, n);
		return A.set(r, {
			data: i,
			ts: Date.now()
		}), i;
	} catch {
		return {
			field: t.field,
			buckets: [],
			total: 0
		};
	}
}
//#endregion
//#region src/pages/LibraryPage.vue?vue&type=script&setup=true&lang.ts
var fe = { class: "library-page" }, N = {
	key: 1,
	class: "library"
}, P = { class: "library-header" }, F = { class: "library-title" }, I = { class: "library-count numeric" }, L = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "LibraryPage",
	setup(e) {
		let f = n(), y = ce(), b = le(), C = l(), O = ee(), k = r(), A = a(), j = o(), M = i(), L = S(null), R = S([]), z = null, B = p(() => R.value.some((e) => e.count > 0));
		async function V() {
			z?.abort();
			let e = new AbortController();
			z = e;
			let t = C.queryParams, n = await de(f.value, {
				field: C.sort,
				order: t.order,
				libraryId: t.libraryId,
				query: t.search,
				topLevel: t.topLevel,
				yearMin: t.yearFrom,
				yearMax: t.yearTo,
				match: t.match,
				genres: t.genres,
				ratings: t.ratings?.map((e) => Number(e)),
				actors: t.actors,
				studios: t.companies
			}, e.signal);
			e.signal.aborted || (R.value = n.buckets);
		}
		function pe(e) {
			L.value?.scrollToIndex(e);
		}
		let H = S(null), U = S(!1), W = S(!1), G = S(null);
		function me(e) {
			H.value = e, U.value = !0;
		}
		function he() {
			J();
		}
		function ge(e) {
			C.items = C.items.map((t) => t.id === e.id ? e : t), j.success(`Updated poster for "${e.name}"`);
		}
		let K = p(() => {
			let e = y.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), _e = p(() => O.byId(K.value)?.name ?? "Library");
		s(() => O.byId(K.value)?.name);
		function q() {
			K.value && (C.clearFilters(), C.setLibraryId(K.value), C.setTopLevel(!0), ve(), C.reset(), C.fetchMedia(f.value), V());
		}
		function ve() {
			let e = y.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && C.setActors(t);
			let n = y.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && C.setGenres(r);
			let i = y.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && C.setCompanies(a);
			let o = Array.isArray(y.query.match) ? y.query.match[0] : y.query.match;
			(o === "matched" || o === "unmatched") && C.setMatchStatus(o);
		}
		function J() {
			C.reset(), C.fetchMedia(f.value), V();
		}
		se(() => {
			O.load(f.value), q();
		}), E(K, q), E(f, J), E(() => C.sort, () => {
			V();
		}), oe(() => {
			C.setLibraryId(void 0), C.setTopLevel(!1), C.clearFilters(), C.reset();
		});
		function ye() {
			J();
		}
		function be(e, t) {
			C.ensureRange(f.value, e, t);
		}
		function Y(e, t) {
			b?.push({
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
				let i = await re(new t({ baseUrl: f.value }), f.value, e, A.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					j.info("Nothing to play yet");
					return;
				}
				Y("player", i.id);
			} catch (e) {
				if (r() || Z(e)) return;
				j.info("Nothing to play yet");
			}
		}
		function Se() {}
		function Ce(e) {
			b?.hasRoute("media") && Y("media", e.id);
		}
		function we(e) {
			M.toggleFavorite(e.id, f.value), M.isFavorite(e.id) ? j.success(`Marked "${e.name}" as watched`) : j.info(`Marked "${e.name}" as unwatched`);
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
				if (await new t({ baseUrl: f.value }).deleteMediaItem(e.id), r()) return;
				C.items = C.items.filter((t) => t.id !== e.id), j.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || Z(t)) return;
				j.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (x(), g("div", fe, [
			K.value ? (x(), g("section", N, [
				_("div", P, [_("h1", F, w(_e.value), 1), _("span", I, w(T(C).total.toLocaleString()) + " titles", 1)]),
				v(te, { onChange: ye }),
				T(C).error ? (x(), m(d, {
					key: 0,
					icon: "alert",
					title: "Couldn't load titles",
					description: T(C).error
				}, {
					actions: D(() => [v(c, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: J
					}, {
						default: D(() => [...t[2] ||= [ae("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : h("", !0),
				v(u, {
					ref_key: "gridRef",
					ref: L,
					items: T(C).items,
					total: T(C).total,
					loading: T(C).loading && T(C).items.length === 0,
					"loading-more": T(C).loading && T(C).items.length > 0,
					"has-more": T(C).hasMore,
					"can-match": T(k).isAdmin,
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
				B.value ? (x(), m(ue, {
					key: 1,
					buckets: R.value,
					onJump: pe
				}, null, 8, ["buckets"])) : h("", !0)
			])) : (x(), m(d, {
				key: 0,
				icon: "alert",
				title: "Library not found",
				description: "No library was specified."
			})),
			T(k).isAdmin ? (x(), m(ne, {
				key: 2,
				modelValue: U.value,
				"onUpdate:modelValue": t[0] ||= (e) => U.value = e,
				item: H.value,
				onApplied: he
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			T(k).isAdmin ? (x(), m(ie, {
				key: 3,
				modelValue: W.value,
				"onUpdate:modelValue": t[1] ||= (e) => W.value = e,
				item: G.value,
				onApplied: ge
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-2f562cee"]]);
//#endregion
export { L as default };

//# sourceMappingURL=LibraryPage-EcOUeXuw.js.map