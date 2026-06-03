import { a as e, f as t, h as n, i as r, n as i, o as a, r as o, t as s } from "./Button-C86XulWV.js";
import { t as c } from "./Select-CjbYOZGH.js";
import { t as l } from "./Switch-BRVGpfuc.js";
import { n as u, t as d } from "./logs-DadTfaTq.js";
import { computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as ee, nextTick as te, onBeforeUnmount as b, onMounted as x, openBlock as S, ref as C, toDisplayString as w, unref as T, watch as E, withCtx as D } from "vue";
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
}, re = 5e3, N = /*#__PURE__*/ n(/* @__PURE__ */ y({
	__name: "LogsPage",
	props: { client: {} },
	setup(n) {
		let y = [
			200,
			500,
			1e3,
			2e3
		], N = n, P = ee("apiBase", ""), F = f(() => typeof P == "string" ? P : P?.value ?? ""), I = new u(N.client ?? new a({
			baseUrl: F.value,
			tokenStore: new e()
		})), L = r(), R = C([]), z = C(""), B = C(200), V = C([]), H = C(!1), U = C(!1), W = C(!0), G = C(null), K = C(null), q = C(null), J = null, Y = f(() => R.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: d,
			label: "All logs (combined)"
		}, ...R.value.map((e) => ({
			value: e.name,
			label: e.name
		}))]), ie = f(() => y.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function X() {
			W.value = !0, G.value = null;
			try {
				let e = await I.list();
				R.value = e, e.length > 0 && z.value === "" && (z.value = e[0].name);
			} catch (e) {
				G.value = t(e, "Failed to list logs."), L.error(G.value);
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
					V.value = t.lines, H.value = t.truncated, te(() => {
						q.value && (q.value.scrollTop = q.value.scrollHeight);
					});
				} catch (e) {
					K.value = t(e, "Failed to read log."), L.error(K.value);
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
		let $ = C(!1);
		return E([z, B], () => void Z()), E([
			$,
			z,
			B
		], ae), x(X), b(Q), (e, t) => (S(), h("section", O, [
			t[8] ||= g("header", { class: "admin-logs__head" }, [g("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			g("div", k, [
				g("label", A, [t[3] ||= g("span", { class: "admin-logs__label" }, "File", -1), v(c, {
					modelValue: z.value,
					"onUpdate:modelValue": t[0] ||= (e) => z.value = e,
					options: Y.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				g("label", j, [t[4] ||= g("span", { class: "admin-logs__label" }, "Lines", -1), v(c, {
					"model-value": B.value,
					options: ie.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => B.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				v(s, {
					variant: "outline",
					size: "sm",
					loading: U.value,
					disabled: z.value === "",
					onClick: Z
				}, {
					default: D(() => [...t[5] ||= [_(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				v(l, {
					modelValue: $.value,
					"onUpdate:modelValue": t[2] ||= (e) => $.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			H.value ? (S(), h("p", M, " Showing the most recent " + w(B.value) + " lines (" + w(z.value === T("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : m("", !0),
			(W.value || U.value) && V.value.length === 0 ? (S(), h("div", ne, [v(i, {
				variant: "text",
				lines: 8
			})])) : G.value ? (S(), p(o, {
				key: 2,
				icon: "alert",
				title: "Couldn't load log files",
				description: G.value
			}, {
				actions: D(() => [v(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: X
				}, {
					default: D(() => [...t[6] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : K.value ? (S(), p(o, {
				key: 3,
				icon: "alert",
				title: "Couldn't read log",
				description: K.value
			}, {
				actions: D(() => [v(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Z
				}, {
					default: D(() => [...t[7] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (S(), h("pre", {
				key: 4,
				ref_key: "preEl",
				ref: q,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, w(V.value.length === 0 ? "(no output)" : V.value.join("\n")), 513))
		]));
	}
}), [["__scopeId", "data-v-ba30eb8a"]]);
//#endregion
export { N as default };

//# sourceMappingURL=LogsPage-B1J66KqN.js.map