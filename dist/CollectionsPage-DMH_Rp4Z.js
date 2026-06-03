import { a as e, f as t, h as n, i as r, n as i, o as ee, r as a, t as o } from "./Button-C86XulWV.js";
import { t as s } from "./Modal-DaapuyD8.js";
import { t as te } from "./Badge-BiYXL5Nz.js";
import { t as ne } from "./collections-CH3HLdcd.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as re, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as ie, onMounted as ae, openBlock as g, ref as _, renderList as v, toDisplayString as y, vModelText as b, withCtx as x, withDirectives as S, withModifiers as C } from "vue";
//#region src/pages/admin/CollectionsPage.vue?vue&type=script&setup=true&lang.ts
var oe = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, se = { class: "admin-collections__head" }, w = {
	key: 0,
	class: "admin-collections__skel"
}, ce = {
	key: 2,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, le = { class: "admin-collections__actions" }, ue = { class: "admin-collections__field" }, de = {
	key: 0,
	class: "admin-collections__field"
}, fe = {
	key: 0,
	class: "admin-collections__skel"
}, T = { class: "admin-collections__field admin-collections__field--grow" }, E = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, D = /*#__PURE__*/ n(/* @__PURE__ */ h({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(n) {
		let h = n, D = ie("apiBase", ""), O = l(() => typeof D == "string" ? D : D?.value ?? ""), k = new ne(h.client ?? new ee({
			baseUrl: O.value,
			tokenStore: new e()
		})), A = r(), j = _([]), M = _(!0);
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
		let P = _(!1), F = _(null), I = _(""), L = _(""), R = _(!1), z = l(() => F.value ? `Edit collection — ${F.value.name}` : "New collection");
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
		let U = _(null);
		async function me() {
			let e = U.value;
			if (e) try {
				await k.remove(e.id), A.success("Collection deleted."), U.value = null, await N();
			} catch (e) {
				A.error(t(e, "Failed to delete collection.")), U.value = null;
			}
		}
		let W = _(null), G = _([]), K = _(!1), q = _(""), J = _(!1), he = l(() => W.value ? `Items — ${W.value.name}` : "Collection items"), Y = l({
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
		return ae(N), (e, t) => (g(), d("section", oe, [
			f("header", se, [t[8] ||= f("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), m(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: B
			}, {
				default: x(() => [...t[7] ||= [p(" New collection ", -1)]]),
				_: 1
			})]),
			M.value ? (g(), d("div", w, [m(i, {
				variant: "text",
				lines: 6
			})])) : j.value.length === 0 ? (g(), u(a, {
				key: 1,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: x(() => [m(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: B
				}, {
					default: x(() => [...t[9] ||= [p(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("table", ce, [t[14] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Name"),
				f("th", { scope: "col" }, "Items"),
				f("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(g(!0), d(c, null, v(j.value, (e) => (g(), d("tr", { key: e.id }, [
				f("td", null, y(e.name), 1),
				f("td", null, [m(te, {
					tone: "neutral",
					mono: ""
				}, {
					default: x(() => [p(y(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				f("td", null, [f("div", le, [
					m(o, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => ge(e)
					}, {
						default: x(() => [...t[10] ||= [p(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(o, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => ve(e)
					}, {
						default: x(() => [...t[11] ||= [p(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => pe(e)
					}, {
						default: x(() => [...t[12] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(o, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => U.value = e
					}, {
						default: x(() => [...t[13] ||= [p(" Delete ", -1)]]),
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
				footer: x(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: x(() => [...t[17] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: H
				}, {
					default: x(() => [p(y(F.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-collections__form",
					onSubmit: C(H, ["prevent"])
				}, [f("label", ue, [t[15] ||= f("span", { class: "admin-collections__label" }, "Name", -1), S(f("input", {
					"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[b, I.value]])]), F.value ? re("", !0) : (g(), d("label", de, [t[16] ||= f("span", { class: "admin-collections__label" }, "Library", -1), S(f("input", {
					"onUpdate:modelValue": t[1] ||= (e) => L.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[b, L.value]])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(s, {
				"model-value": U.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": t[4] ||= (e) => U.value = null
			}, {
				footer: x(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[3] ||= (e) => U.value = null
				}, {
					default: x(() => [...t[20] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					onClick: me
				}, {
					default: x(() => [...t[21] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					t[18] ||= p(" Delete collection ", -1),
					f("strong", null, y(U.value?.name), 1),
					t[19] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(s, {
				modelValue: Y.value,
				"onUpdate:modelValue": t[6] ||= (e) => Y.value = e,
				title: he.value,
				size: "lg"
			}, {
				footer: x(() => [m(o, {
					variant: "solid",
					size: "sm",
					onClick: Z
				}, {
					default: x(() => [...t[26] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: x(() => [K.value ? (g(), d("div", fe, [m(i, {
					variant: "text",
					lines: 4
				})])) : (g(), d(c, { key: 1 }, [f("form", {
					class: "admin-collections__bulk",
					onSubmit: C(Q, ["prevent"])
				}, [f("label", T, [t[22] ||= f("span", { class: "admin-collections__label" }, "Bulk add by query", -1), S(f("input", {
					"onUpdate:modelValue": t[5] ||= (e) => q.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[b, q.value]])]), m(o, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: J.value,
					onClick: Q
				}, {
					default: x(() => [...t[23] ||= [p(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), G.value.length === 0 ? (g(), u(a, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (g(), d("table", E, [t[25] ||= f("thead", null, [f("tr", null, [f("th", { scope: "col" }, "Title"), f("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), f("tbody", null, [(g(!0), d(c, null, v(G.value, (e) => (g(), d("tr", { key: e.id }, [f("td", null, y($(e)), 1), f("td", null, [m(o, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => _e(e)
				}, {
					default: x(() => [...t[24] ||= [p(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-6bdc91ef"]]);
//#endregion
export { D as default };

//# sourceMappingURL=CollectionsPage-DMH_Rp4Z.js.map