import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as n } from "./useAuthStore-BoiyS0RI.js";
import { i as r } from "./usePlayerStore-BVgQE-j8.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { n as a, t as o } from "./ThumbRating-BJEUrMHi.js";
import { Fragment as s, Teleport as c, Transition as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, nextTick as y, normalizeClass as b, normalizeStyle as x, onBeforeUnmount as S, onMounted as C, openBlock as w, ref as T, renderList as E, renderSlot as D, toDisplayString as O, watch as k, withCtx as ee, withModifiers as A } from "vue";
import { routerKey as j } from "vue-router";
//#region src/components/ui/Menu.vue?vue&type=script&setup=true&lang.ts
var M = ["id"], N = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"onClick",
	"onPointermove"
], P = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "Menu",
	props: {
		items: {},
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "select"],
	setup(e, { emit: t }) {
		function n(e, t, n) {
			let r = e.length;
			if (r === 0) return -1;
			let i = t;
			for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
			return t;
		}
		function r(e, t) {
			return t === "first" ? n(e, -1, 1) : n(e, 0, -1);
		}
		let i = e, a = t, o = crypto.randomUUID(), m = u(() => `${o}-menu`), _ = T(i.open);
		k(() => i.open, (e) => _.value = e), k(_, (e) => a("update:open", e));
		let v = T(null), C = T(null), A = T(-1), j = T(!1), P = T({});
		function F() {
			_.value || (_.value = !0, A.value = r(i.items, "first"), y(() => {
				B(), C.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function I() {
			_.value = !1, A.value = -1, v.value?.querySelector("button,[contenteditable]")?.focus?.();
		}
		function L() {
			_.value ? I() : F();
		}
		function R(e) {
			A.value = n(i.items, A.value, e), y(() => {
				C.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" });
			});
		}
		function z(e) {
			let t = i.items[e];
			!t || t.disabled || (a("select", t, e), t.onClick?.(), I());
		}
		function B() {
			if (!v.value) return;
			let e = v.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = C.value?.offsetWidth ?? 200, i = C.value?.offsetHeight ?? 280, a = n - e.bottom;
			j.value = a < i + 4 && e.top > a;
			let o = e.left;
			o + r > t - 8 && (o = t - r - 8), o < 8 && (o = 8);
			let s = j.value ? Math.max(8, e.top - i - 4) : e.bottom + 4;
			P.value = {
				left: `${Math.round(o)}px`,
				top: `${Math.round(s)}px`
			};
		}
		function V(e) {
			_.value || (_.value = !0, A.value = r(i.items, e), y(() => {
				B(), C.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function H(e) {
			if (!_.value) {
				if (e.key === "ArrowDown") {
					e.preventDefault(), V("first");
					return;
				}
				if (e.key === "ArrowUp") {
					e.preventDefault(), V("last");
					return;
				}
				return;
			}
			U(e);
		}
		function U(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), R(1);
					break;
				case "ArrowUp":
					e.preventDefault(), R(-1);
					break;
				case "Home":
					e.preventDefault(), A.value = r(i.items, "first"), y(() => C.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "End":
					e.preventDefault(), A.value = r(i.items, "last"), y(() => C.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), A.value >= 0 && z(A.value);
					break;
				case "Escape":
					e.preventDefault(), I();
					break;
				case "Tab":
					e.preventDefault(), I();
					break;
			}
		}
		function W(e) {
			_.value && v.value && C.value && !v.value.contains(e.target) && !C.value.contains(e.target) && I();
		}
		return k(_, (e) => {
			e ? document.addEventListener("pointerdown", W, !0) : document.removeEventListener("pointerdown", W, !0);
		}), S(() => {
			document.removeEventListener("pointerdown", W, !0);
		}), (t, n) => (w(), p("div", {
			ref_key: "triggerEl",
			ref: v,
			class: "phlix-menu",
			onClick: L,
			onKeydown: H
		}, [D(t.$slots, "default", {
			open: _.value,
			toggle: L,
			openMenu: F
		}, void 0, !0), (w(), d(c, { to: "body" }, [g(l, { name: "phlix-menu" }, {
			default: ee(() => [_.value ? (w(), p("div", {
				key: 0,
				id: m.value,
				ref_key: "menuEl",
				ref: C,
				class: b(["phlix-menu__list", { "is-flipped": j.value }]),
				style: x(P.value),
				role: "menu",
				onKeydown: U
			}, [(w(!0), p(s, null, E(e.items, (e, n) => (w(), p("button", {
				key: n,
				type: "button",
				class: b(["phlix-menu__item", {
					"is-active": n === A.value,
					"is-danger": e.danger,
					"is-disabled": e.disabled
				}]),
				role: "menuitem",
				tabindex: n === A.value ? 0 : -1,
				"aria-disabled": e.disabled || void 0,
				"aria-label": e.danger ? e.label + " (danger)" : e.label,
				onClick: (e) => z(n),
				onPointermove: (t) => !e.disabled && (A.value = n)
			}, [D(t.$slots, "item", {
				item: e,
				index: n
			}, () => [h(O(e.label), 1)], !0)], 42, N))), 128))], 46, M)) : f("", !0)]),
			_: 3
		})]))], 544));
	}
}), [["__scopeId", "data-v-53e3f39d"]]);
//#endregion
//#region src/composables/usePrefetch.ts
function F() {
	let e = v(j, null), t = /* @__PURE__ */ new WeakSet();
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
var I = "(max-width: 600px) 45vw, 200px";
function L(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function R(e) {
	return Number(e.toFixed(3)).toString();
}
function z(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${R(e.density)}x` : t;
}
function B(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = z(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function V(e, t) {
	let n = B(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : L(n) ? {
		srcset: n,
		sizes: I
	} : { srcset: n };
}
//#endregion
//#region src/components/mediaItemMenu.ts
var H = {
	addToPlaylist: "Add to playlist",
	like: "Like",
	dislike: "Dislike",
	markPlayed: "Mark played",
	markUnplayed: "Mark unplayed",
	download: "Download",
	missingEpisodes: "View missing episodes",
	shuffle: "Shuffle",
	refreshMetadata: "Refresh metadata",
	identify: "Identify from beginning",
	editMetadata: "Edit metadata",
	editImages: "Edit images",
	exploreData: "Explore item data",
	remove: "Remove"
};
function U(e, t) {
	let n = H, r = [
		{ label: n.addToPlaylist },
		{ label: n.like },
		{ label: n.dislike },
		{ label: t.isWatched ? n.markUnplayed : n.markPlayed },
		{ label: n.download }
	];
	return t.isSeriesOrSeason && r.push({ label: n.missingEpisodes }), r.push({ label: n.shuffle }), t.isAdmin && (r.push({ label: n.refreshMetadata }), r.push({ label: n.identify }), r.push({ label: n.editMetadata }), t.canChoosePoster && r.push({ label: n.editImages }), r.push({ label: n.exploreData }), e.canDelete && r.push({
		label: n.remove,
		danger: !0
	})), r;
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var W = { class: "media-card__poster" }, te = ["href", "aria-label"], ne = { class: "visually-hidden" }, re = [
	"src",
	"srcset",
	"sizes",
	"alt"
], ie = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, ae = { class: "media-card__badges" }, oe = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, se = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, ce = ["aria-valuenow", "aria-label"], le = { class: "media-card__overlay" }, ue = { class: "media-card__title" }, de = { class: "media-card__meta" }, fe = {
	key: 0,
	class: "numeric"
}, pe = {
	key: 1,
	class: "media-card__dot"
}, me = {
	key: 2,
	class: "media-card__cert"
}, he = {
	key: 3,
	class: "media-card__dot"
}, ge = {
	key: 4,
	class: "numeric"
}, _e = {
	key: 0,
	class: "media-card__genres"
}, ve = {
	key: 1,
	class: "media-card__actions"
}, ye = ["aria-label", "aria-pressed"], be = ["aria-label", "aria-pressed"], xe = ["aria-expanded", "onClick"], Se = { class: "media-card__caption" }, Ce = ["title"], we = { class: "media-card__caption-sub numeric" }, G = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 },
		posterSrcset: {},
		posterSizes: {},
		canMatch: {
			type: Boolean,
			default: !1
		},
		hideActions: {
			type: Boolean,
			default: !1
		},
		subtitle: { default: null }
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"match",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove"
	],
	setup(e, { emit: c }) {
		let l = e, d = c, _ = r(), y = n(), S = a(), k = v("phlixConfig", null), j = u(() => S.isFavorite(l.item.id)), M = u(() => S.likeLevel(l.item.id)), N = u(() => y.isAdmin), I = u(() => S.isWatched(l.item.id)), L = T(!1), R = u(() => l.item.type === "series" || l.item.type === "season"), z = u(() => U(l.item, {
			isAdmin: N.value,
			isWatched: I.value,
			isSeriesOrSeason: R.value,
			canChoosePoster: N.value
		}));
		function B(e) {
			let t = H;
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					K();
					break;
				case t.like:
					S.setLike(l.item.id, 1, k?.apiBase ?? "");
					break;
				case t.dislike:
					S.setLike(l.item.id, -1, k?.apiBase ?? "");
					break;
				case t.refreshMetadata:
				case t.identify:
					d("refresh", l.item);
					break;
				case t.editImages:
					d("choose-poster", l.item);
					break;
				case t.remove:
					d("remove", l.item);
					break;
				default: i().info(`${e.label} isn't available yet`);
			}
		}
		function G(e) {
			S.setLike(l.item.id, e, k?.apiBase ?? "");
		}
		function Te() {
			S.toggleFavorite(l.item.id, k?.apiBase ?? ""), d("watchlist", l.item);
		}
		function K() {
			S.toggleWatched(l.item.id, k?.apiBase ?? ""), d("mark-watched", l.item);
		}
		let q = u(() => l.to ?? `/app/media/${l.item.id}`), { prefetch: Ee } = F();
		function J() {
			Ee(q.value);
		}
		let Y = T(!1), X = T(null);
		function De() {
			Y.value = !0;
		}
		C(() => {
			X.value?.complete && (Y.value = !0);
		});
		let Z = u(() => V(l.posterSrcset ?? l.item.poster_srcset, l.posterSizes)), Oe = u(() => {
			let e = l.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= l.newWithinDays * 24 * 60 * 60 * 1e3;
		}), Q = u(() => {
			let e = _.resumePositionFor(l.item.id), t = l.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), $ = u(() => l.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (w(), p("article", {
			class: "media-card",
			onPointerenter: J,
			onFocusin: J
		}, [m("div", W, [
			m("a", {
				href: q.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [m("span", ne, O(e.item.name), 1)], 8, te),
			e.item.poster_url ? (w(), p("img", {
				key: 0,
				ref_key: "imgEl",
				ref: X,
				class: b(["media-card__img", { "is-loaded": Y.value }]),
				src: e.item.poster_url,
				srcset: Z.value.srcset,
				sizes: Z.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: De
			}, null, 42, re)) : (w(), p("div", ie, [g(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			m("div", ae, [
				Oe.value ? (w(), p("span", oe, "New")) : f("", !0),
				D(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (w(), p("span", se, O(e.quality), 1)) : f("", !0)
			]),
			Q.value > 0 ? (w(), p("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(Q.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [m("i", { style: x({ width: `${Q.value * 100}%` }) }, null, 4)], 8, ce)) : f("", !0),
			m("div", le, [
				m("h3", ue, O(e.item.name), 1),
				m("div", de, [
					e.item.year ? (w(), p("span", fe, O(e.item.year), 1)) : f("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (w(), p("span", pe)) : f("", !0),
					e.item.rating ? (w(), p("span", me, O(e.item.rating), 1)) : f("", !0),
					e.item.rating && e.item.runtime ? (w(), p("span", he)) : f("", !0),
					e.item.runtime ? (w(), p("span", ge, O(e.item.runtime) + "m", 1)) : f("", !0)
				]),
				$.value.length ? (w(), p("div", _e, [(w(!0), p(s, null, E($.value, (e) => (w(), p("span", { key: e }, O(e), 1))), 128))])) : f("", !0),
				e.hideActions ? f("", !0) : (w(), p("div", ve, [
					m("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= A((t) => d("play", e.item), ["stop", "prevent"])
					}, [g(t, { name: "play" })]),
					g(o, {
						level: M.value,
						onCycle: G,
						onClick: r[1] ||= A(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					m("button", {
						type: "button",
						class: b(["media-card__iconbtn", { "is-active": j.value }]),
						"aria-label": j.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": j.value ? "true" : "false",
						onClick: A(Te, ["stop", "prevent"])
					}, [g(t, { name: j.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ye),
					m("button", {
						type: "button",
						class: b(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": I.value }]),
						"aria-label": I.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": I.value ? "true" : "false",
						onClick: A(K, ["stop", "prevent"])
					}, [g(t, { name: I.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, be),
					m("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= A((t) => d("info", e.item), ["stop", "prevent"])
					}, [g(t, { name: "info" })]),
					g(P, {
						open: L.value,
						"onUpdate:open": r[3] ||= (e) => L.value = e,
						items: z.value,
						onSelect: B
					}, {
						default: ee(({ toggle: e }) => [m("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							"aria-expanded": L.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: A(e, ["stop", "prevent"])
						}, [g(t, { name: "more" })], 8, xe)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (w(), p("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[4] ||= A((t) => d("match", e.item), ["stop", "prevent"])
					}, [g(t, { name: "search" })])) : f("", !0),
					D(n.$slots, "actions", { item: e.item }, void 0, !0)
				]))
			])
		]), m("div", Se, [m("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, O(e.item.name), 9, Ce), m("div", we, [e.subtitle == null ? (w(), p(s, { key: 1 }, [
			e.item.year ? (w(), p(s, { key: 0 }, [h(O(e.item.year), 1)], 64)) : f("", !0),
			e.item.year && e.item.runtime ? (w(), p(s, { key: 1 }, [h(" · ")], 64)) : f("", !0),
			e.item.runtime ? (w(), p(s, { key: 2 }, [h(O(e.item.runtime) + "m", 1)], 64)) : f("", !0)
		], 64)) : (w(), p(s, { key: 0 }, [h(O(e.subtitle), 1)], 64))])])], 32));
	}
}), [["__scopeId", "data-v-3d964330"]]);
//#endregion
export { P as a, F as i, H as n, U as r, G as t };

//# sourceMappingURL=MediaCard-DI9RXPtG.js.map