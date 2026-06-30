import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, t as ee } from "./client-CX6TRWS-.js";
import { t as r } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-k7aQagzg.js";
import { t as te } from "./Badge-ArWL5-WE.js";
import { t as a } from "./Modal-CWarEzTU.js";
import { t as o } from "./Skeleton-DkSoWF3C.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { t as ne } from "./collections-CH3HLdcd.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as re, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as ie, onMounted as ae, openBlock as g, ref as _, renderList as v, toDisplayString as y, vModelText as b, withCtx as x, withDirectives as S, withModifiers as C } from "vue";
//#region src/pages/admin/CollectionsPage.vue?vue&type=script&setup=true&lang.ts
var w = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, oe = { class: "admin-collections__head" }, se = {
	key: 0,
	class: "admin-collections__skel"
}, T = {
	key: 3,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, E = { class: "admin-collections__actions" }, ce = { class: "admin-collections__field" }, le = {
	key: 0,
	class: "admin-collections__field"
}, ue = {
	key: 0,
	class: "admin-collections__skel"
}, de = { class: "admin-collections__field admin-collections__field--grow" }, fe = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, D = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(e) {
		let h = e, D = ie("apiBase", ""), pe = l(() => typeof D == "string" ? D : D?.value ?? ""), O = new ne(h.client ?? new ee({
			baseUrl: pe.value,
			tokenStore: new t()
		})), k = r(), A = _([]), j = _(!0), M = _(null);
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
		let P = _(!1), F = _(null), I = _(""), L = _(""), R = _(!1), z = l(() => F.value ? `Edit collection — ${F.value.name}` : "New collection");
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
				k.error(n(e, "Failed to save collection."));
			} finally {
				R.value = !1;
			}
		}
		let U = _(null);
		async function he() {
			let e = U.value;
			if (e) try {
				await O.remove(e.id), k.success("Collection deleted."), U.value = null, await N();
			} catch (e) {
				k.error(n(e, "Failed to delete collection.")), U.value = null;
			}
		}
		let W = _(null), G = _([]), K = _(!1), q = _(""), J = _(!1), ge = l(() => W.value ? `Items — ${W.value.name}` : "Collection items"), Y = l({
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
				k.error(n(e, "Failed to load items."));
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
		async function ye(e) {
			try {
				await O.refresh(e.id), k.success("Collection refreshed."), await N();
			} catch (e) {
				k.error(n(e, "Failed to refresh collection."));
			}
		}
		function $(e) {
			return typeof e.title == "string" && e.title ? e.title : e.id;
		}
		return ae(N), (e, t) => (g(), d("section", w, [
			f("header", oe, [t[8] ||= f("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), m(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: B
			}, {
				default: x(() => [...t[7] ||= [p(" New collection ", -1)]]),
				_: 1
			})]),
			j.value ? (g(), d("div", se, [m(o, {
				variant: "text",
				lines: 6
			})])) : M.value ? (g(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load collections",
				description: M.value
			}, {
				actions: x(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: N
				}, {
					default: x(() => [...t[9] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (g(), u(s, {
				key: 2,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: x(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: B
				}, {
					default: x(() => [...t[10] ||= [p(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("table", T, [t[15] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Name"),
				f("th", { scope: "col" }, "Items"),
				f("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(g(!0), d(c, null, v(A.value, (e) => (g(), d("tr", { key: e.id }, [
				f("td", null, y(e.name), 1),
				f("td", null, [m(te, {
					tone: "neutral",
					mono: ""
				}, {
					default: x(() => [p(y(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				f("td", null, [f("div", E, [
					m(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => _e(e)
					}, {
						default: x(() => [...t[11] ||= [p(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => ye(e)
					}, {
						default: x(() => [...t[12] ||= [p(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => me(e)
					}, {
						default: x(() => [...t[13] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => U.value = e
					}, {
						default: x(() => [...t[14] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			m(a, {
				modelValue: P.value,
				"onUpdate:modelValue": t[2] ||= (e) => P.value = e,
				title: z.value,
				onClose: V
			}, {
				footer: x(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: x(() => [...t[18] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
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
				}, [f("label", ce, [t[16] ||= f("span", { class: "admin-collections__label" }, "Name", -1), S(f("input", {
					"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[b, I.value]])]), F.value ? re("", !0) : (g(), d("label", le, [t[17] ||= f("span", { class: "admin-collections__label" }, "Library", -1), S(f("input", {
					"onUpdate:modelValue": t[1] ||= (e) => L.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[b, L.value]])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(a, {
				"model-value": U.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": t[4] ||= (e) => U.value = null
			}, {
				footer: x(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[3] ||= (e) => U.value = null
				}, {
					default: x(() => [...t[21] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: he
				}, {
					default: x(() => [...t[22] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					t[19] ||= p(" Delete collection ", -1),
					f("strong", null, y(U.value?.name), 1),
					t[20] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				modelValue: Y.value,
				"onUpdate:modelValue": t[6] ||= (e) => Y.value = e,
				title: ge.value,
				size: "lg"
			}, {
				footer: x(() => [m(i, {
					variant: "solid",
					size: "sm",
					onClick: Z
				}, {
					default: x(() => [...t[27] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: x(() => [K.value ? (g(), d("div", ue, [m(o, {
					variant: "text",
					lines: 4
				})])) : (g(), d(c, { key: 1 }, [f("form", {
					class: "admin-collections__bulk",
					onSubmit: C(Q, ["prevent"])
				}, [f("label", de, [t[23] ||= f("span", { class: "admin-collections__label" }, "Bulk add by query", -1), S(f("input", {
					"onUpdate:modelValue": t[5] ||= (e) => q.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[b, q.value]])]), m(i, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: J.value,
					onClick: Q
				}, {
					default: x(() => [...t[24] ||= [p(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), G.value.length === 0 ? (g(), u(s, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (g(), d("table", fe, [t[26] ||= f("thead", null, [f("tr", null, [f("th", { scope: "col" }, "Title"), f("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), f("tbody", null, [(g(!0), d(c, null, v(G.value, (e) => (g(), d("tr", { key: e.id }, [f("td", null, y($(e)), 1), f("td", null, [m(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => ve(e)
				}, {
					default: x(() => [...t[25] ||= [p(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-709929a0"]]);
//#endregion
export { D as default };

//# sourceMappingURL=CollectionsPage-C8OFzg7u.js.map