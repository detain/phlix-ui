import { n as e } from "./useApiBase-DXTBY90j.js";
import { t } from "./useImageSrc-CSM61b-l.js";
import { t as n } from "./useMessages-skYe1O45.js";
import { t as r } from "./client-BLNUsFSj.js";
import { t as i } from "./EmptyState-DjfWh3kt.js";
import { t as a } from "./Spinner-DnXYep7x.js";
import { t as ee } from "./Button-Dfl4y6vO.js";
import { n as o, t as s } from "./Icon-55iG1rR7.js";
import { t as te } from "./useToastStore-CxO_ppM8.js";
import { r as ne } from "./useProfileStore-CoE5xdUn.js";
import { r as re } from "./useResolvePlayable-CnOPgUvz.js";
import { i as ie } from "./usePlayerStore-BpohCwDP.js";
import { t as ae } from "./mediaTypeIcon-CNNqtg-w.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, normalizeStyle as oe, onMounted as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, watch as se, withCtx as C, withModifiers as w } from "vue";
import { useRouter as T } from "vue-router";
// src/pages/WatchHistoryPage.vue?vue&type=script&setup=true&lang.ts
var E = { class: "history-page" }, D = {
	key: 3,
	class: "history-groups"
}, O = { class: "history-group__date" }, k = { class: "history-group__items" }, A = ["href", "aria-label"], j = ["src", "alt"], M = {
	key: 1,
	class: "history-item__fallback"
}, N = ["aria-valuenow"], P = { class: "history-item__info" }, F = { class: "history-item__title" }, I = { class: "history-item__meta numeric" }, L = { class: "history-item__actions" }, R = ["aria-label", "onClick"], z = ["aria-label", "onClick"], B = /*#__PURE__*/ o(/* @__PURE__ */ g({
	__name: "WatchHistoryPage",
	props: { client: { default: null } },
	setup(o) {
		let g = o, B = T(), V = e(), { imgSrc: H } = t(), U = te(), { t: W } = n(), G = ie(), K = ne();
		function q() {
			return g.client ? g.client : new r({ baseUrl: V.value });
		}
		let J = y([]), Y = y(!1), X = y(null), ce = l(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of J.value) {
				let n = new Date(t.updated_at).toISOString().split("T")[0];
				e.has(n) || e.set(n, []), e.get(n).push(t);
			}
			return Array.from(e.entries()).sort(([e], [t]) => t.localeCompare(e)).map(([e, t]) => ({
				date: e,
				items: t
			}));
		});
		function le(e) {
			let t = new Date(e), n = /* @__PURE__ */ new Date(), r = new Date(n);
			return r.setDate(r.getDate() - 1), e === n.toISOString().split("T")[0] ? "Today" : e === r.toISOString().split("T")[0] ? "Yesterday" : t.toLocaleDateString(void 0, {
				weekday: "long",
				month: "long",
				day: "numeric"
			});
		}
		async function Z() {
			Y.value = !0, X.value = null;
			try {
				let e = q();
				try {
					let t = await e.get("/api/v1/me/history");
					J.value = t.items ?? [];
					return;
				} catch {}
				let t = await e.get("/api/v1/me/progress");
				J.value = (t.items ?? []).filter((e) => e.progress > 0).map((e) => ({
					id: e.id,
					media: e.media,
					progress: e.progress,
					updated_at: e.updated_at
				}));
			} catch (e) {
				X.value = e instanceof Error ? e.message : "Failed to load watch history";
			} finally {
				Y.value = !1;
			}
		}
		function Q(e, t) {
			B?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function $(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ue(e) {
			try {
				let t = q(), n = await re(t, V.value, e, G.resumeMap);
				if (!n) {
					U.info(W("library.nothingToPlay"));
					return;
				}
				Q("player", n.id);
			} catch (e) {
				if ($(e)) return;
				U.info(W("library.nothingToPlay"));
			}
		}
		function de(e) {
			B?.hasRoute("media") ? Q("media", e.id) : U.info(W("common.detailsUnavailable", { name: e.name }));
		}
		function fe() {
			Z();
		}
		return _(() => {
			Z();
		}), se(() => K.epoch, () => {
			J.value = [], Z();
		}), (e, t) => (v(), f("div", E, [t[1] ||= p("div", { class: "history-header" }, [p("h1", { class: "history-title" }, "Watch history")], -1), Y.value && J.value.length === 0 ? (v(), u(a, {
			key: 0,
			label: "Loading watch history"
		})) : X.value ? (v(), u(i, {
			key: 1,
			icon: "alert",
			title: "Couldn’t load watch history",
			description: X.value
		}, {
			actions: C(() => [h(ee, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: fe
			}, {
				default: C(() => [...t[0] ||= [m("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : !Y.value && J.value.length === 0 ? (v(), u(i, {
			key: 2,
			icon: "film",
			title: "No watch history yet",
			description: "Titles you watch will appear here so you can easily pick up where you left off."
		})) : (v(), f("div", D, [(v(!0), f(c, null, b(ce.value, (e) => (v(), f("section", {
			key: e.date,
			class: "history-group"
		}, [p("h2", O, x(le(e.date)), 1), p("div", k, [(v(!0), f(c, null, b(e.items, (e) => (v(), f("article", {
			key: e.id,
			class: "history-item"
		}, [p("a", {
			href: `/app/media/${e.media.id}`,
			class: "history-item__poster",
			"aria-label": e.media.name
		}, [e.media.poster_url ? (v(), f("img", {
			key: 0,
			src: S(H)(e.media.poster_url),
			alt: e.media.name,
			loading: "lazy",
			decoding: "async"
		}, null, 8, j)) : (v(), f("div", M, [h(s, { name: S(ae)(e.media.type) }, null, 8, ["name"])])), e.progress > 0 ? (v(), f("div", {
			key: 2,
			class: "history-item__progress",
			role: "progressbar",
			"aria-valuenow": Math.round(e.progress * 100),
			"aria-valuemin": "0",
			"aria-valuemax": "100"
		}, [p("i", { style: oe({ width: `${e.progress * 100}%` }) }, null, 4)], 8, N)) : d("", !0)], 8, A), p("div", P, [
			p("h3", F, x(e.media.name), 1),
			p("p", I, [
				e.media.year ? (v(), f(c, { key: 0 }, [m(x(e.media.year), 1)], 64)) : d("", !0),
				e.media.year && e.media.runtime ? (v(), f(c, { key: 1 }, [m(" · ")], 64)) : d("", !0),
				e.media.runtime ? (v(), f(c, { key: 2 }, [m(x(e.media.runtime) + "m", 1)], 64)) : d("", !0)
			]),
			p("div", L, [p("button", {
				type: "button",
				class: "history-item__btn",
				"aria-label": `Play ${e.media.name}`,
				onClick: w((t) => ue(e.media), ["prevent"])
			}, [h(s, { name: "play" })], 8, R), p("button", {
				type: "button",
				class: "history-item__btn",
				"aria-label": `Info for ${e.media.name}`,
				onClick: w((t) => de(e.media), ["prevent"])
			}, [h(s, { name: "info" })], 8, z)])
		])]))), 128))])]))), 128))]))]));
	}
}), [["__scopeId", "data-v-e88b6d4a"]]);
export { B as default };

//# sourceMappingURL=WatchHistoryPage-DjYRk6NA.js.map