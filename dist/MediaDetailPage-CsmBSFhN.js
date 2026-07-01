import { n as e } from "./Icon-24ngwBUH.js";
import { a as t } from "./usePreferencesStore-DJWQcYN2.js";
import { t as n } from "./client-fw74f3l_.js";
import { n as r, r as i } from "./useApiBase-CV_r-Kk4.js";
import { t as a } from "./useAuthStore-CUoTkm_k.js";
import { n as o, o as s } from "./ThumbRating-uWe6prMH.js";
import { t as c } from "./useToastStore-BDoKlU6N.js";
import { i as l } from "./usePageTitle-BO3GGF3M.js";
import { t as u } from "./Button-CInT03Lp.js";
import { t as d } from "./Skeleton-BUq2D39t.js";
import { n as ee, t as f } from "./MetadataMatchModal-6zRG2fyA.js";
import { t as te } from "./EmptyState-0XgHKEGf.js";
import { n as ne } from "./media-query-C8oxSF4h.js";
import { t as p } from "./MediaDetail-DOb1cU7Y.js";
import { r as re, t as ie } from "./useResolvePlayable-DiJWN3c6.js";
import { i as ae } from "./series-grouping-Bbs1zX87.js";
import { t as m } from "./useSeriesSeasons-ezSOXOgO.js";
import { Fragment as h, computed as g, createBlock as _, createCommentVNode as v, createElementBlock as y, createElementVNode as b, createTextVNode as x, createVNode as S, defineComponent as C, inject as oe, normalizeStyle as w, onBeforeUnmount as T, onMounted as se, openBlock as E, ref as D, renderList as O, unref as k, watch as ce, withCtx as A } from "vue";
import { useRoute as le, useRouter as ue } from "vue-router";
//#region src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var j = { class: "series-detail" }, M = ["src"], N = {
	class: "series-detail__seasons",
	"aria-label": "Seasons"
}, P = {
	key: 0,
	class: "series-detail__seasons-loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading seasons"
}, F = {
	key: 2,
	class: "series-detail__empty"
}, de = /*#__PURE__*/ e(/* @__PURE__ */ C({
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
		let a = e, o = n;
		function s(e) {
			return `${a.routerBase}/media/${a.item.id}/season/${ae(e)}`;
		}
		function c(e) {
			return e.seasonPoster ?? a.item.poster_url ?? null;
		}
		function l(e) {
			let t = e.episodes.length;
			return `${t} ${t === 1 ? "episode" : "episodes"}`;
		}
		function u(e) {
			return e.seasonItem ? {
				...e.seasonItem,
				name: e.label,
				poster_url: c(e)
			} : {
				id: `${a.item.id}:${e.key}`,
				name: e.label,
				type: "season",
				poster_url: c(e),
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
		let d = g(() => a.seasons.length > 0), f = t(), te = g(() => f.cardSize ?? 200), ne = r(), re = i(), ie = oe("phlixConfig", null), m = D(null), _ = !1, x = g(() => {
			let e = a.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${re.value || ne.value || (ie?.apiBase ?? "")}${e}` : null;
		}), C = g(() => !f.effectiveReducedMotion && f.seriesThemeAutoplay && !!x.value);
		function k() {
			if (!C.value || _) return;
			let e = m.value;
			e && (_ = !0, e.play()?.catch(() => {
				_ = !1;
			}));
		}
		function A() {
			let e = m.value;
			e && (e.pause(), e.src = "", e.load(), _ = !1);
		}
		return se(() => {
			C.value && k();
		}), ce(C, (e) => {
			e ? k() : A();
		}), T(() => {
			A();
		}), (t, n) => (E(), y("div", j, [
			x.value ? (E(), y("audio", {
				key: 0,
				ref_key: "themeAudioEl",
				ref: m,
				src: x.value,
				class: "series-detail__theme-audio",
				loop: "",
				"aria-hidden": "true",
				tabindex: "-1"
			}, null, 8, M)) : v("", !0),
			S(p, {
				item: e.item,
				"resume-seconds": e.resumeSeconds,
				similar: [],
				"similar-loading": !1,
				"can-match": e.canMatch,
				onPlay: n[0] ||= (e) => o("play", e),
				onResume: n[1] ||= (e) => o("resume", e),
				onWatchlist: n[2] ||= (e) => o("watchlist", e),
				onInfo: n[3] ||= (e) => o("info", e),
				onMatch: n[4] ||= (e) => o("match", e),
				onBack: n[5] ||= (e) => o("back"),
				onMarkWatched: n[6] ||= (e) => o("mark-watched", e),
				onRefresh: n[7] ||= (e) => o("refresh", e),
				onChoosePoster: n[8] ||= (e) => o("choose-poster", e),
				onRemove: n[9] ||= (e) => o("remove", e)
			}, null, 8, [
				"item",
				"resume-seconds",
				"can-match"
			]),
			b("section", N, [n[10] ||= b("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (E(), y("div", P)) : d.value ? (E(), y("ul", {
				key: 1,
				class: "series-detail__grid",
				style: w({ gridTemplateColumns: `repeat(auto-fill, minmax(${te.value}px, 1fr))` })
			}, [(E(!0), y(h, null, O(e.seasons, (e) => (E(), y("li", {
				key: e.key,
				class: "series-detail__cell"
			}, [S(ee, {
				item: u(e),
				to: s(e),
				subtitle: l(e),
				"hide-actions": ""
			}, null, 8, [
				"item",
				"to",
				"subtitle"
			])]))), 128))], 4)) : (E(), y("p", F, "This series has no seasons available to watch."))])
		]));
	}
}), [["__scopeId", "data-v-d14de0a7"]]), fe = { class: "media-detail-page" }, pe = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, me = { class: "media-detail-page__loading-hero" }, he = { class: "media-detail-page__loading-info" }, I = /*#__PURE__*/ e(/* @__PURE__ */ C({
	__name: "MediaDetailPage",
	setup(e) {
		let t = r(), i = oe("phlixConfig", void 0), ee = g(() => i?.routerBase || "/app"), ae = le(), C = ue(), w = s(), O = c(), j = a(), M = o(), N = D(null), P = D([]), F = D([]), I = D(!0), L = D(!1), R = D(!1), z = D(null), B = g(() => String(ae.params.id ?? "")), ge = g(() => w.resumePositionFor(B.value)), _e = g(() => N.value?.type === "series");
		l(() => N.value?.name);
		let V = null, H = !1;
		function U(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ve(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				P.value = [];
				return;
			}
			let i = V, a = () => H || i !== V;
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
				if (a() || U(e)) return;
				P.value = [];
			} finally {
				a() || (L.value = !1);
			}
		}
		async function W(e, n) {
			let r = V, i = () => H || r !== V;
			R.value = !0, F.value = [];
			try {
				let a = await m(e, t.value, n.id, r?.signal);
				if (i()) return;
				F.value = a;
			} catch (e) {
				if (i() || U(e)) return;
				F.value = [];
			} finally {
				i() || (R.value = !1);
			}
		}
		async function G() {
			let e = B.value;
			if (V?.abort(), V = typeof AbortController < "u" ? new AbortController() : null, I.value = !0, z.value = null, P.value = [], F.value = [], !e) {
				z.value = "No media id provided", I.value = !1;
				return;
			}
			try {
				let r = new n({ baseUrl: t.value }), i = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, V?.signal);
				if (H) return;
				let a = i.item;
				N.value = a, X.value = a, I.value = !1, M.hydrate(a), a.type === "series" ? W(r, a) : ve(r, a);
			} catch (e) {
				if (H || U(e)) return;
				z.value = e instanceof Error ? e.message : "Failed to load title", I.value = !1;
			}
		}
		se(G), ce(B, G), T(() => {
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
				let e = ie(F.value, w.resumeMap);
				e ? K("player", e.id) : O.info("No episodes to play yet");
				return;
			}
			K("player", e.id);
		}
		function ye(e) {
			M.isFavorite(e.id) ? O.success(`Added "${e.name}" to your favorites`) : O.info(`Removed "${e.name}" from your favorites`);
		}
		function J(e) {
			K("media", e.id);
		}
		function Y() {
			C?.back();
		}
		function be(e) {
			let t = N.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function xe(e) {
			let t = N.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Se(e) {
			let t = N.value?.library_id;
			t && C?.hasRoute("library") && C.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let X = D(null), Z = D(!1), Q = D(!1);
		function Ce() {
			N.value && (X.value = N.value, Z.value = !0);
		}
		function we(e) {
			N.value = e, X.value = e, O.success(`Updated metadata for "${e.name}"`), e.type === "series" && W(new n({ baseUrl: t.value }), e);
		}
		function Te(e) {
			M.isWatched(e.id) ? O.success(`Marked "${e.name}" as watched`) : O.info(`Marked "${e.name}" as unwatched`);
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
			let r = typeof AbortController < "u" ? new AbortController() : null;
			$ = r;
			let i = () => r !== $;
			try {
				if (await new n({ baseUrl: t.value }).deleteMediaItem(e.id), i()) return;
				N.value = null, O.success(`Removed "${e.name}"`), C?.back();
			} catch (t) {
				if (i() || U(t)) return;
				O.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (E(), y("div", fe, [
			I.value ? (E(), y("div", pe, [b("div", me, [S(d, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), b("div", he, [
				S(d, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				S(d, {
					variant: "text",
					lines: 4
				}),
				S(d, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : z.value ? (E(), _(te, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: z.value
			}, {
				actions: A(() => [S(u, {
					variant: "solid",
					onClick: G
				}, {
					default: A(() => [...t[2] ||= [x("Retry", -1)]]),
					_: 1
				}), S(u, {
					variant: "ghost",
					onClick: Y
				}, {
					default: A(() => [...t[3] ||= [x("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : N.value ? (E(), y(h, { key: 2 }, [_e.value ? (E(), _(de, {
				key: 0,
				item: N.value,
				seasons: F.value,
				loading: R.value,
				"resume-seconds": ge.value,
				"router-base": ee.value,
				"can-match": k(j).isAdmin,
				onPlay: q,
				onResume: q,
				onWatchlist: ye,
				onInfo: J,
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
			])) : (E(), _(p, {
				key: 1,
				item: N.value,
				"resume-seconds": ge.value,
				similar: P.value,
				"similar-loading": L.value,
				"can-match": k(j).isAdmin,
				onPlay: q,
				onResume: q,
				onWatchlist: ye,
				onInfo: J,
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
			]))], 64)) : v("", !0),
			k(j).isAdmin ? (E(), _(f, {
				key: 3,
				modelValue: Z.value,
				"onUpdate:modelValue": t[0] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: we
			}, null, 8, ["modelValue", "item"])) : v("", !0),
			k(j).isAdmin ? (E(), _(re, {
				key: 4,
				modelValue: Q.value,
				"onUpdate:modelValue": t[1] ||= (e) => Q.value = e,
				item: X.value,
				onApplied: Oe
			}, null, 8, ["modelValue", "item"])) : v("", !0)
		]));
	}
}), [["__scopeId", "data-v-33b0e3f3"]]);
//#endregion
export { I as default };

//# sourceMappingURL=MediaDetailPage-CsmBSFhN.js.map