import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { c as n, f as r, t as ee } from "./client-BzWwyWKr.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as ne } from "./networkHealth-B5_ZbJ4U.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as re } from "./Modal-aFganlu3.js";
import { t as o } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-ZlI5t4KT.js";
import { t as ie } from "./PageHint-BoAlFFBN.js";
import { t as ae } from "./remoteAccess-DVKRpKQ8.js";
import { t as oe } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createStaticVNode as se, createTextVNode as m, createVNode as h, defineComponent as ce, inject as le, normalizeClass as ue, normalizeStyle as de, onMounted as fe, openBlock as g, ref as _, renderList as pe, toDisplayString as v, unref as me, vModelText as he, withCtx as y, withDirectives as ge, withModifiers as _e } from "vue";
//#region src/pages/admin/RemoteAccessPage.vue?vue&type=script&setup=true&lang.ts
var ve = {
	class: "admin-remote",
	"aria-labelledby": "remote-access-heading"
}, ye = { class: "admin-remote__head" }, be = {
	id: "remote-access-heading",
	class: "admin-remote__title"
}, xe = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-hub-heading"
}, Se = ["aria-expanded"], Ce = { class: "admin-remote__section-title" }, we = { class: "admin-remote__section-summary" }, Te = {
	key: 0,
	id: "remote-hub-body",
	class: "admin-remote__section-body"
}, Ee = {
	key: 0,
	class: "admin-remote__skel"
}, De = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Oe = {
	key: 0,
	class: "admin-remote__dl"
}, ke = { class: "admin-remote__actions" }, Ae = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-subdomain-heading"
}, je = ["aria-expanded"], Me = { class: "admin-remote__section-title" }, Ne = { class: "admin-remote__section-summary" }, Pe = {
	key: 0,
	id: "remote-subdomain-body",
	class: "admin-remote__section-body"
}, Fe = {
	key: 0,
	class: "admin-remote__skel"
}, Ie = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Le = {
	key: 0,
	class: "admin-remote__dl"
}, Re = { class: "admin-remote__actions" }, ze = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-relay-heading"
}, Be = ["aria-expanded"], Ve = { class: "admin-remote__section-title" }, He = { class: "admin-remote__section-summary" }, Ue = {
	key: 0,
	id: "remote-relay-body",
	class: "admin-remote__section-body"
}, We = {
	key: 0,
	class: "admin-remote__skel"
}, Ge = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Ke = { class: "admin-remote__dl" }, qe = { class: "admin-remote__actions" }, Je = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-portforward-heading"
}, Ye = ["aria-expanded"], Xe = { class: "admin-remote__section-title" }, Ze = { class: "admin-remote__section-summary" }, Qe = {
	key: 0,
	id: "remote-portforward-body",
	class: "admin-remote__section-body"
}, $e = {
	key: 0,
	class: "admin-remote__skel"
}, et = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, tt = { class: "admin-remote__dl" }, nt = {
	key: 0,
	class: "admin-remote__candidates"
}, rt = { class: "admin-remote__candidates-list" }, it = { class: "admin-remote__actions" }, at = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-networkhealth-heading"
}, ot = ["aria-expanded"], st = { class: "admin-remote__section-title" }, ct = { class: "admin-remote__section-summary" }, lt = {
	key: 0,
	id: "remote-networkhealth-body",
	class: "admin-remote__section-body"
}, ut = {
	key: 0,
	class: "admin-remote__skel"
}, dt = { class: "admin-remote__health-grid" }, ft = { class: "admin-remote__health-card" }, pt = { class: "admin-remote__dl" }, mt = { class: "admin-remote__health-card" }, ht = { class: "admin-remote__dl" }, gt = { class: "admin-remote__health-card" }, _t = { class: "admin-remote__dl" }, vt = { class: "admin-remote__capitalize" }, yt = {
	key: 0,
	class: "admin-remote__latency-graph"
}, bt = { class: "admin-remote__latency-graph-title" }, xt = ["aria-label"], St = ["title"], Ct = { class: "admin-remote__latency-value" }, wt = { class: "admin-remote__actions" }, Tt = {
	key: 3,
	class: "admin-remote__offline-info"
}, Et = {
	key: 0,
	class: "admin-remote__offline-msg"
}, Dt = {
	key: 1,
	class: "admin-remote__offline-msg"
}, Ot = {
	key: 2,
	class: "admin-remote__offline-msg"
}, kt = {
	key: 4,
	class: "admin-remote__empty",
	role: "status"
}, At = {
	key: 0,
	class: "admin-remote__claim"
}, jt = { class: "admin-remote__claim-code" }, Mt = { class: "admin-remote__field" }, Nt = { class: "admin-remote__field" }, Pt = 10, b = /*#__PURE__*/ e(/* @__PURE__ */ ce({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(e) {
		let ce = e, b = le("apiBase", ""), Ft = l(() => typeof b == "string" ? b : b?.value ?? ""), x = new ae(ce.client ?? new ee({
			baseUrl: Ft.value,
			tokenStore: new n()
		})), It = new ne(ce.client ?? new ee({
			baseUrl: Ft.value,
			tokenStore: new n()
		})), S = te();
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
			w.value[e] = !t, e === "networkhealth" && !t && gn();
		}
		let E = _(null), D = _(!0), O = _(null), Lt = _(!1), Rt = _(!1), k = _(!1), A = _(""), zt = _("Phlix Server"), j = _(null), M = _(null), Bt = _(!1), Vt = _(!1), Ht = l(() => D.value ? "Loading…" : E.value === null ? "Unable to load" : E.value.paired ? `Paired${E.value.serverId ? ` (${E.value.serverId})` : ""}` : "Not paired");
		async function Ut() {
			D.value = !0, O.value = null;
			try {
				E.value = await x.hubStatus();
			} catch (e) {
				O.value = r(e, "Failed to load hub status."), S.error(O.value);
			} finally {
				D.value = !1;
			}
		}
		function Wt() {
			k.value = !0;
		}
		function Gt() {
			k.value = !1, j.value = null, M.value = null;
		}
		async function Kt() {
			if (!Bt.value) {
				if (A.value === "") {
					S.error("Hub URL is required.");
					return;
				}
				Bt.value = !0;
				try {
					let e = await x.hubPair(A.value, zt.value);
					e.success && (j.value = e.claimCode ?? null, M.value = e.claimId ?? null, S.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					S.error(r(e, "Failed to initiate pairing."));
				} finally {
					Bt.value = !1;
				}
			}
		}
		async function qt() {
			if (!(M.value === null || A.value === "") && !Vt.value) {
				Vt.value = !0;
				try {
					let e = await x.hubPoll(M.value, A.value);
					e.success && e.token ? (await x.hubComplete(e.token, "", e.serverId ?? "", A.value), S.success("Hub paired successfully."), Gt(), await Ut()) : !e.success && e.message && S.error(e.message);
				} catch (e) {
					S.error(r(e, "Failed to poll pairing status."));
				} finally {
					Vt.value = !1;
				}
			}
		}
		async function Jt() {
			if (!Lt.value) {
				Lt.value = !0;
				try {
					await x.hubUnenroll(), S.success("Hub unenrolled."), await Ut();
				} catch (e) {
					S.error(r(e, "Failed to unenroll."));
				} finally {
					Lt.value = !1;
				}
			}
		}
		async function Yt() {
			if (!Rt.value) {
				Rt.value = !0;
				try {
					(await x.hubHeartbeat()).success && S.success("Heartbeat sent.");
				} catch (e) {
					S.error(r(e, "Failed to send heartbeat."));
				} finally {
					Rt.value = !1;
				}
			}
		}
		let N = _(null), Xt = _(!0), P = _(null), Zt = _(!1), Qt = _(!1), $t = l(() => Xt.value ? "Loading…" : N.value === null ? "Unable to load" : N.value.claimed ? `Claimed${N.value.subdomain ? ` (${N.value.subdomain})` : ""}` : "Not claimed");
		async function en() {
			Xt.value = !0, P.value = null;
			try {
				N.value = await x.subdomainStatus();
			} catch (e) {
				P.value = r(e, "Failed to load subdomain status."), S.error(P.value);
			} finally {
				Xt.value = !1;
			}
		}
		async function tn() {
			if (!Zt.value) {
				Zt.value = !0;
				try {
					await x.subdomainClaim(), S.success("Subdomain claimed."), await en();
				} catch (e) {
					S.error(r(e, "Failed to claim subdomain."));
				} finally {
					Zt.value = !1;
				}
			}
		}
		async function nn() {
			if (!Qt.value) {
				Qt.value = !0;
				try {
					await x.subdomainRelease(), S.success("Subdomain released."), await en();
				} catch (e) {
					S.error(r(e, "Failed to release subdomain."));
				} finally {
					Qt.value = !1;
				}
			}
		}
		let F = _(null), I = _(!0), L = _(null), R = _(!1), z = _(!1), B = _(!1), V = _(null), rn = l(() => I.value ? "Loading…" : F.value === null ? "Unable to load" : F.value.connected ? `Connected${V.value === null ? "" : ` (${V.value}ms latency)`}` : "Disconnected"), an = l(() => R.value || z.value);
		async function H() {
			I.value = !0, L.value = null;
			try {
				F.value = await x.relayStatus(), V.value = null;
			} catch (e) {
				L.value = r(e, "Failed to load relay status."), S.error(L.value);
			} finally {
				I.value = !1;
			}
		}
		async function on() {
			if (!R.value) {
				R.value = !0;
				try {
					await x.relayEnable(), S.success("Relay enabled."), await H();
				} catch (e) {
					S.error(r(e, "Failed to enable relay."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function sn() {
			if (!z.value) {
				z.value = !0;
				try {
					await x.relayDisable(), S.success("Relay disabled."), await H();
				} catch (e) {
					S.error(r(e, "Failed to disable relay."));
				} finally {
					z.value = !1;
				}
			}
		}
		async function cn() {
			if (!B.value) {
				B.value = !0;
				try {
					let e = await x.relayPing();
					V.value = e.latencyMs, S.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					S.error(r(e, "Failed to ping relay."));
				} finally {
					B.value = !1;
				}
			}
		}
		let U = _(null), W = _(!0), G = _(null), K = _(!1), q = _(!1), ln = _([]), un = l(() => W.value ? "Loading…" : U.value === null ? "Unable to load" : U.value.enabled ? U.value.externalIp ? `Enabled (${U.value.externalIp}:${U.value.externalPort})` : "Enabled" : "Disabled"), dn = l(() => K.value || q.value);
		async function fn() {
			W.value = !0, G.value = null;
			try {
				let [e, t] = await Promise.all([x.portForwardStatus(), x.portForwardCandidates()]);
				U.value = e, ln.value = t.candidates;
			} catch (e) {
				G.value = r(e, "Failed to load port-forward status."), S.error(G.value);
			} finally {
				W.value = !1;
			}
		}
		async function pn() {
			if (!K.value) {
				K.value = !0;
				try {
					await x.portForwardEnable(), S.success("Port forwarding enabled."), await fn();
				} catch (e) {
					S.error(r(e, "Failed to enable port forwarding."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function mn() {
			if (!q.value) {
				q.value = !0;
				try {
					await x.portForwardDisable(), S.success("Port forwarding disabled."), await fn();
				} catch (e) {
					S.error(r(e, "Failed to disable port forwarding."));
				} finally {
					q.value = !1;
				}
			}
		}
		let J = _(null), Y = _(null), X = _(null), Z = _([]), Q = _(!1), $ = _(null);
		async function hn() {
			Q.value = !0, $.value = null;
			try {
				let e = await It.getHealthSnapshot();
				J.value = e.relay, Y.value = e.hub, X.value = e.network, e.network.latencyMs !== null && (Z.value.push({
					ms: e.network.latencyMs,
					at: e.network.measuredAt
				}), Z.value.length > Pt && (Z.value = Z.value.slice(-10)));
			} catch (e) {
				$.value = r(e, "Failed to load network health."), S.error($.value);
			} finally {
				Q.value = !1;
			}
		}
		function gn() {
			!Q.value && J.value === null && hn();
		}
		let _n = l(() => {
			if (Q.value) return "Loading…";
			if ($.value) return "Error loading";
			if (J.value === null) return "Not available";
			let e = X.value?.latencyMs, t = X.value?.status ?? "offline";
			return e == null ? t : `${t} (${e}ms)`;
		});
		return fe(() => {
			Ut(), en(), H(), fn();
		}), (e, n) => (g(), f("section", ve, [
			p("header", ye, [p("h1", be, [h(t, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), n[8] ||= m(" Remote Access ", -1)])]),
			h(ie, {
				links: me(oe)["remote-access"].links,
				details: me(oe)["remote-access"].details
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
			p("section", xe, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: n[0] ||= (e) => T("hub")
			}, [p("span", Ce, [n[10] ||= p("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), h(t, {
				name: w.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", we, v(Ht.value), 1)], 8, Se), w.value.hub ? (g(), f("div", Te, [D.value ? (g(), f("div", Ee, [h(o, {
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
					onClick: Ut
				}, {
					default: y(() => [...n[11] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : E.value === null ? (g(), f("p", De, " No hub status available. ")) : (g(), f(c, { key: 3 }, [E.value.paired ? (g(), f("dl", Oe, [
				E.value.serverId ? (g(), f(c, { key: 0 }, [n[12] ||= p("dt", null, "Server ID", -1), p("dd", null, v(E.value.serverId), 1)], 64)) : d("", !0),
				E.value.hubUrl ? (g(), f(c, { key: 1 }, [n[13] ||= p("dt", null, "Hub URL", -1), p("dd", null, v(E.value.hubUrl), 1)], 64)) : d("", !0),
				E.value.enrolledAt ? (g(), f(c, { key: 2 }, [n[14] ||= p("dt", null, "Enrolled at", -1), p("dd", null, v(C(E.value.enrolledAt)), 1)], 64)) : d("", !0)
			])) : d("", !0), p("div", ke, [E.value.paired ? (g(), f(c, { key: 1 }, [h(i, {
				variant: "outline",
				size: "sm",
				loading: Rt.value,
				onClick: Yt
			}, {
				default: y(() => [...n[16] ||= [m(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), h(i, {
				variant: "ghost",
				size: "sm",
				loading: Lt.value,
				onClick: Jt
			}, {
				default: y(() => [...n[17] ||= [m(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: Wt
			}, {
				default: y(() => [...n[15] ||= [m(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : d("", !0)]),
			p("section", Ae, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: n[1] ||= (e) => T("subdomain")
			}, [p("span", Me, [n[18] ||= p("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), h(t, {
				name: w.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Ne, v($t.value), 1)], 8, je), w.value.subdomain ? (g(), f("div", Pe, [Xt.value ? (g(), f("div", Fe, [h(o, {
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
					onClick: en
				}, {
					default: y(() => [...n[19] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : N.value === null ? (g(), f("p", Ie, " No subdomain status available. ")) : (g(), f(c, { key: 3 }, [N.value.claimed ? (g(), f("dl", Le, [N.value.subdomain ? (g(), f(c, { key: 0 }, [n[20] ||= p("dt", null, "Subdomain", -1), p("dd", null, v(N.value.subdomain), 1)], 64)) : d("", !0), N.value.fqdn ? (g(), f(c, { key: 1 }, [n[21] ||= p("dt", null, "FQDN", -1), p("dd", null, v(N.value.fqdn), 1)], 64)) : d("", !0)])) : d("", !0), p("div", Re, [N.value.claimed ? (g(), u(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: Qt.value,
				onClick: nn
			}, {
				default: y(() => [...n[23] ||= [m(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: Zt.value,
				onClick: tn
			}, {
				default: y(() => [...n[22] ||= [m(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : d("", !0)]),
			p("section", ze, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: n[2] ||= (e) => T("relay")
			}, [p("span", Ve, [n[24] ||= p("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), h(t, {
				name: w.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", He, v(rn.value), 1)], 8, Be), w.value.relay ? (g(), f("div", Ue, [I.value ? (g(), f("div", We, [h(o, {
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
			}, 8, ["description"])) : F.value === null ? (g(), f("p", Ge, " No relay status available. ")) : (g(), f(c, { key: 3 }, [p("dl", Ke, [
				n[27] ||= p("dt", null, "Status", -1),
				p("dd", null, [h(a, { tone: F.value.connected ? "success" : "neutral" }, {
					default: y(() => [m(v(F.value.connected ? "Connected" : "Disconnected"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				n[28] ||= p("dt", null, "Active", -1),
				p("dd", null, v(F.value.active ? "Yes" : "No"), 1),
				V.value === null ? d("", !0) : (g(), f(c, { key: 0 }, [n[26] ||= p("dt", null, "Latency", -1), p("dd", null, v(V.value) + "ms", 1)], 64))
			]), p("div", qe, [h(i, {
				variant: "outline",
				size: "sm",
				loading: B.value,
				disabled: !F.value.connected,
				onClick: cn
			}, {
				default: y(() => [...n[29] ||= [m(" Ping ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]), F.value.connected ? (g(), u(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: z.value,
				disabled: an.value,
				onClick: sn
			}, {
				default: y(() => [...n[31] ||= [m(" Disable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])) : (g(), u(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: R.value,
				disabled: an.value,
				onClick: on
			}, {
				default: y(() => [...n[30] ||= [m(" Enable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]))])], 64))])) : d("", !0)]),
			p("section", Je, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: n[3] ||= (e) => T("portforward")
			}, [p("span", Xe, [n[32] ||= p("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), h(t, {
				name: w.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", Ze, v(un.value), 1)], 8, Ye), w.value.portforward ? (g(), f("div", Qe, [W.value ? (g(), f("div", $e, [h(o, {
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
					onClick: fn
				}, {
					default: y(() => [...n[33] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : U.value === null ? (g(), f("p", et, " No port-forward status available. ")) : (g(), f(c, { key: 3 }, [
				p("dl", tt, [
					n[37] ||= p("dt", null, "Enabled", -1),
					p("dd", null, [h(a, { tone: U.value.enabled ? "success" : "neutral" }, {
						default: y(() => [m(v(U.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					U.value.method ? (g(), f(c, { key: 0 }, [n[34] ||= p("dt", null, "Method", -1), p("dd", null, v(U.value.method), 1)], 64)) : d("", !0),
					U.value.externalIp ? (g(), f(c, { key: 1 }, [n[35] ||= p("dt", null, "External IP", -1), p("dd", null, v(U.value.externalIp), 1)], 64)) : d("", !0),
					U.value.externalPort ? (g(), f(c, { key: 2 }, [n[36] ||= p("dt", null, "External port", -1), p("dd", null, v(U.value.externalPort), 1)], 64)) : d("", !0)
				]),
				ln.value.length > 0 ? (g(), f("div", nt, [n[38] ||= p("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), p("ul", rt, [(g(!0), f(c, null, pe(ln.value, (e, t) => (g(), f("li", { key: t }, v(e.hostname), 1))), 128))])])) : d("", !0),
				p("div", it, [U.value.enabled ? (g(), u(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: q.value,
					disabled: dn.value,
					onClick: mn
				}, {
					default: y(() => [...n[40] ||= [m(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: K.value,
					disabled: dn.value,
					onClick: pn
				}, {
					default: y(() => [...n[39] ||= [m(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : d("", !0)]),
			p("section", at, [p("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": w.value.networkhealth,
				"aria-controls": "remote-networkhealth-body",
				onClick: n[4] ||= (e) => T("networkhealth")
			}, [p("span", st, [n[41] ||= p("h2", { id: "remote-networkhealth-heading" }, "Network Health", -1), h(t, {
				name: w.value.networkhealth ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), p("span", ct, v(_n.value), 1)], 8, ot), w.value.networkhealth ? (g(), f("div", lt, [Q.value ? (g(), f("div", ut, [h(o, {
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
					onClick: hn
				}, {
					default: y(() => [...n[42] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value !== null && Y.value !== null ? (g(), f(c, { key: 2 }, [
				p("div", dt, [
					p("div", ft, [n[47] ||= p("h3", { class: "admin-remote__health-card-title" }, "Relay Tunnel", -1), p("dl", pt, [
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
					p("div", mt, [n[52] ||= p("h3", { class: "admin-remote__health-card-title" }, "Hub Heartbeat", -1), p("dl", ht, [
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
					p("div", gt, [n[56] ||= p("h3", { class: "admin-remote__health-card-title" }, "Network Latency", -1), p("dl", _t, [
						n[54] ||= p("dt", null, "Current", -1),
						p("dd", null, [h(a, { tone: X.value?.status === "healthy" ? "success" : X.value?.status === "degraded" ? "warning" : "error" }, {
							default: y(() => [m(v(X.value?.latencyMs == null ? "N/A" : `${X.value?.latencyMs}ms`), 1)]),
							_: 1
						}, 8, ["tone"])]),
						n[55] ||= p("dt", null, "Status", -1),
						p("dd", vt, v(X.value?.status ?? "unknown"), 1),
						X.value?.measuredAt ? (g(), f(c, { key: 0 }, [n[53] ||= p("dt", null, "Measured", -1), p("dd", null, v(C(X.value?.measuredAt)), 1)], 64)) : d("", !0)
					])])
				]),
				Z.value.length > 0 ? (g(), f("div", yt, [
					p("h3", bt, "Latency History (last " + v(Z.value.length) + " measurements)", 1),
					p("div", {
						class: "admin-remote__latency-bars",
						role: "img",
						"aria-label": `Latency graph showing ${Z.value.length} measurements`
					}, [(g(!0), f(c, null, pe(Z.value, (e, t) => (g(), f("div", {
						key: t,
						class: "admin-remote__latency-bar-wrap",
						title: `${e.ms}ms at ${C(e.at)}`
					}, [p("div", {
						class: ue(["admin-remote__latency-bar", `admin-remote__latency-bar--${e.ms < 100 ? "good" : e.ms < 500 ? "warn" : "bad"}`]),
						style: de({ height: `${Math.min(100, e.ms / 600 * 100)}%` })
					}, null, 6), p("span", Ct, v(e.ms), 1)], 8, St))), 128))], 8, xt),
					n[57] ||= se("<div class=\"admin-remote__latency-legend\" data-v-0050fba0><span class=\"admin-remote__latency-legend-item\" data-v-0050fba0><span class=\"admin-remote__latency-dot admin-remote__latency-dot--good\" data-v-0050fba0></span> &lt;100ms</span><span class=\"admin-remote__latency-legend-item\" data-v-0050fba0><span class=\"admin-remote__latency-dot admin-remote__latency-dot--warn\" data-v-0050fba0></span> 100-500ms</span><span class=\"admin-remote__latency-legend-item\" data-v-0050fba0><span class=\"admin-remote__latency-dot admin-remote__latency-dot--bad\" data-v-0050fba0></span> &gt;500ms</span></div>", 1)
				])) : d("", !0),
				p("div", wt, [h(i, {
					variant: "outline",
					size: "sm",
					loading: Q.value,
					onClick: hn
				}, {
					default: y(() => [...n[58] ||= [m(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading"])])
			], 64)) : X.value?.status === "offline" ? (g(), f("div", Tt, [Y.value !== null && Y.value.isEnrolled === !1 ? (g(), f("p", Et, " Not enrolled in hub. ")) : J.value !== null && J.value.connected === !1 ? (g(), f("p", Dt, " Relay disconnected. ")) : (g(), f("p", Ot, " Hub unreachable. "))])) : (g(), f("p", kt, " No network health data available. "))])) : d("", !0)]),
			h(re, {
				modelValue: k.value,
				"onUpdate:modelValue": n[7] ||= (e) => k.value = e,
				title: "Initiate Hub Pairing",
				onClose: Gt
			}, {
				footer: y(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: Gt
				}, {
					default: y(() => [...n[62] ||= [m("Cancel", -1)]]),
					_: 1
				}), j.value ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: Vt.value,
					onClick: qt
				}, {
					default: y(() => [...n[63] ||= [m(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (g(), u(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: Bt.value,
					disabled: A.value === "",
					onClick: Kt
				}, {
					default: y(() => [...n[64] ||= [m(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: y(() => [j.value ? (g(), f("div", At, [n[59] ||= p("p", null, "Enter this claim code on the hub:", -1), p("p", jt, v(j.value), 1)])) : (g(), f("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: _e(Kt, ["prevent"])
				}, [p("label", Mt, [n[60] ||= p("span", { class: "admin-remote__label" }, "Hub URL", -1), ge(p("input", {
					"onUpdate:modelValue": n[5] ||= (e) => A.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[he, A.value]])]), p("label", Nt, [n[61] ||= p("span", { class: "admin-remote__label" }, "Server name", -1), ge(p("input", {
					"onUpdate:modelValue": n[6] ||= (e) => zt.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[he, zt.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-0050fba0"]]);
//#endregion
export { b as default };

//# sourceMappingURL=RemoteAccessPage-B4JAthiS.js.map