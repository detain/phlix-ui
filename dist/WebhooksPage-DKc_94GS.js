import { a as e, i as t, m as n, n as r, p as ee, r as te, t as i } from "./Button-DjEQ9y17.js";
import { t as a } from "./Modal-BkSAbwHm.js";
import { t as ne } from "./EmptyState-bbKd8GNA.js";
import { t as re } from "./Badge-DobVc76J.js";
import { r as ie, t as ae } from "./webhooks-BBTLnFKm.js";
import { Fragment as o, computed as s, createBlock as oe, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as se, normalizeClass as m, onMounted as ce, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as le, vModelDynamic as ue, vModelText as y, withCtx as b, withDirectives as x, withModifiers as de } from "vue";
//#region src/pages/admin/WebhooksPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-webhooks",
	"aria-labelledby": "webhooks-heading"
}, pe = { class: "admin-webhooks__head" }, me = {
	key: 0,
	class: "admin-webhooks__skel"
}, he = {
	key: 2,
	class: "admin-webhooks__table",
	"aria-label": "Webhooks"
}, ge = { class: "admin-webhooks__url" }, _e = { class: "admin-webhooks__actions" }, ve = { class: "admin-webhooks__field" }, ye = { class: "admin-webhooks__field" }, be = { class: "admin-webhooks__field" }, xe = { class: "admin-webhooks__label" }, Se = {
	key: 0,
	"aria-hidden": "true"
}, Ce = {
	key: 0,
	class: "admin-webhooks__hint"
}, we = { class: "admin-webhooks__secret-row" }, Te = ["type", "placeholder"], S = { class: "admin-webhooks__events" }, C = { class: "admin-webhooks__events-category-label" }, w = ["checked", "onChange"], T = { class: "admin-webhooks__checkbox-label" }, E = { class: "admin-webhooks__event-id" }, D = {
	key: 0,
	class: "admin-webhooks__error",
	role: "alert"
}, O = {
	key: 0,
	role: "status",
	"aria-live": "polite"
}, Ee = {
	class: "admin-webhooks__test-icon",
	"aria-hidden": "true"
}, De = { class: "admin-webhooks__test-status" }, Oe = { class: "admin-webhooks__test-message" }, k = /*#__PURE__*/ n(/* @__PURE__ */ p({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(n) {
		let p = n, k = se("apiBase", ""), ke = s(() => typeof k == "string" ? k : k?.value ?? ""), A = new ae(p.client ?? new e({
			baseUrl: ke.value,
			tokenStore: new t()
		})), j = te();
		function M(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function Ae(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let N = g([]), P = g(!0);
		async function F() {
			P.value = !0;
			try {
				N.value = await A.list();
			} catch (e) {
				j.error(M(e, "Failed to load webhooks."));
			} finally {
				P.value = !1;
			}
		}
		let I = g(!1), L = g(null), R = g(""), z = g(""), B = g(""), V = g(/* @__PURE__ */ new Set()), H = g(!1), U = g(!1), W = g(""), je = s(() => L.value ? "Edit webhook" : "Add webhook");
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
			if (!Ae(z.value)) {
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
					B.value.trim() && (t.secret = B.value), await A.update(e.id, t), j.success("Webhook updated.");
				} else await A.create({
					name: R.value.trim(),
					url: z.value.trim(),
					secret: B.value,
					events: Array.from(V.value)
				}), j.success("Webhook created.");
				K(), await F();
			} catch (e) {
				W.value = M(e, "Failed to save webhook.");
			} finally {
				U.value = !1;
			}
		}
		let J = g(null);
		async function Pe() {
			let e = J.value;
			if (e) try {
				await A.remove(e.id), j.success("Webhook deleted."), J.value = null, await F();
			} catch (e) {
				j.error(M(e, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = g(null), X = g(null), Z = g(!1), Fe = s(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = s({
			get: () => Y.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Ie(e) {
			Y.value = e, X.value = null, Z.value = !0;
			try {
				let t = await A.test(e.id), n = t.success_count + t.failure_count, r = t.failure_count === 0 ? `Delivered successfully (${t.success_count}/${t.success_count} webhooks)` : `Delivery failed — ${t.failure_count} of ${n} webhook(s) failed`;
				X.value = {
					success: t.success,
					message: r
				};
			} catch (e) {
				X.value = {
					success: !1,
					message: M(e, "Failed to test webhook.")
				};
			} finally {
				Z.value = !1;
			}
		}
		function $() {
			Y.value = null, X.value = null;
		}
		return ce(F), (e, t) => (h(), l("section", fe, [
			u("header", pe, [t[9] ||= u("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), f(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: b(() => [...t[8] ||= [d("Add webhook", -1)]]),
				_: 1
			})]),
			P.value ? (h(), l("div", me, [f(r, {
				variant: "text",
				lines: 6
			})])) : N.value.length === 0 ? (h(), oe(ne, {
				key: 1,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: b(() => [f(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: b(() => [...t[10] ||= [d("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), l("table", he, [t[14] ||= u("thead", null, [u("tr", null, [
				u("th", { scope: "col" }, "Name"),
				u("th", { scope: "col" }, "URL"),
				u("th", { scope: "col" }, "Events"),
				u("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), u("tbody", null, [(h(!0), l(o, null, _(N.value, (e) => (h(), l("tr", { key: e.id }, [
				u("td", null, v(e.name), 1),
				u("td", ge, v(e.url), 1),
				u("td", null, [f(re, {
					tone: "info",
					mono: ""
				}, {
					default: b(() => [d(v(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				u("td", null, [u("div", _e, [
					f(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Me(e)
					}, {
						default: b(() => [...t[11] ||= [d(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					f(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Ie(e)
					}, {
						default: b(() => [...t[12] ||= [d(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					f(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: b(() => [...t[13] ||= [d(" Delete ", -1)]]),
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
				footer: b(() => [f(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: b(() => [...t[19] ||= [d("Cancel", -1)]]),
					_: 1
				}), f(i, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: q
				}, {
					default: b(() => [d(v(L.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [u("form", {
					class: "admin-webhooks__form",
					onSubmit: de(q, ["prevent"])
				}, [
					u("label", ve, [t[15] ||= u("span", { class: "admin-webhooks__label" }, "Name", -1), x(u("input", {
						"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, R.value]])]),
					u("label", ye, [t[16] ||= u("span", { class: "admin-webhooks__label" }, "URL", -1), x(u("input", {
						"onUpdate:modelValue": t[1] ||= (e) => z.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[y, z.value]])]),
					u("div", be, [
						u("span", xe, [t[17] ||= d(" Secret", -1), L.value ? c("", !0) : (h(), l("span", Se, " *"))]),
						L.value ? (h(), l("p", Ce, "Leave blank to keep the current secret.")) : c("", !0),
						u("div", we, [x(u("input", {
							"onUpdate:modelValue": t[2] ||= (e) => B.value = e,
							type: H.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: L.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, Te), [[ue, B.value]]), f(i, {
							variant: "outline",
							size: "sm",
							"left-icon": H.value ? "eye-off" : "eye",
							"aria-label": H.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => H.value = !H.value
						}, {
							default: b(() => [d(v(H.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					u("fieldset", S, [t[18] ||= u("legend", { class: "admin-webhooks__label" }, [d("Events"), u("span", { "aria-hidden": "true" }, " *")], -1), (h(!0), l(o, null, _(le(ie), (e) => (h(), l("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [u("span", C, v(e.label), 1), (h(!0), l(o, null, _(e.events, (e) => (h(), l("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						u("input", {
							type: "checkbox",
							checked: V.value.has(e.id),
							onChange: (t) => Ne(e.id)
						}, null, 40, w),
						u("span", T, v(e.label), 1),
						u("span", E, v(e.id), 1)
					]))), 128))]))), 128))]),
					W.value ? (h(), l("p", D, v(W.value), 1)) : c("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			f(a, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => J.value = null
			}, {
				footer: b(() => [f(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => J.value = null
				}, {
					default: b(() => [...t[22] ||= [d("Cancel", -1)]]),
					_: 1
				}), f(i, {
					variant: "solid",
					size: "sm",
					onClick: Pe
				}, {
					default: b(() => [...t[23] ||= [d("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [u("p", null, [
					t[20] ||= d(" Delete webhook ", -1),
					u("strong", null, v(J.value?.name), 1),
					t[21] ||= d("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			f(a, {
				modelValue: Q.value,
				"onUpdate:modelValue": t[7] ||= (e) => Q.value = e,
				title: Fe.value
			}, {
				footer: b(() => [f(i, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: b(() => [...t[24] ||= [d("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: b(() => [Z.value ? (h(), l("p", O, "Sending test payload…")) : X.value ? (h(), l("div", {
					key: 1,
					class: m(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [u("span", Ee, [f(ee, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), u("div", null, [u("p", De, v(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), u("p", Oe, v(X.value.message), 1)])], 2)) : c("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-77c00620"]]);
//#endregion
export { k as default };

//# sourceMappingURL=WebhooksPage-DKc_94GS.js.map