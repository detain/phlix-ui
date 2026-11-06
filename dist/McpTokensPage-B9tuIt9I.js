import { C as e, i as t, x as n } from "./client-fSGeXil2.js";
import { t as ee } from "./useToastStore-CxO_ppM8.js";
import { t as te } from "./useMessages--_PEquyw.js";
import { t as r } from "./Badge-B_3IbdKb.js";
import { t as i } from "./Button-BLpPomsd.js";
import { t as ne } from "./Input-y6G1jaDw.js";
import { t as a } from "./Modal-CTJDmjI2.js";
import { t as o } from "./Skeleton-DDhrDRE7.js";
import { t as s } from "./EmptyState-DjfWh3kt.js";
import { t as re } from "./PageHint-C2jY1TZi.js";
import { t as c } from "./hubHelpLinks-BNMhK6oW.js";
import { n as l } from "./Icon-55iG1rR7.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, unref as w, vModelCheckbox as ie, withCtx as T, withDirectives as ae } from "vue";
// src/api/mcp-tokens.ts
var oe = [
	"mcp:servers:read",
	"mcp:library:read",
	"mcp:playback:read",
	"mcp:playback:control"
], se = [
	"mcp:servers:read",
	"mcp:library:read",
	"mcp:playback:read"
], E = {
	"mcp:servers:read": "List my servers",
	"mcp:library:read": "Read library and media metadata",
	"mcp:playback:read": "Read playback information",
	"mcp:playback:control": "Control playback already in progress (write)"
}, D = {
	"mcp:servers:read": "Enumerate the media servers this account owns.",
	"mcp:library:read": "Browse libraries and read media metadata over the relay.",
	"mcp:playback:read": "Read stream decisions for an owned media item.",
	"mcp:playback:control": "Pause, resume, stop or seek a cast session already running on an owned server. The only scope here that can change anything — it cannot start playback, but it can stop somebody else’s."
};
function ce(e) {
	return E[e] ?? e;
}
function O(e) {
	return D[e] ?? "";
}
var le = "phlix-mcp-", ue = class {
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
}, de = {
	class: "mcp-tokens",
	"aria-labelledby": "mcp-tokens-heading"
}, fe = { class: "mcp-tokens__head" }, pe = {
	key: 0,
	class: "mcp-tokens__skel"
}, me = {
	key: 3,
	class: "mcp-tokens__list"
}, he = { class: "mcp-token-card__main" }, ge = { class: "mcp-token-card__names" }, _e = { class: "mcp-token-card__name" }, ve = { class: "mcp-token-card__scopes" }, ye = {
	key: 0,
	class: "mcp-token-card__noscope"
}, be = { class: "mcp-token-card__meta" }, k = { class: "mcp-token-card__actions" }, A = { class: "mcp-tokens__form" }, j = { class: "mcp-scopes" }, M = [
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
		let l = new ue(e.client ?? t), v = ee(), { t: E } = te(), D = x([]), P = x([...oe]), F = x(!0), I = x(null), L = x(!1), R = x(!1), z = x(""), B = x([]), je = x(!1), V = x(null), H = x(!1), U = x(!1), W = x(null), G = x(!1), K = d(() => B.value.filter((e) => P.value.includes(e))), q = d(() => K.value.length > 0);
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
			return e.filter((e) => se.some((t) => t === e));
		}
		async function X(e = !1) {
			e && (F.value = !0), I.value = null;
			try {
				let e = await l.list();
				D.value = e.tokens ?? [], Array.isArray(e.available_scopes) && e.available_scopes.length > 0 && (P.value = e.available_scopes), je.value ||= (B.value = Ie(P.value), !0);
			} catch (e) {
				I.value = n(e, "Failed to load MCP tokens."), v.error(I.value);
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
					v.error(n(e, "Failed to create MCP token."));
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
					await l.revoke(e.id), v.success(E("mcpTokens.revokeSuccess", { name: Y(e) })), W.value = null, await X();
				} catch (e) {
					v.error(n(e, E("mcpTokens.revokeFailed")));
				} finally {
					G.value = !1;
				}
			}
		}
		return y(() => X(!0)), (e, t) => (b(), m("section", de, [
			h("header", fe, [t[4] ||= h("div", { class: "mcp-tokens__head-text" }, [h("h1", {
				id: "mcp-tokens-heading",
				class: "mcp-tokens__title"
			}, "MCP tokens"), h("p", { class: "mcp-tokens__subtitle" }, " Personal access tokens an MCP client (Claude Desktop, an agent runner, an editor plugin) presents to this hub. ")], -1), _(i, {
				variant: "solid",
				size: "md",
				"left-icon": "plus",
				onClick: Le
			}, {
				default: T(() => [...t[3] ||= [g(" New Token ", -1)]]),
				_: 1
			})]),
			_(re, {
				links: w(c)["mcp-tokens"].links,
				details: w(c)["mcp-tokens"].details
			}, {
				default: T(() => [...t[5] ||= [
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
			F.value ? (b(), m("div", pe, [_(o, {
				variant: "rect",
				height: "96px"
			}), _(o, {
				variant: "rect",
				height: "96px"
			})])) : I.value ? (b(), f(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load MCP tokens",
				description: I.value
			}, {
				actions: T(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "refresh",
					onClick: t[0] ||= (e) => X(!0)
				}, {
					default: T(() => [...t[6] ||= [g(" Retry ", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : D.value.length === 0 ? (b(), f(s, {
				key: 2,
				icon: "key",
				title: "No MCP tokens",
				description: "Create a token to let an MCP client reach your servers on your behalf."
			})) : (b(), m("div", me, [(b(!0), m(u, null, S(D.value, (e) => (b(), m("article", {
				key: e.id,
				class: "mcp-token-card"
			}, [h("div", he, [
				h("div", ge, [h("span", _e, C(Y(e)), 1), _(r, { tone: Pe(e) }, {
					default: T(() => [g(C(Ne(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				h("div", ve, [(b(!0), m(u, null, S(e.scopes, (e) => (b(), f(r, {
					key: e,
					tone: "info",
					mono: ""
				}, {
					default: T(() => [g(C(e), 1)]),
					_: 2
				}, 1024))), 128)), e.scopes.length === 0 ? (b(), m("span", ye, "No scopes")) : p("", !0)]),
				h("div", be, [
					h("span", null, "Created " + C(J(e.created_at)), 1),
					t[7] ||= h("span", { class: "mcp-token-card__divider" }, "·", -1),
					h("span", null, "Expires " + C(J(e.expires_at)), 1),
					t[8] ||= h("span", { class: "mcp-token-card__divider" }, "·", -1),
					h("span", null, C(Me(e.last_used_at)), 1)
				])
			]), h("div", k, [Fe(e) ? (b(), f(i, {
				key: 0,
				variant: "ghost",
				size: "sm",
				onClick: (t) => He(e)
			}, {
				default: T(() => [...t[9] ||= [g(" Revoke ", -1)]]),
				_: 1
			}, 8, ["onClick"])) : p("", !0)])]))), 128))])),
			_(a, {
				"model-value": L.value,
				title: "New MCP token",
				"onUpdate:modelValue": Z
			}, {
				footer: T(() => [_(i, {
					variant: "ghost",
					size: "sm",
					onClick: Z
				}, {
					default: T(() => [...t[12] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(i, {
					variant: "solid",
					size: "sm",
					class: "mcp-tokens__create",
					disabled: !q.value,
					loading: R.value,
					onClick: Be
				}, {
					default: T(() => [...t[13] ||= [g(" Create token ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])]),
				default: T(() => [h("div", A, [_(ne, {
					modelValue: z.value,
					"onUpdate:modelValue": t[1] ||= (e) => z.value = e,
					label: "Name",
					placeholder: "e.g. Claude Desktop"
				}, null, 8, ["modelValue"]), h("fieldset", j, [
					t[10] ||= h("legend", { class: "mcp-scopes__legend" }, "Scopes", -1),
					t[11] ||= h("p", { class: "mcp-scopes__hint" }, " A token can only ever be narrower than your account. Scopes never grant access to a server you do not own. ", -1),
					(b(!0), m(u, null, S(P.value, (e) => (b(), m("label", {
						key: e,
						class: "mcp-scope"
					}, [h("input", {
						class: "mcp-scope__box",
						type: "checkbox",
						value: e,
						checked: ze(e),
						onChange: (t) => Re(e)
					}, null, 40, M), h("span", N, [
						h("span", xe, C(w(ce)(e)), 1),
						h("span", Se, C(e), 1),
						w(O)(e) ? (b(), m("span", Ce, C(w(O)(e)), 1)) : p("", !0)
					])]))), 128)),
					q.value ? p("", !0) : (b(), m("p", we, " Select at least one scope — a token with none would authenticate but authorize nothing, so the hub refuses it. "))
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
				footer: T(() => [_(i, {
					variant: "solid",
					size: "sm",
					class: "mcp-reveal__done",
					disabled: !H.value,
					onClick: Q
				}, {
					default: T(() => [...t[23] ||= [g(" Done ", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: T(() => [h("div", Te, [
					t[22] ||= h("p", {
						class: "mcp-reveal__warn",
						role: "alert"
					}, " This is the only time this token will ever be shown. Phlix stores only a SHA-256 hash of it, so it cannot be looked up, re-sent or recovered. If you lose it you must revoke this token and create a new one. ", -1),
					h("div", Ee, [h("code", De, C(V.value?.token), 1), _(i, {
						variant: "solid",
						size: "sm",
						"left-icon": "bookmark",
						loading: U.value,
						class: "mcp-reveal__copy",
						onClick: Ve
					}, {
						default: T(() => [...t[14] ||= [g(" Copy ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					h("p", Oe, [
						t[15] ||= g(" Give it to your MCP client as an ", -1),
						t[16] ||= h("code", null, "Authorization: Bearer", -1),
						t[17] ||= g(" header against ", -1),
						t[18] ||= h("code", null, "POST /mcp", -1),
						t[19] ||= g(". Every token starts ", -1),
						h("code", null, C(w(le)), 1),
						t[20] ||= g(". ", -1)
					]),
					h("ul", ke, [h("li", null, "Scopes: " + C(V.value?.scopes.join(", ") || "none"), 1), h("li", null, "Expires " + C(J(V.value?.expires_at ?? null)), 1)]),
					h("label", Ae, [ae(h("input", {
						"onUpdate:modelValue": t[2] ||= (e) => H.value = e,
						class: "mcp-reveal__ack-box",
						type: "checkbox",
						"data-testid": "mcp-token-ack"
					}, null, 512), [[ie, H.value]]), t[21] ||= h("span", null, "I have saved this token somewhere safe.", -1)])
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(a, {
				"model-value": W.value !== null,
				title: "Revoke this token?",
				"onUpdate:modelValue": $
			}, {
				footer: T(() => [_(i, {
					variant: "ghost",
					size: "sm",
					onClick: $
				}, {
					default: T(() => [...t[24] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(i, {
					variant: "danger",
					size: "sm",
					class: "mcp-tokens__revoke-confirm",
					loading: G.value,
					onClick: Ue
				}, {
					default: T(() => [...t[25] ||= [g(" Revoke token ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: T(() => [h("p", null, " “" + C(W.value ? Y(W.value) : "") + "” stops working immediately and every MCP client using it loses access. This cannot be undone. ", 1)]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-e5aac080"]]);
export { P as default };

//# sourceMappingURL=McpTokensPage-B9tuIt9I.js.map