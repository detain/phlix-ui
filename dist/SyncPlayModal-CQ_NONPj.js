import { t as e } from "./Modal-DtvOrHdx.js";
import { t } from "./Button-BLpPomsd.js";
import { n, t as r } from "./Icon-55iG1rR7.js";
import { t as i } from "./useMessages-BD3JvKjZ.js";
import { C as a, a as o, h as s, t as c, v as l } from "./client-fSGeXil2.js";
import { t as u } from "./socketHint-C0yqQROO.js";
import { t as d } from "./useAuthStore-DmpzSF_9.js";
import { n as f } from "./useApiBase-DXTBY90j.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as ee, nextTick as te, normalizeClass as ne, openBlock as S, ref as C, renderList as re, toDisplayString as w, unref as T, vModelDynamic as E, vModelText as D, watch as ie, withCtx as O, withDirectives as k, withModifiers as ae } from "vue";
import { defineStore as A } from "pinia";
// src/utils/syncplaySha256.ts
var oe = [
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
function j(e, t) {
	return (e >>> t | e << 32 - t) >>> 0;
}
function se(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 1) {
		let r = e.codePointAt(n);
		r > 65535 && (n += 1), r < 128 ? t.push(r) : r < 2048 ? t.push(192 | r >>> 6, 128 | r & 63) : r < 65536 ? t.push(224 | r >>> 12, 128 | r >>> 6 & 63, 128 | r & 63) : t.push(240 | r >>> 18, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | r & 63);
	}
	return t;
}
function M(e) {
	let t = se(e), n = t.length * 8;
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
			let t = (j(p[e - 15], 7) ^ j(p[e - 15], 18) ^ p[e - 15] >>> 3) >>> 0, n = (j(p[e - 2], 17) ^ j(p[e - 2], 19) ^ p[e - 2] >>> 10) >>> 0;
			p[e] = p[e - 16] + t + p[e - 7] + n >>> 0;
		}
		let n = a, r = o, i = s, m = c, h = l, g = u, _ = d, v = f;
		for (let e = 0; e < 64; e += 1) {
			let t = (j(h, 6) ^ j(h, 11) ^ j(h, 25)) >>> 0, a = (h & g ^ ~h & _) >>> 0, o = v + t + a + oe[e] + p[e] >>> 0, s = ((j(n, 2) ^ j(n, 13) ^ j(n, 22)) >>> 0) + ((n & r ^ n & i ^ r & i) >>> 0) >>> 0;
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
function N(e) {
	if (e === "") throw Error("hashGroupPassword: refusing to hash an empty password — omit the password_hash field instead");
	return M(e);
}
// node_modules/@phlix/syncplay/dist/phlix-syncplay.js
var P = {
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
P.GROUP_CREATE, P.GROUP_JOIN, P.GROUP_LEAVE, P.GROUP_STATE, P.GROUP_LIST, P.PLAYBACK_PLAY, P.PLAYBACK_PAUSE, P.PLAYBACK_SEEK, P.PLAYBACK_QUEUE, P.PLAYBACK_SYNC, P.CHAT, P.TYPING, P.HOST_TRANSFER, P.HOST_ELECT, P.TIME_PING, P.TIME_PONG, P.TIME_SYNC, P.ERROR, P.INFO;
function F(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function I(e) {
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
	if (!("protocol_version" in n) && typeof r == "object" && r && !Array.isArray(r)) {
		let e = {};
		for (let t of Object.keys(n)) t !== "data" && (e[t] = n[t]);
		return {
			...r,
			...e
		};
	}
	return n;
}
function L(e) {
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
		return n === 0 ? 0 : Math.round(t / n);
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
	getSampleAgeMs() {
		let e = this.samples[this.samples.length - 1];
		return e === void 0 ? null : this.now() - e.timestamp * 1e3;
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
}, V = 250, le = class e {
	constructor(t) {
		a(this, "send", void 0), a(this, "now", void 0), a(this, "memberId", void 0), a(this, "memberName", void 0), a(this, "options", void 0), a(this, "timeSync", void 0), a(this, "seekThrottleMs", void 0), a(this, "seekWindowOpen", !1), a(this, "pendingSeek", null), a(this, "seekFlushTimer", null), a(this, "group", null), a(this, "lastPingSendTime", null), a(this, "consecutiveSyncRejections", 0), this.options = t, this.send = t.send, this.now = t.now, this.memberId = t.memberId, this.memberName = t.memberName ?? "User", this.timeSync = new B(t.now), this.seekThrottleMs = e.parseSeekThrottleMs(t.seekThrottleMs);
	}
	static parseSeekThrottleMs(e) {
		if (e === void 0) return V;
		if (typeof e != "number" || !Number.isFinite(e) || e < 0) throw TypeError(`SyncPlayClient: seekThrottleMs must be a finite number >= 0 (0 disables the seek coalescing throttle), got ${String(e)}`);
		return e;
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
		t !== void 0 && (n.password_hash = t), this.dispatch(P.GROUP_CREATE, n);
	}
	joinGroup(e, t) {
		let n = {
			group_id: e,
			member_id: this.memberId,
			member_name: this.memberName
		};
		t !== void 0 && (n.password_hash = t), this.dispatch(P.GROUP_JOIN, n);
	}
	leaveGroup() {
		this.group !== null && (this.cancelSeekCoalescing(), this.dispatch(P.GROUP_LEAVE, {
			group_id: this.group.group_id,
			member_id: this.memberId
		}), this.group = null);
	}
	sendPlay(e) {
		this.group !== null && this.dispatch(P.PLAYBACK_PLAY, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendPause(e) {
		this.group !== null && this.dispatch(P.PLAYBACK_PAUSE, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendSeek(e, t) {
		this.group !== null && (this.seekWindowOpen ? this.pendingSeek = {
			from: e,
			to: t
		} : (this.dispatchSeek(e, t), this.seekThrottleMs > 0 && this.openSeekWindow()));
	}
	dispatchSeek(e, t) {
		this.group !== null && this.dispatch(P.PLAYBACK_SEEK, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			from_position: e,
			to_position: t,
			server_time: this.getSynchronizedTime()
		});
	}
	openSeekWindow() {
		this.seekWindowOpen = !0, this.seekFlushTimer = setTimeout(() => this.closeSeekWindow(), this.seekThrottleMs);
	}
	closeSeekWindow() {
		this.seekWindowOpen = !1, this.seekFlushTimer = null;
		let e = this.pendingSeek;
		e !== null && (this.pendingSeek = null, this.group !== null && (this.dispatchSeek(e.from, e.to), this.openSeekWindow()));
	}
	cancelSeekCoalescing() {
		this.pendingSeek = null, this.seekFlushTimer !== null && (clearTimeout(this.seekFlushTimer), this.seekFlushTimer = null), this.seekWindowOpen = !1;
	}
	reportPosition(e, t) {
		this.group !== null && this.dispatch(P.PLAYBACK_SYNC, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			is_playing: t,
			server_time: this.getSynchronizedTime()
		});
	}
	sendChat(e) {
		this.group !== null && this.dispatch(P.CHAT, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			message: e
		});
	}
	sendTyping(e) {
		this.group !== null && this.dispatch(P.TYPING, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			is_typing: e
		});
	}
	pingTime() {
		let e = this.now(), t = this.lastPingSendTime;
		t !== null && e - t <= 1e3 || (this.lastPingSendTime = e, this.dispatch(P.TIME_PING, { client_time: e }));
	}
	onDisconnect() {
		this.cancelSeekCoalescing(), this.timeSync.reset(), this.group = null, this.lastPingSendTime = null, this.options.onDisconnect?.();
	}
	handleIncoming(e) {
		let t = I(e);
		if (t !== null) switch (t.type) {
			case P.TIME_PONG:
				this.handleTimePong(t);
				break;
			case P.GROUP_STATE:
				this.handleGroupState(t);
				break;
			case P.PLAYBACK_PLAY:
				this.handlePlayback("play", t);
				break;
			case P.PLAYBACK_PAUSE:
				this.handlePlayback("pause", t);
				break;
			case P.PLAYBACK_SEEK:
				this.handleSeek(t);
				break;
			case P.HOST_ELECT:
				this.handleHostElect(t);
				break;
			case P.INFO:
				this.handleInfo(t);
				break;
			case P.ERROR:
				this.handleError(t);
				break;
			case P.TYPING:
				this.handleTyping(t);
				break;
			case P.HOST_TRANSFER:
				this.handleHostTransfer(t);
				break;
			case P.PLAYBACK_SYNC:
				this.handlePlaybackSync(t);
				break;
			case P.TIME_SYNC:
				this.handleTimeSync(t);
				break;
			case P.GROUP_LIST:
				this.handleGroupList(t);
				break;
			case P.CHAT:
				this.handleChat(t);
				break;
			case P.PLAYBACK_QUEUE:
				this.handlePlaybackQueueBroadcast(t);
				break;
			default: this.options.onUnknownFrame?.(t);
		}
	}
	handleTimePong(e) {
		let t = this.lastPingSendTime;
		if (t === null) return;
		let n = e, r = typeof n.client_time == "number" && Number.isFinite(n.client_time) ? n.client_time : null;
		if (r !== null && r !== t) return;
		let i = this.now(), a = r ?? t;
		this.lastPingSendTime = null;
		let o = typeof n.server_time == "number" && Number.isFinite(n.server_time) ? n.server_time : null;
		o !== null && (this.timeSync.addSample(a, o, o, i) ? (this.consecutiveSyncRejections = 0, this.options.onSync?.({
			offset: this.timeSync.getOffset(),
			latency: this.timeSync.getLatency(),
			isStable: this.timeSync.isStable()
		})) : (this.consecutiveSyncRejections += 1, this.options.onSyncDegraded?.(this.consecutiveSyncRejections)));
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
			joined_at: typeof e.joined_at == "number" && Number.isFinite(e.joined_at) ? e.joined_at : 0
		}));
	}
	static foldHostId(e, t) {
		return {
			...e,
			host_id: t,
			members: e.members.map((e) => ({
				...e,
				is_host: e.id === t
			}))
		};
	}
	static serverTimeToMs(e) {
		return e < 0xe8d4a51000 ? e * 1e3 : e;
	}
	static serverTimeOrNow(t, n) {
		return typeof t == "number" && Number.isFinite(t) ? e.serverTimeToMs(t) : n();
	}
	static normalizeQueue(e) {
		if (Array.isArray(e)) return e.map((e) => ({
			media_id: typeof e.media_id == "string" ? e.media_id : "",
			media_info: typeof e.media_info == "object" && e.media_info !== null ? e.media_info : void 0,
			added_at: typeof e.added_at == "number" && Number.isFinite(e.added_at) ? e.added_at : void 0,
			added_by: typeof e.added_by == "string" || e.added_by === null ? e.added_by : void 0
		}));
	}
	static normalizeNudge(t) {
		if (typeof t != "object" || !t) return;
		let n = t;
		return {
			drift_ms: e.finiteOrUndefined(n.drift_ms),
			direction: n.direction === "behind" || n.direction === "ahead" ? n.direction : void 0,
			suggested_rate: e.finiteOrUndefined(n.suggested_rate),
			tolerance_ms: e.finiteOrUndefined(n.tolerance_ms),
			cooldown_ms: e.finiteOrUndefined(n.cooldown_ms)
		};
	}
	static strOr(e, t) {
		return typeof e == "string" ? e : t;
	}
	static strOrNull(e) {
		return typeof e == "string" ? e : null;
	}
	static finiteOr(e, t) {
		return typeof e == "number" && Number.isFinite(e) ? e : t;
	}
	static finiteOrNull(e) {
		return typeof e == "number" && Number.isFinite(e) ? e : null;
	}
	static finiteOrUndefined(e) {
		return typeof e == "number" && Number.isFinite(e) ? e : void 0;
	}
	static playbackState(e) {
		return e === "playing" || e === "paused" || e === "buffering" || e === "stopped" ? e : "stopped";
	}
	handleGroupState(t) {
		let n = t, r = n.group;
		if (typeof r != "object" || !r) return;
		let i = e.strOr(r.group_id, ""), a = e.strOrNull(r.host_id);
		this.group !== null && this.group.group_id !== i && this.cancelSeekCoalescing();
		let o = this.group, s = e.normalizeMembers(r.members, a);
		if (this.group = {
			group_id: i,
			group_name: e.strOr(r.group_name, ""),
			members: s,
			member_count: e.finiteOrUndefined(r.member_count),
			host_id: a,
			current_media_id: e.strOrNull(r.current_media_id),
			current_media_duration: e.finiteOrNull(r.current_media_duration),
			playback_position: e.finiteOr(r.playback_position, 0),
			playback_state: e.playbackState(r.playback_state),
			queue: e.normalizeQueue(r.queue),
			created_at: e.finiteOrUndefined(r.created_at),
			last_activity_at: e.finiteOrUndefined(r.last_activity_at)
		}, o !== null && o.group_id === i) {
			let e = new Set(s.map((e) => e.id));
			for (let t of o.members) e.has(t.id) || this.options.onMemberLeft?.({
				id: t.id,
				name: t.name
			});
		}
		this.options.onState?.(this.group, n.your_id);
	}
	handlePlayback(t, n) {
		if ((typeof n.member_id == "string" ? n.member_id : void 0) === this.memberId || typeof n.position != "number" || !Number.isFinite(n.position)) return;
		let r = n.position, i = e.serverTimeOrNow(n.server_time, () => this.getSynchronizedTime());
		this.options.onPlaybackCommand?.({
			type: t,
			position: r,
			serverTime: i
		});
	}
	handleSeek(t) {
		if ((typeof t.member_id == "string" ? t.member_id : void 0) === this.memberId || typeof t.to_position != "number" || !Number.isFinite(t.to_position)) return;
		let n = t.to_position, r = e.serverTimeOrNow(t.server_time, () => this.getSynchronizedTime());
		this.options.onPlaybackCommand?.({
			type: "seek",
			position: n,
			serverTime: r
		});
	}
	handleHostElect(t) {
		let n = t, r = n.elected_id ?? null;
		if (this.group !== null) {
			let t = typeof n.elected_by == "string" && n.elected_by !== "" ? n.elected_by : null, i = this.group;
			t !== null && t !== this.memberId && (i = {
				...i,
				members: i.members.filter((e) => e.id !== t)
			}), this.group = e.foldHostId(i, r);
		}
		this.options.onHostChanged?.(r);
	}
	handleInfo(e) {
		let t = e;
		typeof t.member_id == "string" && typeof t.member_name == "string" && this.options.onMemberJoined?.({
			id: t.member_id,
			name: t.member_name
		}), typeof t.message == "string" && this.options.onInfo?.(t.message);
	}
	handleError(e) {
		let t = e, n = typeof t.error_code == "string" ? t.error_code : typeof t.code == "string" ? t.code : "UNKNOWN", r = typeof t.message == "string" ? t.message : "Unknown error";
		this.options.onError?.(n, r);
	}
	handleTyping(e) {
		let t = e;
		typeof t.member_id == "string" && this.options.onMemberTyping?.(t.member_id, t.is_typing ?? !1);
	}
	handleChat(e) {
		let t = e;
		if (typeof t.member_id != "string" || typeof t.message != "string") return;
		let n = typeof t.member_name == "string" ? t.member_name : "", r = typeof e.timestamp == "number" && Number.isFinite(e.timestamp) ? e.timestamp : void 0;
		this.options.onChat?.(t.member_id, n, t.message, r);
	}
	handlePlaybackQueueBroadcast(t) {
		let n = t, r = e.normalizeQueue(n.queue);
		r !== void 0 && (this.group !== null && (this.group = {
			...this.group,
			queue: r
		}), this.options.onQueueChanged?.(r));
	}
	handleHostTransfer(t) {
		let n = t;
		typeof n.current_host_id == "string" && typeof n.new_host_id == "string" && (this.group !== null && (this.group = e.foldHostId(this.group, n.new_host_id)), this.options.onHostTransfer?.(n.current_host_id, n.new_host_id));
	}
	handlePlaybackSync(t) {
		let n = typeof t.member_id == "string" ? t.member_id : void 0;
		if (typeof t.position != "number" || !Number.isFinite(t.position)) return;
		let r = t.position, i = typeof t.is_playing == "boolean" && t.is_playing, a = e.serverTimeOrNow(t.server_time, () => this.getSynchronizedTime()), o = e.normalizeNudge(t.nudge);
		this.options.onPlaybackSync?.(n ?? "", r, i, a, o);
	}
	handleTimeSync(e) {
		let t = e;
		typeof t.member_id == "string" && typeof t.group_id == "string" && typeof t.server_time == "number" && Number.isFinite(t.server_time) && typeof t.offset_ms == "number" && Number.isFinite(t.offset_ms) && typeof t.latency_ms == "number" && Number.isFinite(t.latency_ms) && typeof t.drift_rate == "number" && Number.isFinite(t.drift_rate) && typeof t.is_stable == "boolean" && this.options.onTimeSync?.({
			memberId: t.member_id,
			groupId: t.group_id,
			serverTimeSec: t.server_time,
			offsetMs: t.offset_ms,
			latencyMs: t.latency_ms,
			driftRate: t.drift_rate,
			isStable: t.is_stable
		});
	}
	handleGroupList(t) {
		let n = t.groups;
		if (!Array.isArray(n)) return;
		let r = n.map((t) => ({
			id: typeof t.id == "string" ? t.id : "",
			name: typeof t.name == "string" ? t.name : "",
			member_count: e.finiteOr(t.member_count, 0),
			has_password: typeof t.has_password == "boolean" && t.has_password,
			current_media: typeof t.current_media == "string" ? t.current_media : null,
			is_playing: typeof t.is_playing == "boolean" && t.is_playing
		}));
		this.options.onGroupList?.(r);
	}
	dispatch(e, t) {
		this.send(F(e, t, this.now));
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
function G(e) {
	return e.group_id ?? e.id ?? "";
}
function K(e) {
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
function de(e) {
	let t = e ?? {}, n = G(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: H(t.member_count, K(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: W(t.created_at)
	};
}
function fe(e) {
	let t = e ?? {}, n = G(t), r = ue(t);
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
		activeUsers: K(t),
		roles: Object.fromEntries(K(t).map((e) => [e.id, e.role])),
		permissions: {}
	};
}
var pe = class {
	constructor(e) {
		a(this, "client", void 0), this.client = new c({ baseUrl: e });
	}
	async createRoom(e) {
		return de((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t, n) {
		let r = {};
		t !== void 0 && t !== "" && (r.memberName = t), n !== void 0 && n !== "" && (r.password = n);
		let i = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, Object.keys(r).length > 0 ? r : void 0);
		return {
			room: de(i.group),
			session: fe(i.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return fe((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return K((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(de) : [];
	}
	async listPublicRooms() {
		return (await this.listGroups()).filter((e) => e.isPublic);
	}
};
function me(e) {
	if (!(e instanceof l) || e.status !== 400) return !1;
	let t = e.body;
	return typeof t == "object" && !!t && t.error === "Invalid password";
}
var he = null, ge = null;
function q(e) {
	return he && ge === e || (he = new pe(e), ge = e), he;
}
var J = {
	log: () => {},
	warn: () => {},
	error: () => {}
}, _e = null;
function ve(e) {
	_e = e;
}
var Y = null, X = null, Z = 0, ye = 5, be = 1e3, Q = null, xe = null, Se = null, Ce = null, $ = null;
function we() {
	try {
		return o().getAccessToken();
	} catch {
		return null;
	}
}
function Te(e) {
	let t = u();
	if (t.wsUrl !== null) return `${t.wsUrl}${t.wsPath ?? ""}?room=${encodeURIComponent(e)}`;
	let n = typeof window < "u" ? window.location : null, r = n?.hostname ?? "localhost";
	return `${n?.protocol === "https:" ? "wss:" : "ws:"}//${r}:8097?room=${encodeURIComponent(e)}`;
}
function Ee() {
	let e = we();
	return e ? ["bearer", e] : void 0;
}
function De(e) {
	if (Q) try {
		let t = JSON.parse(e.data);
		Q.handleIncoming(t);
	} catch {}
}
function Oe(e) {
	if (!(e && e.target !== Y)) {
		if (Y = null, Q && Q.onDisconnect(), X && Z < ye) {
			let e = be * 2 ** Z;
			Z++, J.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${Z})`), setTimeout(() => {
				X && Ae(X);
			}, e);
		} else Z >= ye && (J.warn("[SyncPlay] Max reconnect attempts reached, giving up"), X = null, Z = 0, Q = null);
	}
}
function ke(e, t, n, r, i) {
	Z = 0, Ce = i ?? null, Ae(e, t, n, r);
}
function Ae(e, t, n, r) {
	if (t && ($ = t), Y && X !== e) {
		let e = Y;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Y = null, X = null, Q = null;
	}
	if (Y && X === e) return;
	X = e;
	let i = n ?? xe ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? Se ?? "Anonymous";
	xe = i, Se = a, Q = new le({
		send: (e) => {
			Y && Y.readyState === WebSocket.OPEN && Y.send(L(e));
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
			J.error(`[SyncPlay] Error: ${e} - ${t}`), _e?.(e, t);
		},
		onInfo: (e) => {
			J.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = Te(e);
	J.log(`[SyncPlay] Opening WebSocket to ${o}`);
	let s;
	try {
		s = new WebSocket(o, Ee());
	} catch (e) {
		J.error("[SyncPlay] WebSocket constructor refused the handshake", e), Oe();
		return;
	}
	Y = s, s.onopen = () => {
		J.log("[SyncPlay] WebSocket connected"), Z = 0, Q && X && Q.joinGroup(X, Ce ?? void 0);
	}, s.onmessage = De, s.onclose = Oe, s.onerror = (e) => {
		J.error("[SyncPlay] WebSocket error", e);
	};
}
function je() {
	if (Q) {
		try {
			Q.leaveGroup();
		} catch {}
		Q.onDisconnect(), Q = null;
	}
	if (Y) {
		let e = Y;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Y = null;
	}
	X = null, Z = 0, Ce = null;
}
function Me(e) {
	Q && Y && Y.readyState === WebSocket.OPEN && Q.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function Ne(e) {
	if (!Q || !Y || Y.readyState !== WebSocket.OPEN) return !1;
	switch (e.type) {
		case "play": return Q.sendPlay(e.position ?? 0), !0;
		case "pause": return Q.sendPause(e.position ?? 0), !0;
		case "seek": return e.position !== void 0 && (Q.sendSeek(0, e.position), !0);
		case "sync": return e.position !== void 0 && (Q.reportPosition(e.position, !0), !0);
	}
}
var Pe = 5e3;
function Fe() {
	let e = d().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var Ie = class extends Error {
	constructor(e) {
		super(`SyncPlay '${e}' command was not delivered to the group`), a(this, "commandType", void 0), this.commandType = e, this.name = "SyncPlayCommandNotDeliveredError";
	}
}, Le = A("phlix-syncplay", () => {
	let { t: e } = i(), t = C(null), n = C(null), r = C(null), a = C([]), o = C(null), s = C(!1), c = C(0), l = 0, u = null, d = m(() => n.value !== null), f = m(() => n.value ? n.value.state === "playing" || n.value.state === "paused" : !1), p = m(() => a.value.filter((e) => e.isOnline)), h = m(() => {
		let e = n.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let t = (Date.now() - l) / 1e3, r = e.playbackPosition + t * e.playbackRate;
		return c.value - r;
	}), g = m(() => n.value ? n.value.state === "waiting" ? "re-syncing" : Math.abs(h.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	function _() {
		let e = n.value;
		e ? e.state === "playing" && Me({
			sessionId: e.id,
			playbackPosition: c.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}) : y();
	}
	function v() {
		y(), u = setInterval(_, Pe);
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
	function ee(e, r, i, o) {
		let { room: s, session: c } = r;
		n.value = c, l = Date.now(), t.value = {
			...t.value ?? {},
			...s,
			currentSession: c
		}, a.value = c.activeUsers, ke(e, (e) => {
			re(e);
		}, void 0, i, o), v();
	}
	async function te(n, r) {
		s.value = !0, o.value = null;
		try {
			let e = q(n), i = Fe(), a = r.password !== void 0 && r.password.trim() !== "" ? r.password : void 0, o = a === void 0 ? void 0 : N(a), s = await e.createRoom({
				name: r.name,
				...a === void 0 ? {} : { password: a },
				memberName: i
			});
			t.value = s, ee(s.id, await e.joinRoom(s.id, i, a), i, o);
		} catch (t) {
			throw o.value = t instanceof Error ? t.message : e("syncplay.errorCreate"), t;
		} finally {
			s.value = !1;
		}
	}
	async function ne(t, n, r) {
		s.value = !0, o.value = null;
		try {
			let e = q(t), i = Fe(), a = r !== void 0 && r !== "" ? r : void 0, o = a === void 0 ? void 0 : N(a);
			ee(n, await e.joinRoom(n, i, a), i, o);
		} catch (t) {
			throw o.value = t instanceof Error ? t.message : e("syncplay.errorJoin"), t;
		} finally {
			s.value = !1;
		}
	}
	async function S(r) {
		if (t.value) {
			s.value = !0, o.value = null;
			try {
				let n = q(r);
				try {
					await n.leaveRoom(t.value.id);
				} catch (t) {
					o.value = t instanceof Error ? t.message : e("syncplay.errorLeave");
				}
			} finally {
				y(), je(), t.value = null, n.value = null, a.value = [], s.value = !1;
			}
		}
	}
	function re(e) {
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
	function w(t, r, i) {
		if (n.value && !Ne({
			type: r,
			position: i?.position === void 0 ? void 0 : i.position * 1e3,
			rate: i?.rate,
			issuedBy: n.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		})) throw o.value = e("syncplay.commandNotDelivered"), new Ie(r);
	}
	async function T(e) {
		if (n.value) try {
			let t = await q(e).getState(n.value.id);
			n.value = t, l = Date.now();
		} catch (e) {
			throw o.value = e instanceof Error ? e.message : "Failed to refresh state.", e;
		}
	}
	async function E(e) {
		if (t.value) try {
			let n = await q(e).getMembers(t.value.id);
			a.value = n;
		} catch (e) {
			throw o.value = e instanceof Error ? e.message : "Failed to refresh members.", e;
		}
	}
	function D() {
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
		createAndJoinRoom: te,
		joinRoom: ne,
		leaveRoom: S,
		onRemoteStateUpdate: re,
		sendCommand: w,
		refreshState: T,
		refreshMembers: E,
		clearError: D,
		updateLocalPosition: ie,
		applyPendingPlayMedia: b,
		consumePendingPlayMedia: x
	};
}), Re = ["aria-label"], ze = ["aria-checked", "tabindex"], Be = ["aria-checked", "tabindex"], Ve = {
	key: 0,
	class: "syncplay-modal__fields"
}, He = { class: "syncplay-modal__field" }, Ue = {
	class: "syncplay-modal__label",
	for: "room-name"
}, We = ["placeholder"], Ge = { class: "syncplay-modal__field" }, Ke = {
	class: "syncplay-modal__label",
	for: "room-password"
}, qe = { class: "syncplay-modal__pw-wrap" }, Je = ["type"], Ye = ["aria-label", "aria-pressed"], Xe = {
	id: "room-password-optional",
	class: "syncplay-modal__hint"
}, Ze = {
	key: 1,
	class: "syncplay-modal__fields"
}, Qe = { class: "syncplay-modal__field" }, $e = {
	class: "syncplay-modal__label",
	for: "room-id"
}, et = ["placeholder"], tt = { class: "syncplay-modal__field" }, nt = {
	class: "syncplay-modal__label",
	for: "room-password"
}, rt = { class: "syncplay-modal__pw-wrap" }, it = [
	"type",
	"required",
	"aria-describedby"
], at = ["aria-label", "aria-pressed"], ot = {
	key: 0,
	id: "room-password-hint",
	class: "syncplay-modal__hint"
}, st = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, ct = {
	key: 3,
	class: "syncplay-modal__rooms"
}, lt = { class: "syncplay-modal__rooms-title" }, ut = { class: "syncplay-modal__rooms-list" }, dt = ["onClick"], ft = { class: "syncplay-modal__room-name" }, pt = { class: "syncplay-modal__room-count" }, mt = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, ht = /*#__PURE__*/ n(/* @__PURE__ */ x({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(n, { emit: a }) {
		let o = n, c = a, { t: l } = i(), u = Le(), d = f(), x = m(() => o.apiBase ?? d.value), A = C("create"), oe = C(null), j = C(null);
		function se(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), A.value = "create", oe.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), A.value = "join", j.value?.focus();
			}
		}
		let M = C(""), N = C(""), P = C(""), F = C(!1), I = C(!1), L = C(null), ce = ee("phlixConfig", null), R = C(!1), z = C(null), B = C([]), V = C(!1), le = m(() => M.value.trim().length > 0), H = m(() => N.value.trim().length > 0 && (!I.value || P.value !== "")), U = m(() => (A.value === "create" ? le.value : H.value) && !R.value);
		ie(() => o.modelValue, async (e) => {
			e && (z.value = null, M.value = "", P.value = "", F.value = !1, I.value = !1, o.prefilledRoomId ? (N.value = o.prefilledRoomId, A.value = "join") : (N.value = "", A.value = "create"), await W());
		});
		async function W() {
			V.value = !0;
			try {
				let e = new pe(x.value);
				B.value = await e.listGroups();
			} catch {
				B.value = [];
			} finally {
				V.value = !1;
			}
		}
		async function G() {
			if (U.value) {
				R.value = !0, z.value = null;
				try {
					A.value === "create" ? await u.createAndJoinRoom(x.value, {
						name: M.value.trim(),
						password: P.value
					}) : await u.joinRoom(x.value, N.value.trim(), P.value), u.currentRoom && c("joined", u.currentRoom), c("update:modelValue", !1);
				} catch (e) {
					A.value === "join" && me(e) ? (I.value = !0, z.value = s("syncplay.invalid_password", ce?.locale, null), te(() => L.value?.focus())) : z.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					R.value = !1;
				}
			}
		}
		function K(e) {
			A.value = "join", N.value = e.id, M.value = e.name, I.value = !e.isPublic;
		}
		function ue() {
			c("update:modelValue", !1);
		}
		return (i, a) => (S(), h(e, {
			"model-value": n.modelValue,
			title: T(l)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": a[8] ||= (e) => c("update:modelValue", e),
			onClose: ue
		}, {
			footer: O(() => [b(t, {
				variant: "ghost",
				type: "button",
				onClick: ue
			}, {
				default: O(() => [y(w(T(l)("common.close")), 1)]),
				_: 1
			}), b(t, {
				variant: "solid",
				type: "button",
				loading: R.value,
				disabled: !U.value,
				onClick: G
			}, {
				default: O(() => [y(w(A.value === "create" ? T(l)("syncplay.createRoom") : T(l)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: O(() => [v("form", {
				class: "syncplay-modal",
				onSubmit: ae(G, ["prevent"])
			}, [
				v("div", {
					class: "syncplay-modal__tabs",
					role: "radiogroup",
					"aria-label": T(l)("syncplay.modeSelect"),
					onKeydown: se
				}, [v("button", {
					ref_key: "createOptionEl",
					ref: oe,
					type: "button",
					role: "radio",
					class: ne(["syncplay-modal__tab", { "is-active": A.value === "create" }]),
					"aria-checked": A.value === "create",
					tabindex: A.value === "create" ? 0 : -1,
					onClick: a[0] ||= (e) => A.value = "create"
				}, w(T(l)("syncplay.createRoom")), 11, ze), v("button", {
					ref_key: "joinOptionEl",
					ref: j,
					type: "button",
					role: "radio",
					class: ne(["syncplay-modal__tab", { "is-active": A.value === "join" }]),
					"aria-checked": A.value === "join",
					tabindex: A.value === "join" ? 0 : -1,
					onClick: a[1] ||= (e) => A.value = "join"
				}, w(T(l)("syncplay.joinRoom")), 11, Be)], 40, Re),
				A.value === "create" ? (S(), _("div", Ve, [v("div", He, [v("label", Ue, w(T(l)("syncplay.roomName")), 1), k(v("input", {
					id: "room-name",
					"onUpdate:modelValue": a[2] ||= (e) => M.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: T(l)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, We), [[D, M.value]])]), v("div", Ge, [
					v("label", Ke, w(T(l)("syncplay.roomPassword")), 1),
					v("div", qe, [k(v("input", {
						id: "room-password",
						"onUpdate:modelValue": a[3] ||= (e) => P.value = e,
						type: F.value ? "text" : "password",
						class: "syncplay-modal__input",
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": "room-password-optional"
					}, null, 8, Je), [[E, P.value]]), v("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": F.value ? T(l)("auth.hidePassword") : T(l)("auth.showPassword"),
						"aria-pressed": F.value,
						onClick: a[4] ||= (e) => F.value = !F.value
					}, [b(r, { name: F.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, Ye)]),
					v("p", Xe, w(T(l)("syncplay.passwordOptional")), 1)
				])])) : (S(), _("div", Ze, [v("div", Qe, [v("label", $e, w(T(l)("syncplay.roomId")), 1), k(v("input", {
					id: "room-id",
					"onUpdate:modelValue": a[5] ||= (e) => N.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: T(l)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, et), [[D, N.value]])]), v("div", tt, [
					v("label", nt, w(T(l)("syncplay.roomPassword")), 1),
					v("div", rt, [k(v("input", {
						id: "room-password",
						ref_key: "passwordInputEl",
						ref: L,
						"onUpdate:modelValue": a[6] ||= (e) => P.value = e,
						type: F.value ? "text" : "password",
						class: "syncplay-modal__input",
						required: I.value,
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": I.value ? "room-password-hint" : void 0
					}, null, 8, it), [[E, P.value]]), v("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": F.value ? T(l)("auth.hidePassword") : T(l)("auth.showPassword"),
						"aria-pressed": F.value,
						onClick: a[7] ||= (e) => F.value = !F.value
					}, [b(r, { name: F.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, at)]),
					I.value ? (S(), _("p", ot, w(T(l)("syncplay.lockedRoomHint")), 1)) : g("", !0)
				])])),
				z.value ? (S(), _("p", st, w(z.value), 1)) : g("", !0),
				A.value === "join" && B.value.length > 0 ? (S(), _("div", ct, [v("h3", lt, w(T(l)("syncplay.availableRooms")), 1), v("ul", ut, [(S(!0), _(p, null, re(B.value, (e) => (S(), _("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [v("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => K(e)
				}, [
					b(r, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					v("span", ft, w(e.name), 1),
					e.isPublic ? g("", !0) : (S(), h(r, {
						key: 0,
						name: "lock",
						label: T(l)("syncplay.lockedRoom"),
						class: "syncplay-modal__room-lock"
					}, null, 8, ["label"])),
					v("span", pt, w(T(l)("syncplay.members", { count: e.memberCount })), 1)
				], 8, dt)]))), 128))])])) : g("", !0),
				V.value ? (S(), _("div", mt, [b(r, { name: "spinner" }), v("span", null, w(T(l)("common.loading")), 1)])) : g("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-3772af96"]]);
export { Le as n, ve as r, ht as t };

//# sourceMappingURL=SyncPlayModal-CQ_NONPj.js.map