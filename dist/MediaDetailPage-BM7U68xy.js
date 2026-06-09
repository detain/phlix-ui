import { n as e, t } from "./Icon-ax5k7_G2.js";
import { n, t as r } from "./Button-BwQkyEkr.js";
import { i } from "./usePlayerStore-Cffo63UC.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Skeleton-DkSoWF3C.js";
import { n as s } from "./MediaRow-OSm7NmIO.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { n as l } from "./media-query-BcVLE7J6.js";
import { t as u } from "./MediaDetail-DdZO-X5Q.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onBeforeUnmount as x, onMounted as ee, openBlock as S, ref as C, renderList as w, toDisplayString as T, watch as E, withCtx as D } from "vue";
import { useRoute as O, useRouter as k } from "vue-router";
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
}, V = /*#__PURE__*/ e(/* @__PURE__ */ y({
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
		return (n, r) => (S(), h("section", A, [(S(!0), h(d, null, w(e.seasons, (e, n) => (S(), h("details", {
			key: e.key,
			class: "series-seasons__season",
			open: s(n)
		}, [g("summary", M, [
			v(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			g("span", N, T(e.label), 1),
			g("span", P, T(e.episodes.length) + " " + T(e.episodes.length === 1 ? "episode" : "episodes"), 1)
		]), g("ul", F, [(S(!0), h(d, null, w(e.episodes, (e) => (S(), h("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			g("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${a(e)}`,
				onClick: (t) => i("play", e)
			}, [v(t, { name: "play" })], 8, I),
			g("button", {
				type: "button",
				class: "series-seasons__episode-main",
				onClick: (t) => i("play", e)
			}, [g("span", R, T(a(e)), 1), e.overview ? (S(), h("span", z, T(e.overview), 1)) : m("", !0)], 8, L),
			o(e) ? (S(), h("span", B, T(o(e)), 1)) : m("", !0)
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
function te(e) {
	for (let t of e) if (t.episodes.length) return t.episodes[0];
	return null;
}
//#endregion
//#region src/pages/MediaDetailPage.vue?vue&type=script&setup=true&lang.ts
var ne = { class: "media-detail-page" }, re = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, ie = { class: "media-detail-page__loading-hero" }, ae = { class: "media-detail-page__loading-info" }, oe = {
	key: 0,
	class: "media-detail-page__seasons",
	"aria-label": "Episodes"
}, se = {
	key: 0,
	class: "media-detail-page__seasons-loading",
	role: "status",
	"aria-busy": "true"
}, J = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "MediaDetailPage",
	setup(e) {
		let t = b("apiBase", ""), y = f(() => typeof t == "string" ? t : t?.value ?? ""), w = O(), T = k(), A = i(), j = a(), M = C(null), N = C([]), P = C([]), F = C(!0), I = C(!1), L = C(!1), R = C(null), z = f(() => String(w.params.id ?? "")), B = f(() => A.resumePositionFor(z.value)), H = f(() => M.value?.type === "series"), U = null, W = !1;
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
				let a = l(y.value, {
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
			let r = l(y.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function ce(e, t) {
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
				let t = new n({ baseUrl: y.value }), r = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, U?.signal);
				if (W) return;
				let i = r.item;
				M.value = i, F.value = !1, i.type === "series" ? ce(t, i) : J(t, i);
			} catch (e) {
				if (W || G(e)) return;
				R.value = e instanceof Error ? e.message : "Failed to load title", F.value = !1;
			}
		}
		ee(X), E(z, X), x(() => {
			W = !0, U?.abort(), U = null;
		});
		function Z(e, t) {
			T?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function Q(e) {
			if (e.type === "series") {
				let e = te(P.value);
				e ? Z("player", e.id) : j.info("No episodes to play yet");
				return;
			}
			Z("player", e.id);
		}
		function le(e) {
			Z("player", e.id);
		}
		function ue(e) {
			j.success(`Added "${e.name}" to your list`);
		}
		function de(e) {
			Z("media", e.id);
		}
		function $() {
			T?.back();
		}
		return (e, t) => (S(), h("div", ne, [F.value ? (S(), h("div", re, [g("div", ie, [v(o, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), g("div", ae, [
			v(o, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			v(o, {
				variant: "text",
				lines: 4
			}),
			v(o, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : R.value ? (S(), p(c, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: R.value
		}, {
			actions: D(() => [v(r, {
				variant: "solid",
				onClick: X
			}, {
				default: D(() => [...t[0] ||= [_("Retry", -1)]]),
				_: 1
			}), v(r, {
				variant: "ghost",
				onClick: $
			}, {
				default: D(() => [...t[1] ||= [_("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : M.value ? (S(), h(d, { key: 2 }, [v(u, {
			item: M.value,
			"resume-seconds": B.value,
			similar: N.value,
			"similar-loading": I.value,
			onPlay: Q,
			onResume: Q,
			onWatchlist: ue,
			onInfo: de,
			onBack: $
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		]), H.value ? (S(), h("section", oe, [t[2] ||= g("h2", { class: "media-detail-page__seasons-title" }, "Episodes", -1), L.value ? (S(), h("div", se, [v(s, { label: "Loading episodes" })])) : P.value.length ? (S(), p(V, {
			key: 1,
			seasons: P.value,
			onPlay: le
		}, null, 8, ["seasons"])) : (S(), p(c, {
			key: 2,
			icon: "tv",
			title: "No episodes yet",
			description: "This series has no episodes available to watch."
		}))])) : m("", !0)], 64)) : m("", !0)]));
	}
}), [["__scopeId", "data-v-5ceb62bc"]]);
//#endregion
export { J as default };

//# sourceMappingURL=MediaDetailPage-BM7U68xy.js.map