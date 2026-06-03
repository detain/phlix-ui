import { a as e, f as t, h as n, i as r, n as ee, o as i, r as a, t as o } from "./Button-C86XulWV.js";
import { t as s } from "./Modal-DaapuyD8.js";
import { t as c } from "./Badge-BiYXL5Nz.js";
import { t as l } from "./syncPlay-DPzJkgkK.js";
import { Fragment as te, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, vModelText as w, withCtx as T, withDirectives as E, withModifiers as D } from "vue";
//#region src/pages/admin/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var O = {
	class: "admin-syncplay",
	"aria-labelledby": "syncplay-heading"
}, k = { class: "admin-syncplay__head" }, A = {
	key: 0,
	class: "admin-syncplay__skel"
}, j = {
	key: 3,
	class: "admin-syncplay__table",
	"aria-label": "SyncPlay groups"
}, M = { class: "admin-syncplay__name" }, N = { class: "admin-syncplay__media" }, ne = { class: "admin-syncplay__field" }, re = { class: "admin-syncplay__field" }, ie = { class: "admin-syncplay__field" }, ae = { class: "admin-syncplay__field" }, P = /*#__PURE__*/ n(/* @__PURE__ */ _({
	__name: "SyncPlayPage",
	props: { client: {} },
	setup(n) {
		let _ = n, P = v("apiBase", ""), oe = u(() => typeof P == "string" ? P : P?.value ?? ""), F = new l(_.client ?? new i({
			baseUrl: oe.value,
			tokenStore: new e()
		})), I = r(), L = x([]), R = x(!0), z = x(null);
		async function B() {
			R.value = !0, z.value = null;
			try {
				L.value = await F.listGroups();
			} catch (e) {
				z.value = t(e, "Failed to load groups."), I.error(z.value);
			} finally {
				R.value = !1;
			}
		}
		let V = x(!1), H = x(""), U = x(""), W = x(!1);
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
				I.error(t(e, "Failed to create group."));
			} finally {
				W.value = !1;
			}
		}
		let J = x(!1), Y = x(""), X = x(""), Z = x(!1);
		function se(e) {
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
				I.error(t(e, "Failed to join group."));
			} finally {
				Z.value = !1;
			}
		}
		function ce(e) {
			return `${e} member${e === 1 ? "" : "s"}`;
		}
		return y(B), (e, t) => (b(), p("section", O, [
			m("header", k, [t[7] ||= m("div", { class: "admin-syncplay__heading-group" }, [m("h1", {
				id: "syncplay-heading",
				class: "admin-syncplay__title"
			}, "SyncPlay"), m("p", { class: "admin-syncplay__subtitle" }, " Watch together with synchronized playback for multiple viewers. ")], -1), g(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: T(() => [...t[6] ||= [h(" Create group ", -1)]]),
				_: 1
			})]),
			R.value ? (b(), p("div", A, [g(ee, {
				variant: "text",
				lines: 5
			})])) : z.value ? (b(), d(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load groups",
				description: z.value
			}, {
				actions: T(() => [g(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: T(() => [...t[8] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : L.value.length === 0 ? (b(), d(a, {
				key: 2,
				icon: "tv",
				title: "No groups yet",
				description: "Create one to start watching together."
			}, {
				actions: T(() => [g(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: T(() => [...t[9] ||= [h(" Create group ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (b(), p("table", j, [t[12] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Members"),
				m("th", { scope: "col" }, "Status"),
				m("th", { scope: "col" }, "Media"),
				m("th", {
					scope: "col",
					class: "admin-syncplay__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(b(!0), p(te, null, S(L.value, (e) => (b(), p("tr", { key: e.id }, [
				m("td", null, [m("span", M, C(e.name), 1), e.has_password ? (b(), d(c, {
					key: 0,
					tone: "warning"
				}, {
					default: T(() => [...t[10] ||= [h("Password", -1)]]),
					_: 1
				})) : f("", !0)]),
				m("td", null, C(ce(e.member_count)), 1),
				m("td", null, [g(c, { tone: e.is_playing ? "accent" : "neutral" }, {
					default: T(() => [h(C(e.is_playing ? "Playing" : "Idle"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				m("td", N, C(e.current_media ?? "—"), 1),
				m("td", null, [g(o, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Join ${e.name}`,
					onClick: (t) => se(e.id)
				}, {
					default: T(() => [...t[11] ||= [h(" Join ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))])])),
			g(s, {
				modelValue: V.value,
				"onUpdate:modelValue": t[2] ||= (e) => V.value = e,
				title: "Create SyncPlay group",
				onClose: K
			}, {
				footer: T(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: T(() => [...t[15] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: q
				}, {
					default: T(() => [...t[16] ||= [h(" Create group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: T(() => [m("form", {
					class: "admin-syncplay__form",
					onSubmit: D(q, ["prevent"])
				}, [m("label", ne, [t[13] ||= m("span", { class: "admin-syncplay__label" }, "Group name", -1), E(m("input", {
					"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "Movie Night",
					required: ""
				}, null, 512), [[w, H.value]])]), m("label", re, [t[14] ||= m("span", { class: "admin-syncplay__label" }, "Password (optional)", -1), E(m("input", {
					"onUpdate:modelValue": t[1] ||= (e) => U.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					placeholder: "Leave empty for an open group"
				}, null, 512), [[w, U.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(s, {
				modelValue: J.value,
				"onUpdate:modelValue": t[5] ||= (e) => J.value = e,
				title: "Join SyncPlay group",
				onClose: Q
			}, {
				footer: T(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: Q
				}, {
					default: T(() => [...t[19] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "solid",
					size: "sm",
					loading: Z.value,
					onClick: $
				}, {
					default: T(() => [...t[20] ||= [h(" Join group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: T(() => [m("form", {
					class: "admin-syncplay__form",
					onSubmit: D($, ["prevent"])
				}, [m("label", ie, [t[17] ||= m("span", { class: "admin-syncplay__label" }, "Group ID", -1), E(m("input", {
					"onUpdate:modelValue": t[3] ||= (e) => Y.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "sp_abc123def456",
					required: ""
				}, null, 512), [[w, Y.value]])]), m("label", ae, [t[18] ||= m("span", { class: "admin-syncplay__label" }, "Password (if required)", -1), E(m("input", {
					"onUpdate:modelValue": t[4] ||= (e) => X.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					placeholder: "Leave empty if no password"
				}, null, 512), [[w, X.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-7d3dc7b7"]]);
//#endregion
export { P as default };

//# sourceMappingURL=SyncPlayPage-aI25dFp_.js.map