import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-BlNXxmNP.js";
import { l as n, p as r, t as ee } from "./client-DA-5QZXw.js";
import { a as te, t as ne } from "./users-BdXH0IYQ.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-BL3fV7FU.js";
import { t as a } from "./Badge-DbdgvC-x.js";
import { t as ie } from "./Switch-DyS2L5gX.js";
import { t as ae } from "./Select-B_7Gkn8F.js";
import { t as o } from "./Modal-B5BQA5yV.js";
import { t as s } from "./Skeleton-jlFj-j5t.js";
import { t as c } from "./EmptyState-BwwPJtFd.js";
import { t as oe } from "./Tabs-DmJRkhbg.js";
import { t as l } from "./Input-D6hY0oF5.js";
import { t as se } from "./Card-BvLj4L6F.js";
import { Fragment as ce, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as le, inject as ue, normalizeClass as de, onMounted as fe, openBlock as _, ref as v, renderList as pe, toDisplayString as y, unref as me, withCtx as b, withModifiers as x } from "vue";
import { useRoute as he } from "vue-router";
//#region src/pages/ParentalControlsPage.vue?vue&type=script&setup=true&lang.ts
var ge = { class: "parental-page" }, _e = { class: "parental-page__head" }, ve = {
	key: 0,
	class: "parental-page__profile-badge"
}, ye = {
	key: 1,
	class: "parental-page__profile-badge parental-page__profile-badge--unknown",
	role: "status"
}, be = {
	key: 0,
	class: "parental-page__no-profile"
}, xe = { class: "parental-section" }, Se = { class: "parental-section__toolbar" }, Ce = {
	key: 0,
	class: "parental-section__loading"
}, we = {
	key: 3,
	class: "parental-section__list"
}, Te = ["onClick"], Ee = { class: "parental-section__item-main" }, De = { class: "parental-section__item-name" }, Oe = { class: "parental-section__item-meta" }, ke = { class: "parental-section__item-actions" }, Ae = { class: "parental-section" }, je = { class: "parental-section__toolbar" }, Me = {
	key: 0,
	class: "parental-section__loading"
}, Ne = {
	key: 3,
	class: "parental-section__list"
}, Pe = ["onClick"], Fe = { class: "parental-section__item-main" }, Ie = { class: "parental-section__item-name" }, Le = { class: "parental-section__item-actions" }, Re = { class: "parental-section" }, ze = { class: "parental-section__toolbar" }, Be = {
	key: 0,
	class: "parental-section__loading"
}, Ve = { class: "parental-section__limits-row" }, He = { class: "parental-section__limits-value" }, Ue = { class: "parental-section__limits-row" }, We = { class: "parental-section__limits-value" }, Ge = {
	key: 0,
	class: "parental-form__error"
}, Ke = { class: "parental-form__row" }, qe = { class: "parental-form__days" }, Je = { class: "parental-form__day-buttons" }, Ye = { class: "parental-form__actions" }, Xe = {
	key: 0,
	class: "parental-form__error"
}, Ze = { class: "parental-form__actions" }, Qe = {
	key: 0,
	class: "parental-form__error"
}, $e = { class: "parental-form__actions" }, et = { key: 0 }, tt = { class: "parental-form__actions" }, nt = { key: 0 }, rt = { class: "parental-form__actions" }, S = /*#__PURE__*/ e(/* @__PURE__ */ le({
	__name: "ParentalControlsPage",
	props: { client: {} },
	setup(e) {
		let le = he(), S = re(), it = e, C = ue("apiBase", ""), at = u(() => typeof C == "string" ? C : C?.value ?? ""), w = new ne(it.client ?? new ee({
			baseUrl: at.value,
			tokenStore: new n()
		})), T = v([]), E = v(null), D = v(!0), O = v(null), k = u(() => T.value.find((e) => String(e.id) === String(E.value)) ?? null);
		async function ot() {
			let e = E.value;
			if (!e) {
				T.value = [], O.value = null, D.value = !1;
				return;
			}
			D.value = !0, O.value = null;
			try {
				T.value = [await w.getProfile(e)];
			} catch (e) {
				T.value = [], O.value = r(e, "Could not load this profile.");
			} finally {
				D.value = !1;
			}
		}
		fe(() => {
			let e = le.query.profile;
			typeof e == "string" && e.trim() !== "" && (E.value = e.trim()), ot(), E.value && Ot(A.value);
		});
		let st = [
			{
				value: "schedules",
				label: "Schedules",
				icon: "calendar"
			},
			{
				value: "tags",
				label: "Tags",
				icon: "bookmark"
			},
			{
				value: "streamLimits",
				label: "Stream Limits",
				icon: "play"
			}
		], A = v("schedules"), ct = [
			"mon",
			"tue",
			"wed",
			"thu",
			"fri",
			"sat",
			"sun"
		], j = v([]), lt = v(!1), M = v(null), N = v(0), P = v(!1), F = v(null), I = v({
			name: "",
			startTime: "08:00",
			endTime: "22:00",
			daysOfWeek: [
				"mon",
				"tue",
				"wed",
				"thu",
				"fri"
			],
			isActive: !0
		}), L = v(null), R = v(null), ut = u({
			get: () => R.value !== null,
			set: (e) => {
				e || (R.value = null);
			}
		});
		async function z() {
			if (E.value) {
				lt.value = !0, M.value = null;
				try {
					j.value = await w.profileSchedules(E.value), N.value = Math.min(N.value, j.value.length - 1);
				} catch (e) {
					M.value = r(e, "Failed to load schedules.");
				} finally {
					lt.value = !1;
				}
			}
		}
		function dt() {
			F.value = null, I.value = {
				name: "",
				startTime: "08:00",
				endTime: "22:00",
				daysOfWeek: [
					"mon",
					"tue",
					"wed",
					"thu",
					"fri"
				],
				isActive: !0
			}, L.value = null, P.value = !0;
		}
		function ft(e) {
			F.value = e, I.value = {
				name: e.name,
				startTime: e.start_time.substring(0, 5),
				endTime: e.end_time.substring(0, 5),
				daysOfWeek: [...e.days_of_week],
				isActive: e.is_active
			}, L.value = null, P.value = !0;
		}
		function pt() {
			return I.value.name.trim() ? I.value.name.length > 100 ? "Name must be 100 characters or less." : /^\d{1,2}:\d{2}(:\d{2})?$/.test(I.value.startTime) ? /^\d{1,2}:\d{2}(:\d{2})?$/.test(I.value.endTime) ? I.value.daysOfWeek.length === 0 ? "At least one day is required." : null : "Invalid end time. Use HH:MM or HH:MM:SS." : "Invalid start time. Use HH:MM or HH:MM:SS." : "Name is required.";
		}
		async function mt() {
			if (!E.value) return;
			let e = pt();
			if (e) {
				L.value = e;
				return;
			}
			try {
				F.value ? await w.updateProfileSchedule(E.value, F.value.id, I.value.name.trim(), I.value.startTime + ":00", I.value.endTime + ":00", I.value.daysOfWeek, I.value.isActive) : await w.createProfileSchedule(E.value, I.value.name.trim(), I.value.startTime + ":00", I.value.endTime + ":00", I.value.daysOfWeek, I.value.isActive), S.success(F.value ? "Schedule updated." : "Schedule created."), P.value = !1, await z();
			} catch (e) {
				L.value = r(e, "Failed to save schedule.");
			}
		}
		async function ht(e) {
			if (E.value) try {
				await w.deleteProfileSchedule(E.value, e.id), S.success("Schedule deleted."), R.value = null, await z();
			} catch (e) {
				S.error(r(e, "Failed to delete schedule.")), R.value = null;
			}
		}
		function gt(e) {
			let t = I.value.daysOfWeek.indexOf(e);
			t === -1 ? I.value.daysOfWeek.push(e) : I.value.daysOfWeek.splice(t, 1);
		}
		function _t(e) {
			let t = {
				mon: "Mon",
				tue: "Tue",
				wed: "Wed",
				thu: "Thu",
				fri: "Fri",
				sat: "Sat",
				sun: "Sun"
			};
			return e.map((e) => t[e] ?? e).join(", ");
		}
		let vt = [{
			value: "blocked",
			label: "Blocked"
		}, {
			value: "allowed",
			label: "Allowed"
		}], B = v([]), yt = v(!1), V = v(null), H = v(0), U = v(!1), W = v({
			tag: "",
			tagType: "blocked"
		}), G = v(null), K = v(null), bt = u({
			get: () => K.value !== null,
			set: (e) => {
				e || (K.value = null);
			}
		});
		async function q() {
			if (E.value) {
				yt.value = !0, V.value = null;
				try {
					B.value = await w.profileTags(E.value), H.value = Math.min(H.value, B.value.length - 1);
				} catch (e) {
					V.value = r(e, "Failed to load tags.");
				} finally {
					yt.value = !1;
				}
			}
		}
		function xt() {
			W.value = {
				tag: "",
				tagType: "blocked"
			}, G.value = null, U.value = !0;
		}
		async function St() {
			if (!E.value) return;
			let e = W.value.tag.trim();
			if (!e) {
				G.value = "Tag name is required.";
				return;
			}
			if (e.length > 100) {
				G.value = "Tag must be 100 characters or less.";
				return;
			}
			try {
				await w.addProfileTag(E.value, e, W.value.tagType), S.success("Tag added."), U.value = !1, await q();
			} catch (e) {
				G.value = r(e, "Failed to add tag.");
			}
		}
		async function Ct(e) {
			if (E.value) try {
				await w.deleteProfileTag(E.value, e.id), S.success("Tag removed."), K.value = null, await q();
			} catch (e) {
				S.error(r(e, "Failed to remove tag.")), K.value = null;
			}
		}
		let J = v(null), wt = v(!1), Y = v(null), X = v(!1), Z = v({
			maxConcurrentStreams: 1,
			maxTotalBandwidthKbps: ""
		}), Q = v(null);
		function Tt(e, t) {
			let n = typeof e == "number" ? e : parseInt(e.trim(), 10);
			return !Number.isFinite(n) || n < t ? null : Math.trunc(n);
		}
		async function $() {
			if (E.value) {
				wt.value = !0, Y.value = null;
				try {
					J.value = await w.profileStreamLimits(E.value);
				} catch (e) {
					Y.value = r(e, "Failed to load stream limits.");
				} finally {
					wt.value = !1;
				}
			}
		}
		function Et() {
			Z.value = {
				maxConcurrentStreams: J.value?.max_concurrent_streams ?? 1,
				maxTotalBandwidthKbps: J.value?.max_total_bandwidth_kbps?.toString() ?? ""
			}, Q.value = null, X.value = !0;
		}
		async function Dt() {
			if (E.value) try {
				let e = Tt(Z.value.maxConcurrentStreams, 1);
				if (e === null) {
					Q.value = "Max concurrent streams must be at least 1.";
					return;
				}
				let t = Tt(Z.value.maxTotalBandwidthKbps, 1);
				await w.updateProfileStreamLimits(E.value, e, t), S.success("Stream limits updated."), X.value = !1, await $();
			} catch (e) {
				Q.value = r(e, "Failed to update stream limits.");
			}
		}
		async function Ot(e) {
			switch (e) {
				case "schedules":
					await z();
					break;
				case "tags":
					await q();
					break;
				case "streamLimits": await $();
			}
		}
		function kt(e) {
			A.value = e, Ot(e);
		}
		function At(e) {
			R.value = e;
		}
		function jt(e) {
			K.value = e;
		}
		return (e, n) => (_(), p("div", ge, [
			m("header", _e, [n[21] ||= m("div", null, [m("p", { class: "parental-page__eyebrow" }, "Profile Controls"), m("h1", { class: "parental-page__title" }, "Parental Controls")], -1), k.value ? (_(), p("div", ve, [
				g(t, {
					name: "user",
					size: "sm"
				}),
				h(" " + y(k.value.name) + " ", 1),
				g(a, { tone: "neutral" }, {
					default: b(() => [h(y(me(te)[k.value.rating] ?? "Unknown"), 1)]),
					_: 1
				})
			])) : E.value && !D.value ? (_(), p("div", ye, [
				g(t, {
					name: "alert",
					size: "sm"
				}),
				h(" Unidentified profile #" + y(E.value) + " ", 1),
				g(a, { tone: "error" }, {
					default: b(() => [h(y(O.value ?? "Not found"), 1)]),
					_: 1
				})
			])) : f("", !0)]),
			E.value ? (_(), d(oe, {
				key: 1,
				modelValue: A.value,
				"onUpdate:modelValue": [n[0] ||= (e) => A.value = e, kt],
				tabs: st,
				label: "Parental control sections"
			}, {
				schedules: b(() => [m("div", xe, [m("div", Se, [n[23] ||= m("p", { class: "parental-section__hint" }, [
					m("kbd", null, "c"),
					h(" create \xA0 "),
					m("kbd", null, "E"),
					h(" edit \xA0 "),
					m("kbd", null, "x"),
					h(" delete \xA0 "),
					m("kbd", null, "r"),
					h(" refresh ")
				], -1), g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: dt
				}, {
					default: b(() => [...n[22] ||= [h(" Create Schedule ", -1)]]),
					_: 1
				})]), lt.value ? (_(), p("div", Ce, [g(s, {
					variant: "text",
					lines: 6
				})])) : M.value ? (_(), d(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load schedules",
					description: M.value
				}, {
					actions: b(() => [g(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: z
					}, {
						default: b(() => [...n[24] ||= [h("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : j.value.length === 0 ? (_(), d(c, {
					key: 2,
					icon: "calendar",
					title: "No access schedules",
					description: "Create schedules to limit when this profile can access content."
				})) : (_(), p("div", we, [(_(!0), p(ce, null, pe(j.value, (e, t) => (_(), p("div", {
					key: e.id,
					class: de(["parental-section__item", { "is-selected": t === N.value }]),
					onClick: (e) => N.value = t
				}, [m("div", Ee, [m("span", De, y(e.name), 1), m("span", Oe, y(e.start_time.substring(0, 5)) + " – " + y(e.end_time.substring(0, 5)) + " \xA0·\xA0 " + y(_t(e.days_of_week)), 1)]), m("div", ke, [
					g(a, { tone: e.is_active ? "success" : "neutral" }, {
						default: b(() => [h(y(e.is_active ? "Active" : "Inactive"), 1)]),
						_: 2
					}, 1032, ["tone"]),
					g(i, {
						variant: "ghost",
						size: "sm",
						onClick: x((t) => ft(e), ["stop"])
					}, {
						default: b(() => [...n[25] ||= [h("Edit", -1)]]),
						_: 1
					}, 8, ["onClick"]),
					g(i, {
						variant: "ghost",
						size: "sm",
						onClick: x((t) => At(e), ["stop"])
					}, {
						default: b(() => [...n[26] ||= [h("Delete", -1)]]),
						_: 1
					}, 8, ["onClick"])
				])], 10, Te))), 128))]))])]),
				tags: b(() => [m("div", Ae, [m("div", je, [n[28] ||= m("p", { class: "parental-section__hint" }, [
					m("kbd", null, "c"),
					h(" create \xA0 "),
					m("kbd", null, "x"),
					h(" delete \xA0 "),
					m("kbd", null, "r"),
					h(" refresh")
				], -1), g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: xt
				}, {
					default: b(() => [...n[27] ||= [h(" Add Tag ", -1)]]),
					_: 1
				})]), yt.value ? (_(), p("div", Me, [g(s, {
					variant: "text",
					lines: 4
				})])) : V.value ? (_(), d(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load tags",
					description: V.value
				}, {
					actions: b(() => [g(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: b(() => [...n[29] ||= [h("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : B.value.length === 0 ? (_(), d(c, {
					key: 2,
					icon: "bookmark",
					title: "No tags",
					description: "Add tags to block or allow specific content categories."
				})) : (_(), p("div", Ne, [(_(!0), p(ce, null, pe(B.value, (e, t) => (_(), p("div", {
					key: e.id,
					class: de(["parental-section__item", { "is-selected": t === H.value }]),
					onClick: (e) => H.value = t
				}, [m("div", Fe, [m("span", Ie, y(e.tag), 1)]), m("div", Le, [g(a, { tone: e.tag_type === "blocked" ? "error" : "success" }, {
					default: b(() => [h(y(e.tag_type), 1)]),
					_: 2
				}, 1032, ["tone"]), g(i, {
					variant: "ghost",
					size: "sm",
					onClick: x((t) => jt(e), ["stop"])
				}, {
					default: b(() => [...n[30] ||= [h("Remove", -1)]]),
					_: 1
				}, 8, ["onClick"])])], 10, Pe))), 128))]))])]),
				streamLimits: b(() => [m("div", Re, [m("div", ze, [n[32] ||= m("p", { class: "parental-section__hint" }, [
					m("kbd", null, "u"),
					h(" update limits \xA0 "),
					m("kbd", null, "r"),
					h(" refresh")
				], -1), g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "settings",
					onClick: Et
				}, {
					default: b(() => [...n[31] ||= [h(" Update Limits ", -1)]]),
					_: 1
				})]), wt.value ? (_(), p("div", Be, [g(s, {
					variant: "text",
					lines: 4
				})])) : Y.value ? (_(), d(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load stream limits",
					description: Y.value
				}, {
					actions: b(() => [g(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: b(() => [...n[33] ||= [h("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : (_(), d(se, {
					key: 2,
					class: "parental-section__limits-card"
				}, {
					default: b(() => [m("div", Ve, [n[34] ||= m("span", { class: "parental-section__limits-label" }, "Max concurrent streams", -1), m("span", He, y(J.value?.max_concurrent_streams ?? "Not set"), 1)]), m("div", Ue, [n[35] ||= m("span", { class: "parental-section__limits-label" }, "Max total bandwidth (Kbps)", -1), m("span", We, y(J.value?.max_total_bandwidth_kbps ?? "Not set"), 1)])]),
					_: 1
				}))])]),
				_: 1
			}, 8, ["modelValue"])) : (_(), p("div", be, [g(c, {
				icon: "user",
				title: "No profile selected",
				description: "Open this page with ?profile=<id> query parameter to manage that profile's parental controls."
			})])),
			g(o, {
				modelValue: P.value,
				"onUpdate:modelValue": n[6] ||= (e) => P.value = e,
				title: F.value ? "Edit Schedule" : "Create Schedule",
				size: "sm"
			}, {
				default: b(() => [m("form", {
					class: "parental-form",
					onSubmit: x(mt, ["prevent"])
				}, [
					L.value ? (_(), p("p", Ge, y(L.value), 1)) : f("", !0),
					g(l, {
						modelValue: I.value.name,
						"onUpdate:modelValue": n[1] ||= (e) => I.value.name = e,
						label: "Name",
						placeholder: "e.g. Weekday Evenings"
					}, null, 8, ["modelValue"]),
					m("div", Ke, [g(l, {
						modelValue: I.value.startTime,
						"onUpdate:modelValue": n[2] ||= (e) => I.value.startTime = e,
						label: "Start time (HH:MM)",
						placeholder: "08:00"
					}, null, 8, ["modelValue"]), g(l, {
						modelValue: I.value.endTime,
						"onUpdate:modelValue": n[3] ||= (e) => I.value.endTime = e,
						label: "End time (HH:MM)",
						placeholder: "22:00"
					}, null, 8, ["modelValue"])]),
					m("div", qe, [n[36] ||= m("label", { class: "parental-form__label" }, "Days", -1), m("div", Je, [(_(), p(ce, null, pe(ct, (e) => g(i, {
						key: e,
						size: "sm",
						variant: I.value.daysOfWeek.includes(e) ? "solid" : "ghost",
						onClick: (t) => gt(e)
					}, {
						default: b(() => [h(y(e.charAt(0).toUpperCase() + e.slice(1, 3)), 1)]),
						_: 2
					}, 1032, ["variant", "onClick"])), 64))])]),
					g(ie, {
						modelValue: I.value.isActive,
						"onUpdate:modelValue": n[4] ||= (e) => I.value.isActive = e,
						label: "Active"
					}, null, 8, ["modelValue"]),
					m("div", Ye, [g(i, {
						variant: "ghost",
						type: "button",
						onClick: n[5] ||= (e) => P.value = !1
					}, {
						default: b(() => [...n[37] ||= [h("Cancel", -1)]]),
						_: 1
					}), g(i, {
						variant: "solid",
						type: "submit"
					}, {
						default: b(() => [h(y(F.value ? "Update" : "Create"), 1)]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			g(o, {
				modelValue: U.value,
				"onUpdate:modelValue": n[10] ||= (e) => U.value = e,
				title: "Add Tag",
				size: "sm"
			}, {
				default: b(() => [m("form", {
					class: "parental-form",
					onSubmit: x(St, ["prevent"])
				}, [
					G.value ? (_(), p("p", Xe, y(G.value), 1)) : f("", !0),
					g(l, {
						modelValue: W.value.tag,
						"onUpdate:modelValue": n[7] ||= (e) => W.value.tag = e,
						label: "Tag name",
						placeholder: "e.g. kids, restricted, work"
					}, null, 8, ["modelValue"]),
					g(ae, {
						modelValue: W.value.tagType,
						"onUpdate:modelValue": n[8] ||= (e) => W.value.tagType = e,
						label: "Tag type",
						options: vt
					}, null, 8, ["modelValue"]),
					m("div", Ze, [g(i, {
						variant: "ghost",
						type: "button",
						onClick: n[9] ||= (e) => U.value = !1
					}, {
						default: b(() => [...n[38] ||= [h("Cancel", -1)]]),
						_: 1
					}), g(i, {
						variant: "solid",
						type: "submit"
					}, {
						default: b(() => [...n[39] ||= [h("Add Tag", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(o, {
				modelValue: X.value,
				"onUpdate:modelValue": n[14] ||= (e) => X.value = e,
				title: "Update Stream Limits",
				size: "sm"
			}, {
				default: b(() => [m("form", {
					class: "parental-form",
					onSubmit: x(Dt, ["prevent"])
				}, [
					Q.value ? (_(), p("p", Qe, y(Q.value), 1)) : f("", !0),
					g(l, {
						modelValue: Z.value.maxConcurrentStreams,
						"onUpdate:modelValue": n[11] ||= (e) => Z.value.maxConcurrentStreams = e,
						modelModifiers: { number: !0 },
						label: "Max concurrent streams",
						type: "number",
						min: "1"
					}, null, 8, ["modelValue"]),
					g(l, {
						modelValue: Z.value.maxTotalBandwidthKbps,
						"onUpdate:modelValue": n[12] ||= (e) => Z.value.maxTotalBandwidthKbps = e,
						label: "Max total bandwidth (Kbps, optional)",
						type: "number",
						min: "0",
						placeholder: "Leave empty for no limit"
					}, null, 8, ["modelValue"]),
					m("div", $e, [g(i, {
						variant: "ghost",
						type: "button",
						onClick: n[13] ||= (e) => X.value = !1
					}, {
						default: b(() => [...n[40] ||= [h("Cancel", -1)]]),
						_: 1
					}), g(i, {
						variant: "solid",
						type: "submit"
					}, {
						default: b(() => [...n[41] ||= [h("Update", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(o, {
				modelValue: ut.value,
				"onUpdate:modelValue": n[17] ||= (e) => ut.value = e,
				title: "Delete Schedule",
				size: "sm"
			}, {
				default: b(() => [R.value ? (_(), p("p", et, [
					n[42] ||= h(" Delete schedule ", -1),
					m("strong", null, y(R.value.name), 1),
					n[43] ||= h("? ", -1)
				])) : f("", !0), m("div", tt, [g(i, {
					variant: "ghost",
					onClick: n[15] ||= (e) => R.value = null
				}, {
					default: b(() => [...n[44] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					tone: "error",
					onClick: n[16] ||= (e) => R.value && ht(R.value)
				}, {
					default: b(() => [...n[45] ||= [h(" Delete ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"]),
			g(o, {
				modelValue: bt.value,
				"onUpdate:modelValue": n[20] ||= (e) => bt.value = e,
				title: "Remove Tag",
				size: "sm"
			}, {
				default: b(() => [K.value ? (_(), p("p", nt, [
					n[46] ||= h(" Remove tag ", -1),
					m("strong", null, y(K.value.tag), 1),
					n[47] ||= h("? ", -1)
				])) : f("", !0), m("div", rt, [g(i, {
					variant: "ghost",
					onClick: n[18] ||= (e) => K.value = null
				}, {
					default: b(() => [...n[48] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					tone: "error",
					onClick: n[19] ||= (e) => K.value && Ct(K.value)
				}, {
					default: b(() => [...n[49] ||= [h(" Remove ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-0669a2d0"]]);
//#endregion
export { S as default };

//# sourceMappingURL=ParentalControlsPage-KWKmusIA.js.map