import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-C0x49DFi.js";
import { t as n } from "./useAuthStore-CAHTCZvf.js";
import { o as r } from "./media-query-BdY2RILB.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { n as a, t as o } from "./ThumbRating-Da67Lpax.js";
import { Fragment as s, Teleport as c, Transition as l, computed as u, createBlock as ee, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, nextTick as v, normalizeClass as y, normalizeStyle as b, onBeforeUnmount as x, onMounted as S, openBlock as C, ref as w, renderList as T, renderSlot as E, toDisplayString as D, unref as O, watch as k, withCtx as A, withModifiers as j } from "vue";
import { RouterLink as M, routerKey as N } from "vue-router";
//#region src/components/ui/Menu.vue?vue&type=script&setup=true&lang.ts
var P = ["id"], F = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"onClick",
	"onPointermove"
], I = /*#__PURE__*/ e(/* @__PURE__ */ g({
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
		let i = e, a = t, o = crypto.randomUUID(), p = u(() => `${o}-menu`), g = w(i.open);
		k(() => i.open, (e) => g.value = e), k(g, (e) => a("update:open", e));
		let _ = w(null), S = w(null), O = w(-1), j = w(!1), M = w({});
		function N() {
			g.value || (g.value = !0, O.value = r(i.items, "first"), v(() => {
				B(), S.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function I() {
			g.value = !1, O.value = -1, _.value?.querySelector("button,[contenteditable]")?.focus?.();
		}
		function L() {
			g.value ? I() : N();
		}
		function R(e) {
			O.value = n(i.items, O.value, e), v(() => {
				S.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" });
			});
		}
		function z(e) {
			let t = i.items[e];
			!t || t.disabled || (a("select", t, e), t.onClick?.(), I());
		}
		function B() {
			if (!_.value) return;
			let e = _.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = S.value?.offsetWidth ?? 200, i = S.value?.offsetHeight ?? 280, a = n - e.bottom;
			j.value = a < i + 4 && e.top > a;
			let o = e.left;
			o + r > t - 8 && (o = t - r - 8), o < 8 && (o = 8);
			let s = j.value ? Math.max(8, e.top - i - 4) : e.bottom + 4;
			M.value = {
				left: `${Math.round(o)}px`,
				top: `${Math.round(s)}px`
			};
		}
		function V(e) {
			g.value || (g.value = !0, O.value = r(i.items, e), v(() => {
				B(), S.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function H(e) {
			if (!g.value) {
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
					e.preventDefault(), O.value = r(i.items, "first"), v(() => S.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "End":
					e.preventDefault(), O.value = r(i.items, "last"), v(() => S.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), O.value >= 0 && z(O.value);
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
			g.value && _.value && S.value && !_.value.contains(e.target) && !S.value.contains(e.target) && I();
		}
		return k(g, (e) => {
			e ? document.addEventListener("pointerdown", W, !0) : document.removeEventListener("pointerdown", W, !0);
		}), x(() => {
			document.removeEventListener("pointerdown", W, !0);
		}), (t, n) => (C(), f("div", {
			ref_key: "triggerEl",
			ref: _,
			class: "phlix-menu",
			onClick: L,
			onKeydown: H
		}, [E(t.$slots, "default", {
			open: g.value,
			toggle: L,
			openMenu: N
		}, void 0, !0), (C(), ee(c, { to: "body" }, [h(l, { name: "phlix-menu" }, {
			default: A(() => [g.value ? (C(), f("div", {
				key: 0,
				id: p.value,
				ref_key: "menuEl",
				ref: S,
				class: y(["phlix-menu__list", { "is-flipped": j.value }]),
				style: b(M.value),
				role: "menu",
				onKeydown: U
			}, [(C(!0), f(s, null, T(e.items, (e, n) => (C(), f("button", {
				key: n,
				type: "button",
				class: y(["phlix-menu__item", {
					"is-active": n === O.value,
					"is-danger": e.danger,
					"is-disabled": e.disabled
				}]),
				role: "menuitem",
				tabindex: n === O.value ? 0 : -1,
				"aria-disabled": e.disabled || void 0,
				"aria-label": e.danger ? e.label + " (danger)" : e.label,
				onClick: (e) => z(n),
				onPointermove: (t) => !e.disabled && (O.value = n)
			}, [E(t.$slots, "item", {
				item: e,
				index: n
			}, () => [m(D(e.label), 1)], !0)], 42, F))), 128))], 46, P)) : d("", !0)]),
			_: 3
		})]))], 544));
	}
}), [["__scopeId", "data-v-53e3f39d"]]);
//#endregion
//#region src/composables/usePrefetch.ts
function L() {
	let e = _(N, null), t = /* @__PURE__ */ new WeakSet();
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
var R = "(max-width: 600px) 45vw, 200px";
function z(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function B(e) {
	return Number(e.toFixed(3)).toString();
}
function V(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${B(e.density)}x` : t;
}
function H(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = V(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function U(e, t) {
	let n = H(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : z(n) ? {
		srcset: n,
		sizes: R
	} : { srcset: n };
}
//#endregion
//#region src/components/mediaItemMenu.ts
var W = {
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
function te(e, t) {
	let n = W, r = [
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
var ne = { class: "media-card__poster" }, re = [
	"href",
	"aria-label",
	"onClick"
], ie = { class: "visually-hidden" }, ae = ["href", "aria-label"], oe = { class: "visually-hidden" }, se = [
	"src",
	"srcset",
	"sizes",
	"alt"
], ce = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, le = { class: "media-card__badges" }, ue = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, de = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, fe = ["aria-valuenow", "aria-label"], pe = { class: "media-card__overlay" }, me = { class: "media-card__title" }, he = { class: "media-card__meta" }, ge = {
	key: 0,
	class: "numeric"
}, _e = {
	key: 1,
	class: "media-card__dot"
}, ve = {
	key: 2,
	class: "media-card__cert"
}, ye = {
	key: 3,
	class: "media-card__dot"
}, be = {
	key: 4,
	class: "numeric"
}, xe = {
	key: 0,
	class: "media-card__genres"
}, Se = {
	key: 1,
	class: "media-card__actions"
}, Ce = ["aria-label", "aria-pressed"], we = ["aria-label", "aria-pressed"], Te = ["aria-expanded", "onClick"], Ee = { class: "media-card__caption" }, De = ["title"], Oe = { class: "media-card__caption-sub numeric" }, G = /*#__PURE__*/ e(/* @__PURE__ */ g({
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
		let l = e, g = c, v = r(), x = n(), k = a(), P = _("phlixConfig", null), F = _(N, null), R = u(() => k.isFavorite(l.item.id)), z = u(() => k.likeLevel(l.item.id)), B = u(() => x.isAdmin), V = u(() => k.isWatched(l.item.id)), H = w(!1), G = w(!1), K = w(!1), ke = u(() => l.item.type === "series" || l.item.type === "season"), Ae = u(() => (B.value, H.value ? te(l.item, {
			isAdmin: B.value,
			isWatched: V.value,
			isSeriesOrSeason: ke.value,
			canChoosePoster: B.value
		}) : []));
		function je(e) {
			let t = W;
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					q();
					break;
				case t.like:
					k.setLike(l.item.id, 1, P?.apiBase ?? "");
					break;
				case t.dislike:
					k.setLike(l.item.id, -1, P?.apiBase ?? "");
					break;
				case t.refreshMetadata:
				case t.identify:
					g("refresh", l.item);
					break;
				case t.editImages:
					g("choose-poster", l.item);
					break;
				case t.remove:
					g("remove", l.item);
					break;
				default: i().info(`${e.label} isn't available yet`);
			}
		}
		function Me(e) {
			k.setLike(l.item.id, e, P?.apiBase ?? "");
		}
		function Ne() {
			k.toggleFavorite(l.item.id, P?.apiBase ?? ""), g("watchlist", l.item);
		}
		function q() {
			k.toggleWatched(l.item.id, P?.apiBase ?? ""), g("mark-watched", l.item);
		}
		let J = u(() => l.to ?? `/app/media/${l.item.id}`), { prefetch: Pe } = L();
		function Y() {
			Pe(J.value);
		}
		let X = w(!1), Z = w(null);
		function Fe() {
			X.value = !0;
		}
		S(() => {
			Z.value?.complete && (X.value = !0);
		});
		let Ie = u(() => U(l.posterSrcset ?? l.item.poster_srcset, l.posterSizes)), Le = u(() => {
			let e = l.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= l.newWithinDays * 24 * 60 * 60 * 1e3;
		}), Q = u(() => {
			let e = v.resumePositionFor(l.item.id), t = l.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), $ = u(() => l.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (C(), f("article", {
			class: "media-card",
			onPointerenter: r[5] ||= (e) => {
				G.value = !0, Y();
			},
			onPointerleave: r[6] ||= (e) => G.value = !1,
			onFocusin: r[7] ||= (e) => {
				K.value = !0, Y();
			},
			onFocusout: r[8] ||= (e) => K.value = !1
		}, [p("div", ne, [
			O(F) ? (C(), ee(O(M), {
				key: 0,
				to: J.value,
				custom: ""
			}, {
				default: A(({ navigate: t }) => [p("a", {
					href: J.value,
					class: "media-card__link",
					"aria-label": e.item.name,
					onClick: j(t, ["prevent"])
				}, [p("span", ie, D(e.item.name), 1)], 8, re)]),
				_: 1
			}, 8, ["to"])) : (C(), f("a", {
				key: 1,
				href: J.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [p("span", oe, D(e.item.name), 1)], 8, ae)),
			e.item.poster_url ? (C(), f("img", {
				key: 2,
				ref_key: "imgEl",
				ref: Z,
				class: y(["media-card__img", { "is-loaded": X.value }]),
				src: e.item.poster_url,
				srcset: Ie.value.srcset,
				sizes: Ie.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: Fe
			}, null, 42, se)) : (C(), f("div", ce, [h(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			p("div", le, [
				Le.value ? (C(), f("span", ue, "New")) : d("", !0),
				E(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (C(), f("span", de, D(e.quality), 1)) : d("", !0)
			]),
			Q.value > 0 ? (C(), f("div", {
				key: 4,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(Q.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [p("i", { style: b({ width: `${Q.value * 100}%` }) }, null, 4)], 8, fe)) : d("", !0),
			p("div", pe, [
				p("h3", me, D(e.item.name), 1),
				p("div", he, [
					e.item.year ? (C(), f("span", ge, D(e.item.year), 1)) : d("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (C(), f("span", _e)) : d("", !0),
					e.item.rating ? (C(), f("span", ve, D(e.item.rating), 1)) : d("", !0),
					e.item.rating && e.item.runtime ? (C(), f("span", ye)) : d("", !0),
					e.item.runtime ? (C(), f("span", be, D(e.item.runtime) + "m", 1)) : d("", !0)
				]),
				$.value.length ? (C(), f("div", xe, [(C(!0), f(s, null, T($.value, (e) => (C(), f("span", { key: e }, D(e), 1))), 128))])) : d("", !0),
				!e.hideActions && (G.value || K.value) ? (C(), f("div", Se, [p("button", {
					type: "button",
					class: "media-card__iconbtn media-card__iconbtn--play",
					"aria-label": "Play",
					onClick: r[0] ||= j((t) => g("play", e.item), ["stop", "prevent"])
				}, [h(t, { name: "play" })]), e.playOnly ? d("", !0) : (C(), f(s, { key: 0 }, [
					h(o, {
						level: z.value,
						onCycle: Me,
						onClick: r[1] ||= j(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					p("button", {
						type: "button",
						class: y(["media-card__iconbtn", { "is-active": R.value }]),
						"aria-label": R.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": R.value ? "true" : "false",
						onClick: j(Ne, ["stop", "prevent"])
					}, [h(t, { name: R.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Ce),
					p("button", {
						type: "button",
						class: y(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": V.value }]),
						"aria-label": V.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": V.value ? "true" : "false",
						onClick: j(q, ["stop", "prevent"])
					}, [h(t, { name: V.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, we),
					p("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= j((t) => g("info", e.item), ["stop", "prevent"])
					}, [h(t, { name: "info" })]),
					h(I, {
						open: H.value,
						"onUpdate:open": r[3] ||= (e) => H.value = e,
						items: Ae.value,
						onSelect: je
					}, {
						default: A(({ toggle: e }) => [p("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							"aria-expanded": H.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: j(e, ["stop", "prevent"])
						}, [h(t, { name: "more" })], 8, Te)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (C(), f("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[4] ||= j((t) => g("match", e.item), ["stop", "prevent"])
					}, [h(t, { name: "search" })])) : d("", !0),
					E(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : d("", !0)
			])
		]), p("div", Ee, [p("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, D(e.item.name), 9, De), p("div", Oe, [e.subtitle == null ? (C(), f(s, { key: 1 }, [
			e.item.year ? (C(), f(s, { key: 0 }, [m(D(e.item.year), 1)], 64)) : d("", !0),
			e.item.year && e.item.runtime ? (C(), f(s, { key: 1 }, [m(" · ")], 64)) : d("", !0),
			e.item.runtime ? (C(), f(s, { key: 2 }, [m(D(e.item.runtime) + "m", 1)], 64)) : d("", !0)
		], 64)) : (C(), f(s, { key: 0 }, [m(D(e.subtitle), 1)], 64))])])], 32));
	}
}), [["__scopeId", "data-v-4fb4b173"]]);
//#endregion
export { I as a, L as i, W as n, te as r, G as t };

//# sourceMappingURL=MediaCard-DBCDtyDU.js.map