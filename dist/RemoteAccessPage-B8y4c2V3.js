import { a as e, i as t, m as ee, n, p as r, r as te, t as i } from "./Button-DjEQ9y17.js";
import { t as ne } from "./Modal-BkSAbwHm.js";
import { t as re } from "./Badge-DobVc76J.js";
import { t as ie } from "./remoteAccess-DVKRpKQ8.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as ae, inject as oe, onMounted as se, openBlock as p, ref as m, renderList as ce, toDisplayString as h, vModelText as le, withCtx as g, withDirectives as ue, withModifiers as de } from "vue";
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
}, et = { class: "admin-remote__claim-code" }, tt = { class: "admin-remote__field" }, nt = { class: "admin-remote__field" }, _ = /*#__PURE__*/ ee(/* @__PURE__ */ ae({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(ee) {
		let ae = ee, _ = oe("apiBase", ""), rt = o(() => typeof _ == "string" ? _ : _?.value ?? ""), v = new ie(ae.client ?? new e({
			baseUrl: rt.value,
			tokenStore: new t()
		})), y = te();
		function b(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function it(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
		}
		let x = m({
			hub: !0,
			subdomain: !1,
			relay: !1,
			portforward: !1
		});
		function S(e) {
			x.value[e] = !x.value[e];
		}
		let C = m(null), w = m(!0), T = m(!1), E = m(!1), D = m(!1), O = m(""), k = m("Phlix Server"), A = m(null), j = m(null), M = m(!1), N = m(!1), at = o(() => w.value ? "Loading…" : C.value === null ? "Unable to load" : C.value.paired ? `Paired${C.value.serverId ? ` (${C.value.serverId})` : ""}` : "Not paired");
		async function P() {
			try {
				C.value = await v.hubStatus();
			} catch (e) {
				y.error(b(e, "Failed to load hub status."));
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
					y.error("Hub URL is required.");
					return;
				}
				M.value = !0;
				try {
					let e = await v.hubPair(O.value, k.value);
					e.success && (A.value = e.claimCode ?? null, j.value = e.claimId ?? null, y.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					y.error(b(e, "Failed to initiate pairing."));
				} finally {
					M.value = !1;
				}
			}
		}
		async function ct() {
			if (!(j.value === null || O.value === "") && !N.value) {
				N.value = !0;
				try {
					let e = await v.hubPoll(j.value, O.value);
					e.success && e.token ? (await v.hubComplete(e.token, "", e.serverId ?? "", O.value), y.success("Hub paired successfully."), F(), await P()) : !e.success && e.message && y.error(e.message);
				} catch (e) {
					y.error(b(e, "Failed to poll pairing status."));
				} finally {
					N.value = !1;
				}
			}
		}
		async function lt() {
			if (!T.value) {
				T.value = !0;
				try {
					await v.hubUnenroll(), y.success("Hub unenrolled."), await P();
				} catch (e) {
					y.error(b(e, "Failed to unenroll."));
				} finally {
					T.value = !1;
				}
			}
		}
		async function ut() {
			if (!E.value) {
				E.value = !0;
				try {
					(await v.hubHeartbeat()).success && y.success("Heartbeat sent.");
				} catch (e) {
					y.error(b(e, "Failed to send heartbeat."));
				} finally {
					E.value = !1;
				}
			}
		}
		let I = m(null), L = m(!0), R = m(!1), z = m(!1), dt = o(() => L.value ? "Loading…" : I.value === null ? "Unable to load" : I.value.claimed ? `Claimed${I.value.subdomain ? ` (${I.value.subdomain})` : ""}` : "Not claimed");
		async function B() {
			try {
				I.value = await v.subdomainStatus();
			} catch (e) {
				y.error(b(e, "Failed to load subdomain status."));
			} finally {
				L.value = !1;
			}
		}
		async function ft() {
			if (!R.value) {
				R.value = !0;
				try {
					await v.subdomainClaim(), y.success("Subdomain claimed."), await B();
				} catch (e) {
					y.error(b(e, "Failed to claim subdomain."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function pt() {
			if (!z.value) {
				z.value = !0;
				try {
					await v.subdomainRelease(), y.success("Subdomain released."), await B();
				} catch (e) {
					y.error(b(e, "Failed to release subdomain."));
				} finally {
					z.value = !1;
				}
			}
		}
		let V = m(null), H = m(!0), U = m(!1), W = m(!1), G = m(!1), K = m(null), mt = o(() => H.value ? "Loading…" : V.value === null ? "Unable to load" : V.value.connected ? `Connected${K.value === null ? "" : ` (${K.value}ms latency)`}` : "Disconnected"), ht = o(() => U.value || W.value);
		async function q() {
			try {
				V.value = await v.relayStatus(), K.value = null;
			} catch (e) {
				y.error(b(e, "Failed to load relay status."));
			} finally {
				H.value = !1;
			}
		}
		async function gt() {
			if (!U.value) {
				U.value = !0;
				try {
					await v.relayEnable(), y.success("Relay enabled."), await q();
				} catch (e) {
					y.error(b(e, "Failed to enable relay."));
				} finally {
					U.value = !1;
				}
			}
		}
		async function _t() {
			if (!W.value) {
				W.value = !0;
				try {
					await v.relayDisable(), y.success("Relay disabled."), await q();
				} catch (e) {
					y.error(b(e, "Failed to disable relay."));
				} finally {
					W.value = !1;
				}
			}
		}
		async function vt() {
			if (!G.value) {
				G.value = !0;
				try {
					let e = await v.relayPing();
					K.value = e.latencyMs, y.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					y.error(b(e, "Failed to ping relay."));
				} finally {
					G.value = !1;
				}
			}
		}
		let J = m(null), Y = m(!0), X = m(!1), Z = m(!1), Q = m([]), yt = o(() => Y.value ? "Loading…" : J.value === null ? "Unable to load" : J.value.enabled ? J.value.externalIp ? `Enabled (${J.value.externalIp}:${J.value.externalPort})` : "Enabled" : "Disabled"), bt = o(() => X.value || Z.value);
		async function $() {
			try {
				let [e, t] = await Promise.all([v.portForwardStatus(), v.portForwardCandidates()]);
				J.value = e, Q.value = t.candidates;
			} catch (e) {
				y.error(b(e, "Failed to load port-forward status."));
			} finally {
				Y.value = !1;
			}
		}
		async function xt() {
			if (!X.value) {
				X.value = !0;
				try {
					await v.portForwardEnable(), y.success("Port forwarding enabled."), await $();
				} catch (e) {
					y.error(b(e, "Failed to enable port forwarding."));
				} finally {
					X.value = !1;
				}
			}
		}
		async function St() {
			if (!Z.value) {
				Z.value = !0;
				try {
					await v.portForwardDisable(), y.success("Port forwarding disabled."), await $();
				} catch (e) {
					y.error(b(e, "Failed to disable port forwarding."));
				} finally {
					Z.value = !1;
				}
			}
		}
		return se(() => {
			P(), B(), q(), $();
		}), (e, t) => (p(), l("section", fe, [
			u("header", pe, [u("h1", me, [f(r, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), t[7] ||= d(" Remote Access ", -1)])]),
			u("section", he, [u("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: t[0] ||= (e) => S("hub")
			}, [u("span", _e, [t[8] ||= u("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), f(r, {
				name: x.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), u("span", ve, h(at.value), 1)], 8, ge), x.value.hub ? (p(), l("div", ye, [w.value ? (p(), l("div", be, [f(n, {
				variant: "text",
				lines: 3
			})])) : C.value === null ? (p(), l("p", xe, " Unable to load hub status. ")) : (p(), l(a, { key: 2 }, [C.value.paired ? (p(), l("dl", Se, [
				C.value.serverId ? (p(), l(a, { key: 0 }, [t[9] ||= u("dt", null, "Server ID", -1), u("dd", null, h(C.value.serverId), 1)], 64)) : c("", !0),
				C.value.hubUrl ? (p(), l(a, { key: 1 }, [t[10] ||= u("dt", null, "Hub URL", -1), u("dd", null, h(C.value.hubUrl), 1)], 64)) : c("", !0),
				C.value.enrolledAt ? (p(), l(a, { key: 2 }, [t[11] ||= u("dt", null, "Enrolled at", -1), u("dd", null, h(it(C.value.enrolledAt)), 1)], 64)) : c("", !0)
			])) : c("", !0), u("div", Ce, [C.value.paired ? (p(), l(a, { key: 1 }, [f(i, {
				variant: "outline",
				size: "sm",
				loading: E.value,
				onClick: ut
			}, {
				default: g(() => [...t[13] ||= [d(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), f(i, {
				variant: "ghost",
				size: "sm",
				loading: T.value,
				onClick: lt
			}, {
				default: g(() => [...t[14] ||= [d(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (p(), s(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: ot
			}, {
				default: g(() => [...t[12] ||= [d(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : c("", !0)]),
			u("section", we, [u("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: t[1] ||= (e) => S("subdomain")
			}, [u("span", Ee, [t[15] ||= u("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), f(r, {
				name: x.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), u("span", De, h(dt.value), 1)], 8, Te), x.value.subdomain ? (p(), l("div", Oe, [L.value ? (p(), l("div", ke, [f(n, {
				variant: "text",
				lines: 2
			})])) : I.value === null ? (p(), l("p", Ae, " Unable to load subdomain status. ")) : (p(), l(a, { key: 2 }, [I.value.claimed ? (p(), l("dl", je, [I.value.subdomain ? (p(), l(a, { key: 0 }, [t[16] ||= u("dt", null, "Subdomain", -1), u("dd", null, h(I.value.subdomain), 1)], 64)) : c("", !0), I.value.fqdn ? (p(), l(a, { key: 1 }, [t[17] ||= u("dt", null, "FQDN", -1), u("dd", null, h(I.value.fqdn), 1)], 64)) : c("", !0)])) : c("", !0), u("div", Me, [I.value.claimed ? (p(), s(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: z.value,
				onClick: pt
			}, {
				default: g(() => [...t[19] ||= [d(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (p(), s(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: R.value,
				onClick: ft
			}, {
				default: g(() => [...t[18] ||= [d(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : c("", !0)]),
			u("section", Ne, [u("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: t[2] ||= (e) => S("relay")
			}, [u("span", Fe, [t[20] ||= u("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), f(r, {
				name: x.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), u("span", Ie, h(mt.value), 1)], 8, Pe), x.value.relay ? (p(), l("div", Le, [H.value ? (p(), l("div", Re, [f(n, {
				variant: "text",
				lines: 2
			})])) : V.value === null ? (p(), l("p", ze, " Unable to load relay status. ")) : (p(), l(a, { key: 2 }, [u("dl", Be, [
				t[22] ||= u("dt", null, "Status", -1),
				u("dd", null, [f(re, { tone: V.value.connected ? "success" : "neutral" }, {
					default: g(() => [d(h(V.value.connected ? "Connected" : "Disconnected"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				t[23] ||= u("dt", null, "Active", -1),
				u("dd", null, h(V.value.active ? "Yes" : "No"), 1),
				K.value === null ? c("", !0) : (p(), l(a, { key: 0 }, [t[21] ||= u("dt", null, "Latency", -1), u("dd", null, h(K.value) + "ms", 1)], 64))
			]), u("div", Ve, [f(i, {
				variant: "outline",
				size: "sm",
				loading: G.value,
				disabled: !V.value.connected,
				onClick: vt
			}, {
				default: g(() => [...t[24] ||= [d(" Ping ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]), V.value.connected ? (p(), s(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: W.value,
				disabled: ht.value,
				onClick: _t
			}, {
				default: g(() => [...t[26] ||= [d(" Disable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])) : (p(), s(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: U.value,
				disabled: ht.value,
				onClick: gt
			}, {
				default: g(() => [...t[25] ||= [d(" Enable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]))])], 64))])) : c("", !0)]),
			u("section", He, [u("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": x.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: t[3] ||= (e) => S("portforward")
			}, [u("span", We, [t[27] ||= u("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), f(r, {
				name: x.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), u("span", Ge, h(yt.value), 1)], 8, Ue), x.value.portforward ? (p(), l("div", Ke, [Y.value ? (p(), l("div", qe, [f(n, {
				variant: "text",
				lines: 3
			})])) : J.value === null ? (p(), l("p", Je, " Unable to load port-forward status. ")) : (p(), l(a, { key: 2 }, [
				u("dl", Ye, [
					t[31] ||= u("dt", null, "Enabled", -1),
					u("dd", null, [f(re, { tone: J.value.enabled ? "success" : "neutral" }, {
						default: g(() => [d(h(J.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					J.value.method ? (p(), l(a, { key: 0 }, [t[28] ||= u("dt", null, "Method", -1), u("dd", null, h(J.value.method), 1)], 64)) : c("", !0),
					J.value.externalIp ? (p(), l(a, { key: 1 }, [t[29] ||= u("dt", null, "External IP", -1), u("dd", null, h(J.value.externalIp), 1)], 64)) : c("", !0),
					J.value.externalPort ? (p(), l(a, { key: 2 }, [t[30] ||= u("dt", null, "External port", -1), u("dd", null, h(J.value.externalPort), 1)], 64)) : c("", !0)
				]),
				Q.value.length > 0 ? (p(), l("div", Xe, [t[32] ||= u("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), u("ul", Ze, [(p(!0), l(a, null, ce(Q.value, (e, t) => (p(), l("li", { key: t }, h(e.hostname), 1))), 128))])])) : c("", !0),
				u("div", Qe, [J.value.enabled ? (p(), s(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: Z.value,
					disabled: bt.value,
					onClick: St
				}, {
					default: g(() => [...t[34] ||= [d(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (p(), s(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: X.value,
					disabled: bt.value,
					onClick: xt
				}, {
					default: g(() => [...t[33] ||= [d(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : c("", !0)]),
			f(ne, {
				modelValue: D.value,
				"onUpdate:modelValue": t[6] ||= (e) => D.value = e,
				title: "Initiate Hub Pairing",
				onClose: F
			}, {
				footer: g(() => [f(i, {
					variant: "ghost",
					size: "sm",
					onClick: F
				}, {
					default: g(() => [...t[38] ||= [d("Cancel", -1)]]),
					_: 1
				}), A.value ? (p(), s(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: N.value,
					onClick: ct
				}, {
					default: g(() => [...t[39] ||= [d(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (p(), s(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: M.value,
					disabled: O.value === "",
					onClick: st
				}, {
					default: g(() => [...t[40] ||= [d(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: g(() => [A.value ? (p(), l("div", $e, [t[35] ||= u("p", null, "Enter this claim code on the hub:", -1), u("p", et, h(A.value), 1)])) : (p(), l("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: de(st, ["prevent"])
				}, [u("label", tt, [t[36] ||= u("span", { class: "admin-remote__label" }, "Hub URL", -1), ue(u("input", {
					"onUpdate:modelValue": t[4] ||= (e) => O.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[le, O.value]])]), u("label", nt, [t[37] ||= u("span", { class: "admin-remote__label" }, "Server name", -1), ue(u("input", {
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
}), [["__scopeId", "data-v-0f6d3051"]]);
//#endregion
export { _ as default };

//# sourceMappingURL=RemoteAccessPage-B8y4c2V3.js.map