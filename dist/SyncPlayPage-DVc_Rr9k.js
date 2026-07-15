import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { t as n } from "./useMessages-Cbrqh0Aa.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./Spinner-DjAfI4qB.js";
import { t as a } from "./Button-DGsvHynO.js";
import { t as o } from "./Card-BvLj4L6F.js";
import { n as s, t as c } from "./SyncPlayModal-S29l4ViK.js";
import { Fragment as l, computed as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, normalizeClass as g, onMounted as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, withCtx as C } from "vue";
import { useRoute as w } from "vue-router";
//#region src/pages/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var T = { class: "syncplay-page" }, E = { class: "syncplay-page__header" }, D = { class: "syncplay-page__title-row" }, O = { class: "syncplay-page__title" }, k = {
	key: 0,
	class: "syncplay-page__loading",
	role: "status",
	"aria-busy": "true"
}, A = {
	key: 1,
	class: "syncplay-page__error",
	role: "alert"
}, j = { class: "syncplay-page__error-text" }, M = {
	key: 2,
	class: "syncplay-page__section"
}, N = { class: "syncplay-page__room" }, P = { class: "syncplay-page__room-info" }, F = { class: "syncplay-page__room-name" }, ee = { class: "syncplay-page__room-meta" }, I = { class: "syncplay-page__room-status" }, L = { class: "syncplay-page__members" }, R = { class: "syncplay-page__members-title" }, z = { class: "syncplay-page__member-list" }, B = { class: "syncplay-page__member-avatar" }, V = { class: "syncplay-page__member-name" }, H = { class: "syncplay-page__member-role" }, U = {
	key: 3,
	class: "syncplay-page__empty"
}, W = { class: "syncplay-page__empty-actions" }, G = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "SyncPlayPage",
	setup(e) {
		let { t: h } = n(), G = s(), K = r(), q = w(), J = y(!1), Y = y(void 0), X = u(() => K.value);
		function Z(e) {
			switch (e) {
				case "owner": return h("syncplay.roleOwner");
				case "editor": return h("syncplay.roleModerator");
				case "contributor": return h("syncplay.roleMember");
				case "none": return h("syncplay.roleMember");
				default: return e;
			}
		}
		let Q = u(() => {
			switch (G.syncStatus) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		}), $ = u(() => {
			switch (G.syncStatus) {
				case "synced": return h("syncplay.synced");
				case "outOfSync": return h("syncplay.outOfSync");
				case "re-syncing": return h("syncplay.reSyncing");
				default: return h("syncplay.synced");
			}
		});
		async function te() {
			G.isInRoom && G.currentRoom && (await G.refreshState(X.value), await G.refreshMembers(X.value));
		}
		_(() => {
			te();
			let e = q.query.room;
			e && e.trim() && (Y.value = e.trim(), J.value = !0);
		});
		async function ne() {
			G.currentRoom && await G.leaveRoom(X.value);
		}
		return (e, n) => (v(), d("div", T, [
			f("header", E, [f("div", D, [f("h1", O, x(S(h)("syncplay.syncPlay")), 1), m(a, {
				variant: "solid",
				onClick: n[0] ||= (e) => J.value = !0
			}, {
				default: C(() => [m(t, { name: "plus" }), p(" " + x(S(h)("syncplay.createRoom")), 1)]),
				_: 1
			})])]),
			S(G).isLoading ? (v(), d("div", k, [m(i, { label: S(h)("syncplay.loading") }, null, 8, ["label"])])) : S(G).error ? (v(), d("div", A, [
				m(t, {
					name: "error",
					class: "syncplay-page__error-icon"
				}),
				f("p", j, x(S(G).error), 1),
				m(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[1] ||= (e) => S(G).clearError()
				}, {
					default: C(() => [p(x(S(h)("common.dismiss")), 1)]),
					_: 1
				})
			])) : S(G).isInRoom ? (v(), d("section", M, [
				n[4] ||= f("h2", { class: "syncplay-page__section-title" }, "Current Room", -1),
				m(o, {
					class: "syncplay-page__room-card",
					padding: !1
				}, {
					default: C(() => [f("div", N, [f("div", P, [m(t, {
						name: "user",
						class: "syncplay-page__room-icon"
					}), f("div", null, [f("p", F, x(S(G).currentRoom?.name), 1), f("p", ee, x(S(h)("syncplay.members", { count: S(G).members.length })), 1)])]), f("div", I, [f("span", { class: g(["syncplay-page__status-badge", `syncplay-page__status-badge--${S(G).syncStatus}`]) }, [m(t, {
						name: Q.value,
						size: "sm"
					}, null, 8, ["name"]), p(" " + x($.value), 1)], 2), m(a, {
						variant: "ghost",
						size: "sm",
						onClick: ne
					}, {
						default: C(() => [p(x(S(h)("syncplay.leaveRoom")), 1)]),
						_: 1
					})])])]),
					_: 1
				}),
				f("div", L, [f("h3", R, x(S(h)("syncplay.members", { count: S(G).members.length })), 1), f("ul", z, [(v(!0), d(l, null, b(S(G).members, (e) => (v(), d("li", {
					key: e.id,
					class: "syncplay-page__member"
				}, [
					f("span", B, x(e.name.charAt(0).toUpperCase() ?? "?"), 1),
					f("span", V, x(e.name), 1),
					f("span", H, x(Z(e.role)), 1)
				]))), 128))])])
			])) : (v(), d("div", U, [
				m(t, {
					name: "user",
					class: "syncplay-page__empty-icon"
				}),
				n[5] ||= f("p", { class: "syncplay-page__empty-text" }, "You're not in a SyncPlay room", -1),
				n[6] ||= f("p", { class: "syncplay-page__empty-hint" }, "Create or join a room to watch together with others.", -1),
				f("div", W, [m(a, {
					variant: "solid",
					onClick: n[2] ||= (e) => J.value = !0
				}, {
					default: C(() => [m(t, { name: "plus" }), p(" " + x(S(h)("syncplay.createRoom")), 1)]),
					_: 1
				})])
			])),
			m(c, {
				modelValue: J.value,
				"onUpdate:modelValue": n[3] ||= (e) => J.value = e,
				"prefilled-room-id": Y.value
			}, null, 8, ["modelValue", "prefilled-room-id"])
		]));
	}
}), [["__scopeId", "data-v-b3e6f812"]]);
//#endregion
export { G as default };

//# sourceMappingURL=SyncPlayPage-DVc_Rr9k.js.map