import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as n } from "./useAuthStore-BoiyS0RI.js";
import { o as r } from "./media-query-IVKvZvWX.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { n as a, t as o } from "./ThumbRating-BJEUrMHi.js";
import { Fragment as s, Teleport as c, Transition as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, nextTick as y, normalizeClass as b, normalizeStyle as x, onBeforeUnmount as S, onMounted as C, openBlock as w, ref as T, renderList as E, renderSlot as D, toDisplayString as O, unref as k, watch as A, withCtx as j, withModifiers as M } from "vue";
import { RouterLink as N, routerKey as P } from "vue-router";
//#region src/components/ui/Menu.vue?vue&type=script&setup=true&lang.ts
var F = ["id"], I = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"onClick",
	"onPointermove"
], L = /*#__PURE__*/ e(/* @__PURE__ */ _({
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
		A(() => i.open, (e) => _.value = e), A(_, (e) => a("update:open", e));
		let v = T(null), C = T(null), k = T(-1), M = T(!1), N = T({});
		function P() {
			_.value || (_.value = !0, k.value = r(i.items, "first"), y(() => {
				V(), C.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function L() {
			_.value = !1, k.value = -1, v.value?.querySelector("button,[contenteditable]")?.focus?.();
		}
		function R() {
			_.value ? L() : P();
		}
		function z(e) {
			k.value = n(i.items, k.value, e), y(() => {
				C.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" });
			});
		}
		function B(e) {
			let t = i.items[e];
			!t || t.disabled || (a("select", t, e), t.onClick?.(), L());
		}
		function V() {
			if (!v.value) return;
			let e = v.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = C.value?.offsetWidth ?? 200, i = C.value?.offsetHeight ?? 280, a = n - e.bottom;
			M.value = a < i + 4 && e.top > a;
			let o = e.left;
			o + r > t - 8 && (o = t - r - 8), o < 8 && (o = 8);
			let s = M.value ? Math.max(8, e.top - i - 4) : e.bottom + 4;
			N.value = {
				left: `${Math.round(o)}px`,
				top: `${Math.round(s)}px`
			};
		}
		function H(e) {
			_.value || (_.value = !0, k.value = r(i.items, e), y(() => {
				V(), C.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function U(e) {
			if (!_.value) {
				if (e.key === "ArrowDown") {
					e.preventDefault(), H("first");
					return;
				}
				if (e.key === "ArrowUp") {
					e.preventDefault(), H("last");
					return;
				}
				return;
			}
			W(e);
		}
		function W(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), z(1);
					break;
				case "ArrowUp":
					e.preventDefault(), z(-1);
					break;
				case "Home":
					e.preventDefault(), k.value = r(i.items, "first"), y(() => C.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "End":
					e.preventDefault(), k.value = r(i.items, "last"), y(() => C.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), k.value >= 0 && B(k.value);
					break;
				case "Escape":
					e.preventDefault(), L();
					break;
				case "Tab":
					e.preventDefault(), L();
					break;
			}
		}
		function G(e) {
			_.value && v.value && C.value && !v.value.contains(e.target) && !C.value.contains(e.target) && L();
		}
		return A(_, (e) => {
			e ? document.addEventListener("pointerdown", G, !0) : document.removeEventListener("pointerdown", G, !0);
		}), S(() => {
			document.removeEventListener("pointerdown", G, !0);
		}), (t, n) => (w(), p("div", {
			ref_key: "triggerEl",
			ref: v,
			class: "phlix-menu",
			onClick: R,
			onKeydown: U
		}, [D(t.$slots, "default", {
			open: _.value,
			toggle: R,
			openMenu: P
		}, void 0, !0), (w(), d(c, { to: "body" }, [g(l, { name: "phlix-menu" }, {
			default: j(() => [_.value ? (w(), p("div", {
				key: 0,
				id: m.value,
				ref_key: "menuEl",
				ref: C,
				class: b(["phlix-menu__list", { "is-flipped": M.value }]),
				style: x(N.value),
				role: "menu",
				onKeydown: W
			}, [(w(!0), p(s, null, E(e.items, (e, n) => (w(), p("button", {
				key: n,
				type: "button",
				class: b(["phlix-menu__item", {
					"is-active": n === k.value,
					"is-danger": e.danger,
					"is-disabled": e.disabled
				}]),
				role: "menuitem",
				tabindex: n === k.value ? 0 : -1,
				"aria-disabled": e.disabled || void 0,
				"aria-label": e.danger ? e.label + " (danger)" : e.label,
				onClick: (e) => B(n),
				onPointermove: (t) => !e.disabled && (k.value = n)
			}, [D(t.$slots, "item", {
				item: e,
				index: n
			}, () => [h(O(e.label), 1)], !0)], 42, I))), 128))], 46, F)) : f("", !0)]),
			_: 3
		})]))], 544));
	}
}), [["__scopeId", "data-v-53e3f39d"]]);
//#endregion
//#region src/composables/usePrefetch.ts
function R() {
	let e = v(P, null), t = /* @__PURE__ */ new WeakSet();
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
var z = "(max-width: 600px) 45vw, 200px";
function B(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function V(e) {
	return Number(e.toFixed(3)).toString();
}
function H(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${V(e.density)}x` : t;
}
function U(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = H(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function W(e, t) {
	let n = U(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : B(n) ? {
		srcset: n,
		sizes: z
	} : { srcset: n };
}
//#endregion
//#region src/components/mediaItemMenu.ts
var G = {
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
function K(e, t) {
	let n = G, r = [
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
var ee = { class: "media-card__poster" }, te = [
	"href",
	"aria-label",
	"onClick"
], ne = { class: "visually-hidden" }, re = ["href", "aria-label"], ie = { class: "visually-hidden" }, ae = [
	"src",
	"srcset",
	"sizes",
	"alt"
], oe = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, se = { class: "media-card__badges" }, ce = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, le = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, ue = ["aria-valuenow", "aria-label"], de = { class: "media-card__overlay" }, fe = { class: "media-card__title" }, pe = { class: "media-card__meta" }, me = {
	key: 0,
	class: "numeric"
}, he = {
	key: 1,
	class: "media-card__dot"
}, ge = {
	key: 2,
	class: "media-card__cert"
}, _e = {
	key: 3,
	class: "media-card__dot"
}, ve = {
	key: 4,
	class: "numeric"
}, ye = {
	key: 0,
	class: "media-card__genres"
}, be = {
	key: 1,
	class: "media-card__actions"
}, xe = ["aria-label", "aria-pressed"], Se = ["aria-label", "aria-pressed"], Ce = ["aria-expanded", "onClick"], we = { class: "media-card__caption" }, Te = ["title"], Ee = { class: "media-card__caption-sub numeric" }, q = /*#__PURE__*/ e(/* @__PURE__ */ _({
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
		playOnly: {
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
		let l = e, _ = c, y = r(), S = n(), A = a(), F = v("phlixConfig", null), I = v(P, null), z = u(() => A.isFavorite(l.item.id)), B = u(() => A.likeLevel(l.item.id)), V = u(() => S.isAdmin), H = u(() => A.isWatched(l.item.id)), U = T(!1), q = u(() => l.item.type === "series" || l.item.type === "season"), De = u(() => K(l.item, {
			isAdmin: V.value,
			isWatched: H.value,
			isSeriesOrSeason: q.value,
			canChoosePoster: V.value
		}));
		function Oe(e) {
			let t = G;
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					J();
					break;
				case t.like:
					A.setLike(l.item.id, 1, F?.apiBase ?? "");
					break;
				case t.dislike:
					A.setLike(l.item.id, -1, F?.apiBase ?? "");
					break;
				case t.refreshMetadata:
				case t.identify:
					_("refresh", l.item);
					break;
				case t.editImages:
					_("choose-poster", l.item);
					break;
				case t.remove:
					_("remove", l.item);
					break;
				default: i().info(`${e.label} isn't available yet`);
			}
		}
		function ke(e) {
			A.setLike(l.item.id, e, F?.apiBase ?? "");
		}
		function Ae() {
			A.toggleFavorite(l.item.id, F?.apiBase ?? ""), _("watchlist", l.item);
		}
		function J() {
			A.toggleWatched(l.item.id, F?.apiBase ?? ""), _("mark-watched", l.item);
		}
		let Y = u(() => l.to ?? `/app/media/${l.item.id}`), { prefetch: je } = R();
		function X() {
			je(Y.value);
		}
		let Z = T(!1), Q = T(null);
		function Me() {
			Z.value = !0;
		}
		C(() => {
			Q.value?.complete && (Z.value = !0);
		});
		let Ne = u(() => W(l.posterSrcset ?? l.item.poster_srcset, l.posterSizes)), Pe = u(() => {
			let e = l.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= l.newWithinDays * 24 * 60 * 60 * 1e3;
		}), $ = u(() => {
			let e = y.resumePositionFor(l.item.id), t = l.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), Fe = u(() => l.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (w(), p("article", {
			class: "media-card",
			onPointerenter: X,
			onFocusin: X
		}, [m("div", ee, [
			k(I) ? (w(), d(k(N), {
				key: 0,
				to: Y.value,
				custom: ""
			}, {
				default: j(({ navigate: t }) => [m("a", {
					href: Y.value,
					class: "media-card__link",
					"aria-label": e.item.name,
					onClick: M(t, ["prevent"])
				}, [m("span", ne, O(e.item.name), 1)], 8, te)]),
				_: 1
			}, 8, ["to"])) : (w(), p("a", {
				key: 1,
				href: Y.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [m("span", ie, O(e.item.name), 1)], 8, re)),
			e.item.poster_url ? (w(), p("img", {
				key: 2,
				ref_key: "imgEl",
				ref: Q,
				class: b(["media-card__img", { "is-loaded": Z.value }]),
				src: e.item.poster_url,
				srcset: Ne.value.srcset,
				sizes: Ne.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: Me
			}, null, 42, ae)) : (w(), p("div", oe, [g(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			m("div", se, [
				Pe.value ? (w(), p("span", ce, "New")) : f("", !0),
				D(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (w(), p("span", le, O(e.quality), 1)) : f("", !0)
			]),
			$.value > 0 ? (w(), p("div", {
				key: 4,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round($.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [m("i", { style: x({ width: `${$.value * 100}%` }) }, null, 4)], 8, ue)) : f("", !0),
			m("div", de, [
				m("h3", fe, O(e.item.name), 1),
				m("div", pe, [
					e.item.year ? (w(), p("span", me, O(e.item.year), 1)) : f("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (w(), p("span", he)) : f("", !0),
					e.item.rating ? (w(), p("span", ge, O(e.item.rating), 1)) : f("", !0),
					e.item.rating && e.item.runtime ? (w(), p("span", _e)) : f("", !0),
					e.item.runtime ? (w(), p("span", ve, O(e.item.runtime) + "m", 1)) : f("", !0)
				]),
				Fe.value.length ? (w(), p("div", ye, [(w(!0), p(s, null, E(Fe.value, (e) => (w(), p("span", { key: e }, O(e), 1))), 128))])) : f("", !0),
				e.hideActions ? f("", !0) : (w(), p("div", be, [m("button", {
					type: "button",
					class: "media-card__iconbtn media-card__iconbtn--play",
					"aria-label": "Play",
					onClick: r[0] ||= M((t) => _("play", e.item), ["stop", "prevent"])
				}, [g(t, { name: "play" })]), e.playOnly ? f("", !0) : (w(), p(s, { key: 0 }, [
					g(o, {
						level: B.value,
						onCycle: ke,
						onClick: r[1] ||= M(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					m("button", {
						type: "button",
						class: b(["media-card__iconbtn", { "is-active": z.value }]),
						"aria-label": z.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": z.value ? "true" : "false",
						onClick: M(Ae, ["stop", "prevent"])
					}, [g(t, { name: z.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, xe),
					m("button", {
						type: "button",
						class: b(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": H.value }]),
						"aria-label": H.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": H.value ? "true" : "false",
						onClick: M(J, ["stop", "prevent"])
					}, [g(t, { name: H.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Se),
					m("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= M((t) => _("info", e.item), ["stop", "prevent"])
					}, [g(t, { name: "info" })]),
					g(L, {
						open: U.value,
						"onUpdate:open": r[3] ||= (e) => U.value = e,
						items: De.value,
						onSelect: Oe
					}, {
						default: j(({ toggle: e }) => [m("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							"aria-expanded": U.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: M(e, ["stop", "prevent"])
						}, [g(t, { name: "more" })], 8, Ce)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (w(), p("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[4] ||= M((t) => _("match", e.item), ["stop", "prevent"])
					}, [g(t, { name: "search" })])) : f("", !0),
					D(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))]))
			])
		]), m("div", we, [m("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, O(e.item.name), 9, Te), m("div", Ee, [e.subtitle == null ? (w(), p(s, { key: 1 }, [
			e.item.year ? (w(), p(s, { key: 0 }, [h(O(e.item.year), 1)], 64)) : f("", !0),
			e.item.year && e.item.runtime ? (w(), p(s, { key: 1 }, [h(" · ")], 64)) : f("", !0),
			e.item.runtime ? (w(), p(s, { key: 2 }, [h(O(e.item.runtime) + "m", 1)], 64)) : f("", !0)
		], 64)) : (w(), p(s, { key: 0 }, [h(O(e.subtitle), 1)], 64))])])], 32));
	}
}), [["__scopeId", "data-v-c958a71a"]]);
//#endregion
export { L as a, R as i, G as n, K as r, q as t };

//# sourceMappingURL=MediaCard-B_cPvcUh.js.map