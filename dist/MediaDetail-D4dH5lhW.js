import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t, t as n } from "./Icon-CIwTuFLd.js";
import { t as r } from "./IconButton-y6A8Bq4D.js";
import { a as i } from "./plural-DMM7pLFA.js";
import { t as a } from "./useMessages-DeBiTaQk.js";
import { i as o } from "./client-CRZ_SWB1.js";
import { n as ee, r as te } from "./useApiBase-CV_r-Kk4.js";
import { t as ne } from "./useAuthStore-BbS6J1QF.js";
import { t as re } from "./useImageSrc-KnN1T9Ga.js";
import { t as ie } from "./useToastStore-BDoKlU6N.js";
import { n as ae, t as oe } from "./ThumbRating-cLiSk8V_.js";
import { t as s } from "./Button-BuG0GvCa.js";
import { t as se } from "./Chip-CYhlmz6l.js";
import { t as ce } from "./Modal-D0CvVyuE.js";
import { t as le } from "./Menu-Dm56tG4N.js";
import { i as ue, n as de, r as fe } from "./MediaCard-B8fDLhcg.js";
import { t as pe } from "./mediaTypeIcon-Bde251Qi.js";
import { t as me } from "./MediaRow-CH1q6dKl.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as he, nextTick as ge, normalizeClass as _, normalizeStyle as _e, onBeforeUnmount as ve, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, watch as w, withCtx as T, withModifiers as ye } from "vue";
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
}, vt = { class: "media-detail__file-size" }, yt = { class: "media-detail__trailer-embed" }, bt = ["src", "title"], E = "phlix.theme.muted", xt = .35, D = /*@__PURE__*/ g({
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
		let { t: g } = a(), D = e, O = t, k = ae(), A = he("phlixConfig", null), St = ne(), j = l(() => k.isFavorite(D.item.id));
		function Ct() {
			k.toggleFavorite(D.item.id, A?.apiBase ?? ""), O("watchlist", D.item);
		}
		let wt = l(() => k.likeLevel(D.item.id)), M = l(() => St.isAdmin), N = l(() => k.isWatched(D.item.id));
		function P() {
			k.toggleWatched(D.item.id, A?.apiBase ?? ""), O("mark-watched", D.item);
		}
		let Tt = {
			movie: "movie",
			series: "tv",
			season: "tv",
			episode: "tv"
		}, F = l(() => {
			let e = D.item.external_ids;
			if (!e) return [];
			let t = Tt[D.item.type], n = {
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
		}), I = b(!1), L = b(!1), Et = l(() => D.item.type === "series" || D.item.type === "season"), Dt = l(() => ue(D.item, {
			isAdmin: M.value,
			isWatched: N.value,
			isSeriesOrSeason: Et.value,
			canChoosePoster: M.value
		}));
		function Ot(e) {
			let t = fe, n = ie();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					P();
					break;
				case t.addToPlaylist:
					L.value = !0;
					break;
				case t.download:
					n.info("Preparing download…"), o.getDownloadUrl(D.item.id).then(({ url: e }) => {
						window.open(e, "_blank", "noopener"), n.success("Download started");
					}).catch((e) => {
						n.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					n.info("Loading…"), o.getMissingEpisodes(D.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success("No missing episodes") : n.warning(`${i(t, "episode", "episodes")} missing`);
					}).catch((e) => {
						n.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					o.shufflePlay(D.item.id).then(() => n.success("Shuffle play started")).catch((e) => {
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
		function kt(e) {
			k.setLike(D.item.id, e, A?.apiBase ?? "");
		}
		let At = l(() => pe(D.item.type)), R = l(() => {
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
		}), z = l(() => {
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
		}), jt = l(() => {
			let e = D.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : D.item.studio ? [{
				name: D.item.studio,
				logoUrl: null
			}] : [];
		});
		function Mt(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let Nt = l(() => {
			let e = D.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function Pt(e) {
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
		let B = b(!1), Ft = b(null);
		function It() {
			B.value = !0;
		}
		v(() => {
			Ft.value?.complete && (B.value = !0);
		});
		let V = l(() => D.item.backdrop_url_large || D.item.backdrop_url || null), Lt = l(() => D.item.backdrop_srcset || null), H = b(!1);
		function Rt() {
			H.value = !0;
		}
		w(V, () => {
			H.value = !1;
		});
		let zt = l(() => !!D.item.trailer_url), Bt = /^[A-Za-z0-9_-]{1,20}$/, U = l(() => {
			let e = D.item.trailer_site, t = D.item.trailer_key;
			return e !== "YouTube" || !t || !Bt.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), W = b(!1);
		function Vt() {
			if (U.value) {
				W.value = !0;
				return;
			}
			let e = D.item.trailer_url;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let G = l(() => D.item.logo_url || null), K = b(!1);
		function Ht() {
			K.value = !0;
		}
		let Ut = l(() => !!G.value && !K.value);
		w(G, () => {
			K.value = !1;
		});
		let Wt = ee(), { imgSrc: q, imgSrcset: Gt } = re(), Kt = te(), J = l(() => {
			let e = D.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${Kt.value || Wt.value || (A?.apiBase ?? "")}${e}` : null;
		});
		function qt() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(E) !== "false";
			} catch {
				return !0;
			}
		}
		function Jt(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(E, e ? "true" : "false");
			} catch {}
		}
		let Y = b(null), X = b(qt()), Z = b(!1), Yt = l(() => X.value ? "mute" : "volume"), Xt = l(() => X.value ? g("player.themeUnmute") : g("player.themeMute"));
		function Zt() {
			let e = Y.value;
			e && (e.muted = X.value, e.volume = X.value ? 0 : xt);
		}
		function Q() {
			let e = Y.value;
			!e || Z.value || (Zt(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = Y.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function Qt() {
			X.value = !X.value, Jt(X.value), Zt(), X.value || Q();
		}
		function $t() {
			Z.value = !0, $();
		}
		return v(() => {
			J.value && Q();
		}), w(J, (e, t) => {
			e !== t && ($(), Z.value = !1, e && ge(() => {
				J.value && Q();
			}));
		}), ve(() => {
			$();
		}), (t, i) => (y(), f("article", be, [
			V.value ? (y(), f("div", xe, [p("img", {
				class: _(["media-detail__backdrop-img", { "is-loaded": H.value }]),
				src: C(q)(V.value),
				srcset: C(Gt)(Lt.value) || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: Rt
			}, null, 42, Se), i[10] ||= p("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : d("", !0),
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
			}, null, 8, Ce)) : d("", !0),
			e.item.poster_url ? (y(), f(c, { key: 2 }, [p("div", {
				class: "media-detail__ambient",
				style: _e({ backgroundImage: `url(${C(q)(e.item.poster_url)})` }),
				"aria-hidden": "true"
			}, null, 4), V.value ? d("", !0) : (y(), f("div", we))], 64)) : d("", !0),
			p("div", Te, [e.showBack ? (y(), u(s, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: i[0] ||= (e) => O("back")
			}, {
				default: T(() => [...i[11] ||= [m("Back", -1)]]),
				_: 1
			})) : d("", !0)]),
			p("div", Ee, [p("div", De, [e.item.poster_url ? (y(), f("img", {
				key: 0,
				ref_key: "imgEl",
				ref: Ft,
				class: _(["media-detail__img", { "is-loaded": B.value }]),
				src: C(q)(e.item.poster_url),
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: It
			}, null, 42, Oe)) : (y(), f("div", ke, [h(n, { name: At.value }, null, 8, ["name"])]))]), p("div", Ae, [
				Ut.value ? (y(), f("img", {
					key: 0,
					class: "media-detail__logo",
					src: C(q)(G.value),
					alt: e.item.name,
					decoding: "async",
					onError: Ht
				}, null, 40, je)) : (y(), f("h1", Me, S(e.item.name), 1)),
				p("div", Ne, [
					e.item.year ? (y(), f("span", Pe, [h(n, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), m(S(e.item.year), 1)])) : d("", !0),
					e.item.rating ? (y(), f("span", Fe, S(e.item.rating), 1)) : d("", !0),
					e.item.runtime ? (y(), f("span", Ie, S(e.item.runtime) + "m", 1)) : d("", !0),
					p("span", Le, S(e.item.type), 1)
				]),
				e.item.genres?.length ? (y(), f("div", Re, [(y(!0), f(c, null, x(e.item.genres, (t) => (y(), u(se, {
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
				jt.value.length ? (y(), f("div", ze, [i[12] ||= p("span", { class: "media-detail__companies-label" }, "Studios", -1), p("div", Be, [(y(!0), f(c, null, x(jt.value, (t) => (y(), u(se, {
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
					}, null, 8, Ve)) : d("", !0), p("span", null, S(t.name), 1)]),
					_: 2
				}, 1032, [
					"disabled",
					"aria-label",
					"onClick"
				]))), 128))])])) : d("", !0),
				p("p", He, S(e.item.overview || "No overview available."), 1),
				p("div", Ue, [
					h(s, {
						variant: "solid",
						"left-icon": "play",
						onClick: i[1] ||= (t) => O("play", e.item)
					}, {
						default: T(() => [...i[13] ||= [m("Play", -1)]]),
						_: 1
					}),
					Nt.value ? (y(), u(s, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: i[2] ||= (t) => O("resume", e.item)
					}, {
						default: T(() => [i[14] ||= m(" Resume ", -1), p("span", We, S(Nt.value), 1)]),
						_: 1
					})) : d("", !0),
					zt.value ? (y(), u(s, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: Vt
					}, {
						default: T(() => [...i[15] ||= [m(" Play Trailer ", -1)]]),
						_: 1
					})) : d("", !0),
					h(s, {
						variant: "ghost",
						class: _(["media-detail__favorite", { "is-active": j.value }]),
						"left-icon": j.value ? "bookmark" : "bookmark-plus",
						"aria-label": j.value ? C(g)("itemActions.removeFavorite") : C(g)("itemActions.addFavorite"),
						"aria-pressed": j.value ? "true" : "false",
						onClick: Ct
					}, {
						default: T(() => [m(S(j.value ? C(g)("itemActions.inFavorites") : C(g)("itemActions.watchlist")), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(s, {
						variant: "ghost",
						class: _(["media-detail__watched", { "is-active": N.value }]),
						"left-icon": N.value ? "eye" : "eye-off",
						"aria-label": N.value ? C(g)("itemActions.markUnwatchedAria") : C(g)("itemActions.markWatchedAria"),
						"aria-pressed": N.value ? "true" : "false",
						onClick: P
					}, {
						default: T(() => [m(S(N.value ? C(g)("itemActions.watched") : C(g)("itemActions.markWatched")), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(oe, {
						level: wt.value,
						onCycle: kt
					}, null, 8, ["level"]),
					J.value && !Z.value ? (y(), f("div", Ge, [h(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: Yt.value,
						label: Xt.value,
						pressed: !X.value,
						onClick: Qt
					}, null, 8, [
						"name",
						"label",
						"pressed"
					]), h(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: "x",
						label: C(g)("player.themeStop"),
						onClick: $t
					}, null, 8, ["label"])])) : d("", !0),
					h(le, {
						open: I.value,
						"onUpdate:open": i[3] ||= (e) => I.value = e,
						items: Dt.value,
						onSelect: Ot
					}, {
						default: T(({ toggle: e }) => [h(r, {
							variant: "ghost",
							name: "more",
							label: "More actions",
							"aria-expanded": I.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: ye(e, ["stop", "prevent"])
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
				F.value.length ? (y(), f("div", Ke, [i[17] ||= p("span", { class: "media-detail__links-label" }, "Links", -1), p("div", qe, [(y(!0), f(c, null, x(F.value, (e) => (y(), f("a", {
					key: e.key,
					class: "media-detail__link",
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `Open on ${e.label} (opens in a new tab)`
				}, [p("span", null, S(e.label), 1), h(n, {
					name: "arrow-right",
					class: "media-detail__link-icon",
					"aria-hidden": "true"
				})], 8, Je))), 128))])])) : d("", !0),
				z.value.length || R.value.length ? (y(), f("div", Ye, [z.value.length ? (y(), f("section", Xe, [i[18] ||= p("h2", { class: "media-detail__credit-heading" }, "Crew", -1), p("ul", Ze, [(y(!0), f(c, null, x(z.value, (t, n) => (y(), f("li", { key: `crew-${n}-${t.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show titles with ${t.name}` : void 0,
					onClick: (n) => e.chipsClickable && O("actor", t.name)
				}, [
					p("span", $e, [t.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: C(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, et)) : (y(), f("span", tt, S(Mt(t.name)), 1))]),
					p("span", nt, S(t.name), 1),
					t.sub ? (y(), f("span", rt, S(t.sub), 1)) : d("", !0)
				], 8, Qe)]))), 128))])])) : d("", !0), R.value.length ? (y(), f("section", it, [i[19] ||= p("h2", { class: "media-detail__credit-heading" }, "Cast", -1), p("ul", at, [(y(!0), f(c, null, x(R.value, (t, n) => (y(), f("li", { key: `cast-${n}-${t.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					disabled: !e.chipsClickable,
					"aria-label": e.chipsClickable ? `Show titles with ${t.name}` : void 0,
					onClick: (n) => e.chipsClickable && O("actor", t.name)
				}, [
					p("span", st, [t.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: C(q)(t.profileUrl),
						alt: t.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ct)) : (y(), f("span", lt, S(Mt(t.name)), 1))]),
					p("span", ut, S(t.name), 1),
					t.sub ? (y(), f("span", dt, S(t.sub), 1)) : d("", !0)
				], 8, ot)]))), 128))])])) : d("", !0)])) : d("", !0)
			])]),
			e.item.files?.length ? (y(), f("section", ft, [i[20] ||= p("h2", { class: "media-detail__files-heading" }, "Files", -1), p("ul", pt, [(y(!0), f(c, null, x(e.item.files, (e, t) => (y(), f("li", {
				key: t,
				class: "media-detail__file"
			}, [p("span", mt, S(e.path), 1), p("span", ht, [
				e.container ? (y(), f("span", gt, S(e.container), 1)) : d("", !0),
				e.resolution ? (y(), f("span", _t, S(e.resolution), 1)) : d("", !0),
				p("span", vt, S(Pt(e.size_bytes)), 1)
			])]))), 128))])])) : d("", !0),
			e.similarLoading || e.similar.length ? (y(), u(me, {
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
			U.value ? (y(), u(ce, {
				key: 5,
				modelValue: W.value,
				"onUpdate:modelValue": i[8] ||= (e) => W.value = e,
				title: `Trailer — ${e.item.name}`,
				size: "lg"
			}, {
				default: T(() => [p("div", yt, [p("iframe", {
					class: "media-detail__trailer-iframe",
					src: U.value,
					title: `${e.item.name} trailer`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, bt)])]),
				_: 1
			}, 8, ["modelValue", "title"])) : d("", !0),
			L.value ? (y(), u(de, {
				key: 6,
				"model-value": !0,
				item: e.item,
				client: C(o),
				"onUpdate:modelValue": i[9] ||= (e) => L.value = !1
			}, null, 8, ["item", "client"])) : d("", !0)
		]));
	}
}), O = /* @__PURE__ */ e({ default: () => k }), k = /*#__PURE__*/ t(D, [["__scopeId", "data-v-5cf8e1f1"]]);
//#endregion
export { O as n, k as t };

//# sourceMappingURL=MediaDetail-D4dH5lhW.js.map