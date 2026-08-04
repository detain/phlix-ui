import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CfPSBsz2.js";
import { a as n, o as ee } from "./plural-DMM7pLFA.js";
import { l as r, p as i, t as te } from "./client-COHWZ2KC.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DuTfRWnu.js";
import { t as o } from "./Badge-C8wuGrO0.js";
import { t as s } from "./Modal-DRyCYCuK.js";
import { t as re } from "./Skeleton-jlFj-j5t.js";
import { t as c } from "./EmptyState-DERkIIRd.js";
import { t as ie } from "./PageHint-DVe81aMu.js";
import { r as ae, t as oe } from "./webhooks-BBTLnFKm.js";
import { t as l } from "./helpLinks-BI4oN4Or.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as se, normalizeClass as ce, onMounted as le, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, vModelDynamic as ue, vModelText as w, withCtx as T, withDirectives as E, withModifiers as de } from "vue";
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
}, Ce = {
	key: 0,
	class: "admin-webhooks__hint"
}, we = { class: "admin-webhooks__secret-row" }, Te = ["type", "placeholder"], D = { class: "admin-webhooks__events" }, O = { class: "admin-webhooks__events-category-label" }, Ee = ["checked", "onChange"], De = { class: "admin-webhooks__checkbox-label" }, Oe = { class: "admin-webhooks__event-id" }, ke = {
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
}, Me = { class: "admin-webhooks__test-status" }, Ne = { class: "admin-webhooks__test-message" }, k = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(e) {
		let v = e, k = se("apiBase", ""), Pe = d(() => typeof k == "string" ? k : k?.value ?? ""), A = new oe(v.client ?? new te({
			baseUrl: Pe.value,
			tokenStore: new r()
		})), j = ne();
		function Fe(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let M = b([]), N = b(!0), P = b(null);
		async function F() {
			N.value = !0, P.value = null;
			try {
				M.value = await A.list();
			} catch (e) {
				P.value = i(e, "Failed to load webhooks."), j.error(P.value);
			} finally {
				N.value = !1;
			}
		}
		let I = b(!1), L = b(null), R = b(""), z = b(""), B = b(""), V = b(/* @__PURE__ */ new Set()), H = b(!1), U = b(!1), W = b(""), Ie = d(() => L.value ? "Edit webhook" : "Add webhook");
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
			if (W.value = "", !R.value.trim()) {
				W.value = "Name is required.";
				return;
			}
			if (!z.value.trim()) {
				W.value = "URL is required.";
				return;
			}
			if (!Fe(z.value)) {
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
				W.value = i(e, "Failed to save webhook.");
			} finally {
				U.value = !1;
			}
		}
		let J = b(null);
		async function ze() {
			let e = J.value;
			if (e) try {
				await A.remove(e.id), j.success("Webhook deleted."), J.value = null, await F();
			} catch (e) {
				j.error(i(e, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = b(null), X = b(null), Z = b(!1), Be = d(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = d({
			get: () => Y.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Ve(e) {
			Y.value = e, X.value = null, Z.value = !0;
			try {
				let t = await A.test(e.id), r = t.success_count + t.failure_count, i = t.failure_count === 0 ? `Delivered successfully (${t.success_count}/${t.success_count} ${ee(t.success_count, "webhook", "webhooks")})` : `Delivery failed — ${t.failure_count} of ${n(r, "webhook", "webhooks")} failed`;
				X.value = {
					success: t.success,
					message: i
				};
			} catch (e) {
				X.value = {
					success: !1,
					message: i(e, "Failed to test webhook.")
				};
			} finally {
				Z.value = !1;
			}
		}
		function $() {
			Y.value = null, X.value = null;
		}
		return le(F), (e, n) => (y(), m("section", fe, [
			h("header", pe, [n[9] ||= h("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), _(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: T(() => [...n[8] ||= [g("Add webhook", -1)]]),
				_: 1
			})]),
			_(ie, {
				links: C(l).webhooks.links,
				details: C(l).webhooks.details
			}, {
				default: T(() => [...n[10] ||= [
					g(" Send a POST to an external URL whenever chosen events happen on your server (for notifications or automations). ", -1),
					h("strong", null, "Add webhook", -1),
					g(" creates one — you give it a name, a URL, an optional signing secret, and tick the events to subscribe to. ", -1),
					h("strong", null, "Test", -1),
					g(" fires a sample payload so you can confirm it's wired up correctly, and ", -1),
					h("strong", null, "Edit", -1),
					g(" / ", -1),
					h("strong", null, "Delete", -1),
					g(" update or remove an endpoint. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			N.value ? (y(), m("div", me, [_(re, {
				variant: "text",
				lines: 6
			})])) : P.value ? (y(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load webhooks",
				description: P.value
			}, {
				actions: T(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: F
				}, {
					default: T(() => [...n[11] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (y(), f(c, {
				key: 2,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: T(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: T(() => [...n[12] ||= [g("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (y(), m("table", he, [n[16] ||= h("thead", null, [h("tr", null, [
				h("th", { scope: "col" }, "Name"),
				h("th", { scope: "col" }, "URL"),
				h("th", { scope: "col" }, "Events"),
				h("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), h("tbody", null, [(y(!0), m(u, null, x(M.value, (e) => (y(), m("tr", { key: e.id }, [
				h("td", null, S(e.name), 1),
				h("td", ge, S(e.url), 1),
				h("td", null, [_(o, {
					tone: "info",
					mono: ""
				}, {
					default: T(() => [g(S(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				h("td", null, [h("div", _e, [
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Le(e)
					}, {
						default: T(() => [...n[13] ||= [g(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Ve(e)
					}, {
						default: T(() => [...n[14] ||= [g(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: T(() => [...n[15] ||= [g(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			_(s, {
				modelValue: I.value,
				"onUpdate:modelValue": n[4] ||= (e) => I.value = e,
				title: Ie.value,
				size: "lg",
				onClose: K
			}, {
				footer: T(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: T(() => [...n[21] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: q
				}, {
					default: T(() => [g(S(L.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: T(() => [h("form", {
					class: "admin-webhooks__form",
					onSubmit: de(q, ["prevent"])
				}, [
					h("label", ve, [n[17] ||= h("span", { class: "admin-webhooks__label" }, "Name", -1), E(h("input", {
						"onUpdate:modelValue": n[0] ||= (e) => R.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[w, R.value]])]),
					h("label", ye, [n[18] ||= h("span", { class: "admin-webhooks__label" }, "URL", -1), E(h("input", {
						"onUpdate:modelValue": n[1] ||= (e) => z.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[w, z.value]])]),
					h("div", be, [
						h("span", xe, [n[19] ||= g(" Secret", -1), L.value ? p("", !0) : (y(), m("span", Se, " *"))]),
						L.value ? (y(), m("p", Ce, "Leave blank to keep the current secret.")) : p("", !0),
						h("div", we, [E(h("input", {
							"onUpdate:modelValue": n[2] ||= (e) => B.value = e,
							type: H.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other",
							placeholder: L.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, Te), [[ue, B.value]]), _(a, {
							variant: "outline",
							size: "sm",
							"left-icon": H.value ? "eye-off" : "eye",
							"aria-label": H.value ? "Hide secret" : "Show secret",
							onClick: n[3] ||= (e) => H.value = !H.value
						}, {
							default: T(() => [g(S(H.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					h("fieldset", D, [n[20] ||= h("legend", { class: "admin-webhooks__label" }, [g("Events"), h("span", { "aria-hidden": "true" }, " *")], -1), (y(!0), m(u, null, x(C(ae), (e) => (y(), m("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [h("span", O, S(e.label), 1), (y(!0), m(u, null, x(e.events, (e) => (y(), m("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						h("input", {
							type: "checkbox",
							checked: V.value.has(e.id),
							onChange: (t) => Re(e.id)
						}, null, 40, Ee),
						h("span", De, S(e.label), 1),
						h("span", Oe, S(e.id), 1)
					]))), 128))]))), 128))]),
					W.value ? (y(), m("p", ke, S(W.value), 1)) : p("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			_(s, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => J.value = null
			}, {
				footer: T(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => J.value = null
				}, {
					default: T(() => [...n[24] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					onClick: ze
				}, {
					default: T(() => [...n[25] ||= [g("Delete", -1)]]),
					_: 1
				})]),
				default: T(() => [h("p", null, [
					n[22] ||= g(" Delete webhook ", -1),
					h("strong", null, S(J.value?.name), 1),
					n[23] ||= g("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(s, {
				modelValue: Q.value,
				"onUpdate:modelValue": n[7] ||= (e) => Q.value = e,
				title: Be.value
			}, {
				footer: T(() => [_(a, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: T(() => [...n[26] ||= [g("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: T(() => [Z.value ? (y(), m("p", Ae, "Sending test payload…")) : X.value ? (y(), m("div", {
					key: 1,
					class: ce(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [h("span", je, [_(t, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), h("div", null, [h("p", Me, S(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), h("p", Ne, S(X.value.message), 1)])], 2)) : p("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-b63441e6"]]);
//#endregion
export { k as default };

//# sourceMappingURL=WebhooksPage-JlQWlV_3.js.map