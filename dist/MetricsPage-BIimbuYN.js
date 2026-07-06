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
		bucket: S(e.bucket),
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
		id: S(e.connection_id),
		kind: S(e.kind, "http"),
		remote_ip: S(e.remote_ip),
		user_id: e.user_id == null ? null : S(e.user_id),
		bytes_in_rate: C(e.bytes_in_rate),
		bytes_out_rate: C(e.bytes_out_rate),
		opened_at: S(e.opened_at)
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
}, Ae = { class: "metrics__mono" }, je = { class: "metrics__mono" }, Me = { class: "metrics__muted" }, Ne = { class: "metrics__bar-cell" }, Pe = { class: "metrics__bar-row" }, Fe = { class: "metrics__bar-wrap" }, Ie = ["title"], Le = { class: "metrics__bar-label" }, Re = { class: "metrics__bar-row" }, ze = { class: "metrics__bar-wrap" }, Be = ["title"], Ve = { class: "metrics__bar-label" }, He = {
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
}, Je = { class: "metrics__mono" }, Ye = { class: "metrics__mono" }, Xe = 5e3, k = 15e3, A = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "MetricsPage",
	props: { client: {} },
	setup(e) {
		let m = ie(() => import("./vue3-apexcharts-CXbuVpV3.js")), S = e, C = ae("apiBase", ""), w = s(() => typeof C == "string" ? C : C?.value ?? ""), T = new ce(S.client ?? new ee({
			baseUrl: w.value,
			tokenStore: new t()
		})), E = te(), D = null, O = null, A = null, j = null, M = _(null), N = _([]), P = _([]), F = _([]), I = _(!0), L = _(!0), Ze = _(!0), Qe = _(!0), R = _(null), z = _(null), B = _(null), V = _(null);
		function H(e) {
			return e * 8 / 1e6;
		}
		function $e(e) {
			return Date.parse(e.replace(" ", "T"));
		}
		let et = s(() => N.value.map((e) => {
			let t = $e(e.bucket);
			return new Date(Number.isFinite(t) ? t : 0).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});
		})), tt = s(() => [{
			name: "In (Mbps)",
			data: N.value.map((e) => Number(H(e.bytes_in).toFixed(3)))
		}, {
			name: "Out (Mbps)",
			data: N.value.map((e) => Number(H(e.bytes_out).toFixed(3)))
		}]), nt = s(() => [{
			name: "p50",
			data: N.value.map((e) => e.p50_ms)
		}, {
			name: "p95",
			data: N.value.map((e) => e.p95_ms)
		}]), rt = s(() => [{
			name: "Requests",
			data: N.value.map((e) => e.requests)
		}, {
			name: "Errors",
			data: N.value.map((e) => e.errors)
		}]);
		function U(e) {
			return `${H(e).toFixed(2)} Mbps`;
		}
		function it(e) {
			let t = Math.floor(Date.now() / 1e3 - e);
			if (t < 60) return `${t}s ago`;
			let n = Math.floor(t / 60);
			return n < 60 ? `${n}m ago` : `${Math.floor(n / 60)}h ago`;
		}
		function at(e) {
			let t = $e(e);
			return Number.isFinite(t) ? it(Math.floor(t / 1e3)) : "—";
		}
		function ot(e) {
			return e < 100 ? "success" : e < 500 ? "warning" : "error";
		}
		function st(e) {
			switch ((e ?? "").toUpperCase()) {
				case "GET": return "accent";
				case "POST": return "success";
				case "PUT":
				case "PATCH": return "warning";
				case "DELETE": return "error";
				default: return "neutral";
			}
		}
		async function W() {
			R.value = null;
			try {
				M.value = await T.getSnapshot(60);
			} catch (e) {
				R.value = n(e, "Failed to load metrics snapshot."), E.error(R.value);
			} finally {
				I.value = !1;
			}
		}
		async function G() {
			z.value = null;
			try {
				N.value = await T.getHistory(60, 60);
			} catch (e) {
				z.value = n(e, "Failed to load history."), E.error(z.value);
			} finally {
				L.value = !1;
			}
		}
		async function K() {
			B.value = null;
			try {
				P.value = await T.getConnections(15);
			} catch (e) {
				B.value = n(e, "Failed to load connections."), E.error(B.value);
			} finally {
				Ze.value = !1;
			}
		}
		async function q() {
			V.value = null;
			try {
				F.value = await T.getRoutes(15, 20);
			} catch (e) {
				V.value = n(e, "Failed to load routes."), E.error(V.value);
			} finally {
				Qe.value = !1;
			}
		}
		function J() {
			D !== null && (clearInterval(D), D = null), O !== null && (clearInterval(O), O = null), A !== null && (clearInterval(A), A = null), j !== null && (clearInterval(j), j = null);
		}
		function ct() {
			D === null && (D = setInterval(() => void W(), Xe)), O === null && (O = setInterval(() => void K(), Xe)), A === null && (A = setInterval(() => void G(), k)), j === null && (j = setInterval(() => void q(), k));
		}
		function Y() {
			document.hidden ? J() : ct();
		}
		se(() => {
			W(), G(), K(), q(), ct(), typeof document < "u" && document.addEventListener("visibilitychange", Y);
		}), oe(() => {
			J(), typeof document < "u" && document.removeEventListener("visibilitychange", Y);
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
			categories: et.value,
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
			}, "Server Traffic", -1), M.value !== null && !I.value ? (g(), u("div", de, [
				p(i, { tone: "accent" }, {
					default: x(() => [f(y(M.value.active_connections) + " active connections", 1)]),
					_: 1
				}),
				d("span", fe, y(U(M.value.bytes_in_per_sec)) + " in / " + y(U(M.value.bytes_out_per_sec)) + " out ", 1),
				d("span", pe, y(M.value.requests_per_sec.toFixed(1)) + " req/s · " + y((M.value.error_rate * 100).toFixed(2)) + "% errors ", 1),
				d("span", me, " p50 " + y(M.value.p50_ms) + "ms / p95 " + y(M.value.p95_ms) + "ms / p99 " + y(M.value.p99_ms) + "ms ", 1)
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
			I.value ? (g(), u("div", he, [p(a, {
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
				})]), L.value ? (g(), u("div", ye, [p(a, {
					variant: "text",
					lines: 6
				})])) : z.value ? (g(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load bandwidth history",
					description: z.value
				}, {
					actions: x(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: G
					}, {
						default: x(() => [...t[4] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : N.value.length === 0 ? (g(), c(o, {
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
					series: tt.value
				}, null, 8, ["options", "series"]))]),
				d("section", be, [d("header", xe, [t[6] ||= d("h2", {
					id: "lat-heading",
					class: "metrics__card-title"
				}, "Latency", -1), p(i, { tone: "neutral" }, {
					default: x(() => [...t[5] ||= [f("ms", -1)]]),
					_: 1
				})]), L.value ? (g(), u("div", Se, [p(a, {
					variant: "text",
					lines: 4
				})])) : z.value ? (g(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load latency history",
					description: z.value
				}, {
					actions: x(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: G
					}, {
						default: x(() => [...t[7] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : N.value.length === 0 ? (g(), c(o, {
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
					series: nt.value
				}, null, 8, ["options", "series"]))]),
				d("section", Ce, [d("header", we, [t[9] ||= d("h2", {
					id: "req-heading",
					class: "metrics__card-title"
				}, "Request Rate", -1), p(i, { tone: "neutral" }, {
					default: x(() => [...t[8] ||= [f("req", -1)]]),
					_: 1
				})]), L.value ? (g(), u("div", Te, [p(a, {
					variant: "text",
					lines: 4
				})])) : z.value ? (g(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load request history",
					description: z.value
				}, {
					actions: x(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: G
					}, {
						default: x(() => [...t[10] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : N.value.length === 0 ? (g(), c(o, {
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
					series: rt.value
				}, null, 8, ["options", "series"]))]),
				d("section", Ee, [d("header", De, [t[11] ||= d("h2", {
					id: "conn-heading",
					class: "metrics__card-title"
				}, "Live Connections", -1), P.value.length > 0 ? (g(), c(i, {
					key: 0,
					tone: "accent",
					label: `${P.value.length} active`
				}, {
					default: x(() => [f(y(P.value.length), 1)]),
					_: 1
				}, 8, ["label"])) : l("", !0)]), Ze.value ? (g(), u("div", Oe, [p(a, {
					variant: "text",
					lines: 4
				})])) : B.value ? (g(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load connections",
					description: B.value
				}, {
					actions: x(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: K
					}, {
						default: x(() => [...t[12] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : P.value.length === 0 ? (g(), c(o, {
					key: 2,
					icon: "speed",
					title: "No active connections"
				})) : (g(), u("table", ke, [t[13] ||= d("thead", null, [d("tr", null, [
					d("th", { scope: "col" }, "Remote"),
					d("th", { scope: "col" }, "User"),
					d("th", { scope: "col" }, "Kind"),
					d("th", { scope: "col" }, "Started"),
					d("th", {
						scope: "col",
						class: "metrics__th--bar"
					}, "Throughput (in / out)")
				])], -1), d("tbody", null, [(g(!0), u(re, null, v(P.value, (e) => (g(), u("tr", { key: e.id }, [
					d("td", Ae, y(e.remote_ip || "—"), 1),
					d("td", je, y(e.user_id ?? "—"), 1),
					d("td", null, [p(i, { tone: "neutral" }, {
						default: x(() => [f(y(e.kind), 1)]),
						_: 2
					}, 1024)]),
					d("td", Me, y(at(e.opened_at)), 1),
					d("td", Ne, [d("div", Pe, [d("div", Fe, [d("div", {
						class: "metrics__bar metrics__bar--in",
						style: h({ width: `${Math.min(100, H(e.bytes_in_rate))}%` }),
						title: `In: ${U(e.bytes_in_rate)}`
					}, null, 12, Ie)]), d("span", Le, y(U(e.bytes_in_rate)), 1)]), d("div", Re, [d("div", ze, [d("div", {
						class: "metrics__bar metrics__bar--out",
						style: h({ width: `${Math.min(100, H(e.bytes_out_rate))}%` }),
						title: `Out: ${U(e.bytes_out_rate)}`
					}, null, 12, Be)]), d("span", Ve, y(U(e.bytes_out_rate)), 1)])])
				]))), 128))])]))]),
				d("section", He, [t[16] ||= d("header", { class: "metrics__card-head" }, [d("h2", {
					id: "routes-heading",
					class: "metrics__card-title"
				}, "Top Routes by Latency")], -1), Qe.value ? (g(), u("div", Ue, [p(a, {
					variant: "text",
					lines: 4
				})])) : V.value ? (g(), c(o, {
					key: 1,
					icon: "alert",
					title: "Couldn't load routes",
					description: V.value
				}, {
					actions: x(() => [p(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: x(() => [...t[14] ||= [f("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : F.value.length === 0 ? (g(), c(o, {
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
				])], -1), d("tbody", null, [(g(!0), u(re, null, v(F.value, (e) => (g(), u("tr", { key: `${e.method}:${e.route}` }, [
					d("td", null, [p(i, { tone: st(e.method) }, {
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
					d("td", Ye, [p(i, { tone: ot(e.max_ms) }, {
						default: x(() => [f(y(e.max_ms) + "ms", 1)]),
						_: 2
					}, 1032, ["tone"])])
				]))), 128))])]))])
			])
		]));
	}
}), [["__scopeId", "data-v-842953d1"]]);
//#endregion
export { A as default };

//# sourceMappingURL=MetricsPage-BIimbuYN.js.map