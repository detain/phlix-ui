import { t as e } from "./Modal-C7Pv2vAR.js";
import { t } from "./Button-Dfl4y6vO.js";
import { n, t as r } from "./Icon-55iG1rR7.js";
import { t as i } from "./useMessages-skYe1O45.js";
import { C as a, a as o, h as s, t as c, v as l } from "./client-BLNUsFSj.js";
import { t as u } from "./socketHint-C0yqQROO.js";
import { t as d } from "./useAuthStore-W5z8oEAk.js";
import { n as f } from "./useApiBase-DXTBY90j.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as S, nextTick as ee, normalizeClass as te, openBlock as C, ref as w, renderList as ne, toDisplayString as T, unref as E, vModelDynamic as D, vModelText as O, watch as re, withCtx as k, withDirectives as A, withModifiers as ie } from "vue";
import { defineStore as j } from "pinia";
// src/utils/syncplaySha256.ts
var ae = [
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
			let t = (M(h, 6) ^ M(h, 11) ^ M(h, 25)) >>> 0, a = (h & g ^ ~h & _) >>> 0, o = v + t + a + ae[e] + p[e] >>> 0, s = ((M(n, 2) ^ M(n, 13) ^ M(n, 22)) >>> 0) + ((n & r ^ n & i ^ r & i) >>> 0) >>> 0;
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
}, I = [
	F.GROUP_CREATE,
	F.GROUP_JOIN,
	F.GROUP_LEAVE,
	F.GROUP_STATE,
	F.GROUP_LIST,
	F.PLAYBACK_PLAY,
	F.PLAYBACK_PAUSE,
	F.PLAYBACK_SEEK,
	F.PLAYBACK_QUEUE,
	F.PLAYBACK_SYNC,
	F.CHAT,
	F.TYPING,
	F.HOST_TRANSFER,
	F.HOST_ELECT,
	F.TIME_PING,
	F.TIME_PONG,
	F.TIME_SYNC,
	F.ERROR,
	F.INFO
];
function L(e) {
	return I.includes(e);
}
function R(e) {
	"@babel/helpers - typeof";
	return R = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, R(e);
}
function se(e, t) {
	if (R(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (R(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function z(e) {
	var t = se(e, "string");
	return R(t) == "symbol" ? t : t + "";
}
function B(e, t, n) {
	return (t = z(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function V(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function H(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? V(Object(n), !0).forEach(function(t) {
			B(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : V(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ce(e, t, n) {
	return H(H({}, t), {}, {
		type: e,
		protocol_version: 1,
		timestamp: n()
	});
}
function le(e) {
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
		return H(H({}, r), e);
	})() : n;
	return L(n.type), i;
}
function U(e) {
	return JSON.stringify(e);
}
var ue = .1, de = .99, fe = 1.01, pe = class {
	constructor(e) {
		B(this, "samples", []), B(this, "driftRate", 1), B(this, "now", void 0), B(this, "samplesVersion", 0), B(this, "cacheVersion", -1), B(this, "cachedOffset", 0), B(this, "cachedLatency", 0), B(this, "cachedIsStable", !1), this.now = e;
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
		this.driftRate = 1 + ue * i / 1e3, this.driftRate = Math.min(fe, Math.max(de, this.driftRate));
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
}, me = 250, he = class e {
	constructor(t) {
		B(this, "send", void 0), B(this, "now", void 0), B(this, "memberId", void 0), B(this, "memberName", void 0), B(this, "options", void 0), B(this, "timeSync", void 0), B(this, "seekThrottleMs", void 0), B(this, "seekWindowOpen", !1), B(this, "pendingSeek", null), B(this, "seekFlushTimer", null), B(this, "group", null), B(this, "lastPingSendTime", null), B(this, "consecutiveSyncRejections", 0), this.options = t, this.send = t.send, this.now = t.now, this.memberId = t.memberId, this.memberName = t.memberName ?? "User", this.timeSync = new pe(t.now), this.seekThrottleMs = e.parseSeekThrottleMs(t.seekThrottleMs);
	}
	static parseSeekThrottleMs(e) {
		if (e === void 0) return me;
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
		return this.group !== null && (this.cancelSeekCoalescing(), this.dispatch(F.GROUP_LEAVE, {
			group_id: this.group.group_id,
			member_id: this.memberId
		}), this.group = null, !0);
	}
	sendPlay(e) {
		return this.group !== null && (this.dispatch(F.PLAYBACK_PLAY, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		}), !0);
	}
	sendPause(e) {
		return this.group !== null && (this.dispatch(F.PLAYBACK_PAUSE, {
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
		}, !0) : (this.dispatchSeek(e, t), this.seekThrottleMs > 0 && this.openSeekWindow(), !0);
	}
	dispatchSeek(e, t) {
		this.group !== null && this.dispatch(F.PLAYBACK_SEEK, {
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
		e !== null && (this.pendingSeek = null, this.group !== null && (this.dispatchSeek(e.from, e.to), this.openSeekWindow()));
	}
	cancelSeekCoalescing() {
		this.pendingSeek = null, this.seekFlushTimer !== null && (clearTimeout(this.seekFlushTimer), this.seekFlushTimer = null), this.seekWindowOpen = !1;
	}
	reportPosition(e, t) {
		return this.group !== null && (this.dispatch(F.PLAYBACK_SYNC, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			is_playing: t,
			server_time: this.getSynchronizedTime()
		}), !0);
	}
	sendChat(e) {
		return this.group !== null && (this.dispatch(F.CHAT, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			message: e
		}), !0);
	}
	sendTyping(e) {
		return this.group !== null && (this.dispatch(F.TYPING, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			is_typing: e
		}), !0);
	}
	pingTime() {
		let e = this.now(), t = this.lastPingSendTime;
		if (t !== null) {
			let n = e - t;
			if (n >= 0 && n <= 1e3) return;
		}
		this.lastPingSendTime = e, this.dispatch(F.TIME_PING, { client_time: e });
	}
	onDisconnect() {
		var e, t;
		this.cancelSeekCoalescing(), this.timeSync.reset(), this.group = null, this.lastPingSendTime = null, (e = (t = this.options).onDisconnect) == null || e.call(t);
	}
	destroy() {
		this.cancelSeekCoalescing(), this.timeSync.reset(), this.group = null, this.lastPingSendTime = null;
	}
	handleIncoming(e) {
		let t = le(e);
		if (t === null) {
			var n, r;
			(n = (r = this.options).onFrameDropped) == null || n.call(r, "undecodable", e);
			return;
		}
		if (!L(t.type)) {
			var i, a;
			(i = (a = this.options).onUnknownFrame) == null || i.call(a, t);
			return;
		}
		let o = t;
		switch (o.type) {
			case F.TIME_PONG:
				this.handleTimePong(o);
				break;
			case F.GROUP_STATE:
				this.handleGroupState(o);
				break;
			case F.PLAYBACK_PLAY:
				this.handlePlayback("play", o);
				break;
			case F.PLAYBACK_PAUSE:
				this.handlePlayback("pause", o);
				break;
			case F.PLAYBACK_SEEK:
				this.handleSeek(o);
				break;
			case F.HOST_ELECT:
				this.handleHostElect(o);
				break;
			case F.INFO:
				this.handleInfo(o);
				break;
			case F.ERROR:
				this.handleError(o);
				break;
			case F.TYPING:
				this.handleTyping(o);
				break;
			case F.HOST_TRANSFER:
				this.handleHostTransfer(o);
				break;
			case F.PLAYBACK_SYNC:
				this.handlePlaybackSync(o);
				break;
			case F.TIME_SYNC:
				this.handleTimeSync(o);
				break;
			case F.GROUP_LIST:
				this.handleGroupList(o);
				break;
			case F.CHAT:
				this.handleChat(o);
				break;
			case F.PLAYBACK_QUEUE:
				this.handlePlaybackQueueBroadcast(o);
				break;
			default:
				var s, c;
				(s = (c = this.options).onUnknownFrame) == null || s.call(c, o);
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
		if (o !== null) {
			if (this.timeSync.addSample(a, o, o, i)) {
				var s, c;
				this.consecutiveSyncRejections = 0, (s = (c = this.options).onSync) == null || s.call(c, {
					offset: this.timeSync.getOffset(),
					latency: this.timeSync.getLatency(),
					isStable: this.timeSync.isStable()
				});
			} else {
				var l, u;
				this.consecutiveSyncRejections += 1, (l = (u = this.options).onSyncDegraded) == null || l.call(u, this.consecutiveSyncRejections);
			}
		}
	}
	static normalizeMembers(e, t) {
		let n;
		return n = Array.isArray(e) ? e.filter((e) => typeof e == "object" && !!e) : e && typeof e == "object" ? Object.entries(e).filter(([, e]) => typeof e == "object" && !!e).map(([e, t]) => H(H({}, t), {}, { id: e })) : [], n.map((e) => ({
			id: typeof e.id == "string" ? e.id : "",
			name: typeof e.name == "string" ? e.name : "",
			is_host: e.id === t,
			joined_at: typeof e.joined_at == "number" && Number.isFinite(e.joined_at) ? e.joined_at : 0
		}));
	}
	static foldHostId(e, t) {
		return H(H({}, e), {}, {
			host_id: t,
			members: e.members.map((e) => H(H({}, e), {}, { is_host: e.id === t }))
		});
	}
	static serverTimeToMs(e) {
		return e < 0xe8d4a51000 ? e * 1e3 : e;
	}
	static serverTimeOrNow(t, n) {
		return typeof t == "number" && Number.isFinite(t) && t >= 1e3 ? e.serverTimeToMs(t) : n();
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
		let c = e.strOr(a.group_id, ""), l = e.strOrNull(a.host_id);
		this.group !== null && this.group.group_id !== c && this.cancelSeekCoalescing();
		let u = this.group, d = e.normalizeMembers(a.members, l);
		if (this.group = {
			group_id: c,
			group_name: e.strOr(a.group_name, ""),
			members: d,
			member_count: e.finiteOrUndefined(a.member_count),
			host_id: l,
			current_media_id: e.strOrNull(a.current_media_id),
			current_media_duration: e.finiteOrNull(a.current_media_duration),
			playback_position: e.finiteOr(a.playback_position, 0),
			playback_state: e.playbackState(a.playback_state),
			queue: e.normalizeQueue(a.queue),
			created_at: e.finiteOrUndefined(a.created_at),
			last_activity_at: e.finiteOrUndefined(a.last_activity_at)
		}, u !== null && u.group_id === c) {
			let e = new Set(d.map((e) => e.id));
			for (let t of u.members) if (!e.has(t.id)) {
				var f, p;
				(f = (p = this.options).onMemberLeft) == null || f.call(p, {
					id: t.id,
					name: t.name
				});
			}
		}
		(n = (r = this.options).onState) == null || n.call(r, this.group, i.your_id);
	}
	handlePlayback(t, n) {
		var r, i;
		if ((typeof n.member_id == "string" ? n.member_id : void 0) === this.memberId) return;
		let a = this.positionOrDrop(n.position);
		if (a === null) {
			var o, s;
			(o = (s = this.options).onFrameDropped) == null || o.call(s, "malformed", n);
			return;
		}
		let c = e.serverTimeOrNow(n.server_time, () => this.getSynchronizedTime());
		(r = (i = this.options).onPlaybackCommand) == null || r.call(i, {
			type: t,
			position: a,
			serverTime: c
		});
	}
	handleSeek(t) {
		var n, r;
		if ((typeof t.member_id == "string" ? t.member_id : void 0) === this.memberId) return;
		let i = this.positionOrDrop(t.to_position);
		if (i === null) {
			var a, o;
			(a = (o = this.options).onFrameDropped) == null || a.call(o, "malformed", t);
			return;
		}
		let s = e.serverTimeOrNow(t.server_time, () => this.getSynchronizedTime());
		(n = (r = this.options).onPlaybackCommand) == null || n.call(r, {
			type: "seek",
			position: i,
			serverTime: s
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
				if (n = H(H({}, n), {}, { members: r }), this.group = e.foldHostId(n, a), i !== void 0) {
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
		if (typeof t.member_id == "string" && typeof t.member_name == "string") {
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
		let i = t, a = e.normalizeQueue(i.queue);
		if (a === void 0) {
			var o, s;
			(o = (s = this.options).onFrameDropped) == null || o.call(s, "malformed", t);
		} else this.group !== null && (this.group = H(H({}, this.group), {}, { queue: a })), (n = (r = this.options).onQueueChanged) == null || n.call(r, a);
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
		let i = typeof t.member_id == "string" ? t.member_id : void 0, a = this.positionOrDrop(t.position);
		if (a === null) {
			var o, s;
			(o = (s = this.options).onFrameDropped) == null || o.call(s, "malformed", t);
			return;
		}
		let c = typeof t.is_playing == "boolean" && t.is_playing, l = e.serverTimeOrNow(t.server_time, () => this.getSynchronizedTime()), u = e.normalizeNudge(t.nudge);
		(n = (r = this.options).onPlaybackSync) == null || n.call(r, i ?? "", a, c, l, u);
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
		i.some((e) => typeof e != "object" || !e);
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
		this.send(ce(e, t, this.now));
	}
};
// src/api/syncplay.ts
function W(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function ge(e) {
	return e / 1e3;
}
function G(e) {
	let t = W(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function _e(e) {
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
		lastSeen: G(e.joined_at)
	})) : [];
}
function ve(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function ye(e) {
	let t = e ?? {}, n = _e(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: W(t.member_count, K(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: G(t.created_at)
	};
}
function be(e) {
	let t = e ?? {}, n = _e(t), r = ve(t);
	return {
		id: n,
		roomId: n,
		serverId: "",
		createdBy: t.host_id ?? "",
		createdAt: G(t.created_at),
		state: r,
		currentMediaId: t.current_media_id ?? null,
		playbackPosition: ge(W(t.playback_position)),
		playbackRate: +(r === "playing"),
		serverTime: W(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: G(t.last_activity_at),
		activeUsers: K(t),
		roles: Object.fromEntries(K(t).map((e) => [e.id, e.role])),
		permissions: {}
	};
}
var xe = class {
	constructor(e) {
		a(this, "client", void 0), this.client = new c({ baseUrl: e });
	}
	async createRoom(e) {
		return ye((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t, n) {
		let r = {};
		t !== void 0 && t !== "" && (r.memberName = t), n !== void 0 && n !== "" && (r.password = n);
		let i = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, Object.keys(r).length > 0 ? r : void 0);
		return {
			room: ye(i.group),
			session: be(i.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return be((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return K((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(ye) : [];
	}
	async listPublicRooms() {
		return (await this.listGroups()).filter((e) => e.isPublic);
	}
};
function Se(e) {
	if (!(e instanceof l) || e.status !== 400) return !1;
	let t = e.body;
	return typeof t == "object" && !!t && t.error === "Invalid password";
}
var Ce = null, we = null;
function q(e) {
	return Ce && we === e || (Ce = new xe(e), we = e), Ce;
}
var J = {
	log: () => {},
	warn: () => {},
	error: () => {}
}, Te = null;
function Ee(e) {
	Te = e;
}
var Y = null, X = null, Z = 0, De = 5, Oe = 1e3, Q = null, ke = null, Ae = null, je = null, $ = null;
function Me() {
	try {
		return o().getAccessToken();
	} catch {
		return null;
	}
}
function Ne(e) {
	let t = u();
	if (t.wsUrl !== null) return `${t.wsUrl}${t.wsPath ?? ""}?room=${encodeURIComponent(e)}`;
	let n = typeof window < "u" ? window.location : null, r = n?.hostname ?? "localhost";
	return `${n?.protocol === "https:" ? "wss:" : "ws:"}//${r}:8097?room=${encodeURIComponent(e)}`;
}
function Pe() {
	let e = Me();
	return e ? ["bearer", e] : void 0;
}
function Fe(e) {
	if (Q) try {
		let t = JSON.parse(e.data);
		Q.handleIncoming(t);
	} catch {}
}
function Ie(e) {
	if (!(e && e.target !== Y)) {
		if (Y = null, Q && Q.onDisconnect(), X && Z < De) {
			let e = Oe * 2 ** Z;
			Z++, J.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${Z})`), setTimeout(() => {
				X && Re(X);
			}, e);
		} else Z >= De && (J.warn("[SyncPlay] Max reconnect attempts reached, giving up"), X = null, Z = 0, Q = null);
	}
}
function Le(e, t, n, r, i) {
	Z = 0, je = i ?? null, Re(e, t, n, r);
}
function Re(e, t, n, r) {
	if (t && ($ = t), Y && X !== e) {
		let e = Y;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Y = null, X = null, Q = null;
	}
	if (Y && X === e) return;
	X = e;
	let i = n ?? ke ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? Ae ?? "Anonymous";
	ke = i, Ae = a, Q = new he({
		send: (e) => {
			Y && Y.readyState === WebSocket.OPEN && Y.send(U(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			$ && $({
				type: e.type,
				position: ge(e.position),
				roomId: X ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			$ && $({
				type: n ? "play" : "pause",
				position: ge(t),
				roomId: X ?? void 0
			});
		},
		onDisconnect: () => {},
		onError: (e, t) => {
			J.error(`[SyncPlay] Error: ${e} - ${t}`), Te?.(e, t);
		},
		onInfo: (e) => {
			J.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = Ne(e);
	J.log(`[SyncPlay] Opening WebSocket to ${o}`);
	let s;
	try {
		s = new WebSocket(o, Pe());
	} catch (e) {
		J.error("[SyncPlay] WebSocket constructor refused the handshake", e), Ie();
		return;
	}
	Y = s, s.onopen = () => {
		J.log("[SyncPlay] WebSocket connected"), Z = 0, Q && X && Q.joinGroup(X, je ?? void 0);
	}, s.onmessage = Fe, s.onclose = Ie, s.onerror = (e) => {
		J.error("[SyncPlay] WebSocket error", e);
	};
}
function ze() {
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
	X = null, Z = 0, je = null;
}
function Be(e) {
	Q && Y && Y.readyState === WebSocket.OPEN && Q.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function Ve(e) {
	if (!Q || !Y || Y.readyState !== WebSocket.OPEN) return !1;
	switch (e.type) {
		case "play": return Q.sendPlay(e.position ?? 0), !0;
		case "pause": return Q.sendPause(e.position ?? 0), !0;
		case "seek": return e.position !== void 0 && (Q.sendSeek(0, e.position), !0);
		case "sync": return e.position !== void 0 && (Q.reportPosition(e.position, !0), !0);
	}
}
var He = 5e3;
function Ue() {
	let e = d().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var We = class extends Error {
	constructor(e) {
		super(`SyncPlay '${e}' command was not delivered to the group`), a(this, "commandType", void 0), this.commandType = e, this.name = "SyncPlayCommandNotDeliveredError";
	}
}, Ge = j("phlix-syncplay", () => {
	let { t: e } = i(), t = w(null), n = w(null), r = w(null), a = w([]), o = w(null), s = w(!1), c = w(0), l = 0, u = null, d = m(() => n.value !== null), f = m(() => n.value ? n.value.state === "playing" || n.value.state === "paused" : !1), p = m(() => a.value.filter((e) => e.isOnline)), h = m(() => {
		let e = n.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let t = (Date.now() - l) / 1e3, r = e.playbackPosition + t * e.playbackRate;
		return c.value - r;
	}), g = m(() => n.value ? n.value.state === "waiting" ? "re-syncing" : Math.abs(h.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	function _() {
		let e = n.value;
		e ? e.state === "playing" && Be({
			sessionId: e.id,
			playbackPosition: c.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}) : y();
	}
	function v() {
		y(), u = setInterval(_, He);
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
		}, a.value = c.activeUsers, Le(e, (e) => {
			ne(e);
		}, void 0, i, o), v();
	}
	async function ee(n, r) {
		s.value = !0, o.value = null;
		try {
			let e = q(n), i = Ue(), a = r.password !== void 0 && r.password.trim() !== "" ? r.password : void 0, o = a === void 0 ? void 0 : P(a), s = await e.createRoom({
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
	async function te(t, n, r) {
		s.value = !0, o.value = null;
		try {
			let e = q(t), i = Ue(), a = r !== void 0 && r !== "" ? r : void 0, o = a === void 0 ? void 0 : P(a);
			S(n, await e.joinRoom(n, i, a), i, o);
		} catch (t) {
			throw o.value = t instanceof Error ? t.message : e("syncplay.errorJoin"), t;
		} finally {
			s.value = !1;
		}
	}
	async function C(r) {
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
				y(), ze(), t.value = null, n.value = null, a.value = [], s.value = !1;
			}
		}
	}
	function ne(e) {
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
	function T(t, r, i) {
		if (n.value && !Ve({
			type: r,
			position: i?.position === void 0 ? void 0 : i.position * 1e3,
			rate: i?.rate,
			issuedBy: n.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		})) throw o.value = e("syncplay.commandNotDelivered"), new We(r);
	}
	async function E(e) {
		if (n.value) try {
			let t = await q(e).getState(n.value.id);
			n.value = t, l = Date.now();
		} catch (e) {
			throw o.value = e instanceof Error ? e.message : "Failed to refresh state.", e;
		}
	}
	async function D(e) {
		if (t.value) try {
			let n = await q(e).getMembers(t.value.id);
			a.value = n;
		} catch (e) {
			throw o.value = e instanceof Error ? e.message : "Failed to refresh members.", e;
		}
	}
	function O() {
		o.value = null;
	}
	function re(e) {
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
		joinRoom: te,
		leaveRoom: C,
		onRemoteStateUpdate: ne,
		sendCommand: T,
		refreshState: E,
		refreshMembers: D,
		clearError: O,
		updateLocalPosition: re,
		applyPendingPlayMedia: b,
		consumePendingPlayMedia: x
	};
}), Ke = ["aria-label"], qe = ["aria-checked", "tabindex"], Je = ["aria-checked", "tabindex"], Ye = {
	key: 0,
	class: "syncplay-modal__fields"
}, Xe = { class: "syncplay-modal__field" }, Ze = {
	class: "syncplay-modal__label",
	for: "room-name"
}, Qe = ["placeholder"], $e = { class: "syncplay-modal__field" }, et = {
	class: "syncplay-modal__label",
	for: "room-password"
}, tt = { class: "syncplay-modal__pw-wrap" }, nt = ["type"], rt = ["aria-label", "aria-pressed"], it = {
	id: "room-password-optional",
	class: "syncplay-modal__hint"
}, at = {
	key: 1,
	class: "syncplay-modal__fields"
}, ot = { class: "syncplay-modal__field" }, st = {
	class: "syncplay-modal__label",
	for: "room-id"
}, ct = ["placeholder"], lt = { class: "syncplay-modal__field" }, ut = {
	class: "syncplay-modal__label",
	for: "room-password"
}, dt = { class: "syncplay-modal__pw-wrap" }, ft = [
	"type",
	"required",
	"aria-describedby"
], pt = ["aria-label", "aria-pressed"], mt = {
	key: 0,
	id: "room-password-hint",
	class: "syncplay-modal__hint"
}, ht = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, gt = {
	key: 3,
	class: "syncplay-modal__rooms"
}, _t = { class: "syncplay-modal__rooms-title" }, vt = { class: "syncplay-modal__rooms-list" }, yt = ["onClick"], bt = { class: "syncplay-modal__room-name" }, xt = { class: "syncplay-modal__room-count" }, St = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, Ct = /*#__PURE__*/ n(/* @__PURE__ */ x({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(n, { emit: a }) {
		let o = n, c = a, { t: l } = i(), u = Ge(), d = f(), x = m(() => o.apiBase ?? d.value), j = w("create"), ae = w(null), M = w(null);
		function oe(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), j.value = "create", ae.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), j.value = "join", M.value?.focus();
			}
		}
		let N = w(""), P = w(""), F = w(""), I = w(!1), L = w(!1), R = w(null), se = S("phlixConfig", null), z = w(!1), B = w(null), V = w([]), H = w(!1), ce = m(() => N.value.trim().length > 0), le = m(() => P.value.trim().length > 0 && (!L.value || F.value !== "")), U = m(() => (j.value === "create" ? ce.value : le.value) && !z.value);
		re(() => o.modelValue, async (e) => {
			e && (B.value = null, N.value = "", F.value = "", I.value = !1, L.value = !1, o.prefilledRoomId ? (P.value = o.prefilledRoomId, j.value = "join") : (P.value = "", j.value = "create"), await ue());
		});
		async function ue() {
			H.value = !0;
			try {
				let e = new xe(x.value);
				V.value = await e.listGroups();
			} catch {
				V.value = [];
			} finally {
				H.value = !1;
			}
		}
		async function de() {
			if (U.value) {
				z.value = !0, B.value = null;
				try {
					j.value === "create" ? await u.createAndJoinRoom(x.value, {
						name: N.value.trim(),
						password: F.value
					}) : await u.joinRoom(x.value, P.value.trim(), F.value), u.currentRoom && c("joined", u.currentRoom), c("update:modelValue", !1);
				} catch (e) {
					j.value === "join" && Se(e) ? (L.value = !0, B.value = s("syncplay.invalid_password", se?.locale, null), ee(() => R.value?.focus())) : B.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					z.value = !1;
				}
			}
		}
		function fe(e) {
			j.value = "join", P.value = e.id, N.value = e.name, L.value = !e.isPublic;
		}
		function pe() {
			c("update:modelValue", !1);
		}
		return (i, a) => (C(), h(e, {
			"model-value": n.modelValue,
			title: E(l)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": a[8] ||= (e) => c("update:modelValue", e),
			onClose: pe
		}, {
			footer: k(() => [b(t, {
				variant: "ghost",
				type: "button",
				onClick: pe
			}, {
				default: k(() => [y(T(E(l)("common.close")), 1)]),
				_: 1
			}), b(t, {
				variant: "solid",
				type: "button",
				loading: z.value,
				disabled: !U.value,
				onClick: de
			}, {
				default: k(() => [y(T(j.value === "create" ? E(l)("syncplay.createRoom") : E(l)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: k(() => [v("form", {
				class: "syncplay-modal",
				onSubmit: ie(de, ["prevent"])
			}, [
				v("div", {
					class: "syncplay-modal__tabs",
					role: "radiogroup",
					"aria-label": E(l)("syncplay.modeSelect"),
					onKeydown: oe
				}, [v("button", {
					ref_key: "createOptionEl",
					ref: ae,
					type: "button",
					role: "radio",
					class: te(["syncplay-modal__tab", { "is-active": j.value === "create" }]),
					"aria-checked": j.value === "create",
					tabindex: j.value === "create" ? 0 : -1,
					onClick: a[0] ||= (e) => j.value = "create"
				}, T(E(l)("syncplay.createRoom")), 11, qe), v("button", {
					ref_key: "joinOptionEl",
					ref: M,
					type: "button",
					role: "radio",
					class: te(["syncplay-modal__tab", { "is-active": j.value === "join" }]),
					"aria-checked": j.value === "join",
					tabindex: j.value === "join" ? 0 : -1,
					onClick: a[1] ||= (e) => j.value = "join"
				}, T(E(l)("syncplay.joinRoom")), 11, Je)], 40, Ke),
				j.value === "create" ? (C(), _("div", Ye, [v("div", Xe, [v("label", Ze, T(E(l)("syncplay.roomName")), 1), A(v("input", {
					id: "room-name",
					"onUpdate:modelValue": a[2] ||= (e) => N.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: E(l)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, Qe), [[O, N.value]])]), v("div", $e, [
					v("label", et, T(E(l)("syncplay.roomPassword")), 1),
					v("div", tt, [A(v("input", {
						id: "room-password",
						"onUpdate:modelValue": a[3] ||= (e) => F.value = e,
						type: I.value ? "text" : "password",
						class: "syncplay-modal__input",
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": "room-password-optional"
					}, null, 8, nt), [[D, F.value]]), v("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": I.value ? E(l)("auth.hidePassword") : E(l)("auth.showPassword"),
						"aria-pressed": I.value,
						onClick: a[4] ||= (e) => I.value = !I.value
					}, [b(r, { name: I.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, rt)]),
					v("p", it, T(E(l)("syncplay.passwordOptional")), 1)
				])])) : (C(), _("div", at, [v("div", ot, [v("label", st, T(E(l)("syncplay.roomId")), 1), A(v("input", {
					id: "room-id",
					"onUpdate:modelValue": a[5] ||= (e) => P.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: E(l)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, ct), [[O, P.value]])]), v("div", lt, [
					v("label", ut, T(E(l)("syncplay.roomPassword")), 1),
					v("div", dt, [A(v("input", {
						id: "room-password",
						ref_key: "passwordInputEl",
						ref: R,
						"onUpdate:modelValue": a[6] ||= (e) => F.value = e,
						type: I.value ? "text" : "password",
						class: "syncplay-modal__input",
						required: L.value,
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": L.value ? "room-password-hint" : void 0
					}, null, 8, ft), [[D, F.value]]), v("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": I.value ? E(l)("auth.hidePassword") : E(l)("auth.showPassword"),
						"aria-pressed": I.value,
						onClick: a[7] ||= (e) => I.value = !I.value
					}, [b(r, { name: I.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, pt)]),
					L.value ? (C(), _("p", mt, T(E(l)("syncplay.lockedRoomHint")), 1)) : g("", !0)
				])])),
				B.value ? (C(), _("p", ht, T(B.value), 1)) : g("", !0),
				j.value === "join" && V.value.length > 0 ? (C(), _("div", gt, [v("h3", _t, T(E(l)("syncplay.availableRooms")), 1), v("ul", vt, [(C(!0), _(p, null, ne(V.value, (e) => (C(), _("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [v("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => fe(e)
				}, [
					b(r, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					v("span", bt, T(e.name), 1),
					e.isPublic ? g("", !0) : (C(), h(r, {
						key: 0,
						name: "lock",
						label: E(l)("syncplay.lockedRoom"),
						class: "syncplay-modal__room-lock"
					}, null, 8, ["label"])),
					v("span", xt, T(E(l)("syncplay.members", { count: e.memberCount })), 1)
				], 8, yt)]))), 128))])])) : g("", !0),
				H.value ? (C(), _("div", St, [b(r, { name: "spinner" }), v("span", null, T(E(l)("common.loading")), 1)])) : g("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-3772af96"]]);
export { Ge as n, Ee as r, Ct as t };

//# sourceMappingURL=SyncPlayModal-oO3fd1AY.js.map