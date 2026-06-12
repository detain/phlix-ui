import { n as e, t } from "./Icon-ax5k7_G2.js";
import { n, t as r, u as i } from "./Button-9cUUJmnN.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as te } from "./Badge-ArWL5-WE.js";
import { t as a } from "./Modal-I4tEFhoH.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
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
}, we = { class: "admin-webhooks__secret-row" }, Te = ["type", "placeholder"], Ee = { class: "admin-webhooks__events" }, C = { class: "admin-webhooks__events-category-label" }, w = ["checked", "onChange"], T = { class: "admin-webhooks__checkbox-label" }, E = { class: "admin-webhooks__event-id" }, D = {
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
}, ke = { class: "admin-webhooks__test-status" }, Ae = { class: "admin-webhooks__test-message" }, O = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(e) {
		let h = e, O = oe("apiBase", ""), je = c(() => typeof O == "string" ? O : O?.value ?? ""), k = new ae(h.client ?? new n({
			baseUrl: je.value,
			tokenStore: new ee()
		})), A = ne();
		function Me(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let j = _([]), M = _(!0), N = _(null);
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
		let F = _(!1), I = _(null), L = _(""), R = _(""), z = _(""), B = _(/* @__PURE__ */ new Set()), V = _(!1), H = _(!1), U = _(""), Ne = c(() => I.value ? "Edit webhook" : "Add webhook");
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
		let J = _(null);
		async function Fe() {
			let e = J.value;
			if (e) try {
				await k.remove(e.id), A.success("Webhook deleted."), J.value = null, await P();
			} catch (e) {
				A.error(i(e, "Failed to delete webhook.")), J.value = null;
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
		return ce(P), (e, n) => (g(), d("section", fe, [
			f("header", pe, [n[9] ||= f("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: W
			}, {
				default: x(() => [...n[8] ||= [p("Add webhook", -1)]]),
				_: 1
			})]),
			M.value ? (g(), d("div", me, [m(re, {
				variant: "text",
				lines: 6
			})])) : N.value ? (g(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load webhooks",
				description: N.value
			}, {
				actions: x(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: x(() => [...n[10] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (g(), l(o, {
				key: 2,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: x(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: W
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
			])], -1), f("tbody", null, [(g(!0), d(s, null, v(j.value, (e) => (g(), d("tr", { key: e.id }, [
				f("td", null, y(e.name), 1),
				f("td", ge, y(e.url), 1),
				f("td", null, [m(te, {
					tone: "info",
					mono: ""
				}, {
					default: x(() => [p(y(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				f("td", null, [f("div", _e, [
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Pe(e)
					}, {
						default: x(() => [...n[12] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Le(e)
					}, {
						default: x(() => [...n[13] ||= [p(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
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
				modelValue: F.value,
				"onUpdate:modelValue": n[4] ||= (e) => F.value = e,
				title: Ne.value,
				size: "lg",
				onClose: G
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: G
				}, {
					default: x(() => [...n[20] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: H.value,
					onClick: q
				}, {
					default: x(() => [p(y(I.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-webhooks__form",
					onSubmit: de(q, ["prevent"])
				}, [
					f("label", ve, [n[16] ||= f("span", { class: "admin-webhooks__label" }, "Name", -1), S(f("input", {
						"onUpdate:modelValue": n[0] ||= (e) => L.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[b, L.value]])]),
					f("label", ye, [n[17] ||= f("span", { class: "admin-webhooks__label" }, "URL", -1), S(f("input", {
						"onUpdate:modelValue": n[1] ||= (e) => R.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[b, R.value]])]),
					f("div", be, [
						f("span", xe, [n[18] ||= p(" Secret", -1), I.value ? u("", !0) : (g(), d("span", Se, " *"))]),
						I.value ? (g(), d("p", Ce, "Leave blank to keep the current secret.")) : u("", !0),
						f("div", we, [S(f("input", {
							"onUpdate:modelValue": n[2] ||= (e) => z.value = e,
							type: V.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: I.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, Te), [[ue, z.value]]), m(r, {
							variant: "outline",
							size: "sm",
							"left-icon": V.value ? "eye-off" : "eye",
							"aria-label": V.value ? "Hide secret" : "Show secret",
							onClick: n[3] ||= (e) => V.value = !V.value
						}, {
							default: x(() => [p(y(V.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					f("fieldset", Ee, [n[19] ||= f("legend", { class: "admin-webhooks__label" }, [p("Events"), f("span", { "aria-hidden": "true" }, " *")], -1), (g(!0), d(s, null, v(le(ie), (e) => (g(), d("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [f("span", C, y(e.label), 1), (g(!0), d(s, null, v(e.events, (e) => (g(), d("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						f("input", {
							type: "checkbox",
							checked: B.value.has(e.id),
							onChange: (t) => K(e.id)
						}, null, 40, w),
						f("span", T, y(e.label), 1),
						f("span", E, y(e.id), 1)
					]))), 128))]))), 128))]),
					U.value ? (g(), d("p", D, y(U.value), 1)) : u("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(a, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => J.value = null
			}, {
				footer: x(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => J.value = null
				}, {
					default: x(() => [...n[23] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
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
				footer: x(() => [m(r, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: x(() => [...n[25] ||= [p("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: x(() => [Z.value ? (g(), d("p", De, "Sending test payload…")) : X.value ? (g(), d("div", {
					key: 1,
					class: se(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [f("span", Oe, [m(t, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), f("div", null, [f("p", ke, y(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), f("p", Ae, y(X.value.message), 1)])], 2)) : u("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-7d4dd04e"]]);
//#endregion
export { O as default };

//# sourceMappingURL=WebhooksPage-Ci775vCZ.js.map