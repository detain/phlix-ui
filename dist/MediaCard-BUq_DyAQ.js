import { n as e, t } from "./Icon-ax5k7_G2.js";
import { i as n } from "./usePlayerStore-Cffo63UC.js";
import { Fragment as r, computed as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, inject as d, normalizeClass as f, normalizeStyle as p, onMounted as ee, openBlock as m, ref as h, renderList as g, renderSlot as _, toDisplayString as v } from "vue";
import { routerKey as y } from "vue-router";
//#region src/composables/usePrefetch.ts
function b() {
	let e = d(y, null), t = /* @__PURE__ */ new WeakSet();
	function n(n) {
		if (!e) return;
		let r;
		try {
			r = e.resolve(n).matched;
		} catch {
			return;
		}
		for (let e of r) {
			let n = e.components;
			if (n) {
				for (let e of Object.values(n)) if (!(typeof e != "function" || t.has(e))) {
					t.add(e);
					try {
						let t = e();
						t && typeof t.then == "function" && t.catch(() => {});
					} catch {}
				}
			}
		}
	}
	return { prefetch: n };
}
//#endregion
//#region src/components/media-poster.ts
var x = "(max-width: 600px) 45vw, 200px";
function S(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function C(e) {
	return Number(e.toFixed(3)).toString();
}
function w(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${C(e.density)}x` : t;
}
function T(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = w(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function te(e, t) {
	let n = T(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : S(n) ? {
		srcset: n,
		sizes: x
	} : { srcset: n };
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var E = { class: "media-card__poster" }, D = ["href", "aria-label"], O = { class: "visually-hidden" }, k = [
	"src",
	"srcset",
	"sizes",
	"alt"
], A = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, j = { class: "media-card__badges" }, M = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, N = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, P = ["aria-valuenow", "aria-label"], F = { class: "media-card__overlay" }, I = { class: "media-card__title" }, L = { class: "media-card__meta" }, R = {
	key: 0,
	class: "numeric"
}, z = {
	key: 1,
	class: "media-card__dot"
}, B = {
	key: 2,
	class: "media-card__cert"
}, V = {
	key: 3,
	class: "media-card__dot"
}, H = {
	key: 4,
	class: "numeric"
}, U = {
	key: 0,
	class: "media-card__genres"
}, W = { class: "media-card__actions" }, G = { class: "media-card__caption" }, K = ["title"], q = { class: "media-card__caption-sub numeric" }, J = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 },
		posterSrcset: {},
		posterSizes: {}
	},
	emits: [
		"play",
		"watchlist",
		"info"
	],
	setup(e, { emit: u }) {
		let d = e, y = u, x = n(), S = i(() => d.to ?? (d.item.type === "series" ? `/app/media/${d.item.id}` : `/app/player/${d.item.id}`)), { prefetch: C } = b();
		function w() {
			C(S.value);
		}
		let T = h(!1), J = h(null);
		function Y() {
			T.value = !0;
		}
		ee(() => {
			J.value?.complete && (T.value = !0);
		});
		let X = i(() => te(d.posterSrcset ?? d.item.poster_srcset, d.posterSizes)), Z = i(() => {
			let e = d.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= d.newWithinDays * 24 * 60 * 60 * 1e3;
		}), Q = i(() => {
			let e = x.resumePositionFor(d.item.id), t = d.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), $ = i(() => d.item.genres?.slice(0, 3) ?? []);
		return (n, i) => (m(), o("article", {
			class: "media-card",
			onPointerenter: w,
			onFocusin: w
		}, [s("div", E, [
			s("a", {
				href: S.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [s("span", O, v(e.item.name), 1)], 8, D),
			e.item.poster_url ? (m(), o("img", {
				key: 0,
				ref_key: "imgEl",
				ref: J,
				class: f(["media-card__img", { "is-loaded": T.value }]),
				src: e.item.poster_url,
				srcset: X.value.srcset,
				sizes: X.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: Y
			}, null, 42, k)) : (m(), o("div", A, [l(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			s("div", j, [
				Z.value ? (m(), o("span", M, "New")) : a("", !0),
				_(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (m(), o("span", N, v(e.quality), 1)) : a("", !0)
			]),
			Q.value > 0 ? (m(), o("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(Q.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [s("i", { style: p({ width: `${Q.value * 100}%` }) }, null, 4)], 8, P)) : a("", !0),
			s("div", F, [
				s("h3", I, v(e.item.name), 1),
				s("div", L, [
					e.item.year ? (m(), o("span", R, v(e.item.year), 1)) : a("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (m(), o("span", z)) : a("", !0),
					e.item.rating ? (m(), o("span", B, v(e.item.rating), 1)) : a("", !0),
					e.item.rating && e.item.runtime ? (m(), o("span", V)) : a("", !0),
					e.item.runtime ? (m(), o("span", H, v(e.item.runtime) + "m", 1)) : a("", !0)
				]),
				$.value.length ? (m(), o("div", U, [(m(!0), o(r, null, g($.value, (e) => (m(), o("span", { key: e }, v(e), 1))), 128))])) : a("", !0),
				s("div", W, [
					s("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: i[0] ||= (t) => y("play", e.item)
					}, [l(t, { name: "play" })]),
					s("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: i[1] ||= (t) => y("watchlist", e.item)
					}, [l(t, { name: "bookmark-plus" })]),
					s("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: i[2] ||= (t) => y("info", e.item)
					}, [l(t, { name: "info" })]),
					_(n.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), s("div", G, [s("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, v(e.item.name), 9, K), s("div", q, [
			e.item.year ? (m(), o(r, { key: 0 }, [c(v(e.item.year), 1)], 64)) : a("", !0),
			e.item.year && e.item.runtime ? (m(), o(r, { key: 1 }, [c(" · ")], 64)) : a("", !0),
			e.item.runtime ? (m(), o(r, { key: 2 }, [c(v(e.item.runtime) + "m", 1)], 64)) : a("", !0)
		])])], 32));
	}
}), [["__scopeId", "data-v-7a1abad7"]]);
//#endregion
export { b as n, J as t };

//# sourceMappingURL=MediaCard-BUq_DyAQ.js.map