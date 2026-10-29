import { n as e } from "./Icon-CIwTuFLd.js";
import { a as t } from "./usePreferencesStore-CFPikE8Z.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./client-CRZ_SWB1.js";
import { n as i } from "./useApiBase-CV_r-Kk4.js";
import { t as a } from "./useAuthStore-BbS6J1QF.js";
import { i as o } from "./usePlayerStore-D8A_gb_c.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { n as ee } from "./ThumbRating-cLiSk8V_.js";
import { t as c } from "./EmptyState-BAyOxAcK.js";
import { t as l } from "./Button-BuG0GvCa.js";
import { i as te } from "./usePageTitle-BO3GGF3M.js";
import { t as ne } from "./ConfirmDialog-CNQA7xjO.js";
import { t as u } from "./Skeleton-rHw-IJtl.js";
import { t as re } from "./MediaCard-PbvMsLQM.js";
import { n as ie } from "./media-query-DKjhlX8r.js";
import { t as d } from "./MediaDetail-BcdQpnB3.js";
import { t as ae } from "./MetadataMatchModal-nCUBOxlh.js";
import { t as oe } from "./PosterPicker-DX6ERMPh.js";
import { n as se, t as ce } from "./useItemInspector-CMXApT6b.js";
import { s as f } from "./episode-order-C2yqgMeX.js";
import { i as le, n as ue, t as de } from "./useResolvePlayable-wCiMWuME.js";
import { n as fe, r as pe, t as me } from "./useMediaItemCache-BKCJnCbr.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as he, createVNode as y, defineComponent as b, inject as ge, isRef as _e, normalizeStyle as x, onBeforeUnmount as ve, onMounted as ye, openBlock as S, ref as C, renderList as w, unref as T, watch as be, withCtx as E } from "vue";
import { useRoute as xe, useRouter as Se } from "vue-router";
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
}, Ce = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
			return `${i.routerBase}/media/${i.item.id}/season/${f(e)}`;
		}
		function s(e) {
			return e.seasonPoster ?? i.item.poster_url ?? null;
		}
		function ee(e) {
			let t = e.episodes.length;
			return n(t, "episode", "episodes");
		}
		function c(e) {
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
		let l = m(() => i.seasons.length > 0), te = t(), ne = m(() => te.cardSize ?? 200);
		return (t, n) => (S(), _("div", D, [y(d, {
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
		]), v("section", O, [n[12] ||= v("h2", { class: "series-detail__seasons-title" }, "Seasons", -1), e.loading ? (S(), _("div", k)) : l.value ? (S(), _("ul", {
			key: 1,
			class: "series-detail__grid",
			style: x({ gridTemplateColumns: `repeat(auto-fill, minmax(${ne.value}px, 1fr))` })
		}, [(S(!0), _(p, null, w(e.seasons, (e) => (S(), _("li", {
			key: e.key,
			class: "series-detail__cell"
		}, [y(re, {
			item: c(e),
			to: o(e),
			subtitle: ee(e),
			"play-only": "",
			onPlay: (t) => a("play-season", e)
		}, null, 8, [
			"item",
			"to",
			"subtitle",
			"onPlay"
		])]))), 128))], 4)) : (S(), _("p", A, "This series has no seasons available to watch."))])]));
	}
}), [["__scopeId", "data-v-6e08b53c"]]), we = { class: "media-detail-page" }, Te = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, Ee = { class: "media-detail-page__loading-hero" }, De = { class: "media-detail-page__loading-info" }, j = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "MediaDetailPage",
	setup(e) {
		let t = i(), n = ge("phlixConfig", void 0), re = m(() => n?.routerBase || "/app"), f = xe(), b = Se(), x = o(), w = s(), D = a(), O = ee(), k = C(null), A = C([]), j = C([]), M = C(!0), N = C(!1), P = C(!1), F = C(null), I = m(() => String(f.params.id ?? "")), L = m(() => x.resumePositionFor(I.value)), Oe = m(() => k.value?.type === "series");
		te(() => k.value?.name);
		let R = null, z = !1;
		function B(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function V(e, n) {
			let r = n.genres?.[0];
			if (!r) {
				A.value = [];
				return;
			}
			let i = R, a = () => z || i !== R;
			N.value = !0;
			try {
				let o = ie(t.value, {
					genres: [r],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				A.value = (s.items ?? []).filter((e) => e.id !== n.id).slice(0, 12);
			} catch (e) {
				if (a() || B(e)) return;
				A.value = [];
			} finally {
				a() || (N.value = !1);
			}
		}
		async function H(e, n) {
			let r = R, i = () => z || r !== R;
			P.value = !0, j.value = [];
			try {
				let a = await le(e, t.value, n.id, r?.signal);
				if (i()) return;
				j.value = a;
			} catch (e) {
				if (i() || B(e)) return;
				j.value = [];
			} finally {
				i() || (P.value = !1);
			}
		}
		async function U() {
			let e = I.value;
			R?.abort(), R = typeof AbortController < "u" ? new AbortController() : null;
			let n = R;
			if (M.value = !0, F.value = null, A.value = [], j.value = [], !e) {
				F.value = "No media id provided", M.value = !1;
				return;
			}
			let i = fe(e), a = Date.now(), o = pe(i, a);
			if (i && o) {
				if (z || n !== R) return;
				k.value = i.item, q.value = i.item, M.value = !1, O.hydrate(i.item), i.item.type === "series" ? H(new r({ baseUrl: t.value }), i.item) : V(new r({ baseUrl: t.value }), i.item);
				return;
			}
			try {
				let n = new r({ baseUrl: t.value }), i = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, R?.signal);
				if (z) return;
				let o = i.item;
				k.value = o, q.value = o, me(e, o, a), M.value = !1, O.hydrate(o), o.type === "series" ? H(n, o) : V(n, o);
			} catch (e) {
				if (z || B(e)) return;
				if (i) {
					k.value = i.item, q.value = i.item, M.value = !1, O.hydrate(i.item), i.item.type === "series" ? H(new r({ baseUrl: t.value }), i.item) : V(new r({ baseUrl: t.value }), i.item);
					return;
				}
				F.value = e instanceof Error ? e.message : "Failed to load title", M.value = !1;
			}
		}
		ye(U), be(I, U), ve(() => {
			z = !0, R?.abort(), R = null;
		});
		function W(e, t) {
			b?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function G(e) {
			if (e.type === "series") {
				let e = de(j.value, x.resumeMap);
				e ? W("player", e.id) : w.info("No episodes to play yet");
				return;
			}
			W("player", e.id);
		}
		function ke(e) {
			let t = ue(e, x.resumeMap);
			t ? W("player", t.id) : w.info("No episodes to play yet");
		}
		function Ae(e) {
			O.isFavorite(e.id) ? w.success(`Added "${e.name}" to your favorites`) : w.info(`Removed "${e.name}" from your favorites`);
		}
		function je(e) {
			W("media", e.id);
		}
		function Me() {
			if (b) {
				if (b.options.history.state?.back) {
					b.back();
					return;
				}
				b.hasRoute("browse") ? b.replace({ name: "browse" }) : b.replace("/");
			}
		}
		function K() {
			Me();
		}
		function Ne(e) {
			let t = k.value?.library_id;
			t && b?.hasRoute("library") && b.push({
				name: "library",
				params: { id: t },
				query: { actors: e }
			});
		}
		let Pe = m(() => k.value?.library_id != null && b?.hasRoute("library") === !0);
		function Fe(e) {
			let t = k.value?.library_id;
			t && b?.hasRoute("library") && b.push({
				name: "library",
				params: { id: t },
				query: { genres: e }
			});
		}
		function Ie(e) {
			let t = k.value?.library_id;
			t && b?.hasRoute("library") && b.push({
				name: "library",
				params: { id: t },
				query: { companies: e }
			});
		}
		let q = C(null), J = C(!1), Y = C(!1), { inspectorItem: Le, inspectorOpen: X, openInspector: Re } = ce();
		function Z(e) {
			let t = e ?? k.value;
			t && (q.value = t, J.value = !0);
		}
		function ze(e) {
			k.value = e, q.value = e, w.success(`Updated metadata for "${e.name}"`), e.type === "series" && H(new r({ baseUrl: t.value }), e);
		}
		function Be(e) {
			O.isWatched(e.id) ? w.success(`Marked "${e.name}" as watched`) : w.info(`Marked "${e.name}" as unwatched`);
		}
		function Ve(e) {
			q.value = e, Y.value = !0;
		}
		function He(e) {
			k.value = e, q.value = e, w.success(`Updated poster for "${e.name}"`);
		}
		let Q = null, $ = C(null);
		function Ue(e) {
			$.value = e;
		}
		async function We() {
			let e = $.value;
			if ($.value = null, !e) return;
			Q?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Q = n;
			let i = () => n !== Q;
			try {
				if (await new r({ baseUrl: t.value }).deleteMediaItem(e.id), i()) return;
				k.value = null, w.success(`Removed "${e.name}"`), Me();
			} catch (t) {
				if (i() || B(t)) return;
				w.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (S(), _("div", we, [
			M.value ? (S(), _("div", Te, [v("div", Ee, [y(u, {
				variant: "rect",
				radius: "var(--radius-lg)",
				height: "420px"
			}), v("div", De, [
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
			])])])) : F.value ? (S(), h(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load this title",
				description: F.value
			}, {
				actions: E(() => [y(l, {
					variant: "solid",
					onClick: U
				}, {
					default: E(() => [...t[4] ||= [he("Retry", -1)]]),
					_: 1
				}), y(l, {
					variant: "ghost",
					onClick: K
				}, {
					default: E(() => [...t[5] ||= [he("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : k.value ? (S(), _(p, { key: 2 }, [Oe.value ? (S(), h(Ce, {
				key: 0,
				item: k.value,
				seasons: j.value,
				loading: P.value,
				"resume-seconds": L.value,
				"router-base": re.value,
				"can-match": T(D).isAdmin,
				onPlay: G,
				onResume: G,
				onPlaySeason: ke,
				onWatchlist: Ae,
				onInfo: je,
				onMatch: Z,
				onMarkWatched: Be,
				onRefresh: Z,
				onEditMetadata: Z,
				onExploreData: T(Re),
				onChoosePoster: Ve,
				onRemove: Ue,
				onBack: K
			}, null, 8, [
				"item",
				"seasons",
				"loading",
				"resume-seconds",
				"router-base",
				"can-match",
				"onExploreData"
			])) : (S(), h(d, {
				key: 1,
				item: k.value,
				"chips-clickable": Pe.value,
				"resume-seconds": L.value,
				similar: A.value,
				"similar-loading": N.value,
				"can-match": T(D).isAdmin,
				onPlay: G,
				onResume: G,
				onWatchlist: Ae,
				onInfo: je,
				onMatch: Z,
				onActor: Ne,
				onGenre: Fe,
				onCompany: Ie,
				onMarkWatched: Be,
				onRefresh: Z,
				onEditMetadata: Z,
				onExploreData: T(Re),
				onChoosePoster: Ve,
				onRemove: Ue,
				onBack: K
			}, null, 8, [
				"item",
				"chips-clickable",
				"resume-seconds",
				"similar",
				"similar-loading",
				"can-match",
				"onExploreData"
			]))], 64)) : g("", !0),
			T(D).isAdmin ? (S(), h(ae, {
				key: 3,
				modelValue: J.value,
				"onUpdate:modelValue": t[0] ||= (e) => J.value = e,
				item: q.value,
				onApplied: ze
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			T(D).isAdmin ? (S(), h(oe, {
				key: 4,
				modelValue: Y.value,
				"onUpdate:modelValue": t[1] ||= (e) => Y.value = e,
				item: q.value,
				onApplied: He
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			y(ne, {
				open: $.value !== null,
				message: $.value ? `Remove “${$.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || ($.value = null);
				},
				onConfirm: We
			}, null, 8, ["open", "message"]),
			T(D).isAdmin ? (S(), h(se, {
				key: 5,
				modelValue: T(X),
				"onUpdate:modelValue": t[3] ||= (e) => _e(X) ? X.value = e : null,
				item: T(Le)
			}, null, 8, ["modelValue", "item"])) : g("", !0)
		]));
	}
}), [["__scopeId", "data-v-066ddf85"]]);
//#endregion
export { j as default };

//# sourceMappingURL=MediaDetailPage-DB4Gfhwj.js.map