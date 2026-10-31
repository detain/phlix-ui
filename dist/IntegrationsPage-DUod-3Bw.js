import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./integrations-tqZQFkvO.js";
import { t as ee } from "./useToastStore-Bu-iYU7r.js";
import { t as r } from "./Badge-C6LNO9Kk.js";
import { t as te } from "./PageHint-BlhPmafC.js";
import { t as i } from "./helpLinks-iarZuNmw.js";
import { t as a } from "./Button-1sKEdGjj.js";
import { t as o } from "./Modal-BU4hJGBA.js";
import { t as s } from "./Switch-C1Wv5sN2.js";
import { t as c } from "./Skeleton-B2Mt2L00.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { n as ne } from "./Icon-CIbfiPrs.js";
import { Fragment as re, computed as ie, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ae, onBeforeUnmount as oe, onMounted as se, openBlock as _, ref as v, renderList as ce, toDisplayString as y, unref as le, vModelDynamic as ue, vModelText as b, withCtx as x, withDirectives as S, withModifiers as de } from "vue";
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
}, Je = 3e4, C = "openid profile email", w = /*#__PURE__*/ ne(/* @__PURE__ */ g({
	__name: "IntegrationsPage",
	props: { client: {} },
	setup(ne) {
		let g = {
			oidc: "OIDC",
			ldap: "LDAP"
		}, w = ["oidc", "ldap"], Ye = ne, T = ae("apiBase", ""), Xe = ie(() => typeof T == "string" ? T : T?.value ?? ""), E = new n(Ye.client ?? new e({ baseUrl: Xe.value })), D = ee(), O = v(null), k = v(!0), A = v(null), j = v(!1), M = null;
		function N() {
			M !== null && (clearTimeout(M), M = null);
		}
		async function P() {
			k.value = !0, A.value = null;
			try {
				O.value = await E.getSyncStatus();
			} catch (e) {
				A.value = t(e, "Failed to load sync status."), D.error(A.value);
			} finally {
				k.value = !1;
			}
		}
		async function Ze() {
			if (j.value) return;
			j.value = !0;
			let e = !1;
			N(), M = setTimeout(() => {
				e = !0, j.value = !1, D.error("Sync timed out after 30 seconds. Check the server logs.");
			}, Je);
			try {
				let t = await E.triggerSync();
				if (N(), e) return;
				t.success ? (D.success(t.message || "Sync complete."), await P()) : D.error(t.message || "Sync failed.");
			} catch (n) {
				if (N(), e) return;
				D.error(t(n, "Sync request failed."));
			} finally {
				e || (j.value = !1);
			}
		}
		async function Qe(e) {
			try {
				await E.setSyncEnabled(e), D.success(e ? "Auto-sync enabled." : "Auto-sync disabled."), await P();
			} catch (e) {
				D.error(t(e, "Failed to update sync setting."));
			}
		}
		let F = v([]), I = v(!0), L = v(null), R = v(null), z = v(null);
		async function B() {
			I.value = !0, L.value = null;
			try {
				F.value = await E.listProviders();
			} catch (e) {
				L.value = t(e, "Failed to load auth providers."), D.error(L.value);
			} finally {
				I.value = !1;
			}
		}
		function V(e) {
			return F.value.find((t) => t.name === e)?.live === !0;
		}
		async function $e(e, n) {
			try {
				n ? (await E.disableProvider(e), D.success(`${g[e]} disabled.`)) : (await E.enableProvider(e), D.success(`${g[e]} enabled.`)), await B();
			} catch (n) {
				D.error(t(n, `Failed to update ${g[e]}.`));
			}
		}
		let H = v(!1), U = v({
			provider_url: "",
			client_id: "",
			client_secret: "",
			scopes: C
		}), W = v(!1), G = v(""), K = v(!1);
		async function et() {
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
				D.error(t(e, "Failed to load OIDC settings."));
			}
			H.value = !0;
		}
		function tt() {
			H.value = !1, G.value = "";
		}
		async function nt() {
			if (G.value = "", !U.value.provider_url.trim()) G.value = "Provider URL is required.";
			else if (!U.value.client_id.trim()) G.value = "Client ID is required.";
			else {
				W.value = !0;
				try {
					let e = {
						provider_url: U.value.provider_url.trim(),
						client_id: U.value.client_id.trim(),
						scopes: U.value.scopes.trim() || C
					};
					U.value.client_secret.trim() && (e.client_secret = U.value.client_secret), await E.saveOidcSettings(e), D.success("OIDC settings saved."), H.value = !1, R.value = await E.getOidcSettings(), await B();
				} catch (e) {
					G.value = t(e, "Failed to save OIDC settings.");
				} finally {
					W.value = !1;
				}
			}
		}
		let q = v(!1), J = v({
			host: "",
			port: 389,
			ssl: !1,
			base_dn: "",
			bind_dn: "",
			bind_pw: "",
			user_filter: "",
			admin_group: ""
		}), Y = v(!1), X = v(!1), Z = v(""), Q = v(!1);
		async function rt() {
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
				D.error(t(e, "Failed to load LDAP settings."));
			}
			q.value = !0;
		}
		function it() {
			q.value = !1, Z.value = "";
		}
		function at() {
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
					await E.saveLdapSettings(at()), D.success("LDAP settings saved."), q.value = !1, z.value = await E.getLdapSettings(), await B();
				} catch (e) {
					Z.value = t(e, "Failed to save LDAP settings.");
				} finally {
					Y.value = !1;
				}
			}
		}
		async function ot() {
			X.value = !0;
			try {
				let e = await E.testLdapConnection(at());
				e.success ? D.success(e.message || "Connection OK.") : D.error(e.message || "Connection failed.");
			} catch (e) {
				D.error(t(e, "LDAP connection test failed."));
			} finally {
				X.value = !1;
			}
		}
		function st(e) {
			let t = parseInt(e, 10);
			J.value.port = Number.isNaN(t) ? 0 : t;
		}
		function ct(e) {
			e === "oidc" ? et() : rt();
		}
		return se(() => {
			P(), B();
		}), oe(N), (e, t) => (_(), f("section", fe, [
			t[40] ||= p("header", { class: "admin-integrations__head" }, [p("h1", {
				id: "integrations-heading",
				class: "admin-integrations__title"
			}, "Integrations")], -1),
			h(te, {
				links: le(i).integrations.links,
				details: le(i).integrations.details,
				title: "What’s on this page"
			}, {
				default: x(() => [...t[16] ||= [
					m(" Connect Phlix to outside tools. ", -1),
					p("strong", null, "Arr sync", -1),
					m(" pulls quality-profile settings from TRaSH-Guides for Radarr/Sonarr — ", -1),
					p("strong", null, "Sync now", -1),
					m(" runs it once, and ", -1),
					p("strong", null, "Auto-sync", -1),
					m(" keeps it updated on a schedule. The ", -1),
					p("strong", null, "OIDC", -1),
					m(" and ", -1),
					p("strong", null, "LDAP", -1),
					m(" sections let people sign in with your company's single-sign-on or directory: flip a section's switch to turn that login method on, then use ", -1),
					p("strong", null, "Configure", -1),
					m(" to enter the connection details (provider URL, client ID/secret for OIDC; host, port, base DN, and bind credentials for LDAP). ", -1),
					p("strong", null, "Test connection", -1),
					m(" in the LDAP dialog checks your settings before you ", -1),
					p("strong", null, "Save", -1),
					m(". ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			p("section", pe, [p("div", me, [t[17] ||= p("h2", {
				id: "arr-sync-heading",
				class: "admin-integrations__section-title"
			}, "Arr sync (TRaSH-Guides)", -1), O.value ? (_(), u(r, {
				key: 0,
				tone: O.value.enabled ? "success" : "neutral"
			}, {
				default: x(() => [m(y(O.value.enabled ? "Enabled" : "Disabled"), 1)]),
				_: 1
			}, 8, ["tone"])) : d("", !0)]), p("div", he, [k.value ? (_(), f("div", ge, [h(c, {
				variant: "text",
				lines: 3
			})])) : A.value ? (_(), u(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load sync status",
				description: A.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: x(() => [...t[18] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : O.value === null ? (_(), f("p", _e, " No sync status available. ")) : (_(), f(re, { key: 3 }, [p("dl", ve, [
				t[19] ||= p("dt", { class: "admin-integrations__dt" }, "Last sync", -1),
				p("dd", ye, y(O.value.last_sync_at ?? "Never synced"), 1),
				t[20] ||= p("dt", { class: "admin-integrations__dt" }, "Auto-sync", -1),
				p("dd", be, [h(s, {
					"model-value": O.value.enabled,
					label: O.value.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": Qe
				}, null, 8, ["model-value", "label"])])
			]), p("div", xe, [h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				loading: j.value,
				onClick: Ze
			}, {
				default: x(() => [m(y(j.value ? "Syncing" : "Sync now"), 1)]),
				_: 1
			}, 8, ["loading"])])], 64))])]),
			p("section", Se, [t[23] ||= p("div", { class: "admin-integrations__section-head" }, [p("h2", {
				id: "auth-providers-heading",
				class: "admin-integrations__section-title"
			}, " Authentication providers ")], -1), I.value ? (_(), f("div", Ce, [h(c, {
				variant: "text",
				lines: 4
			})])) : L.value ? (_(), u(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load auth providers",
				description: L.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: x(() => [...t[21] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (_(), f("div", we, [(_(), f(re, null, ce(w, (e) => p("div", {
				key: e,
				class: "admin-integrations__provider"
			}, [p("div", Te, [p("span", Ee, y(g[e]), 1), h(r, { tone: V(e) ? "success" : "neutral" }, {
				default: x(() => [m(y(V(e) ? "Enabled" : "Disabled"), 1)]),
				_: 2
			}, 1032, ["tone"])]), p("div", De, [h(s, {
				"model-value": V(e),
				label: `Enable ${g[e]}`,
				"onUpdate:modelValue": () => $e(e, V(e))
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), h(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "settings",
				"aria-label": `Configure ${g[e]}`,
				onClick: (t) => ct(e)
			}, {
				default: x(() => [...t[22] ||= [m(" Configure ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])), 64))]))]),
			h(o, {
				modelValue: H.value,
				"onUpdate:modelValue": t[5] ||= (e) => H.value = e,
				title: "Configure OIDC",
				onClose: tt
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: tt
				}, {
					default: x(() => [...t[28] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: nt
				}, {
					default: x(() => [...t[29] ||= [m("Save OIDC", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-integrations__form",
					onSubmit: de(nt, ["prevent"])
				}, [
					p("label", Oe, [t[24] ||= p("span", { class: "admin-integrations__label" }, "Provider URL", -1), S(p("input", {
						"onUpdate:modelValue": t[0] ||= (e) => U.value.provider_url = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "https://idp.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, U.value.provider_url]])]),
					p("label", ke, [t[25] ||= p("span", { class: "admin-integrations__label" }, "Client ID", -1), S(p("input", {
						"onUpdate:modelValue": t[1] ||= (e) => U.value.client_id = e,
						type: "text",
						class: "admin-integrations__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, U.value.client_id]])]),
					p("label", Ae, [
						t[26] ||= p("span", { class: "admin-integrations__label" }, "Client secret", -1),
						p("span", je, y(R.value?.configured ? "Leave blank to keep the current secret." : "Required when configuring for the first time."), 1),
						p("div", Me, [S(p("input", {
							"onUpdate:modelValue": t[2] ||= (e) => U.value.client_secret = e,
							type: K.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: R.value?.configured ? "(unchanged)" : "Client secret",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other"
						}, null, 8, Ne), [[ue, U.value.client_secret]]), h(a, {
							variant: "ghost",
							size: "sm",
							"left-icon": K.value ? "eye-off" : "eye",
							"aria-label": K.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => K.value = !K.value
						}, {
							default: x(() => [m(y(K.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					p("label", Pe, [t[27] ||= p("span", { class: "admin-integrations__label" }, "Scopes", -1), S(p("input", {
						"onUpdate:modelValue": t[4] ||= (e) => U.value.scopes = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "openid profile email",
						autocomplete: "off"
					}, null, 512), [[b, U.value.scopes]])]),
					G.value ? (_(), f("p", Fe, y(G.value), 1)) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				modelValue: q.value,
				"onUpdate:modelValue": t[15] ||= (e) => q.value = e,
				title: "Configure LDAP",
				size: "lg",
				onClose: it
			}, {
				footer: x(() => [
					h(a, {
						variant: "ghost",
						size: "sm",
						onClick: it
					}, {
						default: x(() => [...t[37] ||= [m("Cancel", -1)]]),
						_: 1
					}),
					h(a, {
						variant: "outline",
						size: "sm",
						"left-icon": "settings",
						loading: X.value,
						disabled: Y.value,
						onClick: ot
					}, {
						default: x(() => [...t[38] ||= [m(" Test connection ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"]),
					h(a, {
						variant: "solid",
						size: "sm",
						loading: Y.value,
						disabled: X.value,
						onClick: $
					}, {
						default: x(() => [...t[39] ||= [m(" Save LDAP ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"])
				]),
				default: x(() => [p("form", {
					class: "admin-integrations__form",
					onSubmit: de($, ["prevent"])
				}, [
					p("label", Ie, [t[30] ||= p("span", { class: "admin-integrations__label" }, "Host", -1), S(p("input", {
						"onUpdate:modelValue": t[6] ||= (e) => J.value.host = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "ldap.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, J.value.host]])]),
					p("label", Le, [t[31] ||= p("span", { class: "admin-integrations__label" }, "Port", -1), p("input", {
						value: J.value.port,
						type: "number",
						min: "1",
						max: "65535",
						class: "admin-integrations__input",
						autocomplete: "off",
						onInput: t[7] ||= (e) => st(e.target.value)
					}, null, 40, Re)]),
					h(s, {
						modelValue: J.value.ssl,
						"onUpdate:modelValue": t[8] ||= (e) => J.value.ssl = e,
						label: "Use SSL"
					}, null, 8, ["modelValue"]),
					p("label", ze, [t[32] ||= p("span", { class: "admin-integrations__label" }, "Base DN", -1), S(p("input", {
						"onUpdate:modelValue": t[9] ||= (e) => J.value.base_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "dc=example,dc=com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, J.value.base_dn]])]),
					p("label", Be, [t[33] ||= p("span", { class: "admin-integrations__label" }, "Bind DN", -1), S(p("input", {
						"onUpdate:modelValue": t[10] ||= (e) => J.value.bind_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admin,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[b, J.value.bind_dn]])]),
					p("label", Ve, [
						t[34] ||= p("span", { class: "admin-integrations__label" }, "Bind password", -1),
						p("span", He, y(z.value?.configured ? "Leave blank to keep the current password." : "Required when configuring for the first time."), 1),
						p("div", Ue, [S(p("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value.bind_pw = e,
							type: Q.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: z.value?.configured ? "(unchanged)" : "Bind password",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other"
						}, null, 8, We), [[ue, J.value.bind_pw]]), h(a, {
							variant: "ghost",
							size: "sm",
							"left-icon": Q.value ? "eye-off" : "eye",
							"aria-label": Q.value ? "Hide password" : "Show password",
							onClick: t[12] ||= (e) => Q.value = !Q.value
						}, {
							default: x(() => [m(y(Q.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					p("label", Ge, [t[35] ||= p("span", { class: "admin-integrations__label" }, "User filter", -1), S(p("input", {
						"onUpdate:modelValue": t[13] ||= (e) => J.value.user_filter = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "(uid=%s)",
						autocomplete: "off"
					}, null, 512), [[b, J.value.user_filter]])]),
					p("label", Ke, [t[36] ||= p("span", { class: "admin-integrations__label" }, "Admin group DN", -1), S(p("input", {
						"onUpdate:modelValue": t[14] ||= (e) => J.value.admin_group = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admins,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[b, J.value.admin_group]])]),
					Z.value ? (_(), f("p", qe, y(Z.value), 1)) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-3f0bfc79"]]);
export { w as default };

//# sourceMappingURL=IntegrationsPage-DUod-3Bw.js.map