import { t as e } from "./client-Bmlfq3Uy.js";
import { n as t } from "./useApiBase-DXTBY90j.js";
import { t as n } from "./useMessages-vcPOKXXR.js";
import { n as r } from "./media-query-D7hrCu8r.js";
import { a as i } from "./usePlayerStore-CAcZwoN3.js";
import { t as a } from "./useToastStore-CxO_ppM8.js";
import { t as o } from "./useAuthStore-CyWIJiYx.js";
import { n as s } from "./ThumbRating-DStWNWi4.js";
import { t as c } from "./MediaDetail-Cd7EvNy1.js";
import { s as ee } from "./episode-order-DBEVgrOE.js";
import { t as l } from "./MediaCard-CPt--pdp.js";
import { a as te } from "./usePreferencesStore-BXm_CP7M.js";
import { n as u } from "./Icon-55iG1rR7.js";
import { t as ne } from "./MetadataMatchModal-CEyQkNoL.js";
import { t as re } from "./PosterPicker-D2O4VoxD.js";
import { t as ie } from "./ConfirmDialog-B4g1TjkQ.js";
import { n as d, t as ae } from "./useItemInspector-DJpXNrdX.js";
import { i as oe, n as se, t as ce } from "./useResolvePlayable-C1Fgbq2a.js";
import { t as le } from "./EmptyState-DjfWh3kt.js";
import { t as ue } from "./Button-DTiNkl61.js";
import { t as f } from "./Skeleton-DDhrDRE7.js";
import { i as de } from "./usePageTitle-j6j9gAmo.js";
import { n as fe, r as pe, t as me } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as he, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as ge, createVNode as v, defineComponent as y, inject as _e, isRef as ve, normalizeStyle as b, onBeforeUnmount as ye, onMounted as be, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, watch as xe, withCtx as E } from "vue";
import { useRoute as Se, useRouter as Ce } from "vue-router";
// src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var D = { class: "series-detail" }, O = ["aria-label"], k = { class: "series-detail__seasons-title" }, A = ["aria-label"], j = {
	key: 2,
	class: "series-detail__empty"
}, we = /*#__PURE__*/ u(/* @__PURE__ */ y({
	__name: "SeriesDetail",
	props: {
		item: {},
		seasons: {},
		loading: {
			type: Boolean,
			default: !1
		},
		resumeSeconds: { default: null },
		routerBase: { default: "/app" },
		canMatch: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"play",
		"resume",
		"watchlist",
		"info",
		"match",
		"back",
		"play-season",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove",
		"edit-metadata",
		"explore-data"
	],
	setup(e, { emit: t }) {
		let { t: r } = n(), i = e, a = t;
		function o(e) {
			return `${i.routerBase}/media/${i.item.id}/season/${ee(e)}`;
		}
		function s(e) {
			return e.seasonPoster ?? i.item.poster_url ?? null;
		}
		function u(e) {
			return r("series.episodeCount", { count: e.episodes.length });
		}
		function ne(e) {
			return e.seasonItem ? {
				...e.seasonItem,
				name: e.label,
				poster_url: s(e)
			} : {
				id: `${i.item.id}:${e.key}`,
				name: e.label,
				type: "season",
				poster_url: s(e),
				genres: [],
				year: null,
				rating: null,
				runtime: null,
				overview: null,
				actors: [],
				director: null,
				created_at: null,
				updated_at: null
			};
		}
		let re = p(() => i.seasons.length > 0), ie = te(), d = p(() => ie.cardSize ?? 200);
		return (t, n) => (x(), g("div", D, [v(c, {
			item: e.item,
			"resume-seconds": e.resumeSeconds,
			similar: [],
			"similar-loading": !1,
			"can-match": e.canMatch,
			onPlay: n[0] ||= (e) => a("play", e),
			onResume: n[1] ||= (e) => a("resume", e),
			onWatchlist: n[2] ||= (e) => a("watchlist", e),
			onInfo: n[3] ||= (e) => a("info", e),
			onMatch: n[4] ||= (e) => a("match", e),
			onBack: n[5] ||= (e) => a("back"),
			onMarkWatched: n[6] ||= (e) => a("mark-watched", e),
			onRefresh: n[7] ||= (e) => a("refresh", e),
			onChoosePoster: n[8] ||= (e) => a("choose-poster", e),
			onRemove: n[9] ||= (e) => a("remove", e),
			onEditMetadata: n[10] ||= (e) => a("edit-metadata", e),
			onExploreData: n[11] ||= (e) => a("explore-data", e)
		}, null, 8, [
			"item",
			"resume-seconds",
			"can-match"
		]), _("section", {
			class: "series-detail__seasons",
			"aria-label": T(r)("series.seasons")
		}, [_("h2", k, w(T(r)("series.seasons")), 1), e.loading ? (x(), g("div", {
			key: 0,
			class: "series-detail__seasons-loading",
			role: "status",
			"aria-busy": "true",
			"aria-label": T(r)("series.loadingSeasons")
		}, null, 8, A)) : re.value ? (x(), g("ul", {
			key: 1,
			class: "series-detail__grid",
			style: b({ gridTemplateColumns: `repeat(auto-fill, minmax(${d.value}px, 1fr))` })
		}, [(x(!0), g(he, null, C(e.seasons, (e) => (x(), g("li", {
			key: e.key,
			class: "series-detail__cell"
		}, [v(l, {
			item: ne(e),
			to: o(e),
			subtitle: u(e),
			"play-only": "",
			onPlay: (t) => a("play-season", e)
		}, null, 8, [
			"item",
			"to",
			"subtitle",
			"onPlay"
		])]))), 128))], 4)) : (x(), g("p", j, w(T(r)("series.noSeasons")), 1))], 8, O)]));
	}
}), [["__scopeId", "data-v-03b41ff3"]]), Te = { class: "media-detail-page" }, Ee = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, De = { class: "media-detail-page__loading-hero" }, Oe = { class: "media-detail-page__loading-info" }, M = /*#__PURE__*/ u(/* @__PURE__ */ y({
	__name: "MediaDetailPage",
	setup(ee) {
		let l = t(), te = _e("phlixConfig", void 0), u = p(() => te?.routerBase || "/app"), y = Se(), b = Ce(), C = i(), w = a(), { t: D } = n(), O = o(), k = s(), A = S(null), j = S([]), M = S([]), N = S(!0), P = S(!1), F = S(!1), I = S(null), L = p(() => String(y.params.id ?? "")), ke = p(() => C.resumePositionFor(L.value)), Ae = p(() => A.value?.type === "series");
		de(() => A.value?.name);
		let R = null, z = !1;
		function B(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function V(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				j.value = [];
				return;
			}
			let i = R, a = () => z || i !== R;
			P.value = !0;
			try {
				let o = r(l.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				j.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (a() || B(e)) return;
				j.value = [];
			} finally {
				a() || (P.value = !1);
			}
		}
		async function H(e, t) {
			let n = R, r = () => z || n !== R;
			F.value = !0, M.value = [];
			try {
				let i = await oe(e, l.value, t.id, n?.signal);
				if (r()) return;
				M.value = i;
			} catch (e) {
				if (r() || B(e)) return;
				M.value = [];
			} finally {
				r() || (F.value = !1);
			}
		}
		async function U() {
			let t = L.value;
			R?.abort(), R = typeof AbortController < "u" ? new AbortController() : null;
			let n = R;
			if (N.value = !0, I.value = null, j.value = [], M.value = [], !t) {
				I.value = D("common.missingMediaId"), N.value = !1;
				return;
			}
			let r = fe(t), i = Date.now(), a = pe(r, i);
			if (r && a) {
				if (z || n !== R) return;
				A.value = r.item, q.value = r.item, N.value = !1, k.hydrate(r.item), r.item.type === "series" ? H(new e({ baseUrl: l.value }), r.item) : V(new e({ baseUrl: l.value }), r.item);
			} else try {
				let n = new e({ baseUrl: l.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, R?.signal);
				if (z) return;
				let a = r.item;
				A.value = a, q.value = a, me(t, a, i), N.value = !1, k.hydrate(a), a.type === "series" ? H(n, a) : V(n, a);
			} catch (t) {
				if (z || B(t)) return;
				if (r) {
					A.value = r.item, q.value = r.item, N.value = !1, k.hydrate(r.item), r.item.type === "series" ? H(new e({ baseUrl: l.value }), r.item) : V(new e({ baseUrl: l.value }), r.item);
					return;
				}
				I.value = t instanceof Error ? t.message : "Failed to load title", N.value = !1;
			}
		}
		be(U), xe(L, U), ye(() => {
			z = !0, R?.abort(), R = null;
		});
		function W(e, t) {
			b?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function G(e) {
			if (e.type === "series") {
				let e = ce(M.value, C.resumeMap);
				e ? W("player", e.id) : w.info(D("library.nothingToPlay"));
			} else W("player", e.id);
		}
		function je(e) {
			let t = se(e, C.resumeMap);
			t ? W("player", t.id) : w.info(D("library.nothingToPlay"));
		}
		function Me(e) {
			k.isFavorite(e.id) ? w.success(D("itemActions.addedToList", { name: e.name })) : w.info(D("itemActions.removedFromList", { name: e.name }));
		}
		function Ne(e) {
			W("media", e.id);
		}
		function Pe() {
			b && (b.options.history.state?.back ? b.back() : b.hasRoute("browse") ? b.replace({ name: "browse" }) : b.replace("/"));
		}
		function K() {
			Pe();
		}
		function Fe(e) {
			let t = A.value?.library_id;
			t && b?.hasRoute("library") && b.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		let Ie = p(() => A.value?.library_id != null && b?.hasRoute("library") === !0);
		function Le(e) {
			let t = A.value?.library_id;
			t && b?.hasRoute("library") && b.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Re(e) {
			let t = A.value?.library_id;
			t && b?.hasRoute("library") && b.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let q = S(null), J = S(!1), Y = S(!1), { inspectorItem: ze, inspectorOpen: X, openInspector: Be } = ae();
		function Z(e) {
			let t = e ?? A.value;
			t && (q.value = t, J.value = !0);
		}
		function Ve(t) {
			A.value = t, q.value = t, w.success(`Updated metadata for “${t.name}”.`), t.type === "series" && H(new e({ baseUrl: l.value }), t);
		}
		function He(e) {
			k.isWatched(e.id) ? w.success(`Marked “${e.name}” as watched.`) : w.info(`Marked “${e.name}” as unwatched.`);
		}
		function Ue(e) {
			q.value = e, Y.value = !0;
		}
		function We(e) {
			A.value = e, q.value = e, w.success(`Updated poster for “${e.name}”.`);
		}
		let Q = null, $ = S(null);
		function Ge(e) {
			$.value = e;
		}
		async function Ke() {
			let t = $.value;
			if ($.value = null, !t) return;
			Q?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Q = n;
			let r = () => n !== Q;
			try {
				if (await new e({ baseUrl: l.value }).deleteMediaItem(t.id), r()) return;
				A.value = null, w.success(`Removed “${t.name}”.`), Pe();
			} catch (e) {
				if (r() || B(e)) return;
				w.error(`Failed to remove “${t.name}”.`, { message: e instanceof Error ? e.message : "Unknown error" });
			}
		}
		return (e, t) => (x(), g("div", Te, [
			N.value ? (x(), g("div", Ee, [_("div", De, [v(f, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), _("div", Oe, [
				v(f, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				v(f, {
					variant: "text",
					lines: 4
				}),
				v(f, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : I.value ? (x(), m(le, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load this title",
				description: I.value
			}, {
				actions: E(() => [v(ue, {
					variant: "solid",
					onClick: U
				}, {
					default: E(() => [...t[4] ||= [ge("Retry", -1)]]),
					_: 1
				}), v(ue, {
					variant: "ghost",
					onClick: K
				}, {
					default: E(() => [...t[5] ||= [ge("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value ? (x(), g(he, { key: 2 }, [Ae.value ? (x(), m(we, {
				key: 0,
				item: A.value,
				seasons: M.value,
				loading: F.value,
				"resume-seconds": ke.value,
				"router-base": u.value,
				"can-match": T(O).isAdmin,
				onPlay: G,
				onResume: G,
				onPlaySeason: je,
				onWatchlist: Me,
				onInfo: Ne,
				onMatch: Z,
				onMarkWatched: He,
				onRefresh: Z,
				onEditMetadata: Z,
				onExploreData: T(Be),
				onChoosePoster: Ue,
				onRemove: Ge,
				onBack: K
			}, null, 8, [
				"item",
				"seasons",
				"loading",
				"resume-seconds",
				"router-base",
				"can-match",
				"onExploreData"
			])) : (x(), m(c, {
				key: 1,
				item: A.value,
				"chips-clickable": Ie.value,
				"resume-seconds": ke.value,
				similar: j.value,
				"similar-loading": P.value,
				"can-match": T(O).isAdmin,
				onPlay: G,
				onResume: G,
				onWatchlist: Me,
				onInfo: Ne,
				onMatch: Z,
				onActor: Fe,
				onGenre: Le,
				onCompany: Re,
				onMarkWatched: He,
				onRefresh: Z,
				onEditMetadata: Z,
				onExploreData: T(Be),
				onChoosePoster: Ue,
				onRemove: Ge,
				onBack: K
			}, null, 8, [
				"item",
				"chips-clickable",
				"resume-seconds",
				"similar",
				"similar-loading",
				"can-match",
				"onExploreData"
			]))], 64)) : h("", !0),
			T(O).isAdmin ? (x(), m(ne, {
				key: 3,
				modelValue: J.value,
				"onUpdate:modelValue": t[0] ||= (e) => J.value = e,
				item: q.value,
				onApplied: Ve
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			T(O).isAdmin ? (x(), m(re, {
				key: 4,
				modelValue: Y.value,
				"onUpdate:modelValue": t[1] ||= (e) => Y.value = e,
				item: q.value,
				onApplied: We
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			v(ie, {
				open: $.value !== null,
				message: $.value ? `Remove “${$.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || ($.value = null);
				},
				onConfirm: Ke
			}, null, 8, ["open", "message"]),
			T(O).isAdmin ? (x(), m(d, {
				key: 5,
				modelValue: T(X),
				"onUpdate:modelValue": t[3] ||= (e) => ve(X) ? X.value = e : null,
				item: T(ze)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-48df87fc"]]);
export { M as default };

//# sourceMappingURL=MediaDetailPage-BSyCLV3n.js.map