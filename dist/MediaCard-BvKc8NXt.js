import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CfPSBsz2.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { i as r } from "./client-COHWZ2KC.js";
import { t as i } from "./useAuthStore-Bxpn4wWU.js";
import { i as ee } from "./usePlayerStore-DhgapSoa.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { n as ne, t as re } from "./ThumbRating-DXzzr40H.js";
import { t as a } from "./Tooltip-9gdTmuk6.js";
import { t as ie } from "./Menu-BPCGwEn4.js";
import { t as ae } from "./mediaTypeIcon-Bde251Qi.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as h, normalizeClass as g, normalizeStyle as oe, onMounted as se, openBlock as _, ref as v, renderList as ce, renderSlot as y, toDisplayString as b, unref as x, withCtx as S, withModifiers as C } from "vue";
import { RouterLink as le, routerKey as w } from "vue-router";
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
function ue(e, t) {
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
var de = { class: "media-card__poster" }, fe = [
	"href",
	"aria-label",
	"onClick"
], pe = { class: "visually-hidden" }, me = ["href", "aria-label"], he = { class: "visually-hidden" }, ge = [
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
}, L = ["aria-valuenow", "aria-label"], _e = { class: "media-card__overlay" }, ve = { class: "media-card__title" }, ye = { class: "media-card__meta" }, be = {
	key: 0,
	class: "numeric"
}, xe = {
	key: 1,
	class: "media-card__dot"
}, Se = {
	key: 2,
	class: "media-card__cert"
}, Ce = {
	key: 3,
	class: "media-card__dot"
}, we = {
	key: 4,
	class: "numeric"
}, Te = {
	key: 0,
	class: "media-card__genres"
}, Ee = {
	key: 1,
	class: "media-card__actions"
}, De = ["aria-label", "aria-pressed"], Oe = ["aria-label", "aria-pressed"], R = ["aria-expanded", "onClick"], ke = {
	key: 0,
	class: "media-card__caption"
}, Ae = ["title"], je = { class: "media-card__caption-sub numeric" }, z = /*#__PURE__*/ e(/* @__PURE__ */ m({
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
		let E = e, D = m, O = ee(), k = i(), A = ne(), z = h("phlixConfig", null), Me = h(w, null), B = s(() => A.isFavorite(E.item.id)), Ne = s(() => A.likeLevel(E.item.id)), V = s(() => k.isAdmin), H = s(() => A.isWatched(E.item.id)), U = v(!1), Pe = s(() => E.item.type === "series" || E.item.type === "season"), Fe = s(() => (V.value, U.value ? M(E.item, {
			isAdmin: V.value,
			isWatched: H.value,
			isSeriesOrSeason: Pe.value,
			canChoosePoster: V.value
		}) : []));
		function Ie(e) {
			let t = j, i = te();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					W();
					break;
				case t.addToPlaylist: {
					let e = window.prompt("Enter playlist name:");
					if (!e?.trim()) break;
					let t = e.trim();
					i.info("Creating playlist…"), r.createPlaylist(t, E.item.id).then(() => i.success("Playlist created")).catch((e) => {
						i.error("Failed to create playlist", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				}
				case t.download:
					i.info("Preparing download…"), r.getDownloadUrl(E.item.id).then(({ url: e }) => {
						window.open(e, "_blank", "noopener"), i.success("Download started");
					}).catch((e) => {
						i.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					i.info("Loading…"), r.getMissingEpisodes(E.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? i.success("No missing episodes") : i.warning(`${n(t, "episode", "episodes")} missing`);
					}).catch((e) => {
						i.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					r.shufflePlay(E.item.id).then(() => i.success("Shuffle play started")).catch((e) => {
						i.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
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
				default: i.info(`${e.label} isn't available yet`);
			}
		}
		function Le(e) {
			A.setLike(E.item.id, e, z?.apiBase ?? "");
		}
		function Re() {
			A.toggleFavorite(E.item.id, z?.apiBase ?? ""), D("watchlist", E.item);
		}
		function W() {
			A.toggleWatched(E.item.id, z?.apiBase ?? ""), D("mark-watched", E.item);
		}
		let G = s(() => E.to ?? `/app/media/${E.item.id}`), { prefetch: ze } = T();
		function K() {
			ze(G.value);
		}
		let q = v(!1), J = v(!1), Be = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, Ve = s(() => !E.hideActions && (q.value || J.value || Be));
		function He() {
			q.value = !0, K();
		}
		function Ue() {
			q.value = !1;
		}
		function We() {
			J.value = !0, K();
		}
		function Ge(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			(!t || !n || !n.contains(t)) && (J.value = !1);
		}
		let Y = v(!1), X = v(null);
		function Ke() {
			Y.value = !0;
		}
		se(() => {
			X.value?.complete && (Y.value = !0);
		});
		let Z = s(() => ue(E.posterSrcset ?? E.item.poster_srcset, E.posterSizes)), qe = s(() => {
			let e = E.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= E.newWithinDays * 24 * 60 * 60 * 1e3;
		}), Q = s(() => {
			let e = O.resumePositionFor(E.item.id), t = E.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), $ = s(() => E.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (_(), u("article", {
			class: "media-card",
			onPointerenter: He,
			onPointerleave: Ue,
			onFocusin: We,
			onFocusout: Ge
		}, [d("div", de, [
			x(Me) ? (_(), c(x(le), {
				key: 0,
				to: G.value,
				custom: ""
			}, {
				default: S(({ navigate: t }) => [d("a", {
					href: G.value,
					class: "media-card__link",
					"aria-label": e.item.name,
					onClick: t
				}, [d("span", pe, b(e.item.name), 1)], 8, fe)]),
				_: 1
			}, 8, ["to"])) : (_(), u("a", {
				key: 1,
				href: G.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [d("span", he, b(e.item.name), 1)], 8, me)),
			e.item.poster_url ? (_(), u("img", {
				key: 2,
				ref_key: "imgEl",
				ref: X,
				class: g(["media-card__img", { "is-loaded": Y.value }]),
				src: e.item.poster_url,
				srcset: Z.value.srcset,
				sizes: Z.value.sizes,
				alt: e.item.name,
				loading: e.lazy ? "lazy" : void 0,
				decoding: "async",
				fetchpriority: e.fetchPriority,
				onLoad: Ke
			}, null, 42, ge)) : (_(), u("div", N, [p(t, { name: x(ae)(e.item.type) }, null, 8, ["name"])])),
			d("div", P, [
				qe.value ? (_(), u("span", F, "New")) : l("", !0),
				y(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (_(), u("span", I, b(e.quality), 1)) : l("", !0)
			]),
			Q.value > 0 ? (_(), u("div", {
				key: 4,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(Q.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [d("i", { style: oe({ width: `${Q.value * 100}%` }) }, null, 4)], 8, L)) : l("", !0),
			d("div", _e, [e.hideCaption ? l("", !0) : (_(), u(o, { key: 0 }, [
				d("h3", ve, b(e.item.name), 1),
				d("div", ye, [
					e.item.year ? (_(), u("span", be, b(e.item.year), 1)) : l("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (_(), u("span", xe)) : l("", !0),
					e.item.rating ? (_(), u("span", Se, b(e.item.rating), 1)) : l("", !0),
					e.item.rating && e.item.runtime ? (_(), u("span", Ce)) : l("", !0),
					e.item.runtime ? (_(), u("span", we, b(e.item.runtime) + "m", 1)) : l("", !0)
				]),
				$.value.length ? (_(), u("div", Te, [(_(!0), u(o, null, ce($.value, (e) => (_(), u("span", { key: e }, b(e), 1))), 128))])) : l("", !0)
			], 64)), Ve.value ? (_(), u("div", Ee, [p(a, { text: "Play" }, {
				default: S(() => [d("button", {
					type: "button",
					class: "media-card__iconbtn media-card__iconbtn--play",
					"aria-label": "Play",
					onClick: r[0] ||= C((t) => D("play", e.item), ["stop", "prevent"])
				}, [p(t, { name: "play" })])]),
				_: 1
			}), e.playOnly ? l("", !0) : (_(), u(o, { key: 0 }, [
				p(re, {
					level: Ne.value,
					onCycle: Le,
					onClick: r[1] ||= C(() => {}, ["stop", "prevent"])
				}, null, 8, ["level"]),
				p(a, { text: B.value ? "Remove from favorites" : "Add to favorites" }, {
					default: S(() => [d("button", {
						type: "button",
						class: g(["media-card__iconbtn", { "is-active": B.value }]),
						"aria-label": B.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": B.value ? "true" : "false",
						onClick: C(Re, ["stop", "prevent"])
					}, [p(t, { name: B.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, De)]),
					_: 1
				}, 8, ["text"]),
				p(a, { text: H.value ? "Mark as unwatched" : "Mark as watched" }, {
					default: S(() => [d("button", {
						type: "button",
						class: g(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": H.value }]),
						"aria-label": H.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": H.value ? "true" : "false",
						onClick: C(W, ["stop", "prevent"])
					}, [p(t, { name: H.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Oe)]),
					_: 1
				}, 8, ["text"]),
				p(a, { text: "More info" }, {
					default: S(() => [d("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= C((t) => D("info", e.item), ["stop", "prevent"])
					}, [p(t, { name: "info" })])]),
					_: 1
				}),
				p(ie, {
					open: U.value,
					"onUpdate:open": r[3] ||= (e) => U.value = e,
					items: Fe.value,
					onSelect: Ie
				}, {
					default: S(({ toggle: e }) => [p(a, { text: "More actions" }, {
						default: S(() => [d("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More actions",
							"aria-expanded": U.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: C(e, ["stop", "prevent"])
						}, [p(t, { name: "more" })], 8, R)]),
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
						onClick: r[4] ||= C((t) => D("match", e.item), ["stop", "prevent"])
					}, [p(t, { name: "search" })])]),
					_: 1
				})) : l("", !0),
				y(n.$slots, "actions", { item: e.item }, void 0, !0)
			], 64))])) : l("", !0)])
		]), e.hideCaption ? l("", !0) : (_(), u("div", ke, [d("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, b(e.item.name), 9, Ae), d("div", je, [e.subtitle == null ? (_(), u(o, { key: 1 }, [
			e.item.year ? (_(), u(o, { key: 0 }, [f(b(e.item.year), 1)], 64)) : l("", !0),
			e.item.year && e.item.runtime ? (_(), u(o, { key: 1 }, [f(" · ")], 64)) : l("", !0),
			e.item.runtime ? (_(), u(o, { key: 2 }, [f(b(e.item.runtime) + "m", 1)], 64)) : l("", !0)
		], 64)) : (_(), u(o, { key: 0 }, [f(b(e.subtitle), 1)], 64))])]))], 32));
	}
}), [["__scopeId", "data-v-48ffee63"]]);
//#endregion
export { T as i, j as n, M as r, z as t };

//# sourceMappingURL=MediaCard-BvKc8NXt.js.map