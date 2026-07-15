import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D1nDQ0cP.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DGsvHynO.js";
import { t as o } from "./Switch-DyS2L5gX.js";
import { t as s } from "./Select-DwAQcvz1.js";
import { t as c } from "./Skeleton-DhQmxeNg.js";
import { t as l } from "./EmptyState-CfyGawh7.js";
import { t as ee } from "./PageHint-CPoTKHik.js";
import { n as te, t as u } from "./logs-DadTfaTq.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as ne, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as re, nextTick as y, onBeforeUnmount as ie, onMounted as ae, openBlock as b, ref as x, renderList as oe, toDisplayString as S, unref as C, watch as w, withCtx as T } from "vue";
//#region src/pages/admin/LogsPage.vue?vue&type=script&setup=true&lang.ts
var se = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, ce = { class: "admin-logs__controls" }, le = { class: "admin-logs__field" }, ue = { class: "admin-logs__field" }, de = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, fe = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, pe = ["innerHTML"], E = 5e3, D = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "LogsPage",
	props: { client: {} },
	setup(e) {
		let v = [
			200,
			500,
			1e3,
			2e3
		], D = {
			info: /\binfo\b/i,
			debug: /\bdebug\b/i,
			warning: /\b(warning|warn)\b/i,
			error: /\b(error|err)\b/i,
			critical: /\b(critical|crit|alert|emerg)\b/i
		};
		function O(e) {
			return e.replace(/\.\d{4}-\d{2}-\d{2}\.log$/, "");
		}
		function me(e) {
			for (let [t, n] of Object.entries(D)) if (n.test(e)) return t;
			return null;
		}
		function he(e) {
			return e.replace(/\s+\[\]$/, "");
		}
		function ge(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/("([^"]+)":\s*)("(?:[^"\\]|\\.)*"|\d+\.?\d*|true|false|null)/g, (e, t, n, r) => {
				let i = `<span class="json-key">${t}</span>`, a = r;
				return r.startsWith("\"") ? a = `<span class="json-string">${r}</span>` : r === "true" || r === "false" ? a = `<span class="json-boolean">${r}</span>` : r === "null" ? a = `<span class="json-null">${r}</span>` : isNaN(Number(r)) || (a = `<span class="json-number">${r}</span>`), i + a;
			});
		}
		function k(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		function _e(e) {
			return `<span class="log-badge log-badge--${e}">${e}</span>`;
		}
		function ve(e) {
			let t = he(e), n = 0, r = "", i = t.match(/^\[(\d{4}-\d{2}-\d{2}T(\d{2}:\d{2}:\d{2}))/);
			if (i) {
				try {
					let e = /* @__PURE__ */ new Date(i[1] + "Z");
					n = e.getTime(), r = e.toLocaleTimeString("en-US", { hour12: !1 });
				} catch {
					n = 0, r = i[2];
				}
				t = t.slice(i[0].length).trim();
			}
			let a = t.match(/^([^.]+)\.(INFO|DEBUG|WARNING|ERROR|CRITICAL):\s*(.*)$/i);
			if (a) {
				let [, e, t, i] = a;
				return {
					timestamp: n,
					localTime: r,
					source: O(e),
					level: t.toLowerCase(),
					message: i
				};
			}
			return {
				timestamp: n,
				localTime: r,
				source: "",
				level: me(t),
				message: t
			};
		}
		function A(e, t) {
			let n = e.level ? _e(e.level) : "", r = k(t || e.source), i = k(e.message), a = i ? ge(i) : "";
			return `${r}${n ? ` ${n}` : ""}${n ? ` ${e.localTime}` : e.localTime} ${a}`;
		}
		let j = e, M = re("apiBase", ""), N = f(() => typeof M == "string" ? M : M?.value ?? ""), P = new te(j.client ?? new r({
			baseUrl: N.value,
			tokenStore: new t()
		})), F = i(), I = x([]), L = x(""), R = x(200), z = x([]), B = x(!1), V = x(!1), H = x(!0), U = x(null), W = x(null), G = x(null), K = null, q = f(() => I.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: u,
			label: "All logs (combined)"
		}, ...I.value.map((e) => ({
			value: e.name,
			label: O(e.name)
		}))]), J = f(() => {
			let e = z.value.map(ve), t = [], n = 0;
			for (; n < e.length;) {
				let r = e[n];
				if (r.timestamp === 0 || r.source === "") {
					t.push({
						level: r.level,
						content: A(r)
					}), n++;
					continue;
				}
				let i = [r], a = new Set([r.source]), o = r.timestamp, s = n + 1;
				for (; s < e.length;) {
					let t = e[s];
					if (Math.abs(t.timestamp - o) <= 1e3 && t.message === r.message && !a.has(t.source)) i.push(t), a.add(t.source), o = t.timestamp, s++;
					else break;
				}
				if (i.length === 1) t.push({
					level: r.level,
					content: A(r)
				});
				else {
					let e = [...new Set(i.map((e) => e.source))].sort().join(", ");
					t.push({
						level: r.level,
						content: A(r, e)
					});
				}
				n = s;
			}
			return t;
		}), ye = f(() => v.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function Y() {
			H.value = !0, U.value = null;
			try {
				let e = await P.list();
				I.value = e, e.length > 0 && L.value === "" && (L.value = u);
			} catch (e) {
				U.value = n(e, "Failed to list logs."), F.error(U.value);
			} finally {
				H.value = !1;
			}
		}
		async function X() {
			let e = L.value;
			if (e !== "") {
				V.value = !0, W.value = null;
				try {
					let t = e === "__all__" ? await P.tailAll(R.value) : await P.tail(e, R.value);
					z.value = t.lines, B.value = t.truncated, y(() => {
						G.value && (G.value.scrollTop = G.value.scrollHeight);
					});
				} catch (e) {
					W.value = n(e, "Failed to read log."), F.error(W.value);
				} finally {
					V.value = !1;
				}
			}
		}
		function Z() {
			K !== null && (clearInterval(K), K = null);
		}
		function be() {
			Z(), $.value && L.value !== "" && (K = setInterval(() => void X(), E));
		}
		function Q() {
			document.hidden ? Z() : $.value && L.value !== "" && (K = setInterval(() => void X(), E));
		}
		let $ = x(!1);
		return w([L, R], () => void X()), w([
			$,
			L,
			R
		], be), ae(() => {
			Y(), typeof document < "u" && document.addEventListener("visibilitychange", Q);
		}), ie(() => {
			Z(), typeof document < "u" && document.removeEventListener("visibilitychange", Q);
		}), (e, t) => (b(), m("section", se, [
			t[10] ||= h("header", { class: "admin-logs__head" }, [h("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			_(ee, null, {
				default: T(() => [...t[3] ||= [
					g(" Read the server's log files to troubleshoot problems. Pick a file with the ", -1),
					h("strong", null, "File", -1),
					g(" menu (or ", -1),
					h("strong", null, "All logs", -1),
					g(" to merge them), set how many recent lines to show with ", -1),
					h("strong", null, "Lines", -1),
					g(", and press ", -1),
					h("strong", null, "Refresh", -1),
					g(" to reload. Turn on ", -1),
					h("strong", null, "Auto-refresh", -1),
					g(" to keep the newest entries streaming in every few seconds. ", -1)
				]]),
				_: 1
			}),
			h("div", ce, [
				h("label", le, [t[4] ||= h("span", { class: "admin-logs__label" }, "File", -1), _(s, {
					modelValue: L.value,
					"onUpdate:modelValue": t[0] ||= (e) => L.value = e,
					options: q.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				h("label", ue, [t[5] ||= h("span", { class: "admin-logs__label" }, "Lines", -1), _(s, {
					"model-value": R.value,
					options: ye.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => R.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				_(a, {
					variant: "outline",
					size: "sm",
					loading: V.value,
					disabled: L.value === "",
					onClick: X
				}, {
					default: T(() => [...t[6] ||= [g(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				_(o, {
					modelValue: $.value,
					"onUpdate:modelValue": t[2] ||= (e) => $.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			B.value ? (b(), m("p", de, " Showing the most recent " + S(R.value) + " lines (" + S(L.value === C("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : ne("", !0),
			(H.value || V.value) && z.value.length === 0 ? (b(), m("div", fe, [_(c, {
				variant: "text",
				lines: 8
			})])) : U.value ? (b(), p(l, {
				key: 2,
				icon: "alert",
				title: "Couldn't load log files",
				description: U.value
			}, {
				actions: T(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Y
				}, {
					default: T(() => [...t[7] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : W.value ? (b(), p(l, {
				key: 3,
				icon: "alert",
				title: "Couldn't read log",
				description: W.value
			}, {
				actions: T(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: X
				}, {
					default: T(() => [...t[8] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (b(), m("pre", {
				key: 4,
				ref_key: "preEl",
				ref: G,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, [J.value.length === 0 ? (b(), m(d, { key: 0 }, [g("(no output)")], 64)) : (b(!0), m(d, { key: 1 }, oe(J.value, (e, n) => (b(), m(d, { key: n }, [h("span", { innerHTML: e.content }, null, 8, pe), t[9] ||= g("\n", -1)], 64))), 128))], 512))
		]));
	}
}), [["__scopeId", "data-v-fa59877f"]]);
//#endregion
export { D as default };

//# sourceMappingURL=LogsPage-Jp67l-uI.js.map