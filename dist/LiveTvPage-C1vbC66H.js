import { a as e, d as t, i as n, m as r, n as i, p as a, r as ee, t as o } from "./Button-DjEQ9y17.js";
import { t as s } from "./Modal-BkSAbwHm.js";
import { t as c } from "./EmptyState-bbKd8GNA.js";
import { t as te } from "./Select-BPlN5xaU.js";
import { t as l } from "./Badge-DobVc76J.js";
import { t as ne } from "./Switch-BNdBMUaS.js";
import { t as re } from "./liveTv-Dbjt901v.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as ie, inject as ae, normalizeClass as oe, onMounted as se, openBlock as v, reactive as ce, ref as y, renderList as b, toDisplayString as x, vModelText as S, watch as le, withCtx as C, withDirectives as w, withKeys as ue, withModifiers as T } from "vue";
//#region src/pages/admin/LiveTvPage.vue?vue&type=script&setup=true&lang.ts
var de = {
	class: "admin-livetv",
	"aria-labelledby": "livetv-heading"
}, fe = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-tuners-heading"
}, pe = ["aria-expanded"], me = { class: "admin-livetv__section-title-row" }, he = { class: "admin-livetv__section-summary" }, ge = {
	key: 0,
	id: "livetv-tuners-body",
	class: "admin-livetv__section-body"
}, _e = { class: "admin-livetv__toolbar" }, ve = {
	key: 0,
	class: "admin-livetv__skel"
}, ye = {
	key: 2,
	class: "admin-livetv__card-grid"
}, be = { class: "admin-livetv__card-head" }, xe = { class: "admin-livetv__card-title-row" }, Se = { class: "admin-livetv__card-name" }, Ce = { class: "admin-livetv__dl" }, we = { class: "admin-livetv__card-actions" }, Te = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-guide-heading"
}, Ee = ["aria-expanded"], De = { class: "admin-livetv__section-title-row" }, Oe = { class: "admin-livetv__section-summary" }, ke = {
	key: 0,
	id: "livetv-guide-body",
	class: "admin-livetv__section-body"
}, Ae = { class: "admin-livetv__toolbar" }, je = {
	class: "admin-livetv__segmented",
	role: "group",
	"aria-label": "Guide date"
}, Me = ["aria-pressed", "onClick"], Ne = {
	key: 0,
	class: "admin-livetv__skel"
}, Pe = {
	key: 2,
	class: "admin-livetv__guide-grid",
	role: "list"
}, Fe = ["onClick", "onKeydown"], Ie = { class: "admin-livetv__program-time" }, Le = { class: "admin-livetv__program-title" }, Re = {
	key: 0,
	class: "admin-livetv__program-desc"
}, ze = {
	key: 1,
	class: "admin-livetv__program-expanded"
}, Be = {
	key: 0,
	class: "admin-livetv__program-full-desc"
}, Ve = { class: "admin-livetv__program-meta" }, He = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-recordings-heading"
}, Ue = ["aria-expanded"], We = { class: "admin-livetv__section-title-row" }, Ge = { class: "admin-livetv__section-summary" }, Ke = {
	key: 0,
	id: "livetv-recordings-body",
	class: "admin-livetv__section-body"
}, qe = { class: "admin-livetv__toolbar" }, Je = {
	class: "admin-livetv__segmented",
	role: "tablist",
	"aria-label": "Recording filter"
}, Ye = ["aria-selected", "onClick"], Xe = {
	key: 0,
	class: "admin-livetv__skel"
}, Ze = {
	key: 2,
	class: "admin-livetv__rec-list"
}, Qe = { class: "admin-livetv__card-head" }, $e = { class: "admin-livetv__card-name" }, et = { class: "admin-livetv__rec-meta" }, tt = { key: 0 }, nt = { class: "admin-livetv__card-actions" }, rt = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-rules-heading"
}, it = ["aria-expanded"], at = { class: "admin-livetv__section-title-row" }, ot = { class: "admin-livetv__section-summary" }, st = {
	key: 0,
	id: "livetv-rules-body",
	class: "admin-livetv__section-body"
}, ct = { class: "admin-livetv__toolbar" }, lt = {
	key: 0,
	class: "admin-livetv__skel"
}, ut = {
	key: 2,
	class: "admin-livetv__rule-list"
}, dt = { class: "admin-livetv__rule-info" }, ft = { class: "admin-livetv__rule-title" }, pt = { class: "admin-livetv__rule-meta" }, mt = { class: "admin-livetv__field" }, ht = { class: "admin-livetv__field" }, gt = { class: "admin-livetv__field-row" }, _t = { class: "admin-livetv__field" }, vt = { class: "admin-livetv__field" }, yt = { class: "admin-livetv__field-row" }, bt = { class: "admin-livetv__field" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = ["value"], Et = { class: "admin-livetv__field" }, E = /*#__PURE__*/ r(/* @__PURE__ */ ie({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(r) {
		let ie = r, E = ae("apiBase", ""), Dt = d(() => typeof E == "string" ? E : E?.value ?? ""), D = new re(ie.client ?? new e({
			baseUrl: Dt.value,
			tokenStore: new n()
		})), O = ee();
		function Ot(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), i = n % 60;
			return i > 0 ? `${r}h ${i}m` : `${r}h`;
		}
		function kt(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function At(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function jt(e) {
			return `${(e / 1024 / 1024).toFixed(1)} MB`;
		}
		function Mt(e, t) {
			return `S${String(e ?? 0).padStart(2, "0")}E${String(t ?? 0).padStart(2, "0")}`;
		}
		let k = ce({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function A(e) {
			k[e] = !k[e];
		}
		let j = y([]);
		async function Nt() {
			try {
				j.value = await D.listChannels();
			} catch {}
		}
		let Pt = d(() => j.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Ft(e) {
			let t = j.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let M = y([]), It = y(!1), Lt = y(!1), Rt = y(!1), zt = ce({});
		async function Bt() {
			It.value = !0;
			try {
				M.value = await D.listTuners(), Lt.value = !0;
			} catch (e) {
				O.error(t(e, "Failed to load tuners."));
			} finally {
				It.value = !1;
			}
		}
		async function Vt() {
			if (!Rt.value) {
				Rt.value = !0;
				try {
					let e = await D.scanTuners();
					M.value = e, Lt.value = !0, O.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					O.error(t(e, "Tuner scan failed."));
				} finally {
					Rt.value = !1;
				}
			}
		}
		async function Ht(e) {
			if (!zt[e.tuner_id]) {
				zt[e.tuner_id] = !0;
				try {
					let t = await D.updateTuner(e.tuner_id, { enabled: !e.enabled });
					M.value = M.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					O.error(t(e, "Failed to update tuner."));
				} finally {
					zt[e.tuner_id] = !1;
				}
			}
		}
		let N = y(null);
		async function Ut() {
			let e = N.value;
			if (e) try {
				await D.deleteTuner(e.tuner_id), M.value = M.value.filter((t) => t.tuner_id !== e.tuner_id), O.success("Tuner removed."), N.value = null;
			} catch (e) {
				O.error(t(e, "Failed to delete tuner.")), N.value = null;
			}
		}
		let Wt = d(() => It.value ? "Loading…" : M.value.length === 0 ? "No tuners found" : `${M.value.length} tuner${M.value.length === 1 ? "" : "s"} configured`), P = y([]), F = y(!1), Gt = y(!1), I = y(0), L = y(null), R = y(!1), Kt = [
			"Today",
			"+1 Day",
			"+2 Days"
		];
		async function qt(e) {
			F.value = !0;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				P.value = await D.listGuide({
					from: t,
					to: n
				}), Gt.value = !0;
			} catch (e) {
				O.error(t(e, "Failed to load guide."));
			} finally {
				F.value = !1;
			}
		}
		function Jt(e) {
			I.value = e, qt(e);
		}
		function Yt(e) {
			L.value = L.value === e.id ? null : e.id;
		}
		async function Xt() {
			if (!R.value) {
				R.value = !0;
				try {
					let e = await D.refreshGuide();
					O.success(`Guide refreshed. ${e} programmes imported.`), await qt(I.value);
				} catch (e) {
					O.error(t(e, "Guide refresh failed."));
				} finally {
					R.value = !1;
				}
			}
		}
		let Zt = d(() => F.value ? "Loading…" : P.value.length > 0 ? `${P.value.length} programmes` : "No programmes"), z = y([]), B = y(!1), Qt = y(!1), V = y("all"), $t = [
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
		];
		async function en() {
			B.value = !0;
			try {
				z.value = await D.listRecordings(), Qt.value = !0;
			} catch (e) {
				O.error(t(e, "Failed to load recordings."));
			} finally {
				B.value = !1;
			}
		}
		let H = y(null);
		async function tn() {
			let e = H.value;
			if (e) try {
				await D.deleteRecording(e.id), z.value = z.value.filter((t) => t.id !== e.id), O.success("Recording deleted."), H.value = null;
			} catch (e) {
				O.error(t(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function nn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let rn = d(() => B.value ? "Loading…" : `${z.value.length} recording${z.value.length === 1 ? "" : "s"}`), an = d(() => V.value === "upcoming" ? "No upcoming recordings." : V.value === "by-series" ? "No series recordings." : "No recordings yet."), U = y(!1), W = y(""), G = y(""), K = y(""), q = y(""), J = y(""), Y = y(""), on = y(!1);
		async function sn() {
			await Nt(), W.value = j.value[0]?.id ?? "", G.value = "", K.value = "", q.value = "", J.value = "", Y.value = "", U.value = !0;
		}
		function cn() {
			U.value = !1;
		}
		async function ln() {
			if (!W.value) {
				O.error("Channel is required.");
				return;
			}
			if (!G.value.trim()) {
				O.error("Title is required.");
				return;
			}
			if (!K.value || !q.value || !J.value || !Y.value) {
				O.error("Start and end date/time are required.");
				return;
			}
			let e = Math.floor((/* @__PURE__ */ new Date(`${K.value}T${q.value}`)).getTime() / 1e3), n = Math.floor((/* @__PURE__ */ new Date(`${J.value}T${Y.value}`)).getTime() / 1e3);
			if (n <= e) {
				O.error("End must be after start.");
				return;
			}
			on.value = !0;
			try {
				let t = await D.createRecording({
					channel_id: W.value,
					start_time: e,
					end_time: n,
					title: G.value.trim()
				});
				z.value = [...z.value, t], O.success("Recording scheduled."), cn();
			} catch (e) {
				O.error(t(e, "Failed to schedule recording."));
			} finally {
				on.value = !1;
			}
		}
		let X = y([]), un = y(!1), dn = y(!1);
		async function fn() {
			un.value = !0;
			try {
				X.value = await D.listSeriesRules(), dn.value = !0;
			} catch (e) {
				O.error(t(e, "Failed to load series rules."));
			} finally {
				un.value = !1;
			}
		}
		let Z = y(null);
		async function pn() {
			let e = Z.value;
			if (e) try {
				await D.deleteSeriesRule(e.id), X.value = X.value.filter((t) => t.id !== e.id), O.success("Series rule deleted."), Z.value = null;
			} catch (e) {
				O.error(t(e, "Failed to delete rule.")), Z.value = null;
			}
		}
		let mn = d(() => un.value ? "Loading…" : `${X.value.length} rule${X.value.length === 1 ? "" : "s"}`), hn = y(!1), Q = y(""), $ = y(""), gn = y("space"), _n = y(3), vn = y(!1), yn = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function bn() {
			await Nt(), Q.value = "", $.value = j.value[0]?.id ?? "", gn.value = "space", _n.value = 3, hn.value = !0;
		}
		function xn() {
			hn.value = !1;
		}
		async function Sn() {
			if (!Q.value.trim()) {
				O.error("Title pattern is required.");
				return;
			}
			if (!$.value) {
				O.error("Channel is required.");
				return;
			}
			vn.value = !0;
			try {
				let e = await D.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: $.value,
					title: Q.value.trim(),
					priority: _n.value,
					keep_until: gn.value
				});
				X.value = [...X.value, e], O.success("Series rule created."), xn();
			} catch (e) {
				O.error(t(e, "Failed to create rule."));
			} finally {
				vn.value = !1;
			}
		}
		return le(() => k.tuners, (e) => {
			e && !Lt.value && Bt();
		}, { immediate: !0 }), le(() => k.guide, (e) => {
			e && !Gt.value && qt(I.value);
		}), le(() => k.recordings, (e) => {
			e && !Qt.value && en();
		}), le(() => k.seriesRules, (e) => {
			e && !dn.value && (fn(), Nt());
		}), se(() => {}), (e, t) => (v(), m("section", de, [
			t[65] ||= h("header", { class: "admin-livetv__head" }, [h("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			h("section", fe, [h("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: t[0] ||= (e) => A("tuners")
			}, [h("span", me, [
				_(a, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				t[22] ||= h("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				_(a, {
					name: k.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), h("span", he, x(Wt.value), 1)], 8, pe), k.tuners ? (v(), m("div", ge, [h("div", _e, [_(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Rt.value,
				onClick: Vt
			}, {
				default: C(() => [...t[23] ||= [g(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), It.value ? (v(), m("div", ve, [_(i, {
				variant: "text",
				lines: 3
			})])) : M.value.length === 0 ? (v(), f(c, {
				key: 1,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (v(), m("div", ye, [(v(!0), m(u, null, b(M.value, (e) => (v(), m("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				h("div", be, [h("span", xe, [_(l, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: C(() => [g(x(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), h("span", Se, x(e.name), 1)]), _(l, { tone: e.enabled ? "success" : "neutral" }, {
					default: C(() => [g(x(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				h("dl", Ce, [
					t[27] ||= h("dt", null, "Host", -1),
					h("dd", null, x(e.host) + ":" + x(e.port), 1),
					e.device_id ? (v(), m(u, { key: 0 }, [t[24] ||= h("dt", null, "Device ID", -1), h("dd", null, x(e.device_id), 1)], 64)) : p("", !0),
					e.last_seen ? (v(), m(u, { key: 1 }, [t[25] ||= h("dt", null, "Last Seen", -1), h("dd", null, x(new Date(e.last_seen).toLocaleString()), 1)], 64)) : p("", !0),
					e.status ? (v(), m(u, { key: 2 }, [t[26] ||= h("dt", null, "Status", -1), h("dd", null, x(e.status), 1)], 64)) : p("", !0)
				]),
				h("div", we, [_(ne, {
					"model-value": !!e.enabled,
					disabled: zt[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Ht(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), _(o, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => N.value = e
				}, {
					default: C(() => [...t[28] ||= [g(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : p("", !0)]),
			h("section", Te, [h("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.guide,
				"aria-controls": "livetv-guide-body",
				onClick: t[1] ||= (e) => A("guide")
			}, [h("span", De, [
				_(a, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				t[29] ||= h("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				_(a, {
					name: k.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), h("span", Oe, x(Zt.value), 1)], 8, Ee), k.guide ? (v(), m("div", ke, [h("div", Ae, [h("div", je, [(v(), m(u, null, b(Kt, (e, t) => h("button", {
				key: e,
				type: "button",
				class: oe(["admin-livetv__seg-btn", { "is-active": I.value === t }]),
				"aria-pressed": I.value === t,
				onClick: (e) => Jt(t)
			}, x(e), 11, Me)), 64))]), _(o, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: R.value,
				onClick: Xt
			}, {
				default: C(() => [...t[30] ||= [g(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), F.value ? (v(), m("div", Ne, [_(i, {
				variant: "text",
				lines: 4
			})])) : P.value.length === 0 ? (v(), f(c, {
				key: 1,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (v(), m("div", Pe, [(v(!0), m(u, null, b(P.value, (e) => (v(), m("div", {
				key: e.id,
				class: oe(["admin-livetv__program", { "is-selected": L.value === e.id }]),
				role: "listitem",
				tabindex: "0",
				onClick: (t) => Yt(e),
				onKeydown: [ue(T((t) => Yt(e), ["prevent"]), ["enter"]), ue(T((t) => Yt(e), ["prevent"]), ["space"])]
			}, [
				h("div", Ie, x(At(e.start_time)) + " – " + x(At(e.end_time)), 1),
				h("div", Le, x(e.title), 1),
				e.description && L.value !== e.id ? (v(), m("p", Re, x(e.description.slice(0, 100)) + x(e.description.length > 100 ? "…" : ""), 1)) : p("", !0),
				L.value === e.id ? (v(), m("div", ze, [e.description ? (v(), m("p", Be, x(e.description), 1)) : p("", !0), h("div", Ve, [
					e.rating ? (v(), f(l, {
						key: 0,
						tone: "neutral"
					}, {
						default: C(() => [g("Rating: " + x(e.rating), 1)]),
						_: 2
					}, 1024)) : p("", !0),
					e.season ? (v(), f(l, {
						key: 1,
						tone: "info"
					}, {
						default: C(() => [g(x(Mt(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : p("", !0),
					e.year ? (v(), f(l, {
						key: 2,
						tone: "neutral"
					}, {
						default: C(() => [g(x(e.year), 1)]),
						_: 2
					}, 1024)) : p("", !0)
				])])) : p("", !0)
			], 42, Fe))), 128))]))])) : p("", !0)]),
			h("section", He, [h("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: t[2] ||= (e) => A("recordings")
			}, [h("span", We, [
				_(a, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				t[31] ||= h("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				_(a, {
					name: k.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), h("span", Ge, x(rn.value), 1)], 8, Ue), k.recordings ? (v(), m("div", Ke, [h("div", qe, [h("div", Je, [(v(), m(u, null, b($t, (e) => h("button", {
				key: e.value,
				type: "button",
				role: "tab",
				class: oe(["admin-livetv__seg-btn", { "is-active": V.value === e.value }]),
				"aria-selected": V.value === e.value,
				onClick: (t) => V.value = e.value
			}, x(e.label), 11, Ye)), 64))]), _(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: sn
			}, {
				default: C(() => [...t[32] ||= [g(" Schedule Recording ", -1)]]),
				_: 1
			})]), B.value ? (v(), m("div", Xe, [_(i, {
				variant: "text",
				lines: 3
			})])) : z.value.length === 0 ? (v(), f(c, {
				key: 1,
				icon: "film",
				title: "No recordings",
				description: an.value
			}, null, 8, ["description"])) : (v(), m("div", Ze, [(v(!0), m(u, null, b(z.value, (e) => (v(), m("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				h("div", Qe, [h("span", $e, x(e.program_title ?? "Untitled"), 1), e.status ? (v(), f(l, {
					key: 0,
					tone: nn(e.status)
				}, {
					default: C(() => [g(x(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : p("", !0)]),
				h("div", et, [
					h("span", null, x(e.channel_name ?? e.channel_id), 1),
					h("span", null, x(kt(e.start_time)) + " · " + x(At(e.start_time)) + " – " + x(At(e.end_time)), 1),
					h("span", null, x(Ot(e.start_time, e.end_time)), 1),
					e.size ? (v(), m("span", tt, x(jt(e.size)), 1)) : p("", !0)
				]),
				h("div", nt, [_(o, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
				}, {
					default: C(() => [...t[33] ||= [g(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : p("", !0)]),
			h("section", rt, [h("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: t[3] ||= (e) => A("seriesRules")
			}, [h("span", at, [
				_(a, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				t[34] ||= h("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				_(a, {
					name: k.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), h("span", ot, x(mn.value), 1)], 8, it), k.seriesRules ? (v(), m("div", st, [h("div", ct, [_(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: bn
			}, {
				default: C(() => [...t[35] ||= [g("Add Rule", -1)]]),
				_: 1
			})]), un.value ? (v(), m("div", lt, [_(i, {
				variant: "text",
				lines: 3
			})])) : X.value.length === 0 ? (v(), f(c, {
				key: 1,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (v(), m("div", ut, [(v(!0), m(u, null, b(X.value, (e) => (v(), m("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [h("div", dt, [h("span", ft, x(e.title_pattern), 1), h("div", pt, [
				h("span", null, x(Ft(e)), 1),
				e.priority ? (v(), f(l, {
					key: 0,
					tone: "info"
				}, {
					default: C(() => [g("Priority " + x(e.priority), 1)]),
					_: 2
				}, 1024)) : p("", !0),
				e.keep_until ? (v(), f(l, {
					key: 1,
					tone: "neutral"
				}, {
					default: C(() => [g("Keep: " + x(e.keep_until), 1)]),
					_: 2
				}, 1024)) : p("", !0)
			])]), _(o, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => Z.value = e
			}, {
				default: C(() => [...t[36] ||= [g(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : p("", !0)]),
			_(s, {
				modelValue: U.value,
				"onUpdate:modelValue": t[10] ||= (e) => U.value = e,
				title: "Schedule Recording",
				onClose: cn
			}, {
				footer: C(() => [_(o, {
					variant: "ghost",
					size: "sm",
					onClick: cn
				}, {
					default: C(() => [...t[43] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "solid",
					size: "sm",
					loading: on.value,
					onClick: ln
				}, {
					default: C(() => [...t[44] ||= [g(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [h("form", {
					class: "admin-livetv__form",
					onSubmit: T(ln, ["prevent"])
				}, [
					h("label", mt, [t[37] ||= h("span", { class: "admin-livetv__label" }, "Title", -1), w(h("input", {
						"onUpdate:modelValue": t[4] ||= (e) => G.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[S, G.value]])]),
					h("label", ht, [t[38] ||= h("span", { class: "admin-livetv__label" }, "Channel", -1), _(te, {
						modelValue: W.value,
						"onUpdate:modelValue": t[5] ||= (e) => W.value = e,
						options: Pt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					h("div", gt, [h("label", _t, [t[39] ||= h("span", { class: "admin-livetv__label" }, "Start Date", -1), w(h("input", {
						"onUpdate:modelValue": t[6] ||= (e) => K.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[S, K.value]])]), h("label", vt, [t[40] ||= h("span", { class: "admin-livetv__label" }, "Start Time", -1), w(h("input", {
						"onUpdate:modelValue": t[7] ||= (e) => q.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[S, q.value]])])]),
					h("div", yt, [h("label", bt, [t[41] ||= h("span", { class: "admin-livetv__label" }, "End Date", -1), w(h("input", {
						"onUpdate:modelValue": t[8] ||= (e) => J.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[S, J.value]])]), h("label", xt, [t[42] ||= h("span", { class: "admin-livetv__label" }, "End Time", -1), w(h("input", {
						"onUpdate:modelValue": t[9] ||= (e) => Y.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[S, Y.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(s, {
				modelValue: hn.value,
				"onUpdate:modelValue": t[15] ||= (e) => hn.value = e,
				title: "Add Series Rule",
				onClose: xn
			}, {
				footer: C(() => [_(o, {
					variant: "ghost",
					size: "sm",
					onClick: xn
				}, {
					default: C(() => [...t[51] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "solid",
					size: "sm",
					loading: vn.value,
					onClick: Sn
				}, {
					default: C(() => [...t[52] ||= [g("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [h("form", {
					class: "admin-livetv__form",
					onSubmit: T(Sn, ["prevent"])
				}, [
					h("label", St, [
						t[45] ||= h("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						w(h("input", {
							"onUpdate:modelValue": t[11] ||= (e) => Q.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[S, Q.value]]),
						t[46] ||= h("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					h("label", Ct, [t[47] ||= h("span", { class: "admin-livetv__label" }, "Channel", -1), _(te, {
						modelValue: $.value,
						"onUpdate:modelValue": t[12] ||= (e) => $.value = e,
						options: Pt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					h("label", wt, [
						t[48] ||= h("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						h("input", {
							value: _n.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: t[13] ||= (e) => _n.value = Number(e.target.value)
						}, null, 40, Tt),
						t[49] ||= h("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					h("label", Et, [t[50] ||= h("span", { class: "admin-livetv__label" }, "Keep Until", -1), _(te, {
						modelValue: gn.value,
						"onUpdate:modelValue": t[14] ||= (e) => gn.value = e,
						options: yn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(s, {
				"model-value": N.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": t[17] ||= (e) => N.value = null
			}, {
				footer: C(() => [_(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[16] ||= (e) => N.value = null
				}, {
					default: C(() => [...t[55] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "solid",
					size: "sm",
					onClick: Ut
				}, {
					default: C(() => [...t[56] ||= [g("Remove", -1)]]),
					_: 1
				})]),
				default: C(() => [h("p", null, [
					t[53] ||= g("Remove tuner ", -1),
					h("strong", null, x(N.value?.name), 1),
					t[54] ||= g("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(s, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": t[19] ||= (e) => H.value = null
			}, {
				footer: C(() => [_(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[18] ||= (e) => H.value = null
				}, {
					default: C(() => [...t[59] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "solid",
					size: "sm",
					onClick: tn
				}, {
					default: C(() => [...t[60] ||= [g("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [h("p", null, [
					t[57] ||= g(" Delete recording ", -1),
					h("strong", null, x(H.value?.program_title ?? H.value?.id), 1),
					t[58] ||= g("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(s, {
				"model-value": Z.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": t[21] ||= (e) => Z.value = null
			}, {
				footer: C(() => [_(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[20] ||= (e) => Z.value = null
				}, {
					default: C(() => [...t[63] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "solid",
					size: "sm",
					onClick: pn
				}, {
					default: C(() => [...t[64] ||= [g("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [h("p", null, [
					t[61] ||= g("Delete series rule ", -1),
					h("strong", null, x(Z.value?.title_pattern), 1),
					t[62] ||= g("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-3dd3ce40"]]);
//#endregion
export { E as default };

//# sourceMappingURL=LiveTvPage-C1vbC66H.js.map