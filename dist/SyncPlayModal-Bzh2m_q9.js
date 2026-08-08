import { n as e, t } from "./Icon-CkTBN_k5.js";
import { t as n } from "./useMessages-nO4j4SSL.js";
import { l as r, t as i } from "./client-COHWZ2KC.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./Button-Cw8Wl4QR.js";
import { t as s } from "./Switch-H74PI5Oy.js";
import { t as c } from "./Modal-Nn1mtFl3.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeClass as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, vModelText as w, watch as ee, withCtx as T, withDirectives as E, withModifiers as te } from "vue";
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
function ne(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function k(e) {
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
function A(e) {
	return JSON.stringify(e);
}
var j = .1, M = .99, N = 1.01, P = class {
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
		this.driftRate = 1 + j * i / 1e3, this.driftRate = Math.min(N, Math.max(M, this.driftRate));
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
}, F = class {
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
		let t = k(e);
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
		this.send(ne(e, t, this.now));
	}
};
//#endregion
//#region src/api/syncplay.ts
function I(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function L(e) {
	let t = I(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function R(e) {
	return e.group_id ?? e.id ?? "";
}
function z(e) {
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
		lastSeen: L(e.joined_at)
	})) : [];
}
function B(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function V(e) {
	let t = e ?? {}, n = R(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: I(t.member_count, z(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: L(t.created_at)
	};
}
function H(e) {
	let t = e ?? {}, n = R(t), r = B(t);
	return {
		id: n,
		roomId: n,
		serverId: "",
		createdBy: t.host_id ?? "",
		createdAt: L(t.created_at),
		state: r,
		playbackPosition: I(t.playback_position),
		playbackRate: +(r === "playing"),
		serverTime: I(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: L(t.last_activity_at),
		activeUsers: z(t),
		roles: Object.fromEntries(z(t).map((e) => [e.id, e.role])),
		permissions: {}
	};
}
var U = class {
	client;
	constructor(e) {
		this.client = new i({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new r() : void 0
		});
	}
	async createRoom(e) {
		return V((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e) {
		return H((await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`)).group);
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return H((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return z((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(V) : [];
	}
	async listPublicRooms() {
		return this.listGroups();
	}
	async sendStateUpdate(e, t) {}
	async sendCommand(e, t) {}
}, W = null;
function G(e) {
	return W ||= new U(e), W;
}
var K = null, q = null, J = 0, Y = 5, re = 1e3, X = null, Z = null, Q = null, $ = null;
function ie() {
	try {
		return typeof window > "u" ? null : new r().getAccessToken();
	} catch {
		return null;
	}
}
function ae(e) {
	let t = typeof window < "u" ? window.location.hostname : "localhost", n = ie() ?? "";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${t}:8097?token=${encodeURIComponent(n)}&room=${encodeURIComponent(e)}`;
}
function oe(e) {
	if (X) try {
		let t = JSON.parse(e.data);
		X.handleIncoming(t);
	} catch {}
}
function se() {
	if (K = null, X && X.onDisconnect(), q && J < Y) {
		let e = re * 2 ** J;
		J++, console.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${J})`), setTimeout(() => {
			q && ce(q);
		}, e);
	} else J >= Y && (console.warn("[SyncPlay] Max reconnect attempts reached, giving up"), q = null, J = 0, X = null);
}
function ce(e, t, n, r) {
	if (t && ($ = t), K && q !== e && (K.close(), K = null, q = null, J = 0, X = null), K && q === e) return;
	q = e, J = 0;
	let i = n ?? Z ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? Q ?? "Anonymous";
	Z = i, Q = a, X = new F({
		send: (e) => {
			K && K.readyState === WebSocket.OPEN && K.send(A(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			$ && $({
				type: e.type,
				position: e.position,
				roomId: q ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			$ && $({
				type: n ? "play" : "pause",
				position: t,
				roomId: q ?? void 0
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
	let o = ae(e);
	console.log(`[SyncPlay] Opening WebSocket to ${o}`), K = new WebSocket(o), K.onopen = () => {
		console.log("[SyncPlay] WebSocket connected"), J = 0, X && q && X.joinGroup(q);
	}, K.onmessage = oe, K.onclose = se, K.onerror = (e) => {
		console.error("[SyncPlay] WebSocket error", e);
	};
}
function le() {
	K &&= (K.close(), null), X &&= (X.leaveGroup(), X.onDisconnect(), null), q = null, J = 0;
}
function ue(e) {
	if (!(!X || !K || K.readyState !== WebSocket.OPEN)) switch (e.type) {
		case "play":
			X.sendPlay(e.position ?? 0);
			break;
		case "pause":
			X.sendPause(e.position ?? 0);
			break;
		case "seek":
			e.position !== void 0 && X.sendSeek(0, e.position);
			break;
		case "sync": e.position !== void 0 && X.reportPosition(e.position, !0);
	}
}
var de = D("phlix-syncplay", () => {
	let e = b(null), t = b(null), n = b([]), r = b(null), i = b(!1), a = b(0), o = 0, s = u(() => t.value !== null), c = u(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), l = u(() => n.value.filter((e) => e.isOnline)), d = u(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - o) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return a.value - r;
	}), f = u(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(d.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	async function p(a, o) {
		i.value = !0, r.value = null;
		try {
			let r = G(a), i = await r.createRoom(o);
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
			let r = await G(a).joinRoom(s);
			t.value = r, o = Date.now(), e.value &&= {
				...e.value,
				currentSession: r
			}, n.value = r.activeUsers, ce(s, (e) => {
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
				await G(a).leaveRoom(e.value.id), le(), e.value = null, t.value = null, n.value = [];
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
			case "sync": e.position !== void 0 && (o = Date.now(), t.value = {
				...t.value,
				playbackPosition: e.position
			}), e.rate !== void 0 && (t.value = {
				...t.value,
				playbackRate: e.rate
			});
		}
	}
	function _(e, n, r) {
		t.value && ue({
			type: n,
			position: r?.position,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function v(e) {
		if (t.value) try {
			let n = await G(e).getState(t.value.id);
			t.value = n, o = Date.now();
		} catch (e) {
			throw r.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function y(t) {
		if (e.value) try {
			let r = await G(t).getMembers(e.value.id);
			n.value = r;
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
}), fe = {
	class: "syncplay-modal__tabs",
	role: "tablist"
}, pe = ["aria-selected"], me = ["aria-selected"], he = {
	key: 0,
	class: "syncplay-modal__fields"
}, ge = { class: "syncplay-modal__field" }, _e = {
	class: "syncplay-modal__label",
	for: "room-name"
}, ve = ["placeholder"], ye = { class: "syncplay-modal__field syncplay-modal__field--toggle" }, be = { class: "syncplay-modal__toggle-hint" }, xe = {
	key: 1,
	class: "syncplay-modal__fields"
}, Se = { class: "syncplay-modal__field" }, Ce = {
	class: "syncplay-modal__label",
	for: "room-id"
}, we = ["placeholder"], Te = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, Ee = {
	key: 3,
	class: "syncplay-modal__rooms"
}, De = { class: "syncplay-modal__rooms-title" }, Oe = { class: "syncplay-modal__rooms-list" }, ke = ["onClick"], Ae = { class: "syncplay-modal__room-name" }, je = { class: "syncplay-modal__room-count" }, Me = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, Ne = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(e, { emit: r }) {
		let i = e, _ = r, { t: D } = n(), O = de(), ne = a(), k = u(() => i.apiBase ?? ne.value), A = b("create"), j = b(""), M = b(""), N = b(!0), P = b(!1), F = b(null), I = b([]), L = b(!1), R = u(() => j.value.trim().length > 0), z = u(() => M.value.trim().length > 0), B = u(() => (A.value === "create" ? R.value : z.value) && !P.value);
		ee(() => i.modelValue, async (e) => {
			e && (F.value = null, j.value = "", N.value = !0, i.prefilledRoomId ? (M.value = i.prefilledRoomId, A.value = "join") : (M.value = "", A.value = "create"), await V());
		});
		async function V() {
			L.value = !0;
			try {
				let e = new U(k.value);
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
					A.value === "create" ? (await O.createAndJoinRoom(k.value, {
						name: j.value.trim(),
						isPublic: N.value
					}), O.currentRoom && _("joined", O.currentRoom)) : (await O.joinRoom(k.value, M.value.trim()), O.currentRoom && _("joined", O.currentRoom)), _("update:modelValue", !1);
				} catch (e) {
					F.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					P.value = !1;
				}
			}
		}
		function W(e) {
			A.value = "join", M.value = e.id, j.value = e.name;
		}
		function G() {
			_("update:modelValue", !1);
		}
		return (n, r) => (y(), d(c, {
			"model-value": e.modelValue,
			title: C(D)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[5] ||= (e) => _("update:modelValue", e),
			onClose: G
		}, {
			footer: T(() => [g(o, {
				variant: "ghost",
				type: "button",
				onClick: G
			}, {
				default: T(() => [h(S(C(D)("common.close")), 1)]),
				_: 1
			}), g(o, {
				variant: "solid",
				type: "button",
				loading: P.value,
				disabled: !B.value,
				onClick: H
			}, {
				default: T(() => [h(S(A.value === "create" ? C(D)("syncplay.createRoom") : C(D)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: T(() => [m("form", {
				class: "syncplay-modal",
				onSubmit: te(H, ["prevent"])
			}, [
				m("div", fe, [m("button", {
					type: "button",
					role: "tab",
					class: v(["syncplay-modal__tab", { "is-active": A.value === "create" }]),
					"aria-selected": A.value === "create",
					onClick: r[0] ||= (e) => A.value = "create"
				}, S(C(D)("syncplay.createRoom")), 11, pe), m("button", {
					type: "button",
					role: "tab",
					class: v(["syncplay-modal__tab", { "is-active": A.value === "join" }]),
					"aria-selected": A.value === "join",
					onClick: r[1] ||= (e) => A.value = "join"
				}, S(C(D)("syncplay.joinRoom")), 11, me)]),
				A.value === "create" ? (y(), p("div", he, [m("div", ge, [m("label", _e, S(C(D)("syncplay.roomName")), 1), E(m("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => j.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: C(D)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, ve), [[w, j.value]])]), m("div", ye, [g(s, {
					modelValue: N.value,
					"onUpdate:modelValue": r[3] ||= (e) => N.value = e,
					label: C(D)("syncplay.publicRoom")
				}, null, 8, ["modelValue", "label"]), m("span", be, S(N.value ? C(D)("syncplay.publicHint") : C(D)("syncplay.privateHint")), 1)])])) : (y(), p("div", xe, [m("div", Se, [m("label", Ce, S(C(D)("syncplay.roomId")), 1), E(m("input", {
					id: "room-id",
					"onUpdate:modelValue": r[4] ||= (e) => M.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: C(D)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, we), [[w, M.value]])])])),
				F.value ? (y(), p("p", Te, S(F.value), 1)) : f("", !0),
				A.value === "join" && I.value.length > 0 ? (y(), p("div", Ee, [m("h3", De, S(C(D)("syncplay.publicRooms")), 1), m("ul", Oe, [(y(!0), p(l, null, x(I.value, (e) => (y(), p("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [m("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => W(e)
				}, [
					g(t, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					m("span", Ae, S(e.name), 1),
					m("span", je, S(C(D)("syncplay.members", { count: e.memberCount })), 1)
				], 8, ke)]))), 128))])])) : f("", !0),
				L.value ? (y(), p("div", Me, [g(t, { name: "spinner" }), m("span", null, S(C(D)("common.loading")), 1)])) : f("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-6ff70b4f"]]);
//#endregion
export { de as n, Ne as t };

//# sourceMappingURL=SyncPlayModal-Bzh2m_q9.js.map