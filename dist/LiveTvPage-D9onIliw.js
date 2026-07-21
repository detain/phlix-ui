import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { c as n, f as r, t as ee } from "./client-D80As4Gx.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { n as re } from "./listbox-htyKA_G5.js";
import { t as ie } from "./Select-CymWKJLs.js";
import { t as o } from "./Modal-BgLqRZQi.js";
import { t as ae } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-ZlI5t4KT.js";
import { t as oe } from "./PageHint-BoAlFFBN.js";
import { t as se } from "./liveTv-Dbjt901v.js";
import { t as ce } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as le, inject as ue, normalizeClass as de, onMounted as fe, openBlock as g, reactive as pe, ref as _, renderList as v, toDisplayString as y, unref as me, vModelText as b, watch as he, withCtx as x, withDirectives as S, withKeys as ge, withModifiers as C } from "vue";
//#region src/pages/admin/LiveTvPage.vue?vue&type=script&setup=true&lang.ts
var _e = {
	class: "admin-livetv",
	"aria-labelledby": "livetv-heading"
}, ve = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-tuners-heading"
}, ye = ["aria-expanded"], be = { class: "admin-livetv__section-title-row" }, xe = { class: "admin-livetv__section-summary" }, Se = {
	key: 0,
	id: "livetv-tuners-body",
	class: "admin-livetv__section-body"
}, Ce = { class: "admin-livetv__toolbar" }, we = {
	key: 0,
	class: "admin-livetv__skel"
}, Te = {
	key: 3,
	class: "admin-livetv__card-grid"
}, Ee = { class: "admin-livetv__card-head" }, De = { class: "admin-livetv__card-title-row" }, Oe = { class: "admin-livetv__card-name" }, ke = { class: "admin-livetv__dl" }, Ae = { class: "admin-livetv__card-actions" }, je = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-guide-heading"
}, Me = ["aria-expanded"], Ne = { class: "admin-livetv__section-title-row" }, Pe = { class: "admin-livetv__section-summary" }, Fe = {
	key: 0,
	id: "livetv-guide-body",
	class: "admin-livetv__section-body"
}, Ie = { class: "admin-livetv__toolbar" }, Le = {
	class: "admin-livetv__segmented",
	role: "group",
	"aria-label": "Guide date"
}, Re = ["aria-pressed", "onClick"], ze = {
	key: 0,
	class: "admin-livetv__skel"
}, Be = {
	key: 3,
	class: "admin-livetv__guide-grid"
}, Ve = [
	"aria-pressed",
	"aria-label",
	"onClick",
	"onKeydown"
], He = { class: "admin-livetv__program-time" }, Ue = { class: "admin-livetv__program-title" }, We = {
	key: 0,
	class: "admin-livetv__program-desc"
}, Ge = {
	key: 1,
	class: "admin-livetv__program-expanded"
}, Ke = {
	key: 0,
	class: "admin-livetv__program-full-desc"
}, qe = { class: "admin-livetv__program-meta" }, Je = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-recordings-heading"
}, Ye = ["aria-expanded"], Xe = { class: "admin-livetv__section-title-row" }, Ze = { class: "admin-livetv__section-summary" }, Qe = {
	key: 0,
	id: "livetv-recordings-body",
	class: "admin-livetv__section-body"
}, $e = { class: "admin-livetv__toolbar" }, et = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"onClick"
], tt = ["id", "aria-labelledby"], nt = {
	key: 0,
	class: "admin-livetv__skel"
}, rt = {
	key: 3,
	class: "admin-livetv__rec-list"
}, it = { class: "admin-livetv__card-head" }, at = { class: "admin-livetv__card-name" }, ot = { class: "admin-livetv__rec-meta" }, st = { key: 0 }, ct = { class: "admin-livetv__card-actions" }, lt = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-rules-heading"
}, ut = ["aria-expanded"], dt = { class: "admin-livetv__section-title-row" }, ft = { class: "admin-livetv__section-summary" }, pt = {
	key: 0,
	id: "livetv-rules-body",
	class: "admin-livetv__section-body"
}, mt = { class: "admin-livetv__toolbar" }, ht = {
	key: 0,
	class: "admin-livetv__skel"
}, gt = {
	key: 3,
	class: "admin-livetv__rule-list"
}, _t = { class: "admin-livetv__rule-info" }, vt = { class: "admin-livetv__rule-title" }, yt = { class: "admin-livetv__rule-meta" }, bt = { class: "admin-livetv__field" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field-row" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field-row" }, Et = { class: "admin-livetv__field" }, Dt = { class: "admin-livetv__field" }, Ot = { class: "admin-livetv__field" }, kt = { class: "admin-livetv__field" }, At = { class: "admin-livetv__field" }, jt = ["value"], Mt = { class: "admin-livetv__field" }, w = /*#__PURE__*/ e(/* @__PURE__ */ le({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(e) {
		let le = e, w = ue("apiBase", ""), Nt = l(() => typeof w == "string" ? w : w?.value ?? ""), T = new se(le.client ?? new ee({
			baseUrl: Nt.value,
			tokenStore: new n()
		})), E = te();
		function Pt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), ee = n % 60;
			return ee > 0 ? `${r}h ${ee}m` : `${r}h`;
		}
		function Ft(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function D(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function It(e) {
			return `${(e / 1024 / 1024).toFixed(1)} MB`;
		}
		function Lt(e, t) {
			return `S${String(e ?? 0).padStart(2, "0")}E${String(t ?? 0).padStart(2, "0")}`;
		}
		let O = pe({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function Rt(e) {
			O[e] = !O[e];
		}
		let k = _([]);
		async function zt() {
			try {
				k.value = await T.listChannels();
			} catch {}
		}
		let Bt = l(() => k.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function Vt(e) {
			let t = k.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let A = _([]), Ht = _(!1), Ut = _(!1), Wt = _(!1), j = pe({}), M = _(null);
		async function Gt() {
			Ht.value = !0, M.value = null;
			try {
				A.value = await T.listTuners(), Ut.value = !0;
			} catch (e) {
				M.value = r(e, "Failed to load tuners."), E.error(M.value);
			} finally {
				Ht.value = !1;
			}
		}
		async function Kt() {
			if (!Wt.value) {
				Wt.value = !0;
				try {
					let e = await T.scanTuners();
					A.value = e, Ut.value = !0, E.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					E.error(r(e, "Tuner scan failed."));
				} finally {
					Wt.value = !1;
				}
			}
		}
		async function qt(e) {
			if (!j[e.tuner_id]) {
				j[e.tuner_id] = !0;
				try {
					let t = await T.updateTuner(e.tuner_id, { enabled: !e.enabled });
					A.value = A.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					E.error(r(e, "Failed to update tuner."));
				} finally {
					j[e.tuner_id] = !1;
				}
			}
		}
		let N = _(null);
		async function Jt() {
			let e = N.value;
			if (e) try {
				await T.deleteTuner(e.tuner_id), A.value = A.value.filter((t) => t.tuner_id !== e.tuner_id), E.success("Tuner removed."), N.value = null;
			} catch (e) {
				E.error(r(e, "Failed to delete tuner.")), N.value = null;
			}
		}
		let Yt = l(() => Ht.value ? "Loading…" : A.value.length === 0 ? "No tuners found" : `${A.value.length} tuner${A.value.length === 1 ? "" : "s"} configured`), P = _([]), Xt = _(!1), Zt = _(!1), F = _(0), I = _(null), Qt = _(!1), $t = [
			"Today",
			"+1 Day",
			"+2 Days"
		], L = _(null);
		async function en(e) {
			Xt.value = !0, L.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				P.value = await T.listGuide({
					from: t,
					to: n
				}), Zt.value = !0;
			} catch (e) {
				L.value = r(e, "Failed to load guide."), E.error(L.value);
			} finally {
				Xt.value = !1;
			}
		}
		function tn(e) {
			F.value = e, en(e);
		}
		function nn(e) {
			I.value = I.value === e.id ? null : e.id;
		}
		async function rn() {
			if (!Qt.value) {
				Qt.value = !0;
				try {
					let e = await T.refreshGuide();
					E.success(`Guide refreshed. ${e} programmes imported.`), await en(F.value);
				} catch (e) {
					E.error(r(e, "Guide refresh failed."));
				} finally {
					Qt.value = !1;
				}
			}
		}
		let an = l(() => Xt.value ? "Loading…" : P.value.length > 0 ? `${P.value.length} programmes` : "No programmes"), R = _([]), z = _(!1), on = _(!1), B = _("all"), sn = [
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
		], cn = _(null);
		function ln(e) {
			cn.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function un(e) {
			let t = sn.map((e) => ({
				value: e.value,
				label: e.label
			})), n = sn.findIndex((e) => e.value === B.value), r = -1;
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
			r >= 0 && (e.preventDefault(), B.value = sn[r].value, ln(r));
		}
		let V = _(null);
		async function dn() {
			z.value = !0, V.value = null;
			try {
				R.value = await T.listRecordings(), on.value = !0;
			} catch (e) {
				V.value = r(e, "Failed to load recordings."), E.error(V.value);
			} finally {
				z.value = !1;
			}
		}
		let H = _(null);
		async function fn() {
			let e = H.value;
			if (e) try {
				await T.deleteRecording(e.id), R.value = R.value.filter((t) => t.id !== e.id), E.success("Recording deleted."), H.value = null;
			} catch (e) {
				E.error(r(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function pn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let mn = l(() => z.value ? "Loading…" : `${R.value.length} recording${R.value.length === 1 ? "" : "s"}`), hn = l(() => B.value === "upcoming" ? "No upcoming recordings." : B.value === "by-series" ? "No series recordings." : "No recordings yet."), gn = _(!1), U = _(""), W = _(""), G = _(""), K = _(""), q = _(""), J = _(""), _n = _(!1);
		async function vn() {
			await zt(), U.value = k.value[0]?.id ?? "", W.value = "", G.value = "", K.value = "", q.value = "", J.value = "", gn.value = !0;
		}
		function yn() {
			gn.value = !1;
		}
		async function bn() {
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
			_n.value = !0;
			try {
				let n = await T.createRecording({
					channel_id: U.value,
					start_time: e,
					end_time: t,
					title: W.value.trim()
				});
				R.value = [...R.value, n], E.success("Recording scheduled."), yn();
			} catch (e) {
				E.error(r(e, "Failed to schedule recording."));
			} finally {
				_n.value = !1;
			}
		}
		let Y = _([]), xn = _(!1), Sn = _(!1), X = _(null);
		async function Cn() {
			xn.value = !0, X.value = null;
			try {
				Y.value = await T.listSeriesRules(), Sn.value = !0;
			} catch (e) {
				X.value = r(e, "Failed to load series rules."), E.error(X.value);
			} finally {
				xn.value = !1;
			}
		}
		let Z = _(null);
		async function wn() {
			let e = Z.value;
			if (e) try {
				await T.deleteSeriesRule(e.id), Y.value = Y.value.filter((t) => t.id !== e.id), E.success("Series rule deleted."), Z.value = null;
			} catch (e) {
				E.error(r(e, "Failed to delete rule.")), Z.value = null;
			}
		}
		let Tn = l(() => xn.value ? "Loading…" : `${Y.value.length} rule${Y.value.length === 1 ? "" : "s"}`), En = _(!1), Q = _(""), $ = _(""), Dn = _("space"), On = _(3), kn = _(!1), An = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function jn() {
			await zt(), Q.value = "", $.value = k.value[0]?.id ?? "", Dn.value = "space", On.value = 3, En.value = !0;
		}
		function Mn() {
			En.value = !1;
		}
		async function Nn() {
			if (!Q.value.trim()) {
				E.error("Title pattern is required.");
				return;
			}
			if (!$.value) {
				E.error("Channel is required.");
				return;
			}
			kn.value = !0;
			try {
				let e = await T.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: $.value,
					title: Q.value.trim(),
					priority: On.value,
					keep_until: Dn.value
				});
				Y.value = [...Y.value, e], E.success("Series rule created."), Mn();
			} catch (e) {
				E.error(r(e, "Failed to create rule."));
			} finally {
				kn.value = !1;
			}
		}
		return he(() => O.tuners, (e) => {
			e && !Ut.value && Gt();
		}, { immediate: !0 }), he(() => O.guide, (e) => {
			e && !Zt.value && en(F.value);
		}), he(() => O.recordings, (e) => {
			e && !on.value && dn();
		}), he(() => O.seriesRules, (e) => {
			e && !Sn.value && (Cn(), zt());
		}), fe(() => {}), (e, n) => (g(), f("section", _e, [
			n[71] ||= p("header", { class: "admin-livetv__head" }, [p("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			h(oe, {
				links: me(ce).livetv.links,
				details: me(ce).livetv.details
			}, {
				default: x(() => [...n[23] ||= [
					m(" Set up over-the-air or IPTV channels and record them. In ", -1),
					p("strong", null, "Tuners", -1),
					m(", ", -1),
					p("strong", null, "Scan for Tuners", -1),
					m(" finds devices on your network, which you can then enable or remove. The ", -1),
					p("strong", null, "Guide", -1),
					m(" shows what's on — pick a day and ", -1),
					p("strong", null, "Refresh Guide", -1),
					m(" to update listings. ", -1),
					p("strong", null, "Recordings", -1),
					m(" lists what's scheduled or captured (", -1),
					p("strong", null, "Schedule Recording", -1),
					m(" adds one manually), and ", -1),
					p("strong", null, "Series Rules", -1),
					m(" stores a per-show rule — see below before relying on it. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			p("section", ve, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: n[0] ||= (e) => Rt("tuners")
			}, [p("span", be, [
				h(t, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				n[24] ||= p("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				h(t, {
					name: O.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", xe, y(Yt.value), 1)], 8, ye), O.tuners ? (g(), f("div", Se, [p("div", Ce, [h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Wt.value,
				onClick: Kt
			}, {
				default: x(() => [...n[25] ||= [m(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Ht.value ? (g(), f("div", we, [h(ae, {
				variant: "text",
				lines: 3
			})])) : M.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load tuners",
				description: M.value
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Gt
				}, {
					default: x(() => [...n[26] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (g(), f("div", Te, [(g(!0), f(c, null, v(A.value, (e) => (g(), f("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				p("div", Ee, [p("span", De, [h(a, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: x(() => [m(y(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), p("span", Oe, y(e.name), 1)]), h(a, { tone: e.enabled ? "success" : "neutral" }, {
					default: x(() => [m(y(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("dl", ke, [
					n[30] ||= p("dt", null, "Host", -1),
					p("dd", null, y(e.host) + ":" + y(e.port), 1),
					e.device_id ? (g(), f(c, { key: 0 }, [n[27] ||= p("dt", null, "Device ID", -1), p("dd", null, y(e.device_id), 1)], 64)) : d("", !0),
					e.last_seen ? (g(), f(c, { key: 1 }, [n[28] ||= p("dt", null, "Last Seen", -1), p("dd", null, y(new Date(e.last_seen).toLocaleString()), 1)], 64)) : d("", !0),
					e.status ? (g(), f(c, { key: 2 }, [n[29] ||= p("dt", null, "Status", -1), p("dd", null, y(e.status), 1)], 64)) : d("", !0)
				]),
				p("div", Ae, [h(ne, {
					"model-value": !!e.enabled,
					disabled: j[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => qt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), h(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => N.value = e
				}, {
					default: x(() => [...n[31] ||= [m(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : d("", !0)]),
			p("section", je, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.guide,
				"aria-controls": "livetv-guide-body",
				onClick: n[1] ||= (e) => Rt("guide")
			}, [p("span", Ne, [
				h(t, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				n[32] ||= p("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				h(t, {
					name: O.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", Pe, y(an.value), 1)], 8, Me), O.guide ? (g(), f("div", Fe, [p("div", Ie, [p("div", Le, [(g(), f(c, null, v($t, (e, t) => p("button", {
				key: e,
				type: "button",
				class: de(["admin-livetv__seg-btn", { "is-active": F.value === t }]),
				"aria-pressed": F.value === t,
				onClick: (e) => tn(t)
			}, y(e), 11, Re)), 64))]), h(i, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Qt.value,
				onClick: rn
			}, {
				default: x(() => [...n[33] ||= [m(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Xt.value ? (g(), f("div", ze, [h(ae, {
				variant: "text",
				lines: 4
			})])) : L.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load guide",
				description: L.value
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: n[2] ||= (e) => en(F.value)
				}, {
					default: x(() => [...n[34] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : P.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (g(), f("div", Be, [(g(!0), f(c, null, v(P.value, (e) => (g(), f("div", {
				key: e.id,
				class: de(["admin-livetv__program", { "is-selected": I.value === e.id }]),
				role: "button",
				tabindex: "0",
				"aria-pressed": I.value === e.id,
				"aria-label": `${e.title}, ${D(e.start_time)} to ${D(e.end_time)}`,
				onClick: (t) => nn(e),
				onKeydown: [ge(C((t) => nn(e), ["prevent"]), ["enter"]), ge(C((t) => nn(e), ["prevent"]), ["space"])]
			}, [
				p("div", He, y(D(e.start_time)) + " – " + y(D(e.end_time)), 1),
				p("div", Ue, y(e.title), 1),
				e.description && I.value !== e.id ? (g(), f("p", We, y(e.description.slice(0, 100)) + y(e.description.length > 100 ? "…" : ""), 1)) : d("", !0),
				I.value === e.id ? (g(), f("div", Ge, [e.description ? (g(), f("p", Ke, y(e.description), 1)) : d("", !0), p("div", qe, [
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
						default: x(() => [m(y(Lt(e.season, e.episode)), 1)]),
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
			], 42, Ve))), 128))]))])) : d("", !0)]),
			p("section", Je, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: n[3] ||= (e) => Rt("recordings")
			}, [p("span", Xe, [
				h(t, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				n[35] ||= p("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				h(t, {
					name: O.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", Ze, y(mn.value), 1)], 8, Ye), O.recordings ? (g(), f("div", Qe, [p("div", $e, [p("div", {
				ref_key: "recTablistEl",
				ref: cn,
				class: "admin-livetv__segmented",
				role: "tablist",
				"aria-label": "Recording filter",
				onKeydown: un
			}, [(g(), f(c, null, v(sn, (e) => p("button", {
				id: `rec-tab-${e.value}`,
				key: e.value,
				type: "button",
				role: "tab",
				class: de(["admin-livetv__seg-btn", { "is-active": B.value === e.value }]),
				"aria-selected": B.value === e.value,
				"aria-controls": `rec-panel-${e.value}`,
				tabindex: B.value === e.value ? 0 : -1,
				onClick: (t) => B.value = e.value
			}, y(e.label), 11, et)), 64))], 544), h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: vn
			}, {
				default: x(() => [...n[36] ||= [m(" Schedule Recording ", -1)]]),
				_: 1
			})]), p("div", {
				id: `rec-panel-${B.value}`,
				role: "tabpanel",
				"aria-labelledby": `rec-tab-${B.value}`
			}, [z.value ? (g(), f("div", nt, [h(ae, {
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
					onClick: dn
				}, {
					default: x(() => [...n[37] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : R.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: hn.value
			}, null, 8, ["description"])) : (g(), f("div", rt, [(g(!0), f(c, null, v(R.value, (e) => (g(), f("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				p("div", it, [p("span", at, y(e.program_title ?? "Untitled"), 1), e.status ? (g(), u(a, {
					key: 0,
					tone: pn(e.status)
				}, {
					default: x(() => [m(y(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : d("", !0)]),
				p("div", ot, [
					p("span", null, y(e.channel_name ?? e.channel_id), 1),
					p("span", null, y(Ft(e.start_time)) + " · " + y(D(e.start_time)) + " – " + y(D(e.end_time)), 1),
					p("span", null, y(Pt(e.start_time, e.end_time)), 1),
					e.size ? (g(), f("span", st, y(It(e.size)), 1)) : d("", !0)
				]),
				p("div", ct, [h(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
				}, {
					default: x(() => [...n[38] ||= [m(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))], 8, tt)])) : d("", !0)]),
			p("section", lt, [p("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": O.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: n[4] ||= (e) => Rt("seriesRules")
			}, [p("span", dt, [
				h(t, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				n[39] ||= p("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				h(t, {
					name: O.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), p("span", ft, y(Tn.value), 1)], 8, ut), O.seriesRules ? (g(), f("div", pt, [p("div", mt, [h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: jn
			}, {
				default: x(() => [...n[40] ||= [m("Add Rule", -1)]]),
				_: 1
			})]), xn.value ? (g(), f("div", ht, [h(ae, {
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
					onClick: Cn
				}, {
					default: x(() => [...n[41] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Y.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (g(), f("div", gt, [(g(!0), f(c, null, v(Y.value, (e) => (g(), f("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [p("div", _t, [p("span", vt, y(e.title_pattern), 1), p("div", yt, [
				p("span", null, y(Vt(e)), 1),
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
				default: x(() => [...n[42] ||= [m(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : d("", !0)]),
			h(o, {
				modelValue: gn.value,
				"onUpdate:modelValue": n[11] ||= (e) => gn.value = e,
				title: "Schedule Recording",
				onClose: yn
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: yn
				}, {
					default: x(() => [...n[49] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: _n.value,
					onClick: bn
				}, {
					default: x(() => [...n[50] ||= [m(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: C(bn, ["prevent"])
				}, [
					p("label", bt, [n[43] ||= p("span", { class: "admin-livetv__label" }, "Title", -1), S(p("input", {
						"onUpdate:modelValue": n[5] ||= (e) => W.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[b, W.value]])]),
					p("label", xt, [n[44] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(ie, {
						modelValue: U.value,
						"onUpdate:modelValue": n[6] ||= (e) => U.value = e,
						options: Bt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("div", St, [p("label", Ct, [n[45] ||= p("span", { class: "admin-livetv__label" }, "Start Date", -1), S(p("input", {
						"onUpdate:modelValue": n[7] ||= (e) => G.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, G.value]])]), p("label", wt, [n[46] ||= p("span", { class: "admin-livetv__label" }, "Start Time", -1), S(p("input", {
						"onUpdate:modelValue": n[8] ||= (e) => K.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, K.value]])])]),
					p("div", Tt, [p("label", Et, [n[47] ||= p("span", { class: "admin-livetv__label" }, "End Date", -1), S(p("input", {
						"onUpdate:modelValue": n[9] ||= (e) => q.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[b, q.value]])]), p("label", Dt, [n[48] ||= p("span", { class: "admin-livetv__label" }, "End Time", -1), S(p("input", {
						"onUpdate:modelValue": n[10] ||= (e) => J.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[b, J.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				modelValue: En.value,
				"onUpdate:modelValue": n[16] ||= (e) => En.value = e,
				title: "Add Series Rule",
				onClose: Mn
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: Mn
				}, {
					default: x(() => [...n[57] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: kn.value,
					onClick: Nn
				}, {
					default: x(() => [...n[58] ||= [m("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-livetv__form",
					onSubmit: C(Nn, ["prevent"])
				}, [
					p("label", Ot, [
						n[51] ||= p("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						S(p("input", {
							"onUpdate:modelValue": n[12] ||= (e) => Q.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[b, Q.value]]),
						n[52] ||= p("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					p("label", kt, [n[53] ||= p("span", { class: "admin-livetv__label" }, "Channel", -1), h(ie, {
						modelValue: $.value,
						"onUpdate:modelValue": n[13] ||= (e) => $.value = e,
						options: Bt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					p("label", At, [
						n[54] ||= p("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						p("input", {
							value: On.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: n[14] ||= (e) => On.value = Number(e.target.value)
						}, null, 40, jt),
						n[55] ||= p("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					p("label", Mt, [n[56] ||= p("span", { class: "admin-livetv__label" }, "Keep Until", -1), h(ie, {
						modelValue: Dn.value,
						"onUpdate:modelValue": n[15] ||= (e) => Dn.value = e,
						options: An,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				"model-value": N.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": n[18] ||= (e) => N.value = null
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[17] ||= (e) => N.value = null
				}, {
					default: x(() => [...n[61] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: Jt
				}, {
					default: x(() => [...n[62] ||= [m("Remove", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					n[59] ||= m("Remove tuner ", -1),
					p("strong", null, y(N.value?.name), 1),
					n[60] ||= m("? This cannot be undone.", -1)
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
					default: x(() => [...n[65] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: fn
				}, {
					default: x(() => [...n[66] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					n[63] ||= m(" Delete recording ", -1),
					p("strong", null, y(H.value?.program_title ?? H.value?.id), 1),
					n[64] ||= m("? ", -1)
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
					default: x(() => [...n[69] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: wn
				}, {
					default: x(() => [...n[70] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					n[67] ||= m("Delete series rule ", -1),
					p("strong", null, y(Z.value?.title_pattern), 1),
					n[68] ||= m("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-b126bffc"]]);
//#endregion
export { w as default };

//# sourceMappingURL=LiveTvPage-D9onIliw.js.map