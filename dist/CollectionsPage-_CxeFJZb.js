import { n as e } from "./Icon-CIwTuFLd.js";
import { l as t, t as n, y as r } from "./client-DdVqCKVh.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as te } from "./useLibrariesStore-5icSJdQF.js";
import { t as i } from "./EmptyState-BAyOxAcK.js";
import { t as a } from "./Button-BuG0GvCa.js";
import { t as ne } from "./Badge-A88fI41k.js";
import { t as re } from "./Select-CUH5f-z1.js";
import { t as o } from "./Modal-9IqluoNm.js";
import { t as s } from "./Skeleton-rHw-IJtl.js";
import { t as ie } from "./PageHint-BGYg6qRJ.js";
import { t as ae } from "./collections-CH3HLdcd.js";
import { t as c } from "./helpLinks-B4Y1FteC.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as oe, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as se, onMounted as ce, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as x, vModelText as S, withCtx as C, withDirectives as w, withModifiers as T } from "vue";
//#region src/pages/admin/CollectionsPage.vue?vue&type=script&setup=true&lang.ts
var le = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, ue = { class: "admin-collections__head" }, de = {
	key: 0,
	class: "admin-collections__skel"
}, fe = {
	key: 3,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, pe = { class: "admin-collections__actions" }, me = { class: "admin-collections__field" }, he = {
	key: 0,
	class: "admin-collections__field"
}, ge = {
	key: 0,
	class: "admin-collections__skel"
}, _e = { class: "admin-collections__field admin-collections__field--grow" }, ve = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, E = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(e) {
		let g = e, E = se("apiBase", ""), D = u(() => typeof E == "string" ? E : E?.value ?? ""), O = new ae(g.client ?? new n({
			baseUrl: D.value,
			tokenStore: new t()
		})), k = ee(), A = te(), ye = u(() => A.items.map((e) => ({
			value: e.id,
			label: e.name
		}))), j = v([]), M = v(!0), N = v(null);
		async function P() {
			M.value = !0, N.value = null;
			try {
				j.value = await O.list();
			} catch (e) {
				N.value = r(e, "Failed to load collections."), k.error(N.value);
			} finally {
				M.value = !1;
			}
		}
		let F = v(!1), I = v(null), L = v(""), R = v(""), z = v(!1), be = u(() => I.value ? `Edit collection — ${I.value.name}` : "New collection");
		function B() {
			I.value = null, L.value = "", R.value = "", A.load(D.value), F.value = !0;
		}
		function xe(e) {
			I.value = e, L.value = e.name, R.value = e.library_id, F.value = !0;
		}
		function V() {
			F.value = !1, I.value = null;
		}
		async function H() {
			if (!L.value.trim()) {
				k.error("Name is required.");
				return;
			}
			let e = I.value;
			if (!e && !R.value.trim()) {
				k.error("Library is required.");
				return;
			}
			z.value = !0;
			try {
				if (e) {
					let t = { name: L.value };
					await O.update(e.id, t), k.success("Collection updated.");
				} else {
					let e = {
						name: L.value,
						library_id: R.value
					};
					await O.create(e), k.success("Collection created.");
				}
				V(), await P();
			} catch (e) {
				k.error(r(e, "Failed to save collection."));
			} finally {
				z.value = !1;
			}
		}
		let U = v(null);
		async function Se() {
			let e = U.value;
			if (e) try {
				await O.remove(e.id), k.success("Collection deleted."), U.value = null, await P();
			} catch (e) {
				k.error(r(e, "Failed to delete collection.")), U.value = null;
			}
		}
		let W = v(null), G = v([]), K = v(!1), q = v(""), J = v(!1), Ce = u(() => W.value ? `Items — ${W.value.name}` : "Collection items"), Y = u({
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
				k.error(r(e, "Failed to load items."));
			} finally {
				K.value = !1;
			}
		}
		async function we(e) {
			W.value = e, G.value = [], q.value = "", await X(e.id);
		}
		function Z() {
			W.value = null, G.value = [], q.value = "";
		}
		async function Te(e) {
			let t = W.value;
			if (t) try {
				await O.removeItem(t.id, e.id), k.success("Item removed."), await X(t.id);
			} catch (e) {
				k.error(r(e, "Failed to remove item."));
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
					k.error(r(e, "Failed to bulk-add items."));
				} finally {
					J.value = !1;
				}
			}
		}
		async function Ee(e) {
			try {
				await O.refresh(e.id), k.success("Collection refreshed."), await P();
			} catch (e) {
				k.error(r(e, "Failed to refresh collection."));
			}
		}
		function $(e) {
			return typeof e.title == "string" && e.title ? e.title : e.id;
		}
		return ce(P), (e, t) => (_(), f("section", le, [
			p("header", ue, [t[8] ||= p("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: B
			}, {
				default: C(() => [...t[7] ||= [m(" New collection ", -1)]]),
				_: 1
			})]),
			h(ie, {
				links: x(c).collections.links,
				details: x(c).collections.details
			}, {
				default: C(() => [...t[9] ||= [
					m(" Group titles into curated sets (like \"Marvel\" or \"Christmas movies\") that appear on the browse screen. ", -1),
					p("strong", null, "New collection", -1),
					m(" creates one; on each row, ", -1),
					p("strong", null, "Items", -1),
					m(" opens its contents where you can add titles by query (e.g. ", -1),
					p("em", null, "genre:action", -1),
					m(") or ", -1),
					p("strong", null, "Remove", -1),
					m(" them, ", -1),
					p("strong", null, "Refresh", -1),
					m(" re-evaluates membership, ", -1),
					p("strong", null, "Edit", -1),
					m(" renames it, and ", -1),
					p("strong", null, "Delete", -1),
					m(" removes it. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			M.value ? (_(), f("div", de, [h(s, {
				variant: "text",
				lines: 6
			})])) : N.value ? (_(), d(i, {
				key: 1,
				icon: "alert",
				title: "Couldn't load collections",
				description: N.value
			}, {
				actions: C(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: C(() => [...t[10] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (_(), d(i, {
				key: 2,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: C(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: B
				}, {
					default: C(() => [...t[11] ||= [m(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", fe, [t[16] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "Items"),
				p("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(_(!0), f(l, null, y(j.value, (e) => (_(), f("tr", { key: e.id }, [
				p("td", null, b(e.name), 1),
				p("td", null, [h(ne, {
					tone: "neutral",
					mono: ""
				}, {
					default: C(() => [m(b(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				p("td", null, [p("div", pe, [
					h(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => we(e)
					}, {
						default: C(() => [...t[12] ||= [m(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => Ee(e)
					}, {
						default: C(() => [...t[13] ||= [m(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => xe(e)
					}, {
						default: C(() => [...t[14] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => U.value = e
					}, {
						default: C(() => [...t[15] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			h(o, {
				modelValue: F.value,
				"onUpdate:modelValue": t[2] ||= (e) => F.value = e,
				title: be.value,
				onClose: V
			}, {
				footer: C(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: C(() => [...t[19] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: z.value,
					onClick: H
				}, {
					default: C(() => [m(b(I.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [p("form", {
					class: "admin-collections__form",
					onSubmit: T(H, ["prevent"])
				}, [p("label", me, [t[17] ||= p("span", { class: "admin-collections__label" }, "Name", -1), w(p("input", {
					"onUpdate:modelValue": t[0] ||= (e) => L.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[S, L.value]])]), I.value ? oe("", !0) : (_(), f("label", he, [t[18] ||= p("span", { class: "admin-collections__label" }, "Library", -1), h(re, {
					"model-value": R.value,
					options: ye.value,
					label: "Library",
					placeholder: "Choose a library",
					"onUpdate:modelValue": t[1] ||= (e) => R.value = String(e)
				}, null, 8, ["model-value", "options"])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(o, {
				"model-value": U.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": t[4] ||= (e) => U.value = null
			}, {
				footer: C(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[3] ||= (e) => U.value = null
				}, {
					default: C(() => [...t[22] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "danger",
					size: "sm",
					onClick: Se
				}, {
					default: C(() => [...t[23] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [p("p", null, [
					t[20] ||= m(" Delete collection ", -1),
					p("strong", null, b(U.value?.name), 1),
					t[21] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				modelValue: Y.value,
				"onUpdate:modelValue": t[6] ||= (e) => Y.value = e,
				title: Ce.value,
				size: "lg"
			}, {
				footer: C(() => [h(a, {
					variant: "solid",
					size: "sm",
					onClick: Z
				}, {
					default: C(() => [...t[28] ||= [m("Close", -1)]]),
					_: 1
				})]),
				default: C(() => [K.value ? (_(), f("div", ge, [h(s, {
					variant: "text",
					lines: 4
				})])) : (_(), f(l, { key: 1 }, [p("form", {
					class: "admin-collections__bulk",
					onSubmit: T(Q, ["prevent"])
				}, [p("label", _e, [t[24] ||= p("span", { class: "admin-collections__label" }, "Bulk add by query", -1), w(p("input", {
					"onUpdate:modelValue": t[5] ||= (e) => q.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[S, q.value]])]), h(a, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: J.value,
					onClick: Q
				}, {
					default: C(() => [...t[25] ||= [m(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), G.value.length === 0 ? (_(), d(i, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (_(), f("table", ve, [t[27] ||= p("thead", null, [p("tr", null, [p("th", { scope: "col" }, "Title"), p("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), p("tbody", null, [(_(!0), f(l, null, y(G.value, (e) => (_(), f("tr", { key: e.id }, [p("td", null, b($(e)), 1), p("td", null, [h(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => Te(e)
				}, {
					default: C(() => [...t[26] ||= [m(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-ca172633"]]);
//#endregion
export { E as default };

//# sourceMappingURL=CollectionsPage-_CxeFJZb.js.map