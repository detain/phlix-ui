import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D1nDQ0cP.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-btm-GCUN.js";
import { t as ee } from "./Switch-DyS2L5gX.js";
import { t as o } from "./Select-Bx8h2mSF.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-CfyGawh7.js";
import { t as te } from "./PageHint-CPoTKHik.js";
import { n as ne, t as re } from "./logs-DadTfaTq.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ie, nextTick as ae, normalizeClass as oe, onBeforeUnmount as se, onMounted as ce, openBlock as v, ref as y, renderList as le, toDisplayString as b, unref as x, watch as S, withCtx as C } from "vue";
//#region src/pages/admin/LogsPage.vue?vue&type=script&setup=true&lang.ts
var ue = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, de = { class: "admin-logs__controls" }, w = { class: "admin-logs__field" }, T = { class: "admin-logs__field" }, E = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, fe = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, pe = ["innerHTML"], D = 5e3, O = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LogsPage",
	props: { client: {} },
	setup(e) {
		let _ = [
			200,
			500,
			1e3,
			2e3
		], O = {
			info: /\binfo\b/i,
			debug: /\bdebug\b/i,
			warning: /\b(warning|warn)\b/i,
			error: /\b(error|err)\b/i,
			critical: /\b(critical|crit|alert|emerg)\b/i
		};
		function me(e) {
			return e.replace(/\.\d{4}-\d{2}-\d{2}\.log$/, "");
		}
		function he(e) {
			for (let [t, n] of Object.entries(O)) if (n.test(e)) return t;
			return null;
		}
		function k(e) {
			return e.replace(/\s+\[\]$/, "");
		}
		function A(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/("([^"]+)":\s*)("(?:[^"\\]|\\.)*"|\d+\.?\d*|true|false|null)/g, (e, t, n, r) => {
				let i = `<span class="json-key">${t}</span>`, a = r;
				return r.startsWith("\"") ? a = `<span class="json-string">${r}</span>` : r === "true" || r === "false" ? a = `<span class="json-boolean">${r}</span>` : r === "null" ? a = `<span class="json-null">${r}</span>` : isNaN(Number(r)) || (a = `<span class="json-number">${r}</span>`), i + a;
			});
		}
		function j(e) {
			let t = k(e);
			return {
				level: he(t),
				content: A(t)
			};
		}
		let M = e, N = ie("apiBase", ""), P = u(() => typeof N == "string" ? N : N?.value ?? ""), F = new ne(M.client ?? new r({
			baseUrl: P.value,
			tokenStore: new t()
		})), I = i(), L = y([]), R = y(""), z = y(200), B = y([]), V = y(!1), H = y(!1), U = y(!0), W = y(null), G = y(null), K = y(null), q = null, ge = u(() => L.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: re,
			label: "All logs (combined)"
		}, ...L.value.map((e) => ({
			value: e.name,
			label: me(e.name)
		}))]), J = u(() => B.value.map(j)), _e = u(() => _.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function Y() {
			U.value = !0, W.value = null;
			try {
				let e = await F.list();
				L.value = e, e.length > 0 && R.value === "" && (R.value = e[0].name);
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
					B.value = t.lines, V.value = t.truncated, ae(() => {
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
		function ve() {
			Z(), $.value && R.value !== "" && (q = setInterval(() => void X(), D));
		}
		function Q() {
			document.hidden ? Z() : $.value && R.value !== "" && (q = setInterval(() => void X(), D));
		}
		let $ = y(!1);
		return S([R, z], () => void X()), S([
			$,
			R,
			z
		], ve), ce(() => {
			Y(), typeof document < "u" && document.addEventListener("visibilitychange", Q);
		}), se(() => {
			Z(), typeof document < "u" && document.removeEventListener("visibilitychange", Q);
		}), (e, t) => (v(), p("section", ue, [
			t[10] ||= m("header", { class: "admin-logs__head" }, [m("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			g(te, null, {
				default: C(() => [...t[3] ||= [
					h(" Read the server's log files to troubleshoot problems. Pick a file with the ", -1),
					m("strong", null, "File", -1),
					h(" menu (or ", -1),
					m("strong", null, "All logs", -1),
					h(" to merge them), set how many recent lines to show with ", -1),
					m("strong", null, "Lines", -1),
					h(", and press ", -1),
					m("strong", null, "Refresh", -1),
					h(" to reload. Turn on ", -1),
					m("strong", null, "Auto-refresh", -1),
					h(" to keep the newest entries streaming in every few seconds. ", -1)
				]]),
				_: 1
			}),
			m("div", de, [
				m("label", w, [t[4] ||= m("span", { class: "admin-logs__label" }, "File", -1), g(o, {
					modelValue: R.value,
					"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
					options: ge.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				m("label", T, [t[5] ||= m("span", { class: "admin-logs__label" }, "Lines", -1), g(o, {
					"model-value": z.value,
					options: _e.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => z.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				g(a, {
					variant: "outline",
					size: "sm",
					loading: H.value,
					disabled: R.value === "",
					onClick: X
				}, {
					default: C(() => [...t[6] ||= [h(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				g(ee, {
					modelValue: $.value,
					"onUpdate:modelValue": t[2] ||= (e) => $.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			V.value ? (v(), p("p", E, " Showing the most recent " + b(z.value) + " lines (" + b(R.value === x("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : f("", !0),
			(U.value || H.value) && B.value.length === 0 ? (v(), p("div", fe, [g(s, {
				variant: "text",
				lines: 8
			})])) : W.value ? (v(), d(c, {
				key: 2,
				icon: "alert",
				title: "Couldn't load log files",
				description: W.value
			}, {
				actions: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Y
				}, {
					default: C(() => [...t[7] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : G.value ? (v(), d(c, {
				key: 3,
				icon: "alert",
				title: "Couldn't read log",
				description: G.value
			}, {
				actions: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: X
				}, {
					default: C(() => [...t[8] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (v(), p("pre", {
				key: 4,
				ref_key: "preEl",
				ref: K,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, [J.value.length === 0 ? (v(), p(l, { key: 0 }, [h("(no output)")], 64)) : (v(!0), p(l, { key: 1 }, le(J.value, (e, n) => (v(), p(l, { key: n }, [
				e.level ? (v(), p("span", {
					key: 0,
					class: oe(["log-badge", `log-badge--${e.level}`])
				}, b(e.level), 3)) : f("", !0),
				m("span", { innerHTML: e.content }, null, 8, pe),
				t[9] ||= h("\n", -1)
			], 64))), 128))], 512))
		]));
	}
}), [["__scopeId", "data-v-bbfa977c"]]);
//#endregion
export { O as default };

//# sourceMappingURL=LogsPage-BySCbH30.js.map