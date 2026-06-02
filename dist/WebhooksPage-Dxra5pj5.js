import { a as e, c as t, i as n, l as r, n as i, r as a, t as ee } from "./tokenStore-SjxKwmod.js";
import { t as o } from "./Modal-D0ntqq7y.js";
import { t as te } from "./EmptyState-sJb64K4c.js";
import { t as ne } from "./Badge-wMoO7SFO.js";
import { r as re, t as ie } from "./webhooks-BBTLnFKm.js";
import { Fragment as s, computed as c, createBlock as ae, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as oe, normalizeClass as se, onMounted as ce, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as le, vModelDynamic as ue, vModelText as y, withCtx as b, withDirectives as x, withModifiers as de } from "vue";
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
}, De = { class: "admin-webhooks__test-status" }, Oe = { class: "admin-webhooks__test-message" }, k = /*#__PURE__*/ r(/* @__PURE__ */ m({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(r) {
		let m = r, k = oe("apiBase", ""), ke = c(() => typeof k == "string" ? k : k?.value ?? ""), A = new ie(m.client ?? new e({
			baseUrl: ke.value,
			tokenStore: new ee()
		})), j = n();
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
		let I = g(!1), L = g(null), R = g(""), z = g(""), B = g(""), V = g(/* @__PURE__ */ new Set()), H = g(!1), U = g(!1), W = g(""), je = c(() => L.value ? "Edit webhook" : "Add webhook");
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
		let Y = g(null), X = g(null), Z = g(!1), Fe = c(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = c({
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
		return ce(F), (e, n) => (h(), u("section", fe, [
			d("header", pe, [n[9] ||= d("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), p(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: b(() => [...n[8] ||= [f("Add webhook", -1)]]),
				_: 1
			})]),
			P.value ? (h(), u("div", me, [p(a, {
				variant: "text",
				lines: 6
			})])) : N.value.length === 0 ? (h(), ae(te, {
				key: 1,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: b(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: b(() => [...n[10] ||= [f("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), u("table", he, [n[14] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Name"),
				d("th", { scope: "col" }, "URL"),
				d("th", { scope: "col" }, "Events"),
				d("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(h(!0), u(s, null, _(N.value, (e) => (h(), u("tr", { key: e.id }, [
				d("td", null, v(e.name), 1),
				d("td", ge, v(e.url), 1),
				d("td", null, [p(ne, {
					tone: "info",
					mono: ""
				}, {
					default: b(() => [f(v(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				d("td", null, [d("div", _e, [
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Me(e)
					}, {
						default: b(() => [...n[11] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Ie(e)
					}, {
						default: b(() => [...n[12] ||= [f(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: b(() => [...n[13] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			p(o, {
				modelValue: I.value,
				"onUpdate:modelValue": n[4] ||= (e) => I.value = e,
				title: je.value,
				size: "lg",
				onClose: K
			}, {
				footer: b(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: b(() => [...n[19] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: q
				}, {
					default: b(() => [f(v(L.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [d("form", {
					class: "admin-webhooks__form",
					onSubmit: de(q, ["prevent"])
				}, [
					d("label", ve, [n[15] ||= d("span", { class: "admin-webhooks__label" }, "Name", -1), x(d("input", {
						"onUpdate:modelValue": n[0] ||= (e) => R.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, R.value]])]),
					d("label", ye, [n[16] ||= d("span", { class: "admin-webhooks__label" }, "URL", -1), x(d("input", {
						"onUpdate:modelValue": n[1] ||= (e) => z.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[y, z.value]])]),
					d("div", be, [
						d("span", xe, [n[17] ||= f(" Secret", -1), L.value ? l("", !0) : (h(), u("span", Se, " *"))]),
						L.value ? (h(), u("p", Ce, "Leave blank to keep the current secret.")) : l("", !0),
						d("div", we, [x(d("input", {
							"onUpdate:modelValue": n[2] ||= (e) => B.value = e,
							type: H.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: L.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, Te), [[ue, B.value]]), p(i, {
							variant: "outline",
							size: "sm",
							"left-icon": H.value ? "eye-off" : "eye",
							"aria-label": H.value ? "Hide secret" : "Show secret",
							onClick: n[3] ||= (e) => H.value = !H.value
						}, {
							default: b(() => [f(v(H.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					d("fieldset", S, [n[18] ||= d("legend", { class: "admin-webhooks__label" }, [f("Events"), d("span", { "aria-hidden": "true" }, " *")], -1), (h(!0), u(s, null, _(le(re), (e) => (h(), u("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [d("span", C, v(e.label), 1), (h(!0), u(s, null, _(e.events, (e) => (h(), u("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						d("input", {
							type: "checkbox",
							checked: V.value.has(e.id),
							onChange: (t) => Ne(e.id)
						}, null, 40, w),
						d("span", T, v(e.label), 1),
						d("span", E, v(e.id), 1)
					]))), 128))]))), 128))]),
					W.value ? (h(), u("p", D, v(W.value), 1)) : l("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(o, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => J.value = null
			}, {
				footer: b(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => J.value = null
				}, {
					default: b(() => [...n[22] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: Pe
				}, {
					default: b(() => [...n[23] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [d("p", null, [
					n[20] ||= f(" Delete webhook ", -1),
					d("strong", null, v(J.value?.name), 1),
					n[21] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(o, {
				modelValue: Q.value,
				"onUpdate:modelValue": n[7] ||= (e) => Q.value = e,
				title: Fe.value
			}, {
				footer: b(() => [p(i, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: b(() => [...n[24] ||= [f("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: b(() => [Z.value ? (h(), u("p", O, "Sending test payload…")) : X.value ? (h(), u("div", {
					key: 1,
					class: se(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [d("span", Ee, [p(t, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), d("div", null, [d("p", De, v(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), d("p", Oe, v(X.value.message), 1)])], 2)) : l("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-77c00620"]]);
//#endregion
export { k as default };

//# sourceMappingURL=WebhooksPage-Dxra5pj5.js.map