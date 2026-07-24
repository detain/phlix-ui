import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-CqhoiLRk.js";
import { c as n, f as r, t as i } from "./client-BzWwyWKr.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Button-DWa6Ld_Z.js";
import { t as s } from "./Badge-B6MgOwKQ.js";
import { t as ee } from "./Switch-DyS2L5gX.js";
import { t as te } from "./Select-Cvp-73pF.js";
import { t as ne } from "./Skeleton-DhQmxeNg.js";
import { t as re } from "./EmptyState-ZlI5t4KT.js";
import { t as ie } from "./PageHint-BoAlFFBN.js";
import { a as ae, n as oe, r as se, s as ce, t as le } from "./users-BHiKEDvi.js";
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
		let de = e, S = fe("apiBase", ""), ft = l(() => typeof S == "string" ? S : S?.value ?? ""), C = new le(de.client ?? new i({
			baseUrl: ft.value,
			tokenStore: new n()
		})), w = a(), pt = fe("phlixConfig", null), mt = l(() => pt?.app === "hub"), ht = l(() => ae.map((e) => ({
			value: e.value,
			label: e.label
		}))), T = _([]), gt = _(!0), E = _(null);
		async function D() {
			gt.value = !0, E.value = null;
			try {
				T.value = await C.list();
			} catch (e) {
				E.value = r(e, "Failed to load users."), w.error(E.value);
			} finally {
				gt.value = !1;
			}
		}
		function O(e) {
			return e.status ?? "active";
		}
		let _t = l(() => T.value.filter((e) => O(e) === "pending")), vt = {
			pending: "Pending",
			active: "Active",
			disabled: "Disabled"
		}, yt = {
			pending: "warning",
			active: "success",
			disabled: "neutral"
		};
		function bt(e) {
			return vt[O(e)];
		}
		function xt(e) {
			return yt[O(e)];
		}
		async function St(e) {
			try {
				await C.approve(e.id), w.success(`${e.username} approved.`), await D();
			} catch (e) {
				w.error(r(e, "Failed to approve user."));
			}
		}
		let k = _(null);
		async function Ct() {
			let e = k.value;
			if (e) try {
				await C.disable(e.id), w.success(`${e.username} disabled.`), k.value = null, await D();
			} catch (e) {
				w.error(r(e, "Failed to disable user.")), k.value = null;
			}
		}
		let A = _(null);
		async function wt() {
			let e = A.value;
			if (e) try {
				await C.reject(e.id), w.success(`${e.username}'s signup rejected.`), A.value = null, await D();
			} catch (e) {
				w.error(r(e, "Failed to reject user.")), A.value = null;
			}
		}
		let j = _(!1), M = _(null), N = _(""), P = _(""), F = _(""), I = _(!1), Tt = _(!1), Et = l(() => M.value ? `Edit user — ${M.value.username}` : "Add user");
		function Dt() {
			M.value = null, N.value = "", P.value = "", F.value = "", I.value = !1, j.value = !0;
		}
		function Ot(e) {
			M.value = e, N.value = e.username, P.value = e.email, F.value = "", I.value = e.is_admin, j.value = !0;
		}
		function kt() {
			j.value = !1, M.value = null;
		}
		async function At() {
			if (!N.value.trim() || !P.value.trim()) {
				w.error("Username and email are required.");
				return;
			}
			let e = M.value;
			if (!e && !F.value) {
				w.error("Password is required for new users.");
				return;
			}
			if (!e && F.value.length < 8) {
				w.error("Password must be at least 8 characters.");
				return;
			}
			Tt.value = !0;
			try {
				if (e) {
					let t = {
						username: N.value,
						email: P.value
					};
					F.value && (t.password = F.value), await C.update(e.id, t), e.is_admin !== I.value && await C.setAdmin(e.id, I.value), w.success("User updated.");
				} else {
					let e = {
						username: N.value,
						email: P.value,
						password: F.value,
						is_admin: I.value
					};
					await C.create(e), w.success("User created.");
				}
				kt(), await D();
			} catch (e) {
				w.error(r(e, "Failed to save user."));
			} finally {
				Tt.value = !1;
			}
		}
		let L = _(null);
		async function jt() {
			let e = L.value;
			if (e) try {
				await C.remove(e.id), w.success("User deleted."), L.value = null, await D();
			} catch (e) {
				w.error(r(e, "Failed to delete user.")), L.value = null;
			}
		}
		async function Mt(e, t) {
			try {
				await C.setAdmin(e.id, t), w.success(t ? "User promoted to admin." : "Admin status removed."), await D();
			} catch (e) {
				w.error(r(e, "Failed to update admin status."));
			}
		}
		let R = _(null), z = _(null);
		async function Nt(e) {
			R.value = e, z.value = null;
			try {
				z.value = await C.resetPassword(e.id);
			} catch (e) {
				w.error(r(e, "Failed to reset password.")), R.value = null;
			}
		}
		function Pt() {
			R.value = null, z.value = null;
		}
		async function Ft() {
			let e = z.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), w.success("Password copied to clipboard.");
			} catch {
				w.error("Could not copy to clipboard.");
			}
		}
		let B = _(null), V = _([]), It = _(!1), Lt = l(() => B.value ? `Profiles — ${B.value.username}` : "Profiles"), Rt = l({
			get: () => B.value !== null,
			set: (e) => {
				e || Vt();
			}
		}), zt = l(() => V.value.length >= ct);
		async function H(e) {
			It.value = !0;
			try {
				V.value = await C.listProfiles(e);
			} catch (e) {
				w.error(r(e, "Failed to load profiles."));
			} finally {
				It.value = !1;
			}
		}
		async function Bt(e) {
			B.value = e, await H(e.id);
		}
		function Vt() {
			B.value = null, V.value = [], Gt(), q.value = null, Xt();
		}
		let U = _(!1), W = _(null), G = _(""), K = _(0), Ht = _(!1);
		function Ut() {
			W.value = null, G.value = "", K.value = 0, U.value = !0;
		}
		function Wt(e) {
			W.value = e, G.value = e.name, K.value = e.rating, U.value = !0;
		}
		function Gt() {
			U.value = !1, W.value = null, G.value = "", K.value = 0;
		}
		async function Kt() {
			let e = B.value;
			if (e) {
				if (!G.value.trim()) {
					w.error("Profile name is required.");
					return;
				}
				Ht.value = !0;
				try {
					if (W.value) {
						let e = {
							name: G.value,
							rating: K.value
						};
						await C.updateProfile(W.value.id, e), w.success("Profile updated.");
					} else {
						if (zt.value) {
							w.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: G.value,
							rating: K.value
						};
						await C.createProfile(e.id, t), w.success("Profile created.");
					}
					Gt(), await H(e.id);
				} catch (e) {
					w.error(r(e, "Failed to save profile."));
				} finally {
					Ht.value = !1;
				}
			}
		}
		let q = _(null);
		async function qt() {
			let e = B.value, t = q.value;
			if (!(!e || !t)) try {
				await C.removeProfile(t.id), w.success("Profile deleted."), q.value = null, await H(e.id);
			} catch (e) {
				w.error(r(e, "Failed to delete profile.")), q.value = null;
			}
		}
		let J = _(null), Y = _(""), Jt = _(!1);
		function Yt(e) {
			J.value = e, Y.value = "";
		}
		function Xt() {
			J.value = null, Y.value = "";
		}
		async function Zt() {
			let e = B.value, t = J.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test(Y.value) && !/^\d{6}$/.test(Y.value)) {
					w.error("PIN must be 4 or 6 digits.");
					return;
				}
				Jt.value = !0;
				try {
					await C.setPin(t.id, Y.value), w.success("PIN set."), Xt(), await H(e.id);
				} catch (e) {
					w.error(r(e, "Failed to set PIN."));
				} finally {
					Jt.value = !1;
				}
			}
		}
		async function Qt(e) {
			let t = B.value;
			if (t) try {
				await C.clearPin(e.id), w.success("PIN cleared."), await H(t.id);
			} catch (e) {
				w.error(r(e, "Failed to clear PIN."));
			}
		}
		let $t = l(() => ce.map((e) => ({
			value: e.value,
			label: e.label
		}))), X = _(null), en = _(!1), tn = _(!1), Z = _(null), Q = _(oe), $ = _("0"), nn = _("0"), rn = _("0"), an = l(() => X.value ? `Relay limits — ${X.value.username}` : "Relay limits"), on = l({
			get: () => X.value !== null,
			set: (e) => {
				e || fn();
			}
		});
		function sn(e) {
			return e ? String(Number((e / lt).toFixed(6))) : "0";
		}
		function cn(e) {
			let t = typeof e == "number" ? e : Number(e);
			if (!Number.isFinite(t) || t < 0) return null;
			let n = Math.round(t * lt);
			return n > ut ? null : n;
		}
		function ln(e) {
			let t = typeof e == "number" ? e : Number(e);
			return !Number.isInteger(t) || t < 0 || t > dt ? null : t;
		}
		function un(e) {
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
		async function dn(e) {
			X.value = e, Z.value = null, en.value = !0;
			try {
				let t = await C.getBandwidth(e.id);
				Z.value = t, Q.value = t.throttle_bps, $.value = sn(t.quota_bytes_in), nn.value = sn(t.quota_bytes_out), rn.value = String(t.max_concurrent_streams);
			} catch (e) {
				w.error(r(e, "Failed to load relay limits.")), X.value = null;
			} finally {
				en.value = !1;
			}
		}
		function fn() {
			X.value = null, Z.value = null;
		}
		async function pn() {
			let e = X.value, t = Z.value;
			if (!e || !t) return;
			let n = cn($.value), i = cn(nn.value), a = ln(rn.value);
			if (n === null || i === null) {
				w.error("Byte caps must be a non-negative number of GiB (≤ 1 PiB); 0 = unlimited.");
				return;
			}
			if (a === null) {
				w.error("Max concurrent streams must be a whole number 0–1000; 0 = unlimited.");
				return;
			}
			let o = Q.value !== t.throttle_bps, s = n !== t.quota_bytes_in || i !== t.quota_bytes_out || a !== t.max_concurrent_streams;
			if (!o && !s) {
				w.error("No changes to save.");
				return;
			}
			tn.value = !0;
			try {
				if (o && await C.setThrottle(e.id, Q.value), s) {
					let t = {
						quota_bytes_in: n,
						quota_bytes_out: i,
						max_concurrent_streams: a
					};
					await C.setQuota(e.id, t);
				}
				w.success("Relay limits saved."), fn();
			} catch (e) {
				w.error(r(e, "Failed to save relay limits."));
			} finally {
				tn.value = !1;
			}
		}
		function mn(e) {
			return se[e] ?? se[12];
		}
		return pe(D), (e, n) => (g(), f("section", _e, [
			p("header", ve, [n[22] ||= p("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), h(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Dt
			}, {
				default: b(() => [...n[21] ||= [m("Add user", -1)]]),
				_: 1
			})]),
			h(ie, {
				links: he(ue).users.links,
				details: he(ue).users.details
			}, {
				default: b(() => [...n[23] ||= [
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
			gt.value ? (g(), f("div", ye, [h(ne, {
				variant: "text",
				lines: 6
			})])) : E.value ? (g(), u(re, {
				key: 1,
				icon: "alert",
				title: "Couldn't load users",
				description: E.value
			}, {
				actions: b(() => [h(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: D
				}, {
					default: b(() => [...n[24] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value.length === 0 ? (g(), u(re, {
				key: 2,
				icon: "user",
				title: "No users yet"
			}, {
				actions: b(() => [h(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Dt
				}, {
					default: b(() => [...n[25] ||= [m("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), f(c, { key: 3 }, [_t.value.length > 0 ? (g(), f("section", be, [p("h2", xe, [n[26] ||= m(" Pending approval ", -1), h(s, { tone: "warning" }, {
				default: b(() => [m(v(_t.value.length), 1)]),
				_: 1
			})]), p("table", Se, [n[29] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Username"),
				p("th", { scope: "col" }, "Email"),
				p("th", { scope: "col" }, "Requested"),
				p("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(g(!0), f(c, null, me(_t.value, (e) => (g(), f("tr", { key: e.id }, [
				p("td", null, v(e.username), 1),
				p("td", null, v(e.email), 1),
				p("td", Ce, v(e.created_at.slice(0, 10)), 1),
				p("td", null, [p("div", we, [h(o, {
					variant: "solid",
					size: "sm",
					"aria-label": `Approve ${e.username}`,
					onClick: (t) => St(e)
				}, {
					default: b(() => [...n[27] ||= [m(" Approve ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), h(o, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject ${e.username}`,
					onClick: (t) => A.value = e
				}, {
					default: b(() => [...n[28] ||= [m(" Reject ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])) : d("", !0), p("table", Te, [n[39] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Username"),
				p("th", { scope: "col" }, "Email"),
				p("th", { scope: "col" }, "Role"),
				p("th", { scope: "col" }, "Status"),
				p("th", { scope: "col" }, "Created"),
				p("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(g(!0), f(c, null, me(T.value, (e) => (g(), f("tr", { key: e.id }, [
				p("td", null, v(e.username), 1),
				p("td", null, v(e.email), 1),
				p("td", null, [h(s, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: b(() => [m(v(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("td", null, [h(s, { tone: xt(e) }, {
					default: b(() => [m(v(bt(e)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("td", Ee, v(e.created_at.slice(0, 10)), 1),
				p("td", null, [p("div", De, [
					O(e) === "pending" ? (g(), u(o, {
						key: 0,
						variant: "solid",
						size: "sm",
						"aria-label": `Approve ${e.username}`,
						onClick: (t) => St(e)
					}, {
						default: b(() => [...n[30] ||= [m(" Approve ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : O(e) === "disabled" ? (g(), u(o, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"aria-label": `Enable ${e.username}`,
						onClick: (t) => St(e)
					}, {
						default: b(() => [...n[31] ||= [m(" Enable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : (g(), u(o, {
						key: 2,
						variant: "ghost",
						size: "sm",
						"aria-label": `Disable ${e.username}`,
						onClick: (t) => k.value = e
					}, {
						default: b(() => [...n[32] ||= [m(" Disable ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])),
					O(e) === "pending" ? (g(), u(o, {
						key: 3,
						variant: "ghost",
						size: "sm",
						"aria-label": `Reject ${e.username}`,
						onClick: (t) => A.value = e
					}, {
						default: b(() => [...n[33] ||= [m(" Reject ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : d("", !0),
					h(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => Ot(e)
					}, {
						default: b(() => [...n[34] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => Mt(e, !e.is_admin)
					}, {
						default: b(() => [m(v(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					h(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => Nt(e)
					}, {
						default: b(() => [...n[35] ||= [m(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => Bt(e)
					}, {
						default: b(() => [...n[36] ||= [m(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					mt.value ? (g(), u(o, {
						key: 4,
						variant: "ghost",
						size: "sm",
						"aria-label": `Relay limits for ${e.username}`,
						onClick: (t) => dn(e)
					}, {
						default: b(() => [...n[37] ||= [m(" Relay ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : d("", !0),
					h(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => L.value = e
					}, {
						default: b(() => [...n[38] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])], 64)),
			h(t, {
				modelValue: j.value,
				"onUpdate:modelValue": n[4] ||= (e) => j.value = e,
				title: Et.value,
				onClose: kt
			}, {
				footer: b(() => [h(o, {
					variant: "ghost",
					size: "sm",
					onClick: kt
				}, {
					default: b(() => [...n[42] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(o, {
					variant: "solid",
					size: "sm",
					loading: Tt.value,
					onClick: At
				}, {
					default: b(() => [m(v(M.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-users__form",
					onSubmit: ge(At, ["prevent"])
				}, [
					p("label", Oe, [n[40] ||= p("span", { class: "admin-users__label" }, "Username", -1), x(p("input", {
						"onUpdate:modelValue": n[0] ||= (e) => N.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, N.value]])]),
					p("label", ke, [n[41] ||= p("span", { class: "admin-users__label" }, "Email", -1), x(p("input", {
						"onUpdate:modelValue": n[1] ||= (e) => P.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, P.value]])]),
					p("label", Ae, [p("span", je, v(M.value ? "Password (leave blank to keep current)" : "Password"), 1), x(p("input", {
						"onUpdate:modelValue": n[2] ||= (e) => F.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						"data-lpignore": "true",
						"data-1p-ignore": "",
						"data-bwignore": "",
						"data-form-type": "other",
						placeholder: M.value ? "(unchanged)" : void 0,
						required: !M.value
					}, null, 8, Me), [[y, F.value]])]),
					h(ee, {
						modelValue: I.value,
						"onUpdate:modelValue": n[3] ||= (e) => I.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(t, {
				"model-value": L.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => L.value = null
			}, {
				footer: b(() => [h(o, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => L.value = null
				}, {
					default: b(() => [...n[45] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(o, {
					variant: "solid",
					size: "sm",
					onClick: jt
				}, {
					default: b(() => [...n[46] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					n[43] ||= m(" Delete user ", -1),
					p("strong", null, v(L.value?.username), 1),
					n[44] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(t, {
				"model-value": k.value !== null,
				title: "Disable user",
				size: "sm",
				"onUpdate:modelValue": n[8] ||= (e) => k.value = null
			}, {
				footer: b(() => [h(o, {
					variant: "ghost",
					size: "sm",
					onClick: n[7] ||= (e) => k.value = null
				}, {
					default: b(() => [...n[49] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(o, {
					variant: "solid",
					size: "sm",
					onClick: Ct
				}, {
					default: b(() => [...n[50] ||= [m("Disable", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					n[47] ||= m(" Disable ", -1),
					p("strong", null, v(k.value?.username), 1),
					n[48] ||= m("? They will be signed out and blocked from signing in until re-enabled. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(t, {
				"model-value": A.value !== null,
				title: "Reject signup",
				size: "sm",
				"onUpdate:modelValue": n[10] ||= (e) => A.value = null
			}, {
				footer: b(() => [h(o, {
					variant: "ghost",
					size: "sm",
					onClick: n[9] ||= (e) => A.value = null
				}, {
					default: b(() => [...n[53] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(o, {
					variant: "solid",
					size: "sm",
					onClick: wt
				}, {
					default: b(() => [...n[54] ||= [m("Reject", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					n[51] ||= m(" Reject ", -1),
					p("strong", null, v(A.value?.username), 1),
					n[52] ||= m("'s signup request? This removes the pending account. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(t, {
				"model-value": R.value !== null,
				title: R.value ? `Reset password — ${R.value.username}` : "Reset password",
				"onUpdate:modelValue": Pt
			}, {
				footer: b(() => [h(o, {
					variant: "solid",
					size: "sm",
					onClick: Pt
				}, {
					default: b(() => [...n[59] ||= [m("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [z.value ? (g(), f("div", Ne, [p("p", null, v(z.value.message), 1), p("label", Pe, [n[56] ||= p("span", { class: "admin-users__label" }, "New password", -1), p("div", Fe, [p("input", {
					value: z.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, Ie), h(o, {
					variant: "outline",
					size: "sm",
					onClick: Ft
				}, {
					default: b(() => [...n[55] ||= [m("Copy", -1)]]),
					_: 1
				})])])])) : (g(), f("p", Le, [
					n[57] ||= m(" Resetting password for ", -1),
					p("strong", null, v(R.value?.username), 1),
					n[58] ||= m("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			h(t, {
				modelValue: Rt.value,
				"onUpdate:modelValue": n[15] ||= (e) => Rt.value = e,
				title: Lt.value,
				size: "lg"
			}, {
				default: b(() => [It.value ? (g(), f("div", Re, [h(ne, {
					variant: "text",
					lines: 4
				})])) : (g(), f(c, { key: 1 }, [
					p("div", ze, [h(o, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: zt.value,
						"aria-label": "Add profile",
						onClick: Ut
					}, {
						default: b(() => [m(" Add profile" + v(zt.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					V.value.length === 0 ? (g(), u(re, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (g(), f("table", Be, [n[64] ||= p("thead", null, [p("tr", null, [
						p("th", { scope: "col" }, "Name"),
						p("th", { scope: "col" }, "Rating"),
						p("th", { scope: "col" }, "PIN"),
						p("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), p("tbody", null, [(g(!0), f(c, null, me(V.value, (e) => (g(), f("tr", { key: e.id }, [
						p("td", null, v(e.name), 1),
						p("td", null, [h(s, { tone: "info" }, {
							default: b(() => [m(v(mn(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						p("td", null, [h(s, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: b(() => [m(v(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						p("td", null, [p("div", Ve, [
							h(o, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => Wt(e)
							}, {
								default: b(() => [...n[60] ||= [m(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							h(o, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Yt(e)
							}, {
								default: b(() => [...n[61] ||= [m(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? d("", !0) : (g(), u(o, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => Qt(e)
							}, {
								default: b(() => [...n[62] ||= [m(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							h(o, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => q.value = e
							}, {
								default: b(() => [...n[63] ||= [m(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					U.value ? (g(), f("div", He, [p("h3", Ue, v(W.value ? "Edit profile" : "Add profile"), 1), p("form", {
						class: "admin-users__form",
						onSubmit: ge(Kt, ["prevent"])
					}, [
						p("label", We, [n[65] ||= p("span", { class: "admin-users__label" }, "Name", -1), x(p("input", {
							"onUpdate:modelValue": n[11] ||= (e) => G.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[y, G.value]])]),
						p("label", Ge, [n[66] ||= p("span", { class: "admin-users__label" }, "Rating", -1), h(te, {
							"model-value": K.value,
							options: ht.value,
							label: "Rating",
							"onUpdate:modelValue": n[12] ||= (e) => K.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						p("div", Ke, [h(o, {
							variant: "ghost",
							size: "sm",
							onClick: Gt
						}, {
							default: b(() => [...n[67] ||= [m("Cancel", -1)]]),
							_: 1
						}), h(o, {
							variant: "solid",
							size: "sm",
							loading: Ht.value,
							onClick: Kt
						}, {
							default: b(() => [m(v(W.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : d("", !0),
					q.value ? (g(), f("div", qe, [p("p", null, [
						n[68] ||= m(" Delete profile ", -1),
						p("strong", null, v(q.value.name), 1),
						n[69] ||= m("? This cannot be undone. ", -1)
					]), p("div", Je, [h(o, {
						variant: "ghost",
						size: "sm",
						onClick: n[13] ||= (e) => q.value = null
					}, {
						default: b(() => [...n[70] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(o, {
						variant: "solid",
						size: "sm",
						onClick: qt
					}, {
						default: b(() => [...n[71] ||= [m("Delete", -1)]]),
						_: 1
					})])])) : d("", !0),
					J.value ? (g(), f("div", Ye, [p("h3", Xe, "Set PIN — " + v(J.value.name), 1), p("form", {
						class: "admin-users__form",
						onSubmit: ge(Zt, ["prevent"])
					}, [p("label", Ze, [n[72] ||= p("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), x(p("input", {
						"onUpdate:modelValue": n[14] ||= (e) => Y.value = e,
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
					}, null, 512), [[y, Y.value]])]), p("div", Qe, [h(o, {
						variant: "ghost",
						size: "sm",
						onClick: Xt
					}, {
						default: b(() => [...n[73] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(o, {
						variant: "solid",
						size: "sm",
						loading: Jt.value,
						onClick: Zt
					}, {
						default: b(() => [...n[74] ||= [m("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : d("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(t, {
				modelValue: on.value,
				"onUpdate:modelValue": n[20] ||= (e) => on.value = e,
				title: an.value
			}, {
				footer: b(() => [h(o, {
					variant: "ghost",
					size: "sm",
					onClick: fn
				}, {
					default: b(() => [...n[87] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(o, {
					variant: "solid",
					size: "sm",
					loading: tn.value,
					disabled: !Z.value,
					onClick: pn
				}, {
					default: b(() => [...n[88] ||= [m(" Save ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: b(() => [en.value ? (g(), f("div", $e, [h(ne, {
					variant: "text",
					lines: 4
				})])) : Z.value ? (g(), f("div", et, [p("div", tt, [
					n[76] ||= p("h3", { class: "admin-users__subform-title" }, "Bandwidth throttle", -1),
					n[77] ||= p("p", { class: "admin-users__relay-note" }, [
						m(" A hard cap on the relay stream rate (not a monthly total). The default is 3 Mbps; "),
						p("strong", null, "Unlimited"),
						m(" turns the throttle off for this user. ")
					], -1),
					p("label", nt, [n[75] ||= p("span", { class: "admin-users__label" }, "Throttle", -1), h(te, {
						"model-value": Q.value,
						options: $t.value,
						label: "Throttle",
						"onUpdate:modelValue": n[16] ||= (e) => Q.value = Number(e)
					}, null, 8, ["model-value", "options"])])
				]), p("div", rt, [
					n[86] ||= p("h3", { class: "admin-users__subform-title" }, "Monthly quota", -1),
					p("p", it, [
						n[78] ||= m(" Per-calendar-month byte caps and a concurrent-stream cap. Enter ", -1),
						n[79] ||= p("strong", null, "0", -1),
						n[80] ||= m(" for unlimited. Used this period: ", -1),
						p("strong", null, v(un(Z.value.bytes_in)), 1),
						n[81] ||= m(" down / ", -1),
						p("strong", null, v(un(Z.value.bytes_out)), 1),
						n[82] ||= m(" up. ", -1)
					]),
					p("label", at, [n[83] ||= p("span", { class: "admin-users__label" }, "Download cap (GiB, 0 = unlimited)", -1), x(p("input", {
						"onUpdate:modelValue": n[17] ||= (e) => $.value = e,
						type: "number",
						min: "0",
						step: "0.1",
						class: "admin-users__input",
						inputmode: "decimal"
					}, null, 512), [[y, $.value]])]),
					p("label", ot, [n[84] ||= p("span", { class: "admin-users__label" }, "Upload cap (GiB, 0 = unlimited)", -1), x(p("input", {
						"onUpdate:modelValue": n[18] ||= (e) => nn.value = e,
						type: "number",
						min: "0",
						step: "0.1",
						class: "admin-users__input",
						inputmode: "decimal"
					}, null, 512), [[y, nn.value]])]),
					p("label", st, [n[85] ||= p("span", { class: "admin-users__label" }, "Max concurrent streams (0 = unlimited)", -1), x(p("input", {
						"onUpdate:modelValue": n[19] ||= (e) => rn.value = e,
						type: "number",
						min: "0",
						max: "1000",
						step: "1",
						class: "admin-users__input",
						inputmode: "numeric"
					}, null, 512), [[y, rn.value]])])
				])])) : d("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-a7765ca9"]]);
//#endregion
export { S as default };

//# sourceMappingURL=UsersPage-cgkvdUuc.js.map