import { T as e, t } from "./client-Bmlfq3Uy.js";
import { a as n, t as ee } from "./users-BOaYe835.js";
import { t as te } from "./useToastStore-CxO_ppM8.js";
import { t as ne } from "./useMessages-B96K7XS0.js";
import { t as re } from "./Tabs-DZRiZml3.js";
import { t as r } from "./Button-Dfl4y6vO.js";
import { t as i } from "./Modal-D8C63a_X.js";
import { t as ie } from "./Select-CtieJ2Ym.js";
import { t as a } from "./Input-DUSkplC0.js";
import { t as ae } from "./Switch-C607L4Vu.js";
import { t as o } from "./Badge-D7vacFbh.js";
import { t as s } from "./Skeleton-DDhrDRE7.js";
import { t as c } from "./EmptyState-DjfWh3kt.js";
import { t as oe } from "./Card-DRKUpszT.js";
import { n as se, t as ce } from "./Icon-55iG1rR7.js";
import { Fragment as le, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as ue, inject as de, normalizeClass as fe, onMounted as pe, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, withCtx as x, withModifiers as S } from "vue";
import { useRoute as me } from "vue-router";
// src/pages/ParentalControlsPage.vue?vue&type=script&setup=true&lang.ts
var he = { class: "parental-page" }, ge = { class: "parental-page__head" }, _e = { class: "parental-page__title" }, ve = {
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
}, Ve = { class: "parental-section__limits-row" }, He = { class: "parental-section__limits-label" }, Ue = { class: "parental-section__limits-value" }, We = { class: "parental-section__limits-row" }, Ge = { class: "parental-section__limits-label" }, Ke = { class: "parental-section__limits-value" }, qe = {
	key: 0,
	class: "parental-form__error"
}, Je = { class: "parental-form__row" }, Ye = { class: "parental-form__days" }, Xe = { class: "parental-form__label" }, Ze = { class: "parental-form__day-buttons" }, Qe = { class: "parental-form__actions" }, $e = {
	key: 0,
	class: "parental-form__error"
}, et = { class: "parental-form__actions" }, tt = {
	key: 0,
	class: "parental-form__error"
}, nt = { class: "parental-form__actions" }, rt = { key: 0 }, it = { class: "parental-form__actions" }, at = { key: 0 }, ot = { class: "parental-form__actions" }, C = /*#__PURE__*/ se(/* @__PURE__ */ ue({
	__name: "ParentalControlsPage",
	props: { client: {} },
	setup(se) {
		let ue = me(), C = te(), { t: w } = ne(), st = se, ct = de("apiBase", ""), lt = l(() => typeof ct == "string" ? ct : ct?.value ?? ""), T = new ee(st.client ?? new t({ baseUrl: lt.value })), E = _([]), D = _(null), O = _(!0), k = _(null), ut = l(() => E.value.find((e) => String(e.id) === String(D.value)) ?? null);
		async function dt() {
			let t = D.value;
			if (!t) E.value = [], k.value = null, O.value = !1;
			else {
				O.value = !0, k.value = null;
				try {
					E.value = [await T.getProfile(t)];
				} catch (t) {
					E.value = [], k.value = e(t, w("parental.profileLoadError"));
				} finally {
					O.value = !1;
				}
			}
		}
		pe(() => {
			let e = ue.query.profile;
			typeof e == "string" && e.trim() !== "" && (D.value = e.trim()), dt(), D.value && Nt(A.value);
		});
		let ft = [
			{
				value: "schedules",
				label: w("parental.schedules"),
				icon: "calendar"
			},
			{
				value: "tags",
				label: w("parental.tags"),
				icon: "bookmark"
			},
			{
				value: "streamLimits",
				label: w("parental.streamLimits"),
				icon: "play"
			}
		], A = _("schedules"), pt = [
			"mon",
			"tue",
			"wed",
			"thu",
			"fri",
			"sat",
			"sun"
		], j = _([]), M = _(!1), N = _(null), P = _(0), F = _(!1), I = _(null), L = _({
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
		}), R = _(null), z = _(null), mt = l({
			get: () => z.value !== null,
			set: (e) => {
				e || (z.value = null);
			}
		});
		async function B() {
			if (D.value) {
				M.value = !0, N.value = null;
				try {
					j.value = await T.profileSchedules(D.value), P.value = Math.min(P.value, j.value.length - 1);
				} catch (t) {
					N.value = e(t, w("parental.loadErrorSchedules"));
				} finally {
					M.value = !1;
				}
			}
		}
		function ht() {
			I.value = null, L.value = {
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
			}, R.value = null, F.value = !0;
		}
		function gt(e) {
			I.value = e, L.value = {
				name: e.name,
				startTime: e.start_time.substring(0, 5),
				endTime: e.end_time.substring(0, 5),
				daysOfWeek: [...e.days_of_week],
				isActive: e.is_active
			}, R.value = null, F.value = !0;
		}
		function _t() {
			return L.value.name.trim() ? L.value.name.length > 100 ? "Name must be 100 characters or less." : /^\d{1,2}:\d{2}(:\d{2})?$/.test(L.value.startTime) ? /^\d{1,2}:\d{2}(:\d{2})?$/.test(L.value.endTime) ? L.value.daysOfWeek.length === 0 ? "At least one day is required." : null : "Invalid end time. Use HH:MM or HH:MM:SS." : "Invalid start time. Use HH:MM or HH:MM:SS." : "Name is required.";
		}
		async function vt() {
			if (!D.value) return;
			let t = _t();
			if (t) R.value = t;
			else try {
				I.value ? await T.updateProfileSchedule(D.value, I.value.id, L.value.name.trim(), L.value.startTime + ":00", L.value.endTime + ":00", L.value.daysOfWeek, L.value.isActive) : await T.createProfileSchedule(D.value, L.value.name.trim(), L.value.startTime + ":00", L.value.endTime + ":00", L.value.daysOfWeek, L.value.isActive), C.success(I.value ? w("parental.scheduleUpdated") : w("parental.scheduleCreated")), F.value = !1, await B();
			} catch (t) {
				R.value = e(t, w("parental.scheduleSaveError"));
			}
		}
		async function yt(t) {
			if (D.value) try {
				await T.deleteProfileSchedule(D.value, t.id), C.success(w("parental.scheduleDeleted")), z.value = null, await B();
			} catch (t) {
				C.error(e(t, w("parental.scheduleDeleteError"))), z.value = null;
			}
		}
		function bt(e) {
			let t = L.value.daysOfWeek.indexOf(e);
			t === -1 ? L.value.daysOfWeek.push(e) : L.value.daysOfWeek.splice(t, 1);
		}
		function xt(e) {
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
		let St = [{
			value: "blocked",
			label: w("parental.tagBlocked")
		}, {
			value: "allowed",
			label: w("parental.tagAllowed")
		}], V = _([]), Ct = _(!1), H = _(null), U = _(0), W = _(!1), G = _({
			tag: "",
			tagType: "blocked"
		}), K = _(null), q = _(null), wt = l({
			get: () => q.value !== null,
			set: (e) => {
				e || (q.value = null);
			}
		});
		async function J() {
			if (D.value) {
				Ct.value = !0, H.value = null;
				try {
					V.value = await T.profileTags(D.value), U.value = Math.min(U.value, V.value.length - 1);
				} catch (t) {
					H.value = e(t, w("parental.loadErrorTags"));
				} finally {
					Ct.value = !1;
				}
			}
		}
		function Tt() {
			G.value = {
				tag: "",
				tagType: "blocked"
			}, K.value = null, W.value = !0;
		}
		async function Et() {
			if (!D.value) return;
			let t = G.value.tag.trim();
			if (!t) K.value = "Tag name is required.";
			else if (t.length > 100) K.value = "Tag must be 100 characters or less.";
			else try {
				await T.addProfileTag(D.value, t, G.value.tagType), C.success(w("parental.tagAdded")), W.value = !1, await J();
			} catch (t) {
				K.value = e(t, w("parental.tagAddError"));
			}
		}
		async function Dt(t) {
			if (D.value) try {
				await T.deleteProfileTag(D.value, t.id), C.success(w("parental.tagRemoved")), q.value = null, await J();
			} catch (t) {
				C.error(e(t, w("parental.tagRemoveError"))), q.value = null;
			}
		}
		let Y = _(null), Ot = _(!1), X = _(null), Z = _(!1), Q = _({
			maxConcurrentStreams: 1,
			maxTotalBandwidthKbps: ""
		}), $ = _(null);
		function kt(e, t) {
			let n = typeof e == "number" ? e : parseInt(e.trim(), 10);
			return !Number.isFinite(n) || n < t ? null : Math.trunc(n);
		}
		async function At() {
			if (D.value) {
				Ot.value = !0, X.value = null;
				try {
					Y.value = await T.profileStreamLimits(D.value);
				} catch (t) {
					X.value = e(t, w("parental.loadErrorStreamLimits"));
				} finally {
					Ot.value = !1;
				}
			}
		}
		function jt() {
			Q.value = {
				maxConcurrentStreams: Y.value?.max_concurrent_streams ?? 1,
				maxTotalBandwidthKbps: Y.value?.max_total_bandwidth_kbps?.toString() ?? ""
			}, $.value = null, Z.value = !0;
		}
		async function Mt() {
			if (D.value) try {
				let e = kt(Q.value.maxConcurrentStreams, 1);
				if (e === null) {
					$.value = "Max concurrent streams must be at least 1.";
					return;
				}
				let t = kt(Q.value.maxTotalBandwidthKbps, 1);
				await T.updateProfileStreamLimits(D.value, e, t), C.success(w("parental.streamLimitsUpdated")), Z.value = !1, await At();
			} catch (t) {
				$.value = e(t, w("parental.streamLimitsSaveError"));
			}
		}
		async function Nt(e) {
			switch (e) {
				case "schedules":
					await B();
					break;
				case "tags":
					await J();
					break;
				case "streamLimits": await At();
			}
		}
		function Pt(e) {
			A.value = e, Nt(e);
		}
		function Ft(e) {
			z.value = e;
		}
		function It(e) {
			q.value = e;
		}
		return (e, t) => (g(), f("div", he, [
			p("header", ge, [p("div", null, [t[21] ||= p("p", { class: "parental-page__eyebrow" }, "Profile Controls", -1), p("h1", _e, y(b(w)("parental.title")), 1)]), ut.value ? (g(), f("div", ve, [
				h(ce, {
					name: "user",
					size: "sm"
				}),
				m(" " + y(ut.value.name) + " ", 1),
				h(o, { tone: "neutral" }, {
					default: x(() => [m(y(b(n)[ut.value.rating] ?? "Unknown"), 1)]),
					_: 1
				})
			])) : D.value && !O.value ? (g(), f("div", ye, [
				h(ce, {
					name: "alert",
					size: "sm"
				}),
				m(" Unidentified profile #" + y(D.value) + " ", 1),
				h(o, { tone: "error" }, {
					default: x(() => [m(y(k.value ?? "Not found"), 1)]),
					_: 1
				})
			])) : d("", !0)]),
			D.value ? (g(), u(re, {
				key: 1,
				modelValue: A.value,
				"onUpdate:modelValue": [t[0] ||= (e) => A.value = e, Pt],
				tabs: ft,
				label: "Parental control sections"
			}, {
				schedules: x(() => [p("div", xe, [p("div", Se, [t[22] ||= p("p", { class: "parental-section__hint" }, [
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
					onClick: ht
				}, {
					default: x(() => [m(y(b(w)("parental.createSchedule")), 1)]),
					_: 1
				})]), M.value ? (g(), f("div", Ce, [h(s, {
					variant: "text",
					lines: 6
				})])) : N.value ? (g(), u(c, {
					key: 1,
					icon: "alert",
					title: b(w)("parental.loadErrorSchedulesTitle"),
					description: N.value
				}, {
					actions: x(() => [h(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: B
					}, {
						default: x(() => [m(y(b(w)("parental.retry")), 1)]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : j.value.length === 0 ? (g(), u(c, {
					key: 2,
					icon: "calendar",
					title: b(w)("parental.noSchedules"),
					description: b(w)("parental.noSchedulesHint")
				}, null, 8, ["title", "description"])) : (g(), f("div", we, [(g(!0), f(le, null, v(j.value, (e, n) => (g(), f("div", {
					key: e.id,
					class: fe(["parental-section__item", { "is-selected": n === P.value }]),
					onClick: (e) => P.value = n
				}, [p("div", Ee, [p("span", De, y(e.name), 1), p("span", Oe, y(e.start_time.substring(0, 5)) + " – " + y(e.end_time.substring(0, 5)) + " \xA0·\xA0 " + y(xt(e.days_of_week)), 1)]), p("div", ke, [
					h(o, { tone: e.is_active ? "success" : "neutral" }, {
						default: x(() => [m(y(e.is_active ? b(w)("parental.active") : b(w)("parental.inactive")), 1)]),
						_: 2
					}, 1032, ["tone"]),
					h(r, {
						variant: "ghost",
						size: "sm",
						onClick: S((t) => gt(e), ["stop"])
					}, {
						default: x(() => [...t[23] ||= [m("Edit", -1)]]),
						_: 1
					}, 8, ["onClick"]),
					h(r, {
						variant: "ghost",
						size: "sm",
						onClick: S((t) => Ft(e), ["stop"])
					}, {
						default: x(() => [...t[24] ||= [m("Delete", -1)]]),
						_: 1
					}, 8, ["onClick"])
				])], 10, Te))), 128))]))])]),
				tags: x(() => [p("div", Ae, [p("div", je, [t[25] ||= p("p", { class: "parental-section__hint" }, [
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
					onClick: Tt
				}, {
					default: x(() => [m(y(b(w)("parental.addTag")), 1)]),
					_: 1
				})]), Ct.value ? (g(), f("div", Me, [h(s, {
					variant: "text",
					lines: 4
				})])) : H.value ? (g(), u(c, {
					key: 1,
					icon: "alert",
					title: b(w)("parental.loadErrorTagsTitle"),
					description: H.value
				}, {
					actions: x(() => [h(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: J
					}, {
						default: x(() => [m(y(b(w)("parental.retry")), 1)]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : V.value.length === 0 ? (g(), u(c, {
					key: 2,
					icon: "bookmark",
					title: b(w)("parental.noTags"),
					description: b(w)("parental.noTagsHint")
				}, null, 8, ["title", "description"])) : (g(), f("div", Ne, [(g(!0), f(le, null, v(V.value, (e, n) => (g(), f("div", {
					key: e.id,
					class: fe(["parental-section__item", { "is-selected": n === U.value }]),
					onClick: (e) => U.value = n
				}, [p("div", Fe, [p("span", Ie, y(e.tag), 1)]), p("div", Le, [h(o, { tone: e.tag_type === "blocked" ? "error" : "success" }, {
					default: x(() => [m(y(e.tag_type), 1)]),
					_: 2
				}, 1032, ["tone"]), h(r, {
					variant: "ghost",
					size: "sm",
					onClick: S((t) => It(e), ["stop"])
				}, {
					default: x(() => [...t[26] ||= [m("Remove", -1)]]),
					_: 1
				}, 8, ["onClick"])])], 10, Pe))), 128))]))])]),
				streamLimits: x(() => [p("div", Re, [p("div", ze, [t[27] ||= p("p", { class: "parental-section__hint" }, [
					p("kbd", null, "u"),
					m(" update limits \xA0 "),
					p("kbd", null, "r"),
					m(" refresh")
				], -1), h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "settings",
					onClick: jt
				}, {
					default: x(() => [m(y(b(w)("parental.updateLimits")), 1)]),
					_: 1
				})]), Ot.value ? (g(), f("div", Be, [h(s, {
					variant: "text",
					lines: 4
				})])) : X.value ? (g(), u(c, {
					key: 1,
					icon: "alert",
					title: b(w)("parental.loadErrorStreamLimitsTitle"),
					description: X.value
				}, {
					actions: x(() => [h(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						onClick: At
					}, {
						default: x(() => [m(y(b(w)("parental.retry")), 1)]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : (g(), u(oe, {
					key: 2,
					class: "parental-section__limits-card"
				}, {
					default: x(() => [p("div", Ve, [p("span", He, y(b(w)("parental.maxConcurrentStreams")), 1), p("span", Ue, y(Y.value?.max_concurrent_streams ?? "Not set"), 1)]), p("div", We, [p("span", Ge, y(b(w)("parental.maxBandwidth")), 1), p("span", Ke, y(Y.value?.max_total_bandwidth_kbps ?? "Not set"), 1)])]),
					_: 1
				}))])]),
				_: 1
			}, 8, ["modelValue"])) : (g(), f("div", be, [h(c, {
				icon: "user",
				title: b(w)("parental.noProfileSelected"),
				description: b(w)("parental.noProfileSelectedHint")
			}, null, 8, ["title", "description"])])),
			h(i, {
				modelValue: F.value,
				"onUpdate:modelValue": t[6] ||= (e) => F.value = e,
				title: I.value ? b(w)("parental.editSchedule") : b(w)("parental.createSchedule"),
				size: "sm"
			}, {
				default: x(() => [p("form", {
					class: "parental-form",
					onSubmit: S(vt, ["prevent"])
				}, [
					R.value ? (g(), f("p", qe, y(R.value), 1)) : d("", !0),
					h(a, {
						modelValue: L.value.name,
						"onUpdate:modelValue": t[1] ||= (e) => L.value.name = e,
						label: b(w)("parental.scheduleName"),
						placeholder: b(w)("parental.scheduleNamePlaceholder")
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder"
					]),
					p("div", Je, [h(a, {
						modelValue: L.value.startTime,
						"onUpdate:modelValue": t[2] ||= (e) => L.value.startTime = e,
						label: b(w)("parental.startTime"),
						placeholder: "08:00"
					}, null, 8, ["modelValue", "label"]), h(a, {
						modelValue: L.value.endTime,
						"onUpdate:modelValue": t[3] ||= (e) => L.value.endTime = e,
						label: b(w)("parental.endTime"),
						placeholder: "22:00"
					}, null, 8, ["modelValue", "label"])]),
					p("div", Ye, [p("label", Xe, y(b(w)("parental.days")), 1), p("div", Ze, [(g(), f(le, null, v(pt, (e) => h(r, {
						key: e,
						size: "sm",
						variant: L.value.daysOfWeek.includes(e) ? "solid" : "ghost",
						onClick: (t) => bt(e)
					}, {
						default: x(() => [m(y(e.charAt(0).toUpperCase() + e.slice(1, 3)), 1)]),
						_: 2
					}, 1032, ["variant", "onClick"])), 64))])]),
					h(ae, {
						modelValue: L.value.isActive,
						"onUpdate:modelValue": t[4] ||= (e) => L.value.isActive = e,
						label: b(w)("parental.active")
					}, null, 8, ["modelValue", "label"]),
					p("div", Qe, [h(r, {
						variant: "ghost",
						type: "button",
						onClick: t[5] ||= (e) => F.value = !1
					}, {
						default: x(() => [...t[28] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(r, {
						variant: "solid",
						type: "submit"
					}, {
						default: x(() => [m(y(I.value ? "Update" : "Create"), 1)]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(i, {
				modelValue: W.value,
				"onUpdate:modelValue": t[10] ||= (e) => W.value = e,
				title: b(w)("parental.addTag"),
				size: "sm"
			}, {
				default: x(() => [p("form", {
					class: "parental-form",
					onSubmit: S(Et, ["prevent"])
				}, [
					K.value ? (g(), f("p", $e, y(K.value), 1)) : d("", !0),
					h(a, {
						modelValue: G.value.tag,
						"onUpdate:modelValue": t[7] ||= (e) => G.value.tag = e,
						label: b(w)("parental.tagName"),
						placeholder: b(w)("parental.tagNamePlaceholder")
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder"
					]),
					h(ie, {
						modelValue: G.value.tagType,
						"onUpdate:modelValue": t[8] ||= (e) => G.value.tagType = e,
						label: b(w)("parental.tagType"),
						options: St
					}, null, 8, ["modelValue", "label"]),
					p("div", et, [h(r, {
						variant: "ghost",
						type: "button",
						onClick: t[9] ||= (e) => W.value = !1
					}, {
						default: x(() => [...t[29] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(r, {
						variant: "solid",
						type: "submit"
					}, {
						default: x(() => [m(y(b(w)("parental.addTag")), 1)]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(i, {
				modelValue: Z.value,
				"onUpdate:modelValue": t[14] ||= (e) => Z.value = e,
				title: "Update stream limits",
				size: "sm"
			}, {
				default: x(() => [p("form", {
					class: "parental-form",
					onSubmit: S(Mt, ["prevent"])
				}, [
					$.value ? (g(), f("p", tt, y($.value), 1)) : d("", !0),
					h(a, {
						modelValue: Q.value.maxConcurrentStreams,
						"onUpdate:modelValue": t[11] ||= (e) => Q.value.maxConcurrentStreams = e,
						modelModifiers: { number: !0 },
						label: b(w)("parental.maxConcurrentStreams"),
						type: "number",
						min: "1"
					}, null, 8, ["modelValue", "label"]),
					h(a, {
						modelValue: Q.value.maxTotalBandwidthKbps,
						"onUpdate:modelValue": t[12] ||= (e) => Q.value.maxTotalBandwidthKbps = e,
						label: b(w)("parental.maxBandwidth"),
						type: "number",
						min: "0",
						placeholder: b(w)("parental.maxBandwidthPlaceholder")
					}, null, 8, [
						"modelValue",
						"label",
						"placeholder"
					]),
					p("div", nt, [h(r, {
						variant: "ghost",
						type: "button",
						onClick: t[13] ||= (e) => Z.value = !1
					}, {
						default: x(() => [...t[30] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(r, {
						variant: "solid",
						type: "submit"
					}, {
						default: x(() => [...t[31] ||= [m("Update", -1)]]),
						_: 1
					})])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(i, {
				modelValue: mt.value,
				"onUpdate:modelValue": t[17] ||= (e) => mt.value = e,
				title: "Delete schedule",
				size: "sm"
			}, {
				default: x(() => [z.value ? (g(), f("p", rt, y(b(w)("parental.deleteScheduleConfirm", { name: z.value.name })), 1)) : d("", !0), p("div", it, [h(r, {
					variant: "ghost",
					onClick: t[15] ||= (e) => z.value = null
				}, {
					default: x(() => [...t[32] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "danger",
					onClick: t[16] ||= (e) => z.value && yt(z.value)
				}, {
					default: x(() => [...t[33] ||= [m(" Delete ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"]),
			h(i, {
				modelValue: wt.value,
				"onUpdate:modelValue": t[20] ||= (e) => wt.value = e,
				title: "Remove tag",
				size: "sm"
			}, {
				default: x(() => [q.value ? (g(), f("p", at, y(b(w)("parental.removeTagConfirm", { tag: q.value.tag })), 1)) : d("", !0), p("div", ot, [h(r, {
					variant: "ghost",
					onClick: t[18] ||= (e) => q.value = null
				}, {
					default: x(() => [...t[34] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "danger",
					onClick: t[19] ||= (e) => q.value && Dt(q.value)
				}, {
					default: x(() => [...t[35] ||= [m(" Remove ", -1)]]),
					_: 1
				})])]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-514282d5"]]);
export { C as default };

//# sourceMappingURL=ParentalControlsPage-Lj7YvNbF.js.map