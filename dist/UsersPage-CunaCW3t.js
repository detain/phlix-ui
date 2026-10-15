import { n as e } from "./Icon-CIwTuFLd.js";
import { l as t, t as n, y as r } from "./client-CRZ_SWB1.js";
import { a as ee, l as te, n as ne, s as re, t as ie } from "./users-C27Co12X.js";
import { t as ae } from "./useToastStore-BDoKlU6N.js";
import { t as oe } from "./EmptyState-BAyOxAcK.js";
import { t as i } from "./Button-BuG0GvCa.js";
import { t as se } from "./Badge-A88fI41k.js";
import { t as ce } from "./Switch-ibkXiiN-.js";
import { t as le } from "./Select-Djg5MXFL.js";
import { t as a } from "./Modal-D0CvVyuE.js";
import { t as ue } from "./Skeleton-rHw-IJtl.js";
import { t as de } from "./PageHint-BgM9gtjL.js";
import { t as fe } from "./helpLinks-B4Y1FteC.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as pe, inject as me, onMounted as he, openBlock as m, ref as h, renderList as ge, toDisplayString as g, unref as _e, vModelText as _, withCtx as v, withDirectives as y, withModifiers as ve } from "vue";
//#region src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
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
}, wt = 5, Tt = 1024 ** 3, Et = 0x4000000000000, Dt = 1e3, Ot = /*#__PURE__*/ e(/* @__PURE__ */ pe({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let pe = e, Ot = me("apiBase", ""), kt = s(() => typeof Ot == "string" ? Ot : Ot?.value ?? ""), b = new ie(pe.client ?? new n({
			baseUrl: kt.value,
			tokenStore: new t()
		})), x = ae(), At = me("phlixConfig", null), jt = s(() => At?.app === "hub"), Mt = s(() => re.map((e) => ({
			value: e.value,
			label: e.label
		}))), Nt = h([]), Pt = h(!0), Ft = h(null);
		async function S() {
			Pt.value = !0, Ft.value = null;
			try {
				Nt.value = await b.list();
			} catch (e) {
				Ft.value = r(e, "Failed to load users."), x.error(Ft.value);
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
				x.error(r(e, "Failed to approve user."));
			}
		}
		let w = h(null);
		async function Ht() {
			let e = w.value;
			if (e) try {
				await b.disable(e.id), x.success(`${e.username} disabled.`), w.value = null, await S();
			} catch (e) {
				x.error(r(e, "Failed to disable user.")), w.value = null;
			}
		}
		let T = h(null);
		async function Ut() {
			let e = T.value;
			if (e) try {
				await b.reject(e.id), x.success(`${e.username}'s signup rejected.`), T.value = null, await S();
			} catch (e) {
				x.error(r(e, "Failed to reject user.")), T.value = null;
			}
		}
		let Wt = h(!1), E = h(null), D = h(""), O = h(""), k = h(""), A = h(!1), Gt = h(!1), j = h(null), M = h(null), N = h(null), Kt = /^[^\s@]+@[^\s@]+$/;
		function qt() {
			j.value = null, M.value = null, N.value = null;
		}
		function Jt() {
			qt();
			let e = E.value, t = !0;
			return D.value.trim() || (j.value = "Username is required.", t = !1), O.value.trim() ? Kt.test(O.value.trim()) || (M.value = "Enter a valid email address.", t = !1) : (M.value = "Email is required.", t = !1), e || (k.value ? k.value.length < 8 && (N.value = "Password must be at least 8 characters.", t = !1) : (N.value = "Password is required for new users.", t = !1)), t;
		}
		let Yt = s(() => E.value ? `Edit user — ${E.value.username}` : "Add user");
		function Xt() {
			E.value = null, D.value = "", O.value = "", k.value = "", A.value = !1, qt(), Wt.value = !0;
		}
		function Zt(e) {
			E.value = e, D.value = e.username, O.value = e.email, k.value = "", A.value = e.is_admin, qt(), Wt.value = !0;
		}
		function Qt() {
			Wt.value = !1, E.value = null, qt();
		}
		async function $t() {
			if (!Jt()) {
				x.error("Please fix the highlighted values before saving.");
				return;
			}
			let e = E.value;
			Gt.value = !0;
			try {
				if (e) {
					let t = {
						username: D.value,
						email: O.value
					};
					if (k.value && (t.password = k.value), await b.update(e.id, t), e.is_admin !== A.value) try {
						await b.setAdmin(e.id, A.value);
					} catch (e) {
						x.error(r(e, "Profile saved, but the admin flag change failed.")), Qt(), await S();
						return;
					}
					x.success("User updated.");
				} else {
					let e = {
						username: D.value,
						email: O.value,
						password: k.value,
						is_admin: A.value
					};
					await b.create(e), x.success("User created.");
				}
				Qt(), await S();
			} catch (e) {
				x.error(r(e, "Failed to save user."));
			} finally {
				Gt.value = !1;
			}
		}
		let P = h(null);
		async function en() {
			let e = P.value;
			if (e) try {
				await b.remove(e.id), x.success("User deleted."), P.value = null, await S();
			} catch (e) {
				x.error(r(e, "Failed to delete user.")), P.value = null;
			}
		}
		async function tn(e, t) {
			try {
				await b.setAdmin(e.id, t), x.success(t ? "User promoted to admin." : "Admin status removed."), await S();
			} catch (e) {
				x.error(r(e, "Failed to update admin status."));
			}
		}
		let F = h(null), I = h(null);
		async function nn(e) {
			F.value = e, I.value = null;
			try {
				I.value = await b.resetPassword(e.id);
			} catch (e) {
				x.error(r(e, "Failed to reset password.")), F.value = null;
			}
		}
		function rn() {
			F.value = null, I.value = null;
		}
		async function an() {
			let e = I.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), x.success("Password copied to clipboard.");
			} catch {
				x.error("Could not copy to clipboard.");
			}
		}
		let L = h(null), R = h([]), on = h(!1), sn = s(() => L.value ? `Profiles — ${L.value.username}` : "Profiles"), cn = s({
			get: () => L.value !== null,
			set: (e) => {
				e || dn();
			}
		}), ln = s(() => R.value.length >= wt);
		async function z(e) {
			on.value = !0;
			try {
				R.value = await b.listProfiles(e);
			} catch (e) {
				x.error(r(e, "Failed to load profiles."));
			} finally {
				on.value = !1;
			}
		}
		async function un(e) {
			L.value = e, await z(e.id);
		}
		function dn() {
			L.value = null, R.value = [], gn(), W.value = null, Sn();
		}
		let fn = h(!1), B = h(null), V = h(""), H = h(0), pn = h(!1), U = h(null);
		function mn() {
			B.value = null, V.value = "", H.value = 0, U.value = null, fn.value = !0;
		}
		function hn(e) {
			B.value = e, V.value = e.name, H.value = e.rating, U.value = null, fn.value = !0;
		}
		function gn() {
			fn.value = !1, B.value = null, V.value = "", H.value = 0, U.value = null;
		}
		async function _n() {
			let e = L.value;
			if (e) {
				if (U.value = null, !V.value.trim()) {
					U.value = "Profile name is required.", x.error("Please fix the highlighted values before saving.");
					return;
				}
				pn.value = !0;
				try {
					if (B.value) {
						let e = {
							name: V.value,
							rating: H.value
						};
						await b.updateProfile(B.value.id, e), x.success("Profile updated.");
					} else {
						if (ln.value) {
							x.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: V.value,
							rating: H.value
						};
						await b.createProfile(e.id, t), x.success("Profile created.");
					}
					gn(), await z(e.id);
				} catch (e) {
					x.error(r(e, "Failed to save profile."));
				} finally {
					pn.value = !1;
				}
			}
		}
		let W = h(null);
		async function vn() {
			let e = L.value, t = W.value;
			if (!(!e || !t)) try {
				await b.removeProfile(t.id), x.success("Profile deleted."), W.value = null, await z(e.id);
			} catch (e) {
				x.error(r(e, "Failed to delete profile.")), W.value = null;
			}
		}
		let yn = h(null), G = h(""), bn = h(!1), K = h(null);
		function xn(e) {
			yn.value = e, G.value = "", K.value = null;
		}
		function Sn() {
			yn.value = null, G.value = "", K.value = null;
		}
		async function Cn() {
			let e = L.value, t = yn.value;
			if (!(!e || !t)) {
				if (K.value = null, !/^\d{4}$/.test(G.value) && !/^\d{6}$/.test(G.value)) {
					K.value = "PIN must be 4 or 6 digits.", x.error("Please fix the highlighted values before saving.");
					return;
				}
				bn.value = !0;
				try {
					await b.setPin(t.id, G.value), x.success("PIN set."), Sn(), await z(e.id);
				} catch (e) {
					x.error(r(e, "Failed to set PIN."));
				} finally {
					bn.value = !1;
				}
			}
		}
		async function wn(e) {
			let t = L.value;
			if (t) try {
				await b.clearPin(e.id), x.success("PIN cleared."), await z(t.id);
			} catch (e) {
				x.error(r(e, "Failed to clear PIN."));
			}
		}
		let Tn = s(() => te.map((e) => ({
			value: e.value,
			label: e.label
		}))), q = h(null), En = h(!1), Dn = h(!1), J = h(null), On = h(ne), Y = h("0"), X = h("0"), Z = h("0"), Q = h(null), kn = h(null), $ = h(null), An = h({
			quotaInGiB: "0",
			quotaOutGiB: "0",
			maxStreams: "0"
		}), jn = s(() => q.value ? `Relay limits — ${q.value.username}` : "Relay limits"), Mn = s({
			get: () => q.value !== null,
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
			q.value = e, J.value = null, Q.value = null, kn.value = null, $.value = null, En.value = !0;
			try {
				let t = await b.getBandwidth(e.id);
				J.value = t, On.value = t.throttle_bps, Y.value = Nn(t.quota_bytes_in), X.value = Nn(t.quota_bytes_out), Z.value = String(t.max_concurrent_streams), An.value = {
					quotaInGiB: String(Y.value),
					quotaOutGiB: String(X.value),
					maxStreams: String(Z.value)
				};
			} catch (e) {
				x.error(r(e, "Failed to load relay limits.")), q.value = null;
			} finally {
				En.value = !1;
			}
		}
		function Rn() {
			q.value = null, J.value = null;
		}
		async function zn() {
			let e = q.value, t = J.value;
			if (!e || !t) return;
			let n = Pn(Y.value), ee = Pn(X.value), te = Fn(Z.value);
			if (Q.value = n === null ? "Non-negative GiB, ≤ 1 PiB (0 = unlimited)." : null, kn.value = ee === null ? "Non-negative GiB, ≤ 1 PiB (0 = unlimited)." : null, $.value = te === null ? "A whole number 0–1000 (0 = unlimited)." : null, n === null || ee === null || te === null) {
				x.error("Please fix the highlighted values before saving.");
				return;
			}
			let ne = An.value, re = On.value !== t.throttle_bps, ie = String(Y.value) !== ne.quotaInGiB || String(X.value) !== ne.quotaOutGiB || String(Z.value) !== ne.maxStreams;
			if (!re && !ie) {
				x.error("No changes to save.");
				return;
			}
			Dn.value = !0;
			try {
				if (re && await b.setThrottle(e.id, On.value), ie) {
					let t = {
						quota_bytes_in: n,
						quota_bytes_out: ee,
						max_concurrent_streams: te
					};
					await b.setQuota(e.id, t);
				}
				x.success("Relay limits saved."), Rn();
			} catch (e) {
				x.error(r(e, "Failed to save relay limits."));
			} finally {
				Dn.value = !1;
			}
		}
		function Bn(e) {
			return ee[e] ?? ee[12];
		}
		return he(S), (e, t) => (m(), u("section", ye, [
			d("header", be, [t[22] ||= d("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), p(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Xt
			}, {
				default: v(() => [...t[21] ||= [f("Add user", -1)]]),
				_: 1
			})]),
			p(de, {
				links: _e(fe).users.links,
				details: _e(fe).users.details
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
					f(" manages a user's watch profiles and their optional PINs. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			Pt.value ? (m(), u("div", xe, [p(ue, {
				variant: "text",
				lines: 6
			})])) : Ft.value ? (m(), c(oe, {
				key: 1,
				icon: "alert",
				title: "Couldn't load users",
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
			}, 8, ["description"])) : Nt.value.length === 0 ? (m(), c(oe, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Xt
				}, {
					default: v(() => [...t[25] ||= [f("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (m(), u(o, { key: 3 }, [It.value.length > 0 ? (m(), u("section", Se, [d("h2", Ce, [t[26] ||= f(" Pending approval ", -1), p(se, { tone: "warning" }, {
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
				d("td", null, [p(se, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: v(() => [f(g(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", null, [p(se, { tone: Bt(e) }, {
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
						onClick: (t) => Zt(e)
					}, {
						default: v(() => [...t[34] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => tn(e, !e.is_admin)
					}, {
						default: v(() => [f(g(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => nn(e)
					}, {
						default: v(() => [...t[35] ||= [f(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => un(e)
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
						onClick: (t) => P.value = e
					}, {
						default: v(() => [...t[38] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			p(a, {
				modelValue: Wt.value,
				"onUpdate:modelValue": t[4] ||= (e) => Wt.value = e,
				title: Yt.value,
				onClose: Qt
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: Qt
				}, {
					default: v(() => [...t[42] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					type: "submit",
					form: "admin-user-form",
					variant: "solid",
					size: "sm",
					loading: Gt.value
				}, {
					default: v(() => [f(g(E.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: v(() => [d("form", {
					id: "admin-user-form",
					class: "admin-users__form",
					onSubmit: ve($t, ["prevent"])
				}, [
					d("label", Ae, [
						t[40] ||= d("span", { class: "admin-users__label" }, "Username", -1),
						y(d("input", {
							"onUpdate:modelValue": t[0] ||= (e) => D.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							"aria-invalid": j.value ? "true" : void 0
						}, null, 8, je), [[_, D.value]]),
						j.value ? (m(), u("span", Me, g(j.value), 1)) : l("", !0)
					]),
					d("label", Ne, [
						t[41] ||= d("span", { class: "admin-users__label" }, "Email", -1),
						y(d("input", {
							"onUpdate:modelValue": t[1] ||= (e) => O.value = e,
							type: "text",
							inputmode: "email",
							class: "admin-users__input",
							autocomplete: "off",
							"aria-invalid": M.value ? "true" : void 0
						}, null, 8, Pe), [[_, O.value]]),
						M.value ? (m(), u("span", Fe, g(M.value), 1)) : l("", !0)
					]),
					d("label", Ie, [
						d("span", Le, g(E.value ? "Password (leave blank to keep current)" : "Password"), 1),
						y(d("input", {
							"onUpdate:modelValue": t[2] ||= (e) => k.value = e,
							type: "password",
							class: "admin-users__input",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other",
							placeholder: E.value ? "(unchanged)" : void 0,
							"aria-invalid": N.value ? "true" : void 0
						}, null, 8, Re), [[_, k.value]]),
						N.value ? (m(), u("span", ze, g(N.value), 1)) : l("", !0)
					]),
					p(ce, {
						modelValue: A.value,
						"onUpdate:modelValue": t[3] ||= (e) => A.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(a, {
				"model-value": P.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => P.value = null
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => P.value = null
				}, {
					default: v(() => [...t[45] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "danger",
					size: "sm",
					onClick: en
				}, {
					default: v(() => [...t[46] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					t[43] ||= f(" Delete user ", -1),
					d("strong", null, g(P.value?.username), 1),
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
				"model-value": F.value !== null,
				title: F.value ? `Reset password — ${F.value.username}` : "Reset password",
				"onUpdate:modelValue": rn
			}, {
				footer: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					onClick: rn
				}, {
					default: v(() => [...t[59] ||= [f("Close", -1)]]),
					_: 1
				})]),
				default: v(() => [I.value ? (m(), u("div", Be, [d("p", null, g(I.value.message), 1), d("label", Ve, [t[56] ||= d("span", { class: "admin-users__label" }, "New password", -1), d("div", He, [d("input", {
					value: I.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Ue), p(i, {
					variant: "outline",
					size: "sm",
					onClick: an
				}, {
					default: v(() => [...t[55] ||= [f("Copy", -1)]]),
					_: 1
				})])])])) : (m(), u("p", We, [
					t[57] ||= f(" Resetting password for ", -1),
					d("strong", null, g(F.value?.username), 1),
					t[58] ||= f("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			p(a, {
				modelValue: cn.value,
				"onUpdate:modelValue": t[15] ||= (e) => cn.value = e,
				title: sn.value,
				size: "lg"
			}, {
				default: v(() => [on.value ? (m(), u("div", Ge, [p(ue, {
					variant: "text",
					lines: 4
				})])) : (m(), u(o, { key: 1 }, [
					d("div", Ke, [p(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: ln.value,
						"aria-label": "Add profile",
						onClick: mn
					}, {
						default: v(() => [f(" Add profile" + g(ln.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					R.value.length === 0 ? (m(), c(oe, {
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
					])], -1), d("tbody", null, [(m(!0), u(o, null, ge(R.value, (e) => (m(), u("tr", { key: e.id }, [
						d("td", null, g(e.name), 1),
						d("td", null, [p(se, { tone: "info" }, {
							default: v(() => [f(g(Bn(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						d("td", null, [p(se, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: v(() => [f(g(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						d("td", null, [d("div", Je, [
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => hn(e)
							}, {
								default: v(() => [...t[60] ||= [f(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => xn(e)
							}, {
								default: v(() => [...t[61] ||= [f(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? l("", !0) : (m(), c(i, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => wn(e)
							}, {
								default: v(() => [...t[62] ||= [f(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => W.value = e
							}, {
								default: v(() => [...t[63] ||= [f(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					fn.value ? (m(), u("div", Ye, [d("h3", Xe, g(B.value ? "Edit profile" : "Add profile"), 1), d("form", {
						class: "admin-users__form",
						onSubmit: ve(_n, ["prevent"])
					}, [
						d("label", Ze, [
							t[65] ||= d("span", { class: "admin-users__label" }, "Name", -1),
							y(d("input", {
								"onUpdate:modelValue": t[11] ||= (e) => V.value = e,
								type: "text",
								class: "admin-users__input",
								autocomplete: "off",
								"aria-invalid": U.value ? "true" : void 0
							}, null, 8, Qe), [[_, V.value]]),
							U.value ? (m(), u("span", $e, g(U.value), 1)) : l("", !0)
						]),
						d("label", et, [t[66] ||= d("span", { class: "admin-users__label" }, "Rating", -1), p(le, {
							"model-value": H.value,
							options: Mt.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => H.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						d("div", tt, [p(i, {
							variant: "ghost",
							size: "sm",
							onClick: gn
						}, {
							default: v(() => [...t[67] ||= [f("Cancel", -1)]]),
							_: 1
						}), p(i, {
							type: "submit",
							variant: "solid",
							size: "sm",
							loading: pn.value
						}, {
							default: v(() => [f(g(B.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : l("", !0),
					W.value ? (m(), u("div", nt, [d("p", null, [
						t[68] ||= f(" Delete profile ", -1),
						d("strong", null, g(W.value.name), 1),
						t[69] ||= f("? This cannot be undone. ", -1)
					]), d("div", rt, [p(i, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => W.value = null
					}, {
						default: v(() => [...t[70] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(i, {
						variant: "danger",
						size: "sm",
						onClick: vn
					}, {
						default: v(() => [...t[71] ||= [f("Delete", -1)]]),
						_: 1
					})])])) : l("", !0),
					yn.value ? (m(), u("div", it, [d("h3", at, "Set PIN — " + g(yn.value.name), 1), d("form", {
						class: "admin-users__form",
						onSubmit: ve(Cn, ["prevent"])
					}, [d("label", ot, [
						t[72] ||= d("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[14] ||= (e) => G.value = e,
							type: "password",
							class: "admin-users__input",
							inputmode: "numeric",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other",
							placeholder: "1234 or 123456",
							"aria-invalid": K.value ? "true" : void 0
						}, null, 8, st), [[_, G.value]]),
						K.value ? (m(), u("span", ct, g(K.value), 1)) : l("", !0)
					]), d("div", lt, [p(i, {
						variant: "ghost",
						size: "sm",
						onClick: Sn
					}, {
						default: v(() => [...t[73] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(i, {
						type: "submit",
						variant: "solid",
						size: "sm",
						loading: bn.value
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
					loading: Dn.value,
					disabled: !J.value
				}, {
					default: v(() => [...t[88] ||= [f(" Save ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: v(() => [En.value ? (m(), u("div", ut, [p(ue, {
					variant: "text",
					lines: 4
				})])) : J.value ? (m(), u("form", {
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
					d("label", ft, [t[75] ||= d("span", { class: "admin-users__label" }, "Throttle", -1), p(le, {
						"model-value": On.value,
						options: Tn.value,
						label: "Throttle",
						"onUpdate:modelValue": t[16] ||= (e) => On.value = Number(e)
					}, null, 8, ["model-value", "options"])])
				]), d("div", pt, [
					t[86] ||= d("h3", { class: "admin-users__subform-title" }, "Monthly quota", -1),
					d("p", mt, [
						t[78] ||= f(" Per-calendar-month byte caps and a concurrent-stream cap. Enter ", -1),
						t[79] ||= d("strong", null, "0", -1),
						t[80] ||= f(" for unlimited. Used this period: ", -1),
						d("strong", null, g(In(J.value.bytes_in)), 1),
						t[81] ||= f(" down / ", -1),
						d("strong", null, g(In(J.value.bytes_out)), 1),
						t[82] ||= f(" up. ", -1)
					]),
					d("label", ht, [
						t[83] ||= d("span", { class: "admin-users__label" }, "Download cap (GiB, 0 = unlimited)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[17] ||= (e) => Y.value = e,
							type: "number",
							min: "0",
							step: "0.1",
							class: "admin-users__input",
							inputmode: "decimal",
							"aria-invalid": Q.value ? "true" : void 0
						}, null, 8, gt), [[_, Y.value]]),
						Q.value ? (m(), u("span", _t, g(Q.value), 1)) : l("", !0)
					]),
					d("label", vt, [
						t[84] ||= d("span", { class: "admin-users__label" }, "Upload cap (GiB, 0 = unlimited)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[18] ||= (e) => X.value = e,
							type: "number",
							min: "0",
							step: "0.1",
							class: "admin-users__input",
							inputmode: "decimal",
							"aria-invalid": kn.value ? "true" : void 0
						}, null, 8, yt), [[_, X.value]]),
						kn.value ? (m(), u("span", bt, g(kn.value), 1)) : l("", !0)
					]),
					d("label", xt, [
						t[85] ||= d("span", { class: "admin-users__label" }, "Max concurrent streams (0 = unlimited)", -1),
						y(d("input", {
							"onUpdate:modelValue": t[19] ||= (e) => Z.value = e,
							type: "number",
							min: "0",
							max: "1000",
							step: "1",
							class: "admin-users__input",
							inputmode: "numeric",
							"aria-invalid": $.value ? "true" : void 0
						}, null, 8, St), [[_, Z.value]]),
						$.value ? (m(), u("span", Ct, g($.value), 1)) : l("", !0)
					])
				])], 32)) : l("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-71a91b03"]]);
//#endregion
export { Ot as default };

//# sourceMappingURL=UsersPage-CunaCW3t.js.map