import { n as e, t } from "./Icon-ax5k7_G2.js";
import { c as n, f as r, t as ee } from "./client-CZc6ehUa.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-k7aQagzg.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as ne } from "./Switch-CFZhdkXR.js";
import { n as o } from "./listbox-htyKA_G5.js";
import { t as re } from "./Select-BR5EXV0L.js";
import { t as s } from "./Modal-CWarEzTU.js";
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
		let oe = e, w = se("apiBase", ""), At = u(() => typeof w == "string" ? w : w?.value ?? ""), T = new ae(oe.client ?? new ee({
			baseUrl: At.value,
			tokenStore: new n()
		})), E = te();
		function jt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), ee = n % 60;
			return ee > 0 ? `${r}h ${ee}m` : `${r}h`;
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
		let j = v([]), M = v(!1), Rt = v(!1), zt = v(!1), Bt = ue({}), N = v(null);
		async function Vt() {
			M.value = !0, N.value = null;
			try {
				j.value = await T.listTuners(), Rt.value = !0;
			} catch (e) {
				N.value = r(e, "Failed to load tuners."), E.error(N.value);
			} finally {
				M.value = !1;
			}
		}
		async function Ht() {
			if (!zt.value) {
				zt.value = !0;
				try {
					let e = await T.scanTuners();
					j.value = e, Rt.value = !0, E.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					E.error(r(e, "Tuner scan failed."));
				} finally {
					zt.value = !1;
				}
			}
		}
		async function Ut(e) {
			if (!Bt[e.tuner_id]) {
				Bt[e.tuner_id] = !0;
				try {
					let t = await T.updateTuner(e.tuner_id, { enabled: !e.enabled });
					j.value = j.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					E.error(r(e, "Failed to update tuner."));
				} finally {
					Bt[e.tuner_id] = !1;
				}
			}
		}
		let P = v(null);
		async function Wt() {
			let e = P.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), j.value = j.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), P.value = null;
			} catch (e) {
				E.error(r(e, "Failed to delete tuner.")), P.value = null;
			}
		}
		let Gt = u(() => M.value ? "Loading…" : j.value.length === 0 ? "No tuners found" : `${j.value.length} tuner${j.value.length === 1 ? "" : "s"} configured`), F = v([]), Kt = v(!1), qt = v(!1), I = v(0), L = v(null), Jt = v(!1), Yt = [
			"Today",
			"+1 Day",
			"+2 Days"
		], R = v(null);
		async function Xt(e) {
			Kt.value = !0, R.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				F.value = await T.listGuide({
					from: t,
					to: n
				}), qt.value = !0;
			} catch (e) {
				R.value = r(e, "Failed to load guide."), E.error(R.value);
			} finally {
				Kt.value = !1;
			}
		}
		function Zt(e) {
			I.value = e, Xt(e);
		}
		function Qt(e) {
			L.value = L.value === e.id ? null : e.id;
		}
		async function $t() {
			if (!Jt.value) {
				Jt.value = !0;
				try {
					let e = await T.refreshGuide();
					E.success(`Guide refreshed. ${e} programmes imported.`), await Xt(I.value);
				} catch (e) {
					E.error(r(e, "Guide refresh failed."));
				} finally {
					Jt.value = !1;
				}
			}
		}
		let en = u(() => Kt.value ? "Loading…" : F.value.length > 0 ? `${F.value.length} programmes` : "No programmes"), z = v([]), tn = v(!1), nn = v(!1), B = v("all"), rn = [
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
		], an = v(null);
		function on(e) {
			an.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function sn(e) {
			let t = rn.map((e) => ({
				value: e.value,
				label: e.label
			})), n = rn.findIndex((e) => e.value === B.value), r = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					r = o(t, n, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					r = o(t, n, -1);
					break;
				case "Home":
					r = o(t, -1, 1);
					break;
				case "End":
					r = o(t, 0, -1);
					break;
				default: return;
			}
			r >= 0 && (e.preventDefault(), B.value = rn[r].value, on(r));
		}
		let V = v(null);
		async function cn() {
			tn.value = !0, V.value = null;
			try {
				z.value = await T.listRecordings(), nn.value = !0;
			} catch (e) {
				V.value = r(e, "Failed to load recordings."), E.error(V.value);
			} finally {
				tn.value = !1;
			}
		}
		let H = v(null);
		async function ln() {
			let e = H.value;
			if (e) try {
				await T.deleteRecording(e.id), z.value = z.value.filter((t) => t.id !== e.id), E.success("Recording deleted."), H.value = null;
			} catch (e) {
				E.error(r(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function un(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let dn = u(() => tn.value ? "Loading…" : `${z.value.length} recording${z.value.length === 1 ? "" : "s"}`), fn = u(() => B.value === "upcoming" ? "No upcoming recordings." : B.value === "by-series" ? "No series recordings." : "No recordings yet."), pn = v(!1), U = v(""), W = v(""), G = v(""), K = v(""), q = v(""), J = v(""), mn = v(!1);
		async function hn() {
			await Ft(), U.value = A.value[0]?.id ?? "", W.value = "", G.value = "", K.value = "", q.value = "", J.value = "", pn.value = !0;
		}
		function gn() {
			pn.value = !1;
		}
		async function _n() {
			if (!U.value) {
				E.error("Channel is required.");
				return;
			}
			if (!W.value.trim()) {
				E.error("Title is required.");
				return;
			}
			if (!G.value || !K.value || !q.value || !J.value) {
				E.error("Start and end date/time are required.");
				return;
			}
			let e = Math.floor((/* @__PURE__ */ new Date(`${G.value}T${K.value}`)).getTime() / 1e3), t = Math.floor((/* @__PURE__ */ new Date(`${q.value}T${J.value}`)).getTime() / 1e3);
			if (t <= e) {
				E.error("End must be after start.");
				return;
			}
			mn.value = !0;
			try {
				let n = await T.createRecording({
					channel_id: U.value,
					start_time: e,
					end_time: t,
					title: W.value.trim()
				});
				z.value = [...z.value, n], E.success("Recording scheduled."), gn();
			} catch (e) {
				E.error(r(e, "Failed to schedule recording."));
			} finally {
				mn.value = !1;
			}
		}
		let Y = v([]), vn = v(!1), yn = v(!1), X = v(null);
		async function bn() {
			vn.value = !0, X.value = null;
			try {
				Y.value = await T.listSeriesRules(), yn.value = !0;
			} catch (e) {
				X.value = r(e, "Failed to load series rules."), E.error(X.value);
			} finally {
				vn.value = !1;
			}
		}
		let Z = v(null);
		async function xn() {
			let e = Z.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), Y.value = Y.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), Z.value = null;
			} catch (e) {
				E.error(r(e, "Failed to delete rule.")), Z.value = null;
			}
		}
		let Sn = u(() => vn.value ? "Loading…" : `${Y.value.length} rule${Y.value.length === 1 ? "" : "s"}`), Cn = v(!1), Q = v(""), $ = v(""), wn = v("space"), Tn = v(3), En = v(!1), Dn = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function On() {
			await Ft(), Q.value = "", $.value = A.value[0]?.id ?? "", wn.value = "space", Tn.value = 3, Cn.value = !0;
		}
		function kn() {
			Cn.value = !1;
		}
		async function An() {
			if (!Q.value.trim()) {
				E.error("Title pattern is required.");
				return;
			}
			if (!$.value) {
				E.error("Channel is required.");
				return;
			}
			En.value = !0;
			try {
				let e = await T.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: $.value,
					title: Q.value.trim(),
					priority: Tn.value,
					keep_until: wn.value
				});
				Y.value = [...Y.value, e], E.success("Series rule created."), kn();
			} catch (e) {
				E.error(r(e, "Failed to create rule."));
			} finally {
				En.value = !1;
			}
		}
		return de(() => O.tuners, (e) => {
			e && !Rt.value && Vt();
		}, { immediate: !0 }), de(() => O.guide, (e) => {
			e && !qt.value && Xt(I.value);
		}), de(() => O.recordings, (e) => {
			e && !nn.value && cn();
		}), de(() => O.seriesRules, (e) => {
			e && !yn.value && (bn(), Ft());
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
			]), m("span", ve, b(Gt.value), 1)], 8, ge), O.tuners ? (_(), p("div", ye, [m("div", be, [g(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: zt.value,
				onClick: Ht
			}, {
				default: S(() => [...n[24] ||= [h(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), M.value ? (_(), p("div", xe, [g(ie, {
				variant: "text",
				lines: 3
			})])) : N.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load tuners",
				description: N.value
			}, {
				actions: S(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Vt
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
				m("div", Ce, [m("span", we, [g(a, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: S(() => [h(b(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), m("span", Te, b(e.name), 1)]), g(a, { tone: e.enabled ? "success" : "neutral" }, {
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
				m("div", De, [g(ne, {
					"model-value": !!e.enabled,
					disabled: Bt[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Ut(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), g(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => P.value = e
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
			]), m("span", je, b(en.value), 1)], 8, ke), O.guide ? (_(), p("div", Me, [m("div", Ne, [m("div", Pe, [(_(), p(l, null, y(Yt, (e, t) => m("button", {
				key: e,
				type: "button",
				class: ce(["admin-livetv__seg-btn", { "is-active": I.value === t }]),
				"aria-pressed": I.value === t,
				onClick: (e) => Zt(t)
			}, b(e), 11, Fe)), 64))]), g(i, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Jt.value,
				onClick: $t
			}, {
				default: S(() => [...n[32] ||= [h(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Kt.value ? (_(), p("div", Ie, [g(ie, {
				variant: "text",
				lines: 4
			})])) : R.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load guide",
				description: R.value
			}, {
				actions: S(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: n[2] ||= (e) => Xt(I.value)
				}, {
					default: S(() => [...n[33] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : F.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (_(), p("div", Le, [(_(!0), p(l, null, y(F.value, (e) => (_(), p("div", {
				key: e.id,
				class: ce(["admin-livetv__program", { "is-selected": L.value === e.id }]),
				role: "button",
				tabindex: "0",
				"aria-pressed": L.value === e.id,
				"aria-label": `${e.title}, ${D(e.start_time)} to ${D(e.end_time)}`,
				onClick: (t) => Qt(e),
				onKeydown: [fe(pe((t) => Qt(e), ["prevent"]), ["enter"]), fe(pe((t) => Qt(e), ["prevent"]), ["space"])]
			}, [
				m("div", ze, b(D(e.start_time)) + " – " + b(D(e.end_time)), 1),
				m("div", Be, b(e.title), 1),
				e.description && L.value !== e.id ? (_(), p("p", Ve, b(e.description.slice(0, 100)) + b(e.description.length > 100 ? "…" : ""), 1)) : f("", !0),
				L.value === e.id ? (_(), p("div", He, [e.description ? (_(), p("p", Ue, b(e.description), 1)) : f("", !0), m("div", We, [
					e.rating ? (_(), d(a, {
						key: 0,
						tone: "neutral"
					}, {
						default: S(() => [h("Rating: " + b(e.rating), 1)]),
						_: 2
					}, 1024)) : f("", !0),
					e.season ? (_(), d(a, {
						key: 1,
						tone: "info"
					}, {
						default: S(() => [h(b(Pt(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : f("", !0),
					e.year ? (_(), d(a, {
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
			]), m("span", Je, b(dn.value), 1)], 8, Ke), O.recordings ? (_(), p("div", Ye, [m("div", Xe, [m("div", {
				ref_key: "recTablistEl",
				ref: an,
				class: "admin-livetv__segmented",
				role: "tablist",
				"aria-label": "Recording filter",
				onKeydown: sn
			}, [(_(), p(l, null, y(rn, (e) => m("button", {
				id: `rec-tab-${e.value}`,
				key: e.value,
				type: "button",
				role: "tab",
				class: ce(["admin-livetv__seg-btn", { "is-active": B.value === e.value }]),
				"aria-selected": B.value === e.value,
				"aria-controls": `rec-panel-${e.value}`,
				tabindex: B.value === e.value ? 0 : -1,
				onClick: (t) => B.value = e.value
			}, b(e.label), 11, Ze)), 64))], 544), g(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: hn
			}, {
				default: S(() => [...n[35] ||= [h(" Schedule Recording ", -1)]]),
				_: 1
			})]), m("div", {
				id: `rec-panel-${B.value}`,
				role: "tabpanel",
				"aria-labelledby": `rec-tab-${B.value}`
			}, [tn.value ? (_(), p("div", $e, [g(ie, {
				variant: "text",
				lines: 3
			})])) : V.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recordings",
				description: V.value
			}, {
				actions: S(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: cn
				}, {
					default: S(() => [...n[36] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : z.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: fn.value
			}, null, 8, ["description"])) : (_(), p("div", et, [(_(!0), p(l, null, y(z.value, (e) => (_(), p("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				m("div", tt, [m("span", nt, b(e.program_title ?? "Untitled"), 1), e.status ? (_(), d(a, {
					key: 0,
					tone: un(e.status)
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
				m("div", at, [g(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
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
			]), m("span", lt, b(Sn.value), 1)], 8, st), O.seriesRules ? (_(), p("div", ut, [m("div", dt, [g(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: On
			}, {
				default: S(() => [...n[39] ||= [h("Add Rule", -1)]]),
				_: 1
			})]), vn.value ? (_(), p("div", ft, [g(ie, {
				variant: "text",
				lines: 3
			})])) : X.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load series rules",
				description: X.value
			}, {
				actions: S(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: bn
				}, {
					default: S(() => [...n[40] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Y.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (_(), p("div", pt, [(_(!0), p(l, null, y(Y.value, (e) => (_(), p("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [m("div", mt, [m("span", ht, b(e.title_pattern), 1), m("div", gt, [
				m("span", null, b(Lt(e)), 1),
				e.priority ? (_(), d(a, {
					key: 0,
					tone: "info"
				}, {
					default: S(() => [h("Priority " + b(e.priority), 1)]),
					_: 2
				}, 1024)) : f("", !0),
				e.keep_until ? (_(), d(a, {
					key: 1,
					tone: "neutral"
				}, {
					default: S(() => [h("Keep: " + b(e.keep_until), 1)]),
					_: 2
				}, 1024)) : f("", !0)
			])]), g(i, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => Z.value = e
			}, {
				default: S(() => [...n[41] ||= [h(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : f("", !0)]),
			g(s, {
				modelValue: pn.value,
				"onUpdate:modelValue": n[11] ||= (e) => pn.value = e,
				title: "Schedule Recording",
				onClose: gn
			}, {
				footer: S(() => [g(i, {
					variant: "ghost",
					size: "sm",
					onClick: gn
				}, {
					default: S(() => [...n[48] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					size: "sm",
					loading: mn.value,
					onClick: _n
				}, {
					default: S(() => [...n[49] ||= [h(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-livetv__form",
					onSubmit: pe(_n, ["prevent"])
				}, [
					m("label", _t, [n[42] ||= m("span", { class: "admin-livetv__label" }, "Title", -1), C(m("input", {
						"onUpdate:modelValue": n[5] ||= (e) => W.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[x, W.value]])]),
					m("label", vt, [n[43] ||= m("span", { class: "admin-livetv__label" }, "Channel", -1), g(re, {
						modelValue: U.value,
						"onUpdate:modelValue": n[6] ||= (e) => U.value = e,
						options: It.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					m("div", yt, [m("label", bt, [n[44] ||= m("span", { class: "admin-livetv__label" }, "Start Date", -1), C(m("input", {
						"onUpdate:modelValue": n[7] ||= (e) => G.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[x, G.value]])]), m("label", xt, [n[45] ||= m("span", { class: "admin-livetv__label" }, "Start Time", -1), C(m("input", {
						"onUpdate:modelValue": n[8] ||= (e) => K.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[x, K.value]])])]),
					m("div", St, [m("label", Ct, [n[46] ||= m("span", { class: "admin-livetv__label" }, "End Date", -1), C(m("input", {
						"onUpdate:modelValue": n[9] ||= (e) => q.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[x, q.value]])]), m("label", wt, [n[47] ||= m("span", { class: "admin-livetv__label" }, "End Time", -1), C(m("input", {
						"onUpdate:modelValue": n[10] ||= (e) => J.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[x, J.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(s, {
				modelValue: Cn.value,
				"onUpdate:modelValue": n[16] ||= (e) => Cn.value = e,
				title: "Add Series Rule",
				onClose: kn
			}, {
				footer: S(() => [g(i, {
					variant: "ghost",
					size: "sm",
					onClick: kn
				}, {
					default: S(() => [...n[56] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
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
							"onUpdate:modelValue": n[12] ||= (e) => Q.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[x, Q.value]]),
						n[51] ||= m("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					m("label", Et, [n[52] ||= m("span", { class: "admin-livetv__label" }, "Channel", -1), g(re, {
						modelValue: $.value,
						"onUpdate:modelValue": n[13] ||= (e) => $.value = e,
						options: It.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					m("label", Dt, [
						n[53] ||= m("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						m("input", {
							value: Tn.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: n[14] ||= (e) => Tn.value = Number(e.target.value)
						}, null, 40, Ot),
						n[54] ||= m("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					m("label", kt, [n[55] ||= m("span", { class: "admin-livetv__label" }, "Keep Until", -1), g(re, {
						modelValue: wn.value,
						"onUpdate:modelValue": n[15] ||= (e) => wn.value = e,
						options: Dn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(s, {
				"model-value": P.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": n[18] ||= (e) => P.value = null
			}, {
				footer: S(() => [g(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[17] ||= (e) => P.value = null
				}, {
					default: S(() => [...n[60] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					size: "sm",
					onClick: Wt
				}, {
					default: S(() => [...n[61] ||= [h("Remove", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					n[58] ||= h("Remove tuner ", -1),
					m("strong", null, b(P.value?.name), 1),
					n[59] ||= h("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(s, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": n[20] ||= (e) => H.value = null
			}, {
				footer: S(() => [g(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[19] ||= (e) => H.value = null
				}, {
					default: S(() => [...n[64] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					size: "sm",
					onClick: ln
				}, {
					default: S(() => [...n[65] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					n[62] ||= h(" Delete recording ", -1),
					m("strong", null, b(H.value?.program_title ?? H.value?.id), 1),
					n[63] ||= h("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(s, {
				"model-value": Z.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": n[22] ||= (e) => Z.value = null
			}, {
				footer: S(() => [g(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[21] ||= (e) => Z.value = null
				}, {
					default: S(() => [...n[68] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					size: "sm",
					onClick: xn
				}, {
					default: S(() => [...n[69] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					n[66] ||= h("Delete series rule ", -1),
					m("strong", null, b(Z.value?.title_pattern), 1),
					n[67] ||= h("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-53176210"]]);
//#endregion
export { w as default };

//# sourceMappingURL=LiveTvPage-Cry4Z5z7.js.map