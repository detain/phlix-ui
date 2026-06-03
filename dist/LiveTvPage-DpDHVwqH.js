import { a as e, i as t, m as n, n as r, p as i, r as ee, t as a } from "./Button-DjEQ9y17.js";
import { t as o } from "./Modal-BkSAbwHm.js";
import { t as te } from "./EmptyState-bbKd8GNA.js";
import { t as ne } from "./Select-BPlN5xaU.js";
import { t as s } from "./Badge-DobVc76J.js";
import { t as re } from "./Switch-BNdBMUaS.js";
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
}, ft = { class: "admin-livetv__rule-info" }, pt = { class: "admin-livetv__rule-title" }, mt = { class: "admin-livetv__rule-meta" }, ht = { class: "admin-livetv__field" }, gt = { class: "admin-livetv__field" }, _t = { class: "admin-livetv__field-row" }, vt = { class: "admin-livetv__field" }, yt = { class: "admin-livetv__field" }, bt = { class: "admin-livetv__field-row" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = ["value"], Dt = { class: "admin-livetv__field" }, w = /*#__PURE__*/ n(/* @__PURE__ */ ae({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(n) {
		let ae = n, w = oe("apiBase", ""), Ot = l(() => typeof w == "string" ? w : w?.value ?? ""), T = new ie(ae.client ?? new e({
			baseUrl: Ot.value,
			tokenStore: new t()
		})), E = ee();
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
		function O(e) {
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
		let k = le({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function A(e) {
			k[e] = !k[e];
		}
		let j = _([]);
		async function Nt() {
			try {
				j.value = await T.listChannels();
			} catch {}
		}
		let Pt = l(() => j.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Ft(e) {
			let t = j.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let M = _([]), N = _(!1), It = _(!1), P = _(!1), F = le({});
		async function Lt() {
			N.value = !0;
			try {
				M.value = await T.listTuners(), It.value = !0;
			} catch (e) {
				E.error(D(e, "Failed to load tuners."));
			} finally {
				N.value = !1;
			}
		}
		async function Rt() {
			if (!P.value) {
				P.value = !0;
				try {
					let e = await T.scanTuners();
					M.value = e, It.value = !0, E.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					E.error(D(e, "Tuner scan failed."));
				} finally {
					P.value = !1;
				}
			}
		}
		async function zt(e) {
			if (!F[e.tuner_id]) {
				F[e.tuner_id] = !0;
				try {
					let t = await T.updateTuner(e.tuner_id, { enabled: !e.enabled });
					M.value = M.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					E.error(D(e, "Failed to update tuner."));
				} finally {
					F[e.tuner_id] = !1;
				}
			}
		}
		let I = _(null);
		async function Bt() {
			let e = I.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), M.value = M.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), I.value = null;
			} catch (e) {
				E.error(D(e, "Failed to delete tuner.")), I.value = null;
			}
		}
		let Vt = l(() => N.value ? "Loading…" : M.value.length === 0 ? "No tuners found" : `${M.value.length} tuner${M.value.length === 1 ? "" : "s"} configured`), L = _([]), Ht = _(!1), Ut = _(!1), R = _(0), z = _(null), Wt = _(!1), Gt = [
			"Today",
			"+1 Day",
			"+2 Days"
		];
		async function Kt(e) {
			Ht.value = !0;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				L.value = await T.listGuide({
					from: t,
					to: n
				}), Ut.value = !0;
			} catch (e) {
				E.error(D(e, "Failed to load guide."));
			} finally {
				Ht.value = !1;
			}
		}
		function qt(e) {
			R.value = e, Kt(e);
		}
		function Jt(e) {
			z.value = z.value === e.id ? null : e.id;
		}
		async function Yt() {
			if (!Wt.value) {
				Wt.value = !0;
				try {
					let e = await T.refreshGuide();
					E.success(`Guide refreshed. ${e} programmes imported.`), await Kt(R.value);
				} catch (e) {
					E.error(D(e, "Guide refresh failed."));
				} finally {
					Wt.value = !1;
				}
			}
		}
		let Xt = l(() => Ht.value ? "Loading…" : L.value.length > 0 ? `${L.value.length} programmes` : "No programmes"), B = _([]), Zt = _(!1), Qt = _(!1), V = _("all"), $t = [
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
			Zt.value = !0;
			try {
				B.value = await T.listRecordings(), Qt.value = !0;
			} catch (e) {
				E.error(D(e, "Failed to load recordings."));
			} finally {
				Zt.value = !1;
			}
		}
		let H = _(null);
		async function tn() {
			let e = H.value;
			if (e) try {
				await T.deleteRecording(e.id), B.value = B.value.filter((t) => t.id !== e.id), E.success("Recording deleted."), H.value = null;
			} catch (e) {
				E.error(D(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function nn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let rn = l(() => Zt.value ? "Loading…" : `${B.value.length} recording${B.value.length === 1 ? "" : "s"}`), an = l(() => V.value === "upcoming" ? "No upcoming recordings." : V.value === "by-series" ? "No series recordings." : "No recordings yet."), on = _(!1), U = _(""), W = _(""), G = _(""), K = _(""), q = _(""), J = _(""), sn = _(!1);
		async function cn() {
			await Nt(), U.value = j.value[0]?.id ?? "", W.value = "", G.value = "", K.value = "", q.value = "", J.value = "", on.value = !0;
		}
		function ln() {
			on.value = !1;
		}
		async function un() {
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
			sn.value = !0;
			try {
				let n = await T.createRecording({
					channel_id: U.value,
					start_time: e,
					end_time: t,
					title: W.value.trim()
				});
				B.value = [...B.value, n], E.success("Recording scheduled."), ln();
			} catch (e) {
				E.error(D(e, "Failed to schedule recording."));
			} finally {
				sn.value = !1;
			}
		}
		let Y = _([]), dn = _(!1), fn = _(!1);
		async function pn() {
			dn.value = !0;
			try {
				Y.value = await T.listSeriesRules(), fn.value = !0;
			} catch (e) {
				E.error(D(e, "Failed to load series rules."));
			} finally {
				dn.value = !1;
			}
		}
		let X = _(null);
		async function mn() {
			let e = X.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), Y.value = Y.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), X.value = null;
			} catch (e) {
				E.error(D(e, "Failed to delete rule.")), X.value = null;
			}
		}
		let hn = l(() => dn.value ? "Loading…" : `${Y.value.length} rule${Y.value.length === 1 ? "" : "s"}`), gn = _(!1), Z = _(""), Q = _(""), _n = _("space"), $ = _(3), vn = _(!1), yn = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function bn() {
			await Nt(), Z.value = "", Q.value = j.value[0]?.id ?? "", _n.value = "space", $.value = 3, gn.value = !0;
		}
		function xn() {
			gn.value = !1;
		}
		async function Sn() {
			if (!Z.value.trim()) {
				E.error("Title pattern is required.");
				return;
			}
			if (!Q.value) {
				E.error("Channel is required.");
				return;
			}
			vn.value = !0;
			try {
				let e = await T.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: Q.value,
					title: Z.value.trim(),
					priority: $.value,
					keep_until: _n.value
				});
				Y.value = [...Y.value, e], E.success("Series rule created."), xn();
			} catch (e) {
				E.error(D(e, "Failed to create rule."));
			} finally {
				vn.value = !1;
			}
		}
		return ue(() => k.tuners, (e) => {
			e && !It.value && Lt();
		}, { immediate: !0 }), ue(() => k.guide, (e) => {
			e && !Ut.value && Kt(R.value);
		}), ue(() => k.recordings, (e) => {
			e && !Qt.value && en();
		}), ue(() => k.seriesRules, (e) => {
			e && !fn.value && (pn(), Nt());
		}), ce(() => {}), (e, t) => (g(), f("section", fe, [
			t[65] ||= p("header", { class: "admin-livetv__head" }, [p("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			p("section", pe, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: t[0] ||= (e) => A("tuners")
			}, [p("span", he, [
				h(i, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				t[22] ||= p("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				h(i, {
					name: k.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", ge, y(Vt.value), 1)], 8, me), k.tuners ? (g(), f("div", _e, [p("div", ve, [h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: P.value,
				onClick: Rt
			}, {
				default: x(() => [...t[23] ||= [m(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), N.value ? (g(), f("div", ye, [h(r, {
				variant: "text",
				lines: 3
			})])) : M.value.length === 0 ? (g(), u(te, {
				key: 1,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (g(), f("div", be, [(g(!0), f(c, null, v(M.value, (e) => (g(), f("article", {
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
					disabled: F[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => zt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), h(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => I.value = e
				}, {
					default: x(() => [...t[28] ||= [m(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : d("", !0)]),
			p("section", Ee, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.guide,
				"aria-controls": "livetv-guide-body",
				onClick: t[1] ||= (e) => A("guide")
			}, [p("span", Oe, [
				h(i, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				t[29] ||= p("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				h(i, {
					name: k.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", ke, y(Xt.value), 1)], 8, De), k.guide ? (g(), f("div", Ae, [p("div", je, [p("div", Me, [(g(), f(c, null, v(Gt, (e, t) => p("button", {
				key: e,
				type: "button",
				class: se(["admin-livetv__seg-btn", { "is-active": R.value === t }]),
				"aria-pressed": R.value === t,
				onClick: (e) => qt(t)
			}, y(e), 11, Ne)), 64))]), h(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Wt.value,
				onClick: Yt
			}, {
				default: x(() => [...t[30] ||= [m(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Ht.value ? (g(), f("div", Pe, [h(r, {
				variant: "text",
				lines: 4
			})])) : L.value.length === 0 ? (g(), u(te, {
				key: 1,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (g(), f("div", Fe, [(g(!0), f(c, null, v(L.value, (e) => (g(), f("div", {
				key: e.id,
				class: se(["admin-livetv__program", { "is-selected": z.value === e.id }]),
				role: "listitem",
				tabindex: "0",
				onClick: (t) => Jt(e),
				onKeydown: [de(C((t) => Jt(e), ["prevent"]), ["enter"]), de(C((t) => Jt(e), ["prevent"]), ["space"])]
			}, [
				p("div", Le, y(O(e.start_time)) + " – " + y(O(e.end_time)), 1),
				p("div", Re, y(e.title), 1),
				e.description && z.value !== e.id ? (g(), f("p", ze, y(e.description.slice(0, 100)) + y(e.description.length > 100 ? "…" : ""), 1)) : d("", !0),
				z.value === e.id ? (g(), f("div", Be, [e.description ? (g(), f("p", Ve, y(e.description), 1)) : d("", !0), p("div", He, [
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
						default: x(() => [m(y(Mt(e.season, e.episode)), 1)]),
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
				"aria-expanded": k.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: t[2] ||= (e) => A("recordings")
			}, [p("span", Ge, [
				h(i, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				t[31] ||= p("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				h(i, {
					name: k.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", Ke, y(rn.value), 1)], 8, We), k.recordings ? (g(), f("div", qe, [p("div", Je, [p("div", Ye, [(g(), f(c, null, v($t, (e) => p("button", {
				key: e.value,
				type: "button",
				role: "tab",
				class: se(["admin-livetv__seg-btn", { "is-active": V.value === e.value }]),
				"aria-selected": V.value === e.value,
				onClick: (t) => V.value = e.value
			}, y(e.label), 11, Xe)), 64))]), h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: cn
			}, {
				default: x(() => [...t[32] ||= [m(" Schedule Recording ", -1)]]),
				_: 1
			})]), Zt.value ? (g(), f("div", Ze, [h(r, {
				variant: "text",
				lines: 3
			})])) : B.value.length === 0 ? (g(), u(te, {
				key: 1,
				icon: "film",
				title: "No recordings",
				description: an.value
			}, null, 8, ["description"])) : (g(), f("div", Qe, [(g(!0), f(c, null, v(B.value, (e) => (g(), f("article", {
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
					p("span", null, y(At(e.start_time)) + " · " + y(O(e.start_time)) + " – " + y(O(e.end_time)), 1),
					p("span", null, y(kt(e.start_time, e.end_time)), 1),
					e.size ? (g(), f("span", nt, y(jt(e.size)), 1)) : d("", !0)
				]),
				p("div", rt, [h(a, {
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
				"aria-expanded": k.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: t[3] ||= (e) => A("seriesRules")
			}, [p("span", ot, [
				h(i, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				t[34] ||= p("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				h(i, {
					name: k.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", st, y(hn.value), 1)], 8, at), k.seriesRules ? (g(), f("div", ct, [p("div", lt, [h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: bn
			}, {
				default: x(() => [...t[35] ||= [m("Add Rule", -1)]]),
				_: 1
			})]), dn.value ? (g(), f("div", ut, [h(r, {
				variant: "text",
				lines: 3
			})])) : Y.value.length === 0 ? (g(), u(te, {
				key: 1,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (g(), f("div", dt, [(g(!0), f(c, null, v(Y.value, (e) => (g(), f("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [p("div", ft, [p("span", pt, y(e.title_pattern), 1), p("div", mt, [
				p("span", null, y(Ft(e)), 1),
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
			])]), h(a, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => X.value = e
			}, {
				default: x(() => [...t[36] ||= [m(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : d("", !0)]),
			h(o, {
				modelValue: on.value,
				"onUpdate:modelValue": t[10] ||= (e) => on.value = e,
				title: "Schedule Recording",
				onClose: ln
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: ln
				}, {
					default: x(() => [...t[43] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: sn.value,
					onClick: un
				}, {
					default: x(() => [...t[44] ||= [m(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: C(un, ["prevent"])
				}, [
					p("label", ht, [t[37] ||= p("span", { class: "admin-livetv__label" }, "Title", -1), S(p("input", {
						"onUpdate:modelValue": t[4] ||= (e) => W.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[b, W.value]])]),
					p("label", gt, [t[38] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(ne, {
						modelValue: U.value,
						"onUpdate:modelValue": t[5] ||= (e) => U.value = e,
						options: Pt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("div", _t, [p("label", vt, [t[39] ||= p("span", { class: "admin-livetv__label" }, "Start Date", -1), S(p("input", {
						"onUpdate:modelValue": t[6] ||= (e) => G.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, G.value]])]), p("label", yt, [t[40] ||= p("span", { class: "admin-livetv__label" }, "Start Time", -1), S(p("input", {
						"onUpdate:modelValue": t[7] ||= (e) => K.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, K.value]])])]),
					p("div", bt, [p("label", xt, [t[41] ||= p("span", { class: "admin-livetv__label" }, "End Date", -1), S(p("input", {
						"onUpdate:modelValue": t[8] ||= (e) => q.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, q.value]])]), p("label", St, [t[42] ||= p("span", { class: "admin-livetv__label" }, "End Time", -1), S(p("input", {
						"onUpdate:modelValue": t[9] ||= (e) => J.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, J.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				modelValue: gn.value,
				"onUpdate:modelValue": t[15] ||= (e) => gn.value = e,
				title: "Add Series Rule",
				onClose: xn
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: xn
				}, {
					default: x(() => [...t[51] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
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
							"onUpdate:modelValue": t[11] ||= (e) => Z.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[b, Z.value]]),
						t[46] ||= p("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					p("label", wt, [t[47] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(ne, {
						modelValue: Q.value,
						"onUpdate:modelValue": t[12] ||= (e) => Q.value = e,
						options: Pt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("label", Tt, [
						t[48] ||= p("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						p("input", {
							value: $.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: t[13] ||= (e) => $.value = Number(e.target.value)
						}, null, 40, Et),
						t[49] ||= p("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					p("label", Dt, [t[50] ||= p("span", { class: "admin-livetv__label" }, "Keep Until", -1), h(ne, {
						modelValue: _n.value,
						"onUpdate:modelValue": t[14] ||= (e) => _n.value = e,
						options: yn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				"model-value": I.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": t[17] ||= (e) => I.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[16] ||= (e) => I.value = null
				}, {
					default: x(() => [...t[55] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: Bt
				}, {
					default: x(() => [...t[56] ||= [m("Remove", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[53] ||= m("Remove tuner ", -1),
					p("strong", null, y(I.value?.name), 1),
					t[54] ||= m("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": t[19] ||= (e) => H.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[18] ||= (e) => H.value = null
				}, {
					default: x(() => [...t[59] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
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
			h(o, {
				"model-value": X.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": t[21] ||= (e) => X.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[20] ||= (e) => X.value = null
				}, {
					default: x(() => [...t[63] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: mn
				}, {
					default: x(() => [...t[64] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[61] ||= m("Delete series rule ", -1),
					p("strong", null, y(X.value?.title_pattern), 1),
					t[62] ||= m("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-d53b3ae8"]]);
//#endregion
export { w as default };

//# sourceMappingURL=LiveTvPage-DpDHVwqH.js.map