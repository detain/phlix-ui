import { a as e, c as t, i as n, l as ee, n as r, r as i, t as te } from "./tokenStore-SjxKwmod.js";
import { t as a } from "./Modal-D0ntqq7y.js";
import { t as ne } from "./EmptyState-sJb64K4c.js";
import { t as re } from "./Select-CfjCFQKH.js";
import { t as o } from "./Badge-wMoO7SFO.js";
import { t as ie } from "./Switch-V3wRpG4-.js";
import { t as ae } from "./liveTv-Dbjt901v.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as oe, inject as se, normalizeClass as ce, onMounted as le, openBlock as h, reactive as ue, ref as g, renderList as _, toDisplayString as v, vModelText as y, watch as b, withCtx as x, withDirectives as S, withKeys as de, withModifiers as C } from "vue";
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
}, ft = { class: "admin-livetv__rule-info" }, pt = { class: "admin-livetv__rule-title" }, mt = { class: "admin-livetv__rule-meta" }, ht = { class: "admin-livetv__field" }, gt = { class: "admin-livetv__field" }, _t = { class: "admin-livetv__field-row" }, vt = { class: "admin-livetv__field" }, yt = { class: "admin-livetv__field" }, bt = { class: "admin-livetv__field-row" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = ["value"], Dt = { class: "admin-livetv__field" }, w = /*#__PURE__*/ ee(/* @__PURE__ */ oe({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(ee) {
		let oe = ee, w = se("apiBase", ""), Ot = c(() => typeof w == "string" ? w : w?.value ?? ""), T = new ae(oe.client ?? new e({
			baseUrl: Ot.value,
			tokenStore: new te()
		})), E = n();
		function D(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function kt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let ee = Math.floor(n / 60), r = n % 60;
			return r > 0 ? `${ee}h ${r}m` : `${ee}h`;
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
		let k = ue({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function A(e) {
			k[e] = !k[e];
		}
		let j = g([]);
		async function Nt() {
			try {
				j.value = await T.listChannels();
			} catch {}
		}
		let Pt = c(() => j.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Ft(e) {
			let t = j.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let M = g([]), N = g(!1), It = g(!1), P = g(!1), F = ue({});
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
		let I = g(null);
		async function Bt() {
			let e = I.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), M.value = M.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), I.value = null;
			} catch (e) {
				E.error(D(e, "Failed to delete tuner.")), I.value = null;
			}
		}
		let Vt = c(() => N.value ? "Loading…" : M.value.length === 0 ? "No tuners found" : `${M.value.length} tuner${M.value.length === 1 ? "" : "s"} configured`), L = g([]), Ht = g(!1), Ut = g(!1), R = g(0), z = g(null), Wt = g(!1), Gt = [
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
		let Xt = c(() => Ht.value ? "Loading…" : L.value.length > 0 ? `${L.value.length} programmes` : "No programmes"), B = g([]), Zt = g(!1), Qt = g(!1), V = g("all"), $t = [
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
		let H = g(null);
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
		let rn = c(() => Zt.value ? "Loading…" : `${B.value.length} recording${B.value.length === 1 ? "" : "s"}`), an = c(() => V.value === "upcoming" ? "No upcoming recordings." : V.value === "by-series" ? "No series recordings." : "No recordings yet."), on = g(!1), U = g(""), W = g(""), G = g(""), K = g(""), q = g(""), J = g(""), sn = g(!1);
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
		let Y = g([]), dn = g(!1), fn = g(!1);
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
		let X = g(null);
		async function mn() {
			let e = X.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), Y.value = Y.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), X.value = null;
			} catch (e) {
				E.error(D(e, "Failed to delete rule.")), X.value = null;
			}
		}
		let hn = c(() => dn.value ? "Loading…" : `${Y.value.length} rule${Y.value.length === 1 ? "" : "s"}`), gn = g(!1), Z = g(""), Q = g(""), _n = g("space"), $ = g(3), vn = g(!1), yn = [{
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
		return b(() => k.tuners, (e) => {
			e && !It.value && Lt();
		}, { immediate: !0 }), b(() => k.guide, (e) => {
			e && !Ut.value && Kt(R.value);
		}), b(() => k.recordings, (e) => {
			e && !Qt.value && en();
		}), b(() => k.seriesRules, (e) => {
			e && !fn.value && (pn(), Nt());
		}), le(() => {}), (e, n) => (h(), d("section", fe, [
			n[65] ||= f("header", { class: "admin-livetv__head" }, [f("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			f("section", pe, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: n[0] ||= (e) => A("tuners")
			}, [f("span", he, [
				m(t, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				n[22] ||= f("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				m(t, {
					name: k.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", ge, v(Vt.value), 1)], 8, me), k.tuners ? (h(), d("div", _e, [f("div", ve, [m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: P.value,
				onClick: Rt
			}, {
				default: x(() => [...n[23] ||= [p(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), N.value ? (h(), d("div", ye, [m(i, {
				variant: "text",
				lines: 3
			})])) : M.value.length === 0 ? (h(), l(ne, {
				key: 1,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (h(), d("div", be, [(h(!0), d(s, null, _(M.value, (e) => (h(), d("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				f("div", xe, [f("span", Se, [m(o, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: x(() => [p(v(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), f("span", Ce, v(e.name), 1)]), m(o, { tone: e.enabled ? "success" : "neutral" }, {
					default: x(() => [p(v(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("dl", we, [
					n[27] ||= f("dt", null, "Host", -1),
					f("dd", null, v(e.host) + ":" + v(e.port), 1),
					e.device_id ? (h(), d(s, { key: 0 }, [n[24] ||= f("dt", null, "Device ID", -1), f("dd", null, v(e.device_id), 1)], 64)) : u("", !0),
					e.last_seen ? (h(), d(s, { key: 1 }, [n[25] ||= f("dt", null, "Last Seen", -1), f("dd", null, v(new Date(e.last_seen).toLocaleString()), 1)], 64)) : u("", !0),
					e.status ? (h(), d(s, { key: 2 }, [n[26] ||= f("dt", null, "Status", -1), f("dd", null, v(e.status), 1)], 64)) : u("", !0)
				]),
				f("div", Te, [m(ie, {
					"model-value": !!e.enabled,
					disabled: F[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => zt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), m(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => I.value = e
				}, {
					default: x(() => [...n[28] ||= [p(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : u("", !0)]),
			f("section", Ee, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.guide,
				"aria-controls": "livetv-guide-body",
				onClick: n[1] ||= (e) => A("guide")
			}, [f("span", Oe, [
				m(t, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				n[29] ||= f("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				m(t, {
					name: k.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", ke, v(Xt.value), 1)], 8, De), k.guide ? (h(), d("div", Ae, [f("div", je, [f("div", Me, [(h(), d(s, null, _(Gt, (e, t) => f("button", {
				key: e,
				type: "button",
				class: ce(["admin-livetv__seg-btn", { "is-active": R.value === t }]),
				"aria-pressed": R.value === t,
				onClick: (e) => qt(t)
			}, v(e), 11, Ne)), 64))]), m(r, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Wt.value,
				onClick: Yt
			}, {
				default: x(() => [...n[30] ||= [p(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Ht.value ? (h(), d("div", Pe, [m(i, {
				variant: "text",
				lines: 4
			})])) : L.value.length === 0 ? (h(), l(ne, {
				key: 1,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (h(), d("div", Fe, [(h(!0), d(s, null, _(L.value, (e) => (h(), d("div", {
				key: e.id,
				class: ce(["admin-livetv__program", { "is-selected": z.value === e.id }]),
				role: "listitem",
				tabindex: "0",
				onClick: (t) => Jt(e),
				onKeydown: [de(C((t) => Jt(e), ["prevent"]), ["enter"]), de(C((t) => Jt(e), ["prevent"]), ["space"])]
			}, [
				f("div", Le, v(O(e.start_time)) + " – " + v(O(e.end_time)), 1),
				f("div", Re, v(e.title), 1),
				e.description && z.value !== e.id ? (h(), d("p", ze, v(e.description.slice(0, 100)) + v(e.description.length > 100 ? "…" : ""), 1)) : u("", !0),
				z.value === e.id ? (h(), d("div", Be, [e.description ? (h(), d("p", Ve, v(e.description), 1)) : u("", !0), f("div", He, [
					e.rating ? (h(), l(o, {
						key: 0,
						tone: "neutral"
					}, {
						default: x(() => [p("Rating: " + v(e.rating), 1)]),
						_: 2
					}, 1024)) : u("", !0),
					e.season ? (h(), l(o, {
						key: 1,
						tone: "info"
					}, {
						default: x(() => [p(v(Mt(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : u("", !0),
					e.year ? (h(), l(o, {
						key: 2,
						tone: "neutral"
					}, {
						default: x(() => [p(v(e.year), 1)]),
						_: 2
					}, 1024)) : u("", !0)
				])])) : u("", !0)
			], 42, Ie))), 128))]))])) : u("", !0)]),
			f("section", Ue, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: n[2] ||= (e) => A("recordings")
			}, [f("span", Ge, [
				m(t, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				n[31] ||= f("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				m(t, {
					name: k.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", Ke, v(rn.value), 1)], 8, We), k.recordings ? (h(), d("div", qe, [f("div", Je, [f("div", Ye, [(h(), d(s, null, _($t, (e) => f("button", {
				key: e.value,
				type: "button",
				role: "tab",
				class: ce(["admin-livetv__seg-btn", { "is-active": V.value === e.value }]),
				"aria-selected": V.value === e.value,
				onClick: (t) => V.value = e.value
			}, v(e.label), 11, Xe)), 64))]), m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: cn
			}, {
				default: x(() => [...n[32] ||= [p(" Schedule Recording ", -1)]]),
				_: 1
			})]), Zt.value ? (h(), d("div", Ze, [m(i, {
				variant: "text",
				lines: 3
			})])) : B.value.length === 0 ? (h(), l(ne, {
				key: 1,
				icon: "film",
				title: "No recordings",
				description: an.value
			}, null, 8, ["description"])) : (h(), d("div", Qe, [(h(!0), d(s, null, _(B.value, (e) => (h(), d("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				f("div", $e, [f("span", et, v(e.program_title ?? "Untitled"), 1), e.status ? (h(), l(o, {
					key: 0,
					tone: nn(e.status)
				}, {
					default: x(() => [p(v(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : u("", !0)]),
				f("div", tt, [
					f("span", null, v(e.channel_name ?? e.channel_id), 1),
					f("span", null, v(At(e.start_time)) + " · " + v(O(e.start_time)) + " – " + v(O(e.end_time)), 1),
					f("span", null, v(kt(e.start_time, e.end_time)), 1),
					e.size ? (h(), d("span", nt, v(jt(e.size)), 1)) : u("", !0)
				]),
				f("div", rt, [m(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
				}, {
					default: x(() => [...n[33] ||= [p(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : u("", !0)]),
			f("section", it, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": k.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: n[3] ||= (e) => A("seriesRules")
			}, [f("span", ot, [
				m(t, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				n[34] ||= f("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				m(t, {
					name: k.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", st, v(hn.value), 1)], 8, at), k.seriesRules ? (h(), d("div", ct, [f("div", lt, [m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: bn
			}, {
				default: x(() => [...n[35] ||= [p("Add Rule", -1)]]),
				_: 1
			})]), dn.value ? (h(), d("div", ut, [m(i, {
				variant: "text",
				lines: 3
			})])) : Y.value.length === 0 ? (h(), l(ne, {
				key: 1,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (h(), d("div", dt, [(h(!0), d(s, null, _(Y.value, (e) => (h(), d("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [f("div", ft, [f("span", pt, v(e.title_pattern), 1), f("div", mt, [
				f("span", null, v(Ft(e)), 1),
				e.priority ? (h(), l(o, {
					key: 0,
					tone: "info"
				}, {
					default: x(() => [p("Priority " + v(e.priority), 1)]),
					_: 2
				}, 1024)) : u("", !0),
				e.keep_until ? (h(), l(o, {
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
				onClick: (t) => X.value = e
			}, {
				default: x(() => [...n[36] ||= [p(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : u("", !0)]),
			m(a, {
				modelValue: on.value,
				"onUpdate:modelValue": n[10] ||= (e) => on.value = e,
				title: "Schedule Recording",
				onClose: ln
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: ln
				}, {
					default: x(() => [...n[43] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: sn.value,
					onClick: un
				}, {
					default: x(() => [...n[44] ||= [p(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-livetv__form",
					onSubmit: C(un, ["prevent"])
				}, [
					f("label", ht, [n[37] ||= f("span", { class: "admin-livetv__label" }, "Title", -1), S(f("input", {
						"onUpdate:modelValue": n[4] ||= (e) => W.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[y, W.value]])]),
					f("label", gt, [n[38] ||= f("span", { class: "admin-livetv__label" }, "Channel", -1), m(re, {
						modelValue: U.value,
						"onUpdate:modelValue": n[5] ||= (e) => U.value = e,
						options: Pt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					f("div", _t, [f("label", vt, [n[39] ||= f("span", { class: "admin-livetv__label" }, "Start Date", -1), S(f("input", {
						"onUpdate:modelValue": n[6] ||= (e) => G.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[y, G.value]])]), f("label", yt, [n[40] ||= f("span", { class: "admin-livetv__label" }, "Start Time", -1), S(f("input", {
						"onUpdate:modelValue": n[7] ||= (e) => K.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[y, K.value]])])]),
					f("div", bt, [f("label", xt, [n[41] ||= f("span", { class: "admin-livetv__label" }, "End Date", -1), S(f("input", {
						"onUpdate:modelValue": n[8] ||= (e) => q.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[y, q.value]])]), f("label", St, [n[42] ||= f("span", { class: "admin-livetv__label" }, "End Time", -1), S(f("input", {
						"onUpdate:modelValue": n[9] ||= (e) => J.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[y, J.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(a, {
				modelValue: gn.value,
				"onUpdate:modelValue": n[15] ||= (e) => gn.value = e,
				title: "Add Series Rule",
				onClose: xn
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: xn
				}, {
					default: x(() => [...n[51] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: vn.value,
					onClick: Sn
				}, {
					default: x(() => [...n[52] ||= [p("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-livetv__form",
					onSubmit: C(Sn, ["prevent"])
				}, [
					f("label", Ct, [
						n[45] ||= f("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						S(f("input", {
							"onUpdate:modelValue": n[11] ||= (e) => Z.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[y, Z.value]]),
						n[46] ||= f("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					f("label", wt, [n[47] ||= f("span", { class: "admin-livetv__label" }, "Channel", -1), m(re, {
						modelValue: Q.value,
						"onUpdate:modelValue": n[12] ||= (e) => Q.value = e,
						options: Pt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					f("label", Tt, [
						n[48] ||= f("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						f("input", {
							value: $.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: n[13] ||= (e) => $.value = Number(e.target.value)
						}, null, 40, Et),
						n[49] ||= f("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					f("label", Dt, [n[50] ||= f("span", { class: "admin-livetv__label" }, "Keep Until", -1), m(re, {
						modelValue: _n.value,
						"onUpdate:modelValue": n[14] ||= (e) => _n.value = e,
						options: yn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(a, {
				"model-value": I.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": n[17] ||= (e) => I.value = null
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: n[16] ||= (e) => I.value = null
				}, {
					default: x(() => [...n[55] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: Bt
				}, {
					default: x(() => [...n[56] ||= [p("Remove", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					n[53] ||= p("Remove tuner ", -1),
					f("strong", null, v(I.value?.name), 1),
					n[54] ||= p("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": n[19] ||= (e) => H.value = null
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: n[18] ||= (e) => H.value = null
				}, {
					default: x(() => [...n[59] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: tn
				}, {
					default: x(() => [...n[60] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					n[57] ||= p(" Delete recording ", -1),
					f("strong", null, v(H.value?.program_title ?? H.value?.id), 1),
					n[58] ||= p("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": X.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": n[21] ||= (e) => X.value = null
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: n[20] ||= (e) => X.value = null
				}, {
					default: x(() => [...n[63] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: mn
				}, {
					default: x(() => [...n[64] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					n[61] ||= p("Delete series rule ", -1),
					f("strong", null, v(X.value?.title_pattern), 1),
					n[62] ||= p("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-d53b3ae8"]]);
//#endregion
export { w as default };

//# sourceMappingURL=LiveTvPage-D_ZOjq1s.js.map