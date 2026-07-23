import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-CqhoiLRk.js";
import { c as n, f as r, t as ee } from "./client-BzWwyWKr.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as ne } from "./Badge-B6MgOwKQ.js";
import { t as a } from "./Skeleton-DhQmxeNg.js";
import { t as o } from "./EmptyState-ZlI5t4KT.js";
import { t as re } from "./PageHint-BoAlFFBN.js";
import { t as ie } from "./collections-CH3HLdcd.js";
import { t as s } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as ae, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as oe, onMounted as se, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, vModelText as x, withCtx as S, withDirectives as C, withModifiers as w } from "vue";
//#region src/pages/admin/CollectionsPage.vue?vue&type=script&setup=true&lang.ts
var ce = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, T = { class: "admin-collections__head" }, E = {
	key: 0,
	class: "admin-collections__skel"
}, le = {
	key: 3,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, ue = { class: "admin-collections__actions" }, de = { class: "admin-collections__field" }, fe = {
	key: 0,
	class: "admin-collections__field"
}, D = {
	key: 0,
	class: "admin-collections__skel"
}, pe = { class: "admin-collections__field admin-collections__field--grow" }, me = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, O = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(e) {
		let h = e, O = oe("apiBase", ""), he = l(() => typeof O == "string" ? O : O?.value ?? ""), k = new ie(h.client ?? new ee({
			baseUrl: he.value,
			tokenStore: new n()
		})), A = te(), j = _([]), M = _(!0), N = _(null);
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
		let F = _(!1), I = _(null), L = _(""), R = _(""), z = _(!1), ge = l(() => I.value ? `Edit collection — ${I.value.name}` : "New collection");
		function B() {
			I.value = null, L.value = "", R.value = j.value[0]?.library_id ?? "", F.value = !0;
		}
		function _e(e) {
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
		let U = _(null);
		async function ve() {
			let e = U.value;
			if (e) try {
				await k.remove(e.id), A.success("Collection deleted."), U.value = null, await P();
			} catch (e) {
				A.error(r(e, "Failed to delete collection.")), U.value = null;
			}
		}
		let W = _(null), G = _([]), K = _(!1), q = _(""), J = _(!1), ye = l(() => W.value ? `Items — ${W.value.name}` : "Collection items"), Y = l({
			get: () => W.value !== null,
			set: (e) => {
				e || Z();
			}
		});
		async function X(e) {
			K.value = !0;
			try {
				let t = await k.get(e);
				G.value = t.items;
			} catch (e) {
				A.error(r(e, "Failed to load items."));
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
		async function Se(e) {
			try {
				await k.refresh(e.id), A.success("Collection refreshed."), await P();
			} catch (e) {
				A.error(r(e, "Failed to refresh collection."));
			}
		}
		function $(e) {
			return typeof e.title == "string" && e.title ? e.title : e.id;
		}
		return se(P), (e, n) => (g(), d("section", ce, [
			f("header", T, [n[8] ||= f("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), m(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: B
			}, {
				default: S(() => [...n[7] ||= [p(" New collection ", -1)]]),
				_: 1
			})]),
			m(re, {
				links: b(s).collections.links,
				details: b(s).collections.details
			}, {
				default: S(() => [...n[9] ||= [
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
			M.value ? (g(), d("div", E, [m(a, {
				variant: "text",
				lines: 6
			})])) : N.value ? (g(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load collections",
				description: N.value
			}, {
				actions: S(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: S(() => [...n[10] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (g(), u(o, {
				key: 2,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: S(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: B
				}, {
					default: S(() => [...n[11] ||= [p(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("table", le, [n[16] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Name"),
				f("th", { scope: "col" }, "Items"),
				f("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(g(!0), d(c, null, v(j.value, (e) => (g(), d("tr", { key: e.id }, [
				f("td", null, y(e.name), 1),
				f("td", null, [m(ne, {
					tone: "neutral",
					mono: ""
				}, {
					default: S(() => [p(y(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				f("td", null, [f("div", ue, [
					m(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => be(e)
					}, {
						default: S(() => [...n[12] ||= [p(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => Se(e)
					}, {
						default: S(() => [...n[13] ||= [p(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => _e(e)
					}, {
						default: S(() => [...n[14] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => U.value = e
					}, {
						default: S(() => [...n[15] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			m(t, {
				modelValue: F.value,
				"onUpdate:modelValue": n[2] ||= (e) => F.value = e,
				title: ge.value,
				onClose: V
			}, {
				footer: S(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: S(() => [...n[19] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					loading: z.value,
					onClick: H
				}, {
					default: S(() => [p(y(I.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [f("form", {
					class: "admin-collections__form",
					onSubmit: w(H, ["prevent"])
				}, [f("label", de, [n[17] ||= f("span", { class: "admin-collections__label" }, "Name", -1), C(f("input", {
					"onUpdate:modelValue": n[0] ||= (e) => L.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[x, L.value]])]), I.value ? ae("", !0) : (g(), d("label", fe, [n[18] ||= f("span", { class: "admin-collections__label" }, "Library", -1), C(f("input", {
					"onUpdate:modelValue": n[1] ||= (e) => R.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[x, R.value]])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(t, {
				"model-value": U.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": n[4] ||= (e) => U.value = null
			}, {
				footer: S(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[3] ||= (e) => U.value = null
				}, {
					default: S(() => [...n[22] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: ve
				}, {
					default: S(() => [...n[23] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [f("p", null, [
					n[20] ||= p(" Delete collection ", -1),
					f("strong", null, y(U.value?.name), 1),
					n[21] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(t, {
				modelValue: Y.value,
				"onUpdate:modelValue": n[6] ||= (e) => Y.value = e,
				title: ye.value,
				size: "lg"
			}, {
				footer: S(() => [m(i, {
					variant: "solid",
					size: "sm",
					onClick: Z
				}, {
					default: S(() => [...n[28] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: S(() => [K.value ? (g(), d("div", D, [m(a, {
					variant: "text",
					lines: 4
				})])) : (g(), d(c, { key: 1 }, [f("form", {
					class: "admin-collections__bulk",
					onSubmit: w(Q, ["prevent"])
				}, [f("label", pe, [n[24] ||= f("span", { class: "admin-collections__label" }, "Bulk add by query", -1), C(f("input", {
					"onUpdate:modelValue": n[5] ||= (e) => q.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[x, q.value]])]), m(i, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: J.value,
					onClick: Q
				}, {
					default: S(() => [...n[25] ||= [p(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), G.value.length === 0 ? (g(), u(o, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (g(), d("table", me, [n[27] ||= f("thead", null, [f("tr", null, [f("th", { scope: "col" }, "Title"), f("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), f("tbody", null, [(g(!0), d(c, null, v(G.value, (e) => (g(), d("tr", { key: e.id }, [f("td", null, y($(e)), 1), f("td", null, [m(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => xe(e)
				}, {
					default: S(() => [...n[26] ||= [p(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-bdcb4eb8"]]);
//#endregion
export { O as default };

//# sourceMappingURL=CollectionsPage-BRe0cTa2.js.map