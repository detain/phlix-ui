import { n as e, t } from "./Icon-ax5k7_G2.js";
import { n, t as r } from "./Button-BwQkyEkr.js";
import { i } from "./usePlayerStore-Cffo63UC.js";
import { i as a } from "./usePageTitle-BO3GGF3M.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { n as l } from "./media-query-BcVLE7J6.js";
import { t as u } from "./MediaDetail-BZ_Dr3pv.js";
import { a as d, n as ee } from "./series-grouping-BTZK8Agh.js";
import { t as f } from "./useSeriesSeasons-DFLY9BpV.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as S, onBeforeUnmount as C, onMounted as w, openBlock as T, ref as E, renderList as D, resolveComponent as O, toDisplayString as k, watch as te, withCtx as A } from "vue";
import { useRoute as ne, useRouter as re } from "vue-router";
//#region src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var j = { class: "series-detail" }, M = {
	class: "series-detail__seasons",
	"aria-label": "Seasons"
}, N = {
	key: 0,
	class: "series-detail__seasons-loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading seasons"
}, P = {
	key: 1,
	class: "series-detail__grid"
}, F = { class: "series-detail__poster" }, I = ["src", "alt"], L = {
	key: 1,
	class: "series-detail__fallback",
	"aria-hidden": "true"
}, R = { class: "series-detail__caption" }, z = { class: "series-detail__label" }, B = { class: "series-detail__count numeric" }, V = {
	key: 2,
	class: "series-detail__empty"
}, H = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "SeriesDetail",
	props: {
		item: {},
		seasons: {},
		loading: {
			type: Boolean,
			default: !1
		},
		resumeSeconds: { default: null },
		routerBase: { default: "/app" }
	},
	emits: [
		"play",
		"resume",
		"watchlist",
		"info",
		"back"
	],
	setup(e, { emit: n }) {
		let r = e, i = n;
		function a(e) {
			return `${r.routerBase}/media/${r.item.id}/season/${d(e)}`;
		}
		function o(e) {
			return e.seasonPoster ?? r.item.poster_url ?? null;
		}
		function s(e) {
			let t = e.episodes.length;
			return `${t} ${t === 1 ? "episode" : "episodes"}`;
		}
		let c = m(() => r.seasons.length > 0);
		return (n, r) => {
			let l = O("RouterLink");
			return T(), _("div", j, [b(u, {
				item: e.item,
				"resume-seconds": e.resumeSeconds,
				similar: [],
				"similar-loading": !1,
				onPlay: r[0] ||= (e) => i("play", e),
				onResume: r[1] ||= (e) => i("resume", e),
				onWatchlist: r[2] ||= (e) => i("watchlist", e),
				onInfo: r[3] ||= (e) => i("info", e),
				onBack: r[4] ||= (e) => i("back")
			}, null, 8, ["item", "resume-seconds"]), v("section", M, [r[5] ||= v("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (T(), _("div", N)) : c.value ? (T(), _("ul", P, [(T(!0), _(p, null, D(e.seasons, (e) => (T(), _("li", {
				key: e.key,
				class: "series-detail__cell"
			}, [b(l, {
				to: a(e),
				class: "series-detail__card"
			}, {
				default: A(() => [v("div", F, [o(e) ? (T(), _("img", {
					key: 0,
					class: "series-detail__img",
					src: o(e) ?? void 0,
					alt: e.label,
					loading: "lazy",
					decoding: "async"
				}, null, 8, I)) : (T(), _("div", L, [b(t, { name: "tv" })]))]), v("div", R, [v("span", z, k(e.label), 1), v("span", B, k(s(e)), 1)])]),
				_: 2
			}, 1032, ["to"])]))), 128))])) : (T(), _("p", V, "This series has no seasons available to watch."))])]);
		};
	}
}), [["__scopeId", "data-v-52b4a808"]]), U = { class: "media-detail-page" }, ie = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, ae = { class: "media-detail-page__loading-hero" }, oe = { class: "media-detail-page__loading-info" }, W = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "MediaDetailPage",
	setup(e) {
		let t = S("apiBase", ""), d = m(() => typeof t == "string" ? t : t?.value ?? ""), x = S("phlixConfig", void 0), D = m(() => x?.routerBase || "/app"), O = ne(), k = re(), j = i(), M = o(), N = E(null), P = E([]), F = E([]), I = E(!0), L = E(!1), R = E(!1), z = E(null), B = m(() => String(O.params.id ?? "")), V = m(() => j.resumePositionFor(B.value)), W = m(() => N.value?.type === "series");
		a(() => N.value?.name);
		let G = null, K = !1;
		function q(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function se(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				P.value = [];
				return;
			}
			let r = G, i = () => K || r !== G;
			L.value = !0;
			try {
				let a = l(d.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), o = await e.get(a, void 0, r?.signal);
				if (i()) return;
				P.value = (o.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (i() || q(e)) return;
				P.value = [];
			} finally {
				i() || (L.value = !1);
			}
		}
		async function ce(e, t) {
			let n = G, r = () => K || n !== G;
			R.value = !0, F.value = [];
			try {
				let i = await f(e, d.value, t.id, n?.signal);
				if (r()) return;
				F.value = i;
			} catch (e) {
				if (r() || q(e)) return;
				F.value = [];
			} finally {
				r() || (R.value = !1);
			}
		}
		async function J() {
			let e = B.value;
			if (G?.abort(), G = typeof AbortController < "u" ? new AbortController() : null, I.value = !0, z.value = null, P.value = [], F.value = [], !e) {
				z.value = "No media id provided", I.value = !1;
				return;
			}
			try {
				let t = new n({ baseUrl: d.value }), r = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, G?.signal);
				if (K) return;
				let i = r.item;
				N.value = i, I.value = !1, i.type === "series" ? ce(t, i) : se(t, i);
			} catch (e) {
				if (K || q(e)) return;
				z.value = e instanceof Error ? e.message : "Failed to load title", I.value = !1;
			}
		}
		w(J), te(B, J), C(() => {
			K = !0, G?.abort(), G = null;
		});
		function Y(e, t) {
			k?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function X(e) {
			if (e.type === "series") {
				let e = ee(F.value);
				e ? Y("player", e.id) : M.info("No episodes to play yet");
				return;
			}
			Y("player", e.id);
		}
		function Z(e) {
			M.success(`Added "${e.name}" to your list`);
		}
		function Q(e) {
			Y("media", e.id);
		}
		function $() {
			k?.back();
		}
		return (e, t) => (T(), _("div", U, [I.value ? (T(), _("div", ie, [v("div", ae, [b(s, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), v("div", oe, [
			b(s, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			b(s, {
				variant: "text",
				lines: 4
			}),
			b(s, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : z.value ? (T(), h(c, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: z.value
		}, {
			actions: A(() => [b(r, {
				variant: "solid",
				onClick: J
			}, {
				default: A(() => [...t[0] ||= [y("Retry", -1)]]),
				_: 1
			}), b(r, {
				variant: "ghost",
				onClick: $
			}, {
				default: A(() => [...t[1] ||= [y("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : N.value ? (T(), _(p, { key: 2 }, [W.value ? (T(), h(H, {
			key: 0,
			item: N.value,
			seasons: F.value,
			loading: R.value,
			"resume-seconds": V.value,
			"router-base": D.value,
			onPlay: X,
			onResume: X,
			onWatchlist: Z,
			onInfo: Q,
			onBack: $
		}, null, 8, [
			"item",
			"seasons",
			"loading",
			"resume-seconds",
			"router-base"
		])) : (T(), h(u, {
			key: 1,
			item: N.value,
			"resume-seconds": V.value,
			similar: P.value,
			"similar-loading": L.value,
			onPlay: X,
			onResume: X,
			onWatchlist: Z,
			onInfo: Q,
			onBack: $
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		]))], 64)) : g("", !0)]));
	}
}), [["__scopeId", "data-v-ee800f61"]]);
//#endregion
export { W as default };

//# sourceMappingURL=MediaDetailPage-kjbNA6NE.js.map