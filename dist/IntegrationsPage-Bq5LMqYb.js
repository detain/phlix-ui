import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, t as ee } from "./client-7SOKWho6.js";
import { t as r } from "./Button-k7aQagzg.js";
import { t as i } from "./Badge-ArWL5-WE.js";
import { t as a } from "./Switch-CFZhdkXR.js";
import { t as o } from "./Modal-DQiZ0eAJ.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as ne } from "./Skeleton-DkSoWF3C.js";
import { t as re } from "./EmptyState-B2QnGIQT.js";
import { t as ie } from "./integrations-DLAG9ISY.js";
import { Fragment as s, computed as ae, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as oe, onBeforeUnmount as se, onMounted as ce, openBlock as h, ref as g, renderList as le, toDisplayString as _, vModelDynamic as v, vModelText as y, withCtx as b, withDirectives as x, withModifiers as S } from "vue";
//#region src/pages/admin/IntegrationsPage.vue?vue&type=script&setup=true&lang.ts
var ue = {
	class: "admin-integrations",
	"aria-labelledby": "integrations-heading"
}, de = {
	class: "admin-integrations__section",
	"aria-labelledby": "arr-sync-heading"
}, fe = { class: "admin-integrations__section-head" }, pe = { class: "admin-integrations__card" }, me = {
	key: 0,
	class: "admin-integrations__skel"
}, he = {
	key: 2,
	class: "admin-integrations__empty",
	role: "status"
}, ge = { class: "admin-integrations__dl" }, _e = { class: "admin-integrations__dd" }, ve = { class: "admin-integrations__dd" }, ye = { class: "admin-integrations__card-actions" }, be = {
	class: "admin-integrations__section",
	"aria-labelledby": "auth-providers-heading"
}, xe = {
	key: 0,
	class: "admin-integrations__skel"
}, Se = {
	key: 2,
	class: "admin-integrations__providers"
}, Ce = { class: "admin-integrations__provider-info" }, we = { class: "admin-integrations__provider-name" }, Te = { class: "admin-integrations__provider-actions" }, Ee = { class: "admin-integrations__field" }, De = { class: "admin-integrations__field" }, Oe = { class: "admin-integrations__field" }, ke = { class: "admin-integrations__hint" }, Ae = { class: "admin-integrations__password-row" }, je = ["type", "placeholder"], Me = { class: "admin-integrations__field" }, Ne = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, Pe = { class: "admin-integrations__field" }, Fe = { class: "admin-integrations__field" }, Ie = ["value"], Le = { class: "admin-integrations__field" }, Re = { class: "admin-integrations__field" }, ze = { class: "admin-integrations__field" }, Be = { class: "admin-integrations__hint" }, Ve = { class: "admin-integrations__password-row" }, He = ["type", "placeholder"], Ue = { class: "admin-integrations__field" }, We = { class: "admin-integrations__field" }, Ge = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, Ke = 3e4, C = "openid profile email", w = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "IntegrationsPage",
	props: { client: {} },
	setup(e) {
		let m = {
			oidc: "OIDC",
			ldap: "LDAP"
		}, w = ["oidc", "ldap"], qe = e, T = oe("apiBase", ""), Je = ae(() => typeof T == "string" ? T : T?.value ?? ""), E = new ie(qe.client ?? new ee({
			baseUrl: Je.value,
			tokenStore: new t()
		})), D = te(), O = g(null), k = g(!0), A = g(null), j = g(!1), M = null;
		function N() {
			M !== null && (clearTimeout(M), M = null);
		}
		async function P() {
			k.value = !0, A.value = null;
			try {
				O.value = await E.getSyncStatus();
			} catch (e) {
				A.value = n(e, "Failed to load sync status."), D.error(A.value);
			} finally {
				k.value = !1;
			}
		}
		async function Ye() {
			if (j.value) return;
			j.value = !0;
			let e = !1;
			N(), M = setTimeout(() => {
				e = !0, j.value = !1, D.error("Sync timed out after 30 seconds. Check the server logs.");
			}, Ke);
			try {
				let t = await E.triggerSync();
				if (N(), e) return;
				t.success ? (D.success(t.message || "Sync complete."), await P()) : D.error(t.message || "Sync failed.");
			} catch (t) {
				if (N(), e) return;
				D.error(n(t, "Sync request failed."));
			} finally {
				e || (j.value = !1);
			}
		}
		async function Xe(e) {
			try {
				await E.setSyncEnabled(e), D.success(e ? "Auto-sync enabled." : "Auto-sync disabled."), await P();
			} catch (e) {
				D.error(n(e, "Failed to update sync setting."));
			}
		}
		let F = g([]), I = g(!0), L = g(null), R = g(null), z = g(null);
		async function B() {
			I.value = !0, L.value = null;
			try {
				F.value = await E.listProviders();
			} catch (e) {
				L.value = n(e, "Failed to load auth providers."), D.error(L.value);
			} finally {
				I.value = !1;
			}
		}
		function V(e) {
			return e === "oidc" ? R.value?.configured ?? !1 : e === "ldap" ? z.value?.configured ?? !1 : F.value.find((t) => t.name === e)?.supports_authentication ?? !1;
		}
		async function Ze(e, t) {
			try {
				t ? (await E.disableProvider(e), D.success(`${m[e]} disabled.`)) : (await E.enableProvider(e), D.success(`${m[e]} enabled.`)), await B();
			} catch (t) {
				D.error(n(t, `Failed to update ${m[e]}.`));
			}
		}
		let H = g(!1), U = g({
			provider_url: "",
			client_id: "",
			client_secret: "",
			scopes: C
		}), W = g(!1), G = g(""), K = g(!1);
		async function Qe() {
			G.value = "", K.value = !1;
			try {
				let e = await E.getOidcSettings();
				R.value = e, U.value = {
					provider_url: e.provider_url ?? "",
					client_id: e.client_id ?? "",
					client_secret: "",
					scopes: e.scopes ?? C
				};
			} catch (e) {
				D.error(n(e, "Failed to load OIDC settings."));
			}
			H.value = !0;
		}
		function $e() {
			H.value = !1, G.value = "";
		}
		async function et() {
			if (G.value = "", !U.value.provider_url.trim()) {
				G.value = "Provider URL is required.";
				return;
			}
			if (!U.value.client_id.trim()) {
				G.value = "Client ID is required.";
				return;
			}
			W.value = !0;
			try {
				let e = {
					provider_url: U.value.provider_url.trim(),
					client_id: U.value.client_id.trim(),
					scopes: U.value.scopes.trim() || C
				};
				U.value.client_secret.trim() && (e.client_secret = U.value.client_secret), await E.saveOidcSettings(e), D.success("OIDC settings saved."), H.value = !1, R.value = await E.getOidcSettings(), await B();
			} catch (e) {
				G.value = n(e, "Failed to save OIDC settings.");
			} finally {
				W.value = !1;
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
		async function tt() {
			Z.value = "", Q.value = !1;
			try {
				let e = await E.getLdapSettings();
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
				D.error(n(e, "Failed to load LDAP settings."));
			}
			q.value = !0;
		}
		function nt() {
			q.value = !1, Z.value = "";
		}
		function rt() {
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
				await E.saveLdapSettings(rt()), D.success("LDAP settings saved."), q.value = !1, z.value = await E.getLdapSettings(), await B();
			} catch (e) {
				Z.value = n(e, "Failed to save LDAP settings.");
			} finally {
				Y.value = !1;
			}
		}
		async function it() {
			X.value = !0;
			try {
				let e = await E.testLdapConnection(rt());
				e.success ? D.success(e.message || "Connection OK.") : D.error(e.message || "Connection failed.");
			} catch (e) {
				D.error(n(e, "LDAP connection test failed."));
			} finally {
				X.value = !1;
			}
		}
		function at(e) {
			let t = parseInt(e, 10);
			J.value.port = Number.isNaN(t) ? 0 : t;
		}
		function ot(e) {
			e === "oidc" ? Qe() : tt();
		}
		return ce(() => {
			P(), B();
		}), se(N), (e, t) => (h(), u("section", ue, [
			t[39] ||= d("header", { class: "admin-integrations__head" }, [d("h1", {
				id: "integrations-heading",
				class: "admin-integrations__title"
			}, "Integrations")], -1),
			d("section", de, [d("div", fe, [t[16] ||= d("h2", {
				id: "arr-sync-heading",
				class: "admin-integrations__section-title"
			}, "Arr sync (TRaSH-Guides)", -1), O.value ? (h(), c(i, {
				key: 0,
				tone: O.value.enabled ? "success" : "neutral"
			}, {
				default: b(() => [f(_(O.value.enabled ? "Enabled" : "Disabled"), 1)]),
				_: 1
			}, 8, ["tone"])) : l("", !0)]), d("div", pe, [k.value ? (h(), u("div", me, [p(ne, {
				variant: "text",
				lines: 3
			})])) : A.value ? (h(), c(re, {
				key: 1,
				icon: "alert",
				title: "Couldn't load sync status",
				description: A.value
			}, {
				actions: b(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: b(() => [...t[17] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : O.value === null ? (h(), u("p", he, " No sync status available. ")) : (h(), u(s, { key: 3 }, [d("dl", ge, [
				t[18] ||= d("dt", { class: "admin-integrations__dt" }, "Last sync", -1),
				d("dd", _e, _(O.value.last_sync_at ?? "Never synced"), 1),
				t[19] ||= d("dt", { class: "admin-integrations__dt" }, "Auto-sync", -1),
				d("dd", ve, [p(a, {
					"model-value": O.value.enabled,
					label: O.value.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": Xe
				}, null, 8, ["model-value", "label"])])
			]), d("div", ye, [p(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				loading: j.value,
				onClick: Ye
			}, {
				default: b(() => [f(_(j.value ? "Syncing" : "Sync now"), 1)]),
				_: 1
			}, 8, ["loading"])])], 64))])]),
			d("section", be, [t[22] ||= d("div", { class: "admin-integrations__section-head" }, [d("h2", {
				id: "auth-providers-heading",
				class: "admin-integrations__section-title"
			}, " Authentication providers ")], -1), I.value ? (h(), u("div", xe, [p(ne, {
				variant: "text",
				lines: 4
			})])) : L.value ? (h(), c(re, {
				key: 1,
				icon: "alert",
				title: "Couldn't load auth providers",
				description: L.value
			}, {
				actions: b(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: b(() => [...t[20] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (h(), u("div", Se, [(h(), u(s, null, le(w, (e) => d("div", {
				key: e,
				class: "admin-integrations__provider"
			}, [d("div", Ce, [d("span", we, _(m[e]), 1), p(i, { tone: V(e) ? "success" : "neutral" }, {
				default: b(() => [f(_(V(e) ? "Enabled" : "Disabled"), 1)]),
				_: 2
			}, 1032, ["tone"])]), d("div", Te, [p(a, {
				"model-value": V(e),
				label: `Enable ${m[e]}`,
				"onUpdate:modelValue": () => Ze(e, V(e))
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), p(r, {
				variant: "outline",
				size: "sm",
				"left-icon": "settings",
				"aria-label": `Configure ${m[e]}`,
				onClick: (t) => ot(e)
			}, {
				default: b(() => [...t[21] ||= [f(" Configure ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])), 64))]))]),
			p(o, {
				modelValue: H.value,
				"onUpdate:modelValue": t[5] ||= (e) => H.value = e,
				title: "Configure OIDC",
				onClose: $e
			}, {
				footer: b(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: $e
				}, {
					default: b(() => [...t[27] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: et
				}, {
					default: b(() => [...t[28] ||= [f("Save OIDC", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [d("form", {
					class: "admin-integrations__form",
					onSubmit: S(et, ["prevent"])
				}, [
					d("label", Ee, [t[23] ||= d("span", { class: "admin-integrations__label" }, "Provider URL", -1), x(d("input", {
						"onUpdate:modelValue": t[0] ||= (e) => U.value.provider_url = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "https://idp.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, U.value.provider_url]])]),
					d("label", De, [t[24] ||= d("span", { class: "admin-integrations__label" }, "Client ID", -1), x(d("input", {
						"onUpdate:modelValue": t[1] ||= (e) => U.value.client_id = e,
						type: "text",
						class: "admin-integrations__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, U.value.client_id]])]),
					d("label", Oe, [
						t[25] ||= d("span", { class: "admin-integrations__label" }, "Client secret", -1),
						d("span", ke, _(R.value?.configured ? "Leave blank to keep the current secret." : "Required when configuring for the first time."), 1),
						d("div", Ae, [x(d("input", {
							"onUpdate:modelValue": t[2] ||= (e) => U.value.client_secret = e,
							type: K.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: R.value?.configured ? "(unchanged)" : "Client secret",
							autocomplete: "new-password"
						}, null, 8, je), [[v, U.value.client_secret]]), p(r, {
							variant: "ghost",
							size: "sm",
							"left-icon": K.value ? "eye-off" : "eye",
							"aria-label": K.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => K.value = !K.value
						}, {
							default: b(() => [f(_(K.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					d("label", Me, [t[26] ||= d("span", { class: "admin-integrations__label" }, "Scopes", -1), x(d("input", {
						"onUpdate:modelValue": t[4] ||= (e) => U.value.scopes = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "openid profile email",
						autocomplete: "off"
					}, null, 512), [[y, U.value.scopes]])]),
					G.value ? (h(), u("p", Ne, _(G.value), 1)) : l("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			p(o, {
				modelValue: q.value,
				"onUpdate:modelValue": t[15] ||= (e) => q.value = e,
				title: "Configure LDAP",
				size: "lg",
				onClose: nt
			}, {
				footer: b(() => [
					p(r, {
						variant: "ghost",
						size: "sm",
						onClick: nt
					}, {
						default: b(() => [...t[36] ||= [f("Cancel", -1)]]),
						_: 1
					}),
					p(r, {
						variant: "outline",
						size: "sm",
						"left-icon": "settings",
						loading: X.value,
						disabled: Y.value,
						onClick: it
					}, {
						default: b(() => [...t[37] ||= [f(" Test connection ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"]),
					p(r, {
						variant: "solid",
						size: "sm",
						loading: Y.value,
						disabled: X.value,
						onClick: $
					}, {
						default: b(() => [...t[38] ||= [f(" Save LDAP ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"])
				]),
				default: b(() => [d("form", {
					class: "admin-integrations__form",
					onSubmit: S($, ["prevent"])
				}, [
					d("label", Pe, [t[29] ||= d("span", { class: "admin-integrations__label" }, "Host", -1), x(d("input", {
						"onUpdate:modelValue": t[6] ||= (e) => J.value.host = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "ldap.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, J.value.host]])]),
					d("label", Fe, [t[30] ||= d("span", { class: "admin-integrations__label" }, "Port", -1), d("input", {
						value: J.value.port,
						type: "number",
						min: "1",
						max: "65535",
						class: "admin-integrations__input",
						autocomplete: "off",
						onInput: t[7] ||= (e) => at(e.target.value)
					}, null, 40, Ie)]),
					p(a, {
						modelValue: J.value.ssl,
						"onUpdate:modelValue": t[8] ||= (e) => J.value.ssl = e,
						label: "Use SSL"
					}, null, 8, ["modelValue"]),
					d("label", Le, [t[31] ||= d("span", { class: "admin-integrations__label" }, "Base DN", -1), x(d("input", {
						"onUpdate:modelValue": t[9] ||= (e) => J.value.base_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "dc=example,dc=com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, J.value.base_dn]])]),
					d("label", Re, [t[32] ||= d("span", { class: "admin-integrations__label" }, "Bind DN", -1), x(d("input", {
						"onUpdate:modelValue": t[10] ||= (e) => J.value.bind_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admin,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[y, J.value.bind_dn]])]),
					d("label", ze, [
						t[33] ||= d("span", { class: "admin-integrations__label" }, "Bind password", -1),
						d("span", Be, _(z.value?.configured ? "Leave blank to keep the current password." : "Required when configuring for the first time."), 1),
						d("div", Ve, [x(d("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value.bind_pw = e,
							type: Q.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: z.value?.configured ? "(unchanged)" : "Bind password",
							autocomplete: "new-password"
						}, null, 8, He), [[v, J.value.bind_pw]]), p(r, {
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
					d("label", Ue, [t[34] ||= d("span", { class: "admin-integrations__label" }, "User filter", -1), x(d("input", {
						"onUpdate:modelValue": t[13] ||= (e) => J.value.user_filter = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "(uid=%s)",
						autocomplete: "off"
					}, null, 512), [[y, J.value.user_filter]])]),
					d("label", We, [t[35] ||= d("span", { class: "admin-integrations__label" }, "Admin group DN", -1), x(d("input", {
						"onUpdate:modelValue": t[14] ||= (e) => J.value.admin_group = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admins,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[y, J.value.admin_group]])]),
					Z.value ? (h(), u("p", Ge, _(Z.value), 1)) : l("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-a68b7516"]]);
//#endregion
export { w as default };

//# sourceMappingURL=IntegrationsPage-Bq5LMqYb.js.map