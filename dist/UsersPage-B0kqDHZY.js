import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, t as ee } from "./client-cUL8r-1I.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-k7aQagzg.js";
import { t as i } from "./Badge-ArWL5-WE.js";
import { t as ne } from "./Switch-CFZhdkXR.js";
import { t as re } from "./Select-BR5EXV0L.js";
import { t as a } from "./Modal-CWarEzTU.js";
import { t as ie } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { n as ae, r as oe, t as se } from "./users-CdFPFxKb.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as ce, inject as le, onMounted as ue, openBlock as h, ref as g, renderList as de, toDisplayString as _, vModelText as v, withCtx as y, withDirectives as b, withModifiers as x } from "vue";
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
}, Ge = { class: "admin-users__subform-title" }, Ke = { class: "admin-users__field" }, qe = { class: "admin-users__subform-actions" }, Je = 5, S = /*#__PURE__*/ e(/* @__PURE__ */ ce({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let ce = e, S = le("apiBase", ""), Ye = c(() => typeof S == "string" ? S : S?.value ?? ""), C = new se(ce.client ?? new ee({
			baseUrl: Ye.value,
			tokenStore: new t()
		})), w = te(), Xe = c(() => oe.map((e) => ({
			value: e.value,
			label: e.label
		}))), T = g([]), Ze = g(!0), E = g(null);
		async function D() {
			Ze.value = !0, E.value = null;
			try {
				T.value = await C.list();
			} catch (e) {
				E.value = n(e, "Failed to load users."), w.error(E.value);
			} finally {
				Ze.value = !1;
			}
		}
		function O(e) {
			return e.status ?? "active";
		}
		let Qe = c(() => T.value.filter((e) => O(e) === "pending")), $e = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, et = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function tt(e) {
			return $e[O(e)];
		}
		function nt(e) {
			return et[O(e)];
		}
		async function k(e) {
			try {
				await C.approve(e.id), w.success(`${e.username} approved.`), await D();
			} catch (e) {
				w.error(n(e, "Failed to approve user."));
			}
		}
		let A = g(null);
		async function rt() {
			let e = A.value;
			if (e) try {
				await C.disable(e.id), w.success(`${e.username} disabled.`), A.value = null, await D();
			} catch (e) {
				w.error(n(e, "Failed to disable user.")), A.value = null;
			}
		}
		let j = g(null);
		async function it() {
			let e = j.value;
			if (e) try {
				await C.reject(e.id), w.success(`${e.username}'s signup rejected.`), j.value = null, await D();
			} catch (e) {
				w.error(n(e, "Failed to reject user.")), j.value = null;
			}
		}
		let M = g(!1), N = g(null), P = g(""), F = g(""), I = g(""), L = g(!1), R = g(!1), at = c(() => N.value ? `Edit user — ${N.value.username}` : "Add user");
		function ot() {
			N.value = null, P.value = "", F.value = "", I.value = "", L.value = !1, M.value = !0;
		}
		function st(e) {
			N.value = e, P.value = e.username, F.value = e.email, I.value = "", L.value = e.is_admin, M.value = !0;
		}
		function ct() {
			M.value = !1, N.value = null;
		}
		async function lt() {
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
				ct(), await D();
			} catch (e) {
				w.error(n(e, "Failed to save user."));
			} finally {
				R.value = !1;
			}
		}
		let z = g(null);
		async function ut() {
			let e = z.value;
			if (e) try {
				await C.remove(e.id), w.success("User deleted."), z.value = null, await D();
			} catch (e) {
				w.error(n(e, "Failed to delete user.")), z.value = null;
			}
		}
		async function dt(e, t) {
			try {
				await C.setAdmin(e.id, t), w.success(t ? "User promoted to admin." : "Admin status removed."), await D();
			} catch (e) {
				w.error(n(e, "Failed to update admin status."));
			}
		}
		let B = g(null), V = g(null);
		async function ft(e) {
			B.value = e, V.value = null;
			try {
				V.value = await C.resetPassword(e.id);
			} catch (e) {
				w.error(n(e, "Failed to reset password.")), B.value = null;
			}
		}
		function pt() {
			B.value = null, V.value = null;
		}
		async function mt() {
			let e = V.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), w.success("Password copied to clipboard.");
			} catch {
				w.error("Could not copy to clipboard.");
			}
		}
		let H = g(null), U = g([]), W = g(!1), ht = c(() => H.value ? `Profiles — ${H.value.username}` : "Profiles"), gt = c({
			get: () => H.value !== null,
			set: (e) => {
				e || yt();
			}
		}), _t = c(() => U.value.length >= Je);
		async function G(e) {
			W.value = !0;
			try {
				U.value = await C.listProfiles(e);
			} catch (e) {
				w.error(n(e, "Failed to load profiles."));
			} finally {
				W.value = !1;
			}
		}
		async function vt(e) {
			H.value = e, await G(e.id);
		}
		function yt() {
			H.value = null, U.value = [], St(), Z.value = null, Dt();
		}
		let K = g(!1), q = g(null), J = g(""), Y = g(0), X = g(!1);
		function bt() {
			q.value = null, J.value = "", Y.value = 0, K.value = !0;
		}
		function xt(e) {
			q.value = e, J.value = e.name, Y.value = e.rating, K.value = !0;
		}
		function St() {
			K.value = !1, q.value = null, J.value = "", Y.value = 0;
		}
		async function Ct() {
			let e = H.value;
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
						if (_t.value) {
							w.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: J.value,
							rating: Y.value
						};
						await C.createProfile(e.id, t), w.success("Profile created.");
					}
					St(), await G(e.id);
				} catch (e) {
					w.error(n(e, "Failed to save profile."));
				} finally {
					X.value = !1;
				}
			}
		}
		let Z = g(null);
		async function wt() {
			let e = H.value, t = Z.value;
			if (!(!e || !t)) try {
				await C.removeProfile(t.id), w.success("Profile deleted."), Z.value = null, await G(e.id);
			} catch (e) {
				w.error(n(e, "Failed to delete profile.")), Z.value = null;
			}
		}
		let Q = g(null), $ = g(""), Tt = g(!1);
		function Et(e) {
			Q.value = e, $.value = "";
		}
		function Dt() {
			Q.value = null, $.value = "";
		}
		async function Ot() {
			let e = H.value, t = Q.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test($.value) && !/^\d{6}$/.test($.value)) {
					w.error("PIN must be 4 or 6 digits.");
					return;
				}
				Tt.value = !0;
				try {
					await C.setPin(t.id, $.value), w.success("PIN set."), Dt(), await G(e.id);
				} catch (e) {
					w.error(n(e, "Failed to set PIN."));
				} finally {
					Tt.value = !1;
				}
			}
		}
		async function kt(e) {
			let t = H.value;
			if (t) try {
				await C.clearPin(e.id), w.success("PIN cleared."), await G(t.id);
			} catch (e) {
				w.error(n(e, "Failed to clear PIN."));
			}
		}
		function At(e) {
			return ae[e] ?? ae[6];
		}
		return ue(D), (e, t) => (h(), d("section", fe, [
			f("header", pe, [t[17] ||= f("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: ot
			}, {
				default: y(() => [...t[16] ||= [p("Add user", -1)]]),
				_: 1
			})]),
			Ze.value ? (h(), d("div", me, [m(ie, {
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
					default: y(() => [...t[18] ||= [p("Retry", -1)]]),
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
					onClick: ot
				}, {
					default: y(() => [...t[19] ||= [p("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d(s, { key: 3 }, [Qe.value.length > 0 ? (h(), d("section", he, [f("h2", ge, [t[20] ||= p(" Pending approval ", -1), m(i, { tone: "warning" }, {
				default: y(() => [p(_(Qe.value.length), 1)]),
				_: 1
			})]), f("table", _e, [t[23] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Requested"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, de(Qe.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, _(e.username), 1),
				f("td", null, _(e.email), 1),
				f("td", ve, _(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", ye, [m(r, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => k(e)
				}, {
					default: y(() => [...t[21] ||= [p(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), m(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => j.value = e
				}, {
					default: y(() => [...t[22] ||= [p(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : u("", !0), f("table", be, [t[32] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Role"),
				f("th", { scope: "col" }, "Status"),
				f("th", { scope: "col" }, "Created"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, de(T.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, _(e.username), 1),
				f("td", null, _(e.email), 1),
				f("td", null, [m(i, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: y(() => [p(_(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", null, [m(i, { tone: nt(e) }, {
					default: y(() => [p(_(tt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", xe, _(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", Se, [
					O(e) === "pending" ? (h(), l(r, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => k(e)
					}, {
						default: y(() => [...t[24] ||= [p(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : O(e) === "disabled" ? (h(), l(r, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => k(e)
					}, {
						default: y(() => [...t[25] ||= [p(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (h(), l(r, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => A.value = e
					}, {
						default: y(() => [...t[26] ||= [p(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					O(e) === "pending" ? (h(), l(r, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => j.value = e
					}, {
						default: y(() => [...t[27] ||= [p(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : u("", !0),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => st(e)
					}, {
						default: y(() => [...t[28] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => dt(e, !e.is_admin)
					}, {
						default: y(() => [p(_(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => ft(e)
					}, {
						default: y(() => [...t[29] ||= [p(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => vt(e)
					}, {
						default: y(() => [...t[30] ||= [p(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => z.value = e
					}, {
						default: y(() => [...t[31] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			m(a, {
				modelValue: M.value,
				"onUpdate:modelValue": t[4] ||= (e) => M.value = e,
				title: at.value,
				onClose: ct
			}, {
				footer: y(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: ct
				}, {
					default: y(() => [...t[35] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: lt
				}, {
					default: y(() => [p(_(N.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-users__form",
					onSubmit: x(lt, ["prevent"])
				}, [
					f("label", Ce, [t[33] ||= f("span", { class: "admin-users__label" }, "Username", -1), b(f("input", {
						"onUpdate:modelValue": t[0] ||= (e) => P.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, P.value]])]),
					f("label", we, [t[34] ||= f("span", { class: "admin-users__label" }, "Email", -1), b(f("input", {
						"onUpdate:modelValue": t[1] ||= (e) => F.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, F.value]])]),
					f("label", Te, [f("span", Ee, _(N.value ? "Password (leave blank to keep current)" : "Password"), 1), b(f("input", {
						"onUpdate:modelValue": t[2] ||= (e) => I.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: N.value ? "(unchanged)" : void 0,
						required: !N.value
					}, null, 8, De), [[v, I.value]])]),
					m(ne, {
						modelValue: L.value,
						"onUpdate:modelValue": t[3] ||= (e) => L.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(a, {
				"model-value": z.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => z.value = null
			}, {
				footer: y(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => z.value = null
				}, {
					default: y(() => [...t[38] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: ut
				}, {
					default: y(() => [...t[39] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[36] ||= p(" Delete user ", -1),
					f("strong", null, _(z.value?.username), 1),
					t[37] ||= p("? This cannot be undone. ", -1)
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
					default: y(() => [...t[42] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: rt
				}, {
					default: y(() => [...t[43] ||= [p("Disable", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[40] ||= p(" Disable ", -1),
					f("strong", null, _(A.value?.username), 1),
					t[41] ||= p("? They will be signed out and blocked from signing in until re-enabled. ", -1)
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
					default: y(() => [...t[46] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: it
				}, {
					default: y(() => [...t[47] ||= [p("Reject", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[44] ||= p(" Reject ", -1),
					f("strong", null, _(j.value?.username), 1),
					t[45] ||= p("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": B.value !== null,
				title: B.value ? `Reset password — ${B.value.username}` : "Reset password",
				"onUpdate:modelValue": pt
			}, {
				footer: y(() => [m(r, {
					variant: "solid",
					size: "sm",
					onClick: pt
				}, {
					default: y(() => [...t[52] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: y(() => [V.value ? (h(), d("div", Oe, [f("p", null, _(V.value.message), 1), f("label", ke, [t[49] ||= f("span", { class: "admin-users__label" }, "New password", -1), f("div", Ae, [f("input", {
					value: V.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, je), m(r, {
					variant: "outline",
					size: "sm",
					onClick: mt
				}, {
					default: y(() => [...t[48] ||= [p("Copy", -1)]]),
					_: 1
				})])])])) : (h(), d("p", Me, [
					t[50] ||= p(" Resetting password for ", -1),
					f("strong", null, _(B.value?.username), 1),
					t[51] ||= p("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			m(a, {
				modelValue: gt.value,
				"onUpdate:modelValue": t[15] ||= (e) => gt.value = e,
				title: ht.value,
				size: "lg"
			}, {
				default: y(() => [W.value ? (h(), d("div", Ne, [m(ie, {
					variant: "text",
					lines: 4
				})])) : (h(), d(s, { key: 1 }, [
					f("div", Pe, [m(r, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: _t.value,
						"aria-label": "Add profile",
						onClick: bt
					}, {
						default: y(() => [p(" Add profile" + _(_t.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					U.value.length === 0 ? (h(), l(o, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (h(), d("table", Fe, [t[57] ||= f("thead", null, [f("tr", null, [
						f("th", { scope: "col" }, "Name"),
						f("th", { scope: "col" }, "Rating"),
						f("th", { scope: "col" }, "PIN"),
						f("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), f("tbody", null, [(h(!0), d(s, null, de(U.value, (e) => (h(), d("tr", { key: e.id }, [
						f("td", null, _(e.name), 1),
						f("td", null, [m(i, { tone: "info" }, {
							default: y(() => [p(_(At(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						f("td", null, [m(i, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: y(() => [p(_(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						f("td", null, [f("div", Ie, [
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => xt(e)
							}, {
								default: y(() => [...t[53] ||= [p(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Et(e)
							}, {
								default: y(() => [...t[54] ||= [p(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? u("", !0) : (h(), l(r, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => kt(e)
							}, {
								default: y(() => [...t[55] ||= [p(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => Z.value = e
							}, {
								default: y(() => [...t[56] ||= [p(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					K.value ? (h(), d("div", Le, [f("h3", Re, _(q.value ? "Edit profile" : "Add profile"), 1), f("form", {
						class: "admin-users__form",
						onSubmit: x(Ct, ["prevent"])
					}, [
						f("label", ze, [t[58] ||= f("span", { class: "admin-users__label" }, "Name", -1), b(f("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[v, J.value]])]),
						f("label", Be, [t[59] ||= f("span", { class: "admin-users__label" }, "Rating", -1), m(re, {
							"model-value": Y.value,
							options: Xe.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => Y.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						f("div", Ve, [m(r, {
							variant: "ghost",
							size: "sm",
							onClick: St
						}, {
							default: y(() => [...t[60] ||= [p("Cancel", -1)]]),
							_: 1
						}), m(r, {
							variant: "solid",
							size: "sm",
							loading: X.value,
							onClick: Ct
						}, {
							default: y(() => [p(_(q.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : u("", !0),
					Z.value ? (h(), d("div", He, [f("p", null, [
						t[61] ||= p(" Delete profile ", -1),
						f("strong", null, _(Z.value.name), 1),
						t[62] ||= p("? This cannot be undone. ", -1)
					]), f("div", Ue, [m(r, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => Z.value = null
					}, {
						default: y(() => [...t[63] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(r, {
						variant: "solid",
						size: "sm",
						onClick: wt
					}, {
						default: y(() => [...t[64] ||= [p("Delete", -1)]]),
						_: 1
					})])])) : u("", !0),
					Q.value ? (h(), d("div", We, [f("h3", Ge, "Set PIN — " + _(Q.value.name), 1), f("form", {
						class: "admin-users__form",
						onSubmit: x(Ot, ["prevent"])
					}, [f("label", Ke, [t[65] ||= f("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), b(f("input", {
						"onUpdate:modelValue": t[14] ||= (e) => $.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[v, $.value]])]), f("div", qe, [m(r, {
						variant: "ghost",
						size: "sm",
						onClick: Dt
					}, {
						default: y(() => [...t[66] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(r, {
						variant: "solid",
						size: "sm",
						loading: Tt.value,
						onClick: Ot
					}, {
						default: y(() => [...t[67] ||= [p("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : u("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-e00764b4"]]);
//#endregion
export { S as default };

//# sourceMappingURL=UsersPage-B0kqDHZY.js.map