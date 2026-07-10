import { n as e } from "./Icon-Bd1lZf6E.js";
import { t } from "./Modal-D2FZn2DD.js";
import { c as n, f as r, t as ee } from "./client-DH50wjeq.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-CnyfCnhY.js";
import { t as a } from "./Badge-Dq-pYhrz.js";
import { t as ne } from "./Switch-B9lejr6_.js";
import { t as re } from "./Select-CcnHklAn.js";
import { t as ie } from "./Skeleton-CzU_l53W.js";
import { t as ae } from "./EmptyState-588Z_81C.js";
import { t as oe } from "./PageHint-7Giwob0l.js";
import { n as se, r as ce, t as le } from "./users-BJ1qtKiW.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as ue, inject as de, onMounted as fe, openBlock as m, ref as h, renderList as pe, toDisplayString as g, vModelText as _, withCtx as v, withDirectives as y, withModifiers as b } from "vue";
//#region src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
var me = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, he = { class: "admin-users__head" }, ge = {
	key: 0,
	class: "admin-users__skel"
}, _e = {
	key: 0,
	class: "admin-users__pending",
	"aria-labelledby": "pending-heading"
}, ve = {
	id: "pending-heading",
	class: "admin-users__pending-title"
}, ye = {
	class: "admin-users__table",
	"aria-label": "Pending users"
}, be = { class: "admin-users__date" }, xe = { class: "admin-users__actions" }, Se = {
	class: "admin-users__table",
	"aria-label": "Users"
}, Ce = { class: "admin-users__date" }, we = { class: "admin-users__actions" }, Te = { class: "admin-users__field" }, Ee = { class: "admin-users__field" }, De = { class: "admin-users__field" }, Oe = { class: "admin-users__label" }, ke = ["placeholder", "required"], Ae = { key: 0 }, je = { class: "admin-users__field" }, Me = { class: "admin-users__password-row" }, Ne = ["value"], Pe = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, Fe = {
	key: 0,
	class: "admin-users__skel"
}, Ie = { class: "admin-users__profiles-toolbar" }, Le = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, Re = { class: "admin-users__actions" }, ze = {
	key: 2,
	class: "admin-users__subform"
}, Be = { class: "admin-users__subform-title" }, Ve = { class: "admin-users__field" }, He = { class: "admin-users__field" }, Ue = { class: "admin-users__subform-actions" }, We = {
	key: 3,
	class: "admin-users__subform"
}, Ge = { class: "admin-users__subform-actions" }, Ke = {
	key: 4,
	class: "admin-users__subform"
}, qe = { class: "admin-users__subform-title" }, Je = { class: "admin-users__field" }, Ye = { class: "admin-users__subform-actions" }, Xe = 5, x = /*#__PURE__*/ e(/* @__PURE__ */ ue({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let ue = e, x = de("apiBase", ""), Ze = s(() => typeof x == "string" ? x : x?.value ?? ""), S = new le(ue.client ?? new ee({
			baseUrl: Ze.value,
			tokenStore: new n()
		})), C = te(), Qe = s(() => ce.map((e) => ({
			value: e.value,
			label: e.label
		}))), w = h([]), T = h(!0), E = h(null);
		async function D() {
			T.value = !0, E.value = null;
			try {
				w.value = await S.list();
			} catch (e) {
				E.value = r(e, "Failed to load users."), C.error(E.value);
			} finally {
				T.value = !1;
			}
		}
		function O(e) {
			return e.status ?? "active";
		}
		let $e = s(() => w.value.filter((e) => O(e) === "pending")), et = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, tt = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function nt(e) {
			return et[O(e)];
		}
		function rt(e) {
			return tt[O(e)];
		}
		async function k(e) {
			try {
				await S.approve(e.id), C.success(`${e.username} approved.`), await D();
			} catch (e) {
				C.error(r(e, "Failed to approve user."));
			}
		}
		let A = h(null);
		async function it() {
			let e = A.value;
			if (e) try {
				await S.disable(e.id), C.success(`${e.username} disabled.`), A.value = null, await D();
			} catch (e) {
				C.error(r(e, "Failed to disable user.")), A.value = null;
			}
		}
		let j = h(null);
		async function at() {
			let e = j.value;
			if (e) try {
				await S.reject(e.id), C.success(`${e.username}'s signup rejected.`), j.value = null, await D();
			} catch (e) {
				C.error(r(e, "Failed to reject user.")), j.value = null;
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
				C.error("Username and email are required.");
				return;
			}
			let e = N.value;
			if (!e && !I.value) {
				C.error("Password is required for new users.");
				return;
			}
			if (!e && I.value.length < 8) {
				C.error("Password must be at least 8 characters.");
				return;
			}
			R.value = !0;
			try {
				if (e) {
					let t = {
						username: P.value,
						email: F.value
					};
					I.value && (t.password = I.value), await S.update(e.id, t), e.is_admin !== L.value && await S.setAdmin(e.id, L.value), C.success("User updated.");
				} else {
					let e = {
						username: P.value,
						email: F.value,
						password: I.value,
						is_admin: L.value
					};
					await S.create(e), C.success("User created.");
				}
				lt(), await D();
			} catch (e) {
				C.error(r(e, "Failed to save user."));
			} finally {
				R.value = !1;
			}
		}
		let z = h(null);
		async function dt() {
			let e = z.value;
			if (e) try {
				await S.remove(e.id), C.success("User deleted."), z.value = null, await D();
			} catch (e) {
				C.error(r(e, "Failed to delete user.")), z.value = null;
			}
		}
		async function ft(e, t) {
			try {
				await S.setAdmin(e.id, t), C.success(t ? "User promoted to admin." : "Admin status removed."), await D();
			} catch (e) {
				C.error(r(e, "Failed to update admin status."));
			}
		}
		let B = h(null), V = h(null);
		async function pt(e) {
			B.value = e, V.value = null;
			try {
				V.value = await S.resetPassword(e.id);
			} catch (e) {
				C.error(r(e, "Failed to reset password.")), B.value = null;
			}
		}
		function mt() {
			B.value = null, V.value = null;
		}
		async function ht() {
			let e = V.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), C.success("Password copied to clipboard.");
			} catch {
				C.error("Could not copy to clipboard.");
			}
		}
		let H = h(null), U = h([]), W = h(!1), gt = s(() => H.value ? `Profiles — ${H.value.username}` : "Profiles"), _t = s({
			get: () => H.value !== null,
			set: (e) => {
				e || yt();
			}
		}), G = s(() => U.value.length >= Xe);
		async function K(e) {
			W.value = !0;
			try {
				U.value = await S.listProfiles(e);
			} catch (e) {
				C.error(r(e, "Failed to load profiles."));
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
					C.error("Profile name is required.");
					return;
				}
				bt.value = !0;
				try {
					if (J.value) {
						let e = {
							name: Y.value,
							rating: X.value
						};
						await S.updateProfile(J.value.id, e), C.success("Profile updated.");
					} else {
						if (G.value) {
							C.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: Y.value,
							rating: X.value
						};
						await S.createProfile(e.id, t), C.success("Profile created.");
					}
					Ct(), await K(e.id);
				} catch (e) {
					C.error(r(e, "Failed to save profile."));
				} finally {
					bt.value = !1;
				}
			}
		}
		let Z = h(null);
		async function Tt() {
			let e = H.value, t = Z.value;
			if (!(!e || !t)) try {
				await S.removeProfile(t.id), C.success("Profile deleted."), Z.value = null, await K(e.id);
			} catch (e) {
				C.error(r(e, "Failed to delete profile.")), Z.value = null;
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
					C.error("PIN must be 4 or 6 digits.");
					return;
				}
				Et.value = !0;
				try {
					await S.setPin(t.id, $.value), C.success("PIN set."), Ot(), await K(e.id);
				} catch (e) {
					C.error(r(e, "Failed to set PIN."));
				} finally {
					Et.value = !1;
				}
			}
		}
		async function At(e) {
			let t = H.value;
			if (t) try {
				await S.clearPin(e.id), C.success("PIN cleared."), await K(t.id);
			} catch (e) {
				C.error(r(e, "Failed to clear PIN."));
			}
		}
		function jt(e) {
			return se[e] ?? se[6];
		}
		return fe(D), (e, n) => (m(), u("section", me, [
			d("header", he, [n[17] ||= d("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), p(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: st
			}, {
				default: v(() => [...n[16] ||= [f("Add user", -1)]]),
				_: 1
			})]),
			p(oe, null, {
				default: v(() => [...n[18] ||= [
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
			T.value ? (m(), u("div", ge, [p(ie, {
				variant: "text",
				lines: 6
			})])) : E.value ? (m(), c(ae, {
				key: 1,
				icon: "alert",
				title: "Couldn't load users",
				description: E.value
			}, {
				actions: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: D
				}, {
					default: v(() => [...n[19] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : w.value.length === 0 ? (m(), c(ae, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: st
				}, {
					default: v(() => [...n[20] ||= [f("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (m(), u(o, { key: 3 }, [$e.value.length > 0 ? (m(), u("section", _e, [d("h2", ve, [n[21] ||= f(" Pending approval ", -1), p(a, { tone: "warning" }, {
				default: v(() => [f(g($e.value.length), 1)]),
				_: 1
			})]), d("table", ye, [n[24] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Requested"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(o, null, pe($e.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, g(e.username), 1),
				d("td", null, g(e.email), 1),
				d("td", be, g(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", xe, [p(i, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => k(e)
				}, {
					default: v(() => [...n[22] ||= [f(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), p(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => j.value = e
				}, {
					default: v(() => [...n[23] ||= [f(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : l("", !0), d("table", Se, [n[33] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Role"),
				d("th", { scope: "col" }, "Status"),
				d("th", { scope: "col" }, "Created"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(o, null, pe(w.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, g(e.username), 1),
				d("td", null, g(e.email), 1),
				d("td", null, [p(a, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: v(() => [f(g(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", null, [p(a, { tone: rt(e) }, {
					default: v(() => [f(g(nt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", Ce, g(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", we, [
					O(e) === "pending" ? (m(), c(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => k(e)
					}, {
						default: v(() => [...n[25] ||= [f(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : O(e) === "disabled" ? (m(), c(i, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => k(e)
					}, {
						default: v(() => [...n[26] ||= [f(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (m(), c(i, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => A.value = e
					}, {
						default: v(() => [...n[27] ||= [f(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					O(e) === "pending" ? (m(), c(i, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => j.value = e
					}, {
						default: v(() => [...n[28] ||= [f(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : l("", !0),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => ct(e)
					}, {
						default: v(() => [...n[29] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => ft(e, !e.is_admin)
					}, {
						default: v(() => [f(g(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => pt(e)
					}, {
						default: v(() => [...n[30] ||= [f(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => vt(e)
					}, {
						default: v(() => [...n[31] ||= [f(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => z.value = e
					}, {
						default: v(() => [...n[32] ||= [f(" Delete ", -1)]]),
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
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: lt
				}, {
					default: v(() => [...n[36] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: ut
				}, {
					default: v(() => [f(g(N.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: v(() => [d("form", {
					class: "admin-users__form",
					onSubmit: b(ut, ["prevent"])
				}, [
					d("label", Te, [n[34] ||= d("span", { class: "admin-users__label" }, "Username", -1), y(d("input", {
						"onUpdate:modelValue": n[0] ||= (e) => P.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_, P.value]])]),
					d("label", Ee, [n[35] ||= d("span", { class: "admin-users__label" }, "Email", -1), y(d("input", {
						"onUpdate:modelValue": n[1] ||= (e) => F.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_, F.value]])]),
					d("label", De, [d("span", Oe, g(N.value ? "Password (leave blank to keep current)" : "Password"), 1), y(d("input", {
						"onUpdate:modelValue": n[2] ||= (e) => I.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: N.value ? "(unchanged)" : void 0,
						required: !N.value
					}, null, 8, ke), [[_, I.value]])]),
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
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => z.value = null
				}, {
					default: v(() => [...n[39] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: dt
				}, {
					default: v(() => [...n[40] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					n[37] ||= f(" Delete user ", -1),
					d("strong", null, g(z.value?.username), 1),
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
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[7] ||= (e) => A.value = null
				}, {
					default: v(() => [...n[43] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: it
				}, {
					default: v(() => [...n[44] ||= [f("Disable", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					n[41] ||= f(" Disable ", -1),
					d("strong", null, g(A.value?.username), 1),
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
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[9] ||= (e) => j.value = null
				}, {
					default: v(() => [...n[47] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: at
				}, {
					default: v(() => [...n[48] ||= [f("Reject", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					n[45] ||= f(" Reject ", -1),
					d("strong", null, g(j.value?.username), 1),
					n[46] ||= f("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(t, {
				"model-value": B.value !== null,
				title: B.value ? `Reset password — ${B.value.username}` : "Reset password",
				"onUpdate:modelValue": mt
			}, {
				footer: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					onClick: mt
				}, {
					default: v(() => [...n[53] ||= [f("Close", -1)]]),
					_: 1
				})]),
				default: v(() => [V.value ? (m(), u("div", Ae, [d("p", null, g(V.value.message), 1), d("label", je, [n[50] ||= d("span", { class: "admin-users__label" }, "New password", -1), d("div", Me, [d("input", {
					value: V.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Ne), p(i, {
					variant: "outline",
					size: "sm",
					onClick: ht
				}, {
					default: v(() => [...n[49] ||= [f("Copy", -1)]]),
					_: 1
				})])])])) : (m(), u("p", Pe, [
					n[51] ||= f(" Resetting password for ", -1),
					d("strong", null, g(B.value?.username), 1),
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
				default: v(() => [W.value ? (m(), u("div", Fe, [p(ie, {
					variant: "text",
					lines: 4
				})])) : (m(), u(o, { key: 1 }, [
					d("div", Ie, [p(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: G.value,
						"aria-label": "Add profile",
						onClick: xt
					}, {
						default: v(() => [f(" Add profile" + g(G.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					U.value.length === 0 ? (m(), c(ae, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (m(), u("table", Le, [n[58] ||= d("thead", null, [d("tr", null, [
						d("th", { scope: "col" }, "Name"),
						d("th", { scope: "col" }, "Rating"),
						d("th", { scope: "col" }, "PIN"),
						d("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), d("tbody", null, [(m(!0), u(o, null, pe(U.value, (e) => (m(), u("tr", { key: e.id }, [
						d("td", null, g(e.name), 1),
						d("td", null, [p(a, { tone: "info" }, {
							default: v(() => [f(g(jt(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						d("td", null, [p(a, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: v(() => [f(g(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						d("td", null, [d("div", Re, [
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => St(e)
							}, {
								default: v(() => [...n[54] ||= [f(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Dt(e)
							}, {
								default: v(() => [...n[55] ||= [f(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? l("", !0) : (m(), c(i, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => At(e)
							}, {
								default: v(() => [...n[56] ||= [f(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => Z.value = e
							}, {
								default: v(() => [...n[57] ||= [f(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					q.value ? (m(), u("div", ze, [d("h3", Be, g(J.value ? "Edit profile" : "Add profile"), 1), d("form", {
						class: "admin-users__form",
						onSubmit: b(wt, ["prevent"])
					}, [
						d("label", Ve, [n[59] ||= d("span", { class: "admin-users__label" }, "Name", -1), y(d("input", {
							"onUpdate:modelValue": n[11] ||= (e) => Y.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[_, Y.value]])]),
						d("label", He, [n[60] ||= d("span", { class: "admin-users__label" }, "Rating", -1), p(re, {
							"model-value": X.value,
							options: Qe.value,
							label: "Rating",
							"onUpdate:modelValue": n[12] ||= (e) => X.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						d("div", Ue, [p(i, {
							variant: "ghost",
							size: "sm",
							onClick: Ct
						}, {
							default: v(() => [...n[61] ||= [f("Cancel", -1)]]),
							_: 1
						}), p(i, {
							variant: "solid",
							size: "sm",
							loading: bt.value,
							onClick: wt
						}, {
							default: v(() => [f(g(J.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : l("", !0),
					Z.value ? (m(), u("div", We, [d("p", null, [
						n[62] ||= f(" Delete profile ", -1),
						d("strong", null, g(Z.value.name), 1),
						n[63] ||= f("? This cannot be undone. ", -1)
					]), d("div", Ge, [p(i, {
						variant: "ghost",
						size: "sm",
						onClick: n[13] ||= (e) => Z.value = null
					}, {
						default: v(() => [...n[64] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(i, {
						variant: "solid",
						size: "sm",
						onClick: Tt
					}, {
						default: v(() => [...n[65] ||= [f("Delete", -1)]]),
						_: 1
					})])])) : l("", !0),
					Q.value ? (m(), u("div", Ke, [d("h3", qe, "Set PIN — " + g(Q.value.name), 1), d("form", {
						class: "admin-users__form",
						onSubmit: b(kt, ["prevent"])
					}, [d("label", Je, [n[66] ||= d("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), y(d("input", {
						"onUpdate:modelValue": n[14] ||= (e) => $.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[_, $.value]])]), d("div", Ye, [p(i, {
						variant: "ghost",
						size: "sm",
						onClick: Ot
					}, {
						default: v(() => [...n[67] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(i, {
						variant: "solid",
						size: "sm",
						loading: Et.value,
						onClick: kt
					}, {
						default: v(() => [...n[68] ||= [f("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : l("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-f488077c"]]);
//#endregion
export { x as default };

//# sourceMappingURL=UsersPage-C6FkgItT.js.map