import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./syncPlay-ALHI-eAH.js";
import { t as r } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as ee } from "./PageHint-BlhPmafC.js";
import { t as a } from "./helpLinks-iarZuNmw.js";
import { t as o } from "./Button-1sKEdGjj.js";
import { t as s } from "./Modal-BU4hJGBA.js";
import { t as c } from "./Skeleton-B2Mt2L00.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { a as u } from "./plural-B3O2rVPV.js";
import { n as d } from "./Icon-CIbfiPrs.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as te, onMounted as ne, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, vModelText as E, withCtx as D, withDirectives as O, withModifiers as k } from "vue";
// src/pages/admin/SyncPlayPage.vue?vue&type=script&setup=true&lang.ts
var A = {
	class: "admin-syncplay",
	"aria-labelledby": "syncplay-heading"
}, j = { class: "admin-syncplay__head" }, M = {
	key: 0,
	class: "admin-syncplay__skel"
}, re = {
	key: 3,
	class: "admin-syncplay__table",
	"aria-label": "SyncPlay groups"
}, ie = { class: "admin-syncplay__name" }, ae = { class: "admin-syncplay__media" }, oe = { class: "admin-syncplay__field" }, se = { class: "admin-syncplay__field" }, ce = { class: "admin-syncplay__field" }, le = { class: "admin-syncplay__field" }, N = /*#__PURE__*/ d(/* @__PURE__ */ b({
	__name: "SyncPlayPage",
	props: { client: {} },
	setup(d) {
		let b = d, N = te("apiBase", ""), P = p(() => typeof N == "string" ? N : N?.value ?? ""), F = new n(b.client ?? new e({ baseUrl: P.value })), I = r(), L = S([]), R = S(!0), z = S(null);
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
		let V = S(!1), H = S(""), U = S(""), W = S(!1);
		function G() {
			H.value = "", U.value = "", V.value = !0;
		}
		function K() {
			V.value = !1;
		}
		async function q() {
			if (!H.value.trim()) I.error("Group name is required.");
			else {
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
		}
		let J = S(!1), Y = S(""), X = S(""), Z = S(!1);
		function ue(e) {
			Y.value = e ?? "", X.value = "", J.value = !0;
		}
		function Q() {
			J.value = !1;
		}
		async function $() {
			if (!Y.value.trim()) I.error("Group ID is required.");
			else {
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
		}
		function de(e) {
			return u(e, "member", "members");
		}
		return ne(B), (e, t) => (x(), g("section", A, [
			_("header", j, [t[7] ||= _("div", { class: "admin-syncplay__heading-group" }, [_("h1", {
				id: "syncplay-heading",
				class: "admin-syncplay__title"
			}, "SyncPlay"), _("p", { class: "admin-syncplay__subtitle" }, " Watch together with synchronized playback for multiple viewers. ")], -1), y(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: D(() => [...t[6] ||= [v(" Create group ", -1)]]),
				_: 1
			})]),
			y(ee, {
				links: T(a).syncplay.links,
				details: T(a).syncplay.details
			}, {
				default: D(() => [...t[8] ||= [
					v(" SyncPlay keeps playback in step across several viewers so everyone watches the same moment together. ", -1),
					_("strong", null, "Create group", -1),
					v(" starts a new shared session (optionally password-protected), and ", -1),
					_("strong", null, "Join", -1),
					v(" on a listed group lets someone hop into an existing session by ID. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			R.value ? (x(), g("div", M, [y(c, {
				variant: "text",
				lines: 5
			})])) : z.value ? (x(), m(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load groups",
				description: z.value
			}, {
				actions: D(() => [y(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: D(() => [...t[9] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : L.value.length === 0 ? (x(), m(l, {
				key: 2,
				icon: "tv",
				title: "No groups yet",
				description: "Create one to start watching together."
			}, {
				actions: D(() => [y(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: D(() => [...t[10] ||= [v(" Create group ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (x(), g("table", re, [t[13] ||= _("thead", null, [_("tr", null, [
				_("th", { scope: "col" }, "Name"),
				_("th", { scope: "col" }, "Members"),
				_("th", { scope: "col" }, "Status"),
				_("th", { scope: "col" }, "Media"),
				_("th", {
					scope: "col",
					class: "admin-syncplay__actions-col"
				}, "Actions")
			])], -1), _("tbody", null, [(x(!0), g(f, null, C(L.value, (e) => (x(), g("tr", { key: e.id }, [
				_("td", null, [_("span", ie, w(e.name), 1), e.has_password ? (x(), m(i, {
					key: 0,
					tone: "warning"
				}, {
					default: D(() => [...t[11] ||= [v("Password", -1)]]),
					_: 1
				})) : h("", !0)]),
				_("td", null, w(de(e.member_count)), 1),
				_("td", null, [y(i, { tone: e.is_playing ? "accent" : "neutral" }, {
					default: D(() => [v(w(e.is_playing ? "Playing" : "Idle"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				_("td", ae, w(e.current_media ?? "—"), 1),
				_("td", null, [y(o, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Join ${e.name}`,
					onClick: (t) => ue(e.id)
				}, {
					default: D(() => [...t[12] ||= [v(" Join ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))])])),
			y(s, {
				modelValue: V.value,
				"onUpdate:modelValue": t[2] ||= (e) => V.value = e,
				title: "Create SyncPlay group",
				onClose: K
			}, {
				footer: D(() => [y(o, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: D(() => [...t[16] ||= [v("Cancel", -1)]]),
					_: 1
				}), y(o, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: q
				}, {
					default: D(() => [...t[17] ||= [v(" Create group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: D(() => [_("form", {
					class: "admin-syncplay__form",
					onSubmit: k(q, ["prevent"])
				}, [_("label", oe, [t[14] ||= _("span", { class: "admin-syncplay__label" }, "Group name", -1), O(_("input", {
					"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "Movie Night",
					required: ""
				}, null, 512), [[E, H.value]])]), _("label", se, [t[15] ||= _("span", { class: "admin-syncplay__label" }, "Password (optional)", -1), O(_("input", {
					"onUpdate:modelValue": t[1] ||= (e) => U.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					"data-lpignore": "true",
					"data-1p-ignore": "",
					"data-bwignore": "",
					"data-form-type": "other",
					placeholder: "Leave empty for an open group"
				}, null, 512), [[E, U.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			y(s, {
				modelValue: J.value,
				"onUpdate:modelValue": t[5] ||= (e) => J.value = e,
				title: "Join SyncPlay group",
				onClose: Q
			}, {
				footer: D(() => [y(o, {
					variant: "ghost",
					size: "sm",
					onClick: Q
				}, {
					default: D(() => [...t[20] ||= [v("Cancel", -1)]]),
					_: 1
				}), y(o, {
					variant: "solid",
					size: "sm",
					loading: Z.value,
					onClick: $
				}, {
					default: D(() => [...t[21] ||= [v(" Join group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: D(() => [_("form", {
					class: "admin-syncplay__form",
					onSubmit: k($, ["prevent"])
				}, [_("label", ce, [t[18] ||= _("span", { class: "admin-syncplay__label" }, "Group ID", -1), O(_("input", {
					"onUpdate:modelValue": t[3] ||= (e) => Y.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "sp_abc123def456",
					required: ""
				}, null, 512), [[E, Y.value]])]), _("label", le, [t[19] ||= _("span", { class: "admin-syncplay__label" }, "Password (if required)", -1), O(_("input", {
					"onUpdate:modelValue": t[4] ||= (e) => X.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					"data-lpignore": "true",
					"data-1p-ignore": "",
					"data-bwignore": "",
					"data-form-type": "other",
					placeholder: "Leave empty if no password"
				}, null, 512), [[E, X.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-86d11fb7"]]);
export { N as default };

//# sourceMappingURL=SyncPlayPage-D-dVXK2c.js.map