import { n as e } from "./Icon-Bd1lZf6E.js";
import { t } from "./Modal-DnGvbsI9.js";
import { l as n, t as r } from "./client-DH50wjeq.js";
import { n as i, r as a } from "./useApiBase-CV_r-Kk4.js";
import { n as o, o as s } from "./media-query-IVKvZvWX.js";
import { n as c } from "./ThumbRating-BJEUrMHi.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as l } from "./Button-CnyfCnhY.js";
import { t as te } from "./Skeleton-CzU_l53W.js";
import { t as ne } from "./EmptyState-588Z_81C.js";
import { H as re, m as u, t as ie } from "./Player-DKYl0U3Z.js";
import { n as ae, o as oe, r as se, t as ce } from "./episode-order-C2yqgMeX.js";
import { computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, normalizeClass as le, normalizeStyle as y, onBeforeUnmount as b, onMounted as x, openBlock as S, ref as C, toDisplayString as ue, unref as de, watch as fe, withCtx as w } from "vue";
import { onBeforeRouteLeave as pe, useRoute as me, useRouter as he } from "vue-router";
//#region src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var ge = { class: "player-page__stage" }, _e = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, ve = { class: "player-page__blocking-error" }, T = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "PlayerPage",
	setup(e) {
		let v = /* @__PURE__ */ new Map(), T = i(), ye = a(), be = me(), E = he(), D = s(), xe = c(), O = C(null), k = C(""), A = C([]), j = C(null), M = C(null), N = C([]), P = C([]), F = C(!0), I = C(null), L = C(!1), R = C(null), z = C(!1), B = C(null), V = C(null), H = d(() => String(be.params.id ?? ""));
		ee(() => O.value?.name);
		let U = d(() => {
			let e = O.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), W = null, G = !1;
		function K(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function q(e) {
			let t = ye.value || T.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function J(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function Y(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				D.setQueue([]);
				return;
			}
			let r = W, i = () => G || r !== W;
			try {
				let a = o(T.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(a, void 0, r?.signal);
				if (i()) return;
				D.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || K(e)) return;
				D.setQueue([]);
			}
		}
		async function X(e, t, n) {
			let r = o(T.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function Se(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Z(e, t) {
			B.value = se(e, t), V.value = ce(e, t);
		}
		function Ce(e) {
			for (let t of v.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function we(e, t) {
			if (B.value = null, V.value = null, !(t.type === "episode" || (t.episode_number ?? null) !== null)) return;
			let n = Ce(t.id);
			if (n) {
				Z(n, t.id);
				return;
			}
			let r = W, i = () => G || r !== W;
			try {
				let n = await Se(e, t, r?.signal);
				if (i()) return;
				let a = await X(e, n.id, r?.signal);
				if (i()) return;
				if (oe(a)) {
					let t = a.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => X(e, t.id, r?.signal).catch(() => [])));
					if (i()) return;
					a = [...a.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let o = ae(a);
				o.length && v.set(n.id, o), Z(o, t.id);
			} catch (e) {
				if (i() || K(e)) return;
				B.value = null, V.value = null;
			}
		}
		async function Q() {
			let e = H.value;
			if (W?.abort(), W = typeof AbortController < "u" ? new AbortController() : null, F.value = !0, I.value = null, A.value = [], j.value = null, M.value = null, N.value = [], P.value = [], B.value = null, V.value = null, D.hideMiniPlayer(), !e) {
				I.value = "No media id provided", F.value = !1;
				return;
			}
			try {
				let t = new r({ baseUrl: T.value }), n = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, W?.signal);
				if (G) return;
				let i = n.item;
				O.value = i, i && xe.hydrate(i), k.value = q(i);
				let a = await t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, W?.signal).catch(() => null);
				if (G) return;
				A.value = (a?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					end: e.end_seconds,
					title: e.title ?? void 0
				})), j.value = J(a?.intro_marker), M.value = J(a?.outro_marker), N.value = u(a?.audio_tracks), P.value = re(a?.subtitle_tracks), F.value = !1, Y(t, i), we(t, i);
			} catch (e) {
				if (G || K(e)) return;
				if (e instanceof n && (e.status === 403 || e.status === 429)) {
					let t = e.body?.error;
					if (t === "AccessSchedule" || t === "StreamLimitExceeded") {
						R.value = t === "AccessSchedule" ? "Playback blocked by access schedule. Try again during allowed hours." : "Stream limit reached. Stop another stream to continue watching.", z.value = !0, F.value = !1;
						return;
					}
				}
				I.value = e instanceof Error ? e.message : "Failed to load media", F.value = !1;
			}
		}
		x(Q), fe(H, Q), pe(() => {
			D.current && D.streamUrl && D.showMiniPlayer();
		}), b(() => {
			G = !0, W?.abort(), W = null;
		});
		function $() {
			E?.back();
		}
		function Te(e) {
			E?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ee(e) {
			E?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function De(e) {
			L.value = e;
		}
		function Oe() {
			z.value = !1, $();
		}
		return (e, n) => (S(), m("div", { class: le(["player-page", { "is-theater": L.value }]) }, [
			U.value && !F.value && !I.value ? (S(), m("div", {
				key: 0,
				class: "player-page__ambient",
				style: y(U.value),
				"aria-hidden": "true"
			}, null, 4)) : p("", !0),
			h("div", ge, [F.value ? (S(), m("div", _e, [_(te, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : I.value ? (S(), f(ne, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: I.value
			}, {
				actions: w(() => [_(l, {
					variant: "solid",
					onClick: Q
				}, {
					default: w(() => [...n[1] ||= [g("Retry", -1)]]),
					_: 1
				}), _(l, {
					variant: "ghost",
					onClick: $
				}, {
					default: w(() => [...n[2] ||= [g("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : O.value ? (S(), f(ie, {
				key: 2,
				media: O.value,
				"stream-url": k.value,
				"stream-url-for": q,
				"api-base": de(T),
				chapters: A.value,
				"intro-marker": j.value,
				"outro-marker": M.value,
				"playback-audio-tracks": N.value,
				"playback-subtitle-tracks": P.value,
				"prev-episode": B.value,
				"next-episode": V.value,
				autoplay: !0,
				onBack: $,
				onPlayNext: Te,
				onPlayEpisode: Ee,
				onTheater: De
			}, null, 8, [
				"media",
				"stream-url",
				"api-base",
				"chapters",
				"intro-marker",
				"outro-marker",
				"playback-audio-tracks",
				"playback-subtitle-tracks",
				"prev-episode",
				"next-episode"
			])) : p("", !0)]),
			_(t, {
				modelValue: z.value,
				"onUpdate:modelValue": n[0] ||= (e) => z.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: w(() => [_(l, {
					variant: "solid",
					onClick: Oe
				}, {
					default: w(() => [...n[3] ||= [g("OK", -1)]]),
					_: 1
				})]),
				default: w(() => [h("p", ve, ue(R.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-adc3e6fb"]]);
//#endregion
export { T as default };

//# sourceMappingURL=PlayerPage-BICQb3kn.js.map