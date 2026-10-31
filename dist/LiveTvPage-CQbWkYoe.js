import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./liveTv-TVXQtrQ9.js";
import { t as r } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as ee } from "./PageHint-BlhPmafC.js";
import { t as te } from "./helpLinks-iarZuNmw.js";
import { t as a } from "./Button-1sKEdGjj.js";
import { t as o } from "./Modal-BU4hJGBA.js";
import { t as ne } from "./Select-ChFXd0gU.js";
import { t as re } from "./Switch-C1Wv5sN2.js";
import { t as s } from "./Skeleton-B2Mt2L00.js";
import { t as c } from "./EmptyState-BjOJ1k_A.js";
import { n as ie, t as l } from "./Icon-CIbfiPrs.js";
import { n as ae } from "./listbox-Dr6NFVBJ.js";
import { a as u } from "./plural-B3O2rVPV.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as oe, inject as se, normalizeClass as ce, onMounted as le, openBlock as y, reactive as ue, ref as b, renderList as x, toDisplayString as S, unref as de, vModelText as C, watch as fe, withCtx as w, withDirectives as T, withKeys as pe, withModifiers as E } from "vue";
// src/pages/admin/LiveTvPage.vue?vue&type=script&setup=true&lang.ts
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
}, mt = { class: "admin-livetv__rule-info" }, ht = { class: "admin-livetv__rule-title" }, gt = { class: "admin-livetv__rule-meta" }, _t = { class: "admin-livetv__field" }, vt = { class: "admin-livetv__field" }, yt = { class: "admin-livetv__field-row" }, bt = { class: "admin-livetv__field" }, xt = { class: "admin-livetv__field" }, St = { class: "admin-livetv__field-row" }, Ct = { class: "admin-livetv__field" }, wt = { class: "admin-livetv__field" }, Tt = { class: "admin-livetv__field" }, Et = { class: "admin-livetv__field" }, Dt = { class: "admin-livetv__field" }, Ot = ["value"], kt = { class: "admin-livetv__field" }, At = /*#__PURE__*/ ie(/* @__PURE__ */ oe({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(ie) {
		let oe = ie, At = se("apiBase", ""), jt = f(() => typeof At == "string" ? At : At?.value ?? ""), D = new n(oe.client ?? new e({ baseUrl: jt.value })), O = r();
		function Mt(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), i = n % 60;
			return i > 0 ? `${r}h ${i}m` : `${r}h`;
		}
		function Nt(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function k(e) {
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
		let A = ue({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function It(e) {
			A[e] = !A[e];
		}
		let j = b([]);
		async function Lt() {
			try {
				j.value = await D.listChannels();
			} catch {}
		}
		let Rt = f(() => j.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function zt(e) {
			let t = j.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let M = b([]), Bt = b(!1), Vt = b(!1), Ht = b(!1), Ut = ue({}), N = b(null);
		async function Wt() {
			Bt.value = !0, N.value = null;
			try {
				M.value = await D.listTuners(), Vt.value = !0;
			} catch (e) {
				N.value = t(e, "Failed to load tuners."), O.error(N.value);
			} finally {
				Bt.value = !1;
			}
		}
		async function Gt() {
			if (!Ht.value) {
				Ht.value = !0;
				try {
					let e = await D.scanTuners();
					M.value = e, Vt.value = !0, O.success(`Scan complete. Found ${u(e.length, "tuner", "tuners")}.`);
				} catch (e) {
					O.error(t(e, "Tuner scan failed."));
				} finally {
					Ht.value = !1;
				}
			}
		}
		async function Kt(e) {
			if (!Ut[e.tuner_id]) {
				Ut[e.tuner_id] = !0;
				try {
					let t = await D.updateTuner(e.tuner_id, { enabled: !e.enabled });
					M.value = M.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					O.error(t(e, "Failed to update tuner."));
				} finally {
					Ut[e.tuner_id] = !1;
				}
			}
		}
		let P = b(null);
		async function qt() {
			let e = P.value;
			if (e) try {
				await D.deleteTuner(e.tuner_id), M.value = M.value.filter((t) => t.tuner_id !== e.tuner_id), O.success("Tuner removed."), P.value = null;
			} catch (e) {
				O.error(t(e, "Failed to delete tuner.")), P.value = null;
			}
		}
		let Jt = f(() => Bt.value ? "Loading…" : M.value.length === 0 ? "No tuners found" : `${u(M.value.length, "tuner", "tuners")} configured`), F = b([]), Yt = b(!1), Xt = b(!1), I = b(0), L = b(null), Zt = b(!1), Qt = [
			"Today",
			"+1 Day",
			"+2 Days"
		], R = b(null);
		async function $t(e) {
			Yt.value = !0, R.value = null;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				F.value = await D.listGuide({
					from: t,
					to: n
				}), Xt.value = !0;
			} catch (e) {
				R.value = t(e, "Failed to load guide."), O.error(R.value);
			} finally {
				Yt.value = !1;
			}
		}
		function en(e) {
			I.value = e, $t(e);
		}
		function tn(e) {
			L.value = L.value === e.id ? null : e.id;
		}
		async function nn() {
			if (!Zt.value) {
				Zt.value = !0;
				try {
					let e = await D.refreshGuide();
					O.success(`Guide refreshed. ${u(e, "programme", "programmes")} imported.`), await $t(I.value);
				} catch (e) {
					O.error(t(e, "Guide refresh failed."));
				} finally {
					Zt.value = !1;
				}
			}
		}
		let rn = f(() => Yt.value ? "Loading…" : F.value.length === 0 ? "No programmes" : u(F.value.length, "programme", "programmes")), z = b([]), an = b(!1), on = b(!1), B = b("all"), sn = [
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
		], cn = b(null);
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
					r = ae(t, n, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					r = ae(t, n, -1);
					break;
				case "Home":
					r = ae(t, -1, 1);
					break;
				case "End":
					r = ae(t, 0, -1);
					break;
				default: return;
			}
			r >= 0 && (e.preventDefault(), B.value = sn[r].value, ln(r));
		}
		let V = b(null);
		async function dn() {
			an.value = !0, V.value = null;
			try {
				z.value = await D.listRecordings(), on.value = !0;
			} catch (e) {
				V.value = t(e, "Failed to load recordings."), O.error(V.value);
			} finally {
				an.value = !1;
			}
		}
		let H = b(null);
		async function fn() {
			let e = H.value;
			if (e) try {
				await D.deleteRecording(e.id), z.value = z.value.filter((t) => t.id !== e.id), O.success("Recording deleted."), H.value = null;
			} catch (e) {
				O.error(t(e, "Failed to delete recording.")), H.value = null;
			}
		}
		function pn(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let mn = f(() => an.value ? "Loading…" : u(z.value.length, "recording", "recordings")), hn = f(() => B.value === "upcoming" ? "No upcoming recordings." : B.value === "by-series" ? "No series recordings." : "No recordings yet."), gn = b(!1), U = b(""), W = b(""), G = b(""), K = b(""), q = b(""), J = b(""), _n = b(!1);
		async function vn() {
			await Lt(), U.value = j.value[0]?.id ?? "", W.value = "", G.value = "", K.value = "", q.value = "", J.value = "", gn.value = !0;
		}
		function yn() {
			gn.value = !1;
		}
		async function bn() {
			if (!U.value) {
				O.error("Channel is required.");
				return;
			}
			if (!W.value.trim()) {
				O.error("Title is required.");
				return;
			}
			if (!G.value || !K.value || !q.value || !J.value) {
				O.error("Start and end date/time are required.");
				return;
			}
			let e = Math.floor((/* @__PURE__ */ new Date(`${G.value}T${K.value}`)).getTime() / 1e3), n = Math.floor((/* @__PURE__ */ new Date(`${q.value}T${J.value}`)).getTime() / 1e3);
			if (n <= e) O.error("End must be after start.");
			else {
				_n.value = !0;
				try {
					let t = await D.createRecording({
						channel_id: U.value,
						start_time: e,
						end_time: n,
						title: W.value.trim()
					});
					z.value = [...z.value, t], O.success("Recording scheduled."), yn();
				} catch (e) {
					O.error(t(e, "Failed to schedule recording."));
				} finally {
					_n.value = !1;
				}
			}
		}
		let Y = b([]), xn = b(!1), Sn = b(!1), X = b(null);
		async function Cn() {
			xn.value = !0, X.value = null;
			try {
				Y.value = await D.listSeriesRules(), Sn.value = !0;
			} catch (e) {
				X.value = t(e, "Failed to load series rules."), O.error(X.value);
			} finally {
				xn.value = !1;
			}
		}
		let Z = b(null);
		async function wn() {
			let e = Z.value;
			if (e) try {
				await D.deleteSeriesRule(e.id), Y.value = Y.value.filter((t) => t.id !== e.id), O.success("Series rule deleted."), Z.value = null;
			} catch (e) {
				O.error(t(e, "Failed to delete rule.")), Z.value = null;
			}
		}
		let Tn = f(() => xn.value ? "Loading…" : u(Y.value.length, "rule", "rules")), En = b(!1), Q = b(""), $ = b(""), Dn = b("space"), On = b(3), kn = b(!1), An = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function jn() {
			await Lt(), Q.value = "", $.value = j.value[0]?.id ?? "", Dn.value = "space", On.value = 3, En.value = !0;
		}
		function Mn() {
			En.value = !1;
		}
		async function Nn() {
			if (!Q.value.trim()) O.error("Title pattern is required.");
			else if (!$.value) O.error("Channel is required.");
			else {
				kn.value = !0;
				try {
					let e = await D.createSeriesRule({
						series_id: `local-${Date.now()}`,
						channel_id: $.value,
						title: Q.value.trim(),
						priority: On.value,
						keep_until: Dn.value
					});
					Y.value = [...Y.value, e], O.success("Series rule created."), Mn();
				} catch (e) {
					O.error(t(e, "Failed to create rule."));
				} finally {
					kn.value = !1;
				}
			}
		}
		return fe(() => A.tuners, (e) => {
			e && !Vt.value && Wt();
		}, { immediate: !0 }), fe(() => A.guide, (e) => {
			e && !Xt.value && $t(I.value);
		}), fe(() => A.recordings, (e) => {
			e && !on.value && dn();
		}), fe(() => A.seriesRules, (e) => {
			e && !Sn.value && (Cn(), Lt());
		}), le(() => {}), (e, t) => (y(), h("section", me, [
			t[71] ||= g("header", { class: "admin-livetv__head" }, [g("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			v(ee, {
				links: de(te).livetv.links,
				details: de(te).livetv.details
			}, {
				default: w(() => [...t[23] ||= [
					_(" Set up over-the-air or IPTV channels and record them. In ", -1),
					g("strong", null, "Tuners", -1),
					_(", ", -1),
					g("strong", null, "Scan for Tuners", -1),
					_(" finds devices on your network, which you can then enable or remove. The ", -1),
					g("strong", null, "Guide", -1),
					_(" shows what's on — pick a day and ", -1),
					g("strong", null, "Refresh Guide", -1),
					_(" to update listings. ", -1),
					g("strong", null, "Recordings", -1),
					_(" lists what's scheduled or captured (", -1),
					g("strong", null, "Schedule Recording", -1),
					_(" adds one manually), and ", -1),
					g("strong", null, "Series Rules", -1),
					_(" stores a per-show rule — see below before relying on it. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			g("section", he, [g("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": A.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: t[0] ||= (e) => It("tuners")
			}, [g("span", _e, [
				v(l, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				t[24] ||= g("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				v(l, {
					name: A.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), g("span", ve, S(Jt.value), 1)], 8, ge), A.tuners ? (y(), h("div", ye, [g("div", be, [v(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: Ht.value,
				onClick: Gt
			}, {
				default: w(() => [...t[25] ||= [_(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Bt.value ? (y(), h("div", xe, [v(s, {
				variant: "text",
				lines: 3
			})])) : N.value ? (y(), p(c, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load tuners",
				description: N.value
			}, {
				actions: w(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Wt
				}, {
					default: w(() => [...t[26] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (y(), p(c, {
				key: 2,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (y(), h("div", Se, [(y(!0), h(d, null, x(M.value, (e) => (y(), h("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				g("div", Ce, [g("span", we, [v(i, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: w(() => [_(S(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), g("span", Te, S(e.name), 1)]), v(i, { tone: e.enabled ? "success" : "neutral" }, {
					default: w(() => [_(S(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				g("dl", Ee, [
					t[30] ||= g("dt", null, "Host", -1),
					g("dd", null, S(e.host) + ":" + S(e.port), 1),
					e.device_id ? (y(), h(d, { key: 0 }, [t[27] ||= g("dt", null, "Device ID", -1), g("dd", null, S(e.device_id), 1)], 64)) : m("", !0),
					e.last_seen ? (y(), h(d, { key: 1 }, [t[28] ||= g("dt", null, "Last Seen", -1), g("dd", null, S(new Date(e.last_seen).toLocaleString()), 1)], 64)) : m("", !0),
					e.status ? (y(), h(d, { key: 2 }, [t[29] ||= g("dt", null, "Status", -1), g("dd", null, S(e.status), 1)], 64)) : m("", !0)
				]),
				g("div", De, [v(re, {
					"model-value": !!e.enabled,
					disabled: Ut[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => Kt(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), v(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => P.value = e
				}, {
					default: w(() => [...t[31] ||= [_(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : m("", !0)]),
			g("section", Oe, [g("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": A.guide,
				"aria-controls": "livetv-guide-body",
				onClick: t[1] ||= (e) => It("guide")
			}, [g("span", Ae, [
				v(l, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				t[32] ||= g("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				v(l, {
					name: A.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), g("span", je, S(rn.value), 1)], 8, ke), A.guide ? (y(), h("div", Me, [g("div", Ne, [g("div", Pe, [(y(), h(d, null, x(Qt, (e, t) => g("button", {
				key: e,
				type: "button",
				class: ce(["admin-livetv__seg-btn", { "is-active": I.value === t }]),
				"aria-pressed": I.value === t,
				onClick: (e) => en(t)
			}, S(e), 11, Fe)), 64))]), v(a, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: Zt.value,
				onClick: nn
			}, {
				default: w(() => [...t[33] ||= [_(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), Yt.value ? (y(), h("div", Ie, [v(s, {
				variant: "text",
				lines: 4
			})])) : R.value ? (y(), p(c, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load guide",
				description: R.value
			}, {
				actions: w(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[2] ||= (e) => $t(I.value)
				}, {
					default: w(() => [...t[34] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : F.value.length === 0 ? (y(), p(c, {
				key: 2,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (y(), h("div", Le, [(y(!0), h(d, null, x(F.value, (e) => (y(), h("div", {
				key: e.id,
				class: ce(["admin-livetv__program", { "is-selected": L.value === e.id }]),
				role: "button",
				tabindex: "0",
				"aria-pressed": L.value === e.id,
				"aria-label": `${e.title}, ${k(e.start_time)} to ${k(e.end_time)}`,
				onClick: (t) => tn(e),
				onKeydown: [pe(E((t) => tn(e), ["prevent"]), ["enter"]), pe(E((t) => tn(e), ["prevent"]), ["space"])]
			}, [
				g("div", ze, S(k(e.start_time)) + " – " + S(k(e.end_time)), 1),
				g("div", Be, S(e.title), 1),
				e.description && L.value !== e.id ? (y(), h("p", Ve, S(e.description.slice(0, 100)) + S(e.description.length > 100 ? "…" : ""), 1)) : m("", !0),
				L.value === e.id ? (y(), h("div", He, [e.description ? (y(), h("p", Ue, S(e.description), 1)) : m("", !0), g("div", We, [
					e.rating ? (y(), p(i, {
						key: 0,
						tone: "neutral"
					}, {
						default: w(() => [_("Rating: " + S(e.rating), 1)]),
						_: 2
					}, 1024)) : m("", !0),
					e.season ? (y(), p(i, {
						key: 1,
						tone: "info"
					}, {
						default: w(() => [_(S(Ft(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : m("", !0),
					e.year ? (y(), p(i, {
						key: 2,
						tone: "neutral"
					}, {
						default: w(() => [_(S(e.year), 1)]),
						_: 2
					}, 1024)) : m("", !0)
				])])) : m("", !0)
			], 42, Re))), 128))]))])) : m("", !0)]),
			g("section", Ge, [g("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": A.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: t[3] ||= (e) => It("recordings")
			}, [g("span", qe, [
				v(l, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				t[35] ||= g("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				v(l, {
					name: A.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), g("span", Je, S(mn.value), 1)], 8, Ke), A.recordings ? (y(), h("div", Ye, [g("div", Xe, [g("div", {
				ref_key: "recTablistEl",
				ref: cn,
				class: "admin-livetv__segmented",
				role: "tablist",
				"aria-label": "Recording filter",
				onKeydown: un
			}, [(y(), h(d, null, x(sn, (e) => g("button", {
				id: `rec-tab-${e.value}`,
				key: e.value,
				type: "button",
				role: "tab",
				class: ce(["admin-livetv__seg-btn", { "is-active": B.value === e.value }]),
				"aria-selected": B.value === e.value,
				"aria-controls": `rec-panel-${e.value}`,
				tabindex: B.value === e.value ? 0 : -1,
				onClick: (t) => B.value = e.value
			}, S(e.label), 11, Ze)), 64))], 544), v(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: vn
			}, {
				default: w(() => [...t[36] ||= [_(" Schedule Recording ", -1)]]),
				_: 1
			})]), g("div", {
				id: `rec-panel-${B.value}`,
				role: "tabpanel",
				"aria-labelledby": `rec-tab-${B.value}`
			}, [an.value ? (y(), h("div", $e, [v(s, {
				variant: "text",
				lines: 3
			})])) : V.value ? (y(), p(c, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load recordings",
				description: V.value
			}, {
				actions: w(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: dn
				}, {
					default: w(() => [...t[37] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : z.value.length === 0 ? (y(), p(c, {
				key: 2,
				icon: "film",
				title: "No recordings",
				description: hn.value
			}, null, 8, ["description"])) : (y(), h("div", et, [(y(!0), h(d, null, x(z.value, (e) => (y(), h("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				g("div", tt, [g("span", nt, S(e.program_title ?? "Untitled"), 1), e.status ? (y(), p(i, {
					key: 0,
					tone: pn(e.status)
				}, {
					default: w(() => [_(S(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : m("", !0)]),
				g("div", rt, [
					g("span", null, S(e.channel_name ?? e.channel_id), 1),
					g("span", null, S(Nt(e.start_time)) + " · " + S(k(e.start_time)) + " – " + S(k(e.end_time)), 1),
					g("span", null, S(Mt(e.start_time, e.end_time)), 1),
					e.size ? (y(), h("span", it, S(Pt(e.size)), 1)) : m("", !0)
				]),
				g("div", at, [v(a, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => H.value = e
				}, {
					default: w(() => [...t[38] ||= [_(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))], 8, Qe)])) : m("", !0)]),
			g("section", ot, [g("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": A.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: t[4] ||= (e) => It("seriesRules")
			}, [g("span", ct, [
				v(l, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				t[39] ||= g("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				v(l, {
					name: A.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), g("span", lt, S(Tn.value), 1)], 8, st), A.seriesRules ? (y(), h("div", ut, [g("div", dt, [v(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: jn
			}, {
				default: w(() => [...t[40] ||= [_("Add Rule", -1)]]),
				_: 1
			})]), xn.value ? (y(), h("div", ft, [v(s, {
				variant: "text",
				lines: 3
			})])) : X.value ? (y(), p(c, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load series rules",
				description: X.value
			}, {
				actions: w(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Cn
				}, {
					default: w(() => [...t[41] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Y.value.length === 0 ? (y(), p(c, {
				key: 2,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (y(), h("div", pt, [(y(!0), h(d, null, x(Y.value, (e) => (y(), h("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [g("div", mt, [g("span", ht, S(e.title_pattern), 1), g("div", gt, [
				g("span", null, S(zt(e)), 1),
				e.priority ? (y(), p(i, {
					key: 0,
					tone: "info"
				}, {
					default: w(() => [_("Priority " + S(e.priority), 1)]),
					_: 2
				}, 1024)) : m("", !0),
				e.keep_until ? (y(), p(i, {
					key: 1,
					tone: "neutral"
				}, {
					default: w(() => [_("Keep: " + S(e.keep_until), 1)]),
					_: 2
				}, 1024)) : m("", !0)
			])]), v(a, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => Z.value = e
			}, {
				default: w(() => [...t[42] ||= [_(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : m("", !0)]),
			v(o, {
				modelValue: gn.value,
				"onUpdate:modelValue": t[11] ||= (e) => gn.value = e,
				title: "Schedule Recording",
				onClose: yn
			}, {
				footer: w(() => [v(a, {
					variant: "ghost",
					size: "sm",
					onClick: yn
				}, {
					default: w(() => [...t[49] ||= [_("Cancel", -1)]]),
					_: 1
				}), v(a, {
					variant: "solid",
					size: "sm",
					loading: _n.value,
					onClick: bn
				}, {
					default: w(() => [...t[50] ||= [_(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [g("form", {
					class: "admin-livetv__form",
					onSubmit: E(bn, ["prevent"])
				}, [
					g("label", _t, [t[43] ||= g("span", { class: "admin-livetv__label" }, "Title", -1), T(g("input", {
						"onUpdate:modelValue": t[5] ||= (e) => W.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[C, W.value]])]),
					g("label", vt, [t[44] ||= g("span", { class: "admin-livetv__label" }, "Channel", -1), v(ne, {
						modelValue: U.value,
						"onUpdate:modelValue": t[6] ||= (e) => U.value = e,
						options: Rt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					g("div", yt, [g("label", bt, [t[45] ||= g("span", { class: "admin-livetv__label" }, "Start Date", -1), T(g("input", {
						"onUpdate:modelValue": t[7] ||= (e) => G.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[C, G.value]])]), g("label", xt, [t[46] ||= g("span", { class: "admin-livetv__label" }, "Start Time", -1), T(g("input", {
						"onUpdate:modelValue": t[8] ||= (e) => K.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[C, K.value]])])]),
					g("div", St, [g("label", Ct, [t[47] ||= g("span", { class: "admin-livetv__label" }, "End Date", -1), T(g("input", {
						"onUpdate:modelValue": t[9] ||= (e) => q.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[C, q.value]])]), g("label", wt, [t[48] ||= g("span", { class: "admin-livetv__label" }, "End Time", -1), T(g("input", {
						"onUpdate:modelValue": t[10] ||= (e) => J.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[C, J.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			v(o, {
				modelValue: En.value,
				"onUpdate:modelValue": t[16] ||= (e) => En.value = e,
				title: "Add Series Rule",
				onClose: Mn
			}, {
				footer: w(() => [v(a, {
					variant: "ghost",
					size: "sm",
					onClick: Mn
				}, {
					default: w(() => [...t[57] ||= [_("Cancel", -1)]]),
					_: 1
				}), v(a, {
					variant: "solid",
					size: "sm",
					loading: kn.value,
					onClick: Nn
				}, {
					default: w(() => [...t[58] ||= [_("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [g("form", {
					class: "admin-livetv__form",
					onSubmit: E(Nn, ["prevent"])
				}, [
					g("label", Tt, [
						t[51] ||= g("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						T(g("input", {
							"onUpdate:modelValue": t[12] ||= (e) => Q.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[C, Q.value]]),
						t[52] ||= g("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					g("label", Et, [t[53] ||= g("span", { class: "admin-livetv__label" }, "Channel", -1), v(ne, {
						modelValue: $.value,
						"onUpdate:modelValue": t[13] ||= (e) => $.value = e,
						options: Rt.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					g("label", Dt, [
						t[54] ||= g("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						g("input", {
							value: On.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: t[14] ||= (e) => On.value = Number(e.target.value)
						}, null, 40, Ot),
						t[55] ||= g("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					g("label", kt, [t[56] ||= g("span", { class: "admin-livetv__label" }, "Keep Until", -1), v(ne, {
						modelValue: Dn.value,
						"onUpdate:modelValue": t[15] ||= (e) => Dn.value = e,
						options: An,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			v(o, {
				"model-value": P.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": t[18] ||= (e) => P.value = null
			}, {
				footer: w(() => [v(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[17] ||= (e) => P.value = null
				}, {
					default: w(() => [...t[61] ||= [_("Cancel", -1)]]),
					_: 1
				}), v(a, {
					variant: "danger",
					size: "sm",
					onClick: qt
				}, {
					default: w(() => [...t[62] ||= [_("Remove", -1)]]),
					_: 1
				})]),
				default: w(() => [g("p", null, [
					t[59] ||= _("Remove tuner ", -1),
					g("strong", null, S(P.value?.name), 1),
					t[60] ||= _("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			v(o, {
				"model-value": H.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": t[20] ||= (e) => H.value = null
			}, {
				footer: w(() => [v(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[19] ||= (e) => H.value = null
				}, {
					default: w(() => [...t[65] ||= [_("Cancel", -1)]]),
					_: 1
				}), v(a, {
					variant: "danger",
					size: "sm",
					onClick: fn
				}, {
					default: w(() => [...t[66] ||= [_("Delete", -1)]]),
					_: 1
				})]),
				default: w(() => [g("p", null, [
					t[63] ||= _(" Delete recording ", -1),
					g("strong", null, S(H.value?.program_title ?? H.value?.id), 1),
					t[64] ||= _("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			v(o, {
				"model-value": Z.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": t[22] ||= (e) => Z.value = null
			}, {
				footer: w(() => [v(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[21] ||= (e) => Z.value = null
				}, {
					default: w(() => [...t[69] ||= [_("Cancel", -1)]]),
					_: 1
				}), v(a, {
					variant: "danger",
					size: "sm",
					onClick: wn
				}, {
					default: w(() => [...t[70] ||= [_("Delete", -1)]]),
					_: 1
				})]),
				default: w(() => [g("p", null, [
					t[67] ||= _("Delete series rule ", -1),
					g("strong", null, S(Z.value?.title_pattern), 1),
					t[68] ||= _("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-207939eb"]]);
export { At as default };

//# sourceMappingURL=LiveTvPage-CQbWkYoe.js.map