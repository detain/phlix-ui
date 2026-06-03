import { a as e, i as t, l as n, n as r, r as i, t as ee, u as te } from "./tokenStore-DfQvvLGI.js";
import { t as a } from "./Modal-CoXJKJI4.js";
import { t as o } from "./EmptyState-Oymq15Ey.js";
import { t as ne } from "./Select-B0YIBPe2.js";
import { t as s } from "./Badge-Cmz5FPqw.js";
import { t as re } from "./Switch-BymhyT_V.js";
import { t as ie } from "./liveTv-Dbjt901v.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as ae, inject as oe, normalizeClass as se, onMounted as ce, openBlock as g, reactive as le, ref as _, renderList as v, toDisplayString as y, vModelText as b, watch as ue, withCtx as x, withDirectives as S, withKeys as de, withModifiers as C } from "vue";
//#region src/pages/admin/LiveTvPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-livetv",
	"aria-labelledby": "livetv-heading"
}, pe = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-tuners-heading"
}, me = ["aria-expanded"], he = { class: "admin-livetv__section-title-row" }, ge = { class: "admin-livetv__section-summary" }, _e = {
	key: 0,
	id: "livetv-tuners-body",
	class: "admin-livetv__section-body"
}, ve = { class: "admin-livetv__toolbar" }, ye = {
	key: 0,
	class: "admin-livetv__skel"
}, be = {
	key: 2,
	class: "admin-livetv__card-grid"
}, xe = { class: "admin-livetv__card-head" }, Se = { class: "admin-livetv__card-title-row" }, Ce = { class: "admin-livetv__card-name" }, we = { class: "admin-livetv__dl" }, Te = { class: "admin-livetv__card-actions" }, Ee = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-guide-heading"
}, De = ["aria-expanded"], Oe = { class: "admin-livetv__section-title-row" }, ke = { class: "admin-livetv__section-summary" }, Ae = {
	key: 0,
	id: "livetv-guide-body",
	class: "admin-livetv__section-body"
}, je = { class: "admin-livetv__toolbar" }, Me = {
	class: "admin-livetv__segmented",
	role: "group",
	"aria-label": "Guide date"
}, Ne = ["aria-pressed", "onClick"], Pe = {
	key: 0,
	class: "admin-livetv__skel"
}, Fe = {
	key: 2,
	class: "admin-livetv__guide-grid",
	role: "list"
}, Ie = ["onClick", "onKeydown"], Le = { class: "admin-livetv__program-time" }, Re = { class: "admin-livetv__program-title" }, ze = {
	key: 0,
	class: "admin-livetv__program-desc"
}, Be = {
	key: 1,
	class: "admin-livetv__program-expanded"
}, Ve = {
	key: 0,
	class: "admin-livetv__program-full-desc"
}, He = { class: "admin-livetv__program-meta" }, Ue = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-recordings-heading"
}, We = ["aria-expanded"], Ge = { class: "admin-livetv__section-title-row" }, Ke = { class: "admin-livetv__section-summary" }, qe = {
	key: 0,
	id: "livetv-recordings-body",
	class: "admin-livetv__section-body"
}, Je = { class: "admin-livetv__toolbar" }, Ye = {
	class: "admin-livetv__segmented",
	role: "tablist",
	"aria-label": "Recording filter"
}, Xe = ["aria-selected", "onClick"], Ze = {
	key: 0,
	class: "admin-livetv__skel"
}, Qe = {
	key: 2,
	class: "admin-livetv__rec-list"
}, $e = { class: "admin-livetv__card-head" }, et = { class: "admin-livetv__card-name" }, tt = { class: "admin-livetv__rec-meta" }, nt = { key: 0 }, rt = { class: "admin-livetv__card-actions" }, it = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-rules-heading"
}, at = ["aria-expanded"], ot = { class: "admin-livetv__section-title-row" }, st = { class: "admin-livetv__section-summary" }, ct = {
	key: 0,
	id: "livetv-rules-body",
	class: "admin-livetv__section-body"
}, lt = { class: "admin-livetv__toolbar" }, ut = {
	key: 0,
	class: "admin-livetv__skel"
}, dt = {
	key: 2,
	class: "admin-livetv__rule-list"
}, ft = { class: "admin-livetv__rule-info" }, pt = { class: "admin-livetv__rule-title" }, mt = { class: "admin-livetv__rule-meta" }, ht = { class: "admin-livetv__field" }, gt = { class: "admin-livetv__field" }, _t = { class: "admin-livetv__field-row" }, vt = { class: "admin-livetv__field" }, yt = { class: "admin-livetv__field" }, bt = { class: "admin-livetv__field-row" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = ["value"], Dt = { class: "admin-livetv__field" }, w = /*#__PURE__*/ te(/* @__PURE__ */ ae({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(te) {
		let ae = te, w = oe("apiBase", ""), Ot = l(() => typeof w == "string" ? w : w?.value ?? ""), T = new ie(ae.client ?? new e({
			baseUrl: Ot.value,
			tokenStore: new ee()
		})), E = t();
		function D(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function kt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), i = n % 60;
			return i > 0 ? `${r}h ${i}m` : `${r}h`;
		}
		function At(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function jt(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function Mt(e) {
			return `${(e / 1024 / 1024).toFixed(1)} MB`;
		}
		function Nt(e, t) {
			return `S${String(e ?? 0).padStart(2, "0")}E${String(t ?? 0).padStart(2, "0")}`;
		}
		let O = le({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function k(e) {
			O[e] = !O[e];
		}
		let A = _([]);
		async function Pt() {
			try {
				A.value = await T.listChannels();
			} catch {}
		}
		let Ft = l(() => A.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function It(e) {
			let t = A.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let j = _([]), M = _(!1), Lt = _(!1), N = _(!1), Rt = le({});
		async function zt() {
			M.value = !0;
			try {
				j.value = await T.listTuners(), Lt.value = !0;
			} catch (e) {
				E.error(D(e, "Failed to load tuners."));
			} finally {
				M.value = !1;
			}
		}
		async function Bt() {
			if (!N.value) {
				N.value = !0;
				try {
					let e = await T.scanTuners();
					j.value = e, Lt.value = !0, E.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					E.error(D(e, "Tuner scan failed."));
				} finally {
					N.value = !1;
				}
			}
		}
		async function Vt(e) {
			if (!Rt[e.tuner_id]) {
				Rt[e.tuner_id] = !0;
				try {
					let t = await T.updateTuner(e.tuner_id, { enabled: !e.enabled });
					j.value = j.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					E.error(D(e, "Failed to update tuner."));
				} finally {
					Rt[e.tuner_id] = !1;
				}
			}
		}
		let P = _(null);
		async function Ht() {
			let e = P.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), j.value = j.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), P.value = null;
			} catch (e) {
				E.error(D(e, "Failed to delete tuner.")), P.value = null;
			}
		}
		let Ut = l(() => M.value ? "Loading…" : j.value.length === 0 ? "No tuners found" : `${j.value.length} tuner${j.value.length === 1 ? "" : "s"} configured`), F = _([]), Wt = _(!1), Gt = _(!1), I = _(0), L = _(null), R = _(!1), Kt = [
			"Today",
			"+1 Day",
			"+2 Days"
		];
		async function qt(e) {
			Wt.value = !0;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				F.value = await T.listGuide({
					from: t,
					to: n
				}), Gt.value = !0;
			} catch (e) {
				E.error(D(e, "Failed to load guide."));
			} finally {
				Wt.value = !1;
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
					let e = await T.refreshGuide();
					E.success(`Guide refreshed. ${e} programmes imported.`), await qt(I.value);
				} catch (e) {
					E.error(D(e, "Guide refresh failed."));
				} finally {
					R.value = !1;
				}
			}
		}
		let Zt = l(() => Wt.value ? "Loading…" : F.value.length > 0 ? `${F.value.length} programmes` : "No programmes"), z = _([]), B = _(!1), Qt = _(!1), V = _("all"), $t = [
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
				z.value = await T.listRecordings(), Qt.value = !0;
			} catch (e) {
				E.error(D(e, "Failed to load recordings."));
			} finally {
				B.value = !1;
			}
		}
		let H = _(null);
		async function tn() {
			let e = H.value;
			if (e) try {
				await T.deleteRecording(e.id), z.value = z.value.filter((t) => t.id !== e.id), E.success("Recording deleted."), H.value = null;
			} catch (e) {
				E.error(D(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function nn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let rn = l(() => B.value ? "Loading…" : `${z.value.length} recording${z.value.length === 1 ? "" : "s"}`), an = l(() => V.value === "upcoming" ? "No upcoming recordings." : V.value === "by-series" ? "No series recordings." : "No recordings yet."), U = _(!1), W = _(""), G = _(""), K = _(""), q = _(""), J = _(""), Y = _(""), on = _(!1);
		async function sn() {
			await Pt(), W.value = A.value[0]?.id ?? "", G.value = "", K.value = "", q.value = "", J.value = "", Y.value = "", U.value = !0;
		}
		function cn() {
			U.value = !1;
		}
		async function ln() {
			if (!W.value) {
				E.error("Channel is required.");
				return;
			}
			if (!G.value.trim()) {
				E.error("Title is required.");
				return;
			}
			if (!K.value || !q.value || !J.value || !Y.value) {
				E.error("Start and end date/time are required.");
				return;
			}
			let e = Math.floor((/* @__PURE__ */ new Date(`${K.value}T${q.value}`)).getTime() / 1e3), t = Math.floor((/* @__PURE__ */ new Date(`${J.value}T${Y.value}`)).getTime() / 1e3);
			if (t <= e) {
				E.error("End must be after start.");
				return;
			}
			on.value = !0;
			try {
				let n = await T.createRecording({
					channel_id: W.value,
					start_time: e,
					end_time: t,
					title: G.value.trim()
				});
				z.value = [...z.value, n], E.success("Recording scheduled."), cn();
			} catch (e) {
				E.error(D(e, "Failed to schedule recording."));
			} finally {
				on.value = !1;
			}
		}
		let X = _([]), un = _(!1), dn = _(!1);
		async function fn() {
			un.value = !0;
			try {
				X.value = await T.listSeriesRules(), dn.value = !0;
			} catch (e) {
				E.error(D(e, "Failed to load series rules."));
			} finally {
				un.value = !1;
			}
		}
		let Z = _(null);
		async function pn() {
			let e = Z.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), X.value = X.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), Z.value = null;
			} catch (e) {
				E.error(D(e, "Failed to delete rule.")), Z.value = null;
			}
		}
		let mn = l(() => un.value ? "Loading…" : `${X.value.length} rule${X.value.length === 1 ? "" : "s"}`), hn = _(!1), Q = _(""), $ = _(""), gn = _("space"), _n = _(3), vn = _(!1), yn = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function bn() {
			await Pt(), Q.value = "", $.value = A.value[0]?.id ?? "", gn.value = "space", _n.value = 3, hn.value = !0;
		}
		function xn() {
			hn.value = !1;
		}
		async function Sn() {
			if (!Q.value.trim()) {
				E.error("Title pattern is required.");
				return;
			}
			if (!$.value) {
				E.error("Channel is required.");
				return;
			}
			vn.value = !0;
			try {
				let e = await T.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: $.value,
					title: Q.value.trim(),
					priority: _n.value,
					keep_until: gn.value
				});
				X.value = [...X.value, e], E.success("Series rule created."), xn();
			} catch (e) {
				E.error(D(e, "Failed to create rule."));
			} finally {
				vn.value = !1;
			}
		}
		return ue(() => O.tuners, (e) => {
			e && !Lt.value && zt();
		}, { immediate: !0 }), ue(() => O.guide, (e) => {
			e && !Gt.value && qt(I.value);
		}), ue(() => O.recordings, (e) => {
			e && !Qt.value && en();
		}), ue(() => O.seriesRules, (e) => {
			e && !dn.value && (fn(), Pt());
		}), ce(() => {}), (e, t) => (g(), f("section", fe, [
			t[65] ||= p("header", { class: "admin-livetv__head" }, [p("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			p("section", pe, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: t[0] ||= (e) => k("tuners")
			}, [p("span", he, [
				h(n, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				t[22] ||= p("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				h(n, {
					name: O.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", ge, y(Ut.value), 1)], 8, me), O.tuners ? (g(), f("div", _e, [p("div", ve, [h(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: N.value,
				onClick: Bt
			}, {
				default: x(() => [...t[23] ||= [m(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), M.value ? (g(), f("div", ye, [h(i, {
				variant: "text",
				lines: 3
			})])) : j.value.length === 0 ? (g(), u(o, {
				key: 1,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (g(), f("div", be, [(g(!0), f(c, null, v(j.value, (e) => (g(), f("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				p("div", xe, [p("span", Se, [h(s, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: x(() => [m(y(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), p("span", Ce, y(e.name), 1)]), h(s, { tone: e.enabled ? "success" : "neutral" }, {
					default: x(() => [m(y(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("dl", we, [
					t[27] ||= p("dt", null, "Host", -1),
					p("dd", null, y(e.host) + ":" + y(e.port), 1),
					e.device_id ? (g(), f(c, { key: 0 }, [t[24] ||= p("dt", null, "Device ID", -1), p("dd", null, y(e.device_id), 1)], 64)) : d("", !0),
					e.last_seen ? (g(), f(c, { key: 1 }, [t[25] ||= p("dt", null, "Last Seen", -1), p("dd", null, y(new Date(e.last_seen).toLocaleString()), 1)], 64)) : d("", !0),
					e.status ? (g(), f(c, { key: 2 }, [t[26] ||= p("dt", null, "Status", -1), p("dd", null, y(e.status), 1)], 64)) : d("", !0)
				]),
				p("div", Te, [h(re, {
					"model-value": !!e.enabled,
					disabled: Rt[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Vt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), h(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => P.value = e
				}, {
					default: x(() => [...t[28] ||= [m(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : d("", !0)]),
			p("section", Ee, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.guide,
				"aria-controls": "livetv-guide-body",
				onClick: t[1] ||= (e) => k("guide")
			}, [p("span", Oe, [
				h(n, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				t[29] ||= p("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				h(n, {
					name: O.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", ke, y(Zt.value), 1)], 8, De), O.guide ? (g(), f("div", Ae, [p("div", je, [p("div", Me, [(g(), f(c, null, v(Kt, (e, t) => p("button", {
				key: e,
				type: "button",
				class: se(["admin-livetv__seg-btn", { "is-active": I.value === t }]),
				"aria-pressed": I.value === t,
				onClick: (e) => Jt(t)
			}, y(e), 11, Ne)), 64))]), h(r, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: R.value,
				onClick: Xt
			}, {
				default: x(() => [...t[30] ||= [m(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Wt.value ? (g(), f("div", Pe, [h(i, {
				variant: "text",
				lines: 4
			})])) : F.value.length === 0 ? (g(), u(o, {
				key: 1,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (g(), f("div", Fe, [(g(!0), f(c, null, v(F.value, (e) => (g(), f("div", {
				key: e.id,
				class: se(["admin-livetv__program", { "is-selected": L.value === e.id }]),
				role: "listitem",
				tabindex: "0",
				onClick: (t) => Yt(e),
				onKeydown: [de(C((t) => Yt(e), ["prevent"]), ["enter"]), de(C((t) => Yt(e), ["prevent"]), ["space"])]
			}, [
				p("div", Le, y(jt(e.start_time)) + " – " + y(jt(e.end_time)), 1),
				p("div", Re, y(e.title), 1),
				e.description && L.value !== e.id ? (g(), f("p", ze, y(e.description.slice(0, 100)) + y(e.description.length > 100 ? "…" : ""), 1)) : d("", !0),
				L.value === e.id ? (g(), f("div", Be, [e.description ? (g(), f("p", Ve, y(e.description), 1)) : d("", !0), p("div", He, [
					e.rating ? (g(), u(s, {
						key: 0,
						tone: "neutral"
					}, {
						default: x(() => [m("Rating: " + y(e.rating), 1)]),
						_: 2
					}, 1024)) : d("", !0),
					e.season ? (g(), u(s, {
						key: 1,
						tone: "info"
					}, {
						default: x(() => [m(y(Nt(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : d("", !0),
					e.year ? (g(), u(s, {
						key: 2,
						tone: "neutral"
					}, {
						default: x(() => [m(y(e.year), 1)]),
						_: 2
					}, 1024)) : d("", !0)
				])])) : d("", !0)
			], 42, Ie))), 128))]))])) : d("", !0)]),
			p("section", Ue, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: t[2] ||= (e) => k("recordings")
			}, [p("span", Ge, [
				h(n, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				t[31] ||= p("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				h(n, {
					name: O.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", Ke, y(rn.value), 1)], 8, We), O.recordings ? (g(), f("div", qe, [p("div", Je, [p("div", Ye, [(g(), f(c, null, v($t, (e) => p("button", {
				key: e.value,
				type: "button",
				role: "tab",
				class: se(["admin-livetv__seg-btn", { "is-active": V.value === e.value }]),
				"aria-selected": V.value === e.value,
				onClick: (t) => V.value = e.value
			}, y(e.label), 11, Xe)), 64))]), h(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: sn
			}, {
				default: x(() => [...t[32] ||= [m(" Schedule Recording ", -1)]]),
				_: 1
			})]), B.value ? (g(), f("div", Ze, [h(i, {
				variant: "text",
				lines: 3
			})])) : z.value.length === 0 ? (g(), u(o, {
				key: 1,
				icon: "film",
				title: "No recordings",
				description: an.value
			}, null, 8, ["description"])) : (g(), f("div", Qe, [(g(!0), f(c, null, v(z.value, (e) => (g(), f("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				p("div", $e, [p("span", et, y(e.program_title ?? "Untitled"), 1), e.status ? (g(), u(s, {
					key: 0,
					tone: nn(e.status)
				}, {
					default: x(() => [m(y(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : d("", !0)]),
				p("div", tt, [
					p("span", null, y(e.channel_name ?? e.channel_id), 1),
					p("span", null, y(At(e.start_time)) + " · " + y(jt(e.start_time)) + " – " + y(jt(e.end_time)), 1),
					p("span", null, y(kt(e.start_time, e.end_time)), 1),
					e.size ? (g(), f("span", nt, y(Mt(e.size)), 1)) : d("", !0)
				]),
				p("div", rt, [h(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
				}, {
					default: x(() => [...t[33] ||= [m(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : d("", !0)]),
			p("section", it, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: t[3] ||= (e) => k("seriesRules")
			}, [p("span", ot, [
				h(n, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				t[34] ||= p("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				h(n, {
					name: O.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", st, y(mn.value), 1)], 8, at), O.seriesRules ? (g(), f("div", ct, [p("div", lt, [h(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: bn
			}, {
				default: x(() => [...t[35] ||= [m("Add Rule", -1)]]),
				_: 1
			})]), un.value ? (g(), f("div", ut, [h(i, {
				variant: "text",
				lines: 3
			})])) : X.value.length === 0 ? (g(), u(o, {
				key: 1,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (g(), f("div", dt, [(g(!0), f(c, null, v(X.value, (e) => (g(), f("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [p("div", ft, [p("span", pt, y(e.title_pattern), 1), p("div", mt, [
				p("span", null, y(It(e)), 1),
				e.priority ? (g(), u(s, {
					key: 0,
					tone: "info"
				}, {
					default: x(() => [m("Priority " + y(e.priority), 1)]),
					_: 2
				}, 1024)) : d("", !0),
				e.keep_until ? (g(), u(s, {
					key: 1,
					tone: "neutral"
				}, {
					default: x(() => [m("Keep: " + y(e.keep_until), 1)]),
					_: 2
				}, 1024)) : d("", !0)
			])]), h(r, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => Z.value = e
			}, {
				default: x(() => [...t[36] ||= [m(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : d("", !0)]),
			h(a, {
				modelValue: U.value,
				"onUpdate:modelValue": t[10] ||= (e) => U.value = e,
				title: "Schedule Recording",
				onClose: cn
			}, {
				footer: x(() => [h(r, {
					variant: "ghost",
					size: "sm",
					onClick: cn
				}, {
					default: x(() => [...t[43] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "solid",
					size: "sm",
					loading: on.value,
					onClick: ln
				}, {
					default: x(() => [...t[44] ||= [m(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: C(ln, ["prevent"])
				}, [
					p("label", ht, [t[37] ||= p("span", { class: "admin-livetv__label" }, "Title", -1), S(p("input", {
						"onUpdate:modelValue": t[4] ||= (e) => G.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[b, G.value]])]),
					p("label", gt, [t[38] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(ne, {
						modelValue: W.value,
						"onUpdate:modelValue": t[5] ||= (e) => W.value = e,
						options: Ft.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("div", _t, [p("label", vt, [t[39] ||= p("span", { class: "admin-livetv__label" }, "Start Date", -1), S(p("input", {
						"onUpdate:modelValue": t[6] ||= (e) => K.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, K.value]])]), p("label", yt, [t[40] ||= p("span", { class: "admin-livetv__label" }, "Start Time", -1), S(p("input", {
						"onUpdate:modelValue": t[7] ||= (e) => q.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, q.value]])])]),
					p("div", bt, [p("label", xt, [t[41] ||= p("span", { class: "admin-livetv__label" }, "End Date", -1), S(p("input", {
						"onUpdate:modelValue": t[8] ||= (e) => J.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, J.value]])]), p("label", St, [t[42] ||= p("span", { class: "admin-livetv__label" }, "End Time", -1), S(p("input", {
						"onUpdate:modelValue": t[9] ||= (e) => Y.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, Y.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(a, {
				modelValue: hn.value,
				"onUpdate:modelValue": t[15] ||= (e) => hn.value = e,
				title: "Add Series Rule",
				onClose: xn
			}, {
				footer: x(() => [h(r, {
					variant: "ghost",
					size: "sm",
					onClick: xn
				}, {
					default: x(() => [...t[51] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "solid",
					size: "sm",
					loading: vn.value,
					onClick: Sn
				}, {
					default: x(() => [...t[52] ||= [m("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: C(Sn, ["prevent"])
				}, [
					p("label", Ct, [
						t[45] ||= p("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						S(p("input", {
							"onUpdate:modelValue": t[11] ||= (e) => Q.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[b, Q.value]]),
						t[46] ||= p("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					p("label", wt, [t[47] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(ne, {
						modelValue: $.value,
						"onUpdate:modelValue": t[12] ||= (e) => $.value = e,
						options: Ft.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("label", Tt, [
						t[48] ||= p("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						p("input", {
							value: _n.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: t[13] ||= (e) => _n.value = Number(e.target.value)
						}, null, 40, Et),
						t[49] ||= p("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					p("label", Dt, [t[50] ||= p("span", { class: "admin-livetv__label" }, "Keep Until", -1), h(ne, {
						modelValue: gn.value,
						"onUpdate:modelValue": t[14] ||= (e) => gn.value = e,
						options: yn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(a, {
				"model-value": P.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": t[17] ||= (e) => P.value = null
			}, {
				footer: x(() => [h(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[16] ||= (e) => P.value = null
				}, {
					default: x(() => [...t[55] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "solid",
					size: "sm",
					onClick: Ht
				}, {
					default: x(() => [...t[56] ||= [m("Remove", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[53] ||= m("Remove tuner ", -1),
					p("strong", null, y(P.value?.name), 1),
					t[54] ||= m("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(a, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": t[19] ||= (e) => H.value = null
			}, {
				footer: x(() => [h(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[18] ||= (e) => H.value = null
				}, {
					default: x(() => [...t[59] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "solid",
					size: "sm",
					onClick: tn
				}, {
					default: x(() => [...t[60] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[57] ||= m(" Delete recording ", -1),
					p("strong", null, y(H.value?.program_title ?? H.value?.id), 1),
					t[58] ||= m("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(a, {
				"model-value": Z.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": t[21] ||= (e) => Z.value = null
			}, {
				footer: x(() => [h(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[20] ||= (e) => Z.value = null
				}, {
					default: x(() => [...t[63] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "solid",
					size: "sm",
					onClick: pn
				}, {
					default: x(() => [...t[64] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[61] ||= m("Delete series rule ", -1),
					p("strong", null, y(Z.value?.title_pattern), 1),
					t[62] ||= m("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-d53b3ae8"]]);
//#endregion
export { w as default };

//# sourceMappingURL=LiveTvPage-BOREIUhL.js.map