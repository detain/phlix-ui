import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { r as n } from "./client-BzWwyWKr.js";
import { t as r } from "./useAuthStore-Ds0NVhBP.js";
import { i as ee } from "./usePlayerStore-Dgw0JCWb.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { n as ne, t as re } from "./ThumbRating-BxiWuYAs.js";
import { t as i } from "./Tooltip-9gdTmuk6.js";
import { t as ie } from "./Menu-DRkKveJV.js";
import { t as ae } from "./mediaTypeIcon-Bde251Qi.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as m, normalizeClass as h, normalizeStyle as oe, onMounted as se, openBlock as g, ref as _, renderList as ce, renderSlot as v, toDisplayString as y, unref as b, withCtx as x, withModifiers as S } from "vue";
import { RouterLink as C, routerKey as w } from "vue-router";
//#region src/composables/usePrefetch.ts
function T() {
	let e = m(w, null), t = /* @__PURE__ */ new WeakSet();
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
function le(e, t) {
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
var ue = { class: "media-card__poster" }, de = [
	"href",
	"aria-label",
	"onClick"
], fe = { class: "visually-hidden" }, pe = ["href", "aria-label"], me = { class: "visually-hidden" }, he = [
	"src",
	"srcset",
	"sizes",
	"alt",
	"loading",
	"fetchpriority"
], N = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, P = { class: "media-card__badges" }, F = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, I = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, L = ["aria-valuenow", "aria-label"], R = { class: "media-card__overlay" }, ge = { class: "media-card__title" }, _e = { class: "media-card__meta" }, ve = {
	key: 0,
	class: "numeric"
}, ye = {
	key: 1,
	class: "media-card__dot"
}, be = {
	key: 2,
	class: "media-card__cert"
}, xe = {
	key: 3,
	class: "media-card__dot"
}, Se = {
	key: 4,
	class: "numeric"
}, Ce = {
	key: 0,
	class: "media-card__genres"
}, we = {
	key: 1,
	class: "media-card__actions"
}, Te = ["aria-label", "aria-pressed"], Ee = ["aria-label", "aria-pressed"], De = ["aria-expanded", "onClick"], Oe = { class: "media-card__caption" }, ke = ["title"], Ae = { class: "media-card__caption-sub numeric" }, z = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
	setup(e, { emit: p }) {
		let E = e, D = p, O = ee(), k = r(), A = ne(), z = m("phlixConfig", null), je = m(w, null), B = o(() => A.isFavorite(E.item.id)), Me = o(() => A.likeLevel(E.item.id)), V = o(() => k.isAdmin), H = o(() => A.isWatched(E.item.id)), U = _(!1), Ne = o(() => E.item.type === "series" || E.item.type === "season"), Pe = o(() => (V.value, U.value ? M(E.item, {
			isAdmin: V.value,
			isWatched: H.value,
			isSeriesOrSeason: Ne.value,
			canChoosePoster: V.value
		}) : []));
		function Fe(e) {
			let t = j, r = te();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					W();
					break;
				case t.addToPlaylist: {
					let e = window.prompt("Enter playlist name:");
					if (!e?.trim()) break;
					let t = e.trim();
					r.info("Creating playlist…"), n.createPlaylist(t, E.item.id).then(() => r.success("Playlist created")).catch((e) => {
						r.error("Failed to create playlist", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				}
				case t.download:
					r.info("Preparing download…"), n.getDownloadUrl(E.item.id).then(({ url: e }) => {
						window.open(e, "_blank", "noopener"), r.success("Download started");
					}).catch((e) => {
						r.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					r.info("Loading…"), n.getMissingEpisodes(E.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? r.success("No missing episodes") : r.warning(`${t} episode${t === 1 ? "" : "s"} missing`);
					}).catch((e) => {
						r.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					n.shufflePlay(E.item.id).then(() => r.success("Shuffle play started")).catch((e) => {
						r.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					D("edit-metadata", E.item);
					break;
				case t.exploreData:
					D("explore-data", E.item);
					break;
				case t.matchMetadata:
					D("refresh", E.item);
					break;
				case t.editImages:
					D("choose-poster", E.item);
					break;
				case t.remove:
					D("remove", E.item);
					break;
				default: r.info(`${e.label} isn't available yet`);
			}
		}
		function Ie(e) {
			A.setLike(E.item.id, e, z?.apiBase ?? "");
		}
		function Le() {
			A.toggleFavorite(E.item.id, z?.apiBase ?? ""), D("watchlist", E.item);
		}
		function W() {
			A.toggleWatched(E.item.id, z?.apiBase ?? ""), D("mark-watched", E.item);
		}
		let G = o(() => E.to ?? `/app/media/${E.item.id}`), { prefetch: Re } = T();
		function K() {
			Re(G.value);
		}
		let q = _(!1), J = _(!1), ze = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, Be = o(() => !E.hideActions && (q.value || J.value || ze));
		function Ve() {
			q.value = !0, K();
		}
		function He() {
			q.value = !1;
		}
		function Ue() {
			J.value = !0, K();
		}
		function We(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			(!t || !n || !n.contains(t)) && (J.value = !1);
		}
		let Y = _(!1), X = _(null);
		function Ge() {
			Y.value = !0;
		}
		se(() => {
			X.value?.complete && (Y.value = !0);
		});
		let Z = o(() => le(E.posterSrcset ?? E.item.poster_srcset, E.posterSizes)), Ke = o(() => {
			let e = E.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= E.newWithinDays * 24 * 60 * 60 * 1e3;
		}), Q = o(() => {
			let e = O.resumePositionFor(E.item.id), t = E.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), $ = o(() => E.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (g(), l("article", {
			class: "media-card",
			onPointerenter: Ve,
			onPointerleave: He,
			onFocusin: Ue,
			onFocusout: We
		}, [u("div", ue, [
			b(je) ? (g(), s(b(C), {
				key: 0,
				to: G.value,
				custom: ""
			}, {
				default: x(({ navigate: t }) => [u("a", {
					href: G.value,
					class: "media-card__link",
					"aria-label": e.item.name,
					onClick: t
				}, [u("span", fe, y(e.item.name), 1)], 8, de)]),
				_: 1
			}, 8, ["to"])) : (g(), l("a", {
				key: 1,
				href: G.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [u("span", me, y(e.item.name), 1)], 8, pe)),
			e.item.poster_url ? (g(), l("img", {
				key: 2,
				ref_key: "imgEl",
				ref: X,
				class: h(["media-card__img", { "is-loaded": Y.value }]),
				src: e.item.poster_url,
				srcset: Z.value.srcset,
				sizes: Z.value.sizes,
				alt: e.item.name,
				loading: e.lazy ? "lazy" : void 0,
				decoding: "async",
				fetchpriority: e.fetchPriority,
				onLoad: Ge
			}, null, 42, he)) : (g(), l("div", N, [f(t, { name: b(ae)(e.item.type) }, null, 8, ["name"])])),
			u("div", P, [
				Ke.value ? (g(), l("span", F, "New")) : c("", !0),
				v(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (g(), l("span", I, y(e.quality), 1)) : c("", !0)
			]),
			Q.value > 0 ? (g(), l("div", {
				key: 4,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(Q.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [u("i", { style: oe({ width: `${Q.value * 100}%` }) }, null, 4)], 8, L)) : c("", !0),
			u("div", R, [
				u("h3", ge, y(e.item.name), 1),
				u("div", _e, [
					e.item.year ? (g(), l("span", ve, y(e.item.year), 1)) : c("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (g(), l("span", ye)) : c("", !0),
					e.item.rating ? (g(), l("span", be, y(e.item.rating), 1)) : c("", !0),
					e.item.rating && e.item.runtime ? (g(), l("span", xe)) : c("", !0),
					e.item.runtime ? (g(), l("span", Se, y(e.item.runtime) + "m", 1)) : c("", !0)
				]),
				$.value.length ? (g(), l("div", Ce, [(g(!0), l(a, null, ce($.value, (e) => (g(), l("span", { key: e }, y(e), 1))), 128))])) : c("", !0),
				Be.value ? (g(), l("div", we, [f(i, { text: "Play" }, {
					default: x(() => [u("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= S((t) => D("play", e.item), ["stop", "prevent"])
					}, [f(t, { name: "play" })])]),
					_: 1
				}), e.playOnly ? c("", !0) : (g(), l(a, { key: 0 }, [
					f(re, {
						level: Me.value,
						onCycle: Ie,
						onClick: r[1] ||= S(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					f(i, { text: B.value ? "Remove from favorites" : "Add to favorites" }, {
						default: x(() => [u("button", {
							type: "button",
							class: h(["media-card__iconbtn", { "is-active": B.value }]),
							"aria-label": B.value ? "Remove from favorites" : "Add to favorites",
							"aria-pressed": B.value ? "true" : "false",
							onClick: S(Le, ["stop", "prevent"])
						}, [f(t, { name: B.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Te)]),
						_: 1
					}, 8, ["text"]),
					f(i, { text: H.value ? "Mark as unwatched" : "Mark as watched" }, {
						default: x(() => [u("button", {
							type: "button",
							class: h(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": H.value }]),
							"aria-label": H.value ? "Mark as unwatched" : "Mark as watched",
							"aria-pressed": H.value ? "true" : "false",
							onClick: S(W, ["stop", "prevent"])
						}, [f(t, { name: H.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Ee)]),
						_: 1
					}, 8, ["text"]),
					f(i, { text: "More info" }, {
						default: x(() => [u("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More info",
							onClick: r[2] ||= S((t) => D("info", e.item), ["stop", "prevent"])
						}, [f(t, { name: "info" })])]),
						_: 1
					}),
					f(ie, {
						open: U.value,
						"onUpdate:open": r[3] ||= (e) => U.value = e,
						items: Pe.value,
						onSelect: Fe
					}, {
						default: x(({ toggle: e }) => [f(i, { text: "More actions" }, {
							default: x(() => [u("button", {
								type: "button",
								class: "media-card__iconbtn",
								"aria-label": "More actions",
								"aria-expanded": U.value ? "true" : "false",
								"aria-haspopup": "menu",
								onClick: S(e, ["stop", "prevent"])
							}, [f(t, { name: "more" })], 8, De)]),
							_: 2
						}, 1024)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (g(), s(i, {
						key: 0,
						text: "Match metadata"
					}, {
						default: x(() => [u("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "Match metadata",
							onClick: r[4] ||= S((t) => D("match", e.item), ["stop", "prevent"])
						}, [f(t, { name: "search" })])]),
						_: 1
					})) : c("", !0),
					v(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : c("", !0)
			])
		]), u("div", Oe, [u("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, y(e.item.name), 9, ke), u("div", Ae, [e.subtitle == null ? (g(), l(a, { key: 1 }, [
			e.item.year ? (g(), l(a, { key: 0 }, [d(y(e.item.year), 1)], 64)) : c("", !0),
			e.item.year && e.item.runtime ? (g(), l(a, { key: 1 }, [d(" · ")], 64)) : c("", !0),
			e.item.runtime ? (g(), l(a, { key: 2 }, [d(y(e.item.runtime) + "m", 1)], 64)) : c("", !0)
		], 64)) : (g(), l(a, { key: 0 }, [d(y(e.subtitle), 1)], 64))])])], 32));
	}
}), [["__scopeId", "data-v-ea9352bd"]]);
//#endregion
export { T as i, j as n, M as r, z as t };

//# sourceMappingURL=MediaCard-B11kpZL_.js.map