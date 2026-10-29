import { n as e } from "./Icon-CIwTuFLd.js";
import { l as t, t as ee, y as n } from "./client-CRZ_SWB1.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as ne } from "./EmptyState-BAyOxAcK.js";
import { t as r } from "./Button-BuG0GvCa.js";
import { t as i } from "./Badge-A88fI41k.js";
import { t as a } from "./Switch-ibkXiiN-.js";
import { t as o } from "./Modal-D0CvVyuE.js";
import { t as s } from "./Skeleton-rHw-IJtl.js";
import { t as re } from "./PageHint-BGYg6qRJ.js";
import { t as ie } from "./integrations-DLAG9ISY.js";
import { t as c } from "./helpLinks-B4Y1FteC.js";
import { Fragment as l, computed as ae, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as oe, onBeforeUnmount as se, onMounted as ce, openBlock as _, ref as v, renderList as le, toDisplayString as y, unref as ue, vModelDynamic as de, vModelText as b, withCtx as x, withDirectives as S, withModifiers as fe } from "vue";
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
}, Ye = 3e4, C = "openid profile email", w = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "IntegrationsPage",
	props: { client: {} },
	setup(e) {
		let g = {
			oidc: "OIDC",
			ldap: "LDAP"
		}, w = ["oidc", "ldap"], Xe = e, T = oe("apiBase", ""), Ze = ae(() => typeof T == "string" ? T : T?.value ?? ""), E = new ie(Xe.client ?? new ee({
			baseUrl: Ze.value,
			tokenStore: new t()
		})), D = te(), O = v(null), k = v(!0), A = v(null), j = v(!1), M = null;
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
		let F = v([]), I = v(!0), L = v(null), R = v(null), z = v(null);
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
			return F.value.find((t) => t.name === e)?.live === !0;
		}
		async function et(e, t) {
			try {
				t ? (await E.disableProvider(e), D.success(`${g[e]} disabled.`)) : (await E.enableProvider(e), D.success(`${g[e]} enabled.`)), await B();
			} catch (t) {
				D.error(n(t, `Failed to update ${g[e]}.`));
			}
		}
		let H = v(!1), U = v({
			provider_url: "",
			client_id: "",
			client_secret: "",
			scopes: C
		}), W = v(!1), G = v(""), K = v(!1);
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
		return ce(() => {
			P(), B();
		}), se(N), (e, t) => (_(), f("section", pe, [
			t[40] ||= p("header", { class: "admin-integrations__head" }, [p("h1", {
				id: "integrations-heading",
				class: "admin-integrations__title"
			}, "Integrations")], -1),
			h(re, {
				links: ue(c).integrations.links,
				details: ue(c).integrations.details,
				title: "What's on this page"
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
			p("section", me, [p("div", he, [t[17] ||= p("h2", {
				id: "arr-sync-heading",
				class: "admin-integrations__section-title"
			}, "Arr sync (TRaSH-Guides)", -1), O.value ? (_(), u(i, {
				key: 0,
				tone: O.value.enabled ? "success" : "neutral"
			}, {
				default: x(() => [m(y(O.value.enabled ? "Enabled" : "Disabled"), 1)]),
				_: 1
			}, 8, ["tone"])) : d("", !0)]), p("div", ge, [k.value ? (_(), f("div", _e, [h(s, {
				variant: "text",
				lines: 3
			})])) : A.value ? (_(), u(ne, {
				key: 1,
				icon: "alert",
				title: "Couldn't load sync status",
				description: A.value
			}, {
				actions: x(() => [h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: x(() => [...t[18] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : O.value === null ? (_(), f("p", ve, " No sync status available. ")) : (_(), f(l, { key: 3 }, [p("dl", ye, [
				t[19] ||= p("dt", { class: "admin-integrations__dt" }, "Last sync", -1),
				p("dd", be, y(O.value.last_sync_at ?? "Never synced"), 1),
				t[20] ||= p("dt", { class: "admin-integrations__dt" }, "Auto-sync", -1),
				p("dd", xe, [h(a, {
					"model-value": O.value.enabled,
					label: O.value.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": $e
				}, null, 8, ["model-value", "label"])])
			]), p("div", Se, [h(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				loading: j.value,
				onClick: Qe
			}, {
				default: x(() => [m(y(j.value ? "Syncing" : "Sync now"), 1)]),
				_: 1
			}, 8, ["loading"])])], 64))])]),
			p("section", Ce, [t[23] ||= p("div", { class: "admin-integrations__section-head" }, [p("h2", {
				id: "auth-providers-heading",
				class: "admin-integrations__section-title"
			}, " Authentication providers ")], -1), I.value ? (_(), f("div", we, [h(s, {
				variant: "text",
				lines: 4
			})])) : L.value ? (_(), u(ne, {
				key: 1,
				icon: "alert",
				title: "Couldn't load auth providers",
				description: L.value
			}, {
				actions: x(() => [h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: x(() => [...t[21] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (_(), f("div", Te, [(_(), f(l, null, le(w, (e) => p("div", {
				key: e,
				class: "admin-integrations__provider"
			}, [p("div", Ee, [p("span", De, y(g[e]), 1), h(i, { tone: V(e) ? "success" : "neutral" }, {
				default: x(() => [m(y(V(e) ? "Enabled" : "Disabled"), 1)]),
				_: 2
			}, 1032, ["tone"])]), p("div", Oe, [h(a, {
				"model-value": V(e),
				label: `Enable ${g[e]}`,
				"onUpdate:modelValue": () => et(e, V(e))
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), h(r, {
				variant: "outline",
				size: "sm",
				"left-icon": "settings",
				"aria-label": `Configure ${g[e]}`,
				onClick: (t) => lt(e)
			}, {
				default: x(() => [...t[22] ||= [m(" Configure ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])), 64))]))]),
			h(o, {
				modelValue: H.value,
				"onUpdate:modelValue": t[5] ||= (e) => H.value = e,
				title: "Configure OIDC",
				onClose: nt
			}, {
				footer: x(() => [h(r, {
					variant: "ghost",
					size: "sm",
					onClick: nt
				}, {
					default: x(() => [...t[28] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: rt
				}, {
					default: x(() => [...t[29] ||= [m("Save OIDC", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-integrations__form",
					onSubmit: fe(rt, ["prevent"])
				}, [
					p("label", ke, [t[24] ||= p("span", { class: "admin-integrations__label" }, "Provider URL", -1), S(p("input", {
						"onUpdate:modelValue": t[0] ||= (e) => U.value.provider_url = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "https://idp.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, U.value.provider_url]])]),
					p("label", Ae, [t[25] ||= p("span", { class: "admin-integrations__label" }, "Client ID", -1), S(p("input", {
						"onUpdate:modelValue": t[1] ||= (e) => U.value.client_id = e,
						type: "text",
						class: "admin-integrations__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, U.value.client_id]])]),
					p("label", je, [
						t[26] ||= p("span", { class: "admin-integrations__label" }, "Client secret", -1),
						p("span", Me, y(R.value?.configured ? "Leave blank to keep the current secret." : "Required when configuring for the first time."), 1),
						p("div", Ne, [S(p("input", {
							"onUpdate:modelValue": t[2] ||= (e) => U.value.client_secret = e,
							type: K.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: R.value?.configured ? "(unchanged)" : "Client secret",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other"
						}, null, 8, Pe), [[de, U.value.client_secret]]), h(r, {
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
					p("label", Fe, [t[27] ||= p("span", { class: "admin-integrations__label" }, "Scopes", -1), S(p("input", {
						"onUpdate:modelValue": t[4] ||= (e) => U.value.scopes = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "openid profile email",
						autocomplete: "off"
					}, null, 512), [[b, U.value.scopes]])]),
					G.value ? (_(), f("p", Ie, y(G.value), 1)) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				modelValue: q.value,
				"onUpdate:modelValue": t[15] ||= (e) => q.value = e,
				title: "Configure LDAP",
				size: "lg",
				onClose: at
			}, {
				footer: x(() => [
					h(r, {
						variant: "ghost",
						size: "sm",
						onClick: at
					}, {
						default: x(() => [...t[37] ||= [m("Cancel", -1)]]),
						_: 1
					}),
					h(r, {
						variant: "outline",
						size: "sm",
						"left-icon": "settings",
						loading: X.value,
						disabled: Y.value,
						onClick: st
					}, {
						default: x(() => [...t[38] ||= [m(" Test connection ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"]),
					h(r, {
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
					onSubmit: fe($, ["prevent"])
				}, [
					p("label", Le, [t[30] ||= p("span", { class: "admin-integrations__label" }, "Host", -1), S(p("input", {
						"onUpdate:modelValue": t[6] ||= (e) => J.value.host = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "ldap.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, J.value.host]])]),
					p("label", Re, [t[31] ||= p("span", { class: "admin-integrations__label" }, "Port", -1), p("input", {
						value: J.value.port,
						type: "number",
						min: "1",
						max: "65535",
						class: "admin-integrations__input",
						autocomplete: "off",
						onInput: t[7] ||= (e) => ct(e.target.value)
					}, null, 40, ze)]),
					h(a, {
						modelValue: J.value.ssl,
						"onUpdate:modelValue": t[8] ||= (e) => J.value.ssl = e,
						label: "Use SSL"
					}, null, 8, ["modelValue"]),
					p("label", Be, [t[32] ||= p("span", { class: "admin-integrations__label" }, "Base DN", -1), S(p("input", {
						"onUpdate:modelValue": t[9] ||= (e) => J.value.base_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "dc=example,dc=com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, J.value.base_dn]])]),
					p("label", Ve, [t[33] ||= p("span", { class: "admin-integrations__label" }, "Bind DN", -1), S(p("input", {
						"onUpdate:modelValue": t[10] ||= (e) => J.value.bind_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admin,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[b, J.value.bind_dn]])]),
					p("label", He, [
						t[34] ||= p("span", { class: "admin-integrations__label" }, "Bind password", -1),
						p("span", Ue, y(z.value?.configured ? "Leave blank to keep the current password." : "Required when configuring for the first time."), 1),
						p("div", We, [S(p("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value.bind_pw = e,
							type: Q.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: z.value?.configured ? "(unchanged)" : "Bind password",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other"
						}, null, 8, Ge), [[de, J.value.bind_pw]]), h(r, {
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
					p("label", Ke, [t[35] ||= p("span", { class: "admin-integrations__label" }, "User filter", -1), S(p("input", {
						"onUpdate:modelValue": t[13] ||= (e) => J.value.user_filter = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "(uid=%s)",
						autocomplete: "off"
					}, null, 512), [[b, J.value.user_filter]])]),
					p("label", qe, [t[36] ||= p("span", { class: "admin-integrations__label" }, "Admin group DN", -1), S(p("input", {
						"onUpdate:modelValue": t[14] ||= (e) => J.value.admin_group = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admins,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[b, J.value.admin_group]])]),
					Z.value ? (_(), f("p", Je, y(Z.value), 1)) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-eaf03e35"]]);
//#endregion
export { w as default };

//# sourceMappingURL=IntegrationsPage-IM5fHqGl.js.map