import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as n } from "./Modal-DnGvbsI9.js";
import { t as r } from "./useMessages-CI_jngTk.js";
import { c as i, t as a } from "./client-DH50wjeq.js";
import { n as o } from "./useApiBase-CV_r-Kk4.js";
import { t as s } from "./Button-CnyfCnhY.js";
import { t as c } from "./Switch-B9lejr6_.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeClass as v, openBlock as y, ref as b, renderList as ee, toDisplayString as x, unref as S, vModelText as C, watch as te, withCtx as w, withDirectives as T, withModifiers as ne } from "vue";
import { defineStore as E } from "pinia";
//#region src/api/syncplay.ts
var D = class {
	client;
	constructor(e) {
		this.client = new a({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new i() : void 0
		});
	}
	async createRoom(e) {
		return (await this.client.post("/api/v1/syncplay/groups", e)).group;
	}
	async joinRoom(e) {
		return (await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`)).session;
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return (await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).session;
	}
	async getMembers(e) {
		let t = await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/members`);
		return Array.isArray(t.members) ? t.members : [];
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups : [];
	}
	async listPublicRooms() {
		return this.listGroups();
	}
	async sendStateUpdate(e, t) {}
	async sendCommand(e, t) {}
}, O = null;
function k(e) {
	return O ||= new D(e), O;
}
var A = null, j = null, M = 0, N = 5, P = 1e3, F = null;
function I() {
	try {
		return typeof window > "u" ? null : new i().getAccessToken();
	} catch {
		return null;
	}
}
function L(e) {
	let t = typeof window < "u" ? window.location.hostname : "localhost", n = I() ?? "";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${t}:8097?token=${encodeURIComponent(n)}&room=${encodeURIComponent(e)}`;
}
function R(e) {
	if (F) try {
		let t = JSON.parse(e.data);
		F(t);
	} catch {}
}
function z() {
	if (A = null, j && M < N) {
		let e = P * 2 ** M;
		M++, console.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${M})`), setTimeout(() => {
			j && B(j);
		}, e);
	} else M >= N && (console.warn("[SyncPlay] Max reconnect attempts reached, giving up"), j = null, M = 0);
}
function B(e, t) {
	if (t && (F = t), A && j !== e && (A.close(), A = null, j = null, M = 0), A && j === e) return;
	j = e, M = 0;
	let n = L(e);
	console.log(`[SyncPlay] Opening WebSocket to ${n}`), A = new WebSocket(n), A.onopen = () => {
		console.log("[SyncPlay] WebSocket connected"), M = 0;
	}, A.onmessage = R, A.onclose = z, A.onerror = (e) => {
		console.error("[SyncPlay] WebSocket error", e);
	};
}
function V() {
	A &&= (A.close(), null), j = null, M = 0;
}
function H(e) {
	!A || A.readyState !== WebSocket.OPEN || A.send(JSON.stringify({
		type: "command",
		payload: e
	}));
}
//#endregion
//#region src/stores/useSyncPlayStore.ts
var U = E("phlix-syncplay", () => {
	let e = b(null), t = b(null), n = b([]), r = b(null), i = b(!1), a = u(() => t.value !== null), o = u(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), s = u(() => n.value.filter((e) => e.isOnline)), c = u(() => t.value ? o.value ? "synced" : "re-syncing" : "outOfSync");
	async function l(a, o) {
		i.value = !0, r.value = null;
		try {
			let r = k(a), i = await r.createRoom(o);
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
			let r = k(a);
			n.value = await r.getMembers(o);
			let i = await r.joinRoom(o);
			t.value = i, e.value &&= {
				...e.value,
				currentSession: i
			}, n.value = i.activeUsers, B(o, (e) => {
				p(e);
			});
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
				await k(a).leaveRoom(e.value.id), V(), e.value = null, t.value = null, n.value = [];
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
	function m(e, n, r) {
		t.value && H({
			type: n,
			position: r?.position,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function h(e) {
		if (t.value) try {
			t.value = await k(e).getState(t.value.id);
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function g(t) {
		if (e.value) try {
			n.value = await k(t).getMembers(e.value.id);
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
}), W = {
	class: "syncplay-modal__tabs",
	role: "tablist"
}, G = ["aria-selected"], K = ["aria-selected"], q = {
	key: 0,
	class: "syncplay-modal__fields"
}, J = { class: "syncplay-modal__field" }, Y = {
	class: "syncplay-modal__label",
	for: "room-name"
}, X = ["placeholder"], re = { class: "syncplay-modal__field syncplay-modal__field--toggle" }, ie = { class: "syncplay-modal__toggle-hint" }, ae = {
	key: 1,
	class: "syncplay-modal__fields"
}, oe = { class: "syncplay-modal__field" }, se = {
	class: "syncplay-modal__label",
	for: "room-id"
}, ce = ["placeholder"], le = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, ue = {
	key: 3,
	class: "syncplay-modal__rooms"
}, de = { class: "syncplay-modal__rooms-title" }, fe = { class: "syncplay-modal__rooms-list" }, pe = ["onClick"], Z = { class: "syncplay-modal__room-name" }, me = { class: "syncplay-modal__room-count" }, he = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, Q = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(e, { emit: i }) {
		let a = e, _ = i, { t: E } = r(), O = U(), k = o(), A = u(() => a.apiBase ?? k.value), j = b("create"), M = b(""), N = b(""), P = b(!0), F = b(!1), I = b(null), L = b([]), R = b(!1), z = u(() => M.value.trim().length > 0), B = u(() => N.value.trim().length > 0), V = u(() => (j.value === "create" ? z.value : B.value) && !F.value);
		te(() => a.modelValue, async (e) => {
			e && (I.value = null, M.value = "", P.value = !0, a.prefilledRoomId ? (N.value = a.prefilledRoomId, j.value = "join") : (N.value = "", j.value = "create"), await H());
		});
		async function H() {
			R.value = !0;
			try {
				L.value = await new D(A.value).listPublicRooms();
			} catch {
				L.value = [];
			} finally {
				R.value = !1;
			}
		}
		async function Q() {
			if (V.value) {
				F.value = !0, I.value = null;
				try {
					j.value === "create" ? (await O.createAndJoinRoom(A.value, {
						name: M.value.trim(),
						isPublic: P.value
					}), O.currentRoom && _("joined", O.currentRoom)) : (await O.joinRoom(A.value, N.value.trim()), O.currentRoom && _("joined", O.currentRoom)), _("update:modelValue", !1);
				} catch (e) {
					I.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					F.value = !1;
				}
			}
		}
		function ge(e) {
			j.value = "join", N.value = e.id, M.value = e.name;
		}
		function $() {
			_("update:modelValue", !1);
		}
		return (r, i) => (y(), d(n, {
			"model-value": e.modelValue,
			title: S(E)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": i[5] ||= (e) => _("update:modelValue", e),
			onClose: $
		}, {
			footer: w(() => [g(s, {
				variant: "ghost",
				type: "button",
				onClick: $
			}, {
				default: w(() => [h(x(S(E)("common.close")), 1)]),
				_: 1
			}), g(s, {
				variant: "solid",
				type: "button",
				loading: F.value,
				disabled: !V.value,
				onClick: Q
			}, {
				default: w(() => [h(x(j.value === "create" ? S(E)("syncplay.createRoom") : S(E)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: w(() => [m("form", {
				class: "syncplay-modal",
				onSubmit: ne(Q, ["prevent"])
			}, [
				m("div", W, [m("button", {
					type: "button",
					role: "tab",
					class: v(["syncplay-modal__tab", { "is-active": j.value === "create" }]),
					"aria-selected": j.value === "create",
					onClick: i[0] ||= (e) => j.value = "create"
				}, x(S(E)("syncplay.createRoom")), 11, G), m("button", {
					type: "button",
					role: "tab",
					class: v(["syncplay-modal__tab", { "is-active": j.value === "join" }]),
					"aria-selected": j.value === "join",
					onClick: i[1] ||= (e) => j.value = "join"
				}, x(S(E)("syncplay.joinRoom")), 11, K)]),
				j.value === "create" ? (y(), p("div", q, [m("div", J, [m("label", Y, x(S(E)("syncplay.roomName")), 1), T(m("input", {
					id: "room-name",
					"onUpdate:modelValue": i[2] ||= (e) => M.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: S(E)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, X), [[C, M.value]])]), m("div", re, [g(c, {
					modelValue: P.value,
					"onUpdate:modelValue": i[3] ||= (e) => P.value = e,
					label: S(E)("syncplay.publicRoom")
				}, null, 8, ["modelValue", "label"]), m("span", ie, x(P.value ? S(E)("syncplay.publicHint") : S(E)("syncplay.privateHint")), 1)])])) : (y(), p("div", ae, [m("div", oe, [m("label", se, x(S(E)("syncplay.roomId")), 1), T(m("input", {
					id: "room-id",
					"onUpdate:modelValue": i[4] ||= (e) => N.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: S(E)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, ce), [[C, N.value]])])])),
				I.value ? (y(), p("p", le, x(I.value), 1)) : f("", !0),
				j.value === "join" && L.value.length > 0 ? (y(), p("div", ue, [m("h3", de, x(S(E)("syncplay.publicRooms")), 1), m("ul", fe, [(y(!0), p(l, null, ee(L.value, (e) => (y(), p("li", {
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
					m("span", Z, x(e.name), 1),
					m("span", me, x(e.memberCount) + " " + x(S(E)("syncplay.members")), 1)
				], 8, pe)]))), 128))])])) : f("", !0),
				R.value ? (y(), p("div", he, [g(t, { name: "spinner" }), m("span", null, x(S(E)("common.loading")), 1)])) : f("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-e3fd2a17"]]);
//#endregion
export { U as n, Q as t };

//# sourceMappingURL=SyncPlayModal-C9yn9zTa.js.map