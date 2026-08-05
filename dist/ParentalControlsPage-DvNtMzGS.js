import { n as e, t } from "./Icon-CkTBN_k5.js";
import { l as n, p as r, t as ee } from "./client-COHWZ2KC.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-Cw8Wl4QR.js";
import { t as a } from "./Badge-D1_MN41Y.js";
import { t as ne } from "./Switch-H74PI5Oy.js";
import { t as re } from "./Select-C5dvTnnx.js";
import { t as o } from "./Modal-Nn1mtFl3.js";
import { t as s } from "./Skeleton-C3OpJbf1.js";
import { t as c } from "./EmptyState-CwWtkhEJ.js";
import { t as ie } from "./Tabs-CCN6j5WY.js";
import { r as ae, t as oe } from "./users-CfimGM9x.js";
import { t as l } from "./Input-D87-h7X1.js";
import { t as se } from "./Card-CwUrlHI3.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as ce, inject as le, normalizeClass as ue, onMounted as de, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as fe, withCtx as S, withModifiers as C } from "vue";
import { useRoute as pe } from "vue-router";
//#region src/pages/ParentalControlsPage.vue?vue&type=script&setup=true&lang.ts
var me = { class: "parental-page" }, he = { class: "parental-page__head" }, ge = {
	key: 0,
	class: "parental-page__profile-badge"
}, _e = {
	key: 1,
	class: "parental-page__profile-badge parental-page__profile-badge--unknown",
	role: "status"
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
}, Ze = { class: "parental-form__actions" }, Qe = { key: 0 }, $e = { class: "parental-form__actions" }, et = { key: 0 }, tt = { class: "parental-form__actions" }, w = /*#__PURE__*/ e(/* @__PURE__ */ ce({
	__name: "ParentalControlsPage",
	props: { client: {} },
	setup(e) {
		let ce = pe(), w = te(), nt = e, rt = le("apiBase", ""), it = d(() => typeof rt == "string" ? rt : rt?.value ?? ""), T = new oe(nt.client ?? new ee({
			baseUrl: it.value,
			tokenStore: new n()
		})), E = y([]), D = y(null), O = y(!0), k = y(null), at = d(() => E.value.find((e) => String(e.id) === String(D.value)) ?? null);
		async function ot() {
			let e = D.value;
			if (!e) {
				E.value = [], k.value = null, O.value = !1;
				return;
			}
			O.value = !0, k.value = null;
			try {
				E.value = [await T.getProfile(e)];
			} catch (e) {
				E.value = [], k.value = r(e, "Could not load this profile.");
			} finally {
				O.value = !1;
			}
		}
		de(() => {
			let e = ce.query.profile;
			typeof e == "string" && e.trim() !== "" && (D.value = e.trim()), ot(), D.value && Ot(A.value);
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
		], A = y("schedules"), ct = [
			"mon",
			"tue",
			"wed",
			"thu",
			"fri",
			"sat",
			"sun"
		], j = y([]), lt = y(!1), M = y(null), N = y(0), P = y(!1), F = y(null), I = y({
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
		}), L = y(null), R = y(null), ut = d({
			get: () => R.value !== null,
			set: (e) => {
				e || (R.value = null);
			}
		});
		async function z() {
			if (D.value) {
				lt.value = !0, M.value = null;
				try {
					j.value = await T.profileSchedules(D.value), N.value = Math.min(N.value, j.value.length - 1);
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
			if (!D.value) return;
			let e = pt();
			if (e) {
				L.value = e;
				return;
			}
			try {
				F.value ? await T.updateProfileSchedule(D.value, F.value.id, I.value.name.trim(), I.value.startTime + ":00", I.value.endTime + ":00", I.value.daysOfWeek, I.value.isActive) : await T.createProfileSchedule(D.value, I.value.name.trim(), I.value.startTime + ":00", I.value.endTime + ":00", I.value.daysOfWeek, I.value.isActive), w.success(F.value ? "Schedule updated." : "Schedule created."), P.value = !1, await z();
			} catch (e) {
				L.value = r(e, "Failed to save schedule.");
			}
		}
		async function ht(e) {
			if (D.value) try {
				await T.deleteProfileSchedule(D.value, e.id), w.success("Schedule deleted."), R.value = null, await z();
			} catch (e) {
				w.error(r(e, "Failed to delete schedule.")), R.value = null;
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
		}], B = y([]), V = y(!1), H = y(null), U = y(0), W = y(!1), G = y({
			tag: "",
			tagType: "blocked"
		}), K = y(null), q = y(null), yt = d({
			get: () => q.value !== null,
			set: (e) => {
				e || (q.value = null);
			}
		});
		async function J() {
			if (D.value) {
				V.value = !0, H.value = null;
				try {
					B.value = await T.profileTags(D.value), U.value = Math.min(U.value, B.value.length - 1);
				} catch (e) {
					H.value = r(e, "Failed to load tags.");
				} finally {
					V.value = !1;
				}
			}
		}
		function bt() {
			G.value = {
				tag: "",
				tagType: "blocked"
			}, K.value = null, W.value = !0;
		}
		async function xt() {
			if (!D.value) return;
			let e = G.value.tag.trim();
			if (!e) {
				K.value = "Tag name is required.";
				return;
			}
			if (e.length > 100) {
				K.value = "Tag must be 100 characters or less.";
				return;
			}
			try {
				await T.addProfileTag(D.value, e, G.value.tagType), w.success("Tag added."), W.value = !1, await J();
			} catch (e) {
				K.value = r(e, "Failed to add tag.");
			}
		}
		async function St(e) {
			if (D.value) try {
				await T.deleteProfileTag(D.value, e.id), w.success("Tag removed."), q.value = null, await J();
			} catch (e) {
				w.error(r(e, "Failed to remove tag.")), q.value = null;
			}
		}
		let Y = y(null), Ct = y(!1), X = y(null), Z = y(!1), Q = y({
			maxConcurrentStreams: 1,
			maxTotalBandwidthKbps: ""
		}), $ = y(null);
		function wt(e, t) {
			let n = typeof e == "number" ? e : parseInt(e.trim(), 10);
			return !Number.isFinite(n) || n < t ? null : Math.trunc(n);
		}
		async function Tt() {
			if (D.value) {
				Ct.value = !0, X.value = null;
				try {
					Y.value = await T.profileStreamLimits(D.value);
				} catch (e) {
					X.value = r(e, "Failed to load stream limits.");
				} finally {
					Ct.value = !1;
				}
			}
		}
		function Et() {
			Q.value = {
				maxConcurrentStreams: Y.value?.max_concurrent_streams ?? 1,
				maxTotalBandwidthKbps: Y.value?.max_total_bandwidth_kbps?.toString() ?? ""
			}, $.value = null, Z.value = !0;
		}
		async function Dt() {
			if (D.value) try {
				let e = wt(Q.value.maxConcurrentStreams, 1);
				if (e === null) {
					$.value = "Max concurrent streams must be at least 1.";
					return;
				}
				let t = wt(Q.value.maxTotalBandwidthKbps, 1);
				await T.updateProfileStreamLimits(D.value, e, t), w.success("Stream limits updated."), Z.value = !1, await Tt();
			} catch (e) {
				$.value = r(e, "Failed to update stream limits.");
			}
		}
		async function Ot(e) {
			switch (e) {
				case "schedules":
					await z();
					break;
				case "tags":
					await J();
					break;
				case "streamLimits": await Tt();
			}
		}
		function kt(e) {
			A.value = e, Ot(e);
		}
		function At(e) {
			R.value = e;
		}
		function jt(e) {
			q.value = e;
		}
		return (e, n) => (v(), m("div", me, [
			h("header", he, [n[21] ||= h("div", null, [h("p", { class: "parental-page__eyebrow" }, "Profile Controls"), h("h1", { class: "parental-page__title" }, "Parental Controls")], -1), at.value ? (v(), m("div", ge, [
				_(t, {
					name: "user",
					size: "sm"
				}),
				g(" " + x(at.value.name) + " ", 1),
				_(a, { tone: "neutral" }, {
					default: S(() => [g(x(fe(ae)[at.value.rating] ?? "Unknown"), 1)]),
					_: 1
				})
			])) : D.value && !O.value ? (v(), m("div", _e, [
				_(t, {
					name: "alert",
					size: "sm"
				}),
				g(" Unidentified profile #" + x(D.value) + " ", 1),
				_(a, { tone: "error" }, {
					default: S(() => [g(x(k.value ?? "Not found"), 1)]),
					_: 1
				})
			])) : p("", !0)]),
			D.value ? (v(), f(ie, {
				key: 1,
				modelValue: A.value,
				"onUpdate:modelValue": [n[0] ||= (e) => A.value = e, kt],
				tabs: st,
				label: "Parental control sections"
			}, {
				schedules: S(() => [h("div", ye, [h("div", be, [n[23] ||= h("p", { class: "parental-section__hint" }, [
					h("kbd", null, "c"),
					g(" create \xA0 "),
					h("kbd", null, "E"),
					g(" edit \xA0 "),
					h("kbd", null, "x"),
					g(" delete \xA0 "),
					h("kbd", null, "r"),
					g(" refresh ")
				], -1), _(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: dt
				}, {
					default: S(() => [...n[22] ||= [g(" Create Schedule ", -1)]]),
					_: 1
				})]), lt.value ? (v(), m("div", xe, [_(s, {
					variant: "text",
					lines: 6
				})])) : M.value ? (v(), f(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load schedules",
					description: M.value
				}, {
					actions: S(() => [_(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: z
					}, {
						default: S(() => [...n[24] ||= [g("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : j.value.length === 0 ? (v(), f(c, {
					key: 2,
					icon: "calendar",
					title: "No access schedules",
					description: "Create schedules to limit when this profile can access content."
				})) : (v(), m("div", Se, [(v(!0), m(u, null, b(j.value, (e, t) => (v(), m("div", {
					key: e.id,
					class: ue(["parental-section__item", { "is-selected": t === N.value }]),
					onClick: (e) => N.value = t
				}, [h("div", we, [h("span", Te, x(e.name), 1), h("span", Ee, x(e.start_time.substring(0, 5)) + " – " + x(e.end_time.substring(0, 5)) + " \xA0·\xA0 " + x(_t(e.days_of_week)), 1)]), h("div", De, [
					_(a, { tone: e.is_active ? "success" : "neutral" }, {
						default: S(() => [g(x(e.is_active ? "Active" : "Inactive"), 1)]),
						_: 2
					}, 1032, ["tone"]),
					_(i, {
						variant: "ghost",
						size: "sm",
						onClick: C((t) => ft(e), ["stop"])
					}, {
						default: S(() => [...n[25] ||= [g("Edit", -1)]]),
						_: 1
					}, 8, ["onClick"]),
					_(i, {
						variant: "ghost",
						size: "sm",
						onClick: C((t) => At(e), ["stop"])
					}, {
						default: S(() => [...n[26] ||= [g("Delete", -1)]]),
						_: 1
					}, 8, ["onClick"])
				])], 10, Ce))), 128))]))])]),
				tags: S(() => [h("div", Oe, [h("div", ke, [n[28] ||= h("p", { class: "parental-section__hint" }, [
					h("kbd", null, "c"),
					g(" create \xA0 "),
					h("kbd", null, "x"),
					g(" delete \xA0 "),
					h("kbd", null, "r"),
					g(" refresh")
				], -1), _(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: bt
				}, {
					default: S(() => [...n[27] ||= [g(" Add Tag ", -1)]]),
					_: 1
				})]), V.value ? (v(), m("div", Ae, [_(s, {
					variant: "text",
					lines: 4
				})])) : H.value ? (v(), f(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load tags",
					description: H.value
				}, {
					actions: S(() => [_(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: J
					}, {
						default: S(() => [...n[29] ||= [g("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : B.value.length === 0 ? (v(), f(c, {
					key: 2,
					icon: "bookmark",
					title: "No tags",
					description: "Add tags to block or allow specific content categories."
				})) : (v(), m("div", je, [(v(!0), m(u, null, b(B.value, (e, t) => (v(), m("div", {
					key: e.id,
					class: ue(["parental-section__item", { "is-selected": t === U.value }]),
					onClick: (e) => U.value = t
				}, [h("div", Ne, [h("span", Pe, x(e.tag), 1)]), h("div", Fe, [_(a, { tone: e.tag_type === "blocked" ? "error" : "success" }, {
					default: S(() => [g(x(e.tag_type), 1)]),
					_: 2
				}, 1032, ["tone"]), _(i, {
					variant: "ghost",
					size: "sm",
					onClick: C((t) => jt(e), ["stop"])
				}, {
					default: S(() => [...n[30] ||= [g("Remove", -1)]]),
					_: 1
				}, 8, ["onClick"])])], 10, Me))), 128))]))])]),
				streamLimits: S(() => [h("div", Ie, [h("div", Le, [n[32] ||= h("p", { class: "parental-section__hint" }, [
					h("kbd", null, "u"),
					g(" update limits \xA0 "),
					h("kbd", null, "r"),
					g(" refresh")
				], -1), _(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "settings",
					onClick: Et
				}, {
					default: S(() => [...n[31] ||= [g(" Update Limits ", -1)]]),
					_: 1
				})]), Ct.value ? (v(), m("div", Re, [_(s, {
					variant: "text",
					lines: 4
				})])) : X.value ? (v(), f(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load stream limits",
					description: X.value
				}, {
					actions: S(() => [_(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: Tt
					}, {
						default: S(() => [...n[33] ||= [g("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : (v(), f(se, {
					key: 2,
					class: "parental-section__limits-card"
				}, {
					default: S(() => [h("div", ze, [n[34] ||= h("span", { class: "parental-section__limits-label" }, "Max concurrent streams", -1), h("span", Be, x(Y.value?.max_concurrent_streams ?? "Not set"), 1)]), h("div", Ve, [n[35] ||= h("span", { class: "parental-section__limits-label" }, "Max total bandwidth (Kbps)", -1), h("span", He, x(Y.value?.max_total_bandwidth_kbps ?? "Not set"), 1)])]),
					_: 1
				}))])]),
				_: 1
			}, 8, ["modelValue"])) : (v(), m("div", ve, [_(c, {
				icon: "user",
				title: "No profile selected",
				description: "Open this page with ?profile=<id> query parameter to manage that profile's parental controls."
			})])),
			_(o, {
				modelValue: P.value,
				"onUpdate:modelValue": n[6] ||= (e) => P.value = e,
				title: F.value ? "Edit Schedule" : "Create Schedule",
				size: "sm"
			}, {
				default: S(() => [h("form", {
					class: "parental-form",
					onSubmit: C(mt, ["prevent"])
				}, [
					L.value ? (v(), m("p", Ue, x(L.value), 1)) : p("", !0),
					_(l, {
						modelValue: I.value.name,
						"onUpdate:modelValue": n[1] ||= (e) => I.value.name = e,
						label: "Name",
						placeholder: "e.g. Weekday Evenings"
					}, null, 8, ["modelValue"]),
					h("div", We, [_(l, {
						modelValue: I.value.startTime,
						"onUpdate:modelValue": n[2] ||= (e) => I.value.startTime = e,
						label: "Start time (HH:MM)",
						placeholder: "08:00"
					}, null, 8, ["modelValue"]), _(l, {
						modelValue: I.value.endTime,
						"onUpdate:modelValue": n[3] ||= (e) => I.value.endTime = e,
						label: "End time (HH:MM)",
						placeholder: "22:00"
					}, null, 8, ["modelValue"])]),
					h("div", Ge, [n[36] ||= h("label", { class: "parental-form__label" }, "Days", -1), h("div", Ke, [(v(), m(u, null, b(ct, (e) => _(i, {
						key: e,
						size: "sm",
						variant: I.value.daysOfWeek.includes(e) ? "solid" : "ghost",
						onClick: (t) => gt(e)
					}, {
						default: S(() => [g(x(e.charAt(0).toUpperCase() + e.slice(1, 3)), 1)]),
						_: 2
					}, 1032, ["variant", "onClick"])), 64))])]),
					_(ne, {
						modelValue: I.value.isActive,
						"onUpdate:modelValue": n[4] ||= (e) => I.value.isActive = e,
						label: "Active"
					}, null, 8, ["modelValue"]),
					h("div", qe, [_(i, {
						variant: "ghost",
						type: "button",
						onClick: n[5] ||= (e) => P.value = !1
					}, {
						default: S(() => [...n[37] ||= [g("Cancel", -1)]]),
						_: 1
					}), _(i, {
						variant: "solid",
						type: "submit"
					}, {
						default: S(() => [g(x(F.value ? "Update" : "Create"), 1)]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			_(o, {
				modelValue: W.value,
				"onUpdate:modelValue": n[10] ||= (e) => W.value = e,
				title: "Add Tag",
				size: "sm"
			}, {
				default: S(() => [h("form", {
					class: "parental-form",
					onSubmit: C(xt, ["prevent"])
				}, [
					K.value ? (v(), m("p", Je, x(K.value), 1)) : p("", !0),
					_(l, {
						modelValue: G.value.tag,
						"onUpdate:modelValue": n[7] ||= (e) => G.value.tag = e,
						label: "Tag name",
						placeholder: "e.g. kids, restricted, work"
					}, null, 8, ["modelValue"]),
					_(re, {
						modelValue: G.value.tagType,
						"onUpdate:modelValue": n[8] ||= (e) => G.value.tagType = e,
						label: "Tag type",
						options: vt
					}, null, 8, ["modelValue"]),
					h("div", Ye, [_(i, {
						variant: "ghost",
						type: "button",
						onClick: n[9] ||= (e) => W.value = !1
					}, {
						default: S(() => [...n[38] ||= [g("Cancel", -1)]]),
						_: 1
					}), _(i, {
						variant: "solid",
						type: "submit"
					}, {
						default: S(() => [...n[39] ||= [g("Add Tag", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(o, {
				modelValue: Z.value,
				"onUpdate:modelValue": n[14] ||= (e) => Z.value = e,
				title: "Update Stream Limits",
				size: "sm"
			}, {
				default: S(() => [h("form", {
					class: "parental-form",
					onSubmit: C(Dt, ["prevent"])
				}, [
					$.value ? (v(), m("p", Xe, x($.value), 1)) : p("", !0),
					_(l, {
						modelValue: Q.value.maxConcurrentStreams,
						"onUpdate:modelValue": n[11] ||= (e) => Q.value.maxConcurrentStreams = e,
						modelModifiers: { number: !0 },
						label: "Max concurrent streams",
						type: "number",
						min: "1"
					}, null, 8, ["modelValue"]),
					_(l, {
						modelValue: Q.value.maxTotalBandwidthKbps,
						"onUpdate:modelValue": n[12] ||= (e) => Q.value.maxTotalBandwidthKbps = e,
						label: "Max total bandwidth (Kbps, optional)",
						type: "number",
						min: "0",
						placeholder: "Leave empty for no limit"
					}, null, 8, ["modelValue"]),
					h("div", Ze, [_(i, {
						variant: "ghost",
						type: "button",
						onClick: n[13] ||= (e) => Z.value = !1
					}, {
						default: S(() => [...n[40] ||= [g("Cancel", -1)]]),
						_: 1
					}), _(i, {
						variant: "solid",
						type: "submit"
					}, {
						default: S(() => [...n[41] ||= [g("Update", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(o, {
				modelValue: ut.value,
				"onUpdate:modelValue": n[17] ||= (e) => ut.value = e,
				title: "Delete Schedule",
				size: "sm"
			}, {
				default: S(() => [R.value ? (v(), m("p", Qe, [
					n[42] ||= g(" Delete schedule ", -1),
					h("strong", null, x(R.value.name), 1),
					n[43] ||= g("? ", -1)
				])) : p("", !0), h("div", $e, [_(i, {
					variant: "ghost",
					onClick: n[15] ||= (e) => R.value = null
				}, {
					default: S(() => [...n[44] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(i, {
					variant: "solid",
					tone: "error",
					onClick: n[16] ||= (e) => R.value && ht(R.value)
				}, {
					default: S(() => [...n[45] ||= [g(" Delete ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"]),
			_(o, {
				modelValue: yt.value,
				"onUpdate:modelValue": n[20] ||= (e) => yt.value = e,
				title: "Remove Tag",
				size: "sm"
			}, {
				default: S(() => [q.value ? (v(), m("p", et, [
					n[46] ||= g(" Remove tag ", -1),
					h("strong", null, x(q.value.tag), 1),
					n[47] ||= g("? ", -1)
				])) : p("", !0), h("div", tt, [_(i, {
					variant: "ghost",
					onClick: n[18] ||= (e) => q.value = null
				}, {
					default: S(() => [...n[48] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(i, {
					variant: "solid",
					tone: "error",
					onClick: n[19] ||= (e) => q.value && St(q.value)
				}, {
					default: S(() => [...n[49] ||= [g(" Remove ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-0669a2d0"]]);
//#endregion
export { w as default };

//# sourceMappingURL=ParentalControlsPage-DvNtMzGS.js.map