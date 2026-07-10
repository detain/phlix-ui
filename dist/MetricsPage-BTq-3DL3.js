import { n as e } from "./Icon-Bd1lZf6E.js";
import { c as t, f as n, t as r } from "./client-DH50wjeq.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./NetworkHealthIndicator-DjckNvxw.js";
import { t as o } from "./Button-CnyfCnhY.js";
import { t as s } from "./Badge-Dq-pYhrz.js";
import { t as c } from "./Select-CcnHklAn.js";
import { t as l } from "./Skeleton-CzU_l53W.js";
import { t as u } from "./EmptyState-588Z_81C.js";
import { t as ee } from "./PageHint-7Giwob0l.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineAsyncComponent as te, defineComponent as y, inject as ne, normalizeClass as b, normalizeStyle as re, onBeforeUnmount as ie, onMounted as ae, openBlock as x, ref as S, renderList as oe, toDisplayString as C, unref as se, withCtx as w } from "vue";
//#region src/api/admin/metrics.ts
function T(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function E(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function D(e) {
	return Array.isArray(e) ? e : [];
}
function O(e) {
	return {
		bytes_in_per_sec: E(e.bytes_in_per_sec),
		bytes_out_per_sec: E(e.bytes_out_per_sec),
		active_connections: E(e.active_connections),
		requests_per_sec: E(e.requests_per_sec),
		error_rate: E(e.error_rate),
		p50_ms: E(e.p50_ms),
		p95_ms: E(e.p95_ms),
		p99_ms: E(e.p99_ms)
	};
}
function k(e) {
	return {
		bucket: T(e.bucket),
		bytes_in: E(e.bytes_in),
		bytes_out: E(e.bytes_out),
		requests: E(e.requests),
		errors: E(e.errors),
		p50_ms: E(e.p50_ms),
		p95_ms: E(e.p95_ms)
	};
}
function A(e) {
	return {
		id: T(e.connection_id),
		kind: T(e.kind, "http"),
		remote_ip: T(e.remote_ip),
		user_id: e.user_id == null ? null : T(e.user_id),
		bytes_in_rate: E(e.bytes_in_rate),
		bytes_out_rate: E(e.bytes_out_rate),
		opened_at: T(e.opened_at)
	};
}
function j(e) {
	return {
		method: T(e.method),
		route: T(e.route),
		request_count: E(e.request_count),
		error_count: E(e.error_count),
		avg_ms: E(e.avg_ms),
		max_ms: E(e.max_ms)
	};
}
var ce = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getSnapshot(e = 60) {
		let { data: t } = await this.client.get("/api/v1/admin/metrics/snapshot", { window: String(e) });
		return O(t ?? {});
	}
	async getHistory(e = 60, t = 60) {
		let { data: n } = await this.client.get("/api/v1/admin/metrics/history", {
			minutes: String(e),
			resolution: String(t)
		});
		return D(n).map(k);
	}
	async getConnections(e = 15) {
		let { data: t } = await this.client.get("/api/v1/admin/metrics/connections", { ttl: String(e) });
		return D(t).map(A);
	}
	async getRoutes(e = 15, t = 20) {
		let { data: n } = await this.client.get("/api/v1/admin/metrics/routes", {
			minutes: String(e),
			limit: String(t)
		});
		return D(n).map(j);
	}
};
//#endregion
//#region src/api/admin/servers.ts
function M(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function N(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function P(e, t = !1) {
	return e === !0 || e === 1 || e === "1" || e === "true" || t;
}
function F(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function I(e) {
	return {
		id: M(e.id ?? e.serverId),
		name: M(e.name ?? e.serverName),
		hostname: M(e.hostname),
		version: M(e.version),
		online: P(e.online, !0),
		lastSeenAt: N(e.lastSeenAt ?? e.last_seen_at, 0) || null,
		activeSessionCount: N(e.activeSessionCount ?? e.active_session_count),
		uptimeSeconds: N(e.uptimeSeconds ?? e.uptime_seconds),
		libraryCount: N(e.libraryCount ?? e.library_count),
		totalItemCount: N(e.totalItemCount ?? e.total_item_count),
		totalStorageBytes: N(e.totalStorageBytes ?? e.total_storage_bytes)
	};
}
function L(e) {
	let t = (Array.isArray(e.hostnameCandidates) ? e.hostnameCandidates : [])[0];
	return {
		id: M(e.id ?? e.serverId),
		name: M(e.name ?? e.serverName),
		hostname: M(e.hostname) || t || "",
		online: P(e.online, !0),
		lastSeenAt: N(e.lastSeenAt ?? e.last_seen_at, 0) || null,
		url: t
	};
}
var le = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async listServers() {
		let { data: e } = await this.client.get("/api/v1/servers");
		return Array.isArray(e) ? e.map(L) : [];
	}
	async getServerInfo(e) {
		let { data: t } = await this.client.get(`/api/v1/servers/${encodeURIComponent(e)}`);
		return I(F(t) ? t : {});
	}
}, R = {
	key: 0,
	class: "server-info__skel"
}, z = { class: "server-info__header" }, ue = { class: "server-info__identity" }, B = { class: "server-info__hostname" }, V = { class: "server-info__stats" }, H = { class: "server-info__stat" }, U = { class: "server-info__stat-value" }, W = { class: "server-info__stat-num" }, G = { class: "server-info__stat" }, K = { class: "server-info__stat-value" }, q = { class: "server-info__stat-num" }, J = { class: "server-info__stat" }, Y = { class: "server-info__stat-value" }, X = { class: "server-info__stat-num" }, Z = { class: "server-info__stat" }, de = { class: "server-info__stat-value" }, fe = { class: "server-info__stat-num" }, pe = { class: "server-info__stat" }, me = { class: "server-info__stat-value" }, he = { class: "server-info__stat-num" }, Q = {
	key: 2,
	class: "server-info__empty"
}, ge = /*#__PURE__*/ e(/* @__PURE__ */ y({
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
		let i = f(() => t.serverInfo?.online ? "success" : "error"), a = f(() => t.serverInfo?.online ? "Online" : "Offline");
		return (t, o) => (x(), h("div", { class: b(["server-info", { "is-loading": e.loading }]) }, [e.loading && !e.serverInfo ? (x(), h("div", R, [...o[0] ||= [
			g("div", { class: "skel-line skel-line--short" }, null, -1),
			g("div", { class: "skel-line" }, null, -1),
			g("div", { class: "skel-line skel-line--medium" }, null, -1)
		]])) : e.serverInfo ? (x(), h(d, { key: 1 }, [g("div", z, [g("div", ue, [g("h3", B, C(e.serverInfo.hostname || e.serverInfo.name), 1), e.serverInfo.version ? (x(), p(s, {
			key: 0,
			tone: "neutral",
			mono: ""
		}, {
			default: w(() => [_(" v" + C(e.serverInfo.version), 1)]),
			_: 1
		})) : m("", !0)]), v(s, {
			tone: i.value,
			label: a.value
		}, {
			default: w(() => [o[1] ||= g("span", {
				class: "server-info__dot",
				"aria-hidden": "true"
			}, null, -1), _(" " + C(a.value), 1)]),
			_: 1
		}, 8, ["tone", "label"])]), g("dl", V, [
			g("div", H, [o[2] ||= g("dt", { class: "server-info__stat-label" }, "Active sessions", -1), g("dd", U, [g("span", W, C(e.serverInfo.activeSessionCount.toLocaleString()), 1)])]),
			g("div", G, [o[3] ||= g("dt", { class: "server-info__stat-label" }, "Uptime", -1), g("dd", K, [g("span", q, C(n(e.serverInfo.uptimeSeconds)), 1)])]),
			g("div", J, [o[4] ||= g("dt", { class: "server-info__stat-label" }, "Libraries", -1), g("dd", Y, [g("span", X, C(e.serverInfo.libraryCount.toLocaleString()), 1)])]),
			g("div", Z, [o[5] ||= g("dt", { class: "server-info__stat-label" }, "Total items", -1), g("dd", de, [g("span", fe, C(e.serverInfo.totalItemCount.toLocaleString()), 1)])]),
			g("div", pe, [o[6] ||= g("dt", { class: "server-info__stat-label" }, "Storage used", -1), g("dd", me, [g("span", he, C(r(e.serverInfo.totalStorageBytes)), 1)])])
		])], 64)) : (x(), h("p", Q, "No server information available."))], 2));
	}
}), [["__scopeId", "data-v-4e386c5f"]]), _e = {
	key: 0,
	class: "server-selector__status",
	"aria-live": "polite"
}, ve = { class: "server-selector__last-seen" }, ye = {
	key: 1,
	class: "server-selector__status"
}, be = /*#__PURE__*/ e(/* @__PURE__ */ y({
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
		let a = f(() => n.servers.map((e) => {
			let t = e.hostname || e.name;
			return {
				value: e.id,
				label: t,
				title: `Last seen: ${i(e.lastSeenAt)}`
			};
		})), o = f(() => n.modelValue ?? null), s = f(() => n.servers.length > 1 ? [{
			value: "",
			label: "All servers"
		}, ...a.value] : a.value);
		function l(e) {
			let t = e === "" || e === null ? null : String(e);
			r("update:modelValue", t), r("change", t);
		}
		let u = f(() => n.servers.find((e) => e.id === n.modelValue)), ee = f(() => {
			let e = u.value;
			return e ? e.online ? "success" : "error" : "neutral";
		});
		return (t, n) => (x(), h("div", { class: b(["server-selector", { "is-loading": e.loading }]) }, [v(c, {
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
		]), u.value ? (x(), h("div", _e, [g("span", {
			class: b(["server-selector__dot", `server-selector__dot--${ee.value}`]),
			"aria-hidden": "true"
		}, null, 2), g("span", ve, " Last seen: " + C(i(u.value.lastSeenAt)), 1)])) : e.servers.length === 0 && !e.loading ? (x(), h("div", ye, [...n[0] ||= [g("span", { class: "server-selector__hint" }, "No servers available.", -1)]])) : m("", !0)], 2));
	}
}), [["__scopeId", "data-v-c02c7539"]]), xe = {
	class: "metrics",
	"aria-labelledby": "metrics-heading"
}, Se = { class: "metrics__head" }, Ce = { class: "metrics__title-row" }, we = {
	key: 0,
	class: "metrics__snapshot"
}, Te = { class: "metrics__rate" }, Ee = { class: "metrics__rate" }, De = { class: "metrics__latency" }, Oe = {
	key: 0,
	class: "metrics__server-info"
}, ke = {
	key: 1,
	class: "metrics__snapshot-skel"
}, Ae = { class: "metrics__grid" }, je = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "bw-heading"
}, Me = { class: "metrics__card-head" }, Ne = {
	key: 0,
	class: "metrics__skel"
}, Pe = {
	class: "metrics__card",
	"aria-labelledby": "lat-heading"
}, Fe = { class: "metrics__card-head" }, Ie = {
	key: 0,
	class: "metrics__skel"
}, Le = {
	class: "metrics__card",
	"aria-labelledby": "req-heading"
}, Re = { class: "metrics__card-head" }, ze = {
	key: 0,
	class: "metrics__skel"
}, Be = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "conn-heading"
}, Ve = { class: "metrics__card-head" }, He = {
	key: 0,
	class: "metrics__skel"
}, Ue = {
	key: 3,
	class: "metrics__table",
	"aria-label": "Live connections"
}, We = { class: "metrics__mono" }, Ge = { class: "metrics__mono" }, Ke = { class: "metrics__muted" }, qe = { class: "metrics__bar-cell" }, Je = { class: "metrics__bar-row" }, Ye = { class: "metrics__bar-wrap" }, Xe = ["title"], Ze = { class: "metrics__bar-label" }, Qe = { class: "metrics__bar-row" }, $e = { class: "metrics__bar-wrap" }, et = ["title"], tt = { class: "metrics__bar-label" }, nt = {
	class: "metrics__card metrics__card--full",
	"aria-labelledby": "routes-heading"
}, rt = {
	key: 0,
	class: "metrics__skel"
}, it = {
	key: 3,
	class: "metrics__table",
	"aria-label": "Top routes by latency"
}, at = { class: "metrics__mono metrics__route" }, ot = { class: "metrics__mono" }, st = {
	key: 1,
	class: "metrics__muted"
}, ct = { class: "metrics__mono" }, lt = { class: "metrics__mono" }, ut = 5e3, dt = 15e3, ft = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "MetricsPage",
	props: { client: {} },
	setup(e) {
		let c = te(() => import("./vue3-apexcharts-ByuC6SKP.js")), y = e, b = ne("apiBase", ""), T = f(() => typeof b == "string" ? b : b?.value ?? ""), E = new ce(y.client ?? new r({
			baseUrl: T.value,
			tokenStore: new t()
		})), D = new le(y.client ?? new r({
			baseUrl: T.value,
			tokenStore: new t()
		})), O = i(), k = null, A = null, j = null, M = null, N = S(null), P = S([]), F = S([]), I = S([]), L = S(!0), R = S(!0), z = S(!0), ue = S(!0), B = S(null), V = S(null), H = S(null), U = S(null), W = S([]), G = S(null), K = S(null), q = S(!0), J = S(!0), Y = S(null), X = S(null);
		function Z(e) {
			return e * 8 / 1e6;
		}
		function de(e) {
			return Date.parse(e.replace(" ", "T"));
		}
		let fe = f(() => P.value.map((e) => {
			let t = de(e.bucket);
			return new Date(Number.isFinite(t) ? t : 0).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});
		})), pe = f(() => [{
			name: "In (Mbps)",
			data: P.value.map((e) => Number(Z(e.bytes_in).toFixed(3)))
		}, {
			name: "Out (Mbps)",
			data: P.value.map((e) => Number(Z(e.bytes_out).toFixed(3)))
		}]), me = f(() => [{
			name: "p50",
			data: P.value.map((e) => e.p50_ms)
		}, {
			name: "p95",
			data: P.value.map((e) => e.p95_ms)
		}]), he = f(() => [{
			name: "Requests",
			data: P.value.map((e) => e.requests)
		}, {
			name: "Errors",
			data: P.value.map((e) => e.errors)
		}]);
		function Q(e) {
			return `${Z(e).toFixed(2)} Mbps`;
		}
		function _e(e) {
			let t = Math.floor(Date.now() / 1e3 - e);
			if (t < 60) return `${t}s ago`;
			let n = Math.floor(t / 60);
			return n < 60 ? `${n}m ago` : `${Math.floor(n / 60)}h ago`;
		}
		function ve(e) {
			let t = de(e);
			return Number.isFinite(t) ? _e(Math.floor(t / 1e3)) : "—";
		}
		function ye(e) {
			return e < 100 ? "success" : e < 500 ? "warning" : "error";
		}
		function ft(e) {
			switch ((e ?? "").toUpperCase()) {
				case "GET": return "accent";
				case "POST": return "success";
				case "PUT":
				case "PATCH": return "warning";
				case "DELETE": return "error";
				default: return "neutral";
			}
		}
		async function pt() {
			B.value = null;
			try {
				N.value = await E.getSnapshot(60);
			} catch (e) {
				B.value = n(e, "Failed to load metrics snapshot."), O.error(B.value);
			} finally {
				L.value = !1;
			}
		}
		async function $() {
			V.value = null;
			try {
				P.value = await E.getHistory(60, 60);
			} catch (e) {
				V.value = n(e, "Failed to load history."), O.error(V.value);
			} finally {
				R.value = !1;
			}
		}
		async function mt() {
			H.value = null;
			try {
				F.value = await E.getConnections(15);
			} catch (e) {
				H.value = n(e, "Failed to load connections."), O.error(H.value);
			} finally {
				z.value = !1;
			}
		}
		async function ht() {
			U.value = null;
			try {
				I.value = await E.getRoutes(15, 20);
			} catch (e) {
				U.value = n(e, "Failed to load routes."), O.error(U.value);
			} finally {
				ue.value = !1;
			}
		}
		async function gt() {
			Y.value = null;
			try {
				W.value = await D.listServers();
			} catch (e) {
				Y.value = n(e, "Failed to load servers."), O.error(Y.value);
			} finally {
				q.value = !1;
			}
		}
		async function _t(e) {
			if (X.value = null, !e) {
				G.value = null, J.value = !1;
				return;
			}
			try {
				G.value = await D.getServerInfo(e);
			} catch (e) {
				X.value = n(e, "Failed to load server info."), O.error(X.value);
			} finally {
				J.value = !1;
			}
		}
		function vt(e) {
			K.value = e, J.value = !0, _t(e);
		}
		function yt() {
			k !== null && (clearInterval(k), k = null), A !== null && (clearInterval(A), A = null), j !== null && (clearInterval(j), j = null), M !== null && (clearInterval(M), M = null);
		}
		function bt() {
			k === null && (k = setInterval(() => void pt(), ut)), A === null && (A = setInterval(() => void mt(), ut)), j === null && (j = setInterval(() => void $(), dt)), M === null && (M = setInterval(() => void ht(), dt));
		}
		function xt() {
			document.hidden ? yt() : bt();
		}
		ae(() => {
			gt(), pt(), $(), mt(), ht(), bt(), typeof document < "u" && document.addEventListener("visibilitychange", xt);
		}), ie(() => {
			yt(), typeof document < "u" && document.removeEventListener("visibilitychange", xt);
		});
		let St = {
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
		}, Ct = f(() => ({
			categories: fe.value,
			labels: {
				show: !0,
				rotate: -30,
				style: { fontSize: "11px" }
			},
			axisBorder: { show: !1 },
			axisTicks: { show: !1 }
		})), wt = (e) => ({ labels: {
			formatter: (t) => `${t}${e}`,
			style: { fontSize: "11px" }
		} }), Tt = {
			borderColor: "var(--border-subtle)",
			strokeDashArray: 3,
			xaxis: { lines: { show: !1 } },
			yaxis: { lines: { show: !0 } }
		};
		return (e, t) => (x(), h("section", xe, [
			g("header", Se, [g("div", Ce, [
				t[1] ||= g("h1", {
					id: "metrics-heading",
					class: "metrics__title"
				}, "Server Traffic", -1),
				v(be, {
					modelValue: K.value,
					"onUpdate:modelValue": t[0] ||= (e) => K.value = e,
					servers: W.value,
					loading: q.value,
					onChange: vt
				}, null, 8, [
					"modelValue",
					"servers",
					"loading"
				]),
				v(a)
			]), N.value !== null && !L.value ? (x(), h("div", we, [
				v(s, { tone: "accent" }, {
					default: w(() => [_(C(N.value.active_connections) + " active connections", 1)]),
					_: 1
				}),
				g("span", Te, C(Q(N.value.bytes_in_per_sec)) + " in / " + C(Q(N.value.bytes_out_per_sec)) + " out ", 1),
				g("span", Ee, C(N.value.requests_per_sec.toFixed(1)) + " req/s · " + C((N.value.error_rate * 100).toFixed(2)) + "% errors ", 1),
				g("span", De, " p50 " + C(N.value.p50_ms) + "ms / p95 " + C(N.value.p95_ms) + "ms / p99 " + C(N.value.p99_ms) + "ms ", 1)
			])) : m("", !0)]),
			v(ee, null, {
				default: w(() => [...t[2] ||= [
					_(" Real-time server traffic graphs. ", -1),
					g("strong", null, "Bandwidth", -1),
					_(" shows in/out throughput, ", -1),
					g("strong", null, "Latency", -1),
					_(" shows response-time percentiles, and ", -1),
					g("strong", null, "Request Rate", -1),
					_(" shows requests vs. errors over time. Data refreshes automatically — snapshot every 5s, history every 15s. ", -1)
				]]),
				_: 1
			}),
			W.value.length > 0 ? (x(), h("div", Oe, [v(ge, {
				"server-info": G.value,
				loading: J.value
			}, null, 8, ["server-info", "loading"])])) : m("", !0),
			L.value ? (x(), h("div", ke, [v(l, {
				variant: "text",
				lines: 1
			})])) : m("", !0),
			g("div", Ae, [
				g("section", je, [g("header", Me, [t[4] ||= g("h2", {
					id: "bw-heading",
					class: "metrics__card-title"
				}, "Bandwidth", -1), v(s, { tone: "neutral" }, {
					default: w(() => [...t[3] ||= [_("Mbps", -1)]]),
					_: 1
				})]), R.value ? (x(), h("div", Ne, [v(l, {
					variant: "text",
					lines: 6
				})])) : V.value ? (x(), p(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load bandwidth history",
					description: V.value
				}, {
					actions: w(() => [v(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: w(() => [...t[5] ||= [_("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : P.value.length === 0 ? (x(), p(u, {
					key: 2,
					icon: "speed",
					title: "No bandwidth data yet"
				})) : (x(), p(se(c), {
					key: 3,
					type: "area",
					height: "220",
					options: {
						...St,
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
						xaxis: Ct.value,
						yaxis: wt(" Mbps"),
						grid: Tt,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						}
					},
					series: pe.value
				}, null, 8, ["options", "series"]))]),
				g("section", Pe, [g("header", Fe, [t[7] ||= g("h2", {
					id: "lat-heading",
					class: "metrics__card-title"
				}, "Latency", -1), v(s, { tone: "neutral" }, {
					default: w(() => [...t[6] ||= [_("ms", -1)]]),
					_: 1
				})]), R.value ? (x(), h("div", Ie, [v(l, {
					variant: "text",
					lines: 4
				})])) : V.value ? (x(), p(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load latency history",
					description: V.value
				}, {
					actions: w(() => [v(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: w(() => [...t[8] ||= [_("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : P.value.length === 0 ? (x(), p(u, {
					key: 2,
					icon: "speed",
					title: "No latency data yet"
				})) : (x(), p(se(c), {
					key: 3,
					type: "line",
					height: "200",
					options: {
						...St,
						chart: {
							id: "latency",
							group: "metrics",
							type: "line"
						},
						colors: ["#a78bfa", "#f97316"],
						xaxis: Ct.value,
						yaxis: wt(" ms"),
						grid: Tt,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						}
					},
					series: me.value
				}, null, 8, ["options", "series"]))]),
				g("section", Le, [g("header", Re, [t[10] ||= g("h2", {
					id: "req-heading",
					class: "metrics__card-title"
				}, "Request Rate", -1), v(s, { tone: "neutral" }, {
					default: w(() => [...t[9] ||= [_("req", -1)]]),
					_: 1
				})]), R.value ? (x(), h("div", ze, [v(l, {
					variant: "text",
					lines: 4
				})])) : V.value ? (x(), p(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load request history",
					description: V.value
				}, {
					actions: w(() => [v(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: w(() => [...t[11] ||= [_("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : P.value.length === 0 ? (x(), p(u, {
					key: 2,
					icon: "speed",
					title: "No request data yet"
				})) : (x(), p(se(c), {
					key: 3,
					type: "line",
					height: "200",
					options: {
						...St,
						chart: {
							id: "requests",
							group: "metrics",
							type: "line"
						},
						colors: ["#06b6d4", "#ef4444"],
						xaxis: Ct.value,
						yaxis: wt(""),
						grid: Tt,
						legend: {
							show: !0,
							position: "top",
							horizontalAlign: "right"
						},
						markers: { size: 0 }
					},
					series: he.value
				}, null, 8, ["options", "series"]))]),
				g("section", Be, [g("header", Ve, [t[12] ||= g("h2", {
					id: "conn-heading",
					class: "metrics__card-title"
				}, "Live Connections", -1), F.value.length > 0 ? (x(), p(s, {
					key: 0,
					tone: "accent",
					label: `${F.value.length} active`
				}, {
					default: w(() => [_(C(F.value.length), 1)]),
					_: 1
				}, 8, ["label"])) : m("", !0)]), z.value ? (x(), h("div", He, [v(l, {
					variant: "text",
					lines: 4
				})])) : H.value ? (x(), p(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load connections",
					description: H.value
				}, {
					actions: w(() => [v(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: mt
					}, {
						default: w(() => [...t[13] ||= [_("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : F.value.length === 0 ? (x(), p(u, {
					key: 2,
					icon: "speed",
					title: "No active connections"
				})) : (x(), h("table", Ue, [t[14] ||= g("thead", null, [g("tr", null, [
					g("th", { scope: "col" }, "Remote"),
					g("th", { scope: "col" }, "User"),
					g("th", { scope: "col" }, "Kind"),
					g("th", { scope: "col" }, "Started"),
					g("th", {
						scope: "col",
						class: "metrics__th--bar"
					}, "Throughput (in / out)")
				])], -1), g("tbody", null, [(x(!0), h(d, null, oe(F.value, (e) => (x(), h("tr", { key: e.id }, [
					g("td", We, C(e.remote_ip || "—"), 1),
					g("td", Ge, C(e.user_id ?? "—"), 1),
					g("td", null, [v(s, { tone: "neutral" }, {
						default: w(() => [_(C(e.kind), 1)]),
						_: 2
					}, 1024)]),
					g("td", Ke, C(ve(e.opened_at)), 1),
					g("td", qe, [g("div", Je, [g("div", Ye, [g("div", {
						class: "metrics__bar metrics__bar--in",
						style: re({ width: `${Math.min(100, Z(e.bytes_in_rate))}%` }),
						title: `In: ${Q(e.bytes_in_rate)}`
					}, null, 12, Xe)]), g("span", Ze, C(Q(e.bytes_in_rate)), 1)]), g("div", Qe, [g("div", $e, [g("div", {
						class: "metrics__bar metrics__bar--out",
						style: re({ width: `${Math.min(100, Z(e.bytes_out_rate))}%` }),
						title: `Out: ${Q(e.bytes_out_rate)}`
					}, null, 12, et)]), g("span", tt, C(Q(e.bytes_out_rate)), 1)])])
				]))), 128))])]))]),
				g("section", nt, [t[17] ||= g("header", { class: "metrics__card-head" }, [g("h2", {
					id: "routes-heading",
					class: "metrics__card-title"
				}, "Top Routes by Latency")], -1), ue.value ? (x(), h("div", rt, [v(l, {
					variant: "text",
					lines: 4
				})])) : U.value ? (x(), p(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load routes",
					description: U.value
				}, {
					actions: w(() => [v(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: ht
					}, {
						default: w(() => [...t[15] ||= [_("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : I.value.length === 0 ? (x(), p(u, {
					key: 2,
					icon: "speed",
					title: "No route data yet"
				})) : (x(), h("table", it, [t[16] ||= g("thead", null, [g("tr", null, [
					g("th", { scope: "col" }, "Method"),
					g("th", { scope: "col" }, "Route"),
					g("th", { scope: "col" }, "Requests"),
					g("th", { scope: "col" }, "Errors"),
					g("th", { scope: "col" }, "Avg ms"),
					g("th", { scope: "col" }, "Max ms")
				])], -1), g("tbody", null, [(x(!0), h(d, null, oe(I.value, (e) => (x(), h("tr", { key: `${e.method}:${e.route}` }, [
					g("td", null, [v(s, { tone: ft(e.method) }, {
						default: w(() => [_(C(e.method), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					g("td", at, C(e.route), 1),
					g("td", ot, C(e.request_count.toLocaleString()), 1),
					g("td", null, [e.error_count > 0 ? (x(), p(s, {
						key: 0,
						tone: "error"
					}, {
						default: w(() => [_(C(e.error_count), 1)]),
						_: 2
					}, 1024)) : (x(), h("span", st, "0"))]),
					g("td", ct, C(e.avg_ms) + "ms", 1),
					g("td", lt, [v(s, { tone: ye(e.max_ms) }, {
						default: w(() => [_(C(e.max_ms) + "ms", 1)]),
						_: 2
					}, 1032, ["tone"])])
				]))), 128))])]))])
			])
		]));
	}
}), [["__scopeId", "data-v-aa978694"]]);
//#endregion
export { ft as default };

//# sourceMappingURL=MetricsPage-BTq-3DL3.js.map