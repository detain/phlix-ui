import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { r as n } from "./client-D80As4Gx.js";
import { t as r } from "./useAuthStore-D2BCcJAK.js";
import { i as ee } from "./usePlayerStore-Dgw0JCWb.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { n as i, t as ne } from "./ThumbRating-CtGvXtns.js";
import { t as re } from "./Menu-DRkKveJV.js";
import { t as ie } from "./mediaTypeIcon-Bde251Qi.js";
import { Fragment as a, computed as o, createBlock as ae, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, inject as p, normalizeClass as m, normalizeStyle as oe, onMounted as se, openBlock as h, ref as g, renderList as ce, renderSlot as _, toDisplayString as v, unref as y, withCtx as b, withModifiers as x } from "vue";
import { RouterLink as le, routerKey as S } from "vue-router";
//#region src/composables/usePrefetch.ts
function C() {
	let e = p(S, null), t = /* @__PURE__ */ new WeakSet();
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
function ue(e, t) {
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
var de = { class: "media-card__poster" }, fe = [
	"href",
	"aria-label",
	"onClick"
], pe = { class: "visually-hidden" }, me = ["href", "aria-label"], he = { class: "visually-hidden" }, j = [
	"src",
	"srcset",
	"sizes",
	"alt",
	"fetchpriority"
], M = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, N = { class: "media-card__badges" }, P = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, F = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, I = ["aria-valuenow", "aria-label"], L = { class: "media-card__overlay" }, R = { class: "media-card__title" }, ge = { class: "media-card__meta" }, _e = {
	key: 0,
	class: "numeric"
}, ve = {
	key: 1,
	class: "media-card__dot"
}, ye = {
	key: 2,
	class: "media-card__cert"
}, be = {
	key: 3,
	class: "media-card__dot"
}, xe = {
	key: 4,
	class: "numeric"
}, Se = {
	key: 0,
	class: "media-card__genres"
}, Ce = {
	key: 1,
	class: "media-card__actions"
}, we = ["aria-label", "aria-pressed"], Te = ["aria-label", "aria-pressed"], Ee = ["aria-expanded", "onClick"], De = { class: "media-card__caption" }, Oe = ["title"], ke = { class: "media-card__caption-sub numeric" }, z = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
	setup(e, { emit: f }) {
		let w = e, T = f, E = ee(), D = r(), O = i(), z = p("phlixConfig", null), Ae = p(S, null), B = o(() => O.isFavorite(w.item.id)), je = o(() => O.likeLevel(w.item.id)), V = o(() => D.isAdmin), H = o(() => O.isWatched(w.item.id)), U = g(!1), Me = o(() => w.item.type === "series" || w.item.type === "season"), Ne = o(() => (V.value, U.value ? A(w.item, {
			isAdmin: V.value,
			isWatched: H.value,
			isSeriesOrSeason: Me.value,
			canChoosePoster: V.value
		}) : []));
		function Pe(e) {
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
		function Fe(e) {
			O.setLike(w.item.id, e, z?.apiBase ?? "");
		}
		function Ie() {
			O.toggleFavorite(w.item.id, z?.apiBase ?? ""), T("watchlist", w.item);
		}
		function W() {
			O.toggleWatched(w.item.id, z?.apiBase ?? ""), T("mark-watched", w.item);
		}
		let G = o(() => w.to ?? `/app/media/${w.item.id}`), { prefetch: Le } = C();
		function K() {
			Le(G.value);
		}
		let q = g(!1), J = g(!1), Re = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, ze = o(() => !w.hideActions && (q.value || J.value || Re));
		function Be() {
			q.value = !0, K();
		}
		function Ve() {
			q.value = !1;
		}
		function He() {
			J.value = !0, K();
		}
		function Ue(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			(!t || !n || !n.contains(t)) && (J.value = !1);
		}
		let Y = g(!1), X = g(null);
		function We() {
			Y.value = !0;
		}
		se(() => {
			X.value?.complete && (Y.value = !0);
		});
		let Z = o(() => ue(w.posterSrcset ?? w.item.poster_srcset, w.posterSizes)), Ge = o(() => {
			let e = w.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= w.newWithinDays * 24 * 60 * 60 * 1e3;
		}), Q = o(() => {
			let e = E.resumePositionFor(w.item.id), t = w.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), $ = o(() => w.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (h(), c("article", {
			class: "media-card",
			onPointerenter: Be,
			onPointerleave: Ve,
			onFocusin: He,
			onFocusout: Ue
		}, [l("div", de, [
			y(Ae) ? (h(), ae(y(le), {
				key: 0,
				to: G.value,
				custom: ""
			}, {
				default: b(({ navigate: t }) => [l("a", {
					href: G.value,
					class: "media-card__link",
					"aria-label": e.item.name,
					onClick: t
				}, [l("span", pe, v(e.item.name), 1)], 8, fe)]),
				_: 1
			}, 8, ["to"])) : (h(), c("a", {
				key: 1,
				href: G.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [l("span", he, v(e.item.name), 1)], 8, me)),
			e.item.poster_url ? (h(), c("img", {
				key: 2,
				ref_key: "imgEl",
				ref: X,
				class: m(["media-card__img", { "is-loaded": Y.value }]),
				src: e.item.poster_url,
				srcset: Z.value.srcset,
				sizes: Z.value.sizes,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				fetchpriority: e.fetchPriority,
				onLoad: We
			}, null, 42, j)) : (h(), c("div", M, [d(t, { name: y(ie)(e.item.type) }, null, 8, ["name"])])),
			l("div", N, [
				Ge.value ? (h(), c("span", P, "New")) : s("", !0),
				_(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (h(), c("span", F, v(e.quality), 1)) : s("", !0)
			]),
			Q.value > 0 ? (h(), c("div", {
				key: 4,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(Q.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [l("i", { style: oe({ width: `${Q.value * 100}%` }) }, null, 4)], 8, I)) : s("", !0),
			l("div", L, [
				l("h3", R, v(e.item.name), 1),
				l("div", ge, [
					e.item.year ? (h(), c("span", _e, v(e.item.year), 1)) : s("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (h(), c("span", ve)) : s("", !0),
					e.item.rating ? (h(), c("span", ye, v(e.item.rating), 1)) : s("", !0),
					e.item.rating && e.item.runtime ? (h(), c("span", be)) : s("", !0),
					e.item.runtime ? (h(), c("span", xe, v(e.item.runtime) + "m", 1)) : s("", !0)
				]),
				$.value.length ? (h(), c("div", Se, [(h(!0), c(a, null, ce($.value, (e) => (h(), c("span", { key: e }, v(e), 1))), 128))])) : s("", !0),
				ze.value ? (h(), c("div", Ce, [l("button", {
					type: "button",
					class: "media-card__iconbtn media-card__iconbtn--play",
					"aria-label": "Play",
					onClick: r[0] ||= x((t) => T("play", e.item), ["stop", "prevent"])
				}, [d(t, { name: "play" })]), e.playOnly ? s("", !0) : (h(), c(a, { key: 0 }, [
					d(ne, {
						level: je.value,
						onCycle: Fe,
						onClick: r[1] ||= x(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					l("button", {
						type: "button",
						class: m(["media-card__iconbtn", { "is-active": B.value }]),
						"aria-label": B.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": B.value ? "true" : "false",
						onClick: x(Ie, ["stop", "prevent"])
					}, [d(t, { name: B.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, we),
					l("button", {
						type: "button",
						class: m(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": H.value }]),
						"aria-label": H.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": H.value ? "true" : "false",
						onClick: x(W, ["stop", "prevent"])
					}, [d(t, { name: H.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Te),
					l("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= x((t) => T("info", e.item), ["stop", "prevent"])
					}, [d(t, { name: "info" })]),
					d(re, {
						open: U.value,
						"onUpdate:open": r[3] ||= (e) => U.value = e,
						items: Ne.value,
						onSelect: Pe
					}, {
						default: b(({ toggle: e }) => [l("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							"aria-expanded": U.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: x(e, ["stop", "prevent"])
						}, [d(t, { name: "more" })], 8, Ee)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (h(), c("button", {
						key: 0,
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Match metadata",
						onClick: r[4] ||= x((t) => T("match", e.item), ["stop", "prevent"])
					}, [d(t, { name: "search" })])) : s("", !0),
					_(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : s("", !0)
			])
		]), l("div", De, [l("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, v(e.item.name), 9, Oe), l("div", ke, [e.subtitle == null ? (h(), c(a, { key: 1 }, [
			e.item.year ? (h(), c(a, { key: 0 }, [u(v(e.item.year), 1)], 64)) : s("", !0),
			e.item.year && e.item.runtime ? (h(), c(a, { key: 1 }, [u(" · ")], 64)) : s("", !0),
			e.item.runtime ? (h(), c(a, { key: 2 }, [u(v(e.item.runtime) + "m", 1)], 64)) : s("", !0)
		], 64)) : (h(), c(a, { key: 0 }, [u(v(e.subtitle), 1)], 64))])])], 32));
	}
}), [["__scopeId", "data-v-80408a4b"]]);
//#endregion
export { C as i, k as n, A as r, z as t };

//# sourceMappingURL=MediaCard-CWXlsj1x.js.map