import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-CGig46Dx.js";
import { r } from "./client-BzWwyWKr.js";
import { n as i, r as a } from "./useApiBase-CV_r-Kk4.js";
import { t as ee } from "./useAuthStore-Ds0NVhBP.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { n as ne, t as re } from "./ThumbRating-DHcCwq-B.js";
import { t as o } from "./Button-DWa6Ld_Z.js";
import { t as s } from "./Chip-DHwBdvXS.js";
import { t as ie } from "./Modal-aFganlu3.js";
import { t as ae } from "./Menu-DRkKveJV.js";
import { n as oe, r as se } from "./MediaCard-C4wV9Lhk.js";
import { t as ce } from "./mediaTypeIcon-Bde251Qi.js";
import { t as le } from "./MediaRow-Bsg2w1zl.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ue, normalizeClass as _, normalizeStyle as de, onBeforeUnmount as fe, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, watch as C, withCtx as w, withModifiers as pe } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var me = { class: "media-detail" }, he = {
	key: 0,
	class: "media-detail__backdrop",
	"aria-hidden": "true"
}, ge = ["src", "srcset"], _e = ["src"], ve = { class: "media-detail__bar" }, ye = { class: "media-detail__hero" }, be = { class: "media-detail__poster" }, xe = ["src", "alt"], Se = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, Ce = { class: "media-detail__info" }, we = ["src", "alt"], Te = {
	key: 1,
	class: "media-detail__title"
}, Ee = { class: "media-detail__meta numeric" }, De = {
	key: 0,
	class: "media-detail__meta-item"
}, Oe = {
	key: 1,
	class: "media-detail__cert"
}, ke = {
	key: 2,
	class: "media-detail__meta-item"
}, Ae = { class: "media-detail__type" }, je = {
	key: 2,
	class: "media-detail__genres"
}, Me = {
	key: 3,
	class: "media-detail__companies"
}, Ne = { class: "media-detail__company-list" }, Pe = ["src", "alt"], Fe = { class: "media-detail__overview" }, Ie = { class: "media-detail__actions" }, Le = { class: "media-detail__resume-at numeric" }, Re = {
	key: 2,
	class: "media-detail__theme"
}, ze = ["aria-label", "aria-pressed"], Be = ["aria-expanded", "onClick"], Ve = {
	key: 4,
	class: "media-detail__links"
}, He = { class: "media-detail__links-list" }, Ue = ["href", "aria-label"], We = {
	key: 5,
	class: "media-detail__credits"
}, Ge = {
	key: 0,
	class: "media-detail__credit-group"
}, Ke = { class: "media-detail__people" }, qe = ["aria-label", "onClick"], Je = { class: "media-detail__avatar" }, Ye = ["src", "alt"], Xe = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, Ze = { class: "media-detail__person-name" }, Qe = {
	key: 0,
	class: "media-detail__person-sub"
}, $e = {
	key: 1,
	class: "media-detail__credit-group"
}, et = { class: "media-detail__people" }, tt = ["aria-label", "onClick"], nt = { class: "media-detail__avatar" }, rt = ["src", "alt"], it = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, at = { class: "media-detail__person-name" }, ot = {
	key: 0,
	class: "media-detail__person-sub"
}, st = {
	key: 3,
	class: "media-detail__files"
}, ct = { class: "media-detail__files-list" }, lt = { class: "media-detail__file-path" }, ut = { class: "media-detail__file-meta" }, dt = {
	key: 0,
	class: "media-detail__file-container"
}, ft = {
	key: 1,
	class: "media-detail__file-resolution"
}, pt = { class: "media-detail__file-size" }, mt = { class: "media-detail__trailer-embed" }, ht = ["src", "title"], T = "phlix.theme.muted", gt = .35, E = /*@__PURE__*/ g({
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
		let g = e, E = t, D = ne(), O = ue("phlixConfig", null), _t = ee(), k = l(() => D.isFavorite(g.item.id));
		function vt() {
			D.toggleFavorite(g.item.id, O?.apiBase ?? ""), E("watchlist", g.item);
		}
		let yt = l(() => D.likeLevel(g.item.id)), A = l(() => _t.isAdmin), j = l(() => D.isWatched(g.item.id));
		function M() {
			D.toggleWatched(g.item.id, O?.apiBase ?? ""), E("mark-watched", g.item);
		}
		let bt = {
			movie: "movie",
			series: "tv",
			season: "tv",
			episode: "tv"
		}, N = l(() => {
			let e = g.item.external_ids;
			if (!e) return [];
			let t = bt[g.item.type], n = {
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
		}), P = b(!1), xt = l(() => g.item.type === "series" || g.item.type === "season"), St = l(() => se(g.item, {
			isAdmin: A.value,
			isWatched: j.value,
			isSeriesOrSeason: xt.value,
			canChoosePoster: A.value
		}));
		function Ct(e) {
			let t = oe, n = te();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					M();
					break;
				case t.like:
					D.setLike(g.item.id, 1, O?.apiBase ?? "");
					break;
				case t.dislike:
					D.setLike(g.item.id, -1, O?.apiBase ?? "");
					break;
				case t.addToPlaylist: {
					let e = window.prompt("Enter playlist name:");
					if (!e?.trim()) break;
					let t = e.trim();
					n.info("Creating playlist…"), r.createPlaylist(t, g.item.id).then(() => n.success("Playlist created")).catch((e) => {
						n.error("Failed to create playlist", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				}
				case t.download:
					n.info("Preparing download…"), r.getDownloadUrl(g.item.id).then(({ url: e }) => {
						window.open(e, "_blank", "noopener"), n.success("Download started");
					}).catch((e) => {
						n.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					n.info("Loading…"), r.getMissingEpisodes(g.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success("No missing episodes") : n.warning(`${t} episode${t === 1 ? "" : "s"} missing`);
					}).catch((e) => {
						n.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					r.shufflePlay(g.item.id).then(() => n.success("Shuffle play started")).catch((e) => {
						n.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					E("edit-metadata", g.item);
					break;
				case t.exploreData:
					E("explore-data", g.item);
					break;
				case t.refreshMetadata:
				case t.identify:
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
		function wt(e) {
			D.setLike(g.item.id, e, O?.apiBase ?? "");
		}
		let Tt = l(() => ce(g.item.type)), F = l(() => {
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
		let z = l(() => {
			let e = g.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function Et(e) {
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
		let B = b(!1), V = b(null);
		function Dt() {
			B.value = !0;
		}
		v(() => {
			V.value?.complete && (B.value = !0);
		});
		let H = l(() => g.item.backdrop_url_large || g.item.backdrop_url || null), Ot = l(() => g.item.backdrop_srcset || null), U = b(!1);
		function kt() {
			U.value = !0;
		}
		C(H, () => {
			U.value = !1;
		});
		let At = l(() => !!g.item.trailer_url), jt = /^[A-Za-z0-9_-]{1,20}$/, W = l(() => {
			let e = g.item.trailer_site, t = g.item.trailer_key;
			return e !== "YouTube" || !t || !jt.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), G = b(!1);
		function Mt() {
			if (W.value) {
				G.value = !0;
				return;
			}
			let e = g.item.trailer_url;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let K = l(() => g.item.logo_url || null), q = b(!1);
		function Nt() {
			q.value = !0;
		}
		let Pt = l(() => !!K.value && !q.value);
		C(K, () => {
			q.value = !1;
		});
		let Ft = i(), It = a(), J = l(() => {
			let e = g.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${It.value || Ft.value || (O?.apiBase ?? "")}${e}` : null;
		});
		function Lt() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(T) !== "false";
			} catch {
				return !0;
			}
		}
		function Rt(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(T, e ? "true" : "false");
			} catch {}
		}
		let Y = b(null), X = b(Lt()), Z = b(!1), zt = l(() => X.value ? "mute" : "volume"), Bt = l(() => X.value ? "Unmute theme music" : "Mute theme music");
		function Vt() {
			let e = Y.value;
			e && (e.muted = X.value, e.volume = X.value ? 0 : gt);
		}
		function Q() {
			let e = Y.value;
			!e || Z.value || (Vt(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = Y.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function Ht() {
			X.value = !X.value, Rt(X.value), Vt(), X.value || Q();
		}
		function Ut() {
			Z.value = !0, $();
		}
		return v(() => {
			J.value && Q();
		}), C(J, (e, t) => {
			e !== t && ($(), Z.value = !1, e && Q());
		}), fe(() => {
			$();
		}), (t, r) => (y(), f("article", me, [
			H.value ? (y(), f("div", he, [p("img", {
				class: _(["media-detail__backdrop-img", { "is-loaded": U.value }]),
				src: H.value,
				srcset: Ot.value || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: kt
			}, null, 42, ge), r[9] ||= p("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : d("", !0),
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
			}, null, 8, _e)) : d("", !0),
			e.item.poster_url ? (y(), f("div", {
				key: 2,
				class: "media-detail__ambient",
				style: de({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : d("", !0),
			p("div", ve, [e.showBack ? (y(), u(o, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => E("back")
			}, {
				default: w(() => [...r[10] ||= [m("Back", -1)]]),
				_: 1
			})) : d("", !0)]),
			p("div", ye, [p("div", be, [e.item.poster_url ? (y(), f("img", {
				key: 0,
				ref_key: "imgEl",
				ref: V,
				class: _(["media-detail__img", { "is-loaded": B.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: Dt
			}, null, 42, xe)) : (y(), f("div", Se, [h(n, { name: Tt.value }, null, 8, ["name"])]))]), p("div", Ce, [
				Pt.value ? (y(), f("img", {
					key: 0,
					class: "media-detail__logo",
					src: K.value,
					alt: e.item.name,
					decoding: "async",
					onError: Nt
				}, null, 40, we)) : (y(), f("h1", Te, S(e.item.name), 1)),
				p("div", Ee, [
					e.item.year ? (y(), f("span", De, [h(n, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), m(S(e.item.year), 1)])) : d("", !0),
					e.item.rating ? (y(), f("span", Oe, S(e.item.rating), 1)) : d("", !0),
					e.item.runtime ? (y(), f("span", ke, S(e.item.runtime) + "m", 1)) : d("", !0),
					p("span", Ae, S(e.item.type), 1)
				]),
				e.item.genres?.length ? (y(), f("div", je, [(y(!0), f(c, null, x(e.item.genres, (e) => (y(), u(s, {
					key: e,
					size: "sm",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => E("genre", e)
				}, {
					default: w(() => [m(S(e), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])) : d("", !0),
				L.value.length ? (y(), f("div", Me, [r[11] ||= p("span", { class: "media-detail__companies-label" }, "Studios", -1), p("div", Ne, [(y(!0), f(c, null, x(L.value, (e) => (y(), u(s, {
					key: e.name,
					size: "sm",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => E("company", e.name)
				}, {
					default: w(() => [e.logoUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Pe)) : d("", !0), p("span", null, S(e.name), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])])) : d("", !0),
				p("p", Fe, S(e.item.overview || "No overview available."), 1),
				p("div", Ie, [
					h(o, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (t) => E("play", e.item)
					}, {
						default: w(() => [...r[12] ||= [m("Play", -1)]]),
						_: 1
					}),
					z.value ? (y(), u(o, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (t) => E("resume", e.item)
					}, {
						default: w(() => [r[13] ||= m(" Resume ", -1), p("span", Le, S(z.value), 1)]),
						_: 1
					})) : d("", !0),
					At.value ? (y(), u(o, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: Mt
					}, {
						default: w(() => [...r[14] ||= [m(" Play Trailer ", -1)]]),
						_: 1
					})) : d("", !0),
					h(o, {
						variant: "ghost",
						class: _(["media-detail__favorite", { "is-active": k.value }]),
						"left-icon": k.value ? "bookmark" : "bookmark-plus",
						"aria-label": k.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": k.value ? "true" : "false",
						onClick: vt
					}, {
						default: w(() => [m(S(k.value ? "In favorites" : "Watchlist"), 1)]),
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
						default: w(() => [m(S(j.value ? "Watched" : "Mark watched"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(re, {
						level: yt.value,
						onCycle: wt
					}, null, 8, ["level"]),
					J.value && !Z.value ? (y(), f("div", Re, [p("button", {
						type: "button",
						class: _(["media-detail__theme-btn", { "is-active": !X.value }]),
						"aria-label": Bt.value,
						"aria-pressed": X.value ? "false" : "true",
						onClick: Ht
					}, [h(n, { name: zt.value }, null, 8, ["name"])], 10, ze), p("button", {
						type: "button",
						class: "media-detail__theme-btn media-detail__theme-stop",
						"aria-label": "Stop theme music",
						onClick: Ut
					}, [h(n, { name: "x" })])])) : d("", !0),
					h(ae, {
						open: P.value,
						"onUpdate:open": r[3] ||= (e) => P.value = e,
						items: St.value,
						onSelect: Ct
					}, {
						default: w(({ toggle: e }) => [p("button", {
							type: "button",
							class: "media-detail__menu-btn",
							"aria-label": "More actions",
							"aria-expanded": P.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: pe(e, ["stop", "prevent"])
						}, [h(n, { name: "more" })], 8, Be)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (y(), u(o, {
						key: 3,
						variant: "ghost",
						"left-icon": "search",
						onClick: r[4] ||= (t) => E("match", e.item)
					}, {
						default: w(() => [...r[15] ||= [m("Match metadata", -1)]]),
						_: 1
					})) : d("", !0)
				]),
				N.value.length ? (y(), f("div", Ve, [r[16] ||= p("span", { class: "media-detail__links-label" }, "Links", -1), p("div", He, [(y(!0), f(c, null, x(N.value, (e) => (y(), f("a", {
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
				})], 8, Ue))), 128))])])) : d("", !0),
				I.value.length || F.value.length ? (y(), f("div", We, [I.value.length ? (y(), f("section", Ge, [r[17] ||= p("h2", { class: "media-detail__credit-heading" }, "Crew", -1), p("ul", Ke, [(y(!0), f(c, null, x(I.value, (e, t) => (y(), f("li", { key: `crew-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => E("actor", e.name)
				}, [
					p("span", Je, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ye)) : (y(), f("span", Xe, S(R(e.name)), 1))]),
					p("span", Ze, S(e.name), 1),
					e.sub ? (y(), f("span", Qe, S(e.sub), 1)) : d("", !0)
				], 8, qe)]))), 128))])])) : d("", !0), F.value.length ? (y(), f("section", $e, [r[18] ||= p("h2", { class: "media-detail__credit-heading" }, "Cast", -1), p("ul", et, [(y(!0), f(c, null, x(F.value, (e, t) => (y(), f("li", { key: `cast-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => E("actor", e.name)
				}, [
					p("span", nt, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, rt)) : (y(), f("span", it, S(R(e.name)), 1))]),
					p("span", at, S(e.name), 1),
					e.sub ? (y(), f("span", ot, S(e.sub), 1)) : d("", !0)
				], 8, tt)]))), 128))])])) : d("", !0)])) : d("", !0)
			])]),
			e.item.files?.length ? (y(), f("section", st, [r[19] ||= p("h2", { class: "media-detail__files-heading" }, "Files", -1), p("ul", ct, [(y(!0), f(c, null, x(e.item.files, (e, t) => (y(), f("li", {
				key: t,
				class: "media-detail__file"
			}, [p("span", lt, S(e.path), 1), p("span", ut, [
				e.container ? (y(), f("span", dt, S(e.container), 1)) : d("", !0),
				e.resolution ? (y(), f("span", ft, S(e.resolution), 1)) : d("", !0),
				p("span", pt, S(Et(e.size_bytes)), 1)
			])]))), 128))])])) : d("", !0),
			e.similarLoading || e.similar.length ? (y(), u(le, {
				key: 4,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: r[5] ||= (e) => E("play", e),
				onWatchlist: r[6] ||= (e) => E("watchlist", e),
				onInfo: r[7] ||= (e) => E("info", e)
			}, null, 8, ["items", "loading"])) : d("", !0),
			W.value ? (y(), u(ie, {
				key: 5,
				modelValue: G.value,
				"onUpdate:modelValue": r[8] ||= (e) => G.value = e,
				title: `Trailer — ${e.item.name}`,
				size: "lg"
			}, {
				default: w(() => [p("div", mt, [p("iframe", {
					class: "media-detail__trailer-iframe",
					src: W.value,
					title: `${e.item.name} trailer`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, ht)])]),
				_: 1
			}, 8, ["modelValue", "title"])) : d("", !0)
		]));
	}
}), D = /* @__PURE__ */ e({ default: () => O }), O = /*#__PURE__*/ t(E, [["__scopeId", "data-v-a789086c"]]);
//#endregion
export { D as n, O as t };

//# sourceMappingURL=MediaDetail-D91FV_Lf.js.map