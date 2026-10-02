import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { l as t, p as n, t as r } from "./client-Dy0g66rg.js";
import { a as ee, l as te, n as ne, s as re, t as ie } from "./users-CNniaPj9.js";
import { t as ae } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-BL3fV7FU.js";
import { t as a } from "./Badge-DbdgvC-x.js";
import { t as oe } from "./Switch-Csq93T2q.js";
import { t as se } from "./Select-ClbFrdft.js";
import { t as o } from "./Modal-DFo-9bYG.js";
import { t as ce } from "./Skeleton-jlFj-j5t.js";
import { t as le } from "./EmptyState-BwwPJtFd.js";
import { t as ue } from "./PageHint-CJN_ODn2.js";
import { t as de } from "./helpLinks-ya0IGJSe.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as fe, inject as pe, onMounted as me, openBlock as h, ref as g, renderList as he, toDisplayString as _, unref as ge, vModelText as v, withCtx as y, withDirectives as b, withModifiers as _e } from "vue";
//#region src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
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
}, De = { class: "admin-users__date" }, Oe = { class: "admin-users__actions" }, ke = { class: "admin-users__field" }, Ae = { class: "admin-users__field" }, je = { class: "admin-users__field" }, Me = { class: "admin-users__label" }, Ne = ["placeholder", "required"], Pe = { key: 0 }, Fe = { class: "admin-users__field" }, Ie = { class: "admin-users__password-row" }, Le = ["value"], Re = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, ze = {
	key: 0,
	class: "admin-users__skel"
}, Be = { class: "admin-users__profiles-toolbar" }, Ve = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, He = { class: "admin-users__actions" }, Ue = {
	key: 2,
	class: "admin-users__subform"
}, We = { class: "admin-users__subform-title" }, Ge = { class: "admin-users__field" }, Ke = { class: "admin-users__field" }, qe = { class: "admin-users__subform-actions" }, Je = {
	key: 3,
	class: "admin-users__subform"
}, Ye = { class: "admin-users__subform-actions" }, Xe = {
	key: 4,
	class: "admin-users__subform"
}, Ze = { class: "admin-users__subform-title" }, Qe = { class: "admin-users__field" }, $e = { class: "admin-users__subform-actions" }, et = {
	key: 0,
	class: "admin-users__skel"
}, tt = {
	key: 1,
	class: "admin-users__relay"
}, nt = { class: "admin-users__relay-section" }, rt = { class: "admin-users__field" }, it = { class: "admin-users__relay-section" }, at = { class: "admin-users__relay-note" }, ot = { class: "admin-users__field" }, st = { class: "admin-users__field" }, ct = { class: "admin-users__field" }, lt = 5, ut = 1024 ** 3, dt = 0x4000000000000, ft = 1e3, x = /*#__PURE__*/ e(/* @__PURE__ */ fe({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let fe = e, x = pe("apiBase", ""), pt = c(() => typeof x == "string" ? x : x?.value ?? ""), S = new ie(fe.client ?? new r({
			baseUrl: pt.value,
			tokenStore: new t()
		})), C = ae(), mt = pe("phlixConfig", null), ht = c(() => mt?.app === "hub"), gt = c(() => re.map((e) => ({
			value: e.value,
			label: e.label
		}))), _t = g([]), vt = g(!0), w = g(null);
		async function T() {
			vt.value = !0, w.value = null;
			try {
				_t.value = await S.list();
			} catch (e) {
				w.value = n(e, "Failed to load users."), C.error(w.value);
			} finally {
				vt.value = !1;
			}
		}
		function E(e) {
			return e.status ?? "active";
		}
		let yt = c(() => _t.value.filter((e) => E(e) === "pending")), bt = {
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
				await S.approve(e.id), C.success(`${e.username} approved.`), await T();
			} catch (e) {
				C.error(n(e, "Failed to approve user."));
			}
		}
		let D = g(null);
		async function Tt() {
			let e = D.value;
			if (e) try {
				await S.disable(e.id), C.success(`${e.username} disabled.`), D.value = null, await T();
			} catch (e) {
				C.error(n(e, "Failed to disable user.")), D.value = null;
			}
		}
		let O = g(null);
		async function Et() {
			let e = O.value;
			if (e) try {
				await S.reject(e.id), C.success(`${e.username}'s signup rejected.`), O.value = null, await T();
			} catch (e) {
				C.error(n(e, "Failed to reject user.")), O.value = null;
			}
		}
		let k = g(!1), A = g(null), j = g(""), M = g(""), N = g(""), P = g(!1), Dt = g(!1), Ot = c(() => A.value ? `Edit user — ${A.value.username}` : "Add user");
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
				C.error("Username and email are required.");
				return;
			}
			let e = A.value;
			if (!e && !N.value) {
				C.error("Password is required for new users.");
				return;
			}
			if (!e && N.value.length < 8) {
				C.error("Password must be at least 8 characters.");
				return;
			}
			Dt.value = !0;
			try {
				if (e) {
					let t = {
						username: j.value,
						email: M.value
					};
					if (N.value && (t.password = N.value), await S.update(e.id, t), e.is_admin !== P.value) try {
						await S.setAdmin(e.id, P.value);
					} catch (e) {
						C.error(n(e, "Profile saved, but the admin flag change failed.")), jt(), await T();
						return;
					}
					C.success("User updated.");
				} else {
					let e = {
						username: j.value,
						email: M.value,
						password: N.value,
						is_admin: P.value
					};
					await S.create(e), C.success("User created.");
				}
				jt(), await T();
			} catch (e) {
				C.error(n(e, "Failed to save user."));
			} finally {
				Dt.value = !1;
			}
		}
		let F = g(null);
		async function Nt() {
			let e = F.value;
			if (e) try {
				await S.remove(e.id), C.success("User deleted."), F.value = null, await T();
			} catch (e) {
				C.error(n(e, "Failed to delete user.")), F.value = null;
			}
		}
		async function Pt(e, t) {
			try {
				await S.setAdmin(e.id, t), C.success(t ? "User promoted to admin." : "Admin status removed."), await T();
			} catch (e) {
				C.error(n(e, "Failed to update admin status."));
			}
		}
		let I = g(null), L = g(null);
		async function Ft(e) {
			I.value = e, L.value = null;
			try {
				L.value = await S.resetPassword(e.id);
			} catch (e) {
				C.error(n(e, "Failed to reset password.")), I.value = null;
			}
		}
		function It() {
			I.value = null, L.value = null;
		}
		async function Lt() {
			let e = L.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), C.success("Password copied to clipboard.");
			} catch {
				C.error("Could not copy to clipboard.");
			}
		}
		let R = g(null), z = g([]), Rt = g(!1), zt = c(() => R.value ? `Profiles — ${R.value.username}` : "Profiles"), Bt = c({
			get: () => R.value !== null,
			set: (e) => {
				e || Ut();
			}
		}), Vt = c(() => z.value.length >= lt);
		async function B(e) {
			Rt.value = !0;
			try {
				z.value = await S.listProfiles(e);
			} catch (e) {
				C.error(n(e, "Failed to load profiles."));
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
		let V = g(!1), H = g(null), U = g(""), W = g(0), Wt = g(!1);
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
					C.error("Profile name is required.");
					return;
				}
				Wt.value = !0;
				try {
					if (H.value) {
						let e = {
							name: U.value,
							rating: W.value
						};
						await S.updateProfile(H.value.id, e), C.success("Profile updated.");
					} else {
						if (Vt.value) {
							C.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: U.value,
							rating: W.value
						};
						await S.createProfile(e.id, t), C.success("Profile created.");
					}
					qt(), await B(e.id);
				} catch (e) {
					C.error(n(e, "Failed to save profile."));
				} finally {
					Wt.value = !1;
				}
			}
		}
		let G = g(null);
		async function Yt() {
			let e = R.value, t = G.value;
			if (!(!e || !t)) try {
				await S.removeProfile(t.id), C.success("Profile deleted."), G.value = null, await B(e.id);
			} catch (e) {
				C.error(n(e, "Failed to delete profile.")), G.value = null;
			}
		}
		let K = g(null), q = g(""), Xt = g(!1);
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
					C.error("PIN must be 4 or 6 digits.");
					return;
				}
				Xt.value = !0;
				try {
					await S.setPin(t.id, q.value), C.success("PIN set."), Qt(), await B(e.id);
				} catch (e) {
					C.error(n(e, "Failed to set PIN."));
				} finally {
					Xt.value = !1;
				}
			}
		}
		async function en(e) {
			let t = R.value;
			if (t) try {
				await S.clearPin(e.id), C.success("PIN cleared."), await B(t.id);
			} catch (e) {
				C.error(n(e, "Failed to clear PIN."));
			}
		}
		let tn = c(() => te.map((e) => ({
			value: e.value,
			label: e.label
		}))), J = g(null), nn = g(!1), rn = g(!1), Y = g(null), X = g(ne), Z = g("0"), Q = g("0"), $ = g("0"), an = g({
			quotaInGiB: "0",
			quotaOutGiB: "0",
			maxStreams: "0"
		}), on = c(() => J.value ? `Relay limits — ${J.value.username}` : "Relay limits"), sn = c({
			get: () => J.value !== null,
			set: (e) => {
				e || pn();
			}
		});
		function cn(e) {
			return e ? String(Number((e / ut).toFixed(6))) : "0";
		}
		function ln(e) {
			let t = typeof e == "number" ? e : Number(e);
			if (!Number.isFinite(t) || t < 0) return null;
			let n = Math.round(t * ut);
			return n > dt ? null : n;
		}
		function un(e) {
			let t = typeof e == "number" ? e : Number(e);
			return !Number.isInteger(t) || t < 0 || t > ft ? null : t;
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
				let t = await S.getBandwidth(e.id);
				Y.value = t, X.value = t.throttle_bps, Z.value = cn(t.quota_bytes_in), Q.value = cn(t.quota_bytes_out), $.value = String(t.max_concurrent_streams), an.value = {
					quotaInGiB: String(Z.value),
					quotaOutGiB: String(Q.value),
					maxStreams: String($.value)
				};
			} catch (e) {
				C.error(n(e, "Failed to load relay limits.")), J.value = null;
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
			let r = ln(Z.value), ee = ln(Q.value), te = un($.value);
			if (r === null || ee === null) {
				C.error("Byte caps must be a non-negative number of GiB (≤ 1 PiB); 0 = unlimited.");
				return;
			}
			if (te === null) {
				C.error("Max concurrent streams must be a whole number 0–1000; 0 = unlimited.");
				return;
			}
			let ne = an.value, re = X.value !== t.throttle_bps, ie = String(Z.value) !== ne.quotaInGiB || String(Q.value) !== ne.quotaOutGiB || String($.value) !== ne.maxStreams;
			if (!re && !ie) {
				C.error("No changes to save.");
				return;
			}
			rn.value = !0;
			try {
				if (re && await S.setThrottle(e.id, X.value), ie) {
					let t = {
						quota_bytes_in: r,
						quota_bytes_out: ee,
						max_concurrent_streams: te
					};
					await S.setQuota(e.id, t);
				}
				C.success("Relay limits saved."), pn();
			} catch (e) {
				C.error(n(e, "Failed to save relay limits."));
			} finally {
				rn.value = !1;
			}
		}
		function hn(e) {
			return ee[e] ?? ee[12];
		}
		return me(T), (e, t) => (h(), d("section", ve, [
			f("header", ye, [t[22] ||= f("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), m(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: kt
			}, {
				default: y(() => [...t[21] ||= [p("Add user", -1)]]),
				_: 1
			})]),
			m(ue, {
				links: ge(de).users.links,
				details: ge(de).users.details
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
					p(" manages a user's watch profiles and their optional PINs. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			vt.value ? (h(), d("div", be, [m(ce, {
				variant: "text",
				lines: 6
			})])) : w.value ? (h(), l(le, {
				key: 1,
				icon: "alert",
				title: "Couldn't load users",
				description: w.value
			}, {
				actions: y(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: T
				}, {
					default: y(() => [...t[24] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : _t.value.length === 0 ? (h(), l(le, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: y(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: kt
				}, {
					default: y(() => [...t[25] ||= [p("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d(s, { key: 3 }, [yt.value.length > 0 ? (h(), d("section", xe, [f("h2", Se, [t[26] ||= p(" Pending approval ", -1), m(a, { tone: "warning" }, {
				default: y(() => [p(_(yt.value.length), 1)]),
				_: 1
			})]), f("table", Ce, [t[29] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Username"),
				f("th", { scope: "col" }, "Email"),
				f("th", { scope: "col" }, "Requested"),
				f("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(h(!0), d(s, null, he(yt.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, _(e.username), 1),
				f("td", null, _(e.email), 1),
				f("td", we, _(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", Te, [m(i, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => wt(e)
				}, {
					default: y(() => [...t[27] ||= [p(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), m(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => O.value = e
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
			])], -1), f("tbody", null, [(h(!0), d(s, null, he(_t.value, (e) => (h(), d("tr", { key: e.id }, [
				f("td", null, _(e.username), 1),
				f("td", null, _(e.email), 1),
				f("td", null, [m(a, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: y(() => [p(_(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", null, [m(a, { tone: Ct(e) }, {
					default: y(() => [p(_(St(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", De, _(e.created_at.slice(0, 10)), 1),
				f("td", null, [f("div", Oe, [
					E(e) === "pending" ? (h(), l(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => wt(e)
					}, {
						default: y(() => [...t[30] ||= [p(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : E(e) === "disabled" ? (h(), l(i, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => wt(e)
					}, {
						default: y(() => [...t[31] ||= [p(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (h(), l(i, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => D.value = e
					}, {
						default: y(() => [...t[32] ||= [p(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					E(e) === "pending" ? (h(), l(i, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => O.value = e
					}, {
						default: y(() => [...t[33] ||= [p(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : u("", !0),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => At(e)
					}, {
						default: y(() => [...t[34] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => Pt(e, !e.is_admin)
					}, {
						default: y(() => [p(_(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => Ft(e)
					}, {
						default: y(() => [...t[35] ||= [p(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => Ht(e)
					}, {
						default: y(() => [...t[36] ||= [p(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					ht.value ? (h(), l(i, {
						key: 4,
						variant: "ghost",
						size: "sm",
						"aria-label": `Relay limits for ${e.username}`,
						onClick: (t) => fn(e)
					}, {
						default: y(() => [...t[37] ||= [p(" Relay ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : u("", !0),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => F.value = e
					}, {
						default: y(() => [...t[38] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			m(o, {
				modelValue: k.value,
				"onUpdate:modelValue": t[4] ||= (e) => k.value = e,
				title: Ot.value,
				onClose: jt
			}, {
				footer: y(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: jt
				}, {
					default: y(() => [...t[42] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					loading: Dt.value,
					onClick: Mt
				}, {
					default: y(() => [p(_(A.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-users__form",
					onSubmit: _e(Mt, ["prevent"])
				}, [
					f("label", ke, [t[40] ||= f("span", { class: "admin-users__label" }, "Username", -1), b(f("input", {
						"onUpdate:modelValue": t[0] ||= (e) => j.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, j.value]])]),
					f("label", Ae, [t[41] ||= f("span", { class: "admin-users__label" }, "Email", -1), b(f("input", {
						"onUpdate:modelValue": t[1] ||= (e) => M.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, M.value]])]),
					f("label", je, [f("span", Me, _(A.value ? "Password (leave blank to keep current)" : "Password"), 1), b(f("input", {
						"onUpdate:modelValue": t[2] ||= (e) => N.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						"data-lpignore": "true",
						"data-1p-ignore": "",
						"data-bwignore": "",
						"data-form-type": "other",
						placeholder: A.value ? "(unchanged)" : void 0,
						required: !A.value
					}, null, 8, Ne), [[v, N.value]])]),
					m(oe, {
						modelValue: P.value,
						"onUpdate:modelValue": t[3] ||= (e) => P.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(o, {
				"model-value": F.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => F.value = null
			}, {
				footer: y(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => F.value = null
				}, {
					default: y(() => [...t[45] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: Nt
				}, {
					default: y(() => [...t[46] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[43] ||= p(" Delete user ", -1),
					f("strong", null, _(F.value?.username), 1),
					t[44] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(o, {
				"model-value": D.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => D.value = null
			}, {
				footer: y(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => D.value = null
				}, {
					default: y(() => [...t[49] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: Tt
				}, {
					default: y(() => [...t[50] ||= [p("Disable", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[47] ||= p(" Disable ", -1),
					f("strong", null, _(D.value?.username), 1),
					t[48] ||= p("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(o, {
				"model-value": O.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": t[10] ||= (e) => O.value = null
			}, {
				footer: y(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[9] ||= (e) => O.value = null
				}, {
					default: y(() => [...t[53] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: Et
				}, {
					default: y(() => [...t[54] ||= [p("Reject", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[51] ||= p(" Reject ", -1),
					f("strong", null, _(O.value?.username), 1),
					t[52] ||= p("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(o, {
				"model-value": I.value !== null,
				title: I.value ? `Reset password — ${I.value.username}` : "Reset password",
				"onUpdate:modelValue": It
			}, {
				footer: y(() => [m(i, {
					variant: "solid",
					size: "sm",
					onClick: It
				}, {
					default: y(() => [...t[59] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: y(() => [L.value ? (h(), d("div", Pe, [f("p", null, _(L.value.message), 1), f("label", Fe, [t[56] ||= f("span", { class: "admin-users__label" }, "New password", -1), f("div", Ie, [f("input", {
					value: L.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Le), m(i, {
					variant: "outline",
					size: "sm",
					onClick: Lt
				}, {
					default: y(() => [...t[55] ||= [p("Copy", -1)]]),
					_: 1
				})])])])) : (h(), d("p", Re, [
					t[57] ||= p(" Resetting password for ", -1),
					f("strong", null, _(I.value?.username), 1),
					t[58] ||= p("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			m(o, {
				modelValue: Bt.value,
				"onUpdate:modelValue": t[15] ||= (e) => Bt.value = e,
				title: zt.value,
				size: "lg"
			}, {
				default: y(() => [Rt.value ? (h(), d("div", ze, [m(ce, {
					variant: "text",
					lines: 4
				})])) : (h(), d(s, { key: 1 }, [
					f("div", Be, [m(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: Vt.value,
						"aria-label": "Add profile",
						onClick: Gt
					}, {
						default: y(() => [p(" Add profile" + _(Vt.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					z.value.length === 0 ? (h(), l(le, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (h(), d("table", Ve, [t[64] ||= f("thead", null, [f("tr", null, [
						f("th", { scope: "col" }, "Name"),
						f("th", { scope: "col" }, "Rating"),
						f("th", { scope: "col" }, "PIN"),
						f("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), f("tbody", null, [(h(!0), d(s, null, he(z.value, (e) => (h(), d("tr", { key: e.id }, [
						f("td", null, _(e.name), 1),
						f("td", null, [m(a, { tone: "info" }, {
							default: y(() => [p(_(hn(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						f("td", null, [m(a, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: y(() => [p(_(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						f("td", null, [f("div", He, [
							m(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => Kt(e)
							}, {
								default: y(() => [...t[60] ||= [p(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							m(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Zt(e)
							}, {
								default: y(() => [...t[61] ||= [p(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? u("", !0) : (h(), l(i, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => en(e)
							}, {
								default: y(() => [...t[62] ||= [p(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							m(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => G.value = e
							}, {
								default: y(() => [...t[63] ||= [p(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					V.value ? (h(), d("div", Ue, [f("h3", We, _(H.value ? "Edit profile" : "Add profile"), 1), f("form", {
						class: "admin-users__form",
						onSubmit: _e(Jt, ["prevent"])
					}, [
						f("label", Ge, [t[65] ||= f("span", { class: "admin-users__label" }, "Name", -1), b(f("input", {
							"onUpdate:modelValue": t[11] ||= (e) => U.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[v, U.value]])]),
						f("label", Ke, [t[66] ||= f("span", { class: "admin-users__label" }, "Rating", -1), m(se, {
							"model-value": W.value,
							options: gt.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => W.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						f("div", qe, [m(i, {
							variant: "ghost",
							size: "sm",
							onClick: qt
						}, {
							default: y(() => [...t[67] ||= [p("Cancel", -1)]]),
							_: 1
						}), m(i, {
							variant: "solid",
							size: "sm",
							loading: Wt.value,
							onClick: Jt
						}, {
							default: y(() => [p(_(H.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : u("", !0),
					G.value ? (h(), d("div", Je, [f("p", null, [
						t[68] ||= p(" Delete profile ", -1),
						f("strong", null, _(G.value.name), 1),
						t[69] ||= p("? This cannot be undone. ", -1)
					]), f("div", Ye, [m(i, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => G.value = null
					}, {
						default: y(() => [...t[70] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(i, {
						variant: "solid",
						size: "sm",
						onClick: Yt
					}, {
						default: y(() => [...t[71] ||= [p("Delete", -1)]]),
						_: 1
					})])])) : u("", !0),
					K.value ? (h(), d("div", Xe, [f("h3", Ze, "Set PIN — " + _(K.value.name), 1), f("form", {
						class: "admin-users__form",
						onSubmit: _e($t, ["prevent"])
					}, [f("label", Qe, [t[72] ||= f("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), b(f("input", {
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
						required: ""
					}, null, 512), [[v, q.value]])]), f("div", $e, [m(i, {
						variant: "ghost",
						size: "sm",
						onClick: Qt
					}, {
						default: y(() => [...t[73] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(i, {
						variant: "solid",
						size: "sm",
						loading: Xt.value,
						onClick: $t
					}, {
						default: y(() => [...t[74] ||= [p("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : u("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(o, {
				modelValue: sn.value,
				"onUpdate:modelValue": t[20] ||= (e) => sn.value = e,
				title: on.value
			}, {
				footer: y(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: pn
				}, {
					default: y(() => [...t[87] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					loading: rn.value,
					disabled: !Y.value,
					onClick: mn
				}, {
					default: y(() => [...t[88] ||= [p(" Save ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: y(() => [nn.value ? (h(), d("div", et, [m(ce, {
					variant: "text",
					lines: 4
				})])) : Y.value ? (h(), d("div", tt, [f("div", nt, [
					t[76] ||= f("h3", { class: "admin-users__subform-title" }, "Bandwidth throttle", -1),
					t[77] ||= f("p", { class: "admin-users__relay-note" }, [
						p(" A hard cap on the relay stream rate (not a monthly total). The default is 3 Mbps; "),
						f("strong", null, "Unlimited"),
						p(" turns the throttle off for this user. ")
					], -1),
					f("label", rt, [t[75] ||= f("span", { class: "admin-users__label" }, "Throttle", -1), m(se, {
						"model-value": X.value,
						options: tn.value,
						label: "Throttle",
						"onUpdate:modelValue": t[16] ||= (e) => X.value = Number(e)
					}, null, 8, ["model-value", "options"])])
				]), f("div", it, [
					t[86] ||= f("h3", { class: "admin-users__subform-title" }, "Monthly quota", -1),
					f("p", at, [
						t[78] ||= p(" Per-calendar-month byte caps and a concurrent-stream cap. Enter ", -1),
						t[79] ||= f("strong", null, "0", -1),
						t[80] ||= p(" for unlimited. Used this period: ", -1),
						f("strong", null, _(dn(Y.value.bytes_in)), 1),
						t[81] ||= p(" down / ", -1),
						f("strong", null, _(dn(Y.value.bytes_out)), 1),
						t[82] ||= p(" up. ", -1)
					]),
					f("label", ot, [t[83] ||= f("span", { class: "admin-users__label" }, "Download cap (GiB, 0 = unlimited)", -1), b(f("input", {
						"onUpdate:modelValue": t[17] ||= (e) => Z.value = e,
						type: "number",
						min: "0",
						step: "0.1",
						class: "admin-users__input",
						inputmode: "decimal"
					}, null, 512), [[v, Z.value]])]),
					f("label", st, [t[84] ||= f("span", { class: "admin-users__label" }, "Upload cap (GiB, 0 = unlimited)", -1), b(f("input", {
						"onUpdate:modelValue": t[18] ||= (e) => Q.value = e,
						type: "number",
						min: "0",
						step: "0.1",
						class: "admin-users__input",
						inputmode: "decimal"
					}, null, 512), [[v, Q.value]])]),
					f("label", ct, [t[85] ||= f("span", { class: "admin-users__label" }, "Max concurrent streams (0 = unlimited)", -1), b(f("input", {
						"onUpdate:modelValue": t[19] ||= (e) => $.value = e,
						type: "number",
						min: "0",
						max: "1000",
						step: "1",
						class: "admin-users__input",
						inputmode: "numeric"
					}, null, 512), [[v, $.value]])])
				])])) : u("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-0b851b32"]]);
//#endregion
export { x as default };

//# sourceMappingURL=UsersPage-CtEW5lwz.js.map