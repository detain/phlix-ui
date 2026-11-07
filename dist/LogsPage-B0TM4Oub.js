import { t as e, x as t } from "./client-BLNUsFSj.js";
import { n, t as r } from "./logs-COEMLOJe.js";
import { t as i } from "./useToastStore-CxO_ppM8.js";
import { r as a } from "./plural-B3O2rVPV.js";
import { t as o } from "./Select-r5PX08M4.js";
import { t as s } from "./PageHint-C2jY1TZi.js";
import { t as c } from "./helpLinks-3xhEuW25.js";
import { t as l } from "./Switch-C607L4Vu.js";
import { t as u } from "./Button-Dfl4y6vO.js";
import { t as d } from "./Skeleton-DDhrDRE7.js";
import { t as f } from "./EmptyState-DjfWh3kt.js";
import { n as p } from "./Icon-55iG1rR7.js";
import { Fragment as m, computed as h, createBlock as ee, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as te, nextTick as ne, onBeforeUnmount as re, onMounted as ie, openBlock as S, ref as C, renderList as ae, toDisplayString as w, unref as T, watch as oe, withCtx as E } from "vue";
// src/pages/admin/LogsPage.vue?vue&type=script&setup=true&lang.ts
var se = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, ce = { class: "admin-logs__controls" }, le = { class: "admin-logs__field" }, ue = { class: "admin-logs__field" }, de = {
	key: 0,
	class: "admin-logs__poll-error",
	role: "status"
}, fe = {
	key: 1,
	class: "admin-logs__update",
	role: "status",
	"data-testid": "logs-update-note"
}, pe = {
	key: 2,
	class: "admin-logs__truncated",
	role: "note"
}, me = {
	key: 3,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, he = ["innerHTML"], D = 5e3, ge = /*#__PURE__*/ p(/* @__PURE__ */ x({
	__name: "LogsPage",
	props: { client: {} },
	setup(p) {
		let x = [
			200,
			500,
			1e3,
			2e3
		], ge = {
			debug: "debug",
			info: "info",
			notice: "info",
			warning: "warning",
			error: "error",
			critical: "critical",
			alert: "critical",
			emergency: "critical"
		}, _e = [
			["critical", /\b(critical|crit|alert|emerg)\b/i],
			["error", /\b(error|err)\b/i],
			["warning", /\b(warning|warn)\b/i],
			["notice", /\bnotice\b/i],
			["info", /\binfo\b/i],
			["debug", /\bdebug\b/i]
		];
		function O(e) {
			return e.replace(/[.-]\d{4}-\d{2}-\d{2}\.log$/, "");
		}
		function ve(e) {
			let t = e.slice(0, 100);
			for (let [e, n] of _e) if (n.test(t)) return e;
			return null;
		}
		function ye(e) {
			return e.replace(/\s+\[\]$/, "");
		}
		function be(e) {
			let t = /("([^"]+)":\s*)("(?:[^"\\]|\\.)*"|\d+\.?\d*|true|false|null)/g, n = "", r = 0, i;
			for (; (i = t.exec(e)) !== null;) {
				n += k(e.slice(r, i.index));
				let t;
				t = i[3].startsWith("\"") ? `<span class="json-string">${k(i[3])}</span>` : i[3] === "true" || i[3] === "false" ? `<span class="json-boolean">${k(i[3])}</span>` : i[3] === "null" ? `<span class="json-null">${k(i[3])}</span>` : `<span class="json-number">${k(i[3])}</span>`, n += `<span class="json-key">${k(i[1])}</span>` + t, r = i.index + i[0].length;
			}
			return n += k(e.slice(r)), n;
		}
		function k(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
		}
		function xe(e) {
			return `<span class="log-badge log-badge--${ge[e] ?? "debug"}">${k(e.toUpperCase())}</span>`;
		}
		function Se(e) {
			return `<span class="log-badge log-badge--channel">${k(e)}</span>`;
		}
		function Ce(e, t, n = /* @__PURE__ */ new Date()) {
			if (isNaN(e.getTime())) return t;
			let r = t.match(/T\d{2}:\d{2}:\d{2}\.(\d+)/), i = r ? `.${r[1]}` : "", a = e.getHours() >= 12 ? "PM" : "AM", o = `${e.getHours() % 12 || 12}:${String(e.getMinutes()).padStart(2, "0")}:${String(e.getSeconds()).padStart(2, "0")}${i}${a}`;
			return e.getFullYear() === n.getFullYear() && e.getMonth() === n.getMonth() && e.getDate() === n.getDate() ? o : `${`${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`} ${o}`;
		}
		let we = /^\[(?:DEBUG|INFO|WARNING|ERROR|CRITICAL|NOTICE|ALERT|EMERGENCY)\]\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:\.\d+)?\s+/i;
		function Te(e, t = "", n = !1) {
			let r = e, i = ye(e), a = t;
			if (n) {
				let e = i.match(/^(\S+\.log)\s+/i);
				e && (a = O(e[1]), i = i.slice(e[0].length));
			}
			let o = NaN, s = "", c = i.match(/^\[([^\]]+)\]\s*/);
			if (c) {
				let e = c[1], t = new Date(e);
				isNaN(t.getTime()) ? s = e : (o = t.getTime(), s = Ce(t, e)), i = i.slice(c[0].length);
			}
			let l = "", u = null, d = i.match(/^([^.\s]+)\.(DEBUG|INFO|NOTICE|WARNING|ERROR|CRITICAL|ALERT|EMERGENCY):\s*/i);
			return d && (l = d[1], u = d[2].toLowerCase(), i = i.slice(d[0].length)), i = i.replace(we, ""), u === null && l === "" && (u = ve(i)), {
				raw: r,
				timestamp: o,
				localTime: s,
				source: a,
				channel: l,
				level: u,
				message: i.trim()
			};
		}
		function A(e, t) {
			let n = t ?? e.source;
			return `${n ? `${k(n)} ` : ""}${e.localTime ? `${k(e.localTime)} ` : ""}${e.channel ? `${Se(e.channel)} ` : ""}${e.level ? `${xe(e.level)}: ` : ""}${e.message ? be(e.message) : ""}`;
		}
		let Ee = p, j = te("apiBase", ""), De = h(() => typeof j == "string" ? j : j?.value ?? ""), M = new n(Ee.client ?? new e({ baseUrl: De.value })), N = i(), P = C([]), F = C(""), I = C(200), L = C([]), R = C(!1), z = C(!1), B = C(!0), V = C(null), H = C(null), U = C(null), W = null, Oe = h(() => P.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: r,
			label: "All logs (combined)"
		}, ...P.value.map((e) => ({
			value: e.name,
			label: O(e.name)
		}))]), G = h(() => {
			let e = F.value === r, t = F.value && F.value !== "__all__" ? O(F.value) : "", n = L.value.map((n) => Te(n, t, e)), i = [], a = 0;
			for (; a < n.length;) {
				let e = n[a];
				if (Number.isNaN(e.timestamp) && e.source === "") {
					i.push({
						level: e.level,
						content: A(e)
					}), a++;
					continue;
				}
				let t = [e], r = /* @__PURE__ */ new Set([e.source]), o = e.timestamp, s = a + 1;
				for (; s < n.length;) {
					let i = n[s];
					if (Math.abs(i.timestamp - o) <= 1e3 && i.message === e.message && !r.has(i.source)) t.push(i), r.add(i.source), o = i.timestamp, s++;
					else break;
				}
				if (t.length === 1) i.push({
					level: e.level,
					content: A(e)
				});
				else {
					let n = [...new Set(t.map((e) => e.source))].sort().join(", ");
					i.push({
						level: e.level,
						content: A(e, n)
					});
				}
				a = s;
			}
			return i;
		}), ke = h(() => x.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function K() {
			B.value = !0, V.value = null;
			try {
				let e = await M.list();
				P.value = e, e.length > 0 && F.value === "" && (F.value = r);
			} catch (e) {
				V.value = t(e, "Failed to list logs."), N.error(V.value);
			} finally {
				B.value = !1;
			}
		}
		let q = C(null), J = 0, Y = C("");
		async function X(e = !1) {
			let n = F.value;
			if (n !== "") {
				z.value = !0;
				try {
					let e = n === "__all__" ? await M.tailAll(I.value) : await M.tail(n, I.value), t = new Set(L.value), r = 0;
					for (let n of e.lines) t.has(n) || r++;
					L.value = e.lines, R.value = e.truncated, H.value = null, q.value = null, J = 0, Y.value = r > 0 && t.size > 0 ? `${r} new ${a(r, {
						one: "line",
						other: "lines"
					})}` : "", ne(() => {
						U.value && (U.value.scrollTop = U.value.scrollHeight);
					});
				} catch (n) {
					let r = t(n, "Failed to read log.");
					L.value.length === 0 && (H.value = r), q.value = (/* @__PURE__ */ new Date()).toLocaleTimeString(), (e || J === 0) && N.error(r), J++;
				} finally {
					z.value = !1;
				}
			}
		}
		function Z() {
			W !== null && (clearInterval(W), W = null);
		}
		function Ae() {
			Z(), $.value && F.value !== "" && (W = setInterval(() => void X(), D));
		}
		function Q() {
			document.hidden ? Z() : $.value && F.value !== "" && (W = setInterval(() => void X(), D));
		}
		let $ = C(!1);
		return oe([F, I], () => void X()), oe([
			$,
			F,
			I
		], Ae), ie(() => {
			K(), typeof document < "u" && document.addEventListener("visibilitychange", Q);
		}), re(() => {
			Z(), typeof document < "u" && document.removeEventListener("visibilitychange", Q);
		}), (e, t) => (S(), _("section", se, [
			t[12] ||= v("header", { class: "admin-logs__head" }, [v("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			b(s, {
				links: T(c).logs.links,
				details: T(c).logs.details
			}, {
				default: E(() => [...t[5] ||= [
					y(" Read the server's log files to troubleshoot problems. Pick a file with the ", -1),
					v("strong", null, "File", -1),
					y(" menu (or ", -1),
					v("strong", null, "All logs", -1),
					y(" to merge them), set how many recent lines to show with ", -1),
					v("strong", null, "Lines", -1),
					y(", and press ", -1),
					v("strong", null, "Refresh", -1),
					y(" to reload. Turn on ", -1),
					v("strong", null, "Auto-refresh", -1),
					y(" to keep the newest entries streaming in every few seconds. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			v("div", ce, [
				v("label", le, [t[6] ||= v("span", { class: "admin-logs__label" }, "File", -1), b(o, {
					modelValue: F.value,
					"onUpdate:modelValue": t[0] ||= (e) => F.value = e,
					options: Oe.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				v("label", ue, [t[7] ||= v("span", { class: "admin-logs__label" }, "Lines", -1), b(o, {
					"model-value": I.value,
					options: ke.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => I.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				b(u, {
					variant: "outline",
					size: "sm",
					loading: z.value,
					disabled: F.value === "",
					onClick: t[2] ||= () => void X(!0)
				}, {
					default: E(() => [...t[8] ||= [y(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				b(l, {
					modelValue: $.value,
					"onUpdate:modelValue": t[3] ||= (e) => $.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			q.value ? (S(), _("p", de, " Last update failed at " + w(q.value) + " — showing the most recent successful read. ", 1)) : g("", !0),
			Y.value ? (S(), _("p", fe, w(Y.value), 1)) : g("", !0),
			R.value ? (S(), _("p", pe, " Showing the most recent " + w(I.value) + " lines (" + w(F.value === T("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : g("", !0),
			(B.value || z.value) && L.value.length === 0 ? (S(), _("div", me, [b(d, {
				variant: "text",
				lines: 8
			})])) : V.value ? (S(), ee(f, {
				key: 4,
				icon: "alert",
				title: "Couldn’t load log files",
				description: V.value
			}, {
				actions: E(() => [b(u, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: E(() => [...t[9] ||= [y("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : H.value ? (S(), ee(f, {
				key: 5,
				icon: "alert",
				title: "Couldn’t read log",
				description: H.value
			}, {
				actions: E(() => [b(u, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[4] ||= () => void X(!0)
				}, {
					default: E(() => [...t[10] ||= [y("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (S(), _("pre", {
				key: 6,
				ref_key: "preEl",
				ref: U,
				class: "admin-logs__output",
				"data-testid": "logs-output"
			}, [G.value.length === 0 ? (S(), _(m, { key: 0 }, [y("(no output)")], 64)) : (S(!0), _(m, { key: 1 }, ae(G.value, (e, n) => (S(), _(m, { key: n }, [v("span", { innerHTML: e.content }, null, 8, he), t[11] ||= y("\n", -1)], 64))), 128))], 512))
		]));
	}
}), [["__scopeId", "data-v-29dab470"]]);
export { ge as default };

//# sourceMappingURL=LogsPage-B0TM4Oub.js.map