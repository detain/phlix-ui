import { t as e, x as t } from "./client-57OweUrJ.js";
import { a as n, l as r, n as ee, s as te, t as ne } from "./users-C-cJO6V5.js";
import { t as re } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as ie } from "./PageHint-BlhPmafC.js";
import { t as ae } from "./helpLinks-iarZuNmw.js";
import { t as a } from "./Button-1sKEdGjj.js";
import { t as o } from "./Modal-BU4hJGBA.js";
import { t as oe } from "./Select-ChFXd0gU.js";
import { t as se } from "./Switch-C1Wv5sN2.js";
import { t as ce } from "./Skeleton-B2Mt2L00.js";
import { t as le } from "./EmptyState-BjOJ1k_A.js";
import { n as ue } from "./Icon-CIbfiPrs.js";
import { Fragment as de, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as fe, inject as pe, onMounted as me, openBlock as m, ref as h, renderList as he, toDisplayString as g, unref as ge, vModelText as _, withCtx as v, withDirectives as y, withModifiers as _e } from "vue";
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
}, Ct = 5, wt = 1024 ** 3, Tt = 0x4000000000000, Et = 1e3, Dt = /*#__PURE__*/ ue(/* @__PURE__ */ fe({
	__name: "UsersPage",
	props: { client: {} },
	setup(ue) {
		let fe = ue, Dt = pe("apiBase", ""), Ot = s(() => typeof Dt == "string" ? Dt : Dt?.value ?? ""), b = new ne(fe.client ?? new e({ baseUrl: Ot.value })), x = re(), kt = pe("phlixConfig", null), At = s(() => kt?.app === "hub"), jt = s(() => te.map((e) => ({
			value: e.value,
			label: e.label
		}))), Mt = h([]), Nt = h(!0), S = h(null);
		async function C() {
			Nt.value = !0, S.value = null;
			try {
				Mt.value = await b.list();
			} catch (e) {
				S.value = t(e, "Failed to load users."), x.error(S.value);
			} finally {
				Nt.value = !1;
			}
		}
		function w(e) {
			return e.status ?? "active";
		}
		let Pt = s(() => Mt.value.filter((e) => w(e) === "pending")), Ft = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, It = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function Lt(e) {
			return Ft[w(e)];
		}
		function Rt(e) {
			return It[w(e)];
		}
		async function zt(e) {
			try {
				await b.approve(e.id), x.success(`${e.username} approved.`), await C();
			} catch (e) {
				x.error(t(e, "Failed to approve user."));
			}
		}
		let T = h(null);
		async function Bt() {
			let e = T.value;
			if (e) try {
				await b.disable(e.id), x.success(`${e.username} disabled.`), T.value = null, await C();
			} catch (e) {
				x.error(t(e, "Failed to disable user.")), T.value = null;
			}
		}
		let E = h(null);
		async function Vt() {
			let e = E.value;
			if (e) try {
				await b.reject(e.id), x.success(`${e.username}'s signup rejected.`), E.value = null, await C();
			} catch (e) {
				x.error(t(e, "Failed to reject user.")), E.value = null;
			}
		}
		let D = h(!1), O = h(null), k = h(""), A = h(""), j = h(""), M = h(!1), Ht = h(!1), N = h(null), P = h(null), F = h(null), Ut = /^[^\s@]+@[^\s@]+$/;
		function Wt() {
			N.value = null, P.value = null, F.value = null;
		}
		function Gt() {
			Wt();
			let e = O.value, t = !0;
			return k.value.trim() || (N.value = "Username is required.", t = !1), A.value.trim() ? Ut.test(A.value.trim()) || (P.value = "Enter a valid email address.", t = !1) : (P.value = "Email is required.", t = !1), e || (j.value ? j.value.length < 8 && (F.value = "Password must be at least 8 characters.", t = !1) : (F.value = "Password is required for new users.", t = !1)), t;
		}
		let Kt = s(() => O.value ? `Edit user — ${O.value.username}` : "Add user");
		function qt() {
			O.value = null, k.value = "", A.value = "", j.value = "", M.value = !1, Wt(), D.value = !0;
		}
		function Jt(e) {
			O.value = e, k.value = e.username, A.value = e.email, j.value = "", M.value = e.is_admin, Wt(), D.value = !0;
		}
		function Yt() {
			D.value = !1, O.value = null, Wt();
		}
		async function Xt() {
			if (!Gt()) {
				x.error("Fix the highlighted values before saving.");
				return;
			}
			let e = O.value;
			Ht.value = !0;
			try {
				if (e) {
					let n = {
						username: k.value,
						email: A.value
					};
					if (j.value && (n.password = j.value), await b.update(e.id, n), e.is_admin !== M.value) try {
						await b.setAdmin(e.id, M.value);
					} catch (e) {
						x.error(t(e, "Profile saved, but the admin flag change failed.")), Yt(), await C();
						return;
					}
					x.success("User updated.");
				} else {
					let e = {
						username: k.value,
						email: A.value,
						password: j.value,
						is_admin: M.value
					};
					await b.create(e), x.success("User created.");
				}
				Yt(), await C();
			} catch (e) {
				x.error(t(e, "Failed to save user."));
			} finally {
				Ht.value = !1;
			}
		}
		let I = h(null);
		async function Zt() {
			let e = I.value;
			if (e) try {
				await b.remove(e.id), x.success("User deleted."), I.value = null, await C();
			} catch (e) {
				x.error(t(e, "Failed to delete user.")), I.value = null;
			}
		}
		async function Qt(e, n) {
			try {
				await b.setAdmin(e.id, n), x.success(n ? "User promoted to admin." : "Admin status removed."), await C();
			} catch (e) {
				x.error(t(e, "Failed to update admin status."));
			}
		}
		let L = h(null), R = h(null);
		async function $t(e) {
			L.value = e, R.value = null;
			try {
				R.value = await b.resetPassword(e.id);
			} catch (e) {
				x.error(t(e, "Failed to reset password.")), L.value = null;
			}
		}
		function en() {
			L.value = null, R.value = null;
		}
		async function tn() {
			let e = R.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), x.success("Password copied to clipboard.");
			} catch {
				x.error("Could not copy to clipboard.");
			}
		}
		let z = h(null), B = h([]), nn = h(!1), rn = s(() => z.value ? `Profiles — ${z.value.username}` : "Profiles"), an = s({
			get: () => z.value !== null,
			set: (e) => {
				e || ln();
			}
		}), on = s(() => B.value.length >= Ct);
		async function sn(e) {
			nn.value = !0;
			try {
				B.value = await b.listProfiles(e);
			} catch (e) {
				x.error(t(e, "Failed to load profiles."));
			} finally {
				nn.value = !1;
			}
		}
		async function cn(e) {
			z.value = e, await sn(e.id);
		}
		function ln() {
			z.value = null, B.value = [], mn(), G.value = null, bn();
		}
		let un = h(!1), V = h(null), H = h(""), U = h(0), dn = h(!1), W = h(null);
		function fn() {
			V.value = null, H.value = "", U.value = 0, W.value = null, un.value = !0;
		}
		function pn(e) {
			V.value = e, H.value = e.name, U.value = e.rating, W.value = null, un.value = !0;
		}
		function mn() {
			un.value = !1, V.value = null, H.value = "", U.value = 0, W.value = null;
		}
		async function hn() {
			let e = z.value;
			if (e) {
				if (W.value = null, !H.value.trim()) W.value = "Profile name is required.", x.error("Fix the highlighted values before saving.");
				else {
					dn.value = !0;
					try {
						if (V.value) {
							let e = {
								name: H.value,
								rating: U.value
							};
							await b.updateProfile(V.value.id, e), x.success("Profile updated.");
						} else {
							if (on.value) {
								x.error("Maximum 5 profiles allowed.");
								return;
							}
							let t = {
								name: H.value,
								rating: U.value
							};
							await b.createProfile(e.id, t), x.success("Profile created.");
						}
						mn(), await sn(e.id);
					} catch (e) {
						x.error(t(e, "Failed to save profile."));
					} finally {
						dn.value = !1;
					}
				}
			}
		}
		let G = h(null);
		async function gn() {
			let e = z.value, n = G.value;
			if (e && n) try {
				await b.removeProfile(n.id), x.success("Profile deleted."), G.value = null, await sn(e.id);
			} catch (e) {
				x.error(t(e, "Failed to delete profile.")), G.value = null;
			}
		}
		let _n = h(null), K = h(""), vn = h(!1), q = h(null);
		function yn(e) {
			_n.value = e, K.value = "", q.value = null;
		}
		function bn() {
			_n.value = null, K.value = "", q.value = null;
		}
		async function xn() {
			let e = z.value, n = _n.value;
			if (e && n) {
				if (q.value = null, !/^\d{4}$/.test(K.value) && !/^\d{6}$/.test(K.value)) q.value = "PIN must be 4 or 6 digits.", x.error("Fix the highlighted values before saving.");
				else {
					vn.value = !0;
					try {
						await b.setPin(n.id, K.value), x.success("PIN set."), bn(), await sn(e.id);
					} catch (e) {
						x.error(t(e, "Failed to set PIN."));
					} finally {
						vn.value = !1;
					}
				}
			}
		}
		async function Sn(e) {
			let n = z.value;
			if (n) try {
				await b.clearPin(e.id), x.success("PIN cleared."), await sn(n.id);
			} catch (e) {
				x.error(t(e, "Failed to clear PIN."));
			}
		}
		let Cn = s(() => r.map((e) => ({
			value: e.value,
			label: e.label
		}))), J = h(null), wn = h(!1), Tn = h(!1), Y = h(null), En = h(ee), X = h("0"), Z = h("0"), Q = h("0"), Dn = h(null), On = h(null), $ = h(null), kn = h({
			quotaInGiB: "0",
			quotaOutGiB: "0",
			maxStreams: "0"
		}), An = s(() => J.value ? `Relay limits — ${J.value.username}` : "Relay limits"), jn = s({
			get: () => J.value !== null,
			set: (e) => {
				e || Ln();
			}
		});
		function Mn(e) {
			return e ? String(Number((e / wt).toFixed(6))) : "0";
		}
		function Nn(e) {
			let t = typeof e == "number" ? e : Number(e);
			if (!Number.isFinite(t) || t < 0) return null;
			let n = Math.round(t * wt);
			return n > Tt ? null : n;
		}
		function Pn(e) {
			let t = typeof e == "number" ? e : Number(e);
			return !Number.isInteger(t) || t < 0 || t > Et ? null : t;
		}
		function Fn(e) {
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
		async function In(e) {
			J.value = e, Y.value = null, Dn.value = null, On.value = null, $.value = null, wn.value = !0;
			try {
				let t = await b.getBandwidth(e.id);
				Y.value = t, En.value = t.throttle_bps, X.value = Mn(t.quota_bytes_in), Z.value = Mn(t.quota_bytes_out), Q.value = String(t.max_concurrent_streams), kn.value = {
					quotaInGiB: String(X.value),
					quotaOutGiB: String(Z.value),
					maxStreams: String(Q.value)
				};
			} catch (e) {
				x.error(t(e, "Failed to load relay limits.")), J.value = null;
			} finally {
				wn.value = !1;
			}
		}
		function Ln() {
			J.value = null, Y.value = null;
		}
		async function Rn() {
			let e = J.value, n = Y.value;
			if (!e || !n) return;
			let r = Nn(X.value), ee = Nn(Z.value), te = Pn(Q.value);
			if (Dn.value = r === null ? "Non-negative GiB, ≤ 1 PiB (0 = unlimited)." : null, On.value = ee === null ? "Non-negative GiB, ≤ 1 PiB (0 = unlimited)." : null, $.value = te === null ? "A whole number 0–1000 (0 = unlimited)." : null, r === null || ee === null || te === null) {
				x.error("Fix the highlighted values before saving.");
				return;
			}
			let ne = kn.value, re = En.value !== n.throttle_bps, i = String(X.value) !== ne.quotaInGiB || String(Z.value) !== ne.quotaOutGiB || String(Q.value) !== ne.maxStreams;
			if (!re && !i) x.error("No changes to save.");
			else {
				Tn.value = !0;
				try {
					if (re && await b.setThrottle(e.id, En.value), i) {
						let t = {
							quota_bytes_in: r,
							quota_bytes_out: ee,
							max_concurrent_streams: te
						};
						await b.setQuota(e.id, t);
					}
					x.success("Relay limits saved."), Ln();
				} catch (e) {
					x.error(t(e, "Failed to save relay limits."));
				} finally {
					Tn.value = !1;
				}
			}
		}
		function zn(e) {
			return n[e] ?? n[12];
		}
		return me(C), (e, t) => (m(), u("section", ve, [
			d("header", ye, [t[22] ||= d("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), p(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: qt
			}, {
				default: v(() => [...t[21] ||= [f("Add user", -1)]]),
				_: 1
			})]),
			p(ie, {
				links: ge(ae).users.links,
				details: ge(ae).users.details
			}, {
				default: v(() => [...t[23] ||= [
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
					f(" manages a user’s watch profiles and their optional PINs. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			Nt.value ? (m(), u("div", be, [p(ce, {
				variant: "text",
				lines: 6
			})])) : S.value ? (m(), c(le, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load users",
				description: S.value
			}, {
				actions: v(() => [p(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: C
				}, {
					default: v(() => [...t[24] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Mt.value.length === 0 ? (m(), c(le, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: v(() => [p(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: qt
				}, {
					default: v(() => [...t[25] ||= [f("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (m(), u(de, { key: 3 }, [Pt.value.length > 0 ? (m(), u("section", xe, [d("h2", Se, [t[26] ||= f(" Pending approval ", -1), p(i, { tone: "warning" }, {
				default: v(() => [f(g(Pt.value.length), 1)]),
				_: 1
			})]), d("table", Ce, [t[29] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Requested"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(de, null, he(Pt.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, g(e.username), 1),
				d("td", null, g(e.email), 1),
				d("td", we, g(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", Te, [p(a, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => zt(e)
				}, {
					default: v(() => [...t[27] ||= [f(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), p(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => E.value = e
				}, {
					default: v(() => [...t[28] ||= [f(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : l("", !0), d("table", Ee, [t[39] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Role"),
				d("th", { scope: "col" }, "Status"),
				d("th", { scope: "col" }, "Created"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(de, null, he(Mt.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, g(e.username), 1),
				d("td", null, g(e.email), 1),
				d("td", null, [p(i, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: v(() => [f(g(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", null, [p(i, { tone: Rt(e) }, {
					default: v(() => [f(g(Lt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", De, g(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", Oe, [
					w(e) === "pending" ? (m(), c(a, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => zt(e)
					}, {
						default: v(() => [...t[30] ||= [f(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : w(e) === "disabled" ? (m(), c(a, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => zt(e)
					}, {
						default: v(() => [...t[31] ||= [f(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (m(), c(a, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => T.value = e
					}, {
						default: v(() => [...t[32] ||= [f(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					w(e) === "pending" ? (m(), c(a, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => E.value = e
					}, {
						default: v(() => [...t[33] ||= [f(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : l("", !0),
					p(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => Jt(e)
					}, {
						default: v(() => [...t[34] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => Qt(e, !e.is_admin)
					}, {
						default: v(() => [f(g(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					p(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => $t(e)
					}, {
						default: v(() => [...t[35] ||= [f(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => cn(e)
					}, {
						default: v(() => [...t[36] ||= [f(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					At.value ? (m(), c(a, {
						key: 4,
						variant: "ghost",
						size: "sm",
						"aria-label": `Relay limits for ${e.username}`,
						onClick: (t) => In(e)
					}, {
						default: v(() => [...t[37] ||= [f(" Relay ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : l("", !0),
					p(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => I.value = e
					}, {
						default: v(() => [...t[38] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			p(o, {
				modelValue: D.value,
				"onUpdate:modelValue": t[4] ||= (e) => D.value = e,
				title: Kt.value,
				onClose: Yt
			}, {
				footer: v(() => [p(a, {
					variant: "ghost",
					size: "sm",
					onClick: Yt
				}, {
					default: v(() => [...t[42] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(a, {
					type: "submit",
					form: "admin-user-form",
					variant: "solid",
					size: "sm",
					loading: Ht.value
				}, {
					default: v(() => [f(g(O.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: v(() => [d("form", {
					id: "admin-user-form",
					class: "admin-users__form",
					onSubmit: _e(Xt, ["prevent"])
				}, [
					d("label", ke, [
						t[40] ||= d("span", { class: "admin-users__label" }, "Username", -1),
						y(d("input", {
							"onUpdate:modelValue": t[0] ||= (e) => k.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							"aria-invalid": N.value ? "true" : void 0
						}, null, 8, Ae), [[_, k.value]]),
						N.value ? (m(), u("span", je, g(N.value), 1)) : l("", !0)
					]),
					d("label", Me, [
						t[41] ||= d("span", { class: "admin-users__label" }, "Email", -1),
						y(d("input", {
							"onUpdate:modelValue": t[1] ||= (e) => A.value = e,
							type: "text",
							inputmode: "email",
							class: "admin-users__input",
							autocomplete: "off",
							"aria-invalid": P.value ? "true" : void 0
						}, null, 8, Ne), [[_, A.value]]),
						P.value ? (m(), u("span", Pe, g(P.value), 1)) : l("", !0)
					]),
					d("label", Fe, [
						d("span", Ie, g(O.value ? "Password (leave blank to keep current)" : "Password"), 1),
						y(d("input", {
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
						}, null, 8, Le), [[_, j.value]]),
						F.value ? (m(), u("span", Re, g(F.value), 1)) : l("", !0)
					]),
					p(se, {
						modelValue: M.value,
						"onUpdate:modelValue": t[3] ||= (e) => M.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(o, {
				"model-value": I.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => I.value = null
			}, {
				footer: v(() => [p(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => I.value = null
				}, {
					default: v(() => [...t[45] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(a, {
					variant: "danger",
					size: "sm",
					onClick: Zt
				}, {
					default: v(() => [...t[46] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					t[43] ||= f(" Delete user ", -1),
					d("strong", null, g(I.value?.username), 1),
					t[44] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(o, {
				"model-value": T.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => T.value = null
			}, {
				footer: v(() => [p(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => T.value = null
				}, {
					default: v(() => [...t[49] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(a, {
					variant: "solid",
					size: "sm",
					onClick: Bt
				}, {
					default: v(() => [...t[50] ||= [f("Disable", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					t[47] ||= f(" Disable ", -1),
					d("strong", null, g(T.value?.username), 1),
					t[48] ||= f("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(o, {
				"model-value": E.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": t[10] ||= (e) => E.value = null
			}, {
				footer: v(() => [p(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[9] ||= (e) => E.value = null
				}, {
					default: v(() => [...t[53] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(a, {
					variant: "solid",
					size: "sm",
					onClick: Vt
				}, {
					default: v(() => [...t[54] ||= [f("Reject", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					t[51] ||= f(" Reject ", -1),
					d("strong", null, g(E.value?.username), 1),
					t[52] ||= f("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(o, {
				"model-value": L.value !== null,
				title: L.value ? `Reset password — ${L.value.username}` : "Reset password",
				"onUpdate:modelValue": en
			}, {
				footer: v(() => [p(a, {
					variant: "solid",
					size: "sm",
					onClick: en
				}, {
					default: v(() => [...t[59] ||= [f("Close", -1)]]),
					_: 1
				})]),
				default: v(() => [R.value ? (m(), u("div", ze, [d("p", null, g(R.value.message), 1), d("label", Be, [t[56] ||= d("span", { class: "admin-users__label" }, "New password", -1), d("div", Ve, [d("input", {
					value: R.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, He), p(a, {
					variant: "outline",
					size: "sm",
					onClick: tn
				}, {
					default: v(() => [...t[55] ||= [f("Copy", -1)]]),
					_: 1
				})])])])) : (m(), u("p", Ue, [
					t[57] ||= f(" Resetting password for ", -1),
					d("strong", null, g(L.value?.username), 1),
					t[58] ||= f("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			p(o, {
				modelValue: an.value,
				"onUpdate:modelValue": t[15] ||= (e) => an.value = e,
				title: rn.value,
				size: "lg"
			}, {
				default: v(() => [nn.value ? (m(), u("div", We, [p(ce, {
					variant: "text",
					lines: 4
				})])) : (m(), u(de, { key: 1 }, [
					d("div", Ge, [p(a, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: on.value,
						"aria-label": "Add profile",
						onClick: fn
					}, {
						default: v(() => [f(" Add profile" + g(on.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					B.value.length === 0 ? (m(), c(le, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (m(), u("table", Ke, [t[64] ||= d("thead", null, [d("tr", null, [
						d("th", { scope: "col" }, "Name"),
						d("th", { scope: "col" }, "Rating"),
						d("th", { scope: "col" }, "PIN"),
						d("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), d("tbody", null, [(m(!0), u(de, null, he(B.value, (e) => (m(), u("tr", { key: e.id }, [
						d("td", null, g(e.name), 1),
						d("td", null, [p(i, { tone: "info" }, {
							default: v(() => [f(g(zn(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						d("td", null, [p(i, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: v(() => [f(g(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						d("td", null, [d("div", qe, [
							p(a, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => pn(e)
							}, {
								default: v(() => [...t[60] ||= [f(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							p(a, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => yn(e)
							}, {
								default: v(() => [...t[61] ||= [f(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? l("", !0) : (m(), c(a, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => Sn(e)
							}, {
								default: v(() => [...t[62] ||= [f(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							p(a, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => G.value = e
							}, {
								default: v(() => [...t[63] ||= [f(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					un.value ? (m(), u("div", Je, [d("h3", Ye, g(V.value ? "Edit profile" : "Add profile"), 1), d("form", {
						class: "admin-users__form",
						onSubmit: _e(hn, ["prevent"])
					}, [
						d("label", Xe, [
							t[65] ||= d("span", { class: "admin-users__label" }, "Name", -1),
							y(d("input", {
								"onUpdate:modelValue": t[11] ||= (e) => H.value = e,
								type: "text",
								class: "admin-users__input",
								autocomplete: "off",
								"aria-invalid": W.value ? "true" : void 0
							}, null, 8, Ze), [[_, H.value]]),
							W.value ? (m(), u("span", Qe, g(W.value), 1)) : l("", !0)
						]),
						d("label", $e, [t[66] ||= d("span", { class: "admin-users__label" }, "Rating", -1), p(oe, {
							"model-value": U.value,
							options: jt.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => U.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						d("div", et, [p(a, {
							variant: "ghost",
							size: "sm",
							onClick: mn
						}, {
							default: v(() => [...t[67] ||= [f("Cancel", -1)]]),
							_: 1
						}), p(a, {
							type: "submit",
							variant: "solid",
							size: "sm",
							loading: dn.value
						}, {
							default: v(() => [f(g(V.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : l("", !0),
					G.value ? (m(), u("div", tt, [d("p", null, [
						t[68] ||= f(" Delete profile ", -1),
						d("strong", null, g(G.value.name), 1),
						t[69] ||= f("? This cannot be undone. ", -1)
					]), d("div", nt, [p(a, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => G.value = null
					}, {
						default: v(() => [...t[70] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(a, {
						variant: "danger",
						size: "sm",
						onClick: gn
					}, {
						default: v(() => [...t[71] ||= [f("Delete", -1)]]),
						_: 1
					})])])) : l("", !0),
					_n.value ? (m(), u("div", rt, [d("h3", it, "Set PIN — " + g(_n.value.name), 1), d("form", {
						class: "admin-users__form",
						onSubmit: _e(xn, ["prevent"])
					}, [d("label", at, [
						t[72] ||= d("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[14] ||= (e) => K.value = e,
							type: "password",
							class: "admin-users__input",
							inputmode: "numeric",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other",
							placeholder: "1234 or 123456",
							"aria-invalid": q.value ? "true" : void 0
						}, null, 8, ot), [[_, K.value]]),
						q.value ? (m(), u("span", st, g(q.value), 1)) : l("", !0)
					]), d("div", ct, [p(a, {
						variant: "ghost",
						size: "sm",
						onClick: bn
					}, {
						default: v(() => [...t[73] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(a, {
						type: "submit",
						variant: "solid",
						size: "sm",
						loading: vn.value
					}, {
						default: v(() => [...t[74] ||= [f("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : l("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(o, {
				modelValue: jn.value,
				"onUpdate:modelValue": t[20] ||= (e) => jn.value = e,
				title: An.value
			}, {
				footer: v(() => [p(a, {
					variant: "ghost",
					size: "sm",
					onClick: Ln
				}, {
					default: v(() => [...t[87] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(a, {
					type: "submit",
					form: "admin-relay-form",
					variant: "solid",
					size: "sm",
					loading: Tn.value,
					disabled: !Y.value
				}, {
					default: v(() => [...t[88] ||= [f(" Save ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: v(() => [wn.value ? (m(), u("div", lt, [p(ce, {
					variant: "text",
					lines: 4
				})])) : Y.value ? (m(), u("form", {
					key: 1,
					id: "admin-relay-form",
					class: "admin-users__relay",
					onSubmit: _e(Rn, ["prevent"])
				}, [d("div", ut, [
					t[76] ||= d("h3", { class: "admin-users__subform-title" }, "Bandwidth throttle", -1),
					t[77] ||= d("p", { class: "admin-users__relay-note" }, [
						f(" A hard cap on the relay stream rate (not a monthly total). The default is 3 Mbps; "),
						d("strong", null, "Unlimited"),
						f(" turns the throttle off for this user. ")
					], -1),
					d("label", dt, [t[75] ||= d("span", { class: "admin-users__label" }, "Throttle", -1), p(oe, {
						"model-value": En.value,
						options: Cn.value,
						label: "Throttle",
						"onUpdate:modelValue": t[16] ||= (e) => En.value = Number(e)
					}, null, 8, ["model-value", "options"])])
				]), d("div", ft, [
					t[86] ||= d("h3", { class: "admin-users__subform-title" }, "Monthly quota", -1),
					d("p", pt, [
						t[78] ||= f(" Per-calendar-month byte caps and a concurrent-stream cap. Enter ", -1),
						t[79] ||= d("strong", null, "0", -1),
						t[80] ||= f(" for unlimited. Used this period: ", -1),
						d("strong", null, g(Fn(Y.value.bytes_in)), 1),
						t[81] ||= f(" down / ", -1),
						d("strong", null, g(Fn(Y.value.bytes_out)), 1),
						t[82] ||= f(" up. ", -1)
					]),
					d("label", mt, [
						t[83] ||= d("span", { class: "admin-users__label" }, "Download cap (GiB, 0 = unlimited)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[17] ||= (e) => X.value = e,
							type: "number",
							min: "0",
							step: "0.1",
							class: "admin-users__input",
							inputmode: "decimal",
							"aria-invalid": Dn.value ? "true" : void 0
						}, null, 8, ht), [[_, X.value]]),
						Dn.value ? (m(), u("span", gt, g(Dn.value), 1)) : l("", !0)
					]),
					d("label", _t, [
						t[84] ||= d("span", { class: "admin-users__label" }, "Upload cap (GiB, 0 = unlimited)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[18] ||= (e) => Z.value = e,
							type: "number",
							min: "0",
							step: "0.1",
							class: "admin-users__input",
							inputmode: "decimal",
							"aria-invalid": On.value ? "true" : void 0
						}, null, 8, vt), [[_, Z.value]]),
						On.value ? (m(), u("span", yt, g(On.value), 1)) : l("", !0)
					]),
					d("label", bt, [
						t[85] ||= d("span", { class: "admin-users__label" }, "Max concurrent streams (0 = unlimited)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[19] ||= (e) => Q.value = e,
							type: "number",
							min: "0",
							max: "1000",
							step: "1",
							class: "admin-users__input",
							inputmode: "numeric",
							"aria-invalid": $.value ? "true" : void 0
						}, null, 8, xt), [[_, Q.value]]),
						$.value ? (m(), u("span", St, g($.value), 1)) : l("", !0)
					])
				])], 32)) : l("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-44d1323d"]]);
export { Dt as default };

//# sourceMappingURL=UsersPage-DZHIAEmF.js.map