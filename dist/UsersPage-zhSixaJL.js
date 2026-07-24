import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-CqhoiLRk.js";
import { c as n, f as r, t as ee } from "./client-BzWwyWKr.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { t as re } from "./Select-Cvp-73pF.js";
import { t as ie } from "./Skeleton-DhQmxeNg.js";
import { t as ae } from "./EmptyState-ZlI5t4KT.js";
import { t as oe } from "./PageHint-BoAlFFBN.js";
import { a as se, n as ce, r as le, s as ue, t as de } from "./users-BHiKEDvi.js";
import { t as fe } from "./helpLinks-BI4oN4Or.js";
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
}, Oe = { class: "admin-users__date" }, ke = { class: "admin-users__actions" }, Ae = { class: "admin-users__field" }, je = { class: "admin-users__field" }, Me = { class: "admin-users__field" }, Ne = { class: "admin-users__label" }, Pe = ["placeholder", "required"], Fe = { key: 0 }, Ie = { class: "admin-users__field" }, Le = { class: "admin-users__password-row" }, Re = ["value"], ze = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, Be = {
	key: 0,
	class: "admin-users__skel"
}, Ve = { class: "admin-users__profiles-toolbar" }, He = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, Ue = { class: "admin-users__actions" }, We = {
	key: 2,
	class: "admin-users__subform"
}, Ge = { class: "admin-users__subform-title" }, Ke = { class: "admin-users__field" }, qe = { class: "admin-users__field" }, Je = { class: "admin-users__subform-actions" }, Ye = {
	key: 3,
	class: "admin-users__subform"
}, Xe = { class: "admin-users__subform-actions" }, Ze = {
	key: 4,
	class: "admin-users__subform"
}, Qe = { class: "admin-users__subform-title" }, $e = { class: "admin-users__field" }, et = { class: "admin-users__subform-actions" }, tt = {
	key: 0,
	class: "admin-users__skel"
}, nt = {
	key: 1,
	class: "admin-users__relay"
}, rt = { class: "admin-users__relay-section" }, it = { class: "admin-users__field" }, at = { class: "admin-users__relay-section" }, ot = { class: "admin-users__relay-note" }, st = { class: "admin-users__field" }, ct = { class: "admin-users__field" }, lt = { class: "admin-users__field" }, ut = 5, dt = 1024 ** 3, ft = 0x4000000000000, pt = 1e3, b = /*#__PURE__*/ e(/* @__PURE__ */ pe({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let pe = e, b = me("apiBase", ""), mt = s(() => typeof b == "string" ? b : b?.value ?? ""), x = new de(pe.client ?? new ee({
			baseUrl: mt.value,
			tokenStore: new n()
		})), S = te(), ht = me("phlixConfig", null), gt = s(() => ht?.app === "hub"), _t = s(() => se.map((e) => ({
			value: e.value,
			label: e.label
		}))), C = h([]), vt = h(!0), w = h(null);
		async function T() {
			vt.value = !0, w.value = null;
			try {
				C.value = await x.list();
			} catch (e) {
				w.value = r(e, "Failed to load users."), S.error(w.value);
			} finally {
				vt.value = !1;
			}
		}
		function E(e) {
			return e.status ?? "active";
		}
		let yt = s(() => C.value.filter((e) => E(e) === "pending")), bt = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, xt = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function St(e) {
			return bt[E(e)];
		}
		function Ct(e) {
			return xt[E(e)];
		}
		async function wt(e) {
			try {
				await x.approve(e.id), S.success(`${e.username} approved.`), await T();
			} catch (e) {
				S.error(r(e, "Failed to approve user."));
			}
		}
		let D = h(null);
		async function Tt() {
			let e = D.value;
			if (e) try {
				await x.disable(e.id), S.success(`${e.username} disabled.`), D.value = null, await T();
			} catch (e) {
				S.error(r(e, "Failed to disable user.")), D.value = null;
			}
		}
		let O = h(null);
		async function Et() {
			let e = O.value;
			if (e) try {
				await x.reject(e.id), S.success(`${e.username}'s signup rejected.`), O.value = null, await T();
			} catch (e) {
				S.error(r(e, "Failed to reject user.")), O.value = null;
			}
		}
		let k = h(!1), A = h(null), j = h(""), M = h(""), N = h(""), P = h(!1), Dt = h(!1), Ot = s(() => A.value ? `Edit user — ${A.value.username}` : "Add user");
		function kt() {
			A.value = null, j.value = "", M.value = "", N.value = "", P.value = !1, k.value = !0;
		}
		function At(e) {
			A.value = e, j.value = e.username, M.value = e.email, N.value = "", P.value = e.is_admin, k.value = !0;
		}
		function jt() {
			k.value = !1, A.value = null;
		}
		async function Mt() {
			if (!j.value.trim() || !M.value.trim()) {
				S.error("Username and email are required.");
				return;
			}
			let e = A.value;
			if (!e && !N.value) {
				S.error("Password is required for new users.");
				return;
			}
			if (!e && N.value.length < 8) {
				S.error("Password must be at least 8 characters.");
				return;
			}
			Dt.value = !0;
			try {
				if (e) {
					let t = {
						username: j.value,
						email: M.value
					};
					N.value && (t.password = N.value), await x.update(e.id, t), e.is_admin !== P.value && await x.setAdmin(e.id, P.value), S.success("User updated.");
				} else {
					let e = {
						username: j.value,
						email: M.value,
						password: N.value,
						is_admin: P.value
					};
					await x.create(e), S.success("User created.");
				}
				jt(), await T();
			} catch (e) {
				S.error(r(e, "Failed to save user."));
			} finally {
				Dt.value = !1;
			}
		}
		let F = h(null);
		async function Nt() {
			let e = F.value;
			if (e) try {
				await x.remove(e.id), S.success("User deleted."), F.value = null, await T();
			} catch (e) {
				S.error(r(e, "Failed to delete user.")), F.value = null;
			}
		}
		async function Pt(e, t) {
			try {
				await x.setAdmin(e.id, t), S.success(t ? "User promoted to admin." : "Admin status removed."), await T();
			} catch (e) {
				S.error(r(e, "Failed to update admin status."));
			}
		}
		let I = h(null), L = h(null);
		async function Ft(e) {
			I.value = e, L.value = null;
			try {
				L.value = await x.resetPassword(e.id);
			} catch (e) {
				S.error(r(e, "Failed to reset password.")), I.value = null;
			}
		}
		function It() {
			I.value = null, L.value = null;
		}
		async function Lt() {
			let e = L.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), S.success("Password copied to clipboard.");
			} catch {
				S.error("Could not copy to clipboard.");
			}
		}
		let R = h(null), z = h([]), Rt = h(!1), zt = s(() => R.value ? `Profiles — ${R.value.username}` : "Profiles"), Bt = s({
			get: () => R.value !== null,
			set: (e) => {
				e || Ut();
			}
		}), Vt = s(() => z.value.length >= ut);
		async function B(e) {
			Rt.value = !0;
			try {
				z.value = await x.listProfiles(e);
			} catch (e) {
				S.error(r(e, "Failed to load profiles."));
			} finally {
				Rt.value = !1;
			}
		}
		async function Ht(e) {
			R.value = e, await B(e.id);
		}
		function Ut() {
			R.value = null, z.value = [], qt(), G.value = null, Qt();
		}
		let V = h(!1), H = h(null), U = h(""), W = h(0), Wt = h(!1);
		function Gt() {
			H.value = null, U.value = "", W.value = 0, V.value = !0;
		}
		function Kt(e) {
			H.value = e, U.value = e.name, W.value = e.rating, V.value = !0;
		}
		function qt() {
			V.value = !1, H.value = null, U.value = "", W.value = 0;
		}
		async function Jt() {
			let e = R.value;
			if (e) {
				if (!U.value.trim()) {
					S.error("Profile name is required.");
					return;
				}
				Wt.value = !0;
				try {
					if (H.value) {
						let e = {
							name: U.value,
							rating: W.value
						};
						await x.updateProfile(H.value.id, e), S.success("Profile updated.");
					} else {
						if (Vt.value) {
							S.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: U.value,
							rating: W.value
						};
						await x.createProfile(e.id, t), S.success("Profile created.");
					}
					qt(), await B(e.id);
				} catch (e) {
					S.error(r(e, "Failed to save profile."));
				} finally {
					Wt.value = !1;
				}
			}
		}
		let G = h(null);
		async function Yt() {
			let e = R.value, t = G.value;
			if (!(!e || !t)) try {
				await x.removeProfile(t.id), S.success("Profile deleted."), G.value = null, await B(e.id);
			} catch (e) {
				S.error(r(e, "Failed to delete profile.")), G.value = null;
			}
		}
		let K = h(null), q = h(""), Xt = h(!1);
		function Zt(e) {
			K.value = e, q.value = "";
		}
		function Qt() {
			K.value = null, q.value = "";
		}
		async function $t() {
			let e = R.value, t = K.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test(q.value) && !/^\d{6}$/.test(q.value)) {
					S.error("PIN must be 4 or 6 digits.");
					return;
				}
				Xt.value = !0;
				try {
					await x.setPin(t.id, q.value), S.success("PIN set."), Qt(), await B(e.id);
				} catch (e) {
					S.error(r(e, "Failed to set PIN."));
				} finally {
					Xt.value = !1;
				}
			}
		}
		async function en(e) {
			let t = R.value;
			if (t) try {
				await x.clearPin(e.id), S.success("PIN cleared."), await B(t.id);
			} catch (e) {
				S.error(r(e, "Failed to clear PIN."));
			}
		}
		let tn = s(() => ue.map((e) => ({
			value: e.value,
			label: e.label
		}))), J = h(null), nn = h(!1), rn = h(!1), Y = h(null), X = h(ce), Z = h("0"), Q = h("0"), $ = h("0"), an = h({
			quotaInGiB: "0",
			quotaOutGiB: "0",
			maxStreams: "0"
		}), on = s(() => J.value ? `Relay limits — ${J.value.username}` : "Relay limits"), sn = s({
			get: () => J.value !== null,
			set: (e) => {
				e || pn();
			}
		});
		function cn(e) {
			return e ? String(Number((e / dt).toFixed(6))) : "0";
		}
		function ln(e) {
			let t = typeof e == "number" ? e : Number(e);
			if (!Number.isFinite(t) || t < 0) return null;
			let n = Math.round(t * dt);
			return n > ft ? null : n;
		}
		function un(e) {
			let t = typeof e == "number" ? e : Number(e);
			return !Number.isInteger(t) || t < 0 || t > pt ? null : t;
		}
		function dn(e) {
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
		async function fn(e) {
			J.value = e, Y.value = null, nn.value = !0;
			try {
				let t = await x.getBandwidth(e.id);
				Y.value = t, X.value = t.throttle_bps, Z.value = cn(t.quota_bytes_in), Q.value = cn(t.quota_bytes_out), $.value = String(t.max_concurrent_streams), an.value = {
					quotaInGiB: String(Z.value),
					quotaOutGiB: String(Q.value),
					maxStreams: String($.value)
				};
			} catch (e) {
				S.error(r(e, "Failed to load relay limits.")), J.value = null;
			} finally {
				nn.value = !1;
			}
		}
		function pn() {
			J.value = null, Y.value = null;
		}
		async function mn() {
			let e = J.value, t = Y.value;
			if (!e || !t) return;
			let n = ln(Z.value), ee = ln(Q.value), te = un($.value);
			if (n === null || ee === null) {
				S.error("Byte caps must be a non-negative number of GiB (≤ 1 PiB); 0 = unlimited.");
				return;
			}
			if (te === null) {
				S.error("Max concurrent streams must be a whole number 0–1000; 0 = unlimited.");
				return;
			}
			let i = an.value, a = X.value !== t.throttle_bps, ne = String(Z.value) !== i.quotaInGiB || String(Q.value) !== i.quotaOutGiB || String($.value) !== i.maxStreams;
			if (!a && !ne) {
				S.error("No changes to save.");
				return;
			}
			rn.value = !0;
			try {
				if (a && await x.setThrottle(e.id, X.value), ne) {
					let t = {
						quota_bytes_in: n,
						quota_bytes_out: ee,
						max_concurrent_streams: te
					};
					await x.setQuota(e.id, t);
				}
				S.success("Relay limits saved."), pn();
			} catch (e) {
				S.error(r(e, "Failed to save relay limits."));
			} finally {
				rn.value = !1;
			}
		}
		function hn(e) {
			return le[e] ?? le[12];
		}
		return he(T), (e, n) => (m(), u("section", ye, [
			d("header", be, [n[22] ||= d("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), p(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: kt
			}, {
				default: v(() => [...n[21] ||= [f("Add user", -1)]]),
				_: 1
			})]),
			p(oe, {
				links: _e(fe).users.links,
				details: _e(fe).users.details
			}, {
				default: v(() => [...n[23] ||= [
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
			vt.value ? (m(), u("div", xe, [p(ie, {
				variant: "text",
				lines: 6
			})])) : w.value ? (m(), c(ae, {
				key: 1,
				icon: "alert",
				title: "Couldn't load users",
				description: w.value
			}, {
				actions: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: T
				}, {
					default: v(() => [...n[24] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : C.value.length === 0 ? (m(), c(ae, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: kt
				}, {
					default: v(() => [...n[25] ||= [f("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (m(), u(o, { key: 3 }, [yt.value.length > 0 ? (m(), u("section", Se, [d("h2", Ce, [n[26] ||= f(" Pending approval ", -1), p(a, { tone: "warning" }, {
				default: v(() => [f(g(yt.value.length), 1)]),
				_: 1
			})]), d("table", we, [n[29] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Requested"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(o, null, ge(yt.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, g(e.username), 1),
				d("td", null, g(e.email), 1),
				d("td", Te, g(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", Ee, [p(i, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => wt(e)
				}, {
					default: v(() => [...n[27] ||= [f(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), p(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => O.value = e
				}, {
					default: v(() => [...n[28] ||= [f(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : l("", !0), d("table", De, [n[39] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Username"),
				d("th", { scope: "col" }, "Email"),
				d("th", { scope: "col" }, "Role"),
				d("th", { scope: "col" }, "Status"),
				d("th", { scope: "col" }, "Created"),
				d("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(m(!0), u(o, null, ge(C.value, (e) => (m(), u("tr", { key: e.id }, [
				d("td", null, g(e.username), 1),
				d("td", null, g(e.email), 1),
				d("td", null, [p(a, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: v(() => [f(g(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", null, [p(a, { tone: Ct(e) }, {
					default: v(() => [f(g(St(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", Oe, g(e.created_at.slice(0, 10)), 1),
				d("td", null, [d("div", ke, [
					E(e) === "pending" ? (m(), c(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => wt(e)
					}, {
						default: v(() => [...n[30] ||= [f(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : E(e) === "disabled" ? (m(), c(i, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => wt(e)
					}, {
						default: v(() => [...n[31] ||= [f(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (m(), c(i, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => D.value = e
					}, {
						default: v(() => [...n[32] ||= [f(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					E(e) === "pending" ? (m(), c(i, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => O.value = e
					}, {
						default: v(() => [...n[33] ||= [f(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : l("", !0),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => At(e)
					}, {
						default: v(() => [...n[34] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => Pt(e, !e.is_admin)
					}, {
						default: v(() => [f(g(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => Ft(e)
					}, {
						default: v(() => [...n[35] ||= [f(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => Ht(e)
					}, {
						default: v(() => [...n[36] ||= [f(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					gt.value ? (m(), c(i, {
						key: 4,
						variant: "ghost",
						size: "sm",
						"aria-label": `Relay limits for ${e.username}`,
						onClick: (t) => fn(e)
					}, {
						default: v(() => [...n[37] ||= [f(" Relay ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : l("", !0),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => F.value = e
					}, {
						default: v(() => [...n[38] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			p(t, {
				modelValue: k.value,
				"onUpdate:modelValue": n[4] ||= (e) => k.value = e,
				title: Ot.value,
				onClose: jt
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: jt
				}, {
					default: v(() => [...n[42] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					loading: Dt.value,
					onClick: Mt
				}, {
					default: v(() => [f(g(A.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: v(() => [d("form", {
					class: "admin-users__form",
					onSubmit: ve(Mt, ["prevent"])
				}, [
					d("label", Ae, [n[40] ||= d("span", { class: "admin-users__label" }, "Username", -1), y(d("input", {
						"onUpdate:modelValue": n[0] ||= (e) => j.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_, j.value]])]),
					d("label", je, [n[41] ||= d("span", { class: "admin-users__label" }, "Email", -1), y(d("input", {
						"onUpdate:modelValue": n[1] ||= (e) => M.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_, M.value]])]),
					d("label", Me, [d("span", Ne, g(A.value ? "Password (leave blank to keep current)" : "Password"), 1), y(d("input", {
						"onUpdate:modelValue": n[2] ||= (e) => N.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						"data-lpignore": "true",
						"data-1p-ignore": "",
						"data-bwignore": "",
						"data-form-type": "other",
						placeholder: A.value ? "(unchanged)" : void 0,
						required: !A.value
					}, null, 8, Pe), [[_, N.value]])]),
					p(ne, {
						modelValue: P.value,
						"onUpdate:modelValue": n[3] ||= (e) => P.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(t, {
				"model-value": F.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => F.value = null
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => F.value = null
				}, {
					default: v(() => [...n[45] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: Nt
				}, {
					default: v(() => [...n[46] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					n[43] ||= f(" Delete user ", -1),
					d("strong", null, g(F.value?.username), 1),
					n[44] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(t, {
				"model-value": D.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": n[8] ||= (e) => D.value = null
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[7] ||= (e) => D.value = null
				}, {
					default: v(() => [...n[49] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: Tt
				}, {
					default: v(() => [...n[50] ||= [f("Disable", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					n[47] ||= f(" Disable ", -1),
					d("strong", null, g(D.value?.username), 1),
					n[48] ||= f("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(t, {
				"model-value": O.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": n[10] ||= (e) => O.value = null
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[9] ||= (e) => O.value = null
				}, {
					default: v(() => [...n[53] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: Et
				}, {
					default: v(() => [...n[54] ||= [f("Reject", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					n[51] ||= f(" Reject ", -1),
					d("strong", null, g(O.value?.username), 1),
					n[52] ||= f("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(t, {
				"model-value": I.value !== null,
				title: I.value ? `Reset password — ${I.value.username}` : "Reset password",
				"onUpdate:modelValue": It
			}, {
				footer: v(() => [p(i, {
					variant: "solid",
					size: "sm",
					onClick: It
				}, {
					default: v(() => [...n[59] ||= [f("Close", -1)]]),
					_: 1
				})]),
				default: v(() => [L.value ? (m(), u("div", Fe, [d("p", null, g(L.value.message), 1), d("label", Ie, [n[56] ||= d("span", { class: "admin-users__label" }, "New password", -1), d("div", Le, [d("input", {
					value: L.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Re), p(i, {
					variant: "outline",
					size: "sm",
					onClick: Lt
				}, {
					default: v(() => [...n[55] ||= [f("Copy", -1)]]),
					_: 1
				})])])])) : (m(), u("p", ze, [
					n[57] ||= f(" Resetting password for ", -1),
					d("strong", null, g(I.value?.username), 1),
					n[58] ||= f("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			p(t, {
				modelValue: Bt.value,
				"onUpdate:modelValue": n[15] ||= (e) => Bt.value = e,
				title: zt.value,
				size: "lg"
			}, {
				default: v(() => [Rt.value ? (m(), u("div", Be, [p(ie, {
					variant: "text",
					lines: 4
				})])) : (m(), u(o, { key: 1 }, [
					d("div", Ve, [p(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: Vt.value,
						"aria-label": "Add profile",
						onClick: Gt
					}, {
						default: v(() => [f(" Add profile" + g(Vt.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					z.value.length === 0 ? (m(), c(ae, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (m(), u("table", He, [n[64] ||= d("thead", null, [d("tr", null, [
						d("th", { scope: "col" }, "Name"),
						d("th", { scope: "col" }, "Rating"),
						d("th", { scope: "col" }, "PIN"),
						d("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), d("tbody", null, [(m(!0), u(o, null, ge(z.value, (e) => (m(), u("tr", { key: e.id }, [
						d("td", null, g(e.name), 1),
						d("td", null, [p(a, { tone: "info" }, {
							default: v(() => [f(g(hn(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						d("td", null, [p(a, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: v(() => [f(g(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						d("td", null, [d("div", Ue, [
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => Kt(e)
							}, {
								default: v(() => [...n[60] ||= [f(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Zt(e)
							}, {
								default: v(() => [...n[61] ||= [f(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? l("", !0) : (m(), c(i, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => en(e)
							}, {
								default: v(() => [...n[62] ||= [f(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							p(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => G.value = e
							}, {
								default: v(() => [...n[63] ||= [f(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					V.value ? (m(), u("div", We, [d("h3", Ge, g(H.value ? "Edit profile" : "Add profile"), 1), d("form", {
						class: "admin-users__form",
						onSubmit: ve(Jt, ["prevent"])
					}, [
						d("label", Ke, [n[65] ||= d("span", { class: "admin-users__label" }, "Name", -1), y(d("input", {
							"onUpdate:modelValue": n[11] ||= (e) => U.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[_, U.value]])]),
						d("label", qe, [n[66] ||= d("span", { class: "admin-users__label" }, "Rating", -1), p(re, {
							"model-value": W.value,
							options: _t.value,
							label: "Rating",
							"onUpdate:modelValue": n[12] ||= (e) => W.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						d("div", Je, [p(i, {
							variant: "ghost",
							size: "sm",
							onClick: qt
						}, {
							default: v(() => [...n[67] ||= [f("Cancel", -1)]]),
							_: 1
						}), p(i, {
							variant: "solid",
							size: "sm",
							loading: Wt.value,
							onClick: Jt
						}, {
							default: v(() => [f(g(H.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : l("", !0),
					G.value ? (m(), u("div", Ye, [d("p", null, [
						n[68] ||= f(" Delete profile ", -1),
						d("strong", null, g(G.value.name), 1),
						n[69] ||= f("? This cannot be undone. ", -1)
					]), d("div", Xe, [p(i, {
						variant: "ghost",
						size: "sm",
						onClick: n[13] ||= (e) => G.value = null
					}, {
						default: v(() => [...n[70] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(i, {
						variant: "solid",
						size: "sm",
						onClick: Yt
					}, {
						default: v(() => [...n[71] ||= [f("Delete", -1)]]),
						_: 1
					})])])) : l("", !0),
					K.value ? (m(), u("div", Ze, [d("h3", Qe, "Set PIN — " + g(K.value.name), 1), d("form", {
						class: "admin-users__form",
						onSubmit: ve($t, ["prevent"])
					}, [d("label", $e, [n[72] ||= d("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), y(d("input", {
						"onUpdate:modelValue": n[14] ||= (e) => q.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "new-password",
						"data-lpignore": "true",
						"data-1p-ignore": "",
						"data-bwignore": "",
						"data-form-type": "other",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[_, q.value]])]), d("div", et, [p(i, {
						variant: "ghost",
						size: "sm",
						onClick: Qt
					}, {
						default: v(() => [...n[73] ||= [f("Cancel", -1)]]),
						_: 1
					}), p(i, {
						variant: "solid",
						size: "sm",
						loading: Xt.value,
						onClick: $t
					}, {
						default: v(() => [...n[74] ||= [f("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : l("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(t, {
				modelValue: sn.value,
				"onUpdate:modelValue": n[20] ||= (e) => sn.value = e,
				title: on.value
			}, {
				footer: v(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: pn
				}, {
					default: v(() => [...n[87] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					loading: rn.value,
					disabled: !Y.value,
					onClick: mn
				}, {
					default: v(() => [...n[88] ||= [f(" Save ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: v(() => [nn.value ? (m(), u("div", tt, [p(ie, {
					variant: "text",
					lines: 4
				})])) : Y.value ? (m(), u("div", nt, [d("div", rt, [
					n[76] ||= d("h3", { class: "admin-users__subform-title" }, "Bandwidth throttle", -1),
					n[77] ||= d("p", { class: "admin-users__relay-note" }, [
						f(" A hard cap on the relay stream rate (not a monthly total). The default is 3 Mbps; "),
						d("strong", null, "Unlimited"),
						f(" turns the throttle off for this user. ")
					], -1),
					d("label", it, [n[75] ||= d("span", { class: "admin-users__label" }, "Throttle", -1), p(re, {
						"model-value": X.value,
						options: tn.value,
						label: "Throttle",
						"onUpdate:modelValue": n[16] ||= (e) => X.value = Number(e)
					}, null, 8, ["model-value", "options"])])
				]), d("div", at, [
					n[86] ||= d("h3", { class: "admin-users__subform-title" }, "Monthly quota", -1),
					d("p", ot, [
						n[78] ||= f(" Per-calendar-month byte caps and a concurrent-stream cap. Enter ", -1),
						n[79] ||= d("strong", null, "0", -1),
						n[80] ||= f(" for unlimited. Used this period: ", -1),
						d("strong", null, g(dn(Y.value.bytes_in)), 1),
						n[81] ||= f(" down / ", -1),
						d("strong", null, g(dn(Y.value.bytes_out)), 1),
						n[82] ||= f(" up. ", -1)
					]),
					d("label", st, [n[83] ||= d("span", { class: "admin-users__label" }, "Download cap (GiB, 0 = unlimited)", -1), y(d("input", {
						"onUpdate:modelValue": n[17] ||= (e) => Z.value = e,
						type: "number",
						min: "0",
						step: "0.1",
						class: "admin-users__input",
						inputmode: "decimal"
					}, null, 512), [[_, Z.value]])]),
					d("label", ct, [n[84] ||= d("span", { class: "admin-users__label" }, "Upload cap (GiB, 0 = unlimited)", -1), y(d("input", {
						"onUpdate:modelValue": n[18] ||= (e) => Q.value = e,
						type: "number",
						min: "0",
						step: "0.1",
						class: "admin-users__input",
						inputmode: "decimal"
					}, null, 512), [[_, Q.value]])]),
					d("label", lt, [n[85] ||= d("span", { class: "admin-users__label" }, "Max concurrent streams (0 = unlimited)", -1), y(d("input", {
						"onUpdate:modelValue": n[19] ||= (e) => $.value = e,
						type: "number",
						min: "0",
						max: "1000",
						step: "1",
						class: "admin-users__input",
						inputmode: "numeric"
					}, null, 512), [[_, $.value]])])
				])])) : l("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-5d9cf6a3"]]);
//#endregion
export { b as default };

//# sourceMappingURL=UsersPage-zhSixaJL.js.map