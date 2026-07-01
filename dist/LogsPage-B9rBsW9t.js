import { n as e } from "./Icon-24ngwBUH.js";
import { c as t, f as n, t as r } from "./client-fw74f3l_.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-CInT03Lp.js";
import { t as te } from "./Switch-D-Y4B9p8.js";
import { t as a } from "./Select-DHe4oeCr.js";
import { t as o } from "./Skeleton-BUq2D39t.js";
import { t as s } from "./EmptyState-0XgHKEGf.js";
import { t as c } from "./PageHint-DR8OWfto.js";
import { n as l, t as u } from "./logs-DadTfaTq.js";
import { computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, nextTick as b, onBeforeUnmount as x, onMounted as S, openBlock as C, ref as w, toDisplayString as T, unref as E, watch as D, withCtx as O } from "vue";
//#region src/pages/admin/LogsPage.vue?vue&type=script&setup=true&lang.ts
var k = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, A = { class: "admin-logs__controls" }, j = { class: "admin-logs__field" }, M = { class: "admin-logs__field" }, ne = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, re = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, ie = 5e3, N = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "LogsPage",
	props: { client: {} },
	setup(e) {
		let v = [
			200,
			500,
			1e3,
			2e3
		], N = e, P = y("apiBase", ""), F = d(() => typeof P == "string" ? P : P?.value ?? ""), I = new l(N.client ?? new r({
			baseUrl: F.value,
			tokenStore: new t()
		})), L = ee(), R = w([]), z = w(""), B = w(200), V = w([]), H = w(!1), U = w(!1), W = w(!0), G = w(null), K = w(null), q = w(null), J = null, ae = d(() => R.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: u,
			label: "All logs (combined)"
		}, ...R.value.map((e) => ({
			value: e.name,
			label: e.name
		}))]), Y = d(() => v.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function X() {
			W.value = !0, G.value = null;
			try {
				let e = await I.list();
				R.value = e, e.length > 0 && z.value === "" && (z.value = e[0].name);
			} catch (e) {
				G.value = n(e, "Failed to list logs."), L.error(G.value);
			} finally {
				W.value = !1;
			}
		}
		async function Z() {
			let e = z.value;
			if (e !== "") {
				U.value = !0, K.value = null;
				try {
					let t = e === "__all__" ? await I.tailAll(B.value) : await I.tail(e, B.value);
					V.value = t.lines, H.value = t.truncated, b(() => {
						q.value && (q.value.scrollTop = q.value.scrollHeight);
					});
				} catch (e) {
					K.value = n(e, "Failed to read log."), L.error(K.value);
				} finally {
					U.value = !1;
				}
			}
		}
		function Q() {
			J !== null && (clearInterval(J), J = null);
		}
		function oe() {
			Q(), $.value && z.value !== "" && (J = setInterval(() => void Z(), ie));
		}
		let $ = w(!1);
		return D([z, B], () => void Z()), D([
			$,
			z,
			B
		], oe), S(X), x(Q), (e, t) => (C(), m("section", k, [
			t[9] ||= h("header", { class: "admin-logs__head" }, [h("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			_(c, null, {
				default: O(() => [...t[3] ||= [
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
			h("div", A, [
				h("label", j, [t[4] ||= h("span", { class: "admin-logs__label" }, "File", -1), _(a, {
					modelValue: z.value,
					"onUpdate:modelValue": t[0] ||= (e) => z.value = e,
					options: ae.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				h("label", M, [t[5] ||= h("span", { class: "admin-logs__label" }, "Lines", -1), _(a, {
					"model-value": B.value,
					options: Y.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => B.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				_(i, {
					variant: "outline",
					size: "sm",
					loading: U.value,
					disabled: z.value === "",
					onClick: Z
				}, {
					default: O(() => [...t[6] ||= [g(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				_(te, {
					modelValue: $.value,
					"onUpdate:modelValue": t[2] ||= (e) => $.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			H.value ? (C(), m("p", ne, " Showing the most recent " + T(B.value) + " lines (" + T(z.value === E("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : p("", !0),
			(W.value || U.value) && V.value.length === 0 ? (C(), m("div", re, [_(o, {
				variant: "text",
				lines: 8
			})])) : G.value ? (C(), f(s, {
				key: 2,
				icon: "alert",
				title: "Couldn't load log files",
				description: G.value
			}, {
				actions: O(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: X
				}, {
					default: O(() => [...t[7] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : K.value ? (C(), f(s, {
				key: 3,
				icon: "alert",
				title: "Couldn't read log",
				description: K.value
			}, {
				actions: O(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Z
				}, {
					default: O(() => [...t[8] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (C(), m("pre", {
				key: 4,
				ref_key: "preEl",
				ref: q,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, T(V.value.length === 0 ? "(no output)" : V.value.join("\n")), 513))
		]));
	}
}), [["__scopeId", "data-v-b943c51d"]]);
//#endregion
export { N as default };

//# sourceMappingURL=LogsPage-B9rBsW9t.js.map