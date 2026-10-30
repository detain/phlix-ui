import { n as e } from "./Icon-CIwTuFLd.js";
import { l as t, t as n, y as r } from "./client-DdVqCKVh.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./EmptyState-BAyOxAcK.js";
import { t as o } from "./Button-BuG0GvCa.js";
import { t as s } from "./Badge-A88fI41k.js";
import { t as c } from "./Select-CUH5f-z1.js";
import { t as l } from "./Skeleton-rHw-IJtl.js";
import { t as u } from "./PageHint-BGYg6qRJ.js";
import { t as d } from "./libraries-BESAWRyW.js";
import { t as f } from "./helpLinks-B4Y1FteC.js";
import { Fragment as p, computed as m, createBlock as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, onMounted as ee, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, withCtx as D } from "vue";
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
}, fe = { class: "admin-duplicates__member admin-duplicates__member--primary" }, O = { class: "admin-duplicates__member-mark" }, k = { class: "admin-duplicates__member-name" }, A = { class: "admin-duplicates__member-count" }, j = { class: "admin-duplicates__member-check" }, M = [
	"checked",
	"aria-label",
	"data-testid",
	"onChange"
], N = { class: "admin-duplicates__member-name" }, P = { class: "admin-duplicates__member-count" }, F = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "DuplicatesPage",
	props: { client: {} },
	setup(e) {
		let b = e, F = x("apiBase", ""), I = m(() => typeof F == "string" ? F : F?.value ?? ""), L = b.client ?? new n({
			baseUrl: I.value,
			tokenStore: new t()
		}), R = new d(L), z = new te(L), B = i(), V = C([]), H = C(!0), U = C(null), W = C(""), pe = m(() => V.value.map((e) => ({
			value: e.id,
			label: e.name
		})));
		async function G() {
			H.value = !0, U.value = null;
			try {
				V.value = await R.list(), !W.value && V.value.length > 0 && (W.value = V.value[0].id, await $());
			} catch (e) {
				U.value = r(e, "Failed to load libraries."), B.error(U.value);
			} finally {
				H.value = !1;
			}
		}
		function me(e) {
			W.value = String(e), $();
		}
		let K = C([]), q = C(!1), J = C(null), Y = C({}), X = C(null);
		function Z(e) {
			return e.title || e.name || e.id;
		}
		function he(e, t) {
			return Y.value[e.canonical_key]?.has(t.id) ?? !1;
		}
		function ge(e, t, n) {
			let r = new Set(Y.value[e.canonical_key] ?? []);
			n ? r.add(t.id) : r.delete(t.id), Y.value = {
				...Y.value,
				[e.canonical_key]: r
			};
		}
		function _e(e) {
			return Y.value[e.canonical_key]?.size ?? 0;
		}
		function Q(e) {
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
				K.value = e, Q(e);
			} catch (e) {
				J.value = r(e, "Failed to load duplicates."), B.error(J.value);
			} finally {
				q.value = !1;
			}
		}
		async function ve(e) {
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
				B.error(r(e, "Failed to merge duplicates."));
			} finally {
				X.value = null;
			}
		}
		return ee(G), (e, t) => (S(), g("section", ne, [
			t[5] ||= _("header", { class: "admin-duplicates__head" }, [_("h1", {
				id: "duplicates-heading",
				class: "admin-duplicates__title"
			}, "Duplicates")], -1),
			y(u, {
				links: E(f).duplicates.links,
				details: E(f).duplicates.details
			}, {
				default: D(() => [...t[0] ||= [
					v(" Finds titles that appear more than once (matched by a canonical key) so you can tidy them up. Pick a ", -1),
					_("strong", null, "library", -1),
					v(" to scope the search; each group keeps one entry marked ", -1),
					_("strong", null, "Keep", -1),
					v(" as the primary. Tick the duplicates you want to fold in, then ", -1),
					_("strong", null, "Merge selected", -1),
					v(" to combine them into that primary — the extras' data is merged in and their rows removed. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			t[6] ||= _("p", { class: "admin-duplicates__hint" }, [
				v(" When the same series or movie was scanned more than once, its copies show up here grouped by a shared key. Pick the copy to "),
				_("strong", null, "keep"),
				v(" (the primary, pre-selected) and check the duplicates to fold into it. "),
				_("strong", null, "Merge"),
				v(" re-parents the duplicates' episodes/seasons onto the primary and removes the empty leftovers. ")
			], -1),
			H.value ? (S(), g("div", re, [y(l, {
				variant: "text",
				lines: 3
			})])) : U.value ? (S(), h(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: U.value
			}, {
				actions: D(() => [y(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: G
				}, {
					default: D(() => [...t[1] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : V.value.length === 0 ? (S(), h(a, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add a library before scanning for duplicates."
			})) : (S(), g(p, { key: 3 }, [_("div", ie, [y(c, {
				"model-value": W.value,
				options: pe.value,
				label: "Library",
				"onUpdate:modelValue": me
			}, null, 8, ["model-value", "options"])]), q.value ? (S(), g("div", ae, [y(l, {
				variant: "text",
				lines: 6
			})])) : J.value ? (S(), h(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load duplicates",
				description: J.value
			}, {
				actions: D(() => [y(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: D(() => [...t[2] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : K.value.length === 0 ? (S(), h(a, {
				key: 2,
				icon: "check",
				title: "No duplicates",
				description: "This library has no duplicate groups."
			})) : (S(), g("ul", oe, [(S(!0), g(p, null, w(K.value, (e) => (S(), g("li", {
				key: e.canonical_key,
				class: "admin-duplicates__group",
				"data-testid": `group-${e.canonical_key}`
			}, [_("div", ce, [_("div", le, [y(s, { tone: "info" }, {
				default: D(() => [v(T(e.type), 1)]),
				_: 2
			}, 1024), _("code", ue, T(e.canonical_key), 1)]), y(o, {
				variant: "solid",
				size: "sm",
				loading: X.value === e.canonical_key,
				disabled: _e(e) === 0,
				"aria-label": `Merge duplicates of ${e.canonical_key}`,
				onClick: (t) => ve(e)
			}, {
				default: D(() => [...t[3] ||= [v(" Merge selected ", -1)]]),
				_: 1
			}, 8, [
				"loading",
				"disabled",
				"aria-label",
				"onClick"
			])]), _("ul", de, [_("li", fe, [
				_("span", O, [y(s, { tone: "success" }, {
					default: D(() => [...t[4] ||= [v("Keep", -1)]]),
					_: 1
				})]),
				_("span", k, T(Z(e.primary)), 1),
				_("span", A, T(e.primary.descendant_count) + " children ", 1)
			]), (S(!0), g(p, null, w(e.duplicates, (t) => (S(), g("li", {
				key: t.id,
				class: "admin-duplicates__member"
			}, [_("label", j, [_("input", {
				type: "checkbox",
				checked: he(e, t),
				"aria-label": `Merge ${Z(t)} into ${Z(e.primary)}`,
				"data-testid": `dup-${e.canonical_key}-${t.id}`,
				onChange: (n) => ge(e, t, n.target.checked)
			}, null, 40, M), _("span", N, T(Z(t)), 1)]), _("span", P, T(t.descendant_count) + " children", 1)]))), 128))])], 8, se))), 128))]))], 64))
		]));
	}
}), [["__scopeId", "data-v-7d39d2e2"]]);
//#endregion
export { F as default };

//# sourceMappingURL=DuplicatesPage-BHo-MPTM.js.map