import { n as e, t } from "./Icon-CIwTuFLd.js";
import { t as n } from "./useMessages-OTo-5xOb.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as ee } from "./useToastStore-DIWpaCOl.js";
import { t as i } from "./Spinner-DNw3jstB.js";
import { t as a } from "./Button-BuG0GvCa.js";
import { t as o } from "./Card-C0oCA93l.js";
import { n as s, t as c } from "./SyncPlayModal-DfFPHG9f.js";
import { Fragment as te, computed as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, normalizeClass as h, onMounted as ne, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, withCtx as x } from "vue";
import { useRoute as S, useRouter as C } from "vue-router";
//#region src/pages/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var w = { class: "syncplay-page" }, T = { class: "syncplay-page__header" }, E = { class: "syncplay-page__title-row" }, D = { class: "syncplay-page__title" }, O = {
	key: 0,
	class: "syncplay-page__loading",
	role: "status",
	"aria-busy": "true"
}, k = {
	key: 1,
	class: "syncplay-page__error",
	role: "alert"
}, A = { class: "syncplay-page__error-text" }, j = {
	key: 2,
	class: "syncplay-page__section"
}, M = { class: "syncplay-page__section-title" }, N = { class: "syncplay-page__room" }, P = { class: "syncplay-page__room-info" }, F = { class: "syncplay-page__room-name" }, I = { class: "syncplay-page__room-meta" }, L = { class: "syncplay-page__room-status" }, re = { class: "syncplay-page__members" }, R = { class: "syncplay-page__members-title" }, z = { class: "syncplay-page__member-list" }, B = { class: "syncplay-page__member-avatar" }, V = { class: "syncplay-page__member-name" }, H = { class: "syncplay-page__member-role" }, U = {
	key: 3,
	class: "syncplay-page__empty"
}, W = { class: "syncplay-page__empty-text" }, G = { class: "syncplay-page__empty-hint" }, K = { class: "syncplay-page__empty-actions" }, q = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "SyncPlayPage",
	setup(e) {
		let { t: m } = n(), q = s(), J = ee(), Y = r(), X = S(), ie = C(), Z = _(!1), Q = _(void 0), $ = l(() => Y.value);
		function ae(e) {
			switch (e) {
				case "owner": return m("syncplay.roleOwner");
				case "editor": return m("syncplay.roleEditor");
				case "contributor": return m("syncplay.roleContributor");
				case "none": return m("syncplay.roleMember");
				default: return e;
			}
		}
		let oe = l(() => {
			switch (q.syncStatus) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		}), se = l(() => {
			switch (q.syncStatus) {
				case "synced": return m("syncplay.synced");
				case "outOfSync": return m("syncplay.outOfSync");
				case "re-syncing": return m("syncplay.reSyncing");
				default: return m("syncplay.synced");
			}
		});
		async function ce() {
			q.isInRoom && q.currentRoom && (await q.refreshState($.value), await q.refreshMembers($.value));
		}
		ne(() => {
			ce();
			let e = X.query.room;
			e && e.trim() && (Q.value = e.trim(), Z.value = !0);
		});
		async function le() {
			q.currentRoom && await q.leaveRoom($.value);
		}
		function ue(e) {
			if (J.success(m("syncplay.joinedRoom", { name: e.name })), Q.value = void 0, X.query.room !== void 0) {
				let { room: e, ...t } = X.query;
				ie.replace({ query: t });
			}
		}
		return (e, n) => (g(), u("div", w, [
			d("header", T, [d("div", E, [d("h1", D, y(b(m)("syncplay.syncPlay")), 1), p(a, {
				variant: "solid",
				onClick: n[0] ||= (e) => Z.value = !0
			}, {
				default: x(() => [p(t, { name: "plus" }), f(" " + y(b(m)("syncplay.createRoom")), 1)]),
				_: 1
			})])]),
			b(q).isLoading ? (g(), u("div", O, [p(i, { label: b(m)("syncplay.loading") }, null, 8, ["label"])])) : b(q).error ? (g(), u("div", k, [
				p(t, {
					name: "error",
					class: "syncplay-page__error-icon"
				}),
				d("p", A, y(b(q).error), 1),
				p(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[1] ||= (e) => b(q).clearError()
				}, {
					default: x(() => [f(y(b(m)("common.dismiss")), 1)]),
					_: 1
				})
			])) : b(q).isInRoom ? (g(), u("section", j, [
				d("h2", M, y(b(m)("syncplay.currentRoom")), 1),
				p(o, {
					class: "syncplay-page__room-card",
					padding: !1
				}, {
					default: x(() => [d("div", N, [d("div", P, [p(t, {
						name: "user",
						class: "syncplay-page__room-icon"
					}), d("div", null, [d("p", F, y(b(q).currentRoom?.name), 1), d("p", I, y(b(m)("syncplay.members", { count: b(q).members.length })), 1)])]), d("div", L, [d("span", { class: h(["syncplay-page__status-badge", `syncplay-page__status-badge--${b(q).syncStatus}`]) }, [p(t, {
						name: oe.value,
						size: "sm"
					}, null, 8, ["name"]), f(" " + y(se.value), 1)], 2), p(a, {
						variant: "ghost",
						size: "sm",
						onClick: le
					}, {
						default: x(() => [f(y(b(m)("syncplay.leaveRoom")), 1)]),
						_: 1
					})])])]),
					_: 1
				}),
				d("div", re, [d("h3", R, y(b(m)("syncplay.members", { count: b(q).members.length })), 1), d("ul", z, [(g(!0), u(te, null, v(b(q).members, (e) => (g(), u("li", {
					key: e.id,
					class: "syncplay-page__member"
				}, [
					d("span", B, y(e.name.charAt(0).toUpperCase() ?? "?"), 1),
					d("span", V, y(e.name), 1),
					d("span", H, y(ae(e.role)), 1)
				]))), 128))])])
			])) : (g(), u("div", U, [
				p(t, {
					name: "user",
					class: "syncplay-page__empty-icon"
				}),
				d("p", W, y(b(m)("syncplay.notInRoom")), 1),
				d("p", G, y(b(m)("syncplay.notInRoomHint")), 1),
				d("div", K, [p(a, {
					variant: "solid",
					onClick: n[2] ||= (e) => Z.value = !0
				}, {
					default: x(() => [p(t, { name: "plus" }), f(" " + y(b(m)("syncplay.createRoom")), 1)]),
					_: 1
				})])
			])),
			p(c, {
				modelValue: Z.value,
				"onUpdate:modelValue": n[3] ||= (e) => Z.value = e,
				"prefilled-room-id": Q.value,
				onJoined: ue
			}, null, 8, ["modelValue", "prefilled-room-id"])
		]));
	}
}), [["__scopeId", "data-v-987e2038"]]);
//#endregion
export { q as default };

//# sourceMappingURL=SyncPlayPage-BxyAg_zX.js.map