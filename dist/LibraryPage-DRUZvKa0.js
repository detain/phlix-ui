import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-BzWwyWKr.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-Ds0NVhBP.js";
import { i } from "./usePlayerStore-Dgw0JCWb.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as o } from "./ThumbRating-BxiWuYAs.js";
import { t as ee } from "./useLibrariesStore-tTV4T4xY.js";
import { i as te } from "./usePageTitle-BO3GGF3M.js";
import { t as ne } from "./Button-DWa6Ld_Z.js";
import { t as re } from "./useMediaStore-CkjoM4Yj.js";
import { t as s } from "./EmptyState-ZlI5t4KT.js";
import { t as ie } from "./MediaGrid-Yj9pcv98.js";
import { t as ae } from "./FilterBar-4PhUVcB3.js";
import { t as oe } from "./MetadataMatchModal-BbaA7xKl.js";
import { t as se } from "./PosterPicker-C5hu8ehM.js";
import { n as ce, t as le } from "./useItemInspector-BTx_gnEr.js";
import { r as ue } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as de, createVNode as m, defineComponent as h, isRef as fe, normalizeClass as g, onBeforeUnmount as pe, onMounted as me, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as x, watch as S, withCtx as C } from "vue";
import { useRoute as he, useRouter as ge } from "vue-router";
//#region src/components/IndexRail.vue?vue&type=script&setup=true&lang.ts
var w = ["aria-label"], T = [
	"disabled",
	"aria-label",
	"onClick"
], E = { class: "index-rail__label" }, D = {
	class: "index-rail__full",
	"aria-hidden": "true"
}, _e = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "IndexRail",
	props: {
		buckets: {},
		cssPrefix: { default: "index-rail" },
		navLabel: { default: "Jump to a bucket" }
	},
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (_(), f("nav", {
			class: "index-rail",
			"aria-label": e.navLabel
		}, [(_(!0), f(c, null, y(e.buckets, (t) => (_(), f("button", {
			key: t.key,
			type: "button",
			class: g([`${e.cssPrefix}__btn`, { "is-empty": t.count === 0 }]),
			disabled: t.count === 0,
			"aria-label": t.ariaLabel ?? `Jump to ${t.label} (${t.count})`,
			onClick: (e) => n("jump", t.offset)
		}, [p("span", E, b(t.label), 1), p("span", D, b(t.label), 1)], 10, T))), 128))], 8, w));
	}
}), [["__scopeId", "data-v-4b01327c"]]), O = /* @__PURE__ */ new Map();
function k(e) {
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
async function A(e, n, r) {
	let i = new t({ baseUrl: e }), a = {};
	a.field = n.field, n.order && (a.order = n.order), n.libraryId && (a.libraryId = n.libraryId), n.query && (a.search = n.query), n.topLevel && (a.topLevel = "1"), n.yearMin !== void 0 && (a.yearFrom = String(n.yearMin)), n.yearMax !== void 0 && (a.yearTo = String(n.yearMax)), n.match && (a.match = n.match), n.genres?.forEach((e) => a["genres[]"] = e), n.ratings?.forEach((e) => a["ratings[]"] = String(e)), n.actors?.forEach((e) => a["actors[]"] = e), n.studios?.forEach((e) => a["companies[]"] = e);
	let o = await i.get("/api/v1/media/index", a, r);
	return {
		field: o.field ?? n.field,
		buckets: Array.isArray(o.buckets) ? o.buckets : [],
		total: typeof o.total == "number" ? o.total : 0
	};
}
async function j(e, t, n) {
	let r = k(t), i = O.get(r);
	if (i && Date.now() - i.ts < 3e5) return i.data;
	try {
		let i = await A(e, t, n);
		return O.set(r, {
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
var M = { class: "library-page" }, N = {
	key: 1,
	class: "library"
}, P = { class: "library-header" }, F = { class: "library-title" }, I = { class: "library-count numeric" }, L = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "LibraryPage",
	setup(e) {
		let c = n(), h = he(), g = ge(), y = re(), w = ee(), T = r(), E = i(), D = a(), O = o(), k = v(null), A = v([]), L = null, ve = l(() => A.value.some((e) => e.count > 0));
		async function R() {
			L?.abort();
			let e = new AbortController();
			L = e;
			let t = y.queryParams, n = await j(c.value, {
				field: y.sort,
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
			e.signal.aborted || (A.value = n.buckets);
		}
		function ye(e) {
			k.value?.scrollToIndex(e);
		}
		let z = v(null), B = v(!1), V = v(!1), H = v(null), { inspectorItem: be, inspectorOpen: U, openInspector: xe } = le();
		function W(e) {
			z.value = e, B.value = !0;
		}
		function Se() {
			J();
		}
		function Ce(e) {
			y.items = y.items.map((t) => t.id === e.id ? e : t), D.success(`Updated poster for "${e.name}"`);
		}
		let G = l(() => {
			let e = h.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), we = l(() => w.byId(G.value)?.name ?? "Library");
		te(() => w.byId(G.value)?.name);
		let K = l(() => w.byId(G.value)?.type === "music");
		S([G, K], () => {
			K.value && y.sort === "name" ? (y.setSort("artist"), y.reset(), y.fetchMedia(c.value)) : !K.value && y.sort === "artist" && (y.setSort("name"), y.reset(), y.fetchMedia(c.value));
		}, { immediate: !0 });
		function q() {
			G.value && (y.clearFilters(), y.setLibraryId(G.value), y.setTopLevel(!0), Te(), y.reset(), y.fetchMedia(c.value), R());
		}
		function Te() {
			let e = h.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && y.setActors(t);
			let n = h.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && y.setGenres(r);
			let i = h.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && y.setCompanies(a);
			let o = Array.isArray(h.query.match) ? h.query.match[0] : h.query.match;
			(o === "matched" || o === "unmatched") && y.setMatchStatus(o);
		}
		function J() {
			y.reset(), y.fetchMedia(c.value), R();
		}
		me(() => {
			w.load(c.value), q();
		}), S(G, q), S(c, J), S(() => y.sort, () => {
			R();
		}), pe(() => {
			y.setLibraryId(void 0), y.setTopLevel(!1), y.clearFilters(), y.reset();
		});
		function Ee() {
			J();
		}
		function De(e, t) {
			y.ensureRange(c.value, e, t);
		}
		function Y(e, t) {
			g?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let X = null;
		function Z(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function Oe(e) {
			X?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			X = n;
			let r = () => n !== X;
			try {
				let i = await ue(new t({ baseUrl: c.value }), c.value, e, E.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					D.info("Nothing to play yet");
					return;
				}
				Y("player", i.id);
			} catch (e) {
				if (r() || Z(e)) return;
				D.info("Nothing to play yet");
			}
		}
		function ke() {}
		function Ae(e) {
			g?.hasRoute("media") && Y("media", e.id);
		}
		function je(e) {
			O.isWatched(e.id) ? D.success(`Marked "${e.name}" as watched`) : D.info(`Marked "${e.name}" as unwatched`);
		}
		function Me(e) {
			z.value = e, B.value = !0;
		}
		function Q(e) {
			H.value = e, V.value = !0;
		}
		let $ = null;
		async function Ne(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			$?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			$ = n;
			let r = () => n !== $;
			try {
				if (await new t({ baseUrl: c.value }).deleteMediaItem(e.id), r()) return;
				y.items = y.items.filter((t) => t.id !== e.id), D.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || Z(t)) return;
				D.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (_(), f("div", M, [
			G.value ? (_(), f("section", N, [
				p("div", P, [p("h1", F, b(we.value), 1), p("span", I, b(x(y).total.toLocaleString()) + " titles", 1)]),
				m(ae, {
					"show-artist-sort": K.value,
					onChange: Ee
				}, null, 8, ["show-artist-sort"]),
				x(y).error ? (_(), u(s, {
					key: 0,
					icon: "alert",
					title: "Couldn't load titles",
					description: x(y).error
				}, {
					actions: C(() => [m(ne, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: J
					}, {
						default: C(() => [...t[3] ||= [de("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : d("", !0),
				m(ie, {
					ref_key: "gridRef",
					ref: k,
					items: x(y).items,
					total: x(y).total,
					loading: x(y).loading && x(y).items.length === 0,
					"loading-more": x(y).loading && x(y).items.length > 0,
					"has-more": x(y).hasMore,
					"can-match": x(T).isAdmin,
					onNeedRange: De,
					onPlay: Oe,
					onWatchlist: ke,
					onInfo: Ae,
					onMatch: W,
					onMarkWatched: je,
					onRefresh: Me,
					onEditMetadata: W,
					onExploreData: x(xe),
					onChoosePoster: Q,
					onRemove: Ne
				}, null, 8, [
					"items",
					"total",
					"loading",
					"loading-more",
					"has-more",
					"can-match",
					"onExploreData"
				]),
				ve.value ? (_(), u(_e, {
					key: 1,
					buckets: A.value,
					onJump: ye
				}, null, 8, ["buckets"])) : d("", !0)
			])) : (_(), u(s, {
				key: 0,
				icon: "alert",
				title: "Library not found",
				description: "No library was specified."
			})),
			x(T).isAdmin ? (_(), u(oe, {
				key: 2,
				modelValue: B.value,
				"onUpdate:modelValue": t[0] ||= (e) => B.value = e,
				item: z.value,
				onApplied: Se
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			x(T).isAdmin ? (_(), u(se, {
				key: 3,
				modelValue: V.value,
				"onUpdate:modelValue": t[1] ||= (e) => V.value = e,
				item: H.value,
				onApplied: Ce
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			x(T).isAdmin ? (_(), u(ce, {
				key: 4,
				modelValue: x(U),
				"onUpdate:modelValue": t[2] ||= (e) => fe(U) ? U.value = e : null,
				item: x(be)
			}, null, 8, ["modelValue", "item"])) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-eb6e37c7"]]);
//#endregion
export { L as default };

//# sourceMappingURL=LibraryPage-DRUZvKa0.js.map