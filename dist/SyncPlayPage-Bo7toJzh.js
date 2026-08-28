import { n as e, t } from "./Icon-CkTBN_k5.js";
import { t as n } from "./useMessages-CMi9c10n.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Spinner-COUSlhgo.js";
import { t as a } from "./Button-Cw8Wl4QR.js";
import { t as o } from "./Card-CwUrlHI3.js";
import { n as s, t as c } from "./SyncPlayModal-Cwa6nF0M.js";
import { Fragment as l, computed as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, normalizeClass as g, onMounted as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, withCtx as C } from "vue";
import { useRoute as w, useRouter as T } from "vue-router";
//#region src/pages/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var E = { class: "syncplay-page" }, D = { class: "syncplay-page__header" }, O = { class: "syncplay-page__title-row" }, k = { class: "syncplay-page__title" }, A = {
	key: 0,
	class: "syncplay-page__loading",
	role: "status",
	"aria-busy": "true"
}, j = {
	key: 1,
	class: "syncplay-page__error",
	role: "alert"
}, M = { class: "syncplay-page__error-text" }, N = {
	key: 2,
	class: "syncplay-page__section"
}, P = { class: "syncplay-page__room" }, F = { class: "syncplay-page__room-info" }, I = { class: "syncplay-page__room-name" }, L = { class: "syncplay-page__room-meta" }, R = { class: "syncplay-page__room-status" }, z = { class: "syncplay-page__members" }, te = { class: "syncplay-page__members-title" }, B = { class: "syncplay-page__member-list" }, V = { class: "syncplay-page__member-avatar" }, H = { class: "syncplay-page__member-name" }, U = { class: "syncplay-page__member-role" }, W = {
	key: 3,
	class: "syncplay-page__empty"
}, G = { class: "syncplay-page__empty-actions" }, K = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "SyncPlayPage",
	setup(e) {
		let { t: h } = n(), K = s(), q = ee(), J = r(), Y = w(), X = T(), Z = y(!1), Q = y(void 0), $ = u(() => J.value);
		function ne(e) {
			switch (e) {
				case "owner": return h("syncplay.roleOwner");
				case "editor": return h("syncplay.roleModerator");
				case "contributor": return h("syncplay.roleMember");
				case "none": return h("syncplay.roleMember");
				default: return e;
			}
		}
		let re = u(() => {
			switch (K.syncStatus) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		}), ie = u(() => {
			switch (K.syncStatus) {
				case "synced": return h("syncplay.synced");
				case "outOfSync": return h("syncplay.outOfSync");
				case "re-syncing": return h("syncplay.reSyncing");
				default: return h("syncplay.synced");
			}
		});
		async function ae() {
			K.isInRoom && K.currentRoom && (await K.refreshState($.value), await K.refreshMembers($.value));
		}
		_(() => {
			ae();
			let e = Y.query.room;
			e && e.trim() && (Q.value = e.trim(), Z.value = !0);
		});
		async function oe() {
			K.currentRoom && await K.leaveRoom($.value);
		}
		function se(e) {
			if (q.success(h("syncplay.joinedRoom", { name: e.name })), Q.value = void 0, Y.query.room !== void 0) {
				let { room: e, ...t } = Y.query;
				X.replace({ query: t });
			}
		}
		return (e, n) => (v(), d("div", E, [
			f("header", D, [f("div", O, [f("h1", k, x(S(h)("syncplay.syncPlay")), 1), m(a, {
				variant: "solid",
				onClick: n[0] ||= (e) => Z.value = !0
			}, {
				default: C(() => [m(t, { name: "plus" }), p(" " + x(S(h)("syncplay.createRoom")), 1)]),
				_: 1
			})])]),
			S(K).isLoading ? (v(), d("div", A, [m(i, { label: S(h)("syncplay.loading") }, null, 8, ["label"])])) : S(K).error ? (v(), d("div", j, [
				m(t, {
					name: "error",
					class: "syncplay-page__error-icon"
				}),
				f("p", M, x(S(K).error), 1),
				m(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[1] ||= (e) => S(K).clearError()
				}, {
					default: C(() => [p(x(S(h)("common.dismiss")), 1)]),
					_: 1
				})
			])) : S(K).isInRoom ? (v(), d("section", N, [
				n[4] ||= f("h2", { class: "syncplay-page__section-title" }, "Current Room", -1),
				m(o, {
					class: "syncplay-page__room-card",
					padding: !1
				}, {
					default: C(() => [f("div", P, [f("div", F, [m(t, {
						name: "user",
						class: "syncplay-page__room-icon"
					}), f("div", null, [f("p", I, x(S(K).currentRoom?.name), 1), f("p", L, x(S(h)("syncplay.members", { count: S(K).members.length })), 1)])]), f("div", R, [f("span", { class: g(["syncplay-page__status-badge", `syncplay-page__status-badge--${S(K).syncStatus}`]) }, [m(t, {
						name: re.value,
						size: "sm"
					}, null, 8, ["name"]), p(" " + x(ie.value), 1)], 2), m(a, {
						variant: "ghost",
						size: "sm",
						onClick: oe
					}, {
						default: C(() => [p(x(S(h)("syncplay.leaveRoom")), 1)]),
						_: 1
					})])])]),
					_: 1
				}),
				f("div", z, [f("h3", te, x(S(h)("syncplay.members", { count: S(K).members.length })), 1), f("ul", B, [(v(!0), d(l, null, b(S(K).members, (e) => (v(), d("li", {
					key: e.id,
					class: "syncplay-page__member"
				}, [
					f("span", V, x(e.name.charAt(0).toUpperCase() ?? "?"), 1),
					f("span", H, x(e.name), 1),
					f("span", U, x(ne(e.role)), 1)
				]))), 128))])])
			])) : (v(), d("div", W, [
				m(t, {
					name: "user",
					class: "syncplay-page__empty-icon"
				}),
				n[5] ||= f("p", { class: "syncplay-page__empty-text" }, "You're not in a SyncPlay room", -1),
				n[6] ||= f("p", { class: "syncplay-page__empty-hint" }, "Create or join a room to watch together with others.", -1),
				f("div", G, [m(a, {
					variant: "solid",
					onClick: n[2] ||= (e) => Z.value = !0
				}, {
					default: C(() => [m(t, { name: "plus" }), p(" " + x(S(h)("syncplay.createRoom")), 1)]),
					_: 1
				})])
			])),
			m(c, {
				modelValue: Z.value,
				"onUpdate:modelValue": n[3] ||= (e) => Z.value = e,
				"prefilled-room-id": Q.value,
				onJoined: se
			}, null, 8, ["modelValue", "prefilled-room-id"])
		]));
	}
}), [["__scopeId", "data-v-a4e52ce6"]]);
//#endregion
export { K as default };

//# sourceMappingURL=SyncPlayPage-Bo7toJzh.js.map