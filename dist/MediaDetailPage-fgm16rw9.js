import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./client-CZc6ehUa.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-HphWxXcO.js";
import { n as a, o } from "./LoveButton-DfujAYIy.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { i as c } from "./usePageTitle-BO3GGF3M.js";
import { t as l } from "./Button-k7aQagzg.js";
import { t as u } from "./Skeleton-DkSoWF3C.js";
import { t as ee } from "./MetadataMatchModal-H5-IXqpz.js";
import { t as te } from "./EmptyState-B2QnGIQT.js";
import { n as ne } from "./media-query-C8oxSF4h.js";
import { t as re } from "./MediaDetail-BepK60sr.js";
import { r as ie, t as ae } from "./useResolvePlayable-DIIz32oI.js";
import { i as d } from "./series-grouping-Bbs1zX87.js";
import { t as oe } from "./useSeriesSeasons-ezSOXOgO.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as se, onBeforeUnmount as ce, onMounted as le, openBlock as x, ref as S, renderList as ue, resolveComponent as C, toDisplayString as w, unref as T, watch as de, withCtx as E } from "vue";
import { useRoute as fe, useRouter as pe } from "vue-router";
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
}, me = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
			return `${r.routerBase}/media/${r.item.id}/season/${d(e)}`;
		}
		function o(e) {
			return e.seasonPoster ?? r.item.poster_url ?? null;
		}
		function s(e) {
			let t = e.episodes.length;
			return `${t} ${t === 1 ? "episode" : "episodes"}`;
		}
		let c = p(() => r.seasons.length > 0);
		return (n, r) => {
			let l = C("RouterLink");
			return x(), g("div", D, [y(re, {
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
			]), _("section", O, [r[10] ||= _("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (x(), g("div", k)) : c.value ? (x(), g("ul", A, [(x(!0), g(f, null, ue(e.seasons, (e) => (x(), g("li", {
				key: e.key,
				class: "series-detail__cell"
			}, [y(l, {
				to: a(e),
				class: "series-detail__card"
			}, {
				default: E(() => [_("div", j, [o(e) ? (x(), g("img", {
					key: 0,
					class: "series-detail__img",
					src: o(e) ?? void 0,
					alt: e.label,
					loading: "lazy",
					decoding: "async"
				}, null, 8, M)) : (x(), g("div", N, [y(t, { name: "tv" })]))]), _("div", P, [_("span", F, w(e.label), 1), _("span", I, w(s(e)), 1)])]),
				_: 2
			}, 1032, ["to"])]))), 128))])) : (x(), g("p", L, "This series has no seasons available to watch."))])]);
		};
	}
}), [["__scopeId", "data-v-a36e15f5"]]), he = { class: "media-detail-page" }, ge = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, _e = { class: "media-detail-page__loading-hero" }, ve = { class: "media-detail-page__loading-info" }, R = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "MediaDetailPage",
	setup(e) {
		let t = r(), d = se("phlixConfig", void 0), b = p(() => d?.routerBase || "/app"), ue = fe(), C = pe(), w = o(), D = s(), O = i(), k = a(), A = S(null), j = S([]), M = S([]), N = S(!0), P = S(!1), F = S(!1), I = S(null), L = p(() => String(ue.params.id ?? "")), R = p(() => w.resumePositionFor(L.value)), ye = p(() => A.value?.type === "series");
		c(() => A.value?.name);
		let z = null, B = !1;
		function V(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function be(e, n) {
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
		async function xe(e, n) {
			let r = z, i = () => B || r !== z;
			F.value = !0, M.value = [];
			try {
				let a = await oe(e, t.value, n.id, r?.signal);
				if (i()) return;
				M.value = a;
			} catch (e) {
				if (i() || V(e)) return;
				M.value = [];
			} finally {
				i() || (F.value = !1);
			}
		}
		async function H() {
			let e = L.value;
			if (z?.abort(), z = typeof AbortController < "u" ? new AbortController() : null, N.value = !0, I.value = null, j.value = [], M.value = [], !e) {
				I.value = "No media id provided", N.value = !1;
				return;
			}
			try {
				let r = new n({ baseUrl: t.value }), i = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, z?.signal);
				if (B) return;
				let a = i.item;
				A.value = a, J.value = a, N.value = !1, k.hydrate(a), a.type === "series" ? xe(r, a) : be(r, a);
			} catch (e) {
				if (B || V(e)) return;
				I.value = e instanceof Error ? e.message : "Failed to load title", N.value = !1;
			}
		}
		le(H), de(L, H), ce(() => {
			B = !0, z?.abort(), z = null;
		});
		function U(e, t) {
			C?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function W(e) {
			if (e.type === "series") {
				let e = ae(M.value, w.resumeMap);
				e ? U("player", e.id) : D.info("No episodes to play yet");
				return;
			}
			U("player", e.id);
		}
		function G(e) {
			k.isFavorite(e.id) ? D.success(`Added "${e.name}" to your favorites`) : D.info(`Removed "${e.name}" from your favorites`);
		}
		function K(e) {
			U("media", e.id);
		}
		function q() {
			C?.back();
		}
		function Se(e) {
			let t = A.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function Ce(e) {
			let t = A.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function we(e) {
			let t = A.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let J = S(null), Y = S(!1), X = S(!1);
		function Te() {
			A.value && (J.value = A.value, Y.value = !0);
		}
		function Ee(e) {
			A.value = e, J.value = e, D.success(`Updated metadata for "${e.name}"`), e.type === "series" && xe(new n({ baseUrl: t.value }), e);
		}
		function Z(e) {
			k.toggleFavorite(e.id, t.value), k.isFavorite(e.id) ? D.success(`Marked "${e.name}" as watched`) : D.info(`Marked "${e.name}" as unwatched`);
		}
		function De(e) {
			J.value = e, Y.value = !0;
		}
		function Oe(e) {
			J.value = e, X.value = !0;
		}
		function ke(e) {
			A.value = e, J.value = e, D.success(`Updated poster for "${e.name}"`);
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
		return (e, t) => (x(), g("div", he, [
			N.value ? (x(), g("div", ge, [_("div", _e, [y(u, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), _("div", ve, [
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
			])])])) : I.value ? (x(), m(te, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: I.value
			}, {
				actions: E(() => [y(l, {
					variant: "solid",
					onClick: H
				}, {
					default: E(() => [...t[2] ||= [v("Retry", -1)]]),
					_: 1
				}), y(l, {
					variant: "ghost",
					onClick: q
				}, {
					default: E(() => [...t[3] ||= [v("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value ? (x(), g(f, { key: 2 }, [ye.value ? (x(), m(me, {
				key: 0,
				item: A.value,
				seasons: M.value,
				loading: F.value,
				"resume-seconds": R.value,
				"router-base": b.value,
				"can-match": T(O).isAdmin,
				onPlay: W,
				onResume: W,
				onWatchlist: G,
				onInfo: K,
				onMatch: Te,
				onMarkWatched: Z,
				onRefresh: De,
				onChoosePoster: Oe,
				onRemove: $,
				onBack: q
			}, null, 8, [
				"item",
				"seasons",
				"loading",
				"resume-seconds",
				"router-base",
				"can-match"
			])) : (x(), m(re, {
				key: 1,
				item: A.value,
				"resume-seconds": R.value,
				similar: j.value,
				"similar-loading": P.value,
				"can-match": T(O).isAdmin,
				onPlay: W,
				onResume: W,
				onWatchlist: G,
				onInfo: K,
				onMatch: Te,
				onActor: Se,
				onGenre: Ce,
				onCompany: we,
				onMarkWatched: Z,
				onRefresh: De,
				onChoosePoster: Oe,
				onRemove: $,
				onBack: q
			}, null, 8, [
				"item",
				"resume-seconds",
				"similar",
				"similar-loading",
				"can-match"
			]))], 64)) : h("", !0),
			T(O).isAdmin ? (x(), m(ee, {
				key: 3,
				modelValue: Y.value,
				"onUpdate:modelValue": t[0] ||= (e) => Y.value = e,
				item: J.value,
				onApplied: Ee
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			T(O).isAdmin ? (x(), m(ie, {
				key: 4,
				modelValue: X.value,
				"onUpdate:modelValue": t[1] ||= (e) => X.value = e,
				item: J.value,
				onApplied: ke
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-b9eb952a"]]);
//#endregion
export { R as default };

//# sourceMappingURL=MediaDetailPage-fgm16rw9.js.map