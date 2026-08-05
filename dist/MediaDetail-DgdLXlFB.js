import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t, t as n } from "./Icon-CkTBN_k5.js";
import { t as r } from "./IconButton-3ZuilWzd.js";
import { a as i } from "./plural-DMM7pLFA.js";
import { i as a } from "./client-COHWZ2KC.js";
import { n as ee, r as te } from "./useApiBase-CV_r-Kk4.js";
import { t as ne } from "./useAuthStore-Bxpn4wWU.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { n as ie, t as ae } from "./ThumbRating-1bRvqpja.js";
import { t as o } from "./Button-Cw8Wl4QR.js";
import { t as s } from "./Chip-4LSLVIhi.js";
import { t as oe } from "./Modal-Nn1mtFl3.js";
import { t as se } from "./Menu-CcVQWgwT.js";
import { n as ce, r as le } from "./MediaCard-aYhuTtNS.js";
import { t as ue } from "./mediaTypeIcon-Bde251Qi.js";
import { t as de } from "./MediaRow-CWbdI_8n.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as fe, normalizeClass as _, normalizeStyle as pe, onBeforeUnmount as me, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, watch as C, withCtx as w, withModifiers as he } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var ge = { class: "media-detail" }, _e = {
	key: 0,
	class: "media-detail__backdrop",
	"aria-hidden": "true"
}, ve = ["src", "srcset"], ye = ["src"], be = {
	key: 0,
	class: "media-detail__ambient-scrim",
	"aria-hidden": "true"
}, xe = { class: "media-detail__bar" }, Se = { class: "media-detail__hero" }, Ce = { class: "media-detail__poster" }, we = ["src", "alt"], Te = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, Ee = { class: "media-detail__info" }, De = ["src", "alt"], Oe = {
	key: 1,
	class: "media-detail__title"
}, ke = { class: "media-detail__meta numeric" }, Ae = {
	key: 0,
	class: "media-detail__meta-item"
}, je = {
	key: 1,
	class: "media-detail__cert"
}, Me = {
	key: 2,
	class: "media-detail__meta-item"
}, Ne = { class: "media-detail__type" }, Pe = {
	key: 2,
	class: "media-detail__genres"
}, Fe = {
	key: 3,
	class: "media-detail__companies"
}, Ie = { class: "media-detail__company-list" }, Le = ["src", "alt"], Re = { class: "media-detail__overview" }, ze = { class: "media-detail__actions" }, Be = { class: "media-detail__resume-at numeric" }, Ve = {
	key: 2,
	class: "media-detail__theme"
}, He = {
	key: 4,
	class: "media-detail__links"
}, Ue = { class: "media-detail__links-list" }, We = ["href", "aria-label"], Ge = {
	key: 5,
	class: "media-detail__credits"
}, Ke = {
	key: 0,
	class: "media-detail__credit-group"
}, qe = { class: "media-detail__people" }, Je = ["aria-label", "onClick"], Ye = { class: "media-detail__avatar" }, Xe = ["src", "alt"], Ze = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, Qe = { class: "media-detail__person-name" }, $e = {
	key: 0,
	class: "media-detail__person-sub"
}, et = {
	key: 1,
	class: "media-detail__credit-group"
}, tt = { class: "media-detail__people" }, nt = ["aria-label", "onClick"], rt = { class: "media-detail__avatar" }, it = ["src", "alt"], at = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, ot = { class: "media-detail__person-name" }, st = {
	key: 0,
	class: "media-detail__person-sub"
}, ct = {
	key: 3,
	class: "media-detail__files"
}, lt = { class: "media-detail__files-list" }, ut = { class: "media-detail__file-path" }, dt = { class: "media-detail__file-meta" }, ft = {
	key: 0,
	class: "media-detail__file-container"
}, pt = {
	key: 1,
	class: "media-detail__file-resolution"
}, mt = { class: "media-detail__file-size" }, ht = { class: "media-detail__trailer-embed" }, gt = ["src", "title"], T = "phlix.theme.muted", _t = .35, E = /*@__PURE__*/ g({
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
		let g = e, E = t, D = ie(), O = fe("phlixConfig", null), vt = ne(), k = l(() => D.isFavorite(g.item.id));
		function yt() {
			D.toggleFavorite(g.item.id, O?.apiBase ?? ""), E("watchlist", g.item);
		}
		let bt = l(() => D.likeLevel(g.item.id)), A = l(() => vt.isAdmin), j = l(() => D.isWatched(g.item.id));
		function M() {
			D.toggleWatched(g.item.id, O?.apiBase ?? ""), E("mark-watched", g.item);
		}
		let xt = {
			movie: "movie",
			series: "tv",
			season: "tv",
			episode: "tv"
		}, N = l(() => {
			let e = g.item.external_ids;
			if (!e) return [];
			let t = xt[g.item.type], n = {
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
		}), P = b(!1), St = l(() => g.item.type === "series" || g.item.type === "season"), Ct = l(() => le(g.item, {
			isAdmin: A.value,
			isWatched: j.value,
			isSeriesOrSeason: St.value,
			canChoosePoster: A.value
		}));
		function wt(e) {
			let t = ce, n = re();
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
		function Tt(e) {
			D.setLike(g.item.id, e, O?.apiBase ?? "");
		}
		let Et = l(() => ue(g.item.type)), F = l(() => {
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
		function Dt(e) {
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
		function Ot() {
			B.value = !0;
		}
		v(() => {
			V.value?.complete && (B.value = !0);
		});
		let H = l(() => g.item.backdrop_url_large || g.item.backdrop_url || null), kt = l(() => g.item.backdrop_srcset || null), U = b(!1);
		function At() {
			U.value = !0;
		}
		C(H, () => {
			U.value = !1;
		});
		let jt = l(() => !!g.item.trailer_url), Mt = /^[A-Za-z0-9_-]{1,20}$/, W = l(() => {
			let e = g.item.trailer_site, t = g.item.trailer_key;
			return e !== "YouTube" || !t || !Mt.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), G = b(!1);
		function Nt() {
			if (W.value) {
				G.value = !0;
				return;
			}
			let e = g.item.trailer_url;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let K = l(() => g.item.logo_url || null), q = b(!1);
		function Pt() {
			q.value = !0;
		}
		let Ft = l(() => !!K.value && !q.value);
		C(K, () => {
			q.value = !1;
		});
		let It = ee(), Lt = te(), J = l(() => {
			let e = g.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${Lt.value || It.value || (O?.apiBase ?? "")}${e}` : null;
		});
		function Rt() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(T) !== "false";
			} catch {
				return !0;
			}
		}
		function zt(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(T, e ? "true" : "false");
			} catch {}
		}
		let Y = b(null), X = b(Rt()), Z = b(!1), Bt = l(() => X.value ? "mute" : "volume"), Vt = l(() => X.value ? "Unmute theme music" : "Mute theme music");
		function Ht() {
			let e = Y.value;
			e && (e.muted = X.value, e.volume = X.value ? 0 : _t);
		}
		function Q() {
			let e = Y.value;
			!e || Z.value || (Ht(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = Y.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function Ut() {
			X.value = !X.value, zt(X.value), Ht(), X.value || Q();
		}
		function Wt() {
			Z.value = !0, $();
		}
		return v(() => {
			J.value && Q();
		}), C(J, (e, t) => {
			e !== t && ($(), Z.value = !1, e && Q());
		}), me(() => {
			$();
		}), (t, i) => (y(), f("article", ge, [
			H.value ? (y(), f("div", _e, [p("img", {
				class: _(["media-detail__backdrop-img", { "is-loaded": U.value }]),
				src: H.value,
				srcset: kt.value || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: At
			}, null, 42, ve), i[9] ||= p("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : d("", !0),
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
			}, null, 8, ye)) : d("", !0),
			e.item.poster_url ? (y(), f(c, { key: 2 }, [p("div", {
				class: "media-detail__ambient",
				style: pe({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4), H.value ? d("", !0) : (y(), f("div", be))], 64)) : d("", !0),
			p("div", xe, [e.showBack ? (y(), u(o, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: i[0] ||= (e) => E("back")
			}, {
				default: w(() => [...i[10] ||= [m("Back", -1)]]),
				_: 1
			})) : d("", !0)]),
			p("div", Se, [p("div", Ce, [e.item.poster_url ? (y(), f("img", {
				key: 0,
				ref_key: "imgEl",
				ref: V,
				class: _(["media-detail__img", { "is-loaded": B.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: Ot
			}, null, 42, we)) : (y(), f("div", Te, [h(n, { name: Et.value }, null, 8, ["name"])]))]), p("div", Ee, [
				Ft.value ? (y(), f("img", {
					key: 0,
					class: "media-detail__logo",
					src: K.value,
					alt: e.item.name,
					decoding: "async",
					onError: Pt
				}, null, 40, De)) : (y(), f("h1", Oe, S(e.item.name), 1)),
				p("div", ke, [
					e.item.year ? (y(), f("span", Ae, [h(n, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), m(S(e.item.year), 1)])) : d("", !0),
					e.item.rating ? (y(), f("span", je, S(e.item.rating), 1)) : d("", !0),
					e.item.runtime ? (y(), f("span", Me, S(e.item.runtime) + "m", 1)) : d("", !0),
					p("span", Ne, S(e.item.type), 1)
				]),
				e.item.genres?.length ? (y(), f("div", Pe, [(y(!0), f(c, null, x(e.item.genres, (e) => (y(), u(s, {
					key: e,
					size: "sm",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => E("genre", e)
				}, {
					default: w(() => [m(S(e), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])) : d("", !0),
				L.value.length ? (y(), f("div", Fe, [i[11] ||= p("span", { class: "media-detail__companies-label" }, "Studios", -1), p("div", Ie, [(y(!0), f(c, null, x(L.value, (e) => (y(), u(s, {
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
					}, null, 8, Le)) : d("", !0), p("span", null, S(e.name), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])])) : d("", !0),
				p("p", Re, S(e.item.overview || "No overview available."), 1),
				p("div", ze, [
					h(o, {
						variant: "solid",
						"left-icon": "play",
						onClick: i[1] ||= (t) => E("play", e.item)
					}, {
						default: w(() => [...i[12] ||= [m("Play", -1)]]),
						_: 1
					}),
					z.value ? (y(), u(o, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: i[2] ||= (t) => E("resume", e.item)
					}, {
						default: w(() => [i[13] ||= m(" Resume ", -1), p("span", Be, S(z.value), 1)]),
						_: 1
					})) : d("", !0),
					jt.value ? (y(), u(o, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: Nt
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
						onClick: yt
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
					h(ae, {
						level: bt.value,
						onCycle: Tt
					}, null, 8, ["level"]),
					J.value && !Z.value ? (y(), f("div", Ve, [h(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: Bt.value,
						label: Vt.value,
						pressed: !X.value,
						onClick: Ut
					}, null, 8, [
						"name",
						"label",
						"pressed"
					]), h(r, {
						variant: "ghost",
						class: "media-detail__theme-btn",
						name: "x",
						label: "Stop theme music",
						onClick: Wt
					})])) : d("", !0),
					h(se, {
						open: P.value,
						"onUpdate:open": i[3] ||= (e) => P.value = e,
						items: Ct.value,
						onSelect: wt
					}, {
						default: w(({ toggle: e }) => [h(r, {
							variant: "ghost",
							name: "more",
							label: "More actions",
							"aria-expanded": P.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: he(e, ["stop", "prevent"])
						}, null, 8, ["aria-expanded", "onClick"])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (y(), u(o, {
						key: 3,
						variant: "outline",
						"left-icon": "search",
						onClick: i[4] ||= (t) => E("match", e.item)
					}, {
						default: w(() => [...i[15] ||= [m("Match metadata", -1)]]),
						_: 1
					})) : d("", !0)
				]),
				N.value.length ? (y(), f("div", He, [i[16] ||= p("span", { class: "media-detail__links-label" }, "Links", -1), p("div", Ue, [(y(!0), f(c, null, x(N.value, (e) => (y(), f("a", {
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
				})], 8, We))), 128))])])) : d("", !0),
				I.value.length || F.value.length ? (y(), f("div", Ge, [I.value.length ? (y(), f("section", Ke, [i[17] ||= p("h2", { class: "media-detail__credit-heading" }, "Crew", -1), p("ul", qe, [(y(!0), f(c, null, x(I.value, (e, t) => (y(), f("li", { key: `crew-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => E("actor", e.name)
				}, [
					p("span", Ye, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Xe)) : (y(), f("span", Ze, S(R(e.name)), 1))]),
					p("span", Qe, S(e.name), 1),
					e.sub ? (y(), f("span", $e, S(e.sub), 1)) : d("", !0)
				], 8, Je)]))), 128))])])) : d("", !0), F.value.length ? (y(), f("section", et, [i[18] ||= p("h2", { class: "media-detail__credit-heading" }, "Cast", -1), p("ul", tt, [(y(!0), f(c, null, x(F.value, (e, t) => (y(), f("li", { key: `cast-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => E("actor", e.name)
				}, [
					p("span", rt, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, it)) : (y(), f("span", at, S(R(e.name)), 1))]),
					p("span", ot, S(e.name), 1),
					e.sub ? (y(), f("span", st, S(e.sub), 1)) : d("", !0)
				], 8, nt)]))), 128))])])) : d("", !0)])) : d("", !0)
			])]),
			e.item.files?.length ? (y(), f("section", ct, [i[19] ||= p("h2", { class: "media-detail__files-heading" }, "Files", -1), p("ul", lt, [(y(!0), f(c, null, x(e.item.files, (e, t) => (y(), f("li", {
				key: t,
				class: "media-detail__file"
			}, [p("span", ut, S(e.path), 1), p("span", dt, [
				e.container ? (y(), f("span", ft, S(e.container), 1)) : d("", !0),
				e.resolution ? (y(), f("span", pt, S(e.resolution), 1)) : d("", !0),
				p("span", mt, S(Dt(e.size_bytes)), 1)
			])]))), 128))])])) : d("", !0),
			e.similarLoading || e.similar.length ? (y(), u(de, {
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
			W.value ? (y(), u(oe, {
				key: 5,
				modelValue: G.value,
				"onUpdate:modelValue": i[8] ||= (e) => G.value = e,
				title: `Trailer — ${e.item.name}`,
				size: "lg"
			}, {
				default: w(() => [p("div", ht, [p("iframe", {
					class: "media-detail__trailer-iframe",
					src: W.value,
					title: `${e.item.name} trailer`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, gt)])]),
				_: 1
			}, 8, ["modelValue", "title"])) : d("", !0)
		]));
	}
}), D = /* @__PURE__ */ e({ default: () => O }), O = /*#__PURE__*/ t(E, [["__scopeId", "data-v-c45e88c7"]]);
//#endregion
export { D as n, O as t };

//# sourceMappingURL=MediaDetail-DgdLXlFB.js.map