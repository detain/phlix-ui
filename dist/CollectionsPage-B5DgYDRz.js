import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-CSaTqZvF.js";
import { c as n, f as r, t as ee } from "./client-D1nDQ0cP.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DGsvHynO.js";
import { t as ne } from "./Badge-D_aUH3dO.js";
import { t as a } from "./Skeleton-DhQmxeNg.js";
import { t as o } from "./EmptyState-CfyGawh7.js";
import { t as re } from "./PageHint-CPoTKHik.js";
import { t as ie } from "./collections-CH3HLdcd.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as ae, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as oe, onMounted as se, openBlock as h, ref as g, renderList as _, toDisplayString as v, vModelText as y, withCtx as b, withDirectives as x, withModifiers as S } from "vue";
//#region src/pages/admin/CollectionsPage.vue?vue&type=script&setup=true&lang.ts
var ce = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, C = { class: "admin-collections__head" }, w = {
	key: 0,
	class: "admin-collections__skel"
}, T = {
	key: 3,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, E = { class: "admin-collections__actions" }, le = { class: "admin-collections__field" }, ue = {
	key: 0,
	class: "admin-collections__field"
}, de = {
	key: 0,
	class: "admin-collections__skel"
}, fe = { class: "admin-collections__field admin-collections__field--grow" }, D = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, O = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(e) {
		let m = e, O = oe("apiBase", ""), pe = c(() => typeof O == "string" ? O : O?.value ?? ""), k = new ie(m.client ?? new ee({
			baseUrl: pe.value,
			tokenStore: new n()
		})), A = te(), j = g([]), M = g(!0), N = g(null);
		async function P() {
			M.value = !0, N.value = null;
			try {
				j.value = await k.list();
			} catch (e) {
				N.value = r(e, "Failed to load collections."), A.error(N.value);
			} finally {
				M.value = !1;
			}
		}
		let F = g(!1), I = g(null), L = g(""), R = g(""), z = g(!1), me = c(() => I.value ? `Edit collection — ${I.value.name}` : "New collection");
		function B() {
			I.value = null, L.value = "", R.value = j.value[0]?.library_id ?? "", F.value = !0;
		}
		function he(e) {
			I.value = e, L.value = e.name, R.value = e.library_id, F.value = !0;
		}
		function V() {
			F.value = !1, I.value = null;
		}
		async function H() {
			if (!L.value.trim()) {
				A.error("Name is required.");
				return;
			}
			let e = I.value;
			if (!e && !R.value.trim()) {
				A.error("Library is required.");
				return;
			}
			z.value = !0;
			try {
				if (e) {
					let t = { name: L.value };
					await k.update(e.id, t), A.success("Collection updated.");
				} else {
					let e = {
						name: L.value,
						library_id: R.value
					};
					await k.create(e), A.success("Collection created.");
				}
				V(), await P();
			} catch (e) {
				A.error(r(e, "Failed to save collection."));
			} finally {
				z.value = !1;
			}
		}
		let U = g(null);
		async function ge() {
			let e = U.value;
			if (e) try {
				await k.remove(e.id), A.success("Collection deleted."), U.value = null, await P();
			} catch (e) {
				A.error(r(e, "Failed to delete collection.")), U.value = null;
			}
		}
		let W = g(null), G = g([]), K = g(!1), q = g(""), J = g(!1), _e = c(() => W.value ? `Items — ${W.value.name}` : "Collection items"), Y = c({
			get: () => W.value !== null,
			set: (e) => {
				e || Z();
			}
		});
		async function X(e) {
			K.value = !0;
			try {
				G.value = (await k.get(e)).items;
			} catch (e) {
				A.error(r(e, "Failed to load items."));
			} finally {
				K.value = !1;
			}
		}
		async function ve(e) {
			W.value = e, G.value = [], q.value = "", await X(e.id);
		}
		function Z() {
			W.value = null, G.value = [], q.value = "";
		}
		async function ye(e) {
			let t = W.value;
			if (t) try {
				await k.removeItem(t.id, e.id), A.success("Item removed."), await X(t.id);
			} catch (e) {
				A.error(r(e, "Failed to remove item."));
			}
		}
		async function Q() {
			let e = W.value;
			if (e) {
				if (!q.value.trim()) {
					A.error("A query is required to bulk-add items.");
					return;
				}
				J.value = !0;
				try {
					await k.bulkAdd(e.id, q.value), A.success("Items added."), q.value = "", await X(e.id);
				} catch (e) {
					A.error(r(e, "Failed to bulk-add items."));
				} finally {
					J.value = !1;
				}
			}
		}
		async function be(e) {
			try {
				await k.refresh(e.id), A.success("Collection refreshed."), await P();
			} catch (e) {
				A.error(r(e, "Failed to refresh collection."));
			}
		}
		function $(e) {
			return typeof e.title == "string" && e.title ? e.title : e.id;
		}
		return se(P), (e, n) => (h(), u("section", ce, [
			d("header", C, [n[8] ||= d("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), p(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: B
			}, {
				default: b(() => [...n[7] ||= [f(" New collection ", -1)]]),
				_: 1
			})]),
			p(re, null, {
				default: b(() => [...n[9] ||= [
					f(" Group titles into curated sets (like \"Marvel\" or \"Christmas movies\") that appear on the browse screen. ", -1),
					d("strong", null, "New collection", -1),
					f(" creates one; on each row, ", -1),
					d("strong", null, "Items", -1),
					f(" opens its contents where you can add titles by query (e.g. ", -1),
					d("em", null, "genre:action", -1),
					f(") or ", -1),
					d("strong", null, "Remove", -1),
					f(" them, ", -1),
					d("strong", null, "Refresh", -1),
					f(" re-evaluates membership, ", -1),
					d("strong", null, "Edit", -1),
					f(" renames it, and ", -1),
					d("strong", null, "Delete", -1),
					f(" removes it. ", -1)
				]]),
				_: 1
			}),
			M.value ? (h(), u("div", w, [p(a, {
				variant: "text",
				lines: 6
			})])) : N.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load collections",
				description: N.value
			}, {
				actions: b(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: b(() => [...n[10] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (h(), l(o, {
				key: 2,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: b(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: B
				}, {
					default: b(() => [...n[11] ||= [f(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), u("table", T, [n[16] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Name"),
				d("th", { scope: "col" }, "Items"),
				d("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(h(!0), u(s, null, _(j.value, (e) => (h(), u("tr", { key: e.id }, [
				d("td", null, v(e.name), 1),
				d("td", null, [p(ne, {
					tone: "neutral",
					mono: ""
				}, {
					default: b(() => [f(v(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				d("td", null, [d("div", E, [
					p(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => ve(e)
					}, {
						default: b(() => [...n[12] ||= [f(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => be(e)
					}, {
						default: b(() => [...n[13] ||= [f(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => he(e)
					}, {
						default: b(() => [...n[14] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => U.value = e
					}, {
						default: b(() => [...n[15] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			p(t, {
				modelValue: F.value,
				"onUpdate:modelValue": n[2] ||= (e) => F.value = e,
				title: me.value,
				onClose: V
			}, {
				footer: b(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: b(() => [...n[19] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					loading: z.value,
					onClick: H
				}, {
					default: b(() => [f(v(I.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [d("form", {
					class: "admin-collections__form",
					onSubmit: S(H, ["prevent"])
				}, [d("label", le, [n[17] ||= d("span", { class: "admin-collections__label" }, "Name", -1), x(d("input", {
					"onUpdate:modelValue": n[0] ||= (e) => L.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[y, L.value]])]), I.value ? ae("", !0) : (h(), u("label", ue, [n[18] ||= d("span", { class: "admin-collections__label" }, "Library", -1), x(d("input", {
					"onUpdate:modelValue": n[1] ||= (e) => R.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[y, R.value]])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(t, {
				"model-value": U.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": n[4] ||= (e) => U.value = null
			}, {
				footer: b(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[3] ||= (e) => U.value = null
				}, {
					default: b(() => [...n[22] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					onClick: ge
				}, {
					default: b(() => [...n[23] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [d("p", null, [
					n[20] ||= f(" Delete collection ", -1),
					d("strong", null, v(U.value?.name), 1),
					n[21] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(t, {
				modelValue: Y.value,
				"onUpdate:modelValue": n[6] ||= (e) => Y.value = e,
				title: _e.value,
				size: "lg"
			}, {
				footer: b(() => [p(i, {
					variant: "solid",
					size: "sm",
					onClick: Z
				}, {
					default: b(() => [...n[28] ||= [f("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [K.value ? (h(), u("div", de, [p(a, {
					variant: "text",
					lines: 4
				})])) : (h(), u(s, { key: 1 }, [d("form", {
					class: "admin-collections__bulk",
					onSubmit: S(Q, ["prevent"])
				}, [d("label", fe, [n[24] ||= d("span", { class: "admin-collections__label" }, "Bulk add by query", -1), x(d("input", {
					"onUpdate:modelValue": n[5] ||= (e) => q.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[y, q.value]])]), p(i, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: J.value,
					onClick: Q
				}, {
					default: b(() => [...n[25] ||= [f(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), G.value.length === 0 ? (h(), l(o, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (h(), u("table", D, [n[27] ||= d("thead", null, [d("tr", null, [d("th", { scope: "col" }, "Title"), d("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), d("tbody", null, [(h(!0), u(s, null, _(G.value, (e) => (h(), u("tr", { key: e.id }, [d("td", null, v($(e)), 1), d("td", null, [p(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => ye(e)
				}, {
					default: b(() => [...n[26] ||= [f(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-b1724303"]]);
//#endregion
export { O as default };

//# sourceMappingURL=CollectionsPage-B5DgYDRz.js.map