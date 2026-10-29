import { n as e } from "./Icon-CIwTuFLd.js";
import { a as t } from "./usePreferencesStore-CFPikE8Z.js";
import { t as n } from "./client-CSOeqVlU.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-D_bFae0K.js";
import { t as a } from "./useImageSrc-KnN1T9Ga.js";
import { i as o } from "./usePlayerStore-D8A_gb_c.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { n as s } from "./ThumbRating-BUt_haMZ.js";
import { t as c } from "./useLibrariesStore-DVWJfiue.js";
import { t as l } from "./EmptyState-BAyOxAcK.js";
import { t as u } from "./Button-BuG0GvCa.js";
import { i as d } from "./usePageTitle-BO3GGF3M.js";
import { t as te } from "./ConfirmDialog-QgGYmnA5.js";
import { t as ne } from "./MediaCard-DQXV2R6W.js";
import { i as re, n as ie, r as f, t as ae } from "./MediaGrid-BZWoL_wU.js";
import { t as oe } from "./useMediaStore-DTbTajUK.js";
import { t as se } from "./FilterBar-DZxWpDBw.js";
import { t as ce } from "./MetadataMatchModal-BrSQcCdK.js";
import { t as le } from "./PosterPicker-CYiMONck.js";
import { n as ue, t as de } from "./useItemInspector-BolIjajF.js";
import { r as fe } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as pe, createVNode as y, defineComponent as b, inject as x, isRef as me, normalizeClass as S, normalizeStyle as C, onBeforeUnmount as he, onMounted as ge, openBlock as w, ref as T, renderList as E, toDisplayString as D, unref as O, watch as k, withCtx as A } from "vue";
import { RouterLink as j, routerKey as M, useRoute as _e, useRouter as ve } from "vue-router";
//#region src/components/MediaListRow.vue?vue&type=script&setup=true&lang.ts
var ye = ["aria-label"], N = { class: "media-list-row__poster" }, be = { class: "media-list-row__body" }, P = { class: "media-list-row__title" }, F = ["href", "onClick"], I = ["href"], L = { class: "media-list-row__meta" }, R = {
	key: 0,
	class: "numeric"
}, xe = {
	key: 1,
	class: "media-list-row__dot"
}, Se = {
	key: 2,
	class: "media-list-row__cert"
}, Ce = {
	key: 3,
	class: "media-list-row__dot"
}, we = {
	key: 4,
	class: "numeric"
}, Te = {
	key: 0,
	class: "media-list-row__overview"
}, Ee = {
	key: 1,
	class: "media-list-row__overview media-list-row__overview--empty"
}, De = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		let n = e, r = t, i = x(M, null), a = m(() => `/app/media/${n.item.id}`), o = m(() => ({
			height: "180px",
			gridTemplateColumns: "120px minmax(0, 1fr)"
		})), ee = m(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (w(), _("article", {
			class: "media-list-row",
			style: C(o.value),
			"aria-label": e.item.name
		}, [v("div", N, [y(ne, {
			item: e.item,
			"can-match": e.canMatch,
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
		}, null, 8, ["item", "can-match"])]), v("div", be, [
			v("h3", P, [O(i) ? (w(), h(O(j), {
				key: 0,
				to: a.value,
				custom: ""
			}, {
				default: A(({ navigate: t }) => [v("a", {
					href: a.value,
					class: "media-list-row__link",
					onClick: t
				}, D(e.item.name), 9, F)]),
				_: 1
			}, 8, ["to"])) : (w(), _("a", {
				key: 1,
				href: a.value,
				class: "media-list-row__link"
			}, D(e.item.name), 9, I))]),
			v("div", L, [
				e.item.year ? (w(), _("span", R, D(e.item.year), 1)) : g("", !0),
				e.item.year && (e.item.rating || e.item.runtime) ? (w(), _("span", xe)) : g("", !0),
				e.item.rating ? (w(), _("span", Se, D(e.item.rating), 1)) : g("", !0),
				e.item.rating && e.item.runtime ? (w(), _("span", Ce)) : g("", !0),
				e.item.runtime ? (w(), _("span", we, D(e.item.runtime) + "m", 1)) : g("", !0),
				(w(!0), _(p, null, E(ee.value, (e) => (w(), _("span", {
					key: e,
					class: "media-list-row__genre"
				}, D(e), 1))), 128))
			]),
			e.item.overview ? (w(), _("p", Te, D(e.item.overview), 1)) : (w(), _("p", Ee, " No description yet. "))
		])], 12, ye));
	}
}), [["__scopeId", "data-v-89a50aa9"]]), Oe = ["aria-label"], ke = ["data-wash"], Ae = ["src", "srcset"], je = { class: "media-backdrop-row__poster" }, Me = { class: "media-backdrop-row__body" }, Ne = { class: "media-backdrop-row__title" }, Pe = ["href", "onClick"], Fe = ["href"], z = { class: "media-backdrop-row__meta" }, Ie = {
	key: 0,
	class: "numeric"
}, Le = {
	key: 1,
	class: "media-backdrop-row__dot"
}, Re = {
	key: 2,
	class: "media-backdrop-row__cert"
}, ze = {
	key: 3,
	class: "media-backdrop-row__dot"
}, B = {
	key: 4,
	class: "numeric"
}, V = {
	key: 0,
	class: "media-backdrop-row__overview"
}, Be = {
	key: 1,
	class: "media-backdrop-row__overview media-backdrop-row__overview--empty"
}, Ve = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		let { imgSrc: n, imgSrcset: r } = a(), i = e, o = t, ee = x(M, null), s = m(() => `/app/media/${i.item.id}`), c = m(() => i.item.backdrop_url ?? null), l = m(() => i.item.backdrop_srcset ?? null), u = m(() => c.value !== null || l.value !== null), d = m(() => u.value ? null : i.item.poster_url ?? null), te = m(() => d.value ? { backgroundImage: `url(${n(d.value)})` } : {}), re = m(() => u.value || d.value !== null), ie = m(() => u.value ? "backdrop" : d.value ? "ambient" : null), f = T(!1), ae = T(null);
		function oe() {
			f.value = !0;
		}
		ge(() => {
			ae.value?.complete && (f.value = !0);
		}), k([c, l], () => {
			f.value = !1;
		});
		let se = m(() => ({
			height: "300px",
			"--backdrop-row-poster": "200px",
			"--backdrop-row-poster-narrow": "120px"
		})), ce = m(() => i.item.genres?.slice(0, 3) ?? []);
		return (t, i) => (w(), _("article", {
			class: "media-backdrop-row",
			style: C(se.value),
			"aria-label": e.item.name
		}, [
			re.value ? (w(), _("div", {
				key: 0,
				class: S(["media-backdrop-row__wash", `media-backdrop-row__wash--${ie.value}`]),
				"data-wash": ie.value,
				"aria-hidden": "true"
			}, [u.value ? (w(), _("img", {
				key: 0,
				ref_key: "imgEl",
				ref: ae,
				class: S(["media-backdrop-row__img", { "is-loaded": f.value }]),
				loading: "lazy",
				src: O(n)(c.value) || void 0,
				srcset: O(r)(l.value) || void 0,
				sizes: "calc(100vw - 40px)",
				alt: "",
				decoding: "async",
				onLoad: oe
			}, null, 42, Ae)) : (w(), _("div", {
				key: 1,
				class: "media-backdrop-row__ambient",
				style: C(te.value)
			}, null, 4)), i[10] ||= v("div", { class: "media-backdrop-row__scrim" }, null, -1)], 10, ke)) : g("", !0),
			v("div", je, [y(ne, {
				item: e.item,
				"can-match": e.canMatch,
				"poster-sizes": "200px",
				"hide-caption": "",
				role: "presentation",
				onPlay: i[0] ||= (t) => o("play", e.item),
				onWatchlist: i[1] ||= (t) => o("watchlist", e.item),
				onInfo: i[2] ||= (t) => o("info", e.item),
				onMatch: i[3] ||= (t) => o("match", e.item),
				onMarkWatched: i[4] ||= (t) => o("mark-watched", e.item),
				onRefresh: i[5] ||= (t) => o("refresh", e.item),
				onChoosePoster: i[6] ||= (t) => o("choose-poster", e.item),
				onRemove: i[7] ||= (t) => o("remove", e.item),
				onEditMetadata: i[8] ||= (t) => o("edit-metadata", e.item),
				onExploreData: i[9] ||= (t) => o("explore-data", e.item)
			}, null, 8, ["item", "can-match"])]),
			v("div", Me, [
				v("h3", Ne, [O(ee) ? (w(), h(O(j), {
					key: 0,
					to: s.value,
					custom: ""
				}, {
					default: A(({ navigate: t }) => [v("a", {
						href: s.value,
						class: "media-backdrop-row__link",
						onClick: t
					}, D(e.item.name), 9, Pe)]),
					_: 1
				}, 8, ["to"])) : (w(), _("a", {
					key: 1,
					href: s.value,
					class: "media-backdrop-row__link"
				}, D(e.item.name), 9, Fe))]),
				v("div", z, [
					e.item.year ? (w(), _("span", Ie, D(e.item.year), 1)) : g("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (w(), _("span", Le)) : g("", !0),
					e.item.rating ? (w(), _("span", Re, D(e.item.rating), 1)) : g("", !0),
					e.item.rating && e.item.runtime ? (w(), _("span", ze)) : g("", !0),
					e.item.runtime ? (w(), _("span", B, D(e.item.runtime) + "m", 1)) : g("", !0),
					(w(!0), _(p, null, E(ce.value, (e) => (w(), _("span", {
						key: e,
						class: "media-backdrop-row__genre"
					}, D(e), 1))), 128))
				]),
				e.item.overview ? (w(), _("p", V, D(e.item.overview), 1)) : (w(), _("p", Be, " No description yet. "))
			])
		], 12, Oe));
	}
}), [["__scopeId", "data-v-ba813cb2"]]), He = ["aria-label", "aria-rowindex"], H = {
	class: "media-table-row__cell media-table-row__cell--poster",
	role: "cell"
}, Ue = {
	class: "media-table-row__cell media-table-row__cell--title",
	role: "cell"
}, U = { class: "media-table-row__title" }, We = ["href", "onClick"], Ge = ["href"], W = {
	class: "media-table-row__cell media-table-row__cell--year numeric",
	role: "cell"
}, Ke = {
	class: "media-table-row__cell media-table-row__cell--rating",
	role: "cell"
}, qe = {
	key: 0,
	class: "media-table-row__cert"
}, Je = {
	class: "media-table-row__cell media-table-row__cell--runtime numeric",
	role: "cell"
}, Ye = {
	class: "media-table-row__cell media-table-row__cell--genres",
	role: "cell"
}, Xe = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "MediaTableRow",
	props: {
		item: {},
		index: { default: 0 },
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
		let n = e, r = t, i = x(M, null), a = m(() => `/app/media/${n.item.id}`), o = m(() => Math.max(0, Math.trunc(n.index)) + 2), ee = m(() => ({
			height: "180px",
			gridTemplateColumns: f
		})), s = m(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (w(), _("div", {
			class: "media-table-row",
			role: "row",
			"aria-label": e.item.name,
			"aria-rowindex": o.value,
			style: C(ee.value)
		}, [
			v("div", H, [y(ne, {
				item: e.item,
				"can-match": e.canMatch,
				"poster-sizes": "120px",
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
			v("div", Ue, [v("h3", U, [O(i) ? (w(), h(O(j), {
				key: 0,
				to: a.value,
				custom: ""
			}, {
				default: A(({ navigate: t }) => [v("a", {
					href: a.value,
					class: "media-table-row__link",
					onClick: t
				}, D(e.item.name), 9, We)]),
				_: 1
			}, 8, ["to"])) : (w(), _("a", {
				key: 1,
				href: a.value,
				class: "media-table-row__link"
			}, D(e.item.name), 9, Ge))])]),
			v("div", W, D(e.item.year ?? "—"), 1),
			v("div", Ke, [e.item.rating ? (w(), _("span", qe, D(e.item.rating), 1)) : (w(), _(p, { key: 1 }, [pe("—")], 64))]),
			v("div", Je, D(e.item.runtime ? `${e.item.runtime}m` : "—"), 1),
			v("div", Ye, [(w(!0), _(p, null, E(s.value, (e) => (w(), _("span", {
				key: e,
				class: "media-table-row__genre"
			}, D(e), 1))), 128)), s.value.length === 0 ? (w(), _(p, { key: 0 }, [pe("—")], 64)) : g("", !0)])
		], 12, He));
	}
}), [["__scopeId", "data-v-dcad01bb"]]), Ze = ["aria-label"], G = [
	"disabled",
	"aria-label",
	"onClick"
], K = { class: "index-rail__label" }, q = {
	class: "index-rail__full",
	"aria-hidden": "true"
}, Qe = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "IndexRail",
	props: {
		buckets: {},
		cssPrefix: { default: "index-rail" },
		navLabel: { default: "Jump to a bucket" }
	},
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (w(), _("nav", {
			class: "index-rail",
			"aria-label": e.navLabel
		}, [(w(!0), _(p, null, E(e.buckets, (t) => (w(), _("button", {
			key: t.key,
			type: "button",
			class: S([`${e.cssPrefix}__btn`, { "is-empty": t.count === 0 }]),
			disabled: t.count === 0,
			"aria-label": t.ariaLabel ?? `Jump to ${t.label} (${t.count})`,
			onClick: (e) => n("jump", t.offset)
		}, [v("span", K, D(t.label), 1), v("span", q, D(t.label), 1)], 10, G))), 128))], 8, Ze));
	}
}), [["__scopeId", "data-v-4b01327c"]]), J = /* @__PURE__ */ new Map();
function Y(e) {
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
async function X(e, t, r) {
	let i = new n({ baseUrl: e }), a = new URLSearchParams();
	a.set("field", t.field), t.order && a.set("order", t.order), t.libraryId && a.set("libraryId", t.libraryId), t.query && a.set("search", t.query), t.topLevel && a.set("topLevel", "1"), t.yearMin !== void 0 && a.set("yearFrom", String(t.yearMin)), t.yearMax !== void 0 && a.set("yearTo", String(t.yearMax)), t.match && a.set("match", t.match), t.genres?.forEach((e) => a.append("genres[]", e)), t.ratings?.forEach((e) => a.append("ratings[]", String(e))), t.actors?.forEach((e) => a.append("actors[]", e)), t.studios?.forEach((e) => a.append("companies[]", e));
	let o = await i.get(`/api/v1/media/index?${a.toString()}`, void 0, r);
	return {
		field: o.field ?? t.field,
		buckets: Array.isArray(o.buckets) ? o.buckets : [],
		total: typeof o.total == "number" ? o.total : 0
	};
}
async function $e(e, t, n) {
	let r = Y(t), i = J.get(r);
	if (i && Date.now() - i.ts < 3e5) return i.data;
	try {
		let i = await X(e, t, n);
		return J.set(r, {
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
var et = { class: "library-page" }, tt = {
	key: 1,
	class: "library"
}, nt = { class: "library-header" }, rt = { class: "library-title" }, it = { class: "library-count numeric" }, at = [
	"role",
	"aria-label",
	"aria-rowcount"
], ot = {
	key: 0,
	class: "library-table__head",
	role: "rowgroup"
}, st = 1, Z = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "LibraryPage",
	setup(e) {
		let a = r(), b = _e(), x = ve(), C = oe(), j = c(), M = i(), ye = o(), N = ee(), be = s(), P = t(), F = m(() => P.viewMode === "list"), I = m(() => P.viewMode === "backdrop"), L = m(() => P.viewMode === "table"), R = m(() => L.value && C.items.length > 0), xe = m(() => C.total > 0 ? C.total + 1 : -1), Se = { gridTemplateColumns: f }, Ce = re(180), we = re(300), Te = re(180), Ee = m(() => F.value || I.value || L.value ? st : void 0), Oe = m(() => F.value ? Ce : I.value ? we : L.value ? Te : void 0), ke = T(null), Ae = T([]), je = null, Me = m(() => Ae.value.some((e) => e.count > 0));
		async function Ne() {
			je?.abort();
			let e = new AbortController();
			je = e;
			let t = C.queryParams, n = await $e(a.value, {
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
			e.signal.aborted || (Ae.value = n.buckets);
		}
		function Pe(e) {
			ke.value?.scrollToIndex(e);
		}
		let Fe = T(null), z = T(!1), Ie = T(!1), Le = T(null), { inspectorItem: Re, inspectorOpen: ze, openInspector: B } = de();
		function V(e) {
			Fe.value = e, z.value = !0;
		}
		function Be() {
			W();
		}
		function He(e) {
			C.items = C.items.map((t) => t.id === e.id ? e : t), N.success(`Updated poster for "${e.name}"`);
		}
		let H = m(() => {
			let e = b.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), Ue = m(() => j.byId(H.value)?.name ?? "Library");
		d(() => j.byId(H.value)?.name);
		let U = m(() => j.byId(H.value)?.type === "music");
		k([H, U], () => {
			U.value && C.sort === "name" ? (C.setSort("artist"), C.reset(), C.fetchMedia(a.value)) : !U.value && C.sort === "artist" && (C.setSort("name"), C.reset(), C.fetchMedia(a.value));
		}, { immediate: !0 });
		function We() {
			H.value && (C.clearFilters(), C.setLibraryId(H.value), C.setTopLevel(!0), Ge(), C.reset(), C.fetchMedia(a.value), Ne());
		}
		function Ge() {
			let e = b.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && C.setActors(t);
			let n = b.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && C.setGenres(r);
			let i = b.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && C.setCompanies(a);
			let o = Array.isArray(b.query.match) ? b.query.match[0] : b.query.match;
			(o === "matched" || o === "unmatched") && C.setMatchStatus(o);
		}
		function W() {
			C.reset(), C.fetchMedia(a.value), Ne();
		}
		ge(() => {
			j.load(a.value), We();
		}), k(H, We), k(a, W), k(() => C.sort, () => {
			Ne();
		}), he(() => {
			C.setLibraryId(void 0), C.setTopLevel(!1), C.clearFilters(), C.reset();
		});
		function Ke() {
			W();
		}
		function qe(e, t) {
			C.ensureRange(a.value, e, t);
		}
		function Je(e, t) {
			x?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let Ye = null;
		function Ze(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function G(e) {
			Ye?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			Ye = t;
			let r = () => t !== Ye;
			try {
				let i = new n({ baseUrl: a.value }), o = await fe(i, a.value, e, ye.resumeMap, t?.signal);
				if (r()) return;
				if (!o) {
					N.info("Nothing to play yet");
					return;
				}
				Je("player", o.id);
			} catch (e) {
				if (r() || Ze(e)) return;
				N.info("Nothing to play yet");
			}
		}
		function K() {}
		function q(e) {
			x?.hasRoute("media") && Je("media", e.id);
		}
		function J(e) {
			be.isWatched(e.id) ? N.success(`Marked "${e.name}" as watched`) : N.info(`Marked "${e.name}" as unwatched`);
		}
		function Y(e) {
			Fe.value = e, z.value = !0;
		}
		function X(e) {
			Le.value = e, Ie.value = !0;
		}
		let Z = null, Q = T(null);
		function $(e) {
			Q.value = e;
		}
		async function ct() {
			let e = Q.value;
			if (Q.value = null, !e) return;
			Z?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			Z = t;
			let r = () => t !== Z;
			try {
				if (await new n({ baseUrl: a.value }).deleteMediaItem(e.id), r()) return;
				C.items = C.items.filter((t) => t.id !== e.id), N.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || Ze(t)) return;
				N.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (w(), _("div", et, [
			H.value ? (w(), _("section", tt, [
				v("div", nt, [v("h1", rt, D(Ue.value), 1), v("span", it, D(O(C).total.toLocaleString()) + " titles", 1)]),
				y(se, {
					"show-artist-sort": U.value,
					onChange: Ke
				}, null, 8, ["show-artist-sort"]),
				O(C).error ? (w(), h(l, {
					key: 0,
					icon: "alert",
					title: "Couldn't load titles",
					description: O(C).error
				}, {
					actions: A(() => [y(u, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: W
					}, {
						default: A(() => [...t[4] ||= [pe("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : g("", !0),
				v("div", {
					class: "library-table",
					role: R.value ? "table" : void 0,
					"aria-label": R.value ? `${Ue.value} titles` : void 0,
					"aria-rowcount": R.value ? xe.value : void 0
				}, [R.value ? (w(), _("div", ot, [v("div", {
					class: "library-table__head-row",
					role: "row",
					"aria-rowindex": "1",
					style: Se
				}, [(w(!0), _(p, null, E(O(ie), (e, t) => (w(), _("span", {
					key: e.label,
					class: S(["library-table__head-cell", { "library-table__head-cell--hidden": t === 0 }]),
					role: "columnheader"
				}, D(e.label), 3))), 128))])])) : g("", !0), y(ae, {
					ref_key: "gridRef",
					ref: ke,
					"data-view-mode": O(P).viewMode,
					"grid-role": R.value ? "rowgroup" : void 0,
					items: O(C).items,
					total: O(C).total,
					loading: O(C).loading && O(C).items.length === 0,
					"loading-more": O(C).loading && O(C).items.length > 0,
					"has-more": O(C).hasMore,
					"can-match": O(M).isAdmin,
					columns: Ee.value,
					"row-height": Oe.value,
					onNeedRange: qe,
					onPlay: G,
					onWatchlist: K,
					onInfo: q,
					onMatch: V,
					onMarkWatched: J,
					onRefresh: Y,
					onEditMetadata: V,
					onExploreData: O(B),
					onChoosePoster: X,
					onRemove: $
				}, {
					card: A(({ item: e, index: t }) => [F.value ? (w(), h(De, {
						key: 0,
						item: e,
						"can-match": O(M).isAdmin,
						onPlay: G,
						onWatchlist: K,
						onInfo: q,
						onMatch: V,
						onMarkWatched: J,
						onRefresh: Y,
						onChoosePoster: X,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: O(B)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : I.value ? (w(), h(Ve, {
						key: 1,
						item: e,
						"can-match": O(M).isAdmin,
						onPlay: G,
						onWatchlist: K,
						onInfo: q,
						onMatch: V,
						onMarkWatched: J,
						onRefresh: Y,
						onChoosePoster: X,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: O(B)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : L.value ? (w(), h(Xe, {
						key: 2,
						item: e,
						index: t,
						"can-match": O(M).isAdmin,
						onPlay: G,
						onWatchlist: K,
						onInfo: q,
						onMatch: V,
						onMarkWatched: J,
						onRefresh: Y,
						onChoosePoster: X,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: O(B)
					}, null, 8, [
						"item",
						"index",
						"can-match",
						"onExploreData"
					])) : (w(), h(ne, {
						key: 3,
						item: e,
						"can-match": O(M).isAdmin,
						onPlay: G,
						onWatchlist: K,
						onInfo: q,
						onMatch: V,
						onMarkWatched: J,
						onRefresh: Y,
						onChoosePoster: X,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: O(B)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					]))]),
					_: 1
				}, 8, [
					"data-view-mode",
					"grid-role",
					"items",
					"total",
					"loading",
					"loading-more",
					"has-more",
					"can-match",
					"columns",
					"row-height",
					"onExploreData"
				])], 8, at),
				Me.value ? (w(), h(Qe, {
					key: 1,
					buckets: Ae.value,
					onJump: Pe
				}, null, 8, ["buckets"])) : g("", !0)
			])) : (w(), h(l, {
				key: 0,
				icon: "alert",
				title: "Library not found",
				description: "No library was specified."
			})),
			O(M).isAdmin ? (w(), h(ce, {
				key: 2,
				modelValue: z.value,
				"onUpdate:modelValue": t[0] ||= (e) => z.value = e,
				item: Fe.value,
				onApplied: Be
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			O(M).isAdmin ? (w(), h(le, {
				key: 3,
				modelValue: Ie.value,
				"onUpdate:modelValue": t[1] ||= (e) => Ie.value = e,
				item: Le.value,
				onApplied: He
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			y(te, {
				open: Q.value !== null,
				message: Q.value ? `Remove “${Q.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || (Q.value = null);
				},
				onConfirm: ct
			}, null, 8, ["open", "message"]),
			O(M).isAdmin ? (w(), h(ue, {
				key: 4,
				modelValue: O(ze),
				"onUpdate:modelValue": t[3] ||= (e) => me(ze) ? ze.value = e : null,
				item: O(Re)
			}, null, 8, ["modelValue", "item"])) : g("", !0)
		]));
	}
}), [["__scopeId", "data-v-b47ed4e2"]]);
//#endregion
export { Z as default };

//# sourceMappingURL=LibraryPage-DGIfh7D-.js.map