import { n as e, t } from "./Icon-CkTBN_k5.js";
import { o as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./useMessages-nO4j4SSL.js";
import { i, t as a } from "./client-COHWZ2KC.js";
import { n as o } from "./useApiBase-CV_r-Kk4.js";
import { i as s } from "./usePlayerStore-DhgapSoa.js";
import { t as c } from "./useToastStore-BDoKlU6N.js";
import { n as l, t as u } from "./ThumbRating-1bRvqpja.js";
import { i as d } from "./usePageTitle-BO3GGF3M.js";
import { t as f } from "./Button-Cw8Wl4QR.js";
import { t as p } from "./Skeleton-C3OpJbf1.js";
import { t as m } from "./EmptyState-CwWtkhEJ.js";
import { i as h } from "./episode-order-C2yqgMeX.js";
import { i as g, n as _ } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as v, computed as y, createBlock as b, createCommentVNode as x, createElementBlock as S, createElementVNode as C, createTextVNode as w, createVNode as T, defineComponent as E, inject as D, normalizeClass as O, onBeforeUnmount as ee, onMounted as te, openBlock as k, ref as A, renderList as j, toDisplayString as M, unref as N, watch as ne, withCtx as P, withModifiers as F } from "vue";
import { useRoute as re, useRouter as ie } from "vue-router";
//#region src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var I = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, L = ["open"], R = { class: "series-seasons__summary" }, z = { class: "series-seasons__season-label" }, B = { class: "series-seasons__season-count numeric" }, V = { class: "series-seasons__episodes" }, H = ["aria-label", "onClick"], U = ["aria-label", "onClick"], W = { class: "series-seasons__episode-title" }, G = {
	key: 0,
	class: "series-seasons__episode-meta numeric"
}, K = {
	key: 1,
	class: "series-seasons__episode-description"
}, ae = [
	"aria-label",
	"title",
	"onClick"
], q = {
	key: 1,
	class: "series-seasons__files-detail"
}, J = {
	key: 0,
	class: "series-seasons__files-loading"
}, oe = { class: "series-seasons__file-path" }, se = { class: "series-seasons__file-meta numeric" }, Y = {
	key: 2,
	class: "series-seasons__files-empty"
}, ce = /*#__PURE__*/ e(/* @__PURE__ */ E({
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
		let a = e, o = r, s = D("auth", { isAdmin: !1 }), c = A({}), l = A(/* @__PURE__ */ new Set());
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
		function b(e) {
			return !a.openFirstOnly || e === 0;
		}
		function E(e) {
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
		let O = y(() => s.isAdmin && !!a.apiBase);
		return (r, i) => (k(), S("section", I, [(k(!0), S(v, null, j(e.seasons, (e, r) => (k(), S("details", {
			key: e.key,
			class: "series-seasons__season",
			open: b(r)
		}, [C("summary", R, [
			T(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			C("span", z, M(e.label), 1),
			C("span", B, M(e.episodes.length) + " " + M(N(n)(e.episodes.length, "episode", "episodes")), 1)
		]), C("ul", V, [(k(!0), S(v, null, j(e.episodes, (e) => (k(), S("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			C("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${m(e)}`,
				onClick: (t) => o("play", e)
			}, [T(t, { name: "play" })], 8, H),
			C("button", {
				type: "button",
				class: "series-seasons__episode-main",
				"aria-label": `View ${m(e)}`,
				onClick: (t) => o("open", e)
			}, [
				C("span", W, M(m(e)), 1),
				g(e) || h(e) ? (k(), S("span", G, [
					g(e) ? (k(), S(v, { key: 0 }, [w(M(g(e)), 1)], 64)) : x("", !0),
					g(e) && h(e) ? (k(), S(v, { key: 1 }, [w(" · ")], 64)) : x("", !0),
					h(e) ? (k(), S(v, { key: 2 }, [w(M(h(e)), 1)], 64)) : x("", !0)
				])) : x("", !0),
				_(e) ? (k(), S("span", K, M(_(e)), 1)) : x("", !0)
			], 8, U),
			O.value ? (k(), S("button", {
				key: 0,
				type: "button",
				class: "series-seasons__files-btn",
				"aria-label": `Files info for ${m(e)}${d(e.id) ? " (expanded)" : ""}`,
				title: d(e.id) ? "Collapse files" : "Expand files",
				onClick: F((t) => p(e.id), ["stop"])
			}, [T(t, {
				name: d(e.id) ? "x" : "info",
				"aria-hidden": "true"
			}, null, 8, ["name"])], 8, ae)) : x("", !0),
			O.value && d(e.id) ? (k(), S("div", q, [u(e.id) === void 0 ? (k(), S("span", J, " Loading… ")) : u(e.id)?.length ? (k(!0), S(v, { key: 1 }, j(u(e.id), (e, t) => (k(), S("span", {
				key: t,
				class: "series-seasons__file-row"
			}, [C("span", oe, M(e.path), 1), C("span", se, [
				w(M(E(e.size_bytes)) + " ", 1),
				e.container ? (k(), S(v, { key: 0 }, [w(" · " + M(e.container), 1)], 64)) : x("", !0),
				e.resolution ? (k(), S(v, { key: 1 }, [w(" · " + M(e.resolution), 1)], 64)) : x("", !0)
			])]))), 128)) : (k(), S("span", Y, "No files"))])) : x("", !0)
		]))), 128))])], 8, L))), 128))]));
	}
}), [["__scopeId", "data-v-779b177a"]]), le = { class: "season-page" }, ue = {
	key: 0,
	class: "season-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading season"
}, de = { class: "season-page__header" }, fe = { class: "season-page__hero" }, pe = { class: "season-page__poster" }, me = ["src", "alt"], he = {
	key: 1,
	class: "season-page__fallback",
	"aria-hidden": "true"
}, ge = { class: "season-page__info" }, _e = { class: "season-page__series-name" }, ve = { class: "season-page__title" }, ye = { class: "season-page__count numeric" }, be = { class: "season-page__actions" }, xe = {
	key: 0,
	class: "season-page__overview"
}, Se = {
	class: "season-page__episodes",
	"aria-label": "Episodes"
}, X = /*#__PURE__*/ e(/* @__PURE__ */ E({
	__name: "SeasonPage",
	setup(e) {
		let i = o(), E = re(), D = ie(), { t: j } = r(), F = s(), I = c(), L = l(), R = A(null), z = A(null), B = A(!0), V = A(null), H = y(() => String(E.params.id ?? "")), U = y(() => String(E.params.season ?? ""));
		d(() => {
			if (R.value) return z.value ? `${R.value.name} · ${z.value.label}` : R.value.name;
		});
		let W = y(() => z.value ? [z.value] : []), G = null, K = !1;
		function ae(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function q() {
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
				let s = await g(r, i.value, e, t?.signal);
				if (n()) return;
				z.value = h(s, U.value), z.value?.seasonItem && L.hydrate(z.value.seasonItem), B.value = !1;
			} catch (e) {
				if (n() || ae(e)) return;
				V.value = e instanceof Error ? e.message : "Failed to load season", B.value = !1;
			}
		}
		te(q), ne([H, U], q), ee(() => {
			K = !0, G?.abort(), G = null;
		});
		function J(e, t) {
			D?.push({
				name: e,
				params: t
			}).catch(() => {});
		}
		function oe(e) {
			J("player", { id: e.id });
		}
		function se(e) {
			J("media", { id: e.id });
		}
		function Y() {
			H.value ? J("media", { id: H.value }) : D?.back();
		}
		let X = y(() => z.value?.seasonPoster ?? R.value?.poster_url ?? null), Ce = y(() => z.value?.seasonItem?.overview ?? null);
		function we() {
			if (!z.value) return;
			let e = _(z.value, F.resumeMap);
			e ? J("player", { id: e.id }) : I.info(j("season.noEpisodes"));
		}
		let Z = y(() => z.value?.seasonItem?.id ?? null), Q = y(() => Z.value ? L.isFavorite(Z.value) : !1), $ = y(() => Z.value ? L.isWatched(Z.value) : !1), Te = y(() => Z.value ? L.likeLevel(Z.value) : 0);
		function Ee() {
			Z.value && L.toggleFavorite(Z.value, i.value);
		}
		function De() {
			Z.value && L.toggleWatched(Z.value, i.value);
		}
		function Oe(e) {
			Z.value && L.setLike(Z.value, e, i.value);
		}
		return (e, r) => (k(), S("div", le, [B.value ? (k(), S("div", ue, [T(p, {
			variant: "text",
			width: "40%",
			height: "1.6rem"
		}), T(p, {
			variant: "text",
			lines: 3
		})])) : V.value ? (k(), b(m, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this season",
			description: V.value
		}, {
			actions: P(() => [T(f, {
				variant: "solid",
				onClick: q
			}, {
				default: P(() => [...r[0] ||= [w("Retry", -1)]]),
				_: 1
			}), T(f, {
				variant: "ghost",
				onClick: Y
			}, {
				default: P(() => [...r[1] ||= [w("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : R.value && z.value ? (k(), S(v, { key: 2 }, [C("header", de, [C("button", {
			type: "button",
			class: "season-page__back",
			onClick: Y
		}, [T(t, { name: "arrow-left" }), C("span", null, M(R.value.name), 1)]), C("div", fe, [C("div", pe, [X.value ? (k(), S("img", {
			key: 0,
			class: "season-page__img",
			src: X.value,
			alt: `${R.value.name} ${z.value.label}`,
			decoding: "async"
		}, null, 8, me)) : (k(), S("div", he, [T(t, { name: "tv" })]))]), C("div", ge, [
			C("p", _e, M(R.value.name), 1),
			C("h1", ve, M(z.value.label), 1),
			C("p", ye, M(z.value.episodes.length) + " " + M(N(n)(z.value.episodes.length, "episode", "episodes")), 1),
			C("div", be, [T(f, {
				variant: "solid",
				"left-icon": "play",
				onClick: we
			}, {
				default: P(() => [w(M(N(j)("season.play")), 1)]),
				_: 1
			}), Z.value ? (k(), S(v, { key: 0 }, [
				T(f, {
					variant: "ghost",
					class: O(["season-page__favorite", { "is-active": Q.value }]),
					"left-icon": Q.value ? "bookmark" : "bookmark-plus",
					"aria-label": Q.value ? N(j)("season.removeFavorite") : N(j)("season.addFavorite"),
					"aria-pressed": Q.value ? "true" : "false",
					onClick: Ee
				}, {
					default: P(() => [w(M(Q.value ? N(j)("season.inFavorites") : N(j)("season.watchlist")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				T(f, {
					variant: "ghost",
					class: O(["season-page__watched", { "is-active": $.value }]),
					"left-icon": $.value ? "eye" : "eye-off",
					"aria-label": $.value ? N(j)("season.markUnwatchedAria") : N(j)("season.markWatchedAria"),
					"aria-pressed": $.value ? "true" : "false",
					onClick: De
				}, {
					default: P(() => [w(M($.value ? N(j)("season.watched") : N(j)("season.markWatched")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				T(u, {
					level: Te.value,
					onCycle: Oe
				}, null, 8, ["level"])
			], 64)) : x("", !0)]),
			Ce.value ? (k(), S("p", xe, M(Ce.value), 1)) : x("", !0)
		])])]), C("section", Se, [z.value.episodes.length ? (k(), b(ce, {
			key: 0,
			seasons: W.value,
			"open-first-only": !1,
			"api-base": N(i),
			onPlay: oe,
			onOpen: se
		}, null, 8, ["seasons", "api-base"])) : (k(), b(m, {
			key: 1,
			icon: "tv",
			title: "No episodes yet",
			description: "This season has no episodes available to watch."
		}))])], 64)) : R.value ? (k(), b(m, {
			key: 3,
			icon: "tv",
			title: "Season not found",
			description: `${R.value.name} has no such season.`
		}, {
			actions: P(() => [T(f, {
				variant: "solid",
				onClick: Y
			}, {
				default: P(() => [...r[2] ||= [w("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : x("", !0)]));
	}
}), [["__scopeId", "data-v-06c56742"]]);
//#endregion
export { X as default };

//# sourceMappingURL=SeasonPage-DmuaYOOB.js.map