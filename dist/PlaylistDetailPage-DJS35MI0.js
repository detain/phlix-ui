import { n as e, t } from "./Icon-CIwTuFLd.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { t as r, y as i } from "./client-CRZ_SWB1.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as ee } from "./Spinner-DsNwuQoy.js";
import { t as s } from "./EmptyState-BAyOxAcK.js";
import { t as c } from "./Button-BuG0GvCa.js";
import { i as l } from "./usePageTitle-BO3GGF3M.js";
import { t as u } from "./Modal-D0CvVyuE.js";
import { t as te } from "./MediaCard-B8fDLhcg.js";
import { n as ne, r as d, t as f } from "./useMediaItemCache-BKCJnCbr.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as re, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, onMounted as x, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, watch as D, withCtx as O } from "vue";
import { useRoute as k, useRouter as A } from "vue-router";
//#region src/pages/PlaylistDetailPage.vue?vue&type=script&setup=true&lang.ts
var j = { class: "playlist-detail" }, M = { class: "playlist-detail__head" }, N = { class: "playlist-detail__title" }, P = { class: "playlist-detail__count" }, F = { class: "playlist-detail__actions" }, I = {
	key: 1,
	class: "playlist-detail__grid"
}, L = [
	"aria-label",
	"disabled",
	"onClick"
], R = 6, z = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "PlaylistDetailPage",
	props: { client: {} },
	setup(e) {
		let b = e;
		function z() {
			return b.client ?? new r({ baseUrl: H.value });
		}
		let B = k(), V = A(), H = a(), U = o(), W = m(() => String(B.params.id ?? "")), G = C(null), K = C([]), q = C(!0), J = C(null), Y = C(/* @__PURE__ */ new Set()), X = C(!1), Z = C(!1);
		l(() => G.value ? `${G.value.name} · Playlists` : null);
		async function ie(e, t, n) {
			let r = 0, i = Array.from({ length: Math.min(t, e.length) }, async () => {
				for (; r < e.length;) await n(e[r++]);
			});
			await Promise.all(i);
		}
		async function Q() {
			let e = W.value;
			if (e) {
				q.value = !0, J.value = null;
				try {
					let t = z(), n = await t.getPlaylist(e);
					G.value = n.collection, K.value = n.items.map((e) => ({
						id: e.id,
						name: e.name,
						type: e.type
					})), q.value = !1, await ie(n.items, R, async (e) => {
						let n = ne(e.id);
						if (n && d(n)) {
							$(e.id, n.item);
							return;
						}
						try {
							let n = await t.get(`/api/v1/media/${encodeURIComponent(e.id)}`);
							f(e.id, n.item), $(e.id, n.item);
						} catch {}
					});
				} catch (e) {
					q.value &&= (J.value = i(e, "Failed to load this playlist."), !1);
				}
			}
		}
		function $(e, t) {
			let n = K.value.findIndex((t) => t.id === e);
			n >= 0 && K.value.splice(n, 1, t);
		}
		async function ae(e) {
			let t = G.value;
			if (!(!t || Y.value.has(e.id))) {
				Y.value = new Set(Y.value).add(e.id);
				try {
					await z().removeFromPlaylist(t.id, e.id), K.value = K.value.filter((t) => t.id !== e.id), U.success(`Removed “${e.name}” from the playlist`);
				} catch (e) {
					U.error("Failed to remove from playlist", { message: i(e) });
				} finally {
					let t = new Set(Y.value);
					t.delete(e.id), Y.value = t;
				}
			}
		}
		async function oe() {
			let e = G.value;
			if (!(!e || Z.value)) {
				Z.value = !0;
				try {
					await z().deletePlaylist(e.id), U.success(`Playlist “${e.name}” deleted`), X.value = !1, V?.hasRoute("playlists") && V.replace({ name: "playlists" });
				} catch (e) {
					U.error("Failed to delete playlist", { message: i(e) });
				} finally {
					Z.value = !1;
				}
			}
		}
		return D(W, () => void Q()), x(() => void Q()), (e, r) => (S(), g("div", j, [q.value ? (S(), h(ee, {
			key: 0,
			label: "Loading playlist…"
		})) : J.value ? (S(), h(s, {
			key: 1,
			icon: "alert",
			title: "Couldn’t load this playlist",
			description: J.value
		}, {
			actions: O(() => [y(c, {
				variant: "solid",
				size: "sm",
				"left-icon": "refresh",
				onClick: Q
			}, {
				default: O(() => [...r[3] ||= [v("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : G.value ? (S(), g(p, { key: 2 }, [_("header", M, [_("div", null, [_("h1", N, T(G.value.name), 1), _("p", P, T(E(n)(K.value.length, "item", "items")), 1)]), _("div", F, [y(c, {
			variant: "ghost",
			size: "sm",
			onClick: r[0] ||= (e) => X.value = !0
		}, {
			default: O(() => [...r[4] ||= [v("Delete playlist", -1)]]),
			_: 1
		})])]), K.value.length === 0 ? (S(), h(s, {
			key: 0,
			icon: "list",
			title: "This playlist is empty",
			description: "Add titles from any card’s ⋯ menu — “Add to playlist”."
		})) : (S(), g("ul", I, [(S(!0), g(p, null, w(K.value, (e) => (S(), g("li", {
			key: e.id,
			class: "playlist-detail__cell"
		}, [y(te, { item: e }, null, 8, ["item"]), _("button", {
			type: "button",
			class: "playlist-detail__remove",
			"aria-label": `Remove ${e.name} from playlist`,
			disabled: Y.value.has(e.id),
			onClick: (t) => ae(e)
		}, [y(t, { name: "x" }), r[5] ||= _("span", null, "Remove", -1)], 8, L)]))), 128))]))], 64)) : re("", !0), y(u, {
			"model-value": X.value,
			title: "Delete playlist",
			size: "sm",
			"onUpdate:modelValue": r[2] ||= (e) => X.value = e
		}, {
			footer: O(() => [y(c, {
				variant: "ghost",
				size: "sm",
				onClick: r[1] ||= (e) => X.value = !1
			}, {
				default: O(() => [...r[7] ||= [v("Cancel", -1)]]),
				_: 1
			}), y(c, {
				variant: "danger",
				size: "sm",
				loading: Z.value,
				onClick: oe
			}, {
				default: O(() => [...r[8] ||= [v(" Delete ", -1)]]),
				_: 1
			}, 8, ["loading"])]),
			default: O(() => [_("p", null, [
				r[6] ||= v(" Delete playlist ", -1),
				_("strong", null, T(G.value?.name), 1),
				v(" (" + T(E(n)(K.value.length, "item", "items")) + ")? This cannot be undone. ", 1)
			])]),
			_: 1
		}, 8, ["model-value"])]));
	}
}), [["__scopeId", "data-v-d6ee5200"]]);
//#endregion
export { z as default };

//# sourceMappingURL=PlaylistDetailPage-DJS35MI0.js.map