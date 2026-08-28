import { n as e } from "./Icon-CkTBN_k5.js";
import { i as t, p as n } from "./client-DA-5QZXw.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-Cw8Wl4QR.js";
import { t as i } from "./Badge-D1_MN41Y.js";
import { t as a } from "./Modal-Cfz25d3h.js";
import { t as o } from "./Skeleton-C3OpJbf1.js";
import { t as s } from "./EmptyState-CwWtkhEJ.js";
import { t as te } from "./PageHint-3dL7qb5N.js";
import { t as c } from "./hubHelpLinks-DqAE3Wx3.js";
import { t as ne } from "./Input-D87-h7X1.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, onMounted as re, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, vModelCheckbox as ie, withCtx as C, withDirectives as ae } from "vue";
//#region src/api/mcp-tokens.ts
var oe = [
	"mcp:servers:read",
	"mcp:library:read",
	"mcp:playback:read",
	"mcp:playback:control"
], se = [
	"mcp:servers:read",
	"mcp:library:read",
	"mcp:playback:read"
], w = {
	"mcp:servers:read": "List my servers",
	"mcp:library:read": "Read library and media metadata",
	"mcp:playback:read": "Read playback information",
	"mcp:playback:control": "Control playback already in progress (write)"
}, T = {
	"mcp:servers:read": "Enumerate the media servers this account owns.",
	"mcp:library:read": "Browse libraries and read media metadata over the relay.",
	"mcp:playback:read": "Read stream decisions for an owned media item.",
	"mcp:playback:control": "Pause, resume, stop or seek a cast session already running on an owned server. The only scope here that can change anything — it cannot start playback, but it can stop somebody else’s."
};
function ce(e) {
	return w[e] ?? e;
}
function E(e) {
	return T[e] ?? "";
}
var le = "phlix-mcp-", ue = class {
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
}, be = { class: "mcp-token-card__meta" }, xe = { class: "mcp-token-card__actions" }, D = { class: "mcp-tokens__form" }, O = { class: "mcp-scopes" }, k = [
	"value",
	"checked",
	"onChange"
], A = { class: "mcp-scope__text" }, j = { class: "mcp-scope__label" }, M = { class: "mcp-scope__code" }, Se = {
	key: 0,
	class: "mcp-scope__desc"
}, Ce = {
	key: 0,
	class: "mcp-scopes__warn"
}, we = { class: "mcp-reveal" }, Te = { class: "mcp-reveal__value" }, Ee = {
	class: "mcp-reveal__token",
	"data-testid": "mcp-token-plaintext"
}, De = { class: "mcp-reveal__use" }, Oe = { class: "mcp-reveal__facts" }, ke = { class: "mcp-reveal__ack" }, N = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "McpTokensPage",
	props: { client: {} },
	setup(e) {
		let _ = new ue(e.client ?? t), w = ee(), T = y([]), N = y([...oe]), P = y(!0), F = y(null), I = y(!1), L = y(!1), R = y(""), z = y([]), Ae = y(!1), B = y(null), V = y(!1), H = y(!1), U = y(null), W = y(!1), G = u(() => z.value.filter((e) => N.value.includes(e))), K = u(() => G.value.length > 0);
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
				let e = await _.list();
				T.value = e.tokens ?? [], Array.isArray(e.available_scopes) && e.available_scopes.length > 0 && (N.value = e.available_scopes), Ae.value ||= (z.value = Fe(N.value), !0);
			} catch (e) {
				F.value = n(e, "Failed to load MCP tokens."), w.error(F.value);
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
			if (!K.value) {
				w.error("Select at least one scope.");
				return;
			}
			if (!L.value) {
				L.value = !0;
				try {
					let e = await _.create({
						name: R.value.trim(),
						scopes: G.value
					});
					I.value = !1, V.value = !1, B.value = e, await Y();
				} catch (e) {
					w.error(n(e, "Failed to create MCP token."));
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
					await navigator.clipboard.writeText(e), w.success("Token copied to clipboard.");
				} catch {
					w.error("Could not copy — select the token and copy it manually.");
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
			if (!(!e || W.value)) {
				W.value = !0;
				try {
					await _.revoke(e.id), w.success(`Revoked “${J(e)}”.`), U.value = null, await Y();
				} catch (e) {
					w.error(n(e, "Failed to revoke token."));
				} finally {
					W.value = !1;
				}
			}
		}
		return re(() => Y(!0)), (e, t) => (v(), p("section", de, [
			m("header", fe, [t[4] ||= m("div", { class: "mcp-tokens__head-text" }, [m("h1", {
				id: "mcp-tokens-heading",
				class: "mcp-tokens__title"
			}, "MCP Tokens"), m("p", { class: "mcp-tokens__subtitle" }, " Personal access tokens an MCP client (Claude Desktop, an agent runner, an editor plugin) presents to this hub. ")], -1), g(r, {
				variant: "solid",
				size: "md",
				"left-icon": "plus",
				onClick: Ie
			}, {
				default: C(() => [...t[3] ||= [h(" New Token ", -1)]]),
				_: 1
			})]),
			g(te, {
				links: S(c)["mcp-tokens"].links,
				details: S(c)["mcp-tokens"].details
			}, {
				default: C(() => [...t[5] ||= [
					h(" An MCP token lets an assistant reach the servers ", -1),
					m("strong", null, "you", -1),
					h(" own, and nothing else. The token is shown ", -1),
					m("strong", null, "once", -1),
					h(" when you create it and is never recoverable afterwards. ", -1),
					m("strong", null, "Revoke", -1),
					h(" kills it immediately. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			P.value ? (v(), p("div", pe, [g(o, {
				variant: "rect",
				height: "96px"
			}), g(o, {
				variant: "rect",
				height: "96px"
			})])) : F.value ? (v(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load MCP tokens",
				description: F.value
			}, {
				actions: C(() => [g(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "refresh",
					onClick: t[0] ||= (e) => Y(!0)
				}, {
					default: C(() => [...t[6] ||= [h(" Retry ", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value.length === 0 ? (v(), d(s, {
				key: 2,
				icon: "key",
				title: "No MCP tokens",
				description: "Create a token to let an MCP client reach your servers on your behalf."
			})) : (v(), p("div", me, [(v(!0), p(l, null, b(T.value, (e) => (v(), p("article", {
				key: e.id,
				class: "mcp-token-card"
			}, [m("div", he, [
				m("div", ge, [m("span", _e, x(J(e)), 1), g(i, { tone: Ne(e) }, {
					default: C(() => [h(x(Me(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				m("div", ve, [(v(!0), p(l, null, b(e.scopes, (e) => (v(), d(i, {
					key: e,
					tone: "info",
					mono: ""
				}, {
					default: C(() => [h(x(e), 1)]),
					_: 2
				}, 1024))), 128)), e.scopes.length === 0 ? (v(), p("span", ye, "No scopes")) : f("", !0)]),
				m("div", be, [
					m("span", null, "Created " + x(q(e.created_at)), 1),
					t[7] ||= m("span", { class: "mcp-token-card__divider" }, "·", -1),
					m("span", null, "Expires " + x(q(e.expires_at)), 1),
					t[8] ||= m("span", { class: "mcp-token-card__divider" }, "·", -1),
					m("span", null, x(je(e.last_used_at)), 1)
				])
			]), m("div", xe, [Pe(e) ? (v(), d(r, {
				key: 0,
				variant: "ghost",
				size: "sm",
				onClick: (t) => Be(e)
			}, {
				default: C(() => [...t[9] ||= [h(" Revoke ", -1)]]),
				_: 1
			}, 8, ["onClick"])) : f("", !0)])]))), 128))])),
			g(a, {
				"model-value": I.value,
				title: "New MCP Token",
				"onUpdate:modelValue": X
			}, {
				footer: C(() => [g(r, {
					variant: "ghost",
					size: "sm",
					onClick: X
				}, {
					default: C(() => [...t[12] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(r, {
					variant: "solid",
					size: "sm",
					class: "mcp-tokens__create",
					disabled: !K.value,
					loading: L.value,
					onClick: Re
				}, {
					default: C(() => [...t[13] ||= [h(" Create token ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])]),
				default: C(() => [m("div", D, [g(ne, {
					modelValue: R.value,
					"onUpdate:modelValue": t[1] ||= (e) => R.value = e,
					label: "Name",
					placeholder: "e.g. Claude Desktop"
				}, null, 8, ["modelValue"]), m("fieldset", O, [
					t[10] ||= m("legend", { class: "mcp-scopes__legend" }, "Scopes", -1),
					t[11] ||= m("p", { class: "mcp-scopes__hint" }, " A token can only ever be narrower than your account. Scopes never grant access to a server you do not own. ", -1),
					(v(!0), p(l, null, b(N.value, (e) => (v(), p("label", {
						key: e,
						class: "mcp-scope"
					}, [m("input", {
						class: "mcp-scope__box",
						type: "checkbox",
						value: e,
						checked: Le(e),
						onChange: (t) => Z(e)
					}, null, 40, k), m("span", A, [
						m("span", j, x(S(ce)(e)), 1),
						m("span", M, x(e), 1),
						S(E)(e) ? (v(), p("span", Se, x(S(E)(e)), 1)) : f("", !0)
					])]))), 128)),
					K.value ? f("", !0) : (v(), p("p", Ce, " Select at least one scope — a token with none would authenticate but authorise nothing, so the hub refuses it. "))
				])])]),
				_: 1
			}, 8, ["model-value"]),
			g(a, {
				"model-value": B.value !== null,
				title: "Copy your token now",
				dismissible: !1,
				"hide-close": "",
				size: "lg",
				"onUpdate:modelValue": Q
			}, {
				footer: C(() => [g(r, {
					variant: "solid",
					size: "sm",
					class: "mcp-reveal__done",
					disabled: !V.value,
					onClick: Q
				}, {
					default: C(() => [...t[23] ||= [h(" Done ", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: C(() => [m("div", we, [
					t[22] ||= m("p", {
						class: "mcp-reveal__warn",
						role: "alert"
					}, " This is the only time this token will ever be shown. Phlix stores only a SHA-256 hash of it, so it cannot be looked up, re-sent or recovered. If you lose it you must revoke this token and create a new one. ", -1),
					m("div", Te, [m("code", Ee, x(B.value?.token), 1), g(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "bookmark",
						loading: H.value,
						class: "mcp-reveal__copy",
						onClick: ze
					}, {
						default: C(() => [...t[14] ||= [h(" Copy ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					m("p", De, [
						t[15] ||= h(" Give it to your MCP client as an ", -1),
						t[16] ||= m("code", null, "Authorization: Bearer", -1),
						t[17] ||= h(" header against ", -1),
						t[18] ||= m("code", null, "POST /mcp", -1),
						t[19] ||= h(". Every token starts ", -1),
						m("code", null, x(S(le)), 1),
						t[20] ||= h(". ", -1)
					]),
					m("ul", Oe, [m("li", null, "Scopes: " + x(B.value?.scopes.join(", ") || "none"), 1), m("li", null, "Expires " + x(q(B.value?.expires_at ?? null)), 1)]),
					m("label", ke, [ae(m("input", {
						"onUpdate:modelValue": t[2] ||= (e) => V.value = e,
						class: "mcp-reveal__ack-box",
						type: "checkbox",
						"data-testid": "mcp-token-ack"
					}, null, 512), [[ie, V.value]]), t[21] ||= m("span", null, "I have saved this token somewhere safe.", -1)])
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(a, {
				"model-value": U.value !== null,
				title: "Revoke this token?",
				"onUpdate:modelValue": $
			}, {
				footer: C(() => [g(r, {
					variant: "ghost",
					size: "sm",
					onClick: $
				}, {
					default: C(() => [...t[24] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(r, {
					variant: "danger",
					size: "sm",
					class: "mcp-tokens__revoke-confirm",
					loading: W.value,
					onClick: Ve
				}, {
					default: C(() => [...t[25] ||= [h(" Revoke token ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [m("p", null, " “" + x(U.value ? J(U.value) : "") + "” stops working immediately and every MCP client using it loses access. This cannot be undone. ", 1)]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-3f311864"]]);
//#endregion
export { N as default };

//# sourceMappingURL=McpTokensPage-DXuk4oe-.js.map