import { n as e, t } from "./Icon-CkTBN_k5.js";
import { t as n } from "./useMessages-CEYEiBZk.js";
import { l as r, t as i } from "./client-DA-5QZXw.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useAuthStore-vm6oniX7.js";
import { t as s } from "./Button-Cw8Wl4QR.js";
import { t as c } from "./Modal-D70Bt7PR.js";
import { Fragment as l, computed as u, createBlock as ee, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, normalizeClass as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, vModelText as C, watch as w, withCtx as T, withDirectives as E, withModifiers as te } from "vue";
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
var M = .1, N = .99, P = 1.01, F = class {
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
		this.driftRate = 1 + M * i / 1e3, this.driftRate = Math.min(P, Math.max(N, this.driftRate));
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
}, I = class e {
	send;
	now;
	memberId;
	memberName;
	options;
	timeSync;
	group = null;
	lastPingSendTime = null;
	constructor(e) {
		this.options = e, this.send = e.send, this.now = e.now, this.memberId = e.memberId, this.memberName = e.memberName ?? "User", this.timeSync = new F(e.now);
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
function L(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function R(e) {
	return e / 1e3;
}
function z(e) {
	let t = L(e, 0);
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
		memberCount: L(t.member_count, V(t).length),
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
		currentMediaId: t.current_media_id ?? null,
		playbackPosition: R(L(t.playback_position)),
		playbackRate: +(r === "playing"),
		serverTime: L(t.last_activity_at, Math.floor(Date.now() / 1e3)),
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
		return (await this.listGroups()).filter((e) => e.isPublic);
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
	re = i, ie = a, Q = new I({
		send: (e) => {
			J && J.readyState === WebSocket.OPEN && J.send(j(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			$ && $({
				type: e.type,
				position: R(e.position),
				roomId: Y ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			$ && $({
				type: n ? "play" : "pause",
				position: R(t),
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
var ge = D("phlix-syncplay", () => {
	let e = y(null), t = y(null), n = y(null), r = y([]), i = y(null), a = y(!1), o = y(0), s = 0, c = null, l = u(() => t.value !== null), ee = u(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), d = u(() => r.value.filter((e) => e.isOnline)), f = u(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - s) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return o.value - r;
	}), p = u(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(f.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	function m() {
		let e = t.value;
		if (!e) {
			g();
			return;
		}
		e.state === "playing" && fe({
			sessionId: e.id,
			playbackPosition: o.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	function h() {
		g(), c = setInterval(m, me);
	}
	function g() {
		c !== null && (clearInterval(c), c = null);
	}
	function _(e) {
		n.value = e, t.value &&= {
			...t.value,
			currentMediaId: e.mediaId
		};
	}
	function v() {
		n.value = null;
	}
	function b(n, i, a) {
		let { room: o, session: c } = i;
		t.value = c, s = Date.now(), e.value = {
			...e.value ?? {},
			...o,
			currentSession: c
		}, r.value = c.activeUsers, le(n, (e) => {
			w(e);
		}, void 0, a), h();
	}
	async function x(t, n) {
		a.value = !0, i.value = null;
		try {
			let r = q(t), i = he(), a = await r.createRoom({
				...n,
				memberName: i
			});
			e.value = a, b(a.id, await r.joinRoom(a.id, i), i);
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to create room", e;
		} finally {
			a.value = !1;
		}
	}
	async function S(e, t) {
		a.value = !0, i.value = null;
		try {
			let n = q(e), r = he();
			b(t, await n.joinRoom(t, r), r);
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to join room", e;
		} finally {
			a.value = !1;
		}
	}
	async function C(n) {
		if (e.value) {
			a.value = !0, i.value = null;
			try {
				await q(n).leaveRoom(e.value.id), g(), de(), e.value = null, t.value = null, r.value = [];
			} catch (e) {
				throw i.value = e instanceof Error ? e.message : "Failed to leave room", e;
			} finally {
				a.value = !1;
			}
		}
	}
	function w(e) {
		if (t.value) switch (e.type) {
			case "play":
				e.position !== void 0 && (s = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				}), t.value = {
					...t.value,
					state: "playing"
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
	function T(e, n, r) {
		t.value && pe({
			type: n,
			position: r?.position === void 0 ? void 0 : r.position * 1e3,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function E(e) {
		if (t.value) try {
			let n = await q(e).getState(t.value.id);
			t.value = n, s = Date.now();
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function te(t) {
		if (e.value) try {
			let n = await q(t).getMembers(e.value.id);
			r.value = n;
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh members", e;
		}
	}
	function D() {
		i.value = null;
	}
	function O(e) {
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
		isInRoom: l,
		isSynced: ee,
		onlineMembers: d,
		syncStatus: p,
		driftAmount: f,
		createAndJoinRoom: x,
		joinRoom: S,
		leaveRoom: C,
		onRemoteStateUpdate: w,
		sendCommand: T,
		refreshState: E,
		refreshMembers: te,
		clearError: D,
		updateLocalPosition: O,
		applyPendingPlayMedia: _,
		consumePendingPlayMedia: v
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
}, Ce = ["placeholder"], we = {
	key: 1,
	class: "syncplay-modal__fields"
}, Te = { class: "syncplay-modal__field" }, Ee = {
	class: "syncplay-modal__label",
	for: "room-id"
}, De = ["placeholder"], Oe = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, ke = {
	key: 3,
	class: "syncplay-modal__rooms"
}, Ae = { class: "syncplay-modal__rooms-title" }, je = { class: "syncplay-modal__rooms-list" }, Me = ["onClick"], Ne = { class: "syncplay-modal__room-name" }, Pe = { class: "syncplay-modal__room-count" }, Fe = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, Ie = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(e, { emit: r }) {
		let i = e, o = r, { t: g } = n(), D = ge(), O = a(), k = u(() => i.apiBase ?? O.value), A = y("create"), j = y(""), M = y(""), N = y(!1), P = y(null), F = y([]), I = y(!1), L = u(() => j.value.trim().length > 0), R = u(() => M.value.trim().length > 0), z = u(() => (A.value === "create" ? L.value : R.value) && !N.value);
		w(() => i.modelValue, async (e) => {
			e && (P.value = null, j.value = "", i.prefilledRoomId ? (M.value = i.prefilledRoomId, A.value = "join") : (M.value = "", A.value = "create"), await B());
		});
		async function B() {
			I.value = !0;
			try {
				let e = new G(k.value);
				F.value = await e.listPublicRooms();
			} catch {
				F.value = [];
			} finally {
				I.value = !1;
			}
		}
		async function V() {
			if (z.value) {
				N.value = !0, P.value = null;
				try {
					A.value === "create" ? await D.createAndJoinRoom(k.value, { name: j.value.trim() }) : await D.joinRoom(k.value, M.value.trim()), D.currentRoom && o("joined", D.currentRoom), o("update:modelValue", !1);
				} catch (e) {
					P.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					N.value = !1;
				}
			}
		}
		function H(e) {
			A.value = "join", M.value = e.id, j.value = e.name;
		}
		function U() {
			o("update:modelValue", !1);
		}
		return (n, r) => (v(), ee(c, {
			"model-value": e.modelValue,
			title: S(g)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[4] ||= (e) => o("update:modelValue", e),
			onClose: U
		}, {
			footer: T(() => [h(s, {
				variant: "ghost",
				type: "button",
				onClick: U
			}, {
				default: T(() => [m(x(S(g)("common.close")), 1)]),
				_: 1
			}), h(s, {
				variant: "solid",
				type: "button",
				loading: N.value,
				disabled: !z.value,
				onClick: V
			}, {
				default: T(() => [m(x(A.value === "create" ? S(g)("syncplay.createRoom") : S(g)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: T(() => [p("form", {
				class: "syncplay-modal",
				onSubmit: te(V, ["prevent"])
			}, [
				p("div", _e, [p("button", {
					type: "button",
					role: "tab",
					class: _(["syncplay-modal__tab", { "is-active": A.value === "create" }]),
					"aria-selected": A.value === "create",
					onClick: r[0] ||= (e) => A.value = "create"
				}, x(S(g)("syncplay.createRoom")), 11, ve), p("button", {
					type: "button",
					role: "tab",
					class: _(["syncplay-modal__tab", { "is-active": A.value === "join" }]),
					"aria-selected": A.value === "join",
					onClick: r[1] ||= (e) => A.value = "join"
				}, x(S(g)("syncplay.joinRoom")), 11, ye)]),
				A.value === "create" ? (v(), f("div", be, [p("div", xe, [p("label", Se, x(S(g)("syncplay.roomName")), 1), E(p("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => j.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: S(g)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, Ce), [[C, j.value]])])])) : (v(), f("div", we, [p("div", Te, [p("label", Ee, x(S(g)("syncplay.roomId")), 1), E(p("input", {
					id: "room-id",
					"onUpdate:modelValue": r[3] ||= (e) => M.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: S(g)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, De), [[C, M.value]])])])),
				P.value ? (v(), f("p", Oe, x(P.value), 1)) : d("", !0),
				A.value === "join" && F.value.length > 0 ? (v(), f("div", ke, [p("h3", Ae, x(S(g)("syncplay.publicRooms")), 1), p("ul", je, [(v(!0), f(l, null, b(F.value, (e) => (v(), f("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [p("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => H(e)
				}, [
					h(t, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					p("span", Ne, x(e.name), 1),
					p("span", Pe, x(S(g)("syncplay.members", { count: e.memberCount })), 1)
				], 8, Me)]))), 128))])])) : d("", !0),
				I.value ? (v(), f("div", Fe, [h(t, { name: "spinner" }), p("span", null, x(S(g)("common.loading")), 1)])) : d("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-1d5cbab8"]]);
//#endregion
export { ge as n, Ie as t };

//# sourceMappingURL=SyncPlayModal-_PMF-62L.js.map