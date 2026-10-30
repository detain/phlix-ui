import { l as e, t, y as n } from "./client-CW4dUyY-.js";
import { t as ee } from "./integrations-MWOPBM6E.js";
import { t as te } from "./useToastStore-Bu-iYU7r.js";
import { t as r } from "./Badge-C6LNO9Kk.js";
import { t as ne } from "./PageHint-BlhPmafC.js";
import { t as i } from "./helpLinks-iarZuNmw.js";
import { t as a } from "./Button-1sKEdGjj.js";
import { t as o } from "./Modal-BU4hJGBA.js";
import { t as s } from "./Switch-C1Wv5sN2.js";
import { t as c } from "./Skeleton-B2Mt2L00.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { n as u } from "./Icon-CIbfiPrs.js";
import { Fragment as re, computed as ie, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ae, onBeforeUnmount as oe, onMounted as se, openBlock as v, ref as y, renderList as ce, toDisplayString as b, unref as le, vModelDynamic as ue, vModelText as x, withCtx as S, withDirectives as C, withModifiers as de } from "vue";
// src/pages/admin/IntegrationsPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-integrations",
	"aria-labelledby": "integrations-heading"
}, pe = {
	class: "admin-integrations__section",
	"aria-labelledby": "arr-sync-heading"
}, me = { class: "admin-integrations__section-head" }, he = { class: "admin-integrations__card" }, ge = {
	key: 0,
	class: "admin-integrations__skel"
}, _e = {
	key: 2,
	class: "admin-integrations__empty",
	role: "status"
}, ve = { class: "admin-integrations__dl" }, ye = { class: "admin-integrations__dd" }, be = { class: "admin-integrations__dd" }, xe = { class: "admin-integrations__card-actions" }, Se = {
	class: "admin-integrations__section",
	"aria-labelledby": "auth-providers-heading"
}, Ce = {
	key: 0,
	class: "admin-integrations__skel"
}, we = {
	key: 2,
	class: "admin-integrations__providers"
}, Te = { class: "admin-integrations__provider-info" }, Ee = { class: "admin-integrations__provider-name" }, De = { class: "admin-integrations__provider-actions" }, Oe = { class: "admin-integrations__field" }, ke = { class: "admin-integrations__field" }, Ae = { class: "admin-integrations__field" }, je = { class: "admin-integrations__hint" }, Me = { class: "admin-integrations__password-row" }, Ne = ["type", "placeholder"], Pe = { class: "admin-integrations__field" }, Fe = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, Ie = { class: "admin-integrations__field" }, Le = { class: "admin-integrations__field" }, Re = ["value"], ze = { class: "admin-integrations__field" }, Be = { class: "admin-integrations__field" }, Ve = { class: "admin-integrations__field" }, He = { class: "admin-integrations__hint" }, Ue = { class: "admin-integrations__password-row" }, We = ["type", "placeholder"], Ge = { class: "admin-integrations__field" }, Ke = { class: "admin-integrations__field" }, qe = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, Je = 3e4, w = "openid profile email", T = /*#__PURE__*/ u(/* @__PURE__ */ _({
	__name: "IntegrationsPage",
	props: { client: {} },
	setup(u) {
		let _ = {
			oidc: "OIDC",
			ldap: "LDAP"
		}, T = ["oidc", "ldap"], Ye = u, E = ae("apiBase", ""), Xe = ie(() => typeof E == "string" ? E : E?.value ?? ""), D = new ee(Ye.client ?? new t({
			baseUrl: Xe.value,
			tokenStore: new e()
		})), O = te(), k = y(null), A = y(!0), j = y(null), M = y(!1), N = null;
		function P() {
			N !== null && (clearTimeout(N), N = null);
		}
		async function F() {
			A.value = !0, j.value = null;
			try {
				k.value = await D.getSyncStatus();
			} catch (e) {
				j.value = n(e, "Failed to load sync status."), O.error(j.value);
			} finally {
				A.value = !1;
			}
		}
		async function Ze() {
			if (M.value) return;
			M.value = !0;
			let e = !1;
			P(), N = setTimeout(() => {
				e = !0, M.value = !1, O.error("Sync timed out after 30 seconds. Check the server logs.");
			}, Je);
			try {
				let t = await D.triggerSync();
				if (P(), e) return;
				t.success ? (O.success(t.message || "Sync complete."), await F()) : O.error(t.message || "Sync failed.");
			} catch (t) {
				if (P(), e) return;
				O.error(n(t, "Sync request failed."));
			} finally {
				e || (M.value = !1);
			}
		}
		async function Qe(e) {
			try {
				await D.setSyncEnabled(e), O.success(e ? "Auto-sync enabled." : "Auto-sync disabled."), await F();
			} catch (e) {
				O.error(n(e, "Failed to update sync setting."));
			}
		}
		let $e = y([]), I = y(!0), L = y(null), R = y(null), z = y(null);
		async function B() {
			I.value = !0, L.value = null;
			try {
				$e.value = await D.listProviders();
			} catch (e) {
				L.value = n(e, "Failed to load auth providers."), O.error(L.value);
			} finally {
				I.value = !1;
			}
		}
		function V(e) {
			return $e.value.find((t) => t.name === e)?.live === !0;
		}
		async function et(e, t) {
			try {
				t ? (await D.disableProvider(e), O.success(`${_[e]} disabled.`)) : (await D.enableProvider(e), O.success(`${_[e]} enabled.`)), await B();
			} catch (t) {
				O.error(n(t, `Failed to update ${_[e]}.`));
			}
		}
		let H = y(!1), U = y({
			provider_url: "",
			client_id: "",
			client_secret: "",
			scopes: w
		}), W = y(!1), G = y(""), K = y(!1);
		async function tt() {
			G.value = "", K.value = !1;
			try {
				let e = await D.getOidcSettings();
				R.value = e, U.value = {
					provider_url: e.provider_url ?? "",
					client_id: e.client_id ?? "",
					client_secret: "",
					scopes: e.scopes ?? w
				};
			} catch (e) {
				O.error(n(e, "Failed to load OIDC settings."));
			}
			H.value = !0;
		}
		function nt() {
			H.value = !1, G.value = "";
		}
		async function rt() {
			if (G.value = "", !U.value.provider_url.trim()) G.value = "Provider URL is required.";
			else if (!U.value.client_id.trim()) G.value = "Client ID is required.";
			else {
				W.value = !0;
				try {
					let e = {
						provider_url: U.value.provider_url.trim(),
						client_id: U.value.client_id.trim(),
						scopes: U.value.scopes.trim() || w
					};
					U.value.client_secret.trim() && (e.client_secret = U.value.client_secret), await D.saveOidcSettings(e), O.success("OIDC settings saved."), H.value = !1, R.value = await D.getOidcSettings(), await B();
				} catch (e) {
					G.value = n(e, "Failed to save OIDC settings.");
				} finally {
					W.value = !1;
				}
			}
		}
		let q = y(!1), J = y({
			host: "",
			port: 389,
			ssl: !1,
			base_dn: "",
			bind_dn: "",
			bind_pw: "",
			user_filter: "",
			admin_group: ""
		}), Y = y(!1), X = y(!1), Z = y(""), Q = y(!1);
		async function it() {
			Z.value = "", Q.value = !1;
			try {
				let e = await D.getLdapSettings();
				z.value = e, J.value = {
					host: e.host ?? "",
					port: e.port ?? 389,
					ssl: e.ssl ?? !1,
					base_dn: e.base_dn ?? "",
					bind_dn: e.bind_dn ?? "",
					bind_pw: "",
					user_filter: e.user_filter ?? "",
					admin_group: e.admin_group ?? ""
				};
			} catch (e) {
				O.error(n(e, "Failed to load LDAP settings."));
			}
			q.value = !0;
		}
		function at() {
			q.value = !1, Z.value = "";
		}
		function ot() {
			let e = {
				host: J.value.host.trim(),
				port: J.value.port,
				ssl: J.value.ssl,
				base_dn: J.value.base_dn.trim(),
				bind_dn: J.value.bind_dn.trim(),
				user_filter: J.value.user_filter.trim(),
				admin_group: J.value.admin_group.trim()
			};
			return J.value.bind_pw.trim() && (e.bind_pw = J.value.bind_pw), e;
		}
		async function $() {
			if (Z.value = "", !J.value.host.trim()) Z.value = "Host is required.";
			else if (!J.value.base_dn.trim()) Z.value = "Base DN is required.";
			else {
				Y.value = !0;
				try {
					await D.saveLdapSettings(ot()), O.success("LDAP settings saved."), q.value = !1, z.value = await D.getLdapSettings(), await B();
				} catch (e) {
					Z.value = n(e, "Failed to save LDAP settings.");
				} finally {
					Y.value = !1;
				}
			}
		}
		async function st() {
			X.value = !0;
			try {
				let e = await D.testLdapConnection(ot());
				e.success ? O.success(e.message || "Connection OK.") : O.error(e.message || "Connection failed.");
			} catch (e) {
				O.error(n(e, "LDAP connection test failed."));
			} finally {
				X.value = !1;
			}
		}
		function ct(e) {
			let t = parseInt(e, 10);
			J.value.port = Number.isNaN(t) ? 0 : t;
		}
		function lt(e) {
			e === "oidc" ? tt() : it();
		}
		return se(() => {
			F(), B();
		}), oe(P), (e, t) => (v(), p("section", fe, [
			t[40] ||= m("header", { class: "admin-integrations__head" }, [m("h1", {
				id: "integrations-heading",
				class: "admin-integrations__title"
			}, "Integrations")], -1),
			g(ne, {
				links: le(i).integrations.links,
				details: le(i).integrations.details,
				title: "What’s on this page"
			}, {
				default: S(() => [...t[16] ||= [
					h(" Connect Phlix to outside tools. ", -1),
					m("strong", null, "Arr sync", -1),
					h(" pulls quality-profile settings from TRaSH-Guides for Radarr/Sonarr — ", -1),
					m("strong", null, "Sync now", -1),
					h(" runs it once, and ", -1),
					m("strong", null, "Auto-sync", -1),
					h(" keeps it updated on a schedule. The ", -1),
					m("strong", null, "OIDC", -1),
					h(" and ", -1),
					m("strong", null, "LDAP", -1),
					h(" sections let people sign in with your company's single-sign-on or directory: flip a section's switch to turn that login method on, then use ", -1),
					m("strong", null, "Configure", -1),
					h(" to enter the connection details (provider URL, client ID/secret for OIDC; host, port, base DN, and bind credentials for LDAP). ", -1),
					m("strong", null, "Test connection", -1),
					h(" in the LDAP dialog checks your settings before you ", -1),
					m("strong", null, "Save", -1),
					h(". ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			m("section", pe, [m("div", me, [t[17] ||= m("h2", {
				id: "arr-sync-heading",
				class: "admin-integrations__section-title"
			}, "Arr sync (TRaSH-Guides)", -1), k.value ? (v(), d(r, {
				key: 0,
				tone: k.value.enabled ? "success" : "neutral"
			}, {
				default: S(() => [h(b(k.value.enabled ? "Enabled" : "Disabled"), 1)]),
				_: 1
			}, 8, ["tone"])) : f("", !0)]), m("div", he, [A.value ? (v(), p("div", ge, [g(c, {
				variant: "text",
				lines: 3
			})])) : j.value ? (v(), d(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load sync status",
				description: j.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: F
				}, {
					default: S(() => [...t[18] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : k.value === null ? (v(), p("p", _e, " No sync status available. ")) : (v(), p(re, { key: 3 }, [m("dl", ve, [
				t[19] ||= m("dt", { class: "admin-integrations__dt" }, "Last sync", -1),
				m("dd", ye, b(k.value.last_sync_at ?? "Never synced"), 1),
				t[20] ||= m("dt", { class: "admin-integrations__dt" }, "Auto-sync", -1),
				m("dd", be, [g(s, {
					"model-value": k.value.enabled,
					label: k.value.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": Qe
				}, null, 8, ["model-value", "label"])])
			]), m("div", xe, [g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				loading: M.value,
				onClick: Ze
			}, {
				default: S(() => [h(b(M.value ? "Syncing" : "Sync now"), 1)]),
				_: 1
			}, 8, ["loading"])])], 64))])]),
			m("section", Se, [t[23] ||= m("div", { class: "admin-integrations__section-head" }, [m("h2", {
				id: "auth-providers-heading",
				class: "admin-integrations__section-title"
			}, " Authentication providers ")], -1), I.value ? (v(), p("div", Ce, [g(c, {
				variant: "text",
				lines: 4
			})])) : L.value ? (v(), d(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load auth providers",
				description: L.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: S(() => [...t[21] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (v(), p("div", we, [(v(), p(re, null, ce(T, (e) => m("div", {
				key: e,
				class: "admin-integrations__provider"
			}, [m("div", Te, [m("span", Ee, b(_[e]), 1), g(r, { tone: V(e) ? "success" : "neutral" }, {
				default: S(() => [h(b(V(e) ? "Enabled" : "Disabled"), 1)]),
				_: 2
			}, 1032, ["tone"])]), m("div", De, [g(s, {
				"model-value": V(e),
				label: `Enable ${_[e]}`,
				"onUpdate:modelValue": () => et(e, V(e))
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), g(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "settings",
				"aria-label": `Configure ${_[e]}`,
				onClick: (t) => lt(e)
			}, {
				default: S(() => [...t[22] ||= [h(" Configure ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])), 64))]))]),
			g(o, {
				modelValue: H.value,
				"onUpdate:modelValue": t[5] ||= (e) => H.value = e,
				title: "Configure OIDC",
				onClose: nt
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: nt
				}, {
					default: S(() => [...t[28] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: rt
				}, {
					default: S(() => [...t[29] ||= [h("Save OIDC", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-integrations__form",
					onSubmit: de(rt, ["prevent"])
				}, [
					m("label", Oe, [t[24] ||= m("span", { class: "admin-integrations__label" }, "Provider URL", -1), C(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => U.value.provider_url = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "https://idp.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[x, U.value.provider_url]])]),
					m("label", ke, [t[25] ||= m("span", { class: "admin-integrations__label" }, "Client ID", -1), C(m("input", {
						"onUpdate:modelValue": t[1] ||= (e) => U.value.client_id = e,
						type: "text",
						class: "admin-integrations__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[x, U.value.client_id]])]),
					m("label", Ae, [
						t[26] ||= m("span", { class: "admin-integrations__label" }, "Client secret", -1),
						m("span", je, b(R.value?.configured ? "Leave blank to keep the current secret." : "Required when configuring for the first time."), 1),
						m("div", Me, [C(m("input", {
							"onUpdate:modelValue": t[2] ||= (e) => U.value.client_secret = e,
							type: K.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: R.value?.configured ? "(unchanged)" : "Client secret",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other"
						}, null, 8, Ne), [[ue, U.value.client_secret]]), g(a, {
							variant: "ghost",
							size: "sm",
							"left-icon": K.value ? "eye-off" : "eye",
							"aria-label": K.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => K.value = !K.value
						}, {
							default: S(() => [h(b(K.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					m("label", Pe, [t[27] ||= m("span", { class: "admin-integrations__label" }, "Scopes", -1), C(m("input", {
						"onUpdate:modelValue": t[4] ||= (e) => U.value.scopes = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "openid profile email",
						autocomplete: "off"
					}, null, 512), [[x, U.value.scopes]])]),
					G.value ? (v(), p("p", Fe, b(G.value), 1)) : f("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(o, {
				modelValue: q.value,
				"onUpdate:modelValue": t[15] ||= (e) => q.value = e,
				title: "Configure LDAP",
				size: "lg",
				onClose: at
			}, {
				footer: S(() => [
					g(a, {
						variant: "ghost",
						size: "sm",
						onClick: at
					}, {
						default: S(() => [...t[37] ||= [h("Cancel", -1)]]),
						_: 1
					}),
					g(a, {
						variant: "outline",
						size: "sm",
						"left-icon": "settings",
						loading: X.value,
						disabled: Y.value,
						onClick: st
					}, {
						default: S(() => [...t[38] ||= [h(" Test connection ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"]),
					g(a, {
						variant: "solid",
						size: "sm",
						loading: Y.value,
						disabled: X.value,
						onClick: $
					}, {
						default: S(() => [...t[39] ||= [h(" Save LDAP ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"])
				]),
				default: S(() => [m("form", {
					class: "admin-integrations__form",
					onSubmit: de($, ["prevent"])
				}, [
					m("label", Ie, [t[30] ||= m("span", { class: "admin-integrations__label" }, "Host", -1), C(m("input", {
						"onUpdate:modelValue": t[6] ||= (e) => J.value.host = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "ldap.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[x, J.value.host]])]),
					m("label", Le, [t[31] ||= m("span", { class: "admin-integrations__label" }, "Port", -1), m("input", {
						value: J.value.port,
						type: "number",
						min: "1",
						max: "65535",
						class: "admin-integrations__input",
						autocomplete: "off",
						onInput: t[7] ||= (e) => ct(e.target.value)
					}, null, 40, Re)]),
					g(s, {
						modelValue: J.value.ssl,
						"onUpdate:modelValue": t[8] ||= (e) => J.value.ssl = e,
						label: "Use SSL"
					}, null, 8, ["modelValue"]),
					m("label", ze, [t[32] ||= m("span", { class: "admin-integrations__label" }, "Base DN", -1), C(m("input", {
						"onUpdate:modelValue": t[9] ||= (e) => J.value.base_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "dc=example,dc=com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[x, J.value.base_dn]])]),
					m("label", Be, [t[33] ||= m("span", { class: "admin-integrations__label" }, "Bind DN", -1), C(m("input", {
						"onUpdate:modelValue": t[10] ||= (e) => J.value.bind_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admin,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[x, J.value.bind_dn]])]),
					m("label", Ve, [
						t[34] ||= m("span", { class: "admin-integrations__label" }, "Bind password", -1),
						m("span", He, b(z.value?.configured ? "Leave blank to keep the current password." : "Required when configuring for the first time."), 1),
						m("div", Ue, [C(m("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value.bind_pw = e,
							type: Q.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: z.value?.configured ? "(unchanged)" : "Bind password",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other"
						}, null, 8, We), [[ue, J.value.bind_pw]]), g(a, {
							variant: "ghost",
							size: "sm",
							"left-icon": Q.value ? "eye-off" : "eye",
							"aria-label": Q.value ? "Hide password" : "Show password",
							onClick: t[12] ||= (e) => Q.value = !Q.value
						}, {
							default: S(() => [h(b(Q.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					m("label", Ge, [t[35] ||= m("span", { class: "admin-integrations__label" }, "User filter", -1), C(m("input", {
						"onUpdate:modelValue": t[13] ||= (e) => J.value.user_filter = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "(uid=%s)",
						autocomplete: "off"
					}, null, 512), [[x, J.value.user_filter]])]),
					m("label", Ke, [t[36] ||= m("span", { class: "admin-integrations__label" }, "Admin group DN", -1), C(m("input", {
						"onUpdate:modelValue": t[14] ||= (e) => J.value.admin_group = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admins,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[x, J.value.admin_group]])]),
					Z.value ? (v(), p("p", qe, b(Z.value), 1)) : f("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-42159b96"]]);
export { T as default };

//# sourceMappingURL=IntegrationsPage-nUhOIxzw.js.map