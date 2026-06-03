import { a as e, f as t, h as n, i as ee, m as r, n as te, o as ne, r as re, t as i } from "./Button-C86XulWV.js";
import { t as a } from "./Modal-DaapuyD8.js";
import { t as ie } from "./Select-CjbYOZGH.js";
import { t as o } from "./Badge-BiYXL5Nz.js";
import { t as ae } from "./Switch-BRVGpfuc.js";
import { t as oe } from "./liveTv-Dbjt901v.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as se, inject as ce, normalizeClass as le, onMounted as ue, openBlock as h, reactive as de, ref as g, renderList as _, toDisplayString as v, vModelText as y, watch as b, withCtx as x, withDirectives as S, withKeys as fe, withModifiers as C } from "vue";
//#region src/pages/admin/LiveTvPage.vue?vue&type=script&setup=true&lang.ts
var pe = {
	class: "admin-livetv",
	"aria-labelledby": "livetv-heading"
}, me = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-tuners-heading"
}, he = ["aria-expanded"], ge = { class: "admin-livetv__section-title-row" }, _e = { class: "admin-livetv__section-summary" }, ve = {
	key: 0,
	id: "livetv-tuners-body",
	class: "admin-livetv__section-body"
}, ye = { class: "admin-livetv__toolbar" }, be = {
	key: 0,
	class: "admin-livetv__skel"
}, xe = {
	key: 2,
	class: "admin-livetv__card-grid"
}, Se = { class: "admin-livetv__card-head" }, Ce = { class: "admin-livetv__card-title-row" }, we = { class: "admin-livetv__card-name" }, Te = { class: "admin-livetv__dl" }, Ee = { class: "admin-livetv__card-actions" }, De = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-guide-heading"
}, Oe = ["aria-expanded"], ke = { class: "admin-livetv__section-title-row" }, Ae = { class: "admin-livetv__section-summary" }, je = {
	key: 0,
	id: "livetv-guide-body",
	class: "admin-livetv__section-body"
}, Me = { class: "admin-livetv__toolbar" }, Ne = {
	class: "admin-livetv__segmented",
	role: "group",
	"aria-label": "Guide date"
}, Pe = ["aria-pressed", "onClick"], Fe = {
	key: 0,
	class: "admin-livetv__skel"
}, Ie = {
	key: 2,
	class: "admin-livetv__guide-grid",
	role: "list"
}, Le = ["onClick", "onKeydown"], Re = { class: "admin-livetv__program-time" }, ze = { class: "admin-livetv__program-title" }, Be = {
	key: 0,
	class: "admin-livetv__program-desc"
}, Ve = {
	key: 1,
	class: "admin-livetv__program-expanded"
}, He = {
	key: 0,
	class: "admin-livetv__program-full-desc"
}, Ue = { class: "admin-livetv__program-meta" }, We = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-recordings-heading"
}, Ge = ["aria-expanded"], Ke = { class: "admin-livetv__section-title-row" }, qe = { class: "admin-livetv__section-summary" }, Je = {
	key: 0,
	id: "livetv-recordings-body",
	class: "admin-livetv__section-body"
}, Ye = { class: "admin-livetv__toolbar" }, Xe = {
	class: "admin-livetv__segmented",
	role: "tablist",
	"aria-label": "Recording filter"
}, Ze = ["aria-selected", "onClick"], Qe = {
	key: 0,
	class: "admin-livetv__skel"
}, $e = {
	key: 2,
	class: "admin-livetv__rec-list"
}, et = { class: "admin-livetv__card-head" }, tt = { class: "admin-livetv__card-name" }, nt = { class: "admin-livetv__rec-meta" }, rt = { key: 0 }, it = { class: "admin-livetv__card-actions" }, at = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-rules-heading"
}, ot = ["aria-expanded"], st = { class: "admin-livetv__section-title-row" }, ct = { class: "admin-livetv__section-summary" }, lt = {
	key: 0,
	id: "livetv-rules-body",
	class: "admin-livetv__section-body"
}, ut = { class: "admin-livetv__toolbar" }, dt = {
	key: 0,
	class: "admin-livetv__skel"
}, ft = {
	key: 2,
	class: "admin-livetv__rule-list"
}, pt = { class: "admin-livetv__rule-info" }, mt = { class: "admin-livetv__rule-title" }, ht = { class: "admin-livetv__rule-meta" }, gt = { class: "admin-livetv__field" }, _t = { class: "admin-livetv__field" }, vt = { class: "admin-livetv__field-row" }, yt = { class: "admin-livetv__field" }, bt = { class: "admin-livetv__field" }, xt = { class: "admin-livetv__field-row" }, St = { class: "admin-livetv__field" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = { class: "admin-livetv__field" }, Dt = ["value"], Ot = { class: "admin-livetv__field" }, w = /*#__PURE__*/ n(/* @__PURE__ */ se({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(n) {
		let se = n, w = ce("apiBase", ""), kt = c(() => typeof w == "string" ? w : w?.value ?? ""), T = new oe(se.client ?? new ne({
			baseUrl: kt.value,
			tokenStore: new e()
		})), E = ee();
		function At(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let ee = Math.floor(n / 60), r = n % 60;
			return r > 0 ? `${ee}h ${r}m` : `${ee}h`;
		}
		function jt(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function D(e) {
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
		let O = de({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function Pt(e) {
			O[e] = !O[e];
		}
		let k = g([]);
		async function Ft() {
			try {
				k.value = await T.listChannels();
			} catch {}
		}
		let It = c(() => k.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Lt(e) {
			let t = k.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let A = g([]), Rt = g(!1), zt = g(!1), j = g(!1), M = de({});
		async function Bt() {
			Rt.value = !0;
			try {
				A.value = await T.listTuners(), zt.value = !0;
			} catch (e) {
				E.error(t(e, "Failed to load tuners."));
			} finally {
				Rt.value = !1;
			}
		}
		async function Vt() {
			if (!j.value) {
				j.value = !0;
				try {
					let e = await T.scanTuners();
					A.value = e, zt.value = !0, E.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					E.error(t(e, "Tuner scan failed."));
				} finally {
					j.value = !1;
				}
			}
		}
		async function Ht(e) {
			if (!M[e.tuner_id]) {
				M[e.tuner_id] = !0;
				try {
					let t = await T.updateTuner(e.tuner_id, { enabled: !e.enabled });
					A.value = A.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					E.error(t(e, "Failed to update tuner."));
				} finally {
					M[e.tuner_id] = !1;
				}
			}
		}
		let N = g(null);
		async function Ut() {
			let e = N.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), A.value = A.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), N.value = null;
			} catch (e) {
				E.error(t(e, "Failed to delete tuner.")), N.value = null;
			}
		}
		let Wt = c(() => Rt.value ? "Loading…" : A.value.length === 0 ? "No tuners found" : `${A.value.length} tuner${A.value.length === 1 ? "" : "s"} configured`), P = g([]), F = g(!1), Gt = g(!1), I = g(0), L = g(null), R = g(!1), Kt = [
			"Today",
			"+1 Day",
			"+2 Days"
		];
		async function qt(e) {
			F.value = !0;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				P.value = await T.listGuide({
					from: t,
					to: n
				}), Gt.value = !0;
			} catch (e) {
				E.error(t(e, "Failed to load guide."));
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
					let e = await T.refreshGuide();
					E.success(`Guide refreshed. ${e} programmes imported.`), await qt(I.value);
				} catch (e) {
					E.error(t(e, "Guide refresh failed."));
				} finally {
					R.value = !1;
				}
			}
		}
		let Zt = c(() => F.value ? "Loading…" : P.value.length > 0 ? `${P.value.length} programmes` : "No programmes"), z = g([]), B = g(!1), Qt = g(!1), V = g("all"), $t = [
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
				E.error(t(e, "Failed to load recordings."));
			} finally {
				B.value = !1;
			}
		}
		let H = g(null);
		async function tn() {
			let e = H.value;
			if (e) try {
				await T.deleteRecording(e.id), z.value = z.value.filter((t) => t.id !== e.id), E.success("Recording deleted."), H.value = null;
			} catch (e) {
				E.error(t(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function nn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let rn = c(() => B.value ? "Loading…" : `${z.value.length} recording${z.value.length === 1 ? "" : "s"}`), an = c(() => V.value === "upcoming" ? "No upcoming recordings." : V.value === "by-series" ? "No series recordings." : "No recordings yet."), U = g(!1), W = g(""), G = g(""), K = g(""), q = g(""), J = g(""), Y = g(""), on = g(!1);
		async function sn() {
			await Ft(), W.value = k.value[0]?.id ?? "", G.value = "", K.value = "", q.value = "", J.value = "", Y.value = "", U.value = !0;
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
			let e = Math.floor((/* @__PURE__ */ new Date(`${K.value}T${q.value}`)).getTime() / 1e3), n = Math.floor((/* @__PURE__ */ new Date(`${J.value}T${Y.value}`)).getTime() / 1e3);
			if (n <= e) {
				E.error("End must be after start.");
				return;
			}
			on.value = !0;
			try {
				let t = await T.createRecording({
					channel_id: W.value,
					start_time: e,
					end_time: n,
					title: G.value.trim()
				});
				z.value = [...z.value, t], E.success("Recording scheduled."), cn();
			} catch (e) {
				E.error(t(e, "Failed to schedule recording."));
			} finally {
				on.value = !1;
			}
		}
		let X = g([]), un = g(!1), dn = g(!1);
		async function fn() {
			un.value = !0;
			try {
				X.value = await T.listSeriesRules(), dn.value = !0;
			} catch (e) {
				E.error(t(e, "Failed to load series rules."));
			} finally {
				un.value = !1;
			}
		}
		let Z = g(null);
		async function pn() {
			let e = Z.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), X.value = X.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), Z.value = null;
			} catch (e) {
				E.error(t(e, "Failed to delete rule.")), Z.value = null;
			}
		}
		let mn = c(() => un.value ? "Loading…" : `${X.value.length} rule${X.value.length === 1 ? "" : "s"}`), hn = g(!1), Q = g(""), $ = g(""), gn = g("space"), _n = g(3), vn = g(!1), yn = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function bn() {
			await Ft(), Q.value = "", $.value = k.value[0]?.id ?? "", gn.value = "space", _n.value = 3, hn.value = !0;
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
				E.error(t(e, "Failed to create rule."));
			} finally {
				vn.value = !1;
			}
		}
		return b(() => O.tuners, (e) => {
			e && !zt.value && Bt();
		}, { immediate: !0 }), b(() => O.guide, (e) => {
			e && !Gt.value && qt(I.value);
		}), b(() => O.recordings, (e) => {
			e && !Qt.value && en();
		}), b(() => O.seriesRules, (e) => {
			e && !dn.value && (fn(), Ft());
		}), ue(() => {}), (e, t) => (h(), d("section", pe, [
			t[65] ||= f("header", { class: "admin-livetv__head" }, [f("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			f("section", me, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: t[0] ||= (e) => Pt("tuners")
			}, [f("span", ge, [
				m(r, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				t[22] ||= f("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				m(r, {
					name: O.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", _e, v(Wt.value), 1)], 8, he), O.tuners ? (h(), d("div", ve, [f("div", ye, [m(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: j.value,
				onClick: Vt
			}, {
				default: x(() => [...t[23] ||= [p(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Rt.value ? (h(), d("div", be, [m(te, {
				variant: "text",
				lines: 3
			})])) : A.value.length === 0 ? (h(), l(re, {
				key: 1,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (h(), d("div", xe, [(h(!0), d(s, null, _(A.value, (e) => (h(), d("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				f("div", Se, [f("span", Ce, [m(o, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: x(() => [p(v(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), f("span", we, v(e.name), 1)]), m(o, { tone: e.enabled ? "success" : "neutral" }, {
					default: x(() => [p(v(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("dl", Te, [
					t[27] ||= f("dt", null, "Host", -1),
					f("dd", null, v(e.host) + ":" + v(e.port), 1),
					e.device_id ? (h(), d(s, { key: 0 }, [t[24] ||= f("dt", null, "Device ID", -1), f("dd", null, v(e.device_id), 1)], 64)) : u("", !0),
					e.last_seen ? (h(), d(s, { key: 1 }, [t[25] ||= f("dt", null, "Last Seen", -1), f("dd", null, v(new Date(e.last_seen).toLocaleString()), 1)], 64)) : u("", !0),
					e.status ? (h(), d(s, { key: 2 }, [t[26] ||= f("dt", null, "Status", -1), f("dd", null, v(e.status), 1)], 64)) : u("", !0)
				]),
				f("div", Ee, [m(ae, {
					"model-value": !!e.enabled,
					disabled: M[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Ht(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), m(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => N.value = e
				}, {
					default: x(() => [...t[28] ||= [p(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : u("", !0)]),
			f("section", De, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.guide,
				"aria-controls": "livetv-guide-body",
				onClick: t[1] ||= (e) => Pt("guide")
			}, [f("span", ke, [
				m(r, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				t[29] ||= f("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				m(r, {
					name: O.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", Ae, v(Zt.value), 1)], 8, Oe), O.guide ? (h(), d("div", je, [f("div", Me, [f("div", Ne, [(h(), d(s, null, _(Kt, (e, t) => f("button", {
				key: e,
				type: "button",
				class: le(["admin-livetv__seg-btn", { "is-active": I.value === t }]),
				"aria-pressed": I.value === t,
				onClick: (e) => Jt(t)
			}, v(e), 11, Pe)), 64))]), m(i, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: R.value,
				onClick: Xt
			}, {
				default: x(() => [...t[30] ||= [p(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), F.value ? (h(), d("div", Fe, [m(te, {
				variant: "text",
				lines: 4
			})])) : P.value.length === 0 ? (h(), l(re, {
				key: 1,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (h(), d("div", Ie, [(h(!0), d(s, null, _(P.value, (e) => (h(), d("div", {
				key: e.id,
				class: le(["admin-livetv__program", { "is-selected": L.value === e.id }]),
				role: "listitem",
				tabindex: "0",
				onClick: (t) => Yt(e),
				onKeydown: [fe(C((t) => Yt(e), ["prevent"]), ["enter"]), fe(C((t) => Yt(e), ["prevent"]), ["space"])]
			}, [
				f("div", Re, v(D(e.start_time)) + " – " + v(D(e.end_time)), 1),
				f("div", ze, v(e.title), 1),
				e.description && L.value !== e.id ? (h(), d("p", Be, v(e.description.slice(0, 100)) + v(e.description.length > 100 ? "…" : ""), 1)) : u("", !0),
				L.value === e.id ? (h(), d("div", Ve, [e.description ? (h(), d("p", He, v(e.description), 1)) : u("", !0), f("div", Ue, [
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
						default: x(() => [p(v(Nt(e.season, e.episode)), 1)]),
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
			], 42, Le))), 128))]))])) : u("", !0)]),
			f("section", We, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: t[2] ||= (e) => Pt("recordings")
			}, [f("span", Ke, [
				m(r, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				t[31] ||= f("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				m(r, {
					name: O.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", qe, v(rn.value), 1)], 8, Ge), O.recordings ? (h(), d("div", Je, [f("div", Ye, [f("div", Xe, [(h(), d(s, null, _($t, (e) => f("button", {
				key: e.value,
				type: "button",
				role: "tab",
				class: le(["admin-livetv__seg-btn", { "is-active": V.value === e.value }]),
				"aria-selected": V.value === e.value,
				onClick: (t) => V.value = e.value
			}, v(e.label), 11, Ze)), 64))]), m(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: sn
			}, {
				default: x(() => [...t[32] ||= [p(" Schedule Recording ", -1)]]),
				_: 1
			})]), B.value ? (h(), d("div", Qe, [m(te, {
				variant: "text",
				lines: 3
			})])) : z.value.length === 0 ? (h(), l(re, {
				key: 1,
				icon: "film",
				title: "No recordings",
				description: an.value
			}, null, 8, ["description"])) : (h(), d("div", $e, [(h(!0), d(s, null, _(z.value, (e) => (h(), d("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				f("div", et, [f("span", tt, v(e.program_title ?? "Untitled"), 1), e.status ? (h(), l(o, {
					key: 0,
					tone: nn(e.status)
				}, {
					default: x(() => [p(v(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : u("", !0)]),
				f("div", nt, [
					f("span", null, v(e.channel_name ?? e.channel_id), 1),
					f("span", null, v(jt(e.start_time)) + " · " + v(D(e.start_time)) + " – " + v(D(e.end_time)), 1),
					f("span", null, v(At(e.start_time, e.end_time)), 1),
					e.size ? (h(), d("span", rt, v(Mt(e.size)), 1)) : u("", !0)
				]),
				f("div", it, [m(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
				}, {
					default: x(() => [...t[33] ||= [p(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : u("", !0)]),
			f("section", at, [f("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: t[3] ||= (e) => Pt("seriesRules")
			}, [f("span", st, [
				m(r, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				t[34] ||= f("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				m(r, {
					name: O.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), f("span", ct, v(mn.value), 1)], 8, ot), O.seriesRules ? (h(), d("div", lt, [f("div", ut, [m(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: bn
			}, {
				default: x(() => [...t[35] ||= [p("Add Rule", -1)]]),
				_: 1
			})]), un.value ? (h(), d("div", dt, [m(te, {
				variant: "text",
				lines: 3
			})])) : X.value.length === 0 ? (h(), l(re, {
				key: 1,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (h(), d("div", ft, [(h(!0), d(s, null, _(X.value, (e) => (h(), d("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [f("div", pt, [f("span", mt, v(e.title_pattern), 1), f("div", ht, [
				f("span", null, v(Lt(e)), 1),
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
			])]), m(i, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => Z.value = e
			}, {
				default: x(() => [...t[36] ||= [p(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : u("", !0)]),
			m(a, {
				modelValue: U.value,
				"onUpdate:modelValue": t[10] ||= (e) => U.value = e,
				title: "Schedule Recording",
				onClose: cn
			}, {
				footer: x(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: cn
				}, {
					default: x(() => [...t[43] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					loading: on.value,
					onClick: ln
				}, {
					default: x(() => [...t[44] ||= [p(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-livetv__form",
					onSubmit: C(ln, ["prevent"])
				}, [
					f("label", gt, [t[37] ||= f("span", { class: "admin-livetv__label" }, "Title", -1), S(f("input", {
						"onUpdate:modelValue": t[4] ||= (e) => G.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[y, G.value]])]),
					f("label", _t, [t[38] ||= f("span", { class: "admin-livetv__label" }, "Channel", -1), m(ie, {
						modelValue: W.value,
						"onUpdate:modelValue": t[5] ||= (e) => W.value = e,
						options: It.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					f("div", vt, [f("label", yt, [t[39] ||= f("span", { class: "admin-livetv__label" }, "Start Date", -1), S(f("input", {
						"onUpdate:modelValue": t[6] ||= (e) => K.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[y, K.value]])]), f("label", bt, [t[40] ||= f("span", { class: "admin-livetv__label" }, "Start Time", -1), S(f("input", {
						"onUpdate:modelValue": t[7] ||= (e) => q.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[y, q.value]])])]),
					f("div", xt, [f("label", St, [t[41] ||= f("span", { class: "admin-livetv__label" }, "End Date", -1), S(f("input", {
						"onUpdate:modelValue": t[8] ||= (e) => J.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[y, J.value]])]), f("label", Ct, [t[42] ||= f("span", { class: "admin-livetv__label" }, "End Time", -1), S(f("input", {
						"onUpdate:modelValue": t[9] ||= (e) => Y.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[y, Y.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(a, {
				modelValue: hn.value,
				"onUpdate:modelValue": t[15] ||= (e) => hn.value = e,
				title: "Add Series Rule",
				onClose: xn
			}, {
				footer: x(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: xn
				}, {
					default: x(() => [...t[51] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					loading: vn.value,
					onClick: Sn
				}, {
					default: x(() => [...t[52] ||= [p("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-livetv__form",
					onSubmit: C(Sn, ["prevent"])
				}, [
					f("label", wt, [
						t[45] ||= f("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						S(f("input", {
							"onUpdate:modelValue": t[11] ||= (e) => Q.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[y, Q.value]]),
						t[46] ||= f("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					f("label", Tt, [t[47] ||= f("span", { class: "admin-livetv__label" }, "Channel", -1), m(ie, {
						modelValue: $.value,
						"onUpdate:modelValue": t[12] ||= (e) => $.value = e,
						options: It.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					f("label", Et, [
						t[48] ||= f("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						f("input", {
							value: _n.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: t[13] ||= (e) => _n.value = Number(e.target.value)
						}, null, 40, Dt),
						t[49] ||= f("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					f("label", Ot, [t[50] ||= f("span", { class: "admin-livetv__label" }, "Keep Until", -1), m(ie, {
						modelValue: gn.value,
						"onUpdate:modelValue": t[14] ||= (e) => gn.value = e,
						options: yn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(a, {
				"model-value": N.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": t[17] ||= (e) => N.value = null
			}, {
				footer: x(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[16] ||= (e) => N.value = null
				}, {
					default: x(() => [...t[55] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: Ut
				}, {
					default: x(() => [...t[56] ||= [p("Remove", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					t[53] ||= p("Remove tuner ", -1),
					f("strong", null, v(N.value?.name), 1),
					t[54] ||= p("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": t[19] ||= (e) => H.value = null
			}, {
				footer: x(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[18] ||= (e) => H.value = null
				}, {
					default: x(() => [...t[59] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: tn
				}, {
					default: x(() => [...t[60] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					t[57] ||= p(" Delete recording ", -1),
					f("strong", null, v(H.value?.program_title ?? H.value?.id), 1),
					t[58] ||= p("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": Z.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": t[21] ||= (e) => Z.value = null
			}, {
				footer: x(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[20] ||= (e) => Z.value = null
				}, {
					default: x(() => [...t[63] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: pn
				}, {
					default: x(() => [...t[64] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					t[61] ||= p("Delete series rule ", -1),
					f("strong", null, v(Z.value?.title_pattern), 1),
					t[62] ||= p("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-3dd3ce40"]]);
//#endregion
export { w as default };

//# sourceMappingURL=LiveTvPage-DOhliLUd.js.map