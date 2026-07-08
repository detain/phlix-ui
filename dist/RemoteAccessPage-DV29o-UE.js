import { n as e, t } from "./Icon-24ngwBUH.js";
import { c as n, f as r, t as ee } from "./client-fw74f3l_.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-CInT03Lp.js";
import { t as ne } from "./Badge-DnDrMVUo.js";
import { t as re } from "./Modal-C23ujDyU.js";
import { t as a } from "./Skeleton-BUq2D39t.js";
import { t as o } from "./EmptyState-0XgHKEGf.js";
import { t as ie } from "./PageHint-DR8OWfto.js";
import { t as ae } from "./remoteAccess-DVKRpKQ8.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as oe, inject as se, onMounted as ce, openBlock as h, ref as g, renderList as le, toDisplayString as _, vModelText as ue, withCtx as v, withDirectives as de, withModifiers as fe } from "vue";
//#region src/pages/admin/RemoteAccessPage.vue?vue&type=script&setup=true&lang.ts
var pe = {
	class: "admin-remote",
	"aria-labelledby": "remote-access-heading"
}, me = { class: "admin-remote__head" }, he = {
	id: "remote-access-heading",
	class: "admin-remote__title"
}, ge = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-hub-heading"
}, _e = ["aria-expanded"], ve = { class: "admin-remote__section-title" }, ye = { class: "admin-remote__section-summary" }, be = {
	key: 0,
	id: "remote-hub-body",
	class: "admin-remote__section-body"
}, xe = {
	key: 0,
	class: "admin-remote__skel"
}, Se = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Ce = {
	key: 0,
	class: "admin-remote__dl"
}, we = { class: "admin-remote__actions" }, Te = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-subdomain-heading"
}, Ee = ["aria-expanded"], De = { class: "admin-remote__section-title" }, Oe = { class: "admin-remote__section-summary" }, ke = {
	key: 0,
	id: "remote-subdomain-body",
	class: "admin-remote__section-body"
}, Ae = {
	key: 0,
	class: "admin-remote__skel"
}, je = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Me = {
	key: 0,
	class: "admin-remote__dl"
}, Ne = { class: "admin-remote__actions" }, Pe = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-relay-heading"
}, Fe = ["aria-expanded"], Ie = { class: "admin-remote__section-title" }, Le = { class: "admin-remote__section-summary" }, Re = {
	key: 0,
	id: "remote-relay-body",
	class: "admin-remote__section-body"
}, ze = {
	key: 0,
	class: "admin-remote__skel"
}, Be = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Ve = { class: "admin-remote__dl" }, He = { class: "admin-remote__actions" }, Ue = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-portforward-heading"
}, We = ["aria-expanded"], Ge = { class: "admin-remote__section-title" }, Ke = { class: "admin-remote__section-summary" }, qe = {
	key: 0,
	id: "remote-portforward-body",
	class: "admin-remote__section-body"
}, Je = {
	key: 0,
	class: "admin-remote__skel"
}, Ye = {
	key: 2,
	class: "admin-remote__empty",
	role: "status"
}, Xe = { class: "admin-remote__dl" }, Ze = {
	key: 0,
	class: "admin-remote__candidates"
}, Qe = { class: "admin-remote__candidates-list" }, $e = { class: "admin-remote__actions" }, et = {
	key: 0,
	class: "admin-remote__claim"
}, tt = { class: "admin-remote__claim-code" }, nt = { class: "admin-remote__field" }, rt = { class: "admin-remote__field" }, y = /*#__PURE__*/ e(/* @__PURE__ */ oe({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(e) {
		let oe = e, y = se("apiBase", ""), it = c(() => typeof y == "string" ? y : y?.value ?? ""), b = new ae(oe.client ?? new ee({
			baseUrl: it.value,
			tokenStore: new n()
		})), x = te();
		function at(e) {
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
		let w = g(null), T = g(!0), E = g(null), D = g(!1), O = g(!1), k = g(!1), A = g(""), ot = g("Phlix Server"), j = g(null), M = g(null), N = g(!1), P = g(!1), st = c(() => T.value ? "Loading…" : w.value === null ? "Unable to load" : w.value.paired ? `Paired${w.value.serverId ? ` (${w.value.serverId})` : ""}` : "Not paired");
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
		function ct() {
			k.value = !0;
		}
		function lt() {
			k.value = !1, j.value = null, M.value = null;
		}
		async function ut() {
			if (!N.value) {
				if (A.value === "") {
					x.error("Hub URL is required.");
					return;
				}
				N.value = !0;
				try {
					let e = await b.hubPair(A.value, ot.value);
					e.success && (j.value = e.claimCode ?? null, M.value = e.claimId ?? null, x.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					x.error(r(e, "Failed to initiate pairing."));
				} finally {
					N.value = !1;
				}
			}
		}
		async function dt() {
			if (!(M.value === null || A.value === "") && !P.value) {
				P.value = !0;
				try {
					let e = await b.hubPoll(M.value, A.value);
					e.success && e.token ? (await b.hubComplete(e.token, "", e.serverId ?? "", A.value), x.success("Hub paired successfully."), lt(), await F()) : !e.success && e.message && x.error(e.message);
				} catch (e) {
					x.error(r(e, "Failed to poll pairing status."));
				} finally {
					P.value = !1;
				}
			}
		}
		async function ft() {
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
		async function pt() {
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
		let I = g(null), L = g(!0), R = g(null), z = g(!1), B = g(!1), mt = c(() => L.value ? "Loading…" : I.value === null ? "Unable to load" : I.value.claimed ? `Claimed${I.value.subdomain ? ` (${I.value.subdomain})` : ""}` : "Not claimed");
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
		async function ht() {
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
		async function gt() {
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
		let H = g(null), U = g(!0), W = g(null), G = g(!1), K = g(!1), _t = g(!1), q = g(null), vt = c(() => U.value ? "Loading…" : H.value === null ? "Unable to load" : H.value.connected ? `Connected${q.value === null ? "" : ` (${q.value}ms latency)`}` : "Disconnected"), yt = c(() => G.value || K.value);
		async function bt() {
			U.value = !0, W.value = null;
			try {
				H.value = await b.relayStatus(), q.value = null;
			} catch (e) {
				W.value = r(e, "Failed to load relay status."), x.error(W.value);
			} finally {
				U.value = !1;
			}
		}
		async function xt() {
			if (!G.value) {
				G.value = !0;
				try {
					await b.relayEnable(), x.success("Relay enabled."), await bt();
				} catch (e) {
					x.error(r(e, "Failed to enable relay."));
				} finally {
					G.value = !1;
				}
			}
		}
		async function St() {
			if (!K.value) {
				K.value = !0;
				try {
					await b.relayDisable(), x.success("Relay disabled."), await bt();
				} catch (e) {
					x.error(r(e, "Failed to disable relay."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function Ct() {
			if (!_t.value) {
				_t.value = !0;
				try {
					let e = await b.relayPing();
					q.value = e.latencyMs, x.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					x.error(r(e, "Failed to ping relay."));
				} finally {
					_t.value = !1;
				}
			}
		}
		let J = g(null), Y = g(!0), X = g(null), Z = g(!1), Q = g(!1), wt = g([]), Tt = c(() => Y.value ? "Loading…" : J.value === null ? "Unable to load" : J.value.enabled ? J.value.externalIp ? `Enabled (${J.value.externalIp}:${J.value.externalPort})` : "Enabled" : "Disabled"), Et = c(() => Z.value || Q.value);
		async function $() {
			Y.value = !0, X.value = null;
			try {
				let [e, t] = await Promise.all([b.portForwardStatus(), b.portForwardCandidates()]);
				J.value = e, wt.value = t.candidates;
			} catch (e) {
				X.value = r(e, "Failed to load port-forward status."), x.error(X.value);
			} finally {
				Y.value = !1;
			}
		}
		async function Dt() {
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
		async function Ot() {
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
		return ce(() => {
			F(), V(), bt(), $();
		}), (e, n) => (h(), d("section", pe, [
			f("header", me, [f("h1", he, [m(t, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), n[7] ||= p(" Remote Access ", -1)])]),
			m(ie, null, {
				default: v(() => [...n[8] ||= [
					p(" Reach your server from outside your home network. ", -1),
					f("strong", null, "Hub Pairing", -1),
					p(" links this server to a Phlix hub — ", -1),
					f("strong", null, "Initiate Pairing", -1),
					p(" starts it, then ", -1),
					f("strong", null, "Send Heartbeat", -1),
					p(" keeps it alive and ", -1),
					f("strong", null, "Unenroll", -1),
					p(" disconnects. ", -1),
					f("strong", null, "Subdomain", -1),
					p(" claims a friendly public address, the ", -1),
					f("strong", null, "Relay Tunnel", -1),
					p(" forwards traffic when you can't open ports (with a ", -1),
					f("strong", null, "Ping", -1),
					p(" to check latency), and ", -1),
					f("strong", null, "Port Forward", -1),
					p(" tries to open a port on your router automatically. Each section expands to show its status and controls. ", -1)
				]]),
				_: 1
			}),
			f("section", ge, [f("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": S.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: n[0] ||= (e) => C("hub")
			}, [f("span", ve, [n[9] ||= f("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), m(t, {
				name: S.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), f("span", ye, _(st.value), 1)], 8, _e), S.value.hub ? (h(), d("div", be, [T.value ? (h(), d("div", xe, [m(a, {
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
					default: v(() => [...n[10] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : w.value === null ? (h(), d("p", Se, " No hub status available. ")) : (h(), d(s, { key: 3 }, [w.value.paired ? (h(), d("dl", Ce, [
				w.value.serverId ? (h(), d(s, { key: 0 }, [n[11] ||= f("dt", null, "Server ID", -1), f("dd", null, _(w.value.serverId), 1)], 64)) : u("", !0),
				w.value.hubUrl ? (h(), d(s, { key: 1 }, [n[12] ||= f("dt", null, "Hub URL", -1), f("dd", null, _(w.value.hubUrl), 1)], 64)) : u("", !0),
				w.value.enrolledAt ? (h(), d(s, { key: 2 }, [n[13] ||= f("dt", null, "Enrolled at", -1), f("dd", null, _(at(w.value.enrolledAt)), 1)], 64)) : u("", !0)
			])) : u("", !0), f("div", we, [w.value.paired ? (h(), d(s, { key: 1 }, [m(i, {
				variant: "outline",
				size: "sm",
				loading: O.value,
				onClick: pt
			}, {
				default: v(() => [...n[15] ||= [p(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), m(i, {
				variant: "ghost",
				size: "sm",
				loading: D.value,
				onClick: ft
			}, {
				default: v(() => [...n[16] ||= [p(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (h(), l(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: ct
			}, {
				default: v(() => [...n[14] ||= [p(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : u("", !0)]),
			f("section", Te, [f("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": S.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: n[1] ||= (e) => C("subdomain")
			}, [f("span", De, [n[17] ||= f("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), m(t, {
				name: S.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), f("span", Oe, _(mt.value), 1)], 8, Ee), S.value.subdomain ? (h(), d("div", ke, [L.value ? (h(), d("div", Ae, [m(a, {
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
					default: v(() => [...n[18] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : I.value === null ? (h(), d("p", je, " No subdomain status available. ")) : (h(), d(s, { key: 3 }, [I.value.claimed ? (h(), d("dl", Me, [I.value.subdomain ? (h(), d(s, { key: 0 }, [n[19] ||= f("dt", null, "Subdomain", -1), f("dd", null, _(I.value.subdomain), 1)], 64)) : u("", !0), I.value.fqdn ? (h(), d(s, { key: 1 }, [n[20] ||= f("dt", null, "FQDN", -1), f("dd", null, _(I.value.fqdn), 1)], 64)) : u("", !0)])) : u("", !0), f("div", Ne, [I.value.claimed ? (h(), l(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: B.value,
				onClick: gt
			}, {
				default: v(() => [...n[22] ||= [p(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (h(), l(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: z.value,
				onClick: ht
			}, {
				default: v(() => [...n[21] ||= [p(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : u("", !0)]),
			f("section", Pe, [f("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": S.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: n[2] ||= (e) => C("relay")
			}, [f("span", Ie, [n[23] ||= f("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), m(t, {
				name: S.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), f("span", Le, _(vt.value), 1)], 8, Fe), S.value.relay ? (h(), d("div", Re, [U.value ? (h(), d("div", ze, [m(a, {
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
					onClick: bt
				}, {
					default: v(() => [...n[24] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : H.value === null ? (h(), d("p", Be, " No relay status available. ")) : (h(), d(s, { key: 3 }, [f("dl", Ve, [
				n[26] ||= f("dt", null, "Status", -1),
				f("dd", null, [m(ne, { tone: H.value.connected ? "success" : "neutral" }, {
					default: v(() => [p(_(H.value.connected ? "Connected" : "Disconnected"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				n[27] ||= f("dt", null, "Active", -1),
				f("dd", null, _(H.value.active ? "Yes" : "No"), 1),
				q.value === null ? u("", !0) : (h(), d(s, { key: 0 }, [n[25] ||= f("dt", null, "Latency", -1), f("dd", null, _(q.value) + "ms", 1)], 64))
			]), f("div", He, [m(i, {
				variant: "outline",
				size: "sm",
				loading: _t.value,
				disabled: !H.value.connected,
				onClick: Ct
			}, {
				default: v(() => [...n[28] ||= [p(" Ping ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]), H.value.connected ? (h(), l(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: K.value,
				disabled: yt.value,
				onClick: St
			}, {
				default: v(() => [...n[30] ||= [p(" Disable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])) : (h(), l(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: G.value,
				disabled: yt.value,
				onClick: xt
			}, {
				default: v(() => [...n[29] ||= [p(" Enable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]))])], 64))])) : u("", !0)]),
			f("section", Ue, [f("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": S.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: n[3] ||= (e) => C("portforward")
			}, [f("span", Ge, [n[31] ||= f("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), m(t, {
				name: S.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), f("span", Ke, _(Tt.value), 1)], 8, We), S.value.portforward ? (h(), d("div", qe, [Y.value ? (h(), d("div", Je, [m(a, {
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
					default: v(() => [...n[32] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value === null ? (h(), d("p", Ye, " No port-forward status available. ")) : (h(), d(s, { key: 3 }, [
				f("dl", Xe, [
					n[36] ||= f("dt", null, "Enabled", -1),
					f("dd", null, [m(ne, { tone: J.value.enabled ? "success" : "neutral" }, {
						default: v(() => [p(_(J.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					J.value.method ? (h(), d(s, { key: 0 }, [n[33] ||= f("dt", null, "Method", -1), f("dd", null, _(J.value.method), 1)], 64)) : u("", !0),
					J.value.externalIp ? (h(), d(s, { key: 1 }, [n[34] ||= f("dt", null, "External IP", -1), f("dd", null, _(J.value.externalIp), 1)], 64)) : u("", !0),
					J.value.externalPort ? (h(), d(s, { key: 2 }, [n[35] ||= f("dt", null, "External port", -1), f("dd", null, _(J.value.externalPort), 1)], 64)) : u("", !0)
				]),
				wt.value.length > 0 ? (h(), d("div", Ze, [n[37] ||= f("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), f("ul", Qe, [(h(!0), d(s, null, le(wt.value, (e, t) => (h(), d("li", { key: t }, _(e.hostname), 1))), 128))])])) : u("", !0),
				f("div", $e, [J.value.enabled ? (h(), l(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: Q.value,
					disabled: Et.value,
					onClick: Ot
				}, {
					default: v(() => [...n[39] ||= [p(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (h(), l(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: Z.value,
					disabled: Et.value,
					onClick: Dt
				}, {
					default: v(() => [...n[38] ||= [p(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : u("", !0)]),
			m(re, {
				modelValue: k.value,
				"onUpdate:modelValue": n[6] ||= (e) => k.value = e,
				title: "Initiate Hub Pairing",
				onClose: lt
			}, {
				footer: v(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: lt
				}, {
					default: v(() => [...n[43] ||= [p("Cancel", -1)]]),
					_: 1
				}), j.value ? (h(), l(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: P.value,
					onClick: dt
				}, {
					default: v(() => [...n[44] ||= [p(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (h(), l(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: N.value,
					disabled: A.value === "",
					onClick: ut
				}, {
					default: v(() => [...n[45] ||= [p(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: v(() => [j.value ? (h(), d("div", et, [n[40] ||= f("p", null, "Enter this claim code on the hub:", -1), f("p", tt, _(j.value), 1)])) : (h(), d("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: fe(ut, ["prevent"])
				}, [f("label", nt, [n[41] ||= f("span", { class: "admin-remote__label" }, "Hub URL", -1), de(f("input", {
					"onUpdate:modelValue": n[4] ||= (e) => A.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[ue, A.value]])]), f("label", rt, [n[42] ||= f("span", { class: "admin-remote__label" }, "Server name", -1), de(f("input", {
					"onUpdate:modelValue": n[5] ||= (e) => ot.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[ue, ot.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-f25d3fbb"]]);
//#endregion
export { y as default };

//# sourceMappingURL=RemoteAccessPage-DV29o-UE.js.map