import { c as e, d as t, n, t as r } from "./Button-C4PyCjLX.js";
import { t as i } from "./tokenStore-CGMYSpg6.js";
import { t as a } from "./Switch-R1pbcsd-.js";
import { t as o } from "./Select-CmN-4YbZ.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { n as c, t as l } from "./EmptyState-BEMIpc2l.js";
import { n as u, t as ee } from "./logs-DadTfaTq.js";
import { computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, nextTick as b, onBeforeUnmount as x, onMounted as S, openBlock as C, ref as w, toDisplayString as T, unref as te, watch as E, withCtx as D } from "vue";
//#region src/pages/admin/LogsPage.vue?vue&type=script&setup=true&lang.ts
var O = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, k = { class: "admin-logs__controls" }, A = { class: "admin-logs__field" }, j = { class: "admin-logs__field" }, ne = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, re = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, M = 5e3, N = /*#__PURE__*/ t(/* @__PURE__ */ v({
	__name: "LogsPage",
	props: { client: {} },
	setup(t) {
		let v = [
			200,
			500,
			1e3,
			2e3
		], N = t, P = y("apiBase", ""), F = d(() => typeof P == "string" ? P : P?.value ?? ""), I = new u(N.client ?? new n({
			baseUrl: F.value,
			tokenStore: new i()
		})), L = s(), R = w([]), z = w(""), B = w(200), V = w([]), H = w(!1), U = w(!1), W = w(!0), G = w(null), K = w(null), q = w(null), J = null, Y = d(() => R.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: ee,
			label: "All logs (combined)"
		}, ...R.value.map((e) => ({
			value: e.name,
			label: e.name
		}))]), ie = d(() => v.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function X() {
			W.value = !0, G.value = null;
			try {
				let e = await I.list();
				R.value = e, e.length > 0 && z.value === "" && (z.value = e[0].name);
			} catch (t) {
				G.value = e(t, "Failed to list logs."), L.error(G.value);
			} finally {
				W.value = !1;
			}
		}
		async function Z() {
			let t = z.value;
			if (t !== "") {
				U.value = !0, K.value = null;
				try {
					let e = t === "__all__" ? await I.tailAll(B.value) : await I.tail(t, B.value);
					V.value = e.lines, H.value = e.truncated, b(() => {
						q.value && (q.value.scrollTop = q.value.scrollHeight);
					});
				} catch (t) {
					K.value = e(t, "Failed to read log."), L.error(K.value);
				} finally {
					U.value = !1;
				}
			}
		}
		function Q() {
			J !== null && (clearInterval(J), J = null);
		}
		function ae() {
			Q(), $.value && z.value !== "" && (J = setInterval(() => void Z(), M));
		}
		let $ = w(!1);
		return E([z, B], () => void Z()), E([
			$,
			z,
			B
		], ae), S(X), x(Q), (e, t) => (C(), m("section", O, [
			t[8] ||= h("header", { class: "admin-logs__head" }, [h("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			h("div", k, [
				h("label", A, [t[3] ||= h("span", { class: "admin-logs__label" }, "File", -1), _(o, {
					modelValue: z.value,
					"onUpdate:modelValue": t[0] ||= (e) => z.value = e,
					options: Y.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				h("label", j, [t[4] ||= h("span", { class: "admin-logs__label" }, "Lines", -1), _(o, {
					"model-value": B.value,
					options: ie.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => B.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				_(r, {
					variant: "outline",
					size: "sm",
					loading: U.value,
					disabled: z.value === "",
					onClick: Z
				}, {
					default: D(() => [...t[5] ||= [g(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				_(a, {
					modelValue: $.value,
					"onUpdate:modelValue": t[2] ||= (e) => $.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			H.value ? (C(), m("p", ne, " Showing the most recent " + T(B.value) + " lines (" + T(z.value === te("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : p("", !0),
			(W.value || U.value) && V.value.length === 0 ? (C(), m("div", re, [_(c, {
				variant: "text",
				lines: 8
			})])) : G.value ? (C(), f(l, {
				key: 2,
				icon: "alert",
				title: "Couldn't load log files",
				description: G.value
			}, {
				actions: D(() => [_(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: X
				}, {
					default: D(() => [...t[6] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : K.value ? (C(), f(l, {
				key: 3,
				icon: "alert",
				title: "Couldn't read log",
				description: K.value
			}, {
				actions: D(() => [_(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Z
				}, {
					default: D(() => [...t[7] ||= [g("Retry", -1)]]),
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
}), [["__scopeId", "data-v-ba30eb8a"]]);
//#endregion
export { N as default };

//# sourceMappingURL=LogsPage-yEJfdLZs.js.map