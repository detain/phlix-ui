import { t as e, x as t } from "./client-57OweUrJ.js";
import { n, t as r } from "./logs-lkpzj6Hn.js";
import { t as i } from "./useToastStore-Bu-iYU7r.js";
import { t as a } from "./Select-ChFXd0gU.js";
import { t as o } from "./PageHint-BlhPmafC.js";
import { t as s } from "./helpLinks-iarZuNmw.js";
import { t as c } from "./Switch-C1Wv5sN2.js";
import { t as l } from "./Button-1sKEdGjj.js";
import { t as u } from "./Skeleton-B2Mt2L00.js";
import { t as d } from "./EmptyState-BjOJ1k_A.js";
import { n as f } from "./Icon-CIbfiPrs.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as ee, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as te, nextTick as ne, onBeforeUnmount as x, onMounted as re, openBlock as S, ref as C, renderList as ie, toDisplayString as w, unref as T, watch as E, withCtx as D } from "vue";
// src/pages/admin/LogsPage.vue?vue&type=script&setup=true&lang.ts
var ae = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, oe = { class: "admin-logs__controls" }, se = { class: "admin-logs__field" }, ce = { class: "admin-logs__field" }, le = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, ue = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, de = ["innerHTML"], O = 5e3, k = /*#__PURE__*/ f(/* @__PURE__ */ b({
	__name: "LogsPage",
	props: { client: {} },
	setup(f) {
		let b = [
			200,
			500,
			1e3,
			2e3
		], k = {
			debug: "debug",
			info: "info",
			notice: "info",
			warning: "warning",
			error: "error",
			critical: "critical",
			alert: "critical",
			emergency: "critical"
		}, A = [
			["critical", /\b(critical|crit|alert|emerg)\b/i],
			["error", /\b(error|err)\b/i],
			["warning", /\b(warning|warn)\b/i],
			["notice", /\bnotice\b/i],
			["info", /\binfo\b/i],
			["debug", /\bdebug\b/i]
		];
		function j(e) {
			return e.replace(/[.-]\d{4}-\d{2}-\d{2}\.log$/, "");
		}
		function fe(e) {
			let t = e.slice(0, 100);
			for (let [e, n] of A) if (n.test(t)) return e;
			return null;
		}
		function pe(e) {
			return e.replace(/\s+\[\]$/, "");
		}
		function me(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/("([^"]+)":\s*)("(?:[^"\\]|\\.)*"|\d+\.?\d*|true|false|null)/g, (e, t, n, r) => {
				let i = `<span class="json-key">${t}</span>`, a = r;
				return r.startsWith("\"") ? a = `<span class="json-string">${r}</span>` : r === "true" || r === "false" ? a = `<span class="json-boolean">${r}</span>` : r === "null" ? a = `<span class="json-null">${r}</span>` : isNaN(Number(r)) || (a = `<span class="json-number">${r}</span>`), i + a;
			});
		}
		function M(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		function he(e) {
			return `<span class="log-badge log-badge--${k[e] ?? "debug"}">${M(e.toUpperCase())}</span>`;
		}
		function ge(e) {
			return `<span class="log-badge log-badge--channel">${M(e)}</span>`;
		}
		function _e(e, t, n = /* @__PURE__ */ new Date()) {
			if (isNaN(e.getTime())) return t;
			let r = t.match(/T\d{2}:\d{2}:\d{2}\.(\d+)/), i = r ? `.${r[1]}` : "", a = e.getHours() >= 12 ? "PM" : "AM", o = `${e.getHours() % 12 || 12}:${String(e.getMinutes()).padStart(2, "0")}:${String(e.getSeconds()).padStart(2, "0")}${i}${a}`;
			return e.getFullYear() === n.getFullYear() && e.getMonth() === n.getMonth() && e.getDate() === n.getDate() ? o : `${`${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`} ${o}`;
		}
		let ve = /^\[(?:DEBUG|INFO|WARNING|ERROR|CRITICAL|NOTICE|ALERT|EMERGENCY)\]\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:\.\d+)?\s+/i;
		function ye(e, t = "", n = !1) {
			let r = e, i = pe(e), a = t;
			if (n) {
				let e = i.match(/^(\S+\.log)\s+/i);
				e && (a = j(e[1]), i = i.slice(e[0].length));
			}
			let o = NaN, s = "", c = i.match(/^\[([^\]]+)\]\s*/);
			if (c) {
				let e = c[1], t = new Date(e);
				isNaN(t.getTime()) ? s = e : (o = t.getTime(), s = _e(t, e)), i = i.slice(c[0].length);
			}
			let l = "", u = null, d = i.match(/^([^.\s]+)\.(DEBUG|INFO|NOTICE|WARNING|ERROR|CRITICAL|ALERT|EMERGENCY):\s*/i);
			return d && (l = d[1], u = d[2].toLowerCase(), i = i.slice(d[0].length)), i = i.replace(ve, ""), u === null && l === "" && (u = fe(i)), {
				raw: r,
				timestamp: o,
				localTime: s,
				source: a,
				channel: l,
				level: u,
				message: i.trim()
			};
		}
		function N(e, t) {
			let n = t ?? e.source;
			return `${n ? `${M(n)} ` : ""}${e.localTime ? `${M(e.localTime)} ` : ""}${e.channel ? `${ge(e.channel)} ` : ""}${e.level ? `${he(e.level)}: ` : ""}${e.message ? me(e.message) : ""}`;
		}
		let be = f, P = te("apiBase", ""), xe = m(() => typeof P == "string" ? P : P?.value ?? ""), F = new n(be.client ?? new e({ baseUrl: xe.value })), I = i(), L = C([]), R = C(""), z = C(200), B = C([]), V = C(!1), H = C(!1), U = C(!0), W = C(null), G = C(null), K = C(null), q = null, Se = m(() => L.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: r,
			label: "All logs (combined)"
		}, ...L.value.map((e) => ({
			value: e.name,
			label: j(e.name)
		}))]), J = m(() => {
			let e = R.value === r, t = R.value && R.value !== "__all__" ? j(R.value) : "", n = B.value.map((n) => ye(n, t, e)), i = [], a = 0;
			for (; a < n.length;) {
				let e = n[a];
				if (Number.isNaN(e.timestamp) && e.source === "") {
					i.push({
						level: e.level,
						content: N(e)
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
					content: N(e)
				});
				else {
					let n = [...new Set(t.map((e) => e.source))].sort().join(", ");
					i.push({
						level: e.level,
						content: N(e, n)
					});
				}
				a = s;
			}
			return i;
		}), Ce = m(() => b.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function Y() {
			U.value = !0, W.value = null;
			try {
				let e = await F.list();
				L.value = e, e.length > 0 && R.value === "" && (R.value = r);
			} catch (e) {
				W.value = t(e, "Failed to list logs."), I.error(W.value);
			} finally {
				U.value = !1;
			}
		}
		async function X() {
			let e = R.value;
			if (e !== "") {
				H.value = !0, G.value = null;
				try {
					let t = e === "__all__" ? await F.tailAll(z.value) : await F.tail(e, z.value);
					B.value = t.lines, V.value = t.truncated, ne(() => {
						K.value && (K.value.scrollTop = K.value.scrollHeight);
					});
				} catch (e) {
					G.value = t(e, "Failed to read log."), I.error(G.value);
				} finally {
					H.value = !1;
				}
			}
		}
		function Z() {
			q !== null && (clearInterval(q), q = null);
		}
		function we() {
			Z(), $.value && R.value !== "" && (q = setInterval(() => void X(), O));
		}
		function Q() {
			document.hidden ? Z() : $.value && R.value !== "" && (q = setInterval(() => void X(), O));
		}
		let $ = C(!1);
		return E([R, z], () => void X()), E([
			$,
			R,
			z
		], we), re(() => {
			Y(), typeof document < "u" && document.addEventListener("visibilitychange", Q);
		}), x(() => {
			Z(), typeof document < "u" && document.removeEventListener("visibilitychange", Q);
		}), (e, t) => (S(), g("section", ae, [
			t[10] ||= _("header", { class: "admin-logs__head" }, [_("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			y(o, {
				links: T(s).logs.links,
				details: T(s).logs.details
			}, {
				default: D(() => [...t[3] ||= [
					v(" Read the server's log files to troubleshoot problems. Pick a file with the ", -1),
					_("strong", null, "File", -1),
					v(" menu (or ", -1),
					_("strong", null, "All logs", -1),
					v(" to merge them), set how many recent lines to show with ", -1),
					_("strong", null, "Lines", -1),
					v(", and press ", -1),
					_("strong", null, "Refresh", -1),
					v(" to reload. Turn on ", -1),
					_("strong", null, "Auto-refresh", -1),
					v(" to keep the newest entries streaming in every few seconds. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			_("div", oe, [
				_("label", se, [t[4] ||= _("span", { class: "admin-logs__label" }, "File", -1), y(a, {
					modelValue: R.value,
					"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
					options: Se.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				_("label", ce, [t[5] ||= _("span", { class: "admin-logs__label" }, "Lines", -1), y(a, {
					"model-value": z.value,
					options: Ce.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => z.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				y(l, {
					variant: "outline",
					size: "sm",
					loading: H.value,
					disabled: R.value === "",
					onClick: X
				}, {
					default: D(() => [...t[6] ||= [v(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				y(c, {
					modelValue: $.value,
					"onUpdate:modelValue": t[2] ||= (e) => $.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			V.value ? (S(), g("p", le, " Showing the most recent " + w(z.value) + " lines (" + w(R.value === T("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : ee("", !0),
			(U.value || H.value) && B.value.length === 0 ? (S(), g("div", ue, [y(u, {
				variant: "text",
				lines: 8
			})])) : W.value ? (S(), h(d, {
				key: 2,
				icon: "alert",
				title: "Couldn’t load log files",
				description: W.value
			}, {
				actions: D(() => [y(l, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Y
				}, {
					default: D(() => [...t[7] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : G.value ? (S(), h(d, {
				key: 3,
				icon: "alert",
				title: "Couldn’t read log",
				description: G.value
			}, {
				actions: D(() => [y(l, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: X
				}, {
					default: D(() => [...t[8] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (S(), g("pre", {
				key: 4,
				ref_key: "preEl",
				ref: K,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, [J.value.length === 0 ? (S(), g(p, { key: 0 }, [v("(no output)")], 64)) : (S(!0), g(p, { key: 1 }, ie(J.value, (e, n) => (S(), g(p, { key: n }, [_("span", { innerHTML: e.content }, null, 8, de), t[9] ||= v("\n", -1)], 64))), 128))], 512))
		]));
	}
}), [["__scopeId", "data-v-873be178"]]);
export { k as default };

//# sourceMappingURL=LogsPage-Re090FoT.js.map