import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as ee } from "./client-D80As4Gx.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-DWa6Ld_Z.js";
import { t as i } from "./Badge-B6MgOwKQ.js";
import { t as a } from "./Switch-DyS2L5gX.js";
import { t as o } from "./Modal-BgLqRZQi.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as ne } from "./PageHint-BoAlFFBN.js";
import { t as re } from "./integrations-DLAG9ISY.js";
import { t as ie } from "./helpLinks-BI4oN4Or.js";
import { Fragment as ae, computed as oe, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as se, onBeforeUnmount as ce, onMounted as le, openBlock as g, ref as _, renderList as ue, toDisplayString as v, unref as y, vModelDynamic as de, vModelText as b, withCtx as x, withDirectives as S, withModifiers as fe } from "vue";
//#region src/pages/admin/IntegrationsPage.vue?vue&type=script&setup=true&lang.ts
var pe = {
	class: "admin-integrations",
	"aria-labelledby": "integrations-heading"
}, me = {
	class: "admin-integrations__section",
	"aria-labelledby": "arr-sync-heading"
}, he = { class: "admin-integrations__section-head" }, ge = { class: "admin-integrations__card" }, _e = {
	key: 0,
	class: "admin-integrations__skel"
}, ve = {
	key: 2,
	class: "admin-integrations__empty",
	role: "status"
}, ye = { class: "admin-integrations__dl" }, be = { class: "admin-integrations__dd" }, xe = { class: "admin-integrations__dd" }, Se = { class: "admin-integrations__card-actions" }, Ce = {
	class: "admin-integrations__section",
	"aria-labelledby": "auth-providers-heading"
}, we = {
	key: 0,
	class: "admin-integrations__skel"
}, Te = {
	key: 2,
	class: "admin-integrations__providers"
}, Ee = { class: "admin-integrations__provider-info" }, De = { class: "admin-integrations__provider-name" }, Oe = { class: "admin-integrations__provider-actions" }, ke = { class: "admin-integrations__field" }, Ae = { class: "admin-integrations__field" }, je = { class: "admin-integrations__field" }, Me = { class: "admin-integrations__hint" }, Ne = { class: "admin-integrations__password-row" }, Pe = ["type", "placeholder"], Fe = { class: "admin-integrations__field" }, Ie = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, Le = { class: "admin-integrations__field" }, Re = { class: "admin-integrations__field" }, ze = ["value"], Be = { class: "admin-integrations__field" }, Ve = { class: "admin-integrations__field" }, He = { class: "admin-integrations__field" }, Ue = { class: "admin-integrations__hint" }, We = { class: "admin-integrations__password-row" }, Ge = ["type", "placeholder"], Ke = { class: "admin-integrations__field" }, qe = { class: "admin-integrations__field" }, Je = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, Ye = 3e4, C = "openid profile email", w = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "IntegrationsPage",
	props: { client: {} },
	setup(e) {
		let h = {
			oidc: "OIDC",
			ldap: "LDAP"
		}, w = ["oidc", "ldap"], Xe = e, T = se("apiBase", ""), Ze = oe(() => typeof T == "string" ? T : T?.value ?? ""), E = new re(Xe.client ?? new ee({
			baseUrl: Ze.value,
			tokenStore: new t()
		})), D = te(), O = _(null), k = _(!0), A = _(null), j = _(!1), M = null;
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
		async function Qe() {
			if (j.value) return;
			j.value = !0;
			let e = !1;
			N(), M = setTimeout(() => {
				e = !0, j.value = !1, D.error("Sync timed out after 30 seconds. Check the server logs.");
			}, Ye);
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
		async function $e(e) {
			try {
				await E.setSyncEnabled(e), D.success(e ? "Auto-sync enabled." : "Auto-sync disabled."), await P();
			} catch (e) {
				D.error(n(e, "Failed to update sync setting."));
			}
		}
		let F = _([]), I = _(!0), L = _(null), R = _(null), z = _(null);
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
		async function et(e, t) {
			try {
				t ? (await E.disableProvider(e), D.success(`${h[e]} disabled.`)) : (await E.enableProvider(e), D.success(`${h[e]} enabled.`)), await B();
			} catch (t) {
				D.error(n(t, `Failed to update ${h[e]}.`));
			}
		}
		let H = _(!1), U = _({
			provider_url: "",
			client_id: "",
			client_secret: "",
			scopes: C
		}), W = _(!1), G = _(""), K = _(!1);
		async function tt() {
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
		function nt() {
			H.value = !1, G.value = "";
		}
		async function rt() {
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
		async function it() {
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
				await E.saveLdapSettings(ot()), D.success("LDAP settings saved."), q.value = !1, z.value = await E.getLdapSettings(), await B();
			} catch (e) {
				Z.value = n(e, "Failed to save LDAP settings.");
			} finally {
				Y.value = !1;
			}
		}
		async function st() {
			X.value = !0;
			try {
				let e = await E.testLdapConnection(ot());
				e.success ? D.success(e.message || "Connection OK.") : D.error(e.message || "Connection failed.");
			} catch (e) {
				D.error(n(e, "LDAP connection test failed."));
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
		return le(() => {
			P(), B();
		}), ce(N), (e, t) => (g(), d("section", pe, [
			t[40] ||= f("header", { class: "admin-integrations__head" }, [f("h1", {
				id: "integrations-heading",
				class: "admin-integrations__title"
			}, "Integrations")], -1),
			m(ne, {
				links: y(ie).integrations.links,
				details: y(ie).integrations.details,
				title: "What's on this page"
			}, {
				default: x(() => [...t[16] ||= [
					p(" Connect Phlix to outside tools. ", -1),
					f("strong", null, "Arr sync", -1),
					p(" pulls quality-profile settings from TRaSH-Guides for Radarr/Sonarr — ", -1),
					f("strong", null, "Sync now", -1),
					p(" runs it once, and ", -1),
					f("strong", null, "Auto-sync", -1),
					p(" keeps it updated on a schedule. The ", -1),
					f("strong", null, "OIDC", -1),
					p(" and ", -1),
					f("strong", null, "LDAP", -1),
					p(" sections let people sign in with your company's single-sign-on or directory: flip a section's switch to turn that login method on, then use ", -1),
					f("strong", null, "Configure", -1),
					p(" to enter the connection details (provider URL, client ID/secret for OIDC; host, port, base DN, and bind credentials for LDAP). ", -1),
					f("strong", null, "Test connection", -1),
					p(" in the LDAP dialog checks your settings before you ", -1),
					f("strong", null, "Save", -1),
					p(". ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			f("section", me, [f("div", he, [t[17] ||= f("h2", {
				id: "arr-sync-heading",
				class: "admin-integrations__section-title"
			}, "Arr sync (TRaSH-Guides)", -1), O.value ? (g(), l(i, {
				key: 0,
				tone: O.value.enabled ? "success" : "neutral"
			}, {
				default: x(() => [p(v(O.value.enabled ? "Enabled" : "Disabled"), 1)]),
				_: 1
			}, 8, ["tone"])) : u("", !0)]), f("div", ge, [k.value ? (g(), d("div", _e, [m(s, {
				variant: "text",
				lines: 3
			})])) : A.value ? (g(), l(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load sync status",
				description: A.value
			}, {
				actions: x(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: x(() => [...t[18] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : O.value === null ? (g(), d("p", ve, " No sync status available. ")) : (g(), d(ae, { key: 3 }, [f("dl", ye, [
				t[19] ||= f("dt", { class: "admin-integrations__dt" }, "Last sync", -1),
				f("dd", be, v(O.value.last_sync_at ?? "Never synced"), 1),
				t[20] ||= f("dt", { class: "admin-integrations__dt" }, "Auto-sync", -1),
				f("dd", xe, [m(a, {
					"model-value": O.value.enabled,
					label: O.value.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": $e
				}, null, 8, ["model-value", "label"])])
			]), f("div", Se, [m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				loading: j.value,
				onClick: Qe
			}, {
				default: x(() => [p(v(j.value ? "Syncing" : "Sync now"), 1)]),
				_: 1
			}, 8, ["loading"])])], 64))])]),
			f("section", Ce, [t[23] ||= f("div", { class: "admin-integrations__section-head" }, [f("h2", {
				id: "auth-providers-heading",
				class: "admin-integrations__section-title"
			}, " Authentication providers ")], -1), I.value ? (g(), d("div", we, [m(s, {
				variant: "text",
				lines: 4
			})])) : L.value ? (g(), l(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load auth providers",
				description: L.value
			}, {
				actions: x(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: x(() => [...t[21] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (g(), d("div", Te, [(g(), d(ae, null, ue(w, (e) => f("div", {
				key: e,
				class: "admin-integrations__provider"
			}, [f("div", Ee, [f("span", De, v(h[e]), 1), m(i, { tone: V(e) ? "success" : "neutral" }, {
				default: x(() => [p(v(V(e) ? "Enabled" : "Disabled"), 1)]),
				_: 2
			}, 1032, ["tone"])]), f("div", Oe, [m(a, {
				"model-value": V(e),
				label: `Enable ${h[e]}`,
				"onUpdate:modelValue": () => et(e, V(e))
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), m(r, {
				variant: "outline",
				size: "sm",
				"left-icon": "settings",
				"aria-label": `Configure ${h[e]}`,
				onClick: (t) => lt(e)
			}, {
				default: x(() => [...t[22] ||= [p(" Configure ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])), 64))]))]),
			m(o, {
				modelValue: H.value,
				"onUpdate:modelValue": t[5] ||= (e) => H.value = e,
				title: "Configure OIDC",
				onClose: nt
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: nt
				}, {
					default: x(() => [...t[28] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: rt
				}, {
					default: x(() => [...t[29] ||= [p("Save OIDC", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-integrations__form",
					onSubmit: fe(rt, ["prevent"])
				}, [
					f("label", ke, [t[24] ||= f("span", { class: "admin-integrations__label" }, "Provider URL", -1), S(f("input", {
						"onUpdate:modelValue": t[0] ||= (e) => U.value.provider_url = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "https://idp.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, U.value.provider_url]])]),
					f("label", Ae, [t[25] ||= f("span", { class: "admin-integrations__label" }, "Client ID", -1), S(f("input", {
						"onUpdate:modelValue": t[1] ||= (e) => U.value.client_id = e,
						type: "text",
						class: "admin-integrations__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, U.value.client_id]])]),
					f("label", je, [
						t[26] ||= f("span", { class: "admin-integrations__label" }, "Client secret", -1),
						f("span", Me, v(R.value?.configured ? "Leave blank to keep the current secret." : "Required when configuring for the first time."), 1),
						f("div", Ne, [S(f("input", {
							"onUpdate:modelValue": t[2] ||= (e) => U.value.client_secret = e,
							type: K.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: R.value?.configured ? "(unchanged)" : "Client secret",
							autocomplete: "new-password"
						}, null, 8, Pe), [[de, U.value.client_secret]]), m(r, {
							variant: "ghost",
							size: "sm",
							"left-icon": K.value ? "eye-off" : "eye",
							"aria-label": K.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => K.value = !K.value
						}, {
							default: x(() => [p(v(K.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					f("label", Fe, [t[27] ||= f("span", { class: "admin-integrations__label" }, "Scopes", -1), S(f("input", {
						"onUpdate:modelValue": t[4] ||= (e) => U.value.scopes = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "openid profile email",
						autocomplete: "off"
					}, null, 512), [[b, U.value.scopes]])]),
					G.value ? (g(), d("p", Ie, v(G.value), 1)) : u("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(o, {
				modelValue: q.value,
				"onUpdate:modelValue": t[15] ||= (e) => q.value = e,
				title: "Configure LDAP",
				size: "lg",
				onClose: at
			}, {
				footer: x(() => [
					m(r, {
						variant: "ghost",
						size: "sm",
						onClick: at
					}, {
						default: x(() => [...t[37] ||= [p("Cancel", -1)]]),
						_: 1
					}),
					m(r, {
						variant: "outline",
						size: "sm",
						"left-icon": "settings",
						loading: X.value,
						disabled: Y.value,
						onClick: st
					}, {
						default: x(() => [...t[38] ||= [p(" Test connection ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"]),
					m(r, {
						variant: "solid",
						size: "sm",
						loading: Y.value,
						disabled: X.value,
						onClick: $
					}, {
						default: x(() => [...t[39] ||= [p(" Save LDAP ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"])
				]),
				default: x(() => [f("form", {
					class: "admin-integrations__form",
					onSubmit: fe($, ["prevent"])
				}, [
					f("label", Le, [t[30] ||= f("span", { class: "admin-integrations__label" }, "Host", -1), S(f("input", {
						"onUpdate:modelValue": t[6] ||= (e) => J.value.host = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "ldap.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, J.value.host]])]),
					f("label", Re, [t[31] ||= f("span", { class: "admin-integrations__label" }, "Port", -1), f("input", {
						value: J.value.port,
						type: "number",
						min: "1",
						max: "65535",
						class: "admin-integrations__input",
						autocomplete: "off",
						onInput: t[7] ||= (e) => ct(e.target.value)
					}, null, 40, ze)]),
					m(a, {
						modelValue: J.value.ssl,
						"onUpdate:modelValue": t[8] ||= (e) => J.value.ssl = e,
						label: "Use SSL"
					}, null, 8, ["modelValue"]),
					f("label", Be, [t[32] ||= f("span", { class: "admin-integrations__label" }, "Base DN", -1), S(f("input", {
						"onUpdate:modelValue": t[9] ||= (e) => J.value.base_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "dc=example,dc=com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, J.value.base_dn]])]),
					f("label", Ve, [t[33] ||= f("span", { class: "admin-integrations__label" }, "Bind DN", -1), S(f("input", {
						"onUpdate:modelValue": t[10] ||= (e) => J.value.bind_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admin,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[b, J.value.bind_dn]])]),
					f("label", He, [
						t[34] ||= f("span", { class: "admin-integrations__label" }, "Bind password", -1),
						f("span", Ue, v(z.value?.configured ? "Leave blank to keep the current password." : "Required when configuring for the first time."), 1),
						f("div", We, [S(f("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value.bind_pw = e,
							type: Q.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: z.value?.configured ? "(unchanged)" : "Bind password",
							autocomplete: "new-password"
						}, null, 8, Ge), [[de, J.value.bind_pw]]), m(r, {
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
					f("label", Ke, [t[35] ||= f("span", { class: "admin-integrations__label" }, "User filter", -1), S(f("input", {
						"onUpdate:modelValue": t[13] ||= (e) => J.value.user_filter = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "(uid=%s)",
						autocomplete: "off"
					}, null, 512), [[b, J.value.user_filter]])]),
					f("label", qe, [t[36] ||= f("span", { class: "admin-integrations__label" }, "Admin group DN", -1), S(f("input", {
						"onUpdate:modelValue": t[14] ||= (e) => J.value.admin_group = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admins,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[b, J.value.admin_group]])]),
					Z.value ? (g(), d("p", Je, v(Z.value), 1)) : u("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-0c47c178"]]);
//#endregion
export { w as default };

//# sourceMappingURL=IntegrationsPage-BWGxwe7k.js.map