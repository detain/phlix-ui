import { a as e, i as t, n, r, t as i, u as a } from "./tokenStore-DfQvvLGI.js";
import { t as o } from "./Modal-CoXJKJI4.js";
import { t as ee } from "./EmptyState-Oymq15Ey.js";
import { t as s } from "./Badge-Cmz5FPqw.js";
import { t as c } from "./syncPlay-DPzJkgkK.js";
import { Fragment as l, computed as te, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, vModelText as C, withCtx as w, withDirectives as T, withModifiers as E } from "vue";
//#region src/pages/admin/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var D = {
	class: "admin-syncplay",
	"aria-labelledby": "syncplay-heading"
}, O = { class: "admin-syncplay__head" }, k = {
	key: 0,
	class: "admin-syncplay__skel"
}, A = {
	key: 2,
	class: "admin-syncplay__table",
	"aria-label": "SyncPlay groups"
}, j = { class: "admin-syncplay__name" }, ne = { class: "admin-syncplay__media" }, M = { class: "admin-syncplay__field" }, re = { class: "admin-syncplay__field" }, ie = { class: "admin-syncplay__field" }, ae = { class: "admin-syncplay__field" }, N = /*#__PURE__*/ a(/* @__PURE__ */ g({
	__name: "SyncPlayPage",
	props: { client: {} },
	setup(a) {
		let g = a, N = _("apiBase", ""), P = te(() => typeof N == "string" ? N : N?.value ?? ""), F = new c(g.client ?? new e({
			baseUrl: P.value,
			tokenStore: new i()
		})), I = t();
		function L(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let R = b([]), z = b(!0);
		async function B() {
			z.value = !0;
			try {
				R.value = await F.listGroups();
			} catch (e) {
				I.error(L(e, "Failed to load groups."));
			} finally {
				z.value = !1;
			}
		}
		let V = b(!1), H = b(""), U = b(""), W = b(!1);
		function G() {
			H.value = "", U.value = "", V.value = !0;
		}
		function K() {
			V.value = !1;
		}
		async function q() {
			if (!H.value.trim()) {
				I.error("Group name is required.");
				return;
			}
			W.value = !0;
			try {
				let e = { name: H.value.trim() };
				U.value.trim() && (e.password = U.value.trim()), await F.createGroup(e), I.success("Group created."), K(), await B();
			} catch (e) {
				I.error(L(e, "Failed to create group."));
			} finally {
				W.value = !1;
			}
		}
		let J = b(!1), Y = b(""), X = b(""), Z = b(!1);
		function oe(e) {
			Y.value = e ?? "", X.value = "", J.value = !0;
		}
		function Q() {
			J.value = !1;
		}
		async function $() {
			if (!Y.value.trim()) {
				I.error("Group ID is required.");
				return;
			}
			Z.value = !0;
			try {
				let e = {};
				X.value.trim() && (e.password = X.value.trim()), await F.joinGroup(Y.value.trim(), e), I.success("Joined group."), Q();
			} catch (e) {
				I.error(L(e, "Failed to join group."));
			} finally {
				Z.value = !1;
			}
		}
		function se(e) {
			return `${e} member${e === 1 ? "" : "s"}`;
		}
		return v(B), (e, t) => (y(), f("section", D, [
			p("header", O, [t[7] ||= p("div", { class: "admin-syncplay__heading-group" }, [p("h1", {
				id: "syncplay-heading",
				class: "admin-syncplay__title"
			}, "SyncPlay"), p("p", { class: "admin-syncplay__subtitle" }, " Watch together with synchronized playback for multiple viewers. ")], -1), h(n, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: w(() => [...t[6] ||= [m(" Create group ", -1)]]),
				_: 1
			})]),
			z.value ? (y(), f("div", k, [h(r, {
				variant: "text",
				lines: 5
			})])) : R.value.length === 0 ? (y(), u(ee, {
				key: 1,
				icon: "tv",
				title: "No groups yet",
				description: "Create one to start watching together."
			}, {
				actions: w(() => [h(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: w(() => [...t[8] ||= [m(" Create group ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (y(), f("table", A, [t[11] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "Members"),
				p("th", { scope: "col" }, "Status"),
				p("th", { scope: "col" }, "Media"),
				p("th", {
					scope: "col",
					class: "admin-syncplay__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(y(!0), f(l, null, x(R.value, (e) => (y(), f("tr", { key: e.id }, [
				p("td", null, [p("span", j, S(e.name), 1), e.has_password ? (y(), u(s, {
					key: 0,
					tone: "warning"
				}, {
					default: w(() => [...t[9] ||= [m("Password", -1)]]),
					_: 1
				})) : d("", !0)]),
				p("td", null, S(se(e.member_count)), 1),
				p("td", null, [h(s, { tone: e.is_playing ? "accent" : "neutral" }, {
					default: w(() => [m(S(e.is_playing ? "Playing" : "Idle"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("td", ne, S(e.current_media ?? "—"), 1),
				p("td", null, [h(n, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Join ${e.name}`,
					onClick: (t) => oe(e.id)
				}, {
					default: w(() => [...t[10] ||= [m(" Join ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))])])),
			h(o, {
				modelValue: V.value,
				"onUpdate:modelValue": t[2] ||= (e) => V.value = e,
				title: "Create SyncPlay group",
				onClose: K
			}, {
				footer: w(() => [h(n, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: w(() => [...t[14] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(n, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: q
				}, {
					default: w(() => [...t[15] ||= [m(" Create group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [p("form", {
					class: "admin-syncplay__form",
					onSubmit: E(q, ["prevent"])
				}, [p("label", M, [t[12] ||= p("span", { class: "admin-syncplay__label" }, "Group name", -1), T(p("input", {
					"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "Movie Night",
					required: ""
				}, null, 512), [[C, H.value]])]), p("label", re, [t[13] ||= p("span", { class: "admin-syncplay__label" }, "Password (optional)", -1), T(p("input", {
					"onUpdate:modelValue": t[1] ||= (e) => U.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					placeholder: "Leave empty for an open group"
				}, null, 512), [[C, U.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				modelValue: J.value,
				"onUpdate:modelValue": t[5] ||= (e) => J.value = e,
				title: "Join SyncPlay group",
				onClose: Q
			}, {
				footer: w(() => [h(n, {
					variant: "ghost",
					size: "sm",
					onClick: Q
				}, {
					default: w(() => [...t[18] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(n, {
					variant: "solid",
					size: "sm",
					loading: Z.value,
					onClick: $
				}, {
					default: w(() => [...t[19] ||= [m(" Join group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [p("form", {
					class: "admin-syncplay__form",
					onSubmit: E($, ["prevent"])
				}, [p("label", ie, [t[16] ||= p("span", { class: "admin-syncplay__label" }, "Group ID", -1), T(p("input", {
					"onUpdate:modelValue": t[3] ||= (e) => Y.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "sp_abc123def456",
					required: ""
				}, null, 512), [[C, Y.value]])]), p("label", ae, [t[17] ||= p("span", { class: "admin-syncplay__label" }, "Password (if required)", -1), T(p("input", {
					"onUpdate:modelValue": t[4] ||= (e) => X.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					placeholder: "Leave empty if no password"
				}, null, 512), [[C, X.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-0357add5"]]);
//#endregion
export { N as default };

//# sourceMappingURL=SyncPlayPage-lmgrssUz.js.map