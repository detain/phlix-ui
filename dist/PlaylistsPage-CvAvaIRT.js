import { n as e, t } from "./Icon-CIwTuFLd.js";
import { t as n, y as r } from "./client-BoMeMmx0.js";
import { n as i } from "./useApiBase-CV_r-Kk4.js";
import { t as a } from "./Spinner-CTxXRV7r.js";
import { t as o } from "./EmptyState-BAyOxAcK.js";
import { t as s } from "./Button-BuG0GvCa.js";
import { i as c } from "./usePageTitle-BO3GGF3M.js";
import { Fragment as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, onMounted as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, withCtx as S } from "vue";
import { useRouter as C } from "vue-router";
//#region src/pages/PlaylistsPage.vue?vue&type=script&setup=true&lang.ts
var w = { class: "playlists-page" }, T = {
	key: 3,
	class: "playlists-page__grid"
}, E = ["aria-label", "onClick"], D = { class: "playlist-tile__art" }, O = ["title"], k = {
	key: 0,
	class: "playlist-tile__meta"
}, A = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "PlaylistsPage",
	props: { client: {} },
	setup(e) {
		let g = e, A = i();
		function j() {
			return g.client ?? new n({ baseUrl: A.value });
		}
		let M = C();
		c(() => "Playlists");
		let N = y([]), P = y(!0), F = y(null);
		async function I() {
			P.value = !0, F.value = null;
			try {
				N.value = (await j().getPlaylists()).sort((e, t) => (t.updated_at ?? "").localeCompare(e.updated_at ?? ""));
			} catch (e) {
				F.value = r(e, "Failed to load playlists.");
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
		return _(() => void I()), (e, n) => (v(), f("div", w, [n[2] ||= p("header", { class: "playlists-page__head" }, [p("h1", { class: "playlists-page__title" }, "Playlists"), p("p", { class: "playlists-page__hint" }, " Add any title to a playlist from its ⋯ menu; your playlists collect here. ")], -1), P.value ? (v(), u(a, {
			key: 0,
			label: "Loading playlists…"
		})) : F.value ? (v(), u(o, {
			key: 1,
			icon: "alert",
			title: "Couldn’t load playlists",
			description: F.value
		}, {
			actions: S(() => [h(s, {
				variant: "solid",
				size: "sm",
				"left-icon": "refresh",
				onClick: I
			}, {
				default: S(() => [...n[0] ||= [m("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : N.value.length === 0 ? (v(), u(o, {
			key: 2,
			icon: "list",
			title: "No playlists yet",
			description: "Open any title’s menu and choose “Add to playlist” to create your first one."
		}, {
			actions: S(() => [h(s, {
				variant: "ghost",
				size: "sm",
				onClick: R
			}, {
				default: S(() => [...n[1] ||= [m("Browse titles", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (v(), f("ul", T, [(v(!0), f(l, null, b(N.value, (e) => (v(), f("li", { key: e.id }, [p("button", {
			type: "button",
			class: "playlist-tile",
			"aria-label": `Open playlist ${e.name}`,
			onClick: (t) => L(e)
		}, [
			p("span", D, [h(t, { name: "list" })]),
			p("span", {
				class: "playlist-tile__name",
				title: e.name
			}, x(e.name), 9, O),
			e.updated_at ? (v(), f("span", k, " Updated " + x(e.updated_at.slice(0, 10)), 1)) : d("", !0)
		], 8, E)]))), 128))]))]));
	}
}), [["__scopeId", "data-v-fb5ff965"]]);
//#endregion
export { A as default };

//# sourceMappingURL=PlaylistsPage-CvAvaIRT.js.map