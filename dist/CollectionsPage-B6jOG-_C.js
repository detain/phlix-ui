import { a as e, f as t, h as n, i as r, n as i, o as ee, r as a, t as o } from "./Button-C86XulWV.js";
import { t as s } from "./Modal-DaapuyD8.js";
import { t as te } from "./Badge-BiYXL5Nz.js";
import { t as ne } from "./collections-CH3HLdcd.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as re, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, onMounted as ie, openBlock as _, ref as v, renderList as y, toDisplayString as b, vModelText as x, withCtx as S, withDirectives as C, withModifiers as w } from "vue";
//#region src/pages/admin/CollectionsPage.vue?vue&type=script&setup=true&lang.ts
var ae = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, oe = { class: "admin-collections__head" }, se = {
	key: 0,
	class: "admin-collections__skel"
}, ce = {
	key: 3,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, le = { class: "admin-collections__actions" }, ue = { class: "admin-collections__field" }, T = {
	key: 0,
	class: "admin-collections__field"
}, E = {
	key: 0,
	class: "admin-collections__skel"
}, de = { class: "admin-collections__field admin-collections__field--grow" }, fe = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, D = /*#__PURE__*/ n(/* @__PURE__ */ h({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(n) {
		let h = n, D = g("apiBase", ""), pe = l(() => typeof D == "string" ? D : D?.value ?? ""), O = new ne(h.client ?? new ee({
			baseUrl: pe.value,
			tokenStore: new e()
		})), k = r(), A = v([]), j = v(!0), M = v(null);
		async function N() {
			j.value = !0, M.value = null;
			try {
				A.value = await O.list();
			} catch (e) {
				M.value = t(e, "Failed to load collections."), k.error(M.value);
			} finally {
				j.value = !1;
			}
		}
		let P = v(!1), F = v(null), I = v(""), L = v(""), R = v(!1), z = l(() => F.value ? `Edit collection — ${F.value.name}` : "New collection");
		function B() {
			F.value = null, I.value = "", L.value = A.value[0]?.library_id ?? "", P.value = !0;
		}
		function me(e) {
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
				k.error(t(e, "Failed to save collection."));
			} finally {
				R.value = !1;
			}
		}
		let U = v(null);
		async function he() {
			let e = U.value;
			if (e) try {
				await O.remove(e.id), k.success("Collection deleted."), U.value = null, await N();
			} catch (e) {
				k.error(t(e, "Failed to delete collection.")), U.value = null;
			}
		}
		let W = v(null), G = v([]), K = v(!1), q = v(""), J = v(!1), ge = l(() => W.value ? `Items — ${W.value.name}` : "Collection items"), Y = l({
			get: () => W.value !== null,
			set: (e) => {
				e || Z();
			}
		});
		async function X(e) {
			K.value = !0;
			try {
				G.value = (await O.get(e)).items;
			} catch (e) {
				k.error(t(e, "Failed to load items."));
			} finally {
				K.value = !1;
			}
		}
		async function _e(e) {
			W.value = e, G.value = [], q.value = "", await X(e.id);
		}
		function Z() {
			W.value = null, G.value = [], q.value = "";
		}
		async function ve(e) {
			let n = W.value;
			if (n) try {
				await O.removeItem(n.id, e.id), k.success("Item removed."), await X(n.id);
			} catch (e) {
				k.error(t(e, "Failed to remove item."));
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
					k.error(t(e, "Failed to bulk-add items."));
				} finally {
					J.value = !1;
				}
			}
		}
		async function ye(e) {
			try {
				await O.refresh(e.id), k.success("Collection refreshed."), await N();
			} catch (e) {
				k.error(t(e, "Failed to refresh collection."));
			}
		}
		function $(e) {
			return typeof e.title == "string" && e.title ? e.title : e.id;
		}
		return ie(N), (e, t) => (_(), d("section", ae, [
			f("header", oe, [t[8] ||= f("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), m(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: B
			}, {
				default: S(() => [...t[7] ||= [p(" New collection ", -1)]]),
				_: 1
			})]),
			j.value ? (_(), d("div", se, [m(i, {
				variant: "text",
				lines: 6
			})])) : M.value ? (_(), u(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load collections",
				description: M.value
			}, {
				actions: S(() => [m(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: N
				}, {
					default: S(() => [...t[9] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (_(), u(a, {
				key: 2,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: S(() => [m(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: B
				}, {
					default: S(() => [...t[10] ||= [p(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), d("table", ce, [t[15] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Name"),
				f("th", { scope: "col" }, "Items"),
				f("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(_(!0), d(c, null, y(A.value, (e) => (_(), d("tr", { key: e.id }, [
				f("td", null, b(e.name), 1),
				f("td", null, [m(te, {
					tone: "neutral",
					mono: ""
				}, {
					default: S(() => [p(b(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				f("td", null, [f("div", le, [
					m(o, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => _e(e)
					}, {
						default: S(() => [...t[11] ||= [p(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(o, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => ye(e)
					}, {
						default: S(() => [...t[12] ||= [p(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => me(e)
					}, {
						default: S(() => [...t[13] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(o, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => U.value = e
					}, {
						default: S(() => [...t[14] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			m(s, {
				modelValue: P.value,
				"onUpdate:modelValue": t[2] ||= (e) => P.value = e,
				title: z.value,
				onClose: V
			}, {
				footer: S(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: S(() => [...t[18] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: H
				}, {
					default: S(() => [p(b(F.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [f("form", {
					class: "admin-collections__form",
					onSubmit: w(H, ["prevent"])
				}, [f("label", ue, [t[16] ||= f("span", { class: "admin-collections__label" }, "Name", -1), C(f("input", {
					"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[x, I.value]])]), F.value ? re("", !0) : (_(), d("label", T, [t[17] ||= f("span", { class: "admin-collections__label" }, "Library", -1), C(f("input", {
					"onUpdate:modelValue": t[1] ||= (e) => L.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[x, L.value]])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(s, {
				"model-value": U.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": t[4] ||= (e) => U.value = null
			}, {
				footer: S(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[3] ||= (e) => U.value = null
				}, {
					default: S(() => [...t[21] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					onClick: he
				}, {
					default: S(() => [...t[22] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [f("p", null, [
					t[19] ||= p(" Delete collection ", -1),
					f("strong", null, b(U.value?.name), 1),
					t[20] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(s, {
				modelValue: Y.value,
				"onUpdate:modelValue": t[6] ||= (e) => Y.value = e,
				title: ge.value,
				size: "lg"
			}, {
				footer: S(() => [m(o, {
					variant: "solid",
					size: "sm",
					onClick: Z
				}, {
					default: S(() => [...t[27] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: S(() => [K.value ? (_(), d("div", E, [m(i, {
					variant: "text",
					lines: 4
				})])) : (_(), d(c, { key: 1 }, [f("form", {
					class: "admin-collections__bulk",
					onSubmit: w(Q, ["prevent"])
				}, [f("label", de, [t[23] ||= f("span", { class: "admin-collections__label" }, "Bulk add by query", -1), C(f("input", {
					"onUpdate:modelValue": t[5] ||= (e) => q.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[x, q.value]])]), m(o, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: J.value,
					onClick: Q
				}, {
					default: S(() => [...t[24] ||= [p(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), G.value.length === 0 ? (_(), u(a, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (_(), d("table", fe, [t[26] ||= f("thead", null, [f("tr", null, [f("th", { scope: "col" }, "Title"), f("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), f("tbody", null, [(_(!0), d(c, null, y(G.value, (e) => (_(), d("tr", { key: e.id }, [f("td", null, b($(e)), 1), f("td", null, [m(o, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => ve(e)
				}, {
					default: S(() => [...t[25] ||= [p(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-709929a0"]]);
//#endregion
export { D as default };

//# sourceMappingURL=CollectionsPage-B6jOG-_C.js.map