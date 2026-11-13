import { T as e, t } from "./client-COpJNbI3.js";
import { a as n, l as r, n as ee, s as te, t as ne } from "./users-DgRsec5d.js";
import { t as re } from "./useToastStore-CxO_ppM8.js";
import { t as i } from "./Badge-D7vacFbh.js";
import { t as ie } from "./PageHint-C2jY1TZi.js";
import { t as ae } from "./helpLinks-3xhEuW25.js";
import { t as a } from "./Button-Dfl4y6vO.js";
import { t as o } from "./Modal-6aMhfOTF.js";
import { t as oe } from "./Select-Bu7KxTAr.js";
import { t as se } from "./Switch-C607L4Vu.js";
import { t as ce } from "./Skeleton-DDhrDRE7.js";
import { t as le } from "./EmptyState-DjfWh3kt.js";
import { n as ue } from "./Icon-55iG1rR7.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as de, inject as fe, onMounted as pe, openBlock as h, ref as g, renderList as me, toDisplayString as _, unref as he, vModelText as v, watch as ge, withCtx as y, withDirectives as b, withModifiers as _e } from "vue";
// src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
var ve = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, ye = { class: "admin-users__head" }, be = {
	key: 0,
	class: "admin-users__skel"
}, xe = {
	key: 0,
	class: "admin-users__pending",
	"aria-labelledby": "pending-heading"
}, Se = {
	id: "pending-heading",
	class: "admin-users__pending-title"
}, Ce = {
	class: "admin-users__table",
	"aria-label": "Pending users"
}, we = { class: "admin-users__date" }, Te = { class: "admin-users__actions" }, Ee = {
	class: "admin-users__table",
	"aria-label": "Users"
}, De = { class: "admin-users__date" }, Oe = { class: "admin-users__actions" }, ke = { class: "admin-users__field" }, Ae = ["aria-invalid"], je = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, Me = { class: "admin-users__field" }, Ne = ["aria-invalid"], Pe = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, Fe = { class: "admin-users__field" }, Ie = { class: "admin-users__label" }, Le = ["placeholder", "aria-invalid"], Re = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, ze = { key: 0 }, Be = { class: "admin-users__field" }, Ve = { class: "admin-users__password-row" }, He = ["value"], Ue = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, We = {
	key: 0,
	class: "admin-users__skel"
}, Ge = { class: "admin-users__profiles-toolbar" }, Ke = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, qe = { class: "admin-users__actions" }, Je = {
	key: 2,
	class: "admin-users__subform"
}, Ye = { class: "admin-users__subform-title" }, Xe = { class: "admin-users__field" }, Ze = ["aria-invalid"], Qe = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, $e = { class: "admin-users__field" }, et = { class: "admin-users__subform-actions" }, tt = {
	key: 3,
	class: "admin-users__subform"
}, nt = { class: "admin-users__subform-actions" }, rt = {
	key: 4,
	class: "admin-users__subform"
}, it = { class: "admin-users__subform-title" }, at = { class: "admin-users__field" }, ot = ["aria-invalid"], st = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, ct = { class: "admin-users__subform-actions" }, lt = {
	key: 0,
	class: "admin-users__skel"
}, ut = { class: "admin-users__relay-section" }, dt = { class: "admin-users__field" }, ft = { class: "admin-users__relay-section" }, pt = { class: "admin-users__relay-note" }, mt = { class: "admin-users__field" }, ht = ["aria-invalid"], gt = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, _t = { class: "admin-users__field" }, vt = ["aria-invalid"], yt = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, bt = { class: "admin-users__field" }, xt = ["aria-invalid"], St = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, Ct = 5, wt = 1024 ** 3, Tt = 0x4000000000000, Et = 1e3, Dt = /*#__PURE__*/ ue(/* @__PURE__ */ de({
	__name: "UsersPage",
	props: { client: {} },
	setup(ue) {
		let de = ue, Dt = fe("apiBase", ""), Ot = c(() => typeof Dt == "string" ? Dt : Dt?.value ?? ""), x = new ne(de.client ?? new t({ baseUrl: Ot.value })), S = re(), kt = fe("phlixConfig", null), At = c(() => kt?.app === "hub"), jt = c(() => te.map((e) => ({
			value: e.value,
			label: e.label
		}))), Mt = g([]), Nt = g(!0), Pt = g(null);
		async function C() {
			Nt.value = !0, Pt.value = null;
			try {
				Mt.value = await x.list();
			} catch (t) {
				Pt.value = e(t, "Failed to load users."), S.error(Pt.value);
			} finally {
				Nt.value = !1;
			}
		}
		function w(e) {
			return e.status ?? "active";
		}
		let Ft = c(() => Mt.value.filter((e) => w(e) === "pending")), It = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, Lt = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function Rt(e) {
			return It[w(e)];
		}
		function zt(e) {
			return Lt[w(e)];
		}
		async function Bt(t) {
			try {
				await x.approve(t.id), S.success(`${t.username} approved.`), await C();
			} catch (t) {
				S.error(e(t, "Failed to approve user."));
			}
		}
		let T = g(null);
		async function Vt() {
			let t = T.value;
			if (t) try {
				await x.disable(t.id), S.success(`${t.username} disabled.`), T.value = null, await C();
			} catch (t) {
				S.error(e(t, "Failed to disable user.")), T.value = null;
			}
		}
		let E = g(null);
		async function Ht() {
			let t = E.value;
			if (t) try {
				await x.reject(t.id), S.success(`${t.username}'s signup rejected.`), E.value = null, await C();
			} catch (t) {
				S.error(e(t, "Failed to reject user.")), E.value = null;
			}
		}
		let D = g(!1), O = g(null), k = g(""), A = g(""), j = g(""), M = g(!1), Ut = g(!1), N = g(null), P = g(null), F = g(null), Wt = /^[^\s@]+@[^\s@]+$/;
		function Gt() {
			N.value = null, P.value = null, F.value = null;
		}
		ge(k, () => {
			N.value = null;
		}), ge(A, () => {
			P.value = null;
		}), ge(j, () => {
			F.value = null;
		});
		function Kt() {
			Gt();
			let e = O.value, t = !0;
			return k.value.trim() || (N.value = "Username is required.", t = !1), A.value.trim() ? Wt.test(A.value.trim()) || (P.value = "Enter a valid email address.", t = !1) : (P.value = "Email is required.", t = !1), e || (j.value ? j.value.length < 8 && (F.value = "Password must be at least 8 characters.", t = !1) : (F.value = "Password is required for new users.", t = !1)), t;
		}
		let qt = c(() => O.value ? `Edit user — ${O.value.username}` : "Add user");
		function Jt() {
			O.value = null, k.value = "", A.value = "", j.value = "", M.value = !1, Gt(), D.value = !0;
		}
		function Yt(e) {
			O.value = e, k.value = e.username, A.value = e.email, j.value = "", M.value = e.is_admin, Gt(), D.value = !0;
		}
		function Xt() {
			D.value = !1, O.value = null, Gt();
		}
		async function Zt() {
			if (!Kt()) {
				S.error("Fix the highlighted values before saving.");
				return;
			}
			let t = O.value;
			Ut.value = !0;
			try {
				if (t) {
					let n = {
						username: k.value,
						email: A.value
					};
					if (j.value && (n.password = j.value), await x.update(t.id, n), t.is_admin !== M.value) try {
						await x.setAdmin(t.id, M.value);
					} catch (t) {
						S.error(e(t, "Profile saved, but the admin flag change failed.")), Xt(), await C();
						return;
					}
					S.success("User updated.");
				} else {
					let e = {
						username: k.value,
						email: A.value,
						password: j.value,
						is_admin: M.value
					};
					await x.create(e), S.success("User created.");
				}
				Xt(), await C();
			} catch (t) {
				S.error(e(t, "Failed to save user."));
			} finally {
				Ut.value = !1;
			}
		}
		let I = g(null);
		async function Qt() {
			let t = I.value;
			if (t) try {
				await x.remove(t.id), S.success("User deleted."), I.value = null, await C();
			} catch (t) {
				S.error(e(t, "Failed to delete user.")), I.value = null;
			}
		}
		async function $t(t, n) {
			try {
				await x.setAdmin(t.id, n), S.success(n ? "User promoted to admin." : "Admin status removed."), await C();
			} catch (t) {
				S.error(e(t, "Failed to update admin status."));
			}
		}
		let L = g(null), R = g(null);
		async function en(t) {
			L.value = t, R.value = null;
			try {
				R.value = await x.resetPassword(t.id);
			} catch (t) {
				S.error(e(t, "Failed to reset password.")), L.value = null;
			}
		}
		function tn() {
			L.value = null, R.value = null;
		}
		async function nn() {
			let e = R.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), S.success("Password copied to clipboard.");
			} catch {
				S.error("Could not copy to clipboard.");
			}
		}
		let z = g(null), B = g([]), rn = g(!1), an = c(() => z.value ? `Profiles — ${z.value.username}` : "Profiles"), on = c({
			get: () => z.value !== null,
			set: (e) => {
				e || ln();
			}
		}), sn = c(() => B.value.length >= Ct);
		async function V(t) {
			rn.value = !0;
			try {
				B.value = await x.listProfiles(t);
			} catch (t) {
				S.error(e(t, "Failed to load profiles."));
			} finally {
				rn.value = !1;
			}
		}
		async function cn(e) {
			z.value = e, await V(e.id);
		}
		function ln() {
			z.value = null, B.value = [], mn(), K.value = null, bn();
		}
		let un = g(!1), H = g(null), U = g(""), W = g(0), dn = g(!1), G = g(null);
		function fn() {
			H.value = null, U.value = "", W.value = 0, G.value = null, un.value = !0;
		}
		function pn(e) {
			H.value = e, U.value = e.name, W.value = e.rating, G.value = null, un.value = !0;
		}
		function mn() {
			un.value = !1, H.value = null, U.value = "", W.value = 0, G.value = null;
		}
		async function hn() {
			let t = z.value;
			if (t) {
				if (G.value = null, !U.value.trim()) G.value = "Profile name is required.", S.error("Fix the highlighted values before saving.");
				else {
					dn.value = !0;
					try {
						if (H.value) {
							let e = {
								name: U.value,
								rating: W.value
							};
							await x.updateProfile(H.value.id, e), S.success("Profile updated.");
						} else {
							if (sn.value) {
								S.error("Maximum 5 profiles allowed.");
								return;
							}
							let e = {
								name: U.value,
								rating: W.value
							};
							await x.createProfile(t.id, e), S.success("Profile created.");
						}
						mn(), await V(t.id);
					} catch (t) {
						S.error(e(t, "Failed to save profile."));
					} finally {
						dn.value = !1;
					}
				}
			}
		}
		let K = g(null);
		async function gn() {
			let t = z.value, n = K.value;
			if (t && n) try {
				await x.removeProfile(n.id), S.success("Profile deleted."), K.value = null, await V(t.id);
			} catch (t) {
				S.error(e(t, "Failed to delete profile.")), K.value = null;
			}
		}
		let _n = g(null), q = g(""), vn = g(!1), J = g(null);
		function yn(e) {
			_n.value = e, q.value = "", J.value = null;
		}
		function bn() {
			_n.value = null, q.value = "", J.value = null;
		}
		async function xn() {
			let t = z.value, n = _n.value;
			if (t && n) {
				if (J.value = null, !/^\d{4}$/.test(q.value) && !/^\d{6}$/.test(q.value)) J.value = "PIN must be 4 or 6 digits.", S.error("Fix the highlighted values before saving.");
				else {
					vn.value = !0;
					try {
						await x.setPin(n.id, q.value), S.success("PIN set."), bn(), await V(t.id);
					} catch (t) {
						S.error(e(t, "Failed to set PIN."));
					} finally {
						vn.value = !1;
					}
				}
			}
		}
		async function Sn(t) {
			let n = z.value;
			if (n) try {
				await x.clearPin(t.id), S.success("PIN cleared."), await V(n.id);
			} catch (t) {
				S.error(e(t, "Failed to clear PIN."));
			}
		}
		let Cn = c(() => r.map((e) => ({
			value: e.value,
			label: e.label
		}))), Y = g(null), wn = g(!1), Tn = g(!1), X = g(null), En = g(ee), Z = g("0"), Q = g("0"), $ = g("0"), Dn = g(null), On = g(null), kn = g(null), An = g({
			quotaInGiB: "0",
			quotaOutGiB: "0",
			maxStreams: "0"
		}), jn = c(() => Y.value ? `Relay limits — ${Y.value.username}` : "Relay limits"), Mn = c({
			get: () => Y.value !== null,
			set: (e) => {
				e || Rn();
			}
		});
		function Nn(e) {
			return e ? String(Number((e / wt).toFixed(6))) : "0";
		}
		function Pn(e) {
			let t = typeof e == "number" ? e : Number(e);
			if (!Number.isFinite(t) || t < 0) return null;
			let n = Math.round(t * wt);
			return n > Tt ? null : n;
		}
		function Fn(e) {
			let t = typeof e == "number" ? e : Number(e);
			return !Number.isInteger(t) || t < 0 || t > Et ? null : t;
		}
		function In(e) {
			if (e <= 0) return "0 B";
			let t = [
				"B",
				"KiB",
				"MiB",
				"GiB",
				"TiB",
				"PiB"
			], n = Math.min(t.length - 1, Math.floor(Math.log(e) / Math.log(1024))), r = e / 1024 ** n;
			return `${n === 0 ? r : Number(r.toFixed(2))} ${t[n]}`;
		}
		async function Ln(t) {
			Y.value = t, X.value = null, Dn.value = null, On.value = null, kn.value = null, wn.value = !0;
			try {
				let e = await x.getBandwidth(t.id);
				X.value = e, En.value = e.throttle_bps, Z.value = Nn(e.quota_bytes_in), Q.value = Nn(e.quota_bytes_out), $.value = String(e.max_concurrent_streams), An.value = {
					quotaInGiB: String(Z.value),
					quotaOutGiB: String(Q.value),
					maxStreams: String($.value)
				};
			} catch (t) {
				S.error(e(t, "Failed to load relay limits.")), Y.value = null;
			} finally {
				wn.value = !1;
			}
		}
		function Rn() {
			Y.value = null, X.value = null;
		}
		async function zn() {
			let t = Y.value, n = X.value;
			if (!t || !n) return;
			let r = Pn(Z.value), ee = Pn(Q.value), te = Fn($.value);
			if (Dn.value = r === null ? "Non-negative GiB, ≤ 1 PiB (0 = unlimited)." : null, On.value = ee === null ? "Non-negative GiB, ≤ 1 PiB (0 = unlimited)." : null, kn.value = te === null ? "A whole number 0–1000 (0 = unlimited)." : null, r === null || ee === null || te === null) {
				S.error("Fix the highlighted values before saving.");
				return;
			}
			let ne = An.value, re = En.value !== n.throttle_bps, i = String(Z.value) !== ne.quotaInGiB || String(Q.value) !== ne.quotaOutGiB || String($.value) !== ne.maxStreams;
			if (!re && !i) S.error("No changes to save.");
			else {
				Tn.value = !0;
				try {
					if (re && await x.setThrottle(t.id, En.value), i) {
						let e = {
							quota_bytes_in: r,
							quota_bytes_out: ee,
							max_concurrent_streams: te
						};
						await x.setQuota(t.id, e);
					}
					S.success("Relay limits saved."), Rn();
				} catch (t) {
					S.error(e(t, "Failed to save relay limits."));
				} finally {
					Tn.value = !1;
				}
			}
		}
		function Bn(e) {
			return n[e] ?? n[12];
		}
		return pe(C), (e, t) => (h(), d("section", ve, [
			f("header", ye, [t[22] ||= f("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), m(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Jt
			}, {
				default: y(() => [...t[21] ||= [p("Add user", -1)]]),
				_: 1
			})]),
			m(ie, {
				links: he(ae).users.links,
				details: he(ae).users.details
			}, {
				default: y(() => [...t[23] ||= [
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
					p(" manages a user’s watch profiles and their optional PINs. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			Nt.value ? (h(), d("div", be, [m(ce, {
				variant: "text",
				lines: 6
			})])) : Pt.value ? (h(), l(le, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load users",
				description: Pt.value
			}, {
				actions: y(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: C
				}, {
					default: y(() => [...t[24] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Mt.value.length === 0 ? (h(), l(le, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: y(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Jt
				}, {
					default: y(() => [...t[25] ||= [p("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d(s, { key: 3 }, [Ft.value.length > 0 ? (h(), d("section", xe, [f("h2", Se, [t[26] ||= p(" Pending approval ", -1), m(i, { tone: "warning" }, {
				default: y(() => [p(_(Ft.value.length), 1)]),
				_: 1
			})]), f("table", Ce, [t[29] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Requested"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, me(Ft.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, _(e.username), 1),
				f("td", null, _(e.email), 1),
				f("td", we, _(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", Te, [m(a, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => Bt(e)
				}, {
					default: y(() => [...t[27] ||= [p(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), m(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => E.value = e
				}, {
					default: y(() => [...t[28] ||= [p(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : u("", !0), f("table", Ee, [t[39] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Role"),
				f("th", { scope: "col" }, "Status"),
				f("th", { scope: "col" }, "Created"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, me(Mt.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, _(e.username), 1),
				f("td", null, _(e.email), 1),
				f("td", null, [m(i, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: y(() => [p(_(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", null, [m(i, { tone: zt(e) }, {
					default: y(() => [p(_(Rt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", De, _(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", Oe, [
					w(e) === "pending" ? (h(), l(a, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => Bt(e)
					}, {
						default: y(() => [...t[30] ||= [p(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : w(e) === "disabled" ? (h(), l(a, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => Bt(e)
					}, {
						default: y(() => [...t[31] ||= [p(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (h(), l(a, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => T.value = e
					}, {
						default: y(() => [...t[32] ||= [p(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					w(e) === "pending" ? (h(), l(a, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => E.value = e
					}, {
						default: y(() => [...t[33] ||= [p(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : u("", !0),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => Yt(e)
					}, {
						default: y(() => [...t[34] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => $t(e, !e.is_admin)
					}, {
						default: y(() => [p(_(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => en(e)
					}, {
						default: y(() => [...t[35] ||= [p(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => cn(e)
					}, {
						default: y(() => [...t[36] ||= [p(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					At.value ? (h(), l(a, {
						key: 4,
						variant: "ghost",
						size: "sm",
						"aria-label": `Relay limits for ${e.username}`,
						onClick: (t) => Ln(e)
					}, {
						default: y(() => [...t[37] ||= [p(" Relay ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : u("", !0),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => I.value = e
					}, {
						default: y(() => [...t[38] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			m(o, {
				modelValue: D.value,
				"onUpdate:modelValue": t[4] ||= (e) => D.value = e,
				title: qt.value,
				onClose: Xt
			}, {
				footer: y(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: Xt
				}, {
					default: y(() => [...t[42] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					type: "submit",
					form: "admin-user-form",
					variant: "solid",
					size: "sm",
					loading: Ut.value
				}, {
					default: y(() => [p(_(O.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					id: "admin-user-form",
					class: "admin-users__form",
					onSubmit: _e(Zt, ["prevent"])
				}, [
					f("label", ke, [
						t[40] ||= f("span", { class: "admin-users__label" }, "Username", -1),
						b(f("input", {
							"onUpdate:modelValue": t[0] ||= (e) => k.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							"aria-invalid": N.value ? "true" : void 0
						}, null, 8, Ae), [[v, k.value]]),
						N.value ? (h(), d("span", je, _(N.value), 1)) : u("", !0)
					]),
					f("label", Me, [
						t[41] ||= f("span", { class: "admin-users__label" }, "Email", -1),
						b(f("input", {
							"onUpdate:modelValue": t[1] ||= (e) => A.value = e,
							type: "text",
							inputmode: "email",
							class: "admin-users__input",
							autocomplete: "off",
							"aria-invalid": P.value ? "true" : void 0
						}, null, 8, Ne), [[v, A.value]]),
						P.value ? (h(), d("span", Pe, _(P.value), 1)) : u("", !0)
					]),
					f("label", Fe, [
						f("span", Ie, _(O.value ? "Password (leave blank to keep current)" : "Password"), 1),
						b(f("input", {
							"onUpdate:modelValue": t[2] ||= (e) => j.value = e,
							type: "password",
							class: "admin-users__input",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other",
							placeholder: O.value ? "(unchanged)" : void 0,
							"aria-invalid": F.value ? "true" : void 0
						}, null, 8, Le), [[v, j.value]]),
						F.value ? (h(), d("span", Re, _(F.value), 1)) : u("", !0)
					]),
					m(se, {
						modelValue: M.value,
						"onUpdate:modelValue": t[3] ||= (e) => M.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(o, {
				"model-value": I.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => I.value = null
			}, {
				footer: y(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => I.value = null
				}, {
					default: y(() => [...t[45] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "danger",
					size: "sm",
					onClick: Qt
				}, {
					default: y(() => [...t[46] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[43] ||= p(" Delete user ", -1),
					f("strong", null, _(I.value?.username), 1),
					t[44] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(o, {
				"model-value": T.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => T.value = null
			}, {
				footer: y(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => T.value = null
				}, {
					default: y(() => [...t[49] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					onClick: Vt
				}, {
					default: y(() => [...t[50] ||= [p("Disable", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[47] ||= p(" Disable ", -1),
					f("strong", null, _(T.value?.username), 1),
					t[48] ||= p("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(o, {
				"model-value": E.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": t[10] ||= (e) => E.value = null
			}, {
				footer: y(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[9] ||= (e) => E.value = null
				}, {
					default: y(() => [...t[53] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					onClick: Ht
				}, {
					default: y(() => [...t[54] ||= [p("Reject", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[51] ||= p(" Reject ", -1),
					f("strong", null, _(E.value?.username), 1),
					t[52] ||= p("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(o, {
				"model-value": L.value !== null,
				title: L.value ? `Reset password — ${L.value.username}` : "Reset password",
				"onUpdate:modelValue": tn
			}, {
				footer: y(() => [m(a, {
					variant: "solid",
					size: "sm",
					onClick: tn
				}, {
					default: y(() => [...t[59] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: y(() => [R.value ? (h(), d("div", ze, [f("p", null, _(R.value.message), 1), f("label", Be, [t[56] ||= f("span", { class: "admin-users__label" }, "New password", -1), f("div", Ve, [f("input", {
					value: R.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, He), m(a, {
					variant: "outline",
					size: "sm",
					onClick: nn
				}, {
					default: y(() => [...t[55] ||= [p("Copy", -1)]]),
					_: 1
				})])])])) : (h(), d("p", Ue, [
					t[57] ||= p(" Resetting password for ", -1),
					f("strong", null, _(L.value?.username), 1),
					t[58] ||= p("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			m(o, {
				modelValue: on.value,
				"onUpdate:modelValue": t[15] ||= (e) => on.value = e,
				title: an.value,
				size: "lg"
			}, {
				default: y(() => [rn.value ? (h(), d("div", We, [m(ce, {
					variant: "text",
					lines: 4
				})])) : (h(), d(s, { key: 1 }, [
					f("div", Ge, [m(a, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: sn.value,
						"aria-label": "Add profile",
						onClick: fn
					}, {
						default: y(() => [p(" Add profile" + _(sn.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					B.value.length === 0 ? (h(), l(le, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (h(), d("table", Ke, [t[64] ||= f("thead", null, [f("tr", null, [
						f("th", { scope: "col" }, "Name"),
						f("th", { scope: "col" }, "Rating"),
						f("th", { scope: "col" }, "PIN"),
						f("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), f("tbody", null, [(h(!0), d(s, null, me(B.value, (e) => (h(), d("tr", { key: e.id }, [
						f("td", null, _(e.name), 1),
						f("td", null, [m(i, { tone: "info" }, {
							default: y(() => [p(_(Bn(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						f("td", null, [m(i, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: y(() => [p(_(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						f("td", null, [f("div", qe, [
							m(a, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => pn(e)
							}, {
								default: y(() => [...t[60] ||= [p(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							m(a, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => yn(e)
							}, {
								default: y(() => [...t[61] ||= [p(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? u("", !0) : (h(), l(a, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => Sn(e)
							}, {
								default: y(() => [...t[62] ||= [p(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							m(a, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => K.value = e
							}, {
								default: y(() => [...t[63] ||= [p(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					un.value ? (h(), d("div", Je, [f("h3", Ye, _(H.value ? "Edit profile" : "Add profile"), 1), f("form", {
						class: "admin-users__form",
						onSubmit: _e(hn, ["prevent"])
					}, [
						f("label", Xe, [
							t[65] ||= f("span", { class: "admin-users__label" }, "Name", -1),
							b(f("input", {
								"onUpdate:modelValue": t[11] ||= (e) => U.value = e,
								type: "text",
								class: "admin-users__input",
								autocomplete: "off",
								"aria-invalid": G.value ? "true" : void 0
							}, null, 8, Ze), [[v, U.value]]),
							G.value ? (h(), d("span", Qe, _(G.value), 1)) : u("", !0)
						]),
						f("label", $e, [t[66] ||= f("span", { class: "admin-users__label" }, "Rating", -1), m(oe, {
							"model-value": W.value,
							options: jt.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => W.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						f("div", et, [m(a, {
							variant: "ghost",
							size: "sm",
							onClick: mn
						}, {
							default: y(() => [...t[67] ||= [p("Cancel", -1)]]),
							_: 1
						}), m(a, {
							type: "submit",
							variant: "solid",
							size: "sm",
							loading: dn.value
						}, {
							default: y(() => [p(_(H.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : u("", !0),
					K.value ? (h(), d("div", tt, [f("p", null, [
						t[68] ||= p(" Delete profile ", -1),
						f("strong", null, _(K.value.name), 1),
						t[69] ||= p("? This cannot be undone. ", -1)
					]), f("div", nt, [m(a, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => K.value = null
					}, {
						default: y(() => [...t[70] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(a, {
						variant: "danger",
						size: "sm",
						onClick: gn
					}, {
						default: y(() => [...t[71] ||= [p("Delete", -1)]]),
						_: 1
					})])])) : u("", !0),
					_n.value ? (h(), d("div", rt, [f("h3", it, "Set PIN — " + _(_n.value.name), 1), f("form", {
						class: "admin-users__form",
						onSubmit: _e(xn, ["prevent"])
					}, [f("label", at, [
						t[72] ||= f("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1),
						b(f("input", {
							"onUpdate:modelValue": t[14] ||= (e) => q.value = e,
							type: "password",
							class: "admin-users__input",
							inputmode: "numeric",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other",
							placeholder: "1234 or 123456",
							"aria-invalid": J.value ? "true" : void 0
						}, null, 8, ot), [[v, q.value]]),
						J.value ? (h(), d("span", st, _(J.value), 1)) : u("", !0)
					]), f("div", ct, [m(a, {
						variant: "ghost",
						size: "sm",
						onClick: bn
					}, {
						default: y(() => [...t[73] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(a, {
						type: "submit",
						variant: "solid",
						size: "sm",
						loading: vn.value
					}, {
						default: y(() => [...t[74] ||= [p("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : u("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(o, {
				modelValue: Mn.value,
				"onUpdate:modelValue": t[20] ||= (e) => Mn.value = e,
				title: jn.value
			}, {
				footer: y(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: Rn
				}, {
					default: y(() => [...t[87] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					type: "submit",
					form: "admin-relay-form",
					variant: "solid",
					size: "sm",
					loading: Tn.value,
					disabled: !X.value
				}, {
					default: y(() => [...t[88] ||= [p(" Save ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: y(() => [wn.value ? (h(), d("div", lt, [m(ce, {
					variant: "text",
					lines: 4
				})])) : X.value ? (h(), d("form", {
					key: 1,
					id: "admin-relay-form",
					class: "admin-users__relay",
					onSubmit: _e(zn, ["prevent"])
				}, [f("div", ut, [
					t[76] ||= f("h3", { class: "admin-users__subform-title" }, "Bandwidth throttle", -1),
					t[77] ||= f("p", { class: "admin-users__relay-note" }, [
						p(" A hard cap on the relay stream rate (not a monthly total). The default is 3 Mbps; "),
						f("strong", null, "Unlimited"),
						p(" turns the throttle off for this user. ")
					], -1),
					f("label", dt, [t[75] ||= f("span", { class: "admin-users__label" }, "Throttle", -1), m(oe, {
						"model-value": En.value,
						options: Cn.value,
						label: "Throttle",
						"onUpdate:modelValue": t[16] ||= (e) => En.value = Number(e)
					}, null, 8, ["model-value", "options"])])
				]), f("div", ft, [
					t[86] ||= f("h3", { class: "admin-users__subform-title" }, "Monthly quota", -1),
					f("p", pt, [
						t[78] ||= p(" Per-calendar-month byte caps and a concurrent-stream cap. Enter ", -1),
						t[79] ||= f("strong", null, "0", -1),
						t[80] ||= p(" for unlimited. Used this period: ", -1),
						f("strong", null, _(In(X.value.bytes_in)), 1),
						t[81] ||= p(" down / ", -1),
						f("strong", null, _(In(X.value.bytes_out)), 1),
						t[82] ||= p(" up. ", -1)
					]),
					f("label", mt, [
						t[83] ||= f("span", { class: "admin-users__label" }, "Download cap (GiB, 0 = unlimited)", -1),
						b(f("input", {
							"onUpdate:modelValue": t[17] ||= (e) => Z.value = e,
							type: "number",
							min: "0",
							step: "0.1",
							class: "admin-users__input",
							inputmode: "decimal",
							"aria-invalid": Dn.value ? "true" : void 0
						}, null, 8, ht), [[v, Z.value]]),
						Dn.value ? (h(), d("span", gt, _(Dn.value), 1)) : u("", !0)
					]),
					f("label", _t, [
						t[84] ||= f("span", { class: "admin-users__label" }, "Upload cap (GiB, 0 = unlimited)", -1),
						b(f("input", {
							"onUpdate:modelValue": t[18] ||= (e) => Q.value = e,
							type: "number",
							min: "0",
							step: "0.1",
							class: "admin-users__input",
							inputmode: "decimal",
							"aria-invalid": On.value ? "true" : void 0
						}, null, 8, vt), [[v, Q.value]]),
						On.value ? (h(), d("span", yt, _(On.value), 1)) : u("", !0)
					]),
					f("label", bt, [
						t[85] ||= f("span", { class: "admin-users__label" }, "Max concurrent streams (0 = unlimited)", -1),
						b(f("input", {
							"onUpdate:modelValue": t[19] ||= (e) => $.value = e,
							type: "number",
							min: "0",
							max: "1000",
							step: "1",
							class: "admin-users__input",
							inputmode: "numeric",
							"aria-invalid": kn.value ? "true" : void 0
						}, null, 8, xt), [[v, $.value]]),
						kn.value ? (h(), d("span", St, _(kn.value), 1)) : u("", !0)
					])
				])], 32)) : u("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-00de1da8"]]);
export { Dt as default };

//# sourceMappingURL=UsersPage-wQE2ytR7.js.map