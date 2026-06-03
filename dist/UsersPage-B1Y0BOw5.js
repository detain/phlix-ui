import { a as e, i as t, m as n, n as ee, r as te, t as r } from "./Button-DjEQ9y17.js";
import { t as i } from "./Modal-BkSAbwHm.js";
import { t as ne } from "./EmptyState-bbKd8GNA.js";
import { t as re } from "./Select-BPlN5xaU.js";
import { t as a } from "./Badge-DobVc76J.js";
import { t as ie } from "./Switch-BNdBMUaS.js";
import { n as ae, r as oe, t as se } from "./users-C40iLgkq.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as ce, inject as le, onMounted as ue, openBlock as m, ref as h, renderList as de, toDisplayString as g, vModelText as _, withCtx as v, withDirectives as y, withModifiers as b } from "vue";
//#region src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, pe = { class: "admin-users__head" }, me = {
	key: 0,
	class: "admin-users__skel"
}, he = {
	key: 2,
	class: "admin-users__table",
	"aria-label": "Users"
}, ge = { class: "admin-users__date" }, _e = { class: "admin-users__actions" }, ve = { class: "admin-users__field" }, ye = { class: "admin-users__field" }, be = { class: "admin-users__field" }, xe = { class: "admin-users__label" }, Se = ["placeholder", "required"], Ce = { key: 0 }, we = { class: "admin-users__field" }, Te = { class: "admin-users__password-row" }, Ee = ["value"], De = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, Oe = {
	key: 0,
	class: "admin-users__skel"
}, ke = { class: "admin-users__profiles-toolbar" }, Ae = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, je = { class: "admin-users__actions" }, Me = {
	key: 2,
	class: "admin-users__subform"
}, Ne = { class: "admin-users__subform-title" }, Pe = { class: "admin-users__field" }, Fe = { class: "admin-users__field" }, Ie = { class: "admin-users__subform-actions" }, Le = {
	key: 3,
	class: "admin-users__subform"
}, Re = { class: "admin-users__subform-actions" }, ze = {
	key: 4,
	class: "admin-users__subform"
}, Be = { class: "admin-users__subform-title" }, Ve = { class: "admin-users__field" }, He = { class: "admin-users__subform-actions" }, Ue = 5, x = /*#__PURE__*/ n(/* @__PURE__ */ ce({
	__name: "UsersPage",
	props: { client: {} },
	setup(n) {
		let ce = n, x = le("apiBase", ""), We = s(() => typeof x == "string" ? x : x?.value ?? ""), S = new se(ce.client ?? new e({
			baseUrl: We.value,
			tokenStore: new t()
		})), C = te();
		function w(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let Ge = s(() => oe.map((e) => ({
			value: e.value,
			label: e.label
		}))), T = h([]), E = h(!0);
		async function D() {
			E.value = !0;
			try {
				T.value = await S.list();
			} catch (e) {
				C.error(w(e, "Failed to load users."));
			} finally {
				E.value = !1;
			}
		}
		let O = h(!1), k = h(null), A = h(""), j = h(""), M = h(""), N = h(!1), P = h(!1), Ke = s(() => k.value ? `Edit user — ${k.value.username}` : "Add user");
		function qe() {
			k.value = null, A.value = "", j.value = "", M.value = "", N.value = !1, O.value = !0;
		}
		function Je(e) {
			k.value = e, A.value = e.username, j.value = e.email, M.value = "", N.value = e.is_admin === 1, O.value = !0;
		}
		function F() {
			O.value = !1, k.value = null;
		}
		async function Ye() {
			if (!A.value.trim() || !j.value.trim()) {
				C.error("Username and email are required.");
				return;
			}
			let e = k.value;
			if (!e && !M.value) {
				C.error("Password is required for new users.");
				return;
			}
			if (!e && M.value.length < 8) {
				C.error("Password must be at least 8 characters.");
				return;
			}
			P.value = !0;
			try {
				if (e) {
					let t = {
						username: A.value,
						email: j.value
					};
					M.value && (t.password = M.value), await S.update(e.id, t);
					let n = +!!N.value;
					e.is_admin !== n && await S.setAdmin(e.id, N.value), C.success("User updated.");
				} else {
					let e = {
						username: A.value,
						email: j.value,
						password: M.value,
						is_admin: N.value
					};
					await S.create(e), C.success("User created.");
				}
				F(), await D();
			} catch (e) {
				C.error(w(e, "Failed to save user."));
			} finally {
				P.value = !1;
			}
		}
		let I = h(null);
		async function Xe() {
			let e = I.value;
			if (e) try {
				await S.remove(e.id), C.success("User deleted."), I.value = null, await D();
			} catch (e) {
				C.error(w(e, "Failed to delete user.")), I.value = null;
			}
		}
		async function Ze(e, t) {
			try {
				await S.setAdmin(e.id, t), C.success(t ? "User promoted to admin." : "Admin status removed."), await D();
			} catch (e) {
				C.error(w(e, "Failed to update admin status."));
			}
		}
		let L = h(null), R = h(null);
		async function Qe(e) {
			L.value = e, R.value = null;
			try {
				R.value = await S.resetPassword(e.id);
			} catch (e) {
				C.error(w(e, "Failed to reset password.")), L.value = null;
			}
		}
		function $e() {
			L.value = null, R.value = null;
		}
		async function et() {
			let e = R.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), C.success("Password copied to clipboard.");
			} catch {
				C.error("Could not copy to clipboard.");
			}
		}
		let z = h(null), B = h([]), V = h(!1), tt = s(() => z.value ? `Profiles — ${z.value.username}` : "Profiles"), nt = s({
			get: () => z.value !== null,
			set: (e) => {
				e || it();
			}
		}), H = s(() => B.value.length >= Ue);
		async function U(e) {
			V.value = !0;
			try {
				B.value = await S.listProfiles(e);
			} catch (e) {
				C.error(w(e, "Failed to load profiles."));
			} finally {
				V.value = !1;
			}
		}
		async function rt(e) {
			z.value = e, await U(e.id);
		}
		function it() {
			z.value = null, B.value = [], Y(), X.value = null, ut();
		}
		let W = h(!1), G = h(null), K = h(""), q = h(0), J = h(!1);
		function at() {
			G.value = null, K.value = "", q.value = 0, W.value = !0;
		}
		function ot(e) {
			G.value = e, K.value = e.name, q.value = e.rating, W.value = !0;
		}
		function Y() {
			W.value = !1, G.value = null, K.value = "", q.value = 0;
		}
		async function st() {
			let e = z.value;
			if (e) {
				if (!K.value.trim()) {
					C.error("Profile name is required.");
					return;
				}
				J.value = !0;
				try {
					if (G.value) {
						let e = {
							name: K.value,
							rating: q.value
						};
						await S.updateProfile(G.value.id, e), C.success("Profile updated.");
					} else {
						if (H.value) {
							C.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: K.value,
							rating: q.value
						};
						await S.createProfile(e.id, t), C.success("Profile created.");
					}
					Y(), await U(e.id);
				} catch (e) {
					C.error(w(e, "Failed to save profile."));
				} finally {
					J.value = !1;
				}
			}
		}
		let X = h(null);
		async function ct() {
			let e = z.value, t = X.value;
			if (!(!e || !t)) try {
				await S.removeProfile(t.id), C.success("Profile deleted."), X.value = null, await U(e.id);
			} catch (e) {
				C.error(w(e, "Failed to delete profile.")), X.value = null;
			}
		}
		let Z = h(null), Q = h(""), $ = h(!1);
		function lt(e) {
			Z.value = e, Q.value = "";
		}
		function ut() {
			Z.value = null, Q.value = "";
		}
		async function dt() {
			let e = z.value, t = Z.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test(Q.value) && !/^\d{6}$/.test(Q.value)) {
					C.error("PIN must be 4 or 6 digits.");
					return;
				}
				$.value = !0;
				try {
					await S.setPin(t.id, Q.value), C.success("PIN set."), ut(), await U(e.id);
				} catch (e) {
					C.error(w(e, "Failed to set PIN."));
				} finally {
					$.value = !1;
				}
			}
		}
		async function ft(e) {
			let t = z.value;
			if (t) try {
				await S.clearPin(e.id), C.success("PIN cleared."), await U(t.id);
			} catch (e) {
				C.error(w(e, "Failed to clear PIN."));
			}
		}
		function pt(e) {
			return ae[e] ?? ae[6];
		}
		return ue(D), (e, t) => (m(), u("section", fe, [
			d("header", pe, [t[13] ||= d("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), p(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: qe
			}, {
				default: v(() => [...t[12] ||= [f("Add user", -1)]]),
				_: 1
			})]),
			E.value ? (m(), u("div", me, [p(ee, {
				variant: "text",
				lines: 6
			})])) : T.value.length === 0 ? (m(), c(ne, {
				key: 1,
				icon: "user",
				title: "No users yet"
			}, {
				actions: v(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: qe
				}, {
					default: v(() => [...t[14] ||= [f("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (m(), u("table", he, [t[19] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Role"),
				d("th", { scope: "col" }, "Created"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(o, null, de(T.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, g(e.username), 1),
				d("td", null, g(e.email), 1),
				d("td", null, [p(a, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: v(() => [f(g(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", ge, g(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", _e, [
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => Je(e)
					}, {
						default: v(() => [...t[15] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => Ze(e, e.is_admin !== 1)
					}, {
						default: v(() => [f(g(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => Qe(e)
					}, {
						default: v(() => [...t[16] ||= [f(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => rt(e)
					}, {
						default: v(() => [...t[17] ||= [f(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => I.value = e
					}, {
						default: v(() => [...t[18] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			p(i, {
				modelValue: O.value,
				"onUpdate:modelValue": t[4] ||= (e) => O.value = e,
				title: Ke.value,
				onClose: F
			}, {
				footer: v(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: F
				}, {
					default: v(() => [...t[22] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					loading: P.value,
					onClick: Ye
				}, {
					default: v(() => [f(g(k.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: v(() => [d("form", {
					class: "admin-users__form",
					onSubmit: b(Ye, ["prevent"])
				}, [
					d("label", ve, [t[20] ||= d("span", { class: "admin-users__label" }, "Username", -1), y(d("input", {
						"onUpdate:modelValue": t[0] ||= (e) => A.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_, A.value]])]),
					d("label", ye, [t[21] ||= d("span", { class: "admin-users__label" }, "Email", -1), y(d("input", {
						"onUpdate:modelValue": t[1] ||= (e) => j.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_, j.value]])]),
					d("label", be, [d("span", xe, g(k.value ? "Password (leave blank to keep current)" : "Password"), 1), y(d("input", {
						"onUpdate:modelValue": t[2] ||= (e) => M.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: k.value ? "(unchanged)" : void 0,
						required: !k.value
					}, null, 8, Se), [[_, M.value]])]),
					p(ie, {
						modelValue: N.value,
						"onUpdate:modelValue": t[3] ||= (e) => N.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(i, {
				"model-value": I.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => I.value = null
			}, {
				footer: v(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => I.value = null
				}, {
					default: v(() => [...t[25] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					onClick: Xe
				}, {
					default: v(() => [...t[26] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					t[23] ||= f(" Delete user ", -1),
					d("strong", null, g(I.value?.username), 1),
					t[24] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(i, {
				"model-value": L.value !== null,
				title: L.value ? `Reset password — ${L.value.username}` : "Reset password",
				"onUpdate:modelValue": $e
			}, {
				footer: v(() => [p(r, {
					variant: "solid",
					size: "sm",
					onClick: $e
				}, {
					default: v(() => [...t[31] ||= [f("Close", -1)]]),
					_: 1
				})]),
				default: v(() => [R.value ? (m(), u("div", Ce, [d("p", null, g(R.value.message), 1), d("label", we, [t[28] ||= d("span", { class: "admin-users__label" }, "New password", -1), d("div", Te, [d("input", {
					value: R.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Ee), p(r, {
					variant: "outline",
					size: "sm",
					onClick: et
				}, {
					default: v(() => [...t[27] ||= [f("Copy", -1)]]),
					_: 1
				})])])])) : (m(), u("p", De, [
					t[29] ||= f(" Resetting password for ", -1),
					d("strong", null, g(L.value?.username), 1),
					t[30] ||= f("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			p(i, {
				modelValue: nt.value,
				"onUpdate:modelValue": t[11] ||= (e) => nt.value = e,
				title: tt.value,
				size: "lg"
			}, {
				default: v(() => [V.value ? (m(), u("div", Oe, [p(ee, {
					variant: "text",
					lines: 4
				})])) : (m(), u(o, { key: 1 }, [
					d("div", ke, [p(r, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: H.value,
						"aria-label": "Add profile",
						onClick: at
					}, {
						default: v(() => [f(" Add profile" + g(H.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					B.value.length === 0 ? (m(), c(ne, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (m(), u("table", Ae, [t[36] ||= d("thead", null, [d("tr", null, [
						d("th", { scope: "col" }, "Name"),
						d("th", { scope: "col" }, "Rating"),
						d("th", { scope: "col" }, "PIN"),
						d("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), d("tbody", null, [(m(!0), u(o, null, de(B.value, (e) => (m(), u("tr", { key: e.id }, [
						d("td", null, g(e.name), 1),
						d("td", null, [p(a, { tone: "info" }, {
							default: v(() => [f(g(pt(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						d("td", null, [p(a, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: v(() => [f(g(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						d("td", null, [d("div", je, [
							p(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => ot(e)
							}, {
								default: v(() => [...t[32] ||= [f(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							p(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => lt(e)
							}, {
								default: v(() => [...t[33] ||= [f(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? l("", !0) : (m(), c(r, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => ft(e)
							}, {
								default: v(() => [...t[34] ||= [f(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							p(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => X.value = e
							}, {
								default: v(() => [...t[35] ||= [f(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					W.value ? (m(), u("div", Me, [d("h3", Ne, g(G.value ? "Edit profile" : "Add profile"), 1), d("form", {
						class: "admin-users__form",
						onSubmit: b(st, ["prevent"])
					}, [
						d("label", Pe, [t[37] ||= d("span", { class: "admin-users__label" }, "Name", -1), y(d("input", {
							"onUpdate:modelValue": t[7] ||= (e) => K.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[_, K.value]])]),
						d("label", Fe, [t[38] ||= d("span", { class: "admin-users__label" }, "Rating", -1), p(re, {
							"model-value": q.value,
							options: Ge.value,
							label: "Rating",
							"onUpdate:modelValue": t[8] ||= (e) => q.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						d("div", Ie, [p(r, {
							variant: "ghost",
							size: "sm",
							onClick: Y
						}, {
							default: v(() => [...t[39] ||= [f("Cancel", -1)]]),
							_: 1
						}), p(r, {
							variant: "solid",
							size: "sm",
							loading: J.value,
							onClick: st
						}, {
							default: v(() => [f(g(G.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : l("", !0),
					X.value ? (m(), u("div", Le, [d("p", null, [
						t[40] ||= f(" Delete profile ", -1),
						d("strong", null, g(X.value.name), 1),
						t[41] ||= f("? This cannot be undone. ", -1)
					]), d("div", Re, [p(r, {
						variant: "ghost",
						size: "sm",
						onClick: t[9] ||= (e) => X.value = null
					}, {
						default: v(() => [...t[42] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(r, {
						variant: "solid",
						size: "sm",
						onClick: ct
					}, {
						default: v(() => [...t[43] ||= [f("Delete", -1)]]),
						_: 1
					})])])) : l("", !0),
					Z.value ? (m(), u("div", ze, [d("h3", Be, "Set PIN — " + g(Z.value.name), 1), d("form", {
						class: "admin-users__form",
						onSubmit: b(dt, ["prevent"])
					}, [d("label", Ve, [t[44] ||= d("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), y(d("input", {
						"onUpdate:modelValue": t[10] ||= (e) => Q.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[_, Q.value]])]), d("div", He, [p(r, {
						variant: "ghost",
						size: "sm",
						onClick: ut
					}, {
						default: v(() => [...t[45] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(r, {
						variant: "solid",
						size: "sm",
						loading: $.value,
						onClick: dt
					}, {
						default: v(() => [...t[46] ||= [f("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : l("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-4c2f9520"]]);
//#endregion
export { x as default };

//# sourceMappingURL=UsersPage-B1Y0BOw5.js.map