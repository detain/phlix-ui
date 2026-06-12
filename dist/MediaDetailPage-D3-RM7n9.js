import { n as e, t } from "./Icon-ax5k7_G2.js";
import { n, t as r } from "./Button-9cUUJmnN.js";
import { t as i } from "./useAuthStore-BNt_Vq18.js";
import { i as a } from "./usePlayerStore-CCov4Tvr.js";
import { i as o } from "./usePageTitle-BO3GGF3M.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { t as c } from "./Skeleton-DkSoWF3C.js";
import { t as l } from "./MetadataMatchModal-BHe9IKxt.js";
import { t as u } from "./EmptyState-B2QnGIQT.js";
import { n as ee } from "./media-query-BcVLE7J6.js";
import { t as d } from "./MediaDetail-rZkdmxJ3.js";
import { a as f, n as te } from "./series-grouping-BTZK8Agh.js";
import { t as ne } from "./useSeriesSeasons-DFLY9BpV.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as S, onBeforeUnmount as re, onMounted as ie, openBlock as C, ref as w, renderList as T, resolveComponent as E, toDisplayString as D, unref as O, watch as ae, withCtx as k } from "vue";
import { useRoute as oe, useRouter as se } from "vue-router";
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
}, ce = /*#__PURE__*/ e(/* @__PURE__ */ x({
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
			let l = E("RouterLink");
			return C(), _("div", A, [b(d, {
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
			]), v("section", j, [r[6] ||= v("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (C(), _("div", M)) : c.value ? (C(), _("ul", N, [(C(!0), _(p, null, T(e.seasons, (e) => (C(), _("li", {
				key: e.key,
				class: "series-detail__cell"
			}, [b(l, {
				to: a(e),
				class: "series-detail__card"
			}, {
				default: k(() => [v("div", P, [o(e) ? (C(), _("img", {
					key: 0,
					class: "series-detail__img",
					src: o(e) ?? void 0,
					alt: e.label,
					loading: "lazy",
					decoding: "async"
				}, null, 8, F)) : (C(), _("div", I, [b(t, { name: "tv" })]))]), v("div", L, [v("span", R, D(e.label), 1), v("span", z, D(s(e)), 1)])]),
				_: 2
			}, 1032, ["to"])]))), 128))])) : (C(), _("p", B, "This series has no seasons available to watch."))])]);
		};
	}
}), [["__scopeId", "data-v-84f77d59"]]), le = { class: "media-detail-page" }, ue = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, de = { class: "media-detail-page__loading-hero" }, fe = { class: "media-detail-page__loading-info" }, V = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "MediaDetailPage",
	setup(e) {
		let t = S("apiBase", ""), f = m(() => typeof t == "string" ? t : t?.value ?? ""), x = S("phlixConfig", void 0), T = m(() => x?.routerBase || "/app"), E = oe(), D = se(), A = a(), j = s(), M = i(), N = w(null), P = w([]), F = w([]), I = w(!0), L = w(!1), R = w(!1), z = w(null), B = m(() => String(E.params.id ?? "")), V = m(() => A.resumePositionFor(B.value)), pe = m(() => N.value?.type === "series");
		o(() => N.value?.name);
		let H = null, U = !1;
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function me(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				P.value = [];
				return;
			}
			let r = H, i = () => U || r !== H;
			L.value = !0;
			try {
				let a = ee(f.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), o = await e.get(a, void 0, r?.signal);
				if (i()) return;
				P.value = (o.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (i() || W(e)) return;
				P.value = [];
			} finally {
				i() || (L.value = !1);
			}
		}
		async function G(e, t) {
			let n = H, r = () => U || n !== H;
			R.value = !0, F.value = [];
			try {
				let i = await ne(e, f.value, t.id, n?.signal);
				if (r()) return;
				F.value = i;
			} catch (e) {
				if (r() || W(e)) return;
				F.value = [];
			} finally {
				r() || (R.value = !1);
			}
		}
		async function K() {
			let e = B.value;
			if (H?.abort(), H = typeof AbortController < "u" ? new AbortController() : null, I.value = !0, z.value = null, P.value = [], F.value = [], !e) {
				z.value = "No media id provided", I.value = !1;
				return;
			}
			try {
				let t = new n({ baseUrl: f.value }), r = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, H?.signal);
				if (U) return;
				let i = r.item;
				N.value = i, I.value = !1, i.type === "series" ? G(t, i) : me(t, i);
			} catch (e) {
				if (U || W(e)) return;
				z.value = e instanceof Error ? e.message : "Failed to load title", I.value = !1;
			}
		}
		ie(K), ae(B, K), re(() => {
			U = !0, H?.abort(), H = null;
		});
		function q(e, t) {
			D?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function J(e) {
			if (e.type === "series") {
				let e = te(F.value);
				e ? q("player", e.id) : j.info("No episodes to play yet");
				return;
			}
			q("player", e.id);
		}
		function Y(e) {
			j.success(`Added "${e.name}" to your list`);
		}
		function X(e) {
			q("media", e.id);
		}
		function Z() {
			D?.back();
		}
		let Q = w(!1);
		function $() {
			N.value && (Q.value = !0);
		}
		function he(e) {
			N.value = e, j.success(`Updated metadata for "${e.name}"`), e.type === "series" && G(new n({ baseUrl: f.value }), e);
		}
		return (e, t) => (C(), _("div", le, [I.value ? (C(), _("div", ue, [v("div", de, [b(c, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), v("div", fe, [
			b(c, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			b(c, {
				variant: "text",
				lines: 4
			}),
			b(c, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : z.value ? (C(), h(u, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: z.value
		}, {
			actions: k(() => [b(r, {
				variant: "solid",
				onClick: K
			}, {
				default: k(() => [...t[1] ||= [y("Retry", -1)]]),
				_: 1
			}), b(r, {
				variant: "ghost",
				onClick: Z
			}, {
				default: k(() => [...t[2] ||= [y("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : N.value ? (C(), _(p, { key: 2 }, [pe.value ? (C(), h(ce, {
			key: 0,
			item: N.value,
			seasons: F.value,
			loading: R.value,
			"resume-seconds": V.value,
			"router-base": T.value,
			"can-match": O(M).isAdmin,
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
		])) : (C(), h(d, {
			key: 1,
			item: N.value,
			"resume-seconds": V.value,
			similar: P.value,
			"similar-loading": L.value,
			"can-match": O(M).isAdmin,
			onPlay: J,
			onResume: J,
			onWatchlist: Y,
			onInfo: X,
			onMatch: $,
			onBack: Z
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading",
			"can-match"
		]))], 64)) : g("", !0), O(M).isAdmin ? (C(), h(l, {
			key: 3,
			modelValue: Q.value,
			"onUpdate:modelValue": t[0] ||= (e) => Q.value = e,
			item: N.value,
			onApplied: he
		}, null, 8, ["modelValue", "item"])) : g("", !0)]));
	}
}), [["__scopeId", "data-v-ea191599"]]);
//#endregion
export { V as default };

//# sourceMappingURL=MediaDetailPage-D3-RM7n9.js.map