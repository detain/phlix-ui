import { n as e } from "./Icon-24ngwBUH.js";
import { c as t, f as n, t as ee } from "./client-fw74f3l_.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-CInT03Lp.js";
import { t as i } from "./Badge-DnDrMVUo.js";
import { t as a } from "./Skeleton-BUq2D39t.js";
import { t as o } from "./EmptyState-0XgHKEGf.js";
import { t as ne } from "./PageHint-DR8OWfto.js";
import { Fragment as re, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineAsyncComponent as ie, defineComponent as m, inject as ae, normalizeStyle as oe, onBeforeUnmount as se, onMounted as ce, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as y, withCtx as b } from "vue";
//#region src/api/admin/metrics.ts
function x(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function S(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function C(e) {
	return Array.isArray(e) ? e : [];
}
function w(e) {
	return {
		bytes_in_per_sec: S(e.bytes_in_per_sec),
		bytes_out_per_sec: S(e.bytes_out_per_sec),
		active_connections: S(e.active_connections),
		requests_per_sec: S(e.requests_per_sec),
		error_rate: S(e.error_rate),
		p50_ms: S(e.p50_ms),
		p95_ms: S(e.p95_ms),
		p99_ms: S(e.p99_ms)
	};
}
function T(e) {
	return {
		bucket: x(e.bucket),
		bytes_in: S(e.bytes_in),
		bytes_out: S(e.bytes_out),
		requests: S(e.requests),
		errors: S(e.errors),
		p50_ms: S(e.p50_ms),
		p95_ms: S(e.p95_ms)
	};
}
function E(e) {
	return {
		id: x(e.connection_id),
		kind: x(e.kind, "http"),
		remote_ip: x(e.remote_ip),
		user_id: e.user_id == null ? null : x(e.user_id),
		bytes_in_rate: S(e.bytes_in_rate),
		bytes_out_rate: S(e.bytes_out_rate),
		opened_at: x(e.opened_at)
	};
}
function D(e) {
	return {
		method: x(e.method),
		route: x(e.route),
		request_count: S(e.request_count),
		error_count: S(e.error_count),
		avg_ms: S(e.avg_ms),
		max_ms: S(e.max_ms)
	};
}
var le = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getSnapshot(e = 60) {
		let { data: t } = await this.client.get("/api/v1/admin/metrics/snapshot", { window: String(e) });
		return w(t ?? {});
	}
	async getHistory(e = 60, t = 60) {
		let { data: n } = await this.client.get("/api/v1/admin/metrics/history", {
			minutes: String(e),
			resolution: String(t)
		});
		return C(n).map(T);
	}
	async getConnections(e = 15) {
		let { data: t } = await this.client.get("/api/v1/admin/metrics/connections", { ttl: String(e) });
		return C(t).map(E);
	}
	async getRoutes(e = 15, t = 20) {
		let { data: n } = await this.client.get("/api/v1/admin/metrics/routes", {
			minutes: String(e),
			limit: String(t)
		});
		return C(n).map(D);
	}
}, ue = {
	class: "metrics",
	"aria-labelledby": "metrics-heading"
}, de = { class: "metrics__head" }, fe = {
	key: 0,
	class: "metrics__snapshot"
}, pe = { class: "metrics__rate" }, me = { class: "metrics__rate" }, he = { class: "metrics__latency" }, ge = {
	key: 0,
	class: "metrics__snapshot-skel"
}, _e = { class: "metrics__grid" }, ve = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "bw-heading"
}, ye = { class: "metrics__card-head" }, be = {
	key: 0,
	class: "metrics__skel"
}, xe = {
	class: "metrics__card",
	"aria-labelledby": "lat-heading"
}, Se = { class: "metrics__card-head" }, Ce = {
	key: 0,
	class: "metrics__skel"
}, we = {
	class: "metrics__card",
	"aria-labelledby": "req-heading"
}, Te = { class: "metrics__card-head" }, Ee = {
	key: 0,
	class: "metrics__skel"
}, De = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "conn-heading"
}, Oe = { class: "metrics__card-head" }, ke = {
	key: 0,
	class: "metrics__skel"
}, Ae = {
	key: 3,
	class: "metrics__table",
	"aria-label": "Live connections"
}, je = { class: "metrics__mono" }, Me = { class: "metrics__mono" }, Ne = { class: "metrics__muted" }, Pe = { class: "metrics__bar-cell" }, Fe = { class: "metrics__bar-row" }, Ie = { class: "metrics__bar-wrap" }, Le = ["title"], Re = { class: "metrics__bar-label" }, ze = { class: "metrics__bar-row" }, Be = { class: "metrics__bar-wrap" }, Ve = ["title"], He = { class: "metrics__bar-label" }, Ue = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "routes-heading"
}, We = {
	key: 0,
	class: "metrics__skel"
}, Ge = {
	key: 3,
	class: "metrics__table",
	"aria-label": "Top routes by latency"
}, Ke = { class: "metrics__mono metrics__route" }, qe = { class: "metrics__mono" }, Je = {
	key: 1,
	class: "metrics__muted"
}, Ye = { class: "metrics__mono" }, Xe = { class: "metrics__mono" }, O = 5e3, k = 15e3, A = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "MetricsPage",
	props: { client: {} },
	setup(e) {
		let m = ie(() => import("./vue3-apexcharts-z_3dDCyH.js")), x = e, S = ae("apiBase", ""), C = s(() => typeof S == "string" ? S : S?.value ?? ""), w = new le(x.client ?? new ee({
			baseUrl: C.value,
			tokenStore: new t()
		})), T = te(), E = null, D = null, A = null, j = null, M = g(null), N = g([]), P = g([]), F = g([]), I = g(!0), L = g(!0), R = g(!0), z = g(!0), B = g(null), V = g(null), H = g(null), U = g(null);
		function W(e) {
			return e * 8 / 1e6;
		}
		function G(e) {
			return Date.parse(e.replace(" ", "T"));
		}
		let Ze = s(() => N.value.map((e) => {
			let t = G(e.bucket);
			return new Date(Number.isFinite(t) ? t : 0).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});
		})), Qe = s(() => [{
			name: "In (Mbps)",
			data: N.value.map((e) => Number(W(e.bytes_in).toFixed(3)))
		}, {
			name: "Out (Mbps)",
			data: N.value.map((e) => Number(W(e.bytes_out).toFixed(3)))
		}]), $e = s(() => [{
			name: "p50",
			data: N.value.map((e) => e.p50_ms)
		}, {
			name: "p95",
			data: N.value.map((e) => e.p95_ms)
		}]), et = s(() => [{
			name: "Requests",
			data: N.value.map((e) => e.requests)
		}, {
			name: "Errors",
			data: N.value.map((e) => e.errors)
		}]);
		function K(e) {
			return `${W(e).toFixed(2)} Mbps`;
		}
		function tt(e) {
			let t = Math.floor(Date.now() / 1e3 - e);
			if (t < 60) return `${t}s ago`;
			let n = Math.floor(t / 60);
			return n < 60 ? `${n}m ago` : `${Math.floor(n / 60)}h ago`;
		}
		function nt(e) {
			let t = G(e);
			return Number.isFinite(t) ? tt(Math.floor(t / 1e3)) : "—";
		}
		function rt(e) {
			return e < 100 ? "success" : e < 500 ? "warning" : "error";
		}
		function it(e) {
			switch ((e ?? "").toUpperCase()) {
				case "GET": return "accent";
				case "POST": return "success";
				case "PUT":
				case "PATCH": return "warning";
				case "DELETE": return "error";
				default: return "neutral";
			}
		}
		async function at() {
			B.value = null;
			try {
				M.value = await w.getSnapshot(60);
			} catch (e) {
				B.value = n(e, "Failed to load metrics snapshot."), T.error(B.value);
			} finally {
				I.value = !1;
			}
		}
		async function q() {
			V.value = null;
			try {
				N.value = await w.getHistory(60, 60);
			} catch (e) {
				V.value = n(e, "Failed to load history."), T.error(V.value);
			} finally {
				L.value = !1;
			}
		}
		async function J() {
			H.value = null;
			try {
				P.value = await w.getConnections(15);
			} catch (e) {
				H.value = n(e, "Failed to load connections."), T.error(H.value);
			} finally {
				R.value = !1;
			}
		}
		async function Y() {
			U.value = null;
			try {
				F.value = await w.getRoutes(15, 20);
			} catch (e) {
				U.value = n(e, "Failed to load routes."), T.error(U.value);
			} finally {
				z.value = !1;
			}
		}
		ce(() => {
			at(), q(), J(), Y(), E = setInterval(() => void at(), O), D = setInterval(() => void J(), O), A = setInterval(() => void q(), k), j = setInterval(() => void Y(), k);
		}), se(() => {
			E !== null && (clearInterval(E), E = null), D !== null && (clearInterval(D), D = null), A !== null && (clearInterval(A), A = null), j !== null && (clearInterval(j), j = null);
		});
		let X = {
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
		}, Z = s(() => ({
			categories: Ze.value,
			labels: {
				show: !0,
				rotate: -30,
				style: { fontSize: "11px" }
			},
			axisBorder: { show: !1 },
			axisTicks: { show: !1 }
		})), Q = (e) => ({ labels: {
			formatter: (t) => `${t}${e}`,
			style: { fontSize: "11px" }
		} }), $ = {
			borderColor: "var(--border-subtle)",
			strokeDashArray: 3,
			xaxis: { lines: { show: !1 } },
			yaxis: { lines: { show: !0 } }
		};
		return (e, t) => (h(), u("section", ue, [
			d("header", de, [t[0] ||= d("h1", {
				id: "metrics-heading",
				class: "metrics__title"
			}, "Server Traffic", -1), M.value !== null && !I.value ? (h(), u("div", fe, [
				p(i, { tone: "accent" }, {
					default: b(() => [f(v(M.value.active_connections) + " active connections", 1)]),
					_: 1
				}),
				d("span", pe, v(K(M.value.bytes_in_per_sec)) + " in / " + v(K(M.value.bytes_out_per_sec)) + " out ", 1),
				d("span", me, v(M.value.requests_per_sec.toFixed(1)) + " req/s · " + v((M.value.error_rate * 100).toFixed(2)) + "% errors ", 1),
				d("span", he, " p50 " + v(M.value.p50_ms) + "ms / p95 " + v(M.value.p95_ms) + "ms / p99 " + v(M.value.p99_ms) + "ms ", 1)
			])) : l("", !0)]),
			p(ne, null, {
				default: b(() => [...t[1] ||= [
					f(" Real-time server traffic graphs. ", -1),
					d("strong", null, "Bandwidth", -1),
					f(" shows in/out throughput, ", -1),
					d("strong", null, "Latency", -1),
					f(" shows response-time percentiles, and ", -1),
					d("strong", null, "Request Rate", -1),
					f(" shows requests vs. errors over time. Data refreshes automatically — snapshot every 5s, history every 15s. ", -1)
				]]),
				_: 1
			}),
			I.value ? (h(), u("div", ge, [p(a, {
				variant: "text",
				lines: 1
			})])) : l("", !0),
			d("div", _e, [
				d("section", ve, [d("header", ye, [t[3] ||= d("h2", {
					id: "bw-heading",
					class: "metrics__card-title"
				}, "Bandwidth", -1), p(i, { tone: "neutral" }, {
					default: b(() => [...t[2] ||= [f("Mbps", -1)]]),
					_: 1
				})]), L.value ? (h(), u("div", be, [p(a, {
					variant: "text",
					lines: 6
				})])) : V.value ? (h(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load bandwidth history",
					description: V.value
				}, {
					actions: b(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: b(() => [...t[4] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : N.value.length === 0 ? (h(), c(o, {
					key: 2,
					icon: "speed",
					title: "No bandwidth data yet"
				})) : (h(), c(y(m), {
					key: 3,
					type: "area",
					height: "220",
					options: {
						...X,
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
						yaxis: Q(" Mbps"),
						grid: $,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						}
					},
					series: Qe.value
				}, null, 8, ["options", "series"]))]),
				d("section", xe, [d("header", Se, [t[6] ||= d("h2", {
					id: "lat-heading",
					class: "metrics__card-title"
				}, "Latency", -1), p(i, { tone: "neutral" }, {
					default: b(() => [...t[5] ||= [f("ms", -1)]]),
					_: 1
				})]), L.value ? (h(), u("div", Ce, [p(a, {
					variant: "text",
					lines: 4
				})])) : V.value ? (h(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load latency history",
					description: V.value
				}, {
					actions: b(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: b(() => [...t[7] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : N.value.length === 0 ? (h(), c(o, {
					key: 2,
					icon: "speed",
					title: "No latency data yet"
				})) : (h(), c(y(m), {
					key: 3,
					type: "line",
					height: "200",
					options: {
						...X,
						chart: {
							id: "latency",
							group: "metrics",
							type: "line"
						},
						colors: ["#a78bfa", "#f97316"],
						xaxis: Z.value,
						yaxis: Q(" ms"),
						grid: $,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						}
					},
					series: $e.value
				}, null, 8, ["options", "series"]))]),
				d("section", we, [d("header", Te, [t[9] ||= d("h2", {
					id: "req-heading",
					class: "metrics__card-title"
				}, "Request Rate", -1), p(i, { tone: "neutral" }, {
					default: b(() => [...t[8] ||= [f("req", -1)]]),
					_: 1
				})]), L.value ? (h(), u("div", Ee, [p(a, {
					variant: "text",
					lines: 4
				})])) : V.value ? (h(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load request history",
					description: V.value
				}, {
					actions: b(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: b(() => [...t[10] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : N.value.length === 0 ? (h(), c(o, {
					key: 2,
					icon: "speed",
					title: "No request data yet"
				})) : (h(), c(y(m), {
					key: 3,
					type: "line",
					height: "200",
					options: {
						...X,
						chart: {
							id: "requests",
							group: "metrics",
							type: "line"
						},
						colors: ["#06b6d4", "#ef4444"],
						xaxis: Z.value,
						yaxis: Q(""),
						grid: $,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						},
						markers: { size: 0 }
					},
					series: et.value
				}, null, 8, ["options", "series"]))]),
				d("section", De, [d("header", Oe, [t[11] ||= d("h2", {
					id: "conn-heading",
					class: "metrics__card-title"
				}, "Live Connections", -1), P.value.length > 0 ? (h(), c(i, {
					key: 0,
					tone: "accent",
					label: `${P.value.length} active`
				}, {
					default: b(() => [f(v(P.value.length), 1)]),
					_: 1
				}, 8, ["label"])) : l("", !0)]), R.value ? (h(), u("div", ke, [p(a, {
					variant: "text",
					lines: 4
				})])) : H.value ? (h(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load connections",
					description: H.value
				}, {
					actions: b(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: J
					}, {
						default: b(() => [...t[12] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : P.value.length === 0 ? (h(), c(o, {
					key: 2,
					icon: "speed",
					title: "No active connections"
				})) : (h(), u("table", Ae, [t[13] ||= d("thead", null, [d("tr", null, [
					d("th", { scope: "col" }, "Remote"),
					d("th", { scope: "col" }, "User"),
					d("th", { scope: "col" }, "Kind"),
					d("th", { scope: "col" }, "Started"),
					d("th", {
						scope: "col",
						class: "metrics__th--bar"
					}, "Throughput (in / out)")
				])], -1), d("tbody", null, [(h(!0), u(re, null, _(P.value, (e) => (h(), u("tr", { key: e.id }, [
					d("td", je, v(e.remote_ip || "—"), 1),
					d("td", Me, v(e.user_id ?? "—"), 1),
					d("td", null, [p(i, { tone: "neutral" }, {
						default: b(() => [f(v(e.kind), 1)]),
						_: 2
					}, 1024)]),
					d("td", Ne, v(nt(e.opened_at)), 1),
					d("td", Pe, [d("div", Fe, [d("div", Ie, [d("div", {
						class: "metrics__bar metrics__bar--in",
						style: oe({ width: `${Math.min(100, W(e.bytes_in_rate))}%` }),
						title: `In: ${K(e.bytes_in_rate)}`
					}, null, 12, Le)]), d("span", Re, v(K(e.bytes_in_rate)), 1)]), d("div", ze, [d("div", Be, [d("div", {
						class: "metrics__bar metrics__bar--out",
						style: oe({ width: `${Math.min(100, W(e.bytes_out_rate))}%` }),
						title: `Out: ${K(e.bytes_out_rate)}`
					}, null, 12, Ve)]), d("span", He, v(K(e.bytes_out_rate)), 1)])])
				]))), 128))])]))]),
				d("section", Ue, [t[16] ||= d("header", { class: "metrics__card-head" }, [d("h2", {
					id: "routes-heading",
					class: "metrics__card-title"
				}, "Top Routes by Latency")], -1), z.value ? (h(), u("div", We, [p(a, {
					variant: "text",
					lines: 4
				})])) : U.value ? (h(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load routes",
					description: U.value
				}, {
					actions: b(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Y
					}, {
						default: b(() => [...t[14] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : F.value.length === 0 ? (h(), c(o, {
					key: 2,
					icon: "speed",
					title: "No route data yet"
				})) : (h(), u("table", Ge, [t[15] ||= d("thead", null, [d("tr", null, [
					d("th", { scope: "col" }, "Method"),
					d("th", { scope: "col" }, "Route"),
					d("th", { scope: "col" }, "Requests"),
					d("th", { scope: "col" }, "Errors"),
					d("th", { scope: "col" }, "Avg ms"),
					d("th", { scope: "col" }, "Max ms")
				])], -1), d("tbody", null, [(h(!0), u(re, null, _(F.value, (e) => (h(), u("tr", { key: `${e.method}:${e.route}` }, [
					d("td", null, [p(i, { tone: it(e.method) }, {
						default: b(() => [f(v(e.method), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					d("td", Ke, v(e.route), 1),
					d("td", qe, v(e.request_count.toLocaleString()), 1),
					d("td", null, [e.error_count > 0 ? (h(), c(i, {
						key: 0,
						tone: "error"
					}, {
						default: b(() => [f(v(e.error_count), 1)]),
						_: 2
					}, 1024)) : (h(), u("span", Je, "0"))]),
					d("td", Ye, v(e.avg_ms) + "ms", 1),
					d("td", Xe, [p(i, { tone: rt(e.max_ms) }, {
						default: b(() => [f(v(e.max_ms) + "ms", 1)]),
						_: 2
					}, 1032, ["tone"])])
				]))), 128))])]))])
			])
		]));
	}
}), [["__scopeId", "data-v-8469d0cf"]]);
//#endregion
export { A as default };

//# sourceMappingURL=MetricsPage-BwpFtE-X.js.map