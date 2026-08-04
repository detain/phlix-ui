import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { a as t } from "./plural-DMM7pLFA.js";
import { l as n, p as r, t as i } from "./client-COHWZ2KC.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Button-DuTfRWnu.js";
import { t as s } from "./Badge-C8wuGrO0.js";
import { t as c } from "./Modal-DRyCYCuK.js";
import { t as l } from "./Skeleton-jlFj-j5t.js";
import { t as u } from "./EmptyState-DERkIIRd.js";
import { t as ee } from "./PageHint-DVe81aMu.js";
import { t as te } from "./syncPlay-DPzJkgkK.js";
import { t as d } from "./helpLinks-BI4oN4Or.js";
import { Fragment as ne, computed as re, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, onMounted as b, openBlock as x, ref as S, renderList as ie, toDisplayString as C, unref as w, vModelText as T, withCtx as E, withDirectives as D, withModifiers as O } from "vue";
//#region src/pages/admin/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var k = {
	class: "admin-syncplay",
	"aria-labelledby": "syncplay-heading"
}, A = { class: "admin-syncplay__head" }, j = {
	key: 0,
	class: "admin-syncplay__skel"
}, ae = {
	key: 3,
	class: "admin-syncplay__table",
	"aria-label": "SyncPlay groups"
}, oe = { class: "admin-syncplay__name" }, se = { class: "admin-syncplay__media" }, ce = { class: "admin-syncplay__field" }, le = { class: "admin-syncplay__field" }, ue = { class: "admin-syncplay__field" }, M = { class: "admin-syncplay__field" }, N = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "SyncPlayPage",
	props: { client: {} },
	setup(e) {
		let v = e, N = y("apiBase", ""), P = re(() => typeof N == "string" ? N : N?.value ?? ""), F = new te(v.client ?? new i({
			baseUrl: P.value,
			tokenStore: new n()
		})), I = a(), L = S([]), R = S(!0), z = S(null);
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
		let V = S(!1), H = S(""), U = S(""), W = S(!1);
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
		let J = S(!1), Y = S(""), X = S(""), Z = S(!1);
		function de(e) {
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
		function fe(e) {
			return t(e, "member", "members");
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
			_(ee, {
				links: w(d).syncplay.links,
				details: w(d).syncplay.details
			}, {
				default: E(() => [...t[8] ||= [
					g(" SyncPlay keeps playback in step across several viewers so everyone watches the same moment together. ", -1),
					h("strong", null, "Create group", -1),
					g(" starts a new shared session (optionally password-protected), and ", -1),
					h("strong", null, "Join", -1),
					g(" on a listed group lets someone hop into an existing session by ID. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			R.value ? (x(), m("div", j, [_(l, {
				variant: "text",
				lines: 5
			})])) : z.value ? (x(), f(u, {
				key: 1,
				icon: "alert",
				title: "Couldn't load groups",
				description: z.value
			}, {
				actions: E(() => [_(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: E(() => [...t[9] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : L.value.length === 0 ? (x(), f(u, {
				key: 2,
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
					default: E(() => [...t[10] ||= [g(" Create group ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (x(), m("table", ae, [t[13] ||= h("thead", null, [h("tr", null, [
				h("th", { scope: "col" }, "Name"),
				h("th", { scope: "col" }, "Members"),
				h("th", { scope: "col" }, "Status"),
				h("th", { scope: "col" }, "Media"),
				h("th", {
					scope: "col",
					class: "admin-syncplay__actions-col"
				}, "Actions")
			])], -1), h("tbody", null, [(x(!0), m(ne, null, ie(L.value, (e) => (x(), m("tr", { key: e.id }, [
				h("td", null, [h("span", oe, C(e.name), 1), e.has_password ? (x(), f(s, {
					key: 0,
					tone: "warning"
				}, {
					default: E(() => [...t[11] ||= [g("Password", -1)]]),
					_: 1
				})) : p("", !0)]),
				h("td", null, C(fe(e.member_count)), 1),
				h("td", null, [_(s, { tone: e.is_playing ? "accent" : "neutral" }, {
					default: E(() => [g(C(e.is_playing ? "Playing" : "Idle"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				h("td", se, C(e.current_media ?? "—"), 1),
				h("td", null, [_(o, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Join ${e.name}`,
					onClick: (t) => de(e.id)
				}, {
					default: E(() => [...t[12] ||= [g(" Join ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))])])),
			_(c, {
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
					default: E(() => [...t[16] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: q
				}, {
					default: E(() => [...t[17] ||= [g(" Create group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: E(() => [h("form", {
					class: "admin-syncplay__form",
					onSubmit: O(q, ["prevent"])
				}, [h("label", ce, [t[14] ||= h("span", { class: "admin-syncplay__label" }, "Group name", -1), D(h("input", {
					"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "Movie Night",
					required: ""
				}, null, 512), [[T, H.value]])]), h("label", le, [t[15] ||= h("span", { class: "admin-syncplay__label" }, "Password (optional)", -1), D(h("input", {
					"onUpdate:modelValue": t[1] ||= (e) => U.value = e,
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
			_(c, {
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
					default: E(() => [...t[20] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "solid",
					size: "sm",
					loading: Z.value,
					onClick: $
				}, {
					default: E(() => [...t[21] ||= [g(" Join group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: E(() => [h("form", {
					class: "admin-syncplay__form",
					onSubmit: O($, ["prevent"])
				}, [h("label", ue, [t[18] ||= h("span", { class: "admin-syncplay__label" }, "Group ID", -1), D(h("input", {
					"onUpdate:modelValue": t[3] ||= (e) => Y.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "sp_abc123def456",
					required: ""
				}, null, 512), [[T, Y.value]])]), h("label", M, [t[19] ||= h("span", { class: "admin-syncplay__label" }, "Password (if required)", -1), D(h("input", {
					"onUpdate:modelValue": t[4] ||= (e) => X.value = e,
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
}), [["__scopeId", "data-v-ed739f18"]]);
//#endregion
export { N as default };

//# sourceMappingURL=SyncPlayPage-BrME0diw.js.map