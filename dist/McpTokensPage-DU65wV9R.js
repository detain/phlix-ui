import { n as e } from "./Icon-CkTBN_k5.js";
import { i as t, p as n } from "./client-COHWZ2KC.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-Cw8Wl4QR.js";
import { t as i } from "./Badge-D1_MN41Y.js";
import { t as a } from "./Modal-Nn1mtFl3.js";
import { t as o } from "./Skeleton-C3OpJbf1.js";
import { t as s } from "./EmptyState-CwWtkhEJ.js";
import { t as c } from "./PageHint-3dL7qb5N.js";
import { t as l } from "./hubHelpLinks-DqAE3Wx3.js";
import { t as te } from "./Input-D87-h7X1.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, onMounted as ne, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, vModelCheckbox as re, withCtx as w, withDirectives as ie } from "vue";
//#region src/api/mcp-tokens.ts
var ae = [
	"mcp:servers:read",
	"mcp:library:read",
	"mcp:playback:read"
], T = {
	"mcp:servers:read": "List my servers",
	"mcp:library:read": "Read library and media metadata",
	"mcp:playback:read": "Read playback information"
}, E = {
	"mcp:servers:read": "Enumerate the media servers this account owns.",
	"mcp:library:read": "Browse libraries and read media metadata over the relay.",
	"mcp:playback:read": "Read stream decisions for an owned media item."
};
function oe(e) {
	return T[e] ?? e;
}
function D(e) {
	return E[e] ?? "";
}
var se = "phlix-mcp-", ce = class {
	client;
	constructor(e) {
		this.client = e;
	}
	list() {
		return this.client.get("/api/v1/me/mcp-tokens");
	}
	create(e) {
		return this.client.post("/api/v1/me/mcp-tokens", e);
	}
	revoke(e) {
		return this.client.delete(`/api/v1/me/mcp-tokens/${encodeURIComponent(e)}`);
	}
}, le = {
	class: "mcp-tokens",
	"aria-labelledby": "mcp-tokens-heading"
}, ue = { class: "mcp-tokens__head" }, de = {
	key: 0,
	class: "mcp-tokens__skel"
}, fe = {
	key: 3,
	class: "mcp-tokens__list"
}, pe = { class: "mcp-token-card__main" }, me = { class: "mcp-token-card__names" }, he = { class: "mcp-token-card__name" }, ge = { class: "mcp-token-card__scopes" }, _e = {
	key: 0,
	class: "mcp-token-card__noscope"
}, ve = { class: "mcp-token-card__meta" }, ye = { class: "mcp-token-card__actions" }, be = { class: "mcp-tokens__form" }, O = { class: "mcp-scopes" }, k = [
	"value",
	"checked",
	"onChange"
], A = { class: "mcp-scope__text" }, j = { class: "mcp-scope__label" }, M = { class: "mcp-scope__code" }, N = {
	key: 0,
	class: "mcp-scope__desc"
}, xe = {
	key: 0,
	class: "mcp-scopes__warn"
}, Se = { class: "mcp-reveal" }, Ce = { class: "mcp-reveal__value" }, we = {
	class: "mcp-reveal__token",
	"data-testid": "mcp-token-plaintext"
}, Te = { class: "mcp-reveal__use" }, Ee = { class: "mcp-reveal__facts" }, De = { class: "mcp-reveal__ack" }, P = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "McpTokensPage",
	props: { client: {} },
	setup(e) {
		let v = new ce(e.client ?? t), T = ee(), E = b([]), P = b([...ae]), F = b(!0), I = b(null), L = b(!1), R = b(!1), z = b(""), B = b([]), Oe = b(!1), V = b(null), H = b(!1), U = b(!1), W = b(null), G = b(!1), K = d(() => B.value.filter((e) => P.value.includes(e))), q = d(() => K.value.length > 0);
		function J(e) {
			return e === null || e === 0 ? "—" : (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function ke(e) {
			return e === null || e === 0 ? "Never used" : `Last used ${(/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString()}`;
		}
		function Ae(e) {
			return e.revoked ? "Revoked" : e.expired ? "Expired" : "Active";
		}
		function je(e) {
			return e.revoked ? "error" : e.expired ? "warning" : "success";
		}
		function Y(e) {
			return e.name.trim() === "" ? "Unnamed token" : e.name;
		}
		function Me(e) {
			return !e.revoked;
		}
		async function X(e = !1) {
			e && (F.value = !0), I.value = null;
			try {
				let e = await v.list();
				E.value = e.tokens ?? [], Array.isArray(e.available_scopes) && e.available_scopes.length > 0 && (P.value = e.available_scopes), Oe.value ||= (B.value = [...P.value], !0);
			} catch (e) {
				I.value = n(e, "Failed to load MCP tokens."), T.error(I.value);
			} finally {
				e && (F.value = !1);
			}
		}
		function Ne() {
			z.value = "", L.value = !0;
		}
		function Z() {
			L.value = !1, z.value = "";
		}
		function Pe(e) {
			B.value.indexOf(e) === -1 ? B.value = [...B.value, e] : B.value = B.value.filter((t) => t !== e);
		}
		function Fe(e) {
			return B.value.includes(e);
		}
		async function Ie() {
			if (!q.value) {
				T.error("Select at least one scope.");
				return;
			}
			if (!R.value) {
				R.value = !0;
				try {
					let e = await v.create({
						name: z.value.trim(),
						scopes: K.value
					});
					L.value = !1, H.value = !1, V.value = e, await X();
				} catch (e) {
					T.error(n(e, "Failed to create MCP token."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function Le() {
			let e = V.value?.token;
			if (e) {
				U.value = !0;
				try {
					await navigator.clipboard.writeText(e), T.success("Token copied to clipboard.");
				} catch {
					T.error("Could not copy — select the token and copy it manually.");
				} finally {
					U.value = !1;
				}
			}
		}
		function Q() {
			H.value &&= (V.value = null, !1);
		}
		function Re(e) {
			W.value = e;
		}
		function $() {
			W.value = null;
		}
		async function ze() {
			let e = W.value;
			if (!(!e || G.value)) {
				G.value = !0;
				try {
					await v.revoke(e.id), T.success(`Revoked “${Y(e)}”.`), W.value = null, await X();
				} catch (e) {
					T.error(n(e, "Failed to revoke token."));
				} finally {
					G.value = !1;
				}
			}
		}
		return ne(() => X(!0)), (e, t) => (y(), m("section", le, [
			h("header", ue, [t[4] ||= h("div", { class: "mcp-tokens__head-text" }, [h("h1", {
				id: "mcp-tokens-heading",
				class: "mcp-tokens__title"
			}, "MCP Tokens"), h("p", { class: "mcp-tokens__subtitle" }, " Personal access tokens an MCP client (Claude Desktop, an agent runner, an editor plugin) presents to this hub. ")], -1), _(r, {
				variant: "solid",
				size: "md",
				"left-icon": "plus",
				onClick: Ne
			}, {
				default: w(() => [...t[3] ||= [g(" New Token ", -1)]]),
				_: 1
			})]),
			_(c, {
				links: C(l)["mcp-tokens"].links,
				details: C(l)["mcp-tokens"].details
			}, {
				default: w(() => [...t[5] ||= [
					g(" An MCP token lets an assistant reach the servers ", -1),
					h("strong", null, "you", -1),
					g(" own, and nothing else. The token is shown ", -1),
					h("strong", null, "once", -1),
					g(" when you create it and is never recoverable afterwards. ", -1),
					h("strong", null, "Revoke", -1),
					g(" kills it immediately. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			F.value ? (y(), m("div", de, [_(o, {
				variant: "rect",
				height: "96px"
			}), _(o, {
				variant: "rect",
				height: "96px"
			})])) : I.value ? (y(), f(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load MCP tokens",
				description: I.value
			}, {
				actions: w(() => [_(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "refresh",
					onClick: t[0] ||= (e) => X(!0)
				}, {
					default: w(() => [...t[6] ||= [g(" Retry ", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : E.value.length === 0 ? (y(), f(s, {
				key: 2,
				icon: "key",
				title: "No MCP tokens",
				description: "Create a token to let an MCP client reach your servers on your behalf."
			})) : (y(), m("div", fe, [(y(!0), m(u, null, x(E.value, (e) => (y(), m("article", {
				key: e.id,
				class: "mcp-token-card"
			}, [h("div", pe, [
				h("div", me, [h("span", he, S(Y(e)), 1), _(i, { tone: je(e) }, {
					default: w(() => [g(S(Ae(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				h("div", ge, [(y(!0), m(u, null, x(e.scopes, (e) => (y(), f(i, {
					key: e,
					tone: "info",
					mono: ""
				}, {
					default: w(() => [g(S(e), 1)]),
					_: 2
				}, 1024))), 128)), e.scopes.length === 0 ? (y(), m("span", _e, "No scopes")) : p("", !0)]),
				h("div", ve, [
					h("span", null, "Created " + S(J(e.created_at)), 1),
					t[7] ||= h("span", { class: "mcp-token-card__divider" }, "·", -1),
					h("span", null, "Expires " + S(J(e.expires_at)), 1),
					t[8] ||= h("span", { class: "mcp-token-card__divider" }, "·", -1),
					h("span", null, S(ke(e.last_used_at)), 1)
				])
			]), h("div", ye, [Me(e) ? (y(), f(r, {
				key: 0,
				variant: "ghost",
				size: "sm",
				onClick: (t) => Re(e)
			}, {
				default: w(() => [...t[9] ||= [g(" Revoke ", -1)]]),
				_: 1
			}, 8, ["onClick"])) : p("", !0)])]))), 128))])),
			_(a, {
				"model-value": L.value,
				title: "New MCP Token",
				"onUpdate:modelValue": Z
			}, {
				footer: w(() => [_(r, {
					variant: "ghost",
					size: "sm",
					onClick: Z
				}, {
					default: w(() => [...t[12] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(r, {
					variant: "solid",
					size: "sm",
					class: "mcp-tokens__create",
					disabled: !q.value,
					loading: R.value,
					onClick: Ie
				}, {
					default: w(() => [...t[13] ||= [g(" Create token ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])]),
				default: w(() => [h("div", be, [_(te, {
					modelValue: z.value,
					"onUpdate:modelValue": t[1] ||= (e) => z.value = e,
					label: "Name",
					placeholder: "e.g. Claude Desktop"
				}, null, 8, ["modelValue"]), h("fieldset", O, [
					t[10] ||= h("legend", { class: "mcp-scopes__legend" }, "Scopes", -1),
					t[11] ||= h("p", { class: "mcp-scopes__hint" }, " A token can only ever be narrower than your account. Scopes never grant access to a server you do not own. ", -1),
					(y(!0), m(u, null, x(P.value, (e) => (y(), m("label", {
						key: e,
						class: "mcp-scope"
					}, [h("input", {
						class: "mcp-scope__box",
						type: "checkbox",
						value: e,
						checked: Fe(e),
						onChange: (t) => Pe(e)
					}, null, 40, k), h("span", A, [
						h("span", j, S(C(oe)(e)), 1),
						h("span", M, S(e), 1),
						C(D)(e) ? (y(), m("span", N, S(C(D)(e)), 1)) : p("", !0)
					])]))), 128)),
					q.value ? p("", !0) : (y(), m("p", xe, " Select at least one scope — a token with none would authenticate but authorise nothing, so the hub refuses it. "))
				])])]),
				_: 1
			}, 8, ["model-value"]),
			_(a, {
				"model-value": V.value !== null,
				title: "Copy your token now",
				dismissible: !1,
				"hide-close": "",
				size: "lg",
				"onUpdate:modelValue": Q
			}, {
				footer: w(() => [_(r, {
					variant: "solid",
					size: "sm",
					class: "mcp-reveal__done",
					disabled: !H.value,
					onClick: Q
				}, {
					default: w(() => [...t[23] ||= [g(" Done ", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: w(() => [h("div", Se, [
					t[22] ||= h("p", {
						class: "mcp-reveal__warn",
						role: "alert"
					}, " This is the only time this token will ever be shown. Phlix stores only a SHA-256 hash of it, so it cannot be looked up, re-sent or recovered. If you lose it you must revoke this token and create a new one. ", -1),
					h("div", Ce, [h("code", we, S(V.value?.token), 1), _(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "bookmark",
						loading: U.value,
						class: "mcp-reveal__copy",
						onClick: Le
					}, {
						default: w(() => [...t[14] ||= [g(" Copy ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					h("p", Te, [
						t[15] ||= g(" Give it to your MCP client as an ", -1),
						t[16] ||= h("code", null, "Authorization: Bearer", -1),
						t[17] ||= g(" header against ", -1),
						t[18] ||= h("code", null, "POST /mcp", -1),
						t[19] ||= g(". Every token starts ", -1),
						h("code", null, S(C(se)), 1),
						t[20] ||= g(". ", -1)
					]),
					h("ul", Ee, [h("li", null, "Scopes: " + S(V.value?.scopes.join(", ") || "none"), 1), h("li", null, "Expires " + S(J(V.value?.expires_at ?? null)), 1)]),
					h("label", De, [ie(h("input", {
						"onUpdate:modelValue": t[2] ||= (e) => H.value = e,
						class: "mcp-reveal__ack-box",
						type: "checkbox",
						"data-testid": "mcp-token-ack"
					}, null, 512), [[re, H.value]]), t[21] ||= h("span", null, "I have saved this token somewhere safe.", -1)])
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(a, {
				"model-value": W.value !== null,
				title: "Revoke this token?",
				"onUpdate:modelValue": $
			}, {
				footer: w(() => [_(r, {
					variant: "ghost",
					size: "sm",
					onClick: $
				}, {
					default: w(() => [...t[24] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(r, {
					variant: "danger",
					size: "sm",
					class: "mcp-tokens__revoke-confirm",
					loading: G.value,
					onClick: ze
				}, {
					default: w(() => [...t[25] ||= [g(" Revoke token ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [h("p", null, " “" + S(W.value ? Y(W.value) : "") + "” stops working immediately and every MCP client using it loses access. This cannot be undone. ", 1)]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-4ed96c11"]]);
//#endregion
export { P as default };

//# sourceMappingURL=McpTokensPage-DU65wV9R.js.map