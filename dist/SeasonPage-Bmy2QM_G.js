import { n as e, t } from "./Icon-CkTBN_k5.js";
import { o as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./useMessages-Dlbe0TRZ.js";
import { i, t as a } from "./client-COHWZ2KC.js";
import { n as o } from "./useApiBase-CV_r-Kk4.js";
import { t as s } from "./useImageSrc-KnN1T9Ga.js";
import { i as c } from "./usePlayerStore-DhgapSoa.js";
import { t as l } from "./useToastStore-BDoKlU6N.js";
import { n as u, t as d } from "./ThumbRating-DZt3qThy.js";
import { i as f } from "./usePageTitle-BO3GGF3M.js";
import { t as p } from "./Button-Cw8Wl4QR.js";
import { t as m } from "./Skeleton-C3OpJbf1.js";
import { t as h } from "./EmptyState-CwWtkhEJ.js";
import { i as g } from "./episode-order-C2yqgMeX.js";
import { i as _, n as v } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as y, computed as b, createBlock as x, createCommentVNode as S, createElementBlock as C, createElementVNode as w, createTextVNode as T, createVNode as E, defineComponent as D, inject as O, normalizeClass as k, onBeforeUnmount as ee, onMounted as te, openBlock as A, ref as j, renderList as M, toDisplayString as N, unref as P, watch as ne, withCtx as F, withModifiers as I } from "vue";
import { useRoute as re, useRouter as ie } from "vue-router";
//#region src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var ae = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, oe = ["open"], L = { class: "series-seasons__summary" }, R = { class: "series-seasons__season-label" }, z = { class: "series-seasons__season-count numeric" }, B = { class: "series-seasons__episodes" }, V = ["aria-label", "onClick"], H = ["aria-label", "onClick"], U = { class: "series-seasons__episode-title" }, W = {
	key: 0,
	class: "series-seasons__episode-meta numeric"
}, G = {
	key: 1,
	class: "series-seasons__episode-description"
}, K = [
	"aria-label",
	"title",
	"onClick"
], q = {
	key: 1,
	class: "series-seasons__files-detail"
}, J = {
	key: 0,
	class: "series-seasons__files-loading"
}, Y = { class: "series-seasons__file-path" }, se = { class: "series-seasons__file-meta numeric" }, ce = {
	key: 2,
	class: "series-seasons__files-empty"
}, le = /*#__PURE__*/ e(/* @__PURE__ */ D({
	__name: "SeriesSeasons",
	props: {
		seasons: {},
		openFirstOnly: {
			type: Boolean,
			default: !0
		},
		apiBase: { default: "" }
	},
	emits: ["play", "open"],
	setup(e, { emit: r }) {
		let a = e, o = r, s = O("auth", { isAdmin: !1 }), c = j({}), l = j(/* @__PURE__ */ new Set());
		function u(e) {
			return c.value[e];
		}
		function d(e) {
			return l.value.has(e);
		}
		async function f(e) {
			if (c.value[e] === void 0) try {
				let t = await i.get(`${a.apiBase}/api/v1/media/${encodeURIComponent(e)}`);
				c.value[e] = t.files ?? [];
			} catch {
				c.value[e] = [];
			}
		}
		function p(e) {
			d(e) ? l.value.delete(e) : (l.value.add(e), f(e));
		}
		function m(e) {
			let t = e.episode_title || e.name;
			return typeof e.episode_number == "number" ? `${e.episode_number}. ${t}` : t;
		}
		function h(e) {
			return e.runtime ? `${e.runtime}m` : null;
		}
		function g(e) {
			let t = e.air_date;
			if (!t) return null;
			let n = Date.parse(t);
			return Number.isNaN(n) ? t : new Date(n).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function _(e) {
			let t = e.overview?.trim();
			return t ? t.split(/\n\s*\n/)[0]?.trim() || t : null;
		}
		function v(e) {
			return !a.openFirstOnly || e === 0;
		}
		function x(e) {
			if (e <= 0) return "0 B";
			let t = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], n = 0, r = e;
			for (; r >= 1024 && n < t.length - 1;) r /= 1024, n++;
			n === 0 && e >= 960 && (n = 1, r = e / 1024);
			let i = r >= 100 ? 0 : r >= 10 ? 1 : 2;
			return `${r.toFixed(i)} ${t[n]}`;
		}
		let D = b(() => s.isAdmin && !!a.apiBase);
		return (r, i) => (A(), C("section", ae, [(A(!0), C(y, null, M(e.seasons, (e, r) => (A(), C("details", {
			key: e.key,
			class: "series-seasons__season",
			open: v(r)
		}, [w("summary", L, [
			E(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			w("span", R, N(e.label), 1),
			w("span", z, N(e.episodes.length) + " " + N(P(n)(e.episodes.length, "episode", "episodes")), 1)
		]), w("ul", B, [(A(!0), C(y, null, M(e.episodes, (e) => (A(), C("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			w("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${m(e)}`,
				onClick: (t) => o("play", e)
			}, [E(t, { name: "play" })], 8, V),
			w("button", {
				type: "button",
				class: "series-seasons__episode-main",
				"aria-label": `View ${m(e)}`,
				onClick: (t) => o("open", e)
			}, [
				w("span", U, N(m(e)), 1),
				g(e) || h(e) ? (A(), C("span", W, [
					g(e) ? (A(), C(y, { key: 0 }, [T(N(g(e)), 1)], 64)) : S("", !0),
					g(e) && h(e) ? (A(), C(y, { key: 1 }, [T(" · ")], 64)) : S("", !0),
					h(e) ? (A(), C(y, { key: 2 }, [T(N(h(e)), 1)], 64)) : S("", !0)
				])) : S("", !0),
				_(e) ? (A(), C("span", G, N(_(e)), 1)) : S("", !0)
			], 8, H),
			D.value ? (A(), C("button", {
				key: 0,
				type: "button",
				class: "series-seasons__files-btn",
				"aria-label": `Files info for ${m(e)}${d(e.id) ? " (expanded)" : ""}`,
				title: d(e.id) ? "Collapse files" : "Expand files",
				onClick: I((t) => p(e.id), ["stop"])
			}, [E(t, {
				name: d(e.id) ? "x" : "info",
				"aria-hidden": "true"
			}, null, 8, ["name"])], 8, K)) : S("", !0),
			D.value && d(e.id) ? (A(), C("div", q, [u(e.id) === void 0 ? (A(), C("span", J, " Loading… ")) : u(e.id)?.length ? (A(!0), C(y, { key: 1 }, M(u(e.id), (e, t) => (A(), C("span", {
				key: t,
				class: "series-seasons__file-row"
			}, [w("span", Y, N(e.path), 1), w("span", se, [
				T(N(x(e.size_bytes)) + " ", 1),
				e.container ? (A(), C(y, { key: 0 }, [T(" · " + N(e.container), 1)], 64)) : S("", !0),
				e.resolution ? (A(), C(y, { key: 1 }, [T(" · " + N(e.resolution), 1)], 64)) : S("", !0)
			])]))), 128)) : (A(), C("span", ce, "No files"))])) : S("", !0)
		]))), 128))])], 8, oe))), 128))]));
	}
}), [["__scopeId", "data-v-779b177a"]]), ue = { class: "season-page" }, de = {
	key: 0,
	class: "season-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading season"
}, fe = { class: "season-page__header" }, pe = { class: "season-page__hero" }, me = { class: "season-page__poster" }, he = ["src", "alt"], ge = {
	key: 1,
	class: "season-page__fallback",
	"aria-hidden": "true"
}, _e = { class: "season-page__info" }, ve = { class: "season-page__series-name" }, ye = { class: "season-page__title" }, be = { class: "season-page__count numeric" }, xe = { class: "season-page__actions" }, Se = {
	key: 0,
	class: "season-page__overview"
}, Ce = {
	class: "season-page__episodes",
	"aria-label": "Episodes"
}, X = /*#__PURE__*/ e(/* @__PURE__ */ D({
	__name: "SeasonPage",
	setup(e) {
		let i = o(), { imgSrc: D } = s(), O = re(), M = ie(), { t: I } = r(), ae = c(), oe = l(), L = u(), R = j(null), z = j(null), B = j(!0), V = j(null), H = b(() => String(O.params.id ?? "")), U = b(() => String(O.params.season ?? ""));
		f(() => {
			if (R.value) return z.value ? `${R.value.name} · ${z.value.label}` : R.value.name;
		});
		let W = b(() => z.value ? [z.value] : []), G = null, K = !1;
		function q(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function J() {
			let e = H.value;
			G?.abort(), G = typeof AbortController < "u" ? new AbortController() : null;
			let t = G, n = () => K || t !== G;
			if (B.value = !0, V.value = null, R.value = null, z.value = null, !e) {
				V.value = "No series id provided", B.value = !1;
				return;
			}
			try {
				let r = new a({ baseUrl: i.value }), o = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t?.signal);
				if (n()) return;
				R.value = o.item;
				let s = await _(r, i.value, e, t?.signal);
				if (n()) return;
				z.value = g(s, U.value), z.value?.seasonItem && L.hydrate(z.value.seasonItem), B.value = !1;
			} catch (e) {
				if (n() || q(e)) return;
				V.value = e instanceof Error ? e.message : "Failed to load season", B.value = !1;
			}
		}
		te(J), ne([H, U], J), ee(() => {
			K = !0, G?.abort(), G = null;
		});
		function Y(e, t) {
			M?.push({
				name: e,
				params: t
			}).catch(() => {});
		}
		function se(e) {
			Y("player", { id: e.id });
		}
		function ce(e) {
			Y("media", { id: e.id });
		}
		function X() {
			H.value ? Y("media", { id: H.value }) : M?.back();
		}
		let we = b(() => z.value?.seasonPoster ?? R.value?.poster_url ?? null), Te = b(() => z.value?.seasonItem?.overview ?? null);
		function Ee() {
			if (!z.value) return;
			let e = v(z.value, ae.resumeMap);
			e ? Y("player", { id: e.id }) : oe.info(I("season.noEpisodes"));
		}
		let Z = b(() => z.value?.seasonItem?.id ?? null), Q = b(() => Z.value ? L.isFavorite(Z.value) : !1), $ = b(() => Z.value ? L.isWatched(Z.value) : !1), De = b(() => Z.value ? L.likeLevel(Z.value) : 0);
		function Oe() {
			Z.value && L.toggleFavorite(Z.value, i.value);
		}
		function ke() {
			Z.value && L.toggleWatched(Z.value, i.value);
		}
		function Ae(e) {
			Z.value && L.setLike(Z.value, e, i.value);
		}
		return (e, r) => (A(), C("div", ue, [B.value ? (A(), C("div", de, [E(m, {
			variant: "text",
			width: "40%",
			height: "1.6rem"
		}), E(m, {
			variant: "text",
			lines: 3
		})])) : V.value ? (A(), x(h, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this season",
			description: V.value
		}, {
			actions: F(() => [E(p, {
				variant: "solid",
				onClick: J
			}, {
				default: F(() => [...r[0] ||= [T("Retry", -1)]]),
				_: 1
			}), E(p, {
				variant: "ghost",
				onClick: X
			}, {
				default: F(() => [...r[1] ||= [T("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : R.value && z.value ? (A(), C(y, { key: 2 }, [w("header", fe, [w("button", {
			type: "button",
			class: "season-page__back",
			onClick: X
		}, [E(t, { name: "arrow-left" }), w("span", null, N(R.value.name), 1)]), w("div", pe, [w("div", me, [we.value ? (A(), C("img", {
			key: 0,
			class: "season-page__img",
			src: P(D)(we.value),
			alt: `${R.value.name} ${z.value.label}`,
			decoding: "async"
		}, null, 8, he)) : (A(), C("div", ge, [E(t, { name: "tv" })]))]), w("div", _e, [
			w("p", ve, N(R.value.name), 1),
			w("h1", ye, N(z.value.label), 1),
			w("p", be, N(z.value.episodes.length) + " " + N(P(n)(z.value.episodes.length, "episode", "episodes")), 1),
			w("div", xe, [E(p, {
				variant: "solid",
				"left-icon": "play",
				onClick: Ee
			}, {
				default: F(() => [T(N(P(I)("season.play")), 1)]),
				_: 1
			}), Z.value ? (A(), C(y, { key: 0 }, [
				E(p, {
					variant: "ghost",
					class: k(["season-page__favorite", { "is-active": Q.value }]),
					"left-icon": Q.value ? "bookmark" : "bookmark-plus",
					"aria-label": Q.value ? P(I)("season.removeFavorite") : P(I)("season.addFavorite"),
					"aria-pressed": Q.value ? "true" : "false",
					onClick: Oe
				}, {
					default: F(() => [T(N(Q.value ? P(I)("season.inFavorites") : P(I)("season.watchlist")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				E(p, {
					variant: "ghost",
					class: k(["season-page__watched", { "is-active": $.value }]),
					"left-icon": $.value ? "eye" : "eye-off",
					"aria-label": $.value ? P(I)("season.markUnwatchedAria") : P(I)("season.markWatchedAria"),
					"aria-pressed": $.value ? "true" : "false",
					onClick: ke
				}, {
					default: F(() => [T(N($.value ? P(I)("season.watched") : P(I)("season.markWatched")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				E(d, {
					level: De.value,
					onCycle: Ae
				}, null, 8, ["level"])
			], 64)) : S("", !0)]),
			Te.value ? (A(), C("p", Se, N(Te.value), 1)) : S("", !0)
		])])]), w("section", Ce, [z.value.episodes.length ? (A(), x(le, {
			key: 0,
			seasons: W.value,
			"open-first-only": !1,
			"api-base": P(i),
			onPlay: se,
			onOpen: ce
		}, null, 8, ["seasons", "api-base"])) : (A(), x(h, {
			key: 1,
			icon: "tv",
			title: "No episodes yet",
			description: "This season has no episodes available to watch."
		}))])], 64)) : R.value ? (A(), x(h, {
			key: 3,
			icon: "tv",
			title: "Season not found",
			description: `${R.value.name} has no such season.`
		}, {
			actions: F(() => [E(p, {
				variant: "solid",
				onClick: X
			}, {
				default: F(() => [...r[2] ||= [T("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : S("", !0)]));
	}
}), [["__scopeId", "data-v-2cc467e5"]]);
//#endregion
export { X as default };

//# sourceMappingURL=SeasonPage-Bmy2QM_G.js.map