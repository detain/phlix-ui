import { n as e, t } from "./Icon-CkTBN_k5.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { l as r, p as i, t as ee, u as te } from "./client-COHWZ2KC.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as re } from "./networkHealth-D2-6IrJA.js";
import { t as a } from "./Button-Cw8Wl4QR.js";
import { t as o } from "./Badge-D1_MN41Y.js";
import { t as ie } from "./Modal-Nn1mtFl3.js";
import { t as s } from "./Skeleton-C3OpJbf1.js";
import { t as c } from "./EmptyState-CwWtkhEJ.js";
import { t as ae } from "./PageHint-3dL7qb5N.js";
import { t as oe } from "./remoteAccess-DVKRpKQ8.js";
import { t as se } from "./helpLinks-ya0IGJSe.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createStaticVNode as ce, createTextVNode as h, createVNode as g, defineComponent as le, inject as ue, normalizeClass as de, normalizeStyle as fe, onMounted as pe, openBlock as _, ref as v, renderList as me, toDisplayString as y, unref as he, vModelText as ge, withCtx as b, withDirectives as _e, withModifiers as ve } from "vue";
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
}, Wt = { class: "admin-remote__claim-code" }, Gt = { class: "admin-remote__field" }, Kt = { class: "admin-remote__field" }, qt = 10, Jt = "Not measured yet", Yt = /*#__PURE__*/ e(/* @__PURE__ */ le({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(e) {
		let le = e, Yt = ue("apiBase", ""), Xt = u(() => typeof Yt == "string" ? Yt : Yt?.value ?? ""), x = new oe(le.client ?? new ee({
			baseUrl: Xt.value,
			tokenStore: new r()
		})), Zt = new re(le.client ?? new ee({
			baseUrl: Xt.value,
			tokenStore: new r()
		})), S = ne();
		function C(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
		}
		let w = v({
			hub: !0,
			subdomain: !1,
			relay: !1,
			portforward: !1,
			networkhealth: !1
		});
		function T(e) {
			let t = w.value[e];
			w.value[e] = !t, e === "networkhealth" && !t && zn();
		}
		let E = v(null), D = v(!0), O = v(null), k = v(!1), A = v(!1), j = v(!1), M = v(""), Qt = v("Phlix Server"), N = v(null), P = v(null), $t = v(!1), en = v(!1), tn = u(() => D.value ? "Loading…" : E.value === null ? "Unable to load" : E.value.paired ? `Paired${E.value.serverId ? ` (${E.value.serverId})` : ""}` : "Not paired");
		async function nn() {
			D.value = !0, O.value = null;
			try {
				E.value = await x.hubStatus();
			} catch (e) {
				O.value = i(e, "Failed to load hub status."), S.error(O.value);
			} finally {
				D.value = !1;
			}
		}
		function rn() {
			j.value = !0;
		}
		function an() {
			j.value = !1, N.value = null, P.value = null;
		}
		async function on() {
			if (!$t.value) {
				if (M.value === "") {
					S.error("Hub URL is required.");
					return;
				}
				$t.value = !0;
				try {
					let e = await x.hubPair(M.value, Qt.value);
					e.success && (N.value = e.claimCode ?? null, P.value = e.claimId ?? null, S.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					S.error(i(e, "Failed to initiate pairing."));
				} finally {
					$t.value = !1;
				}
			}
		}
		async function sn() {
			if (P.value !== null && M.value !== "" && !en.value) {
				en.value = !0;
				try {
					let e = await x.hubPoll(P.value, M.value);
					e.success && e.token ? (await x.hubComplete(e.token, "", e.serverId ?? "", M.value), S.success("Hub paired successfully."), an(), await nn()) : !e.success && e.message && S.error(e.message);
				} catch (e) {
					S.error(i(e, "Failed to poll pairing status."));
				} finally {
					en.value = !1;
				}
			}
		}
		async function cn() {
			if (!k.value) {
				k.value = !0;
				try {
					await x.hubUnenroll(), S.success("Hub unenrolled."), await nn();
				} catch (e) {
					S.error(i(e, "Failed to unenroll."));
				} finally {
					k.value = !1;
				}
			}
		}
		async function ln() {
			if (!A.value) {
				A.value = !0;
				try {
					(await x.hubHeartbeat()).success && S.success("Heartbeat sent.");
				} catch (e) {
					S.error(i(e, "Failed to send heartbeat."));
				} finally {
					A.value = !1;
				}
			}
		}
		let F = v(null), un = v(!0), I = v(null), dn = v(!1), fn = v(!1), pn = u(() => un.value ? "Loading…" : F.value === null ? "Unable to load" : F.value.claimed ? `Claimed${F.value.subdomain ? ` (${F.value.subdomain})` : ""}` : "Not claimed");
		async function mn() {
			un.value = !0, I.value = null;
			try {
				F.value = await x.subdomainStatus();
			} catch (e) {
				I.value = i(e, "Failed to load subdomain status."), S.error(I.value);
			} finally {
				un.value = !1;
			}
		}
		async function hn() {
			if (!dn.value) {
				dn.value = !0;
				try {
					await x.subdomainClaim(), S.success("Subdomain claimed."), await mn();
				} catch (e) {
					S.error(i(e, "Failed to claim subdomain."));
				} finally {
					dn.value = !1;
				}
			}
		}
		async function gn() {
			if (!fn.value) {
				fn.value = !0;
				try {
					await x.subdomainRelease(), S.success("Subdomain released."), await mn();
				} catch (e) {
					S.error(i(e, "Failed to release subdomain."));
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
				L.value = await x.relayStatus(), V.value = null;
			} catch (e) {
				R.value = i(e, "Failed to load relay status."), S.error(R.value);
			} finally {
				_n.value = !1;
			}
		}
		async function Sn() {
			if (!z.value) {
				z.value = !0;
				try {
					let e = await x.relayEnable();
					S.success(e.message || "Relay enabled; takes effect on the next server reload.", e.disabled ? { tone: "warning" } : void 0), await H();
				} catch (e) {
					S.error(i(e, "Failed to enable relay."));
				} finally {
					z.value = !1;
				}
			}
		}
		async function Cn() {
			if (!B.value) {
				B.value = !0;
				try {
					let e = await x.relayDisable();
					S.success(e.message || "Relay disabled; takes effect on the next server reload."), await H();
				} catch (e) {
					S.error(i(e, "Failed to disable relay."));
				} finally {
					B.value = !1;
				}
			}
		}
		async function wn() {
			if (!vn.value) {
				vn.value = !0;
				try {
					let e = await x.relayPing();
					V.value = e, e.latencyMs == null ? S.info("Relay connected; latency not measured yet.") : S.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					if (V.value = null, e instanceof te && e.status === 409) {
						let t = e.body ?? null, n = t?.lastConnectError ? ` (${t.lastConnectError})` : "";
						S.error(`${t?.message ?? "Relay not connected."}${n}`), await H();
					} else S.error(i(e, "Failed to ping relay."));
				} finally {
					vn.value = !1;
				}
			}
		}
		let U = v(null), Tn = v(!0), W = v(null), G = v(!1), K = v(!1), En = v([]), Dn = u(() => Tn.value ? "Loading…" : U.value === null ? "Unable to load" : U.value.enabled ? U.value.externalIp ? `Enabled (${U.value.externalIp}:${U.value.externalPort})` : "Enabled" : "Disabled"), On = u(() => G.value || K.value);
		async function kn() {
			Tn.value = !0, W.value = null;
			try {
				let [e, t] = await Promise.all([x.portForwardStatus(), x.portForwardCandidates()]);
				U.value = e, En.value = t.candidates;
			} catch (e) {
				W.value = i(e, "Failed to load port-forward status."), S.error(W.value);
			} finally {
				Tn.value = !1;
			}
		}
		async function An() {
			if (!G.value) {
				G.value = !0;
				try {
					await x.portForwardEnable(), S.success("Port forwarding enabled."), await kn();
				} catch (e) {
					S.error(i(e, "Failed to enable port forwarding."));
				} finally {
					G.value = !1;
				}
			}
		}
		async function jn() {
			if (!K.value) {
				K.value = !0;
				try {
					await x.portForwardDisable(), S.success("Port forwarding disabled."), await kn();
				} catch (e) {
					S.error(i(e, "Failed to disable port forwarding."));
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
				let e = await Zt.getHealthSnapshot();
				if (q.value = e.relay, J.value = e.hub, Y.value = e.network, e.network.latencyMs !== null) {
					let t = e.network.measuredAt;
					X.value.some((e) => e.at === t) || (X.value.push({
						ms: e.network.latencyMs,
						at: t,
						stale: e.network.stale
					}), X.value.length > qt && (X.value = X.value.slice(-10)));
				}
			} catch (e) {
				Q.value = i(e, "Failed to load network health."), S.error(Q.value);
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
			nn(), mn(), H(), kn();
		}), (e, r) => (_(), p("section", ye, [
			m("header", be, [m("h1", xe, [g(t, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), r[8] ||= h(" Remote Access ", -1)])]),
			g(ae, {
				links: he(se)["remote-access"].links,
				details: he(se)["remote-access"].details
			}, {
				default: b(() => [...r[9] ||= [
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
				"aria-expanded": w.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: r[0] ||= (e) => T("hub")
			}, [m("span", we, [r[10] ||= m("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), g(t, {
				name: w.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), m("span", Te, y(tn.value), 1)], 8, Ce), w.value.hub ? (_(), p("div", Ee, [D.value ? (_(), p("div", De, [g(s, {
				variant: "text",
				lines: 3
			})])) : O.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load hub status",
				description: O.value
			}, {
				actions: b(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: nn
				}, {
					default: b(() => [...r[11] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : E.value === null ? (_(), p("p", Oe, " No hub status available. ")) : (_(), p(l, { key: 3 }, [E.value.paired ? (_(), p("dl", ke, [
				E.value.serverId ? (_(), p(l, { key: 0 }, [r[12] ||= m("dt", null, "Server ID", -1), m("dd", null, y(E.value.serverId), 1)], 64)) : f("", !0),
				E.value.hubUrl ? (_(), p(l, { key: 1 }, [r[13] ||= m("dt", null, "Hub URL", -1), m("dd", null, y(E.value.hubUrl), 1)], 64)) : f("", !0),
				E.value.enrolledAt ? (_(), p(l, { key: 2 }, [r[14] ||= m("dt", null, "Enrolled at", -1), m("dd", null, y(C(E.value.enrolledAt)), 1)], 64)) : f("", !0)
			])) : f("", !0), m("div", Ae, [E.value.paired ? (_(), p(l, { key: 1 }, [g(a, {
				variant: "outline",
				size: "sm",
				loading: A.value,
				onClick: ln
			}, {
				default: b(() => [...r[16] ||= [h(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), g(a, {
				variant: "ghost",
				size: "sm",
				loading: k.value,
				onClick: cn
			}, {
				default: b(() => [...r[17] ||= [h(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (_(), d(a, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: rn
			}, {
				default: b(() => [...r[15] ||= [h(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : f("", !0)]),
			m("section", je, [m("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: r[1] ||= (e) => T("subdomain")
			}, [m("span", Ne, [r[18] ||= m("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), g(t, {
				name: w.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), m("span", Pe, y(pn.value), 1)], 8, Me), w.value.subdomain ? (_(), p("div", Fe, [un.value ? (_(), p("div", Ie, [g(s, {
				variant: "text",
				lines: 2
			})])) : I.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load subdomain status",
				description: I.value
			}, {
				actions: b(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: mn
				}, {
					default: b(() => [...r[19] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : F.value === null ? (_(), p("p", Le, " No subdomain status available. ")) : (_(), p(l, { key: 3 }, [F.value.claimed ? (_(), p("dl", Re, [F.value.subdomain ? (_(), p(l, { key: 0 }, [r[20] ||= m("dt", null, "Subdomain", -1), m("dd", null, y(F.value.subdomain), 1)], 64)) : f("", !0), F.value.fqdn ? (_(), p(l, { key: 1 }, [r[21] ||= m("dt", null, "FQDN", -1), m("dd", null, y(F.value.fqdn), 1)], 64)) : f("", !0)])) : f("", !0), m("div", ze, [F.value.claimed ? (_(), d(a, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: fn.value,
				onClick: gn
			}, {
				default: b(() => [...r[23] ||= [h(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (_(), d(a, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: dn.value,
				onClick: hn
			}, {
				default: b(() => [...r[22] ||= [h(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : f("", !0)]),
			m("section", Be, [m("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: r[2] ||= (e) => T("relay")
			}, [m("span", He, [r[24] ||= m("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), g(t, {
				name: w.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), m("span", Ue, y(yn.value), 1)], 8, Ve), w.value.relay ? (_(), p("div", We, [_n.value ? (_(), p("div", Ge, [g(s, {
				variant: "text",
				lines: 2
			})])) : R.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load relay status",
				description: R.value
			}, {
				actions: b(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: H
				}, {
					default: b(() => [...r[25] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : L.value === null ? (_(), p("p", Ke, " No relay status available. ")) : (_(), p(l, { key: 3 }, [
				m("dl", qe, [
					r[28] ||= m("dt", null, "Status", -1),
					m("dd", null, [g(o, { tone: L.value.connected ? "success" : "neutral" }, {
						default: b(() => [h(y(L.value.connected ? "Connected" : "Disconnected"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					r[29] ||= m("dt", null, "State file", -1),
					m("dd", null, [g(o, { tone: L.value.stale ? "warning" : "success" }, {
						default: b(() => [m("span", Je, y(Fn.value), 1)]),
						_: 1
					}, 8, ["tone"])]),
					r[30] ||= m("dt", null, "Active", -1),
					m("dd", null, y(L.value.active ? "Yes" : "No"), 1),
					r[31] ||= m("dt", null, "Enrolled", -1),
					m("dd", null, [g(o, { tone: L.value.enrolled ? "success" : "neutral" }, {
						default: b(() => [h(y(L.value.enrolled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					r[32] ||= m("dt", null, "Kill-switch", -1),
					m("dd", null, [g(o, { tone: L.value.disabled ? "warning" : "success" }, {
						default: b(() => [h(y(L.value.disabled ? "Disabled" : "Enabled"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					xn.value === null ? f("", !0) : (_(), p(l, { key: 0 }, [r[26] ||= m("dt", null, "Latency", -1), m("dd", null, [h(y(xn.value) + " ", 1), V.value && V.value.latencyMs != null ? (_(), p("span", Ye, y(V.value.heartbeatStale === !0 ? "(stale — heartbeat worker not running)" : "(last recorded heartbeat)"), 1)) : f("", !0)])], 64)),
					L.value.lastConnectError ? (_(), p(l, { key: 1 }, [r[27] ||= m("dt", null, "Last error", -1), m("dd", Xe, [h(y(L.value.lastConnectError) + " ", 1), L.value.lastConnectErrorAt ? (_(), p(l, { key: 0 }, [h(" (" + y(C(L.value.lastConnectErrorAt)) + ") ", 1)], 64)) : f("", !0)])], 64)) : f("", !0)
				]),
				r[36] ||= m("p", {
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
					default: b(() => [...r[33] ||= [h(" Ping ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]), L.value.disabled ? (_(), d(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: z.value,
					disabled: bn.value,
					onClick: Sn
				}, {
					default: b(() => [...r[34] ||= [h(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (_(), d(a, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: B.value,
					disabled: bn.value,
					onClick: Cn
				}, {
					default: b(() => [...r[35] ||= [h(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : f("", !0)]),
			m("section", Qe, [m("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: r[3] ||= (e) => T("portforward")
			}, [m("span", et, [r[37] ||= m("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), g(t, {
				name: w.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), m("span", tt, y(Dn.value), 1)], 8, $e), w.value.portforward ? (_(), p("div", nt, [Tn.value ? (_(), p("div", rt, [g(s, {
				variant: "text",
				lines: 3
			})])) : W.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load port-forward status",
				description: W.value
			}, {
				actions: b(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: kn
				}, {
					default: b(() => [...r[38] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : U.value === null ? (_(), p("p", it, " No port-forward status available. ")) : (_(), p(l, { key: 3 }, [
				m("dl", at, [
					r[42] ||= m("dt", null, "Enabled", -1),
					m("dd", null, [g(o, { tone: U.value.enabled ? "success" : "neutral" }, {
						default: b(() => [h(y(U.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					U.value.method ? (_(), p(l, { key: 0 }, [r[39] ||= m("dt", null, "Method", -1), m("dd", null, y(U.value.method), 1)], 64)) : f("", !0),
					U.value.externalIp ? (_(), p(l, { key: 1 }, [r[40] ||= m("dt", null, "External IP", -1), m("dd", null, y(U.value.externalIp), 1)], 64)) : f("", !0),
					U.value.externalPort ? (_(), p(l, { key: 2 }, [r[41] ||= m("dt", null, "External port", -1), m("dd", null, y(U.value.externalPort), 1)], 64)) : f("", !0)
				]),
				En.value.length > 0 ? (_(), p("div", ot, [r[43] ||= m("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), m("ul", st, [(_(!0), p(l, null, me(En.value, (e, t) => (_(), p("li", { key: t }, y(e.hostname), 1))), 128))])])) : f("", !0),
				m("div", ct, [U.value.enabled ? (_(), d(a, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: K.value,
					disabled: On.value,
					onClick: jn
				}, {
					default: b(() => [...r[45] ||= [h(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (_(), d(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: G.value,
					disabled: On.value,
					onClick: An
				}, {
					default: b(() => [...r[44] ||= [h(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : f("", !0)]),
			m("section", lt, [m("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.networkhealth,
				"aria-controls": "remote-networkhealth-body",
				onClick: r[4] ||= (e) => T("networkhealth")
			}, [m("span", dt, [r[46] ||= m("h2", { id: "remote-networkhealth-heading" }, "Network Health", -1), g(t, {
				name: w.value.networkhealth ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), m("span", ft, y(Bn.value), 1)], 8, ut), w.value.networkhealth ? (_(), p("div", pt, [Z.value ? (_(), p("div", mt, [g(s, {
				variant: "text",
				lines: 4
			})])) : Q.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load network health",
				description: Q.value ?? void 0
			}, {
				actions: b(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Rn
				}, {
					default: b(() => [...r[47] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value !== null && J.value !== null ? (_(), p(l, { key: 2 }, [
				m("div", ht, [
					m("div", gt, [r[55] ||= m("h3", { class: "admin-remote__health-card-title" }, "Relay Tunnel", -1), m("dl", _t, [
						r[51] ||= m("dt", null, "Status", -1),
						m("dd", null, [g(o, { tone: q.value.connected ? "success" : "error" }, {
							default: b(() => [h(y(q.value.connected ? q.value.active ? "Active" : "Connecting" : "Disconnected"), 1)]),
							_: 1
						}, 8, ["tone"])]),
						r[52] ||= m("dt", null, "State file", -1),
						m("dd", null, [g(o, { tone: q.value.stale ? "warning" : "success" }, {
							default: b(() => [m("span", vt, y(Nn.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						r[53] ||= m("dt", null, "Reconnect attempts", -1),
						m("dd", null, y(q.value.reconnectAttempts), 1),
						q.value.lastDisconnectTime ? (_(), p(l, { key: 0 }, [r[48] ||= m("dt", null, "Last disconnect", -1), m("dd", null, y(C(q.value.lastDisconnectTime)), 1)], 64)) : f("", !0),
						q.value.lastConnectError === null ? f("", !0) : (_(), p(l, { key: 1 }, [r[49] ||= m("dt", null, "Last error", -1), m("dd", yt, y(q.value.lastConnectError), 1)], 64)),
						q.value.lastConnectErrorAt === null ? f("", !0) : (_(), p(l, { key: 2 }, [r[50] ||= m("dt", null, "Last error at", -1), m("dd", bt, y(C(q.value.lastConnectErrorAt)), 1)], 64)),
						r[54] ||= m("dt", null, "Active sessions", -1),
						m("dd", null, y(q.value.activeSessions), 1)
					])]),
					m("div", xt, [r[62] ||= m("h3", { class: "admin-remote__health-card-title" }, "Hub Heartbeat", -1), m("dl", St, [
						r[58] ||= m("dt", null, "Enrolled", -1),
						m("dd", null, [g(o, { tone: J.value.isEnrolled ? "success" : "neutral" }, {
							default: b(() => [h(y(J.value.isEnrolled ? "Yes" : "No"), 1)]),
							_: 1
						}, 8, ["tone"])]),
						r[59] ||= m("dt", null, "State file", -1),
						m("dd", null, [g(o, { tone: J.value.stale ? "warning" : "success" }, {
							default: b(() => [m("span", Ct, y(Pn.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						r[60] ||= m("dt", null, "Consecutive failures", -1),
						m("dd", null, [g(o, { tone: J.value.consecutiveFailures > 0 ? "warning" : "success" }, {
							default: b(() => [h(y(J.value.consecutiveFailures), 1)]),
							_: 1
						}, 8, ["tone"])]),
						J.value.lastSuccessfulHeartbeat ? (_(), p(l, { key: 0 }, [r[56] ||= m("dt", null, "Last success", -1), m("dd", null, y(C(J.value.lastSuccessfulHeartbeat)), 1)], 64)) : f("", !0),
						r[61] ||= m("dt", null, "Last latency", -1),
						m("dd", wt, y(Ln.value), 1),
						J.value.enrollmentExpiresAt ? (_(), p(l, { key: 1 }, [r[57] ||= m("dt", null, "Expires", -1), m("dd", null, y(C(J.value.enrollmentExpiresAt)), 1)], 64)) : f("", !0)
					])]),
					m("div", Tt, [r[68] ||= m("h3", { class: "admin-remote__health-card-title" }, "Network Latency", -1), m("dl", Et, [
						r[65] ||= m("dt", null, "Current", -1),
						m("dd", null, [g(o, { tone: Y.value?.status === "healthy" ? "success" : Y.value?.status === "degraded" ? "warning" : "error" }, {
							default: b(() => [m("span", Dt, y(In.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						r[66] ||= m("dt", null, "Status", -1),
						m("dd", Ot, y(Y.value?.status ?? "unknown"), 1),
						r[67] ||= m("dt", null, "Reading", -1),
						m("dd", null, [g(o, { tone: $.value ? "warning" : "success" }, {
							default: b(() => [m("span", kt, y(Mn.value), 1)]),
							_: 1
						}, 8, ["tone"])]),
						Y.value?.measuredAt ? (_(), p(l, { key: 0 }, [r[63] ||= m("dt", null, "Measured", -1), m("dd", null, y(C(Y.value?.measuredAt)), 1)], 64)) : f("", !0),
						$.value && Y.value?.error ? (_(), p(l, { key: 1 }, [r[64] ||= m("dt", null, "Why", -1), m("dd", At, y(Y.value?.error), 1)], 64)) : f("", !0)
					])])
				]),
				X.value.length > 0 ? (_(), p("div", jt, [
					m("h3", Mt, "Latency History (last " + y(he(n)(X.value.length, "measurement", "measurements")) + ")", 1),
					$.value ? (_(), p("p", Nt, " No new measurement — the newest reading is stale. ")) : f("", !0),
					m("div", {
						class: "admin-remote__latency-bars",
						role: "img",
						"aria-label": `Latency graph showing ${he(n)(X.value.length, "measurement", "measurements")}`
					}, [(_(!0), p(l, null, me(X.value, (e, t) => (_(), p("div", {
						key: t,
						class: "admin-remote__latency-bar-wrap",
						title: `${e.ms}ms at ${C(e.at)}${e.stale ? " (stale)" : ""}`
					}, [m("div", {
						class: de(["admin-remote__latency-bar", [`admin-remote__latency-bar--${e.ms < 100 ? "good" : e.ms < 500 ? "warn" : "bad"}`, { "admin-remote__latency-bar--stale": e.stale }]]),
						style: fe({ height: `${Math.min(100, e.ms / 600 * 100)}%` })
					}, null, 6), m("span", It, y(e.ms), 1)], 8, Ft))), 128))], 8, Pt),
					r[69] ||= ce("<div class=\"admin-remote__latency-legend\" data-v-c71e798e><span class=\"admin-remote__latency-legend-item\" data-v-c71e798e><span class=\"admin-remote__latency-dot admin-remote__latency-dot--good\" data-v-c71e798e></span> &lt;100ms</span><span class=\"admin-remote__latency-legend-item\" data-v-c71e798e><span class=\"admin-remote__latency-dot admin-remote__latency-dot--warn\" data-v-c71e798e></span> 100-500ms</span><span class=\"admin-remote__latency-legend-item\" data-v-c71e798e><span class=\"admin-remote__latency-dot admin-remote__latency-dot--bad\" data-v-c71e798e></span> &gt;500ms</span></div>", 1)
				])) : f("", !0),
				m("div", Lt, [g(a, {
					variant: "outline",
					size: "sm",
					loading: Z.value,
					onClick: Rn
				}, {
					default: b(() => [...r[70] ||= [h(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading"])])
			], 64)) : Y.value?.status === "offline" ? (_(), p("div", Rt, [J.value !== null && J.value.isEnrolled === !1 ? (_(), p("p", zt, " Not enrolled in hub. ")) : q.value !== null && q.value.connected === !1 ? (_(), p("p", Bt, " Relay disconnected. ")) : (_(), p("p", Vt, " Hub unreachable. "))])) : (_(), p("p", Ht, " No network health data available. "))])) : f("", !0)]),
			g(ie, {
				modelValue: j.value,
				"onUpdate:modelValue": r[7] ||= (e) => j.value = e,
				title: "Initiate Hub Pairing",
				onClose: an
			}, {
				footer: b(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: an
				}, {
					default: b(() => [...r[74] ||= [h("Cancel", -1)]]),
					_: 1
				}), N.value ? (_(), d(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: en.value,
					onClick: sn
				}, {
					default: b(() => [...r[75] ||= [h(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (_(), d(a, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: $t.value,
					disabled: M.value === "",
					onClick: on
				}, {
					default: b(() => [...r[76] ||= [h(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: b(() => [N.value ? (_(), p("div", Ut, [r[71] ||= m("p", null, "Enter this claim code on the hub:", -1), m("p", Wt, y(N.value), 1)])) : (_(), p("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: ve(on, ["prevent"])
				}, [m("label", Gt, [r[72] ||= m("span", { class: "admin-remote__label" }, "Hub URL", -1), _e(m("input", {
					"onUpdate:modelValue": r[5] ||= (e) => M.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[ge, M.value]])]), m("label", Kt, [r[73] ||= m("span", { class: "admin-remote__label" }, "Server name", -1), _e(m("input", {
					"onUpdate:modelValue": r[6] ||= (e) => Qt.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[ge, Qt.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-c71e798e"]]);
//#endregion
export { Yt as default };

//# sourceMappingURL=RemoteAccessPage-DgoB75aL.js.map