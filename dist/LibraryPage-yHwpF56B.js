import { n as e } from "./useApiBase-DXTBY90j.js";
import { t } from "./useMediaStore-BNs5Udu4.js";
import { t as n } from "./useLibrariesStore-D1e4YWGm.js";
import { t as r } from "./useAuthStore-DmpzSF_9.js";
import { n as i } from "./ThumbRating-BJeVZ-kT.js";
import { a } from "./usePreferencesStore-DrDMAwjz.js";
import { i as o, n as s, r as c, t as l } from "./MediaGrid-B5VtG8Bd.js";
import { t as u } from "./MediaCard-FshcLJdX.js";
import { n as d } from "./Icon-55iG1rR7.js";
import { t as f } from "./useImageSrc-CSM61b-l.js";
import { t as p } from "./FilterBar-Bt4z6ERo.js";
import { t as ee } from "./EmptyState-DjfWh3kt.js";
import { t as te } from "./Button-BLpPomsd.js";
import { t as ne } from "./MetadataMatchModal-BUBkYFu1.js";
import { t as m } from "./PosterPicker-DI5VADn3.js";
import { t as re } from "./ConfirmDialog-CxxvEuyE.js";
import { n as ie, t as ae } from "./useItemInspector-DjCGX2EN.js";
import { t as oe } from "./client-fSGeXil2.js";
import { r as se } from "./useResolvePlayable-CnOPgUvz.js";
import { i as ce } from "./usePlayerStore-DEpGyPe5.js";
import { t as le } from "./useToastStore-Bu-iYU7r.js";
import { i as ue } from "./usePageTitle-j6j9gAmo.js";
import { t as de } from "./useMessages-BD3JvKjZ.js";
import { Fragment as h, computed as g, createBlock as _, createCommentVNode as v, createElementBlock as y, createElementVNode as b, createTextVNode as fe, createVNode as x, defineComponent as S, inject as C, isRef as pe, normalizeClass as me, normalizeStyle as w, onBeforeUnmount as he, onMounted as ge, openBlock as T, ref as E, renderList as D, toDisplayString as O, unref as k, watch as A, withCtx as j } from "vue";
import { RouterLink as M, routerKey as N, useRoute as _e, useRouter as ve } from "vue-router";
// src/components/MediaListRow.vue?vue&type=script&setup=true&lang.ts
var ye = ["aria-label"], P = { class: "media-list-row__poster" }, F = { class: "media-list-row__body" }, be = { class: "media-list-row__title" }, I = ["href", "onClick"], xe = ["href"], Se = { class: "media-list-row__meta" }, L = {
	key: 0,
	class: "numeric"
}, R = {
	key: 1,
	class: "media-list-row__dot"
}, Ce = {
	key: 2,
	class: "media-list-row__cert"
}, we = {
	key: 3,
	class: "media-list-row__dot"
}, Te = {
	key: 4,
	class: "numeric"
}, Ee = {
	key: 0,
	class: "media-list-row__overview"
}, De = {
	key: 1,
	class: "media-list-row__overview media-list-row__overview--empty"
}, Oe = /*#__PURE__*/ d(/* @__PURE__ */ S({
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
		let n = e, r = t, i = C(N, null), a = g(() => `/app/media/${n.item.id}`), o = g(() => ({
			height: "180px",
			gridTemplateColumns: "120px minmax(0, 1fr)"
		})), s = g(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (T(), y("article", {
			class: "media-list-row",
			style: w(o.value),
			"aria-label": e.item.name
		}, [b("div", P, [x(u, {
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
		}, null, 8, ["item", "can-match"])]), b("div", F, [
			b("h3", be, [k(i) ? (T(), _(k(M), {
				key: 0,
				to: a.value,
				custom: ""
			}, {
				default: j(({ navigate: t }) => [b("a", {
					href: a.value,
					class: "media-list-row__link",
					onClick: t
				}, O(e.item.name), 9, I)]),
				_: 1
			}, 8, ["to"])) : (T(), y("a", {
				key: 1,
				href: a.value,
				class: "media-list-row__link"
			}, O(e.item.name), 9, xe))]),
			b("div", Se, [
				e.item.year ? (T(), y("span", L, O(e.item.year), 1)) : v("", !0),
				e.item.year && (e.item.rating || e.item.runtime) ? (T(), y("span", R)) : v("", !0),
				e.item.rating ? (T(), y("span", Ce, O(e.item.rating), 1)) : v("", !0),
				e.item.rating && e.item.runtime ? (T(), y("span", we)) : v("", !0),
				e.item.runtime ? (T(), y("span", Te, O(e.item.runtime) + "m", 1)) : v("", !0),
				(T(!0), y(h, null, D(s.value, (e) => (T(), y("span", {
					key: e,
					class: "media-list-row__genre"
				}, O(e), 1))), 128))
			]),
			e.item.overview ? (T(), y("p", Ee, O(e.item.overview), 1)) : (T(), y("p", De, " No description yet. "))
		])], 12, ye));
	}
}), [["__scopeId", "data-v-89a50aa9"]]), ke = ["aria-label"], Ae = ["data-wash"], je = ["src", "srcset"], Me = { class: "media-backdrop-row__poster" }, Ne = { class: "media-backdrop-row__body" }, Pe = { class: "media-backdrop-row__title" }, Fe = ["href", "onClick"], Ie = ["href"], Le = { class: "media-backdrop-row__meta" }, z = {
	key: 0,
	class: "numeric"
}, Re = {
	key: 1,
	class: "media-backdrop-row__dot"
}, ze = {
	key: 2,
	class: "media-backdrop-row__cert"
}, Be = {
	key: 3,
	class: "media-backdrop-row__dot"
}, Ve = {
	key: 4,
	class: "numeric"
}, B = {
	key: 0,
	class: "media-backdrop-row__overview"
}, V = {
	key: 1,
	class: "media-backdrop-row__overview media-backdrop-row__overview--empty"
}, He = /*#__PURE__*/ d(/* @__PURE__ */ S({
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
		let { imgSrc: n, imgSrcset: r } = f(), i = e, a = t, o = C(N, null), s = g(() => `/app/media/${i.item.id}`), c = g(() => i.item.backdrop_url ?? null), l = g(() => i.item.backdrop_srcset ?? null), d = g(() => c.value !== null || l.value !== null), p = g(() => d.value ? null : i.item.poster_url ?? null), ee = g(() => p.value ? { backgroundImage: `url(${n(p.value)})` } : {}), te = g(() => d.value || p.value !== null), ne = g(() => d.value ? "backdrop" : p.value ? "ambient" : null), m = E(!1), re = E(null);
		function ie() {
			m.value = !0;
		}
		ge(() => {
			re.value?.complete && (m.value = !0);
		}), A([c, l], () => {
			m.value = !1;
		});
		let ae = g(() => ({
			height: "300px",
			"--backdrop-row-poster": "200px",
			"--backdrop-row-poster-narrow": "120px"
		})), oe = g(() => i.item.genres?.slice(0, 3) ?? []);
		return (t, i) => (T(), y("article", {
			class: "media-backdrop-row",
			style: w(ae.value),
			"aria-label": e.item.name
		}, [
			te.value ? (T(), y("div", {
				key: 0,
				class: me(["media-backdrop-row__wash", `media-backdrop-row__wash--${ne.value}`]),
				"data-wash": ne.value,
				"aria-hidden": "true"
			}, [d.value ? (T(), y("img", {
				key: 0,
				ref_key: "imgEl",
				ref: re,
				class: me(["media-backdrop-row__img", { "is-loaded": m.value }]),
				loading: "lazy",
				src: k(n)(c.value) || void 0,
				srcset: k(r)(l.value) || void 0,
				sizes: "calc(100vw - 40px)",
				alt: "",
				decoding: "async",
				onLoad: ie
			}, null, 42, je)) : (T(), y("div", {
				key: 1,
				class: "media-backdrop-row__ambient",
				style: w(ee.value)
			}, null, 4)), i[10] ||= b("div", { class: "media-backdrop-row__scrim" }, null, -1)], 10, Ae)) : v("", !0),
			b("div", Me, [x(u, {
				item: e.item,
				"can-match": e.canMatch,
				"poster-sizes": "200px",
				"hide-caption": "",
				role: "presentation",
				onPlay: i[0] ||= (t) => a("play", e.item),
				onWatchlist: i[1] ||= (t) => a("watchlist", e.item),
				onInfo: i[2] ||= (t) => a("info", e.item),
				onMatch: i[3] ||= (t) => a("match", e.item),
				onMarkWatched: i[4] ||= (t) => a("mark-watched", e.item),
				onRefresh: i[5] ||= (t) => a("refresh", e.item),
				onChoosePoster: i[6] ||= (t) => a("choose-poster", e.item),
				onRemove: i[7] ||= (t) => a("remove", e.item),
				onEditMetadata: i[8] ||= (t) => a("edit-metadata", e.item),
				onExploreData: i[9] ||= (t) => a("explore-data", e.item)
			}, null, 8, ["item", "can-match"])]),
			b("div", Ne, [
				b("h3", Pe, [k(o) ? (T(), _(k(M), {
					key: 0,
					to: s.value,
					custom: ""
				}, {
					default: j(({ navigate: t }) => [b("a", {
						href: s.value,
						class: "media-backdrop-row__link",
						onClick: t
					}, O(e.item.name), 9, Fe)]),
					_: 1
				}, 8, ["to"])) : (T(), y("a", {
					key: 1,
					href: s.value,
					class: "media-backdrop-row__link"
				}, O(e.item.name), 9, Ie))]),
				b("div", Le, [
					e.item.year ? (T(), y("span", z, O(e.item.year), 1)) : v("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (T(), y("span", Re)) : v("", !0),
					e.item.rating ? (T(), y("span", ze, O(e.item.rating), 1)) : v("", !0),
					e.item.rating && e.item.runtime ? (T(), y("span", Be)) : v("", !0),
					e.item.runtime ? (T(), y("span", Ve, O(e.item.runtime) + "m", 1)) : v("", !0),
					(T(!0), y(h, null, D(oe.value, (e) => (T(), y("span", {
						key: e,
						class: "media-backdrop-row__genre"
					}, O(e), 1))), 128))
				]),
				e.item.overview ? (T(), y("p", B, O(e.item.overview), 1)) : (T(), y("p", V, " No description yet. "))
			])
		], 12, ke));
	}
}), [["__scopeId", "data-v-ba813cb2"]]), Ue = ["aria-label", "aria-rowindex"], We = {
	class: "media-table-row__cell media-table-row__cell--poster",
	role: "cell"
}, H = {
	class: "media-table-row__cell media-table-row__cell--title",
	role: "cell"
}, Ge = { class: "media-table-row__title" }, U = ["href", "onClick"], Ke = ["href"], qe = {
	class: "media-table-row__cell media-table-row__cell--year numeric",
	role: "cell"
}, W = {
	class: "media-table-row__cell media-table-row__cell--rating",
	role: "cell"
}, Je = {
	key: 0,
	class: "media-table-row__cert"
}, Ye = {
	class: "media-table-row__cell media-table-row__cell--runtime numeric",
	role: "cell"
}, Xe = {
	class: "media-table-row__cell media-table-row__cell--genres",
	role: "cell"
}, Ze = /*#__PURE__*/ d(/* @__PURE__ */ S({
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
		let n = e, r = t, i = C(N, null), a = g(() => `/app/media/${n.item.id}`), o = g(() => Math.max(0, Math.trunc(n.index)) + 2), s = g(() => ({
			height: "180px",
			gridTemplateColumns: c
		})), l = g(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (T(), y("div", {
			class: "media-table-row",
			role: "row",
			"aria-label": e.item.name,
			"aria-rowindex": o.value,
			style: w(s.value)
		}, [
			b("div", We, [x(u, {
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
			b("div", H, [b("h3", Ge, [k(i) ? (T(), _(k(M), {
				key: 0,
				to: a.value,
				custom: ""
			}, {
				default: j(({ navigate: t }) => [b("a", {
					href: a.value,
					class: "media-table-row__link",
					onClick: t
				}, O(e.item.name), 9, U)]),
				_: 1
			}, 8, ["to"])) : (T(), y("a", {
				key: 1,
				href: a.value,
				class: "media-table-row__link"
			}, O(e.item.name), 9, Ke))])]),
			b("div", qe, O(e.item.year ?? "—"), 1),
			b("div", W, [e.item.rating ? (T(), y("span", Je, O(e.item.rating), 1)) : (T(), y(h, { key: 1 }, [fe("—")], 64))]),
			b("div", Ye, O(e.item.runtime ? `${e.item.runtime}m` : "—"), 1),
			b("div", Xe, [(T(!0), y(h, null, D(l.value, (e) => (T(), y("span", {
				key: e,
				class: "media-table-row__genre"
			}, O(e), 1))), 128)), l.value.length === 0 ? (T(), y(h, { key: 0 }, [fe("—")], 64)) : v("", !0)])
		], 12, Ue));
	}
}), [["__scopeId", "data-v-dcad01bb"]]), G = ["aria-label"], Qe = [
	"disabled",
	"aria-label",
	"onClick"
], K = { class: "index-rail__label" }, q = {
	class: "index-rail__full",
	"aria-hidden": "true"
}, $e = /*#__PURE__*/ d(/* @__PURE__ */ S({
	__name: "IndexRail",
	props: {
		buckets: {},
		cssPrefix: { default: "index-rail" },
		navLabel: { default: "Jump to a bucket" }
	},
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (T(), y("nav", {
			class: "index-rail",
			"aria-label": e.navLabel
		}, [(T(!0), y(h, null, D(e.buckets, (t) => (T(), y("button", {
			key: t.key,
			type: "button",
			class: me([`${e.cssPrefix}__btn`, { "is-empty": t.count === 0 }]),
			disabled: t.count === 0,
			"aria-label": t.ariaLabel ?? `Jump to ${t.label} (${t.count})`,
			onClick: (e) => n("jump", t.offset)
		}, [b("span", K, O(t.label), 1), b("span", q, O(t.label), 1)], 10, Qe))), 128))], 8, G));
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
async function X(e, t, n) {
	let r = new oe({ baseUrl: e }), i = new URLSearchParams();
	i.set("field", t.field), t.order && i.set("order", t.order), t.libraryId && i.set("libraryId", t.libraryId), t.query && i.set("search", t.query), t.topLevel && i.set("topLevel", "1"), t.yearMin !== void 0 && i.set("yearFrom", String(t.yearMin)), t.yearMax !== void 0 && i.set("yearTo", String(t.yearMax)), t.match && i.set("match", t.match), t.genres?.forEach((e) => i.append("genres[]", e)), t.ratings?.forEach((e) => i.append("ratings[]", String(e))), t.actors?.forEach((e) => i.append("actors[]", e)), t.studios?.forEach((e) => i.append("companies[]", e));
	let a = await r.get(`/api/v1/media/index?${i.toString()}`, void 0, n);
	return {
		field: a.field ?? t.field,
		buckets: Array.isArray(a.buckets) ? a.buckets : [],
		total: typeof a.total == "number" ? a.total : 0
	};
}
async function et(e, t, n) {
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
// src/pages/LibraryPage.vue?vue&type=script&setup=true&lang.ts
var tt = { class: "library-page" }, nt = {
	key: 1,
	class: "library"
}, rt = { class: "library-header" }, it = { class: "library-title" }, at = { class: "library-count numeric" }, ot = [
	"role",
	"aria-label",
	"aria-rowcount"
], st = {
	key: 0,
	class: "library-table__head",
	role: "rowgroup"
}, ct = 1, Z = /*#__PURE__*/ d(/* @__PURE__ */ S({
	__name: "LibraryPage",
	setup(d) {
		let f = e(), S = _e(), C = ve(), w = t(), M = n(), N = r(), ye = ce(), P = le(), { t: F } = de(), be = i(), I = a(), xe = g(() => I.viewMode === "list"), Se = g(() => I.viewMode === "backdrop"), L = g(() => I.viewMode === "table"), R = g(() => L.value && w.items.length > 0), Ce = g(() => w.total > 0 ? w.total + 1 : -1), we = { gridTemplateColumns: c }, Te = o(180), Ee = o(300), De = o(180), ke = g(() => xe.value || Se.value || L.value ? ct : void 0), Ae = g(() => xe.value ? Te : Se.value ? Ee : L.value ? De : void 0), je = E(null), Me = E([]), Ne = null, Pe = g(() => Me.value.some((e) => e.count > 0));
		async function Fe() {
			Ne?.abort();
			let e = new AbortController();
			Ne = e;
			let t = w.queryParams, n = await et(f.value, {
				field: w.sort,
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
			e.signal.aborted || (Me.value = n.buckets);
		}
		function Ie(e) {
			je.value?.scrollToIndex(e);
		}
		let Le = E(null), z = E(!1), Re = E(!1), ze = E(null), { inspectorItem: Be, inspectorOpen: Ve, openInspector: B } = ae();
		function V(e) {
			Le.value = e, z.value = !0;
		}
		function Ue() {
			W();
		}
		function We(e) {
			w.items = w.items.map((t) => t.id === e.id ? e : t), P.success(F("library.posterUpdated", { name: e.name }));
		}
		let H = g(() => {
			let e = S.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), Ge = g(() => M.byId(H.value)?.name ?? "Library");
		ue(() => M.byId(H.value)?.name);
		let U = g(() => M.byId(H.value)?.type === "music");
		A([H, U], () => {
			U.value && w.sort === "name" ? (w.setSort("artist"), w.reset(), w.fetchMedia(f.value)) : !U.value && w.sort === "artist" && (w.setSort("name"), w.reset(), w.fetchMedia(f.value));
		}, { immediate: !0 });
		function Ke() {
			H.value && (w.clearFilters(), w.setLibraryId(H.value), w.setTopLevel(!0), qe(), w.reset(), w.fetchMedia(f.value), Fe());
		}
		function qe() {
			let e = S.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && w.setActors(t);
			let n = S.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && w.setGenres(r);
			let i = S.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && w.setCompanies(a);
			let o = Array.isArray(S.query.match) ? S.query.match[0] : S.query.match;
			(o === "matched" || o === "unmatched") && w.setMatchStatus(o);
		}
		function W() {
			w.reset(), w.fetchMedia(f.value), Fe();
		}
		ge(() => {
			M.load(f.value), Ke();
		}), A(H, Ke), A(f, W), A(() => w.sort, () => {
			Fe();
		}), he(() => {
			w.setLibraryId(void 0), w.setTopLevel(!1), w.clearFilters(), w.reset();
		});
		function Je() {
			W();
		}
		function Ye(e, t) {
			w.ensureRange(f.value, e, t);
		}
		function Xe(e, t) {
			C?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let G = null;
		function Qe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function K(e) {
			G?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			G = t;
			let n = () => t !== G;
			try {
				let r = new oe({ baseUrl: f.value }), i = await se(r, f.value, e, ye.resumeMap, t?.signal);
				if (n()) return;
				if (!i) {
					P.info(F("library.nothingToPlay"));
					return;
				}
				Xe("player", i.id);
			} catch (e) {
				if (n() || Qe(e)) return;
				P.info(F("library.nothingToPlay"));
			}
		}
		function q() {}
		function J(e) {
			C?.hasRoute("media") && Xe("media", e.id);
		}
		function Y(e) {
			be.isWatched(e.id) ? P.success(F("library.markedWatched", { name: e.name })) : P.info(F("library.markedUnwatched", { name: e.name }));
		}
		function X(e) {
			Le.value = e, z.value = !0;
		}
		function Z(e) {
			ze.value = e, Re.value = !0;
		}
		let lt = null, Q = E(null);
		function $(e) {
			Q.value = e;
		}
		async function ut() {
			let e = Q.value;
			if (Q.value = null, !e) return;
			lt?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			lt = t;
			let n = () => t !== lt;
			try {
				if (await new oe({ baseUrl: f.value }).deleteMediaItem(e.id), n()) return;
				w.items = w.items.filter((t) => t.id !== e.id), P.success(F("library.itemRemoved", { name: e.name }));
			} catch (t) {
				if (n() || Qe(t)) return;
				P.error(F("library.itemRemoveFailed", { name: e.name }), { message: t instanceof Error ? t.message : F("library.unknownError") });
			}
		}
		return (e, t) => (T(), y("div", tt, [
			H.value ? (T(), y("section", nt, [
				b("div", rt, [b("h1", it, O(Ge.value), 1), b("span", at, O(k(F)("library.titlesCount", {
					count: k(w).total,
					total: k(w).total.toLocaleString()
				})), 1)]),
				x(p, {
					"show-artist-sort": U.value,
					onChange: Je
				}, null, 8, ["show-artist-sort"]),
				k(w).error ? (T(), _(ee, {
					key: 0,
					icon: "alert",
					title: k(F)("library.loadTitlesError"),
					description: k(w).error
				}, {
					actions: j(() => [x(te, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: W
					}, {
						default: j(() => [...t[4] ||= [fe("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : v("", !0),
				b("div", {
					class: "library-table",
					role: R.value ? "table" : void 0,
					"aria-label": R.value ? `${Ge.value} titles` : void 0,
					"aria-rowcount": R.value ? Ce.value : void 0
				}, [R.value ? (T(), y("div", st, [b("div", {
					class: "library-table__head-row",
					role: "row",
					"aria-rowindex": "1",
					style: we
				}, [(T(!0), y(h, null, D(k(s), (e, t) => (T(), y("span", {
					key: e.label,
					class: me(["library-table__head-cell", { "library-table__head-cell--hidden": t === 0 }]),
					role: "columnheader"
				}, O(e.label), 3))), 128))])])) : v("", !0), x(l, {
					ref_key: "gridRef",
					ref: je,
					"data-view-mode": k(I).viewMode,
					"grid-role": R.value ? "rowgroup" : void 0,
					items: k(w).items,
					total: k(w).total,
					loading: k(w).loading && k(w).items.length === 0,
					"loading-more": k(w).loading && k(w).items.length > 0,
					"has-more": k(w).hasMore,
					"can-match": k(N).isAdmin,
					columns: ke.value,
					"row-height": Ae.value,
					onNeedRange: Ye,
					onPlay: K,
					onWatchlist: q,
					onInfo: J,
					onMatch: V,
					onMarkWatched: Y,
					onRefresh: X,
					onEditMetadata: V,
					onExploreData: k(B),
					onChoosePoster: Z,
					onRemove: $
				}, {
					card: j(({ item: e, index: t }) => [xe.value ? (T(), _(Oe, {
						key: 0,
						item: e,
						"can-match": k(N).isAdmin,
						onPlay: K,
						onWatchlist: q,
						onInfo: J,
						onMatch: V,
						onMarkWatched: Y,
						onRefresh: X,
						onChoosePoster: Z,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: k(B)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : Se.value ? (T(), _(He, {
						key: 1,
						item: e,
						"can-match": k(N).isAdmin,
						onPlay: K,
						onWatchlist: q,
						onInfo: J,
						onMatch: V,
						onMarkWatched: Y,
						onRefresh: X,
						onChoosePoster: Z,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: k(B)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : L.value ? (T(), _(Ze, {
						key: 2,
						item: e,
						index: t,
						"can-match": k(N).isAdmin,
						onPlay: K,
						onWatchlist: q,
						onInfo: J,
						onMatch: V,
						onMarkWatched: Y,
						onRefresh: X,
						onChoosePoster: Z,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: k(B)
					}, null, 8, [
						"item",
						"index",
						"can-match",
						"onExploreData"
					])) : (T(), _(u, {
						key: 3,
						item: e,
						"can-match": k(N).isAdmin,
						onPlay: K,
						onWatchlist: q,
						onInfo: J,
						onMatch: V,
						onMarkWatched: Y,
						onRefresh: X,
						onChoosePoster: Z,
						onRemove: $,
						onEditMetadata: V,
						onExploreData: k(B)
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
				])], 8, ot),
				Pe.value ? (T(), _($e, {
					key: 1,
					buckets: Me.value,
					onJump: Ie
				}, null, 8, ["buckets"])) : v("", !0)
			])) : (T(), _(ee, {
				key: 0,
				icon: "alert",
				title: "Library not found",
				description: "No library was specified."
			})),
			k(N).isAdmin ? (T(), _(ne, {
				key: 2,
				modelValue: z.value,
				"onUpdate:modelValue": t[0] ||= (e) => z.value = e,
				item: Le.value,
				onApplied: Ue
			}, null, 8, ["modelValue", "item"])) : v("", !0),
			k(N).isAdmin ? (T(), _(m, {
				key: 3,
				modelValue: Re.value,
				"onUpdate:modelValue": t[1] ||= (e) => Re.value = e,
				item: ze.value,
				onApplied: We
			}, null, 8, ["modelValue", "item"])) : v("", !0),
			x(re, {
				open: Q.value !== null,
				message: Q.value ? `Remove “${Q.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || (Q.value = null);
				},
				onConfirm: ut
			}, null, 8, ["open", "message"]),
			k(N).isAdmin ? (T(), _(ie, {
				key: 4,
				modelValue: k(Ve),
				"onUpdate:modelValue": t[3] ||= (e) => pe(Ve) ? Ve.value = e : null,
				item: k(Be)
			}, null, 8, ["modelValue", "item"])) : v("", !0)
		]));
	}
}), [["__scopeId", "data-v-5a218806"]]);
export { Z as default };

//# sourceMappingURL=LibraryPage-yHwpF56B.js.map