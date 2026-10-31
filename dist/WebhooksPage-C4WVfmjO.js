import { t as e, x as t } from "./client-57OweUrJ.js";
import { r as n, t as r } from "./webhooks-BBgaPIKz.js";
import { t as ee } from "./useToastStore-Bu-iYU7r.js";
import { t as te } from "./Badge-C6LNO9Kk.js";
import { t as ne } from "./PageHint-BlhPmafC.js";
import { t as i } from "./helpLinks-iarZuNmw.js";
import { t as a } from "./Button-1sKEdGjj.js";
import { t as o } from "./Modal-BU4hJGBA.js";
import { t as re } from "./Skeleton-B2Mt2L00.js";
import { t as s } from "./EmptyState-BjOJ1k_A.js";
import { n as c, t as ie } from "./Icon-CIbfiPrs.js";
import { a as ae, o as oe } from "./plural-B3O2rVPV.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as se, normalizeClass as ce, onMounted as le, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, vModelDynamic as ue, vModelText as C, withCtx as w, withDirectives as T, withModifiers as de } from "vue";
// src/pages/admin/WebhooksPage.vue?vue&type=script&setup=true&lang.ts
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
}, we = { class: "admin-webhooks__secret-row" }, Te = ["type", "placeholder"], Ee = { class: "admin-webhooks__events" }, E = { class: "admin-webhooks__events-category-label" }, D = ["checked", "onChange"], De = { class: "admin-webhooks__checkbox-label" }, Oe = { class: "admin-webhooks__event-id" }, ke = {
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
}, Me = { class: "admin-webhooks__test-status" }, Ne = { class: "admin-webhooks__test-message" }, O = /*#__PURE__*/ c(/* @__PURE__ */ _({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(c) {
		let _ = c, O = se("apiBase", ""), Pe = u(() => typeof O == "string" ? O : O?.value ?? ""), k = new r(_.client ?? new e({ baseUrl: Pe.value })), A = ee();
		function Fe(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let j = y([]), M = y(!0), N = y(null);
		async function P() {
			M.value = !0, N.value = null;
			try {
				j.value = await k.list();
			} catch (e) {
				N.value = t(e, "Failed to load webhooks."), A.error(N.value);
			} finally {
				M.value = !1;
			}
		}
		let F = y(!1), I = y(null), L = y(""), R = y(""), z = y(""), B = y(/* @__PURE__ */ new Set()), V = y(!1), H = y(!1), U = y(""), Ie = u(() => I.value ? "Edit webhook" : "Add webhook");
		function W() {
			I.value = null, L.value = "", R.value = "", z.value = "", B.value = /* @__PURE__ */ new Set(), V.value = !1, U.value = "", F.value = !0;
		}
		function G(e) {
			I.value = e, L.value = e.name, R.value = e.url, z.value = "", B.value = new Set(e.events), V.value = !1, U.value = "", F.value = !0;
		}
		function K() {
			F.value = !1, I.value = null;
		}
		function Le(e) {
			let t = new Set(B.value);
			t.has(e) ? t.delete(e) : t.add(e), B.value = t;
		}
		async function q() {
			if (U.value = "", !L.value.trim()) U.value = "Name is required.";
			else if (!R.value.trim()) U.value = "URL is required.";
			else if (!Fe(R.value)) U.value = "URL must be a valid http:// or https:// URL.";
			else if (!I.value && !z.value.trim()) U.value = "Secret is required when creating a webhook.";
			else if (B.value.size === 0) U.value = "Select at least one event.";
			else {
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
					K(), await P();
				} catch (e) {
					U.value = t(e, "Failed to save webhook.");
				} finally {
					H.value = !1;
				}
			}
		}
		let J = y(null);
		async function Re() {
			let e = J.value;
			if (e) try {
				await k.remove(e.id), A.success("Webhook deleted."), J.value = null, await P();
			} catch (e) {
				A.error(t(e, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = y(null), X = y(null), Z = y(!1), ze = u(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = u({
			get: () => Y.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Be(e) {
			Y.value = e, X.value = null, Z.value = !0;
			try {
				let t = await k.test(e.id), n = t.success_count + t.failure_count, r = t.failure_count === 0 ? `Delivered successfully (${t.success_count}/${t.success_count} ${oe(t.success_count, "webhook", "webhooks")})` : `Delivery failed — ${t.failure_count} of ${ae(n, "webhook", "webhooks")} failed`;
				X.value = {
					success: t.success,
					message: r
				};
			} catch (e) {
				X.value = {
					success: !1,
					message: t(e, "Failed to test webhook.")
				};
			} finally {
				Z.value = !1;
			}
		}
		function $() {
			Y.value = null, X.value = null;
		}
		return le(P), (e, t) => (v(), p("section", fe, [
			m("header", pe, [t[9] ||= m("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: W
			}, {
				default: w(() => [...t[8] ||= [h("Add webhook", -1)]]),
				_: 1
			})]),
			g(ne, {
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
			M.value ? (v(), p("div", me, [g(re, {
				variant: "text",
				lines: 6
			})])) : N.value ? (v(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load webhooks",
				description: N.value
			}, {
				actions: w(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: w(() => [...t[11] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (v(), d(s, {
				key: 2,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: w(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: W
				}, {
					default: w(() => [...t[12] ||= [h("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), p("table", he, [t[16] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "URL"),
				m("th", { scope: "col" }, "Events"),
				m("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(v(!0), p(l, null, b(j.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, x(e.name), 1),
				m("td", ge, x(e.url), 1),
				m("td", null, [g(te, {
					tone: "info",
					mono: ""
				}, {
					default: w(() => [h(x(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				m("td", null, [m("div", _e, [
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => G(e)
					}, {
						default: w(() => [...t[13] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Be(e)
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
				modelValue: F.value,
				"onUpdate:modelValue": t[4] ||= (e) => F.value = e,
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
					loading: H.value,
					onClick: q
				}, {
					default: w(() => [h(x(I.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [m("form", {
					class: "admin-webhooks__form",
					onSubmit: de(q, ["prevent"])
				}, [
					m("label", ve, [t[17] ||= m("span", { class: "admin-webhooks__label" }, "Name", -1), T(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => L.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[C, L.value]])]),
					m("label", ye, [t[18] ||= m("span", { class: "admin-webhooks__label" }, "URL", -1), T(m("input", {
						"onUpdate:modelValue": t[1] ||= (e) => R.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[C, R.value]])]),
					m("div", be, [
						m("span", xe, [t[19] ||= h(" Secret", -1), I.value ? f("", !0) : (v(), p("span", Se, " *"))]),
						I.value ? (v(), p("p", Ce, "Leave blank to keep the current secret.")) : f("", !0),
						m("div", we, [T(m("input", {
							"onUpdate:modelValue": t[2] ||= (e) => z.value = e,
							type: V.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other",
							placeholder: I.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, Te), [[ue, z.value]]), g(a, {
							variant: "outline",
							size: "sm",
							"left-icon": V.value ? "eye-off" : "eye",
							"aria-label": V.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => V.value = !V.value
						}, {
							default: w(() => [h(x(V.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					m("fieldset", Ee, [t[20] ||= m("legend", { class: "admin-webhooks__label" }, [h("Events"), m("span", { "aria-hidden": "true" }, " *")], -1), (v(!0), p(l, null, b(S(n), (e) => (v(), p("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [m("span", E, x(e.label), 1), (v(!0), p(l, null, b(e.events, (e) => (v(), p("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						m("input", {
							type: "checkbox",
							checked: B.value.has(e.id),
							onChange: (t) => Le(e.id)
						}, null, 40, D),
						m("span", De, x(e.label), 1),
						m("span", Oe, x(e.id), 1)
					]))), 128))]))), 128))]),
					U.value ? (v(), p("p", ke, x(U.value), 1)) : f("", !0)
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
					onClick: Re
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
				title: ze.value
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
					class: ce(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [m("span", je, [g(ie, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), m("div", null, [m("p", Me, x(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), m("p", Ne, x(X.value.message), 1)])], 2)) : f("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-5d4e1a67"]]);
export { O as default };

//# sourceMappingURL=WebhooksPage-C4WVfmjO.js.map