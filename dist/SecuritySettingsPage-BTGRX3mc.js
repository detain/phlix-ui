import { n as e, t } from "./Icon-55iG1rR7.js";
import { t as n } from "./useMessages-DWyC670G.js";
import { t as r, x as i } from "./client-fSGeXil2.js";
import { n as a } from "./useApiBase-DXTBY90j.js";
import { t as o } from "./useAuthStore-y410JNp4.js";
import { t as s } from "./useToastStore-Bu-iYU7r.js";
import { t as c } from "./Spinner-Ce5nc_O0.js";
import { t as l } from "./EmptyState-DjfWh3kt.js";
import { t as u } from "./Button-BLpPomsd.js";
import { t as ee } from "./ConfirmDialog-C2YORkzs.js";
import { r as d } from "./wireErrors-BEWfE19X.js";
import { Fragment as f, computed as te, createBlock as p, createCommentVNode as ne, createElementBlock as m, createElementVNode as h, createStaticVNode as re, createTextVNode as g, createVNode as _, defineComponent as v, inject as ie, onMounted as ae, openBlock as y, ref as b, renderList as x, toDisplayString as S, vModelRadio as oe, vModelText as se, withCtx as C, withDirectives as w } from "vue";
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
function ce(e, t) {
	let n = Z(e), r = Z(t);
	return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function Q(e, t) {
	let n = X(e), r = X(t);
	if (n === null || r === null || r.alpha < 1) return null;
	let i = (e) => Math.round(n.alpha * n.rgb[e] + (1 - n.alpha) * r.rgb[e]);
	return ce([
		i(0),
		i(1),
		i(2)
	], r.rgb);
}
function le(e) {
	let t = e["--accent-ring"];
	if (t === void 0) return null;
	for (let n of Y) {
		let r = e[n];
		if (r === void 0) continue;
		let i = Q(t, r);
		if (!(i === null || i >= 3)) return `--accent-ring ${t} composited to ${i.toFixed(2)}:1 on ${n} (${r}) is below the 3:1 WCAG 1.4.11 floor for the focus indicator`;
	}
	return null;
}
function ue(e, t) {
	let n = le(t);
	for (let [r, i] of Object.entries(t)) A(r) && L(i) && (r === "--accent-ring" && n !== null ? console.warn(`[phlix:theme] ${n}; falling back to the base theme's ring`) : e.style.setProperty(r, i));
}
function de(e) {
	for (let t of O) e.style.removeProperty(t);
}
var $ = "phlix.theme.active";
function fe() {
	if (typeof localStorage > "u") return null;
	try {
		let e = localStorage.getItem($);
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
function pe(e) {
	if (typeof localStorage < "u") try {
		e === null ? localStorage.removeItem($) : localStorage.setItem($, JSON.stringify(e));
	} catch {}
}
// src/api/themes.ts
async function me(e, t) {
	let n = await new r({ baseUrl: e }).get("/api/v1/themes", void 0, t), i = Array.isArray(n.themes) ? n.themes : [], a = [];
	for (let e of i) {
		let t = H(e);
		t !== null && a.push(t);
	}
	return a;
}
// src/stores/useThemesStore.ts
var he = T("themes", () => {
	let e = b([]), t = b(!1), n = b(!1), r = b(null), a = null;
	async function o(o, s = !1) {
		if (o !== null && (!n.value || s)) return a || (t.value = !0, r.value = null, a = (async () => {
			try {
				e.value = await me(o), n.value = !0;
			} catch (e) {
				r.value = i(e, "Failed to load themes");
			} finally {
				t.value = !1, a = null;
			}
		})(), a);
	}
	let s = te(() => e.value.filter((e) => !e.builtIn));
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
}), ge = { class: "security-settings-page" }, _e = { class: "security-settings-page__card" }, ve = { class: "security-settings-page__card-body" }, ye = {
	key: 3,
	class: "credentials-list"
}, be = { class: "credential-item__icon" }, xe = { class: "credential-item__info" }, Se = { class: "credential-item__id" }, Ce = { class: "credential-item__meta" }, we = { class: "security-settings-page__card-footer" }, Te = { class: "register-form" }, Ee = { class: "register-form__field" }, De = { class: "register-form__choice" }, Oe = { class: "register-form__segments" }, ke = ["value"], Ae = {
	key: 0,
	class: "security-settings-page__status",
	role: "status"
}, je = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "SecuritySettingsPage",
	setup(e) {
		let i = [
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
		], te = a(), v = s(), T = o(), { t: E } = n(), D = ie("phlixConfig", null);
		function O() {
			return new r({ baseUrl: te.value });
		}
		let k = b([]), A = b(!0), j = b(null), M = b(!1), N = b(null), P = b(""), F = b("auto"), I = b(null), L = b({});
		function R() {
			let e = T.user?.id;
			return e ? `phlix.passkey-meta.${e}` : "phlix.passkey-meta";
		}
		function z() {
			try {
				let e = localStorage.getItem(R()), t = e ? JSON.parse(e) : {};
				L.value = t && typeof t == "object" ? t : {};
			} catch {
				L.value = {};
			}
		}
		function B(e, t) {
			L.value = {
				...L.value,
				[e]: t
			};
			try {
				localStorage.setItem(R(), JSON.stringify(L.value));
			} catch {}
		}
		function V(e) {
			if (!(e in L.value)) return;
			let t = { ...L.value };
			delete t[e], L.value = t;
			try {
				localStorage.setItem(R(), JSON.stringify(t));
			} catch {}
		}
		function H(e) {
			return L.value[e];
		}
		function U(e) {
			return H(e.credential_id)?.nickname || `${e.credential_id.substring(0, 20)}…`;
		}
		function W(e) {
			if (e.device_type === "platform" || e.device_type === "cross-platform") return e.device_type;
			let t = H(e.credential_id)?.attachment;
			return t === "platform" || t === "cross-platform" ? t : null;
		}
		function G(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function K(e) {
			return e === "platform" ? "monitor" : "key";
		}
		function q(e) {
			return e === "platform" ? "Platform authenticator" : e === "cross-platform" ? "Security key" : "Passkey";
		}
		async function J() {
			A.value = !0, j.value = null;
			try {
				let e = await O().get("/api/v1/me/webauthn/credentials");
				k.value = e.credentials ?? [];
			} catch (e) {
				j.value = d(e, "Failed to load credentials", D?.locale);
			} finally {
				A.value = !1;
			}
		}
		let Y = b(null);
		function X(e) {
			Y.value = e;
		}
		async function Z() {
			let e = Y.value;
			if (Y.value = null, e) {
				N.value = e;
				try {
					await O().delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(e)}`), V(e), v.success("Passkey deleted successfully."), await J();
				} catch (e) {
					v.error(d(e, "Failed to delete passkey", D?.locale));
				} finally {
					N.value = null;
				}
			}
		}
		async function ce() {
			M.value = !0, I.value = null;
			try {
				let e = O(), t = await e.post("/api/v1/auth/webauthn/register/options", {}), n = t.user.name ?? T.user?.username ?? T.user?.email ?? "phlix user", r = t.user.displayName ?? T.user?.name ?? T.user?.username ?? n, i = {
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
						...F.value === "auto" ? {} : { authenticatorAttachment: F.value },
						residentKey: "preferred",
						userVerification: "preferred"
					}
				}, a = await navigator.credentials.create({ publicKey: i });
				if (!a) throw Error(E("settings.passkeyNotCreated"));
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
				}), u = P.value.trim();
				l.credential_id && (u || F.value !== "auto") && B(l.credential_id, {
					...u ? { nickname: u } : {},
					...F.value === "auto" ? {} : { attachment: F.value }
				}), P.value = "", I.value = "Passkey registered successfully.", v.success("Passkey registered successfully."), await J();
			} catch (e) {
				e instanceof Error && e.name === "NotAllowedError" ? I.value = "Registration was cancelled or timed out — try again." : e instanceof Error && (I.value = null, v.error(d(e, "Couldn’t register the passkey.", D?.locale)));
			} finally {
				M.value = !1;
			}
		}
		function Q() {
			J();
		}
		return ae(() => {
			z(), J();
		}), (e, n) => (y(), m("div", ge, [
			n[9] ||= h("header", { class: "security-settings-page__head" }, [
				h("p", { class: "security-settings-page__eyebrow" }, "Account Security"),
				h("h1", { class: "security-settings-page__title" }, "Passkey settings"),
				h("p", { class: "security-settings-page__desc" }, " Manage your passkeys (WebAuthn/FIDO2 credentials) for passwordless login. ")
			], -1),
			h("section", _e, [
				n[8] ||= h("header", { class: "security-settings-page__card-header" }, [h("h2", { class: "security-settings-page__card-title" }, "Registered Passkeys")], -1),
				h("div", ve, [A.value ? (y(), p(c, {
					key: 0,
					label: "Loading credentials..."
				})) : j.value ? (y(), p(l, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load passkeys",
					description: j.value
				}, {
					actions: C(() => [_(u, {
						variant: "solid",
						size: "sm",
						"left-icon": "refresh",
						onClick: Q
					}, {
						default: C(() => [...n[3] ||= [g(" Retry ", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : k.value.length === 0 ? (y(), p(l, {
					key: 2,
					icon: "key",
					title: "No passkeys registered",
					description: "Add a passkey to enable passwordless login on your devices."
				})) : (y(), m("ul", ye, [(y(!0), m(f, null, x(k.value, (e) => (y(), m("li", {
					key: e.credential_id,
					class: "credential-item"
				}, [
					h("div", be, [_(t, { name: K(W(e)) }, null, 8, ["name"])]),
					h("div", xe, [h("span", Se, S(U(e)), 1), h("span", Ce, S(q(W(e))) + " · Registered " + S(G(e.registered_at)), 1)]),
					_(u, {
						variant: "ghost",
						size: "sm",
						class: "credential-item__delete",
						disabled: N.value === e.credential_id,
						onClick: (t) => X(e.credential_id)
					}, {
						default: C(() => [N.value === e.credential_id ? (y(), p(c, {
							key: 0,
							size: "xs"
						})) : (y(), p(t, {
							key: 1,
							name: "trash"
						}))]),
						_: 2
					}, 1032, ["disabled", "onClick"])
				]))), 128))]))]),
				h("footer", we, [
					h("div", Te, [h("label", Ee, [n[4] ||= h("span", { class: "register-form__label" }, "Nickname (optional)", -1), w(h("input", {
						"onUpdate:modelValue": n[0] ||= (e) => P.value = e,
						type: "text",
						class: "register-form__input",
						placeholder: "e.g. Work laptop",
						maxlength: "60",
						autocomplete: "off"
					}, null, 512), [[se, P.value]])]), h("fieldset", De, [n[5] ||= h("legend", { class: "register-form__label" }, "Authenticator type", -1), h("div", Oe, [(y(), m(f, null, x(i, (e) => h("label", {
						key: e.value,
						class: "register-form__segment"
					}, [w(h("input", {
						"onUpdate:modelValue": n[1] ||= (e) => F.value = e,
						type: "radio",
						name: "passkey-attachment",
						value: e.value
					}, null, 8, ke), [[oe, F.value]]), h("span", null, S(e.label), 1)])), 64))])])]),
					I.value ? (y(), m("p", Ae, S(I.value), 1)) : ne("", !0),
					_(u, {
						variant: "solid",
						disabled: M.value,
						onClick: ce
					}, {
						default: C(() => [M.value ? (y(), m(f, { key: 0 }, [_(c, {
							size: "xs",
							class: "mr-2"
						}), n[6] ||= g(" Starting... ", -1)], 64)) : (y(), m(f, { key: 1 }, [_(t, {
							name: "plus",
							class: "mr-2"
						}), n[7] ||= g(" Add Passkey ", -1)], 64))]),
						_: 1
					}, 8, ["disabled"])
				])
			]),
			n[10] ||= re("<section class=\"security-settings-page__info\" data-v-9f3b487c><h3 class=\"security-settings-page__info-title\" data-v-9f3b487c>What is a passkey?</h3><p data-v-9f3b487c> A passkey is a FIDO2/WebAuthn credential that allows you to log in securely without a password. It uses public-key cryptography to protect your account from phishing and credential theft attacks. </p></section><section class=\"security-settings-page__notes\" data-v-9f3b487c><h3 class=\"security-settings-page__notes-title\" data-v-9f3b487c>Security Notes</h3><ul class=\"security-settings-page__notes-list\" data-v-9f3b487c><li data-v-9f3b487c>Passkeys are unique to each device and cannot be reused if lost.</li><li data-v-9f3b487c>Keep backup codes or alternative login methods in a safe place.</li><li data-v-9f3b487c>Deleting a passkey is permanent and cannot be undone.</li><li data-v-9f3b487c>Platform authenticators (like Touch ID or Windows Hello) require the specific device.</li></ul></section>", 2),
			_(ee, {
				open: Y.value !== null,
				message: "Deleting this passkey is permanent and cannot be undone — devices using it will fall back to your other sign-in methods.",
				"confirm-label": "Delete passkey",
				danger: "",
				"onUpdate:open": n[2] ||= (e) => {
					e || (Y.value = null);
				},
				onConfirm: Z
			}, null, 8, ["open"])
		]));
	}
}), [["__scopeId", "data-v-9f3b487c"]]);
export { R as C, G as S, L as _, J as a, fe as b, $ as c, ue as d, de as f, D as g, A as h, E as i, O as l, le as m, he as n, U as o, Q as p, me as r, Y as s, je as t, q as u, H as v, pe as w, K as x, X as y };

//# sourceMappingURL=SecuritySettingsPage-BTGRX3mc.js.map