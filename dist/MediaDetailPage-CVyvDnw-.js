import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./client-CX6TRWS-.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-Co09iQFW.js";
import { n as a, o } from "./LoveButton-By5cp7rf.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { i as c } from "./usePageTitle-BO3GGF3M.js";
import { t as l } from "./Button-k7aQagzg.js";
import { t as u } from "./Skeleton-DkSoWF3C.js";
import { t as ee } from "./MetadataMatchModal-DcbN9Cga.js";
import { t as te } from "./EmptyState-B2QnGIQT.js";
import { n as ne } from "./media-query-C8oxSF4h.js";
import { t as d } from "./MediaDetail-D8ocEptF.js";
import { i as re } from "./series-grouping-Bbs1zX87.js";
import { t as ie } from "./useSeriesSeasons-ezSOXOgO.js";
import { t as ae } from "./useResolvePlayable-CDFCMfKq.js";
import { Fragment as oe, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as se, onBeforeUnmount as ce, onMounted as le, openBlock as b, ref as x, renderList as S, resolveComponent as C, toDisplayString as w, unref as T, watch as ue, withCtx as E } from "vue";
import { useRoute as de, useRouter as fe } from "vue-router";
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
	key: 1,
	class: "series-detail__grid"
}, j = { class: "series-detail__poster" }, M = ["src", "alt"], N = {
	key: 1,
	class: "series-detail__fallback",
	"aria-hidden": "true"
}, P = { class: "series-detail__caption" }, F = { class: "series-detail__label" }, I = { class: "series-detail__count numeric" }, L = {
	key: 2,
	class: "series-detail__empty"
}, pe = /*#__PURE__*/ e(/* @__PURE__ */ y({
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
			return `${r.routerBase}/media/${r.item.id}/season/${re(e)}`;
		}
		function o(e) {
			return e.seasonPoster ?? r.item.poster_url ?? null;
		}
		function s(e) {
			let t = e.episodes.length;
			return `${t} ${t === 1 ? "episode" : "episodes"}`;
		}
		let c = f(() => r.seasons.length > 0);
		return (n, r) => {
			let l = C("RouterLink");
			return b(), h("div", D, [v(d, {
				item: e.item,
				"resume-seconds": e.resumeSeconds,
				similar: [],
				"similar-loading": !1,
				"can-match": e.canMatch,
				onPlay: r[0] ||= (e) => i("play", e),
				onResume: r[1] ||= (e) => i("resume", e),
				onWatchlist: r[2] ||= (e) => i("watchlist", e),
				onInfo: r[3] ||= (e) => i("info", e),
				onMatch: r[4] ||= (e) => i("match", e),
				onBack: r[5] ||= (e) => i("back"),
				onMarkWatched: r[6] ||= (e) => i("mark-watched", e),
				onRefresh: r[7] ||= (e) => i("refresh", e),
				onChoosePoster: r[8] ||= (e) => i("choose-poster", e),
				onRemove: r[9] ||= (e) => i("remove", e)
			}, null, 8, [
				"item",
				"resume-seconds",
				"can-match"
			]), g("section", O, [r[10] ||= g("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (b(), h("div", k)) : c.value ? (b(), h("ul", A, [(b(!0), h(oe, null, S(e.seasons, (e) => (b(), h("li", {
				key: e.key,
				class: "series-detail__cell"
			}, [v(l, {
				to: a(e),
				class: "series-detail__card"
			}, {
				default: E(() => [g("div", j, [o(e) ? (b(), h("img", {
					key: 0,
					class: "series-detail__img",
					src: o(e) ?? void 0,
					alt: e.label,
					loading: "lazy",
					decoding: "async"
				}, null, 8, M)) : (b(), h("div", N, [v(t, { name: "tv" })]))]), g("div", P, [g("span", F, w(e.label), 1), g("span", I, w(s(e)), 1)])]),
				_: 2
			}, 1032, ["to"])]))), 128))])) : (b(), h("p", L, "This series has no seasons available to watch."))])]);
		};
	}
}), [["__scopeId", "data-v-a36e15f5"]]), me = { class: "media-detail-page" }, he = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, ge = { class: "media-detail-page__loading-hero" }, _e = { class: "media-detail-page__loading-info" }, R = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "MediaDetailPage",
	setup(e) {
		let t = r(), re = se("phlixConfig", void 0), y = f(() => re?.routerBase || "/app"), S = de(), C = fe(), w = o(), D = s(), O = i(), k = a(), A = x(null), j = x([]), M = x([]), N = x(!0), P = x(!1), F = x(!1), I = x(null), L = f(() => String(S.params.id ?? "")), R = f(() => w.resumePositionFor(L.value)), ve = f(() => A.value?.type === "series");
		c(() => A.value?.name);
		let z = null, B = !1;
		function V(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ye(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				j.value = [];
				return;
			}
			let i = z, a = () => B || i !== z;
			P.value = !0;
			try {
				let o = ne(t.value, {
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
		async function H(e, n) {
			let r = z, i = () => B || r !== z;
			F.value = !0, M.value = [];
			try {
				let a = await ie(e, t.value, n.id, r?.signal);
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
				A.value = a, Y.value = a, N.value = !1, k.hydrate(a), a.type === "series" ? H(r, a) : ye(r, a);
			} catch (e) {
				if (B || V(e)) return;
				I.value = e instanceof Error ? e.message : "Failed to load title", N.value = !1;
			}
		}
		le(U), ue(L, U), ce(() => {
			B = !0, z?.abort(), z = null;
		});
		function W(e, t) {
			C?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function G(e) {
			if (e.type === "series") {
				let e = ae(M.value, w.resumeMap);
				e ? W("player", e.id) : D.info("No episodes to play yet");
				return;
			}
			W("player", e.id);
		}
		function K(e) {
			k.isFavorite(e.id) ? D.success(`Added "${e.name}" to your favorites`) : D.info(`Removed "${e.name}" from your favorites`);
		}
		function q(e) {
			W("media", e.id);
		}
		function J() {
			C?.back();
		}
		function be(e) {
			let t = A.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function xe(e) {
			let t = A.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Se(e) {
			let t = A.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let Y = x(null), X = x(!1);
		function Z() {
			A.value && (Y.value = A.value, X.value = !0);
		}
		function Ce(e) {
			A.value = e, Y.value = e, D.success(`Updated metadata for "${e.name}"`), e.type === "series" && H(new n({ baseUrl: t.value }), e);
		}
		function we(e) {
			k.toggleFavorite(e.id, t.value), k.isFavorite(e.id) ? D.success(`Marked "${e.name}" as watched`) : D.info(`Marked "${e.name}" as unwatched`);
		}
		function Te(e) {
			Y.value = e, X.value = !0;
		}
		function Ee(e) {
			D.info("Poster picker is coming soon");
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
				A.value = null, D.success(`Removed "${e.name}"`), C?.back();
			} catch (t) {
				if (i() || V(t)) return;
				D.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (b(), h("div", me, [N.value ? (b(), h("div", he, [g("div", ge, [v(u, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), g("div", _e, [
			v(u, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			v(u, {
				variant: "text",
				lines: 4
			}),
			v(u, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : I.value ? (b(), p(te, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: I.value
		}, {
			actions: E(() => [v(l, {
				variant: "solid",
				onClick: U
			}, {
				default: E(() => [...t[1] ||= [_("Retry", -1)]]),
				_: 1
			}), v(l, {
				variant: "ghost",
				onClick: J
			}, {
				default: E(() => [...t[2] ||= [_("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : A.value ? (b(), h(oe, { key: 2 }, [ve.value ? (b(), p(pe, {
			key: 0,
			item: A.value,
			seasons: M.value,
			loading: F.value,
			"resume-seconds": R.value,
			"router-base": y.value,
			"can-match": T(O).isAdmin,
			onPlay: G,
			onResume: G,
			onWatchlist: K,
			onInfo: q,
			onMatch: Z,
			onMarkWatched: we,
			onRefresh: Te,
			onChoosePoster: Ee,
			onRemove: $,
			onBack: J
		}, null, 8, [
			"item",
			"seasons",
			"loading",
			"resume-seconds",
			"router-base",
			"can-match"
		])) : (b(), p(d, {
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
			onMatch: Z,
			onActor: be,
			onGenre: xe,
			onCompany: Se,
			onMarkWatched: we,
			onRefresh: Te,
			onChoosePoster: Ee,
			onRemove: $,
			onBack: J
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading",
			"can-match"
		]))], 64)) : m("", !0), T(O).isAdmin ? (b(), p(ee, {
			key: 3,
			modelValue: X.value,
			"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
			item: Y.value,
			onApplied: Ce
		}, null, 8, ["modelValue", "item"])) : m("", !0)]));
	}
}), [["__scopeId", "data-v-0dbccd4b"]]);
//#endregion
export { R as default };

//# sourceMappingURL=MediaDetailPage-CVyvDnw-.js.map