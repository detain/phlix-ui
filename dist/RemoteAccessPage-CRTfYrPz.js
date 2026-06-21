import { n as e, t } from "./Icon-ax5k7_G2.js";
import { d as n, n as ee, s as te, t as r } from "./Button-5ZSsUmsI.js";
import { t as ne } from "./Badge-ArWL5-WE.js";
import { t as re } from "./Modal-I4tEFhoH.js";
import { t as ie } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Skeleton-DkSoWF3C.js";
import { t as a } from "./EmptyState-B2QnGIQT.js";
import { t as ae } from "./remoteAccess-DVKRpKQ8.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as oe, inject as se, onMounted as ce, openBlock as m, ref as h, renderList as le, toDisplayString as g, vModelText as ue, withCtx as _, withDirectives as de, withModifiers as fe } from "vue";
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
}, tt = { class: "admin-remote__claim-code" }, nt = { class: "admin-remote__field" }, rt = { class: "admin-remote__field" }, v = /*#__PURE__*/ e(/* @__PURE__ */ oe({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(e) {
		let oe = e, v = se("apiBase", ""), it = s(() => typeof v == "string" ? v : v?.value ?? ""), y = new ae(oe.client ?? new ee({
			baseUrl: it.value,
			tokenStore: new te()
		})), b = ie();
		function at(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
		}
		let x = h({
			hub: !0,
			subdomain: !1,
			relay: !1,
			portforward: !1
		});
		function S(e) {
			x.value[e] = !x.value[e];
		}
		let C = h(null), w = h(!0), T = h(null), E = h(!1), D = h(!1), O = h(!1), k = h(""), ot = h("Phlix Server"), A = h(null), j = h(null), M = h(!1), N = h(!1), st = s(() => w.value ? "Loading…" : C.value === null ? "Unable to load" : C.value.paired ? `Paired${C.value.serverId ? ` (${C.value.serverId})` : ""}` : "Not paired");
		async function P() {
			w.value = !0, T.value = null;
			try {
				C.value = await y.hubStatus();
			} catch (e) {
				T.value = n(e, "Failed to load hub status."), b.error(T.value);
			} finally {
				w.value = !1;
			}
		}
		function ct() {
			O.value = !0;
		}
		function lt() {
			O.value = !1, A.value = null, j.value = null;
		}
		async function ut() {
			if (!M.value) {
				if (k.value === "") {
					b.error("Hub URL is required.");
					return;
				}
				M.value = !0;
				try {
					let e = await y.hubPair(k.value, ot.value);
					e.success && (A.value = e.claimCode ?? null, j.value = e.claimId ?? null, b.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					b.error(n(e, "Failed to initiate pairing."));
				} finally {
					M.value = !1;
				}
			}
		}
		async function dt() {
			if (!(j.value === null || k.value === "") && !N.value) {
				N.value = !0;
				try {
					let e = await y.hubPoll(j.value, k.value);
					e.success && e.token ? (await y.hubComplete(e.token, "", e.serverId ?? "", k.value), b.success("Hub paired successfully."), lt(), await P()) : !e.success && e.message && b.error(e.message);
				} catch (e) {
					b.error(n(e, "Failed to poll pairing status."));
				} finally {
					N.value = !1;
				}
			}
		}
		async function ft() {
			if (!E.value) {
				E.value = !0;
				try {
					await y.hubUnenroll(), b.success("Hub unenrolled."), await P();
				} catch (e) {
					b.error(n(e, "Failed to unenroll."));
				} finally {
					E.value = !1;
				}
			}
		}
		async function pt() {
			if (!D.value) {
				D.value = !0;
				try {
					(await y.hubHeartbeat()).success && b.success("Heartbeat sent.");
				} catch (e) {
					b.error(n(e, "Failed to send heartbeat."));
				} finally {
					D.value = !1;
				}
			}
		}
		let F = h(null), I = h(!0), L = h(null), R = h(!1), z = h(!1), mt = s(() => I.value ? "Loading…" : F.value === null ? "Unable to load" : F.value.claimed ? `Claimed${F.value.subdomain ? ` (${F.value.subdomain})` : ""}` : "Not claimed");
		async function B() {
			I.value = !0, L.value = null;
			try {
				F.value = await y.subdomainStatus();
			} catch (e) {
				L.value = n(e, "Failed to load subdomain status."), b.error(L.value);
			} finally {
				I.value = !1;
			}
		}
		async function ht() {
			if (!R.value) {
				R.value = !0;
				try {
					await y.subdomainClaim(), b.success("Subdomain claimed."), await B();
				} catch (e) {
					b.error(n(e, "Failed to claim subdomain."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function gt() {
			if (!z.value) {
				z.value = !0;
				try {
					await y.subdomainRelease(), b.success("Subdomain released."), await B();
				} catch (e) {
					b.error(n(e, "Failed to release subdomain."));
				} finally {
					z.value = !1;
				}
			}
		}
		let V = h(null), H = h(!0), U = h(null), W = h(!1), G = h(!1), K = h(!1), q = h(null), _t = s(() => H.value ? "Loading…" : V.value === null ? "Unable to load" : V.value.connected ? `Connected${q.value === null ? "" : ` (${q.value}ms latency)`}` : "Disconnected"), vt = s(() => W.value || G.value);
		async function J() {
			H.value = !0, U.value = null;
			try {
				V.value = await y.relayStatus(), q.value = null;
			} catch (e) {
				U.value = n(e, "Failed to load relay status."), b.error(U.value);
			} finally {
				H.value = !1;
			}
		}
		async function yt() {
			if (!W.value) {
				W.value = !0;
				try {
					await y.relayEnable(), b.success("Relay enabled."), await J();
				} catch (e) {
					b.error(n(e, "Failed to enable relay."));
				} finally {
					W.value = !1;
				}
			}
		}
		async function bt() {
			if (!G.value) {
				G.value = !0;
				try {
					await y.relayDisable(), b.success("Relay disabled."), await J();
				} catch (e) {
					b.error(n(e, "Failed to disable relay."));
				} finally {
					G.value = !1;
				}
			}
		}
		async function xt() {
			if (!K.value) {
				K.value = !0;
				try {
					let e = await y.relayPing();
					q.value = e.latencyMs, b.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					b.error(n(e, "Failed to ping relay."));
				} finally {
					K.value = !1;
				}
			}
		}
		let Y = h(null), St = h(!0), X = h(null), Z = h(!1), Q = h(!1), Ct = h([]), wt = s(() => St.value ? "Loading…" : Y.value === null ? "Unable to load" : Y.value.enabled ? Y.value.externalIp ? `Enabled (${Y.value.externalIp}:${Y.value.externalPort})` : "Enabled" : "Disabled"), Tt = s(() => Z.value || Q.value);
		async function $() {
			St.value = !0, X.value = null;
			try {
				let [e, t] = await Promise.all([y.portForwardStatus(), y.portForwardCandidates()]);
				Y.value = e, Ct.value = t.candidates;
			} catch (e) {
				X.value = n(e, "Failed to load port-forward status."), b.error(X.value);
			} finally {
				St.value = !1;
			}
		}
		async function Et() {
			if (!Z.value) {
				Z.value = !0;
				try {
					await y.portForwardEnable(), b.success("Port forwarding enabled."), await $();
				} catch (e) {
					b.error(n(e, "Failed to enable port forwarding."));
				} finally {
					Z.value = !1;
				}
			}
		}
		async function Dt() {
			if (!Q.value) {
				Q.value = !0;
				try {
					await y.portForwardDisable(), b.success("Port forwarding disabled."), await $();
				} catch (e) {
					b.error(n(e, "Failed to disable port forwarding."));
				} finally {
					Q.value = !1;
				}
			}
		}
		return ce(() => {
			P(), B(), J(), $();
		}), (e, n) => (m(), u("section", pe, [
			d("header", me, [d("h1", he, [p(t, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), n[7] ||= f(" Remote Access ", -1)])]),
			d("section", ge, [d("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: n[0] ||= (e) => S("hub")
			}, [d("span", ve, [n[8] ||= d("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), p(t, {
				name: x.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), d("span", ye, g(st.value), 1)], 8, _e), x.value.hub ? (m(), u("div", be, [w.value ? (m(), u("div", xe, [p(i, {
				variant: "text",
				lines: 3
			})])) : T.value ? (m(), c(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load hub status",
				description: T.value
			}, {
				actions: _(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: _(() => [...n[9] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : C.value === null ? (m(), u("p", Se, " No hub status available. ")) : (m(), u(o, { key: 3 }, [C.value.paired ? (m(), u("dl", Ce, [
				C.value.serverId ? (m(), u(o, { key: 0 }, [n[10] ||= d("dt", null, "Server ID", -1), d("dd", null, g(C.value.serverId), 1)], 64)) : l("", !0),
				C.value.hubUrl ? (m(), u(o, { key: 1 }, [n[11] ||= d("dt", null, "Hub URL", -1), d("dd", null, g(C.value.hubUrl), 1)], 64)) : l("", !0),
				C.value.enrolledAt ? (m(), u(o, { key: 2 }, [n[12] ||= d("dt", null, "Enrolled at", -1), d("dd", null, g(at(C.value.enrolledAt)), 1)], 64)) : l("", !0)
			])) : l("", !0), d("div", we, [C.value.paired ? (m(), u(o, { key: 1 }, [p(r, {
				variant: "outline",
				size: "sm",
				loading: D.value,
				onClick: pt
			}, {
				default: _(() => [...n[14] ||= [f(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), p(r, {
				variant: "ghost",
				size: "sm",
				loading: E.value,
				onClick: ft
			}, {
				default: _(() => [...n[15] ||= [f(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (m(), c(r, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: ct
			}, {
				default: _(() => [...n[13] ||= [f(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : l("", !0)]),
			d("section", Te, [d("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: n[1] ||= (e) => S("subdomain")
			}, [d("span", De, [n[16] ||= d("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), p(t, {
				name: x.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), d("span", Oe, g(mt.value), 1)], 8, Ee), x.value.subdomain ? (m(), u("div", ke, [I.value ? (m(), u("div", Ae, [p(i, {
				variant: "text",
				lines: 2
			})])) : L.value ? (m(), c(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load subdomain status",
				description: L.value
			}, {
				actions: _(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: _(() => [...n[17] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : F.value === null ? (m(), u("p", je, " No subdomain status available. ")) : (m(), u(o, { key: 3 }, [F.value.claimed ? (m(), u("dl", Me, [F.value.subdomain ? (m(), u(o, { key: 0 }, [n[18] ||= d("dt", null, "Subdomain", -1), d("dd", null, g(F.value.subdomain), 1)], 64)) : l("", !0), F.value.fqdn ? (m(), u(o, { key: 1 }, [n[19] ||= d("dt", null, "FQDN", -1), d("dd", null, g(F.value.fqdn), 1)], 64)) : l("", !0)])) : l("", !0), d("div", Ne, [F.value.claimed ? (m(), c(r, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: z.value,
				onClick: gt
			}, {
				default: _(() => [...n[21] ||= [f(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (m(), c(r, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: R.value,
				onClick: ht
			}, {
				default: _(() => [...n[20] ||= [f(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : l("", !0)]),
			d("section", Pe, [d("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: n[2] ||= (e) => S("relay")
			}, [d("span", Ie, [n[22] ||= d("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), p(t, {
				name: x.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), d("span", Le, g(_t.value), 1)], 8, Fe), x.value.relay ? (m(), u("div", Re, [H.value ? (m(), u("div", ze, [p(i, {
				variant: "text",
				lines: 2
			})])) : U.value ? (m(), c(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load relay status",
				description: U.value
			}, {
				actions: _(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: J
				}, {
					default: _(() => [...n[23] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : V.value === null ? (m(), u("p", Be, " No relay status available. ")) : (m(), u(o, { key: 3 }, [d("dl", Ve, [
				n[25] ||= d("dt", null, "Status", -1),
				d("dd", null, [p(ne, { tone: V.value.connected ? "success" : "neutral" }, {
					default: _(() => [f(g(V.value.connected ? "Connected" : "Disconnected"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				n[26] ||= d("dt", null, "Active", -1),
				d("dd", null, g(V.value.active ? "Yes" : "No"), 1),
				q.value === null ? l("", !0) : (m(), u(o, { key: 0 }, [n[24] ||= d("dt", null, "Latency", -1), d("dd", null, g(q.value) + "ms", 1)], 64))
			]), d("div", He, [p(r, {
				variant: "outline",
				size: "sm",
				loading: K.value,
				disabled: !V.value.connected,
				onClick: xt
			}, {
				default: _(() => [...n[27] ||= [f(" Ping ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]), V.value.connected ? (m(), c(r, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: G.value,
				disabled: vt.value,
				onClick: bt
			}, {
				default: _(() => [...n[29] ||= [f(" Disable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])) : (m(), c(r, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: W.value,
				disabled: vt.value,
				onClick: yt
			}, {
				default: _(() => [...n[28] ||= [f(" Enable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]))])], 64))])) : l("", !0)]),
			d("section", Ue, [d("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: n[3] ||= (e) => S("portforward")
			}, [d("span", Ge, [n[30] ||= d("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), p(t, {
				name: x.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), d("span", Ke, g(wt.value), 1)], 8, We), x.value.portforward ? (m(), u("div", qe, [St.value ? (m(), u("div", Je, [p(i, {
				variant: "text",
				lines: 3
			})])) : X.value ? (m(), c(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load port-forward status",
				description: X.value
			}, {
				actions: _(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: _(() => [...n[31] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Y.value === null ? (m(), u("p", Ye, " No port-forward status available. ")) : (m(), u(o, { key: 3 }, [
				d("dl", Xe, [
					n[35] ||= d("dt", null, "Enabled", -1),
					d("dd", null, [p(ne, { tone: Y.value.enabled ? "success" : "neutral" }, {
						default: _(() => [f(g(Y.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					Y.value.method ? (m(), u(o, { key: 0 }, [n[32] ||= d("dt", null, "Method", -1), d("dd", null, g(Y.value.method), 1)], 64)) : l("", !0),
					Y.value.externalIp ? (m(), u(o, { key: 1 }, [n[33] ||= d("dt", null, "External IP", -1), d("dd", null, g(Y.value.externalIp), 1)], 64)) : l("", !0),
					Y.value.externalPort ? (m(), u(o, { key: 2 }, [n[34] ||= d("dt", null, "External port", -1), d("dd", null, g(Y.value.externalPort), 1)], 64)) : l("", !0)
				]),
				Ct.value.length > 0 ? (m(), u("div", Ze, [n[36] ||= d("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), d("ul", Qe, [(m(!0), u(o, null, le(Ct.value, (e, t) => (m(), u("li", { key: t }, g(e.hostname), 1))), 128))])])) : l("", !0),
				d("div", $e, [Y.value.enabled ? (m(), c(r, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: Q.value,
					disabled: Tt.value,
					onClick: Dt
				}, {
					default: _(() => [...n[38] ||= [f(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (m(), c(r, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: Z.value,
					disabled: Tt.value,
					onClick: Et
				}, {
					default: _(() => [...n[37] ||= [f(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : l("", !0)]),
			p(re, {
				modelValue: O.value,
				"onUpdate:modelValue": n[6] ||= (e) => O.value = e,
				title: "Initiate Hub Pairing",
				onClose: lt
			}, {
				footer: _(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: lt
				}, {
					default: _(() => [...n[42] ||= [f("Cancel", -1)]]),
					_: 1
				}), A.value ? (m(), c(r, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: N.value,
					onClick: dt
				}, {
					default: _(() => [...n[43] ||= [f(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (m(), c(r, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: M.value,
					disabled: k.value === "",
					onClick: ut
				}, {
					default: _(() => [...n[44] ||= [f(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: _(() => [A.value ? (m(), u("div", et, [n[39] ||= d("p", null, "Enter this claim code on the hub:", -1), d("p", tt, g(A.value), 1)])) : (m(), u("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: fe(ut, ["prevent"])
				}, [d("label", nt, [n[40] ||= d("span", { class: "admin-remote__label" }, "Hub URL", -1), de(d("input", {
					"onUpdate:modelValue": n[4] ||= (e) => k.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[ue, k.value]])]), d("label", rt, [n[41] ||= d("span", { class: "admin-remote__label" }, "Server name", -1), de(d("input", {
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
}), [["__scopeId", "data-v-97621687"]]);
//#endregion
export { v as default };

//# sourceMappingURL=RemoteAccessPage-CRTfYrPz.js.map