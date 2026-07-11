import { n as e } from "./Icon-Bd1lZf6E.js";
import { a as t } from "./usePreferencesStore-aFj85Ytq.js";
import { t as n } from "./client-B65CbqT7.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-BK3N71yp.js";
import { n as a, o } from "./media-query-IVKvZvWX.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { n as c } from "./ThumbRating-obRiYVSW.js";
import { i as l } from "./usePageTitle-BO3GGF3M.js";
import { t as u } from "./Button-CnyfCnhY.js";
import { t as d } from "./Skeleton-CzU_l53W.js";
import { t as ee } from "./EmptyState-588Z_81C.js";
import { t as te } from "./MediaCard-BN4aoNMN.js";
import { t as ne } from "./MediaDetail-Cboli4-O.js";
import { t as re } from "./MetadataMatchModal-DAqoKjcW.js";
import { t as ie } from "./PosterPicker-BYw1ZM6c.js";
import { s as f } from "./episode-order-C2yqgMeX.js";
import { i as ae, n as oe, t as se } from "./useResolvePlayable-D00u_82b.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as ce, createVNode as y, defineComponent as b, inject as le, normalizeStyle as x, onBeforeUnmount as ue, onMounted as de, openBlock as S, ref as C, renderList as w, unref as T, watch as fe, withCtx as E } from "vue";
import { useRoute as pe, useRouter as me } from "vue-router";
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
}, he = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		"remove"
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
			onRemove: n[9] ||= (e) => i("remove", e)
		}, null, 8, [
			"item",
			"resume-seconds",
			"can-match"
		]), v("section", O, [n[10] ||= v("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (S(), _("div", k)) : l.value ? (S(), _("ul", {
			key: 1,
			class: "series-detail__grid",
			style: x({ gridTemplateColumns: `repeat(auto-fill, minmax(${d.value}px, 1fr))` })
		}, [(S(!0), _(p, null, w(e.seasons, (e) => (S(), _("li", {
			key: e.key,
			class: "series-detail__cell"
		}, [y(te, {
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
}), [["__scopeId", "data-v-0d6bcb46"]]), ge = { class: "media-detail-page" }, _e = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, ve = { class: "media-detail-page__loading-hero" }, ye = { class: "media-detail-page__loading-info" }, j = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "MediaDetailPage",
	setup(e) {
		let t = r(), te = le("phlixConfig", void 0), f = m(() => te?.routerBase || "/app"), b = pe(), x = me(), w = o(), D = s(), O = i(), k = c(), A = C(null), j = C([]), M = C([]), N = C(!0), P = C(!1), F = C(!1), I = C(null), L = m(() => String(b.params.id ?? "")), R = m(() => w.resumePositionFor(L.value)), be = m(() => A.value?.type === "series");
		l(() => A.value?.name);
		let z = null, B = !1;
		function V(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function xe(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				j.value = [];
				return;
			}
			let i = z, o = () => B || i !== z;
			P.value = !0;
			try {
				let s = a(t.value, {
					genres: [r],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(s, void 0, i?.signal);
				if (o()) return;
				j.value = (c.items ?? []).filter((e) => e.id !== n.id).slice(0, 12);
			} catch (e) {
				if (o() || V(e)) return;
				j.value = [];
			} finally {
				o() || (P.value = !1);
			}
		}
		async function H(e, n) {
			let r = z, i = () => B || r !== z;
			F.value = !0, M.value = [];
			try {
				let a = await ae(e, t.value, n.id, r?.signal);
				if (i()) return;
				M.value = a;
			} catch (e) {
				if (i() || V(e)) return;
				M.value = [];
			} finally {
				i() || (F.value = !1);
			}
		}
		async function U() {
			let e = L.value;
			if (z?.abort(), z = typeof AbortController < "u" ? new AbortController() : null, N.value = !0, I.value = null, j.value = [], M.value = [], !e) {
				I.value = "No media id provided", N.value = !1;
				return;
			}
			try {
				let r = new n({ baseUrl: t.value }), i = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, z?.signal);
				if (B) return;
				let a = i.item;
				A.value = a, Y.value = a, N.value = !1, k.hydrate(a), a.type === "series" ? H(r, a) : xe(r, a);
			} catch (e) {
				if (B || V(e)) return;
				I.value = e instanceof Error ? e.message : "Failed to load title", N.value = !1;
			}
		}
		de(U), fe(L, U), ue(() => {
			B = !0, z?.abort(), z = null;
		});
		function W(e, t) {
			x?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function G(e) {
			if (e.type === "series") {
				let e = se(M.value, w.resumeMap);
				e ? W("player", e.id) : D.info("No episodes to play yet");
				return;
			}
			W("player", e.id);
		}
		function Se(e) {
			let t = oe(e, w.resumeMap);
			t ? W("player", t.id) : D.info("No episodes to play yet");
		}
		function K(e) {
			k.isFavorite(e.id) ? D.success(`Added "${e.name}" to your favorites`) : D.info(`Removed "${e.name}" from your favorites`);
		}
		function q(e) {
			W("media", e.id);
		}
		function J() {
			x?.back();
		}
		function Ce(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function we(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Te(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let Y = C(null), X = C(!1), Z = C(!1);
		function Ee() {
			A.value && (Y.value = A.value, X.value = !0);
		}
		function De(e) {
			A.value = e, Y.value = e, D.success(`Updated metadata for "${e.name}"`), e.type === "series" && H(new n({ baseUrl: t.value }), e);
		}
		function Oe(e) {
			k.isWatched(e.id) ? D.success(`Marked "${e.name}" as watched`) : D.info(`Marked "${e.name}" as unwatched`);
		}
		function ke(e) {
			Y.value = e, X.value = !0;
		}
		function Ae(e) {
			Y.value = e, Z.value = !0;
		}
		function je(e) {
			A.value = e, Y.value = e, D.success(`Updated poster for "${e.name}"`);
		}
		let Q = null;
		async function $(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			Q?.abort();
			let r = typeof AbortController < "u" ? new AbortController() : null;
			Q = r;
			let i = () => r !== Q;
			try {
				if (await new n({ baseUrl: t.value }).deleteMediaItem(e.id), i()) return;
				A.value = null, D.success(`Removed "${e.name}"`), x?.back();
			} catch (t) {
				if (i() || V(t)) return;
				D.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (S(), _("div", ge, [
			N.value ? (S(), _("div", _e, [v("div", ve, [y(d, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), v("div", ye, [
				y(d, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				y(d, {
					variant: "text",
					lines: 4
				}),
				y(d, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : I.value ? (S(), h(ee, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: I.value
			}, {
				actions: E(() => [y(u, {
					variant: "solid",
					onClick: U
				}, {
					default: E(() => [...t[2] ||= [ce("Retry", -1)]]),
					_: 1
				}), y(u, {
					variant: "ghost",
					onClick: J
				}, {
					default: E(() => [...t[3] ||= [ce("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value ? (S(), _(p, { key: 2 }, [be.value ? (S(), h(he, {
				key: 0,
				item: A.value,
				seasons: M.value,
				loading: F.value,
				"resume-seconds": R.value,
				"router-base": f.value,
				"can-match": T(O).isAdmin,
				onPlay: G,
				onResume: G,
				onPlaySeason: Se,
				onWatchlist: K,
				onInfo: q,
				onMatch: Ee,
				onMarkWatched: Oe,
				onRefresh: ke,
				onChoosePoster: Ae,
				onRemove: $,
				onBack: J
			}, null, 8, [
				"item",
				"seasons",
				"loading",
				"resume-seconds",
				"router-base",
				"can-match"
			])) : (S(), h(ne, {
				key: 1,
				item: A.value,
				"resume-seconds": R.value,
				similar: j.value,
				"similar-loading": P.value,
				"can-match": T(O).isAdmin,
				onPlay: G,
				onResume: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: Ee,
				onActor: Ce,
				onGenre: we,
				onCompany: Te,
				onMarkWatched: Oe,
				onRefresh: ke,
				onChoosePoster: Ae,
				onRemove: $,
				onBack: J
			}, null, 8, [
				"item",
				"resume-seconds",
				"similar",
				"similar-loading",
				"can-match"
			]))], 64)) : g("", !0),
			T(O).isAdmin ? (S(), h(re, {
				key: 3,
				modelValue: X.value,
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				item: Y.value,
				onApplied: De
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			T(O).isAdmin ? (S(), h(ie, {
				key: 4,
				modelValue: Z.value,
				"onUpdate:modelValue": t[1] ||= (e) => Z.value = e,
				item: Y.value,
				onApplied: je
			}, null, 8, ["modelValue", "item"])) : g("", !0)
		]));
	}
}), [["__scopeId", "data-v-b7db283b"]]);
//#endregion
export { j as default };

//# sourceMappingURL=MediaDetailPage-D-MFt1U7.js.map