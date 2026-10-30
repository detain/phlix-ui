import { n as e } from "./Icon-CIwTuFLd.js";
import { t } from "./useMessages-CtPA8i1l.js";
import { r as n } from "./useProfileStore-DM_80Zqk.js";
import { t as r } from "./ConfirmDialog-CJ-buBdv.js";
import { Fragment as i, computed as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createVNode as l, defineComponent as u, onMounted as d, openBlock as f, ref as p, renderList as m, toDisplayString as h, unref as g, vModelText as _, withDirectives as v, withKeys as y } from "vue";
//#region src/pages/ProfilesPage.vue?vue&type=script&setup=true&lang.ts
var b = { class: "manage-profiles" }, x = { class: "manage-profiles__head" }, S = { class: "manage-profiles__title" }, C = { class: "manage-profiles__hint" }, w = {
	key: 0,
	class: "manage-profiles__state",
	"data-testid": "profiles-loading"
}, T = {
	key: 1,
	class: "manage-profiles__state manage-profiles__state--error",
	role: "alert",
	"data-testid": "profiles-error"
}, ee = {
	key: 0,
	class: "manage-profiles__state",
	"data-testid": "profiles-empty"
}, te = {
	class: "manage-profiles__list",
	"data-testid": "profiles-list"
}, ne = ["data-testid"], E = ["aria-label"], D = ["disabled"], O = [
	"disabled",
	"data-testid",
	"onClick"
], k = ["data-testid"], A = ["data-testid", "onClick"], j = [
	"disabled",
	"title",
	"data-testid",
	"onClick"
], M = { class: "manage-profiles__create" }, N = ["aria-label"], P = ["disabled"], F = {
	key: 1,
	class: "manage-profiles__state manage-profiles__state--error",
	role: "alert",
	"data-testid": "profiles-mutation-error"
}, I = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "ProfilesPage",
	setup(e) {
		let u = n(), { t: I } = t();
		d(() => {
			u.load();
		});
		let L = a(() => u.loading && !u.loaded), R = a(() => !u.loaded && u.error !== null), z = a(() => u.loaded && u.profiles.length === 0), B = p(null), V = p(""), H = p(!1);
		function U(e) {
			B.value = e.id, V.value = e.name;
		}
		function W() {
			B.value = null, V.value = "";
		}
		async function G() {
			if (B.value === null || H.value) return;
			let e = V.value.trim();
			if (e.length < 3) {
				u.error = I("profiles.renameTooShort");
				return;
			}
			H.value = !0;
			try {
				await u.rename(B.value, e), W();
			} finally {
				H.value = !1;
			}
		}
		let K = p(null), q = p(null);
		function J(e) {
			q.value = e;
		}
		async function Y() {
			let e = q.value;
			if (q.value = null, !(!e || K.value !== null)) {
				K.value = e.id;
				try {
					await u.removeProfile(e.id);
				} finally {
					K.value = null;
				}
			}
		}
		let X = p(!1), Z = p(""), Q = p(!1);
		async function $() {
			if (Q.value) return;
			let e = Z.value.trim();
			if (e.length < 3) return;
			Q.value = !0;
			let t = await u.createProfile(e);
			Q.value = !1, t && (X.value = !1, Z.value = "");
		}
		async function re(e) {
			await u.switchTo(e.id);
		}
		return (e, t) => (f(), s("section", b, [
			c("header", x, [c("h1", S, h(g(I)("profiles.manageTitle")), 1), c("p", C, h(g(I)("profiles.manageHint")), 1)]),
			L.value ? (f(), s("p", w, h(g(I)("profiles.loading")), 1)) : R.value ? (f(), s("div", T, [c("p", null, h(g(u).error), 1), c("button", {
				type: "button",
				class: "manage-profiles__action",
				"data-testid": "profiles-retry",
				onClick: t[0] ||= (e) => g(u).retry()
			}, h(g(I)("common.retry")), 1)])) : (f(), s(i, { key: 2 }, [
				z.value ? (f(), s("p", ee, h(g(I)("profiles.empty")), 1)) : o("", !0),
				c("ul", te, [(f(!0), s(i, null, m(g(u).profiles, (e) => (f(), s("li", {
					key: e.id,
					class: "manage-profiles__row",
					"data-testid": `profile-row-${e.id}`
				}, [B.value === e.id ? (f(), s(i, { key: 0 }, [
					v(c("input", {
						"onUpdate:modelValue": t[1] ||= (e) => V.value = e,
						class: "manage-profiles__input",
						"data-testid": "profile-rename-input",
						maxlength: 50,
						"aria-label": g(I)("profiles.rename"),
						onKeyup: [y(G, ["enter"]), y(W, ["esc"])]
					}, null, 40, E), [[_, V.value]]),
					c("button", {
						type: "button",
						class: "manage-profiles__action",
						"data-testid": "profile-rename-save",
						disabled: H.value,
						onClick: G
					}, h(g(I)("profiles.save")), 9, D),
					c("button", {
						type: "button",
						class: "manage-profiles__action manage-profiles__action--ghost",
						"data-testid": "profile-rename-cancel",
						onClick: W
					}, h(g(I)("profiles.cancel")), 1)
				], 64)) : (f(), s(i, { key: 1 }, [
					c("button", {
						type: "button",
						class: "manage-profiles__pick",
						disabled: g(u).switchingId !== null,
						"data-testid": `profile-use-${e.id}`,
						onClick: (t) => re(e)
					}, h(e.is_active ? g(I)("profiles.active") : g(I)("profiles.use")), 9, O),
					c("span", {
						class: "manage-profiles__name",
						"data-testid": `profile-name-${e.id}`
					}, h(e.name), 9, k),
					c("button", {
						type: "button",
						class: "manage-profiles__action manage-profiles__action--ghost",
						"data-testid": `profile-rename-${e.id}`,
						onClick: (t) => U(e)
					}, h(g(I)("profiles.rename")), 9, A),
					c("button", {
						type: "button",
						class: "manage-profiles__action manage-profiles__action--danger",
						disabled: K.value !== null || g(u).profiles.length <= 1,
						title: g(u).profiles.length <= 1 ? g(I)("profiles.deleteBlocked") : void 0,
						"data-testid": `profile-delete-${e.id}`,
						onClick: (t) => J(e)
					}, h(g(I)("profiles.delete")), 9, j)
				], 64))], 8, ne))), 128))]),
				c("div", M, [X.value ? (f(), s(i, { key: 1 }, [v(c("input", {
					"onUpdate:modelValue": t[3] ||= (e) => Z.value = e,
					class: "manage-profiles__input",
					"data-testid": "profiles-add-input",
					maxlength: 50,
					"aria-label": g(I)("profiles.add"),
					onKeyup: y($, ["enter"])
				}, null, 40, N), [[_, Z.value]]), c("button", {
					type: "button",
					class: "manage-profiles__action",
					"data-testid": "profiles-add-save",
					disabled: Q.value,
					onClick: $
				}, h(g(I)("profiles.save")), 9, P)], 64)) : (f(), s("button", {
					key: 0,
					type: "button",
					class: "manage-profiles__action",
					"data-testid": "profiles-add-open",
					onClick: t[2] ||= (e) => X.value = !0
				}, " + " + h(g(I)("profiles.add")), 1))]),
				g(u).error ? (f(), s("p", F, h(g(u).error), 1)) : o("", !0)
			], 64)),
			l(r, {
				open: q.value !== null,
				message: q.value ? g(I)("profiles.deleteConfirm", { name: q.value.name }) : "",
				"confirm-label": g(I)("profiles.delete"),
				danger: "",
				"onUpdate:open": t[4] ||= (e) => {
					e || (q.value = null);
				},
				onConfirm: Y
			}, null, 8, [
				"open",
				"message",
				"confirm-label"
			])
		]));
	}
}), [["__scopeId", "data-v-5ebd147c"]]);
//#endregion
export { I as default };

//# sourceMappingURL=ProfilesPage-CajXfJU8.js.map