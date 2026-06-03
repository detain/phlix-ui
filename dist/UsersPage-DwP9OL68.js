import { a as e, i as t, n, r as ee, t as te, u as ne } from "./tokenStore-DfQvvLGI.js";
import { t as r } from "./Modal-CoXJKJI4.js";
import { t as re } from "./EmptyState-Oymq15Ey.js";
import { t as ie } from "./Select-B0YIBPe2.js";
import { t as i } from "./Badge-Cmz5FPqw.js";
import { t as ae } from "./Switch-BymhyT_V.js";
import { n as oe, r as se, t as ce } from "./users-C40iLgkq.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as le, inject as ue, onMounted as de, openBlock as p, ref as m, renderList as fe, toDisplayString as h, vModelText as g, withCtx as _, withDirectives as v, withModifiers as y } from "vue";
//#region src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
var pe = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, me = { class: "admin-users__head" }, he = {
	key: 0,
	class: "admin-users__skel"
}, ge = {
	key: 2,
	class: "admin-users__table",
	"aria-label": "Users"
}, _e = { class: "admin-users__date" }, ve = { class: "admin-users__actions" }, ye = { class: "admin-users__field" }, be = { class: "admin-users__field" }, xe = { class: "admin-users__field" }, Se = { class: "admin-users__label" }, Ce = ["placeholder", "required"], we = { key: 0 }, Te = { class: "admin-users__field" }, Ee = { class: "admin-users__password-row" }, De = ["value"], Oe = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, ke = {
	key: 0,
	class: "admin-users__skel"
}, Ae = { class: "admin-users__profiles-toolbar" }, je = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, Me = { class: "admin-users__actions" }, Ne = {
	key: 2,
	class: "admin-users__subform"
}, Pe = { class: "admin-users__subform-title" }, Fe = { class: "admin-users__field" }, Ie = { class: "admin-users__field" }, Le = { class: "admin-users__subform-actions" }, Re = {
	key: 3,
	class: "admin-users__subform"
}, ze = { class: "admin-users__subform-actions" }, Be = {
	key: 4,
	class: "admin-users__subform"
}, Ve = { class: "admin-users__subform-title" }, He = { class: "admin-users__field" }, Ue = { class: "admin-users__subform-actions" }, We = 5, b = /*#__PURE__*/ ne(/* @__PURE__ */ le({
	__name: "UsersPage",
	props: { client: {} },
	setup(ne) {
		let le = ne, b = ue("apiBase", ""), Ge = o(() => typeof b == "string" ? b : b?.value ?? ""), x = new ce(le.client ?? new e({
			baseUrl: Ge.value,
			tokenStore: new te()
		})), S = t();
		function C(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let Ke = o(() => se.map((e) => ({
			value: e.value,
			label: e.label
		}))), w = m([]), T = m(!0);
		async function E() {
			T.value = !0;
			try {
				w.value = await x.list();
			} catch (e) {
				S.error(C(e, "Failed to load users."));
			} finally {
				T.value = !1;
			}
		}
		let D = m(!1), O = m(null), k = m(""), A = m(""), j = m(""), M = m(!1), N = m(!1), qe = o(() => O.value ? `Edit user — ${O.value.username}` : "Add user");
		function Je() {
			O.value = null, k.value = "", A.value = "", j.value = "", M.value = !1, D.value = !0;
		}
		function Ye(e) {
			O.value = e, k.value = e.username, A.value = e.email, j.value = "", M.value = e.is_admin === 1, D.value = !0;
		}
		function P() {
			D.value = !1, O.value = null;
		}
		async function Xe() {
			if (!k.value.trim() || !A.value.trim()) {
				S.error("Username and email are required.");
				return;
			}
			let e = O.value;
			if (!e && !j.value) {
				S.error("Password is required for new users.");
				return;
			}
			if (!e && j.value.length < 8) {
				S.error("Password must be at least 8 characters.");
				return;
			}
			N.value = !0;
			try {
				if (e) {
					let t = {
						username: k.value,
						email: A.value
					};
					j.value && (t.password = j.value), await x.update(e.id, t);
					let n = +!!M.value;
					e.is_admin !== n && await x.setAdmin(e.id, M.value), S.success("User updated.");
				} else {
					let e = {
						username: k.value,
						email: A.value,
						password: j.value,
						is_admin: M.value
					};
					await x.create(e), S.success("User created.");
				}
				P(), await E();
			} catch (e) {
				S.error(C(e, "Failed to save user."));
			} finally {
				N.value = !1;
			}
		}
		let F = m(null);
		async function Ze() {
			let e = F.value;
			if (e) try {
				await x.remove(e.id), S.success("User deleted."), F.value = null, await E();
			} catch (e) {
				S.error(C(e, "Failed to delete user.")), F.value = null;
			}
		}
		async function Qe(e, t) {
			try {
				await x.setAdmin(e.id, t), S.success(t ? "User promoted to admin." : "Admin status removed."), await E();
			} catch (e) {
				S.error(C(e, "Failed to update admin status."));
			}
		}
		let I = m(null), L = m(null);
		async function $e(e) {
			I.value = e, L.value = null;
			try {
				L.value = await x.resetPassword(e.id);
			} catch (e) {
				S.error(C(e, "Failed to reset password.")), I.value = null;
			}
		}
		function et() {
			I.value = null, L.value = null;
		}
		async function tt() {
			let e = L.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), S.success("Password copied to clipboard.");
			} catch {
				S.error("Could not copy to clipboard.");
			}
		}
		let R = m(null), z = m([]), B = m(!1), nt = o(() => R.value ? `Profiles — ${R.value.username}` : "Profiles"), rt = o({
			get: () => R.value !== null,
			set: (e) => {
				e || at();
			}
		}), V = o(() => z.value.length >= We);
		async function H(e) {
			B.value = !0;
			try {
				z.value = await x.listProfiles(e);
			} catch (e) {
				S.error(C(e, "Failed to load profiles."));
			} finally {
				B.value = !1;
			}
		}
		async function it(e) {
			R.value = e, await H(e.id);
		}
		function at() {
			R.value = null, z.value = [], J(), Y.value = null, $();
		}
		let U = m(!1), W = m(null), G = m(""), K = m(0), q = m(!1);
		function ot() {
			W.value = null, G.value = "", K.value = 0, U.value = !0;
		}
		function st(e) {
			W.value = e, G.value = e.name, K.value = e.rating, U.value = !0;
		}
		function J() {
			U.value = !1, W.value = null, G.value = "", K.value = 0;
		}
		async function ct() {
			let e = R.value;
			if (e) {
				if (!G.value.trim()) {
					S.error("Profile name is required.");
					return;
				}
				q.value = !0;
				try {
					if (W.value) {
						let e = {
							name: G.value,
							rating: K.value
						};
						await x.updateProfile(W.value.id, e), S.success("Profile updated.");
					} else {
						if (V.value) {
							S.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: G.value,
							rating: K.value
						};
						await x.createProfile(e.id, t), S.success("Profile created.");
					}
					J(), await H(e.id);
				} catch (e) {
					S.error(C(e, "Failed to save profile."));
				} finally {
					q.value = !1;
				}
			}
		}
		let Y = m(null);
		async function lt() {
			let e = R.value, t = Y.value;
			if (!(!e || !t)) try {
				await x.removeProfile(t.id), S.success("Profile deleted."), Y.value = null, await H(e.id);
			} catch (e) {
				S.error(C(e, "Failed to delete profile.")), Y.value = null;
			}
		}
		let X = m(null), Z = m(""), Q = m(!1);
		function ut(e) {
			X.value = e, Z.value = "";
		}
		function $() {
			X.value = null, Z.value = "";
		}
		async function dt() {
			let e = R.value, t = X.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test(Z.value) && !/^\d{6}$/.test(Z.value)) {
					S.error("PIN must be 4 or 6 digits.");
					return;
				}
				Q.value = !0;
				try {
					await x.setPin(t.id, Z.value), S.success("PIN set."), $(), await H(e.id);
				} catch (e) {
					S.error(C(e, "Failed to set PIN."));
				} finally {
					Q.value = !1;
				}
			}
		}
		async function ft(e) {
			let t = R.value;
			if (t) try {
				await x.clearPin(e.id), S.success("PIN cleared."), await H(t.id);
			} catch (e) {
				S.error(C(e, "Failed to clear PIN."));
			}
		}
		function pt(e) {
			return oe[e] ?? oe[6];
		}
		return de(E), (e, t) => (p(), l("section", pe, [
			u("header", me, [t[13] ||= u("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), f(n, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Je
			}, {
				default: _(() => [...t[12] ||= [d("Add user", -1)]]),
				_: 1
			})]),
			T.value ? (p(), l("div", he, [f(ee, {
				variant: "text",
				lines: 6
			})])) : w.value.length === 0 ? (p(), s(re, {
				key: 1,
				icon: "user",
				title: "No users yet"
			}, {
				actions: _(() => [f(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Je
				}, {
					default: _(() => [...t[14] ||= [d("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (p(), l("table", ge, [t[19] ||= u("thead", null, [u("tr", null, [
				u("th", { scope: "col" }, "Username"),
				u("th", { scope: "col" }, "Email"),
				u("th", { scope: "col" }, "Role"),
				u("th", { scope: "col" }, "Created"),
				u("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), u("tbody", null, [(p(!0), l(a, null, fe(w.value, (e) => (p(), l("tr", { key: e.id }, [
				u("td", null, h(e.username), 1),
				u("td", null, h(e.email), 1),
				u("td", null, [f(i, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: _(() => [d(h(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				u("td", _e, h(e.created_at.slice(0, 10)), 1),
				u("td", null, [u("div", ve, [
					f(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => Ye(e)
					}, {
						default: _(() => [...t[15] ||= [d(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					f(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => Qe(e, e.is_admin !== 1)
					}, {
						default: _(() => [d(h(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					f(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => $e(e)
					}, {
						default: _(() => [...t[16] ||= [d(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					f(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => it(e)
					}, {
						default: _(() => [...t[17] ||= [d(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					f(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => F.value = e
					}, {
						default: _(() => [...t[18] ||= [d(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			f(r, {
				modelValue: D.value,
				"onUpdate:modelValue": t[4] ||= (e) => D.value = e,
				title: qe.value,
				onClose: P
			}, {
				footer: _(() => [f(n, {
					variant: "ghost",
					size: "sm",
					onClick: P
				}, {
					default: _(() => [...t[22] ||= [d("Cancel", -1)]]),
					_: 1
				}), f(n, {
					variant: "solid",
					size: "sm",
					loading: N.value,
					onClick: Xe
				}, {
					default: _(() => [d(h(O.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: _(() => [u("form", {
					class: "admin-users__form",
					onSubmit: y(Xe, ["prevent"])
				}, [
					u("label", ye, [t[20] ||= u("span", { class: "admin-users__label" }, "Username", -1), v(u("input", {
						"onUpdate:modelValue": t[0] ||= (e) => k.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[g, k.value]])]),
					u("label", be, [t[21] ||= u("span", { class: "admin-users__label" }, "Email", -1), v(u("input", {
						"onUpdate:modelValue": t[1] ||= (e) => A.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[g, A.value]])]),
					u("label", xe, [u("span", Se, h(O.value ? "Password (leave blank to keep current)" : "Password"), 1), v(u("input", {
						"onUpdate:modelValue": t[2] ||= (e) => j.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: O.value ? "(unchanged)" : void 0,
						required: !O.value
					}, null, 8, Ce), [[g, j.value]])]),
					f(ae, {
						modelValue: M.value,
						"onUpdate:modelValue": t[3] ||= (e) => M.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			f(r, {
				"model-value": F.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => F.value = null
			}, {
				footer: _(() => [f(n, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => F.value = null
				}, {
					default: _(() => [...t[25] ||= [d("Cancel", -1)]]),
					_: 1
				}), f(n, {
					variant: "solid",
					size: "sm",
					onClick: Ze
				}, {
					default: _(() => [...t[26] ||= [d("Delete", -1)]]),
					_: 1
				})]),
				default: _(() => [u("p", null, [
					t[23] ||= d(" Delete user ", -1),
					u("strong", null, h(F.value?.username), 1),
					t[24] ||= d("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			f(r, {
				"model-value": I.value !== null,
				title: I.value ? `Reset password — ${I.value.username}` : "Reset password",
				"onUpdate:modelValue": et
			}, {
				footer: _(() => [f(n, {
					variant: "solid",
					size: "sm",
					onClick: et
				}, {
					default: _(() => [...t[31] ||= [d("Close", -1)]]),
					_: 1
				})]),
				default: _(() => [L.value ? (p(), l("div", we, [u("p", null, h(L.value.message), 1), u("label", Te, [t[28] ||= u("span", { class: "admin-users__label" }, "New password", -1), u("div", Ee, [u("input", {
					value: L.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, De), f(n, {
					variant: "outline",
					size: "sm",
					onClick: tt
				}, {
					default: _(() => [...t[27] ||= [d("Copy", -1)]]),
					_: 1
				})])])])) : (p(), l("p", Oe, [
					t[29] ||= d(" Resetting password for ", -1),
					u("strong", null, h(I.value?.username), 1),
					t[30] ||= d("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			f(r, {
				modelValue: rt.value,
				"onUpdate:modelValue": t[11] ||= (e) => rt.value = e,
				title: nt.value,
				size: "lg"
			}, {
				default: _(() => [B.value ? (p(), l("div", ke, [f(ee, {
					variant: "text",
					lines: 4
				})])) : (p(), l(a, { key: 1 }, [
					u("div", Ae, [f(n, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: V.value,
						"aria-label": "Add profile",
						onClick: ot
					}, {
						default: _(() => [d(" Add profile" + h(V.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					z.value.length === 0 ? (p(), s(re, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (p(), l("table", je, [t[36] ||= u("thead", null, [u("tr", null, [
						u("th", { scope: "col" }, "Name"),
						u("th", { scope: "col" }, "Rating"),
						u("th", { scope: "col" }, "PIN"),
						u("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), u("tbody", null, [(p(!0), l(a, null, fe(z.value, (e) => (p(), l("tr", { key: e.id }, [
						u("td", null, h(e.name), 1),
						u("td", null, [f(i, { tone: "info" }, {
							default: _(() => [d(h(pt(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						u("td", null, [f(i, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: _(() => [d(h(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						u("td", null, [u("div", Me, [
							f(n, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => st(e)
							}, {
								default: _(() => [...t[32] ||= [d(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							f(n, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => ut(e)
							}, {
								default: _(() => [...t[33] ||= [d(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? c("", !0) : (p(), s(n, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => ft(e)
							}, {
								default: _(() => [...t[34] ||= [d(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							f(n, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => Y.value = e
							}, {
								default: _(() => [...t[35] ||= [d(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					U.value ? (p(), l("div", Ne, [u("h3", Pe, h(W.value ? "Edit profile" : "Add profile"), 1), u("form", {
						class: "admin-users__form",
						onSubmit: y(ct, ["prevent"])
					}, [
						u("label", Fe, [t[37] ||= u("span", { class: "admin-users__label" }, "Name", -1), v(u("input", {
							"onUpdate:modelValue": t[7] ||= (e) => G.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[g, G.value]])]),
						u("label", Ie, [t[38] ||= u("span", { class: "admin-users__label" }, "Rating", -1), f(ie, {
							"model-value": K.value,
							options: Ke.value,
							label: "Rating",
							"onUpdate:modelValue": t[8] ||= (e) => K.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						u("div", Le, [f(n, {
							variant: "ghost",
							size: "sm",
							onClick: J
						}, {
							default: _(() => [...t[39] ||= [d("Cancel", -1)]]),
							_: 1
						}), f(n, {
							variant: "solid",
							size: "sm",
							loading: q.value,
							onClick: ct
						}, {
							default: _(() => [d(h(W.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : c("", !0),
					Y.value ? (p(), l("div", Re, [u("p", null, [
						t[40] ||= d(" Delete profile ", -1),
						u("strong", null, h(Y.value.name), 1),
						t[41] ||= d("? This cannot be undone. ", -1)
					]), u("div", ze, [f(n, {
						variant: "ghost",
						size: "sm",
						onClick: t[9] ||= (e) => Y.value = null
					}, {
						default: _(() => [...t[42] ||= [d("Cancel", -1)]]),
						_: 1
					}), f(n, {
						variant: "solid",
						size: "sm",
						onClick: lt
					}, {
						default: _(() => [...t[43] ||= [d("Delete", -1)]]),
						_: 1
					})])])) : c("", !0),
					X.value ? (p(), l("div", Be, [u("h3", Ve, "Set PIN — " + h(X.value.name), 1), u("form", {
						class: "admin-users__form",
						onSubmit: y(dt, ["prevent"])
					}, [u("label", He, [t[44] ||= u("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), v(u("input", {
						"onUpdate:modelValue": t[10] ||= (e) => Z.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[g, Z.value]])]), u("div", Ue, [f(n, {
						variant: "ghost",
						size: "sm",
						onClick: $
					}, {
						default: _(() => [...t[45] ||= [d("Cancel", -1)]]),
						_: 1
					}), f(n, {
						variant: "solid",
						size: "sm",
						loading: Q.value,
						onClick: dt
					}, {
						default: _(() => [...t[46] ||= [d("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : c("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-4c2f9520"]]);
//#endregion
export { b as default };

//# sourceMappingURL=UsersPage-DwP9OL68.js.map