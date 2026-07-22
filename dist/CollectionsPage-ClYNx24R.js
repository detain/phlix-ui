import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as ee } from "./client-BzWwyWKr.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-DWa6Ld_Z.js";
import { t as ne } from "./Badge-B6MgOwKQ.js";
import { t as i } from "./Modal-aFganlu3.js";
import { t as a } from "./Skeleton-DhQmxeNg.js";
import { t as o } from "./EmptyState-ZlI5t4KT.js";
import { t as re } from "./PageHint-BoAlFFBN.js";
import { t as ie } from "./collections-CH3HLdcd.js";
import { t as s } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as ae, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, onMounted as oe, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as x, vModelText as S, withCtx as C, withDirectives as w, withModifiers as T } from "vue";
//#region src/pages/admin/CollectionsPage.vue?vue&type=script&setup=true&lang.ts
var se = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, ce = { class: "admin-collections__head" }, le = {
	key: 0,
	class: "admin-collections__skel"
}, ue = {
	key: 3,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, de = { class: "admin-collections__actions" }, fe = { class: "admin-collections__field" }, pe = {
	key: 0,
	class: "admin-collections__field"
}, me = {
	key: 0,
	class: "admin-collections__skel"
}, E = { class: "admin-collections__field admin-collections__field--grow" }, he = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, D = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(e) {
		let h = e, D = g("apiBase", ""), ge = l(() => typeof D == "string" ? D : D?.value ?? ""), O = new ie(h.client ?? new ee({
			baseUrl: ge.value,
			tokenStore: new t()
		})), k = te(), A = v([]), j = v(!0), M = v(null);
		async function N() {
			j.value = !0, M.value = null;
			try {
				A.value = await O.list();
			} catch (e) {
				M.value = n(e, "Failed to load collections."), k.error(M.value);
			} finally {
				j.value = !1;
			}
		}
		let P = v(!1), F = v(null), I = v(""), L = v(""), R = v(!1), z = l(() => F.value ? `Edit collection — ${F.value.name}` : "New collection");
		function B() {
			F.value = null, I.value = "", L.value = A.value[0]?.library_id ?? "", P.value = !0;
		}
		function _e(e) {
			F.value = e, I.value = e.name, L.value = e.library_id, P.value = !0;
		}
		function V() {
			P.value = !1, F.value = null;
		}
		async function H() {
			if (!I.value.trim()) {
				k.error("Name is required.");
				return;
			}
			let e = F.value;
			if (!e && !L.value.trim()) {
				k.error("Library is required.");
				return;
			}
			R.value = !0;
			try {
				if (e) {
					let t = { name: I.value };
					await O.update(e.id, t), k.success("Collection updated.");
				} else {
					let e = {
						name: I.value,
						library_id: L.value
					};
					await O.create(e), k.success("Collection created.");
				}
				V(), await N();
			} catch (e) {
				k.error(n(e, "Failed to save collection."));
			} finally {
				R.value = !1;
			}
		}
		let U = v(null);
		async function ve() {
			let e = U.value;
			if (e) try {
				await O.remove(e.id), k.success("Collection deleted."), U.value = null, await N();
			} catch (e) {
				k.error(n(e, "Failed to delete collection.")), U.value = null;
			}
		}
		let W = v(null), G = v([]), K = v(!1), q = v(""), J = v(!1), ye = l(() => W.value ? `Items — ${W.value.name}` : "Collection items"), Y = l({
			get: () => W.value !== null,
			set: (e) => {
				e || Z();
			}
		});
		async function X(e) {
			K.value = !0;
			try {
				let t = await O.get(e);
				G.value = t.items;
			} catch (e) {
				k.error(n(e, "Failed to load items."));
			} finally {
				K.value = !1;
			}
		}
		async function be(e) {
			W.value = e, G.value = [], q.value = "", await X(e.id);
		}
		function Z() {
			W.value = null, G.value = [], q.value = "";
		}
		async function xe(e) {
			let t = W.value;
			if (t) try {
				await O.removeItem(t.id, e.id), k.success("Item removed."), await X(t.id);
			} catch (e) {
				k.error(n(e, "Failed to remove item."));
			}
		}
		async function Q() {
			let e = W.value;
			if (e) {
				if (!q.value.trim()) {
					k.error("A query is required to bulk-add items.");
					return;
				}
				J.value = !0;
				try {
					await O.bulkAdd(e.id, q.value), k.success("Items added."), q.value = "", await X(e.id);
				} catch (e) {
					k.error(n(e, "Failed to bulk-add items."));
				} finally {
					J.value = !1;
				}
			}
		}
		async function Se(e) {
			try {
				await O.refresh(e.id), k.success("Collection refreshed."), await N();
			} catch (e) {
				k.error(n(e, "Failed to refresh collection."));
			}
		}
		function $(e) {
			return typeof e.title == "string" && e.title ? e.title : e.id;
		}
		return oe(N), (e, t) => (_(), d("section", se, [
			f("header", ce, [t[8] ||= f("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: B
			}, {
				default: C(() => [...t[7] ||= [p(" New collection ", -1)]]),
				_: 1
			})]),
			m(re, {
				links: x(s).collections.links,
				details: x(s).collections.details
			}, {
				default: C(() => [...t[9] ||= [
					p(" Group titles into curated sets (like \"Marvel\" or \"Christmas movies\") that appear on the browse screen. ", -1),
					f("strong", null, "New collection", -1),
					p(" creates one; on each row, ", -1),
					f("strong", null, "Items", -1),
					p(" opens its contents where you can add titles by query (e.g. ", -1),
					f("em", null, "genre:action", -1),
					p(") or ", -1),
					f("strong", null, "Remove", -1),
					p(" them, ", -1),
					f("strong", null, "Refresh", -1),
					p(" re-evaluates membership, ", -1),
					f("strong", null, "Edit", -1),
					p(" renames it, and ", -1),
					f("strong", null, "Delete", -1),
					p(" removes it. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			j.value ? (_(), d("div", le, [m(a, {
				variant: "text",
				lines: 6
			})])) : M.value ? (_(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load collections",
				description: M.value
			}, {
				actions: C(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: N
				}, {
					default: C(() => [...t[10] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (_(), u(o, {
				key: 2,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: C(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: B
				}, {
					default: C(() => [...t[11] ||= [p(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), d("table", ue, [t[16] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Name"),
				f("th", { scope: "col" }, "Items"),
				f("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(_(!0), d(c, null, y(A.value, (e) => (_(), d("tr", { key: e.id }, [
				f("td", null, b(e.name), 1),
				f("td", null, [m(ne, {
					tone: "neutral",
					mono: ""
				}, {
					default: C(() => [p(b(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				f("td", null, [f("div", de, [
					m(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => be(e)
					}, {
						default: C(() => [...t[12] ||= [p(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => Se(e)
					}, {
						default: C(() => [...t[13] ||= [p(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => _e(e)
					}, {
						default: C(() => [...t[14] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => U.value = e
					}, {
						default: C(() => [...t[15] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			m(i, {
				modelValue: P.value,
				"onUpdate:modelValue": t[2] ||= (e) => P.value = e,
				title: z.value,
				onClose: V
			}, {
				footer: C(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: C(() => [...t[19] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: H
				}, {
					default: C(() => [p(b(F.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [f("form", {
					class: "admin-collections__form",
					onSubmit: T(H, ["prevent"])
				}, [f("label", fe, [t[17] ||= f("span", { class: "admin-collections__label" }, "Name", -1), w(f("input", {
					"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[S, I.value]])]), F.value ? ae("", !0) : (_(), d("label", pe, [t[18] ||= f("span", { class: "admin-collections__label" }, "Library", -1), w(f("input", {
					"onUpdate:modelValue": t[1] ||= (e) => L.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[S, L.value]])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(i, {
				"model-value": U.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": t[4] ||= (e) => U.value = null
			}, {
				footer: C(() => [m(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[3] ||= (e) => U.value = null
				}, {
					default: C(() => [...t[22] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(r, {
					variant: "solid",
					size: "sm",
					onClick: ve
				}, {
					default: C(() => [...t[23] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [f("p", null, [
					t[20] ||= p(" Delete collection ", -1),
					f("strong", null, b(U.value?.name), 1),
					t[21] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(i, {
				modelValue: Y.value,
				"onUpdate:modelValue": t[6] ||= (e) => Y.value = e,
				title: ye.value,
				size: "lg"
			}, {
				footer: C(() => [m(r, {
					variant: "solid",
					size: "sm",
					onClick: Z
				}, {
					default: C(() => [...t[28] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: C(() => [K.value ? (_(), d("div", me, [m(a, {
					variant: "text",
					lines: 4
				})])) : (_(), d(c, { key: 1 }, [f("form", {
					class: "admin-collections__bulk",
					onSubmit: T(Q, ["prevent"])
				}, [f("label", E, [t[24] ||= f("span", { class: "admin-collections__label" }, "Bulk add by query", -1), w(f("input", {
					"onUpdate:modelValue": t[5] ||= (e) => q.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[S, q.value]])]), m(r, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: J.value,
					onClick: Q
				}, {
					default: C(() => [...t[25] ||= [p(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), G.value.length === 0 ? (_(), u(o, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (_(), d("table", he, [t[27] ||= f("thead", null, [f("tr", null, [f("th", { scope: "col" }, "Title"), f("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), f("tbody", null, [(_(!0), d(c, null, y(G.value, (e) => (_(), d("tr", { key: e.id }, [f("td", null, b($(e)), 1), f("td", null, [m(r, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => xe(e)
				}, {
					default: C(() => [...t[26] ||= [p(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-bdcb4eb8"]]);
//#endregion
export { D as default };

//# sourceMappingURL=CollectionsPage-ClYNx24R.js.map