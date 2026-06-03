import { a as e, f as t, h as n, i as ee, m as r, n as te, o as ne, r as i, t as a } from "./Button-C86XulWV.js";
import { t as o } from "./Modal-DaapuyD8.js";
import { t as re } from "./Select-CjbYOZGH.js";
import { t as s } from "./Badge-BiYXL5Nz.js";
import { t as ie } from "./Switch-BRVGpfuc.js";
import { t as ae } from "./liveTv-Dbjt901v.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as oe, inject as se, normalizeClass as ce, onMounted as le, openBlock as g, reactive as ue, ref as _, renderList as v, toDisplayString as y, vModelText as b, watch as de, withCtx as x, withDirectives as S, withKeys as fe, withModifiers as C } from "vue";
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
	key: 3,
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
	key: 3,
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
	key: 3,
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
	key: 3,
	class: "admin-livetv__rule-list"
}, pt = { class: "admin-livetv__rule-info" }, mt = { class: "admin-livetv__rule-title" }, ht = { class: "admin-livetv__rule-meta" }, gt = { class: "admin-livetv__field" }, _t = { class: "admin-livetv__field" }, vt = { class: "admin-livetv__field-row" }, yt = { class: "admin-livetv__field" }, bt = { class: "admin-livetv__field" }, xt = { class: "admin-livetv__field-row" }, St = { class: "admin-livetv__field" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = { class: "admin-livetv__field" }, Dt = ["value"], Ot = { class: "admin-livetv__field" }, kt = /*#__PURE__*/ n(/* @__PURE__ */ oe({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(n) {
		let oe = n, kt = se("apiBase", ""), At = l(() => typeof kt == "string" ? kt : kt?.value ?? ""), w = new ae(oe.client ?? new ne({
			baseUrl: At.value,
			tokenStore: new e()
		})), T = ee();
		function jt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let ee = Math.floor(n / 60), r = n % 60;
			return r > 0 ? `${ee}h ${r}m` : `${ee}h`;
		}
		function Mt(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function E(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function Nt(e) {
			return `${(e / 1024 / 1024).toFixed(1)} MB`;
		}
		function Pt(e, t) {
			return `S${String(e ?? 0).padStart(2, "0")}E${String(t ?? 0).padStart(2, "0")}`;
		}
		let D = ue({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function Ft(e) {
			D[e] = !D[e];
		}
		let O = _([]);
		async function It() {
			try {
				O.value = await w.listChannels();
			} catch {}
		}
		let Lt = l(() => O.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Rt(e) {
			let t = O.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let k = _([]), zt = _(!1), Bt = _(!1), Vt = _(!1), A = ue({}), j = _(null);
		async function Ht() {
			zt.value = !0, j.value = null;
			try {
				k.value = await w.listTuners(), Bt.value = !0;
			} catch (e) {
				j.value = t(e, "Failed to load tuners."), T.error(j.value);
			} finally {
				zt.value = !1;
			}
		}
		async function Ut() {
			if (!Vt.value) {
				Vt.value = !0;
				try {
					let e = await w.scanTuners();
					k.value = e, Bt.value = !0, T.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					T.error(t(e, "Tuner scan failed."));
				} finally {
					Vt.value = !1;
				}
			}
		}
		async function Wt(e) {
			if (!A[e.tuner_id]) {
				A[e.tuner_id] = !0;
				try {
					let t = await w.updateTuner(e.tuner_id, { enabled: !e.enabled });
					k.value = k.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					T.error(t(e, "Failed to update tuner."));
				} finally {
					A[e.tuner_id] = !1;
				}
			}
		}
		let M = _(null);
		async function Gt() {
			let e = M.value;
			if (e) try {
				await w.deleteTuner(e.tuner_id), k.value = k.value.filter((t) => t.tuner_id !== e.tuner_id), T.success("Tuner removed."), M.value = null;
			} catch (e) {
				T.error(t(e, "Failed to delete tuner.")), M.value = null;
			}
		}
		let Kt = l(() => zt.value ? "Loading…" : k.value.length === 0 ? "No tuners found" : `${k.value.length} tuner${k.value.length === 1 ? "" : "s"} configured`), N = _([]), qt = _(!1), Jt = _(!1), P = _(0), F = _(null), Yt = _(!1), Xt = [
			"Today",
			"+1 Day",
			"+2 Days"
		], I = _(null);
		async function L(e) {
			qt.value = !0, I.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				N.value = await w.listGuide({
					from: t,
					to: n
				}), Jt.value = !0;
			} catch (e) {
				I.value = t(e, "Failed to load guide."), T.error(I.value);
			} finally {
				qt.value = !1;
			}
		}
		function Zt(e) {
			P.value = e, L(e);
		}
		function Qt(e) {
			F.value = F.value === e.id ? null : e.id;
		}
		async function $t() {
			if (!Yt.value) {
				Yt.value = !0;
				try {
					let e = await w.refreshGuide();
					T.success(`Guide refreshed. ${e} programmes imported.`), await L(P.value);
				} catch (e) {
					T.error(t(e, "Guide refresh failed."));
				} finally {
					Yt.value = !1;
				}
			}
		}
		let en = l(() => qt.value ? "Loading…" : N.value.length > 0 ? `${N.value.length} programmes` : "No programmes"), R = _([]), z = _(!1), tn = _(!1), B = _("all"), nn = [
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
		], V = _(null);
		async function rn() {
			z.value = !0, V.value = null;
			try {
				R.value = await w.listRecordings(), tn.value = !0;
			} catch (e) {
				V.value = t(e, "Failed to load recordings."), T.error(V.value);
			} finally {
				z.value = !1;
			}
		}
		let H = _(null);
		async function an() {
			let e = H.value;
			if (e) try {
				await w.deleteRecording(e.id), R.value = R.value.filter((t) => t.id !== e.id), T.success("Recording deleted."), H.value = null;
			} catch (e) {
				T.error(t(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function on(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let sn = l(() => z.value ? "Loading…" : `${R.value.length} recording${R.value.length === 1 ? "" : "s"}`), cn = l(() => B.value === "upcoming" ? "No upcoming recordings." : B.value === "by-series" ? "No series recordings." : "No recordings yet."), ln = _(!1), U = _(""), W = _(""), G = _(""), K = _(""), q = _(""), J = _(""), un = _(!1);
		async function dn() {
			await It(), U.value = O.value[0]?.id ?? "", W.value = "", G.value = "", K.value = "", q.value = "", J.value = "", ln.value = !0;
		}
		function fn() {
			ln.value = !1;
		}
		async function pn() {
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
			let e = Math.floor((/* @__PURE__ */ new Date(`${G.value}T${K.value}`)).getTime() / 1e3), n = Math.floor((/* @__PURE__ */ new Date(`${q.value}T${J.value}`)).getTime() / 1e3);
			if (n <= e) {
				T.error("End must be after start.");
				return;
			}
			un.value = !0;
			try {
				let t = await w.createRecording({
					channel_id: U.value,
					start_time: e,
					end_time: n,
					title: W.value.trim()
				});
				R.value = [...R.value, t], T.success("Recording scheduled."), fn();
			} catch (e) {
				T.error(t(e, "Failed to schedule recording."));
			} finally {
				un.value = !1;
			}
		}
		let Y = _([]), mn = _(!1), hn = _(!1), X = _(null);
		async function gn() {
			mn.value = !0, X.value = null;
			try {
				Y.value = await w.listSeriesRules(), hn.value = !0;
			} catch (e) {
				X.value = t(e, "Failed to load series rules."), T.error(X.value);
			} finally {
				mn.value = !1;
			}
		}
		let Z = _(null);
		async function _n() {
			let e = Z.value;
			if (e) try {
				await w.deleteSeriesRule(e.id), Y.value = Y.value.filter((t) => t.id !== e.id), T.success("Series rule deleted."), Z.value = null;
			} catch (e) {
				T.error(t(e, "Failed to delete rule.")), Z.value = null;
			}
		}
		let vn = l(() => mn.value ? "Loading…" : `${Y.value.length} rule${Y.value.length === 1 ? "" : "s"}`), yn = _(!1), Q = _(""), $ = _(""), bn = _("space"), xn = _(3), Sn = _(!1), Cn = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function wn() {
			await It(), Q.value = "", $.value = O.value[0]?.id ?? "", bn.value = "space", xn.value = 3, yn.value = !0;
		}
		function Tn() {
			yn.value = !1;
		}
		async function En() {
			if (!Q.value.trim()) {
				T.error("Title pattern is required.");
				return;
			}
			if (!$.value) {
				T.error("Channel is required.");
				return;
			}
			Sn.value = !0;
			try {
				let e = await w.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: $.value,
					title: Q.value.trim(),
					priority: xn.value,
					keep_until: bn.value
				});
				Y.value = [...Y.value, e], T.success("Series rule created."), Tn();
			} catch (e) {
				T.error(t(e, "Failed to create rule."));
			} finally {
				Sn.value = !1;
			}
		}
		return de(() => D.tuners, (e) => {
			e && !Bt.value && Ht();
		}, { immediate: !0 }), de(() => D.guide, (e) => {
			e && !Jt.value && L(P.value);
		}), de(() => D.recordings, (e) => {
			e && !tn.value && rn();
		}), de(() => D.seriesRules, (e) => {
			e && !hn.value && (gn(), It());
		}), le(() => {}), (e, t) => (g(), f("section", pe, [
			t[70] ||= p("header", { class: "admin-livetv__head" }, [p("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			p("section", me, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": D.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: t[0] ||= (e) => Ft("tuners")
			}, [p("span", ge, [
				h(r, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				t[23] ||= p("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				h(r, {
					name: D.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", _e, y(Kt.value), 1)], 8, he), D.tuners ? (g(), f("div", ve, [p("div", ye, [h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Vt.value,
				onClick: Ut
			}, {
				default: x(() => [...t[24] ||= [m(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), zt.value ? (g(), f("div", be, [h(te, {
				variant: "text",
				lines: 3
			})])) : j.value ? (g(), u(i, {
				key: 1,
				icon: "alert",
				title: "Couldn't load tuners",
				description: j.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Ht
				}, {
					default: x(() => [...t[25] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : k.value.length === 0 ? (g(), u(i, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (g(), f("div", xe, [(g(!0), f(c, null, v(k.value, (e) => (g(), f("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				p("div", Se, [p("span", Ce, [h(s, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: x(() => [m(y(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), p("span", we, y(e.name), 1)]), h(s, { tone: e.enabled ? "success" : "neutral" }, {
					default: x(() => [m(y(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("dl", Te, [
					t[29] ||= p("dt", null, "Host", -1),
					p("dd", null, y(e.host) + ":" + y(e.port), 1),
					e.device_id ? (g(), f(c, { key: 0 }, [t[26] ||= p("dt", null, "Device ID", -1), p("dd", null, y(e.device_id), 1)], 64)) : d("", !0),
					e.last_seen ? (g(), f(c, { key: 1 }, [t[27] ||= p("dt", null, "Last Seen", -1), p("dd", null, y(new Date(e.last_seen).toLocaleString()), 1)], 64)) : d("", !0),
					e.status ? (g(), f(c, { key: 2 }, [t[28] ||= p("dt", null, "Status", -1), p("dd", null, y(e.status), 1)], 64)) : d("", !0)
				]),
				p("div", Ee, [h(ie, {
					"model-value": !!e.enabled,
					disabled: A[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Wt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), h(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => M.value = e
				}, {
					default: x(() => [...t[30] ||= [m(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : d("", !0)]),
			p("section", De, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": D.guide,
				"aria-controls": "livetv-guide-body",
				onClick: t[1] ||= (e) => Ft("guide")
			}, [p("span", ke, [
				h(r, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				t[31] ||= p("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				h(r, {
					name: D.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", Ae, y(en.value), 1)], 8, Oe), D.guide ? (g(), f("div", je, [p("div", Me, [p("div", Ne, [(g(), f(c, null, v(Xt, (e, t) => p("button", {
				key: e,
				type: "button",
				class: ce(["admin-livetv__seg-btn", { "is-active": P.value === t }]),
				"aria-pressed": P.value === t,
				onClick: (e) => Zt(t)
			}, y(e), 11, Pe)), 64))]), h(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Yt.value,
				onClick: $t
			}, {
				default: x(() => [...t[32] ||= [m(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), qt.value ? (g(), f("div", Fe, [h(te, {
				variant: "text",
				lines: 4
			})])) : I.value ? (g(), u(i, {
				key: 1,
				icon: "alert",
				title: "Couldn't load guide",
				description: I.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[2] ||= (e) => L(P.value)
				}, {
					default: x(() => [...t[33] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : N.value.length === 0 ? (g(), u(i, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (g(), f("div", Ie, [(g(!0), f(c, null, v(N.value, (e) => (g(), f("div", {
				key: e.id,
				class: ce(["admin-livetv__program", { "is-selected": F.value === e.id }]),
				role: "listitem",
				tabindex: "0",
				onClick: (t) => Qt(e),
				onKeydown: [fe(C((t) => Qt(e), ["prevent"]), ["enter"]), fe(C((t) => Qt(e), ["prevent"]), ["space"])]
			}, [
				p("div", Re, y(E(e.start_time)) + " – " + y(E(e.end_time)), 1),
				p("div", ze, y(e.title), 1),
				e.description && F.value !== e.id ? (g(), f("p", Be, y(e.description.slice(0, 100)) + y(e.description.length > 100 ? "…" : ""), 1)) : d("", !0),
				F.value === e.id ? (g(), f("div", Ve, [e.description ? (g(), f("p", He, y(e.description), 1)) : d("", !0), p("div", Ue, [
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
						default: x(() => [m(y(Pt(e.season, e.episode)), 1)]),
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
			], 42, Le))), 128))]))])) : d("", !0)]),
			p("section", We, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": D.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: t[3] ||= (e) => Ft("recordings")
			}, [p("span", Ke, [
				h(r, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				t[34] ||= p("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				h(r, {
					name: D.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", qe, y(sn.value), 1)], 8, Ge), D.recordings ? (g(), f("div", Je, [p("div", Ye, [p("div", Xe, [(g(), f(c, null, v(nn, (e) => p("button", {
				key: e.value,
				type: "button",
				role: "tab",
				class: ce(["admin-livetv__seg-btn", { "is-active": B.value === e.value }]),
				"aria-selected": B.value === e.value,
				onClick: (t) => B.value = e.value
			}, y(e.label), 11, Ze)), 64))]), h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: dn
			}, {
				default: x(() => [...t[35] ||= [m(" Schedule Recording ", -1)]]),
				_: 1
			})]), z.value ? (g(), f("div", Qe, [h(te, {
				variant: "text",
				lines: 3
			})])) : V.value ? (g(), u(i, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recordings",
				description: V.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: rn
				}, {
					default: x(() => [...t[36] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : R.value.length === 0 ? (g(), u(i, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: cn.value
			}, null, 8, ["description"])) : (g(), f("div", $e, [(g(!0), f(c, null, v(R.value, (e) => (g(), f("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				p("div", et, [p("span", tt, y(e.program_title ?? "Untitled"), 1), e.status ? (g(), u(s, {
					key: 0,
					tone: on(e.status)
				}, {
					default: x(() => [m(y(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : d("", !0)]),
				p("div", nt, [
					p("span", null, y(e.channel_name ?? e.channel_id), 1),
					p("span", null, y(Mt(e.start_time)) + " · " + y(E(e.start_time)) + " – " + y(E(e.end_time)), 1),
					p("span", null, y(jt(e.start_time, e.end_time)), 1),
					e.size ? (g(), f("span", rt, y(Nt(e.size)), 1)) : d("", !0)
				]),
				p("div", it, [h(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
				}, {
					default: x(() => [...t[37] ||= [m(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : d("", !0)]),
			p("section", at, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": D.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: t[4] ||= (e) => Ft("seriesRules")
			}, [p("span", st, [
				h(r, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				t[38] ||= p("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				h(r, {
					name: D.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", ct, y(vn.value), 1)], 8, ot), D.seriesRules ? (g(), f("div", lt, [p("div", ut, [h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: wn
			}, {
				default: x(() => [...t[39] ||= [m("Add Rule", -1)]]),
				_: 1
			})]), mn.value ? (g(), f("div", dt, [h(te, {
				variant: "text",
				lines: 3
			})])) : X.value ? (g(), u(i, {
				key: 1,
				icon: "alert",
				title: "Couldn't load series rules",
				description: X.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: gn
				}, {
					default: x(() => [...t[40] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Y.value.length === 0 ? (g(), u(i, {
				key: 2,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (g(), f("div", ft, [(g(!0), f(c, null, v(Y.value, (e) => (g(), f("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [p("div", pt, [p("span", mt, y(e.title_pattern), 1), p("div", ht, [
				p("span", null, y(Rt(e)), 1),
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
				onClick: (t) => Z.value = e
			}, {
				default: x(() => [...t[41] ||= [m(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : d("", !0)]),
			h(o, {
				modelValue: ln.value,
				"onUpdate:modelValue": t[11] ||= (e) => ln.value = e,
				title: "Schedule Recording",
				onClose: fn
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: fn
				}, {
					default: x(() => [...t[48] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: un.value,
					onClick: pn
				}, {
					default: x(() => [...t[49] ||= [m(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: C(pn, ["prevent"])
				}, [
					p("label", gt, [t[42] ||= p("span", { class: "admin-livetv__label" }, "Title", -1), S(p("input", {
						"onUpdate:modelValue": t[5] ||= (e) => W.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[b, W.value]])]),
					p("label", _t, [t[43] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(re, {
						modelValue: U.value,
						"onUpdate:modelValue": t[6] ||= (e) => U.value = e,
						options: Lt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("div", vt, [p("label", yt, [t[44] ||= p("span", { class: "admin-livetv__label" }, "Start Date", -1), S(p("input", {
						"onUpdate:modelValue": t[7] ||= (e) => G.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, G.value]])]), p("label", bt, [t[45] ||= p("span", { class: "admin-livetv__label" }, "Start Time", -1), S(p("input", {
						"onUpdate:modelValue": t[8] ||= (e) => K.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, K.value]])])]),
					p("div", xt, [p("label", St, [t[46] ||= p("span", { class: "admin-livetv__label" }, "End Date", -1), S(p("input", {
						"onUpdate:modelValue": t[9] ||= (e) => q.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, q.value]])]), p("label", Ct, [t[47] ||= p("span", { class: "admin-livetv__label" }, "End Time", -1), S(p("input", {
						"onUpdate:modelValue": t[10] ||= (e) => J.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, J.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				modelValue: yn.value,
				"onUpdate:modelValue": t[16] ||= (e) => yn.value = e,
				title: "Add Series Rule",
				onClose: Tn
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: Tn
				}, {
					default: x(() => [...t[56] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: Sn.value,
					onClick: En
				}, {
					default: x(() => [...t[57] ||= [m("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: C(En, ["prevent"])
				}, [
					p("label", wt, [
						t[50] ||= p("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						S(p("input", {
							"onUpdate:modelValue": t[12] ||= (e) => Q.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[b, Q.value]]),
						t[51] ||= p("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					p("label", Tt, [t[52] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(re, {
						modelValue: $.value,
						"onUpdate:modelValue": t[13] ||= (e) => $.value = e,
						options: Lt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("label", Et, [
						t[53] ||= p("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						p("input", {
							value: xn.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: t[14] ||= (e) => xn.value = Number(e.target.value)
						}, null, 40, Dt),
						t[54] ||= p("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					p("label", Ot, [t[55] ||= p("span", { class: "admin-livetv__label" }, "Keep Until", -1), h(re, {
						modelValue: bn.value,
						"onUpdate:modelValue": t[15] ||= (e) => bn.value = e,
						options: Cn,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				"model-value": M.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": t[18] ||= (e) => M.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[17] ||= (e) => M.value = null
				}, {
					default: x(() => [...t[60] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: Gt
				}, {
					default: x(() => [...t[61] ||= [m("Remove", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[58] ||= m("Remove tuner ", -1),
					p("strong", null, y(M.value?.name), 1),
					t[59] ||= m("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": t[20] ||= (e) => H.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[19] ||= (e) => H.value = null
				}, {
					default: x(() => [...t[64] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: an
				}, {
					default: x(() => [...t[65] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[62] ||= m(" Delete recording ", -1),
					p("strong", null, y(H.value?.program_title ?? H.value?.id), 1),
					t[63] ||= m("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				"model-value": Z.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": t[22] ||= (e) => Z.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[21] ||= (e) => Z.value = null
				}, {
					default: x(() => [...t[68] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: _n
				}, {
					default: x(() => [...t[69] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[66] ||= m("Delete series rule ", -1),
					p("strong", null, y(Z.value?.title_pattern), 1),
					t[67] ||= m("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-f28ff8c7"]]);
//#endregion
export { kt as default };

//# sourceMappingURL=LiveTvPage-DMh6fOAm.js.map