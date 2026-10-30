import { l as e, t, y as n } from "./client-pLl-rDdN.js";
import { r, t as ee } from "./webhooks-BE7i9Fhc.js";
import { t as te } from "./useToastStore-Bu-iYU7r.js";
import { t as ne } from "./Badge-C6LNO9Kk.js";
import { t as re } from "./PageHint-BlhPmafC.js";
import { t as i } from "./helpLinks-iarZuNmw.js";
import { t as a } from "./Button-1sKEdGjj.js";
import { t as o } from "./Modal-DZssaRh7.js";
import { t as ie } from "./Skeleton-B2Mt2L00.js";
import { t as s } from "./EmptyState-BjOJ1k_A.js";
import { n as c, t as ae } from "./Icon-CIbfiPrs.js";
import { a as oe, o as se } from "./plural-B3O2rVPV.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ce, normalizeClass as le, onMounted as ue, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, vModelDynamic as de, vModelText as C, withCtx as w, withDirectives as T, withModifiers as fe } from "vue";
// src/pages/admin/WebhooksPage.vue?vue&type=script&setup=true&lang.ts
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
}, Te = { class: "admin-webhooks__secret-row" }, E = ["type", "placeholder"], D = { class: "admin-webhooks__events" }, O = { class: "admin-webhooks__events-category-label" }, Ee = ["checked", "onChange"], De = { class: "admin-webhooks__checkbox-label" }, Oe = { class: "admin-webhooks__event-id" }, ke = {
	key: 0,
	class: "admin-webhooks__error",
	role: "alert"
}, Ae = {
	key: 0,
	role: "status",
	"aria-live": "polite"
}, je = {
	class: "admin-webhooks__test-icon",
	"aria-hidden": "true"
}, Me = { class: "admin-webhooks__test-status" }, Ne = { class: "admin-webhooks__test-message" }, k = /*#__PURE__*/ c(/* @__PURE__ */ _({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(c) {
		let _ = c, k = ce("apiBase", ""), Pe = u(() => typeof k == "string" ? k : k?.value ?? ""), A = new ee(_.client ?? new t({
			baseUrl: Pe.value,
			tokenStore: new e()
		})), j = te();
		function Fe(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let M = y([]), N = y(!0), P = y(null);
		async function F() {
			N.value = !0, P.value = null;
			try {
				M.value = await A.list();
			} catch (e) {
				P.value = n(e, "Failed to load webhooks."), j.error(P.value);
			} finally {
				N.value = !1;
			}
		}
		let I = y(!1), L = y(null), R = y(""), z = y(""), B = y(""), V = y(/* @__PURE__ */ new Set()), H = y(!1), U = y(!1), W = y(""), Ie = u(() => L.value ? "Edit webhook" : "Add webhook");
		function G() {
			L.value = null, R.value = "", z.value = "", B.value = "", V.value = /* @__PURE__ */ new Set(), H.value = !1, W.value = "", I.value = !0;
		}
		function Le(e) {
			L.value = e, R.value = e.name, z.value = e.url, B.value = "", V.value = new Set(e.events), H.value = !1, W.value = "", I.value = !0;
		}
		function K() {
			I.value = !1, L.value = null;
		}
		function Re(e) {
			let t = new Set(V.value);
			t.has(e) ? t.delete(e) : t.add(e), V.value = t;
		}
		async function q() {
			if (W.value = "", !R.value.trim()) W.value = "Name is required.";
			else if (!z.value.trim()) W.value = "URL is required.";
			else if (!Fe(z.value)) W.value = "URL must be a valid http:// or https:// URL.";
			else if (!L.value && !B.value.trim()) W.value = "Secret is required when creating a webhook.";
			else if (V.value.size === 0) W.value = "Select at least one event.";
			else {
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
					W.value = n(e, "Failed to save webhook.");
				} finally {
					U.value = !1;
				}
			}
		}
		let J = y(null);
		async function ze() {
			let e = J.value;
			if (e) try {
				await A.remove(e.id), j.success("Webhook deleted."), J.value = null, await F();
			} catch (e) {
				j.error(n(e, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = y(null), X = y(null), Z = y(!1), Be = u(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = u({
			get: () => Y.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Ve(e) {
			Y.value = e, X.value = null, Z.value = !0;
			try {
				let t = await A.test(e.id), n = t.success_count + t.failure_count, r = t.failure_count === 0 ? `Delivered successfully (${t.success_count}/${t.success_count} ${se(t.success_count, "webhook", "webhooks")})` : `Delivery failed — ${t.failure_count} of ${oe(n, "webhook", "webhooks")} failed`;
				X.value = {
					success: t.success,
					message: r
				};
			} catch (e) {
				X.value = {
					success: !1,
					message: n(e, "Failed to test webhook.")
				};
			} finally {
				Z.value = !1;
			}
		}
		function $() {
			Y.value = null, X.value = null;
		}
		return ue(F), (e, t) => (v(), p("section", pe, [
			m("header", me, [t[9] ||= m("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: w(() => [...t[8] ||= [h("Add webhook", -1)]]),
				_: 1
			})]),
			g(re, {
				links: S(i).webhooks.links,
				details: S(i).webhooks.details
			}, {
				default: w(() => [...t[10] ||= [
					h(" Send a POST to an external URL whenever chosen events happen on your server (for notifications or automations). ", -1),
					m("strong", null, "Add webhook", -1),
					h(" creates one — you give it a name, a URL, an optional signing secret, and tick the events to subscribe to. ", -1),
					m("strong", null, "Test", -1),
					h(" fires a sample payload so you can confirm it’s wired up correctly, and ", -1),
					m("strong", null, "Edit", -1),
					h(" / ", -1),
					m("strong", null, "Delete", -1),
					h(" update or remove an endpoint. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			N.value ? (v(), p("div", he, [g(ie, {
				variant: "text",
				lines: 6
			})])) : P.value ? (v(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load webhooks",
				description: P.value
			}, {
				actions: w(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: F
				}, {
					default: w(() => [...t[11] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (v(), d(s, {
				key: 2,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: w(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: w(() => [...t[12] ||= [h("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), p("table", ge, [t[16] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "URL"),
				m("th", { scope: "col" }, "Events"),
				m("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(v(!0), p(l, null, b(M.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, x(e.name), 1),
				m("td", _e, x(e.url), 1),
				m("td", null, [g(ne, {
					tone: "info",
					mono: ""
				}, {
					default: w(() => [h(x(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				m("td", null, [m("div", ve, [
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Le(e)
					}, {
						default: w(() => [...t[13] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Ve(e)
					}, {
						default: w(() => [...t[14] ||= [h(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: w(() => [...t[15] ||= [h(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			g(o, {
				modelValue: I.value,
				"onUpdate:modelValue": t[4] ||= (e) => I.value = e,
				title: Ie.value,
				size: "lg",
				onClose: K
			}, {
				footer: w(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: w(() => [...t[21] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: q
				}, {
					default: w(() => [h(x(L.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [m("form", {
					class: "admin-webhooks__form",
					onSubmit: fe(q, ["prevent"])
				}, [
					m("label", ye, [t[17] ||= m("span", { class: "admin-webhooks__label" }, "Name", -1), T(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[C, R.value]])]),
					m("label", be, [t[18] ||= m("span", { class: "admin-webhooks__label" }, "URL", -1), T(m("input", {
						"onUpdate:modelValue": t[1] ||= (e) => z.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[C, z.value]])]),
					m("div", xe, [
						m("span", Se, [t[19] ||= h(" Secret", -1), L.value ? f("", !0) : (v(), p("span", Ce, " *"))]),
						L.value ? (v(), p("p", we, "Leave blank to keep the current secret.")) : f("", !0),
						m("div", Te, [T(m("input", {
							"onUpdate:modelValue": t[2] ||= (e) => B.value = e,
							type: H.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other",
							placeholder: L.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, E), [[de, B.value]]), g(a, {
							variant: "outline",
							size: "sm",
							"left-icon": H.value ? "eye-off" : "eye",
							"aria-label": H.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => H.value = !H.value
						}, {
							default: w(() => [h(x(H.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					m("fieldset", D, [t[20] ||= m("legend", { class: "admin-webhooks__label" }, [h("Events"), m("span", { "aria-hidden": "true" }, " *")], -1), (v(!0), p(l, null, b(S(r), (e) => (v(), p("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [m("span", O, x(e.label), 1), (v(!0), p(l, null, b(e.events, (e) => (v(), p("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						m("input", {
							type: "checkbox",
							checked: V.value.has(e.id),
							onChange: (t) => Re(e.id)
						}, null, 40, Ee),
						m("span", De, x(e.label), 1),
						m("span", Oe, x(e.id), 1)
					]))), 128))]))), 128))]),
					W.value ? (v(), p("p", ke, x(W.value), 1)) : f("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			g(o, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => J.value = null
			}, {
				footer: w(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => J.value = null
				}, {
					default: w(() => [...t[24] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "danger",
					size: "sm",
					onClick: ze
				}, {
					default: w(() => [...t[25] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: w(() => [m("p", null, [
					t[22] ||= h(" Delete webhook ", -1),
					m("strong", null, x(J.value?.name), 1),
					t[23] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(o, {
				modelValue: Q.value,
				"onUpdate:modelValue": t[7] ||= (e) => Q.value = e,
				title: Be.value
			}, {
				footer: w(() => [g(a, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: w(() => [...t[26] ||= [h("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: w(() => [Z.value ? (v(), p("p", Ae, "Sending test payload…")) : X.value ? (v(), p("div", {
					key: 1,
					class: le(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [m("span", je, [g(ae, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), m("div", null, [m("p", Me, x(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), m("p", Ne, x(X.value.message), 1)])], 2)) : f("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-1323c3bd"]]);
export { k as default };

//# sourceMappingURL=WebhooksPage-BqJKN20I.js.map