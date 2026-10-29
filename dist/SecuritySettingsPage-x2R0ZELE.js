import { n as e, t } from "./Icon-CIwTuFLd.js";
import { l as n, t as r, y as i } from "./client-CRZ_SWB1.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useAuthStore-BbS6J1QF.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { t as c } from "./Spinner-B9LmySj4.js";
import { t as l } from "./EmptyState-BAyOxAcK.js";
import { t as u } from "./Button-BuG0GvCa.js";
import { t as d } from "./ConfirmDialog-QgGYmnA5.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as ee, createElementBlock as h, createElementVNode as g, createStaticVNode as te, createTextVNode as _, createVNode as v, defineComponent as y, onMounted as ne, openBlock as b, ref as x, renderList as S, toDisplayString as C, vModelRadio as re, vModelText as ie, withCtx as w, withDirectives as T } from "vue";
import { defineStore as E } from "pinia";
//#region src/composables/themeTokens.ts
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
	for (let [n, r] of Object.entries(e)) j(n) && (typeof r != "string" || !R(r) || (t[n] = r.trim()));
	return t;
}
var B = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/, V = 64, H = /* @__PURE__ */ RegExp("[\\u0000-\\u001f\\u007f]");
function U(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return null;
	let t = e, n = typeof t.id == "string" ? t.id : "";
	if (!B.test(n)) return null;
	let r = typeof t.name == "string" ? t.name.trim() : "";
	if (r === "" || r.length > V || H.test(r)) return null;
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
var W = 8;
function G(e, t) {
	let n = new Map(t.map((e) => [e.id, e])), r = [], i = /* @__PURE__ */ new Set(), a = e;
	for (let e = 0; e < 8 && a !== null && !(i.has(a) || O(a)); e++) {
		let e = n.get(a);
		if (e === void 0) break;
		i.add(a), r.push(e), a = e.extends;
	}
	return r;
}
function K(e, t) {
	let n = {};
	for (let r of G(e, t).reverse()) n = {
		...n,
		...r.tokens
	};
	return n;
}
function q(e, t) {
	if (O(e)) return e;
	let n = G(e, t);
	for (let e of n) if (e.extends !== null && O(e.extends)) return e.extends;
	return n[0]?.dark === !1 ? "daylight" : "nocturne";
}
function J(e, t) {
	return O(e) || t.find((t) => t.id === e) === void 0 ? null : {
		id: e,
		base: q(e, t),
		tokens: K(e, t)
	};
}
function Y(e, t) {
	for (let [n, r] of Object.entries(t)) j(n) && R(r) && e.style.setProperty(n, r);
}
function X(e) {
	for (let t of k) e.style.removeProperty(t);
}
var Z = "phlix.theme.active";
function ae() {
	if (typeof localStorage > "u") return null;
	try {
		let e = localStorage.getItem(Z);
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
function oe(e) {
	if (!(typeof localStorage > "u")) try {
		e === null ? localStorage.removeItem(Z) : localStorage.setItem(Z, JSON.stringify(e));
	} catch {}
}
//#endregion
//#region src/api/themes.ts
async function Q(e, t) {
	let i = await new r({
		baseUrl: e,
		tokenStore: typeof window < "u" ? new n() : void 0
	}).get("/api/v1/themes", void 0, t), a = Array.isArray(i.themes) ? i.themes : [], o = [];
	for (let e of a) {
		let t = U(e);
		t !== null && o.push(t);
	}
	return o;
}
//#endregion
//#region src/stores/useThemesStore.ts
var se = E("themes", () => {
	let e = x([]), t = x(!1), n = x(!1), r = x(null), a = null;
	async function o(o, s = !1) {
		if (o !== null && !(n.value && !s)) return a || (t.value = !0, r.value = null, a = (async () => {
			try {
				e.value = await Q(o), n.value = !0;
			} catch (e) {
				r.value = i(e, "Failed to load themes");
			} finally {
				t.value = !1, a = null;
			}
		})(), a);
	}
	let s = p(() => e.value.filter((e) => !e.builtIn));
	function c(t) {
		return e.value.find((e) => e.id === t);
	}
	function l(t) {
		return J(t, e.value);
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
}), ce = { class: "security-settings-page" }, le = { class: "security-settings-page__card" }, ue = { class: "security-settings-page__card-body" }, $ = {
	key: 3,
	class: "credentials-list"
}, de = { class: "credential-item__icon" }, fe = { class: "credential-item__info" }, pe = { class: "credential-item__id" }, me = { class: "credential-item__meta" }, he = { class: "security-settings-page__card-footer" }, ge = { class: "register-form" }, _e = { class: "register-form__field" }, ve = { class: "register-form__choice" }, ye = { class: "register-form__segments" }, be = ["value"], xe = {
	key: 0,
	class: "security-settings-page__status",
	role: "status"
}, Se = /*#__PURE__*/ e(/* @__PURE__ */ y({
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
		], i = a(), p = s(), y = o();
		function E() {
			return new r({ baseUrl: i.value });
		}
		let D = x([]), O = x(!0), k = x(null), A = x(!1), j = x(null), M = x(""), N = x("auto"), P = x(null), F = x({});
		function I() {
			let e = y.user?.id;
			return e ? `phlix.passkey-meta.${e}` : "phlix.passkey-meta";
		}
		function L() {
			try {
				let e = localStorage.getItem(I()), t = e ? JSON.parse(e) : {};
				F.value = t && typeof t == "object" ? t : {};
			} catch {
				F.value = {};
			}
		}
		function R(e, t) {
			F.value = {
				...F.value,
				[e]: t
			};
			try {
				localStorage.setItem(I(), JSON.stringify(F.value));
			} catch {}
		}
		function z(e) {
			if (!(e in F.value)) return;
			let t = { ...F.value };
			delete t[e], F.value = t;
			try {
				localStorage.setItem(I(), JSON.stringify(t));
			} catch {}
		}
		function B(e) {
			return F.value[e];
		}
		function V(e) {
			return B(e.credential_id)?.nickname || `${e.credential_id.substring(0, 20)}…`;
		}
		function H(e) {
			if (e.device_type === "platform" || e.device_type === "cross-platform") return e.device_type;
			let t = B(e.credential_id)?.attachment;
			return t === "platform" || t === "cross-platform" ? t : null;
		}
		function U(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function W(e) {
			return e === "platform" ? "monitor" : "key";
		}
		function G(e) {
			return e === "platform" ? "Platform authenticator" : e === "cross-platform" ? "Security key" : "Passkey";
		}
		async function K() {
			O.value = !0, k.value = null;
			try {
				let e = await E().get("/api/v1/me/webauthn/credentials");
				D.value = e.credentials ?? [];
			} catch (e) {
				k.value = e instanceof Error ? e.message : "Failed to load credentials";
			} finally {
				O.value = !1;
			}
		}
		let q = x(null);
		function J(e) {
			q.value = e;
		}
		async function Y() {
			let e = q.value;
			if (q.value = null, e) {
				j.value = e;
				try {
					await E().delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(e)}`), z(e), p.success("Passkey deleted successfully"), await K();
				} catch (e) {
					p.error(e instanceof Error ? e.message : "Failed to delete passkey");
				} finally {
					j.value = null;
				}
			}
		}
		async function X() {
			A.value = !0, P.value = null;
			try {
				let e = E(), t = await e.post("/api/v1/auth/webauthn/register/options", {}), n = t.user.name ?? y.user?.username ?? y.user?.email ?? "phlix user", r = t.user.displayName ?? y.user?.name ?? y.user?.username ?? n, i = {
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
						...N.value === "auto" ? {} : { authenticatorAttachment: N.value },
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
				}), u = M.value.trim();
				l.credential_id && (u || N.value !== "auto") && R(l.credential_id, {
					...u ? { nickname: u } : {},
					...N.value === "auto" ? {} : { attachment: N.value }
				}), M.value = "", P.value = "Passkey registered successfully", p.success("Passkey registered successfully"), await K();
			} catch (e) {
				e instanceof Error && e.name === "NotAllowedError" ? P.value = "Registration was cancelled or timed out — try again." : e instanceof Error && (P.value = null, p.error(e.message));
			} finally {
				A.value = !1;
			}
		}
		function Z() {
			K();
		}
		return ne(() => {
			L(), K();
		}), (e, r) => (b(), h("div", ce, [
			r[9] ||= g("header", { class: "security-settings-page__head" }, [
				g("p", { class: "security-settings-page__eyebrow" }, "Account Security"),
				g("h1", { class: "security-settings-page__title" }, "Passkey Settings"),
				g("p", { class: "security-settings-page__desc" }, " Manage your passkeys (WebAuthn/FIDO2 credentials) for passwordless login. ")
			], -1),
			g("section", le, [
				r[8] ||= g("header", { class: "security-settings-page__card-header" }, [g("h2", { class: "security-settings-page__card-title" }, "Registered Passkeys")], -1),
				g("div", ue, [O.value ? (b(), m(c, {
					key: 0,
					label: "Loading credentials..."
				})) : k.value ? (b(), m(l, {
					key: 1,
					icon: "alert",
					title: "Couldn't load passkeys",
					description: k.value
				}, {
					actions: w(() => [v(u, {
						variant: "solid",
						size: "sm",
						"left-icon": "refresh",
						onClick: Z
					}, {
						default: w(() => [...r[3] ||= [_(" Retry ", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : D.value.length === 0 ? (b(), m(l, {
					key: 2,
					icon: "key",
					title: "No passkeys registered",
					description: "Add a passkey to enable passwordless login on your devices."
				})) : (b(), h("ul", $, [(b(!0), h(f, null, S(D.value, (e) => (b(), h("li", {
					key: e.credential_id,
					class: "credential-item"
				}, [
					g("div", de, [v(t, { name: W(H(e)) }, null, 8, ["name"])]),
					g("div", fe, [g("span", pe, C(V(e)), 1), g("span", me, C(G(H(e))) + " · Registered " + C(U(e.registered_at)), 1)]),
					v(u, {
						variant: "ghost",
						size: "sm",
						class: "credential-item__delete",
						disabled: j.value === e.credential_id,
						onClick: (t) => J(e.credential_id)
					}, {
						default: w(() => [j.value === e.credential_id ? (b(), m(c, {
							key: 0,
							size: "xs"
						})) : (b(), m(t, {
							key: 1,
							name: "trash"
						}))]),
						_: 2
					}, 1032, ["disabled", "onClick"])
				]))), 128))]))]),
				g("footer", he, [
					g("div", ge, [g("label", _e, [r[4] ||= g("span", { class: "register-form__label" }, "Nickname (optional)", -1), T(g("input", {
						"onUpdate:modelValue": r[0] ||= (e) => M.value = e,
						type: "text",
						class: "register-form__input",
						placeholder: "e.g. Work laptop",
						maxlength: "60",
						autocomplete: "off"
					}, null, 512), [[ie, M.value]])]), g("fieldset", ve, [r[5] ||= g("legend", { class: "register-form__label" }, "Authenticator type", -1), g("div", ye, [(b(), h(f, null, S(n, (e) => g("label", {
						key: e.value,
						class: "register-form__segment"
					}, [T(g("input", {
						"onUpdate:modelValue": r[1] ||= (e) => N.value = e,
						type: "radio",
						name: "passkey-attachment",
						value: e.value
					}, null, 8, be), [[re, N.value]]), g("span", null, C(e.label), 1)])), 64))])])]),
					P.value ? (b(), h("p", xe, C(P.value), 1)) : ee("", !0),
					v(u, {
						variant: "solid",
						disabled: A.value,
						onClick: X
					}, {
						default: w(() => [A.value ? (b(), h(f, { key: 0 }, [v(c, {
							size: "xs",
							class: "mr-2"
						}), r[6] ||= _(" Starting... ", -1)], 64)) : (b(), h(f, { key: 1 }, [v(t, {
							name: "plus",
							class: "mr-2"
						}), r[7] ||= _(" Add Passkey ", -1)], 64))]),
						_: 1
					}, 8, ["disabled"])
				])
			]),
			r[10] ||= te("<section class=\"security-settings-page__info\" data-v-6ebc7bc0><h3 class=\"security-settings-page__info-title\" data-v-6ebc7bc0>What is a passkey?</h3><p data-v-6ebc7bc0> A passkey is a FIDO2/WebAuthn credential that allows you to log in securely without a password. It uses public-key cryptography to protect your account from phishing and credential theft attacks. </p></section><section class=\"security-settings-page__notes\" data-v-6ebc7bc0><h3 class=\"security-settings-page__notes-title\" data-v-6ebc7bc0>Security Notes</h3><ul class=\"security-settings-page__notes-list\" data-v-6ebc7bc0><li data-v-6ebc7bc0>Passkeys are unique to each device and cannot be reused if lost.</li><li data-v-6ebc7bc0>Keep backup codes or alternative login methods in a safe place.</li><li data-v-6ebc7bc0>Deleting a passkey is permanent and cannot be undone.</li><li data-v-6ebc7bc0>Platform authenticators (like Touch ID or Windows Hello) require the specific device.</li></ul></section>", 2),
			v(d, {
				open: q.value !== null,
				message: "Deleting this passkey is permanent and cannot be undone — devices using it will fall back to your other sign-in methods.",
				"confirm-label": "Delete passkey",
				danger: "",
				"onUpdate:open": r[2] ||= (e) => {
					e || (q.value = null);
				},
				onConfirm: Y
			}, null, 8, ["open"])
		]));
	}
}), [["__scopeId", "data-v-6ebc7bc0"]]);
//#endregion
export { K as _, W as a, J as c, j as d, O as f, q as g, ae as h, D as i, Y as l, U as m, se as n, Z as o, R as p, Q as r, k as s, Se as t, X as u, z as v, oe as y };

//# sourceMappingURL=SecuritySettingsPage-x2R0ZELE.js.map