import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { a as t } from "./usePreferencesStore-g-d6JBr9.js";
import { t as n } from "./client-D7B7SMZj.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-CAHTCZvf.js";
import { n as a, o } from "./media-query-BdY2RILB.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { n as ee } from "./ThumbRating-Da67Lpax.js";
import { i as te } from "./usePageTitle-BO3GGF3M.js";
import { t as c } from "./Button-Bi3-A35D.js";
import { t as l } from "./Skeleton-C0F2lCpC.js";
import { t as ne } from "./EmptyState-qUL7hIJh.js";
import { t as u } from "./MediaCard-DBCDtyDU.js";
import { t as re } from "./MediaDetail-bkEht-DA.js";
import { t as ie } from "./MetadataMatchModal-DlmqGe0p.js";
import { t as ae } from "./PosterPicker-6y9RdHaN.js";
import { s as d } from "./episode-order-C2yqgMeX.js";
import { i as oe, n as se, t as ce } from "./useResolvePlayable-DoBQlt-O.js";
import { Fragment as le, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as ue, normalizeStyle as b, onBeforeUnmount as de, onMounted as fe, openBlock as x, ref as S, renderList as C, unref as w, watch as pe, withCtx as T } from "vue";
import { useRoute as me, useRouter as he } from "vue-router";
//#region src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var E = { class: "series-detail" }, D = {
	class: "series-detail__seasons",
	"aria-label": "Seasons"
}, O = {
	key: 0,
	class: "series-detail__seasons-loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading seasons"
}, k = {
	key: 2,
	class: "series-detail__empty"
}, ge = /*#__PURE__*/ e(/* @__PURE__ */ y({
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
			return `${r.routerBase}/media/${r.item.id}/season/${d(e)}`;
		}
		function o(e) {
			return e.seasonPoster ?? r.item.poster_url ?? null;
		}
		function s(e) {
			let t = e.episodes.length;
			return `${t} ${t === 1 ? "episode" : "episodes"}`;
		}
		function ee(e) {
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
		let te = f(() => r.seasons.length > 0), c = t(), l = f(() => c.cardSize ?? 200);
		return (t, n) => (x(), h("div", E, [v(re, {
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
		]), g("section", D, [n[10] ||= g("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (x(), h("div", O)) : te.value ? (x(), h("ul", {
			key: 1,
			class: "series-detail__grid",
			style: b({ gridTemplateColumns: `repeat(auto-fill, minmax(${l.value}px, 1fr))` })
		}, [(x(!0), h(le, null, C(e.seasons, (e) => (x(), h("li", {
			key: e.key,
			class: "series-detail__cell"
		}, [v(u, {
			item: ee(e),
			to: a(e),
			subtitle: s(e),
			"play-only": "",
			onPlay: (t) => i("play-season", e)
		}, null, 8, [
			"item",
			"to",
			"subtitle",
			"onPlay"
		])]))), 128))], 4)) : (x(), h("p", k, "This series has no seasons available to watch."))])]));
	}
}), [["__scopeId", "data-v-0d6bcb46"]]), _e = { class: "media-detail-page" }, ve = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, ye = { class: "media-detail-page__loading-hero" }, be = { class: "media-detail-page__loading-info" }, xe = 6e4, A = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "MediaDetailPage",
	setup(e) {
		let t = /* @__PURE__ */ new Map(), u = r(), d = ue("phlixConfig", void 0), y = f(() => d?.routerBase || "/app"), b = me(), C = he(), E = o(), D = s(), O = i(), k = ee(), A = S(null), j = S([]), M = S([]), N = S(!0), P = S(!1), F = S(!1), I = S(null), L = f(() => String(b.params.id ?? "")), R = f(() => E.resumePositionFor(L.value)), Se = f(() => A.value?.type === "series");
		te(() => A.value?.name);
		let z = null, B = !1;
		function V(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function H(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				j.value = [];
				return;
			}
			let r = z, i = () => B || r !== z;
			P.value = !0;
			try {
				let o = a(u.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, r?.signal);
				if (i()) return;
				j.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (i() || V(e)) return;
				j.value = [];
			} finally {
				i() || (P.value = !1);
			}
		}
		async function U(e, t) {
			let n = z, r = () => B || n !== z;
			F.value = !0, M.value = [];
			try {
				let i = await oe(e, u.value, t.id, n?.signal);
				if (r()) return;
				M.value = i;
			} catch (e) {
				if (r() || V(e)) return;
				M.value = [];
			} finally {
				r() || (F.value = !1);
			}
		}
		async function W() {
			let e = L.value;
			if (z?.abort(), z = typeof AbortController < "u" ? new AbortController() : null, N.value = !0, I.value = null, j.value = [], M.value = [], !e) {
				I.value = "No media id provided", N.value = !1;
				return;
			}
			let r = t.get(e), i = Date.now(), a = r && i - r.ts < xe;
			if (r && a) {
				if (B || z !== z) return;
				A.value = r.item, J.value = r.item, N.value = !1, k.hydrate(r.item), r.item.type === "series" ? U(new n({ baseUrl: u.value }), r.item) : H(new n({ baseUrl: u.value }), r.item);
				return;
			}
			try {
				let r = new n({ baseUrl: u.value }), a = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, z?.signal);
				if (B) return;
				let o = a.item;
				A.value = o, J.value = o, t.set(e, {
					item: o,
					ts: i
				}), N.value = !1, k.hydrate(o), o.type === "series" ? U(r, o) : H(r, o);
			} catch (e) {
				if (B || V(e)) return;
				if (r) {
					A.value = r.item, J.value = r.item, N.value = !1, k.hydrate(r.item), r.item.type === "series" ? U(new n({ baseUrl: u.value }), r.item) : H(new n({ baseUrl: u.value }), r.item);
					return;
				}
				I.value = e instanceof Error ? e.message : "Failed to load title", N.value = !1;
			}
		}
		fe(W), pe(L, W), de(() => {
			B = !0, z?.abort(), z = null;
		});
		function G(e, t) {
			C?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function K(e) {
			if (e.type === "series") {
				let e = ce(M.value, E.resumeMap);
				e ? G("player", e.id) : D.info("No episodes to play yet");
				return;
			}
			G("player", e.id);
		}
		function Ce(e) {
			let t = se(e, E.resumeMap);
			t ? G("player", t.id) : D.info("No episodes to play yet");
		}
		function we(e) {
			k.isFavorite(e.id) ? D.success(`Added "${e.name}" to your favorites`) : D.info(`Removed "${e.name}" from your favorites`);
		}
		function Te(e) {
			G("media", e.id);
		}
		function q() {
			C?.back();
		}
		function Ee(e) {
			let t = A.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function De(e) {
			let t = A.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Oe(e) {
			let t = A.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let J = S(null), Y = S(!1), X = S(!1);
		function ke() {
			A.value && (J.value = A.value, Y.value = !0);
		}
		function Ae(e) {
			A.value = e, J.value = e, D.success(`Updated metadata for "${e.name}"`), e.type === "series" && U(new n({ baseUrl: u.value }), e);
		}
		function je(e) {
			k.isWatched(e.id) ? D.success(`Marked "${e.name}" as watched`) : D.info(`Marked "${e.name}" as unwatched`);
		}
		function Me(e) {
			J.value = e, Y.value = !0;
		}
		function Z(e) {
			J.value = e, X.value = !0;
		}
		function Ne(e) {
			A.value = e, J.value = e, D.success(`Updated poster for "${e.name}"`);
		}
		let Q = null;
		async function $(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			Q?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			Q = t;
			let r = () => t !== Q;
			try {
				if (await new n({ baseUrl: u.value }).deleteMediaItem(e.id), r()) return;
				A.value = null, D.success(`Removed "${e.name}"`), C?.back();
			} catch (t) {
				if (r() || V(t)) return;
				D.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (x(), h("div", _e, [
			N.value ? (x(), h("div", ve, [g("div", ye, [v(l, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), g("div", be, [
				v(l, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				v(l, {
					variant: "text",
					lines: 4
				}),
				v(l, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : I.value ? (x(), p(ne, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: I.value
			}, {
				actions: T(() => [v(c, {
					variant: "solid",
					onClick: W
				}, {
					default: T(() => [...t[2] ||= [_("Retry", -1)]]),
					_: 1
				}), v(c, {
					variant: "ghost",
					onClick: q
				}, {
					default: T(() => [...t[3] ||= [_("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value ? (x(), h(le, { key: 2 }, [Se.value ? (x(), p(ge, {
				key: 0,
				item: A.value,
				seasons: M.value,
				loading: F.value,
				"resume-seconds": R.value,
				"router-base": y.value,
				"can-match": w(O).isAdmin,
				onPlay: K,
				onResume: K,
				onPlaySeason: Ce,
				onWatchlist: we,
				onInfo: Te,
				onMatch: ke,
				onMarkWatched: je,
				onRefresh: Me,
				onChoosePoster: Z,
				onRemove: $,
				onBack: q
			}, null, 8, [
				"item",
				"seasons",
				"loading",
				"resume-seconds",
				"router-base",
				"can-match"
			])) : (x(), p(re, {
				key: 1,
				item: A.value,
				"resume-seconds": R.value,
				similar: j.value,
				"similar-loading": P.value,
				"can-match": w(O).isAdmin,
				onPlay: K,
				onResume: K,
				onWatchlist: we,
				onInfo: Te,
				onMatch: ke,
				onActor: Ee,
				onGenre: De,
				onCompany: Oe,
				onMarkWatched: je,
				onRefresh: Me,
				onChoosePoster: Z,
				onRemove: $,
				onBack: q
			}, null, 8, [
				"item",
				"resume-seconds",
				"similar",
				"similar-loading",
				"can-match"
			]))], 64)) : m("", !0),
			w(O).isAdmin ? (x(), p(ie, {
				key: 3,
				modelValue: Y.value,
				"onUpdate:modelValue": t[0] ||= (e) => Y.value = e,
				item: J.value,
				onApplied: Ae
			}, null, 8, ["modelValue", "item"])) : m("", !0),
			w(O).isAdmin ? (x(), p(ae, {
				key: 4,
				modelValue: X.value,
				"onUpdate:modelValue": t[1] ||= (e) => X.value = e,
				item: J.value,
				onApplied: Ne
			}, null, 8, ["modelValue", "item"])) : m("", !0)
		]));
	}
}), [["__scopeId", "data-v-bbd0a091"]]);
//#endregion
export { A as default };

//# sourceMappingURL=MediaDetailPage-Di31hi9u.js.map