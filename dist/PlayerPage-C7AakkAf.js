import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./client-cUL8r-1I.js";
import { n, r } from "./useApiBase-CV_r-Kk4.js";
import { n as i, o as a } from "./LoveButton-Cfe3jzXL.js";
import { i as o } from "./usePageTitle-BO3GGF3M.js";
import { t as s } from "./Button-k7aQagzg.js";
import { t as c } from "./Skeleton-DkSoWF3C.js";
import { t as l } from "./EmptyState-B2QnGIQT.js";
import { n as u } from "./media-query-C8oxSF4h.js";
import { t as ee } from "./Player-DLZg5UMI.js";
import { i as te, r as d } from "./series-grouping-BTZK8Agh.js";
import { computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, normalizeClass as ne, normalizeStyle as re, onBeforeUnmount as b, onMounted as x, openBlock as S, ref as C, unref as w, watch as T, withCtx as E } from "vue";
import { onBeforeRouteLeave as D, useRoute as O, useRouter as ie } from "vue-router";
//#region src/components/player/episode-order.ts
function ae(e) {
	return d(e).filter((e) => !e.isSpecials).flatMap((e) => e.episodes);
}
function oe(e, t) {
	let n = e.findIndex((e) => e.id === t);
	return n > 0 ? e[n - 1] : null;
}
function se(e, t) {
	let n = e.findIndex((e) => e.id === t);
	return n >= 0 && n < e.length - 1 ? e[n + 1] : null;
}
//#endregion
//#region src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var ce = { class: "player-page__stage" }, le = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, k = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "PlayerPage",
	setup(e) {
		let d = /* @__PURE__ */ new Map(), y = n(), k = r(), ue = O(), A = ie(), j = a(), de = i(), M = C(null), N = C(""), P = C([]), F = C(null), I = C(null), L = C(!0), R = C(null), z = C(!1), B = C(null), V = C(null), H = f(() => String(ue.params.id ?? ""));
		o(() => M.value?.name);
		let U = f(() => {
			let e = M.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), W = null, G = !1;
		function K(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function q(e) {
			let t = k.value || y.value;
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
				let a = u(y.value, {
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
			let r = u(y.value, {
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
			B.value = oe(e, t), V.value = se(e, t);
		}
		function me(e) {
			for (let t of d.values()) if (t.some((t) => t.id === e)) return t;
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
				let o = ae(a);
				o.length && d.set(n.id, o), X(o, t.id);
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
				let n = new t({ baseUrl: y.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, W?.signal);
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
		x(Z), T(H, Z), D(() => {
			j.current && j.streamUrl && j.showMiniPlayer();
		}), b(() => {
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
		return (e, t) => (S(), h("div", { class: ne(["player-page", { "is-theater": z.value }]) }, [U.value && !L.value && !R.value ? (S(), h("div", {
			key: 0,
			class: "player-page__ambient",
			style: re(U.value),
			"aria-hidden": "true"
		}, null, 4)) : m("", !0), g("div", ce, [L.value ? (S(), h("div", le, [v(c, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : R.value ? (S(), p(l, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: R.value
		}, {
			actions: E(() => [v(s, {
				variant: "solid",
				onClick: Z
			}, {
				default: E(() => [...t[0] ||= [_("Retry", -1)]]),
				_: 1
			}), v(s, {
				variant: "ghost",
				onClick: Q
			}, {
				default: E(() => [...t[1] ||= [_("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : M.value ? (S(), p(ee, {
			key: 2,
			media: M.value,
			"stream-url": N.value,
			"stream-url-for": q,
			"api-base": w(y),
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
		])) : m("", !0)])], 2));
	}
}), [["__scopeId", "data-v-72011e10"]]);
//#endregion
export { k as default };

//# sourceMappingURL=PlayerPage-C7AakkAf.js.map