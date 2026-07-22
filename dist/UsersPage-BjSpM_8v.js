import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as ee } from "./client-BzWwyWKr.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-DWa6Ld_Z.js";
import { t as i } from "./Badge-B6MgOwKQ.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { t as re } from "./Select-Cvp-73pF.js";
import { t as a } from "./Modal-aFganlu3.js";
import { t as ie } from "./Skeleton-DhQmxeNg.js";
import { t as o } from "./EmptyState-ZlI5t4KT.js";
import { t as ae } from "./PageHint-BoAlFFBN.js";
import { i as oe, n as se, t as ce } from "./users-CIe34Ixs.js";
import { t as le } from "./helpLinks-BI4oN4Or.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as ue, inject as de, onMounted as fe, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as pe, vModelText as y, withCtx as b, withDirectives as x, withModifiers as me } from "vue";
//#region src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
var he = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, ge = { class: "admin-users__head" }, _e = {
	key: 0,
	class: "admin-users__skel"
}, ve = {
	key: 0,
	class: "admin-users__pending",
	"aria-labelledby": "pending-heading"
}, ye = {
	id: "pending-heading",
	class: "admin-users__pending-title"
}, be = {
	class: "admin-users__table",
	"aria-label": "Pending users"
}, xe = { class: "admin-users__date" }, Se = { class: "admin-users__actions" }, Ce = {
	class: "admin-users__table",
	"aria-label": "Users"
}, we = { class: "admin-users__date" }, Te = { class: "admin-users__actions" }, Ee = { class: "admin-users__field" }, De = { class: "admin-users__field" }, Oe = { class: "admin-users__field" }, ke = { class: "admin-users__label" }, Ae = ["placeholder", "required"], je = { key: 0 }, Me = { class: "admin-users__field" }, Ne = { class: "admin-users__password-row" }, Pe = ["value"], Fe = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, Ie = {
	key: 0,
	class: "admin-users__skel"
}, Le = { class: "admin-users__profiles-toolbar" }, Re = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, ze = { class: "admin-users__actions" }, Be = {
	key: 2,
	class: "admin-users__subform"
}, Ve = { class: "admin-users__subform-title" }, He = { class: "admin-users__field" }, Ue = { class: "admin-users__field" }, We = { class: "admin-users__subform-actions" }, Ge = {
	key: 3,
	class: "admin-users__subform"
}, Ke = { class: "admin-users__subform-actions" }, qe = {
	key: 4,
	class: "admin-users__subform"
}, Je = { class: "admin-users__subform-title" }, Ye = { class: "admin-users__field" }, Xe = { class: "admin-users__subform-actions" }, Ze = 5, S = /*#__PURE__*/ e(/* @__PURE__ */ ue({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let ue = e, S = de("apiBase", ""), Qe = c(() => typeof S == "string" ? S : S?.value ?? ""), C = new ce(ue.client ?? new ee({
			baseUrl: Qe.value,
			tokenStore: new t()
		})), w = te(), $e = c(() => oe.map((e) => ({
			value: e.value,
			label: e.label
		}))), T = g([]), E = g(!0), D = g(null);
		async function O() {
			E.value = !0, D.value = null;
			try {
				T.value = await C.list();
			} catch (e) {
				D.value = n(e, "Failed to load users."), w.error(D.value);
			} finally {
				E.value = !1;
			}
		}
		function k(e) {
			return e.status ?? "active";
		}
		let A = c(() => T.value.filter((e) => k(e) === "pending")), et = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, tt = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function nt(e) {
			return et[k(e)];
		}
		function rt(e) {
			return tt[k(e)];
		}
		async function j(e) {
			try {
				await C.approve(e.id), w.success(`${e.username} approved.`), await O();
			} catch (e) {
				w.error(n(e, "Failed to approve user."));
			}
		}
		let M = g(null);
		async function it() {
			let e = M.value;
			if (e) try {
				await C.disable(e.id), w.success(`${e.username} disabled.`), M.value = null, await O();
			} catch (e) {
				w.error(n(e, "Failed to disable user.")), M.value = null;
			}
		}
		let N = g(null);
		async function at() {
			let e = N.value;
			if (e) try {
				await C.reject(e.id), w.success(`${e.username}'s signup rejected.`), N.value = null, await O();
			} catch (e) {
				w.error(n(e, "Failed to reject user.")), N.value = null;
			}
		}
		let P = g(!1), F = g(null), I = g(""), L = g(""), R = g(""), z = g(!1), ot = g(!1), st = c(() => F.value ? `Edit user — ${F.value.username}` : "Add user");
		function ct() {
			F.value = null, I.value = "", L.value = "", R.value = "", z.value = !1, P.value = !0;
		}
		function lt(e) {
			F.value = e, I.value = e.username, L.value = e.email, R.value = "", z.value = e.is_admin, P.value = !0;
		}
		function ut() {
			P.value = !1, F.value = null;
		}
		async function dt() {
			if (!I.value.trim() || !L.value.trim()) {
				w.error("Username and email are required.");
				return;
			}
			let e = F.value;
			if (!e && !R.value) {
				w.error("Password is required for new users.");
				return;
			}
			if (!e && R.value.length < 8) {
				w.error("Password must be at least 8 characters.");
				return;
			}
			ot.value = !0;
			try {
				if (e) {
					let t = {
						username: I.value,
						email: L.value
					};
					R.value && (t.password = R.value), await C.update(e.id, t), e.is_admin !== z.value && await C.setAdmin(e.id, z.value), w.success("User updated.");
				} else {
					let e = {
						username: I.value,
						email: L.value,
						password: R.value,
						is_admin: z.value
					};
					await C.create(e), w.success("User created.");
				}
				ut(), await O();
			} catch (e) {
				w.error(n(e, "Failed to save user."));
			} finally {
				ot.value = !1;
			}
		}
		let B = g(null);
		async function ft() {
			let e = B.value;
			if (e) try {
				await C.remove(e.id), w.success("User deleted."), B.value = null, await O();
			} catch (e) {
				w.error(n(e, "Failed to delete user.")), B.value = null;
			}
		}
		async function pt(e, t) {
			try {
				await C.setAdmin(e.id, t), w.success(t ? "User promoted to admin." : "Admin status removed."), await O();
			} catch (e) {
				w.error(n(e, "Failed to update admin status."));
			}
		}
		let V = g(null), H = g(null);
		async function mt(e) {
			V.value = e, H.value = null;
			try {
				H.value = await C.resetPassword(e.id);
			} catch (e) {
				w.error(n(e, "Failed to reset password.")), V.value = null;
			}
		}
		function ht() {
			V.value = null, H.value = null;
		}
		async function gt() {
			let e = H.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), w.success("Password copied to clipboard.");
			} catch {
				w.error("Could not copy to clipboard.");
			}
		}
		let U = g(null), W = g([]), _t = g(!1), vt = c(() => U.value ? `Profiles — ${U.value.username}` : "Profiles"), yt = c({
			get: () => U.value !== null,
			set: (e) => {
				e || xt();
			}
		}), G = c(() => W.value.length >= Ze);
		async function K(e) {
			_t.value = !0;
			try {
				W.value = await C.listProfiles(e);
			} catch (e) {
				w.error(n(e, "Failed to load profiles."));
			} finally {
				_t.value = !1;
			}
		}
		async function bt(e) {
			U.value = e, await K(e.id);
		}
		function xt() {
			U.value = null, W.value = [], Tt(), Z.value = null, At();
		}
		let q = g(!1), J = g(null), Y = g(""), X = g(0), St = g(!1);
		function Ct() {
			J.value = null, Y.value = "", X.value = 0, q.value = !0;
		}
		function wt(e) {
			J.value = e, Y.value = e.name, X.value = e.rating, q.value = !0;
		}
		function Tt() {
			q.value = !1, J.value = null, Y.value = "", X.value = 0;
		}
		async function Et() {
			let e = U.value;
			if (e) {
				if (!Y.value.trim()) {
					w.error("Profile name is required.");
					return;
				}
				St.value = !0;
				try {
					if (J.value) {
						let e = {
							name: Y.value,
							rating: X.value
						};
						await C.updateProfile(J.value.id, e), w.success("Profile updated.");
					} else {
						if (G.value) {
							w.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: Y.value,
							rating: X.value
						};
						await C.createProfile(e.id, t), w.success("Profile created.");
					}
					Tt(), await K(e.id);
				} catch (e) {
					w.error(n(e, "Failed to save profile."));
				} finally {
					St.value = !1;
				}
			}
		}
		let Z = g(null);
		async function Dt() {
			let e = U.value, t = Z.value;
			if (!(!e || !t)) try {
				await C.removeProfile(t.id), w.success("Profile deleted."), Z.value = null, await K(e.id);
			} catch (e) {
				w.error(n(e, "Failed to delete profile.")), Z.value = null;
			}
		}
		let Q = g(null), $ = g(""), Ot = g(!1);
		function kt(e) {
			Q.value = e, $.value = "";
		}
		function At() {
			Q.value = null, $.value = "";
		}
		async function jt() {
			let e = U.value, t = Q.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test($.value) && !/^\d{6}$/.test($.value)) {
					w.error("PIN must be 4 or 6 digits.");
					return;
				}
				Ot.value = !0;
				try {
					await C.setPin(t.id, $.value), w.success("PIN set."), At(), await K(e.id);
				} catch (e) {
					w.error(n(e, "Failed to set PIN."));
				} finally {
					Ot.value = !1;
				}
			}
		}
		async function Mt(e) {
			let t = U.value;
			if (t) try {
				await C.clearPin(e.id), w.success("PIN cleared."), await K(t.id);
			} catch (e) {
				w.error(n(e, "Failed to clear PIN."));
			}
		}
		function Nt(e) {
			return se[e] ?? se[12];
		}
		return fe(O), (e, t) => (h(), d("section", he, [
			f("header", ge, [t[17] ||= f("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: ct
			}, {
				default: b(() => [...t[16] ||= [p("Add user", -1)]]),
				_: 1
			})]),
			m(ae, {
				links: pe(le).users.links,
				details: pe(le).users.details
			}, {
				default: b(() => [...t[18] ||= [
					p(" Manage everyone who can sign in. ", -1),
					f("strong", null, "Add user", -1),
					p(" creates an account; ", -1),
					f("strong", null, "Edit", -1),
					p(" changes a name, email, or password. ", -1),
					f("strong", null, "Approve", -1),
					p(" / ", -1),
					f("strong", null, "Reject", -1),
					p(" handle pending sign-up requests, and ", -1),
					f("strong", null, "Disable", -1),
					p(" / ", -1),
					f("strong", null, "Enable", -1),
					p(" block or restore access. ", -1),
					f("strong", null, "Set Admin", -1),
					p(" / ", -1),
					f("strong", null, "Demote", -1),
					p(" toggles admin rights, ", -1),
					f("strong", null, "Reset Password", -1),
					p(" issues a new one, and ", -1),
					f("strong", null, "Profiles", -1),
					p(" manages a user's watch profiles and their optional PINs. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			E.value ? (h(), d("div", _e, [m(ie, {
				variant: "text",
				lines: 6
			})])) : D.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load users",
				description: D.value
			}, {
				actions: b(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: O
				}, {
					default: b(() => [...t[19] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value.length === 0 ? (h(), l(o, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: b(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: ct
				}, {
					default: b(() => [...t[20] ||= [p("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d(s, { key: 3 }, [A.value.length > 0 ? (h(), d("section", ve, [f("h2", ye, [t[21] ||= p(" Pending approval ", -1), m(i, { tone: "warning" }, {
				default: b(() => [p(v(A.value.length), 1)]),
				_: 1
			})]), f("table", be, [t[24] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Requested"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, _(A.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, v(e.username), 1),
				f("td", null, v(e.email), 1),
				f("td", xe, v(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", Se, [m(r, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => j(e)
				}, {
					default: b(() => [...t[22] ||= [p(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), m(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => N.value = e
				}, {
					default: b(() => [...t[23] ||= [p(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : u("", !0), f("table", Ce, [t[33] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Role"),
				f("th", { scope: "col" }, "Status"),
				f("th", { scope: "col" }, "Created"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, _(T.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, v(e.username), 1),
				f("td", null, v(e.email), 1),
				f("td", null, [m(i, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: b(() => [p(v(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", null, [m(i, { tone: rt(e) }, {
					default: b(() => [p(v(nt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", we, v(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", Te, [
					k(e) === "pending" ? (h(), l(r, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => j(e)
					}, {
						default: b(() => [...t[25] ||= [p(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : k(e) === "disabled" ? (h(), l(r, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => j(e)
					}, {
						default: b(() => [...t[26] ||= [p(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (h(), l(r, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => M.value = e
					}, {
						default: b(() => [...t[27] ||= [p(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					k(e) === "pending" ? (h(), l(r, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => N.value = e
					}, {
						default: b(() => [...t[28] ||= [p(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : u("", !0),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => lt(e)
					}, {
						default: b(() => [...t[29] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => pt(e, !e.is_admin)
					}, {
						default: b(() => [p(v(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => mt(e)
					}, {
						default: b(() => [...t[30] ||= [p(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => bt(e)
					}, {
						default: b(() => [...t[31] ||= [p(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => B.value = e
					}, {
						default: b(() => [...t[32] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			m(a, {
				modelValue: P.value,
				"onUpdate:modelValue": t[4] ||= (e) => P.value = e,
				title: st.value,
				onClose: ut
			}, {
				footer: b(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: ut
				}, {
					default: b(() => [...t[36] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: ot.value,
					onClick: dt
				}, {
					default: b(() => [p(v(F.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [f("form", {
					class: "admin-users__form",
					onSubmit: me(dt, ["prevent"])
				}, [
					f("label", Ee, [t[34] ||= f("span", { class: "admin-users__label" }, "Username", -1), x(f("input", {
						"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, I.value]])]),
					f("label", De, [t[35] ||= f("span", { class: "admin-users__label" }, "Email", -1), x(f("input", {
						"onUpdate:modelValue": t[1] ||= (e) => L.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, L.value]])]),
					f("label", Oe, [f("span", ke, v(F.value ? "Password (leave blank to keep current)" : "Password"), 1), x(f("input", {
						"onUpdate:modelValue": t[2] ||= (e) => R.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: F.value ? "(unchanged)" : void 0,
						required: !F.value
					}, null, 8, Ae), [[y, R.value]])]),
					m(ne, {
						modelValue: z.value,
						"onUpdate:modelValue": t[3] ||= (e) => z.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(a, {
				"model-value": B.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => B.value = null
			}, {
				footer: b(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => B.value = null
				}, {
					default: b(() => [...t[39] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: ft
				}, {
					default: b(() => [...t[40] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [f("p", null, [
					t[37] ||= p(" Delete user ", -1),
					f("strong", null, v(B.value?.username), 1),
					t[38] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": M.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => M.value = null
			}, {
				footer: b(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => M.value = null
				}, {
					default: b(() => [...t[43] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: it
				}, {
					default: b(() => [...t[44] ||= [p("Disable", -1)]]),
					_: 1
				})]),
				default: b(() => [f("p", null, [
					t[41] ||= p(" Disable ", -1),
					f("strong", null, v(M.value?.username), 1),
					t[42] ||= p("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": N.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": t[10] ||= (e) => N.value = null
			}, {
				footer: b(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[9] ||= (e) => N.value = null
				}, {
					default: b(() => [...t[47] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: at
				}, {
					default: b(() => [...t[48] ||= [p("Reject", -1)]]),
					_: 1
				})]),
				default: b(() => [f("p", null, [
					t[45] ||= p(" Reject ", -1),
					f("strong", null, v(N.value?.username), 1),
					t[46] ||= p("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": V.value !== null,
				title: V.value ? `Reset password — ${V.value.username}` : "Reset password",
				"onUpdate:modelValue": ht
			}, {
				footer: b(() => [m(r, {
					variant: "solid",
					size: "sm",
					onClick: ht
				}, {
					default: b(() => [...t[53] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [H.value ? (h(), d("div", je, [f("p", null, v(H.value.message), 1), f("label", Me, [t[50] ||= f("span", { class: "admin-users__label" }, "New password", -1), f("div", Ne, [f("input", {
					value: H.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Pe), m(r, {
					variant: "outline",
					size: "sm",
					onClick: gt
				}, {
					default: b(() => [...t[49] ||= [p("Copy", -1)]]),
					_: 1
				})])])])) : (h(), d("p", Fe, [
					t[51] ||= p(" Resetting password for ", -1),
					f("strong", null, v(V.value?.username), 1),
					t[52] ||= p("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			m(a, {
				modelValue: yt.value,
				"onUpdate:modelValue": t[15] ||= (e) => yt.value = e,
				title: vt.value,
				size: "lg"
			}, {
				default: b(() => [_t.value ? (h(), d("div", Ie, [m(ie, {
					variant: "text",
					lines: 4
				})])) : (h(), d(s, { key: 1 }, [
					f("div", Le, [m(r, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: G.value,
						"aria-label": "Add profile",
						onClick: Ct
					}, {
						default: b(() => [p(" Add profile" + v(G.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					W.value.length === 0 ? (h(), l(o, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (h(), d("table", Re, [t[58] ||= f("thead", null, [f("tr", null, [
						f("th", { scope: "col" }, "Name"),
						f("th", { scope: "col" }, "Rating"),
						f("th", { scope: "col" }, "PIN"),
						f("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), f("tbody", null, [(h(!0), d(s, null, _(W.value, (e) => (h(), d("tr", { key: e.id }, [
						f("td", null, v(e.name), 1),
						f("td", null, [m(i, { tone: "info" }, {
							default: b(() => [p(v(Nt(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						f("td", null, [m(i, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: b(() => [p(v(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						f("td", null, [f("div", ze, [
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => wt(e)
							}, {
								default: b(() => [...t[54] ||= [p(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => kt(e)
							}, {
								default: b(() => [...t[55] ||= [p(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? u("", !0) : (h(), l(r, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => Mt(e)
							}, {
								default: b(() => [...t[56] ||= [p(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => Z.value = e
							}, {
								default: b(() => [...t[57] ||= [p(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					q.value ? (h(), d("div", Be, [f("h3", Ve, v(J.value ? "Edit profile" : "Add profile"), 1), f("form", {
						class: "admin-users__form",
						onSubmit: me(Et, ["prevent"])
					}, [
						f("label", He, [t[59] ||= f("span", { class: "admin-users__label" }, "Name", -1), x(f("input", {
							"onUpdate:modelValue": t[11] ||= (e) => Y.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[y, Y.value]])]),
						f("label", Ue, [t[60] ||= f("span", { class: "admin-users__label" }, "Rating", -1), m(re, {
							"model-value": X.value,
							options: $e.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => X.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						f("div", We, [m(r, {
							variant: "ghost",
							size: "sm",
							onClick: Tt
						}, {
							default: b(() => [...t[61] ||= [p("Cancel", -1)]]),
							_: 1
						}), m(r, {
							variant: "solid",
							size: "sm",
							loading: St.value,
							onClick: Et
						}, {
							default: b(() => [p(v(J.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : u("", !0),
					Z.value ? (h(), d("div", Ge, [f("p", null, [
						t[62] ||= p(" Delete profile ", -1),
						f("strong", null, v(Z.value.name), 1),
						t[63] ||= p("? This cannot be undone. ", -1)
					]), f("div", Ke, [m(r, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => Z.value = null
					}, {
						default: b(() => [...t[64] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(r, {
						variant: "solid",
						size: "sm",
						onClick: Dt
					}, {
						default: b(() => [...t[65] ||= [p("Delete", -1)]]),
						_: 1
					})])])) : u("", !0),
					Q.value ? (h(), d("div", qe, [f("h3", Je, "Set PIN — " + v(Q.value.name), 1), f("form", {
						class: "admin-users__form",
						onSubmit: me(jt, ["prevent"])
					}, [f("label", Ye, [t[66] ||= f("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), x(f("input", {
						"onUpdate:modelValue": t[14] ||= (e) => $.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[y, $.value]])]), f("div", Xe, [m(r, {
						variant: "ghost",
						size: "sm",
						onClick: At
					}, {
						default: b(() => [...t[67] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(r, {
						variant: "solid",
						size: "sm",
						loading: Ot.value,
						onClick: jt
					}, {
						default: b(() => [...t[68] ||= [p("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : u("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-5d0dd075"]]);
//#endregion
export { S as default };

//# sourceMappingURL=UsersPage-BjSpM_8v.js.map