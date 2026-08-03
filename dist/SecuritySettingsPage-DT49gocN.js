import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CfPSBsz2.js";
import { l as n, p as r, t as i } from "./client-COHWZ2KC.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Spinner-B4iosRsg.js";
import { t as c } from "./Button-DuTfRWnu.js";
import { t as l } from "./EmptyState-DERkIIRd.js";
import { Fragment as u, computed as d, createBlock as f, createElementBlock as p, createElementVNode as m, createStaticVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, onMounted as ee, openBlock as y, ref as b, renderList as x, toDisplayString as S, withCtx as C } from "vue";
import { defineStore as w } from "pinia";
//#region src/composables/themeTokens.ts
var T = [
	"nocturne",
	"daylight",
	"midnight"
];
function E(e) {
	return T.includes(e);
}
var D = /* @__PURE__ */ "--accent.--accent-hover.--accent-active.--accent-soft.--accent-ring.--accent-text.--bg.--surface.--surface-2.--surface-3.--surface-glass.--surface-glass-strong.--text.--text-muted.--text-subtle.--text-faint.--text-on-accent.--border.--border-subtle.--border-strong.--error.--error-bg.--success.--success-bg.--warning.--warning-bg.--info.--info-bg.--grain-opacity.--vignette.--ambient.--color-bg.--color-surface.--color-surface-hover.--color-surface-elevated.--color-surface-active.--color-text.--color-text-secondary.--color-text-muted.--color-text-subtle.--color-primary.--color-primary-hover.--color-primary-active.--color-border.--color-border-subtle.--color-error.--color-error-bg.--color-success.--color-success-bg.--color-warning.--color-warning-bg.--color-info.--color-info-bg".split("."), O = new Set(D);
function k(e) {
	return O.has(e);
}
var A = 128, j = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, M = /^[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/, N = "[+-]?(?:[0-9]+(?:\\.[0-9]+)?|\\.[0-9]+)(?:%|deg)?", P = RegExp(`^(?:rgba?|hsla?)\\((?: *)${N}(?:(?: *)[,/](?: *)${N}){2,3}(?: *)\\)$`, "i"), F = ["transparent", "currentcolor"];
function I(e) {
	let t = e.trim();
	return t === "" || t.length > A ? !1 : F.includes(t.toLowerCase()) ? !0 : j.test(t) || P.test(t) || M.test(t);
}
function L(e) {
	let t = {};
	if (typeof e != "object" || !e || Array.isArray(e)) return t;
	for (let [n, r] of Object.entries(e)) k(n) && (typeof r != "string" || !I(r) || (t[n] = r.trim()));
	return t;
}
var R = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/, z = 64, B = /* @__PURE__ */ RegExp("[\\u0000-\\u001f\\u007f]");
function V(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return null;
	let t = e, n = typeof t.id == "string" ? t.id : "";
	if (!R.test(n)) return null;
	let r = typeof t.name == "string" ? t.name.trim() : "";
	if (r === "" || r.length > z || B.test(r)) return null;
	let i = typeof t.extends == "string" && R.test(t.extends) && t.extends !== n ? t.extends : null;
	return {
		id: n,
		name: r,
		dark: t.dark === !0,
		extends: i,
		tokens: L(t.tokens),
		source: typeof t.source == "string" && t.source !== "" ? t.source : null,
		builtIn: t.builtIn === !0 || E(n)
	};
}
var H = 8;
function U(e, t) {
	let n = new Map(t.map((e) => [e.id, e])), r = [], i = /* @__PURE__ */ new Set(), a = e;
	for (let e = 0; e < 8 && a !== null && !(i.has(a) || E(a)); e++) {
		let e = n.get(a);
		if (e === void 0) break;
		i.add(a), r.push(e), a = e.extends;
	}
	return r;
}
function W(e, t) {
	let n = {};
	for (let r of U(e, t).reverse()) n = {
		...n,
		...r.tokens
	};
	return n;
}
function G(e, t) {
	if (E(e)) return e;
	let n = U(e, t);
	for (let e of n) if (e.extends !== null && E(e.extends)) return e.extends;
	return n[0]?.dark === !1 ? "daylight" : "nocturne";
}
function K(e, t) {
	return E(e) || t.find((t) => t.id === e) === void 0 ? null : {
		id: e,
		base: G(e, t),
		tokens: W(e, t)
	};
}
function q(e, t) {
	for (let [n, r] of Object.entries(t)) k(n) && I(r) && e.style.setProperty(n, r);
}
function J(e) {
	for (let t of D) e.style.removeProperty(t);
}
var Y = "phlix.theme.active";
function X() {
	if (typeof localStorage > "u") return null;
	try {
		let e = localStorage.getItem(Y);
		if (e === null) return null;
		let t = JSON.parse(e);
		if (typeof t != "object" || !t || Array.isArray(t)) return null;
		let n = t, r = typeof n.id == "string" ? n.id : "";
		if (!R.test(r) || E(r)) return null;
		let i = typeof n.base == "string" && E(n.base) ? n.base : null;
		return i === null ? null : {
			id: r,
			base: i,
			tokens: L(n.tokens)
		};
	} catch {
		return null;
	}
}
function Z(e) {
	if (!(typeof localStorage > "u")) try {
		e === null ? localStorage.removeItem(Y) : localStorage.setItem(Y, JSON.stringify(e));
	} catch {}
}
//#endregion
//#region src/api/themes.ts
async function Q(e, t) {
	let r = await new i({
		baseUrl: e,
		tokenStore: typeof window < "u" ? new n() : void 0
	}).get("/api/v1/themes", void 0, t), a = Array.isArray(r.themes) ? r.themes : [], o = [];
	for (let e of a) {
		let t = V(e);
		t !== null && o.push(t);
	}
	return o;
}
//#endregion
//#region src/stores/useThemesStore.ts
var $ = w("themes", () => {
	let e = b([]), t = b(!1), n = b(!1), i = b(null), a = null;
	async function o(o, s = !1) {
		if (o !== "" && !(n.value && !s)) return a || (t.value = !0, i.value = null, a = (async () => {
			try {
				e.value = await Q(o), n.value = !0;
			} catch (e) {
				i.value = r(e, "Failed to load themes");
			} finally {
				t.value = !1, a = null;
			}
		})(), a);
	}
	let s = d(() => e.value.filter((e) => !e.builtIn));
	function c(t) {
		return e.value.find((e) => e.id === t);
	}
	function l(t) {
		return K(t, e.value);
	}
	return {
		items: e,
		loading: t,
		loaded: n,
		error: i,
		pluginThemes: s,
		load: o,
		byId: c,
		styleFor: l
	};
}), te = { class: "security-settings-page" }, ne = { class: "security-settings-page__card" }, re = { class: "security-settings-page__card-body" }, ie = {
	key: 3,
	class: "credentials-list"
}, ae = { class: "credential-item__icon" }, oe = { class: "credential-item__info" }, se = { class: "credential-item__id" }, ce = { class: "credential-item__meta" }, le = { class: "security-settings-page__card-footer" }, ue = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "SecuritySettingsPage",
	setup(e) {
		let n = a(), r = o();
		function d() {
			return new i({ baseUrl: n.value });
		}
		let v = b([]), w = b(!0), T = b(null), E = b(!1), D = b(null);
		function O(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function k(e) {
			return e === "platform" ? "monitor" : "key";
		}
		function A(e) {
			return e === "platform" ? "Platform authenticator" : "Security key";
		}
		async function j() {
			w.value = !0, T.value = null;
			try {
				let e = await d().get("/api/v1/me/webauthn/credentials");
				v.value = e.credentials ?? [];
			} catch (e) {
				T.value = e instanceof Error ? e.message : "Failed to load credentials";
			} finally {
				w.value = !1;
			}
		}
		async function M(e) {
			if (confirm("Are you sure you want to delete this passkey? This action cannot be undone.")) {
				D.value = e;
				try {
					await d().delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(e)}`), r.success("Passkey deleted successfully"), await j();
				} catch (e) {
					r.error(e instanceof Error ? e.message : "Failed to delete passkey");
				} finally {
					D.value = null;
				}
			}
		}
		async function N() {
			E.value = !0;
			try {
				let e = d(), t = await e.post("/api/v1/auth/webauthn/register/options", {}), n = {
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
				}, i = await navigator.credentials.create({ publicKey: n });
				if (!i) throw Error("No credential created");
				let a = i.response, o = (e) => {
					let t = e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
					return btoa(String.fromCharCode(...t));
				}, s = {
					attestationObject: o(a.attestationObject),
					clientDataJSON: o(a.clientDataJSON),
					transports: a.getTransports ? a.getTransports() : []
				};
				await e.post("/api/v1/auth/webauthn/register/verify", {
					credential: s,
					challenge: t.challenge
				}), r.success("Passkey registered successfully"), await j();
			} catch (e) {
				e instanceof Error && e.name !== "NotAllowedError" && r.error(e.message);
			} finally {
				E.value = !1;
			}
		}
		function P() {
			j();
		}
		return ee(() => {
			j();
		}), (e, n) => (y(), p("div", te, [
			n[4] ||= m("header", { class: "security-settings-page__head" }, [
				m("p", { class: "security-settings-page__eyebrow" }, "Account Security"),
				m("h1", { class: "security-settings-page__title" }, "Passkey Settings"),
				m("p", { class: "security-settings-page__desc" }, " Manage your passkeys (WebAuthn/FIDO2 credentials) for passwordless login. ")
			], -1),
			m("section", ne, [
				n[3] ||= m("header", { class: "security-settings-page__card-header" }, [m("h2", { class: "security-settings-page__card-title" }, "Registered Passkeys")], -1),
				m("div", re, [w.value ? (y(), f(s, {
					key: 0,
					label: "Loading credentials..."
				})) : T.value ? (y(), f(l, {
					key: 1,
					icon: "alert",
					title: "Couldn't load passkeys",
					description: T.value
				}, {
					actions: C(() => [_(c, {
						variant: "solid",
						size: "sm",
						"left-icon": "refresh",
						onClick: P
					}, {
						default: C(() => [...n[0] ||= [g(" Retry ", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : v.value.length === 0 ? (y(), f(l, {
					key: 2,
					icon: "key",
					title: "No passkeys registered",
					description: "Add a passkey to enable passwordless login on your devices."
				})) : (y(), p("ul", ie, [(y(!0), p(u, null, x(v.value, (e) => (y(), p("li", {
					key: e.credential_id,
					class: "credential-item"
				}, [
					m("div", ae, [_(t, { name: k(e.device_type) }, null, 8, ["name"])]),
					m("div", oe, [m("span", se, S(e.credential_id.substring(0, 20)) + "... ", 1), m("span", ce, S(A(e.device_type)) + " · Registered " + S(O(e.registered_at)), 1)]),
					_(c, {
						variant: "ghost",
						size: "sm",
						class: "credential-item__delete",
						disabled: D.value === e.credential_id,
						onClick: (t) => M(e.credential_id)
					}, {
						default: C(() => [D.value === e.credential_id ? (y(), f(s, {
							key: 0,
							size: "xs"
						})) : (y(), f(t, {
							key: 1,
							name: "trash"
						}))]),
						_: 2
					}, 1032, ["disabled", "onClick"])
				]))), 128))]))]),
				m("footer", le, [_(c, {
					variant: "solid",
					disabled: E.value,
					onClick: N
				}, {
					default: C(() => [E.value ? (y(), p(u, { key: 0 }, [_(s, {
						size: "xs",
						class: "mr-2"
					}), n[1] ||= g(" Starting... ", -1)], 64)) : (y(), p(u, { key: 1 }, [_(t, {
						name: "plus",
						class: "mr-2"
					}), n[2] ||= g(" Add Passkey ", -1)], 64))]),
					_: 1
				}, 8, ["disabled"])])
			]),
			n[5] ||= h("<section class=\"security-settings-page__info\" data-v-8f2a31e0><h3 class=\"security-settings-page__info-title\" data-v-8f2a31e0>What is a passkey?</h3><p data-v-8f2a31e0> A passkey is a FIDO2/WebAuthn credential that allows you to log in securely without a password. It uses public-key cryptography to protect your account from phishing and credential theft attacks. </p></section><section class=\"security-settings-page__notes\" data-v-8f2a31e0><h3 class=\"security-settings-page__notes-title\" data-v-8f2a31e0>Security Notes</h3><ul class=\"security-settings-page__notes-list\" data-v-8f2a31e0><li data-v-8f2a31e0>Passkeys are unique to each device and cannot be reused if lost.</li><li data-v-8f2a31e0>Keep backup codes or alternative login methods in a safe place.</li><li data-v-8f2a31e0>Deleting a passkey is permanent and cannot be undone.</li><li data-v-8f2a31e0>Platform authenticators (like Touch ID or Windows Hello) require the specific device.</li></ul></section>", 2)
		]));
	}
}), [["__scopeId", "data-v-8f2a31e0"]]);
//#endregion
export { W as _, H as a, K as c, k as d, E as f, G as g, X as h, T as i, q as l, V as m, $ as n, Y as o, I as p, Q as r, D as s, ue as t, J as u, L as v, Z as y };

//# sourceMappingURL=SecuritySettingsPage-DT49gocN.js.map