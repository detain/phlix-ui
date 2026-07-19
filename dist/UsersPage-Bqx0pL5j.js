import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-DDyf853T.js";
import { c as n, f as r, t as ee } from "./client-D80As4Gx.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-AW4z0vv0.js";
import { t as a } from "./Badge-BxQOsARS.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { t as re } from "./Select-z1uAMOUb.js";
import { t as ie } from "./Skeleton-DhQmxeNg.js";
import { t as ae } from "./EmptyState-CLDEIm6E.js";
import { t as oe } from "./PageHint-0P_Y-_RL.js";
import { i as se, n as ce, t as le } from "./users-BXVPIIch.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as ue, inject as de, onMounted as fe, openBlock as m, ref as h, renderList as g, toDisplayString as _, vModelText as v, withCtx as y, withDirectives as b, withModifiers as x } from "vue";
//#region src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
var pe = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, me = { class: "admin-users__head" }, he = {
	key: 0,
	class: "admin-users__skel"
}, ge = {
	key: 0,
	class: "admin-users__pending",
	"aria-labelledby": "pending-heading"
}, _e = {
	id: "pending-heading",
	class: "admin-users__pending-title"
}, ve = {
	class: "admin-users__table",
	"aria-label": "Pending users"
}, ye = { class: "admin-users__date" }, be = { class: "admin-users__actions" }, xe = {
	class: "admin-users__table",
	"aria-label": "Users"
}, Se = { class: "admin-users__date" }, Ce = { class: "admin-users__actions" }, we = { class: "admin-users__field" }, Te = { class: "admin-users__field" }, Ee = { class: "admin-users__field" }, De = { class: "admin-users__label" }, Oe = ["placeholder", "required"], ke = { key: 0 }, Ae = { class: "admin-users__field" }, je = { class: "admin-users__password-row" }, Me = ["value"], Ne = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, Pe = {
	key: 0,
	class: "admin-users__skel"
}, Fe = { class: "admin-users__profiles-toolbar" }, Ie = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, Le = { class: "admin-users__actions" }, Re = {
	key: 2,
	class: "admin-users__subform"
}, ze = { class: "admin-users__subform-title" }, Be = { class: "admin-users__field" }, Ve = { class: "admin-users__field" }, He = { class: "admin-users__subform-actions" }, Ue = {
	key: 3,
	class: "admin-users__subform"
}, We = { class: "admin-users__subform-actions" }, Ge = {
	key: 4,
	class: "admin-users__subform"
}, Ke = { class: "admin-users__subform-title" }, qe = { class: "admin-users__field" }, Je = { class: "admin-users__subform-actions" }, Ye = 5, S = /*#__PURE__*/ e(/* @__PURE__ */ ue({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let ue = e, S = de("apiBase", ""), Xe = s(() => typeof S == "string" ? S : S?.value ?? ""), C = new le(ue.client ?? new ee({
			baseUrl: Xe.value,
			tokenStore: new n()
		})), w = te(), Ze = s(() => se.map((e) => ({
			value: e.value,
			label: e.label
		}))), T = h([]), E = h(!0), D = h(null);
		async function O() {
			E.value = !0, D.value = null;
			try {
				T.value = await C.list();
			} catch (e) {
				D.value = r(e, "Failed to load users."), w.error(D.value);
			} finally {
				E.value = !1;
			}
		}
		function k(e) {
			return e.status ?? "active";
		}
		let Qe = s(() => T.value.filter((e) => k(e) === "pending")), $e = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, et = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function tt(e) {
			return $e[k(e)];
		}
		function nt(e) {
			return et[k(e)];
		}
		async function rt(e) {
			try {
				await C.approve(e.id), w.success(`${e.username} approved.`), await O();
			} catch (e) {
				w.error(r(e, "Failed to approve user."));
			}
		}
		let A = h(null);
		async function it() {
			let e = A.value;
			if (e) try {
				await C.disable(e.id), w.success(`${e.username} disabled.`), A.value = null, await O();
			} catch (e) {
				w.error(r(e, "Failed to disable user.")), A.value = null;
			}
		}
		let j = h(null);
		async function at() {
			let e = j.value;
			if (e) try {
				await C.reject(e.id), w.success(`${e.username}'s signup rejected.`), j.value = null, await O();
			} catch (e) {
				w.error(r(e, "Failed to reject user.")), j.value = null;
			}
		}
		let M = h(!1), N = h(null), P = h(""), F = h(""), I = h(""), L = h(!1), R = h(!1), ot = s(() => N.value ? `Edit user — ${N.value.username}` : "Add user");
		function st() {
			N.value = null, P.value = "", F.value = "", I.value = "", L.value = !1, M.value = !0;
		}
		function ct(e) {
			N.value = e, P.value = e.username, F.value = e.email, I.value = "", L.value = e.is_admin, M.value = !0;
		}
		function lt() {
			M.value = !1, N.value = null;
		}
		async function ut() {
			if (!P.value.trim() || !F.value.trim()) {
				w.error("Username and email are required.");
				return;
			}
			let e = N.value;
			if (!e && !I.value) {
				w.error("Password is required for new users.");
				return;
			}
			if (!e && I.value.length < 8) {
				w.error("Password must be at least 8 characters.");
				return;
			}
			R.value = !0;
			try {
				if (e) {
					let t = {
						username: P.value,
						email: F.value
					};
					I.value && (t.password = I.value), await C.update(e.id, t), e.is_admin !== L.value && await C.setAdmin(e.id, L.value), w.success("User updated.");
				} else {
					let e = {
						username: P.value,
						email: F.value,
						password: I.value,
						is_admin: L.value
					};
					await C.create(e), w.success("User created.");
				}
				lt(), await O();
			} catch (e) {
				w.error(r(e, "Failed to save user."));
			} finally {
				R.value = !1;
			}
		}
		let z = h(null);
		async function dt() {
			let e = z.value;
			if (e) try {
				await C.remove(e.id), w.success("User deleted."), z.value = null, await O();
			} catch (e) {
				w.error(r(e, "Failed to delete user.")), z.value = null;
			}
		}
		async function ft(e, t) {
			try {
				await C.setAdmin(e.id, t), w.success(t ? "User promoted to admin." : "Admin status removed."), await O();
			} catch (e) {
				w.error(r(e, "Failed to update admin status."));
			}
		}
		let B = h(null), V = h(null);
		async function pt(e) {
			B.value = e, V.value = null;
			try {
				V.value = await C.resetPassword(e.id);
			} catch (e) {
				w.error(r(e, "Failed to reset password.")), B.value = null;
			}
		}
		function mt() {
			B.value = null, V.value = null;
		}
		async function ht() {
			let e = V.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), w.success("Password copied to clipboard.");
			} catch {
				w.error("Could not copy to clipboard.");
			}
		}
		let H = h(null), U = h([]), W = h(!1), gt = s(() => H.value ? `Profiles — ${H.value.username}` : "Profiles"), _t = s({
			get: () => H.value !== null,
			set: (e) => {
				e || yt();
			}
		}), G = s(() => U.value.length >= Ye);
		async function K(e) {
			W.value = !0;
			try {
				U.value = await C.listProfiles(e);
			} catch (e) {
				w.error(r(e, "Failed to load profiles."));
			} finally {
				W.value = !1;
			}
		}
		async function vt(e) {
			H.value = e, await K(e.id);
		}
		function yt() {
			H.value = null, U.value = [], Ct(), Z.value = null, Ot();
		}
		let q = h(!1), J = h(null), Y = h(""), X = h(0), bt = h(!1);
		function xt() {
			J.value = null, Y.value = "", X.value = 0, q.value = !0;
		}
		function St(e) {
			J.value = e, Y.value = e.name, X.value = e.rating, q.value = !0;
		}
		function Ct() {
			q.value = !1, J.value = null, Y.value = "", X.value = 0;
		}
		async function wt() {
			let e = H.value;
			if (e) {
				if (!Y.value.trim()) {
					w.error("Profile name is required.");
					return;
				}
				bt.value = !0;
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
					Ct(), await K(e.id);
				} catch (e) {
					w.error(r(e, "Failed to save profile."));
				} finally {
					bt.value = !1;
				}
			}
		}
		let Z = h(null);
		async function Tt() {
			let e = H.value, t = Z.value;
			if (!(!e || !t)) try {
				await C.removeProfile(t.id), w.success("Profile deleted."), Z.value = null, await K(e.id);
			} catch (e) {
				w.error(r(e, "Failed to delete profile.")), Z.value = null;
			}
		}
		let Q = h(null), $ = h(""), Et = h(!1);
		function Dt(e) {
			Q.value = e, $.value = "";
		}
		function Ot() {
			Q.value = null, $.value = "";
		}
		async function kt() {
			let e = H.value, t = Q.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test($.value) && !/^\d{6}$/.test($.value)) {
					w.error("PIN must be 4 or 6 digits.");
					return;
				}
				Et.value = !0;
				try {
					await C.setPin(t.id, $.value), w.success("PIN set."), Ot(), await K(e.id);
				} catch (e) {
					w.error(r(e, "Failed to set PIN."));
				} finally {
					Et.value = !1;
				}
			}
		}
		async function At(e) {
			let t = H.value;
			if (t) try {
				await C.clearPin(e.id), w.success("PIN cleared."), await K(t.id);
			} catch (e) {
				w.error(r(e, "Failed to clear PIN."));
			}
		}
		function jt(e) {
			return ce[e] ?? ce[12];
		}
		return fe(O), (e, n) => (m(), u("section", pe, [
			d("header", me, [n[17] ||= d("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), p(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: st
			}, {
				default: y(() => [...n[16] ||= [f("Add user", -1)]]),
				_: 1
			})]),
			p(oe, null, {
				default: y(() => [...n[18] ||= [
					f(" Manage everyone who can sign in. ", -1),
					d("strong", null, "Add user", -1),
					f(" creates an account; ", -1),
					d("strong", null, "Edit", -1),
					f(" changes a name, email, or password. ", -1),
					d("strong", null, "Approve", -1),
					f(" / ", -1),
					d("strong", null, "Reject", -1),
					f(" handle pending sign-up requests, and ", -1),
					d("strong", null, "Disable", -1),
					f(" / ", -1),
					d("strong", null, "Enable", -1),
					f(" block or restore access. ", -1),
					d("strong", null, "Set Admin", -1),
					f(" / ", -1),
					d("strong", null, "Demote", -1),
					f(" toggles admin rights, ", -1),
					d("strong", null, "Reset Password", -1),
					f(" issues a new one, and ", -1),
					d("strong", null, "Profiles", -1),
					f(" manages a user's watch profiles and their optional PINs. ", -1)
				]]),
				_: 1
			}),
			E.value ? (m(), u("div", he, [p(ie, {
				variant: "text",
				lines: 6
			})])) : D.value ? (m(), c(ae, {
				key: 1,
				icon: "alert",
				title: "Couldn't load users",
				description: D.value
			}, {
				actions: y(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: O
				}, {
					default: y(() => [...n[19] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value.length === 0 ? (m(), c(ae, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: y(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: st
				}, {
					default: y(() => [...n[20] ||= [f("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (m(), u(o, { key: 3 }, [Qe.value.length > 0 ? (m(), u("section", ge, [d("h2", _e, [n[21] ||= f(" Pending approval ", -1), p(a, { tone: "warning" }, {
				default: y(() => [f(_(Qe.value.length), 1)]),
				_: 1
			})]), d("table", ve, [n[24] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Requested"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(o, null, g(Qe.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, _(e.username), 1),
				d("td", null, _(e.email), 1),
				d("td", ye, _(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", be, [p(i, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => rt(e)
				}, {
					default: y(() => [...n[22] ||= [f(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), p(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => j.value = e
				}, {
					default: y(() => [...n[23] ||= [f(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : l("", !0), d("table", xe, [n[33] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Role"),
				d("th", { scope: "col" }, "Status"),
				d("th", { scope: "col" }, "Created"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(o, null, g(T.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, _(e.username), 1),
				d("td", null, _(e.email), 1),
				d("td", null, [p(a, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: y(() => [f(_(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", null, [p(a, { tone: nt(e) }, {
					default: y(() => [f(_(tt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", Se, _(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", Ce, [
					k(e) === "pending" ? (m(), c(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => rt(e)
					}, {
						default: y(() => [...n[25] ||= [f(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : k(e) === "disabled" ? (m(), c(i, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => rt(e)
					}, {
						default: y(() => [...n[26] ||= [f(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (m(), c(i, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => A.value = e
					}, {
						default: y(() => [...n[27] ||= [f(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					k(e) === "pending" ? (m(), c(i, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => j.value = e
					}, {
						default: y(() => [...n[28] ||= [f(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : l("", !0),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => ct(e)
					}, {
						default: y(() => [...n[29] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => ft(e, !e.is_admin)
					}, {
						default: y(() => [f(_(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => pt(e)
					}, {
						default: y(() => [...n[30] ||= [f(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => vt(e)
					}, {
						default: y(() => [...n[31] ||= [f(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => z.value = e
					}, {
						default: y(() => [...n[32] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			p(t, {
				modelValue: M.value,
				"onUpdate:modelValue": n[4] ||= (e) => M.value = e,
				title: ot.value,
				onClose: lt
			}, {
				footer: y(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: lt
				}, {
					default: y(() => [...n[36] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: ut
				}, {
					default: y(() => [f(_(N.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [d("form", {
					class: "admin-users__form",
					onSubmit: x(ut, ["prevent"])
				}, [
					d("label", we, [n[34] ||= d("span", { class: "admin-users__label" }, "Username", -1), b(d("input", {
						"onUpdate:modelValue": n[0] ||= (e) => P.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, P.value]])]),
					d("label", Te, [n[35] ||= d("span", { class: "admin-users__label" }, "Email", -1), b(d("input", {
						"onUpdate:modelValue": n[1] ||= (e) => F.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, F.value]])]),
					d("label", Ee, [d("span", De, _(N.value ? "Password (leave blank to keep current)" : "Password"), 1), b(d("input", {
						"onUpdate:modelValue": n[2] ||= (e) => I.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: N.value ? "(unchanged)" : void 0,
						required: !N.value
					}, null, 8, Oe), [[v, I.value]])]),
					p(ne, {
						modelValue: L.value,
						"onUpdate:modelValue": n[3] ||= (e) => L.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(t, {
				"model-value": z.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => z.value = null
			}, {
				footer: y(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => z.value = null
				}, {
					default: y(() => [...n[39] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: dt
				}, {
					default: y(() => [...n[40] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: y(() => [d("p", null, [
					n[37] ||= f(" Delete user ", -1),
					d("strong", null, _(z.value?.username), 1),
					n[38] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(t, {
				"model-value": A.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": n[8] ||= (e) => A.value = null
			}, {
				footer: y(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[7] ||= (e) => A.value = null
				}, {
					default: y(() => [...n[43] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: it
				}, {
					default: y(() => [...n[44] ||= [f("Disable", -1)]]),
					_: 1
				})]),
				default: y(() => [d("p", null, [
					n[41] ||= f(" Disable ", -1),
					d("strong", null, _(A.value?.username), 1),
					n[42] ||= f("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(t, {
				"model-value": j.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": n[10] ||= (e) => j.value = null
			}, {
				footer: y(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[9] ||= (e) => j.value = null
				}, {
					default: y(() => [...n[47] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: at
				}, {
					default: y(() => [...n[48] ||= [f("Reject", -1)]]),
					_: 1
				})]),
				default: y(() => [d("p", null, [
					n[45] ||= f(" Reject ", -1),
					d("strong", null, _(j.value?.username), 1),
					n[46] ||= f("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(t, {
				"model-value": B.value !== null,
				title: B.value ? `Reset password — ${B.value.username}` : "Reset password",
				"onUpdate:modelValue": mt
			}, {
				footer: y(() => [p(i, {
					variant: "solid",
					size: "sm",
					onClick: mt
				}, {
					default: y(() => [...n[53] ||= [f("Close", -1)]]),
					_: 1
				})]),
				default: y(() => [V.value ? (m(), u("div", ke, [d("p", null, _(V.value.message), 1), d("label", Ae, [n[50] ||= d("span", { class: "admin-users__label" }, "New password", -1), d("div", je, [d("input", {
					value: V.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Me), p(i, {
					variant: "outline",
					size: "sm",
					onClick: ht
				}, {
					default: y(() => [...n[49] ||= [f("Copy", -1)]]),
					_: 1
				})])])])) : (m(), u("p", Ne, [
					n[51] ||= f(" Resetting password for ", -1),
					d("strong", null, _(B.value?.username), 1),
					n[52] ||= f("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			p(t, {
				modelValue: _t.value,
				"onUpdate:modelValue": n[15] ||= (e) => _t.value = e,
				title: gt.value,
				size: "lg"
			}, {
				default: y(() => [W.value ? (m(), u("div", Pe, [p(ie, {
					variant: "text",
					lines: 4
				})])) : (m(), u(o, { key: 1 }, [
					d("div", Fe, [p(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: G.value,
						"aria-label": "Add profile",
						onClick: xt
					}, {
						default: y(() => [f(" Add profile" + _(G.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					U.value.length === 0 ? (m(), c(ae, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (m(), u("table", Ie, [n[58] ||= d("thead", null, [d("tr", null, [
						d("th", { scope: "col" }, "Name"),
						d("th", { scope: "col" }, "Rating"),
						d("th", { scope: "col" }, "PIN"),
						d("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), d("tbody", null, [(m(!0), u(o, null, g(U.value, (e) => (m(), u("tr", { key: e.id }, [
						d("td", null, _(e.name), 1),
						d("td", null, [p(a, { tone: "info" }, {
							default: y(() => [f(_(jt(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						d("td", null, [p(a, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: y(() => [f(_(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						d("td", null, [d("div", Le, [
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => St(e)
							}, {
								default: y(() => [...n[54] ||= [f(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Dt(e)
							}, {
								default: y(() => [...n[55] ||= [f(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? l("", !0) : (m(), c(i, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => At(e)
							}, {
								default: y(() => [...n[56] ||= [f(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => Z.value = e
							}, {
								default: y(() => [...n[57] ||= [f(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					q.value ? (m(), u("div", Re, [d("h3", ze, _(J.value ? "Edit profile" : "Add profile"), 1), d("form", {
						class: "admin-users__form",
						onSubmit: x(wt, ["prevent"])
					}, [
						d("label", Be, [n[59] ||= d("span", { class: "admin-users__label" }, "Name", -1), b(d("input", {
							"onUpdate:modelValue": n[11] ||= (e) => Y.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[v, Y.value]])]),
						d("label", Ve, [n[60] ||= d("span", { class: "admin-users__label" }, "Rating", -1), p(re, {
							"model-value": X.value,
							options: Ze.value,
							label: "Rating",
							"onUpdate:modelValue": n[12] ||= (e) => X.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						d("div", He, [p(i, {
							variant: "ghost",
							size: "sm",
							onClick: Ct
						}, {
							default: y(() => [...n[61] ||= [f("Cancel", -1)]]),
							_: 1
						}), p(i, {
							variant: "solid",
							size: "sm",
							loading: bt.value,
							onClick: wt
						}, {
							default: y(() => [f(_(J.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : l("", !0),
					Z.value ? (m(), u("div", Ue, [d("p", null, [
						n[62] ||= f(" Delete profile ", -1),
						d("strong", null, _(Z.value.name), 1),
						n[63] ||= f("? This cannot be undone. ", -1)
					]), d("div", We, [p(i, {
						variant: "ghost",
						size: "sm",
						onClick: n[13] ||= (e) => Z.value = null
					}, {
						default: y(() => [...n[64] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(i, {
						variant: "solid",
						size: "sm",
						onClick: Tt
					}, {
						default: y(() => [...n[65] ||= [f("Delete", -1)]]),
						_: 1
					})])])) : l("", !0),
					Q.value ? (m(), u("div", Ge, [d("h3", Ke, "Set PIN — " + _(Q.value.name), 1), d("form", {
						class: "admin-users__form",
						onSubmit: x(kt, ["prevent"])
					}, [d("label", qe, [n[66] ||= d("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), b(d("input", {
						"onUpdate:modelValue": n[14] ||= (e) => $.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[v, $.value]])]), d("div", Je, [p(i, {
						variant: "ghost",
						size: "sm",
						onClick: Ot
					}, {
						default: y(() => [...n[67] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(i, {
						variant: "solid",
						size: "sm",
						loading: Et.value,
						onClick: kt
					}, {
						default: y(() => [...n[68] ||= [f("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : l("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-9116a20c"]]);
//#endregion
export { S as default };

//# sourceMappingURL=UsersPage-Bqx0pL5j.js.map