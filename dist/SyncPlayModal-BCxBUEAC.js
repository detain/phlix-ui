import { n as e, t } from "./Icon-CIwTuFLd.js";
import { t as n } from "./useMessages-CiSCI5Ag.js";
import { g as r, l as i, p as a, t as o } from "./client-CSOeqVlU.js";
import { n as s } from "./useApiBase-CV_r-Kk4.js";
import { t as c } from "./useAuthStore-D_bFae0K.js";
import { t as l } from "./Button-BuG0GvCa.js";
import { t as u } from "./socketHint-CP3SoTHk.js";
import { t as d } from "./Modal-BDkw7NP1.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as ee, nextTick as te, normalizeClass as ne, openBlock as x, ref as S, renderList as re, toDisplayString as C, unref as w, vModelDynamic as ie, vModelText as ae, watch as oe, withCtx as T, withDirectives as E, withModifiers as se } from "vue";
import { defineStore as D } from "pinia";
//#region src/utils/syncplaySha256.ts
var O = [
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
];
function k(e, t) {
	return (e >>> t | e << 32 - t) >>> 0;
}
function ce(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 1) {
		let r = e.codePointAt(n);
		r > 65535 && (n += 1), r < 128 ? t.push(r) : r < 2048 ? t.push(192 | r >>> 6, 128 | r & 63) : r < 65536 ? t.push(224 | r >>> 12, 128 | r >>> 6 & 63, 128 | r & 63) : t.push(240 | r >>> 18, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | r & 63);
	}
	return t;
}
function le(e) {
	let t = ce(e), n = t.length * 8;
	for (t.push(128); t.length % 64 != 56;) t.push(0);
	let r = Math.floor(n / 4294967296), i = n % 4294967296;
	t.push(r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, r & 255, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, i & 255);
	let a = 1779033703, o = 3144134277, s = 1013904242, c = 2773480762, l = 1359893119, u = 2600822924, d = 528734635, f = 1541459225, p = /* @__PURE__ */ new Int32Array(64);
	for (let e = 0; e < t.length; e += 64) {
		for (let n = 0; n < 16; n += 1) {
			let r = e + n * 4;
			p[n] = (t[r] << 24 | t[r + 1] << 16 | t[r + 2] << 8 | t[r + 3]) >>> 0;
		}
		for (let e = 16; e < 64; e += 1) {
			let t = (k(p[e - 15], 7) ^ k(p[e - 15], 18) ^ p[e - 15] >>> 3) >>> 0, n = (k(p[e - 2], 17) ^ k(p[e - 2], 19) ^ p[e - 2] >>> 10) >>> 0;
			p[e] = p[e - 16] + t + p[e - 7] + n >>> 0;
		}
		let n = a, r = o, i = s, m = c, h = l, g = u, _ = d, v = f;
		for (let e = 0; e < 64; e += 1) {
			let t = (k(h, 6) ^ k(h, 11) ^ k(h, 25)) >>> 0, a = (h & g ^ ~h & _) >>> 0, o = v + t + a + O[e] + p[e] >>> 0, s = ((k(n, 2) ^ k(n, 13) ^ k(n, 22)) >>> 0) + ((n & r ^ n & i ^ r & i) >>> 0) >>> 0;
			v = _, _ = g, g = h, h = m + o >>> 0, m = i, i = r, r = n, n = o + s >>> 0;
		}
		a = a + n >>> 0, o = o + r >>> 0, s = s + i >>> 0, c = c + m >>> 0, l = l + h >>> 0, u = u + g >>> 0, d = d + _ >>> 0, f = f + v >>> 0;
	}
	return [
		a,
		o,
		s,
		c,
		l,
		u,
		d,
		f
	].map((e) => (e >>> 0).toString(16).padStart(8, "0")).join("");
}
function A(e) {
	if (e === "") throw Error("hashGroupPassword: refusing to hash an empty password — omit the password_hash field instead");
	return le(e);
}
//#endregion
//#region node_modules/@phlix/syncplay/dist/phlix-syncplay.js
var j = {
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
j.GROUP_CREATE, j.GROUP_JOIN, j.GROUP_LEAVE, j.GROUP_STATE, j.GROUP_LIST, j.PLAYBACK_PLAY, j.PLAYBACK_PAUSE, j.PLAYBACK_SEEK, j.PLAYBACK_QUEUE, j.PLAYBACK_SYNC, j.CHAT, j.TYPING, j.HOST_TRANSFER, j.HOST_ELECT, j.TIME_PING, j.TIME_PONG, j.TIME_SYNC, j.ERROR, j.INFO;
function M(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function N(e) {
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
function P(e) {
	return JSON.stringify(e);
}
var ue = .1, de = .99, F = 1.01, I = class {
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
		this.driftRate = 1 + ue * i / 1e3, this.driftRate = Math.min(F, Math.max(de, this.driftRate));
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
}, L = class e {
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
		t !== void 0 && (n.password_hash = t), this.dispatch(j.GROUP_CREATE, n);
	}
	joinGroup(e, t) {
		let n = {
			group_id: e,
			member_id: this.memberId,
			member_name: this.memberName
		};
		t !== void 0 && (n.password_hash = t), this.dispatch(j.GROUP_JOIN, n);
	}
	leaveGroup() {
		this.group !== null && (this.dispatch(j.GROUP_LEAVE, {
			group_id: this.group.group_id,
			member_id: this.memberId
		}), this.group = null);
	}
	sendPlay(e) {
		this.group !== null && this.dispatch(j.PLAYBACK_PLAY, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendPause(e) {
		this.group !== null && this.dispatch(j.PLAYBACK_PAUSE, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendSeek(e, t) {
		this.group !== null && this.dispatch(j.PLAYBACK_SEEK, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			from_position: e,
			to_position: t,
			server_time: this.getSynchronizedTime()
		});
	}
	reportPosition(e, t) {
		this.group !== null && this.dispatch(j.PLAYBACK_SYNC, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			is_playing: t,
			server_time: this.getSynchronizedTime()
		});
	}
	pingTime() {
		let e = this.now();
		this.lastPingSendTime = e, this.dispatch(j.TIME_PING, { client_time: e });
	}
	onDisconnect() {
		this.timeSync.reset(), this.group = null, this.lastPingSendTime = null, this.options.onDisconnect?.();
	}
	handleIncoming(e) {
		let t = N(e);
		if (t !== null) switch (t.type) {
			case j.TIME_PONG:
				this.handleTimePong(t);
				break;
			case j.GROUP_STATE:
				this.handleGroupState(t);
				break;
			case j.PLAYBACK_PLAY:
				this.handlePlayback("play", t);
				break;
			case j.PLAYBACK_PAUSE:
				this.handlePlayback("pause", t);
				break;
			case j.PLAYBACK_SEEK:
				this.handleSeek(t);
				break;
			case j.HOST_ELECT:
				this.handleHostElect(t);
				break;
			case j.INFO:
				this.handleInfo(t);
				break;
			case j.ERROR:
				this.handleError(t);
				break;
			case j.TYPING:
				this.handleTyping(t);
				break;
			case j.HOST_TRANSFER:
				this.handleHostTransfer(t);
				break;
			case j.PLAYBACK_SYNC:
				this.handlePlaybackSync(t);
				break;
			case j.TIME_SYNC:
				this.handleTimeSync(t);
				break;
			case j.GROUP_LIST:
				this.handleGroupList(t);
				break;
			case j.CHAT:
			case j.PLAYBACK_QUEUE: break;
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
		this.send(M(e, t, this.now));
	}
};
//#endregion
//#region src/api/syncplay.ts
function R(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function z(e) {
	return e / 1e3;
}
function B(e) {
	let t = R(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function V(e) {
	return e.group_id ?? e.id ?? "";
}
function H(e) {
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
		lastSeen: B(e.joined_at)
	})) : [];
}
function U(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function W(e) {
	let t = e ?? {}, n = V(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: R(t.member_count, H(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: B(t.created_at)
	};
}
function G(e) {
	let t = e ?? {}, n = V(t), r = U(t);
	return {
		id: n,
		roomId: n,
		serverId: "",
		createdBy: t.host_id ?? "",
		createdAt: B(t.created_at),
		state: r,
		currentMediaId: t.current_media_id ?? null,
		playbackPosition: z(R(t.playback_position)),
		playbackRate: +(r === "playing"),
		serverTime: R(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: B(t.last_activity_at),
		activeUsers: H(t),
		roles: Object.fromEntries(H(t).map((e) => [e.id, e.role])),
		permissions: {}
	};
}
var fe = class {
	client;
	constructor(e) {
		this.client = new o({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new i() : void 0
		});
	}
	async createRoom(e) {
		return W((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t, n) {
		let r = {};
		t !== void 0 && t !== "" && (r.memberName = t), n !== void 0 && n !== "" && (r.password = n);
		let i = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, Object.keys(r).length > 0 ? r : void 0);
		return {
			room: W(i.group),
			session: G(i.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return G((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return H((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(W) : [];
	}
	async listPublicRooms() {
		return (await this.listGroups()).filter((e) => e.isPublic);
	}
};
function pe(e) {
	if (!(e instanceof r) || e.status !== 400) return !1;
	let t = e.body;
	return typeof t == "object" && !!t && t.error === "Invalid password";
}
var K = null, me = null;
function q(e) {
	return (!K || me !== e) && (K = new fe(e), me = e), K;
}
var J = {
	log: () => {},
	warn: () => {},
	error: () => {}
}, he = null;
function ge(e) {
	he = e;
}
var Y = null, X = null, Z = 0, _e = 5, ve = 1e3, Q = null, ye = null, be = null, xe = null, $ = null;
function Se() {
	try {
		return typeof window > "u" ? null : new i().getAccessToken();
	} catch {
		return null;
	}
}
function Ce(e) {
	let t = u();
	if (t.wsUrl !== null) return `${t.wsUrl}${t.wsPath ?? ""}?room=${encodeURIComponent(e)}`;
	let n = typeof window < "u" ? window.location.hostname : "localhost";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${n}:8097?room=${encodeURIComponent(e)}`;
}
function we() {
	let e = Se();
	return e ? ["bearer", e] : void 0;
}
function Te(e) {
	if (Q) try {
		let t = JSON.parse(e.data);
		Q.handleIncoming(t);
	} catch {}
}
function Ee(e) {
	if (!(e && e.target !== Y)) if (Y = null, Q && Q.onDisconnect(), X && Z < _e) {
		let e = ve * 2 ** Z;
		Z++, J.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${Z})`), setTimeout(() => {
			X && Oe(X);
		}, e);
	} else Z >= _e && (J.warn("[SyncPlay] Max reconnect attempts reached, giving up"), X = null, Z = 0, Q = null);
}
function De(e, t, n, r, i) {
	Z = 0, xe = i ?? null, Oe(e, t, n, r);
}
function Oe(e, t, n, r) {
	if (t && ($ = t), Y && X !== e) {
		let e = Y;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Y = null, X = null, Q = null;
	}
	if (Y && X === e) return;
	X = e;
	let i = n ?? ye ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? be ?? "Anonymous";
	ye = i, be = a, Q = new L({
		send: (e) => {
			Y && Y.readyState === WebSocket.OPEN && Y.send(P(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			$ && $({
				type: e.type,
				position: z(e.position),
				roomId: X ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			$ && $({
				type: n ? "play" : "pause",
				position: z(t),
				roomId: X ?? void 0
			});
		},
		onDisconnect: () => {},
		onError: (e, t) => {
			J.error(`[SyncPlay] Error: ${e} - ${t}`), he?.(e, t);
		},
		onInfo: (e) => {
			J.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = Ce(e);
	J.log(`[SyncPlay] Opening WebSocket to ${o}`);
	let s;
	try {
		s = new WebSocket(o, we());
	} catch (e) {
		J.error("[SyncPlay] WebSocket constructor refused the handshake", e), Ee();
		return;
	}
	Y = s, s.onopen = () => {
		J.log("[SyncPlay] WebSocket connected"), Z = 0, Q && X && Q.joinGroup(X, xe ?? void 0);
	}, s.onmessage = Te, s.onclose = Ee, s.onerror = (e) => {
		J.error("[SyncPlay] WebSocket error", e);
	};
}
function ke() {
	if (Y) {
		let e = Y;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Y = null;
	}
	Q &&= (Q.leaveGroup(), Q.onDisconnect(), null), X = null, Z = 0, xe = null;
}
function Ae(e) {
	!Q || !Y || Y.readyState !== WebSocket.OPEN || Q.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function je(e) {
	if (!Q || !Y || Y.readyState !== WebSocket.OPEN) return !1;
	switch (e.type) {
		case "play": return Q.sendPlay(e.position ?? 0), !0;
		case "pause": return Q.sendPause(e.position ?? 0), !0;
		case "seek": return e.position !== void 0 && (Q.sendSeek(0, e.position), !0);
		case "sync": return e.position !== void 0 && (Q.reportPosition(e.position, !0), !0);
	}
}
var Me = 5e3;
function Ne() {
	let e = c().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var Pe = class extends Error {
	commandType;
	constructor(e) {
		super(`SyncPlay '${e}' command was not delivered to the group`), this.commandType = e, this.name = "SyncPlayCommandNotDeliveredError";
	}
}, Fe = D("phlix-syncplay", () => {
	let e = S(null), t = S(null), n = S(null), r = S([]), i = S(null), a = S(!1), o = S(0), s = 0, c = null, l = p(() => t.value !== null), u = p(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), d = p(() => r.value.filter((e) => e.isOnline)), f = p(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - s) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return o.value - r;
	}), m = p(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(f.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	function h() {
		let e = t.value;
		if (!e) {
			_();
			return;
		}
		e.state === "playing" && Ae({
			sessionId: e.id,
			playbackPosition: o.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	function g() {
		_(), c = setInterval(h, Me);
	}
	function _() {
		c !== null && (clearInterval(c), c = null);
	}
	function v(e) {
		n.value = e, t.value &&= {
			...t.value,
			currentMediaId: e.mediaId
		};
	}
	function y() {
		n.value = null;
	}
	function b(n, i, a, o) {
		let { room: c, session: l } = i;
		t.value = l, s = Date.now(), e.value = {
			...e.value ?? {},
			...c,
			currentSession: l
		}, r.value = l.activeUsers, De(n, (e) => {
			x(e);
		}, void 0, a, o), g();
	}
	async function ee(t, n) {
		a.value = !0, i.value = null;
		try {
			let r = q(t), i = Ne(), a = n.password !== void 0 && n.password.trim() !== "" ? n.password : void 0, o = a === void 0 ? void 0 : A(a), s = await r.createRoom({
				name: n.name,
				...a === void 0 ? {} : { password: a },
				memberName: i
			});
			e.value = s, b(s.id, await r.joinRoom(s.id, i, a), i, o);
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to create the room", e;
		} finally {
			a.value = !1;
		}
	}
	async function te(e, t, n) {
		a.value = !0, i.value = null;
		try {
			let r = q(e), i = Ne(), a = n !== void 0 && n !== "" ? n : void 0, o = a === void 0 ? void 0 : A(a);
			b(t, await r.joinRoom(t, i, a), i, o);
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to join the room", e;
		} finally {
			a.value = !1;
		}
	}
	async function ne(n) {
		if (e.value) {
			a.value = !0, i.value = null;
			try {
				await q(n).leaveRoom(e.value.id), _(), ke(), e.value = null, t.value = null, r.value = [];
			} catch (e) {
				throw i.value = e instanceof Error ? e.message : "Failed to leave the room", e;
			} finally {
				a.value = !1;
			}
		}
	}
	function x(e) {
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
	function re(e, n, r) {
		if (t.value && !je({
			type: n,
			position: r?.position === void 0 ? void 0 : r.position * 1e3,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		})) throw i.value = "SyncPlay command was not delivered to the group", new Pe(n);
	}
	async function C(e) {
		if (t.value) try {
			let n = await q(e).getState(t.value.id);
			t.value = n, s = Date.now();
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function w(t) {
		if (e.value) try {
			let n = await q(t).getMembers(e.value.id);
			r.value = n;
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh members", e;
		}
	}
	function ie() {
		i.value = null;
	}
	function ae(e) {
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
		isSynced: u,
		onlineMembers: d,
		syncStatus: m,
		driftAmount: f,
		createAndJoinRoom: ee,
		joinRoom: te,
		leaveRoom: ne,
		onRemoteStateUpdate: x,
		sendCommand: re,
		refreshState: C,
		refreshMembers: w,
		clearError: ie,
		updateLocalPosition: ae,
		applyPendingPlayMedia: v,
		consumePendingPlayMedia: y
	};
}), Ie = ["aria-label"], Le = ["aria-checked", "tabindex"], Re = ["aria-checked", "tabindex"], ze = {
	key: 0,
	class: "syncplay-modal__fields"
}, Be = { class: "syncplay-modal__field" }, Ve = {
	class: "syncplay-modal__label",
	for: "room-name"
}, He = ["placeholder"], Ue = { class: "syncplay-modal__field" }, We = {
	class: "syncplay-modal__label",
	for: "room-password"
}, Ge = { class: "syncplay-modal__pw-wrap" }, Ke = ["type"], qe = ["aria-label", "aria-pressed"], Je = {
	id: "room-password-optional",
	class: "syncplay-modal__hint"
}, Ye = {
	key: 1,
	class: "syncplay-modal__fields"
}, Xe = { class: "syncplay-modal__field" }, Ze = {
	class: "syncplay-modal__label",
	for: "room-id"
}, Qe = ["placeholder"], $e = { class: "syncplay-modal__field" }, et = {
	class: "syncplay-modal__label",
	for: "room-password"
}, tt = { class: "syncplay-modal__pw-wrap" }, nt = [
	"type",
	"required",
	"aria-describedby"
], rt = ["aria-label", "aria-pressed"], it = {
	key: 0,
	id: "room-password-hint",
	class: "syncplay-modal__hint"
}, at = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, ot = {
	key: 3,
	class: "syncplay-modal__rooms"
}, st = { class: "syncplay-modal__rooms-title" }, ct = { class: "syncplay-modal__rooms-list" }, lt = ["onClick"], ut = { class: "syncplay-modal__room-name" }, dt = { class: "syncplay-modal__room-count" }, ft = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, pt = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(e, { emit: r }) {
		let i = e, o = r, { t: c } = n(), u = Fe(), b = s(), D = p(() => i.apiBase ?? b.value), O = S("create"), k = S(null), ce = S(null);
		function le(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), O.value = "create", k.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), O.value = "join", ce.value?.focus();
			}
		}
		let A = S(""), j = S(""), M = S(""), N = S(!1), P = S(!1), ue = S(null), de = ee("phlixConfig", null), F = S(!1), I = S(null), L = S([]), R = S(!1), z = p(() => A.value.trim().length > 0), B = p(() => j.value.trim().length > 0 && (!P.value || M.value !== "")), V = p(() => (O.value === "create" ? z.value : B.value) && !F.value);
		oe(() => i.modelValue, async (e) => {
			e && (I.value = null, A.value = "", M.value = "", N.value = !1, P.value = !1, i.prefilledRoomId ? (j.value = i.prefilledRoomId, O.value = "join") : (j.value = "", O.value = "create"), await H());
		});
		async function H() {
			R.value = !0;
			try {
				let e = new fe(D.value);
				L.value = await e.listGroups();
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
					O.value === "create" ? await u.createAndJoinRoom(D.value, {
						name: A.value.trim(),
						password: M.value
					}) : await u.joinRoom(D.value, j.value.trim(), M.value), u.currentRoom && o("joined", u.currentRoom), o("update:modelValue", !1);
				} catch (e) {
					O.value === "join" && pe(e) ? (P.value = !0, I.value = a("syncplay.invalid_password", de?.locale, null), te(() => ue.value?.focus())) : I.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					F.value = !1;
				}
			}
		}
		function W(e) {
			O.value = "join", j.value = e.id, A.value = e.name, e.isPublic || (P.value = !0);
		}
		function G() {
			o("update:modelValue", !1);
		}
		return (n, r) => (x(), m(d, {
			"model-value": e.modelValue,
			title: w(c)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[8] ||= (e) => o("update:modelValue", e),
			onClose: G
		}, {
			footer: T(() => [y(l, {
				variant: "ghost",
				type: "button",
				onClick: G
			}, {
				default: T(() => [v(C(w(c)("common.close")), 1)]),
				_: 1
			}), y(l, {
				variant: "solid",
				type: "button",
				loading: F.value,
				disabled: !V.value,
				onClick: U
			}, {
				default: T(() => [v(C(O.value === "create" ? w(c)("syncplay.createRoom") : w(c)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: T(() => [_("form", {
				class: "syncplay-modal",
				onSubmit: se(U, ["prevent"])
			}, [
				_("div", {
					class: "syncplay-modal__tabs",
					role: "radiogroup",
					"aria-label": w(c)("syncplay.modeSelect"),
					onKeydown: le
				}, [_("button", {
					ref_key: "createOptionEl",
					ref: k,
					type: "button",
					role: "radio",
					class: ne(["syncplay-modal__tab", { "is-active": O.value === "create" }]),
					"aria-checked": O.value === "create",
					tabindex: O.value === "create" ? 0 : -1,
					onClick: r[0] ||= (e) => O.value = "create"
				}, C(w(c)("syncplay.createRoom")), 11, Le), _("button", {
					ref_key: "joinOptionEl",
					ref: ce,
					type: "button",
					role: "radio",
					class: ne(["syncplay-modal__tab", { "is-active": O.value === "join" }]),
					"aria-checked": O.value === "join",
					tabindex: O.value === "join" ? 0 : -1,
					onClick: r[1] ||= (e) => O.value = "join"
				}, C(w(c)("syncplay.joinRoom")), 11, Re)], 40, Ie),
				O.value === "create" ? (x(), g("div", ze, [_("div", Be, [_("label", Ve, C(w(c)("syncplay.roomName")), 1), E(_("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => A.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: w(c)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, He), [[ae, A.value]])]), _("div", Ue, [
					_("label", We, C(w(c)("syncplay.roomPassword")), 1),
					_("div", Ge, [E(_("input", {
						id: "room-password",
						"onUpdate:modelValue": r[3] ||= (e) => M.value = e,
						type: N.value ? "text" : "password",
						class: "syncplay-modal__input",
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": "room-password-optional"
					}, null, 8, Ke), [[ie, M.value]]), _("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": N.value ? w(c)("auth.hidePassword") : w(c)("auth.showPassword"),
						"aria-pressed": N.value,
						onClick: r[4] ||= (e) => N.value = !N.value
					}, [y(t, { name: N.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, qe)]),
					_("p", Je, C(w(c)("syncplay.passwordOptional")), 1)
				])])) : (x(), g("div", Ye, [_("div", Xe, [_("label", Ze, C(w(c)("syncplay.roomId")), 1), E(_("input", {
					id: "room-id",
					"onUpdate:modelValue": r[5] ||= (e) => j.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: w(c)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, Qe), [[ae, j.value]])]), _("div", $e, [
					_("label", et, C(w(c)("syncplay.roomPassword")), 1),
					_("div", tt, [E(_("input", {
						id: "room-password",
						ref_key: "passwordInputEl",
						ref: ue,
						"onUpdate:modelValue": r[6] ||= (e) => M.value = e,
						type: N.value ? "text" : "password",
						class: "syncplay-modal__input",
						required: P.value,
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": P.value ? "room-password-hint" : void 0
					}, null, 8, nt), [[ie, M.value]]), _("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": N.value ? w(c)("auth.hidePassword") : w(c)("auth.showPassword"),
						"aria-pressed": N.value,
						onClick: r[7] ||= (e) => N.value = !N.value
					}, [y(t, { name: N.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, rt)]),
					P.value ? (x(), g("p", it, C(w(c)("syncplay.lockedRoomHint")), 1)) : h("", !0)
				])])),
				I.value ? (x(), g("p", at, C(I.value), 1)) : h("", !0),
				O.value === "join" && L.value.length > 0 ? (x(), g("div", ot, [_("h3", st, C(w(c)("syncplay.availableRooms")), 1), _("ul", ct, [(x(!0), g(f, null, re(L.value, (e) => (x(), g("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [_("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => W(e)
				}, [
					y(t, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					_("span", ut, C(e.name), 1),
					e.isPublic ? h("", !0) : (x(), m(t, {
						key: 0,
						name: "lock",
						label: w(c)("syncplay.lockedRoom"),
						class: "syncplay-modal__room-lock"
					}, null, 8, ["label"])),
					_("span", dt, C(w(c)("syncplay.members", { count: e.memberCount })), 1)
				], 8, lt)]))), 128))])])) : h("", !0),
				R.value ? (x(), g("div", ft, [y(t, { name: "spinner" }), _("span", null, C(w(c)("common.loading")), 1)])) : h("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-919768e6"]]);
//#endregion
export { Fe as n, ge as r, pt as t };

//# sourceMappingURL=SyncPlayModal-BCxBUEAC.js.map