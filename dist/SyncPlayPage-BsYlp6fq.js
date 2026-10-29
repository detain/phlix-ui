import { n as e } from "./Icon-CIwTuFLd.js";
import { a as t } from "./plural-DMM7pLFA.js";
import { l as n, t as r, y as i } from "./client-CRZ_SWB1.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./EmptyState-BAyOxAcK.js";
import { t as s } from "./Button-BuG0GvCa.js";
import { t as c } from "./Badge-A88fI41k.js";
import { t as l } from "./Modal-BDkw7NP1.js";
import { t as ee } from "./Skeleton-rHw-IJtl.js";
import { t as te } from "./PageHint-BGYg6qRJ.js";
import { t as ne } from "./syncPlay-DPzJkgkK.js";
import { t as u } from "./helpLinks-B4Y1FteC.js";
import { Fragment as re, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, onMounted as ie, openBlock as b, ref as x, renderList as ae, toDisplayString as S, unref as C, vModelText as w, withCtx as T, withDirectives as E, withModifiers as D } from "vue";
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
}, oe = { class: "admin-syncplay__name" }, se = { class: "admin-syncplay__media" }, ce = { class: "admin-syncplay__field" }, le = { class: "admin-syncplay__field" }, ue = { class: "admin-syncplay__field" }, M = { class: "admin-syncplay__field" }, N = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "SyncPlayPage",
	props: { client: {} },
	setup(e) {
		let v = e, N = y("apiBase", ""), P = d(() => typeof N == "string" ? N : N?.value ?? ""), F = new ne(v.client ?? new r({
			baseUrl: P.value,
			tokenStore: new n()
		})), I = a(), L = x([]), R = x(!0), z = x(null);
		async function B() {
			R.value = !0, z.value = null;
			try {
				L.value = await F.listGroups();
			} catch (e) {
				z.value = i(e, "Failed to load groups."), I.error(z.value);
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
				I.error(i(e, "Failed to create group."));
			} finally {
				W.value = !1;
			}
		}
		let J = x(!1), Y = x(""), X = x(""), Z = x(!1);
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
				I.error(i(e, "Failed to join group."));
			} finally {
				Z.value = !1;
			}
		}
		function fe(e) {
			return t(e, "member", "members");
		}
		return ie(B), (e, t) => (b(), m("section", O, [
			h("header", k, [t[7] ||= h("div", { class: "admin-syncplay__heading-group" }, [h("h1", {
				id: "syncplay-heading",
				class: "admin-syncplay__title"
			}, "SyncPlay"), h("p", { class: "admin-syncplay__subtitle" }, " Watch together with synchronized playback for multiple viewers. ")], -1), _(s, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: T(() => [...t[6] ||= [g(" Create group ", -1)]]),
				_: 1
			})]),
			_(te, {
				links: C(u).syncplay.links,
				details: C(u).syncplay.details
			}, {
				default: T(() => [...t[8] ||= [
					g(" SyncPlay keeps playback in step across several viewers so everyone watches the same moment together. ", -1),
					h("strong", null, "Create group", -1),
					g(" starts a new shared session (optionally password-protected), and ", -1),
					h("strong", null, "Join", -1),
					g(" on a listed group lets someone hop into an existing session by ID. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			R.value ? (b(), m("div", A, [_(ee, {
				variant: "text",
				lines: 5
			})])) : z.value ? (b(), f(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load groups",
				description: z.value
			}, {
				actions: T(() => [_(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: T(() => [...t[9] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : L.value.length === 0 ? (b(), f(o, {
				key: 2,
				icon: "tv",
				title: "No groups yet",
				description: "Create one to start watching together."
			}, {
				actions: T(() => [_(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: T(() => [...t[10] ||= [g(" Create group ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (b(), m("table", j, [t[13] ||= h("thead", null, [h("tr", null, [
				h("th", { scope: "col" }, "Name"),
				h("th", { scope: "col" }, "Members"),
				h("th", { scope: "col" }, "Status"),
				h("th", { scope: "col" }, "Media"),
				h("th", {
					scope: "col",
					class: "admin-syncplay__actions-col"
				}, "Actions")
			])], -1), h("tbody", null, [(b(!0), m(re, null, ae(L.value, (e) => (b(), m("tr", { key: e.id }, [
				h("td", null, [h("span", oe, S(e.name), 1), e.has_password ? (b(), f(c, {
					key: 0,
					tone: "warning"
				}, {
					default: T(() => [...t[11] ||= [g("Password", -1)]]),
					_: 1
				})) : p("", !0)]),
				h("td", null, S(fe(e.member_count)), 1),
				h("td", null, [_(c, { tone: e.is_playing ? "accent" : "neutral" }, {
					default: T(() => [g(S(e.is_playing ? "Playing" : "Idle"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				h("td", se, S(e.current_media ?? "—"), 1),
				h("td", null, [_(s, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Join ${e.name}`,
					onClick: (t) => de(e.id)
				}, {
					default: T(() => [...t[12] ||= [g(" Join ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))])])),
			_(l, {
				modelValue: V.value,
				"onUpdate:modelValue": t[2] ||= (e) => V.value = e,
				title: "Create SyncPlay group",
				onClose: K
			}, {
				footer: T(() => [_(s, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: T(() => [...t[16] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(s, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: q
				}, {
					default: T(() => [...t[17] ||= [g(" Create group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: T(() => [h("form", {
					class: "admin-syncplay__form",
					onSubmit: D(q, ["prevent"])
				}, [h("label", ce, [t[14] ||= h("span", { class: "admin-syncplay__label" }, "Group name", -1), E(h("input", {
					"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "Movie Night",
					required: ""
				}, null, 512), [[w, H.value]])]), h("label", le, [t[15] ||= h("span", { class: "admin-syncplay__label" }, "Password (optional)", -1), E(h("input", {
					"onUpdate:modelValue": t[1] ||= (e) => U.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					"data-lpignore": "true",
					"data-1p-ignore": "",
					"data-bwignore": "",
					"data-form-type": "other",
					placeholder: "Leave empty for an open group"
				}, null, 512), [[w, U.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(l, {
				modelValue: J.value,
				"onUpdate:modelValue": t[5] ||= (e) => J.value = e,
				title: "Join SyncPlay group",
				onClose: Q
			}, {
				footer: T(() => [_(s, {
					variant: "ghost",
					size: "sm",
					onClick: Q
				}, {
					default: T(() => [...t[20] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(s, {
					variant: "solid",
					size: "sm",
					loading: Z.value,
					onClick: $
				}, {
					default: T(() => [...t[21] ||= [g(" Join group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: T(() => [h("form", {
					class: "admin-syncplay__form",
					onSubmit: D($, ["prevent"])
				}, [h("label", ue, [t[18] ||= h("span", { class: "admin-syncplay__label" }, "Group ID", -1), E(h("input", {
					"onUpdate:modelValue": t[3] ||= (e) => Y.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "sp_abc123def456",
					required: ""
				}, null, 512), [[w, Y.value]])]), h("label", M, [t[19] ||= h("span", { class: "admin-syncplay__label" }, "Password (if required)", -1), E(h("input", {
					"onUpdate:modelValue": t[4] ||= (e) => X.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					"data-lpignore": "true",
					"data-1p-ignore": "",
					"data-bwignore": "",
					"data-form-type": "other",
					placeholder: "Leave empty if no password"
				}, null, 512), [[w, X.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-ed739f18"]]);
//#endregion
export { N as default };

//# sourceMappingURL=SyncPlayPage-BsYlp6fq.js.map