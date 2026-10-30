import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t, t as n } from "./Icon-CIwTuFLd.js";
import { t as r } from "./IconButton-y6A8Bq4D.js";
import { a as i } from "./plural-DMM7pLFA.js";
import { t as a } from "./useMessages-CiSCI5Ag.js";
import { i as o } from "./client-BUSsKK6G.js";
import { n as ee, r as te } from "./useApiBase-CV_r-Kk4.js";
import { t as ne } from "./useAuthStore-DVJ7E4Ri.js";
import { t as re } from "./useImageSrc-KnN1T9Ga.js";
import { t as ie } from "./useToastStore-BDoKlU6N.js";
import { n as ae, t as oe } from "./ThumbRating-CAJtPr7h.js";
import { t as s } from "./safeHref-C9H0Sqte.js";
import { t as c } from "./Button-BuG0GvCa.js";
import { t as se } from "./Chip-CYhlmz6l.js";
import { t as ce } from "./Modal-BDkw7NP1.js";
import { t as le } from "./Menu-Dm56tG4N.js";
import { a as ue, i as de, n as fe } from "./MediaCard-B-f7KTHE.js";
import { t as pe } from "./mediaTypeIcon-Bde251Qi.js";
import { t as me } from "./MediaRow-BmPNWgGy.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as he, nextTick as ge, normalizeClass as v, normalizeStyle as _e, onBeforeUnmount as ve, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, unref as w, watch as T, withCtx as E, withModifiers as ye } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
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
}, vt = { class: "media-detail__file-size" }, yt = { class: "media-detail__trailer-embed" }, bt = ["src", "title"], D = "phlix.theme.muted", xt = .35, O = /*@__PURE__*/ _({
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
		let { t: _ } = a(), O = e, k = t, A = ae(), j = he("phlixConfig", null), St = ne(), M = u(() => A.isFavorite(O.item.id));
		function Ct() {
			A.toggleFavorite(O.item.id, j?.apiBase ?? ""), k("watchlist", O.item);
		}
		let wt = u(() => A.likeLevel(O.item.id)), N = u(() => St.isAdmin), P = u(() => A.isWatched(O.item.id));
		function F() {
			A.toggleWatched(O.item.id, j?.apiBase ?? ""), k("mark-watched", O.item);
		}
		let Tt = {
			movie: "movie",
			series: "tv",
			season: "tv",
			episode: "tv"
		}, Et = u(() => {
			let e = O.item.external_ids;
			if (!e) return [];
			let t = Tt[O.item.type], n = {
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
		}), I = x(!1), L = x(!1), Dt = u(() => O.item.type === "series" || O.item.type === "season"), Ot = u(() => ue(O.item, {
			isAdmin: N.value,
			isWatched: P.value,
			isSeriesOrSeason: Dt.value,
			canChoosePoster: N.value
		}));
		function kt(e) {
			let t = de, n = ie();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					F();
					break;
				case t.addToPlaylist:
					L.value = !0;
					break;
				case t.download:
					n.info("Preparing download…"), o.getDownloadUrl(O.item.id).then(({ url: e }) => {
						let t = s(e);
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
					n.info("Loading…"), o.getMissingEpisodes(O.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success("No missing episodes") : n.warning(`${i(t, "episode", "episodes")} missing`);
					}).catch((e) => {
						n.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					o.shufflePlay(O.item.id).then(() => n.success("Shuffle play started")).catch((e) => {
						n.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
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
				default: n.info(`${e.label} isn't available yet`);
			}
		}
		function At(e) {
			A.setLike(O.item.id, e, j?.apiBase ?? "");
		}
		let jt = u(() => pe(O.item.type)), R = u(() => {
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
		}), z = u(() => {
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
		}), Mt = u(() => {
			let e = O.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : O.item.studio ? [{
				name: O.item.studio,
				logoUrl: null
			}] : [];
		});
		function Nt(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let Pt = u(() => {
			let e = O.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function Ft(e) {
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
		let B = x(!1), It = x(null);
		function Lt() {
			B.value = !0;
		}
		y(() => {
			It.value?.complete && (B.value = !0);
		});
		let V = u(() => O.item.backdrop_url_large || O.item.backdrop_url || null), Rt = u(() => O.item.backdrop_srcset || null), H = x(!1);
		function zt() {
			H.value = !0;
		}
		T(V, () => {
			H.value = !1;
		});
		let Bt = u(() => !!O.item.trailer_url), Vt = /^[A-Za-z0-9_-]{1,20}$/, U = u(() => {
			let e = O.item.trailer_site, t = O.item.trailer_key;
			return e !== "YouTube" || !t || !Vt.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), W = x(!1);
		function Ht() {
			if (U.value) {
				W.value = !0;
				return;
			}
			let e = O.item.trailer_url ? s(O.item.trailer_url) : void 0;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let G = u(() => O.item.logo_url || null), K = x(!1);
		function Ut() {
			K.value = !0;
		}
		let Wt = u(() => !!G.value && !K.value);
		T(G, () => {
			K.value = !1;
		});
		let Gt = ee(), { imgSrc: q, imgSrcset: Kt } = re(), qt = te(), J = u(() => {
			let e = O.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${qt.value || Gt.value || (j?.apiBase ?? "")}${e}` : null;
		});
		function Jt() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(D) !== "false";
			} catch {
				return !0;
			}
		}
		function Yt(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(D, e ? "true" : "false");
			} catch {}
		}
		let Y = x(null), X = x(Jt()), Z = x(!1), Xt = u(() => X.value ? "mute" : "volume"), Zt = u(() => X.value ? _("player.themeUnmute") : _("player.themeMute"));
		function Qt() {
			let e = Y.value;
			e && (e.muted = X.value, e.volume = X.value ? 0 : xt);
		}
		function Q() {
			let e = Y.value;
			!e || Z.value || (Qt(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = Y.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function $t() {
			X.value = !X.value, Yt(X.value), Qt(), X.value || Q();
		}
		function en() {
			Z.value = !0, $();
		}
		return y(() => {
			J.value && Q();
		}), T(J, (e, t) => {
			e !== t && ($(), Z.value = !1, e && ge(() => {
				J.value && Q();
			}));
		}), ve(() => {
			$();
		}), (t, i) => (b(), p("article", be, [
			V.value ? (b(), p("div", xe, [m("img", {
				class: v(["media-detail__backdrop-img", { "is-loaded": H.value }]),
				src: w(q)(V.value),
				srcset: w(Kt)(Rt.value) || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: zt
			}, null, 42, Se), i[10] ||= m("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : f("", !0),
			J.value ? (b(), p("audio", {
				key: 1,
				ref_key: "themeAudioEl",
				ref: Y,
				src: J.value,
				class: "media-detail__theme-audio",
				loop: "",
				preload: "auto",
				"aria-hidden": "true",
				tabindex: "-1"
			}, null, 8, Ce)) : f("", !0),
			e.item.poster_url ? (b(), p(l, { key: 2 }, [m("div", {
				class: "media-detail__ambient",
				style: _e({ backgroundImage: `url(${w(q)(e.item.poster_url)})` }),
				"aria-hidden": "true"
			}, null, 4), V.value ? f("", !0) : (b(), p("div", we))], 64)) : f("", !0),
			m("div", Te, [e.showBack ? (b(), d(c, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: i[0] ||= (e) => k("back")
			}, {
				default: E(() => [...i[11] ||= [h("Back", -1)]]),
				_: 1
			})) : f("", !0)]),
			m("div", Ee, [m("div", De, [e.item.poster_url ? (b(), p("img", {
				key: 0,
				ref_key: "imgEl",
				ref: It,
				class: v(["media-detail__img", { "is-loaded": B.value }]),
				src: w(q)(e.item.poster_url),
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: Lt
			}, null, 42, Oe)) : (b(), p("div", ke, [g(n, { name: jt.value }, null, 8, ["name"])]))]), m("div", Ae, [
				Wt.value ? (b(), p("img", {
					key: 0,
					class: "media-detail__logo",
					src: w(q)(G.value),
					alt: e.item.name,
					decoding: "async",
					onError: Ut
				}, null, 40, je)) : (b(), p("h1", Me, C(e.item.name), 1)),
				m("div", Ne, [
					e.item.year ? (b(), p("span", Pe, [g(n, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), h(C(e.item.year), 1)])) : f("", !0),
					e.item.rating ? (b(), p("span", Fe, C(e.item.rating), 1)) : f("", !0),
					e.item.runtime ? (b(), p("span", Ie, C(e.item.runtime) + "m", 1)) : f("", !0),
					m("span", Le, C(e.item.type), 1)
				]),
				e.item.genres?.length ? (b(), p("div", Re, [(b(!0), p(l, null, S(e.item.genres, (t) => (b(), d(se, {
					key: t,
					size: "sm",
					class: "media-detail__genre",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show ${t} titles` : void 0,
					onClick: (e) => k("genre", t)
				}, {
					default: E(() => [h(C(t), 1)]),
					_: 2
				}, 1032, [
					"disabled",
					"aria-label",
					"onClick"
				]))), 128))])) : f("", !0),
				Mt.value.length ? (b(), p("div", ze, [i[12] ||= m("span", { class: "media-detail__companies-label" }, "Studios", -1), m("div", Be, [(b(!0), p(l, null, S(Mt.value, (t) => (b(), d(se, {
					key: t.name,
					size: "sm",
					class: "media-detail__company",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show ${t.name} titles` : void 0,
					onClick: (e) => k("company", t.name)
				}, {
					default: E(() => [t.logoUrl ? (b(), p("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: w(q)(t.logoUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ve)) : f("", !0), m("span", null, C(t.name), 1)]),
					_: 2
				}, 1032, [
					"disabled",
					"aria-label",
					"onClick"
				]))), 128))])])) : f("", !0),
				m("p", He, C(e.item.overview || "No overview available."), 1),
				m("div", Ue, [
					g(c, {
						variant: "solid",
						"left-icon": "play",
						onClick: i[1] ||= (t) => k("play", e.item)
					}, {
						default: E(() => [...i[13] ||= [h("Play", -1)]]),
						_: 1
					}),
					Pt.value ? (b(), d(c, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: i[2] ||= (t) => k("resume", e.item)
					}, {
						default: E(() => [i[14] ||= h(" Resume ", -1), m("span", We, C(Pt.value), 1)]),
						_: 1
					})) : f("", !0),
					Bt.value ? (b(), d(c, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: Ht
					}, {
						default: E(() => [...i[15] ||= [h(" Play Trailer ", -1)]]),
						_: 1
					})) : f("", !0),
					g(c, {
						variant: "ghost",
						class: v(["media-detail__favorite", { "is-active": M.value }]),
						"left-icon": M.value ? "bookmark" : "bookmark-plus",
						"aria-label": M.value ? w(_)("itemActions.removeFavorite") : w(_)("itemActions.addFavorite"),
						"aria-pressed": M.value ? "true" : "false",
						onClick: Ct
					}, {
						default: E(() => [h(C(M.value ? w(_)("itemActions.inFavorites") : w(_)("itemActions.watchlist")), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					g(c, {
						variant: "ghost",
						class: v(["media-detail__watched", { "is-active": P.value }]),
						"left-icon": P.value ? "eye" : "eye-off",
						"aria-label": P.value ? w(_)("itemActions.markUnwatchedAria") : w(_)("itemActions.markWatchedAria"),
						"aria-pressed": P.value ? "true" : "false",
						onClick: F
					}, {
						default: E(() => [h(C(P.value ? w(_)("itemActions.watched") : w(_)("itemActions.markWatched")), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					g(oe, {
						level: wt.value,
						onCycle: At
					}, null, 8, ["level"]),
					J.value && !Z.value ? (b(), p("div", Ge, [g(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: Xt.value,
						label: Zt.value,
						pressed: !X.value,
						onClick: $t
					}, null, 8, [
						"name",
						"label",
						"pressed"
					]), g(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: "x",
						label: w(_)("player.themeStop"),
						onClick: en
					}, null, 8, ["label"])])) : f("", !0),
					g(le, {
						open: I.value,
						"onUpdate:open": i[3] ||= (e) => I.value = e,
						items: Ot.value,
						onSelect: kt
					}, {
						default: E(({ toggle: e }) => [g(r, {
							variant: "ghost",
							name: "more",
							label: "More actions",
							"aria-expanded": I.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: ye(e, ["stop", "prevent"])
						}, null, 8, ["aria-expanded", "onClick"])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (b(), d(c, {
						key: 3,
						variant: "outline",
						"left-icon": "search",
						onClick: i[4] ||= (t) => k("match", e.item)
					}, {
						default: E(() => [...i[16] ||= [h("Match metadata", -1)]]),
						_: 1
					})) : f("", !0)
				]),
				Et.value.length ? (b(), p("div", Ke, [i[17] ||= m("span", { class: "media-detail__links-label" }, "Links", -1), m("div", qe, [(b(!0), p(l, null, S(Et.value, (e) => (b(), p("a", {
					key: e.key,
					class: "media-detail__link",
					href: w(s)(e.url),
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `Open on ${e.label} (opens in a new tab)`
				}, [m("span", null, C(e.label), 1), g(n, {
					name: "arrow-right",
					class: "media-detail__link-icon",
					"aria-hidden": "true"
				})], 8, Je))), 128))])])) : f("", !0),
				z.value.length || R.value.length ? (b(), p("div", Ye, [z.value.length ? (b(), p("section", Xe, [i[18] ||= m("h2", { class: "media-detail__credit-heading" }, "Crew", -1), m("ul", Ze, [(b(!0), p(l, null, S(z.value, (t, n) => (b(), p("li", { key: `crew-${n}-${t.name}` }, [m("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show titles with ${t.name}` : void 0,
					onClick: (n) => e.chipsClickable && k("actor", t.name)
				}, [
					m("span", $e, [t.profileUrl ? (b(), p("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: w(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, et)) : (b(), p("span", tt, C(Nt(t.name)), 1))]),
					m("span", nt, C(t.name), 1),
					t.sub ? (b(), p("span", rt, C(t.sub), 1)) : f("", !0)
				], 8, Qe)]))), 128))])])) : f("", !0), R.value.length ? (b(), p("section", it, [i[19] ||= m("h2", { class: "media-detail__credit-heading" }, "Cast", -1), m("ul", at, [(b(!0), p(l, null, S(R.value, (t, n) => (b(), p("li", { key: `cast-${n}-${t.name}` }, [m("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show titles with ${t.name}` : void 0,
					onClick: (n) => e.chipsClickable && k("actor", t.name)
				}, [
					m("span", st, [t.profileUrl ? (b(), p("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: w(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ct)) : (b(), p("span", lt, C(Nt(t.name)), 1))]),
					m("span", ut, C(t.name), 1),
					t.sub ? (b(), p("span", dt, C(t.sub), 1)) : f("", !0)
				], 8, ot)]))), 128))])])) : f("", !0)])) : f("", !0)
			])]),
			e.item.files?.length ? (b(), p("section", ft, [i[20] ||= m("h2", { class: "media-detail__files-heading" }, "Files", -1), m("ul", pt, [(b(!0), p(l, null, S(e.item.files, (e, t) => (b(), p("li", {
				key: t,
				class: "media-detail__file"
			}, [m("span", mt, C(e.path), 1), m("span", ht, [
				e.container ? (b(), p("span", gt, C(e.container), 1)) : f("", !0),
				e.resolution ? (b(), p("span", _t, C(e.resolution), 1)) : f("", !0),
				m("span", vt, C(Ft(e.size_bytes)), 1)
			])]))), 128))])])) : f("", !0),
			e.similarLoading || e.similar.length ? (b(), d(me, {
				key: 4,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: i[5] ||= (e) => k("play", e),
				onWatchlist: i[6] ||= (e) => k("watchlist", e),
				onInfo: i[7] ||= (e) => k("info", e)
			}, null, 8, ["items", "loading"])) : f("", !0),
			U.value ? (b(), d(ce, {
				key: 5,
				modelValue: W.value,
				"onUpdate:modelValue": i[8] ||= (e) => W.value = e,
				title: `Trailer — ${e.item.name}`,
				size: "lg"
			}, {
				default: E(() => [m("div", yt, [m("iframe", {
					class: "media-detail__trailer-iframe",
					src: U.value,
					title: `${e.item.name} trailer`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, bt)])]),
				_: 1
			}, 8, ["modelValue", "title"])) : f("", !0),
			L.value ? (b(), d(fe, {
				key: 6,
				"model-value": !0,
				item: e.item,
				client: w(o),
				"onUpdate:modelValue": i[9] ||= (e) => L.value = !1
			}, null, 8, ["item", "client"])) : f("", !0)
		]));
	}
}), k = /* @__PURE__ */ e({ default: () => A }), A = /*#__PURE__*/ t(O, [["__scopeId", "data-v-36e868fc"]]);
//#endregion
export { k as n, A as t };

//# sourceMappingURL=MediaDetail-3yyIUlJJ.js.map