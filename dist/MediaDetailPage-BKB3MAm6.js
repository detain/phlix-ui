import { n as e } from "./Icon-CkTBN_k5.js";
import { a as t } from "./usePreferencesStore-CFPikE8Z.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./client-DA-5QZXw.js";
import { n as i } from "./useApiBase-CV_r-Kk4.js";
import { t as a } from "./useAuthStore-vm6oniX7.js";
import { i as o } from "./usePlayerStore-DhgapSoa.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { n as c } from "./ThumbRating-DTgQWbsu.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as l } from "./Button-Cw8Wl4QR.js";
import { t as u } from "./Skeleton-C3OpJbf1.js";
import { t as te } from "./EmptyState-CwWtkhEJ.js";
import { t as d } from "./MediaCard-BcNPkyJz.js";
import { n as ne } from "./media-query-DKjhlX8r.js";
import { t as f } from "./MediaDetail-DXdFRsbT.js";
import { t as re } from "./MetadataMatchModal-D-SLpTGq.js";
import { t as ie } from "./PosterPicker-C6eLSaIm.js";
import { n as ae, t as oe } from "./useItemInspector-Cn3FRzeh.js";
import { s as p } from "./episode-order-C2yqgMeX.js";
import { i as se, n as ce, t as le } from "./useResolvePlayable-wCiMWuME.js";
import { n as ue, r as de, t as fe } from "./useMediaItemCache-BKCJnCbr.js";
import { Fragment as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as pe, createVNode as b, defineComponent as x, inject as me, isRef as he, normalizeStyle as S, onBeforeUnmount as ge, onMounted as _e, openBlock as C, ref as w, renderList as T, unref as E, watch as ve, withCtx as D } from "vue";
import { useRoute as ye, useRouter as be } from "vue-router";
//#region src/components/SeriesDetail.vue?vue&type=script&setup=true&lang.ts
var O = { class: "series-detail" }, k = {
	class: "series-detail__seasons",
	"aria-label": "Seasons"
}, A = {
	key: 0,
	class: "series-detail__seasons-loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading seasons"
}, j = {
	key: 2,
	class: "series-detail__empty"
}, xe = /*#__PURE__*/ e(/* @__PURE__ */ x({
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
		"remove",
		"edit-metadata",
		"explore-data"
	],
	setup(e, { emit: r }) {
		let i = e, a = r;
		function o(e) {
			return `${i.routerBase}/media/${i.item.id}/season/${p(e)}`;
		}
		function s(e) {
			return e.seasonPoster ?? i.item.poster_url ?? null;
		}
		function c(e) {
			let t = e.episodes.length;
			return n(t, "episode", "episodes");
		}
		function ee(e) {
			return e.seasonItem ? {
				...e.seasonItem,
				name: e.label,
				poster_url: s(e)
			} : {
				id: `${i.item.id}:${e.key}`,
				name: e.label,
				type: "season",
				poster_url: s(e),
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
		let l = h(() => i.seasons.length > 0), u = t(), te = h(() => u.cardSize ?? 200);
		return (t, n) => (C(), v("div", O, [b(f, {
			item: e.item,
			"resume-seconds": e.resumeSeconds,
			similar: [],
			"similar-loading": !1,
			"can-match": e.canMatch,
			onPlay: n[0] ||= (e) => a("play", e),
			onResume: n[1] ||= (e) => a("resume", e),
			onWatchlist: n[2] ||= (e) => a("watchlist", e),
			onInfo: n[3] ||= (e) => a("info", e),
			onMatch: n[4] ||= (e) => a("match", e),
			onBack: n[5] ||= (e) => a("back"),
			onMarkWatched: n[6] ||= (e) => a("mark-watched", e),
			onRefresh: n[7] ||= (e) => a("refresh", e),
			onChoosePoster: n[8] ||= (e) => a("choose-poster", e),
			onRemove: n[9] ||= (e) => a("remove", e),
			onEditMetadata: n[10] ||= (e) => a("edit-metadata", e),
			onExploreData: n[11] ||= (e) => a("explore-data", e)
		}, null, 8, [
			"item",
			"resume-seconds",
			"can-match"
		]), y("section", k, [n[12] ||= y("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (C(), v("div", A)) : l.value ? (C(), v("ul", {
			key: 1,
			class: "series-detail__grid",
			style: S({ gridTemplateColumns: `repeat(auto-fill, minmax(${te.value}px, 1fr))` })
		}, [(C(!0), v(m, null, T(e.seasons, (e) => (C(), v("li", {
			key: e.key,
			class: "series-detail__cell"
		}, [b(d, {
			item: ee(e),
			to: o(e),
			subtitle: c(e),
			"play-only": "",
			onPlay: (t) => a("play-season", e)
		}, null, 8, [
			"item",
			"to",
			"subtitle",
			"onPlay"
		])]))), 128))], 4)) : (C(), v("p", j, "This series has no seasons available to watch."))])]));
	}
}), [["__scopeId", "data-v-6e08b53c"]]), Se = { class: "media-detail-page" }, Ce = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, we = { class: "media-detail-page__loading-hero" }, Te = { class: "media-detail-page__loading-info" }, M = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "MediaDetailPage",
	setup(e) {
		let t = i(), n = me("phlixConfig", void 0), d = h(() => n?.routerBase || "/app"), p = ye(), x = be(), S = o(), T = s(), O = a(), k = c(), A = w(null), j = w([]), M = w([]), N = w(!0), P = w(!1), F = w(!1), I = w(null), L = h(() => String(p.params.id ?? "")), R = h(() => S.resumePositionFor(L.value)), Ee = h(() => A.value?.type === "series");
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
				let a = await se(e, t.value, n.id, r?.signal);
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
			let n = z;
			if (N.value = !0, I.value = null, j.value = [], M.value = [], !e) {
				I.value = "No media id provided", N.value = !1;
				return;
			}
			let i = ue(e), a = Date.now(), o = de(i, a);
			if (i && o) {
				if (B || n !== z) return;
				A.value = i.item, J.value = i.item, N.value = !1, k.hydrate(i.item), i.item.type === "series" ? U(new r({ baseUrl: t.value }), i.item) : H(new r({ baseUrl: t.value }), i.item);
				return;
			}
			try {
				let n = new r({ baseUrl: t.value }), i = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, z?.signal);
				if (B) return;
				let o = i.item;
				A.value = o, J.value = o, fe(e, o, a), N.value = !1, k.hydrate(o), o.type === "series" ? U(n, o) : H(n, o);
			} catch (e) {
				if (B || V(e)) return;
				if (i) {
					A.value = i.item, J.value = i.item, N.value = !1, k.hydrate(i.item), i.item.type === "series" ? U(new r({ baseUrl: t.value }), i.item) : H(new r({ baseUrl: t.value }), i.item);
					return;
				}
				I.value = e instanceof Error ? e.message : "Failed to load title", N.value = !1;
			}
		}
		_e(W), ve(L, W), ge(() => {
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
				let e = le(M.value, S.resumeMap);
				e ? G("player", e.id) : T.info("No episodes to play yet");
				return;
			}
			G("player", e.id);
		}
		function De(e) {
			let t = ce(e, S.resumeMap);
			t ? G("player", t.id) : T.info("No episodes to play yet");
		}
		function Oe(e) {
			k.isFavorite(e.id) ? T.success(`Added "${e.name}" to your favorites`) : T.info(`Removed "${e.name}" from your favorites`);
		}
		function ke(e) {
			G("media", e.id);
		}
		function q() {
			x?.back();
		}
		function Ae(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		function je(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Me(e) {
			let t = A.value?.library_id;
			t && x?.hasRoute("library") && x.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let J = w(null), Y = w(!1), X = w(!1), { inspectorItem: Ne, inspectorOpen: Z, openInspector: Pe } = oe();
		function Q(e) {
			let t = e ?? A.value;
			t && (J.value = t, Y.value = !0);
		}
		function Fe(e) {
			A.value = e, J.value = e, T.success(`Updated metadata for "${e.name}"`), e.type === "series" && U(new r({ baseUrl: t.value }), e);
		}
		function Ie(e) {
			k.isWatched(e.id) ? T.success(`Marked "${e.name}" as watched`) : T.info(`Marked "${e.name}" as unwatched`);
		}
		function Le(e) {
			J.value = e, X.value = !0;
		}
		function Re(e) {
			A.value = e, J.value = e, T.success(`Updated poster for "${e.name}"`);
		}
		let $ = null;
		async function ze(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			$?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			$ = n;
			let i = () => n !== $;
			try {
				if (await new r({ baseUrl: t.value }).deleteMediaItem(e.id), i()) return;
				A.value = null, T.success(`Removed "${e.name}"`), x?.back();
			} catch (t) {
				if (i() || V(t)) return;
				T.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (C(), v("div", Se, [
			N.value ? (C(), v("div", Ce, [y("div", we, [b(u, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), y("div", Te, [
				b(u, {
					variant: "text",
					width: "60%",
					height: "2rem"
				}),
				b(u, {
					variant: "text",
					lines: 4
				}),
				b(u, {
					variant: "rect",
					width: "9rem",
					height: "2.5rem",
					radius: "var(--radius-md)"
				})
			])])])) : I.value ? (C(), g(te, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: I.value
			}, {
				actions: D(() => [b(l, {
					variant: "solid",
					onClick: W
				}, {
					default: D(() => [...t[3] ||= [pe("Retry", -1)]]),
					_: 1
				}), b(l, {
					variant: "ghost",
					onClick: q
				}, {
					default: D(() => [...t[4] ||= [pe("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value ? (C(), v(m, { key: 2 }, [Ee.value ? (C(), g(xe, {
				key: 0,
				item: A.value,
				seasons: M.value,
				loading: F.value,
				"resume-seconds": R.value,
				"router-base": d.value,
				"can-match": E(O).isAdmin,
				onPlay: K,
				onResume: K,
				onPlaySeason: De,
				onWatchlist: Oe,
				onInfo: ke,
				onMatch: Q,
				onMarkWatched: Ie,
				onRefresh: Q,
				onEditMetadata: Q,
				onExploreData: E(Pe),
				onChoosePoster: Le,
				onRemove: ze,
				onBack: q
			}, null, 8, [
				"item",
				"seasons",
				"loading",
				"resume-seconds",
				"router-base",
				"can-match",
				"onExploreData"
			])) : (C(), g(f, {
				key: 1,
				item: A.value,
				"resume-seconds": R.value,
				similar: j.value,
				"similar-loading": P.value,
				"can-match": E(O).isAdmin,
				onPlay: K,
				onResume: K,
				onWatchlist: Oe,
				onInfo: ke,
				onMatch: Q,
				onActor: Ae,
				onGenre: je,
				onCompany: Me,
				onMarkWatched: Ie,
				onRefresh: Q,
				onEditMetadata: Q,
				onExploreData: E(Pe),
				onChoosePoster: Le,
				onRemove: ze,
				onBack: q
			}, null, 8, [
				"item",
				"resume-seconds",
				"similar",
				"similar-loading",
				"can-match",
				"onExploreData"
			]))], 64)) : _("", !0),
			E(O).isAdmin ? (C(), g(re, {
				key: 3,
				modelValue: Y.value,
				"onUpdate:modelValue": t[0] ||= (e) => Y.value = e,
				item: J.value,
				onApplied: Fe
			}, null, 8, ["modelValue", "item"])) : _("", !0),
			E(O).isAdmin ? (C(), g(ie, {
				key: 4,
				modelValue: X.value,
				"onUpdate:modelValue": t[1] ||= (e) => X.value = e,
				item: J.value,
				onApplied: Re
			}, null, 8, ["modelValue", "item"])) : _("", !0),
			E(O).isAdmin ? (C(), g(ae, {
				key: 5,
				modelValue: E(Z),
				"onUpdate:modelValue": t[2] ||= (e) => he(Z) ? Z.value = e : null,
				item: E(Ne)
			}, null, 8, ["modelValue", "item"])) : _("", !0)
		]));
	}
}), [["__scopeId", "data-v-559e6e96"]]);
//#endregion
export { M as default };

//# sourceMappingURL=MediaDetailPage-BKB3MAm6.js.map