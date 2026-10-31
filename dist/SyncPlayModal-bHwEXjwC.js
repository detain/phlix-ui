import { t as e } from "./Modal-BU4hJGBA.js";
import { t } from "./Button-1sKEdGjj.js";
import { n, t as r } from "./Icon-CIbfiPrs.js";
import { t as i } from "./useMessages-DrceiftD.js";
import { C as a, a as o, h as s, t as c, v as l } from "./client-57OweUrJ.js";
import { t as u } from "./socketHint-C0yqQROO.js";
import { t as d } from "./useAuthStore-D2ZmuYZO.js";
import { n as f } from "./useApiBase-DXTBY90j.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as S, nextTick as ee, normalizeClass as C, openBlock as w, ref as T, renderList as te, toDisplayString as E, unref as D, vModelDynamic as ne, vModelText as re, watch as ie, withCtx as O, withDirectives as k, withModifiers as ae } from "vue";
import { defineStore as A } from "pinia";
// src/utils/syncplaySha256.ts
var j = [
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
function M(e, t) {
	return (e >>> t | e << 32 - t) >>> 0;
}
function oe(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 1) {
		let r = e.codePointAt(n);
		r > 65535 && (n += 1), r < 128 ? t.push(r) : r < 2048 ? t.push(192 | r >>> 6, 128 | r & 63) : r < 65536 ? t.push(224 | r >>> 12, 128 | r >>> 6 & 63, 128 | r & 63) : t.push(240 | r >>> 18, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | r & 63);
	}
	return t;
}
function N(e) {
	let t = oe(e), n = t.length * 8;
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
			let t = (M(p[e - 15], 7) ^ M(p[e - 15], 18) ^ p[e - 15] >>> 3) >>> 0, n = (M(p[e - 2], 17) ^ M(p[e - 2], 19) ^ p[e - 2] >>> 10) >>> 0;
			p[e] = p[e - 16] + t + p[e - 7] + n >>> 0;
		}
		let n = a, r = o, i = s, m = c, h = l, g = u, _ = d, v = f;
		for (let e = 0; e < 64; e += 1) {
			let t = (M(h, 6) ^ M(h, 11) ^ M(h, 25)) >>> 0, a = (h & g ^ ~h & _) >>> 0, o = v + t + a + j[e] + p[e] >>> 0, s = ((M(n, 2) ^ M(n, 13) ^ M(n, 22)) >>> 0) + ((n & r ^ n & i ^ r & i) >>> 0) >>> 0;
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
function P(e) {
	if (e === "") throw Error("hashGroupPassword: refusing to hash an empty password — omit the password_hash field instead");
	return N(e);
}
// node_modules/@phlix/syncplay/dist/phlix-syncplay.js
var F = {
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
F.GROUP_CREATE, F.GROUP_JOIN, F.GROUP_LEAVE, F.GROUP_STATE, F.GROUP_LIST, F.PLAYBACK_PLAY, F.PLAYBACK_PAUSE, F.PLAYBACK_SEEK, F.PLAYBACK_QUEUE, F.PLAYBACK_SYNC, F.CHAT, F.TYPING, F.HOST_TRANSFER, F.HOST_ELECT, F.TIME_PING, F.TIME_PONG, F.TIME_SYNC, F.ERROR, F.INFO;
function I(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function L(e) {
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
function se(e) {
	return JSON.stringify(e);
}
var ce = .1, R = .99, z = 1.01, B = class {
	constructor(e) {
		a(this, "samples", []), a(this, "driftRate", 1), a(this, "now", void 0), a(this, "samplesVersion", 0), a(this, "cacheVersion", -1), a(this, "cachedOffset", 0), a(this, "cachedLatency", 0), a(this, "cachedIsStable", !1), this.now = e;
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
		this.driftRate = 1 + ce * i / 1e3, this.driftRate = Math.min(z, Math.max(R, this.driftRate));
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
}, V = class e {
	constructor(e) {
		a(this, "send", void 0), a(this, "now", void 0), a(this, "memberId", void 0), a(this, "memberName", void 0), a(this, "options", void 0), a(this, "timeSync", void 0), a(this, "group", null), a(this, "lastPingSendTime", null), this.options = e, this.send = e.send, this.now = e.now, this.memberId = e.memberId, this.memberName = e.memberName ?? "User", this.timeSync = new B(e.now);
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
		t !== void 0 && (n.password_hash = t), this.dispatch(F.GROUP_CREATE, n);
	}
	joinGroup(e, t) {
		let n = {
			group_id: e,
			member_id: this.memberId,
			member_name: this.memberName
		};
		t !== void 0 && (n.password_hash = t), this.dispatch(F.GROUP_JOIN, n);
	}
	leaveGroup() {
		this.group !== null && (this.dispatch(F.GROUP_LEAVE, {
			group_id: this.group.group_id,
			member_id: this.memberId
		}), this.group = null);
	}
	sendPlay(e) {
		this.group !== null && this.dispatch(F.PLAYBACK_PLAY, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendPause(e) {
		this.group !== null && this.dispatch(F.PLAYBACK_PAUSE, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendSeek(e, t) {
		this.group !== null && this.dispatch(F.PLAYBACK_SEEK, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			from_position: e,
			to_position: t,
			server_time: this.getSynchronizedTime()
		});
	}
	reportPosition(e, t) {
		this.group !== null && this.dispatch(F.PLAYBACK_SYNC, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			is_playing: t,
			server_time: this.getSynchronizedTime()
		});
	}
	pingTime() {
		let e = this.now();
		this.lastPingSendTime = e, this.dispatch(F.TIME_PING, { client_time: e });
	}
	onDisconnect() {
		this.timeSync.reset(), this.group = null, this.lastPingSendTime = null, this.options.onDisconnect?.();
	}
	handleIncoming(e) {
		let t = L(e);
		if (t !== null) switch (t.type) {
			case F.TIME_PONG:
				this.handleTimePong(t);
				break;
			case F.GROUP_STATE:
				this.handleGroupState(t);
				break;
			case F.PLAYBACK_PLAY:
				this.handlePlayback("play", t);
				break;
			case F.PLAYBACK_PAUSE:
				this.handlePlayback("pause", t);
				break;
			case F.PLAYBACK_SEEK:
				this.handleSeek(t);
				break;
			case F.HOST_ELECT:
				this.handleHostElect(t);
				break;
			case F.INFO:
				this.handleInfo(t);
				break;
			case F.ERROR:
				this.handleError(t);
				break;
			case F.TYPING:
				this.handleTyping(t);
				break;
			case F.HOST_TRANSFER:
				this.handleHostTransfer(t);
				break;
			case F.PLAYBACK_SYNC:
				this.handlePlaybackSync(t);
				break;
			case F.TIME_SYNC:
				this.handleTimeSync(t);
				break;
			case F.GROUP_LIST:
				this.handleGroupList(t);
				break;
			case F.CHAT:
			case F.PLAYBACK_QUEUE: break;
			default: this.options.onUnknownFrame?.(t);
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
		this.send(I(e, t, this.now));
	}
};
// src/api/syncplay.ts
function H(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function U(e) {
	return e / 1e3;
}
function W(e) {
	let t = H(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function le(e) {
	return e.group_id ?? e.id ?? "";
}
function G(e) {
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
		lastSeen: W(e.joined_at)
	})) : [];
}
function ue(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function K(e) {
	let t = e ?? {}, n = le(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: H(t.member_count, G(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: W(t.created_at)
	};
}
function de(e) {
	let t = e ?? {}, n = le(t), r = ue(t);
	return {
		id: n,
		roomId: n,
		serverId: "",
		createdBy: t.host_id ?? "",
		createdAt: W(t.created_at),
		state: r,
		currentMediaId: t.current_media_id ?? null,
		playbackPosition: U(H(t.playback_position)),
		playbackRate: +(r === "playing"),
		serverTime: H(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: W(t.last_activity_at),
		activeUsers: G(t),
		roles: Object.fromEntries(G(t).map((e) => [e.id, e.role])),
		permissions: {}
	};
}
var fe = class {
	constructor(e) {
		a(this, "client", void 0), this.client = new c({ baseUrl: e });
	}
	async createRoom(e) {
		return K((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t, n) {
		let r = {};
		t !== void 0 && t !== "" && (r.memberName = t), n !== void 0 && n !== "" && (r.password = n);
		let i = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, Object.keys(r).length > 0 ? r : void 0);
		return {
			room: K(i.group),
			session: de(i.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return de((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return G((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(K) : [];
	}
	async listPublicRooms() {
		return (await this.listGroups()).filter((e) => e.isPublic);
	}
};
function pe(e) {
	if (!(e instanceof l) || e.status !== 400) return !1;
	let t = e.body;
	return typeof t == "object" && !!t && t.error === "Invalid password";
}
var me = null, he = null;
function q(e) {
	return me && he === e || (me = new fe(e), he = e), me;
}
var J = {
	log: () => {},
	warn: () => {},
	error: () => {}
}, ge = null;
function _e(e) {
	ge = e;
}
var Y = null, X = null, Z = 0, ve = 5, ye = 1e3, Q = null, be = null, xe = null, Se = null, $ = null;
function Ce() {
	try {
		return o().getAccessToken();
	} catch {
		return null;
	}
}
function we(e) {
	let t = u();
	if (t.wsUrl !== null) return `${t.wsUrl}${t.wsPath ?? ""}?room=${encodeURIComponent(e)}`;
	let n = typeof window < "u" ? window.location.hostname : "localhost";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${n}:8097?room=${encodeURIComponent(e)}`;
}
function Te() {
	let e = Ce();
	return e ? ["bearer", e] : void 0;
}
function Ee(e) {
	if (Q) try {
		let t = JSON.parse(e.data);
		Q.handleIncoming(t);
	} catch {}
}
function De(e) {
	if (!(e && e.target !== Y)) {
		if (Y = null, Q && Q.onDisconnect(), X && Z < ve) {
			let e = ye * 2 ** Z;
			Z++, J.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${Z})`), setTimeout(() => {
				X && ke(X);
			}, e);
		} else Z >= ve && (J.warn("[SyncPlay] Max reconnect attempts reached, giving up"), X = null, Z = 0, Q = null);
	}
}
function Oe(e, t, n, r, i) {
	Z = 0, Se = i ?? null, ke(e, t, n, r);
}
function ke(e, t, n, r) {
	if (t && ($ = t), Y && X !== e) {
		let e = Y;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Y = null, X = null, Q = null;
	}
	if (Y && X === e) return;
	X = e;
	let i = n ?? be ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? xe ?? "Anonymous";
	be = i, xe = a, Q = new V({
		send: (e) => {
			Y && Y.readyState === WebSocket.OPEN && Y.send(se(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			$ && $({
				type: e.type,
				position: U(e.position),
				roomId: X ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			$ && $({
				type: n ? "play" : "pause",
				position: U(t),
				roomId: X ?? void 0
			});
		},
		onDisconnect: () => {},
		onError: (e, t) => {
			J.error(`[SyncPlay] Error: ${e} - ${t}`), ge?.(e, t);
		},
		onInfo: (e) => {
			J.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = we(e);
	J.log(`[SyncPlay] Opening WebSocket to ${o}`);
	let s;
	try {
		s = new WebSocket(o, Te());
	} catch (e) {
		J.error("[SyncPlay] WebSocket constructor refused the handshake", e), De();
		return;
	}
	Y = s, s.onopen = () => {
		J.log("[SyncPlay] WebSocket connected"), Z = 0, Q && X && Q.joinGroup(X, Se ?? void 0);
	}, s.onmessage = Ee, s.onclose = De, s.onerror = (e) => {
		J.error("[SyncPlay] WebSocket error", e);
	};
}
function Ae() {
	if (Y) {
		let e = Y;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Y = null;
	}
	Q &&= (Q.leaveGroup(), Q.onDisconnect(), null), X = null, Z = 0, Se = null;
}
function je(e) {
	Q && Y && Y.readyState === WebSocket.OPEN && Q.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function Me(e) {
	if (!Q || !Y || Y.readyState !== WebSocket.OPEN) return !1;
	switch (e.type) {
		case "play": return Q.sendPlay(e.position ?? 0), !0;
		case "pause": return Q.sendPause(e.position ?? 0), !0;
		case "seek": return e.position !== void 0 && (Q.sendSeek(0, e.position), !0);
		case "sync": return e.position !== void 0 && (Q.reportPosition(e.position, !0), !0);
	}
}
var Ne = 5e3;
function Pe() {
	let e = d().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var Fe = class extends Error {
	constructor(e) {
		super(`SyncPlay '${e}' command was not delivered to the group`), a(this, "commandType", void 0), this.commandType = e, this.name = "SyncPlayCommandNotDeliveredError";
	}
}, Ie = A("phlix-syncplay", () => {
	let { t: e } = i(), t = T(null), n = T(null), r = T(null), a = T([]), o = T(null), s = T(!1), c = T(0), l = 0, u = null, d = m(() => n.value !== null), f = m(() => n.value ? n.value.state === "playing" || n.value.state === "paused" : !1), p = m(() => a.value.filter((e) => e.isOnline)), h = m(() => {
		let e = n.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let t = (Date.now() - l) / 1e3, r = e.playbackPosition + t * e.playbackRate;
		return c.value - r;
	}), g = m(() => n.value ? n.value.state === "waiting" ? "re-syncing" : Math.abs(h.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	function _() {
		let e = n.value;
		e ? e.state === "playing" && je({
			sessionId: e.id,
			playbackPosition: c.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}) : y();
	}
	function v() {
		y(), u = setInterval(_, Ne);
	}
	function y() {
		u !== null && (clearInterval(u), u = null);
	}
	function b(e) {
		r.value = e, n.value &&= {
			...n.value,
			currentMediaId: e.mediaId
		};
	}
	function x() {
		r.value = null;
	}
	function S(e, r, i, o) {
		let { room: s, session: c } = r;
		n.value = c, l = Date.now(), t.value = {
			...t.value ?? {},
			...s,
			currentSession: c
		}, a.value = c.activeUsers, Oe(e, (e) => {
			te(e);
		}, void 0, i, o), v();
	}
	async function ee(n, r) {
		s.value = !0, o.value = null;
		try {
			let e = q(n), i = Pe(), a = r.password !== void 0 && r.password.trim() !== "" ? r.password : void 0, o = a === void 0 ? void 0 : P(a), s = await e.createRoom({
				name: r.name,
				...a === void 0 ? {} : { password: a },
				memberName: i
			});
			t.value = s, S(s.id, await e.joinRoom(s.id, i, a), i, o);
		} catch (t) {
			throw o.value = t instanceof Error ? t.message : e("syncplay.errorCreate"), t;
		} finally {
			s.value = !1;
		}
	}
	async function C(t, n, r) {
		s.value = !0, o.value = null;
		try {
			let e = q(t), i = Pe(), a = r !== void 0 && r !== "" ? r : void 0, o = a === void 0 ? void 0 : P(a);
			S(n, await e.joinRoom(n, i, a), i, o);
		} catch (t) {
			throw o.value = t instanceof Error ? t.message : e("syncplay.errorJoin"), t;
		} finally {
			s.value = !1;
		}
	}
	async function w(r) {
		if (t.value) {
			s.value = !0, o.value = null;
			try {
				await q(r).leaveRoom(t.value.id), y(), Ae(), t.value = null, n.value = null, a.value = [];
			} catch (t) {
				throw o.value = t instanceof Error ? t.message : e("syncplay.errorLeave"), t;
			} finally {
				s.value = !1;
			}
		}
	}
	function te(e) {
		if (n.value) switch (e.type) {
			case "play":
				e.position !== void 0 && (l = Date.now(), n.value = {
					...n.value,
					playbackPosition: e.position
				}), n.value = {
					...n.value,
					state: "playing",
					playbackRate: e.rate ?? 1
				};
				break;
			case "pause":
				e.position !== void 0 && (l = Date.now(), n.value = {
					...n.value,
					playbackPosition: e.position
				}), n.value = {
					...n.value,
					state: "paused"
				};
				break;
			case "seek":
				e.position !== void 0 && (l = Date.now(), n.value = {
					...n.value,
					playbackPosition: e.position
				});
				break;
			case "sync": e.position !== void 0 && (l = Date.now(), n.value = {
				...n.value,
				playbackPosition: e.position
			}), e.rate !== void 0 && (n.value = {
				...n.value,
				playbackRate: e.rate
			});
		}
	}
	function E(e, t, r) {
		if (n.value && !Me({
			type: t,
			position: r?.position === void 0 ? void 0 : r.position * 1e3,
			rate: r?.rate,
			issuedBy: n.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		})) throw o.value = "SyncPlay command was not delivered to the group", new Fe(t);
	}
	async function D(e) {
		if (n.value) try {
			let t = await q(e).getState(n.value.id);
			n.value = t, l = Date.now();
		} catch (e) {
			throw o.value = e instanceof Error ? e.message : "Failed to refresh state.", e;
		}
	}
	async function ne(e) {
		if (t.value) try {
			let n = await q(e).getMembers(t.value.id);
			a.value = n;
		} catch (e) {
			throw o.value = e instanceof Error ? e.message : "Failed to refresh members.", e;
		}
	}
	function re() {
		o.value = null;
	}
	function ie(e) {
		c.value = e;
	}
	return {
		currentRoom: t,
		currentSession: n,
		members: a,
		error: o,
		isLoading: s,
		localPlaybackPosition: c,
		pendingPlayMedia: r,
		isInRoom: d,
		isSynced: f,
		onlineMembers: p,
		syncStatus: g,
		driftAmount: h,
		createAndJoinRoom: ee,
		joinRoom: C,
		leaveRoom: w,
		onRemoteStateUpdate: te,
		sendCommand: E,
		refreshState: D,
		refreshMembers: ne,
		clearError: re,
		updateLocalPosition: ie,
		applyPendingPlayMedia: b,
		consumePendingPlayMedia: x
	};
}), Le = ["aria-label"], Re = ["aria-checked", "tabindex"], ze = ["aria-checked", "tabindex"], Be = {
	key: 0,
	class: "syncplay-modal__fields"
}, Ve = { class: "syncplay-modal__field" }, He = {
	class: "syncplay-modal__label",
	for: "room-name"
}, Ue = ["placeholder"], We = { class: "syncplay-modal__field" }, Ge = {
	class: "syncplay-modal__label",
	for: "room-password"
}, Ke = { class: "syncplay-modal__pw-wrap" }, qe = ["type"], Je = ["aria-label", "aria-pressed"], Ye = {
	id: "room-password-optional",
	class: "syncplay-modal__hint"
}, Xe = {
	key: 1,
	class: "syncplay-modal__fields"
}, Ze = { class: "syncplay-modal__field" }, Qe = {
	class: "syncplay-modal__label",
	for: "room-id"
}, $e = ["placeholder"], et = { class: "syncplay-modal__field" }, tt = {
	class: "syncplay-modal__label",
	for: "room-password"
}, nt = { class: "syncplay-modal__pw-wrap" }, rt = [
	"type",
	"required",
	"aria-describedby"
], it = ["aria-label", "aria-pressed"], at = {
	key: 0,
	id: "room-password-hint",
	class: "syncplay-modal__hint"
}, ot = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, st = {
	key: 3,
	class: "syncplay-modal__rooms"
}, ct = { class: "syncplay-modal__rooms-title" }, lt = { class: "syncplay-modal__rooms-list" }, ut = ["onClick"], dt = { class: "syncplay-modal__room-name" }, ft = { class: "syncplay-modal__room-count" }, pt = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, mt = /*#__PURE__*/ n(/* @__PURE__ */ x({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(n, { emit: a }) {
		let o = n, c = a, { t: l } = i(), u = Ie(), d = f(), x = m(() => o.apiBase ?? d.value), A = T("create"), j = T(null), M = T(null);
		function oe(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), A.value = "create", j.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), A.value = "join", M.value?.focus();
			}
		}
		let N = T(""), P = T(""), F = T(""), I = T(!1), L = T(!1), se = T(null), ce = S("phlixConfig", null), R = T(!1), z = T(null), B = T([]), V = T(!1), H = m(() => N.value.trim().length > 0), U = m(() => P.value.trim().length > 0 && (!L.value || F.value !== "")), W = m(() => (A.value === "create" ? H.value : U.value) && !R.value);
		ie(() => o.modelValue, async (e) => {
			e && (z.value = null, N.value = "", F.value = "", I.value = !1, L.value = !1, o.prefilledRoomId ? (P.value = o.prefilledRoomId, A.value = "join") : (P.value = "", A.value = "create"), await le());
		});
		async function le() {
			V.value = !0;
			try {
				let e = new fe(x.value);
				B.value = await e.listGroups();
			} catch {
				B.value = [];
			} finally {
				V.value = !1;
			}
		}
		async function G() {
			if (W.value) {
				R.value = !0, z.value = null;
				try {
					A.value === "create" ? await u.createAndJoinRoom(x.value, {
						name: N.value.trim(),
						password: F.value
					}) : await u.joinRoom(x.value, P.value.trim(), F.value), u.currentRoom && c("joined", u.currentRoom), c("update:modelValue", !1);
				} catch (e) {
					A.value === "join" && pe(e) ? (L.value = !0, z.value = s("syncplay.invalid_password", ce?.locale, null), ee(() => se.value?.focus())) : z.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					R.value = !1;
				}
			}
		}
		function ue(e) {
			A.value = "join", P.value = e.id, N.value = e.name, L.value = !e.isPublic;
		}
		function K() {
			c("update:modelValue", !1);
		}
		return (i, a) => (w(), h(e, {
			"model-value": n.modelValue,
			title: D(l)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": a[8] ||= (e) => c("update:modelValue", e),
			onClose: K
		}, {
			footer: O(() => [b(t, {
				variant: "ghost",
				type: "button",
				onClick: K
			}, {
				default: O(() => [y(E(D(l)("common.close")), 1)]),
				_: 1
			}), b(t, {
				variant: "solid",
				type: "button",
				loading: R.value,
				disabled: !W.value,
				onClick: G
			}, {
				default: O(() => [y(E(A.value === "create" ? D(l)("syncplay.createRoom") : D(l)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: O(() => [v("form", {
				class: "syncplay-modal",
				onSubmit: ae(G, ["prevent"])
			}, [
				v("div", {
					class: "syncplay-modal__tabs",
					role: "radiogroup",
					"aria-label": D(l)("syncplay.modeSelect"),
					onKeydown: oe
				}, [v("button", {
					ref_key: "createOptionEl",
					ref: j,
					type: "button",
					role: "radio",
					class: C(["syncplay-modal__tab", { "is-active": A.value === "create" }]),
					"aria-checked": A.value === "create",
					tabindex: A.value === "create" ? 0 : -1,
					onClick: a[0] ||= (e) => A.value = "create"
				}, E(D(l)("syncplay.createRoom")), 11, Re), v("button", {
					ref_key: "joinOptionEl",
					ref: M,
					type: "button",
					role: "radio",
					class: C(["syncplay-modal__tab", { "is-active": A.value === "join" }]),
					"aria-checked": A.value === "join",
					tabindex: A.value === "join" ? 0 : -1,
					onClick: a[1] ||= (e) => A.value = "join"
				}, E(D(l)("syncplay.joinRoom")), 11, ze)], 40, Le),
				A.value === "create" ? (w(), _("div", Be, [v("div", Ve, [v("label", He, E(D(l)("syncplay.roomName")), 1), k(v("input", {
					id: "room-name",
					"onUpdate:modelValue": a[2] ||= (e) => N.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: D(l)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, Ue), [[re, N.value]])]), v("div", We, [
					v("label", Ge, E(D(l)("syncplay.roomPassword")), 1),
					v("div", Ke, [k(v("input", {
						id: "room-password",
						"onUpdate:modelValue": a[3] ||= (e) => F.value = e,
						type: I.value ? "text" : "password",
						class: "syncplay-modal__input",
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": "room-password-optional"
					}, null, 8, qe), [[ne, F.value]]), v("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": I.value ? D(l)("auth.hidePassword") : D(l)("auth.showPassword"),
						"aria-pressed": I.value,
						onClick: a[4] ||= (e) => I.value = !I.value
					}, [b(r, { name: I.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, Je)]),
					v("p", Ye, E(D(l)("syncplay.passwordOptional")), 1)
				])])) : (w(), _("div", Xe, [v("div", Ze, [v("label", Qe, E(D(l)("syncplay.roomId")), 1), k(v("input", {
					id: "room-id",
					"onUpdate:modelValue": a[5] ||= (e) => P.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: D(l)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, $e), [[re, P.value]])]), v("div", et, [
					v("label", tt, E(D(l)("syncplay.roomPassword")), 1),
					v("div", nt, [k(v("input", {
						id: "room-password",
						ref_key: "passwordInputEl",
						ref: se,
						"onUpdate:modelValue": a[6] ||= (e) => F.value = e,
						type: I.value ? "text" : "password",
						class: "syncplay-modal__input",
						required: L.value,
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": L.value ? "room-password-hint" : void 0
					}, null, 8, rt), [[ne, F.value]]), v("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": I.value ? D(l)("auth.hidePassword") : D(l)("auth.showPassword"),
						"aria-pressed": I.value,
						onClick: a[7] ||= (e) => I.value = !I.value
					}, [b(r, { name: I.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, it)]),
					L.value ? (w(), _("p", at, E(D(l)("syncplay.lockedRoomHint")), 1)) : g("", !0)
				])])),
				z.value ? (w(), _("p", ot, E(z.value), 1)) : g("", !0),
				A.value === "join" && B.value.length > 0 ? (w(), _("div", st, [v("h3", ct, E(D(l)("syncplay.availableRooms")), 1), v("ul", lt, [(w(!0), _(p, null, te(B.value, (e) => (w(), _("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [v("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => ue(e)
				}, [
					b(r, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					v("span", dt, E(e.name), 1),
					e.isPublic ? g("", !0) : (w(), h(r, {
						key: 0,
						name: "lock",
						label: D(l)("syncplay.lockedRoom"),
						class: "syncplay-modal__room-lock"
					}, null, 8, ["label"])),
					v("span", ft, E(D(l)("syncplay.members", { count: e.memberCount })), 1)
				], 8, ut)]))), 128))])])) : g("", !0),
				V.value ? (w(), _("div", pt, [b(r, { name: "spinner" }), v("span", null, E(D(l)("common.loading")), 1)])) : g("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-3772af96"]]);
export { Ie as n, _e as r, mt as t };

//# sourceMappingURL=SyncPlayModal-bHwEXjwC.js.map