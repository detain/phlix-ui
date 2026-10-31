import { t as e, x as t } from "./client-57OweUrJ.js";
import { n } from "./useApiBase-DXTBY90j.js";
import { i as r } from "./usePageTitle-j6j9gAmo.js";
import { t as i } from "./Button-1sKEdGjj.js";
import { n as a, t as o } from "./Icon-CIbfiPrs.js";
import { t as s } from "./EmptyState-BjOJ1k_A.js";
import { t as c } from "./Spinner-zawWdcUT.js";
import { Fragment as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, onMounted as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, withCtx as S } from "vue";
import { useRouter as C } from "vue-router";
// src/pages/PlaylistsPage.vue?vue&type=script&setup=true&lang.ts
var w = { class: "playlists-page" }, T = {
	key: 3,
	class: "playlists-page__grid"
}, E = ["aria-label", "onClick"], D = { class: "playlist-tile__art" }, O = ["title"], k = {
	key: 0,
	class: "playlist-tile__meta"
}, A = /*#__PURE__*/ a(/* @__PURE__ */ g({
	__name: "PlaylistsPage",
	props: { client: {} },
	setup(a) {
		let g = a, A = n();
		function j() {
			return g.client ?? new e({ baseUrl: A.value });
		}
		let M = C();
		r(() => "Playlists");
		let N = y([]), P = y(!0), F = y(null);
		async function I() {
			P.value = !0, F.value = null;
			try {
				N.value = (await j().getPlaylists()).sort((e, t) => (t.updated_at ?? "").localeCompare(e.updated_at ?? ""));
			} catch (e) {
				F.value = t(e, "Failed to load playlists.");
			} finally {
				P.value = !1;
			}
		}
		function L(e) {
			M?.hasRoute("playlist") && M.push({
				name: "playlist",
				params: { id: e.id }
			});
		}
		function R() {
			M?.hasRoute("browse") && M.push({ name: "browse" });
		}
		return _(() => void I()), (e, t) => (v(), f("div", w, [t[2] ||= p("header", { class: "playlists-page__head" }, [p("h1", { class: "playlists-page__title" }, "Playlists"), p("p", { class: "playlists-page__hint" }, " Add any title to a playlist from its ⋯ menu; your playlists collect here. ")], -1), P.value ? (v(), u(c, {
			key: 0,
			label: "Loading playlists…"
		})) : F.value ? (v(), u(s, {
			key: 1,
			icon: "alert",
			title: "Couldn’t load playlists",
			description: F.value
		}, {
			actions: S(() => [h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "refresh",
				onClick: I
			}, {
				default: S(() => [...t[0] ||= [m("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : N.value.length === 0 ? (v(), u(s, {
			key: 2,
			icon: "list",
			title: "No playlists yet",
			description: "Open any title’s menu and choose “Add to playlist” to create your first one."
		}, {
			actions: S(() => [h(i, {
				variant: "ghost",
				size: "sm",
				onClick: R
			}, {
				default: S(() => [...t[1] ||= [m("Browse titles", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (v(), f("ul", T, [(v(!0), f(l, null, b(N.value, (e) => (v(), f("li", { key: e.id }, [p("button", {
			type: "button",
			class: "playlist-tile",
			"aria-label": `Open playlist ${e.name}`,
			onClick: (t) => L(e)
		}, [
			p("span", D, [h(o, { name: "list" })]),
			p("span", {
				class: "playlist-tile__name",
				title: e.name
			}, x(e.name), 9, O),
			e.updated_at ? (v(), f("span", k, " Updated " + x(e.updated_at.slice(0, 10)), 1)) : d("", !0)
		], 8, E)]))), 128))]))]));
	}
}), [["__scopeId", "data-v-fb5ff965"]]);
export { A as default };

//# sourceMappingURL=PlaylistsPage-B6qASeUT.js.map