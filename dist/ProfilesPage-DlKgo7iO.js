import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./useMessages-CWq429TV.js";
import { r as n } from "./useProfileStore-UDW77fRC.js";
import { Fragment as r, computed as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, defineComponent as c, onMounted as l, openBlock as u, ref as d, renderList as f, toDisplayString as p, unref as m, vModelText as h, withDirectives as g, withKeys as _ } from "vue";
//#region src/pages/ProfilesPage.vue?vue&type=script&setup=true&lang.ts
var v = { class: "manage-profiles" }, y = { class: "manage-profiles__head" }, b = { class: "manage-profiles__title" }, x = { class: "manage-profiles__hint" }, S = {
	key: 0,
	class: "manage-profiles__state",
	"data-testid": "profiles-loading"
}, C = {
	key: 1,
	class: "manage-profiles__state manage-profiles__state--error",
	role: "alert",
	"data-testid": "profiles-error"
}, w = {
	key: 0,
	class: "manage-profiles__state",
	"data-testid": "profiles-empty"
}, T = {
	class: "manage-profiles__list",
	"data-testid": "profiles-list"
}, E = ["data-testid"], D = ["aria-label"], O = ["disabled"], k = [
	"disabled",
	"data-testid",
	"onClick"
], A = ["data-testid"], j = ["data-testid", "onClick"], M = [
	"disabled",
	"title",
	"data-testid",
	"onClick"
], N = { class: "manage-profiles__create" }, P = ["aria-label"], F = ["disabled"], I = {
	key: 1,
	class: "manage-profiles__state manage-profiles__state--error",
	role: "alert",
	"data-testid": "profiles-mutation-error"
}, L = /*#__PURE__*/ e(/* @__PURE__ */ c({
	__name: "ProfilesPage",
	setup(e) {
		let c = n(), { t: L } = t();
		l(() => {
			c.load();
		});
		let R = i(() => c.loading && !c.loaded), z = i(() => !c.loaded && c.error !== null), B = i(() => c.loaded && c.profiles.length === 0), V = d(null), H = d(""), U = d(!1);
		function W(e) {
			V.value = e.id, H.value = e.name;
		}
		function G() {
			V.value = null, H.value = "";
		}
		async function K() {
			if (V.value === null || U.value) return;
			let e = H.value.trim();
			if (e.length < 3) {
				c.error = L("profiles.renameTooShort");
				return;
			}
			U.value = !0;
			try {
				await c.rename(V.value, e), G();
			} finally {
				U.value = !1;
			}
		}
		let q = d(null);
		async function J(e) {
			if (q.value === null) {
				q.value = e.id;
				try {
					await c.removeProfile(e.id);
				} finally {
					q.value = null;
				}
			}
		}
		let Y = d(!1), X = d(""), Z = d(!1);
		async function Q() {
			if (Z.value) return;
			let e = X.value.trim();
			if (e.length < 3) return;
			Z.value = !0;
			let t = await c.createProfile(e);
			Z.value = !1, t && (Y.value = !1, X.value = "");
		}
		async function $(e) {
			await c.switchTo(e.id);
		}
		return (e, t) => (u(), o("section", v, [s("header", y, [s("h1", b, p(m(L)("profiles.manageTitle")), 1), s("p", x, p(m(L)("profiles.manageHint")), 1)]), R.value ? (u(), o("p", S, p(m(L)("profiles.loading")), 1)) : z.value ? (u(), o("div", C, [s("p", null, p(m(c).error), 1), s("button", {
			type: "button",
			class: "manage-profiles__action",
			"data-testid": "profiles-retry",
			onClick: t[0] ||= (e) => m(c).retry()
		}, p(m(L)("common.retry")), 1)])) : (u(), o(r, { key: 2 }, [
			B.value ? (u(), o("p", w, p(m(L)("profiles.empty")), 1)) : a("", !0),
			s("ul", T, [(u(!0), o(r, null, f(m(c).profiles, (e) => (u(), o("li", {
				key: e.id,
				class: "manage-profiles__row",
				"data-testid": `profile-row-${e.id}`
			}, [V.value === e.id ? (u(), o(r, { key: 0 }, [
				g(s("input", {
					"onUpdate:modelValue": t[1] ||= (e) => H.value = e,
					class: "manage-profiles__input",
					"data-testid": "profile-rename-input",
					maxlength: 50,
					"aria-label": m(L)("profiles.rename"),
					onKeyup: [_(K, ["enter"]), _(G, ["esc"])]
				}, null, 40, D), [[h, H.value]]),
				s("button", {
					type: "button",
					class: "manage-profiles__action",
					"data-testid": "profile-rename-save",
					disabled: U.value,
					onClick: K
				}, p(m(L)("profiles.save")), 9, O),
				s("button", {
					type: "button",
					class: "manage-profiles__action manage-profiles__action--ghost",
					"data-testid": "profile-rename-cancel",
					onClick: G
				}, p(m(L)("profiles.cancel")), 1)
			], 64)) : (u(), o(r, { key: 1 }, [
				s("button", {
					type: "button",
					class: "manage-profiles__pick",
					disabled: m(c).switchingId !== null,
					"data-testid": `profile-use-${e.id}`,
					onClick: (t) => $(e)
				}, p(e.is_active ? m(L)("profiles.active") : m(L)("profiles.use")), 9, k),
				s("span", {
					class: "manage-profiles__name",
					"data-testid": `profile-name-${e.id}`
				}, p(e.name), 9, A),
				s("button", {
					type: "button",
					class: "manage-profiles__action manage-profiles__action--ghost",
					"data-testid": `profile-rename-${e.id}`,
					onClick: (t) => W(e)
				}, p(m(L)("profiles.rename")), 9, j),
				s("button", {
					type: "button",
					class: "manage-profiles__action manage-profiles__action--danger",
					disabled: q.value !== null || m(c).profiles.length <= 1,
					title: m(c).profiles.length <= 1 ? m(L)("profiles.deleteBlocked") : void 0,
					"data-testid": `profile-delete-${e.id}`,
					onClick: (t) => J(e)
				}, p(m(L)("profiles.delete")), 9, M)
			], 64))], 8, E))), 128))]),
			s("div", N, [Y.value ? (u(), o(r, { key: 1 }, [g(s("input", {
				"onUpdate:modelValue": t[3] ||= (e) => X.value = e,
				class: "manage-profiles__input",
				"data-testid": "profiles-add-input",
				maxlength: 50,
				"aria-label": m(L)("profiles.add"),
				onKeyup: _(Q, ["enter"])
			}, null, 40, P), [[h, X.value]]), s("button", {
				type: "button",
				class: "manage-profiles__action",
				"data-testid": "profiles-add-save",
				disabled: Z.value,
				onClick: Q
			}, p(m(L)("profiles.save")), 9, F)], 64)) : (u(), o("button", {
				key: 0,
				type: "button",
				class: "manage-profiles__action",
				"data-testid": "profiles-add-open",
				onClick: t[2] ||= (e) => Y.value = !0
			}, " + " + p(m(L)("profiles.add")), 1))]),
			m(c).error ? (u(), o("p", I, p(m(c).error), 1)) : a("", !0)
		], 64))]));
	}
}), [["__scopeId", "data-v-4b53d17a"]]);
//#endregion
export { L as default };

//# sourceMappingURL=ProfilesPage-DlKgo7iO.js.map