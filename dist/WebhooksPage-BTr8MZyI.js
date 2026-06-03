import { a as e, i as t, l as n, n as r, r as ee, t as te, u as i } from "./tokenStore-DfQvvLGI.js";
import { t as a } from "./Modal-CoXJKJI4.js";
import { t as ne } from "./EmptyState-Oymq15Ey.js";
import { t as re } from "./Badge-Cmz5FPqw.js";
import { r as ie, t as ae } from "./webhooks-BBTLnFKm.js";
import { Fragment as o, computed as s, createBlock as oe, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as se, normalizeClass as ce, onMounted as le, openBlock as m, ref as h, renderList as g, toDisplayString as _, unref as ue, vModelDynamic as de, vModelText as v, withCtx as y, withDirectives as b, withModifiers as fe } from "vue";
//#region src/pages/admin/WebhooksPage.vue?vue&type=script&setup=true&lang.ts
var pe = {
	class: "admin-webhooks",
	"aria-labelledby": "webhooks-heading"
}, me = { class: "admin-webhooks__head" }, he = {
	key: 0,
	class: "admin-webhooks__skel"
}, ge = {
	key: 2,
	class: "admin-webhooks__table",
	"aria-label": "Webhooks"
}, _e = { class: "admin-webhooks__url" }, ve = { class: "admin-webhooks__actions" }, ye = { class: "admin-webhooks__field" }, be = { class: "admin-webhooks__field" }, xe = { class: "admin-webhooks__field" }, Se = { class: "admin-webhooks__label" }, Ce = {
	key: 0,
	"aria-hidden": "true"
}, we = {
	key: 0,
	class: "admin-webhooks__hint"
}, Te = { class: "admin-webhooks__secret-row" }, Ee = ["type", "placeholder"], x = { class: "admin-webhooks__events" }, S = { class: "admin-webhooks__events-category-label" }, C = ["checked", "onChange"], w = { class: "admin-webhooks__checkbox-label" }, T = { class: "admin-webhooks__event-id" }, E = {
	key: 0,
	class: "admin-webhooks__error",
	role: "alert"
}, D = {
	key: 0,
	role: "status",
	"aria-live": "polite"
}, De = {
	class: "admin-webhooks__test-icon",
	"aria-hidden": "true"
}, Oe = { class: "admin-webhooks__test-status" }, ke = { class: "admin-webhooks__test-message" }, O = /*#__PURE__*/ i(/* @__PURE__ */ p({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(i) {
		let p = i, O = se("apiBase", ""), Ae = s(() => typeof O == "string" ? O : O?.value ?? ""), k = new ae(p.client ?? new e({
			baseUrl: Ae.value,
			tokenStore: new te()
		})), A = t();
		function j(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function M(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let N = h([]), P = h(!0);
		async function F() {
			P.value = !0;
			try {
				N.value = await k.list();
			} catch (e) {
				A.error(j(e, "Failed to load webhooks."));
			} finally {
				P.value = !1;
			}
		}
		let I = h(!1), L = h(null), R = h(""), z = h(""), B = h(""), V = h(/* @__PURE__ */ new Set()), H = h(!1), U = h(!1), W = h(""), je = s(() => L.value ? "Edit webhook" : "Add webhook");
		function G() {
			L.value = null, R.value = "", z.value = "", B.value = "", V.value = /* @__PURE__ */ new Set(), H.value = !1, W.value = "", I.value = !0;
		}
		function Me(e) {
			L.value = e, R.value = e.name, z.value = e.url, B.value = "", V.value = new Set(e.events), H.value = !1, W.value = "", I.value = !0;
		}
		function K() {
			I.value = !1, L.value = null;
		}
		function Ne(e) {
			let t = new Set(V.value);
			t.has(e) ? t.delete(e) : t.add(e), V.value = t;
		}
		async function q() {
			if (W.value = "", !R.value.trim()) {
				W.value = "Name is required.";
				return;
			}
			if (!z.value.trim()) {
				W.value = "URL is required.";
				return;
			}
			if (!M(z.value)) {
				W.value = "URL must be a valid http:// or https:// URL.";
				return;
			}
			if (!L.value && !B.value.trim()) {
				W.value = "Secret is required when creating a webhook.";
				return;
			}
			if (V.value.size === 0) {
				W.value = "Select at least one event.";
				return;
			}
			U.value = !0;
			try {
				let e = L.value;
				if (e) {
					let t = {
						name: R.value.trim(),
						url: z.value.trim(),
						events: Array.from(V.value)
					};
					B.value.trim() && (t.secret = B.value), await k.update(e.id, t), A.success("Webhook updated.");
				} else await k.create({
					name: R.value.trim(),
					url: z.value.trim(),
					secret: B.value,
					events: Array.from(V.value)
				}), A.success("Webhook created.");
				K(), await F();
			} catch (e) {
				W.value = j(e, "Failed to save webhook.");
			} finally {
				U.value = !1;
			}
		}
		let J = h(null);
		async function Pe() {
			let e = J.value;
			if (e) try {
				await k.remove(e.id), A.success("Webhook deleted."), J.value = null, await F();
			} catch (e) {
				A.error(j(e, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = h(null), X = h(null), Z = h(!1), Fe = s(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = s({
			get: () => Y.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Ie(e) {
			Y.value = e, X.value = null, Z.value = !0;
			try {
				let t = await k.test(e.id), n = t.success_count + t.failure_count, r = t.failure_count === 0 ? `Delivered successfully (${t.success_count}/${t.success_count} webhooks)` : `Delivery failed — ${t.failure_count} of ${n} webhook(s) failed`;
				X.value = {
					success: t.success,
					message: r
				};
			} catch (e) {
				X.value = {
					success: !1,
					message: j(e, "Failed to test webhook.")
				};
			} finally {
				Z.value = !1;
			}
		}
		function $() {
			Y.value = null, X.value = null;
		}
		return le(F), (e, t) => (m(), l("section", pe, [
			u("header", me, [t[9] ||= u("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), f(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: y(() => [...t[8] ||= [d("Add webhook", -1)]]),
				_: 1
			})]),
			P.value ? (m(), l("div", he, [f(ee, {
				variant: "text",
				lines: 6
			})])) : N.value.length === 0 ? (m(), oe(ne, {
				key: 1,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: y(() => [f(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: y(() => [...t[10] ||= [d("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (m(), l("table", ge, [t[14] ||= u("thead", null, [u("tr", null, [
				u("th", { scope: "col" }, "Name"),
				u("th", { scope: "col" }, "URL"),
				u("th", { scope: "col" }, "Events"),
				u("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), u("tbody", null, [(m(!0), l(o, null, g(N.value, (e) => (m(), l("tr", { key: e.id }, [
				u("td", null, _(e.name), 1),
				u("td", _e, _(e.url), 1),
				u("td", null, [f(re, {
					tone: "info",
					mono: ""
				}, {
					default: y(() => [d(_(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				u("td", null, [u("div", ve, [
					f(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Me(e)
					}, {
						default: y(() => [...t[11] ||= [d(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					f(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Ie(e)
					}, {
						default: y(() => [...t[12] ||= [d(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					f(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: y(() => [...t[13] ||= [d(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			f(a, {
				modelValue: I.value,
				"onUpdate:modelValue": t[4] ||= (e) => I.value = e,
				title: je.value,
				size: "lg",
				onClose: K
			}, {
				footer: y(() => [f(r, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: y(() => [...t[19] ||= [d("Cancel", -1)]]),
					_: 1
				}), f(r, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: q
				}, {
					default: y(() => [d(_(L.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [u("form", {
					class: "admin-webhooks__form",
					onSubmit: fe(q, ["prevent"])
				}, [
					u("label", ye, [t[15] ||= u("span", { class: "admin-webhooks__label" }, "Name", -1), b(u("input", {
						"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[v, R.value]])]),
					u("label", be, [t[16] ||= u("span", { class: "admin-webhooks__label" }, "URL", -1), b(u("input", {
						"onUpdate:modelValue": t[1] ||= (e) => z.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[v, z.value]])]),
					u("div", xe, [
						u("span", Se, [t[17] ||= d(" Secret", -1), L.value ? c("", !0) : (m(), l("span", Ce, " *"))]),
						L.value ? (m(), l("p", we, "Leave blank to keep the current secret.")) : c("", !0),
						u("div", Te, [b(u("input", {
							"onUpdate:modelValue": t[2] ||= (e) => B.value = e,
							type: H.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: L.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, Ee), [[de, B.value]]), f(r, {
							variant: "outline",
							size: "sm",
							"left-icon": H.value ? "eye-off" : "eye",
							"aria-label": H.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => H.value = !H.value
						}, {
							default: y(() => [d(_(H.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					u("fieldset", x, [t[18] ||= u("legend", { class: "admin-webhooks__label" }, [d("Events"), u("span", { "aria-hidden": "true" }, " *")], -1), (m(!0), l(o, null, g(ue(ie), (e) => (m(), l("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [u("span", S, _(e.label), 1), (m(!0), l(o, null, g(e.events, (e) => (m(), l("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						u("input", {
							type: "checkbox",
							checked: V.value.has(e.id),
							onChange: (t) => Ne(e.id)
						}, null, 40, C),
						u("span", w, _(e.label), 1),
						u("span", T, _(e.id), 1)
					]))), 128))]))), 128))]),
					W.value ? (m(), l("p", E, _(W.value), 1)) : c("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			f(a, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => J.value = null
			}, {
				footer: y(() => [f(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => J.value = null
				}, {
					default: y(() => [...t[22] ||= [d("Cancel", -1)]]),
					_: 1
				}), f(r, {
					variant: "solid",
					size: "sm",
					onClick: Pe
				}, {
					default: y(() => [...t[23] ||= [d("Delete", -1)]]),
					_: 1
				})]),
				default: y(() => [u("p", null, [
					t[20] ||= d(" Delete webhook ", -1),
					u("strong", null, _(J.value?.name), 1),
					t[21] ||= d("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			f(a, {
				modelValue: Q.value,
				"onUpdate:modelValue": t[7] ||= (e) => Q.value = e,
				title: Fe.value
			}, {
				footer: y(() => [f(r, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: y(() => [...t[24] ||= [d("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: y(() => [Z.value ? (m(), l("p", D, "Sending test payload…")) : X.value ? (m(), l("div", {
					key: 1,
					class: ce(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [u("span", De, [f(n, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), u("div", null, [u("p", Oe, _(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), u("p", ke, _(X.value.message), 1)])], 2)) : c("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-77c00620"]]);
//#endregion
export { O as default };

//# sourceMappingURL=WebhooksPage-BTr8MZyI.js.map