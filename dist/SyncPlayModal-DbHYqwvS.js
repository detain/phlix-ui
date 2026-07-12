import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { t as n } from "./Modal-BnAzb9-y.js";
import { t as r } from "./useMessages-CI_jngTk.js";
import { c as i, t as a } from "./client-C0AMSEun.js";
import { n as o } from "./useApiBase-CV_r-Kk4.js";
import { t as s } from "./Button-btm-GCUN.js";
import { t as c } from "./Switch-DyS2L5gX.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeClass as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, vModelText as w, watch as ee, withCtx as T, withDirectives as E, withModifiers as te } from "vue";
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
}, k = null;
function A(e) {
	return k ||= new O(e), k;
}
var j = null, M = null, N = 0, P = 5, F = 1e3, I = null;
function L() {
	try {
		return typeof window > "u" ? null : new i().getAccessToken();
	} catch {
		return null;
	}
}
function R(e) {
	let t = typeof window < "u" ? window.location.hostname : "localhost", n = L() ?? "";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${t}:8097?token=${encodeURIComponent(n)}&room=${encodeURIComponent(e)}`;
}
function z(e) {
	if (I) try {
		let t = JSON.parse(e.data);
		I(t);
	} catch {}
}
function B() {
	if (j = null, M && N < P) {
		let e = F * 2 ** N;
		N++, console.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${N})`), setTimeout(() => {
			M && V(M);
		}, e);
	} else N >= P && (console.warn("[SyncPlay] Max reconnect attempts reached, giving up"), M = null, N = 0);
}
function V(e, t) {
	if (t && (I = t), j && M !== e && (j.close(), j = null, M = null, N = 0), j && M === e) return;
	M = e, N = 0;
	let n = R(e);
	console.log(`[SyncPlay] Opening WebSocket to ${n}`), j = new WebSocket(n), j.onopen = () => {
		console.log("[SyncPlay] WebSocket connected"), N = 0;
	}, j.onmessage = z, j.onclose = B, j.onerror = (e) => {
		console.error("[SyncPlay] WebSocket error", e);
	};
}
function H() {
	j &&= (j.close(), null), M = null, N = 0;
}
function U(e) {
	!j || j.readyState !== WebSocket.OPEN || j.send(JSON.stringify({
		type: "command",
		payload: e
	}));
}
var W = D("phlix-syncplay", () => {
	let e = b(null), t = b(null), n = b([]), r = b(null), i = b(!1), a = b(0), o = 0, s = u(() => t.value !== null), c = u(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), l = u(() => n.value.filter((e) => e.isOnline)), d = u(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - o) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return a.value - r;
	}), f = u(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(d.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	async function p(a, o) {
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
	async function m(a, s) {
		i.value = !0, r.value = null;
		try {
			let r = A(a);
			n.value = await r.getMembers(s);
			let i = await r.joinRoom(s);
			t.value = i, o = Date.now(), e.value &&= {
				...e.value,
				currentSession: i
			}, n.value = i.activeUsers, V(s, (e) => {
				g(e);
			});
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to join room", e;
		} finally {
			i.value = !1;
		}
	}
	async function h(a) {
		if (e.value) {
			i.value = !0, r.value = null;
			try {
				await A(a).leaveRoom(e.value.id), H(), e.value = null, t.value = null, n.value = [];
			} catch (e) {
				throw r.value = e instanceof Error ? e.message : "Failed to leave room", e;
			} finally {
				i.value = !1;
			}
		}
	}
	function g(e) {
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
				e.position !== void 0 && (o = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				});
				break;
			case "sync":
				e.position !== void 0 && (o = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				}), e.rate !== void 0 && (t.value = {
					...t.value,
					playbackRate: e.rate
				});
				break;
		}
	}
	function _(e, n, r) {
		t.value && U({
			type: n,
			position: r?.position,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function v(e) {
		if (t.value) try {
			t.value = await A(e).getState(t.value.id), o = Date.now();
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function y(t) {
		if (e.value) try {
			n.value = await A(t).getMembers(e.value.id);
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to refresh members", e;
		}
	}
	function x() {
		r.value = null;
	}
	function S(e) {
		a.value = e;
	}
	return {
		currentRoom: e,
		currentSession: t,
		members: n,
		error: r,
		isLoading: i,
		isInRoom: s,
		isSynced: c,
		onlineMembers: l,
		syncStatus: f,
		driftAmount: d,
		createAndJoinRoom: p,
		joinRoom: m,
		leaveRoom: h,
		onRemoteStateUpdate: g,
		sendCommand: _,
		refreshState: v,
		refreshMembers: y,
		clearError: x,
		updateLocalPosition: S
	};
}), ne = {
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
}, ce = ["placeholder"], Z = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, le = {
	key: 3,
	class: "syncplay-modal__rooms"
}, ue = { class: "syncplay-modal__rooms-title" }, de = { class: "syncplay-modal__rooms-list" }, fe = ["onClick"], pe = { class: "syncplay-modal__room-name" }, me = { class: "syncplay-modal__room-count" }, he = {
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
		let a = e, _ = i, { t: D } = r(), k = W(), A = o(), j = u(() => a.apiBase ?? A.value), M = b("create"), N = b(""), P = b(""), F = b(!0), I = b(!1), L = b(null), R = b([]), z = b(!1), B = u(() => N.value.trim().length > 0), V = u(() => P.value.trim().length > 0), H = u(() => (M.value === "create" ? B.value : V.value) && !I.value);
		ee(() => a.modelValue, async (e) => {
			e && (L.value = null, N.value = "", F.value = !0, a.prefilledRoomId ? (P.value = a.prefilledRoomId, M.value = "join") : (P.value = "", M.value = "create"), await U());
		});
		async function U() {
			z.value = !0;
			try {
				R.value = await new O(j.value).listPublicRooms();
			} catch {
				R.value = [];
			} finally {
				z.value = !1;
			}
		}
		async function Q() {
			if (H.value) {
				I.value = !0, L.value = null;
				try {
					M.value === "create" ? (await k.createAndJoinRoom(j.value, {
						name: N.value.trim(),
						isPublic: F.value
					}), k.currentRoom && _("joined", k.currentRoom)) : (await k.joinRoom(j.value, P.value.trim()), k.currentRoom && _("joined", k.currentRoom)), _("update:modelValue", !1);
				} catch (e) {
					L.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					I.value = !1;
				}
			}
		}
		function ge(e) {
			M.value = "join", P.value = e.id, N.value = e.name;
		}
		function $() {
			_("update:modelValue", !1);
		}
		return (r, i) => (y(), d(n, {
			"model-value": e.modelValue,
			title: C(D)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": i[5] ||= (e) => _("update:modelValue", e),
			onClose: $
		}, {
			footer: T(() => [g(s, {
				variant: "ghost",
				type: "button",
				onClick: $
			}, {
				default: T(() => [h(S(C(D)("common.close")), 1)]),
				_: 1
			}), g(s, {
				variant: "solid",
				type: "button",
				loading: I.value,
				disabled: !H.value,
				onClick: Q
			}, {
				default: T(() => [h(S(M.value === "create" ? C(D)("syncplay.createRoom") : C(D)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: T(() => [m("form", {
				class: "syncplay-modal",
				onSubmit: te(Q, ["prevent"])
			}, [
				m("div", ne, [m("button", {
					type: "button",
					role: "tab",
					class: v(["syncplay-modal__tab", { "is-active": M.value === "create" }]),
					"aria-selected": M.value === "create",
					onClick: i[0] ||= (e) => M.value = "create"
				}, S(C(D)("syncplay.createRoom")), 11, G), m("button", {
					type: "button",
					role: "tab",
					class: v(["syncplay-modal__tab", { "is-active": M.value === "join" }]),
					"aria-selected": M.value === "join",
					onClick: i[1] ||= (e) => M.value = "join"
				}, S(C(D)("syncplay.joinRoom")), 11, K)]),
				M.value === "create" ? (y(), p("div", q, [m("div", J, [m("label", Y, S(C(D)("syncplay.roomName")), 1), E(m("input", {
					id: "room-name",
					"onUpdate:modelValue": i[2] ||= (e) => N.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: C(D)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, X), [[w, N.value]])]), m("div", re, [g(c, {
					modelValue: F.value,
					"onUpdate:modelValue": i[3] ||= (e) => F.value = e,
					label: C(D)("syncplay.publicRoom")
				}, null, 8, ["modelValue", "label"]), m("span", ie, S(F.value ? C(D)("syncplay.publicHint") : C(D)("syncplay.privateHint")), 1)])])) : (y(), p("div", ae, [m("div", oe, [m("label", se, S(C(D)("syncplay.roomId")), 1), E(m("input", {
					id: "room-id",
					"onUpdate:modelValue": i[4] ||= (e) => P.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: C(D)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, ce), [[w, P.value]])])])),
				L.value ? (y(), p("p", Z, S(L.value), 1)) : f("", !0),
				M.value === "join" && R.value.length > 0 ? (y(), p("div", le, [m("h3", ue, S(C(D)("syncplay.publicRooms")), 1), m("ul", de, [(y(!0), p(l, null, x(R.value, (e) => (y(), p("li", {
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
					m("span", pe, S(e.name), 1),
					m("span", me, S(e.memberCount) + " " + S(C(D)("syncplay.members")), 1)
				], 8, fe)]))), 128))])])) : f("", !0),
				z.value ? (y(), p("div", he, [g(t, { name: "spinner" }), m("span", null, S(C(D)("common.loading")), 1)])) : f("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-e3fd2a17"]]);
//#endregion
export { W as n, Q as t };

//# sourceMappingURL=SyncPlayModal-DbHYqwvS.js.map