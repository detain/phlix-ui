import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./client-cUL8r-1I.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-CJrazXSP.js";
import { n as a, o } from "./LoveButton-Cfe3jzXL.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { i as c } from "./usePageTitle-BO3GGF3M.js";
import { t as l } from "./Button-k7aQagzg.js";
import { t as u } from "./Skeleton-DkSoWF3C.js";
import { t as ee } from "./MetadataMatchModal-CQ_WXyf-.js";
import { t as te } from "./EmptyState-B2QnGIQT.js";
import { n as ne } from "./media-query-C8oxSF4h.js";
import { t as d } from "./MediaDetail-ClNHZ9Mw.js";
import { a as f, n as p } from "./series-grouping-BTZK8Agh.js";
import { t as re } from "./useSeriesSeasons-LD7RRPM9.js";
import { Fragment as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, inject as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as C, ref as w, renderList as T, resolveComponent as E, toDisplayString as D, unref as O, watch as se, withCtx as k } from "vue";
import { useRoute as ce, useRouter as le } from "vue-router";
//#region src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var A = { class: "series-detail" }, j = {
	class: "series-detail__seasons",
	"aria-label": "Seasons"
}, M = {
	key: 0,
	class: "series-detail__seasons-loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading seasons"
}, N = {
	key: 1,
	class: "series-detail__grid"
}, P = { class: "series-detail__poster" }, F = ["src", "alt"], I = {
	key: 1,
	class: "series-detail__fallback",
	"aria-hidden": "true"
}, L = { class: "series-detail__caption" }, R = { class: "series-detail__label" }, z = { class: "series-detail__count numeric" }, B = {
	key: 2,
	class: "series-detail__empty"
}, ue = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		"back"
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
		let c = h(() => r.seasons.length > 0);
		return (n, r) => {
			let l = E("RouterLink");
			return C(), v("div", A, [x(d, {
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
				onBack: r[5] ||= (e) => i("back")
			}, null, 8, [
				"item",
				"resume-seconds",
				"can-match"
			]), y("section", j, [r[6] ||= y("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (C(), v("div", M)) : c.value ? (C(), v("ul", N, [(C(!0), v(m, null, T(e.seasons, (e) => (C(), v("li", {
				key: e.key,
				class: "series-detail__cell"
			}, [x(l, {
				to: a(e),
				class: "series-detail__card"
			}, {
				default: k(() => [y("div", P, [o(e) ? (C(), v("img", {
					key: 0,
					class: "series-detail__img",
					src: o(e) ?? void 0,
					alt: e.label,
					loading: "lazy",
					decoding: "async"
				}, null, 8, F)) : (C(), v("div", I, [x(t, { name: "tv" })]))]), y("div", L, [y("span", R, D(e.label), 1), y("span", z, D(s(e)), 1)])]),
				_: 2
			}, 1032, ["to"])]))), 128))])) : (C(), v("p", B, "This series has no seasons available to watch."))])]);
		};
	}
}), [["__scopeId", "data-v-84f77d59"]]), de = { class: "media-detail-page" }, fe = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, pe = { class: "media-detail-page__loading-hero" }, me = { class: "media-detail-page__loading-info" }, V = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MediaDetailPage",
	setup(e) {
		let t = r(), f = ie("phlixConfig", void 0), S = h(() => f?.routerBase || "/app"), T = ce(), E = le(), D = o(), A = s(), j = i(), M = a(), N = w(null), P = w([]), F = w([]), I = w(!0), L = w(!1), R = w(!1), z = w(null), B = h(() => String(T.params.id ?? "")), V = h(() => D.resumePositionFor(B.value)), he = h(() => N.value?.type === "series");
		c(() => N.value?.name);
		let H = null, U = !1;
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ge(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				P.value = [];
				return;
			}
			let i = H, a = () => U || i !== H;
			L.value = !0;
			try {
				let o = ne(t.value, {
					genres: [r],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				P.value = (s.items ?? []).filter((e) => e.id !== n.id).slice(0, 12);
			} catch (e) {
				if (a() || W(e)) return;
				P.value = [];
			} finally {
				a() || (L.value = !1);
			}
		}
		async function G(e, n) {
			let r = H, i = () => U || r !== H;
			R.value = !0, F.value = [];
			try {
				let a = await re(e, t.value, n.id, r?.signal);
				if (i()) return;
				F.value = a;
			} catch (e) {
				if (i() || W(e)) return;
				F.value = [];
			} finally {
				i() || (R.value = !1);
			}
		}
		async function K() {
			let e = B.value;
			if (H?.abort(), H = typeof AbortController < "u" ? new AbortController() : null, I.value = !0, z.value = null, P.value = [], F.value = [], !e) {
				z.value = "No media id provided", I.value = !1;
				return;
			}
			try {
				let r = new n({ baseUrl: t.value }), i = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, H?.signal);
				if (U) return;
				let a = i.item;
				N.value = a, I.value = !1, M.hydrate(a), a.type === "series" ? G(r, a) : ge(r, a);
			} catch (e) {
				if (U || W(e)) return;
				z.value = e instanceof Error ? e.message : "Failed to load title", I.value = !1;
			}
		}
		oe(K), se(B, K), ae(() => {
			U = !0, H?.abort(), H = null;
		});
		function q(e, t) {
			E?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function J(e) {
			if (e.type === "series") {
				let e = p(F.value);
				e ? q("player", e.id) : A.info("No episodes to play yet");
				return;
			}
			q("player", e.id);
		}
		function Y(e) {
			M.isFavorite(e.id) ? A.success(`Added "${e.name}" to your favorites`) : A.info(`Removed "${e.name}" from your favorites`);
		}
		function X(e) {
			q("media", e.id);
		}
		function Z() {
			E?.back();
		}
		function _e(e) {
			let t = N.value?.library_id;
			t && E?.hasRoute("library") && E.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function ve(e) {
			let t = N.value?.library_id;
			t && E?.hasRoute("library") && E.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function ye(e) {
			let t = N.value?.library_id;
			t && E?.hasRoute("library") && E.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let Q = w(!1);
		function $() {
			N.value && (Q.value = !0);
		}
		function be(e) {
			N.value = e, A.success(`Updated metadata for "${e.name}"`), e.type === "series" && G(new n({ baseUrl: t.value }), e);
		}
		return (e, t) => (C(), v("div", de, [I.value ? (C(), v("div", fe, [y("div", pe, [x(u, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), y("div", me, [
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
		])])])) : z.value ? (C(), g(te, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: z.value
		}, {
			actions: k(() => [x(l, {
				variant: "solid",
				onClick: K
			}, {
				default: k(() => [...t[1] ||= [b("Retry", -1)]]),
				_: 1
			}), x(l, {
				variant: "ghost",
				onClick: Z
			}, {
				default: k(() => [...t[2] ||= [b("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : N.value ? (C(), v(m, { key: 2 }, [he.value ? (C(), g(ue, {
			key: 0,
			item: N.value,
			seasons: F.value,
			loading: R.value,
			"resume-seconds": V.value,
			"router-base": S.value,
			"can-match": O(j).isAdmin,
			onPlay: J,
			onResume: J,
			onWatchlist: Y,
			onInfo: X,
			onMatch: $,
			onBack: Z
		}, null, 8, [
			"item",
			"seasons",
			"loading",
			"resume-seconds",
			"router-base",
			"can-match"
		])) : (C(), g(d, {
			key: 1,
			item: N.value,
			"resume-seconds": V.value,
			similar: P.value,
			"similar-loading": L.value,
			"can-match": O(j).isAdmin,
			onPlay: J,
			onResume: J,
			onWatchlist: Y,
			onInfo: X,
			onMatch: $,
			onActor: _e,
			onGenre: ve,
			onCompany: ye,
			onBack: Z
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading",
			"can-match"
		]))], 64)) : _("", !0), O(j).isAdmin ? (C(), g(ee, {
			key: 3,
			modelValue: Q.value,
			"onUpdate:modelValue": t[0] ||= (e) => Q.value = e,
			item: N.value,
			onApplied: be
		}, null, 8, ["modelValue", "item"])) : _("", !0)]));
	}
}), [["__scopeId", "data-v-eb6ffdac"]]);
//#endregion
export { V as default };

//# sourceMappingURL=MediaDetailPage-D1BeVLfi.js.map