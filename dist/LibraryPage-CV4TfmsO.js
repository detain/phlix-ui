import { n as e } from "./useApiBase-DXTBY90j.js";
import { t } from "./useMediaStore-0UTOORKf.js";
import { t as n } from "./useLibrariesStore-B_0XSAcs.js";
import { t as r } from "./useAuthStore-593BscZf.js";
import { n as i } from "./ThumbRating-BUadWtms.js";
import { a } from "./usePreferencesStore-DrDMAwjz.js";
import { i as o, n as s, r as c, t as l } from "./MediaGrid-Dqn1gKZ4.js";
import { t as ee } from "./MediaCard-CX07TiPm.js";
import { n as u } from "./Icon-CIbfiPrs.js";
import { t as d } from "./useImageSrc-CSM61b-l.js";
import { t as f } from "./FilterBar-DeWChXnL.js";
import { t as te } from "./EmptyState-BjOJ1k_A.js";
import { t as ne } from "./Button-1sKEdGjj.js";
import { t as re } from "./MetadataMatchModal-DMDBoFff.js";
import { t as p } from "./PosterPicker-Bs4qW7Qt.js";
import { t as ie } from "./ConfirmDialog-URxMkz9p.js";
import { n as ae, t as oe } from "./useItemInspector-BbWf5OeI.js";
import { t as se } from "./client-pLl-rDdN.js";
import { r as ce } from "./useResolvePlayable-CnOPgUvz.js";
import { i as le } from "./usePlayerStore-B7mnqLe3.js";
import { t as ue } from "./useToastStore-Bu-iYU7r.js";
import { i as de } from "./usePageTitle-j6j9gAmo.js";
import { Fragment as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as fe, createVNode as b, defineComponent as x, inject as S, isRef as pe, normalizeClass as me, normalizeStyle as C, onBeforeUnmount as he, onMounted as ge, openBlock as w, ref as T, renderList as E, toDisplayString as D, unref as O, watch as k, withCtx as A } from "vue";
import { RouterLink as j, routerKey as M, useRoute as _e, useRouter as ve } from "vue-router";
// src/components/MediaListRow.vue?vue&type=script&setup=true&lang.ts
var ye = ["aria-label"], N = { class: "media-list-row__poster" }, be = { class: "media-list-row__body" }, P = { class: "media-list-row__title" }, xe = ["href", "onClick"], Se = ["href"], F = { class: "media-list-row__meta" }, I = {
	key: 0,
	class: "numeric"
}, Ce = {
	key: 1,
	class: "media-list-row__dot"
}, we = {
	key: 2,
	class: "media-list-row__cert"
}, Te = {
	key: 3,
	class: "media-list-row__dot"
}, Ee = {
	key: 4,
	class: "numeric"
}, De = {
	key: 0,
	class: "media-list-row__overview"
}, Oe = {
	key: 1,
	class: "media-list-row__overview media-list-row__overview--empty"
}, ke = /*#__PURE__*/ u(/* @__PURE__ */ x({
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
		let n = e, r = t, i = S(M, null), a = h(() => `/app/media/${n.item.id}`), o = h(() => ({
			height: "180px",
			gridTemplateColumns: "120px minmax(0, 1fr)"
		})), s = h(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (w(), v("article", {
			class: "media-list-row",
			style: C(o.value),
			"aria-label": e.item.name
		}, [y("div", N, [b(ee, {
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
		}, null, 8, ["item", "can-match"])]), y("div", be, [
			y("h3", P, [O(i) ? (w(), g(O(j), {
				key: 0,
				to: a.value,
				custom: ""
			}, {
				default: A(({ navigate: t }) => [y("a", {
					href: a.value,
					class: "media-list-row__link",
					onClick: t
				}, D(e.item.name), 9, xe)]),
				_: 1
			}, 8, ["to"])) : (w(), v("a", {
				key: 1,
				href: a.value,
				class: "media-list-row__link"
			}, D(e.item.name), 9, Se))]),
			y("div", F, [
				e.item.year ? (w(), v("span", I, D(e.item.year), 1)) : _("", !0),
				e.item.year && (e.item.rating || e.item.runtime) ? (w(), v("span", Ce)) : _("", !0),
				e.item.rating ? (w(), v("span", we, D(e.item.rating), 1)) : _("", !0),
				e.item.rating && e.item.runtime ? (w(), v("span", Te)) : _("", !0),
				e.item.runtime ? (w(), v("span", Ee, D(e.item.runtime) + "m", 1)) : _("", !0),
				(w(!0), v(m, null, E(s.value, (e) => (w(), v("span", {
					key: e,
					class: "media-list-row__genre"
				}, D(e), 1))), 128))
			]),
			e.item.overview ? (w(), v("p", De, D(e.item.overview), 1)) : (w(), v("p", Oe, " No description yet. "))
		])], 12, ye));
	}
}), [["__scopeId", "data-v-89a50aa9"]]), Ae = ["aria-label"], je = ["data-wash"], L = ["src", "srcset"], Me = { class: "media-backdrop-row__poster" }, Ne = { class: "media-backdrop-row__body" }, R = { class: "media-backdrop-row__title" }, Pe = ["href", "onClick"], z = ["href"], B = { class: "media-backdrop-row__meta" }, Fe = {
	key: 0,
	class: "numeric"
}, Ie = {
	key: 1,
	class: "media-backdrop-row__dot"
}, Le = {
	key: 2,
	class: "media-backdrop-row__cert"
}, Re = {
	key: 3,
	class: "media-backdrop-row__dot"
}, V = {
	key: 4,
	class: "numeric"
}, H = {
	key: 0,
	class: "media-backdrop-row__overview"
}, ze = {
	key: 1,
	class: "media-backdrop-row__overview media-backdrop-row__overview--empty"
}, Be = /*#__PURE__*/ u(/* @__PURE__ */ x({
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
		let { imgSrc: n, imgSrcset: r } = d(), i = e, a = t, o = S(M, null), s = h(() => `/app/media/${i.item.id}`), c = h(() => i.item.backdrop_url ?? null), l = h(() => i.item.backdrop_srcset ?? null), u = h(() => c.value !== null || l.value !== null), f = h(() => u.value ? null : i.item.poster_url ?? null), te = h(() => f.value ? { backgroundImage: `url(${n(f.value)})` } : {}), ne = h(() => u.value || f.value !== null), re = h(() => u.value ? "backdrop" : f.value ? "ambient" : null), p = T(!1), ie = T(null);
		function ae() {
			p.value = !0;
		}
		ge(() => {
			ie.value?.complete && (p.value = !0);
		}), k([c, l], () => {
			p.value = !1;
		});
		let oe = h(() => ({
			height: "300px",
			"--backdrop-row-poster": "200px",
			"--backdrop-row-poster-narrow": "120px"
		})), se = h(() => i.item.genres?.slice(0, 3) ?? []);
		return (t, i) => (w(), v("article", {
			class: "media-backdrop-row",
			style: C(oe.value),
			"aria-label": e.item.name
		}, [
			ne.value ? (w(), v("div", {
				key: 0,
				class: me(["media-backdrop-row__wash", `media-backdrop-row__wash--${re.value}`]),
				"data-wash": re.value,
				"aria-hidden": "true"
			}, [u.value ? (w(), v("img", {
				key: 0,
				ref_key: "imgEl",
				ref: ie,
				class: me(["media-backdrop-row__img", { "is-loaded": p.value }]),
				loading: "lazy",
				src: O(n)(c.value) || void 0,
				srcset: O(r)(l.value) || void 0,
				sizes: "calc(100vw - 40px)",
				alt: "",
				decoding: "async",
				onLoad: ae
			}, null, 42, L)) : (w(), v("div", {
				key: 1,
				class: "media-backdrop-row__ambient",
				style: C(te.value)
			}, null, 4)), i[10] ||= y("div", { class: "media-backdrop-row__scrim" }, null, -1)], 10, je)) : _("", !0),
			y("div", Me, [b(ee, {
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
			y("div", Ne, [
				y("h3", R, [O(o) ? (w(), g(O(j), {
					key: 0,
					to: s.value,
					custom: ""
				}, {
					default: A(({ navigate: t }) => [y("a", {
						href: s.value,
						class: "media-backdrop-row__link",
						onClick: t
					}, D(e.item.name), 9, Pe)]),
					_: 1
				}, 8, ["to"])) : (w(), v("a", {
					key: 1,
					href: s.value,
					class: "media-backdrop-row__link"
				}, D(e.item.name), 9, z))]),
				y("div", B, [
					e.item.year ? (w(), v("span", Fe, D(e.item.year), 1)) : _("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (w(), v("span", Ie)) : _("", !0),
					e.item.rating ? (w(), v("span", Le, D(e.item.rating), 1)) : _("", !0),
					e.item.rating && e.item.runtime ? (w(), v("span", Re)) : _("", !0),
					e.item.runtime ? (w(), v("span", V, D(e.item.runtime) + "m", 1)) : _("", !0),
					(w(!0), v(m, null, E(se.value, (e) => (w(), v("span", {
						key: e,
						class: "media-backdrop-row__genre"
					}, D(e), 1))), 128))
				]),
				e.item.overview ? (w(), v("p", H, D(e.item.overview), 1)) : (w(), v("p", ze, " No description yet. "))
			])
		], 12, Ae));
	}
}), [["__scopeId", "data-v-ba813cb2"]]), Ve = ["aria-label", "aria-rowindex"], U = {
	class: "media-table-row__cell media-table-row__cell--poster",
	role: "cell"
}, He = {
	class: "media-table-row__cell media-table-row__cell--title",
	role: "cell"
}, W = { class: "media-table-row__title" }, Ue = ["href", "onClick"], We = ["href"], G = {
	class: "media-table-row__cell media-table-row__cell--year numeric",
	role: "cell"
}, Ge = {
	class: "media-table-row__cell media-table-row__cell--rating",
	role: "cell"
}, Ke = {
	key: 0,
	class: "media-table-row__cert"
}, qe = {
	class: "media-table-row__cell media-table-row__cell--runtime numeric",
	role: "cell"
}, Je = {
	class: "media-table-row__cell media-table-row__cell--genres",
	role: "cell"
}, Ye = /*#__PURE__*/ u(/* @__PURE__ */ x({
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
		let n = e, r = t, i = S(M, null), a = h(() => `/app/media/${n.item.id}`), o = h(() => Math.max(0, Math.trunc(n.index)) + 2), s = h(() => ({
			height: "180px",
			gridTemplateColumns: c
		})), l = h(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (w(), v("div", {
			class: "media-table-row",
			role: "row",
			"aria-label": e.item.name,
			"aria-rowindex": o.value,
			style: C(s.value)
		}, [
			y("div", U, [b(ee, {
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
			y("div", He, [y("h3", W, [O(i) ? (w(), g(O(j), {
				key: 0,
				to: a.value,
				custom: ""
			}, {
				default: A(({ navigate: t }) => [y("a", {
					href: a.value,
					class: "media-table-row__link",
					onClick: t
				}, D(e.item.name), 9, Ue)]),
				_: 1
			}, 8, ["to"])) : (w(), v("a", {
				key: 1,
				href: a.value,
				class: "media-table-row__link"
			}, D(e.item.name), 9, We))])]),
			y("div", G, D(e.item.year ?? "—"), 1),
			y("div", Ge, [e.item.rating ? (w(), v("span", Ke, D(e.item.rating), 1)) : (w(), v(m, { key: 1 }, [fe("—")], 64))]),
			y("div", qe, D(e.item.runtime ? `${e.item.runtime}m` : "—"), 1),
			y("div", Je, [(w(!0), v(m, null, E(l.value, (e) => (w(), v("span", {
				key: e,
				class: "media-table-row__genre"
			}, D(e), 1))), 128)), l.value.length === 0 ? (w(), v(m, { key: 0 }, [fe("—")], 64)) : _("", !0)])
		], 12, Ve));
	}
}), [["__scopeId", "data-v-dcad01bb"]]), Xe = ["aria-label"], K = [
	"disabled",
	"aria-label",
	"onClick"
], q = { class: "index-rail__label" }, J = {
	class: "index-rail__full",
	"aria-hidden": "true"
}, Ze = /*#__PURE__*/ u(/* @__PURE__ */ x({
	__name: "IndexRail",
	props: {
		buckets: {},
		cssPrefix: { default: "index-rail" },
		navLabel: { default: "Jump to a bucket" }
	},
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (w(), v("nav", {
			class: "index-rail",
			"aria-label": e.navLabel
		}, [(w(!0), v(m, null, E(e.buckets, (t) => (w(), v("button", {
			key: t.key,
			type: "button",
			class: me([`${e.cssPrefix}__btn`, { "is-empty": t.count === 0 }]),
			disabled: t.count === 0,
			"aria-label": t.ariaLabel ?? `Jump to ${t.label} (${t.count})`,
			onClick: (e) => n("jump", t.offset)
		}, [y("span", q, D(t.label), 1), y("span", J, D(t.label), 1)], 10, K))), 128))], 8, Xe));
	}
}), [["__scopeId", "data-v-4b01327c"]]), Y = /* @__PURE__ */ new Map();
function X(e) {
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
async function Z(e, t, n) {
	let r = new se({ baseUrl: e }), i = new URLSearchParams();
	i.set("field", t.field), t.order && i.set("order", t.order), t.libraryId && i.set("libraryId", t.libraryId), t.query && i.set("search", t.query), t.topLevel && i.set("topLevel", "1"), t.yearMin !== void 0 && i.set("yearFrom", String(t.yearMin)), t.yearMax !== void 0 && i.set("yearTo", String(t.yearMax)), t.match && i.set("match", t.match), t.genres?.forEach((e) => i.append("genres[]", e)), t.ratings?.forEach((e) => i.append("ratings[]", String(e))), t.actors?.forEach((e) => i.append("actors[]", e)), t.studios?.forEach((e) => i.append("companies[]", e));
	let a = await r.get(`/api/v1/media/index?${i.toString()}`, void 0, n);
	return {
		field: a.field ?? t.field,
		buckets: Array.isArray(a.buckets) ? a.buckets : [],
		total: typeof a.total == "number" ? a.total : 0
	};
}
async function Qe(e, t, n) {
	let r = X(t), i = Y.get(r);
	if (i && Date.now() - i.ts < 3e5) return i.data;
	try {
		let i = await Z(e, t, n);
		return Y.set(r, {
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
var $e = { class: "library-page" }, et = {
	key: 1,
	class: "library"
}, tt = { class: "library-header" }, nt = { class: "library-title" }, rt = { class: "library-count numeric" }, it = [
	"role",
	"aria-label",
	"aria-rowcount"
], at = {
	key: 0,
	class: "library-table__head",
	role: "rowgroup"
}, ot = 1, st = /*#__PURE__*/ u(/* @__PURE__ */ x({
	__name: "LibraryPage",
	setup(u) {
		let d = e(), x = _e(), S = ve(), C = t(), j = n(), M = r(), ye = le(), N = ue(), be = i(), P = a(), xe = h(() => P.viewMode === "list"), Se = h(() => P.viewMode === "backdrop"), F = h(() => P.viewMode === "table"), I = h(() => F.value && C.items.length > 0), Ce = h(() => C.total > 0 ? C.total + 1 : -1), we = { gridTemplateColumns: c }, Te = o(180), Ee = o(300), De = o(180), Oe = h(() => xe.value || Se.value || F.value ? ot : void 0), Ae = h(() => xe.value ? Te : Se.value ? Ee : F.value ? De : void 0), je = T(null), L = T([]), Me = null, Ne = h(() => L.value.some((e) => e.count > 0));
		async function R() {
			Me?.abort();
			let e = new AbortController();
			Me = e;
			let t = C.queryParams, n = await Qe(d.value, {
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
			e.signal.aborted || (L.value = n.buckets);
		}
		function Pe(e) {
			je.value?.scrollToIndex(e);
		}
		let z = T(null), B = T(!1), Fe = T(!1), Ie = T(null), { inspectorItem: Le, inspectorOpen: Re, openInspector: V } = oe();
		function H(e) {
			z.value = e, B.value = !0;
		}
		function ze() {
			G();
		}
		function Ve(e) {
			C.items = C.items.map((t) => t.id === e.id ? e : t), N.success(`Updated poster for “${e.name}”`);
		}
		let U = h(() => {
			let e = x.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), He = h(() => j.byId(U.value)?.name ?? "Library");
		de(() => j.byId(U.value)?.name);
		let W = h(() => j.byId(U.value)?.type === "music");
		k([U, W], () => {
			W.value && C.sort === "name" ? (C.setSort("artist"), C.reset(), C.fetchMedia(d.value)) : !W.value && C.sort === "artist" && (C.setSort("name"), C.reset(), C.fetchMedia(d.value));
		}, { immediate: !0 });
		function Ue() {
			U.value && (C.clearFilters(), C.setLibraryId(U.value), C.setTopLevel(!0), We(), C.reset(), C.fetchMedia(d.value), R());
		}
		function We() {
			let e = x.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && C.setActors(t);
			let n = x.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && C.setGenres(r);
			let i = x.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && C.setCompanies(a);
			let o = Array.isArray(x.query.match) ? x.query.match[0] : x.query.match;
			(o === "matched" || o === "unmatched") && C.setMatchStatus(o);
		}
		function G() {
			C.reset(), C.fetchMedia(d.value), R();
		}
		ge(() => {
			j.load(d.value), Ue();
		}), k(U, Ue), k(d, G), k(() => C.sort, () => {
			R();
		}), he(() => {
			C.setLibraryId(void 0), C.setTopLevel(!1), C.clearFilters(), C.reset();
		});
		function Ge() {
			G();
		}
		function Ke(e, t) {
			C.ensureRange(d.value, e, t);
		}
		function qe(e, t) {
			S?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let Je = null;
		function Xe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function K(e) {
			Je?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			Je = t;
			let n = () => t !== Je;
			try {
				let r = new se({ baseUrl: d.value }), i = await ce(r, d.value, e, ye.resumeMap, t?.signal);
				if (n()) return;
				if (!i) {
					N.info("Nothing to play yet");
					return;
				}
				qe("player", i.id);
			} catch (e) {
				if (n() || Xe(e)) return;
				N.info("Nothing to play yet");
			}
		}
		function q() {}
		function J(e) {
			S?.hasRoute("media") && qe("media", e.id);
		}
		function Y(e) {
			be.isWatched(e.id) ? N.success(`Marked “${e.name}” as watched`) : N.info(`Marked “${e.name}” as unwatched`);
		}
		function X(e) {
			z.value = e, B.value = !0;
		}
		function Z(e) {
			Ie.value = e, Fe.value = !0;
		}
		let st = null, Q = T(null);
		function $(e) {
			Q.value = e;
		}
		async function ct() {
			let e = Q.value;
			if (Q.value = null, !e) return;
			st?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			st = t;
			let n = () => t !== st;
			try {
				if (await new se({ baseUrl: d.value }).deleteMediaItem(e.id), n()) return;
				C.items = C.items.filter((t) => t.id !== e.id), N.success(`Removed “${e.name}”`);
			} catch (t) {
				if (n() || Xe(t)) return;
				N.error(`Failed to remove “${e.name}”.`, { message: t instanceof Error ? t.message : "Unknown error" });
			}
		}
		return (e, t) => (w(), v("div", $e, [
			U.value ? (w(), v("section", et, [
				y("div", tt, [y("h1", nt, D(He.value), 1), y("span", rt, D(O(C).total.toLocaleString()) + " titles", 1)]),
				b(f, {
					"show-artist-sort": W.value,
					onChange: Ge
				}, null, 8, ["show-artist-sort"]),
				O(C).error ? (w(), g(te, {
					key: 0,
					icon: "alert",
					title: "Couldn’t load titles",
					description: O(C).error
				}, {
					actions: A(() => [b(ne, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: G
					}, {
						default: A(() => [...t[4] ||= [fe("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : _("", !0),
				y("div", {
					class: "library-table",
					role: I.value ? "table" : void 0,
					"aria-label": I.value ? `${He.value} titles` : void 0,
					"aria-rowcount": I.value ? Ce.value : void 0
				}, [I.value ? (w(), v("div", at, [y("div", {
					class: "library-table__head-row",
					role: "row",
					"aria-rowindex": "1",
					style: we
				}, [(w(!0), v(m, null, E(O(s), (e, t) => (w(), v("span", {
					key: e.label,
					class: me(["library-table__head-cell", { "library-table__head-cell--hidden": t === 0 }]),
					role: "columnheader"
				}, D(e.label), 3))), 128))])])) : _("", !0), b(l, {
					ref_key: "gridRef",
					ref: je,
					"data-view-mode": O(P).viewMode,
					"grid-role": I.value ? "rowgroup" : void 0,
					items: O(C).items,
					total: O(C).total,
					loading: O(C).loading && O(C).items.length === 0,
					"loading-more": O(C).loading && O(C).items.length > 0,
					"has-more": O(C).hasMore,
					"can-match": O(M).isAdmin,
					columns: Oe.value,
					"row-height": Ae.value,
					onNeedRange: Ke,
					onPlay: K,
					onWatchlist: q,
					onInfo: J,
					onMatch: H,
					onMarkWatched: Y,
					onRefresh: X,
					onEditMetadata: H,
					onExploreData: O(V),
					onChoosePoster: Z,
					onRemove: $
				}, {
					card: A(({ item: e, index: t }) => [xe.value ? (w(), g(ke, {
						key: 0,
						item: e,
						"can-match": O(M).isAdmin,
						onPlay: K,
						onWatchlist: q,
						onInfo: J,
						onMatch: H,
						onMarkWatched: Y,
						onRefresh: X,
						onChoosePoster: Z,
						onRemove: $,
						onEditMetadata: H,
						onExploreData: O(V)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : Se.value ? (w(), g(Be, {
						key: 1,
						item: e,
						"can-match": O(M).isAdmin,
						onPlay: K,
						onWatchlist: q,
						onInfo: J,
						onMatch: H,
						onMarkWatched: Y,
						onRefresh: X,
						onChoosePoster: Z,
						onRemove: $,
						onEditMetadata: H,
						onExploreData: O(V)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : F.value ? (w(), g(Ye, {
						key: 2,
						item: e,
						index: t,
						"can-match": O(M).isAdmin,
						onPlay: K,
						onWatchlist: q,
						onInfo: J,
						onMatch: H,
						onMarkWatched: Y,
						onRefresh: X,
						onChoosePoster: Z,
						onRemove: $,
						onEditMetadata: H,
						onExploreData: O(V)
					}, null, 8, [
						"item",
						"index",
						"can-match",
						"onExploreData"
					])) : (w(), g(ee, {
						key: 3,
						item: e,
						"can-match": O(M).isAdmin,
						onPlay: K,
						onWatchlist: q,
						onInfo: J,
						onMatch: H,
						onMarkWatched: Y,
						onRefresh: X,
						onChoosePoster: Z,
						onRemove: $,
						onEditMetadata: H,
						onExploreData: O(V)
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
				])], 8, it),
				Ne.value ? (w(), g(Ze, {
					key: 1,
					buckets: L.value,
					onJump: Pe
				}, null, 8, ["buckets"])) : _("", !0)
			])) : (w(), g(te, {
				key: 0,
				icon: "alert",
				title: "Library not found",
				description: "No library was specified."
			})),
			O(M).isAdmin ? (w(), g(re, {
				key: 2,
				modelValue: B.value,
				"onUpdate:modelValue": t[0] ||= (e) => B.value = e,
				item: z.value,
				onApplied: ze
			}, null, 8, ["modelValue", "item"])) : _("", !0),
			O(M).isAdmin ? (w(), g(p, {
				key: 3,
				modelValue: Fe.value,
				"onUpdate:modelValue": t[1] ||= (e) => Fe.value = e,
				item: Ie.value,
				onApplied: Ve
			}, null, 8, ["modelValue", "item"])) : _("", !0),
			b(ie, {
				open: Q.value !== null,
				message: Q.value ? `Remove “${Q.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || (Q.value = null);
				},
				onConfirm: ct
			}, null, 8, ["open", "message"]),
			O(M).isAdmin ? (w(), g(ae, {
				key: 4,
				modelValue: O(Re),
				"onUpdate:modelValue": t[3] ||= (e) => pe(Re) ? Re.value = e : null,
				item: O(Le)
			}, null, 8, ["modelValue", "item"])) : _("", !0)
		]));
	}
}), [["__scopeId", "data-v-d2de485e"]]);
export { st as default };

//# sourceMappingURL=LibraryPage-CV4TfmsO.js.map