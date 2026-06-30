import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, t as r } from "./client-CX6TRWS-.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-k7aQagzg.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as s } from "./Select-BR5EXV0L.js";
import { t as c } from "./Skeleton-DkSoWF3C.js";
import { t as l } from "./EmptyState-B2QnGIQT.js";
import { t as ee } from "./libraries-CXAz_kXs.js";
import { Fragment as u, computed as d, createBlock as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, withCtx as w } from "vue";
//#region src/api/admin/duplicates.ts
var T = class {
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
}, E = {
	class: "admin-duplicates",
	"aria-labelledby": "duplicates-heading"
}, D = {
	key: 0,
	class: "admin-duplicates__skel"
}, te = { class: "admin-duplicates__picker" }, ne = {
	key: 0,
	class: "admin-duplicates__skel"
}, re = {
	key: 3,
	class: "admin-duplicates__groups"
}, ie = ["data-testid"], ae = { class: "admin-duplicates__group-head" }, oe = { class: "admin-duplicates__group-key" }, se = { class: "admin-duplicates__canonical" }, O = {
	class: "admin-duplicates__members",
	"aria-label": "Group members"
}, ce = { class: "admin-duplicates__member admin-duplicates__member--primary" }, k = { class: "admin-duplicates__member-mark" }, A = { class: "admin-duplicates__member-name" }, j = { class: "admin-duplicates__member-count" }, M = { class: "admin-duplicates__member-check" }, N = [
	"checked",
	"aria-label",
	"data-testid",
	"onChange"
], P = { class: "admin-duplicates__member-name" }, F = { class: "admin-duplicates__member-count" }, I = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "DuplicatesPage",
	props: { client: {} },
	setup(e) {
		let _ = e, I = v("apiBase", ""), L = d(() => typeof I == "string" ? I : I?.value ?? ""), R = _.client ?? new r({
			baseUrl: L.value,
			tokenStore: new t()
		}), z = new ee(R), B = new T(R), V = i(), H = x([]), U = x(!0), W = x(null), G = x(""), le = d(() => H.value.map((e) => ({
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
		function ue(e) {
			G.value = String(e), $();
		}
		let q = x([]), J = x(!1), Y = x(null), X = x({}), Z = x(null);
		function Q(e) {
			return e.title || e.name || e.id;
		}
		function de(e, t) {
			return X.value[e.canonical_key]?.has(t.id) ?? !1;
		}
		function fe(e, t, n) {
			let r = new Set(X.value[e.canonical_key] ?? []);
			n ? r.add(t.id) : r.delete(t.id), X.value = {
				...X.value,
				[e.canonical_key]: r
			};
		}
		function pe(e) {
			return X.value[e.canonical_key]?.size ?? 0;
		}
		function me(e) {
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
				q.value = e, me(e);
			} catch (e) {
				Y.value = n(e, "Failed to load duplicates."), V.error(Y.value);
			} finally {
				J.value = !1;
			}
		}
		async function he(e) {
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
		return y(K), (e, t) => (b(), p("section", E, [
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
			U.value ? (b(), p("div", D, [g(c, {
				variant: "text",
				lines: 3
			})])) : W.value ? (b(), f(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: W.value
			}, {
				actions: w(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: w(() => [...t[0] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : H.value.length === 0 ? (b(), f(l, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add a library before scanning for duplicates."
			})) : (b(), p(u, { key: 3 }, [m("div", te, [g(s, {
				"model-value": G.value,
				options: le.value,
				label: "Library",
				"onUpdate:modelValue": ue
			}, null, 8, ["model-value", "options"])]), J.value ? (b(), p("div", ne, [g(c, {
				variant: "text",
				lines: 6
			})])) : Y.value ? (b(), f(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load duplicates",
				description: Y.value
			}, {
				actions: w(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: w(() => [...t[1] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value.length === 0 ? (b(), f(l, {
				key: 2,
				icon: "check",
				title: "No duplicates",
				description: "This library has no duplicate groups."
			})) : (b(), p("ul", re, [(b(!0), p(u, null, S(q.value, (e) => (b(), p("li", {
				key: e.canonical_key,
				class: "admin-duplicates__group",
				"data-testid": `group-${e.canonical_key}`
			}, [m("div", ae, [m("div", oe, [g(o, { tone: "info" }, {
				default: w(() => [h(C(e.type), 1)]),
				_: 2
			}, 1024), m("code", se, C(e.canonical_key), 1)]), g(a, {
				variant: "solid",
				size: "sm",
				loading: Z.value === e.canonical_key,
				disabled: pe(e) === 0,
				"aria-label": `Merge duplicates of ${e.canonical_key}`,
				onClick: (t) => he(e)
			}, {
				default: w(() => [...t[2] ||= [h(" Merge selected ", -1)]]),
				_: 1
			}, 8, [
				"loading",
				"disabled",
				"aria-label",
				"onClick"
			])]), m("ul", O, [m("li", ce, [
				m("span", k, [g(o, { tone: "success" }, {
					default: w(() => [...t[3] ||= [h("Keep", -1)]]),
					_: 1
				})]),
				m("span", A, C(Q(e.primary)), 1),
				m("span", j, C(e.primary.descendant_count) + " children ", 1)
			]), (b(!0), p(u, null, S(e.duplicates, (t) => (b(), p("li", {
				key: t.id,
				class: "admin-duplicates__member"
			}, [m("label", M, [m("input", {
				type: "checkbox",
				checked: de(e, t),
				"aria-label": `Merge ${Q(t)} into ${Q(e.primary)}`,
				"data-testid": `dup-${e.canonical_key}-${t.id}`,
				onChange: (n) => fe(e, t, n.target.checked)
			}, null, 40, N), m("span", P, C(Q(t)), 1)]), m("span", F, C(t.descendant_count) + " children", 1)]))), 128))])], 8, ie))), 128))]))], 64))
		]));
	}
}), [["__scopeId", "data-v-e13a82a3"]]);
//#endregion
export { I as default };

//# sourceMappingURL=DuplicatesPage-C5UzhB5Q.js.map