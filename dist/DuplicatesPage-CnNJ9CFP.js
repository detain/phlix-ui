import { C as e, t, x as n } from "./client-57OweUrJ.js";
import { t as r } from "./libraries-BC5CZMij.js";
import { t as ee } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as a } from "./PageHint-BlhPmafC.js";
import { t as o } from "./helpLinks-iarZuNmw.js";
import { t as s } from "./Button-1sKEdGjj.js";
import { t as te } from "./Select-ChFXd0gU.js";
import { t as c } from "./Skeleton-B2Mt2L00.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { n as u } from "./Icon-CIbfiPrs.js";
import { Fragment as d, computed as f, createBlock as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as ne, onMounted as re, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, withCtx as w } from "vue";
// src/api/admin/duplicates.ts
var ie = class {
	constructor(t) {
		e(this, "client", void 0), this.client = t;
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
}, T = {
	class: "admin-duplicates",
	"aria-labelledby": "duplicates-heading"
}, E = {
	key: 0,
	class: "admin-duplicates__skel"
}, D = { class: "admin-duplicates__picker" }, O = {
	key: 0,
	class: "admin-duplicates__skel"
}, k = {
	key: 3,
	class: "admin-duplicates__groups"
}, A = ["data-testid"], ae = { class: "admin-duplicates__group-head" }, oe = { class: "admin-duplicates__group-key" }, se = { class: "admin-duplicates__canonical" }, ce = {
	class: "admin-duplicates__members",
	"aria-label": "Group members"
}, le = { class: "admin-duplicates__member admin-duplicates__member--primary" }, ue = { class: "admin-duplicates__member-mark" }, j = { class: "admin-duplicates__member-name" }, M = { class: "admin-duplicates__member-count" }, N = { class: "admin-duplicates__member-check" }, P = [
	"checked",
	"aria-label",
	"data-testid",
	"onChange"
], F = { class: "admin-duplicates__member-name" }, I = { class: "admin-duplicates__member-count" }, L = /*#__PURE__*/ u(/* @__PURE__ */ v({
	__name: "DuplicatesPage",
	props: { client: {} },
	setup(e) {
		let u = e, v = ne("apiBase", ""), L = f(() => typeof v == "string" ? v : v?.value ?? ""), R = u.client ?? new t({ baseUrl: L.value }), z = new r(R), B = new ie(R), V = ee(), H = b([]), U = b(!0), W = b(null), G = b(""), de = f(() => H.value.map((e) => ({
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
		function fe(e) {
			G.value = String(e), $();
		}
		let q = b([]), J = b(!1), Y = b(null), X = b({}), Z = b(null);
		function Q(e) {
			return e.title || e.name || e.id;
		}
		function pe(e, t) {
			return X.value[e.canonical_key]?.has(t.id) ?? !1;
		}
		function me(e, t, n) {
			let r = new Set(X.value[e.canonical_key] ?? []);
			n ? r.add(t.id) : r.delete(t.id), X.value = {
				...X.value,
				[e.canonical_key]: r
			};
		}
		function he(e) {
			return X.value[e.canonical_key]?.size ?? 0;
		}
		function ge(e) {
			let t = {};
			for (let n of e) t[n.canonical_key] = new Set(n.duplicates.map((e) => e.id));
			X.value = t;
		}
		async function $() {
			if (!G.value) q.value = [];
			else {
				J.value = !0, Y.value = null;
				try {
					let e = await B.listDuplicates(G.value);
					q.value = e, ge(e);
				} catch (e) {
					Y.value = n(e, "Failed to load duplicates."), V.error(Y.value);
				} finally {
					J.value = !1;
				}
			}
		}
		async function _e(e) {
			let t = Array.from(X.value[e.canonical_key] ?? []);
			if (t.length === 0) V.error("Select at least one duplicate to merge.");
			else {
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
		}
		return re(K), (e, t) => (y(), m("section", T, [
			t[5] ||= h("header", { class: "admin-duplicates__head" }, [h("h1", {
				id: "duplicates-heading",
				class: "admin-duplicates__title"
			}, "Duplicates")], -1),
			_(a, {
				links: C(o).duplicates.links,
				details: C(o).duplicates.details
			}, {
				default: w(() => [...t[0] ||= [
					g(" Finds titles that appear more than once (matched by a canonical key) so you can tidy them up. Pick a ", -1),
					h("strong", null, "library", -1),
					g(" to scope the search; each group keeps one entry marked ", -1),
					h("strong", null, "Keep", -1),
					g(" as the primary. Tick the duplicates you want to fold in, then ", -1),
					h("strong", null, "Merge selected", -1),
					g(" to combine them into that primary — the extras' data is merged in and their rows removed. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			t[6] ||= h("p", { class: "admin-duplicates__hint" }, [
				g(" When the same series or movie was scanned more than once, its copies show up here grouped by a shared key. Pick the copy to "),
				h("strong", null, "keep"),
				g(" (the primary, pre-selected) and check the duplicates to fold into it. "),
				h("strong", null, "Merge"),
				g(" re-parents the duplicates' episodes/seasons onto the primary and removes the empty leftovers. ")
			], -1),
			U.value ? (y(), m("div", E, [_(c, {
				variant: "text",
				lines: 3
			})])) : W.value ? (y(), p(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load libraries",
				description: W.value
			}, {
				actions: w(() => [_(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: w(() => [...t[1] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : H.value.length === 0 ? (y(), p(l, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add a library before scanning for duplicates."
			})) : (y(), m(d, { key: 3 }, [h("div", D, [_(te, {
				"model-value": G.value,
				options: de.value,
				label: "Library",
				"onUpdate:modelValue": fe
			}, null, 8, ["model-value", "options"])]), J.value ? (y(), m("div", O, [_(c, {
				variant: "text",
				lines: 6
			})])) : Y.value ? (y(), p(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load duplicates",
				description: Y.value
			}, {
				actions: w(() => [_(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: w(() => [...t[2] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value.length === 0 ? (y(), p(l, {
				key: 2,
				icon: "check",
				title: "No duplicates",
				description: "This library has no duplicate groups."
			})) : (y(), m("ul", k, [(y(!0), m(d, null, x(q.value, (e) => (y(), m("li", {
				key: e.canonical_key,
				class: "admin-duplicates__group",
				"data-testid": `group-${e.canonical_key}`
			}, [h("div", ae, [h("div", oe, [_(i, { tone: "info" }, {
				default: w(() => [g(S(e.type), 1)]),
				_: 2
			}, 1024), h("code", se, S(e.canonical_key), 1)]), _(s, {
				variant: "solid",
				size: "sm",
				loading: Z.value === e.canonical_key,
				disabled: he(e) === 0,
				"aria-label": `Merge duplicates of ${e.canonical_key}`,
				onClick: (t) => _e(e)
			}, {
				default: w(() => [...t[3] ||= [g(" Merge selected ", -1)]]),
				_: 1
			}, 8, [
				"loading",
				"disabled",
				"aria-label",
				"onClick"
			])]), h("ul", ce, [h("li", le, [
				h("span", ue, [_(i, { tone: "success" }, {
					default: w(() => [...t[4] ||= [g("Keep", -1)]]),
					_: 1
				})]),
				h("span", j, S(Q(e.primary)), 1),
				h("span", M, S(e.primary.descendant_count) + " children ", 1)
			]), (y(!0), m(d, null, x(e.duplicates, (t) => (y(), m("li", {
				key: t.id,
				class: "admin-duplicates__member"
			}, [h("label", N, [h("input", {
				type: "checkbox",
				checked: pe(e, t),
				"aria-label": `Merge ${Q(t)} into ${Q(e.primary)}`,
				"data-testid": `dup-${e.canonical_key}-${t.id}`,
				onChange: (n) => me(e, t, n.target.checked)
			}, null, 40, P), h("span", F, S(Q(t)), 1)]), h("span", I, S(t.descendant_count) + " children", 1)]))), 128))])], 8, A))), 128))]))], 64))
		]));
	}
}), [["__scopeId", "data-v-2c2f2163"]]);
export { L as default };

//# sourceMappingURL=DuplicatesPage-CnNJ9CFP.js.map