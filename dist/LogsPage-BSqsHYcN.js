import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D80As4Gx.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-AW4z0vv0.js";
import { t as o } from "./Switch-DyS2L5gX.js";
import { t as s } from "./Select-z1uAMOUb.js";
import { t as c } from "./Skeleton-DhQmxeNg.js";
import { t as l } from "./EmptyState-CLDEIm6E.js";
import { t as u } from "./PageHint-0P_Y-_RL.js";
import { n as d, t as f } from "./logs-DadTfaTq.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as ee, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as te, nextTick as ne, onBeforeUnmount as x, onMounted as re, openBlock as S, ref as C, renderList as ie, toDisplayString as w, unref as ae, watch as T, withCtx as E } from "vue";
//#region src/pages/admin/LogsPage.vue?vue&type=script&setup=true&lang.ts
var oe = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, se = { class: "admin-logs__controls" }, ce = { class: "admin-logs__field" }, le = { class: "admin-logs__field" }, ue = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, de = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, fe = ["innerHTML"], D = 5e3, O = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "LogsPage",
	props: { client: {} },
	setup(e) {
		let b = [
			200,
			500,
			1e3,
			2e3
		], O = {
			debug: "debug",
			info: "info",
			notice: "info",
			warning: "warning",
			error: "error",
			critical: "critical",
			alert: "critical",
			emergency: "critical"
		}, k = [
			["critical", /\b(critical|crit|alert|emerg)\b/i],
			["error", /\b(error|err)\b/i],
			["warning", /\b(warning|warn)\b/i],
			["notice", /\bnotice\b/i],
			["info", /\binfo\b/i],
			["debug", /\bdebug\b/i]
		];
		function A(e) {
			return e.replace(/[.-]\d{4}-\d{2}-\d{2}\.log$/, "");
		}
		function pe(e) {
			let t = e.slice(0, 100);
			for (let [e, n] of k) if (n.test(t)) return e;
			return null;
		}
		function me(e) {
			return e.replace(/\s+\[\]$/, "");
		}
		function he(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/("([^"]+)":\s*)("(?:[^"\\]|\\.)*"|\d+\.?\d*|true|false|null)/g, (e, t, n, r) => {
				let i = `<span class="json-key">${t}</span>`, a = r;
				return r.startsWith("\"") ? a = `<span class="json-string">${r}</span>` : r === "true" || r === "false" ? a = `<span class="json-boolean">${r}</span>` : r === "null" ? a = `<span class="json-null">${r}</span>` : isNaN(Number(r)) || (a = `<span class="json-number">${r}</span>`), i + a;
			});
		}
		function j(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		function ge(e) {
			return `<span class="log-badge log-badge--${O[e] ?? "debug"}">${j(e.toUpperCase())}</span>`;
		}
		function _e(e) {
			return `<span class="log-badge log-badge--channel">${j(e)}</span>`;
		}
		function ve(e, t, n = /* @__PURE__ */ new Date()) {
			if (isNaN(e.getTime())) return t;
			let r = t.match(/T\d{2}:\d{2}:\d{2}\.(\d+)/), i = r ? `.${r[1]}` : "", a = e.getHours() >= 12 ? "PM" : "AM", o = `${e.getHours() % 12 || 12}:${String(e.getMinutes()).padStart(2, "0")}:${String(e.getSeconds()).padStart(2, "0")}${i}${a}`;
			return e.getFullYear() === n.getFullYear() && e.getMonth() === n.getMonth() && e.getDate() === n.getDate() ? o : `${`${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`} ${o}`;
		}
		let ye = /^\[(?:DEBUG|INFO|WARNING|ERROR|CRITICAL|NOTICE|ALERT|EMERGENCY)\]\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:\.\d+)?\s+/i;
		function M(e, t = "", n = !1) {
			let r = e, i = me(e), a = t;
			if (n) {
				let e = i.match(/^(\S+\.log)\s+/i);
				e && (a = A(e[1]), i = i.slice(e[0].length));
			}
			let o = NaN, s = "", c = i.match(/^\[([^\]]+)\]\s*/);
			if (c) {
				let e = c[1], t = new Date(e);
				isNaN(t.getTime()) ? s = e : (o = t.getTime(), s = ve(t, e)), i = i.slice(c[0].length);
			}
			let l = "", u = null, d = i.match(/^([^.\s]+)\.(DEBUG|INFO|NOTICE|WARNING|ERROR|CRITICAL|ALERT|EMERGENCY):\s*/i);
			return d && (l = d[1], u = d[2].toLowerCase(), i = i.slice(d[0].length)), i = i.replace(ye, ""), u === null && l === "" && (u = pe(i)), {
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
			return `${n ? `${j(n)} ` : ""}${e.localTime ? `${j(e.localTime)} ` : ""}${e.channel ? `${_e(e.channel)} ` : ""}${e.level ? `${ge(e.level)}: ` : ""}${e.message ? he(e.message) : ""}`;
		}
		let be = e, P = te("apiBase", ""), xe = m(() => typeof P == "string" ? P : P?.value ?? ""), F = new d(be.client ?? new r({
			baseUrl: xe.value,
			tokenStore: new t()
		})), I = i(), L = C([]), R = C(""), z = C(200), B = C([]), V = C(!1), H = C(!1), U = C(!0), W = C(null), G = C(null), K = C(null), q = null, Se = m(() => L.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: f,
			label: "All logs (combined)"
		}, ...L.value.map((e) => ({
			value: e.name,
			label: A(e.name)
		}))]), J = m(() => {
			let e = R.value === f, t = R.value && R.value !== "__all__" ? A(R.value) : "", n = B.value.map((n) => M(n, t, e)), r = [], i = 0;
			for (; i < n.length;) {
				let e = n[i];
				if (Number.isNaN(e.timestamp) && e.source === "") {
					r.push({
						level: e.level,
						content: N(e)
					}), i++;
					continue;
				}
				let t = [e], a = /* @__PURE__ */ new Set([e.source]), o = e.timestamp, s = i + 1;
				for (; s < n.length;) {
					let r = n[s];
					if (Math.abs(r.timestamp - o) <= 1e3 && r.message === e.message && !a.has(r.source)) t.push(r), a.add(r.source), o = r.timestamp, s++;
					else break;
				}
				if (t.length === 1) r.push({
					level: e.level,
					content: N(e)
				});
				else {
					let n = [...new Set(t.map((e) => e.source))].sort().join(", ");
					r.push({
						level: e.level,
						content: N(e, n)
					});
				}
				i = s;
			}
			return r;
		}), Ce = m(() => b.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function Y() {
			U.value = !0, W.value = null;
			try {
				let e = await F.list();
				L.value = e, e.length > 0 && R.value === "" && (R.value = f);
			} catch (e) {
				W.value = n(e, "Failed to list logs."), I.error(W.value);
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
					G.value = n(e, "Failed to read log."), I.error(G.value);
				} finally {
					H.value = !1;
				}
			}
		}
		function Z() {
			q !== null && (clearInterval(q), q = null);
		}
		function we() {
			Z(), $.value && R.value !== "" && (q = setInterval(() => void X(), D));
		}
		function Q() {
			document.hidden ? Z() : $.value && R.value !== "" && (q = setInterval(() => void X(), D));
		}
		let $ = C(!1);
		return T([R, z], () => void X()), T([
			$,
			R,
			z
		], we), re(() => {
			Y(), typeof document < "u" && document.addEventListener("visibilitychange", Q);
		}), x(() => {
			Z(), typeof document < "u" && document.removeEventListener("visibilitychange", Q);
		}), (e, t) => (S(), g("section", oe, [
			t[10] ||= _("header", { class: "admin-logs__head" }, [_("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			y(u, null, {
				default: E(() => [...t[3] ||= [
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
			}),
			_("div", se, [
				_("label", ce, [t[4] ||= _("span", { class: "admin-logs__label" }, "File", -1), y(s, {
					modelValue: R.value,
					"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
					options: Se.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				_("label", le, [t[5] ||= _("span", { class: "admin-logs__label" }, "Lines", -1), y(s, {
					"model-value": z.value,
					options: Ce.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => z.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				y(a, {
					variant: "outline",
					size: "sm",
					loading: H.value,
					disabled: R.value === "",
					onClick: X
				}, {
					default: E(() => [...t[6] ||= [v(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				y(o, {
					modelValue: $.value,
					"onUpdate:modelValue": t[2] ||= (e) => $.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			V.value ? (S(), g("p", ue, " Showing the most recent " + w(z.value) + " lines (" + w(R.value === ae("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : ee("", !0),
			(U.value || H.value) && B.value.length === 0 ? (S(), g("div", de, [y(c, {
				variant: "text",
				lines: 8
			})])) : W.value ? (S(), h(l, {
				key: 2,
				icon: "alert",
				title: "Couldn't load log files",
				description: W.value
			}, {
				actions: E(() => [y(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Y
				}, {
					default: E(() => [...t[7] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : G.value ? (S(), h(l, {
				key: 3,
				icon: "alert",
				title: "Couldn't read log",
				description: G.value
			}, {
				actions: E(() => [y(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: X
				}, {
					default: E(() => [...t[8] ||= [v("Retry", -1)]]),
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
			}, [J.value.length === 0 ? (S(), g(p, { key: 0 }, [v("(no output)")], 64)) : (S(!0), g(p, { key: 1 }, ie(J.value, (e, n) => (S(), g(p, { key: n }, [_("span", { innerHTML: e.content }, null, 8, fe), t[9] ||= v("\n", -1)], 64))), 128))], 512))
		]));
	}
}), [["__scopeId", "data-v-03faa68c"]]);
//#endregion
export { O as default };

//# sourceMappingURL=LogsPage-BSqsHYcN.js.map