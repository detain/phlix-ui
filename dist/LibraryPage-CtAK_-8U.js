import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./client-CZc6ehUa.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-HphWxXcO.js";
import { n as i, o as a } from "./LoveButton-DfujAYIy.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./useLibrariesStore-BpHZLr2g.js";
import { i as ee } from "./usePageTitle-BO3GGF3M.js";
import { t as te } from "./Button-k7aQagzg.js";
import { n as ne, r as c, t as l } from "./FilterBar-DGcF4_oK.js";
import { t as re } from "./MetadataMatchModal-H5-IXqpz.js";
import { t as u } from "./EmptyState-B2QnGIQT.js";
import { t as d } from "./media-query-C8oxSF4h.js";
import { n as ie } from "./useResolvePlayable-CDFCMfKq.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as ae, createVNode as v, defineComponent as y, normalizeClass as b, onBeforeUnmount as x, onMounted as S, openBlock as C, ref as w, renderList as T, toDisplayString as E, unref as D, watch as O, withCtx as k } from "vue";
import { useRoute as oe, useRouter as se } from "vue-router";
//#region src/components/LetterRail.vue?vue&type=script&setup=true&lang.ts
var A = {
	class: "letter-rail",
	"aria-label": "Jump to a letter"
}, j = [
	"disabled",
	"aria-label",
	"onClick"
], ce = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "LetterRail",
	props: { letters: {} },
	emits: ["jump"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			return e === "#" ? "non-alphabetic titles" : `titles starting with ${e}`;
		}
		return (t, i) => (C(), g("nav", A, [(C(!0), g(f, null, T(e.letters, (e) => (C(), g("button", {
			key: e.letter,
			type: "button",
			class: b(["letter-rail__btn", { "is-empty": e.count === 0 }]),
			disabled: e.count === 0,
			"aria-label": `Jump to ${r(e.letter)} (${e.count})`,
			onClick: (t) => n("jump", e.offset)
		}, E(e.letter), 11, j))), 128))]));
	}
}), [["__scopeId", "data-v-30118e52"]]);
//#endregion
//#region src/api/letter-index.ts
function M(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.letter == "string" ? {
		letter: t.letter,
		offset: typeof t.offset == "number" ? t.offset : 0,
		count: typeof t.count == "number" ? t.count : 0
	} : null;
}
async function le(e, n = {}, r) {
	try {
		let i = (await new t({ baseUrl: e }).get(`/api/v1/media/letter-index?${d(n)}`, void 0, r))?.letters;
		return Array.isArray(i) ? i.map(M).filter((e) => e !== null) : [];
	} catch {
		return [];
	}
}
//#endregion
//#region src/pages/LibraryPage.vue?vue&type=script&setup=true&lang.ts
var ue = { class: "library-page" }, N = {
	key: 1,
	class: "library"
}, P = { class: "library-header" }, F = { class: "library-title" }, I = { class: "library-count numeric" }, L = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "LibraryPage",
	setup(e) {
		let d = n(), f = oe(), y = se(), b = ne(), T = s(), A = r(), j = a(), M = o(), L = i(), R = w(null), z = w([]), B = null, V = p(() => z.value.some((e) => e.count > 0));
		async function H() {
			if (B?.abort(), b.sort !== "name" || b.order !== "asc") {
				z.value = [];
				return;
			}
			let e = new AbortController();
			B = e;
			let t = await le(d.value, b.queryParams, e.signal);
			e.signal.aborted || (z.value = t);
		}
		function U(e) {
			R.value?.scrollToIndex(e);
		}
		let W = w(null), G = w(!1);
		function de(e) {
			W.value = e, G.value = !0;
		}
		function fe() {
			J();
		}
		let K = p(() => {
			let e = f.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), pe = p(() => T.byId(K.value)?.name ?? "Library");
		ee(() => T.byId(K.value)?.name);
		function q() {
			K.value && (b.clearFilters(), b.setLibraryId(K.value), b.setTopLevel(!0), me(), b.reset(), b.fetchMedia(d.value), H());
		}
		function me() {
			let e = f.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && b.setActors(t);
			let n = f.query.genres, r = Array.isArray(n) ? n.filter((e) => !!e) : n ? [n] : [];
			r.length && b.setGenres(r);
			let i = f.query.companies, a = Array.isArray(i) ? i.filter((e) => !!e) : i ? [i] : [];
			a.length && b.setCompanies(a);
			let o = Array.isArray(f.query.match) ? f.query.match[0] : f.query.match;
			(o === "matched" || o === "unmatched") && b.setMatchStatus(o);
		}
		function J() {
			b.reset(), b.fetchMedia(d.value), H();
		}
		S(() => {
			T.load(d.value), q();
		}), O(K, q), O(d, J), x(() => {
			b.setLibraryId(void 0), b.setTopLevel(!1), b.clearFilters(), b.reset();
		});
		function Y() {
			J();
		}
		function he(e, t) {
			b.ensureRange(d.value, e, t);
		}
		function X(e, t) {
			y?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let Z = null;
		function Q(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ge(e) {
			Z?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Z = n;
			let r = () => n !== Z;
			try {
				let i = await ie(new t({ baseUrl: d.value }), d.value, e, j.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					M.info("Nothing to play yet");
					return;
				}
				X("player", i.id);
			} catch (e) {
				if (r() || Q(e)) return;
				M.info("Nothing to play yet");
			}
		}
		function _e() {}
		function ve(e) {
			y?.hasRoute("media") && X("media", e.id);
		}
		function ye(e) {
			L.toggleFavorite(e.id, d.value), L.isFavorite(e.id) ? M.success(`Marked "${e.name}" as watched`) : M.info(`Marked "${e.name}" as unwatched`);
		}
		function be(e) {
			W.value = e, G.value = !0;
		}
		function xe(e) {
			M.info("Poster picker is coming soon");
		}
		let $ = null;
		async function Se(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			$?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			$ = n;
			let r = () => n !== $;
			try {
				if (await new t({ baseUrl: d.value }).deleteMediaItem(e.id), r()) return;
				b.items = b.items.filter((t) => t.id !== e.id), M.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || Q(t)) return;
				M.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		return (e, t) => (C(), g("div", ue, [K.value ? (C(), g("section", N, [
			_("div", P, [_("h1", F, E(pe.value), 1), _("span", I, E(D(b).total.toLocaleString()) + " titles", 1)]),
			v(l, { onChange: Y }),
			D(b).error ? (C(), m(u, {
				key: 0,
				icon: "alert",
				title: "Couldn't load titles",
				description: D(b).error
			}, {
				actions: k(() => [v(te, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: J
				}, {
					default: k(() => [...t[1] ||= [ae("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : h("", !0),
			v(c, {
				ref_key: "gridRef",
				ref: R,
				items: D(b).items,
				total: D(b).total,
				loading: D(b).loading && D(b).items.length === 0,
				"loading-more": D(b).loading && D(b).items.length > 0,
				"has-more": D(b).hasMore,
				"can-match": D(A).isAdmin,
				onNeedRange: he,
				onPlay: ge,
				onWatchlist: _e,
				onInfo: ve,
				onMatch: de,
				onMarkWatched: ye,
				onRefresh: be,
				onChoosePoster: xe,
				onRemove: Se
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match"
			]),
			V.value ? (C(), m(ce, {
				key: 1,
				letters: z.value,
				onJump: U
			}, null, 8, ["letters"])) : h("", !0)
		])) : (C(), m(u, {
			key: 0,
			icon: "alert",
			title: "Library not found",
			description: "No library was specified."
		})), D(A).isAdmin ? (C(), m(re, {
			key: 2,
			modelValue: G.value,
			"onUpdate:modelValue": t[0] ||= (e) => G.value = e,
			item: W.value,
			onApplied: fe
		}, null, 8, ["modelValue", "item"])) : h("", !0)]));
	}
}), [["__scopeId", "data-v-8fd493d3"]]);
//#endregion
export { L as default };

//# sourceMappingURL=LibraryPage-CtAK_-8U.js.map