import { n as e } from "./Icon-CIwTuFLd.js";
import { a as t } from "./usePreferencesStore-CFPikE8Z.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./useMessages-M5VcrfIX.js";
import { t as i } from "./client-DdVqCKVh.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useAuthStore-Bi1-VYV4.js";
import { i as s } from "./usePlayerStore-D8A_gb_c.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { n as te } from "./ThumbRating-B5EFc49E.js";
import { t as ne } from "./EmptyState-BAyOxAcK.js";
import { t as c } from "./Button-BuG0GvCa.js";
import { i as re } from "./usePageTitle-BO3GGF3M.js";
import { t as ie } from "./ConfirmDialog-CusF0Ku-.js";
import { t as l } from "./Skeleton-rHw-IJtl.js";
import { t as ae } from "./MediaCard-CT1dSDzK.js";
import { n as oe } from "./media-query-DKjhlX8r.js";
import { t as se } from "./MediaDetail-BGEv-Sr1.js";
import { t as ce } from "./MetadataMatchModal-BqXZFpiN.js";
import { t as le } from "./PosterPicker-BG9797rE.js";
import { n as ue, t as de } from "./useItemInspector-CkA8DxYe.js";
import { s as u } from "./episode-order-C2yqgMeX.js";
import { i as fe, n as pe, t as me } from "./useResolvePlayable-wCiMWuME.js";
import { n as he, r as ge, t as _e } from "./useMediaItemCache-BKCJnCbr.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as ve, createVNode as _, defineComponent as v, inject as ye, isRef as be, normalizeStyle as y, onBeforeUnmount as xe, onMounted as Se, openBlock as b, ref as x, renderList as S, unref as C, watch as Ce, withCtx as w } from "vue";
import { useRoute as we, useRouter as Te } from "vue-router";
//#region src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var T = { class: "series-detail" }, E = {
	class: "series-detail__seasons",
	"aria-label": "Seasons"
}, D = {
	key: 0,
	class: "series-detail__seasons-loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading seasons"
}, O = {
	key: 2,
	class: "series-detail__empty"
}, Ee = /*#__PURE__*/ e(/* @__PURE__ */ v({
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
	setup(e, { emit: r }) {
		let i = e, a = r;
		function o(e) {
			return `${i.routerBase}/media/${i.item.id}/season/${u(e)}`;
		}
		function s(e) {
			return e.seasonPoster ?? i.item.poster_url ?? null;
		}
		function ee(e) {
			let t = e.episodes.length;
			return n(t, "episode", "episodes");
		}
		function te(e) {
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
		let ne = f(() => i.seasons.length > 0), c = t(), re = f(() => c.cardSize ?? 200);
		return (t, n) => (b(), h("div", T, [_(se, {
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
		]), g("section", E, [n[12] ||= g("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (b(), h("div", D)) : ne.value ? (b(), h("ul", {
			key: 1,
			class: "series-detail__grid",
			style: y({ gridTemplateColumns: `repeat(auto-fill, minmax(${re.value}px, 1fr))` })
		}, [(b(!0), h(d, null, S(e.seasons, (e) => (b(), h("li", {
			key: e.key,
			class: "series-detail__cell"
		}, [_(ae, {
			item: te(e),
			to: o(e),
			subtitle: ee(e),
			"play-only": "",
			onPlay: (t) => a("play-season", e)
		}, null, 8, [
			"item",
			"to",
			"subtitle",
			"onPlay"
		])]))), 128))], 4)) : (b(), h("p", O, "This series has no seasons available to watch."))])]));
	}
}), [["__scopeId", "data-v-6e08b53c"]]), De = { class: "media-detail-page" }, Oe = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, ke = { class: "media-detail-page__loading-hero" }, Ae = { class: "media-detail-page__loading-info" }, k = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "MediaDetailPage",
	setup(e) {
		let t = a(), n = ye("phlixConfig", void 0), ae = f(() => n?.routerBase || "/app"), u = we(), v = Te(), y = s(), S = ee(), { t: T } = r(), E = o(), D = te(), O = x(null), k = x([]), A = x([]), j = x(!0), M = x(!1), N = x(!1), P = x(null), F = f(() => String(u.params.id ?? "")), I = f(() => y.resumePositionFor(F.value)), je = f(() => O.value?.type === "series");
		re(() => O.value?.name);
		let L = null, R = !1;
		function z(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function B(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				k.value = [];
				return;
			}
			let i = L, a = () => R || i !== L;
			M.value = !0;
			try {
				let o = oe(t.value, {
					genres: [r],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				k.value = (s.items ?? []).filter((e) => e.id !== n.id).slice(0, 12);
			} catch (e) {
				if (a() || z(e)) return;
				k.value = [];
			} finally {
				a() || (M.value = !1);
			}
		}
		async function V(e, n) {
			let r = L, i = () => R || r !== L;
			N.value = !0, A.value = [];
			try {
				let a = await fe(e, t.value, n.id, r?.signal);
				if (i()) return;
				A.value = a;
			} catch (e) {
				if (i() || z(e)) return;
				A.value = [];
			} finally {
				i() || (N.value = !1);
			}
		}
		async function H() {
			let e = F.value;
			L?.abort(), L = typeof AbortController < "u" ? new AbortController() : null;
			let n = L;
			if (j.value = !0, P.value = null, k.value = [], A.value = [], !e) {
				P.value = "No media id provided", j.value = !1;
				return;
			}
			let r = he(e), a = Date.now(), o = ge(r, a);
			if (r && o) {
				if (R || n !== L) return;
				O.value = r.item, K.value = r.item, j.value = !1, D.hydrate(r.item), r.item.type === "series" ? V(new i({ baseUrl: t.value }), r.item) : B(new i({ baseUrl: t.value }), r.item);
				return;
			}
			try {
				let n = new i({ baseUrl: t.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, L?.signal);
				if (R) return;
				let o = r.item;
				O.value = o, K.value = o, _e(e, o, a), j.value = !1, D.hydrate(o), o.type === "series" ? V(n, o) : B(n, o);
			} catch (e) {
				if (R || z(e)) return;
				if (r) {
					O.value = r.item, K.value = r.item, j.value = !1, D.hydrate(r.item), r.item.type === "series" ? V(new i({ baseUrl: t.value }), r.item) : B(new i({ baseUrl: t.value }), r.item);
					return;
				}
				P.value = e instanceof Error ? e.message : "Failed to load title", j.value = !1;
			}
		}
		Se(H), Ce(F, H), xe(() => {
			R = !0, L?.abort(), L = null;
		});
		function U(e, t) {
			v?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function W(e) {
			if (e.type === "series") {
				let e = me(A.value, y.resumeMap);
				e ? U("player", e.id) : S.info("No episodes to play yet");
				return;
			}
			U("player", e.id);
		}
		function Me(e) {
			let t = pe(e, y.resumeMap);
			t ? U("player", t.id) : S.info("No episodes to play yet");
		}
		function Ne(e) {
			D.isFavorite(e.id) ? S.success(T("itemActions.addedToList", { name: e.name })) : S.info(T("itemActions.removedFromList", { name: e.name }));
		}
		function Pe(e) {
			U("media", e.id);
		}
		function Fe() {
			if (v) {
				if (v.options.history.state?.back) {
					v.back();
					return;
				}
				v.hasRoute("browse") ? v.replace({ name: "browse" }) : v.replace("/");
			}
		}
		function G() {
			Fe();
		}
		function Ie(e) {
			let t = O.value?.library_id;
			t && v?.hasRoute("library") && v.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		let Le = f(() => O.value?.library_id != null && v?.hasRoute("library") === !0);
		function Re(e) {
			let t = O.value?.library_id;
			t && v?.hasRoute("library") && v.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function ze(e) {
			let t = O.value?.library_id;
			t && v?.hasRoute("library") && v.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let K = x(null), q = x(!1), J = x(!1), { inspectorItem: Be, inspectorOpen: Y, openInspector: Ve } = de();
		function X(e) {
			let t = e ?? O.value;
			t && (K.value = t, q.value = !0);
		}
		function He(e) {
			O.value = e, K.value = e, S.success(`Updated metadata for "${e.name}"`), e.type === "series" && V(new i({ baseUrl: t.value }), e);
		}
		function Ue(e) {
			D.isWatched(e.id) ? S.success(`Marked "${e.name}" as watched`) : S.info(`Marked "${e.name}" as unwatched`);
		}
		function We(e) {
			K.value = e, J.value = !0;
		}
		function Ge(e) {
			O.value = e, K.value = e, S.success(`Updated poster for "${e.name}"`);
		}
		let Z = null, Q = x(null);
		function $(e) {
			Q.value = e;
		}
		async function Ke() {
			let e = Q.value;
			if (Q.value = null, !e) return;
			Z?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Z = n;
			let r = () => n !== Z;
			try {
				if (await new i({ baseUrl: t.value }).deleteMediaItem(e.id), r()) return;
				O.value = null, S.success(`Removed "${e.name}"`), Fe();
			} catch (t) {
				if (r() || z(t)) return;
				S.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (b(), h("div", De, [
			j.value ? (b(), h("div", Oe, [g("div", ke, [_(l, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), g("div", Ae, [
				_(l, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				_(l, {
					variant: "text",
					lines: 4
				}),
				_(l, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : P.value ? (b(), p(ne, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: P.value
			}, {
				actions: w(() => [_(c, {
					variant: "solid",
					onClick: H
				}, {
					default: w(() => [...t[4] ||= [ve("Retry", -1)]]),
					_: 1
				}), _(c, {
					variant: "ghost",
					onClick: G
				}, {
					default: w(() => [...t[5] ||= [ve("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : O.value ? (b(), h(d, { key: 2 }, [je.value ? (b(), p(Ee, {
				key: 0,
				item: O.value,
				seasons: A.value,
				loading: N.value,
				"resume-seconds": I.value,
				"router-base": ae.value,
				"can-match": C(E).isAdmin,
				onPlay: W,
				onResume: W,
				onPlaySeason: Me,
				onWatchlist: Ne,
				onInfo: Pe,
				onMatch: X,
				onMarkWatched: Ue,
				onRefresh: X,
				onEditMetadata: X,
				onExploreData: C(Ve),
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
			])) : (b(), p(se, {
				key: 1,
				item: O.value,
				"chips-clickable": Le.value,
				"resume-seconds": I.value,
				similar: k.value,
				"similar-loading": M.value,
				"can-match": C(E).isAdmin,
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
				onExploreData: C(Ve),
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
			]))], 64)) : m("", !0),
			C(E).isAdmin ? (b(), p(ce, {
				key: 3,
				modelValue: q.value,
				"onUpdate:modelValue": t[0] ||= (e) => q.value = e,
				item: K.value,
				onApplied: He
			}, null, 8, ["modelValue", "item"])) : m("", !0),
			C(E).isAdmin ? (b(), p(le, {
				key: 4,
				modelValue: J.value,
				"onUpdate:modelValue": t[1] ||= (e) => J.value = e,
				item: K.value,
				onApplied: Ge
			}, null, 8, ["modelValue", "item"])) : m("", !0),
			_(ie, {
				open: Q.value !== null,
				message: Q.value ? `Remove “${Q.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || (Q.value = null);
				},
				onConfirm: Ke
			}, null, 8, ["open", "message"]),
			C(E).isAdmin ? (b(), p(ue, {
				key: 5,
				modelValue: C(Y),
				"onUpdate:modelValue": t[3] ||= (e) => be(Y) ? Y.value = e : null,
				item: C(Be)
			}, null, 8, ["modelValue", "item"])) : m("", !0)
		]));
	}
}), [["__scopeId", "data-v-ae2532df"]]);
//#endregion
export { k as default };

//# sourceMappingURL=MediaDetailPage-D8Jmn48f.js.map