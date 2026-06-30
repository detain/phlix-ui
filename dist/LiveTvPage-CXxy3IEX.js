import { n as e, t } from "./Icon-ax5k7_G2.js";
import { c as n, f as r, t as ee } from "./client-BQ-In3oB.js";
import { t as i } from "./Button-k7aQagzg.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as te } from "./Switch-CFZhdkXR.js";
import { n as ne } from "./listbox-htyKA_G5.js";
import { t as re } from "./Select-BR5EXV0L.js";
import { t as o } from "./Modal-CWarEzTU.js";
import { t as ie } from "./useToastStore-BDoKlU6N.js";
import { t as ae } from "./Skeleton-DkSoWF3C.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { t as oe } from "./liveTv-Dbjt901v.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as se, inject as ce, normalizeClass as le, onMounted as ue, openBlock as g, reactive as de, ref as _, renderList as v, toDisplayString as y, vModelText as b, watch as fe, withCtx as x, withDirectives as S, withKeys as pe, withModifiers as me } from "vue";
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
}, ht = { class: "admin-livetv__rule-info" }, gt = { class: "admin-livetv__rule-title" }, _t = { class: "admin-livetv__rule-meta" }, vt = { class: "admin-livetv__field" }, yt = { class: "admin-livetv__field" }, bt = { class: "admin-livetv__field-row" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field" }, Ct = { class: "admin-livetv__field-row" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = { class: "admin-livetv__field" }, Dt = { class: "admin-livetv__field" }, Ot = { class: "admin-livetv__field" }, kt = ["value"], At = { class: "admin-livetv__field" }, C = /*#__PURE__*/ e(/* @__PURE__ */ se({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(e) {
		let se = e, C = ce("apiBase", ""), jt = l(() => typeof C == "string" ? C : C?.value ?? ""), w = new oe(se.client ?? new ee({
			baseUrl: jt.value,
			tokenStore: new n()
		})), T = ie();
		function Mt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), ee = n % 60;
			return ee > 0 ? `${r}h ${ee}m` : `${r}h`;
		}
		function Nt(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function E(e) {
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
		let D = de({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function O(e) {
			D[e] = !D[e];
		}
		let k = _([]);
		async function It() {
			try {
				k.value = await w.listChannels();
			} catch {}
		}
		let Lt = l(() => k.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Rt(e) {
			let t = k.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let A = _([]), j = _(!1), zt = _(!1), M = _(!1), Bt = de({}), N = _(null);
		async function Vt() {
			j.value = !0, N.value = null;
			try {
				A.value = await w.listTuners(), zt.value = !0;
			} catch (e) {
				N.value = r(e, "Failed to load tuners."), T.error(N.value);
			} finally {
				j.value = !1;
			}
		}
		async function Ht() {
			if (!M.value) {
				M.value = !0;
				try {
					let e = await w.scanTuners();
					A.value = e, zt.value = !0, T.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					T.error(r(e, "Tuner scan failed."));
				} finally {
					M.value = !1;
				}
			}
		}
		async function Ut(e) {
			if (!Bt[e.tuner_id]) {
				Bt[e.tuner_id] = !0;
				try {
					let t = await w.updateTuner(e.tuner_id, { enabled: !e.enabled });
					A.value = A.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					T.error(r(e, "Failed to update tuner."));
				} finally {
					Bt[e.tuner_id] = !1;
				}
			}
		}
		let P = _(null);
		async function Wt() {
			let e = P.value;
			if (e) try {
				await w.deleteTuner(e.tuner_id), A.value = A.value.filter((t) => t.tuner_id !== e.tuner_id), T.success("Tuner removed."), P.value = null;
			} catch (e) {
				T.error(r(e, "Failed to delete tuner.")), P.value = null;
			}
		}
		let Gt = l(() => j.value ? "Loading…" : A.value.length === 0 ? "No tuners found" : `${A.value.length} tuner${A.value.length === 1 ? "" : "s"} configured`), F = _([]), Kt = _(!1), qt = _(!1), I = _(0), L = _(null), Jt = _(!1), Yt = [
			"Today",
			"+1 Day",
			"+2 Days"
		], R = _(null);
		async function Xt(e) {
			Kt.value = !0, R.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				F.value = await w.listGuide({
					from: t,
					to: n
				}), qt.value = !0;
			} catch (e) {
				R.value = r(e, "Failed to load guide."), T.error(R.value);
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
					let e = await w.refreshGuide();
					T.success(`Guide refreshed. ${e} programmes imported.`), await Xt(I.value);
				} catch (e) {
					T.error(r(e, "Guide refresh failed."));
				} finally {
					Jt.value = !1;
				}
			}
		}
		let en = l(() => Kt.value ? "Loading…" : F.value.length > 0 ? `${F.value.length} programmes` : "No programmes"), z = _([]), tn = _(!1), nn = _(!1), B = _("all"), rn = [
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
		], an = _(null);
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
					r = ne(t, n, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					r = ne(t, n, -1);
					break;
				case "Home":
					r = ne(t, -1, 1);
					break;
				case "End":
					r = ne(t, 0, -1);
					break;
				default: return;
			}
			r >= 0 && (e.preventDefault(), B.value = rn[r].value, on(r));
		}
		let V = _(null);
		async function cn() {
			tn.value = !0, V.value = null;
			try {
				z.value = await w.listRecordings(), nn.value = !0;
			} catch (e) {
				V.value = r(e, "Failed to load recordings."), T.error(V.value);
			} finally {
				tn.value = !1;
			}
		}
		let H = _(null);
		async function ln() {
			let e = H.value;
			if (e) try {
				await w.deleteRecording(e.id), z.value = z.value.filter((t) => t.id !== e.id), T.success("Recording deleted."), H.value = null;
			} catch (e) {
				T.error(r(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function un(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let dn = l(() => tn.value ? "Loading…" : `${z.value.length} recording${z.value.length === 1 ? "" : "s"}`), fn = l(() => B.value === "upcoming" ? "No upcoming recordings." : B.value === "by-series" ? "No series recordings." : "No recordings yet."), pn = _(!1), U = _(""), W = _(""), G = _(""), K = _(""), q = _(""), J = _(""), mn = _(!1);
		async function hn() {
			await It(), U.value = k.value[0]?.id ?? "", W.value = "", G.value = "", K.value = "", q.value = "", J.value = "", pn.value = !0;
		}
		function gn() {
			pn.value = !1;
		}
		async function _n() {
			if (!U.value) {
				T.error("Channel is required.");
				return;
			}
			if (!W.value.trim()) {
				T.error("Title is required.");
				return;
			}
			if (!G.value || !K.value || !q.value || !J.value) {
				T.error("Start and end date/time are required.");
				return;
			}
			let e = Math.floor((/* @__PURE__ */ new Date(`${G.value}T${K.value}`)).getTime() / 1e3), t = Math.floor((/* @__PURE__ */ new Date(`${q.value}T${J.value}`)).getTime() / 1e3);
			if (t <= e) {
				T.error("End must be after start.");
				return;
			}
			mn.value = !0;
			try {
				let n = await w.createRecording({
					channel_id: U.value,
					start_time: e,
					end_time: t,
					title: W.value.trim()
				});
				z.value = [...z.value, n], T.success("Recording scheduled."), gn();
			} catch (e) {
				T.error(r(e, "Failed to schedule recording."));
			} finally {
				mn.value = !1;
			}
		}
		let Y = _([]), vn = _(!1), yn = _(!1), X = _(null);
		async function bn() {
			vn.value = !0, X.value = null;
			try {
				Y.value = await w.listSeriesRules(), yn.value = !0;
			} catch (e) {
				X.value = r(e, "Failed to load series rules."), T.error(X.value);
			} finally {
				vn.value = !1;
			}
		}
		let Z = _(null);
		async function xn() {
			let e = Z.value;
			if (e) try {
				await w.deleteSeriesRule(e.id), Y.value = Y.value.filter((t) => t.id !== e.id), T.success("Series rule deleted."), Z.value = null;
			} catch (e) {
				T.error(r(e, "Failed to delete rule.")), Z.value = null;
			}
		}
		let Sn = l(() => vn.value ? "Loading…" : `${Y.value.length} rule${Y.value.length === 1 ? "" : "s"}`), Cn = _(!1), Q = _(""), $ = _(""), wn = _("space"), Tn = _(3), En = _(!1), Dn = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function On() {
			await It(), Q.value = "", $.value = k.value[0]?.id ?? "", wn.value = "space", Tn.value = 3, Cn.value = !0;
		}
		function kn() {
			Cn.value = !1;
		}
		async function An() {
			if (!Q.value.trim()) {
				T.error("Title pattern is required.");
				return;
			}
			if (!$.value) {
				T.error("Channel is required.");
				return;
			}
			En.value = !0;
			try {
				let e = await w.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: $.value,
					title: Q.value.trim(),
					priority: Tn.value,
					keep_until: wn.value
				});
				Y.value = [...Y.value, e], T.success("Series rule created."), kn();
			} catch (e) {
				T.error(r(e, "Failed to create rule."));
			} finally {
				En.value = !1;
			}
		}
		return fe(() => D.tuners, (e) => {
			e && !zt.value && Vt();
		}, { immediate: !0 }), fe(() => D.guide, (e) => {
			e && !qt.value && Xt(I.value);
		}), fe(() => D.recordings, (e) => {
			e && !nn.value && cn();
		}), fe(() => D.seriesRules, (e) => {
			e && !yn.value && (bn(), It());
		}), ue(() => {}), (e, n) => (g(), f("section", he, [
			n[70] ||= p("header", { class: "admin-livetv__head" }, [p("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			p("section", ge, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": D.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: n[0] ||= (e) => O("tuners")
			}, [p("span", ve, [
				h(t, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				n[23] ||= p("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				h(t, {
					name: D.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", ye, y(Gt.value), 1)], 8, _e), D.tuners ? (g(), f("div", be, [p("div", xe, [h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: M.value,
				onClick: Ht
			}, {
				default: x(() => [...n[24] ||= [m(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), j.value ? (g(), f("div", Se, [h(ae, {
				variant: "text",
				lines: 3
			})])) : N.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load tuners",
				description: N.value
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Vt
				}, {
					default: x(() => [...n[25] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (g(), f("div", Ce, [(g(!0), f(c, null, v(A.value, (e) => (g(), f("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				p("div", we, [p("span", Te, [h(a, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: x(() => [m(y(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), p("span", Ee, y(e.name), 1)]), h(a, { tone: e.enabled ? "success" : "neutral" }, {
					default: x(() => [m(y(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("dl", De, [
					n[29] ||= p("dt", null, "Host", -1),
					p("dd", null, y(e.host) + ":" + y(e.port), 1),
					e.device_id ? (g(), f(c, { key: 0 }, [n[26] ||= p("dt", null, "Device ID", -1), p("dd", null, y(e.device_id), 1)], 64)) : d("", !0),
					e.last_seen ? (g(), f(c, { key: 1 }, [n[27] ||= p("dt", null, "Last Seen", -1), p("dd", null, y(new Date(e.last_seen).toLocaleString()), 1)], 64)) : d("", !0),
					e.status ? (g(), f(c, { key: 2 }, [n[28] ||= p("dt", null, "Status", -1), p("dd", null, y(e.status), 1)], 64)) : d("", !0)
				]),
				p("div", Oe, [h(te, {
					"model-value": !!e.enabled,
					disabled: Bt[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Ut(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), h(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => P.value = e
				}, {
					default: x(() => [...n[30] ||= [m(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : d("", !0)]),
			p("section", ke, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": D.guide,
				"aria-controls": "livetv-guide-body",
				onClick: n[1] ||= (e) => O("guide")
			}, [p("span", je, [
				h(t, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				n[31] ||= p("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				h(t, {
					name: D.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", Me, y(en.value), 1)], 8, Ae), D.guide ? (g(), f("div", Ne, [p("div", Pe, [p("div", Fe, [(g(), f(c, null, v(Yt, (e, t) => p("button", {
				key: e,
				type: "button",
				class: le(["admin-livetv__seg-btn", { "is-active": I.value === t }]),
				"aria-pressed": I.value === t,
				onClick: (e) => Zt(t)
			}, y(e), 11, Ie)), 64))]), h(i, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Jt.value,
				onClick: $t
			}, {
				default: x(() => [...n[32] ||= [m(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Kt.value ? (g(), f("div", Le, [h(ae, {
				variant: "text",
				lines: 4
			})])) : R.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load guide",
				description: R.value
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: n[2] ||= (e) => Xt(I.value)
				}, {
					default: x(() => [...n[33] ||= [m("Retry", -1)]]),
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
				class: le(["admin-livetv__program", { "is-selected": L.value === e.id }]),
				role: "button",
				tabindex: "0",
				"aria-pressed": L.value === e.id,
				"aria-label": `${e.title}, ${E(e.start_time)} to ${E(e.end_time)}`,
				onClick: (t) => Qt(e),
				onKeydown: [pe(me((t) => Qt(e), ["prevent"]), ["enter"]), pe(me((t) => Qt(e), ["prevent"]), ["space"])]
			}, [
				p("div", Be, y(E(e.start_time)) + " – " + y(E(e.end_time)), 1),
				p("div", Ve, y(e.title), 1),
				e.description && L.value !== e.id ? (g(), f("p", He, y(e.description.slice(0, 100)) + y(e.description.length > 100 ? "…" : ""), 1)) : d("", !0),
				L.value === e.id ? (g(), f("div", Ue, [e.description ? (g(), f("p", We, y(e.description), 1)) : d("", !0), p("div", Ge, [
					e.rating ? (g(), u(a, {
						key: 0,
						tone: "neutral"
					}, {
						default: x(() => [m("Rating: " + y(e.rating), 1)]),
						_: 2
					}, 1024)) : d("", !0),
					e.season ? (g(), u(a, {
						key: 1,
						tone: "info"
					}, {
						default: x(() => [m(y(Ft(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : d("", !0),
					e.year ? (g(), u(a, {
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
				"aria-expanded": D.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: n[3] ||= (e) => O("recordings")
			}, [p("span", Je, [
				h(t, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				n[34] ||= p("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				h(t, {
					name: D.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", Ye, y(dn.value), 1)], 8, qe), D.recordings ? (g(), f("div", Xe, [p("div", Ze, [p("div", {
				ref_key: "recTablistEl",
				ref: an,
				class: "admin-livetv__segmented",
				role: "tablist",
				"aria-label": "Recording filter",
				onKeydown: sn
			}, [(g(), f(c, null, v(rn, (e) => p("button", {
				id: `rec-tab-${e.value}`,
				key: e.value,
				type: "button",
				role: "tab",
				class: le(["admin-livetv__seg-btn", { "is-active": B.value === e.value }]),
				"aria-selected": B.value === e.value,
				"aria-controls": `rec-panel-${e.value}`,
				tabindex: B.value === e.value ? 0 : -1,
				onClick: (t) => B.value = e.value
			}, y(e.label), 11, Qe)), 64))], 544), h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: hn
			}, {
				default: x(() => [...n[35] ||= [m(" Schedule Recording ", -1)]]),
				_: 1
			})]), p("div", {
				id: `rec-panel-${B.value}`,
				role: "tabpanel",
				"aria-labelledby": `rec-tab-${B.value}`
			}, [tn.value ? (g(), f("div", et, [h(ae, {
				variant: "text",
				lines: 3
			})])) : V.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recordings",
				description: V.value
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: cn
				}, {
					default: x(() => [...n[36] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : z.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: fn.value
			}, null, 8, ["description"])) : (g(), f("div", tt, [(g(!0), f(c, null, v(z.value, (e) => (g(), f("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				p("div", nt, [p("span", rt, y(e.program_title ?? "Untitled"), 1), e.status ? (g(), u(a, {
					key: 0,
					tone: un(e.status)
				}, {
					default: x(() => [m(y(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : d("", !0)]),
				p("div", it, [
					p("span", null, y(e.channel_name ?? e.channel_id), 1),
					p("span", null, y(Nt(e.start_time)) + " · " + y(E(e.start_time)) + " – " + y(E(e.end_time)), 1),
					p("span", null, y(Mt(e.start_time, e.end_time)), 1),
					e.size ? (g(), f("span", at, y(Pt(e.size)), 1)) : d("", !0)
				]),
				p("div", ot, [h(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
				}, {
					default: x(() => [...n[37] ||= [m(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))], 8, $e)])) : d("", !0)]),
			p("section", st, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": D.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: n[4] ||= (e) => O("seriesRules")
			}, [p("span", lt, [
				h(t, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				n[38] ||= p("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				h(t, {
					name: D.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", ut, y(Sn.value), 1)], 8, ct), D.seriesRules ? (g(), f("div", dt, [p("div", ft, [h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: On
			}, {
				default: x(() => [...n[39] ||= [m("Add Rule", -1)]]),
				_: 1
			})]), vn.value ? (g(), f("div", pt, [h(ae, {
				variant: "text",
				lines: 3
			})])) : X.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load series rules",
				description: X.value
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: bn
				}, {
					default: x(() => [...n[40] ||= [m("Retry", -1)]]),
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
				e.priority ? (g(), u(a, {
					key: 0,
					tone: "info"
				}, {
					default: x(() => [m("Priority " + y(e.priority), 1)]),
					_: 2
				}, 1024)) : d("", !0),
				e.keep_until ? (g(), u(a, {
					key: 1,
					tone: "neutral"
				}, {
					default: x(() => [m("Keep: " + y(e.keep_until), 1)]),
					_: 2
				}, 1024)) : d("", !0)
			])]), h(i, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => Z.value = e
			}, {
				default: x(() => [...n[41] ||= [m(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : d("", !0)]),
			h(o, {
				modelValue: pn.value,
				"onUpdate:modelValue": n[11] ||= (e) => pn.value = e,
				title: "Schedule Recording",
				onClose: gn
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: gn
				}, {
					default: x(() => [...n[48] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: mn.value,
					onClick: _n
				}, {
					default: x(() => [...n[49] ||= [m(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: me(_n, ["prevent"])
				}, [
					p("label", vt, [n[42] ||= p("span", { class: "admin-livetv__label" }, "Title", -1), S(p("input", {
						"onUpdate:modelValue": n[5] ||= (e) => W.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[b, W.value]])]),
					p("label", yt, [n[43] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(re, {
						modelValue: U.value,
						"onUpdate:modelValue": n[6] ||= (e) => U.value = e,
						options: Lt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("div", bt, [p("label", xt, [n[44] ||= p("span", { class: "admin-livetv__label" }, "Start Date", -1), S(p("input", {
						"onUpdate:modelValue": n[7] ||= (e) => G.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, G.value]])]), p("label", St, [n[45] ||= p("span", { class: "admin-livetv__label" }, "Start Time", -1), S(p("input", {
						"onUpdate:modelValue": n[8] ||= (e) => K.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, K.value]])])]),
					p("div", Ct, [p("label", wt, [n[46] ||= p("span", { class: "admin-livetv__label" }, "End Date", -1), S(p("input", {
						"onUpdate:modelValue": n[9] ||= (e) => q.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, q.value]])]), p("label", Tt, [n[47] ||= p("span", { class: "admin-livetv__label" }, "End Time", -1), S(p("input", {
						"onUpdate:modelValue": n[10] ||= (e) => J.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, J.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				modelValue: Cn.value,
				"onUpdate:modelValue": n[16] ||= (e) => Cn.value = e,
				title: "Add Series Rule",
				onClose: kn
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: kn
				}, {
					default: x(() => [...n[56] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: En.value,
					onClick: An
				}, {
					default: x(() => [...n[57] ||= [m("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: me(An, ["prevent"])
				}, [
					p("label", Et, [
						n[50] ||= p("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						S(p("input", {
							"onUpdate:modelValue": n[12] ||= (e) => Q.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[b, Q.value]]),
						n[51] ||= p("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					p("label", Dt, [n[52] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(re, {
						modelValue: $.value,
						"onUpdate:modelValue": n[13] ||= (e) => $.value = e,
						options: Lt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("label", Ot, [
						n[53] ||= p("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						p("input", {
							value: Tn.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: n[14] ||= (e) => Tn.value = Number(e.target.value)
						}, null, 40, kt),
						n[54] ||= p("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					p("label", At, [n[55] ||= p("span", { class: "admin-livetv__label" }, "Keep Until", -1), h(re, {
						modelValue: wn.value,
						"onUpdate:modelValue": n[15] ||= (e) => wn.value = e,
						options: Dn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				"model-value": P.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": n[18] ||= (e) => P.value = null
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[17] ||= (e) => P.value = null
				}, {
					default: x(() => [...n[60] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: Wt
				}, {
					default: x(() => [...n[61] ||= [m("Remove", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					n[58] ||= m("Remove tuner ", -1),
					p("strong", null, y(P.value?.name), 1),
					n[59] ||= m("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": n[20] ||= (e) => H.value = null
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[19] ||= (e) => H.value = null
				}, {
					default: x(() => [...n[64] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: ln
				}, {
					default: x(() => [...n[65] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					n[62] ||= m(" Delete recording ", -1),
					p("strong", null, y(H.value?.program_title ?? H.value?.id), 1),
					n[63] ||= m("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				"model-value": Z.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": n[22] ||= (e) => Z.value = null
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[21] ||= (e) => Z.value = null
				}, {
					default: x(() => [...n[68] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: xn
				}, {
					default: x(() => [...n[69] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					n[66] ||= m("Delete series rule ", -1),
					p("strong", null, y(Z.value?.title_pattern), 1),
					n[67] ||= m("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-53176210"]]);
//#endregion
export { C as default };

//# sourceMappingURL=LiveTvPage-CXxy3IEX.js.map