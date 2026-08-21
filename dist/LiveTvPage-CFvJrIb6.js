import { n as e, t } from "./Icon-CkTBN_k5.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { l as r, p as i, t as ee } from "./client-COHWZ2KC.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-Cw8Wl4QR.js";
import { t as o } from "./Badge-D1_MN41Y.js";
import { t as ne } from "./Switch-H74PI5Oy.js";
import { n as re } from "./listbox-htyKA_G5.js";
import { t as ie } from "./Select-R1FOrNRB.js";
import { t as s } from "./Modal-Cfz25d3h.js";
import { t as ae } from "./Skeleton-C3OpJbf1.js";
import { t as c } from "./EmptyState-CwWtkhEJ.js";
import { t as oe } from "./PageHint-3dL7qb5N.js";
import { t as se } from "./liveTv-Dbjt901v.js";
import { t as ce } from "./helpLinks-ya0IGJSe.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as le, inject as ue, normalizeClass as de, onMounted as fe, openBlock as _, reactive as pe, ref as v, renderList as y, toDisplayString as b, unref as me, vModelText as x, watch as he, withCtx as S, withDirectives as C, withKeys as ge, withModifiers as _e } from "vue";
//#region src/pages/admin/LiveTvPage.vue?vue&type=script&setup=true&lang.ts
var ve = {
	class: "admin-livetv",
	"aria-labelledby": "livetv-heading"
}, ye = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-tuners-heading"
}, be = ["aria-expanded"], xe = { class: "admin-livetv__section-title-row" }, Se = { class: "admin-livetv__section-summary" }, Ce = {
	key: 0,
	id: "livetv-tuners-body",
	class: "admin-livetv__section-body"
}, we = { class: "admin-livetv__toolbar" }, Te = {
	key: 0,
	class: "admin-livetv__skel"
}, Ee = {
	key: 3,
	class: "admin-livetv__card-grid"
}, De = { class: "admin-livetv__card-head" }, Oe = { class: "admin-livetv__card-title-row" }, ke = { class: "admin-livetv__card-name" }, Ae = { class: "admin-livetv__dl" }, je = { class: "admin-livetv__card-actions" }, Me = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-guide-heading"
}, Ne = ["aria-expanded"], Pe = { class: "admin-livetv__section-title-row" }, Fe = { class: "admin-livetv__section-summary" }, Ie = {
	key: 0,
	id: "livetv-guide-body",
	class: "admin-livetv__section-body"
}, Le = { class: "admin-livetv__toolbar" }, Re = {
	class: "admin-livetv__segmented",
	role: "group",
	"aria-label": "Guide date"
}, ze = ["aria-pressed", "onClick"], Be = {
	key: 0,
	class: "admin-livetv__skel"
}, Ve = {
	key: 3,
	class: "admin-livetv__guide-grid"
}, He = [
	"aria-pressed",
	"aria-label",
	"onClick",
	"onKeydown"
], Ue = { class: "admin-livetv__program-time" }, We = { class: "admin-livetv__program-title" }, Ge = {
	key: 0,
	class: "admin-livetv__program-desc"
}, Ke = {
	key: 1,
	class: "admin-livetv__program-expanded"
}, qe = {
	key: 0,
	class: "admin-livetv__program-full-desc"
}, Je = { class: "admin-livetv__program-meta" }, Ye = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-recordings-heading"
}, Xe = ["aria-expanded"], Ze = { class: "admin-livetv__section-title-row" }, Qe = { class: "admin-livetv__section-summary" }, $e = {
	key: 0,
	id: "livetv-recordings-body",
	class: "admin-livetv__section-body"
}, et = { class: "admin-livetv__toolbar" }, tt = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"onClick"
], nt = ["id", "aria-labelledby"], rt = {
	key: 0,
	class: "admin-livetv__skel"
}, it = {
	key: 3,
	class: "admin-livetv__rec-list"
}, at = { class: "admin-livetv__card-head" }, ot = { class: "admin-livetv__card-name" }, st = { class: "admin-livetv__rec-meta" }, ct = { key: 0 }, lt = { class: "admin-livetv__card-actions" }, ut = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-rules-heading"
}, dt = ["aria-expanded"], ft = { class: "admin-livetv__section-title-row" }, pt = { class: "admin-livetv__section-summary" }, mt = {
	key: 0,
	id: "livetv-rules-body",
	class: "admin-livetv__section-body"
}, ht = { class: "admin-livetv__toolbar" }, gt = {
	key: 0,
	class: "admin-livetv__skel"
}, _t = {
	key: 3,
	class: "admin-livetv__rule-list"
}, vt = { class: "admin-livetv__rule-info" }, yt = { class: "admin-livetv__rule-title" }, bt = { class: "admin-livetv__rule-meta" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field" }, Ct = { class: "admin-livetv__field-row" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = { class: "admin-livetv__field-row" }, Dt = { class: "admin-livetv__field" }, Ot = { class: "admin-livetv__field" }, kt = { class: "admin-livetv__field" }, At = { class: "admin-livetv__field" }, jt = { class: "admin-livetv__field" }, Mt = ["value"], Nt = { class: "admin-livetv__field" }, w = /*#__PURE__*/ e(/* @__PURE__ */ le({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(e) {
		let le = e, w = ue("apiBase", ""), Pt = u(() => typeof w == "string" ? w : w?.value ?? ""), T = new se(le.client ?? new ee({
			baseUrl: Pt.value,
			tokenStore: new r()
		})), E = te();
		function Ft(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), i = n % 60;
			return i > 0 ? `${r}h ${i}m` : `${r}h`;
		}
		function It(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function D(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function Lt(e) {
			return `${(e / 1024 / 1024).toFixed(1)} MB`;
		}
		function Rt(e, t) {
			return `S${String(e ?? 0).padStart(2, "0")}E${String(t ?? 0).padStart(2, "0")}`;
		}
		let O = pe({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function k(e) {
			O[e] = !O[e];
		}
		let A = v([]);
		async function zt() {
			try {
				A.value = await T.listChannels();
			} catch {}
		}
		let Bt = u(() => A.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Vt(e) {
			let t = A.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let j = v([]), Ht = v(!1), Ut = v(!1), Wt = v(!1), Gt = pe({}), M = v(null);
		async function Kt() {
			Ht.value = !0, M.value = null;
			try {
				j.value = await T.listTuners(), Ut.value = !0;
			} catch (e) {
				M.value = i(e, "Failed to load tuners."), E.error(M.value);
			} finally {
				Ht.value = !1;
			}
		}
		async function qt() {
			if (!Wt.value) {
				Wt.value = !0;
				try {
					let e = await T.scanTuners();
					j.value = e, Ut.value = !0, E.success(`Scan complete. Found ${n(e.length, "tuner", "tuners")}.`);
				} catch (e) {
					E.error(i(e, "Tuner scan failed."));
				} finally {
					Wt.value = !1;
				}
			}
		}
		async function Jt(e) {
			if (!Gt[e.tuner_id]) {
				Gt[e.tuner_id] = !0;
				try {
					let t = await T.updateTuner(e.tuner_id, { enabled: !e.enabled });
					j.value = j.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					E.error(i(e, "Failed to update tuner."));
				} finally {
					Gt[e.tuner_id] = !1;
				}
			}
		}
		let N = v(null);
		async function Yt() {
			let e = N.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), j.value = j.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), N.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete tuner.")), N.value = null;
			}
		}
		let Xt = u(() => Ht.value ? "Loading…" : j.value.length === 0 ? "No tuners found" : `${n(j.value.length, "tuner", "tuners")} configured`), P = v([]), Zt = v(!1), Qt = v(!1), F = v(0), I = v(null), $t = v(!1), en = [
			"Today",
			"+1 Day",
			"+2 Days"
		], L = v(null);
		async function tn(e) {
			Zt.value = !0, L.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				P.value = await T.listGuide({
					from: t,
					to: n
				}), Qt.value = !0;
			} catch (e) {
				L.value = i(e, "Failed to load guide."), E.error(L.value);
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
					let e = await T.refreshGuide();
					E.success(`Guide refreshed. ${n(e, "programme", "programmes")} imported.`), await tn(F.value);
				} catch (e) {
					E.error(i(e, "Guide refresh failed."));
				} finally {
					$t.value = !1;
				}
			}
		}
		let on = u(() => Zt.value ? "Loading…" : P.value.length === 0 ? "No programmes" : n(P.value.length, "programme", "programmes")), R = v([]), sn = v(!1), cn = v(!1), z = v("all"), ln = [
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
		], un = v(null);
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
			r >= 0 && (e.preventDefault(), z.value = ln[r].value, dn(r));
		}
		let B = v(null);
		async function pn() {
			sn.value = !0, B.value = null;
			try {
				R.value = await T.listRecordings(), cn.value = !0;
			} catch (e) {
				B.value = i(e, "Failed to load recordings."), E.error(B.value);
			} finally {
				sn.value = !1;
			}
		}
		let V = v(null);
		async function mn() {
			let e = V.value;
			if (e) try {
				await T.deleteRecording(e.id), R.value = R.value.filter((t) => t.id !== e.id), E.success("Recording deleted."), V.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete recording.")), V.value = null;
			}
		}
		function hn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let gn = u(() => sn.value ? "Loading…" : n(R.value.length, "recording", "recordings")), _n = u(() => z.value === "upcoming" ? "No upcoming recordings." : z.value === "by-series" ? "No series recordings." : "No recordings yet."), vn = v(!1), H = v(""), U = v(""), W = v(""), G = v(""), K = v(""), q = v(""), yn = v(!1);
		async function bn() {
			await zt(), H.value = A.value[0]?.id ?? "", U.value = "", W.value = "", G.value = "", K.value = "", q.value = "", vn.value = !0;
		}
		function xn() {
			vn.value = !1;
		}
		async function Sn() {
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
			yn.value = !0;
			try {
				let n = await T.createRecording({
					channel_id: H.value,
					start_time: e,
					end_time: t,
					title: U.value.trim()
				});
				R.value = [...R.value, n], E.success("Recording scheduled."), xn();
			} catch (e) {
				E.error(i(e, "Failed to schedule recording."));
			} finally {
				yn.value = !1;
			}
		}
		let J = v([]), Cn = v(!1), wn = v(!1), Y = v(null);
		async function Tn() {
			Cn.value = !0, Y.value = null;
			try {
				J.value = await T.listSeriesRules(), wn.value = !0;
			} catch (e) {
				Y.value = i(e, "Failed to load series rules."), E.error(Y.value);
			} finally {
				Cn.value = !1;
			}
		}
		let X = v(null);
		async function En() {
			let e = X.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), J.value = J.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), X.value = null;
			} catch (e) {
				E.error(i(e, "Failed to delete rule.")), X.value = null;
			}
		}
		let Dn = u(() => Cn.value ? "Loading…" : n(J.value.length, "rule", "rules")), On = v(!1), Z = v(""), Q = v(""), $ = v("space"), kn = v(3), An = v(!1), jn = [{
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
			if (!Z.value.trim()) {
				E.error("Title pattern is required.");
				return;
			}
			if (!Q.value) {
				E.error("Channel is required.");
				return;
			}
			An.value = !0;
			try {
				let e = await T.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: Q.value,
					title: Z.value.trim(),
					priority: kn.value,
					keep_until: $.value
				});
				J.value = [...J.value, e], E.success("Series rule created."), Nn();
			} catch (e) {
				E.error(i(e, "Failed to create rule."));
			} finally {
				An.value = !1;
			}
		}
		return he(() => O.tuners, (e) => {
			e && !Ut.value && Kt();
		}, { immediate: !0 }), he(() => O.guide, (e) => {
			e && !Qt.value && tn(F.value);
		}), he(() => O.recordings, (e) => {
			e && !cn.value && pn();
		}), he(() => O.seriesRules, (e) => {
			e && !wn.value && (Tn(), zt());
		}), fe(() => {}), (e, n) => (_(), p("section", ve, [
			n[71] ||= m("header", { class: "admin-livetv__head" }, [m("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			g(oe, {
				links: me(ce).livetv.links,
				details: me(ce).livetv.details
			}, {
				default: S(() => [...n[23] ||= [
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
			m("section", ye, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: n[0] ||= (e) => k("tuners")
			}, [m("span", xe, [
				g(t, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				n[24] ||= m("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				g(t, {
					name: O.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", Se, b(Xt.value), 1)], 8, be), O.tuners ? (_(), p("div", Ce, [m("div", we, [g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Wt.value,
				onClick: qt
			}, {
				default: S(() => [...n[25] ||= [h(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Ht.value ? (_(), p("div", Te, [g(ae, {
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
					onClick: Kt
				}, {
					default: S(() => [...n[26] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (_(), p("div", Ee, [(_(!0), p(l, null, y(j.value, (e) => (_(), p("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				m("div", De, [m("span", Oe, [g(o, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: S(() => [h(b(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), m("span", ke, b(e.name), 1)]), g(o, { tone: e.enabled ? "success" : "neutral" }, {
					default: S(() => [h(b(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				m("dl", Ae, [
					n[30] ||= m("dt", null, "Host", -1),
					m("dd", null, b(e.host) + ":" + b(e.port), 1),
					e.device_id ? (_(), p(l, { key: 0 }, [n[27] ||= m("dt", null, "Device ID", -1), m("dd", null, b(e.device_id), 1)], 64)) : f("", !0),
					e.last_seen ? (_(), p(l, { key: 1 }, [n[28] ||= m("dt", null, "Last Seen", -1), m("dd", null, b(new Date(e.last_seen).toLocaleString()), 1)], 64)) : f("", !0),
					e.status ? (_(), p(l, { key: 2 }, [n[29] ||= m("dt", null, "Status", -1), m("dd", null, b(e.status), 1)], 64)) : f("", !0)
				]),
				m("div", je, [g(ne, {
					"model-value": !!e.enabled,
					disabled: Gt[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Jt(e)
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
					default: S(() => [...n[31] ||= [h(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : f("", !0)]),
			m("section", Me, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.guide,
				"aria-controls": "livetv-guide-body",
				onClick: n[1] ||= (e) => k("guide")
			}, [m("span", Pe, [
				g(t, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				n[32] ||= m("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				g(t, {
					name: O.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", Fe, b(on.value), 1)], 8, Ne), O.guide ? (_(), p("div", Ie, [m("div", Le, [m("div", Re, [(_(), p(l, null, y(en, (e, t) => m("button", {
				key: e,
				type: "button",
				class: de(["admin-livetv__seg-btn", { "is-active": F.value === t }]),
				"aria-pressed": F.value === t,
				onClick: (e) => nn(t)
			}, b(e), 11, ze)), 64))]), g(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: $t.value,
				onClick: an
			}, {
				default: S(() => [...n[33] ||= [h(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Zt.value ? (_(), p("div", Be, [g(ae, {
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
					onClick: n[2] ||= (e) => tn(F.value)
				}, {
					default: S(() => [...n[34] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : P.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (_(), p("div", Ve, [(_(!0), p(l, null, y(P.value, (e) => (_(), p("div", {
				key: e.id,
				class: de(["admin-livetv__program", { "is-selected": I.value === e.id }]),
				role: "button",
				tabindex: "0",
				"aria-pressed": I.value === e.id,
				"aria-label": `${e.title}, ${D(e.start_time)} to ${D(e.end_time)}`,
				onClick: (t) => rn(e),
				onKeydown: [ge(_e((t) => rn(e), ["prevent"]), ["enter"]), ge(_e((t) => rn(e), ["prevent"]), ["space"])]
			}, [
				m("div", Ue, b(D(e.start_time)) + " – " + b(D(e.end_time)), 1),
				m("div", We, b(e.title), 1),
				e.description && I.value !== e.id ? (_(), p("p", Ge, b(e.description.slice(0, 100)) + b(e.description.length > 100 ? "…" : ""), 1)) : f("", !0),
				I.value === e.id ? (_(), p("div", Ke, [e.description ? (_(), p("p", qe, b(e.description), 1)) : f("", !0), m("div", Je, [
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
						default: S(() => [h(b(Rt(e.season, e.episode)), 1)]),
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
			], 42, He))), 128))]))])) : f("", !0)]),
			m("section", Ye, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: n[3] ||= (e) => k("recordings")
			}, [m("span", Ze, [
				g(t, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				n[35] ||= m("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				g(t, {
					name: O.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", Qe, b(gn.value), 1)], 8, Xe), O.recordings ? (_(), p("div", $e, [m("div", et, [m("div", {
				ref_key: "recTablistEl",
				ref: un,
				class: "admin-livetv__segmented",
				role: "tablist",
				"aria-label": "Recording filter",
				onKeydown: fn
			}, [(_(), p(l, null, y(ln, (e) => m("button", {
				id: `rec-tab-${e.value}`,
				key: e.value,
				type: "button",
				role: "tab",
				class: de(["admin-livetv__seg-btn", { "is-active": z.value === e.value }]),
				"aria-selected": z.value === e.value,
				"aria-controls": `rec-panel-${e.value}`,
				tabindex: z.value === e.value ? 0 : -1,
				onClick: (t) => z.value = e.value
			}, b(e.label), 11, tt)), 64))], 544), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: bn
			}, {
				default: S(() => [...n[36] ||= [h(" Schedule Recording ", -1)]]),
				_: 1
			})]), m("div", {
				id: `rec-panel-${z.value}`,
				role: "tabpanel",
				"aria-labelledby": `rec-tab-${z.value}`
			}, [sn.value ? (_(), p("div", rt, [g(ae, {
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
					onClick: pn
				}, {
					default: S(() => [...n[37] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : R.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: _n.value
			}, null, 8, ["description"])) : (_(), p("div", it, [(_(!0), p(l, null, y(R.value, (e) => (_(), p("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				m("div", at, [m("span", ot, b(e.program_title ?? "Untitled"), 1), e.status ? (_(), d(o, {
					key: 0,
					tone: hn(e.status)
				}, {
					default: S(() => [h(b(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : f("", !0)]),
				m("div", st, [
					m("span", null, b(e.channel_name ?? e.channel_id), 1),
					m("span", null, b(It(e.start_time)) + " · " + b(D(e.start_time)) + " – " + b(D(e.end_time)), 1),
					m("span", null, b(Ft(e.start_time, e.end_time)), 1),
					e.size ? (_(), p("span", ct, b(Lt(e.size)), 1)) : f("", !0)
				]),
				m("div", lt, [g(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => V.value = e
				}, {
					default: S(() => [...n[38] ||= [h(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))], 8, nt)])) : f("", !0)]),
			m("section", ut, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: n[4] ||= (e) => k("seriesRules")
			}, [m("span", ft, [
				g(t, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				n[39] ||= m("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				g(t, {
					name: O.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), m("span", pt, b(Dn.value), 1)], 8, dt), O.seriesRules ? (_(), p("div", mt, [m("div", ht, [g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Mn
			}, {
				default: S(() => [...n[40] ||= [h("Add Rule", -1)]]),
				_: 1
			})]), Cn.value ? (_(), p("div", gt, [g(ae, {
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
					onClick: Tn
				}, {
					default: S(() => [...n[41] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (_(), p("div", _t, [(_(!0), p(l, null, y(J.value, (e) => (_(), p("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [m("div", vt, [m("span", yt, b(e.title_pattern), 1), m("div", bt, [
				m("span", null, b(Vt(e)), 1),
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
				default: S(() => [...n[42] ||= [h(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : f("", !0)]),
			g(s, {
				modelValue: vn.value,
				"onUpdate:modelValue": n[11] ||= (e) => vn.value = e,
				title: "Schedule Recording",
				onClose: xn
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: xn
				}, {
					default: S(() => [...n[49] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: yn.value,
					onClick: Sn
				}, {
					default: S(() => [...n[50] ||= [h(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-livetv__form",
					onSubmit: _e(Sn, ["prevent"])
				}, [
					m("label", xt, [n[43] ||= m("span", { class: "admin-livetv__label" }, "Title", -1), C(m("input", {
						"onUpdate:modelValue": n[5] ||= (e) => U.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[x, U.value]])]),
					m("label", St, [n[44] ||= m("span", { class: "admin-livetv__label" }, "Channel", -1), g(ie, {
						modelValue: H.value,
						"onUpdate:modelValue": n[6] ||= (e) => H.value = e,
						options: Bt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					m("div", Ct, [m("label", wt, [n[45] ||= m("span", { class: "admin-livetv__label" }, "Start Date", -1), C(m("input", {
						"onUpdate:modelValue": n[7] ||= (e) => W.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[x, W.value]])]), m("label", Tt, [n[46] ||= m("span", { class: "admin-livetv__label" }, "Start Time", -1), C(m("input", {
						"onUpdate:modelValue": n[8] ||= (e) => G.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[x, G.value]])])]),
					m("div", Et, [m("label", Dt, [n[47] ||= m("span", { class: "admin-livetv__label" }, "End Date", -1), C(m("input", {
						"onUpdate:modelValue": n[9] ||= (e) => K.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[x, K.value]])]), m("label", Ot, [n[48] ||= m("span", { class: "admin-livetv__label" }, "End Time", -1), C(m("input", {
						"onUpdate:modelValue": n[10] ||= (e) => q.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[x, q.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(s, {
				modelValue: On.value,
				"onUpdate:modelValue": n[16] ||= (e) => On.value = e,
				title: "Add Series Rule",
				onClose: Nn
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: Nn
				}, {
					default: S(() => [...n[57] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: An.value,
					onClick: Pn
				}, {
					default: S(() => [...n[58] ||= [h("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-livetv__form",
					onSubmit: _e(Pn, ["prevent"])
				}, [
					m("label", kt, [
						n[51] ||= m("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						C(m("input", {
							"onUpdate:modelValue": n[12] ||= (e) => Z.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[x, Z.value]]),
						n[52] ||= m("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					m("label", At, [n[53] ||= m("span", { class: "admin-livetv__label" }, "Channel", -1), g(ie, {
						modelValue: Q.value,
						"onUpdate:modelValue": n[13] ||= (e) => Q.value = e,
						options: Bt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					m("label", jt, [
						n[54] ||= m("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						m("input", {
							value: kn.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: n[14] ||= (e) => kn.value = Number(e.target.value)
						}, null, 40, Mt),
						n[55] ||= m("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					m("label", Nt, [n[56] ||= m("span", { class: "admin-livetv__label" }, "Keep Until", -1), g(ie, {
						modelValue: $.value,
						"onUpdate:modelValue": n[15] ||= (e) => $.value = e,
						options: jn,
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
					default: S(() => [...n[61] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: Yt
				}, {
					default: S(() => [...n[62] ||= [h("Remove", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					n[59] ||= h("Remove tuner ", -1),
					m("strong", null, b(N.value?.name), 1),
					n[60] ||= h("? This cannot be undone.", -1)
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
					default: S(() => [...n[65] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: mn
				}, {
					default: S(() => [...n[66] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					n[63] ||= h(" Delete recording ", -1),
					m("strong", null, b(V.value?.program_title ?? V.value?.id), 1),
					n[64] ||= h("? ", -1)
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
					default: S(() => [...n[69] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: En
				}, {
					default: S(() => [...n[70] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					n[67] ||= h("Delete series rule ", -1),
					m("strong", null, b(X.value?.title_pattern), 1),
					n[68] ||= h("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-8f5645ce"]]);
//#endregion
export { w as default };

//# sourceMappingURL=LiveTvPage-CFvJrIb6.js.map