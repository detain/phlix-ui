import { n as e } from "./Icon-Bd1lZf6E.js";
import { t } from "./Modal-BXA8fOR4.js";
import { l as n, t as r } from "./client-DH50wjeq.js";
import { n as i, r as a } from "./useApiBase-CV_r-Kk4.js";
import { i as o } from "./usePlayerStore-BVgQE-j8.js";
import { n as ee } from "./ThumbRating-BJEUrMHi.js";
import { i as s } from "./usePageTitle-BO3GGF3M.js";
import { t as c } from "./Button-CnyfCnhY.js";
import { t as te } from "./Skeleton-CzU_l53W.js";
import { t as ne } from "./EmptyState-588Z_81C.js";
import { n as l } from "./media-query-DKjhlX8r.js";
import { t as re } from "./Player-Bm_YqO4Q.js";
import { r as u } from "./series-grouping-Bbs1zX87.js";
import { n as ie, r as ae, t as oe } from "./episode-order-BMC9lH44.js";
import { computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, normalizeClass as se, normalizeStyle as y, onBeforeUnmount as ce, onMounted as le, openBlock as b, ref as x, toDisplayString as ue, unref as S, watch as de, withCtx as C } from "vue";
import { onBeforeRouteLeave as w, useRoute as T, useRouter as E } from "vue-router";
//#region src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var fe = { class: "player-page__stage" }, pe = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, me = { class: "player-page__blocking-error" }, D = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "PlayerPage",
	setup(e) {
		let v = /* @__PURE__ */ new Map(), D = i(), he = a(), ge = T(), O = E(), k = o(), A = ee(), j = x(null), M = x(""), N = x([]), P = x(null), F = x(null), I = x(!0), L = x(null), R = x(!1), z = x(null), B = x(!1), V = x(null), H = x(null), U = d(() => String(ge.params.id ?? ""));
		s(() => j.value?.name);
		let W = d(() => {
			let e = j.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), G = null, K = !1;
		function q(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function J(e) {
			let t = he.value || D.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function Y(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function _e(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				k.setQueue([]);
				return;
			}
			let r = G, i = () => K || r !== G;
			try {
				let a = l(D.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), o = await e.get(a, void 0, r?.signal);
				if (i()) return;
				k.setQueue((o.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || q(e)) return;
				k.setQueue([]);
			}
		}
		async function X(e, t, n) {
			let r = l(D.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function ve(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Z(e, t) {
			V.value = ae(e, t), H.value = oe(e, t);
		}
		function ye(e) {
			for (let t of v.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function be(e, t) {
			if (V.value = null, H.value = null, !(t.type === "episode" || (t.episode_number ?? null) !== null)) return;
			let n = ye(t.id);
			if (n) {
				Z(n, t.id);
				return;
			}
			let r = G, i = () => K || r !== G;
			try {
				let n = await ve(e, t, r?.signal);
				if (i()) return;
				let a = await X(e, n.id, r?.signal);
				if (i()) return;
				if (u(a)) {
					let t = a.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => X(e, t.id, r?.signal).catch(() => [])));
					if (i()) return;
					a = [...a.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let o = ie(a);
				o.length && v.set(n.id, o), Z(o, t.id);
			} catch (e) {
				if (i() || q(e)) return;
				V.value = null, H.value = null;
			}
		}
		async function Q() {
			let e = U.value;
			if (G?.abort(), G = typeof AbortController < "u" ? new AbortController() : null, I.value = !0, L.value = null, N.value = [], P.value = null, F.value = null, V.value = null, H.value = null, k.hideMiniPlayer(), !e) {
				L.value = "No media id provided", I.value = !1;
				return;
			}
			try {
				let t = new r({ baseUrl: D.value }), n = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, G?.signal);
				if (K) return;
				let i = n.item;
				j.value = i, i && A.hydrate(i), M.value = J(i);
				let a = await t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, G?.signal).catch(() => null);
				if (K) return;
				N.value = (a?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), P.value = Y(a?.intro_marker), F.value = Y(a?.outro_marker), I.value = !1, _e(t, i), be(t, i);
			} catch (e) {
				if (K || q(e)) return;
				if (e instanceof n && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						z.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", B.value = !0, I.value = !1;
						return;
					}
				}
				L.value = e instanceof Error ? e.message : "Failed to load media", I.value = !1;
			}
		}
		le(Q), de(U, Q), w(() => {
			k.current && k.streamUrl && k.showMiniPlayer();
		}), ce(() => {
			K = !0, G?.abort(), G = null;
		});
		function $() {
			O?.back();
		}
		function xe(e) {
			O?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Se(e) {
			O?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ce(e) {
			R.value = e;
		}
		function we() {
			B.value = !1, $();
		}
		return (e, n) => (b(), m("div", { class: se(["player-page", { "is-theater": R.value }]) }, [
			W.value && !I.value && !L.value ? (b(), m("div", {
				key: 0,
				class: "player-page__ambient",
				style: y(W.value),
				"aria-hidden": "true"
			}, null, 4)) : p("", !0),
			h("div", fe, [I.value ? (b(), m("div", pe, [_(te, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : L.value ? (b(), f(ne, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: L.value
			}, {
				actions: C(() => [_(c, {
					variant: "solid",
					onClick: Q
				}, {
					default: C(() => [...n[1] ||= [g("Retry", -1)]]),
					_: 1
				}), _(c, {
					variant: "ghost",
					onClick: $
				}, {
					default: C(() => [...n[2] ||= [g("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value ? (b(), f(re, {
				key: 2,
				media: j.value,
				"stream-url": M.value,
				"stream-url-for": J,
				"api-base": S(D),
				chapters: N.value,
				"intro-marker": P.value,
				"outro-marker": F.value,
				"prev-episode": V.value,
				"next-episode": H.value,
				autoplay: !0,
				onBack: $,
				onPlayNext: xe,
				onPlayEpisode: Se,
				onTheater: Ce
			}, null, 8, [
				"media",
				"stream-url",
				"api-base",
				"chapters",
				"intro-marker",
				"outro-marker",
				"prev-episode",
				"next-episode"
			])) : p("", !0)]),
			_(t, {
				modelValue: B.value,
				"onUpdate:modelValue": n[0] ||= (e) => B.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: C(() => [_(c, {
					variant: "solid",
					onClick: we
				}, {
					default: C(() => [...n[3] ||= [g("OK", -1)]]),
					_: 1
				})]),
				default: C(() => [h("p", me, ue(z.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-509be909"]]);
//#endregion
export { D as default };

//# sourceMappingURL=PlayerPage-Xctci93M.js.map