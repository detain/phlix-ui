import { n as e, t } from "./Icon-CIwTuFLd.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./useMessages-OTo-5xOb.js";
import { t as i, y as a } from "./client-DdVqCKVh.js";
import { n as ee } from "./useApiBase-CV_r-Kk4.js";
import { t as te } from "./useAuthStore-Bi1-VYV4.js";
import { t as ne } from "./useToastStore-DIWpaCOl.js";
import { t as re } from "./Spinner-DNw3jstB.js";
import { t as o } from "./EmptyState-BAyOxAcK.js";
import { t as s } from "./Button-BuG0GvCa.js";
import { i as ie } from "./usePageTitle-BO3GGF3M.js";
import { t as c } from "./Modal-2Qr50B3R.js";
import { r as l, t as u } from "./MediaCard-DTXMqpVg.js";
import { n as d, r as ae, t as f } from "./useMediaItemCache-BKCJnCbr.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, onMounted as oe, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, watch as D, withCtx as O } from "vue";
import { useRoute as se, useRouter as ce } from "vue-router";
//#region src/pages/PlaylistDetailPage.vue?vue&type=script&setup=true&lang.ts
var le = { class: "playlist-detail" }, ue = { class: "playlist-detail__head" }, k = { class: "playlist-detail__title" }, A = { class: "playlist-detail__count" }, j = { class: "playlist-detail__actions" }, M = {
	key: 1,
	class: "playlist-detail__readonly"
}, N = {
	key: 1,
	class: "playlist-detail__grid"
}, P = [
	"aria-label",
	"disabled",
	"onClick"
], F = 6, I = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "PlaylistDetailPage",
	props: { client: {} },
	setup(e) {
		let { t: x } = r(), I = e;
		function L() {
			return I.client ?? new i({ baseUrl: B.value });
		}
		let R = se(), z = ce(), B = ee(), V = ne(), H = te(), U = m(() => G.value ? l(G.value.created_by, H.user?.id ?? null, H.isAdmin) : !1), W = m(() => String(R.params.id ?? "")), G = C(null), K = C([]), q = C(!0), J = C(null), Y = C(/* @__PURE__ */ new Set()), X = C(!1), Z = C(!1);
		ie(() => G.value ? `${G.value.name} · Playlists` : null);
		async function de(e, t, n) {
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
					let t = L(), n = await t.getPlaylist(e);
					G.value = n.collection, K.value = n.items.map((e) => ({
						id: e.id,
						name: e.name,
						type: e.type
					})), q.value = !1, await de(n.items, F, async (e) => {
						let n = d(e.id);
						if (n && ae(n)) {
							$(e.id, n.item);
							return;
						}
						try {
							let n = await t.get(`/api/v1/media/${encodeURIComponent(e.id)}`);
							f(e.id, n.item), $(e.id, n.item);
						} catch {}
					});
				} catch (e) {
					q.value &&= (J.value = a(e, "Failed to load this playlist."), !1);
				}
			}
		}
		function $(e, t) {
			let n = K.value.findIndex((t) => t.id === e);
			n >= 0 && K.value.splice(n, 1, t);
		}
		async function fe(e) {
			let t = G.value;
			if (!(!t || !U.value || Y.value.has(e.id))) {
				Y.value = new Set(Y.value).add(e.id);
				try {
					await L().removeFromPlaylist(t.id, e.id), K.value = K.value.filter((t) => t.id !== e.id), V.success(`Removed “${e.name}” from the playlist`);
				} catch (e) {
					V.error("Failed to remove from playlist", { message: a(e) });
				} finally {
					let t = new Set(Y.value);
					t.delete(e.id), Y.value = t;
				}
			}
		}
		async function pe() {
			let e = G.value;
			if (!(!e || !U.value || Z.value)) {
				Z.value = !0;
				try {
					await L().deletePlaylist(e.id), V.success(`Playlist “${e.name}” deleted`), X.value = !1, z?.hasRoute("playlists") && z.replace({ name: "playlists" });
				} catch (e) {
					V.error("Failed to delete playlist", { message: a(e) });
				} finally {
					Z.value = !1;
				}
			}
		}
		return D(W, () => void Q()), oe(() => void Q()), (e, r) => (S(), _("div", le, [q.value ? (S(), h(re, {
			key: 0,
			label: "Loading playlist…"
		})) : J.value ? (S(), h(o, {
			key: 1,
			icon: "alert",
			title: E(x)("playlist.loadError"),
			description: J.value
		}, {
			actions: O(() => [b(s, {
				variant: "solid",
				size: "sm",
				"left-icon": "refresh",
				onClick: Q
			}, {
				default: O(() => [...r[3] ||= [y("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : G.value ? (S(), _(p, { key: 2 }, [v("header", ue, [v("div", null, [v("h1", k, T(G.value.name), 1), v("p", A, T(E(n)(K.value.length, "item", "items")), 1)]), v("div", j, [U.value ? (S(), h(s, {
			key: 0,
			variant: "ghost",
			size: "sm",
			onClick: r[0] ||= (e) => X.value = !0
		}, {
			default: O(() => [...r[4] ||= [y("Delete playlist", -1)]]),
			_: 1
		})) : (S(), _("p", M, "Shared playlist — only its owner (or an admin) can change it."))])]), K.value.length === 0 ? (S(), h(o, {
			key: 0,
			icon: "list",
			title: "This playlist is empty",
			description: U.value ? "Add titles from any card’s ⋯ menu — “Add to playlist”." : "Titles can only be added by the playlist’s owner."
		}, null, 8, ["description"])) : (S(), _("ul", N, [(S(!0), _(p, null, w(K.value, (e) => (S(), _("li", {
			key: e.id,
			class: "playlist-detail__cell"
		}, [b(u, { item: e }, null, 8, ["item"]), U.value ? (S(), _("button", {
			key: 0,
			type: "button",
			class: "playlist-detail__remove",
			"aria-label": `Remove ${e.name} from playlist`,
			disabled: Y.value.has(e.id),
			onClick: (t) => fe(e)
		}, [b(t, { name: "x" }), r[5] ||= v("span", null, "Remove", -1)], 8, P)) : g("", !0)]))), 128))]))], 64)) : g("", !0), U.value ? (S(), h(c, {
			key: 3,
			"model-value": X.value,
			title: "Delete playlist",
			size: "sm",
			"onUpdate:modelValue": r[2] ||= (e) => X.value = e
		}, {
			footer: O(() => [b(s, {
				variant: "ghost",
				size: "sm",
				onClick: r[1] ||= (e) => X.value = !1
			}, {
				default: O(() => [...r[7] ||= [y("Cancel", -1)]]),
				_: 1
			}), b(s, {
				variant: "danger",
				size: "sm",
				loading: Z.value,
				onClick: pe
			}, {
				default: O(() => [...r[8] ||= [y(" Delete ", -1)]]),
				_: 1
			}, 8, ["loading"])]),
			default: O(() => [v("p", null, [
				r[6] ||= y(" Delete playlist ", -1),
				v("strong", null, T(G.value?.name), 1),
				y(" (" + T(E(n)(K.value.length, "item", "items")) + ")? This cannot be undone. ", 1)
			])]),
			_: 1
		}, 8, ["model-value"])) : g("", !0)]));
	}
}), [["__scopeId", "data-v-7e97a0e1"]]);
//#endregion
export { I as default };

//# sourceMappingURL=PlaylistDetailPage-Dyo-If57.js.map