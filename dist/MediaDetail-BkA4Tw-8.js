import { t as e } from "./rolldown-runtime-CGnMp29N.js";
import { t } from "./mediaTypeIcon-CNNqtg-w.js";
import { n, r } from "./useApiBase-DXTBY90j.js";
import { t as i } from "./useImageSrc-CSM61b-l.js";
import { n as a, t as ee } from "./ThumbRating-D9anuOtF.js";
import { t as te } from "./useAuthStore-B-KYdhYS.js";
import { t as ne } from "./useToastStore-CxO_ppM8.js";
import { n as re, t as o } from "./Icon-55iG1rR7.js";
import { t as s } from "./Button-Dfl4y6vO.js";
import { t as c } from "./IconButton-oCt4k5-3.js";
import { t as ie } from "./Menu-D1MRZDZu.js";
import { t as ae } from "./Modal-DZDXQwbG.js";
import { t as l } from "./Chip-DwTdWHEP.js";
import { t as oe } from "./MediaRow-D2xyRhXn.js";
import { a as se, i as ce, n as le } from "./MediaCard-Bj5MLvLB.js";
import { t as ue } from "./client-BLNUsFSj.js";
import { a as de } from "./plural-B3O2rVPV.js";
import { t as u } from "./safeHref-Be5nFpx7.js";
import { t as fe } from "./useMessages-D54Bje5m.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as pe, nextTick as me, normalizeClass as b, normalizeStyle as he, onBeforeUnmount as ge, onMounted as _e, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, watch as E, withCtx as D, withModifiers as ve } from "vue";
import { routerKey as ye } from "vue-router";
// src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var be = { class: "media-detail" }, xe = {
	key: 0,
	class: "media-detail__backdrop",
	"aria-hidden": "true"
}, Se = ["src", "srcset"], Ce = ["src"], we = {
	key: 0,
	class: "media-detail__ambient-scrim",
	"aria-hidden": "true"
}, Te = { class: "media-detail__bar" }, Ee = { class: "media-detail__hero" }, De = { class: "media-detail__poster" }, Oe = ["src", "alt"], ke = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, Ae = { class: "media-detail__info" }, je = ["src", "alt"], Me = {
	key: 1,
	class: "media-detail__title"
}, Ne = { class: "media-detail__meta numeric" }, Pe = {
	key: 0,
	class: "media-detail__meta-item"
}, Fe = {
	key: 1,
	class: "media-detail__cert"
}, Ie = {
	key: 2,
	class: "media-detail__meta-item"
}, Le = { class: "media-detail__type" }, Re = {
	key: 2,
	class: "media-detail__genres"
}, ze = {
	key: 3,
	class: "media-detail__companies"
}, Be = { class: "media-detail__company-list" }, Ve = ["src", "alt"], He = { class: "media-detail__overview" }, Ue = { class: "media-detail__actions" }, We = { class: "media-detail__resume-at numeric" }, Ge = {
	key: 2,
	class: "media-detail__theme"
}, Ke = {
	key: 4,
	class: "media-detail__links"
}, qe = { class: "media-detail__links-list" }, Je = ["href", "aria-label"], Ye = {
	key: 5,
	class: "media-detail__credits"
}, Xe = {
	key: 0,
	class: "media-detail__credit-group"
}, Ze = { class: "media-detail__people" }, Qe = [
	"disabled",
	"aria-label",
	"onClick"
], $e = { class: "media-detail__avatar" }, et = ["src", "alt"], tt = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, nt = { class: "media-detail__person-name" }, rt = {
	key: 0,
	class: "media-detail__person-sub"
}, it = {
	key: 1,
	class: "media-detail__credit-group"
}, at = { class: "media-detail__people" }, ot = [
	"disabled",
	"aria-label",
	"onClick"
], st = { class: "media-detail__avatar" }, ct = ["src", "alt"], lt = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, ut = { class: "media-detail__person-name" }, dt = {
	key: 0,
	class: "media-detail__person-sub"
}, ft = {
	key: 3,
	class: "media-detail__files"
}, pt = { class: "media-detail__files-list" }, mt = { class: "media-detail__file-path" }, ht = { class: "media-detail__file-meta" }, gt = {
	key: 0,
	class: "media-detail__file-container"
}, _t = {
	key: 1,
	class: "media-detail__file-resolution"
}, vt = { class: "media-detail__file-size" }, yt = { class: "media-detail__trailer-embed" }, bt = ["src", "title"], xt = "phlix.theme.muted", St = .35, O = /*@__PURE__*/ y({
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
		let { t: y } = fe(), O = e, k = re, A = a(), Ct = pe("phlixConfig", null), wt = te(), j = f(() => A.isFavorite(O.item.id));
		function Tt() {
			A.toggleFavorite(O.item.id, W.value), k("watchlist", O.item);
		}
		let Et = f(() => A.likeLevel(O.item.id)), Dt = f(() => wt.isAdmin), M = f(() => A.isWatched(O.item.id));
		function Ot() {
			A.toggleWatched(O.item.id, W.value), k("mark-watched", O.item);
		}
		let kt = {
			movie: "movie",
			series: "tv",
			season: "tv",
			episode: "tv"
		}, At = f(() => {
			let e = O.item.external_ids;
			if (!e) return [];
			let t = kt[O.item.type], n = {
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
		}), N = S(!1), P = S(!1), jt = f(() => O.item.type === "series" || O.item.type === "season"), Mt = f(() => se(O.item, {
			isAdmin: Dt.value,
			isWatched: M.value,
			isSeriesOrSeason: jt.value,
			canChoosePoster: Dt.value
		})), Nt = pe(ye, null);
		function Pt(e) {
			let t = ce, n = ne();
			switch (e.label) {
				case t.markWatched:
				case t.markUnwatched:
					Ot();
					break;
				case t.addToPlaylist:
					P.value = !0;
					break;
				case t.download:
					n.info("Preparing download…"), K().getDownloadUrl(O.item.id).then(({ url: e }) => {
						let t = u(e);
						t ? (window.open(t, "_blank", "noopener"), n.success("Download started.")) : n.error("Download blocked — unsafe link.");
					}).catch((e) => {
						n.error("Download failed.", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					n.info("Loading…"), K().getMissingEpisodes(O.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success("No missing episodes.") : n.warning(`${de(t, "episode", "episodes")} missing.`);
					}).catch((e) => {
						n.error("Failed to load missing episodes.", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					K().shufflePlay(O.item.id).then((e) => {
						let t = Array.isArray(e?.shuffled_ids) ? e.shuffled_ids[0] : void 0;
						t ? Nt?.hasRoute("player") ? Nt.push({
							name: "player",
							params: { id: t }
						}).catch(() => {}) : n.success("Shuffle queued.") : n.info("Nothing to shuffle-play.");
					}).catch((e) => {
						n.error("Shuffle play failed.", { message: e instanceof Error ? e.message : String(e) });
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
				default: n.info(`${e.label} isn’t available yet.`);
			}
		}
		function Ft(e) {
			A.setLike(O.item.id, e, W.value);
		}
		let It = f(() => t(O.item.type)), F = f(() => {
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
				sub: "Director",
				profileUrl: null
			}] : [];
		}), Lt = f(() => {
			let e = O.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : O.item.studio ? [{
				name: O.item.studio,
				logoUrl: null
			}] : [];
		});
		function Rt(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let zt = f(() => {
			let e = O.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function Bt(e) {
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
		let L = S(!1), Vt = S(null);
		function Ht() {
			L.value = !0;
		}
		_e(() => {
			Vt.value?.complete && (L.value = !0);
		});
		let R = f(() => O.item.backdrop_url_large || O.item.backdrop_url || null), Ut = f(() => O.item.backdrop_srcset || null), z = S(!1);
		function Wt() {
			z.value = !0;
		}
		E(R, () => {
			z.value = !1;
		});
		let Gt = f(() => !!O.item.trailer_url), Kt = /^[A-Za-z0-9_-]{1,20}$/, B = f(() => {
			let e = O.item.trailer_site, t = O.item.trailer_key;
			return e !== "YouTube" || !t || !Kt.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), V = S(!1);
		function qt() {
			if (B.value) {
				V.value = !0;
				return;
			}
			let e = O.item.trailer_url ? u(O.item.trailer_url) : void 0;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let H = f(() => O.item.logo_url || null), U = S(!1);
		function Jt() {
			U.value = !0;
		}
		let Yt = f(() => !!H.value && !U.value);
		E(H, () => {
			U.value = !1;
		});
		let W = n(), G = null;
		function K() {
			return G ? G.setBaseUrl(W.value) : G = new ue({ baseUrl: W.value }), G;
		}
		let { imgSrc: q, imgSrcset: Xt } = i(), Zt = r(), J = f(() => {
			let e = O.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${Zt.value || W.value || (Ct?.apiBase ?? "")}${e}` : null;
		});
		function Qt() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(xt) !== "false";
			} catch {
				return !0;
			}
		}
		function $t(e) {
			if (typeof localStorage < "u") try {
				localStorage.setItem(xt, e ? "true" : "false");
			} catch {}
		}
		let Y = S(null), X = S(Qt()), Z = S(!1), en = f(() => X.value ? "mute" : "volume"), tn = f(() => X.value ? y("player.themeUnmute") : y("player.themeMute"));
		function nn() {
			let e = Y.value;
			e && (e.muted = X.value, e.volume = X.value ? 0 : St);
		}
		function Q() {
			let e = Y.value;
			e && !Z.value && (nn(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = Y.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function rn() {
			X.value = !X.value, $t(X.value), nn(), X.value || Q();
		}
		function an() {
			Z.value = !0, $();
		}
		return _e(() => {
			J.value && Q();
		}), E(J, (e, t) => {
			e !== t && ($(), Z.value = !1, e && me(() => {
				J.value && Q();
			}));
		}), ge(() => {
			$();
		}), (t, n) => (x(), h("article", be, [
			R.value ? (x(), h("div", xe, [g("img", {
				class: b(["media-detail__backdrop-img", { "is-loaded": z.value }]),
				src: T(q)(R.value),
				srcset: T(Xt)(Ut.value) || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: Wt
			}, null, 42, Se), n[10] ||= g("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : m("", !0),
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
			}, null, 8, Ce)) : m("", !0),
			e.item.poster_url ? (x(), h(d, { key: 2 }, [g("div", {
				class: "media-detail__ambient",
				style: he({ backgroundImage: `url(${T(q)(e.item.poster_url)})` }),
				"aria-hidden": "true"
			}, null, 4), R.value ? m("", !0) : (x(), h("div", we))], 64)) : m("", !0),
			g("div", Te, [e.showBack ? (x(), p(s, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: n[0] ||= (e) => k("back")
			}, {
				default: D(() => [...n[11] ||= [_("Back", -1)]]),
				_: 1
			})) : m("", !0)]),
			g("div", Ee, [g("div", De, [e.item.poster_url ? (x(), h("img", {
				key: 0,
				ref_key: "imgEl",
				ref: Vt,
				class: b(["media-detail__img", { "is-loaded": L.value }]),
				src: T(q)(e.item.poster_url),
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: Ht
			}, null, 42, Oe)) : (x(), h("div", ke, [v(o, { name: It.value }, null, 8, ["name"])]))]), g("div", Ae, [
				Yt.value ? (x(), h("img", {
					key: 0,
					class: "media-detail__logo",
					src: T(q)(H.value),
					alt: e.item.name,
					decoding: "async",
					onError: Jt
				}, null, 40, je)) : (x(), h("h1", Me, w(e.item.name), 1)),
				g("div", Ne, [
					e.item.year ? (x(), h("span", Pe, [v(o, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), _(w(e.item.year), 1)])) : m("", !0),
					e.item.rating ? (x(), h("span", Fe, w(e.item.rating), 1)) : m("", !0),
					e.item.runtime ? (x(), h("span", Ie, w(e.item.runtime) + "m", 1)) : m("", !0),
					g("span", Le, w(e.item.type), 1)
				]),
				e.item.genres?.length ? (x(), h("div", Re, [(x(!0), h(d, null, C(e.item.genres, (t) => (x(), p(l, {
					key: t,
					size: "sm",
					class: "media-detail__genre",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show ${t} titles` : void 0,
					onClick: (e) => k("genre", t)
				}, {
					default: D(() => [_(w(t), 1)]),
					_: 2
				}, 1032, [
					"disabled",
					"aria-label",
					"onClick"
				]))), 128))])) : m("", !0),
				Lt.value.length ? (x(), h("div", ze, [n[12] ||= g("span", { class: "media-detail__companies-label" }, "Studios", -1), g("div", Be, [(x(!0), h(d, null, C(Lt.value, (t) => (x(), p(l, {
					key: t.name,
					size: "sm",
					class: "media-detail__company",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show ${t.name} titles` : void 0,
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
				g("p", He, w(e.item.overview || "No overview available."), 1),
				g("div", Ue, [
					v(s, {
						variant: "solid",
						"left-icon": "play",
						onClick: n[1] ||= (t) => k("play", e.item)
					}, {
						default: D(() => [...n[13] ||= [_("Play", -1)]]),
						_: 1
					}),
					zt.value ? (x(), p(s, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: n[2] ||= (t) => k("resume", e.item)
					}, {
						default: D(() => [n[14] ||= _(" Resume ", -1), g("span", We, w(zt.value), 1)]),
						_: 1
					})) : m("", !0),
					Gt.value ? (x(), p(s, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: qt
					}, {
						default: D(() => [...n[15] ||= [_(" Play Trailer ", -1)]]),
						_: 1
					})) : m("", !0),
					v(s, {
						variant: "ghost",
						class: b(["media-detail__favorite", { "is-active": j.value }]),
						"left-icon": j.value ? "bookmark" : "bookmark-plus",
						"aria-label": j.value ? T(y)("itemActions.removeFavorite") : T(y)("itemActions.addFavorite"),
						"aria-pressed": j.value ? "true" : "false",
						onClick: Tt
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
						onClick: Ot
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
						level: Et.value,
						onCycle: Ft
					}, null, 8, ["level"]),
					J.value && !Z.value ? (x(), h("div", Ge, [v(c, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: en.value,
						label: tn.value,
						pressed: !X.value,
						onClick: rn
					}, null, 8, [
						"name",
						"label",
						"pressed"
					]), v(c, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: "x",
						label: T(y)("player.themeStop"),
						onClick: an
					}, null, 8, ["label"])])) : m("", !0),
					v(ie, {
						open: N.value,
						"onUpdate:open": n[3] ||= (e) => N.value = e,
						items: Mt.value,
						onSelect: Pt
					}, {
						default: D(({ toggle: e }) => [v(c, {
							variant: "ghost",
							name: "more",
							label: "More actions",
							"aria-expanded": N.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: ve(e, ["stop", "prevent"])
						}, null, 8, ["aria-expanded", "onClick"])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (x(), p(s, {
						key: 3,
						variant: "outline",
						"left-icon": "search",
						onClick: n[4] ||= (t) => k("match", e.item)
					}, {
						default: D(() => [...n[16] ||= [_("Match metadata", -1)]]),
						_: 1
					})) : m("", !0)
				]),
				At.value.length ? (x(), h("div", Ke, [n[17] ||= g("span", { class: "media-detail__links-label" }, "Links", -1), g("div", qe, [(x(!0), h(d, null, C(At.value, (e) => (x(), h("a", {
					key: e.key,
					class: "media-detail__link",
					href: T(u)(e.url),
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `Open on ${e.label} (opens in a new tab)`
				}, [g("span", null, w(e.label), 1), v(o, {
					name: "arrow-right",
					class: "media-detail__link-icon",
					"aria-hidden": "true"
				})], 8, Je))), 128))])])) : m("", !0),
				I.value.length || F.value.length ? (x(), h("div", Ye, [I.value.length ? (x(), h("section", Xe, [n[18] ||= g("h2", { class: "media-detail__credit-heading" }, "Crew", -1), g("ul", Ze, [(x(!0), h(d, null, C(I.value, (t, n) => (x(), h("li", { key: `crew-${n}-${t.name}` }, [g("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show titles with ${t.name}` : void 0,
					onClick: (n) => e.chipsClickable && k("actor", t.name)
				}, [
					g("span", $e, [t.profileUrl ? (x(), h("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: T(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, et)) : (x(), h("span", tt, w(Rt(t.name)), 1))]),
					g("span", nt, w(t.name), 1),
					t.sub ? (x(), h("span", rt, w(t.sub), 1)) : m("", !0)
				], 8, Qe)]))), 128))])])) : m("", !0), F.value.length ? (x(), h("section", it, [n[19] ||= g("h2", { class: "media-detail__credit-heading" }, "Cast", -1), g("ul", at, [(x(!0), h(d, null, C(F.value, (t, n) => (x(), h("li", { key: `cast-${n}-${t.name}` }, [g("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show titles with ${t.name}` : void 0,
					onClick: (n) => e.chipsClickable && k("actor", t.name)
				}, [
					g("span", st, [t.profileUrl ? (x(), h("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: T(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ct)) : (x(), h("span", lt, w(Rt(t.name)), 1))]),
					g("span", ut, w(t.name), 1),
					t.sub ? (x(), h("span", dt, w(t.sub), 1)) : m("", !0)
				], 8, ot)]))), 128))])])) : m("", !0)])) : m("", !0)
			])]),
			e.item.files?.length ? (x(), h("section", ft, [n[20] ||= g("h2", { class: "media-detail__files-heading" }, "Files", -1), g("ul", pt, [(x(!0), h(d, null, C(e.item.files, (e, t) => (x(), h("li", {
				key: t,
				class: "media-detail__file"
			}, [g("span", mt, w(e.path), 1), g("span", ht, [
				e.container ? (x(), h("span", gt, w(e.container), 1)) : m("", !0),
				e.resolution ? (x(), h("span", _t, w(e.resolution), 1)) : m("", !0),
				g("span", vt, w(Bt(e.size_bytes)), 1)
			])]))), 128))])])) : m("", !0),
			e.similarLoading || e.similar.length ? (x(), p(oe, {
				key: 4,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: n[5] ||= (e) => k("play", e),
				onWatchlist: n[6] ||= (e) => k("watchlist", e),
				onInfo: n[7] ||= (e) => k("info", e)
			}, null, 8, ["items", "loading"])) : m("", !0),
			B.value ? (x(), p(ae, {
				key: 5,
				modelValue: V.value,
				"onUpdate:modelValue": n[8] ||= (e) => V.value = e,
				title: `Trailer — ${e.item.name}`,
				size: "lg"
			}, {
				default: D(() => [g("div", yt, [g("iframe", {
					class: "media-detail__trailer-iframe",
					src: B.value,
					title: `${e.item.name} trailer`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, bt)])]),
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
}), k = /* @__PURE__ */ e({ default: () => A }), A = /*#__PURE__*/ re(O, [["__scopeId", "data-v-316982cd"]]);
export { k as n, A as t };

//# sourceMappingURL=MediaDetail-BkA4Tw-8.js.map