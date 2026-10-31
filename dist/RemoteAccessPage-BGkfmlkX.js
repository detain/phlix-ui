import { t as e, v as t, x as n } from "./client-57OweUrJ.js";
import { t as ee } from "./remoteAccess-CfwF1DC5.js";
import { t as te } from "./networkHealth-DFUczi19.js";
import { t as ne } from "./useToastStore-Bu-iYU7r.js";
import { t as r } from "./Badge-C6LNO9Kk.js";
import { t as re } from "./PageHint-BlhPmafC.js";
import { t as ie } from "./helpLinks-iarZuNmw.js";
import { t as i } from "./Button-1sKEdGjj.js";
import { t as ae } from "./Modal-BU4hJGBA.js";
import { t as a } from "./Skeleton-B2Mt2L00.js";
import { t as o } from "./EmptyState-BjOJ1k_A.js";
import { n as oe, t as s } from "./Icon-CIbfiPrs.js";
import { a as se } from "./plural-B3O2rVPV.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createStaticVNode as ce, createTextVNode as m, createVNode as h, defineComponent as le, inject as ue, normalizeClass as de, normalizeStyle as fe, onMounted as pe, openBlock as g, ref as _, renderList as me, toDisplayString as v, unref as he, vModelText as ge, withCtx as y, withDirectives as _e, withModifiers as ve } from "vue";
// src/pages/admin/RemoteAccessPage.vue?vue&type=script&setup=true&lang.ts
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
}, qe = { class: "admin-remote__dl" }, Je = { class: "admin-remote__freshness admin-remote__freshness--relay-status" }, Ye = {
	key: 0,
	class: "admin-remote__hint"
}, Xe = { class: "admin-remote__error-text" }, Ze = { class: "admin-remote__actions" }, Qe = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-portforward-heading"
}, $e = ["aria-expanded"], et = { class: "admin-remote__section-title" }, tt = { class: "admin-remote__section-summary" }, nt = {
	key: 0,
	id: "remote-portforward-body",
	class: "admin-remote__section-body"
}, rt = {
	key: 0,
	class: "admin-remote__skel"
}, it = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, at = { class: "admin-remote__dl" }, ot = {
	key: 0,
	class: "admin-remote__candidates"
}, st = { class: "admin-remote__candidates-list" }, ct = { class: "admin-remote__actions" }, lt = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-networkhealth-heading"
}, ut = ["aria-expanded"], dt = { class: "admin-remote__section-title" }, ft = { class: "admin-remote__section-summary" }, pt = {
	key: 0,
	id: "remote-networkhealth-body",
	class: "admin-remote__section-body"
}, mt = {
	key: 0,
	class: "admin-remote__skel"
}, ht = { class: "admin-remote__health-grid" }, gt = { class: "admin-remote__health-card" }, _t = { class: "admin-remote__dl" }, vt = { class: "admin-remote__freshness admin-remote__freshness--relay-health" }, yt = { class: "admin-remote__health-connect-error" }, bt = { class: "admin-remote__health-connect-error-at" }, xt = { class: "admin-remote__health-card" }, St = { class: "admin-remote__dl" }, Ct = { class: "admin-remote__freshness admin-remote__freshness--hub-health" }, wt = { class: "admin-remote__hub-last-latency" }, Tt = { class: "admin-remote__health-card" }, Et = { class: "admin-remote__dl" }, Dt = { class: "admin-remote__latency-current" }, Ot = { class: "admin-remote__capitalize" }, kt = { class: "admin-remote__freshness admin-remote__freshness--network" }, At = { class: "admin-remote__stale-reason" }, jt = {
	key: 0,
	class: "admin-remote__latency-graph"
}, Mt = { class: "admin-remote__latency-graph-title" }, Nt = {
	key: 0,
	class: "admin-remote__latency-stale-note",
	role: "status"
}, Pt = ["aria-label"], Ft = ["title"], It = { class: "admin-remote__latency-value" }, Lt = { class: "admin-remote__actions" }, Rt = {
	key: 3,
	class: "admin-remote__offline-info"
}, zt = {
	key: 0,
	class: "admin-remote__offline-msg"
}, Bt = {
	key: 1,
	class: "admin-remote__offline-msg"
}, Vt = {
	key: 2,
	class: "admin-remote__offline-msg"
}, Ht = {
	key: 4,
	class: "admin-remote__empty",
	role: "status"
}, Ut = {
	key: 0,
	class: "admin-remote__claim"
}, Wt = { class: "admin-remote__claim-code" }, Gt = { class: "admin-remote__field" }, Kt = { class: "admin-remote__field" }, qt = 10, Jt = "Not measured yet", b = /*#__PURE__*/ oe(/* @__PURE__ */ le({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(oe) {
		let le = oe, b = ue("apiBase", ""), Yt = l(() => typeof b == "string" ? b : b?.value ?? ""), x = new ee(le.client ?? new e({ baseUrl: Yt.value })), Xt = new te(le.client ?? new e({ baseUrl: Yt.value })), S = ne();
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
			w.value[e] = !t, e === "networkhealth" && !t && Rn();
		}
		let E = _(null), D = _(!0), O = _(null), k = _(!1), A = _(!1), Zt = _(!1), j = _(""), Qt = _("Phlix Server"), M = _(null), $t = _(null), en = _(!1), tn = _(!1), nn = l(() => D.value ? "Loading…" : E.value === null ? "Unable to load" : E.value.paired ? `Paired${E.value.serverId ? ` (${E.value.serverId})` : ""}` : "Not paired");
		async function rn() {
			D.value = !0, O.value = null;
			try {
				E.value = await x.hubStatus();
			} catch (e) {
				O.value = n(e, "Failed to load hub status."), S.error(O.value);
			} finally {
				D.value = !1;
			}
		}
		function an() {
			Zt.value = !0;
		}
		function on() {
			Zt.value = !1, M.value = null, $t.value = null;
		}
		async function sn() {
			if (!en.value) {
				if (j.value === "") S.error("Hub URL is required.");
				else {
					en.value = !0;
					try {
						let e = await x.hubPair(j.value, Qt.value);
						e.success && (M.value = e.claimCode ?? null, $t.value = e.claimId ?? null, S.success("Pairing initiated. Complete the claim on the hub, then poll."));
					} catch (e) {
						S.error(n(e, "Failed to initiate pairing."));
					} finally {
						en.value = !1;
					}
				}
			}
		}
		async function cn() {
			if ($t.value !== null && j.value !== "" && !tn.value) {
				tn.value = !0;
				try {
					let e = await x.hubPoll($t.value, j.value);
					e.success && e.token ? (await x.hubComplete(e.token, "", e.serverId ?? "", j.value), S.success("Hub paired successfully."), on(), await rn()) : !e.success && e.message && S.error(e.message);
				} catch (e) {
					S.error(n(e, "Failed to poll pairing status."));
				} finally {
					tn.value = !1;
				}
			}
		}
		async function ln() {
			if (!k.value) {
				k.value = !0;
				try {
					await x.hubUnenroll(), S.success("Hub unenrolled."), await rn();
				} catch (e) {
					S.error(n(e, "Failed to unenroll."));
				} finally {
					k.value = !1;
				}
			}
		}
		async function un() {
			if (!A.value) {
				A.value = !0;
				try {
					(await x.hubHeartbeat()).success && S.success("Heartbeat sent.");
				} catch (e) {
					S.error(n(e, "Failed to send heartbeat."));
				} finally {
					A.value = !1;
				}
			}
		}
		let N = _(null), dn = _(!0), P = _(null), fn = _(!1), pn = _(!1), mn = l(() => dn.value ? "Loading…" : N.value === null ? "Unable to load" : N.value.claimed ? `Claimed${N.value.subdomain ? ` (${N.value.subdomain})` : ""}` : "Not claimed");
		async function hn() {
			dn.value = !0, P.value = null;
			try {
				N.value = await x.subdomainStatus();
			} catch (e) {
				P.value = n(e, "Failed to load subdomain status."), S.error(P.value);
			} finally {
				dn.value = !1;
			}
		}
		async function gn() {
			if (!fn.value) {
				fn.value = !0;
				try {
					await x.subdomainClaim(), S.success("Subdomain claimed."), await hn();
				} catch (e) {
					S.error(n(e, "Failed to claim subdomain."));
				} finally {
					fn.value = !1;
				}
			}
		}
		async function _n() {
			if (!pn.value) {
				pn.value = !0;
				try {
					await x.subdomainRelease(), S.success("Subdomain released."), await hn();
				} catch (e) {
					S.error(n(e, "Failed to release subdomain."));
				} finally {
					pn.value = !1;
				}
			}
		}
		let F = _(null), vn = _(!0), I = _(null), L = _(!1), R = _(!1), yn = _(!1), z = _(null), bn = l(() => {
			if (vn.value) return "Loading…";
			let e = F.value;
			if (e === null) return "Unable to load";
			if (e.connected) {
				let e = z.value?.latencyMs;
				return e == null ? "Connected" : `Connected (${e}ms latency)`;
			}
			return e.disabled ? "Disabled" : e.enrolled === !1 ? "Not paired" : "Disconnected";
		}), xn = l(() => L.value || R.value), Sn = l(() => {
			let e = z.value;
			return e === null ? null : e.latencyMs == null ? "Not measured yet" : `${e.latencyMs}ms`;
		});
		async function B() {
			vn.value = !0, I.value = null;
			try {
				F.value = await x.relayStatus(), z.value = null;
			} catch (e) {
				I.value = n(e, "Failed to load relay status."), S.error(I.value);
			} finally {
				vn.value = !1;
			}
		}
		async function Cn() {
			if (!L.value) {
				L.value = !0;
				try {
					let e = await x.relayEnable();
					S.success(e.message || "Relay enabled; takes effect on the next server reload.", e.disabled ? { tone: "warning" } : void 0), await B();
				} catch (e) {
					S.error(n(e, "Failed to enable relay."));
				} finally {
					L.value = !1;
				}
			}
		}
		async function wn() {
			if (!R.value) {
				R.value = !0;
				try {
					let e = await x.relayDisable();
					S.success(e.message || "Relay disabled; takes effect on the next server reload."), await B();
				} catch (e) {
					S.error(n(e, "Failed to disable relay."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function Tn() {
			if (!yn.value) {
				yn.value = !0;
				try {
					let e = await x.relayPing();
					z.value = e, e.latencyMs == null ? S.info("Relay connected; latency not measured yet.") : S.success(`Relay latency: ${e.latencyMs}ms.`);
				} catch (e) {
					if (z.value = null, e instanceof t && e.status === 409) {
						let t = e.body ?? null, n = t?.lastConnectError ? ` (${t.lastConnectError})` : "";
						S.error(`${t?.message ?? "Relay not connected."}${n}`), await B();
					} else S.error(n(e, "Failed to ping relay."));
				} finally {
					yn.value = !1;
				}
			}
		}
		let V = _(null), H = _(!0), U = _(null), W = _(!1), G = _(!1), En = _([]), Dn = l(() => H.value ? "Loading…" : V.value === null ? "Unable to load" : V.value.enabled ? V.value.externalIp ? `Enabled (${V.value.externalIp}:${V.value.externalPort})` : "Enabled" : "Disabled"), On = l(() => W.value || G.value);
		async function K() {
			H.value = !0, U.value = null;
			try {
				let [e, t] = await Promise.all([x.portForwardStatus(), x.portForwardCandidates()]);
				V.value = e, En.value = t.candidates;
			} catch (e) {
				U.value = n(e, "Failed to load port-forward status."), S.error(U.value);
			} finally {
				H.value = !1;
			}
		}
		async function kn() {
			if (!W.value) {
				W.value = !0;
				try {
					await x.portForwardEnable(), S.success("Port forwarding enabled."), await K();
				} catch (e) {
					S.error(n(e, "Failed to enable port forwarding."));
				} finally {
					W.value = !1;
				}
			}
		}
		async function An() {
			if (!G.value) {
				G.value = !0;
				try {
					await x.portForwardDisable(), S.success("Port forwarding disabled."), await K();
				} catch (e) {
					S.error(n(e, "Failed to disable port forwarding."));
				} finally {
					G.value = !1;
				}
			}
		}
		let q = _(null), J = _(null), Y = _(null), X = _([]), Z = _(!1), Q = _(null), $ = l(() => Y.value?.stale === !0), jn = l(() => $.value ? "Stale" : "Live"), Mn = l(() => q.value?.stale === !0 ? "Stale" : "Live"), Nn = l(() => J.value?.stale === !0 ? "Stale" : "Live"), Pn = l(() => F.value?.stale === !0 ? "Stale" : "Live"), Fn = l(() => {
			let e = Y.value?.latencyMs;
			return e == null ? Jt : `${e}ms`;
		}), In = l(() => {
			let e = J.value?.lastLatencyMs;
			return e == null ? Jt : `${e}ms`;
		});
		async function Ln() {
			Z.value = !0, Q.value = null;
			try {
				let e = await Xt.getHealthSnapshot();
				if (q.value = e.relay, J.value = e.hub, Y.value = e.network, e.network.latencyMs !== null) {
					let t = e.network.measuredAt;
					X.value.some((e) => e.at === t) || (X.value.push({
						ms: e.network.latencyMs,
						at: t,
						stale: e.network.stale
					}), X.value.length > qt && (X.value = X.value.slice(-10)));
				}
			} catch (e) {
				Q.value = n(e, "Failed to load network health."), S.error(Q.value);
			} finally {
				Z.value = !1;
			}
		}
		function Rn() {
			!Z.value && q.value === null && Ln();
		}
		let zn = l(() => {
			if (Z.value) return "Loading…";
			if (Q.value) return "Error loading";
			if (q.value === null) return "Not available";
			let e = Y.value?.latencyMs, t = Y.value?.status ?? "offline", n = $.value ? " — stale" : "";
			return e == null ? `${t}${n}` : `${t} (${e}ms)${n}`;
		});
		return pe(() => {
			rn(), hn(), B(), K();
		}), (e, t) => (g(), f("section", ye, [
			p("header", be, [p("h1", xe, [h(s, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), t[8] ||= m(" Remote Access ", -1)])]),
			h(re, {
				links: he(ie)["remote-access"].links,
				details: he(ie)["remote-access"].details
			}, {
				default: y(() => [...t[9] ||= [
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
				onClick: t[0] ||= (e) => T("hub")
			}, [p("span", we, [t[10] ||= p("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), h(s, {
				name: w.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Te, v(nn.value), 1)], 8, Ce), w.value.hub ? (g(), f("div", Ee, [D.value ? (g(), f("div", De, [h(a, {
				variant: "text",
				lines: 3
			})])) : O.value ? (g(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load hub status",
				description: O.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: rn
				}, {
					default: y(() => [...t[11] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : E.value === null ? (g(), f("p", Oe, " No hub status available. ")) : (g(), f(c, { key: 3 }, [E.value.paired ? (g(), f("dl", ke, [
				E.value.serverId ? (g(), f(c, { key: 0 }, [t[12] ||= p("dt", null, "Server ID", -1), p("dd", null, v(E.value.serverId), 1)], 64)) : d("", !0),
				E.value.hubUrl ? (g(), f(c, { key: 1 }, [t[13] ||= p("dt", null, "Hub URL", -1), p("dd", null, v(E.value.hubUrl), 1)], 64)) : d("", !0),
				E.value.enrolledAt ? (g(), f(c, { key: 2 }, [t[14] ||= p("dt", null, "Enrolled at", -1), p("dd", null, v(C(E.value.enrolledAt)), 1)], 64)) : d("", !0)
			])) : d("", !0), p("div", Ae, [E.value.paired ? (g(), f(c, { key: 1 }, [h(i, {
				variant: "outline",
				size: "sm",
				loading: A.value,
				onClick: un
			}, {
				default: y(() => [...t[16] ||= [m(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), h(i, {
				variant: "ghost",
				size: "sm",
				loading: k.value,
				onClick: ln
			}, {
				default: y(() => [...t[17] ||= [m(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: an
			}, {
				default: y(() => [...t[15] ||= [m(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : d("", !0)]),
			p("section", je, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: t[1] ||= (e) => T("subdomain")
			}, [p("span", Ne, [t[18] ||= p("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), h(s, {
				name: w.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Pe, v(mn.value), 1)], 8, Me), w.value.subdomain ? (g(), f("div", Fe, [dn.value ? (g(), f("div", Ie, [h(a, {
				variant: "text",
				lines: 2
			})])) : P.value ? (g(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load subdomain status",
				description: P.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: hn
				}, {
					default: y(() => [...t[19] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : N.value === null ? (g(), f("p", Le, " No subdomain status available. ")) : (g(), f(c, { key: 3 }, [N.value.claimed ? (g(), f("dl", Re, [N.value.subdomain ? (g(), f(c, { key: 0 }, [t[20] ||= p("dt", null, "Subdomain", -1), p("dd", null, v(N.value.subdomain), 1)], 64)) : d("", !0), N.value.fqdn ? (g(), f(c, { key: 1 }, [t[21] ||= p("dt", null, "FQDN", -1), p("dd", null, v(N.value.fqdn), 1)], 64)) : d("", !0)])) : d("", !0), p("div", ze, [N.value.claimed ? (g(), u(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: pn.value,
				onClick: _n
			}, {
				default: y(() => [...t[23] ||= [m(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: fn.value,
				onClick: gn
			}, {
				default: y(() => [...t[22] ||= [m(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : d("", !0)]),
			p("section", Be, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: t[2] ||= (e) => T("relay")
			}, [p("span", He, [t[24] ||= p("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), h(s, {
				name: w.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Ue, v(bn.value), 1)], 8, Ve), w.value.relay ? (g(), f("div", We, [vn.value ? (g(), f("div", Ge, [h(a, {
				variant: "text",
				lines: 2
			})])) : I.value ? (g(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load relay status",
				description: I.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: y(() => [...t[25] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : F.value === null ? (g(), f("p", Ke, " No relay status available. ")) : (g(), f(c, { key: 3 }, [
				p("dl", qe, [
					t[28] ||= p("dt", null, "Status", -1),
					p("dd", null, [h(r, { tone: F.value.connected ? "success" : "neutral" }, {
						default: y(() => [m(v(F.value.connected ? "Connected" : "Disconnected"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					t[29] ||= p("dt", null, "State file", -1),
					p("dd", null, [h(r, { tone: F.value.stale ? "warning" : "success" }, {
						default: y(() => [p("span", Je, v(Pn.value), 1)]),
						_: 1
					}, 8, ["tone"])]),
					t[30] ||= p("dt", null, "Active", -1),
					p("dd", null, v(F.value.active ? "Yes" : "No"), 1),
					t[31] ||= p("dt", null, "Enrolled", -1),
					p("dd", null, [h(r, { tone: F.value.enrolled ? "success" : "neutral" }, {
						default: y(() => [m(v(F.value.enrolled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					t[32] ||= p("dt", null, "Kill-switch", -1),
					p("dd", null, [h(r, { tone: F.value.disabled ? "warning" : "success" }, {
						default: y(() => [m(v(F.value.disabled ? "Disabled" : "Enabled"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					Sn.value === null ? d("", !0) : (g(), f(c, { key: 0 }, [t[26] ||= p("dt", null, "Latency", -1), p("dd", null, [m(v(Sn.value) + " ", 1), z.value && z.value.latencyMs != null ? (g(), f("span", Ye, v(z.value.heartbeatStale === !0 ? "(stale — heartbeat worker not running)" : "(last recorded heartbeat)"), 1)) : d("", !0)])], 64)),
					F.value.lastConnectError ? (g(), f(c, { key: 1 }, [t[27] ||= p("dt", null, "Last error", -1), p("dd", Xe, [m(v(F.value.lastConnectError) + " ", 1), F.value.lastConnectErrorAt ? (g(), f(c, { key: 0 }, [m(" (" + v(C(F.value.lastConnectErrorAt)) + ") ", 1)], 64)) : d("", !0)])], 64)) : d("", !0)
				]),
				t[36] ||= p("p", {
					class: "admin-remote__notice",
					role: "note"
				}, " Enable and Disable persist a setting the relay reads on start-up — the change takes effect on the next server reload, not instantly. ", -1),
				p("div", Ze, [h(i, {
					variant: "outline",
					size: "sm",
					loading: yn.value,
					disabled: !F.value.connected,
					onClick: Tn
				}, {
					default: y(() => [...t[33] ||= [m(" Ping ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]), F.value.disabled ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: L.value,
					disabled: xn.value,
					onClick: Cn
				}, {
					default: y(() => [...t[34] ||= [m(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), u(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: R.value,
					disabled: xn.value,
					onClick: wn
				}, {
					default: y(() => [...t[35] ||= [m(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : d("", !0)]),
			p("section", Qe, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: t[3] ||= (e) => T("portforward")
			}, [p("span", et, [t[37] ||= p("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), h(s, {
				name: w.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", tt, v(Dn.value), 1)], 8, $e), w.value.portforward ? (g(), f("div", nt, [H.value ? (g(), f("div", rt, [h(a, {
				variant: "text",
				lines: 3
			})])) : U.value ? (g(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load port-forward status",
				description: U.value
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: y(() => [...t[38] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : V.value === null ? (g(), f("p", it, " No port-forward status available. ")) : (g(), f(c, { key: 3 }, [
				p("dl", at, [
					t[42] ||= p("dt", null, "Enabled", -1),
					p("dd", null, [h(r, { tone: V.value.enabled ? "success" : "neutral" }, {
						default: y(() => [m(v(V.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					V.value.method ? (g(), f(c, { key: 0 }, [t[39] ||= p("dt", null, "Method", -1), p("dd", null, v(V.value.method), 1)], 64)) : d("", !0),
					V.value.externalIp ? (g(), f(c, { key: 1 }, [t[40] ||= p("dt", null, "External IP", -1), p("dd", null, v(V.value.externalIp), 1)], 64)) : d("", !0),
					V.value.externalPort ? (g(), f(c, { key: 2 }, [t[41] ||= p("dt", null, "External port", -1), p("dd", null, v(V.value.externalPort), 1)], 64)) : d("", !0)
				]),
				En.value.length > 0 ? (g(), f("div", ot, [t[43] ||= p("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), p("ul", st, [(g(!0), f(c, null, me(En.value, (e, t) => (g(), f("li", { key: t }, v(e.hostname), 1))), 128))])])) : d("", !0),
				p("div", ct, [V.value.enabled ? (g(), u(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: G.value,
					disabled: On.value,
					onClick: An
				}, {
					default: y(() => [...t[45] ||= [m(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: W.value,
					disabled: On.value,
					onClick: kn
				}, {
					default: y(() => [...t[44] ||= [m(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : d("", !0)]),
			p("section", lt, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.networkhealth,
				"aria-controls": "remote-networkhealth-body",
				onClick: t[4] ||= (e) => T("networkhealth")
			}, [p("span", dt, [t[46] ||= p("h2", { id: "remote-networkhealth-heading" }, "Network Health", -1), h(s, {
				name: w.value.networkhealth ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", ft, v(zn.value), 1)], 8, ut), w.value.networkhealth ? (g(), f("div", pt, [Z.value ? (g(), f("div", mt, [h(a, {
				variant: "text",
				lines: 4
			})])) : Q.value ? (g(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load network health",
				description: Q.value ?? void 0
			}, {
				actions: y(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Ln
				}, {
					default: y(() => [...t[47] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value !== null && J.value !== null ? (g(), f(c, { key: 2 }, [
				p("div", ht, [
					p("div", gt, [t[55] ||= p("h3", { class: "admin-remote__health-card-title" }, "Relay Tunnel", -1), p("dl", _t, [
						t[51] ||= p("dt", null, "Status", -1),
						p("dd", null, [h(r, { tone: q.value.connected ? "success" : "error" }, {
							default: y(() => [m(v(q.value.connected ? q.value.active ? "Active" : "Connecting" : "Disconnected"), 1)]),
							_: 1
						}, 8, ["tone"])]),
						t[52] ||= p("dt", null, "State file", -1),
						p("dd", null, [h(r, { tone: q.value.stale ? "warning" : "success" }, {
							default: y(() => [p("span", vt, v(Mn.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						t[53] ||= p("dt", null, "Reconnect attempts", -1),
						p("dd", null, v(q.value.reconnectAttempts), 1),
						q.value.lastDisconnectTime ? (g(), f(c, { key: 0 }, [t[48] ||= p("dt", null, "Last disconnect", -1), p("dd", null, v(C(q.value.lastDisconnectTime)), 1)], 64)) : d("", !0),
						q.value.lastConnectError === null ? d("", !0) : (g(), f(c, { key: 1 }, [t[49] ||= p("dt", null, "Last error", -1), p("dd", yt, v(q.value.lastConnectError), 1)], 64)),
						q.value.lastConnectErrorAt === null ? d("", !0) : (g(), f(c, { key: 2 }, [t[50] ||= p("dt", null, "Last error at", -1), p("dd", bt, v(C(q.value.lastConnectErrorAt)), 1)], 64)),
						t[54] ||= p("dt", null, "Active sessions", -1),
						p("dd", null, v(q.value.activeSessions), 1)
					])]),
					p("div", xt, [t[62] ||= p("h3", { class: "admin-remote__health-card-title" }, "Hub Heartbeat", -1), p("dl", St, [
						t[58] ||= p("dt", null, "Enrolled", -1),
						p("dd", null, [h(r, { tone: J.value.isEnrolled ? "success" : "neutral" }, {
							default: y(() => [m(v(J.value.isEnrolled ? "Yes" : "No"), 1)]),
							_: 1
						}, 8, ["tone"])]),
						t[59] ||= p("dt", null, "State file", -1),
						p("dd", null, [h(r, { tone: J.value.stale ? "warning" : "success" }, {
							default: y(() => [p("span", Ct, v(Nn.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						t[60] ||= p("dt", null, "Consecutive failures", -1),
						p("dd", null, [h(r, { tone: J.value.consecutiveFailures > 0 ? "warning" : "success" }, {
							default: y(() => [m(v(J.value.consecutiveFailures), 1)]),
							_: 1
						}, 8, ["tone"])]),
						J.value.lastSuccessfulHeartbeat ? (g(), f(c, { key: 0 }, [t[56] ||= p("dt", null, "Last success", -1), p("dd", null, v(C(J.value.lastSuccessfulHeartbeat)), 1)], 64)) : d("", !0),
						t[61] ||= p("dt", null, "Last latency", -1),
						p("dd", wt, v(In.value), 1),
						J.value.enrollmentExpiresAt ? (g(), f(c, { key: 1 }, [t[57] ||= p("dt", null, "Expires", -1), p("dd", null, v(C(J.value.enrollmentExpiresAt)), 1)], 64)) : d("", !0)
					])]),
					p("div", Tt, [t[68] ||= p("h3", { class: "admin-remote__health-card-title" }, "Network Latency", -1), p("dl", Et, [
						t[65] ||= p("dt", null, "Current", -1),
						p("dd", null, [h(r, { tone: Y.value?.status === "healthy" ? "success" : Y.value?.status === "degraded" ? "warning" : "error" }, {
							default: y(() => [p("span", Dt, v(Fn.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						t[66] ||= p("dt", null, "Status", -1),
						p("dd", Ot, v(Y.value?.status ?? "unknown"), 1),
						t[67] ||= p("dt", null, "Reading", -1),
						p("dd", null, [h(r, { tone: $.value ? "warning" : "success" }, {
							default: y(() => [p("span", kt, v(jn.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						Y.value?.measuredAt ? (g(), f(c, { key: 0 }, [t[63] ||= p("dt", null, "Measured", -1), p("dd", null, v(C(Y.value?.measuredAt)), 1)], 64)) : d("", !0),
						$.value && Y.value?.error ? (g(), f(c, { key: 1 }, [t[64] ||= p("dt", null, "Why", -1), p("dd", At, v(Y.value?.error), 1)], 64)) : d("", !0)
					])])
				]),
				X.value.length > 0 ? (g(), f("div", jt, [
					p("h3", Mt, "Latency History (last " + v(he(se)(X.value.length, "measurement", "measurements")) + ")", 1),
					$.value ? (g(), f("p", Nt, " No new measurement — the newest reading is stale. ")) : d("", !0),
					p("div", {
						class: "admin-remote__latency-bars",
						role: "img",
						"aria-label": `Latency graph showing ${he(se)(X.value.length, "measurement", "measurements")}`
					}, [(g(!0), f(c, null, me(X.value, (e, t) => (g(), f("div", {
						key: t,
						class: "admin-remote__latency-bar-wrap",
						title: `${e.ms}ms at ${C(e.at)}${e.stale ? " (stale)" : ""}`
					}, [p("div", {
						class: de(["admin-remote__latency-bar", [`admin-remote__latency-bar--${e.ms < 100 ? "good" : e.ms < 500 ? "warn" : "bad"}`, { "admin-remote__latency-bar--stale": e.stale }]]),
						style: fe({ height: `${Math.min(100, e.ms / 600 * 100)}%` })
					}, null, 6), p("span", It, v(e.ms), 1)], 8, Ft))), 128))], 8, Pt),
					t[69] ||= ce("<div class=\"admin-remote__latency-legend\" data-v-b0ae47f7><span class=\"admin-remote__latency-legend-item\" data-v-b0ae47f7><span class=\"admin-remote__latency-dot admin-remote__latency-dot--good\" data-v-b0ae47f7></span> &lt;100ms</span><span class=\"admin-remote__latency-legend-item\" data-v-b0ae47f7><span class=\"admin-remote__latency-dot admin-remote__latency-dot--warn\" data-v-b0ae47f7></span> 100-500ms</span><span class=\"admin-remote__latency-legend-item\" data-v-b0ae47f7><span class=\"admin-remote__latency-dot admin-remote__latency-dot--bad\" data-v-b0ae47f7></span> &gt;500ms</span></div>", 1)
				])) : d("", !0),
				p("div", Lt, [h(i, {
					variant: "outline",
					size: "sm",
					loading: Z.value,
					onClick: Ln
				}, {
					default: y(() => [...t[70] ||= [m(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading"])])
			], 64)) : Y.value?.status === "offline" ? (g(), f("div", Rt, [J.value !== null && J.value.isEnrolled === !1 ? (g(), f("p", zt, " Not enrolled in hub. ")) : q.value !== null && q.value.connected === !1 ? (g(), f("p", Bt, " Relay disconnected. ")) : (g(), f("p", Vt, " Hub unreachable. "))])) : (g(), f("p", Ht, " No network health data available. "))])) : d("", !0)]),
			h(ae, {
				modelValue: Zt.value,
				"onUpdate:modelValue": t[7] ||= (e) => Zt.value = e,
				title: "Initiate Hub Pairing",
				onClose: on
			}, {
				footer: y(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: on
				}, {
					default: y(() => [...t[74] ||= [m("Cancel", -1)]]),
					_: 1
				}), M.value ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: tn.value,
					onClick: cn
				}, {
					default: y(() => [...t[75] ||= [m(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (g(), u(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: en.value,
					disabled: j.value === "",
					onClick: sn
				}, {
					default: y(() => [...t[76] ||= [m(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: y(() => [M.value ? (g(), f("div", Ut, [t[71] ||= p("p", null, "Enter this claim code on the hub:", -1), p("p", Wt, v(M.value), 1)])) : (g(), f("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: ve(sn, ["prevent"])
				}, [p("label", Gt, [t[72] ||= p("span", { class: "admin-remote__label" }, "Hub URL", -1), _e(p("input", {
					"onUpdate:modelValue": t[5] ||= (e) => j.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[ge, j.value]])]), p("label", Kt, [t[73] ||= p("span", { class: "admin-remote__label" }, "Server name", -1), _e(p("input", {
					"onUpdate:modelValue": t[6] ||= (e) => Qt.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[ge, Qt.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-b0ae47f7"]]);
export { b as default };

//# sourceMappingURL=RemoteAccessPage-BGkfmlkX.js.map