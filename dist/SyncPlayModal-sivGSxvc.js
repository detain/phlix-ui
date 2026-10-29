import { n as e, t } from "./Icon-CIwTuFLd.js";
import { t as n } from "./useMessages-B3GZbd0w.js";
import { l as r, t as i } from "./client-CRZ_SWB1.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useAuthStore-BbS6J1QF.js";
import { t as s } from "./Button-BuG0GvCa.js";
import { t as c } from "./socketHint-CP3SoTHk.js";
import { t as ee } from "./Modal-Bd-QVi4Y.js";
import { Fragment as te, computed as l, createBlock as ne, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, normalizeClass as g, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as x, vModelText as S, watch as C, withCtx as w, withDirectives as T, withModifiers as E } from "vue";
import { defineStore as D } from "pinia";
//#region node_modules/@phlix/syncplay/dist/phlix-syncplay.js
var O = {
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
O.GROUP_CREATE, O.GROUP_JOIN, O.GROUP_LEAVE, O.GROUP_STATE, O.GROUP_LIST, O.PLAYBACK_PLAY, O.PLAYBACK_PAUSE, O.PLAYBACK_SEEK, O.PLAYBACK_QUEUE, O.PLAYBACK_SYNC, O.CHAT, O.TYPING, O.HOST_TRANSFER, O.HOST_ELECT, O.TIME_PING, O.TIME_PONG, O.TIME_SYNC, O.ERROR, O.INFO;
function k(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function A(e) {
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
function j(e) {
	return JSON.stringify(e);
}
var re = .1, M = .99, N = 1.01, P = class {
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
		this.driftRate = 1 + re * i / 1e3, this.driftRate = Math.min(N, Math.max(M, this.driftRate));
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
}, F = class e {
	send;
	now;
	memberId;
	memberName;
	options;
	timeSync;
	group = null;
	lastPingSendTime = null;
	constructor(e) {
		this.options = e, this.send = e.send, this.now = e.now, this.memberId = e.memberId, this.memberName = e.memberName ?? "User", this.timeSync = new P(e.now);
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
		t !== void 0 && (n.password_hash = t), this.dispatch(O.GROUP_CREATE, n);
	}
	joinGroup(e, t) {
		let n = {
			group_id: e,
			member_id: this.memberId,
			member_name: this.memberName
		};
		t !== void 0 && (n.password_hash = t), this.dispatch(O.GROUP_JOIN, n);
	}
	leaveGroup() {
		this.group !== null && (this.dispatch(O.GROUP_LEAVE, {
			group_id: this.group.group_id,
			member_id: this.memberId
		}), this.group = null);
	}
	sendPlay(e) {
		this.group !== null && this.dispatch(O.PLAYBACK_PLAY, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendPause(e) {
		this.group !== null && this.dispatch(O.PLAYBACK_PAUSE, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendSeek(e, t) {
		this.group !== null && this.dispatch(O.PLAYBACK_SEEK, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			from_position: e,
			to_position: t,
			server_time: this.getSynchronizedTime()
		});
	}
	reportPosition(e, t) {
		this.group !== null && this.dispatch(O.PLAYBACK_SYNC, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			is_playing: t,
			server_time: this.getSynchronizedTime()
		});
	}
	pingTime() {
		let e = this.now();
		this.lastPingSendTime = e, this.dispatch(O.TIME_PING, { client_time: e });
	}
	onDisconnect() {
		this.timeSync.reset(), this.group = null, this.lastPingSendTime = null, this.options.onDisconnect?.();
	}
	handleIncoming(e) {
		let t = A(e);
		if (t !== null) switch (t.type) {
			case O.TIME_PONG:
				this.handleTimePong(t);
				break;
			case O.GROUP_STATE:
				this.handleGroupState(t);
				break;
			case O.PLAYBACK_PLAY:
				this.handlePlayback("play", t);
				break;
			case O.PLAYBACK_PAUSE:
				this.handlePlayback("pause", t);
				break;
			case O.PLAYBACK_SEEK:
				this.handleSeek(t);
				break;
			case O.HOST_ELECT:
				this.handleHostElect(t);
				break;
			case O.INFO:
				this.handleInfo(t);
				break;
			case O.ERROR:
				this.handleError(t);
				break;
			case O.TYPING:
				this.handleTyping(t);
				break;
			case O.HOST_TRANSFER:
				this.handleHostTransfer(t);
				break;
			case O.PLAYBACK_SYNC:
				this.handlePlaybackSync(t);
				break;
			case O.TIME_SYNC:
				this.handleTimeSync(t);
				break;
			case O.GROUP_LIST:
				this.handleGroupList(t);
				break;
			case O.CHAT:
			case O.PLAYBACK_QUEUE: break;
			default:
				this.options.onUnknownFrame?.(t);
				break;
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
	static normalizeMembers(e, t) {
		let n;
		return n = Array.isArray(e) ? e : e && typeof e == "object" ? Object.entries(e).map(([e, t]) => ({
			...t,
			id: e
		})) : [], n.map((e) => ({
			id: typeof e.id == "string" ? e.id : "",
			name: typeof e.name == "string" ? e.name : "",
			is_host: e.id === t,
			joined_at: typeof e.joined_at == "number" ? e.joined_at : 0
		}));
	}
	handleGroupState(t) {
		let n = t, r = n.group;
		if (typeof r != "object" || !r) return;
		let i = e.normalizeMembers(r.members, r.host_id ?? null);
		this.group = {
			group_id: r.group_id ?? "",
			group_name: r.group_name ?? "",
			members: i,
			member_count: r.member_count,
			host_id: r.host_id ?? null,
			current_media_id: r.current_media_id ?? null,
			current_media_duration: r.current_media_duration ?? null,
			playback_position: r.playback_position ?? 0,
			playback_state: r.playback_state ?? "stopped",
			created_at: r.created_at,
			last_activity_at: r.last_activity_at
		}, this.options.onState?.(this.group, n.your_id);
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
		let t = typeof e.member_id == "string" ? e.member_id : void 0, n = typeof e.position == "number" ? e.position : 0, r = typeof e.is_playing == "boolean" && e.is_playing, i = typeof e.server_time == "number" ? e.server_time : this.getSynchronizedTime();
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
		this.send(k(e, t, this.now));
	}
};
//#endregion
//#region src/api/syncplay.ts
function I(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function L(e) {
	return e / 1e3;
}
function R(e) {
	let t = I(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function z(e) {
	return e.group_id ?? e.id ?? "";
}
function B(e) {
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
		lastSeen: R(e.joined_at)
	})) : [];
}
function V(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function H(e) {
	let t = e ?? {}, n = z(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: I(t.member_count, B(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: R(t.created_at)
	};
}
function U(e) {
	let t = e ?? {}, n = z(t), r = V(t);
	return {
		id: n,
		roomId: n,
		serverId: "",
		createdBy: t.host_id ?? "",
		createdAt: R(t.created_at),
		state: r,
		currentMediaId: t.current_media_id ?? null,
		playbackPosition: L(I(t.playback_position)),
		playbackRate: +(r === "playing"),
		serverTime: I(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: R(t.last_activity_at),
		activeUsers: B(t),
		roles: Object.fromEntries(B(t).map((e) => [e.id, e.role])),
		permissions: {}
	};
}
var ie = class {
	client;
	constructor(e) {
		this.client = new i({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new r() : void 0
		});
	}
	async createRoom(e) {
		return H((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t) {
		let n = t !== void 0 && t !== "" ? { memberName: t } : void 0, r = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, n);
		return {
			room: H(r.group),
			session: U(r.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return U((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return B((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(H) : [];
	}
	async listPublicRooms() {
		return (await this.listGroups()).filter((e) => e.isPublic);
	}
}, W = null, G = null;
function K(e) {
	return (!W || G !== e) && (W = new ie(e), G = e), W;
}
var q = {
	log: () => {},
	warn: () => {},
	error: () => {}
}, J = null;
function ae(e) {
	J = e;
}
var Y = null, X = null, Z = 0, oe = 5, se = 1e3, Q = null, ce = null, le = null, $ = null;
function ue() {
	try {
		return typeof window > "u" ? null : new r().getAccessToken();
	} catch {
		return null;
	}
}
function de(e) {
	let t = c();
	if (t.wsUrl !== null) return `${t.wsUrl}${t.wsPath ?? ""}?room=${encodeURIComponent(e)}`;
	let n = typeof window < "u" ? window.location.hostname : "localhost";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${n}:8097?room=${encodeURIComponent(e)}`;
}
function fe() {
	let e = ue();
	return e ? ["bearer", e] : void 0;
}
function pe(e) {
	if (Q) try {
		let t = JSON.parse(e.data);
		Q.handleIncoming(t);
	} catch {}
}
function me(e) {
	if (!(e && e.target !== Y)) if (Y = null, Q && Q.onDisconnect(), X && Z < oe) {
		let e = se * 2 ** Z;
		Z++, q.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${Z})`), setTimeout(() => {
			X && ge(X);
		}, e);
	} else Z >= oe && (q.warn("[SyncPlay] Max reconnect attempts reached, giving up"), X = null, Z = 0, Q = null);
}
function he(e, t, n, r) {
	Z = 0, ge(e, t, n, r);
}
function ge(e, t, n, r) {
	if (t && ($ = t), Y && X !== e) {
		let e = Y;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Y = null, X = null, Q = null;
	}
	if (Y && X === e) return;
	X = e;
	let i = n ?? ce ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? le ?? "Anonymous";
	ce = i, le = a, Q = new F({
		send: (e) => {
			Y && Y.readyState === WebSocket.OPEN && Y.send(j(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			$ && $({
				type: e.type,
				position: L(e.position),
				roomId: X ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			$ && $({
				type: n ? "play" : "pause",
				position: L(t),
				roomId: X ?? void 0
			});
		},
		onDisconnect: () => {},
		onError: (e, t) => {
			q.error(`[SyncPlay] Error: ${e} - ${t}`), J?.(e, t);
		},
		onInfo: (e) => {
			q.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = de(e);
	q.log(`[SyncPlay] Opening WebSocket to ${o}`);
	let s;
	try {
		s = new WebSocket(o, fe());
	} catch (e) {
		q.error("[SyncPlay] WebSocket constructor refused the handshake", e), me();
		return;
	}
	Y = s, s.onopen = () => {
		q.log("[SyncPlay] WebSocket connected"), Z = 0, Q && X && Q.joinGroup(X);
	}, s.onmessage = pe, s.onclose = me, s.onerror = (e) => {
		q.error("[SyncPlay] WebSocket error", e);
	};
}
function _e() {
	if (Y) {
		let e = Y;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Y = null;
	}
	Q &&= (Q.leaveGroup(), Q.onDisconnect(), null), X = null, Z = 0;
}
function ve(e) {
	!Q || !Y || Y.readyState !== WebSocket.OPEN || Q.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function ye(e) {
	if (!Q || !Y || Y.readyState !== WebSocket.OPEN) return !1;
	switch (e.type) {
		case "play": return Q.sendPlay(e.position ?? 0), !0;
		case "pause": return Q.sendPause(e.position ?? 0), !0;
		case "seek": return e.position !== void 0 && (Q.sendSeek(0, e.position), !0);
		case "sync": return e.position !== void 0 && (Q.reportPosition(e.position, !0), !0);
	}
}
var be = 5e3;
function xe() {
	let e = o().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var Se = class extends Error {
	commandType;
	constructor(e) {
		super(`SyncPlay '${e}' command was not delivered to the group`), this.commandType = e, this.name = "SyncPlayCommandNotDeliveredError";
	}
}, Ce = D("phlix-syncplay", () => {
	let e = v(null), t = v(null), n = v(null), r = v([]), i = v(null), a = v(!1), o = v(0), s = 0, c = null, ee = l(() => t.value !== null), te = l(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), ne = l(() => r.value.filter((e) => e.isOnline)), u = l(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - s) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return o.value - r;
	}), d = l(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(u.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	function f() {
		let e = t.value;
		if (!e) {
			m();
			return;
		}
		e.state === "playing" && ve({
			sessionId: e.id,
			playbackPosition: o.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	function p() {
		m(), c = setInterval(f, be);
	}
	function m() {
		c !== null && (clearInterval(c), c = null);
	}
	function h(e) {
		n.value = e, t.value &&= {
			...t.value,
			currentMediaId: e.mediaId
		};
	}
	function g() {
		n.value = null;
	}
	function _(n, i, a) {
		let { room: o, session: c } = i;
		t.value = c, s = Date.now(), e.value = {
			...e.value ?? {},
			...o,
			currentSession: c
		}, r.value = c.activeUsers, he(n, (e) => {
			S(e);
		}, void 0, a), p();
	}
	async function y(t, n) {
		a.value = !0, i.value = null;
		try {
			let r = K(t), i = xe(), a = await r.createRoom({
				...n,
				memberName: i
			});
			e.value = a, _(a.id, await r.joinRoom(a.id, i), i);
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to create the room", e;
		} finally {
			a.value = !1;
		}
	}
	async function b(e, t) {
		a.value = !0, i.value = null;
		try {
			let n = K(e), r = xe();
			_(t, await n.joinRoom(t, r), r);
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to join the room", e;
		} finally {
			a.value = !1;
		}
	}
	async function x(n) {
		if (e.value) {
			a.value = !0, i.value = null;
			try {
				await K(n).leaveRoom(e.value.id), m(), _e(), e.value = null, t.value = null, r.value = [];
			} catch (e) {
				throw i.value = e instanceof Error ? e.message : "Failed to leave the room", e;
			} finally {
				a.value = !1;
			}
		}
	}
	function S(e) {
		if (t.value) switch (e.type) {
			case "play":
				e.position !== void 0 && (s = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				}), t.value = {
					...t.value,
					state: "playing",
					playbackRate: e.rate ?? 1
				};
				break;
			case "pause":
				e.position !== void 0 && (s = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				}), t.value = {
					...t.value,
					state: "paused"
				};
				break;
			case "seek":
				e.position !== void 0 && (s = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				});
				break;
			case "sync": e.position !== void 0 && (s = Date.now(), t.value = {
				...t.value,
				playbackPosition: e.position
			}), e.rate !== void 0 && (t.value = {
				...t.value,
				playbackRate: e.rate
			});
		}
	}
	function C(e, n, r) {
		if (t.value && !ye({
			type: n,
			position: r?.position === void 0 ? void 0 : r.position * 1e3,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		})) throw i.value = "SyncPlay command was not delivered to the group", new Se(n);
	}
	async function w(e) {
		if (t.value) try {
			let n = await K(e).getState(t.value.id);
			t.value = n, s = Date.now();
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function T(t) {
		if (e.value) try {
			let n = await K(t).getMembers(e.value.id);
			r.value = n;
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh members", e;
		}
	}
	function E() {
		i.value = null;
	}
	function D(e) {
		o.value = e;
	}
	return {
		currentRoom: e,
		currentSession: t,
		members: r,
		error: i,
		isLoading: a,
		localPlaybackPosition: o,
		pendingPlayMedia: n,
		isInRoom: ee,
		isSynced: te,
		onlineMembers: ne,
		syncStatus: d,
		driftAmount: u,
		createAndJoinRoom: y,
		joinRoom: b,
		leaveRoom: x,
		onRemoteStateUpdate: S,
		sendCommand: C,
		refreshState: w,
		refreshMembers: T,
		clearError: E,
		updateLocalPosition: D,
		applyPendingPlayMedia: h,
		consumePendingPlayMedia: g
	};
}), we = ["aria-label"], Te = ["aria-checked", "tabindex"], Ee = ["aria-checked", "tabindex"], De = {
	key: 0,
	class: "syncplay-modal__fields"
}, Oe = { class: "syncplay-modal__field" }, ke = {
	class: "syncplay-modal__label",
	for: "room-name"
}, Ae = ["placeholder"], je = {
	key: 1,
	class: "syncplay-modal__fields"
}, Me = { class: "syncplay-modal__field" }, Ne = {
	class: "syncplay-modal__label",
	for: "room-id"
}, Pe = ["placeholder"], Fe = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, Ie = {
	key: 3,
	class: "syncplay-modal__rooms"
}, Le = { class: "syncplay-modal__rooms-title" }, Re = { class: "syncplay-modal__rooms-list" }, ze = ["onClick"], Be = { class: "syncplay-modal__room-name" }, Ve = { class: "syncplay-modal__room-count" }, He = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, Ue = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(e, { emit: r }) {
		let i = e, o = r, { t: c } = n(), h = Ce(), D = a(), O = l(() => i.apiBase ?? D.value), k = v("create"), A = v(null), j = v(null);
		function re(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), k.value = "create", A.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), k.value = "join", j.value?.focus();
			}
		}
		let M = v(""), N = v(""), P = v(!1), F = v(null), I = v([]), L = v(!1), R = l(() => M.value.trim().length > 0), z = l(() => N.value.trim().length > 0), B = l(() => (k.value === "create" ? R.value : z.value) && !P.value);
		C(() => i.modelValue, async (e) => {
			e && (F.value = null, M.value = "", i.prefilledRoomId ? (N.value = i.prefilledRoomId, k.value = "join") : (N.value = "", k.value = "create"), await V());
		});
		async function V() {
			L.value = !0;
			try {
				let e = new ie(O.value);
				I.value = await e.listPublicRooms();
			} catch {
				I.value = [];
			} finally {
				L.value = !1;
			}
		}
		async function H() {
			if (B.value) {
				P.value = !0, F.value = null;
				try {
					k.value === "create" ? await h.createAndJoinRoom(O.value, { name: M.value.trim() }) : await h.joinRoom(O.value, N.value.trim()), h.currentRoom && o("joined", h.currentRoom), o("update:modelValue", !1);
				} catch (e) {
					F.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					P.value = !1;
				}
			}
		}
		function U(e) {
			k.value = "join", N.value = e.id, M.value = e.name;
		}
		function W() {
			o("update:modelValue", !1);
		}
		return (n, r) => (_(), ne(ee, {
			"model-value": e.modelValue,
			title: x(c)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[4] ||= (e) => o("update:modelValue", e),
			onClose: W
		}, {
			footer: w(() => [m(s, {
				variant: "ghost",
				type: "button",
				onClick: W
			}, {
				default: w(() => [p(b(x(c)("common.close")), 1)]),
				_: 1
			}), m(s, {
				variant: "solid",
				type: "button",
				loading: P.value,
				disabled: !B.value,
				onClick: H
			}, {
				default: w(() => [p(b(k.value === "create" ? x(c)("syncplay.createRoom") : x(c)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: w(() => [f("form", {
				class: "syncplay-modal",
				onSubmit: E(H, ["prevent"])
			}, [
				f("div", {
					class: "syncplay-modal__tabs",
					role: "radiogroup",
					"aria-label": x(c)("syncplay.modeSelect"),
					onKeydown: re
				}, [f("button", {
					ref_key: "createOptionEl",
					ref: A,
					type: "button",
					role: "radio",
					class: g(["syncplay-modal__tab", { "is-active": k.value === "create" }]),
					"aria-checked": k.value === "create",
					tabindex: k.value === "create" ? 0 : -1,
					onClick: r[0] ||= (e) => k.value = "create"
				}, b(x(c)("syncplay.createRoom")), 11, Te), f("button", {
					ref_key: "joinOptionEl",
					ref: j,
					type: "button",
					role: "radio",
					class: g(["syncplay-modal__tab", { "is-active": k.value === "join" }]),
					"aria-checked": k.value === "join",
					tabindex: k.value === "join" ? 0 : -1,
					onClick: r[1] ||= (e) => k.value = "join"
				}, b(x(c)("syncplay.joinRoom")), 11, Ee)], 40, we),
				k.value === "create" ? (_(), d("div", De, [f("div", Oe, [f("label", ke, b(x(c)("syncplay.roomName")), 1), T(f("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => M.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: x(c)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, Ae), [[S, M.value]])])])) : (_(), d("div", je, [f("div", Me, [f("label", Ne, b(x(c)("syncplay.roomId")), 1), T(f("input", {
					id: "room-id",
					"onUpdate:modelValue": r[3] ||= (e) => N.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: x(c)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, Pe), [[S, N.value]])])])),
				F.value ? (_(), d("p", Fe, b(F.value), 1)) : u("", !0),
				k.value === "join" && I.value.length > 0 ? (_(), d("div", Ie, [f("h3", Le, b(x(c)("syncplay.publicRooms")), 1), f("ul", Re, [(_(!0), d(te, null, y(I.value, (e) => (_(), d("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [f("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => U(e)
				}, [
					m(t, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					f("span", Be, b(e.name), 1),
					f("span", Ve, b(x(c)("syncplay.members", { count: e.memberCount })), 1)
				], 8, ze)]))), 128))])])) : u("", !0),
				L.value ? (_(), d("div", He, [m(t, { name: "spinner" }), f("span", null, b(x(c)("common.loading")), 1)])) : u("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-fc76bfb0"]]);
//#endregion
export { Ce as n, ae as r, Ue as t };

//# sourceMappingURL=SyncPlayModal-sivGSxvc.js.map