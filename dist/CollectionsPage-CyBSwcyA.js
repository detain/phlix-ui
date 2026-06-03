import { a as e, d as t, i as n, m as r, n as i, r as ee, t as a } from "./Button-DjEQ9y17.js";
import { t as o } from "./Modal-BkSAbwHm.js";
import { t as s } from "./EmptyState-bbKd8GNA.js";
import { t as te } from "./Badge-DobVc76J.js";
import { t as c } from "./collections-CH3HLdcd.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as ne, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as re, onMounted as ie, openBlock as _, ref as v, renderList as y, toDisplayString as b, vModelText as x, withCtx as S, withDirectives as C, withModifiers as w } from "vue";
//#region src/pages/admin/CollectionsPage.vue?vue&type=script&setup=true&lang.ts
var T = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, ae = { class: "admin-collections__head" }, oe = {
	key: 0,
	class: "admin-collections__skel"
}, se = {
	key: 2,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, ce = { class: "admin-collections__actions" }, le = { class: "admin-collections__field" }, ue = {
	key: 0,
	class: "admin-collections__field"
}, E = {
	key: 0,
	class: "admin-collections__skel"
}, D = { class: "admin-collections__field admin-collections__field--grow" }, de = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, O = /*#__PURE__*/ r(/* @__PURE__ */ g({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(r) {
		let g = r, O = re("apiBase", ""), fe = u(() => typeof O == "string" ? O : O?.value ?? ""), k = new c(g.client ?? new e({
			baseUrl: fe.value,
			tokenStore: new n()
		})), A = ee(), j = v([]), M = v(!0);
		async function N() {
			M.value = !0;
			try {
				j.value = await k.list();
			} catch (e) {
				A.error(t(e, "Failed to load collections."));
			} finally {
				M.value = !1;
			}
		}
		let P = v(!1), F = v(null), I = v(""), L = v(""), R = v(!1), z = u(() => F.value ? `Edit collection — ${F.value.name}` : "New collection");
		function B() {
			F.value = null, I.value = "", L.value = j.value[0]?.library_id ?? "", P.value = !0;
		}
		function pe(e) {
			F.value = e, I.value = e.name, L.value = e.library_id, P.value = !0;
		}
		function V() {
			P.value = !1, F.value = null;
		}
		async function H() {
			if (!I.value.trim()) {
				A.error("Name is required.");
				return;
			}
			let e = F.value;
			if (!e && !L.value.trim()) {
				A.error("Library is required.");
				return;
			}
			R.value = !0;
			try {
				if (e) {
					let t = { name: I.value };
					await k.update(e.id, t), A.success("Collection updated.");
				} else {
					let e = {
						name: I.value,
						library_id: L.value
					};
					await k.create(e), A.success("Collection created.");
				}
				V(), await N();
			} catch (e) {
				A.error(t(e, "Failed to save collection."));
			} finally {
				R.value = !1;
			}
		}
		let U = v(null);
		async function me() {
			let e = U.value;
			if (e) try {
				await k.remove(e.id), A.success("Collection deleted."), U.value = null, await N();
			} catch (e) {
				A.error(t(e, "Failed to delete collection.")), U.value = null;
			}
		}
		let W = v(null), G = v([]), K = v(!1), q = v(""), J = v(!1), he = u(() => W.value ? `Items — ${W.value.name}` : "Collection items"), Y = u({
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
				A.error(t(e, "Failed to load items."));
			} finally {
				K.value = !1;
			}
		}
		async function ge(e) {
			W.value = e, G.value = [], q.value = "", await X(e.id);
		}
		function Z() {
			W.value = null, G.value = [], q.value = "";
		}
		async function _e(e) {
			let n = W.value;
			if (n) try {
				await k.removeItem(n.id, e.id), A.success("Item removed."), await X(n.id);
			} catch (e) {
				A.error(t(e, "Failed to remove item."));
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
					A.error(t(e, "Failed to bulk-add items."));
				} finally {
					J.value = !1;
				}
			}
		}
		async function ve(e) {
			try {
				await k.refresh(e.id), A.success("Collection refreshed."), await N();
			} catch (e) {
				A.error(t(e, "Failed to refresh collection."));
			}
		}
		function $(e) {
			return typeof e.title == "string" && e.title ? e.title : e.id;
		}
		return ie(N), (e, t) => (_(), f("section", T, [
			p("header", ae, [t[8] ||= p("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: B
			}, {
				default: S(() => [...t[7] ||= [m(" New collection ", -1)]]),
				_: 1
			})]),
			M.value ? (_(), f("div", oe, [h(i, {
				variant: "text",
				lines: 6
			})])) : j.value.length === 0 ? (_(), d(s, {
				key: 1,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: B
				}, {
					default: S(() => [...t[9] ||= [m(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", se, [t[14] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "Items"),
				p("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(_(!0), f(l, null, y(j.value, (e) => (_(), f("tr", { key: e.id }, [
				p("td", null, b(e.name), 1),
				p("td", null, [h(te, {
					tone: "neutral",
					mono: ""
				}, {
					default: S(() => [m(b(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				p("td", null, [p("div", ce, [
					h(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => ge(e)
					}, {
						default: S(() => [...t[10] ||= [m(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => ve(e)
					}, {
						default: S(() => [...t[11] ||= [m(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => pe(e)
					}, {
						default: S(() => [...t[12] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => U.value = e
					}, {
						default: S(() => [...t[13] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			h(o, {
				modelValue: P.value,
				"onUpdate:modelValue": t[2] ||= (e) => P.value = e,
				title: z.value,
				onClose: V
			}, {
				footer: S(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: S(() => [...t[17] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: H
				}, {
					default: S(() => [m(b(F.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [p("form", {
					class: "admin-collections__form",
					onSubmit: w(H, ["prevent"])
				}, [p("label", le, [t[15] ||= p("span", { class: "admin-collections__label" }, "Name", -1), C(p("input", {
					"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[x, I.value]])]), F.value ? ne("", !0) : (_(), f("label", ue, [t[16] ||= p("span", { class: "admin-collections__label" }, "Library", -1), C(p("input", {
					"onUpdate:modelValue": t[1] ||= (e) => L.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[x, L.value]])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(o, {
				"model-value": U.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": t[4] ||= (e) => U.value = null
			}, {
				footer: S(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[3] ||= (e) => U.value = null
				}, {
					default: S(() => [...t[20] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: me
				}, {
					default: S(() => [...t[21] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [p("p", null, [
					t[18] ||= m(" Delete collection ", -1),
					p("strong", null, b(U.value?.name), 1),
					t[19] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				modelValue: Y.value,
				"onUpdate:modelValue": t[6] ||= (e) => Y.value = e,
				title: he.value,
				size: "lg"
			}, {
				footer: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					onClick: Z
				}, {
					default: S(() => [...t[26] ||= [m("Close", -1)]]),
					_: 1
				})]),
				default: S(() => [K.value ? (_(), f("div", E, [h(i, {
					variant: "text",
					lines: 4
				})])) : (_(), f(l, { key: 1 }, [p("form", {
					class: "admin-collections__bulk",
					onSubmit: w(Q, ["prevent"])
				}, [p("label", D, [t[22] ||= p("span", { class: "admin-collections__label" }, "Bulk add by query", -1), C(p("input", {
					"onUpdate:modelValue": t[5] ||= (e) => q.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[x, q.value]])]), h(a, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: J.value,
					onClick: Q
				}, {
					default: S(() => [...t[23] ||= [m(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), G.value.length === 0 ? (_(), d(s, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (_(), f("table", de, [t[25] ||= p("thead", null, [p("tr", null, [p("th", { scope: "col" }, "Title"), p("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), p("tbody", null, [(_(!0), f(l, null, y(G.value, (e) => (_(), f("tr", { key: e.id }, [p("td", null, b($(e)), 1), p("td", null, [h(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => _e(e)
				}, {
					default: S(() => [...t[24] ||= [m(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-6bdc91ef"]]);
//#endregion
export { O as default };

//# sourceMappingURL=CollectionsPage-CyBSwcyA.js.map