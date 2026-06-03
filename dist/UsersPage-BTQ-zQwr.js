import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, n, t as r } from "./Button-BFaMKqH5.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as i } from "./Badge-ArWL5-WE.js";
import { t as te } from "./Switch-CFZhdkXR.js";
import { t as ne } from "./Select-bu72i41G.js";
import { t as a } from "./Modal-DWJvE4oJ.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { n as ie, t as o } from "./EmptyState-Ds4WcVdG.js";
import { n as ae, r as oe, t as se } from "./users-C40iLgkq.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as ce, inject as le, onMounted as ue, openBlock as h, ref as g, renderList as de, toDisplayString as _, vModelText as v, withCtx as y, withDirectives as b, withModifiers as x } from "vue";
//#region src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, pe = { class: "admin-users__head" }, me = {
	key: 0,
	class: "admin-users__skel"
}, he = {
	key: 3,
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
}, Be = { class: "admin-users__subform-title" }, Ve = { class: "admin-users__field" }, He = { class: "admin-users__subform-actions" }, Ue = 5, S = /*#__PURE__*/ e(/* @__PURE__ */ ce({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let ce = e, S = le("apiBase", ""), We = c(() => typeof S == "string" ? S : S?.value ?? ""), C = new se(ce.client ?? new n({
			baseUrl: We.value,
			tokenStore: new ee()
		})), w = re(), Ge = c(() => oe.map((e) => ({
			value: e.value,
			label: e.label
		}))), T = g([]), E = g(!0), D = g(null);
		async function O() {
			E.value = !0, D.value = null;
			try {
				T.value = await C.list();
			} catch (e) {
				D.value = t(e, "Failed to load users."), w.error(D.value);
			} finally {
				E.value = !1;
			}
		}
		let k = g(!1), A = g(null), j = g(""), M = g(""), N = g(""), P = g(!1), F = g(!1), Ke = c(() => A.value ? `Edit user — ${A.value.username}` : "Add user");
		function qe() {
			A.value = null, j.value = "", M.value = "", N.value = "", P.value = !1, k.value = !0;
		}
		function Je(e) {
			A.value = e, j.value = e.username, M.value = e.email, N.value = "", P.value = e.is_admin === 1, k.value = !0;
		}
		function I() {
			k.value = !1, A.value = null;
		}
		async function Ye() {
			if (!j.value.trim() || !M.value.trim()) {
				w.error("Username and email are required.");
				return;
			}
			let e = A.value;
			if (!e && !N.value) {
				w.error("Password is required for new users.");
				return;
			}
			if (!e && N.value.length < 8) {
				w.error("Password must be at least 8 characters.");
				return;
			}
			F.value = !0;
			try {
				if (e) {
					let t = {
						username: j.value,
						email: M.value
					};
					N.value && (t.password = N.value), await C.update(e.id, t);
					let n = +!!P.value;
					e.is_admin !== n && await C.setAdmin(e.id, P.value), w.success("User updated.");
				} else {
					let e = {
						username: j.value,
						email: M.value,
						password: N.value,
						is_admin: P.value
					};
					await C.create(e), w.success("User created.");
				}
				I(), await O();
			} catch (e) {
				w.error(t(e, "Failed to save user."));
			} finally {
				F.value = !1;
			}
		}
		let L = g(null);
		async function Xe() {
			let e = L.value;
			if (e) try {
				await C.remove(e.id), w.success("User deleted."), L.value = null, await O();
			} catch (e) {
				w.error(t(e, "Failed to delete user.")), L.value = null;
			}
		}
		async function Ze(e, n) {
			try {
				await C.setAdmin(e.id, n), w.success(n ? "User promoted to admin." : "Admin status removed."), await O();
			} catch (e) {
				w.error(t(e, "Failed to update admin status."));
			}
		}
		let R = g(null), z = g(null);
		async function Qe(e) {
			R.value = e, z.value = null;
			try {
				z.value = await C.resetPassword(e.id);
			} catch (e) {
				w.error(t(e, "Failed to reset password.")), R.value = null;
			}
		}
		function $e() {
			R.value = null, z.value = null;
		}
		async function et() {
			let e = z.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), w.success("Password copied to clipboard.");
			} catch {
				w.error("Could not copy to clipboard.");
			}
		}
		let B = g(null), V = g([]), H = g(!1), tt = c(() => B.value ? `Profiles — ${B.value.username}` : "Profiles"), nt = c({
			get: () => B.value !== null,
			set: (e) => {
				e || it();
			}
		}), U = c(() => V.value.length >= Ue);
		async function W(e) {
			H.value = !0;
			try {
				V.value = await C.listProfiles(e);
			} catch (e) {
				w.error(t(e, "Failed to load profiles."));
			} finally {
				H.value = !1;
			}
		}
		async function rt(e) {
			B.value = e, await W(e.id);
		}
		function it() {
			B.value = null, V.value = [], X(), Z.value = null, dt();
		}
		let G = g(!1), K = g(null), q = g(""), J = g(0), Y = g(!1);
		function at() {
			K.value = null, q.value = "", J.value = 0, G.value = !0;
		}
		function ot(e) {
			K.value = e, q.value = e.name, J.value = e.rating, G.value = !0;
		}
		function X() {
			G.value = !1, K.value = null, q.value = "", J.value = 0;
		}
		async function st() {
			let e = B.value;
			if (e) {
				if (!q.value.trim()) {
					w.error("Profile name is required.");
					return;
				}
				Y.value = !0;
				try {
					if (K.value) {
						let e = {
							name: q.value,
							rating: J.value
						};
						await C.updateProfile(K.value.id, e), w.success("Profile updated.");
					} else {
						if (U.value) {
							w.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: q.value,
							rating: J.value
						};
						await C.createProfile(e.id, t), w.success("Profile created.");
					}
					X(), await W(e.id);
				} catch (e) {
					w.error(t(e, "Failed to save profile."));
				} finally {
					Y.value = !1;
				}
			}
		}
		let Z = g(null);
		async function ct() {
			let e = B.value, n = Z.value;
			if (!(!e || !n)) try {
				await C.removeProfile(n.id), w.success("Profile deleted."), Z.value = null, await W(e.id);
			} catch (e) {
				w.error(t(e, "Failed to delete profile.")), Z.value = null;
			}
		}
		let Q = g(null), $ = g(""), lt = g(!1);
		function ut(e) {
			Q.value = e, $.value = "";
		}
		function dt() {
			Q.value = null, $.value = "";
		}
		async function ft() {
			let e = B.value, n = Q.value;
			if (!(!e || !n)) {
				if (!/^\d{4}$/.test($.value) && !/^\d{6}$/.test($.value)) {
					w.error("PIN must be 4 or 6 digits.");
					return;
				}
				lt.value = !0;
				try {
					await C.setPin(n.id, $.value), w.success("PIN set."), dt(), await W(e.id);
				} catch (e) {
					w.error(t(e, "Failed to set PIN."));
				} finally {
					lt.value = !1;
				}
			}
		}
		async function pt(e) {
			let n = B.value;
			if (n) try {
				await C.clearPin(e.id), w.success("PIN cleared."), await W(n.id);
			} catch (e) {
				w.error(t(e, "Failed to clear PIN."));
			}
		}
		function mt(e) {
			return ae[e] ?? ae[6];
		}
		return ue(O), (e, t) => (h(), d("section", fe, [
			f("header", pe, [t[13] ||= f("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: qe
			}, {
				default: y(() => [...t[12] ||= [p("Add user", -1)]]),
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
				actions: y(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: O
				}, {
					default: y(() => [...t[14] ||= [p("Retry", -1)]]),
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
					onClick: qe
				}, {
					default: y(() => [...t[15] ||= [p("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d("table", he, [t[20] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Role"),
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
				f("td", ge, _(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", _e, [
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => Je(e)
					}, {
						default: y(() => [...t[16] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => Ze(e, e.is_admin !== 1)
					}, {
						default: y(() => [p(_(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => Qe(e)
					}, {
						default: y(() => [...t[17] ||= [p(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => rt(e)
					}, {
						default: y(() => [...t[18] ||= [p(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => L.value = e
					}, {
						default: y(() => [...t[19] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			m(a, {
				modelValue: k.value,
				"onUpdate:modelValue": t[4] ||= (e) => k.value = e,
				title: Ke.value,
				onClose: I
			}, {
				footer: y(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: I
				}, {
					default: y(() => [...t[23] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: F.value,
					onClick: Ye
				}, {
					default: y(() => [p(_(A.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-users__form",
					onSubmit: x(Ye, ["prevent"])
				}, [
					f("label", ve, [t[21] ||= f("span", { class: "admin-users__label" }, "Username", -1), b(f("input", {
						"onUpdate:modelValue": t[0] ||= (e) => j.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, j.value]])]),
					f("label", ye, [t[22] ||= f("span", { class: "admin-users__label" }, "Email", -1), b(f("input", {
						"onUpdate:modelValue": t[1] ||= (e) => M.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, M.value]])]),
					f("label", be, [f("span", xe, _(A.value ? "Password (leave blank to keep current)" : "Password"), 1), b(f("input", {
						"onUpdate:modelValue": t[2] ||= (e) => N.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: A.value ? "(unchanged)" : void 0,
						required: !A.value
					}, null, 8, Se), [[v, N.value]])]),
					m(te, {
						modelValue: P.value,
						"onUpdate:modelValue": t[3] ||= (e) => P.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(a, {
				"model-value": L.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => L.value = null
			}, {
				footer: y(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => L.value = null
				}, {
					default: y(() => [...t[26] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: Xe
				}, {
					default: y(() => [...t[27] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[24] ||= p(" Delete user ", -1),
					f("strong", null, _(L.value?.username), 1),
					t[25] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": R.value !== null,
				title: R.value ? `Reset password — ${R.value.username}` : "Reset password",
				"onUpdate:modelValue": $e
			}, {
				footer: y(() => [m(r, {
					variant: "solid",
					size: "sm",
					onClick: $e
				}, {
					default: y(() => [...t[32] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: y(() => [z.value ? (h(), d("div", Ce, [f("p", null, _(z.value.message), 1), f("label", we, [t[29] ||= f("span", { class: "admin-users__label" }, "New password", -1), f("div", Te, [f("input", {
					value: z.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Ee), m(r, {
					variant: "outline",
					size: "sm",
					onClick: et
				}, {
					default: y(() => [...t[28] ||= [p("Copy", -1)]]),
					_: 1
				})])])])) : (h(), d("p", De, [
					t[30] ||= p(" Resetting password for ", -1),
					f("strong", null, _(R.value?.username), 1),
					t[31] ||= p("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			m(a, {
				modelValue: nt.value,
				"onUpdate:modelValue": t[11] ||= (e) => nt.value = e,
				title: tt.value,
				size: "lg"
			}, {
				default: y(() => [H.value ? (h(), d("div", Oe, [m(ie, {
					variant: "text",
					lines: 4
				})])) : (h(), d(s, { key: 1 }, [
					f("div", ke, [m(r, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: U.value,
						"aria-label": "Add profile",
						onClick: at
					}, {
						default: y(() => [p(" Add profile" + _(U.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					V.value.length === 0 ? (h(), l(o, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (h(), d("table", Ae, [t[37] ||= f("thead", null, [f("tr", null, [
						f("th", { scope: "col" }, "Name"),
						f("th", { scope: "col" }, "Rating"),
						f("th", { scope: "col" }, "PIN"),
						f("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), f("tbody", null, [(h(!0), d(s, null, de(V.value, (e) => (h(), d("tr", { key: e.id }, [
						f("td", null, _(e.name), 1),
						f("td", null, [m(i, { tone: "info" }, {
							default: y(() => [p(_(mt(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						f("td", null, [m(i, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: y(() => [p(_(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						f("td", null, [f("div", je, [
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => ot(e)
							}, {
								default: y(() => [...t[33] ||= [p(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => ut(e)
							}, {
								default: y(() => [...t[34] ||= [p(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? u("", !0) : (h(), l(r, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => pt(e)
							}, {
								default: y(() => [...t[35] ||= [p(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							m(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => Z.value = e
							}, {
								default: y(() => [...t[36] ||= [p(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					G.value ? (h(), d("div", Me, [f("h3", Ne, _(K.value ? "Edit profile" : "Add profile"), 1), f("form", {
						class: "admin-users__form",
						onSubmit: x(st, ["prevent"])
					}, [
						f("label", Pe, [t[38] ||= f("span", { class: "admin-users__label" }, "Name", -1), b(f("input", {
							"onUpdate:modelValue": t[7] ||= (e) => q.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[v, q.value]])]),
						f("label", Fe, [t[39] ||= f("span", { class: "admin-users__label" }, "Rating", -1), m(ne, {
							"model-value": J.value,
							options: Ge.value,
							label: "Rating",
							"onUpdate:modelValue": t[8] ||= (e) => J.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						f("div", Ie, [m(r, {
							variant: "ghost",
							size: "sm",
							onClick: X
						}, {
							default: y(() => [...t[40] ||= [p("Cancel", -1)]]),
							_: 1
						}), m(r, {
							variant: "solid",
							size: "sm",
							loading: Y.value,
							onClick: st
						}, {
							default: y(() => [p(_(K.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : u("", !0),
					Z.value ? (h(), d("div", Le, [f("p", null, [
						t[41] ||= p(" Delete profile ", -1),
						f("strong", null, _(Z.value.name), 1),
						t[42] ||= p("? This cannot be undone. ", -1)
					]), f("div", Re, [m(r, {
						variant: "ghost",
						size: "sm",
						onClick: t[9] ||= (e) => Z.value = null
					}, {
						default: y(() => [...t[43] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(r, {
						variant: "solid",
						size: "sm",
						onClick: ct
					}, {
						default: y(() => [...t[44] ||= [p("Delete", -1)]]),
						_: 1
					})])])) : u("", !0),
					Q.value ? (h(), d("div", ze, [f("h3", Be, "Set PIN — " + _(Q.value.name), 1), f("form", {
						class: "admin-users__form",
						onSubmit: x(ft, ["prevent"])
					}, [f("label", Ve, [t[45] ||= f("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), b(f("input", {
						"onUpdate:modelValue": t[10] ||= (e) => $.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[v, $.value]])]), f("div", He, [m(r, {
						variant: "ghost",
						size: "sm",
						onClick: dt
					}, {
						default: y(() => [...t[46] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(r, {
						variant: "solid",
						size: "sm",
						loading: lt.value,
						onClick: ft
					}, {
						default: y(() => [...t[47] ||= [p("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : u("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-52092af4"]]);
//#endregion
export { S as default };

//# sourceMappingURL=UsersPage-BTQ-zQwr.js.map