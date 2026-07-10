import { n as e } from "./Icon-Bd1lZf6E.js";
import { a as t } from "./usePreferencesStore-aFj85Ytq.js";
import { t as n } from "./client-DH50wjeq.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-BoiyS0RI.js";
import { i as a } from "./usePlayerStore-BVgQE-j8.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { n as s } from "./ThumbRating-BJEUrMHi.js";
import { i as c } from "./usePageTitle-BO3GGF3M.js";
import { t as l } from "./Button-CnyfCnhY.js";
import { t as u } from "./Skeleton-CzU_l53W.js";
import { t as ee } from "./EmptyState-588Z_81C.js";
import { t as d } from "./MediaCard-DI9RXPtG.js";
import { n as te } from "./media-query-DKjhlX8r.js";
import { t as f } from "./MediaDetail-DOZlLhBx.js";
import { t as ne } from "./MetadataMatchModal-BnxvreaL.js";
import { t as re } from "./PosterPicker-B-0CU34_.js";
import { i as p } from "./series-grouping-Bbs1zX87.js";
import { t as ie } from "./useSeriesSeasons-Dga2EzCU.js";
import { t as ae } from "./useResolvePlayable-Dnhx822M.js";
import { Fragment as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, inject as oe, normalizeStyle as C, onBeforeUnmount as se, onMounted as ce, openBlock as w, ref as T, renderList as E, unref as D, watch as le, withCtx as O } from "vue";
import { useRoute as ue, useRouter as de } from "vue-router";
//#region src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var k = { class: "series-detail" }, A = {
	class: "series-detail__seasons",
	"aria-label": "Seasons"
}, j = {
	key: 0,
	class: "series-detail__seasons-loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading seasons"
}, M = {
	key: 2,
	class: "series-detail__empty"
}, fe = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove"
	],
	setup(e, { emit: n }) {
		let r = e, i = n;
		function a(e) {
			return `${r.routerBase}/media/${r.item.id}/season/${p(e)}`;
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
		let l = h(() => r.seasons.length > 0), u = t(), ee = h(() => u.cardSize ?? 200);
		return (t, n) => (w(), v("div", k, [x(f, {
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
		]), y("section", A, [n[10] ||= y("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (w(), v("div", j)) : l.value ? (w(), v("ul", {
			key: 1,
			class: "series-detail__grid",
			style: C({ gridTemplateColumns: `repeat(auto-fill, minmax(${ee.value}px, 1fr))` })
		}, [(w(!0), v(m, null, E(e.seasons, (e) => (w(), v("li", {
			key: e.key,
			class: "series-detail__cell"
		}, [x(d, {
			item: c(e),
			to: a(e),
			subtitle: s(e),
			"hide-actions": ""
		}, null, 8, [
			"item",
			"to",
			"subtitle"
		])]))), 128))], 4)) : (w(), v("p", M, "This series has no seasons available to watch."))])]));
	}
}), [["__scopeId", "data-v-df49b842"]]), pe = { class: "media-detail-page" }, me = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, he = { class: "media-detail-page__loading-hero" }, ge = { class: "media-detail-page__loading-info" }, N = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MediaDetailPage",
	setup(e) {
		let t = r(), d = oe("phlixConfig", void 0), p = h(() => d?.routerBase || "/app"), S = ue(), C = de(), E = a(), k = o(), A = i(), j = s(), M = T(null), N = T([]), P = T([]), F = T(!0), I = T(!1), L = T(!1), R = T(null), z = h(() => String(S.params.id ?? "")), B = h(() => E.resumePositionFor(z.value)), _e = h(() => M.value?.type === "series");
		c(() => M.value?.name);
		let V = null, H = !1;
		function U(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ve(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				N.value = [];
				return;
			}
			let i = V, a = () => H || i !== V;
			I.value = !0;
			try {
				let o = te(t.value, {
					genres: [r],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				N.value = (s.items ?? []).filter((e) => e.id !== n.id).slice(0, 12);
			} catch (e) {
				if (a() || U(e)) return;
				N.value = [];
			} finally {
				a() || (I.value = !1);
			}
		}
		async function W(e, n) {
			let r = V, i = () => H || r !== V;
			L.value = !0, P.value = [];
			try {
				let a = await ie(e, t.value, n.id, r?.signal);
				if (i()) return;
				P.value = a;
			} catch (e) {
				if (i() || U(e)) return;
				P.value = [];
			} finally {
				i() || (L.value = !1);
			}
		}
		async function G() {
			let e = z.value;
			if (V?.abort(), V = typeof AbortController < "u" ? new AbortController() : null, F.value = !0, R.value = null, N.value = [], P.value = [], !e) {
				R.value = "No media id provided", F.value = !1;
				return;
			}
			try {
				let r = new n({ baseUrl: t.value }), i = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, V?.signal);
				if (H) return;
				let a = i.item;
				M.value = a, X.value = a, F.value = !1, j.hydrate(a), a.type === "series" ? W(r, a) : ve(r, a);
			} catch (e) {
				if (H || U(e)) return;
				R.value = e instanceof Error ? e.message : "Failed to load title", F.value = !1;
			}
		}
		ce(G), le(z, G), se(() => {
			H = !0, V?.abort(), V = null;
		});
		function K(e, t) {
			C?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function q(e) {
			if (e.type === "series") {
				let e = ae(P.value, E.resumeMap);
				e ? K("player", e.id) : k.info("No episodes to play yet");
				return;
			}
			K("player", e.id);
		}
		function J(e) {
			j.isFavorite(e.id) ? k.success(`Added "${e.name}" to your favorites`) : k.info(`Removed "${e.name}" from your favorites`);
		}
		function ye(e) {
			K("media", e.id);
		}
		function Y() {
			C?.back();
		}
		function be(e) {
			let t = M.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function xe(e) {
			let t = M.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Se(e) {
			let t = M.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let X = T(null), Z = T(!1), Q = T(!1);
		function Ce() {
			M.value && (X.value = M.value, Z.value = !0);
		}
		function we(e) {
			M.value = e, X.value = e, k.success(`Updated metadata for "${e.name}"`), e.type === "series" && W(new n({ baseUrl: t.value }), e);
		}
		function Te(e) {
			j.isWatched(e.id) ? k.success(`Marked "${e.name}" as watched`) : k.info(`Marked "${e.name}" as unwatched`);
		}
		function Ee(e) {
			X.value = e, Z.value = !0;
		}
		function De(e) {
			X.value = e, Q.value = !0;
		}
		function Oe(e) {
			M.value = e, X.value = e, k.success(`Updated poster for "${e.name}"`);
		}
		let $ = null;
		async function ke(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			$?.abort();
			let r = typeof AbortController < "u" ? new AbortController() : null;
			$ = r;
			let i = () => r !== $;
			try {
				if (await new n({ baseUrl: t.value }).deleteMediaItem(e.id), i()) return;
				M.value = null, k.success(`Removed "${e.name}"`), C?.back();
			} catch (t) {
				if (i() || U(t)) return;
				k.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (w(), v("div", pe, [
			F.value ? (w(), v("div", me, [y("div", he, [x(u, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), y("div", ge, [
				x(u, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				x(u, {
					variant: "text",
					lines: 4
				}),
				x(u, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : R.value ? (w(), g(ee, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: R.value
			}, {
				actions: O(() => [x(l, {
					variant: "solid",
					onClick: G
				}, {
					default: O(() => [...t[2] ||= [b("Retry", -1)]]),
					_: 1
				}), x(l, {
					variant: "ghost",
					onClick: Y
				}, {
					default: O(() => [...t[3] ||= [b("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value ? (w(), v(m, { key: 2 }, [_e.value ? (w(), g(fe, {
				key: 0,
				item: M.value,
				seasons: P.value,
				loading: L.value,
				"resume-seconds": B.value,
				"router-base": p.value,
				"can-match": D(A).isAdmin,
				onPlay: q,
				onResume: q,
				onWatchlist: J,
				onInfo: ye,
				onMatch: Ce,
				onMarkWatched: Te,
				onRefresh: Ee,
				onChoosePoster: De,
				onRemove: ke,
				onBack: Y
			}, null, 8, [
				"item",
				"seasons",
				"loading",
				"resume-seconds",
				"router-base",
				"can-match"
			])) : (w(), g(f, {
				key: 1,
				item: M.value,
				"resume-seconds": B.value,
				similar: N.value,
				"similar-loading": I.value,
				"can-match": D(A).isAdmin,
				onPlay: q,
				onResume: q,
				onWatchlist: J,
				onInfo: ye,
				onMatch: Ce,
				onActor: be,
				onGenre: xe,
				onCompany: Se,
				onMarkWatched: Te,
				onRefresh: Ee,
				onChoosePoster: De,
				onRemove: ke,
				onBack: Y
			}, null, 8, [
				"item",
				"resume-seconds",
				"similar",
				"similar-loading",
				"can-match"
			]))], 64)) : _("", !0),
			D(A).isAdmin ? (w(), g(ne, {
				key: 3,
				modelValue: Z.value,
				"onUpdate:modelValue": t[0] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: we
			}, null, 8, ["modelValue", "item"])) : _("", !0),
			D(A).isAdmin ? (w(), g(re, {
				key: 4,
				modelValue: Q.value,
				"onUpdate:modelValue": t[1] ||= (e) => Q.value = e,
				item: X.value,
				onApplied: Oe
			}, null, 8, ["modelValue", "item"])) : _("", !0)
		]));
	}
}), [["__scopeId", "data-v-ff0ff72b"]]);
//#endregion
export { N as default };

//# sourceMappingURL=MediaDetailPage-Ds7TQBeJ.js.map