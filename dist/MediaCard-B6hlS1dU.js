import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-Ci10VWtp.js";
import { r as n } from "./client-D80As4Gx.js";
import { t as r } from "./useAuthStore-D2BCcJAK.js";
import { i as ee } from "./usePlayerStore-Dgw0JCWb.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { n as ne, t as re } from "./ThumbRating-DV17BrTc.js";
import { t as ie } from "./Menu-DRkKveJV.js";
import { Fragment as i, computed as a, createBlock as ae, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, inject as f, normalizeClass as p, normalizeStyle as oe, onMounted as se, openBlock as m, ref as h, renderList as ce, renderSlot as g, toDisplayString as _, unref as v, withCtx as y, withModifiers as b } from "vue";
import { RouterLink as x, routerKey as S } from "vue-router";
//#region src/composables/usePrefetch.ts
function C() {
	let e = f(S, null), t = /* @__PURE__ */ new WeakSet();
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
var w = "(max-width: 600px) 45vw, 200px";
function T(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function E(e) {
	return Number(e.toFixed(3)).toString();
}
function D(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${E(e.density)}x` : t;
}
function O(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = D(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function le(e, t) {
	let n = O(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : T(n) ? {
		srcset: n,
		sizes: w
	} : { srcset: n };
}
//#endregion
//#region src/components/mediaItemMenu.ts
var k = {
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
function A(e, t) {
	let n = k, r = [
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
var ue = { class: "media-card__poster" }, de = [
	"href",
	"aria-label",
	"onClick"
], fe = { class: "visually-hidden" }, pe = ["href", "aria-label"], me = { class: "visually-hidden" }, he = [
	"src",
	"srcset",
	"sizes",
	"alt",
	"fetchpriority"
], j = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, M = { class: "media-card__badges" }, N = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, P = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, F = ["aria-valuenow", "aria-label"], I = { class: "media-card__overlay" }, L = { class: "media-card__title" }, R = { class: "media-card__meta" }, ge = {
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
}, Ce = ["aria-label", "aria-pressed"], we = ["aria-label", "aria-pressed"], Te = ["aria-expanded", "onClick"], Ee = { class: "media-card__caption" }, De = ["title"], Oe = { class: "media-card__caption-sub numeric" }, z = /*#__PURE__*/ e(/* @__PURE__ */ d({
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
	setup(e, { emit: d }) {
		let w = e, T = d, E = ee(), D = r(), O = ne(), z = f("phlixConfig", null), ke = f(S, null), B = a(() => O.isFavorite(w.item.id)), Ae = a(() => O.likeLevel(w.item.id)), V = a(() => D.isAdmin), H = a(() => O.isWatched(w.item.id)), U = h(!1), je = a(() => w.item.type === "series" || w.item.type === "season"), Me = a(() => (V.value, U.value ? A(w.item, {
			isAdmin: V.value,
			isWatched: H.value,
			isSeriesOrSeason: je.value,
			canChoosePoster: V.value
		}) : []));
		function Ne(e) {
			let t = k, r = te();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					W();
					break;
				case t.like:
					O.setLike(w.item.id, 1, z?.apiBase ?? "");
					break;
				case t.dislike:
					O.setLike(w.item.id, -1, z?.apiBase ?? "");
					break;
				case t.addToPlaylist: {
					let e = window.prompt("Enter playlist name:");
					if (!e?.trim()) break;
					let t = e.trim();
					r.info("Creating playlist…"), n.createPlaylist(t, w.item.id).then(() => r.success("Playlist created")).catch((e) => {
						r.error("Failed to create playlist", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				}
				case t.download:
					r.info("Preparing download…"), n.getDownloadUrl(w.item.id).then(({ url: e }) => {
						window.open(e, "_blank", "noopener"), r.success("Download started");
					}).catch((e) => {
						r.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					r.info("Loading…"), n.getMissingEpisodes(w.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? r.success("No missing episodes") : r.warning(`${t} episode${t === 1 ? "" : "s"} missing`);
					}).catch((e) => {
						r.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					n.shufflePlay(w.item.id).then(() => r.success("Shuffle play started")).catch((e) => {
						r.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					T("edit-metadata", w.item);
					break;
				case t.exploreData:
					T("explore-data", w.item);
					break;
				case t.refreshMetadata:
				case t.identify:
					T("refresh", w.item);
					break;
				case t.editImages:
					T("choose-poster", w.item);
					break;
				case t.remove:
					T("remove", w.item);
					break;
				default: r.info(`${e.label} isn't available yet`);
			}
		}
		function Pe(e) {
			O.setLike(w.item.id, e, z?.apiBase ?? "");
		}
		function Fe() {
			O.toggleFavorite(w.item.id, z?.apiBase ?? ""), T("watchlist", w.item);
		}
		function W() {
			O.toggleWatched(w.item.id, z?.apiBase ?? ""), T("mark-watched", w.item);
		}
		let G = a(() => w.to ?? `/app/media/${w.item.id}`), { prefetch: Ie } = C();
		function K() {
			Ie(G.value);
		}
		let q = h(!1), J = h(!1), Le = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, Re = a(() => !w.hideActions && (q.value || J.value || Le));
		function ze() {
			q.value = !0, K();
		}
		function Be() {
			q.value = !1;
		}
		function Ve() {
			J.value = !0, K();
		}
		function He(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			(!t || !n || !n.contains(t)) && (J.value = !1);
		}
		let Y = h(!1), X = h(null);
		function Ue() {
			Y.value = !0;
		}
		se(() => {
			X.value?.complete && (Y.value = !0);
		});
		let Z = a(() => le(w.posterSrcset ?? w.item.poster_srcset, w.posterSizes)), We = a(() => {
			let e = w.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= w.newWithinDays * 24 * 60 * 60 * 1e3;
		}), Q = a(() => {
			let e = E.resumePositionFor(w.item.id), t = w.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), $ = a(() => w.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (m(), s("article", {
			class: "media-card",
			onPointerenter: ze,
			onPointerleave: Be,
			onFocusin: Ve,
			onFocusout: He
		}, [c("div", ue, [
			v(ke) ? (m(), ae(v(x), {
				key: 0,
				to: G.value,
				custom: ""
			}, {
				default: y(({ navigate: t }) => [c("a", {
					href: G.value,
					class: "media-card__link",
					"aria-label": e.item.name,
					onClick: t
				}, [c("span", fe, _(e.item.name), 1)], 8, de)]),
				_: 1
			}, 8, ["to"])) : (m(), s("a", {
				key: 1,
				href: G.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [c("span", me, _(e.item.name), 1)], 8, pe)),
			e.item.poster_url ? (m(), s("img", {
				key: 2,
				ref_key: "imgEl",
				ref: X,
				class: p(["media-card__img", { "is-loaded": Y.value }]),
				src: e.item.poster_url,
				srcset: Z.value.srcset,
				sizes: Z.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				fetchpriority: e.fetchPriority,
				onLoad: Ue
			}, null, 42, he)) : (m(), s("div", j, [u(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			c("div", M, [
				We.value ? (m(), s("span", N, "New")) : o("", !0),
				g(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (m(), s("span", P, _(e.quality), 1)) : o("", !0)
			]),
			Q.value > 0 ? (m(), s("div", {
				key: 4,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(Q.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [c("i", { style: oe({ width: `${Q.value * 100}%` }) }, null, 4)], 8, F)) : o("", !0),
			c("div", I, [
				c("h3", L, _(e.item.name), 1),
				c("div", R, [
					e.item.year ? (m(), s("span", ge, _(e.item.year), 1)) : o("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (m(), s("span", _e)) : o("", !0),
					e.item.rating ? (m(), s("span", ve, _(e.item.rating), 1)) : o("", !0),
					e.item.rating && e.item.runtime ? (m(), s("span", ye)) : o("", !0),
					e.item.runtime ? (m(), s("span", be, _(e.item.runtime) + "m", 1)) : o("", !0)
				]),
				$.value.length ? (m(), s("div", xe, [(m(!0), s(i, null, ce($.value, (e) => (m(), s("span", { key: e }, _(e), 1))), 128))])) : o("", !0),
				Re.value ? (m(), s("div", Se, [c("button", {
					type: "button",
					class: "media-card__iconbtn media-card__iconbtn--play",
					"aria-label": "Play",
					onClick: r[0] ||= b((t) => T("play", e.item), ["stop", "prevent"])
				}, [u(t, { name: "play" })]), e.playOnly ? o("", !0) : (m(), s(i, { key: 0 }, [
					u(re, {
						level: Ae.value,
						onCycle: Pe,
						onClick: r[1] ||= b(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					c("button", {
						type: "button",
						class: p(["media-card__iconbtn", { "is-active": B.value }]),
						"aria-label": B.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": B.value ? "true" : "false",
						onClick: b(Fe, ["stop", "prevent"])
					}, [u(t, { name: B.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Ce),
					c("button", {
						type: "button",
						class: p(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": H.value }]),
						"aria-label": H.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": H.value ? "true" : "false",
						onClick: b(W, ["stop", "prevent"])
					}, [u(t, { name: H.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, we),
					c("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= b((t) => T("info", e.item), ["stop", "prevent"])
					}, [u(t, { name: "info" })]),
					u(ie, {
						open: U.value,
						"onUpdate:open": r[3] ||= (e) => U.value = e,
						items: Me.value,
						onSelect: Ne
					}, {
						default: y(({ toggle: e }) => [c("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							"aria-expanded": U.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: b(e, ["stop", "prevent"])
						}, [u(t, { name: "more" })], 8, Te)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (m(), s("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[4] ||= b((t) => T("match", e.item), ["stop", "prevent"])
					}, [u(t, { name: "search" })])) : o("", !0),
					g(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : o("", !0)
			])
		]), c("div", Ee, [c("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, _(e.item.name), 9, De), c("div", Oe, [e.subtitle == null ? (m(), s(i, { key: 1 }, [
			e.item.year ? (m(), s(i, { key: 0 }, [l(_(e.item.year), 1)], 64)) : o("", !0),
			e.item.year && e.item.runtime ? (m(), s(i, { key: 1 }, [l(" · ")], 64)) : o("", !0),
			e.item.runtime ? (m(), s(i, { key: 2 }, [l(_(e.item.runtime) + "m", 1)], 64)) : o("", !0)
		], 64)) : (m(), s(i, { key: 0 }, [l(_(e.subtitle), 1)], 64))])])], 32));
	}
}), [["__scopeId", "data-v-fcc98dfb"]]);
//#endregion
export { C as i, k as n, A as r, z as t };

//# sourceMappingURL=MediaCard-B6hlS1dU.js.map