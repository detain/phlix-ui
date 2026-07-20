import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-BJEvG52w.js";
import { c as n, f as r, t as i } from "./client-D80As4Gx.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Button-8mVXxqAA.js";
import { t as s } from "./Badge-BO1IU3PF.js";
import { t as c } from "./Skeleton-DhQmxeNg.js";
import { t as l } from "./EmptyState-jnH8lsc0.js";
import { t as u } from "./PageHint-qiuINKdY.js";
import { t as d } from "./syncPlay-DPzJkgkK.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, onMounted as S, openBlock as C, ref as w, renderList as T, toDisplayString as E, vModelText as D, withCtx as O, withDirectives as k, withModifiers as A } from "vue";
//#region src/pages/admin/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var j = {
	class: "admin-syncplay",
	"aria-labelledby": "syncplay-heading"
}, ee = { class: "admin-syncplay__head" }, te = {
	key: 0,
	class: "admin-syncplay__skel"
}, ne = {
	key: 3,
	class: "admin-syncplay__table",
	"aria-label": "SyncPlay groups"
}, re = { class: "admin-syncplay__name" }, ie = { class: "admin-syncplay__media" }, ae = { class: "admin-syncplay__field" }, oe = { class: "admin-syncplay__field" }, se = { class: "admin-syncplay__field" }, ce = { class: "admin-syncplay__field" }, M = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "SyncPlayPage",
	props: { client: {} },
	setup(e) {
		let b = e, M = x("apiBase", ""), N = p(() => typeof M == "string" ? M : M?.value ?? ""), P = new d(b.client ?? new i({
			baseUrl: N.value,
			tokenStore: new n()
		})), F = a(), I = w([]), L = w(!0), R = w(null);
		async function z() {
			L.value = !0, R.value = null;
			try {
				I.value = await P.listGroups();
			} catch (e) {
				R.value = r(e, "Failed to load groups."), F.error(R.value);
			} finally {
				L.value = !1;
			}
		}
		let B = w(!1), V = w(""), H = w(""), U = w(!1);
		function W() {
			V.value = "", H.value = "", B.value = !0;
		}
		function G() {
			B.value = !1;
		}
		async function K() {
			if (!V.value.trim()) {
				F.error("Group name is required.");
				return;
			}
			U.value = !0;
			try {
				let e = { name: V.value.trim() };
				H.value.trim() && (e.password = H.value.trim()), await P.createGroup(e), F.success("Group created."), G(), await z();
			} catch (e) {
				F.error(r(e, "Failed to create group."));
			} finally {
				U.value = !1;
			}
		}
		let q = w(!1), J = w(""), Y = w(""), X = w(!1);
		function le(e) {
			J.value = e ?? "", Y.value = "", q.value = !0;
		}
		function Z() {
			q.value = !1;
		}
		async function Q() {
			if (!J.value.trim()) {
				F.error("Group ID is required.");
				return;
			}
			X.value = !0;
			try {
				let e = {};
				Y.value.trim() && (e.password = Y.value.trim()), await P.joinGroup(J.value.trim(), e), F.success("Joined group."), Z();
			} catch (e) {
				F.error(r(e, "Failed to join group."));
			} finally {
				X.value = !1;
			}
		}
		function $(e) {
			return `${e} member${e === 1 ? "" : "s"}`;
		}
		return S(z), (e, n) => (C(), g("section", j, [
			_("header", ee, [n[7] ||= _("div", { class: "admin-syncplay__heading-group" }, [_("h1", {
				id: "syncplay-heading",
				class: "admin-syncplay__title"
			}, "SyncPlay"), _("p", { class: "admin-syncplay__subtitle" }, " Watch together with synchronized playback for multiple viewers. ")], -1), y(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: W
			}, {
				default: O(() => [...n[6] ||= [v(" Create group ", -1)]]),
				_: 1
			})]),
			y(u, null, {
				default: O(() => [...n[8] ||= [
					v(" SyncPlay keeps playback in step across several viewers so everyone watches the same moment together. ", -1),
					_("strong", null, "Create group", -1),
					v(" starts a new shared session (optionally password-protected), and ", -1),
					_("strong", null, "Join", -1),
					v(" on a listed group lets someone hop into an existing session by ID. ", -1)
				]]),
				_: 1
			}),
			L.value ? (C(), g("div", te, [y(c, {
				variant: "text",
				lines: 5
			})])) : R.value ? (C(), m(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load groups",
				description: R.value
			}, {
				actions: O(() => [y(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: z
				}, {
					default: O(() => [...n[9] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : I.value.length === 0 ? (C(), m(l, {
				key: 2,
				icon: "tv",
				title: "No groups yet",
				description: "Create one to start watching together."
			}, {
				actions: O(() => [y(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: W
				}, {
					default: O(() => [...n[10] ||= [v(" Create group ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (C(), g("table", ne, [n[13] ||= _("thead", null, [_("tr", null, [
				_("th", { scope: "col" }, "Name"),
				_("th", { scope: "col" }, "Members"),
				_("th", { scope: "col" }, "Status"),
				_("th", { scope: "col" }, "Media"),
				_("th", {
					scope: "col",
					class: "admin-syncplay__actions-col"
				}, "Actions")
			])], -1), _("tbody", null, [(C(!0), g(f, null, T(I.value, (e) => (C(), g("tr", { key: e.id }, [
				_("td", null, [_("span", re, E(e.name), 1), e.has_password ? (C(), m(s, {
					key: 0,
					tone: "warning"
				}, {
					default: O(() => [...n[11] ||= [v("Password", -1)]]),
					_: 1
				})) : h("", !0)]),
				_("td", null, E($(e.member_count)), 1),
				_("td", null, [y(s, { tone: e.is_playing ? "accent" : "neutral" }, {
					default: O(() => [v(E(e.is_playing ? "Playing" : "Idle"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				_("td", ie, E(e.current_media ?? "—"), 1),
				_("td", null, [y(o, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Join ${e.name}`,
					onClick: (t) => le(e.id)
				}, {
					default: O(() => [...n[12] ||= [v(" Join ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))])])),
			y(t, {
				modelValue: B.value,
				"onUpdate:modelValue": n[2] ||= (e) => B.value = e,
				title: "Create SyncPlay group",
				onClose: G
			}, {
				footer: O(() => [y(o, {
					variant: "ghost",
					size: "sm",
					onClick: G
				}, {
					default: O(() => [...n[16] ||= [v("Cancel", -1)]]),
					_: 1
				}), y(o, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: K
				}, {
					default: O(() => [...n[17] ||= [v(" Create group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: O(() => [_("form", {
					class: "admin-syncplay__form",
					onSubmit: A(K, ["prevent"])
				}, [_("label", ae, [n[14] ||= _("span", { class: "admin-syncplay__label" }, "Group name", -1), k(_("input", {
					"onUpdate:modelValue": n[0] ||= (e) => V.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "Movie Night",
					required: ""
				}, null, 512), [[D, V.value]])]), _("label", oe, [n[15] ||= _("span", { class: "admin-syncplay__label" }, "Password (optional)", -1), k(_("input", {
					"onUpdate:modelValue": n[1] ||= (e) => H.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					placeholder: "Leave empty for an open group"
				}, null, 512), [[D, H.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			y(t, {
				modelValue: q.value,
				"onUpdate:modelValue": n[5] ||= (e) => q.value = e,
				title: "Join SyncPlay group",
				onClose: Z
			}, {
				footer: O(() => [y(o, {
					variant: "ghost",
					size: "sm",
					onClick: Z
				}, {
					default: O(() => [...n[20] ||= [v("Cancel", -1)]]),
					_: 1
				}), y(o, {
					variant: "solid",
					size: "sm",
					loading: X.value,
					onClick: Q
				}, {
					default: O(() => [...n[21] ||= [v(" Join group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: O(() => [_("form", {
					class: "admin-syncplay__form",
					onSubmit: A(Q, ["prevent"])
				}, [_("label", se, [n[18] ||= _("span", { class: "admin-syncplay__label" }, "Group ID", -1), k(_("input", {
					"onUpdate:modelValue": n[3] ||= (e) => J.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "sp_abc123def456",
					required: ""
				}, null, 512), [[D, J.value]])]), _("label", ce, [n[19] ||= _("span", { class: "admin-syncplay__label" }, "Password (if required)", -1), k(_("input", {
					"onUpdate:modelValue": n[4] ||= (e) => Y.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					placeholder: "Leave empty if no password"
				}, null, 512), [[D, Y.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-045df620"]]);
//#endregion
export { M as default };

//# sourceMappingURL=SyncPlayPage-B5GSJCVI.js.map