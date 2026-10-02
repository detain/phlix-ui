import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-BlNXxmNP.js";
import { t as r } from "./IconButton-BI0oqPNk.js";
import { a as i } from "./plural-DMM7pLFA.js";
import { t as a } from "./useMessages-DwZkJguD.js";
import { i as o } from "./client-Dy0g66rg.js";
import { n as ee, r as te } from "./useApiBase-CV_r-Kk4.js";
import { t as ne } from "./useAuthStore-C8VYKkd_.js";
import { t as re } from "./useImageSrc-KnN1T9Ga.js";
import { t as ie } from "./useToastStore-BDoKlU6N.js";
import { n as ae, t as oe } from "./ThumbRating-D1NwvEZM.js";
import { t as s } from "./Button-BL3fV7FU.js";
import { t as se } from "./Chip-BJXvFc2X.js";
import { t as ce } from "./Modal-DFo-9bYG.js";
import { t as le } from "./Menu-BPCGwEn4.js";
import { n as ue, r as de } from "./MediaCard-BPKGFw7a.js";
import { t as fe } from "./mediaTypeIcon-Bde251Qi.js";
import { t as pe } from "./MediaRow-D3x_ekCd.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as me, nextTick as he, normalizeClass as _, normalizeStyle as ge, onBeforeUnmount as _e, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, watch as w, withCtx as T, withModifiers as ve } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
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
}, Xe = { class: "media-detail__people" }, Ze = ["aria-label", "onClick"], Qe = { class: "media-detail__avatar" }, $e = ["src", "alt"], et = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, tt = { class: "media-detail__person-name" }, nt = {
	key: 0,
	class: "media-detail__person-sub"
}, rt = {
	key: 1,
	class: "media-detail__credit-group"
}, it = { class: "media-detail__people" }, at = ["aria-label", "onClick"], ot = { class: "media-detail__avatar" }, st = ["src", "alt"], ct = {
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
}, _t = { class: "media-detail__file-size" }, vt = { class: "media-detail__trailer-embed" }, yt = ["src", "title"], E = "phlix.theme.muted", bt = .35, D = /*@__PURE__*/ g({
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
		let { t: g } = a(), D = e, O = t, k = ae(), A = me("phlixConfig", null), xt = ne(), j = l(() => k.isFavorite(D.item.id));
		function St() {
			k.toggleFavorite(D.item.id, A?.apiBase ?? ""), O("watchlist", D.item);
		}
		let Ct = l(() => k.likeLevel(D.item.id)), wt = l(() => xt.isAdmin), M = l(() => k.isWatched(D.item.id));
		function Tt() {
			k.toggleWatched(D.item.id, A?.apiBase ?? ""), O("mark-watched", D.item);
		}
		let Et = {
			movie: "movie",
			series: "tv",
			season: "tv",
			episode: "tv"
		}, Dt = l(() => {
			let e = D.item.external_ids;
			if (!e) return [];
			let t = Et[D.item.type], n = {
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
		}), N = b(!1), Ot = l(() => D.item.type === "series" || D.item.type === "season"), kt = l(() => de(D.item, {
			isAdmin: wt.value,
			isWatched: M.value,
			isSeriesOrSeason: Ot.value,
			canChoosePoster: wt.value
		}));
		function At(e) {
			let t = ue, n = ie();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					Tt();
					break;
				case t.addToPlaylist: {
					let e = window.prompt("Enter playlist name:");
					if (!e?.trim()) break;
					let t = e.trim(), r = D.item.library_id;
					if (typeof r != "string" || r.trim() === "") {
						n.error("Cannot add to playlist", { message: "This item has no owning library id, so a new playlist cannot be created for it." });
						break;
					}
					n.info("Creating playlist…"), o.createPlaylist(t, r).then((e) => o.addToPlaylist(e.id, D.item.id).then(() => n.success("Added to playlist"), (e) => n.error("Playlist created, but adding the item failed", { message: e instanceof Error ? e.message : String(e) })), (e) => n.error("Failed to create playlist", { message: e instanceof Error ? e.message : String(e) }));
					break;
				}
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
		function jt(e) {
			k.setLike(D.item.id, e, A?.apiBase ?? "");
		}
		let Mt = l(() => fe(D.item.type)), P = l(() => {
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
		}), F = l(() => {
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
		}), I = l(() => {
			let e = D.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : D.item.studio ? [{
				name: D.item.studio,
				logoUrl: null
			}] : [];
		});
		function L(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let R = l(() => {
			let e = D.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function Nt(e) {
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
		let z = b(!1), B = b(null);
		function Pt() {
			z.value = !0;
		}
		v(() => {
			B.value?.complete && (z.value = !0);
		});
		let V = l(() => D.item.backdrop_url_large || D.item.backdrop_url || null), Ft = l(() => D.item.backdrop_srcset || null), H = b(!1);
		function It() {
			H.value = !0;
		}
		w(V, () => {
			H.value = !1;
		});
		let Lt = l(() => !!D.item.trailer_url), Rt = /^[A-Za-z0-9_-]{1,20}$/, U = l(() => {
			let e = D.item.trailer_site, t = D.item.trailer_key;
			return e !== "YouTube" || !t || !Rt.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), W = b(!1);
		function zt() {
			if (U.value) {
				W.value = !0;
				return;
			}
			let e = D.item.trailer_url;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let G = l(() => D.item.logo_url || null), K = b(!1);
		function Bt() {
			K.value = !0;
		}
		let Vt = l(() => !!G.value && !K.value);
		w(G, () => {
			K.value = !1;
		});
		let Ht = ee(), { imgSrc: q, imgSrcset: Ut } = re(), Wt = te(), J = l(() => {
			let e = D.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${Wt.value || Ht.value || (A?.apiBase ?? "")}${e}` : null;
		});
		function Gt() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(E) !== "false";
			} catch {
				return !0;
			}
		}
		function Kt(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(E, e ? "true" : "false");
			} catch {}
		}
		let Y = b(null), X = b(Gt()), Z = b(!1), qt = l(() => X.value ? "mute" : "volume"), Jt = l(() => X.value ? g("player.themeUnmute") : g("player.themeMute"));
		function Yt() {
			let e = Y.value;
			e && (e.muted = X.value, e.volume = X.value ? 0 : bt);
		}
		function Q() {
			let e = Y.value;
			!e || Z.value || (Yt(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = Y.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function Xt() {
			X.value = !X.value, Kt(X.value), Yt(), X.value || Q();
		}
		function Zt() {
			Z.value = !0, $();
		}
		return v(() => {
			J.value && Q();
		}), w(J, (e, t) => {
			e !== t && ($(), Z.value = !1, e && he(() => {
				J.value && Q();
			}));
		}), _e(() => {
			$();
		}), (t, i) => (y(), f("article", ye, [
			V.value ? (y(), f("div", be, [p("img", {
				class: _(["media-detail__backdrop-img", { "is-loaded": H.value }]),
				src: C(q)(V.value),
				srcset: C(Ut)(Ft.value) || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: It
			}, null, 42, xe), i[9] ||= p("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : d("", !0),
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
			}, null, 8, Se)) : d("", !0),
			e.item.poster_url ? (y(), f(c, { key: 2 }, [p("div", {
				class: "media-detail__ambient",
				style: ge({ backgroundImage: `url(${C(q)(e.item.poster_url)})` }),
				"aria-hidden": "true"
			}, null, 4), V.value ? d("", !0) : (y(), f("div", Ce))], 64)) : d("", !0),
			p("div", we, [e.showBack ? (y(), u(s, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: i[0] ||= (e) => O("back")
			}, {
				default: T(() => [...i[10] ||= [m("Back", -1)]]),
				_: 1
			})) : d("", !0)]),
			p("div", Te, [p("div", Ee, [e.item.poster_url ? (y(), f("img", {
				key: 0,
				ref_key: "imgEl",
				ref: B,
				class: _(["media-detail__img", { "is-loaded": z.value }]),
				src: C(q)(e.item.poster_url),
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: Pt
			}, null, 42, De)) : (y(), f("div", Oe, [h(n, { name: Mt.value }, null, 8, ["name"])]))]), p("div", ke, [
				Vt.value ? (y(), f("img", {
					key: 0,
					class: "media-detail__logo",
					src: C(q)(G.value),
					alt: e.item.name,
					decoding: "async",
					onError: Bt
				}, null, 40, Ae)) : (y(), f("h1", je, S(e.item.name), 1)),
				p("div", Me, [
					e.item.year ? (y(), f("span", Ne, [h(n, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), m(S(e.item.year), 1)])) : d("", !0),
					e.item.rating ? (y(), f("span", Pe, S(e.item.rating), 1)) : d("", !0),
					e.item.runtime ? (y(), f("span", Fe, S(e.item.runtime) + "m", 1)) : d("", !0),
					p("span", Ie, S(e.item.type), 1)
				]),
				e.item.genres?.length ? (y(), f("div", Le, [(y(!0), f(c, null, x(e.item.genres, (e) => (y(), u(se, {
					key: e,
					size: "sm",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => O("genre", e)
				}, {
					default: T(() => [m(S(e), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])) : d("", !0),
				I.value.length ? (y(), f("div", Re, [i[11] ||= p("span", { class: "media-detail__companies-label" }, "Studios", -1), p("div", ze, [(y(!0), f(c, null, x(I.value, (e) => (y(), u(se, {
					key: e.name,
					size: "sm",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => O("company", e.name)
				}, {
					default: T(() => [e.logoUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: C(q)(e.logoUrl),
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Be)) : d("", !0), p("span", null, S(e.name), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])])) : d("", !0),
				p("p", Ve, S(e.item.overview || "No overview available."), 1),
				p("div", He, [
					h(s, {
						variant: "solid",
						"left-icon": "play",
						onClick: i[1] ||= (t) => O("play", e.item)
					}, {
						default: T(() => [...i[12] ||= [m("Play", -1)]]),
						_: 1
					}),
					R.value ? (y(), u(s, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: i[2] ||= (t) => O("resume", e.item)
					}, {
						default: T(() => [i[13] ||= m(" Resume ", -1), p("span", Ue, S(R.value), 1)]),
						_: 1
					})) : d("", !0),
					Lt.value ? (y(), u(s, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: zt
					}, {
						default: T(() => [...i[14] ||= [m(" Play Trailer ", -1)]]),
						_: 1
					})) : d("", !0),
					h(s, {
						variant: "ghost",
						class: _(["media-detail__favorite", { "is-active": j.value }]),
						"left-icon": j.value ? "bookmark" : "bookmark-plus",
						"aria-label": j.value ? C(g)("itemActions.removeFavorite") : C(g)("itemActions.addFavorite"),
						"aria-pressed": j.value ? "true" : "false",
						onClick: St
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
						class: _(["media-detail__watched", { "is-active": M.value }]),
						"left-icon": M.value ? "eye" : "eye-off",
						"aria-label": M.value ? C(g)("itemActions.markUnwatchedAria") : C(g)("itemActions.markWatchedAria"),
						"aria-pressed": M.value ? "true" : "false",
						onClick: Tt
					}, {
						default: T(() => [m(S(M.value ? C(g)("itemActions.watched") : C(g)("itemActions.markWatched")), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(oe, {
						level: Ct.value,
						onCycle: jt
					}, null, 8, ["level"]),
					J.value && !Z.value ? (y(), f("div", We, [h(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: qt.value,
						label: Jt.value,
						pressed: !X.value,
						onClick: Xt
					}, null, 8, [
						"name",
						"label",
						"pressed"
					]), h(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: "x",
						label: C(g)("player.themeStop"),
						onClick: Zt
					}, null, 8, ["label"])])) : d("", !0),
					h(le, {
						open: N.value,
						"onUpdate:open": i[3] ||= (e) => N.value = e,
						items: kt.value,
						onSelect: At
					}, {
						default: T(({ toggle: e }) => [h(r, {
							variant: "ghost",
							name: "more",
							label: "More actions",
							"aria-expanded": N.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: ve(e, ["stop", "prevent"])
						}, null, 8, ["aria-expanded", "onClick"])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (y(), u(s, {
						key: 3,
						variant: "outline",
						"left-icon": "search",
						onClick: i[4] ||= (t) => O("match", e.item)
					}, {
						default: T(() => [...i[15] ||= [m("Match metadata", -1)]]),
						_: 1
					})) : d("", !0)
				]),
				Dt.value.length ? (y(), f("div", Ge, [i[16] ||= p("span", { class: "media-detail__links-label" }, "Links", -1), p("div", Ke, [(y(!0), f(c, null, x(Dt.value, (e) => (y(), f("a", {
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
				})], 8, qe))), 128))])])) : d("", !0),
				F.value.length || P.value.length ? (y(), f("div", Je, [F.value.length ? (y(), f("section", Ye, [i[17] ||= p("h2", { class: "media-detail__credit-heading" }, "Crew", -1), p("ul", Xe, [(y(!0), f(c, null, x(F.value, (e, t) => (y(), f("li", { key: `crew-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => O("actor", e.name)
				}, [
					p("span", Qe, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: C(q)(e.profileUrl),
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, $e)) : (y(), f("span", et, S(L(e.name)), 1))]),
					p("span", tt, S(e.name), 1),
					e.sub ? (y(), f("span", nt, S(e.sub), 1)) : d("", !0)
				], 8, Ze)]))), 128))])])) : d("", !0), P.value.length ? (y(), f("section", rt, [i[18] ||= p("h2", { class: "media-detail__credit-heading" }, "Cast", -1), p("ul", it, [(y(!0), f(c, null, x(P.value, (e, t) => (y(), f("li", { key: `cast-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => O("actor", e.name)
				}, [
					p("span", ot, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: C(q)(e.profileUrl),
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, st)) : (y(), f("span", ct, S(L(e.name)), 1))]),
					p("span", lt, S(e.name), 1),
					e.sub ? (y(), f("span", ut, S(e.sub), 1)) : d("", !0)
				], 8, at)]))), 128))])])) : d("", !0)])) : d("", !0)
			])]),
			e.item.files?.length ? (y(), f("section", dt, [i[19] ||= p("h2", { class: "media-detail__files-heading" }, "Files", -1), p("ul", ft, [(y(!0), f(c, null, x(e.item.files, (e, t) => (y(), f("li", {
				key: t,
				class: "media-detail__file"
			}, [p("span", pt, S(e.path), 1), p("span", mt, [
				e.container ? (y(), f("span", ht, S(e.container), 1)) : d("", !0),
				e.resolution ? (y(), f("span", gt, S(e.resolution), 1)) : d("", !0),
				p("span", _t, S(Nt(e.size_bytes)), 1)
			])]))), 128))])])) : d("", !0),
			e.similarLoading || e.similar.length ? (y(), u(pe, {
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
				default: T(() => [p("div", vt, [p("iframe", {
					class: "media-detail__trailer-iframe",
					src: U.value,
					title: `${e.item.name} trailer`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, yt)])]),
				_: 1
			}, 8, ["modelValue", "title"])) : d("", !0)
		]));
	}
}), O = /* @__PURE__ */ e({ default: () => k }), k = /*#__PURE__*/ t(D, [["__scopeId", "data-v-45c08816"]]);
//#endregion
export { O as n, k as t };

//# sourceMappingURL=MediaDetail-DgzBE48E.js.map