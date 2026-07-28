import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-ZHw1Bisb.js";
import { l as n, p as r, t as ee, u as te } from "./client-CkSYnkSD.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as re } from "./networkHealth-B5_ZbJ4U.js";
import { t as i } from "./Button-CsFYgW7R.js";
import { t as a } from "./Badge-WQUcXG1J.js";
import { t as ie } from "./Modal-BbdR-K2V.js";
import { t as o } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-CxJYcONU.js";
import { t as ae } from "./PageHint-D0LGuRfG.js";
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
}, Pt = { class: "admin-remote__claim-code" }, Ft = { class: "admin-remote__field" }, It = { class: "admin-remote__field" }, Lt = 10, b = /*#__PURE__*/ e(/* @__PURE__ */ le({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(e) {
		let le = e, b = ue("apiBase", ""), Rt = l(() => typeof b == "string" ? b : b?.value ?? ""), x = new oe(le.client ?? new ee({
			baseUrl: Rt.value,
			tokenStore: new n()
		})), zt = new re(le.client ?? new ee({
			baseUrl: Rt.value,
			tokenStore: new n()
		})), S = ne();
		function C(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
		}
		let w = _({
			hub: !0,
			subdomain: !1,
			relay: !1,
			portforward: !1,
			networkhealth: !1
		});
		function T(e) {
			let t = w.value[e];
			w.value[e] = !t, e === "networkhealth" && !t && bn();
		}
		let E = _(null), Bt = _(!0), D = _(null), Vt = _(!1), Ht = _(!1), Ut = _(!1), O = _(""), Wt = _("Phlix Server"), k = _(null), Gt = _(null), Kt = _(!1), A = _(!1), qt = l(() => Bt.value ? "Loading…" : E.value === null ? "Unable to load" : E.value.paired ? `Paired${E.value.serverId ? ` (${E.value.serverId})` : ""}` : "Not paired");
		async function j() {
			Bt.value = !0, D.value = null;
			try {
				E.value = await x.hubStatus();
			} catch (e) {
				D.value = r(e, "Failed to load hub status."), S.error(D.value);
			} finally {
				Bt.value = !1;
			}
		}
		function Jt() {
			Ut.value = !0;
		}
		function Yt() {
			Ut.value = !1, k.value = null, Gt.value = null;
		}
		async function Xt() {
			if (!Kt.value) {
				if (O.value === "") {
					S.error("Hub URL is required.");
					return;
				}
				Kt.value = !0;
				try {
					let e = await x.hubPair(O.value, Wt.value);
					e.success && (k.value = e.claimCode ?? null, Gt.value = e.claimId ?? null, S.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					S.error(r(e, "Failed to initiate pairing."));
				} finally {
					Kt.value = !1;
				}
			}
		}
		async function Zt() {
			if (!(Gt.value === null || O.value === "") && !A.value) {
				A.value = !0;
				try {
					let e = await x.hubPoll(Gt.value, O.value);
					e.success && e.token ? (await x.hubComplete(e.token, "", e.serverId ?? "", O.value), S.success("Hub paired successfully."), Yt(), await j()) : !e.success && e.message && S.error(e.message);
				} catch (e) {
					S.error(r(e, "Failed to poll pairing status."));
				} finally {
					A.value = !1;
				}
			}
		}
		async function Qt() {
			if (!Vt.value) {
				Vt.value = !0;
				try {
					await x.hubUnenroll(), S.success("Hub unenrolled."), await j();
				} catch (e) {
					S.error(r(e, "Failed to unenroll."));
				} finally {
					Vt.value = !1;
				}
			}
		}
		async function $t() {
			if (!Ht.value) {
				Ht.value = !0;
				try {
					(await x.hubHeartbeat()).success && S.success("Heartbeat sent.");
				} catch (e) {
					S.error(r(e, "Failed to send heartbeat."));
				} finally {
					Ht.value = !1;
				}
			}
		}
		let M = _(null), N = _(!0), P = _(null), en = _(!1), tn = _(!1), nn = l(() => N.value ? "Loading…" : M.value === null ? "Unable to load" : M.value.claimed ? `Claimed${M.value.subdomain ? ` (${M.value.subdomain})` : ""}` : "Not claimed");
		async function F() {
			N.value = !0, P.value = null;
			try {
				M.value = await x.subdomainStatus();
			} catch (e) {
				P.value = r(e, "Failed to load subdomain status."), S.error(P.value);
			} finally {
				N.value = !1;
			}
		}
		async function rn() {
			if (!en.value) {
				en.value = !0;
				try {
					await x.subdomainClaim(), S.success("Subdomain claimed."), await F();
				} catch (e) {
					S.error(r(e, "Failed to claim subdomain."));
				} finally {
					en.value = !1;
				}
			}
		}
		async function an() {
			if (!tn.value) {
				tn.value = !0;
				try {
					await x.subdomainRelease(), S.success("Subdomain released."), await F();
				} catch (e) {
					S.error(r(e, "Failed to release subdomain."));
				} finally {
					tn.value = !1;
				}
			}
		}
		let I = _(null), on = _(!0), L = _(null), R = _(!1), z = _(!1), B = _(!1), V = _(null), sn = l(() => {
			if (on.value) return "Loading…";
			let e = I.value;
			if (e === null) return "Unable to load";
			if (e.connected) {
				let e = V.value?.latencyMs;
				return e == null ? "Connected" : `Connected (${e}ms latency)`;
			}
			return e.disabled ? "Disabled" : e.enrolled === !1 ? "Not paired" : "Disconnected";
		}), cn = l(() => R.value || z.value), ln = l(() => {
			let e = V.value;
			return e === null ? null : e.latencyMs == null ? "Not measured yet" : `${e.latencyMs}ms`;
		});
		async function H() {
			on.value = !0, L.value = null;
			try {
				I.value = await x.relayStatus(), V.value = null;
			} catch (e) {
				L.value = r(e, "Failed to load relay status."), S.error(L.value);
			} finally {
				on.value = !1;
			}
		}
		async function un() {
			if (!R.value) {
				R.value = !0;
				try {
					let e = await x.relayEnable();
					S.success(e.message || "Relay enabled; takes effect on the next server reload.", e.disabled ? { tone: "warning" } : void 0), await H();
				} catch (e) {
					S.error(r(e, "Failed to enable relay."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function dn() {
			if (!z.value) {
				z.value = !0;
				try {
					let e = await x.relayDisable();
					S.success(e.message || "Relay disabled; takes effect on the next server reload."), await H();
				} catch (e) {
					S.error(r(e, "Failed to disable relay."));
				} finally {
					z.value = !1;
				}
			}
		}
		async function fn() {
			if (!B.value) {
				B.value = !0;
				try {
					let e = await x.relayPing();
					V.value = e, e.latencyMs == null ? S.info("Relay connected; latency not measured yet.") : S.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					if (V.value = null, e instanceof te && e.status === 409) {
						let t = e.body ?? null, n = t?.lastConnectError ? ` (${t.lastConnectError})` : "";
						S.error(`${t?.message ?? "Relay not connected."}${n}`), await H();
					} else S.error(r(e, "Failed to ping relay."));
				} finally {
					B.value = !1;
				}
			}
		}
		let U = _(null), W = _(!0), G = _(null), K = _(!1), q = _(!1), pn = _([]), mn = l(() => W.value ? "Loading…" : U.value === null ? "Unable to load" : U.value.enabled ? U.value.externalIp ? `Enabled (${U.value.externalIp}:${U.value.externalPort})` : "Enabled" : "Disabled"), hn = l(() => K.value || q.value);
		async function gn() {
			W.value = !0, G.value = null;
			try {
				let [e, t] = await Promise.all([x.portForwardStatus(), x.portForwardCandidates()]);
				U.value = e, pn.value = t.candidates;
			} catch (e) {
				G.value = r(e, "Failed to load port-forward status."), S.error(G.value);
			} finally {
				W.value = !1;
			}
		}
		async function _n() {
			if (!K.value) {
				K.value = !0;
				try {
					await x.portForwardEnable(), S.success("Port forwarding enabled."), await gn();
				} catch (e) {
					S.error(r(e, "Failed to enable port forwarding."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function vn() {
			if (!q.value) {
				q.value = !0;
				try {
					await x.portForwardDisable(), S.success("Port forwarding disabled."), await gn();
				} catch (e) {
					S.error(r(e, "Failed to disable port forwarding."));
				} finally {
					q.value = !1;
				}
			}
		}
		let J = _(null), Y = _(null), X = _(null), Z = _([]), Q = _(!1), $ = _(null);
		async function yn() {
			Q.value = !0, $.value = null;
			try {
				let e = await zt.getHealthSnapshot();
				J.value = e.relay, Y.value = e.hub, X.value = e.network, e.network.latencyMs !== null && (Z.value.push({
					ms: e.network.latencyMs,
					at: e.network.measuredAt
				}), Z.value.length > Lt && (Z.value = Z.value.slice(-10)));
			} catch (e) {
				$.value = r(e, "Failed to load network health."), S.error($.value);
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
			j(), F(), H(), gn();
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
				"aria-expanded": w.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: n[0] ||= (e) => T("hub")
			}, [p("span", we, [n[10] ||= p("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), h(t, {
				name: w.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Te, v(qt.value), 1)], 8, Ce), w.value.hub ? (g(), f("div", Ee, [Bt.value ? (g(), f("div", De, [h(o, {
				variant: "text",
				lines: 3
			})])) : D.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load hub status",
				description: D.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: j
				}, {
					default: y(() => [...n[11] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : E.value === null ? (g(), f("p", Oe, " No hub status available. ")) : (g(), f(c, { key: 3 }, [E.value.paired ? (g(), f("dl", ke, [
				E.value.serverId ? (g(), f(c, { key: 0 }, [n[12] ||= p("dt", null, "Server ID", -1), p("dd", null, v(E.value.serverId), 1)], 64)) : d("", !0),
				E.value.hubUrl ? (g(), f(c, { key: 1 }, [n[13] ||= p("dt", null, "Hub URL", -1), p("dd", null, v(E.value.hubUrl), 1)], 64)) : d("", !0),
				E.value.enrolledAt ? (g(), f(c, { key: 2 }, [n[14] ||= p("dt", null, "Enrolled at", -1), p("dd", null, v(C(E.value.enrolledAt)), 1)], 64)) : d("", !0)
			])) : d("", !0), p("div", Ae, [E.value.paired ? (g(), f(c, { key: 1 }, [h(i, {
				variant: "outline",
				size: "sm",
				loading: Ht.value,
				onClick: $t
			}, {
				default: y(() => [...n[16] ||= [m(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), h(i, {
				variant: "ghost",
				size: "sm",
				loading: Vt.value,
				onClick: Qt
			}, {
				default: y(() => [...n[17] ||= [m(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: Jt
			}, {
				default: y(() => [...n[15] ||= [m(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : d("", !0)]),
			p("section", je, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: n[1] ||= (e) => T("subdomain")
			}, [p("span", Ne, [n[18] ||= p("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), h(t, {
				name: w.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Pe, v(nn.value), 1)], 8, Me), w.value.subdomain ? (g(), f("div", Fe, [N.value ? (g(), f("div", Ie, [h(o, {
				variant: "text",
				lines: 2
			})])) : P.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load subdomain status",
				description: P.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: F
				}, {
					default: y(() => [...n[19] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value === null ? (g(), f("p", Le, " No subdomain status available. ")) : (g(), f(c, { key: 3 }, [M.value.claimed ? (g(), f("dl", Re, [M.value.subdomain ? (g(), f(c, { key: 0 }, [n[20] ||= p("dt", null, "Subdomain", -1), p("dd", null, v(M.value.subdomain), 1)], 64)) : d("", !0), M.value.fqdn ? (g(), f(c, { key: 1 }, [n[21] ||= p("dt", null, "FQDN", -1), p("dd", null, v(M.value.fqdn), 1)], 64)) : d("", !0)])) : d("", !0), p("div", ze, [M.value.claimed ? (g(), u(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: tn.value,
				onClick: an
			}, {
				default: y(() => [...n[23] ||= [m(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: en.value,
				onClick: rn
			}, {
				default: y(() => [...n[22] ||= [m(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : d("", !0)]),
			p("section", Be, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: n[2] ||= (e) => T("relay")
			}, [p("span", He, [n[24] ||= p("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), h(t, {
				name: w.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Ue, v(sn.value), 1)], 8, Ve), w.value.relay ? (g(), f("div", We, [on.value ? (g(), f("div", Ge, [h(o, {
				variant: "text",
				lines: 2
			})])) : L.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load relay status",
				description: L.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: H
				}, {
					default: y(() => [...n[25] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : I.value === null ? (g(), f("p", Ke, " No relay status available. ")) : (g(), f(c, { key: 3 }, [
				p("dl", qe, [
					n[28] ||= p("dt", null, "Status", -1),
					p("dd", null, [h(a, { tone: I.value.connected ? "success" : "neutral" }, {
						default: y(() => [m(v(I.value.connected ? "Connected" : "Disconnected"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					n[29] ||= p("dt", null, "Active", -1),
					p("dd", null, v(I.value.active ? "Yes" : "No"), 1),
					n[30] ||= p("dt", null, "Enrolled", -1),
					p("dd", null, [h(a, { tone: I.value.enrolled ? "success" : "neutral" }, {
						default: y(() => [m(v(I.value.enrolled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					n[31] ||= p("dt", null, "Kill-switch", -1),
					p("dd", null, [h(a, { tone: I.value.disabled ? "warning" : "success" }, {
						default: y(() => [m(v(I.value.disabled ? "Disabled" : "Enabled"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					ln.value === null ? d("", !0) : (g(), f(c, { key: 0 }, [n[26] ||= p("dt", null, "Latency", -1), p("dd", null, [m(v(ln.value) + " ", 1), V.value && V.value.latencyMs != null ? (g(), f("span", Je, " (last recorded heartbeat) ")) : d("", !0)])], 64)),
					I.value.lastConnectError ? (g(), f(c, { key: 1 }, [n[27] ||= p("dt", null, "Last error", -1), p("dd", Ye, [m(v(I.value.lastConnectError) + " ", 1), I.value.lastConnectErrorAt ? (g(), f(c, { key: 0 }, [m(" (" + v(C(I.value.lastConnectErrorAt)) + ") ", 1)], 64)) : d("", !0)])], 64)) : d("", !0)
				]),
				n[35] ||= p("p", {
					class: "admin-remote__notice",
					role: "note"
				}, " Enable and Disable persist a setting the relay reads on start-up — the change takes effect on the next server reload, not instantly. ", -1),
				p("div", Xe, [h(i, {
					variant: "outline",
					size: "sm",
					loading: B.value,
					disabled: !I.value.connected,
					onClick: fn
				}, {
					default: y(() => [...n[32] ||= [m(" Ping ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]), I.value.disabled ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: R.value,
					disabled: cn.value,
					onClick: un
				}, {
					default: y(() => [...n[33] ||= [m(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), u(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: z.value,
					disabled: cn.value,
					onClick: dn
				}, {
					default: y(() => [...n[34] ||= [m(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : d("", !0)]),
			p("section", Ze, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: n[3] ||= (e) => T("portforward")
			}, [p("span", $e, [n[36] ||= p("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), h(t, {
				name: w.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", et, v(mn.value), 1)], 8, Qe), w.value.portforward ? (g(), f("div", tt, [W.value ? (g(), f("div", nt, [h(o, {
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
			}, 8, ["description"])) : U.value === null ? (g(), f("p", rt, " No port-forward status available. ")) : (g(), f(c, { key: 3 }, [
				p("dl", it, [
					n[41] ||= p("dt", null, "Enabled", -1),
					p("dd", null, [h(a, { tone: U.value.enabled ? "success" : "neutral" }, {
						default: y(() => [m(v(U.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					U.value.method ? (g(), f(c, { key: 0 }, [n[38] ||= p("dt", null, "Method", -1), p("dd", null, v(U.value.method), 1)], 64)) : d("", !0),
					U.value.externalIp ? (g(), f(c, { key: 1 }, [n[39] ||= p("dt", null, "External IP", -1), p("dd", null, v(U.value.externalIp), 1)], 64)) : d("", !0),
					U.value.externalPort ? (g(), f(c, { key: 2 }, [n[40] ||= p("dt", null, "External port", -1), p("dd", null, v(U.value.externalPort), 1)], 64)) : d("", !0)
				]),
				pn.value.length > 0 ? (g(), f("div", at, [n[42] ||= p("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), p("ul", ot, [(g(!0), f(c, null, me(pn.value, (e, t) => (g(), f("li", { key: t }, v(e.hostname), 1))), 128))])])) : d("", !0),
				p("div", st, [U.value.enabled ? (g(), u(i, {
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
				"aria-expanded": w.value.networkhealth,
				"aria-controls": "remote-networkhealth-body",
				onClick: n[4] ||= (e) => T("networkhealth")
			}, [p("span", ut, [n[45] ||= p("h2", { id: "remote-networkhealth-heading" }, "Network Health", -1), h(t, {
				name: w.value.networkhealth ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", dt, v(xn.value), 1)], 8, lt), w.value.networkhealth ? (g(), f("div", ft, [Q.value ? (g(), f("div", pt, [h(o, {
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
						J.value.lastDisconnectTime ? (g(), f(c, { key: 0 }, [n[47] ||= p("dt", null, "Last disconnect", -1), p("dd", null, v(C(J.value.lastDisconnectTime)), 1)], 64)) : d("", !0),
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
						Y.value.lastSuccessfulHeartbeat ? (g(), f(c, { key: 0 }, [n[52] ||= p("dt", null, "Last success", -1), p("dd", null, v(C(Y.value.lastSuccessfulHeartbeat)), 1)], 64)) : d("", !0),
						Y.value.enrollmentExpiresAt ? (g(), f(c, { key: 1 }, [n[53] ||= p("dt", null, "Expires", -1), p("dd", null, v(C(Y.value.enrollmentExpiresAt)), 1)], 64)) : d("", !0)
					])]),
					p("div", yt, [n[60] ||= p("h3", { class: "admin-remote__health-card-title" }, "Network Latency", -1), p("dl", bt, [
						n[58] ||= p("dt", null, "Current", -1),
						p("dd", null, [h(a, { tone: X.value?.status === "healthy" ? "success" : X.value?.status === "degraded" ? "warning" : "error" }, {
							default: y(() => [m(v(X.value?.latencyMs == null ? "N/A" : `${X.value?.latencyMs}ms`), 1)]),
							_: 1
						}, 8, ["tone"])]),
						n[59] ||= p("dt", null, "Status", -1),
						p("dd", xt, v(X.value?.status ?? "unknown"), 1),
						X.value?.measuredAt ? (g(), f(c, { key: 0 }, [n[57] ||= p("dt", null, "Measured", -1), p("dd", null, v(C(X.value?.measuredAt)), 1)], 64)) : d("", !0)
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
						title: `${e.ms}ms at ${C(e.at)}`
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
			h(ie, {
				modelValue: Ut.value,
				"onUpdate:modelValue": n[7] ||= (e) => Ut.value = e,
				title: "Initiate Hub Pairing",
				onClose: Yt
			}, {
				footer: y(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: Yt
				}, {
					default: y(() => [...n[66] ||= [m("Cancel", -1)]]),
					_: 1
				}), k.value ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: A.value,
					onClick: Zt
				}, {
					default: y(() => [...n[67] ||= [m(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (g(), u(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: Kt.value,
					disabled: O.value === "",
					onClick: Xt
				}, {
					default: y(() => [...n[68] ||= [m(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: y(() => [k.value ? (g(), f("div", Nt, [n[63] ||= p("p", null, "Enter this claim code on the hub:", -1), p("p", Pt, v(k.value), 1)])) : (g(), f("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: ve(Xt, ["prevent"])
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
export { b as default };

//# sourceMappingURL=RemoteAccessPage-CNRgzsiR.js.map