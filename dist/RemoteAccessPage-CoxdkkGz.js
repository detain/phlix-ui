import { a as e, d as t, i as ee, m as n, n as r, p as i, r as te, t as a } from "./Button-DjEQ9y17.js";
import { t as ne } from "./Modal-BkSAbwHm.js";
import { t as re } from "./Badge-DobVc76J.js";
import { t as ie } from "./remoteAccess-DVKRpKQ8.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as ae, inject as oe, onMounted as se, openBlock as m, ref as h, renderList as ce, toDisplayString as g, vModelText as le, withCtx as _, withDirectives as ue, withModifiers as de } from "vue";
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
	key: 1,
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
	key: 1,
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
	key: 1,
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
	key: 1,
	class: "admin-remote__empty",
	role: "status"
}, Ye = { class: "admin-remote__dl" }, Xe = {
	key: 0,
	class: "admin-remote__candidates"
}, Ze = { class: "admin-remote__candidates-list" }, Qe = { class: "admin-remote__actions" }, $e = {
	key: 0,
	class: "admin-remote__claim"
}, et = { class: "admin-remote__claim-code" }, tt = { class: "admin-remote__field" }, nt = { class: "admin-remote__field" }, v = /*#__PURE__*/ n(/* @__PURE__ */ ae({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(n) {
		let ae = n, v = oe("apiBase", ""), rt = s(() => typeof v == "string" ? v : v?.value ?? ""), y = new ie(ae.client ?? new e({
			baseUrl: rt.value,
			tokenStore: new ee()
		})), b = te();
		function it(e) {
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
		let C = h(null), w = h(!0), T = h(!1), E = h(!1), D = h(!1), O = h(""), k = h("Phlix Server"), A = h(null), j = h(null), M = h(!1), N = h(!1), at = s(() => w.value ? "Loading…" : C.value === null ? "Unable to load" : C.value.paired ? `Paired${C.value.serverId ? ` (${C.value.serverId})` : ""}` : "Not paired");
		async function P() {
			try {
				C.value = await y.hubStatus();
			} catch (e) {
				b.error(t(e, "Failed to load hub status."));
			} finally {
				w.value = !1;
			}
		}
		function ot() {
			D.value = !0;
		}
		function F() {
			D.value = !1, A.value = null, j.value = null;
		}
		async function st() {
			if (!M.value) {
				if (O.value === "") {
					b.error("Hub URL is required.");
					return;
				}
				M.value = !0;
				try {
					let e = await y.hubPair(O.value, k.value);
					e.success && (A.value = e.claimCode ?? null, j.value = e.claimId ?? null, b.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					b.error(t(e, "Failed to initiate pairing."));
				} finally {
					M.value = !1;
				}
			}
		}
		async function ct() {
			if (!(j.value === null || O.value === "") && !N.value) {
				N.value = !0;
				try {
					let e = await y.hubPoll(j.value, O.value);
					e.success && e.token ? (await y.hubComplete(e.token, "", e.serverId ?? "", O.value), b.success("Hub paired successfully."), F(), await P()) : !e.success && e.message && b.error(e.message);
				} catch (e) {
					b.error(t(e, "Failed to poll pairing status."));
				} finally {
					N.value = !1;
				}
			}
		}
		async function lt() {
			if (!T.value) {
				T.value = !0;
				try {
					await y.hubUnenroll(), b.success("Hub unenrolled."), await P();
				} catch (e) {
					b.error(t(e, "Failed to unenroll."));
				} finally {
					T.value = !1;
				}
			}
		}
		async function ut() {
			if (!E.value) {
				E.value = !0;
				try {
					(await y.hubHeartbeat()).success && b.success("Heartbeat sent.");
				} catch (e) {
					b.error(t(e, "Failed to send heartbeat."));
				} finally {
					E.value = !1;
				}
			}
		}
		let I = h(null), L = h(!0), R = h(!1), z = h(!1), dt = s(() => L.value ? "Loading…" : I.value === null ? "Unable to load" : I.value.claimed ? `Claimed${I.value.subdomain ? ` (${I.value.subdomain})` : ""}` : "Not claimed");
		async function B() {
			try {
				I.value = await y.subdomainStatus();
			} catch (e) {
				b.error(t(e, "Failed to load subdomain status."));
			} finally {
				L.value = !1;
			}
		}
		async function ft() {
			if (!R.value) {
				R.value = !0;
				try {
					await y.subdomainClaim(), b.success("Subdomain claimed."), await B();
				} catch (e) {
					b.error(t(e, "Failed to claim subdomain."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function pt() {
			if (!z.value) {
				z.value = !0;
				try {
					await y.subdomainRelease(), b.success("Subdomain released."), await B();
				} catch (e) {
					b.error(t(e, "Failed to release subdomain."));
				} finally {
					z.value = !1;
				}
			}
		}
		let V = h(null), H = h(!0), U = h(!1), W = h(!1), G = h(!1), K = h(null), mt = s(() => H.value ? "Loading…" : V.value === null ? "Unable to load" : V.value.connected ? `Connected${K.value === null ? "" : ` (${K.value}ms latency)`}` : "Disconnected"), ht = s(() => U.value || W.value);
		async function q() {
			try {
				V.value = await y.relayStatus(), K.value = null;
			} catch (e) {
				b.error(t(e, "Failed to load relay status."));
			} finally {
				H.value = !1;
			}
		}
		async function gt() {
			if (!U.value) {
				U.value = !0;
				try {
					await y.relayEnable(), b.success("Relay enabled."), await q();
				} catch (e) {
					b.error(t(e, "Failed to enable relay."));
				} finally {
					U.value = !1;
				}
			}
		}
		async function _t() {
			if (!W.value) {
				W.value = !0;
				try {
					await y.relayDisable(), b.success("Relay disabled."), await q();
				} catch (e) {
					b.error(t(e, "Failed to disable relay."));
				} finally {
					W.value = !1;
				}
			}
		}
		async function vt() {
			if (!G.value) {
				G.value = !0;
				try {
					let e = await y.relayPing();
					K.value = e.latencyMs, b.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					b.error(t(e, "Failed to ping relay."));
				} finally {
					G.value = !1;
				}
			}
		}
		let J = h(null), Y = h(!0), X = h(!1), Z = h(!1), Q = h([]), yt = s(() => Y.value ? "Loading…" : J.value === null ? "Unable to load" : J.value.enabled ? J.value.externalIp ? `Enabled (${J.value.externalIp}:${J.value.externalPort})` : "Enabled" : "Disabled"), bt = s(() => X.value || Z.value);
		async function $() {
			try {
				let [e, t] = await Promise.all([y.portForwardStatus(), y.portForwardCandidates()]);
				J.value = e, Q.value = t.candidates;
			} catch (e) {
				b.error(t(e, "Failed to load port-forward status."));
			} finally {
				Y.value = !1;
			}
		}
		async function xt() {
			if (!X.value) {
				X.value = !0;
				try {
					await y.portForwardEnable(), b.success("Port forwarding enabled."), await $();
				} catch (e) {
					b.error(t(e, "Failed to enable port forwarding."));
				} finally {
					X.value = !1;
				}
			}
		}
		async function St() {
			if (!Z.value) {
				Z.value = !0;
				try {
					await y.portForwardDisable(), b.success("Port forwarding disabled."), await $();
				} catch (e) {
					b.error(t(e, "Failed to disable port forwarding."));
				} finally {
					Z.value = !1;
				}
			}
		}
		return se(() => {
			P(), B(), q(), $();
		}), (e, t) => (m(), u("section", fe, [
			d("header", pe, [d("h1", me, [p(i, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), t[7] ||= f(" Remote Access ", -1)])]),
			d("section", he, [d("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: t[0] ||= (e) => S("hub")
			}, [d("span", _e, [t[8] ||= d("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), p(i, {
				name: x.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), d("span", ve, g(at.value), 1)], 8, ge), x.value.hub ? (m(), u("div", ye, [w.value ? (m(), u("div", be, [p(r, {
				variant: "text",
				lines: 3
			})])) : C.value === null ? (m(), u("p", xe, " Unable to load hub status. ")) : (m(), u(o, { key: 2 }, [C.value.paired ? (m(), u("dl", Se, [
				C.value.serverId ? (m(), u(o, { key: 0 }, [t[9] ||= d("dt", null, "Server ID", -1), d("dd", null, g(C.value.serverId), 1)], 64)) : l("", !0),
				C.value.hubUrl ? (m(), u(o, { key: 1 }, [t[10] ||= d("dt", null, "Hub URL", -1), d("dd", null, g(C.value.hubUrl), 1)], 64)) : l("", !0),
				C.value.enrolledAt ? (m(), u(o, { key: 2 }, [t[11] ||= d("dt", null, "Enrolled at", -1), d("dd", null, g(it(C.value.enrolledAt)), 1)], 64)) : l("", !0)
			])) : l("", !0), d("div", Ce, [C.value.paired ? (m(), u(o, { key: 1 }, [p(a, {
				variant: "outline",
				size: "sm",
				loading: E.value,
				onClick: ut
			}, {
				default: _(() => [...t[13] ||= [f(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), p(a, {
				variant: "ghost",
				size: "sm",
				loading: T.value,
				onClick: lt
			}, {
				default: _(() => [...t[14] ||= [f(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (m(), c(a, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: ot
			}, {
				default: _(() => [...t[12] ||= [f(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : l("", !0)]),
			d("section", we, [d("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: t[1] ||= (e) => S("subdomain")
			}, [d("span", Ee, [t[15] ||= d("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), p(i, {
				name: x.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), d("span", De, g(dt.value), 1)], 8, Te), x.value.subdomain ? (m(), u("div", Oe, [L.value ? (m(), u("div", ke, [p(r, {
				variant: "text",
				lines: 2
			})])) : I.value === null ? (m(), u("p", Ae, " Unable to load subdomain status. ")) : (m(), u(o, { key: 2 }, [I.value.claimed ? (m(), u("dl", je, [I.value.subdomain ? (m(), u(o, { key: 0 }, [t[16] ||= d("dt", null, "Subdomain", -1), d("dd", null, g(I.value.subdomain), 1)], 64)) : l("", !0), I.value.fqdn ? (m(), u(o, { key: 1 }, [t[17] ||= d("dt", null, "FQDN", -1), d("dd", null, g(I.value.fqdn), 1)], 64)) : l("", !0)])) : l("", !0), d("div", Me, [I.value.claimed ? (m(), c(a, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: z.value,
				onClick: pt
			}, {
				default: _(() => [...t[19] ||= [f(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (m(), c(a, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: R.value,
				onClick: ft
			}, {
				default: _(() => [...t[18] ||= [f(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : l("", !0)]),
			d("section", Ne, [d("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: t[2] ||= (e) => S("relay")
			}, [d("span", Fe, [t[20] ||= d("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), p(i, {
				name: x.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), d("span", Ie, g(mt.value), 1)], 8, Pe), x.value.relay ? (m(), u("div", Le, [H.value ? (m(), u("div", Re, [p(r, {
				variant: "text",
				lines: 2
			})])) : V.value === null ? (m(), u("p", ze, " Unable to load relay status. ")) : (m(), u(o, { key: 2 }, [d("dl", Be, [
				t[22] ||= d("dt", null, "Status", -1),
				d("dd", null, [p(re, { tone: V.value.connected ? "success" : "neutral" }, {
					default: _(() => [f(g(V.value.connected ? "Connected" : "Disconnected"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				t[23] ||= d("dt", null, "Active", -1),
				d("dd", null, g(V.value.active ? "Yes" : "No"), 1),
				K.value === null ? l("", !0) : (m(), u(o, { key: 0 }, [t[21] ||= d("dt", null, "Latency", -1), d("dd", null, g(K.value) + "ms", 1)], 64))
			]), d("div", Ve, [p(a, {
				variant: "outline",
				size: "sm",
				loading: G.value,
				disabled: !V.value.connected,
				onClick: vt
			}, {
				default: _(() => [...t[24] ||= [f(" Ping ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]), V.value.connected ? (m(), c(a, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: W.value,
				disabled: ht.value,
				onClick: _t
			}, {
				default: _(() => [...t[26] ||= [f(" Disable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])) : (m(), c(a, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: U.value,
				disabled: ht.value,
				onClick: gt
			}, {
				default: _(() => [...t[25] ||= [f(" Enable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]))])], 64))])) : l("", !0)]),
			d("section", He, [d("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: t[3] ||= (e) => S("portforward")
			}, [d("span", We, [t[27] ||= d("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), p(i, {
				name: x.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), d("span", Ge, g(yt.value), 1)], 8, Ue), x.value.portforward ? (m(), u("div", Ke, [Y.value ? (m(), u("div", qe, [p(r, {
				variant: "text",
				lines: 3
			})])) : J.value === null ? (m(), u("p", Je, " Unable to load port-forward status. ")) : (m(), u(o, { key: 2 }, [
				d("dl", Ye, [
					t[31] ||= d("dt", null, "Enabled", -1),
					d("dd", null, [p(re, { tone: J.value.enabled ? "success" : "neutral" }, {
						default: _(() => [f(g(J.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					J.value.method ? (m(), u(o, { key: 0 }, [t[28] ||= d("dt", null, "Method", -1), d("dd", null, g(J.value.method), 1)], 64)) : l("", !0),
					J.value.externalIp ? (m(), u(o, { key: 1 }, [t[29] ||= d("dt", null, "External IP", -1), d("dd", null, g(J.value.externalIp), 1)], 64)) : l("", !0),
					J.value.externalPort ? (m(), u(o, { key: 2 }, [t[30] ||= d("dt", null, "External port", -1), d("dd", null, g(J.value.externalPort), 1)], 64)) : l("", !0)
				]),
				Q.value.length > 0 ? (m(), u("div", Xe, [t[32] ||= d("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), d("ul", Ze, [(m(!0), u(o, null, ce(Q.value, (e, t) => (m(), u("li", { key: t }, g(e.hostname), 1))), 128))])])) : l("", !0),
				d("div", Qe, [J.value.enabled ? (m(), c(a, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: Z.value,
					disabled: bt.value,
					onClick: St
				}, {
					default: _(() => [...t[34] ||= [f(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (m(), c(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: X.value,
					disabled: bt.value,
					onClick: xt
				}, {
					default: _(() => [...t[33] ||= [f(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : l("", !0)]),
			p(ne, {
				modelValue: D.value,
				"onUpdate:modelValue": t[6] ||= (e) => D.value = e,
				title: "Initiate Hub Pairing",
				onClose: F
			}, {
				footer: _(() => [p(a, {
					variant: "ghost",
					size: "sm",
					onClick: F
				}, {
					default: _(() => [...t[38] ||= [f("Cancel", -1)]]),
					_: 1
				}), A.value ? (m(), c(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: N.value,
					onClick: ct
				}, {
					default: _(() => [...t[39] ||= [f(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (m(), c(a, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: M.value,
					disabled: O.value === "",
					onClick: st
				}, {
					default: _(() => [...t[40] ||= [f(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: _(() => [A.value ? (m(), u("div", $e, [t[35] ||= d("p", null, "Enter this claim code on the hub:", -1), d("p", et, g(A.value), 1)])) : (m(), u("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: de(st, ["prevent"])
				}, [d("label", tt, [t[36] ||= d("span", { class: "admin-remote__label" }, "Hub URL", -1), ue(d("input", {
					"onUpdate:modelValue": t[4] ||= (e) => O.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[le, O.value]])]), d("label", nt, [t[37] ||= d("span", { class: "admin-remote__label" }, "Server name", -1), ue(d("input", {
					"onUpdate:modelValue": t[5] ||= (e) => k.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[le, k.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-d15d10ac"]]);
//#endregion
export { v as default };

//# sourceMappingURL=RemoteAccessPage-CoxdkkGz.js.map