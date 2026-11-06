import { t as e } from "./useMessages-skYe1O45.js";
import { t, x as n } from "./client-BLNUsFSj.js";
import { n as r } from "./useApiBase-DXTBY90j.js";
import { n as i, r as a, t as ee } from "./useMediaItemCache-B7dWHUPS.js";
import { i as te } from "./usePageTitle-j6j9gAmo.js";
import { t as ne } from "./useAuthStore-W5z8oEAk.js";
import { t as re } from "./useToastStore-CxO_ppM8.js";
import { n as o } from "./ThumbRating-BHpXmeMX.js";
import { i as s } from "./usePlayerStore-BpohCwDP.js";
import { r as c } from "./useResolvePlayable-CnOPgUvz.js";
import { a as l } from "./plural-B3O2rVPV.js";
import { r as ie, t as ae } from "./MediaCard-BSC7YKBq.js";
import { t as u } from "./Button-Dfl4y6vO.js";
import { t as oe } from "./Modal-C7Pv2vAR.js";
import { t as se } from "./Spinner-DnXYep7x.js";
import { t as d } from "./EmptyState-DjfWh3kt.js";
import { n as f, t as ce } from "./Icon-55iG1rR7.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, onMounted as le, openBlock as S, ref as C, renderList as ue, toDisplayString as w, unref as T, watch as de, withCtx as E } from "vue";
import { useRoute as fe, useRouter as pe } from "vue-router";
// src/pages/PlaylistDetailPage.vue?vue&type=script&setup=true&lang.ts
var me = { class: "playlist-detail" }, he = { class: "playlist-detail__head" }, ge = { class: "playlist-detail__title" }, _e = { class: "playlist-detail__count" }, D = { class: "playlist-detail__actions" }, O = {
	key: 1,
	class: "playlist-detail__readonly"
}, k = {
	key: 1,
	class: "playlist-detail__grid"
}, A = [
	"aria-label",
	"disabled",
	"onClick"
], j = 6, M = /*#__PURE__*/ f(/* @__PURE__ */ x({
	__name: "PlaylistDetailPage",
	props: { client: {} },
	setup(f) {
		let { t: x } = e(), M = f;
		function N() {
			return M.client ?? new t({ baseUrl: I.value });
		}
		let P = fe(), F = pe(), I = r(), L = re(), R = ne(), z = o(), ve = s(), B = m(() => H.value ? ie(H.value.created_by, R.user?.id ?? null, R.isAdmin) : !1), V = m(() => String(P.params.id ?? "")), H = C(null), U = C([]), W = C(!0), G = C(null), K = C(/* @__PURE__ */ new Set()), q = C(!1), J = C(!1);
		te(() => H.value ? `${H.value.name} · Playlists` : null);
		async function ye(e, t, n) {
			let r = 0, i = Array.from({ length: Math.min(t, e.length) }, async () => {
				for (; r < e.length;) await n(e[r++]);
			});
			await Promise.all(i);
		}
		async function Y() {
			let e = V.value;
			if (e) {
				W.value = !0, G.value = null;
				try {
					let t = N(), n = await t.getPlaylist(e);
					H.value = n.collection, U.value = n.items.map((e) => ({
						id: e.id,
						name: e.name,
						type: e.type
					})), W.value = !1, await ye(n.items, j, async (e) => {
						let n = i(e.id);
						if (n && a(n)) X(e.id, n.item), z.hydrate(n.item);
						else try {
							let n = await t.get(`/api/v1/media/${encodeURIComponent(e.id)}`);
							ee(e.id, n.item), X(e.id, n.item), z.hydrate(n.item);
						} catch {}
					});
				} catch (e) {
					W.value &&= (G.value = n(e, "Failed to load this playlist."), !1);
				}
			}
		}
		function X(e, t) {
			let n = U.value.findIndex((t) => t.id === e);
			n >= 0 && U.value.splice(n, 1, t);
		}
		function Z(e, t) {
			F?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let Q = null;
		function be(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function xe(e) {
			Q?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			Q = t;
			let n = () => t !== Q;
			try {
				let r = N(), i = await c(r, I.value, e, ve.resumeMap, t?.signal);
				if (n()) return;
				if (!i) {
					L.info(x("library.nothingToPlay"));
					return;
				}
				Z("player", i.id);
			} catch (e) {
				if (n() || be(e)) return;
				L.info(x("library.nothingToPlay"));
			}
		}
		function Se(e) {
			F?.hasRoute("media") ? Z("media", e.id) : L.info(x("common.detailsUnavailable", { name: e.name }));
		}
		function Ce(e) {
			z.isFavorite(e.id) ? L.success(x("itemActions.addedToList", { name: e.name })) : L.info(x("itemActions.removedFromList", { name: e.name }));
		}
		function $(e) {
			z.isWatched(e.id) ? L.success(`Marked “${e.name}” as watched.`) : L.info(`Marked “${e.name}” as unwatched.`);
		}
		async function we(e) {
			let t = H.value;
			if (t && B.value && !K.value.has(e.id)) {
				K.value = new Set(K.value).add(e.id);
				try {
					await N().removeFromPlaylist(t.id, e.id), U.value = U.value.filter((t) => t.id !== e.id), L.success(`Removed “${e.name}” from the playlist.`);
				} catch (e) {
					L.error("Failed to remove from playlist.", { message: n(e) });
				} finally {
					let t = new Set(K.value);
					t.delete(e.id), K.value = t;
				}
			}
		}
		async function Te() {
			let e = H.value;
			if (e && B.value && !J.value) {
				J.value = !0;
				try {
					await N().deletePlaylist(e.id), L.success(`Playlist “${e.name}” deleted.`), q.value = !1, F?.hasRoute("playlists") && F.replace({ name: "playlists" });
				} catch (e) {
					L.error("Failed to delete playlist.", { message: n(e) });
				} finally {
					J.value = !1;
				}
			}
		}
		return de(V, () => void Y()), le(() => void Y()), (e, t) => (S(), _("div", me, [W.value ? (S(), h(se, {
			key: 0,
			label: "Loading playlist…"
		})) : G.value ? (S(), h(d, {
			key: 1,
			icon: "alert",
			title: T(x)("playlist.loadErrorTitle"),
			description: G.value
		}, {
			actions: E(() => [b(u, {
				variant: "solid",
				size: "sm",
				"left-icon": "refresh",
				onClick: Y
			}, {
				default: E(() => [...t[3] ||= [y("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : H.value ? (S(), _(p, { key: 2 }, [v("header", he, [v("div", null, [v("h1", ge, w(H.value.name), 1), v("p", _e, w(T(l)(U.value.length, "item", "items")), 1)]), v("div", D, [B.value ? (S(), h(u, {
			key: 0,
			variant: "ghost",
			size: "sm",
			onClick: t[0] ||= (e) => q.value = !0
		}, {
			default: E(() => [...t[4] ||= [y("Delete playlist", -1)]]),
			_: 1
		})) : (S(), _("p", O, "Shared playlist — only its owner (or an admin) can change it."))])]), U.value.length === 0 ? (S(), h(d, {
			key: 0,
			icon: "list",
			title: "This playlist is empty",
			description: B.value ? "Add titles from any card’s ⋯ menu — “Add to playlist”." : "Titles can only be added by the playlist’s owner."
		}, null, 8, ["description"])) : (S(), _("ul", k, [(S(!0), _(p, null, ue(U.value, (e) => (S(), _("li", {
			key: e.id,
			class: "playlist-detail__cell"
		}, [b(ae, {
			item: e,
			onPlay: xe,
			onInfo: Se,
			onWatchlist: Ce,
			onMarkWatched: $
		}, null, 8, ["item"]), B.value ? (S(), _("button", {
			key: 0,
			type: "button",
			class: "playlist-detail__remove",
			"aria-label": `Remove ${e.name} from playlist`,
			disabled: K.value.has(e.id),
			onClick: (t) => we(e)
		}, [b(ce, { name: "x" }), t[5] ||= v("span", null, "Remove", -1)], 8, A)) : g("", !0)]))), 128))]))], 64)) : g("", !0), B.value ? (S(), h(oe, {
			key: 3,
			"model-value": q.value,
			title: "Delete playlist",
			size: "sm",
			"onUpdate:modelValue": t[2] ||= (e) => q.value = e
		}, {
			footer: E(() => [b(u, {
				variant: "ghost",
				size: "sm",
				onClick: t[1] ||= (e) => q.value = !1
			}, {
				default: E(() => [...t[7] ||= [y("Cancel", -1)]]),
				_: 1
			}), b(u, {
				variant: "danger",
				size: "sm",
				loading: J.value,
				onClick: Te
			}, {
				default: E(() => [...t[8] ||= [y(" Delete ", -1)]]),
				_: 1
			}, 8, ["loading"])]),
			default: E(() => [v("p", null, [
				t[6] ||= y(" Delete playlist ", -1),
				v("strong", null, w(H.value?.name), 1),
				y(" (" + w(T(l)(U.value.length, "item", "items")) + ")? This cannot be undone. ", 1)
			])]),
			_: 1
		}, 8, ["model-value"])) : g("", !0)]));
	}
}), [["__scopeId", "data-v-d4d6da92"]]);
export { M as default };

//# sourceMappingURL=PlaylistDetailPage-3WPPq8Lu.js.map