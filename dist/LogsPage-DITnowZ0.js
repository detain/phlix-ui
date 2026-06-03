import { a as e, i as t, m as n, n as r, r as i, t as a } from "./Button-DjEQ9y17.js";
import { t as o } from "./Select-BPlN5xaU.js";
import { t as s } from "./Switch-BNdBMUaS.js";
import { n as c, t as l } from "./logs-DadTfaTq.js";
import { computed as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, nextTick as v, onBeforeUnmount as y, onMounted as b, openBlock as x, ref as S, toDisplayString as C, unref as w, watch as T, withCtx as E } from "vue";
//#region src/pages/admin/LogsPage.vue?vue&type=script&setup=true&lang.ts
var D = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, O = { class: "admin-logs__controls" }, k = { class: "admin-logs__field" }, A = { class: "admin-logs__field" }, j = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, M = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, N = 5e3, P = /*#__PURE__*/ n(/* @__PURE__ */ g({
	__name: "LogsPage",
	props: { client: {} },
	setup(n) {
		let g = [
			200,
			500,
			1e3,
			2e3
		], P = n, F = _("apiBase", ""), I = u(() => typeof F == "string" ? F : F?.value ?? ""), L = new c(P.client ?? new e({
			baseUrl: I.value,
			tokenStore: new t()
		})), R = i(), z = S([]), B = S(""), V = S(200), H = S([]), U = S(!1), W = S(!1), G = S(null), K = null, q = u(() => z.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: l,
			label: "All logs (combined)"
		}, ...z.value.map((e) => ({
			value: e.name,
			label: e.name
		}))]), J = u(() => g.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function Y() {
			try {
				let e = await L.list();
				z.value = e, e.length > 0 && B.value === "" && (B.value = e[0].name);
			} catch (e) {
				R.error(e instanceof Error ? e.message : "Failed to list logs.");
			}
		}
		async function X() {
			let e = B.value;
			if (e !== "") {
				W.value = !0;
				try {
					let t = e === "__all__" ? await L.tailAll(V.value) : await L.tail(e, V.value);
					H.value = t.lines, U.value = t.truncated, v(() => {
						G.value && (G.value.scrollTop = G.value.scrollHeight);
					});
				} catch (e) {
					R.error(e instanceof Error ? e.message : "Failed to read log.");
				} finally {
					W.value = !1;
				}
			}
		}
		function Z() {
			K !== null && (clearInterval(K), K = null);
		}
		function Q() {
			Z(), $.value && B.value !== "" && (K = setInterval(() => void X(), N));
		}
		let $ = S(!1);
		return T([B, V], () => void X()), T([
			$,
			B,
			V
		], Q), b(Y), y(Z), (e, t) => (x(), f("section", D, [
			t[6] ||= p("header", { class: "admin-logs__head" }, [p("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			p("div", O, [
				p("label", k, [t[3] ||= p("span", { class: "admin-logs__label" }, "File", -1), h(o, {
					modelValue: B.value,
					"onUpdate:modelValue": t[0] ||= (e) => B.value = e,
					options: q.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				p("label", A, [t[4] ||= p("span", { class: "admin-logs__label" }, "Lines", -1), h(o, {
					"model-value": V.value,
					options: J.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => V.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				h(a, {
					variant: "outline",
					size: "sm",
					loading: W.value,
					disabled: B.value === "",
					onClick: X
				}, {
					default: E(() => [...t[5] ||= [m(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				h(s, {
					modelValue: $.value,
					"onUpdate:modelValue": t[2] ||= (e) => $.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			U.value ? (x(), f("p", j, " Showing the most recent " + C(V.value) + " lines (" + C(B.value === w("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : d("", !0),
			W.value && H.value.length === 0 ? (x(), f("div", M, [h(r, {
				variant: "text",
				lines: 8
			})])) : (x(), f("pre", {
				key: 2,
				ref_key: "preEl",
				ref: G,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, C(H.value.length === 0 ? "(no output)" : H.value.join("\n")), 513))
		]));
	}
}), [["__scopeId", "data-v-a9b0d206"]]);
//#endregion
export { P as default };

//# sourceMappingURL=LogsPage-DITnowZ0.js.map