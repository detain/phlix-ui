import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./client-D80As4Gx.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Spinner-CvPu9kN4.js";
import { t as o } from "./Button-DWa6Ld_Z.js";
import { t as s } from "./EmptyState-ZlI5t4KT.js";
import { Fragment as c, createBlock as l, createElementBlock as u, createElementVNode as d, createStaticVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, onMounted as g, openBlock as _, ref as v, renderList as y, toDisplayString as b, withCtx as x } from "vue";
//#region src/pages/SecuritySettingsPage.vue?vue&type=script&setup=true&lang.ts
var S = { class: "security-settings-page" }, C = { class: "security-settings-page__card" }, w = { class: "security-settings-page__card-body" }, T = {
	key: 3,
	class: "credentials-list"
}, E = { class: "credential-item__icon" }, D = { class: "credential-item__info" }, O = { class: "credential-item__id" }, k = { class: "credential-item__meta" }, A = { class: "security-settings-page__card-footer" }, j = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "SecuritySettingsPage",
	setup(e) {
		let h = r(), j = i();
		function M() {
			return new n({ baseUrl: h.value });
		}
		let N = v([]), P = v(!0), F = v(null), I = v(!1), L = v(null);
		function R(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function z(e) {
			return e === "platform" ? "monitor" : "key";
		}
		function B(e) {
			return e === "platform" ? "Platform authenticator" : "Security key";
		}
		async function V() {
			P.value = !0, F.value = null;
			try {
				let e = await M().get("/api/v1/me/webauthn/credentials");
				N.value = e.credentials ?? [];
			} catch (e) {
				F.value = e instanceof Error ? e.message : "Failed to load credentials";
			} finally {
				P.value = !1;
			}
		}
		async function H(e) {
			if (confirm("Are you sure you want to delete this passkey? This action cannot be undone.")) {
				L.value = e;
				try {
					await M().delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(e)}`), j.success("Passkey deleted successfully"), await V();
				} catch (e) {
					j.error(e instanceof Error ? e.message : "Failed to delete passkey");
				} finally {
					L.value = null;
				}
			}
		}
		async function U() {
			I.value = !0;
			try {
				let e = M(), t = await e.post("/api/v1/auth/webauthn/register/options", {}), n = {
					challenge: Uint8Array.from(atob(t.challenge), (e) => e.charCodeAt(0)),
					rp: { name: "PHLIX" },
					pubKeyCredParams: [{
						type: "public-key",
						alg: -7
					}, {
						type: "public-key",
						alg: -257
					}],
					user: {
						id: Uint8Array.from(atob(t.user.id), (e) => e.charCodeAt(0)),
						name: "phlix user",
						displayName: "PHLIX User"
					},
					excludeCredentials: t.excludeCredentials?.map((e) => ({
						id: Uint8Array.from(atob(e.id), (e) => e.charCodeAt(0)),
						type: "public-key"
					})),
					timeout: 6e4,
					attestation: "none",
					authenticatorSelection: {
						authenticatorAttachment: "cross-platform",
						residentKey: "preferred",
						userVerification: "preferred"
					}
				}, r = await navigator.credentials.create({ publicKey: n });
				if (!r) throw Error("No credential created");
				let i = r.response, a = (e) => {
					let t = e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
					return btoa(String.fromCharCode(...t));
				}, o = {
					attestationObject: a(i.attestationObject),
					clientDataJSON: a(i.clientDataJSON),
					transports: i.getTransports ? i.getTransports() : []
				};
				await e.post("/api/v1/auth/webauthn/register/verify", {
					credential: o,
					challenge: t.challenge
				}), j.success("Passkey registered successfully"), await V();
			} catch (e) {
				e instanceof Error && e.name !== "NotAllowedError" && j.error(e.message);
			} finally {
				I.value = !1;
			}
		}
		function W() {
			V();
		}
		return g(() => {
			V();
		}), (e, n) => (_(), u("div", S, [
			n[4] ||= d("header", { class: "security-settings-page__head" }, [
				d("p", { class: "security-settings-page__eyebrow" }, "Account Security"),
				d("h1", { class: "security-settings-page__title" }, "Passkey Settings"),
				d("p", { class: "security-settings-page__desc" }, " Manage your passkeys (WebAuthn/FIDO2 credentials) for passwordless login. ")
			], -1),
			d("section", C, [
				n[3] ||= d("header", { class: "security-settings-page__card-header" }, [d("h2", { class: "security-settings-page__card-title" }, "Registered Passkeys")], -1),
				d("div", w, [P.value ? (_(), l(a, {
					key: 0,
					label: "Loading credentials..."
				})) : F.value ? (_(), l(s, {
					key: 1,
					icon: "alert",
					title: "Couldn't load passkeys",
					description: F.value
				}, {
					actions: x(() => [m(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "refresh",
						onClick: W
					}, {
						default: x(() => [...n[0] ||= [p(" Retry ", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : N.value.length === 0 ? (_(), l(s, {
					key: 2,
					icon: "key",
					title: "No passkeys registered",
					description: "Add a passkey to enable passwordless login on your devices."
				})) : (_(), u("ul", T, [(_(!0), u(c, null, y(N.value, (e) => (_(), u("li", {
					key: e.credential_id,
					class: "credential-item"
				}, [
					d("div", E, [m(t, { name: z(e.device_type) }, null, 8, ["name"])]),
					d("div", D, [d("span", O, b(e.credential_id.substring(0, 20)) + "... ", 1), d("span", k, b(B(e.device_type)) + " · Registered " + b(R(e.registered_at)), 1)]),
					m(o, {
						variant: "ghost",
						size: "sm",
						class: "credential-item__delete",
						disabled: L.value === e.credential_id,
						onClick: (t) => H(e.credential_id)
					}, {
						default: x(() => [L.value === e.credential_id ? (_(), l(a, {
							key: 0,
							size: "xs"
						})) : (_(), l(t, {
							key: 1,
							name: "trash"
						}))]),
						_: 2
					}, 1032, ["disabled", "onClick"])
				]))), 128))]))]),
				d("footer", A, [m(o, {
					variant: "solid",
					disabled: I.value,
					onClick: U
				}, {
					default: x(() => [I.value ? (_(), u(c, { key: 0 }, [m(a, {
						size: "xs",
						class: "mr-2"
					}), n[1] ||= p(" Starting... ", -1)], 64)) : (_(), u(c, { key: 1 }, [m(t, {
						name: "plus",
						class: "mr-2"
					}), n[2] ||= p(" Add Passkey ", -1)], 64))]),
					_: 1
				}, 8, ["disabled"])])
			]),
			n[5] ||= f("<section class=\"security-settings-page__info\" data-v-8f2a31e0><h3 class=\"security-settings-page__info-title\" data-v-8f2a31e0>What is a passkey?</h3><p data-v-8f2a31e0> A passkey is a FIDO2/WebAuthn credential that allows you to log in securely without a password. It uses public-key cryptography to protect your account from phishing and credential theft attacks. </p></section><section class=\"security-settings-page__notes\" data-v-8f2a31e0><h3 class=\"security-settings-page__notes-title\" data-v-8f2a31e0>Security Notes</h3><ul class=\"security-settings-page__notes-list\" data-v-8f2a31e0><li data-v-8f2a31e0>Passkeys are unique to each device and cannot be reused if lost.</li><li data-v-8f2a31e0>Keep backup codes or alternative login methods in a safe place.</li><li data-v-8f2a31e0>Deleting a passkey is permanent and cannot be undone.</li><li data-v-8f2a31e0>Platform authenticators (like Touch ID or Windows Hello) require the specific device.</li></ul></section>", 2)
		]));
	}
}), [["__scopeId", "data-v-8f2a31e0"]]);
//#endregion
export { j as t };

//# sourceMappingURL=SecuritySettingsPage-DZHYT5js.js.map