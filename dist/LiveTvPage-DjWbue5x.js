import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./Modal-CqhoiLRk.js";
import { c as r, f as i, t as ee } from "./client-BzWwyWKr.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { n as re } from "./listbox-htyKA_G5.js";
import { t as ie } from "./Select-Cvp-73pF.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as ae } from "./PageHint-BoAlFFBN.js";
import { t as oe } from "./liveTv-Dbjt901v.js";
import { t as se } from "./helpLinks-BI4oN4Or.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as ce, inject as le, normalizeClass as ue, onMounted as de, openBlock as _, reactive as fe, ref as v, renderList as y, toDisplayString as b, unref as pe, vModelText as x, watch as me, withCtx as S, withDirectives as C, withKeys as he, withModifiers as ge } from "vue";
//#region src/pages/admin/LiveTvPage.vue?vue&type=script&setup=true&lang.ts
var _e = {
	class: "admin-livetv",
	"aria-labelledby": "livetv-heading"
}, ve = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-tuners-heading"
}, ye = ["aria-expanded"], be = { class: "admin-livetv__section-title-row" }, xe = { class: "admin-livetv__section-summary" }, Se = {
	key: 0,
	id: "livetv-tuners-body",
	class: "admin-livetv__section-body"
}, Ce = { class: "admin-livetv__toolbar" }, we = {
	key: 0,
	class: "admin-livetv__skel"
}, Te = {
	key: 3,
	class: "admin-livetv__card-grid"
}, Ee = { class: "admin-livetv__card-head" }, De = { class: "admin-livetv__card-title-row" }, Oe = { class: "admin-livetv__card-name" }, ke = { class: "admin-livetv__dl" }, Ae = { class: "admin-livetv__card-actions" }, je = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-guide-heading"
}, Me = ["aria-expanded"], Ne = { class: "admin-livetv__section-title-row" }, Pe = { class: "admin-livetv__section-summary" }, Fe = {
	key: 0,
	id: "livetv-guide-body",
	class: "admin-livetv__section-body"
}, Ie = { class: "admin-livetv__toolbar" }, Le = {
	class: "admin-livetv__segmented",
	role: "group",
	"aria-label": "Guide date"
}, Re = ["aria-pressed", "onClick"], ze = {
	key: 0,
	class: "admin-livetv__skel"
}, Be = {
	key: 3,
	class: "admin-livetv__guide-grid"
}, Ve = [
	"aria-pressed",
	"aria-label",
	"onClick",
	"onKeydown"
], He = { class: "admin-livetv__program-time" }, Ue = { class: "admin-livetv__program-title" }, We = {
	key: 0,
	class: "admin-livetv__program-desc"
}, Ge = {
	key: 1,
	class: "admin-livetv__program-expanded"
}, Ke = {
	key: 0,
	class: "admin-livetv__program-full-desc"
}, qe = { class: "admin-livetv__program-meta" }, Je = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-recordings-heading"
}, Ye = ["aria-expanded"], Xe = { class: "admin-livetv__section-title-row" }, Ze = { class: "admin-livetv__section-summary" }, Qe = {
	key: 0,
	id: "livetv-recordings-body",
	class: "admin-livetv__section-body"
}, $e = { class: "admin-livetv__toolbar" }, et = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"onClick"
], tt = ["id", "aria-labelledby"], nt = {
	key: 0,
	class: "admin-livetv__skel"
}, rt = {
	key: 3,
	class: "admin-livetv__rec-list"
}, it = { class: "admin-livetv__card-head" }, at = { class: "admin-livetv__card-name" }, ot = { class: "admin-livetv__rec-meta" }, st = { key: 0 }, ct = { class: "admin-livetv__card-actions" }, lt = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-rules-heading"
}, ut = ["aria-expanded"], dt = { class: "admin-livetv__section-title-row" }, ft = { class: "admin-livetv__section-summary" }, pt = {
	key: 0,
	id: "livetv-rules-body",
	class: "admin-livetv__section-body"
}, mt = { class: "admin-livetv__toolbar" }, ht = {
	key: 0,
	class: "admin-livetv__skel"
}, gt = {
	key: 3,
	class: "admin-livetv__rule-list"
}, _t = { class: "admin-livetv__rule-info" }, vt = { class: "admin-livetv__rule-title" }, yt = { class: "admin-livetv__rule-meta" }, bt = { class: "admin-livetv__field" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field-row" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field-row" }, Et = { class: "admin-livetv__field" }, Dt = { class: "admin-livetv__field" }, Ot = { class: "admin-livetv__field" }, kt = { class: "admin-livetv__field" }, At = { class: "admin-livetv__field" }, jt = ["value"], Mt = { class: "admin-livetv__field" }, w = /*#__PURE__*/ e(/* @__PURE__ */ ce({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(e) {
		let ce = e, w = le("apiBase", ""), Nt = u(() => typeof w == "string" ? w : w?.value ?? ""), T = new oe(ce.client ?? new ee({
			baseUrl: Nt.value,
			tokenStore: new r()
		})), E = te();
		function Pt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), i = n % 60;
			return i > 0 ? `${r}h ${i}m` : `${r}h`;
		}
		function Ft(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function D(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function It(e) {
			return `${(e / 1024 / 1024).toFixed(1)} MB`;
		}
		function Lt(e, t) {
			return `S${String(e ?? 0).padStart(2, "0")}E${String(t ?? 0).padStart(2, "0")}`;
		}
		let O = fe({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function k(e) {
			O[e] = !O[e];
		}
		let A = v([]);
		async function Rt() {
			try {
				A.value = await T.listChannels();
			} catch {}
		}
		let zt = u(() => A.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Bt(e) {
			let t = A.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let j = v([]), Vt = v(!1), Ht = v(!1), Ut = v(!1), Wt = fe({}), M = v(null);
		async function Gt() {
			Vt.value = !0, M.value = null;
			try {
				j.value = await T.listTuners(), Ht.value = !0;
			} catch (e) {
				M.value = i(e, "Failed to load tuners."), E.error(M.value);
			} finally {
				Vt.value = !1;
			}
		}
		async function Kt() {
			if (!Ut.value) {
				Ut.value = !0;
				try {
					let e = await T.scanTuners();
					j.value = e, Ht.value = !0, E.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					E.error(i(e, "Tuner scan failed."));
				} finally {
					Ut.value = !1;
				}
			}
		}
		async function qt(e) {
			if (!Wt[e.tuner_id]) {
				Wt[e.tuner_id] = !0;
				try {
					let t = await T.updateTuner(e.tuner_id, { enabled: !e.enabled });
					j.value = j.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					E.error(i(e, "Failed to update tuner."));
				} finally {
					Wt[e.tuner_id] = !1;
				}
			}
		}
		let N = v(null);
		async function Jt() {
			let e = N.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), j.value = j.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), N.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete tuner.")), N.value = null;
			}
		}
		let Yt = u(() => Vt.value ? "Loading…" : j.value.length === 0 ? "No tuners found" : `${j.value.length} tuner${j.value.length === 1 ? "" : "s"} configured`), P = v([]), Xt = v(!1), Zt = v(!1), F = v(0), I = v(null), Qt = v(!1), $t = [
			"Today",
			"+1 Day",
			"+2 Days"
		], L = v(null);
		async function en(e) {
			Xt.value = !0, L.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				P.value = await T.listGuide({
					from: t,
					to: n
				}), Zt.value = !0;
			} catch (e) {
				L.value = i(e, "Failed to load guide."), E.error(L.value);
			} finally {
				Xt.value = !1;
			}
		}
		function tn(e) {
			F.value = e, en(e);
		}
		function nn(e) {
			I.value = I.value === e.id ? null : e.id;
		}
		async function rn() {
			if (!Qt.value) {
				Qt.value = !0;
				try {
					let e = await T.refreshGuide();
					E.success(`Guide refreshed. ${e} programmes imported.`), await en(F.value);
				} catch (e) {
					E.error(i(e, "Guide refresh failed."));
				} finally {
					Qt.value = !1;
				}
			}
		}
		let an = u(() => Xt.value ? "Loading…" : P.value.length > 0 ? `${P.value.length} programmes` : "No programmes"), R = v([]), on = v(!1), sn = v(!1), z = v("all"), cn = [
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
		], ln = v(null);
		function un(e) {
			ln.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function dn(e) {
			let t = cn.map((e) => ({
				value: e.value,
				label: e.label
			})), n = cn.findIndex((e) => e.value === z.value), r = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					r = re(t, n, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					r = re(t, n, -1);
					break;
				case "Home":
					r = re(t, -1, 1);
					break;
				case "End":
					r = re(t, 0, -1);
					break;
				default: return;
			}
			r >= 0 && (e.preventDefault(), z.value = cn[r].value, un(r));
		}
		let B = v(null);
		async function fn() {
			on.value = !0, B.value = null;
			try {
				R.value = await T.listRecordings(), sn.value = !0;
			} catch (e) {
				B.value = i(e, "Failed to load recordings."), E.error(B.value);
			} finally {
				on.value = !1;
			}
		}
		let V = v(null);
		async function pn() {
			let e = V.value;
			if (e) try {
				await T.deleteRecording(e.id), R.value = R.value.filter((t) => t.id !== e.id), E.success("Recording deleted."), V.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete recording.")), V.value = null;
			}
		}
		function mn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let hn = u(() => on.value ? "Loading…" : `${R.value.length} recording${R.value.length === 1 ? "" : "s"}`), gn = u(() => z.value === "upcoming" ? "No upcoming recordings." : z.value === "by-series" ? "No series recordings." : "No recordings yet."), _n = v(!1), H = v(""), U = v(""), W = v(""), G = v(""), K = v(""), q = v(""), vn = v(!1);
		async function yn() {
			await Rt(), H.value = A.value[0]?.id ?? "", U.value = "", W.value = "", G.value = "", K.value = "", q.value = "", _n.value = !0;
		}
		function bn() {
			_n.value = !1;
		}
		async function xn() {
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
			vn.value = !0;
			try {
				let n = await T.createRecording({
					channel_id: H.value,
					start_time: e,
					end_time: t,
					title: U.value.trim()
				});
				R.value = [...R.value, n], E.success("Recording scheduled."), bn();
			} catch (e) {
				E.error(i(e, "Failed to schedule recording."));
			} finally {
				vn.value = !1;
			}
		}
		let J = v([]), Sn = v(!1), Cn = v(!1), Y = v(null);
		async function wn() {
			Sn.value = !0, Y.value = null;
			try {
				J.value = await T.listSeriesRules(), Cn.value = !0;
			} catch (e) {
				Y.value = i(e, "Failed to load series rules."), E.error(Y.value);
			} finally {
				Sn.value = !1;
			}
		}
		let X = v(null);
		async function Tn() {
			let e = X.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), J.value = J.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), X.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete rule.")), X.value = null;
			}
		}
		let En = u(() => Sn.value ? "Loading…" : `${J.value.length} rule${J.value.length === 1 ? "" : "s"}`), Dn = v(!1), Z = v(""), Q = v(""), On = v("space"), $ = v(3), kn = v(!1), An = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function jn() {
			await Rt(), Z.value = "", Q.value = A.value[0]?.id ?? "", On.value = "space", $.value = 3, Dn.value = !0;
		}
		function Mn() {
			Dn.value = !1;
		}
		async function Nn() {
			if (!Z.value.trim()) {
				E.error("Title pattern is required.");
				return;
			}
			if (!Q.value) {
				E.error("Channel is required.");
				return;
			}
			kn.value = !0;
			try {
				let e = await T.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: Q.value,
					title: Z.value.trim(),
					priority: $.value,
					keep_until: On.value
				});
				J.value = [...J.value, e], E.success("Series rule created."), Mn();
			} catch (e) {
				E.error(i(e, "Failed to create rule."));
			} finally {
				kn.value = !1;
			}
		}
		return me(() => O.tuners, (e) => {
			e && !Ht.value && Gt();
		}, { immediate: !0 }), me(() => O.guide, (e) => {
			e && !Zt.value && en(F.value);
		}), me(() => O.recordings, (e) => {
			e && !sn.value && fn();
		}), me(() => O.seriesRules, (e) => {
			e && !Cn.value && (wn(), Rt());
		}), de(() => {}), (e, r) => (_(), p("section", _e, [
			r[71] ||= m("header", { class: "admin-livetv__head" }, [m("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			g(ae, {
				links: pe(se).livetv.links,
				details: pe(se).livetv.details
			}, {
				default: S(() => [...r[23] ||= [
					h(" Set up over-the-air or IPTV channels and record them. In ", -1),
					m("strong", null, "Tuners", -1),
					h(", ", -1),
					m("strong", null, "Scan for Tuners", -1),
					h(" finds devices on your network, which you can then enable or remove. The ", -1),
					m("strong", null, "Guide", -1),
					h(" shows what's on — pick a day and ", -1),
					m("strong", null, "Refresh Guide", -1),
					h(" to update listings. ", -1),
					m("strong", null, "Recordings", -1),
					h(" lists what's scheduled or captured (", -1),
					m("strong", null, "Schedule Recording", -1),
					h(" adds one manually), and ", -1),
					m("strong", null, "Series Rules", -1),
					h(" stores a per-show rule — see below before relying on it. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			m("section", ve, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: r[0] ||= (e) => k("tuners")
			}, [m("span", be, [
				g(t, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				r[24] ||= m("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				g(t, {
					name: O.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", xe, b(Yt.value), 1)], 8, ye), O.tuners ? (_(), p("div", Se, [m("div", Ce, [g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Ut.value,
				onClick: Kt
			}, {
				default: S(() => [...r[25] ||= [h(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Vt.value ? (_(), p("div", we, [g(s, {
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
					onClick: Gt
				}, {
					default: S(() => [...r[26] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (_(), p("div", Te, [(_(!0), p(l, null, y(j.value, (e) => (_(), p("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				m("div", Ee, [m("span", De, [g(o, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: S(() => [h(b(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), m("span", Oe, b(e.name), 1)]), g(o, { tone: e.enabled ? "success" : "neutral" }, {
					default: S(() => [h(b(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				m("dl", ke, [
					r[30] ||= m("dt", null, "Host", -1),
					m("dd", null, b(e.host) + ":" + b(e.port), 1),
					e.device_id ? (_(), p(l, { key: 0 }, [r[27] ||= m("dt", null, "Device ID", -1), m("dd", null, b(e.device_id), 1)], 64)) : f("", !0),
					e.last_seen ? (_(), p(l, { key: 1 }, [r[28] ||= m("dt", null, "Last Seen", -1), m("dd", null, b(new Date(e.last_seen).toLocaleString()), 1)], 64)) : f("", !0),
					e.status ? (_(), p(l, { key: 2 }, [r[29] ||= m("dt", null, "Status", -1), m("dd", null, b(e.status), 1)], 64)) : f("", !0)
				]),
				m("div", Ae, [g(ne, {
					"model-value": !!e.enabled,
					disabled: Wt[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => qt(e)
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
					default: S(() => [...r[31] ||= [h(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : f("", !0)]),
			m("section", je, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.guide,
				"aria-controls": "livetv-guide-body",
				onClick: r[1] ||= (e) => k("guide")
			}, [m("span", Ne, [
				g(t, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				r[32] ||= m("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				g(t, {
					name: O.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", Pe, b(an.value), 1)], 8, Me), O.guide ? (_(), p("div", Fe, [m("div", Ie, [m("div", Le, [(_(), p(l, null, y($t, (e, t) => m("button", {
				key: e,
				type: "button",
				class: ue(["admin-livetv__seg-btn", { "is-active": F.value === t }]),
				"aria-pressed": F.value === t,
				onClick: (e) => tn(t)
			}, b(e), 11, Re)), 64))]), g(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Qt.value,
				onClick: rn
			}, {
				default: S(() => [...r[33] ||= [h(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Xt.value ? (_(), p("div", ze, [g(s, {
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
					onClick: r[2] ||= (e) => en(F.value)
				}, {
					default: S(() => [...r[34] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : P.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (_(), p("div", Be, [(_(!0), p(l, null, y(P.value, (e) => (_(), p("div", {
				key: e.id,
				class: ue(["admin-livetv__program", { "is-selected": I.value === e.id }]),
				role: "button",
				tabindex: "0",
				"aria-pressed": I.value === e.id,
				"aria-label": `${e.title}, ${D(e.start_time)} to ${D(e.end_time)}`,
				onClick: (t) => nn(e),
				onKeydown: [he(ge((t) => nn(e), ["prevent"]), ["enter"]), he(ge((t) => nn(e), ["prevent"]), ["space"])]
			}, [
				m("div", He, b(D(e.start_time)) + " – " + b(D(e.end_time)), 1),
				m("div", Ue, b(e.title), 1),
				e.description && I.value !== e.id ? (_(), p("p", We, b(e.description.slice(0, 100)) + b(e.description.length > 100 ? "…" : ""), 1)) : f("", !0),
				I.value === e.id ? (_(), p("div", Ge, [e.description ? (_(), p("p", Ke, b(e.description), 1)) : f("", !0), m("div", qe, [
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
						default: S(() => [h(b(Lt(e.season, e.episode)), 1)]),
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
			], 42, Ve))), 128))]))])) : f("", !0)]),
			m("section", Je, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: r[3] ||= (e) => k("recordings")
			}, [m("span", Xe, [
				g(t, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				r[35] ||= m("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				g(t, {
					name: O.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", Ze, b(hn.value), 1)], 8, Ye), O.recordings ? (_(), p("div", Qe, [m("div", $e, [m("div", {
				ref_key: "recTablistEl",
				ref: ln,
				class: "admin-livetv__segmented",
				role: "tablist",
				"aria-label": "Recording filter",
				onKeydown: dn
			}, [(_(), p(l, null, y(cn, (e) => m("button", {
				id: `rec-tab-${e.value}`,
				key: e.value,
				type: "button",
				role: "tab",
				class: ue(["admin-livetv__seg-btn", { "is-active": z.value === e.value }]),
				"aria-selected": z.value === e.value,
				"aria-controls": `rec-panel-${e.value}`,
				tabindex: z.value === e.value ? 0 : -1,
				onClick: (t) => z.value = e.value
			}, b(e.label), 11, et)), 64))], 544), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: yn
			}, {
				default: S(() => [...r[36] ||= [h(" Schedule Recording ", -1)]]),
				_: 1
			})]), m("div", {
				id: `rec-panel-${z.value}`,
				role: "tabpanel",
				"aria-labelledby": `rec-tab-${z.value}`
			}, [on.value ? (_(), p("div", nt, [g(s, {
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
					onClick: fn
				}, {
					default: S(() => [...r[37] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : R.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: gn.value
			}, null, 8, ["description"])) : (_(), p("div", rt, [(_(!0), p(l, null, y(R.value, (e) => (_(), p("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				m("div", it, [m("span", at, b(e.program_title ?? "Untitled"), 1), e.status ? (_(), d(o, {
					key: 0,
					tone: mn(e.status)
				}, {
					default: S(() => [h(b(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : f("", !0)]),
				m("div", ot, [
					m("span", null, b(e.channel_name ?? e.channel_id), 1),
					m("span", null, b(Ft(e.start_time)) + " · " + b(D(e.start_time)) + " – " + b(D(e.end_time)), 1),
					m("span", null, b(Pt(e.start_time, e.end_time)), 1),
					e.size ? (_(), p("span", st, b(It(e.size)), 1)) : f("", !0)
				]),
				m("div", ct, [g(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => V.value = e
				}, {
					default: S(() => [...r[38] ||= [h(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))], 8, tt)])) : f("", !0)]),
			m("section", lt, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: r[4] ||= (e) => k("seriesRules")
			}, [m("span", dt, [
				g(t, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				r[39] ||= m("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				g(t, {
					name: O.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", ft, b(En.value), 1)], 8, ut), O.seriesRules ? (_(), p("div", pt, [m("div", mt, [g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: jn
			}, {
				default: S(() => [...r[40] ||= [h("Add Rule", -1)]]),
				_: 1
			})]), Sn.value ? (_(), p("div", ht, [g(s, {
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
					onClick: wn
				}, {
					default: S(() => [...r[41] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (_(), p("div", gt, [(_(!0), p(l, null, y(J.value, (e) => (_(), p("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [m("div", _t, [m("span", vt, b(e.title_pattern), 1), m("div", yt, [
				m("span", null, b(Bt(e)), 1),
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
				default: S(() => [...r[42] ||= [h(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : f("", !0)]),
			g(n, {
				modelValue: _n.value,
				"onUpdate:modelValue": r[11] ||= (e) => _n.value = e,
				title: "Schedule Recording",
				onClose: bn
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: bn
				}, {
					default: S(() => [...r[49] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: vn.value,
					onClick: xn
				}, {
					default: S(() => [...r[50] ||= [h(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-livetv__form",
					onSubmit: ge(xn, ["prevent"])
				}, [
					m("label", bt, [r[43] ||= m("span", { class: "admin-livetv__label" }, "Title", -1), C(m("input", {
						"onUpdate:modelValue": r[5] ||= (e) => U.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[x, U.value]])]),
					m("label", xt, [r[44] ||= m("span", { class: "admin-livetv__label" }, "Channel", -1), g(ie, {
						modelValue: H.value,
						"onUpdate:modelValue": r[6] ||= (e) => H.value = e,
						options: zt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					m("div", St, [m("label", Ct, [r[45] ||= m("span", { class: "admin-livetv__label" }, "Start Date", -1), C(m("input", {
						"onUpdate:modelValue": r[7] ||= (e) => W.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[x, W.value]])]), m("label", wt, [r[46] ||= m("span", { class: "admin-livetv__label" }, "Start Time", -1), C(m("input", {
						"onUpdate:modelValue": r[8] ||= (e) => G.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[x, G.value]])])]),
					m("div", Tt, [m("label", Et, [r[47] ||= m("span", { class: "admin-livetv__label" }, "End Date", -1), C(m("input", {
						"onUpdate:modelValue": r[9] ||= (e) => K.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[x, K.value]])]), m("label", Dt, [r[48] ||= m("span", { class: "admin-livetv__label" }, "End Time", -1), C(m("input", {
						"onUpdate:modelValue": r[10] ||= (e) => q.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[x, q.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(n, {
				modelValue: Dn.value,
				"onUpdate:modelValue": r[16] ||= (e) => Dn.value = e,
				title: "Add Series Rule",
				onClose: Mn
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: Mn
				}, {
					default: S(() => [...r[57] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: kn.value,
					onClick: Nn
				}, {
					default: S(() => [...r[58] ||= [h("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-livetv__form",
					onSubmit: ge(Nn, ["prevent"])
				}, [
					m("label", Ot, [
						r[51] ||= m("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						C(m("input", {
							"onUpdate:modelValue": r[12] ||= (e) => Z.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[x, Z.value]]),
						r[52] ||= m("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					m("label", kt, [r[53] ||= m("span", { class: "admin-livetv__label" }, "Channel", -1), g(ie, {
						modelValue: Q.value,
						"onUpdate:modelValue": r[13] ||= (e) => Q.value = e,
						options: zt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					m("label", At, [
						r[54] ||= m("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						m("input", {
							value: $.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: r[14] ||= (e) => $.value = Number(e.target.value)
						}, null, 40, jt),
						r[55] ||= m("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					m("label", Mt, [r[56] ||= m("span", { class: "admin-livetv__label" }, "Keep Until", -1), g(ie, {
						modelValue: On.value,
						"onUpdate:modelValue": r[15] ||= (e) => On.value = e,
						options: An,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(n, {
				"model-value": N.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": r[18] ||= (e) => N.value = null
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: r[17] ||= (e) => N.value = null
				}, {
					default: S(() => [...r[61] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: Jt
				}, {
					default: S(() => [...r[62] ||= [h("Remove", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					r[59] ||= h("Remove tuner ", -1),
					m("strong", null, b(N.value?.name), 1),
					r[60] ||= h("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(n, {
				"model-value": V.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": r[20] ||= (e) => V.value = null
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: r[19] ||= (e) => V.value = null
				}, {
					default: S(() => [...r[65] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: pn
				}, {
					default: S(() => [...r[66] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					r[63] ||= h(" Delete recording ", -1),
					m("strong", null, b(V.value?.program_title ?? V.value?.id), 1),
					r[64] ||= h("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(n, {
				"model-value": X.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": r[22] ||= (e) => X.value = null
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: r[21] ||= (e) => X.value = null
				}, {
					default: S(() => [...r[69] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: Tn
				}, {
					default: S(() => [...r[70] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					r[67] ||= h("Delete series rule ", -1),
					m("strong", null, b(X.value?.title_pattern), 1),
					r[68] ||= h("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-b126bffc"]]);
//#endregion
export { w as default };

//# sourceMappingURL=LiveTvPage-DjWbue5x.js.map