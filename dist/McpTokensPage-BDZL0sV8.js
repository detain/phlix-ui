import { D as e, T as t, i as ee } from "./client-CdNyEcUJ.js";
import { t as te } from "./useToastStore-CxO_ppM8.js";
import { t as ne } from "./useMessages-D54Bje5m.js";
import { t as n } from "./Badge-D7vacFbh.js";
import { t as r } from "./Button-Dfl4y6vO.js";
import { t as re } from "./Input-DUSkplC0.js";
import { t as i } from "./Modal-DZDXQwbG.js";
import { t as a } from "./Skeleton-DDhrDRE7.js";
import { t as o } from "./EmptyState-DjfWh3kt.js";
import { t as s } from "./PageHint-C2jY1TZi.js";
import { t as c } from "./hubHelpLinks-BNMhK6oW.js";
import { n as l } from "./Icon-55iG1rR7.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, onMounted as ie, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, vModelCheckbox as ae, withCtx as w, withDirectives as oe } from "vue";
// src/api/mcp-tokens.ts
var se = [
	"mcp:servers:read",
	"mcp:library:read",
	"mcp:playback:read",
	"mcp:playback:control"
], ce = [
	"mcp:servers:read",
	"mcp:library:read",
	"mcp:playback:read"
], T = {
	"mcp:servers:read": "List my servers",
	"mcp:library:read": "Read library and media metadata",
	"mcp:playback:read": "Read playback information",
	"mcp:playback:control": "Control playback already in progress (write)"
}, E = {
	"mcp:servers:read": "Enumerate the media servers this account owns.",
	"mcp:library:read": "Browse libraries and read media metadata over the relay.",
	"mcp:playback:read": "Read stream decisions for an owned media item.",
	"mcp:playback:control": "Pause, resume, stop or seek a cast session already running on an owned server. The only scope here that can change anything — it cannot start playback, but it can stop somebody else’s."
};
function le(e) {
	return T[e] ?? e;
}
function D(e) {
	return E[e] ?? "";
}
var ue = "phlix-mcp-", de = class {
	constructor(t) {
		e(this, "client", void 0), this.client = t;
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
}, fe = {
	class: "mcp-tokens",
	"aria-labelledby": "mcp-tokens-heading"
}, pe = { class: "mcp-tokens__head" }, me = {
	key: 0,
	class: "mcp-tokens__skel"
}, he = {
	key: 3,
	class: "mcp-tokens__list"
}, ge = { class: "mcp-token-card__main" }, _e = { class: "mcp-token-card__names" }, ve = { class: "mcp-token-card__name" }, ye = { class: "mcp-token-card__scopes" }, be = {
	key: 0,
	class: "mcp-token-card__noscope"
}, O = { class: "mcp-token-card__meta" }, k = { class: "mcp-token-card__actions" }, A = { class: "mcp-tokens__form" }, j = { class: "mcp-scopes" }, M = [
	"value",
	"checked",
	"onChange"
], N = { class: "mcp-scope__text" }, xe = { class: "mcp-scope__label" }, Se = { class: "mcp-scope__code" }, Ce = {
	key: 0,
	class: "mcp-scope__desc"
}, we = {
	key: 0,
	class: "mcp-scopes__warn"
}, Te = { class: "mcp-reveal" }, Ee = { class: "mcp-reveal__value" }, De = {
	class: "mcp-reveal__token",
	"data-testid": "mcp-token-plaintext"
}, Oe = { class: "mcp-reveal__use" }, ke = { class: "mcp-reveal__facts" }, Ae = { class: "mcp-reveal__ack" }, P = /*#__PURE__*/ l(/* @__PURE__ */ v({
	__name: "McpTokensPage",
	props: { client: {} },
	setup(e) {
		let l = new de(e.client ?? ee), v = te(), { t: T } = ne(), E = b([]), P = b([...se]), F = b(!0), I = b(null), L = b(!1), R = b(!1), z = b(""), B = b([]), je = b(!1), V = b(null), H = b(!1), U = b(!1), W = b(null), G = b(!1), K = d(() => B.value.filter((e) => P.value.includes(e))), q = d(() => K.value.length > 0);
		function J(e) {
			return e === null || e === 0 ? "—" : (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function Me(e) {
			return e === null || e === 0 ? "Never used" : `Last used ${(/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString()}`;
		}
		function Ne(e) {
			return e.revoked ? "Revoked" : e.expired ? "Expired" : "Active";
		}
		function Pe(e) {
			return e.revoked ? "error" : e.expired ? "warning" : "success";
		}
		function Y(e) {
			return e.name.trim() === "" ? "Unnamed token" : e.name;
		}
		function Fe(e) {
			return !e.revoked;
		}
		function Ie(e) {
			return e.filter((e) => ce.some((t) => t === e));
		}
		async function X(e = !1) {
			e && (F.value = !0), I.value = null;
			try {
				let e = await l.list();
				E.value = e.tokens ?? [], Array.isArray(e.available_scopes) && e.available_scopes.length > 0 && (P.value = e.available_scopes), je.value ||= (B.value = Ie(P.value), !0);
			} catch (e) {
				I.value = t(e, "Failed to load MCP tokens."), v.error(I.value);
			} finally {
				e && (F.value = !1);
			}
		}
		function Le() {
			z.value = "", L.value = !0;
		}
		function Z() {
			L.value = !1, z.value = "";
		}
		function Re(e) {
			B.value.indexOf(e) === -1 ? B.value = [...B.value, e] : B.value = B.value.filter((t) => t !== e);
		}
		function ze(e) {
			return B.value.includes(e);
		}
		async function Be() {
			if (!q.value) v.error("Select at least one scope.");
			else if (!R.value) {
				R.value = !0;
				try {
					let e = await l.create({
						name: z.value.trim(),
						scopes: K.value
					});
					L.value = !1, H.value = !1, V.value = e, await X();
				} catch (e) {
					v.error(t(e, "Failed to create MCP token."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function Ve() {
			let e = V.value?.token;
			if (e) {
				U.value = !0;
				try {
					await navigator.clipboard.writeText(e), v.success("Token copied to clipboard.");
				} catch {
					v.error("Could not copy — select the token and copy it manually.");
				} finally {
					U.value = !1;
				}
			}
		}
		function Q() {
			H.value &&= (V.value = null, !1);
		}
		function He(e) {
			W.value = e;
		}
		function $() {
			W.value = null;
		}
		async function Ue() {
			let e = W.value;
			if (e && !G.value) {
				G.value = !0;
				try {
					await l.revoke(e.id), v.success(T("mcpTokens.revokeSuccess", { name: Y(e) })), W.value = null, await X();
				} catch (e) {
					v.error(t(e, T("mcpTokens.revokeFailed")));
				} finally {
					G.value = !1;
				}
			}
		}
		return ie(() => X(!0)), (e, t) => (y(), m("section", fe, [
			h("header", pe, [t[4] ||= h("div", { class: "mcp-tokens__head-text" }, [h("h1", {
				id: "mcp-tokens-heading",
				class: "mcp-tokens__title"
			}, "MCP tokens"), h("p", { class: "mcp-tokens__subtitle" }, " Personal access tokens an MCP client (Claude Desktop, an agent runner, an editor plugin) presents to this hub. ")], -1), _(r, {
				variant: "solid",
				size: "md",
				"left-icon": "plus",
				onClick: Le
			}, {
				default: w(() => [...t[3] ||= [g(" New Token ", -1)]]),
				_: 1
			})]),
			_(s, {
				links: C(c)["mcp-tokens"].links,
				details: C(c)["mcp-tokens"].details
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
			F.value ? (y(), m("div", me, [_(a, {
				variant: "rect",
				height: "96px"
			}), _(a, {
				variant: "rect",
				height: "96px"
			})])) : I.value ? (y(), f(o, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load MCP tokens",
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
			}, 8, ["description"])) : E.value.length === 0 ? (y(), f(o, {
				key: 2,
				icon: "key",
				title: "No MCP tokens",
				description: "Create a token to let an MCP client reach your servers on your behalf."
			})) : (y(), m("div", he, [(y(!0), m(u, null, x(E.value, (e) => (y(), m("article", {
				key: e.id,
				class: "mcp-token-card"
			}, [h("div", ge, [
				h("div", _e, [h("span", ve, S(Y(e)), 1), _(n, { tone: Pe(e) }, {
					default: w(() => [g(S(Ne(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				h("div", ye, [(y(!0), m(u, null, x(e.scopes, (e) => (y(), f(n, {
					key: e,
					tone: "info",
					mono: ""
				}, {
					default: w(() => [g(S(e), 1)]),
					_: 2
				}, 1024))), 128)), e.scopes.length === 0 ? (y(), m("span", be, "No scopes")) : p("", !0)]),
				h("div", O, [
					h("span", null, "Created " + S(J(e.created_at)), 1),
					t[7] ||= h("span", { class: "mcp-token-card__divider" }, "·", -1),
					h("span", null, "Expires " + S(J(e.expires_at)), 1),
					t[8] ||= h("span", { class: "mcp-token-card__divider" }, "·", -1),
					h("span", null, S(Me(e.last_used_at)), 1)
				])
			]), h("div", k, [Fe(e) ? (y(), f(r, {
				key: 0,
				variant: "ghost",
				size: "sm",
				onClick: (t) => He(e)
			}, {
				default: w(() => [...t[9] ||= [g(" Revoke ", -1)]]),
				_: 1
			}, 8, ["onClick"])) : p("", !0)])]))), 128))])),
			_(i, {
				"model-value": L.value,
				title: "New MCP token",
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
					onClick: Be
				}, {
					default: w(() => [...t[13] ||= [g(" Create token ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])]),
				default: w(() => [h("div", A, [_(re, {
					modelValue: z.value,
					"onUpdate:modelValue": t[1] ||= (e) => z.value = e,
					label: "Name",
					placeholder: "e.g. Claude Desktop"
				}, null, 8, ["modelValue"]), h("fieldset", j, [
					t[10] ||= h("legend", { class: "mcp-scopes__legend" }, "Scopes", -1),
					t[11] ||= h("p", { class: "mcp-scopes__hint" }, " A token can only ever be narrower than your account. Scopes never grant access to a server you do not own. ", -1),
					(y(!0), m(u, null, x(P.value, (e) => (y(), m("label", {
						key: e,
						class: "mcp-scope"
					}, [h("input", {
						class: "mcp-scope__box",
						type: "checkbox",
						value: e,
						checked: ze(e),
						onChange: (t) => Re(e)
					}, null, 40, M), h("span", N, [
						h("span", xe, S(C(le)(e)), 1),
						h("span", Se, S(e), 1),
						C(D)(e) ? (y(), m("span", Ce, S(C(D)(e)), 1)) : p("", !0)
					])]))), 128)),
					q.value ? p("", !0) : (y(), m("p", we, " Select at least one scope — a token with none would authenticate but authorize nothing, so the hub refuses it. "))
				])])]),
				_: 1
			}, 8, ["model-value"]),
			_(i, {
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
				default: w(() => [h("div", Te, [
					t[22] ||= h("p", {
						class: "mcp-reveal__warn",
						role: "alert"
					}, " This is the only time this token will ever be shown. Phlix stores only a SHA-256 hash of it, so it cannot be looked up, re-sent or recovered. If you lose it you must revoke this token and create a new one. ", -1),
					h("div", Ee, [h("code", De, S(V.value?.token), 1), _(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "bookmark",
						loading: U.value,
						class: "mcp-reveal__copy",
						onClick: Ve
					}, {
						default: w(() => [...t[14] ||= [g(" Copy ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					h("p", Oe, [
						t[15] ||= g(" Give it to your MCP client as an ", -1),
						t[16] ||= h("code", null, "Authorization: Bearer", -1),
						t[17] ||= g(" header against ", -1),
						t[18] ||= h("code", null, "POST /mcp", -1),
						t[19] ||= g(". Every token starts ", -1),
						h("code", null, S(C(ue)), 1),
						t[20] ||= g(". ", -1)
					]),
					h("ul", ke, [h("li", null, "Scopes: " + S(V.value?.scopes.join(", ") || "none"), 1), h("li", null, "Expires " + S(J(V.value?.expires_at ?? null)), 1)]),
					h("label", Ae, [oe(h("input", {
						"onUpdate:modelValue": t[2] ||= (e) => H.value = e,
						class: "mcp-reveal__ack-box",
						type: "checkbox",
						"data-testid": "mcp-token-ack"
					}, null, 512), [[ae, H.value]]), t[21] ||= h("span", null, "I have saved this token somewhere safe.", -1)])
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(i, {
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
					onClick: Ue
				}, {
					default: w(() => [...t[25] ||= [g(" Revoke token ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [h("p", null, " “" + S(W.value ? Y(W.value) : "") + "” stops working immediately and every MCP client using it loses access. This cannot be undone. ", 1)]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-e5aac080"]]);
export { P as default };

//# sourceMappingURL=McpTokensPage-BDZL0sV8.js.map