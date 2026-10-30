import { l as e, t, x as n, y as r } from "./client-pLl-rDdN.js";
import { t as i } from "./libraries-Bn3QT8O5.js";
import { t as a } from "./useToastStore-Bu-iYU7r.js";
import { t as o } from "./Badge-C6LNO9Kk.js";
import { t as s } from "./PageHint-BlhPmafC.js";
import { t as c } from "./helpLinks-iarZuNmw.js";
import { t as l } from "./Button-1sKEdGjj.js";
import { t as ee } from "./Select-CvK9Rhql.js";
import { t as u } from "./Skeleton-B2Mt2L00.js";
import { t as d } from "./EmptyState-BjOJ1k_A.js";
import { n as f } from "./Icon-CIbfiPrs.js";
import { Fragment as p, computed as m, createBlock as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, onMounted as te, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, withCtx as D } from "vue";
// src/api/admin/duplicates.ts
var ne = class {
	constructor(e) {
		n(this, "client", void 0), this.client = e;
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
}, re = {
	class: "admin-duplicates",
	"aria-labelledby": "duplicates-heading"
}, ie = {
	key: 0,
	class: "admin-duplicates__skel"
}, ae = { class: "admin-duplicates__picker" }, oe = {
	key: 0,
	class: "admin-duplicates__skel"
}, se = {
	key: 3,
	class: "admin-duplicates__groups"
}, ce = ["data-testid"], le = { class: "admin-duplicates__group-head" }, ue = { class: "admin-duplicates__group-key" }, de = { class: "admin-duplicates__canonical" }, O = {
	class: "admin-duplicates__members",
	"aria-label": "Group members"
}, k = { class: "admin-duplicates__member admin-duplicates__member--primary" }, A = { class: "admin-duplicates__member-mark" }, j = { class: "admin-duplicates__member-name" }, M = { class: "admin-duplicates__member-count" }, N = { class: "admin-duplicates__member-check" }, P = [
	"checked",
	"aria-label",
	"data-testid",
	"onChange"
], F = { class: "admin-duplicates__member-name" }, I = { class: "admin-duplicates__member-count" }, L = /*#__PURE__*/ f(/* @__PURE__ */ b({
	__name: "DuplicatesPage",
	props: { client: {} },
	setup(n) {
		let f = n, b = x("apiBase", ""), L = m(() => typeof b == "string" ? b : b?.value ?? ""), R = f.client ?? new t({
			baseUrl: L.value,
			tokenStore: new e()
		}), z = new i(R), B = new ne(R), V = a(), H = C([]), U = C(!0), W = C(null), G = C(""), fe = m(() => H.value.map((e) => ({
			value: e.id,
			label: e.name
		})));
		async function K() {
			U.value = !0, W.value = null;
			try {
				H.value = await z.list(), !G.value && H.value.length > 0 && (G.value = H.value[0].id, await $());
			} catch (e) {
				W.value = r(e, "Failed to load libraries."), V.error(W.value);
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
			if (!G.value) q.value = [];
			else {
				J.value = !0, Y.value = null;
				try {
					let e = await B.listDuplicates(G.value);
					q.value = e, _e(e);
				} catch (e) {
					Y.value = r(e, "Failed to load duplicates."), V.error(Y.value);
				} finally {
					J.value = !1;
				}
			}
		}
		async function ve(e) {
			let t = Array.from(X.value[e.canonical_key] ?? []);
			if (t.length === 0) V.error("Select at least one duplicate to merge.");
			else {
				Z.value = e.canonical_key;
				try {
					let { moved: n, deleted: r } = await B.mergeDuplicates(e.primary.id, t);
					V.success(`Merged: ${n} moved, ${r} removed.`), await $();
				} catch (e) {
					V.error(r(e, "Failed to merge duplicates."));
				} finally {
					Z.value = null;
				}
			}
		}
		return te(K), (e, t) => (S(), g("section", re, [
			t[5] ||= _("header", { class: "admin-duplicates__head" }, [_("h1", {
				id: "duplicates-heading",
				class: "admin-duplicates__title"
			}, "Duplicates")], -1),
			y(s, {
				links: E(c).duplicates.links,
				details: E(c).duplicates.details
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
			U.value ? (S(), g("div", ie, [y(u, {
				variant: "text",
				lines: 3
			})])) : W.value ? (S(), h(d, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load libraries",
				description: W.value
			}, {
				actions: D(() => [y(l, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: D(() => [...t[1] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : H.value.length === 0 ? (S(), h(d, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add a library before scanning for duplicates."
			})) : (S(), g(p, { key: 3 }, [_("div", ae, [y(ee, {
				"model-value": G.value,
				options: fe.value,
				label: "Library",
				"onUpdate:modelValue": pe
			}, null, 8, ["model-value", "options"])]), J.value ? (S(), g("div", oe, [y(u, {
				variant: "text",
				lines: 6
			})])) : Y.value ? (S(), h(d, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load duplicates",
				description: Y.value
			}, {
				actions: D(() => [y(l, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: D(() => [...t[2] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value.length === 0 ? (S(), h(d, {
				key: 2,
				icon: "check",
				title: "No duplicates",
				description: "This library has no duplicate groups."
			})) : (S(), g("ul", se, [(S(!0), g(p, null, w(q.value, (e) => (S(), g("li", {
				key: e.canonical_key,
				class: "admin-duplicates__group",
				"data-testid": `group-${e.canonical_key}`
			}, [_("div", le, [_("div", ue, [y(o, { tone: "info" }, {
				default: D(() => [v(T(e.type), 1)]),
				_: 2
			}, 1024), _("code", de, T(e.canonical_key), 1)]), y(l, {
				variant: "solid",
				size: "sm",
				loading: Z.value === e.canonical_key,
				disabled: ge(e) === 0,
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
			])]), _("ul", O, [_("li", k, [
				_("span", A, [y(o, { tone: "success" }, {
					default: D(() => [...t[4] ||= [v("Keep", -1)]]),
					_: 1
				})]),
				_("span", j, T(Q(e.primary)), 1),
				_("span", M, T(e.primary.descendant_count) + " children ", 1)
			]), (S(!0), g(p, null, w(e.duplicates, (t) => (S(), g("li", {
				key: t.id,
				class: "admin-duplicates__member"
			}, [_("label", N, [_("input", {
				type: "checkbox",
				checked: me(e, t),
				"aria-label": `Merge ${Q(t)} into ${Q(e.primary)}`,
				"data-testid": `dup-${e.canonical_key}-${t.id}`,
				onChange: (n) => he(e, t, n.target.checked)
			}, null, 40, P), _("span", F, T(Q(t)), 1)]), _("span", I, T(t.descendant_count) + " children", 1)]))), 128))])], 8, ce))), 128))]))], 64))
		]));
	}
}), [["__scopeId", "data-v-1db5d564"]]);
export { L as default };

//# sourceMappingURL=DuplicatesPage-D2PxEn5Z.js.map