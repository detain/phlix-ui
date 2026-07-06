import { n as e } from "./Icon-24ngwBUH.js";
import { t } from "./client-fw74f3l_.js";
import { n, r } from "./useApiBase-CV_r-Kk4.js";
import { n as i, o as a } from "./ThumbRating-CEhvLFWq.js";
import { i as o } from "./usePageTitle-BO3GGF3M.js";
import { t as s } from "./Button-CInT03Lp.js";
import { t as c } from "./Skeleton-BUq2D39t.js";
import { t as l } from "./EmptyState-0XgHKEGf.js";
import { n as u } from "./media-query-C8oxSF4h.js";
import { t as ee } from "./Player-Dy4-tSJa.js";
import { r as te } from "./series-grouping-Bbs1zX87.js";
import { n as ne, r as d, t as f } from "./episode-order-BMC9lH44.js";
import { computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as re, createTextVNode as _, createVNode as v, defineComponent as y, normalizeClass as b, normalizeStyle as x, onBeforeUnmount as S, onMounted as C, openBlock as w, ref as T, unref as E, watch as D, withCtx as O } from "vue";
import { onBeforeRouteLeave as ie, useRoute as ae, useRouter as oe } from "vue-router";
//#region src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var se = { class: "player-page__stage" }, ce = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, k = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "PlayerPage",
	setup(e) {
		let y = /* @__PURE__ */ new Map(), k = n(), le = r(), ue = ae(), A = oe(), j = a(), de = i(), M = T(null), N = T(""), P = T([]), F = T(null), I = T(null), L = T(!0), R = T(null), z = T(!1), B = T(null), V = T(null), H = p(() => String(ue.params.id ?? ""));
		o(() => M.value?.name);
		let U = p(() => {
			let e = M.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), W = null, G = !1;
		function K(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function q(e) {
			let t = le.value || k.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function J(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function fe(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				j.setQueue([]);
				return;
			}
			let r = W, i = () => G || r !== W;
			try {
				let a = u(k.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), o = await e.get(a, void 0, r?.signal);
				if (i()) return;
				j.setQueue((o.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || K(e)) return;
				j.setQueue([]);
			}
		}
		async function Y(e, t, n) {
			let r = u(k.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function pe(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function X(e, t) {
			B.value = d(e, t), V.value = f(e, t);
		}
		function me(e) {
			for (let t of y.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function he(e, t) {
			if (B.value = null, V.value = null, !(t.type === "episode" || (t.episode_number ?? null) !== null)) return;
			let n = me(t.id);
			if (n) {
				X(n, t.id);
				return;
			}
			let r = W, i = () => G || r !== W;
			try {
				let n = await pe(e, t, r?.signal);
				if (i()) return;
				let a = await Y(e, n.id, r?.signal);
				if (i()) return;
				if (te(a)) {
					let t = a.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => Y(e, t.id, r?.signal).catch(() => [])));
					if (i()) return;
					a = [...a.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let o = ne(a);
				o.length && y.set(n.id, o), X(o, t.id);
			} catch (e) {
				if (i() || K(e)) return;
				B.value = null, V.value = null;
			}
		}
		async function Z() {
			let e = H.value;
			if (W?.abort(), W = typeof AbortController < "u" ? new AbortController() : null, L.value = !0, R.value = null, P.value = [], F.value = null, I.value = null, B.value = null, V.value = null, j.hideMiniPlayer(), !e) {
				R.value = "No media id provided", L.value = !1;
				return;
			}
			try {
				let n = new t({ baseUrl: k.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, W?.signal);
				if (G) return;
				let i = r.item;
				M.value = i, i && de.hydrate(i), N.value = q(i);
				let a = await n.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, W?.signal).catch(() => null);
				if (G) return;
				P.value = (a?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					title: e.title ?? void 0
				})), F.value = J(a?.intro_marker), I.value = J(a?.outro_marker), L.value = !1, fe(n, i), he(n, i);
			} catch (e) {
				if (G || K(e)) return;
				R.value = e instanceof Error ? e.message : "Failed to load media", L.value = !1;
			}
		}
		C(Z), D(H, Z), ie(() => {
			j.current && j.streamUrl && j.showMiniPlayer();
		}), S(() => {
			G = !0, W?.abort(), W = null;
		});
		function Q() {
			A?.back();
		}
		function ge(e) {
			A?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function $(e) {
			A?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function _e(e) {
			z.value = e;
		}
		return (e, t) => (w(), g("div", { class: b(["player-page", { "is-theater": z.value }]) }, [U.value && !L.value && !R.value ? (w(), g("div", {
			key: 0,
			class: "player-page__ambient",
			style: x(U.value),
			"aria-hidden": "true"
		}, null, 4)) : h("", !0), re("div", se, [L.value ? (w(), g("div", ce, [v(c, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : R.value ? (w(), m(l, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: R.value
		}, {
			actions: O(() => [v(s, {
				variant: "solid",
				onClick: Z
			}, {
				default: O(() => [...t[0] ||= [_("Retry", -1)]]),
				_: 1
			}), v(s, {
				variant: "ghost",
				onClick: Q
			}, {
				default: O(() => [...t[1] ||= [_("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : M.value ? (w(), m(ee, {
			key: 2,
			media: M.value,
			"stream-url": N.value,
			"stream-url-for": q,
			"api-base": E(k),
			chapters: P.value,
			"intro-marker": F.value,
			"outro-marker": I.value,
			"prev-episode": B.value,
			"next-episode": V.value,
			autoplay: !0,
			onBack: Q,
			onPlayNext: ge,
			onPlayEpisode: $,
			onTheater: _e
		}, null, 8, [
			"media",
			"stream-url",
			"api-base",
			"chapters",
			"intro-marker",
			"outro-marker",
			"prev-episode",
			"next-episode"
		])) : h("", !0)])], 2));
	}
}), [["__scopeId", "data-v-72011e10"]]);
//#endregion
export { k as default };

//# sourceMappingURL=PlayerPage-C3yBR9dx.js.map