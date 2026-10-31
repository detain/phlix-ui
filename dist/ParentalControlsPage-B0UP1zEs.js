import { t as e, x as t } from "./client-57OweUrJ.js";
import { a as n, t as ee } from "./users-C-cJO6V5.js";
import { t as te } from "./useToastStore-Bu-iYU7r.js";
import { t as ne } from "./Tabs-DkWwQI4r.js";
import { t as r } from "./Button-1sKEdGjj.js";
import { t as i } from "./Modal-BU4hJGBA.js";
import { t as re } from "./Select-ChFXd0gU.js";
import { t as a } from "./Input-hVCTPbto.js";
import { t as ie } from "./Switch-C1Wv5sN2.js";
import { t as o } from "./Badge-C6LNO9Kk.js";
import { t as ae } from "./Skeleton-B2Mt2L00.js";
import { t as s } from "./EmptyState-BjOJ1k_A.js";
import { t as oe } from "./Card-C8ekyPJB.js";
import { n as se, t as ce } from "./Icon-CIbfiPrs.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as le, inject as ue, normalizeClass as de, onMounted as fe, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as pe, withCtx as b, withModifiers as x } from "vue";
import { useRoute as me } from "vue-router";
// src/pages/ParentalControlsPage.vue?vue&type=script&setup=true&lang.ts
var he = { class: "parental-page" }, ge = { class: "parental-page__head" }, _e = {
	key: 0,
	class: "parental-page__profile-badge"
}, ve = {
	key: 1,
	class: "parental-page__profile-badge parental-page__profile-badge--unknown",
	role: "status"
}, ye = {
	key: 0,
	class: "parental-page__no-profile"
}, be = { class: "parental-section" }, xe = { class: "parental-section__toolbar" }, Se = {
	key: 0,
	class: "parental-section__loading"
}, Ce = {
	key: 3,
	class: "parental-section__list"
}, we = ["onClick"], Te = { class: "parental-section__item-main" }, Ee = { class: "parental-section__item-name" }, De = { class: "parental-section__item-meta" }, Oe = { class: "parental-section__item-actions" }, ke = { class: "parental-section" }, Ae = { class: "parental-section__toolbar" }, je = {
	key: 0,
	class: "parental-section__loading"
}, Me = {
	key: 3,
	class: "parental-section__list"
}, Ne = ["onClick"], Pe = { class: "parental-section__item-main" }, Fe = { class: "parental-section__item-name" }, Ie = { class: "parental-section__item-actions" }, Le = { class: "parental-section" }, Re = { class: "parental-section__toolbar" }, ze = {
	key: 0,
	class: "parental-section__loading"
}, Be = { class: "parental-section__limits-row" }, Ve = { class: "parental-section__limits-value" }, He = { class: "parental-section__limits-row" }, Ue = { class: "parental-section__limits-value" }, We = {
	key: 0,
	class: "parental-form__error"
}, Ge = { class: "parental-form__row" }, Ke = { class: "parental-form__days" }, qe = { class: "parental-form__day-buttons" }, Je = { class: "parental-form__actions" }, Ye = {
	key: 0,
	class: "parental-form__error"
}, Xe = { class: "parental-form__actions" }, Ze = {
	key: 0,
	class: "parental-form__error"
}, Qe = { class: "parental-form__actions" }, $e = { key: 0 }, et = { class: "parental-form__actions" }, tt = { key: 0 }, nt = { class: "parental-form__actions" }, S = /*#__PURE__*/ se(/* @__PURE__ */ le({
	__name: "ParentalControlsPage",
	props: { client: {} },
	setup(se) {
		let le = me(), S = te(), rt = se, C = ue("apiBase", ""), it = l(() => typeof C == "string" ? C : C?.value ?? ""), w = new ee(rt.client ?? new e({ baseUrl: it.value })), T = _([]), E = _(null), D = _(!0), O = _(null), at = l(() => T.value.find((e) => String(e.id) === String(E.value)) ?? null);
		async function ot() {
			let e = E.value;
			if (!e) T.value = [], O.value = null, D.value = !1;
			else {
				D.value = !0, O.value = null;
				try {
					T.value = [await w.getProfile(e)];
				} catch (e) {
					T.value = [], O.value = t(e, "Could not load this profile.");
				} finally {
					D.value = !1;
				}
			}
		}
		fe(() => {
			let e = le.query.profile;
			typeof e == "string" && e.trim() !== "" && (E.value = e.trim()), ot(), E.value && Dt(k.value);
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
				label: "Stream limits",
				icon: "play"
			}
		], k = _("schedules"), ct = [
			"mon",
			"tue",
			"wed",
			"thu",
			"fri",
			"sat",
			"sun"
		], A = _([]), j = _(!1), M = _(null), N = _(0), P = _(!1), F = _(null), I = _({
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
		}), L = _(null), R = _(null), lt = l({
			get: () => R.value !== null,
			set: (e) => {
				e || (R.value = null);
			}
		});
		async function z() {
			if (E.value) {
				j.value = !0, M.value = null;
				try {
					A.value = await w.profileSchedules(E.value), N.value = Math.min(N.value, A.value.length - 1);
				} catch (e) {
					M.value = t(e, "Failed to load schedules.");
				} finally {
					j.value = !1;
				}
			}
		}
		function ut() {
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
		function dt(e) {
			F.value = e, I.value = {
				name: e.name,
				startTime: e.start_time.substring(0, 5),
				endTime: e.end_time.substring(0, 5),
				daysOfWeek: [...e.days_of_week],
				isActive: e.is_active
			}, L.value = null, P.value = !0;
		}
		function ft() {
			return I.value.name.trim() ? I.value.name.length > 100 ? "Name must be 100 characters or less." : /^\d{1,2}:\d{2}(:\d{2})?$/.test(I.value.startTime) ? /^\d{1,2}:\d{2}(:\d{2})?$/.test(I.value.endTime) ? I.value.daysOfWeek.length === 0 ? "At least one day is required." : null : "Invalid end time. Use HH:MM or HH:MM:SS." : "Invalid start time. Use HH:MM or HH:MM:SS." : "Name is required.";
		}
		async function pt() {
			if (!E.value) return;
			let e = ft();
			if (e) L.value = e;
			else try {
				F.value ? await w.updateProfileSchedule(E.value, F.value.id, I.value.name.trim(), I.value.startTime + ":00", I.value.endTime + ":00", I.value.daysOfWeek, I.value.isActive) : await w.createProfileSchedule(E.value, I.value.name.trim(), I.value.startTime + ":00", I.value.endTime + ":00", I.value.daysOfWeek, I.value.isActive), S.success(F.value ? "Schedule updated." : "Schedule created."), P.value = !1, await z();
			} catch (e) {
				L.value = t(e, "Failed to save schedule.");
			}
		}
		async function mt(e) {
			if (E.value) try {
				await w.deleteProfileSchedule(E.value, e.id), S.success("Schedule deleted."), R.value = null, await z();
			} catch (e) {
				S.error(t(e, "Failed to delete schedule.")), R.value = null;
			}
		}
		function ht(e) {
			let t = I.value.daysOfWeek.indexOf(e);
			t === -1 ? I.value.daysOfWeek.push(e) : I.value.daysOfWeek.splice(t, 1);
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
		}], B = _([]), V = _(!1), H = _(null), U = _(0), W = _(!1), G = _({
			tag: "",
			tagType: "blocked"
		}), K = _(null), q = _(null), vt = l({
			get: () => q.value !== null,
			set: (e) => {
				e || (q.value = null);
			}
		});
		async function J() {
			if (E.value) {
				V.value = !0, H.value = null;
				try {
					B.value = await w.profileTags(E.value), U.value = Math.min(U.value, B.value.length - 1);
				} catch (e) {
					H.value = t(e, "Failed to load tags.");
				} finally {
					V.value = !1;
				}
			}
		}
		function yt() {
			G.value = {
				tag: "",
				tagType: "blocked"
			}, K.value = null, W.value = !0;
		}
		async function bt() {
			if (!E.value) return;
			let e = G.value.tag.trim();
			if (!e) K.value = "Tag name is required.";
			else if (e.length > 100) K.value = "Tag must be 100 characters or less.";
			else try {
				await w.addProfileTag(E.value, e, G.value.tagType), S.success("Tag added."), W.value = !1, await J();
			} catch (e) {
				K.value = t(e, "Failed to add tag.");
			}
		}
		async function xt(e) {
			if (E.value) try {
				await w.deleteProfileTag(E.value, e.id), S.success("Tag removed."), q.value = null, await J();
			} catch (e) {
				S.error(t(e, "Failed to remove tag.")), q.value = null;
			}
		}
		let Y = _(null), St = _(!1), X = _(null), Z = _(!1), Q = _({
			maxConcurrentStreams: 1,
			maxTotalBandwidthKbps: ""
		}), $ = _(null);
		function Ct(e, t) {
			let n = typeof e == "number" ? e : parseInt(e.trim(), 10);
			return !Number.isFinite(n) || n < t ? null : Math.trunc(n);
		}
		async function wt() {
			if (E.value) {
				St.value = !0, X.value = null;
				try {
					Y.value = await w.profileStreamLimits(E.value);
				} catch (e) {
					X.value = t(e, "Failed to load stream limits.");
				} finally {
					St.value = !1;
				}
			}
		}
		function Tt() {
			Q.value = {
				maxConcurrentStreams: Y.value?.max_concurrent_streams ?? 1,
				maxTotalBandwidthKbps: Y.value?.max_total_bandwidth_kbps?.toString() ?? ""
			}, $.value = null, Z.value = !0;
		}
		async function Et() {
			if (E.value) try {
				let e = Ct(Q.value.maxConcurrentStreams, 1);
				if (e === null) {
					$.value = "Max concurrent streams must be at least 1.";
					return;
				}
				let t = Ct(Q.value.maxTotalBandwidthKbps, 1);
				await w.updateProfileStreamLimits(E.value, e, t), S.success("Stream limits updated."), Z.value = !1, await wt();
			} catch (e) {
				$.value = t(e, "Failed to update stream limits.");
			}
		}
		async function Dt(e) {
			switch (e) {
				case "schedules":
					await z();
					break;
				case "tags":
					await J();
					break;
				case "streamLimits": await wt();
			}
		}
		function Ot(e) {
			k.value = e, Dt(e);
		}
		function kt(e) {
			R.value = e;
		}
		function At(e) {
			q.value = e;
		}
		return (e, t) => (g(), f("div", he, [
			p("header", ge, [t[21] ||= p("div", null, [p("p", { class: "parental-page__eyebrow" }, "Profile Controls"), p("h1", { class: "parental-page__title" }, "Parental Controls")], -1), at.value ? (g(), f("div", _e, [
				h(ce, {
					name: "user",
					size: "sm"
				}),
				m(" " + y(at.value.name) + " ", 1),
				h(o, { tone: "neutral" }, {
					default: b(() => [m(y(pe(n)[at.value.rating] ?? "Unknown"), 1)]),
					_: 1
				})
			])) : E.value && !D.value ? (g(), f("div", ve, [
				h(ce, {
					name: "alert",
					size: "sm"
				}),
				m(" Unidentified profile #" + y(E.value) + " ", 1),
				h(o, { tone: "error" }, {
					default: b(() => [m(y(O.value ?? "Not found"), 1)]),
					_: 1
				})
			])) : d("", !0)]),
			E.value ? (g(), u(ne, {
				key: 1,
				modelValue: k.value,
				"onUpdate:modelValue": [t[0] ||= (e) => k.value = e, Ot],
				tabs: st,
				label: "Parental control sections"
			}, {
				schedules: b(() => [p("div", be, [p("div", xe, [t[23] ||= p("p", { class: "parental-section__hint" }, [
					p("kbd", null, "c"),
					m(" create \xA0 "),
					p("kbd", null, "E"),
					m(" edit \xA0 "),
					p("kbd", null, "x"),
					m(" delete \xA0 "),
					p("kbd", null, "r"),
					m(" refresh ")
				], -1), h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: ut
				}, {
					default: b(() => [...t[22] ||= [m(" Create schedule ", -1)]]),
					_: 1
				})]), j.value ? (g(), f("div", Se, [h(ae, {
					variant: "text",
					lines: 6
				})])) : M.value ? (g(), u(s, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load schedules",
					description: M.value
				}, {
					actions: b(() => [h(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: z
					}, {
						default: b(() => [...t[24] ||= [m("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : A.value.length === 0 ? (g(), u(s, {
					key: 2,
					icon: "calendar",
					title: "No access schedules",
					description: "Create schedules to limit when this profile can access content."
				})) : (g(), f("div", Ce, [(g(!0), f(c, null, v(A.value, (e, n) => (g(), f("div", {
					key: e.id,
					class: de(["parental-section__item", { "is-selected": n === N.value }]),
					onClick: (e) => N.value = n
				}, [p("div", Te, [p("span", Ee, y(e.name), 1), p("span", De, y(e.start_time.substring(0, 5)) + " – " + y(e.end_time.substring(0, 5)) + " \xA0·\xA0 " + y(gt(e.days_of_week)), 1)]), p("div", Oe, [
					h(o, { tone: e.is_active ? "success" : "neutral" }, {
						default: b(() => [m(y(e.is_active ? "Active" : "Inactive"), 1)]),
						_: 2
					}, 1032, ["tone"]),
					h(r, {
						variant: "ghost",
						size: "sm",
						onClick: x((t) => dt(e), ["stop"])
					}, {
						default: b(() => [...t[25] ||= [m("Edit", -1)]]),
						_: 1
					}, 8, ["onClick"]),
					h(r, {
						variant: "ghost",
						size: "sm",
						onClick: x((t) => kt(e), ["stop"])
					}, {
						default: b(() => [...t[26] ||= [m("Delete", -1)]]),
						_: 1
					}, 8, ["onClick"])
				])], 10, we))), 128))]))])]),
				tags: b(() => [p("div", ke, [p("div", Ae, [t[28] ||= p("p", { class: "parental-section__hint" }, [
					p("kbd", null, "c"),
					m(" create \xA0 "),
					p("kbd", null, "x"),
					m(" delete \xA0 "),
					p("kbd", null, "r"),
					m(" refresh")
				], -1), h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: yt
				}, {
					default: b(() => [...t[27] ||= [m(" Add tag ", -1)]]),
					_: 1
				})]), V.value ? (g(), f("div", je, [h(ae, {
					variant: "text",
					lines: 4
				})])) : H.value ? (g(), u(s, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load tags",
					description: H.value
				}, {
					actions: b(() => [h(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: J
					}, {
						default: b(() => [...t[29] ||= [m("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : B.value.length === 0 ? (g(), u(s, {
					key: 2,
					icon: "bookmark",
					title: "No tags",
					description: "Add tags to block or allow specific content categories."
				})) : (g(), f("div", Me, [(g(!0), f(c, null, v(B.value, (e, n) => (g(), f("div", {
					key: e.id,
					class: de(["parental-section__item", { "is-selected": n === U.value }]),
					onClick: (e) => U.value = n
				}, [p("div", Pe, [p("span", Fe, y(e.tag), 1)]), p("div", Ie, [h(o, { tone: e.tag_type === "blocked" ? "error" : "success" }, {
					default: b(() => [m(y(e.tag_type), 1)]),
					_: 2
				}, 1032, ["tone"]), h(r, {
					variant: "ghost",
					size: "sm",
					onClick: x((t) => At(e), ["stop"])
				}, {
					default: b(() => [...t[30] ||= [m("Remove", -1)]]),
					_: 1
				}, 8, ["onClick"])])], 10, Ne))), 128))]))])]),
				streamLimits: b(() => [p("div", Le, [p("div", Re, [t[32] ||= p("p", { class: "parental-section__hint" }, [
					p("kbd", null, "u"),
					m(" update limits \xA0 "),
					p("kbd", null, "r"),
					m(" refresh")
				], -1), h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "settings",
					onClick: Tt
				}, {
					default: b(() => [...t[31] ||= [m(" Update limits ", -1)]]),
					_: 1
				})]), St.value ? (g(), f("div", ze, [h(ae, {
					variant: "text",
					lines: 4
				})])) : X.value ? (g(), u(s, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load stream limits",
					description: X.value
				}, {
					actions: b(() => [h(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: wt
					}, {
						default: b(() => [...t[33] ||= [m("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : (g(), u(oe, {
					key: 2,
					class: "parental-section__limits-card"
				}, {
					default: b(() => [p("div", Be, [t[34] ||= p("span", { class: "parental-section__limits-label" }, "Max concurrent streams", -1), p("span", Ve, y(Y.value?.max_concurrent_streams ?? "Not set"), 1)]), p("div", He, [t[35] ||= p("span", { class: "parental-section__limits-label" }, "Max total bandwidth (Kbps)", -1), p("span", Ue, y(Y.value?.max_total_bandwidth_kbps ?? "Not set"), 1)])]),
					_: 1
				}))])]),
				_: 1
			}, 8, ["modelValue"])) : (g(), f("div", ye, [h(s, {
				icon: "user",
				title: "No profile selected",
				description: "Parental controls apply to one profile at a time. No profile was selected, so there is nothing to show yet — go back and pick a profile first."
			})])),
			h(i, {
				modelValue: P.value,
				"onUpdate:modelValue": t[6] ||= (e) => P.value = e,
				title: F.value ? "Edit schedule" : "Create schedule",
				size: "sm"
			}, {
				default: b(() => [p("form", {
					class: "parental-form",
					onSubmit: x(pt, ["prevent"])
				}, [
					L.value ? (g(), f("p", We, y(L.value), 1)) : d("", !0),
					h(a, {
						modelValue: I.value.name,
						"onUpdate:modelValue": t[1] ||= (e) => I.value.name = e,
						label: "Name",
						placeholder: "e.g. Weekday Evenings"
					}, null, 8, ["modelValue"]),
					p("div", Ge, [h(a, {
						modelValue: I.value.startTime,
						"onUpdate:modelValue": t[2] ||= (e) => I.value.startTime = e,
						label: "Start time (HH:MM)",
						placeholder: "08:00"
					}, null, 8, ["modelValue"]), h(a, {
						modelValue: I.value.endTime,
						"onUpdate:modelValue": t[3] ||= (e) => I.value.endTime = e,
						label: "End time (HH:MM)",
						placeholder: "22:00"
					}, null, 8, ["modelValue"])]),
					p("div", Ke, [t[36] ||= p("label", { class: "parental-form__label" }, "Days", -1), p("div", qe, [(g(), f(c, null, v(ct, (e) => h(r, {
						key: e,
						size: "sm",
						variant: I.value.daysOfWeek.includes(e) ? "solid" : "ghost",
						onClick: (t) => ht(e)
					}, {
						default: b(() => [m(y(e.charAt(0).toUpperCase() + e.slice(1, 3)), 1)]),
						_: 2
					}, 1032, ["variant", "onClick"])), 64))])]),
					h(ie, {
						modelValue: I.value.isActive,
						"onUpdate:modelValue": t[4] ||= (e) => I.value.isActive = e,
						label: "Active"
					}, null, 8, ["modelValue"]),
					p("div", Je, [h(r, {
						variant: "ghost",
						type: "button",
						onClick: t[5] ||= (e) => P.value = !1
					}, {
						default: b(() => [...t[37] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(r, {
						variant: "solid",
						type: "submit"
					}, {
						default: b(() => [m(y(F.value ? "Update" : "Create"), 1)]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(i, {
				modelValue: W.value,
				"onUpdate:modelValue": t[10] ||= (e) => W.value = e,
				title: "Add tag",
				size: "sm"
			}, {
				default: b(() => [p("form", {
					class: "parental-form",
					onSubmit: x(bt, ["prevent"])
				}, [
					K.value ? (g(), f("p", Ye, y(K.value), 1)) : d("", !0),
					h(a, {
						modelValue: G.value.tag,
						"onUpdate:modelValue": t[7] ||= (e) => G.value.tag = e,
						label: "Tag name",
						placeholder: "e.g. kids, restricted, work"
					}, null, 8, ["modelValue"]),
					h(re, {
						modelValue: G.value.tagType,
						"onUpdate:modelValue": t[8] ||= (e) => G.value.tagType = e,
						label: "Tag type",
						options: _t
					}, null, 8, ["modelValue"]),
					p("div", Xe, [h(r, {
						variant: "ghost",
						type: "button",
						onClick: t[9] ||= (e) => W.value = !1
					}, {
						default: b(() => [...t[38] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(r, {
						variant: "solid",
						type: "submit"
					}, {
						default: b(() => [...t[39] ||= [m("Add tag", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(i, {
				modelValue: Z.value,
				"onUpdate:modelValue": t[14] ||= (e) => Z.value = e,
				title: "Update stream limits",
				size: "sm"
			}, {
				default: b(() => [p("form", {
					class: "parental-form",
					onSubmit: x(Et, ["prevent"])
				}, [
					$.value ? (g(), f("p", Ze, y($.value), 1)) : d("", !0),
					h(a, {
						modelValue: Q.value.maxConcurrentStreams,
						"onUpdate:modelValue": t[11] ||= (e) => Q.value.maxConcurrentStreams = e,
						modelModifiers: { number: !0 },
						label: "Max concurrent streams",
						type: "number",
						min: "1"
					}, null, 8, ["modelValue"]),
					h(a, {
						modelValue: Q.value.maxTotalBandwidthKbps,
						"onUpdate:modelValue": t[12] ||= (e) => Q.value.maxTotalBandwidthKbps = e,
						label: "Max total bandwidth (Kbps, optional)",
						type: "number",
						min: "0",
						placeholder: "Leave empty for no limit"
					}, null, 8, ["modelValue"]),
					p("div", Qe, [h(r, {
						variant: "ghost",
						type: "button",
						onClick: t[13] ||= (e) => Z.value = !1
					}, {
						default: b(() => [...t[40] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(r, {
						variant: "solid",
						type: "submit"
					}, {
						default: b(() => [...t[41] ||= [m("Update", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(i, {
				modelValue: lt.value,
				"onUpdate:modelValue": t[17] ||= (e) => lt.value = e,
				title: "Delete schedule",
				size: "sm"
			}, {
				default: b(() => [R.value ? (g(), f("p", $e, [
					t[42] ||= m(" Delete schedule ", -1),
					p("strong", null, y(R.value.name), 1),
					t[43] ||= m("? ", -1)
				])) : d("", !0), p("div", et, [h(r, {
					variant: "ghost",
					onClick: t[15] ||= (e) => R.value = null
				}, {
					default: b(() => [...t[44] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "danger",
					onClick: t[16] ||= (e) => R.value && mt(R.value)
				}, {
					default: b(() => [...t[45] ||= [m(" Delete ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"]),
			h(i, {
				modelValue: vt.value,
				"onUpdate:modelValue": t[20] ||= (e) => vt.value = e,
				title: "Remove tag",
				size: "sm"
			}, {
				default: b(() => [q.value ? (g(), f("p", tt, [
					t[46] ||= m(" Remove tag ", -1),
					p("strong", null, y(q.value.tag), 1),
					t[47] ||= m("? ", -1)
				])) : d("", !0), p("div", nt, [h(r, {
					variant: "ghost",
					onClick: t[18] ||= (e) => q.value = null
				}, {
					default: b(() => [...t[48] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "danger",
					onClick: t[19] ||= (e) => q.value && xt(q.value)
				}, {
					default: b(() => [...t[49] ||= [m(" Remove ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-997ceb8f"]]);
export { S as default };

//# sourceMappingURL=ParentalControlsPage-B0UP1zEs.js.map