import { n as e } from "./Icon-ax5k7_G2.js";
import { d as t, n, s as ee, t as r } from "./Button-C1kpaQyo.js";
import { t as te } from "./Badge-ArWL5-WE.js";
import { t as i } from "./Modal-I4tEFhoH.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { t as re } from "./collections-CH3HLdcd.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as ie, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as ae, onMounted as oe, openBlock as h, ref as g, renderList as _, toDisplayString as v, vModelText as y, withCtx as b, withDirectives as x, withModifiers as S } from "vue";
//#region src/pages/admin/CollectionsPage.vue?vue&type=script&setup=true&lang.ts
var C = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, se = { class: "admin-collections__head" }, ce = {
	key: 0,
	class: "admin-collections__skel"
}, le = {
	key: 3,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, ue = { class: "admin-collections__actions" }, w = { class: "admin-collections__field" }, T = {
	key: 0,
	class: "admin-collections__field"
}, de = {
	key: 0,
	class: "admin-collections__skel"
}, fe = { class: "admin-collections__field admin-collections__field--grow" }, pe = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, E = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(e) {
		let m = e, E = ae("apiBase", ""), D = c(() => typeof E == "string" ? E : E?.value ?? ""), O = new re(m.client ?? new n({
			baseUrl: D.value,
			tokenStore: new ee()
		})), k = ne(), A = g([]), j = g(!0), M = g(null);
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
		let P = g(!1), F = g(null), I = g(""), L = g(""), R = g(!1), z = c(() => F.value ? `Edit collection — ${F.value.name}` : "New collection");
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
		let U = g(null);
		async function he() {
			let e = U.value;
			if (e) try {
				await O.remove(e.id), k.success("Collection deleted."), U.value = null, await N();
			} catch (e) {
				k.error(t(e, "Failed to delete collection.")), U.value = null;
			}
		}
		let W = g(null), G = g([]), K = g(!1), q = g(""), J = g(!1), ge = c(() => W.value ? `Items — ${W.value.name}` : "Collection items"), Y = c({
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
		return oe(N), (e, t) => (h(), u("section", C, [
			d("header", se, [t[8] ||= d("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), p(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: B
			}, {
				default: b(() => [...t[7] ||= [f(" New collection ", -1)]]),
				_: 1
			})]),
			j.value ? (h(), u("div", ce, [p(a, {
				variant: "text",
				lines: 6
			})])) : M.value ? (h(), l(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load collections",
				description: M.value
			}, {
				actions: b(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: N
				}, {
					default: b(() => [...t[9] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (h(), l(o, {
				key: 2,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: b(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: B
				}, {
					default: b(() => [...t[10] ||= [f(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), u("table", le, [t[15] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Name"),
				d("th", { scope: "col" }, "Items"),
				d("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(h(!0), u(s, null, _(A.value, (e) => (h(), u("tr", { key: e.id }, [
				d("td", null, v(e.name), 1),
				d("td", null, [p(te, {
					tone: "neutral",
					mono: ""
				}, {
					default: b(() => [f(v(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				d("td", null, [d("div", ue, [
					p(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => _e(e)
					}, {
						default: b(() => [...t[11] ||= [f(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => ye(e)
					}, {
						default: b(() => [...t[12] ||= [f(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => me(e)
					}, {
						default: b(() => [...t[13] ||= [f(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(r, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => U.value = e
					}, {
						default: b(() => [...t[14] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			p(i, {
				modelValue: P.value,
				"onUpdate:modelValue": t[2] ||= (e) => P.value = e,
				title: z.value,
				onClose: V
			}, {
				footer: b(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: b(() => [...t[18] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: H
				}, {
					default: b(() => [f(v(F.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [d("form", {
					class: "admin-collections__form",
					onSubmit: S(H, ["prevent"])
				}, [d("label", w, [t[16] ||= d("span", { class: "admin-collections__label" }, "Name", -1), x(d("input", {
					"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[y, I.value]])]), F.value ? ie("", !0) : (h(), u("label", T, [t[17] ||= d("span", { class: "admin-collections__label" }, "Library", -1), x(d("input", {
					"onUpdate:modelValue": t[1] ||= (e) => L.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[y, L.value]])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			p(i, {
				"model-value": U.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": t[4] ||= (e) => U.value = null
			}, {
				footer: b(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[3] ||= (e) => U.value = null
				}, {
					default: b(() => [...t[21] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					onClick: he
				}, {
					default: b(() => [...t[22] ||= [f("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [d("p", null, [
					t[19] ||= f(" Delete collection ", -1),
					d("strong", null, v(U.value?.name), 1),
					t[20] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(i, {
				modelValue: Y.value,
				"onUpdate:modelValue": t[6] ||= (e) => Y.value = e,
				title: ge.value,
				size: "lg"
			}, {
				footer: b(() => [p(r, {
					variant: "solid",
					size: "sm",
					onClick: Z
				}, {
					default: b(() => [...t[27] ||= [f("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [K.value ? (h(), u("div", de, [p(a, {
					variant: "text",
					lines: 4
				})])) : (h(), u(s, { key: 1 }, [d("form", {
					class: "admin-collections__bulk",
					onSubmit: S(Q, ["prevent"])
				}, [d("label", fe, [t[23] ||= d("span", { class: "admin-collections__label" }, "Bulk add by query", -1), x(d("input", {
					"onUpdate:modelValue": t[5] ||= (e) => q.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[y, q.value]])]), p(r, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: J.value,
					onClick: Q
				}, {
					default: b(() => [...t[24] ||= [f(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), G.value.length === 0 ? (h(), l(o, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (h(), u("table", pe, [t[26] ||= d("thead", null, [d("tr", null, [d("th", { scope: "col" }, "Title"), d("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), d("tbody", null, [(h(!0), u(s, null, _(G.value, (e) => (h(), u("tr", { key: e.id }, [d("td", null, v($(e)), 1), d("td", null, [p(r, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => ve(e)
				}, {
					default: b(() => [...t[25] ||= [f(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-709929a0"]]);
//#endregion
export { E as default };

//# sourceMappingURL=CollectionsPage-Dfxom__L.js.map