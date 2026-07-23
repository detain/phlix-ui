import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { a as t } from "./usePreferencesStore-C9GLbD7G.js";
import { t as n } from "./client-BzWwyWKr.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-Ds0NVhBP.js";
import { i as a } from "./usePlayerStore-Dgw0JCWb.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { n as s } from "./ThumbRating-BxiWuYAs.js";
import { i as c } from "./usePageTitle-BO3GGF3M.js";
import { t as l } from "./Button-DWa6Ld_Z.js";
import { t as u } from "./Skeleton-DhQmxeNg.js";
import { t as d } from "./EmptyState-ZlI5t4KT.js";
import { t as ee } from "./MediaCard-B11kpZL_.js";
import { n as te } from "./media-query-DKjhlX8r.js";
import { t as ne } from "./MediaDetail-BWi-qTpJ.js";
import { t as re } from "./MetadataMatchModal-BbaA7xKl.js";
import { t as ie } from "./PosterPicker-C5hu8ehM.js";
import { n as ae, t as oe } from "./useItemInspector-BTx_gnEr.js";
import { s as f } from "./episode-order-C2yqgMeX.js";
import { i as se, n as ce, t as le } from "./useResolvePlayable-wCiMWuME.js";
import { n as ue, r as de, t as fe } from "./useMediaItemCache-BKCJnCbr.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as pe, createVNode as y, defineComponent as b, inject as me, isRef as he, normalizeStyle as x, onBeforeUnmount as ge, onMounted as _e, openBlock as S, ref as C, renderList as w, unref as T, watch as ve, withCtx as E } from "vue";
import { useRoute as ye, useRouter as be } from "vue-router";
//#region src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var D = { class: "series-detail" }, O = {
	class: "series-detail__seasons",
	"aria-label": "Seasons"
}, k = {
	key: 0,
	class: "series-detail__seasons-loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading seasons"
}, A = {
	key: 2,
	class: "series-detail__empty"
}, xe = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
	setup(e, { emit: n }) {
		let r = e, i = n;
		function a(e) {
			return `${r.routerBase}/media/${r.item.id}/season/${f(e)}`;
		}
		function o(e) {
			return e.seasonPoster ?? r.item.poster_url ?? null;
		}
		function s(e) {
			let t = e.episodes.length;
			return `${t} ${t === 1 ? "episode" : "episodes"}`;
		}
		function c(e) {
			return e.seasonItem ? {
				...e.seasonItem,
				name: e.label,
				poster_url: o(e)
			} : {
				id: `${r.item.id}:${e.key}`,
				name: e.label,
				type: "season",
				poster_url: o(e),
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
		let l = m(() => r.seasons.length > 0), u = t(), d = m(() => u.cardSize ?? 200);
		return (t, n) => (S(), _("div", D, [y(ne, {
			item: e.item,
			"resume-seconds": e.resumeSeconds,
			similar: [],
			"similar-loading": !1,
			"can-match": e.canMatch,
			onPlay: n[0] ||= (e) => i("play", e),
			onResume: n[1] ||= (e) => i("resume", e),
			onWatchlist: n[2] ||= (e) => i("watchlist", e),
			onInfo: n[3] ||= (e) => i("info", e),
			onMatch: n[4] ||= (e) => i("match", e),
			onBack: n[5] ||= (e) => i("back"),
			onMarkWatched: n[6] ||= (e) => i("mark-watched", e),
			onRefresh: n[7] ||= (e) => i("refresh", e),
			onChoosePoster: n[8] ||= (e) => i("choose-poster", e),
			onRemove: n[9] ||= (e) => i("remove", e),
			onEditMetadata: n[10] ||= (e) => i("edit-metadata", e),
			onExploreData: n[11] ||= (e) => i("explore-data", e)
		}, null, 8, [
			"item",
			"resume-seconds",
			"can-match"
		]), v("section", O, [n[12] ||= v("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (S(), _("div", k)) : l.value ? (S(), _("ul", {
			key: 1,
			class: "series-detail__grid",
			style: x({ gridTemplateColumns: `repeat(auto-fill, minmax(${d.value}px, 1fr))` })
		}, [(S(!0), _(p, null, w(e.seasons, (e) => (S(), _("li", {
			key: e.key,
			class: "series-detail__cell"
		}, [y(ee, {
			item: c(e),
			to: a(e),
			subtitle: s(e),
			"play-only": "",
			onPlay: (t) => i("play-season", e)
		}, null, 8, [
			"item",
			"to",
			"subtitle",
			"onPlay"
		])]))), 128))], 4)) : (S(), _("p", A, "This series has no seasons available to watch."))])]));
	}
}), [["__scopeId", "data-v-7649e9c1"]]), Se = { class: "media-detail-page" }, Ce = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, we = { class: "media-detail-page__loading-hero" }, Te = { class: "media-detail-page__loading-info" }, j = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "MediaDetailPage",
	setup(e) {
		let t = r(), ee = me("phlixConfig", void 0), f = m(() => ee?.routerBase || "/app"), b = ye(), x = be(), w = a(), D = o(), O = i(), k = s(), A = C(null), j = C([]), M = C([]), N = C(!0), P = C(!1), F = C(!1), I = C(null), L = m(() => String(b.params.id ?? "")), R = m(() => w.resumePositionFor(L.value)), Ee = m(() => A.value?.type === "series");
		c(() => A.value?.name);
		let z = null, B = !1;
		function V(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function H(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				j.value = [];
				return;
			}
			let i = z, a = () => B || i !== z;
			P.value = !0;
			try {
				let o = te(t.value, {
					genres: [r],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				j.value = (s.items ?? []).filter((e) => e.id !== n.id).slice(0, 12);
			} catch (e) {
				if (a() || V(e)) return;
				j.value = [];
			} finally {
				a() || (P.value = !1);
			}
		}
		async function U(e, n) {
			let r = z, i = () => B || r !== z;
			F.value = !0, M.value = [];
			try {
				let a = await se(e, t.value, n.id, r?.signal);
				if (i()) return;
				M.value = a;
			} catch (e) {
				if (i() || V(e)) return;
				M.value = [];
			} finally {
				i() || (F.value = !1);
			}
		}
		async function W() {
			let e = L.value;
			z?.abort(), z = typeof AbortController < "u" ? new AbortController() : null;
			let r = z;
			if (N.value = !0, I.value = null, j.value = [], M.value = [], !e) {
				I.value = "No media id provided", N.value = !1;
				return;
			}
			let i = ue(e), a = Date.now(), o = de(i, a);
			if (i && o) {
				if (B || r !== z) return;
				A.value = i.item, J.value = i.item, N.value = !1, k.hydrate(i.item), i.item.type === "series" ? U(new n({ baseUrl: t.value }), i.item) : H(new n({ baseUrl: t.value }), i.item);
				return;
			}
			try {
				let r = new n({ baseUrl: t.value }), i = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, z?.signal);
				if (B) return;
				let o = i.item;
				A.value = o, J.value = o, fe(e, o, a), N.value = !1, k.hydrate(o), o.type === "series" ? U(r, o) : H(r, o);
			} catch (e) {
				if (B || V(e)) return;
				if (i) {
					A.value = i.item, J.value = i.item, N.value = !1, k.hydrate(i.item), i.item.type === "series" ? U(new n({ baseUrl: t.value }), i.item) : H(new n({ baseUrl: t.value }), i.item);
					return;
				}
				I.value = e instanceof Error ? e.message : "Failed to load title", N.value = !1;
			}
		}
		_e(W), ve(L, W), ge(() => {
			B = !0, z?.abort(), z = null;
		});
		function G(e, t) {
			x?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function K(e) {
			if (e.type === "series") {
				let e = le(M.value, w.resumeMap);
				e ? G("player", e.id) : D.info("No episodes to play yet");
				return;
			}
			G("player", e.id);
		}
		function De(e) {
			let t = ce(e, w.resumeMap);
			t ? G("player", t.id) : D.info("No episodes to play yet");
		}
		function Oe(e) {
			k.isFavorite(e.id) ? D.success(`Added "${e.name}" to your favorites`) : D.info(`Removed "${e.name}" from your favorites`);
		}
		function ke(e) {
			G("media", e.id);
		}
		function q() {
			x?.back();
		}
		function Ae(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function je(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Me(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let J = C(null), Y = C(!1), X = C(!1), { inspectorItem: Ne, inspectorOpen: Z, openInspector: Pe } = oe();
		function Q(e) {
			let t = e ?? A.value;
			t && (J.value = t, Y.value = !0);
		}
		function Fe(e) {
			A.value = e, J.value = e, D.success(`Updated metadata for "${e.name}"`), e.type === "series" && U(new n({ baseUrl: t.value }), e);
		}
		function Ie(e) {
			k.isWatched(e.id) ? D.success(`Marked "${e.name}" as watched`) : D.info(`Marked "${e.name}" as unwatched`);
		}
		function Le(e) {
			J.value = e, X.value = !0;
		}
		function Re(e) {
			A.value = e, J.value = e, D.success(`Updated poster for "${e.name}"`);
		}
		let $ = null;
		async function ze(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			$?.abort();
			let r = typeof AbortController < "u" ? new AbortController() : null;
			$ = r;
			let i = () => r !== $;
			try {
				if (await new n({ baseUrl: t.value }).deleteMediaItem(e.id), i()) return;
				A.value = null, D.success(`Removed "${e.name}"`), x?.back();
			} catch (t) {
				if (i() || V(t)) return;
				D.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (S(), _("div", Se, [
			N.value ? (S(), _("div", Ce, [v("div", we, [y(u, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), v("div", Te, [
				y(u, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				y(u, {
					variant: "text",
					lines: 4
				}),
				y(u, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : I.value ? (S(), h(d, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: I.value
			}, {
				actions: E(() => [y(l, {
					variant: "solid",
					onClick: W
				}, {
					default: E(() => [...t[3] ||= [pe("Retry", -1)]]),
					_: 1
				}), y(l, {
					variant: "ghost",
					onClick: q
				}, {
					default: E(() => [...t[4] ||= [pe("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value ? (S(), _(p, { key: 2 }, [Ee.value ? (S(), h(xe, {
				key: 0,
				item: A.value,
				seasons: M.value,
				loading: F.value,
				"resume-seconds": R.value,
				"router-base": f.value,
				"can-match": T(O).isAdmin,
				onPlay: K,
				onResume: K,
				onPlaySeason: De,
				onWatchlist: Oe,
				onInfo: ke,
				onMatch: Q,
				onMarkWatched: Ie,
				onRefresh: Q,
				onEditMetadata: Q,
				onExploreData: T(Pe),
				onChoosePoster: Le,
				onRemove: ze,
				onBack: q
			}, null, 8, [
				"item",
				"seasons",
				"loading",
				"resume-seconds",
				"router-base",
				"can-match",
				"onExploreData"
			])) : (S(), h(ne, {
				key: 1,
				item: A.value,
				"resume-seconds": R.value,
				similar: j.value,
				"similar-loading": P.value,
				"can-match": T(O).isAdmin,
				onPlay: K,
				onResume: K,
				onWatchlist: Oe,
				onInfo: ke,
				onMatch: Q,
				onActor: Ae,
				onGenre: je,
				onCompany: Me,
				onMarkWatched: Ie,
				onRefresh: Q,
				onEditMetadata: Q,
				onExploreData: T(Pe),
				onChoosePoster: Le,
				onRemove: ze,
				onBack: q
			}, null, 8, [
				"item",
				"resume-seconds",
				"similar",
				"similar-loading",
				"can-match",
				"onExploreData"
			]))], 64)) : g("", !0),
			T(O).isAdmin ? (S(), h(re, {
				key: 3,
				modelValue: Y.value,
				"onUpdate:modelValue": t[0] ||= (e) => Y.value = e,
				item: J.value,
				onApplied: Fe
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			T(O).isAdmin ? (S(), h(ie, {
				key: 4,
				modelValue: X.value,
				"onUpdate:modelValue": t[1] ||= (e) => X.value = e,
				item: J.value,
				onApplied: Re
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			T(O).isAdmin ? (S(), h(ae, {
				key: 5,
				modelValue: T(Z),
				"onUpdate:modelValue": t[2] ||= (e) => he(Z) ? Z.value = e : null,
				item: T(Ne)
			}, null, 8, ["modelValue", "item"])) : g("", !0)
		]));
	}
}), [["__scopeId", "data-v-559e6e96"]]);
//#endregion
export { j as default };

//# sourceMappingURL=MediaDetailPage-CX72LFFD.js.map