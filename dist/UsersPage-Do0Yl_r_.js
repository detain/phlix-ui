import { a as e, f as t, h as n, i as ee, n as te, o as ne, r as re, t as r } from "./Button-C86XulWV.js";
import { t as i } from "./Modal-DaapuyD8.js";
import { t as ie } from "./Select-CjbYOZGH.js";
import { t as a } from "./Badge-BiYXL5Nz.js";
import { t as ae } from "./Switch-BRVGpfuc.js";
import { n as oe, r as se, t as ce } from "./users-C40iLgkq.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as le, inject as ue, onMounted as de, openBlock as m, ref as h, renderList as fe, toDisplayString as g, vModelText as _, withCtx as v, withDirectives as y, withModifiers as b } from "vue";
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
}, Ve = { class: "admin-users__subform-title" }, He = { class: "admin-users__field" }, Ue = { class: "admin-users__subform-actions" }, We = 5, x = /*#__PURE__*/ n(/* @__PURE__ */ le({
	__name: "UsersPage",
	props: { client: {} },
	setup(n) {
		let le = n, x = ue("apiBase", ""), Ge = s(() => typeof x == "string" ? x : x?.value ?? ""), S = new ce(le.client ?? new ne({
			baseUrl: Ge.value,
			tokenStore: new e()
		})), C = ee(), Ke = s(() => se.map((e) => ({
			value: e.value,
			label: e.label
		}))), w = h([]), T = h(!0);
		async function E() {
			T.value = !0;
			try {
				w.value = await S.list();
			} catch (e) {
				C.error(t(e, "Failed to load users."));
			} finally {
				T.value = !1;
			}
		}
		let D = h(!1), O = h(null), k = h(""), A = h(""), j = h(""), M = h(!1), N = h(!1), qe = s(() => O.value ? `Edit user — ${O.value.username}` : "Add user");
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
				C.error("Username and email are required.");
				return;
			}
			let e = O.value;
			if (!e && !j.value) {
				C.error("Password is required for new users.");
				return;
			}
			if (!e && j.value.length < 8) {
				C.error("Password must be at least 8 characters.");
				return;
			}
			N.value = !0;
			try {
				if (e) {
					let t = {
						username: k.value,
						email: A.value
					};
					j.value && (t.password = j.value), await S.update(e.id, t);
					let n = +!!M.value;
					e.is_admin !== n && await S.setAdmin(e.id, M.value), C.success("User updated.");
				} else {
					let e = {
						username: k.value,
						email: A.value,
						password: j.value,
						is_admin: M.value
					};
					await S.create(e), C.success("User created.");
				}
				P(), await E();
			} catch (e) {
				C.error(t(e, "Failed to save user."));
			} finally {
				N.value = !1;
			}
		}
		let F = h(null);
		async function Ze() {
			let e = F.value;
			if (e) try {
				await S.remove(e.id), C.success("User deleted."), F.value = null, await E();
			} catch (e) {
				C.error(t(e, "Failed to delete user.")), F.value = null;
			}
		}
		async function Qe(e, n) {
			try {
				await S.setAdmin(e.id, n), C.success(n ? "User promoted to admin." : "Admin status removed."), await E();
			} catch (e) {
				C.error(t(e, "Failed to update admin status."));
			}
		}
		let I = h(null), L = h(null);
		async function $e(e) {
			I.value = e, L.value = null;
			try {
				L.value = await S.resetPassword(e.id);
			} catch (e) {
				C.error(t(e, "Failed to reset password.")), I.value = null;
			}
		}
		function et() {
			I.value = null, L.value = null;
		}
		async function tt() {
			let e = L.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), C.success("Password copied to clipboard.");
			} catch {
				C.error("Could not copy to clipboard.");
			}
		}
		let R = h(null), z = h([]), B = h(!1), nt = s(() => R.value ? `Profiles — ${R.value.username}` : "Profiles"), rt = s({
			get: () => R.value !== null,
			set: (e) => {
				e || at();
			}
		}), V = s(() => z.value.length >= We);
		async function H(e) {
			B.value = !0;
			try {
				z.value = await S.listProfiles(e);
			} catch (e) {
				C.error(t(e, "Failed to load profiles."));
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
		let U = h(!1), W = h(null), G = h(""), K = h(0), q = h(!1);
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
					C.error("Profile name is required.");
					return;
				}
				q.value = !0;
				try {
					if (W.value) {
						let e = {
							name: G.value,
							rating: K.value
						};
						await S.updateProfile(W.value.id, e), C.success("Profile updated.");
					} else {
						if (V.value) {
							C.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: G.value,
							rating: K.value
						};
						await S.createProfile(e.id, t), C.success("Profile created.");
					}
					J(), await H(e.id);
				} catch (e) {
					C.error(t(e, "Failed to save profile."));
				} finally {
					q.value = !1;
				}
			}
		}
		let Y = h(null);
		async function lt() {
			let e = R.value, n = Y.value;
			if (!(!e || !n)) try {
				await S.removeProfile(n.id), C.success("Profile deleted."), Y.value = null, await H(e.id);
			} catch (e) {
				C.error(t(e, "Failed to delete profile.")), Y.value = null;
			}
		}
		let X = h(null), Z = h(""), Q = h(!1);
		function ut(e) {
			X.value = e, Z.value = "";
		}
		function $() {
			X.value = null, Z.value = "";
		}
		async function dt() {
			let e = R.value, n = X.value;
			if (!(!e || !n)) {
				if (!/^\d{4}$/.test(Z.value) && !/^\d{6}$/.test(Z.value)) {
					C.error("PIN must be 4 or 6 digits.");
					return;
				}
				Q.value = !0;
				try {
					await S.setPin(n.id, Z.value), C.success("PIN set."), $(), await H(e.id);
				} catch (e) {
					C.error(t(e, "Failed to set PIN."));
				} finally {
					Q.value = !1;
				}
			}
		}
		async function ft(e) {
			let n = R.value;
			if (n) try {
				await S.clearPin(e.id), C.success("PIN cleared."), await H(n.id);
			} catch (e) {
				C.error(t(e, "Failed to clear PIN."));
			}
		}
		function pt(e) {
			return oe[e] ?? oe[6];
		}
		return de(E), (e, t) => (m(), u("section", pe, [
			d("header", me, [t[13] ||= d("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), p(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Je
			}, {
				default: v(() => [...t[12] ||= [f("Add user", -1)]]),
				_: 1
			})]),
			T.value ? (m(), u("div", he, [p(te, {
				variant: "text",
				lines: 6
			})])) : w.value.length === 0 ? (m(), c(re, {
				key: 1,
				icon: "user",
				title: "No users yet"
			}, {
				actions: v(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Je
				}, {
					default: v(() => [...t[14] ||= [f("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (m(), u("table", ge, [t[19] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Role"),
				d("th", { scope: "col" }, "Created"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(o, null, fe(w.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, g(e.username), 1),
				d("td", null, g(e.email), 1),
				d("td", null, [p(a, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: v(() => [f(g(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", _e, g(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", ve, [
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => Ye(e)
					}, {
						default: v(() => [...t[15] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => Qe(e, e.is_admin !== 1)
					}, {
						default: v(() => [f(g(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => $e(e)
					}, {
						default: v(() => [...t[16] ||= [f(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => it(e)
					}, {
						default: v(() => [...t[17] ||= [f(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => F.value = e
					}, {
						default: v(() => [...t[18] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			p(i, {
				modelValue: D.value,
				"onUpdate:modelValue": t[4] ||= (e) => D.value = e,
				title: qe.value,
				onClose: P
			}, {
				footer: v(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: P
				}, {
					default: v(() => [...t[22] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					loading: N.value,
					onClick: Xe
				}, {
					default: v(() => [f(g(O.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: v(() => [d("form", {
					class: "admin-users__form",
					onSubmit: b(Xe, ["prevent"])
				}, [
					d("label", ye, [t[20] ||= d("span", { class: "admin-users__label" }, "Username", -1), y(d("input", {
						"onUpdate:modelValue": t[0] ||= (e) => k.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_, k.value]])]),
					d("label", be, [t[21] ||= d("span", { class: "admin-users__label" }, "Email", -1), y(d("input", {
						"onUpdate:modelValue": t[1] ||= (e) => A.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_, A.value]])]),
					d("label", xe, [d("span", Se, g(O.value ? "Password (leave blank to keep current)" : "Password"), 1), y(d("input", {
						"onUpdate:modelValue": t[2] ||= (e) => j.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: O.value ? "(unchanged)" : void 0,
						required: !O.value
					}, null, 8, Ce), [[_, j.value]])]),
					p(ae, {
						modelValue: M.value,
						"onUpdate:modelValue": t[3] ||= (e) => M.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(i, {
				"model-value": F.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => F.value = null
			}, {
				footer: v(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => F.value = null
				}, {
					default: v(() => [...t[25] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					onClick: Ze
				}, {
					default: v(() => [...t[26] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					t[23] ||= f(" Delete user ", -1),
					d("strong", null, g(F.value?.username), 1),
					t[24] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(i, {
				"model-value": I.value !== null,
				title: I.value ? `Reset password — ${I.value.username}` : "Reset password",
				"onUpdate:modelValue": et
			}, {
				footer: v(() => [p(r, {
					variant: "solid",
					size: "sm",
					onClick: et
				}, {
					default: v(() => [...t[31] ||= [f("Close", -1)]]),
					_: 1
				})]),
				default: v(() => [L.value ? (m(), u("div", we, [d("p", null, g(L.value.message), 1), d("label", Te, [t[28] ||= d("span", { class: "admin-users__label" }, "New password", -1), d("div", Ee, [d("input", {
					value: L.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, De), p(r, {
					variant: "outline",
					size: "sm",
					onClick: tt
				}, {
					default: v(() => [...t[27] ||= [f("Copy", -1)]]),
					_: 1
				})])])])) : (m(), u("p", Oe, [
					t[29] ||= f(" Resetting password for ", -1),
					d("strong", null, g(I.value?.username), 1),
					t[30] ||= f("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			p(i, {
				modelValue: rt.value,
				"onUpdate:modelValue": t[11] ||= (e) => rt.value = e,
				title: nt.value,
				size: "lg"
			}, {
				default: v(() => [B.value ? (m(), u("div", ke, [p(te, {
					variant: "text",
					lines: 4
				})])) : (m(), u(o, { key: 1 }, [
					d("div", Ae, [p(r, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: V.value,
						"aria-label": "Add profile",
						onClick: ot
					}, {
						default: v(() => [f(" Add profile" + g(V.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					z.value.length === 0 ? (m(), c(re, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (m(), u("table", je, [t[36] ||= d("thead", null, [d("tr", null, [
						d("th", { scope: "col" }, "Name"),
						d("th", { scope: "col" }, "Rating"),
						d("th", { scope: "col" }, "PIN"),
						d("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), d("tbody", null, [(m(!0), u(o, null, fe(z.value, (e) => (m(), u("tr", { key: e.id }, [
						d("td", null, g(e.name), 1),
						d("td", null, [p(a, { tone: "info" }, {
							default: v(() => [f(g(pt(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						d("td", null, [p(a, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: v(() => [f(g(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						d("td", null, [d("div", Me, [
							p(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => st(e)
							}, {
								default: v(() => [...t[32] ||= [f(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							p(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => ut(e)
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
								onClick: (t) => Y.value = e
							}, {
								default: v(() => [...t[35] ||= [f(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					U.value ? (m(), u("div", Ne, [d("h3", Pe, g(W.value ? "Edit profile" : "Add profile"), 1), d("form", {
						class: "admin-users__form",
						onSubmit: b(ct, ["prevent"])
					}, [
						d("label", Fe, [t[37] ||= d("span", { class: "admin-users__label" }, "Name", -1), y(d("input", {
							"onUpdate:modelValue": t[7] ||= (e) => G.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[_, G.value]])]),
						d("label", Ie, [t[38] ||= d("span", { class: "admin-users__label" }, "Rating", -1), p(ie, {
							"model-value": K.value,
							options: Ke.value,
							label: "Rating",
							"onUpdate:modelValue": t[8] ||= (e) => K.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						d("div", Le, [p(r, {
							variant: "ghost",
							size: "sm",
							onClick: J
						}, {
							default: v(() => [...t[39] ||= [f("Cancel", -1)]]),
							_: 1
						}), p(r, {
							variant: "solid",
							size: "sm",
							loading: q.value,
							onClick: ct
						}, {
							default: v(() => [f(g(W.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : l("", !0),
					Y.value ? (m(), u("div", Re, [d("p", null, [
						t[40] ||= f(" Delete profile ", -1),
						d("strong", null, g(Y.value.name), 1),
						t[41] ||= f("? This cannot be undone. ", -1)
					]), d("div", ze, [p(r, {
						variant: "ghost",
						size: "sm",
						onClick: t[9] ||= (e) => Y.value = null
					}, {
						default: v(() => [...t[42] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(r, {
						variant: "solid",
						size: "sm",
						onClick: lt
					}, {
						default: v(() => [...t[43] ||= [f("Delete", -1)]]),
						_: 1
					})])])) : l("", !0),
					X.value ? (m(), u("div", Be, [d("h3", Ve, "Set PIN — " + g(X.value.name), 1), d("form", {
						class: "admin-users__form",
						onSubmit: b(dt, ["prevent"])
					}, [d("label", He, [t[44] ||= d("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), y(d("input", {
						"onUpdate:modelValue": t[10] ||= (e) => Z.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[_, Z.value]])]), d("div", Ue, [p(r, {
						variant: "ghost",
						size: "sm",
						onClick: $
					}, {
						default: v(() => [...t[45] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(r, {
						variant: "solid",
						size: "sm",
						loading: Q.value,
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
}), [["__scopeId", "data-v-175a4e7a"]]);
//#endregion
export { x as default };

//# sourceMappingURL=UsersPage-Do0Yl_r_.js.map