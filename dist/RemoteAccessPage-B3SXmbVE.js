import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-462_QqzN.js";
import { t as ee } from "./Modal-BJEvG52w.js";
import { c as n, f as r, t as te } from "./client-D80As4Gx.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as re } from "./networkHealth-B5_ZbJ4U.js";
import { t as i } from "./Button-8mVXxqAA.js";
import { t as a } from "./Badge-BO1IU3PF.js";
import { t as o } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-jnH8lsc0.js";
import { t as ie } from "./PageHint-qiuINKdY.js";
import { t as ae } from "./remoteAccess-DVKRpKQ8.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createStaticVNode as oe, createTextVNode as m, createVNode as h, defineComponent as se, inject as ce, normalizeClass as le, normalizeStyle as ue, onMounted as de, openBlock as g, ref as _, renderList as fe, toDisplayString as v, vModelText as pe, withCtx as y, withDirectives as me, withModifiers as he } from "vue";
//#region src/pages/admin/RemoteAccessPage.vue?vue&type=script&setup=true&lang.ts
var ge = {
	class: "admin-remote",
	"aria-labelledby": "remote-access-heading"
}, _e = { class: "admin-remote__head" }, ve = {
	id: "remote-access-heading",
	class: "admin-remote__title"
}, ye = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-hub-heading"
}, be = ["aria-expanded"], xe = { class: "admin-remote__section-title" }, Se = { class: "admin-remote__section-summary" }, Ce = {
	key: 0,
	id: "remote-hub-body",
	class: "admin-remote__section-body"
}, we = {
	key: 0,
	class: "admin-remote__skel"
}, Te = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Ee = {
	key: 0,
	class: "admin-remote__dl"
}, De = { class: "admin-remote__actions" }, Oe = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-subdomain-heading"
}, ke = ["aria-expanded"], Ae = { class: "admin-remote__section-title" }, je = { class: "admin-remote__section-summary" }, Me = {
	key: 0,
	id: "remote-subdomain-body",
	class: "admin-remote__section-body"
}, Ne = {
	key: 0,
	class: "admin-remote__skel"
}, Pe = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Fe = {
	key: 0,
	class: "admin-remote__dl"
}, Ie = { class: "admin-remote__actions" }, Le = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-relay-heading"
}, Re = ["aria-expanded"], ze = { class: "admin-remote__section-title" }, Be = { class: "admin-remote__section-summary" }, Ve = {
	key: 0,
	id: "remote-relay-body",
	class: "admin-remote__section-body"
}, He = {
	key: 0,
	class: "admin-remote__skel"
}, Ue = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, We = { class: "admin-remote__dl" }, Ge = { class: "admin-remote__actions" }, Ke = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-portforward-heading"
}, qe = ["aria-expanded"], Je = { class: "admin-remote__section-title" }, Ye = { class: "admin-remote__section-summary" }, Xe = {
	key: 0,
	id: "remote-portforward-body",
	class: "admin-remote__section-body"
}, Ze = {
	key: 0,
	class: "admin-remote__skel"
}, Qe = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, $e = { class: "admin-remote__dl" }, et = {
	key: 0,
	class: "admin-remote__candidates"
}, tt = { class: "admin-remote__candidates-list" }, nt = { class: "admin-remote__actions" }, rt = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-networkhealth-heading"
}, it = ["aria-expanded"], at = { class: "admin-remote__section-title" }, ot = { class: "admin-remote__section-summary" }, st = {
	key: 0,
	id: "remote-networkhealth-body",
	class: "admin-remote__section-body"
}, ct = {
	key: 0,
	class: "admin-remote__skel"
}, lt = { class: "admin-remote__health-grid" }, ut = { class: "admin-remote__health-card" }, dt = { class: "admin-remote__dl" }, ft = { class: "admin-remote__health-card" }, pt = { class: "admin-remote__dl" }, mt = { class: "admin-remote__health-card" }, ht = { class: "admin-remote__dl" }, gt = { class: "admin-remote__capitalize" }, _t = {
	key: 0,
	class: "admin-remote__latency-graph"
}, vt = { class: "admin-remote__latency-graph-title" }, yt = ["aria-label"], bt = ["title"], xt = { class: "admin-remote__latency-value" }, St = { class: "admin-remote__actions" }, Ct = {
	key: 3,
	class: "admin-remote__offline-info"
}, wt = {
	key: 0,
	class: "admin-remote__offline-msg"
}, Tt = {
	key: 1,
	class: "admin-remote__offline-msg"
}, Et = {
	key: 2,
	class: "admin-remote__offline-msg"
}, Dt = {
	key: 4,
	class: "admin-remote__empty",
	role: "status"
}, Ot = {
	key: 0,
	class: "admin-remote__claim"
}, kt = { class: "admin-remote__claim-code" }, At = { class: "admin-remote__field" }, jt = { class: "admin-remote__field" }, Mt = 10, b = /*#__PURE__*/ e(/* @__PURE__ */ se({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(e) {
		let se = e, b = ce("apiBase", ""), Nt = l(() => typeof b == "string" ? b : b?.value ?? ""), x = new ae(se.client ?? new te({
			baseUrl: Nt.value,
			tokenStore: new n()
		})), Pt = new re(se.client ?? new te({
			baseUrl: Nt.value,
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
			w.value[e] = !t, e === "networkhealth" && !t && mn();
		}
		let E = _(null), D = _(!0), O = _(null), k = _(!1), Ft = _(!1), It = _(!1), A = _(""), Lt = _("Phlix Server"), j = _(null), Rt = _(null), zt = _(!1), Bt = _(!1), Vt = l(() => D.value ? "Loading…" : E.value === null ? "Unable to load" : E.value.paired ? `Paired${E.value.serverId ? ` (${E.value.serverId})` : ""}` : "Not paired");
		async function M() {
			D.value = !0, O.value = null;
			try {
				E.value = await x.hubStatus();
			} catch (e) {
				O.value = r(e, "Failed to load hub status."), S.error(O.value);
			} finally {
				D.value = !1;
			}
		}
		function Ht() {
			It.value = !0;
		}
		function Ut() {
			It.value = !1, j.value = null, Rt.value = null;
		}
		async function Wt() {
			if (!zt.value) {
				if (A.value === "") {
					S.error("Hub URL is required.");
					return;
				}
				zt.value = !0;
				try {
					let e = await x.hubPair(A.value, Lt.value);
					e.success && (j.value = e.claimCode ?? null, Rt.value = e.claimId ?? null, S.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					S.error(r(e, "Failed to initiate pairing."));
				} finally {
					zt.value = !1;
				}
			}
		}
		async function Gt() {
			if (!(Rt.value === null || A.value === "") && !Bt.value) {
				Bt.value = !0;
				try {
					let e = await x.hubPoll(Rt.value, A.value);
					e.success && e.token ? (await x.hubComplete(e.token, "", e.serverId ?? "", A.value), S.success("Hub paired successfully."), Ut(), await M()) : !e.success && e.message && S.error(e.message);
				} catch (e) {
					S.error(r(e, "Failed to poll pairing status."));
				} finally {
					Bt.value = !1;
				}
			}
		}
		async function Kt() {
			if (!k.value) {
				k.value = !0;
				try {
					await x.hubUnenroll(), S.success("Hub unenrolled."), await M();
				} catch (e) {
					S.error(r(e, "Failed to unenroll."));
				} finally {
					k.value = !1;
				}
			}
		}
		async function qt() {
			if (!Ft.value) {
				Ft.value = !0;
				try {
					(await x.hubHeartbeat()).success && S.success("Heartbeat sent.");
				} catch (e) {
					S.error(r(e, "Failed to send heartbeat."));
				} finally {
					Ft.value = !1;
				}
			}
		}
		let N = _(null), P = _(!0), F = _(null), I = _(!1), L = _(!1), Jt = l(() => P.value ? "Loading…" : N.value === null ? "Unable to load" : N.value.claimed ? `Claimed${N.value.subdomain ? ` (${N.value.subdomain})` : ""}` : "Not claimed");
		async function R() {
			P.value = !0, F.value = null;
			try {
				N.value = await x.subdomainStatus();
			} catch (e) {
				F.value = r(e, "Failed to load subdomain status."), S.error(F.value);
			} finally {
				P.value = !1;
			}
		}
		async function Yt() {
			if (!I.value) {
				I.value = !0;
				try {
					await x.subdomainClaim(), S.success("Subdomain claimed."), await R();
				} catch (e) {
					S.error(r(e, "Failed to claim subdomain."));
				} finally {
					I.value = !1;
				}
			}
		}
		async function Xt() {
			if (!L.value) {
				L.value = !0;
				try {
					await x.subdomainRelease(), S.success("Subdomain released."), await R();
				} catch (e) {
					S.error(r(e, "Failed to release subdomain."));
				} finally {
					L.value = !1;
				}
			}
		}
		let z = _(null), Zt = _(!0), B = _(null), V = _(!1), H = _(!1), Qt = _(!1), U = _(null), $t = l(() => Zt.value ? "Loading…" : z.value === null ? "Unable to load" : z.value.connected ? `Connected${U.value === null ? "" : ` (${U.value}ms latency)`}` : "Disconnected"), en = l(() => V.value || H.value);
		async function tn() {
			Zt.value = !0, B.value = null;
			try {
				z.value = await x.relayStatus(), U.value = null;
			} catch (e) {
				B.value = r(e, "Failed to load relay status."), S.error(B.value);
			} finally {
				Zt.value = !1;
			}
		}
		async function nn() {
			if (!V.value) {
				V.value = !0;
				try {
					await x.relayEnable(), S.success("Relay enabled."), await tn();
				} catch (e) {
					S.error(r(e, "Failed to enable relay."));
				} finally {
					V.value = !1;
				}
			}
		}
		async function rn() {
			if (!H.value) {
				H.value = !0;
				try {
					await x.relayDisable(), S.success("Relay disabled."), await tn();
				} catch (e) {
					S.error(r(e, "Failed to disable relay."));
				} finally {
					H.value = !1;
				}
			}
		}
		async function an() {
			if (!Qt.value) {
				Qt.value = !0;
				try {
					let e = await x.relayPing();
					U.value = e.latencyMs, S.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					S.error(r(e, "Failed to ping relay."));
				} finally {
					Qt.value = !1;
				}
			}
		}
		let W = _(null), on = _(!0), G = _(null), K = _(!1), q = _(!1), sn = _([]), cn = l(() => on.value ? "Loading…" : W.value === null ? "Unable to load" : W.value.enabled ? W.value.externalIp ? `Enabled (${W.value.externalIp}:${W.value.externalPort})` : "Enabled" : "Disabled"), ln = l(() => K.value || q.value);
		async function un() {
			on.value = !0, G.value = null;
			try {
				let [e, t] = await Promise.all([x.portForwardStatus(), x.portForwardCandidates()]);
				W.value = e, sn.value = t.candidates;
			} catch (e) {
				G.value = r(e, "Failed to load port-forward status."), S.error(G.value);
			} finally {
				on.value = !1;
			}
		}
		async function dn() {
			if (!K.value) {
				K.value = !0;
				try {
					await x.portForwardEnable(), S.success("Port forwarding enabled."), await un();
				} catch (e) {
					S.error(r(e, "Failed to enable port forwarding."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function fn() {
			if (!q.value) {
				q.value = !0;
				try {
					await x.portForwardDisable(), S.success("Port forwarding disabled."), await un();
				} catch (e) {
					S.error(r(e, "Failed to disable port forwarding."));
				} finally {
					q.value = !1;
				}
			}
		}
		let J = _(null), Y = _(null), X = _(null), Z = _([]), Q = _(!1), $ = _(null);
		async function pn() {
			Q.value = !0, $.value = null;
			try {
				let e = await Pt.getHealthSnapshot();
				J.value = e.relay, Y.value = e.hub, X.value = e.network, e.network.latencyMs !== null && (Z.value.push({
					ms: e.network.latencyMs,
					at: e.network.measuredAt
				}), Z.value.length > Mt && (Z.value = Z.value.slice(-10)));
			} catch (e) {
				$.value = r(e, "Failed to load network health."), S.error($.value);
			} finally {
				Q.value = !1;
			}
		}
		function mn() {
			!Q.value && J.value === null && pn();
		}
		let hn = l(() => {
			if (Q.value) return "Loading…";
			if ($.value) return "Error loading";
			if (J.value === null) return "Not available";
			let e = X.value?.latencyMs, t = X.value?.status ?? "offline";
			return e == null ? t : `${t} (${e}ms)`;
		});
		return de(() => {
			M(), R(), tn(), un();
		}), (e, n) => (g(), f("section", ge, [
			p("header", _e, [p("h1", ve, [h(t, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), n[8] ||= m(" Remote Access ", -1)])]),
			h(ie, null, {
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
			}),
			p("section", ye, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: n[0] ||= (e) => T("hub")
			}, [p("span", xe, [n[10] ||= p("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), h(t, {
				name: w.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Se, v(Vt.value), 1)], 8, be), w.value.hub ? (g(), f("div", Ce, [D.value ? (g(), f("div", we, [h(o, {
				variant: "text",
				lines: 3
			})])) : O.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load hub status",
				description: O.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: M
				}, {
					default: y(() => [...n[11] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : E.value === null ? (g(), f("p", Te, " No hub status available. ")) : (g(), f(c, { key: 3 }, [E.value.paired ? (g(), f("dl", Ee, [
				E.value.serverId ? (g(), f(c, { key: 0 }, [n[12] ||= p("dt", null, "Server ID", -1), p("dd", null, v(E.value.serverId), 1)], 64)) : d("", !0),
				E.value.hubUrl ? (g(), f(c, { key: 1 }, [n[13] ||= p("dt", null, "Hub URL", -1), p("dd", null, v(E.value.hubUrl), 1)], 64)) : d("", !0),
				E.value.enrolledAt ? (g(), f(c, { key: 2 }, [n[14] ||= p("dt", null, "Enrolled at", -1), p("dd", null, v(C(E.value.enrolledAt)), 1)], 64)) : d("", !0)
			])) : d("", !0), p("div", De, [E.value.paired ? (g(), f(c, { key: 1 }, [h(i, {
				variant: "outline",
				size: "sm",
				loading: Ft.value,
				onClick: qt
			}, {
				default: y(() => [...n[16] ||= [m(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), h(i, {
				variant: "ghost",
				size: "sm",
				loading: k.value,
				onClick: Kt
			}, {
				default: y(() => [...n[17] ||= [m(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: Ht
			}, {
				default: y(() => [...n[15] ||= [m(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : d("", !0)]),
			p("section", Oe, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: n[1] ||= (e) => T("subdomain")
			}, [p("span", Ae, [n[18] ||= p("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), h(t, {
				name: w.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", je, v(Jt.value), 1)], 8, ke), w.value.subdomain ? (g(), f("div", Me, [P.value ? (g(), f("div", Ne, [h(o, {
				variant: "text",
				lines: 2
			})])) : F.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load subdomain status",
				description: F.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: R
				}, {
					default: y(() => [...n[19] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : N.value === null ? (g(), f("p", Pe, " No subdomain status available. ")) : (g(), f(c, { key: 3 }, [N.value.claimed ? (g(), f("dl", Fe, [N.value.subdomain ? (g(), f(c, { key: 0 }, [n[20] ||= p("dt", null, "Subdomain", -1), p("dd", null, v(N.value.subdomain), 1)], 64)) : d("", !0), N.value.fqdn ? (g(), f(c, { key: 1 }, [n[21] ||= p("dt", null, "FQDN", -1), p("dd", null, v(N.value.fqdn), 1)], 64)) : d("", !0)])) : d("", !0), p("div", Ie, [N.value.claimed ? (g(), u(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: L.value,
				onClick: Xt
			}, {
				default: y(() => [...n[23] ||= [m(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: I.value,
				onClick: Yt
			}, {
				default: y(() => [...n[22] ||= [m(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : d("", !0)]),
			p("section", Le, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: n[2] ||= (e) => T("relay")
			}, [p("span", ze, [n[24] ||= p("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), h(t, {
				name: w.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Be, v($t.value), 1)], 8, Re), w.value.relay ? (g(), f("div", Ve, [Zt.value ? (g(), f("div", He, [h(o, {
				variant: "text",
				lines: 2
			})])) : B.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load relay status",
				description: B.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: tn
				}, {
					default: y(() => [...n[25] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : z.value === null ? (g(), f("p", Ue, " No relay status available. ")) : (g(), f(c, { key: 3 }, [p("dl", We, [
				n[27] ||= p("dt", null, "Status", -1),
				p("dd", null, [h(a, { tone: z.value.connected ? "success" : "neutral" }, {
					default: y(() => [m(v(z.value.connected ? "Connected" : "Disconnected"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				n[28] ||= p("dt", null, "Active", -1),
				p("dd", null, v(z.value.active ? "Yes" : "No"), 1),
				U.value === null ? d("", !0) : (g(), f(c, { key: 0 }, [n[26] ||= p("dt", null, "Latency", -1), p("dd", null, v(U.value) + "ms", 1)], 64))
			]), p("div", Ge, [h(i, {
				variant: "outline",
				size: "sm",
				loading: Qt.value,
				disabled: !z.value.connected,
				onClick: an
			}, {
				default: y(() => [...n[29] ||= [m(" Ping ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]), z.value.connected ? (g(), u(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: H.value,
				disabled: en.value,
				onClick: rn
			}, {
				default: y(() => [...n[31] ||= [m(" Disable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: V.value,
				disabled: en.value,
				onClick: nn
			}, {
				default: y(() => [...n[30] ||= [m(" Enable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]))])], 64))])) : d("", !0)]),
			p("section", Ke, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: n[3] ||= (e) => T("portforward")
			}, [p("span", Je, [n[32] ||= p("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), h(t, {
				name: w.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Ye, v(cn.value), 1)], 8, qe), w.value.portforward ? (g(), f("div", Xe, [on.value ? (g(), f("div", Ze, [h(o, {
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
					onClick: un
				}, {
					default: y(() => [...n[33] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : W.value === null ? (g(), f("p", Qe, " No port-forward status available. ")) : (g(), f(c, { key: 3 }, [
				p("dl", $e, [
					n[37] ||= p("dt", null, "Enabled", -1),
					p("dd", null, [h(a, { tone: W.value.enabled ? "success" : "neutral" }, {
						default: y(() => [m(v(W.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					W.value.method ? (g(), f(c, { key: 0 }, [n[34] ||= p("dt", null, "Method", -1), p("dd", null, v(W.value.method), 1)], 64)) : d("", !0),
					W.value.externalIp ? (g(), f(c, { key: 1 }, [n[35] ||= p("dt", null, "External IP", -1), p("dd", null, v(W.value.externalIp), 1)], 64)) : d("", !0),
					W.value.externalPort ? (g(), f(c, { key: 2 }, [n[36] ||= p("dt", null, "External port", -1), p("dd", null, v(W.value.externalPort), 1)], 64)) : d("", !0)
				]),
				sn.value.length > 0 ? (g(), f("div", et, [n[38] ||= p("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), p("ul", tt, [(g(!0), f(c, null, fe(sn.value, (e, t) => (g(), f("li", { key: t }, v(e.hostname), 1))), 128))])])) : d("", !0),
				p("div", nt, [W.value.enabled ? (g(), u(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: q.value,
					disabled: ln.value,
					onClick: fn
				}, {
					default: y(() => [...n[40] ||= [m(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: K.value,
					disabled: ln.value,
					onClick: dn
				}, {
					default: y(() => [...n[39] ||= [m(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : d("", !0)]),
			p("section", rt, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.networkhealth,
				"aria-controls": "remote-networkhealth-body",
				onClick: n[4] ||= (e) => T("networkhealth")
			}, [p("span", at, [n[41] ||= p("h2", { id: "remote-networkhealth-heading" }, "Network Health", -1), h(t, {
				name: w.value.networkhealth ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", ot, v(hn.value), 1)], 8, it), w.value.networkhealth ? (g(), f("div", st, [Q.value ? (g(), f("div", ct, [h(o, {
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
					onClick: pn
				}, {
					default: y(() => [...n[42] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value !== null && Y.value !== null ? (g(), f(c, { key: 2 }, [
				p("div", lt, [
					p("div", ut, [n[47] ||= p("h3", { class: "admin-remote__health-card-title" }, "Relay Tunnel", -1), p("dl", dt, [
						n[44] ||= p("dt", null, "Status", -1),
						p("dd", null, [h(a, { tone: J.value.connected ? "success" : "error" }, {
							default: y(() => [m(v(J.value.connected ? J.value.active ? "Active" : "Connecting" : "Disconnected"), 1)]),
							_: 1
						}, 8, ["tone"])]),
						n[45] ||= p("dt", null, "Reconnect attempts", -1),
						p("dd", null, v(J.value.reconnectAttempts), 1),
						J.value.lastDisconnectTime ? (g(), f(c, { key: 0 }, [n[43] ||= p("dt", null, "Last disconnect", -1), p("dd", null, v(C(J.value.lastDisconnectTime)), 1)], 64)) : d("", !0),
						n[46] ||= p("dt", null, "Active sessions", -1),
						p("dd", null, v(J.value.activeSessions), 1)
					])]),
					p("div", ft, [n[52] ||= p("h3", { class: "admin-remote__health-card-title" }, "Hub Heartbeat", -1), p("dl", pt, [
						n[50] ||= p("dt", null, "Enrolled", -1),
						p("dd", null, [h(a, { tone: Y.value.isEnrolled ? "success" : "neutral" }, {
							default: y(() => [m(v(Y.value.isEnrolled ? "Yes" : "No"), 1)]),
							_: 1
						}, 8, ["tone"])]),
						n[51] ||= p("dt", null, "Consecutive failures", -1),
						p("dd", null, [h(a, { tone: Y.value.consecutiveFailures > 0 ? "warning" : "success" }, {
							default: y(() => [m(v(Y.value.consecutiveFailures), 1)]),
							_: 1
						}, 8, ["tone"])]),
						Y.value.lastSuccessfulHeartbeat ? (g(), f(c, { key: 0 }, [n[48] ||= p("dt", null, "Last success", -1), p("dd", null, v(C(Y.value.lastSuccessfulHeartbeat)), 1)], 64)) : d("", !0),
						Y.value.enrollmentExpiresAt ? (g(), f(c, { key: 1 }, [n[49] ||= p("dt", null, "Expires", -1), p("dd", null, v(C(Y.value.enrollmentExpiresAt)), 1)], 64)) : d("", !0)
					])]),
					p("div", mt, [n[56] ||= p("h3", { class: "admin-remote__health-card-title" }, "Network Latency", -1), p("dl", ht, [
						n[54] ||= p("dt", null, "Current", -1),
						p("dd", null, [h(a, { tone: X.value?.status === "healthy" ? "success" : X.value?.status === "degraded" ? "warning" : "error" }, {
							default: y(() => [m(v(X.value?.latencyMs == null ? "N/A" : `${X.value?.latencyMs}ms`), 1)]),
							_: 1
						}, 8, ["tone"])]),
						n[55] ||= p("dt", null, "Status", -1),
						p("dd", gt, v(X.value?.status ?? "unknown"), 1),
						X.value?.measuredAt ? (g(), f(c, { key: 0 }, [n[53] ||= p("dt", null, "Measured", -1), p("dd", null, v(C(X.value?.measuredAt)), 1)], 64)) : d("", !0)
					])])
				]),
				Z.value.length > 0 ? (g(), f("div", _t, [
					p("h3", vt, "Latency History (last " + v(Z.value.length) + " measurements)", 1),
					p("div", {
						class: "admin-remote__latency-bars",
						role: "img",
						"aria-label": `Latency graph showing ${Z.value.length} measurements`
					}, [(g(!0), f(c, null, fe(Z.value, (e, t) => (g(), f("div", {
						key: t,
						class: "admin-remote__latency-bar-wrap",
						title: `${e.ms}ms at ${C(e.at)}`
					}, [p("div", {
						class: le(["admin-remote__latency-bar", `admin-remote__latency-bar--${e.ms < 100 ? "good" : e.ms < 500 ? "warn" : "bad"}`]),
						style: ue({ height: `${Math.min(100, e.ms / 600 * 100)}%` })
					}, null, 6), p("span", xt, v(e.ms), 1)], 8, bt))), 128))], 8, yt),
					n[57] ||= oe("<div class=\"admin-remote__latency-legend\" data-v-3afce749><span class=\"admin-remote__latency-legend-item\" data-v-3afce749><span class=\"admin-remote__latency-dot admin-remote__latency-dot--good\" data-v-3afce749></span> &lt;100ms</span><span class=\"admin-remote__latency-legend-item\" data-v-3afce749><span class=\"admin-remote__latency-dot admin-remote__latency-dot--warn\" data-v-3afce749></span> 100-500ms</span><span class=\"admin-remote__latency-legend-item\" data-v-3afce749><span class=\"admin-remote__latency-dot admin-remote__latency-dot--bad\" data-v-3afce749></span> &gt;500ms</span></div>", 1)
				])) : d("", !0),
				p("div", St, [h(i, {
					variant: "outline",
					size: "sm",
					loading: Q.value,
					onClick: pn
				}, {
					default: y(() => [...n[58] ||= [m(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading"])])
			], 64)) : X.value?.status === "offline" ? (g(), f("div", Ct, [Y.value !== null && Y.value.isEnrolled === !1 ? (g(), f("p", wt, " Not enrolled in hub. ")) : J.value !== null && J.value.connected === !1 ? (g(), f("p", Tt, " Relay disconnected. ")) : (g(), f("p", Et, " Hub unreachable. "))])) : (g(), f("p", Dt, " No network health data available. "))])) : d("", !0)]),
			h(ee, {
				modelValue: It.value,
				"onUpdate:modelValue": n[7] ||= (e) => It.value = e,
				title: "Initiate Hub Pairing",
				onClose: Ut
			}, {
				footer: y(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: Ut
				}, {
					default: y(() => [...n[62] ||= [m("Cancel", -1)]]),
					_: 1
				}), j.value ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: Bt.value,
					onClick: Gt
				}, {
					default: y(() => [...n[63] ||= [m(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (g(), u(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: zt.value,
					disabled: A.value === "",
					onClick: Wt
				}, {
					default: y(() => [...n[64] ||= [m(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: y(() => [j.value ? (g(), f("div", Ot, [n[59] ||= p("p", null, "Enter this claim code on the hub:", -1), p("p", kt, v(j.value), 1)])) : (g(), f("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: he(Wt, ["prevent"])
				}, [p("label", At, [n[60] ||= p("span", { class: "admin-remote__label" }, "Hub URL", -1), me(p("input", {
					"onUpdate:modelValue": n[5] ||= (e) => A.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[pe, A.value]])]), p("label", jt, [n[61] ||= p("span", { class: "admin-remote__label" }, "Server name", -1), me(p("input", {
					"onUpdate:modelValue": n[6] ||= (e) => Lt.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[pe, Lt.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-3afce749"]]);
//#endregion
export { b as default };

//# sourceMappingURL=RemoteAccessPage-B3SXmbVE.js.map