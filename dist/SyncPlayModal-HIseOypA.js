import { t as e } from "./Modal-BDNcHIOo.js";
import { t } from "./Button-DTiNkl61.js";
import { n, t as r } from "./Icon-55iG1rR7.js";
import { t as ee } from "./useMessages-vcPOKXXR.js";
import { a as i, n as a, o as te, t as ne } from "./useSyncPlayStore-CSH-i9pJ.js";
import { y as re } from "./client-Bmlfq3Uy.js";
import { n as ie } from "./useApiBase-DXTBY90j.js";
import { Fragment as ae, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as oe, nextTick as se, normalizeClass as m, openBlock as h, ref as g, renderList as ce, toDisplayString as _, unref as v, vModelDynamic as y, vModelText as b, watch as le, withCtx as x, withDirectives as S, withModifiers as ue } from "vue";
// src/components/syncplay/SyncPlayModal.vue?vue&type=script&setup=true&lang.ts
var de = ["aria-label"], fe = ["aria-checked", "tabindex"], pe = ["aria-checked", "tabindex"], me = {
	key: 0,
	class: "syncplay-modal__fields"
}, he = { class: "syncplay-modal__field" }, ge = {
	class: "syncplay-modal__label",
	for: "room-name"
}, _e = ["placeholder"], ve = { class: "syncplay-modal__field" }, ye = {
	class: "syncplay-modal__label",
	for: "room-password"
}, be = { class: "syncplay-modal__pw-wrap" }, xe = ["type"], Se = ["aria-label", "aria-pressed"], Ce = {
	id: "room-password-optional",
	class: "syncplay-modal__hint"
}, we = {
	key: 1,
	class: "syncplay-modal__fields"
}, C = { class: "syncplay-modal__field" }, w = {
	class: "syncplay-modal__label",
	for: "room-id"
}, T = ["placeholder"], E = { class: "syncplay-modal__field" }, D = {
	class: "syncplay-modal__label",
	for: "room-password"
}, O = { class: "syncplay-modal__pw-wrap" }, k = [
	"type",
	"required",
	"aria-describedby"
], Te = ["aria-label", "aria-pressed"], Ee = {
	key: 0,
	id: "room-password-hint",
	class: "syncplay-modal__hint"
}, De = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, Oe = {
	key: 3,
	class: "syncplay-modal__rooms-error",
	role: "alert"
}, ke = {
	key: 4,
	class: "syncplay-modal__rooms"
}, Ae = { class: "syncplay-modal__rooms-title" }, je = { class: "syncplay-modal__rooms-list" }, Me = ["onClick"], Ne = { class: "syncplay-modal__room-name" }, Pe = { class: "syncplay-modal__room-count" }, Fe = {
	key: 5,
	class: "syncplay-modal__loading",
	role: "status"
}, A = /*#__PURE__*/ n(/* @__PURE__ */ p({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(n, { emit: p }) {
		let A = n, j = p, { t: M } = ee(), N = ne(), Ie = ie(), P = o(() => A.apiBase ?? Ie.value), F = g("create"), I = g(null), L = g(null);
		function Le(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), F.value = "create", I.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), F.value = "join", L.value?.focus();
			}
		}
		let R = g(""), z = g(""), B = g(""), V = g(!1), H = g(!1), U = g(null), W = oe("phlixConfig", null), G = g(!1), K = g(null), q = g(!1), J = g([]), Y = g(!1), Re = o(() => R.value.trim().length > 0), ze = o(() => z.value.trim().length > 0 && (!H.value || B.value !== "")), X = o(() => (F.value === "create" ? Re.value : ze.value) && !G.value);
		le(() => A.modelValue, async (e) => {
			e && (K.value = null, q.value = !1, R.value = "", B.value = "", V.value = !1, H.value = !1, A.prefilledRoomId ? (z.value = A.prefilledRoomId, F.value = "join") : (z.value = "", F.value = "create"), await Z());
		});
		async function Z() {
			Y.value = !0, q.value = !1;
			try {
				let e = new i(P.value);
				J.value = await e.listGroups();
			} catch (e) {
				J.value = [], q.value = !0, console.error("[phlix-ui] SyncPlay room listing failed:", e instanceof Error ? e.message : e);
			} finally {
				Y.value = !1;
			}
		}
		async function Q() {
			if (X.value) {
				G.value = !0, K.value = null;
				try {
					F.value === "create" ? await N.createAndJoinRoom(P.value, {
						name: R.value.trim(),
						password: B.value
					}) : await N.joinRoom(P.value, z.value.trim(), B.value), N.currentRoom && j("joined", N.currentRoom), j("update:modelValue", !1);
				} catch (e) {
					F.value === "join" && te(e) ? (H.value = !0, K.value = re("syncplay.invalid_password", W?.locale, null), se(() => U.value?.focus())) : K.value = a(e, W?.locale, F.value === "create" ? M("syncplay.errorCreate") : M("syncplay.errorJoin"));
				} finally {
					G.value = !1;
				}
			}
		}
		function Be(e) {
			F.value = "join", z.value = e.id, R.value = e.name, H.value = !e.isPublic;
		}
		function $() {
			j("update:modelValue", !1);
		}
		return (ee, i) => (h(), s(e, {
			"model-value": n.modelValue,
			title: v(M)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": i[8] ||= (e) => j("update:modelValue", e),
			onClose: $
		}, {
			footer: x(() => [f(t, {
				variant: "ghost",
				type: "button",
				onClick: $
			}, {
				default: x(() => [d(_(v(M)("common.close")), 1)]),
				_: 1
			}), f(t, {
				variant: "solid",
				type: "button",
				loading: G.value,
				disabled: !X.value,
				onClick: Q
			}, {
				default: x(() => [d(_(F.value === "create" ? v(M)("syncplay.createRoom") : v(M)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: x(() => [u("form", {
				class: "syncplay-modal",
				onSubmit: ue(Q, ["prevent"])
			}, [
				u("div", {
					class: "syncplay-modal__tabs",
					role: "radiogroup",
					"aria-label": v(M)("syncplay.modeSelect"),
					onKeydown: Le
				}, [u("button", {
					ref_key: "createOptionEl",
					ref: I,
					type: "button",
					role: "radio",
					class: m(["syncplay-modal__tab", { "is-active": F.value === "create" }]),
					"aria-checked": F.value === "create",
					tabindex: F.value === "create" ? 0 : -1,
					onClick: i[0] ||= (e) => F.value = "create"
				}, _(v(M)("syncplay.createRoom")), 11, fe), u("button", {
					ref_key: "joinOptionEl",
					ref: L,
					type: "button",
					role: "radio",
					class: m(["syncplay-modal__tab", { "is-active": F.value === "join" }]),
					"aria-checked": F.value === "join",
					tabindex: F.value === "join" ? 0 : -1,
					onClick: i[1] ||= (e) => F.value = "join"
				}, _(v(M)("syncplay.joinRoom")), 11, pe)], 40, de),
				F.value === "create" ? (h(), l("div", me, [u("div", he, [u("label", ge, _(v(M)("syncplay.roomName")), 1), S(u("input", {
					id: "room-name",
					"onUpdate:modelValue": i[2] ||= (e) => R.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: v(M)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, _e), [[b, R.value]])]), u("div", ve, [
					u("label", ye, _(v(M)("syncplay.roomPassword")), 1),
					u("div", be, [S(u("input", {
						id: "room-password",
						"onUpdate:modelValue": i[3] ||= (e) => B.value = e,
						type: V.value ? "text" : "password",
						class: "syncplay-modal__input",
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": "room-password-optional"
					}, null, 8, xe), [[y, B.value]]), u("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": V.value ? v(M)("auth.hidePassword") : v(M)("auth.showPassword"),
						"aria-pressed": V.value,
						onClick: i[4] ||= (e) => V.value = !V.value
					}, [f(r, { name: V.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, Se)]),
					u("p", Ce, _(v(M)("syncplay.passwordOptional")), 1)
				])])) : (h(), l("div", we, [u("div", C, [u("label", w, _(v(M)("syncplay.roomId")), 1), S(u("input", {
					id: "room-id",
					"onUpdate:modelValue": i[5] ||= (e) => z.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: v(M)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, T), [[b, z.value]])]), u("div", E, [
					u("label", D, _(v(M)("syncplay.roomPassword")), 1),
					u("div", O, [S(u("input", {
						id: "room-password",
						ref_key: "passwordInputEl",
						ref: U,
						"onUpdate:modelValue": i[6] ||= (e) => B.value = e,
						type: V.value ? "text" : "password",
						class: "syncplay-modal__input",
						required: H.value,
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": H.value ? "room-password-hint" : void 0
					}, null, 8, k), [[y, B.value]]), u("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": V.value ? v(M)("auth.hidePassword") : v(M)("auth.showPassword"),
						"aria-pressed": V.value,
						onClick: i[7] ||= (e) => V.value = !V.value
					}, [f(r, { name: V.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, Te)]),
					H.value ? (h(), l("p", Ee, _(v(M)("syncplay.lockedRoomHint")), 1)) : c("", !0)
				])])),
				K.value ? (h(), l("p", De, _(K.value), 1)) : c("", !0),
				F.value === "join" && q.value ? (h(), l("div", Oe, [u("span", null, _(v(M)("syncplay.errorLoadRooms")), 1), u("button", {
					class: "syncplay-modal__rooms-retry",
					type: "button",
					onClick: Z
				}, _(v(M)("common.retry")), 1)])) : c("", !0),
				F.value === "join" && J.value.length > 0 ? (h(), l("div", ke, [u("h3", Ae, _(v(M)("syncplay.availableRooms")), 1), u("ul", je, [(h(!0), l(ae, null, ce(J.value, (e) => (h(), l("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [u("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => Be(e)
				}, [
					f(r, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					u("span", Ne, _(e.name), 1),
					e.isPublic ? c("", !0) : (h(), s(r, {
						key: 0,
						name: "lock",
						label: v(M)("syncplay.lockedRoom"),
						class: "syncplay-modal__room-lock"
					}, null, 8, ["label"])),
					u("span", Pe, _(v(M)("syncplay.members", { count: e.memberCount })), 1)
				], 8, Me)]))), 128))])])) : c("", !0),
				Y.value ? (h(), l("div", Fe, [f(r, { name: "spinner" }), u("span", null, _(v(M)("common.loading")), 1)])) : c("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-4564f3ca"]]);
export { A as t };

//# sourceMappingURL=SyncPlayModal-HIseOypA.js.map