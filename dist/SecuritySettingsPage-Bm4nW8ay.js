import { n as e, t } from "./Icon-CIbfiPrs.js";
import { l as n, t as r, y as i } from "./client-pLl-rDdN.js";
import { n as a } from "./useApiBase-DXTBY90j.js";
import { t as o } from "./useAuthStore-D9S6HAT9.js";
import { t as s } from "./useToastStore-Bu-iYU7r.js";
import { t as c } from "./Spinner-B8wtViN3.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { t as u } from "./Button-1sKEdGjj.js";
import { t as ee } from "./ConfirmDialog-DsyMLgoH.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as te, createElementBlock as m, createElementVNode as h, createStaticVNode as ne, createTextVNode as g, createVNode as _, defineComponent as v, onMounted as re, openBlock as y, ref as b, renderList as x, toDisplayString as S, vModelRadio as ie, vModelText as ae, withCtx as C, withDirectives as w } from "vue";
import { defineStore as T } from "pinia";
// src/composables/themeTokens.ts
var E = [
	"nocturne",
	"daylight",
	"midnight"
];
function D(e) {
	return E.includes(e);
}
var O = /* @__PURE__ */ "--accent.--accent-hover.--accent-active.--accent-soft.--accent-ring.--accent-text.--bg.--surface.--surface-2.--surface-3.--surface-glass.--surface-glass-strong.--text.--text-muted.--text-subtle.--text-faint.--text-on-accent.--border.--border-subtle.--border-strong.--error.--error-bg.--success.--success-bg.--warning.--warning-bg.--info.--info-bg.--grain-opacity.--vignette.--ambient.--color-bg.--color-surface.--color-surface-hover.--color-surface-elevated.--color-surface-active.--color-text.--color-text-secondary.--color-text-muted.--color-text-subtle.--color-primary.--color-primary-hover.--color-primary-active.--color-border.--color-border-subtle.--color-error.--color-error-bg.--color-success.--color-success-bg.--color-warning.--color-warning-bg.--color-info.--color-info-bg".split("."), k = new Set(O);
function A(e) {
	return k.has(e);
}
var j = 128, M = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, N = /^[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/, P = "[+-]?(?:[0-9]+(?:\\.[0-9]+)?|\\.[0-9]+)(?:%|deg)?", F = RegExp(`^(?:rgba?|hsla?)\\((?: *)${P}(?:(?: *)[,/](?: *)${P}){2,3}(?: *)\\)$`, "i"), I = ["transparent", "currentcolor"];
function L(e) {
	let t = e.trim();
	return t === "" || t.length > j ? !1 : I.includes(t.toLowerCase()) ? !0 : M.test(t) || F.test(t) || N.test(t);
}
function R(e) {
	let t = {};
	if (typeof e != "object" || !e || Array.isArray(e)) return t;
	for (let [n, r] of Object.entries(e)) A(n) && typeof r == "string" && L(r) && (t[n] = r.trim());
	return t;
}
var z = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/, B = 64, V = /* @__PURE__ */ RegExp("[\\u0000-\\u001f\\u007f]");
function H(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return null;
	let t = e, n = typeof t.id == "string" ? t.id : "";
	if (!z.test(n)) return null;
	let r = typeof t.name == "string" ? t.name.trim() : "";
	if (r === "" || r.length > B || V.test(r)) return null;
	let i = typeof t.extends == "string" && z.test(t.extends) && t.extends !== n ? t.extends : null;
	return {
		id: n,
		name: r,
		dark: t.dark === !0,
		extends: i,
		tokens: R(t.tokens),
		source: typeof t.source == "string" && t.source !== "" ? t.source : null,
		builtIn: t.builtIn === !0 || D(n)
	};
}
var U = 8;
function W(e, t) {
	let n = new Map(t.map((e) => [e.id, e])), r = [], i = /* @__PURE__ */ new Set(), a = e;
	for (let e = 0; e < 8 && a !== null && !(i.has(a) || D(a)); e++) {
		let e = n.get(a);
		if (e === void 0) break;
		i.add(a), r.push(e), a = e.extends;
	}
	return r;
}
function G(e, t) {
	let n = {};
	for (let r of W(e, t).reverse()) n = {
		...n,
		...r.tokens
	};
	return n;
}
function K(e, t) {
	if (D(e)) return e;
	let n = W(e, t);
	for (let e of n) if (e.extends !== null && D(e.extends)) return e.extends;
	return n[0]?.dark === !1 ? "daylight" : "nocturne";
}
function q(e, t) {
	return D(e) || t.find((t) => t.id === e) === void 0 ? null : {
		id: e,
		base: K(e, t),
		tokens: G(e, t)
	};
}
var J = 3, Y = [
	"--bg",
	"--surface",
	"--surface-2"
];
function X(e) {
	let t = e.trim(), n = t.match(/^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/);
	if (n) {
		let e = n[1];
		return (e.length === 3 || e.length === 4) && (e = e.split("").map((e) => e + e).join("")), {
			rgb: [
				parseInt(e.slice(0, 2), 16),
				parseInt(e.slice(2, 4), 16),
				parseInt(e.slice(4, 6), 16)
			],
			alpha: e.length === 8 ? parseInt(e.slice(6, 8), 16) / 255 : 1
		};
	}
	let r = t.match(/^rgba?\(([^)]+)\)$/i);
	if (!r) return null;
	let i = r[1].split(/[,/]/).map((e) => e.trim());
	if (i.length < 3 || i.length > 4) return null;
	let a = i.slice(0, 3);
	if (a.some((e) => e.includes("%"))) return null;
	let o = a.map(Number);
	if (o.some((e) => !Number.isFinite(e) || e < 0 || e > 255)) return null;
	let s = i.length === 4 ? Number(i[3]) : 1;
	return !Number.isFinite(s) || s < 0 || s > 1 || i[3]?.includes("%") ? null : {
		rgb: [
			Math.round(o[0]),
			Math.round(o[1]),
			Math.round(o[2])
		],
		alpha: s
	};
}
function Z(e) {
	let t = e.map((e) => {
		let t = e / 255;
		return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * t[0] + .7152 * t[1] + .0722 * t[2];
}
function oe(e, t) {
	let n = Z(e), r = Z(t);
	return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function se(e, t) {
	let n = X(e), r = X(t);
	if (n === null || r === null || r.alpha < 1) return null;
	let i = (e) => Math.round(n.alpha * n.rgb[e] + (1 - n.alpha) * r.rgb[e]);
	return oe([
		i(0),
		i(1),
		i(2)
	], r.rgb);
}
function ce(e) {
	let t = e["--accent-ring"];
	if (t === void 0) return null;
	for (let n of Y) {
		let r = e[n];
		if (r === void 0) continue;
		let i = se(t, r);
		if (!(i === null || i >= 3)) return `--accent-ring ${t} composited to ${i.toFixed(2)}:1 on ${n} (${r}) is below the 3:1 WCAG 1.4.11 floor for the focus indicator`;
	}
	return null;
}
function le(e, t) {
	let n = ce(t);
	for (let [r, i] of Object.entries(t)) A(r) && L(i) && (r === "--accent-ring" && n !== null ? console.warn(`[phlix:theme] ${n}; falling back to the base theme's ring`) : e.style.setProperty(r, i));
}
function ue(e) {
	for (let t of O) e.style.removeProperty(t);
}
var Q = "phlix.theme.active";
function de() {
	if (typeof localStorage > "u") return null;
	try {
		let e = localStorage.getItem(Q);
		if (e === null) return null;
		let t = JSON.parse(e);
		if (typeof t != "object" || !t || Array.isArray(t)) return null;
		let n = t, r = typeof n.id == "string" ? n.id : "";
		if (!z.test(r) || D(r)) return null;
		let i = typeof n.base == "string" && D(n.base) ? n.base : null;
		return i === null ? null : {
			id: r,
			base: i,
			tokens: R(n.tokens)
		};
	} catch {
		return null;
	}
}
function fe(e) {
	if (typeof localStorage < "u") try {
		e === null ? localStorage.removeItem(Q) : localStorage.setItem(Q, JSON.stringify(e));
	} catch {}
}
// src/api/themes.ts
async function $(e, t) {
	let i = await new r({
		baseUrl: e,
		tokenStore: typeof window < "u" ? new n() : void 0
	}).get("/api/v1/themes", void 0, t), a = Array.isArray(i.themes) ? i.themes : [], o = [];
	for (let e of a) {
		let t = H(e);
		t !== null && o.push(t);
	}
	return o;
}
// src/stores/useThemesStore.ts
var pe = T("themes", () => {
	let e = b([]), t = b(!1), n = b(!1), r = b(null), a = null;
	async function o(o, s = !1) {
		if (o !== null && (!n.value || s)) return a || (t.value = !0, r.value = null, a = (async () => {
			try {
				e.value = await $(o), n.value = !0;
			} catch (e) {
				r.value = i(e, "Failed to load themes");
			} finally {
				t.value = !1, a = null;
			}
		})(), a);
	}
	let s = f(() => e.value.filter((e) => !e.builtIn));
	function c(t) {
		return e.value.find((e) => e.id === t);
	}
	function l(t) {
		return q(t, e.value);
	}
	return {
		items: e,
		loading: t,
		loaded: n,
		error: r,
		pluginThemes: s,
		load: o,
		byId: c,
		styleFor: l
	};
}), me = { class: "security-settings-page" }, he = { class: "security-settings-page__card" }, ge = { class: "security-settings-page__card-body" }, _e = {
	key: 3,
	class: "credentials-list"
}, ve = { class: "credential-item__icon" }, ye = { class: "credential-item__info" }, be = { class: "credential-item__id" }, xe = { class: "credential-item__meta" }, Se = { class: "security-settings-page__card-footer" }, Ce = { class: "register-form" }, we = { class: "register-form__field" }, Te = { class: "register-form__choice" }, Ee = { class: "register-form__segments" }, De = ["value"], Oe = {
	key: 0,
	class: "security-settings-page__status",
	role: "status"
}, ke = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "SecuritySettingsPage",
	setup(e) {
		let n = [
			{
				value: "auto",
				label: "Let device decide"
			},
			{
				value: "platform",
				label: "Device passkey"
			},
			{
				value: "cross-platform",
				label: "Security key"
			}
		], i = a(), f = s(), v = o();
		function T() {
			return new r({ baseUrl: i.value });
		}
		let E = b([]), D = b(!0), O = b(null), k = b(!1), A = b(null), j = b(""), M = b("auto"), N = b(null), P = b({});
		function F() {
			let e = v.user?.id;
			return e ? `phlix.passkey-meta.${e}` : "phlix.passkey-meta";
		}
		function I() {
			try {
				let e = localStorage.getItem(F()), t = e ? JSON.parse(e) : {};
				P.value = t && typeof t == "object" ? t : {};
			} catch {
				P.value = {};
			}
		}
		function L(e, t) {
			P.value = {
				...P.value,
				[e]: t
			};
			try {
				localStorage.setItem(F(), JSON.stringify(P.value));
			} catch {}
		}
		function R(e) {
			if (!(e in P.value)) return;
			let t = { ...P.value };
			delete t[e], P.value = t;
			try {
				localStorage.setItem(F(), JSON.stringify(t));
			} catch {}
		}
		function z(e) {
			return P.value[e];
		}
		function B(e) {
			return z(e.credential_id)?.nickname || `${e.credential_id.substring(0, 20)}…`;
		}
		function V(e) {
			if (e.device_type === "platform" || e.device_type === "cross-platform") return e.device_type;
			let t = z(e.credential_id)?.attachment;
			return t === "platform" || t === "cross-platform" ? t : null;
		}
		function H(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function U(e) {
			return e === "platform" ? "monitor" : "key";
		}
		function W(e) {
			return e === "platform" ? "Platform authenticator" : e === "cross-platform" ? "Security key" : "Passkey";
		}
		async function G() {
			D.value = !0, O.value = null;
			try {
				let e = await T().get("/api/v1/me/webauthn/credentials");
				E.value = e.credentials ?? [];
			} catch (e) {
				O.value = e instanceof Error ? e.message : "Failed to load credentials";
			} finally {
				D.value = !1;
			}
		}
		let K = b(null);
		function q(e) {
			K.value = e;
		}
		async function J() {
			let e = K.value;
			if (K.value = null, e) {
				A.value = e;
				try {
					await T().delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(e)}`), R(e), f.success("Passkey deleted successfully."), await G();
				} catch (e) {
					f.error(e instanceof Error ? e.message : "Failed to delete passkey");
				} finally {
					A.value = null;
				}
			}
		}
		async function Y() {
			k.value = !0, N.value = null;
			try {
				let e = T(), t = await e.post("/api/v1/auth/webauthn/register/options", {}), n = t.user.name ?? v.user?.username ?? v.user?.email ?? "phlix user", r = t.user.displayName ?? v.user?.name ?? v.user?.username ?? n, i = {
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
						name: n,
						displayName: r
					},
					excludeCredentials: t.excludeCredentials?.map((e) => ({
						id: Uint8Array.from(atob(e.id), (e) => e.charCodeAt(0)),
						type: "public-key"
					})),
					timeout: 6e4,
					attestation: "none",
					authenticatorSelection: {
						...M.value === "auto" ? {} : { authenticatorAttachment: M.value },
						residentKey: "preferred",
						userVerification: "preferred"
					}
				}, a = await navigator.credentials.create({ publicKey: i });
				if (!a) throw Error("No credential created");
				let o = a.response, s = (e) => {
					let t = e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
					return btoa(String.fromCharCode(...t));
				}, c = {
					attestationObject: s(o.attestationObject),
					clientDataJSON: s(o.clientDataJSON),
					transports: o.getTransports ? o.getTransports() : []
				}, l = await e.post("/api/v1/auth/webauthn/register/verify", {
					credential: c,
					challenge: t.challenge
				}), u = j.value.trim();
				l.credential_id && (u || M.value !== "auto") && L(l.credential_id, {
					...u ? { nickname: u } : {},
					...M.value === "auto" ? {} : { attachment: M.value }
				}), j.value = "", N.value = "Passkey registered successfully", f.success("Passkey registered successfully."), await G();
			} catch (e) {
				e instanceof Error && e.name === "NotAllowedError" ? N.value = "Registration was cancelled or timed out — try again." : e instanceof Error && (N.value = null, f.error(e.message));
			} finally {
				k.value = !1;
			}
		}
		function X() {
			G();
		}
		return re(() => {
			I(), G();
		}), (e, r) => (y(), m("div", me, [
			r[9] ||= h("header", { class: "security-settings-page__head" }, [
				h("p", { class: "security-settings-page__eyebrow" }, "Account Security"),
				h("h1", { class: "security-settings-page__title" }, "Passkey Settings"),
				h("p", { class: "security-settings-page__desc" }, " Manage your passkeys (WebAuthn/FIDO2 credentials) for passwordless login. ")
			], -1),
			h("section", he, [
				r[8] ||= h("header", { class: "security-settings-page__card-header" }, [h("h2", { class: "security-settings-page__card-title" }, "Registered Passkeys")], -1),
				h("div", ge, [D.value ? (y(), p(c, {
					key: 0,
					label: "Loading credentials..."
				})) : O.value ? (y(), p(l, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load passkeys",
					description: O.value
				}, {
					actions: C(() => [_(u, {
						variant: "solid",
						size: "sm",
						"left-icon": "refresh",
						onClick: X
					}, {
						default: C(() => [...r[3] ||= [g(" Retry ", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : E.value.length === 0 ? (y(), p(l, {
					key: 2,
					icon: "key",
					title: "No passkeys registered",
					description: "Add a passkey to enable passwordless login on your devices."
				})) : (y(), m("ul", _e, [(y(!0), m(d, null, x(E.value, (e) => (y(), m("li", {
					key: e.credential_id,
					class: "credential-item"
				}, [
					h("div", ve, [_(t, { name: U(V(e)) }, null, 8, ["name"])]),
					h("div", ye, [h("span", be, S(B(e)), 1), h("span", xe, S(W(V(e))) + " · Registered " + S(H(e.registered_at)), 1)]),
					_(u, {
						variant: "ghost",
						size: "sm",
						class: "credential-item__delete",
						disabled: A.value === e.credential_id,
						onClick: (t) => q(e.credential_id)
					}, {
						default: C(() => [A.value === e.credential_id ? (y(), p(c, {
							key: 0,
							size: "xs"
						})) : (y(), p(t, {
							key: 1,
							name: "trash"
						}))]),
						_: 2
					}, 1032, ["disabled", "onClick"])
				]))), 128))]))]),
				h("footer", Se, [
					h("div", Ce, [h("label", we, [r[4] ||= h("span", { class: "register-form__label" }, "Nickname (optional)", -1), w(h("input", {
						"onUpdate:modelValue": r[0] ||= (e) => j.value = e,
						type: "text",
						class: "register-form__input",
						placeholder: "e.g. Work laptop",
						maxlength: "60",
						autocomplete: "off"
					}, null, 512), [[ae, j.value]])]), h("fieldset", Te, [r[5] ||= h("legend", { class: "register-form__label" }, "Authenticator type", -1), h("div", Ee, [(y(), m(d, null, x(n, (e) => h("label", {
						key: e.value,
						class: "register-form__segment"
					}, [w(h("input", {
						"onUpdate:modelValue": r[1] ||= (e) => M.value = e,
						type: "radio",
						name: "passkey-attachment",
						value: e.value
					}, null, 8, De), [[ie, M.value]]), h("span", null, S(e.label), 1)])), 64))])])]),
					N.value ? (y(), m("p", Oe, S(N.value), 1)) : te("", !0),
					_(u, {
						variant: "solid",
						disabled: k.value,
						onClick: Y
					}, {
						default: C(() => [k.value ? (y(), m(d, { key: 0 }, [_(c, {
							size: "xs",
							class: "mr-2"
						}), r[6] ||= g(" Starting... ", -1)], 64)) : (y(), m(d, { key: 1 }, [_(t, {
							name: "plus",
							class: "mr-2"
						}), r[7] ||= g(" Add Passkey ", -1)], 64))]),
						_: 1
					}, 8, ["disabled"])
				])
			]),
			r[10] ||= ne("<section class=\"security-settings-page__info\" data-v-1df7b771><h3 class=\"security-settings-page__info-title\" data-v-1df7b771>What is a passkey?</h3><p data-v-1df7b771> A passkey is a FIDO2/WebAuthn credential that allows you to log in securely without a password. It uses public-key cryptography to protect your account from phishing and credential theft attacks. </p></section><section class=\"security-settings-page__notes\" data-v-1df7b771><h3 class=\"security-settings-page__notes-title\" data-v-1df7b771>Security Notes</h3><ul class=\"security-settings-page__notes-list\" data-v-1df7b771><li data-v-1df7b771>Passkeys are unique to each device and cannot be reused if lost.</li><li data-v-1df7b771>Keep backup codes or alternative login methods in a safe place.</li><li data-v-1df7b771>Deleting a passkey is permanent and cannot be undone.</li><li data-v-1df7b771>Platform authenticators (like Touch ID or Windows Hello) require the specific device.</li></ul></section>", 2),
			_(ee, {
				open: K.value !== null,
				message: "Deleting this passkey is permanent and cannot be undone — devices using it will fall back to your other sign-in methods.",
				"confirm-label": "Delete passkey",
				danger: "",
				"onUpdate:open": r[2] ||= (e) => {
					e || (K.value = null);
				},
				onConfirm: J
			}, null, 8, ["open"])
		]));
	}
}), [["__scopeId", "data-v-1df7b771"]]);
export { R as C, G as S, L as _, J as a, de as b, Q as c, le as d, ue as f, D as g, A as h, E as i, O as l, ce as m, pe as n, U as o, se as p, $ as r, Y as s, ke as t, q as u, H as v, fe as w, K as x, X as y };

//# sourceMappingURL=SecuritySettingsPage-Bm4nW8ay.js.map