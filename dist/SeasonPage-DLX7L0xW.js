import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./useMessages-CMPz9FmM.js";
import { r, t as i } from "./client-D80As4Gx.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { i as o } from "./usePlayerStore-Dgw0JCWb.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { n as c, t as l } from "./ThumbRating-CtGvXtns.js";
import { i as u } from "./usePageTitle-BO3GGF3M.js";
import { t as d } from "./Button-DWa6Ld_Z.js";
import { t as f } from "./Skeleton-DhQmxeNg.js";
import { t as p } from "./EmptyState-ZlI5t4KT.js";
import { i as m } from "./episode-order-C2yqgMeX.js";
import { i as h, n as g } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as _, computed as v, createBlock as y, createCommentVNode as b, createElementBlock as x, createElementVNode as S, createTextVNode as C, createVNode as w, defineComponent as T, inject as E, normalizeClass as D, onBeforeUnmount as ee, onMounted as te, openBlock as O, ref as k, renderList as A, toDisplayString as j, unref as M, watch as ne, withCtx as N, withModifiers as re } from "vue";
import { useRoute as ie, useRouter as ae } from "vue-router";
//#region src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var P = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, F = ["open"], I = { class: "series-seasons__summary" }, L = { class: "series-seasons__season-label" }, R = { class: "series-seasons__season-count numeric" }, z = { class: "series-seasons__episodes" }, B = ["aria-label", "onClick"], V = ["aria-label", "onClick"], oe = { class: "series-seasons__episode-title" }, H = {
	key: 0,
	class: "series-seasons__episode-meta numeric"
}, U = {
	key: 1,
	class: "series-seasons__episode-description"
}, W = [
	"aria-label",
	"title",
	"onClick"
], G = {
	key: 1,
	class: "series-seasons__files-detail"
}, K = {
	key: 0,
	class: "series-seasons__files-loading"
}, q = { class: "series-seasons__file-path" }, J = { class: "series-seasons__file-meta numeric" }, Y = {
	key: 2,
	class: "series-seasons__files-empty"
}, se = /*#__PURE__*/ e(/* @__PURE__ */ T({
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
	setup(e, { emit: n }) {
		let i = e, a = n, o = E("auth", { isAdmin: !1 }), s = k({}), c = k(/* @__PURE__ */ new Set());
		function l(e) {
			return s.value[e];
		}
		function u(e) {
			return c.value.has(e);
		}
		async function d(e) {
			if (s.value[e] === void 0) try {
				let t = await r.get(`${i.apiBase}/api/v1/media/${encodeURIComponent(e)}`);
				s.value[e] = t.files ?? [];
			} catch {
				s.value[e] = [];
			}
		}
		function f(e) {
			u(e) ? c.value.delete(e) : (c.value.add(e), d(e));
		}
		function p(e) {
			let t = e.episode_title || e.name;
			return typeof e.episode_number == "number" ? `${e.episode_number}. ${t}` : t;
		}
		function m(e) {
			return e.runtime ? `${e.runtime}m` : null;
		}
		function h(e) {
			let t = e.air_date;
			if (!t) return null;
			let n = Date.parse(t);
			return Number.isNaN(n) ? t : new Date(n).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function g(e) {
			let t = e.overview?.trim();
			return t ? t.split(/\n\s*\n/)[0]?.trim() || t : null;
		}
		function y(e) {
			return !i.openFirstOnly || e === 0;
		}
		function T(e) {
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
		let D = v(() => o.isAdmin && !!i.apiBase);
		return (n, r) => (O(), x("section", P, [(O(!0), x(_, null, A(e.seasons, (e, n) => (O(), x("details", {
			key: e.key,
			class: "series-seasons__season",
			open: y(n)
		}, [S("summary", I, [
			w(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			S("span", L, j(e.label), 1),
			S("span", R, j(e.episodes.length) + " " + j(e.episodes.length === 1 ? "episode" : "episodes"), 1)
		]), S("ul", z, [(O(!0), x(_, null, A(e.episodes, (e) => (O(), x("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			S("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${p(e)}`,
				onClick: (t) => a("play", e)
			}, [w(t, { name: "play" })], 8, B),
			S("button", {
				type: "button",
				class: "series-seasons__episode-main",
				"aria-label": `View ${p(e)}`,
				onClick: (t) => a("open", e)
			}, [
				S("span", oe, j(p(e)), 1),
				h(e) || m(e) ? (O(), x("span", H, [
					h(e) ? (O(), x(_, { key: 0 }, [C(j(h(e)), 1)], 64)) : b("", !0),
					h(e) && m(e) ? (O(), x(_, { key: 1 }, [C(" · ")], 64)) : b("", !0),
					m(e) ? (O(), x(_, { key: 2 }, [C(j(m(e)), 1)], 64)) : b("", !0)
				])) : b("", !0),
				g(e) ? (O(), x("span", U, j(g(e)), 1)) : b("", !0)
			], 8, V),
			D.value ? (O(), x("button", {
				key: 0,
				type: "button",
				class: "series-seasons__files-btn",
				"aria-label": `Files info for ${p(e)}${u(e.id) ? " (expanded)" : ""}`,
				title: u(e.id) ? "Collapse files" : "Expand files",
				onClick: re((t) => f(e.id), ["stop"])
			}, [w(t, {
				name: u(e.id) ? "x" : "info",
				"aria-hidden": "true"
			}, null, 8, ["name"])], 8, W)) : b("", !0),
			D.value && u(e.id) ? (O(), x("div", G, [l(e.id) === void 0 ? (O(), x("span", K, " Loading… ")) : l(e.id)?.length ? (O(!0), x(_, { key: 1 }, A(l(e.id), (e, t) => (O(), x("span", {
				key: t,
				class: "series-seasons__file-row"
			}, [S("span", q, j(e.path), 1), S("span", J, [
				C(j(T(e.size_bytes)) + " ", 1),
				e.container ? (O(), x(_, { key: 0 }, [C(" · " + j(e.container), 1)], 64)) : b("", !0),
				e.resolution ? (O(), x(_, { key: 1 }, [C(" · " + j(e.resolution), 1)], 64)) : b("", !0)
			])]))), 128)) : (O(), x("span", Y, "No files"))])) : b("", !0)
		]))), 128))])], 8, F))), 128))]));
	}
}), [["__scopeId", "data-v-1b54aeb2"]]), ce = { class: "season-page" }, le = {
	key: 0,
	class: "season-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading season"
}, ue = { class: "season-page__header" }, de = { class: "season-page__hero" }, fe = { class: "season-page__poster" }, pe = ["src", "alt"], me = {
	key: 1,
	class: "season-page__fallback",
	"aria-hidden": "true"
}, he = { class: "season-page__info" }, ge = { class: "season-page__series-name" }, _e = { class: "season-page__title" }, ve = { class: "season-page__count numeric" }, ye = { class: "season-page__actions" }, be = {
	key: 0,
	class: "season-page__overview"
}, xe = {
	class: "season-page__episodes",
	"aria-label": "Episodes"
}, X = /*#__PURE__*/ e(/* @__PURE__ */ T({
	__name: "SeasonPage",
	setup(e) {
		let r = a(), T = ie(), E = ae(), { t: A } = n(), re = o(), P = s(), F = c(), I = k(null), L = k(null), R = k(!0), z = k(null), B = v(() => String(T.params.id ?? "")), V = v(() => String(T.params.season ?? ""));
		u(() => {
			if (I.value) return L.value ? `${I.value.name} · ${L.value.label}` : I.value.name;
		});
		let oe = v(() => L.value ? [L.value] : []), H = null, U = !1;
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function G() {
			let e = B.value;
			H?.abort(), H = typeof AbortController < "u" ? new AbortController() : null;
			let t = H, n = () => U || t !== H;
			if (R.value = !0, z.value = null, I.value = null, L.value = null, !e) {
				z.value = "No series id provided", R.value = !1;
				return;
			}
			try {
				let a = new i({ baseUrl: r.value }), o = await a.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t?.signal);
				if (n()) return;
				I.value = o.item;
				let s = await h(a, r.value, e, t?.signal);
				if (n()) return;
				L.value = m(s, V.value), L.value?.seasonItem && F.hydrate(L.value.seasonItem), R.value = !1;
			} catch (e) {
				if (n() || W(e)) return;
				z.value = e instanceof Error ? e.message : "Failed to load season", R.value = !1;
			}
		}
		te(G), ne([B, V], G), ee(() => {
			U = !0, H?.abort(), H = null;
		});
		function K(e, t) {
			E?.push({
				name: e,
				params: t
			}).catch(() => {});
		}
		function q(e) {
			K("player", { id: e.id });
		}
		function J(e) {
			K("media", { id: e.id });
		}
		function Y() {
			B.value ? K("media", { id: B.value }) : E?.back();
		}
		let X = v(() => L.value?.seasonPoster ?? I.value?.poster_url ?? null), Se = v(() => L.value?.seasonItem?.overview ?? null);
		function Ce() {
			if (!L.value) return;
			let e = g(L.value, re.resumeMap);
			e ? K("player", { id: e.id }) : P.info(A("season.noEpisodes"));
		}
		let Z = v(() => L.value?.seasonItem?.id ?? null), Q = v(() => Z.value ? F.isFavorite(Z.value) : !1), $ = v(() => Z.value ? F.isWatched(Z.value) : !1), we = v(() => Z.value ? F.likeLevel(Z.value) : 0);
		function Te() {
			Z.value && F.toggleFavorite(Z.value, r.value);
		}
		function Ee() {
			Z.value && F.toggleWatched(Z.value, r.value);
		}
		function De(e) {
			Z.value && F.setLike(Z.value, e, r.value);
		}
		return (e, n) => (O(), x("div", ce, [R.value ? (O(), x("div", le, [w(f, {
			variant: "text",
			width: "40%",
			height: "1.6rem"
		}), w(f, {
			variant: "text",
			lines: 3
		})])) : z.value ? (O(), y(p, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this season",
			description: z.value
		}, {
			actions: N(() => [w(d, {
				variant: "solid",
				onClick: G
			}, {
				default: N(() => [...n[0] ||= [C("Retry", -1)]]),
				_: 1
			}), w(d, {
				variant: "ghost",
				onClick: Y
			}, {
				default: N(() => [...n[1] ||= [C("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : I.value && L.value ? (O(), x(_, { key: 2 }, [S("header", ue, [S("button", {
			type: "button",
			class: "season-page__back",
			onClick: Y
		}, [w(t, { name: "arrow-left" }), S("span", null, j(I.value.name), 1)]), S("div", de, [S("div", fe, [X.value ? (O(), x("img", {
			key: 0,
			class: "season-page__img",
			src: X.value,
			alt: `${I.value.name} ${L.value.label}`,
			decoding: "async"
		}, null, 8, pe)) : (O(), x("div", me, [w(t, { name: "tv" })]))]), S("div", he, [
			S("p", ge, j(I.value.name), 1),
			S("h1", _e, j(L.value.label), 1),
			S("p", ve, j(L.value.episodes.length) + " " + j(L.value.episodes.length === 1 ? "episode" : "episodes"), 1),
			S("div", ye, [w(d, {
				variant: "solid",
				"left-icon": "play",
				onClick: Ce
			}, {
				default: N(() => [C(j(M(A)("season.play")), 1)]),
				_: 1
			}), Z.value ? (O(), x(_, { key: 0 }, [
				w(d, {
					variant: "ghost",
					class: D(["season-page__favorite", { "is-active": Q.value }]),
					"left-icon": Q.value ? "bookmark" : "bookmark-plus",
					"aria-label": Q.value ? M(A)("season.removeFavorite") : M(A)("season.addFavorite"),
					"aria-pressed": Q.value ? "true" : "false",
					onClick: Te
				}, {
					default: N(() => [C(j(Q.value ? M(A)("season.inFavorites") : M(A)("season.watchlist")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				w(d, {
					variant: "ghost",
					class: D(["season-page__watched", { "is-active": $.value }]),
					"left-icon": $.value ? "eye" : "eye-off",
					"aria-label": $.value ? M(A)("season.markUnwatchedAria") : M(A)("season.markWatchedAria"),
					"aria-pressed": $.value ? "true" : "false",
					onClick: Ee
				}, {
					default: N(() => [C(j($.value ? M(A)("season.watched") : M(A)("season.markWatched")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				w(l, {
					level: we.value,
					onCycle: De
				}, null, 8, ["level"])
			], 64)) : b("", !0)]),
			Se.value ? (O(), x("p", be, j(Se.value), 1)) : b("", !0)
		])])]), S("section", xe, [L.value.episodes.length ? (O(), y(se, {
			key: 0,
			seasons: oe.value,
			"open-first-only": !1,
			"api-base": M(r),
			onPlay: q,
			onOpen: J
		}, null, 8, ["seasons", "api-base"])) : (O(), y(p, {
			key: 1,
			icon: "tv",
			title: "No episodes yet",
			description: "This season has no episodes available to watch."
		}))])], 64)) : I.value ? (O(), y(p, {
			key: 3,
			icon: "tv",
			title: "Season not found",
			description: `${I.value.name} has no such season.`
		}, {
			actions: N(() => [w(d, {
				variant: "solid",
				onClick: Y
			}, {
				default: N(() => [...n[2] ||= [C("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : b("", !0)]));
	}
}), [["__scopeId", "data-v-99283b2d"]]);
//#endregion
export { X as default };

//# sourceMappingURL=SeasonPage-DLX7L0xW.js.map