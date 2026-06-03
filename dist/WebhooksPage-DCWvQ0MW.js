import { c as e, d as t, n, t as r, u as ee } from "./Button-C4PyCjLX.js";
import { t as te } from "./tokenStore-CGMYSpg6.js";
import { t as ne } from "./Badge-D9Tdn6WP.js";
import { t as i } from "./Modal-DLVWGUN9.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { n as ie, t as a } from "./EmptyState-BEMIpc2l.js";
import { r as ae, t as oe } from "./webhooks-BBTLnFKm.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as se, normalizeClass as ce, onMounted as le, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as ue, vModelDynamic as de, vModelText as y, withCtx as b, withDirectives as x, withModifiers as fe } from "vue";
//#region src/pages/admin/WebhooksPage.vue?vue&type=script&setup=true&lang.ts
var pe = {
	class: "admin-webhooks",
	"aria-labelledby": "webhooks-heading"
}, me = { class: "admin-webhooks__head" }, he = {
	key: 0,
	class: "admin-webhooks__skel"
}, ge = {
	key: 3,
	class: "admin-webhooks__table",
	"aria-label": "Webhooks"
}, _e = { class: "admin-webhooks__url" }, ve = { class: "admin-webhooks__actions" }, ye = { class: "admin-webhooks__field" }, be = { class: "admin-webhooks__field" }, xe = { class: "admin-webhooks__field" }, Se = { class: "admin-webhooks__label" }, Ce = {
	key: 0,
	"aria-hidden": "true"
}, we = {
	key: 0,
	class: "admin-webhooks__hint"
}, Te = { class: "admin-webhooks__secret-row" }, Ee = ["type", "placeholder"], S = { class: "admin-webhooks__events" }, C = { class: "admin-webhooks__events-category-label" }, w = ["checked", "onChange"], T = { class: "admin-webhooks__checkbox-label" }, E = { class: "admin-webhooks__event-id" }, D = {
	key: 0,
	class: "admin-webhooks__error",
	role: "alert"
}, De = {
	key: 0,
	role: "status",
	"aria-live": "polite"
}, Oe = {
	class: "admin-webhooks__test-icon",
	"aria-hidden": "true"
}, ke = { class: "admin-webhooks__test-status" }, Ae = { class: "admin-webhooks__test-message" }, O = /*#__PURE__*/ t(/* @__PURE__ */ m({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(t) {
		let m = t, O = se("apiBase", ""), je = s(() => typeof O == "string" ? O : O?.value ?? ""), k = new oe(m.client ?? new n({
			baseUrl: je.value,
			tokenStore: new te()
		})), A = re();
		function Me(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let j = g([]), M = g(!0), N = g(null);
		async function P() {
			M.value = !0, N.value = null;
			try {
				j.value = await k.list();
			} catch (t) {
				N.value = e(t, "Failed to load webhooks."), A.error(N.value);
			} finally {
				M.value = !1;
			}
		}
		let F = g(!1), I = g(null), L = g(""), R = g(""), z = g(""), B = g(/* @__PURE__ */ new Set()), V = g(!1), H = g(!1), U = g(""), Ne = s(() => I.value ? "Edit webhook" : "Add webhook");
		function W() {
			I.value = null, L.value = "", R.value = "", z.value = "", B.value = /* @__PURE__ */ new Set(), V.value = !1, U.value = "", F.value = !0;
		}
		function Pe(e) {
			I.value = e, L.value = e.name, R.value = e.url, z.value = "", B.value = new Set(e.events), V.value = !1, U.value = "", F.value = !0;
		}
		function G() {
			F.value = !1, I.value = null;
		}
		function K(e) {
			let t = new Set(B.value);
			t.has(e) ? t.delete(e) : t.add(e), B.value = t;
		}
		async function q() {
			if (U.value = "", !L.value.trim()) {
				U.value = "Name is required.";
				return;
			}
			if (!R.value.trim()) {
				U.value = "URL is required.";
				return;
			}
			if (!Me(R.value)) {
				U.value = "URL must be a valid http:// or https:// URL.";
				return;
			}
			if (!I.value && !z.value.trim()) {
				U.value = "Secret is required when creating a webhook.";
				return;
			}
			if (B.value.size === 0) {
				U.value = "Select at least one event.";
				return;
			}
			H.value = !0;
			try {
				let e = I.value;
				if (e) {
					let t = {
						name: L.value.trim(),
						url: R.value.trim(),
						events: Array.from(B.value)
					};
					z.value.trim() && (t.secret = z.value), await k.update(e.id, t), A.success("Webhook updated.");
				} else await k.create({
					name: L.value.trim(),
					url: R.value.trim(),
					secret: z.value,
					events: Array.from(B.value)
				}), A.success("Webhook created.");
				G(), await P();
			} catch (t) {
				U.value = e(t, "Failed to save webhook.");
			} finally {
				H.value = !1;
			}
		}
		let J = g(null);
		async function Fe() {
			let t = J.value;
			if (t) try {
				await k.remove(t.id), A.success("Webhook deleted."), J.value = null, await P();
			} catch (t) {
				A.error(e(t, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = g(null), X = g(null), Z = g(!1), Ie = s(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = s({
			get: () => Y.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Le(t) {
			Y.value = t, X.value = null, Z.value = !0;
			try {
				let e = await k.test(t.id), n = e.success_count + e.failure_count, r = e.failure_count === 0 ? `Delivered successfully (${e.success_count}/${e.success_count} webhooks)` : `Delivery failed — ${e.failure_count} of ${n} webhook(s) failed`;
				X.value = {
					success: e.success,
					message: r
				};
			} catch (t) {
				X.value = {
					success: !1,
					message: e(t, "Failed to test webhook.")
				};
			} finally {
				Z.value = !1;
			}
		}
		function $() {
			Y.value = null, X.value = null;
		}
		return le(P), (e, t) => (h(), u("section", pe, [
			d("header", me, [t[9] ||= d("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), p(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: W
			}, {
				default: b(() => [...t[8] ||= [f("Add webhook", -1)]]),
				_: 1
			})]),
			M.value ? (h(), u("div", he, [p(ie, {
				variant: "text",
				lines: 6
			})])) : N.value ? (h(), c(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load webhooks",
				description: N.value
			}, {
				actions: b(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: b(() => [...t[10] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (h(), c(a, {
				key: 2,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: b(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: W
				}, {
					default: b(() => [...t[11] ||= [f("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), u("table", ge, [t[15] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Name"),
				d("th", { scope: "col" }, "URL"),
				d("th", { scope: "col" }, "Events"),
				d("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(h(!0), u(o, null, _(j.value, (e) => (h(), u("tr", { key: e.id }, [
				d("td", null, v(e.name), 1),
				d("td", _e, v(e.url), 1),
				d("td", null, [p(ne, {
					tone: "info",
					mono: ""
				}, {
					default: b(() => [f(v(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				d("td", null, [d("div", ve, [
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Pe(e)
					}, {
						default: b(() => [...t[12] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Le(e)
					}, {
						default: b(() => [...t[13] ||= [f(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: b(() => [...t[14] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			p(i, {
				modelValue: F.value,
				"onUpdate:modelValue": t[4] ||= (e) => F.value = e,
				title: Ne.value,
				size: "lg",
				onClose: G
			}, {
				footer: b(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: G
				}, {
					default: b(() => [...t[20] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					loading: H.value,
					onClick: q
				}, {
					default: b(() => [f(v(I.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [d("form", {
					class: "admin-webhooks__form",
					onSubmit: fe(q, ["prevent"])
				}, [
					d("label", ye, [t[16] ||= d("span", { class: "admin-webhooks__label" }, "Name", -1), x(d("input", {
						"onUpdate:modelValue": t[0] ||= (e) => L.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[y, L.value]])]),
					d("label", be, [t[17] ||= d("span", { class: "admin-webhooks__label" }, "URL", -1), x(d("input", {
						"onUpdate:modelValue": t[1] ||= (e) => R.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[y, R.value]])]),
					d("div", xe, [
						d("span", Se, [t[18] ||= f(" Secret", -1), I.value ? l("", !0) : (h(), u("span", Ce, " *"))]),
						I.value ? (h(), u("p", we, "Leave blank to keep the current secret.")) : l("", !0),
						d("div", Te, [x(d("input", {
							"onUpdate:modelValue": t[2] ||= (e) => z.value = e,
							type: V.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: I.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, Ee), [[de, z.value]]), p(r, {
							variant: "outline",
							size: "sm",
							"left-icon": V.value ? "eye-off" : "eye",
							"aria-label": V.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => V.value = !V.value
						}, {
							default: b(() => [f(v(V.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					d("fieldset", S, [t[19] ||= d("legend", { class: "admin-webhooks__label" }, [f("Events"), d("span", { "aria-hidden": "true" }, " *")], -1), (h(!0), u(o, null, _(ue(ae), (e) => (h(), u("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [d("span", C, v(e.label), 1), (h(!0), u(o, null, _(e.events, (e) => (h(), u("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						d("input", {
							type: "checkbox",
							checked: B.value.has(e.id),
							onChange: (t) => K(e.id)
						}, null, 40, w),
						d("span", T, v(e.label), 1),
						d("span", E, v(e.id), 1)
					]))), 128))]))), 128))]),
					U.value ? (h(), u("p", D, v(U.value), 1)) : l("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(i, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => J.value = null
			}, {
				footer: b(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => J.value = null
				}, {
					default: b(() => [...t[23] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					onClick: Fe
				}, {
					default: b(() => [...t[24] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [d("p", null, [
					t[21] ||= f(" Delete webhook ", -1),
					d("strong", null, v(J.value?.name), 1),
					t[22] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(i, {
				modelValue: Q.value,
				"onUpdate:modelValue": t[7] ||= (e) => Q.value = e,
				title: Ie.value
			}, {
				footer: b(() => [p(r, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: b(() => [...t[25] ||= [f("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: b(() => [Z.value ? (h(), u("p", De, "Sending test payload…")) : X.value ? (h(), u("div", {
					key: 1,
					class: ce(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [d("span", Oe, [p(ee, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), d("div", null, [d("p", ke, v(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), d("p", Ae, v(X.value.message), 1)])], 2)) : l("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-7d4dd04e"]]);
//#endregion
export { O as default };

//# sourceMappingURL=WebhooksPage-DCWvQ0MW.js.map