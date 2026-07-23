import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-CqhoiLRk.js";
import { c as n, f as r, t as ee } from "./client-BzWwyWKr.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as l } from "./PageHint-BoAlFFBN.js";
import { t as u } from "./syncPlay-DPzJkgkK.js";
import { t as d } from "./helpLinks-BI4oN4Or.js";
import { Fragment as te, computed as ne, createBlock as f, createCommentVNode as re, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, unref as w, vModelText as T, withCtx as E, withDirectives as D, withModifiers as O } from "vue";
//#region src/pages/admin/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var ie = {
	class: "admin-syncplay",
	"aria-labelledby": "syncplay-heading"
}, k = { class: "admin-syncplay__head" }, A = {
	key: 0,
	class: "admin-syncplay__skel"
}, j = {
	key: 3,
	class: "admin-syncplay__table",
	"aria-label": "SyncPlay groups"
}, M = { class: "admin-syncplay__name" }, ae = { class: "admin-syncplay__media" }, oe = { class: "admin-syncplay__field" }, se = { class: "admin-syncplay__field" }, ce = { class: "admin-syncplay__field" }, le = { class: "admin-syncplay__field" }, N = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SyncPlayPage",
	props: { client: {} },
	setup(e) {
		let _ = e, N = v("apiBase", ""), P = ne(() => typeof N == "string" ? N : N?.value ?? ""), F = new u(_.client ?? new ee({
			baseUrl: P.value,
			tokenStore: new n()
		})), I = i(), L = x([]), R = x(!0), z = x(null);
		async function B() {
			R.value = !0, z.value = null;
			try {
				L.value = await F.listGroups();
			} catch (e) {
				z.value = r(e, "Failed to load groups."), I.error(z.value);
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
				I.error(r(e, "Failed to create group."));
			} finally {
				W.value = !1;
			}
		}
		let J = x(!1), Y = x(""), X = x(""), Z = x(!1);
		function ue(e) {
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
				I.error(r(e, "Failed to join group."));
			} finally {
				Z.value = !1;
			}
		}
		function de(e) {
			return `${e} member${e === 1 ? "" : "s"}`;
		}
		return y(B), (e, n) => (b(), p("section", ie, [
			m("header", k, [n[7] ||= m("div", { class: "admin-syncplay__heading-group" }, [m("h1", {
				id: "syncplay-heading",
				class: "admin-syncplay__title"
			}, "SyncPlay"), m("p", { class: "admin-syncplay__subtitle" }, " Watch together with synchronized playback for multiple viewers. ")], -1), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: E(() => [...n[6] ||= [h(" Create group ", -1)]]),
				_: 1
			})]),
			g(l, {
				links: w(d).syncplay.links,
				details: w(d).syncplay.details
			}, {
				default: E(() => [...n[8] ||= [
					h(" SyncPlay keeps playback in step across several viewers so everyone watches the same moment together. ", -1),
					m("strong", null, "Create group", -1),
					h(" starts a new shared session (optionally password-protected), and ", -1),
					m("strong", null, "Join", -1),
					h(" on a listed group lets someone hop into an existing session by ID. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			R.value ? (b(), p("div", A, [g(s, {
				variant: "text",
				lines: 5
			})])) : z.value ? (b(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load groups",
				description: z.value
			}, {
				actions: E(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: E(() => [...n[9] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : L.value.length === 0 ? (b(), f(c, {
				key: 2,
				icon: "tv",
				title: "No groups yet",
				description: "Create one to start watching together."
			}, {
				actions: E(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: E(() => [...n[10] ||= [h(" Create group ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (b(), p("table", j, [n[13] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Members"),
				m("th", { scope: "col" }, "Status"),
				m("th", { scope: "col" }, "Media"),
				m("th", {
					scope: "col",
					class: "admin-syncplay__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(b(!0), p(te, null, S(L.value, (e) => (b(), p("tr", { key: e.id }, [
				m("td", null, [m("span", M, C(e.name), 1), e.has_password ? (b(), f(o, {
					key: 0,
					tone: "warning"
				}, {
					default: E(() => [...n[11] ||= [h("Password", -1)]]),
					_: 1
				})) : re("", !0)]),
				m("td", null, C(de(e.member_count)), 1),
				m("td", null, [g(o, { tone: e.is_playing ? "accent" : "neutral" }, {
					default: E(() => [h(C(e.is_playing ? "Playing" : "Idle"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				m("td", ae, C(e.current_media ?? "—"), 1),
				m("td", null, [g(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Join ${e.name}`,
					onClick: (t) => ue(e.id)
				}, {
					default: E(() => [...n[12] ||= [h(" Join ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))])])),
			g(t, {
				modelValue: V.value,
				"onUpdate:modelValue": n[2] ||= (e) => V.value = e,
				title: "Create SyncPlay group",
				onClose: K
			}, {
				footer: E(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: E(() => [...n[16] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: q
				}, {
					default: E(() => [...n[17] ||= [h(" Create group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: E(() => [m("form", {
					class: "admin-syncplay__form",
					onSubmit: O(q, ["prevent"])
				}, [m("label", oe, [n[14] ||= m("span", { class: "admin-syncplay__label" }, "Group name", -1), D(m("input", {
					"onUpdate:modelValue": n[0] ||= (e) => H.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "Movie Night",
					required: ""
				}, null, 512), [[T, H.value]])]), m("label", se, [n[15] ||= m("span", { class: "admin-syncplay__label" }, "Password (optional)", -1), D(m("input", {
					"onUpdate:modelValue": n[1] ||= (e) => U.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					"data-lpignore": "true",
					"data-1p-ignore": "",
					"data-bwignore": "",
					"data-form-type": "other",
					placeholder: "Leave empty for an open group"
				}, null, 512), [[T, U.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(t, {
				modelValue: J.value,
				"onUpdate:modelValue": n[5] ||= (e) => J.value = e,
				title: "Join SyncPlay group",
				onClose: Q
			}, {
				footer: E(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: Q
				}, {
					default: E(() => [...n[20] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: Z.value,
					onClick: $
				}, {
					default: E(() => [...n[21] ||= [h(" Join group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: E(() => [m("form", {
					class: "admin-syncplay__form",
					onSubmit: O($, ["prevent"])
				}, [m("label", ce, [n[18] ||= m("span", { class: "admin-syncplay__label" }, "Group ID", -1), D(m("input", {
					"onUpdate:modelValue": n[3] ||= (e) => Y.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "sp_abc123def456",
					required: ""
				}, null, 512), [[T, Y.value]])]), m("label", le, [n[19] ||= m("span", { class: "admin-syncplay__label" }, "Password (if required)", -1), D(m("input", {
					"onUpdate:modelValue": n[4] ||= (e) => X.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					"data-lpignore": "true",
					"data-1p-ignore": "",
					"data-bwignore": "",
					"data-form-type": "other",
					placeholder: "Leave empty if no password"
				}, null, 512), [[T, X.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-074a0c80"]]);
//#endregion
export { N as default };

//# sourceMappingURL=SyncPlayPage-NvXSTwBV.js.map