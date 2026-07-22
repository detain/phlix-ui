import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { c as n, f as r, t as ee } from "./client-BzWwyWKr.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as ne } from "./Badge-B6MgOwKQ.js";
import { t as a } from "./Modal-aFganlu3.js";
import { t as re } from "./Skeleton-DhQmxeNg.js";
import { t as o } from "./EmptyState-ZlI5t4KT.js";
import { t as ie } from "./PageHint-BoAlFFBN.js";
import { r as ae, t as oe } from "./webhooks-BBTLnFKm.js";
import { t as s } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as se, normalizeClass as ce, onMounted as le, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as x, vModelDynamic as ue, vModelText as S, withCtx as C, withDirectives as w, withModifiers as de } from "vue";
//#region src/pages/admin/WebhooksPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-webhooks",
	"aria-labelledby": "webhooks-heading"
}, pe = { class: "admin-webhooks__head" }, me = {
	key: 0,
	class: "admin-webhooks__skel"
}, he = {
	key: 3,
	class: "admin-webhooks__table",
	"aria-label": "Webhooks"
}, ge = { class: "admin-webhooks__url" }, _e = { class: "admin-webhooks__actions" }, ve = { class: "admin-webhooks__field" }, ye = { class: "admin-webhooks__field" }, be = { class: "admin-webhooks__field" }, xe = { class: "admin-webhooks__label" }, Se = {
	key: 0,
	"aria-hidden": "true"
}, T = {
	key: 0,
	class: "admin-webhooks__hint"
}, Ce = { class: "admin-webhooks__secret-row" }, we = ["type", "placeholder"], Te = { class: "admin-webhooks__events" }, E = { class: "admin-webhooks__events-category-label" }, D = ["checked", "onChange"], O = { class: "admin-webhooks__checkbox-label" }, Ee = { class: "admin-webhooks__event-id" }, De = {
	key: 0,
	class: "admin-webhooks__error",
	role: "alert"
}, Oe = {
	key: 0,
	role: "status",
	"aria-live": "polite"
}, ke = {
	class: "admin-webhooks__test-icon",
	"aria-hidden": "true"
}, Ae = { class: "admin-webhooks__test-status" }, je = { class: "admin-webhooks__test-message" }, k = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(e) {
		let g = e, k = se("apiBase", ""), Me = l(() => typeof k == "string" ? k : k?.value ?? ""), A = new oe(g.client ?? new ee({
			baseUrl: Me.value,
			tokenStore: new n()
		})), j = te();
		function Ne(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let M = v([]), N = v(!0), P = v(null);
		async function F() {
			N.value = !0, P.value = null;
			try {
				M.value = await A.list();
			} catch (e) {
				P.value = r(e, "Failed to load webhooks."), j.error(P.value);
			} finally {
				N.value = !1;
			}
		}
		let I = v(!1), L = v(null), R = v(""), z = v(""), B = v(""), V = v(/* @__PURE__ */ new Set()), H = v(!1), U = v(!1), W = v(""), Pe = l(() => L.value ? "Edit webhook" : "Add webhook");
		function G() {
			L.value = null, R.value = "", z.value = "", B.value = "", V.value = /* @__PURE__ */ new Set(), H.value = !1, W.value = "", I.value = !0;
		}
		function Fe(e) {
			L.value = e, R.value = e.name, z.value = e.url, B.value = "", V.value = new Set(e.events), H.value = !1, W.value = "", I.value = !0;
		}
		function K() {
			I.value = !1, L.value = null;
		}
		function Ie(e) {
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
			if (!Ne(z.value)) {
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
				W.value = r(e, "Failed to save webhook.");
			} finally {
				U.value = !1;
			}
		}
		let J = v(null);
		async function Le() {
			let e = J.value;
			if (e) try {
				await A.remove(e.id), j.success("Webhook deleted."), J.value = null, await F();
			} catch (e) {
				j.error(r(e, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = v(null), X = v(null), Z = v(!1), Re = l(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = l({
			get: () => Y.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function ze(e) {
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
					message: r(e, "Failed to test webhook.")
				};
			} finally {
				Z.value = !1;
			}
		}
		function $() {
			Y.value = null, X.value = null;
		}
		return le(F), (e, n) => (_(), f("section", fe, [
			p("header", pe, [n[9] ||= p("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: C(() => [...n[8] ||= [m("Add webhook", -1)]]),
				_: 1
			})]),
			h(ie, {
				links: x(s).webhooks.links,
				details: x(s).webhooks.details
			}, {
				default: C(() => [...n[10] ||= [
					m(" Send a POST to an external URL whenever chosen events happen on your server (for notifications or automations). ", -1),
					p("strong", null, "Add webhook", -1),
					m(" creates one — you give it a name, a URL, an optional signing secret, and tick the events to subscribe to. ", -1),
					p("strong", null, "Test", -1),
					m(" fires a sample payload so you can confirm it's wired up correctly, and ", -1),
					p("strong", null, "Edit", -1),
					m(" / ", -1),
					p("strong", null, "Delete", -1),
					m(" update or remove an endpoint. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			N.value ? (_(), f("div", me, [h(re, {
				variant: "text",
				lines: 6
			})])) : P.value ? (_(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load webhooks",
				description: P.value
			}, {
				actions: C(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: F
				}, {
					default: C(() => [...n[11] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (_(), u(o, {
				key: 2,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: C(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: C(() => [...n[12] ||= [m("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", he, [n[16] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "URL"),
				p("th", { scope: "col" }, "Events"),
				p("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(_(!0), f(c, null, y(M.value, (e) => (_(), f("tr", { key: e.id }, [
				p("td", null, b(e.name), 1),
				p("td", ge, b(e.url), 1),
				p("td", null, [h(ne, {
					tone: "info",
					mono: ""
				}, {
					default: C(() => [m(b(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				p("td", null, [p("div", _e, [
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Fe(e)
					}, {
						default: C(() => [...n[13] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => ze(e)
					}, {
						default: C(() => [...n[14] ||= [m(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: C(() => [...n[15] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			h(a, {
				modelValue: I.value,
				"onUpdate:modelValue": n[4] ||= (e) => I.value = e,
				title: Pe.value,
				size: "lg",
				onClose: K
			}, {
				footer: C(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: C(() => [...n[21] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: q
				}, {
					default: C(() => [m(b(L.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [p("form", {
					class: "admin-webhooks__form",
					onSubmit: de(q, ["prevent"])
				}, [
					p("label", ve, [n[17] ||= p("span", { class: "admin-webhooks__label" }, "Name", -1), w(p("input", {
						"onUpdate:modelValue": n[0] ||= (e) => R.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[S, R.value]])]),
					p("label", ye, [n[18] ||= p("span", { class: "admin-webhooks__label" }, "URL", -1), w(p("input", {
						"onUpdate:modelValue": n[1] ||= (e) => z.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[S, z.value]])]),
					p("div", be, [
						p("span", xe, [n[19] ||= m(" Secret", -1), L.value ? d("", !0) : (_(), f("span", Se, " *"))]),
						L.value ? (_(), f("p", T, "Leave blank to keep the current secret.")) : d("", !0),
						p("div", Ce, [w(p("input", {
							"onUpdate:modelValue": n[2] ||= (e) => B.value = e,
							type: H.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: L.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, we), [[ue, B.value]]), h(i, {
							variant: "outline",
							size: "sm",
							"left-icon": H.value ? "eye-off" : "eye",
							"aria-label": H.value ? "Hide secret" : "Show secret",
							onClick: n[3] ||= (e) => H.value = !H.value
						}, {
							default: C(() => [m(b(H.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					p("fieldset", Te, [n[20] ||= p("legend", { class: "admin-webhooks__label" }, [m("Events"), p("span", { "aria-hidden": "true" }, " *")], -1), (_(!0), f(c, null, y(x(ae), (e) => (_(), f("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [p("span", E, b(e.label), 1), (_(!0), f(c, null, y(e.events, (e) => (_(), f("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						p("input", {
							type: "checkbox",
							checked: V.value.has(e.id),
							onChange: (t) => Ie(e.id)
						}, null, 40, D),
						p("span", O, b(e.label), 1),
						p("span", Ee, b(e.id), 1)
					]))), 128))]))), 128))]),
					W.value ? (_(), f("p", De, b(W.value), 1)) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(a, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => J.value = null
			}, {
				footer: C(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => J.value = null
				}, {
					default: C(() => [...n[24] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: Le
				}, {
					default: C(() => [...n[25] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [p("p", null, [
					n[22] ||= m(" Delete webhook ", -1),
					p("strong", null, b(J.value?.name), 1),
					n[23] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(a, {
				modelValue: Q.value,
				"onUpdate:modelValue": n[7] ||= (e) => Q.value = e,
				title: Re.value
			}, {
				footer: C(() => [h(i, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: C(() => [...n[26] ||= [m("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: C(() => [Z.value ? (_(), f("p", Oe, "Sending test payload…")) : X.value ? (_(), f("div", {
					key: 1,
					class: ce(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [p("span", ke, [h(t, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), p("div", null, [p("p", Ae, b(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), p("p", je, b(X.value.message), 1)])], 2)) : d("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-0d03d15b"]]);
//#endregion
export { k as default };

//# sourceMappingURL=WebhooksPage-DEZlODrA.js.map