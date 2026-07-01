import { n as e, t } from "./Icon-24ngwBUH.js";
import { a as n } from "./usePreferencesStore-CXHWLjml.js";
import { t as r } from "./client-fw74f3l_.js";
import { n as i, r as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useAuthStore-CUoTkm_k.js";
import { n as s, o as c } from "./ThumbRating-CDDVfYEs.js";
import { t as l } from "./useToastStore-BDoKlU6N.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as u } from "./Button-CInT03Lp.js";
import { t as d } from "./Skeleton-BUq2D39t.js";
import { t as te } from "./MetadataMatchModal-Cd3M7_Wl.js";
import { t as ne } from "./EmptyState-0XgHKEGf.js";
import { n as re } from "./media-query-C8oxSF4h.js";
import { t as ie } from "./MediaDetail-Ccn0W21e.js";
import { r as f, t as p } from "./useResolvePlayable-Dvi5ysCP.js";
import { i as ae } from "./series-grouping-Bbs1zX87.js";
import { t as m } from "./useSeriesSeasons-ezSOXOgO.js";
import { Fragment as oe, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, inject as se, onBeforeUnmount as C, onMounted as w, openBlock as T, ref as E, renderList as D, resolveComponent as O, toDisplayString as k, unref as A, watch as ce, withCtx as j } from "vue";
import { useRoute as le, useRouter as ue } from "vue-router";
//#region src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var M = { class: "series-detail" }, N = ["src"], P = {
	class: "series-detail__seasons",
	"aria-label": "Seasons"
}, F = {
	key: 0,
	class: "series-detail__seasons-loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading seasons"
}, I = {
	key: 1,
	class: "series-detail__grid"
}, L = { class: "series-detail__poster" }, R = ["src", "alt"], z = {
	key: 1,
	class: "series-detail__fallback",
	"aria-hidden": "true"
}, B = { class: "series-detail__caption" }, V = { class: "series-detail__label" }, H = { class: "series-detail__count numeric" }, U = {
	key: 2,
	class: "series-detail__empty"
}, de = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
	setup(e, { emit: r }) {
		let o = e, s = r;
		function c(e) {
			return `${o.routerBase}/media/${o.item.id}/season/${ae(e)}`;
		}
		function l(e) {
			return e.seasonPoster ?? o.item.poster_url ?? null;
		}
		function ee(e) {
			let t = e.episodes.length;
			return `${t} ${t === 1 ? "episode" : "episodes"}`;
		}
		let u = h(() => o.seasons.length > 0), d = n(), te = i(), ne = a(), re = se("phlixConfig", null), f = E(null), p = !1, m = h(() => {
			let e = o.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${ne.value || te.value || (re?.apiBase ?? "")}${e}` : null;
		}), g = h(() => !d.effectiveReducedMotion && d.seriesThemeAutoplay && !!m.value);
		function b() {
			if (!g.value || p) return;
			let e = f.value;
			e && (p = !0, e.play()?.catch(() => {
				p = !1;
			}));
		}
		function S() {
			let e = f.value;
			e && (e.pause(), e.src = "", e.load(), p = !1);
		}
		return w(() => {
			g.value && b();
		}), ce(g, (e) => {
			e ? b() : S();
		}), C(() => {
			S();
		}), (n, r) => {
			let i = O("RouterLink");
			return T(), v("div", M, [
				m.value ? (T(), v("audio", {
					key: 0,
					ref_key: "themeAudioEl",
					ref: f,
					src: m.value,
					class: "series-detail__theme-audio",
					loop: "",
					"aria-hidden": "true",
					tabindex: "-1"
				}, null, 8, N)) : _("", !0),
				x(ie, {
					item: e.item,
					"resume-seconds": e.resumeSeconds,
					similar: [],
					"similar-loading": !1,
					"can-match": e.canMatch,
					onPlay: r[0] ||= (e) => s("play", e),
					onResume: r[1] ||= (e) => s("resume", e),
					onWatchlist: r[2] ||= (e) => s("watchlist", e),
					onInfo: r[3] ||= (e) => s("info", e),
					onMatch: r[4] ||= (e) => s("match", e),
					onBack: r[5] ||= (e) => s("back"),
					onMarkWatched: r[6] ||= (e) => s("mark-watched", e),
					onRefresh: r[7] ||= (e) => s("refresh", e),
					onChoosePoster: r[8] ||= (e) => s("choose-poster", e),
					onRemove: r[9] ||= (e) => s("remove", e)
				}, null, 8, [
					"item",
					"resume-seconds",
					"can-match"
				]),
				y("section", P, [r[10] ||= y("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (T(), v("div", F)) : u.value ? (T(), v("ul", I, [(T(!0), v(oe, null, D(e.seasons, (e) => (T(), v("li", {
					key: e.key,
					class: "series-detail__cell"
				}, [x(i, {
					to: c(e),
					class: "series-detail__card"
				}, {
					default: j(() => [y("div", L, [l(e) ? (T(), v("img", {
						key: 0,
						class: "series-detail__img",
						src: l(e) ?? void 0,
						alt: e.label,
						loading: "lazy",
						decoding: "async"
					}, null, 8, R)) : (T(), v("div", z, [x(t, { name: "tv" })]))]), y("div", B, [y("span", V, k(e.label), 1), y("span", H, k(ee(e)), 1)])]),
					_: 2
				}, 1032, ["to"])]))), 128))])) : (T(), v("p", U, "This series has no seasons available to watch."))])
			]);
		};
	}
}), [["__scopeId", "data-v-1361d116"]]), fe = { class: "media-detail-page" }, pe = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, me = { class: "media-detail-page__loading-hero" }, he = { class: "media-detail-page__loading-info" }, W = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MediaDetailPage",
	setup(e) {
		let t = i(), n = se("phlixConfig", void 0), a = h(() => n?.routerBase || "/app"), ae = le(), S = ue(), D = c(), O = l(), k = o(), M = s(), N = E(null), P = E([]), F = E([]), I = E(!0), L = E(!1), R = E(!1), z = E(null), B = h(() => String(ae.params.id ?? "")), V = h(() => D.resumePositionFor(B.value)), H = h(() => N.value?.type === "series");
		ee(() => N.value?.name);
		let U = null, W = !1;
		function G(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ge(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				P.value = [];
				return;
			}
			let i = U, a = () => W || i !== U;
			L.value = !0;
			try {
				let o = re(t.value, {
					genres: [r],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				P.value = (s.items ?? []).filter((e) => e.id !== n.id).slice(0, 12);
			} catch (e) {
				if (a() || G(e)) return;
				P.value = [];
			} finally {
				a() || (L.value = !1);
			}
		}
		async function _e(e, n) {
			let r = U, i = () => W || r !== U;
			R.value = !0, F.value = [];
			try {
				let a = await m(e, t.value, n.id, r?.signal);
				if (i()) return;
				F.value = a;
			} catch (e) {
				if (i() || G(e)) return;
				F.value = [];
			} finally {
				i() || (R.value = !1);
			}
		}
		async function K() {
			let e = B.value;
			if (U?.abort(), U = typeof AbortController < "u" ? new AbortController() : null, I.value = !0, z.value = null, P.value = [], F.value = [], !e) {
				z.value = "No media id provided", I.value = !1;
				return;
			}
			try {
				let n = new r({ baseUrl: t.value }), i = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, U?.signal);
				if (W) return;
				let a = i.item;
				N.value = a, X.value = a, I.value = !1, M.hydrate(a), a.type === "series" ? _e(n, a) : ge(n, a);
			} catch (e) {
				if (W || G(e)) return;
				z.value = e instanceof Error ? e.message : "Failed to load title", I.value = !1;
			}
		}
		w(K), ce(B, K), C(() => {
			W = !0, U?.abort(), U = null;
		});
		function q(e, t) {
			S?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function J(e) {
			if (e.type === "series") {
				let e = p(F.value, D.resumeMap);
				e ? q("player", e.id) : O.info("No episodes to play yet");
				return;
			}
			q("player", e.id);
		}
		function ve(e) {
			M.isFavorite(e.id) ? O.success(`Added "${e.name}" to your favorites`) : O.info(`Removed "${e.name}" from your favorites`);
		}
		function ye(e) {
			q("media", e.id);
		}
		function Y() {
			S?.back();
		}
		function be(e) {
			let t = N.value?.library_id;
			t && S?.hasRoute("library") && S.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function xe(e) {
			let t = N.value?.library_id;
			t && S?.hasRoute("library") && S.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Se(e) {
			let t = N.value?.library_id;
			t && S?.hasRoute("library") && S.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let X = E(null), Z = E(!1), Q = E(!1);
		function Ce() {
			N.value && (X.value = N.value, Z.value = !0);
		}
		function we(e) {
			N.value = e, X.value = e, O.success(`Updated metadata for "${e.name}"`), e.type === "series" && _e(new r({ baseUrl: t.value }), e);
		}
		function Te(e) {
			M.toggleFavorite(e.id, t.value), M.isFavorite(e.id) ? O.success(`Marked "${e.name}" as watched`) : O.info(`Marked "${e.name}" as unwatched`);
		}
		function Ee(e) {
			X.value = e, Z.value = !0;
		}
		function De(e) {
			X.value = e, Q.value = !0;
		}
		function Oe(e) {
			N.value = e, X.value = e, O.success(`Updated poster for "${e.name}"`);
		}
		let $ = null;
		async function ke(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			$?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			$ = n;
			let i = () => n !== $;
			try {
				if (await new r({ baseUrl: t.value }).deleteMediaItem(e.id), i()) return;
				N.value = null, O.success(`Removed "${e.name}"`), S?.back();
			} catch (t) {
				if (i() || G(t)) return;
				O.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (T(), v("div", fe, [
			I.value ? (T(), v("div", pe, [y("div", me, [x(d, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), y("div", he, [
				x(d, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				x(d, {
					variant: "text",
					lines: 4
				}),
				x(d, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : z.value ? (T(), g(ne, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: z.value
			}, {
				actions: j(() => [x(u, {
					variant: "solid",
					onClick: K
				}, {
					default: j(() => [...t[2] ||= [b("Retry", -1)]]),
					_: 1
				}), x(u, {
					variant: "ghost",
					onClick: Y
				}, {
					default: j(() => [...t[3] ||= [b("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : N.value ? (T(), v(oe, { key: 2 }, [H.value ? (T(), g(de, {
				key: 0,
				item: N.value,
				seasons: F.value,
				loading: R.value,
				"resume-seconds": V.value,
				"router-base": a.value,
				"can-match": A(k).isAdmin,
				onPlay: J,
				onResume: J,
				onWatchlist: ve,
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
			])) : (T(), g(ie, {
				key: 1,
				item: N.value,
				"resume-seconds": V.value,
				similar: P.value,
				"similar-loading": L.value,
				"can-match": A(k).isAdmin,
				onPlay: J,
				onResume: J,
				onWatchlist: ve,
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
			A(k).isAdmin ? (T(), g(te, {
				key: 3,
				modelValue: Z.value,
				"onUpdate:modelValue": t[0] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: we
			}, null, 8, ["modelValue", "item"])) : _("", !0),
			A(k).isAdmin ? (T(), g(f, {
				key: 4,
				modelValue: Q.value,
				"onUpdate:modelValue": t[1] ||= (e) => Q.value = e,
				item: X.value,
				onApplied: Oe
			}, null, 8, ["modelValue", "item"])) : _("", !0)
		]));
	}
}), [["__scopeId", "data-v-b9eb952a"]]);
//#endregion
export { W as default };

//# sourceMappingURL=MediaDetailPage-CiPpuzm0.js.map