import { n as e } from "./Icon-CkTBN_k5.js";
import { a as t } from "./usePreferencesStore-CFPikE8Z.js";
import { t as n } from "./client-COHWZ2KC.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-Bxpn4wWU.js";
import { i as a } from "./usePlayerStore-DhgapSoa.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { n as s } from "./ThumbRating-1bRvqpja.js";
import { t as c } from "./useLibrariesStore-B1E5wbLf.js";
import { i as l } from "./usePageTitle-BO3GGF3M.js";
import { t as ee } from "./Button-Cw8Wl4QR.js";
import { t as te } from "./useMediaStore-CI5AhE-J.js";
import { t as u } from "./EmptyState-CwWtkhEJ.js";
import { t as d } from "./MediaCard-aYhuTtNS.js";
import { i as f, n as ne, r as re, t as ie } from "./MediaGrid-mV1fGLYC.js";
import { t as ae } from "./FilterBar-fD_hxEq6.js";
import { t as oe } from "./MetadataMatchModal-BQWaW_aA.js";
import { t as se } from "./PosterPicker-B09OH9Mu.js";
import { n as ce, t as le } from "./useItemInspector-DXSHWUqA.js";
import { r as ue } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as de, createVNode as y, defineComponent as b, inject as x, isRef as fe, normalizeClass as S, normalizeStyle as C, onBeforeUnmount as pe, onMounted as me, openBlock as w, ref as T, renderList as E, toDisplayString as D, unref as O, watch as k, withCtx as A } from "vue";
import { RouterLink as j, routerKey as M, useRoute as he, useRouter as ge } from "vue-router";
//#region src/components/MediaListRow.vue?vue&type=script&setup=true&lang.ts
var N = ["aria-label"], _e = { class: "media-list-row__poster" }, P = { class: "media-list-row__body" }, ve = { class: "media-list-row__title" }, F = ["href", "onClick"], ye = ["href"], I = { class: "media-list-row__meta" }, L = {
	key: 0,
	class: "numeric"
}, R = {
	key: 1,
	class: "media-list-row__dot"
}, be = {
	key: 2,
	class: "media-list-row__cert"
}, xe = {
	key: 3,
	class: "media-list-row__dot"
}, Se = {
	key: 4,
	class: "numeric"
}, Ce = {
	key: 0,
	class: "media-list-row__overview"
}, we = {
	key: 1,
	class: "media-list-row__overview media-list-row__overview--empty"
}, Te = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		})), s = m(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (w(), _("article", {
			class: "media-list-row",
			style: C(o.value),
			"aria-label": e.item.name
		}, [v("div", _e, [y(d, {
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
		}, null, 8, ["item", "can-match"])]), v("div", P, [
			v("h3", ve, [O(i) ? (w(), h(O(j), {
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
			}, D(e.item.name), 9, ye))]),
			v("div", I, [
				e.item.year ? (w(), _("span", L, D(e.item.year), 1)) : g("", !0),
				e.item.year && (e.item.rating || e.item.runtime) ? (w(), _("span", R)) : g("", !0),
				e.item.rating ? (w(), _("span", be, D(e.item.rating), 1)) : g("", !0),
				e.item.rating && e.item.runtime ? (w(), _("span", xe)) : g("", !0),
				e.item.runtime ? (w(), _("span", Se, D(e.item.runtime) + "m", 1)) : g("", !0),
				(w(!0), _(p, null, E(s.value, (e) => (w(), _("span", {
					key: e,
					class: "media-list-row__genre"
				}, D(e), 1))), 128))
			]),
			e.item.overview ? (w(), _("p", Ce, D(e.item.overview), 1)) : (w(), _("p", we, " No description yet. "))
		])], 12, N));
	}
}), [["__scopeId", "data-v-7598c322"]]), Ee = ["aria-label"], De = ["data-wash"], Oe = ["src", "srcset"], ke = { class: "media-backdrop-row__poster" }, Ae = { class: "media-backdrop-row__body" }, je = { class: "media-backdrop-row__title" }, Me = ["href", "onClick"], Ne = ["href"], Pe = { class: "media-backdrop-row__meta" }, z = {
	key: 0,
	class: "numeric"
}, B = {
	key: 1,
	class: "media-backdrop-row__dot"
}, Fe = {
	key: 2,
	class: "media-backdrop-row__cert"
}, Ie = {
	key: 3,
	class: "media-backdrop-row__dot"
}, V = {
	key: 4,
	class: "numeric"
}, H = {
	key: 0,
	class: "media-backdrop-row__overview"
}, U = {
	key: 1,
	class: "media-backdrop-row__overview media-backdrop-row__overview--empty"
}, Le = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		let n = e, r = t, i = x(M, null), a = m(() => `/app/media/${n.item.id}`), o = m(() => n.item.backdrop_url ?? null), s = m(() => n.item.backdrop_srcset ?? null), c = m(() => o.value !== null || s.value !== null), l = m(() => c.value ? null : n.item.poster_url ?? null), ee = m(() => l.value ? { backgroundImage: `url(${l.value})` } : {}), te = m(() => c.value || l.value !== null), u = m(() => c.value ? "backdrop" : l.value ? "ambient" : null), f = T(!1), ne = T(null);
		function re() {
			f.value = !0;
		}
		me(() => {
			ne.value?.complete && (f.value = !0);
		}), k([o, s], () => {
			f.value = !1;
		});
		let ie = m(() => ({
			height: "300px",
			"--backdrop-row-poster": "200px",
			"--backdrop-row-poster-narrow": "120px"
		})), ae = m(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (w(), _("article", {
			class: "media-backdrop-row",
			style: C(ie.value),
			"aria-label": e.item.name
		}, [
			te.value ? (w(), _("div", {
				key: 0,
				class: S(["media-backdrop-row__wash", `media-backdrop-row__wash--${u.value}`]),
				"data-wash": u.value,
				"aria-hidden": "true"
			}, [c.value ? (w(), _("img", {
				key: 0,
				ref_key: "imgEl",
				ref: ne,
				class: S(["media-backdrop-row__img", { "is-loaded": f.value }]),
				src: o.value || void 0,
				srcset: s.value || void 0,
				sizes: "calc(100vw - 40px)",
				alt: "",
				decoding: "async",
				onLoad: re
			}, null, 42, Oe)) : (w(), _("div", {
				key: 1,
				class: "media-backdrop-row__ambient",
				style: C(ee.value)
			}, null, 4)), n[10] ||= v("div", { class: "media-backdrop-row__scrim" }, null, -1)], 10, De)) : g("", !0),
			v("div", ke, [y(d, {
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
			v("div", Ae, [
				v("h3", je, [O(i) ? (w(), h(O(j), {
					key: 0,
					to: a.value,
					custom: ""
				}, {
					default: A(({ navigate: t }) => [v("a", {
						href: a.value,
						class: "media-backdrop-row__link",
						onClick: t
					}, D(e.item.name), 9, Me)]),
					_: 1
				}, 8, ["to"])) : (w(), _("a", {
					key: 1,
					href: a.value,
					class: "media-backdrop-row__link"
				}, D(e.item.name), 9, Ne))]),
				v("div", Pe, [
					e.item.year ? (w(), _("span", z, D(e.item.year), 1)) : g("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (w(), _("span", B)) : g("", !0),
					e.item.rating ? (w(), _("span", Fe, D(e.item.rating), 1)) : g("", !0),
					e.item.rating && e.item.runtime ? (w(), _("span", Ie)) : g("", !0),
					e.item.runtime ? (w(), _("span", V, D(e.item.runtime) + "m", 1)) : g("", !0),
					(w(!0), _(p, null, E(ae.value, (e) => (w(), _("span", {
						key: e,
						class: "media-backdrop-row__genre"
					}, D(e), 1))), 128))
				]),
				e.item.overview ? (w(), _("p", H, D(e.item.overview), 1)) : (w(), _("p", U, " No description yet. "))
			])
		], 12, Ee));
	}
}), [["__scopeId", "data-v-d60cebf8"]]), Re = ["aria-label", "aria-rowindex"], ze = {
	class: "media-table-row__cell media-table-row__cell--poster",
	role: "cell"
}, W = {
	class: "media-table-row__cell media-table-row__cell--title",
	role: "cell"
}, Be = { class: "media-table-row__title" }, G = ["href", "onClick"], Ve = ["href"], He = {
	class: "media-table-row__cell media-table-row__cell--year numeric",
	role: "cell"
}, K = {
	class: "media-table-row__cell media-table-row__cell--rating",
	role: "cell"
}, Ue = {
	key: 0,
	class: "media-table-row__cert"
}, We = {
	class: "media-table-row__cell media-table-row__cell--runtime numeric",
	role: "cell"
}, Ge = {
	class: "media-table-row__cell media-table-row__cell--genres",
	role: "cell"
}, Ke = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		let n = e, r = t, i = x(M, null), a = m(() => `/app/media/${n.item.id}`), o = m(() => Math.max(0, Math.trunc(n.index)) + 2), s = m(() => ({
			height: "180px",
			gridTemplateColumns: re
		})), c = m(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (w(), _("div", {
			class: "media-table-row",
			role: "row",
			"aria-label": e.item.name,
			"aria-rowindex": o.value,
			style: C(s.value)
		}, [
			v("div", ze, [y(d, {
				item: e.item,
				"can-match": e.canMatch,
				lazy: !1,
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
			v("div", W, [v("h3", Be, [O(i) ? (w(), h(O(j), {
				key: 0,
				to: a.value,
				custom: ""
			}, {
				default: A(({ navigate: t }) => [v("a", {
					href: a.value,
					class: "media-table-row__link",
					onClick: t
				}, D(e.item.name), 9, G)]),
				_: 1
			}, 8, ["to"])) : (w(), _("a", {
				key: 1,
				href: a.value,
				class: "media-table-row__link"
			}, D(e.item.name), 9, Ve))])]),
			v("div", He, D(e.item.year ?? "—"), 1),
			v("div", K, [e.item.rating ? (w(), _("span", Ue, D(e.item.rating), 1)) : (w(), _(p, { key: 1 }, [de("—")], 64))]),
			v("div", We, D(e.item.runtime ? `${e.item.runtime}m` : "—"), 1),
			v("div", Ge, [(w(!0), _(p, null, E(c.value, (e) => (w(), _("span", {
				key: e,
				class: "media-table-row__genre"
			}, D(e), 1))), 128)), c.value.length === 0 ? (w(), _(p, { key: 0 }, [de("—")], 64)) : g("", !0)])
		], 12, Re));
	}
}), [["__scopeId", "data-v-98c9b2ff"]]), qe = ["aria-label"], Je = [
	"disabled",
	"aria-label",
	"onClick"
], q = { class: "index-rail__label" }, J = {
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
		}, [v("span", q, D(t.label), 1), v("span", J, D(t.label), 1)], 10, Je))), 128))], 8, qe));
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
async function Z(e, t, r) {
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
}, it = 1, Q = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "LibraryPage",
	setup(e) {
		let b = r(), x = he(), C = ge(), j = te(), M = c(), N = i(), _e = a(), P = o(), ve = s(), F = t(), ye = m(() => F.viewMode === "list"), I = m(() => F.viewMode === "backdrop"), L = m(() => F.viewMode === "table"), R = m(() => L.value && j.items.length > 0), be = m(() => j.total > 0 ? j.total + 1 : -1), xe = { gridTemplateColumns: re }, Se = f(180), Ce = f(300), we = f(180), Ee = m(() => ye.value || I.value || L.value ? it : void 0), De = m(() => ye.value ? Se : I.value ? Ce : L.value ? we : void 0), Oe = T(null), ke = T([]), Ae = null, je = m(() => ke.value.some((e) => e.count > 0));
		async function Me() {
			Ae?.abort();
			let e = new AbortController();
			Ae = e;
			let t = j.queryParams, n = await Xe(b.value, {
				field: j.sort,
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
			e.signal.aborted || (ke.value = n.buckets);
		}
		function Ne(e) {
			Oe.value?.scrollToIndex(e);
		}
		let Pe = T(null), z = T(!1), B = T(!1), Fe = T(null), { inspectorItem: Ie, inspectorOpen: V, openInspector: H } = le();
		function U(e) {
			Pe.value = e, z.value = !0;
		}
		function Re() {
			K();
		}
		function ze(e) {
			j.items = j.items.map((t) => t.id === e.id ? e : t), P.success(`Updated poster for "${e.name}"`);
		}
		let W = m(() => {
			let e = x.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), Be = m(() => M.byId(W.value)?.name ?? "Library");
		l(() => M.byId(W.value)?.name);
		let G = m(() => M.byId(W.value)?.type === "music");
		k([W, G], () => {
			G.value && j.sort === "name" ? (j.setSort("artist"), j.reset(), j.fetchMedia(b.value)) : !G.value && j.sort === "artist" && (j.setSort("name"), j.reset(), j.fetchMedia(b.value));
		}, { immediate: !0 });
		function Ve() {
			W.value && (j.clearFilters(), j.setLibraryId(W.value), j.setTopLevel(!0), He(), j.reset(), j.fetchMedia(b.value), Me());
		}
		function He() {
			let e = x.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && j.setActors(t);
			let n = x.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && j.setGenres(r);
			let i = x.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && j.setCompanies(a);
			let o = Array.isArray(x.query.match) ? x.query.match[0] : x.query.match;
			(o === "matched" || o === "unmatched") && j.setMatchStatus(o);
		}
		function K() {
			j.reset(), j.fetchMedia(b.value), Me();
		}
		me(() => {
			M.load(b.value), Ve();
		}), k(W, Ve), k(b, K), k(() => j.sort, () => {
			Me();
		}), pe(() => {
			j.setLibraryId(void 0), j.setTopLevel(!1), j.clearFilters(), j.reset();
		});
		function Ue() {
			K();
		}
		function We(e, t) {
			j.ensureRange(b.value, e, t);
		}
		function Ge(e, t) {
			C?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let qe = null;
		function Je(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function q(e) {
			qe?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			qe = t;
			let r = () => t !== qe;
			try {
				let i = new n({ baseUrl: b.value }), a = await ue(i, b.value, e, _e.resumeMap, t?.signal);
				if (r()) return;
				if (!a) {
					P.info("Nothing to play yet");
					return;
				}
				Ge("player", a.id);
			} catch (e) {
				if (r() || Je(e)) return;
				P.info("Nothing to play yet");
			}
		}
		function J() {}
		function Y(e) {
			C?.hasRoute("media") && Ge("media", e.id);
		}
		function X(e) {
			ve.isWatched(e.id) ? P.success(`Marked "${e.name}" as watched`) : P.info(`Marked "${e.name}" as unwatched`);
		}
		function Z(e) {
			Pe.value = e, z.value = !0;
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
				if (await new n({ baseUrl: b.value }).deleteMediaItem(e.id), r()) return;
				j.items = j.items.filter((t) => t.id !== e.id), P.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || Je(t)) return;
				P.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (w(), _("div", Ze, [
			W.value ? (w(), _("section", Qe, [
				v("div", $e, [v("h1", et, D(Be.value), 1), v("span", tt, D(O(j).total.toLocaleString()) + " titles", 1)]),
				y(ae, {
					"show-artist-sort": G.value,
					onChange: Ue
				}, null, 8, ["show-artist-sort"]),
				O(j).error ? (w(), h(u, {
					key: 0,
					icon: "alert",
					title: "Couldn't load titles",
					description: O(j).error
				}, {
					actions: A(() => [y(ee, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: K
					}, {
						default: A(() => [...t[3] ||= [de("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : g("", !0),
				v("div", {
					class: "library-table",
					role: R.value ? "table" : void 0,
					"aria-label": R.value ? `${Be.value} titles` : void 0,
					"aria-rowcount": R.value ? be.value : void 0
				}, [R.value ? (w(), _("div", rt, [v("div", {
					class: "library-table__head-row",
					role: "row",
					"aria-rowindex": "1",
					style: xe
				}, [(w(!0), _(p, null, E(O(ne), (e, t) => (w(), _("span", {
					key: e.label,
					class: S(["library-table__head-cell", { "library-table__head-cell--hidden": t === 0 }]),
					role: "columnheader"
				}, D(e.label), 3))), 128))])])) : g("", !0), y(ie, {
					ref_key: "gridRef",
					ref: Oe,
					"data-view-mode": O(F).viewMode,
					"grid-role": R.value ? "rowgroup" : void 0,
					items: O(j).items,
					total: O(j).total,
					loading: O(j).loading && O(j).items.length === 0,
					"loading-more": O(j).loading && O(j).items.length > 0,
					"has-more": O(j).hasMore,
					"can-match": O(N).isAdmin,
					columns: Ee.value,
					"row-height": De.value,
					onNeedRange: We,
					onPlay: q,
					onWatchlist: J,
					onInfo: Y,
					onMatch: U,
					onMarkWatched: X,
					onRefresh: Z,
					onEditMetadata: U,
					onExploreData: O(H),
					onChoosePoster: Q,
					onRemove: $
				}, {
					card: A(({ item: e, index: t }) => [ye.value ? (w(), h(Te, {
						key: 0,
						item: e,
						"can-match": O(N).isAdmin,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: U,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: U,
						onExploreData: O(H)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : I.value ? (w(), h(Le, {
						key: 1,
						item: e,
						"can-match": O(N).isAdmin,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: U,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: U,
						onExploreData: O(H)
					}, null, 8, [
						"item",
						"can-match",
						"onExploreData"
					])) : L.value ? (w(), h(Ke, {
						key: 2,
						item: e,
						index: t,
						"can-match": O(N).isAdmin,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: U,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: U,
						onExploreData: O(H)
					}, null, 8, [
						"item",
						"index",
						"can-match",
						"onExploreData"
					])) : (w(), h(d, {
						key: 3,
						item: e,
						"can-match": O(N).isAdmin,
						lazy: !1,
						onPlay: q,
						onWatchlist: J,
						onInfo: Y,
						onMatch: U,
						onMarkWatched: X,
						onRefresh: Z,
						onChoosePoster: Q,
						onRemove: $,
						onEditMetadata: U,
						onExploreData: O(H)
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
				je.value ? (w(), h(Ye, {
					key: 1,
					buckets: ke.value,
					onJump: Ne
				}, null, 8, ["buckets"])) : g("", !0)
			])) : (w(), h(u, {
				key: 0,
				icon: "alert",
				title: "Library not found",
				description: "No library was specified."
			})),
			O(N).isAdmin ? (w(), h(oe, {
				key: 2,
				modelValue: z.value,
				"onUpdate:modelValue": t[0] ||= (e) => z.value = e,
				item: Pe.value,
				onApplied: Re
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			O(N).isAdmin ? (w(), h(se, {
				key: 3,
				modelValue: B.value,
				"onUpdate:modelValue": t[1] ||= (e) => B.value = e,
				item: Fe.value,
				onApplied: ze
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			O(N).isAdmin ? (w(), h(ce, {
				key: 4,
				modelValue: O(V),
				"onUpdate:modelValue": t[2] ||= (e) => fe(V) ? V.value = e : null,
				item: O(Ie)
			}, null, 8, ["modelValue", "item"])) : g("", !0)
		]));
	}
}), [["__scopeId", "data-v-8b3b5c06"]]);
//#endregion
export { Q as default };

//# sourceMappingURL=LibraryPage-C7GV2C-M.js.map