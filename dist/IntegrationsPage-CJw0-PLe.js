import { a as e, i as t, m as n, n as r, r as ee, t as i } from "./Button-DjEQ9y17.js";
import { t as a } from "./Modal-BkSAbwHm.js";
import { t as o } from "./Badge-DobVc76J.js";
import { t as s } from "./Switch-BNdBMUaS.js";
import { t as te } from "./integrations-DLAG9ISY.js";
import { Fragment as c, computed as ne, createBlock as re, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as h, ref as g, renderList as se, toDisplayString as _, vModelDynamic as v, vModelText as y, withCtx as b, withDirectives as x, withModifiers as S } from "vue";
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
}, We = 3e4, C = "openid profile email", w = /*#__PURE__*/ n(/* @__PURE__ */ m({
	__name: "IntegrationsPage",
	props: { client: {} },
	setup(n) {
		let m = {
			oidc: "OIDC",
			ldap: "LDAP"
		}, w = ["oidc", "ldap"], Ge = n, T = ie("apiBase", ""), Ke = ne(() => typeof T == "string" ? T : T?.value ?? ""), E = new te(Ge.client ?? new e({
			baseUrl: Ke.value,
			tokenStore: new t()
		})), D = ee();
		function O(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let k = g(null), A = g(!0), j = g(!1), M = null;
		function N() {
			M !== null && (clearTimeout(M), M = null);
		}
		async function P() {
			A.value = !0;
			try {
				k.value = await E.getSyncStatus();
			} catch (e) {
				D.error(O(e, "Failed to load sync status."));
			} finally {
				A.value = !1;
			}
		}
		async function qe() {
			if (j.value) return;
			j.value = !0;
			let e = !1;
			N(), M = setTimeout(() => {
				e = !0, j.value = !1, D.error("Sync timed out after 30 seconds. Check the server logs.");
			}, We);
			try {
				let t = await E.triggerSync();
				if (N(), e) return;
				t.success ? (D.success(t.message || "Sync complete."), await P()) : D.error(t.message || "Sync failed.");
			} catch (t) {
				if (N(), e) return;
				D.error(O(t, "Sync request failed."));
			} finally {
				e || (j.value = !1);
			}
		}
		async function Je(e) {
			try {
				await E.setSyncEnabled(e), D.success(e ? "Auto-sync enabled." : "Auto-sync disabled."), await P();
			} catch (e) {
				D.error(O(e, "Failed to update sync setting."));
			}
		}
		let F = g([]), I = g(!0), L = g(null), R = g(null);
		async function z() {
			I.value = !0;
			try {
				F.value = await E.listProviders();
			} catch (e) {
				D.error(O(e, "Failed to load auth providers."));
			} finally {
				I.value = !1;
			}
		}
		function B(e) {
			return e === "oidc" ? L.value?.configured ?? !1 : e === "ldap" ? R.value?.configured ?? !1 : F.value.find((t) => t.name === e)?.supports_authentication ?? !1;
		}
		async function Ye(e, t) {
			try {
				t ? (await E.disableProvider(e), D.success(`${m[e]} disabled.`)) : (await E.enableProvider(e), D.success(`${m[e]} enabled.`)), await z();
			} catch (t) {
				D.error(O(t, `Failed to update ${m[e]}.`));
			}
		}
		let V = g(!1), H = g({
			provider_url: "",
			client_id: "",
			client_secret: "",
			scopes: C
		}), U = g(!1), W = g(""), G = g(!1);
		async function Xe() {
			W.value = "", G.value = !1;
			try {
				let e = await E.getOidcSettings();
				L.value = e, H.value = {
					provider_url: e.provider_url ?? "",
					client_id: e.client_id ?? "",
					client_secret: "",
					scopes: e.scopes ?? C
				};
			} catch (e) {
				D.error(O(e, "Failed to load OIDC settings."));
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
					scopes: H.value.scopes.trim() || C
				};
				H.value.client_secret.trim() && (e.client_secret = H.value.client_secret), await E.saveOidcSettings(e), D.success("OIDC settings saved."), V.value = !1, L.value = await E.getOidcSettings(), await z();
			} catch (e) {
				W.value = O(e, "Failed to save OIDC settings.");
			} finally {
				U.value = !1;
			}
		}
		let q = g(!1), J = g({
			host: "",
			port: 389,
			ssl: !1,
			base_dn: "",
			bind_dn: "",
			bind_pw: "",
			user_filter: "",
			admin_group: ""
		}), Y = g(!1), X = g(!1), Z = g(""), Q = g(!1);
		async function Qe() {
			Z.value = "", Q.value = !1;
			try {
				let e = await E.getLdapSettings();
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
				D.error(O(e, "Failed to load LDAP settings."));
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
				await E.saveLdapSettings(et()), D.success("LDAP settings saved."), q.value = !1, R.value = await E.getLdapSettings(), await z();
			} catch (e) {
				Z.value = O(e, "Failed to save LDAP settings.");
			} finally {
				Y.value = !1;
			}
		}
		async function tt() {
			X.value = !0;
			try {
				let e = await E.testLdapConnection(et());
				e.success ? D.success(e.message || "Connection OK.") : D.error(e.message || "Connection failed.");
			} catch (e) {
				D.error(O(e, "LDAP connection test failed."));
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
		}), ae(N), (e, t) => (h(), u("section", ce, [
			t[37] ||= d("header", { class: "admin-integrations__head" }, [d("h1", {
				id: "integrations-heading",
				class: "admin-integrations__title"
			}, "Integrations")], -1),
			d("section", le, [d("div", ue, [t[16] ||= d("h2", {
				id: "arr-sync-heading",
				class: "admin-integrations__section-title"
			}, "Arr sync (TRaSH-Guides)", -1), k.value ? (h(), re(o, {
				key: 0,
				tone: k.value.enabled ? "success" : "neutral"
			}, {
				default: b(() => [f(_(k.value.enabled ? "Enabled" : "Disabled"), 1)]),
				_: 1
			}, 8, ["tone"])) : l("", !0)]), d("div", de, [A.value ? (h(), u("div", fe, [p(r, {
				variant: "text",
				lines: 3
			})])) : k.value === null ? (h(), u("p", pe, " Unable to load sync status. ")) : (h(), u(c, { key: 2 }, [d("dl", me, [
				t[17] ||= d("dt", { class: "admin-integrations__dt" }, "Last sync", -1),
				d("dd", he, _(k.value.last_sync_at ?? "Never synced"), 1),
				t[18] ||= d("dt", { class: "admin-integrations__dt" }, "Auto-sync", -1),
				d("dd", ge, [p(s, {
					"model-value": k.value.enabled,
					label: k.value.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": Je
				}, null, 8, ["model-value", "label"])])
			]), d("div", _e, [p(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				loading: j.value,
				onClick: qe
			}, {
				default: b(() => [f(_(j.value ? "Syncing" : "Sync now"), 1)]),
				_: 1
			}, 8, ["loading"])])], 64))])]),
			d("section", ve, [t[20] ||= d("div", { class: "admin-integrations__section-head" }, [d("h2", {
				id: "auth-providers-heading",
				class: "admin-integrations__section-title"
			}, " Authentication providers ")], -1), I.value ? (h(), u("div", ye, [p(r, {
				variant: "text",
				lines: 4
			})])) : (h(), u("div", be, [(h(), u(c, null, se(w, (e) => d("div", {
				key: e,
				class: "admin-integrations__provider"
			}, [d("div", xe, [d("span", Se, _(m[e]), 1), p(o, { tone: B(e) ? "success" : "neutral" }, {
				default: b(() => [f(_(B(e) ? "Enabled" : "Disabled"), 1)]),
				_: 2
			}, 1032, ["tone"])]), d("div", Ce, [p(s, {
				"model-value": B(e),
				label: `Enable ${m[e]}`,
				"onUpdate:modelValue": () => Ye(e, B(e))
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), p(i, {
				variant: "outline",
				size: "sm",
				"left-icon": "settings",
				"aria-label": `Configure ${m[e]}`,
				onClick: (t) => rt(e)
			}, {
				default: b(() => [...t[19] ||= [f(" Configure ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])), 64))]))]),
			p(a, {
				modelValue: V.value,
				"onUpdate:modelValue": t[5] ||= (e) => V.value = e,
				title: "Configure OIDC",
				onClose: K
			}, {
				footer: b(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: b(() => [...t[25] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: Ze
				}, {
					default: b(() => [...t[26] ||= [f("Save OIDC", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [d("form", {
					class: "admin-integrations__form",
					onSubmit: S(Ze, ["prevent"])
				}, [
					d("label", we, [t[21] ||= d("span", { class: "admin-integrations__label" }, "Provider URL", -1), x(d("input", {
						"onUpdate:modelValue": t[0] ||= (e) => H.value.provider_url = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "https://idp.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, H.value.provider_url]])]),
					d("label", Te, [t[22] ||= d("span", { class: "admin-integrations__label" }, "Client ID", -1), x(d("input", {
						"onUpdate:modelValue": t[1] ||= (e) => H.value.client_id = e,
						type: "text",
						class: "admin-integrations__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, H.value.client_id]])]),
					d("label", Ee, [
						t[23] ||= d("span", { class: "admin-integrations__label" }, "Client secret", -1),
						d("span", De, _(L.value?.configured ? "Leave blank to keep the current secret." : "Required when configuring for the first time."), 1),
						d("div", Oe, [x(d("input", {
							"onUpdate:modelValue": t[2] ||= (e) => H.value.client_secret = e,
							type: G.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: L.value?.configured ? "(unchanged)" : "Client secret",
							autocomplete: "new-password"
						}, null, 8, ke), [[v, H.value.client_secret]]), p(i, {
							variant: "ghost",
							size: "sm",
							"left-icon": G.value ? "eye-off" : "eye",
							"aria-label": G.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => G.value = !G.value
						}, {
							default: b(() => [f(_(G.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					d("label", Ae, [t[24] ||= d("span", { class: "admin-integrations__label" }, "Scopes", -1), x(d("input", {
						"onUpdate:modelValue": t[4] ||= (e) => H.value.scopes = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "openid profile email",
						autocomplete: "off"
					}, null, 512), [[y, H.value.scopes]])]),
					W.value ? (h(), u("p", je, _(W.value), 1)) : l("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			p(a, {
				modelValue: q.value,
				"onUpdate:modelValue": t[15] ||= (e) => q.value = e,
				title: "Configure LDAP",
				size: "lg",
				onClose: $e
			}, {
				footer: b(() => [
					p(i, {
						variant: "ghost",
						size: "sm",
						onClick: $e
					}, {
						default: b(() => [...t[34] ||= [f("Cancel", -1)]]),
						_: 1
					}),
					p(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "settings",
						loading: X.value,
						disabled: Y.value,
						onClick: tt
					}, {
						default: b(() => [...t[35] ||= [f(" Test connection ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"]),
					p(i, {
						variant: "solid",
						size: "sm",
						loading: Y.value,
						disabled: X.value,
						onClick: $
					}, {
						default: b(() => [...t[36] ||= [f(" Save LDAP ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"])
				]),
				default: b(() => [d("form", {
					class: "admin-integrations__form",
					onSubmit: S($, ["prevent"])
				}, [
					d("label", Me, [t[27] ||= d("span", { class: "admin-integrations__label" }, "Host", -1), x(d("input", {
						"onUpdate:modelValue": t[6] ||= (e) => J.value.host = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "ldap.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, J.value.host]])]),
					d("label", Ne, [t[28] ||= d("span", { class: "admin-integrations__label" }, "Port", -1), d("input", {
						value: J.value.port,
						type: "number",
						min: "1",
						max: "65535",
						class: "admin-integrations__input",
						autocomplete: "off",
						onInput: t[7] ||= (e) => nt(e.target.value)
					}, null, 40, Pe)]),
					p(s, {
						modelValue: J.value.ssl,
						"onUpdate:modelValue": t[8] ||= (e) => J.value.ssl = e,
						label: "Use SSL"
					}, null, 8, ["modelValue"]),
					d("label", Fe, [t[29] ||= d("span", { class: "admin-integrations__label" }, "Base DN", -1), x(d("input", {
						"onUpdate:modelValue": t[9] ||= (e) => J.value.base_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "dc=example,dc=com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, J.value.base_dn]])]),
					d("label", Ie, [t[30] ||= d("span", { class: "admin-integrations__label" }, "Bind DN", -1), x(d("input", {
						"onUpdate:modelValue": t[10] ||= (e) => J.value.bind_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admin,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[y, J.value.bind_dn]])]),
					d("label", Le, [
						t[31] ||= d("span", { class: "admin-integrations__label" }, "Bind password", -1),
						d("span", Re, _(R.value?.configured ? "Leave blank to keep the current password." : "Required when configuring for the first time."), 1),
						d("div", ze, [x(d("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value.bind_pw = e,
							type: Q.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: R.value?.configured ? "(unchanged)" : "Bind password",
							autocomplete: "new-password"
						}, null, 8, Be), [[v, J.value.bind_pw]]), p(i, {
							variant: "ghost",
							size: "sm",
							"left-icon": Q.value ? "eye-off" : "eye",
							"aria-label": Q.value ? "Hide password" : "Show password",
							onClick: t[12] ||= (e) => Q.value = !Q.value
						}, {
							default: b(() => [f(_(Q.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					d("label", Ve, [t[32] ||= d("span", { class: "admin-integrations__label" }, "User filter", -1), x(d("input", {
						"onUpdate:modelValue": t[13] ||= (e) => J.value.user_filter = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "(uid=%s)",
						autocomplete: "off"
					}, null, 512), [[y, J.value.user_filter]])]),
					d("label", He, [t[33] ||= d("span", { class: "admin-integrations__label" }, "Admin group DN", -1), x(d("input", {
						"onUpdate:modelValue": t[14] ||= (e) => J.value.admin_group = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admins,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[y, J.value.admin_group]])]),
					Z.value ? (h(), u("p", Ue, _(Z.value), 1)) : l("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-056074d4"]]);
//#endregion
export { w as default };

//# sourceMappingURL=IntegrationsPage-CJw0-PLe.js.map