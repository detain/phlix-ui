import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D1nDQ0cP.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DGsvHynO.js";
import { t as o } from "./Switch-DyS2L5gX.js";
import { t as s } from "./Select-Bx8h2mSF.js";
import { t as c } from "./Skeleton-DhQmxeNg.js";
import { t as l } from "./EmptyState-CfyGawh7.js";
import { t as ee } from "./PageHint-CPoTKHik.js";
import { n as te, t as u } from "./logs-DadTfaTq.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as ne, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as re, nextTick as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, watch as w, withCtx as T } from "vue";
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
		function k(e) {
			return e.replace(/\s+\[\]$/, "");
		}
		function he(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/("([^"]+)":\s*)("(?:[^"\\]|\\.)*"|\d+\.?\d*|true|false|null)/g, (e, t, n, r) => {
				let i = `<span class="json-key">${t}</span>`, a = r;
				return r.startsWith("\"") ? a = `<span class="json-string">${r}</span>` : r === "true" || r === "false" ? a = `<span class="json-boolean">${r}</span>` : r === "null" ? a = `<span class="json-null">${r}</span>` : isNaN(Number(r)) || (a = `<span class="json-number">${r}</span>`), i + a;
			});
		}
		function A(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		function ge(e) {
			return `<span class="log-badge log-badge--${e}">${e}</span>`;
		}
		function _e(e) {
			let t = k(e), n = 0, r = "", i = t.match(/^\[(\d{4}-\d{2}-\d{2}T(\d{2}:\d{2}:\d{2}))/);
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
		function j(e, t) {
			let n = e.level ? ge(e.level) : "", r = A(t || e.source), i = A(e.message), a = i ? he(i) : "";
			return `${r} ${n}${e.localTime} ${a}`;
		}
		let M = e, N = re("apiBase", ""), P = f(() => typeof N == "string" ? N : N?.value ?? ""), F = new te(M.client ?? new r({
			baseUrl: P.value,
			tokenStore: new t()
		})), I = i(), L = b([]), R = b(""), z = b(200), B = b([]), V = b(!1), H = b(!1), U = b(!0), W = b(null), G = b(null), K = b(null), q = null, ve = f(() => L.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: u,
			label: "All logs (combined)"
		}, ...L.value.map((e) => ({
			value: e.name,
			label: O(e.name)
		}))]), J = f(() => {
			let e = B.value.map(_e), t = [], n = 0;
			for (; n < e.length;) {
				let r = e[n];
				if (r.timestamp === 0 || r.source === "") {
					t.push({
						level: r.level,
						content: j(r)
					}), n++;
					continue;
				}
				let i = [r], a = new Set([r.source]), o = n + 1;
				for (; o < e.length;) {
					let t = e[o];
					if (Math.abs(t.timestamp - r.timestamp) <= 1e3 && t.message === r.message && !a.has(t.source)) i.push(t), a.add(t.source), o++;
					else break;
				}
				if (i.length === 1) t.push({
					level: r.level,
					content: j(r)
				});
				else {
					let e = [...new Set(i.map((e) => e.source))].sort().join(", ");
					t.push({
						level: r.level,
						content: j(r, e)
					});
				}
				n = o;
			}
			return t;
		}), ye = f(() => v.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function Y() {
			U.value = !0, W.value = null;
			try {
				let e = await F.list();
				L.value = e, e.length > 0 && R.value === "" && (R.value = u);
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
					B.value = t.lines, V.value = t.truncated, ie(() => {
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
		function be() {
			Z(), $.value && R.value !== "" && (q = setInterval(() => void X(), E));
		}
		function Q() {
			document.hidden ? Z() : $.value && R.value !== "" && (q = setInterval(() => void X(), E));
		}
		let $ = b(!1);
		return w([R, z], () => void X()), w([
			$,
			R,
			z
		], be), oe(() => {
			Y(), typeof document < "u" && document.addEventListener("visibilitychange", Q);
		}), ae(() => {
			Z(), typeof document < "u" && document.removeEventListener("visibilitychange", Q);
		}), (e, t) => (y(), m("section", se, [
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
					modelValue: R.value,
					"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
					options: ve.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				h("label", ue, [t[5] ||= h("span", { class: "admin-logs__label" }, "Lines", -1), _(s, {
					"model-value": z.value,
					options: ye.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => z.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				_(a, {
					variant: "outline",
					size: "sm",
					loading: H.value,
					disabled: R.value === "",
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
			V.value ? (y(), m("p", de, " Showing the most recent " + S(z.value) + " lines (" + S(R.value === C("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : ne("", !0),
			(U.value || H.value) && B.value.length === 0 ? (y(), m("div", fe, [_(c, {
				variant: "text",
				lines: 8
			})])) : W.value ? (y(), p(l, {
				key: 2,
				icon: "alert",
				title: "Couldn't load log files",
				description: W.value
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
			}, 8, ["description"])) : G.value ? (y(), p(l, {
				key: 3,
				icon: "alert",
				title: "Couldn't read log",
				description: G.value
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
			}, 8, ["description"])) : (y(), m("pre", {
				key: 4,
				ref_key: "preEl",
				ref: K,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, [J.value.length === 0 ? (y(), m(d, { key: 0 }, [g("(no output)")], 64)) : (y(!0), m(d, { key: 1 }, x(J.value, (e, n) => (y(), m(d, { key: n }, [h("span", { innerHTML: e.content }, null, 8, pe), t[9] ||= g("\n", -1)], 64))), 128))], 512))
		]));
	}
}), [["__scopeId", "data-v-11e21037"]]);
//#endregion
export { D as default };

//# sourceMappingURL=LogsPage-DpwypJtS.js.map