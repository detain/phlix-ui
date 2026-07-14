import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-D1nDQ0cP.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-C_Rnq3Bo.js";
import { i } from "./usePlayerStore-fCCh6mOw.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as o } from "./ThumbRating-Db3pVsxe.js";
import { t as s } from "./useLibrariesStore-B4M08nqy.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as te } from "./Button-btm-GCUN.js";
import { t as ne } from "./useMediaStore-Cyf52FjL.js";
import { t as c } from "./EmptyState-CfyGawh7.js";
import { t as re } from "./MediaGrid-BTSLkoqH.js";
import { t as ie } from "./FilterBar-E1xjEKWA.js";
import { t as ae } from "./MetadataMatchModal-Mf19Mq1U.js";
import { t as oe } from "./PosterPicker-C-nIEDRa.js";
import { r as l } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as se, createVNode as g, defineComponent as _, normalizeClass as v, onBeforeUnmount as ce, onMounted as le, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, watch as w, withCtx as T } from "vue";
import { useRoute as ue, useRouter as de } from "vue-router";
//#region src/components/IndexRail.vue?vue&type=script&setup=true&lang.ts
var E = ["aria-label"], D = [
	"disabled",
	"aria-label",
	"onClick"
], O = { class: "index-rail__label" }, k = {
	class: "index-rail__full",
	"aria-hidden": "true"
}, fe = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "IndexRail",
	props: {
		buckets: {},
		cssPrefix: { default: "index-rail" },
		navLabel: { default: "Jump to a bucket" }
	},
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (y(), m("nav", {
			class: "index-rail",
			"aria-label": e.navLabel
		}, [(y(!0), m(u, null, x(e.buckets, (t) => (y(), m("button", {
			key: t.key,
			type: "button",
			class: v([`${e.cssPrefix}__btn`, { "is-empty": t.count === 0 }]),
			disabled: t.count === 0,
			"aria-label": t.ariaLabel ?? `Jump to ${t.label} (${t.count})`,
			onClick: (e) => n("jump", t.offset)
		}, [h("span", O, S(t.label), 1), h("span", k, S(t.label), 1)], 10, D))), 128))], 8, E));
	}
}), [["__scopeId", "data-v-4b01327c"]]), A = /* @__PURE__ */ new Map();
function j(e) {
	return JSON.stringify([
		e.libraryId ?? "",
		e.field,
		e.order ?? "",
		e.query ?? "",
		e.genres ?? [],
		e.ratings ?? [],
		e.actors ?? [],
		e.studios ?? [],
		e.yearMin ?? "",
		e.yearMax ?? "",
		e.match ?? "",
		+!!e.topLevel
	]);
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
async function pe(e, t, n) {
	let r = j(t), i = A.get(r);
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
var N = { class: "library-page" }, P = {
	key: 1,
	class: "library"
}, F = { class: "library-header" }, I = { class: "library-title" }, L = { class: "library-count numeric" }, R = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LibraryPage",
	setup(e) {
		let u = n(), _ = ue(), v = de(), x = ne(), E = s(), D = r(), O = i(), k = a(), A = o(), j = b(null), M = b([]), R = null, z = d(() => M.value.some((e) => e.count > 0));
		async function B() {
			R?.abort();
			let e = new AbortController();
			R = e;
			let t = x.queryParams, n = await pe(u.value, {
				field: x.sort,
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
			e.signal.aborted || (M.value = n.buckets);
		}
		function me(e) {
			j.value?.scrollToIndex(e);
		}
		let V = b(null), H = b(!1), U = b(!1), W = b(null);
		function he(e) {
			V.value = e, H.value = !0;
		}
		function ge() {
			J();
		}
		function _e(e) {
			x.items = x.items.map((t) => t.id === e.id ? e : t), k.success(`Updated poster for "${e.name}"`);
		}
		let G = d(() => {
			let e = _.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), ve = d(() => E.byId(G.value)?.name ?? "Library");
		ee(() => E.byId(G.value)?.name);
		let K = d(() => E.byId(G.value)?.type === "music");
		w([G, K], () => {
			K.value && x.sort === "name" ? (x.setSort("artist"), x.reset(), x.fetchMedia(u.value)) : !K.value && x.sort === "artist" && (x.setSort("name"), x.reset(), x.fetchMedia(u.value));
		}, { immediate: !0 });
		function q() {
			G.value && (x.clearFilters(), x.setLibraryId(G.value), x.setTopLevel(!0), ye(), x.reset(), x.fetchMedia(u.value), B());
		}
		function ye() {
			let e = _.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && x.setActors(t);
			let n = _.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && x.setGenres(r);
			let i = _.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && x.setCompanies(a);
			let o = Array.isArray(_.query.match) ? _.query.match[0] : _.query.match;
			(o === "matched" || o === "unmatched") && x.setMatchStatus(o);
		}
		function J() {
			x.reset(), x.fetchMedia(u.value), B();
		}
		le(() => {
			E.load(u.value), q();
		}), w(G, q), w(u, J), w(() => x.sort, () => {
			B();
		}), ce(() => {
			x.setLibraryId(void 0), x.setTopLevel(!1), x.clearFilters(), x.reset();
		});
		function be() {
			J();
		}
		function xe(e, t) {
			x.ensureRange(u.value, e, t);
		}
		function Y(e, t) {
			v?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let X = null;
		function Z(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function Q(e) {
			X?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			X = n;
			let r = () => n !== X;
			try {
				let i = await l(new t({ baseUrl: u.value }), u.value, e, O.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					k.info("Nothing to play yet");
					return;
				}
				Y("player", i.id);
			} catch (e) {
				if (r() || Z(e)) return;
				k.info("Nothing to play yet");
			}
		}
		function Se() {}
		function Ce(e) {
			v?.hasRoute("media") && Y("media", e.id);
		}
		function we(e) {
			A.isWatched(e.id) ? k.success(`Marked "${e.name}" as watched`) : k.info(`Marked "${e.name}" as unwatched`);
		}
		function Te(e) {
			V.value = e, H.value = !0;
		}
		function Ee(e) {
			W.value = e, U.value = !0;
		}
		let $ = null;
		async function De(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			$?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			$ = n;
			let r = () => n !== $;
			try {
				if (await new t({ baseUrl: u.value }).deleteMediaItem(e.id), r()) return;
				x.items = x.items.filter((t) => t.id !== e.id), k.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || Z(t)) return;
				k.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (y(), m("div", N, [
			G.value ? (y(), m("section", P, [
				h("div", F, [h("h1", I, S(ve.value), 1), h("span", L, S(C(x).total.toLocaleString()) + " titles", 1)]),
				g(ie, {
					"show-artist-sort": K.value,
					onChange: be
				}, null, 8, ["show-artist-sort"]),
				C(x).error ? (y(), f(c, {
					key: 0,
					icon: "alert",
					title: "Couldn't load titles",
					description: C(x).error
				}, {
					actions: T(() => [g(te, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: J
					}, {
						default: T(() => [...t[2] ||= [se("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : p("", !0),
				g(re, {
					ref_key: "gridRef",
					ref: j,
					items: C(x).items,
					total: C(x).total,
					loading: C(x).loading && C(x).items.length === 0,
					"loading-more": C(x).loading && C(x).items.length > 0,
					"has-more": C(x).hasMore,
					"can-match": C(D).isAdmin,
					onNeedRange: xe,
					onPlay: Q,
					onWatchlist: Se,
					onInfo: Ce,
					onMatch: he,
					onMarkWatched: we,
					onRefresh: Te,
					onChoosePoster: Ee,
					onRemove: De
				}, null, 8, [
					"items",
					"total",
					"loading",
					"loading-more",
					"has-more",
					"can-match"
				]),
				z.value ? (y(), f(fe, {
					key: 1,
					buckets: M.value,
					onJump: me
				}, null, 8, ["buckets"])) : p("", !0)
			])) : (y(), f(c, {
				key: 0,
				icon: "alert",
				title: "Library not found",
				description: "No library was specified."
			})),
			C(D).isAdmin ? (y(), f(ae, {
				key: 2,
				modelValue: H.value,
				"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
				item: V.value,
				onApplied: ge
			}, null, 8, ["modelValue", "item"])) : p("", !0),
			C(D).isAdmin ? (y(), f(oe, {
				key: 3,
				modelValue: U.value,
				"onUpdate:modelValue": t[1] ||= (e) => U.value = e,
				item: W.value,
				onApplied: _e
			}, null, 8, ["modelValue", "item"])) : p("", !0)
		]));
	}
}), [["__scopeId", "data-v-2a17be51"]]);
//#endregion
export { R as default };

//# sourceMappingURL=LibraryPage-Ck8Q6dP1.js.map