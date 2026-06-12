import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n, u as r } from "./Button-9cUUJmnN.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as i } from "./Badge-ArWL5-WE.js";
import { t as te } from "./Switch-CFZhdkXR.js";
import { t as ne } from "./Select-DLwgQInL.js";
import { t as a } from "./Modal-I4tEFhoH.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { t as ie } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { n as ae, r as oe, t as se } from "./users-UPfbrkL3.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as ce, inject as le, onMounted as ue, openBlock as h, ref as g, renderList as _, toDisplayString as v, vModelText as y, withCtx as b, withDirectives as x, withModifiers as de } from "vue";
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
		let ce = e, S = le("apiBase", ""), Ye = c(() => typeof S == "string" ? S : S?.value ?? ""), C = new se(ce.client ?? new t({
			baseUrl: Ye.value,
			tokenStore: new ee()
		})), w = re(), Xe = c(() => oe.map((e) => ({
			value: e.value,
			label: e.label
		}))), T = g([]), E = g(!0), D = g(null);
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
		let A = c(() => T.value.filter((e) => k(e) === "pending")), Ze = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, Qe = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function $e(e) {
			return Ze[k(e)];
		}
		function et(e) {
			return Qe[k(e)];
		}
		async function j(e) {
			try {
				await C.approve(e.id), w.success(`${e.username} approved.`), await O();
			} catch (e) {
				w.error(r(e, "Failed to approve user."));
			}
		}
		let M = g(null);
		async function tt() {
			let e = M.value;
			if (e) try {
				await C.disable(e.id), w.success(`${e.username} disabled.`), M.value = null, await O();
			} catch (e) {
				w.error(r(e, "Failed to disable user.")), M.value = null;
			}
		}
		let N = g(null);
		async function nt() {
			let e = N.value;
			if (e) try {
				await C.reject(e.id), w.success(`${e.username}'s signup rejected.`), N.value = null, await O();
			} catch (e) {
				w.error(r(e, "Failed to reject user.")), N.value = null;
			}
		}
		let P = g(!1), F = g(null), I = g(""), L = g(""), R = g(""), z = g(!1), rt = g(!1), it = c(() => F.value ? `Edit user — ${F.value.username}` : "Add user");
		function at() {
			F.value = null, I.value = "", L.value = "", R.value = "", z.value = !1, P.value = !0;
		}
		function ot(e) {
			F.value = e, I.value = e.username, L.value = e.email, R.value = "", z.value = e.is_admin === 1, P.value = !0;
		}
		function st() {
			P.value = !1, F.value = null;
		}
		async function ct() {
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
			rt.value = !0;
			try {
				if (e) {
					let t = {
						username: I.value,
						email: L.value
					};
					R.value && (t.password = R.value), await C.update(e.id, t);
					let n = +!!z.value;
					e.is_admin !== n && await C.setAdmin(e.id, z.value), w.success("User updated.");
				} else {
					let e = {
						username: I.value,
						email: L.value,
						password: R.value,
						is_admin: z.value
					};
					await C.create(e), w.success("User created.");
				}
				st(), await O();
			} catch (e) {
				w.error(r(e, "Failed to save user."));
			} finally {
				rt.value = !1;
			}
		}
		let B = g(null);
		async function lt() {
			let e = B.value;
			if (e) try {
				await C.remove(e.id), w.success("User deleted."), B.value = null, await O();
			} catch (e) {
				w.error(r(e, "Failed to delete user.")), B.value = null;
			}
		}
		async function ut(e, t) {
			try {
				await C.setAdmin(e.id, t), w.success(t ? "User promoted to admin." : "Admin status removed."), await O();
			} catch (e) {
				w.error(r(e, "Failed to update admin status."));
			}
		}
		let V = g(null), H = g(null);
		async function dt(e) {
			V.value = e, H.value = null;
			try {
				H.value = await C.resetPassword(e.id);
			} catch (e) {
				w.error(r(e, "Failed to reset password.")), V.value = null;
			}
		}
		function ft() {
			V.value = null, H.value = null;
		}
		async function pt() {
			let e = H.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), w.success("Password copied to clipboard.");
			} catch {
				w.error("Could not copy to clipboard.");
			}
		}
		let U = g(null), W = g([]), mt = g(!1), ht = c(() => U.value ? `Profiles — ${U.value.username}` : "Profiles"), gt = c({
			get: () => U.value !== null,
			set: (e) => {
				e || yt();
			}
		}), _t = c(() => W.value.length >= Je);
		async function G(e) {
			mt.value = !0;
			try {
				W.value = await C.listProfiles(e);
			} catch (e) {
				w.error(r(e, "Failed to load profiles."));
			} finally {
				mt.value = !1;
			}
		}
		async function vt(e) {
			U.value = e, await G(e.id);
		}
		function yt() {
			U.value = null, W.value = [], X(), Z.value = null, Dt();
		}
		let K = g(!1), q = g(null), J = g(""), Y = g(0), bt = g(!1);
		function xt() {
			q.value = null, J.value = "", Y.value = 0, K.value = !0;
		}
		function St(e) {
			q.value = e, J.value = e.name, Y.value = e.rating, K.value = !0;
		}
		function X() {
			K.value = !1, q.value = null, J.value = "", Y.value = 0;
		}
		async function Ct() {
			let e = U.value;
			if (e) {
				if (!J.value.trim()) {
					w.error("Profile name is required.");
					return;
				}
				bt.value = !0;
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
					X(), await G(e.id);
				} catch (e) {
					w.error(r(e, "Failed to save profile."));
				} finally {
					bt.value = !1;
				}
			}
		}
		let Z = g(null);
		async function wt() {
			let e = U.value, t = Z.value;
			if (!(!e || !t)) try {
				await C.removeProfile(t.id), w.success("Profile deleted."), Z.value = null, await G(e.id);
			} catch (e) {
				w.error(r(e, "Failed to delete profile.")), Z.value = null;
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
			let e = U.value, t = Q.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test($.value) && !/^\d{6}$/.test($.value)) {
					w.error("PIN must be 4 or 6 digits.");
					return;
				}
				Tt.value = !0;
				try {
					await C.setPin(t.id, $.value), w.success("PIN set."), Dt(), await G(e.id);
				} catch (e) {
					w.error(r(e, "Failed to set PIN."));
				} finally {
					Tt.value = !1;
				}
			}
		}
		async function kt(e) {
			let t = U.value;
			if (t) try {
				await C.clearPin(e.id), w.success("PIN cleared."), await G(t.id);
			} catch (e) {
				w.error(r(e, "Failed to clear PIN."));
			}
		}
		function At(e) {
			return ae[e] ?? ae[6];
		}
		return ue(O), (e, t) => (h(), d("section", fe, [
			f("header", pe, [t[17] ||= f("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), m(n, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: at
			}, {
				default: b(() => [...t[16] ||= [p("Add user", -1)]]),
				_: 1
			})]),
			E.value ? (h(), d("div", me, [m(ie, {
				variant: "text",
				lines: 6
			})])) : D.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load users",
				description: D.value
			}, {
				actions: b(() => [m(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: O
				}, {
					default: b(() => [...t[18] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value.length === 0 ? (h(), l(o, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: b(() => [m(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: at
				}, {
					default: b(() => [...t[19] ||= [p("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d(s, { key: 3 }, [A.value.length > 0 ? (h(), d("section", he, [f("h2", ge, [t[20] ||= p(" Pending approval ", -1), m(i, { tone: "warning" }, {
				default: b(() => [p(v(A.value.length), 1)]),
				_: 1
			})]), f("table", _e, [t[23] ||= f("thead", null, [f("tr", null, [
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
				f("td", ve, v(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", ye, [m(n, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => j(e)
				}, {
					default: b(() => [...t[21] ||= [p(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), m(n, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => N.value = e
				}, {
					default: b(() => [...t[22] ||= [p(" Reject ", -1)]]),
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
			])], -1), f("tbody", null, [(h(!0), d(s, null, _(T.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, v(e.username), 1),
				f("td", null, v(e.email), 1),
				f("td", null, [m(i, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: b(() => [p(v(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", null, [m(i, { tone: et(e) }, {
					default: b(() => [p(v($e(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", xe, v(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", Se, [
					k(e) === "pending" ? (h(), l(n, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => j(e)
					}, {
						default: b(() => [...t[24] ||= [p(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : k(e) === "disabled" ? (h(), l(n, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => j(e)
					}, {
						default: b(() => [...t[25] ||= [p(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (h(), l(n, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => M.value = e
					}, {
						default: b(() => [...t[26] ||= [p(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					k(e) === "pending" ? (h(), l(n, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => N.value = e
					}, {
						default: b(() => [...t[27] ||= [p(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : u("", !0),
					m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => ot(e)
					}, {
						default: b(() => [...t[28] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => ut(e, e.is_admin !== 1)
					}, {
						default: b(() => [p(v(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => dt(e)
					}, {
						default: b(() => [...t[29] ||= [p(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => vt(e)
					}, {
						default: b(() => [...t[30] ||= [p(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => B.value = e
					}, {
						default: b(() => [...t[31] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			m(a, {
				modelValue: P.value,
				"onUpdate:modelValue": t[4] ||= (e) => P.value = e,
				title: it.value,
				onClose: st
			}, {
				footer: b(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: st
				}, {
					default: b(() => [...t[35] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(n, {
					variant: "solid",
					size: "sm",
					loading: rt.value,
					onClick: ct
				}, {
					default: b(() => [p(v(F.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [f("form", {
					class: "admin-users__form",
					onSubmit: de(ct, ["prevent"])
				}, [
					f("label", Ce, [t[33] ||= f("span", { class: "admin-users__label" }, "Username", -1), x(f("input", {
						"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, I.value]])]),
					f("label", we, [t[34] ||= f("span", { class: "admin-users__label" }, "Email", -1), x(f("input", {
						"onUpdate:modelValue": t[1] ||= (e) => L.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, L.value]])]),
					f("label", Te, [f("span", Ee, v(F.value ? "Password (leave blank to keep current)" : "Password"), 1), x(f("input", {
						"onUpdate:modelValue": t[2] ||= (e) => R.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: F.value ? "(unchanged)" : void 0,
						required: !F.value
					}, null, 8, De), [[y, R.value]])]),
					m(te, {
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
				footer: b(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => B.value = null
				}, {
					default: b(() => [...t[38] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(n, {
					variant: "solid",
					size: "sm",
					onClick: lt
				}, {
					default: b(() => [...t[39] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [f("p", null, [
					t[36] ||= p(" Delete user ", -1),
					f("strong", null, v(B.value?.username), 1),
					t[37] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": M.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => M.value = null
			}, {
				footer: b(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => M.value = null
				}, {
					default: b(() => [...t[42] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(n, {
					variant: "solid",
					size: "sm",
					onClick: tt
				}, {
					default: b(() => [...t[43] ||= [p("Disable", -1)]]),
					_: 1
				})]),
				default: b(() => [f("p", null, [
					t[40] ||= p(" Disable ", -1),
					f("strong", null, v(M.value?.username), 1),
					t[41] ||= p("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": N.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": t[10] ||= (e) => N.value = null
			}, {
				footer: b(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: t[9] ||= (e) => N.value = null
				}, {
					default: b(() => [...t[46] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(n, {
					variant: "solid",
					size: "sm",
					onClick: nt
				}, {
					default: b(() => [...t[47] ||= [p("Reject", -1)]]),
					_: 1
				})]),
				default: b(() => [f("p", null, [
					t[44] ||= p(" Reject ", -1),
					f("strong", null, v(N.value?.username), 1),
					t[45] ||= p("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": V.value !== null,
				title: V.value ? `Reset password — ${V.value.username}` : "Reset password",
				"onUpdate:modelValue": ft
			}, {
				footer: b(() => [m(n, {
					variant: "solid",
					size: "sm",
					onClick: ft
				}, {
					default: b(() => [...t[52] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [H.value ? (h(), d("div", Oe, [f("p", null, v(H.value.message), 1), f("label", ke, [t[49] ||= f("span", { class: "admin-users__label" }, "New password", -1), f("div", Ae, [f("input", {
					value: H.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, je), m(n, {
					variant: "outline",
					size: "sm",
					onClick: pt
				}, {
					default: b(() => [...t[48] ||= [p("Copy", -1)]]),
					_: 1
				})])])])) : (h(), d("p", Me, [
					t[50] ||= p(" Resetting password for ", -1),
					f("strong", null, v(V.value?.username), 1),
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
				default: b(() => [mt.value ? (h(), d("div", Ne, [m(ie, {
					variant: "text",
					lines: 4
				})])) : (h(), d(s, { key: 1 }, [
					f("div", Pe, [m(n, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: _t.value,
						"aria-label": "Add profile",
						onClick: xt
					}, {
						default: b(() => [p(" Add profile" + v(_t.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					W.value.length === 0 ? (h(), l(o, {
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
					])], -1), f("tbody", null, [(h(!0), d(s, null, _(W.value, (e) => (h(), d("tr", { key: e.id }, [
						f("td", null, v(e.name), 1),
						f("td", null, [m(i, { tone: "info" }, {
							default: b(() => [p(v(At(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						f("td", null, [m(i, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: b(() => [p(v(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						f("td", null, [f("div", Ie, [
							m(n, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => St(e)
							}, {
								default: b(() => [...t[53] ||= [p(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							m(n, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Et(e)
							}, {
								default: b(() => [...t[54] ||= [p(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? u("", !0) : (h(), l(n, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => kt(e)
							}, {
								default: b(() => [...t[55] ||= [p(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							m(n, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => Z.value = e
							}, {
								default: b(() => [...t[56] ||= [p(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					K.value ? (h(), d("div", Le, [f("h3", Re, v(q.value ? "Edit profile" : "Add profile"), 1), f("form", {
						class: "admin-users__form",
						onSubmit: de(Ct, ["prevent"])
					}, [
						f("label", ze, [t[58] ||= f("span", { class: "admin-users__label" }, "Name", -1), x(f("input", {
							"onUpdate:modelValue": t[11] ||= (e) => J.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[y, J.value]])]),
						f("label", Be, [t[59] ||= f("span", { class: "admin-users__label" }, "Rating", -1), m(ne, {
							"model-value": Y.value,
							options: Xe.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => Y.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						f("div", Ve, [m(n, {
							variant: "ghost",
							size: "sm",
							onClick: X
						}, {
							default: b(() => [...t[60] ||= [p("Cancel", -1)]]),
							_: 1
						}), m(n, {
							variant: "solid",
							size: "sm",
							loading: bt.value,
							onClick: Ct
						}, {
							default: b(() => [p(v(q.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : u("", !0),
					Z.value ? (h(), d("div", He, [f("p", null, [
						t[61] ||= p(" Delete profile ", -1),
						f("strong", null, v(Z.value.name), 1),
						t[62] ||= p("? This cannot be undone. ", -1)
					]), f("div", Ue, [m(n, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => Z.value = null
					}, {
						default: b(() => [...t[63] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(n, {
						variant: "solid",
						size: "sm",
						onClick: wt
					}, {
						default: b(() => [...t[64] ||= [p("Delete", -1)]]),
						_: 1
					})])])) : u("", !0),
					Q.value ? (h(), d("div", We, [f("h3", Ge, "Set PIN — " + v(Q.value.name), 1), f("form", {
						class: "admin-users__form",
						onSubmit: de(Ot, ["prevent"])
					}, [f("label", Ke, [t[65] ||= f("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), x(f("input", {
						"onUpdate:modelValue": t[14] ||= (e) => $.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[y, $.value]])]), f("div", qe, [m(n, {
						variant: "ghost",
						size: "sm",
						onClick: Dt
					}, {
						default: b(() => [...t[66] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(n, {
						variant: "solid",
						size: "sm",
						loading: Tt.value,
						onClick: Ot
					}, {
						default: b(() => [...t[67] ||= [p("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : u("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-00122a49"]]);
//#endregion
export { S as default };

//# sourceMappingURL=UsersPage-c1cLdavj.js.map