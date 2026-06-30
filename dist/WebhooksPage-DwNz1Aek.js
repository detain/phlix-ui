import { n as e, t } from "./Icon-ax5k7_G2.js";
import { c as n, f as r, t as ee } from "./client-CX6TRWS-.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-k7aQagzg.js";
import { t as ne } from "./Badge-ArWL5-WE.js";
import { t as a } from "./Modal-CWarEzTU.js";
import { t as re } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { r as ie, t as ae } from "./webhooks-BBTLnFKm.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as oe, normalizeClass as se, onMounted as ce, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as le, vModelDynamic as ue, vModelText as b, withCtx as x, withDirectives as S, withModifiers as de } from "vue";
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
}, we = { class: "admin-webhooks__secret-row" }, C = ["type", "placeholder"], Te = { class: "admin-webhooks__events" }, w = { class: "admin-webhooks__events-category-label" }, T = ["checked", "onChange"], E = { class: "admin-webhooks__checkbox-label" }, D = { class: "admin-webhooks__event-id" }, O = {
	key: 0,
	class: "admin-webhooks__error",
	role: "alert"
}, Ee = {
	key: 0,
	role: "status",
	"aria-live": "polite"
}, De = {
	class: "admin-webhooks__test-icon",
	"aria-hidden": "true"
}, Oe = { class: "admin-webhooks__test-status" }, ke = { class: "admin-webhooks__test-message" }, k = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(e) {
		let h = e, k = oe("apiBase", ""), Ae = c(() => typeof k == "string" ? k : k?.value ?? ""), A = new ae(h.client ?? new ee({
			baseUrl: Ae.value,
			tokenStore: new n()
		})), j = te();
		function je(e) {
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
				P.value = r(e, "Failed to load webhooks."), j.error(P.value);
			} finally {
				N.value = !1;
			}
		}
		let I = _(!1), L = _(null), R = _(""), z = _(""), B = _(""), V = _(/* @__PURE__ */ new Set()), H = _(!1), U = _(!1), W = _(""), Me = c(() => L.value ? "Edit webhook" : "Add webhook");
		function G() {
			L.value = null, R.value = "", z.value = "", B.value = "", V.value = /* @__PURE__ */ new Set(), H.value = !1, W.value = "", I.value = !0;
		}
		function Ne(e) {
			L.value = e, R.value = e.name, z.value = e.url, B.value = "", V.value = new Set(e.events), H.value = !1, W.value = "", I.value = !0;
		}
		function K() {
			I.value = !1, L.value = null;
		}
		function Pe(e) {
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
			if (!je(z.value)) {
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
		let J = _(null);
		async function Fe() {
			let e = J.value;
			if (e) try {
				await A.remove(e.id), j.success("Webhook deleted."), J.value = null, await F();
			} catch (e) {
				j.error(r(e, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = _(null), X = _(null), Z = _(!1), Ie = c(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = c({
			get: () => Y.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Le(e) {
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
		return ce(F), (e, n) => (g(), d("section", fe, [
			f("header", pe, [n[9] ||= f("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), m(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: x(() => [...n[8] ||= [p("Add webhook", -1)]]),
				_: 1
			})]),
			N.value ? (g(), d("div", me, [m(re, {
				variant: "text",
				lines: 6
			})])) : P.value ? (g(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load webhooks",
				description: P.value
			}, {
				actions: x(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: F
				}, {
					default: x(() => [...n[10] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (g(), l(o, {
				key: 2,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: x(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: x(() => [...n[11] ||= [p("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("table", he, [n[15] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Name"),
				f("th", { scope: "col" }, "URL"),
				f("th", { scope: "col" }, "Events"),
				f("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(g(!0), d(s, null, v(M.value, (e) => (g(), d("tr", { key: e.id }, [
				f("td", null, y(e.name), 1),
				f("td", ge, y(e.url), 1),
				f("td", null, [m(ne, {
					tone: "info",
					mono: ""
				}, {
					default: x(() => [p(y(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				f("td", null, [f("div", _e, [
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Ne(e)
					}, {
						default: x(() => [...n[12] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Le(e)
					}, {
						default: x(() => [...n[13] ||= [p(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: x(() => [...n[14] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			m(a, {
				modelValue: I.value,
				"onUpdate:modelValue": n[4] ||= (e) => I.value = e,
				title: Me.value,
				size: "lg",
				onClose: K
			}, {
				footer: x(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: x(() => [...n[20] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
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
					onSubmit: de(q, ["prevent"])
				}, [
					f("label", ve, [n[16] ||= f("span", { class: "admin-webhooks__label" }, "Name", -1), S(f("input", {
						"onUpdate:modelValue": n[0] ||= (e) => R.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, R.value]])]),
					f("label", ye, [n[17] ||= f("span", { class: "admin-webhooks__label" }, "URL", -1), S(f("input", {
						"onUpdate:modelValue": n[1] ||= (e) => z.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[b, z.value]])]),
					f("div", be, [
						f("span", xe, [n[18] ||= p(" Secret", -1), L.value ? u("", !0) : (g(), d("span", Se, " *"))]),
						L.value ? (g(), d("p", Ce, "Leave blank to keep the current secret.")) : u("", !0),
						f("div", we, [S(f("input", {
							"onUpdate:modelValue": n[2] ||= (e) => B.value = e,
							type: H.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: L.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, C), [[ue, B.value]]), m(i, {
							variant: "outline",
							size: "sm",
							"left-icon": H.value ? "eye-off" : "eye",
							"aria-label": H.value ? "Hide secret" : "Show secret",
							onClick: n[3] ||= (e) => H.value = !H.value
						}, {
							default: x(() => [p(y(H.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					f("fieldset", Te, [n[19] ||= f("legend", { class: "admin-webhooks__label" }, [p("Events"), f("span", { "aria-hidden": "true" }, " *")], -1), (g(!0), d(s, null, v(le(ie), (e) => (g(), d("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [f("span", w, y(e.label), 1), (g(!0), d(s, null, v(e.events, (e) => (g(), d("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						f("input", {
							type: "checkbox",
							checked: V.value.has(e.id),
							onChange: (t) => Pe(e.id)
						}, null, 40, T),
						f("span", E, y(e.label), 1),
						f("span", D, y(e.id), 1)
					]))), 128))]))), 128))]),
					W.value ? (g(), d("p", O, y(W.value), 1)) : u("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(a, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => J.value = null
			}, {
				footer: x(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => J.value = null
				}, {
					default: x(() => [...n[23] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: Fe
				}, {
					default: x(() => [...n[24] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					n[21] ||= p(" Delete webhook ", -1),
					f("strong", null, y(J.value?.name), 1),
					n[22] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				modelValue: Q.value,
				"onUpdate:modelValue": n[7] ||= (e) => Q.value = e,
				title: Ie.value
			}, {
				footer: x(() => [m(i, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: x(() => [...n[25] ||= [p("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: x(() => [Z.value ? (g(), d("p", Ee, "Sending test payload…")) : X.value ? (g(), d("div", {
					key: 1,
					class: se(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [f("span", De, [m(t, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), f("div", null, [f("p", Oe, y(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), f("p", ke, y(X.value.message), 1)])], 2)) : u("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-7d4dd04e"]]);
//#endregion
export { k as default };

//# sourceMappingURL=WebhooksPage-DwNz1Aek.js.map