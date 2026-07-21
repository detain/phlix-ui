import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D80As4Gx.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./NetworkHealthIndicator-VqJElfj8.js";
import { t as o } from "./Button-DWa6Ld_Z.js";
import { t as s } from "./Badge-B6MgOwKQ.js";
import { t as c } from "./Select-CymWKJLs.js";
import { t as l } from "./Skeleton-DhQmxeNg.js";
import { t as u } from "./EmptyState-ZlI5t4KT.js";
import { t as d } from "./PageHint-BoAlFFBN.js";
import { a as f, c as p, i as m, l as h, n as g, o as _, r as v, s as y, t as b } from "./core.esm-CG6mUIn9.js";
import { t as x } from "./helpLinks-BI4oN4Or.js";
import { Fragment as S, computed as C, createBlock as w, createCommentVNode as T, createElementBlock as E, createElementVNode as D, createTextVNode as O, createVNode as k, defineAsyncComponent as ee, defineComponent as A, inject as j, normalizeClass as M, normalizeStyle as te, onBeforeUnmount as N, onMounted as ne, openBlock as P, ref as F, renderList as re, toDisplayString as I, unref as L, withCtx as R } from "vue";
//#region src/api/admin/metrics.ts
function z(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function B(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function V(e) {
	return Array.isArray(e) ? e : [];
}
function ie(e) {
	return {
		bytes_in_per_sec: B(e.bytes_in_per_sec),
		bytes_out_per_sec: B(e.bytes_out_per_sec),
		active_connections: B(e.active_connections),
		requests_per_sec: B(e.requests_per_sec),
		error_rate: B(e.error_rate),
		p50_ms: B(e.p50_ms),
		p95_ms: B(e.p95_ms),
		p99_ms: B(e.p99_ms)
	};
}
function H(e) {
	return {
		bucket: z(e.bucket),
		bytes_in: B(e.bytes_in),
		bytes_out: B(e.bytes_out),
		requests: B(e.requests),
		errors: B(e.errors),
		p50_ms: B(e.p50_ms),
		p95_ms: B(e.p95_ms)
	};
}
function ae(e) {
	return {
		id: z(e.connection_id),
		kind: z(e.kind, "http"),
		remote_ip: z(e.remote_ip),
		user_id: e.user_id == null ? null : z(e.user_id),
		bytes_in_rate: B(e.bytes_in_rate),
		bytes_out_rate: B(e.bytes_out_rate),
		opened_at: z(e.opened_at)
	};
}
function oe(e) {
	return {
		method: z(e.method),
		route: z(e.route),
		request_count: B(e.request_count),
		error_count: B(e.error_count),
		avg_ms: B(e.avg_ms),
		max_ms: B(e.max_ms)
	};
}
var se = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getSnapshot(e = 60) {
		let { data: t } = await this.client.get("/api/v1/admin/metrics/snapshot", { window: String(e) });
		return ie(t ?? {});
	}
	async getHistory(e = 60, t = 60) {
		let { data: n } = await this.client.get("/api/v1/admin/metrics/history", {
			minutes: String(e),
			resolution: String(t)
		});
		return V(n).map(H);
	}
	async getConnections(e = 15) {
		let { data: t } = await this.client.get("/api/v1/admin/metrics/connections", { ttl: String(e) });
		return V(t).map(ae);
	}
	async getRoutes(e = 15, t = 20) {
		let { data: n } = await this.client.get("/api/v1/admin/metrics/routes", {
			minutes: String(e),
			limit: String(t)
		});
		return V(n).map(oe);
	}
};
//#endregion
//#region src/api/admin/servers.ts
function U(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function W(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function G(e, t = !1) {
	return e === !0 || e === 1 || e === "1" || e === "true" || t;
}
function K(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ce(e) {
	return {
		id: U(e.id ?? e.serverId),
		name: U(e.name ?? e.serverName),
		hostname: U(e.hostname),
		version: U(e.version),
		online: G(e.online, !0),
		lastSeenAt: W(e.lastSeenAt ?? e.last_seen_at, 0) || null,
		activeSessionCount: W(e.activeSessionCount ?? e.active_session_count),
		uptimeSeconds: W(e.uptimeSeconds ?? e.uptime_seconds),
		libraryCount: W(e.libraryCount ?? e.library_count),
		totalItemCount: W(e.totalItemCount ?? e.total_item_count),
		totalStorageBytes: W(e.totalStorageBytes ?? e.total_storage_bytes)
	};
}
function le(e) {
	let t = (Array.isArray(e.hostnameCandidates) ? e.hostnameCandidates : [])[0];
	return {
		id: U(e.id ?? e.serverId),
		name: U(e.name ?? e.serverName),
		hostname: U(e.hostname) || t || "",
		online: G(e.online, !0),
		lastSeenAt: W(e.lastSeenAt ?? e.last_seen_at, 0) || null,
		url: t
	};
}
var ue = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async listServers() {
		let { data: e } = await this.client.get("/api/v1/servers");
		return Array.isArray(e) ? e.map(le) : [];
	}
	async getServerInfo(e) {
		let { data: t } = await this.client.get(`/api/v1/servers/${encodeURIComponent(e)}`);
		return ce(K(t) ? t : {});
	}
}, de = {
	key: 0,
	class: "server-info__skel"
}, fe = { class: "server-info__header" }, q = { class: "server-info__identity" }, pe = { class: "server-info__hostname" }, me = { class: "server-info__stats" }, J = { class: "server-info__stat" }, he = { class: "server-info__stat-value" }, ge = { class: "server-info__stat-num" }, _e = { class: "server-info__stat" }, ve = { class: "server-info__stat-value" }, ye = { class: "server-info__stat-num" }, Y = { class: "server-info__stat" }, be = { class: "server-info__stat-value" }, xe = { class: "server-info__stat-num" }, Se = { class: "server-info__stat" }, Ce = { class: "server-info__stat-value" }, we = { class: "server-info__stat-num" }, X = { class: "server-info__stat" }, Te = { class: "server-info__stat-value" }, Ee = { class: "server-info__stat-num" }, De = {
	key: 2,
	class: "server-info__empty"
}, Oe = /*#__PURE__*/ e(/* @__PURE__ */ A({
	__name: "ServerInfo",
	props: {
		serverInfo: {},
		loading: { type: Boolean }
	},
	setup(e) {
		let t = e;
		function n(e) {
			if (e === 0) return "—";
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = e % 60;
			return t > 0 ? `${t}h ${n}m` : n > 0 ? `${n}m ${r}s` : `${r}s`;
		}
		function r(e) {
			if (e === 0) return "0 B";
			let t = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), t.length - 1);
			return `${(e / 1024 ** n).toFixed(1)} ${t[n]}`;
		}
		let i = C(() => t.serverInfo?.online ? "success" : "error"), a = C(() => t.serverInfo?.online ? "Online" : "Offline");
		return (t, o) => (P(), E("div", { class: M(["server-info", { "is-loading": e.loading }]) }, [e.loading && !e.serverInfo ? (P(), E("div", de, [...o[0] ||= [
			D("div", { class: "skel-line skel-line--short" }, null, -1),
			D("div", { class: "skel-line" }, null, -1),
			D("div", { class: "skel-line skel-line--medium" }, null, -1)
		]])) : e.serverInfo ? (P(), E(S, { key: 1 }, [D("div", fe, [D("div", q, [D("h3", pe, I(e.serverInfo.hostname || e.serverInfo.name), 1), e.serverInfo.version ? (P(), w(s, {
			key: 0,
			tone: "neutral",
			mono: ""
		}, {
			default: R(() => [O(" v" + I(e.serverInfo.version), 1)]),
			_: 1
		})) : T("", !0)]), k(s, {
			tone: i.value,
			label: a.value
		}, {
			default: R(() => [o[1] ||= D("span", {
				class: "server-info__dot",
				"aria-hidden": "true"
			}, null, -1), O(" " + I(a.value), 1)]),
			_: 1
		}, 8, ["tone", "label"])]), D("dl", me, [
			D("div", J, [o[2] ||= D("dt", { class: "server-info__stat-label" }, "Active sessions", -1), D("dd", he, [D("span", ge, I(e.serverInfo.activeSessionCount.toLocaleString()), 1)])]),
			D("div", _e, [o[3] ||= D("dt", { class: "server-info__stat-label" }, "Uptime", -1), D("dd", ve, [D("span", ye, I(n(e.serverInfo.uptimeSeconds)), 1)])]),
			D("div", Y, [o[4] ||= D("dt", { class: "server-info__stat-label" }, "Libraries", -1), D("dd", be, [D("span", xe, I(e.serverInfo.libraryCount.toLocaleString()), 1)])]),
			D("div", Se, [o[5] ||= D("dt", { class: "server-info__stat-label" }, "Total items", -1), D("dd", Ce, [D("span", we, I(e.serverInfo.totalItemCount.toLocaleString()), 1)])]),
			D("div", X, [o[6] ||= D("dt", { class: "server-info__stat-label" }, "Storage used", -1), D("dd", Te, [D("span", Ee, I(r(e.serverInfo.totalStorageBytes)), 1)])])
		])], 64)) : (P(), E("p", De, "No server information available."))], 2));
	}
}), [["__scopeId", "data-v-4e386c5f"]]), ke = {
	key: 0,
	class: "server-selector__status",
	"aria-live": "polite"
}, Ae = { class: "server-selector__last-seen" }, je = {
	key: 1,
	class: "server-selector__status"
}, Me = /*#__PURE__*/ e(/* @__PURE__ */ A({
	__name: "ServerSelector",
	props: {
		servers: {},
		modelValue: {},
		loading: { type: Boolean },
		disabled: { type: Boolean }
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function i(e) {
			if (!e || !Number.isFinite(e)) return "Never";
			let t = Math.floor(Date.now() / 1e3 - e);
			if (t < 60) return `${t}s ago`;
			let n = Math.floor(t / 60);
			if (n < 60) return `${n}m ago`;
			let r = Math.floor(n / 60);
			return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`;
		}
		let a = C(() => n.servers.map((e) => {
			let t = e.hostname || e.name;
			return {
				value: e.id,
				label: t,
				title: `Last seen: ${i(e.lastSeenAt)}`
			};
		})), o = C(() => n.modelValue ?? null), s = C(() => n.servers.length > 1 ? [{
			value: "",
			label: "All servers"
		}, ...a.value] : a.value);
		function l(e) {
			let t = e === "" || e === null ? null : String(e);
			r("update:modelValue", t), r("change", t);
		}
		let u = C(() => n.servers.find((e) => e.id === n.modelValue)), d = C(() => {
			let e = u.value;
			return e ? e.online ? "success" : "error" : "neutral";
		});
		return (t, n) => (P(), E("div", { class: M(["server-selector", { "is-loading": e.loading }]) }, [k(c, {
			"model-value": o.value,
			options: s.value,
			disabled: e.disabled || e.loading,
			loading: e.loading,
			label: "Server",
			placeholder: "All servers",
			"onUpdate:modelValue": l
		}, null, 8, [
			"model-value",
			"options",
			"disabled",
			"loading"
		]), u.value ? (P(), E("div", ke, [D("span", {
			class: M(["server-selector__dot", `server-selector__dot--${d.value}`]),
			"aria-hidden": "true"
		}, null, 2), D("span", Ae, " Last seen: " + I(i(u.value.lastSeenAt)), 1)])) : e.servers.length === 0 && !e.loading ? (P(), E("div", je, [...n[0] ||= [D("span", { class: "server-selector__hint" }, "No servers available.", -1)]])) : T("", !0)], 2));
	}
}), [["__scopeId", "data-v-c02c7539"]]), Ne = Object.defineProperty, Pe = Object.defineProperties, Fe = Object.getOwnPropertyDescriptors, Z = Object.getOwnPropertySymbols, Ie = Object.prototype.hasOwnProperty, Le = Object.prototype.propertyIsEnumerable, Re = (e, t, n) => t in e ? Ne(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, ze = (e, t) => {
	for (var n in t ||= {}) Ie.call(t, n) && Re(e, n, t[n]);
	if (Z) for (var n of Z(t)) Le.call(t, n) && Re(e, n, t[n]);
	return e;
}, Be = (e, t) => Pe(e, Fe(t)), Ve = g, Q = f, He = m, Ue = v, We = _, Ge = y, Ke = p, qe = h, Je = class {
	constructor(e) {
		this.w = e.w, this.lineCtx = e;
	}
	sameValueSeriesFix(e, t) {
		let n = this.w;
		if ((n.config.fill.type === "gradient" || n.config.fill.type[e] === "gradient") && new Ve(this.lineCtx.w).seriesHaveSameValues(e)) {
			let n = t[e].slice();
			n[n.length - 1] = n[n.length - 1] + 1e-6, t[e] = n;
		}
		return t;
	}
	calculatePoints({ series: e, realIndex: t, x: n, y: r, i, j: a, prevY: o }) {
		let s = this.w, c = [], l = [], u = this.lineCtx.categoryAxisCorrection + s.config.markers.offsetX;
		return s.axisFlags.isXNumeric && (u = (s.seriesData.seriesX[t][0] - s.globals.minX) / this.lineCtx.xRatio + s.config.markers.offsetX), a === 0 && (c.push(u), l.push(qe.isNumber(e[i][0]) ? o + s.config.markers.offsetY : null)), c.push(n + s.config.markers.offsetX), l.push(qe.isNumber(e[i][a + 1]) ? r + s.config.markers.offsetY : null), {
			x: c,
			y: l
		};
	}
	checkPreviousPaths({ pathFromLine: e, pathFromArea: t, realIndex: n }) {
		let r = this.w;
		for (let i = 0; i < r.globals.previousPaths.length; i++) {
			let a = r.globals.previousPaths[i];
			(a.type === "line" || a.type === "area") && a.paths.length > 0 && parseInt(a.realIndex, 10) === parseInt(n, 10) && (a.type === "line" ? (this.lineCtx.appendPathFrom = !1, e = r.globals.previousPaths[i].paths[0].d) : a.type === "area" && (this.lineCtx.appendPathFrom = !1, t = r.globals.previousPaths[i].paths[0].d, r.config.stroke.show && r.globals.previousPaths[i].paths[1] && (e = r.globals.previousPaths[i].paths[1].d)));
		}
		return {
			pathFromLine: e,
			pathFromArea: t
		};
	}
	determineFirstPrevY({ i: e, realIndex: t, series: n, prevY: r, lineYPosition: i, translationsIndex: a }) {
		let o = this.w, s = o.config.chart.stacked && !o.globals.comboCharts || o.config.chart.stacked && o.globals.comboCharts && (!this.w.config.chart.stackOnlyBar || this.w.config.series[t]?.type === "bar" || this.w.config.series[t]?.type === "column");
		if (n[e]?.[0] !== void 0) i = s && e > 0 ? this.lineCtx.prevSeriesY[e - 1][0] : this.lineCtx.zeroY, r = i - n[e][0] / this.lineCtx.yRatio[a] + (this.lineCtx.isReversed ? n[e][0] / this.lineCtx.yRatio[a] : 0) * 2;
		else if (s && e > 0 && n[e][0] === void 0) {
			for (let t = e - 1; t >= 0; t--) if (n[t][0] !== null && n[t][0] !== void 0) {
				i = this.lineCtx.prevSeriesY[t][0], r = i;
				break;
			}
		}
		return {
			prevY: r,
			lineYPosition: i
		};
	}
};
function Ye(e) {
	let t = (e ^ 2654435769) >>> 0;
	return t = Math.imul(t ^ t >>> 16, 73244475), t = Math.imul(t ^ t >>> 16, 73244475), ((t ^ t >>> 16) >>> 0) / 4294967296;
}
var Xe = (e) => {
	let t = et(e), n = e.length - 1, r = [], i, a, o, s;
	for (let r = 0; r < n; r++) o = $e(e[r], e[r + 1]), Math.abs(o) < 1e-6 ? t[r] = t[r + 1] = 0 : (i = t[r] / o, a = t[r + 1] / o, s = i * i + a * a, s > 9 && (s = o * 3 / Math.sqrt(s), t[r] = s * i, t[r + 1] = s * a));
	for (let i = 0; i <= n; i++) s = (e[Math.min(n, i + 1)][0] - e[Math.max(0, i - 1)][0]) / (6 * (1 + t[i] * t[i])), r.push([s || 0, t[i] * s || 0]);
	return r;
}, Ze = (e) => {
	let t = "";
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = r.length;
		i > 4 ? (t += `C${r[0]}, ${r[1]}`, t += `, ${r[2]}, ${r[3]}`, t += `, ${r[4]}, ${r[5]}`) : i > 2 && (t += `S${r[0]}, ${r[1]}`, t += `, ${r[2]}, ${r[3]}`);
	}
	return t;
}, Qe = {
	points(e) {
		let t = Xe(e), n = e[1], r = e[0], i = [], a = t[1], o = t[0];
		i.push(r, [
			r[0] + o[0],
			r[1] + o[1],
			n[0] - a[0],
			n[1] - a[1],
			n[0],
			n[1]
		]);
		for (let n = 2, r = t.length; n < r; n++) {
			let r = e[n], a = t[n];
			i.push([
				r[0] - a[0],
				r[1] - a[1],
				r[0],
				r[1]
			]);
		}
		return i;
	},
	slice(e, t, n) {
		let r = e.slice(t, n);
		if (t) {
			if (n - t > 1 && r[1].length < 6) {
				let e = r[0].length;
				r[1] = [r[0][e - 2] * 2 - r[0][e - 4], r[0][e - 1] * 2 - r[0][e - 3]].concat(r[1]);
			}
			r[0] = r[0].slice(-2);
		}
		return r;
	}
};
function $e(e, t) {
	return (t[1] - e[1]) / (t[0] - e[0]);
}
function et(e) {
	let t = [], n = e[0], r = e[1], i = t[0] = $e(n, r), a = 1;
	for (let o = e.length - 1; a < o; a++) n = r, r = e[a + 1], t[a] = (i + (i = $e(n, r))) * .5;
	return t[a] = i, t;
}
var $ = class {
	constructor(e, t, n, r) {
		this.ctx = t, this.w = e, this.xyRatios = n, this.xRatio = 0, this.yRatio = [], this.zRatio = 0, this.baseLineY = [], this.pointsChart = !(this.w.config.chart.type !== "bubble" && this.w.config.chart.type !== "scatter") || r, this.scatter = new Ge(this.w, this.ctx), this.noNegatives = this.w.globals.minX === Number.MAX_VALUE, this.lineHelpers = new Je(this), this.markers = new We(this.w, this.ctx), this.prevSeriesY = [], this.categoryAxisCorrection = 0, this.yaxisIndex = 0, this.xDivision = 0, this.zeroY = 0, this.areaBottomY = 0, this.strokeWidth = 0, this.isReversed = !1, this.appendPathFrom = !1, this.elSeries = null, this.elPointsMain = null, this.elDataLabelsWrap = null;
	}
	draw(e, t, n, r) {
		let i = this.w, a = new Q(this.w), o = i.globals.comboCharts ? t : i.config.chart.type, s = a.group({ class: `apexcharts-${o}-series apexcharts-plot-series` }), c = new Ve(this.w);
		this.yRatio = this.xyRatios.yRatio, this.zRatio = this.xyRatios.zRatio, this.xRatio = this.xyRatios.xRatio, this.baseLineY = this.xyRatios.baseLineY, e = c.getLogSeries(e), this.yRatio = c.getLogYRatios(this.yRatio), this.prevSeriesY = [];
		let l = [];
		for (let t = 0; t < e.length; t++) {
			e = this.lineHelpers.sameValueSeriesFix(t, e);
			let a = i.globals.comboCharts ? n[t] : t, s = this.yRatio.length > 1 ? a : 0;
			this._initSerieVariables(e, t, a);
			let c = [], u = [], d = [], f = i.globals.padHorizontal + this.categoryAxisCorrection, p = [], m = [];
			Ke.addCollapsedClassToSeries(this.w, this.elSeries, a), i.axisFlags.isXNumeric && i.seriesData.seriesX.length > 0 && (f = (i.seriesData.seriesX[a][0] - i.globals.minX) / this.xRatio), d.push(f);
			let h = f, g, _ = h, v = this.zeroY, y = this.zeroY;
			v = this.lineHelpers.determineFirstPrevY({
				i: t,
				realIndex: a,
				series: e,
				prevY: v,
				lineYPosition: 0,
				translationsIndex: s
			}).prevY, i.config.stroke.curve === "monotoneCubic" && e[t][0] === null ? c.push(null) : c.push(v);
			let b = v, x;
			o === "rangeArea" && (x = this.lineHelpers.determineFirstPrevY({
				i: t,
				realIndex: a,
				series: r,
				prevY: y,
				lineYPosition: 0,
				translationsIndex: s
			}), y = x.prevY, g = y, u.push(c[0] === null ? null : y));
			let S = this._calculatePathsFrom({
				type: o,
				series: e,
				i: t,
				realIndex: a,
				translationsIndex: s,
				prevX: _,
				prevY: v,
				prevY2: y
			}), C = [c[0]], w = [u[0]], T = {
				type: o,
				series: e,
				realIndex: a,
				translationsIndex: s,
				i: t,
				x: f,
				y: 1,
				pX: h,
				pY: b,
				pathsFrom: S,
				linePaths: p,
				areaPaths: m,
				seriesIndex: n,
				lineYPosition: 0,
				xArrj: d,
				yArrj: c,
				y2Arrj: u,
				seriesRangeEnd: r
			}, E = this._iterateOverDataPoints(Be(ze({}, T), {
				iterations: o === "rangeArea" ? e[t].length - 1 : void 0,
				isRangeStart: !0
			}));
			if (o === "rangeArea") {
				let e = this._calculatePathsFrom({
					series: r,
					i: t,
					realIndex: a,
					prevX: _,
					prevY: y
				}), n = this._iterateOverDataPoints(Be(ze({}, T), {
					series: r,
					xArrj: [f],
					yArrj: C,
					y2Arrj: w,
					pY: g,
					areaPaths: E.areaPaths,
					pathsFrom: e,
					iterations: r[t].length - 1,
					isRangeStart: !1
				})), i = E.linePaths.length / 2;
				for (let e = 0; e < i; e++) E.linePaths[e] = n.linePaths[e + i] + E.linePaths[e];
				E.linePaths.splice(i), E.pathFromLine = n.pathFromLine + E.pathFromLine;
			} else E.pathFromArea += "z";
			this._handlePaths({
				type: o,
				realIndex: a,
				i: t,
				paths: E
			}), this.elSeries.add(this.elPointsMain), this.elSeries.add(this.elDataLabelsWrap), l.push(this.elSeries);
		}
		if (i.config.series[0]?.zIndex !== void 0 && l.sort((e, t) => Number(e.node.getAttribute("zIndex")) - Number(t.node.getAttribute("zIndex"))), i.config.chart.stacked) for (let e = l.length - 1; e >= 0; e--) s.add(l[e]);
		else for (let e = 0; e < l.length; e++) s.add(l[e]);
		return s;
	}
	_initSerieVariables(e, t, n) {
		let r = this.w, i = new Q(this.w);
		this.xDivision = r.layout.gridWidth / (r.globals.dataPoints - +(r.config.xaxis.tickPlacement === "on")), this.strokeWidth = Array.isArray(r.config.stroke.width) ? r.config.stroke.width[n] : r.config.stroke.width;
		let a = 0;
		this.yRatio.length > 1 && (this.yaxisIndex = r.globals.seriesYAxisReverseMap[n], a = n), this.isReversed = r.config.yaxis[this.yaxisIndex] && r.config.yaxis[this.yaxisIndex].reversed, this.zeroY = r.layout.gridHeight - this.baseLineY[a] - (this.isReversed ? r.layout.gridHeight : 0) + (this.isReversed ? this.baseLineY[a] * 2 : 0), this.areaBottomY = this.zeroY, (this.zeroY > r.layout.gridHeight || r.config.plotOptions.area.fillTo === "end") && (this.areaBottomY = r.layout.gridHeight), this.categoryAxisCorrection = this.xDivision / 2;
		let o = r.config.series[n];
		if (this.elSeries = i.group({
			class: "apexcharts-series",
			zIndex: o.zIndex === void 0 ? n : o.zIndex,
			seriesName: qe.escapeString(r.seriesData.seriesNames[n])
		}), this.elPointsMain = i.group({
			class: "apexcharts-series-markers-wrap",
			"data:realIndex": n
		}), r.globals.hasNullValues) {
			let e = this.markers.plotChartMarkers({
				pointsPos: {
					x: [0],
					y: [r.layout.gridHeight + r.globals.markers.largestSize]
				},
				seriesIndex: t,
				j: 0,
				pSize: .1,
				alwaysDrawMarker: !0,
				isVirtualPoint: !0
			});
			e !== null && this.elPointsMain.add(e);
		}
		this.elDataLabelsWrap = i.group({
			class: "apexcharts-datalabels",
			"data:realIndex": n
		});
		let s = e[t].length === r.globals.dataPoints;
		this.elSeries.attr({
			"data:longestSeries": s,
			rel: t + 1,
			"data:realIndex": n
		}), this.appendPathFrom = !0;
	}
	_calculatePathsFrom({ type: e, series: t, i: n, realIndex: r, translationsIndex: i, prevX: a, prevY: o, prevY2: s }) {
		let c = this.w, l = new Q(this.w), u, d, f, p;
		if (t[n][0] === null) {
			for (let e = 0; e < t[n].length; e++) if (t[n][e] !== null) {
				a = this.xDivision * e, o = this.zeroY - t[n][e] / this.yRatio[i], u = l.move(a, o), d = l.move(a, this.areaBottomY);
				break;
			}
		} else u = l.move(a, o), e === "rangeArea" && (u = l.move(a, s) + l.line(a, o)), d = l.move(a, this.areaBottomY) + l.line(a, o);
		if (f = l.move(0, this.areaBottomY) + l.line(0, this.areaBottomY), p = l.move(0, this.areaBottomY) + l.line(0, this.areaBottomY), c.globals.previousPaths.length > 0) {
			let e = this.lineHelpers.checkPreviousPaths({
				pathFromLine: f,
				pathFromArea: p,
				realIndex: r
			});
			f = e.pathFromLine, p = e.pathFromArea;
		}
		return {
			prevX: a,
			prevY: o,
			linePath: u,
			areaPath: d,
			pathFromLine: f,
			pathFromArea: p
		};
	}
	_handlePaths({ type: e, realIndex: t, i: n, paths: r }) {
		let i = this.w, a = new Q(this.w), o = new He(this.w);
		this.prevSeriesY.push(r.yArrj), i.globals.seriesXvalues[t] = r.xArrj, i.globals.seriesYvalues[t] = r.yArrj;
		let s = i.config.forecastDataPoints;
		if (s.count > 0 && e !== "rangeArea") {
			let e = i.globals.seriesXvalues[t][i.globals.seriesXvalues[t].length - s.count - 1], n = a.drawRect(e, 0, i.layout.gridWidth, i.layout.gridHeight, 0);
			i.dom.elForecastMask.appendChild(n.node);
			let r = a.drawRect(0, 0, e, i.layout.gridHeight, 0);
			i.dom.elNonForecastMask.appendChild(r.node);
		}
		this.pointsChart || i.globals.delayedElements.push({
			el: this.elPointsMain.node,
			index: t
		});
		let c = {
			i: n,
			realIndex: t,
			animationDelay: n,
			initialSpeed: i.config.chart.animations.speed,
			dataChangeSpeed: i.config.chart.animations.dynamicAnimation.speed,
			className: `apexcharts-${e}`
		};
		if (e === "area") {
			let e = o.fillPath({ seriesNumber: t });
			for (let t = 0; t < r.areaPaths.length; t++) {
				let n = a.renderPaths(Be(ze({}, c), {
					pathFrom: r.pathFromArea,
					pathTo: r.areaPaths[t],
					stroke: "none",
					strokeWidth: 0,
					strokeLineCap: null,
					fill: e
				}));
				this.elSeries.add(n);
			}
		}
		if (i.config.stroke.show && !this.pointsChart) {
			let l = null;
			if (e === "line") l = o.fillPath({
				seriesNumber: t,
				i: n
			});
			else if (i.config.stroke.fill.type === "solid") l = i.globals.stroke.colors[t];
			else {
				let e = i.config.fill;
				i.config.fill = i.config.stroke.fill, l = o.fillPath({
					seriesNumber: t,
					i: n
				}), i.config.fill = e;
			}
			for (let n = 0; n < r.linePaths.length; n++) {
				let u = l;
				e === "rangeArea" && (u = o.fillPath({ seriesNumber: t }));
				let d = Be(ze({}, c), {
					pathFrom: r.pathFromLine,
					pathTo: r.linePaths[n],
					stroke: l,
					strokeWidth: this.strokeWidth,
					strokeLineCap: i.config.stroke.lineCap,
					fill: e === "rangeArea" ? u : "none"
				}), f = a.renderPaths(d);
				if (this.elSeries.add(f), f.attr("fill-rule", "evenodd"), s.count > 0 && e !== "rangeArea") {
					let e = a.renderPaths(d);
					e.node.setAttribute("stroke-dasharray", s.dashArray), s.strokeWidth && e.node.setAttribute("stroke-width", s.strokeWidth), this.elSeries.add(e), e.attr("clip-path", `url(#forecastMask${i.globals.cuid})`), f.attr("clip-path", `url(#nonForecastMask${i.globals.cuid})`);
				}
			}
		}
	}
	_iterateOverDataPoints({ type: e, series: t, iterations: n, realIndex: r, translationsIndex: i, i: a, x: o, y: s, pX: c, pY: l, pathsFrom: u, linePaths: d, areaPaths: f, seriesIndex: p, lineYPosition: m, xArrj: h, yArrj: g, y2Arrj: _, isRangeStart: v, seriesRangeEnd: y }) {
		let b = this.w, x = new Q(this.w), S = this.yRatio, { prevY: C, linePath: w, areaPath: T, pathFromLine: E, pathFromArea: D } = u, O = qe.isNumber(b.globals.minYArr[r]) ? b.globals.minYArr[r] : b.globals.minY;
		n ||= b.globals.dataPoints > 1 ? b.globals.dataPoints - 1 : b.globals.dataPoints;
		let k = (e, t) => t - e / S[i] + (this.isReversed ? e / S[i] : 0) * 2, ee = s, A = b.config.chart.stacked && !b.globals.comboCharts || b.config.chart.stacked && b.globals.comboCharts && (!this.w.config.chart.stackOnlyBar || this.w.config.series[r]?.type === "bar" || this.w.config.series[r]?.type === "column"), j = b.config.stroke.curve;
		Array.isArray(j) && (j = Array.isArray(p) ? j[p[a]] : j[a]);
		let M = 0, te, N = this.pointsChart ? this._scatterJitterPx(r) : null;
		for (let i = 0; i < n && t[a].length !== 0; i++) {
			let u = t[a][i + 1] === void 0 || t[a][i + 1] === null;
			if (b.axisFlags.isXNumeric) {
				let e = b.seriesData.seriesX[r][i + 1];
				b.seriesData.seriesX[r][i + 1] === void 0 && (e = b.seriesData.seriesX[r][n - 1]), o = (e - b.globals.minX) / this.xRatio;
			} else o += this.xDivision;
			m = A && a > 0 && b.globals.collapsedSeries.length < b.config.series.length - 1 ? this.prevSeriesY[((e) => {
				for (let t = e; t > 0; t--) if (b.globals.collapsedSeriesIndices.indexOf(p?.[t] || t) > -1) t--;
				else return t;
				return 0;
			})(a - 1)][i + 1] : this.zeroY, u ? s = k(O, m) : (s = k(t[a][i + 1], m), e === "rangeArea" && (ee = k(y[a][i + 1], m)));
			let S = o, ne = s;
			if (N) {
				let e = r * 100003 + (i + 1);
				N.x && (S = o + (Ye(e * 7919 + 13) - .5) * 2 * N.x), N.y && (ne = s + (Ye(e * 6271 + 97) - .5) * 2 * N.y);
			}
			h.push(t[a][i + 1] === null ? null : S), u && (b.config.stroke.curve === "smooth" || b.config.stroke.curve === "monotoneCubic") ? (g.push(null), _.push(null)) : (g.push(ne), _.push(ee));
			let P = this.lineHelpers.calculatePoints({
				series: t,
				x: S,
				y: ne,
				realIndex: r,
				i: a,
				j: i,
				prevY: C
			}), F = this._createPaths({
				type: e,
				series: t,
				i: a,
				j: i,
				x: o,
				y: s,
				y2: ee,
				xArrj: h,
				yArrj: g,
				y2Arrj: _,
				pX: c,
				pY: l,
				pathState: M,
				segmentStartX: te,
				linePath: w,
				areaPath: T,
				linePaths: d,
				areaPaths: f,
				curve: j,
				isRangeStart: v
			});
			f = F.areaPaths, d = F.linePaths, c = F.pX, l = F.pY, M = F.pathState, te = F.segmentStartX, T = F.areaPath, w = F.linePath, this.appendPathFrom && !b.globals.hasNullValues && !(j === "monotoneCubic" && e === "rangeArea") && (E += x.line(o, this.areaBottomY), D += x.line(o, this.areaBottomY)), this.handleNullDataPoints(t, P, a, i, r), this._handleMarkersAndLabels({
				type: e,
				pointsPos: P,
				i: a,
				j: i,
				realIndex: r,
				isRangeStart: v
			});
		}
		return {
			yArrj: g,
			xArrj: h,
			pathFromArea: D,
			areaPaths: f,
			pathFromLine: E,
			linePaths: d,
			linePath: w,
			areaPath: T
		};
	}
	_handleMarkersAndLabels({ type: e, pointsPos: t, isRangeStart: n, i: r, j: i, realIndex: a }) {
		let o = this.w, s = new Ue(this.w, this.ctx);
		if (this.pointsChart) this.scatter.draw(this.elSeries, i, {
			realIndex: a,
			pointsPos: t,
			zRatio: this.zRatio,
			elParent: this.elPointsMain
		});
		else {
			!(!o.globals.dataChanged && !o.globals.resized) && o.seriesData.series[r].length > 1 && this.elPointsMain.node.classList.add("apexcharts-element-hidden");
			let e = this.markers.plotChartMarkers({
				pointsPos: t,
				seriesIndex: a,
				j: i + 1
			});
			e !== null && this.elPointsMain.add(e);
		}
		let c = s.drawDataLabel({
			type: e,
			isRangeStart: n,
			pos: t,
			i: a,
			j: i + 1
		});
		c !== null && this.elDataLabelsWrap.add(c);
	}
	_scatterJitterPx(e) {
		let t = this.w, n = t.config.plotOptions.scatter?.jitter;
		if (!n || !n.enabled || !n.x && !n.y) return null;
		let r = t.axisFlags.isXNumeric && this.xRatio ? 1 / this.xRatio : this.xDivision, i = this.yRatio.length > 1 ? e : 0, a = this.yRatio[i] ? 1 / this.yRatio[i] : 0;
		return {
			x: (n.x || 0) * r,
			y: (n.y || 0) * a
		};
	}
	_createPaths({ type: e, series: t, i: n, j: r, x: i, y: a, xArrj: o, yArrj: s, y2: c, y2Arrj: l, pX: u, pY: d, pathState: f, segmentStartX: p, linePath: m, areaPath: h, linePaths: g, areaPaths: _, curve: v, isRangeStart: y }) {
		let b = new Q(this.w), x = this.areaBottomY, S = e === "rangeArea", C = e === "rangeArea" && y;
		switch (v) {
			case "monotoneCubic": {
				let e = y ? s : l, i = (e, t) => e.map((e, n) => [e, t[n]]).filter((e) => e[1] !== null), a = (e) => {
					let t = [], n = 0;
					return e.forEach((e) => {
						e === null ? n > 0 && (t.push(n), n = 0) : n++;
					}), n > 0 && t.push(n), t;
				}, c = (e, t) => {
					let n = a(e), r = [];
					for (let e = 0, i = 0; e < n.length; i += n[e++]) r[e] = Qe.slice(t, i, i + n[e]);
					return r;
				};
				switch (f) {
					case 0:
						if (e[r + 1] === null) break;
						f = 1;
					case 1: if (!(S ? o.length === t[n].length : r === t[n].length - 2)) break;
					case 2: {
						let t = y ? o : o.slice().reverse(), n = y ? e : e.slice().reverse(), r = i(t, n), a = r.length > 1 ? Qe.points(r) : r, s = [];
						S && (C ? _ = r : s = _.reverse());
						let l = 0, u = 0;
						if (c(n, a).forEach((e) => {
							l++;
							let t = Ze(e), n = u;
							u += e.length;
							let i = u - 1;
							C ? m = b.move(r[n][0], r[n][1]) + t : S ? m = b.move(s[n][0], s[n][1]) + b.line(r[n][0], r[n][1]) + t + b.line(s[i][0], s[i][1]) : (m = b.move(r[n][0], r[n][1]) + t, h = m + b.line(r[i][0], x) + b.line(r[n][0], x) + "z", _.push(h)), g.push(m);
						}), S && l > 1 && !C) {
							let e = g.slice(l).reverse();
							g.splice(l), e.forEach((e) => g.push(e));
						}
						f = 0;
						break;
					}
				}
				break;
			}
			case "smooth": {
				let e = (i - u) * .35;
				if (t[n][r] === null) f = 0;
				else switch (f) {
					case 0:
						if (p = u, m = C ? b.move(u, l[r]) + b.line(u, d) : b.move(u, d), h = b.move(u, d), t[n][r + 1] === null || t[n][r + 1] === void 0) {
							g.push(m), _.push(h);
							break;
						}
						if (f = 1, r < t[n].length - 2) {
							let t = b.curve(u + e, d, i - e, a, i, a);
							m += t, h += t;
							break;
						}
					case 1:
						if (t[n][r + 1] === null) C ? m += b.line(u, c) : m += b.move(u, d), h += b.line(u, x) + b.line(p, x) + "z", g.push(m), _.push(h), f = -1;
						else {
							let o = b.curve(u + e, d, i - e, a, i, a);
							m += o, h += o, r >= t[n].length - 2 && (C && (m += b.curve(i, a, i, a, i, c) + b.move(i, c)), h += b.curve(i, a, i, a, i, x) + b.line(p, x) + "z", g.push(m), _.push(h), f = -1);
						}
						break;
				}
				u = i, d = a;
				break;
			}
			default: {
				let e = (e, t, n) => {
					let r = "";
					switch (e) {
						case "stepline":
							r = b.line(t, null, "H") + b.line(null, n, "V");
							break;
						case "linestep":
							r = b.line(null, n, "V") + b.line(t, null, "H");
							break;
						case "straight":
							r = b.line(t, n);
							break;
					}
					return r;
				};
				if (t[n][r] === null) f = 0;
				else switch (f) {
					case 0:
						if (p = u, m = C ? b.move(u, l[r]) + b.line(u, d) : b.move(u, d), h = b.move(u, d), t[n][r + 1] === null || t[n][r + 1] === void 0) {
							g.push(m), _.push(h);
							break;
						}
						if (f = 1, r < t[n].length - 2) {
							let t = e(v, i, a);
							m += t, h += t;
							break;
						}
					case 1:
						if (t[n][r + 1] === null) C ? m += b.line(u, c) : m += b.move(u, d), h += b.line(u, x) + b.line(p, x) + "z", g.push(m), _.push(h), f = -1;
						else {
							let o = e(v, i, a);
							m += o, h += o, r >= t[n].length - 2 && (C && (m += b.line(i, c)), h += b.line(i, x) + b.line(p, x) + "z", g.push(m), _.push(h), f = -1);
						}
						break;
				}
				u = i, d = a;
				break;
			}
		}
		return {
			linePaths: g,
			areaPaths: _,
			pX: u,
			pY: d,
			pathState: f,
			segmentStartX: p,
			linePath: m,
			areaPath: h
		};
	}
	handleNullDataPoints(e, t, n, r, i) {
		let a = this.w;
		if (e[n][r] === null && a.config.markers.showNullDataPoints || e[n].length === 1) {
			let e = this.strokeWidth - a.config.markers.strokeWidth / 2;
			e > 0 || (e = 0);
			let n = this.markers.plotChartMarkers({
				pointsPos: t,
				seriesIndex: i,
				j: r + 1,
				pSize: e,
				alwaysDrawMarker: !0
			});
			n !== null && this.elPointsMain.add(n);
		}
	}
};
b.use({
	line: $,
	area: $,
	scatter: $,
	bubble: $,
	rangeArea: $
});
//#endregion
//#region src/pages/admin/MetricsPage.vue?vue&type=script&setup=true&lang.ts
var tt = {
	class: "metrics",
	"aria-labelledby": "metrics-heading"
}, nt = { class: "metrics__head" }, rt = { class: "metrics__title-row" }, it = {
	key: 0,
	class: "metrics__snapshot"
}, at = { class: "metrics__rate" }, ot = { class: "metrics__rate" }, st = { class: "metrics__latency" }, ct = {
	key: 0,
	class: "metrics__server-info"
}, lt = {
	key: 1,
	class: "metrics__snapshot-skel"
}, ut = { class: "metrics__grid" }, dt = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "bw-heading"
}, ft = { class: "metrics__card-head" }, pt = {
	key: 0,
	class: "metrics__skel"
}, mt = {
	class: "metrics__card",
	"aria-labelledby": "lat-heading"
}, ht = { class: "metrics__card-head" }, gt = {
	key: 0,
	class: "metrics__skel"
}, _t = {
	class: "metrics__card",
	"aria-labelledby": "req-heading"
}, vt = { class: "metrics__card-head" }, yt = {
	key: 0,
	class: "metrics__skel"
}, bt = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "conn-heading"
}, xt = { class: "metrics__card-head" }, St = {
	key: 0,
	class: "metrics__skel"
}, Ct = {
	key: 3,
	class: "metrics__table",
	"aria-label": "Live connections"
}, wt = { class: "metrics__mono" }, Tt = { class: "metrics__mono" }, Et = { class: "metrics__muted" }, Dt = { class: "metrics__bar-cell" }, Ot = { class: "metrics__bar-row" }, kt = { class: "metrics__bar-wrap" }, At = ["title"], jt = { class: "metrics__bar-label" }, Mt = { class: "metrics__bar-row" }, Nt = { class: "metrics__bar-wrap" }, Pt = ["title"], Ft = { class: "metrics__bar-label" }, It = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "routes-heading"
}, Lt = {
	key: 0,
	class: "metrics__skel"
}, Rt = {
	key: 3,
	class: "metrics__table",
	"aria-label": "Top routes by latency"
}, zt = { class: "metrics__mono metrics__route" }, Bt = { class: "metrics__mono" }, Vt = {
	key: 1,
	class: "metrics__muted"
}, Ht = { class: "metrics__mono" }, Ut = { class: "metrics__mono" }, Wt = 5e3, Gt = 15e3, Kt = /*#__PURE__*/ e(/* @__PURE__ */ A({
	__name: "MetricsPage",
	props: { client: {} },
	setup(e) {
		let c = ee(() => import("./vue3-apexcharts-core-Bc6O7F62.js")), f = e, p = j("apiBase", ""), m = C(() => typeof p == "string" ? p : p?.value ?? ""), h = new se(f.client ?? new r({
			baseUrl: m.value,
			tokenStore: new t()
		})), g = new ue(f.client ?? new r({
			baseUrl: m.value,
			tokenStore: new t()
		})), _ = i(), v = null, y = null, b = null, A = null, M = F(null), z = F([]), B = F([]), V = F([]), ie = F(!0), H = F(!0), ae = F(!0), oe = F(!0), U = F(null), W = F(null), G = F(null), K = F(null), ce = F([]), le = F(null), de = F(null), fe = F(!0), q = F(!0), pe = F(null), me = F(null);
		function J(e) {
			return e * 8 / 1e6;
		}
		function he(e) {
			return Date.parse(e.replace(" ", "T"));
		}
		let ge = C(() => z.value.map((e) => {
			let t = he(e.bucket);
			return new Date(Number.isFinite(t) ? t : 0).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});
		})), _e = C(() => [{
			name: "In (Mbps)",
			data: z.value.map((e) => Number(J(e.bytes_in).toFixed(3)))
		}, {
			name: "Out (Mbps)",
			data: z.value.map((e) => Number(J(e.bytes_out).toFixed(3)))
		}]), ve = C(() => [{
			name: "p50",
			data: z.value.map((e) => e.p50_ms)
		}, {
			name: "p95",
			data: z.value.map((e) => e.p95_ms)
		}]), ye = C(() => [{
			name: "Requests",
			data: z.value.map((e) => e.requests)
		}, {
			name: "Errors",
			data: z.value.map((e) => e.errors)
		}]);
		function Y(e) {
			return `${J(e).toFixed(2)} Mbps`;
		}
		function be(e) {
			let t = Math.floor(Date.now() / 1e3 - e);
			if (t < 60) return `${t}s ago`;
			let n = Math.floor(t / 60);
			return n < 60 ? `${n}m ago` : `${Math.floor(n / 60)}h ago`;
		}
		function xe(e) {
			let t = he(e);
			return Number.isFinite(t) ? be(Math.floor(t / 1e3)) : "—";
		}
		function Se(e) {
			return e < 100 ? "success" : e < 500 ? "warning" : "error";
		}
		function Ce(e) {
			switch ((e ?? "").toUpperCase()) {
				case "GET": return "accent";
				case "POST": return "success";
				case "PUT":
				case "PATCH": return "warning";
				case "DELETE": return "error";
				default: return "neutral";
			}
		}
		async function we() {
			U.value = null;
			try {
				M.value = await h.getSnapshot(60);
			} catch (e) {
				U.value = n(e, "Failed to load metrics snapshot."), _.error(U.value);
			} finally {
				ie.value = !1;
			}
		}
		async function X() {
			W.value = null;
			try {
				z.value = await h.getHistory(60, 60);
			} catch (e) {
				W.value = n(e, "Failed to load history."), _.error(W.value);
			} finally {
				H.value = !1;
			}
		}
		async function Te() {
			G.value = null;
			try {
				B.value = await h.getConnections(15);
			} catch (e) {
				G.value = n(e, "Failed to load connections."), _.error(G.value);
			} finally {
				ae.value = !1;
			}
		}
		async function Ee() {
			K.value = null;
			try {
				V.value = await h.getRoutes(15, 20);
			} catch (e) {
				K.value = n(e, "Failed to load routes."), _.error(K.value);
			} finally {
				oe.value = !1;
			}
		}
		async function De() {
			pe.value = null;
			try {
				ce.value = await g.listServers();
			} catch (e) {
				pe.value = n(e, "Failed to load servers."), _.error(pe.value);
			} finally {
				fe.value = !1;
			}
		}
		async function ke(e) {
			if (me.value = null, !e) {
				le.value = null, q.value = !1;
				return;
			}
			try {
				le.value = await g.getServerInfo(e);
			} catch (e) {
				me.value = n(e, "Failed to load server info."), _.error(me.value);
			} finally {
				q.value = !1;
			}
		}
		function Ae(e) {
			de.value = e, q.value = !0, ke(e);
		}
		function je() {
			v !== null && (clearInterval(v), v = null), y !== null && (clearInterval(y), y = null), b !== null && (clearInterval(b), b = null), A !== null && (clearInterval(A), A = null);
		}
		function Ne() {
			v === null && (v = setInterval(() => void we(), Wt)), y === null && (y = setInterval(() => void Te(), Wt)), b === null && (b = setInterval(() => void X(), Gt)), A === null && (A = setInterval(() => void Ee(), Gt));
		}
		function Pe() {
			document.hidden ? je() : Ne();
		}
		ne(() => {
			De(), we(), X(), Te(), Ee(), Ne(), typeof document < "u" && document.addEventListener("visibilitychange", Pe);
		}), N(() => {
			je(), typeof document < "u" && document.removeEventListener("visibilitychange", Pe);
		});
		let Fe = {
			toolbar: { show: !1 },
			zoom: { enabled: !1 },
			animations: {
				enabled: !0,
				easing: "easeinout",
				speed: 400
			},
			stroke: {
				curve: "smooth",
				width: 2
			},
			dataLabels: { enabled: !1 },
			tooltip: { x: { show: !0 } }
		}, Z = C(() => ({
			categories: ge.value,
			labels: {
				show: !0,
				rotate: -30,
				style: { fontSize: "11px" }
			},
			axisBorder: { show: !1 },
			axisTicks: { show: !1 }
		})), Ie = (e) => ({ labels: {
			formatter: (t) => `${t}${e}`,
			style: { fontSize: "11px" }
		} }), Le = {
			borderColor: "var(--border-subtle)",
			strokeDashArray: 3,
			xaxis: { lines: { show: !1 } },
			yaxis: { lines: { show: !0 } }
		};
		return (e, t) => (P(), E("section", tt, [
			D("header", nt, [D("div", rt, [
				t[1] ||= D("h1", {
					id: "metrics-heading",
					class: "metrics__title"
				}, "Server Traffic", -1),
				k(Me, {
					modelValue: de.value,
					"onUpdate:modelValue": t[0] ||= (e) => de.value = e,
					servers: ce.value,
					loading: fe.value,
					onChange: Ae
				}, null, 8, [
					"modelValue",
					"servers",
					"loading"
				]),
				k(a)
			]), M.value !== null && !ie.value ? (P(), E("div", it, [
				k(s, { tone: "accent" }, {
					default: R(() => [O(I(M.value.active_connections) + " active connections", 1)]),
					_: 1
				}),
				D("span", at, I(Y(M.value.bytes_in_per_sec)) + " in / " + I(Y(M.value.bytes_out_per_sec)) + " out ", 1),
				D("span", ot, I(M.value.requests_per_sec.toFixed(1)) + " req/s · " + I((M.value.error_rate * 100).toFixed(2)) + "% errors ", 1),
				D("span", st, " p50 " + I(M.value.p50_ms) + "ms / p95 " + I(M.value.p95_ms) + "ms / p99 " + I(M.value.p99_ms) + "ms ", 1)
			])) : T("", !0)]),
			k(d, {
				links: L(x).metrics.links,
				details: L(x).metrics.details
			}, {
				default: R(() => [...t[2] ||= [
					O(" Real-time server traffic graphs. ", -1),
					D("strong", null, "Bandwidth", -1),
					O(" shows in/out throughput, ", -1),
					D("strong", null, "Latency", -1),
					O(" shows response-time percentiles, and ", -1),
					D("strong", null, "Request Rate", -1),
					O(" shows requests vs. errors over time. Data refreshes automatically — snapshot every 5s, history every 15s. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			ce.value.length > 0 ? (P(), E("div", ct, [k(Oe, {
				"server-info": le.value,
				loading: q.value
			}, null, 8, ["server-info", "loading"])])) : T("", !0),
			ie.value ? (P(), E("div", lt, [k(l, {
				variant: "text",
				lines: 1
			})])) : T("", !0),
			D("div", ut, [
				D("section", dt, [D("header", ft, [t[4] ||= D("h2", {
					id: "bw-heading",
					class: "metrics__card-title"
				}, "Bandwidth", -1), k(s, { tone: "neutral" }, {
					default: R(() => [...t[3] ||= [O("Mbps", -1)]]),
					_: 1
				})]), H.value ? (P(), E("div", pt, [k(l, {
					variant: "text",
					lines: 6
				})])) : W.value ? (P(), w(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load bandwidth history",
					description: W.value
				}, {
					actions: R(() => [k(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: X
					}, {
						default: R(() => [...t[5] ||= [O("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : z.value.length === 0 ? (P(), w(u, {
					key: 2,
					icon: "speed",
					title: "No bandwidth data yet"
				})) : (P(), w(L(c), {
					key: 3,
					type: "area",
					height: "220",
					options: {
						...Fe,
						chart: {
							id: "bandwidth",
							group: "metrics",
							type: "area"
						},
						colors: ["#22c55e", "#3b82f6"],
						fill: {
							type: "gradient",
							gradient: {
								shadeIntensity: 1,
								opacityFrom: .4,
								opacityTo: .1
							}
						},
						xaxis: Z.value,
						yaxis: Ie(" Mbps"),
						grid: Le,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						}
					},
					series: _e.value
				}, null, 8, ["options", "series"]))]),
				D("section", mt, [D("header", ht, [t[7] ||= D("h2", {
					id: "lat-heading",
					class: "metrics__card-title"
				}, "Latency", -1), k(s, { tone: "neutral" }, {
					default: R(() => [...t[6] ||= [O("ms", -1)]]),
					_: 1
				})]), H.value ? (P(), E("div", gt, [k(l, {
					variant: "text",
					lines: 4
				})])) : W.value ? (P(), w(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load latency history",
					description: W.value
				}, {
					actions: R(() => [k(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: X
					}, {
						default: R(() => [...t[8] ||= [O("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : z.value.length === 0 ? (P(), w(u, {
					key: 2,
					icon: "speed",
					title: "No latency data yet"
				})) : (P(), w(L(c), {
					key: 3,
					type: "line",
					height: "200",
					options: {
						...Fe,
						chart: {
							id: "latency",
							group: "metrics",
							type: "line"
						},
						colors: ["#a78bfa", "#f97316"],
						xaxis: Z.value,
						yaxis: Ie(" ms"),
						grid: Le,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						}
					},
					series: ve.value
				}, null, 8, ["options", "series"]))]),
				D("section", _t, [D("header", vt, [t[10] ||= D("h2", {
					id: "req-heading",
					class: "metrics__card-title"
				}, "Request Rate", -1), k(s, { tone: "neutral" }, {
					default: R(() => [...t[9] ||= [O("req", -1)]]),
					_: 1
				})]), H.value ? (P(), E("div", yt, [k(l, {
					variant: "text",
					lines: 4
				})])) : W.value ? (P(), w(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load request history",
					description: W.value
				}, {
					actions: R(() => [k(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: X
					}, {
						default: R(() => [...t[11] ||= [O("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : z.value.length === 0 ? (P(), w(u, {
					key: 2,
					icon: "speed",
					title: "No request data yet"
				})) : (P(), w(L(c), {
					key: 3,
					type: "line",
					height: "200",
					options: {
						...Fe,
						chart: {
							id: "requests",
							group: "metrics",
							type: "line"
						},
						colors: ["#06b6d4", "#ef4444"],
						xaxis: Z.value,
						yaxis: Ie(""),
						grid: Le,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						},
						markers: { size: 0 }
					},
					series: ye.value
				}, null, 8, ["options", "series"]))]),
				D("section", bt, [D("header", xt, [t[12] ||= D("h2", {
					id: "conn-heading",
					class: "metrics__card-title"
				}, "Live Connections", -1), B.value.length > 0 ? (P(), w(s, {
					key: 0,
					tone: "accent",
					label: `${B.value.length} active`
				}, {
					default: R(() => [O(I(B.value.length), 1)]),
					_: 1
				}, 8, ["label"])) : T("", !0)]), ae.value ? (P(), E("div", St, [k(l, {
					variant: "text",
					lines: 4
				})])) : G.value ? (P(), w(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load connections",
					description: G.value
				}, {
					actions: R(() => [k(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Te
					}, {
						default: R(() => [...t[13] ||= [O("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : B.value.length === 0 ? (P(), w(u, {
					key: 2,
					icon: "speed",
					title: "No active connections"
				})) : (P(), E("table", Ct, [t[14] ||= D("thead", null, [D("tr", null, [
					D("th", { scope: "col" }, "Remote"),
					D("th", { scope: "col" }, "User"),
					D("th", { scope: "col" }, "Kind"),
					D("th", { scope: "col" }, "Started"),
					D("th", {
						scope: "col",
						class: "metrics__th--bar"
					}, "Throughput (in / out)")
				])], -1), D("tbody", null, [(P(!0), E(S, null, re(B.value, (e) => (P(), E("tr", { key: e.id }, [
					D("td", wt, I(e.remote_ip || "—"), 1),
					D("td", Tt, I(e.user_id ?? "—"), 1),
					D("td", null, [k(s, { tone: "neutral" }, {
						default: R(() => [O(I(e.kind), 1)]),
						_: 2
					}, 1024)]),
					D("td", Et, I(xe(e.opened_at)), 1),
					D("td", Dt, [D("div", Ot, [D("div", kt, [D("div", {
						class: "metrics__bar metrics__bar--in",
						style: te({ width: `${Math.min(100, J(e.bytes_in_rate))}%` }),
						title: `In: ${Y(e.bytes_in_rate)}`
					}, null, 12, At)]), D("span", jt, I(Y(e.bytes_in_rate)), 1)]), D("div", Mt, [D("div", Nt, [D("div", {
						class: "metrics__bar metrics__bar--out",
						style: te({ width: `${Math.min(100, J(e.bytes_out_rate))}%` }),
						title: `Out: ${Y(e.bytes_out_rate)}`
					}, null, 12, Pt)]), D("span", Ft, I(Y(e.bytes_out_rate)), 1)])])
				]))), 128))])]))]),
				D("section", It, [t[17] ||= D("header", { class: "metrics__card-head" }, [D("h2", {
					id: "routes-heading",
					class: "metrics__card-title"
				}, "Top Routes by Latency")], -1), oe.value ? (P(), E("div", Lt, [k(l, {
					variant: "text",
					lines: 4
				})])) : K.value ? (P(), w(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load routes",
					description: K.value
				}, {
					actions: R(() => [k(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Ee
					}, {
						default: R(() => [...t[15] ||= [O("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : V.value.length === 0 ? (P(), w(u, {
					key: 2,
					icon: "speed",
					title: "No route data yet"
				})) : (P(), E("table", Rt, [t[16] ||= D("thead", null, [D("tr", null, [
					D("th", { scope: "col" }, "Method"),
					D("th", { scope: "col" }, "Route"),
					D("th", { scope: "col" }, "Requests"),
					D("th", { scope: "col" }, "Errors"),
					D("th", { scope: "col" }, "Avg ms"),
					D("th", { scope: "col" }, "Max ms")
				])], -1), D("tbody", null, [(P(!0), E(S, null, re(V.value, (e) => (P(), E("tr", { key: `${e.method}:${e.route}` }, [
					D("td", null, [k(s, { tone: Ce(e.method) }, {
						default: R(() => [O(I(e.method), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					D("td", zt, I(e.route), 1),
					D("td", Bt, I(e.request_count.toLocaleString()), 1),
					D("td", null, [e.error_count > 0 ? (P(), w(s, {
						key: 0,
						tone: "error"
					}, {
						default: R(() => [O(I(e.error_count), 1)]),
						_: 2
					}, 1024)) : (P(), E("span", Vt, "0"))]),
					D("td", Ht, I(e.avg_ms) + "ms", 1),
					D("td", Ut, [k(s, { tone: Se(e.max_ms) }, {
						default: R(() => [O(I(e.max_ms) + "ms", 1)]),
						_: 2
					}, 1032, ["tone"])])
				]))), 128))])]))])
			])
		]));
	}
}), [["__scopeId", "data-v-5b26fcbe"]]);
//#endregion
export { Kt as default };

//# sourceMappingURL=MetricsPage-2D5Mkhrt.js.map