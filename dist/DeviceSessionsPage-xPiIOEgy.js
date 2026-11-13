import { n as e, t } from "./Icon-55iG1rR7.js";
import { t as n } from "./IconButton-DsjtwjU1.js";
import { a as r } from "./usePreferencesStore-DrDMAwjz.js";
import { t as i } from "./useMessages-DA8YXaVD.js";
import { S as a, T as o, t as s } from "./client-Bmlfq3Uy.js";
import { n as c, t as l } from "./useApiBase-DXTBY90j.js";
import { t as u } from "./useAuthStore-BzhZjWgj.js";
import { t as d } from "./useToastStore-CxO_ppM8.js";
import { t as f } from "./Spinner-wzYyEuC4.js";
import { t as p } from "./EmptyState-DjfWh3kt.js";
import { t as m } from "./Button-Dfl4y6vO.js";
import { t as ee } from "./ConfirmDialog-BBst5sQt.js";
import { r as h } from "./wireErrors-DDkkTtfw.js";
import { Fragment as g, computed as _, createBlock as v, createCommentVNode as y, createElementBlock as b, createElementVNode as x, createStaticVNode as S, createTextVNode as C, createVNode as w, defineComponent as T, inject as te, nextTick as E, onMounted as ne, openBlock as D, ref as O, renderList as re, toDisplayString as k, unref as A, vModelRadio as j, vModelText as M, withCtx as N, withDirectives as P } from "vue";
import { defineStore as F } from "pinia";
// src/composables/themeTokens.ts
var I = [
	"nocturne",
	"daylight",
	"midnight"
];
function L(e) {
	return I.includes(e);
}
var R = /* @__PURE__ */ "--accent.--accent-hover.--accent-active.--accent-soft.--accent-ring.--accent-text.--bg.--surface.--surface-2.--surface-3.--surface-glass.--surface-glass-strong.--text.--text-muted.--text-subtle.--text-faint.--text-on-accent.--border.--border-subtle.--border-strong.--error.--error-bg.--success.--success-bg.--warning.--warning-bg.--info.--info-bg.--grain-opacity.--vignette.--ambient.--color-bg.--color-surface.--color-surface-hover.--color-surface-elevated.--color-surface-active.--color-text.--color-text-secondary.--color-text-muted.--color-text-subtle.--color-primary.--color-primary-hover.--color-primary-active.--color-border.--color-border-subtle.--color-error.--color-error-bg.--color-success.--color-success-bg.--color-warning.--color-warning-bg.--color-info.--color-info-bg".split("."), z = new Set(R);
function B(e) {
	return z.has(e);
}
var V = 128, H = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, U = /^[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/, W = "[+-]?(?:[0-9]+(?:\\.[0-9]+)?|\\.[0-9]+)(?:%|deg)?", ie = RegExp(`^(?:rgba?|hsla?)\\((?: *)${W}(?:(?: *)[,/](?: *)${W}){2,3}(?: *)\\)$`, "i"), G = ["transparent", "currentcolor"];
function K(e) {
	let t = e.trim();
	return t === "" || t.length > V ? !1 : G.includes(t.toLowerCase()) ? !0 : H.test(t) || ie.test(t) || U.test(t);
}
function q(e) {
	let t = {};
	if (typeof e != "object" || !e || Array.isArray(e)) return t;
	for (let [n, r] of Object.entries(e)) B(n) && typeof r == "string" && K(r) && (t[n] = r.trim());
	return t;
}
var J = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/, Y = 64, ae = /* @__PURE__ */ RegExp("[\\u0000-\\u001f\\u007f]");
function X(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return null;
	let t = e, n = typeof t.id == "string" ? t.id : "";
	if (!J.test(n)) return null;
	let r = typeof t.name == "string" ? t.name.trim() : "";
	if (r === "" || r.length > Y || ae.test(r)) return null;
	let i = typeof t.extends == "string" && J.test(t.extends) && t.extends !== n ? t.extends : null;
	return {
		id: n,
		name: r,
		dark: t.dark === !0,
		extends: i,
		tokens: q(t.tokens),
		source: typeof t.source == "string" && t.source !== "" ? t.source : null,
		builtIn: t.builtIn === !0 || L(n)
	};
}
var Z = 8;
function oe(e, t) {
	let n = new Map(t.map((e) => [e.id, e])), r = [], i = /* @__PURE__ */ new Set(), a = e;
	for (let e = 0; e < 8 && a !== null && !(i.has(a) || L(a)); e++) {
		let e = n.get(a);
		if (e === void 0) break;
		i.add(a), r.push(e), a = e.extends;
	}
	return r;
}
function se(e, t) {
	let n = {};
	for (let r of oe(e, t).reverse()) n = {
		...n,
		...r.tokens
	};
	return n;
}
function Q(e, t) {
	if (L(e)) return e;
	let n = oe(e, t);
	for (let e of n) if (e.extends !== null && L(e.extends)) return e.extends;
	return n[0]?.dark === !1 ? "daylight" : "nocturne";
}
function ce(e, t) {
	return L(e) || t.find((t) => t.id === e) === void 0 ? null : {
		id: e,
		base: Q(e, t),
		tokens: se(e, t)
	};
}
var le = 3, ue = [
	"--bg",
	"--surface",
	"--surface-2"
];
function de(e) {
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
function fe(e) {
	let t = e.map((e) => {
		let t = e / 255;
		return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * t[0] + .7152 * t[1] + .0722 * t[2];
}
function pe(e, t) {
	let n = fe(e), r = fe(t);
	return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function me(e, t) {
	let n = de(e), r = de(t);
	if (n === null || r === null || r.alpha < 1) return null;
	let i = (e) => Math.round(n.alpha * n.rgb[e] + (1 - n.alpha) * r.rgb[e]);
	return pe([
		i(0),
		i(1),
		i(2)
	], r.rgb);
}
function he(e) {
	let t = e["--accent-ring"];
	if (t === void 0) return null;
	for (let n of ue) {
		let r = e[n];
		if (r === void 0) continue;
		let i = me(t, r);
		if (!(i === null || i >= 3)) return `--accent-ring ${t} composited to ${i.toFixed(2)}:1 on ${n} (${r}) is below the 3:1 WCAG 1.4.11 floor for the focus indicator`;
	}
	return null;
}
function ge(e, t) {
	let n = he(t);
	for (let [r, i] of Object.entries(t)) B(r) && K(i) && (r === "--accent-ring" && n !== null ? console.warn(`[phlix:theme] ${n}; falling back to the base theme's ring`) : e.style.setProperty(r, i));
}
function _e(e) {
	for (let t of R) e.style.removeProperty(t);
}
var $ = "phlix.theme.active";
function ve() {
	if (typeof localStorage > "u") return null;
	try {
		let e = localStorage.getItem($);
		if (e === null) return null;
		let t = JSON.parse(e);
		if (typeof t != "object" || !t || Array.isArray(t)) return null;
		let n = t, r = typeof n.id == "string" ? n.id : "";
		if (!J.test(r) || L(r)) return null;
		let i = typeof n.base == "string" && L(n.base) ? n.base : null;
		return i === null ? null : {
			id: r,
			base: i,
			tokens: q(n.tokens)
		};
	} catch {
		return null;
	}
}
function ye(e) {
	if (typeof localStorage < "u") try {
		e === null ? localStorage.removeItem($) : localStorage.setItem($, JSON.stringify(e));
	} catch {}
}
// src/api/themes.ts
async function be(e, t) {
	let n = await new s({ baseUrl: e }).get("/api/v1/themes", void 0, t), r = Array.isArray(n.themes) ? n.themes : [], i = [];
	for (let e of r) {
		let t = X(e);
		t !== null && i.push(t);
	}
	return i;
}
// src/stores/useThemesStore.ts
var xe = F("themes", () => {
	let e = O([]), t = O(!1), n = O(!1), r = O(null), i = null;
	async function a(a, s = !1) {
		if (a !== null && (!n.value || s)) return i || (t.value = !0, r.value = null, i = (async () => {
			try {
				e.value = await be(a), n.value = !0;
			} catch (e) {
				r.value = o(e, "Failed to load themes");
			} finally {
				t.value = !1, i = null;
			}
		})(), i);
	}
	let s = _(() => e.value.filter((e) => !e.builtIn));
	function c(t) {
		return e.value.find((e) => e.id === t);
	}
	function l(t) {
		return ce(t, e.value);
	}
	return {
		items: e,
		loading: t,
		loaded: n,
		error: r,
		pluginThemes: s,
		load: a,
		byId: c,
		styleFor: l
	};
});
// src/api/themeSettings.ts
async function Se(e, t) {
	let n = (await new s({ baseUrl: e }).get("/api/v1/users/me/settings", void 0, t))?.settings;
	if (typeof n != "object" || !n) return null;
	let r = n.theme;
	return typeof r == "string" && r !== "" ? r : null;
}
async function Ce(e, t, n) {
	await new s({ baseUrl: e }).put("/api/v1/users/me/settings", { theme: t }, n);
}
// src/stores/useThemeSyncStore.ts
var we = 1e3, Te = F("themeSync", () => {
	let e = r(), t = xe(), n = u(), i = O(null), a = O(!1), o = !1, s, c = null, l = 0;
	function d() {
		s !== void 0 && (clearTimeout(s), s = void 0);
	}
	async function f(n) {
		if (!(n === null || o)) {
			o = !0;
			try {
				if (await t.load(n), t.error !== null) return;
				let r = await Se(n);
				if (r === null || !(L(r) || t.byId(r) !== void 0)) return;
				i.value = r, e.theme !== r && (e.theme = r);
			} catch {}
		}
	}
	function p(e, t) {
		n.isLoggedIn && (d(), (t !== i.value || l !== 0) && (c = t, s = setTimeout(() => {
			s = void 0;
			let t = c;
			t === null || t === i.value && l === 0 || (l += 1, Ce(e, t).then(() => {
				t === c && (i.value = t), a.value = !1;
			}).catch(() => {
				t === c && (a.value = !0);
			}).finally(() => {
				--l;
			}));
		}, we)));
	}
	function m() {
		o = !1, d(), c = null, i.value = null, a.value = !1;
	}
	return {
		serverTheme: i,
		putFailed: a,
		syncFromServer: f,
		queuePut: p,
		endSession: m
	};
}), Ee = { class: "security-settings-page" }, De = { class: "security-settings-page__card" }, Oe = { class: "security-settings-page__card-body" }, ke = {
	key: 3,
	class: "credentials-list"
}, Ae = { class: "credential-item__icon" }, je = { class: "credential-item__info" }, Me = { class: "credential-item__id" }, Ne = { class: "credential-item__meta" }, Pe = { class: "security-settings-page__card-footer" }, Fe = { class: "register-form" }, Ie = { class: "register-form__field" }, Le = { class: "register-form__choice" }, Re = { class: "register-form__segments" }, ze = ["value"], Be = {
	key: 0,
	class: "security-settings-page__status",
	role: "status"
}, Ve = /*#__PURE__*/ e(/* @__PURE__ */ T({
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
		], r = c(), a = d(), o = u(), { t: l } = i(), _ = te("phlixConfig", null);
		function T() {
			return new s({ baseUrl: r.value });
		}
		let E = O([]), A = O(!0), F = O(null), I = O(!1), L = O(null), R = O(""), z = O("auto"), B = O(null), V = O({});
		function H() {
			let e = o.user?.id;
			return e ? `phlix.passkey-meta.${e}` : "phlix.passkey-meta";
		}
		function U() {
			try {
				let e = localStorage.getItem(H()), t = e ? JSON.parse(e) : {};
				V.value = t && typeof t == "object" ? t : {};
			} catch {
				V.value = {};
			}
		}
		function W(e, t) {
			V.value = {
				...V.value,
				[e]: t
			};
			try {
				localStorage.setItem(H(), JSON.stringify(V.value));
			} catch {}
		}
		function ie(e) {
			if (!(e in V.value)) return;
			let t = { ...V.value };
			delete t[e], V.value = t;
			try {
				localStorage.setItem(H(), JSON.stringify(t));
			} catch {}
		}
		function G(e) {
			return V.value[e];
		}
		function K(e) {
			return G(e.credential_id)?.nickname || `${e.credential_id.substring(0, 20)}…`;
		}
		function q(e) {
			if (e.device_type === "platform" || e.device_type === "cross-platform") return e.device_type;
			let t = G(e.credential_id)?.attachment;
			return t === "platform" || t === "cross-platform" ? t : null;
		}
		function J(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function Y(e) {
			return e === "platform" ? "monitor" : "key";
		}
		function ae(e) {
			return e === "platform" ? "Platform authenticator" : e === "cross-platform" ? "Security key" : "Passkey";
		}
		async function X() {
			A.value = !0, F.value = null;
			try {
				let e = await T().get("/api/v1/me/webauthn/credentials");
				E.value = e.credentials ?? [];
			} catch (e) {
				F.value = h(e, "Failed to load credentials", _?.locale);
			} finally {
				A.value = !1;
			}
		}
		let Z = O(null);
		function oe(e) {
			Z.value = e;
		}
		async function se() {
			let e = Z.value;
			if (Z.value = null, e) {
				L.value = e;
				try {
					await T().delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(e)}`), ie(e), a.success("Passkey deleted successfully."), await X();
				} catch (e) {
					a.error(h(e, "Failed to delete passkey", _?.locale));
				} finally {
					L.value = null;
				}
			}
		}
		async function Q() {
			I.value = !0, B.value = null;
			try {
				let e = T(), t = await e.post("/api/v1/auth/webauthn/register/options", {}), n = t.user.name ?? o.user?.username ?? o.user?.email ?? "phlix user", r = t.user.displayName ?? o.user?.name ?? o.user?.username ?? n, i = {
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
						...z.value === "auto" ? {} : { authenticatorAttachment: z.value },
						residentKey: "preferred",
						userVerification: "preferred"
					}
				}, s = await navigator.credentials.create({ publicKey: i });
				if (!s) throw Error(l("settings.passkeyNotCreated"));
				let c = s.response, u = (e) => {
					let t = e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
					return btoa(String.fromCharCode(...t));
				}, d = {
					attestationObject: u(c.attestationObject),
					clientDataJSON: u(c.clientDataJSON),
					transports: c.getTransports ? c.getTransports() : []
				}, f = await e.post("/api/v1/auth/webauthn/register/verify", {
					credential: d,
					challenge: t.challenge
				}), p = R.value.trim();
				f.credential_id && (p || z.value !== "auto") && W(f.credential_id, {
					...p ? { nickname: p } : {},
					...z.value === "auto" ? {} : { attachment: z.value }
				}), R.value = "", B.value = "Passkey registered successfully.", a.success("Passkey registered successfully."), await X();
			} catch (e) {
				e instanceof Error && e.name === "NotAllowedError" ? B.value = "Registration was cancelled or timed out — try again." : e instanceof Error && (B.value = null, a.error(h(e, "Couldn’t register the passkey.", _?.locale)));
			} finally {
				I.value = !1;
			}
		}
		function ce() {
			X();
		}
		return ne(() => {
			U(), X();
		}), (e, r) => (D(), b("div", Ee, [
			r[9] ||= x("header", { class: "security-settings-page__head" }, [
				x("p", { class: "security-settings-page__eyebrow" }, "Account Security"),
				x("h2", { class: "security-settings-page__title" }, "Passkey settings"),
				x("p", { class: "security-settings-page__desc" }, " Manage your passkeys (WebAuthn/FIDO2 credentials) for passwordless login. ")
			], -1),
			x("section", De, [
				r[8] ||= x("header", { class: "security-settings-page__card-header" }, [x("h2", { class: "security-settings-page__card-title" }, "Registered Passkeys")], -1),
				x("div", Oe, [A.value ? (D(), v(f, {
					key: 0,
					label: "Loading credentials..."
				})) : F.value ? (D(), v(p, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load passkeys",
					description: F.value
				}, {
					actions: N(() => [w(m, {
						variant: "solid",
						size: "sm",
						"left-icon": "refresh",
						onClick: ce
					}, {
						default: N(() => [...r[3] ||= [C(" Retry ", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : E.value.length === 0 ? (D(), v(p, {
					key: 2,
					icon: "key",
					title: "No passkeys registered",
					description: "Add a passkey to enable passwordless login on your devices."
				})) : (D(), b("ul", ke, [(D(!0), b(g, null, re(E.value, (e) => (D(), b("li", {
					key: e.credential_id,
					class: "credential-item"
				}, [
					x("div", Ae, [w(t, { name: Y(q(e)) }, null, 8, ["name"])]),
					x("div", je, [x("span", Me, k(K(e)), 1), x("span", Ne, k(ae(q(e))) + " · Registered " + k(J(e.registered_at)), 1)]),
					w(m, {
						variant: "ghost",
						size: "sm",
						class: "credential-item__delete",
						disabled: L.value === e.credential_id,
						onClick: (t) => oe(e.credential_id)
					}, {
						default: N(() => [L.value === e.credential_id ? (D(), v(f, {
							key: 0,
							size: "xs"
						})) : (D(), v(t, {
							key: 1,
							name: "trash"
						}))]),
						_: 2
					}, 1032, ["disabled", "onClick"])
				]))), 128))]))]),
				x("footer", Pe, [
					x("div", Fe, [x("label", Ie, [r[4] ||= x("span", { class: "register-form__label" }, "Nickname (optional)", -1), P(x("input", {
						"onUpdate:modelValue": r[0] ||= (e) => R.value = e,
						type: "text",
						class: "register-form__input",
						placeholder: "e.g. Work laptop",
						maxlength: "60",
						autocomplete: "off"
					}, null, 512), [[M, R.value]])]), x("fieldset", Le, [r[5] ||= x("legend", { class: "register-form__label" }, "Authenticator type", -1), x("div", Re, [(D(), b(g, null, re(n, (e) => x("label", {
						key: e.value,
						class: "register-form__segment"
					}, [P(x("input", {
						"onUpdate:modelValue": r[1] ||= (e) => z.value = e,
						type: "radio",
						name: "passkey-attachment",
						value: e.value
					}, null, 8, ze), [[j, z.value]]), x("span", null, k(e.label), 1)])), 64))])])]),
					B.value ? (D(), b("p", Be, k(B.value), 1)) : y("", !0),
					w(m, {
						variant: "solid",
						disabled: I.value,
						onClick: Q
					}, {
						default: N(() => [I.value ? (D(), b(g, { key: 0 }, [w(f, {
							size: "xs",
							class: "mr-2"
						}), r[6] ||= C(" Starting... ", -1)], 64)) : (D(), b(g, { key: 1 }, [w(t, {
							name: "plus",
							class: "mr-2"
						}), r[7] ||= C(" Add Passkey ", -1)], 64))]),
						_: 1
					}, 8, ["disabled"])
				])
			]),
			r[10] ||= S("<section class=\"security-settings-page__info\" data-v-3e813ef0><h3 class=\"security-settings-page__info-title\" data-v-3e813ef0>What is a passkey?</h3><p data-v-3e813ef0> A passkey is a FIDO2/WebAuthn credential that allows you to log in securely without a password. It uses public-key cryptography to protect your account from phishing and credential theft attacks. </p></section><section class=\"security-settings-page__notes\" data-v-3e813ef0><h3 class=\"security-settings-page__notes-title\" data-v-3e813ef0>Security Notes</h3><ul class=\"security-settings-page__notes-list\" data-v-3e813ef0><li data-v-3e813ef0>Passkeys are unique to each device and cannot be reused if lost.</li><li data-v-3e813ef0>Keep backup codes or alternative login methods in a safe place.</li><li data-v-3e813ef0>Deleting a passkey is permanent and cannot be undone.</li><li data-v-3e813ef0>Platform authenticators (like Touch ID or Windows Hello) require the specific device.</li></ul></section>", 2),
			w(ee, {
				open: Z.value !== null,
				message: "Deleting this passkey is permanent and cannot be undone — devices using it will fall back to your other sign-in methods.",
				"confirm-label": "Delete passkey",
				danger: "",
				"onUpdate:open": r[2] ||= (e) => {
					e || (Z.value = null);
				},
				onConfirm: se
			}, null, 8, ["open"])
		]));
	}
}), [["__scopeId", "data-v-3e813ef0"]]), He = "/api/v1/auth/sessions", Ue = class extends Error {
	constructor() {
		super("Malformed /api/v1/auth/sessions envelope: missing or non-array \"sessions\""), this.name = "MalformedSessionsEnvelopeError";
	}
};
async function We(e, t) {
	let n = (await new s({ baseUrl: e }).get(He, void 0, t))?.sessions;
	if (!Array.isArray(n)) throw new Ue();
	let r = [];
	for (let e of n) {
		if (typeof e != "object" || !e) continue;
		let t = e;
		typeof t.id == "string" && t.id !== "" && r.push({
			id: t.id,
			current: t.current === !0,
			created_at: typeof t.created_at == "string" ? t.created_at : null,
			last_used_at: typeof t.last_used_at == "string" ? t.last_used_at : null,
			device_type: typeof t.device_type == "string" && t.device_type !== "" ? t.device_type : null,
			device_name: typeof t.device_name == "string" && t.device_name !== "" ? t.device_name : null
		});
	}
	return r;
}
async function Ge(e, t, n) {
	await new s({ baseUrl: e }).delete(`${He}/${encodeURIComponent(t)}`, n);
}
function Ke(e) {
	return e instanceof a && e.status === 404;
}
// src/pages/DeviceSessionsPage.vue?vue&type=script&setup=true&lang.ts
var qe = { class: "device-sessions-page" }, Je = { class: "device-sessions-page__head" }, Ye = { class: "device-sessions-page__eyebrow" }, Xe = { class: "device-sessions-page__title" }, Ze = { class: "device-sessions-page__desc" }, Qe = { class: "device-sessions-page__card" }, $e = { class: "device-sessions-page__card-header" }, et = { class: "device-sessions-page__card-heading" }, tt = {
	key: 0,
	class: "device-sessions-page__count",
	"data-testid": "sessions-count"
}, nt = { class: "device-sessions-page__card-actions" }, rt = { class: "device-sessions-page__card-body" }, it = {
	key: 3,
	class: "session-list"
}, at = { class: "session-item__icon" }, ot = { class: "session-item__info" }, st = { class: "session-item__label" }, ct = {
	key: 0,
	class: "session-item__badge",
	"data-testid": "session-current-badge"
}, lt = {
	key: 0,
	class: "session-item__meta"
}, ut = /*#__PURE__*/ e(/* @__PURE__ */ T({
	__name: "DeviceSessionsPage",
	setup(e) {
		let r = l(), a = d(), { t: o } = i(), s = te("phlixConfig", null), c = O([]), u = O(!0), S = O(null), T = O(null), j = O(!1), M = O(null), P = _(() => c.value.filter((e) => !e.current)), F = _(() => P.value.length > 0), I = _(() => T.value !== null || j.value), L = _(() => c.value.length >= 200), R = O(null);
		async function z() {
			u.value = !0, S.value = null;
			try {
				c.value = await We(r.value);
			} catch (e) {
				S.value = e instanceof Ue ? o("sessions.loadError") : h(e, o("sessions.loadError"), s?.locale);
			} finally {
				u.value = !1;
			}
		}
		async function B() {
			if (await z(), await E(), typeof document > "u") return;
			let e = document.activeElement;
			e !== null && e !== document.body && e.isConnected || R.value?.focus();
		}
		function V() {
			B();
		}
		function H(e) {
			if (!e) return null;
			let t = /^(\d{4})-(\d{2})-(\d{2})/.exec(e);
			if (!t) return null;
			let [, n, r, i] = t;
			return new Date(Number(n), Number(r) - 1, Number(i)).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function U(e) {
			if (!e) return null;
			let t = /^\d{4}-\d{2}-\d{2}[ T](\d{2}):(\d{2})/.exec(e);
			return t ? `${t[1]}:${t[2]}` : null;
		}
		function W(e) {
			return e.device_name ?? o("sessions.unknownDevice");
		}
		function ie(e) {
			return e.device_type === "tv" ? "tv" : "monitor";
		}
		function G(e) {
			let t = H(e.created_at), n = H(e.last_used_at), r = [];
			if (t && r.push(o("sessions.created", { date: t })), n) {
				let t = U(e.last_used_at);
				r.push(t ? o("sessions.lastUsedAt", {
					date: n,
					time: t
				}) : o("sessions.lastUsed", { date: n }));
			}
			return r.join(" · ");
		}
		let K = _(() => {
			let e = M.value;
			if (e?.kind === "others") return o("sessions.revokeAllConfirm", { count: P.value.length });
			let t = e ? c.value.find((t) => t.id === e.id) : void 0;
			return t ? o("sessions.revokeConfirmDevice", { device: W(t) }) : o("sessions.revokeConfirm");
		});
		function q(e) {
			M.value = {
				kind: "one",
				id: e
			};
		}
		function J() {
			M.value = { kind: "others" };
		}
		function Y(e) {
			e || (M.value = null);
		}
		async function ae() {
			let e = M.value;
			if (M.value = null, !e) return;
			if (e.kind === "one") {
				T.value = e.id;
				try {
					await Ge(r.value, e.id), a.success(o("sessions.revokeSuccess"));
				} catch (e) {
					a.error(h(e, o("sessions.revokeError"), s?.locale));
				} finally {
					T.value = null;
				}
				await B();
				return;
			}
			let t = P.value.map((e) => e.id);
			j.value = !0;
			let n = null;
			for (let e of t) {
				T.value = e;
				try {
					await Ge(r.value, e);
				} catch (e) {
					if (Ke(e)) continue;
					n = e;
					break;
				}
			}
			T.value = null, j.value = !1, n === null ? a.success(o("sessions.revokeOthersSuccess", { count: t.length })) : a.error(h(n, o("sessions.revokeOthersError"), s?.locale)), await B();
		}
		return ne(() => {
			z();
		}), (e, r) => (D(), b("div", qe, [
			x("header", Je, [
				x("p", Ye, k(A(o)("sessions.eyebrow")), 1),
				x("h2", Xe, k(A(o)("sessions.title")), 1),
				x("p", Ze, k(A(o)("sessions.desc")), 1)
			]),
			x("section", Qe, [x("header", $e, [x("div", et, [x("h2", {
				ref_key: "parkEl",
				ref: R,
				class: "device-sessions-page__card-title",
				tabindex: "-1",
				"data-testid": "sessions-card-title"
			}, k(A(o)("sessions.cardTitle")), 513), !u.value && !S.value ? (D(), b("span", tt, k(L.value ? A(o)("sessions.truncated", { count: A(200) }) : A(o)("sessions.count", { count: c.value.length })), 1)) : y("", !0)]), x("div", nt, [w(m, {
				variant: "ghost",
				size: "sm",
				"left-icon": "refresh",
				loading: u.value,
				disabled: I.value,
				"data-testid": "sessions-refresh",
				onClick: V
			}, {
				default: N(() => [C(k(A(o)("sessions.refresh")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"]), F.value ? (D(), v(m, {
				key: 0,
				variant: "ghost",
				size: "sm",
				loading: j.value,
				disabled: I.value && !j.value,
				"data-testid": "sessions-revoke-others",
				onClick: J
			}, {
				default: N(() => [C(k(A(o)("sessions.revokeAll")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])) : y("", !0)])]), x("div", rt, [u.value ? (D(), v(f, {
				key: 0,
				label: A(o)("sessions.loading")
			}, null, 8, ["label"])) : S.value ? (D(), v(p, {
				key: 1,
				icon: "alert",
				title: A(o)("sessions.loadErrorTitle"),
				description: S.value
			}, {
				actions: N(() => [w(m, {
					variant: "solid",
					size: "sm",
					"left-icon": "refresh",
					"data-testid": "sessions-retry",
					onClick: V
				}, {
					default: N(() => [C(k(A(o)("sessions.refresh")), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : c.value.length === 0 ? (D(), v(p, {
				key: 2,
				icon: "monitor",
				title: A(o)("sessions.emptyTitle"),
				description: A(o)("sessions.emptyDescription")
			}, null, 8, ["title", "description"])) : (D(), b("ul", it, [(D(!0), b(g, null, re(c.value, (e) => (D(), b("li", {
				key: e.id,
				class: "session-item",
				"data-testid": "session-item"
			}, [
				x("div", at, [w(t, { name: ie(e) }, null, 8, ["name"])]),
				x("div", ot, [x("span", st, [C(k(W(e)) + " ", 1), e.current ? (D(), b("span", ct, k(A(o)("sessions.thisDevice")), 1)) : y("", !0)]), G(e) ? (D(), b("span", lt, k(G(e)), 1)) : y("", !0)]),
				e.current ? y("", !0) : (D(), v(n, {
					key: 0,
					name: "trash",
					size: "sm",
					class: "session-item__revoke",
					label: A(o)("sessions.revokeDevice", { device: W(e) }),
					loading: T.value === e.id,
					disabled: I.value && T.value !== e.id,
					"data-testid": `session-revoke-${e.id}`,
					onClick: (t) => q(e.id)
				}, null, 8, [
					"label",
					"loading",
					"disabled",
					"data-testid",
					"onClick"
				]))
			]))), 128))]))])]),
			w(ee, {
				open: M.value !== null,
				message: K.value,
				"confirm-label": M.value?.kind === "others" ? A(o)("sessions.revokeAll") : A(o)("sessions.revoke"),
				danger: "",
				"onUpdate:open": Y,
				onConfirm: ae
			}, null, 8, [
				"open",
				"message",
				"confirm-label"
			])
		]));
	}
}), [["__scopeId", "data-v-1f6cb8e0"]]);
export { Q as C, ye as E, ve as S, q as T, B as _, be as a, X as b, Z as c, R as d, ce as f, he as g, me as h, xe as i, ue as l, _e as m, Ve as n, I as o, ge as p, Te as r, le as s, ut as t, $ as u, L as v, se as w, de as x, K as y };

//# sourceMappingURL=DeviceSessionsPage-xPiIOEgy.js.map