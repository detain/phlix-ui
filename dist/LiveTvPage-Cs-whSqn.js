import { l as e, t, y as n } from "./client-CW4dUyY-.js";
import { t as r } from "./liveTv-D6s_iVAa.js";
import { t as ee } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as te } from "./PageHint-BlhPmafC.js";
import { t as ne } from "./helpLinks-iarZuNmw.js";
import { t as a } from "./Button-1sKEdGjj.js";
import { t as o } from "./Modal-BU4hJGBA.js";
import { t as re } from "./Select-ChFXd0gU.js";
import { t as ie } from "./Switch-C1Wv5sN2.js";
import { t as ae } from "./Skeleton-B2Mt2L00.js";
import { t as s } from "./EmptyState-BjOJ1k_A.js";
import { n as oe, t as c } from "./Icon-CIbfiPrs.js";
import { n as se } from "./listbox-Dr6NFVBJ.js";
import { a as l } from "./plural-B3O2rVPV.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as ce, inject as le, normalizeClass as ue, onMounted as de, openBlock as v, reactive as fe, ref as y, renderList as b, toDisplayString as x, unref as pe, vModelText as S, watch as me, withCtx as C, withDirectives as w, withKeys as he, withModifiers as ge } from "vue";
// src/pages/admin/LiveTvPage.vue?vue&type=script&setup=true&lang.ts
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
}, _t = { class: "admin-livetv__rule-info" }, vt = { class: "admin-livetv__rule-title" }, yt = { class: "admin-livetv__rule-meta" }, bt = { class: "admin-livetv__field" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field-row" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field-row" }, Et = { class: "admin-livetv__field" }, Dt = { class: "admin-livetv__field" }, Ot = { class: "admin-livetv__field" }, kt = { class: "admin-livetv__field" }, At = { class: "admin-livetv__field" }, jt = ["value"], Mt = { class: "admin-livetv__field" }, T = /*#__PURE__*/ oe(/* @__PURE__ */ ce({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(oe) {
		let ce = oe, T = le("apiBase", ""), Nt = d(() => typeof T == "string" ? T : T?.value ?? ""), E = new r(ce.client ?? new t({
			baseUrl: Nt.value,
			tokenStore: new e()
		})), D = ee();
		function Pt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), ee = n % 60;
			return ee > 0 ? `${r}h ${ee}m` : `${r}h`;
		}
		function Ft(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function O(e) {
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
		let k = fe({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function Rt(e) {
			k[e] = !k[e];
		}
		let A = y([]);
		async function zt() {
			try {
				A.value = await E.listChannels();
			} catch {}
		}
		let Bt = d(() => A.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Vt(e) {
			let t = A.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let j = y([]), Ht = y(!1), Ut = y(!1), Wt = y(!1), Gt = fe({}), M = y(null);
		async function Kt() {
			Ht.value = !0, M.value = null;
			try {
				j.value = await E.listTuners(), Ut.value = !0;
			} catch (e) {
				M.value = n(e, "Failed to load tuners."), D.error(M.value);
			} finally {
				Ht.value = !1;
			}
		}
		async function qt() {
			if (!Wt.value) {
				Wt.value = !0;
				try {
					let e = await E.scanTuners();
					j.value = e, Ut.value = !0, D.success(`Scan complete. Found ${l(e.length, "tuner", "tuners")}.`);
				} catch (e) {
					D.error(n(e, "Tuner scan failed."));
				} finally {
					Wt.value = !1;
				}
			}
		}
		async function Jt(e) {
			if (!Gt[e.tuner_id]) {
				Gt[e.tuner_id] = !0;
				try {
					let t = await E.updateTuner(e.tuner_id, { enabled: !e.enabled });
					j.value = j.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					D.error(n(e, "Failed to update tuner."));
				} finally {
					Gt[e.tuner_id] = !1;
				}
			}
		}
		let N = y(null);
		async function Yt() {
			let e = N.value;
			if (e) try {
				await E.deleteTuner(e.tuner_id), j.value = j.value.filter((t) => t.tuner_id !== e.tuner_id), D.success("Tuner removed."), N.value = null;
			} catch (e) {
				D.error(n(e, "Failed to delete tuner.")), N.value = null;
			}
		}
		let Xt = d(() => Ht.value ? "Loading…" : j.value.length === 0 ? "No tuners found" : `${l(j.value.length, "tuner", "tuners")} configured`), P = y([]), Zt = y(!1), Qt = y(!1), F = y(0), I = y(null), $t = y(!1), en = [
			"Today",
			"+1 Day",
			"+2 Days"
		], L = y(null);
		async function tn(e) {
			Zt.value = !0, L.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				P.value = await E.listGuide({
					from: t,
					to: n
				}), Qt.value = !0;
			} catch (e) {
				L.value = n(e, "Failed to load guide."), D.error(L.value);
			} finally {
				Zt.value = !1;
			}
		}
		function nn(e) {
			F.value = e, tn(e);
		}
		function rn(e) {
			I.value = I.value === e.id ? null : e.id;
		}
		async function an() {
			if (!$t.value) {
				$t.value = !0;
				try {
					let e = await E.refreshGuide();
					D.success(`Guide refreshed. ${l(e, "programme", "programmes")} imported.`), await tn(F.value);
				} catch (e) {
					D.error(n(e, "Guide refresh failed."));
				} finally {
					$t.value = !1;
				}
			}
		}
		let on = d(() => Zt.value ? "Loading…" : P.value.length === 0 ? "No programmes" : l(P.value.length, "programme", "programmes")), R = y([]), sn = y(!1), cn = y(!1), z = y("all"), ln = [
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
		], un = y(null);
		function dn(e) {
			un.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function fn(e) {
			let t = ln.map((e) => ({
				value: e.value,
				label: e.label
			})), n = ln.findIndex((e) => e.value === z.value), r = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					r = se(t, n, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					r = se(t, n, -1);
					break;
				case "Home":
					r = se(t, -1, 1);
					break;
				case "End":
					r = se(t, 0, -1);
					break;
				default: return;
			}
			r >= 0 && (e.preventDefault(), z.value = ln[r].value, dn(r));
		}
		let B = y(null);
		async function pn() {
			sn.value = !0, B.value = null;
			try {
				R.value = await E.listRecordings(), cn.value = !0;
			} catch (e) {
				B.value = n(e, "Failed to load recordings."), D.error(B.value);
			} finally {
				sn.value = !1;
			}
		}
		let V = y(null);
		async function mn() {
			let e = V.value;
			if (e) try {
				await E.deleteRecording(e.id), R.value = R.value.filter((t) => t.id !== e.id), D.success("Recording deleted."), V.value = null;
			} catch (e) {
				D.error(n(e, "Failed to delete recording.")), V.value = null;
			}
		}
		function hn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let gn = d(() => sn.value ? "Loading…" : l(R.value.length, "recording", "recordings")), _n = d(() => z.value === "upcoming" ? "No upcoming recordings." : z.value === "by-series" ? "No series recordings." : "No recordings yet."), vn = y(!1), H = y(""), U = y(""), W = y(""), G = y(""), K = y(""), q = y(""), yn = y(!1);
		async function bn() {
			await zt(), H.value = A.value[0]?.id ?? "", U.value = "", W.value = "", G.value = "", K.value = "", q.value = "", vn.value = !0;
		}
		function xn() {
			vn.value = !1;
		}
		async function Sn() {
			if (!H.value) {
				D.error("Channel is required.");
				return;
			}
			if (!U.value.trim()) {
				D.error("Title is required.");
				return;
			}
			if (!W.value || !G.value || !K.value || !q.value) {
				D.error("Start and end date/time are required.");
				return;
			}
			let e = Math.floor((/* @__PURE__ */ new Date(`${W.value}T${G.value}`)).getTime() / 1e3), t = Math.floor((/* @__PURE__ */ new Date(`${K.value}T${q.value}`)).getTime() / 1e3);
			if (t <= e) D.error("End must be after start.");
			else {
				yn.value = !0;
				try {
					let n = await E.createRecording({
						channel_id: H.value,
						start_time: e,
						end_time: t,
						title: U.value.trim()
					});
					R.value = [...R.value, n], D.success("Recording scheduled."), xn();
				} catch (e) {
					D.error(n(e, "Failed to schedule recording."));
				} finally {
					yn.value = !1;
				}
			}
		}
		let J = y([]), Cn = y(!1), wn = y(!1), Y = y(null);
		async function Tn() {
			Cn.value = !0, Y.value = null;
			try {
				J.value = await E.listSeriesRules(), wn.value = !0;
			} catch (e) {
				Y.value = n(e, "Failed to load series rules."), D.error(Y.value);
			} finally {
				Cn.value = !1;
			}
		}
		let X = y(null);
		async function En() {
			let e = X.value;
			if (e) try {
				await E.deleteSeriesRule(e.id), J.value = J.value.filter((t) => t.id !== e.id), D.success("Series rule deleted."), X.value = null;
			} catch (e) {
				D.error(n(e, "Failed to delete rule.")), X.value = null;
			}
		}
		let Dn = d(() => Cn.value ? "Loading…" : l(J.value.length, "rule", "rules")), On = y(!1), Z = y(""), Q = y(""), $ = y("space"), kn = y(3), An = y(!1), jn = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function Mn() {
			await zt(), Z.value = "", Q.value = A.value[0]?.id ?? "", $.value = "space", kn.value = 3, On.value = !0;
		}
		function Nn() {
			On.value = !1;
		}
		async function Pn() {
			if (!Z.value.trim()) D.error("Title pattern is required.");
			else if (!Q.value) D.error("Channel is required.");
			else {
				An.value = !0;
				try {
					let e = await E.createSeriesRule({
						series_id: `local-${Date.now()}`,
						channel_id: Q.value,
						title: Z.value.trim(),
						priority: kn.value,
						keep_until: $.value
					});
					J.value = [...J.value, e], D.success("Series rule created."), Nn();
				} catch (e) {
					D.error(n(e, "Failed to create rule."));
				} finally {
					An.value = !1;
				}
			}
		}
		return me(() => k.tuners, (e) => {
			e && !Ut.value && Kt();
		}, { immediate: !0 }), me(() => k.guide, (e) => {
			e && !Qt.value && tn(F.value);
		}), me(() => k.recordings, (e) => {
			e && !cn.value && pn();
		}), me(() => k.seriesRules, (e) => {
			e && !wn.value && (Tn(), zt());
		}), de(() => {}), (e, t) => (v(), m("section", _e, [
			t[71] ||= h("header", { class: "admin-livetv__head" }, [h("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			_(te, {
				links: pe(ne).livetv.links,
				details: pe(ne).livetv.details
			}, {
				default: C(() => [...t[23] ||= [
					g(" Set up over-the-air or IPTV channels and record them. In ", -1),
					h("strong", null, "Tuners", -1),
					g(", ", -1),
					h("strong", null, "Scan for Tuners", -1),
					g(" finds devices on your network, which you can then enable or remove. The ", -1),
					h("strong", null, "Guide", -1),
					g(" shows what's on — pick a day and ", -1),
					h("strong", null, "Refresh Guide", -1),
					g(" to update listings. ", -1),
					h("strong", null, "Recordings", -1),
					g(" lists what's scheduled or captured (", -1),
					h("strong", null, "Schedule Recording", -1),
					g(" adds one manually), and ", -1),
					h("strong", null, "Series Rules", -1),
					g(" stores a per-show rule — see below before relying on it. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			h("section", ve, [h("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: t[0] ||= (e) => Rt("tuners")
			}, [h("span", be, [
				_(c, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				t[24] ||= h("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				_(c, {
					name: k.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), h("span", xe, x(Xt.value), 1)], 8, ye), k.tuners ? (v(), m("div", Se, [h("div", Ce, [_(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Wt.value,
				onClick: qt
			}, {
				default: C(() => [...t[25] ||= [g(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Ht.value ? (v(), m("div", we, [_(ae, {
				variant: "text",
				lines: 3
			})])) : M.value ? (v(), f(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load tuners",
				description: M.value
			}, {
				actions: C(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Kt
				}, {
					default: C(() => [...t[26] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (v(), f(s, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (v(), m("div", Te, [(v(!0), m(u, null, b(j.value, (e) => (v(), m("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				h("div", Ee, [h("span", De, [_(i, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: C(() => [g(x(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), h("span", Oe, x(e.name), 1)]), _(i, { tone: e.enabled ? "success" : "neutral" }, {
					default: C(() => [g(x(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				h("dl", ke, [
					t[30] ||= h("dt", null, "Host", -1),
					h("dd", null, x(e.host) + ":" + x(e.port), 1),
					e.device_id ? (v(), m(u, { key: 0 }, [t[27] ||= h("dt", null, "Device ID", -1), h("dd", null, x(e.device_id), 1)], 64)) : p("", !0),
					e.last_seen ? (v(), m(u, { key: 1 }, [t[28] ||= h("dt", null, "Last Seen", -1), h("dd", null, x(new Date(e.last_seen).toLocaleString()), 1)], 64)) : p("", !0),
					e.status ? (v(), m(u, { key: 2 }, [t[29] ||= h("dt", null, "Status", -1), h("dd", null, x(e.status), 1)], 64)) : p("", !0)
				]),
				h("div", Ae, [_(ie, {
					"model-value": !!e.enabled,
					disabled: Gt[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Jt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), _(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => N.value = e
				}, {
					default: C(() => [...t[31] ||= [g(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : p("", !0)]),
			h("section", je, [h("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.guide,
				"aria-controls": "livetv-guide-body",
				onClick: t[1] ||= (e) => Rt("guide")
			}, [h("span", Ne, [
				_(c, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				t[32] ||= h("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				_(c, {
					name: k.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), h("span", Pe, x(on.value), 1)], 8, Me), k.guide ? (v(), m("div", Fe, [h("div", Ie, [h("div", Le, [(v(), m(u, null, b(en, (e, t) => h("button", {
				key: e,
				type: "button",
				class: ue(["admin-livetv__seg-btn", { "is-active": F.value === t }]),
				"aria-pressed": F.value === t,
				onClick: (e) => nn(t)
			}, x(e), 11, Re)), 64))]), _(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: $t.value,
				onClick: an
			}, {
				default: C(() => [...t[33] ||= [g(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Zt.value ? (v(), m("div", ze, [_(ae, {
				variant: "text",
				lines: 4
			})])) : L.value ? (v(), f(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load guide",
				description: L.value
			}, {
				actions: C(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[2] ||= (e) => tn(F.value)
				}, {
					default: C(() => [...t[34] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : P.value.length === 0 ? (v(), f(s, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (v(), m("div", Be, [(v(!0), m(u, null, b(P.value, (e) => (v(), m("div", {
				key: e.id,
				class: ue(["admin-livetv__program", { "is-selected": I.value === e.id }]),
				role: "button",
				tabindex: "0",
				"aria-pressed": I.value === e.id,
				"aria-label": `${e.title}, ${O(e.start_time)} to ${O(e.end_time)}`,
				onClick: (t) => rn(e),
				onKeydown: [he(ge((t) => rn(e), ["prevent"]), ["enter"]), he(ge((t) => rn(e), ["prevent"]), ["space"])]
			}, [
				h("div", He, x(O(e.start_time)) + " – " + x(O(e.end_time)), 1),
				h("div", Ue, x(e.title), 1),
				e.description && I.value !== e.id ? (v(), m("p", We, x(e.description.slice(0, 100)) + x(e.description.length > 100 ? "…" : ""), 1)) : p("", !0),
				I.value === e.id ? (v(), m("div", Ge, [e.description ? (v(), m("p", Ke, x(e.description), 1)) : p("", !0), h("div", qe, [
					e.rating ? (v(), f(i, {
						key: 0,
						tone: "neutral"
					}, {
						default: C(() => [g("Rating: " + x(e.rating), 1)]),
						_: 2
					}, 1024)) : p("", !0),
					e.season ? (v(), f(i, {
						key: 1,
						tone: "info"
					}, {
						default: C(() => [g(x(Lt(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : p("", !0),
					e.year ? (v(), f(i, {
						key: 2,
						tone: "neutral"
					}, {
						default: C(() => [g(x(e.year), 1)]),
						_: 2
					}, 1024)) : p("", !0)
				])])) : p("", !0)
			], 42, Ve))), 128))]))])) : p("", !0)]),
			h("section", Je, [h("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: t[3] ||= (e) => Rt("recordings")
			}, [h("span", Xe, [
				_(c, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				t[35] ||= h("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				_(c, {
					name: k.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), h("span", Ze, x(gn.value), 1)], 8, Ye), k.recordings ? (v(), m("div", Qe, [h("div", $e, [h("div", {
				ref_key: "recTablistEl",
				ref: un,
				class: "admin-livetv__segmented",
				role: "tablist",
				"aria-label": "Recording filter",
				onKeydown: fn
			}, [(v(), m(u, null, b(ln, (e) => h("button", {
				id: `rec-tab-${e.value}`,
				key: e.value,
				type: "button",
				role: "tab",
				class: ue(["admin-livetv__seg-btn", { "is-active": z.value === e.value }]),
				"aria-selected": z.value === e.value,
				"aria-controls": `rec-panel-${e.value}`,
				tabindex: z.value === e.value ? 0 : -1,
				onClick: (t) => z.value = e.value
			}, x(e.label), 11, et)), 64))], 544), _(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: bn
			}, {
				default: C(() => [...t[36] ||= [g(" Schedule Recording ", -1)]]),
				_: 1
			})]), h("div", {
				id: `rec-panel-${z.value}`,
				role: "tabpanel",
				"aria-labelledby": `rec-tab-${z.value}`
			}, [sn.value ? (v(), m("div", nt, [_(ae, {
				variant: "text",
				lines: 3
			})])) : B.value ? (v(), f(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load recordings",
				description: B.value
			}, {
				actions: C(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: pn
				}, {
					default: C(() => [...t[37] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : R.value.length === 0 ? (v(), f(s, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: _n.value
			}, null, 8, ["description"])) : (v(), m("div", rt, [(v(!0), m(u, null, b(R.value, (e) => (v(), m("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				h("div", it, [h("span", at, x(e.program_title ?? "Untitled"), 1), e.status ? (v(), f(i, {
					key: 0,
					tone: hn(e.status)
				}, {
					default: C(() => [g(x(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : p("", !0)]),
				h("div", ot, [
					h("span", null, x(e.channel_name ?? e.channel_id), 1),
					h("span", null, x(Ft(e.start_time)) + " · " + x(O(e.start_time)) + " – " + x(O(e.end_time)), 1),
					h("span", null, x(Pt(e.start_time, e.end_time)), 1),
					e.size ? (v(), m("span", st, x(It(e.size)), 1)) : p("", !0)
				]),
				h("div", ct, [_(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => V.value = e
				}, {
					default: C(() => [...t[38] ||= [g(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))], 8, tt)])) : p("", !0)]),
			h("section", lt, [h("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: t[4] ||= (e) => Rt("seriesRules")
			}, [h("span", dt, [
				_(c, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				t[39] ||= h("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				_(c, {
					name: k.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), h("span", ft, x(Dn.value), 1)], 8, ut), k.seriesRules ? (v(), m("div", pt, [h("div", mt, [_(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Mn
			}, {
				default: C(() => [...t[40] ||= [g("Add Rule", -1)]]),
				_: 1
			})]), Cn.value ? (v(), m("div", ht, [_(ae, {
				variant: "text",
				lines: 3
			})])) : Y.value ? (v(), f(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load series rules",
				description: Y.value
			}, {
				actions: C(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Tn
				}, {
					default: C(() => [...t[41] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value.length === 0 ? (v(), f(s, {
				key: 2,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (v(), m("div", gt, [(v(!0), m(u, null, b(J.value, (e) => (v(), m("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [h("div", _t, [h("span", vt, x(e.title_pattern), 1), h("div", yt, [
				h("span", null, x(Vt(e)), 1),
				e.priority ? (v(), f(i, {
					key: 0,
					tone: "info"
				}, {
					default: C(() => [g("Priority " + x(e.priority), 1)]),
					_: 2
				}, 1024)) : p("", !0),
				e.keep_until ? (v(), f(i, {
					key: 1,
					tone: "neutral"
				}, {
					default: C(() => [g("Keep: " + x(e.keep_until), 1)]),
					_: 2
				}, 1024)) : p("", !0)
			])]), _(a, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => X.value = e
			}, {
				default: C(() => [...t[42] ||= [g(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : p("", !0)]),
			_(o, {
				modelValue: vn.value,
				"onUpdate:modelValue": t[11] ||= (e) => vn.value = e,
				title: "Schedule Recording",
				onClose: xn
			}, {
				footer: C(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: xn
				}, {
					default: C(() => [...t[49] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					loading: yn.value,
					onClick: Sn
				}, {
					default: C(() => [...t[50] ||= [g(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [h("form", {
					class: "admin-livetv__form",
					onSubmit: ge(Sn, ["prevent"])
				}, [
					h("label", bt, [t[43] ||= h("span", { class: "admin-livetv__label" }, "Title", -1), w(h("input", {
						"onUpdate:modelValue": t[5] ||= (e) => U.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[S, U.value]])]),
					h("label", xt, [t[44] ||= h("span", { class: "admin-livetv__label" }, "Channel", -1), _(re, {
						modelValue: H.value,
						"onUpdate:modelValue": t[6] ||= (e) => H.value = e,
						options: Bt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					h("div", St, [h("label", Ct, [t[45] ||= h("span", { class: "admin-livetv__label" }, "Start Date", -1), w(h("input", {
						"onUpdate:modelValue": t[7] ||= (e) => W.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[S, W.value]])]), h("label", wt, [t[46] ||= h("span", { class: "admin-livetv__label" }, "Start Time", -1), w(h("input", {
						"onUpdate:modelValue": t[8] ||= (e) => G.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[S, G.value]])])]),
					h("div", Tt, [h("label", Et, [t[47] ||= h("span", { class: "admin-livetv__label" }, "End Date", -1), w(h("input", {
						"onUpdate:modelValue": t[9] ||= (e) => K.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[S, K.value]])]), h("label", Dt, [t[48] ||= h("span", { class: "admin-livetv__label" }, "End Time", -1), w(h("input", {
						"onUpdate:modelValue": t[10] ||= (e) => q.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[S, q.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(o, {
				modelValue: On.value,
				"onUpdate:modelValue": t[16] ||= (e) => On.value = e,
				title: "Add Series Rule",
				onClose: Nn
			}, {
				footer: C(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: Nn
				}, {
					default: C(() => [...t[57] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					loading: An.value,
					onClick: Pn
				}, {
					default: C(() => [...t[58] ||= [g("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [h("form", {
					class: "admin-livetv__form",
					onSubmit: ge(Pn, ["prevent"])
				}, [
					h("label", Ot, [
						t[51] ||= h("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						w(h("input", {
							"onUpdate:modelValue": t[12] ||= (e) => Z.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[S, Z.value]]),
						t[52] ||= h("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					h("label", kt, [t[53] ||= h("span", { class: "admin-livetv__label" }, "Channel", -1), _(re, {
						modelValue: Q.value,
						"onUpdate:modelValue": t[13] ||= (e) => Q.value = e,
						options: Bt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					h("label", At, [
						t[54] ||= h("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						h("input", {
							value: kn.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: t[14] ||= (e) => kn.value = Number(e.target.value)
						}, null, 40, jt),
						t[55] ||= h("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					h("label", Mt, [t[56] ||= h("span", { class: "admin-livetv__label" }, "Keep Until", -1), _(re, {
						modelValue: $.value,
						"onUpdate:modelValue": t[15] ||= (e) => $.value = e,
						options: jn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(o, {
				"model-value": N.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": t[18] ||= (e) => N.value = null
			}, {
				footer: C(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[17] ||= (e) => N.value = null
				}, {
					default: C(() => [...t[61] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "danger",
					size: "sm",
					onClick: Yt
				}, {
					default: C(() => [...t[62] ||= [g("Remove", -1)]]),
					_: 1
				})]),
				default: C(() => [h("p", null, [
					t[59] ||= g("Remove tuner ", -1),
					h("strong", null, x(N.value?.name), 1),
					t[60] ||= g("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(o, {
				"model-value": V.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": t[20] ||= (e) => V.value = null
			}, {
				footer: C(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[19] ||= (e) => V.value = null
				}, {
					default: C(() => [...t[65] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "danger",
					size: "sm",
					onClick: mn
				}, {
					default: C(() => [...t[66] ||= [g("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [h("p", null, [
					t[63] ||= g(" Delete recording ", -1),
					h("strong", null, x(V.value?.program_title ?? V.value?.id), 1),
					t[64] ||= g("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(o, {
				"model-value": X.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": t[22] ||= (e) => X.value = null
			}, {
				footer: C(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[21] ||= (e) => X.value = null
				}, {
					default: C(() => [...t[69] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "danger",
					size: "sm",
					onClick: En
				}, {
					default: C(() => [...t[70] ||= [g("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [h("p", null, [
					t[67] ||= g("Delete series rule ", -1),
					h("strong", null, x(X.value?.title_pattern), 1),
					t[68] ||= g("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-d72d0685"]]);
export { T as default };

//# sourceMappingURL=LiveTvPage-Cs-whSqn.js.map