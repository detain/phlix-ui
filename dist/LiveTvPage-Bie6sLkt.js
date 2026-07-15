import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { t as n } from "./Modal-BtA0owzl.js";
import { c as r, f as i, t as ee } from "./client-D1nDQ0cP.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DGsvHynO.js";
import { t as o } from "./Badge-D_aUH3dO.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { n as re } from "./listbox-htyKA_G5.js";
import { t as ie } from "./Select-DwAQcvz1.js";
import { t as ae } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-CfyGawh7.js";
import { t as oe } from "./PageHint-CPoTKHik.js";
import { t as se } from "./liveTv-Dbjt901v.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as ce, inject as le, normalizeClass as ue, onMounted as de, openBlock as g, reactive as fe, ref as _, renderList as v, toDisplayString as y, vModelText as b, watch as pe, withCtx as x, withDirectives as S, withKeys as me, withModifiers as C } from "vue";
//#region src/pages/admin/LiveTvPage.vue?vue&type=script&setup=true&lang.ts
var he = {
	class: "admin-livetv",
	"aria-labelledby": "livetv-heading"
}, ge = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-tuners-heading"
}, _e = ["aria-expanded"], ve = { class: "admin-livetv__section-title-row" }, ye = { class: "admin-livetv__section-summary" }, be = {
	key: 0,
	id: "livetv-tuners-body",
	class: "admin-livetv__section-body"
}, xe = { class: "admin-livetv__toolbar" }, Se = {
	key: 0,
	class: "admin-livetv__skel"
}, Ce = {
	key: 3,
	class: "admin-livetv__card-grid"
}, we = { class: "admin-livetv__card-head" }, Te = { class: "admin-livetv__card-title-row" }, Ee = { class: "admin-livetv__card-name" }, De = { class: "admin-livetv__dl" }, Oe = { class: "admin-livetv__card-actions" }, ke = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-guide-heading"
}, Ae = ["aria-expanded"], je = { class: "admin-livetv__section-title-row" }, Me = { class: "admin-livetv__section-summary" }, Ne = {
	key: 0,
	id: "livetv-guide-body",
	class: "admin-livetv__section-body"
}, Pe = { class: "admin-livetv__toolbar" }, Fe = {
	class: "admin-livetv__segmented",
	role: "group",
	"aria-label": "Guide date"
}, Ie = ["aria-pressed", "onClick"], Le = {
	key: 0,
	class: "admin-livetv__skel"
}, Re = {
	key: 3,
	class: "admin-livetv__guide-grid"
}, ze = [
	"aria-pressed",
	"aria-label",
	"onClick",
	"onKeydown"
], Be = { class: "admin-livetv__program-time" }, Ve = { class: "admin-livetv__program-title" }, He = {
	key: 0,
	class: "admin-livetv__program-desc"
}, Ue = {
	key: 1,
	class: "admin-livetv__program-expanded"
}, We = {
	key: 0,
	class: "admin-livetv__program-full-desc"
}, Ge = { class: "admin-livetv__program-meta" }, Ke = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-recordings-heading"
}, qe = ["aria-expanded"], Je = { class: "admin-livetv__section-title-row" }, Ye = { class: "admin-livetv__section-summary" }, Xe = {
	key: 0,
	id: "livetv-recordings-body",
	class: "admin-livetv__section-body"
}, Ze = { class: "admin-livetv__toolbar" }, Qe = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"onClick"
], $e = ["id", "aria-labelledby"], et = {
	key: 0,
	class: "admin-livetv__skel"
}, tt = {
	key: 3,
	class: "admin-livetv__rec-list"
}, nt = { class: "admin-livetv__card-head" }, rt = { class: "admin-livetv__card-name" }, it = { class: "admin-livetv__rec-meta" }, at = { key: 0 }, ot = { class: "admin-livetv__card-actions" }, st = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-rules-heading"
}, ct = ["aria-expanded"], lt = { class: "admin-livetv__section-title-row" }, ut = { class: "admin-livetv__section-summary" }, dt = {
	key: 0,
	id: "livetv-rules-body",
	class: "admin-livetv__section-body"
}, ft = { class: "admin-livetv__toolbar" }, pt = {
	key: 0,
	class: "admin-livetv__skel"
}, mt = {
	key: 3,
	class: "admin-livetv__rule-list"
}, ht = { class: "admin-livetv__rule-info" }, gt = { class: "admin-livetv__rule-title" }, _t = { class: "admin-livetv__rule-meta" }, vt = { class: "admin-livetv__field" }, yt = { class: "admin-livetv__field" }, bt = { class: "admin-livetv__field-row" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field" }, Ct = { class: "admin-livetv__field-row" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = { class: "admin-livetv__field" }, Dt = { class: "admin-livetv__field" }, Ot = { class: "admin-livetv__field" }, kt = ["value"], At = { class: "admin-livetv__field" }, w = /*#__PURE__*/ e(/* @__PURE__ */ ce({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(e) {
		let ce = e, w = le("apiBase", ""), jt = l(() => typeof w == "string" ? w : w?.value ?? ""), T = new se(ce.client ?? new ee({
			baseUrl: jt.value,
			tokenStore: new r()
		})), E = te();
		function Mt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), i = n % 60;
			return i > 0 ? `${r}h ${i}m` : `${r}h`;
		}
		function Nt(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function D(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function Pt(e) {
			return `${(e / 1024 / 1024).toFixed(1)} MB`;
		}
		function Ft(e, t) {
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
		let A = _([]);
		async function It() {
			try {
				A.value = await T.listChannels();
			} catch {}
		}
		let Lt = l(() => A.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Rt(e) {
			let t = A.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let j = _([]), M = _(!1), zt = _(!1), Bt = _(!1), Vt = fe({}), N = _(null);
		async function Ht() {
			M.value = !0, N.value = null;
			try {
				j.value = await T.listTuners(), zt.value = !0;
			} catch (e) {
				N.value = i(e, "Failed to load tuners."), E.error(N.value);
			} finally {
				M.value = !1;
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
		let P = _(null);
		async function Gt() {
			let e = P.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), j.value = j.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), P.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete tuner.")), P.value = null;
			}
		}
		let Kt = l(() => M.value ? "Loading…" : j.value.length === 0 ? "No tuners found" : `${j.value.length} tuner${j.value.length === 1 ? "" : "s"} configured`), F = _([]), qt = _(!1), Jt = _(!1), I = _(0), L = _(null), Yt = _(!1), Xt = [
			"Today",
			"+1 Day",
			"+2 Days"
		], R = _(null);
		async function Zt(e) {
			qt.value = !0, R.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				F.value = await T.listGuide({
					from: t,
					to: n
				}), Jt.value = !0;
			} catch (e) {
				R.value = i(e, "Failed to load guide."), E.error(R.value);
			} finally {
				qt.value = !1;
			}
		}
		function Qt(e) {
			I.value = e, Zt(e);
		}
		function $t(e) {
			L.value = L.value === e.id ? null : e.id;
		}
		async function en() {
			if (!Yt.value) {
				Yt.value = !0;
				try {
					let e = await T.refreshGuide();
					E.success(`Guide refreshed. ${e} programmes imported.`), await Zt(I.value);
				} catch (e) {
					E.error(i(e, "Guide refresh failed."));
				} finally {
					Yt.value = !1;
				}
			}
		}
		let tn = l(() => qt.value ? "Loading…" : F.value.length > 0 ? `${F.value.length} programmes` : "No programmes"), z = _([]), nn = _(!1), rn = _(!1), B = _("all"), an = [
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
		], on = _(null);
		function sn(e) {
			on.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function cn(e) {
			let t = an.map((e) => ({
				value: e.value,
				label: e.label
			})), n = an.findIndex((e) => e.value === B.value), r = -1;
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
			r >= 0 && (e.preventDefault(), B.value = an[r].value, sn(r));
		}
		let V = _(null);
		async function ln() {
			nn.value = !0, V.value = null;
			try {
				z.value = await T.listRecordings(), rn.value = !0;
			} catch (e) {
				V.value = i(e, "Failed to load recordings."), E.error(V.value);
			} finally {
				nn.value = !1;
			}
		}
		let H = _(null);
		async function un() {
			let e = H.value;
			if (e) try {
				await T.deleteRecording(e.id), z.value = z.value.filter((t) => t.id !== e.id), E.success("Recording deleted."), H.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function dn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let fn = l(() => nn.value ? "Loading…" : `${z.value.length} recording${z.value.length === 1 ? "" : "s"}`), pn = l(() => B.value === "upcoming" ? "No upcoming recordings." : B.value === "by-series" ? "No series recordings." : "No recordings yet."), mn = _(!1), U = _(""), W = _(""), G = _(""), K = _(""), q = _(""), J = _(""), hn = _(!1);
		async function gn() {
			await It(), U.value = A.value[0]?.id ?? "", W.value = "", G.value = "", K.value = "", q.value = "", J.value = "", mn.value = !0;
		}
		function _n() {
			mn.value = !1;
		}
		async function vn() {
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
			hn.value = !0;
			try {
				let n = await T.createRecording({
					channel_id: U.value,
					start_time: e,
					end_time: t,
					title: W.value.trim()
				});
				z.value = [...z.value, n], E.success("Recording scheduled."), _n();
			} catch (e) {
				E.error(i(e, "Failed to schedule recording."));
			} finally {
				hn.value = !1;
			}
		}
		let Y = _([]), yn = _(!1), bn = _(!1), X = _(null);
		async function xn() {
			yn.value = !0, X.value = null;
			try {
				Y.value = await T.listSeriesRules(), bn.value = !0;
			} catch (e) {
				X.value = i(e, "Failed to load series rules."), E.error(X.value);
			} finally {
				yn.value = !1;
			}
		}
		let Z = _(null);
		async function Sn() {
			let e = Z.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), Y.value = Y.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), Z.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete rule.")), Z.value = null;
			}
		}
		let Cn = l(() => yn.value ? "Loading…" : `${Y.value.length} rule${Y.value.length === 1 ? "" : "s"}`), wn = _(!1), Q = _(""), $ = _(""), Tn = _("space"), En = _(3), Dn = _(!1), On = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function kn() {
			await It(), Q.value = "", $.value = A.value[0]?.id ?? "", Tn.value = "space", En.value = 3, wn.value = !0;
		}
		function An() {
			wn.value = !1;
		}
		async function jn() {
			if (!Q.value.trim()) {
				E.error("Title pattern is required.");
				return;
			}
			if (!$.value) {
				E.error("Channel is required.");
				return;
			}
			Dn.value = !0;
			try {
				let e = await T.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: $.value,
					title: Q.value.trim(),
					priority: En.value,
					keep_until: Tn.value
				});
				Y.value = [...Y.value, e], E.success("Series rule created."), An();
			} catch (e) {
				E.error(i(e, "Failed to create rule."));
			} finally {
				Dn.value = !1;
			}
		}
		return pe(() => O.tuners, (e) => {
			e && !zt.value && Ht();
		}, { immediate: !0 }), pe(() => O.guide, (e) => {
			e && !Jt.value && Zt(I.value);
		}), pe(() => O.recordings, (e) => {
			e && !rn.value && ln();
		}), pe(() => O.seriesRules, (e) => {
			e && !bn.value && (xn(), It());
		}), de(() => {}), (e, r) => (g(), f("section", he, [
			r[71] ||= p("header", { class: "admin-livetv__head" }, [p("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			h(oe, null, {
				default: x(() => [...r[23] ||= [
					m(" Set up over-the-air or IPTV channels and record them. In ", -1),
					p("strong", null, "Tuners", -1),
					m(", ", -1),
					p("strong", null, "Scan for Tuners", -1),
					m(" finds devices on your network, which you can then enable or remove. The ", -1),
					p("strong", null, "Guide", -1),
					m(" shows what's on — pick a day and ", -1),
					p("strong", null, "Refresh Guide", -1),
					m(" to update listings. ", -1),
					p("strong", null, "Recordings", -1),
					m(" lists what's scheduled or captured (", -1),
					p("strong", null, "Schedule Recording", -1),
					m(" adds one manually), and ", -1),
					p("strong", null, "Series Rules", -1),
					m(" auto-records a show every time it airs. ", -1)
				]]),
				_: 1
			}),
			p("section", ge, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: r[0] ||= (e) => k("tuners")
			}, [p("span", ve, [
				h(t, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				r[24] ||= p("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				h(t, {
					name: O.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", ye, y(Kt.value), 1)], 8, _e), O.tuners ? (g(), f("div", be, [p("div", xe, [h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Bt.value,
				onClick: Ut
			}, {
				default: x(() => [...r[25] ||= [m(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), M.value ? (g(), f("div", Se, [h(ae, {
				variant: "text",
				lines: 3
			})])) : N.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load tuners",
				description: N.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Ht
				}, {
					default: x(() => [...r[26] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (g(), f("div", Ce, [(g(!0), f(c, null, v(j.value, (e) => (g(), f("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				p("div", we, [p("span", Te, [h(o, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: x(() => [m(y(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), p("span", Ee, y(e.name), 1)]), h(o, { tone: e.enabled ? "success" : "neutral" }, {
					default: x(() => [m(y(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("dl", De, [
					r[30] ||= p("dt", null, "Host", -1),
					p("dd", null, y(e.host) + ":" + y(e.port), 1),
					e.device_id ? (g(), f(c, { key: 0 }, [r[27] ||= p("dt", null, "Device ID", -1), p("dd", null, y(e.device_id), 1)], 64)) : d("", !0),
					e.last_seen ? (g(), f(c, { key: 1 }, [r[28] ||= p("dt", null, "Last Seen", -1), p("dd", null, y(new Date(e.last_seen).toLocaleString()), 1)], 64)) : d("", !0),
					e.status ? (g(), f(c, { key: 2 }, [r[29] ||= p("dt", null, "Status", -1), p("dd", null, y(e.status), 1)], 64)) : d("", !0)
				]),
				p("div", Oe, [h(ne, {
					"model-value": !!e.enabled,
					disabled: Vt[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Wt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), h(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => P.value = e
				}, {
					default: x(() => [...r[31] ||= [m(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : d("", !0)]),
			p("section", ke, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.guide,
				"aria-controls": "livetv-guide-body",
				onClick: r[1] ||= (e) => k("guide")
			}, [p("span", je, [
				h(t, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				r[32] ||= p("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				h(t, {
					name: O.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", Me, y(tn.value), 1)], 8, Ae), O.guide ? (g(), f("div", Ne, [p("div", Pe, [p("div", Fe, [(g(), f(c, null, v(Xt, (e, t) => p("button", {
				key: e,
				type: "button",
				class: ue(["admin-livetv__seg-btn", { "is-active": I.value === t }]),
				"aria-pressed": I.value === t,
				onClick: (e) => Qt(t)
			}, y(e), 11, Ie)), 64))]), h(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Yt.value,
				onClick: en
			}, {
				default: x(() => [...r[33] ||= [m(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), qt.value ? (g(), f("div", Le, [h(ae, {
				variant: "text",
				lines: 4
			})])) : R.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load guide",
				description: R.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: r[2] ||= (e) => Zt(I.value)
				}, {
					default: x(() => [...r[34] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : F.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (g(), f("div", Re, [(g(!0), f(c, null, v(F.value, (e) => (g(), f("div", {
				key: e.id,
				class: ue(["admin-livetv__program", { "is-selected": L.value === e.id }]),
				role: "button",
				tabindex: "0",
				"aria-pressed": L.value === e.id,
				"aria-label": `${e.title}, ${D(e.start_time)} to ${D(e.end_time)}`,
				onClick: (t) => $t(e),
				onKeydown: [me(C((t) => $t(e), ["prevent"]), ["enter"]), me(C((t) => $t(e), ["prevent"]), ["space"])]
			}, [
				p("div", Be, y(D(e.start_time)) + " – " + y(D(e.end_time)), 1),
				p("div", Ve, y(e.title), 1),
				e.description && L.value !== e.id ? (g(), f("p", He, y(e.description.slice(0, 100)) + y(e.description.length > 100 ? "…" : ""), 1)) : d("", !0),
				L.value === e.id ? (g(), f("div", Ue, [e.description ? (g(), f("p", We, y(e.description), 1)) : d("", !0), p("div", Ge, [
					e.rating ? (g(), u(o, {
						key: 0,
						tone: "neutral"
					}, {
						default: x(() => [m("Rating: " + y(e.rating), 1)]),
						_: 2
					}, 1024)) : d("", !0),
					e.season ? (g(), u(o, {
						key: 1,
						tone: "info"
					}, {
						default: x(() => [m(y(Ft(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : d("", !0),
					e.year ? (g(), u(o, {
						key: 2,
						tone: "neutral"
					}, {
						default: x(() => [m(y(e.year), 1)]),
						_: 2
					}, 1024)) : d("", !0)
				])])) : d("", !0)
			], 42, ze))), 128))]))])) : d("", !0)]),
			p("section", Ke, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: r[3] ||= (e) => k("recordings")
			}, [p("span", Je, [
				h(t, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				r[35] ||= p("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				h(t, {
					name: O.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", Ye, y(fn.value), 1)], 8, qe), O.recordings ? (g(), f("div", Xe, [p("div", Ze, [p("div", {
				ref_key: "recTablistEl",
				ref: on,
				class: "admin-livetv__segmented",
				role: "tablist",
				"aria-label": "Recording filter",
				onKeydown: cn
			}, [(g(), f(c, null, v(an, (e) => p("button", {
				id: `rec-tab-${e.value}`,
				key: e.value,
				type: "button",
				role: "tab",
				class: ue(["admin-livetv__seg-btn", { "is-active": B.value === e.value }]),
				"aria-selected": B.value === e.value,
				"aria-controls": `rec-panel-${e.value}`,
				tabindex: B.value === e.value ? 0 : -1,
				onClick: (t) => B.value = e.value
			}, y(e.label), 11, Qe)), 64))], 544), h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: gn
			}, {
				default: x(() => [...r[36] ||= [m(" Schedule Recording ", -1)]]),
				_: 1
			})]), p("div", {
				id: `rec-panel-${B.value}`,
				role: "tabpanel",
				"aria-labelledby": `rec-tab-${B.value}`
			}, [nn.value ? (g(), f("div", et, [h(ae, {
				variant: "text",
				lines: 3
			})])) : V.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recordings",
				description: V.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: ln
				}, {
					default: x(() => [...r[37] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : z.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: pn.value
			}, null, 8, ["description"])) : (g(), f("div", tt, [(g(!0), f(c, null, v(z.value, (e) => (g(), f("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				p("div", nt, [p("span", rt, y(e.program_title ?? "Untitled"), 1), e.status ? (g(), u(o, {
					key: 0,
					tone: dn(e.status)
				}, {
					default: x(() => [m(y(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : d("", !0)]),
				p("div", it, [
					p("span", null, y(e.channel_name ?? e.channel_id), 1),
					p("span", null, y(Nt(e.start_time)) + " · " + y(D(e.start_time)) + " – " + y(D(e.end_time)), 1),
					p("span", null, y(Mt(e.start_time, e.end_time)), 1),
					e.size ? (g(), f("span", at, y(Pt(e.size)), 1)) : d("", !0)
				]),
				p("div", ot, [h(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
				}, {
					default: x(() => [...r[38] ||= [m(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))], 8, $e)])) : d("", !0)]),
			p("section", st, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: r[4] ||= (e) => k("seriesRules")
			}, [p("span", lt, [
				h(t, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				r[39] ||= p("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				h(t, {
					name: O.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", ut, y(Cn.value), 1)], 8, ct), O.seriesRules ? (g(), f("div", dt, [p("div", ft, [h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: kn
			}, {
				default: x(() => [...r[40] ||= [m("Add Rule", -1)]]),
				_: 1
			})]), yn.value ? (g(), f("div", pt, [h(ae, {
				variant: "text",
				lines: 3
			})])) : X.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load series rules",
				description: X.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: xn
				}, {
					default: x(() => [...r[41] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Y.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (g(), f("div", mt, [(g(!0), f(c, null, v(Y.value, (e) => (g(), f("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [p("div", ht, [p("span", gt, y(e.title_pattern), 1), p("div", _t, [
				p("span", null, y(Rt(e)), 1),
				e.priority ? (g(), u(o, {
					key: 0,
					tone: "info"
				}, {
					default: x(() => [m("Priority " + y(e.priority), 1)]),
					_: 2
				}, 1024)) : d("", !0),
				e.keep_until ? (g(), u(o, {
					key: 1,
					tone: "neutral"
				}, {
					default: x(() => [m("Keep: " + y(e.keep_until), 1)]),
					_: 2
				}, 1024)) : d("", !0)
			])]), h(a, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => Z.value = e
			}, {
				default: x(() => [...r[42] ||= [m(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : d("", !0)]),
			h(n, {
				modelValue: mn.value,
				"onUpdate:modelValue": r[11] ||= (e) => mn.value = e,
				title: "Schedule Recording",
				onClose: _n
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: _n
				}, {
					default: x(() => [...r[49] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: hn.value,
					onClick: vn
				}, {
					default: x(() => [...r[50] ||= [m(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: C(vn, ["prevent"])
				}, [
					p("label", vt, [r[43] ||= p("span", { class: "admin-livetv__label" }, "Title", -1), S(p("input", {
						"onUpdate:modelValue": r[5] ||= (e) => W.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[b, W.value]])]),
					p("label", yt, [r[44] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(ie, {
						modelValue: U.value,
						"onUpdate:modelValue": r[6] ||= (e) => U.value = e,
						options: Lt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("div", bt, [p("label", xt, [r[45] ||= p("span", { class: "admin-livetv__label" }, "Start Date", -1), S(p("input", {
						"onUpdate:modelValue": r[7] ||= (e) => G.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, G.value]])]), p("label", St, [r[46] ||= p("span", { class: "admin-livetv__label" }, "Start Time", -1), S(p("input", {
						"onUpdate:modelValue": r[8] ||= (e) => K.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, K.value]])])]),
					p("div", Ct, [p("label", wt, [r[47] ||= p("span", { class: "admin-livetv__label" }, "End Date", -1), S(p("input", {
						"onUpdate:modelValue": r[9] ||= (e) => q.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, q.value]])]), p("label", Tt, [r[48] ||= p("span", { class: "admin-livetv__label" }, "End Time", -1), S(p("input", {
						"onUpdate:modelValue": r[10] ||= (e) => J.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, J.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(n, {
				modelValue: wn.value,
				"onUpdate:modelValue": r[16] ||= (e) => wn.value = e,
				title: "Add Series Rule",
				onClose: An
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: An
				}, {
					default: x(() => [...r[57] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: Dn.value,
					onClick: jn
				}, {
					default: x(() => [...r[58] ||= [m("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: C(jn, ["prevent"])
				}, [
					p("label", Et, [
						r[51] ||= p("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						S(p("input", {
							"onUpdate:modelValue": r[12] ||= (e) => Q.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[b, Q.value]]),
						r[52] ||= p("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					p("label", Dt, [r[53] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(ie, {
						modelValue: $.value,
						"onUpdate:modelValue": r[13] ||= (e) => $.value = e,
						options: Lt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("label", Ot, [
						r[54] ||= p("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						p("input", {
							value: En.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: r[14] ||= (e) => En.value = Number(e.target.value)
						}, null, 40, kt),
						r[55] ||= p("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					p("label", At, [r[56] ||= p("span", { class: "admin-livetv__label" }, "Keep Until", -1), h(ie, {
						modelValue: Tn.value,
						"onUpdate:modelValue": r[15] ||= (e) => Tn.value = e,
						options: On,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(n, {
				"model-value": P.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": r[18] ||= (e) => P.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: r[17] ||= (e) => P.value = null
				}, {
					default: x(() => [...r[61] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: Gt
				}, {
					default: x(() => [...r[62] ||= [m("Remove", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					r[59] ||= m("Remove tuner ", -1),
					p("strong", null, y(P.value?.name), 1),
					r[60] ||= m("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(n, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": r[20] ||= (e) => H.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: r[19] ||= (e) => H.value = null
				}, {
					default: x(() => [...r[65] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: un
				}, {
					default: x(() => [...r[66] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					r[63] ||= m(" Delete recording ", -1),
					p("strong", null, y(H.value?.program_title ?? H.value?.id), 1),
					r[64] ||= m("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(n, {
				"model-value": Z.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": r[22] ||= (e) => Z.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: r[21] ||= (e) => Z.value = null
				}, {
					default: x(() => [...r[69] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: Sn
				}, {
					default: x(() => [...r[70] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					r[67] ||= m("Delete series rule ", -1),
					p("strong", null, y(Z.value?.title_pattern), 1),
					r[68] ||= m("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-1fd1c227"]]);
//#endregion
export { w as default };

//# sourceMappingURL=LiveTvPage-Bie6sLkt.js.map