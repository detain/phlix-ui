import { t as e } from "./client-CW4dUyY-.js";
import { n as t } from "./useApiBase-DXTBY90j.js";
import { t as n } from "./useMessages-DrceiftD.js";
import { n as r } from "./media-query-D7hrCu8r.js";
import { i } from "./usePlayerStore-B7mnqLe3.js";
import { t as a } from "./useToastStore-Bu-iYU7r.js";
import { t as o } from "./useAuthStore-Du8LTnU5.js";
import { n as s } from "./ThumbRating-Bi26fH2C.js";
import { t as c } from "./MediaDetail-C6HBqEnW.js";
import { s as ee } from "./episode-order-DBEVgrOE.js";
import { t as l } from "./MediaCard-DM99QreQ.js";
import { a as te } from "./usePreferencesStore-DrDMAwjz.js";
import { a as ne } from "./plural-B3O2rVPV.js";
import { n as u } from "./Icon-CIbfiPrs.js";
import { t as re } from "./MetadataMatchModal-CLVKratB.js";
import { t as ie } from "./PosterPicker-BSQDAS4S.js";
import { t as ae } from "./ConfirmDialog-CVLhzK8i.js";
import { n as oe, t as se } from "./useItemInspector-CqJTJ23o.js";
import { i as ce, n as le, t as ue } from "./useResolvePlayable-CnOPgUvz.js";
import { t as de } from "./EmptyState-BjOJ1k_A.js";
import { t as d } from "./Button-1sKEdGjj.js";
import { t as f } from "./Skeleton-B2Mt2L00.js";
import { i as fe } from "./usePageTitle-j6j9gAmo.js";
import { n as pe, r as me, t as he } from "./useMediaItemCache-B7dWHUPS.js";
import { Fragment as ge, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as _e, createVNode as v, defineComponent as y, inject as ve, isRef as ye, normalizeStyle as b, onBeforeUnmount as be, onMounted as xe, openBlock as x, ref as S, renderList as C, unref as w, watch as Se, withCtx as T } from "vue";
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
		}, [(x(!0), g(ge, null, C(e.seasons, (e) => (x(), g("li", {
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
		let l = t(), te = ve("phlixConfig", void 0), ne = p(() => te?.routerBase || "/app"), u = Ce(), y = we(), b = i(), C = a(), { t: E } = n(), D = o(), O = s(), k = S(null), A = S([]), j = S([]), M = S(!0), N = S(!1), P = S(!1), F = S(null), I = p(() => String(u.params.id ?? "")), Ae = p(() => b.resumePositionFor(I.value)), je = p(() => k.value?.type === "series");
		fe(() => k.value?.name);
		let L = null, R = !1;
		function z(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function B(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				A.value = [];
				return;
			}
			let i = L, a = () => R || i !== L;
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
				if (a() || z(e)) return;
				A.value = [];
			} finally {
				a() || (N.value = !1);
			}
		}
		async function V(e, t) {
			let n = L, r = () => R || n !== L;
			P.value = !0, j.value = [];
			try {
				let i = await ce(e, l.value, t.id, n?.signal);
				if (r()) return;
				j.value = i;
			} catch (e) {
				if (r() || z(e)) return;
				j.value = [];
			} finally {
				r() || (P.value = !1);
			}
		}
		async function H() {
			let t = I.value;
			L?.abort(), L = typeof AbortController < "u" ? new AbortController() : null;
			let n = L;
			if (M.value = !0, F.value = null, A.value = [], j.value = [], !t) {
				F.value = "No media id provided", M.value = !1;
				return;
			}
			let r = pe(t), i = Date.now(), a = me(r, i);
			if (r && a) {
				if (R || n !== L) return;
				k.value = r.item, K.value = r.item, M.value = !1, O.hydrate(r.item), r.item.type === "series" ? V(new e({ baseUrl: l.value }), r.item) : B(new e({ baseUrl: l.value }), r.item);
			} else try {
				let n = new e({ baseUrl: l.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, L?.signal);
				if (R) return;
				let a = r.item;
				k.value = a, K.value = a, he(t, a, i), M.value = !1, O.hydrate(a), a.type === "series" ? V(n, a) : B(n, a);
			} catch (t) {
				if (R || z(t)) return;
				if (r) {
					k.value = r.item, K.value = r.item, M.value = !1, O.hydrate(r.item), r.item.type === "series" ? V(new e({ baseUrl: l.value }), r.item) : B(new e({ baseUrl: l.value }), r.item);
					return;
				}
				F.value = t instanceof Error ? t.message : "Failed to load title", M.value = !1;
			}
		}
		xe(H), Se(I, H), be(() => {
			R = !0, L?.abort(), L = null;
		});
		function U(e, t) {
			y?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function W(e) {
			if (e.type === "series") {
				let e = ue(j.value, b.resumeMap);
				e ? U("player", e.id) : C.info("Nothing to play yet.");
			} else U("player", e.id);
		}
		function Me(e) {
			let t = le(e, b.resumeMap);
			t ? U("player", t.id) : C.info("Nothing to play yet.");
		}
		function Ne(e) {
			O.isFavorite(e.id) ? C.success(E("itemActions.addedToList", { name: e.name })) : C.info(E("itemActions.removedFromList", { name: e.name }));
		}
		function Pe(e) {
			U("media", e.id);
		}
		function Fe() {
			y && (y.options.history.state?.back ? y.back() : y.hasRoute("browse") ? y.replace({ name: "browse" }) : y.replace("/"));
		}
		function G() {
			Fe();
		}
		function Ie(e) {
			let t = k.value?.library_id;
			t && y?.hasRoute("library") && y.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		let Le = p(() => k.value?.library_id != null && y?.hasRoute("library") === !0);
		function Re(e) {
			let t = k.value?.library_id;
			t && y?.hasRoute("library") && y.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function ze(e) {
			let t = k.value?.library_id;
			t && y?.hasRoute("library") && y.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let K = S(null), q = S(!1), J = S(!1), { inspectorItem: Be, inspectorOpen: Y, openInspector: Ve } = se();
		function X(e) {
			let t = e ?? k.value;
			t && (K.value = t, q.value = !0);
		}
		function He(t) {
			k.value = t, K.value = t, C.success(`Updated metadata for “${t.name}”.`), t.type === "series" && V(new e({ baseUrl: l.value }), t);
		}
		function Ue(e) {
			O.isWatched(e.id) ? C.success(`Marked “${e.name}” as watched.`) : C.info(`Marked “${e.name}” as unwatched.`);
		}
		function We(e) {
			K.value = e, J.value = !0;
		}
		function Ge(e) {
			k.value = e, K.value = e, C.success(`Updated poster for “${e.name}”.`);
		}
		let Z = null, Q = S(null);
		function $(e) {
			Q.value = e;
		}
		async function Ke() {
			let t = Q.value;
			if (Q.value = null, !t) return;
			Z?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Z = n;
			let r = () => n !== Z;
			try {
				if (await new e({ baseUrl: l.value }).deleteMediaItem(t.id), r()) return;
				k.value = null, C.success(`Removed “${t.name}”.`), Fe();
			} catch (e) {
				if (r() || z(e)) return;
				C.error(`Failed to remove “${t.name}”.`, { message: e instanceof Error ? e.message : "Unknown error" });
			}
		}
		return (e, t) => (x(), g("div", Ee, [
			M.value ? (x(), g("div", De, [_("div", Oe, [v(f, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), _("div", ke, [
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
			])])])) : F.value ? (x(), m(de, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load this title",
				description: F.value
			}, {
				actions: T(() => [v(d, {
					variant: "solid",
					onClick: H
				}, {
					default: T(() => [...t[4] ||= [_e("Retry", -1)]]),
					_: 1
				}), v(d, {
					variant: "ghost",
					onClick: G
				}, {
					default: T(() => [...t[5] ||= [_e("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : k.value ? (x(), g(ge, { key: 2 }, [je.value ? (x(), m(Te, {
				key: 0,
				item: k.value,
				seasons: j.value,
				loading: P.value,
				"resume-seconds": Ae.value,
				"router-base": ne.value,
				"can-match": w(D).isAdmin,
				onPlay: W,
				onResume: W,
				onPlaySeason: Me,
				onWatchlist: Ne,
				onInfo: Pe,
				onMatch: X,
				onMarkWatched: Ue,
				onRefresh: X,
				onEditMetadata: X,
				onExploreData: w(Ve),
				onChoosePoster: We,
				onRemove: $,
				onBack: G
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
				"chips-clickable": Le.value,
				"resume-seconds": Ae.value,
				similar: A.value,
				"similar-loading": N.value,
				"can-match": w(D).isAdmin,
				onPlay: W,
				onResume: W,
				onWatchlist: Ne,
				onInfo: Pe,
				onMatch: X,
				onActor: Ie,
				onGenre: Re,
				onCompany: ze,
				onMarkWatched: Ue,
				onRefresh: X,
				onEditMetadata: X,
				onExploreData: w(Ve),
				onChoosePoster: We,
				onRemove: $,
				onBack: G
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
				modelValue: q.value,
				"onUpdate:modelValue": t[0] ||= (e) => q.value = e,
				item: K.value,
				onApplied: He
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			w(D).isAdmin ? (x(), m(ie, {
				key: 4,
				modelValue: J.value,
				"onUpdate:modelValue": t[1] ||= (e) => J.value = e,
				item: K.value,
				onApplied: Ge
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			v(ae, {
				open: Q.value !== null,
				message: Q.value ? `Remove “${Q.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || (Q.value = null);
				},
				onConfirm: Ke
			}, null, 8, ["open", "message"]),
			w(D).isAdmin ? (x(), m(oe, {
				key: 5,
				modelValue: w(Y),
				"onUpdate:modelValue": t[3] ||= (e) => ye(Y) ? Y.value = e : null,
				item: w(Be)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-b0d468dc"]]);
export { A as default };

//# sourceMappingURL=MediaDetailPage-BR4WLz7a.js.map