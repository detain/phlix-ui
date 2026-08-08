import { n as e, t } from "./Icon-CkTBN_k5.js";
import { t as n } from "./useMessages-Dlbe0TRZ.js";
import { l as r, t as i } from "./client-COHWZ2KC.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useAuthStore-Bxpn4wWU.js";
import { t as s } from "./Button-Cw8Wl4QR.js";
import { t as c } from "./Switch-H74PI5Oy.js";
import { t as l } from "./Modal-DiBcOPD_.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, normalizeClass as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, unref as w, vModelText as T, watch as E, withCtx as D, withDirectives as ee, withModifiers as te } from "vue";
import { defineStore as O } from "pinia";
//#region node_modules/@phlix/syncplay/dist/phlix-syncplay.js
var k = {
	GROUP_CREATE: "syncplay_group_create",
	GROUP_JOIN: "syncplay_group_join",
	GROUP_LEAVE: "syncplay_group_leave",
	GROUP_STATE: "syncplay_group_state",
	GROUP_LIST: "syncplay_group_list",
	PLAYBACK_PLAY: "syncplay_playback_play",
	PLAYBACK_PAUSE: "syncplay_playback_pause",
	PLAYBACK_SEEK: "syncplay_playback_seek",
	PLAYBACK_QUEUE: "syncplay_playback_queue",
	PLAYBACK_SYNC: "syncplay_playback_sync",
	CHAT: "syncplay_chat",
	TYPING: "syncplay_typing",
	HOST_TRANSFER: "syncplay_host_transfer",
	HOST_ELECT: "syncplay_host_elect",
	TIME_PING: "syncplay_time_ping",
	TIME_PONG: "syncplay_time_pong",
	TIME_SYNC: "syncplay_time_sync",
	ERROR: "syncplay_error",
	INFO: "syncplay_info"
};
k.GROUP_CREATE, k.GROUP_JOIN, k.GROUP_LEAVE, k.GROUP_STATE, k.GROUP_LIST, k.PLAYBACK_PLAY, k.PLAYBACK_PAUSE, k.PLAYBACK_SEEK, k.PLAYBACK_QUEUE, k.PLAYBACK_SYNC, k.CHAT, k.TYPING, k.HOST_TRANSFER, k.HOST_ELECT, k.TIME_PING, k.TIME_PONG, k.TIME_SYNC, k.ERROR, k.INFO;
function A(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function j(e) {
	let t = e;
	if (typeof e == "string") try {
		t = JSON.parse(e);
	} catch {
		return null;
	}
	if (typeof t != "object" || !t || Array.isArray(t)) return null;
	let n = t;
	if (typeof n.type != "string") return null;
	let r = n.data;
	if (typeof r == "object" && r && !Array.isArray(r)) {
		let e = {};
		for (let t of Object.keys(n)) t !== "data" && (e[t] = n[t]);
		return {
			...r,
			...e
		};
	}
	return n;
}
function M(e) {
	return JSON.stringify(e);
}
var N = .1, P = .99, F = 1.01, I = class {
	samples = [];
	driftRate = 1;
	now;
	samplesVersion = 0;
	cacheVersion = -1;
	cachedOffset = 0;
	cachedLatency = 0;
	cachedIsStable = !1;
	constructor(e) {
		this.now = e;
	}
	addSample(e, t, n, r) {
		let i = r - e - (n - t);
		if (i < 0 || i > 1e3) return !1;
		let a = i / 2, o = t - e + Math.trunc(a);
		return this.samples.push({
			offset: o,
			rtt: i,
			timestamp: this.now() / 1e3
		}), this.samples.length > 10 && this.samples.shift(), this.samplesVersion++, this.updateDriftRate(), !0;
	}
	ensureWindowCache() {
		this.cacheVersion !== this.samplesVersion && (this.cachedOffset = this.computeOffset(), this.cachedLatency = this.computeLatency(), this.cachedIsStable = this.computeIsStable(), this.cacheVersion = this.samplesVersion);
	}
	getOffset() {
		return this.ensureWindowCache(), this.cachedOffset;
	}
	computeOffset() {
		if (this.samples.length === 0) return 0;
		let e = this.samples.slice(-5), t = 0, n = 0;
		for (let r of e) {
			let e = 1 / Math.max(1, r.rtt);
			t += r.offset * e, n += e;
		}
		return Math.trunc(t / Math.max(1, n));
	}
	getLatency() {
		return this.ensureWindowCache(), this.cachedLatency;
	}
	computeLatency() {
		if (this.samples.length === 0) return 0;
		let e = this.samples.slice(-5), t = 0;
		for (let n of e) t += n.rtt / 2;
		return Math.trunc(t / Math.max(1, e.length));
	}
	isStable() {
		return this.ensureWindowCache(), this.cachedIsStable;
	}
	computeIsStable() {
		if (this.samples.length < 5) return !1;
		let e = this.samples.slice(-5).map((e) => e.offset), t = e.reduce((e, t) => e + t, 0) / e.length, n = 0;
		for (let r of e) {
			let e = r - t;
			n += e * e;
		}
		return n / e.length < 50;
	}
	updateDriftRate() {
		if (this.samples.length < 2) return;
		let e = this.samples.slice(-5);
		if (e.length < 2) return;
		let t = e[0], n = e[e.length - 1], r = n.timestamp - t.timestamp;
		if (r <= 0) return;
		let i = (n.offset - t.offset) / r;
		this.driftRate = 1 + N * i / 1e3, this.driftRate = Math.min(F, Math.max(P, this.driftRate));
	}
	getDriftRate() {
		return this.driftRate;
	}
	getSampleCount() {
		return this.samples.length;
	}
	getSynchronizedTime(e) {
		return e + this.getOffset();
	}
	getAdjustedPosition(e, t, n) {
		return e + (this.getSynchronizedTime(n) - t) * this.driftRate;
	}
	reset() {
		this.samples = [], this.driftRate = 1, this.samplesVersion++;
	}
	getStatus() {
		return {
			offset: this.getOffset(),
			latency: this.getLatency(),
			driftRate: this.driftRate,
			isStable: this.isStable(),
			sampleCount: this.samples.length
		};
	}
}, L = class {
	send;
	now;
	memberId;
	memberName;
	options;
	timeSync;
	group = null;
	lastPingSendTime = null;
	constructor(e) {
		this.options = e, this.send = e.send, this.now = e.now, this.memberId = e.memberId, this.memberName = e.memberName ?? "User", this.timeSync = new I(e.now);
	}
	getTimeSync() {
		return this.timeSync;
	}
	getGroup() {
		return this.group;
	}
	getMemberId() {
		return this.memberId;
	}
	isHost() {
		return this.group !== null && this.group.host_id === this.memberId;
	}
	getSynchronizedTime() {
		return this.timeSync.getSynchronizedTime(this.now());
	}
	createGroup(e, t) {
		let n = {
			group_name: e,
			member_id: this.memberId,
			member_name: this.memberName
		};
		t !== void 0 && (n.password_hash = t), this.dispatch(k.GROUP_CREATE, n);
	}
	joinGroup(e, t) {
		let n = {
			group_id: e,
			member_id: this.memberId,
			member_name: this.memberName
		};
		t !== void 0 && (n.password_hash = t), this.dispatch(k.GROUP_JOIN, n);
	}
	leaveGroup() {
		this.group !== null && (this.dispatch(k.GROUP_LEAVE, {
			group_id: this.group.group_id,
			member_id: this.memberId
		}), this.group = null);
	}
	sendPlay(e) {
		this.group !== null && this.dispatch(k.PLAYBACK_PLAY, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendPause(e) {
		this.group !== null && this.dispatch(k.PLAYBACK_PAUSE, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendSeek(e, t) {
		this.group !== null && this.dispatch(k.PLAYBACK_SEEK, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			from_position: e,
			to_position: t,
			server_time: this.getSynchronizedTime()
		});
	}
	reportPosition(e, t) {
		this.group !== null && this.dispatch(k.PLAYBACK_SYNC, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			is_playing: t,
			server_time: this.getSynchronizedTime()
		});
	}
	pingTime() {
		let e = this.now();
		this.lastPingSendTime = e, this.dispatch(k.TIME_PING, { client_time: e });
	}
	onDisconnect() {
		this.timeSync.reset(), this.group = null, this.lastPingSendTime = null, this.options.onDisconnect?.();
	}
	handleIncoming(e) {
		let t = j(e);
		if (t !== null) switch (t.type) {
			case k.TIME_PONG:
				this.handleTimePong(t);
				break;
			case k.GROUP_STATE:
				this.handleGroupState(t);
				break;
			case k.PLAYBACK_PLAY:
				this.handlePlayback("play", t);
				break;
			case k.PLAYBACK_PAUSE:
				this.handlePlayback("pause", t);
				break;
			case k.PLAYBACK_SEEK:
				this.handleSeek(t);
				break;
			case k.HOST_ELECT:
				this.handleHostElect(t);
				break;
			case k.INFO:
				this.handleInfo(t);
				break;
			case k.ERROR:
				this.handleError(t);
				break;
			case k.TYPING:
				this.handleTyping(t);
				break;
			case k.HOST_TRANSFER:
				this.handleHostTransfer(t);
				break;
			case k.PLAYBACK_SYNC:
				this.handlePlaybackSync(t);
				break;
			case k.TIME_SYNC:
				this.handleTimeSync(t);
				break;
			case k.GROUP_LIST:
				this.handleGroupList(t);
				break;
			default: break;
		}
	}
	handleTimePong(e) {
		let t = e, n = this.now(), r = typeof t.client_time == "number" ? t.client_time : this.lastPingSendTime, i = typeof t.server_time == "number" ? t.server_time : null;
		if (r === null || i === null) return;
		let a = this.timeSync.addSample(r, i, i, n);
		this.lastPingSendTime = null, a && this.options.onSync?.({
			offset: this.timeSync.getOffset(),
			latency: this.timeSync.getLatency(),
			isStable: this.timeSync.isStable()
		});
	}
	handleGroupState(e) {
		let t = e, n = t.group;
		if (typeof n != "object" || !n) return;
		let r = Array.isArray(n.members) ? n.members.map((e) => ({
			id: e.id,
			name: e.name,
			is_host: e.id === n.host_id,
			joined_at: typeof e.joined_at == "number" ? e.joined_at : 0
		})) : [];
		this.group = {
			group_id: n.group_id,
			group_name: n.group_name,
			members: r,
			member_count: n.member_count,
			host_id: n.host_id ?? null,
			current_media_id: n.current_media_id ?? null,
			current_media_duration: n.current_media_duration ?? null,
			playback_position: n.playback_position ?? 0,
			playback_state: n.playback_state ?? "stopped",
			created_at: n.created_at,
			last_activity_at: n.last_activity_at
		}, this.options.onState?.(this.group, t.your_id);
	}
	handlePlayback(e, t) {
		if ((typeof t.member_id == "string" ? t.member_id : void 0) === this.memberId) return;
		let n = typeof t.position == "number" ? t.position : 0, r = typeof t.server_time == "number" ? t.server_time : this.getSynchronizedTime();
		this.options.onPlaybackCommand?.({
			type: e,
			position: n,
			serverTime: r
		});
	}
	handleSeek(e) {
		if ((typeof e.member_id == "string" ? e.member_id : void 0) === this.memberId) return;
		let t = typeof e.to_position == "number" ? e.to_position : 0, n = typeof e.server_time == "number" ? e.server_time : this.getSynchronizedTime();
		this.options.onPlaybackCommand?.({
			type: "seek",
			position: t,
			serverTime: n
		});
	}
	handleHostElect(e) {
		let t = e.elected_id ?? null;
		this.group !== null && (this.group = {
			...this.group,
			host_id: t
		}), this.options.onHostChanged?.(t);
	}
	handleInfo(e) {
		let t = e;
		typeof t.member_id == "string" && typeof t.member_name == "string" && this.options.onMemberJoined?.({
			id: t.member_id,
			name: t.member_name
		}), typeof t.message == "string" && this.options.onInfo?.(t.message);
	}
	handleError(e) {
		let t = e, n = t.error_code ?? t.code ?? "UNKNOWN", r = typeof t.message == "string" ? t.message : "Unknown error";
		this.options.onError?.(n, r);
	}
	handleTyping(e) {
		let t = e;
		typeof t.member_id == "string" && this.options.onMemberTyping?.(t.member_id, t.is_typing ?? !1);
	}
	handleHostTransfer(e) {
		let t = e;
		typeof t.current_host_id != "string" || typeof t.new_host_id != "string" || (this.group !== null && (this.group = {
			...this.group,
			host_id: t.new_host_id
		}), this.options.onHostTransfer?.(t.current_host_id, t.new_host_id));
	}
	handlePlaybackSync(e) {
		let t = typeof e.member_id == "string" ? e.member_id : void 0;
		if (t === this.memberId) return;
		let n = typeof e.position == "number" ? e.position : 0, r = typeof e.is_playing == "boolean" && e.is_playing, i = typeof e.server_time == "number" ? e.server_time : this.getSynchronizedTime();
		this.options.onPlaybackSync?.(t ?? "", n, r, i);
	}
	handleTimeSync(e) {
		let t = e, n = typeof t.server_time == "number" ? t.server_time : 0, r = typeof t.client_time == "number" ? t.client_time : 0;
		this.options.onTimeSync?.(n, r);
	}
	handleGroupList(e) {
		let t = e.groups;
		if (!Array.isArray(t)) return;
		let n = t.map((e) => ({
			group_id: typeof e.group_id == "string" ? e.group_id : "",
			group_name: typeof e.group_name == "string" ? e.group_name : "",
			has_password: typeof e.has_password == "boolean" ? e.has_password : void 0
		}));
		this.options.onGroupList?.(n);
	}
	dispatch(e, t) {
		this.send(A(e, t, this.now));
	}
};
//#endregion
//#region src/api/syncplay.ts
function R(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function z(e) {
	let t = R(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function B(e) {
	return e.group_id ?? e.id ?? "";
}
function V(e) {
	let t = e?.members;
	return t ? (Array.isArray(t) ? t : Object.entries(t).map(([e, t]) => ({
		id: e,
		...t
	}))).map((e) => ({
		id: e.id ?? "",
		name: e.name ?? "Unknown",
		profileId: 0,
		role: e.is_host === !0 ? "owner" : "contributor",
		isOnline: !0,
		lastSeen: z(e.joined_at)
	})) : [];
}
function H(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function U(e) {
	let t = e ?? {}, n = B(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: R(t.member_count, V(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: z(t.created_at)
	};
}
function W(e) {
	let t = e ?? {}, n = B(t), r = H(t);
	return {
		id: n,
		roomId: n,
		serverId: "",
		createdBy: t.host_id ?? "",
		createdAt: z(t.created_at),
		state: r,
		playbackPosition: R(t.playback_position),
		playbackRate: +(r === "playing"),
		serverTime: R(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: z(t.last_activity_at),
		activeUsers: V(t),
		roles: Object.fromEntries(V(t).map((e) => [e.id, e.role])),
		permissions: {}
	};
}
var G = class {
	client;
	constructor(e) {
		this.client = new i({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new r() : void 0
		});
	}
	async createRoom(e) {
		return U((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t) {
		let n = t !== void 0 && t !== "" ? { memberName: t } : void 0, r = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, n);
		return {
			room: U(r.group),
			session: W(r.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return W((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return V((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(U) : [];
	}
	async listPublicRooms() {
		return this.listGroups();
	}
}, K = null;
function q(e) {
	return K ||= new G(e), K;
}
var J = null, Y = null, X = 0, Z = 5, ne = 1e3, Q = null, re = null, ie = null, $ = null;
function ae() {
	try {
		return typeof window > "u" ? null : new r().getAccessToken();
	} catch {
		return null;
	}
}
function oe(e) {
	let t = typeof window < "u" ? window.location.hostname : "localhost", n = ae() ?? "";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${t}:8097?token=${encodeURIComponent(n)}&room=${encodeURIComponent(e)}`;
}
function se(e) {
	if (Q) try {
		let t = JSON.parse(e.data);
		Q.handleIncoming(t);
	} catch {}
}
function ce() {
	if (J = null, Q && Q.onDisconnect(), Y && X < Z) {
		let e = ne * 2 ** X;
		X++, console.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${X})`), setTimeout(() => {
			Y && ue(Y);
		}, e);
	} else X >= Z && (console.warn("[SyncPlay] Max reconnect attempts reached, giving up"), Y = null, X = 0, Q = null);
}
function le(e, t, n, r) {
	X = 0, ue(e, t, n, r);
}
function ue(e, t, n, r) {
	if (t && ($ = t), J && Y !== e && (J.close(), J = null, Y = null, Q = null), J && Y === e) return;
	Y = e;
	let i = n ?? re ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? ie ?? "Anonymous";
	re = i, ie = a, Q = new L({
		send: (e) => {
			J && J.readyState === WebSocket.OPEN && J.send(M(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			$ && $({
				type: e.type,
				position: e.position,
				roomId: Y ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			$ && $({
				type: n ? "play" : "pause",
				position: t,
				roomId: Y ?? void 0
			});
		},
		onDisconnect: () => {},
		onError: (e, t) => {
			console.error(`[SyncPlay] Error: ${e} - ${t}`);
		},
		onInfo: (e) => {
			console.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = oe(e);
	console.log(`[SyncPlay] Opening WebSocket to ${o}`), J = new WebSocket(o), J.onopen = () => {
		console.log("[SyncPlay] WebSocket connected"), X = 0, Q && Y && Q.joinGroup(Y);
	}, J.onmessage = se, J.onclose = ce, J.onerror = (e) => {
		console.error("[SyncPlay] WebSocket error", e);
	};
}
function de() {
	J &&= (J.close(), null), Q &&= (Q.leaveGroup(), Q.onDisconnect(), null), Y = null, X = 0;
}
function fe(e) {
	!Q || !J || J.readyState !== WebSocket.OPEN || Q.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function pe(e) {
	if (!(!Q || !J || J.readyState !== WebSocket.OPEN)) switch (e.type) {
		case "play":
			Q.sendPlay(e.position ?? 0);
			break;
		case "pause":
			Q.sendPause(e.position ?? 0);
			break;
		case "seek":
			e.position !== void 0 && Q.sendSeek(0, e.position);
			break;
		case "sync": e.position !== void 0 && Q.reportPosition(e.position, !0);
	}
}
var me = 5e3;
function he() {
	let e = o().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var ge = O("phlix-syncplay", () => {
	let e = x(null), t = x(null), n = x([]), r = x(null), i = x(!1), a = x(0), o = 0, s = null, c = d(() => t.value !== null), l = d(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), u = d(() => n.value.filter((e) => e.isOnline)), f = d(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - o) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return a.value - r;
	}), p = d(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(f.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	function m() {
		let e = t.value;
		if (!e) {
			g();
			return;
		}
		e.state === "playing" && fe({
			sessionId: e.id,
			playbackPosition: a.value,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	function h() {
		g(), s = setInterval(m, me);
	}
	function g() {
		s !== null && (clearInterval(s), s = null);
	}
	function _(r, i, a) {
		let { room: s, session: c } = i;
		t.value = c, o = Date.now(), e.value = {
			...e.value ?? {},
			...s,
			currentSession: c
		}, n.value = c.activeUsers, le(r, (e) => {
			S(e);
		}, void 0, a), h();
	}
	async function v(t, n) {
		i.value = !0, r.value = null;
		try {
			let r = q(t), i = he(), a = await r.createRoom({
				...n,
				memberName: i
			});
			e.value = a, _(a.id, await r.joinRoom(a.id, i), i);
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to create room", e;
		} finally {
			i.value = !1;
		}
	}
	async function y(e, t) {
		i.value = !0, r.value = null;
		try {
			let n = q(e), r = he();
			_(t, await n.joinRoom(t, r), r);
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to join room", e;
		} finally {
			i.value = !1;
		}
	}
	async function b(a) {
		if (e.value) {
			i.value = !0, r.value = null;
			try {
				await q(a).leaveRoom(e.value.id), g(), de(), e.value = null, t.value = null, n.value = [];
			} catch (e) {
				throw r.value = e instanceof Error ? e.message : "Failed to leave room", e;
			} finally {
				i.value = !1;
			}
		}
	}
	function S(e) {
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
			case "sync": e.position !== void 0 && (o = Date.now(), t.value = {
				...t.value,
				playbackPosition: e.position
			}), e.rate !== void 0 && (t.value = {
				...t.value,
				playbackRate: e.rate
			});
		}
	}
	function C(e, n, r) {
		t.value && pe({
			type: n,
			position: r?.position,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function w(e) {
		if (t.value) try {
			let n = await q(e).getState(t.value.id);
			t.value = n, o = Date.now();
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function T(t) {
		if (e.value) try {
			let r = await q(t).getMembers(e.value.id);
			n.value = r;
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to refresh members", e;
		}
	}
	function E() {
		r.value = null;
	}
	function D(e) {
		a.value = e;
	}
	return {
		currentRoom: e,
		currentSession: t,
		members: n,
		error: r,
		isLoading: i,
		localPlaybackPosition: a,
		isInRoom: c,
		isSynced: l,
		onlineMembers: u,
		syncStatus: p,
		driftAmount: f,
		createAndJoinRoom: v,
		joinRoom: y,
		leaveRoom: b,
		onRemoteStateUpdate: S,
		sendCommand: C,
		refreshState: w,
		refreshMembers: T,
		clearError: E,
		updateLocalPosition: D
	};
}), _e = {
	class: "syncplay-modal__tabs",
	role: "tablist"
}, ve = ["aria-selected"], ye = ["aria-selected"], be = {
	key: 0,
	class: "syncplay-modal__fields"
}, xe = { class: "syncplay-modal__field" }, Se = {
	class: "syncplay-modal__label",
	for: "room-name"
}, Ce = ["placeholder"], we = { class: "syncplay-modal__field syncplay-modal__field--toggle" }, Te = { class: "syncplay-modal__toggle-hint" }, Ee = {
	key: 1,
	class: "syncplay-modal__fields"
}, De = { class: "syncplay-modal__field" }, Oe = {
	class: "syncplay-modal__label",
	for: "room-id"
}, ke = ["placeholder"], Ae = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, je = {
	key: 3,
	class: "syncplay-modal__rooms"
}, Me = { class: "syncplay-modal__rooms-title" }, Ne = { class: "syncplay-modal__rooms-list" }, Pe = ["onClick"], Fe = { class: "syncplay-modal__room-name" }, Ie = { class: "syncplay-modal__room-count" }, Le = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, Re = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(e, { emit: r }) {
		let i = e, o = r, { t: v } = n(), O = ge(), k = a(), A = d(() => i.apiBase ?? k.value), j = x("create"), M = x(""), N = x(""), P = x(!0), F = x(!1), I = x(null), L = x([]), R = x(!1), z = d(() => M.value.trim().length > 0), B = d(() => N.value.trim().length > 0), V = d(() => (j.value === "create" ? z.value : B.value) && !F.value);
		E(() => i.modelValue, async (e) => {
			e && (I.value = null, M.value = "", P.value = !0, i.prefilledRoomId ? (N.value = i.prefilledRoomId, j.value = "join") : (N.value = "", j.value = "create"), await H());
		});
		async function H() {
			R.value = !0;
			try {
				let e = new G(A.value);
				L.value = await e.listPublicRooms();
			} catch {
				L.value = [];
			} finally {
				R.value = !1;
			}
		}
		async function U() {
			if (V.value) {
				F.value = !0, I.value = null;
				try {
					j.value === "create" ? await O.createAndJoinRoom(A.value, {
						name: M.value.trim(),
						isPublic: P.value
					}) : await O.joinRoom(A.value, N.value.trim()), O.currentRoom && o("joined", O.currentRoom), o("update:modelValue", !1);
				} catch (e) {
					I.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					F.value = !1;
				}
			}
		}
		function W(e) {
			j.value = "join", N.value = e.id, M.value = e.name;
		}
		function K() {
			o("update:modelValue", !1);
		}
		return (n, r) => (b(), f(l, {
			"model-value": e.modelValue,
			title: w(v)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[5] ||= (e) => o("update:modelValue", e),
			onClose: K
		}, {
			footer: D(() => [_(s, {
				variant: "ghost",
				type: "button",
				onClick: K
			}, {
				default: D(() => [g(C(w(v)("common.close")), 1)]),
				_: 1
			}), _(s, {
				variant: "solid",
				type: "button",
				loading: F.value,
				disabled: !V.value,
				onClick: U
			}, {
				default: D(() => [g(C(j.value === "create" ? w(v)("syncplay.createRoom") : w(v)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: D(() => [h("form", {
				class: "syncplay-modal",
				onSubmit: te(U, ["prevent"])
			}, [
				h("div", _e, [h("button", {
					type: "button",
					role: "tab",
					class: y(["syncplay-modal__tab", { "is-active": j.value === "create" }]),
					"aria-selected": j.value === "create",
					onClick: r[0] ||= (e) => j.value = "create"
				}, C(w(v)("syncplay.createRoom")), 11, ve), h("button", {
					type: "button",
					role: "tab",
					class: y(["syncplay-modal__tab", { "is-active": j.value === "join" }]),
					"aria-selected": j.value === "join",
					onClick: r[1] ||= (e) => j.value = "join"
				}, C(w(v)("syncplay.joinRoom")), 11, ye)]),
				j.value === "create" ? (b(), m("div", be, [h("div", xe, [h("label", Se, C(w(v)("syncplay.roomName")), 1), ee(h("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => M.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: w(v)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, Ce), [[T, M.value]])]), h("div", we, [_(c, {
					modelValue: P.value,
					"onUpdate:modelValue": r[3] ||= (e) => P.value = e,
					label: w(v)("syncplay.publicRoom")
				}, null, 8, ["modelValue", "label"]), h("span", Te, C(P.value ? w(v)("syncplay.publicHint") : w(v)("syncplay.privateHint")), 1)])])) : (b(), m("div", Ee, [h("div", De, [h("label", Oe, C(w(v)("syncplay.roomId")), 1), ee(h("input", {
					id: "room-id",
					"onUpdate:modelValue": r[4] ||= (e) => N.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: w(v)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, ke), [[T, N.value]])])])),
				I.value ? (b(), m("p", Ae, C(I.value), 1)) : p("", !0),
				j.value === "join" && L.value.length > 0 ? (b(), m("div", je, [h("h3", Me, C(w(v)("syncplay.publicRooms")), 1), h("ul", Ne, [(b(!0), m(u, null, S(L.value, (e) => (b(), m("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [h("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => W(e)
				}, [
					_(t, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					h("span", Fe, C(e.name), 1),
					h("span", Ie, C(w(v)("syncplay.members", { count: e.memberCount })), 1)
				], 8, Pe)]))), 128))])])) : p("", !0),
				R.value ? (b(), m("div", Le, [_(t, { name: "spinner" }), h("span", null, C(w(v)("common.loading")), 1)])) : p("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-c5ff0c28"]]);
//#endregion
export { ge as n, Re as t };

//# sourceMappingURL=SyncPlayModal-I4MN_tr4.js.map