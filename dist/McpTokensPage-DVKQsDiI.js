import { C as e, i as t, x as n } from "./client-57OweUrJ.js";
import { t as ee } from "./useToastStore-Bu-iYU7r.js";
import { t as r } from "./Badge-C6LNO9Kk.js";
import { t as i } from "./Button-1sKEdGjj.js";
import { t as te } from "./Input-hVCTPbto.js";
import { t as a } from "./Modal-BU4hJGBA.js";
import { t as o } from "./Skeleton-B2Mt2L00.js";
import { t as s } from "./EmptyState-BjOJ1k_A.js";
import { t as ne } from "./PageHint-BlhPmafC.js";
import { t as c } from "./hubHelpLinks-C396-WBg.js";
import { n as l } from "./Icon-CIbfiPrs.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, onMounted as re, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, vModelCheckbox as ie, withCtx as w, withDirectives as ae } from "vue";
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
function ce(e) {
	return T[e] ?? e;
}
function D(e) {
	return E[e] ?? "";
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
}, be = { class: "mcp-token-card__meta" }, O = { class: "mcp-token-card__actions" }, k = { class: "mcp-tokens__form" }, A = { class: "mcp-scopes" }, j = [
	"value",
	"checked",
	"onChange"
], M = { class: "mcp-scope__text" }, N = { class: "mcp-scope__label" }, xe = { class: "mcp-scope__code" }, Se = {
	key: 0,
	class: "mcp-scope__desc"
}, Ce = {
	key: 0,
	class: "mcp-scopes__warn"
}, we = { class: "mcp-reveal" }, Te = { class: "mcp-reveal__value" }, Ee = {
	class: "mcp-reveal__token",
	"data-testid": "mcp-token-plaintext"
}, De = { class: "mcp-reveal__use" }, Oe = { class: "mcp-reveal__facts" }, ke = { class: "mcp-reveal__ack" }, P = /*#__PURE__*/ l(/* @__PURE__ */ v({
	__name: "McpTokensPage",
	props: { client: {} },
	setup(e) {
		let l = new ue(e.client ?? t), v = ee(), T = b([]), E = b([...oe]), P = b(!0), F = b(null), I = b(!1), L = b(!1), R = b(""), z = b([]), Ae = b(!1), B = b(null), V = b(!1), H = b(!1), U = b(null), W = b(!1), G = d(() => z.value.filter((e) => E.value.includes(e))), K = d(() => G.value.length > 0);
		function q(e) {
			return e === null || e === 0 ? "—" : (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function je(e) {
			return e === null || e === 0 ? "Never used" : `Last used ${(/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString()}`;
		}
		function Me(e) {
			return e.revoked ? "Revoked" : e.expired ? "Expired" : "Active";
		}
		function Ne(e) {
			return e.revoked ? "error" : e.expired ? "warning" : "success";
		}
		function J(e) {
			return e.name.trim() === "" ? "Unnamed token" : e.name;
		}
		function Pe(e) {
			return !e.revoked;
		}
		function Fe(e) {
			return e.filter((e) => se.some((t) => t === e));
		}
		async function Y(e = !1) {
			e && (P.value = !0), F.value = null;
			try {
				let e = await l.list();
				T.value = e.tokens ?? [], Array.isArray(e.available_scopes) && e.available_scopes.length > 0 && (E.value = e.available_scopes), Ae.value ||= (z.value = Fe(E.value), !0);
			} catch (e) {
				F.value = n(e, "Failed to load MCP tokens."), v.error(F.value);
			} finally {
				e && (P.value = !1);
			}
		}
		function Ie() {
			R.value = "", I.value = !0;
		}
		function X() {
			I.value = !1, R.value = "";
		}
		function Z(e) {
			z.value.indexOf(e) === -1 ? z.value = [...z.value, e] : z.value = z.value.filter((t) => t !== e);
		}
		function Le(e) {
			return z.value.includes(e);
		}
		async function Re() {
			if (!K.value) v.error("Select at least one scope.");
			else if (!L.value) {
				L.value = !0;
				try {
					let e = await l.create({
						name: R.value.trim(),
						scopes: G.value
					});
					I.value = !1, V.value = !1, B.value = e, await Y();
				} catch (e) {
					v.error(n(e, "Failed to create MCP token."));
				} finally {
					L.value = !1;
				}
			}
		}
		async function ze() {
			let e = B.value?.token;
			if (e) {
				H.value = !0;
				try {
					await navigator.clipboard.writeText(e), v.success("Token copied to clipboard.");
				} catch {
					v.error("Could not copy — select the token and copy it manually.");
				} finally {
					H.value = !1;
				}
			}
		}
		function Q() {
			V.value &&= (B.value = null, !1);
		}
		function Be(e) {
			U.value = e;
		}
		function $() {
			U.value = null;
		}
		async function Ve() {
			let e = U.value;
			if (e && !W.value) {
				W.value = !0;
				try {
					await l.revoke(e.id), v.success(`Revoked “${J(e)}”.`), U.value = null, await Y();
				} catch (e) {
					v.error(n(e, "Failed to revoke token."));
				} finally {
					W.value = !1;
				}
			}
		}
		return re(() => Y(!0)), (e, t) => (y(), m("section", de, [
			h("header", fe, [t[4] ||= h("div", { class: "mcp-tokens__head-text" }, [h("h1", {
				id: "mcp-tokens-heading",
				class: "mcp-tokens__title"
			}, "MCP Tokens"), h("p", { class: "mcp-tokens__subtitle" }, " Personal access tokens an MCP client (Claude Desktop, an agent runner, an editor plugin) presents to this hub. ")], -1), _(i, {
				variant: "solid",
				size: "md",
				"left-icon": "plus",
				onClick: Ie
			}, {
				default: w(() => [...t[3] ||= [g(" New Token ", -1)]]),
				_: 1
			})]),
			_(ne, {
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
			P.value ? (y(), m("div", pe, [_(o, {
				variant: "rect",
				height: "96px"
			}), _(o, {
				variant: "rect",
				height: "96px"
			})])) : F.value ? (y(), f(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load MCP tokens",
				description: F.value
			}, {
				actions: w(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "refresh",
					onClick: t[0] ||= (e) => Y(!0)
				}, {
					default: w(() => [...t[6] ||= [g(" Retry ", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value.length === 0 ? (y(), f(s, {
				key: 2,
				icon: "key",
				title: "No MCP tokens",
				description: "Create a token to let an MCP client reach your servers on your behalf."
			})) : (y(), m("div", me, [(y(!0), m(u, null, x(T.value, (e) => (y(), m("article", {
				key: e.id,
				class: "mcp-token-card"
			}, [h("div", he, [
				h("div", ge, [h("span", _e, S(J(e)), 1), _(r, { tone: Ne(e) }, {
					default: w(() => [g(S(Me(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				h("div", ve, [(y(!0), m(u, null, x(e.scopes, (e) => (y(), f(r, {
					key: e,
					tone: "info",
					mono: ""
				}, {
					default: w(() => [g(S(e), 1)]),
					_: 2
				}, 1024))), 128)), e.scopes.length === 0 ? (y(), m("span", ye, "No scopes")) : p("", !0)]),
				h("div", be, [
					h("span", null, "Created " + S(q(e.created_at)), 1),
					t[7] ||= h("span", { class: "mcp-token-card__divider" }, "·", -1),
					h("span", null, "Expires " + S(q(e.expires_at)), 1),
					t[8] ||= h("span", { class: "mcp-token-card__divider" }, "·", -1),
					h("span", null, S(je(e.last_used_at)), 1)
				])
			]), h("div", O, [Pe(e) ? (y(), f(i, {
				key: 0,
				variant: "ghost",
				size: "sm",
				onClick: (t) => Be(e)
			}, {
				default: w(() => [...t[9] ||= [g(" Revoke ", -1)]]),
				_: 1
			}, 8, ["onClick"])) : p("", !0)])]))), 128))])),
			_(a, {
				"model-value": I.value,
				title: "New MCP Token",
				"onUpdate:modelValue": X
			}, {
				footer: w(() => [_(i, {
					variant: "ghost",
					size: "sm",
					onClick: X
				}, {
					default: w(() => [...t[12] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(i, {
					variant: "solid",
					size: "sm",
					class: "mcp-tokens__create",
					disabled: !K.value,
					loading: L.value,
					onClick: Re
				}, {
					default: w(() => [...t[13] ||= [g(" Create token ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])]),
				default: w(() => [h("div", k, [_(te, {
					modelValue: R.value,
					"onUpdate:modelValue": t[1] ||= (e) => R.value = e,
					label: "Name",
					placeholder: "e.g. Claude Desktop"
				}, null, 8, ["modelValue"]), h("fieldset", A, [
					t[10] ||= h("legend", { class: "mcp-scopes__legend" }, "Scopes", -1),
					t[11] ||= h("p", { class: "mcp-scopes__hint" }, " A token can only ever be narrower than your account. Scopes never grant access to a server you do not own. ", -1),
					(y(!0), m(u, null, x(E.value, (e) => (y(), m("label", {
						key: e,
						class: "mcp-scope"
					}, [h("input", {
						class: "mcp-scope__box",
						type: "checkbox",
						value: e,
						checked: Le(e),
						onChange: (t) => Z(e)
					}, null, 40, j), h("span", M, [
						h("span", N, S(C(ce)(e)), 1),
						h("span", xe, S(e), 1),
						C(D)(e) ? (y(), m("span", Se, S(C(D)(e)), 1)) : p("", !0)
					])]))), 128)),
					K.value ? p("", !0) : (y(), m("p", Ce, " Select at least one scope — a token with none would authenticate but authorize nothing, so the hub refuses it. "))
				])])]),
				_: 1
			}, 8, ["model-value"]),
			_(a, {
				"model-value": B.value !== null,
				title: "Copy your token now",
				dismissible: !1,
				"hide-close": "",
				size: "lg",
				"onUpdate:modelValue": Q
			}, {
				footer: w(() => [_(i, {
					variant: "solid",
					size: "sm",
					class: "mcp-reveal__done",
					disabled: !V.value,
					onClick: Q
				}, {
					default: w(() => [...t[23] ||= [g(" Done ", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: w(() => [h("div", we, [
					t[22] ||= h("p", {
						class: "mcp-reveal__warn",
						role: "alert"
					}, " This is the only time this token will ever be shown. Phlix stores only a SHA-256 hash of it, so it cannot be looked up, re-sent or recovered. If you lose it you must revoke this token and create a new one. ", -1),
					h("div", Te, [h("code", Ee, S(B.value?.token), 1), _(i, {
						variant: "solid",
						size: "sm",
						"left-icon": "bookmark",
						loading: H.value,
						class: "mcp-reveal__copy",
						onClick: ze
					}, {
						default: w(() => [...t[14] ||= [g(" Copy ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					h("p", De, [
						t[15] ||= g(" Give it to your MCP client as an ", -1),
						t[16] ||= h("code", null, "Authorization: Bearer", -1),
						t[17] ||= g(" header against ", -1),
						t[18] ||= h("code", null, "POST /mcp", -1),
						t[19] ||= g(". Every token starts ", -1),
						h("code", null, S(C(le)), 1),
						t[20] ||= g(". ", -1)
					]),
					h("ul", Oe, [h("li", null, "Scopes: " + S(B.value?.scopes.join(", ") || "none"), 1), h("li", null, "Expires " + S(q(B.value?.expires_at ?? null)), 1)]),
					h("label", ke, [ae(h("input", {
						"onUpdate:modelValue": t[2] ||= (e) => V.value = e,
						class: "mcp-reveal__ack-box",
						type: "checkbox",
						"data-testid": "mcp-token-ack"
					}, null, 512), [[ie, V.value]]), t[21] ||= h("span", null, "I have saved this token somewhere safe.", -1)])
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(a, {
				"model-value": U.value !== null,
				title: "Revoke this token?",
				"onUpdate:modelValue": $
			}, {
				footer: w(() => [_(i, {
					variant: "ghost",
					size: "sm",
					onClick: $
				}, {
					default: w(() => [...t[24] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(i, {
					variant: "danger",
					size: "sm",
					class: "mcp-tokens__revoke-confirm",
					loading: W.value,
					onClick: Ve
				}, {
					default: w(() => [...t[25] ||= [g(" Revoke token ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [h("p", null, " “" + S(U.value ? J(U.value) : "") + "” stops working immediately and every MCP client using it loses access. This cannot be undone. ", 1)]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-433566c6"]]);
export { P as default };

//# sourceMappingURL=McpTokensPage-DVKQsDiI.js.map