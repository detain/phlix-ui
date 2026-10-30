import { n as e } from "./useApiBase-DXTBY90j.js";
import { t } from "./useImageSrc-CSM61b-l.js";
import { t as n } from "./client-pLl-rDdN.js";
import { t as r } from "./EmptyState-BjOJ1k_A.js";
import { t as ee } from "./Spinner-BYaiRNqs.js";
import { t as i } from "./Button-1sKEdGjj.js";
import { n as a, t as o } from "./Icon-CIbfiPrs.js";
import { t as s } from "./useToastStore-Bu-iYU7r.js";
import { r as c } from "./useProfileStore-CVUOBYBI.js";
import { r as te } from "./useResolvePlayable-CnOPgUvz.js";
import { i as ne } from "./usePlayerStore-B7mnqLe3.js";
import { t as re } from "./mediaTypeIcon-CNNqtg-w.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeStyle as ie, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, watch as w, withCtx as T, withModifiers as E } from "vue";
import { useRouter as D } from "vue-router";
// src/pages/WatchHistoryPage.vue?vue&type=script&setup=true&lang.ts
var O = { class: "history-page" }, k = {
	key: 3,
	class: "history-groups"
}, A = { class: "history-group__date" }, j = { class: "history-group__items" }, M = ["href", "aria-label"], N = ["src", "alt"], P = {
	key: 1,
	class: "history-item__fallback"
}, F = ["aria-valuenow"], I = { class: "history-item__info" }, L = { class: "history-item__title" }, R = { class: "history-item__meta numeric" }, z = { class: "history-item__actions" }, B = ["aria-label", "onClick"], V = ["aria-label", "onClick"], H = /*#__PURE__*/ a(/* @__PURE__ */ _({
	__name: "WatchHistoryPage",
	props: { client: {
		type: Object,
		default: null
	} },
	setup(a) {
		let _ = a, H = D(), U = e(), { imgSrc: W } = t(), G = s(), K = ne(), q = c();
		function J() {
			return _.client ? _.client : new n({ baseUrl: U.value });
		}
		let Y = b([]), X = b(!1), Z = b(null), ae = u(() => {
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
				let t = J(), n = await te(t, U.value, e, K.resumeMap);
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
			H?.hasRoute("media") ? $("media", e.id) : G.info(`Details for “${e.name}” are coming soon`);
		}
		function ue() {
			Q();
		}
		return v(() => {
			Q();
		}), w(() => q.epoch, () => {
			Y.value = [], Q();
		}), (e, t) => (y(), p("div", O, [t[1] ||= m("div", { class: "history-header" }, [m("h1", { class: "history-title" }, "Watch history")], -1), X.value && Y.value.length === 0 ? (y(), d(ee, {
			key: 0,
			label: "Loading watch history"
		})) : Z.value ? (y(), d(r, {
			key: 1,
			icon: "alert",
			title: "Couldn’t load watch history",
			description: Z.value
		}, {
			actions: T(() => [g(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: ue
			}, {
				default: T(() => [...t[0] ||= [h("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : !X.value && Y.value.length === 0 ? (y(), d(r, {
			key: 2,
			icon: "film",
			title: "No watch history yet",
			description: "Titles you watch will appear here so you can easily pick up where you left off."
		})) : (y(), p("div", k, [(y(!0), p(l, null, x(ae.value, (e) => (y(), p("section", {
			key: e.date,
			class: "history-group"
		}, [m("h2", A, S(oe(e.date)), 1), m("div", j, [(y(!0), p(l, null, x(e.items, (e) => (y(), p("article", {
			key: e.id,
			class: "history-item"
		}, [m("a", {
			href: `/app/media/${e.media.id}`,
			class: "history-item__poster",
			"aria-label": e.media.name
		}, [e.media.poster_url ? (y(), p("img", {
			key: 0,
			src: C(W)(e.media.poster_url),
			alt: e.media.name,
			loading: "lazy",
			decoding: "async"
		}, null, 8, N)) : (y(), p("div", P, [g(o, { name: C(re)(e.media.type) }, null, 8, ["name"])])), e.progress > 0 ? (y(), p("div", {
			key: 2,
			class: "history-item__progress",
			role: "progressbar",
			"aria-valuenow": Math.round(e.progress * 100),
			"aria-valuemin": "0",
			"aria-valuemax": "100"
		}, [m("i", { style: ie({ width: `${e.progress * 100}%` }) }, null, 4)], 8, F)) : f("", !0)], 8, M), m("div", I, [
			m("h3", L, S(e.media.name), 1),
			m("p", R, [
				e.media.year ? (y(), p(l, { key: 0 }, [h(S(e.media.year), 1)], 64)) : f("", !0),
				e.media.year && e.media.runtime ? (y(), p(l, { key: 1 }, [h(" · ")], 64)) : f("", !0),
				e.media.runtime ? (y(), p(l, { key: 2 }, [h(S(e.media.runtime) + "m", 1)], 64)) : f("", !0)
			]),
			m("div", z, [m("button", {
				type: "button",
				class: "history-item__btn",
				"aria-label": `Play ${e.media.name}`,
				onClick: E((t) => ce(e.media), ["prevent"])
			}, [g(o, { name: "play" })], 8, B), m("button", {
				type: "button",
				class: "history-item__btn",
				"aria-label": `Info for ${e.media.name}`,
				onClick: E((t) => le(e.media), ["prevent"])
			}, [g(o, { name: "info" })], 8, V)])
		])]))), 128))])]))), 128))]))]));
	}
}), [["__scopeId", "data-v-5a5d456b"]]);
export { H as default };

//# sourceMappingURL=WatchHistoryPage-CpL957yf.js.map