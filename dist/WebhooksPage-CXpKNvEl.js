import { n as e, t } from "./Icon-CIwTuFLd.js";
import { a as n, o as ee } from "./plural-DMM7pLFA.js";
import { l as r, t as i, y as a } from "./client-DdVqCKVh.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./EmptyState-BAyOxAcK.js";
import { t as s } from "./Button-BuG0GvCa.js";
import { t as ne } from "./Badge-A88fI41k.js";
import { t as c } from "./Modal-9IqluoNm.js";
import { t as l } from "./Skeleton-rHw-IJtl.js";
import { t as re } from "./PageHint-BGYg6qRJ.js";
import { r as ie, t as ae } from "./webhooks-aMh0Jywf.js";
import { t as u } from "./helpLinks-B4Y1FteC.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as oe, normalizeClass as se, onMounted as ce, openBlock as b, ref as x, renderList as S, toDisplayString as C, unref as w, vModelDynamic as le, vModelText as T, withCtx as E, withDirectives as D, withModifiers as ue } from "vue";
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
}, Ce = { class: "admin-webhooks__secret-row" }, we = ["type", "placeholder"], Te = { class: "admin-webhooks__events" }, O = { class: "admin-webhooks__events-category-label" }, Ee = ["checked", "onChange"], De = { class: "admin-webhooks__checkbox-label" }, Oe = { class: "admin-webhooks__event-id" }, ke = {
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
}, Me = { class: "admin-webhooks__test-status" }, Ne = { class: "admin-webhooks__test-message" }, k = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(e) {
		let y = e, k = oe("apiBase", ""), Pe = f(() => typeof k == "string" ? k : k?.value ?? ""), A = new ae(y.client ?? new i({
			baseUrl: Pe.value,
			tokenStore: new r()
		})), j = te();
		function Fe(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let M = x([]), N = x(!0), P = x(null);
		async function F() {
			N.value = !0, P.value = null;
			try {
				M.value = await A.list();
			} catch (e) {
				P.value = a(e, "Failed to load webhooks."), j.error(P.value);
			} finally {
				N.value = !1;
			}
		}
		let I = x(!1), L = x(null), R = x(""), z = x(""), B = x(""), V = x(/* @__PURE__ */ new Set()), H = x(!1), U = x(!1), W = x(""), Ie = f(() => L.value ? "Edit webhook" : "Add webhook");
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
				W.value = a(e, "Failed to save webhook.");
			} finally {
				U.value = !1;
			}
		}
		let J = x(null);
		async function ze() {
			let e = J.value;
			if (e) try {
				await A.remove(e.id), j.success("Webhook deleted."), J.value = null, await F();
			} catch (e) {
				j.error(a(e, "Failed to delete webhook.")), J.value = null;
			}
		}
		let Y = x(null), X = x(null), Z = x(!1), Be = f(() => Y.value ? `Test — ${Y.value.name}` : "Test webhook"), Q = f({
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
					message: a(e, "Failed to test webhook.")
				};
			} finally {
				Z.value = !1;
			}
		}
		function $() {
			Y.value = null, X.value = null;
		}
		return ce(F), (e, n) => (b(), h("section", de, [
			g("header", fe, [n[9] ||= g("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), v(s, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: E(() => [...n[8] ||= [_("Add webhook", -1)]]),
				_: 1
			})]),
			v(re, {
				links: w(u).webhooks.links,
				details: w(u).webhooks.details
			}, {
				default: E(() => [...n[10] ||= [
					_(" Send a POST to an external URL whenever chosen events happen on your server (for notifications or automations). ", -1),
					g("strong", null, "Add webhook", -1),
					_(" creates one — you give it a name, a URL, an optional signing secret, and tick the events to subscribe to. ", -1),
					g("strong", null, "Test", -1),
					_(" fires a sample payload so you can confirm it's wired up correctly, and ", -1),
					g("strong", null, "Edit", -1),
					_(" / ", -1),
					g("strong", null, "Delete", -1),
					_(" update or remove an endpoint. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			N.value ? (b(), h("div", pe, [v(l, {
				variant: "text",
				lines: 6
			})])) : P.value ? (b(), p(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load webhooks",
				description: P.value
			}, {
				actions: E(() => [v(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: F
				}, {
					default: E(() => [...n[11] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (b(), p(o, {
				key: 2,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: E(() => [v(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: E(() => [...n[12] ||= [_("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (b(), h("table", me, [n[16] ||= g("thead", null, [g("tr", null, [
				g("th", { scope: "col" }, "Name"),
				g("th", { scope: "col" }, "URL"),
				g("th", { scope: "col" }, "Events"),
				g("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), g("tbody", null, [(b(!0), h(d, null, S(M.value, (e) => (b(), h("tr", { key: e.id }, [
				g("td", null, C(e.name), 1),
				g("td", he, C(e.url), 1),
				g("td", null, [v(ne, {
					tone: "info",
					mono: ""
				}, {
					default: E(() => [_(C(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				g("td", null, [g("div", ge, [
					v(s, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Le(e)
					}, {
						default: E(() => [...n[13] ||= [_(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					v(s, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => Ve(e)
					}, {
						default: E(() => [...n[14] ||= [_(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					v(s, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: E(() => [...n[15] ||= [_(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			v(c, {
				modelValue: I.value,
				"onUpdate:modelValue": n[4] ||= (e) => I.value = e,
				title: Ie.value,
				size: "lg",
				onClose: K
			}, {
				footer: E(() => [v(s, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: E(() => [...n[21] ||= [_("Cancel", -1)]]),
					_: 1
				}), v(s, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: q
				}, {
					default: E(() => [_(C(L.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: E(() => [g("form", {
					class: "admin-webhooks__form",
					onSubmit: ue(q, ["prevent"])
				}, [
					g("label", _e, [n[17] ||= g("span", { class: "admin-webhooks__label" }, "Name", -1), D(g("input", {
						"onUpdate:modelValue": n[0] ||= (e) => R.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[T, R.value]])]),
					g("label", ve, [n[18] ||= g("span", { class: "admin-webhooks__label" }, "URL", -1), D(g("input", {
						"onUpdate:modelValue": n[1] ||= (e) => z.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[T, z.value]])]),
					g("div", ye, [
						g("span", be, [n[19] ||= _(" Secret", -1), L.value ? m("", !0) : (b(), h("span", xe, " *"))]),
						L.value ? (b(), h("p", Se, "Leave blank to keep the current secret.")) : m("", !0),
						g("div", Ce, [D(g("input", {
							"onUpdate:modelValue": n[2] ||= (e) => B.value = e,
							type: H.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							"data-lpignore": "true",
							"data-1p-ignore": "",
							"data-bwignore": "",
							"data-form-type": "other",
							placeholder: L.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, we), [[le, B.value]]), v(s, {
							variant: "outline",
							size: "sm",
							"left-icon": H.value ? "eye-off" : "eye",
							"aria-label": H.value ? "Hide secret" : "Show secret",
							onClick: n[3] ||= (e) => H.value = !H.value
						}, {
							default: E(() => [_(C(H.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					g("fieldset", Te, [n[20] ||= g("legend", { class: "admin-webhooks__label" }, [_("Events"), g("span", { "aria-hidden": "true" }, " *")], -1), (b(!0), h(d, null, S(w(ie), (e) => (b(), h("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [g("span", O, C(e.label), 1), (b(!0), h(d, null, S(e.events, (e) => (b(), h("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						g("input", {
							type: "checkbox",
							checked: V.value.has(e.id),
							onChange: (t) => Re(e.id)
						}, null, 40, Ee),
						g("span", De, C(e.label), 1),
						g("span", Oe, C(e.id), 1)
					]))), 128))]))), 128))]),
					W.value ? (b(), h("p", ke, C(W.value), 1)) : m("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			v(c, {
				"model-value": J.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => J.value = null
			}, {
				footer: E(() => [v(s, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => J.value = null
				}, {
					default: E(() => [...n[24] ||= [_("Cancel", -1)]]),
					_: 1
				}), v(s, {
					variant: "danger",
					size: "sm",
					onClick: ze
				}, {
					default: E(() => [...n[25] ||= [_("Delete", -1)]]),
					_: 1
				})]),
				default: E(() => [g("p", null, [
					n[22] ||= _(" Delete webhook ", -1),
					g("strong", null, C(J.value?.name), 1),
					n[23] ||= _("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			v(c, {
				modelValue: Q.value,
				"onUpdate:modelValue": n[7] ||= (e) => Q.value = e,
				title: Be.value
			}, {
				footer: E(() => [v(s, {
					variant: "solid",
					size: "sm",
					disabled: Z.value,
					onClick: $
				}, {
					default: E(() => [...n[26] ||= [_("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: E(() => [Z.value ? (b(), h("p", Ae, "Sending test payload…")) : X.value ? (b(), h("div", {
					key: 1,
					class: se(["admin-webhooks__test-result", X.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [g("span", je, [v(t, { name: X.value.success ? "success" : "error" }, null, 8, ["name"])]), g("div", null, [g("p", Me, C(X.value.success ? "Delivery succeeded" : "Delivery failed"), 1), g("p", Ne, C(X.value.message), 1)])], 2)) : m("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-b97e15ae"]]);
//#endregion
export { k as default };

//# sourceMappingURL=WebhooksPage-CXpKNvEl.js.map