import { n as e, t } from "./Icon-CkTBN_k5.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { i as r } from "./client-COHWZ2KC.js";
import { t as i } from "./useAuthStore-Bxpn4wWU.js";
import { t as ee } from "./useImageSrc-KnN1T9Ga.js";
import { i as te } from "./usePlayerStore-DhgapSoa.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { n as re, t as ie } from "./ThumbRating-DZt3qThy.js";
import { t as a } from "./Tooltip-Bi7vMBv_.js";
import { t as ae } from "./Menu-CcVQWgwT.js";
import { t as oe } from "./mediaTypeIcon-Bde251Qi.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as h, normalizeClass as g, normalizeStyle as se, onMounted as ce, openBlock as _, ref as v, renderList as le, renderSlot as y, toDisplayString as b, unref as x, withCtx as S, withModifiers as C } from "vue";
import { RouterLink as ue, routerKey as w } from "vue-router";
//#region src/composables/usePrefetch.ts
function T() {
	let e = h(w, null), t = /* @__PURE__ */ new WeakSet();
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
var E = "(max-width: 600px) 45vw, 200px";
function D(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function O(e) {
	return Number(e.toFixed(3)).toString();
}
function k(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${O(e.density)}x` : t;
}
function A(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = k(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function de(e, t) {
	let n = A(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : D(n) ? {
		srcset: n,
		sizes: E
	} : { srcset: n };
}
//#endregion
//#region src/components/mediaItemMenu.ts
var j = {
	addToPlaylist: "Add to playlist",
	markPlayed: "Mark played",
	markUnplayed: "Mark unplayed",
	download: "Download",
	missingEpisodes: "View missing episodes",
	shuffle: "Shuffle",
	matchMetadata: "Match metadata",
	editMetadata: "Edit metadata",
	editImages: "Edit images",
	exploreData: "Explore item data",
	remove: "Remove"
};
function M(e, t) {
	let n = j, r = [
		{ label: n.addToPlaylist },
		{ label: t.isWatched ? n.markUnplayed : n.markPlayed },
		{ label: n.download }
	];
	return t.isSeriesOrSeason && r.push({ label: n.missingEpisodes }), r.push({ label: n.shuffle }), t.isAdmin && (r.push({ label: n.matchMetadata }), r.push({ label: n.editMetadata }), t.canChoosePoster && r.push({ label: n.editImages }), r.push({ label: n.exploreData }), e.canDelete && r.push({
		label: n.remove,
		danger: !0
	})), r;
}
//#endregion
//#region src/components/MediaCard.vue?vue&type=script&setup=true&lang.ts
var fe = { class: "media-card__poster" }, pe = [
	"href",
	"aria-label",
	"onClick"
], me = { class: "visually-hidden" }, he = ["href", "aria-label"], ge = { class: "visually-hidden" }, _e = [
	"src",
	"srcset",
	"sizes",
	"alt",
	"loading",
	"fetchpriority"
], ve = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, N = { class: "media-card__badges" }, P = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, F = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, ye = ["aria-valuenow", "aria-label"], be = { class: "media-card__overlay" }, xe = { class: "media-card__title" }, Se = { class: "media-card__meta" }, Ce = {
	key: 0,
	class: "numeric"
}, we = {
	key: 1,
	class: "media-card__dot"
}, Te = {
	key: 2,
	class: "media-card__cert"
}, Ee = {
	key: 3,
	class: "media-card__dot"
}, De = {
	key: 4,
	class: "numeric"
}, Oe = {
	key: 0,
	class: "media-card__genres"
}, ke = {
	key: 1,
	class: "media-card__actions"
}, Ae = ["aria-label", "aria-pressed"], I = ["aria-label", "aria-pressed"], je = ["aria-expanded", "onClick"], Me = {
	key: 0,
	class: "media-card__caption"
}, Ne = ["title"], Pe = { class: "media-card__caption-sub numeric" }, L = /*#__PURE__*/ e(/* @__PURE__ */ m({
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
		subtitle: { default: null },
		hideCaption: {
			type: Boolean,
			default: !1
		},
		lazy: {
			type: Boolean,
			default: !0
		}
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
	setup(e, { emit: m }) {
		let { imgSrc: E, imgSrcset: D } = ee(), O = e, k = m, A = te(), L = i(), R = re(), z = h("phlixConfig", null), Fe = h(w, null), B = s(() => R.isFavorite(O.item.id)), Ie = s(() => R.likeLevel(O.item.id)), V = s(() => L.isAdmin), H = s(() => R.isWatched(O.item.id)), U = v(!1), Le = s(() => O.item.type === "series" || O.item.type === "season"), Re = s(() => (V.value, U.value ? M(O.item, {
			isAdmin: V.value,
			isWatched: H.value,
			isSeriesOrSeason: Le.value,
			canChoosePoster: V.value
		}) : []));
		function ze(e) {
			let t = j, i = ne();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					W();
					break;
				case t.addToPlaylist: {
					let e = window.prompt("Enter playlist name:");
					if (!e?.trim()) break;
					let t = e.trim();
					i.info("Creating playlist…"), r.createPlaylist(t, O.item.id).then(() => i.success("Playlist created")).catch((e) => {
						i.error("Failed to create playlist", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				}
				case t.download:
					i.info("Preparing download…"), r.getDownloadUrl(O.item.id).then(({ url: e }) => {
						window.open(e, "_blank", "noopener"), i.success("Download started");
					}).catch((e) => {
						i.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					i.info("Loading…"), r.getMissingEpisodes(O.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? i.success("No missing episodes") : i.warning(`${n(t, "episode", "episodes")} missing`);
					}).catch((e) => {
						i.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					r.shufflePlay(O.item.id).then(() => i.success("Shuffle play started")).catch((e) => {
						i.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					k("edit-metadata", O.item);
					break;
				case t.exploreData:
					k("explore-data", O.item);
					break;
				case t.matchMetadata:
					k("refresh", O.item);
					break;
				case t.editImages:
					k("choose-poster", O.item);
					break;
				case t.remove:
					k("remove", O.item);
					break;
				default: i.info(`${e.label} isn't available yet`);
			}
		}
		function Be(e) {
			R.setLike(O.item.id, e, z?.apiBase ?? "");
		}
		function Ve() {
			R.toggleFavorite(O.item.id, z?.apiBase ?? ""), k("watchlist", O.item);
		}
		function W() {
			R.toggleWatched(O.item.id, z?.apiBase ?? ""), k("mark-watched", O.item);
		}
		let G = s(() => O.to ?? `/app/media/${O.item.id}`), { prefetch: He } = T();
		function K() {
			He(G.value);
		}
		let q = v(!1), J = v(!1), Ue = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, We = s(() => !O.hideActions && (q.value || J.value || Ue));
		function Ge() {
			q.value = !0, K();
		}
		function Ke() {
			q.value = !1;
		}
		function qe() {
			J.value = !0, K();
		}
		function Je(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			(!t || !n || !n.contains(t)) && (J.value = !1);
		}
		let Y = v(!1), X = v(null);
		function Ye() {
			Y.value = !0;
		}
		ce(() => {
			X.value?.complete && (Y.value = !0);
		});
		let Z = s(() => de(O.posterSrcset ?? O.item.poster_srcset, O.posterSizes)), Xe = s(() => {
			let e = O.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= O.newWithinDays * 24 * 60 * 60 * 1e3;
		}), Q = s(() => {
			let e = A.resumePositionFor(O.item.id), t = O.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), $ = s(() => O.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (_(), u("article", {
			class: "media-card",
			onPointerenter: Ge,
			onPointerleave: Ke,
			onFocusin: qe,
			onFocusout: Je
		}, [d("div", fe, [
			x(Fe) ? (_(), c(x(ue), {
				key: 0,
				to: G.value,
				custom: ""
			}, {
				default: S(({ navigate: t }) => [d("a", {
					href: G.value,
					class: "media-card__link",
					"aria-label": e.item.name,
					onClick: t
				}, [d("span", me, b(e.item.name), 1)], 8, pe)]),
				_: 1
			}, 8, ["to"])) : (_(), u("a", {
				key: 1,
				href: G.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [d("span", ge, b(e.item.name), 1)], 8, he)),
			e.item.poster_url ? (_(), u("img", {
				key: 2,
				ref_key: "imgEl",
				ref: X,
				class: g(["media-card__img", { "is-loaded": Y.value }]),
				src: x(E)(e.item.poster_url),
				srcset: x(D)(Z.value.srcset),
				sizes: Z.value.sizes,
				alt: e.item.name,
				loading: e.lazy ? "lazy" : void 0,
				decoding: "async",
				fetchpriority: e.fetchPriority,
				onLoad: Ye
			}, null, 42, _e)) : (_(), u("div", ve, [p(t, { name: x(oe)(e.item.type) }, null, 8, ["name"])])),
			d("div", N, [
				Xe.value ? (_(), u("span", P, "New")) : l("", !0),
				y(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (_(), u("span", F, b(e.quality), 1)) : l("", !0)
			]),
			Q.value > 0 ? (_(), u("div", {
				key: 4,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(Q.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [d("i", { style: se({ width: `${Q.value * 100}%` }) }, null, 4)], 8, ye)) : l("", !0),
			d("div", be, [e.hideCaption ? l("", !0) : (_(), u(o, { key: 0 }, [
				d("h3", xe, b(e.item.name), 1),
				d("div", Se, [
					e.item.year ? (_(), u("span", Ce, b(e.item.year), 1)) : l("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (_(), u("span", we)) : l("", !0),
					e.item.rating ? (_(), u("span", Te, b(e.item.rating), 1)) : l("", !0),
					e.item.rating && e.item.runtime ? (_(), u("span", Ee)) : l("", !0),
					e.item.runtime ? (_(), u("span", De, b(e.item.runtime) + "m", 1)) : l("", !0)
				]),
				$.value.length ? (_(), u("div", Oe, [(_(!0), u(o, null, le($.value, (e) => (_(), u("span", { key: e }, b(e), 1))), 128))])) : l("", !0)
			], 64)), We.value ? (_(), u("div", ke, [p(a, { text: "Play" }, {
				default: S(() => [d("button", {
					type: "button",
					class: "media-card__iconbtn media-card__iconbtn--play",
					"aria-label": "Play",
					onClick: r[0] ||= C((t) => k("play", e.item), ["stop", "prevent"])
				}, [p(t, { name: "play" })])]),
				_: 1
			}), e.playOnly ? l("", !0) : (_(), u(o, { key: 0 }, [
				p(ie, {
					level: Ie.value,
					onCycle: Be,
					onClick: r[1] ||= C(() => {}, ["stop", "prevent"])
				}, null, 8, ["level"]),
				p(a, { text: B.value ? "Remove from favorites" : "Add to favorites" }, {
					default: S(() => [d("button", {
						type: "button",
						class: g(["media-card__iconbtn", { "is-active": B.value }]),
						"aria-label": B.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": B.value ? "true" : "false",
						onClick: C(Ve, ["stop", "prevent"])
					}, [p(t, { name: B.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Ae)]),
					_: 1
				}, 8, ["text"]),
				p(a, { text: H.value ? "Mark as unwatched" : "Mark as watched" }, {
					default: S(() => [d("button", {
						type: "button",
						class: g(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": H.value }]),
						"aria-label": H.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": H.value ? "true" : "false",
						onClick: C(W, ["stop", "prevent"])
					}, [p(t, { name: H.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, I)]),
					_: 1
				}, 8, ["text"]),
				p(a, { text: "More info" }, {
					default: S(() => [d("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= C((t) => k("info", e.item), ["stop", "prevent"])
					}, [p(t, { name: "info" })])]),
					_: 1
				}),
				p(ae, {
					open: U.value,
					"onUpdate:open": r[3] ||= (e) => U.value = e,
					items: Re.value,
					onSelect: ze
				}, {
					default: S(({ toggle: e }) => [p(a, { text: "More actions" }, {
						default: S(() => [d("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							"aria-expanded": U.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: C(e, ["stop", "prevent"])
						}, [p(t, { name: "more" })], 8, je)]),
						_: 2
					}, 1024)]),
					_: 1
				}, 8, ["open", "items"]),
				e.canMatch ? (_(), c(a, {
					key: 0,
					text: "Match metadata"
				}, {
					default: S(() => [d("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[4] ||= C((t) => k("match", e.item), ["stop", "prevent"])
					}, [p(t, { name: "search" })])]),
					_: 1
				})) : l("", !0),
				y(n.$slots, "actions", { item: e.item }, void 0, !0)
			], 64))])) : l("", !0)])
		]), e.hideCaption ? l("", !0) : (_(), u("div", Me, [d("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, b(e.item.name), 9, Ne), d("div", Pe, [e.subtitle == null ? (_(), u(o, { key: 1 }, [
			e.item.year ? (_(), u(o, { key: 0 }, [f(b(e.item.year), 1)], 64)) : l("", !0),
			e.item.year && e.item.runtime ? (_(), u(o, { key: 1 }, [f(" · ")], 64)) : l("", !0),
			e.item.runtime ? (_(), u(o, { key: 2 }, [f(b(e.item.runtime) + "m", 1)], 64)) : l("", !0)
		], 64)) : (_(), u(o, { key: 0 }, [f(b(e.subtitle), 1)], 64))])]))], 32));
	}
}), [["__scopeId", "data-v-bac2ae63"]]);
//#endregion
export { T as i, j as n, M as r, L as t };

//# sourceMappingURL=MediaCard-H65JFCcC.js.map