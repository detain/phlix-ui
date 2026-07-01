import { n as e } from "./Icon-24ngwBUH.js";
import { c as t, f as n, t as ee } from "./client-fw74f3l_.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-CInT03Lp.js";
import { t as i } from "./Badge-DnDrMVUo.js";
import { t as ne } from "./Switch-D-Y4B9p8.js";
import { t as re } from "./Select-C7fVtNk5.js";
import { t as a } from "./Modal-Cf28TADR.js";
import { t as ie } from "./Skeleton-BUq2D39t.js";
import { t as o } from "./EmptyState-0XgHKEGf.js";
import { t as ae } from "./PageHint-DR8OWfto.js";
import { n as oe, r as se, t as ce } from "./users-BTNikCXE.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as le, inject as ue, onMounted as de, openBlock as h, ref as g, renderList as fe, toDisplayString as _, vModelText as v, withCtx as y, withDirectives as b, withModifiers as x } from "vue";
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
}, Ke = { class: "admin-users__subform-title" }, qe = { class: "admin-users__field" }, Je = { class: "admin-users__subform-actions" }, Ye = 5, S = /*#__PURE__*/ e(/* @__PURE__ */ le({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let le = e, S = ue("apiBase", ""), Xe = c(() => typeof S == "string" ? S : S?.value ?? ""), C = new ce(le.client ?? new ee({
			baseUrl: Xe.value,
			tokenStore: new t()
		})), w = te(), Ze = c(() => se.map((e) => ({
			value: e.value,
			label: e.label
		}))), T = g([]), Qe = g(!0), E = g(null);
		async function D() {
			Qe.value = !0, E.value = null;
			try {
				T.value = await C.list();
			} catch (e) {
				E.value = n(e, "Failed to load users."), w.error(E.value);
			} finally {
				Qe.value = !1;
			}
		}
		function O(e) {
			return e.status ?? "active";
		}
		let $e = c(() => T.value.filter((e) => O(e) === "pending")), et = {
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
				await C.approve(e.id), w.success(`${e.username} approved.`), await D();
			} catch (e) {
				w.error(n(e, "Failed to approve user."));
			}
		}
		let A = g(null);
		async function it() {
			let e = A.value;
			if (e) try {
				await C.disable(e.id), w.success(`${e.username} disabled.`), A.value = null, await D();
			} catch (e) {
				w.error(n(e, "Failed to disable user.")), A.value = null;
			}
		}
		let j = g(null);
		async function at() {
			let e = j.value;
			if (e) try {
				await C.reject(e.id), w.success(`${e.username}'s signup rejected.`), j.value = null, await D();
			} catch (e) {
				w.error(n(e, "Failed to reject user.")), j.value = null;
			}
		}
		let M = g(!1), N = g(null), P = g(""), F = g(""), I = g(""), L = g(!1), ot = g(!1), st = c(() => N.value ? `Edit user — ${N.value.username}` : "Add user");
		function ct() {
			N.value = null, P.value = "", F.value = "", I.value = "", L.value = !1, M.value = !0;
		}
		function lt(e) {
			N.value = e, P.value = e.username, F.value = e.email, I.value = "", L.value = e.is_admin, M.value = !0;
		}
		function ut() {
			M.value = !1, N.value = null;
		}
		async function dt() {
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
			ot.value = !0;
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
				ut(), await D();
			} catch (e) {
				w.error(n(e, "Failed to save user."));
			} finally {
				ot.value = !1;
			}
		}
		let R = g(null);
		async function ft() {
			let e = R.value;
			if (e) try {
				await C.remove(e.id), w.success("User deleted."), R.value = null, await D();
			} catch (e) {
				w.error(n(e, "Failed to delete user.")), R.value = null;
			}
		}
		async function pt(e, t) {
			try {
				await C.setAdmin(e.id, t), w.success(t ? "User promoted to admin." : "Admin status removed."), await D();
			} catch (e) {
				w.error(n(e, "Failed to update admin status."));
			}
		}
		let z = g(null), B = g(null);
		async function mt(e) {
			z.value = e, B.value = null;
			try {
				B.value = await C.resetPassword(e.id);
			} catch (e) {
				w.error(n(e, "Failed to reset password.")), z.value = null;
			}
		}
		function ht() {
			z.value = null, B.value = null;
		}
		async function gt() {
			let e = B.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), w.success("Password copied to clipboard.");
			} catch {
				w.error("Could not copy to clipboard.");
			}
		}
		let V = g(null), H = g([]), U = g(!1), _t = c(() => V.value ? `Profiles — ${V.value.username}` : "Profiles"), vt = c({
			get: () => V.value !== null,
			set: (e) => {
				e || bt();
			}
		}), W = c(() => H.value.length >= Ye);
		async function G(e) {
			U.value = !0;
			try {
				H.value = await C.listProfiles(e);
			} catch (e) {
				w.error(n(e, "Failed to load profiles."));
			} finally {
				U.value = !1;
			}
		}
		async function yt(e) {
			V.value = e, await G(e.id);
		}
		function bt() {
			V.value = null, H.value = [], Ct(), Z.value = null, Ot();
		}
		let K = g(!1), q = g(null), J = g(""), Y = g(0), X = g(!1);
		function xt() {
			q.value = null, J.value = "", Y.value = 0, K.value = !0;
		}
		function St(e) {
			q.value = e, J.value = e.name, Y.value = e.rating, K.value = !0;
		}
		function Ct() {
			K.value = !1, q.value = null, J.value = "", Y.value = 0;
		}
		async function wt() {
			let e = V.value;
			if (e) {
				if (!J.value.trim()) {
					w.error("Profile name is required.");
					return;
				}
				X.value = !0;
				try {
					if (q.value) {
						let e = {
							name: J.value,
							rating: Y.value
						};
						await C.updateProfile(q.value.id, e), w.success("Profile updated.");
					} else {
						if (W.value) {
							w.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: J.value,
							rating: Y.value
						};
						await C.createProfile(e.id, t), w.success("Profile created.");
					}
					Ct(), await G(e.id);
				} catch (e) {
					w.error(n(e, "Failed to save profile."));
				} finally {
					X.value = !1;
				}
			}
		}
		let Z = g(null);
		async function Tt() {
			let e = V.value, t = Z.value;
			if (!(!e || !t)) try {
				await C.removeProfile(t.id), w.success("Profile deleted."), Z.value = null, await G(e.id);
			} catch (e) {
				w.error(n(e, "Failed to delete profile.")), Z.value = null;
			}
		}
		let Q = g(null), $ = g(""), Et = g(!1);
		function Dt(e) {
			Q.value = e, $.value = "";
		}
		function Ot() {
			Q.value = null, $.value = "";
		}
		async function kt() {
			let e = V.value, t = Q.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test($.value) && !/^\d{6}$/.test($.value)) {
					w.error("PIN must be 4 or 6 digits.");
					return;
				}
				Et.value = !0;
				try {
					await C.setPin(t.id, $.value), w.success("PIN set."), Ot(), await G(e.id);
				} catch (e) {
					w.error(n(e, "Failed to set PIN."));
				} finally {
					Et.value = !1;
				}
			}
		}
		async function At(e) {
			let t = V.value;
			if (t) try {
				await C.clearPin(e.id), w.success("PIN cleared."), await G(t.id);
			} catch (e) {
				w.error(n(e, "Failed to clear PIN."));
			}
		}
		function jt(e) {
			return oe[e] ?? oe[6];
		}
		return de(D), (e, t) => (h(), d("section", pe, [
			f("header", me, [t[17] ||= f("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: ct
			}, {
				default: y(() => [...t[16] ||= [p("Add user", -1)]]),
				_: 1
			})]),
			m(ae, null, {
				default: y(() => [...t[18] ||= [
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
			Qe.value ? (h(), d("div", he, [m(ie, {
				variant: "text",
				lines: 6
			})])) : E.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load users",
				description: E.value
			}, {
				actions: y(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: D
				}, {
					default: y(() => [...t[19] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value.length === 0 ? (h(), l(o, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: y(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: ct
				}, {
					default: y(() => [...t[20] ||= [p("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d(s, { key: 3 }, [$e.value.length > 0 ? (h(), d("section", ge, [f("h2", _e, [t[21] ||= p(" Pending approval ", -1), m(i, { tone: "warning" }, {
				default: y(() => [p(_($e.value.length), 1)]),
				_: 1
			})]), f("table", ve, [t[24] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Requested"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, fe($e.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, _(e.username), 1),
				f("td", null, _(e.email), 1),
				f("td", ye, _(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", be, [m(r, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => k(e)
				}, {
					default: y(() => [...t[22] ||= [p(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), m(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => j.value = e
				}, {
					default: y(() => [...t[23] ||= [p(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : u("", !0), f("table", xe, [t[33] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Role"),
				f("th", { scope: "col" }, "Status"),
				f("th", { scope: "col" }, "Created"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, fe(T.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, _(e.username), 1),
				f("td", null, _(e.email), 1),
				f("td", null, [m(i, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: y(() => [p(_(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", null, [m(i, { tone: rt(e) }, {
					default: y(() => [p(_(nt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", Se, _(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", Ce, [
					O(e) === "pending" ? (h(), l(r, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => k(e)
					}, {
						default: y(() => [...t[25] ||= [p(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : O(e) === "disabled" ? (h(), l(r, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => k(e)
					}, {
						default: y(() => [...t[26] ||= [p(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (h(), l(r, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => A.value = e
					}, {
						default: y(() => [...t[27] ||= [p(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					O(e) === "pending" ? (h(), l(r, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => j.value = e
					}, {
						default: y(() => [...t[28] ||= [p(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : u("", !0),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => lt(e)
					}, {
						default: y(() => [...t[29] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => pt(e, !e.is_admin)
					}, {
						default: y(() => [p(_(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => mt(e)
					}, {
						default: y(() => [...t[30] ||= [p(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => yt(e)
					}, {
						default: y(() => [...t[31] ||= [p(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => R.value = e
					}, {
						default: y(() => [...t[32] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			m(a, {
				modelValue: M.value,
				"onUpdate:modelValue": t[4] ||= (e) => M.value = e,
				title: st.value,
				onClose: ut
			}, {
				footer: y(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: ut
				}, {
					default: y(() => [...t[36] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: ot.value,
					onClick: dt
				}, {
					default: y(() => [p(_(N.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-users__form",
					onSubmit: x(dt, ["prevent"])
				}, [
					f("label", we, [t[34] ||= f("span", { class: "admin-users__label" }, "Username", -1), b(f("input", {
						"onUpdate:modelValue": t[0] ||= (e) => P.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, P.value]])]),
					f("label", Te, [t[35] ||= f("span", { class: "admin-users__label" }, "Email", -1), b(f("input", {
						"onUpdate:modelValue": t[1] ||= (e) => F.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, F.value]])]),
					f("label", Ee, [f("span", De, _(N.value ? "Password (leave blank to keep current)" : "Password"), 1), b(f("input", {
						"onUpdate:modelValue": t[2] ||= (e) => I.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: N.value ? "(unchanged)" : void 0,
						required: !N.value
					}, null, 8, Oe), [[v, I.value]])]),
					m(ne, {
						modelValue: L.value,
						"onUpdate:modelValue": t[3] ||= (e) => L.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(a, {
				"model-value": R.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => R.value = null
			}, {
				footer: y(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => R.value = null
				}, {
					default: y(() => [...t[39] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: ft
				}, {
					default: y(() => [...t[40] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[37] ||= p(" Delete user ", -1),
					f("strong", null, _(R.value?.username), 1),
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
				footer: y(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => A.value = null
				}, {
					default: y(() => [...t[43] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: it
				}, {
					default: y(() => [...t[44] ||= [p("Disable", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[41] ||= p(" Disable ", -1),
					f("strong", null, _(A.value?.username), 1),
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
				footer: y(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[9] ||= (e) => j.value = null
				}, {
					default: y(() => [...t[47] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: at
				}, {
					default: y(() => [...t[48] ||= [p("Reject", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[45] ||= p(" Reject ", -1),
					f("strong", null, _(j.value?.username), 1),
					t[46] ||= p("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": z.value !== null,
				title: z.value ? `Reset password — ${z.value.username}` : "Reset password",
				"onUpdate:modelValue": ht
			}, {
				footer: y(() => [m(r, {
					variant: "solid",
					size: "sm",
					onClick: ht
				}, {
					default: y(() => [...t[53] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: y(() => [B.value ? (h(), d("div", ke, [f("p", null, _(B.value.message), 1), f("label", Ae, [t[50] ||= f("span", { class: "admin-users__label" }, "New password", -1), f("div", je, [f("input", {
					value: B.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Me), m(r, {
					variant: "outline",
					size: "sm",
					onClick: gt
				}, {
					default: y(() => [...t[49] ||= [p("Copy", -1)]]),
					_: 1
				})])])])) : (h(), d("p", Ne, [
					t[51] ||= p(" Resetting password for ", -1),
					f("strong", null, _(z.value?.username), 1),
					t[52] ||= p("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			m(a, {
				modelValue: vt.value,
				"onUpdate:modelValue": t[15] ||= (e) => vt.value = e,
				title: _t.value,
				size: "lg"
			}, {
				default: y(() => [U.value ? (h(), d("div", Pe, [m(ie, {
					variant: "text",
					lines: 4
				})])) : (h(), d(s, { key: 1 }, [
					f("div", Fe, [m(r, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: W.value,
						"aria-label": "Add profile",
						onClick: xt
					}, {
						default: y(() => [p(" Add profile" + _(W.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					H.value.length === 0 ? (h(), l(o, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (h(), d("table", Ie, [t[58] ||= f("thead", null, [f("tr", null, [
						f("th", { scope: "col" }, "Name"),
						f("th", { scope: "col" }, "Rating"),
						f("th", { scope: "col" }, "PIN"),
						f("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), f("tbody", null, [(h(!0), d(s, null, fe(H.value, (e) => (h(), d("tr", { key: e.id }, [
						f("td", null, _(e.name), 1),
						f("td", null, [m(i, { tone: "info" }, {
							default: y(() => [p(_(jt(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						f("td", null, [m(i, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: y(() => [p(_(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						f("td", null, [f("div", Le, [
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => St(e)
							}, {
								default: y(() => [...t[54] ||= [p(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Dt(e)
							}, {
								default: y(() => [...t[55] ||= [p(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? u("", !0) : (h(), l(r, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => At(e)
							}, {
								default: y(() => [...t[56] ||= [p(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => Z.value = e
							}, {
								default: y(() => [...t[57] ||= [p(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					K.value ? (h(), d("div", Re, [f("h3", ze, _(q.value ? "Edit profile" : "Add profile"), 1), f("form", {
						class: "admin-users__form",
						onSubmit: x(wt, ["prevent"])
					}, [
						f("label", Be, [t[59] ||= f("span", { class: "admin-users__label" }, "Name", -1), b(f("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[v, J.value]])]),
						f("label", Ve, [t[60] ||= f("span", { class: "admin-users__label" }, "Rating", -1), m(re, {
							"model-value": Y.value,
							options: Ze.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => Y.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						f("div", He, [m(r, {
							variant: "ghost",
							size: "sm",
							onClick: Ct
						}, {
							default: y(() => [...t[61] ||= [p("Cancel", -1)]]),
							_: 1
						}), m(r, {
							variant: "solid",
							size: "sm",
							loading: X.value,
							onClick: wt
						}, {
							default: y(() => [p(_(q.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : u("", !0),
					Z.value ? (h(), d("div", Ue, [f("p", null, [
						t[62] ||= p(" Delete profile ", -1),
						f("strong", null, _(Z.value.name), 1),
						t[63] ||= p("? This cannot be undone. ", -1)
					]), f("div", We, [m(r, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => Z.value = null
					}, {
						default: y(() => [...t[64] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(r, {
						variant: "solid",
						size: "sm",
						onClick: Tt
					}, {
						default: y(() => [...t[65] ||= [p("Delete", -1)]]),
						_: 1
					})])])) : u("", !0),
					Q.value ? (h(), d("div", Ge, [f("h3", Ke, "Set PIN — " + _(Q.value.name), 1), f("form", {
						class: "admin-users__form",
						onSubmit: x(kt, ["prevent"])
					}, [f("label", qe, [t[66] ||= f("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), b(f("input", {
						"onUpdate:modelValue": t[14] ||= (e) => $.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[v, $.value]])]), f("div", Je, [m(r, {
						variant: "ghost",
						size: "sm",
						onClick: Ot
					}, {
						default: y(() => [...t[67] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(r, {
						variant: "solid",
						size: "sm",
						loading: Et.value,
						onClick: kt
					}, {
						default: y(() => [...t[68] ||= [p("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : u("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-4f5770e5"]]);
//#endregion
export { S as default };

//# sourceMappingURL=UsersPage-q0fLlsZl.js.map