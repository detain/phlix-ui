import { n as e, t } from "./Icon-ax5k7_G2.js";
import { c as n, n as ee, t as r } from "./Button-BFaMKqH5.js";
import { t as te } from "./tokenStore-CGMYSpg6.js";
import { t as i } from "./Badge-ArWL5-WE.js";
import { t as ne } from "./Switch-CFZhdkXR.js";
import { t as re } from "./Select-bu72i41G.js";
import { t as a } from "./Modal-DWJvE4oJ.js";
import { t as ie } from "./useToastStore-BDoKlU6N.js";
import { n as ae, t as o } from "./EmptyState-Ds4WcVdG.js";
import { t as oe } from "./liveTv-Dbjt901v.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as se, inject as ce, normalizeClass as le, onMounted as ue, openBlock as h, reactive as de, ref as g, renderList as _, toDisplayString as v, vModelText as y, watch as b, withCtx as x, withDirectives as S, withKeys as fe, withModifiers as pe } from "vue";
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
	class: "admin-livetv__guide-grid",
	role: "list"
}, Re = ["onClick", "onKeydown"], ze = { class: "admin-livetv__program-time" }, Be = { class: "admin-livetv__program-title" }, Ve = {
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
}, Xe = { class: "admin-livetv__toolbar" }, Ze = {
	class: "admin-livetv__segmented",
	role: "tablist",
	"aria-label": "Recording filter"
}, Qe = ["aria-selected", "onClick"], $e = {
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
		let se = e, At = ce("apiBase", ""), jt = c(() => typeof At == "string" ? At : At?.value ?? ""), C = new oe(se.client ?? new ee({
			baseUrl: jt.value,
			tokenStore: new te()
		})), w = ie();
		function Mt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let ee = Math.floor(n / 60), r = n % 60;
			return r > 0 ? `${ee}h ${r}m` : `${ee}h`;
		}
		function Nt(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function T(e) {
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
		let E = de({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function It(e) {
			E[e] = !E[e];
		}
		let D = g([]);
		async function Lt() {
			try {
				D.value = await C.listChannels();
			} catch {}
		}
		let Rt = c(() => D.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function zt(e) {
			let t = D.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let O = g([]), Bt = g(!1), Vt = g(!1), Ht = g(!1), Ut = de({}), k = g(null);
		async function Wt() {
			Bt.value = !0, k.value = null;
			try {
				O.value = await C.listTuners(), Vt.value = !0;
			} catch (e) {
				k.value = n(e, "Failed to load tuners."), w.error(k.value);
			} finally {
				Bt.value = !1;
			}
		}
		async function Gt() {
			if (!Ht.value) {
				Ht.value = !0;
				try {
					let e = await C.scanTuners();
					O.value = e, Vt.value = !0, w.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					w.error(n(e, "Tuner scan failed."));
				} finally {
					Ht.value = !1;
				}
			}
		}
		async function Kt(e) {
			if (!Ut[e.tuner_id]) {
				Ut[e.tuner_id] = !0;
				try {
					let t = await C.updateTuner(e.tuner_id, { enabled: !e.enabled });
					O.value = O.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					w.error(n(e, "Failed to update tuner."));
				} finally {
					Ut[e.tuner_id] = !1;
				}
			}
		}
		let A = g(null);
		async function qt() {
			let e = A.value;
			if (e) try {
				await C.deleteTuner(e.tuner_id), O.value = O.value.filter((t) => t.tuner_id !== e.tuner_id), w.success("Tuner removed."), A.value = null;
			} catch (e) {
				w.error(n(e, "Failed to delete tuner.")), A.value = null;
			}
		}
		let Jt = c(() => Bt.value ? "Loading…" : O.value.length === 0 ? "No tuners found" : `${O.value.length} tuner${O.value.length === 1 ? "" : "s"} configured`), j = g([]), M = g(!1), Yt = g(!1), N = g(0), P = g(null), F = g(!1), Xt = [
			"Today",
			"+1 Day",
			"+2 Days"
		], I = g(null);
		async function L(e) {
			M.value = !0, I.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				j.value = await C.listGuide({
					from: t,
					to: n
				}), Yt.value = !0;
			} catch (e) {
				I.value = n(e, "Failed to load guide."), w.error(I.value);
			} finally {
				M.value = !1;
			}
		}
		function Zt(e) {
			N.value = e, L(e);
		}
		function Qt(e) {
			P.value = P.value === e.id ? null : e.id;
		}
		async function $t() {
			if (!F.value) {
				F.value = !0;
				try {
					let e = await C.refreshGuide();
					w.success(`Guide refreshed. ${e} programmes imported.`), await L(N.value);
				} catch (e) {
					w.error(n(e, "Guide refresh failed."));
				} finally {
					F.value = !1;
				}
			}
		}
		let en = c(() => M.value ? "Loading…" : j.value.length > 0 ? `${j.value.length} programmes` : "No programmes"), R = g([]), z = g(!1), tn = g(!1), B = g("all"), nn = [
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
		], V = g(null);
		async function rn() {
			z.value = !0, V.value = null;
			try {
				R.value = await C.listRecordings(), tn.value = !0;
			} catch (e) {
				V.value = n(e, "Failed to load recordings."), w.error(V.value);
			} finally {
				z.value = !1;
			}
		}
		let H = g(null);
		async function an() {
			let e = H.value;
			if (e) try {
				await C.deleteRecording(e.id), R.value = R.value.filter((t) => t.id !== e.id), w.success("Recording deleted."), H.value = null;
			} catch (e) {
				w.error(n(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function on(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let sn = c(() => z.value ? "Loading…" : `${R.value.length} recording${R.value.length === 1 ? "" : "s"}`), cn = c(() => B.value === "upcoming" ? "No upcoming recordings." : B.value === "by-series" ? "No series recordings." : "No recordings yet."), ln = g(!1), U = g(""), W = g(""), G = g(""), K = g(""), q = g(""), J = g(""), un = g(!1);
		async function dn() {
			await Lt(), U.value = D.value[0]?.id ?? "", W.value = "", G.value = "", K.value = "", q.value = "", J.value = "", ln.value = !0;
		}
		function fn() {
			ln.value = !1;
		}
		async function pn() {
			if (!U.value) {
				w.error("Channel is required.");
				return;
			}
			if (!W.value.trim()) {
				w.error("Title is required.");
				return;
			}
			if (!G.value || !K.value || !q.value || !J.value) {
				w.error("Start and end date/time are required.");
				return;
			}
			let e = Math.floor((/* @__PURE__ */ new Date(`${G.value}T${K.value}`)).getTime() / 1e3), t = Math.floor((/* @__PURE__ */ new Date(`${q.value}T${J.value}`)).getTime() / 1e3);
			if (t <= e) {
				w.error("End must be after start.");
				return;
			}
			un.value = !0;
			try {
				let n = await C.createRecording({
					channel_id: U.value,
					start_time: e,
					end_time: t,
					title: W.value.trim()
				});
				R.value = [...R.value, n], w.success("Recording scheduled."), fn();
			} catch (e) {
				w.error(n(e, "Failed to schedule recording."));
			} finally {
				un.value = !1;
			}
		}
		let Y = g([]), mn = g(!1), hn = g(!1), X = g(null);
		async function gn() {
			mn.value = !0, X.value = null;
			try {
				Y.value = await C.listSeriesRules(), hn.value = !0;
			} catch (e) {
				X.value = n(e, "Failed to load series rules."), w.error(X.value);
			} finally {
				mn.value = !1;
			}
		}
		let Z = g(null);
		async function _n() {
			let e = Z.value;
			if (e) try {
				await C.deleteSeriesRule(e.id), Y.value = Y.value.filter((t) => t.id !== e.id), w.success("Series rule deleted."), Z.value = null;
			} catch (e) {
				w.error(n(e, "Failed to delete rule.")), Z.value = null;
			}
		}
		let vn = c(() => mn.value ? "Loading…" : `${Y.value.length} rule${Y.value.length === 1 ? "" : "s"}`), yn = g(!1), Q = g(""), $ = g(""), bn = g("space"), xn = g(3), Sn = g(!1), Cn = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function wn() {
			await Lt(), Q.value = "", $.value = D.value[0]?.id ?? "", bn.value = "space", xn.value = 3, yn.value = !0;
		}
		function Tn() {
			yn.value = !1;
		}
		async function En() {
			if (!Q.value.trim()) {
				w.error("Title pattern is required.");
				return;
			}
			if (!$.value) {
				w.error("Channel is required.");
				return;
			}
			Sn.value = !0;
			try {
				let e = await C.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: $.value,
					title: Q.value.trim(),
					priority: xn.value,
					keep_until: bn.value
				});
				Y.value = [...Y.value, e], w.success("Series rule created."), Tn();
			} catch (e) {
				w.error(n(e, "Failed to create rule."));
			} finally {
				Sn.value = !1;
			}
		}
		return b(() => E.tuners, (e) => {
			e && !Vt.value && Wt();
		}, { immediate: !0 }), b(() => E.guide, (e) => {
			e && !Yt.value && L(N.value);
		}), b(() => E.recordings, (e) => {
			e && !tn.value && rn();
		}), b(() => E.seriesRules, (e) => {
			e && !hn.value && (gn(), Lt());
		}), ue(() => {}), (e, n) => (h(), d("section", me, [
			n[70] ||= f("header", { class: "admin-livetv__head" }, [f("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			f("section", he, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": E.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: n[0] ||= (e) => It("tuners")
			}, [f("span", _e, [
				m(t, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				n[23] ||= f("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				m(t, {
					name: E.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", ve, v(Jt.value), 1)], 8, ge), E.tuners ? (h(), d("div", ye, [f("div", be, [m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Ht.value,
				onClick: Gt
			}, {
				default: x(() => [...n[24] ||= [p(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Bt.value ? (h(), d("div", xe, [m(ae, {
				variant: "text",
				lines: 3
			})])) : k.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load tuners",
				description: k.value
			}, {
				actions: x(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Wt
				}, {
					default: x(() => [...n[25] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : O.value.length === 0 ? (h(), l(o, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (h(), d("div", Se, [(h(!0), d(s, null, _(O.value, (e) => (h(), d("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				f("div", Ce, [f("span", we, [m(i, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: x(() => [p(v(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), f("span", Te, v(e.name), 1)]), m(i, { tone: e.enabled ? "success" : "neutral" }, {
					default: x(() => [p(v(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("dl", Ee, [
					n[29] ||= f("dt", null, "Host", -1),
					f("dd", null, v(e.host) + ":" + v(e.port), 1),
					e.device_id ? (h(), d(s, { key: 0 }, [n[26] ||= f("dt", null, "Device ID", -1), f("dd", null, v(e.device_id), 1)], 64)) : u("", !0),
					e.last_seen ? (h(), d(s, { key: 1 }, [n[27] ||= f("dt", null, "Last Seen", -1), f("dd", null, v(new Date(e.last_seen).toLocaleString()), 1)], 64)) : u("", !0),
					e.status ? (h(), d(s, { key: 2 }, [n[28] ||= f("dt", null, "Status", -1), f("dd", null, v(e.status), 1)], 64)) : u("", !0)
				]),
				f("div", De, [m(ne, {
					"model-value": !!e.enabled,
					disabled: Ut[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Kt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), m(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => A.value = e
				}, {
					default: x(() => [...n[30] ||= [p(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : u("", !0)]),
			f("section", Oe, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": E.guide,
				"aria-controls": "livetv-guide-body",
				onClick: n[1] ||= (e) => It("guide")
			}, [f("span", Ae, [
				m(t, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				n[31] ||= f("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				m(t, {
					name: E.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", je, v(en.value), 1)], 8, ke), E.guide ? (h(), d("div", Me, [f("div", Ne, [f("div", Pe, [(h(), d(s, null, _(Xt, (e, t) => f("button", {
				key: e,
				type: "button",
				class: le(["admin-livetv__seg-btn", { "is-active": N.value === t }]),
				"aria-pressed": N.value === t,
				onClick: (e) => Zt(t)
			}, v(e), 11, Fe)), 64))]), m(r, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: F.value,
				onClick: $t
			}, {
				default: x(() => [...n[32] ||= [p(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), M.value ? (h(), d("div", Ie, [m(ae, {
				variant: "text",
				lines: 4
			})])) : I.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load guide",
				description: I.value
			}, {
				actions: x(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: n[2] ||= (e) => L(N.value)
				}, {
					default: x(() => [...n[33] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (h(), l(o, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (h(), d("div", Le, [(h(!0), d(s, null, _(j.value, (e) => (h(), d("div", {
				key: e.id,
				class: le(["admin-livetv__program", { "is-selected": P.value === e.id }]),
				role: "listitem",
				tabindex: "0",
				onClick: (t) => Qt(e),
				onKeydown: [fe(pe((t) => Qt(e), ["prevent"]), ["enter"]), fe(pe((t) => Qt(e), ["prevent"]), ["space"])]
			}, [
				f("div", ze, v(T(e.start_time)) + " – " + v(T(e.end_time)), 1),
				f("div", Be, v(e.title), 1),
				e.description && P.value !== e.id ? (h(), d("p", Ve, v(e.description.slice(0, 100)) + v(e.description.length > 100 ? "…" : ""), 1)) : u("", !0),
				P.value === e.id ? (h(), d("div", He, [e.description ? (h(), d("p", Ue, v(e.description), 1)) : u("", !0), f("div", We, [
					e.rating ? (h(), l(i, {
						key: 0,
						tone: "neutral"
					}, {
						default: x(() => [p("Rating: " + v(e.rating), 1)]),
						_: 2
					}, 1024)) : u("", !0),
					e.season ? (h(), l(i, {
						key: 1,
						tone: "info"
					}, {
						default: x(() => [p(v(Ft(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : u("", !0),
					e.year ? (h(), l(i, {
						key: 2,
						tone: "neutral"
					}, {
						default: x(() => [p(v(e.year), 1)]),
						_: 2
					}, 1024)) : u("", !0)
				])])) : u("", !0)
			], 42, Re))), 128))]))])) : u("", !0)]),
			f("section", Ge, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": E.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: n[3] ||= (e) => It("recordings")
			}, [f("span", qe, [
				m(t, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				n[34] ||= f("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				m(t, {
					name: E.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", Je, v(sn.value), 1)], 8, Ke), E.recordings ? (h(), d("div", Ye, [f("div", Xe, [f("div", Ze, [(h(), d(s, null, _(nn, (e) => f("button", {
				key: e.value,
				type: "button",
				role: "tab",
				class: le(["admin-livetv__seg-btn", { "is-active": B.value === e.value }]),
				"aria-selected": B.value === e.value,
				onClick: (t) => B.value = e.value
			}, v(e.label), 11, Qe)), 64))]), m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: dn
			}, {
				default: x(() => [...n[35] ||= [p(" Schedule Recording ", -1)]]),
				_: 1
			})]), z.value ? (h(), d("div", $e, [m(ae, {
				variant: "text",
				lines: 3
			})])) : V.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recordings",
				description: V.value
			}, {
				actions: x(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: rn
				}, {
					default: x(() => [...n[36] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : R.value.length === 0 ? (h(), l(o, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: cn.value
			}, null, 8, ["description"])) : (h(), d("div", et, [(h(!0), d(s, null, _(R.value, (e) => (h(), d("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				f("div", tt, [f("span", nt, v(e.program_title ?? "Untitled"), 1), e.status ? (h(), l(i, {
					key: 0,
					tone: on(e.status)
				}, {
					default: x(() => [p(v(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : u("", !0)]),
				f("div", rt, [
					f("span", null, v(e.channel_name ?? e.channel_id), 1),
					f("span", null, v(Nt(e.start_time)) + " · " + v(T(e.start_time)) + " – " + v(T(e.end_time)), 1),
					f("span", null, v(Mt(e.start_time, e.end_time)), 1),
					e.size ? (h(), d("span", it, v(Pt(e.size)), 1)) : u("", !0)
				]),
				f("div", at, [m(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
				}, {
					default: x(() => [...n[37] ||= [p(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : u("", !0)]),
			f("section", ot, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": E.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: n[4] ||= (e) => It("seriesRules")
			}, [f("span", ct, [
				m(t, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				n[38] ||= f("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				m(t, {
					name: E.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", lt, v(vn.value), 1)], 8, st), E.seriesRules ? (h(), d("div", ut, [f("div", dt, [m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: wn
			}, {
				default: x(() => [...n[39] ||= [p("Add Rule", -1)]]),
				_: 1
			})]), mn.value ? (h(), d("div", ft, [m(ae, {
				variant: "text",
				lines: 3
			})])) : X.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load series rules",
				description: X.value
			}, {
				actions: x(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: gn
				}, {
					default: x(() => [...n[40] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Y.value.length === 0 ? (h(), l(o, {
				key: 2,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (h(), d("div", pt, [(h(!0), d(s, null, _(Y.value, (e) => (h(), d("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [f("div", mt, [f("span", ht, v(e.title_pattern), 1), f("div", gt, [
				f("span", null, v(zt(e)), 1),
				e.priority ? (h(), l(i, {
					key: 0,
					tone: "info"
				}, {
					default: x(() => [p("Priority " + v(e.priority), 1)]),
					_: 2
				}, 1024)) : u("", !0),
				e.keep_until ? (h(), l(i, {
					key: 1,
					tone: "neutral"
				}, {
					default: x(() => [p("Keep: " + v(e.keep_until), 1)]),
					_: 2
				}, 1024)) : u("", !0)
			])]), m(r, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => Z.value = e
			}, {
				default: x(() => [...n[41] ||= [p(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : u("", !0)]),
			m(a, {
				modelValue: ln.value,
				"onUpdate:modelValue": n[11] ||= (e) => ln.value = e,
				title: "Schedule Recording",
				onClose: fn
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: fn
				}, {
					default: x(() => [...n[48] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: un.value,
					onClick: pn
				}, {
					default: x(() => [...n[49] ||= [p(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-livetv__form",
					onSubmit: pe(pn, ["prevent"])
				}, [
					f("label", _t, [n[42] ||= f("span", { class: "admin-livetv__label" }, "Title", -1), S(f("input", {
						"onUpdate:modelValue": n[5] ||= (e) => W.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[y, W.value]])]),
					f("label", vt, [n[43] ||= f("span", { class: "admin-livetv__label" }, "Channel", -1), m(re, {
						modelValue: U.value,
						"onUpdate:modelValue": n[6] ||= (e) => U.value = e,
						options: Rt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					f("div", yt, [f("label", bt, [n[44] ||= f("span", { class: "admin-livetv__label" }, "Start Date", -1), S(f("input", {
						"onUpdate:modelValue": n[7] ||= (e) => G.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[y, G.value]])]), f("label", xt, [n[45] ||= f("span", { class: "admin-livetv__label" }, "Start Time", -1), S(f("input", {
						"onUpdate:modelValue": n[8] ||= (e) => K.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[y, K.value]])])]),
					f("div", St, [f("label", Ct, [n[46] ||= f("span", { class: "admin-livetv__label" }, "End Date", -1), S(f("input", {
						"onUpdate:modelValue": n[9] ||= (e) => q.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[y, q.value]])]), f("label", wt, [n[47] ||= f("span", { class: "admin-livetv__label" }, "End Time", -1), S(f("input", {
						"onUpdate:modelValue": n[10] ||= (e) => J.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[y, J.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(a, {
				modelValue: yn.value,
				"onUpdate:modelValue": n[16] ||= (e) => yn.value = e,
				title: "Add Series Rule",
				onClose: Tn
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: Tn
				}, {
					default: x(() => [...n[56] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: Sn.value,
					onClick: En
				}, {
					default: x(() => [...n[57] ||= [p("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-livetv__form",
					onSubmit: pe(En, ["prevent"])
				}, [
					f("label", Tt, [
						n[50] ||= f("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						S(f("input", {
							"onUpdate:modelValue": n[12] ||= (e) => Q.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[y, Q.value]]),
						n[51] ||= f("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					f("label", Et, [n[52] ||= f("span", { class: "admin-livetv__label" }, "Channel", -1), m(re, {
						modelValue: $.value,
						"onUpdate:modelValue": n[13] ||= (e) => $.value = e,
						options: Rt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					f("label", Dt, [
						n[53] ||= f("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						f("input", {
							value: xn.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: n[14] ||= (e) => xn.value = Number(e.target.value)
						}, null, 40, Ot),
						n[54] ||= f("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					f("label", kt, [n[55] ||= f("span", { class: "admin-livetv__label" }, "Keep Until", -1), m(re, {
						modelValue: bn.value,
						"onUpdate:modelValue": n[15] ||= (e) => bn.value = e,
						options: Cn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(a, {
				"model-value": A.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": n[18] ||= (e) => A.value = null
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: n[17] ||= (e) => A.value = null
				}, {
					default: x(() => [...n[60] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: qt
				}, {
					default: x(() => [...n[61] ||= [p("Remove", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					n[58] ||= p("Remove tuner ", -1),
					f("strong", null, v(A.value?.name), 1),
					n[59] ||= p("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": n[20] ||= (e) => H.value = null
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: n[19] ||= (e) => H.value = null
				}, {
					default: x(() => [...n[64] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: an
				}, {
					default: x(() => [...n[65] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					n[62] ||= p(" Delete recording ", -1),
					f("strong", null, v(H.value?.program_title ?? H.value?.id), 1),
					n[63] ||= p("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": Z.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": n[22] ||= (e) => Z.value = null
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: n[21] ||= (e) => Z.value = null
				}, {
					default: x(() => [...n[68] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: _n
				}, {
					default: x(() => [...n[69] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					n[66] ||= p("Delete series rule ", -1),
					f("strong", null, v(Z.value?.title_pattern), 1),
					n[67] ||= p("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-f28ff8c7"]]);
//#endregion
export { At as default };

//# sourceMappingURL=LiveTvPage-JYuh67G-.js.map