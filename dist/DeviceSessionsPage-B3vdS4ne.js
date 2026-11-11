import { n as e, t } from "./Icon-55iG1rR7.js";
import { a as n } from "./usePreferencesStore-DrDMAwjz.js";
import { t as r } from "./useMessages-BoZa6NgT.js";
import { T as i, t as a } from "./client-CdNyEcUJ.js";
import { n as o, t as s } from "./useApiBase-DXTBY90j.js";
import { t as c } from "./useAuthStore-CgPY1Paj.js";
import { t as l } from "./useToastStore-CxO_ppM8.js";
import { t as u } from "./Spinner-G4M9vj6W.js";
import { t as d } from "./EmptyState-DjfWh3kt.js";
import { t as f } from "./Button-Dfl4y6vO.js";
import { t as ee } from "./ConfirmDialog-DR-coNRV.js";
import { r as p } from "./wireErrors-vFjB6F7m.js";
import { Fragment as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createStaticVNode as b, createTextVNode as x, createVNode as S, defineComponent as C, inject as te, onMounted as ne, openBlock as w, ref as T, renderList as re, toDisplayString as E, unref as D, vModelRadio as O, vModelText as k, withCtx as A, withDirectives as j } from "vue";
import { defineStore as M } from "pinia";
// src/composables/themeTokens.ts
var N = [
	"nocturne",
	"daylight",
	"midnight"
];
function P(e) {
	return N.includes(e);
}
var F = /* @__PURE__ */ "--accent.--accent-hover.--accent-active.--accent-soft.--accent-ring.--accent-text.--bg.--surface.--surface-2.--surface-3.--surface-glass.--surface-glass-strong.--text.--text-muted.--text-subtle.--text-faint.--text-on-accent.--border.--border-subtle.--border-strong.--error.--error-bg.--success.--success-bg.--warning.--warning-bg.--info.--info-bg.--grain-opacity.--vignette.--ambient.--color-bg.--color-surface.--color-surface-hover.--color-surface-elevated.--color-surface-active.--color-text.--color-text-secondary.--color-text-muted.--color-text-subtle.--color-primary.--color-primary-hover.--color-primary-active.--color-border.--color-border-subtle.--color-error.--color-error-bg.--color-success.--color-success-bg.--color-warning.--color-warning-bg.--color-info.--color-info-bg".split("."), I = new Set(F);
function L(e) {
	return I.has(e);
}
var R = 128, z = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, B = /^[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/, V = "[+-]?(?:[0-9]+(?:\\.[0-9]+)?|\\.[0-9]+)(?:%|deg)?", H = RegExp(`^(?:rgba?|hsla?)\\((?: *)${V}(?:(?: *)[,/](?: *)${V}){2,3}(?: *)\\)$`, "i"), ie = ["transparent", "currentcolor"];
function U(e) {
	let t = e.trim();
	return t === "" || t.length > R ? !1 : ie.includes(t.toLowerCase()) ? !0 : z.test(t) || H.test(t) || B.test(t);
}
function W(e) {
	let t = {};
	if (typeof e != "object" || !e || Array.isArray(e)) return t;
	for (let [n, r] of Object.entries(e)) L(n) && typeof r == "string" && U(r) && (t[n] = r.trim());
	return t;
}
var G = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/, ae = 64, K = /* @__PURE__ */ RegExp("[\\u0000-\\u001f\\u007f]");
function q(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return null;
	let t = e, n = typeof t.id == "string" ? t.id : "";
	if (!G.test(n)) return null;
	let r = typeof t.name == "string" ? t.name.trim() : "";
	if (r === "" || r.length > ae || K.test(r)) return null;
	let i = typeof t.extends == "string" && G.test(t.extends) && t.extends !== n ? t.extends : null;
	return {
		id: n,
		name: r,
		dark: t.dark === !0,
		extends: i,
		tokens: W(t.tokens),
		source: typeof t.source == "string" && t.source !== "" ? t.source : null,
		builtIn: t.builtIn === !0 || P(n)
	};
}
var oe = 8;
function J(e, t) {
	let n = new Map(t.map((e) => [e.id, e])), r = [], i = /* @__PURE__ */ new Set(), a = e;
	for (let e = 0; e < 8 && a !== null && !(i.has(a) || P(a)); e++) {
		let e = n.get(a);
		if (e === void 0) break;
		i.add(a), r.push(e), a = e.extends;
	}
	return r;
}
function Y(e, t) {
	let n = {};
	for (let r of J(e, t).reverse()) n = {
		...n,
		...r.tokens
	};
	return n;
}
function X(e, t) {
	if (P(e)) return e;
	let n = J(e, t);
	for (let e of n) if (e.extends !== null && P(e.extends)) return e.extends;
	return n[0]?.dark === !1 ? "daylight" : "nocturne";
}
function se(e, t) {
	return P(e) || t.find((t) => t.id === e) === void 0 ? null : {
		id: e,
		base: X(e, t),
		tokens: Y(e, t)
	};
}
var ce = 3, Z = [
	"--bg",
	"--surface",
	"--surface-2"
];
function Q(e) {
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
function le(e) {
	let t = e.map((e) => {
		let t = e / 255;
		return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * t[0] + .7152 * t[1] + .0722 * t[2];
}
function ue(e, t) {
	let n = le(e), r = le(t);
	return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function de(e, t) {
	let n = Q(e), r = Q(t);
	if (n === null || r === null || r.alpha < 1) return null;
	let i = (e) => Math.round(n.alpha * n.rgb[e] + (1 - n.alpha) * r.rgb[e]);
	return ue([
		i(0),
		i(1),
		i(2)
	], r.rgb);
}
function fe(e) {
	let t = e["--accent-ring"];
	if (t === void 0) return null;
	for (let n of Z) {
		let r = e[n];
		if (r === void 0) continue;
		let i = de(t, r);
		if (!(i === null || i >= 3)) return `--accent-ring ${t} composited to ${i.toFixed(2)}:1 on ${n} (${r}) is below the 3:1 WCAG 1.4.11 floor for the focus indicator`;
	}
	return null;
}
function pe(e, t) {
	let n = fe(t);
	for (let [r, i] of Object.entries(t)) L(r) && U(i) && (r === "--accent-ring" && n !== null ? console.warn(`[phlix:theme] ${n}; falling back to the base theme's ring`) : e.style.setProperty(r, i));
}
function me(e) {
	for (let t of F) e.style.removeProperty(t);
}
var $ = "phlix.theme.active";
function he() {
	if (typeof localStorage > "u") return null;
	try {
		let e = localStorage.getItem($);
		if (e === null) return null;
		let t = JSON.parse(e);
		if (typeof t != "object" || !t || Array.isArray(t)) return null;
		let n = t, r = typeof n.id == "string" ? n.id : "";
		if (!G.test(r) || P(r)) return null;
		let i = typeof n.base == "string" && P(n.base) ? n.base : null;
		return i === null ? null : {
			id: r,
			base: i,
			tokens: W(n.tokens)
		};
	} catch {
		return null;
	}
}
function ge(e) {
	if (typeof localStorage < "u") try {
		e === null ? localStorage.removeItem($) : localStorage.setItem($, JSON.stringify(e));
	} catch {}
}
// src/api/themes.ts
async function _e(e, t) {
	let n = await new a({ baseUrl: e }).get("/api/v1/themes", void 0, t), r = Array.isArray(n.themes) ? n.themes : [], i = [];
	for (let e of r) {
		let t = q(e);
		t !== null && i.push(t);
	}
	return i;
}
// src/stores/useThemesStore.ts
var ve = M("themes", () => {
	let e = T([]), t = T(!1), n = T(!1), r = T(null), a = null;
	async function o(o, s = !1) {
		if (o !== null && (!n.value || s)) return a || (t.value = !0, r.value = null, a = (async () => {
			try {
				e.value = await _e(o), n.value = !0;
			} catch (e) {
				r.value = i(e, "Failed to load themes");
			} finally {
				t.value = !1, a = null;
			}
		})(), a);
	}
	let s = h(() => e.value.filter((e) => !e.builtIn));
	function c(t) {
		return e.value.find((e) => e.id === t);
	}
	function l(t) {
		return se(t, e.value);
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
async function ye(e, t) {
	let n = (await new a({ baseUrl: e }).get("/api/v1/users/me/settings", void 0, t))?.settings;
	if (typeof n != "object" || !n) return null;
	let r = n.theme;
	return typeof r == "string" && r !== "" ? r : null;
}
async function be(e, t, n) {
	await new a({ baseUrl: e }).put("/api/v1/users/me/settings", { theme: t }, n);
}
// src/stores/useThemeSyncStore.ts
var xe = 1e3, Se = M("themeSync", () => {
	let e = n(), t = ve(), r = c(), i = T(null), a = T(!1), o = !1, s, l = null, u = 0;
	function d() {
		s !== void 0 && (clearTimeout(s), s = void 0);
	}
	async function f(n) {
		if (!(n === null || o)) {
			o = !0;
			try {
				if (await t.load(n), t.error !== null) return;
				let r = await ye(n);
				if (r === null || !(P(r) || t.byId(r) !== void 0)) return;
				i.value = r, e.theme !== r && (e.theme = r);
			} catch {}
		}
	}
	function ee(e, t) {
		r.isLoggedIn && (d(), (t !== i.value || u !== 0) && (l = t, s = setTimeout(() => {
			s = void 0;
			let t = l;
			t === null || t === i.value && u === 0 || (u += 1, be(e, t).then(() => {
				t === l && (i.value = t), a.value = !1;
			}).catch(() => {
				t === l && (a.value = !0);
			}).finally(() => {
				--u;
			}));
		}, xe)));
	}
	function p() {
		o = !1, d(), l = null, i.value = null, a.value = !1;
	}
	return {
		serverTheme: i,
		putFailed: a,
		syncFromServer: f,
		queuePut: ee,
		endSession: p
	};
}), Ce = { class: "security-settings-page" }, we = { class: "security-settings-page__card" }, Te = { class: "security-settings-page__card-body" }, Ee = {
	key: 3,
	class: "credentials-list"
}, De = { class: "credential-item__icon" }, Oe = { class: "credential-item__info" }, ke = { class: "credential-item__id" }, Ae = { class: "credential-item__meta" }, je = { class: "security-settings-page__card-footer" }, Me = { class: "register-form" }, Ne = { class: "register-form__field" }, Pe = { class: "register-form__choice" }, Fe = { class: "register-form__segments" }, Ie = ["value"], Le = {
	key: 0,
	class: "security-settings-page__status",
	role: "status"
}, Re = /*#__PURE__*/ e(/* @__PURE__ */ C({
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
		], i = o(), s = l(), h = c(), { t: C } = r(), D = te("phlixConfig", null);
		function M() {
			return new a({ baseUrl: i.value });
		}
		let N = T([]), P = T(!0), F = T(null), I = T(!1), L = T(null), R = T(""), z = T("auto"), B = T(null), V = T({});
		function H() {
			let e = h.user?.id;
			return e ? `phlix.passkey-meta.${e}` : "phlix.passkey-meta";
		}
		function ie() {
			try {
				let e = localStorage.getItem(H()), t = e ? JSON.parse(e) : {};
				V.value = t && typeof t == "object" ? t : {};
			} catch {
				V.value = {};
			}
		}
		function U(e, t) {
			V.value = {
				...V.value,
				[e]: t
			};
			try {
				localStorage.setItem(H(), JSON.stringify(V.value));
			} catch {}
		}
		function W(e) {
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
		function ae(e) {
			return G(e.credential_id)?.nickname || `${e.credential_id.substring(0, 20)}…`;
		}
		function K(e) {
			if (e.device_type === "platform" || e.device_type === "cross-platform") return e.device_type;
			let t = G(e.credential_id)?.attachment;
			return t === "platform" || t === "cross-platform" ? t : null;
		}
		function q(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function oe(e) {
			return e === "platform" ? "monitor" : "key";
		}
		function J(e) {
			return e === "platform" ? "Platform authenticator" : e === "cross-platform" ? "Security key" : "Passkey";
		}
		async function Y() {
			P.value = !0, F.value = null;
			try {
				let e = await M().get("/api/v1/me/webauthn/credentials");
				N.value = e.credentials ?? [];
			} catch (e) {
				F.value = p(e, "Failed to load credentials", D?.locale);
			} finally {
				P.value = !1;
			}
		}
		let X = T(null);
		function se(e) {
			X.value = e;
		}
		async function ce() {
			let e = X.value;
			if (X.value = null, e) {
				L.value = e;
				try {
					await M().delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(e)}`), W(e), s.success("Passkey deleted successfully."), await Y();
				} catch (e) {
					s.error(p(e, "Failed to delete passkey", D?.locale));
				} finally {
					L.value = null;
				}
			}
		}
		async function Z() {
			I.value = !0, B.value = null;
			try {
				let e = M(), t = await e.post("/api/v1/auth/webauthn/register/options", {}), n = t.user.name ?? h.user?.username ?? h.user?.email ?? "phlix user", r = t.user.displayName ?? h.user?.name ?? h.user?.username ?? n, i = {
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
				}, a = await navigator.credentials.create({ publicKey: i });
				if (!a) throw Error(C("settings.passkeyNotCreated"));
				let o = a.response, c = (e) => {
					let t = e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
					return btoa(String.fromCharCode(...t));
				}, l = {
					attestationObject: c(o.attestationObject),
					clientDataJSON: c(o.clientDataJSON),
					transports: o.getTransports ? o.getTransports() : []
				}, u = await e.post("/api/v1/auth/webauthn/register/verify", {
					credential: l,
					challenge: t.challenge
				}), d = R.value.trim();
				u.credential_id && (d || z.value !== "auto") && U(u.credential_id, {
					...d ? { nickname: d } : {},
					...z.value === "auto" ? {} : { attachment: z.value }
				}), R.value = "", B.value = "Passkey registered successfully.", s.success("Passkey registered successfully."), await Y();
			} catch (e) {
				e instanceof Error && e.name === "NotAllowedError" ? B.value = "Registration was cancelled or timed out — try again." : e instanceof Error && (B.value = null, s.error(p(e, "Couldn’t register the passkey.", D?.locale)));
			} finally {
				I.value = !1;
			}
		}
		function Q() {
			Y();
		}
		return ne(() => {
			ie(), Y();
		}), (e, r) => (w(), v("div", Ce, [
			r[9] ||= y("header", { class: "security-settings-page__head" }, [
				y("p", { class: "security-settings-page__eyebrow" }, "Account Security"),
				y("h1", { class: "security-settings-page__title" }, "Passkey settings"),
				y("p", { class: "security-settings-page__desc" }, " Manage your passkeys (WebAuthn/FIDO2 credentials) for passwordless login. ")
			], -1),
			y("section", we, [
				r[8] ||= y("header", { class: "security-settings-page__card-header" }, [y("h2", { class: "security-settings-page__card-title" }, "Registered Passkeys")], -1),
				y("div", Te, [P.value ? (w(), g(u, {
					key: 0,
					label: "Loading credentials..."
				})) : F.value ? (w(), g(d, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load passkeys",
					description: F.value
				}, {
					actions: A(() => [S(f, {
						variant: "solid",
						size: "sm",
						"left-icon": "refresh",
						onClick: Q
					}, {
						default: A(() => [...r[3] ||= [x(" Retry ", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : N.value.length === 0 ? (w(), g(d, {
					key: 2,
					icon: "key",
					title: "No passkeys registered",
					description: "Add a passkey to enable passwordless login on your devices."
				})) : (w(), v("ul", Ee, [(w(!0), v(m, null, re(N.value, (e) => (w(), v("li", {
					key: e.credential_id,
					class: "credential-item"
				}, [
					y("div", De, [S(t, { name: oe(K(e)) }, null, 8, ["name"])]),
					y("div", Oe, [y("span", ke, E(ae(e)), 1), y("span", Ae, E(J(K(e))) + " · Registered " + E(q(e.registered_at)), 1)]),
					S(f, {
						variant: "ghost",
						size: "sm",
						class: "credential-item__delete",
						disabled: L.value === e.credential_id,
						onClick: (t) => se(e.credential_id)
					}, {
						default: A(() => [L.value === e.credential_id ? (w(), g(u, {
							key: 0,
							size: "xs"
						})) : (w(), g(t, {
							key: 1,
							name: "trash"
						}))]),
						_: 2
					}, 1032, ["disabled", "onClick"])
				]))), 128))]))]),
				y("footer", je, [
					y("div", Me, [y("label", Ne, [r[4] ||= y("span", { class: "register-form__label" }, "Nickname (optional)", -1), j(y("input", {
						"onUpdate:modelValue": r[0] ||= (e) => R.value = e,
						type: "text",
						class: "register-form__input",
						placeholder: "e.g. Work laptop",
						maxlength: "60",
						autocomplete: "off"
					}, null, 512), [[k, R.value]])]), y("fieldset", Pe, [r[5] ||= y("legend", { class: "register-form__label" }, "Authenticator type", -1), y("div", Fe, [(w(), v(m, null, re(n, (e) => y("label", {
						key: e.value,
						class: "register-form__segment"
					}, [j(y("input", {
						"onUpdate:modelValue": r[1] ||= (e) => z.value = e,
						type: "radio",
						name: "passkey-attachment",
						value: e.value
					}, null, 8, Ie), [[O, z.value]]), y("span", null, E(e.label), 1)])), 64))])])]),
					B.value ? (w(), v("p", Le, E(B.value), 1)) : _("", !0),
					S(f, {
						variant: "solid",
						disabled: I.value,
						onClick: Z
					}, {
						default: A(() => [I.value ? (w(), v(m, { key: 0 }, [S(u, {
							size: "xs",
							class: "mr-2"
						}), r[6] ||= x(" Starting... ", -1)], 64)) : (w(), v(m, { key: 1 }, [S(t, {
							name: "plus",
							class: "mr-2"
						}), r[7] ||= x(" Add Passkey ", -1)], 64))]),
						_: 1
					}, 8, ["disabled"])
				])
			]),
			r[10] ||= b("<section class=\"security-settings-page__info\" data-v-9f3b487c><h3 class=\"security-settings-page__info-title\" data-v-9f3b487c>What is a passkey?</h3><p data-v-9f3b487c> A passkey is a FIDO2/WebAuthn credential that allows you to log in securely without a password. It uses public-key cryptography to protect your account from phishing and credential theft attacks. </p></section><section class=\"security-settings-page__notes\" data-v-9f3b487c><h3 class=\"security-settings-page__notes-title\" data-v-9f3b487c>Security Notes</h3><ul class=\"security-settings-page__notes-list\" data-v-9f3b487c><li data-v-9f3b487c>Passkeys are unique to each device and cannot be reused if lost.</li><li data-v-9f3b487c>Keep backup codes or alternative login methods in a safe place.</li><li data-v-9f3b487c>Deleting a passkey is permanent and cannot be undone.</li><li data-v-9f3b487c>Platform authenticators (like Touch ID or Windows Hello) require the specific device.</li></ul></section>", 2),
			S(ee, {
				open: X.value !== null,
				message: "Deleting this passkey is permanent and cannot be undone — devices using it will fall back to your other sign-in methods.",
				"confirm-label": "Delete passkey",
				danger: "",
				"onUpdate:open": r[2] ||= (e) => {
					e || (X.value = null);
				},
				onConfirm: ce
			}, null, 8, ["open"])
		]));
	}
}), [["__scopeId", "data-v-9f3b487c"]]), ze = "/api/v1/auth/sessions";
async function Be(e, t) {
	let n = await new a({ baseUrl: e }).get(ze, void 0, t), r = Array.isArray(n?.sessions) ? n.sessions : [], i = [];
	for (let e of r) {
		if (typeof e != "object" || !e) continue;
		let t = e;
		typeof t.id == "string" && t.id !== "" && i.push({
			id: t.id,
			current: t.current === !0,
			created_at: typeof t.created_at == "string" ? t.created_at : null,
			last_used_at: typeof t.last_used_at == "string" ? t.last_used_at : null,
			device_type: typeof t.device_type == "string" && t.device_type !== "" ? t.device_type : null,
			device_name: typeof t.device_name == "string" && t.device_name !== "" ? t.device_name : null
		});
	}
	return i;
}
async function Ve(e, t, n) {
	await new a({ baseUrl: e }).delete(`${ze}/${encodeURIComponent(t)}`, n);
}
// src/pages/DeviceSessionsPage.vue?vue&type=script&setup=true&lang.ts
var He = { class: "device-sessions-page" }, Ue = { class: "device-sessions-page__head" }, We = { class: "device-sessions-page__eyebrow" }, Ge = { class: "device-sessions-page__title" }, Ke = { class: "device-sessions-page__desc" }, qe = { class: "device-sessions-page__card" }, Je = { class: "device-sessions-page__card-header" }, Ye = { class: "device-sessions-page__card-heading" }, Xe = { class: "device-sessions-page__card-title" }, Ze = {
	key: 0,
	class: "device-sessions-page__count"
}, Qe = { class: "device-sessions-page__card-actions" }, $e = { class: "device-sessions-page__card-body" }, et = {
	key: 3,
	class: "session-list"
}, tt = { class: "session-item__icon" }, nt = { class: "session-item__info" }, rt = { class: "session-item__label" }, it = {
	key: 0,
	class: "session-item__badge",
	"data-testid": "session-current-badge"
}, at = {
	key: 0,
	class: "session-item__meta"
}, ot = /*#__PURE__*/ e(/* @__PURE__ */ C({
	__name: "DeviceSessionsPage",
	setup(e) {
		let n = s(), i = l(), { t: a } = r(), o = te("phlixConfig", null), c = T([]), b = T(!0), C = T(null), O = T(null), k = T(!1), j = T(null), M = h(() => c.value.filter((e) => !e.current)), N = h(() => M.value.length > 0), P = h(() => O.value !== null || k.value);
		async function F() {
			b.value = !0, C.value = null;
			try {
				c.value = await Be(n.value);
			} catch (e) {
				C.value = p(e, a("sessions.loadError"), o?.locale);
			} finally {
				b.value = !1;
			}
		}
		function I() {
			F();
		}
		function L(e) {
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
		function R(e) {
			return e.device_name ?? a("sessions.unknownDevice");
		}
		function z(e) {
			return e.device_type === "tv" ? "tv" : "monitor";
		}
		function B(e) {
			let t = L(e.created_at), n = L(e.last_used_at), r = [];
			return t && r.push(a("sessions.created", { date: t })), n && r.push(a("sessions.lastUsed", { date: n })), r.join(" · ");
		}
		function V(e) {
			j.value = {
				kind: "one",
				id: e
			};
		}
		function H() {
			j.value = { kind: "others" };
		}
		function ie(e) {
			e || (j.value = null);
		}
		async function U() {
			let e = j.value;
			if (j.value = null, !e) return;
			if (e.kind === "one") {
				O.value = e.id;
				try {
					await Ve(n.value, e.id), i.success(a("sessions.revokeSuccess"));
				} catch (e) {
					i.error(p(e, a("sessions.revokeError"), o?.locale));
				} finally {
					O.value = null;
				}
				await F();
				return;
			}
			let t = M.value.map((e) => e.id);
			k.value = !0;
			let r = null;
			for (let e of t) try {
				await Ve(n.value, e);
			} catch (e) {
				r = e;
				break;
			}
			k.value = !1, r === null ? i.success(a("sessions.revokeOthersSuccess")) : i.error(p(r, a("sessions.revokeOthersError"), o?.locale)), await F();
		}
		return ne(() => {
			F();
		}), (e, n) => (w(), v("div", He, [
			y("header", Ue, [
				y("p", We, E(D(a)("sessions.eyebrow")), 1),
				y("h1", Ge, E(D(a)("sessions.title")), 1),
				y("p", Ke, E(D(a)("sessions.desc")), 1)
			]),
			y("section", qe, [y("header", Je, [y("div", Ye, [y("h2", Xe, E(D(a)("sessions.cardTitle")), 1), !b.value && !C.value ? (w(), v("span", Ze, E(D(a)("sessions.count", { count: c.value.length })), 1)) : _("", !0)]), y("div", Qe, [S(f, {
				variant: "ghost",
				size: "sm",
				"left-icon": "refresh",
				disabled: b.value || P.value,
				"data-testid": "sessions-refresh",
				onClick: I
			}, {
				default: A(() => [x(E(D(a)("sessions.refresh")), 1)]),
				_: 1
			}, 8, ["disabled"]), N.value ? (w(), g(f, {
				key: 0,
				variant: "ghost",
				size: "sm",
				disabled: P.value,
				"data-testid": "sessions-revoke-others",
				onClick: H
			}, {
				default: A(() => [k.value ? (w(), g(u, {
					key: 0,
					size: "xs"
				})) : (w(), v(m, { key: 1 }, [x(E(D(a)("sessions.revokeAll")), 1)], 64))]),
				_: 1
			}, 8, ["disabled"])) : _("", !0)])]), y("div", $e, [b.value ? (w(), g(u, {
				key: 0,
				label: D(a)("sessions.loading")
			}, null, 8, ["label"])) : C.value ? (w(), g(d, {
				key: 1,
				icon: "alert",
				title: D(a)("sessions.loadErrorTitle"),
				description: C.value
			}, {
				actions: A(() => [S(f, {
					variant: "solid",
					size: "sm",
					"left-icon": "refresh",
					"data-testid": "sessions-retry",
					onClick: I
				}, {
					default: A(() => [x(E(D(a)("sessions.refresh")), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : c.value.length === 0 ? (w(), g(d, {
				key: 2,
				icon: "monitor",
				title: D(a)("sessions.emptyTitle"),
				description: D(a)("sessions.emptyDescription")
			}, null, 8, ["title", "description"])) : (w(), v("ul", et, [(w(!0), v(m, null, re(c.value, (e) => (w(), v("li", {
				key: e.id,
				class: "session-item",
				"data-testid": "session-item"
			}, [
				y("div", tt, [S(t, { name: z(e) }, null, 8, ["name"])]),
				y("div", nt, [y("span", rt, [x(E(R(e)) + " ", 1), e.current ? (w(), v("span", it, E(D(a)("sessions.thisDevice")), 1)) : _("", !0)]), B(e) ? (w(), v("span", at, E(B(e)), 1)) : _("", !0)]),
				e.current ? _("", !0) : (w(), g(f, {
					key: 0,
					variant: "ghost",
					size: "sm",
					class: "session-item__revoke",
					disabled: P.value,
					"data-testid": `session-revoke-${e.id}`,
					onClick: (t) => V(e.id)
				}, {
					default: A(() => [O.value === e.id ? (w(), g(u, {
						key: 0,
						size: "xs"
					})) : (w(), g(t, {
						key: 1,
						name: "trash"
					}))]),
					_: 2
				}, 1032, [
					"disabled",
					"data-testid",
					"onClick"
				]))
			]))), 128))]))])]),
			S(ee, {
				open: j.value !== null,
				message: j.value?.kind === "others" ? D(a)("sessions.revokeAllConfirm") : D(a)("sessions.revokeConfirm"),
				"confirm-label": j.value?.kind === "others" ? D(a)("sessions.revokeAll") : D(a)("sessions.revoke"),
				danger: "",
				"onUpdate:open": ie,
				onConfirm: U
			}, null, 8, [
				"open",
				"message",
				"confirm-label"
			])
		]));
	}
}), [["__scopeId", "data-v-60eff6c2"]]);
export { X as C, ge as E, he as S, W as T, L as _, _e as a, q as b, oe as c, F as d, se as f, fe as g, de as h, ve as i, Z as l, me as m, Re as n, N as o, pe as p, Se as r, ce as s, ot as t, $ as u, P as v, Y as w, Q as x, U as y };

//# sourceMappingURL=DeviceSessionsPage-B3vdS4ne.js.map