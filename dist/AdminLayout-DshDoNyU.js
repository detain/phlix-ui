import { n as e, t } from "./Icon-CkTBN_k5.js";
import { l as n, p as r, t as i, u as a } from "./client-COHWZ2KC.js";
import { t as o } from "./Button-Cw8Wl4QR.js";
import { t as s } from "./updates-C0lkhPWc.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, normalizeClass as v, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, unref as w, withCtx as T } from "vue";
import { RouterLink as E, RouterView as D } from "vue-router";
//#region src/components/admin/UpdateAvailableBanner.vue?vue&type=script&setup=true&lang.ts
var O = ["data-variant"], k = { class: "update-banner__body" }, A = {
	id: "update-banner-title",
	class: "update-banner__title"
}, j = {
	key: 0,
	class: "update-banner__versions"
}, M = {
	key: 1,
	class: "update-banner__versions"
}, N = {
	key: 2,
	class: "update-banner__error"
}, P = {
	key: 3,
	class: "update-banner__command"
}, F = {
	class: "update-banner__announcement",
	"aria-live": "polite"
}, I = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "UpdateAvailableBanner",
	setup(e) {
		let g = [
			401,
			403,
			404
		], S = _("apiBase", ""), w = l(() => typeof S == "string" ? S : S?.value ?? ""), E = new s(new i({
			baseUrl: w.value,
			tokenStore: new n()
		})), D = x(null), I = x(null), L = x(""), R = l(() => D.value?.updateAvailable === !0), z = l(() => {
			let e = D.value;
			return e === null || !e.checkEnabled ? null : e.lastError;
		}), B = l(() => z.value ?? I.value), V = l(() => R.value || B.value !== null), H = l(() => R.value ? "update" : "warning"), U = l(() => D.value?.currentVersion ?? ""), W = l(() => D.value?.latestVersion ?? null), G = l(() => D.value?.updateCommand ?? ""), K = l(() => R.value && G.value !== ""), q = l(() => {
			let e = D.value?.lastCheckedAt ?? null;
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
			return e instanceof a && g.includes(e.status);
		}
		async function X() {
			try {
				D.value = await E.getStatus(), I.value = null;
			} catch (e) {
				D.value = null, I.value = Y(e) ? null : r(e, "The update check could not be reached.");
			}
		}
		async function Z() {
			let e = G.value;
			if (e !== "") try {
				await navigator.clipboard.writeText(e), L.value = "Update command copied to clipboard.";
			} catch {
				L.value = "Could not copy the update command. Copy it manually instead.";
			}
		}
		return y(() => {
			X();
		}), (e, n) => V.value ? (b(), f("section", {
			key: 0,
			class: v(["update-banner", `update-banner--${H.value}`]),
			"data-variant": H.value,
			role: "status",
			"aria-labelledby": "update-banner-title"
		}, [
			h(t, {
				name: H.value === "update" ? "arrow-up" : "alert",
				class: "update-banner__icon",
				"aria-hidden": "true"
			}, null, 8, ["name"]),
			p("div", k, [
				p("p", A, [H.value === "update" ? (b(), f(c, { key: 0 }, [m("Update available")], 64)) : (b(), f(c, { key: 1 }, [m("Update check is not working")], 64))]),
				H.value === "update" ? (b(), f("p", j, " Running " + C(U.value) + " — " + C(W.value) + " is available. ", 1)) : (b(), f("p", M, " Running " + C(U.value) + ". Last successful check: " + C(q.value) + ". ", 1)),
				B.value === null ? d("", !0) : (b(), f("p", N, C(B.value), 1)),
				K.value ? (b(), f("code", P, C(G.value), 1)) : d("", !0),
				p("p", F, C(L.value), 1)
			]),
			K.value ? (b(), u(o, {
				key: 0,
				class: "update-banner__copy",
				variant: "outline",
				size: "sm",
				"left-icon": "check",
				onClick: Z
			}, {
				default: T(() => [...n[0] ||= [m(" Copy update command ", -1)]]),
				_: 1
			})) : d("", !0)
		], 10, O)) : d("", !0);
	}
}), [["__scopeId", "data-v-8842b53b"]]), L = { class: "admin" }, R = { class: "admin__sidebar" }, z = {
	class: "admin__nav",
	"aria-labelledby": "admin-nav-heading"
}, B = { class: "admin__label" }, V = { class: "admin__content" }, H = /* @__PURE__ */ g({
	__name: "AdminLayout",
	props: {
		base: { default: "/app" },
		pages: { default: () => [] }
	},
	setup(e) {
		let n = e, r = l(() => n.pages.map((e) => ({
			id: e.name,
			label: e.label,
			icon: e.icon,
			to: `${n.base}/admin/${e.path}`
		})));
		return (e, n) => (b(), f("div", L, [p("aside", R, [n[0] ||= p("p", {
			id: "admin-nav-heading",
			class: "admin__heading"
		}, "Admin", -1), p("nav", z, [(b(!0), f(c, null, S(r.value, (e) => (b(), u(w(E), {
			key: e.id,
			to: e.to ?? "",
			class: "admin__link"
		}, {
			default: T(() => [e.icon ? (b(), u(t, {
				key: 0,
				name: e.icon,
				class: "admin__icon",
				"aria-hidden": "true"
			}, null, 8, ["name"])) : d("", !0), p("span", B, C(e.label), 1)]),
			_: 2
		}, 1032, ["to"]))), 128))])]), p("div", V, [h(I), h(w(D))])]));
	}
});
//#endregion
export { H as default };

//# sourceMappingURL=AdminLayout-DshDoNyU.js.map