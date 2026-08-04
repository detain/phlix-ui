import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { a as t } from "./usePreferencesStore-CFPikE8Z.js";
import { t as n } from "./client-COHWZ2KC.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-Bxpn4wWU.js";
import { i as a } from "./usePlayerStore-DhgapSoa.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { n as s } from "./ThumbRating-DXzzr40H.js";
import { t as c } from "./useLibrariesStore-B1E5wbLf.js";
import { i as l } from "./usePageTitle-BO3GGF3M.js";
import { t as ee } from "./Button-DuTfRWnu.js";
import { t as te } from "./useMediaStore-D8H9QpgK.js";
import { t as u } from "./EmptyState-DERkIIRd.js";
import { t as ne } from "./MediaCard-BvKc8NXt.js";
import { n as d, t as re } from "./MediaGrid-D03m1X1k.js";
import { t as ie } from "./FilterBar-CJ3l78kD.js";
import { t as ae } from "./MetadataMatchModal-DmCSMyg6.js";
import { t as oe } from "./PosterPicker-BvKTjbd7.js";
import { n as se, t as ce } from "./useItemInspector-C3SARMFW.js";
import { r as le } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as ue, createVNode as v, defineComponent as y, inject as b, isRef as de, normalizeClass as x, normalizeStyle as S, onBeforeUnmount as fe, onMounted as pe, openBlock as C, ref as w, renderList as T, toDisplayString as E, unref as D, watch as O, withCtx as k } from "vue";
import { RouterLink as me, routerKey as A, useRoute as he, useRouter as ge } from "vue-router";
//#region src/components/MediaListRow.vue?vue&type=script&setup=true&lang.ts
var _e = ["aria-label"], j = { class: "media-list-row__poster" }, M = { class: "media-list-row__body" }, N = { class: "media-list-row__title" }, ve = ["href", "onClick"], ye = ["href"], be = { class: "media-list-row__meta" }, xe = {
	key: 0,
	class: "numeric"
}, Se = {
	key: 1,
	class: "media-list-row__dot"
}, P = {
	key: 2,
	class: "media-list-row__cert"
}, Ce = {
	key: 3,
	class: "media-list-row__dot"
}, we = {
	key: 4,
	class: "numeric"
}, F = {
	key: 0,
	class: "media-list-row__overview"
}, Te = {
	key: 1,
	class: "media-list-row__overview media-list-row__overview--empty"
}, Ee = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "MediaListRow",
	props: {
		item: {},
		canMatch: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"match",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove",
		"edit-metadata",
		"explore-data"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = b(A, null), a = p(() => `/app/media/${n.item.id}`), o = p(() => ({
			height: "180px",
			gridTemplateColumns: "120px minmax(0, 1fr)"
		})), s = p(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (C(), g("article", {
			class: "media-list-row",
			style: S(o.value),
			"aria-label": e.item.name
		}, [_("div", j, [v(ne, {
			item: e.item,
			"can-match": e.canMatch,
			lazy: !1,
			"hide-caption": "",
			onPlay: n[0] ||= (t) => r("play", e.item),
			onWatchlist: n[1] ||= (t) => r("watchlist", e.item),
			onInfo: n[2] ||= (t) => r("info", e.item),
			onMatch: n[3] ||= (t) => r("match", e.item),
			onMarkWatched: n[4] ||= (t) => r("mark-watched", e.item),
			onRefresh: n[5] ||= (t) => r("refresh", e.item),
			onChoosePoster: n[6] ||= (t) => r("choose-poster", e.item),
			onRemove: n[7] ||= (t) => r("remove", e.item),
			onEditMetadata: n[8] ||= (t) => r("edit-metadata", e.item),
			onExploreData: n[9] ||= (t) => r("explore-data", e.item)
		}, null, 8, ["item", "can-match"])]), _("div", M, [
			_("h3", N, [D(i) ? (C(), m(D(me), {
				key: 0,
				to: a.value,
				custom: ""
			}, {
				default: k(({ navigate: t }) => [_("a", {
					href: a.value,
					class: "media-list-row__link",
					onClick: t
				}, E(e.item.name), 9, ve)]),
				_: 1
			}, 8, ["to"])) : (C(), g("a", {
				key: 1,
				href: a.value,
				class: "media-list-row__link"
			}, E(e.item.name), 9, ye))]),
			_("div", be, [
				e.item.year ? (C(), g("span", xe, E(e.item.year), 1)) : h("", !0),
				e.item.year && (e.item.rating || e.item.runtime) ? (C(), g("span", Se)) : h("", !0),
				e.item.rating ? (C(), g("span", P, E(e.item.rating), 1)) : h("", !0),
				e.item.rating && e.item.runtime ? (C(), g("span", Ce)) : h("", !0),
				e.item.runtime ? (C(), g("span", we, E(e.item.runtime) + "m", 1)) : h("", !0),
				(C(!0), g(f, null, T(s.value, (e) => (C(), g("span", {
					key: e,
					class: "media-list-row__genre"
				}, E(e), 1))), 128))
			]),
			e.item.overview ? (C(), g("p", F, E(e.item.overview), 1)) : (C(), g("p", Te, " No description yet. "))
		])], 12, _e));
	}
}), [["__scopeId", "data-v-7598c322"]]), I = ["aria-label"], L = ["data-wash"], R = ["src", "srcset"], De = { class: "media-backdrop-row__poster" }, Oe = { class: "media-backdrop-row__body" }, z = { class: "media-backdrop-row__title" }, B = ["href", "onClick"], V = ["href"], ke = { class: "media-backdrop-row__meta" }, Ae = {
	key: 0,
	class: "numeric"
}, H = {
	key: 1,
	class: "media-backdrop-row__dot"
}, je = {
	key: 2,
	class: "media-backdrop-row__cert"
}, U = {
	key: 3,
	class: "media-backdrop-row__dot"
}, Me = {
	key: 4,
	class: "numeric"
}, Ne = {
	key: 0,
	class: "media-backdrop-row__overview"
}, W = {
	key: 1,
	class: "media-backdrop-row__overview media-backdrop-row__overview--empty"
}, Pe = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "MediaBackdropRow",
	props: {
		item: {},
		canMatch: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"match",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove",
		"edit-metadata",
		"explore-data"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = b(A, null), a = p(() => `/app/media/${n.item.id}`), o = p(() => n.item.backdrop_url ?? null), s = p(() => n.item.backdrop_srcset ?? null), c = p(() => o.value !== null || s.value !== null), l = p(() => c.value ? null : n.item.poster_url ?? null), ee = p(() => l.value ? { backgroundImage: `url(${l.value})` } : {}), te = p(() => c.value || l.value !== null), u = p(() => c.value ? "backdrop" : l.value ? "ambient" : null), d = w(!1), re = w(null);
		function ie() {
			d.value = !0;
		}
		pe(() => {
			re.value?.complete && (d.value = !0);
		}), O([o, s], () => {
			d.value = !1;
		});
		let ae = p(() => ({
			height: "300px",
			"--backdrop-row-poster": "200px",
			"--backdrop-row-poster-narrow": "120px"
		})), oe = p(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (C(), g("article", {
			class: "media-backdrop-row",
			style: S(ae.value),
			"aria-label": e.item.name
		}, [
			te.value ? (C(), g("div", {
				key: 0,
				class: x(["media-backdrop-row__wash", `media-backdrop-row__wash--${u.value}`]),
				"data-wash": u.value,
				"aria-hidden": "true"
			}, [c.value ? (C(), g("img", {
				key: 0,
				ref_key: "imgEl",
				ref: re,
				class: x(["media-backdrop-row__img", { "is-loaded": d.value }]),
				src: o.value || void 0,
				srcset: s.value || void 0,
				sizes: "calc(100vw - 40px)",
				alt: "",
				decoding: "async",
				onLoad: ie
			}, null, 42, R)) : (C(), g("div", {
				key: 1,
				class: "media-backdrop-row__ambient",
				style: S(ee.value)
			}, null, 4)), n[10] ||= _("div", { class: "media-backdrop-row__scrim" }, null, -1)], 10, L)) : h("", !0),
			_("div", De, [v(ne, {
				item: e.item,
				"can-match": e.canMatch,
				lazy: !1,
				"poster-sizes": "200px",
				"hide-caption": "",
				role: "presentation",
				onPlay: n[0] ||= (t) => r("play", e.item),
				onWatchlist: n[1] ||= (t) => r("watchlist", e.item),
				onInfo: n[2] ||= (t) => r("info", e.item),
				onMatch: n[3] ||= (t) => r("match", e.item),
				onMarkWatched: n[4] ||= (t) => r("mark-watched", e.item),
				onRefresh: n[5] ||= (t) => r("refresh", e.item),
				onChoosePoster: n[6] ||= (t) => r("choose-poster", e.item),
				onRemove: n[7] ||= (t) => r("remove", e.item),
				onEditMetadata: n[8] ||= (t) => r("edit-metadata", e.item),
				onExploreData: n[9] ||= (t) => r("explore-data", e.item)
			}, null, 8, ["item", "can-match"])]),
			_("div", Oe, [
				_("h3", z, [D(i) ? (C(), m(D(me), {
					key: 0,
					to: a.value,
					custom: ""
				}, {
					default: k(({ navigate: t }) => [_("a", {
						href: a.value,
						class: "media-backdrop-row__link",
						onClick: t
					}, E(e.item.name), 9, B)]),
					_: 1
				}, 8, ["to"])) : (C(), g("a", {
					key: 1,
					href: a.value,
					class: "media-backdrop-row__link"
				}, E(e.item.name), 9, V))]),
				_("div", ke, [
					e.item.year ? (C(), g("span", Ae, E(e.item.year), 1)) : h("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (C(), g("span", H)) : h("", !0),
					e.item.rating ? (C(), g("span", je, E(e.item.rating), 1)) : h("", !0),
					e.item.rating && e.item.runtime ? (C(), g("span", U)) : h("", !0),
					e.item.runtime ? (C(), g("span", Me, E(e.item.runtime) + "m", 1)) : h("", !0),
					(C(!0), g(f, null, T(oe.value, (e) => (C(), g("span", {
						key: e,
						class: "media-backdrop-row__genre"
					}, E(e), 1))), 128))
				]),
				e.item.overview ? (C(), g("p", Ne, E(e.item.overview), 1)) : (C(), g("p", W, " No description yet. "))
			])
		], 12, I));
	}
}), [["__scopeId", "data-v-d60cebf8"]]), Fe = ["aria-label"], Ie = [
	"disabled",
	"aria-label",
	"onClick"
], Le = { class: "index-rail__label" }, G = {
	class: "index-rail__full",
	"aria-hidden": "true"
}, Re = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "IndexRail",
	props: {
		buckets: {},
		cssPrefix: { default: "index-rail" },
		navLabel: { default: "Jump to a bucket" }
	},
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (C(), g("nav", {
			class: "index-rail",
			"aria-label": e.navLabel
		}, [(C(!0), g(f, null, T(e.buckets, (t) => (C(), g("button", {
			key: t.key,
			type: "button",
			class: x([`${e.cssPrefix}__btn`, { "is-empty": t.count === 0 }]),
			disabled: t.count === 0,
			"aria-label": t.ariaLabel ?? `Jump to ${t.label} (${t.count})`,
			onClick: (e) => n("jump", t.offset)
		}, [_("span", Le, E(t.label), 1), _("span", G, E(t.label), 1)], 10, Ie))), 128))], 8, Fe));
	}
}), [["__scopeId", "data-v-4b01327c"]]), K = /* @__PURE__ */ new Map();
function q(e) {
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
async function J(e, t, r) {
	let i = new n({ baseUrl: e }), a = {};
	a.field = t.field, t.order && (a.order = t.order), t.libraryId && (a.libraryId = t.libraryId), t.query && (a.search = t.query), t.topLevel && (a.topLevel = "1"), t.yearMin !== void 0 && (a.yearFrom = String(t.yearMin)), t.yearMax !== void 0 && (a.yearTo = String(t.yearMax)), t.match && (a.match = t.match), t.genres?.forEach((e) => a["genres[]"] = e), t.ratings?.forEach((e) => a["ratings[]"] = String(e)), t.actors?.forEach((e) => a["actors[]"] = e), t.studios?.forEach((e) => a["companies[]"] = e);
	let o = await i.get("/api/v1/media/index", a, r);
	return {
		field: o.field ?? t.field,
		buckets: Array.isArray(o.buckets) ? o.buckets : [],
		total: typeof o.total == "number" ? o.total : 0
	};
}
async function ze(e, t, n) {
	let r = q(t), i = K.get(r);
	if (i && Date.now() - i.ts < 3e5) return i.data;
	try {
		let i = await J(e, t, n);
		return K.set(r, {
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
var Be = { class: "library-page" }, Ve = {
	key: 1,
	class: "library"
}, He = { class: "library-header" }, Ue = { class: "library-title" }, We = { class: "library-count numeric" }, Ge = 1, Y = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "LibraryPage",
	setup(e) {
		let f = r(), y = he(), b = ge(), x = te(), S = c(), T = i(), me = a(), A = o(), _e = s(), j = t(), M = p(() => j.viewMode === "list"), N = p(() => j.viewMode === "backdrop"), ve = d(180), ye = d(300), be = p(() => M.value || N.value ? Ge : void 0), xe = p(() => M.value ? ve : N.value ? ye : void 0), Se = w(null), P = w([]), Ce = null, we = p(() => P.value.some((e) => e.count > 0));
		async function F() {
			Ce?.abort();
			let e = new AbortController();
			Ce = e;
			let t = x.queryParams, n = await ze(f.value, {
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
			e.signal.aborted || (P.value = n.buckets);
		}
		function Te(e) {
			Se.value?.scrollToIndex(e);
		}
		let I = w(null), L = w(!1), R = w(!1), De = w(null), { inspectorItem: Oe, inspectorOpen: z, openInspector: B } = ce();
		function V(e) {
			I.value = e, L.value = !0;
		}
		function ke() {
			W();
		}
		function Ae(e) {
			x.items = x.items.map((t) => t.id === e.id ? e : t), A.success(`Updated poster for "${e.name}"`);
		}
		let H = p(() => {
			let e = y.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), je = p(() => S.byId(H.value)?.name ?? "Library");
		l(() => S.byId(H.value)?.name);
		let U = p(() => S.byId(H.value)?.type === "music");
		O([H, U], () => {
			U.value && x.sort === "name" ? (x.setSort("artist"), x.reset(), x.fetchMedia(f.value)) : !U.value && x.sort === "artist" && (x.setSort("name"), x.reset(), x.fetchMedia(f.value));
		}, { immediate: !0 });
		function Me() {
			H.value && (x.clearFilters(), x.setLibraryId(H.value), x.setTopLevel(!0), Ne(), x.reset(), x.fetchMedia(f.value), F());
		}
		function Ne() {
			let e = y.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && x.setActors(t);
			let n = y.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && x.setGenres(r);
			let i = y.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && x.setCompanies(a);
			let o = Array.isArray(y.query.match) ? y.query.match[0] : y.query.match;
			(o === "matched" || o === "unmatched") && x.setMatchStatus(o);
		}
		function W() {
			x.reset(), x.fetchMedia(f.value), F();
		}
		pe(() => {
			S.load(f.value), Me();
		}), O(H, Me), O(f, W), O(() => x.sort, () => {
			F();
		}), fe(() => {
			x.setLibraryId(void 0), x.setTopLevel(!1), x.clearFilters(), x.reset();
		});
		function Fe() {
			W();
		}
		function Ie(e, t) {
			x.ensureRange(f.value, e, t);
		}
		function Le(e, t) {
			b?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let G = null;
		function K(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function q(e) {
			G?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			G = t;
			let r = () => t !== G;
			try {
				let i = new n({ baseUrl: f.value }), a = await le(i, f.value, e, me.resumeMap, t?.signal);
				if (r()) return;
				if (!a) {
					A.info("Nothing to play yet");
					return;
				}
				Le("player", a.id);
			} catch (e) {
				if (r() || K(e)) return;
				A.info("Nothing to play yet");
			}
		}
		function J() {}
		function Y(e) {
			b?.hasRoute("media") && Le("media", e.id);
		}
		function X(e) {
			_e.isWatched(e.id) ? A.success(`Marked "${e.name}" as watched`) : A.info(`Marked "${e.name}" as unwatched`);
		}
		function Z(e) {
			I.value = e, L.value = !0;
		}
		function Q(e) {
			De.value = e, R.value = !0;
		}
		let Ke = null;
		async function $(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			Ke?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			Ke = t;
			let r = () => t !== Ke;
			try {
				if (await new n({ baseUrl: f.value }).deleteMediaItem(e.id), r()) return;
				x.items = x.items.filter((t) => t.id !== e.id), A.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || K(t)) return;
				A.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (C(), g("div", Be, [
			H.value ? (C(), g("section", Ve, [
				_("div", He, [_("h1", Ue, E(je.value), 1), _("span", We, E(D(x).total.toLocaleString()) + " titles", 1)]),
				v(ie, {
					"show-artist-sort": U.value,
					onChange: Fe
				}, null, 8, ["show-artist-sort"]),
				D(x).error ? (C(), m(u, {
					key: 0,
					icon: "alert",
					title: "Couldn't load titles",
					description: D(x).error
				}, {
					actions: k(() => [v(ee, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: W
					}, {
						default: k(() => [...t[3] ||= [ue("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : h("", !0),
				v(re, {
					ref_key: "gridRef",
					ref: Se,
					"data-view-mode": D(j).viewMode,
					items: D(x).items,
					total: D(x).total,
					loading: D(x).loading && D(x).items.length === 0,
					"loading-more": D(x).loading && D(x).items.length > 0,
					"has-more": D(x).hasMore,
					"can-match": D(T).isAdmin,
					columns: be.value,
					"row-height": xe.value,
					onNeedRange: Ie,
					onPlay: q,
					onWatchlist: J,
					onInfo: Y,
					onMatch: V,
					onMarkWatched: X,
					onRefresh: Z,
					onEditMetadata: V,
					onExploreData: D(B),
					onChoosePoster: Q,
					onRemove: $
				}, {
					card: k(({ item: e }) => [M.value ? (C(), m(Ee, {
						key: 0,
						item: e,
						"can-match": D(T).isAdmin,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: V,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: D(B)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : N.value ? (C(), m(Pe, {
						key: 1,
						item: e,
						"can-match": D(T).isAdmin,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: V,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: D(B)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : (C(), m(ne, {
						key: 2,
						item: e,
						"can-match": D(T).isAdmin,
						lazy: !1,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: V,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: D(B)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					]))]),
					_: 1
				}, 8, [
					"data-view-mode",
					"items",
					"total",
					"loading",
					"loading-more",
					"has-more",
					"can-match",
					"columns",
					"row-height",
					"onExploreData"
				]),
				we.value ? (C(), m(Re, {
					key: 1,
					buckets: P.value,
					onJump: Te
				}, null, 8, ["buckets"])) : h("", !0)
			])) : (C(), m(u, {
				key: 0,
				icon: "alert",
				title: "Library not found",
				description: "No library was specified."
			})),
			D(T).isAdmin ? (C(), m(ae, {
				key: 2,
				modelValue: L.value,
				"onUpdate:modelValue": t[0] ||= (e) => L.value = e,
				item: I.value,
				onApplied: ke
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			D(T).isAdmin ? (C(), m(oe, {
				key: 3,
				modelValue: R.value,
				"onUpdate:modelValue": t[1] ||= (e) => R.value = e,
				item: De.value,
				onApplied: Ae
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			D(T).isAdmin ? (C(), m(se, {
				key: 4,
				modelValue: D(z),
				"onUpdate:modelValue": t[2] ||= (e) => de(z) ? z.value = e : null,
				item: D(Oe)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-e08de3fd"]]);
//#endregion
export { Y as default };

//# sourceMappingURL=LibraryPage-D-6vuPtL.js.map