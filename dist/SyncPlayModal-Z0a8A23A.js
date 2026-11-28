import { t as e } from "./Modal-DU4sjMUz.js";
import { t } from "./Button-DTiNkl61.js";
import { n, t as r } from "./Icon-55iG1rR7.js";
import { t as ee } from "./useMessages-Bgh_YqAN.js";
import { n as i, r as te, t as ne } from "./useSyncPlayStore-D6WbhQzu.js";
import { y as a } from "./client-Bmlfq3Uy.js";
import { n as re } from "./useApiBase-DXTBY90j.js";
import { Fragment as ie, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as ae, nextTick as oe, normalizeClass as m, openBlock as h, ref as g, renderList as se, toDisplayString as _, unref as v, vModelDynamic as y, vModelText as b, watch as ce, withCtx as x, withDirectives as S, withModifiers as le } from "vue";
// src/components/syncplay/SyncPlayModal.vue?vue&type=script&setup=true&lang.ts
var ue = ["aria-label"], de = ["aria-checked", "tabindex"], fe = ["aria-checked", "tabindex"], pe = {
	key: 0,
	class: "syncplay-modal__fields"
}, me = { class: "syncplay-modal__field" }, he = {
	class: "syncplay-modal__label",
	for: "room-name"
}, ge = ["placeholder"], _e = { class: "syncplay-modal__field" }, ve = {
	class: "syncplay-modal__label",
	for: "room-password"
}, ye = { class: "syncplay-modal__pw-wrap" }, be = ["type"], xe = ["aria-label", "aria-pressed"], C = {
	id: "room-password-optional",
	class: "syncplay-modal__hint"
}, w = {
	key: 1,
	class: "syncplay-modal__fields"
}, T = { class: "syncplay-modal__field" }, E = {
	class: "syncplay-modal__label",
	for: "room-id"
}, D = ["placeholder"], O = { class: "syncplay-modal__field" }, k = {
	class: "syncplay-modal__label",
	for: "room-password"
}, A = { class: "syncplay-modal__pw-wrap" }, j = [
	"type",
	"required",
	"aria-describedby"
], M = ["aria-label", "aria-pressed"], Se = {
	key: 0,
	id: "room-password-hint",
	class: "syncplay-modal__hint"
}, Ce = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, we = {
	key: 3,
	class: "syncplay-modal__rooms"
}, Te = { class: "syncplay-modal__rooms-title" }, Ee = { class: "syncplay-modal__rooms-list" }, De = ["onClick"], Oe = { class: "syncplay-modal__room-name" }, ke = { class: "syncplay-modal__room-count" }, Ae = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, N = /*#__PURE__*/ n(/* @__PURE__ */ p({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(n, { emit: p }) {
		let N = n, P = p, { t: F } = ee(), I = ne(), je = re(), L = o(() => N.apiBase ?? je.value), R = g("create"), z = g(null), B = g(null);
		function Me(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), R.value = "create", z.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), R.value = "join", B.value?.focus();
			}
		}
		let V = g(""), H = g(""), U = g(""), W = g(!1), G = g(!1), K = g(null), Ne = ae("phlixConfig", null), q = g(!1), J = g(null), Y = g([]), X = g(!1), Pe = o(() => V.value.trim().length > 0), Fe = o(() => H.value.trim().length > 0 && (!G.value || U.value !== "")), Z = o(() => (R.value === "create" ? Pe.value : Fe.value) && !q.value);
		ce(() => N.modelValue, async (e) => {
			e && (J.value = null, V.value = "", U.value = "", W.value = !1, G.value = !1, N.prefilledRoomId ? (H.value = N.prefilledRoomId, R.value = "join") : (H.value = "", R.value = "create"), await Ie());
		});
		async function Ie() {
			X.value = !0;
			try {
				let e = new i(L.value);
				Y.value = await e.listGroups();
			} catch {
				Y.value = [];
			} finally {
				X.value = !1;
			}
		}
		async function Q() {
			if (Z.value) {
				q.value = !0, J.value = null;
				try {
					R.value === "create" ? await I.createAndJoinRoom(L.value, {
						name: V.value.trim(),
						password: U.value
					}) : await I.joinRoom(L.value, H.value.trim(), U.value), I.currentRoom && P("joined", I.currentRoom), P("update:modelValue", !1);
				} catch (e) {
					R.value === "join" && te(e) ? (G.value = !0, J.value = a("syncplay.invalid_password", Ne?.locale, null), oe(() => K.value?.focus())) : J.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					q.value = !1;
				}
			}
		}
		function Le(e) {
			R.value = "join", H.value = e.id, V.value = e.name, G.value = !e.isPublic;
		}
		function $() {
			P("update:modelValue", !1);
		}
		return (ee, i) => (h(), s(e, {
			"model-value": n.modelValue,
			title: v(F)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": i[8] ||= (e) => P("update:modelValue", e),
			onClose: $
		}, {
			footer: x(() => [f(t, {
				variant: "ghost",
				type: "button",
				onClick: $
			}, {
				default: x(() => [d(_(v(F)("common.close")), 1)]),
				_: 1
			}), f(t, {
				variant: "solid",
				type: "button",
				loading: q.value,
				disabled: !Z.value,
				onClick: Q
			}, {
				default: x(() => [d(_(R.value === "create" ? v(F)("syncplay.createRoom") : v(F)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: x(() => [u("form", {
				class: "syncplay-modal",
				onSubmit: le(Q, ["prevent"])
			}, [
				u("div", {
					class: "syncplay-modal__tabs",
					role: "radiogroup",
					"aria-label": v(F)("syncplay.modeSelect"),
					onKeydown: Me
				}, [u("button", {
					ref_key: "createOptionEl",
					ref: z,
					type: "button",
					role: "radio",
					class: m(["syncplay-modal__tab", { "is-active": R.value === "create" }]),
					"aria-checked": R.value === "create",
					tabindex: R.value === "create" ? 0 : -1,
					onClick: i[0] ||= (e) => R.value = "create"
				}, _(v(F)("syncplay.createRoom")), 11, de), u("button", {
					ref_key: "joinOptionEl",
					ref: B,
					type: "button",
					role: "radio",
					class: m(["syncplay-modal__tab", { "is-active": R.value === "join" }]),
					"aria-checked": R.value === "join",
					tabindex: R.value === "join" ? 0 : -1,
					onClick: i[1] ||= (e) => R.value = "join"
				}, _(v(F)("syncplay.joinRoom")), 11, fe)], 40, ue),
				R.value === "create" ? (h(), l("div", pe, [u("div", me, [u("label", he, _(v(F)("syncplay.roomName")), 1), S(u("input", {
					id: "room-name",
					"onUpdate:modelValue": i[2] ||= (e) => V.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: v(F)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, ge), [[b, V.value]])]), u("div", _e, [
					u("label", ve, _(v(F)("syncplay.roomPassword")), 1),
					u("div", ye, [S(u("input", {
						id: "room-password",
						"onUpdate:modelValue": i[3] ||= (e) => U.value = e,
						type: W.value ? "text" : "password",
						class: "syncplay-modal__input",
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": "room-password-optional"
					}, null, 8, be), [[y, U.value]]), u("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": W.value ? v(F)("auth.hidePassword") : v(F)("auth.showPassword"),
						"aria-pressed": W.value,
						onClick: i[4] ||= (e) => W.value = !W.value
					}, [f(r, { name: W.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, xe)]),
					u("p", C, _(v(F)("syncplay.passwordOptional")), 1)
				])])) : (h(), l("div", w, [u("div", T, [u("label", E, _(v(F)("syncplay.roomId")), 1), S(u("input", {
					id: "room-id",
					"onUpdate:modelValue": i[5] ||= (e) => H.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: v(F)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, D), [[b, H.value]])]), u("div", O, [
					u("label", k, _(v(F)("syncplay.roomPassword")), 1),
					u("div", A, [S(u("input", {
						id: "room-password",
						ref_key: "passwordInputEl",
						ref: K,
						"onUpdate:modelValue": i[6] ||= (e) => U.value = e,
						type: W.value ? "text" : "password",
						class: "syncplay-modal__input",
						required: G.value,
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": G.value ? "room-password-hint" : void 0
					}, null, 8, j), [[y, U.value]]), u("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": W.value ? v(F)("auth.hidePassword") : v(F)("auth.showPassword"),
						"aria-pressed": W.value,
						onClick: i[7] ||= (e) => W.value = !W.value
					}, [f(r, { name: W.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, M)]),
					G.value ? (h(), l("p", Se, _(v(F)("syncplay.lockedRoomHint")), 1)) : c("", !0)
				])])),
				J.value ? (h(), l("p", Ce, _(J.value), 1)) : c("", !0),
				R.value === "join" && Y.value.length > 0 ? (h(), l("div", we, [u("h3", Te, _(v(F)("syncplay.availableRooms")), 1), u("ul", Ee, [(h(!0), l(ie, null, se(Y.value, (e) => (h(), l("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [u("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => Le(e)
				}, [
					f(r, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					u("span", Oe, _(e.name), 1),
					e.isPublic ? c("", !0) : (h(), s(r, {
						key: 0,
						name: "lock",
						label: v(F)("syncplay.lockedRoom"),
						class: "syncplay-modal__room-lock"
					}, null, 8, ["label"])),
					u("span", ke, _(v(F)("syncplay.members", { count: e.memberCount })), 1)
				], 8, De)]))), 128))])])) : c("", !0),
				X.value ? (h(), l("div", Ae, [f(r, { name: "spinner" }), u("span", null, _(v(F)("common.loading")), 1)])) : c("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-66698f79"]]);
export { N as t };

//# sourceMappingURL=SyncPlayModal-Z0a8A23A.js.map