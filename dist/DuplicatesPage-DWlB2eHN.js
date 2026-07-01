import { n as e } from "./Icon-24ngwBUH.js";
import { c as t, f as n, t as r } from "./client-fw74f3l_.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CInT03Lp.js";
import { t as o } from "./Badge-DnDrMVUo.js";
import { t as s } from "./Select-C7fVtNk5.js";
import { t as c } from "./Skeleton-BUq2D39t.js";
import { t as l } from "./EmptyState-0XgHKEGf.js";
import { t as u } from "./PageHint-DR8OWfto.js";
import { t as d } from "./libraries-CXAz_kXs.js";
import { Fragment as f, computed as p, createBlock as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onMounted as ee, openBlock as x, ref as S, renderList as C, toDisplayString as w, withCtx as T } from "vue";
//#region src/api/admin/duplicates.ts
var E = class {
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
}, te = {
	class: "admin-duplicates",
	"aria-labelledby": "duplicates-heading"
}, ne = {
	key: 0,
	class: "admin-duplicates__skel"
}, re = { class: "admin-duplicates__picker" }, ie = {
	key: 0,
	class: "admin-duplicates__skel"
}, ae = {
	key: 3,
	class: "admin-duplicates__groups"
}, oe = ["data-testid"], se = { class: "admin-duplicates__group-head" }, ce = { class: "admin-duplicates__group-key" }, D = { class: "admin-duplicates__canonical" }, le = {
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
		}), z = new d(R), B = new E(R), V = i(), H = S([]), U = S(!0), W = S(null), G = S(""), ue = p(() => H.value.map((e) => ({
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
		function de(e) {
			G.value = String(e), $();
		}
		let q = S([]), J = S(!1), Y = S(null), X = S({}), Z = S(null);
		function Q(e) {
			return e.title || e.name || e.id;
		}
		function fe(e, t) {
			return X.value[e.canonical_key]?.has(t.id) ?? !1;
		}
		function pe(e, t, n) {
			let r = new Set(X.value[e.canonical_key] ?? []);
			n ? r.add(t.id) : r.delete(t.id), X.value = {
				...X.value,
				[e.canonical_key]: r
			};
		}
		function me(e) {
			return X.value[e.canonical_key]?.size ?? 0;
		}
		function he(e) {
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
				q.value = e, he(e);
			} catch (e) {
				Y.value = n(e, "Failed to load duplicates."), V.error(Y.value);
			} finally {
				J.value = !1;
			}
		}
		async function ge(e) {
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
		return ee(K), (e, t) => (x(), h("section", te, [
			t[5] ||= g("header", { class: "admin-duplicates__head" }, [g("h1", {
				id: "duplicates-heading",
				class: "admin-duplicates__title"
			}, "Duplicates")], -1),
			v(u, null, {
				default: T(() => [...t[0] ||= [
					_(" Finds titles that appear more than once (matched by a canonical key) so you can tidy them up. Pick a ", -1),
					g("strong", null, "library", -1),
					_(" to scope the search; each group keeps one entry marked ", -1),
					g("strong", null, "Keep", -1),
					_(" as the primary. Tick the duplicates you want to fold in, then ", -1),
					g("strong", null, "Merge selected", -1),
					_(" to combine them into that primary — the extras' data is merged in and their rows removed. ", -1)
				]]),
				_: 1
			}),
			t[6] ||= g("p", { class: "admin-duplicates__hint" }, [
				_(" When the same series or movie was scanned more than once, its copies show up here grouped by a shared key. Pick the copy to "),
				g("strong", null, "keep"),
				_(" (the primary, pre-selected) and check the duplicates to fold into it. "),
				g("strong", null, "Merge"),
				_(" re-parents the duplicates' episodes/seasons onto the primary and removes the empty leftovers. ")
			], -1),
			U.value ? (x(), h("div", ne, [v(c, {
				variant: "text",
				lines: 3
			})])) : W.value ? (x(), m(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: W.value
			}, {
				actions: T(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: T(() => [...t[1] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : H.value.length === 0 ? (x(), m(l, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add a library before scanning for duplicates."
			})) : (x(), h(f, { key: 3 }, [g("div", re, [v(s, {
				"model-value": G.value,
				options: ue.value,
				label: "Library",
				"onUpdate:modelValue": de
			}, null, 8, ["model-value", "options"])]), J.value ? (x(), h("div", ie, [v(c, {
				variant: "text",
				lines: 6
			})])) : Y.value ? (x(), m(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load duplicates",
				description: Y.value
			}, {
				actions: T(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: T(() => [...t[2] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value.length === 0 ? (x(), m(l, {
				key: 2,
				icon: "check",
				title: "No duplicates",
				description: "This library has no duplicate groups."
			})) : (x(), h("ul", ae, [(x(!0), h(f, null, C(q.value, (e) => (x(), h("li", {
				key: e.canonical_key,
				class: "admin-duplicates__group",
				"data-testid": `group-${e.canonical_key}`
			}, [g("div", se, [g("div", ce, [v(o, { tone: "info" }, {
				default: T(() => [_(w(e.type), 1)]),
				_: 2
			}, 1024), g("code", D, w(e.canonical_key), 1)]), v(a, {
				variant: "solid",
				size: "sm",
				loading: Z.value === e.canonical_key,
				disabled: me(e) === 0,
				"aria-label": `Merge duplicates of ${e.canonical_key}`,
				onClick: (t) => ge(e)
			}, {
				default: T(() => [...t[3] ||= [_(" Merge selected ", -1)]]),
				_: 1
			}, 8, [
				"loading",
				"disabled",
				"aria-label",
				"onClick"
			])]), g("ul", le, [g("li", O, [
				g("span", k, [v(o, { tone: "success" }, {
					default: T(() => [...t[4] ||= [_("Keep", -1)]]),
					_: 1
				})]),
				g("span", A, w(Q(e.primary)), 1),
				g("span", j, w(e.primary.descendant_count) + " children ", 1)
			]), (x(!0), h(f, null, C(e.duplicates, (t) => (x(), h("li", {
				key: t.id,
				class: "admin-duplicates__member"
			}, [g("label", M, [g("input", {
				type: "checkbox",
				checked: fe(e, t),
				"aria-label": `Merge ${Q(t)} into ${Q(e.primary)}`,
				"data-testid": `dup-${e.canonical_key}-${t.id}`,
				onChange: (n) => pe(e, t, n.target.checked)
			}, null, 40, N), g("span", P, w(Q(t)), 1)]), g("span", F, w(t.descendant_count) + " children", 1)]))), 128))])], 8, oe))), 128))]))], 64))
		]));
	}
}), [["__scopeId", "data-v-569ac4dd"]]);
//#endregion
export { I as default };

//# sourceMappingURL=DuplicatesPage-DWlB2eHN.js.map