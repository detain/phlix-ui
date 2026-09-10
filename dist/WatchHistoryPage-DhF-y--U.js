import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-BlNXxmNP.js";
import { t as n } from "./client-DA-5QZXw.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { n as i } from "./useProfileStore-qqAkFafR.js";
import { t as a } from "./useImageSrc-KnN1T9Ga.js";
import { i as ee } from "./usePlayerStore-DhgapSoa.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as ne } from "./Spinner-CEc78iJz.js";
import { t as o } from "./Button-BL3fV7FU.js";
import { t as s } from "./EmptyState-BwwPJtFd.js";
import { t as c } from "./mediaTypeIcon-Bde251Qi.js";
import { r as l } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, normalizeStyle as y, onMounted as b, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, watch as re, withCtx as E, withModifiers as D } from "vue";
import { useRouter as O } from "vue-router";
//#region src/pages/WatchHistoryPage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "history-page" }, A = {
	key: 3,
	class: "history-groups"
}, j = { class: "history-group__date" }, M = { class: "history-group__items" }, N = ["href", "aria-label"], P = ["src", "alt"], F = {
	key: 1,
	class: "history-item__fallback"
}, I = ["aria-valuenow"], L = { class: "history-item__info" }, R = { class: "history-item__title" }, z = { class: "history-item__meta numeric" }, B = { class: "history-item__actions" }, V = ["aria-label", "onClick"], ie = ["aria-label", "onClick"], H = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "WatchHistoryPage",
	props: { client: {
		type: Object,
		default: null
	} },
	setup(e) {
		let v = e, H = O(), U = r(), { imgSrc: W } = a(), G = te(), K = ee(), q = i();
		function J() {
			return v.client ? v.client : new n({ baseUrl: U.value });
		}
		let Y = S([]), X = S(!1), Z = S(null), ae = d(() => {
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
		function oe(e) {
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
			H?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function se(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ce(e) {
			try {
				let t = J(), n = await l(t, U.value, e, K.resumeMap);
				if (!n) {
					G.info("Nothing to play yet");
					return;
				}
				$("player", n.id);
			} catch (e) {
				if (se(e)) return;
				G.info("Nothing to play yet");
			}
		}
		function le(e) {
			H?.hasRoute("media") ? $("media", e.id) : G.info(`Details for "${e.name}" are coming soon`);
		}
		function ue() {
			Q();
		}
		return b(() => {
			Q();
		}), re(() => q.epoch, () => {
			Y.value = [], Q();
		}), (e, n) => (x(), m("div", k, [n[1] ||= h("div", { class: "history-header" }, [h("h1", { class: "history-title" }, "Watch History")], -1), X.value && Y.value.length === 0 ? (x(), f(ne, {
			key: 0,
			label: "Loading watch history"
		})) : Z.value ? (x(), f(s, {
			key: 1,
			icon: "alert",
			title: "Couldn't load watch history",
			description: Z.value
		}, {
			actions: E(() => [_(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: ue
			}, {
				default: E(() => [...n[0] ||= [g("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : !X.value && Y.value.length === 0 ? (x(), f(s, {
			key: 2,
			icon: "film",
			title: "No watch history yet",
			description: "Titles you watch will appear here so you can easily pick up where you left off."
		})) : (x(), m("div", A, [(x(!0), m(u, null, C(ae.value, (e) => (x(), m("section", {
			key: e.date,
			class: "history-group"
		}, [h("h2", j, w(oe(e.date)), 1), h("div", M, [(x(!0), m(u, null, C(e.items, (e) => (x(), m("article", {
			key: e.id,
			class: "history-item"
		}, [h("a", {
			href: `/app/media/${e.media.id}`,
			class: "history-item__poster",
			"aria-label": e.media.name
		}, [e.media.poster_url ? (x(), m("img", {
			key: 0,
			src: T(W)(e.media.poster_url),
			alt: e.media.name,
			loading: "lazy",
			decoding: "async"
		}, null, 8, P)) : (x(), m("div", F, [_(t, { name: T(c)(e.media.type) }, null, 8, ["name"])])), e.progress > 0 ? (x(), m("div", {
			key: 2,
			class: "history-item__progress",
			role: "progressbar",
			"aria-valuenow": Math.round(e.progress * 100),
			"aria-valuemin": "0",
			"aria-valuemax": "100"
		}, [h("i", { style: y({ width: `${e.progress * 100}%` }) }, null, 4)], 8, I)) : p("", !0)], 8, N), h("div", L, [
			h("h3", R, w(e.media.name), 1),
			h("p", z, [
				e.media.year ? (x(), m(u, { key: 0 }, [g(w(e.media.year), 1)], 64)) : p("", !0),
				e.media.year && e.media.runtime ? (x(), m(u, { key: 1 }, [g(" · ")], 64)) : p("", !0),
				e.media.runtime ? (x(), m(u, { key: 2 }, [g(w(e.media.runtime) + "m", 1)], 64)) : p("", !0)
			]),
			h("div", B, [h("button", {
				type: "button",
				class: "history-item__btn",
				"aria-label": `Play ${e.media.name}`,
				onClick: D((t) => ce(e.media), ["prevent"])
			}, [_(t, { name: "play" })], 8, V), h("button", {
				type: "button",
				class: "history-item__btn",
				"aria-label": `Info for ${e.media.name}`,
				onClick: D((t) => le(e.media), ["prevent"])
			}, [_(t, { name: "info" })], 8, ie)])
		])]))), 128))])]))), 128))]))]));
	}
}), [["__scopeId", "data-v-3fd75b42"]]);
//#endregion
export { H as default };

//# sourceMappingURL=WatchHistoryPage-DhF-y--U.js.map