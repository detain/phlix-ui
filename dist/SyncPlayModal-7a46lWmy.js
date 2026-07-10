import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as n } from "./Modal-BXA8fOR4.js";
import { t as r } from "./useMessages-tduf5S2N.js";
import { c as i, t as a } from "./client-CGSA6iT0.js";
import { n as o } from "./useApiBase-CV_r-Kk4.js";
import { t as s } from "./Button-CnyfCnhY.js";
import { t as c } from "./Switch-B9lejr6_.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeClass as v, openBlock as y, ref as b, renderList as ee, toDisplayString as x, unref as S, vModelText as C, watch as w, withCtx as T, withDirectives as E, withModifiers as te } from "vue";
import { defineStore as D } from "pinia";
//#region src/api/syncplay.ts
var O = class {
	client;
	constructor(e) {
		this.client = new a({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new i() : void 0
		});
	}
	async createRoom(e) {
		return (await this.client.post("/api/v1/syncplay/rooms", e)).room;
	}
	async joinRoom(e) {
		return (await this.client.post(`/api/v1/syncplay/rooms/${encodeURIComponent(e)}/join`)).session;
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/rooms/${encodeURIComponent(e)}/leave`);
	}
	async sendStateUpdate(e, t) {
		await this.client.put(`/api/v1/syncplay/sessions/${encodeURIComponent(e)}/state`, t);
	}
	async sendCommand(e, t) {
		await this.client.post(`/api/v1/syncplay/sessions/${encodeURIComponent(e)}/command`, t);
	}
	async getState(e) {
		return (await this.client.get(`/api/v1/syncplay/sessions/${encodeURIComponent(e)}`)).session;
	}
	async getMembers(e) {
		let t = await this.client.get(`/api/v1/syncplay/rooms/${encodeURIComponent(e)}/members`);
		return Array.isArray(t.members) ? t.members : [];
	}
	async listPublicRooms() {
		let e = await this.client.get("/api/v1/syncplay/rooms/public");
		return Array.isArray(e.rooms) ? e.rooms : [];
	}
}, k = null;
function A(e) {
	return k ||= new O(e), k;
}
//#endregion
//#region src/stores/useSyncPlayStore.ts
var j = D("phlix-syncplay", () => {
	let e = b(null), t = b(null), n = b([]), r = b(null), i = b(!1), a = u(() => t.value !== null), o = u(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), s = u(() => n.value.filter((e) => e.isOnline)), c = u(() => t.value ? o.value ? "synced" : "re-syncing" : "outOfSync");
	async function l(a, o) {
		i.value = !0, r.value = null;
		try {
			let r = A(a), i = await r.createRoom(o);
			e.value = i;
			let s = await r.joinRoom(i.id);
			t.value = s, n.value = s.activeUsers;
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to create room", e;
		} finally {
			i.value = !1;
		}
	}
	async function d(a, o) {
		i.value = !0, r.value = null;
		try {
			let r = A(a);
			n.value = await r.getMembers(o);
			let i = await r.joinRoom(o);
			t.value = i, e.value &&= {
				...e.value,
				currentSession: i
			}, n.value = i.activeUsers;
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to join room", e;
		} finally {
			i.value = !1;
		}
	}
	async function f(a) {
		if (e.value) {
			i.value = !0, r.value = null;
			try {
				await A(a).leaveRoom(e.value.id), e.value = null, t.value = null, n.value = [];
			} catch (e) {
				throw r.value = e instanceof Error ? e.message : "Failed to leave room", e;
			} finally {
				i.value = !1;
			}
		}
	}
	function p(e) {
		if (t.value) switch (e.type) {
			case "play":
				t.value = {
					...t.value,
					state: "playing"
				};
				break;
			case "pause":
				t.value = {
					...t.value,
					state: "paused"
				};
				break;
			case "seek":
				e.position !== void 0 && (t.value = {
					...t.value,
					playbackPosition: e.position
				});
				break;
			case "sync":
				e.position !== void 0 && (t.value = {
					...t.value,
					playbackPosition: e.position
				}), e.rate !== void 0 && (t.value = {
					...t.value,
					playbackRate: e.rate
				});
				break;
		}
	}
	async function m(e, n, i) {
		if (t.value) try {
			let r = A(e), a = {
				type: n,
				position: i?.position,
				rate: i?.rate,
				issuedBy: t.value.createdBy,
				issuedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			await r.sendCommand(t.value.id, a);
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to send command", e;
		}
	}
	async function h(e) {
		if (t.value) try {
			t.value = await A(e).getState(t.value.id);
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function g(t) {
		if (e.value) try {
			n.value = await A(t).getMembers(e.value.id);
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to refresh members", e;
		}
	}
	function _() {
		r.value = null;
	}
	return {
		currentRoom: e,
		currentSession: t,
		members: n,
		error: r,
		isLoading: i,
		isInRoom: a,
		isSynced: o,
		onlineMembers: s,
		syncStatus: c,
		createAndJoinRoom: l,
		joinRoom: d,
		leaveRoom: f,
		onRemoteStateUpdate: p,
		sendCommand: m,
		refreshState: h,
		refreshMembers: g,
		clearError: _
	};
}), ne = {
	class: "syncplay-modal__tabs",
	role: "tablist"
}, re = ["aria-selected"], ie = ["aria-selected"], ae = {
	key: 0,
	class: "syncplay-modal__fields"
}, oe = { class: "syncplay-modal__field" }, se = {
	class: "syncplay-modal__label",
	for: "room-name"
}, ce = ["placeholder"], le = { class: "syncplay-modal__field syncplay-modal__field--toggle" }, ue = { class: "syncplay-modal__toggle-hint" }, de = {
	key: 1,
	class: "syncplay-modal__fields"
}, M = { class: "syncplay-modal__field" }, N = {
	class: "syncplay-modal__label",
	for: "room-id"
}, P = ["placeholder"], F = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, I = {
	key: 3,
	class: "syncplay-modal__rooms"
}, L = { class: "syncplay-modal__rooms-title" }, R = { class: "syncplay-modal__rooms-list" }, z = ["onClick"], B = { class: "syncplay-modal__room-name" }, V = { class: "syncplay-modal__room-count" }, fe = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, H = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(e, { emit: i }) {
		let a = e, _ = i, { t: D } = r(), k = j(), A = o(), H = u(() => a.apiBase ?? A.value), U = b("create"), W = b(""), G = b(""), K = b(!0), q = b(!1), J = b(null), Y = b([]), X = b(!1), pe = u(() => W.value.trim().length > 0), me = u(() => G.value.trim().length > 0), Z = u(() => (U.value === "create" ? pe.value : me.value) && !q.value);
		w(() => a.modelValue, async (e) => {
			e && (J.value = null, W.value = "", K.value = !0, a.prefilledRoomId ? (G.value = a.prefilledRoomId, U.value = "join") : (G.value = "", U.value = "create"), await he());
		});
		async function he() {
			X.value = !0;
			try {
				Y.value = await new O(H.value).listPublicRooms();
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
					U.value === "create" ? (await k.createAndJoinRoom(H.value, {
						name: W.value.trim(),
						isPublic: K.value
					}), k.currentRoom && _("joined", k.currentRoom)) : (await k.joinRoom(H.value, G.value.trim()), k.currentRoom && _("joined", k.currentRoom)), _("update:modelValue", !1);
				} catch (e) {
					J.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					q.value = !1;
				}
			}
		}
		function ge(e) {
			U.value = "join", G.value = e.id, W.value = e.name;
		}
		function $() {
			_("update:modelValue", !1);
		}
		return (r, i) => (y(), d(n, {
			"model-value": e.modelValue,
			title: S(D)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": i[5] ||= (e) => _("update:modelValue", e),
			onClose: $
		}, {
			footer: T(() => [g(s, {
				variant: "ghost",
				type: "button",
				onClick: $
			}, {
				default: T(() => [h(x(S(D)("common.close")), 1)]),
				_: 1
			}), g(s, {
				variant: "solid",
				type: "button",
				loading: q.value,
				disabled: !Z.value,
				onClick: Q
			}, {
				default: T(() => [h(x(U.value === "create" ? S(D)("syncplay.createRoom") : S(D)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: T(() => [m("form", {
				class: "syncplay-modal",
				onSubmit: te(Q, ["prevent"])
			}, [
				m("div", ne, [m("button", {
					type: "button",
					role: "tab",
					class: v(["syncplay-modal__tab", { "is-active": U.value === "create" }]),
					"aria-selected": U.value === "create",
					onClick: i[0] ||= (e) => U.value = "create"
				}, x(S(D)("syncplay.createRoom")), 11, re), m("button", {
					type: "button",
					role: "tab",
					class: v(["syncplay-modal__tab", { "is-active": U.value === "join" }]),
					"aria-selected": U.value === "join",
					onClick: i[1] ||= (e) => U.value = "join"
				}, x(S(D)("syncplay.joinRoom")), 11, ie)]),
				U.value === "create" ? (y(), p("div", ae, [m("div", oe, [m("label", se, x(S(D)("syncplay.roomName")), 1), E(m("input", {
					id: "room-name",
					"onUpdate:modelValue": i[2] ||= (e) => W.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: S(D)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, ce), [[C, W.value]])]), m("div", le, [g(c, {
					modelValue: K.value,
					"onUpdate:modelValue": i[3] ||= (e) => K.value = e,
					label: S(D)("syncplay.publicRoom")
				}, null, 8, ["modelValue", "label"]), m("span", ue, x(K.value ? S(D)("syncplay.publicHint") : S(D)("syncplay.privateHint")), 1)])])) : (y(), p("div", de, [m("div", M, [m("label", N, x(S(D)("syncplay.roomId")), 1), E(m("input", {
					id: "room-id",
					"onUpdate:modelValue": i[4] ||= (e) => G.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: S(D)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, P), [[C, G.value]])])])),
				J.value ? (y(), p("p", F, x(J.value), 1)) : f("", !0),
				U.value === "join" && Y.value.length > 0 ? (y(), p("div", I, [m("h3", L, x(S(D)("syncplay.publicRooms")), 1), m("ul", R, [(y(!0), p(l, null, ee(Y.value, (e) => (y(), p("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [m("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => ge(e)
				}, [
					g(t, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					m("span", B, x(e.name), 1),
					m("span", V, x(e.memberCount) + " " + x(S(D)("syncplay.members")), 1)
				], 8, z)]))), 128))])])) : f("", !0),
				X.value ? (y(), p("div", fe, [g(t, { name: "spinner" }), m("span", null, x(S(D)("common.loading")), 1)])) : f("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-e3fd2a17"]]);
//#endregion
export { j as n, H as t };

//# sourceMappingURL=SyncPlayModal-7a46lWmy.js.map