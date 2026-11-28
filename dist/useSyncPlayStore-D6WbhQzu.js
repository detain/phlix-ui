import { D as e, S as t, o as n, t as r } from "./client-Bmlfq3Uy.js";
import { t as i } from "./useMessages-Bgh_YqAN.js";
import { t as a } from "./useAuthStore-CPdm_u9W.js";
import { computed as o, ref as s } from "vue";
import { defineStore as c } from "pinia";
// src/utils/syncplaySha256.ts
var l = [
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
function u(e, t) {
	return (e >>> t | e << 32 - t) >>> 0;
}
function d(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 1) {
		let r = e.codePointAt(n);
		r > 65535 && (n += 1), r < 128 ? t.push(r) : r < 2048 ? t.push(192 | r >>> 6, 128 | r & 63) : r < 65536 ? t.push(224 | r >>> 12, 128 | r >>> 6 & 63, 128 | r & 63) : t.push(240 | r >>> 18, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | r & 63);
	}
	return t;
}
function f(e) {
	let t = d(e), n = t.length * 8;
	for (t.push(128); t.length % 64 != 56;) t.push(0);
	let r = Math.floor(n / 4294967296), i = n % 4294967296;
	t.push(r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, r & 255, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, i & 255);
	let a = 1779033703, o = 3144134277, s = 1013904242, c = 2773480762, f = 1359893119, p = 2600822924, m = 528734635, h = 1541459225, g = /* @__PURE__ */ new Int32Array(64);
	for (let e = 0; e < t.length; e += 64) {
		for (let n = 0; n < 16; n += 1) {
			let r = e + n * 4;
			g[n] = (t[r] << 24 | t[r + 1] << 16 | t[r + 2] << 8 | t[r + 3]) >>> 0;
		}
		for (let e = 16; e < 64; e += 1) {
			let t = (u(g[e - 15], 7) ^ u(g[e - 15], 18) ^ g[e - 15] >>> 3) >>> 0, n = (u(g[e - 2], 17) ^ u(g[e - 2], 19) ^ g[e - 2] >>> 10) >>> 0;
			g[e] = g[e - 16] + t + g[e - 7] + n >>> 0;
		}
		let n = a, r = o, i = s, d = c, _ = f, v = p, y = m, b = h;
		for (let e = 0; e < 64; e += 1) {
			let t = (u(_, 6) ^ u(_, 11) ^ u(_, 25)) >>> 0, a = (_ & v ^ ~_ & y) >>> 0, o = b + t + a + l[e] + g[e] >>> 0, s = ((u(n, 2) ^ u(n, 13) ^ u(n, 22)) >>> 0) + ((n & r ^ n & i ^ r & i) >>> 0) >>> 0;
			b = y, y = v, v = _, _ = d + o >>> 0, d = i, i = r, r = n, n = o + s >>> 0;
		}
		a = a + n >>> 0, o = o + r >>> 0, s = s + i >>> 0, c = c + d >>> 0, f = f + _ >>> 0, p = p + v >>> 0, m = m + y >>> 0, h = h + b >>> 0;
	}
	return [
		a,
		o,
		s,
		c,
		f,
		p,
		m,
		h
	].map((e) => (e >>> 0).toString(16).padStart(8, "0")).join("");
}
function p(e) {
	if (e === "") throw Error("hashGroupPassword: refusing to hash an empty password — omit the password_hash field instead");
	return f(e);
}
// src/api/socketHint.ts
var m = {
	wsUrl: null,
	wsPath: null
}, h = /^wss?:\/\/[^/?#@]+$/i, g = /^\/[^?#]*$/;
function _(e) {
	if (typeof e != "object" || !e) return m;
	let t = e;
	if (typeof t.wsUrl != "string" || !h.test(t.wsUrl)) return m;
	let n = typeof t.wsPath == "string" && g.test(t.wsPath) ? t.wsPath.replace(/\/+$/, "") : null;
	return {
		wsUrl: t.wsUrl,
		wsPath: n
	};
}
function v() {
	return typeof window > "u" ? m : _(window.__PHLIX__);
}
// node_modules/@phlix/syncplay/dist/phlix-syncplay.js
var y = {
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
}, b = [
	y.GROUP_CREATE,
	y.GROUP_JOIN,
	y.GROUP_LEAVE,
	y.GROUP_STATE,
	y.GROUP_LIST,
	y.PLAYBACK_PLAY,
	y.PLAYBACK_PAUSE,
	y.PLAYBACK_SEEK,
	y.PLAYBACK_QUEUE,
	y.PLAYBACK_SYNC,
	y.CHAT,
	y.TYPING,
	y.HOST_TRANSFER,
	y.HOST_ELECT,
	y.TIME_PING,
	y.TIME_PONG,
	y.TIME_SYNC,
	y.ERROR,
	y.INFO
];
function x(e) {
	return b.includes(e);
}
function S(e) {
	"@babel/helpers - typeof";
	return S = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, S(e);
}
function C(e, t) {
	if (S(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (S(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function w(e) {
	var t = C(e, "string");
	return S(t) == "symbol" ? t : t + "";
}
function T(e, t, n) {
	return (t = w(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function E(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function D(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? E(Object(n), !0).forEach(function(t) {
			T(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : E(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function O(e, t, n) {
	return D(D({}, t), {}, {
		type: e,
		protocol_version: 1,
		timestamp: n()
	});
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
	let r = n.data, i = !("protocol_version" in n) && typeof r == "object" && r && !Array.isArray(r) ? (() => {
		let e = {};
		for (let t of Object.keys(n)) t !== "data" && (e[t] = n[t]);
		return D(D({}, r), e);
	})() : n;
	return x(n.type), i;
}
function A(e) {
	return JSON.stringify(e);
}
var ee = .1, te = .99, ne = 1.01, re = class {
	constructor(e) {
		T(this, "samples", []), T(this, "driftRate", 1), T(this, "now", void 0), T(this, "samplesVersion", 0), T(this, "cacheVersion", -1), T(this, "cachedOffset", 0), T(this, "cachedLatency", 0), T(this, "cachedIsStable", !1), this.now = e;
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
		this.driftRate = 1 + ee * i / 1e3, this.driftRate = Math.min(ne, Math.max(te, this.driftRate));
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
}, ie = 250, ae = class e {
	constructor(t) {
		T(this, "send", void 0), T(this, "now", void 0), T(this, "memberId", void 0), T(this, "memberName", void 0), T(this, "options", void 0), T(this, "timeSync", void 0), T(this, "seekThrottleMs", void 0), T(this, "seekWindowOpen", !1), T(this, "pendingSeek", null), T(this, "seekFlushTimer", null), T(this, "group", null), T(this, "destroyed", !1), T(this, "lastPingSendTime", null), T(this, "consecutiveSyncRejections", 0), this.options = t, this.send = t.send, this.now = t.now, this.memberId = t.memberId, this.memberName = t.memberName ?? "User", this.timeSync = new re(t.now), this.seekThrottleMs = e.parseSeekThrottleMs(t.seekThrottleMs);
	}
	static parseSeekThrottleMs(e) {
		if (e === void 0) return ie;
		if (typeof e != "number" || !Number.isFinite(e) || e < 0) throw TypeError(`SyncPlayClient: seekThrottleMs must be a finite number >= 0 (0 disables the seek coalescing throttle), got ${String(e)}`);
		return e;
	}
	static parsePasswordHash(e) {
		if (e !== void 0) {
			if (typeof e != "string" || !/^([0-9a-f]{64})$/.test(e)) {
				let t = typeof e == "string" ? ` of length ${e.length}` : "";
				throw TypeError(`SyncPlayClient: passwordHash must be undefined or 64 lowercase hex characters (unsalted SHA-256 hex; SPEC §4/§8.2, canonical form of the server gate SyncPlayManager::groupPasswordGate) — this library ships canonical form only: a present-but-malformed value is refused as a local fail-fast (stricter than the server, whose gate case-folds before matching) and is never shipped or coerced. Got a ${typeof e}${t}.`);
			}
			return e;
		}
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
	createGroup(t, n) {
		let r = e.parsePasswordHash(n);
		if (this.destroyed) return;
		let i = {
			group_name: t,
			member_id: this.memberId,
			member_name: this.memberName
		};
		r !== void 0 && (i.password_hash = r), this.dispatch(y.GROUP_CREATE, i);
	}
	joinGroup(t, n) {
		let r = e.parsePasswordHash(n);
		if (this.destroyed) return;
		let i = {
			group_id: t,
			member_id: this.memberId,
			member_name: this.memberName
		};
		r !== void 0 && (i.password_hash = r), this.dispatch(y.GROUP_JOIN, i);
	}
	leaveGroup() {
		return this.group !== null && (this.cancelSeekCoalescing(), this.dispatch(y.GROUP_LEAVE, {
			group_id: this.group.group_id,
			member_id: this.memberId
		}), this.group = null, !0);
	}
	sendPlay(e) {
		return this.group !== null && (this.dispatch(y.PLAYBACK_PLAY, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		}), !0);
	}
	sendPause(e) {
		return this.group !== null && (this.dispatch(y.PLAYBACK_PAUSE, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		}), !0);
	}
	sendSeek(e, t) {
		return this.group === null ? !1 : this.seekWindowOpen ? (this.pendingSeek = {
			from: e,
			to: t
		}, !0) : (this.dispatchSeek(e, t), this.seekThrottleMs > 0 && !this.seekWindowOpen && this.openSeekWindow(), !0);
	}
	dispatchSeek(e, t) {
		this.group !== null && this.dispatch(y.PLAYBACK_SEEK, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			from_position: e,
			to_position: t,
			server_time: this.getSynchronizedTime()
		});
	}
	openSeekWindow() {
		this.seekWindowOpen = !0, this.seekFlushTimer = setTimeout(() => {
			try {
				this.closeSeekWindow();
			} catch {
				var e, t;
				(e = (t = this.options).onFrameDropped) == null || e.call(t, "send-failed", null);
			}
		}, this.seekThrottleMs);
	}
	closeSeekWindow() {
		this.seekWindowOpen = !1, this.seekFlushTimer = null;
		let e = this.pendingSeek;
		e !== null && (this.pendingSeek = null, this.group !== null && (this.dispatchSeek(e.from, e.to), !this.destroyed && this.group !== null && this.seekThrottleMs > 0 && !this.seekWindowOpen && this.openSeekWindow()));
	}
	cancelSeekCoalescing() {
		this.pendingSeek = null, this.seekFlushTimer !== null && (clearTimeout(this.seekFlushTimer), this.seekFlushTimer = null), this.seekWindowOpen = !1;
	}
	reportPosition(e, t) {
		return this.group !== null && (this.dispatch(y.PLAYBACK_SYNC, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			is_playing: t,
			server_time: this.getSynchronizedTime()
		}), !0);
	}
	sendChat(e) {
		return this.group !== null && (this.dispatch(y.CHAT, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			message: e
		}), !0);
	}
	sendTyping(e) {
		return this.group !== null && (this.dispatch(y.TYPING, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			is_typing: e
		}), !0);
	}
	pingTime() {
		if (this.destroyed) return;
		let e = this.now(), t = this.lastPingSendTime;
		if (t !== null) {
			let n = e - t;
			if (n >= 0 && n <= 1e3) return;
		}
		this.lastPingSendTime = e, this.dispatch(y.TIME_PING, { client_time: e });
	}
	onDisconnect() {
		var e, t;
		this.cancelSeekCoalescing(), this.timeSync.reset(), this.consecutiveSyncRejections = 0, this.group = null, this.lastPingSendTime = null, (e = (t = this.options).onDisconnect) == null || e.call(t);
	}
	destroy() {
		this.destroyed = !0, this.cancelSeekCoalescing(), this.timeSync.reset(), this.group = null, this.lastPingSendTime = null;
	}
	handleIncoming(e) {
		if (this.destroyed) return;
		let t = k(e);
		if (t === null) {
			var n, r;
			(n = (r = this.options).onFrameDropped) == null || n.call(r, "undecodable", e);
			return;
		}
		if (!x(t.type)) {
			var i, a;
			(i = (a = this.options).onUnknownFrame) == null || i.call(a, t);
			return;
		}
		let o = t;
		if ("protocol_version" in o) {
			let e = o.protocol_version;
			if (typeof e != "number" || !Number.isInteger(e) || e > 1) {
				var s, c;
				(s = (c = this.options).onFrameDropped) == null || s.call(c, "malformed", o);
				return;
			}
		}
		switch (o.type) {
			case y.TIME_PONG:
				this.handleTimePong(o);
				break;
			case y.GROUP_STATE:
				this.handleGroupState(o);
				break;
			case y.PLAYBACK_PLAY:
				this.handlePlayback("play", o);
				break;
			case y.PLAYBACK_PAUSE:
				this.handlePlayback("pause", o);
				break;
			case y.PLAYBACK_SEEK:
				this.handleSeek(o);
				break;
			case y.HOST_ELECT:
				this.handleHostElect(o);
				break;
			case y.INFO:
				this.handleInfo(o);
				break;
			case y.ERROR:
				this.handleError(o);
				break;
			case y.TYPING:
				this.handleTyping(o);
				break;
			case y.HOST_TRANSFER:
				this.handleHostTransfer(o);
				break;
			case y.PLAYBACK_SYNC:
				this.handlePlaybackSync(o);
				break;
			case y.TIME_SYNC:
				this.handleTimeSync(o);
				break;
			case y.GROUP_LIST:
				this.handleGroupList(o);
				break;
			case y.CHAT:
				this.handleChat(o);
				break;
			case y.PLAYBACK_QUEUE:
				this.handlePlaybackQueueBroadcast(o);
				break;
			default:
				var l, u;
				(l = (u = this.options).onUnknownFrame) == null || l.call(u, o);
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
		if (o === null) {
			var s, c;
			this.consecutiveSyncRejections += 1, (s = (c = this.options).onSyncDegraded) == null || s.call(c, this.consecutiveSyncRejections);
		} else if (this.timeSync.addSample(a, o, o, i)) {
			var l, u;
			this.consecutiveSyncRejections = 0, (l = (u = this.options).onSync) == null || l.call(u, {
				offset: this.timeSync.getOffset(),
				latency: this.timeSync.getLatency(),
				isStable: this.timeSync.isStable()
			});
		} else {
			var d, f;
			this.consecutiveSyncRejections += 1, (d = (f = this.options).onSyncDegraded) == null || d.call(f, this.consecutiveSyncRejections);
		}
	}
	static normalizeMembers(e, t) {
		let n;
		return n = Array.isArray(e) ? e.filter((e) => typeof e == "object" && !!e) : e && typeof e == "object" ? Object.entries(e).filter(([, e]) => typeof e == "object" && !!e).map(([e, t]) => D(D({}, t), {}, { id: e })) : [], n.map((e) => ({
			id: typeof e.id == "string" ? e.id : "",
			name: typeof e.name == "string" ? e.name : "",
			is_host: e.id === t,
			joined_at: typeof e.joined_at == "number" && Number.isFinite(e.joined_at) ? e.joined_at : 0
		}));
	}
	static foldHostId(e, t) {
		return D(D({}, e), {}, {
			host_id: t,
			members: e.members.map((e) => D(D({}, e), {}, { is_host: e.id === t }))
		});
	}
	static serverTimeToMs(e) {
		return e < 0xe8d4a51000 ? e * 1e3 : e;
	}
	static serverTimeOrNow(t, n) {
		return typeof t != "number" || !Number.isFinite(t) || t < 1e3 ? n() : t >= 0xe8d4a51000 || t >= 1e9 && t < 4e9 ? e.serverTimeToMs(t) : n();
	}
	static normalizeQueue(e) {
		if (Array.isArray(e)) return e.filter((e) => typeof e == "object" && !!e).map((e) => ({
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
			suggested_rate: e.nudgeRateOrUndefined(n.suggested_rate),
			tolerance_ms: e.nonnegOrUndefined(n.tolerance_ms),
			cooldown_ms: e.nonnegOrUndefined(n.cooldown_ms)
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
	static nudgeRateOrUndefined(e) {
		if (!(typeof e != "number" || !Number.isFinite(e) || e < .9 || e > 1.1)) return e;
	}
	static nonnegOrUndefined(e) {
		if (!(typeof e != "number" || !Number.isFinite(e) || e < 0)) return e;
	}
	positionOrDrop(e) {
		if (typeof e != "number" || !Number.isFinite(e) || e < 0) return null;
		let t = this.group?.current_media_duration;
		return typeof t == "number" && Number.isFinite(t) && t > 0 && e > t ? t : e;
	}
	static clampedPosition(t, n) {
		let r = e.finiteOr(t, 0);
		return r < 0 ? 0 : n !== null && n > 0 && r > n ? n : r;
	}
	static playbackState(e) {
		return e === "playing" || e === "paused" || e === "buffering" || e === "stopped" ? e : "stopped";
	}
	handleGroupState(t) {
		var n, r;
		let i = t, a = i.group;
		if (typeof a != "object" || !a) {
			var o, s;
			(o = (s = this.options).onFrameDropped) == null || o.call(s, "malformed", t);
			return;
		}
		if (typeof a.group_id != "string") {
			var c, l;
			(c = (l = this.options).onFrameDropped) == null || c.call(l, "malformed", t);
			return;
		}
		let u = a.group_id, d = e.strOrNull(a.host_id);
		this.group !== null && this.group.group_id !== u && this.cancelSeekCoalescing();
		let f = this.group, p = e.normalizeMembers(a.members, d), m = e.finiteOrNull(a.current_media_duration);
		if (this.group = {
			group_id: u,
			group_name: e.strOr(a.group_name, ""),
			members: p,
			member_count: e.finiteOrUndefined(a.member_count),
			host_id: d,
			current_media_id: e.strOrNull(a.current_media_id),
			current_media_duration: m,
			playback_position: e.clampedPosition(a.playback_position, m),
			playback_state: e.playbackState(a.playback_state),
			queue: e.normalizeQueue(a.queue),
			created_at: e.finiteOrUndefined(a.created_at),
			last_activity_at: e.finiteOrUndefined(a.last_activity_at)
		}, f !== null && f.group_id === u) {
			let e = new Set(p.map((e) => e.id));
			for (let t of f.members) if (!e.has(t.id)) {
				var h, g;
				(h = (g = this.options).onMemberLeft) == null || h.call(g, {
					id: t.id,
					name: t.name
				});
			}
		}
		(n = (r = this.options).onState) == null || n.call(r, this.group, i.your_id);
	}
	handlePlayback(t, n) {
		var r, i;
		if (this.group === null) {
			var a, o;
			(a = (o = this.options).onFrameDropped) == null || a.call(o, "malformed", n);
			return;
		}
		if ((typeof n.member_id == "string" ? n.member_id : void 0) === this.memberId) return;
		let s = this.positionOrDrop(n.position);
		if (s === null) {
			var c, l;
			(c = (l = this.options).onFrameDropped) == null || c.call(l, "malformed", n);
			return;
		}
		let u = e.serverTimeOrNow(n.server_time, () => this.getSynchronizedTime());
		(r = (i = this.options).onPlaybackCommand) == null || r.call(i, {
			type: t,
			position: s,
			serverTime: u
		});
	}
	handleSeek(t) {
		var n, r;
		if (this.group === null) {
			var i, a;
			(i = (a = this.options).onFrameDropped) == null || i.call(a, "malformed", t);
			return;
		}
		if ((typeof t.member_id == "string" ? t.member_id : void 0) === this.memberId) return;
		let o = this.positionOrDrop(t.to_position);
		if (o === null) {
			var s, c;
			(s = (c = this.options).onFrameDropped) == null || s.call(c, "malformed", t);
			return;
		}
		let l = e.serverTimeOrNow(t.server_time, () => this.getSynchronizedTime());
		(n = (r = this.options).onPlaybackCommand) == null || n.call(r, {
			type: "seek",
			position: o,
			serverTime: l
		});
	}
	handleHostElect(t) {
		var n, r;
		let i = t, a = e.strOrNull(i.elected_id);
		if (this.group !== null) {
			let t = typeof i.elected_by == "string" && i.elected_by !== "" ? i.elected_by : null, n = this.group, r = t !== null && t !== this.memberId ? n.members.filter((e) => e.id !== t) : n.members;
			if (r.length !== n.members.length) {
				var o, s;
				let i = n.members.find((e) => e.id === t);
				if (n = D(D({}, n), {}, { members: r }), this.group = e.foldHostId(n, a), i !== void 0) {
					var c, l;
					(c = (l = this.options).onMemberLeft) == null || c.call(l, {
						id: i.id,
						name: i.name
					});
				}
				(o = (s = this.options).onHostChanged) == null || o.call(s, a);
				return;
			}
			this.group = e.foldHostId(n, a);
		}
		(n = (r = this.options).onHostChanged) == null || n.call(r, a);
	}
	handleInfo(e) {
		let t = e;
		if (this.group !== null && typeof t.member_id == "string" && typeof t.member_name == "string") {
			var n, r;
			(n = (r = this.options).onMemberJoined) == null || n.call(r, {
				id: t.member_id,
				name: t.member_name
			});
		}
		if (typeof t.message == "string") {
			var i, a;
			(i = (a = this.options).onInfo) == null || i.call(a, t.message);
		}
	}
	handleError(e) {
		var t, n;
		let r = e, i = typeof r.error_code == "string" ? r.error_code : typeof r.code == "string" ? r.code : "UNKNOWN", a = typeof r.message == "string" ? r.message : "Unknown error", o = typeof r.details == "object" && r.details !== null && !Array.isArray(r.details) ? r.details : void 0;
		(t = (n = this.options).onError) == null || t.call(n, i, a, o);
	}
	handleTyping(e) {
		var t, n;
		let r = e;
		if (typeof r.member_id != "string") {
			var i, a;
			(i = (a = this.options).onFrameDropped) == null || i.call(a, "malformed", e);
			return;
		}
		let o = typeof r.is_typing == "boolean" && r.is_typing;
		(t = (n = this.options).onMemberTyping) == null || t.call(n, r.member_id, o);
	}
	handleChat(e) {
		var t, n;
		let r = e;
		if (typeof r.member_id != "string" || typeof r.message != "string") {
			var i, a;
			(i = (a = this.options).onFrameDropped) == null || i.call(a, "malformed", e);
			return;
		}
		let o = typeof r.member_name == "string" ? r.member_name : "", s = typeof e.timestamp == "number" && Number.isFinite(e.timestamp) ? e.timestamp : void 0;
		(t = (n = this.options).onChat) == null || t.call(n, r.member_id, o, r.message, s);
	}
	handlePlaybackQueueBroadcast(t) {
		var n, r;
		let i = this.group;
		if (i === null) {
			var a, o;
			(a = (o = this.options).onFrameDropped) == null || a.call(o, "malformed", t);
			return;
		}
		let s = t, c = e.normalizeQueue(s.queue);
		if (c === void 0) {
			var l, u;
			(l = (u = this.options).onFrameDropped) == null || l.call(u, "malformed", t);
		} else this.group = D(D({}, i), {}, { queue: c }), (n = (r = this.options).onQueueChanged) == null || n.call(r, c);
	}
	handleHostTransfer(t) {
		var n, r;
		let i = t;
		if (typeof i.current_host_id != "string" || typeof i.new_host_id != "string") {
			var a, o;
			(a = (o = this.options).onFrameDropped) == null || a.call(o, "malformed", t);
		} else this.group !== null && (this.group = e.foldHostId(this.group, i.new_host_id)), (n = (r = this.options).onHostTransfer) == null || n.call(r, i.current_host_id, i.new_host_id);
	}
	handlePlaybackSync(t) {
		var n, r;
		if (this.group === null) {
			var i, a;
			(i = (a = this.options).onFrameDropped) == null || i.call(a, "malformed", t);
			return;
		}
		if (typeof t.member_id != "string") {
			var o, s;
			(o = (s = this.options).onFrameDropped) == null || o.call(s, "malformed", t);
			return;
		}
		let c = t.member_id, l = this.positionOrDrop(t.position);
		if (l === null) {
			var u, d;
			(u = (d = this.options).onFrameDropped) == null || u.call(d, "malformed", t);
			return;
		}
		let f = typeof t.is_playing == "boolean" && t.is_playing, p = e.serverTimeOrNow(t.server_time, () => this.getSynchronizedTime()), m = e.normalizeNudge(t.nudge);
		(n = (r = this.options).onPlaybackSync) == null || n.call(r, c, l, f, p, m);
	}
	handleTimeSync(e) {
		var t, n;
		let r = e;
		if (typeof r.member_id != "string" || typeof r.group_id != "string" || !(typeof r.server_time == "number" && Number.isFinite(r.server_time)) || !(typeof r.offset_ms == "number" && Number.isFinite(r.offset_ms)) || !(typeof r.latency_ms == "number" && Number.isFinite(r.latency_ms)) || !(typeof r.drift_rate == "number" && Number.isFinite(r.drift_rate)) || typeof r.is_stable != "boolean") {
			var i, a;
			(i = (a = this.options).onFrameDropped) == null || i.call(a, "malformed", e);
		} else (t = (n = this.options).onTimeSync) == null || t.call(n, {
			memberId: r.member_id,
			groupId: r.group_id,
			serverTimeSec: r.server_time,
			offsetMs: r.offset_ms,
			latencyMs: r.latency_ms,
			driftRate: r.drift_rate,
			isStable: r.is_stable
		});
	}
	handleGroupList(t) {
		var n, r;
		let i = t.groups;
		if (!Array.isArray(i)) {
			var a, o;
			(a = (o = this.options).onFrameDropped) == null || a.call(o, "malformed", t);
			return;
		}
		let s = i.filter((e) => typeof e == "object" && !!e).map((t) => ({
			id: typeof t.id == "string" ? t.id : "",
			name: typeof t.name == "string" ? t.name : "",
			member_count: e.finiteOr(t.member_count, 0),
			has_password: typeof t.has_password == "boolean" && t.has_password,
			current_media: typeof t.current_media == "string" ? t.current_media : null,
			is_playing: typeof t.is_playing == "boolean" && t.is_playing
		}));
		(n = (r = this.options).onGroupList) == null || n.call(r, s);
	}
	dispatch(e, t) {
		this.send(O(e, t, this.now));
	}
};
// src/api/syncplay.ts
function j(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function M(e) {
	return e / 1e3;
}
function N(e) {
	let t = j(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function oe(e) {
	return e.group_id ?? e.id ?? "";
}
function P(e) {
	let t = e?.members;
	return t ? (Array.isArray(t) ? t : Object.entries(t).map(([e, t]) => ({
		id: e,
		...t
	}))).map((e) => ({
		id: e.id ?? "",
		name: e.name ?? "Unknown",
		role: e.is_host === !0 ? "owner" : "contributor",
		isOnline: !0,
		lastSeen: N(e.joined_at)
	})) : [];
}
function se(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function F(e) {
	let t = e ?? {}, n = oe(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: j(t.member_count, P(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: N(t.created_at)
	};
}
function ce(e) {
	let t = e ?? {}, n = oe(t), r = se(t);
	return {
		id: n,
		roomId: n,
		createdBy: t.host_id ?? "",
		createdAt: N(t.created_at),
		state: r,
		currentMediaId: t.current_media_id ?? null,
		playbackPosition: M(j(t.playback_position)),
		playbackRate: +(r === "playing"),
		serverTime: j(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: N(t.last_activity_at),
		activeUsers: P(t),
		roles: Object.fromEntries(P(t).map((e) => [e.id, e.role]))
	};
}
var le = class {
	constructor(t) {
		e(this, "client", void 0), this.client = new r({ baseUrl: t });
	}
	async createRoom(e) {
		return F((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t, n) {
		let r = {};
		t !== void 0 && t !== "" && (r.memberName = t), n !== void 0 && n !== "" && (r.password = n);
		let i = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, Object.keys(r).length > 0 ? r : void 0);
		return {
			room: F(i.group),
			session: ce(i.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return ce((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return P((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(F) : [];
	}
	async listPublicRooms() {
		return (await this.listGroups()).filter((e) => e.isPublic);
	}
};
function ue(e) {
	if (!(e instanceof t) || e.status !== 400) return !1;
	let n = e.body;
	return typeof n == "object" && !!n && n.error === "Invalid password";
}
var I = null, L = null;
function R(e) {
	return I && L === e || (I = new le(e), L = e), I;
}
var z = {
	log: () => {},
	warn: () => {},
	error: () => {}
}, B = null;
function de(e) {
	B = e;
}
var V = null, H = null, U = 0, fe = 5, pe = 1e3, W = null;
function G() {
	W !== null && (clearTimeout(W), W = null);
}
var me = 0, K = !1, q = !1, he = null;
function ge(e) {
	he = e;
}
var J = () => {
	q && (z.log("[SyncPlay] online wake — retrying the remembered room with a fresh budget"), be());
}, _e = () => {
	typeof document < "u" && document.visibilityState === "visible" && J();
}, ve = !1;
function ye(e) {
	ve !== e && (typeof window < "u" && (e ? (window.addEventListener("online", J), document.addEventListener("visibilitychange", _e)) : (window.removeEventListener("online", J), document.removeEventListener("visibilitychange", _e))), ve = e);
}
function Y(e) {
	q !== e && (q = e, ye(e), he?.(e));
}
function be() {
	return !q || !H ? !1 : (Y(!1), U = 0, $(H), !0);
}
var X = null, xe = null, Se = null, Z = null, Q = null;
function Ce() {
	try {
		return n().getAccessToken();
	} catch {
		return null;
	}
}
function we(e) {
	let t = v();
	if (t.wsUrl !== null) return `${t.wsUrl}${t.wsPath ?? ""}?room=${encodeURIComponent(e)}`;
	let n = typeof window < "u" ? window.location : null, r = n?.hostname ?? "localhost";
	return `${n?.protocol === "https:" ? "wss:" : "ws:"}//${r}:8097?room=${encodeURIComponent(e)}`;
}
function Te() {
	let e = Ce();
	return e ? ["bearer", e] : void 0;
}
function Ee(e) {
	if (X) try {
		let t = JSON.parse(e.data);
		X.handleIncoming(t);
	} catch {
		me++, K || (K = !0, z.warn("[SyncPlay] Dropping malformed WebSocket frame (JSON parse failed); further parse failures this session are counted silently"));
	}
}
function De(e) {
	if (!(e && e.target !== V) && !q) {
		if (V = null, X && X.onDisconnect(), H && W === null && U < fe) {
			let e = pe * 2 ** U;
			U++;
			let t = H;
			z.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${U})`), W = setTimeout(() => {
				W = null, q || H === t && $(t);
			}, e);
		} else U >= fe && (z.warn("[SyncPlay] Max reconnect attempts reached, giving up"), U = 0, X = null, G(), Y(!0));
	}
}
function Oe(e, t, n, r, i) {
	U = 0, Y(!1), Z = i ?? null, G(), me = 0, K = !1, $(e, t, n, r);
}
function $(e, t, n, r) {
	if (t && (Q = t), V && H !== e) {
		let e = V;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), V = null, H = null, X = null;
	}
	if (V && H === e) return;
	H = e;
	let i = n ?? xe ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? Se ?? "Anonymous";
	xe = i, Se = a, X = new ae({
		send: (e) => {
			V && V.readyState === WebSocket.OPEN && V.send(A(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			Q && Q({
				type: e.type,
				position: M(e.position),
				roomId: H ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			Q && Q({
				type: n ? "play" : "pause",
				position: M(t),
				roomId: H ?? void 0
			});
		},
		onDisconnect: () => {},
		onError: (e, t) => {
			z.error(`[SyncPlay] Error: ${e} - ${t}`), B?.(e, t);
		},
		onInfo: (e) => {
			z.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = we(e);
	z.log(`[SyncPlay] Opening WebSocket to ${o}`);
	let s;
	try {
		s = new WebSocket(o, Te());
	} catch (e) {
		z.error("[SyncPlay] WebSocket constructor refused the handshake", e), De();
		return;
	}
	V = s, s.onopen = () => {
		z.log("[SyncPlay] WebSocket connected"), U = 0, X && H && X.joinGroup(H, Z ?? void 0);
	}, s.onmessage = Ee, s.onclose = De, s.onerror = (e) => {
		z.error("[SyncPlay] WebSocket error", e);
	};
}
function ke() {
	if (X) {
		try {
			X.leaveGroup();
		} catch {}
		X.onDisconnect(), X = null;
	}
	if (V) {
		let e = V;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), V = null;
	}
	H = null, U = 0, G(), Y(!1), Z = null;
}
function Ae(e) {
	X && V && V.readyState === WebSocket.OPEN && X.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function je(e) {
	if (!X || !V || V.readyState !== WebSocket.OPEN) return !1;
	switch (e.type) {
		case "play": return X.sendPlay(e.position ?? 0), !0;
		case "pause": return X.sendPause(e.position ?? 0), !0;
		case "seek":
			if (e.position !== void 0) {
				let t = X.getGroup()?.playback_position;
				return typeof t != "number" || !Number.isFinite(t) || t < 0 ? !1 : X.sendSeek(t, e.position);
			}
			return !1;
		case "sync":
			if (e.position !== void 0) {
				let t = e.rate === void 0 ? X.getGroup()?.playback_state === "playing" : e.rate > 0;
				return X.reportPosition(e.position, t);
			}
			return !1;
	}
}
function Me(e, t) {
	let n = t.position === void 0 ? {} : { playbackPosition: t.position };
	switch (t.type) {
		case "play": return {
			session: {
				...e,
				...n,
				state: "playing",
				playbackRate: t.rate ?? 1
			},
			reanchor: t.position !== void 0
		};
		case "pause": return {
			session: {
				...e,
				...n,
				state: "paused"
			},
			reanchor: t.position !== void 0
		};
		case "seek": return {
			session: {
				...e,
				...n
			},
			reanchor: t.position !== void 0
		};
		case "sync": return {
			session: {
				...e,
				...n,
				...t.rate === void 0 ? {} : { playbackRate: t.rate }
			},
			reanchor: t.position !== void 0
		};
		default: return {
			session: e,
			reanchor: !1
		};
	}
}
var Ne = .5;
function Pe(e, t, n) {
	if (!e) return !0;
	switch (t) {
		case "play": return e.state !== "playing";
		case "pause": return e.state !== "paused";
		case "seek": return n === void 0 || Math.abs(e.playbackPosition - n) > Ne;
		default: return !1;
	}
}
var Fe = 5e3;
function Ie() {
	let e = a().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var Le = class extends Error {
	constructor(t) {
		super(`SyncPlay '${t}' command was not delivered to the group`), e(this, "commandType", void 0), this.commandType = t, this.name = "SyncPlayCommandNotDeliveredError";
	}
}, Re = c("phlix-syncplay", () => {
	let { t: e } = i(), t = s(null), n = s(null), r = s(null), a = s([]), c = s(null), l = s(!1), u = s(!1);
	ge((e) => {
		u.value = e;
	});
	let d = s(0), f = 0, m = null, h = o(() => n.value !== null), g = o(() => n.value ? n.value.state === "playing" || n.value.state === "paused" : !1), _ = o(() => a.value.filter((e) => e.isOnline)), v = o(() => {
		let e = n.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let t = (Date.now() - f) / 1e3, r = e.playbackPosition + t * e.playbackRate;
		return d.value - r;
	}), y = o(() => n.value ? n.value.state === "waiting" ? "re-syncing" : Math.abs(v.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	function b() {
		let e = n.value;
		e ? e.state === "playing" && Ae({
			sessionId: e.id,
			playbackPosition: d.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}) : S();
	}
	function x() {
		S(), m = setInterval(b, Fe);
	}
	function S() {
		m !== null && (clearInterval(m), m = null);
	}
	function C(e) {
		r.value = e, n.value &&= {
			...n.value,
			currentMediaId: e.mediaId
		};
	}
	function w() {
		r.value = null;
	}
	function T(e, r, i, o) {
		let { room: s, session: c } = r;
		n.value = c, f = Date.now(), t.value = {
			...t.value ?? {},
			...s,
			currentSession: c
		}, a.value = c.activeUsers, Oe(e, (e) => {
			k(e);
		}, void 0, i, o), x();
	}
	async function E(n, r) {
		l.value = !0, c.value = null;
		let i = null;
		try {
			let e = R(n), a = Ie(), o = r.password !== void 0 && r.password.trim() !== "" ? r.password : void 0, s = o === void 0 ? void 0 : p(o), c = await e.createRoom({
				name: r.name,
				...o === void 0 ? {} : { password: o },
				memberName: a
			});
			t.value = c, i = c.id, T(c.id, await e.joinRoom(c.id, a, o), a, s);
		} catch (t) {
			if (c.value = t instanceof Error ? t.message : e("syncplay.errorCreate"), i !== null) try {
				await R(n).leaveRoom(i);
			} catch {}
			throw t;
		} finally {
			l.value = !1;
		}
	}
	async function D(t, n, r) {
		l.value = !0, c.value = null;
		try {
			let e = R(t), i = Ie(), a = r !== void 0 && r !== "" ? r : void 0, o = a === void 0 ? void 0 : p(a);
			T(n, await e.joinRoom(n, i, a), i, o);
		} catch (t) {
			throw c.value = t instanceof Error ? t.message : e("syncplay.errorJoin"), t;
		} finally {
			l.value = !1;
		}
	}
	async function O(i) {
		if (t.value) {
			l.value = !0, c.value = null;
			try {
				let n = R(i);
				try {
					await n.leaveRoom(t.value.id);
				} catch (t) {
					c.value = t instanceof Error ? t.message : e("syncplay.errorLeave");
				}
			} finally {
				S(), ke(), t.value = null, n.value = null, a.value = [], d.value = 0, r.value = null, l.value = !1;
			}
		}
	}
	function k(e) {
		if (!n.value) return;
		let t = Me(n.value, e);
		t.reanchor && (f = Date.now()), n.value = t.session;
	}
	function A(t, r, i) {
		if (n.value) {
			if (!je({
				type: r,
				position: i?.position === void 0 ? void 0 : i.position * 1e3,
				rate: i?.rate,
				issuedBy: n.value.createdBy,
				issuedAt: (/* @__PURE__ */ new Date()).toISOString()
			})) throw c.value = e("syncplay.commandNotDelivered"), new Le(r);
			if (n.value) {
				let e = Me(n.value, {
					type: r,
					position: i?.position,
					rate: i?.rate
				});
				e.reanchor && (f = Date.now()), n.value = e.session;
			}
		}
	}
	function ee(e, t, r) {
		let i = n.value;
		if (i && Pe(i, t, r?.position)) try {
			A(e, t, r);
		} catch {}
	}
	async function te(e) {
		if (n.value) try {
			let t = await R(e).getState(n.value.id);
			n.value = t, f = Date.now();
		} catch (e) {
			throw c.value = e instanceof Error ? e.message : "Failed to refresh state.", e;
		}
	}
	async function ne(e) {
		if (t.value) try {
			let n = await R(e).getMembers(t.value.id);
			a.value = n;
		} catch (e) {
			throw c.value = e instanceof Error ? e.message : "Failed to refresh members.", e;
		}
	}
	function re() {
		c.value = null;
	}
	function ie() {
		return be();
	}
	function ae(e) {
		d.value = e;
	}
	return {
		currentRoom: t,
		currentSession: n,
		members: a,
		error: c,
		isLoading: l,
		reconnectExhausted: u,
		localPlaybackPosition: d,
		pendingPlayMedia: r,
		isInRoom: h,
		isSynced: g,
		onlineMembers: _,
		syncStatus: y,
		driftAmount: v,
		createAndJoinRoom: E,
		joinRoom: D,
		leaveRoom: O,
		onRemoteStateUpdate: k,
		sendCommand: A,
		notifyTransportCommand: ee,
		refreshState: te,
		refreshMembers: ne,
		clearError: re,
		retryRealtimeConnection: ie,
		updateLocalPosition: ae,
		applyPendingPlayMedia: C,
		consumePendingPlayMedia: w
	};
});
export { v as a, de as i, le as n, ue as r, Re as t };

//# sourceMappingURL=useSyncPlayStore-D6WbhQzu.js.map