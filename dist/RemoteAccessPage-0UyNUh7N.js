import { n as e, t } from "./Icon-ax5k7_G2.js";
import { c as n, f as r, t as ee } from "./client-7SOKWho6.js";
import { t as i } from "./Button-k7aQagzg.js";
import { t as te } from "./Badge-ArWL5-WE.js";
import { t as ne } from "./Modal-DQiZ0eAJ.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { t as ie } from "./remoteAccess-DVKRpKQ8.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as ae, inject as oe, onMounted as se, openBlock as h, ref as g, renderList as ce, toDisplayString as _, vModelText as le, withCtx as v, withDirectives as ue, withModifiers as de } from "vue";
//#region src/pages/admin/RemoteAccessPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-remote",
	"aria-labelledby": "remote-access-heading"
}, pe = { class: "admin-remote__head" }, me = {
	id: "remote-access-heading",
	class: "admin-remote__title"
}, he = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-hub-heading"
}, ge = ["aria-expanded"], _e = { class: "admin-remote__section-title" }, ve = { class: "admin-remote__section-summary" }, ye = {
	key: 0,
	id: "remote-hub-body",
	class: "admin-remote__section-body"
}, be = {
	key: 0,
	class: "admin-remote__skel"
}, xe = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Se = {
	key: 0,
	class: "admin-remote__dl"
}, Ce = { class: "admin-remote__actions" }, we = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-subdomain-heading"
}, Te = ["aria-expanded"], Ee = { class: "admin-remote__section-title" }, De = { class: "admin-remote__section-summary" }, Oe = {
	key: 0,
	id: "remote-subdomain-body",
	class: "admin-remote__section-body"
}, ke = {
	key: 0,
	class: "admin-remote__skel"
}, Ae = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, je = {
	key: 0,
	class: "admin-remote__dl"
}, Me = { class: "admin-remote__actions" }, Ne = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-relay-heading"
}, Pe = ["aria-expanded"], Fe = { class: "admin-remote__section-title" }, Ie = { class: "admin-remote__section-summary" }, Le = {
	key: 0,
	id: "remote-relay-body",
	class: "admin-remote__section-body"
}, Re = {
	key: 0,
	class: "admin-remote__skel"
}, ze = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Be = { class: "admin-remote__dl" }, Ve = { class: "admin-remote__actions" }, He = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-portforward-heading"
}, Ue = ["aria-expanded"], We = { class: "admin-remote__section-title" }, Ge = { class: "admin-remote__section-summary" }, Ke = {
	key: 0,
	id: "remote-portforward-body",
	class: "admin-remote__section-body"
}, qe = {
	key: 0,
	class: "admin-remote__skel"
}, Je = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Ye = { class: "admin-remote__dl" }, Xe = {
	key: 0,
	class: "admin-remote__candidates"
}, Ze = { class: "admin-remote__candidates-list" }, Qe = { class: "admin-remote__actions" }, $e = {
	key: 0,
	class: "admin-remote__claim"
}, et = { class: "admin-remote__claim-code" }, tt = { class: "admin-remote__field" }, nt = { class: "admin-remote__field" }, y = /*#__PURE__*/ e(/* @__PURE__ */ ae({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(e) {
		let ae = e, y = oe("apiBase", ""), rt = c(() => typeof y == "string" ? y : y?.value ?? ""), b = new ie(ae.client ?? new ee({
			baseUrl: rt.value,
			tokenStore: new n()
		})), x = re();
		function it(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
		}
		let S = g({
			hub: !0,
			subdomain: !1,
			relay: !1,
			portforward: !1
		});
		function C(e) {
			S.value[e] = !S.value[e];
		}
		let w = g(null), T = g(!0), E = g(null), D = g(!1), O = g(!1), k = g(!1), A = g(""), at = g("Phlix Server"), j = g(null), M = g(null), N = g(!1), P = g(!1), ot = c(() => T.value ? "Loading…" : w.value === null ? "Unable to load" : w.value.paired ? `Paired${w.value.serverId ? ` (${w.value.serverId})` : ""}` : "Not paired");
		async function F() {
			T.value = !0, E.value = null;
			try {
				w.value = await b.hubStatus();
			} catch (e) {
				E.value = r(e, "Failed to load hub status."), x.error(E.value);
			} finally {
				T.value = !1;
			}
		}
		function st() {
			k.value = !0;
		}
		function ct() {
			k.value = !1, j.value = null, M.value = null;
		}
		async function lt() {
			if (!N.value) {
				if (A.value === "") {
					x.error("Hub URL is required.");
					return;
				}
				N.value = !0;
				try {
					let e = await b.hubPair(A.value, at.value);
					e.success && (j.value = e.claimCode ?? null, M.value = e.claimId ?? null, x.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					x.error(r(e, "Failed to initiate pairing."));
				} finally {
					N.value = !1;
				}
			}
		}
		async function ut() {
			if (!(M.value === null || A.value === "") && !P.value) {
				P.value = !0;
				try {
					let e = await b.hubPoll(M.value, A.value);
					e.success && e.token ? (await b.hubComplete(e.token, "", e.serverId ?? "", A.value), x.success("Hub paired successfully."), ct(), await F()) : !e.success && e.message && x.error(e.message);
				} catch (e) {
					x.error(r(e, "Failed to poll pairing status."));
				} finally {
					P.value = !1;
				}
			}
		}
		async function dt() {
			if (!D.value) {
				D.value = !0;
				try {
					await b.hubUnenroll(), x.success("Hub unenrolled."), await F();
				} catch (e) {
					x.error(r(e, "Failed to unenroll."));
				} finally {
					D.value = !1;
				}
			}
		}
		async function ft() {
			if (!O.value) {
				O.value = !0;
				try {
					(await b.hubHeartbeat()).success && x.success("Heartbeat sent.");
				} catch (e) {
					x.error(r(e, "Failed to send heartbeat."));
				} finally {
					O.value = !1;
				}
			}
		}
		let I = g(null), L = g(!0), R = g(null), z = g(!1), B = g(!1), pt = c(() => L.value ? "Loading…" : I.value === null ? "Unable to load" : I.value.claimed ? `Claimed${I.value.subdomain ? ` (${I.value.subdomain})` : ""}` : "Not claimed");
		async function V() {
			L.value = !0, R.value = null;
			try {
				I.value = await b.subdomainStatus();
			} catch (e) {
				R.value = r(e, "Failed to load subdomain status."), x.error(R.value);
			} finally {
				L.value = !1;
			}
		}
		async function mt() {
			if (!z.value) {
				z.value = !0;
				try {
					await b.subdomainClaim(), x.success("Subdomain claimed."), await V();
				} catch (e) {
					x.error(r(e, "Failed to claim subdomain."));
				} finally {
					z.value = !1;
				}
			}
		}
		async function ht() {
			if (!B.value) {
				B.value = !0;
				try {
					await b.subdomainRelease(), x.success("Subdomain released."), await V();
				} catch (e) {
					x.error(r(e, "Failed to release subdomain."));
				} finally {
					B.value = !1;
				}
			}
		}
		let H = g(null), U = g(!0), W = g(null), G = g(!1), K = g(!1), q = g(!1), J = g(null), gt = c(() => U.value ? "Loading…" : H.value === null ? "Unable to load" : H.value.connected ? `Connected${J.value === null ? "" : ` (${J.value}ms latency)`}` : "Disconnected"), _t = c(() => G.value || K.value);
		async function vt() {
			U.value = !0, W.value = null;
			try {
				H.value = await b.relayStatus(), J.value = null;
			} catch (e) {
				W.value = r(e, "Failed to load relay status."), x.error(W.value);
			} finally {
				U.value = !1;
			}
		}
		async function yt() {
			if (!G.value) {
				G.value = !0;
				try {
					await b.relayEnable(), x.success("Relay enabled."), await vt();
				} catch (e) {
					x.error(r(e, "Failed to enable relay."));
				} finally {
					G.value = !1;
				}
			}
		}
		async function bt() {
			if (!K.value) {
				K.value = !0;
				try {
					await b.relayDisable(), x.success("Relay disabled."), await vt();
				} catch (e) {
					x.error(r(e, "Failed to disable relay."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function xt() {
			if (!q.value) {
				q.value = !0;
				try {
					let e = await b.relayPing();
					J.value = e.latencyMs, x.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					x.error(r(e, "Failed to ping relay."));
				} finally {
					q.value = !1;
				}
			}
		}
		let Y = g(null), St = g(!0), X = g(null), Z = g(!1), Q = g(!1), Ct = g([]), wt = c(() => St.value ? "Loading…" : Y.value === null ? "Unable to load" : Y.value.enabled ? Y.value.externalIp ? `Enabled (${Y.value.externalIp}:${Y.value.externalPort})` : "Enabled" : "Disabled"), Tt = c(() => Z.value || Q.value);
		async function $() {
			St.value = !0, X.value = null;
			try {
				let [e, t] = await Promise.all([b.portForwardStatus(), b.portForwardCandidates()]);
				Y.value = e, Ct.value = t.candidates;
			} catch (e) {
				X.value = r(e, "Failed to load port-forward status."), x.error(X.value);
			} finally {
				St.value = !1;
			}
		}
		async function Et() {
			if (!Z.value) {
				Z.value = !0;
				try {
					await b.portForwardEnable(), x.success("Port forwarding enabled."), await $();
				} catch (e) {
					x.error(r(e, "Failed to enable port forwarding."));
				} finally {
					Z.value = !1;
				}
			}
		}
		async function Dt() {
			if (!Q.value) {
				Q.value = !0;
				try {
					await b.portForwardDisable(), x.success("Port forwarding disabled."), await $();
				} catch (e) {
					x.error(r(e, "Failed to disable port forwarding."));
				} finally {
					Q.value = !1;
				}
			}
		}
		return se(() => {
			F(), V(), vt(), $();
		}), (e, n) => (h(), d("section", fe, [
			f("header", pe, [f("h1", me, [m(t, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), n[7] ||= p(" Remote Access ", -1)])]),
			f("section", he, [f("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": S.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: n[0] ||= (e) => C("hub")
			}, [f("span", _e, [n[8] ||= f("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), m(t, {
				name: S.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), f("span", ve, _(ot.value), 1)], 8, ge), S.value.hub ? (h(), d("div", ye, [T.value ? (h(), d("div", be, [m(a, {
				variant: "text",
				lines: 3
			})])) : E.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load hub status",
				description: E.value
			}, {
				actions: v(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: F
				}, {
					default: v(() => [...n[9] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : w.value === null ? (h(), d("p", xe, " No hub status available. ")) : (h(), d(s, { key: 3 }, [w.value.paired ? (h(), d("dl", Se, [
				w.value.serverId ? (h(), d(s, { key: 0 }, [n[10] ||= f("dt", null, "Server ID", -1), f("dd", null, _(w.value.serverId), 1)], 64)) : u("", !0),
				w.value.hubUrl ? (h(), d(s, { key: 1 }, [n[11] ||= f("dt", null, "Hub URL", -1), f("dd", null, _(w.value.hubUrl), 1)], 64)) : u("", !0),
				w.value.enrolledAt ? (h(), d(s, { key: 2 }, [n[12] ||= f("dt", null, "Enrolled at", -1), f("dd", null, _(it(w.value.enrolledAt)), 1)], 64)) : u("", !0)
			])) : u("", !0), f("div", Ce, [w.value.paired ? (h(), d(s, { key: 1 }, [m(i, {
				variant: "outline",
				size: "sm",
				loading: O.value,
				onClick: ft
			}, {
				default: v(() => [...n[14] ||= [p(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), m(i, {
				variant: "ghost",
				size: "sm",
				loading: D.value,
				onClick: dt
			}, {
				default: v(() => [...n[15] ||= [p(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (h(), l(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: st
			}, {
				default: v(() => [...n[13] ||= [p(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : u("", !0)]),
			f("section", we, [f("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": S.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: n[1] ||= (e) => C("subdomain")
			}, [f("span", Ee, [n[16] ||= f("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), m(t, {
				name: S.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), f("span", De, _(pt.value), 1)], 8, Te), S.value.subdomain ? (h(), d("div", Oe, [L.value ? (h(), d("div", ke, [m(a, {
				variant: "text",
				lines: 2
			})])) : R.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load subdomain status",
				description: R.value
			}, {
				actions: v(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: V
				}, {
					default: v(() => [...n[17] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : I.value === null ? (h(), d("p", Ae, " No subdomain status available. ")) : (h(), d(s, { key: 3 }, [I.value.claimed ? (h(), d("dl", je, [I.value.subdomain ? (h(), d(s, { key: 0 }, [n[18] ||= f("dt", null, "Subdomain", -1), f("dd", null, _(I.value.subdomain), 1)], 64)) : u("", !0), I.value.fqdn ? (h(), d(s, { key: 1 }, [n[19] ||= f("dt", null, "FQDN", -1), f("dd", null, _(I.value.fqdn), 1)], 64)) : u("", !0)])) : u("", !0), f("div", Me, [I.value.claimed ? (h(), l(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: B.value,
				onClick: ht
			}, {
				default: v(() => [...n[21] ||= [p(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (h(), l(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: z.value,
				onClick: mt
			}, {
				default: v(() => [...n[20] ||= [p(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : u("", !0)]),
			f("section", Ne, [f("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": S.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: n[2] ||= (e) => C("relay")
			}, [f("span", Fe, [n[22] ||= f("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), m(t, {
				name: S.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), f("span", Ie, _(gt.value), 1)], 8, Pe), S.value.relay ? (h(), d("div", Le, [U.value ? (h(), d("div", Re, [m(a, {
				variant: "text",
				lines: 2
			})])) : W.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load relay status",
				description: W.value
			}, {
				actions: v(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: vt
				}, {
					default: v(() => [...n[23] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : H.value === null ? (h(), d("p", ze, " No relay status available. ")) : (h(), d(s, { key: 3 }, [f("dl", Be, [
				n[25] ||= f("dt", null, "Status", -1),
				f("dd", null, [m(te, { tone: H.value.connected ? "success" : "neutral" }, {
					default: v(() => [p(_(H.value.connected ? "Connected" : "Disconnected"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				n[26] ||= f("dt", null, "Active", -1),
				f("dd", null, _(H.value.active ? "Yes" : "No"), 1),
				J.value === null ? u("", !0) : (h(), d(s, { key: 0 }, [n[24] ||= f("dt", null, "Latency", -1), f("dd", null, _(J.value) + "ms", 1)], 64))
			]), f("div", Ve, [m(i, {
				variant: "outline",
				size: "sm",
				loading: q.value,
				disabled: !H.value.connected,
				onClick: xt
			}, {
				default: v(() => [...n[27] ||= [p(" Ping ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]), H.value.connected ? (h(), l(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: K.value,
				disabled: _t.value,
				onClick: bt
			}, {
				default: v(() => [...n[29] ||= [p(" Disable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])) : (h(), l(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: G.value,
				disabled: _t.value,
				onClick: yt
			}, {
				default: v(() => [...n[28] ||= [p(" Enable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]))])], 64))])) : u("", !0)]),
			f("section", He, [f("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": S.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: n[3] ||= (e) => C("portforward")
			}, [f("span", We, [n[30] ||= f("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), m(t, {
				name: S.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), f("span", Ge, _(wt.value), 1)], 8, Ue), S.value.portforward ? (h(), d("div", Ke, [St.value ? (h(), d("div", qe, [m(a, {
				variant: "text",
				lines: 3
			})])) : X.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load port-forward status",
				description: X.value
			}, {
				actions: v(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: v(() => [...n[31] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Y.value === null ? (h(), d("p", Je, " No port-forward status available. ")) : (h(), d(s, { key: 3 }, [
				f("dl", Ye, [
					n[35] ||= f("dt", null, "Enabled", -1),
					f("dd", null, [m(te, { tone: Y.value.enabled ? "success" : "neutral" }, {
						default: v(() => [p(_(Y.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					Y.value.method ? (h(), d(s, { key: 0 }, [n[32] ||= f("dt", null, "Method", -1), f("dd", null, _(Y.value.method), 1)], 64)) : u("", !0),
					Y.value.externalIp ? (h(), d(s, { key: 1 }, [n[33] ||= f("dt", null, "External IP", -1), f("dd", null, _(Y.value.externalIp), 1)], 64)) : u("", !0),
					Y.value.externalPort ? (h(), d(s, { key: 2 }, [n[34] ||= f("dt", null, "External port", -1), f("dd", null, _(Y.value.externalPort), 1)], 64)) : u("", !0)
				]),
				Ct.value.length > 0 ? (h(), d("div", Xe, [n[36] ||= f("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), f("ul", Ze, [(h(!0), d(s, null, ce(Ct.value, (e, t) => (h(), d("li", { key: t }, _(e.hostname), 1))), 128))])])) : u("", !0),
				f("div", Qe, [Y.value.enabled ? (h(), l(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: Q.value,
					disabled: Tt.value,
					onClick: Dt
				}, {
					default: v(() => [...n[38] ||= [p(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (h(), l(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: Z.value,
					disabled: Tt.value,
					onClick: Et
				}, {
					default: v(() => [...n[37] ||= [p(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : u("", !0)]),
			m(ne, {
				modelValue: k.value,
				"onUpdate:modelValue": n[6] ||= (e) => k.value = e,
				title: "Initiate Hub Pairing",
				onClose: ct
			}, {
				footer: v(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: ct
				}, {
					default: v(() => [...n[42] ||= [p("Cancel", -1)]]),
					_: 1
				}), j.value ? (h(), l(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: P.value,
					onClick: ut
				}, {
					default: v(() => [...n[43] ||= [p(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (h(), l(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: N.value,
					disabled: A.value === "",
					onClick: lt
				}, {
					default: v(() => [...n[44] ||= [p(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: v(() => [j.value ? (h(), d("div", $e, [n[39] ||= f("p", null, "Enter this claim code on the hub:", -1), f("p", et, _(j.value), 1)])) : (h(), d("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: de(lt, ["prevent"])
				}, [f("label", tt, [n[40] ||= f("span", { class: "admin-remote__label" }, "Hub URL", -1), ue(f("input", {
					"onUpdate:modelValue": n[4] ||= (e) => A.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[le, A.value]])]), f("label", nt, [n[41] ||= f("span", { class: "admin-remote__label" }, "Server name", -1), ue(f("input", {
					"onUpdate:modelValue": n[5] ||= (e) => at.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[le, at.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-97621687"]]);
//#endregion
export { y as default };

//# sourceMappingURL=RemoteAccessPage-0UyNUh7N.js.map