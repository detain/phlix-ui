import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as ee } from "./client-D80As4Gx.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./Button-DWa6Ld_Z.js";
import { t as i } from "./Badge-B6MgOwKQ.js";
import { t as a } from "./Modal-ovdBg3Sx.js";
import { t as o } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-ZlI5t4KT.js";
import { t as c } from "./PageHint-BoAlFFBN.js";
import { t as l } from "./collections-CH3HLdcd.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as ne, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as re, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, vModelText as C, withCtx as w, withDirectives as T, withModifiers as E } from "vue";
//#region src/pages/admin/CollectionsPage.vue?vue&type=script&setup=true&lang.ts
var ie = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, ae = { class: "admin-collections__head" }, oe = {
	key: 0,
	class: "admin-collections__skel"
}, se = {
	key: 3,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, ce = { class: "admin-collections__actions" }, le = { class: "admin-collections__field" }, ue = {
	key: 0,
	class: "admin-collections__field"
}, de = {
	key: 0,
	class: "admin-collections__skel"
}, fe = { class: "admin-collections__field admin-collections__field--grow" }, pe = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, D = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(e) {
		let _ = e, D = re("apiBase", ""), me = d(() => typeof D == "string" ? D : D?.value ?? ""), O = new l(_.client ?? new ee({
			baseUrl: me.value,
			tokenStore: new t()
		})), k = te(), A = b([]), j = b(!0), M = b(null);
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
		let P = b(!1), F = b(null), I = b(""), L = b(""), R = b(!1), he = d(() => F.value ? `Edit collection — ${F.value.name}` : "New collection");
		function z() {
			F.value = null, I.value = "", L.value = A.value[0]?.library_id ?? "", P.value = !0;
		}
		function B(e) {
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
		let U = b(null);
		async function ge() {
			let e = U.value;
			if (e) try {
				await O.remove(e.id), k.success("Collection deleted."), U.value = null, await N();
			} catch (e) {
				k.error(n(e, "Failed to delete collection.")), U.value = null;
			}
		}
		let W = b(null), G = b([]), K = b(!1), q = b(""), J = b(!1), _e = d(() => W.value ? `Items — ${W.value.name}` : "Collection items"), Y = d({
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
		async function ve(e) {
			W.value = e, G.value = [], q.value = "", await X(e.id);
		}
		function Z() {
			W.value = null, G.value = [], q.value = "";
		}
		async function ye(e) {
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
		async function be(e) {
			try {
				await O.refresh(e.id), k.success("Collection refreshed."), await N();
			} catch (e) {
				k.error(n(e, "Failed to refresh collection."));
			}
		}
		function $(e) {
			return typeof e.title == "string" && e.title ? e.title : e.id;
		}
		return v(N), (e, t) => (y(), p("section", ie, [
			m("header", ae, [t[8] ||= m("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), g(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: z
			}, {
				default: w(() => [...t[7] ||= [h(" New collection ", -1)]]),
				_: 1
			})]),
			g(c, null, {
				default: w(() => [...t[9] ||= [
					h(" Group titles into curated sets (like \"Marvel\" or \"Christmas movies\") that appear on the browse screen. ", -1),
					m("strong", null, "New collection", -1),
					h(" creates one; on each row, ", -1),
					m("strong", null, "Items", -1),
					h(" opens its contents where you can add titles by query (e.g. ", -1),
					m("em", null, "genre:action", -1),
					h(") or ", -1),
					m("strong", null, "Remove", -1),
					h(" them, ", -1),
					m("strong", null, "Refresh", -1),
					h(" re-evaluates membership, ", -1),
					m("strong", null, "Edit", -1),
					h(" renames it, and ", -1),
					m("strong", null, "Delete", -1),
					h(" removes it. ", -1)
				]]),
				_: 1
			}),
			j.value ? (y(), p("div", oe, [g(o, {
				variant: "text",
				lines: 6
			})])) : M.value ? (y(), f(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load collections",
				description: M.value
			}, {
				actions: w(() => [g(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: N
				}, {
					default: w(() => [...t[10] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (y(), f(s, {
				key: 2,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: w(() => [g(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: z
				}, {
					default: w(() => [...t[11] ||= [h(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (y(), p("table", se, [t[16] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Items"),
				m("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(y(!0), p(u, null, x(A.value, (e) => (y(), p("tr", { key: e.id }, [
				m("td", null, S(e.name), 1),
				m("td", null, [g(i, {
					tone: "neutral",
					mono: ""
				}, {
					default: w(() => [h(S(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				m("td", null, [m("div", ce, [
					g(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => ve(e)
					}, {
						default: w(() => [...t[12] ||= [h(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => be(e)
					}, {
						default: w(() => [...t[13] ||= [h(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => B(e)
					}, {
						default: w(() => [...t[14] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => U.value = e
					}, {
						default: w(() => [...t[15] ||= [h(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			g(a, {
				modelValue: P.value,
				"onUpdate:modelValue": t[2] ||= (e) => P.value = e,
				title: he.value,
				onClose: V
			}, {
				footer: w(() => [g(r, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: w(() => [...t[19] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(r, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: H
				}, {
					default: w(() => [h(S(F.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [m("form", {
					class: "admin-collections__form",
					onSubmit: E(H, ["prevent"])
				}, [m("label", le, [t[17] ||= m("span", { class: "admin-collections__label" }, "Name", -1), T(m("input", {
					"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[C, I.value]])]), F.value ? ne("", !0) : (y(), p("label", ue, [t[18] ||= m("span", { class: "admin-collections__label" }, "Library", -1), T(m("input", {
					"onUpdate:modelValue": t[1] ||= (e) => L.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[C, L.value]])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			g(a, {
				"model-value": U.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": t[4] ||= (e) => U.value = null
			}, {
				footer: w(() => [g(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[3] ||= (e) => U.value = null
				}, {
					default: w(() => [...t[22] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(r, {
					variant: "solid",
					size: "sm",
					onClick: ge
				}, {
					default: w(() => [...t[23] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: w(() => [m("p", null, [
					t[20] ||= h(" Delete collection ", -1),
					m("strong", null, S(U.value?.name), 1),
					t[21] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(a, {
				modelValue: Y.value,
				"onUpdate:modelValue": t[6] ||= (e) => Y.value = e,
				title: _e.value,
				size: "lg"
			}, {
				footer: w(() => [g(r, {
					variant: "solid",
					size: "sm",
					onClick: Z
				}, {
					default: w(() => [...t[28] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: w(() => [K.value ? (y(), p("div", de, [g(o, {
					variant: "text",
					lines: 4
				})])) : (y(), p(u, { key: 1 }, [m("form", {
					class: "admin-collections__bulk",
					onSubmit: E(Q, ["prevent"])
				}, [m("label", fe, [t[24] ||= m("span", { class: "admin-collections__label" }, "Bulk add by query", -1), T(m("input", {
					"onUpdate:modelValue": t[5] ||= (e) => q.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[C, q.value]])]), g(r, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: J.value,
					onClick: Q
				}, {
					default: w(() => [...t[25] ||= [h(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), G.value.length === 0 ? (y(), f(s, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (y(), p("table", pe, [t[27] ||= m("thead", null, [m("tr", null, [m("th", { scope: "col" }, "Title"), m("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), m("tbody", null, [(y(!0), p(u, null, x(G.value, (e) => (y(), p("tr", { key: e.id }, [m("td", null, S($(e)), 1), m("td", null, [g(r, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => ye(e)
				}, {
					default: w(() => [...t[26] ||= [h(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-b1724303"]]);
//#endregion
export { D as default };

//# sourceMappingURL=CollectionsPage-BH99-GuD.js.map