import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { c as n, f as r, t as ee } from "./client-BzWwyWKr.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { t as re } from "./Select-Cvp-73pF.js";
import { t as o } from "./Modal-aFganlu3.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as ie } from "./Tabs-CLKYop2E.js";
import { n as ae, t as oe } from "./users-CIe34Ixs.js";
import { t as l } from "./Input-D6hY0oF5.js";
import { t as se } from "./Card-BvLj4L6F.js";
import { Fragment as ce, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as le, inject as ue, normalizeClass as de, onMounted as fe, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as pe, withCtx as x, withModifiers as S } from "vue";
import { useRoute as me } from "vue-router";
//#region src/pages/ParentalControlsPage.vue?vue&type=script&setup=true&lang.ts
var he = { class: "parental-page" }, ge = { class: "parental-page__head" }, _e = {
	key: 0,
	class: "parental-page__profile-badge"
}, ve = {
	key: 0,
	class: "parental-page__no-profile"
}, ye = { class: "parental-section" }, be = { class: "parental-section__toolbar" }, xe = {
	key: 0,
	class: "parental-section__loading"
}, Se = {
	key: 3,
	class: "parental-section__list"
}, Ce = ["onClick"], we = { class: "parental-section__item-main" }, Te = { class: "parental-section__item-name" }, Ee = { class: "parental-section__item-meta" }, De = { class: "parental-section__item-actions" }, Oe = { class: "parental-section" }, ke = { class: "parental-section__toolbar" }, Ae = {
	key: 0,
	class: "parental-section__loading"
}, je = {
	key: 3,
	class: "parental-section__list"
}, Me = ["onClick"], Ne = { class: "parental-section__item-main" }, Pe = { class: "parental-section__item-name" }, Fe = { class: "parental-section__item-actions" }, Ie = { class: "parental-section" }, Le = { class: "parental-section__toolbar" }, Re = {
	key: 0,
	class: "parental-section__loading"
}, ze = { class: "parental-section__limits-row" }, Be = { class: "parental-section__limits-value" }, Ve = { class: "parental-section__limits-row" }, He = { class: "parental-section__limits-value" }, Ue = {
	key: 0,
	class: "parental-form__error"
}, We = { class: "parental-form__row" }, Ge = { class: "parental-form__days" }, Ke = { class: "parental-form__day-buttons" }, qe = { class: "parental-form__actions" }, Je = {
	key: 0,
	class: "parental-form__error"
}, Ye = { class: "parental-form__actions" }, Xe = {
	key: 0,
	class: "parental-form__error"
}, Ze = { class: "parental-form__actions" }, Qe = { key: 0 }, $e = { class: "parental-form__actions" }, et = { key: 0 }, tt = { class: "parental-form__actions" }, C = /*#__PURE__*/ e(/* @__PURE__ */ le({
	__name: "ParentalControlsPage",
	props: { client: {} },
	setup(e) {
		let le = me(), C = te(), nt = e, w = ue("apiBase", ""), rt = u(() => typeof w == "string" ? w : w?.value ?? ""), T = new oe(nt.client ?? new ee({
			baseUrl: rt.value,
			tokenStore: new n()
		})), it = v([]), E = v(null), at = v(!0), D = u(() => it.value.find((e) => e.id === E.value) ?? null);
		async function ot() {
			at.value = !0;
			try {
				it.value = [];
			} catch {} finally {
				at.value = !1;
			}
		}
		fe(() => {
			let e = le.query.profile;
			e && !isNaN(Number(e)) && (E.value = Number(e)), ot(), E.value && Tt(O.value);
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
		], O = v("schedules"), ct = [
			"mon",
			"tue",
			"wed",
			"thu",
			"fri",
			"sat",
			"sun"
		], k = v([]), A = v(!1), j = v(null), M = v(0), N = v(!1), P = v(null), F = v({
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
		}), I = v(null), L = v(null), lt = u({
			get: () => L.value !== null,
			set: (e) => {
				e || (L.value = null);
			}
		});
		async function R() {
			if (E.value) {
				A.value = !0, j.value = null;
				try {
					k.value = await T.profileSchedules(E.value), M.value = Math.min(M.value, k.value.length - 1);
				} catch (e) {
					j.value = r(e, "Failed to load schedules.");
				} finally {
					A.value = !1;
				}
			}
		}
		function ut() {
			P.value = null, F.value = {
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
			}, I.value = null, N.value = !0;
		}
		function dt(e) {
			P.value = e, F.value = {
				name: e.name,
				startTime: e.start_time.substring(0, 5),
				endTime: e.end_time.substring(0, 5),
				daysOfWeek: [...e.days_of_week],
				isActive: e.is_active
			}, I.value = null, N.value = !0;
		}
		function ft() {
			return F.value.name.trim() ? F.value.name.length > 100 ? "Name must be 100 characters or less." : /^\d{1,2}:\d{2}(:\d{2})?$/.test(F.value.startTime) ? /^\d{1,2}:\d{2}(:\d{2})?$/.test(F.value.endTime) ? F.value.daysOfWeek.length === 0 ? "At least one day is required." : null : "Invalid end time. Use HH:MM or HH:MM:SS." : "Invalid start time. Use HH:MM or HH:MM:SS." : "Name is required.";
		}
		async function pt() {
			if (!E.value) return;
			let e = ft();
			if (e) {
				I.value = e;
				return;
			}
			try {
				P.value && await T.deleteProfileSchedule(E.value, P.value.id), await T.createProfileSchedule(E.value, F.value.name.trim(), F.value.startTime + ":00", F.value.endTime + ":00", F.value.daysOfWeek, F.value.isActive), C.success(P.value ? "Schedule updated." : "Schedule created."), N.value = !1, await R();
			} catch (e) {
				I.value = r(e, "Failed to save schedule.");
			}
		}
		async function mt(e) {
			if (E.value) try {
				await T.deleteProfileSchedule(E.value, e.id), C.success("Schedule deleted."), L.value = null, await R();
			} catch (e) {
				C.error(r(e, "Failed to delete schedule.")), L.value = null;
			}
		}
		function ht(e) {
			let t = F.value.daysOfWeek.indexOf(e);
			t === -1 ? F.value.daysOfWeek.push(e) : F.value.daysOfWeek.splice(t, 1);
		}
		function gt(e) {
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
		let _t = [{
			value: "blocked",
			label: "Blocked"
		}, {
			value: "allowed",
			label: "Allowed"
		}], z = v([]), B = v(!1), V = v(null), H = v(0), U = v(!1), W = v({
			tag: "",
			tagType: "blocked"
		}), G = v(null), K = v(null), vt = u({
			get: () => K.value !== null,
			set: (e) => {
				e || (K.value = null);
			}
		});
		async function q() {
			if (E.value) {
				B.value = !0, V.value = null;
				try {
					z.value = await T.profileTags(E.value), H.value = Math.min(H.value, z.value.length - 1);
				} catch (e) {
					V.value = r(e, "Failed to load tags.");
				} finally {
					B.value = !1;
				}
			}
		}
		function yt() {
			W.value = {
				tag: "",
				tagType: "blocked"
			}, G.value = null, U.value = !0;
		}
		async function bt() {
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
				await T.addProfileTag(E.value, e, W.value.tagType), C.success("Tag added."), U.value = !1, await q();
			} catch (e) {
				G.value = r(e, "Failed to add tag.");
			}
		}
		async function xt(e) {
			if (E.value) try {
				await T.deleteProfileTag(E.value, e.id), C.success("Tag removed."), K.value = null, await q();
			} catch (e) {
				C.error(r(e, "Failed to remove tag.")), K.value = null;
			}
		}
		let J = v(null), Y = v(!1), X = v(null), Z = v(!1), Q = v({
			maxConcurrentStreams: 1,
			maxTotalBandwidthKbps: ""
		}), $ = v(null);
		async function St() {
			if (E.value) {
				Y.value = !0, X.value = null;
				try {
					J.value = await T.profileStreamLimits(E.value);
				} catch (e) {
					X.value = r(e, "Failed to load stream limits.");
				} finally {
					Y.value = !1;
				}
			}
		}
		function Ct() {
			Q.value = {
				maxConcurrentStreams: J.value?.max_concurrent_streams ?? 1,
				maxTotalBandwidthKbps: J.value?.max_total_bandwidth_kbps?.toString() ?? ""
			}, $.value = null, Z.value = !0;
		}
		async function wt() {
			if (!E.value) return;
			let e = Q.value.maxConcurrentStreams;
			if (e < 1) {
				$.value = "Max concurrent streams must be at least 1.";
				return;
			}
			let t = null, n = Q.value.maxTotalBandwidthKbps.trim();
			n !== "" && (t = parseInt(n, 10), (isNaN(t) || t < 1) && (t = null));
			try {
				await T.updateProfileStreamLimits(E.value, e, t), C.success("Stream limits updated."), Z.value = !1, await St();
			} catch (e) {
				$.value = r(e, "Failed to update stream limits.");
			}
		}
		async function Tt(e) {
			switch (e) {
				case "schedules":
					await R();
					break;
				case "tags":
					await q();
					break;
				case "streamLimits":
					await St();
					break;
			}
		}
		function Et(e) {
			O.value = e, Tt(e);
		}
		function Dt(e) {
			L.value = e;
		}
		function Ot(e) {
			K.value = e;
		}
		return (e, n) => (_(), p("div", he, [
			m("header", ge, [n[21] ||= m("div", null, [m("p", { class: "parental-page__eyebrow" }, "Profile Controls"), m("h1", { class: "parental-page__title" }, "Parental Controls")], -1), D.value ? (_(), p("div", _e, [
				g(t, {
					name: "user",
					size: "sm"
				}),
				h(" " + b(D.value.name) + " ", 1),
				g(a, { tone: "neutral" }, {
					default: x(() => [h(b(pe(ae)[D.value.rating] ?? "Unknown"), 1)]),
					_: 1
				})
			])) : f("", !0)]),
			E.value ? (_(), d(ie, {
				key: 1,
				modelValue: O.value,
				"onUpdate:modelValue": [n[0] ||= (e) => O.value = e, Et],
				tabs: st,
				label: "Parental control sections"
			}, {
				schedules: x(() => [m("div", ye, [m("div", be, [n[23] ||= m("p", { class: "parental-section__hint" }, [
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
					onClick: ut
				}, {
					default: x(() => [...n[22] ||= [h(" Create Schedule ", -1)]]),
					_: 1
				})]), A.value ? (_(), p("div", xe, [g(s, {
					variant: "text",
					lines: 6
				})])) : j.value ? (_(), d(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load schedules",
					description: j.value
				}, {
					actions: x(() => [g(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: R
					}, {
						default: x(() => [...n[24] ||= [h("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : k.value.length === 0 ? (_(), d(c, {
					key: 2,
					icon: "calendar",
					title: "No access schedules",
					description: "Create schedules to limit when this profile can access content."
				})) : (_(), p("div", Se, [(_(!0), p(ce, null, y(k.value, (e, t) => (_(), p("div", {
					key: e.id,
					class: de(["parental-section__item", { "is-selected": t === M.value }]),
					onClick: (e) => M.value = t
				}, [m("div", we, [m("span", Te, b(e.name), 1), m("span", Ee, b(e.start_time.substring(0, 5)) + " – " + b(e.end_time.substring(0, 5)) + " \xA0·\xA0 " + b(gt(e.days_of_week)), 1)]), m("div", De, [
					g(a, { tone: e.is_active ? "success" : "neutral" }, {
						default: x(() => [h(b(e.is_active ? "Active" : "Inactive"), 1)]),
						_: 2
					}, 1032, ["tone"]),
					g(i, {
						variant: "ghost",
						size: "sm",
						onClick: S((t) => dt(e), ["stop"])
					}, {
						default: x(() => [...n[25] ||= [h("Edit", -1)]]),
						_: 1
					}, 8, ["onClick"]),
					g(i, {
						variant: "ghost",
						size: "sm",
						onClick: S((t) => Dt(e), ["stop"])
					}, {
						default: x(() => [...n[26] ||= [h("Delete", -1)]]),
						_: 1
					}, 8, ["onClick"])
				])], 10, Ce))), 128))]))])]),
				tags: x(() => [m("div", Oe, [m("div", ke, [n[28] ||= m("p", { class: "parental-section__hint" }, [
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
					onClick: yt
				}, {
					default: x(() => [...n[27] ||= [h(" Add Tag ", -1)]]),
					_: 1
				})]), B.value ? (_(), p("div", Ae, [g(s, {
					variant: "text",
					lines: 4
				})])) : V.value ? (_(), d(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load tags",
					description: V.value
				}, {
					actions: x(() => [g(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: x(() => [...n[29] ||= [h("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : z.value.length === 0 ? (_(), d(c, {
					key: 2,
					icon: "bookmark",
					title: "No tags",
					description: "Add tags to block or allow specific content categories."
				})) : (_(), p("div", je, [(_(!0), p(ce, null, y(z.value, (e, t) => (_(), p("div", {
					key: e.id,
					class: de(["parental-section__item", { "is-selected": t === H.value }]),
					onClick: (e) => H.value = t
				}, [m("div", Ne, [m("span", Pe, b(e.tag), 1)]), m("div", Fe, [g(a, { tone: e.tag_type === "blocked" ? "error" : "success" }, {
					default: x(() => [h(b(e.tag_type), 1)]),
					_: 2
				}, 1032, ["tone"]), g(i, {
					variant: "ghost",
					size: "sm",
					onClick: S((t) => Ot(e), ["stop"])
				}, {
					default: x(() => [...n[30] ||= [h("Remove", -1)]]),
					_: 1
				}, 8, ["onClick"])])], 10, Me))), 128))]))])]),
				streamLimits: x(() => [m("div", Ie, [m("div", Le, [n[32] ||= m("p", { class: "parental-section__hint" }, [
					m("kbd", null, "u"),
					h(" update limits \xA0 "),
					m("kbd", null, "r"),
					h(" refresh")
				], -1), g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "settings",
					onClick: Ct
				}, {
					default: x(() => [...n[31] ||= [h(" Update Limits ", -1)]]),
					_: 1
				})]), Y.value ? (_(), p("div", Re, [g(s, {
					variant: "text",
					lines: 4
				})])) : X.value ? (_(), d(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load stream limits",
					description: X.value
				}, {
					actions: x(() => [g(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: St
					}, {
						default: x(() => [...n[33] ||= [h("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : (_(), d(se, {
					key: 2,
					class: "parental-section__limits-card"
				}, {
					default: x(() => [m("div", ze, [n[34] ||= m("span", { class: "parental-section__limits-label" }, "Max concurrent streams", -1), m("span", Be, b(J.value?.max_concurrent_streams ?? "Not set"), 1)]), m("div", Ve, [n[35] ||= m("span", { class: "parental-section__limits-label" }, "Max total bandwidth (Kbps)", -1), m("span", He, b(J.value?.max_total_bandwidth_kbps ?? "Not set"), 1)])]),
					_: 1
				}))])]),
				_: 1
			}, 8, ["modelValue"])) : (_(), p("div", ve, [g(c, {
				icon: "user",
				title: "No profile selected",
				description: "Open this page with ?profile=<id> query parameter to manage that profile's parental controls."
			})])),
			g(o, {
				modelValue: N.value,
				"onUpdate:modelValue": n[6] ||= (e) => N.value = e,
				title: P.value ? "Edit Schedule" : "Create Schedule",
				size: "sm"
			}, {
				default: x(() => [m("form", {
					class: "parental-form",
					onSubmit: S(pt, ["prevent"])
				}, [
					I.value ? (_(), p("p", Ue, b(I.value), 1)) : f("", !0),
					g(l, {
						modelValue: F.value.name,
						"onUpdate:modelValue": n[1] ||= (e) => F.value.name = e,
						label: "Name",
						placeholder: "e.g. Weekday Evenings"
					}, null, 8, ["modelValue"]),
					m("div", We, [g(l, {
						modelValue: F.value.startTime,
						"onUpdate:modelValue": n[2] ||= (e) => F.value.startTime = e,
						label: "Start time (HH:MM)",
						placeholder: "08:00"
					}, null, 8, ["modelValue"]), g(l, {
						modelValue: F.value.endTime,
						"onUpdate:modelValue": n[3] ||= (e) => F.value.endTime = e,
						label: "End time (HH:MM)",
						placeholder: "22:00"
					}, null, 8, ["modelValue"])]),
					m("div", Ge, [n[36] ||= m("label", { class: "parental-form__label" }, "Days", -1), m("div", Ke, [(_(), p(ce, null, y(ct, (e) => g(i, {
						key: e,
						size: "sm",
						variant: F.value.daysOfWeek.includes(e) ? "solid" : "ghost",
						onClick: (t) => ht(e)
					}, {
						default: x(() => [h(b(e.charAt(0).toUpperCase() + e.slice(1, 3)), 1)]),
						_: 2
					}, 1032, ["variant", "onClick"])), 64))])]),
					g(ne, {
						modelValue: F.value.isActive,
						"onUpdate:modelValue": n[4] ||= (e) => F.value.isActive = e,
						label: "Active"
					}, null, 8, ["modelValue"]),
					m("div", qe, [g(i, {
						variant: "ghost",
						type: "button",
						onClick: n[5] ||= (e) => N.value = !1
					}, {
						default: x(() => [...n[37] ||= [h("Cancel", -1)]]),
						_: 1
					}), g(i, {
						variant: "solid",
						type: "submit"
					}, {
						default: x(() => [h(b(P.value ? "Update" : "Create"), 1)]),
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
				default: x(() => [m("form", {
					class: "parental-form",
					onSubmit: S(bt, ["prevent"])
				}, [
					G.value ? (_(), p("p", Je, b(G.value), 1)) : f("", !0),
					g(l, {
						modelValue: W.value.tag,
						"onUpdate:modelValue": n[7] ||= (e) => W.value.tag = e,
						label: "Tag name",
						placeholder: "e.g. kids, restricted, work"
					}, null, 8, ["modelValue"]),
					g(re, {
						modelValue: W.value.tagType,
						"onUpdate:modelValue": n[8] ||= (e) => W.value.tagType = e,
						label: "Tag type",
						options: _t
					}, null, 8, ["modelValue"]),
					m("div", Ye, [g(i, {
						variant: "ghost",
						type: "button",
						onClick: n[9] ||= (e) => U.value = !1
					}, {
						default: x(() => [...n[38] ||= [h("Cancel", -1)]]),
						_: 1
					}), g(i, {
						variant: "solid",
						type: "submit"
					}, {
						default: x(() => [...n[39] ||= [h("Add Tag", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(o, {
				modelValue: Z.value,
				"onUpdate:modelValue": n[14] ||= (e) => Z.value = e,
				title: "Update Stream Limits",
				size: "sm"
			}, {
				default: x(() => [m("form", {
					class: "parental-form",
					onSubmit: S(wt, ["prevent"])
				}, [
					$.value ? (_(), p("p", Xe, b($.value), 1)) : f("", !0),
					g(l, {
						modelValue: Q.value.maxConcurrentStreams,
						"onUpdate:modelValue": n[11] ||= (e) => Q.value.maxConcurrentStreams = e,
						modelModifiers: { number: !0 },
						label: "Max concurrent streams",
						type: "number",
						min: "1"
					}, null, 8, ["modelValue"]),
					g(l, {
						modelValue: Q.value.maxTotalBandwidthKbps,
						"onUpdate:modelValue": n[12] ||= (e) => Q.value.maxTotalBandwidthKbps = e,
						label: "Max total bandwidth (Kbps, optional)",
						type: "number",
						min: "0",
						placeholder: "Leave empty for no limit"
					}, null, 8, ["modelValue"]),
					m("div", Ze, [g(i, {
						variant: "ghost",
						type: "button",
						onClick: n[13] ||= (e) => Z.value = !1
					}, {
						default: x(() => [...n[40] ||= [h("Cancel", -1)]]),
						_: 1
					}), g(i, {
						variant: "solid",
						type: "submit"
					}, {
						default: x(() => [...n[41] ||= [h("Update", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(o, {
				modelValue: lt.value,
				"onUpdate:modelValue": n[17] ||= (e) => lt.value = e,
				title: "Delete Schedule",
				size: "sm"
			}, {
				default: x(() => [L.value ? (_(), p("p", Qe, [
					n[42] ||= h(" Delete schedule ", -1),
					m("strong", null, b(L.value.name), 1),
					n[43] ||= h("? ", -1)
				])) : f("", !0), m("div", $e, [g(i, {
					variant: "ghost",
					onClick: n[15] ||= (e) => L.value = null
				}, {
					default: x(() => [...n[44] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					tone: "error",
					onClick: n[16] ||= (e) => L.value && mt(L.value)
				}, {
					default: x(() => [...n[45] ||= [h(" Delete ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"]),
			g(o, {
				modelValue: vt.value,
				"onUpdate:modelValue": n[20] ||= (e) => vt.value = e,
				title: "Remove Tag",
				size: "sm"
			}, {
				default: x(() => [K.value ? (_(), p("p", et, [
					n[46] ||= h(" Remove tag ", -1),
					m("strong", null, b(K.value.tag), 1),
					n[47] ||= h("? ", -1)
				])) : f("", !0), m("div", tt, [g(i, {
					variant: "ghost",
					onClick: n[18] ||= (e) => K.value = null
				}, {
					default: x(() => [...n[48] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					tone: "error",
					onClick: n[19] ||= (e) => K.value && xt(K.value)
				}, {
					default: x(() => [...n[49] ||= [h(" Remove ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-bcfbae68"]]);
//#endregion
export { C as default };

//# sourceMappingURL=ParentalControlsPage-Bf87XqRH.js.map