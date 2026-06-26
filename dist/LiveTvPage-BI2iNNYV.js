import { n as e, t } from "./Icon-ax5k7_G2.js";
import { l as n, n as r, p as i, t as a } from "./Button-MsRePfWv.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./Switch-CFZhdkXR.js";
import { n as te } from "./listbox-htyKA_G5.js";
import { t as ne } from "./Select-DLwgQInL.js";
import { t as s } from "./Modal-I4tEFhoH.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { t as ie } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { t as ae } from "./liveTv-Dbjt901v.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as oe, inject as se, normalizeClass as ce, onMounted as le, openBlock as _, reactive as ue, ref as v, renderList as y, toDisplayString as b, vModelText as x, watch as de, withCtx as S, withDirectives as C, withKeys as fe, withModifiers as pe } from "vue";
//#region src/pages/admin/LiveTvPage.vue?vue&type=script&setup=true&lang.ts
var me = {
	class: "admin-livetv",
	"aria-labelledby": "livetv-heading"
}, he = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-tuners-heading"
}, ge = ["aria-expanded"], _e = { class: "admin-livetv__section-title-row" }, ve = { class: "admin-livetv__section-summary" }, ye = {
	key: 0,
	id: "livetv-tuners-body",
	class: "admin-livetv__section-body"
}, be = { class: "admin-livetv__toolbar" }, xe = {
	key: 0,
	class: "admin-livetv__skel"
}, Se = {
	key: 3,
	class: "admin-livetv__card-grid"
}, Ce = { class: "admin-livetv__card-head" }, we = { class: "admin-livetv__card-title-row" }, Te = { class: "admin-livetv__card-name" }, Ee = { class: "admin-livetv__dl" }, De = { class: "admin-livetv__card-actions" }, Oe = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-guide-heading"
}, ke = ["aria-expanded"], Ae = { class: "admin-livetv__section-title-row" }, je = { class: "admin-livetv__section-summary" }, Me = {
	key: 0,
	id: "livetv-guide-body",
	class: "admin-livetv__section-body"
}, Ne = { class: "admin-livetv__toolbar" }, Pe = {
	class: "admin-livetv__segmented",
	role: "group",
	"aria-label": "Guide date"
}, Fe = ["aria-pressed", "onClick"], Ie = {
	key: 0,
	class: "admin-livetv__skel"
}, Le = {
	key: 3,
	class: "admin-livetv__guide-grid"
}, Re = [
	"aria-pressed",
	"aria-label",
	"onClick",
	"onKeydown"
], ze = { class: "admin-livetv__program-time" }, Be = { class: "admin-livetv__program-title" }, Ve = {
	key: 0,
	class: "admin-livetv__program-desc"
}, He = {
	key: 1,
	class: "admin-livetv__program-expanded"
}, Ue = {
	key: 0,
	class: "admin-livetv__program-full-desc"
}, We = { class: "admin-livetv__program-meta" }, Ge = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-recordings-heading"
}, Ke = ["aria-expanded"], qe = { class: "admin-livetv__section-title-row" }, Je = { class: "admin-livetv__section-summary" }, Ye = {
	key: 0,
	id: "livetv-recordings-body",
	class: "admin-livetv__section-body"
}, Xe = { class: "admin-livetv__toolbar" }, Ze = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"onClick"
], Qe = ["id", "aria-labelledby"], $e = {
	key: 0,
	class: "admin-livetv__skel"
}, et = {
	key: 3,
	class: "admin-livetv__rec-list"
}, tt = { class: "admin-livetv__card-head" }, nt = { class: "admin-livetv__card-name" }, rt = { class: "admin-livetv__rec-meta" }, it = { key: 0 }, at = { class: "admin-livetv__card-actions" }, ot = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-rules-heading"
}, st = ["aria-expanded"], ct = { class: "admin-livetv__section-title-row" }, lt = { class: "admin-livetv__section-summary" }, ut = {
	key: 0,
	id: "livetv-rules-body",
	class: "admin-livetv__section-body"
}, dt = { class: "admin-livetv__toolbar" }, ft = {
	key: 0,
	class: "admin-livetv__skel"
}, pt = {
	key: 3,
	class: "admin-livetv__rule-list"
}, mt = { class: "admin-livetv__rule-info" }, ht = { class: "admin-livetv__rule-title" }, gt = { class: "admin-livetv__rule-meta" }, _t = { class: "admin-livetv__field" }, vt = { class: "admin-livetv__field" }, yt = { class: "admin-livetv__field-row" }, bt = { class: "admin-livetv__field" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field-row" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = { class: "admin-livetv__field" }, Dt = { class: "admin-livetv__field" }, Ot = ["value"], kt = { class: "admin-livetv__field" }, w = /*#__PURE__*/ e(/* @__PURE__ */ oe({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(e) {
		let oe = e, w = se("apiBase", ""), At = u(() => typeof w == "string" ? w : w?.value ?? ""), T = new ae(oe.client ?? new r({
			baseUrl: At.value,
			tokenStore: new n()
		})), E = re();
		function jt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), i = n % 60;
			return i > 0 ? `${r}h ${i}m` : `${r}h`;
		}
		function Mt(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function D(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function Nt(e) {
			return `${(e / 1024 / 1024).toFixed(1)} MB`;
		}
		function Pt(e, t) {
			return `S${String(e ?? 0).padStart(2, "0")}E${String(t ?? 0).padStart(2, "0")}`;
		}
		let O = ue({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function k(e) {
			O[e] = !O[e];
		}
		let A = v([]);
		async function Ft() {
			try {
				A.value = await T.listChannels();
			} catch {}
		}
		let It = u(() => A.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Lt(e) {
			let t = A.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let j = v([]), Rt = v(!1), zt = v(!1), Bt = v(!1), Vt = ue({}), M = v(null);
		async function Ht() {
			Rt.value = !0, M.value = null;
			try {
				j.value = await T.listTuners(), zt.value = !0;
			} catch (e) {
				M.value = i(e, "Failed to load tuners."), E.error(M.value);
			} finally {
				Rt.value = !1;
			}
		}
		async function Ut() {
			if (!Bt.value) {
				Bt.value = !0;
				try {
					let e = await T.scanTuners();
					j.value = e, zt.value = !0, E.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					E.error(i(e, "Tuner scan failed."));
				} finally {
					Bt.value = !1;
				}
			}
		}
		async function Wt(e) {
			if (!Vt[e.tuner_id]) {
				Vt[e.tuner_id] = !0;
				try {
					let t = await T.updateTuner(e.tuner_id, { enabled: !e.enabled });
					j.value = j.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					E.error(i(e, "Failed to update tuner."));
				} finally {
					Vt[e.tuner_id] = !1;
				}
			}
		}
		let N = v(null);
		async function Gt() {
			let e = N.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), j.value = j.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), N.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete tuner.")), N.value = null;
			}
		}
		let Kt = u(() => Rt.value ? "Loading…" : j.value.length === 0 ? "No tuners found" : `${j.value.length} tuner${j.value.length === 1 ? "" : "s"} configured`), P = v([]), qt = v(!1), Jt = v(!1), F = v(0), I = v(null), Yt = v(!1), Xt = [
			"Today",
			"+1 Day",
			"+2 Days"
		], L = v(null);
		async function Zt(e) {
			qt.value = !0, L.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				P.value = await T.listGuide({
					from: t,
					to: n
				}), Jt.value = !0;
			} catch (e) {
				L.value = i(e, "Failed to load guide."), E.error(L.value);
			} finally {
				qt.value = !1;
			}
		}
		function Qt(e) {
			F.value = e, Zt(e);
		}
		function $t(e) {
			I.value = I.value === e.id ? null : e.id;
		}
		async function en() {
			if (!Yt.value) {
				Yt.value = !0;
				try {
					let e = await T.refreshGuide();
					E.success(`Guide refreshed. ${e} programmes imported.`), await Zt(F.value);
				} catch (e) {
					E.error(i(e, "Guide refresh failed."));
				} finally {
					Yt.value = !1;
				}
			}
		}
		let tn = u(() => qt.value ? "Loading…" : P.value.length > 0 ? `${P.value.length} programmes` : "No programmes"), R = v([]), nn = v(!1), rn = v(!1), z = v("all"), an = [
			{
				value: "all",
				label: "All Recordings"
			},
			{
				value: "upcoming",
				label: "Upcoming"
			},
			{
				value: "by-series",
				label: "By Series"
			}
		], on = v(null);
		function sn(e) {
			on.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function cn(e) {
			let t = an.map((e) => ({
				value: e.value,
				label: e.label
			})), n = an.findIndex((e) => e.value === z.value), r = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					r = te(t, n, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					r = te(t, n, -1);
					break;
				case "Home":
					r = te(t, -1, 1);
					break;
				case "End":
					r = te(t, 0, -1);
					break;
				default: return;
			}
			r >= 0 && (e.preventDefault(), z.value = an[r].value, sn(r));
		}
		let B = v(null);
		async function ln() {
			nn.value = !0, B.value = null;
			try {
				R.value = await T.listRecordings(), rn.value = !0;
			} catch (e) {
				B.value = i(e, "Failed to load recordings."), E.error(B.value);
			} finally {
				nn.value = !1;
			}
		}
		let V = v(null);
		async function un() {
			let e = V.value;
			if (e) try {
				await T.deleteRecording(e.id), R.value = R.value.filter((t) => t.id !== e.id), E.success("Recording deleted."), V.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete recording.")), V.value = null;
			}
		}
		function dn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let fn = u(() => nn.value ? "Loading…" : `${R.value.length} recording${R.value.length === 1 ? "" : "s"}`), pn = u(() => z.value === "upcoming" ? "No upcoming recordings." : z.value === "by-series" ? "No series recordings." : "No recordings yet."), mn = v(!1), H = v(""), U = v(""), W = v(""), G = v(""), K = v(""), q = v(""), hn = v(!1);
		async function gn() {
			await Ft(), H.value = A.value[0]?.id ?? "", U.value = "", W.value = "", G.value = "", K.value = "", q.value = "", mn.value = !0;
		}
		function _n() {
			mn.value = !1;
		}
		async function vn() {
			if (!H.value) {
				E.error("Channel is required.");
				return;
			}
			if (!U.value.trim()) {
				E.error("Title is required.");
				return;
			}
			if (!W.value || !G.value || !K.value || !q.value) {
				E.error("Start and end date/time are required.");
				return;
			}
			let e = Math.floor((/* @__PURE__ */ new Date(`${W.value}T${G.value}`)).getTime() / 1e3), t = Math.floor((/* @__PURE__ */ new Date(`${K.value}T${q.value}`)).getTime() / 1e3);
			if (t <= e) {
				E.error("End must be after start.");
				return;
			}
			hn.value = !0;
			try {
				let n = await T.createRecording({
					channel_id: H.value,
					start_time: e,
					end_time: t,
					title: U.value.trim()
				});
				R.value = [...R.value, n], E.success("Recording scheduled."), _n();
			} catch (e) {
				E.error(i(e, "Failed to schedule recording."));
			} finally {
				hn.value = !1;
			}
		}
		let J = v([]), yn = v(!1), bn = v(!1), Y = v(null);
		async function xn() {
			yn.value = !0, Y.value = null;
			try {
				J.value = await T.listSeriesRules(), bn.value = !0;
			} catch (e) {
				Y.value = i(e, "Failed to load series rules."), E.error(Y.value);
			} finally {
				yn.value = !1;
			}
		}
		let X = v(null);
		async function Sn() {
			let e = X.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), J.value = J.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), X.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete rule.")), X.value = null;
			}
		}
		let Cn = u(() => yn.value ? "Loading…" : `${J.value.length} rule${J.value.length === 1 ? "" : "s"}`), wn = v(!1), Z = v(""), Q = v(""), Tn = v("space"), $ = v(3), En = v(!1), Dn = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function On() {
			await Ft(), Z.value = "", Q.value = A.value[0]?.id ?? "", Tn.value = "space", $.value = 3, wn.value = !0;
		}
		function kn() {
			wn.value = !1;
		}
		async function An() {
			if (!Z.value.trim()) {
				E.error("Title pattern is required.");
				return;
			}
			if (!Q.value) {
				E.error("Channel is required.");
				return;
			}
			En.value = !0;
			try {
				let e = await T.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: Q.value,
					title: Z.value.trim(),
					priority: $.value,
					keep_until: Tn.value
				});
				J.value = [...J.value, e], E.success("Series rule created."), kn();
			} catch (e) {
				E.error(i(e, "Failed to create rule."));
			} finally {
				En.value = !1;
			}
		}
		return de(() => O.tuners, (e) => {
			e && !zt.value && Ht();
		}, { immediate: !0 }), de(() => O.guide, (e) => {
			e && !Jt.value && Zt(F.value);
		}), de(() => O.recordings, (e) => {
			e && !rn.value && ln();
		}), de(() => O.seriesRules, (e) => {
			e && !bn.value && (xn(), Ft());
		}), le(() => {}), (e, n) => (_(), p("section", me, [
			n[70] ||= m("header", { class: "admin-livetv__head" }, [m("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			m("section", he, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: n[0] ||= (e) => k("tuners")
			}, [m("span", _e, [
				g(t, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				n[23] ||= m("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				g(t, {
					name: O.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", ve, b(Kt.value), 1)], 8, ge), O.tuners ? (_(), p("div", ye, [m("div", be, [g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Bt.value,
				onClick: Ut
			}, {
				default: S(() => [...n[24] ||= [h(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Rt.value ? (_(), p("div", xe, [g(ie, {
				variant: "text",
				lines: 3
			})])) : M.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load tuners",
				description: M.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Ht
				}, {
					default: S(() => [...n[25] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (_(), p("div", Se, [(_(!0), p(l, null, y(j.value, (e) => (_(), p("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				m("div", Ce, [m("span", we, [g(o, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: S(() => [h(b(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), m("span", Te, b(e.name), 1)]), g(o, { tone: e.enabled ? "success" : "neutral" }, {
					default: S(() => [h(b(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				m("dl", Ee, [
					n[29] ||= m("dt", null, "Host", -1),
					m("dd", null, b(e.host) + ":" + b(e.port), 1),
					e.device_id ? (_(), p(l, { key: 0 }, [n[26] ||= m("dt", null, "Device ID", -1), m("dd", null, b(e.device_id), 1)], 64)) : f("", !0),
					e.last_seen ? (_(), p(l, { key: 1 }, [n[27] ||= m("dt", null, "Last Seen", -1), m("dd", null, b(new Date(e.last_seen).toLocaleString()), 1)], 64)) : f("", !0),
					e.status ? (_(), p(l, { key: 2 }, [n[28] ||= m("dt", null, "Status", -1), m("dd", null, b(e.status), 1)], 64)) : f("", !0)
				]),
				m("div", De, [g(ee, {
					"model-value": !!e.enabled,
					disabled: Vt[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Wt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), g(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => N.value = e
				}, {
					default: S(() => [...n[30] ||= [h(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : f("", !0)]),
			m("section", Oe, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.guide,
				"aria-controls": "livetv-guide-body",
				onClick: n[1] ||= (e) => k("guide")
			}, [m("span", Ae, [
				g(t, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				n[31] ||= m("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				g(t, {
					name: O.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", je, b(tn.value), 1)], 8, ke), O.guide ? (_(), p("div", Me, [m("div", Ne, [m("div", Pe, [(_(), p(l, null, y(Xt, (e, t) => m("button", {
				key: e,
				type: "button",
				class: ce(["admin-livetv__seg-btn", { "is-active": F.value === t }]),
				"aria-pressed": F.value === t,
				onClick: (e) => Qt(t)
			}, b(e), 11, Fe)), 64))]), g(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Yt.value,
				onClick: en
			}, {
				default: S(() => [...n[32] ||= [h(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), qt.value ? (_(), p("div", Ie, [g(ie, {
				variant: "text",
				lines: 4
			})])) : L.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load guide",
				description: L.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: n[2] ||= (e) => Zt(F.value)
				}, {
					default: S(() => [...n[33] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : P.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (_(), p("div", Le, [(_(!0), p(l, null, y(P.value, (e) => (_(), p("div", {
				key: e.id,
				class: ce(["admin-livetv__program", { "is-selected": I.value === e.id }]),
				role: "button",
				tabindex: "0",
				"aria-pressed": I.value === e.id,
				"aria-label": `${e.title}, ${D(e.start_time)} to ${D(e.end_time)}`,
				onClick: (t) => $t(e),
				onKeydown: [fe(pe((t) => $t(e), ["prevent"]), ["enter"]), fe(pe((t) => $t(e), ["prevent"]), ["space"])]
			}, [
				m("div", ze, b(D(e.start_time)) + " – " + b(D(e.end_time)), 1),
				m("div", Be, b(e.title), 1),
				e.description && I.value !== e.id ? (_(), p("p", Ve, b(e.description.slice(0, 100)) + b(e.description.length > 100 ? "…" : ""), 1)) : f("", !0),
				I.value === e.id ? (_(), p("div", He, [e.description ? (_(), p("p", Ue, b(e.description), 1)) : f("", !0), m("div", We, [
					e.rating ? (_(), d(o, {
						key: 0,
						tone: "neutral"
					}, {
						default: S(() => [h("Rating: " + b(e.rating), 1)]),
						_: 2
					}, 1024)) : f("", !0),
					e.season ? (_(), d(o, {
						key: 1,
						tone: "info"
					}, {
						default: S(() => [h(b(Pt(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : f("", !0),
					e.year ? (_(), d(o, {
						key: 2,
						tone: "neutral"
					}, {
						default: S(() => [h(b(e.year), 1)]),
						_: 2
					}, 1024)) : f("", !0)
				])])) : f("", !0)
			], 42, Re))), 128))]))])) : f("", !0)]),
			m("section", Ge, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: n[3] ||= (e) => k("recordings")
			}, [m("span", qe, [
				g(t, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				n[34] ||= m("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				g(t, {
					name: O.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", Je, b(fn.value), 1)], 8, Ke), O.recordings ? (_(), p("div", Ye, [m("div", Xe, [m("div", {
				ref_key: "recTablistEl",
				ref: on,
				class: "admin-livetv__segmented",
				role: "tablist",
				"aria-label": "Recording filter",
				onKeydown: cn
			}, [(_(), p(l, null, y(an, (e) => m("button", {
				id: `rec-tab-${e.value}`,
				key: e.value,
				type: "button",
				role: "tab",
				class: ce(["admin-livetv__seg-btn", { "is-active": z.value === e.value }]),
				"aria-selected": z.value === e.value,
				"aria-controls": `rec-panel-${e.value}`,
				tabindex: z.value === e.value ? 0 : -1,
				onClick: (t) => z.value = e.value
			}, b(e.label), 11, Ze)), 64))], 544), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: gn
			}, {
				default: S(() => [...n[35] ||= [h(" Schedule Recording ", -1)]]),
				_: 1
			})]), m("div", {
				id: `rec-panel-${z.value}`,
				role: "tabpanel",
				"aria-labelledby": `rec-tab-${z.value}`
			}, [nn.value ? (_(), p("div", $e, [g(ie, {
				variant: "text",
				lines: 3
			})])) : B.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recordings",
				description: B.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: ln
				}, {
					default: S(() => [...n[36] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : R.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: pn.value
			}, null, 8, ["description"])) : (_(), p("div", et, [(_(!0), p(l, null, y(R.value, (e) => (_(), p("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				m("div", tt, [m("span", nt, b(e.program_title ?? "Untitled"), 1), e.status ? (_(), d(o, {
					key: 0,
					tone: dn(e.status)
				}, {
					default: S(() => [h(b(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : f("", !0)]),
				m("div", rt, [
					m("span", null, b(e.channel_name ?? e.channel_id), 1),
					m("span", null, b(Mt(e.start_time)) + " · " + b(D(e.start_time)) + " – " + b(D(e.end_time)), 1),
					m("span", null, b(jt(e.start_time, e.end_time)), 1),
					e.size ? (_(), p("span", it, b(Nt(e.size)), 1)) : f("", !0)
				]),
				m("div", at, [g(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => V.value = e
				}, {
					default: S(() => [...n[37] ||= [h(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))], 8, Qe)])) : f("", !0)]),
			m("section", ot, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: n[4] ||= (e) => k("seriesRules")
			}, [m("span", ct, [
				g(t, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				n[38] ||= m("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				g(t, {
					name: O.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", lt, b(Cn.value), 1)], 8, st), O.seriesRules ? (_(), p("div", ut, [m("div", dt, [g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: On
			}, {
				default: S(() => [...n[39] ||= [h("Add Rule", -1)]]),
				_: 1
			})]), yn.value ? (_(), p("div", ft, [g(ie, {
				variant: "text",
				lines: 3
			})])) : Y.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load series rules",
				description: Y.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: xn
				}, {
					default: S(() => [...n[40] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (_(), p("div", pt, [(_(!0), p(l, null, y(J.value, (e) => (_(), p("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [m("div", mt, [m("span", ht, b(e.title_pattern), 1), m("div", gt, [
				m("span", null, b(Lt(e)), 1),
				e.priority ? (_(), d(o, {
					key: 0,
					tone: "info"
				}, {
					default: S(() => [h("Priority " + b(e.priority), 1)]),
					_: 2
				}, 1024)) : f("", !0),
				e.keep_until ? (_(), d(o, {
					key: 1,
					tone: "neutral"
				}, {
					default: S(() => [h("Keep: " + b(e.keep_until), 1)]),
					_: 2
				}, 1024)) : f("", !0)
			])]), g(a, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => X.value = e
			}, {
				default: S(() => [...n[41] ||= [h(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : f("", !0)]),
			g(s, {
				modelValue: mn.value,
				"onUpdate:modelValue": n[11] ||= (e) => mn.value = e,
				title: "Schedule Recording",
				onClose: _n
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: _n
				}, {
					default: S(() => [...n[48] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: hn.value,
					onClick: vn
				}, {
					default: S(() => [...n[49] ||= [h(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-livetv__form",
					onSubmit: pe(vn, ["prevent"])
				}, [
					m("label", _t, [n[42] ||= m("span", { class: "admin-livetv__label" }, "Title", -1), C(m("input", {
						"onUpdate:modelValue": n[5] ||= (e) => U.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[x, U.value]])]),
					m("label", vt, [n[43] ||= m("span", { class: "admin-livetv__label" }, "Channel", -1), g(ne, {
						modelValue: H.value,
						"onUpdate:modelValue": n[6] ||= (e) => H.value = e,
						options: It.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					m("div", yt, [m("label", bt, [n[44] ||= m("span", { class: "admin-livetv__label" }, "Start Date", -1), C(m("input", {
						"onUpdate:modelValue": n[7] ||= (e) => W.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[x, W.value]])]), m("label", xt, [n[45] ||= m("span", { class: "admin-livetv__label" }, "Start Time", -1), C(m("input", {
						"onUpdate:modelValue": n[8] ||= (e) => G.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[x, G.value]])])]),
					m("div", St, [m("label", Ct, [n[46] ||= m("span", { class: "admin-livetv__label" }, "End Date", -1), C(m("input", {
						"onUpdate:modelValue": n[9] ||= (e) => K.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[x, K.value]])]), m("label", wt, [n[47] ||= m("span", { class: "admin-livetv__label" }, "End Time", -1), C(m("input", {
						"onUpdate:modelValue": n[10] ||= (e) => q.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[x, q.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(s, {
				modelValue: wn.value,
				"onUpdate:modelValue": n[16] ||= (e) => wn.value = e,
				title: "Add Series Rule",
				onClose: kn
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: kn
				}, {
					default: S(() => [...n[56] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: En.value,
					onClick: An
				}, {
					default: S(() => [...n[57] ||= [h("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-livetv__form",
					onSubmit: pe(An, ["prevent"])
				}, [
					m("label", Tt, [
						n[50] ||= m("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						C(m("input", {
							"onUpdate:modelValue": n[12] ||= (e) => Z.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[x, Z.value]]),
						n[51] ||= m("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					m("label", Et, [n[52] ||= m("span", { class: "admin-livetv__label" }, "Channel", -1), g(ne, {
						modelValue: Q.value,
						"onUpdate:modelValue": n[13] ||= (e) => Q.value = e,
						options: It.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					m("label", Dt, [
						n[53] ||= m("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						m("input", {
							value: $.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: n[14] ||= (e) => $.value = Number(e.target.value)
						}, null, 40, Ot),
						n[54] ||= m("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					m("label", kt, [n[55] ||= m("span", { class: "admin-livetv__label" }, "Keep Until", -1), g(ne, {
						modelValue: Tn.value,
						"onUpdate:modelValue": n[15] ||= (e) => Tn.value = e,
						options: Dn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(s, {
				"model-value": N.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": n[18] ||= (e) => N.value = null
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[17] ||= (e) => N.value = null
				}, {
					default: S(() => [...n[60] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: Gt
				}, {
					default: S(() => [...n[61] ||= [h("Remove", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					n[58] ||= h("Remove tuner ", -1),
					m("strong", null, b(N.value?.name), 1),
					n[59] ||= h("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(s, {
				"model-value": V.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": n[20] ||= (e) => V.value = null
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[19] ||= (e) => V.value = null
				}, {
					default: S(() => [...n[64] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: un
				}, {
					default: S(() => [...n[65] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					n[62] ||= h(" Delete recording ", -1),
					m("strong", null, b(V.value?.program_title ?? V.value?.id), 1),
					n[63] ||= h("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(s, {
				"model-value": X.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": n[22] ||= (e) => X.value = null
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[21] ||= (e) => X.value = null
				}, {
					default: S(() => [...n[68] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: Sn
				}, {
					default: S(() => [...n[69] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					n[66] ||= h("Delete series rule ", -1),
					m("strong", null, b(X.value?.title_pattern), 1),
					n[67] ||= h("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-53176210"]]);
//#endregion
export { w as default };

//# sourceMappingURL=LiveTvPage-BI2iNNYV.js.map