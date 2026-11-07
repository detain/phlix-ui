import { n as e } from "./useApiBase-DXTBY90j.js";
import { n as t } from "./ThumbRating-BHpXmeMX.js";
import { t as n } from "./MediaGrid-N_LCCv5N.js";
import { t as r } from "./MetadataMatchModal-Bl59Xt6I.js";
import { n as i, t as a } from "./useItemInspector-BvQBkzw1.js";
import { t as ee } from "./PosterPicker-D66PMMlH.js";
import { t as te } from "./ConfirmDialog-s31p04zd.js";
import { t as o } from "./EmptyState-DjfWh3kt.js";
import { t as s } from "./Button-Dfl4y6vO.js";
import { t as ne } from "./Spinner-DnXYep7x.js";
import { t as re } from "./useToastStore-CxO_ppM8.js";
import { t as c } from "./useAuthStore-W5z8oEAk.js";
import { i as ie } from "./usePlayerStore-BpohCwDP.js";
import { r as ae } from "./useResolvePlayable-CnOPgUvz.js";
import { n as oe, r as se, t as ce } from "./wireErrors-BkdyAKba.js";
import { t as l, x as u } from "./client-BLNUsFSj.js";
import { t as le } from "./useMessages-skYe1O45.js";
import { n as ue } from "./debounce-BnRz-bwe.js";
import { n as d } from "./Icon-55iG1rR7.js";
import { Fragment as de, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as fe, isRef as pe, onMounted as me, openBlock as b, ref as x, toDisplayString as he, unref as S, vModelText as ge, watch as C, withCtx as w, withDirectives as _e, withModifiers as ve } from "vue";
import { useRoute as ye, useRouter as be } from "vue-router";
// src/pages/searchErrors.ts
function xe(e, t, n) {
	return oe(e, {
		title: "Search failed",
		description: t
	}, n);
}
// src/pages/SearchPage.vue?vue&type=script&setup=true&lang.ts
var T = { class: "search-page" }, E = { class: "search-header" }, D = ["aria-label"], O = {
	key: 0,
	class: "search-loading"
}, k = {
	key: 0,
	class: "search-cap-notice"
}, A = /*#__PURE__*/ d(/* @__PURE__ */ y({
	__name: "SearchPage",
	setup(oe) {
		let d = ye(), y = be(), A = e(), j = fe("phlixConfig", null), M = t(), N = re(), P = c(), Se = ie(), { t: F } = le(), I = x(""), L = x([]), R = x(null), z = x(!1), B = x(null), V = x(!1), H = ue(() => {
			I.value.trim() === "" ? y.replace({ query: {} }) : y.replace({ query: { q: I.value.trim() } }), U();
		}, 300);
		async function U() {
			let e = I.value.trim();
			if (e === "") L.value = [], R.value = null, V.value = !1, B.value = null;
			else {
				V.value = !0, z.value = !0, B.value = null;
				try {
					let t = await new l({ baseUrl: A.value }).get("/api/v1/media/search", { q: e });
					L.value = t.items ?? [], R.value = typeof t.total == "number" && Number.isFinite(t.total) ? t.total : null, L.value.forEach((e) => M.hydrate(e));
				} catch (e) {
					B.value = xe(ce(e), u(e), j?.locale), L.value = [], R.value = null;
				} finally {
					z.value = !1;
				}
			}
		}
		let W = x(null);
		me(() => {
			let e = d.query.q ?? "";
			I.value = e, W.value?.focus(), e.trim() !== "" && U();
		}), C(() => d.query.q, (e) => {
			let t = e ?? "";
			t !== I.value && (I.value = t, t.trim() === "" ? (L.value = [], R.value = null, V.value = !1) : U());
		});
		let Ce = f(() => V.value && !z.value && L.value.length === 0 && B.value === null), we = f(() => V.value && !z.value && L.value.length > 0), Te = f(() => !V.value && I.value.trim() === ""), Ee = f(() => V.value && B.value !== null), De = f(() => R.value !== null && L.value.length < R.value), Oe = f(() => R.value === null ? "" : F("search.showingOf", {
			shown: L.value.length.toLocaleString(),
			total: R.value.toLocaleString()
		})), G = x(null), K = x(!1), { inspectorItem: ke, inspectorOpen: q, openInspector: Ae } = a();
		function J(e) {
			G.value = e, K.value = !0;
		}
		function je(e) {
			L.value = L.value.map((t) => t.id === e.id ? e : t), N.success(`Updated metadata for “${e.name}”.`);
		}
		function Y(e, t) {
			y.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let X = null;
		function Me(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function Ne(e) {
			X?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			X = t;
			let n = () => t !== X;
			try {
				let r = new l({ baseUrl: A.value }), i = await ae(r, A.value, e, Se.resumeMap, t?.signal);
				if (n()) return;
				if (!i) {
					N.info(F("library.nothingToPlay"));
					return;
				}
				Y("player", i.id);
			} catch (e) {
				if (n() || Me(e)) return;
				N.info(F("library.nothingToPlay"));
			}
		}
		function Pe(e) {
			y.hasRoute("media") ? Y("media", e.id) : N.info(F("common.detailsUnavailable", { name: e.name }));
		}
		function Fe(e) {
			M.isFavorite(e.id) ? N.success(F("itemActions.addedToList", { name: e.name })) : N.info(F("itemActions.removedFromList", { name: e.name }));
		}
		function Ie(e) {
			M.isWatched(e.id) ? N.success(`Marked “${e.name}” as watched.`) : N.info(`Marked “${e.name}” as unwatched.`);
		}
		let Z = x(!1), Q = x(null);
		function Le(e) {
			Q.value = e, Z.value = !0;
		}
		function Re(e) {
			L.value = L.value.map((t) => t.id === e.id ? e : t), N.success(`Updated poster for “${e.name}”.`);
		}
		let $ = x(null);
		function ze(e) {
			$.value = e;
		}
		async function Be() {
			let e = $.value;
			if ($.value = null, e) try {
				await new l({ baseUrl: A.value }).deleteMediaItem(e.id), L.value = L.value.filter((t) => t.id !== e.id), N.success(`Removed “${e.name}”.`);
			} catch (t) {
				N.error(`Failed to remove “${e.name}”.`, { message: se(t, "Unknown error", j?.locale) });
			}
		}
		return (e, t) => (b(), h("div", T, [
			g("header", E, [t[8] ||= g("h1", { class: "search-title" }, "Search", -1), g("form", {
				class: "search-form",
				onSubmit: t[2] ||= ve((...e) => S(H) && S(H)(...e), ["prevent"])
			}, [_e(g("input", {
				ref_key: "inputRef",
				ref: W,
				"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
				type: "search",
				name: "q",
				"aria-label": S(F)("search.inputLabel"),
				placeholder: "Search movies, shows, music, books...",
				class: "search-input",
				autocomplete: "off",
				autofocus: "",
				onInput: t[1] ||= (...e) => S(H) && S(H)(...e)
			}, null, 40, D), [[ge, I.value]]), v(s, {
				type: "submit",
				variant: "solid"
			}, {
				default: w(() => [...t[7] ||= [_(" Search ", -1)]]),
				_: 1
			})], 32)]),
			z.value ? (b(), h("div", O, [v(ne, { label: "Searching…" })])) : Ee.value ? (b(), p(o, {
				key: 1,
				icon: "alert",
				title: B.value?.title ?? "Search failed",
				description: B.value?.description
			}, {
				actions: w(() => [v(s, {
					variant: "solid",
					size: "sm",
					onClick: U
				}, {
					default: w(() => [...t[9] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : Te.value ? (b(), p(o, {
				key: 2,
				icon: "search",
				title: "Search your library",
				description: "Enter a query above to find movies, shows, music, books, and more."
			})) : Ce.value ? (b(), p(o, {
				key: 3,
				icon: "film",
				title: `No results for "${I.value}"`,
				description: "Try a different spelling or fewer words."
			}, null, 8, ["title"])) : we.value ? (b(), h(de, { key: 4 }, [De.value ? (b(), h("p", k, he(Oe.value), 1)) : m("", !0), v(n, {
				items: L.value,
				total: R.value,
				"can-match": S(P).isAdmin,
				onPlay: Ne,
				onInfo: Pe,
				onWatchlist: Fe,
				onMarkWatched: Ie,
				onMatch: J,
				onRefresh: J,
				onEditMetadata: J,
				onExploreData: S(Ae),
				onChoosePoster: Le,
				onRemove: ze
			}, null, 8, [
				"items",
				"total",
				"can-match",
				"onExploreData"
			])], 64)) : m("", !0),
			S(P).isAdmin ? (b(), p(r, {
				key: 5,
				modelValue: K.value,
				"onUpdate:modelValue": t[3] ||= (e) => K.value = e,
				item: G.value,
				onApplied: je
			}, null, 8, ["modelValue", "item"])) : m("", !0),
			S(P).isAdmin ? (b(), p(i, {
				key: 6,
				modelValue: S(q),
				"onUpdate:modelValue": t[4] ||= (e) => pe(q) ? q.value = e : null,
				item: S(ke)
			}, null, 8, ["modelValue", "item"])) : m("", !0),
			S(P).isAdmin ? (b(), p(ee, {
				key: 7,
				modelValue: Z.value,
				"onUpdate:modelValue": t[5] ||= (e) => Z.value = e,
				item: Q.value,
				onApplied: Re
			}, null, 8, ["modelValue", "item"])) : m("", !0),
			v(te, {
				open: $.value !== null,
				message: $.value ? `Remove “${$.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[6] ||= (e) => {
					e || ($.value = null);
				},
				onConfirm: Be
			}, null, 8, ["open", "message"])
		]));
	}
}), [["__scopeId", "data-v-5fe3c14d"]]);
export { A as default };

//# sourceMappingURL=SearchPage-Dix9Ix25.js.map