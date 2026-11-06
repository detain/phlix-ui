import { n as e, t } from "./Icon-55iG1rR7.js";
import { a as n } from "./usePreferencesStore-DrDMAwjz.js";
import { t as r } from "./useMessages-CrbiNZLy.js";
import { t as i, x as a } from "./client-fSGeXil2.js";
import { n as o } from "./useApiBase-DXTBY90j.js";
import { t as s } from "./useAuthStore-B2RmLgIM.js";
import { t as c } from "./useToastStore-CxO_ppM8.js";
import { t as l } from "./Spinner-BNjoYh2x.js";
import { t as u } from "./EmptyState-DjfWh3kt.js";
import { t as d } from "./Button-BLpPomsd.js";
import { t as f } from "./ConfirmDialog-B9UrqjZ7.js";
import { r as p } from "./wireErrors-BEWfE19X.js";
import { Fragment as m, computed as h, createBlock as g, createCommentVNode as ee, createElementBlock as _, createElementVNode as v, createStaticVNode as te, createTextVNode as y, createVNode as b, defineComponent as x, inject as ne, onMounted as re, openBlock as S, ref as C, renderList as ie, toDisplayString as w, vModelRadio as ae, vModelText as oe, withCtx as T, withDirectives as se } from "vue";
import { defineStore as E } from "pinia";
// src/composables/themeTokens.ts
var D = [
	"nocturne",
	"daylight",
	"midnight"
];
function O(e) {
	return D.includes(e);
}
var k = /* @__PURE__ */ "--accent.--accent-hover.--accent-active.--accent-soft.--accent-ring.--accent-text.--bg.--surface.--surface-2.--surface-3.--surface-glass.--surface-glass-strong.--text.--text-muted.--text-subtle.--text-faint.--text-on-accent.--border.--border-subtle.--border-strong.--error.--error-bg.--success.--success-bg.--warning.--warning-bg.--info.--info-bg.--grain-opacity.--vignette.--ambient.--color-bg.--color-surface.--color-surface-hover.--color-surface-elevated.--color-surface-active.--color-text.--color-text-secondary.--color-text-muted.--color-text-subtle.--color-primary.--color-primary-hover.--color-primary-active.--color-border.--color-border-subtle.--color-error.--color-error-bg.--color-success.--color-success-bg.--color-warning.--color-warning-bg.--color-info.--color-info-bg".split("."), A = new Set(k);
function j(e) {
	return A.has(e);
}
var M = 128, N = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, P = /^[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/, F = "[+-]?(?:[0-9]+(?:\\.[0-9]+)?|\\.[0-9]+)(?:%|deg)?", I = RegExp(`^(?:rgba?|hsla?)\\((?: *)${F}(?:(?: *)[,/](?: *)${F}){2,3}(?: *)\\)$`, "i"), L = ["transparent", "currentcolor"];
function R(e) {
	let t = e.trim();
	return t === "" || t.length > M ? !1 : L.includes(t.toLowerCase()) ? !0 : N.test(t) || I.test(t) || P.test(t);
}
function z(e) {
	let t = {};
	if (typeof e != "object" || !e || Array.isArray(e)) return t;
	for (let [n, r] of Object.entries(e)) j(n) && typeof r == "string" && R(r) && (t[n] = r.trim());
	return t;
}
var B = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/, ce = 64, V = /* @__PURE__ */ RegExp("[\\u0000-\\u001f\\u007f]");
function H(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return null;
	let t = e, n = typeof t.id == "string" ? t.id : "";
	if (!B.test(n)) return null;
	let r = typeof t.name == "string" ? t.name.trim() : "";
	if (r === "" || r.length > ce || V.test(r)) return null;
	let i = typeof t.extends == "string" && B.test(t.extends) && t.extends !== n ? t.extends : null;
	return {
		id: n,
		name: r,
		dark: t.dark === !0,
		extends: i,
		tokens: z(t.tokens),
		source: typeof t.source == "string" && t.source !== "" ? t.source : null,
		builtIn: t.builtIn === !0 || O(n)
	};
}
var U = 8;
function W(e, t) {
	let n = new Map(t.map((e) => [e.id, e])), r = [], i = /* @__PURE__ */ new Set(), a = e;
	for (let e = 0; e < 8 && a !== null && !(i.has(a) || O(a)); e++) {
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
	if (O(e)) return e;
	let n = W(e, t);
	for (let e of n) if (e.extends !== null && O(e.extends)) return e.extends;
	return n[0]?.dark === !1 ? "daylight" : "nocturne";
}
function q(e, t) {
	return O(e) || t.find((t) => t.id === e) === void 0 ? null : {
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
function le(e, t) {
	let n = Z(e), r = Z(t);
	return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function ue(e, t) {
	let n = X(e), r = X(t);
	if (n === null || r === null || r.alpha < 1) return null;
	let i = (e) => Math.round(n.alpha * n.rgb[e] + (1 - n.alpha) * r.rgb[e]);
	return le([
		i(0),
		i(1),
		i(2)
	], r.rgb);
}
function de(e) {
	let t = e["--accent-ring"];
	if (t === void 0) return null;
	for (let n of Y) {
		let r = e[n];
		if (r === void 0) continue;
		let i = ue(t, r);
		if (!(i === null || i >= 3)) return `--accent-ring ${t} composited to ${i.toFixed(2)}:1 on ${n} (${r}) is below the 3:1 WCAG 1.4.11 floor for the focus indicator`;
	}
	return null;
}
function fe(e, t) {
	let n = de(t);
	for (let [r, i] of Object.entries(t)) j(r) && R(i) && (r === "--accent-ring" && n !== null ? console.warn(`[phlix:theme] ${n}; falling back to the base theme's ring`) : e.style.setProperty(r, i));
}
function pe(e) {
	for (let t of k) e.style.removeProperty(t);
}
var Q = "phlix.theme.active";
function me() {
	if (typeof localStorage > "u") return null;
	try {
		let e = localStorage.getItem(Q);
		if (e === null) return null;
		let t = JSON.parse(e);
		if (typeof t != "object" || !t || Array.isArray(t)) return null;
		let n = t, r = typeof n.id == "string" ? n.id : "";
		if (!B.test(r) || O(r)) return null;
		let i = typeof n.base == "string" && O(n.base) ? n.base : null;
		return i === null ? null : {
			id: r,
			base: i,
			tokens: z(n.tokens)
		};
	} catch {
		return null;
	}
}
function he(e) {
	if (typeof localStorage < "u") try {
		e === null ? localStorage.removeItem(Q) : localStorage.setItem(Q, JSON.stringify(e));
	} catch {}
}
// src/api/themes.ts
async function ge(e, t) {
	let n = await new i({ baseUrl: e }).get("/api/v1/themes", void 0, t), r = Array.isArray(n.themes) ? n.themes : [], a = [];
	for (let e of r) {
		let t = H(e);
		t !== null && a.push(t);
	}
	return a;
}
// src/stores/useThemesStore.ts
var $ = E("themes", () => {
	let e = C([]), t = C(!1), n = C(!1), r = C(null), i = null;
	async function o(o, s = !1) {
		if (o !== null && (!n.value || s)) return i || (t.value = !0, r.value = null, i = (async () => {
			try {
				e.value = await ge(o), n.value = !0;
			} catch (e) {
				r.value = a(e, "Failed to load themes");
			} finally {
				t.value = !1, i = null;
			}
		})(), i);
	}
	let s = h(() => e.value.filter((e) => !e.builtIn));
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
});
// src/api/themeSettings.ts
async function _e(e, t) {
	let n = (await new i({ baseUrl: e }).get("/api/v1/users/me/settings", void 0, t))?.settings;
	if (typeof n != "object" || !n) return null;
	let r = n.theme;
	return typeof r == "string" && r !== "" ? r : null;
}
async function ve(e, t, n) {
	await new i({ baseUrl: e }).put("/api/v1/users/me/settings", { theme: t }, n);
}
// src/stores/useThemeSyncStore.ts
var ye = 1e3, be = E("themeSync", () => {
	let e = n(), t = $(), r = s(), i = C(null), a = C(!1), o = !1, c, l = null, u = 0;
	function d() {
		c !== void 0 && (clearTimeout(c), c = void 0);
	}
	async function f(n) {
		if (!(n === null || o)) {
			o = !0;
			try {
				if (await t.load(n), t.error !== null) return;
				let r = await _e(n);
				if (r === null || !(O(r) || t.byId(r) !== void 0)) return;
				i.value = r, e.theme !== r && (e.theme = r);
			} catch {}
		}
	}
	function p(e, t) {
		r.isLoggedIn && (d(), (t !== i.value || u !== 0) && (l = t, c = setTimeout(() => {
			c = void 0;
			let t = l;
			t === null || t === i.value && u === 0 || (u += 1, ve(e, t).then(() => {
				t === l && (i.value = t), a.value = !1;
			}).catch(() => {
				t === l && (a.value = !0);
			}).finally(() => {
				--u;
			}));
		}, ye)));
	}
	function m() {
		o = !1, d(), l = null, i.value = null, a.value = !1;
	}
	return {
		serverTheme: i,
		putFailed: a,
		syncFromServer: f,
		queuePut: p,
		endSession: m
	};
}), xe = { class: "security-settings-page" }, Se = { class: "security-settings-page__card" }, Ce = { class: "security-settings-page__card-body" }, we = {
	key: 3,
	class: "credentials-list"
}, Te = { class: "credential-item__icon" }, Ee = { class: "credential-item__info" }, De = { class: "credential-item__id" }, Oe = { class: "credential-item__meta" }, ke = { class: "security-settings-page__card-footer" }, Ae = { class: "register-form" }, je = { class: "register-form__field" }, Me = { class: "register-form__choice" }, Ne = { class: "register-form__segments" }, Pe = ["value"], Fe = {
	key: 0,
	class: "security-settings-page__status",
	role: "status"
}, Ie = /*#__PURE__*/ e(/* @__PURE__ */ x({
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
		], a = o(), h = c(), x = s(), { t: E } = r(), D = ne("phlixConfig", null);
		function O() {
			return new i({ baseUrl: a.value });
		}
		let k = C([]), A = C(!0), j = C(null), M = C(!1), N = C(null), P = C(""), F = C("auto"), I = C(null), L = C({});
		function R() {
			let e = x.user?.id;
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
		function ce(e) {
			if (!(e in L.value)) return;
			let t = { ...L.value };
			delete t[e], L.value = t;
			try {
				localStorage.setItem(R(), JSON.stringify(t));
			} catch {}
		}
		function V(e) {
			return L.value[e];
		}
		function H(e) {
			return V(e.credential_id)?.nickname || `${e.credential_id.substring(0, 20)}…`;
		}
		function U(e) {
			if (e.device_type === "platform" || e.device_type === "cross-platform") return e.device_type;
			let t = V(e.credential_id)?.attachment;
			return t === "platform" || t === "cross-platform" ? t : null;
		}
		function W(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function G(e) {
			return e === "platform" ? "monitor" : "key";
		}
		function K(e) {
			return e === "platform" ? "Platform authenticator" : e === "cross-platform" ? "Security key" : "Passkey";
		}
		async function q() {
			A.value = !0, j.value = null;
			try {
				let e = await O().get("/api/v1/me/webauthn/credentials");
				k.value = e.credentials ?? [];
			} catch (e) {
				j.value = p(e, "Failed to load credentials", D?.locale);
			} finally {
				A.value = !1;
			}
		}
		let J = C(null);
		function Y(e) {
			J.value = e;
		}
		async function X() {
			let e = J.value;
			if (J.value = null, e) {
				N.value = e;
				try {
					await O().delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(e)}`), ce(e), h.success("Passkey deleted successfully."), await q();
				} catch (e) {
					h.error(p(e, "Failed to delete passkey", D?.locale));
				} finally {
					N.value = null;
				}
			}
		}
		async function Z() {
			M.value = !0, I.value = null;
			try {
				let e = O(), t = await e.post("/api/v1/auth/webauthn/register/options", {}), n = t.user.name ?? x.user?.username ?? x.user?.email ?? "phlix user", r = t.user.displayName ?? x.user?.name ?? x.user?.username ?? n, i = {
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
				}), P.value = "", I.value = "Passkey registered successfully.", h.success("Passkey registered successfully."), await q();
			} catch (e) {
				e instanceof Error && e.name === "NotAllowedError" ? I.value = "Registration was cancelled or timed out — try again." : e instanceof Error && (I.value = null, h.error(p(e, "Couldn’t register the passkey.", D?.locale)));
			} finally {
				M.value = !1;
			}
		}
		function le() {
			q();
		}
		return re(() => {
			z(), q();
		}), (e, r) => (S(), _("div", xe, [
			r[9] ||= v("header", { class: "security-settings-page__head" }, [
				v("p", { class: "security-settings-page__eyebrow" }, "Account Security"),
				v("h1", { class: "security-settings-page__title" }, "Passkey settings"),
				v("p", { class: "security-settings-page__desc" }, " Manage your passkeys (WebAuthn/FIDO2 credentials) for passwordless login. ")
			], -1),
			v("section", Se, [
				r[8] ||= v("header", { class: "security-settings-page__card-header" }, [v("h2", { class: "security-settings-page__card-title" }, "Registered Passkeys")], -1),
				v("div", Ce, [A.value ? (S(), g(l, {
					key: 0,
					label: "Loading credentials..."
				})) : j.value ? (S(), g(u, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load passkeys",
					description: j.value
				}, {
					actions: T(() => [b(d, {
						variant: "solid",
						size: "sm",
						"left-icon": "refresh",
						onClick: le
					}, {
						default: T(() => [...r[3] ||= [y(" Retry ", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : k.value.length === 0 ? (S(), g(u, {
					key: 2,
					icon: "key",
					title: "No passkeys registered",
					description: "Add a passkey to enable passwordless login on your devices."
				})) : (S(), _("ul", we, [(S(!0), _(m, null, ie(k.value, (e) => (S(), _("li", {
					key: e.credential_id,
					class: "credential-item"
				}, [
					v("div", Te, [b(t, { name: G(U(e)) }, null, 8, ["name"])]),
					v("div", Ee, [v("span", De, w(H(e)), 1), v("span", Oe, w(K(U(e))) + " · Registered " + w(W(e.registered_at)), 1)]),
					b(d, {
						variant: "ghost",
						size: "sm",
						class: "credential-item__delete",
						disabled: N.value === e.credential_id,
						onClick: (t) => Y(e.credential_id)
					}, {
						default: T(() => [N.value === e.credential_id ? (S(), g(l, {
							key: 0,
							size: "xs"
						})) : (S(), g(t, {
							key: 1,
							name: "trash"
						}))]),
						_: 2
					}, 1032, ["disabled", "onClick"])
				]))), 128))]))]),
				v("footer", ke, [
					v("div", Ae, [v("label", je, [r[4] ||= v("span", { class: "register-form__label" }, "Nickname (optional)", -1), se(v("input", {
						"onUpdate:modelValue": r[0] ||= (e) => P.value = e,
						type: "text",
						class: "register-form__input",
						placeholder: "e.g. Work laptop",
						maxlength: "60",
						autocomplete: "off"
					}, null, 512), [[oe, P.value]])]), v("fieldset", Me, [r[5] ||= v("legend", { class: "register-form__label" }, "Authenticator type", -1), v("div", Ne, [(S(), _(m, null, ie(n, (e) => v("label", {
						key: e.value,
						class: "register-form__segment"
					}, [se(v("input", {
						"onUpdate:modelValue": r[1] ||= (e) => F.value = e,
						type: "radio",
						name: "passkey-attachment",
						value: e.value
					}, null, 8, Pe), [[ae, F.value]]), v("span", null, w(e.label), 1)])), 64))])])]),
					I.value ? (S(), _("p", Fe, w(I.value), 1)) : ee("", !0),
					b(d, {
						variant: "solid",
						disabled: M.value,
						onClick: Z
					}, {
						default: T(() => [M.value ? (S(), _(m, { key: 0 }, [b(l, {
							size: "xs",
							class: "mr-2"
						}), r[6] ||= y(" Starting... ", -1)], 64)) : (S(), _(m, { key: 1 }, [b(t, {
							name: "plus",
							class: "mr-2"
						}), r[7] ||= y(" Add Passkey ", -1)], 64))]),
						_: 1
					}, 8, ["disabled"])
				])
			]),
			r[10] ||= te("<section class=\"security-settings-page__info\" data-v-9f3b487c><h3 class=\"security-settings-page__info-title\" data-v-9f3b487c>What is a passkey?</h3><p data-v-9f3b487c> A passkey is a FIDO2/WebAuthn credential that allows you to log in securely without a password. It uses public-key cryptography to protect your account from phishing and credential theft attacks. </p></section><section class=\"security-settings-page__notes\" data-v-9f3b487c><h3 class=\"security-settings-page__notes-title\" data-v-9f3b487c>Security Notes</h3><ul class=\"security-settings-page__notes-list\" data-v-9f3b487c><li data-v-9f3b487c>Passkeys are unique to each device and cannot be reused if lost.</li><li data-v-9f3b487c>Keep backup codes or alternative login methods in a safe place.</li><li data-v-9f3b487c>Deleting a passkey is permanent and cannot be undone.</li><li data-v-9f3b487c>Platform authenticators (like Touch ID or Windows Hello) require the specific device.</li></ul></section>", 2),
			b(f, {
				open: J.value !== null,
				message: "Deleting this passkey is permanent and cannot be undone — devices using it will fall back to your other sign-in methods.",
				"confirm-label": "Delete passkey",
				danger: "",
				"onUpdate:open": r[2] ||= (e) => {
					e || (J.value = null);
				},
				onConfirm: X
			}, null, 8, ["open"])
		]));
	}
}), [["__scopeId", "data-v-9f3b487c"]]);
export { G as C, K as S, he as T, O as _, D as a, X as b, Y as c, q as d, fe as f, j as g, de as h, ge as i, Q as l, ue as m, be as n, J as o, pe as p, $ as r, U as s, Ie as t, k as u, R as v, z as w, me as x, H as y };

//# sourceMappingURL=SecuritySettingsPage-D_bqn2tr.js.map