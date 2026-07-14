import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { a as t } from "./usePreferencesStore-g-d6JBr9.js";
import { t as n } from "./client-D1nDQ0cP.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-C_Rnq3Bo.js";
import { i as a } from "./usePlayerStore-fCCh6mOw.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { n as s } from "./ThumbRating-Db3pVsxe.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as c } from "./Button-btm-GCUN.js";
import { t as l } from "./Skeleton-DhQmxeNg.js";
import { t as te } from "./EmptyState-CfyGawh7.js";
import { t as u } from "./MediaCard-BPOdw-U9.js";
import { n as ne } from "./media-query-DKjhlX8r.js";
import { t as d } from "./MediaDetail-CA36tFVq.js";
import { t as re } from "./MetadataMatchModal-Mf19Mq1U.js";
import { t as ie } from "./PosterPicker-C-nIEDRa.js";
import { s as f } from "./episode-order-C2yqgMeX.js";
import { i as ae, n as oe, t as se } from "./useResolvePlayable-wCiMWuME.js";
import { n as ce, r as le, t as ue } from "./useMediaItemCache-BKCJnCbr.js";
import { Fragment as de, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as fe, normalizeStyle as x, onBeforeUnmount as pe, onMounted as me, openBlock as S, ref as C, renderList as w, unref as T, watch as he, withCtx as E } from "vue";
import { useRoute as ge, useRouter as _e } from "vue-router";
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
	key: 2,
	class: "series-detail__empty"
}, ve = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
			return `${r.routerBase}/media/${r.item.id}/season/${f(e)}`;
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
		let c = p(() => r.seasons.length > 0), l = t(), te = p(() => l.cardSize ?? 200);
		return (t, n) => (S(), g("div", D, [y(d, {
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
		]), _("section", O, [n[10] ||= _("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (S(), g("div", k)) : c.value ? (S(), g("ul", {
			key: 1,
			class: "series-detail__grid",
			style: x({ gridTemplateColumns: `repeat(auto-fill, minmax(${te.value}px, 1fr))` })
		}, [(S(!0), g(de, null, w(e.seasons, (e) => (S(), g("li", {
			key: e.key,
			class: "series-detail__cell"
		}, [y(u, {
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
		])]))), 128))], 4)) : (S(), g("p", A, "This series has no seasons available to watch."))])]));
	}
}), [["__scopeId", "data-v-0d6bcb46"]]), ye = { class: "media-detail-page" }, be = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, xe = { class: "media-detail-page__loading-hero" }, Se = { class: "media-detail-page__loading-info" }, j = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "MediaDetailPage",
	setup(e) {
		let t = r(), u = fe("phlixConfig", void 0), f = p(() => u?.routerBase || "/app"), b = ge(), x = _e(), w = a(), D = o(), O = i(), k = s(), A = C(null), j = C([]), M = C([]), N = C(!0), P = C(!1), F = C(!1), I = C(null), L = p(() => String(b.params.id ?? "")), R = p(() => w.resumePositionFor(L.value)), Ce = p(() => A.value?.type === "series");
		ee(() => A.value?.name);
		let z = null, B = !1;
		function V(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function H(e, n) {
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
		async function U(e, n) {
			let r = z, i = () => B || r !== z;
			F.value = !0, M.value = [];
			try {
				let a = await ae(e, t.value, n.id, r?.signal);
				if (i()) return;
				M.value = a;
			} catch (e) {
				if (i() || V(e)) return;
				M.value = [];
			} finally {
				i() || (F.value = !1);
			}
		}
		async function W() {
			let e = L.value;
			z?.abort(), z = typeof AbortController < "u" ? new AbortController() : null;
			let r = z;
			if (N.value = !0, I.value = null, j.value = [], M.value = [], !e) {
				I.value = "No media id provided", N.value = !1;
				return;
			}
			let i = ce(e), a = Date.now(), o = le(i, a);
			if (i && o) {
				if (B || r !== z) return;
				A.value = i.item, J.value = i.item, N.value = !1, k.hydrate(i.item), i.item.type === "series" ? U(new n({ baseUrl: t.value }), i.item) : H(new n({ baseUrl: t.value }), i.item);
				return;
			}
			try {
				let r = new n({ baseUrl: t.value }), i = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, z?.signal);
				if (B) return;
				let o = i.item;
				A.value = o, J.value = o, ue(e, o, a), N.value = !1, k.hydrate(o), o.type === "series" ? U(r, o) : H(r, o);
			} catch (e) {
				if (B || V(e)) return;
				if (i) {
					A.value = i.item, J.value = i.item, N.value = !1, k.hydrate(i.item), i.item.type === "series" ? U(new n({ baseUrl: t.value }), i.item) : H(new n({ baseUrl: t.value }), i.item);
					return;
				}
				I.value = e instanceof Error ? e.message : "Failed to load title", N.value = !1;
			}
		}
		me(W), he(L, W), pe(() => {
			B = !0, z?.abort(), z = null;
		});
		function G(e, t) {
			x?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function K(e) {
			if (e.type === "series") {
				let e = se(M.value, w.resumeMap);
				e ? G("player", e.id) : D.info("No episodes to play yet");
				return;
			}
			G("player", e.id);
		}
		function we(e) {
			let t = oe(e, w.resumeMap);
			t ? G("player", t.id) : D.info("No episodes to play yet");
		}
		function Te(e) {
			k.isFavorite(e.id) ? D.success(`Added "${e.name}" to your favorites`) : D.info(`Removed "${e.name}" from your favorites`);
		}
		function Ee(e) {
			G("media", e.id);
		}
		function q() {
			x?.back();
		}
		function De(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function Oe(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function ke(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let J = C(null), Y = C(!1), X = C(!1);
		function Z() {
			A.value && (J.value = A.value, Y.value = !0);
		}
		function Ae(e) {
			A.value = e, J.value = e, D.success(`Updated metadata for "${e.name}"`), e.type === "series" && U(new n({ baseUrl: t.value }), e);
		}
		function je(e) {
			k.isWatched(e.id) ? D.success(`Marked "${e.name}" as watched`) : D.info(`Marked "${e.name}" as unwatched`);
		}
		function Me(e) {
			J.value = e, Y.value = !0;
		}
		function Ne(e) {
			J.value = e, X.value = !0;
		}
		function Pe(e) {
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
				A.value = null, D.success(`Removed "${e.name}"`), x?.back();
			} catch (t) {
				if (i() || V(t)) return;
				D.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (S(), g("div", ye, [
			N.value ? (S(), g("div", be, [_("div", xe, [y(l, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), _("div", Se, [
				y(l, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				y(l, {
					variant: "text",
					lines: 4
				}),
				y(l, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : I.value ? (S(), m(te, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: I.value
			}, {
				actions: E(() => [y(c, {
					variant: "solid",
					onClick: W
				}, {
					default: E(() => [...t[2] ||= [v("Retry", -1)]]),
					_: 1
				}), y(c, {
					variant: "ghost",
					onClick: q
				}, {
					default: E(() => [...t[3] ||= [v("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value ? (S(), g(de, { key: 2 }, [Ce.value ? (S(), m(ve, {
				key: 0,
				item: A.value,
				seasons: M.value,
				loading: F.value,
				"resume-seconds": R.value,
				"router-base": f.value,
				"can-match": T(O).isAdmin,
				onPlay: K,
				onResume: K,
				onPlaySeason: we,
				onWatchlist: Te,
				onInfo: Ee,
				onMatch: Z,
				onMarkWatched: je,
				onRefresh: Me,
				onChoosePoster: Ne,
				onRemove: $,
				onBack: q
			}, null, 8, [
				"item",
				"seasons",
				"loading",
				"resume-seconds",
				"router-base",
				"can-match"
			])) : (S(), m(d, {
				key: 1,
				item: A.value,
				"resume-seconds": R.value,
				similar: j.value,
				"similar-loading": P.value,
				"can-match": T(O).isAdmin,
				onPlay: K,
				onResume: K,
				onWatchlist: Te,
				onInfo: Ee,
				onMatch: Z,
				onActor: De,
				onGenre: Oe,
				onCompany: ke,
				onMarkWatched: je,
				onRefresh: Me,
				onChoosePoster: Ne,
				onRemove: $,
				onBack: q
			}, null, 8, [
				"item",
				"resume-seconds",
				"similar",
				"similar-loading",
				"can-match"
			]))], 64)) : h("", !0),
			T(O).isAdmin ? (S(), m(re, {
				key: 3,
				modelValue: Y.value,
				"onUpdate:modelValue": t[0] ||= (e) => Y.value = e,
				item: J.value,
				onApplied: Ae
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			T(O).isAdmin ? (S(), m(ie, {
				key: 4,
				modelValue: X.value,
				"onUpdate:modelValue": t[1] ||= (e) => X.value = e,
				item: J.value,
				onApplied: Pe
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-7264a44c"]]);
//#endregion
export { j as default };

//# sourceMappingURL=MediaDetailPage-BBfEq_Z1.js.map