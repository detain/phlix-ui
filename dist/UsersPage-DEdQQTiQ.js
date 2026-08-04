import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { l as t, p as n, t as r } from "./client-COHWZ2KC.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DuTfRWnu.js";
import { t as a } from "./Badge-C8wuGrO0.js";
import { t as te } from "./Switch-DyS2L5gX.js";
import { t as o } from "./Select-BW8ThAFp.js";
import { t as s } from "./Modal-DRyCYCuK.js";
import { t as ne } from "./Skeleton-jlFj-j5t.js";
import { t as re } from "./EmptyState-DERkIIRd.js";
import { t as ie } from "./PageHint-DVe81aMu.js";
import { a as ae, n as oe, r as se, s as ce, t as le } from "./users-DkcwhOlS.js";
import { t as ue } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as de, inject as fe, onMounted as pe, openBlock as g, ref as _, renderList as me, toDisplayString as v, unref as he, vModelText as y, withCtx as b, withDirectives as x, withModifiers as ge } from "vue";
//#region src/pages/admin/UsersPage.vue?vue&type=script&setup=true&lang.ts
var _e = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, ve = { class: "admin-users__head" }, ye = {
	key: 0,
	class: "admin-users__skel"
}, be = {
	key: 0,
	class: "admin-users__pending",
	"aria-labelledby": "pending-heading"
}, xe = {
	id: "pending-heading",
	class: "admin-users__pending-title"
}, Se = {
	class: "admin-users__table",
	"aria-label": "Pending users"
}, Ce = { class: "admin-users__date" }, we = { class: "admin-users__actions" }, Te = {
	class: "admin-users__table",
	"aria-label": "Users"
}, Ee = { class: "admin-users__date" }, De = { class: "admin-users__actions" }, Oe = { class: "admin-users__field" }, ke = { class: "admin-users__field" }, Ae = { class: "admin-users__field" }, je = { class: "admin-users__label" }, Me = ["placeholder", "required"], Ne = { key: 0 }, Pe = { class: "admin-users__field" }, Fe = { class: "admin-users__password-row" }, Ie = ["value"], Le = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, Re = {
	key: 0,
	class: "admin-users__skel"
}, ze = { class: "admin-users__profiles-toolbar" }, Be = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, Ve = { class: "admin-users__actions" }, He = {
	key: 2,
	class: "admin-users__subform"
}, Ue = { class: "admin-users__subform-title" }, We = { class: "admin-users__field" }, Ge = { class: "admin-users__field" }, Ke = { class: "admin-users__subform-actions" }, qe = {
	key: 3,
	class: "admin-users__subform"
}, Je = { class: "admin-users__subform-actions" }, Ye = {
	key: 4,
	class: "admin-users__subform"
}, Xe = { class: "admin-users__subform-title" }, Ze = { class: "admin-users__field" }, Qe = { class: "admin-users__subform-actions" }, $e = {
	key: 0,
	class: "admin-users__skel"
}, et = {
	key: 1,
	class: "admin-users__relay"
}, tt = { class: "admin-users__relay-section" }, nt = { class: "admin-users__field" }, rt = { class: "admin-users__relay-section" }, it = { class: "admin-users__relay-note" }, at = { class: "admin-users__field" }, ot = { class: "admin-users__field" }, st = { class: "admin-users__field" }, ct = 5, lt = 1024 ** 3, ut = 0x4000000000000, dt = 1e3, S = /*#__PURE__*/ e(/* @__PURE__ */ de({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let de = e, S = fe("apiBase", ""), ft = l(() => typeof S == "string" ? S : S?.value ?? ""), C = new le(de.client ?? new r({
			baseUrl: ft.value,
			tokenStore: new t()
		})), w = ee(), pt = fe("phlixConfig", null), mt = l(() => pt?.app === "hub"), ht = l(() => ae.map((e) => ({
			value: e.value,
			label: e.label
		}))), gt = _([]), _t = _(!0), T = _(null);
		async function E() {
			_t.value = !0, T.value = null;
			try {
				gt.value = await C.list();
			} catch (e) {
				T.value = n(e, "Failed to load users."), w.error(T.value);
			} finally {
				_t.value = !1;
			}
		}
		function D(e) {
			return e.status ?? "active";
		}
		let vt = l(() => gt.value.filter((e) => D(e) === "pending")), yt = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, bt = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function xt(e) {
			return yt[D(e)];
		}
		function St(e) {
			return bt[D(e)];
		}
		async function Ct(e) {
			try {
				await C.approve(e.id), w.success(`${e.username} approved.`), await E();
			} catch (e) {
				w.error(n(e, "Failed to approve user."));
			}
		}
		let O = _(null);
		async function wt() {
			let e = O.value;
			if (e) try {
				await C.disable(e.id), w.success(`${e.username} disabled.`), O.value = null, await E();
			} catch (e) {
				w.error(n(e, "Failed to disable user.")), O.value = null;
			}
		}
		let k = _(null);
		async function Tt() {
			let e = k.value;
			if (e) try {
				await C.reject(e.id), w.success(`${e.username}'s signup rejected.`), k.value = null, await E();
			} catch (e) {
				w.error(n(e, "Failed to reject user.")), k.value = null;
			}
		}
		let A = _(!1), j = _(null), M = _(""), N = _(""), P = _(""), F = _(!1), Et = _(!1), Dt = l(() => j.value ? `Edit user — ${j.value.username}` : "Add user");
		function Ot() {
			j.value = null, M.value = "", N.value = "", P.value = "", F.value = !1, A.value = !0;
		}
		function kt(e) {
			j.value = e, M.value = e.username, N.value = e.email, P.value = "", F.value = e.is_admin, A.value = !0;
		}
		function At() {
			A.value = !1, j.value = null;
		}
		async function jt() {
			if (!M.value.trim() || !N.value.trim()) {
				w.error("Username and email are required.");
				return;
			}
			let e = j.value;
			if (!e && !P.value) {
				w.error("Password is required for new users.");
				return;
			}
			if (!e && P.value.length < 8) {
				w.error("Password must be at least 8 characters.");
				return;
			}
			Et.value = !0;
			try {
				if (e) {
					let t = {
						username: M.value,
						email: N.value
					};
					P.value && (t.password = P.value), await C.update(e.id, t), e.is_admin !== F.value && await C.setAdmin(e.id, F.value), w.success("User updated.");
				} else {
					let e = {
						username: M.value,
						email: N.value,
						password: P.value,
						is_admin: F.value
					};
					await C.create(e), w.success("User created.");
				}
				At(), await E();
			} catch (e) {
				w.error(n(e, "Failed to save user."));
			} finally {
				Et.value = !1;
			}
		}
		let I = _(null);
		async function Mt() {
			let e = I.value;
			if (e) try {
				await C.remove(e.id), w.success("User deleted."), I.value = null, await E();
			} catch (e) {
				w.error(n(e, "Failed to delete user.")), I.value = null;
			}
		}
		async function Nt(e, t) {
			try {
				await C.setAdmin(e.id, t), w.success(t ? "User promoted to admin." : "Admin status removed."), await E();
			} catch (e) {
				w.error(n(e, "Failed to update admin status."));
			}
		}
		let L = _(null), R = _(null);
		async function Pt(e) {
			L.value = e, R.value = null;
			try {
				R.value = await C.resetPassword(e.id);
			} catch (e) {
				w.error(n(e, "Failed to reset password.")), L.value = null;
			}
		}
		function Ft() {
			L.value = null, R.value = null;
		}
		async function It() {
			let e = R.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), w.success("Password copied to clipboard.");
			} catch {
				w.error("Could not copy to clipboard.");
			}
		}
		let z = _(null), B = _([]), Lt = _(!1), Rt = l(() => z.value ? `Profiles — ${z.value.username}` : "Profiles"), zt = l({
			get: () => z.value !== null,
			set: (e) => {
				e || Ht();
			}
		}), Bt = l(() => B.value.length >= ct);
		async function V(e) {
			Lt.value = !0;
			try {
				B.value = await C.listProfiles(e);
			} catch (e) {
				w.error(n(e, "Failed to load profiles."));
			} finally {
				Lt.value = !1;
			}
		}
		async function Vt(e) {
			z.value = e, await V(e.id);
		}
		function Ht() {
			z.value = null, B.value = [], qt(), G.value = null, Qt();
		}
		let Ut = _(!1), H = _(null), U = _(""), W = _(0), Wt = _(!1);
		function Gt() {
			H.value = null, U.value = "", W.value = 0, Ut.value = !0;
		}
		function Kt(e) {
			H.value = e, U.value = e.name, W.value = e.rating, Ut.value = !0;
		}
		function qt() {
			Ut.value = !1, H.value = null, U.value = "", W.value = 0;
		}
		async function Jt() {
			let e = z.value;
			if (e) {
				if (!U.value.trim()) {
					w.error("Profile name is required.");
					return;
				}
				Wt.value = !0;
				try {
					if (H.value) {
						let e = {
							name: U.value,
							rating: W.value
						};
						await C.updateProfile(H.value.id, e), w.success("Profile updated.");
					} else {
						if (Bt.value) {
							w.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: U.value,
							rating: W.value
						};
						await C.createProfile(e.id, t), w.success("Profile created.");
					}
					qt(), await V(e.id);
				} catch (e) {
					w.error(n(e, "Failed to save profile."));
				} finally {
					Wt.value = !1;
				}
			}
		}
		let G = _(null);
		async function Yt() {
			let e = z.value, t = G.value;
			if (!(!e || !t)) try {
				await C.removeProfile(t.id), w.success("Profile deleted."), G.value = null, await V(e.id);
			} catch (e) {
				w.error(n(e, "Failed to delete profile.")), G.value = null;
			}
		}
		let K = _(null), q = _(""), Xt = _(!1);
		function Zt(e) {
			K.value = e, q.value = "";
		}
		function Qt() {
			K.value = null, q.value = "";
		}
		async function $t() {
			let e = z.value, t = K.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test(q.value) && !/^\d{6}$/.test(q.value)) {
					w.error("PIN must be 4 or 6 digits.");
					return;
				}
				Xt.value = !0;
				try {
					await C.setPin(t.id, q.value), w.success("PIN set."), Qt(), await V(e.id);
				} catch (e) {
					w.error(n(e, "Failed to set PIN."));
				} finally {
					Xt.value = !1;
				}
			}
		}
		async function en(e) {
			let t = z.value;
			if (t) try {
				await C.clearPin(e.id), w.success("PIN cleared."), await V(t.id);
			} catch (e) {
				w.error(n(e, "Failed to clear PIN."));
			}
		}
		let tn = l(() => ce.map((e) => ({
			value: e.value,
			label: e.label
		}))), J = _(null), nn = _(!1), rn = _(!1), Y = _(null), X = _(oe), Z = _("0"), Q = _("0"), $ = _("0"), an = _({
			quotaInGiB: "0",
			quotaOutGiB: "0",
			maxStreams: "0"
		}), on = l(() => J.value ? `Relay limits — ${J.value.username}` : "Relay limits"), sn = l({
			get: () => J.value !== null,
			set: (e) => {
				e || pn();
			}
		});
		function cn(e) {
			return e ? String(Number((e / lt).toFixed(6))) : "0";
		}
		function ln(e) {
			let t = typeof e == "number" ? e : Number(e);
			if (!Number.isFinite(t) || t < 0) return null;
			let n = Math.round(t * lt);
			return n > ut ? null : n;
		}
		function un(e) {
			let t = typeof e == "number" ? e : Number(e);
			return !Number.isInteger(t) || t < 0 || t > dt ? null : t;
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
				let t = await C.getBandwidth(e.id);
				Y.value = t, X.value = t.throttle_bps, Z.value = cn(t.quota_bytes_in), Q.value = cn(t.quota_bytes_out), $.value = String(t.max_concurrent_streams), an.value = {
					quotaInGiB: String(Z.value),
					quotaOutGiB: String(Q.value),
					maxStreams: String($.value)
				};
			} catch (e) {
				w.error(n(e, "Failed to load relay limits.")), J.value = null;
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
			let r = ln(Z.value), ee = ln(Q.value), i = un($.value);
			if (r === null || ee === null) {
				w.error("Byte caps must be a non-negative number of GiB (≤ 1 PiB); 0 = unlimited.");
				return;
			}
			if (i === null) {
				w.error("Max concurrent streams must be a whole number 0–1000; 0 = unlimited.");
				return;
			}
			let a = an.value, te = X.value !== t.throttle_bps, o = String(Z.value) !== a.quotaInGiB || String(Q.value) !== a.quotaOutGiB || String($.value) !== a.maxStreams;
			if (!te && !o) {
				w.error("No changes to save.");
				return;
			}
			rn.value = !0;
			try {
				if (te && await C.setThrottle(e.id, X.value), o) {
					let t = {
						quota_bytes_in: r,
						quota_bytes_out: ee,
						max_concurrent_streams: i
					};
					await C.setQuota(e.id, t);
				}
				w.success("Relay limits saved."), pn();
			} catch (e) {
				w.error(n(e, "Failed to save relay limits."));
			} finally {
				rn.value = !1;
			}
		}
		function hn(e) {
			return se[e] ?? se[12];
		}
		return pe(E), (e, t) => (g(), f("section", _e, [
			p("header", ve, [t[22] ||= p("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Ot
			}, {
				default: b(() => [...t[21] ||= [m("Add user", -1)]]),
				_: 1
			})]),
			h(ie, {
				links: he(ue).users.links,
				details: he(ue).users.details
			}, {
				default: b(() => [...t[23] ||= [
					m(" Manage everyone who can sign in. ", -1),
					p("strong", null, "Add user", -1),
					m(" creates an account; ", -1),
					p("strong", null, "Edit", -1),
					m(" changes a name, email, or password. ", -1),
					p("strong", null, "Approve", -1),
					m(" / ", -1),
					p("strong", null, "Reject", -1),
					m(" handle pending sign-up requests, and ", -1),
					p("strong", null, "Disable", -1),
					m(" / ", -1),
					p("strong", null, "Enable", -1),
					m(" block or restore access. ", -1),
					p("strong", null, "Set Admin", -1),
					m(" / ", -1),
					p("strong", null, "Demote", -1),
					m(" toggles admin rights, ", -1),
					p("strong", null, "Reset Password", -1),
					m(" issues a new one, and ", -1),
					p("strong", null, "Profiles", -1),
					m(" manages a user's watch profiles and their optional PINs. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			_t.value ? (g(), f("div", ye, [h(ne, {
				variant: "text",
				lines: 6
			})])) : T.value ? (g(), u(re, {
				key: 1,
				icon: "alert",
				title: "Couldn't load users",
				description: T.value
			}, {
				actions: b(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: E
				}, {
					default: b(() => [...t[24] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : gt.value.length === 0 ? (g(), u(re, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: b(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Ot
				}, {
					default: b(() => [...t[25] ||= [m("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), f(c, { key: 3 }, [vt.value.length > 0 ? (g(), f("section", be, [p("h2", xe, [t[26] ||= m(" Pending approval ", -1), h(a, { tone: "warning" }, {
				default: b(() => [m(v(vt.value.length), 1)]),
				_: 1
			})]), p("table", Se, [t[29] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Username"),
				p("th", { scope: "col" }, "Email"),
				p("th", { scope: "col" }, "Requested"),
				p("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(g(!0), f(c, null, me(vt.value, (e) => (g(), f("tr", { key: e.id }, [
				p("td", null, v(e.username), 1),
				p("td", null, v(e.email), 1),
				p("td", Ce, v(e.created_at.slice(0, 10)), 1),
				p("td", null, [p("div", we, [h(i, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => Ct(e)
				}, {
					default: b(() => [...t[27] ||= [m(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), h(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => k.value = e
				}, {
					default: b(() => [...t[28] ||= [m(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : d("", !0), p("table", Te, [t[39] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Username"),
				p("th", { scope: "col" }, "Email"),
				p("th", { scope: "col" }, "Role"),
				p("th", { scope: "col" }, "Status"),
				p("th", { scope: "col" }, "Created"),
				p("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(g(!0), f(c, null, me(gt.value, (e) => (g(), f("tr", { key: e.id }, [
				p("td", null, v(e.username), 1),
				p("td", null, v(e.email), 1),
				p("td", null, [h(a, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: b(() => [m(v(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("td", null, [h(a, { tone: St(e) }, {
					default: b(() => [m(v(xt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("td", Ee, v(e.created_at.slice(0, 10)), 1),
				p("td", null, [p("div", De, [
					D(e) === "pending" ? (g(), u(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => Ct(e)
					}, {
						default: b(() => [...t[30] ||= [m(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : D(e) === "disabled" ? (g(), u(i, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => Ct(e)
					}, {
						default: b(() => [...t[31] ||= [m(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (g(), u(i, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => O.value = e
					}, {
						default: b(() => [...t[32] ||= [m(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					D(e) === "pending" ? (g(), u(i, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => k.value = e
					}, {
						default: b(() => [...t[33] ||= [m(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : d("", !0),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => kt(e)
					}, {
						default: b(() => [...t[34] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => Nt(e, !e.is_admin)
					}, {
						default: b(() => [m(v(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => Pt(e)
					}, {
						default: b(() => [...t[35] ||= [m(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => Vt(e)
					}, {
						default: b(() => [...t[36] ||= [m(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					mt.value ? (g(), u(i, {
						key: 4,
						variant: "ghost",
						size: "sm",
						"aria-label": `Relay limits for ${e.username}`,
						onClick: (t) => fn(e)
					}, {
						default: b(() => [...t[37] ||= [m(" Relay ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : d("", !0),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => I.value = e
					}, {
						default: b(() => [...t[38] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			h(s, {
				modelValue: A.value,
				"onUpdate:modelValue": t[4] ||= (e) => A.value = e,
				title: Dt.value,
				onClose: At
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: At
				}, {
					default: b(() => [...t[42] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: Et.value,
					onClick: jt
				}, {
					default: b(() => [m(v(j.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-users__form",
					onSubmit: ge(jt, ["prevent"])
				}, [
					p("label", Oe, [t[40] ||= p("span", { class: "admin-users__label" }, "Username", -1), x(p("input", {
						"onUpdate:modelValue": t[0] ||= (e) => M.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, M.value]])]),
					p("label", ke, [t[41] ||= p("span", { class: "admin-users__label" }, "Email", -1), x(p("input", {
						"onUpdate:modelValue": t[1] ||= (e) => N.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, N.value]])]),
					p("label", Ae, [p("span", je, v(j.value ? "Password (leave blank to keep current)" : "Password"), 1), x(p("input", {
						"onUpdate:modelValue": t[2] ||= (e) => P.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						"data-lpignore": "true",
						"data-1p-ignore": "",
						"data-bwignore": "",
						"data-form-type": "other",
						placeholder: j.value ? "(unchanged)" : void 0,
						required: !j.value
					}, null, 8, Me), [[y, P.value]])]),
					h(te, {
						modelValue: F.value,
						"onUpdate:modelValue": t[3] ||= (e) => F.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(s, {
				"model-value": I.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => I.value = null
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => I.value = null
				}, {
					default: b(() => [...t[45] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: Mt
				}, {
					default: b(() => [...t[46] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					t[43] ||= m(" Delete user ", -1),
					p("strong", null, v(I.value?.username), 1),
					t[44] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(s, {
				"model-value": O.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => O.value = null
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => O.value = null
				}, {
					default: b(() => [...t[49] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: wt
				}, {
					default: b(() => [...t[50] ||= [m("Disable", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					t[47] ||= m(" Disable ", -1),
					p("strong", null, v(O.value?.username), 1),
					t[48] ||= m("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(s, {
				"model-value": k.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": t[10] ||= (e) => k.value = null
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[9] ||= (e) => k.value = null
				}, {
					default: b(() => [...t[53] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: Tt
				}, {
					default: b(() => [...t[54] ||= [m("Reject", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					t[51] ||= m(" Reject ", -1),
					p("strong", null, v(k.value?.username), 1),
					t[52] ||= m("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(s, {
				"model-value": L.value !== null,
				title: L.value ? `Reset password — ${L.value.username}` : "Reset password",
				"onUpdate:modelValue": Ft
			}, {
				footer: b(() => [h(i, {
					variant: "solid",
					size: "sm",
					onClick: Ft
				}, {
					default: b(() => [...t[59] ||= [m("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [R.value ? (g(), f("div", Ne, [p("p", null, v(R.value.message), 1), p("label", Pe, [t[56] ||= p("span", { class: "admin-users__label" }, "New password", -1), p("div", Fe, [p("input", {
					value: R.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Ie), h(i, {
					variant: "outline",
					size: "sm",
					onClick: It
				}, {
					default: b(() => [...t[55] ||= [m("Copy", -1)]]),
					_: 1
				})])])])) : (g(), f("p", Le, [
					t[57] ||= m(" Resetting password for ", -1),
					p("strong", null, v(L.value?.username), 1),
					t[58] ||= m("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			h(s, {
				modelValue: zt.value,
				"onUpdate:modelValue": t[15] ||= (e) => zt.value = e,
				title: Rt.value,
				size: "lg"
			}, {
				default: b(() => [Lt.value ? (g(), f("div", Re, [h(ne, {
					variant: "text",
					lines: 4
				})])) : (g(), f(c, { key: 1 }, [
					p("div", ze, [h(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: Bt.value,
						"aria-label": "Add profile",
						onClick: Gt
					}, {
						default: b(() => [m(" Add profile" + v(Bt.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					B.value.length === 0 ? (g(), u(re, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (g(), f("table", Be, [t[64] ||= p("thead", null, [p("tr", null, [
						p("th", { scope: "col" }, "Name"),
						p("th", { scope: "col" }, "Rating"),
						p("th", { scope: "col" }, "PIN"),
						p("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), p("tbody", null, [(g(!0), f(c, null, me(B.value, (e) => (g(), f("tr", { key: e.id }, [
						p("td", null, v(e.name), 1),
						p("td", null, [h(a, { tone: "info" }, {
							default: b(() => [m(v(hn(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						p("td", null, [h(a, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: b(() => [m(v(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						p("td", null, [p("div", Ve, [
							h(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => Kt(e)
							}, {
								default: b(() => [...t[60] ||= [m(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							h(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Zt(e)
							}, {
								default: b(() => [...t[61] ||= [m(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? d("", !0) : (g(), u(i, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => en(e)
							}, {
								default: b(() => [...t[62] ||= [m(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							h(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => G.value = e
							}, {
								default: b(() => [...t[63] ||= [m(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					Ut.value ? (g(), f("div", He, [p("h3", Ue, v(H.value ? "Edit profile" : "Add profile"), 1), p("form", {
						class: "admin-users__form",
						onSubmit: ge(Jt, ["prevent"])
					}, [
						p("label", We, [t[65] ||= p("span", { class: "admin-users__label" }, "Name", -1), x(p("input", {
							"onUpdate:modelValue": t[11] ||= (e) => U.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[y, U.value]])]),
						p("label", Ge, [t[66] ||= p("span", { class: "admin-users__label" }, "Rating", -1), h(o, {
							"model-value": W.value,
							options: ht.value,
							label: "Rating",
							"onUpdate:modelValue": t[12] ||= (e) => W.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						p("div", Ke, [h(i, {
							variant: "ghost",
							size: "sm",
							onClick: qt
						}, {
							default: b(() => [...t[67] ||= [m("Cancel", -1)]]),
							_: 1
						}), h(i, {
							variant: "solid",
							size: "sm",
							loading: Wt.value,
							onClick: Jt
						}, {
							default: b(() => [m(v(H.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : d("", !0),
					G.value ? (g(), f("div", qe, [p("p", null, [
						t[68] ||= m(" Delete profile ", -1),
						p("strong", null, v(G.value.name), 1),
						t[69] ||= m("? This cannot be undone. ", -1)
					]), p("div", Je, [h(i, {
						variant: "ghost",
						size: "sm",
						onClick: t[13] ||= (e) => G.value = null
					}, {
						default: b(() => [...t[70] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(i, {
						variant: "solid",
						size: "sm",
						onClick: Yt
					}, {
						default: b(() => [...t[71] ||= [m("Delete", -1)]]),
						_: 1
					})])])) : d("", !0),
					K.value ? (g(), f("div", Ye, [p("h3", Xe, "Set PIN — " + v(K.value.name), 1), p("form", {
						class: "admin-users__form",
						onSubmit: ge($t, ["prevent"])
					}, [p("label", Ze, [t[72] ||= p("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), x(p("input", {
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
					}, null, 512), [[y, q.value]])]), p("div", Qe, [h(i, {
						variant: "ghost",
						size: "sm",
						onClick: Qt
					}, {
						default: b(() => [...t[73] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(i, {
						variant: "solid",
						size: "sm",
						loading: Xt.value,
						onClick: $t
					}, {
						default: b(() => [...t[74] ||= [m("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : d("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(s, {
				modelValue: sn.value,
				"onUpdate:modelValue": t[20] ||= (e) => sn.value = e,
				title: on.value
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: pn
				}, {
					default: b(() => [...t[87] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: rn.value,
					disabled: !Y.value,
					onClick: mn
				}, {
					default: b(() => [...t[88] ||= [m(" Save ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: b(() => [nn.value ? (g(), f("div", $e, [h(ne, {
					variant: "text",
					lines: 4
				})])) : Y.value ? (g(), f("div", et, [p("div", tt, [
					t[76] ||= p("h3", { class: "admin-users__subform-title" }, "Bandwidth throttle", -1),
					t[77] ||= p("p", { class: "admin-users__relay-note" }, [
						m(" A hard cap on the relay stream rate (not a monthly total). The default is 3 Mbps; "),
						p("strong", null, "Unlimited"),
						m(" turns the throttle off for this user. ")
					], -1),
					p("label", nt, [t[75] ||= p("span", { class: "admin-users__label" }, "Throttle", -1), h(o, {
						"model-value": X.value,
						options: tn.value,
						label: "Throttle",
						"onUpdate:modelValue": t[16] ||= (e) => X.value = Number(e)
					}, null, 8, ["model-value", "options"])])
				]), p("div", rt, [
					t[86] ||= p("h3", { class: "admin-users__subform-title" }, "Monthly quota", -1),
					p("p", it, [
						t[78] ||= m(" Per-calendar-month byte caps and a concurrent-stream cap. Enter ", -1),
						t[79] ||= p("strong", null, "0", -1),
						t[80] ||= m(" for unlimited. Used this period: ", -1),
						p("strong", null, v(dn(Y.value.bytes_in)), 1),
						t[81] ||= m(" down / ", -1),
						p("strong", null, v(dn(Y.value.bytes_out)), 1),
						t[82] ||= m(" up. ", -1)
					]),
					p("label", at, [t[83] ||= p("span", { class: "admin-users__label" }, "Download cap (GiB, 0 = unlimited)", -1), x(p("input", {
						"onUpdate:modelValue": t[17] ||= (e) => Z.value = e,
						type: "number",
						min: "0",
						step: "0.1",
						class: "admin-users__input",
						inputmode: "decimal"
					}, null, 512), [[y, Z.value]])]),
					p("label", ot, [t[84] ||= p("span", { class: "admin-users__label" }, "Upload cap (GiB, 0 = unlimited)", -1), x(p("input", {
						"onUpdate:modelValue": t[18] ||= (e) => Q.value = e,
						type: "number",
						min: "0",
						step: "0.1",
						class: "admin-users__input",
						inputmode: "decimal"
					}, null, 512), [[y, Q.value]])]),
					p("label", st, [t[85] ||= p("span", { class: "admin-users__label" }, "Max concurrent streams (0 = unlimited)", -1), x(p("input", {
						"onUpdate:modelValue": t[19] ||= (e) => $.value = e,
						type: "number",
						min: "0",
						max: "1000",
						step: "1",
						class: "admin-users__input",
						inputmode: "numeric"
					}, null, 512), [[y, $.value]])])
				])])) : d("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-5d9cf6a3"]]);
//#endregion
export { S as default };

//# sourceMappingURL=UsersPage-DEdQQTiQ.js.map