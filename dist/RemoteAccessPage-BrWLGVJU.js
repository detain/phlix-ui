import { g as e, l as t, t as n, y as r } from "./client-pLl-rDdN.js";
import { t as ee } from "./remoteAccess-DA7ww6Te.js";
import { t as te } from "./networkHealth-DL-uay8f.js";
import { t as ne } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as re } from "./PageHint-BlhPmafC.js";
import { t as ie } from "./helpLinks-iarZuNmw.js";
import { t as a } from "./Button-1sKEdGjj.js";
import { t as ae } from "./Modal-CqHpm-F4.js";
import { t as o } from "./Skeleton-B2Mt2L00.js";
import { t as s } from "./EmptyState-BjOJ1k_A.js";
import { n as oe, t as c } from "./Icon-CIbfiPrs.js";
import { a as se } from "./plural-B3O2rVPV.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createStaticVNode as ce, createTextVNode as h, createVNode as g, defineComponent as le, inject as ue, normalizeClass as de, normalizeStyle as fe, onMounted as pe, openBlock as _, ref as v, renderList as me, toDisplayString as y, unref as he, vModelText as ge, withCtx as b, withDirectives as _e, withModifiers as ve } from "vue";
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
}, Wt = { class: "admin-remote__claim-code" }, Gt = { class: "admin-remote__field" }, Kt = { class: "admin-remote__field" }, qt = 10, Jt = "Not measured yet", x = /*#__PURE__*/ oe(/* @__PURE__ */ le({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(oe) {
		let le = oe, x = ue("apiBase", ""), Yt = u(() => typeof x == "string" ? x : x?.value ?? ""), S = new ee(le.client ?? new n({
			baseUrl: Yt.value,
			tokenStore: new t()
		})), Xt = new te(le.client ?? new n({
			baseUrl: Yt.value,
			tokenStore: new t()
		})), C = ne();
		function w(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
		}
		let T = v({
			hub: !0,
			subdomain: !1,
			relay: !1,
			portforward: !1,
			networkhealth: !1
		});
		function E(e) {
			let t = T.value[e];
			T.value[e] = !t, e === "networkhealth" && !t && zn();
		}
		let D = v(null), Zt = v(!0), O = v(null), Qt = v(!1), $t = v(!1), en = v(!1), k = v(""), tn = v("Phlix Server"), A = v(null), nn = v(null), j = v(!1), M = v(!1), rn = u(() => Zt.value ? "Loading…" : D.value === null ? "Unable to load" : D.value.paired ? `Paired${D.value.serverId ? ` (${D.value.serverId})` : ""}` : "Not paired");
		async function N() {
			Zt.value = !0, O.value = null;
			try {
				D.value = await S.hubStatus();
			} catch (e) {
				O.value = r(e, "Failed to load hub status."), C.error(O.value);
			} finally {
				Zt.value = !1;
			}
		}
		function an() {
			en.value = !0;
		}
		function on() {
			en.value = !1, A.value = null, nn.value = null;
		}
		async function sn() {
			if (!j.value) {
				if (k.value === "") C.error("Hub URL is required.");
				else {
					j.value = !0;
					try {
						let e = await S.hubPair(k.value, tn.value);
						e.success && (A.value = e.claimCode ?? null, nn.value = e.claimId ?? null, C.success("Pairing initiated. Complete the claim on the hub, then poll."));
					} catch (e) {
						C.error(r(e, "Failed to initiate pairing."));
					} finally {
						j.value = !1;
					}
				}
			}
		}
		async function cn() {
			if (nn.value !== null && k.value !== "" && !M.value) {
				M.value = !0;
				try {
					let e = await S.hubPoll(nn.value, k.value);
					e.success && e.token ? (await S.hubComplete(e.token, "", e.serverId ?? "", k.value), C.success("Hub paired successfully."), on(), await N()) : !e.success && e.message && C.error(e.message);
				} catch (e) {
					C.error(r(e, "Failed to poll pairing status."));
				} finally {
					M.value = !1;
				}
			}
		}
		async function ln() {
			if (!Qt.value) {
				Qt.value = !0;
				try {
					await S.hubUnenroll(), C.success("Hub unenrolled."), await N();
				} catch (e) {
					C.error(r(e, "Failed to unenroll."));
				} finally {
					Qt.value = !1;
				}
			}
		}
		async function un() {
			if (!$t.value) {
				$t.value = !0;
				try {
					(await S.hubHeartbeat()).success && C.success("Heartbeat sent.");
				} catch (e) {
					C.error(r(e, "Failed to send heartbeat."));
				} finally {
					$t.value = !1;
				}
			}
		}
		let P = v(null), F = v(!0), I = v(null), dn = v(!1), fn = v(!1), pn = u(() => F.value ? "Loading…" : P.value === null ? "Unable to load" : P.value.claimed ? `Claimed${P.value.subdomain ? ` (${P.value.subdomain})` : ""}` : "Not claimed");
		async function mn() {
			F.value = !0, I.value = null;
			try {
				P.value = await S.subdomainStatus();
			} catch (e) {
				I.value = r(e, "Failed to load subdomain status."), C.error(I.value);
			} finally {
				F.value = !1;
			}
		}
		async function hn() {
			if (!dn.value) {
				dn.value = !0;
				try {
					await S.subdomainClaim(), C.success("Subdomain claimed."), await mn();
				} catch (e) {
					C.error(r(e, "Failed to claim subdomain."));
				} finally {
					dn.value = !1;
				}
			}
		}
		async function gn() {
			if (!fn.value) {
				fn.value = !0;
				try {
					await S.subdomainRelease(), C.success("Subdomain released."), await mn();
				} catch (e) {
					C.error(r(e, "Failed to release subdomain."));
				} finally {
					fn.value = !1;
				}
			}
		}
		let L = v(null), _n = v(!0), R = v(null), z = v(!1), B = v(!1), vn = v(!1), V = v(null), yn = u(() => {
			if (_n.value) return "Loading…";
			let e = L.value;
			if (e === null) return "Unable to load";
			if (e.connected) {
				let e = V.value?.latencyMs;
				return e == null ? "Connected" : `Connected (${e}ms latency)`;
			}
			return e.disabled ? "Disabled" : e.enrolled === !1 ? "Not paired" : "Disconnected";
		}), bn = u(() => z.value || B.value), xn = u(() => {
			let e = V.value;
			return e === null ? null : e.latencyMs == null ? "Not measured yet" : `${e.latencyMs}ms`;
		});
		async function H() {
			_n.value = !0, R.value = null;
			try {
				L.value = await S.relayStatus(), V.value = null;
			} catch (e) {
				R.value = r(e, "Failed to load relay status."), C.error(R.value);
			} finally {
				_n.value = !1;
			}
		}
		async function Sn() {
			if (!z.value) {
				z.value = !0;
				try {
					let e = await S.relayEnable();
					C.success(e.message || "Relay enabled; takes effect on the next server reload.", e.disabled ? { tone: "warning" } : void 0), await H();
				} catch (e) {
					C.error(r(e, "Failed to enable relay."));
				} finally {
					z.value = !1;
				}
			}
		}
		async function Cn() {
			if (!B.value) {
				B.value = !0;
				try {
					let e = await S.relayDisable();
					C.success(e.message || "Relay disabled; takes effect on the next server reload."), await H();
				} catch (e) {
					C.error(r(e, "Failed to disable relay."));
				} finally {
					B.value = !1;
				}
			}
		}
		async function wn() {
			if (!vn.value) {
				vn.value = !0;
				try {
					let e = await S.relayPing();
					V.value = e, e.latencyMs == null ? C.info("Relay connected; latency not measured yet.") : C.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (t) {
					if (V.value = null, t instanceof e && t.status === 409) {
						let e = t.body ?? null, n = e?.lastConnectError ? ` (${e.lastConnectError})` : "";
						C.error(`${e?.message ?? "Relay not connected."}${n}`), await H();
					} else C.error(r(t, "Failed to ping relay."));
				} finally {
					vn.value = !1;
				}
			}
		}
		let U = v(null), Tn = v(!0), W = v(null), G = v(!1), K = v(!1), En = v([]), Dn = u(() => Tn.value ? "Loading…" : U.value === null ? "Unable to load" : U.value.enabled ? U.value.externalIp ? `Enabled (${U.value.externalIp}:${U.value.externalPort})` : "Enabled" : "Disabled"), On = u(() => G.value || K.value);
		async function kn() {
			Tn.value = !0, W.value = null;
			try {
				let [e, t] = await Promise.all([S.portForwardStatus(), S.portForwardCandidates()]);
				U.value = e, En.value = t.candidates;
			} catch (e) {
				W.value = r(e, "Failed to load port-forward status."), C.error(W.value);
			} finally {
				Tn.value = !1;
			}
		}
		async function An() {
			if (!G.value) {
				G.value = !0;
				try {
					await S.portForwardEnable(), C.success("Port forwarding enabled."), await kn();
				} catch (e) {
					C.error(r(e, "Failed to enable port forwarding."));
				} finally {
					G.value = !1;
				}
			}
		}
		async function jn() {
			if (!K.value) {
				K.value = !0;
				try {
					await S.portForwardDisable(), C.success("Port forwarding disabled."), await kn();
				} catch (e) {
					C.error(r(e, "Failed to disable port forwarding."));
				} finally {
					K.value = !1;
				}
			}
		}
		let q = v(null), J = v(null), Y = v(null), X = v([]), Z = v(!1), Q = v(null), $ = u(() => Y.value?.stale === !0), Mn = u(() => $.value ? "Stale" : "Live"), Nn = u(() => q.value?.stale === !0 ? "Stale" : "Live"), Pn = u(() => J.value?.stale === !0 ? "Stale" : "Live"), Fn = u(() => L.value?.stale === !0 ? "Stale" : "Live"), In = u(() => {
			let e = Y.value?.latencyMs;
			return e == null ? Jt : `${e}ms`;
		}), Ln = u(() => {
			let e = J.value?.lastLatencyMs;
			return e == null ? Jt : `${e}ms`;
		});
		async function Rn() {
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
				Q.value = r(e, "Failed to load network health."), C.error(Q.value);
			} finally {
				Z.value = !1;
			}
		}
		function zn() {
			!Z.value && q.value === null && Rn();
		}
		let Bn = u(() => {
			if (Z.value) return "Loading…";
			if (Q.value) return "Error loading";
			if (q.value === null) return "Not available";
			let e = Y.value?.latencyMs, t = Y.value?.status ?? "offline", n = $.value ? " — stale" : "";
			return e == null ? `${t}${n}` : `${t} (${e}ms)${n}`;
		});
		return pe(() => {
			N(), mn(), H(), kn();
		}), (e, t) => (_(), p("section", ye, [
			m("header", be, [m("h1", xe, [g(c, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), t[8] ||= h(" Remote Access ", -1)])]),
			g(re, {
				links: he(ie)["remote-access"].links,
				details: he(ie)["remote-access"].details
			}, {
				default: b(() => [...t[9] ||= [
					h(" Reach your server from outside your home network. ", -1),
					m("strong", null, "Hub Pairing", -1),
					h(" links this server to a Phlix hub — ", -1),
					m("strong", null, "Initiate Pairing", -1),
					h(" starts it, then ", -1),
					m("strong", null, "Send Heartbeat", -1),
					h(" keeps it alive and ", -1),
					m("strong", null, "Unenroll", -1),
					h(" disconnects. ", -1),
					m("strong", null, "Subdomain", -1),
					h(" claims a friendly public address, the ", -1),
					m("strong", null, "Relay Tunnel", -1),
					h(" forwards traffic when you can't open ports (with a ", -1),
					m("strong", null, "Ping", -1),
					h(" to check latency), and ", -1),
					m("strong", null, "Port Forward", -1),
					h(" tries to open a port on your router automatically. Each section expands to show its status and controls. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			m("section", Se, [m("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": T.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: t[0] ||= (e) => E("hub")
			}, [m("span", we, [t[10] ||= m("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), g(c, {
				name: T.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), m("span", Te, y(rn.value), 1)], 8, Ce), T.value.hub ? (_(), p("div", Ee, [Zt.value ? (_(), p("div", De, [g(o, {
				variant: "text",
				lines: 3
			})])) : O.value ? (_(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load hub status",
				description: O.value
			}, {
				actions: b(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: N
				}, {
					default: b(() => [...t[11] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : D.value === null ? (_(), p("p", Oe, " No hub status available. ")) : (_(), p(l, { key: 3 }, [D.value.paired ? (_(), p("dl", ke, [
				D.value.serverId ? (_(), p(l, { key: 0 }, [t[12] ||= m("dt", null, "Server ID", -1), m("dd", null, y(D.value.serverId), 1)], 64)) : f("", !0),
				D.value.hubUrl ? (_(), p(l, { key: 1 }, [t[13] ||= m("dt", null, "Hub URL", -1), m("dd", null, y(D.value.hubUrl), 1)], 64)) : f("", !0),
				D.value.enrolledAt ? (_(), p(l, { key: 2 }, [t[14] ||= m("dt", null, "Enrolled at", -1), m("dd", null, y(w(D.value.enrolledAt)), 1)], 64)) : f("", !0)
			])) : f("", !0), m("div", Ae, [D.value.paired ? (_(), p(l, { key: 1 }, [g(a, {
				variant: "outline",
				size: "sm",
				loading: $t.value,
				onClick: un
			}, {
				default: b(() => [...t[16] ||= [h(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), g(a, {
				variant: "ghost",
				size: "sm",
				loading: Qt.value,
				onClick: ln
			}, {
				default: b(() => [...t[17] ||= [h(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (_(), d(a, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: an
			}, {
				default: b(() => [...t[15] ||= [h(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : f("", !0)]),
			m("section", je, [m("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": T.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: t[1] ||= (e) => E("subdomain")
			}, [m("span", Ne, [t[18] ||= m("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), g(c, {
				name: T.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), m("span", Pe, y(pn.value), 1)], 8, Me), T.value.subdomain ? (_(), p("div", Fe, [F.value ? (_(), p("div", Ie, [g(o, {
				variant: "text",
				lines: 2
			})])) : I.value ? (_(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load subdomain status",
				description: I.value
			}, {
				actions: b(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: mn
				}, {
					default: b(() => [...t[19] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : P.value === null ? (_(), p("p", Le, " No subdomain status available. ")) : (_(), p(l, { key: 3 }, [P.value.claimed ? (_(), p("dl", Re, [P.value.subdomain ? (_(), p(l, { key: 0 }, [t[20] ||= m("dt", null, "Subdomain", -1), m("dd", null, y(P.value.subdomain), 1)], 64)) : f("", !0), P.value.fqdn ? (_(), p(l, { key: 1 }, [t[21] ||= m("dt", null, "FQDN", -1), m("dd", null, y(P.value.fqdn), 1)], 64)) : f("", !0)])) : f("", !0), m("div", ze, [P.value.claimed ? (_(), d(a, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: fn.value,
				onClick: gn
			}, {
				default: b(() => [...t[23] ||= [h(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (_(), d(a, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: dn.value,
				onClick: hn
			}, {
				default: b(() => [...t[22] ||= [h(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : f("", !0)]),
			m("section", Be, [m("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": T.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: t[2] ||= (e) => E("relay")
			}, [m("span", He, [t[24] ||= m("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), g(c, {
				name: T.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), m("span", Ue, y(yn.value), 1)], 8, Ve), T.value.relay ? (_(), p("div", We, [_n.value ? (_(), p("div", Ge, [g(o, {
				variant: "text",
				lines: 2
			})])) : R.value ? (_(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load relay status",
				description: R.value
			}, {
				actions: b(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: H
				}, {
					default: b(() => [...t[25] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : L.value === null ? (_(), p("p", Ke, " No relay status available. ")) : (_(), p(l, { key: 3 }, [
				m("dl", qe, [
					t[28] ||= m("dt", null, "Status", -1),
					m("dd", null, [g(i, { tone: L.value.connected ? "success" : "neutral" }, {
						default: b(() => [h(y(L.value.connected ? "Connected" : "Disconnected"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					t[29] ||= m("dt", null, "State file", -1),
					m("dd", null, [g(i, { tone: L.value.stale ? "warning" : "success" }, {
						default: b(() => [m("span", Je, y(Fn.value), 1)]),
						_: 1
					}, 8, ["tone"])]),
					t[30] ||= m("dt", null, "Active", -1),
					m("dd", null, y(L.value.active ? "Yes" : "No"), 1),
					t[31] ||= m("dt", null, "Enrolled", -1),
					m("dd", null, [g(i, { tone: L.value.enrolled ? "success" : "neutral" }, {
						default: b(() => [h(y(L.value.enrolled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					t[32] ||= m("dt", null, "Kill-switch", -1),
					m("dd", null, [g(i, { tone: L.value.disabled ? "warning" : "success" }, {
						default: b(() => [h(y(L.value.disabled ? "Disabled" : "Enabled"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					xn.value === null ? f("", !0) : (_(), p(l, { key: 0 }, [t[26] ||= m("dt", null, "Latency", -1), m("dd", null, [h(y(xn.value) + " ", 1), V.value && V.value.latencyMs != null ? (_(), p("span", Ye, y(V.value.heartbeatStale === !0 ? "(stale — heartbeat worker not running)" : "(last recorded heartbeat)"), 1)) : f("", !0)])], 64)),
					L.value.lastConnectError ? (_(), p(l, { key: 1 }, [t[27] ||= m("dt", null, "Last error", -1), m("dd", Xe, [h(y(L.value.lastConnectError) + " ", 1), L.value.lastConnectErrorAt ? (_(), p(l, { key: 0 }, [h(" (" + y(w(L.value.lastConnectErrorAt)) + ") ", 1)], 64)) : f("", !0)])], 64)) : f("", !0)
				]),
				t[36] ||= m("p", {
					class: "admin-remote__notice",
					role: "note"
				}, " Enable and Disable persist a setting the relay reads on start-up — the change takes effect on the next server reload, not instantly. ", -1),
				m("div", Ze, [g(a, {
					variant: "outline",
					size: "sm",
					loading: vn.value,
					disabled: !L.value.connected,
					onClick: wn
				}, {
					default: b(() => [...t[33] ||= [h(" Ping ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]), L.value.disabled ? (_(), d(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: z.value,
					disabled: bn.value,
					onClick: Sn
				}, {
					default: b(() => [...t[34] ||= [h(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (_(), d(a, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: B.value,
					disabled: bn.value,
					onClick: Cn
				}, {
					default: b(() => [...t[35] ||= [h(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : f("", !0)]),
			m("section", Qe, [m("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": T.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: t[3] ||= (e) => E("portforward")
			}, [m("span", et, [t[37] ||= m("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), g(c, {
				name: T.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), m("span", tt, y(Dn.value), 1)], 8, $e), T.value.portforward ? (_(), p("div", nt, [Tn.value ? (_(), p("div", rt, [g(o, {
				variant: "text",
				lines: 3
			})])) : W.value ? (_(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load port-forward status",
				description: W.value
			}, {
				actions: b(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: kn
				}, {
					default: b(() => [...t[38] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : U.value === null ? (_(), p("p", it, " No port-forward status available. ")) : (_(), p(l, { key: 3 }, [
				m("dl", at, [
					t[42] ||= m("dt", null, "Enabled", -1),
					m("dd", null, [g(i, { tone: U.value.enabled ? "success" : "neutral" }, {
						default: b(() => [h(y(U.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					U.value.method ? (_(), p(l, { key: 0 }, [t[39] ||= m("dt", null, "Method", -1), m("dd", null, y(U.value.method), 1)], 64)) : f("", !0),
					U.value.externalIp ? (_(), p(l, { key: 1 }, [t[40] ||= m("dt", null, "External IP", -1), m("dd", null, y(U.value.externalIp), 1)], 64)) : f("", !0),
					U.value.externalPort ? (_(), p(l, { key: 2 }, [t[41] ||= m("dt", null, "External port", -1), m("dd", null, y(U.value.externalPort), 1)], 64)) : f("", !0)
				]),
				En.value.length > 0 ? (_(), p("div", ot, [t[43] ||= m("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), m("ul", st, [(_(!0), p(l, null, me(En.value, (e, t) => (_(), p("li", { key: t }, y(e.hostname), 1))), 128))])])) : f("", !0),
				m("div", ct, [U.value.enabled ? (_(), d(a, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: K.value,
					disabled: On.value,
					onClick: jn
				}, {
					default: b(() => [...t[45] ||= [h(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (_(), d(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: G.value,
					disabled: On.value,
					onClick: An
				}, {
					default: b(() => [...t[44] ||= [h(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : f("", !0)]),
			m("section", lt, [m("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": T.value.networkhealth,
				"aria-controls": "remote-networkhealth-body",
				onClick: t[4] ||= (e) => E("networkhealth")
			}, [m("span", dt, [t[46] ||= m("h2", { id: "remote-networkhealth-heading" }, "Network Health", -1), g(c, {
				name: T.value.networkhealth ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), m("span", ft, y(Bn.value), 1)], 8, ut), T.value.networkhealth ? (_(), p("div", pt, [Z.value ? (_(), p("div", mt, [g(o, {
				variant: "text",
				lines: 4
			})])) : Q.value ? (_(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load network health",
				description: Q.value ?? void 0
			}, {
				actions: b(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Rn
				}, {
					default: b(() => [...t[47] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value !== null && J.value !== null ? (_(), p(l, { key: 2 }, [
				m("div", ht, [
					m("div", gt, [t[55] ||= m("h3", { class: "admin-remote__health-card-title" }, "Relay Tunnel", -1), m("dl", _t, [
						t[51] ||= m("dt", null, "Status", -1),
						m("dd", null, [g(i, { tone: q.value.connected ? "success" : "error" }, {
							default: b(() => [h(y(q.value.connected ? q.value.active ? "Active" : "Connecting" : "Disconnected"), 1)]),
							_: 1
						}, 8, ["tone"])]),
						t[52] ||= m("dt", null, "State file", -1),
						m("dd", null, [g(i, { tone: q.value.stale ? "warning" : "success" }, {
							default: b(() => [m("span", vt, y(Nn.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						t[53] ||= m("dt", null, "Reconnect attempts", -1),
						m("dd", null, y(q.value.reconnectAttempts), 1),
						q.value.lastDisconnectTime ? (_(), p(l, { key: 0 }, [t[48] ||= m("dt", null, "Last disconnect", -1), m("dd", null, y(w(q.value.lastDisconnectTime)), 1)], 64)) : f("", !0),
						q.value.lastConnectError === null ? f("", !0) : (_(), p(l, { key: 1 }, [t[49] ||= m("dt", null, "Last error", -1), m("dd", yt, y(q.value.lastConnectError), 1)], 64)),
						q.value.lastConnectErrorAt === null ? f("", !0) : (_(), p(l, { key: 2 }, [t[50] ||= m("dt", null, "Last error at", -1), m("dd", bt, y(w(q.value.lastConnectErrorAt)), 1)], 64)),
						t[54] ||= m("dt", null, "Active sessions", -1),
						m("dd", null, y(q.value.activeSessions), 1)
					])]),
					m("div", xt, [t[62] ||= m("h3", { class: "admin-remote__health-card-title" }, "Hub Heartbeat", -1), m("dl", St, [
						t[58] ||= m("dt", null, "Enrolled", -1),
						m("dd", null, [g(i, { tone: J.value.isEnrolled ? "success" : "neutral" }, {
							default: b(() => [h(y(J.value.isEnrolled ? "Yes" : "No"), 1)]),
							_: 1
						}, 8, ["tone"])]),
						t[59] ||= m("dt", null, "State file", -1),
						m("dd", null, [g(i, { tone: J.value.stale ? "warning" : "success" }, {
							default: b(() => [m("span", Ct, y(Pn.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						t[60] ||= m("dt", null, "Consecutive failures", -1),
						m("dd", null, [g(i, { tone: J.value.consecutiveFailures > 0 ? "warning" : "success" }, {
							default: b(() => [h(y(J.value.consecutiveFailures), 1)]),
							_: 1
						}, 8, ["tone"])]),
						J.value.lastSuccessfulHeartbeat ? (_(), p(l, { key: 0 }, [t[56] ||= m("dt", null, "Last success", -1), m("dd", null, y(w(J.value.lastSuccessfulHeartbeat)), 1)], 64)) : f("", !0),
						t[61] ||= m("dt", null, "Last latency", -1),
						m("dd", wt, y(Ln.value), 1),
						J.value.enrollmentExpiresAt ? (_(), p(l, { key: 1 }, [t[57] ||= m("dt", null, "Expires", -1), m("dd", null, y(w(J.value.enrollmentExpiresAt)), 1)], 64)) : f("", !0)
					])]),
					m("div", Tt, [t[68] ||= m("h3", { class: "admin-remote__health-card-title" }, "Network Latency", -1), m("dl", Et, [
						t[65] ||= m("dt", null, "Current", -1),
						m("dd", null, [g(i, { tone: Y.value?.status === "healthy" ? "success" : Y.value?.status === "degraded" ? "warning" : "error" }, {
							default: b(() => [m("span", Dt, y(In.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						t[66] ||= m("dt", null, "Status", -1),
						m("dd", Ot, y(Y.value?.status ?? "unknown"), 1),
						t[67] ||= m("dt", null, "Reading", -1),
						m("dd", null, [g(i, { tone: $.value ? "warning" : "success" }, {
							default: b(() => [m("span", kt, y(Mn.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						Y.value?.measuredAt ? (_(), p(l, { key: 0 }, [t[63] ||= m("dt", null, "Measured", -1), m("dd", null, y(w(Y.value?.measuredAt)), 1)], 64)) : f("", !0),
						$.value && Y.value?.error ? (_(), p(l, { key: 1 }, [t[64] ||= m("dt", null, "Why", -1), m("dd", At, y(Y.value?.error), 1)], 64)) : f("", !0)
					])])
				]),
				X.value.length > 0 ? (_(), p("div", jt, [
					m("h3", Mt, "Latency History (last " + y(he(se)(X.value.length, "measurement", "measurements")) + ")", 1),
					$.value ? (_(), p("p", Nt, " No new measurement — the newest reading is stale. ")) : f("", !0),
					m("div", {
						class: "admin-remote__latency-bars",
						role: "img",
						"aria-label": `Latency graph showing ${he(se)(X.value.length, "measurement", "measurements")}`
					}, [(_(!0), p(l, null, me(X.value, (e, t) => (_(), p("div", {
						key: t,
						class: "admin-remote__latency-bar-wrap",
						title: `${e.ms}ms at ${w(e.at)}${e.stale ? " (stale)" : ""}`
					}, [m("div", {
						class: de(["admin-remote__latency-bar", [`admin-remote__latency-bar--${e.ms < 100 ? "good" : e.ms < 500 ? "warn" : "bad"}`, { "admin-remote__latency-bar--stale": e.stale }]]),
						style: fe({ height: `${Math.min(100, e.ms / 600 * 100)}%` })
					}, null, 6), m("span", It, y(e.ms), 1)], 8, Ft))), 128))], 8, Pt),
					t[69] ||= ce("<div class=\"admin-remote__latency-legend\" data-v-b7e1fab0><span class=\"admin-remote__latency-legend-item\" data-v-b7e1fab0><span class=\"admin-remote__latency-dot admin-remote__latency-dot--good\" data-v-b7e1fab0></span> &lt;100ms</span><span class=\"admin-remote__latency-legend-item\" data-v-b7e1fab0><span class=\"admin-remote__latency-dot admin-remote__latency-dot--warn\" data-v-b7e1fab0></span> 100-500ms</span><span class=\"admin-remote__latency-legend-item\" data-v-b7e1fab0><span class=\"admin-remote__latency-dot admin-remote__latency-dot--bad\" data-v-b7e1fab0></span> &gt;500ms</span></div>", 1)
				])) : f("", !0),
				m("div", Lt, [g(a, {
					variant: "outline",
					size: "sm",
					loading: Z.value,
					onClick: Rn
				}, {
					default: b(() => [...t[70] ||= [h(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading"])])
			], 64)) : Y.value?.status === "offline" ? (_(), p("div", Rt, [J.value !== null && J.value.isEnrolled === !1 ? (_(), p("p", zt, " Not enrolled in hub. ")) : q.value !== null && q.value.connected === !1 ? (_(), p("p", Bt, " Relay disconnected. ")) : (_(), p("p", Vt, " Hub unreachable. "))])) : (_(), p("p", Ht, " No network health data available. "))])) : f("", !0)]),
			g(ae, {
				modelValue: en.value,
				"onUpdate:modelValue": t[7] ||= (e) => en.value = e,
				title: "Initiate Hub Pairing",
				onClose: on
			}, {
				footer: b(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: on
				}, {
					default: b(() => [...t[74] ||= [h("Cancel", -1)]]),
					_: 1
				}), A.value ? (_(), d(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: M.value,
					onClick: cn
				}, {
					default: b(() => [...t[75] ||= [h(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (_(), d(a, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: j.value,
					disabled: k.value === "",
					onClick: sn
				}, {
					default: b(() => [...t[76] ||= [h(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: b(() => [A.value ? (_(), p("div", Ut, [t[71] ||= m("p", null, "Enter this claim code on the hub:", -1), m("p", Wt, y(A.value), 1)])) : (_(), p("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: ve(sn, ["prevent"])
				}, [m("label", Gt, [t[72] ||= m("span", { class: "admin-remote__label" }, "Hub URL", -1), _e(m("input", {
					"onUpdate:modelValue": t[5] ||= (e) => k.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[ge, k.value]])]), m("label", Kt, [t[73] ||= m("span", { class: "admin-remote__label" }, "Server name", -1), _e(m("input", {
					"onUpdate:modelValue": t[6] ||= (e) => tn.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[ge, tn.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-b7e1fab0"]]);
export { x as default };

//# sourceMappingURL=RemoteAccessPage-BrWLGVJU.js.map