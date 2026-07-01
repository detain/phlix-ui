import { n as e } from "./Icon-24ngwBUH.js";
import { c as t, f as n, t as ee } from "./client-fw74f3l_.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-CInT03Lp.js";
import { t as i } from "./Badge-DnDrMVUo.js";
import { t as a } from "./Skeleton-BUq2D39t.js";
import { t as o } from "./EmptyState-0XgHKEGf.js";
import { t as ne } from "./PageHint-DR8OWfto.js";
import { Fragment as re, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineAsyncComponent as ie, defineComponent as m, inject as ae, normalizeStyle as h, onBeforeUnmount as oe, onMounted as se, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, withCtx as x } from "vue";
//#region src/api/admin/metrics.ts
function S(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function C(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function w(e) {
	return Array.isArray(e) ? e : [];
}
function T(e) {
	return {
		bytes_in_per_sec: C(e.bytes_in_per_sec),
		bytes_out_per_sec: C(e.bytes_out_per_sec),
		active_connections: C(e.active_connections),
		requests_per_sec: C(e.requests_per_sec),
		error_rate: C(e.error_rate),
		p50_ms: C(e.p50_ms),
		p95_ms: C(e.p95_ms),
		p99_ms: C(e.p99_ms)
	};
}
function E(e) {
	return {
		bucket: C(e.bucket),
		bytes_in: C(e.bytes_in),
		bytes_out: C(e.bytes_out),
		requests: C(e.requests),
		errors: C(e.errors),
		p50_ms: C(e.p50_ms),
		p95_ms: C(e.p95_ms)
	};
}
function D(e) {
	return {
		id: S(e.id),
		remote_addr: S(e.remote_addr),
		user_id: e.user_id == null ? null : S(e.user_id),
		user_name: e.user_name == null ? null : S(e.user_name),
		started_at: S(e.started_at),
		bytes_in_rate: C(e.bytes_in_rate),
		bytes_out_rate: C(e.bytes_out_rate),
		requests: C(e.requests)
	};
}
function O(e) {
	return {
		method: S(e.method),
		route: S(e.route),
		request_count: C(e.request_count),
		error_count: C(e.error_count),
		avg_ms: C(e.avg_ms),
		max_ms: C(e.max_ms)
	};
}
var ce = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getSnapshot(e = 60) {
		let { data: t } = await this.client.get("/api/v1/admin/metrics/snapshot", { window: String(e) });
		return T(t ?? {});
	}
	async getHistory(e = 60, t = 60) {
		let { data: n } = await this.client.get("/api/v1/admin/metrics/history", {
			minutes: String(e),
			resolution: String(t)
		});
		return w(n).map(E);
	}
	async getConnections(e = 15) {
		let { data: t } = await this.client.get("/api/v1/admin/metrics/connections", { ttl: String(e) });
		return w(t).map(D);
	}
	async getRoutes(e = 15, t = 20) {
		let { data: n } = await this.client.get("/api/v1/admin/metrics/routes", {
			minutes: String(e),
			limit: String(t)
		});
		return w(n).map(O);
	}
}, le = {
	class: "metrics",
	"aria-labelledby": "metrics-heading"
}, ue = { class: "metrics__head" }, de = {
	key: 0,
	class: "metrics__snapshot"
}, fe = { class: "metrics__rate" }, pe = { class: "metrics__rate" }, me = { class: "metrics__latency" }, he = {
	key: 0,
	class: "metrics__snapshot-skel"
}, ge = { class: "metrics__grid" }, _e = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "bw-heading"
}, ve = { class: "metrics__card-head" }, ye = {
	key: 0,
	class: "metrics__skel"
}, be = {
	class: "metrics__card",
	"aria-labelledby": "lat-heading"
}, xe = { class: "metrics__card-head" }, Se = {
	key: 0,
	class: "metrics__skel"
}, Ce = {
	class: "metrics__card",
	"aria-labelledby": "req-heading"
}, we = { class: "metrics__card-head" }, Te = {
	key: 0,
	class: "metrics__skel"
}, Ee = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "conn-heading"
}, De = { class: "metrics__card-head" }, Oe = {
	key: 0,
	class: "metrics__skel"
}, ke = {
	key: 3,
	class: "metrics__table",
	"aria-label": "Live connections"
}, Ae = { class: "metrics__mono" }, je = { class: "metrics__muted" }, Me = { class: "metrics__bar-cell" }, Ne = { class: "metrics__bar-row" }, Pe = { class: "metrics__bar-wrap" }, Fe = ["title"], Ie = { class: "metrics__bar-label" }, Le = { class: "metrics__bar-row" }, Re = { class: "metrics__bar-wrap" }, ze = ["title"], Be = { class: "metrics__bar-label" }, Ve = { class: "metrics__mono" }, He = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "routes-heading"
}, Ue = {
	key: 0,
	class: "metrics__skel"
}, We = {
	key: 3,
	class: "metrics__table",
	"aria-label": "Top routes by latency"
}, Ge = { class: "metrics__mono metrics__route" }, Ke = { class: "metrics__mono" }, qe = {
	key: 1,
	class: "metrics__muted"
}, Je = { class: "metrics__mono" }, Ye = { class: "metrics__mono" }, k = 5e3, A = 15e3, j = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "MetricsPage",
	props: { client: {} },
	setup(e) {
		let m = ie(() => import("./vue3-apexcharts-z_3dDCyH.js")), S = e, C = ae("apiBase", ""), w = s(() => typeof C == "string" ? C : C?.value ?? ""), T = new ce(S.client ?? new ee({
			baseUrl: w.value,
			tokenStore: new t()
		})), E = te(), D = null, O = null, j = null, M = null, N = _(null), P = _([]), F = _([]), I = _([]), L = _(!0), R = _(!0), z = _(!0), B = _(!0), V = _(null), H = _(null), U = _(null), W = _(null);
		function G(e) {
			return e / 1e6;
		}
		let Xe = s(() => P.value.map((e) => (/* @__PURE__ */ new Date(e.bucket * 1e3)).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		}))), Ze = s(() => [{
			name: "In (Mbps)",
			data: P.value.map((e) => Number(G(e.bytes_in).toFixed(3)))
		}, {
			name: "Out (Mbps)",
			data: P.value.map((e) => Number(G(e.bytes_out).toFixed(3)))
		}]), Qe = s(() => [{
			name: "p50",
			data: P.value.map((e) => e.p50_ms)
		}, {
			name: "p95",
			data: P.value.map((e) => e.p95_ms)
		}]), $e = s(() => [{
			name: "Requests",
			data: P.value.map((e) => e.requests)
		}, {
			name: "Errors",
			data: P.value.map((e) => e.errors)
		}]);
		function K(e) {
			return `${G(e).toFixed(2)} Mbps`;
		}
		function et(e) {
			let t = Math.floor(Date.now() / 1e3 - e);
			if (t < 60) return `${t}s ago`;
			let n = Math.floor(t / 60);
			return n < 60 ? `${n}m ago` : `${Math.floor(n / 60)}h ago`;
		}
		function tt(e) {
			return e < 100 ? "success" : e < 500 ? "warning" : "error";
		}
		function nt(e) {
			switch ((e ?? "").toUpperCase()) {
				case "GET": return "accent";
				case "POST": return "success";
				case "PUT":
				case "PATCH": return "warning";
				case "DELETE": return "error";
				default: return "neutral";
			}
		}
		async function rt() {
			V.value = null;
			try {
				N.value = await T.getSnapshot(60);
			} catch (e) {
				V.value = n(e, "Failed to load metrics snapshot."), E.error(V.value);
			} finally {
				L.value = !1;
			}
		}
		async function q() {
			H.value = null;
			try {
				P.value = await T.getHistory(60, 60);
			} catch (e) {
				H.value = n(e, "Failed to load history."), E.error(H.value);
			} finally {
				R.value = !1;
			}
		}
		async function J() {
			U.value = null;
			try {
				F.value = await T.getConnections(15);
			} catch (e) {
				U.value = n(e, "Failed to load connections."), E.error(U.value);
			} finally {
				z.value = !1;
			}
		}
		async function Y() {
			W.value = null;
			try {
				I.value = await T.getRoutes(15, 20);
			} catch (e) {
				W.value = n(e, "Failed to load routes."), E.error(W.value);
			} finally {
				B.value = !1;
			}
		}
		se(() => {
			rt(), q(), J(), Y(), D = setInterval(() => void rt(), k), O = setInterval(() => void J(), k), j = setInterval(() => void q(), A), M = setInterval(() => void Y(), A);
		}), oe(() => {
			D !== null && (clearInterval(D), D = null), O !== null && (clearInterval(O), O = null), j !== null && (clearInterval(j), j = null), M !== null && (clearInterval(M), M = null);
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
			categories: Xe.value,
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
		return (e, t) => (g(), u("section", le, [
			d("header", ue, [t[0] ||= d("h1", {
				id: "metrics-heading",
				class: "metrics__title"
			}, "Server Traffic", -1), N.value !== null && !L.value ? (g(), u("div", de, [
				p(i, { tone: "accent" }, {
					default: x(() => [f(y(N.value.active_connections) + " active connections", 1)]),
					_: 1
				}),
				d("span", fe, y(K(N.value.bytes_in_per_sec)) + " in / " + y(K(N.value.bytes_out_per_sec)) + " out ", 1),
				d("span", pe, y(N.value.requests_per_sec.toFixed(1)) + " req/s · " + y((N.value.error_rate * 100).toFixed(2)) + "% errors ", 1),
				d("span", me, " p50 " + y(N.value.p50_ms) + "ms / p95 " + y(N.value.p95_ms) + "ms / p99 " + y(N.value.p99_ms) + "ms ", 1)
			])) : l("", !0)]),
			p(ne, null, {
				default: x(() => [...t[1] ||= [
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
			L.value ? (g(), u("div", he, [p(a, {
				variant: "text",
				lines: 1
			})])) : l("", !0),
			d("div", ge, [
				d("section", _e, [d("header", ve, [t[3] ||= d("h2", {
					id: "bw-heading",
					class: "metrics__card-title"
				}, "Bandwidth", -1), p(i, { tone: "neutral" }, {
					default: x(() => [...t[2] ||= [f("Mbps", -1)]]),
					_: 1
				})]), R.value ? (g(), u("div", ye, [p(a, {
					variant: "text",
					lines: 6
				})])) : H.value ? (g(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load bandwidth history",
					description: H.value
				}, {
					actions: x(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: x(() => [...t[4] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : P.value.length === 0 ? (g(), c(o, {
					key: 2,
					icon: "speed",
					title: "No bandwidth data yet"
				})) : (g(), c(b(m), {
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
					series: Ze.value
				}, null, 8, ["options", "series"]))]),
				d("section", be, [d("header", xe, [t[6] ||= d("h2", {
					id: "lat-heading",
					class: "metrics__card-title"
				}, "Latency", -1), p(i, { tone: "neutral" }, {
					default: x(() => [...t[5] ||= [f("ms", -1)]]),
					_: 1
				})]), R.value ? (g(), u("div", Se, [p(a, {
					variant: "text",
					lines: 4
				})])) : H.value ? (g(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load latency history",
					description: H.value
				}, {
					actions: x(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: x(() => [...t[7] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : P.value.length === 0 ? (g(), c(o, {
					key: 2,
					icon: "speed",
					title: "No latency data yet"
				})) : (g(), c(b(m), {
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
					series: Qe.value
				}, null, 8, ["options", "series"]))]),
				d("section", Ce, [d("header", we, [t[9] ||= d("h2", {
					id: "req-heading",
					class: "metrics__card-title"
				}, "Request Rate", -1), p(i, { tone: "neutral" }, {
					default: x(() => [...t[8] ||= [f("req", -1)]]),
					_: 1
				})]), R.value ? (g(), u("div", Te, [p(a, {
					variant: "text",
					lines: 4
				})])) : H.value ? (g(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load request history",
					description: H.value
				}, {
					actions: x(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: x(() => [...t[10] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : P.value.length === 0 ? (g(), c(o, {
					key: 2,
					icon: "speed",
					title: "No request data yet"
				})) : (g(), c(b(m), {
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
					series: $e.value
				}, null, 8, ["options", "series"]))]),
				d("section", Ee, [d("header", De, [t[11] ||= d("h2", {
					id: "conn-heading",
					class: "metrics__card-title"
				}, "Live Connections", -1), F.value.length > 0 ? (g(), c(i, {
					key: 0,
					tone: "accent",
					label: `${F.value.length} active`
				}, {
					default: x(() => [f(y(F.value.length), 1)]),
					_: 1
				}, 8, ["label"])) : l("", !0)]), z.value ? (g(), u("div", Oe, [p(a, {
					variant: "text",
					lines: 4
				})])) : U.value ? (g(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load connections",
					description: U.value
				}, {
					actions: x(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: J
					}, {
						default: x(() => [...t[12] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : F.value.length === 0 ? (g(), c(o, {
					key: 2,
					icon: "speed",
					title: "No active connections"
				})) : (g(), u("table", ke, [t[13] ||= d("thead", null, [d("tr", null, [
					d("th", { scope: "col" }, "Remote"),
					d("th", { scope: "col" }, "User"),
					d("th", { scope: "col" }, "Started"),
					d("th", {
						scope: "col",
						class: "metrics__th--bar"
					}, "Throughput (in / out)"),
					d("th", { scope: "col" }, "Requests")
				])], -1), d("tbody", null, [(g(!0), u(re, null, v(F.value, (e) => (g(), u("tr", { key: e.id }, [
					d("td", Ae, y(e.remote_addr), 1),
					d("td", null, y(e.user_name ?? "—"), 1),
					d("td", je, y(et(Math.floor(new Date(e.started_at).getTime() / 1e3))), 1),
					d("td", Me, [d("div", Ne, [d("div", Pe, [d("div", {
						class: "metrics__bar metrics__bar--in",
						style: h({ width: `${Math.min(100, e.bytes_in_rate / (1024 * 1024) * 10)}%` }),
						title: `In: ${K(e.bytes_in_rate)}`
					}, null, 12, Fe)]), d("span", Ie, y(K(e.bytes_in_rate)), 1)]), d("div", Le, [d("div", Re, [d("div", {
						class: "metrics__bar metrics__bar--out",
						style: h({ width: `${Math.min(100, e.bytes_out_rate / (1024 * 1024) * 10)}%` }),
						title: `Out: ${K(e.bytes_out_rate)}`
					}, null, 12, ze)]), d("span", Be, y(K(e.bytes_out_rate)), 1)])]),
					d("td", Ve, y(e.requests.toLocaleString()), 1)
				]))), 128))])]))]),
				d("section", He, [t[16] ||= d("header", { class: "metrics__card-head" }, [d("h2", {
					id: "routes-heading",
					class: "metrics__card-title"
				}, "Top Routes by Latency")], -1), B.value ? (g(), u("div", Ue, [p(a, {
					variant: "text",
					lines: 4
				})])) : W.value ? (g(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load routes",
					description: W.value
				}, {
					actions: x(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Y
					}, {
						default: x(() => [...t[14] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : I.value.length === 0 ? (g(), c(o, {
					key: 2,
					icon: "speed",
					title: "No route data yet"
				})) : (g(), u("table", We, [t[15] ||= d("thead", null, [d("tr", null, [
					d("th", { scope: "col" }, "Method"),
					d("th", { scope: "col" }, "Route"),
					d("th", { scope: "col" }, "Requests"),
					d("th", { scope: "col" }, "Errors"),
					d("th", { scope: "col" }, "Avg ms"),
					d("th", { scope: "col" }, "Max ms")
				])], -1), d("tbody", null, [(g(!0), u(re, null, v(I.value, (e) => (g(), u("tr", { key: `${e.method}:${e.route}` }, [
					d("td", null, [p(i, { tone: nt(e.method) }, {
						default: x(() => [f(y(e.method), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					d("td", Ge, y(e.route), 1),
					d("td", Ke, y(e.request_count.toLocaleString()), 1),
					d("td", null, [e.error_count > 0 ? (g(), c(i, {
						key: 0,
						tone: "error"
					}, {
						default: x(() => [f(y(e.error_count), 1)]),
						_: 2
					}, 1024)) : (g(), u("span", qe, "0"))]),
					d("td", Je, y(e.avg_ms) + "ms", 1),
					d("td", Ye, [p(i, { tone: tt(e.max_ms) }, {
						default: x(() => [f(y(e.max_ms) + "ms", 1)]),
						_: 2
					}, 1032, ["tone"])])
				]))), 128))])]))])
			])
		]));
	}
}), [["__scopeId", "data-v-023cfc80"]]);
//#endregion
export { j as default };

//# sourceMappingURL=MetricsPage-BDlHLBSv.js.map