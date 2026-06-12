import { n as e, t } from "./Icon-ax5k7_G2.js";
import { n, t as r } from "./Button-BwQkyEkr.js";
import { i } from "./usePlayerStore-Cffo63UC.js";
import { i as a } from "./usePageTitle-BO3GGF3M.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { n as c } from "./MediaRow-CUlaxo3r.js";
import { t as l } from "./EmptyState-B2QnGIQT.js";
import { n as u } from "./media-query-BcVLE7J6.js";
import { t as d } from "./MediaDetail-iJTO83-S.js";
import { n as f, r as p, t as ee } from "./series-grouping-BvVFNXP8.js";
import { Fragment as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, inject as C, onBeforeUnmount as te, onMounted as ne, openBlock as w, ref as T, renderList as E, toDisplayString as D, watch as re, withCtx as O } from "vue";
import { useRoute as k, useRouter as A } from "vue-router";
//#region src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var j = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, M = ["open"], N = { class: "series-seasons__summary" }, P = { class: "series-seasons__season-label" }, F = { class: "series-seasons__season-count numeric" }, I = { class: "series-seasons__episodes" }, L = ["aria-label", "onClick"], R = ["onClick"], z = { class: "series-seasons__episode-title" }, B = {
	key: 0,
	class: "series-seasons__episode-overview"
}, V = {
	key: 0,
	class: "series-seasons__episode-runtime numeric"
}, H = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		return (n, r) => (w(), v("section", j, [(w(!0), v(m, null, E(e.seasons, (e, n) => (w(), v("details", {
			key: e.key,
			class: "series-seasons__season",
			open: s(n)
		}, [y("summary", N, [
			x(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			y("span", P, D(e.label), 1),
			y("span", F, D(e.episodes.length) + " " + D(e.episodes.length === 1 ? "episode" : "episodes"), 1)
		]), y("ul", I, [(w(!0), v(m, null, E(e.episodes, (e) => (w(), v("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			y("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${a(e)}`,
				onClick: (t) => i("play", e)
			}, [x(t, { name: "play" })], 8, L),
			y("button", {
				type: "button",
				class: "series-seasons__episode-main",
				onClick: (t) => i("play", e)
			}, [y("span", z, D(a(e)), 1), e.overview ? (w(), v("span", B, D(e.overview), 1)) : _("", !0)], 8, R),
			o(e) ? (w(), v("span", V, D(o(e)), 1)) : _("", !0)
		]))), 128))])], 8, M))), 128))]));
	}
}), [["__scopeId", "data-v-9f4cfae0"]]), U = { class: "media-detail-page" }, W = {
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
}, G = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MediaDetailPage",
	setup(e) {
		let t = C("apiBase", ""), S = h(() => typeof t == "string" ? t : t?.value ?? ""), E = k(), D = A(), j = i(), M = o(), N = T(null), P = T([]), F = T([]), I = T(!0), L = T(!1), R = T(!1), z = T(null), B = h(() => String(E.params.id ?? "")), V = h(() => j.resumePositionFor(B.value)), G = h(() => N.value?.type === "series");
		a(() => N.value?.name);
		let K = null, q = !1;
		function J(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ce(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				P.value = [];
				return;
			}
			let r = K, i = () => q || r !== K;
			L.value = !0;
			try {
				let a = u(S.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), o = await e.get(a, void 0, r?.signal);
				if (i()) return;
				P.value = (o.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (i() || J(e)) return;
				P.value = [];
			} finally {
				i() || (L.value = !1);
			}
		}
		async function Y(e, t, n) {
			let r = u(S.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function le(e, t) {
			let n = K, r = () => q || n !== K;
			R.value = !0, F.value = [];
			try {
				let i = await Y(e, t.id, n?.signal);
				if (r()) return;
				if (p(i)) {
					let t = i.filter((e) => e.type === "season"), a = await Promise.all(t.map((t) => Y(e, t.id, n?.signal).catch(() => [])));
					if (r()) return;
					i = [...i.filter((e) => e.type !== "season"), ...a.flat()];
				}
				F.value = f(i);
			} catch (e) {
				if (r() || J(e)) return;
				F.value = [];
			} finally {
				r() || (R.value = !1);
			}
		}
		async function X() {
			let e = B.value;
			if (K?.abort(), K = typeof AbortController < "u" ? new AbortController() : null, I.value = !0, z.value = null, P.value = [], F.value = [], !e) {
				z.value = "No media id provided", I.value = !1;
				return;
			}
			try {
				let t = new n({ baseUrl: S.value }), r = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, K?.signal);
				if (q) return;
				let i = r.item;
				N.value = i, I.value = !1, i.type === "series" ? le(t, i) : ce(t, i);
			} catch (e) {
				if (q || J(e)) return;
				z.value = e instanceof Error ? e.message : "Failed to load title", I.value = !1;
			}
		}
		ne(X), re(B, X), te(() => {
			q = !0, K?.abort(), K = null;
		});
		function Z(e, t) {
			D?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function Q(e) {
			if (e.type === "series") {
				let e = ee(F.value);
				e ? Z("player", e.id) : M.info("No episodes to play yet");
				return;
			}
			Z("player", e.id);
		}
		function ue(e) {
			Z("player", e.id);
		}
		function de(e) {
			M.success(`Added "${e.name}" to your list`);
		}
		function fe(e) {
			Z("media", e.id);
		}
		function $() {
			D?.back();
		}
		return (e, t) => (w(), v("div", U, [I.value ? (w(), v("div", W, [y("div", ie, [x(s, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), y("div", ae, [
			x(s, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			x(s, {
				variant: "text",
				lines: 4
			}),
			x(s, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : z.value ? (w(), g(l, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: z.value
		}, {
			actions: O(() => [x(r, {
				variant: "solid",
				onClick: X
			}, {
				default: O(() => [...t[0] ||= [b("Retry", -1)]]),
				_: 1
			}), x(r, {
				variant: "ghost",
				onClick: $
			}, {
				default: O(() => [...t[1] ||= [b("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : N.value ? (w(), v(m, { key: 2 }, [x(d, {
			item: N.value,
			"resume-seconds": V.value,
			similar: P.value,
			"similar-loading": L.value,
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
		]), G.value ? (w(), v("section", oe, [t[2] ||= y("h2", { class: "media-detail-page__seasons-title" }, "Episodes", -1), R.value ? (w(), v("div", se, [x(c, { label: "Loading episodes" })])) : F.value.length ? (w(), g(H, {
			key: 1,
			seasons: F.value,
			onPlay: ue
		}, null, 8, ["seasons"])) : (w(), g(l, {
			key: 2,
			icon: "tv",
			title: "No episodes yet",
			description: "This series has no episodes available to watch."
		}))])) : _("", !0)], 64)) : _("", !0)]));
	}
}), [["__scopeId", "data-v-d2bcecc4"]]);
//#endregion
export { G as default };

//# sourceMappingURL=MediaDetailPage-Iv75sFWG.js.map