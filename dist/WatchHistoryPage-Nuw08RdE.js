import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { t as n } from "./client-D1nDQ0cP.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { i } from "./usePlayerStore-fCCh6mOw.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Spinner-D1bwTvld.js";
import { t as s } from "./Button-btm-GCUN.js";
import { t as c } from "./EmptyState-CfyGawh7.js";
import { r as l } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, normalizeStyle as y, onMounted as b, openBlock as x, ref as S, renderList as C, toDisplayString as w, withCtx as T, withModifiers as E } from "vue";
import { useRouter as D } from "vue-router";
//#region src/pages/WatchHistoryPage.vue?vue&type=script&setup=true&lang.ts
var O = { class: "history-page" }, k = {
	key: 3,
	class: "history-groups"
}, A = { class: "history-group__date" }, j = { class: "history-group__items" }, M = ["href", "aria-label"], N = ["src", "alt"], P = {
	key: 1,
	class: "history-item__fallback"
}, F = ["aria-valuenow"], I = { class: "history-item__info" }, L = { class: "history-item__title" }, R = { class: "history-item__meta numeric" }, z = { class: "history-item__actions" }, B = ["aria-label", "onClick"], V = ["aria-label", "onClick"], H = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "WatchHistoryPage",
	props: { client: {
		type: Object,
		default: null
	} },
	setup(e) {
		let v = e, H = D(), U = r(), W = a(), G = i();
		function K() {
			return v.client ? v.client : new n({ baseUrl: U.value });
		}
		let q = S([]), J = S(!1), Y = S(null), X = d(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of q.value) {
				let n = new Date(t.updated_at).toISOString().split("T")[0];
				e.has(n) || e.set(n, []), e.get(n).push(t);
			}
			return Array.from(e.entries()).sort(([e], [t]) => t.localeCompare(e)).map(([e, t]) => ({
				date: e,
				items: t
			}));
		});
		function Z(e) {
			let t = new Date(e), n = /* @__PURE__ */ new Date(), r = new Date(n);
			return r.setDate(r.getDate() - 1), e === n.toISOString().split("T")[0] ? "Today" : e === r.toISOString().split("T")[0] ? "Yesterday" : t.toLocaleDateString(void 0, {
				weekday: "long",
				month: "long",
				day: "numeric"
			});
		}
		async function Q() {
			J.value = !0, Y.value = null;
			try {
				let e = K();
				try {
					q.value = (await e.get("/api/v1/me/history")).items ?? [];
					return;
				} catch {}
				q.value = ((await e.get("/api/v1/me/progress")).items ?? []).filter((e) => e.progress > 0).map((e) => ({
					id: e.id,
					media: e.media,
					progress: e.progress,
					updated_at: e.updated_at
				}));
			} catch (e) {
				Y.value = e instanceof Error ? e.message : "Failed to load watch history";
			} finally {
				J.value = !1;
			}
		}
		function $(e, t) {
			H?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function ee(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function te(e) {
			try {
				let t = await l(K(), U.value, e, G.resumeMap);
				if (!t) {
					W.info("Nothing to play yet");
					return;
				}
				$("player", t.id);
			} catch (e) {
				if (ee(e)) return;
				W.info("Nothing to play yet");
			}
		}
		function ne(e) {
			H?.hasRoute("media") ? $("media", e.id) : W.info(`Details for "${e.name}" are coming soon`);
		}
		function re() {
			Q();
		}
		return b(() => {
			Q();
		}), (e, n) => (x(), m("div", O, [n[1] ||= h("div", { class: "history-header" }, [h("h1", { class: "history-title" }, "Watch History")], -1), J.value && q.value.length === 0 ? (x(), f(o, {
			key: 0,
			label: "Loading watch history"
		})) : Y.value ? (x(), f(c, {
			key: 1,
			icon: "alert",
			title: "Couldn't load watch history",
			description: Y.value
		}, {
			actions: T(() => [_(s, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: re
			}, {
				default: T(() => [...n[0] ||= [g("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : !J.value && q.value.length === 0 ? (x(), f(c, {
			key: 2,
			icon: "film",
			title: "No watch history yet",
			description: "Titles you watch will appear here so you can easily pick up where you left off."
		})) : (x(), m("div", k, [(x(!0), m(u, null, C(X.value, (e) => (x(), m("section", {
			key: e.date,
			class: "history-group"
		}, [h("h2", A, w(Z(e.date)), 1), h("div", j, [(x(!0), m(u, null, C(e.items, (e) => (x(), m("article", {
			key: e.id,
			class: "history-item"
		}, [h("a", {
			href: `/app/media/${e.media.id}`,
			class: "history-item__poster",
			"aria-label": e.media.name
		}, [e.media.poster_url ? (x(), m("img", {
			key: 0,
			src: e.media.poster_url,
			alt: e.media.name,
			loading: "lazy",
			decoding: "async"
		}, null, 8, N)) : (x(), m("div", P, [_(t, { name: e.media.type === "series" ? "tv" : "film" }, null, 8, ["name"])])), e.progress > 0 ? (x(), m("div", {
			key: 2,
			class: "history-item__progress",
			role: "progressbar",
			"aria-valuenow": Math.round(e.progress * 100),
			"aria-valuemin": "0",
			"aria-valuemax": "100"
		}, [h("i", { style: y({ width: `${e.progress * 100}%` }) }, null, 4)], 8, F)) : p("", !0)], 8, M), h("div", I, [
			h("h3", L, w(e.media.name), 1),
			h("p", R, [
				e.media.year ? (x(), m(u, { key: 0 }, [g(w(e.media.year), 1)], 64)) : p("", !0),
				e.media.year && e.media.runtime ? (x(), m(u, { key: 1 }, [g(" · ")], 64)) : p("", !0),
				e.media.runtime ? (x(), m(u, { key: 2 }, [g(w(e.media.runtime) + "m", 1)], 64)) : p("", !0)
			]),
			h("div", z, [h("button", {
				type: "button",
				class: "history-item__btn",
				"aria-label": `Play ${e.media.name}`,
				onClick: E((t) => te(e.media), ["prevent"])
			}, [_(t, { name: "play" })], 8, B), h("button", {
				type: "button",
				class: "history-item__btn",
				"aria-label": `Info for ${e.media.name}`,
				onClick: E((t) => ne(e.media), ["prevent"])
			}, [_(t, { name: "info" })], 8, V)])
		])]))), 128))])]))), 128))]))]));
	}
}), [["__scopeId", "data-v-17f9b02e"]]);
//#endregion
export { H as default };

//# sourceMappingURL=WatchHistoryPage-Nuw08RdE.js.map