import { t as e } from "./rolldown-runtime-CGnMp29N.js";
import { t } from "./mediaTypeIcon-CNNqtg-w.js";
import { n, r } from "./useApiBase-DXTBY90j.js";
import { t as i } from "./useImageSrc-CSM61b-l.js";
import { n as a, t as ee } from "./ThumbRating-BMpV52OI.js";
import { t as te } from "./useAuthStore-DaCiMvJ5.js";
import { t as ne } from "./useToastStore-CxO_ppM8.js";
import { n as re, t as o } from "./Icon-55iG1rR7.js";
import { t as s } from "./Button-DTiNkl61.js";
import { t as c } from "./IconButton-DsjtwjU1.js";
import { t as ie } from "./Menu-DveuOn_r.js";
import { t as ae } from "./Modal-D4vQLxSG.js";
import { t as l } from "./Chip-BE4O7mqB.js";
import { t as oe } from "./MediaRow-CNbjQzHI.js";
import { a as se, i as ce, n as le } from "./MediaCard-CL05aAjH.js";
import { t as ue } from "./client-Bmlfq3Uy.js";
import { t as u } from "./safeHref-Be5nFpx7.js";
import { t as de } from "./useMessages-BGVJcrvU.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as fe, nextTick as pe, normalizeClass as b, normalizeStyle as me, onBeforeUnmount as he, onMounted as ge, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, watch as E, withCtx as D, withModifiers as _e } from "vue";
import { routerKey as ve } from "vue-router";
// src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var ye = { class: "media-detail" }, be = {
	key: 0,
	class: "media-detail__backdrop",
	"aria-hidden": "true"
}, xe = ["src", "srcset"], Se = ["src"], Ce = {
	key: 0,
	class: "media-detail__ambient-scrim",
	"aria-hidden": "true"
}, we = { class: "media-detail__bar" }, Te = { class: "media-detail__hero" }, Ee = { class: "media-detail__poster" }, De = ["src", "alt"], Oe = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, ke = { class: "media-detail__info" }, Ae = ["src", "alt"], je = {
	key: 1,
	class: "media-detail__title"
}, Me = { class: "media-detail__meta numeric" }, Ne = {
	key: 0,
	class: "media-detail__meta-item"
}, Pe = {
	key: 1,
	class: "media-detail__cert"
}, Fe = {
	key: 2,
	class: "media-detail__meta-item"
}, Ie = { class: "media-detail__type" }, Le = {
	key: 2,
	class: "media-detail__genres"
}, Re = {
	key: 3,
	class: "media-detail__companies"
}, ze = { class: "media-detail__companies-label" }, Be = { class: "media-detail__company-list" }, Ve = ["src", "alt"], He = { class: "media-detail__overview" }, Ue = { class: "media-detail__actions" }, We = { class: "media-detail__resume-at numeric" }, Ge = {
	key: 2,
	class: "media-detail__theme"
}, Ke = {
	key: 4,
	class: "media-detail__links"
}, qe = { class: "media-detail__links-label" }, Je = { class: "media-detail__links-list" }, Ye = ["href", "aria-label"], Xe = {
	key: 5,
	class: "media-detail__credits"
}, Ze = {
	key: 0,
	class: "media-detail__credit-group"
}, Qe = { class: "media-detail__credit-heading" }, $e = { class: "media-detail__people" }, et = [
	"disabled",
	"aria-label",
	"onClick"
], tt = { class: "media-detail__avatar" }, nt = ["src", "alt"], rt = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, it = { class: "media-detail__person-name" }, at = {
	key: 0,
	class: "media-detail__person-sub"
}, ot = {
	key: 1,
	class: "media-detail__credit-group"
}, st = { class: "media-detail__credit-heading" }, ct = { class: "media-detail__people" }, lt = [
	"disabled",
	"aria-label",
	"onClick"
], ut = { class: "media-detail__avatar" }, dt = ["src", "alt"], ft = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, pt = { class: "media-detail__person-name" }, mt = {
	key: 0,
	class: "media-detail__person-sub"
}, ht = {
	key: 3,
	class: "media-detail__files"
}, gt = { class: "media-detail__files-heading" }, _t = { class: "media-detail__files-list" }, vt = { class: "media-detail__file-path" }, yt = { class: "media-detail__file-meta" }, bt = {
	key: 0,
	class: "media-detail__file-container"
}, xt = {
	key: 1,
	class: "media-detail__file-resolution"
}, St = { class: "media-detail__file-size" }, Ct = { class: "media-detail__trailer-embed" }, wt = ["src", "title"], Tt = "phlix.theme.muted", Et = .35, O = /*@__PURE__*/ y({
	__name: "MediaDetail",
	props: {
		item: {},
		resumeSeconds: { default: null },
		similar: { default: () => [] },
		similarLoading: {
			type: Boolean,
			default: !1
		},
		showBack: {
			type: Boolean,
			default: !0
		},
		canMatch: {
			type: Boolean,
			default: !1
		},
		chipsClickable: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"play",
		"resume",
		"watchlist",
		"info",
		"match",
		"actor",
		"genre",
		"company",
		"back",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove",
		"edit-metadata",
		"explore-data"
	],
	setup(e, { emit: re }) {
		let { t: y } = de(), O = e, k = re, A = a(), Dt = fe("phlixConfig", null), Ot = te(), j = f(() => A.isFavorite(O.item.id));
		function kt() {
			A.toggleFavorite(O.item.id, W.value), k("watchlist", O.item);
		}
		let At = f(() => A.likeLevel(O.item.id)), jt = f(() => Ot.isAdmin), M = f(() => A.isWatched(O.item.id));
		function Mt() {
			A.toggleWatched(O.item.id, W.value), k("mark-watched", O.item);
		}
		let Nt = {
			movie: "movie",
			series: "tv",
			season: "tv",
			episode: "tv"
		}, Pt = f(() => {
			let e = O.item.external_ids;
			if (!e) return [];
			let t = Nt[O.item.type], n = {
				...t ? { tmdb: {
					label: "TMDB",
					url: (e) => `https://www.themoviedb.org/${t}/${encodeURIComponent(e)}`
				} } : {},
				imdb: {
					label: "IMDb",
					url: (e) => `https://www.imdb.com/title/${encodeURIComponent(e)}/`
				},
				tvdb: {
					label: "TheTVDB",
					url: (e) => `https://thetvdb.com/dereferrer/series/${encodeURIComponent(e)}`
				},
				anidb: {
					label: "AniDB",
					url: (e) => `https://anidb.net/anime/${encodeURIComponent(e)}`
				},
				tvmaze: {
					label: "TVmaze",
					url: (e) => `https://www.tvmaze.com/shows/${encodeURIComponent(e)}`
				},
				trakt: {
					label: "Trakt",
					url: (e) => `https://trakt.tv/search/trakt/${encodeURIComponent(e)}`
				}
			}, r = [];
			for (let [t, i] of Object.entries(e)) {
				let e = typeof i == "string" ? i.trim() : i == null ? "" : String(i).trim();
				if (!e) continue;
				let a = n[t.toLowerCase()];
				a && r.push({
					key: t,
					label: a.label,
					url: a.url(e)
				});
			}
			return r;
		}), N = S(!1), P = S(!1), Ft = f(() => O.item.type === "series" || O.item.type === "season"), It = f(() => se(O.item, {
			isAdmin: jt.value,
			isWatched: M.value,
			isSeriesOrSeason: Ft.value,
			canChoosePoster: jt.value
		}, y)), Lt = fe(ve, null);
		function Rt(e) {
			let t = ce, n = ne();
			switch (e.key) {
				case t.markWatched:
				case t.markUnwatched:
					Mt();
					break;
				case t.addToPlaylist:
					P.value = !0;
					break;
				case t.download:
					n.info(y("itemActions.downloadPreparing")), K().getDownloadUrl(O.item.id).then(({ url: e }) => {
						let t = u(e);
						t ? (window.open(t, "_blank", "noopener"), n.success(y("itemActions.downloadStarted"))) : n.error(y("itemActions.downloadUnsafe"));
					}).catch((e) => {
						n.error(y("itemActions.downloadFailed"), { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					n.info(y("itemActions.missingLoading")), K().getMissingEpisodes(O.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success(y("itemActions.noMissingEpisodes")) : n.warning(y("itemActions.missingEpisodesCount", { count: t }));
					}).catch((e) => {
						n.error(y("itemActions.missingEpisodesFailed"), { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					K().shufflePlay(O.item.id).then((e) => {
						let t = Array.isArray(e?.shuffled_ids) ? e.shuffled_ids[0] : void 0;
						t ? Lt?.hasRoute("player") ? Lt.push({
							name: "player",
							params: { id: t }
						}).catch(() => {}) : n.success(y("itemActions.shuffleQueued")) : n.info(y("itemActions.shuffleNothing"));
					}).catch((e) => {
						n.error(y("itemActions.shuffleFailed"), { message: e instanceof Error ? e.message : String(e) });
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
				default: n.info(y("detail.notYetAvailable", { action: e.label }));
			}
		}
		function zt(e) {
			A.setLike(O.item.id, e, W.value);
		}
		let Bt = f(() => t(O.item.type)), F = f(() => {
			let e = O.item.cast;
			return e?.length ? e.slice(0, 12).map((e) => ({
				name: e.name,
				sub: e.role ?? null,
				profileUrl: e.profile_url ?? null
			})) : (O.item.actors ?? []).slice(0, 12).map((e) => ({
				name: e,
				sub: null,
				profileUrl: null
			}));
		}), I = f(() => {
			let e = O.item.crew;
			return e?.length ? e.slice(0, 8).map((e) => ({
				name: e.name,
				sub: e.job ?? null,
				profileUrl: e.profile_url ?? null
			})) : O.item.director ? [{
				name: O.item.director,
				sub: y("detail.director"),
				profileUrl: null
			}] : [];
		}), Vt = f(() => {
			let e = O.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : O.item.studio ? [{
				name: O.item.studio,
				logoUrl: null
			}] : [];
		});
		function Ht(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let Ut = f(() => {
			let e = O.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function Wt(e) {
			if (e <= 0) return "0 B";
			let t = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], n = 0, r = e;
			for (; r >= 1024 && n < t.length - 1;) r /= 1024, n++;
			return n === 0 && e >= 960 && (n = 1, r = e / 1024), n > 0 && Math.round(r) === 1 ? `1 ${t[n]}` : `${r.toFixed(+(r < 100))} ${t[n]}`;
		}
		let L = S(!1), Gt = S(null);
		function Kt() {
			L.value = !0;
		}
		ge(() => {
			Gt.value?.complete && (L.value = !0);
		});
		let R = f(() => O.item.backdrop_url_large || O.item.backdrop_url || null), qt = f(() => O.item.backdrop_srcset || null), z = S(!1);
		function Jt() {
			z.value = !0;
		}
		E(R, () => {
			z.value = !1;
		});
		let Yt = f(() => !!O.item.trailer_url), Xt = /^[A-Za-z0-9_-]{1,20}$/, B = f(() => {
			let e = O.item.trailer_site, t = O.item.trailer_key;
			return e !== "YouTube" || !t || !Xt.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), V = S(!1);
		function Zt() {
			if (B.value) {
				V.value = !0;
				return;
			}
			let e = O.item.trailer_url ? u(O.item.trailer_url) : void 0;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let H = f(() => O.item.logo_url || null), U = S(!1);
		function Qt() {
			U.value = !0;
		}
		let $t = f(() => !!H.value && !U.value);
		E(H, () => {
			U.value = !1;
		});
		let W = n(), G = null;
		function K() {
			return G ? G.setBaseUrl(W.value) : G = new ue({ baseUrl: W.value }), G;
		}
		let { imgSrc: q, imgSrcset: en } = i(), tn = r(), J = f(() => {
			let e = O.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${tn.value || W.value || (Dt?.apiBase ?? "")}${e}` : null;
		});
		function nn() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(Tt) !== "false";
			} catch {
				return !0;
			}
		}
		function rn(e) {
			if (typeof localStorage < "u") try {
				localStorage.setItem(Tt, e ? "true" : "false");
			} catch {}
		}
		let Y = S(null), X = S(nn()), Z = S(!1), an = f(() => X.value ? "mute" : "volume"), on = f(() => X.value ? y("player.themeUnmute") : y("player.themeMute"));
		function sn() {
			let e = Y.value;
			e && (e.muted = X.value, e.volume = X.value ? 0 : Et);
		}
		function Q() {
			let e = Y.value;
			e && !Z.value && (sn(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = Y.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function cn() {
			X.value = !X.value, rn(X.value), sn(), X.value || Q();
		}
		function ln() {
			Z.value = !0, $();
		}
		return ge(() => {
			J.value && Q();
		}), E(J, (e, t) => {
			e !== t && ($(), Z.value = !1, e && pe(() => {
				J.value && Q();
			}));
		}), he(() => {
			$();
		}), (t, n) => (x(), h("article", ye, [
			R.value ? (x(), h("div", be, [g("img", {
				class: b(["media-detail__backdrop-img", { "is-loaded": z.value }]),
				src: T(q)(R.value),
				srcset: T(en)(qt.value) || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: Jt
			}, null, 42, xe), n[10] ||= g("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : m("", !0),
			J.value ? (x(), h("audio", {
				key: 1,
				ref_key: "themeAudioEl",
				ref: Y,
				src: J.value,
				class: "media-detail__theme-audio",
				loop: "",
				preload: "auto",
				"aria-hidden": "true",
				tabindex: "-1"
			}, null, 8, Se)) : m("", !0),
			e.item.poster_url ? (x(), h(d, { key: 2 }, [g("div", {
				class: "media-detail__ambient",
				style: me({ backgroundImage: `url(${T(q)(e.item.poster_url)})` }),
				"aria-hidden": "true"
			}, null, 4), R.value ? m("", !0) : (x(), h("div", Ce))], 64)) : m("", !0),
			g("div", we, [e.showBack ? (x(), p(s, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: n[0] ||= (e) => k("back")
			}, {
				default: D(() => [_(w(T(y)("player.back")), 1)]),
				_: 1
			})) : m("", !0)]),
			g("div", Te, [g("div", Ee, [e.item.poster_url ? (x(), h("img", {
				key: 0,
				ref_key: "imgEl",
				ref: Gt,
				class: b(["media-detail__img", { "is-loaded": L.value }]),
				src: T(q)(e.item.poster_url),
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: Kt
			}, null, 42, De)) : (x(), h("div", Oe, [v(o, { name: Bt.value }, null, 8, ["name"])]))]), g("div", ke, [
				$t.value ? (x(), h("img", {
					key: 0,
					class: "media-detail__logo",
					src: T(q)(H.value),
					alt: e.item.name,
					decoding: "async",
					onError: Qt
				}, null, 40, Ae)) : (x(), h("h1", je, w(e.item.name), 1)),
				g("div", Me, [
					e.item.year ? (x(), h("span", Ne, [v(o, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), _(w(e.item.year), 1)])) : m("", !0),
					e.item.rating ? (x(), h("span", Pe, w(e.item.rating), 1)) : m("", !0),
					e.item.runtime ? (x(), h("span", Fe, w(T(y)("media.runtimeMinutes", { minutes: e.item.runtime })), 1)) : m("", !0),
					g("span", Ie, w(e.item.type), 1)
				]),
				e.item.genres?.length ? (x(), h("div", Le, [(x(!0), h(d, null, C(e.item.genres, (t) => (x(), p(l, {
					key: t,
					size: "sm",
					class: "media-detail__genre",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? T(y)("detail.showNameTitles", { name: t }) : void 0,
					onClick: (e) => k("genre", t)
				}, {
					default: D(() => [_(w(t), 1)]),
					_: 2
				}, 1032, [
					"disabled",
					"aria-label",
					"onClick"
				]))), 128))])) : m("", !0),
				Vt.value.length ? (x(), h("div", Re, [g("span", ze, w(T(y)("detail.studios")), 1), g("div", Be, [(x(!0), h(d, null, C(Vt.value, (t) => (x(), p(l, {
					key: t.name,
					size: "sm",
					class: "media-detail__company",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? T(y)("detail.showNameTitles", { name: t.name }) : void 0,
					onClick: (e) => k("company", t.name)
				}, {
					default: D(() => [t.logoUrl ? (x(), h("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: T(q)(t.logoUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ve)) : m("", !0), g("span", null, w(t.name), 1)]),
					_: 2
				}, 1032, [
					"disabled",
					"aria-label",
					"onClick"
				]))), 128))])])) : m("", !0),
				g("p", He, w(e.item.overview || T(y)("detail.noOverview")), 1),
				g("div", Ue, [
					v(s, {
						variant: "solid",
						"left-icon": "play",
						onClick: n[1] ||= (t) => k("play", e.item)
					}, {
						default: D(() => [_(w(T(y)("player.play")), 1)]),
						_: 1
					}),
					Ut.value ? (x(), p(s, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: n[2] ||= (t) => k("resume", e.item)
					}, {
						default: D(() => [_(w(T(y)("player.resume")) + " ", 1), g("span", We, w(Ut.value), 1)]),
						_: 1
					})) : m("", !0),
					Yt.value ? (x(), p(s, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: Zt
					}, {
						default: D(() => [_(w(T(y)("detail.playTrailer")), 1)]),
						_: 1
					})) : m("", !0),
					v(s, {
						variant: "ghost",
						class: b(["media-detail__favorite", { "is-active": j.value }]),
						"left-icon": j.value ? "bookmark" : "bookmark-plus",
						"aria-label": j.value ? T(y)("itemActions.removeFavorite") : T(y)("itemActions.addFavorite"),
						"aria-pressed": j.value ? "true" : "false",
						onClick: kt
					}, {
						default: D(() => [_(w(j.value ? T(y)("itemActions.inFavorites") : T(y)("itemActions.watchlist")), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					v(s, {
						variant: "ghost",
						class: b(["media-detail__watched", { "is-active": M.value }]),
						"left-icon": M.value ? "eye" : "eye-off",
						"aria-label": M.value ? T(y)("itemActions.markUnwatchedAria") : T(y)("itemActions.markWatchedAria"),
						"aria-pressed": M.value ? "true" : "false",
						onClick: Mt
					}, {
						default: D(() => [_(w(M.value ? T(y)("itemActions.watched") : T(y)("itemActions.markWatched")), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					v(ee, {
						level: At.value,
						onCycle: zt
					}, null, 8, ["level"]),
					J.value && !Z.value ? (x(), h("div", Ge, [v(c, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: an.value,
						label: on.value,
						pressed: !X.value,
						onClick: cn
					}, null, 8, [
						"name",
						"label",
						"pressed"
					]), v(c, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: "x",
						label: T(y)("player.themeStop"),
						onClick: ln
					}, null, 8, ["label"])])) : m("", !0),
					v(ie, {
						open: N.value,
						"onUpdate:open": n[3] ||= (e) => N.value = e,
						items: It.value,
						onSelect: Rt
					}, {
						default: D(({ toggle: e }) => [v(c, {
							variant: "ghost",
							name: "more",
							label: T(y)("itemActions.moreActions"),
							"aria-expanded": N.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: _e(e, ["stop", "prevent"])
						}, null, 8, [
							"label",
							"aria-expanded",
							"onClick"
						])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (x(), p(s, {
						key: 3,
						variant: "outline",
						"left-icon": "search",
						onClick: n[4] ||= (t) => k("match", e.item)
					}, {
						default: D(() => [_(w(T(y)("itemActions.matchMetadata")), 1)]),
						_: 1
					})) : m("", !0)
				]),
				Pt.value.length ? (x(), h("div", Ke, [g("span", qe, w(T(y)("detail.links")), 1), g("div", Je, [(x(!0), h(d, null, C(Pt.value, (e) => (x(), h("a", {
					key: e.key,
					class: "media-detail__link",
					href: T(u)(e.url),
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": T(y)("detail.openExternal", { provider: e.label })
				}, [g("span", null, w(e.label), 1), v(o, {
					name: "arrow-right",
					class: "media-detail__link-icon",
					"aria-hidden": "true"
				})], 8, Ye))), 128))])])) : m("", !0),
				I.value.length || F.value.length ? (x(), h("div", Xe, [I.value.length ? (x(), h("section", Ze, [g("h2", Qe, w(T(y)("detail.crew")), 1), g("ul", $e, [(x(!0), h(d, null, C(I.value, (t, n) => (x(), h("li", { key: `crew-${n}-${t.name}` }, [g("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? T(y)("detail.showTitlesWith", { name: t.name }) : void 0,
					onClick: (n) => e.chipsClickable && k("actor", t.name)
				}, [
					g("span", tt, [t.profileUrl ? (x(), h("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: T(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, nt)) : (x(), h("span", rt, w(Ht(t.name)), 1))]),
					g("span", it, w(t.name), 1),
					t.sub ? (x(), h("span", at, w(t.sub), 1)) : m("", !0)
				], 8, et)]))), 128))])])) : m("", !0), F.value.length ? (x(), h("section", ot, [g("h2", st, w(T(y)("detail.cast")), 1), g("ul", ct, [(x(!0), h(d, null, C(F.value, (t, n) => (x(), h("li", { key: `cast-${n}-${t.name}` }, [g("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? T(y)("detail.showTitlesWith", { name: t.name }) : void 0,
					onClick: (n) => e.chipsClickable && k("actor", t.name)
				}, [
					g("span", ut, [t.profileUrl ? (x(), h("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: T(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, dt)) : (x(), h("span", ft, w(Ht(t.name)), 1))]),
					g("span", pt, w(t.name), 1),
					t.sub ? (x(), h("span", mt, w(t.sub), 1)) : m("", !0)
				], 8, lt)]))), 128))])])) : m("", !0)])) : m("", !0)
			])]),
			e.item.files?.length ? (x(), h("section", ht, [g("h2", gt, w(T(y)("detail.files")), 1), g("ul", _t, [(x(!0), h(d, null, C(e.item.files, (e, t) => (x(), h("li", {
				key: t,
				class: "media-detail__file"
			}, [g("span", vt, w(e.path), 1), g("span", yt, [
				e.container ? (x(), h("span", bt, w(e.container), 1)) : m("", !0),
				e.resolution ? (x(), h("span", xt, w(e.resolution), 1)) : m("", !0),
				g("span", St, w(Wt(e.size_bytes)), 1)
			])]))), 128))])])) : m("", !0),
			e.similarLoading || e.similar.length ? (x(), p(oe, {
				key: 4,
				class: "media-detail__similar",
				title: T(y)("detail.moreLikeThis"),
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: n[5] ||= (e) => k("play", e),
				onWatchlist: n[6] ||= (e) => k("watchlist", e),
				onInfo: n[7] ||= (e) => k("info", e)
			}, null, 8, [
				"title",
				"items",
				"loading"
			])) : m("", !0),
			B.value ? (x(), p(ae, {
				key: 5,
				modelValue: V.value,
				"onUpdate:modelValue": n[8] ||= (e) => V.value = e,
				title: T(y)("detail.trailerModalTitle", { name: e.item.name }),
				size: "lg"
			}, {
				default: D(() => [g("div", Ct, [g("iframe", {
					class: "media-detail__trailer-iframe",
					src: B.value,
					title: T(y)("detail.trailerFrameTitle", { name: e.item.name }),
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, wt)])]),
				_: 1
			}, 8, ["modelValue", "title"])) : m("", !0),
			P.value ? (x(), p(le, {
				key: 6,
				"model-value": !0,
				item: e.item,
				"onUpdate:modelValue": n[9] ||= (e) => P.value = !1
			}, null, 8, ["item"])) : m("", !0)
		]));
	}
}), k = /* @__PURE__ */ e({ default: () => A }), A = /*#__PURE__*/ re(O, [["__scopeId", "data-v-17470d03"]]);
export { k as n, A as t };

//# sourceMappingURL=MediaDetail-BuTMc3TP.js.map