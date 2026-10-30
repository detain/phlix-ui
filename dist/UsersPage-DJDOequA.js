import { l as e, t, y as n } from "./client-pLl-rDdN.js";
import { a as r, l as ee, n as te, s as ne, t as re } from "./users-CyyqrPJG.js";
import { t as ie } from "./useToastStore-Bu-iYU7r.js";
import { t as ae } from "./Badge-C6LNO9Kk.js";
import { t as oe } from "./PageHint-BlhPmafC.js";
import { t as se } from "./helpLinks-iarZuNmw.js";
import { t as i } from "./Button-1sKEdGjj.js";
import { t as a } from "./Modal-DZssaRh7.js";
import { t as ce } from "./Select-CvK9Rhql.js";
import { t as le } from "./Switch-C1Wv5sN2.js";
import { t as ue } from "./Skeleton-B2Mt2L00.js";
import { t as de } from "./EmptyState-BjOJ1k_A.js";
import { n as fe } from "./Icon-CIbfiPrs.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as pe, inject as me, onMounted as he, openBlock as m, ref as h, renderList as ge, toDisplayString as g, unref as _e, vModelText as _, withCtx as v, withDirectives as y, withModifiers as ve } from "vue";
// src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
var ye = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, be = { class: "admin-users__head" }, xe = {
	key: 0,
	class: "admin-users__skel"
}, Se = {
	key: 0,
	class: "admin-users__pending",
	"aria-labelledby": "pending-heading"
}, Ce = {
	id: "pending-heading",
	class: "admin-users__pending-title"
}, we = {
	class: "admin-users__table",
	"aria-label": "Pending users"
}, Te = { class: "admin-users__date" }, Ee = { class: "admin-users__actions" }, De = {
	class: "admin-users__table",
	"aria-label": "Users"
}, Oe = { class: "admin-users__date" }, ke = { class: "admin-users__actions" }, Ae = { class: "admin-users__field" }, je = ["aria-invalid"], Me = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, Ne = { class: "admin-users__field" }, Pe = ["aria-invalid"], Fe = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, Ie = { class: "admin-users__field" }, Le = { class: "admin-users__label" }, Re = ["placeholder", "aria-invalid"], ze = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, Be = { key: 0 }, Ve = { class: "admin-users__field" }, He = { class: "admin-users__password-row" }, Ue = ["value"], We = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, Ge = {
	key: 0,
	class: "admin-users__skel"
}, Ke = { class: "admin-users__profiles-toolbar" }, qe = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, Je = { class: "admin-users__actions" }, Ye = {
	key: 2,
	class: "admin-users__subform"
}, Xe = { class: "admin-users__subform-title" }, Ze = { class: "admin-users__field" }, Qe = ["aria-invalid"], $e = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, et = { class: "admin-users__field" }, tt = { class: "admin-users__subform-actions" }, nt = {
	key: 3,
	class: "admin-users__subform"
}, rt = { class: "admin-users__subform-actions" }, it = {
	key: 4,
	class: "admin-users__subform"
}, at = { class: "admin-users__subform-title" }, ot = { class: "admin-users__field" }, st = ["aria-invalid"], ct = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, lt = { class: "admin-users__subform-actions" }, ut = {
	key: 0,
	class: "admin-users__skel"
}, dt = { class: "admin-users__relay-section" }, ft = { class: "admin-users__field" }, pt = { class: "admin-users__relay-section" }, mt = { class: "admin-users__relay-note" }, ht = { class: "admin-users__field" }, gt = ["aria-invalid"], _t = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, vt = { class: "admin-users__field" }, yt = ["aria-invalid"], bt = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, xt = { class: "admin-users__field" }, St = ["aria-invalid"], Ct = {
	key: 0,
	class: "admin-users__field-error",
	role: "alert"
}, wt = 5, Tt = 1024 ** 3, Et = 0x4000000000000, Dt = 1e3, Ot = /*#__PURE__*/ fe(/* @__PURE__ */ pe({
	__name: "UsersPage",
	props: { client: {} },
	setup(fe) {
		let pe = fe, Ot = me("apiBase", ""), kt = s(() => typeof Ot == "string" ? Ot : Ot?.value ?? ""), b = new re(pe.client ?? new t({
			baseUrl: kt.value,
			tokenStore: new e()
		})), x = ie(), At = me("phlixConfig", null), jt = s(() => At?.app === "hub"), Mt = s(() => ne.map((e) => ({
			value: e.value,
			label: e.label
		}))), Nt = h([]), Pt = h(!0), Ft = h(null);
		async function S() {
			Pt.value = !0, Ft.value = null;
			try {
				Nt.value = await b.list();
			} catch (e) {
				Ft.value = n(e, "Failed to load users."), x.error(Ft.value);
			} finally {
				Pt.value = !1;
			}
		}
		function C(e) {
			return e.status ?? "active";
		}
		let It = s(() => Nt.value.filter((e) => C(e) === "pending")), Lt = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, Rt = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function zt(e) {
			return Lt[C(e)];
		}
		function Bt(e) {
			return Rt[C(e)];
		}
		async function Vt(e) {
			try {
				await b.approve(e.id), x.success(`${e.username} approved.`), await S();
			} catch (e) {
				x.error(n(e, "Failed to approve user."));
			}
		}
		let w = h(null);
		async function Ht() {
			let e = w.value;
			if (e) try {
				await b.disable(e.id), x.success(`${e.username} disabled.`), w.value = null, await S();
			} catch (e) {
				x.error(n(e, "Failed to disable user.")), w.value = null;
			}
		}
		let T = h(null);
		async function Ut() {
			let e = T.value;
			if (e) try {
				await b.reject(e.id), x.success(`${e.username}'s signup rejected.`), T.value = null, await S();
			} catch (e) {
				x.error(n(e, "Failed to reject user.")), T.value = null;
			}
		}
		let E = h(!1), D = h(null), O = h(""), k = h(""), A = h(""), j = h(!1), Wt = h(!1), M = h(null), N = h(null), P = h(null), Gt = /^[^\s@]+@[^\s@]+$/;
		function Kt() {
			M.value = null, N.value = null, P.value = null;
		}
		function qt() {
			Kt();
			let e = D.value, t = !0;
			return O.value.trim() || (M.value = "Username is required.", t = !1), k.value.trim() ? Gt.test(k.value.trim()) || (N.value = "Enter a valid email address.", t = !1) : (N.value = "Email is required.", t = !1), e || (A.value ? A.value.length < 8 && (P.value = "Password must be at least 8 characters.", t = !1) : (P.value = "Password is required for new users.", t = !1)), t;
		}
		let Jt = s(() => D.value ? `Edit user — ${D.value.username}` : "Add user");
		function Yt() {
			D.value = null, O.value = "", k.value = "", A.value = "", j.value = !1, Kt(), E.value = !0;
		}
		function Xt(e) {
			D.value = e, O.value = e.username, k.value = e.email, A.value = "", j.value = e.is_admin, Kt(), E.value = !0;
		}
		function Zt() {
			E.value = !1, D.value = null, Kt();
		}
		async function Qt() {
			if (!qt()) {
				x.error("Fix the highlighted values before saving.");
				return;
			}
			let e = D.value;
			Wt.value = !0;
			try {
				if (e) {
					let t = {
						username: O.value,
						email: k.value
					};
					if (A.value && (t.password = A.value), await b.update(e.id, t), e.is_admin !== j.value) try {
						await b.setAdmin(e.id, j.value);
					} catch (e) {
						x.error(n(e, "Profile saved, but the admin flag change failed.")), Zt(), await S();
						return;
					}
					x.success("User updated.");
				} else {
					let e = {
						username: O.value,
						email: k.value,
						password: A.value,
						is_admin: j.value
					};
					await b.create(e), x.success("User created.");
				}
				Zt(), await S();
			} catch (e) {
				x.error(n(e, "Failed to save user."));
			} finally {
				Wt.value = !1;
			}
		}
		let F = h(null);
		async function $t() {
			let e = F.value;
			if (e) try {
				await b.remove(e.id), x.success("User deleted."), F.value = null, await S();
			} catch (e) {
				x.error(n(e, "Failed to delete user.")), F.value = null;
			}
		}
		async function en(e, t) {
			try {
				await b.setAdmin(e.id, t), x.success(t ? "User promoted to admin." : "Admin status removed."), await S();
			} catch (e) {
				x.error(n(e, "Failed to update admin status."));
			}
		}
		let I = h(null), L = h(null);
		async function tn(e) {
			I.value = e, L.value = null;
			try {
				L.value = await b.resetPassword(e.id);
			} catch (e) {
				x.error(n(e, "Failed to reset password.")), I.value = null;
			}
		}
		function nn() {
			I.value = null, L.value = null;
		}
		async function rn() {
			let e = L.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), x.success("Password copied to clipboard.");
			} catch {
				x.error("Could not copy to clipboard.");
			}
		}
		let R = h(null), z = h([]), an = h(!1), on = s(() => R.value ? `Profiles — ${R.value.username}` : "Profiles"), sn = s({
			get: () => R.value !== null,
			set: (e) => {
				e || un();
			}
		}), cn = s(() => z.value.length >= wt);
		async function B(e) {
			an.value = !0;
			try {
				z.value = await b.listProfiles(e);
			} catch (e) {
				x.error(n(e, "Failed to load profiles."));
			} finally {
				an.value = !1;
			}
		}
		async function ln(e) {
			R.value = e, await B(e.id);
		}
		function un() {
			R.value = null, z.value = [], hn(), G.value = null, bn();
		}
		let dn = h(!1), V = h(null), H = h(""), U = h(0), fn = h(!1), W = h(null);
		function pn() {
			V.value = null, H.value = "", U.value = 0, W.value = null, dn.value = !0;
		}
		function mn(e) {
			V.value = e, H.value = e.name, U.value = e.rating, W.value = null, dn.value = !0;
		}
		function hn() {
			dn.value = !1, V.value = null, H.value = "", U.value = 0, W.value = null;
		}
		async function gn() {
			let e = R.value;
			if (e) {
				if (W.value = null, !H.value.trim()) W.value = "Profile name is required.", x.error("Fix the highlighted values before saving.");
				else {
					fn.value = !0;
					try {
						if (V.value) {
							let e = {
								name: H.value,
								rating: U.value
							};
							await b.updateProfile(V.value.id, e), x.success("Profile updated.");
						} else {
							if (cn.value) {
								x.error("Maximum 5 profiles allowed.");
								return;
							}
							let t = {
								name: H.value,
								rating: U.value
							};
							await b.createProfile(e.id, t), x.success("Profile created.");
						}
						hn(), await B(e.id);
					} catch (e) {
						x.error(n(e, "Failed to save profile."));
					} finally {
						fn.value = !1;
					}
				}
			}
		}
		let G = h(null);
		async function _n() {
			let e = R.value, t = G.value;
			if (e && t) try {
				await b.removeProfile(t.id), x.success("Profile deleted."), G.value = null, await B(e.id);
			} catch (e) {
				x.error(n(e, "Failed to delete profile.")), G.value = null;
			}
		}
		let K = h(null), q = h(""), vn = h(!1), J = h(null);
		function yn(e) {
			K.value = e, q.value = "", J.value = null;
		}
		function bn() {
			K.value = null, q.value = "", J.value = null;
		}
		async function xn() {
			let e = R.value, t = K.value;
			if (e && t) {
				if (J.value = null, !/^\d{4}$/.test(q.value) && !/^\d{6}$/.test(q.value)) J.value = "PIN must be 4 or 6 digits.", x.error("Fix the highlighted values before saving.");
				else {
					vn.value = !0;
					try {
						await b.setPin(t.id, q.value), x.success("PIN set."), bn(), await B(e.id);
					} catch (e) {
						x.error(n(e, "Failed to set PIN."));
					} finally {
						vn.value = !1;
					}
				}
			}
		}
		async function Sn(e) {
			let t = R.value;
			if (t) try {
				await b.clearPin(e.id), x.success("PIN cleared."), await B(t.id);
			} catch (e) {
				x.error(n(e, "Failed to clear PIN."));
			}
		}
		let Cn = s(() => ee.map((e) => ({
			value: e.value,
			label: e.label
		}))), Y = h(null), wn = h(!1), Tn = h(!1), X = h(null), En = h(te), Z = h("0"), Q = h("0"), $ = h("0"), Dn = h(null), On = h(null), kn = h(null), An = h({
			quotaInGiB: "0",
			quotaOutGiB: "0",
			maxStreams: "0"
		}), jn = s(() => Y.value ? `Relay limits — ${Y.value.username}` : "Relay limits"), Mn = s({
			get: () => Y.value !== null,
			set: (e) => {
				e || Rn();
			}
		});
		function Nn(e) {
			return e ? String(Number((e / Tt).toFixed(6))) : "0";
		}
		function Pn(e) {
			let t = typeof e == "number" ? e : Number(e);
			if (!Number.isFinite(t) || t < 0) return null;
			let n = Math.round(t * Tt);
			return n > Et ? null : n;
		}
		function Fn(e) {
			let t = typeof e == "number" ? e : Number(e);
			return !Number.isInteger(t) || t < 0 || t > Dt ? null : t;
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
		async function Ln(e) {
			Y.value = e, X.value = null, Dn.value = null, On.value = null, kn.value = null, wn.value = !0;
			try {
				let t = await b.getBandwidth(e.id);
				X.value = t, En.value = t.throttle_bps, Z.value = Nn(t.quota_bytes_in), Q.value = Nn(t.quota_bytes_out), $.value = String(t.max_concurrent_streams), An.value = {
					quotaInGiB: String(Z.value),
					quotaOutGiB: String(Q.value),
					maxStreams: String($.value)
				};
			} catch (e) {
				x.error(n(e, "Failed to load relay limits.")), Y.value = null;
			} finally {
				wn.value = !1;
			}
		}
		function Rn() {
			Y.value = null, X.value = null;
		}
		async function zn() {
			let e = Y.value, t = X.value;
			if (!e || !t) return;
			let r = Pn(Z.value), ee = Pn(Q.value), te = Fn($.value);
			if (Dn.value = r === null ? "Non-negative GiB, ≤ 1 PiB (0 = unlimited)." : null, On.value = ee === null ? "Non-negative GiB, ≤ 1 PiB (0 = unlimited)." : null, kn.value = te === null ? "A whole number 0–1000 (0 = unlimited)." : null, r === null || ee === null || te === null) {
				x.error("Fix the highlighted values before saving.");
				return;
			}
			let ne = An.value, re = En.value !== t.throttle_bps, ie = String(Z.value) !== ne.quotaInGiB || String(Q.value) !== ne.quotaOutGiB || String($.value) !== ne.maxStreams;
			if (!re && !ie) x.error("No changes to save.");
			else {
				Tn.value = !0;
				try {
					if (re && await b.setThrottle(e.id, En.value), ie) {
						let t = {
							quota_bytes_in: r,
							quota_bytes_out: ee,
							max_concurrent_streams: te
						};
						await b.setQuota(e.id, t);
					}
					x.success("Relay limits saved."), Rn();
				} catch (e) {
					x.error(n(e, "Failed to save relay limits."));
				} finally {
					Tn.value = !1;
				}
			}
		}
		function Bn(e) {
			return r[e] ?? r[12];
		}
		return he(S), (e, t) => (m(), u("section", ye, [
			d("header", be, [t[22] ||= d("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), p(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Yt
			}, {
				default: v(() => [...t[21] ||= [f("Add user", -1)]]),
				_: 1
			})]),
			p(oe, {
				links: _e(se).users.links,
				details: _e(se).users.details
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
			Pt.value ? (m(), u("div", xe, [p(ue, {
				variant: "text",
				lines: 6
			})])) : Ft.value ? (m(), c(de, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load users",
				description: Ft.value
			}, {
				actions: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: S
				}, {
					default: v(() => [...t[24] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Nt.value.length === 0 ? (m(), c(de, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Yt
				}, {
					default: v(() => [...t[25] ||= [f("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (m(), u(o, { key: 3 }, [It.value.length > 0 ? (m(), u("section", Se, [d("h2", Ce, [t[26] ||= f(" Pending approval ", -1), p(ae, { tone: "warning" }, {
				default: v(() => [f(g(It.value.length), 1)]),
				_: 1
			})]), d("table", we, [t[29] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Requested"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(o, null, ge(It.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, g(e.username), 1),
				d("td", null, g(e.email), 1),
				d("td", Te, g(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", Ee, [p(i, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => Vt(e)
				}, {
					default: v(() => [...t[27] ||= [f(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), p(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => T.value = e
				}, {
					default: v(() => [...t[28] ||= [f(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : l("", !0), d("table", De, [t[39] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Role"),
				d("th", { scope: "col" }, "Status"),
				d("th", { scope: "col" }, "Created"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(o, null, ge(Nt.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, g(e.username), 1),
				d("td", null, g(e.email), 1),
				d("td", null, [p(ae, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: v(() => [f(g(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", null, [p(ae, { tone: Bt(e) }, {
					default: v(() => [f(g(zt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", Oe, g(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", ke, [
					C(e) === "pending" ? (m(), c(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => Vt(e)
					}, {
						default: v(() => [...t[30] ||= [f(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : C(e) === "disabled" ? (m(), c(i, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => Vt(e)
					}, {
						default: v(() => [...t[31] ||= [f(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (m(), c(i, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => w.value = e
					}, {
						default: v(() => [...t[32] ||= [f(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					C(e) === "pending" ? (m(), c(i, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => T.value = e
					}, {
						default: v(() => [...t[33] ||= [f(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : l("", !0),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => Xt(e)
					}, {
						default: v(() => [...t[34] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => en(e, !e.is_admin)
					}, {
						default: v(() => [f(g(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => tn(e)
					}, {
						default: v(() => [...t[35] ||= [f(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => ln(e)
					}, {
						default: v(() => [...t[36] ||= [f(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					jt.value ? (m(), c(i, {
						key: 4,
						variant: "ghost",
						size: "sm",
						"aria-label": `Relay limits for ${e.username}`,
						onClick: (t) => Ln(e)
					}, {
						default: v(() => [...t[37] ||= [f(" Relay ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : l("", !0),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => F.value = e
					}, {
						default: v(() => [...t[38] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			p(a, {
				modelValue: E.value,
				"onUpdate:modelValue": t[4] ||= (e) => E.value = e,
				title: Jt.value,
				onClose: Zt
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: Zt
				}, {
					default: v(() => [...t[42] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					type: "submit",
					form: "admin-user-form",
					variant: "solid",
					size: "sm",
					loading: Wt.value
				}, {
					default: v(() => [f(g(D.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: v(() => [d("form", {
					id: "admin-user-form",
					class: "admin-users__form",
					onSubmit: ve(Qt, ["prevent"])
				}, [
					d("label", Ae, [
						t[40] ||= d("span", { class: "admin-users__label" }, "Username", -1),
						y(d("input", {
							"onUpdate:modelValue": t[0] ||= (e) => O.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							"aria-invalid": M.value ? "true" : void 0
						}, null, 8, je), [[_, O.value]]),
						M.value ? (m(), u("span", Me, g(M.value), 1)) : l("", !0)
					]),
					d("label", Ne, [
						t[41] ||= d("span", { class: "admin-users__label" }, "Email", -1),
						y(d("input", {
							"onUpdate:modelValue": t[1] ||= (e) => k.value = e,
							type: "text",
							inputmode: "email",
							class: "admin-users__input",
							autocomplete: "off",
							"aria-invalid": N.value ? "true" : void 0
						}, null, 8, Pe), [[_, k.value]]),
						N.value ? (m(), u("span", Fe, g(N.value), 1)) : l("", !0)
					]),
					d("label", Ie, [
						d("span", Le, g(D.value ? "Password (leave blank to keep current)" : "Password"), 1),
						y(d("input", {
							"onUpdate:modelValue": t[2] ||= (e) => A.value = e,
							type: "password",
							class: "admin-users__input",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other",
							placeholder: D.value ? "(unchanged)" : void 0,
							"aria-invalid": P.value ? "true" : void 0
						}, null, 8, Re), [[_, A.value]]),
						P.value ? (m(), u("span", ze, g(P.value), 1)) : l("", !0)
					]),
					p(le, {
						modelValue: j.value,
						"onUpdate:modelValue": t[3] ||= (e) => j.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(a, {
				"model-value": F.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => F.value = null
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => F.value = null
				}, {
					default: v(() => [...t[45] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "danger",
					size: "sm",
					onClick: $t
				}, {
					default: v(() => [...t[46] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					t[43] ||= f(" Delete user ", -1),
					d("strong", null, g(F.value?.username), 1),
					t[44] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(a, {
				"model-value": w.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => w.value = null
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => w.value = null
				}, {
					default: v(() => [...t[49] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: Ht
				}, {
					default: v(() => [...t[50] ||= [f("Disable", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					t[47] ||= f(" Disable ", -1),
					d("strong", null, g(w.value?.username), 1),
					t[48] ||= f("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(a, {
				"model-value": T.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": t[10] ||= (e) => T.value = null
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[9] ||= (e) => T.value = null
				}, {
					default: v(() => [...t[53] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: Ut
				}, {
					default: v(() => [...t[54] ||= [f("Reject", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					t[51] ||= f(" Reject ", -1),
					d("strong", null, g(T.value?.username), 1),
					t[52] ||= f("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(a, {
				"model-value": I.value !== null,
				title: I.value ? `Reset password — ${I.value.username}` : "Reset password",
				"onUpdate:modelValue": nn
			}, {
				footer: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					onClick: nn
				}, {
					default: v(() => [...t[59] ||= [f("Close", -1)]]),
					_: 1
				})]),
				default: v(() => [L.value ? (m(), u("div", Be, [d("p", null, g(L.value.message), 1), d("label", Ve, [t[56] ||= d("span", { class: "admin-users__label" }, "New password", -1), d("div", He, [d("input", {
					value: L.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Ue), p(i, {
					variant: "outline",
					size: "sm",
					onClick: rn
				}, {
					default: v(() => [...t[55] ||= [f("Copy", -1)]]),
					_: 1
				})])])])) : (m(), u("p", We, [
					t[57] ||= f(" Resetting password for ", -1),
					d("strong", null, g(I.value?.username), 1),
					t[58] ||= f("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			p(a, {
				modelValue: sn.value,
				"onUpdate:modelValue": t[15] ||= (e) => sn.value = e,
				title: on.value,
				size: "lg"
			}, {
				default: v(() => [an.value ? (m(), u("div", Ge, [p(ue, {
					variant: "text",
					lines: 4
				})])) : (m(), u(o, { key: 1 }, [
					d("div", Ke, [p(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: cn.value,
						"aria-label": "Add profile",
						onClick: pn
					}, {
						default: v(() => [f(" Add profile" + g(cn.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					z.value.length === 0 ? (m(), c(de, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (m(), u("table", qe, [t[64] ||= d("thead", null, [d("tr", null, [
						d("th", { scope: "col" }, "Name"),
						d("th", { scope: "col" }, "Rating"),
						d("th", { scope: "col" }, "PIN"),
						d("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), d("tbody", null, [(m(!0), u(o, null, ge(z.value, (e) => (m(), u("tr", { key: e.id }, [
						d("td", null, g(e.name), 1),
						d("td", null, [p(ae, { tone: "info" }, {
							default: v(() => [f(g(Bn(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						d("td", null, [p(ae, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: v(() => [f(g(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						d("td", null, [d("div", Je, [
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => mn(e)
							}, {
								default: v(() => [...t[60] ||= [f(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => yn(e)
							}, {
								default: v(() => [...t[61] ||= [f(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? l("", !0) : (m(), c(i, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => Sn(e)
							}, {
								default: v(() => [...t[62] ||= [f(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							p(i, {
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
					dn.value ? (m(), u("div", Ye, [d("h3", Xe, g(V.value ? "Edit profile" : "Add profile"), 1), d("form", {
						class: "admin-users__form",
						onSubmit: ve(gn, ["prevent"])
					}, [
						d("label", Ze, [
							t[65] ||= d("span", { class: "admin-users__label" }, "Name", -1),
							y(d("input", {
								"onUpdate:modelValue": t[11] ||= (e) => H.value = e,
								type: "text",
								class: "admin-users__input",
								autocomplete: "off",
								"aria-invalid": W.value ? "true" : void 0
							}, null, 8, Qe), [[_, H.value]]),
							W.value ? (m(), u("span", $e, g(W.value), 1)) : l("", !0)
						]),
						d("label", et, [t[66] ||= d("span", { class: "admin-users__label" }, "Rating", -1), p(ce, {
							"model-value": U.value,
							options: Mt.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => U.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						d("div", tt, [p(i, {
							variant: "ghost",
							size: "sm",
							onClick: hn
						}, {
							default: v(() => [...t[67] ||= [f("Cancel", -1)]]),
							_: 1
						}), p(i, {
							type: "submit",
							variant: "solid",
							size: "sm",
							loading: fn.value
						}, {
							default: v(() => [f(g(V.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : l("", !0),
					G.value ? (m(), u("div", nt, [d("p", null, [
						t[68] ||= f(" Delete profile ", -1),
						d("strong", null, g(G.value.name), 1),
						t[69] ||= f("? This cannot be undone. ", -1)
					]), d("div", rt, [p(i, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => G.value = null
					}, {
						default: v(() => [...t[70] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(i, {
						variant: "danger",
						size: "sm",
						onClick: _n
					}, {
						default: v(() => [...t[71] ||= [f("Delete", -1)]]),
						_: 1
					})])])) : l("", !0),
					K.value ? (m(), u("div", it, [d("h3", at, "Set PIN — " + g(K.value.name), 1), d("form", {
						class: "admin-users__form",
						onSubmit: ve(xn, ["prevent"])
					}, [d("label", ot, [
						t[72] ||= d("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1),
						y(d("input", {
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
						}, null, 8, st), [[_, q.value]]),
						J.value ? (m(), u("span", ct, g(J.value), 1)) : l("", !0)
					]), d("div", lt, [p(i, {
						variant: "ghost",
						size: "sm",
						onClick: bn
					}, {
						default: v(() => [...t[73] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(i, {
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
			p(a, {
				modelValue: Mn.value,
				"onUpdate:modelValue": t[20] ||= (e) => Mn.value = e,
				title: jn.value
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: Rn
				}, {
					default: v(() => [...t[87] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					type: "submit",
					form: "admin-relay-form",
					variant: "solid",
					size: "sm",
					loading: Tn.value,
					disabled: !X.value
				}, {
					default: v(() => [...t[88] ||= [f(" Save ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: v(() => [wn.value ? (m(), u("div", ut, [p(ue, {
					variant: "text",
					lines: 4
				})])) : X.value ? (m(), u("form", {
					key: 1,
					id: "admin-relay-form",
					class: "admin-users__relay",
					onSubmit: ve(zn, ["prevent"])
				}, [d("div", dt, [
					t[76] ||= d("h3", { class: "admin-users__subform-title" }, "Bandwidth throttle", -1),
					t[77] ||= d("p", { class: "admin-users__relay-note" }, [
						f(" A hard cap on the relay stream rate (not a monthly total). The default is 3 Mbps; "),
						d("strong", null, "Unlimited"),
						f(" turns the throttle off for this user. ")
					], -1),
					d("label", ft, [t[75] ||= d("span", { class: "admin-users__label" }, "Throttle", -1), p(ce, {
						"model-value": En.value,
						options: Cn.value,
						label: "Throttle",
						"onUpdate:modelValue": t[16] ||= (e) => En.value = Number(e)
					}, null, 8, ["model-value", "options"])])
				]), d("div", pt, [
					t[86] ||= d("h3", { class: "admin-users__subform-title" }, "Monthly quota", -1),
					d("p", mt, [
						t[78] ||= f(" Per-calendar-month byte caps and a concurrent-stream cap. Enter ", -1),
						t[79] ||= d("strong", null, "0", -1),
						t[80] ||= f(" for unlimited. Used this period: ", -1),
						d("strong", null, g(In(X.value.bytes_in)), 1),
						t[81] ||= f(" down / ", -1),
						d("strong", null, g(In(X.value.bytes_out)), 1),
						t[82] ||= f(" up. ", -1)
					]),
					d("label", ht, [
						t[83] ||= d("span", { class: "admin-users__label" }, "Download cap (GiB, 0 = unlimited)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[17] ||= (e) => Z.value = e,
							type: "number",
							min: "0",
							step: "0.1",
							class: "admin-users__input",
							inputmode: "decimal",
							"aria-invalid": Dn.value ? "true" : void 0
						}, null, 8, gt), [[_, Z.value]]),
						Dn.value ? (m(), u("span", _t, g(Dn.value), 1)) : l("", !0)
					]),
					d("label", vt, [
						t[84] ||= d("span", { class: "admin-users__label" }, "Upload cap (GiB, 0 = unlimited)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[18] ||= (e) => Q.value = e,
							type: "number",
							min: "0",
							step: "0.1",
							class: "admin-users__input",
							inputmode: "decimal",
							"aria-invalid": On.value ? "true" : void 0
						}, null, 8, yt), [[_, Q.value]]),
						On.value ? (m(), u("span", bt, g(On.value), 1)) : l("", !0)
					]),
					d("label", xt, [
						t[85] ||= d("span", { class: "admin-users__label" }, "Max concurrent streams (0 = unlimited)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[19] ||= (e) => $.value = e,
							type: "number",
							min: "0",
							max: "1000",
							step: "1",
							class: "admin-users__input",
							inputmode: "numeric",
							"aria-invalid": kn.value ? "true" : void 0
						}, null, 8, St), [[_, $.value]]),
						kn.value ? (m(), u("span", Ct, g(kn.value), 1)) : l("", !0)
					])
				])], 32)) : l("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-3a0e6394"]]);
export { Ot as default };

//# sourceMappingURL=UsersPage-DJDOequA.js.map