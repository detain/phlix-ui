import { t as e } from "./client-CdNyEcUJ.js";
import { n as t } from "./useApiBase-DXTBY90j.js";
import { t as n } from "./useMessages-D54Bje5m.js";
import { n as r } from "./media-query-D7hrCu8r.js";
import { i } from "./usePlayerStore-BpohCwDP.js";
import { t as a } from "./useToastStore-CxO_ppM8.js";
import { t as o } from "./useAuthStore-BW5BEgYM.js";
import { n as s } from "./ThumbRating-CnHbMeyO.js";
import { t as c } from "./MediaDetail-8gnroEFr.js";
import { s as ee } from "./episode-order-DBEVgrOE.js";
import { t as l } from "./MediaCard-sbk9Din2.js";
import { a as te } from "./usePreferencesStore-DrDMAwjz.js";
import { a as ne } from "./plural-B3O2rVPV.js";
import { n as u } from "./Icon-55iG1rR7.js";
import { t as re } from "./MetadataMatchModal-p3cAYdBc.js";
import { t as ie } from "./PosterPicker-D5MBFVqp.js";
import { t as ae } from "./ConfirmDialog-MKcVfyNN.js";
import { n as oe, t as se } from "./useItemInspector-CC5nNuXm.js";
import { i as ce, n as le, t as ue } from "./useResolvePlayable-CnOPgUvz.js";
import { t as de } from "./EmptyState-DjfWh3kt.js";
import { t as fe } from "./Button-Dfl4y6vO.js";
import { t as d } from "./Skeleton-DDhrDRE7.js";
import { i as pe } from "./usePageTitle-j6j9gAmo.js";
import { n as me, r as he, t as ge } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as _e, createVNode as v, defineComponent as y, inject as ve, isRef as ye, normalizeStyle as b, onBeforeUnmount as be, onMounted as xe, openBlock as x, ref as S, renderList as C, unref as w, watch as Se, withCtx as T } from "vue";
import { useRoute as Ce, useRouter as we } from "vue-router";
// src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var E = { class: "series-detail" }, D = {
	class: "series-detail__seasons",
	"aria-label": "Seasons"
}, O = {
	key: 0,
	class: "series-detail__seasons-loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading seasons"
}, k = {
	key: 2,
	class: "series-detail__empty"
}, Te = /*#__PURE__*/ u(/* @__PURE__ */ y({
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
		let n = e, r = t;
		function i(e) {
			return `${n.routerBase}/media/${n.item.id}/season/${ee(e)}`;
		}
		function a(e) {
			return e.seasonPoster ?? n.item.poster_url ?? null;
		}
		function o(e) {
			let t = e.episodes.length;
			return ne(t, "episode", "episodes");
		}
		function s(e) {
			return e.seasonItem ? {
				...e.seasonItem,
				name: e.label,
				poster_url: a(e)
			} : {
				id: `${n.item.id}:${e.key}`,
				name: e.label,
				type: "season",
				poster_url: a(e),
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
		let u = p(() => n.seasons.length > 0), re = te(), ie = p(() => re.cardSize ?? 200);
		return (t, n) => (x(), g("div", E, [v(c, {
			item: e.item,
			"resume-seconds": e.resumeSeconds,
			similar: [],
			"similar-loading": !1,
			"can-match": e.canMatch,
			onPlay: n[0] ||= (e) => r("play", e),
			onResume: n[1] ||= (e) => r("resume", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e),
			onMatch: n[4] ||= (e) => r("match", e),
			onBack: n[5] ||= (e) => r("back"),
			onMarkWatched: n[6] ||= (e) => r("mark-watched", e),
			onRefresh: n[7] ||= (e) => r("refresh", e),
			onChoosePoster: n[8] ||= (e) => r("choose-poster", e),
			onRemove: n[9] ||= (e) => r("remove", e),
			onEditMetadata: n[10] ||= (e) => r("edit-metadata", e),
			onExploreData: n[11] ||= (e) => r("explore-data", e)
		}, null, 8, [
			"item",
			"resume-seconds",
			"can-match"
		]), _("section", D, [n[12] ||= _("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (x(), g("div", O)) : u.value ? (x(), g("ul", {
			key: 1,
			class: "series-detail__grid",
			style: b({ gridTemplateColumns: `repeat(auto-fill, minmax(${ie.value}px, 1fr))` })
		}, [(x(!0), g(f, null, C(e.seasons, (e) => (x(), g("li", {
			key: e.key,
			class: "series-detail__cell"
		}, [v(l, {
			item: s(e),
			to: i(e),
			subtitle: o(e),
			"play-only": "",
			onPlay: (t) => r("play-season", e)
		}, null, 8, [
			"item",
			"to",
			"subtitle",
			"onPlay"
		])]))), 128))], 4)) : (x(), g("p", k, "This series has no seasons available to watch."))])]));
	}
}), [["__scopeId", "data-v-6e08b53c"]]), Ee = { class: "media-detail-page" }, De = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, Oe = { class: "media-detail-page__loading-hero" }, ke = { class: "media-detail-page__loading-info" }, A = /*#__PURE__*/ u(/* @__PURE__ */ y({
	__name: "MediaDetailPage",
	setup(ee) {
		let l = t(), te = ve("phlixConfig", void 0), ne = p(() => te?.routerBase || "/app"), u = Ce(), y = we(), b = i(), C = a(), { t: E } = n(), D = o(), O = s(), k = S(null), A = S([]), j = S([]), M = S(!0), N = S(!1), P = S(!1), F = S(null), I = p(() => String(u.params.id ?? "")), L = p(() => b.resumePositionFor(I.value)), Ae = p(() => k.value?.type === "series");
		pe(() => k.value?.name);
		let R = null, z = !1;
		function B(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function V(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				A.value = [];
				return;
			}
			let i = R, a = () => z || i !== R;
			N.value = !0;
			try {
				let o = r(l.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				A.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (a() || B(e)) return;
				A.value = [];
			} finally {
				a() || (N.value = !1);
			}
		}
		async function H(e, t) {
			let n = R, r = () => z || n !== R;
			P.value = !0, j.value = [];
			try {
				let i = await ce(e, l.value, t.id, n?.signal);
				if (r()) return;
				j.value = i;
			} catch (e) {
				if (r() || B(e)) return;
				j.value = [];
			} finally {
				r() || (P.value = !1);
			}
		}
		async function U() {
			let t = I.value;
			R?.abort(), R = typeof AbortController < "u" ? new AbortController() : null;
			let n = R;
			if (M.value = !0, F.value = null, A.value = [], j.value = [], !t) {
				F.value = E("common.missingMediaId"), M.value = !1;
				return;
			}
			let r = me(t), i = Date.now(), a = he(r, i);
			if (r && a) {
				if (z || n !== R) return;
				k.value = r.item, q.value = r.item, M.value = !1, O.hydrate(r.item), r.item.type === "series" ? H(new e({ baseUrl: l.value }), r.item) : V(new e({ baseUrl: l.value }), r.item);
			} else try {
				let n = new e({ baseUrl: l.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, R?.signal);
				if (z) return;
				let a = r.item;
				k.value = a, q.value = a, ge(t, a, i), M.value = !1, O.hydrate(a), a.type === "series" ? H(n, a) : V(n, a);
			} catch (t) {
				if (z || B(t)) return;
				if (r) {
					k.value = r.item, q.value = r.item, M.value = !1, O.hydrate(r.item), r.item.type === "series" ? H(new e({ baseUrl: l.value }), r.item) : V(new e({ baseUrl: l.value }), r.item);
					return;
				}
				F.value = t instanceof Error ? t.message : "Failed to load title", M.value = !1;
			}
		}
		xe(U), Se(I, U), be(() => {
			z = !0, R?.abort(), R = null;
		});
		function W(e, t) {
			y?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function G(e) {
			if (e.type === "series") {
				let e = ue(j.value, b.resumeMap);
				e ? W("player", e.id) : C.info(E("library.nothingToPlay"));
			} else W("player", e.id);
		}
		function je(e) {
			let t = le(e, b.resumeMap);
			t ? W("player", t.id) : C.info(E("library.nothingToPlay"));
		}
		function Me(e) {
			O.isFavorite(e.id) ? C.success(E("itemActions.addedToList", { name: e.name })) : C.info(E("itemActions.removedFromList", { name: e.name }));
		}
		function Ne(e) {
			W("media", e.id);
		}
		function Pe() {
			y && (y.options.history.state?.back ? y.back() : y.hasRoute("browse") ? y.replace({ name: "browse" }) : y.replace("/"));
		}
		function K() {
			Pe();
		}
		function Fe(e) {
			let t = k.value?.library_id;
			t && y?.hasRoute("library") && y.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		let Ie = p(() => k.value?.library_id != null && y?.hasRoute("library") === !0);
		function Le(e) {
			let t = k.value?.library_id;
			t && y?.hasRoute("library") && y.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Re(e) {
			let t = k.value?.library_id;
			t && y?.hasRoute("library") && y.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let q = S(null), J = S(!1), Y = S(!1), { inspectorItem: ze, inspectorOpen: X, openInspector: Be } = se();
		function Z(e) {
			let t = e ?? k.value;
			t && (q.value = t, J.value = !0);
		}
		function Ve(t) {
			k.value = t, q.value = t, C.success(`Updated metadata for “${t.name}”.`), t.type === "series" && H(new e({ baseUrl: l.value }), t);
		}
		function He(e) {
			O.isWatched(e.id) ? C.success(`Marked “${e.name}” as watched.`) : C.info(`Marked “${e.name}” as unwatched.`);
		}
		function Ue(e) {
			q.value = e, Y.value = !0;
		}
		function We(e) {
			k.value = e, q.value = e, C.success(`Updated poster for “${e.name}”.`);
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
				k.value = null, C.success(`Removed “${t.name}”.`), Pe();
			} catch (e) {
				if (r() || B(e)) return;
				C.error(`Failed to remove “${t.name}”.`, { message: e instanceof Error ? e.message : "Unknown error" });
			}
		}
		return (e, t) => (x(), g("div", Ee, [
			M.value ? (x(), g("div", De, [_("div", Oe, [v(d, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), _("div", ke, [
				v(d, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				v(d, {
					variant: "text",
					lines: 4
				}),
				v(d, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : F.value ? (x(), m(de, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load this title",
				description: F.value
			}, {
				actions: T(() => [v(fe, {
					variant: "solid",
					onClick: U
				}, {
					default: T(() => [...t[4] ||= [_e("Retry", -1)]]),
					_: 1
				}), v(fe, {
					variant: "ghost",
					onClick: K
				}, {
					default: T(() => [...t[5] ||= [_e("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : k.value ? (x(), g(f, { key: 2 }, [Ae.value ? (x(), m(Te, {
				key: 0,
				item: k.value,
				seasons: j.value,
				loading: P.value,
				"resume-seconds": L.value,
				"router-base": ne.value,
				"can-match": w(D).isAdmin,
				onPlay: G,
				onResume: G,
				onPlaySeason: je,
				onWatchlist: Me,
				onInfo: Ne,
				onMatch: Z,
				onMarkWatched: He,
				onRefresh: Z,
				onEditMetadata: Z,
				onExploreData: w(Be),
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
				item: k.value,
				"chips-clickable": Ie.value,
				"resume-seconds": L.value,
				similar: A.value,
				"similar-loading": N.value,
				"can-match": w(D).isAdmin,
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
				onExploreData: w(Be),
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
			w(D).isAdmin ? (x(), m(re, {
				key: 3,
				modelValue: J.value,
				"onUpdate:modelValue": t[0] ||= (e) => J.value = e,
				item: q.value,
				onApplied: Ve
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			w(D).isAdmin ? (x(), m(ie, {
				key: 4,
				modelValue: Y.value,
				"onUpdate:modelValue": t[1] ||= (e) => Y.value = e,
				item: q.value,
				onApplied: We
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			v(ae, {
				open: $.value !== null,
				message: $.value ? `Remove “${$.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || ($.value = null);
				},
				onConfirm: Ke
			}, null, 8, ["open", "message"]),
			w(D).isAdmin ? (x(), m(oe, {
				key: 5,
				modelValue: w(X),
				"onUpdate:modelValue": t[3] ||= (e) => ye(X) ? X.value = e : null,
				item: w(ze)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-48df87fc"]]);
export { A as default };

//# sourceMappingURL=MediaDetailPage-B154gd8h.js.map