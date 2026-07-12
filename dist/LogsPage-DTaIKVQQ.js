import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-C0AMSEun.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-btm-GCUN.js";
import { t as te } from "./Switch-DyS2L5gX.js";
import { t as a } from "./Select-BiOUcacP.js";
import { t as o } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-CfyGawh7.js";
import { t as c } from "./PageHint-CPoTKHik.js";
import { n as l, t as u } from "./logs-DadTfaTq.js";
import { computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, nextTick as ne, onBeforeUnmount as re, onMounted as b, openBlock as x, ref as S, toDisplayString as C, unref as w, watch as T, withCtx as E } from "vue";
//#region src/pages/admin/LogsPage.vue?vue&type=script&setup=true&lang.ts
var D = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, O = { class: "admin-logs__controls" }, k = { class: "admin-logs__field" }, A = { class: "admin-logs__field" }, j = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, ie = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, M = 5e3, N = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "LogsPage",
	props: { client: {} },
	setup(e) {
		let v = [
			200,
			500,
			1e3,
			2e3
		], N = e, P = y("apiBase", ""), ae = d(() => typeof P == "string" ? P : P?.value ?? ""), F = new l(N.client ?? new r({
			baseUrl: ae.value,
			tokenStore: new t()
		})), I = ee(), L = S([]), R = S(""), z = S(200), B = S([]), V = S(!1), H = S(!1), U = S(!0), W = S(null), G = S(null), K = S(null), q = null, oe = d(() => L.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: u,
			label: "All logs (combined)"
		}, ...L.value.map((e) => ({
			value: e.name,
			label: e.name
		}))]), J = d(() => v.map((e) => ({
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
		function se() {
			Z(), $.value && R.value !== "" && (q = setInterval(() => void X(), M));
		}
		function Q() {
			document.hidden ? Z() : $.value && R.value !== "" && (q = setInterval(() => void X(), M));
		}
		let $ = S(!1);
		return T([R, z], () => void X()), T([
			$,
			R,
			z
		], se), b(() => {
			Y(), typeof document < "u" && document.addEventListener("visibilitychange", Q);
		}), re(() => {
			Z(), typeof document < "u" && document.removeEventListener("visibilitychange", Q);
		}), (e, t) => (x(), m("section", D, [
			t[9] ||= h("header", { class: "admin-logs__head" }, [h("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			_(c, null, {
				default: E(() => [...t[3] ||= [
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
			h("div", O, [
				h("label", k, [t[4] ||= h("span", { class: "admin-logs__label" }, "File", -1), _(a, {
					modelValue: R.value,
					"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
					options: oe.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				h("label", A, [t[5] ||= h("span", { class: "admin-logs__label" }, "Lines", -1), _(a, {
					"model-value": z.value,
					options: J.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => z.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				_(i, {
					variant: "outline",
					size: "sm",
					loading: H.value,
					disabled: R.value === "",
					onClick: X
				}, {
					default: E(() => [...t[6] ||= [g(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				_(te, {
					modelValue: $.value,
					"onUpdate:modelValue": t[2] ||= (e) => $.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			V.value ? (x(), m("p", j, " Showing the most recent " + C(z.value) + " lines (" + C(R.value === w("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : p("", !0),
			(U.value || H.value) && B.value.length === 0 ? (x(), m("div", ie, [_(o, {
				variant: "text",
				lines: 8
			})])) : W.value ? (x(), f(s, {
				key: 2,
				icon: "alert",
				title: "Couldn't load log files",
				description: W.value
			}, {
				actions: E(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Y
				}, {
					default: E(() => [...t[7] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : G.value ? (x(), f(s, {
				key: 3,
				icon: "alert",
				title: "Couldn't read log",
				description: G.value
			}, {
				actions: E(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: X
				}, {
					default: E(() => [...t[8] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (x(), m("pre", {
				key: 4,
				ref_key: "preEl",
				ref: K,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, C(B.value.length === 0 ? "(no output)" : B.value.join("\n")), 513))
		]));
	}
}), [["__scopeId", "data-v-43b2196a"]]);
//#endregion
export { N as default };

//# sourceMappingURL=LogsPage-DTaIKVQQ.js.map