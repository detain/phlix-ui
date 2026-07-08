import { n as e, t } from "./Icon-24ngwBUH.js";
import { c as n, f as r, t as ee } from "./client-fw74f3l_.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-CInT03Lp.js";
import { t as a } from "./Badge-DnDrMVUo.js";
import { t as ne } from "./Switch-D-Y4B9p8.js";
import { n as re } from "./listbox-htyKA_G5.js";
import { t as ie } from "./Select-BStd8O6i.js";
import { t as o } from "./Modal-C23ujDyU.js";
import { t as s } from "./Skeleton-BUq2D39t.js";
import { t as c } from "./EmptyState-0XgHKEGf.js";
import { t as ae } from "./PageHint-DR8OWfto.js";
import { t as oe } from "./liveTv-Dbjt901v.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as se, inject as ce, normalizeClass as le, onMounted as ue, openBlock as _, reactive as de, ref as v, renderList as y, toDisplayString as b, vModelText as x, watch as fe, withCtx as S, withDirectives as C, withKeys as pe, withModifiers as w } from "vue";
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
}, mt = { class: "admin-livetv__rule-info" }, ht = { class: "admin-livetv__rule-title" }, gt = { class: "admin-livetv__rule-meta" }, _t = { class: "admin-livetv__field" }, vt = { class: "admin-livetv__field" }, yt = { class: "admin-livetv__field-row" }, bt = { class: "admin-livetv__field" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field-row" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = { class: "admin-livetv__field" }, Dt = { class: "admin-livetv__field" }, Ot = ["value"], kt = { class: "admin-livetv__field" }, At = /*#__PURE__*/ e(/* @__PURE__ */ se({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(e) {
		let se = e, At = ce("apiBase", ""), jt = u(() => typeof At == "string" ? At : At?.value ?? ""), T = new oe(se.client ?? new ee({
			baseUrl: jt.value,
			tokenStore: new n()
		})), E = te();
		function Mt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), ee = n % 60;
			return ee > 0 ? `${r}h ${ee}m` : `${r}h`;
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
		let O = de({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function It(e) {
			O[e] = !O[e];
		}
		let k = v([]);
		async function Lt() {
			try {
				k.value = await T.listChannels();
			} catch {}
		}
		let Rt = u(() => k.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function zt(e) {
			let t = k.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let A = v([]), Bt = v(!1), Vt = v(!1), Ht = v(!1), Ut = de({}), j = v(null);
		async function Wt() {
			Bt.value = !0, j.value = null;
			try {
				A.value = await T.listTuners(), Vt.value = !0;
			} catch (e) {
				j.value = r(e, "Failed to load tuners."), E.error(j.value);
			} finally {
				Bt.value = !1;
			}
		}
		async function Gt() {
			if (!Ht.value) {
				Ht.value = !0;
				try {
					let e = await T.scanTuners();
					A.value = e, Vt.value = !0, E.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					E.error(r(e, "Tuner scan failed."));
				} finally {
					Ht.value = !1;
				}
			}
		}
		async function Kt(e) {
			if (!Ut[e.tuner_id]) {
				Ut[e.tuner_id] = !0;
				try {
					let t = await T.updateTuner(e.tuner_id, { enabled: !e.enabled });
					A.value = A.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					E.error(r(e, "Failed to update tuner."));
				} finally {
					Ut[e.tuner_id] = !1;
				}
			}
		}
		let M = v(null);
		async function qt() {
			let e = M.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), A.value = A.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), M.value = null;
			} catch (e) {
				E.error(r(e, "Failed to delete tuner.")), M.value = null;
			}
		}
		let Jt = u(() => Bt.value ? "Loading…" : A.value.length === 0 ? "No tuners found" : `${A.value.length} tuner${A.value.length === 1 ? "" : "s"} configured`), N = v([]), Yt = v(!1), Xt = v(!1), P = v(0), F = v(null), Zt = v(!1), Qt = [
			"Today",
			"+1 Day",
			"+2 Days"
		], I = v(null);
		async function $t(e) {
			Yt.value = !0, I.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				N.value = await T.listGuide({
					from: t,
					to: n
				}), Xt.value = !0;
			} catch (e) {
				I.value = r(e, "Failed to load guide."), E.error(I.value);
			} finally {
				Yt.value = !1;
			}
		}
		function en(e) {
			P.value = e, $t(e);
		}
		function tn(e) {
			F.value = F.value === e.id ? null : e.id;
		}
		async function nn() {
			if (!Zt.value) {
				Zt.value = !0;
				try {
					let e = await T.refreshGuide();
					E.success(`Guide refreshed. ${e} programmes imported.`), await $t(P.value);
				} catch (e) {
					E.error(r(e, "Guide refresh failed."));
				} finally {
					Zt.value = !1;
				}
			}
		}
		let rn = u(() => Yt.value ? "Loading…" : N.value.length > 0 ? `${N.value.length} programmes` : "No programmes"), L = v([]), an = v(!1), on = v(!1), R = v("all"), z = [
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
		], sn = v(null);
		function cn(e) {
			sn.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function ln(e) {
			let t = z.map((e) => ({
				value: e.value,
				label: e.label
			})), n = z.findIndex((e) => e.value === R.value), r = -1;
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
			r >= 0 && (e.preventDefault(), R.value = z[r].value, cn(r));
		}
		let B = v(null);
		async function un() {
			an.value = !0, B.value = null;
			try {
				L.value = await T.listRecordings(), on.value = !0;
			} catch (e) {
				B.value = r(e, "Failed to load recordings."), E.error(B.value);
			} finally {
				an.value = !1;
			}
		}
		let V = v(null);
		async function dn() {
			let e = V.value;
			if (e) try {
				await T.deleteRecording(e.id), L.value = L.value.filter((t) => t.id !== e.id), E.success("Recording deleted."), V.value = null;
			} catch (e) {
				E.error(r(e, "Failed to delete recording.")), V.value = null;
			}
		}
		function fn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let pn = u(() => an.value ? "Loading…" : `${L.value.length} recording${L.value.length === 1 ? "" : "s"}`), mn = u(() => R.value === "upcoming" ? "No upcoming recordings." : R.value === "by-series" ? "No series recordings." : "No recordings yet."), hn = v(!1), H = v(""), U = v(""), W = v(""), G = v(""), K = v(""), q = v(""), gn = v(!1);
		async function _n() {
			await Lt(), H.value = k.value[0]?.id ?? "", U.value = "", W.value = "", G.value = "", K.value = "", q.value = "", hn.value = !0;
		}
		function vn() {
			hn.value = !1;
		}
		async function yn() {
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
			gn.value = !0;
			try {
				let n = await T.createRecording({
					channel_id: H.value,
					start_time: e,
					end_time: t,
					title: U.value.trim()
				});
				L.value = [...L.value, n], E.success("Recording scheduled."), vn();
			} catch (e) {
				E.error(r(e, "Failed to schedule recording."));
			} finally {
				gn.value = !1;
			}
		}
		let J = v([]), bn = v(!1), xn = v(!1), Y = v(null);
		async function Sn() {
			bn.value = !0, Y.value = null;
			try {
				J.value = await T.listSeriesRules(), xn.value = !0;
			} catch (e) {
				Y.value = r(e, "Failed to load series rules."), E.error(Y.value);
			} finally {
				bn.value = !1;
			}
		}
		let X = v(null);
		async function Cn() {
			let e = X.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), J.value = J.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), X.value = null;
			} catch (e) {
				E.error(r(e, "Failed to delete rule.")), X.value = null;
			}
		}
		let wn = u(() => bn.value ? "Loading…" : `${J.value.length} rule${J.value.length === 1 ? "" : "s"}`), Tn = v(!1), Z = v(""), Q = v(""), En = v("space"), $ = v(3), Dn = v(!1), On = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function kn() {
			await Lt(), Z.value = "", Q.value = k.value[0]?.id ?? "", En.value = "space", $.value = 3, Tn.value = !0;
		}
		function An() {
			Tn.value = !1;
		}
		async function jn() {
			if (!Z.value.trim()) {
				E.error("Title pattern is required.");
				return;
			}
			if (!Q.value) {
				E.error("Channel is required.");
				return;
			}
			Dn.value = !0;
			try {
				let e = await T.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: Q.value,
					title: Z.value.trim(),
					priority: $.value,
					keep_until: En.value
				});
				J.value = [...J.value, e], E.success("Series rule created."), An();
			} catch (e) {
				E.error(r(e, "Failed to create rule."));
			} finally {
				Dn.value = !1;
			}
		}
		return fe(() => O.tuners, (e) => {
			e && !Vt.value && Wt();
		}, { immediate: !0 }), fe(() => O.guide, (e) => {
			e && !Xt.value && $t(P.value);
		}), fe(() => O.recordings, (e) => {
			e && !on.value && un();
		}), fe(() => O.seriesRules, (e) => {
			e && !xn.value && (Sn(), Lt());
		}), ue(() => {}), (e, n) => (_(), p("section", me, [
			n[71] ||= m("header", { class: "admin-livetv__head" }, [m("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			g(ae, null, {
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
					h(" auto-records a show every time it airs. ", -1)
				]]),
				_: 1
			}),
			m("section", he, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: n[0] ||= (e) => It("tuners")
			}, [m("span", _e, [
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
			]), m("span", ve, b(Jt.value), 1)], 8, ge), O.tuners ? (_(), p("div", ye, [m("div", be, [g(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Ht.value,
				onClick: Gt
			}, {
				default: S(() => [...n[25] ||= [h(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Bt.value ? (_(), p("div", xe, [g(s, {
				variant: "text",
				lines: 3
			})])) : j.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load tuners",
				description: j.value
			}, {
				actions: S(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Wt
				}, {
					default: S(() => [...n[26] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (_(), p("div", Se, [(_(!0), p(l, null, y(A.value, (e) => (_(), p("article", {
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
					n[30] ||= m("dt", null, "Host", -1),
					m("dd", null, b(e.host) + ":" + b(e.port), 1),
					e.device_id ? (_(), p(l, { key: 0 }, [n[27] ||= m("dt", null, "Device ID", -1), m("dd", null, b(e.device_id), 1)], 64)) : f("", !0),
					e.last_seen ? (_(), p(l, { key: 1 }, [n[28] ||= m("dt", null, "Last Seen", -1), m("dd", null, b(new Date(e.last_seen).toLocaleString()), 1)], 64)) : f("", !0),
					e.status ? (_(), p(l, { key: 2 }, [n[29] ||= m("dt", null, "Status", -1), m("dd", null, b(e.status), 1)], 64)) : f("", !0)
				]),
				m("div", De, [g(ne, {
					"model-value": !!e.enabled,
					disabled: Ut[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Kt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), g(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => M.value = e
				}, {
					default: S(() => [...n[31] ||= [h(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : f("", !0)]),
			m("section", Oe, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.guide,
				"aria-controls": "livetv-guide-body",
				onClick: n[1] ||= (e) => It("guide")
			}, [m("span", Ae, [
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
			]), m("span", je, b(rn.value), 1)], 8, ke), O.guide ? (_(), p("div", Me, [m("div", Ne, [m("div", Pe, [(_(), p(l, null, y(Qt, (e, t) => m("button", {
				key: e,
				type: "button",
				class: le(["admin-livetv__seg-btn", { "is-active": P.value === t }]),
				"aria-pressed": P.value === t,
				onClick: (e) => en(t)
			}, b(e), 11, Fe)), 64))]), g(i, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Zt.value,
				onClick: nn
			}, {
				default: S(() => [...n[33] ||= [h(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Yt.value ? (_(), p("div", Ie, [g(s, {
				variant: "text",
				lines: 4
			})])) : I.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load guide",
				description: I.value
			}, {
				actions: S(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: n[2] ||= (e) => $t(P.value)
				}, {
					default: S(() => [...n[34] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : N.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (_(), p("div", Le, [(_(!0), p(l, null, y(N.value, (e) => (_(), p("div", {
				key: e.id,
				class: le(["admin-livetv__program", { "is-selected": F.value === e.id }]),
				role: "button",
				tabindex: "0",
				"aria-pressed": F.value === e.id,
				"aria-label": `${e.title}, ${D(e.start_time)} to ${D(e.end_time)}`,
				onClick: (t) => tn(e),
				onKeydown: [pe(w((t) => tn(e), ["prevent"]), ["enter"]), pe(w((t) => tn(e), ["prevent"]), ["space"])]
			}, [
				m("div", ze, b(D(e.start_time)) + " – " + b(D(e.end_time)), 1),
				m("div", Be, b(e.title), 1),
				e.description && F.value !== e.id ? (_(), p("p", Ve, b(e.description.slice(0, 100)) + b(e.description.length > 100 ? "…" : ""), 1)) : f("", !0),
				F.value === e.id ? (_(), p("div", He, [e.description ? (_(), p("p", Ue, b(e.description), 1)) : f("", !0), m("div", We, [
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
						default: S(() => [h(b(Ft(e.season, e.episode)), 1)]),
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
				onClick: n[3] ||= (e) => It("recordings")
			}, [m("span", qe, [
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
			]), m("span", Je, b(pn.value), 1)], 8, Ke), O.recordings ? (_(), p("div", Ye, [m("div", Xe, [m("div", {
				ref_key: "recTablistEl",
				ref: sn,
				class: "admin-livetv__segmented",
				role: "tablist",
				"aria-label": "Recording filter",
				onKeydown: ln
			}, [(_(), p(l, null, y(z, (e) => m("button", {
				id: `rec-tab-${e.value}`,
				key: e.value,
				type: "button",
				role: "tab",
				class: le(["admin-livetv__seg-btn", { "is-active": R.value === e.value }]),
				"aria-selected": R.value === e.value,
				"aria-controls": `rec-panel-${e.value}`,
				tabindex: R.value === e.value ? 0 : -1,
				onClick: (t) => R.value = e.value
			}, b(e.label), 11, Ze)), 64))], 544), g(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: _n
			}, {
				default: S(() => [...n[36] ||= [h(" Schedule Recording ", -1)]]),
				_: 1
			})]), m("div", {
				id: `rec-panel-${R.value}`,
				role: "tabpanel",
				"aria-labelledby": `rec-tab-${R.value}`
			}, [an.value ? (_(), p("div", $e, [g(s, {
				variant: "text",
				lines: 3
			})])) : B.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recordings",
				description: B.value
			}, {
				actions: S(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: un
				}, {
					default: S(() => [...n[37] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : L.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: mn.value
			}, null, 8, ["description"])) : (_(), p("div", et, [(_(!0), p(l, null, y(L.value, (e) => (_(), p("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				m("div", tt, [m("span", nt, b(e.program_title ?? "Untitled"), 1), e.status ? (_(), d(a, {
					key: 0,
					tone: fn(e.status)
				}, {
					default: S(() => [h(b(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : f("", !0)]),
				m("div", rt, [
					m("span", null, b(e.channel_name ?? e.channel_id), 1),
					m("span", null, b(Nt(e.start_time)) + " · " + b(D(e.start_time)) + " – " + b(D(e.end_time)), 1),
					m("span", null, b(Mt(e.start_time, e.end_time)), 1),
					e.size ? (_(), p("span", it, b(Pt(e.size)), 1)) : f("", !0)
				]),
				m("div", at, [g(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => V.value = e
				}, {
					default: S(() => [...n[38] ||= [h(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))], 8, Qe)])) : f("", !0)]),
			m("section", ot, [m("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: n[4] ||= (e) => It("seriesRules")
			}, [m("span", ct, [
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
			]), m("span", lt, b(wn.value), 1)], 8, st), O.seriesRules ? (_(), p("div", ut, [m("div", dt, [g(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: kn
			}, {
				default: S(() => [...n[40] ||= [h("Add Rule", -1)]]),
				_: 1
			})]), bn.value ? (_(), p("div", ft, [g(s, {
				variant: "text",
				lines: 3
			})])) : Y.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load series rules",
				description: Y.value
			}, {
				actions: S(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Sn
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
			})) : (_(), p("div", pt, [(_(!0), p(l, null, y(J.value, (e) => (_(), p("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [m("div", mt, [m("span", ht, b(e.title_pattern), 1), m("div", gt, [
				m("span", null, b(zt(e)), 1),
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
				onClick: (t) => X.value = e
			}, {
				default: S(() => [...n[42] ||= [h(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : f("", !0)]),
			g(o, {
				modelValue: hn.value,
				"onUpdate:modelValue": n[11] ||= (e) => hn.value = e,
				title: "Schedule Recording",
				onClose: vn
			}, {
				footer: S(() => [g(i, {
					variant: "ghost",
					size: "sm",
					onClick: vn
				}, {
					default: S(() => [...n[49] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					size: "sm",
					loading: gn.value,
					onClick: yn
				}, {
					default: S(() => [...n[50] ||= [h(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-livetv__form",
					onSubmit: w(yn, ["prevent"])
				}, [
					m("label", _t, [n[43] ||= m("span", { class: "admin-livetv__label" }, "Title", -1), C(m("input", {
						"onUpdate:modelValue": n[5] ||= (e) => U.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[x, U.value]])]),
					m("label", vt, [n[44] ||= m("span", { class: "admin-livetv__label" }, "Channel", -1), g(ie, {
						modelValue: H.value,
						"onUpdate:modelValue": n[6] ||= (e) => H.value = e,
						options: Rt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					m("div", yt, [m("label", bt, [n[45] ||= m("span", { class: "admin-livetv__label" }, "Start Date", -1), C(m("input", {
						"onUpdate:modelValue": n[7] ||= (e) => W.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[x, W.value]])]), m("label", xt, [n[46] ||= m("span", { class: "admin-livetv__label" }, "Start Time", -1), C(m("input", {
						"onUpdate:modelValue": n[8] ||= (e) => G.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[x, G.value]])])]),
					m("div", St, [m("label", Ct, [n[47] ||= m("span", { class: "admin-livetv__label" }, "End Date", -1), C(m("input", {
						"onUpdate:modelValue": n[9] ||= (e) => K.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[x, K.value]])]), m("label", wt, [n[48] ||= m("span", { class: "admin-livetv__label" }, "End Time", -1), C(m("input", {
						"onUpdate:modelValue": n[10] ||= (e) => q.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[x, q.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(o, {
				modelValue: Tn.value,
				"onUpdate:modelValue": n[16] ||= (e) => Tn.value = e,
				title: "Add Series Rule",
				onClose: An
			}, {
				footer: S(() => [g(i, {
					variant: "ghost",
					size: "sm",
					onClick: An
				}, {
					default: S(() => [...n[57] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					size: "sm",
					loading: Dn.value,
					onClick: jn
				}, {
					default: S(() => [...n[58] ||= [h("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-livetv__form",
					onSubmit: w(jn, ["prevent"])
				}, [
					m("label", Tt, [
						n[51] ||= m("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						C(m("input", {
							"onUpdate:modelValue": n[12] ||= (e) => Z.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[x, Z.value]]),
						n[52] ||= m("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					m("label", Et, [n[53] ||= m("span", { class: "admin-livetv__label" }, "Channel", -1), g(ie, {
						modelValue: Q.value,
						"onUpdate:modelValue": n[13] ||= (e) => Q.value = e,
						options: Rt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					m("label", Dt, [
						n[54] ||= m("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						m("input", {
							value: $.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: n[14] ||= (e) => $.value = Number(e.target.value)
						}, null, 40, Ot),
						n[55] ||= m("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					m("label", kt, [n[56] ||= m("span", { class: "admin-livetv__label" }, "Keep Until", -1), g(ie, {
						modelValue: En.value,
						"onUpdate:modelValue": n[15] ||= (e) => En.value = e,
						options: On,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(o, {
				"model-value": M.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": n[18] ||= (e) => M.value = null
			}, {
				footer: S(() => [g(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[17] ||= (e) => M.value = null
				}, {
					default: S(() => [...n[61] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					size: "sm",
					onClick: qt
				}, {
					default: S(() => [...n[62] ||= [h("Remove", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					n[59] ||= h("Remove tuner ", -1),
					m("strong", null, b(M.value?.name), 1),
					n[60] ||= h("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(o, {
				"model-value": V.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": n[20] ||= (e) => V.value = null
			}, {
				footer: S(() => [g(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[19] ||= (e) => V.value = null
				}, {
					default: S(() => [...n[65] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					size: "sm",
					onClick: dn
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
			g(o, {
				"model-value": X.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": n[22] ||= (e) => X.value = null
			}, {
				footer: S(() => [g(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[21] ||= (e) => X.value = null
				}, {
					default: S(() => [...n[69] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(i, {
					variant: "solid",
					size: "sm",
					onClick: Cn
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
}), [["__scopeId", "data-v-06eafde4"]]);
//#endregion
export { At as default };

//# sourceMappingURL=LiveTvPage-CHSSXyBK.js.map