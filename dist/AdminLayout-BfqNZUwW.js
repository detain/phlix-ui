import { n as e, t } from "./Icon-CkTBN_k5.js";
import { l as n, p as r, t as i, u as a } from "./client-COHWZ2KC.js";
import { t as o } from "./Button-Cw8Wl4QR.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, normalizeClass as _, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, withCtx as w } from "vue";
import { RouterLink as T, RouterView as E } from "vue-router";
//#region src/api/admin/updates.ts
var D = "/api/v1/admin/updates/status";
function O(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function k(e) {
	if (typeof e != "string") return null;
	let t = e.trim();
	return t === "" ? null : t;
}
function A(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : null;
}
function j(e) {
	let t = O(e) ? e : {}, n = O(t.data) ? t.data : t;
	return {
		currentVersion: k(n.currentVersion) ?? "",
		latestVersion: k(n.latestVersion),
		updateAvailable: n.updateAvailable === !0,
		checkEnabled: n.checkEnabled !== !1,
		lastCheckedAt: A(n.lastCheckedAt),
		lastError: k(n.lastError),
		updateCommand: k(n.updateCommand) ?? ""
	};
}
var M = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getStatus(e) {
		return j(await this.client.get(D, void 0, e));
	}
}, N = ["data-variant"], P = { class: "update-banner__body" }, F = {
	id: "update-banner-title",
	class: "update-banner__title"
}, I = {
	key: 0,
	class: "update-banner__versions"
}, L = {
	key: 1,
	class: "update-banner__versions"
}, R = {
	key: 2,
	class: "update-banner__error"
}, z = {
	key: 3,
	class: "update-banner__command"
}, B = {
	class: "update-banner__announcement",
	"aria-live": "polite"
}, V = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "UpdateAvailableBanner",
	setup(e) {
		let h = [
			401,
			403,
			404
		], x = g("apiBase", ""), C = c(() => typeof x == "string" ? x : x?.value ?? ""), T = new M(new i({
			baseUrl: C.value,
			tokenStore: new n()
		})), E = b(null), D = b(null), O = b(""), k = c(() => E.value?.updateAvailable === !0), A = c(() => {
			let e = E.value;
			return e === null || !e.checkEnabled ? null : e.lastError;
		}), j = c(() => A.value ?? D.value), V = c(() => k.value || j.value !== null), H = c(() => k.value ? "update" : "warning"), U = c(() => E.value?.currentVersion ?? ""), W = c(() => E.value?.latestVersion ?? null), G = c(() => E.value?.updateCommand ?? ""), K = c(() => k.value && G.value !== ""), q = c(() => {
			let e = E.value?.lastCheckedAt ?? null;
			return e === null ? "never" : J(e);
		});
		function J(e) {
			let t = Math.floor(Date.now() / 1e3 - e);
			if (t < 60) return `${Math.max(t, 0)}s ago`;
			let n = Math.floor(t / 60);
			if (n < 60) return `${n}m ago`;
			let r = Math.floor(n / 60);
			return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`;
		}
		function Y(e) {
			return e instanceof a && h.includes(e.status);
		}
		async function X() {
			try {
				E.value = await T.getStatus(), D.value = null;
			} catch (e) {
				E.value = null, D.value = Y(e) ? null : r(e, "The update check could not be reached.");
			}
		}
		async function Z() {
			let e = G.value;
			if (e !== "") try {
				await navigator.clipboard.writeText(e), O.value = "Update command copied to clipboard.";
			} catch {
				O.value = "Could not copy the update command. Copy it manually instead.";
			}
		}
		return v(() => {
			X();
		}), (e, n) => V.value ? (y(), d("section", {
			key: 0,
			class: _(["update-banner", `update-banner--${H.value}`]),
			"data-variant": H.value,
			role: "status",
			"aria-labelledby": "update-banner-title"
		}, [
			m(t, {
				name: H.value === "update" ? "arrow-up" : "alert",
				class: "update-banner__icon",
				"aria-hidden": "true"
			}, null, 8, ["name"]),
			f("div", P, [
				f("p", F, [H.value === "update" ? (y(), d(s, { key: 0 }, [p("Update available")], 64)) : (y(), d(s, { key: 1 }, [p("Update check is not working")], 64))]),
				H.value === "update" ? (y(), d("p", I, " Running " + S(U.value) + " — " + S(W.value) + " is available. ", 1)) : (y(), d("p", L, " Running " + S(U.value) + ". Last successful check: " + S(q.value) + ". ", 1)),
				j.value === null ? u("", !0) : (y(), d("p", R, S(j.value), 1)),
				K.value ? (y(), d("code", z, S(G.value), 1)) : u("", !0),
				f("p", B, S(O.value), 1)
			]),
			K.value ? (y(), l(o, {
				key: 0,
				class: "update-banner__copy",
				variant: "outline",
				size: "sm",
				"left-icon": "check",
				onClick: Z
			}, {
				default: w(() => [...n[0] ||= [p(" Copy update command ", -1)]]),
				_: 1
			})) : u("", !0)
		], 10, N)) : u("", !0);
	}
}), [["__scopeId", "data-v-8842b53b"]]), H = { class: "admin" }, U = { class: "admin__sidebar" }, W = {
	class: "admin__nav",
	"aria-labelledby": "admin-nav-heading"
}, G = { class: "admin__label" }, K = { class: "admin__content" }, q = /* @__PURE__ */ h({
	__name: "AdminLayout",
	props: {
		base: { default: "/app" },
		pages: { default: () => [] }
	},
	setup(e) {
		let n = e, r = c(() => n.pages.map((e) => ({
			id: e.name,
			label: e.label,
			icon: e.icon,
			to: `${n.base}/admin/${e.path}`
		})));
		return (e, n) => (y(), d("div", H, [f("aside", U, [n[0] ||= f("p", {
			id: "admin-nav-heading",
			class: "admin__heading"
		}, "Admin", -1), f("nav", W, [(y(!0), d(s, null, x(r.value, (e) => (y(), l(C(T), {
			key: e.id,
			to: e.to ?? "",
			class: "admin__link"
		}, {
			default: w(() => [e.icon ? (y(), l(t, {
				key: 0,
				name: e.icon,
				class: "admin__icon",
				"aria-hidden": "true"
			}, null, 8, ["name"])) : u("", !0), f("span", G, S(e.label), 1)]),
			_: 2
		}, 1032, ["to"]))), 128))])]), f("div", K, [m(V), m(C(E))])]));
	}
});
//#endregion
export { q as default };

//# sourceMappingURL=AdminLayout-BfqNZUwW.js.map