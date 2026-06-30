import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./client-cUL8r-1I.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-CJrazXSP.js";
import { i as a } from "./usePlayerStore-iTjrRIZa.js";
import { i as o } from "./usePageTitle-BO3GGF3M.js";
import { t as s } from "./Button-k7aQagzg.js";
import { t as c } from "./useToastStore-BDoKlU6N.js";
import { t as l } from "./Skeleton-DkSoWF3C.js";
import { i as ee, t as te } from "./MetadataMatchModal-DDiTml_F.js";
import { t as ne } from "./EmptyState-B2QnGIQT.js";
import { n as u } from "./media-query-C8oxSF4h.js";
import { t as d } from "./MediaDetail-Cr6Ca0UM.js";
import { a as f, n as re } from "./series-grouping-BTZK8Agh.js";
import { t as ie } from "./useSeriesSeasons-LD7RRPM9.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as ae, onBeforeUnmount as oe, onMounted as se, openBlock as S, ref as C, renderList as w, resolveComponent as T, toDisplayString as E, unref as D, watch as ce, withCtx as O } from "vue";
import { useRoute as le, useRouter as ue } from "vue-router";
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
	key: 1,
	class: "series-detail__grid"
}, N = { class: "series-detail__poster" }, P = ["src", "alt"], F = {
	key: 1,
	class: "series-detail__fallback",
	"aria-hidden": "true"
}, I = { class: "series-detail__caption" }, L = { class: "series-detail__label" }, R = { class: "series-detail__count numeric" }, z = {
	key: 2,
	class: "series-detail__empty"
}, de = /*#__PURE__*/ e(/* @__PURE__ */ x({
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
		let c = m(() => r.seasons.length > 0);
		return (n, r) => {
			let l = T("RouterLink");
			return S(), _("div", k, [b(d, {
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
			]), v("section", A, [r[6] ||= v("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (S(), _("div", j)) : c.value ? (S(), _("ul", M, [(S(!0), _(p, null, w(e.seasons, (e) => (S(), _("li", {
				key: e.key,
				class: "series-detail__cell"
			}, [b(l, {
				to: a(e),
				class: "series-detail__card"
			}, {
				default: O(() => [v("div", N, [o(e) ? (S(), _("img", {
					key: 0,
					class: "series-detail__img",
					src: o(e) ?? void 0,
					alt: e.label,
					loading: "lazy",
					decoding: "async"
				}, null, 8, P)) : (S(), _("div", F, [b(t, { name: "tv" })]))]), v("div", I, [v("span", L, E(e.label), 1), v("span", R, E(s(e)), 1)])]),
				_: 2
			}, 1032, ["to"])]))), 128))])) : (S(), _("p", z, "This series has no seasons available to watch."))])]);
		};
	}
}), [["__scopeId", "data-v-84f77d59"]]), fe = { class: "media-detail-page" }, B = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, pe = { class: "media-detail-page__loading-hero" }, me = { class: "media-detail-page__loading-info" }, V = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "MediaDetailPage",
	setup(e) {
		let t = r(), f = ae("phlixConfig", void 0), x = m(() => f?.routerBase || "/app"), w = le(), T = ue(), E = a(), k = c(), A = i(), j = ee(), M = C(null), N = C([]), P = C([]), F = C(!0), I = C(!1), L = C(!1), R = C(null), z = m(() => String(w.params.id ?? "")), V = m(() => E.resumePositionFor(z.value)), he = m(() => M.value?.type === "series");
		o(() => M.value?.name);
		let H = null, U = !1;
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ge(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				N.value = [];
				return;
			}
			let i = H, a = () => U || i !== H;
			I.value = !0;
			try {
				let o = u(t.value, {
					genres: [r],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				N.value = (s.items ?? []).filter((e) => e.id !== n.id).slice(0, 12);
			} catch (e) {
				if (a() || W(e)) return;
				N.value = [];
			} finally {
				a() || (I.value = !1);
			}
		}
		async function G(e, n) {
			let r = H, i = () => U || r !== H;
			L.value = !0, P.value = [];
			try {
				let a = await ie(e, t.value, n.id, r?.signal);
				if (i()) return;
				P.value = a;
			} catch (e) {
				if (i() || W(e)) return;
				P.value = [];
			} finally {
				i() || (L.value = !1);
			}
		}
		async function K() {
			let e = z.value;
			if (H?.abort(), H = typeof AbortController < "u" ? new AbortController() : null, F.value = !0, R.value = null, N.value = [], P.value = [], !e) {
				R.value = "No media id provided", F.value = !1;
				return;
			}
			try {
				let r = new n({ baseUrl: t.value }), i = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, H?.signal);
				if (U) return;
				let a = i.item;
				M.value = a, F.value = !1, j.hydrate(a), a.type === "series" ? G(r, a) : ge(r, a);
			} catch (e) {
				if (U || W(e)) return;
				R.value = e instanceof Error ? e.message : "Failed to load title", F.value = !1;
			}
		}
		se(K), ce(z, K), oe(() => {
			U = !0, H?.abort(), H = null;
		});
		function q(e, t) {
			T?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function J(e) {
			if (e.type === "series") {
				let e = re(P.value);
				e ? q("player", e.id) : k.info("No episodes to play yet");
				return;
			}
			q("player", e.id);
		}
		function Y(e) {
			j.isFavorite(e.id) ? k.success(`Added "${e.name}" to your favorites`) : k.info(`Removed "${e.name}" from your favorites`);
		}
		function X(e) {
			q("media", e.id);
		}
		function Z() {
			T?.back();
		}
		function _e(e) {
			let t = M.value?.library_id;
			t && T?.hasRoute("library") && T.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function ve(e) {
			let t = M.value?.library_id;
			t && T?.hasRoute("library") && T.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function ye(e) {
			let t = M.value?.library_id;
			t && T?.hasRoute("library") && T.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let Q = C(!1);
		function $() {
			M.value && (Q.value = !0);
		}
		function be(e) {
			M.value = e, k.success(`Updated metadata for "${e.name}"`), e.type === "series" && G(new n({ baseUrl: t.value }), e);
		}
		return (e, t) => (S(), _("div", fe, [F.value ? (S(), _("div", B, [v("div", pe, [b(l, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), v("div", me, [
			b(l, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			b(l, {
				variant: "text",
				lines: 4
			}),
			b(l, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : R.value ? (S(), h(ne, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: R.value
		}, {
			actions: O(() => [b(s, {
				variant: "solid",
				onClick: K
			}, {
				default: O(() => [...t[1] ||= [y("Retry", -1)]]),
				_: 1
			}), b(s, {
				variant: "ghost",
				onClick: Z
			}, {
				default: O(() => [...t[2] ||= [y("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : M.value ? (S(), _(p, { key: 2 }, [he.value ? (S(), h(de, {
			key: 0,
			item: M.value,
			seasons: P.value,
			loading: L.value,
			"resume-seconds": V.value,
			"router-base": x.value,
			"can-match": D(A).isAdmin,
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
		])) : (S(), h(d, {
			key: 1,
			item: M.value,
			"resume-seconds": V.value,
			similar: N.value,
			"similar-loading": I.value,
			"can-match": D(A).isAdmin,
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
		]))], 64)) : g("", !0), D(A).isAdmin ? (S(), h(te, {
			key: 3,
			modelValue: Q.value,
			"onUpdate:modelValue": t[0] ||= (e) => Q.value = e,
			item: M.value,
			onApplied: be
		}, null, 8, ["modelValue", "item"])) : g("", !0)]));
	}
}), [["__scopeId", "data-v-eb6ffdac"]]);
//#endregion
export { V as default };

//# sourceMappingURL=MediaDetailPage-DzM0xCIN.js.map