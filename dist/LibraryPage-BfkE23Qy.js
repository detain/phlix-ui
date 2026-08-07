import { n as e } from "./Icon-CkTBN_k5.js";
import { a as t } from "./usePreferencesStore-CFPikE8Z.js";
import { t as n } from "./client-COHWZ2KC.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-Bxpn4wWU.js";
import { t as a } from "./useImageSrc-KnN1T9Ga.js";
import { i as o } from "./usePlayerStore-DhgapSoa.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { n as s } from "./ThumbRating-DZt3qThy.js";
import { t as c } from "./useLibrariesStore-B1E5wbLf.js";
import { i as l } from "./usePageTitle-BO3GGF3M.js";
import { t as u } from "./Button-Cw8Wl4QR.js";
import { t as d } from "./useMediaStore-CI5AhE-J.js";
import { t as te } from "./EmptyState-CwWtkhEJ.js";
import { t as ne } from "./MediaCard-H65JFCcC.js";
import { i as re, n as ie, r as f, t as ae } from "./MediaGrid-4qDkIH63.js";
import { t as oe } from "./FilterBar-fD_hxEq6.js";
import { t as se } from "./MetadataMatchModal-mF5oFRQu.js";
import { t as ce } from "./PosterPicker-BqC0PwzJ.js";
import { n as le, t as ue } from "./useItemInspector-DXSHWUqA.js";
import { r as de } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as fe, createVNode as y, defineComponent as b, inject as x, isRef as pe, normalizeClass as me, normalizeStyle as S, onBeforeUnmount as he, onMounted as ge, openBlock as C, ref as w, renderList as T, toDisplayString as E, unref as D, watch as O, withCtx as k } from "vue";
import { RouterLink as A, routerKey as j, useRoute as _e, useRouter as ve } from "vue-router";
//#region src/components/MediaListRow.vue?vue&type=script&setup=true&lang.ts
var ye = ["aria-label"], M = { class: "media-list-row__poster" }, be = { class: "media-list-row__body" }, N = { class: "media-list-row__title" }, xe = ["href", "onClick"], Se = ["href"], P = { class: "media-list-row__meta" }, F = {
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
}, ke = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		let n = e, r = t, i = x(j, null), a = m(() => `/app/media/${n.item.id}`), o = m(() => ({
			height: "180px",
			gridTemplateColumns: "120px minmax(0, 1fr)"
		})), ee = m(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (C(), _("article", {
			class: "media-list-row",
			style: S(o.value),
			"aria-label": e.item.name
		}, [v("div", M, [y(ne, {
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
			v("h3", N, [D(i) ? (C(), h(D(A), {
				key: 0,
				to: a.value,
				custom: ""
			}, {
				default: k(({ navigate: t }) => [v("a", {
					href: a.value,
					class: "media-list-row__link",
					onClick: t
				}, E(e.item.name), 9, xe)]),
				_: 1
			}, 8, ["to"])) : (C(), _("a", {
				key: 1,
				href: a.value,
				class: "media-list-row__link"
			}, E(e.item.name), 9, Se))]),
			v("div", P, [
				e.item.year ? (C(), _("span", F, E(e.item.year), 1)) : g("", !0),
				e.item.year && (e.item.rating || e.item.runtime) ? (C(), _("span", Ce)) : g("", !0),
				e.item.rating ? (C(), _("span", we, E(e.item.rating), 1)) : g("", !0),
				e.item.rating && e.item.runtime ? (C(), _("span", Te)) : g("", !0),
				e.item.runtime ? (C(), _("span", Ee, E(e.item.runtime) + "m", 1)) : g("", !0),
				(C(!0), _(p, null, T(ee.value, (e) => (C(), _("span", {
					key: e,
					class: "media-list-row__genre"
				}, E(e), 1))), 128))
			]),
			e.item.overview ? (C(), _("p", De, E(e.item.overview), 1)) : (C(), _("p", Oe, " No description yet. "))
		])], 12, ye));
	}
}), [["__scopeId", "data-v-2203e4c6"]]), Ae = ["aria-label"], je = ["data-wash"], I = ["src", "srcset"], Me = { class: "media-backdrop-row__poster" }, Ne = { class: "media-backdrop-row__body" }, L = { class: "media-backdrop-row__title" }, Pe = ["href", "onClick"], R = ["href"], z = { class: "media-backdrop-row__meta" }, B = {
	key: 0,
	class: "numeric"
}, Fe = {
	key: 1,
	class: "media-backdrop-row__dot"
}, Ie = {
	key: 2,
	class: "media-backdrop-row__cert"
}, V = {
	key: 3,
	class: "media-backdrop-row__dot"
}, H = {
	key: 4,
	class: "numeric"
}, U = {
	key: 0,
	class: "media-backdrop-row__overview"
}, Le = {
	key: 1,
	class: "media-backdrop-row__overview media-backdrop-row__overview--empty"
}, Re = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		let { imgSrc: n, imgSrcset: r } = a(), i = e, o = t, ee = x(j, null), s = m(() => `/app/media/${i.item.id}`), c = m(() => i.item.backdrop_url ?? null), l = m(() => i.item.backdrop_srcset ?? null), u = m(() => c.value !== null || l.value !== null), d = m(() => u.value ? null : i.item.poster_url ?? null), te = m(() => d.value ? { backgroundImage: `url(${n(d.value)})` } : {}), re = m(() => u.value || d.value !== null), ie = m(() => u.value ? "backdrop" : d.value ? "ambient" : null), f = w(!1), ae = w(null);
		function oe() {
			f.value = !0;
		}
		ge(() => {
			ae.value?.complete && (f.value = !0);
		}), O([c, l], () => {
			f.value = !1;
		});
		let se = m(() => ({
			height: "300px",
			"--backdrop-row-poster": "200px",
			"--backdrop-row-poster-narrow": "120px"
		})), ce = m(() => i.item.genres?.slice(0, 3) ?? []);
		return (t, i) => (C(), _("article", {
			class: "media-backdrop-row",
			style: S(se.value),
			"aria-label": e.item.name
		}, [
			re.value ? (C(), _("div", {
				key: 0,
				class: me(["media-backdrop-row__wash", `media-backdrop-row__wash--${ie.value}`]),
				"data-wash": ie.value,
				"aria-hidden": "true"
			}, [u.value ? (C(), _("img", {
				key: 0,
				ref_key: "imgEl",
				ref: ae,
				class: me(["media-backdrop-row__img", { "is-loaded": f.value }]),
				loading: "lazy",
				src: D(n)(c.value) || void 0,
				srcset: D(r)(l.value) || void 0,
				sizes: "calc(100vw - 40px)",
				alt: "",
				decoding: "async",
				onLoad: oe
			}, null, 42, I)) : (C(), _("div", {
				key: 1,
				class: "media-backdrop-row__ambient",
				style: S(te.value)
			}, null, 4)), i[10] ||= v("div", { class: "media-backdrop-row__scrim" }, null, -1)], 10, je)) : g("", !0),
			v("div", Me, [y(ne, {
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
			v("div", Ne, [
				v("h3", L, [D(ee) ? (C(), h(D(A), {
					key: 0,
					to: s.value,
					custom: ""
				}, {
					default: k(({ navigate: t }) => [v("a", {
						href: s.value,
						class: "media-backdrop-row__link",
						onClick: t
					}, E(e.item.name), 9, Pe)]),
					_: 1
				}, 8, ["to"])) : (C(), _("a", {
					key: 1,
					href: s.value,
					class: "media-backdrop-row__link"
				}, E(e.item.name), 9, R))]),
				v("div", z, [
					e.item.year ? (C(), _("span", B, E(e.item.year), 1)) : g("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (C(), _("span", Fe)) : g("", !0),
					e.item.rating ? (C(), _("span", Ie, E(e.item.rating), 1)) : g("", !0),
					e.item.rating && e.item.runtime ? (C(), _("span", V)) : g("", !0),
					e.item.runtime ? (C(), _("span", H, E(e.item.runtime) + "m", 1)) : g("", !0),
					(C(!0), _(p, null, T(ce.value, (e) => (C(), _("span", {
						key: e,
						class: "media-backdrop-row__genre"
					}, E(e), 1))), 128))
				]),
				e.item.overview ? (C(), _("p", U, E(e.item.overview), 1)) : (C(), _("p", Le, " No description yet. "))
			])
		], 12, Ae));
	}
}), [["__scopeId", "data-v-5ac0ee7a"]]), ze = ["aria-label", "aria-rowindex"], W = {
	class: "media-table-row__cell media-table-row__cell--poster",
	role: "cell"
}, Be = {
	class: "media-table-row__cell media-table-row__cell--title",
	role: "cell"
}, G = { class: "media-table-row__title" }, Ve = ["href", "onClick"], He = ["href"], K = {
	class: "media-table-row__cell media-table-row__cell--year numeric",
	role: "cell"
}, Ue = {
	class: "media-table-row__cell media-table-row__cell--rating",
	role: "cell"
}, We = {
	key: 0,
	class: "media-table-row__cert"
}, Ge = {
	class: "media-table-row__cell media-table-row__cell--runtime numeric",
	role: "cell"
}, Ke = {
	class: "media-table-row__cell media-table-row__cell--genres",
	role: "cell"
}, qe = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		let n = e, r = t, i = x(j, null), a = m(() => `/app/media/${n.item.id}`), o = m(() => Math.max(0, Math.trunc(n.index)) + 2), ee = m(() => ({
			height: "180px",
			gridTemplateColumns: f
		})), s = m(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (C(), _("div", {
			class: "media-table-row",
			role: "row",
			"aria-label": e.item.name,
			"aria-rowindex": o.value,
			style: S(ee.value)
		}, [
			v("div", W, [y(ne, {
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
			v("div", Be, [v("h3", G, [D(i) ? (C(), h(D(A), {
				key: 0,
				to: a.value,
				custom: ""
			}, {
				default: k(({ navigate: t }) => [v("a", {
					href: a.value,
					class: "media-table-row__link",
					onClick: t
				}, E(e.item.name), 9, Ve)]),
				_: 1
			}, 8, ["to"])) : (C(), _("a", {
				key: 1,
				href: a.value,
				class: "media-table-row__link"
			}, E(e.item.name), 9, He))])]),
			v("div", K, E(e.item.year ?? "—"), 1),
			v("div", Ue, [e.item.rating ? (C(), _("span", We, E(e.item.rating), 1)) : (C(), _(p, { key: 1 }, [fe("—")], 64))]),
			v("div", Ge, E(e.item.runtime ? `${e.item.runtime}m` : "—"), 1),
			v("div", Ke, [(C(!0), _(p, null, T(s.value, (e) => (C(), _("span", {
				key: e,
				class: "media-table-row__genre"
			}, E(e), 1))), 128)), s.value.length === 0 ? (C(), _(p, { key: 0 }, [fe("—")], 64)) : g("", !0)])
		], 12, ze));
	}
}), [["__scopeId", "data-v-7ba0a7af"]]), Je = ["aria-label"], q = [
	"disabled",
	"aria-label",
	"onClick"
], J = { class: "index-rail__label" }, Y = {
	class: "index-rail__full",
	"aria-hidden": "true"
}, Ye = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "IndexRail",
	props: {
		buckets: {},
		cssPrefix: { default: "index-rail" },
		navLabel: { default: "Jump to a bucket" }
	},
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (C(), _("nav", {
			class: "index-rail",
			"aria-label": e.navLabel
		}, [(C(!0), _(p, null, T(e.buckets, (t) => (C(), _("button", {
			key: t.key,
			type: "button",
			class: me([`${e.cssPrefix}__btn`, { "is-empty": t.count === 0 }]),
			disabled: t.count === 0,
			"aria-label": t.ariaLabel ?? `Jump to ${t.label} (${t.count})`,
			onClick: (e) => n("jump", t.offset)
		}, [v("span", J, E(t.label), 1), v("span", Y, E(t.label), 1)], 10, q))), 128))], 8, Je));
	}
}), [["__scopeId", "data-v-4b01327c"]]), X = /* @__PURE__ */ new Map();
function Z(e) {
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
async function Q(e, t, r) {
	let i = new n({ baseUrl: e }), a = {};
	a.field = t.field, t.order && (a.order = t.order), t.libraryId && (a.libraryId = t.libraryId), t.query && (a.search = t.query), t.topLevel && (a.topLevel = "1"), t.yearMin !== void 0 && (a.yearFrom = String(t.yearMin)), t.yearMax !== void 0 && (a.yearTo = String(t.yearMax)), t.match && (a.match = t.match), t.genres?.forEach((e) => a["genres[]"] = e), t.ratings?.forEach((e) => a["ratings[]"] = String(e)), t.actors?.forEach((e) => a["actors[]"] = e), t.studios?.forEach((e) => a["companies[]"] = e);
	let o = await i.get("/api/v1/media/index", a, r);
	return {
		field: o.field ?? t.field,
		buckets: Array.isArray(o.buckets) ? o.buckets : [],
		total: typeof o.total == "number" ? o.total : 0
	};
}
async function Xe(e, t, n) {
	let r = Z(t), i = X.get(r);
	if (i && Date.now() - i.ts < 3e5) return i.data;
	try {
		let i = await Q(e, t, n);
		return X.set(r, {
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
var Ze = { class: "library-page" }, Qe = {
	key: 1,
	class: "library"
}, $e = { class: "library-header" }, et = { class: "library-title" }, tt = { class: "library-count numeric" }, nt = [
	"role",
	"aria-label",
	"aria-rowcount"
], rt = {
	key: 0,
	class: "library-table__head",
	role: "rowgroup"
}, it = 1, at = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "LibraryPage",
	setup(e) {
		let a = r(), b = _e(), x = ve(), S = d(), A = c(), j = i(), ye = o(), M = ee(), be = s(), N = t(), xe = m(() => N.viewMode === "list"), Se = m(() => N.viewMode === "backdrop"), P = m(() => N.viewMode === "table"), F = m(() => P.value && S.items.length > 0), Ce = m(() => S.total > 0 ? S.total + 1 : -1), we = { gridTemplateColumns: f }, Te = re(180), Ee = re(300), De = re(180), Oe = m(() => xe.value || Se.value || P.value ? it : void 0), Ae = m(() => xe.value ? Te : Se.value ? Ee : P.value ? De : void 0), je = w(null), I = w([]), Me = null, Ne = m(() => I.value.some((e) => e.count > 0));
		async function L() {
			Me?.abort();
			let e = new AbortController();
			Me = e;
			let t = S.queryParams, n = await Xe(a.value, {
				field: S.sort,
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
			e.signal.aborted || (I.value = n.buckets);
		}
		function Pe(e) {
			je.value?.scrollToIndex(e);
		}
		let R = w(null), z = w(!1), B = w(!1), Fe = w(null), { inspectorItem: Ie, inspectorOpen: V, openInspector: H } = ue();
		function U(e) {
			R.value = e, z.value = !0;
		}
		function Le() {
			K();
		}
		function ze(e) {
			S.items = S.items.map((t) => t.id === e.id ? e : t), M.success(`Updated poster for "${e.name}"`);
		}
		let W = m(() => {
			let e = b.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), Be = m(() => A.byId(W.value)?.name ?? "Library");
		l(() => A.byId(W.value)?.name);
		let G = m(() => A.byId(W.value)?.type === "music");
		O([W, G], () => {
			G.value && S.sort === "name" ? (S.setSort("artist"), S.reset(), S.fetchMedia(a.value)) : !G.value && S.sort === "artist" && (S.setSort("name"), S.reset(), S.fetchMedia(a.value));
		}, { immediate: !0 });
		function Ve() {
			W.value && (S.clearFilters(), S.setLibraryId(W.value), S.setTopLevel(!0), He(), S.reset(), S.fetchMedia(a.value), L());
		}
		function He() {
			let e = b.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && S.setActors(t);
			let n = b.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && S.setGenres(r);
			let i = b.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && S.setCompanies(a);
			let o = Array.isArray(b.query.match) ? b.query.match[0] : b.query.match;
			(o === "matched" || o === "unmatched") && S.setMatchStatus(o);
		}
		function K() {
			S.reset(), S.fetchMedia(a.value), L();
		}
		ge(() => {
			A.load(a.value), Ve();
		}), O(W, Ve), O(a, K), O(() => S.sort, () => {
			L();
		}), he(() => {
			S.setLibraryId(void 0), S.setTopLevel(!1), S.clearFilters(), S.reset();
		});
		function Ue() {
			K();
		}
		function We(e, t) {
			S.ensureRange(a.value, e, t);
		}
		function Ge(e, t) {
			x?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let Ke = null;
		function Je(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function q(e) {
			Ke?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			Ke = t;
			let r = () => t !== Ke;
			try {
				let i = new n({ baseUrl: a.value }), o = await de(i, a.value, e, ye.resumeMap, t?.signal);
				if (r()) return;
				if (!o) {
					M.info("Nothing to play yet");
					return;
				}
				Ge("player", o.id);
			} catch (e) {
				if (r() || Je(e)) return;
				M.info("Nothing to play yet");
			}
		}
		function J() {}
		function Y(e) {
			x?.hasRoute("media") && Ge("media", e.id);
		}
		function X(e) {
			be.isWatched(e.id) ? M.success(`Marked "${e.name}" as watched`) : M.info(`Marked "${e.name}" as unwatched`);
		}
		function Z(e) {
			R.value = e, z.value = !0;
		}
		function Q(e) {
			Fe.value = e, B.value = !0;
		}
		let at = null;
		async function $(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			at?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			at = t;
			let r = () => t !== at;
			try {
				if (await new n({ baseUrl: a.value }).deleteMediaItem(e.id), r()) return;
				S.items = S.items.filter((t) => t.id !== e.id), M.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || Je(t)) return;
				M.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (C(), _("div", Ze, [
			W.value ? (C(), _("section", Qe, [
				v("div", $e, [v("h1", et, E(Be.value), 1), v("span", tt, E(D(S).total.toLocaleString()) + " titles", 1)]),
				y(oe, {
					"show-artist-sort": G.value,
					onChange: Ue
				}, null, 8, ["show-artist-sort"]),
				D(S).error ? (C(), h(te, {
					key: 0,
					icon: "alert",
					title: "Couldn't load titles",
					description: D(S).error
				}, {
					actions: k(() => [y(u, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: K
					}, {
						default: k(() => [...t[3] ||= [fe("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : g("", !0),
				v("div", {
					class: "library-table",
					role: F.value ? "table" : void 0,
					"aria-label": F.value ? `${Be.value} titles` : void 0,
					"aria-rowcount": F.value ? Ce.value : void 0
				}, [F.value ? (C(), _("div", rt, [v("div", {
					class: "library-table__head-row",
					role: "row",
					"aria-rowindex": "1",
					style: we
				}, [(C(!0), _(p, null, T(D(ie), (e, t) => (C(), _("span", {
					key: e.label,
					class: me(["library-table__head-cell", { "library-table__head-cell--hidden": t === 0 }]),
					role: "columnheader"
				}, E(e.label), 3))), 128))])])) : g("", !0), y(ae, {
					ref_key: "gridRef",
					ref: je,
					"data-view-mode": D(N).viewMode,
					"grid-role": F.value ? "rowgroup" : void 0,
					items: D(S).items,
					total: D(S).total,
					loading: D(S).loading && D(S).items.length === 0,
					"loading-more": D(S).loading && D(S).items.length > 0,
					"has-more": D(S).hasMore,
					"can-match": D(j).isAdmin,
					columns: Oe.value,
					"row-height": Ae.value,
					onNeedRange: We,
					onPlay: q,
					onWatchlist: J,
					onInfo: Y,
					onMatch: U,
					onMarkWatched: X,
					onRefresh: Z,
					onEditMetadata: U,
					onExploreData: D(H),
					onChoosePoster: Q,
					onRemove: $
				}, {
					card: k(({ item: e, index: t }) => [xe.value ? (C(), h(ke, {
						key: 0,
						item: e,
						"can-match": D(j).isAdmin,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: U,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: U,
						onExploreData: D(H)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : Se.value ? (C(), h(Re, {
						key: 1,
						item: e,
						"can-match": D(j).isAdmin,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: U,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: U,
						onExploreData: D(H)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : P.value ? (C(), h(qe, {
						key: 2,
						item: e,
						index: t,
						"can-match": D(j).isAdmin,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: U,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: U,
						onExploreData: D(H)
					}, null, 8, [
						"item",
						"index",
						"can-match",
						"onExploreData"
					])) : (C(), h(ne, {
						key: 3,
						item: e,
						"can-match": D(j).isAdmin,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: U,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: U,
						onExploreData: D(H)
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
				])], 8, nt),
				Ne.value ? (C(), h(Ye, {
					key: 1,
					buckets: I.value,
					onJump: Pe
				}, null, 8, ["buckets"])) : g("", !0)
			])) : (C(), h(te, {
				key: 0,
				icon: "alert",
				title: "Library not found",
				description: "No library was specified."
			})),
			D(j).isAdmin ? (C(), h(se, {
				key: 2,
				modelValue: z.value,
				"onUpdate:modelValue": t[0] ||= (e) => z.value = e,
				item: R.value,
				onApplied: Le
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			D(j).isAdmin ? (C(), h(ce, {
				key: 3,
				modelValue: B.value,
				"onUpdate:modelValue": t[1] ||= (e) => B.value = e,
				item: Fe.value,
				onApplied: ze
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			D(j).isAdmin ? (C(), h(le, {
				key: 4,
				modelValue: D(V),
				"onUpdate:modelValue": t[2] ||= (e) => pe(V) ? V.value = e : null,
				item: D(Ie)
			}, null, 8, ["modelValue", "item"])) : g("", !0)
		]));
	}
}), [["__scopeId", "data-v-1834a507"]]);
//#endregion
export { at as default };

//# sourceMappingURL=LibraryPage-BfkE23Qy.js.map