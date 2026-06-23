import { n as e, t } from "./Icon-ax5k7_G2.js";
import { n, t as r } from "./Button-C1kpaQyo.js";
import { t as i } from "./useAuthStore-DmWD93w-.js";
import { i as a } from "./usePlayerStore-CCov4Tvr.js";
import { i as o } from "./usePageTitle-BO3GGF3M.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { t as c } from "./Skeleton-DkSoWF3C.js";
import { t as l } from "./MetadataMatchModal-zcWQDvkg.js";
import { t as ee } from "./EmptyState-B2QnGIQT.js";
import { a as te, n as ne } from "./useApiBase-DHZp4E4v.js";
import { t as u } from "./MediaDetail-BzziP6a3.js";
import { a as d, n as f } from "./series-grouping-BTZK8Agh.js";
import { t as p } from "./useSeriesSeasons-CHNYJz8g.js";
import { Fragment as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, inject as re, onBeforeUnmount as ie, onMounted as ae, openBlock as C, ref as w, renderList as T, resolveComponent as E, toDisplayString as D, unref as O, watch as oe, withCtx as k } from "vue";
import { useRoute as se, useRouter as ce } from "vue-router";
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
}, le = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
			return `${r.routerBase}/media/${r.item.id}/season/${d(e)}`;
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
			return C(), v("div", A, [x(u, {
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
}), [["__scopeId", "data-v-84f77d59"]]), ue = { class: "media-detail-page" }, de = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, fe = { class: "media-detail-page__loading-hero" }, pe = { class: "media-detail-page__loading-info" }, V = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MediaDetailPage",
	setup(e) {
		let t = ne(), d = re("phlixConfig", void 0), S = h(() => d?.routerBase || "/app"), T = se(), E = ce(), D = a(), A = s(), j = i(), M = w(null), N = w([]), P = w([]), F = w(!0), I = w(!1), L = w(!1), R = w(null), z = h(() => String(T.params.id ?? "")), B = h(() => D.resumePositionFor(z.value)), V = h(() => M.value?.type === "series");
		o(() => M.value?.name);
		let H = null, U = !1;
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function me(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				N.value = [];
				return;
			}
			let i = H, a = () => U || i !== H;
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
				let a = await p(e, t.value, n.id, r?.signal);
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
				M.value = a, F.value = !1, a.type === "series" ? G(r, a) : me(r, a);
			} catch (e) {
				if (U || W(e)) return;
				R.value = e instanceof Error ? e.message : "Failed to load title", F.value = !1;
			}
		}
		ae(K), oe(z, K), ie(() => {
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
				let e = f(P.value);
				e ? q("player", e.id) : A.info("No episodes to play yet");
				return;
			}
			q("player", e.id);
		}
		function Y(e) {
			A.success(`Added "${e.name}" to your list`);
		}
		function X(e) {
			q("media", e.id);
		}
		function Z() {
			E?.back();
		}
		function he(e) {
			let t = M.value?.library_id;
			t && E?.hasRoute("library") && E.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		let Q = w(!1);
		function $() {
			M.value && (Q.value = !0);
		}
		function ge(e) {
			M.value = e, A.success(`Updated metadata for "${e.name}"`), e.type === "series" && G(new n({ baseUrl: t.value }), e);
		}
		return (e, t) => (C(), v("div", ue, [F.value ? (C(), v("div", de, [y("div", fe, [x(c, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), y("div", pe, [
			x(c, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			x(c, {
				variant: "text",
				lines: 4
			}),
			x(c, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : R.value ? (C(), g(ee, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: R.value
		}, {
			actions: k(() => [x(r, {
				variant: "solid",
				onClick: K
			}, {
				default: k(() => [...t[1] ||= [b("Retry", -1)]]),
				_: 1
			}), x(r, {
				variant: "ghost",
				onClick: Z
			}, {
				default: k(() => [...t[2] ||= [b("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : M.value ? (C(), v(m, { key: 2 }, [V.value ? (C(), g(le, {
			key: 0,
			item: M.value,
			seasons: P.value,
			loading: L.value,
			"resume-seconds": B.value,
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
		])) : (C(), g(u, {
			key: 1,
			item: M.value,
			"resume-seconds": B.value,
			similar: N.value,
			"similar-loading": I.value,
			"can-match": O(j).isAdmin,
			onPlay: J,
			onResume: J,
			onWatchlist: Y,
			onInfo: X,
			onMatch: $,
			onActor: he,
			onBack: Z
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading",
			"can-match"
		]))], 64)) : _("", !0), O(j).isAdmin ? (C(), g(l, {
			key: 3,
			modelValue: Q.value,
			"onUpdate:modelValue": t[0] ||= (e) => Q.value = e,
			item: M.value,
			onApplied: ge
		}, null, 8, ["modelValue", "item"])) : _("", !0)]));
	}
}), [["__scopeId", "data-v-4ffbb756"]]);
//#endregion
export { V as default };

//# sourceMappingURL=MediaDetailPage-CPcmoBYE.js.map