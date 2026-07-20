import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-462_QqzN.js";
import { t as n } from "./useMessages-CMPz9FmM.js";
import { o as r, t as i } from "./client-D80As4Gx.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useAuthStore-D2BCcJAK.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { t as c } from "./Spinner-BI9hE4IL.js";
import { t as l } from "./Button-8mVXxqAA.js";
import { t as u } from "./Switch-DyS2L5gX.js";
import { t as d } from "./Skeleton-DhQmxeNg.js";
import { t as f } from "./EmptyState-jnH8lsc0.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createStaticVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, normalizeClass as C, onMounted as w, openBlock as T, ref as E, renderList as D, toDisplayString as O, unref as k, withCtx as A } from "vue";
//#region src/utils/safeClone.ts
function j(e) {
	return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
//#endregion
//#region src/components/SettingsForm.vue?vue&type=script&setup=true&lang.ts
var M = { class: "setform" }, N = {
	key: 0,
	class: "setform__loading"
}, P = { class: "setform__head" }, F = { class: "setform__title" }, I = {
	key: 0,
	class: "setform__dirty"
}, ee = ["for"], L = [
	"id",
	"type",
	"value",
	"onInput"
], R = { class: "setform__actions" }, z = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: t }) {
		let i = e, a = t, c = o(), y = s(), { t: S } = n(), z = E({}), B = E({}), V = E(!0), H = E(null), U = E(null), W = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], G = m(() => i.groups ? W.filter((e) => i.groups.includes(e)) : W), K = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, q = {
			"hwaccel.enabled": {
				label: "Hardware acceleration",
				type: "bool",
				group: "transcoding"
			},
			"hwaccel.prefer_hardware": {
				label: "Prefer hardware encoding",
				type: "bool",
				group: "transcoding"
			},
			"hwaccel.probe_timeout": {
				label: "HW probe timeout (s)",
				type: "number",
				group: "transcoding"
			},
			"tmdb.api_key": {
				label: "TMDB API Key",
				type: "string",
				group: "metadata"
			},
			"marker_detection.similarity_threshold": {
				label: "Intro similarity threshold",
				type: "number",
				group: "markers"
			},
			"marker_detection.intro_max_duration": {
				label: "Max intro duration (s)",
				type: "number",
				group: "markers"
			},
			"subtitles.enabled": {
				label: "Enable subtitles",
				type: "bool",
				group: "subtitles"
			},
			"subtitles.default_language": {
				label: "Default subtitle language",
				type: "string",
				group: "subtitles"
			},
			"subtitles.burn_in_by_default": {
				label: "Burn in subtitles by default",
				type: "bool",
				group: "subtitles"
			},
			"discovery.discovery_port": {
				label: "Discovery port",
				type: "number",
				group: "discovery"
			},
			"trickplay.enabled": {
				label: "Enable trickplay",
				type: "bool",
				group: "trickplay"
			},
			"trickplay.interval_seconds": {
				label: "Trickplay interval (s)",
				type: "number",
				group: "trickplay"
			},
			"newsletter.enabled": {
				label: "Enable newsletter",
				type: "bool",
				group: "newsletter"
			},
			"newsletter.send_hour": {
				label: "Newsletter send hour",
				type: "number",
				group: "newsletter"
			},
			"port-forward.port_forwarding.upnp_enabled": {
				label: "Enable UPnP",
				type: "bool",
				group: "port-forward"
			},
			"trakt.client_id": {
				label: "Trakt client ID",
				type: "string",
				group: "scrobblers"
			},
			"trakt.client_secret": {
				label: "Trakt client secret",
				type: "string",
				group: "scrobblers"
			},
			"trakt.redirect_uri": {
				label: "Trakt redirect URI",
				type: "string",
				group: "scrobblers"
			}
		};
		function J(e) {
			return Object.keys(q).filter((t) => q[t].group === e);
		}
		function Y(e, t) {
			let n = t.target.value;
			if (n === "") return $(e, 0);
			let r = Number(n);
			Number.isFinite(r) && $(e, r);
		}
		function X(e, t) {
			return t === "bool" ? r(e) : t === "number" ? e == null || e === "" ? 0 : Number(e) : e == null ? "" : String(e);
		}
		async function Z() {
			V.value = !0, H.value = null;
			try {
				let e = await c.client.get("/api/v1/users/me/settings"), t = { ...e };
				for (let [n, r] of Object.entries(q)) t[n] = X(e[n], r.type);
				z.value = t, B.value = j(t);
			} catch (e) {
				H.value = e instanceof Error ? e.message : S("settings.loadFailed");
			} finally {
				V.value = !1;
			}
		}
		function Q(e) {
			return J(e).some((e) => z.value[e] !== B.value[e]);
		}
		async function te(e) {
			U.value = e;
			try {
				let t = {};
				for (let n of J(e)) t[n] = z.value[n];
				await c.client.put("/api/v1/users/me/settings", t);
				for (let t of J(e)) B.value[t] = z.value[t];
				y.success(S("settings.groupSaved", { name: K[e] })), a("saved", z.value);
			} catch (t) {
				y.error(t instanceof Error ? t.message : S("settings.groupSaveError", { name: K[e] }));
			} finally {
				U.value = null;
			}
		}
		function $(e, t) {
			z.value[e] = t;
		}
		return w(Z), (e, t) => (T(), _("div", M, [V.value ? (T(), _("div", N, [(T(), _(p, null, D(3, (e) => x(d, {
			key: e,
			height: "6.5rem",
			radius: "var(--radius-lg)"
		})), 64))])) : H.value ? (T(), h(f, {
			key: 1,
			icon: "alert",
			title: k(S)("settings.loadErrorTitle"),
			description: H.value
		}, {
			actions: A(() => [x(l, {
				"left-icon": "rewind",
				onClick: Z
			}, {
				default: A(() => [b(O(k(S)("common.retry")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : (T(!0), _(p, { key: 2 }, D(G.value, (e) => (T(), _("section", {
			key: e,
			class: "setform__group"
		}, [
			v("header", P, [v("h3", F, O(K[e]), 1), Q(e) ? (T(), _("span", I, O(k(S)("settings.unsaved")), 1)) : g("", !0)]),
			(T(!0), _(p, null, D(J(e), (e) => (T(), _("div", {
				key: e,
				class: C(["setform__row", { "setform__row--switch": q[e].type === "bool" }])
			}, [q[e].type === "bool" ? (T(), h(u, {
				key: 0,
				"model-value": !!z.value[e],
				label: q[e].label,
				"onUpdate:modelValue": (t) => $(e, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			])) : (T(), _(p, { key: 1 }, [v("label", {
				for: `set-${e}`,
				class: "setform__label"
			}, O(q[e].label), 9, ee), v("input", {
				id: `set-${e}`,
				class: "setform__input",
				type: q[e].type === "number" ? "number" : "text",
				value: z.value[e] ?? "",
				onInput: (t) => q[e].type === "number" ? Y(e, t) : $(e, t.target.value)
			}, null, 40, L)], 64))], 2))), 128)),
			v("div", R, [x(l, {
				variant: "solid",
				size: "sm",
				disabled: !Q(e),
				loading: U.value === e,
				onClick: (t) => te(e)
			}, {
				default: A(() => [b(O(k(S)("settings.saveGroup", { name: K[e] })), 1)]),
				_: 2
			}, 1032, [
				"disabled",
				"loading",
				"onClick"
			])])
		]))), 128))]));
	}
}), [["__scopeId", "data-v-3f82f23a"]]), B = { class: "security-settings-page" }, V = { class: "security-settings-page__card" }, H = { class: "security-settings-page__card-body" }, U = {
	key: 3,
	class: "credentials-list"
}, W = { class: "credential-item__icon" }, G = { class: "credential-item__info" }, K = { class: "credential-item__id" }, q = { class: "credential-item__meta" }, J = { class: "security-settings-page__card-footer" }, Y = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "SecuritySettingsPage",
	setup(e) {
		let n = a(), r = s();
		function o() {
			return new i({ baseUrl: n.value });
		}
		let u = E([]), d = E(!0), m = E(null), g = E(!1), S = E(null);
		function C(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function k(e) {
			return e === "platform" ? "monitor" : "key";
		}
		function j(e) {
			return e === "platform" ? "Platform authenticator" : "Security key";
		}
		async function M() {
			d.value = !0, m.value = null;
			try {
				let e = await o().get("/api/v1/me/webauthn/credentials");
				u.value = e.credentials ?? [];
			} catch (e) {
				m.value = e instanceof Error ? e.message : "Failed to load credentials";
			} finally {
				d.value = !1;
			}
		}
		async function N(e) {
			if (confirm("Are you sure you want to delete this passkey? This action cannot be undone.")) {
				S.value = e;
				try {
					await o().delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(e)}`), r.success("Passkey deleted successfully"), await M();
				} catch (e) {
					r.error(e instanceof Error ? e.message : "Failed to delete passkey");
				} finally {
					S.value = null;
				}
			}
		}
		async function P() {
			g.value = !0;
			try {
				let e = o(), t = await e.post("/api/v1/auth/webauthn/register/options", {}), n = {
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
				let a = i.response, s = (e) => {
					let t = e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
					return btoa(String.fromCharCode(...t));
				}, c = {
					attestationObject: s(a.attestationObject),
					clientDataJSON: s(a.clientDataJSON),
					transports: a.getTransports ? a.getTransports() : []
				};
				await e.post("/api/v1/auth/webauthn/register/verify", {
					credential: c,
					challenge: t.challenge
				}), r.success("Passkey registered successfully"), await M();
			} catch (e) {
				e instanceof Error && e.name !== "NotAllowedError" && r.error(e.message);
			} finally {
				g.value = !1;
			}
		}
		function F() {
			M();
		}
		return w(() => {
			M();
		}), (e, n) => (T(), _("div", B, [
			n[4] ||= v("header", { class: "security-settings-page__head" }, [
				v("p", { class: "security-settings-page__eyebrow" }, "Account Security"),
				v("h1", { class: "security-settings-page__title" }, "Passkey Settings"),
				v("p", { class: "security-settings-page__desc" }, " Manage your passkeys (WebAuthn/FIDO2 credentials) for passwordless login. ")
			], -1),
			v("section", V, [
				n[3] ||= v("header", { class: "security-settings-page__card-header" }, [v("h2", { class: "security-settings-page__card-title" }, "Registered Passkeys")], -1),
				v("div", H, [d.value ? (T(), h(c, {
					key: 0,
					label: "Loading credentials..."
				})) : m.value ? (T(), h(f, {
					key: 1,
					icon: "alert",
					title: "Couldn't load passkeys",
					description: m.value
				}, {
					actions: A(() => [x(l, {
						variant: "solid",
						size: "sm",
						"left-icon": "refresh",
						onClick: F
					}, {
						default: A(() => [...n[0] ||= [b(" Retry ", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : u.value.length === 0 ? (T(), h(f, {
					key: 2,
					icon: "key",
					title: "No passkeys registered",
					description: "Add a passkey to enable passwordless login on your devices."
				})) : (T(), _("ul", U, [(T(!0), _(p, null, D(u.value, (e) => (T(), _("li", {
					key: e.credential_id,
					class: "credential-item"
				}, [
					v("div", W, [x(t, { name: k(e.device_type) }, null, 8, ["name"])]),
					v("div", G, [v("span", K, O(e.credential_id.substring(0, 20)) + "... ", 1), v("span", q, O(j(e.device_type)) + " · Registered " + O(C(e.registered_at)), 1)]),
					x(l, {
						variant: "ghost",
						size: "sm",
						class: "credential-item__delete",
						disabled: S.value === e.credential_id,
						onClick: (t) => N(e.credential_id)
					}, {
						default: A(() => [S.value === e.credential_id ? (T(), h(c, {
							key: 0,
							size: "xs"
						})) : (T(), h(t, {
							key: 1,
							name: "trash"
						}))]),
						_: 2
					}, 1032, ["disabled", "onClick"])
				]))), 128))]))]),
				v("footer", J, [x(l, {
					variant: "solid",
					disabled: g.value,
					onClick: P
				}, {
					default: A(() => [g.value ? (T(), _(p, { key: 0 }, [x(c, {
						size: "xs",
						class: "mr-2"
					}), n[1] ||= b(" Starting... ", -1)], 64)) : (T(), _(p, { key: 1 }, [x(t, {
						name: "plus",
						class: "mr-2"
					}), n[2] ||= b(" Add Passkey ", -1)], 64))]),
					_: 1
				}, 8, ["disabled"])])
			]),
			n[5] ||= y("<section class=\"security-settings-page__info\" data-v-8f2a31e0><h3 class=\"security-settings-page__info-title\" data-v-8f2a31e0>What is a passkey?</h3><p data-v-8f2a31e0> A passkey is a FIDO2/WebAuthn credential that allows you to log in securely without a password. It uses public-key cryptography to protect your account from phishing and credential theft attacks. </p></section><section class=\"security-settings-page__notes\" data-v-8f2a31e0><h3 class=\"security-settings-page__notes-title\" data-v-8f2a31e0>Security Notes</h3><ul class=\"security-settings-page__notes-list\" data-v-8f2a31e0><li data-v-8f2a31e0>Passkeys are unique to each device and cannot be reused if lost.</li><li data-v-8f2a31e0>Keep backup codes or alternative login methods in a safe place.</li><li data-v-8f2a31e0>Deleting a passkey is permanent and cannot be undone.</li><li data-v-8f2a31e0>Platform authenticators (like Touch ID or Windows Hello) require the specific device.</li></ul></section>", 2)
		]));
	}
}), [["__scopeId", "data-v-8f2a31e0"]]);
//#endregion
export { z as n, Y as t };

//# sourceMappingURL=SecuritySettingsPage-CO9Gb-I3.js.map