import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as ee } from "./client-D80As4Gx.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-DWa6Ld_Z.js";
import { t as i } from "./Badge-B6MgOwKQ.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { t as re } from "./Select-B27Qs6LN.js";
import { t as a } from "./Modal-ovdBg3Sx.js";
import { t as ie } from "./Skeleton-DhQmxeNg.js";
import { t as o } from "./EmptyState-ZlI5t4KT.js";
import { t as ae } from "./PageHint-BoAlFFBN.js";
import { i as oe, n as se, t as ce } from "./users-BXVPIIch.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as le, inject as ue, onMounted as de, openBlock as h, ref as g, renderList as _, toDisplayString as v, vModelText as y, withCtx as b, withDirectives as x, withModifiers as S } from "vue";
//#region src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, pe = { class: "admin-users__head" }, me = {
	key: 0,
	class: "admin-users__skel"
}, he = {
	key: 0,
	class: "admin-users__pending",
	"aria-labelledby": "pending-heading"
}, ge = {
	id: "pending-heading",
	class: "admin-users__pending-title"
}, _e = {
	class: "admin-users__table",
	"aria-label": "Pending users"
}, ve = { class: "admin-users__date" }, ye = { class: "admin-users__actions" }, be = {
	class: "admin-users__table",
	"aria-label": "Users"
}, xe = { class: "admin-users__date" }, Se = { class: "admin-users__actions" }, Ce = { class: "admin-users__field" }, we = { class: "admin-users__field" }, Te = { class: "admin-users__field" }, Ee = { class: "admin-users__label" }, De = ["placeholder", "required"], Oe = { key: 0 }, ke = { class: "admin-users__field" }, Ae = { class: "admin-users__password-row" }, je = ["value"], Me = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, Ne = {
	key: 0,
	class: "admin-users__skel"
}, Pe = { class: "admin-users__profiles-toolbar" }, Fe = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, Ie = { class: "admin-users__actions" }, Le = {
	key: 2,
	class: "admin-users__subform"
}, Re = { class: "admin-users__subform-title" }, ze = { class: "admin-users__field" }, Be = { class: "admin-users__field" }, Ve = { class: "admin-users__subform-actions" }, He = {
	key: 3,
	class: "admin-users__subform"
}, Ue = { class: "admin-users__subform-actions" }, We = {
	key: 4,
	class: "admin-users__subform"
}, Ge = { class: "admin-users__subform-title" }, Ke = { class: "admin-users__field" }, qe = { class: "admin-users__subform-actions" }, Je = 5, C = /*#__PURE__*/ e(/* @__PURE__ */ le({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let le = e, C = ue("apiBase", ""), Ye = c(() => typeof C == "string" ? C : C?.value ?? ""), w = new ce(le.client ?? new ee({
			baseUrl: Ye.value,
			tokenStore: new t()
		})), T = te(), Xe = c(() => oe.map((e) => ({
			value: e.value,
			label: e.label
		}))), E = g([]), Ze = g(!0), D = g(null);
		async function O() {
			Ze.value = !0, D.value = null;
			try {
				E.value = await w.list();
			} catch (e) {
				D.value = n(e, "Failed to load users."), T.error(D.value);
			} finally {
				Ze.value = !1;
			}
		}
		function k(e) {
			return e.status ?? "active";
		}
		let Qe = c(() => E.value.filter((e) => k(e) === "pending")), $e = {
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
				await w.approve(e.id), T.success(`${e.username} approved.`), await O();
			} catch (e) {
				T.error(n(e, "Failed to approve user."));
			}
		}
		let A = g(null);
		async function it() {
			let e = A.value;
			if (e) try {
				await w.disable(e.id), T.success(`${e.username} disabled.`), A.value = null, await O();
			} catch (e) {
				T.error(n(e, "Failed to disable user.")), A.value = null;
			}
		}
		let j = g(null);
		async function at() {
			let e = j.value;
			if (e) try {
				await w.reject(e.id), T.success(`${e.username}'s signup rejected.`), j.value = null, await O();
			} catch (e) {
				T.error(n(e, "Failed to reject user.")), j.value = null;
			}
		}
		let M = g(!1), N = g(null), P = g(""), F = g(""), I = g(""), L = g(!1), R = g(!1), ot = c(() => N.value ? `Edit user — ${N.value.username}` : "Add user");
		function st() {
			N.value = null, P.value = "", F.value = "", I.value = "", L.value = !1, M.value = !0;
		}
		function ct(e) {
			N.value = e, P.value = e.username, F.value = e.email, I.value = "", L.value = e.is_admin, M.value = !0;
		}
		function z() {
			M.value = !1, N.value = null;
		}
		async function lt() {
			if (!P.value.trim() || !F.value.trim()) {
				T.error("Username and email are required.");
				return;
			}
			let e = N.value;
			if (!e && !I.value) {
				T.error("Password is required for new users.");
				return;
			}
			if (!e && I.value.length < 8) {
				T.error("Password must be at least 8 characters.");
				return;
			}
			R.value = !0;
			try {
				if (e) {
					let t = {
						username: P.value,
						email: F.value
					};
					I.value && (t.password = I.value), await w.update(e.id, t), e.is_admin !== L.value && await w.setAdmin(e.id, L.value), T.success("User updated.");
				} else {
					let e = {
						username: P.value,
						email: F.value,
						password: I.value,
						is_admin: L.value
					};
					await w.create(e), T.success("User created.");
				}
				z(), await O();
			} catch (e) {
				T.error(n(e, "Failed to save user."));
			} finally {
				R.value = !1;
			}
		}
		let B = g(null);
		async function ut() {
			let e = B.value;
			if (e) try {
				await w.remove(e.id), T.success("User deleted."), B.value = null, await O();
			} catch (e) {
				T.error(n(e, "Failed to delete user.")), B.value = null;
			}
		}
		async function dt(e, t) {
			try {
				await w.setAdmin(e.id, t), T.success(t ? "User promoted to admin." : "Admin status removed."), await O();
			} catch (e) {
				T.error(n(e, "Failed to update admin status."));
			}
		}
		let V = g(null), H = g(null);
		async function ft(e) {
			V.value = e, H.value = null;
			try {
				H.value = await w.resetPassword(e.id);
			} catch (e) {
				T.error(n(e, "Failed to reset password.")), V.value = null;
			}
		}
		function pt() {
			V.value = null, H.value = null;
		}
		async function mt() {
			let e = H.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), T.success("Password copied to clipboard.");
			} catch {
				T.error("Could not copy to clipboard.");
			}
		}
		let U = g(null), W = g([]), ht = g(!1), gt = c(() => U.value ? `Profiles — ${U.value.username}` : "Profiles"), _t = c({
			get: () => U.value !== null,
			set: (e) => {
				e || bt();
			}
		}), vt = c(() => W.value.length >= Je);
		async function G(e) {
			ht.value = !0;
			try {
				W.value = await w.listProfiles(e);
			} catch (e) {
				T.error(n(e, "Failed to load profiles."));
			} finally {
				ht.value = !1;
			}
		}
		async function yt(e) {
			U.value = e, await G(e.id);
		}
		function bt() {
			U.value = null, W.value = [], wt(), X.value = null, $();
		}
		let K = g(!1), q = g(null), J = g(""), Y = g(0), xt = g(!1);
		function St() {
			q.value = null, J.value = "", Y.value = 0, K.value = !0;
		}
		function Ct(e) {
			q.value = e, J.value = e.name, Y.value = e.rating, K.value = !0;
		}
		function wt() {
			K.value = !1, q.value = null, J.value = "", Y.value = 0;
		}
		async function Tt() {
			let e = U.value;
			if (e) {
				if (!J.value.trim()) {
					T.error("Profile name is required.");
					return;
				}
				xt.value = !0;
				try {
					if (q.value) {
						let e = {
							name: J.value,
							rating: Y.value
						};
						await w.updateProfile(q.value.id, e), T.success("Profile updated.");
					} else {
						if (vt.value) {
							T.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: J.value,
							rating: Y.value
						};
						await w.createProfile(e.id, t), T.success("Profile created.");
					}
					wt(), await G(e.id);
				} catch (e) {
					T.error(n(e, "Failed to save profile."));
				} finally {
					xt.value = !1;
				}
			}
		}
		let X = g(null);
		async function Et() {
			let e = U.value, t = X.value;
			if (!(!e || !t)) try {
				await w.removeProfile(t.id), T.success("Profile deleted."), X.value = null, await G(e.id);
			} catch (e) {
				T.error(n(e, "Failed to delete profile.")), X.value = null;
			}
		}
		let Z = g(null), Q = g(""), Dt = g(!1);
		function Ot(e) {
			Z.value = e, Q.value = "";
		}
		function $() {
			Z.value = null, Q.value = "";
		}
		async function kt() {
			let e = U.value, t = Z.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test(Q.value) && !/^\d{6}$/.test(Q.value)) {
					T.error("PIN must be 4 or 6 digits.");
					return;
				}
				Dt.value = !0;
				try {
					await w.setPin(t.id, Q.value), T.success("PIN set."), $(), await G(e.id);
				} catch (e) {
					T.error(n(e, "Failed to set PIN."));
				} finally {
					Dt.value = !1;
				}
			}
		}
		async function At(e) {
			let t = U.value;
			if (t) try {
				await w.clearPin(e.id), T.success("PIN cleared."), await G(t.id);
			} catch (e) {
				T.error(n(e, "Failed to clear PIN."));
			}
		}
		function jt(e) {
			return se[e] ?? se[12];
		}
		return de(O), (e, t) => (h(), d("section", fe, [
			f("header", pe, [t[17] ||= f("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: st
			}, {
				default: b(() => [...t[16] ||= [p("Add user", -1)]]),
				_: 1
			})]),
			m(ae, null, {
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
			}),
			Ze.value ? (h(), d("div", me, [m(ie, {
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
			}, 8, ["description"])) : E.value.length === 0 ? (h(), l(o, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: b(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: st
				}, {
					default: b(() => [...t[20] ||= [p("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d(s, { key: 3 }, [Qe.value.length > 0 ? (h(), d("section", he, [f("h2", ge, [t[21] ||= p(" Pending approval ", -1), m(i, { tone: "warning" }, {
				default: b(() => [p(v(Qe.value.length), 1)]),
				_: 1
			})]), f("table", _e, [t[24] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Requested"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, _(Qe.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, v(e.username), 1),
				f("td", null, v(e.email), 1),
				f("td", ve, v(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", ye, [m(r, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => rt(e)
				}, {
					default: b(() => [...t[22] ||= [p(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), m(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => j.value = e
				}, {
					default: b(() => [...t[23] ||= [p(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : u("", !0), f("table", be, [t[33] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Role"),
				f("th", { scope: "col" }, "Status"),
				f("th", { scope: "col" }, "Created"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, _(E.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, v(e.username), 1),
				f("td", null, v(e.email), 1),
				f("td", null, [m(i, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: b(() => [p(v(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", null, [m(i, { tone: nt(e) }, {
					default: b(() => [p(v(tt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", xe, v(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", Se, [
					k(e) === "pending" ? (h(), l(r, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => rt(e)
					}, {
						default: b(() => [...t[25] ||= [p(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : k(e) === "disabled" ? (h(), l(r, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => rt(e)
					}, {
						default: b(() => [...t[26] ||= [p(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (h(), l(r, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => A.value = e
					}, {
						default: b(() => [...t[27] ||= [p(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					k(e) === "pending" ? (h(), l(r, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => j.value = e
					}, {
						default: b(() => [...t[28] ||= [p(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : u("", !0),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => ct(e)
					}, {
						default: b(() => [...t[29] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => dt(e, !e.is_admin)
					}, {
						default: b(() => [p(v(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => ft(e)
					}, {
						default: b(() => [...t[30] ||= [p(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => yt(e)
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
				modelValue: M.value,
				"onUpdate:modelValue": t[4] ||= (e) => M.value = e,
				title: ot.value,
				onClose: z
			}, {
				footer: b(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: z
				}, {
					default: b(() => [...t[36] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: lt
				}, {
					default: b(() => [p(v(N.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [f("form", {
					class: "admin-users__form",
					onSubmit: S(lt, ["prevent"])
				}, [
					f("label", Ce, [t[34] ||= f("span", { class: "admin-users__label" }, "Username", -1), x(f("input", {
						"onUpdate:modelValue": t[0] ||= (e) => P.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, P.value]])]),
					f("label", we, [t[35] ||= f("span", { class: "admin-users__label" }, "Email", -1), x(f("input", {
						"onUpdate:modelValue": t[1] ||= (e) => F.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, F.value]])]),
					f("label", Te, [f("span", Ee, v(N.value ? "Password (leave blank to keep current)" : "Password"), 1), x(f("input", {
						"onUpdate:modelValue": t[2] ||= (e) => I.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: N.value ? "(unchanged)" : void 0,
						required: !N.value
					}, null, 8, De), [[y, I.value]])]),
					m(ne, {
						modelValue: L.value,
						"onUpdate:modelValue": t[3] ||= (e) => L.value = e,
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
					onClick: ut
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
				"model-value": A.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => A.value = null
			}, {
				footer: b(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => A.value = null
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
					f("strong", null, v(A.value?.username), 1),
					t[42] ||= p("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": j.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": t[10] ||= (e) => j.value = null
			}, {
				footer: b(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[9] ||= (e) => j.value = null
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
					f("strong", null, v(j.value?.username), 1),
					t[46] ||= p("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": V.value !== null,
				title: V.value ? `Reset password — ${V.value.username}` : "Reset password",
				"onUpdate:modelValue": pt
			}, {
				footer: b(() => [m(r, {
					variant: "solid",
					size: "sm",
					onClick: pt
				}, {
					default: b(() => [...t[53] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [H.value ? (h(), d("div", Oe, [f("p", null, v(H.value.message), 1), f("label", ke, [t[50] ||= f("span", { class: "admin-users__label" }, "New password", -1), f("div", Ae, [f("input", {
					value: H.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, je), m(r, {
					variant: "outline",
					size: "sm",
					onClick: mt
				}, {
					default: b(() => [...t[49] ||= [p("Copy", -1)]]),
					_: 1
				})])])])) : (h(), d("p", Me, [
					t[51] ||= p(" Resetting password for ", -1),
					f("strong", null, v(V.value?.username), 1),
					t[52] ||= p("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			m(a, {
				modelValue: _t.value,
				"onUpdate:modelValue": t[15] ||= (e) => _t.value = e,
				title: gt.value,
				size: "lg"
			}, {
				default: b(() => [ht.value ? (h(), d("div", Ne, [m(ie, {
					variant: "text",
					lines: 4
				})])) : (h(), d(s, { key: 1 }, [
					f("div", Pe, [m(r, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: vt.value,
						"aria-label": "Add profile",
						onClick: St
					}, {
						default: b(() => [p(" Add profile" + v(vt.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					W.value.length === 0 ? (h(), l(o, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (h(), d("table", Fe, [t[58] ||= f("thead", null, [f("tr", null, [
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
							default: b(() => [p(v(jt(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						f("td", null, [m(i, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: b(() => [p(v(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						f("td", null, [f("div", Ie, [
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => Ct(e)
							}, {
								default: b(() => [...t[54] ||= [p(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Ot(e)
							}, {
								default: b(() => [...t[55] ||= [p(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? u("", !0) : (h(), l(r, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => At(e)
							}, {
								default: b(() => [...t[56] ||= [p(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => X.value = e
							}, {
								default: b(() => [...t[57] ||= [p(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					K.value ? (h(), d("div", Le, [f("h3", Re, v(q.value ? "Edit profile" : "Add profile"), 1), f("form", {
						class: "admin-users__form",
						onSubmit: S(Tt, ["prevent"])
					}, [
						f("label", ze, [t[59] ||= f("span", { class: "admin-users__label" }, "Name", -1), x(f("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[y, J.value]])]),
						f("label", Be, [t[60] ||= f("span", { class: "admin-users__label" }, "Rating", -1), m(re, {
							"model-value": Y.value,
							options: Xe.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => Y.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						f("div", Ve, [m(r, {
							variant: "ghost",
							size: "sm",
							onClick: wt
						}, {
							default: b(() => [...t[61] ||= [p("Cancel", -1)]]),
							_: 1
						}), m(r, {
							variant: "solid",
							size: "sm",
							loading: xt.value,
							onClick: Tt
						}, {
							default: b(() => [p(v(q.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : u("", !0),
					X.value ? (h(), d("div", He, [f("p", null, [
						t[62] ||= p(" Delete profile ", -1),
						f("strong", null, v(X.value.name), 1),
						t[63] ||= p("? This cannot be undone. ", -1)
					]), f("div", Ue, [m(r, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => X.value = null
					}, {
						default: b(() => [...t[64] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(r, {
						variant: "solid",
						size: "sm",
						onClick: Et
					}, {
						default: b(() => [...t[65] ||= [p("Delete", -1)]]),
						_: 1
					})])])) : u("", !0),
					Z.value ? (h(), d("div", We, [f("h3", Ge, "Set PIN — " + v(Z.value.name), 1), f("form", {
						class: "admin-users__form",
						onSubmit: S(kt, ["prevent"])
					}, [f("label", Ke, [t[66] ||= f("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), x(f("input", {
						"onUpdate:modelValue": t[14] ||= (e) => Q.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[y, Q.value]])]), f("div", qe, [m(r, {
						variant: "ghost",
						size: "sm",
						onClick: $
					}, {
						default: b(() => [...t[67] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(r, {
						variant: "solid",
						size: "sm",
						loading: Dt.value,
						onClick: kt
					}, {
						default: b(() => [...t[68] ||= [p("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : u("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-9116a20c"]]);
//#endregion
export { C as default };

//# sourceMappingURL=UsersPage-CVC6WB6n.js.map