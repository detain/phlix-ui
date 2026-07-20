import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-462_QqzN.js";
import { t as n } from "./Modal-BJEvG52w.js";
import { c as r, f as i, t as ee } from "./client-D80As4Gx.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-8mVXxqAA.js";
import { t as o } from "./Badge-BO1IU3PF.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { t as re } from "./Select-wYNk7Tc4.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-jnH8lsc0.js";
import { t as ie } from "./Tabs-C03xrWmA.js";
import { n as ae, t as oe } from "./users-BXVPIIch.js";
import { t as l } from "./Input-D6hY0oF5.js";
import { t as se } from "./Card-BvLj4L6F.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as ce, inject as le, normalizeClass as ue, onMounted as de, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as fe, withCtx as S, withModifiers as C } from "vue";
import { useRoute as pe } from "vue-router";
//#region src/pages/ParentalControlsPage.vue?vue&type=script&setup=true&lang.ts
var me = { class: "parental-page" }, he = { class: "parental-page__head" }, ge = {
	key: 0,
	class: "parental-page__profile-badge"
}, _e = {
	key: 0,
	class: "parental-page__no-profile"
}, ve = { class: "parental-section" }, ye = { class: "parental-section__toolbar" }, be = {
	key: 0,
	class: "parental-section__loading"
}, xe = {
	key: 3,
	class: "parental-section__list"
}, Se = ["onClick"], Ce = { class: "parental-section__item-main" }, we = { class: "parental-section__item-name" }, Te = { class: "parental-section__item-meta" }, Ee = { class: "parental-section__item-actions" }, De = { class: "parental-section" }, Oe = { class: "parental-section__toolbar" }, ke = {
	key: 0,
	class: "parental-section__loading"
}, Ae = {
	key: 3,
	class: "parental-section__list"
}, je = ["onClick"], Me = { class: "parental-section__item-main" }, Ne = { class: "parental-section__item-name" }, Pe = { class: "parental-section__item-actions" }, Fe = { class: "parental-section" }, Ie = { class: "parental-section__toolbar" }, Le = {
	key: 0,
	class: "parental-section__loading"
}, Re = { class: "parental-section__limits-row" }, ze = { class: "parental-section__limits-value" }, Be = { class: "parental-section__limits-row" }, Ve = { class: "parental-section__limits-value" }, He = {
	key: 0,
	class: "parental-form__error"
}, Ue = { class: "parental-form__row" }, We = { class: "parental-form__days" }, Ge = { class: "parental-form__day-buttons" }, Ke = { class: "parental-form__actions" }, qe = {
	key: 0,
	class: "parental-form__error"
}, Je = { class: "parental-form__actions" }, Ye = {
	key: 0,
	class: "parental-form__error"
}, Xe = { class: "parental-form__actions" }, Ze = { key: 0 }, Qe = { class: "parental-form__actions" }, $e = { key: 0 }, et = { class: "parental-form__actions" }, w = /*#__PURE__*/ e(/* @__PURE__ */ ce({
	__name: "ParentalControlsPage",
	props: { client: {} },
	setup(e) {
		let ce = pe(), w = te(), tt = e, nt = le("apiBase", ""), rt = d(() => typeof nt == "string" ? nt : nt?.value ?? ""), T = new oe(tt.client ?? new ee({
			baseUrl: rt.value,
			tokenStore: new r()
		})), it = y([]), E = y(null), at = y(!0), D = d(() => it.value.find((e) => e.id === E.value) ?? null);
		async function ot() {
			at.value = !0;
			try {
				it.value = [];
			} catch {} finally {
				at.value = !1;
			}
		}
		de(() => {
			let e = ce.query.profile;
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
		], O = y("schedules"), ct = [
			"mon",
			"tue",
			"wed",
			"thu",
			"fri",
			"sat",
			"sun"
		], k = y([]), A = y(!1), j = y(null), M = y(0), N = y(!1), P = y(null), F = y({
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
		}), I = y(null), L = y(null), lt = d({
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
					j.value = i(e, "Failed to load schedules.");
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
				P.value && await T.deleteProfileSchedule(E.value, P.value.id), await T.createProfileSchedule(E.value, F.value.name.trim(), F.value.startTime + ":00", F.value.endTime + ":00", F.value.daysOfWeek, F.value.isActive), w.success(P.value ? "Schedule updated." : "Schedule created."), N.value = !1, await R();
			} catch (e) {
				I.value = i(e, "Failed to save schedule.");
			}
		}
		async function mt(e) {
			if (E.value) try {
				await T.deleteProfileSchedule(E.value, e.id), w.success("Schedule deleted."), L.value = null, await R();
			} catch (e) {
				w.error(i(e, "Failed to delete schedule.")), L.value = null;
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
		}], z = y([]), B = y(!1), V = y(null), H = y(0), U = y(!1), W = y({
			tag: "",
			tagType: "blocked"
		}), G = y(null), K = y(null), vt = d({
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
					V.value = i(e, "Failed to load tags.");
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
				await T.addProfileTag(E.value, e, W.value.tagType), w.success("Tag added."), U.value = !1, await q();
			} catch (e) {
				G.value = i(e, "Failed to add tag.");
			}
		}
		async function xt(e) {
			if (E.value) try {
				await T.deleteProfileTag(E.value, e.id), w.success("Tag removed."), K.value = null, await q();
			} catch (e) {
				w.error(i(e, "Failed to remove tag.")), K.value = null;
			}
		}
		let J = y(null), Y = y(!1), X = y(null), Z = y(!1), Q = y({
			maxConcurrentStreams: 1,
			maxTotalBandwidthKbps: ""
		}), $ = y(null);
		async function St() {
			if (E.value) {
				Y.value = !0, X.value = null;
				try {
					J.value = await T.profileStreamLimits(E.value);
				} catch (e) {
					X.value = i(e, "Failed to load stream limits.");
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
				await T.updateProfileStreamLimits(E.value, e, t), w.success("Stream limits updated."), Z.value = !1, await St();
			} catch (e) {
				$.value = i(e, "Failed to update stream limits.");
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
		return (e, r) => (v(), m("div", me, [
			h("header", he, [r[21] ||= h("div", null, [h("p", { class: "parental-page__eyebrow" }, "Profile Controls"), h("h1", { class: "parental-page__title" }, "Parental Controls")], -1), D.value ? (v(), m("div", ge, [
				_(t, {
					name: "user",
					size: "sm"
				}),
				g(" " + x(D.value.name) + " ", 1),
				_(o, { tone: "neutral" }, {
					default: S(() => [g(x(fe(ae)[D.value.rating] ?? "Unknown"), 1)]),
					_: 1
				})
			])) : p("", !0)]),
			E.value ? (v(), f(ie, {
				key: 1,
				modelValue: O.value,
				"onUpdate:modelValue": [r[0] ||= (e) => O.value = e, Et],
				tabs: st,
				label: "Parental control sections"
			}, {
				schedules: S(() => [h("div", ve, [h("div", ye, [r[23] ||= h("p", { class: "parental-section__hint" }, [
					h("kbd", null, "c"),
					g(" create \xA0 "),
					h("kbd", null, "E"),
					g(" edit \xA0 "),
					h("kbd", null, "x"),
					g(" delete \xA0 "),
					h("kbd", null, "r"),
					g(" refresh ")
				], -1), _(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: ut
				}, {
					default: S(() => [...r[22] ||= [g(" Create Schedule ", -1)]]),
					_: 1
				})]), A.value ? (v(), m("div", be, [_(s, {
					variant: "text",
					lines: 6
				})])) : j.value ? (v(), f(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load schedules",
					description: j.value
				}, {
					actions: S(() => [_(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: R
					}, {
						default: S(() => [...r[24] ||= [g("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : k.value.length === 0 ? (v(), f(c, {
					key: 2,
					icon: "calendar",
					title: "No access schedules",
					description: "Create schedules to limit when this profile can access content."
				})) : (v(), m("div", xe, [(v(!0), m(u, null, b(k.value, (e, t) => (v(), m("div", {
					key: e.id,
					class: ue(["parental-section__item", { "is-selected": t === M.value }]),
					onClick: (e) => M.value = t
				}, [h("div", Ce, [h("span", we, x(e.name), 1), h("span", Te, x(e.start_time.substring(0, 5)) + " – " + x(e.end_time.substring(0, 5)) + " \xA0·\xA0 " + x(gt(e.days_of_week)), 1)]), h("div", Ee, [
					_(o, { tone: e.is_active ? "success" : "neutral" }, {
						default: S(() => [g(x(e.is_active ? "Active" : "Inactive"), 1)]),
						_: 2
					}, 1032, ["tone"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						onClick: C((t) => dt(e), ["stop"])
					}, {
						default: S(() => [...r[25] ||= [g("Edit", -1)]]),
						_: 1
					}, 8, ["onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						onClick: C((t) => Dt(e), ["stop"])
					}, {
						default: S(() => [...r[26] ||= [g("Delete", -1)]]),
						_: 1
					}, 8, ["onClick"])
				])], 10, Se))), 128))]))])]),
				tags: S(() => [h("div", De, [h("div", Oe, [r[28] ||= h("p", { class: "parental-section__hint" }, [
					h("kbd", null, "c"),
					g(" create \xA0 "),
					h("kbd", null, "x"),
					g(" delete \xA0 "),
					h("kbd", null, "r"),
					g(" refresh")
				], -1), _(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: yt
				}, {
					default: S(() => [...r[27] ||= [g(" Add Tag ", -1)]]),
					_: 1
				})]), B.value ? (v(), m("div", ke, [_(s, {
					variant: "text",
					lines: 4
				})])) : V.value ? (v(), f(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load tags",
					description: V.value
				}, {
					actions: S(() => [_(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: S(() => [...r[29] ||= [g("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : z.value.length === 0 ? (v(), f(c, {
					key: 2,
					icon: "bookmark",
					title: "No tags",
					description: "Add tags to block or allow specific content categories."
				})) : (v(), m("div", Ae, [(v(!0), m(u, null, b(z.value, (e, t) => (v(), m("div", {
					key: e.id,
					class: ue(["parental-section__item", { "is-selected": t === H.value }]),
					onClick: (e) => H.value = t
				}, [h("div", Me, [h("span", Ne, x(e.tag), 1)]), h("div", Pe, [_(o, { tone: e.tag_type === "blocked" ? "error" : "success" }, {
					default: S(() => [g(x(e.tag_type), 1)]),
					_: 2
				}, 1032, ["tone"]), _(a, {
					variant: "ghost",
					size: "sm",
					onClick: C((t) => Ot(e), ["stop"])
				}, {
					default: S(() => [...r[30] ||= [g("Remove", -1)]]),
					_: 1
				}, 8, ["onClick"])])], 10, je))), 128))]))])]),
				streamLimits: S(() => [h("div", Fe, [h("div", Ie, [r[32] ||= h("p", { class: "parental-section__hint" }, [
					h("kbd", null, "u"),
					g(" update limits \xA0 "),
					h("kbd", null, "r"),
					g(" refresh")
				], -1), _(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "settings",
					onClick: Ct
				}, {
					default: S(() => [...r[31] ||= [g(" Update Limits ", -1)]]),
					_: 1
				})]), Y.value ? (v(), m("div", Le, [_(s, {
					variant: "text",
					lines: 4
				})])) : X.value ? (v(), f(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load stream limits",
					description: X.value
				}, {
					actions: S(() => [_(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: St
					}, {
						default: S(() => [...r[33] ||= [g("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : (v(), f(se, {
					key: 2,
					class: "parental-section__limits-card"
				}, {
					default: S(() => [h("div", Re, [r[34] ||= h("span", { class: "parental-section__limits-label" }, "Max concurrent streams", -1), h("span", ze, x(J.value?.max_concurrent_streams ?? "Not set"), 1)]), h("div", Be, [r[35] ||= h("span", { class: "parental-section__limits-label" }, "Max total bandwidth (Kbps)", -1), h("span", Ve, x(J.value?.max_total_bandwidth_kbps ?? "Not set"), 1)])]),
					_: 1
				}))])]),
				_: 1
			}, 8, ["modelValue"])) : (v(), m("div", _e, [_(c, {
				icon: "user",
				title: "No profile selected",
				description: "Open this page with ?profile=<id> query parameter to manage that profile's parental controls."
			})])),
			_(n, {
				modelValue: N.value,
				"onUpdate:modelValue": r[6] ||= (e) => N.value = e,
				title: P.value ? "Edit Schedule" : "Create Schedule",
				size: "sm"
			}, {
				default: S(() => [h("form", {
					class: "parental-form",
					onSubmit: C(pt, ["prevent"])
				}, [
					I.value ? (v(), m("p", He, x(I.value), 1)) : p("", !0),
					_(l, {
						modelValue: F.value.name,
						"onUpdate:modelValue": r[1] ||= (e) => F.value.name = e,
						label: "Name",
						placeholder: "e.g. Weekday Evenings"
					}, null, 8, ["modelValue"]),
					h("div", Ue, [_(l, {
						modelValue: F.value.startTime,
						"onUpdate:modelValue": r[2] ||= (e) => F.value.startTime = e,
						label: "Start time (HH:MM)",
						placeholder: "08:00"
					}, null, 8, ["modelValue"]), _(l, {
						modelValue: F.value.endTime,
						"onUpdate:modelValue": r[3] ||= (e) => F.value.endTime = e,
						label: "End time (HH:MM)",
						placeholder: "22:00"
					}, null, 8, ["modelValue"])]),
					h("div", We, [r[36] ||= h("label", { class: "parental-form__label" }, "Days", -1), h("div", Ge, [(v(), m(u, null, b(ct, (e) => _(a, {
						key: e,
						size: "sm",
						variant: F.value.daysOfWeek.includes(e) ? "solid" : "ghost",
						onClick: (t) => ht(e)
					}, {
						default: S(() => [g(x(e.charAt(0).toUpperCase() + e.slice(1, 3)), 1)]),
						_: 2
					}, 1032, ["variant", "onClick"])), 64))])]),
					_(ne, {
						modelValue: F.value.isActive,
						"onUpdate:modelValue": r[4] ||= (e) => F.value.isActive = e,
						label: "Active"
					}, null, 8, ["modelValue"]),
					h("div", Ke, [_(a, {
						variant: "ghost",
						type: "button",
						onClick: r[5] ||= (e) => N.value = !1
					}, {
						default: S(() => [...r[37] ||= [g("Cancel", -1)]]),
						_: 1
					}), _(a, {
						variant: "solid",
						type: "submit"
					}, {
						default: S(() => [g(x(P.value ? "Update" : "Create"), 1)]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			_(n, {
				modelValue: U.value,
				"onUpdate:modelValue": r[10] ||= (e) => U.value = e,
				title: "Add Tag",
				size: "sm"
			}, {
				default: S(() => [h("form", {
					class: "parental-form",
					onSubmit: C(bt, ["prevent"])
				}, [
					G.value ? (v(), m("p", qe, x(G.value), 1)) : p("", !0),
					_(l, {
						modelValue: W.value.tag,
						"onUpdate:modelValue": r[7] ||= (e) => W.value.tag = e,
						label: "Tag name",
						placeholder: "e.g. kids, restricted, work"
					}, null, 8, ["modelValue"]),
					_(re, {
						modelValue: W.value.tagType,
						"onUpdate:modelValue": r[8] ||= (e) => W.value.tagType = e,
						label: "Tag type",
						options: _t
					}, null, 8, ["modelValue"]),
					h("div", Je, [_(a, {
						variant: "ghost",
						type: "button",
						onClick: r[9] ||= (e) => U.value = !1
					}, {
						default: S(() => [...r[38] ||= [g("Cancel", -1)]]),
						_: 1
					}), _(a, {
						variant: "solid",
						type: "submit"
					}, {
						default: S(() => [...r[39] ||= [g("Add Tag", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(n, {
				modelValue: Z.value,
				"onUpdate:modelValue": r[14] ||= (e) => Z.value = e,
				title: "Update Stream Limits",
				size: "sm"
			}, {
				default: S(() => [h("form", {
					class: "parental-form",
					onSubmit: C(wt, ["prevent"])
				}, [
					$.value ? (v(), m("p", Ye, x($.value), 1)) : p("", !0),
					_(l, {
						modelValue: Q.value.maxConcurrentStreams,
						"onUpdate:modelValue": r[11] ||= (e) => Q.value.maxConcurrentStreams = e,
						modelModifiers: { number: !0 },
						label: "Max concurrent streams",
						type: "number",
						min: "1"
					}, null, 8, ["modelValue"]),
					_(l, {
						modelValue: Q.value.maxTotalBandwidthKbps,
						"onUpdate:modelValue": r[12] ||= (e) => Q.value.maxTotalBandwidthKbps = e,
						label: "Max total bandwidth (Kbps, optional)",
						type: "number",
						min: "0",
						placeholder: "Leave empty for no limit"
					}, null, 8, ["modelValue"]),
					h("div", Xe, [_(a, {
						variant: "ghost",
						type: "button",
						onClick: r[13] ||= (e) => Z.value = !1
					}, {
						default: S(() => [...r[40] ||= [g("Cancel", -1)]]),
						_: 1
					}), _(a, {
						variant: "solid",
						type: "submit"
					}, {
						default: S(() => [...r[41] ||= [g("Update", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(n, {
				modelValue: lt.value,
				"onUpdate:modelValue": r[17] ||= (e) => lt.value = e,
				title: "Delete Schedule",
				size: "sm"
			}, {
				default: S(() => [L.value ? (v(), m("p", Ze, [
					r[42] ||= g(" Delete schedule ", -1),
					h("strong", null, x(L.value.name), 1),
					r[43] ||= g("? ", -1)
				])) : p("", !0), h("div", Qe, [_(a, {
					variant: "ghost",
					onClick: r[15] ||= (e) => L.value = null
				}, {
					default: S(() => [...r[44] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					tone: "error",
					onClick: r[16] ||= (e) => L.value && mt(L.value)
				}, {
					default: S(() => [...r[45] ||= [g(" Delete ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"]),
			_(n, {
				modelValue: vt.value,
				"onUpdate:modelValue": r[20] ||= (e) => vt.value = e,
				title: "Remove Tag",
				size: "sm"
			}, {
				default: S(() => [K.value ? (v(), m("p", $e, [
					r[46] ||= g(" Remove tag ", -1),
					h("strong", null, x(K.value.tag), 1),
					r[47] ||= g("? ", -1)
				])) : p("", !0), h("div", et, [_(a, {
					variant: "ghost",
					onClick: r[18] ||= (e) => K.value = null
				}, {
					default: S(() => [...r[48] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					tone: "error",
					onClick: r[19] ||= (e) => K.value && xt(K.value)
				}, {
					default: S(() => [...r[49] ||= [g(" Remove ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-bcfbae68"]]);
//#endregion
export { w as default };

//# sourceMappingURL=ParentalControlsPage-DriSK2K-.js.map