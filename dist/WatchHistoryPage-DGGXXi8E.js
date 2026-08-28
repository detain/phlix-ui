import { n as e, t } from "./Icon-CkTBN_k5.js";
import { t as n } from "./client-DA-5QZXw.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as ee } from "./useImageSrc-KnN1T9Ga.js";
import { i } from "./usePlayerStore-DhgapSoa.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Spinner-COUSlhgo.js";
import { t as s } from "./Button-Cw8Wl4QR.js";
import { t as c } from "./EmptyState-CwWtkhEJ.js";
import { t as l } from "./mediaTypeIcon-Bde251Qi.js";
import { r as u } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, normalizeStyle as b, onMounted as x, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, withCtx as D, withModifiers as O } from "vue";
import { useRouter as te } from "vue-router";
//#region src/pages/WatchHistoryPage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "history-page" }, A = {
	key: 3,
	class: "history-groups"
}, j = { class: "history-group__date" }, M = { class: "history-group__items" }, N = ["href", "aria-label"], P = ["src", "alt"], F = {
	key: 1,
	class: "history-item__fallback"
}, I = ["aria-valuenow"], L = { class: "history-item__info" }, R = { class: "history-item__title" }, z = { class: "history-item__meta numeric" }, B = { class: "history-item__actions" }, V = ["aria-label", "onClick"], H = ["aria-label", "onClick"], U = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "WatchHistoryPage",
	props: { client: {
		type: Object,
		default: null
	} },
	setup(e) {
		let y = e, U = te(), W = r(), { imgSrc: G } = ee(), K = a(), q = i();
		function J() {
			return y.client ? y.client : new n({ baseUrl: W.value });
		}
		let Y = C([]), X = C(!1), Z = C(null), ne = f(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of Y.value) {
				let n = new Date(t.updated_at).toISOString().split("T")[0];
				e.has(n) || e.set(n, []), e.get(n).push(t);
			}
			return Array.from(e.entries()).sort(([e], [t]) => t.localeCompare(e)).map(([e, t]) => ({
				date: e,
				items: t
			}));
		});
		function re(e) {
			let t = new Date(e), n = /* @__PURE__ */ new Date(), r = new Date(n);
			return r.setDate(r.getDate() - 1), e === n.toISOString().split("T")[0] ? "Today" : e === r.toISOString().split("T")[0] ? "Yesterday" : t.toLocaleDateString(void 0, {
				weekday: "long",
				month: "long",
				day: "numeric"
			});
		}
		async function Q() {
			X.value = !0, Z.value = null;
			try {
				let e = J();
				try {
					let t = await e.get("/api/v1/me/history");
					Y.value = t.items ?? [];
					return;
				} catch {}
				let t = await e.get("/api/v1/me/progress");
				Y.value = (t.items ?? []).filter((e) => e.progress > 0).map((e) => ({
					id: e.id,
					media: e.media,
					progress: e.progress,
					updated_at: e.updated_at
				}));
			} catch (e) {
				Z.value = e instanceof Error ? e.message : "Failed to load watch history";
			} finally {
				X.value = !1;
			}
		}
		function $(e, t) {
			U?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function ie(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ae(e) {
			try {
				let t = J(), n = await u(t, W.value, e, q.resumeMap);
				if (!n) {
					K.info("Nothing to play yet");
					return;
				}
				$("player", n.id);
			} catch (e) {
				if (ie(e)) return;
				K.info("Nothing to play yet");
			}
		}
		function oe(e) {
			U?.hasRoute("media") ? $("media", e.id) : K.info(`Details for "${e.name}" are coming soon`);
		}
		function se() {
			Q();
		}
		return x(() => {
			Q();
		}), (e, n) => (S(), h("div", k, [n[1] ||= g("div", { class: "history-header" }, [g("h1", { class: "history-title" }, "Watch History")], -1), X.value && Y.value.length === 0 ? (S(), p(o, {
			key: 0,
			label: "Loading watch history"
		})) : Z.value ? (S(), p(c, {
			key: 1,
			icon: "alert",
			title: "Couldn't load watch history",
			description: Z.value
		}, {
			actions: D(() => [v(s, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: se
			}, {
				default: D(() => [...n[0] ||= [_("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : !X.value && Y.value.length === 0 ? (S(), p(c, {
			key: 2,
			icon: "film",
			title: "No watch history yet",
			description: "Titles you watch will appear here so you can easily pick up where you left off."
		})) : (S(), h("div", A, [(S(!0), h(d, null, w(ne.value, (e) => (S(), h("section", {
			key: e.date,
			class: "history-group"
		}, [g("h2", j, T(re(e.date)), 1), g("div", M, [(S(!0), h(d, null, w(e.items, (e) => (S(), h("article", {
			key: e.id,
			class: "history-item"
		}, [g("a", {
			href: `/app/media/${e.media.id}`,
			class: "history-item__poster",
			"aria-label": e.media.name
		}, [e.media.poster_url ? (S(), h("img", {
			key: 0,
			src: E(G)(e.media.poster_url),
			alt: e.media.name,
			loading: "lazy",
			decoding: "async"
		}, null, 8, P)) : (S(), h("div", F, [v(t, { name: E(l)(e.media.type) }, null, 8, ["name"])])), e.progress > 0 ? (S(), h("div", {
			key: 2,
			class: "history-item__progress",
			role: "progressbar",
			"aria-valuenow": Math.round(e.progress * 100),
			"aria-valuemin": "0",
			"aria-valuemax": "100"
		}, [g("i", { style: b({ width: `${e.progress * 100}%` }) }, null, 4)], 8, I)) : m("", !0)], 8, N), g("div", L, [
			g("h3", R, T(e.media.name), 1),
			g("p", z, [
				e.media.year ? (S(), h(d, { key: 0 }, [_(T(e.media.year), 1)], 64)) : m("", !0),
				e.media.year && e.media.runtime ? (S(), h(d, { key: 1 }, [_(" · ")], 64)) : m("", !0),
				e.media.runtime ? (S(), h(d, { key: 2 }, [_(T(e.media.runtime) + "m", 1)], 64)) : m("", !0)
			]),
			g("div", B, [g("button", {
				type: "button",
				class: "history-item__btn",
				"aria-label": `Play ${e.media.name}`,
				onClick: O((t) => ae(e.media), ["prevent"])
			}, [v(t, { name: "play" })], 8, V), g("button", {
				type: "button",
				class: "history-item__btn",
				"aria-label": `Info for ${e.media.name}`,
				onClick: O((t) => oe(e.media), ["prevent"])
			}, [v(t, { name: "info" })], 8, H)])
		])]))), 128))])]))), 128))]))]));
	}
}), [["__scopeId", "data-v-d80ac470"]]);
//#endregion
export { U as default };

//# sourceMappingURL=WatchHistoryPage-DGGXXi8E.js.map