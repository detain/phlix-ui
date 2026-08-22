import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t, t as n } from "./Icon-CkTBN_k5.js";
import { t as r } from "./IconButton-3ZuilWzd.js";
import { a as i } from "./plural-DMM7pLFA.js";
import { i as a } from "./client-COHWZ2KC.js";
import { n as ee, r as te } from "./useApiBase-CV_r-Kk4.js";
import { t as ne } from "./useAuthStore-Bxpn4wWU.js";
import { t as re } from "./useImageSrc-KnN1T9Ga.js";
import { t as ie } from "./useToastStore-BDoKlU6N.js";
import { n as ae, t as oe } from "./ThumbRating-DZt3qThy.js";
import { t as o } from "./Button-Cw8Wl4QR.js";
import { t as s } from "./Chip-4LSLVIhi.js";
import { t as se } from "./Modal-Cfz25d3h.js";
import { t as ce } from "./Menu-CcVQWgwT.js";
import { n as le, r as ue } from "./MediaCard-H65JFCcC.js";
import { t as de } from "./mediaTypeIcon-Bde251Qi.js";
import { t as fe } from "./MediaRow-DgtjeUxe.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as pe, normalizeClass as _, normalizeStyle as me, onBeforeUnmount as he, onMounted as ge, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, watch as C, withCtx as w, withModifiers as _e } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var ve = { class: "media-detail" }, ye = {
	key: 0,
	class: "media-detail__backdrop",
	"aria-hidden": "true"
}, be = ["src", "srcset"], xe = ["src"], Se = {
	key: 0,
	class: "media-detail__ambient-scrim",
	"aria-hidden": "true"
}, Ce = { class: "media-detail__bar" }, we = { class: "media-detail__hero" }, Te = { class: "media-detail__poster" }, Ee = ["src", "alt"], De = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, Oe = { class: "media-detail__info" }, ke = ["src", "alt"], Ae = {
	key: 1,
	class: "media-detail__title"
}, je = { class: "media-detail__meta numeric" }, Me = {
	key: 0,
	class: "media-detail__meta-item"
}, Ne = {
	key: 1,
	class: "media-detail__cert"
}, Pe = {
	key: 2,
	class: "media-detail__meta-item"
}, Fe = { class: "media-detail__type" }, Ie = {
	key: 2,
	class: "media-detail__genres"
}, Le = {
	key: 3,
	class: "media-detail__companies"
}, Re = { class: "media-detail__company-list" }, ze = ["src", "alt"], Be = { class: "media-detail__overview" }, Ve = { class: "media-detail__actions" }, He = { class: "media-detail__resume-at numeric" }, Ue = {
	key: 2,
	class: "media-detail__theme"
}, We = {
	key: 4,
	class: "media-detail__links"
}, Ge = { class: "media-detail__links-list" }, Ke = ["href", "aria-label"], qe = {
	key: 5,
	class: "media-detail__credits"
}, Je = {
	key: 0,
	class: "media-detail__credit-group"
}, Ye = { class: "media-detail__people" }, Xe = ["aria-label", "onClick"], Ze = { class: "media-detail__avatar" }, Qe = ["src", "alt"], $e = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, et = { class: "media-detail__person-name" }, tt = {
	key: 0,
	class: "media-detail__person-sub"
}, nt = {
	key: 1,
	class: "media-detail__credit-group"
}, rt = { class: "media-detail__people" }, it = ["aria-label", "onClick"], at = { class: "media-detail__avatar" }, ot = ["src", "alt"], st = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, ct = { class: "media-detail__person-name" }, lt = {
	key: 0,
	class: "media-detail__person-sub"
}, ut = {
	key: 3,
	class: "media-detail__files"
}, dt = { class: "media-detail__files-list" }, ft = { class: "media-detail__file-path" }, pt = { class: "media-detail__file-meta" }, mt = {
	key: 0,
	class: "media-detail__file-container"
}, ht = {
	key: 1,
	class: "media-detail__file-resolution"
}, gt = { class: "media-detail__file-size" }, _t = { class: "media-detail__trailer-embed" }, vt = ["src", "title"], T = "phlix.theme.muted", yt = .35, E = /*@__PURE__*/ g({
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
		let g = e, E = t, D = ae(), O = pe("phlixConfig", null), bt = ne(), k = l(() => D.isFavorite(g.item.id));
		function xt() {
			D.toggleFavorite(g.item.id, O?.apiBase ?? ""), E("watchlist", g.item);
		}
		let St = l(() => D.likeLevel(g.item.id)), A = l(() => bt.isAdmin), j = l(() => D.isWatched(g.item.id));
		function M() {
			D.toggleWatched(g.item.id, O?.apiBase ?? ""), E("mark-watched", g.item);
		}
		let Ct = {
			movie: "movie",
			series: "tv",
			season: "tv",
			episode: "tv"
		}, N = l(() => {
			let e = g.item.external_ids;
			if (!e) return [];
			let t = Ct[g.item.type], n = {
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
		}), P = y(!1), wt = l(() => g.item.type === "series" || g.item.type === "season"), Tt = l(() => ue(g.item, {
			isAdmin: A.value,
			isWatched: j.value,
			isSeriesOrSeason: wt.value,
			canChoosePoster: A.value
		}));
		function Et(e) {
			let t = le, n = ie();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					M();
					break;
				case t.addToPlaylist: {
					let e = window.prompt("Enter playlist name:");
					if (!e?.trim()) break;
					let t = e.trim();
					n.info("Creating playlist…"), a.createPlaylist(t, g.item.id).then(() => n.success("Playlist created")).catch((e) => {
						n.error("Failed to create playlist", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				}
				case t.download:
					n.info("Preparing download…"), a.getDownloadUrl(g.item.id).then(({ url: e }) => {
						window.open(e, "_blank", "noopener"), n.success("Download started");
					}).catch((e) => {
						n.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					n.info("Loading…"), a.getMissingEpisodes(g.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success("No missing episodes") : n.warning(`${i(t, "episode", "episodes")} missing`);
					}).catch((e) => {
						n.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					a.shufflePlay(g.item.id).then(() => n.success("Shuffle play started")).catch((e) => {
						n.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					E("edit-metadata", g.item);
					break;
				case t.exploreData:
					E("explore-data", g.item);
					break;
				case t.matchMetadata:
					E("refresh", g.item);
					break;
				case t.editImages:
					E("choose-poster", g.item);
					break;
				case t.remove:
					E("remove", g.item);
					break;
				default: n.info(`${e.label} isn't available yet`);
			}
		}
		function Dt(e) {
			D.setLike(g.item.id, e, O?.apiBase ?? "");
		}
		let Ot = l(() => de(g.item.type)), F = l(() => {
			let e = g.item.cast;
			return e?.length ? e.slice(0, 12).map((e) => ({
				name: e.name,
				sub: e.role ?? null,
				profileUrl: e.profile_url ?? null
			})) : (g.item.actors ?? []).slice(0, 12).map((e) => ({
				name: e,
				sub: null,
				profileUrl: null
			}));
		}), I = l(() => {
			let e = g.item.crew;
			return e?.length ? e.slice(0, 8).map((e) => ({
				name: e.name,
				sub: e.job ?? null,
				profileUrl: e.profile_url ?? null
			})) : g.item.director ? [{
				name: g.item.director,
				sub: "Director",
				profileUrl: null
			}] : [];
		}), L = l(() => {
			let e = g.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : g.item.studio ? [{
				name: g.item.studio,
				logoUrl: null
			}] : [];
		});
		function R(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let kt = l(() => {
			let e = g.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function At(e) {
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
		let z = y(!1), jt = y(null);
		function Mt() {
			z.value = !0;
		}
		ge(() => {
			jt.value?.complete && (z.value = !0);
		});
		let B = l(() => g.item.backdrop_url_large || g.item.backdrop_url || null), Nt = l(() => g.item.backdrop_srcset || null), V = y(!1);
		function Pt() {
			V.value = !0;
		}
		C(B, () => {
			V.value = !1;
		});
		let Ft = l(() => !!g.item.trailer_url), It = /^[A-Za-z0-9_-]{1,20}$/, H = l(() => {
			let e = g.item.trailer_site, t = g.item.trailer_key;
			return e !== "YouTube" || !t || !It.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), U = y(!1);
		function Lt() {
			if (H.value) {
				U.value = !0;
				return;
			}
			let e = g.item.trailer_url;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let W = l(() => g.item.logo_url || null), G = y(!1);
		function Rt() {
			G.value = !0;
		}
		let zt = l(() => !!W.value && !G.value);
		C(W, () => {
			G.value = !1;
		});
		let Bt = ee(), { imgSrc: K, imgSrcset: Vt } = re(), Ht = te(), q = l(() => {
			let e = g.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${Ht.value || Bt.value || (O?.apiBase ?? "")}${e}` : null;
		});
		function Ut() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(T) !== "false";
			} catch {
				return !0;
			}
		}
		function Wt(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(T, e ? "true" : "false");
			} catch {}
		}
		let J = y(null), Y = y(Ut()), X = y(!1), Gt = l(() => Y.value ? "mute" : "volume"), Kt = l(() => Y.value ? "Unmute theme music" : "Mute theme music");
		function Z() {
			let e = J.value;
			e && (e.muted = Y.value, e.volume = Y.value ? 0 : yt);
		}
		function Q() {
			let e = J.value;
			!e || X.value || (Z(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = J.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function qt() {
			Y.value = !Y.value, Wt(Y.value), Z(), Y.value || Q();
		}
		function Jt() {
			X.value = !0, $();
		}
		return ge(() => {
			q.value && Q();
		}), C(q, (e, t) => {
			e !== t && ($(), X.value = !1, e && Q());
		}), he(() => {
			$();
		}), (t, i) => (v(), f("article", ve, [
			B.value ? (v(), f("div", ye, [p("img", {
				class: _(["media-detail__backdrop-img", { "is-loaded": V.value }]),
				src: S(K)(B.value),
				srcset: S(Vt)(Nt.value) || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: Pt
			}, null, 42, be), i[9] ||= p("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : d("", !0),
			q.value ? (v(), f("audio", {
				key: 1,
				ref_key: "themeAudioEl",
				ref: J,
				src: q.value,
				class: "media-detail__theme-audio",
				loop: "",
				preload: "auto",
				"aria-hidden": "true",
				tabindex: "-1"
			}, null, 8, xe)) : d("", !0),
			e.item.poster_url ? (v(), f(c, { key: 2 }, [p("div", {
				class: "media-detail__ambient",
				style: me({ backgroundImage: `url(${S(K)(e.item.poster_url)})` }),
				"aria-hidden": "true"
			}, null, 4), B.value ? d("", !0) : (v(), f("div", Se))], 64)) : d("", !0),
			p("div", Ce, [e.showBack ? (v(), u(o, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: i[0] ||= (e) => E("back")
			}, {
				default: w(() => [...i[10] ||= [m("Back", -1)]]),
				_: 1
			})) : d("", !0)]),
			p("div", we, [p("div", Te, [e.item.poster_url ? (v(), f("img", {
				key: 0,
				ref_key: "imgEl",
				ref: jt,
				class: _(["media-detail__img", { "is-loaded": z.value }]),
				src: S(K)(e.item.poster_url),
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: Mt
			}, null, 42, Ee)) : (v(), f("div", De, [h(n, { name: Ot.value }, null, 8, ["name"])]))]), p("div", Oe, [
				zt.value ? (v(), f("img", {
					key: 0,
					class: "media-detail__logo",
					src: S(K)(W.value),
					alt: e.item.name,
					decoding: "async",
					onError: Rt
				}, null, 40, ke)) : (v(), f("h1", Ae, x(e.item.name), 1)),
				p("div", je, [
					e.item.year ? (v(), f("span", Me, [h(n, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), m(x(e.item.year), 1)])) : d("", !0),
					e.item.rating ? (v(), f("span", Ne, x(e.item.rating), 1)) : d("", !0),
					e.item.runtime ? (v(), f("span", Pe, x(e.item.runtime) + "m", 1)) : d("", !0),
					p("span", Fe, x(e.item.type), 1)
				]),
				e.item.genres?.length ? (v(), f("div", Ie, [(v(!0), f(c, null, b(e.item.genres, (e) => (v(), u(s, {
					key: e,
					size: "sm",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => E("genre", e)
				}, {
					default: w(() => [m(x(e), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])) : d("", !0),
				L.value.length ? (v(), f("div", Le, [i[11] ||= p("span", { class: "media-detail__companies-label" }, "Studios", -1), p("div", Re, [(v(!0), f(c, null, b(L.value, (e) => (v(), u(s, {
					key: e.name,
					size: "sm",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => E("company", e.name)
				}, {
					default: w(() => [e.logoUrl ? (v(), f("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: S(K)(e.logoUrl),
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ze)) : d("", !0), p("span", null, x(e.name), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])])) : d("", !0),
				p("p", Be, x(e.item.overview || "No overview available."), 1),
				p("div", Ve, [
					h(o, {
						variant: "solid",
						"left-icon": "play",
						onClick: i[1] ||= (t) => E("play", e.item)
					}, {
						default: w(() => [...i[12] ||= [m("Play", -1)]]),
						_: 1
					}),
					kt.value ? (v(), u(o, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: i[2] ||= (t) => E("resume", e.item)
					}, {
						default: w(() => [i[13] ||= m(" Resume ", -1), p("span", He, x(kt.value), 1)]),
						_: 1
					})) : d("", !0),
					Ft.value ? (v(), u(o, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: Lt
					}, {
						default: w(() => [...i[14] ||= [m(" Play Trailer ", -1)]]),
						_: 1
					})) : d("", !0),
					h(o, {
						variant: "ghost",
						class: _(["media-detail__favorite", { "is-active": k.value }]),
						"left-icon": k.value ? "bookmark" : "bookmark-plus",
						"aria-label": k.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": k.value ? "true" : "false",
						onClick: xt
					}, {
						default: w(() => [m(x(k.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(o, {
						variant: "ghost",
						class: _(["media-detail__watched", { "is-active": j.value }]),
						"left-icon": j.value ? "eye" : "eye-off",
						"aria-label": j.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": j.value ? "true" : "false",
						onClick: M
					}, {
						default: w(() => [m(x(j.value ? "Watched" : "Mark watched"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(oe, {
						level: St.value,
						onCycle: Dt
					}, null, 8, ["level"]),
					q.value && !X.value ? (v(), f("div", Ue, [h(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: Gt.value,
						label: Kt.value,
						pressed: !Y.value,
						onClick: qt
					}, null, 8, [
						"name",
						"label",
						"pressed"
					]), h(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: "x",
						label: "Stop theme music",
						onClick: Jt
					})])) : d("", !0),
					h(ce, {
						open: P.value,
						"onUpdate:open": i[3] ||= (e) => P.value = e,
						items: Tt.value,
						onSelect: Et
					}, {
						default: w(({ toggle: e }) => [h(r, {
							variant: "ghost",
							name: "more",
							label: "More actions",
							"aria-expanded": P.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: _e(e, ["stop", "prevent"])
						}, null, 8, ["aria-expanded", "onClick"])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (v(), u(o, {
						key: 3,
						variant: "outline",
						"left-icon": "search",
						onClick: i[4] ||= (t) => E("match", e.item)
					}, {
						default: w(() => [...i[15] ||= [m("Match metadata", -1)]]),
						_: 1
					})) : d("", !0)
				]),
				N.value.length ? (v(), f("div", We, [i[16] ||= p("span", { class: "media-detail__links-label" }, "Links", -1), p("div", Ge, [(v(!0), f(c, null, b(N.value, (e) => (v(), f("a", {
					key: e.key,
					class: "media-detail__link",
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `Open on ${e.label} (opens in a new tab)`
				}, [p("span", null, x(e.label), 1), h(n, {
					name: "arrow-right",
					class: "media-detail__link-icon",
					"aria-hidden": "true"
				})], 8, Ke))), 128))])])) : d("", !0),
				I.value.length || F.value.length ? (v(), f("div", qe, [I.value.length ? (v(), f("section", Je, [i[17] ||= p("h2", { class: "media-detail__credit-heading" }, "Crew", -1), p("ul", Ye, [(v(!0), f(c, null, b(I.value, (e, t) => (v(), f("li", { key: `crew-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => E("actor", e.name)
				}, [
					p("span", Ze, [e.profileUrl ? (v(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: S(K)(e.profileUrl),
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Qe)) : (v(), f("span", $e, x(R(e.name)), 1))]),
					p("span", et, x(e.name), 1),
					e.sub ? (v(), f("span", tt, x(e.sub), 1)) : d("", !0)
				], 8, Xe)]))), 128))])])) : d("", !0), F.value.length ? (v(), f("section", nt, [i[18] ||= p("h2", { class: "media-detail__credit-heading" }, "Cast", -1), p("ul", rt, [(v(!0), f(c, null, b(F.value, (e, t) => (v(), f("li", { key: `cast-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => E("actor", e.name)
				}, [
					p("span", at, [e.profileUrl ? (v(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: S(K)(e.profileUrl),
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ot)) : (v(), f("span", st, x(R(e.name)), 1))]),
					p("span", ct, x(e.name), 1),
					e.sub ? (v(), f("span", lt, x(e.sub), 1)) : d("", !0)
				], 8, it)]))), 128))])])) : d("", !0)])) : d("", !0)
			])]),
			e.item.files?.length ? (v(), f("section", ut, [i[19] ||= p("h2", { class: "media-detail__files-heading" }, "Files", -1), p("ul", dt, [(v(!0), f(c, null, b(e.item.files, (e, t) => (v(), f("li", {
				key: t,
				class: "media-detail__file"
			}, [p("span", ft, x(e.path), 1), p("span", pt, [
				e.container ? (v(), f("span", mt, x(e.container), 1)) : d("", !0),
				e.resolution ? (v(), f("span", ht, x(e.resolution), 1)) : d("", !0),
				p("span", gt, x(At(e.size_bytes)), 1)
			])]))), 128))])])) : d("", !0),
			e.similarLoading || e.similar.length ? (v(), u(fe, {
				key: 4,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: i[5] ||= (e) => E("play", e),
				onWatchlist: i[6] ||= (e) => E("watchlist", e),
				onInfo: i[7] ||= (e) => E("info", e)
			}, null, 8, ["items", "loading"])) : d("", !0),
			H.value ? (v(), u(se, {
				key: 5,
				modelValue: U.value,
				"onUpdate:modelValue": i[8] ||= (e) => U.value = e,
				title: `Trailer — ${e.item.name}`,
				size: "lg"
			}, {
				default: w(() => [p("div", _t, [p("iframe", {
					class: "media-detail__trailer-iframe",
					src: H.value,
					title: `${e.item.name} trailer`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, vt)])]),
				_: 1
			}, 8, ["modelValue", "title"])) : d("", !0)
		]));
	}
}), D = /* @__PURE__ */ e({ default: () => O }), O = /*#__PURE__*/ t(E, [["__scopeId", "data-v-c3c0ab24"]]);
//#endregion
export { D as n, O as t };

//# sourceMappingURL=MediaDetail-BOEvRFC2.js.map