import { n as e, t } from "./Icon-ax5k7_G2.js";
import { n, t as r } from "./Button-BwQkyEkr.js";
import { i } from "./usePlayerStore-Cffo63UC.js";
import { i as a } from "./usePageTitle-BO3GGF3M.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { n as c } from "./MediaRow-OSm7NmIO.js";
import { t as l } from "./EmptyState-B2QnGIQT.js";
import { n as u } from "./media-query-BcVLE7J6.js";
import { t as d } from "./MediaDetail-DdZO-X5Q.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, onBeforeUnmount as S, onMounted as C, openBlock as w, ref as T, renderList as E, toDisplayString as D, watch as O, withCtx as k } from "vue";
import { useRoute as ee, useRouter as te } from "vue-router";
//#region src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var A = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, j = ["open"], M = { class: "series-seasons__summary" }, N = { class: "series-seasons__season-label" }, P = { class: "series-seasons__season-count numeric" }, F = { class: "series-seasons__episodes" }, I = ["aria-label", "onClick"], L = ["onClick"], R = { class: "series-seasons__episode-title" }, z = {
	key: 0,
	class: "series-seasons__episode-overview"
}, B = {
	key: 0,
	class: "series-seasons__episode-runtime numeric"
}, V = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "SeriesSeasons",
	props: {
		seasons: {},
		openFirstOnly: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["play"],
	setup(e, { emit: n }) {
		let r = e, i = n;
		function a(e) {
			let t = e.episode_title || e.name;
			return typeof e.episode_number == "number" ? `${e.episode_number}. ${t}` : t;
		}
		function o(e) {
			return e.runtime ? `${e.runtime}m` : null;
		}
		function s(e) {
			return r.openFirstOnly ? e === 0 : !0;
		}
		return (n, r) => (w(), g("section", A, [(w(!0), g(f, null, E(e.seasons, (e, n) => (w(), g("details", {
			key: e.key,
			class: "series-seasons__season",
			open: s(n)
		}, [_("summary", M, [
			y(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			_("span", N, D(e.label), 1),
			_("span", P, D(e.episodes.length) + " " + D(e.episodes.length === 1 ? "episode" : "episodes"), 1)
		]), _("ul", F, [(w(!0), g(f, null, E(e.episodes, (e) => (w(), g("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			_("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${a(e)}`,
				onClick: (t) => i("play", e)
			}, [y(t, { name: "play" })], 8, I),
			_("button", {
				type: "button",
				class: "series-seasons__episode-main",
				onClick: (t) => i("play", e)
			}, [_("span", R, D(a(e)), 1), e.overview ? (w(), g("span", z, D(e.overview), 1)) : h("", !0)], 8, L),
			o(e) ? (w(), g("span", B, D(o(e)), 1)) : h("", !0)
		]))), 128))])], 8, j))), 128))]));
	}
}), [["__scopeId", "data-v-9f4cfae0"]]);
//#endregion
//#region src/components/series-grouping.ts
function H(e) {
	return e.type === "series" || e.type === "season";
}
function U(e) {
	return e.filter((e) => !H(e) && (e.type === "episode" || (e.episode_number ?? null) !== null));
}
function W(e) {
	let t = e.season_number;
	return typeof t == "number" && t > 0 ? t : null;
}
function G(e, t) {
	let n = typeof e.episode_number == "number" ? e.episode_number : Infinity, r = typeof t.episode_number == "number" ? t.episode_number : Infinity;
	return n === r ? (e.episode_title ?? e.name).localeCompare(t.episode_title ?? t.name) : n - r;
}
function K(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of U(e)) {
		let e = W(n), r = t.get(e);
		r ? r.push(n) : t.set(e, [n]);
	}
	let n = [];
	return t.forEach((e, t) => {
		e.sort(G), n.push({
			key: t === null ? "specials" : `season-${t}`,
			seasonNumber: t,
			label: t === null ? "Specials" : `Season ${t}`,
			isSpecials: t === null,
			episodes: e
		});
	}), n.sort((e, t) => e.seasonNumber === null ? 1 : t.seasonNumber === null ? -1 : e.seasonNumber - t.seasonNumber), n;
}
function q(e) {
	return e.some((e) => e.type === "season");
}
function ne(e) {
	for (let t of e) if (t.episodes.length) return t.episodes[0];
	return null;
}
//#endregion
//#region src/pages/MediaDetailPage.vue?vue&type=script&setup=true&lang.ts
var re = { class: "media-detail-page" }, ie = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, ae = { class: "media-detail-page__loading-hero" }, oe = { class: "media-detail-page__loading-info" }, se = {
	key: 0,
	class: "media-detail-page__seasons",
	"aria-label": "Episodes"
}, ce = {
	key: 0,
	class: "media-detail-page__seasons-loading",
	role: "status",
	"aria-busy": "true"
}, J = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "MediaDetailPage",
	setup(e) {
		let t = x("apiBase", ""), b = p(() => typeof t == "string" ? t : t?.value ?? ""), E = ee(), D = te(), A = i(), j = o(), M = T(null), N = T([]), P = T([]), F = T(!0), I = T(!1), L = T(!1), R = T(null), z = p(() => String(E.params.id ?? "")), B = p(() => A.resumePositionFor(z.value)), H = p(() => M.value?.type === "series");
		a(() => M.value?.name);
		let U = null, W = !1;
		function G(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function J(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				N.value = [];
				return;
			}
			let r = U, i = () => W || r !== U;
			I.value = !0;
			try {
				let a = u(b.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), o = await e.get(a, void 0, r?.signal);
				if (i()) return;
				N.value = (o.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (i() || G(e)) return;
				N.value = [];
			} finally {
				i() || (I.value = !1);
			}
		}
		async function Y(e, t, n) {
			let r = u(b.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function le(e, t) {
			let n = U, r = () => W || n !== U;
			L.value = !0, P.value = [];
			try {
				let i = await Y(e, t.id, n?.signal);
				if (r()) return;
				if (q(i)) {
					let t = i.filter((e) => e.type === "season"), a = await Promise.all(t.map((t) => Y(e, t.id, n?.signal).catch(() => [])));
					if (r()) return;
					i = [...i.filter((e) => e.type !== "season"), ...a.flat()];
				}
				P.value = K(i);
			} catch (e) {
				if (r() || G(e)) return;
				P.value = [];
			} finally {
				r() || (L.value = !1);
			}
		}
		async function X() {
			let e = z.value;
			if (U?.abort(), U = typeof AbortController < "u" ? new AbortController() : null, F.value = !0, R.value = null, N.value = [], P.value = [], !e) {
				R.value = "No media id provided", F.value = !1;
				return;
			}
			try {
				let t = new n({ baseUrl: b.value }), r = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, U?.signal);
				if (W) return;
				let i = r.item;
				M.value = i, F.value = !1, i.type === "series" ? le(t, i) : J(t, i);
			} catch (e) {
				if (W || G(e)) return;
				R.value = e instanceof Error ? e.message : "Failed to load title", F.value = !1;
			}
		}
		C(X), O(z, X), S(() => {
			W = !0, U?.abort(), U = null;
		});
		function Z(e, t) {
			D?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function Q(e) {
			if (e.type === "series") {
				let e = ne(P.value);
				e ? Z("player", e.id) : j.info("No episodes to play yet");
				return;
			}
			Z("player", e.id);
		}
		function ue(e) {
			Z("player", e.id);
		}
		function de(e) {
			j.success(`Added "${e.name}" to your list`);
		}
		function fe(e) {
			Z("media", e.id);
		}
		function $() {
			D?.back();
		}
		return (e, t) => (w(), g("div", re, [F.value ? (w(), g("div", ie, [_("div", ae, [y(s, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), _("div", oe, [
			y(s, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			y(s, {
				variant: "text",
				lines: 4
			}),
			y(s, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : R.value ? (w(), m(l, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: R.value
		}, {
			actions: k(() => [y(r, {
				variant: "solid",
				onClick: X
			}, {
				default: k(() => [...t[0] ||= [v("Retry", -1)]]),
				_: 1
			}), y(r, {
				variant: "ghost",
				onClick: $
			}, {
				default: k(() => [...t[1] ||= [v("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : M.value ? (w(), g(f, { key: 2 }, [y(d, {
			item: M.value,
			"resume-seconds": B.value,
			similar: N.value,
			"similar-loading": I.value,
			onPlay: Q,
			onResume: Q,
			onWatchlist: de,
			onInfo: fe,
			onBack: $
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		]), H.value ? (w(), g("section", se, [t[2] ||= _("h2", { class: "media-detail-page__seasons-title" }, "Episodes", -1), L.value ? (w(), g("div", ce, [y(c, { label: "Loading episodes" })])) : P.value.length ? (w(), m(V, {
			key: 1,
			seasons: P.value,
			onPlay: ue
		}, null, 8, ["seasons"])) : (w(), m(l, {
			key: 2,
			icon: "tv",
			title: "No episodes yet",
			description: "This series has no episodes available to watch."
		}))])) : h("", !0)], 64)) : h("", !0)]));
	}
}), [["__scopeId", "data-v-d2bcecc4"]]);
//#endregion
export { J as default };

//# sourceMappingURL=MediaDetailPage-C2n7z2Sv.js.map