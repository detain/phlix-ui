import { a as e, d as t, i as n, m as r, n as i, r as ee, t as a } from "./Button-DjEQ9y17.js";
import { t as o } from "./Modal-BkSAbwHm.js";
import { t as s } from "./Badge-DobVc76J.js";
import { t as c } from "./Switch-BNdBMUaS.js";
import { t as te } from "./integrations-DLAG9ISY.js";
import { Fragment as l, computed as ne, createBlock as re, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as g, ref as _, renderList as se, toDisplayString as v, vModelDynamic as y, vModelText as b, withCtx as x, withDirectives as S, withModifiers as C } from "vue";
//#region src/pages/admin/IntegrationsPage.vue?vue&type=script&setup=true&lang.ts
var ce = {
	class: "admin-integrations",
	"aria-labelledby": "integrations-heading"
}, le = {
	class: "admin-integrations__section",
	"aria-labelledby": "arr-sync-heading"
}, ue = { class: "admin-integrations__section-head" }, de = { class: "admin-integrations__card" }, fe = {
	key: 0,
	class: "admin-integrations__skel"
}, pe = {
	key: 1,
	class: "admin-integrations__empty",
	role: "status"
}, me = { class: "admin-integrations__dl" }, he = { class: "admin-integrations__dd" }, ge = { class: "admin-integrations__dd" }, _e = { class: "admin-integrations__card-actions" }, ve = {
	class: "admin-integrations__section",
	"aria-labelledby": "auth-providers-heading"
}, ye = {
	key: 0,
	class: "admin-integrations__skel"
}, be = {
	key: 1,
	class: "admin-integrations__providers"
}, xe = { class: "admin-integrations__provider-info" }, Se = { class: "admin-integrations__provider-name" }, Ce = { class: "admin-integrations__provider-actions" }, we = { class: "admin-integrations__field" }, Te = { class: "admin-integrations__field" }, Ee = { class: "admin-integrations__field" }, De = { class: "admin-integrations__hint" }, Oe = { class: "admin-integrations__password-row" }, ke = ["type", "placeholder"], Ae = { class: "admin-integrations__field" }, je = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, Me = { class: "admin-integrations__field" }, Ne = { class: "admin-integrations__field" }, Pe = ["value"], Fe = { class: "admin-integrations__field" }, Ie = { class: "admin-integrations__field" }, Le = { class: "admin-integrations__field" }, Re = { class: "admin-integrations__hint" }, ze = { class: "admin-integrations__password-row" }, Be = ["type", "placeholder"], Ve = { class: "admin-integrations__field" }, He = { class: "admin-integrations__field" }, Ue = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, We = 3e4, w = "openid profile email", T = /*#__PURE__*/ r(/* @__PURE__ */ h({
	__name: "IntegrationsPage",
	props: { client: {} },
	setup(r) {
		let h = {
			oidc: "OIDC",
			ldap: "LDAP"
		}, T = ["oidc", "ldap"], Ge = r, E = ie("apiBase", ""), Ke = ne(() => typeof E == "string" ? E : E?.value ?? ""), D = new te(Ge.client ?? new e({
			baseUrl: Ke.value,
			tokenStore: new n()
		})), O = ee(), k = _(null), A = _(!0), j = _(!1), M = null;
		function N() {
			M !== null && (clearTimeout(M), M = null);
		}
		async function P() {
			A.value = !0;
			try {
				k.value = await D.getSyncStatus();
			} catch (e) {
				O.error(t(e, "Failed to load sync status."));
			} finally {
				A.value = !1;
			}
		}
		async function qe() {
			if (j.value) return;
			j.value = !0;
			let e = !1;
			N(), M = setTimeout(() => {
				e = !0, j.value = !1, O.error("Sync timed out after 30 seconds. Check the server logs.");
			}, We);
			try {
				let t = await D.triggerSync();
				if (N(), e) return;
				t.success ? (O.success(t.message || "Sync complete."), await P()) : O.error(t.message || "Sync failed.");
			} catch (n) {
				if (N(), e) return;
				O.error(t(n, "Sync request failed."));
			} finally {
				e || (j.value = !1);
			}
		}
		async function Je(e) {
			try {
				await D.setSyncEnabled(e), O.success(e ? "Auto-sync enabled." : "Auto-sync disabled."), await P();
			} catch (e) {
				O.error(t(e, "Failed to update sync setting."));
			}
		}
		let F = _([]), I = _(!0), L = _(null), R = _(null);
		async function z() {
			I.value = !0;
			try {
				F.value = await D.listProviders();
			} catch (e) {
				O.error(t(e, "Failed to load auth providers."));
			} finally {
				I.value = !1;
			}
		}
		function B(e) {
			return e === "oidc" ? L.value?.configured ?? !1 : e === "ldap" ? R.value?.configured ?? !1 : F.value.find((t) => t.name === e)?.supports_authentication ?? !1;
		}
		async function Ye(e, n) {
			try {
				n ? (await D.disableProvider(e), O.success(`${h[e]} disabled.`)) : (await D.enableProvider(e), O.success(`${h[e]} enabled.`)), await z();
			} catch (n) {
				O.error(t(n, `Failed to update ${h[e]}.`));
			}
		}
		let V = _(!1), H = _({
			provider_url: "",
			client_id: "",
			client_secret: "",
			scopes: w
		}), U = _(!1), W = _(""), G = _(!1);
		async function Xe() {
			W.value = "", G.value = !1;
			try {
				let e = await D.getOidcSettings();
				L.value = e, H.value = {
					provider_url: e.provider_url ?? "",
					client_id: e.client_id ?? "",
					client_secret: "",
					scopes: e.scopes ?? w
				};
			} catch (e) {
				O.error(t(e, "Failed to load OIDC settings."));
			}
			V.value = !0;
		}
		function K() {
			V.value = !1, W.value = "";
		}
		async function Ze() {
			if (W.value = "", !H.value.provider_url.trim()) {
				W.value = "Provider URL is required.";
				return;
			}
			if (!H.value.client_id.trim()) {
				W.value = "Client ID is required.";
				return;
			}
			U.value = !0;
			try {
				let e = {
					provider_url: H.value.provider_url.trim(),
					client_id: H.value.client_id.trim(),
					scopes: H.value.scopes.trim() || w
				};
				H.value.client_secret.trim() && (e.client_secret = H.value.client_secret), await D.saveOidcSettings(e), O.success("OIDC settings saved."), V.value = !1, L.value = await D.getOidcSettings(), await z();
			} catch (e) {
				W.value = t(e, "Failed to save OIDC settings.");
			} finally {
				U.value = !1;
			}
		}
		let q = _(!1), J = _({
			host: "",
			port: 389,
			ssl: !1,
			base_dn: "",
			bind_dn: "",
			bind_pw: "",
			user_filter: "",
			admin_group: ""
		}), Y = _(!1), X = _(!1), Z = _(""), Q = _(!1);
		async function Qe() {
			Z.value = "", Q.value = !1;
			try {
				let e = await D.getLdapSettings();
				R.value = e, J.value = {
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
				O.error(t(e, "Failed to load LDAP settings."));
			}
			q.value = !0;
		}
		function $e() {
			q.value = !1, Z.value = "";
		}
		function et() {
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
			if (Z.value = "", !J.value.host.trim()) {
				Z.value = "Host is required.";
				return;
			}
			if (!J.value.base_dn.trim()) {
				Z.value = "Base DN is required.";
				return;
			}
			Y.value = !0;
			try {
				await D.saveLdapSettings(et()), O.success("LDAP settings saved."), q.value = !1, R.value = await D.getLdapSettings(), await z();
			} catch (e) {
				Z.value = t(e, "Failed to save LDAP settings.");
			} finally {
				Y.value = !1;
			}
		}
		async function tt() {
			X.value = !0;
			try {
				let e = await D.testLdapConnection(et());
				e.success ? O.success(e.message || "Connection OK.") : O.error(e.message || "Connection failed.");
			} catch (e) {
				O.error(t(e, "LDAP connection test failed."));
			} finally {
				X.value = !1;
			}
		}
		function nt(e) {
			let t = parseInt(e, 10);
			J.value.port = Number.isNaN(t) ? 0 : t;
		}
		function rt(e) {
			e === "oidc" ? Xe() : Qe();
		}
		return oe(() => {
			P(), z();
		}), ae(N), (e, t) => (g(), d("section", ce, [
			t[37] ||= f("header", { class: "admin-integrations__head" }, [f("h1", {
				id: "integrations-heading",
				class: "admin-integrations__title"
			}, "Integrations")], -1),
			f("section", le, [f("div", ue, [t[16] ||= f("h2", {
				id: "arr-sync-heading",
				class: "admin-integrations__section-title"
			}, "Arr sync (TRaSH-Guides)", -1), k.value ? (g(), re(s, {
				key: 0,
				tone: k.value.enabled ? "success" : "neutral"
			}, {
				default: x(() => [p(v(k.value.enabled ? "Enabled" : "Disabled"), 1)]),
				_: 1
			}, 8, ["tone"])) : u("", !0)]), f("div", de, [A.value ? (g(), d("div", fe, [m(i, {
				variant: "text",
				lines: 3
			})])) : k.value === null ? (g(), d("p", pe, " Unable to load sync status. ")) : (g(), d(l, { key: 2 }, [f("dl", me, [
				t[17] ||= f("dt", { class: "admin-integrations__dt" }, "Last sync", -1),
				f("dd", he, v(k.value.last_sync_at ?? "Never synced"), 1),
				t[18] ||= f("dt", { class: "admin-integrations__dt" }, "Auto-sync", -1),
				f("dd", ge, [m(c, {
					"model-value": k.value.enabled,
					label: k.value.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": Je
				}, null, 8, ["model-value", "label"])])
			]), f("div", _e, [m(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				loading: j.value,
				onClick: qe
			}, {
				default: x(() => [p(v(j.value ? "Syncing" : "Sync now"), 1)]),
				_: 1
			}, 8, ["loading"])])], 64))])]),
			f("section", ve, [t[20] ||= f("div", { class: "admin-integrations__section-head" }, [f("h2", {
				id: "auth-providers-heading",
				class: "admin-integrations__section-title"
			}, " Authentication providers ")], -1), I.value ? (g(), d("div", ye, [m(i, {
				variant: "text",
				lines: 4
			})])) : (g(), d("div", be, [(g(), d(l, null, se(T, (e) => f("div", {
				key: e,
				class: "admin-integrations__provider"
			}, [f("div", xe, [f("span", Se, v(h[e]), 1), m(s, { tone: B(e) ? "success" : "neutral" }, {
				default: x(() => [p(v(B(e) ? "Enabled" : "Disabled"), 1)]),
				_: 2
			}, 1032, ["tone"])]), f("div", Ce, [m(c, {
				"model-value": B(e),
				label: `Enable ${h[e]}`,
				"onUpdate:modelValue": () => Ye(e, B(e))
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), m(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "settings",
				"aria-label": `Configure ${h[e]}`,
				onClick: (t) => rt(e)
			}, {
				default: x(() => [...t[19] ||= [p(" Configure ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])), 64))]))]),
			m(o, {
				modelValue: V.value,
				"onUpdate:modelValue": t[5] ||= (e) => V.value = e,
				title: "Configure OIDC",
				onClose: K
			}, {
				footer: x(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: x(() => [...t[25] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: Ze
				}, {
					default: x(() => [...t[26] ||= [p("Save OIDC", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-integrations__form",
					onSubmit: C(Ze, ["prevent"])
				}, [
					f("label", we, [t[21] ||= f("span", { class: "admin-integrations__label" }, "Provider URL", -1), S(f("input", {
						"onUpdate:modelValue": t[0] ||= (e) => H.value.provider_url = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "https://idp.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, H.value.provider_url]])]),
					f("label", Te, [t[22] ||= f("span", { class: "admin-integrations__label" }, "Client ID", -1), S(f("input", {
						"onUpdate:modelValue": t[1] ||= (e) => H.value.client_id = e,
						type: "text",
						class: "admin-integrations__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, H.value.client_id]])]),
					f("label", Ee, [
						t[23] ||= f("span", { class: "admin-integrations__label" }, "Client secret", -1),
						f("span", De, v(L.value?.configured ? "Leave blank to keep the current secret." : "Required when configuring for the first time."), 1),
						f("div", Oe, [S(f("input", {
							"onUpdate:modelValue": t[2] ||= (e) => H.value.client_secret = e,
							type: G.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: L.value?.configured ? "(unchanged)" : "Client secret",
							autocomplete: "new-password"
						}, null, 8, ke), [[y, H.value.client_secret]]), m(a, {
							variant: "ghost",
							size: "sm",
							"left-icon": G.value ? "eye-off" : "eye",
							"aria-label": G.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => G.value = !G.value
						}, {
							default: x(() => [p(v(G.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					f("label", Ae, [t[24] ||= f("span", { class: "admin-integrations__label" }, "Scopes", -1), S(f("input", {
						"onUpdate:modelValue": t[4] ||= (e) => H.value.scopes = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "openid profile email",
						autocomplete: "off"
					}, null, 512), [[b, H.value.scopes]])]),
					W.value ? (g(), d("p", je, v(W.value), 1)) : u("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(o, {
				modelValue: q.value,
				"onUpdate:modelValue": t[15] ||= (e) => q.value = e,
				title: "Configure LDAP",
				size: "lg",
				onClose: $e
			}, {
				footer: x(() => [
					m(a, {
						variant: "ghost",
						size: "sm",
						onClick: $e
					}, {
						default: x(() => [...t[34] ||= [p("Cancel", -1)]]),
						_: 1
					}),
					m(a, {
						variant: "outline",
						size: "sm",
						"left-icon": "settings",
						loading: X.value,
						disabled: Y.value,
						onClick: tt
					}, {
						default: x(() => [...t[35] ||= [p(" Test connection ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"]),
					m(a, {
						variant: "solid",
						size: "sm",
						loading: Y.value,
						disabled: X.value,
						onClick: $
					}, {
						default: x(() => [...t[36] ||= [p(" Save LDAP ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"])
				]),
				default: x(() => [f("form", {
					class: "admin-integrations__form",
					onSubmit: C($, ["prevent"])
				}, [
					f("label", Me, [t[27] ||= f("span", { class: "admin-integrations__label" }, "Host", -1), S(f("input", {
						"onUpdate:modelValue": t[6] ||= (e) => J.value.host = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "ldap.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, J.value.host]])]),
					f("label", Ne, [t[28] ||= f("span", { class: "admin-integrations__label" }, "Port", -1), f("input", {
						value: J.value.port,
						type: "number",
						min: "1",
						max: "65535",
						class: "admin-integrations__input",
						autocomplete: "off",
						onInput: t[7] ||= (e) => nt(e.target.value)
					}, null, 40, Pe)]),
					m(c, {
						modelValue: J.value.ssl,
						"onUpdate:modelValue": t[8] ||= (e) => J.value.ssl = e,
						label: "Use SSL"
					}, null, 8, ["modelValue"]),
					f("label", Fe, [t[29] ||= f("span", { class: "admin-integrations__label" }, "Base DN", -1), S(f("input", {
						"onUpdate:modelValue": t[9] ||= (e) => J.value.base_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "dc=example,dc=com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, J.value.base_dn]])]),
					f("label", Ie, [t[30] ||= f("span", { class: "admin-integrations__label" }, "Bind DN", -1), S(f("input", {
						"onUpdate:modelValue": t[10] ||= (e) => J.value.bind_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admin,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[b, J.value.bind_dn]])]),
					f("label", Le, [
						t[31] ||= f("span", { class: "admin-integrations__label" }, "Bind password", -1),
						f("span", Re, v(R.value?.configured ? "Leave blank to keep the current password." : "Required when configuring for the first time."), 1),
						f("div", ze, [S(f("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value.bind_pw = e,
							type: Q.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: R.value?.configured ? "(unchanged)" : "Bind password",
							autocomplete: "new-password"
						}, null, 8, Be), [[y, J.value.bind_pw]]), m(a, {
							variant: "ghost",
							size: "sm",
							"left-icon": Q.value ? "eye-off" : "eye",
							"aria-label": Q.value ? "Hide password" : "Show password",
							onClick: t[12] ||= (e) => Q.value = !Q.value
						}, {
							default: x(() => [p(v(Q.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					f("label", Ve, [t[32] ||= f("span", { class: "admin-integrations__label" }, "User filter", -1), S(f("input", {
						"onUpdate:modelValue": t[13] ||= (e) => J.value.user_filter = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "(uid=%s)",
						autocomplete: "off"
					}, null, 512), [[b, J.value.user_filter]])]),
					f("label", He, [t[33] ||= f("span", { class: "admin-integrations__label" }, "Admin group DN", -1), S(f("input", {
						"onUpdate:modelValue": t[14] ||= (e) => J.value.admin_group = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admins,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[b, J.value.admin_group]])]),
					Z.value ? (g(), d("p", Ue, v(Z.value), 1)) : u("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-e51cae04"]]);
//#endregion
export { T as default };

//# sourceMappingURL=IntegrationsPage-CCraLP7x.js.map