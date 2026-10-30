import { l as e, t, y as n } from "./client-CW4dUyY-.js";
import { a as ee, t as te } from "./users-Br-ZUS76.js";
import { t as ne } from "./useToastStore-Bu-iYU7r.js";
import { t as re } from "./Tabs-DkWwQI4r.js";
import { t as r } from "./Button-1sKEdGjj.js";
import { t as i } from "./Modal-BU4hJGBA.js";
import { t as ie } from "./Select-ChFXd0gU.js";
import { t as a } from "./Input-hVCTPbto.js";
import { t as ae } from "./Switch-C1Wv5sN2.js";
import { t as o } from "./Badge-C6LNO9Kk.js";
import { t as s } from "./Skeleton-B2Mt2L00.js";
import { t as c } from "./EmptyState-BjOJ1k_A.js";
import { t as oe } from "./Card-C8ekyPJB.js";
import { n as se, t as ce } from "./Icon-CIbfiPrs.js";
import { Fragment as le, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as ue, inject as de, normalizeClass as fe, onMounted as pe, openBlock as g, ref as _, renderList as me, toDisplayString as v, unref as he, withCtx as y, withModifiers as b } from "vue";
import { useRoute as ge } from "vue-router";
// src/pages/ParentalControlsPage.vue?vue&type=script&setup=true&lang.ts
var _e = { class: "parental-page" }, ve = { class: "parental-page__head" }, ye = {
	key: 0,
	class: "parental-page__profile-badge"
}, be = {
	key: 1,
	class: "parental-page__profile-badge parental-page__profile-badge--unknown",
	role: "status"
}, xe = {
	key: 0,
	class: "parental-page__no-profile"
}, Se = { class: "parental-section" }, Ce = { class: "parental-section__toolbar" }, we = {
	key: 0,
	class: "parental-section__loading"
}, Te = {
	key: 3,
	class: "parental-section__list"
}, Ee = ["onClick"], De = { class: "parental-section__item-main" }, Oe = { class: "parental-section__item-name" }, ke = { class: "parental-section__item-meta" }, Ae = { class: "parental-section__item-actions" }, je = { class: "parental-section" }, Me = { class: "parental-section__toolbar" }, Ne = {
	key: 0,
	class: "parental-section__loading"
}, Pe = {
	key: 3,
	class: "parental-section__list"
}, Fe = ["onClick"], Ie = { class: "parental-section__item-main" }, Le = { class: "parental-section__item-name" }, Re = { class: "parental-section__item-actions" }, ze = { class: "parental-section" }, Be = { class: "parental-section__toolbar" }, Ve = {
	key: 0,
	class: "parental-section__loading"
}, He = { class: "parental-section__limits-row" }, Ue = { class: "parental-section__limits-value" }, We = { class: "parental-section__limits-row" }, Ge = { class: "parental-section__limits-value" }, Ke = {
	key: 0,
	class: "parental-form__error"
}, qe = { class: "parental-form__row" }, Je = { class: "parental-form__days" }, Ye = { class: "parental-form__day-buttons" }, Xe = { class: "parental-form__actions" }, Ze = {
	key: 0,
	class: "parental-form__error"
}, Qe = { class: "parental-form__actions" }, $e = {
	key: 0,
	class: "parental-form__error"
}, et = { class: "parental-form__actions" }, tt = { key: 0 }, nt = { class: "parental-form__actions" }, rt = { key: 0 }, it = { class: "parental-form__actions" }, x = /*#__PURE__*/ se(/* @__PURE__ */ ue({
	__name: "ParentalControlsPage",
	props: { client: {} },
	setup(se) {
		let ue = ge(), x = ne(), at = se, S = de("apiBase", ""), ot = l(() => typeof S == "string" ? S : S?.value ?? ""), C = new te(at.client ?? new t({
			baseUrl: ot.value,
			tokenStore: new e()
		})), w = _([]), T = _(null), E = _(!0), D = _(null), O = l(() => w.value.find((e) => String(e.id) === String(T.value)) ?? null);
		async function st() {
			let e = T.value;
			if (!e) w.value = [], D.value = null, E.value = !1;
			else {
				E.value = !0, D.value = null;
				try {
					w.value = [await C.getProfile(e)];
				} catch (e) {
					w.value = [], D.value = n(e, "Could not load this profile.");
				} finally {
					E.value = !1;
				}
			}
		}
		pe(() => {
			let e = ue.query.profile;
			typeof e == "string" && e.trim() !== "" && (T.value = e.trim()), st(), T.value && Ot(k.value);
		});
		let ct = [
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
		], k = _("schedules"), lt = [
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
		}), L = _(null), R = _(null), ut = l({
			get: () => R.value !== null,
			set: (e) => {
				e || (R.value = null);
			}
		});
		async function z() {
			if (T.value) {
				j.value = !0, M.value = null;
				try {
					A.value = await C.profileSchedules(T.value), N.value = Math.min(N.value, A.value.length - 1);
				} catch (e) {
					M.value = n(e, "Failed to load schedules.");
				} finally {
					j.value = !1;
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
			if (!T.value) return;
			let e = pt();
			if (e) L.value = e;
			else try {
				F.value ? await C.updateProfileSchedule(T.value, F.value.id, I.value.name.trim(), I.value.startTime + ":00", I.value.endTime + ":00", I.value.daysOfWeek, I.value.isActive) : await C.createProfileSchedule(T.value, I.value.name.trim(), I.value.startTime + ":00", I.value.endTime + ":00", I.value.daysOfWeek, I.value.isActive), x.success(F.value ? "Schedule updated." : "Schedule created."), P.value = !1, await z();
			} catch (e) {
				L.value = n(e, "Failed to save schedule.");
			}
		}
		async function ht(e) {
			if (T.value) try {
				await C.deleteProfileSchedule(T.value, e.id), x.success("Schedule deleted."), R.value = null, await z();
			} catch (e) {
				x.error(n(e, "Failed to delete schedule.")), R.value = null;
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
		}], B = _([]), yt = _(!1), V = _(null), H = _(0), U = _(!1), W = _({
			tag: "",
			tagType: "blocked"
		}), G = _(null), K = _(null), bt = l({
			get: () => K.value !== null,
			set: (e) => {
				e || (K.value = null);
			}
		});
		async function q() {
			if (T.value) {
				yt.value = !0, V.value = null;
				try {
					B.value = await C.profileTags(T.value), H.value = Math.min(H.value, B.value.length - 1);
				} catch (e) {
					V.value = n(e, "Failed to load tags.");
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
			if (!T.value) return;
			let e = W.value.tag.trim();
			if (!e) G.value = "Tag name is required.";
			else if (e.length > 100) G.value = "Tag must be 100 characters or less.";
			else try {
				await C.addProfileTag(T.value, e, W.value.tagType), x.success("Tag added."), U.value = !1, await q();
			} catch (e) {
				G.value = n(e, "Failed to add tag.");
			}
		}
		async function Ct(e) {
			if (T.value) try {
				await C.deleteProfileTag(T.value, e.id), x.success("Tag removed."), K.value = null, await q();
			} catch (e) {
				x.error(n(e, "Failed to remove tag.")), K.value = null;
			}
		}
		let J = _(null), wt = _(!1), Y = _(null), X = _(!1), Z = _({
			maxConcurrentStreams: 1,
			maxTotalBandwidthKbps: ""
		}), Q = _(null);
		function Tt(e, t) {
			let n = typeof e == "number" ? e : parseInt(e.trim(), 10);
			return !Number.isFinite(n) || n < t ? null : Math.trunc(n);
		}
		async function $() {
			if (T.value) {
				wt.value = !0, Y.value = null;
				try {
					J.value = await C.profileStreamLimits(T.value);
				} catch (e) {
					Y.value = n(e, "Failed to load stream limits.");
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
			if (T.value) try {
				let e = Tt(Z.value.maxConcurrentStreams, 1);
				if (e === null) {
					Q.value = "Max concurrent streams must be at least 1.";
					return;
				}
				let t = Tt(Z.value.maxTotalBandwidthKbps, 1);
				await C.updateProfileStreamLimits(T.value, e, t), x.success("Stream limits updated."), X.value = !1, await $();
			} catch (e) {
				Q.value = n(e, "Failed to update stream limits.");
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
			k.value = e, Ot(e);
		}
		function At(e) {
			R.value = e;
		}
		function jt(e) {
			K.value = e;
		}
		return (e, t) => (g(), f("div", _e, [
			p("header", ve, [t[21] ||= p("div", null, [p("p", { class: "parental-page__eyebrow" }, "Profile Controls"), p("h1", { class: "parental-page__title" }, "Parental Controls")], -1), O.value ? (g(), f("div", ye, [
				h(ce, {
					name: "user",
					size: "sm"
				}),
				m(" " + v(O.value.name) + " ", 1),
				h(o, { tone: "neutral" }, {
					default: y(() => [m(v(he(ee)[O.value.rating] ?? "Unknown"), 1)]),
					_: 1
				})
			])) : T.value && !E.value ? (g(), f("div", be, [
				h(ce, {
					name: "alert",
					size: "sm"
				}),
				m(" Unidentified profile #" + v(T.value) + " ", 1),
				h(o, { tone: "error" }, {
					default: y(() => [m(v(D.value ?? "Not found"), 1)]),
					_: 1
				})
			])) : d("", !0)]),
			T.value ? (g(), u(re, {
				key: 1,
				modelValue: k.value,
				"onUpdate:modelValue": [t[0] ||= (e) => k.value = e, kt],
				tabs: ct,
				label: "Parental control sections"
			}, {
				schedules: y(() => [p("div", Se, [p("div", Ce, [t[23] ||= p("p", { class: "parental-section__hint" }, [
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
					onClick: dt
				}, {
					default: y(() => [...t[22] ||= [m(" Create schedule ", -1)]]),
					_: 1
				})]), j.value ? (g(), f("div", we, [h(s, {
					variant: "text",
					lines: 6
				})])) : M.value ? (g(), u(c, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load schedules",
					description: M.value
				}, {
					actions: y(() => [h(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: z
					}, {
						default: y(() => [...t[24] ||= [m("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : A.value.length === 0 ? (g(), u(c, {
					key: 2,
					icon: "calendar",
					title: "No access schedules",
					description: "Create schedules to limit when this profile can access content."
				})) : (g(), f("div", Te, [(g(!0), f(le, null, me(A.value, (e, n) => (g(), f("div", {
					key: e.id,
					class: fe(["parental-section__item", { "is-selected": n === N.value }]),
					onClick: (e) => N.value = n
				}, [p("div", De, [p("span", Oe, v(e.name), 1), p("span", ke, v(e.start_time.substring(0, 5)) + " – " + v(e.end_time.substring(0, 5)) + " \xA0·\xA0 " + v(_t(e.days_of_week)), 1)]), p("div", Ae, [
					h(o, { tone: e.is_active ? "success" : "neutral" }, {
						default: y(() => [m(v(e.is_active ? "Active" : "Inactive"), 1)]),
						_: 2
					}, 1032, ["tone"]),
					h(r, {
						variant: "ghost",
						size: "sm",
						onClick: b((t) => ft(e), ["stop"])
					}, {
						default: y(() => [...t[25] ||= [m("Edit", -1)]]),
						_: 1
					}, 8, ["onClick"]),
					h(r, {
						variant: "ghost",
						size: "sm",
						onClick: b((t) => At(e), ["stop"])
					}, {
						default: y(() => [...t[26] ||= [m("Delete", -1)]]),
						_: 1
					}, 8, ["onClick"])
				])], 10, Ee))), 128))]))])]),
				tags: y(() => [p("div", je, [p("div", Me, [t[28] ||= p("p", { class: "parental-section__hint" }, [
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
					onClick: xt
				}, {
					default: y(() => [...t[27] ||= [m(" Add tag ", -1)]]),
					_: 1
				})]), yt.value ? (g(), f("div", Ne, [h(s, {
					variant: "text",
					lines: 4
				})])) : V.value ? (g(), u(c, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load tags",
					description: V.value
				}, {
					actions: y(() => [h(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: q
					}, {
						default: y(() => [...t[29] ||= [m("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : B.value.length === 0 ? (g(), u(c, {
					key: 2,
					icon: "bookmark",
					title: "No tags",
					description: "Add tags to block or allow specific content categories."
				})) : (g(), f("div", Pe, [(g(!0), f(le, null, me(B.value, (e, n) => (g(), f("div", {
					key: e.id,
					class: fe(["parental-section__item", { "is-selected": n === H.value }]),
					onClick: (e) => H.value = n
				}, [p("div", Ie, [p("span", Le, v(e.tag), 1)]), p("div", Re, [h(o, { tone: e.tag_type === "blocked" ? "error" : "success" }, {
					default: y(() => [m(v(e.tag_type), 1)]),
					_: 2
				}, 1032, ["tone"]), h(r, {
					variant: "ghost",
					size: "sm",
					onClick: b((t) => jt(e), ["stop"])
				}, {
					default: y(() => [...t[30] ||= [m("Remove", -1)]]),
					_: 1
				}, 8, ["onClick"])])], 10, Fe))), 128))]))])]),
				streamLimits: y(() => [p("div", ze, [p("div", Be, [t[32] ||= p("p", { class: "parental-section__hint" }, [
					p("kbd", null, "u"),
					m(" update limits \xA0 "),
					p("kbd", null, "r"),
					m(" refresh")
				], -1), h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "settings",
					onClick: Et
				}, {
					default: y(() => [...t[31] ||= [m(" Update limits ", -1)]]),
					_: 1
				})]), wt.value ? (g(), f("div", Ve, [h(s, {
					variant: "text",
					lines: 4
				})])) : Y.value ? (g(), u(c, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load stream limits",
					description: Y.value
				}, {
					actions: y(() => [h(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: y(() => [...t[33] ||= [m("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : (g(), u(oe, {
					key: 2,
					class: "parental-section__limits-card"
				}, {
					default: y(() => [p("div", He, [t[34] ||= p("span", { class: "parental-section__limits-label" }, "Max concurrent streams", -1), p("span", Ue, v(J.value?.max_concurrent_streams ?? "Not set"), 1)]), p("div", We, [t[35] ||= p("span", { class: "parental-section__limits-label" }, "Max total bandwidth (Kbps)", -1), p("span", Ge, v(J.value?.max_total_bandwidth_kbps ?? "Not set"), 1)])]),
					_: 1
				}))])]),
				_: 1
			}, 8, ["modelValue"])) : (g(), f("div", xe, [h(c, {
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
				default: y(() => [p("form", {
					class: "parental-form",
					onSubmit: b(mt, ["prevent"])
				}, [
					L.value ? (g(), f("p", Ke, v(L.value), 1)) : d("", !0),
					h(a, {
						modelValue: I.value.name,
						"onUpdate:modelValue": t[1] ||= (e) => I.value.name = e,
						label: "Name",
						placeholder: "e.g. Weekday Evenings"
					}, null, 8, ["modelValue"]),
					p("div", qe, [h(a, {
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
					p("div", Je, [t[36] ||= p("label", { class: "parental-form__label" }, "Days", -1), p("div", Ye, [(g(), f(le, null, me(lt, (e) => h(r, {
						key: e,
						size: "sm",
						variant: I.value.daysOfWeek.includes(e) ? "solid" : "ghost",
						onClick: (t) => gt(e)
					}, {
						default: y(() => [m(v(e.charAt(0).toUpperCase() + e.slice(1, 3)), 1)]),
						_: 2
					}, 1032, ["variant", "onClick"])), 64))])]),
					h(ae, {
						modelValue: I.value.isActive,
						"onUpdate:modelValue": t[4] ||= (e) => I.value.isActive = e,
						label: "Active"
					}, null, 8, ["modelValue"]),
					p("div", Xe, [h(r, {
						variant: "ghost",
						type: "button",
						onClick: t[5] ||= (e) => P.value = !1
					}, {
						default: y(() => [...t[37] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(r, {
						variant: "solid",
						type: "submit"
					}, {
						default: y(() => [m(v(F.value ? "Update" : "Create"), 1)]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(i, {
				modelValue: U.value,
				"onUpdate:modelValue": t[10] ||= (e) => U.value = e,
				title: "Add tag",
				size: "sm"
			}, {
				default: y(() => [p("form", {
					class: "parental-form",
					onSubmit: b(St, ["prevent"])
				}, [
					G.value ? (g(), f("p", Ze, v(G.value), 1)) : d("", !0),
					h(a, {
						modelValue: W.value.tag,
						"onUpdate:modelValue": t[7] ||= (e) => W.value.tag = e,
						label: "Tag name",
						placeholder: "e.g. kids, restricted, work"
					}, null, 8, ["modelValue"]),
					h(ie, {
						modelValue: W.value.tagType,
						"onUpdate:modelValue": t[8] ||= (e) => W.value.tagType = e,
						label: "Tag type",
						options: vt
					}, null, 8, ["modelValue"]),
					p("div", Qe, [h(r, {
						variant: "ghost",
						type: "button",
						onClick: t[9] ||= (e) => U.value = !1
					}, {
						default: y(() => [...t[38] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(r, {
						variant: "solid",
						type: "submit"
					}, {
						default: y(() => [...t[39] ||= [m("Add tag", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(i, {
				modelValue: X.value,
				"onUpdate:modelValue": t[14] ||= (e) => X.value = e,
				title: "Update stream limits",
				size: "sm"
			}, {
				default: y(() => [p("form", {
					class: "parental-form",
					onSubmit: b(Dt, ["prevent"])
				}, [
					Q.value ? (g(), f("p", $e, v(Q.value), 1)) : d("", !0),
					h(a, {
						modelValue: Z.value.maxConcurrentStreams,
						"onUpdate:modelValue": t[11] ||= (e) => Z.value.maxConcurrentStreams = e,
						modelModifiers: { number: !0 },
						label: "Max concurrent streams",
						type: "number",
						min: "1"
					}, null, 8, ["modelValue"]),
					h(a, {
						modelValue: Z.value.maxTotalBandwidthKbps,
						"onUpdate:modelValue": t[12] ||= (e) => Z.value.maxTotalBandwidthKbps = e,
						label: "Max total bandwidth (Kbps, optional)",
						type: "number",
						min: "0",
						placeholder: "Leave empty for no limit"
					}, null, 8, ["modelValue"]),
					p("div", et, [h(r, {
						variant: "ghost",
						type: "button",
						onClick: t[13] ||= (e) => X.value = !1
					}, {
						default: y(() => [...t[40] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(r, {
						variant: "solid",
						type: "submit"
					}, {
						default: y(() => [...t[41] ||= [m("Update", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(i, {
				modelValue: ut.value,
				"onUpdate:modelValue": t[17] ||= (e) => ut.value = e,
				title: "Delete schedule",
				size: "sm"
			}, {
				default: y(() => [R.value ? (g(), f("p", tt, [
					t[42] ||= m(" Delete schedule ", -1),
					p("strong", null, v(R.value.name), 1),
					t[43] ||= m("? ", -1)
				])) : d("", !0), p("div", nt, [h(r, {
					variant: "ghost",
					onClick: t[15] ||= (e) => R.value = null
				}, {
					default: y(() => [...t[44] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "danger",
					onClick: t[16] ||= (e) => R.value && ht(R.value)
				}, {
					default: y(() => [...t[45] ||= [m(" Delete ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"]),
			h(i, {
				modelValue: bt.value,
				"onUpdate:modelValue": t[20] ||= (e) => bt.value = e,
				title: "Remove tag",
				size: "sm"
			}, {
				default: y(() => [K.value ? (g(), f("p", rt, [
					t[46] ||= m(" Remove tag ", -1),
					p("strong", null, v(K.value.tag), 1),
					t[47] ||= m("? ", -1)
				])) : d("", !0), p("div", it, [h(r, {
					variant: "ghost",
					onClick: t[18] ||= (e) => K.value = null
				}, {
					default: y(() => [...t[48] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "danger",
					onClick: t[19] ||= (e) => K.value && Ct(K.value)
				}, {
					default: y(() => [...t[49] ||= [m(" Remove ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-baf44fdf"]]);
export { x as default };

//# sourceMappingURL=ParentalControlsPage-Bhn35w8s.js.map