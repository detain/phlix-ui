import { n as e, t } from "./Icon-CIwTuFLd.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { t as r, y as i } from "./client-CRZ_SWB1.js";
import { n as ee } from "./useApiBase-CV_r-Kk4.js";
import { t as a } from "./useAuthStore-BbS6J1QF.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Spinner-0jozIVj_.js";
import { t as c } from "./EmptyState-BAyOxAcK.js";
import { t as l } from "./Button-BuG0GvCa.js";
import { i as u } from "./usePageTitle-BO3GGF3M.js";
import { t as te } from "./Modal-DctA70AT.js";
import { r as d, t as ne } from "./MediaCard-Dcx6wey-.js";
import { n as re, r as ie, t as ae } from "./useMediaItemCache-BKCJnCbr.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, onMounted as oe, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, watch as E, withCtx as D } from "vue";
import { useRoute as se, useRouter as ce } from "vue-router";
//#region src/pages/PlaylistDetailPage.vue?vue&type=script&setup=true&lang.ts
var O = { class: "playlist-detail" }, k = { class: "playlist-detail__head" }, A = { class: "playlist-detail__title" }, j = { class: "playlist-detail__count" }, M = { class: "playlist-detail__actions" }, N = {
	key: 1,
	class: "playlist-detail__readonly"
}, P = {
	key: 1,
	class: "playlist-detail__grid"
}, F = [
	"aria-label",
	"disabled",
	"onClick"
], I = 6, L = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "PlaylistDetailPage",
	props: { client: {} },
	setup(e) {
		let b = e;
		function L() {
			return b.client ?? new r({ baseUrl: B.value });
		}
		let R = se(), z = ce(), B = ee(), V = o(), H = a(), U = p(() => G.value ? d(G.value.created_by, H.user?.id ?? null, H.isAdmin) : !1), W = p(() => String(R.params.id ?? "")), G = S(null), K = S([]), q = S(!0), J = S(null), Y = S(/* @__PURE__ */ new Set()), X = S(!1), Z = S(!1);
		u(() => G.value ? `${G.value.name} · Playlists` : null);
		async function le(e, t, n) {
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
					})), q.value = !1, await le(n.items, I, async (e) => {
						let n = re(e.id);
						if (n && ie(n)) {
							$(e.id, n.item);
							return;
						}
						try {
							let n = await t.get(`/api/v1/media/${encodeURIComponent(e.id)}`);
							ae(e.id, n.item), $(e.id, n.item);
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
		async function ue(e) {
			let t = G.value;
			if (!(!t || !U.value || Y.value.has(e.id))) {
				Y.value = new Set(Y.value).add(e.id);
				try {
					await L().removeFromPlaylist(t.id, e.id), K.value = K.value.filter((t) => t.id !== e.id), V.success(`Removed “${e.name}” from the playlist`);
				} catch (e) {
					V.error("Failed to remove from playlist", { message: i(e) });
				} finally {
					let t = new Set(Y.value);
					t.delete(e.id), Y.value = t;
				}
			}
		}
		async function de() {
			let e = G.value;
			if (!(!e || !U.value || Z.value)) {
				Z.value = !0;
				try {
					await L().deletePlaylist(e.id), V.success(`Playlist “${e.name}” deleted`), X.value = !1, z?.hasRoute("playlists") && z.replace({ name: "playlists" });
				} catch (e) {
					V.error("Failed to delete playlist", { message: i(e) });
				} finally {
					Z.value = !1;
				}
			}
		}
		return E(W, () => void Q()), oe(() => void Q()), (e, r) => (x(), g("div", O, [q.value ? (x(), m(s, {
			key: 0,
			label: "Loading playlist…"
		})) : J.value ? (x(), m(c, {
			key: 1,
			icon: "alert",
			title: "Couldn’t load this playlist",
			description: J.value
		}, {
			actions: D(() => [y(l, {
				variant: "solid",
				size: "sm",
				"left-icon": "refresh",
				onClick: Q
			}, {
				default: D(() => [...r[3] ||= [v("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : G.value ? (x(), g(f, { key: 2 }, [_("header", k, [_("div", null, [_("h1", A, w(G.value.name), 1), _("p", j, w(T(n)(K.value.length, "item", "items")), 1)]), _("div", M, [U.value ? (x(), m(l, {
			key: 0,
			variant: "ghost",
			size: "sm",
			onClick: r[0] ||= (e) => X.value = !0
		}, {
			default: D(() => [...r[4] ||= [v("Delete playlist", -1)]]),
			_: 1
		})) : (x(), g("p", N, "Shared playlist — only its owner (or an admin) can change it."))])]), K.value.length === 0 ? (x(), m(c, {
			key: 0,
			icon: "list",
			title: "This playlist is empty",
			description: U.value ? "Add titles from any card’s ⋯ menu — “Add to playlist”." : "Titles can only be added by the playlist’s owner."
		}, null, 8, ["description"])) : (x(), g("ul", P, [(x(!0), g(f, null, C(K.value, (e) => (x(), g("li", {
			key: e.id,
			class: "playlist-detail__cell"
		}, [y(ne, { item: e }, null, 8, ["item"]), U.value ? (x(), g("button", {
			key: 0,
			type: "button",
			class: "playlist-detail__remove",
			"aria-label": `Remove ${e.name} from playlist`,
			disabled: Y.value.has(e.id),
			onClick: (t) => ue(e)
		}, [y(t, { name: "x" }), r[5] ||= _("span", null, "Remove", -1)], 8, F)) : h("", !0)]))), 128))]))], 64)) : h("", !0), U.value ? (x(), m(te, {
			key: 3,
			"model-value": X.value,
			title: "Delete playlist",
			size: "sm",
			"onUpdate:modelValue": r[2] ||= (e) => X.value = e
		}, {
			footer: D(() => [y(l, {
				variant: "ghost",
				size: "sm",
				onClick: r[1] ||= (e) => X.value = !1
			}, {
				default: D(() => [...r[7] ||= [v("Cancel", -1)]]),
				_: 1
			}), y(l, {
				variant: "danger",
				size: "sm",
				loading: Z.value,
				onClick: de
			}, {
				default: D(() => [...r[8] ||= [v(" Delete ", -1)]]),
				_: 1
			}, 8, ["loading"])]),
			default: D(() => [_("p", null, [
				r[6] ||= v(" Delete playlist ", -1),
				_("strong", null, w(G.value?.name), 1),
				v(" (" + w(T(n)(K.value.length, "item", "items")) + ")? This cannot be undone. ", 1)
			])]),
			_: 1
		}, 8, ["model-value"])) : h("", !0)]));
	}
}), [["__scopeId", "data-v-4d256de5"]]);
//#endregion
export { L as default };

//# sourceMappingURL=PlaylistDetailPage-YjOlu3RZ.js.map