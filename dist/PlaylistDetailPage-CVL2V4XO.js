import { t as e } from "./useMessages-DrceiftD.js";
import { t, x as n } from "./client-57OweUrJ.js";
import { n as r } from "./useApiBase-DXTBY90j.js";
import { n as i, r as ee, t as te } from "./useMediaItemCache-B7dWHUPS.js";
import { i as ne } from "./usePageTitle-j6j9gAmo.js";
import { t as re } from "./useAuthStore-D2ZmuYZO.js";
import { t as ie } from "./useToastStore-Bu-iYU7r.js";
import { a } from "./plural-B3O2rVPV.js";
import { r as ae, t as o } from "./MediaCard-BUj4DLfQ.js";
import { t as s } from "./Button-1sKEdGjj.js";
import { t as c } from "./Modal-BU4hJGBA.js";
import { t as l } from "./Spinner-zawWdcUT.js";
import { t as u } from "./EmptyState-BjOJ1k_A.js";
import { n as d, t as f } from "./Icon-CIbfiPrs.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, onMounted as oe, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, watch as D, withCtx as O } from "vue";
import { useRoute as se, useRouter as ce } from "vue-router";
// src/pages/PlaylistDetailPage.vue?vue&type=script&setup=true&lang.ts
var le = { class: "playlist-detail" }, ue = { class: "playlist-detail__head" }, de = { class: "playlist-detail__title" }, k = { class: "playlist-detail__count" }, A = { class: "playlist-detail__actions" }, j = {
	key: 1,
	class: "playlist-detail__readonly"
}, M = {
	key: 1,
	class: "playlist-detail__grid"
}, N = [
	"aria-label",
	"disabled",
	"onClick"
], P = 6, F = /*#__PURE__*/ d(/* @__PURE__ */ x({
	__name: "PlaylistDetailPage",
	props: { client: {} },
	setup(d) {
		let { t: x } = e(), F = d;
		function I() {
			return F.client ?? new t({ baseUrl: z.value });
		}
		let L = se(), R = ce(), z = r(), B = ie(), V = re(), H = m(() => W.value ? ae(W.value.created_by, V.user?.id ?? null, V.isAdmin) : !1), U = m(() => String(L.params.id ?? "")), W = C(null), G = C([]), K = C(!0), q = C(null), J = C(/* @__PURE__ */ new Set()), Y = C(!1), X = C(!1);
		ne(() => W.value ? `${W.value.name} · Playlists` : null);
		async function Z(e, t, n) {
			let r = 0, i = Array.from({ length: Math.min(t, e.length) }, async () => {
				for (; r < e.length;) await n(e[r++]);
			});
			await Promise.all(i);
		}
		async function Q() {
			let e = U.value;
			if (e) {
				K.value = !0, q.value = null;
				try {
					let t = I(), n = await t.getPlaylist(e);
					W.value = n.collection, G.value = n.items.map((e) => ({
						id: e.id,
						name: e.name,
						type: e.type
					})), K.value = !1, await Z(n.items, P, async (e) => {
						let n = i(e.id);
						if (n && ee(n)) $(e.id, n.item);
						else try {
							let n = await t.get(`/api/v1/media/${encodeURIComponent(e.id)}`);
							te(e.id, n.item), $(e.id, n.item);
						} catch {}
					});
				} catch (e) {
					K.value &&= (q.value = n(e, "Failed to load this playlist."), !1);
				}
			}
		}
		function $(e, t) {
			let n = G.value.findIndex((t) => t.id === e);
			n >= 0 && G.value.splice(n, 1, t);
		}
		async function fe(e) {
			let t = W.value;
			if (t && H.value && !J.value.has(e.id)) {
				J.value = new Set(J.value).add(e.id);
				try {
					await I().removeFromPlaylist(t.id, e.id), G.value = G.value.filter((t) => t.id !== e.id), B.success(`Removed “${e.name}” from the playlist.`);
				} catch (e) {
					B.error("Failed to remove from playlist.", { message: n(e) });
				} finally {
					let t = new Set(J.value);
					t.delete(e.id), J.value = t;
				}
			}
		}
		async function pe() {
			let e = W.value;
			if (e && H.value && !X.value) {
				X.value = !0;
				try {
					await I().deletePlaylist(e.id), B.success(`Playlist “${e.name}” deleted.`), Y.value = !1, R?.hasRoute("playlists") && R.replace({ name: "playlists" });
				} catch (e) {
					B.error("Failed to delete playlist.", { message: n(e) });
				} finally {
					X.value = !1;
				}
			}
		}
		return D(U, () => void Q()), oe(() => void Q()), (e, t) => (S(), _("div", le, [K.value ? (S(), h(l, {
			key: 0,
			label: "Loading playlist…"
		})) : q.value ? (S(), h(u, {
			key: 1,
			icon: "alert",
			title: E(x)("playlist.loadError"),
			description: q.value
		}, {
			actions: O(() => [b(s, {
				variant: "solid",
				size: "sm",
				"left-icon": "refresh",
				onClick: Q
			}, {
				default: O(() => [...t[3] ||= [y("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : W.value ? (S(), _(p, { key: 2 }, [v("header", ue, [v("div", null, [v("h1", de, T(W.value.name), 1), v("p", k, T(E(a)(G.value.length, "item", "items")), 1)]), v("div", A, [H.value ? (S(), h(s, {
			key: 0,
			variant: "ghost",
			size: "sm",
			onClick: t[0] ||= (e) => Y.value = !0
		}, {
			default: O(() => [...t[4] ||= [y("Delete playlist", -1)]]),
			_: 1
		})) : (S(), _("p", j, "Shared playlist — only its owner (or an admin) can change it."))])]), G.value.length === 0 ? (S(), h(u, {
			key: 0,
			icon: "list",
			title: "This playlist is empty",
			description: H.value ? "Add titles from any card’s ⋯ menu — “Add to playlist”." : "Titles can only be added by the playlist’s owner."
		}, null, 8, ["description"])) : (S(), _("ul", M, [(S(!0), _(p, null, w(G.value, (e) => (S(), _("li", {
			key: e.id,
			class: "playlist-detail__cell"
		}, [b(o, { item: e }, null, 8, ["item"]), H.value ? (S(), _("button", {
			key: 0,
			type: "button",
			class: "playlist-detail__remove",
			"aria-label": `Remove ${e.name} from playlist`,
			disabled: J.value.has(e.id),
			onClick: (t) => fe(e)
		}, [b(f, { name: "x" }), t[5] ||= v("span", null, "Remove", -1)], 8, N)) : g("", !0)]))), 128))]))], 64)) : g("", !0), H.value ? (S(), h(c, {
			key: 3,
			"model-value": Y.value,
			title: "Delete playlist",
			size: "sm",
			"onUpdate:modelValue": t[2] ||= (e) => Y.value = e
		}, {
			footer: O(() => [b(s, {
				variant: "ghost",
				size: "sm",
				onClick: t[1] ||= (e) => Y.value = !1
			}, {
				default: O(() => [...t[7] ||= [y("Cancel", -1)]]),
				_: 1
			}), b(s, {
				variant: "danger",
				size: "sm",
				loading: X.value,
				onClick: pe
			}, {
				default: O(() => [...t[8] ||= [y(" Delete ", -1)]]),
				_: 1
			}, 8, ["loading"])]),
			default: O(() => [v("p", null, [
				t[6] ||= y(" Delete playlist ", -1),
				v("strong", null, T(W.value?.name), 1),
				y(" (" + T(E(a)(G.value.length, "item", "items")) + ")? This cannot be undone. ", 1)
			])]),
			_: 1
		}, 8, ["model-value"])) : g("", !0)]));
	}
}), [["__scopeId", "data-v-843036a5"]]);
export { F as default };

//# sourceMappingURL=PlaylistDetailPage-CVL2V4XO.js.map