import { n as e, t } from "./Icon-CIbfiPrs.js";
import { t as n, v as r, x as i } from "./client-57OweUrJ.js";
import { t as a } from "./updates-DsFRbFJI.js";
import { t as o } from "./Button-1sKEdGjj.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, normalizeClass as _, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, withCtx as w } from "vue";
import { RouterLink as T, RouterView as E } from "vue-router";
// src/components/admin/UpdateAvailableBanner.vue?vue&type=script&setup=true&lang.ts
var D = ["data-variant"], O = { class: "update-banner__body" }, k = {
	id: "update-banner-title",
	class: "update-banner__title"
}, A = {
	key: 0,
	class: "update-banner__versions"
}, j = {
	key: 1,
	class: "update-banner__versions"
}, M = {
	key: 2,
	class: "update-banner__error"
}, N = {
	key: 3,
	class: "update-banner__command"
}, P = {
	class: "update-banner__announcement",
	"aria-live": "polite"
}, F = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "UpdateAvailableBanner",
	setup(e) {
		let h = [
			401,
			403,
			404
		], x = g("apiBase", ""), C = c(() => typeof x == "string" ? x : x?.value ?? ""), T = new a(new n({ baseUrl: C.value })), E = b(null), F = b(null), I = b(""), L = c(() => E.value?.updateAvailable === !0), R = c(() => {
			let e = E.value;
			return e === null || !e.checkEnabled ? null : e.lastError;
		}), z = c(() => R.value ?? F.value), B = c(() => L.value || z.value !== null), V = c(() => L.value ? "update" : "warning"), H = c(() => E.value?.currentVersion ?? ""), U = c(() => E.value?.latestVersion ?? null), W = c(() => E.value?.updateCommand ?? ""), G = c(() => L.value && W.value !== ""), K = c(() => {
			let e = E.value?.lastCheckedAt ?? null;
			return e === null ? "never" : q(e);
		});
		function q(e) {
			let t = Math.floor(Date.now() / 1e3 - e);
			if (t < 60) return `${Math.max(t, 0)}s ago`;
			let n = Math.floor(t / 60);
			if (n < 60) return `${n}m ago`;
			let r = Math.floor(n / 60);
			return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`;
		}
		function J(e) {
			return e instanceof r && h.includes(e.status);
		}
		async function Y() {
			try {
				E.value = await T.getStatus(), F.value = null;
			} catch (e) {
				E.value = null, F.value = J(e) ? null : i(e, "The update check could not be reached.");
			}
		}
		async function X() {
			let e = W.value;
			if (e !== "") try {
				await navigator.clipboard.writeText(e), I.value = "Update command copied to clipboard.";
			} catch {
				I.value = "Could not copy the update command. Copy it manually instead.";
			}
		}
		return v(() => {
			Y();
		}), (e, n) => B.value ? (y(), d("section", {
			key: 0,
			class: _(["update-banner", `update-banner--${V.value}`]),
			"data-variant": V.value,
			role: "status",
			"aria-labelledby": "update-banner-title"
		}, [
			m(t, {
				name: V.value === "update" ? "arrow-up" : "alert",
				class: "update-banner__icon",
				"aria-hidden": "true"
			}, null, 8, ["name"]),
			f("div", O, [
				f("p", k, [V.value === "update" ? (y(), d(s, { key: 0 }, [p("Update available")], 64)) : (y(), d(s, { key: 1 }, [p("Update check is not working")], 64))]),
				V.value === "update" ? (y(), d("p", A, " Running " + S(H.value) + " — " + S(U.value) + " is available. ", 1)) : (y(), d("p", j, " Running " + S(H.value) + ". Last successful check: " + S(K.value) + ". ", 1)),
				z.value === null ? u("", !0) : (y(), d("p", M, S(z.value), 1)),
				G.value ? (y(), d("code", N, S(W.value), 1)) : u("", !0),
				f("p", P, S(I.value), 1)
			]),
			G.value ? (y(), l(o, {
				key: 0,
				class: "update-banner__copy",
				variant: "outline",
				size: "sm",
				"left-icon": "check",
				onClick: X
			}, {
				default: w(() => [...n[0] ||= [p(" Copy update command ", -1)]]),
				_: 1
			})) : u("", !0)
		], 10, D)) : u("", !0);
	}
}), [["__scopeId", "data-v-a8b3c84a"]]), I = { class: "admin" }, L = { class: "admin__sidebar" }, R = {
	class: "admin__nav",
	"aria-labelledby": "admin-nav-heading"
}, z = { class: "admin__label" }, B = { class: "admin__content" }, V = /* @__PURE__ */ h({
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
		return (e, n) => (y(), d("div", I, [f("aside", L, [n[0] ||= f("p", {
			id: "admin-nav-heading",
			class: "admin__heading"
		}, "Admin", -1), f("nav", R, [(y(!0), d(s, null, x(r.value, (e) => (y(), l(C(T), {
			key: e.id,
			to: e.to ?? "",
			class: "admin__link"
		}, {
			default: w(() => [e.icon ? (y(), l(t, {
				key: 0,
				name: e.icon,
				class: "admin__icon",
				"aria-hidden": "true"
			}, null, 8, ["name"])) : u("", !0), f("span", z, S(e.label), 1)]),
			_: 2
		}, 1032, ["to"]))), 128))])]), f("div", B, [m(F), m(C(E))])]));
	}
});
export { V as default };

//# sourceMappingURL=AdminLayout-BqC5fq9L.js.map