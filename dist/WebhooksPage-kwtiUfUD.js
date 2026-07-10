import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as n } from "./Modal-BXA8fOR4.js";
import { c as r, f as i, t as ee } from "./client-CGSA6iT0.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CnyfCnhY.js";
import { t as ne } from "./Badge-Dq-pYhrz.js";
import { t as re } from "./Skeleton-CzU_l53W.js";
import { t as o } from "./EmptyState-588Z_81C.js";
import { t as ie } from "./PageHint-7Giwob0l.js";
import { r as ae, t as oe } from "./webhooks-BBTLnFKm.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as se, normalizeClass as ce, onMounted as le, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as ue, vModelDynamic as de, vModelText as b, withCtx as x, withDirectives as S, withModifiers as fe } from "vue";
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
}, Te = { class: "admin-webhooks__secret-row" }, Ee = ["type", "placeholder"], C = { class: "admin-webhooks__events" }, w = { class: "admin-webhooks__events-category-label" }, T = ["checked", "onChange"], E = { class: "admin-webhooks__checkbox-label" }, D = { class: "admin-webhooks__event-id" }, De = {
	key: 0,
	class: "admin-webhooks__error",
	role: "alert"
}, O = {
	key: 0,
	role: "status",
	"aria-live": "polite"
}, Oe = {
	class: "admin-webhooks__test-icon",
	"aria-hidden": "true"
}, ke = { class: "admin-webhooks__test-status" }, Ae = { class: "admin-webhooks__test-message" }, k = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(e) {
		let h = e, k = se("apiBase", ""), je = c(() => typeof k == "string" ? k : k?.value ?? ""), A = new oe(h.client ?? new ee({
			baseUrl: je.value,
			tokenStore: new r()
		})), j = te();
		function Me(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let M = _([]), N = _(!0), P = _(null);
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
		let I = _(!1), L = _(null), R = _(""), z = _(""), B = _(""), V = _(/* @__PURE__ */ new Set()), H = _(!1), U = _(!1), W = _(""), Ne = c(() => L.value ? "Edit webhook" : "Add webhook");
		function G() {
			L.value = null, R.value = "", z.value = "", B.value = "", V.value = /* @__PURE__ */ new Set(), H.value = !1, W.value = "", I.value = !0;
		}
		function Pe(e) {
			L.value = e, R.value = e.name, z.value = e.url, B.value = "", V.value = new Set(e.events), H.value = !1, W.value = "", I.value = !0;
		}
		function K() {
			I.value = !1, L.value = null;
		}
		function Fe(e) {
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
			if (!Me(z.value)) {
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
		let J = _(null);
		async function Ie() {
			let e = J.value;
			if (e) try {
				await A.remove(e.id), j.success("Webhook deleted."), J.value = null, await F();
			} catch (e) {
				j.error(i(e, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = _(null), X = _(null), Z = _(!1), Le = c(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = c({
			get: () => Y.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Re(e) {
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
					message: i(e, "Failed to test webhook.")
				};
			} finally {
				Z.value = !1;
			}
		}
		function $() {
			Y.value = null, X.value = null;
		}
		return le(F), (e, r) => (g(), d("section", pe, [
			f("header", me, [r[9] ||= f("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), m(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: x(() => [...r[8] ||= [p("Add webhook", -1)]]),
				_: 1
			})]),
			m(ie, null, {
				default: x(() => [...r[10] ||= [
					p(" Send a POST to an external URL whenever chosen events happen on your server (for notifications or automations). ", -1),
					f("strong", null, "Add webhook", -1),
					p(" creates one — you give it a name, a URL, an optional signing secret, and tick the events to subscribe to. ", -1),
					f("strong", null, "Test", -1),
					p(" fires a sample payload so you can confirm it's wired up correctly, and ", -1),
					f("strong", null, "Edit", -1),
					p(" / ", -1),
					f("strong", null, "Delete", -1),
					p(" update or remove an endpoint. ", -1)
				]]),
				_: 1
			}),
			N.value ? (g(), d("div", he, [m(re, {
				variant: "text",
				lines: 6
			})])) : P.value ? (g(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load webhooks",
				description: P.value
			}, {
				actions: x(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: F
				}, {
					default: x(() => [...r[11] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (g(), l(o, {
				key: 2,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: x(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: x(() => [...r[12] ||= [p("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("table", ge, [r[16] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Name"),
				f("th", { scope: "col" }, "URL"),
				f("th", { scope: "col" }, "Events"),
				f("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(g(!0), d(s, null, v(M.value, (e) => (g(), d("tr", { key: e.id }, [
				f("td", null, y(e.name), 1),
				f("td", _e, y(e.url), 1),
				f("td", null, [m(ne, {
					tone: "info",
					mono: ""
				}, {
					default: x(() => [p(y(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				f("td", null, [f("div", ve, [
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Pe(e)
					}, {
						default: x(() => [...r[13] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Re(e)
					}, {
						default: x(() => [...r[14] ||= [p(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: x(() => [...r[15] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			m(n, {
				modelValue: I.value,
				"onUpdate:modelValue": r[4] ||= (e) => I.value = e,
				title: Ne.value,
				size: "lg",
				onClose: K
			}, {
				footer: x(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: x(() => [...r[21] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: q
				}, {
					default: x(() => [p(y(L.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-webhooks__form",
					onSubmit: fe(q, ["prevent"])
				}, [
					f("label", ye, [r[17] ||= f("span", { class: "admin-webhooks__label" }, "Name", -1), S(f("input", {
						"onUpdate:modelValue": r[0] ||= (e) => R.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, R.value]])]),
					f("label", be, [r[18] ||= f("span", { class: "admin-webhooks__label" }, "URL", -1), S(f("input", {
						"onUpdate:modelValue": r[1] ||= (e) => z.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[b, z.value]])]),
					f("div", xe, [
						f("span", Se, [r[19] ||= p(" Secret", -1), L.value ? u("", !0) : (g(), d("span", Ce, " *"))]),
						L.value ? (g(), d("p", we, "Leave blank to keep the current secret.")) : u("", !0),
						f("div", Te, [S(f("input", {
							"onUpdate:modelValue": r[2] ||= (e) => B.value = e,
							type: H.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: L.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, Ee), [[de, B.value]]), m(a, {
							variant: "outline",
							size: "sm",
							"left-icon": H.value ? "eye-off" : "eye",
							"aria-label": H.value ? "Hide secret" : "Show secret",
							onClick: r[3] ||= (e) => H.value = !H.value
						}, {
							default: x(() => [p(y(H.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					f("fieldset", C, [r[20] ||= f("legend", { class: "admin-webhooks__label" }, [p("Events"), f("span", { "aria-hidden": "true" }, " *")], -1), (g(!0), d(s, null, v(ue(ae), (e) => (g(), d("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [f("span", w, y(e.label), 1), (g(!0), d(s, null, v(e.events, (e) => (g(), d("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						f("input", {
							type: "checkbox",
							checked: V.value.has(e.id),
							onChange: (t) => Fe(e.id)
						}, null, 40, T),
						f("span", E, y(e.label), 1),
						f("span", D, y(e.id), 1)
					]))), 128))]))), 128))]),
					W.value ? (g(), d("p", De, y(W.value), 1)) : u("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(n, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": r[6] ||= (e) => J.value = null
			}, {
				footer: x(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: r[5] ||= (e) => J.value = null
				}, {
					default: x(() => [...r[24] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					onClick: Ie
				}, {
					default: x(() => [...r[25] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					r[22] ||= p(" Delete webhook ", -1),
					f("strong", null, y(J.value?.name), 1),
					r[23] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(n, {
				modelValue: Q.value,
				"onUpdate:modelValue": r[7] ||= (e) => Q.value = e,
				title: Le.value
			}, {
				footer: x(() => [m(a, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: x(() => [...r[26] ||= [p("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: x(() => [Z.value ? (g(), d("p", O, "Sending test payload…")) : X.value ? (g(), d("div", {
					key: 1,
					class: ce(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [f("span", Oe, [m(t, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), f("div", null, [f("p", ke, y(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), f("p", Ae, y(X.value.message), 1)])], 2)) : u("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-4bb216e6"]]);
//#endregion
export { k as default };

//# sourceMappingURL=WebhooksPage-kwtiUfUD.js.map