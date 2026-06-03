import { a as e, d as t, i as n, m as r, n as i, r as a, t as o } from "./Button-DjEQ9y17.js";
import { t as s } from "./Modal-BkSAbwHm.js";
import { t as c } from "./EmptyState-bbKd8GNA.js";
import { t as l } from "./Badge-DobVc76J.js";
import { t as u } from "./syncPlay-DPzJkgkK.js";
import { Fragment as ee, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, onMounted as b, openBlock as x, ref as S, renderList as C, toDisplayString as w, vModelText as T, withCtx as E, withDirectives as D, withModifiers as O } from "vue";
//#region src/pages/admin/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var k = {
	class: "admin-syncplay",
	"aria-labelledby": "syncplay-heading"
}, A = { class: "admin-syncplay__head" }, j = {
	key: 0,
	class: "admin-syncplay__skel"
}, M = {
	key: 2,
	class: "admin-syncplay__table",
	"aria-label": "SyncPlay groups"
}, te = { class: "admin-syncplay__name" }, N = { class: "admin-syncplay__media" }, ne = { class: "admin-syncplay__field" }, re = { class: "admin-syncplay__field" }, ie = { class: "admin-syncplay__field" }, ae = { class: "admin-syncplay__field" }, P = /*#__PURE__*/ r(/* @__PURE__ */ v({
	__name: "SyncPlayPage",
	props: { client: {} },
	setup(r) {
		let v = r, P = y("apiBase", ""), F = d(() => typeof P == "string" ? P : P?.value ?? ""), I = new u(v.client ?? new e({
			baseUrl: F.value,
			tokenStore: new n()
		})), L = a(), R = S([]), z = S(!0);
		async function B() {
			z.value = !0;
			try {
				R.value = await I.listGroups();
			} catch (e) {
				L.error(t(e, "Failed to load groups."));
			} finally {
				z.value = !1;
			}
		}
		let V = S(!1), H = S(""), U = S(""), W = S(!1);
		function G() {
			H.value = "", U.value = "", V.value = !0;
		}
		function K() {
			V.value = !1;
		}
		async function q() {
			if (!H.value.trim()) {
				L.error("Group name is required.");
				return;
			}
			W.value = !0;
			try {
				let e = { name: H.value.trim() };
				U.value.trim() && (e.password = U.value.trim()), await I.createGroup(e), L.success("Group created."), K(), await B();
			} catch (e) {
				L.error(t(e, "Failed to create group."));
			} finally {
				W.value = !1;
			}
		}
		let J = S(!1), Y = S(""), X = S(""), Z = S(!1);
		function oe(e) {
			Y.value = e ?? "", X.value = "", J.value = !0;
		}
		function Q() {
			J.value = !1;
		}
		async function $() {
			if (!Y.value.trim()) {
				L.error("Group ID is required.");
				return;
			}
			Z.value = !0;
			try {
				let e = {};
				X.value.trim() && (e.password = X.value.trim()), await I.joinGroup(Y.value.trim(), e), L.success("Joined group."), Q();
			} catch (e) {
				L.error(t(e, "Failed to join group."));
			} finally {
				Z.value = !1;
			}
		}
		function se(e) {
			return `${e} member${e === 1 ? "" : "s"}`;
		}
		return b(B), (e, t) => (x(), m("section", k, [
			h("header", A, [t[7] ||= h("div", { class: "admin-syncplay__heading-group" }, [h("h1", {
				id: "syncplay-heading",
				class: "admin-syncplay__title"
			}, "SyncPlay"), h("p", { class: "admin-syncplay__subtitle" }, " Watch together with synchronized playback for multiple viewers. ")], -1), _(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: E(() => [...t[6] ||= [g(" Create group ", -1)]]),
				_: 1
			})]),
			z.value ? (x(), m("div", j, [_(i, {
				variant: "text",
				lines: 5
			})])) : R.value.length === 0 ? (x(), f(c, {
				key: 1,
				icon: "tv",
				title: "No groups yet",
				description: "Create one to start watching together."
			}, {
				actions: E(() => [_(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: E(() => [...t[8] ||= [g(" Create group ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (x(), m("table", M, [t[11] ||= h("thead", null, [h("tr", null, [
				h("th", { scope: "col" }, "Name"),
				h("th", { scope: "col" }, "Members"),
				h("th", { scope: "col" }, "Status"),
				h("th", { scope: "col" }, "Media"),
				h("th", {
					scope: "col",
					class: "admin-syncplay__actions-col"
				}, "Actions")
			])], -1), h("tbody", null, [(x(!0), m(ee, null, C(R.value, (e) => (x(), m("tr", { key: e.id }, [
				h("td", null, [h("span", te, w(e.name), 1), e.has_password ? (x(), f(l, {
					key: 0,
					tone: "warning"
				}, {
					default: E(() => [...t[9] ||= [g("Password", -1)]]),
					_: 1
				})) : p("", !0)]),
				h("td", null, w(se(e.member_count)), 1),
				h("td", null, [_(l, { tone: e.is_playing ? "accent" : "neutral" }, {
					default: E(() => [g(w(e.is_playing ? "Playing" : "Idle"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				h("td", N, w(e.current_media ?? "—"), 1),
				h("td", null, [_(o, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Join ${e.name}`,
					onClick: (t) => oe(e.id)
				}, {
					default: E(() => [...t[10] ||= [g(" Join ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))])])),
			_(s, {
				modelValue: V.value,
				"onUpdate:modelValue": t[2] ||= (e) => V.value = e,
				title: "Create SyncPlay group",
				onClose: K
			}, {
				footer: E(() => [_(o, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: E(() => [...t[14] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: q
				}, {
					default: E(() => [...t[15] ||= [g(" Create group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: E(() => [h("form", {
					class: "admin-syncplay__form",
					onSubmit: O(q, ["prevent"])
				}, [h("label", ne, [t[12] ||= h("span", { class: "admin-syncplay__label" }, "Group name", -1), D(h("input", {
					"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "Movie Night",
					required: ""
				}, null, 512), [[T, H.value]])]), h("label", re, [t[13] ||= h("span", { class: "admin-syncplay__label" }, "Password (optional)", -1), D(h("input", {
					"onUpdate:modelValue": t[1] ||= (e) => U.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					placeholder: "Leave empty for an open group"
				}, null, 512), [[T, U.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(s, {
				modelValue: J.value,
				"onUpdate:modelValue": t[5] ||= (e) => J.value = e,
				title: "Join SyncPlay group",
				onClose: Q
			}, {
				footer: E(() => [_(o, {
					variant: "ghost",
					size: "sm",
					onClick: Q
				}, {
					default: E(() => [...t[18] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "solid",
					size: "sm",
					loading: Z.value,
					onClick: $
				}, {
					default: E(() => [...t[19] ||= [g(" Join group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: E(() => [h("form", {
					class: "admin-syncplay__form",
					onSubmit: O($, ["prevent"])
				}, [h("label", ie, [t[16] ||= h("span", { class: "admin-syncplay__label" }, "Group ID", -1), D(h("input", {
					"onUpdate:modelValue": t[3] ||= (e) => Y.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "sp_abc123def456",
					required: ""
				}, null, 512), [[T, Y.value]])]), h("label", ae, [t[17] ||= h("span", { class: "admin-syncplay__label" }, "Password (if required)", -1), D(h("input", {
					"onUpdate:modelValue": t[4] ||= (e) => X.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					placeholder: "Leave empty if no password"
				}, null, 512), [[T, X.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-66f681d9"]]);
//#endregion
export { P as default };

//# sourceMappingURL=SyncPlayPage-DEArYgro.js.map