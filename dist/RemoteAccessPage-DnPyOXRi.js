import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as ee } from "./Modal-CqhoiLRk.js";
import { c as n, f as r, l as te, t as ne } from "./client-BzWwyWKr.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { t as ie } from "./networkHealth-B5_ZbJ4U.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as o } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-ZlI5t4KT.js";
import { t as ae } from "./PageHint-BoAlFFBN.js";
import { t as oe } from "./remoteAccess-DVKRpKQ8.js";
import { t as se } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createStaticVNode as ce, createTextVNode as m, createVNode as h, defineComponent as le, inject as ue, normalizeClass as de, normalizeStyle as fe, onMounted as pe, openBlock as g, ref as _, renderList as me, toDisplayString as v, unref as he, vModelText as ge, withCtx as y, withDirectives as _e, withModifiers as ve } from "vue";
//#region src/pages/admin/RemoteAccessPage.vue?vue&type=script&setup=true&lang.ts
var ye = {
	class: "admin-remote",
	"aria-labelledby": "remote-access-heading"
}, be = { class: "admin-remote__head" }, xe = {
	id: "remote-access-heading",
	class: "admin-remote__title"
}, Se = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-hub-heading"
}, Ce = ["aria-expanded"], we = { class: "admin-remote__section-title" }, Te = { class: "admin-remote__section-summary" }, Ee = {
	key: 0,
	id: "remote-hub-body",
	class: "admin-remote__section-body"
}, De = {
	key: 0,
	class: "admin-remote__skel"
}, Oe = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, ke = {
	key: 0,
	class: "admin-remote__dl"
}, Ae = { class: "admin-remote__actions" }, je = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-subdomain-heading"
}, Me = ["aria-expanded"], Ne = { class: "admin-remote__section-title" }, Pe = { class: "admin-remote__section-summary" }, Fe = {
	key: 0,
	id: "remote-subdomain-body",
	class: "admin-remote__section-body"
}, Ie = {
	key: 0,
	class: "admin-remote__skel"
}, Le = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Re = {
	key: 0,
	class: "admin-remote__dl"
}, ze = { class: "admin-remote__actions" }, Be = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-relay-heading"
}, Ve = ["aria-expanded"], He = { class: "admin-remote__section-title" }, Ue = { class: "admin-remote__section-summary" }, We = {
	key: 0,
	id: "remote-relay-body",
	class: "admin-remote__section-body"
}, Ge = {
	key: 0,
	class: "admin-remote__skel"
}, Ke = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, qe = { class: "admin-remote__dl" }, Je = {
	key: 0,
	class: "admin-remote__hint"
}, Ye = { class: "admin-remote__error-text" }, Xe = { class: "admin-remote__actions" }, Ze = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-portforward-heading"
}, Qe = ["aria-expanded"], $e = { class: "admin-remote__section-title" }, et = { class: "admin-remote__section-summary" }, tt = {
	key: 0,
	id: "remote-portforward-body",
	class: "admin-remote__section-body"
}, nt = {
	key: 0,
	class: "admin-remote__skel"
}, rt = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, it = { class: "admin-remote__dl" }, at = {
	key: 0,
	class: "admin-remote__candidates"
}, ot = { class: "admin-remote__candidates-list" }, st = { class: "admin-remote__actions" }, ct = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-networkhealth-heading"
}, lt = ["aria-expanded"], ut = { class: "admin-remote__section-title" }, dt = { class: "admin-remote__section-summary" }, ft = {
	key: 0,
	id: "remote-networkhealth-body",
	class: "admin-remote__section-body"
}, pt = {
	key: 0,
	class: "admin-remote__skel"
}, mt = { class: "admin-remote__health-grid" }, ht = { class: "admin-remote__health-card" }, gt = { class: "admin-remote__dl" }, _t = { class: "admin-remote__health-card" }, vt = { class: "admin-remote__dl" }, yt = { class: "admin-remote__health-card" }, bt = { class: "admin-remote__dl" }, xt = { class: "admin-remote__capitalize" }, St = {
	key: 0,
	class: "admin-remote__latency-graph"
}, Ct = { class: "admin-remote__latency-graph-title" }, wt = ["aria-label"], Tt = ["title"], Et = { class: "admin-remote__latency-value" }, Dt = { class: "admin-remote__actions" }, Ot = {
	key: 3,
	class: "admin-remote__offline-info"
}, kt = {
	key: 0,
	class: "admin-remote__offline-msg"
}, At = {
	key: 1,
	class: "admin-remote__offline-msg"
}, jt = {
	key: 2,
	class: "admin-remote__offline-msg"
}, Mt = {
	key: 4,
	class: "admin-remote__empty",
	role: "status"
}, Nt = {
	key: 0,
	class: "admin-remote__claim"
}, Pt = { class: "admin-remote__claim-code" }, Ft = { class: "admin-remote__field" }, It = { class: "admin-remote__field" }, Lt = 10, Rt = /*#__PURE__*/ e(/* @__PURE__ */ le({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(e) {
		let le = e, Rt = ue("apiBase", ""), zt = l(() => typeof Rt == "string" ? Rt : Rt?.value ?? ""), b = new oe(le.client ?? new ne({
			baseUrl: zt.value,
			tokenStore: new n()
		})), Bt = new ie(le.client ?? new ne({
			baseUrl: zt.value,
			tokenStore: new n()
		})), x = re();
		function S(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
		}
		let C = _({
			hub: !0,
			subdomain: !1,
			relay: !1,
			portforward: !1,
			networkhealth: !1
		});
		function w(e) {
			let t = C.value[e];
			C.value[e] = !t, e === "networkhealth" && !t && bn();
		}
		let T = _(null), Vt = _(!0), E = _(null), Ht = _(!1), D = _(!1), Ut = _(!1), O = _(""), Wt = _("Phlix Server"), k = _(null), Gt = _(null), Kt = _(!1), qt = _(!1), Jt = l(() => Vt.value ? "Loading…" : T.value === null ? "Unable to load" : T.value.paired ? `Paired${T.value.serverId ? ` (${T.value.serverId})` : ""}` : "Not paired");
		async function A() {
			Vt.value = !0, E.value = null;
			try {
				T.value = await b.hubStatus();
			} catch (e) {
				E.value = r(e, "Failed to load hub status."), x.error(E.value);
			} finally {
				Vt.value = !1;
			}
		}
		function Yt() {
			Ut.value = !0;
		}
		function Xt() {
			Ut.value = !1, k.value = null, Gt.value = null;
		}
		async function Zt() {
			if (!Kt.value) {
				if (O.value === "") {
					x.error("Hub URL is required.");
					return;
				}
				Kt.value = !0;
				try {
					let e = await b.hubPair(O.value, Wt.value);
					e.success && (k.value = e.claimCode ?? null, Gt.value = e.claimId ?? null, x.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					x.error(r(e, "Failed to initiate pairing."));
				} finally {
					Kt.value = !1;
				}
			}
		}
		async function Qt() {
			if (!(Gt.value === null || O.value === "") && !qt.value) {
				qt.value = !0;
				try {
					let e = await b.hubPoll(Gt.value, O.value);
					e.success && e.token ? (await b.hubComplete(e.token, "", e.serverId ?? "", O.value), x.success("Hub paired successfully."), Xt(), await A()) : !e.success && e.message && x.error(e.message);
				} catch (e) {
					x.error(r(e, "Failed to poll pairing status."));
				} finally {
					qt.value = !1;
				}
			}
		}
		async function $t() {
			if (!Ht.value) {
				Ht.value = !0;
				try {
					await b.hubUnenroll(), x.success("Hub unenrolled."), await A();
				} catch (e) {
					x.error(r(e, "Failed to unenroll."));
				} finally {
					Ht.value = !1;
				}
			}
		}
		async function en() {
			if (!D.value) {
				D.value = !0;
				try {
					(await b.hubHeartbeat()).success && x.success("Heartbeat sent.");
				} catch (e) {
					x.error(r(e, "Failed to send heartbeat."));
				} finally {
					D.value = !1;
				}
			}
		}
		let j = _(null), M = _(!0), N = _(null), P = _(!1), F = _(!1), tn = l(() => M.value ? "Loading…" : j.value === null ? "Unable to load" : j.value.claimed ? `Claimed${j.value.subdomain ? ` (${j.value.subdomain})` : ""}` : "Not claimed");
		async function I() {
			M.value = !0, N.value = null;
			try {
				j.value = await b.subdomainStatus();
			} catch (e) {
				N.value = r(e, "Failed to load subdomain status."), x.error(N.value);
			} finally {
				M.value = !1;
			}
		}
		async function nn() {
			if (!P.value) {
				P.value = !0;
				try {
					await b.subdomainClaim(), x.success("Subdomain claimed."), await I();
				} catch (e) {
					x.error(r(e, "Failed to claim subdomain."));
				} finally {
					P.value = !1;
				}
			}
		}
		async function rn() {
			if (!F.value) {
				F.value = !0;
				try {
					await b.subdomainRelease(), x.success("Subdomain released."), await I();
				} catch (e) {
					x.error(r(e, "Failed to release subdomain."));
				} finally {
					F.value = !1;
				}
			}
		}
		let L = _(null), R = _(!0), z = _(null), B = _(!1), V = _(!1), an = _(!1), H = _(null), on = l(() => {
			if (R.value) return "Loading…";
			let e = L.value;
			if (e === null) return "Unable to load";
			if (e.connected) {
				let e = H.value?.latencyMs;
				return e == null ? "Connected" : `Connected (${e}ms latency)`;
			}
			return e.disabled ? "Disabled" : e.enrolled === !1 ? "Not paired" : "Disconnected";
		}), sn = l(() => B.value || V.value), cn = l(() => {
			let e = H.value;
			return e === null ? null : e.latencyMs == null ? "Not measured yet" : `${e.latencyMs}ms`;
		});
		async function U() {
			R.value = !0, z.value = null;
			try {
				L.value = await b.relayStatus(), H.value = null;
			} catch (e) {
				z.value = r(e, "Failed to load relay status."), x.error(z.value);
			} finally {
				R.value = !1;
			}
		}
		async function ln() {
			if (!B.value) {
				B.value = !0;
				try {
					let e = await b.relayEnable();
					x.success(e.message || "Relay enabled; takes effect on the next server reload.", e.disabled ? { tone: "warning" } : void 0), await U();
				} catch (e) {
					x.error(r(e, "Failed to enable relay."));
				} finally {
					B.value = !1;
				}
			}
		}
		async function un() {
			if (!V.value) {
				V.value = !0;
				try {
					let e = await b.relayDisable();
					x.success(e.message || "Relay disabled; takes effect on the next server reload."), await U();
				} catch (e) {
					x.error(r(e, "Failed to disable relay."));
				} finally {
					V.value = !1;
				}
			}
		}
		async function dn() {
			if (!an.value) {
				an.value = !0;
				try {
					let e = await b.relayPing();
					H.value = e, e.latencyMs == null ? x.info("Relay connected; latency not measured yet.") : x.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					if (H.value = null, e instanceof te && e.status === 409) {
						let t = e.body ?? null, ee = t?.lastConnectError ? ` (${t.lastConnectError})` : "";
						x.error(`${t?.message ?? "Relay not connected."}${ee}`), await U();
					} else x.error(r(e, "Failed to ping relay."));
				} finally {
					an.value = !1;
				}
			}
		}
		let W = _(null), fn = _(!0), G = _(null), K = _(!1), q = _(!1), pn = _([]), mn = l(() => fn.value ? "Loading…" : W.value === null ? "Unable to load" : W.value.enabled ? W.value.externalIp ? `Enabled (${W.value.externalIp}:${W.value.externalPort})` : "Enabled" : "Disabled"), hn = l(() => K.value || q.value);
		async function gn() {
			fn.value = !0, G.value = null;
			try {
				let [e, t] = await Promise.all([b.portForwardStatus(), b.portForwardCandidates()]);
				W.value = e, pn.value = t.candidates;
			} catch (e) {
				G.value = r(e, "Failed to load port-forward status."), x.error(G.value);
			} finally {
				fn.value = !1;
			}
		}
		async function _n() {
			if (!K.value) {
				K.value = !0;
				try {
					await b.portForwardEnable(), x.success("Port forwarding enabled."), await gn();
				} catch (e) {
					x.error(r(e, "Failed to enable port forwarding."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function vn() {
			if (!q.value) {
				q.value = !0;
				try {
					await b.portForwardDisable(), x.success("Port forwarding disabled."), await gn();
				} catch (e) {
					x.error(r(e, "Failed to disable port forwarding."));
				} finally {
					q.value = !1;
				}
			}
		}
		let J = _(null), Y = _(null), X = _(null), Z = _([]), Q = _(!1), $ = _(null);
		async function yn() {
			Q.value = !0, $.value = null;
			try {
				let e = await Bt.getHealthSnapshot();
				J.value = e.relay, Y.value = e.hub, X.value = e.network, e.network.latencyMs !== null && (Z.value.push({
					ms: e.network.latencyMs,
					at: e.network.measuredAt
				}), Z.value.length > Lt && (Z.value = Z.value.slice(-10)));
			} catch (e) {
				$.value = r(e, "Failed to load network health."), x.error($.value);
			} finally {
				Q.value = !1;
			}
		}
		function bn() {
			!Q.value && J.value === null && yn();
		}
		let xn = l(() => {
			if (Q.value) return "Loading…";
			if ($.value) return "Error loading";
			if (J.value === null) return "Not available";
			let e = X.value?.latencyMs, t = X.value?.status ?? "offline";
			return e == null ? t : `${t} (${e}ms)`;
		});
		return pe(() => {
			A(), I(), U(), gn();
		}), (e, n) => (g(), f("section", ye, [
			p("header", be, [p("h1", xe, [h(t, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), n[8] ||= m(" Remote Access ", -1)])]),
			h(ae, {
				links: he(se)["remote-access"].links,
				details: he(se)["remote-access"].details
			}, {
				default: y(() => [...n[9] ||= [
					m(" Reach your server from outside your home network. ", -1),
					p("strong", null, "Hub Pairing", -1),
					m(" links this server to a Phlix hub — ", -1),
					p("strong", null, "Initiate Pairing", -1),
					m(" starts it, then ", -1),
					p("strong", null, "Send Heartbeat", -1),
					m(" keeps it alive and ", -1),
					p("strong", null, "Unenroll", -1),
					m(" disconnects. ", -1),
					p("strong", null, "Subdomain", -1),
					m(" claims a friendly public address, the ", -1),
					p("strong", null, "Relay Tunnel", -1),
					m(" forwards traffic when you can't open ports (with a ", -1),
					p("strong", null, "Ping", -1),
					m(" to check latency), and ", -1),
					p("strong", null, "Port Forward", -1),
					m(" tries to open a port on your router automatically. Each section expands to show its status and controls. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			p("section", Se, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": C.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: n[0] ||= (e) => w("hub")
			}, [p("span", we, [n[10] ||= p("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), h(t, {
				name: C.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Te, v(Jt.value), 1)], 8, Ce), C.value.hub ? (g(), f("div", Ee, [Vt.value ? (g(), f("div", De, [h(o, {
				variant: "text",
				lines: 3
			})])) : E.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load hub status",
				description: E.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: A
				}, {
					default: y(() => [...n[11] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value === null ? (g(), f("p", Oe, " No hub status available. ")) : (g(), f(c, { key: 3 }, [T.value.paired ? (g(), f("dl", ke, [
				T.value.serverId ? (g(), f(c, { key: 0 }, [n[12] ||= p("dt", null, "Server ID", -1), p("dd", null, v(T.value.serverId), 1)], 64)) : d("", !0),
				T.value.hubUrl ? (g(), f(c, { key: 1 }, [n[13] ||= p("dt", null, "Hub URL", -1), p("dd", null, v(T.value.hubUrl), 1)], 64)) : d("", !0),
				T.value.enrolledAt ? (g(), f(c, { key: 2 }, [n[14] ||= p("dt", null, "Enrolled at", -1), p("dd", null, v(S(T.value.enrolledAt)), 1)], 64)) : d("", !0)
			])) : d("", !0), p("div", Ae, [T.value.paired ? (g(), f(c, { key: 1 }, [h(i, {
				variant: "outline",
				size: "sm",
				loading: D.value,
				onClick: en
			}, {
				default: y(() => [...n[16] ||= [m(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), h(i, {
				variant: "ghost",
				size: "sm",
				loading: Ht.value,
				onClick: $t
			}, {
				default: y(() => [...n[17] ||= [m(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: Yt
			}, {
				default: y(() => [...n[15] ||= [m(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : d("", !0)]),
			p("section", je, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": C.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: n[1] ||= (e) => w("subdomain")
			}, [p("span", Ne, [n[18] ||= p("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), h(t, {
				name: C.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Pe, v(tn.value), 1)], 8, Me), C.value.subdomain ? (g(), f("div", Fe, [M.value ? (g(), f("div", Ie, [h(o, {
				variant: "text",
				lines: 2
			})])) : N.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load subdomain status",
				description: N.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: I
				}, {
					default: y(() => [...n[19] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value === null ? (g(), f("p", Le, " No subdomain status available. ")) : (g(), f(c, { key: 3 }, [j.value.claimed ? (g(), f("dl", Re, [j.value.subdomain ? (g(), f(c, { key: 0 }, [n[20] ||= p("dt", null, "Subdomain", -1), p("dd", null, v(j.value.subdomain), 1)], 64)) : d("", !0), j.value.fqdn ? (g(), f(c, { key: 1 }, [n[21] ||= p("dt", null, "FQDN", -1), p("dd", null, v(j.value.fqdn), 1)], 64)) : d("", !0)])) : d("", !0), p("div", ze, [j.value.claimed ? (g(), u(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: F.value,
				onClick: rn
			}, {
				default: y(() => [...n[23] ||= [m(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: P.value,
				onClick: nn
			}, {
				default: y(() => [...n[22] ||= [m(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : d("", !0)]),
			p("section", Be, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": C.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: n[2] ||= (e) => w("relay")
			}, [p("span", He, [n[24] ||= p("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), h(t, {
				name: C.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Ue, v(on.value), 1)], 8, Ve), C.value.relay ? (g(), f("div", We, [R.value ? (g(), f("div", Ge, [h(o, {
				variant: "text",
				lines: 2
			})])) : z.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load relay status",
				description: z.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: U
				}, {
					default: y(() => [...n[25] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : L.value === null ? (g(), f("p", Ke, " No relay status available. ")) : (g(), f(c, { key: 3 }, [
				p("dl", qe, [
					n[28] ||= p("dt", null, "Status", -1),
					p("dd", null, [h(a, { tone: L.value.connected ? "success" : "neutral" }, {
						default: y(() => [m(v(L.value.connected ? "Connected" : "Disconnected"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					n[29] ||= p("dt", null, "Active", -1),
					p("dd", null, v(L.value.active ? "Yes" : "No"), 1),
					n[30] ||= p("dt", null, "Enrolled", -1),
					p("dd", null, [h(a, { tone: L.value.enrolled ? "success" : "neutral" }, {
						default: y(() => [m(v(L.value.enrolled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					n[31] ||= p("dt", null, "Kill-switch", -1),
					p("dd", null, [h(a, { tone: L.value.disabled ? "warning" : "success" }, {
						default: y(() => [m(v(L.value.disabled ? "Disabled" : "Enabled"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					cn.value === null ? d("", !0) : (g(), f(c, { key: 0 }, [n[26] ||= p("dt", null, "Latency", -1), p("dd", null, [m(v(cn.value) + " ", 1), H.value && H.value.latencyMs != null ? (g(), f("span", Je, " (last recorded heartbeat) ")) : d("", !0)])], 64)),
					L.value.lastConnectError ? (g(), f(c, { key: 1 }, [n[27] ||= p("dt", null, "Last error", -1), p("dd", Ye, [m(v(L.value.lastConnectError) + " ", 1), L.value.lastConnectErrorAt ? (g(), f(c, { key: 0 }, [m(" (" + v(S(L.value.lastConnectErrorAt)) + ") ", 1)], 64)) : d("", !0)])], 64)) : d("", !0)
				]),
				n[35] ||= p("p", {
					class: "admin-remote__notice",
					role: "note"
				}, " Enable and Disable persist a setting the relay reads on start-up — the change takes effect on the next server reload, not instantly. ", -1),
				p("div", Xe, [h(i, {
					variant: "outline",
					size: "sm",
					loading: an.value,
					disabled: !L.value.connected,
					onClick: dn
				}, {
					default: y(() => [...n[32] ||= [m(" Ping ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]), L.value.disabled ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: B.value,
					disabled: sn.value,
					onClick: ln
				}, {
					default: y(() => [...n[33] ||= [m(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), u(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: V.value,
					disabled: sn.value,
					onClick: un
				}, {
					default: y(() => [...n[34] ||= [m(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : d("", !0)]),
			p("section", Ze, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": C.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: n[3] ||= (e) => w("portforward")
			}, [p("span", $e, [n[36] ||= p("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), h(t, {
				name: C.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", et, v(mn.value), 1)], 8, Qe), C.value.portforward ? (g(), f("div", tt, [fn.value ? (g(), f("div", nt, [h(o, {
				variant: "text",
				lines: 3
			})])) : G.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load port-forward status",
				description: G.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: gn
				}, {
					default: y(() => [...n[37] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : W.value === null ? (g(), f("p", rt, " No port-forward status available. ")) : (g(), f(c, { key: 3 }, [
				p("dl", it, [
					n[41] ||= p("dt", null, "Enabled", -1),
					p("dd", null, [h(a, { tone: W.value.enabled ? "success" : "neutral" }, {
						default: y(() => [m(v(W.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					W.value.method ? (g(), f(c, { key: 0 }, [n[38] ||= p("dt", null, "Method", -1), p("dd", null, v(W.value.method), 1)], 64)) : d("", !0),
					W.value.externalIp ? (g(), f(c, { key: 1 }, [n[39] ||= p("dt", null, "External IP", -1), p("dd", null, v(W.value.externalIp), 1)], 64)) : d("", !0),
					W.value.externalPort ? (g(), f(c, { key: 2 }, [n[40] ||= p("dt", null, "External port", -1), p("dd", null, v(W.value.externalPort), 1)], 64)) : d("", !0)
				]),
				pn.value.length > 0 ? (g(), f("div", at, [n[42] ||= p("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), p("ul", ot, [(g(!0), f(c, null, me(pn.value, (e, t) => (g(), f("li", { key: t }, v(e.hostname), 1))), 128))])])) : d("", !0),
				p("div", st, [W.value.enabled ? (g(), u(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: q.value,
					disabled: hn.value,
					onClick: vn
				}, {
					default: y(() => [...n[44] ||= [m(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: K.value,
					disabled: hn.value,
					onClick: _n
				}, {
					default: y(() => [...n[43] ||= [m(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : d("", !0)]),
			p("section", ct, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": C.value.networkhealth,
				"aria-controls": "remote-networkhealth-body",
				onClick: n[4] ||= (e) => w("networkhealth")
			}, [p("span", ut, [n[45] ||= p("h2", { id: "remote-networkhealth-heading" }, "Network Health", -1), h(t, {
				name: C.value.networkhealth ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", dt, v(xn.value), 1)], 8, lt), C.value.networkhealth ? (g(), f("div", ft, [Q.value ? (g(), f("div", pt, [h(o, {
				variant: "text",
				lines: 4
			})])) : $.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load network health",
				description: $.value ?? void 0
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: yn
				}, {
					default: y(() => [...n[46] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value !== null && Y.value !== null ? (g(), f(c, { key: 2 }, [
				p("div", mt, [
					p("div", ht, [n[51] ||= p("h3", { class: "admin-remote__health-card-title" }, "Relay Tunnel", -1), p("dl", gt, [
						n[48] ||= p("dt", null, "Status", -1),
						p("dd", null, [h(a, { tone: J.value.connected ? "success" : "error" }, {
							default: y(() => [m(v(J.value.connected ? J.value.active ? "Active" : "Connecting" : "Disconnected"), 1)]),
							_: 1
						}, 8, ["tone"])]),
						n[49] ||= p("dt", null, "Reconnect attempts", -1),
						p("dd", null, v(J.value.reconnectAttempts), 1),
						J.value.lastDisconnectTime ? (g(), f(c, { key: 0 }, [n[47] ||= p("dt", null, "Last disconnect", -1), p("dd", null, v(S(J.value.lastDisconnectTime)), 1)], 64)) : d("", !0),
						n[50] ||= p("dt", null, "Active sessions", -1),
						p("dd", null, v(J.value.activeSessions), 1)
					])]),
					p("div", _t, [n[56] ||= p("h3", { class: "admin-remote__health-card-title" }, "Hub Heartbeat", -1), p("dl", vt, [
						n[54] ||= p("dt", null, "Enrolled", -1),
						p("dd", null, [h(a, { tone: Y.value.isEnrolled ? "success" : "neutral" }, {
							default: y(() => [m(v(Y.value.isEnrolled ? "Yes" : "No"), 1)]),
							_: 1
						}, 8, ["tone"])]),
						n[55] ||= p("dt", null, "Consecutive failures", -1),
						p("dd", null, [h(a, { tone: Y.value.consecutiveFailures > 0 ? "warning" : "success" }, {
							default: y(() => [m(v(Y.value.consecutiveFailures), 1)]),
							_: 1
						}, 8, ["tone"])]),
						Y.value.lastSuccessfulHeartbeat ? (g(), f(c, { key: 0 }, [n[52] ||= p("dt", null, "Last success", -1), p("dd", null, v(S(Y.value.lastSuccessfulHeartbeat)), 1)], 64)) : d("", !0),
						Y.value.enrollmentExpiresAt ? (g(), f(c, { key: 1 }, [n[53] ||= p("dt", null, "Expires", -1), p("dd", null, v(S(Y.value.enrollmentExpiresAt)), 1)], 64)) : d("", !0)
					])]),
					p("div", yt, [n[60] ||= p("h3", { class: "admin-remote__health-card-title" }, "Network Latency", -1), p("dl", bt, [
						n[58] ||= p("dt", null, "Current", -1),
						p("dd", null, [h(a, { tone: X.value?.status === "healthy" ? "success" : X.value?.status === "degraded" ? "warning" : "error" }, {
							default: y(() => [m(v(X.value?.latencyMs == null ? "N/A" : `${X.value?.latencyMs}ms`), 1)]),
							_: 1
						}, 8, ["tone"])]),
						n[59] ||= p("dt", null, "Status", -1),
						p("dd", xt, v(X.value?.status ?? "unknown"), 1),
						X.value?.measuredAt ? (g(), f(c, { key: 0 }, [n[57] ||= p("dt", null, "Measured", -1), p("dd", null, v(S(X.value?.measuredAt)), 1)], 64)) : d("", !0)
					])])
				]),
				Z.value.length > 0 ? (g(), f("div", St, [
					p("h3", Ct, "Latency History (last " + v(Z.value.length) + " measurements)", 1),
					p("div", {
						class: "admin-remote__latency-bars",
						role: "img",
						"aria-label": `Latency graph showing ${Z.value.length} measurements`
					}, [(g(!0), f(c, null, me(Z.value, (e, t) => (g(), f("div", {
						key: t,
						class: "admin-remote__latency-bar-wrap",
						title: `${e.ms}ms at ${S(e.at)}`
					}, [p("div", {
						class: de(["admin-remote__latency-bar", `admin-remote__latency-bar--${e.ms < 100 ? "good" : e.ms < 500 ? "warn" : "bad"}`]),
						style: fe({ height: `${Math.min(100, e.ms / 600 * 100)}%` })
					}, null, 6), p("span", Et, v(e.ms), 1)], 8, Tt))), 128))], 8, wt),
					n[61] ||= ce("<div class=\"admin-remote__latency-legend\" data-v-2da03738><span class=\"admin-remote__latency-legend-item\" data-v-2da03738><span class=\"admin-remote__latency-dot admin-remote__latency-dot--good\" data-v-2da03738></span> &lt;100ms</span><span class=\"admin-remote__latency-legend-item\" data-v-2da03738><span class=\"admin-remote__latency-dot admin-remote__latency-dot--warn\" data-v-2da03738></span> 100-500ms</span><span class=\"admin-remote__latency-legend-item\" data-v-2da03738><span class=\"admin-remote__latency-dot admin-remote__latency-dot--bad\" data-v-2da03738></span> &gt;500ms</span></div>", 1)
				])) : d("", !0),
				p("div", Dt, [h(i, {
					variant: "outline",
					size: "sm",
					loading: Q.value,
					onClick: yn
				}, {
					default: y(() => [...n[62] ||= [m(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading"])])
			], 64)) : X.value?.status === "offline" ? (g(), f("div", Ot, [Y.value !== null && Y.value.isEnrolled === !1 ? (g(), f("p", kt, " Not enrolled in hub. ")) : J.value !== null && J.value.connected === !1 ? (g(), f("p", At, " Relay disconnected. ")) : (g(), f("p", jt, " Hub unreachable. "))])) : (g(), f("p", Mt, " No network health data available. "))])) : d("", !0)]),
			h(ee, {
				modelValue: Ut.value,
				"onUpdate:modelValue": n[7] ||= (e) => Ut.value = e,
				title: "Initiate Hub Pairing",
				onClose: Xt
			}, {
				footer: y(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: Xt
				}, {
					default: y(() => [...n[66] ||= [m("Cancel", -1)]]),
					_: 1
				}), k.value ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: qt.value,
					onClick: Qt
				}, {
					default: y(() => [...n[67] ||= [m(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (g(), u(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: Kt.value,
					disabled: O.value === "",
					onClick: Zt
				}, {
					default: y(() => [...n[68] ||= [m(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: y(() => [k.value ? (g(), f("div", Nt, [n[63] ||= p("p", null, "Enter this claim code on the hub:", -1), p("p", Pt, v(k.value), 1)])) : (g(), f("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: ve(Zt, ["prevent"])
				}, [p("label", Ft, [n[64] ||= p("span", { class: "admin-remote__label" }, "Hub URL", -1), _e(p("input", {
					"onUpdate:modelValue": n[5] ||= (e) => O.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[ge, O.value]])]), p("label", It, [n[65] ||= p("span", { class: "admin-remote__label" }, "Server name", -1), _e(p("input", {
					"onUpdate:modelValue": n[6] ||= (e) => Wt.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[ge, Wt.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-2da03738"]]);
//#endregion
export { Rt as default };

//# sourceMappingURL=RemoteAccessPage-DnPyOXRi.js.map