import { t as e } from "./useMessages-Ds_MGz5S.js";
import { T as t, t as n } from "./client-Bmlfq3Uy.js";
import { n as r } from "./useApiBase-DXTBY90j.js";
import { n as i, r as ee, t as te } from "./useMediaItemCache-B7dWHUPS.js";
import { i as ne } from "./usePageTitle-j6j9gAmo.js";
import { t as re } from "./useAuthStore-umb3Xeps.js";
import { t as a } from "./useToastStore-CxO_ppM8.js";
import { n as o } from "./ThumbRating-CPrtMc-8.js";
import { i as s } from "./usePlayerStore-BpohCwDP.js";
import { r as c } from "./useResolvePlayable-CnOPgUvz.js";
import { r as l, t as ie } from "./MediaCard-BKaLIWix.js";
import { t as u } from "./Button-Dfl4y6vO.js";
import { t as ae } from "./Modal-6aMhfOTF.js";
import { t as oe } from "./Spinner-BOeBa1zU.js";
import { t as d } from "./EmptyState-DjfWh3kt.js";
import { n as f, t as se } from "./Icon-55iG1rR7.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, onMounted as ce, openBlock as S, ref as C, renderList as le, toDisplayString as w, unref as T, watch as ue, withCtx as E } from "vue";
import { useRoute as de, useRouter as fe } from "vue-router";
// src/pages/PlaylistDetailPage.vue?vue&type=script&setup=true&lang.ts
var pe = { class: "playlist-detail" }, me = { class: "playlist-detail__head" }, he = { class: "playlist-detail__title" }, ge = { class: "playlist-detail__count" }, _e = { class: "playlist-detail__actions" }, D = {
	key: 2,
	class: "playlist-detail__readonly"
}, O = {
	key: 1,
	class: "playlist-detail__grid"
}, k = [
	"aria-label",
	"disabled",
	"onClick"
], A = 6, j = /*#__PURE__*/ f(/* @__PURE__ */ x({
	__name: "PlaylistDetailPage",
	props: { client: {} },
	setup(f) {
		let { t: x } = e(), j = f;
		function M() {
			return j.client ?? new n({ baseUrl: F.value });
		}
		let N = de(), P = fe(), F = r(), I = a(), L = re(), R = o(), ve = s(), z = m(() => V.value ? l(V.value.created_by, L.user?.id ?? null, L.isAdmin) : !1), B = m(() => String(N.params.id ?? "")), V = C(null), H = C([]), U = C(!0), W = C(null), G = C(/* @__PURE__ */ new Set()), K = C(!1), q = C(!1);
		ne(() => V.value ? `${V.value.name} · Playlists` : null);
		async function ye(e, t, n) {
			let r = 0, i = Array.from({ length: Math.min(t, e.length) }, async () => {
				for (; r < e.length;) await n(e[r++]);
			});
			await Promise.all(i);
		}
		async function J() {
			let e = B.value;
			if (e) {
				U.value = !0, W.value = null;
				try {
					let t = M(), n = await t.getPlaylist(e);
					V.value = n.collection, H.value = n.items.map((e) => ({
						id: e.id,
						name: e.name,
						type: e.type
					})), U.value = !1, await ye(n.items, A, async (e) => {
						let n = i(e.id);
						if (n && ee(n)) Y(e.id, n.item), R.hydrate(n.item);
						else try {
							let n = await t.get(`/api/v1/media/${encodeURIComponent(e.id)}`);
							te(e.id, n.item), Y(e.id, n.item), R.hydrate(n.item);
						} catch {}
					});
				} catch (e) {
					U.value &&= (W.value = t(e, x("playlist.loadError")), !1);
				}
			}
		}
		function Y(e, t) {
			let n = H.value.findIndex((t) => t.id === e);
			n >= 0 && H.value.splice(n, 1, t);
		}
		function X(e, t) {
			P?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let Z = null;
		function be(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function Q(e) {
			Z?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			Z = t;
			let n = () => t !== Z;
			try {
				let r = M(), i = await c(r, F.value, e, ve.resumeMap, t?.signal);
				if (n()) return;
				if (!i) {
					I.info(x("library.nothingToPlay"));
					return;
				}
				X("player", i.id);
			} catch (e) {
				if (n() || be(e)) return;
				I.info(x("library.nothingToPlay"));
			}
		}
		function xe(e) {
			P?.hasRoute("media") ? X("media", e.id) : I.info(x("common.detailsUnavailable", { name: e.name }));
		}
		function Se() {
			let e = H.value[0];
			e && Q(e);
		}
		function Ce(e) {
			R.isFavorite(e.id) ? I.success(x("itemActions.addedToList", { name: e.name })) : I.info(x("itemActions.removedFromList", { name: e.name }));
		}
		function $(e) {
			R.isWatched(e.id) ? I.success(x("library.markedWatched", { name: e.name })) : I.info(x("library.markedUnwatched", { name: e.name }));
		}
		async function we(e) {
			let n = V.value;
			if (n && z.value && !G.value.has(e.id)) {
				G.value = new Set(G.value).add(e.id);
				try {
					await M().removeFromPlaylist(n.id, e.id);
					let t = H.value.findIndex((t) => t.id === e.id);
					H.value = H.value.filter((t) => t.id !== e.id), I.success(x("playlist.removed", { name: e.name }), { action: {
						label: x("playlist.undo"),
						onClick: () => void Te(n.id, e, t)
					} });
				} catch (e) {
					I.error(x("playlist.removeFailed"), { message: t(e) });
				} finally {
					let t = new Set(G.value);
					t.delete(e.id), G.value = t;
				}
			}
		}
		async function Te(e, n, r) {
			try {
				if (await M().addToPlaylist(e, n.id), V.value?.id !== e || H.value.some((e) => e.id === n.id)) return;
				let t = H.value.slice();
				t.splice(Math.min(Math.max(r, 0), t.length), 0, n), H.value = t;
			} catch (e) {
				I.error(x("playlist.restoreFailed"), { message: t(e) });
			}
		}
		async function Ee() {
			let e = V.value;
			if (e && z.value && !q.value) {
				q.value = !0;
				try {
					await M().deletePlaylist(e.id), I.success(x("playlist.deleted", { name: e.name })), K.value = !1, P?.hasRoute("playlists") && P.replace({ name: "playlists" });
				} catch (e) {
					I.error(x("playlist.deleteFailed"), { message: t(e) });
				} finally {
					q.value = !1;
				}
			}
		}
		return ue(B, () => void J()), ce(() => void J()), (e, t) => (S(), _("div", pe, [U.value ? (S(), h(oe, {
			key: 0,
			label: T(x)("playlist.loading")
		}, null, 8, ["label"])) : W.value ? (S(), h(d, {
			key: 1,
			icon: "alert",
			title: T(x)("playlist.loadErrorTitle"),
			description: W.value
		}, {
			actions: E(() => [b(u, {
				variant: "solid",
				size: "sm",
				"left-icon": "refresh",
				onClick: J
			}, {
				default: E(() => [y(w(T(x)("common.retry")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : V.value ? (S(), _(p, { key: 2 }, [v("header", me, [v("div", null, [v("h1", he, w(V.value.name), 1), v("p", ge, w(T(x)("playlist.itemsCount", { count: H.value.length })), 1)]), v("div", _e, [H.value.length ? (S(), h(u, {
			key: 0,
			variant: "solid",
			size: "sm",
			"left-icon": "play",
			onClick: Se
		}, {
			default: E(() => [y(w(T(x)("playlist.play")), 1)]),
			_: 1
		})) : g("", !0), z.value ? (S(), h(u, {
			key: 1,
			variant: "ghost",
			size: "sm",
			onClick: t[0] ||= (e) => K.value = !0
		}, {
			default: E(() => [y(w(T(x)("playlist.delete")), 1)]),
			_: 1
		})) : (S(), _("p", D, w(T(x)("playlist.readOnly")), 1))])]), H.value.length === 0 ? (S(), h(d, {
			key: 0,
			icon: "list",
			title: T(x)("playlist.emptyTitle"),
			description: z.value ? T(x)("playlist.emptyHintManage") : T(x)("playlist.emptyHintReadOnly")
		}, null, 8, ["title", "description"])) : (S(), _("ul", O, [(S(!0), _(p, null, le(H.value, (e) => (S(), _("li", {
			key: e.id,
			class: "playlist-detail__cell"
		}, [b(ie, {
			item: e,
			onPlay: Q,
			onInfo: xe,
			onWatchlist: Ce,
			onMarkWatched: $
		}, null, 8, ["item"]), z.value ? (S(), _("button", {
			key: 0,
			type: "button",
			class: "playlist-detail__remove",
			"aria-label": T(x)("playlist.removeAria", { name: e.name }),
			disabled: G.value.has(e.id),
			onClick: (t) => we(e)
		}, [b(se, { name: "x" }), v("span", null, w(T(x)("itemActions.remove")), 1)], 8, k)) : g("", !0)]))), 128))]))], 64)) : g("", !0), z.value ? (S(), h(ae, {
			key: 3,
			"model-value": K.value,
			title: T(x)("playlist.delete"),
			size: "sm",
			"onUpdate:modelValue": t[2] ||= (e) => K.value = e
		}, {
			footer: E(() => [b(u, {
				variant: "ghost",
				size: "sm",
				onClick: t[1] ||= (e) => K.value = !1
			}, {
				default: E(() => [y(w(T(x)("confirm.cancel")), 1)]),
				_: 1
			}), b(u, {
				variant: "danger",
				size: "sm",
				loading: q.value,
				onClick: Ee
			}, {
				default: E(() => [y(w(T(x)("playlist.confirmDelete")), 1)]),
				_: 1
			}, 8, ["loading"])]),
			default: E(() => [v("p", null, w(T(x)("playlist.deleteConfirm", {
				name: V.value?.name ?? "",
				items: T(x)("playlist.itemsCount", { count: H.value.length })
			})), 1)]),
			_: 1
		}, 8, ["model-value", "title"])) : g("", !0)]));
	}
}), [["__scopeId", "data-v-6f0ff083"]]);
export { j as default };

//# sourceMappingURL=PlaylistDetailPage-N7Xf8Pcg.js.map