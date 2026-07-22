import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-BzWwyWKr.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as ee } from "./Select-Cvp-73pF.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as l } from "./PageHint-BoAlFFBN.js";
import { t as u } from "./libraries-D3CNHYm9.js";
import { t as d } from "./helpLinks-BI4oN4Or.js";
import { Fragment as f, computed as p, createBlock as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onMounted as x, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, withCtx as D } from "vue";
//#region src/api/admin/duplicates.ts
var te = class {
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
}, ne = {
	class: "admin-duplicates",
	"aria-labelledby": "duplicates-heading"
}, re = {
	key: 0,
	class: "admin-duplicates__skel"
}, ie = { class: "admin-duplicates__picker" }, ae = {
	key: 0,
	class: "admin-duplicates__skel"
}, oe = {
	key: 3,
	class: "admin-duplicates__groups"
}, se = ["data-testid"], ce = { class: "admin-duplicates__group-head" }, le = { class: "admin-duplicates__group-key" }, ue = { class: "admin-duplicates__canonical" }, de = {
	class: "admin-duplicates__members",
	"aria-label": "Group members"
}, O = { class: "admin-duplicates__member admin-duplicates__member--primary" }, k = { class: "admin-duplicates__member-mark" }, A = { class: "admin-duplicates__member-name" }, j = { class: "admin-duplicates__member-count" }, M = { class: "admin-duplicates__member-check" }, N = [
	"checked",
	"aria-label",
	"data-testid",
	"onChange"
], P = { class: "admin-duplicates__member-name" }, F = { class: "admin-duplicates__member-count" }, I = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "DuplicatesPage",
	props: { client: {} },
	setup(e) {
		let y = e, I = b("apiBase", ""), L = p(() => typeof I == "string" ? I : I?.value ?? ""), R = y.client ?? new r({
			baseUrl: L.value,
			tokenStore: new t()
		}), z = new u(R), B = new te(R), V = i(), H = C([]), U = C(!0), W = C(null), G = C(""), fe = p(() => H.value.map((e) => ({
			value: e.id,
			label: e.name
		})));
		async function K() {
			U.value = !0, W.value = null;
			try {
				H.value = await z.list(), !G.value && H.value.length > 0 && (G.value = H.value[0].id, await $());
			} catch (e) {
				W.value = n(e, "Failed to load libraries."), V.error(W.value);
			} finally {
				U.value = !1;
			}
		}
		function pe(e) {
			G.value = String(e), $();
		}
		let q = C([]), J = C(!1), Y = C(null), X = C({}), Z = C(null);
		function Q(e) {
			return e.title || e.name || e.id;
		}
		function me(e, t) {
			return X.value[e.canonical_key]?.has(t.id) ?? !1;
		}
		function he(e, t, n) {
			let r = new Set(X.value[e.canonical_key] ?? []);
			n ? r.add(t.id) : r.delete(t.id), X.value = {
				...X.value,
				[e.canonical_key]: r
			};
		}
		function ge(e) {
			return X.value[e.canonical_key]?.size ?? 0;
		}
		function _e(e) {
			let t = {};
			for (let n of e) t[n.canonical_key] = new Set(n.duplicates.map((e) => e.id));
			X.value = t;
		}
		async function $() {
			if (!G.value) {
				q.value = [];
				return;
			}
			J.value = !0, Y.value = null;
			try {
				let e = await B.listDuplicates(G.value);
				q.value = e, _e(e);
			} catch (e) {
				Y.value = n(e, "Failed to load duplicates."), V.error(Y.value);
			} finally {
				J.value = !1;
			}
		}
		async function ve(e) {
			let t = Array.from(X.value[e.canonical_key] ?? []);
			if (t.length === 0) {
				V.error("Select at least one duplicate to merge.");
				return;
			}
			Z.value = e.canonical_key;
			try {
				let { moved: n, deleted: r } = await B.mergeDuplicates(e.primary.id, t);
				V.success(`Merged: ${n} moved, ${r} removed.`), await $();
			} catch (e) {
				V.error(n(e, "Failed to merge duplicates."));
			} finally {
				Z.value = null;
			}
		}
		return x(K), (e, t) => (S(), h("section", ne, [
			t[5] ||= g("header", { class: "admin-duplicates__head" }, [g("h1", {
				id: "duplicates-heading",
				class: "admin-duplicates__title"
			}, "Duplicates")], -1),
			v(l, {
				links: E(d).duplicates.links,
				details: E(d).duplicates.details
			}, {
				default: D(() => [...t[0] ||= [
					_(" Finds titles that appear more than once (matched by a canonical key) so you can tidy them up. Pick a ", -1),
					g("strong", null, "library", -1),
					_(" to scope the search; each group keeps one entry marked ", -1),
					g("strong", null, "Keep", -1),
					_(" as the primary. Tick the duplicates you want to fold in, then ", -1),
					g("strong", null, "Merge selected", -1),
					_(" to combine them into that primary — the extras' data is merged in and their rows removed. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			t[6] ||= g("p", { class: "admin-duplicates__hint" }, [
				_(" When the same series or movie was scanned more than once, its copies show up here grouped by a shared key. Pick the copy to "),
				g("strong", null, "keep"),
				_(" (the primary, pre-selected) and check the duplicates to fold into it. "),
				g("strong", null, "Merge"),
				_(" re-parents the duplicates' episodes/seasons onto the primary and removes the empty leftovers. ")
			], -1),
			U.value ? (S(), h("div", re, [v(s, {
				variant: "text",
				lines: 3
			})])) : W.value ? (S(), m(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: W.value
			}, {
				actions: D(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: D(() => [...t[1] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : H.value.length === 0 ? (S(), m(c, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add a library before scanning for duplicates."
			})) : (S(), h(f, { key: 3 }, [g("div", ie, [v(ee, {
				"model-value": G.value,
				options: fe.value,
				label: "Library",
				"onUpdate:modelValue": pe
			}, null, 8, ["model-value", "options"])]), J.value ? (S(), h("div", ae, [v(s, {
				variant: "text",
				lines: 6
			})])) : Y.value ? (S(), m(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load duplicates",
				description: Y.value
			}, {
				actions: D(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: D(() => [...t[2] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value.length === 0 ? (S(), m(c, {
				key: 2,
				icon: "check",
				title: "No duplicates",
				description: "This library has no duplicate groups."
			})) : (S(), h("ul", oe, [(S(!0), h(f, null, w(q.value, (e) => (S(), h("li", {
				key: e.canonical_key,
				class: "admin-duplicates__group",
				"data-testid": `group-${e.canonical_key}`
			}, [g("div", ce, [g("div", le, [v(o, { tone: "info" }, {
				default: D(() => [_(T(e.type), 1)]),
				_: 2
			}, 1024), g("code", ue, T(e.canonical_key), 1)]), v(a, {
				variant: "solid",
				size: "sm",
				loading: Z.value === e.canonical_key,
				disabled: ge(e) === 0,
				"aria-label": `Merge duplicates of ${e.canonical_key}`,
				onClick: (t) => ve(e)
			}, {
				default: D(() => [...t[3] ||= [_(" Merge selected ", -1)]]),
				_: 1
			}, 8, [
				"loading",
				"disabled",
				"aria-label",
				"onClick"
			])]), g("ul", de, [g("li", O, [
				g("span", k, [v(o, { tone: "success" }, {
					default: D(() => [...t[4] ||= [_("Keep", -1)]]),
					_: 1
				})]),
				g("span", A, T(Q(e.primary)), 1),
				g("span", j, T(e.primary.descendant_count) + " children ", 1)
			]), (S(!0), h(f, null, w(e.duplicates, (t) => (S(), h("li", {
				key: t.id,
				class: "admin-duplicates__member"
			}, [g("label", M, [g("input", {
				type: "checkbox",
				checked: me(e, t),
				"aria-label": `Merge ${Q(t)} into ${Q(e.primary)}`,
				"data-testid": `dup-${e.canonical_key}-${t.id}`,
				onChange: (n) => he(e, t, n.target.checked)
			}, null, 40, N), g("span", P, T(Q(t)), 1)]), g("span", F, T(t.descendant_count) + " children", 1)]))), 128))])], 8, se))), 128))]))], 64))
		]));
	}
}), [["__scopeId", "data-v-7d39d2e2"]]);
//#endregion
export { I as default };

//# sourceMappingURL=DuplicatesPage-BzGV3ZsU.js.map