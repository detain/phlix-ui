import { t as e } from "./rolldown-runtime-CGnMp29N.js";
import { t } from "./mediaTypeIcon-CNNqtg-w.js";
import { n, r } from "./useApiBase-DXTBY90j.js";
import { t as i } from "./useImageSrc-CSM61b-l.js";
import { n as a, t as ee } from "./ThumbRating-CHBeIZgN.js";
import { t as te } from "./useAuthStore-D2ZmuYZO.js";
import { t as ne } from "./useToastStore-Bu-iYU7r.js";
import { n as re, t as o } from "./Icon-CIbfiPrs.js";
import { t as s } from "./Button-1sKEdGjj.js";
import { t as c } from "./IconButton-Cp0n7kCc.js";
import { t as ie } from "./Menu-BKtnfxz4.js";
import { t as ae } from "./Modal-BU4hJGBA.js";
import { t as l } from "./Chip-DC0SQtfn.js";
import { t as oe } from "./MediaRow-S6mXdgYK.js";
import { a as se, i as ce, n as le } from "./MediaCard-BUj4DLfQ.js";
import { t as ue } from "./client-57OweUrJ.js";
import { a as de } from "./plural-B3O2rVPV.js";
import { t as u } from "./safeHref-CxjNgvYf.js";
import { t as fe } from "./useMessages-DrceiftD.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as pe, nextTick as me, normalizeClass as b, normalizeStyle as he, onBeforeUnmount as ge, onMounted as _e, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, watch as E, withCtx as D, withModifiers as ve } from "vue";
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
}, ze = { class: "media-detail__company-list" }, Be = ["src", "alt"], Ve = { class: "media-detail__overview" }, He = { class: "media-detail__actions" }, Ue = { class: "media-detail__resume-at numeric" }, We = {
	key: 2,
	class: "media-detail__theme"
}, Ge = {
	key: 4,
	class: "media-detail__links"
}, Ke = { class: "media-detail__links-list" }, qe = ["href", "aria-label"], Je = {
	key: 5,
	class: "media-detail__credits"
}, Ye = {
	key: 0,
	class: "media-detail__credit-group"
}, Xe = { class: "media-detail__people" }, Ze = [
	"disabled",
	"aria-label",
	"onClick"
], Qe = { class: "media-detail__avatar" }, $e = ["src", "alt"], et = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, tt = { class: "media-detail__person-name" }, nt = {
	key: 0,
	class: "media-detail__person-sub"
}, rt = {
	key: 1,
	class: "media-detail__credit-group"
}, it = { class: "media-detail__people" }, at = [
	"disabled",
	"aria-label",
	"onClick"
], ot = { class: "media-detail__avatar" }, st = ["src", "alt"], ct = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, lt = { class: "media-detail__person-name" }, ut = {
	key: 0,
	class: "media-detail__person-sub"
}, dt = {
	key: 3,
	class: "media-detail__files"
}, ft = { class: "media-detail__files-list" }, pt = { class: "media-detail__file-path" }, mt = { class: "media-detail__file-meta" }, ht = {
	key: 0,
	class: "media-detail__file-container"
}, gt = {
	key: 1,
	class: "media-detail__file-resolution"
}, _t = { class: "media-detail__file-size" }, vt = { class: "media-detail__trailer-embed" }, yt = ["src", "title"], bt = "phlix.theme.muted", xt = .35, O = /*@__PURE__*/ y({
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
		let { t: y } = fe(), O = e, k = re, A = a(), St = pe("phlixConfig", null), Ct = te(), j = f(() => A.isFavorite(O.item.id));
		function wt() {
			A.toggleFavorite(O.item.id, W.value), k("watchlist", O.item);
		}
		let Tt = f(() => A.likeLevel(O.item.id)), Et = f(() => Ct.isAdmin), M = f(() => A.isWatched(O.item.id));
		function Dt() {
			A.toggleWatched(O.item.id, W.value), k("mark-watched", O.item);
		}
		let Ot = {
			movie: "movie",
			series: "tv",
			season: "tv",
			episode: "tv"
		}, kt = f(() => {
			let e = O.item.external_ids;
			if (!e) return [];
			let t = Ot[O.item.type], n = {
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
		}), N = S(!1), P = S(!1), At = f(() => O.item.type === "series" || O.item.type === "season"), jt = f(() => se(O.item, {
			isAdmin: Et.value,
			isWatched: M.value,
			isSeriesOrSeason: At.value,
			canChoosePoster: Et.value
		}));
		function Mt(e) {
			let t = ce, n = ne();
			switch (e.label) {
				case t.markWatched:
				case t.markUnwatched:
					Dt();
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
					K().shufflePlay(O.item.id).then(() => n.success("Shuffle play started.")).catch((e) => {
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
		function Nt(e) {
			A.setLike(O.item.id, e, W.value);
		}
		let Pt = f(() => t(O.item.type)), F = f(() => {
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
		}), Ft = f(() => {
			let e = O.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : O.item.studio ? [{
				name: O.item.studio,
				logoUrl: null
			}] : [];
		});
		function It(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let Lt = f(() => {
			let e = O.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function Rt(e) {
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
		let L = S(!1), zt = S(null);
		function Bt() {
			L.value = !0;
		}
		_e(() => {
			zt.value?.complete && (L.value = !0);
		});
		let R = f(() => O.item.backdrop_url_large || O.item.backdrop_url || null), Vt = f(() => O.item.backdrop_srcset || null), z = S(!1);
		function Ht() {
			z.value = !0;
		}
		E(R, () => {
			z.value = !1;
		});
		let Ut = f(() => !!O.item.trailer_url), Wt = /^[A-Za-z0-9_-]{1,20}$/, B = f(() => {
			let e = O.item.trailer_site, t = O.item.trailer_key;
			return e !== "YouTube" || !t || !Wt.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), V = S(!1);
		function Gt() {
			if (B.value) {
				V.value = !0;
				return;
			}
			let e = O.item.trailer_url ? u(O.item.trailer_url) : void 0;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let H = f(() => O.item.logo_url || null), U = S(!1);
		function Kt() {
			U.value = !0;
		}
		let qt = f(() => !!H.value && !U.value);
		E(H, () => {
			U.value = !1;
		});
		let W = n(), G = null;
		function K() {
			return G ? G.setBaseUrl(W.value) : G = new ue({ baseUrl: W.value }), G;
		}
		let { imgSrc: q, imgSrcset: Jt } = i(), Yt = r(), J = f(() => {
			let e = O.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${Yt.value || W.value || (St?.apiBase ?? "")}${e}` : null;
		});
		function Xt() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(bt) !== "false";
			} catch {
				return !0;
			}
		}
		function Zt(e) {
			if (typeof localStorage < "u") try {
				localStorage.setItem(bt, e ? "true" : "false");
			} catch {}
		}
		let Y = S(null), X = S(Xt()), Z = S(!1), Qt = f(() => X.value ? "mute" : "volume"), $t = f(() => X.value ? y("player.themeUnmute") : y("player.themeMute"));
		function en() {
			let e = Y.value;
			e && (e.muted = X.value, e.volume = X.value ? 0 : xt);
		}
		function Q() {
			let e = Y.value;
			e && !Z.value && (en(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = Y.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function tn() {
			X.value = !X.value, Zt(X.value), en(), X.value || Q();
		}
		function nn() {
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
		}), (t, n) => (x(), h("article", ye, [
			R.value ? (x(), h("div", be, [g("img", {
				class: b(["media-detail__backdrop-img", { "is-loaded": z.value }]),
				src: T(q)(R.value),
				srcset: T(Jt)(Vt.value) || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: Ht
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
				style: he({ backgroundImage: `url(${T(q)(e.item.poster_url)})` }),
				"aria-hidden": "true"
			}, null, 4), R.value ? m("", !0) : (x(), h("div", Ce))], 64)) : m("", !0),
			g("div", we, [e.showBack ? (x(), p(s, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: n[0] ||= (e) => k("back")
			}, {
				default: D(() => [...n[11] ||= [_("Back", -1)]]),
				_: 1
			})) : m("", !0)]),
			g("div", Te, [g("div", Ee, [e.item.poster_url ? (x(), h("img", {
				key: 0,
				ref_key: "imgEl",
				ref: zt,
				class: b(["media-detail__img", { "is-loaded": L.value }]),
				src: T(q)(e.item.poster_url),
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: Bt
			}, null, 42, De)) : (x(), h("div", Oe, [v(o, { name: Pt.value }, null, 8, ["name"])]))]), g("div", ke, [
				qt.value ? (x(), h("img", {
					key: 0,
					class: "media-detail__logo",
					src: T(q)(H.value),
					alt: e.item.name,
					decoding: "async",
					onError: Kt
				}, null, 40, Ae)) : (x(), h("h1", je, w(e.item.name), 1)),
				g("div", Me, [
					e.item.year ? (x(), h("span", Ne, [v(o, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), _(w(e.item.year), 1)])) : m("", !0),
					e.item.rating ? (x(), h("span", Pe, w(e.item.rating), 1)) : m("", !0),
					e.item.runtime ? (x(), h("span", Fe, w(e.item.runtime) + "m", 1)) : m("", !0),
					g("span", Ie, w(e.item.type), 1)
				]),
				e.item.genres?.length ? (x(), h("div", Le, [(x(!0), h(d, null, C(e.item.genres, (t) => (x(), p(l, {
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
				Ft.value.length ? (x(), h("div", Re, [n[12] ||= g("span", { class: "media-detail__companies-label" }, "Studios", -1), g("div", ze, [(x(!0), h(d, null, C(Ft.value, (t) => (x(), p(l, {
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
					}, null, 8, Be)) : m("", !0), g("span", null, w(t.name), 1)]),
					_: 2
				}, 1032, [
					"disabled",
					"aria-label",
					"onClick"
				]))), 128))])])) : m("", !0),
				g("p", Ve, w(e.item.overview || "No overview available."), 1),
				g("div", He, [
					v(s, {
						variant: "solid",
						"left-icon": "play",
						onClick: n[1] ||= (t) => k("play", e.item)
					}, {
						default: D(() => [...n[13] ||= [_("Play", -1)]]),
						_: 1
					}),
					Lt.value ? (x(), p(s, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: n[2] ||= (t) => k("resume", e.item)
					}, {
						default: D(() => [n[14] ||= _(" Resume ", -1), g("span", Ue, w(Lt.value), 1)]),
						_: 1
					})) : m("", !0),
					Ut.value ? (x(), p(s, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: Gt
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
						onClick: wt
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
						onClick: Dt
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
						level: Tt.value,
						onCycle: Nt
					}, null, 8, ["level"]),
					J.value && !Z.value ? (x(), h("div", We, [v(c, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: Qt.value,
						label: $t.value,
						pressed: !X.value,
						onClick: tn
					}, null, 8, [
						"name",
						"label",
						"pressed"
					]), v(c, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: "x",
						label: T(y)("player.themeStop"),
						onClick: nn
					}, null, 8, ["label"])])) : m("", !0),
					v(ie, {
						open: N.value,
						"onUpdate:open": n[3] ||= (e) => N.value = e,
						items: jt.value,
						onSelect: Mt
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
				kt.value.length ? (x(), h("div", Ge, [n[17] ||= g("span", { class: "media-detail__links-label" }, "Links", -1), g("div", Ke, [(x(!0), h(d, null, C(kt.value, (e) => (x(), h("a", {
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
				})], 8, qe))), 128))])])) : m("", !0),
				I.value.length || F.value.length ? (x(), h("div", Je, [I.value.length ? (x(), h("section", Ye, [n[18] ||= g("h2", { class: "media-detail__credit-heading" }, "Crew", -1), g("ul", Xe, [(x(!0), h(d, null, C(I.value, (t, n) => (x(), h("li", { key: `crew-${n}-${t.name}` }, [g("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show titles with ${t.name}` : void 0,
					onClick: (n) => e.chipsClickable && k("actor", t.name)
				}, [
					g("span", Qe, [t.profileUrl ? (x(), h("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: T(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, $e)) : (x(), h("span", et, w(It(t.name)), 1))]),
					g("span", tt, w(t.name), 1),
					t.sub ? (x(), h("span", nt, w(t.sub), 1)) : m("", !0)
				], 8, Ze)]))), 128))])])) : m("", !0), F.value.length ? (x(), h("section", rt, [n[19] ||= g("h2", { class: "media-detail__credit-heading" }, "Cast", -1), g("ul", it, [(x(!0), h(d, null, C(F.value, (t, n) => (x(), h("li", { key: `cast-${n}-${t.name}` }, [g("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show titles with ${t.name}` : void 0,
					onClick: (n) => e.chipsClickable && k("actor", t.name)
				}, [
					g("span", ot, [t.profileUrl ? (x(), h("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: T(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, st)) : (x(), h("span", ct, w(It(t.name)), 1))]),
					g("span", lt, w(t.name), 1),
					t.sub ? (x(), h("span", ut, w(t.sub), 1)) : m("", !0)
				], 8, at)]))), 128))])])) : m("", !0)])) : m("", !0)
			])]),
			e.item.files?.length ? (x(), h("section", dt, [n[20] ||= g("h2", { class: "media-detail__files-heading" }, "Files", -1), g("ul", ft, [(x(!0), h(d, null, C(e.item.files, (e, t) => (x(), h("li", {
				key: t,
				class: "media-detail__file"
			}, [g("span", pt, w(e.path), 1), g("span", mt, [
				e.container ? (x(), h("span", ht, w(e.container), 1)) : m("", !0),
				e.resolution ? (x(), h("span", gt, w(e.resolution), 1)) : m("", !0),
				g("span", _t, w(Rt(e.size_bytes)), 1)
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
				default: D(() => [g("div", vt, [g("iframe", {
					class: "media-detail__trailer-iframe",
					src: B.value,
					title: `${e.item.name} trailer`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, yt)])]),
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
}), k = /* @__PURE__ */ e({ default: () => A }), A = /*#__PURE__*/ re(O, [["__scopeId", "data-v-ac9ce15b"]]);
export { k as n, A as t };

//# sourceMappingURL=MediaDetail-DKYilZjj.js.map