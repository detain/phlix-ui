import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D1nDQ0cP.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./NetworkHealthIndicator-2IF4-qBN.js";
import { t as o } from "./Button-DGsvHynO.js";
import { t as s } from "./Badge-D_aUH3dO.js";
import { t as c } from "./Select-Bx8h2mSF.js";
import { t as l } from "./Skeleton-DhQmxeNg.js";
import { t as u } from "./EmptyState-CfyGawh7.js";
import { t as d } from "./PageHint-CPoTKHik.js";
import { a as f, c as p, i as m, l as h, n as g, o as _, r as v, s as y, t as b } from "./core.esm-m8NAkprg.js";
import { Fragment as x, computed as S, createBlock as C, createCommentVNode as w, createElementBlock as T, createElementVNode as E, createTextVNode as D, createVNode as O, defineAsyncComponent as ee, defineComponent as k, inject as te, normalizeClass as A, normalizeStyle as ne, onBeforeUnmount as re, onMounted as j, openBlock as M, ref as N, renderList as P, toDisplayString as F, unref as ie, withCtx as I } from "vue";
//#region src/api/admin/metrics.ts
function L(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function R(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function z(e) {
	return Array.isArray(e) ? e : [];
}
function ae(e) {
	return {
		bytes_in_per_sec: R(e.bytes_in_per_sec),
		bytes_out_per_sec: R(e.bytes_out_per_sec),
		active_connections: R(e.active_connections),
		requests_per_sec: R(e.requests_per_sec),
		error_rate: R(e.error_rate),
		p50_ms: R(e.p50_ms),
		p95_ms: R(e.p95_ms),
		p99_ms: R(e.p99_ms)
	};
}
function B(e) {
	return {
		bucket: L(e.bucket),
		bytes_in: R(e.bytes_in),
		bytes_out: R(e.bytes_out),
		requests: R(e.requests),
		errors: R(e.errors),
		p50_ms: R(e.p50_ms),
		p95_ms: R(e.p95_ms)
	};
}
function oe(e) {
	return {
		id: L(e.connection_id),
		kind: L(e.kind, "http"),
		remote_ip: L(e.remote_ip),
		user_id: e.user_id == null ? null : L(e.user_id),
		bytes_in_rate: R(e.bytes_in_rate),
		bytes_out_rate: R(e.bytes_out_rate),
		opened_at: L(e.opened_at)
	};
}
function se(e) {
	return {
		method: L(e.method),
		route: L(e.route),
		request_count: R(e.request_count),
		error_count: R(e.error_count),
		avg_ms: R(e.avg_ms),
		max_ms: R(e.max_ms)
	};
}
var ce = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getSnapshot(e = 60) {
		let { data: t } = await this.client.get("/api/v1/admin/metrics/snapshot", { window: String(e) });
		return ae(t ?? {});
	}
	async getHistory(e = 60, t = 60) {
		let { data: n } = await this.client.get("/api/v1/admin/metrics/history", {
			minutes: String(e),
			resolution: String(t)
		});
		return z(n).map(B);
	}
	async getConnections(e = 15) {
		let { data: t } = await this.client.get("/api/v1/admin/metrics/connections", { ttl: String(e) });
		return z(t).map(oe);
	}
	async getRoutes(e = 15, t = 20) {
		let { data: n } = await this.client.get("/api/v1/admin/metrics/routes", {
			minutes: String(e),
			limit: String(t)
		});
		return z(n).map(se);
	}
};
//#endregion
//#region src/api/admin/servers.ts
function V(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function H(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function U(e, t = !1) {
	return e === !0 || e === 1 || e === "1" || e === "true" || t;
}
function W(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function G(e) {
	return {
		id: V(e.id ?? e.serverId),
		name: V(e.name ?? e.serverName),
		hostname: V(e.hostname),
		version: V(e.version),
		online: U(e.online, !0),
		lastSeenAt: H(e.lastSeenAt ?? e.last_seen_at, 0) || null,
		activeSessionCount: H(e.activeSessionCount ?? e.active_session_count),
		uptimeSeconds: H(e.uptimeSeconds ?? e.uptime_seconds),
		libraryCount: H(e.libraryCount ?? e.library_count),
		totalItemCount: H(e.totalItemCount ?? e.total_item_count),
		totalStorageBytes: H(e.totalStorageBytes ?? e.total_storage_bytes)
	};
}
function le(e) {
	let t = (Array.isArray(e.hostnameCandidates) ? e.hostnameCandidates : [])[0];
	return {
		id: V(e.id ?? e.serverId),
		name: V(e.name ?? e.serverName),
		hostname: V(e.hostname) || t || "",
		online: U(e.online, !0),
		lastSeenAt: H(e.lastSeenAt ?? e.last_seen_at, 0) || null,
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
		return G(W(t) ? t : {});
	}
}, de = {
	key: 0,
	class: "server-info__skel"
}, fe = { class: "server-info__header" }, K = { class: "server-info__identity" }, pe = { class: "server-info__hostname" }, me = { class: "server-info__stats" }, q = { class: "server-info__stat" }, he = { class: "server-info__stat-value" }, ge = { class: "server-info__stat-num" }, _e = { class: "server-info__stat" }, ve = { class: "server-info__stat-value" }, ye = { class: "server-info__stat-num" }, J = { class: "server-info__stat" }, be = { class: "server-info__stat-value" }, xe = { class: "server-info__stat-num" }, Se = { class: "server-info__stat" }, Ce = { class: "server-info__stat-value" }, we = { class: "server-info__stat-num" }, Y = { class: "server-info__stat" }, Te = { class: "server-info__stat-value" }, X = { class: "server-info__stat-num" }, Ee = {
	key: 2,
	class: "server-info__empty"
}, De = /*#__PURE__*/ e(/* @__PURE__ */ k({
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
		let i = S(() => t.serverInfo?.online ? "success" : "error"), a = S(() => t.serverInfo?.online ? "Online" : "Offline");
		return (t, o) => (M(), T("div", { class: A(["server-info", { "is-loading": e.loading }]) }, [e.loading && !e.serverInfo ? (M(), T("div", de, [...o[0] ||= [
			E("div", { class: "skel-line skel-line--short" }, null, -1),
			E("div", { class: "skel-line" }, null, -1),
			E("div", { class: "skel-line skel-line--medium" }, null, -1)
		]])) : e.serverInfo ? (M(), T(x, { key: 1 }, [E("div", fe, [E("div", K, [E("h3", pe, F(e.serverInfo.hostname || e.serverInfo.name), 1), e.serverInfo.version ? (M(), C(s, {
			key: 0,
			tone: "neutral",
			mono: ""
		}, {
			default: I(() => [D(" v" + F(e.serverInfo.version), 1)]),
			_: 1
		})) : w("", !0)]), O(s, {
			tone: i.value,
			label: a.value
		}, {
			default: I(() => [o[1] ||= E("span", {
				class: "server-info__dot",
				"aria-hidden": "true"
			}, null, -1), D(" " + F(a.value), 1)]),
			_: 1
		}, 8, ["tone", "label"])]), E("dl", me, [
			E("div", q, [o[2] ||= E("dt", { class: "server-info__stat-label" }, "Active sessions", -1), E("dd", he, [E("span", ge, F(e.serverInfo.activeSessionCount.toLocaleString()), 1)])]),
			E("div", _e, [o[3] ||= E("dt", { class: "server-info__stat-label" }, "Uptime", -1), E("dd", ve, [E("span", ye, F(n(e.serverInfo.uptimeSeconds)), 1)])]),
			E("div", J, [o[4] ||= E("dt", { class: "server-info__stat-label" }, "Libraries", -1), E("dd", be, [E("span", xe, F(e.serverInfo.libraryCount.toLocaleString()), 1)])]),
			E("div", Se, [o[5] ||= E("dt", { class: "server-info__stat-label" }, "Total items", -1), E("dd", Ce, [E("span", we, F(e.serverInfo.totalItemCount.toLocaleString()), 1)])]),
			E("div", Y, [o[6] ||= E("dt", { class: "server-info__stat-label" }, "Storage used", -1), E("dd", Te, [E("span", X, F(r(e.serverInfo.totalStorageBytes)), 1)])])
		])], 64)) : (M(), T("p", Ee, "No server information available."))], 2));
	}
}), [["__scopeId", "data-v-4e386c5f"]]), Oe = {
	key: 0,
	class: "server-selector__status",
	"aria-live": "polite"
}, ke = { class: "server-selector__last-seen" }, Ae = {
	key: 1,
	class: "server-selector__status"
}, je = /*#__PURE__*/ e(/* @__PURE__ */ k({
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
		let a = S(() => n.servers.map((e) => {
			let t = e.hostname || e.name;
			return {
				value: e.id,
				label: t,
				title: `Last seen: ${i(e.lastSeenAt)}`
			};
		})), o = S(() => n.modelValue ?? null), s = S(() => n.servers.length > 1 ? [{
			value: "",
			label: "All servers"
		}, ...a.value] : a.value);
		function l(e) {
			let t = e === "" || e === null ? null : String(e);
			r("update:modelValue", t), r("change", t);
		}
		let u = S(() => n.servers.find((e) => e.id === n.modelValue)), d = S(() => {
			let e = u.value;
			return e ? e.online ? "success" : "error" : "neutral";
		});
		return (t, n) => (M(), T("div", { class: A(["server-selector", { "is-loading": e.loading }]) }, [O(c, {
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
		]), u.value ? (M(), T("div", Oe, [E("span", {
			class: A(["server-selector__dot", `server-selector__dot--${d.value}`]),
			"aria-hidden": "true"
		}, null, 2), E("span", ke, " Last seen: " + F(i(u.value.lastSeenAt)), 1)])) : e.servers.length === 0 && !e.loading ? (M(), T("div", Ae, [...n[0] ||= [E("span", { class: "server-selector__hint" }, "No servers available.", -1)]])) : w("", !0)], 2));
	}
}), [["__scopeId", "data-v-c02c7539"]]), Me = Object.defineProperty, Ne = Object.defineProperties, Pe = Object.getOwnPropertyDescriptors, Z = Object.getOwnPropertySymbols, Fe = Object.prototype.hasOwnProperty, Ie = Object.prototype.propertyIsEnumerable, Le = (e, t, n) => t in e ? Me(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Re = (e, t) => {
	for (var n in t ||= {}) Fe.call(t, n) && Le(e, n, t[n]);
	if (Z) for (var n of Z(t)) Ie.call(t, n) && Le(e, n, t[n]);
	return e;
}, ze = (e, t) => Ne(e, Pe(t)), Be = g, Q = f, Ve = m, He = v, Ue = _, We = y, Ge = p, Ke = h, qe = class {
	constructor(e) {
		this.w = e.w, this.lineCtx = e;
	}
	sameValueSeriesFix(e, t) {
		let n = this.w;
		if ((n.config.fill.type === "gradient" || n.config.fill.type[e] === "gradient") && new Be(this.lineCtx.w).seriesHaveSameValues(e)) {
			let n = t[e].slice();
			n[n.length - 1] = n[n.length - 1] + 1e-6, t[e] = n;
		}
		return t;
	}
	calculatePoints({ series: e, realIndex: t, x: n, y: r, i, j: a, prevY: o }) {
		let s = this.w, c = [], l = [], u = this.lineCtx.categoryAxisCorrection + s.config.markers.offsetX;
		return s.axisFlags.isXNumeric && (u = (s.seriesData.seriesX[t][0] - s.globals.minX) / this.lineCtx.xRatio + s.config.markers.offsetX), a === 0 && (c.push(u), l.push(Ke.isNumber(e[i][0]) ? o + s.config.markers.offsetY : null)), c.push(n + s.config.markers.offsetX), l.push(Ke.isNumber(e[i][a + 1]) ? r + s.config.markers.offsetY : null), {
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
function Je(e) {
	let t = (e ^ 2654435769) >>> 0;
	return t = Math.imul(t ^ t >>> 16, 73244475), t = Math.imul(t ^ t >>> 16, 73244475), ((t ^ t >>> 16) >>> 0) / 4294967296;
}
var Ye = (e) => {
	let t = $e(e), n = e.length - 1, r = [], i, a, o, s;
	for (let r = 0; r < n; r++) o = Qe(e[r], e[r + 1]), Math.abs(o) < 1e-6 ? t[r] = t[r + 1] = 0 : (i = t[r] / o, a = t[r + 1] / o, s = i * i + a * a, s > 9 && (s = o * 3 / Math.sqrt(s), t[r] = s * i, t[r + 1] = s * a));
	for (let i = 0; i <= n; i++) s = (e[Math.min(n, i + 1)][0] - e[Math.max(0, i - 1)][0]) / (6 * (1 + t[i] * t[i])), r.push([s || 0, t[i] * s || 0]);
	return r;
}, Xe = (e) => {
	let t = "";
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = r.length;
		i > 4 ? (t += `C${r[0]}, ${r[1]}`, t += `, ${r[2]}, ${r[3]}`, t += `, ${r[4]}, ${r[5]}`) : i > 2 && (t += `S${r[0]}, ${r[1]}`, t += `, ${r[2]}, ${r[3]}`);
	}
	return t;
}, Ze = {
	points(e) {
		let t = Ye(e), n = e[1], r = e[0], i = [], a = t[1], o = t[0];
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
function Qe(e, t) {
	return (t[1] - e[1]) / (t[0] - e[0]);
}
function $e(e) {
	let t = [], n = e[0], r = e[1], i = t[0] = Qe(n, r), a = 1;
	for (let o = e.length - 1; a < o; a++) n = r, r = e[a + 1], t[a] = (i + (i = Qe(n, r))) * .5;
	return t[a] = i, t;
}
var $ = class {
	constructor(e, t, n, r) {
		this.ctx = t, this.w = e, this.xyRatios = n, this.xRatio = 0, this.yRatio = [], this.zRatio = 0, this.baseLineY = [], this.pointsChart = !(this.w.config.chart.type !== "bubble" && this.w.config.chart.type !== "scatter") || r, this.scatter = new We(this.w, this.ctx), this.noNegatives = this.w.globals.minX === Number.MAX_VALUE, this.lineHelpers = new qe(this), this.markers = new Ue(this.w, this.ctx), this.prevSeriesY = [], this.categoryAxisCorrection = 0, this.yaxisIndex = 0, this.xDivision = 0, this.zeroY = 0, this.areaBottomY = 0, this.strokeWidth = 0, this.isReversed = !1, this.appendPathFrom = !1, this.elSeries = null, this.elPointsMain = null, this.elDataLabelsWrap = null;
	}
	draw(e, t, n, r) {
		let i = this.w, a = new Q(this.w), o = i.globals.comboCharts ? t : i.config.chart.type, s = a.group({ class: `apexcharts-${o}-series apexcharts-plot-series` }), c = new Be(this.w);
		this.yRatio = this.xyRatios.yRatio, this.zRatio = this.xyRatios.zRatio, this.xRatio = this.xyRatios.xRatio, this.baseLineY = this.xyRatios.baseLineY, e = c.getLogSeries(e), this.yRatio = c.getLogYRatios(this.yRatio), this.prevSeriesY = [];
		let l = [];
		for (let t = 0; t < e.length; t++) {
			e = this.lineHelpers.sameValueSeriesFix(t, e);
			let a = i.globals.comboCharts ? n[t] : t, s = this.yRatio.length > 1 ? a : 0;
			this._initSerieVariables(e, t, a);
			let c = [], u = [], d = [], f = i.globals.padHorizontal + this.categoryAxisCorrection, p = [], m = [];
			Ge.addCollapsedClassToSeries(this.w, this.elSeries, a), i.axisFlags.isXNumeric && i.seriesData.seriesX.length > 0 && (f = (i.seriesData.seriesX[a][0] - i.globals.minX) / this.xRatio), d.push(f);
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
			}, E = this._iterateOverDataPoints(ze(Re({}, T), {
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
				}), n = this._iterateOverDataPoints(ze(Re({}, T), {
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
			seriesName: Ke.escapeString(r.seriesData.seriesNames[n])
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
		let i = this.w, a = new Q(this.w), o = new Ve(this.w);
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
				let n = a.renderPaths(ze(Re({}, c), {
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
				let d = ze(Re({}, c), {
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
		let b = this.w, x = new Q(this.w), S = this.yRatio, { prevY: C, linePath: w, areaPath: T, pathFromLine: E, pathFromArea: D } = u, O = Ke.isNumber(b.globals.minYArr[r]) ? b.globals.minYArr[r] : b.globals.minY;
		n ||= b.globals.dataPoints > 1 ? b.globals.dataPoints - 1 : b.globals.dataPoints;
		let ee = (e, t) => t - e / S[i] + (this.isReversed ? e / S[i] : 0) * 2, k = s, te = b.config.chart.stacked && !b.globals.comboCharts || b.config.chart.stacked && b.globals.comboCharts && (!this.w.config.chart.stackOnlyBar || this.w.config.series[r]?.type === "bar" || this.w.config.series[r]?.type === "column"), A = b.config.stroke.curve;
		Array.isArray(A) && (A = Array.isArray(p) ? A[p[a]] : A[a]);
		let ne = 0, re, j = this.pointsChart ? this._scatterJitterPx(r) : null;
		for (let i = 0; i < n && t[a].length !== 0; i++) {
			let u = t[a][i + 1] === void 0 || t[a][i + 1] === null;
			if (b.axisFlags.isXNumeric) {
				let e = b.seriesData.seriesX[r][i + 1];
				b.seriesData.seriesX[r][i + 1] === void 0 && (e = b.seriesData.seriesX[r][n - 1]), o = (e - b.globals.minX) / this.xRatio;
			} else o += this.xDivision;
			m = te && a > 0 && b.globals.collapsedSeries.length < b.config.series.length - 1 ? this.prevSeriesY[((e) => {
				for (let t = e; t > 0; t--) if (b.globals.collapsedSeriesIndices.indexOf(p?.[t] || t) > -1) t--;
				else return t;
				return 0;
			})(a - 1)][i + 1] : this.zeroY, u ? s = ee(O, m) : (s = ee(t[a][i + 1], m), e === "rangeArea" && (k = ee(y[a][i + 1], m)));
			let S = o, M = s;
			if (j) {
				let e = r * 100003 + (i + 1);
				j.x && (S = o + (Je(e * 7919 + 13) - .5) * 2 * j.x), j.y && (M = s + (Je(e * 6271 + 97) - .5) * 2 * j.y);
			}
			h.push(t[a][i + 1] === null ? null : S), u && (b.config.stroke.curve === "smooth" || b.config.stroke.curve === "monotoneCubic") ? (g.push(null), _.push(null)) : (g.push(M), _.push(k));
			let N = this.lineHelpers.calculatePoints({
				series: t,
				x: S,
				y: M,
				realIndex: r,
				i: a,
				j: i,
				prevY: C
			}), P = this._createPaths({
				type: e,
				series: t,
				i: a,
				j: i,
				x: o,
				y: s,
				y2: k,
				xArrj: h,
				yArrj: g,
				y2Arrj: _,
				pX: c,
				pY: l,
				pathState: ne,
				segmentStartX: re,
				linePath: w,
				areaPath: T,
				linePaths: d,
				areaPaths: f,
				curve: A,
				isRangeStart: v
			});
			f = P.areaPaths, d = P.linePaths, c = P.pX, l = P.pY, ne = P.pathState, re = P.segmentStartX, T = P.areaPath, w = P.linePath, this.appendPathFrom && !b.globals.hasNullValues && !(A === "monotoneCubic" && e === "rangeArea") && (E += x.line(o, this.areaBottomY), D += x.line(o, this.areaBottomY)), this.handleNullDataPoints(t, N, a, i, r), this._handleMarkersAndLabels({
				type: e,
				pointsPos: N,
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
		let o = this.w, s = new He(this.w, this.ctx);
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
					for (let e = 0, i = 0; e < n.length; i += n[e++]) r[e] = Ze.slice(t, i, i + n[e]);
					return r;
				};
				switch (f) {
					case 0:
						if (e[r + 1] === null) break;
						f = 1;
					case 1: if (!(S ? o.length === t[n].length : r === t[n].length - 2)) break;
					case 2: {
						let t = y ? o : o.slice().reverse(), n = y ? e : e.slice().reverse(), r = i(t, n), a = r.length > 1 ? Ze.points(r) : r, s = [];
						S && (C ? _ = r : s = _.reverse());
						let l = 0, u = 0;
						if (c(n, a).forEach((e) => {
							l++;
							let t = Xe(e), n = u;
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
var et = {
	class: "metrics",
	"aria-labelledby": "metrics-heading"
}, tt = { class: "metrics__head" }, nt = { class: "metrics__title-row" }, rt = {
	key: 0,
	class: "metrics__snapshot"
}, it = { class: "metrics__rate" }, at = { class: "metrics__rate" }, ot = { class: "metrics__latency" }, st = {
	key: 0,
	class: "metrics__server-info"
}, ct = {
	key: 1,
	class: "metrics__snapshot-skel"
}, lt = { class: "metrics__grid" }, ut = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "bw-heading"
}, dt = { class: "metrics__card-head" }, ft = {
	key: 0,
	class: "metrics__skel"
}, pt = {
	class: "metrics__card",
	"aria-labelledby": "lat-heading"
}, mt = { class: "metrics__card-head" }, ht = {
	key: 0,
	class: "metrics__skel"
}, gt = {
	class: "metrics__card",
	"aria-labelledby": "req-heading"
}, _t = { class: "metrics__card-head" }, vt = {
	key: 0,
	class: "metrics__skel"
}, yt = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "conn-heading"
}, bt = { class: "metrics__card-head" }, xt = {
	key: 0,
	class: "metrics__skel"
}, St = {
	key: 3,
	class: "metrics__table",
	"aria-label": "Live connections"
}, Ct = { class: "metrics__mono" }, wt = { class: "metrics__mono" }, Tt = { class: "metrics__muted" }, Et = { class: "metrics__bar-cell" }, Dt = { class: "metrics__bar-row" }, Ot = { class: "metrics__bar-wrap" }, kt = ["title"], At = { class: "metrics__bar-label" }, jt = { class: "metrics__bar-row" }, Mt = { class: "metrics__bar-wrap" }, Nt = ["title"], Pt = { class: "metrics__bar-label" }, Ft = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "routes-heading"
}, It = {
	key: 0,
	class: "metrics__skel"
}, Lt = {
	key: 3,
	class: "metrics__table",
	"aria-label": "Top routes by latency"
}, Rt = { class: "metrics__mono metrics__route" }, zt = { class: "metrics__mono" }, Bt = {
	key: 1,
	class: "metrics__muted"
}, Vt = { class: "metrics__mono" }, Ht = { class: "metrics__mono" }, Ut = 5e3, Wt = 15e3, Gt = /*#__PURE__*/ e(/* @__PURE__ */ k({
	__name: "MetricsPage",
	props: { client: {} },
	setup(e) {
		let c = ee(() => import("./vue3-apexcharts-core-CFdx-TJ8.js")), f = e, p = te("apiBase", ""), m = S(() => typeof p == "string" ? p : p?.value ?? ""), h = new ce(f.client ?? new r({
			baseUrl: m.value,
			tokenStore: new t()
		})), g = new ue(f.client ?? new r({
			baseUrl: m.value,
			tokenStore: new t()
		})), _ = i(), v = null, y = null, b = null, k = null, A = N(null), L = N([]), R = N([]), z = N([]), ae = N(!0), B = N(!0), oe = N(!0), se = N(!0), V = N(null), H = N(null), U = N(null), W = N(null), G = N([]), le = N(null), de = N(null), fe = N(!0), K = N(!0), pe = N(null), me = N(null);
		function q(e) {
			return e * 8 / 1e6;
		}
		function he(e) {
			return Date.parse(e.replace(" ", "T"));
		}
		let ge = S(() => L.value.map((e) => {
			let t = he(e.bucket);
			return new Date(Number.isFinite(t) ? t : 0).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});
		})), _e = S(() => [{
			name: "In (Mbps)",
			data: L.value.map((e) => Number(q(e.bytes_in).toFixed(3)))
		}, {
			name: "Out (Mbps)",
			data: L.value.map((e) => Number(q(e.bytes_out).toFixed(3)))
		}]), ve = S(() => [{
			name: "p50",
			data: L.value.map((e) => e.p50_ms)
		}, {
			name: "p95",
			data: L.value.map((e) => e.p95_ms)
		}]), ye = S(() => [{
			name: "Requests",
			data: L.value.map((e) => e.requests)
		}, {
			name: "Errors",
			data: L.value.map((e) => e.errors)
		}]);
		function J(e) {
			return `${q(e).toFixed(2)} Mbps`;
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
			V.value = null;
			try {
				A.value = await h.getSnapshot(60);
			} catch (e) {
				V.value = n(e, "Failed to load metrics snapshot."), _.error(V.value);
			} finally {
				ae.value = !1;
			}
		}
		async function Y() {
			H.value = null;
			try {
				L.value = await h.getHistory(60, 60);
			} catch (e) {
				H.value = n(e, "Failed to load history."), _.error(H.value);
			} finally {
				B.value = !1;
			}
		}
		async function Te() {
			U.value = null;
			try {
				R.value = await h.getConnections(15);
			} catch (e) {
				U.value = n(e, "Failed to load connections."), _.error(U.value);
			} finally {
				oe.value = !1;
			}
		}
		async function X() {
			W.value = null;
			try {
				z.value = await h.getRoutes(15, 20);
			} catch (e) {
				W.value = n(e, "Failed to load routes."), _.error(W.value);
			} finally {
				se.value = !1;
			}
		}
		async function Ee() {
			pe.value = null;
			try {
				G.value = await g.listServers();
			} catch (e) {
				pe.value = n(e, "Failed to load servers."), _.error(pe.value);
			} finally {
				fe.value = !1;
			}
		}
		async function Oe(e) {
			if (me.value = null, !e) {
				le.value = null, K.value = !1;
				return;
			}
			try {
				le.value = await g.getServerInfo(e);
			} catch (e) {
				me.value = n(e, "Failed to load server info."), _.error(me.value);
			} finally {
				K.value = !1;
			}
		}
		function ke(e) {
			de.value = e, K.value = !0, Oe(e);
		}
		function Ae() {
			v !== null && (clearInterval(v), v = null), y !== null && (clearInterval(y), y = null), b !== null && (clearInterval(b), b = null), k !== null && (clearInterval(k), k = null);
		}
		function Me() {
			v === null && (v = setInterval(() => void we(), Ut)), y === null && (y = setInterval(() => void Te(), Ut)), b === null && (b = setInterval(() => void Y(), Wt)), k === null && (k = setInterval(() => void X(), Wt));
		}
		function Ne() {
			document.hidden ? Ae() : Me();
		}
		j(() => {
			Ee(), we(), Y(), Te(), X(), Me(), typeof document < "u" && document.addEventListener("visibilitychange", Ne);
		}), re(() => {
			Ae(), typeof document < "u" && document.removeEventListener("visibilitychange", Ne);
		});
		let Pe = {
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
		}, Z = S(() => ({
			categories: ge.value,
			labels: {
				show: !0,
				rotate: -30,
				style: { fontSize: "11px" }
			},
			axisBorder: { show: !1 },
			axisTicks: { show: !1 }
		})), Fe = (e) => ({ labels: {
			formatter: (t) => `${t}${e}`,
			style: { fontSize: "11px" }
		} }), Ie = {
			borderColor: "var(--border-subtle)",
			strokeDashArray: 3,
			xaxis: { lines: { show: !1 } },
			yaxis: { lines: { show: !0 } }
		};
		return (e, t) => (M(), T("section", et, [
			E("header", tt, [E("div", nt, [
				t[1] ||= E("h1", {
					id: "metrics-heading",
					class: "metrics__title"
				}, "Server Traffic", -1),
				O(je, {
					modelValue: de.value,
					"onUpdate:modelValue": t[0] ||= (e) => de.value = e,
					servers: G.value,
					loading: fe.value,
					onChange: ke
				}, null, 8, [
					"modelValue",
					"servers",
					"loading"
				]),
				O(a)
			]), A.value !== null && !ae.value ? (M(), T("div", rt, [
				O(s, { tone: "accent" }, {
					default: I(() => [D(F(A.value.active_connections) + " active connections", 1)]),
					_: 1
				}),
				E("span", it, F(J(A.value.bytes_in_per_sec)) + " in / " + F(J(A.value.bytes_out_per_sec)) + " out ", 1),
				E("span", at, F(A.value.requests_per_sec.toFixed(1)) + " req/s · " + F((A.value.error_rate * 100).toFixed(2)) + "% errors ", 1),
				E("span", ot, " p50 " + F(A.value.p50_ms) + "ms / p95 " + F(A.value.p95_ms) + "ms / p99 " + F(A.value.p99_ms) + "ms ", 1)
			])) : w("", !0)]),
			O(d, null, {
				default: I(() => [...t[2] ||= [
					D(" Real-time server traffic graphs. ", -1),
					E("strong", null, "Bandwidth", -1),
					D(" shows in/out throughput, ", -1),
					E("strong", null, "Latency", -1),
					D(" shows response-time percentiles, and ", -1),
					E("strong", null, "Request Rate", -1),
					D(" shows requests vs. errors over time. Data refreshes automatically — snapshot every 5s, history every 15s. ", -1)
				]]),
				_: 1
			}),
			G.value.length > 0 ? (M(), T("div", st, [O(De, {
				"server-info": le.value,
				loading: K.value
			}, null, 8, ["server-info", "loading"])])) : w("", !0),
			ae.value ? (M(), T("div", ct, [O(l, {
				variant: "text",
				lines: 1
			})])) : w("", !0),
			E("div", lt, [
				E("section", ut, [E("header", dt, [t[4] ||= E("h2", {
					id: "bw-heading",
					class: "metrics__card-title"
				}, "Bandwidth", -1), O(s, { tone: "neutral" }, {
					default: I(() => [...t[3] ||= [D("Mbps", -1)]]),
					_: 1
				})]), B.value ? (M(), T("div", ft, [O(l, {
					variant: "text",
					lines: 6
				})])) : H.value ? (M(), C(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load bandwidth history",
					description: H.value
				}, {
					actions: I(() => [O(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Y
					}, {
						default: I(() => [...t[5] ||= [D("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : L.value.length === 0 ? (M(), C(u, {
					key: 2,
					icon: "speed",
					title: "No bandwidth data yet"
				})) : (M(), C(ie(c), {
					key: 3,
					type: "area",
					height: "220",
					options: {
						...Pe,
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
						yaxis: Fe(" Mbps"),
						grid: Ie,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						}
					},
					series: _e.value
				}, null, 8, ["options", "series"]))]),
				E("section", pt, [E("header", mt, [t[7] ||= E("h2", {
					id: "lat-heading",
					class: "metrics__card-title"
				}, "Latency", -1), O(s, { tone: "neutral" }, {
					default: I(() => [...t[6] ||= [D("ms", -1)]]),
					_: 1
				})]), B.value ? (M(), T("div", ht, [O(l, {
					variant: "text",
					lines: 4
				})])) : H.value ? (M(), C(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load latency history",
					description: H.value
				}, {
					actions: I(() => [O(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Y
					}, {
						default: I(() => [...t[8] ||= [D("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : L.value.length === 0 ? (M(), C(u, {
					key: 2,
					icon: "speed",
					title: "No latency data yet"
				})) : (M(), C(ie(c), {
					key: 3,
					type: "line",
					height: "200",
					options: {
						...Pe,
						chart: {
							id: "latency",
							group: "metrics",
							type: "line"
						},
						colors: ["#a78bfa", "#f97316"],
						xaxis: Z.value,
						yaxis: Fe(" ms"),
						grid: Ie,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						}
					},
					series: ve.value
				}, null, 8, ["options", "series"]))]),
				E("section", gt, [E("header", _t, [t[10] ||= E("h2", {
					id: "req-heading",
					class: "metrics__card-title"
				}, "Request Rate", -1), O(s, { tone: "neutral" }, {
					default: I(() => [...t[9] ||= [D("req", -1)]]),
					_: 1
				})]), B.value ? (M(), T("div", vt, [O(l, {
					variant: "text",
					lines: 4
				})])) : H.value ? (M(), C(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load request history",
					description: H.value
				}, {
					actions: I(() => [O(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Y
					}, {
						default: I(() => [...t[11] ||= [D("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : L.value.length === 0 ? (M(), C(u, {
					key: 2,
					icon: "speed",
					title: "No request data yet"
				})) : (M(), C(ie(c), {
					key: 3,
					type: "line",
					height: "200",
					options: {
						...Pe,
						chart: {
							id: "requests",
							group: "metrics",
							type: "line"
						},
						colors: ["#06b6d4", "#ef4444"],
						xaxis: Z.value,
						yaxis: Fe(""),
						grid: Ie,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						},
						markers: { size: 0 }
					},
					series: ye.value
				}, null, 8, ["options", "series"]))]),
				E("section", yt, [E("header", bt, [t[12] ||= E("h2", {
					id: "conn-heading",
					class: "metrics__card-title"
				}, "Live Connections", -1), R.value.length > 0 ? (M(), C(s, {
					key: 0,
					tone: "accent",
					label: `${R.value.length} active`
				}, {
					default: I(() => [D(F(R.value.length), 1)]),
					_: 1
				}, 8, ["label"])) : w("", !0)]), oe.value ? (M(), T("div", xt, [O(l, {
					variant: "text",
					lines: 4
				})])) : U.value ? (M(), C(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load connections",
					description: U.value
				}, {
					actions: I(() => [O(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Te
					}, {
						default: I(() => [...t[13] ||= [D("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : R.value.length === 0 ? (M(), C(u, {
					key: 2,
					icon: "speed",
					title: "No active connections"
				})) : (M(), T("table", St, [t[14] ||= E("thead", null, [E("tr", null, [
					E("th", { scope: "col" }, "Remote"),
					E("th", { scope: "col" }, "User"),
					E("th", { scope: "col" }, "Kind"),
					E("th", { scope: "col" }, "Started"),
					E("th", {
						scope: "col",
						class: "metrics__th--bar"
					}, "Throughput (in / out)")
				])], -1), E("tbody", null, [(M(!0), T(x, null, P(R.value, (e) => (M(), T("tr", { key: e.id }, [
					E("td", Ct, F(e.remote_ip || "—"), 1),
					E("td", wt, F(e.user_id ?? "—"), 1),
					E("td", null, [O(s, { tone: "neutral" }, {
						default: I(() => [D(F(e.kind), 1)]),
						_: 2
					}, 1024)]),
					E("td", Tt, F(xe(e.opened_at)), 1),
					E("td", Et, [E("div", Dt, [E("div", Ot, [E("div", {
						class: "metrics__bar metrics__bar--in",
						style: ne({ width: `${Math.min(100, q(e.bytes_in_rate))}%` }),
						title: `In: ${J(e.bytes_in_rate)}`
					}, null, 12, kt)]), E("span", At, F(J(e.bytes_in_rate)), 1)]), E("div", jt, [E("div", Mt, [E("div", {
						class: "metrics__bar metrics__bar--out",
						style: ne({ width: `${Math.min(100, q(e.bytes_out_rate))}%` }),
						title: `Out: ${J(e.bytes_out_rate)}`
					}, null, 12, Nt)]), E("span", Pt, F(J(e.bytes_out_rate)), 1)])])
				]))), 128))])]))]),
				E("section", Ft, [t[17] ||= E("header", { class: "metrics__card-head" }, [E("h2", {
					id: "routes-heading",
					class: "metrics__card-title"
				}, "Top Routes by Latency")], -1), se.value ? (M(), T("div", It, [O(l, {
					variant: "text",
					lines: 4
				})])) : W.value ? (M(), C(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load routes",
					description: W.value
				}, {
					actions: I(() => [O(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: X
					}, {
						default: I(() => [...t[15] ||= [D("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : z.value.length === 0 ? (M(), C(u, {
					key: 2,
					icon: "speed",
					title: "No route data yet"
				})) : (M(), T("table", Lt, [t[16] ||= E("thead", null, [E("tr", null, [
					E("th", { scope: "col" }, "Method"),
					E("th", { scope: "col" }, "Route"),
					E("th", { scope: "col" }, "Requests"),
					E("th", { scope: "col" }, "Errors"),
					E("th", { scope: "col" }, "Avg ms"),
					E("th", { scope: "col" }, "Max ms")
				])], -1), E("tbody", null, [(M(!0), T(x, null, P(z.value, (e) => (M(), T("tr", { key: `${e.method}:${e.route}` }, [
					E("td", null, [O(s, { tone: Ce(e.method) }, {
						default: I(() => [D(F(e.method), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					E("td", Rt, F(e.route), 1),
					E("td", zt, F(e.request_count.toLocaleString()), 1),
					E("td", null, [e.error_count > 0 ? (M(), C(s, {
						key: 0,
						tone: "error"
					}, {
						default: I(() => [D(F(e.error_count), 1)]),
						_: 2
					}, 1024)) : (M(), T("span", Bt, "0"))]),
					E("td", Vt, F(e.avg_ms) + "ms", 1),
					E("td", Ht, [O(s, { tone: Se(e.max_ms) }, {
						default: I(() => [D(F(e.max_ms) + "ms", 1)]),
						_: 2
					}, 1032, ["tone"])])
				]))), 128))])]))])
			])
		]));
	}
}), [["__scopeId", "data-v-69acdf1f"]]);
//#endregion
export { Gt as default };

//# sourceMappingURL=MetricsPage-Bxtm4Bbq.js.map