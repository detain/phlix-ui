import { t as e } from "./useMessages-B2u5b6BQ.js";
import { n as t, t as n } from "./SyncPlayModal-DGc-JQv-.js";
import { t as r } from "./useToastStore-Bu-iYU7r.js";
import { n as ee } from "./useApiBase-DXTBY90j.js";
import { t as i } from "./Button-1sKEdGjj.js";
import { n as a, t as o } from "./Icon-CIbfiPrs.js";
import { t as s } from "./Spinner-BYaiRNqs.js";
import { t as c } from "./Card-C8ekyPJB.js";
import { Fragment as te, computed as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, normalizeClass as ne, onMounted as re, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as y, withCtx as b } from "vue";
import { useRoute as x, useRouter as S } from "vue-router";
// src/pages/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var C = { class: "syncplay-page" }, w = { class: "syncplay-page__header" }, T = { class: "syncplay-page__title-row" }, E = { class: "syncplay-page__title" }, D = {
	key: 0,
	class: "syncplay-page__loading",
	role: "status",
	"aria-busy": "true"
}, O = {
	key: 1,
	class: "syncplay-page__error",
	role: "alert"
}, k = { class: "syncplay-page__error-text" }, A = {
	key: 2,
	class: "syncplay-page__section"
}, j = { class: "syncplay-page__section-title" }, M = { class: "syncplay-page__room" }, N = { class: "syncplay-page__room-info" }, P = { class: "syncplay-page__room-name" }, F = { class: "syncplay-page__room-meta" }, I = { class: "syncplay-page__room-status" }, ie = { class: "syncplay-page__members" }, L = { class: "syncplay-page__members-title" }, R = { class: "syncplay-page__member-list" }, z = { class: "syncplay-page__member-avatar" }, B = { class: "syncplay-page__member-name" }, V = { class: "syncplay-page__member-role" }, H = {
	key: 3,
	class: "syncplay-page__empty"
}, U = { class: "syncplay-page__empty-text" }, W = { class: "syncplay-page__empty-hint" }, G = { class: "syncplay-page__empty-actions" }, K = /*#__PURE__*/ a(/* @__PURE__ */ m({
	__name: "SyncPlayPage",
	setup(a) {
		let { t: m } = e(), K = t(), q = r(), J = ee(), Y = x(), ae = S(), X = g(!1), Z = g(void 0), Q = l(() => J.value);
		function oe(e) {
			switch (e) {
				case "owner": return m("syncplay.roleOwner");
				case "editor": return m("syncplay.roleEditor");
				case "contributor": return m("syncplay.roleContributor");
				case "none": return m("syncplay.roleMember");
				default: return e;
			}
		}
		let se = l(() => {
			switch (K.syncStatus) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		}), ce = l(() => {
			switch (K.syncStatus) {
				case "synced": return m("syncplay.synced");
				case "outOfSync": return m("syncplay.outOfSync");
				case "re-syncing": return m("syncplay.reSyncing");
				default: return m("syncplay.synced");
			}
		});
		async function le() {
			K.isInRoom && K.currentRoom && (await K.refreshState(Q.value), await K.refreshMembers(Q.value));
		}
		re(() => {
			le();
			let e = Y.query.room;
			e && e.trim() && (Z.value = e.trim(), X.value = !0);
		});
		async function $() {
			K.currentRoom && await K.leaveRoom(Q.value);
		}
		function ue(e) {
			if (q.success(m("syncplay.joinedRoom", { name: e.name })), Z.value = void 0, Y.query.room !== void 0) {
				let { room: e, ...t } = Y.query;
				ae.replace({ query: t });
			}
		}
		return (e, t) => (h(), u("div", C, [
			d("header", w, [d("div", T, [d("h1", E, v(y(m)("syncplay.syncPlay")), 1), p(i, {
				variant: "solid",
				onClick: t[0] ||= (e) => X.value = !0
			}, {
				default: b(() => [p(o, { name: "plus" }), f(" " + v(y(m)("syncplay.createRoom")), 1)]),
				_: 1
			})])]),
			y(K).isLoading ? (h(), u("div", D, [p(s, { label: y(m)("syncplay.loading") }, null, 8, ["label"])])) : y(K).error ? (h(), u("div", O, [
				p(o, {
					name: "error",
					class: "syncplay-page__error-icon"
				}),
				d("p", k, v(y(K).error), 1),
				p(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[1] ||= (e) => y(K).clearError()
				}, {
					default: b(() => [f(v(y(m)("common.dismiss")), 1)]),
					_: 1
				})
			])) : y(K).isInRoom ? (h(), u("section", A, [
				d("h2", j, v(y(m)("syncplay.currentRoom")), 1),
				p(c, {
					class: "syncplay-page__room-card",
					padding: !1
				}, {
					default: b(() => [d("div", M, [d("div", N, [p(o, {
						name: "user",
						class: "syncplay-page__room-icon"
					}), d("div", null, [d("p", P, v(y(K).currentRoom?.name), 1), d("p", F, v(y(m)("syncplay.members", { count: y(K).members.length })), 1)])]), d("div", I, [d("span", { class: ne(["syncplay-page__status-badge", `syncplay-page__status-badge--${y(K).syncStatus}`]) }, [p(o, {
						name: se.value,
						size: "sm"
					}, null, 8, ["name"]), f(" " + v(ce.value), 1)], 2), p(i, {
						variant: "ghost",
						size: "sm",
						onClick: $
					}, {
						default: b(() => [f(v(y(m)("syncplay.leaveRoom")), 1)]),
						_: 1
					})])])]),
					_: 1
				}),
				d("div", ie, [d("h3", L, v(y(m)("syncplay.members", { count: y(K).members.length })), 1), d("ul", R, [(h(!0), u(te, null, _(y(K).members, (e) => (h(), u("li", {
					key: e.id,
					class: "syncplay-page__member"
				}, [
					d("span", z, v(e.name.charAt(0).toUpperCase() ?? "?"), 1),
					d("span", B, v(e.name), 1),
					d("span", V, v(oe(e.role)), 1)
				]))), 128))])])
			])) : (h(), u("div", H, [
				p(o, {
					name: "user",
					class: "syncplay-page__empty-icon"
				}),
				d("p", U, v(y(m)("syncplay.notInRoom")), 1),
				d("p", W, v(y(m)("syncplay.notInRoomHint")), 1),
				d("div", G, [p(i, {
					variant: "solid",
					onClick: t[2] ||= (e) => X.value = !0
				}, {
					default: b(() => [p(o, { name: "plus" }), f(" " + v(y(m)("syncplay.createRoom")), 1)]),
					_: 1
				})])
			])),
			p(n, {
				modelValue: X.value,
				"onUpdate:modelValue": t[3] ||= (e) => X.value = e,
				"prefilled-room-id": Z.value,
				onJoined: ue
			}, null, 8, ["modelValue", "prefilled-room-id"])
		]));
	}
}), [["__scopeId", "data-v-987e2038"]]);
export { K as default };

//# sourceMappingURL=SyncPlayPage-sg5s1_41.js.map