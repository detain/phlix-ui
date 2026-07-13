import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { r as n } from "./client-C0AMSEun.js";
import { t as r } from "./useAuthStore-DWTuTW8p.js";
import { i } from "./usePlayerStore-fCCh6mOw.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as o, t as s } from "./ThumbRating-DGyicxT5.js";
import { Fragment as c, Teleport as l, Transition as u, computed as d, createBlock as ee, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, nextTick as y, normalizeClass as b, normalizeStyle as x, onBeforeUnmount as S, onMounted as C, openBlock as w, ref as T, renderList as E, renderSlot as D, toDisplayString as O, unref as k, watch as A, withCtx as j, withModifiers as M } from "vue";
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
		let i = e, a = t, o = crypto.randomUUID(), s = d(() => `${o}-menu`), m = T(i.open);
		A(() => i.open, (e) => m.value = e), A(m, (e) => a("update:open", e));
		let _ = T(null), v = T(null), C = T(-1), k = T(!1), M = T({});
		function N() {
			m.value || (m.value = !0, C.value = r(i.items, "first"), y(() => {
				B(), v.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function P() {
			m.value = !1, C.value = -1, _.value?.querySelector("button,[contenteditable]")?.focus?.();
		}
		function L() {
			m.value ? P() : N();
		}
		function R(e) {
			C.value = n(i.items, C.value, e), y(() => {
				v.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" });
			});
		}
		function z(e) {
			let t = i.items[e];
			!t || t.disabled || (a("select", t, e), t.onClick?.(), P());
		}
		function B() {
			if (!_.value) return;
			let e = _.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = v.value?.offsetWidth ?? 200, i = v.value?.offsetHeight ?? 280, a = n - e.bottom;
			k.value = a < i + 4 && e.top > a;
			let o = e.left;
			o + r > t - 8 && (o = t - r - 8), o < 8 && (o = 8);
			let s = k.value ? Math.max(8, e.top - i - 4) : e.bottom + 4;
			M.value = {
				left: `${Math.round(o)}px`,
				top: `${Math.round(s)}px`
			};
		}
		function V(e) {
			m.value || (m.value = !0, C.value = r(i.items, e), y(() => {
				B(), v.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function H(e) {
			if (!m.value) {
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
					e.preventDefault(), C.value = r(i.items, "first"), y(() => v.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "End":
					e.preventDefault(), C.value = r(i.items, "last"), y(() => v.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), C.value >= 0 && z(C.value);
					break;
				case "Escape":
					e.preventDefault(), P();
					break;
				case "Tab":
					e.preventDefault(), P();
					break;
			}
		}
		function W(e) {
			m.value && _.value && v.value && !_.value.contains(e.target) && !v.value.contains(e.target) && P();
		}
		return A(m, (e) => {
			e ? document.addEventListener("pointerdown", W, !0) : document.removeEventListener("pointerdown", W, !0);
		}), S(() => {
			document.removeEventListener("pointerdown", W, !0);
		}), (t, n) => (w(), p("div", {
			ref_key: "triggerEl",
			ref: _,
			class: "phlix-menu",
			onClick: L,
			onKeydown: H
		}, [D(t.$slots, "default", {
			open: m.value,
			toggle: L,
			openMenu: N
		}, void 0, !0), (w(), ee(l, { to: "body" }, [g(u, { name: "phlix-menu" }, {
			default: j(() => [m.value ? (w(), p("div", {
				key: 0,
				id: s.value,
				ref_key: "menuEl",
				ref: v,
				class: b(["phlix-menu__list", { "is-flipped": k.value }]),
				style: x(M.value),
				role: "menu",
				onKeydown: U
			}, [(w(!0), p(c, null, E(e.items, (e, n) => (w(), p("button", {
				key: n,
				type: "button",
				class: b(["phlix-menu__item", {
					"is-active": n === C.value,
					"is-danger": e.danger,
					"is-disabled": e.disabled
				}]),
				role: "menuitem",
				tabindex: n === C.value ? 0 : -1,
				"aria-disabled": e.disabled || void 0,
				"aria-label": e.danger ? e.label + " (danger)" : e.label,
				onClick: (e) => z(n),
				onPointermove: (t) => !e.disabled && (C.value = n)
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
var te = { class: "media-card__poster" }, ne = [
	"href",
	"aria-label",
	"onClick"
], re = { class: "visually-hidden" }, ie = ["href", "aria-label"], ae = { class: "visually-hidden" }, oe = [
	"src",
	"srcset",
	"sizes",
	"alt",
	"fetchpriority"
], se = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, ce = { class: "media-card__badges" }, le = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, ue = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, de = ["aria-valuenow", "aria-label"], fe = { class: "media-card__overlay" }, pe = { class: "media-card__title" }, me = { class: "media-card__meta" }, he = {
	key: 0,
	class: "numeric"
}, ge = {
	key: 1,
	class: "media-card__dot"
}, _e = {
	key: 2,
	class: "media-card__cert"
}, ve = {
	key: 3,
	class: "media-card__dot"
}, ye = {
	key: 4,
	class: "numeric"
}, be = {
	key: 0,
	class: "media-card__genres"
}, xe = {
	key: 1,
	class: "media-card__actions"
}, Se = ["aria-label", "aria-pressed"], Ce = ["aria-label", "aria-pressed"], we = ["aria-expanded", "onClick"], Te = { class: "media-card__caption" }, Ee = ["title"], De = { class: "media-card__caption-sub numeric" }, q = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 },
		posterSrcset: {},
		posterSizes: {},
		fetchPriority: {},
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
		"remove",
		"edit-metadata",
		"explore-data"
	],
	setup(e, { emit: l }) {
		let u = e, _ = l, y = i(), S = r(), A = o(), F = v("phlixConfig", null), I = v(P, null), z = d(() => A.isFavorite(u.item.id)), B = d(() => A.likeLevel(u.item.id)), V = d(() => S.isAdmin), H = d(() => A.isWatched(u.item.id)), U = T(!1), q = d(() => u.item.type === "series" || u.item.type === "season"), Oe = d(() => (V.value, U.value ? K(u.item, {
			isAdmin: V.value,
			isWatched: H.value,
			isSeriesOrSeason: q.value,
			canChoosePoster: V.value
		}) : []));
		function ke(e) {
			let t = G, r = a();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					J();
					break;
				case t.like:
					A.setLike(u.item.id, 1, F?.apiBase ?? "");
					break;
				case t.dislike:
					A.setLike(u.item.id, -1, F?.apiBase ?? "");
					break;
				case t.addToPlaylist: {
					let e = window.prompt("Enter playlist name:");
					if (!e?.trim()) break;
					let t = e.trim();
					r.info("Creating playlist…"), n.createPlaylist(t, u.item.id).then(() => r.success("Playlist created")).catch((e) => {
						r.error("Failed to create playlist", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				}
				case t.download:
					r.info("Preparing download…"), n.getDownloadUrl(u.item.id).then(({ url: e }) => {
						window.open(e, "_blank", "noopener"), r.success("Download started");
					}).catch((e) => {
						r.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					r.info("Loading…"), n.getMissingEpisodes(u.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? r.success("No missing episodes") : r.warning(`${t} episode${t === 1 ? "" : "s"} missing`);
					}).catch((e) => {
						r.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					n.shufflePlay(u.item.id).then(() => r.success("Shuffle play started")).catch((e) => {
						r.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					_("edit-metadata", u.item);
					break;
				case t.exploreData:
					_("explore-data", u.item);
					break;
				case t.refreshMetadata:
				case t.identify:
					_("refresh", u.item);
					break;
				case t.editImages:
					_("choose-poster", u.item);
					break;
				case t.remove:
					_("remove", u.item);
					break;
				default: r.info(`${e.label} isn't available yet`);
			}
		}
		function Ae(e) {
			A.setLike(u.item.id, e, F?.apiBase ?? "");
		}
		function je() {
			A.toggleFavorite(u.item.id, F?.apiBase ?? ""), _("watchlist", u.item);
		}
		function J() {
			A.toggleWatched(u.item.id, F?.apiBase ?? ""), _("mark-watched", u.item);
		}
		let Y = d(() => u.to ?? `/app/media/${u.item.id}`), { prefetch: Me } = R();
		function Ne() {
			Me(Y.value);
		}
		let X = T(!1), Z = T(!1), Pe = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, Fe = d(() => !u.hideActions && (X.value || Z.value || Pe));
		function Ie() {
			X.value = !0, Ne();
		}
		function Le() {
			X.value = !1;
		}
		function Re() {
			Z.value = !0, Ne();
		}
		function ze(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			(!t || !n || !n.contains(t)) && (Z.value = !1);
		}
		let Q = T(!1), Be = T(null);
		function Ve() {
			Q.value = !0;
		}
		C(() => {
			Be.value?.complete && (Q.value = !0);
		});
		let He = d(() => W(u.posterSrcset ?? u.item.poster_srcset, u.posterSizes)), Ue = d(() => {
			let e = u.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= u.newWithinDays * 24 * 60 * 60 * 1e3;
		}), $ = d(() => {
			let e = y.resumePositionFor(u.item.id), t = u.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), We = d(() => u.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (w(), p("article", {
			class: "media-card",
			onPointerenter: Ie,
			onPointerleave: Le,
			onFocusin: Re,
			onFocusout: ze
		}, [m("div", te, [
			k(I) ? (w(), ee(k(N), {
				key: 0,
				to: Y.value,
				custom: ""
			}, {
				default: j(({ navigate: t }) => [m("a", {
					href: Y.value,
					class: "media-card__link",
					"aria-label": e.item.name,
					onClick: t
				}, [m("span", re, O(e.item.name), 1)], 8, ne)]),
				_: 1
			}, 8, ["to"])) : (w(), p("a", {
				key: 1,
				href: Y.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [m("span", ae, O(e.item.name), 1)], 8, ie)),
			e.item.poster_url ? (w(), p("img", {
				key: 2,
				ref_key: "imgEl",
				ref: Be,
				class: b(["media-card__img", { "is-loaded": Q.value }]),
				src: e.item.poster_url,
				srcset: He.value.srcset,
				sizes: He.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				fetchpriority: e.fetchPriority,
				onLoad: Ve
			}, null, 42, oe)) : (w(), p("div", se, [g(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			m("div", ce, [
				Ue.value ? (w(), p("span", le, "New")) : f("", !0),
				D(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (w(), p("span", ue, O(e.quality), 1)) : f("", !0)
			]),
			$.value > 0 ? (w(), p("div", {
				key: 4,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round($.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [m("i", { style: x({ width: `${$.value * 100}%` }) }, null, 4)], 8, de)) : f("", !0),
			m("div", fe, [
				m("h3", pe, O(e.item.name), 1),
				m("div", me, [
					e.item.year ? (w(), p("span", he, O(e.item.year), 1)) : f("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (w(), p("span", ge)) : f("", !0),
					e.item.rating ? (w(), p("span", _e, O(e.item.rating), 1)) : f("", !0),
					e.item.rating && e.item.runtime ? (w(), p("span", ve)) : f("", !0),
					e.item.runtime ? (w(), p("span", ye, O(e.item.runtime) + "m", 1)) : f("", !0)
				]),
				We.value.length ? (w(), p("div", be, [(w(!0), p(c, null, E(We.value, (e) => (w(), p("span", { key: e }, O(e), 1))), 128))])) : f("", !0),
				Fe.value ? (w(), p("div", xe, [m("button", {
					type: "button",
					class: "media-card__iconbtn media-card__iconbtn--play",
					"aria-label": "Play",
					onClick: r[0] ||= M((t) => _("play", e.item), ["stop", "prevent"])
				}, [g(t, { name: "play" })]), e.playOnly ? f("", !0) : (w(), p(c, { key: 0 }, [
					g(s, {
						level: B.value,
						onCycle: Ae,
						onClick: r[1] ||= M(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					m("button", {
						type: "button",
						class: b(["media-card__iconbtn", { "is-active": z.value }]),
						"aria-label": z.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": z.value ? "true" : "false",
						onClick: M(je, ["stop", "prevent"])
					}, [g(t, { name: z.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Se),
					m("button", {
						type: "button",
						class: b(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": H.value }]),
						"aria-label": H.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": H.value ? "true" : "false",
						onClick: M(J, ["stop", "prevent"])
					}, [g(t, { name: H.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Ce),
					m("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= M((t) => _("info", e.item), ["stop", "prevent"])
					}, [g(t, { name: "info" })]),
					g(L, {
						open: U.value,
						"onUpdate:open": r[3] ||= (e) => U.value = e,
						items: Oe.value,
						onSelect: ke
					}, {
						default: j(({ toggle: e }) => [m("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							"aria-expanded": U.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: M(e, ["stop", "prevent"])
						}, [g(t, { name: "more" })], 8, we)]),
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
				], 64))])) : f("", !0)
			])
		]), m("div", Te, [m("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, O(e.item.name), 9, Ee), m("div", De, [e.subtitle == null ? (w(), p(c, { key: 1 }, [
			e.item.year ? (w(), p(c, { key: 0 }, [h(O(e.item.year), 1)], 64)) : f("", !0),
			e.item.year && e.item.runtime ? (w(), p(c, { key: 1 }, [h(" · ")], 64)) : f("", !0),
			e.item.runtime ? (w(), p(c, { key: 2 }, [h(O(e.item.runtime) + "m", 1)], 64)) : f("", !0)
		], 64)) : (w(), p(c, { key: 0 }, [h(O(e.subtitle), 1)], 64))])])], 32));
	}
}), [["__scopeId", "data-v-fcc98dfb"]]);
//#endregion
export { L as a, R as i, G as n, K as r, q as t };

//# sourceMappingURL=MediaCard-BfTDb92q.js.map