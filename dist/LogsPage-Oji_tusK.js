import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, t as r } from "./client-Dywsiudr.js";
import { t as i } from "./Button-k7aQagzg.js";
import { t as a } from "./Switch-CFZhdkXR.js";
import { t as o } from "./Select-BR5EXV0L.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { t as c } from "./Skeleton-DkSoWF3C.js";
import { t as l } from "./EmptyState-B2QnGIQT.js";
import { n as u, t as ee } from "./logs-DadTfaTq.js";
import { computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, nextTick as b, onBeforeUnmount as x, onMounted as S, openBlock as C, ref as w, toDisplayString as T, unref as te, watch as E, withCtx as D } from "vue";
//#region src/pages/admin/LogsPage.vue?vue&type=script&setup=true&lang.ts
var O = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, k = { class: "admin-logs__controls" }, A = { class: "admin-logs__field" }, j = { class: "admin-logs__field" }, M = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, ne = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, re = 5e3, N = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "LogsPage",
	props: { client: {} },
	setup(e) {
		let v = [
			200,
			500,
			1e3,
			2e3
		], N = e, P = y("apiBase", ""), F = d(() => typeof P == "string" ? P : P?.value ?? ""), I = new u(N.client ?? new r({
			baseUrl: F.value,
			tokenStore: new t()
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
		function ae() {
			Q(), $.value && z.value !== "" && (J = setInterval(() => void Z(), re));
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
				_(i, {
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
			H.value ? (C(), m("p", M, " Showing the most recent " + T(B.value) + " lines (" + T(z.value === te("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : p("", !0),
			(W.value || U.value) && V.value.length === 0 ? (C(), m("div", ne, [_(c, {
				variant: "text",
				lines: 8
			})])) : G.value ? (C(), f(l, {
				key: 2,
				icon: "alert",
				title: "Couldn't load log files",
				description: G.value
			}, {
				actions: D(() => [_(i, {
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
				actions: D(() => [_(i, {
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

//# sourceMappingURL=LogsPage-Oji_tusK.js.map