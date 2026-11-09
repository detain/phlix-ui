import { t as e } from "./useMessages-D54Bje5m.js";
import { t, w as n } from "./client-DJuRD7ph.js";
import { n as r } from "./useApiBase-DXTBY90j.js";
import { n as i, r as a, t as ee } from "./useMediaItemCache-B7dWHUPS.js";
import { i as te } from "./usePageTitle-j6j9gAmo.js";
import { t as ne } from "./useAuthStore-CDQJKrDd.js";
import { t as re } from "./useToastStore-CxO_ppM8.js";
import { n as ie } from "./ThumbRating-DR_X8bqw.js";
import { i as ae } from "./usePlayerStore-BpohCwDP.js";
import { r as oe } from "./useResolvePlayable-CnOPgUvz.js";
import { a as o } from "./plural-B3O2rVPV.js";
import { r as se, t as s } from "./MediaCard-Bs55W3HF.js";
import { t as c } from "./Button-Dfl4y6vO.js";
import { t as ce } from "./Modal-DZDXQwbG.js";
import { t as l } from "./Spinner-B2VaMLVN.js";
import { t as u } from "./EmptyState-DjfWh3kt.js";
import { n as d, t as f } from "./Icon-55iG1rR7.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, onMounted as le, openBlock as S, ref as C, renderList as ue, toDisplayString as w, unref as T, watch as E, withCtx as D } from "vue";
import { useRoute as de, useRouter as fe } from "vue-router";
// src/pages/PlaylistDetailPage.vue?vue&type=script&setup=true&lang.ts
var pe = { class: "playlist-detail" }, me = { class: "playlist-detail__head" }, he = { class: "playlist-detail__title" }, ge = { class: "playlist-detail__count" }, _e = { class: "playlist-detail__actions" }, O = {
	key: 2,
	class: "playlist-detail__readonly"
}, k = {
	key: 1,
	class: "playlist-detail__grid"
}, A = [
	"aria-label",
	"disabled",
	"onClick"
], j = 6, M = /*#__PURE__*/ d(/* @__PURE__ */ x({
	__name: "PlaylistDetailPage",
	props: { client: {} },
	setup(d) {
		let { t: x } = e(), M = d;
		function N() {
			return M.client ?? new t({ baseUrl: I.value });
		}
		let P = de(), F = fe(), I = r(), L = re(), R = ne(), z = ie(), ve = ae(), B = m(() => H.value ? se(H.value.created_by, R.user?.id ?? null, R.isAdmin) : !1), V = m(() => String(P.params.id ?? "")), H = C(null), U = C([]), W = C(!0), G = C(null), K = C(/* @__PURE__ */ new Set()), q = C(!1), J = C(!1);
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
		async function $(e) {
			Q?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			Q = t;
			let n = () => t !== Q;
			try {
				let r = N(), i = await oe(r, I.value, e, ve.resumeMap, t?.signal);
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
		function xe(e) {
			F?.hasRoute("media") ? Z("media", e.id) : L.info(x("common.detailsUnavailable", { name: e.name }));
		}
		function Se() {
			let e = U.value[0];
			e && $(e);
		}
		function Ce(e) {
			z.isFavorite(e.id) ? L.success(x("itemActions.addedToList", { name: e.name })) : L.info(x("itemActions.removedFromList", { name: e.name }));
		}
		function we(e) {
			z.isWatched(e.id) ? L.success(`Marked “${e.name}” as watched.`) : L.info(`Marked “${e.name}” as unwatched.`);
		}
		async function Te(e) {
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
		async function Ee() {
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
		return E(V, () => void Y()), le(() => void Y()), (e, t) => (S(), _("div", pe, [W.value ? (S(), h(l, {
			key: 0,
			label: "Loading playlist…"
		})) : G.value ? (S(), h(u, {
			key: 1,
			icon: "alert",
			title: T(x)("playlist.loadErrorTitle"),
			description: G.value
		}, {
			actions: D(() => [b(c, {
				variant: "solid",
				size: "sm",
				"left-icon": "refresh",
				onClick: Y
			}, {
				default: D(() => [...t[3] ||= [y("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : H.value ? (S(), _(p, { key: 2 }, [v("header", me, [v("div", null, [v("h1", he, w(H.value.name), 1), v("p", ge, w(T(o)(U.value.length, "item", "items")), 1)]), v("div", _e, [U.value.length ? (S(), h(c, {
			key: 0,
			variant: "solid",
			size: "sm",
			"left-icon": "play",
			onClick: Se
		}, {
			default: D(() => [...t[4] ||= [y("Play", -1)]]),
			_: 1
		})) : g("", !0), B.value ? (S(), h(c, {
			key: 1,
			variant: "ghost",
			size: "sm",
			onClick: t[0] ||= (e) => q.value = !0
		}, {
			default: D(() => [...t[5] ||= [y("Delete playlist", -1)]]),
			_: 1
		})) : (S(), _("p", O, "Shared playlist — only its owner (or an admin) can change it."))])]), U.value.length === 0 ? (S(), h(u, {
			key: 0,
			icon: "list",
			title: "This playlist is empty",
			description: B.value ? "Add titles from any card’s ⋯ menu — “Add to playlist”." : "Titles can only be added by the playlist’s owner."
		}, null, 8, ["description"])) : (S(), _("ul", k, [(S(!0), _(p, null, ue(U.value, (e) => (S(), _("li", {
			key: e.id,
			class: "playlist-detail__cell"
		}, [b(s, {
			item: e,
			onPlay: $,
			onInfo: xe,
			onWatchlist: Ce,
			onMarkWatched: we
		}, null, 8, ["item"]), B.value ? (S(), _("button", {
			key: 0,
			type: "button",
			class: "playlist-detail__remove",
			"aria-label": `Remove ${e.name} from playlist`,
			disabled: K.value.has(e.id),
			onClick: (t) => Te(e)
		}, [b(f, { name: "x" }), t[6] ||= v("span", null, "Remove", -1)], 8, A)) : g("", !0)]))), 128))]))], 64)) : g("", !0), B.value ? (S(), h(ce, {
			key: 3,
			"model-value": q.value,
			title: "Delete playlist",
			size: "sm",
			"onUpdate:modelValue": t[2] ||= (e) => q.value = e
		}, {
			footer: D(() => [b(c, {
				variant: "ghost",
				size: "sm",
				onClick: t[1] ||= (e) => q.value = !1
			}, {
				default: D(() => [...t[8] ||= [y("Cancel", -1)]]),
				_: 1
			}), b(c, {
				variant: "danger",
				size: "sm",
				loading: J.value,
				onClick: Ee
			}, {
				default: D(() => [...t[9] ||= [y(" Delete ", -1)]]),
				_: 1
			}, 8, ["loading"])]),
			default: D(() => [v("p", null, [
				t[7] ||= y(" Delete playlist ", -1),
				v("strong", null, w(H.value?.name), 1),
				y(" (" + w(T(o)(U.value.length, "item", "items")) + ")? This cannot be undone. ", 1)
			])]),
			_: 1
		}, 8, ["model-value"])) : g("", !0)]));
	}
}), [["__scopeId", "data-v-3ab71bb0"]]);
export { M as default };

//# sourceMappingURL=PlaylistDetailPage-bRQ4CiPH.js.map