import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t, t as n } from "./Icon-CIwTuFLd.js";
import { t as r } from "./IconButton-y6A8Bq4D.js";
import { a as i } from "./plural-DMM7pLFA.js";
import { t as a } from "./useMessages-M5VcrfIX.js";
import { t as ee } from "./client-DdVqCKVh.js";
import { n as te, r as ne } from "./useApiBase-CV_r-Kk4.js";
import { t as re } from "./useAuthStore-Bi1-VYV4.js";
import { t as ie } from "./useImageSrc-KnN1T9Ga.js";
import { t as ae } from "./useToastStore-BDoKlU6N.js";
import { n as oe, t as se } from "./ThumbRating-B5EFc49E.js";
import { t as o } from "./safeHref-C9H0Sqte.js";
import { t as s } from "./Button-BuG0GvCa.js";
import { t as ce } from "./Chip-CYhlmz6l.js";
import { t as le } from "./Modal-9IqluoNm.js";
import { t as ue } from "./Menu-Dm56tG4N.js";
import { a as de, i as fe, n as pe } from "./MediaCard-r-S1rP4Q.js";
import { t as me } from "./mediaTypeIcon-Bde251Qi.js";
import { t as he } from "./MediaRow-iy9YTY0U.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ge, nextTick as _e, normalizeClass as _, normalizeStyle as ve, onBeforeUnmount as ye, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, watch as w, withCtx as T, withModifiers as be } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var xe = { class: "media-detail" }, Se = {
	key: 0,
	class: "media-detail__backdrop",
	"aria-hidden": "true"
}, Ce = ["src", "srcset"], we = ["src"], Te = {
	key: 0,
	class: "media-detail__ambient-scrim",
	"aria-hidden": "true"
}, Ee = { class: "media-detail__bar" }, De = { class: "media-detail__hero" }, Oe = { class: "media-detail__poster" }, ke = ["src", "alt"], Ae = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, je = { class: "media-detail__info" }, Me = ["src", "alt"], Ne = {
	key: 1,
	class: "media-detail__title"
}, Pe = { class: "media-detail__meta numeric" }, Fe = {
	key: 0,
	class: "media-detail__meta-item"
}, Ie = {
	key: 1,
	class: "media-detail__cert"
}, Le = {
	key: 2,
	class: "media-detail__meta-item"
}, Re = { class: "media-detail__type" }, ze = {
	key: 2,
	class: "media-detail__genres"
}, Be = {
	key: 3,
	class: "media-detail__companies"
}, Ve = { class: "media-detail__company-list" }, He = ["src", "alt"], Ue = { class: "media-detail__overview" }, We = { class: "media-detail__actions" }, Ge = { class: "media-detail__resume-at numeric" }, Ke = {
	key: 2,
	class: "media-detail__theme"
}, qe = {
	key: 4,
	class: "media-detail__links"
}, Je = { class: "media-detail__links-list" }, Ye = ["href", "aria-label"], Xe = {
	key: 5,
	class: "media-detail__credits"
}, Ze = {
	key: 0,
	class: "media-detail__credit-group"
}, Qe = { class: "media-detail__people" }, $e = [
	"disabled",
	"aria-label",
	"onClick"
], et = { class: "media-detail__avatar" }, tt = ["src", "alt"], nt = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, rt = { class: "media-detail__person-name" }, it = {
	key: 0,
	class: "media-detail__person-sub"
}, at = {
	key: 1,
	class: "media-detail__credit-group"
}, ot = { class: "media-detail__people" }, st = [
	"disabled",
	"aria-label",
	"onClick"
], ct = { class: "media-detail__avatar" }, lt = ["src", "alt"], ut = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, dt = { class: "media-detail__person-name" }, ft = {
	key: 0,
	class: "media-detail__person-sub"
}, pt = {
	key: 3,
	class: "media-detail__files"
}, mt = { class: "media-detail__files-list" }, ht = { class: "media-detail__file-path" }, gt = { class: "media-detail__file-meta" }, _t = {
	key: 0,
	class: "media-detail__file-container"
}, vt = {
	key: 1,
	class: "media-detail__file-resolution"
}, yt = { class: "media-detail__file-size" }, bt = { class: "media-detail__trailer-embed" }, xt = ["src", "title"], E = "phlix.theme.muted", St = .35, D = /*@__PURE__*/ g({
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
	setup(e, { emit: t }) {
		let { t: g } = a(), D = e, O = t, k = oe(), Ct = ge("phlixConfig", null), wt = re(), A = l(() => k.isFavorite(D.item.id));
		function Tt() {
			k.toggleFavorite(D.item.id, W.value), O("watchlist", D.item);
		}
		let Et = l(() => k.likeLevel(D.item.id)), j = l(() => wt.isAdmin), M = l(() => k.isWatched(D.item.id));
		function Dt() {
			k.toggleWatched(D.item.id, W.value), O("mark-watched", D.item);
		}
		let Ot = {
			movie: "movie",
			series: "tv",
			season: "tv",
			episode: "tv"
		}, kt = l(() => {
			let e = D.item.external_ids;
			if (!e) return [];
			let t = Ot[D.item.type], n = {
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
		}), N = b(!1), P = b(!1), At = l(() => D.item.type === "series" || D.item.type === "season"), jt = l(() => de(D.item, {
			isAdmin: j.value,
			isWatched: M.value,
			isSeriesOrSeason: At.value,
			canChoosePoster: j.value
		}));
		function Mt(e) {
			let t = fe, n = ae();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					Dt();
					break;
				case t.addToPlaylist:
					P.value = !0;
					break;
				case t.download:
					n.info("Preparing download…"), K().getDownloadUrl(D.item.id).then(({ url: e }) => {
						let t = o(e);
						if (!t) {
							n.error("Download blocked — unsafe link");
							return;
						}
						window.open(t, "_blank", "noopener"), n.success("Download started");
					}).catch((e) => {
						n.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					n.info("Loading…"), K().getMissingEpisodes(D.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success("No missing episodes") : n.warning(`${i(t, "episode", "episodes")} missing`);
					}).catch((e) => {
						n.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					K().shufflePlay(D.item.id).then(() => n.success("Shuffle play started")).catch((e) => {
						n.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					O("edit-metadata", D.item);
					break;
				case t.exploreData:
					O("explore-data", D.item);
					break;
				case t.matchMetadata:
					O("refresh", D.item);
					break;
				case t.editImages:
					O("choose-poster", D.item);
					break;
				case t.remove:
					O("remove", D.item);
					break;
				default: n.info(`${e.label} isn't available yet`);
			}
		}
		function Nt(e) {
			k.setLike(D.item.id, e, W.value);
		}
		let Pt = l(() => me(D.item.type)), F = l(() => {
			let e = D.item.cast;
			return e?.length ? e.slice(0, 12).map((e) => ({
				name: e.name,
				sub: e.role ?? null,
				profileUrl: e.profile_url ?? null
			})) : (D.item.actors ?? []).slice(0, 12).map((e) => ({
				name: e,
				sub: null,
				profileUrl: null
			}));
		}), I = l(() => {
			let e = D.item.crew;
			return e?.length ? e.slice(0, 8).map((e) => ({
				name: e.name,
				sub: e.job ?? null,
				profileUrl: e.profile_url ?? null
			})) : D.item.director ? [{
				name: D.item.director,
				sub: "Director",
				profileUrl: null
			}] : [];
		}), Ft = l(() => {
			let e = D.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : D.item.studio ? [{
				name: D.item.studio,
				logoUrl: null
			}] : [];
		});
		function It(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let Lt = l(() => {
			let e = D.resumeSeconds;
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
		let L = b(!1), zt = b(null);
		function Bt() {
			L.value = !0;
		}
		v(() => {
			zt.value?.complete && (L.value = !0);
		});
		let R = l(() => D.item.backdrop_url_large || D.item.backdrop_url || null), Vt = l(() => D.item.backdrop_srcset || null), z = b(!1);
		function Ht() {
			z.value = !0;
		}
		w(R, () => {
			z.value = !1;
		});
		let Ut = l(() => !!D.item.trailer_url), Wt = /^[A-Za-z0-9_-]{1,20}$/, B = l(() => {
			let e = D.item.trailer_site, t = D.item.trailer_key;
			return e !== "YouTube" || !t || !Wt.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), V = b(!1);
		function Gt() {
			if (B.value) {
				V.value = !0;
				return;
			}
			let e = D.item.trailer_url ? o(D.item.trailer_url) : void 0;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let H = l(() => D.item.logo_url || null), U = b(!1);
		function Kt() {
			U.value = !0;
		}
		let qt = l(() => !!H.value && !U.value);
		w(H, () => {
			U.value = !1;
		});
		let W = te(), G = null;
		function K() {
			return G ? G.setBaseUrl(W.value) : G = new ee({ baseUrl: W.value }), G;
		}
		let { imgSrc: q, imgSrcset: Jt } = ie(), Yt = ne(), J = l(() => {
			let e = D.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${Yt.value || W.value || (Ct?.apiBase ?? "")}${e}` : null;
		});
		function Xt() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(E) !== "false";
			} catch {
				return !0;
			}
		}
		function Zt(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(E, e ? "true" : "false");
			} catch {}
		}
		let Y = b(null), X = b(Xt()), Z = b(!1), Qt = l(() => X.value ? "mute" : "volume"), $t = l(() => X.value ? g("player.themeUnmute") : g("player.themeMute"));
		function en() {
			let e = Y.value;
			e && (e.muted = X.value, e.volume = X.value ? 0 : St);
		}
		function Q() {
			let e = Y.value;
			!e || Z.value || (en(), e.play()?.catch(() => {}));
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
		return v(() => {
			J.value && Q();
		}), w(J, (e, t) => {
			e !== t && ($(), Z.value = !1, e && _e(() => {
				J.value && Q();
			}));
		}), ye(() => {
			$();
		}), (t, i) => (y(), f("article", xe, [
			R.value ? (y(), f("div", Se, [p("img", {
				class: _(["media-detail__backdrop-img", { "is-loaded": z.value }]),
				src: C(q)(R.value),
				srcset: C(Jt)(Vt.value) || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: Ht
			}, null, 42, Ce), i[10] ||= p("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : d("", !0),
			J.value ? (y(), f("audio", {
				key: 1,
				ref_key: "themeAudioEl",
				ref: Y,
				src: J.value,
				class: "media-detail__theme-audio",
				loop: "",
				preload: "auto",
				"aria-hidden": "true",
				tabindex: "-1"
			}, null, 8, we)) : d("", !0),
			e.item.poster_url ? (y(), f(c, { key: 2 }, [p("div", {
				class: "media-detail__ambient",
				style: ve({ backgroundImage: `url(${C(q)(e.item.poster_url)})` }),
				"aria-hidden": "true"
			}, null, 4), R.value ? d("", !0) : (y(), f("div", Te))], 64)) : d("", !0),
			p("div", Ee, [e.showBack ? (y(), u(s, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: i[0] ||= (e) => O("back")
			}, {
				default: T(() => [...i[11] ||= [m("Back", -1)]]),
				_: 1
			})) : d("", !0)]),
			p("div", De, [p("div", Oe, [e.item.poster_url ? (y(), f("img", {
				key: 0,
				ref_key: "imgEl",
				ref: zt,
				class: _(["media-detail__img", { "is-loaded": L.value }]),
				src: C(q)(e.item.poster_url),
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: Bt
			}, null, 42, ke)) : (y(), f("div", Ae, [h(n, { name: Pt.value }, null, 8, ["name"])]))]), p("div", je, [
				qt.value ? (y(), f("img", {
					key: 0,
					class: "media-detail__logo",
					src: C(q)(H.value),
					alt: e.item.name,
					decoding: "async",
					onError: Kt
				}, null, 40, Me)) : (y(), f("h1", Ne, S(e.item.name), 1)),
				p("div", Pe, [
					e.item.year ? (y(), f("span", Fe, [h(n, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), m(S(e.item.year), 1)])) : d("", !0),
					e.item.rating ? (y(), f("span", Ie, S(e.item.rating), 1)) : d("", !0),
					e.item.runtime ? (y(), f("span", Le, S(e.item.runtime) + "m", 1)) : d("", !0),
					p("span", Re, S(e.item.type), 1)
				]),
				e.item.genres?.length ? (y(), f("div", ze, [(y(!0), f(c, null, x(e.item.genres, (t) => (y(), u(ce, {
					key: t,
					size: "sm",
					class: "media-detail__genre",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show ${t} titles` : void 0,
					onClick: (e) => O("genre", t)
				}, {
					default: T(() => [m(S(t), 1)]),
					_: 2
				}, 1032, [
					"disabled",
					"aria-label",
					"onClick"
				]))), 128))])) : d("", !0),
				Ft.value.length ? (y(), f("div", Be, [i[12] ||= p("span", { class: "media-detail__companies-label" }, "Studios", -1), p("div", Ve, [(y(!0), f(c, null, x(Ft.value, (t) => (y(), u(ce, {
					key: t.name,
					size: "sm",
					class: "media-detail__company",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show ${t.name} titles` : void 0,
					onClick: (e) => O("company", t.name)
				}, {
					default: T(() => [t.logoUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: C(q)(t.logoUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, He)) : d("", !0), p("span", null, S(t.name), 1)]),
					_: 2
				}, 1032, [
					"disabled",
					"aria-label",
					"onClick"
				]))), 128))])])) : d("", !0),
				p("p", Ue, S(e.item.overview || "No overview available."), 1),
				p("div", We, [
					h(s, {
						variant: "solid",
						"left-icon": "play",
						onClick: i[1] ||= (t) => O("play", e.item)
					}, {
						default: T(() => [...i[13] ||= [m("Play", -1)]]),
						_: 1
					}),
					Lt.value ? (y(), u(s, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: i[2] ||= (t) => O("resume", e.item)
					}, {
						default: T(() => [i[14] ||= m(" Resume ", -1), p("span", Ge, S(Lt.value), 1)]),
						_: 1
					})) : d("", !0),
					Ut.value ? (y(), u(s, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: Gt
					}, {
						default: T(() => [...i[15] ||= [m(" Play Trailer ", -1)]]),
						_: 1
					})) : d("", !0),
					h(s, {
						variant: "ghost",
						class: _(["media-detail__favorite", { "is-active": A.value }]),
						"left-icon": A.value ? "bookmark" : "bookmark-plus",
						"aria-label": A.value ? C(g)("itemActions.removeFavorite") : C(g)("itemActions.addFavorite"),
						"aria-pressed": A.value ? "true" : "false",
						onClick: Tt
					}, {
						default: T(() => [m(S(A.value ? C(g)("itemActions.inFavorites") : C(g)("itemActions.watchlist")), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(s, {
						variant: "ghost",
						class: _(["media-detail__watched", { "is-active": M.value }]),
						"left-icon": M.value ? "eye" : "eye-off",
						"aria-label": M.value ? C(g)("itemActions.markUnwatchedAria") : C(g)("itemActions.markWatchedAria"),
						"aria-pressed": M.value ? "true" : "false",
						onClick: Dt
					}, {
						default: T(() => [m(S(M.value ? C(g)("itemActions.watched") : C(g)("itemActions.markWatched")), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(se, {
						level: Et.value,
						onCycle: Nt
					}, null, 8, ["level"]),
					J.value && !Z.value ? (y(), f("div", Ke, [h(r, {
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
					]), h(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: "x",
						label: C(g)("player.themeStop"),
						onClick: nn
					}, null, 8, ["label"])])) : d("", !0),
					h(ue, {
						open: N.value,
						"onUpdate:open": i[3] ||= (e) => N.value = e,
						items: jt.value,
						onSelect: Mt
					}, {
						default: T(({ toggle: e }) => [h(r, {
							variant: "ghost",
							name: "more",
							label: "More actions",
							"aria-expanded": N.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: be(e, ["stop", "prevent"])
						}, null, 8, ["aria-expanded", "onClick"])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (y(), u(s, {
						key: 3,
						variant: "outline",
						"left-icon": "search",
						onClick: i[4] ||= (t) => O("match", e.item)
					}, {
						default: T(() => [...i[16] ||= [m("Match metadata", -1)]]),
						_: 1
					})) : d("", !0)
				]),
				kt.value.length ? (y(), f("div", qe, [i[17] ||= p("span", { class: "media-detail__links-label" }, "Links", -1), p("div", Je, [(y(!0), f(c, null, x(kt.value, (e) => (y(), f("a", {
					key: e.key,
					class: "media-detail__link",
					href: C(o)(e.url),
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `Open on ${e.label} (opens in a new tab)`
				}, [p("span", null, S(e.label), 1), h(n, {
					name: "arrow-right",
					class: "media-detail__link-icon",
					"aria-hidden": "true"
				})], 8, Ye))), 128))])])) : d("", !0),
				I.value.length || F.value.length ? (y(), f("div", Xe, [I.value.length ? (y(), f("section", Ze, [i[18] ||= p("h2", { class: "media-detail__credit-heading" }, "Crew", -1), p("ul", Qe, [(y(!0), f(c, null, x(I.value, (t, n) => (y(), f("li", { key: `crew-${n}-${t.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show titles with ${t.name}` : void 0,
					onClick: (n) => e.chipsClickable && O("actor", t.name)
				}, [
					p("span", et, [t.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: C(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, tt)) : (y(), f("span", nt, S(It(t.name)), 1))]),
					p("span", rt, S(t.name), 1),
					t.sub ? (y(), f("span", it, S(t.sub), 1)) : d("", !0)
				], 8, $e)]))), 128))])])) : d("", !0), F.value.length ? (y(), f("section", at, [i[19] ||= p("h2", { class: "media-detail__credit-heading" }, "Cast", -1), p("ul", ot, [(y(!0), f(c, null, x(F.value, (t, n) => (y(), f("li", { key: `cast-${n}-${t.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show titles with ${t.name}` : void 0,
					onClick: (n) => e.chipsClickable && O("actor", t.name)
				}, [
					p("span", ct, [t.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: C(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, lt)) : (y(), f("span", ut, S(It(t.name)), 1))]),
					p("span", dt, S(t.name), 1),
					t.sub ? (y(), f("span", ft, S(t.sub), 1)) : d("", !0)
				], 8, st)]))), 128))])])) : d("", !0)])) : d("", !0)
			])]),
			e.item.files?.length ? (y(), f("section", pt, [i[20] ||= p("h2", { class: "media-detail__files-heading" }, "Files", -1), p("ul", mt, [(y(!0), f(c, null, x(e.item.files, (e, t) => (y(), f("li", {
				key: t,
				class: "media-detail__file"
			}, [p("span", ht, S(e.path), 1), p("span", gt, [
				e.container ? (y(), f("span", _t, S(e.container), 1)) : d("", !0),
				e.resolution ? (y(), f("span", vt, S(e.resolution), 1)) : d("", !0),
				p("span", yt, S(Rt(e.size_bytes)), 1)
			])]))), 128))])])) : d("", !0),
			e.similarLoading || e.similar.length ? (y(), u(he, {
				key: 4,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: i[5] ||= (e) => O("play", e),
				onWatchlist: i[6] ||= (e) => O("watchlist", e),
				onInfo: i[7] ||= (e) => O("info", e)
			}, null, 8, ["items", "loading"])) : d("", !0),
			B.value ? (y(), u(le, {
				key: 5,
				modelValue: V.value,
				"onUpdate:modelValue": i[8] ||= (e) => V.value = e,
				title: `Trailer — ${e.item.name}`,
				size: "lg"
			}, {
				default: T(() => [p("div", bt, [p("iframe", {
					class: "media-detail__trailer-iframe",
					src: B.value,
					title: `${e.item.name} trailer`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, xt)])]),
				_: 1
			}, 8, ["modelValue", "title"])) : d("", !0),
			P.value ? (y(), u(pe, {
				key: 6,
				"model-value": !0,
				item: e.item,
				"onUpdate:modelValue": i[9] ||= (e) => P.value = !1
			}, null, 8, ["item"])) : d("", !0)
		]));
	}
}), O = /* @__PURE__ */ e({ default: () => k }), k = /*#__PURE__*/ t(D, [["__scopeId", "data-v-1a133920"]]);
//#endregion
export { O as n, k as t };

//# sourceMappingURL=MediaDetail-BAuw1JlX.js.map