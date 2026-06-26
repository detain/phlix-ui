import { n as e, t } from "./Icon-ax5k7_G2.js";
import { l as n, n as r, p as i, t as a } from "./Button-MsRePfWv.js";
import { t as ee } from "./Badge-ArWL5-WE.js";
import { t as o } from "./Modal-I4tEFhoH.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as ne } from "./Skeleton-DkSoWF3C.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { r as re, t as ie } from "./webhooks-BBTLnFKm.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ae, normalizeClass as oe, onMounted as se, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as ce, vModelDynamic as le, vModelText as x, withCtx as S, withDirectives as C, withModifiers as ue } from "vue";
//#region src/pages/admin/WebhooksPage.vue?vue&type=script&setup=true&lang.ts
var de = {
	class: "admin-webhooks",
	"aria-labelledby": "webhooks-heading"
}, fe = { class: "admin-webhooks__head" }, pe = {
	key: 0,
	class: "admin-webhooks__skel"
}, me = {
	key: 3,
	class: "admin-webhooks__table",
	"aria-label": "Webhooks"
}, he = { class: "admin-webhooks__url" }, ge = { class: "admin-webhooks__actions" }, _e = { class: "admin-webhooks__field" }, ve = { class: "admin-webhooks__field" }, ye = { class: "admin-webhooks__field" }, be = { class: "admin-webhooks__label" }, xe = {
	key: 0,
	"aria-hidden": "true"
}, Se = {
	key: 0,
	class: "admin-webhooks__hint"
}, Ce = { class: "admin-webhooks__secret-row" }, we = ["type", "placeholder"], Te = { class: "admin-webhooks__events" }, Ee = { class: "admin-webhooks__events-category-label" }, w = ["checked", "onChange"], T = { class: "admin-webhooks__checkbox-label" }, E = { class: "admin-webhooks__event-id" }, D = {
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
}, ke = { class: "admin-webhooks__test-status" }, Ae = { class: "admin-webhooks__test-message" }, O = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(e) {
		let g = e, O = ae("apiBase", ""), je = l(() => typeof O == "string" ? O : O?.value ?? ""), k = new ie(g.client ?? new r({
			baseUrl: je.value,
			tokenStore: new n()
		})), A = te();
		function Me(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let j = v([]), M = v(!0), N = v(null);
		async function P() {
			M.value = !0, N.value = null;
			try {
				j.value = await k.list();
			} catch (e) {
				N.value = i(e, "Failed to load webhooks."), A.error(N.value);
			} finally {
				M.value = !1;
			}
		}
		let F = v(!1), I = v(null), L = v(""), R = v(""), z = v(""), B = v(/* @__PURE__ */ new Set()), V = v(!1), H = v(!1), U = v(""), Ne = l(() => I.value ? "Edit webhook" : "Add webhook");
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
			} catch (e) {
				U.value = i(e, "Failed to save webhook.");
			} finally {
				H.value = !1;
			}
		}
		let J = v(null);
		async function Fe() {
			let e = J.value;
			if (e) try {
				await k.remove(e.id), A.success("Webhook deleted."), J.value = null, await P();
			} catch (e) {
				A.error(i(e, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = v(null), X = v(null), Z = v(!1), Ie = l(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = l({
			get: () => Y.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Le(e) {
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
					message: i(e, "Failed to test webhook.")
				};
			} finally {
				Z.value = !1;
			}
		}
		function $() {
			Y.value = null, X.value = null;
		}
		return se(P), (e, n) => (_(), f("section", de, [
			p("header", fe, [n[9] ||= p("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: W
			}, {
				default: S(() => [...n[8] ||= [m("Add webhook", -1)]]),
				_: 1
			})]),
			M.value ? (_(), f("div", pe, [h(ne, {
				variant: "text",
				lines: 6
			})])) : N.value ? (_(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load webhooks",
				description: N.value
			}, {
				actions: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: S(() => [...n[10] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (_(), u(s, {
				key: 2,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: W
				}, {
					default: S(() => [...n[11] ||= [m("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", me, [n[15] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "URL"),
				p("th", { scope: "col" }, "Events"),
				p("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(_(!0), f(c, null, y(j.value, (e) => (_(), f("tr", { key: e.id }, [
				p("td", null, b(e.name), 1),
				p("td", he, b(e.url), 1),
				p("td", null, [h(ee, {
					tone: "info",
					mono: ""
				}, {
					default: S(() => [m(b(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				p("td", null, [p("div", ge, [
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Pe(e)
					}, {
						default: S(() => [...n[12] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Le(e)
					}, {
						default: S(() => [...n[13] ||= [m(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: S(() => [...n[14] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			h(o, {
				modelValue: F.value,
				"onUpdate:modelValue": n[4] ||= (e) => F.value = e,
				title: Ne.value,
				size: "lg",
				onClose: G
			}, {
				footer: S(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: G
				}, {
					default: S(() => [...n[20] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: H.value,
					onClick: q
				}, {
					default: S(() => [m(b(I.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [p("form", {
					class: "admin-webhooks__form",
					onSubmit: ue(q, ["prevent"])
				}, [
					p("label", _e, [n[16] ||= p("span", { class: "admin-webhooks__label" }, "Name", -1), C(p("input", {
						"onUpdate:modelValue": n[0] ||= (e) => L.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[x, L.value]])]),
					p("label", ve, [n[17] ||= p("span", { class: "admin-webhooks__label" }, "URL", -1), C(p("input", {
						"onUpdate:modelValue": n[1] ||= (e) => R.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[x, R.value]])]),
					p("div", ye, [
						p("span", be, [n[18] ||= m(" Secret", -1), I.value ? d("", !0) : (_(), f("span", xe, " *"))]),
						I.value ? (_(), f("p", Se, "Leave blank to keep the current secret.")) : d("", !0),
						p("div", Ce, [C(p("input", {
							"onUpdate:modelValue": n[2] ||= (e) => z.value = e,
							type: V.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: I.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, we), [[le, z.value]]), h(a, {
							variant: "outline",
							size: "sm",
							"left-icon": V.value ? "eye-off" : "eye",
							"aria-label": V.value ? "Hide secret" : "Show secret",
							onClick: n[3] ||= (e) => V.value = !V.value
						}, {
							default: S(() => [m(b(V.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					p("fieldset", Te, [n[19] ||= p("legend", { class: "admin-webhooks__label" }, [m("Events"), p("span", { "aria-hidden": "true" }, " *")], -1), (_(!0), f(c, null, y(ce(re), (e) => (_(), f("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [p("span", Ee, b(e.label), 1), (_(!0), f(c, null, y(e.events, (e) => (_(), f("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						p("input", {
							type: "checkbox",
							checked: B.value.has(e.id),
							onChange: (t) => K(e.id)
						}, null, 40, w),
						p("span", T, b(e.label), 1),
						p("span", E, b(e.id), 1)
					]))), 128))]))), 128))]),
					U.value ? (_(), f("p", D, b(U.value), 1)) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(o, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => J.value = null
			}, {
				footer: S(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => J.value = null
				}, {
					default: S(() => [...n[23] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: Fe
				}, {
					default: S(() => [...n[24] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [p("p", null, [
					n[21] ||= m(" Delete webhook ", -1),
					p("strong", null, b(J.value?.name), 1),
					n[22] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				modelValue: Q.value,
				"onUpdate:modelValue": n[7] ||= (e) => Q.value = e,
				title: Ie.value
			}, {
				footer: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: S(() => [...n[25] ||= [m("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: S(() => [Z.value ? (_(), f("p", De, "Sending test payload…")) : X.value ? (_(), f("div", {
					key: 1,
					class: oe(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [p("span", Oe, [h(t, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), p("div", null, [p("p", ke, b(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), p("p", Ae, b(X.value.message), 1)])], 2)) : d("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-7d4dd04e"]]);
//#endregion
export { O as default };

//# sourceMappingURL=WebhooksPage-BdbxOmBt.js.map