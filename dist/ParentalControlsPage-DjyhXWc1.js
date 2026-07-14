import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { t as n } from "./Modal-CSaTqZvF.js";
import { c as r, f as i, t as ee } from "./client-D1nDQ0cP.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-btm-GCUN.js";
import { t as o } from "./Badge-D_aUH3dO.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { t as re } from "./Select-Bx8h2mSF.js";
import { t as ie } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-CfyGawh7.js";
import { t as ae } from "./Tabs-D8iKNBl3.js";
import { n as oe, t as se } from "./users-B74FC_jE.js";
import { t as ce } from "./Card-BvLj4L6F.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as le, normalizeClass as _, onMounted as ue, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, useId as C, withCtx as w, withModifiers as T } from "vue";
import { useRoute as de } from "vue-router";
//#region src/components/ui/Input.vue?vue&type=script&setup=true&lang.ts
var fe = ["for"], E = [
	"id",
	"type",
	"value",
	"placeholder",
	"min",
	"max",
	"disabled"
], D = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "Input",
	props: {
		modelValue: {},
		label: {},
		placeholder: {},
		type: { default: "text" },
		min: {},
		max: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = C();
		function ee(e) {
			let t = e.target;
			r("update:modelValue", n.type === "number" ? Number(t.value) : t.value);
		}
		return (t, n) => (v(), f("div", { class: _(["phlix-input", { "is-disabled": e.disabled }]) }, [e.label ? (v(), f("label", {
			key: 0,
			for: S(i),
			class: "phlix-input__label"
		}, x(e.label), 9, fe)) : d("", !0), p("input", {
			id: S(i),
			class: "phlix-input__field",
			type: e.type,
			value: e.modelValue,
			placeholder: e.placeholder,
			min: e.min,
			max: e.max,
			disabled: e.disabled,
			onInput: ee
		}, null, 40, E)], 2));
	}
}), [["__scopeId", "data-v-e5e230f3"]]), pe = { class: "parental-page" }, me = { class: "parental-page__head" }, he = {
	key: 0,
	class: "parental-page__profile-badge"
}, ge = {
	key: 0,
	class: "parental-page__no-profile"
}, _e = { class: "parental-section" }, ve = { class: "parental-section__toolbar" }, ye = {
	key: 0,
	class: "parental-section__loading"
}, be = {
	key: 3,
	class: "parental-section__list"
}, xe = ["onClick"], Se = { class: "parental-section__item-main" }, Ce = { class: "parental-section__item-name" }, we = { class: "parental-section__item-meta" }, Te = { class: "parental-section__item-actions" }, Ee = { class: "parental-section" }, De = { class: "parental-section__toolbar" }, Oe = {
	key: 0,
	class: "parental-section__loading"
}, ke = {
	key: 3,
	class: "parental-section__list"
}, Ae = ["onClick"], je = { class: "parental-section__item-main" }, Me = { class: "parental-section__item-name" }, Ne = { class: "parental-section__item-actions" }, Pe = { class: "parental-section" }, Fe = { class: "parental-section__toolbar" }, Ie = {
	key: 0,
	class: "parental-section__loading"
}, Le = { class: "parental-section__limits-row" }, Re = { class: "parental-section__limits-value" }, ze = { class: "parental-section__limits-row" }, Be = { class: "parental-section__limits-value" }, Ve = {
	key: 0,
	class: "parental-form__error"
}, He = { class: "parental-form__row" }, Ue = { class: "parental-form__days" }, We = { class: "parental-form__day-buttons" }, Ge = { class: "parental-form__actions" }, Ke = {
	key: 0,
	class: "parental-form__error"
}, qe = { class: "parental-form__actions" }, Je = {
	key: 0,
	class: "parental-form__error"
}, Ye = { class: "parental-form__actions" }, Xe = { key: 0 }, Ze = { class: "parental-form__actions" }, Qe = { key: 0 }, $e = { class: "parental-form__actions" }, et = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "ParentalControlsPage",
	props: { client: {} },
	setup(e) {
		let g = de(), C = te(), fe = e, E = le("apiBase", ""), et = l(() => typeof E == "string" ? E : E?.value ?? ""), O = new se(fe.client ?? new ee({
			baseUrl: et.value,
			tokenStore: new r()
		})), tt = y([]), k = y(null), nt = y(!0), rt = l(() => tt.value.find((e) => e.id === k.value) ?? null);
		async function it() {
			nt.value = !0;
			try {
				tt.value = [];
			} catch {} finally {
				nt.value = !1;
			}
		}
		ue(() => {
			let e = g.query.profile;
			e && !isNaN(Number(e)) && (k.value = Number(e)), it(), k.value && Tt(A.value);
		});
		let at = [
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
		], A = y("schedules"), ot = [
			"mon",
			"tue",
			"wed",
			"thu",
			"fri",
			"sat",
			"sun"
		], j = y([]), st = y(!1), M = y(null), N = y(0), P = y(!1), F = y(null), I = y({
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
		}), L = y(null), R = y(null), ct = l({
			get: () => R.value !== null,
			set: (e) => {
				e || (R.value = null);
			}
		});
		async function z() {
			if (k.value) {
				st.value = !0, M.value = null;
				try {
					j.value = await O.profileSchedules(k.value), N.value = Math.min(N.value, j.value.length - 1);
				} catch (e) {
					M.value = i(e, "Failed to load schedules.");
				} finally {
					st.value = !1;
				}
			}
		}
		function lt() {
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
		function ut(e) {
			F.value = e, I.value = {
				name: e.name,
				startTime: e.start_time.substring(0, 5),
				endTime: e.end_time.substring(0, 5),
				daysOfWeek: [...e.days_of_week],
				isActive: e.is_active
			}, L.value = null, P.value = !0;
		}
		function dt() {
			return I.value.name.trim() ? I.value.name.length > 100 ? "Name must be 100 characters or less." : /^\d{1,2}:\d{2}(:\d{2})?$/.test(I.value.startTime) ? /^\d{1,2}:\d{2}(:\d{2})?$/.test(I.value.endTime) ? I.value.daysOfWeek.length === 0 ? "At least one day is required." : null : "Invalid end time. Use HH:MM or HH:MM:SS." : "Invalid start time. Use HH:MM or HH:MM:SS." : "Name is required.";
		}
		async function ft() {
			if (!k.value) return;
			let e = dt();
			if (e) {
				L.value = e;
				return;
			}
			try {
				F.value && await O.deleteProfileSchedule(k.value, F.value.id), await O.createProfileSchedule(k.value, I.value.name.trim(), I.value.startTime + ":00", I.value.endTime + ":00", I.value.daysOfWeek, I.value.isActive), C.success(F.value ? "Schedule updated." : "Schedule created."), P.value = !1, await z();
			} catch (e) {
				L.value = i(e, "Failed to save schedule.");
			}
		}
		async function pt(e) {
			if (k.value) try {
				await O.deleteProfileSchedule(k.value, e.id), C.success("Schedule deleted."), R.value = null, await z();
			} catch (e) {
				C.error(i(e, "Failed to delete schedule.")), R.value = null;
			}
		}
		function mt(e) {
			let t = I.value.daysOfWeek.indexOf(e);
			t === -1 ? I.value.daysOfWeek.push(e) : I.value.daysOfWeek.splice(t, 1);
		}
		function ht(e) {
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
		let gt = [{
			value: "blocked",
			label: "Blocked"
		}, {
			value: "allowed",
			label: "Allowed"
		}], B = y([]), V = y(!1), H = y(null), U = y(0), W = y(!1), G = y({
			tag: "",
			tagType: "blocked"
		}), K = y(null), q = y(null), _t = l({
			get: () => q.value !== null,
			set: (e) => {
				e || (q.value = null);
			}
		});
		async function J() {
			if (k.value) {
				V.value = !0, H.value = null;
				try {
					B.value = await O.profileTags(k.value), U.value = Math.min(U.value, B.value.length - 1);
				} catch (e) {
					H.value = i(e, "Failed to load tags.");
				} finally {
					V.value = !1;
				}
			}
		}
		function vt() {
			G.value = {
				tag: "",
				tagType: "blocked"
			}, K.value = null, W.value = !0;
		}
		async function yt() {
			if (!k.value) return;
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
				await O.addProfileTag(k.value, e, G.value.tagType), C.success("Tag added."), W.value = !1, await J();
			} catch (e) {
				K.value = i(e, "Failed to add tag.");
			}
		}
		async function bt(e) {
			if (k.value) try {
				await O.deleteProfileTag(k.value, e.id), C.success("Tag removed."), q.value = null, await J();
			} catch (e) {
				C.error(i(e, "Failed to remove tag.")), q.value = null;
			}
		}
		let Y = y(null), xt = y(!1), X = y(null), Z = y(!1), Q = y({
			maxConcurrentStreams: 1,
			maxTotalBandwidthKbps: ""
		}), $ = y(null);
		async function St() {
			if (k.value) {
				xt.value = !0, X.value = null;
				try {
					Y.value = await O.profileStreamLimits(k.value);
				} catch (e) {
					X.value = i(e, "Failed to load stream limits.");
				} finally {
					xt.value = !1;
				}
			}
		}
		function Ct() {
			Q.value = {
				maxConcurrentStreams: Y.value?.max_concurrent_streams ?? 1,
				maxTotalBandwidthKbps: Y.value?.max_total_bandwidth_kbps?.toString() ?? ""
			}, $.value = null, Z.value = !0;
		}
		async function wt() {
			if (!k.value) return;
			let e = Q.value.maxConcurrentStreams;
			if (e < 1) {
				$.value = "Max concurrent streams must be at least 1.";
				return;
			}
			let t = null, n = Q.value.maxTotalBandwidthKbps.trim();
			n !== "" && (t = parseInt(n, 10), (isNaN(t) || t < 1) && (t = null));
			try {
				await O.updateProfileStreamLimits(k.value, e, t), C.success("Stream limits updated."), Z.value = !1, await St();
			} catch (e) {
				$.value = i(e, "Failed to update stream limits.");
			}
		}
		async function Tt(e) {
			switch (e) {
				case "schedules":
					await z();
					break;
				case "tags":
					await J();
					break;
				case "streamLimits":
					await St();
					break;
			}
		}
		function Et(e) {
			A.value = e, Tt(e);
		}
		function Dt(e) {
			R.value = e;
		}
		function Ot(e) {
			q.value = e;
		}
		return (e, r) => (v(), f("div", pe, [
			p("header", me, [r[21] ||= p("div", null, [p("p", { class: "parental-page__eyebrow" }, "Profile Controls"), p("h1", { class: "parental-page__title" }, "Parental Controls")], -1), rt.value ? (v(), f("div", he, [
				h(t, {
					name: "user",
					size: "sm"
				}),
				m(" " + x(rt.value.name) + " ", 1),
				h(o, { tone: "neutral" }, {
					default: w(() => [m(x(S(oe)[rt.value.rating] ?? "Unknown"), 1)]),
					_: 1
				})
			])) : d("", !0)]),
			k.value ? (v(), u(ae, {
				key: 1,
				modelValue: A.value,
				"onUpdate:modelValue": [r[0] ||= (e) => A.value = e, Et],
				tabs: at,
				label: "Parental control sections"
			}, {
				schedules: w(() => [p("div", _e, [p("div", ve, [r[23] ||= p("p", { class: "parental-section__hint" }, [
					p("kbd", null, "c"),
					m(" create \xA0 "),
					p("kbd", null, "E"),
					m(" edit \xA0 "),
					p("kbd", null, "x"),
					m(" delete \xA0 "),
					p("kbd", null, "r"),
					m(" refresh ")
				], -1), h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: lt
				}, {
					default: w(() => [...r[22] ||= [m(" Create Schedule ", -1)]]),
					_: 1
				})]), st.value ? (v(), f("div", ye, [h(ie, {
					variant: "text",
					lines: 6
				})])) : M.value ? (v(), u(s, {
					key: 1,
					icon: "alert",
					title: "Couldn't load schedules",
					description: M.value
				}, {
					actions: w(() => [h(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: z
					}, {
						default: w(() => [...r[24] ||= [m("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : j.value.length === 0 ? (v(), u(s, {
					key: 2,
					icon: "calendar",
					title: "No access schedules",
					description: "Create schedules to limit when this profile can access content."
				})) : (v(), f("div", be, [(v(!0), f(c, null, b(j.value, (e, t) => (v(), f("div", {
					key: e.id,
					class: _(["parental-section__item", { "is-selected": t === N.value }]),
					onClick: (e) => N.value = t
				}, [p("div", Se, [p("span", Ce, x(e.name), 1), p("span", we, x(e.start_time.substring(0, 5)) + " – " + x(e.end_time.substring(0, 5)) + " \xA0·\xA0 " + x(ht(e.days_of_week)), 1)]), p("div", Te, [
					h(o, { tone: e.is_active ? "success" : "neutral" }, {
						default: w(() => [m(x(e.is_active ? "Active" : "Inactive"), 1)]),
						_: 2
					}, 1032, ["tone"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						onClick: T((t) => ut(e), ["stop"])
					}, {
						default: w(() => [...r[25] ||= [m("Edit", -1)]]),
						_: 1
					}, 8, ["onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						onClick: T((t) => Dt(e), ["stop"])
					}, {
						default: w(() => [...r[26] ||= [m("Delete", -1)]]),
						_: 1
					}, 8, ["onClick"])
				])], 10, xe))), 128))]))])]),
				tags: w(() => [p("div", Ee, [p("div", De, [r[28] ||= p("p", { class: "parental-section__hint" }, [
					p("kbd", null, "c"),
					m(" create \xA0 "),
					p("kbd", null, "x"),
					m(" delete \xA0 "),
					p("kbd", null, "r"),
					m(" refresh")
				], -1), h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: vt
				}, {
					default: w(() => [...r[27] ||= [m(" Add Tag ", -1)]]),
					_: 1
				})]), V.value ? (v(), f("div", Oe, [h(ie, {
					variant: "text",
					lines: 4
				})])) : H.value ? (v(), u(s, {
					key: 1,
					icon: "alert",
					title: "Couldn't load tags",
					description: H.value
				}, {
					actions: w(() => [h(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: J
					}, {
						default: w(() => [...r[29] ||= [m("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : B.value.length === 0 ? (v(), u(s, {
					key: 2,
					icon: "bookmark",
					title: "No tags",
					description: "Add tags to block or allow specific content categories."
				})) : (v(), f("div", ke, [(v(!0), f(c, null, b(B.value, (e, t) => (v(), f("div", {
					key: e.id,
					class: _(["parental-section__item", { "is-selected": t === U.value }]),
					onClick: (e) => U.value = t
				}, [p("div", je, [p("span", Me, x(e.tag), 1)]), p("div", Ne, [h(o, { tone: e.tag_type === "blocked" ? "error" : "success" }, {
					default: w(() => [m(x(e.tag_type), 1)]),
					_: 2
				}, 1032, ["tone"]), h(a, {
					variant: "ghost",
					size: "sm",
					onClick: T((t) => Ot(e), ["stop"])
				}, {
					default: w(() => [...r[30] ||= [m("Remove", -1)]]),
					_: 1
				}, 8, ["onClick"])])], 10, Ae))), 128))]))])]),
				streamLimits: w(() => [p("div", Pe, [p("div", Fe, [r[32] ||= p("p", { class: "parental-section__hint" }, [
					p("kbd", null, "u"),
					m(" update limits \xA0 "),
					p("kbd", null, "r"),
					m(" refresh")
				], -1), h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "settings",
					onClick: Ct
				}, {
					default: w(() => [...r[31] ||= [m(" Update Limits ", -1)]]),
					_: 1
				})]), xt.value ? (v(), f("div", Ie, [h(ie, {
					variant: "text",
					lines: 4
				})])) : X.value ? (v(), u(s, {
					key: 1,
					icon: "alert",
					title: "Couldn't load stream limits",
					description: X.value
				}, {
					actions: w(() => [h(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: St
					}, {
						default: w(() => [...r[33] ||= [m("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : (v(), u(ce, {
					key: 2,
					class: "parental-section__limits-card"
				}, {
					default: w(() => [p("div", Le, [r[34] ||= p("span", { class: "parental-section__limits-label" }, "Max concurrent streams", -1), p("span", Re, x(Y.value?.max_concurrent_streams ?? "Not set"), 1)]), p("div", ze, [r[35] ||= p("span", { class: "parental-section__limits-label" }, "Max total bandwidth (Kbps)", -1), p("span", Be, x(Y.value?.max_total_bandwidth_kbps ?? "Not set"), 1)])]),
					_: 1
				}))])]),
				_: 1
			}, 8, ["modelValue"])) : (v(), f("div", ge, [h(s, {
				icon: "user",
				title: "No profile selected",
				description: "Open this page with ?profile=<id> query parameter to manage that profile's parental controls."
			})])),
			h(n, {
				modelValue: P.value,
				"onUpdate:modelValue": r[6] ||= (e) => P.value = e,
				title: F.value ? "Edit Schedule" : "Create Schedule",
				size: "sm"
			}, {
				default: w(() => [p("form", {
					class: "parental-form",
					onSubmit: T(ft, ["prevent"])
				}, [
					L.value ? (v(), f("p", Ve, x(L.value), 1)) : d("", !0),
					h(D, {
						modelValue: I.value.name,
						"onUpdate:modelValue": r[1] ||= (e) => I.value.name = e,
						label: "Name",
						placeholder: "e.g. Weekday Evenings"
					}, null, 8, ["modelValue"]),
					p("div", He, [h(D, {
						modelValue: I.value.startTime,
						"onUpdate:modelValue": r[2] ||= (e) => I.value.startTime = e,
						label: "Start time (HH:MM)",
						placeholder: "08:00"
					}, null, 8, ["modelValue"]), h(D, {
						modelValue: I.value.endTime,
						"onUpdate:modelValue": r[3] ||= (e) => I.value.endTime = e,
						label: "End time (HH:MM)",
						placeholder: "22:00"
					}, null, 8, ["modelValue"])]),
					p("div", Ue, [r[36] ||= p("label", { class: "parental-form__label" }, "Days", -1), p("div", We, [(v(), f(c, null, b(ot, (e) => h(a, {
						key: e,
						size: "sm",
						variant: I.value.daysOfWeek.includes(e) ? "solid" : "ghost",
						onClick: (t) => mt(e)
					}, {
						default: w(() => [m(x(e.charAt(0).toUpperCase() + e.slice(1, 3)), 1)]),
						_: 2
					}, 1032, ["variant", "onClick"])), 64))])]),
					h(ne, {
						modelValue: I.value.isActive,
						"onUpdate:modelValue": r[4] ||= (e) => I.value.isActive = e,
						label: "Active"
					}, null, 8, ["modelValue"]),
					p("div", Ge, [h(a, {
						variant: "ghost",
						type: "button",
						onClick: r[5] ||= (e) => P.value = !1
					}, {
						default: w(() => [...r[37] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(a, {
						variant: "solid",
						type: "submit"
					}, {
						default: w(() => [m(x(F.value ? "Update" : "Create"), 1)]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(n, {
				modelValue: W.value,
				"onUpdate:modelValue": r[10] ||= (e) => W.value = e,
				title: "Add Tag",
				size: "sm"
			}, {
				default: w(() => [p("form", {
					class: "parental-form",
					onSubmit: T(yt, ["prevent"])
				}, [
					K.value ? (v(), f("p", Ke, x(K.value), 1)) : d("", !0),
					h(D, {
						modelValue: G.value.tag,
						"onUpdate:modelValue": r[7] ||= (e) => G.value.tag = e,
						label: "Tag name",
						placeholder: "e.g. kids, restricted, work"
					}, null, 8, ["modelValue"]),
					h(re, {
						modelValue: G.value.tagType,
						"onUpdate:modelValue": r[8] ||= (e) => G.value.tagType = e,
						label: "Tag type",
						options: gt
					}, null, 8, ["modelValue"]),
					p("div", qe, [h(a, {
						variant: "ghost",
						type: "button",
						onClick: r[9] ||= (e) => W.value = !1
					}, {
						default: w(() => [...r[38] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(a, {
						variant: "solid",
						type: "submit"
					}, {
						default: w(() => [...r[39] ||= [m("Add Tag", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(n, {
				modelValue: Z.value,
				"onUpdate:modelValue": r[14] ||= (e) => Z.value = e,
				title: "Update Stream Limits",
				size: "sm"
			}, {
				default: w(() => [p("form", {
					class: "parental-form",
					onSubmit: T(wt, ["prevent"])
				}, [
					$.value ? (v(), f("p", Je, x($.value), 1)) : d("", !0),
					h(D, {
						modelValue: Q.value.maxConcurrentStreams,
						"onUpdate:modelValue": r[11] ||= (e) => Q.value.maxConcurrentStreams = e,
						modelModifiers: { number: !0 },
						label: "Max concurrent streams",
						type: "number",
						min: "1"
					}, null, 8, ["modelValue"]),
					h(D, {
						modelValue: Q.value.maxTotalBandwidthKbps,
						"onUpdate:modelValue": r[12] ||= (e) => Q.value.maxTotalBandwidthKbps = e,
						label: "Max total bandwidth (Kbps, optional)",
						type: "number",
						min: "0",
						placeholder: "Leave empty for no limit"
					}, null, 8, ["modelValue"]),
					p("div", Ye, [h(a, {
						variant: "ghost",
						type: "button",
						onClick: r[13] ||= (e) => Z.value = !1
					}, {
						default: w(() => [...r[40] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(a, {
						variant: "solid",
						type: "submit"
					}, {
						default: w(() => [...r[41] ||= [m("Update", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(n, {
				modelValue: ct.value,
				"onUpdate:modelValue": r[17] ||= (e) => ct.value = e,
				title: "Delete Schedule",
				size: "sm"
			}, {
				default: w(() => [R.value ? (v(), f("p", Xe, [
					r[42] ||= m(" Delete schedule ", -1),
					p("strong", null, x(R.value.name), 1),
					r[43] ||= m("? ", -1)
				])) : d("", !0), p("div", Ze, [h(a, {
					variant: "ghost",
					onClick: r[15] ||= (e) => R.value = null
				}, {
					default: w(() => [...r[44] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					tone: "error",
					onClick: r[16] ||= (e) => R.value && pt(R.value)
				}, {
					default: w(() => [...r[45] ||= [m(" Delete ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"]),
			h(n, {
				modelValue: _t.value,
				"onUpdate:modelValue": r[20] ||= (e) => _t.value = e,
				title: "Remove Tag",
				size: "sm"
			}, {
				default: w(() => [q.value ? (v(), f("p", Qe, [
					r[46] ||= m(" Remove tag ", -1),
					p("strong", null, x(q.value.tag), 1),
					r[47] ||= m("? ", -1)
				])) : d("", !0), p("div", $e, [h(a, {
					variant: "ghost",
					onClick: r[18] ||= (e) => q.value = null
				}, {
					default: w(() => [...r[48] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					tone: "error",
					onClick: r[19] ||= (e) => q.value && bt(q.value)
				}, {
					default: w(() => [...r[49] ||= [m(" Remove ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-bcfbae68"]]);
//#endregion
export { et as default };

//# sourceMappingURL=ParentalControlsPage-DjyhXWc1.js.map