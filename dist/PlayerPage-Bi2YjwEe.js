import { n as e } from "./Icon-Bd1lZf6E.js";
import { t } from "./Modal-DnGvbsI9.js";
import { l as n, t as r } from "./client-B65CbqT7.js";
import { n as i, r as a } from "./useApiBase-CV_r-Kk4.js";
import { n as o, o as s } from "./media-query-IVKvZvWX.js";
import { n as c } from "./ThumbRating-obRiYVSW.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as l } from "./Button-CnyfCnhY.js";
import { t as te } from "./Skeleton-CzU_l53W.js";
import { t as ne } from "./EmptyState-588Z_81C.js";
import { H as re, m as ie, t as ae } from "./Player-kU3gx_59.js";
import { n as oe, o as se, r as ce, t as le } from "./episode-order-C2yqgMeX.js";
import { computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeClass as ue, normalizeStyle as v, onBeforeUnmount as y, onMounted as b, openBlock as x, ref as S, toDisplayString as de, unref as C, watch as fe, withCtx as w } from "vue";
import { onBeforeRouteLeave as pe, useRoute as T, useRouter as me } from "vue-router";
//#region src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var he = { class: "player-page__stage" }, ge = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, _e = { class: "player-page__blocking-error" }, E = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "PlayerPage",
	setup(e) {
		let _ = /* @__PURE__ */ new Map(), E = i(), ve = a(), ye = T(), D = me(), O = s(), be = c(), k = S(null), A = S(""), j = S([]), M = S(null), N = S(null), P = S([]), F = S([]), I = S(!0), L = S(null), R = S(!1), z = S(null), B = S(!1), V = S(null), H = S(null), U = u(() => String(ye.params.id ?? ""));
		ee(() => k.value?.name);
		let W = u(() => {
			let e = k.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), G = null, K = !1;
		function q(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function J(e) {
			let t = ve.value || E.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function Y(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function xe(e, t) {
			let n = G, r = () => K || n !== G;
			if (t.type === "episode" || (t.episode_number ?? null) !== null) {
				for (let e of _.values()) if (e.some((e) => e.id === t.id)) {
					if (r()) return;
					let n = e.findIndex((e) => e.id === t.id), i = e.slice(n + 1);
					if (i.length) {
						O.setQueue(i);
						return;
					}
					break;
				}
			}
			let i = t.genres?.[0];
			if (!i) {
				O.setQueue([]);
				return;
			}
			try {
				let a = o(E.value, {
					genres: [i],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(a, void 0, n?.signal);
				if (r()) return;
				O.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (r() || q(e)) return;
				O.setQueue([]);
			}
		}
		async function X(e, t, n) {
			let r = o(E.value, {
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
			V.value = ce(e, t), H.value = le(e, t);
		}
		function Ce(e) {
			for (let t of _.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function we(e, t) {
			if (V.value = null, H.value = null, !(t.type === "episode" || (t.episode_number ?? null) !== null)) return;
			let n = Ce(t.id);
			if (n) {
				Z(n, t.id);
				return;
			}
			let r = G, i = () => K || r !== G;
			try {
				let n = await Se(e, t, r?.signal);
				if (i()) return;
				let a = await X(e, n.id, r?.signal);
				if (i()) return;
				if (se(a)) {
					let t = a.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => X(e, t.id, r?.signal).catch(() => [])));
					if (i()) return;
					a = [...a.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let o = oe(a);
				o.length && _.set(n.id, o), Z(o, t.id);
				let s = o.findIndex((e) => e.id === t.id), c = o.slice(s + 1);
				c.length && O.setQueue(c);
			} catch (e) {
				if (i() || q(e)) return;
				V.value = null, H.value = null;
			}
		}
		async function Q() {
			let e = U.value;
			if (G?.abort(), G = typeof AbortController < "u" ? new AbortController() : null, I.value = !0, L.value = null, j.value = [], M.value = null, N.value = null, P.value = [], F.value = [], V.value = null, H.value = null, O.hideMiniPlayer(), !e) {
				L.value = "No media id provided", I.value = !1;
				return;
			}
			let t = new r({ baseUrl: E.value }), i = null;
			try {
				i = (await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, G?.signal)).item;
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
				return;
			}
			if (!K) {
				if (!i) {
					L.value = "Failed to load media item", I.value = !1;
					return;
				}
				k.value = i, be.hydrate(i), A.value = J(i), I.value = !1, i && (xe(t, i), we(t, i)), t.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, G?.signal).then((e) => {
					K || (j.value = (e?.chapters ?? []).map((e) => ({
						start: e.start_seconds,
						end: e.end_seconds,
						title: e.title ?? void 0
					})), M.value = Y(e?.intro_marker), N.value = Y(e?.outro_marker), P.value = ie(e?.audio_tracks), F.value = re(e?.subtitle_tracks));
				}).catch(() => null);
			}
		}
		b(Q), fe(U, Q), pe(() => {
			O.current && O.streamUrl && O.showMiniPlayer();
		}), y(() => {
			K = !0, G?.abort(), G = null;
		});
		function $() {
			D?.back();
		}
		function Te(e) {
			D?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Ee(e) {
			D?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function De(e) {
			R.value = e;
		}
		function Oe() {
			B.value = !1, $();
		}
		return (e, n) => (x(), p("div", { class: ue(["player-page", { "is-theater": R.value }]) }, [
			W.value && !I.value && !L.value ? (x(), p("div", {
				key: 0,
				class: "player-page__ambient",
				style: v(W.value),
				"aria-hidden": "true"
			}, null, 4)) : f("", !0),
			m("div", he, [I.value ? (x(), p("div", ge, [g(te, {
				variant: "rect",
				radius: "var(--radius-xl)",
				height: "100%"
			})])) : L.value ? (x(), d(ne, {
				key: 1,
				class: "player-page__error",
				icon: "alert",
				title: "Couldn't play this title",
				description: L.value
			}, {
				actions: w(() => [g(l, {
					variant: "solid",
					onClick: Q
				}, {
					default: w(() => [...n[1] ||= [h("Retry", -1)]]),
					_: 1
				}), g(l, {
					variant: "ghost",
					onClick: $
				}, {
					default: w(() => [...n[2] ||= [h("Back", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : k.value ? (x(), d(ae, {
				key: 2,
				media: k.value,
				"stream-url": A.value,
				"stream-url-for": J,
				"api-base": C(E),
				chapters: j.value,
				"intro-marker": M.value,
				"outro-marker": N.value,
				"playback-audio-tracks": P.value,
				"playback-subtitle-tracks": F.value,
				"prev-episode": V.value,
				"next-episode": H.value,
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
			])) : f("", !0)]),
			g(t, {
				modelValue: B.value,
				"onUpdate:modelValue": n[0] ||= (e) => B.value = e,
				title: "Cannot Play",
				size: "sm",
				dismissible: !1,
				"hide-close": ""
			}, {
				footer: w(() => [g(l, {
					variant: "solid",
					onClick: Oe
				}, {
					default: w(() => [...n[3] ||= [h("OK", -1)]]),
					_: 1
				})]),
				default: w(() => [m("p", _e, de(z.value), 1)]),
				_: 1
			}, 8, ["modelValue"])
		], 2));
	}
}), [["__scopeId", "data-v-9c39e3c8"]]);
//#endregion
export { E as default };

//# sourceMappingURL=PlayerPage-Bi2YjwEe.js.map