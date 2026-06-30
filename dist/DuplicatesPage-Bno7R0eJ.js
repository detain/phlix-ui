import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, t as r } from "./client-Dywsiudr.js";
import { t as i } from "./Button-k7aQagzg.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./Select-BR5EXV0L.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { t as l } from "./libraries-CXAz_kXs.js";
import { Fragment as u, computed as d, createBlock as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as te, onMounted as ne, openBlock as v, ref as y, renderList as b, toDisplayString as x, withCtx as S } from "vue";
//#region src/api/admin/duplicates.ts
var re = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async listDuplicates(e) {
		let { groups: t } = await this.client.get(`/api/v1/admin/libraries/${encodeURIComponent(e)}/duplicates`);
		return Array.isArray(t) ? t : [];
	}
	mergeDuplicates(e, t) {
		return this.client.post("/api/v1/admin/media/merge", {
			primary_id: e,
			duplicate_ids: t
		});
	}
}, C = {
	class: "admin-duplicates",
	"aria-labelledby": "duplicates-heading"
}, ie = {
	key: 0,
	class: "admin-duplicates__skel"
}, ae = { class: "admin-duplicates__picker" }, oe = {
	key: 0,
	class: "admin-duplicates__skel"
}, w = {
	key: 3,
	class: "admin-duplicates__groups"
}, T = ["data-testid"], E = { class: "admin-duplicates__group-head" }, D = { class: "admin-duplicates__group-key" }, O = { class: "admin-duplicates__canonical" }, se = {
	class: "admin-duplicates__members",
	"aria-label": "Group members"
}, ce = { class: "admin-duplicates__member admin-duplicates__member--primary" }, le = { class: "admin-duplicates__member-mark" }, k = { class: "admin-duplicates__member-name" }, A = { class: "admin-duplicates__member-count" }, j = { class: "admin-duplicates__member-check" }, M = [
	"checked",
	"aria-label",
	"data-testid",
	"onChange"
], N = { class: "admin-duplicates__member-name" }, P = { class: "admin-duplicates__member-count" }, F = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "DuplicatesPage",
	props: { client: {} },
	setup(e) {
		let _ = e, F = te("apiBase", ""), I = d(() => typeof F == "string" ? F : F?.value ?? ""), L = _.client ?? new r({
			baseUrl: I.value,
			tokenStore: new t()
		}), R = new l(L), z = new re(L), B = o(), V = y([]), H = y(!0), U = y(null), W = y(""), ue = d(() => V.value.map((e) => ({
			value: e.id,
			label: e.name
		})));
		async function G() {
			H.value = !0, U.value = null;
			try {
				V.value = await R.list(), !W.value && V.value.length > 0 && (W.value = V.value[0].id, await $());
			} catch (e) {
				U.value = n(e, "Failed to load libraries."), B.error(U.value);
			} finally {
				H.value = !1;
			}
		}
		function de(e) {
			W.value = String(e), $();
		}
		let K = y([]), q = y(!1), J = y(null), Y = y({}), X = y(null);
		function Z(e) {
			return e.title || e.name || e.id;
		}
		function fe(e, t) {
			return Y.value[e.canonical_key]?.has(t.id) ?? !1;
		}
		function Q(e, t, n) {
			let r = new Set(Y.value[e.canonical_key] ?? []);
			n ? r.add(t.id) : r.delete(t.id), Y.value = {
				...Y.value,
				[e.canonical_key]: r
			};
		}
		function pe(e) {
			return Y.value[e.canonical_key]?.size ?? 0;
		}
		function me(e) {
			let t = {};
			for (let n of e) t[n.canonical_key] = new Set(n.duplicates.map((e) => e.id));
			Y.value = t;
		}
		async function $() {
			if (!W.value) {
				K.value = [];
				return;
			}
			q.value = !0, J.value = null;
			try {
				let e = await z.listDuplicates(W.value);
				K.value = e, me(e);
			} catch (e) {
				J.value = n(e, "Failed to load duplicates."), B.error(J.value);
			} finally {
				q.value = !1;
			}
		}
		async function he(e) {
			let t = Array.from(Y.value[e.canonical_key] ?? []);
			if (t.length === 0) {
				B.error("Select at least one duplicate to merge.");
				return;
			}
			X.value = e.canonical_key;
			try {
				let { moved: n, deleted: r } = await z.mergeDuplicates(e.primary.id, t);
				B.success(`Merged: ${n} moved, ${r} removed.`), await $();
			} catch (e) {
				B.error(n(e, "Failed to merge duplicates."));
			} finally {
				X.value = null;
			}
		}
		return ne(G), (e, t) => (v(), p("section", C, [
			t[4] ||= m("header", { class: "admin-duplicates__head" }, [m("h1", {
				id: "duplicates-heading",
				class: "admin-duplicates__title"
			}, "Duplicates")], -1),
			t[5] ||= m("p", { class: "admin-duplicates__hint" }, [
				h(" When the same series or movie was scanned more than once, its copies show up here grouped by a shared key. Pick the copy to "),
				m("strong", null, "keep"),
				h(" (the primary, pre-selected) and check the duplicates to fold into it. "),
				m("strong", null, "Merge"),
				h(" re-parents the duplicates' episodes/seasons onto the primary and removes the empty leftovers. ")
			], -1),
			H.value ? (v(), p("div", ie, [g(s, {
				variant: "text",
				lines: 3
			})])) : U.value ? (v(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: U.value
			}, {
				actions: S(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: G
				}, {
					default: S(() => [...t[0] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : V.value.length === 0 ? (v(), f(c, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add a library before scanning for duplicates."
			})) : (v(), p(u, { key: 3 }, [m("div", ae, [g(ee, {
				"model-value": W.value,
				options: ue.value,
				label: "Library",
				"onUpdate:modelValue": de
			}, null, 8, ["model-value", "options"])]), q.value ? (v(), p("div", oe, [g(s, {
				variant: "text",
				lines: 6
			})])) : J.value ? (v(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load duplicates",
				description: J.value
			}, {
				actions: S(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: S(() => [...t[1] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : K.value.length === 0 ? (v(), f(c, {
				key: 2,
				icon: "check",
				title: "No duplicates",
				description: "This library has no duplicate groups."
			})) : (v(), p("ul", w, [(v(!0), p(u, null, b(K.value, (e) => (v(), p("li", {
				key: e.canonical_key,
				class: "admin-duplicates__group",
				"data-testid": `group-${e.canonical_key}`
			}, [m("div", E, [m("div", D, [g(a, { tone: "info" }, {
				default: S(() => [h(x(e.type), 1)]),
				_: 2
			}, 1024), m("code", O, x(e.canonical_key), 1)]), g(i, {
				variant: "solid",
				size: "sm",
				loading: X.value === e.canonical_key,
				disabled: pe(e) === 0,
				"aria-label": `Merge duplicates of ${e.canonical_key}`,
				onClick: (t) => he(e)
			}, {
				default: S(() => [...t[2] ||= [h(" Merge selected ", -1)]]),
				_: 1
			}, 8, [
				"loading",
				"disabled",
				"aria-label",
				"onClick"
			])]), m("ul", se, [m("li", ce, [
				m("span", le, [g(a, { tone: "success" }, {
					default: S(() => [...t[3] ||= [h("Keep", -1)]]),
					_: 1
				})]),
				m("span", k, x(Z(e.primary)), 1),
				m("span", A, x(e.primary.descendant_count) + " children ", 1)
			]), (v(!0), p(u, null, b(e.duplicates, (t) => (v(), p("li", {
				key: t.id,
				class: "admin-duplicates__member"
			}, [m("label", j, [m("input", {
				type: "checkbox",
				checked: fe(e, t),
				"aria-label": `Merge ${Z(t)} into ${Z(e.primary)}`,
				"data-testid": `dup-${e.canonical_key}-${t.id}`,
				onChange: (n) => Q(e, t, n.target.checked)
			}, null, 40, M), m("span", N, x(Z(t)), 1)]), m("span", P, x(t.descendant_count) + " children", 1)]))), 128))])], 8, T))), 128))]))], 64))
		]));
	}
}), [["__scopeId", "data-v-e13a82a3"]]);
//#endregion
export { F as default };

//# sourceMappingURL=DuplicatesPage-Bno7R0eJ.js.map