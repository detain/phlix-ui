import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as ee } from "./Modal-BXA8fOR4.js";
import { c as n, f as r, t as te } from "./client-CGSA6iT0.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as re } from "./networkHealth-B5_ZbJ4U.js";
import { t as i } from "./Button-CnyfCnhY.js";
import { t as a } from "./Badge-Dq-pYhrz.js";
import { t as o } from "./Skeleton-CzU_l53W.js";
import { t as s } from "./EmptyState-588Z_81C.js";
import { t as ie } from "./PageHint-7Giwob0l.js";
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
	class: "admin-remote__empty",
	role: "status"
}, wt = {
	key: 0,
	class: "admin-remote__claim"
}, Tt = { class: "admin-remote__claim-code" }, Et = { class: "admin-remote__field" }, Dt = { class: "admin-remote__field" }, Ot = 10, b = /*#__PURE__*/ e(/* @__PURE__ */ se({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(e) {
		let se = e, b = ce("apiBase", ""), kt = l(() => typeof b == "string" ? b : b?.value ?? ""), x = new ae(se.client ?? new te({
			baseUrl: kt.value,
			tokenStore: new n()
		})), At = new re(se.client ?? new te({
			baseUrl: kt.value,
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
			w.value[e] = !t, e === "networkhealth" && !t && un();
		}
		let E = _(null), D = _(!0), O = _(null), k = _(!1), A = _(!1), j = _(!1), M = _(""), jt = _("Phlix Server"), N = _(null), P = _(null), F = _(!1), Mt = _(!1), Nt = l(() => D.value ? "Loading…" : E.value === null ? "Unable to load" : E.value.paired ? `Paired${E.value.serverId ? ` (${E.value.serverId})` : ""}` : "Not paired");
		async function Pt() {
			D.value = !0, O.value = null;
			try {
				E.value = await x.hubStatus();
			} catch (e) {
				O.value = r(e, "Failed to load hub status."), S.error(O.value);
			} finally {
				D.value = !1;
			}
		}
		function Ft() {
			j.value = !0;
		}
		function It() {
			j.value = !1, N.value = null, P.value = null;
		}
		async function Lt() {
			if (!F.value) {
				if (M.value === "") {
					S.error("Hub URL is required.");
					return;
				}
				F.value = !0;
				try {
					let e = await x.hubPair(M.value, jt.value);
					e.success && (N.value = e.claimCode ?? null, P.value = e.claimId ?? null, S.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					S.error(r(e, "Failed to initiate pairing."));
				} finally {
					F.value = !1;
				}
			}
		}
		async function Rt() {
			if (!(P.value === null || M.value === "") && !Mt.value) {
				Mt.value = !0;
				try {
					let e = await x.hubPoll(P.value, M.value);
					e.success && e.token ? (await x.hubComplete(e.token, "", e.serverId ?? "", M.value), S.success("Hub paired successfully."), It(), await Pt()) : !e.success && e.message && S.error(e.message);
				} catch (e) {
					S.error(r(e, "Failed to poll pairing status."));
				} finally {
					Mt.value = !1;
				}
			}
		}
		async function zt() {
			if (!k.value) {
				k.value = !0;
				try {
					await x.hubUnenroll(), S.success("Hub unenrolled."), await Pt();
				} catch (e) {
					S.error(r(e, "Failed to unenroll."));
				} finally {
					k.value = !1;
				}
			}
		}
		async function Bt() {
			if (!A.value) {
				A.value = !0;
				try {
					(await x.hubHeartbeat()).success && S.success("Heartbeat sent.");
				} catch (e) {
					S.error(r(e, "Failed to send heartbeat."));
				} finally {
					A.value = !1;
				}
			}
		}
		let I = _(null), Vt = _(!0), L = _(null), Ht = _(!1), Ut = _(!1), Wt = l(() => Vt.value ? "Loading…" : I.value === null ? "Unable to load" : I.value.claimed ? `Claimed${I.value.subdomain ? ` (${I.value.subdomain})` : ""}` : "Not claimed");
		async function Gt() {
			Vt.value = !0, L.value = null;
			try {
				I.value = await x.subdomainStatus();
			} catch (e) {
				L.value = r(e, "Failed to load subdomain status."), S.error(L.value);
			} finally {
				Vt.value = !1;
			}
		}
		async function Kt() {
			if (!Ht.value) {
				Ht.value = !0;
				try {
					await x.subdomainClaim(), S.success("Subdomain claimed."), await Gt();
				} catch (e) {
					S.error(r(e, "Failed to claim subdomain."));
				} finally {
					Ht.value = !1;
				}
			}
		}
		async function qt() {
			if (!Ut.value) {
				Ut.value = !0;
				try {
					await x.subdomainRelease(), S.success("Subdomain released."), await Gt();
				} catch (e) {
					S.error(r(e, "Failed to release subdomain."));
				} finally {
					Ut.value = !1;
				}
			}
		}
		let R = _(null), Jt = _(!0), z = _(null), B = _(!1), V = _(!1), Yt = _(!1), H = _(null), Xt = l(() => Jt.value ? "Loading…" : R.value === null ? "Unable to load" : R.value.connected ? `Connected${H.value === null ? "" : ` (${H.value}ms latency)`}` : "Disconnected"), Zt = l(() => B.value || V.value);
		async function Qt() {
			Jt.value = !0, z.value = null;
			try {
				R.value = await x.relayStatus(), H.value = null;
			} catch (e) {
				z.value = r(e, "Failed to load relay status."), S.error(z.value);
			} finally {
				Jt.value = !1;
			}
		}
		async function $t() {
			if (!B.value) {
				B.value = !0;
				try {
					await x.relayEnable(), S.success("Relay enabled."), await Qt();
				} catch (e) {
					S.error(r(e, "Failed to enable relay."));
				} finally {
					B.value = !1;
				}
			}
		}
		async function en() {
			if (!V.value) {
				V.value = !0;
				try {
					await x.relayDisable(), S.success("Relay disabled."), await Qt();
				} catch (e) {
					S.error(r(e, "Failed to disable relay."));
				} finally {
					V.value = !1;
				}
			}
		}
		async function tn() {
			if (!Yt.value) {
				Yt.value = !0;
				try {
					let e = await x.relayPing();
					H.value = e.latencyMs, S.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					S.error(r(e, "Failed to ping relay."));
				} finally {
					Yt.value = !1;
				}
			}
		}
		let U = _(null), nn = _(!0), W = _(null), G = _(!1), K = _(!1), rn = _([]), an = l(() => nn.value ? "Loading…" : U.value === null ? "Unable to load" : U.value.enabled ? U.value.externalIp ? `Enabled (${U.value.externalIp}:${U.value.externalPort})` : "Enabled" : "Disabled"), on = l(() => G.value || K.value);
		async function q() {
			nn.value = !0, W.value = null;
			try {
				let [e, t] = await Promise.all([x.portForwardStatus(), x.portForwardCandidates()]);
				U.value = e, rn.value = t.candidates;
			} catch (e) {
				W.value = r(e, "Failed to load port-forward status."), S.error(W.value);
			} finally {
				nn.value = !1;
			}
		}
		async function sn() {
			if (!G.value) {
				G.value = !0;
				try {
					await x.portForwardEnable(), S.success("Port forwarding enabled."), await q();
				} catch (e) {
					S.error(r(e, "Failed to enable port forwarding."));
				} finally {
					G.value = !1;
				}
			}
		}
		async function cn() {
			if (!K.value) {
				K.value = !0;
				try {
					await x.portForwardDisable(), S.success("Port forwarding disabled."), await q();
				} catch (e) {
					S.error(r(e, "Failed to disable port forwarding."));
				} finally {
					K.value = !1;
				}
			}
		}
		let J = _(null), Y = _(null), X = _(null), Z = _([]), Q = _(!1), $ = _(null);
		async function ln() {
			Q.value = !0, $.value = null;
			try {
				let e = await At.getHealthSnapshot();
				J.value = e.relay, Y.value = e.hub, X.value = e.network, e.network.latencyMs !== null && (Z.value.push({
					ms: e.network.latencyMs,
					at: e.network.measuredAt
				}), Z.value.length > Ot && (Z.value = Z.value.slice(-10)));
			} catch (e) {
				$.value = r(e, "Failed to load network health."), S.error($.value);
			} finally {
				Q.value = !1;
			}
		}
		function un() {
			!Q.value && J.value === null && ln();
		}
		let dn = l(() => {
			if (Q.value) return "Loading…";
			if ($.value) return "Error loading";
			if (J.value === null) return "Not available";
			let e = X.value?.latencyMs, t = X.value?.status ?? "offline";
			return e == null ? t : `${t} (${e}ms)`;
		});
		return de(() => {
			Pt(), Gt(), Qt(), q();
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
			}, null, 8, ["name"])]), p("span", Se, v(Nt.value), 1)], 8, be), w.value.hub ? (g(), f("div", Ce, [D.value ? (g(), f("div", we, [h(o, {
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
					onClick: Pt
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
				loading: A.value,
				onClick: Bt
			}, {
				default: y(() => [...n[16] ||= [m(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), h(i, {
				variant: "ghost",
				size: "sm",
				loading: k.value,
				onClick: zt
			}, {
				default: y(() => [...n[17] ||= [m(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: Ft
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
			}, null, 8, ["name"])]), p("span", je, v(Wt.value), 1)], 8, ke), w.value.subdomain ? (g(), f("div", Me, [Vt.value ? (g(), f("div", Ne, [h(o, {
				variant: "text",
				lines: 2
			})])) : L.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load subdomain status",
				description: L.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Gt
				}, {
					default: y(() => [...n[19] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : I.value === null ? (g(), f("p", Pe, " No subdomain status available. ")) : (g(), f(c, { key: 3 }, [I.value.claimed ? (g(), f("dl", Fe, [I.value.subdomain ? (g(), f(c, { key: 0 }, [n[20] ||= p("dt", null, "Subdomain", -1), p("dd", null, v(I.value.subdomain), 1)], 64)) : d("", !0), I.value.fqdn ? (g(), f(c, { key: 1 }, [n[21] ||= p("dt", null, "FQDN", -1), p("dd", null, v(I.value.fqdn), 1)], 64)) : d("", !0)])) : d("", !0), p("div", Ie, [I.value.claimed ? (g(), u(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: Ut.value,
				onClick: qt
			}, {
				default: y(() => [...n[23] ||= [m(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: Ht.value,
				onClick: Kt
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
			}, null, 8, ["name"])]), p("span", Be, v(Xt.value), 1)], 8, Re), w.value.relay ? (g(), f("div", Ve, [Jt.value ? (g(), f("div", He, [h(o, {
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
					onClick: Qt
				}, {
					default: y(() => [...n[25] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : R.value === null ? (g(), f("p", Ue, " No relay status available. ")) : (g(), f(c, { key: 3 }, [p("dl", We, [
				n[27] ||= p("dt", null, "Status", -1),
				p("dd", null, [h(a, { tone: R.value.connected ? "success" : "neutral" }, {
					default: y(() => [m(v(R.value.connected ? "Connected" : "Disconnected"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				n[28] ||= p("dt", null, "Active", -1),
				p("dd", null, v(R.value.active ? "Yes" : "No"), 1),
				H.value === null ? d("", !0) : (g(), f(c, { key: 0 }, [n[26] ||= p("dt", null, "Latency", -1), p("dd", null, v(H.value) + "ms", 1)], 64))
			]), p("div", Ge, [h(i, {
				variant: "outline",
				size: "sm",
				loading: Yt.value,
				disabled: !R.value.connected,
				onClick: tn
			}, {
				default: y(() => [...n[29] ||= [m(" Ping ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]), R.value.connected ? (g(), u(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: V.value,
				disabled: Zt.value,
				onClick: en
			}, {
				default: y(() => [...n[31] ||= [m(" Disable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: B.value,
				disabled: Zt.value,
				onClick: $t
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
			}, null, 8, ["name"])]), p("span", Ye, v(an.value), 1)], 8, qe), w.value.portforward ? (g(), f("div", Xe, [nn.value ? (g(), f("div", Ze, [h(o, {
				variant: "text",
				lines: 3
			})])) : W.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load port-forward status",
				description: W.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: q
				}, {
					default: y(() => [...n[33] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : U.value === null ? (g(), f("p", Qe, " No port-forward status available. ")) : (g(), f(c, { key: 3 }, [
				p("dl", $e, [
					n[37] ||= p("dt", null, "Enabled", -1),
					p("dd", null, [h(a, { tone: U.value.enabled ? "success" : "neutral" }, {
						default: y(() => [m(v(U.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					U.value.method ? (g(), f(c, { key: 0 }, [n[34] ||= p("dt", null, "Method", -1), p("dd", null, v(U.value.method), 1)], 64)) : d("", !0),
					U.value.externalIp ? (g(), f(c, { key: 1 }, [n[35] ||= p("dt", null, "External IP", -1), p("dd", null, v(U.value.externalIp), 1)], 64)) : d("", !0),
					U.value.externalPort ? (g(), f(c, { key: 2 }, [n[36] ||= p("dt", null, "External port", -1), p("dd", null, v(U.value.externalPort), 1)], 64)) : d("", !0)
				]),
				rn.value.length > 0 ? (g(), f("div", et, [n[38] ||= p("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), p("ul", tt, [(g(!0), f(c, null, fe(rn.value, (e, t) => (g(), f("li", { key: t }, v(e.hostname), 1))), 128))])])) : d("", !0),
				p("div", nt, [U.value.enabled ? (g(), u(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: K.value,
					disabled: on.value,
					onClick: cn
				}, {
					default: y(() => [...n[40] ||= [m(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: G.value,
					disabled: on.value,
					onClick: sn
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
			}, null, 8, ["name"])]), p("span", ot, v(dn.value), 1)], 8, it), w.value.networkhealth ? (g(), f("div", st, [Q.value ? (g(), f("div", ct, [h(o, {
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
					onClick: ln
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
					n[57] ||= oe("<div class=\"admin-remote__latency-legend\" data-v-eb14d130><span class=\"admin-remote__latency-legend-item\" data-v-eb14d130><span class=\"admin-remote__latency-dot admin-remote__latency-dot--good\" data-v-eb14d130></span> &lt;100ms</span><span class=\"admin-remote__latency-legend-item\" data-v-eb14d130><span class=\"admin-remote__latency-dot admin-remote__latency-dot--warn\" data-v-eb14d130></span> 100-500ms</span><span class=\"admin-remote__latency-legend-item\" data-v-eb14d130><span class=\"admin-remote__latency-dot admin-remote__latency-dot--bad\" data-v-eb14d130></span> &gt;500ms</span></div>", 1)
				])) : d("", !0),
				p("div", St, [h(i, {
					variant: "outline",
					size: "sm",
					loading: Q.value,
					onClick: ln
				}, {
					default: y(() => [...n[58] ||= [m(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading"])])
			], 64)) : (g(), f("p", Ct, " No network health data available. "))])) : d("", !0)]),
			h(ee, {
				modelValue: j.value,
				"onUpdate:modelValue": n[7] ||= (e) => j.value = e,
				title: "Initiate Hub Pairing",
				onClose: It
			}, {
				footer: y(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: It
				}, {
					default: y(() => [...n[62] ||= [m("Cancel", -1)]]),
					_: 1
				}), N.value ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: Mt.value,
					onClick: Rt
				}, {
					default: y(() => [...n[63] ||= [m(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (g(), u(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: F.value,
					disabled: M.value === "",
					onClick: Lt
				}, {
					default: y(() => [...n[64] ||= [m(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: y(() => [N.value ? (g(), f("div", wt, [n[59] ||= p("p", null, "Enter this claim code on the hub:", -1), p("p", Tt, v(N.value), 1)])) : (g(), f("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: he(Lt, ["prevent"])
				}, [p("label", Et, [n[60] ||= p("span", { class: "admin-remote__label" }, "Hub URL", -1), me(p("input", {
					"onUpdate:modelValue": n[5] ||= (e) => M.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[pe, M.value]])]), p("label", Dt, [n[61] ||= p("span", { class: "admin-remote__label" }, "Server name", -1), me(p("input", {
					"onUpdate:modelValue": n[6] ||= (e) => jt.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[pe, jt.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-eb14d130"]]);
//#endregion
export { b as default };

//# sourceMappingURL=RemoteAccessPage-zIUE-tL5.js.map