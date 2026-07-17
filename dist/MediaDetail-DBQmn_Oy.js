import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-X5skTbAE.js";
import { r } from "./client-D1nDQ0cP.js";
import { n as i, r as a } from "./useApiBase-CV_r-Kk4.js";
import { t as ee } from "./useAuthStore-C_Rnq3Bo.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { n as ne, t as re } from "./ThumbRating-Db3pVsxe.js";
import { t as o } from "./Button-DGsvHynO.js";
import { t as s } from "./Chip-Dqypy8Bt.js";
import { a as ie, n as ae, r as oe } from "./MediaCard-CCRiMSLS.js";
import { t as se } from "./MediaRow-CquQA_Wi.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ce, normalizeClass as _, normalizeStyle as le, onBeforeUnmount as ue, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, watch as C, withCtx as w, withModifiers as de } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var fe = { class: "media-detail" }, pe = {
	key: 0,
	class: "media-detail__backdrop",
	"aria-hidden": "true"
}, me = ["src", "srcset"], he = ["src"], ge = { class: "media-detail__bar" }, _e = { class: "media-detail__hero" }, ve = { class: "media-detail__poster" }, ye = ["src", "alt"], be = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, xe = { class: "media-detail__info" }, Se = { class: "media-detail__title" }, Ce = { class: "media-detail__meta numeric" }, we = {
	key: 0,
	class: "media-detail__meta-item"
}, Te = {
	key: 1,
	class: "media-detail__cert"
}, Ee = {
	key: 2,
	class: "media-detail__meta-item"
}, De = { class: "media-detail__type" }, T = {
	key: 0,
	class: "media-detail__genres"
}, E = {
	key: 1,
	class: "media-detail__companies"
}, Oe = { class: "media-detail__company-list" }, ke = ["src", "alt"], Ae = { class: "media-detail__overview" }, je = { class: "media-detail__actions" }, Me = { class: "media-detail__resume-at numeric" }, Ne = {
	key: 1,
	class: "media-detail__theme"
}, Pe = ["aria-label", "aria-pressed"], Fe = ["aria-expanded", "onClick"], Ie = {
	key: 2,
	class: "media-detail__links"
}, Le = { class: "media-detail__links-list" }, Re = ["href", "aria-label"], ze = {
	key: 3,
	class: "media-detail__credits"
}, Be = {
	key: 0,
	class: "media-detail__credit-group"
}, Ve = { class: "media-detail__people" }, He = ["aria-label", "onClick"], Ue = { class: "media-detail__avatar" }, We = ["src", "alt"], Ge = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, Ke = { class: "media-detail__person-name" }, qe = {
	key: 0,
	class: "media-detail__person-sub"
}, Je = {
	key: 1,
	class: "media-detail__credit-group"
}, D = { class: "media-detail__people" }, Ye = ["aria-label", "onClick"], Xe = { class: "media-detail__avatar" }, Ze = ["src", "alt"], Qe = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, $e = { class: "media-detail__person-name" }, et = {
	key: 0,
	class: "media-detail__person-sub"
}, tt = {
	key: 3,
	class: "media-detail__files"
}, nt = { class: "media-detail__files-list" }, rt = { class: "media-detail__file-path" }, it = { class: "media-detail__file-meta" }, at = {
	key: 0,
	class: "media-detail__file-container"
}, ot = {
	key: 1,
	class: "media-detail__file-resolution"
}, st = { class: "media-detail__file-size" }, O = "phlix.theme.muted", ct = .35, k = /*@__PURE__*/ g({
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
		let g = e, k = t, A = ne(), j = ce("phlixConfig", null), lt = ee(), M = l(() => A.isFavorite(g.item.id));
		function ut() {
			A.toggleFavorite(g.item.id, j?.apiBase ?? ""), k("watchlist", g.item);
		}
		let dt = l(() => A.likeLevel(g.item.id)), N = l(() => lt.isAdmin), P = l(() => A.isWatched(g.item.id));
		function F() {
			A.toggleWatched(g.item.id, j?.apiBase ?? ""), k("mark-watched", g.item);
		}
		let I = l(() => {
			let e = g.item.external_ids;
			if (!e) return [];
			let t = g.item.type === "movie" ? "movie" : "tv", n = {
				tmdb: {
					label: "TMDB",
					url: (e) => `https://www.themoviedb.org/${t}/${encodeURIComponent(e)}`
				},
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
		}), L = b(!1), ft = l(() => g.item.type === "series" || g.item.type === "season"), pt = l(() => oe(g.item, {
			isAdmin: N.value,
			isWatched: P.value,
			isSeriesOrSeason: ft.value,
			canChoosePoster: N.value
		}));
		function mt(e) {
			let t = ae, n = te();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					F();
					break;
				case t.like:
					A.setLike(g.item.id, 1, j?.apiBase ?? "");
					break;
				case t.dislike:
					A.setLike(g.item.id, -1, j?.apiBase ?? "");
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
					k("edit-metadata", g.item);
					break;
				case t.exploreData:
					k("explore-data", g.item);
					break;
				case t.refreshMetadata:
				case t.identify:
					k("refresh", g.item);
					break;
				case t.editImages:
					k("choose-poster", g.item);
					break;
				case t.remove:
					k("remove", g.item);
					break;
				default: n.info(`${e.label} isn't available yet`);
			}
		}
		function ht(e) {
			A.setLike(g.item.id, e, j?.apiBase ?? "");
		}
		let gt = l(() => g.item.type === "audio" ? "music" : g.item.type === "image" ? "image" : g.item.type === "series" ? "tv" : "film"), R = l(() => {
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
		}), z = l(() => {
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
		}), B = l(() => {
			let e = g.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : g.item.studio ? [{
				name: g.item.studio,
				logoUrl: null
			}] : [];
		});
		function V(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let H = l(() => {
			let e = g.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function _t(e) {
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
		let U = b(!1), W = b(null);
		function vt() {
			U.value = !0;
		}
		v(() => {
			W.value?.complete && (U.value = !0);
		});
		let G = l(() => g.item.backdrop_url_large || g.item.backdrop_url || null), yt = l(() => g.item.backdrop_srcset || null), K = b(!1);
		function bt() {
			K.value = !0;
		}
		C(G, () => {
			K.value = !1;
		});
		let xt = i(), St = a(), q = l(() => {
			let e = g.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${St.value || xt.value || (j?.apiBase ?? "")}${e}` : null;
		});
		function Ct() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(O) !== "false";
			} catch {
				return !0;
			}
		}
		function wt(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(O, e ? "true" : "false");
			} catch {}
		}
		let J = b(null), Y = b(Ct()), X = b(!1), Tt = l(() => Y.value ? "mute" : "volume"), Et = l(() => Y.value ? "Unmute theme music" : "Mute theme music");
		function Z() {
			let e = J.value;
			e && (e.muted = Y.value, e.volume = Y.value ? 0 : ct);
		}
		function Q() {
			let e = J.value;
			!e || X.value || (Z(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = J.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function Dt() {
			Y.value = !Y.value, wt(Y.value), Z(), Y.value || Q();
		}
		function Ot() {
			X.value = !0, $();
		}
		return v(() => {
			q.value && Q();
		}), C(q, (e, t) => {
			e !== t && ($(), X.value = !1, e && Q());
		}), ue(() => {
			$();
		}), (t, r) => (y(), f("article", fe, [
			G.value ? (y(), f("div", pe, [p("img", {
				class: _(["media-detail__backdrop-img", { "is-loaded": K.value }]),
				src: G.value,
				srcset: yt.value || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: bt
			}, null, 42, me), r[8] ||= p("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : d("", !0),
			q.value ? (y(), f("audio", {
				key: 1,
				ref_key: "themeAudioEl",
				ref: J,
				src: q.value,
				class: "media-detail__theme-audio",
				loop: "",
				preload: "auto",
				"aria-hidden": "true",
				tabindex: "-1"
			}, null, 8, he)) : d("", !0),
			e.item.poster_url ? (y(), f("div", {
				key: 2,
				class: "media-detail__ambient",
				style: le({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : d("", !0),
			p("div", ge, [e.showBack ? (y(), u(o, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => k("back")
			}, {
				default: w(() => [...r[9] ||= [m("Back", -1)]]),
				_: 1
			})) : d("", !0)]),
			p("div", _e, [p("div", ve, [e.item.poster_url ? (y(), f("img", {
				key: 0,
				ref_key: "imgEl",
				ref: W,
				class: _(["media-detail__img", { "is-loaded": U.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: vt
			}, null, 42, ye)) : (y(), f("div", be, [h(n, { name: gt.value }, null, 8, ["name"])]))]), p("div", xe, [
				p("h1", Se, S(e.item.name), 1),
				p("div", Ce, [
					e.item.year ? (y(), f("span", we, [h(n, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), m(S(e.item.year), 1)])) : d("", !0),
					e.item.rating ? (y(), f("span", Te, S(e.item.rating), 1)) : d("", !0),
					e.item.runtime ? (y(), f("span", Ee, S(e.item.runtime) + "m", 1)) : d("", !0),
					p("span", De, S(e.item.type), 1)
				]),
				e.item.genres?.length ? (y(), f("div", T, [(y(!0), f(c, null, x(e.item.genres, (e) => (y(), u(s, {
					key: e,
					size: "sm",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => k("genre", e)
				}, {
					default: w(() => [m(S(e), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])) : d("", !0),
				B.value.length ? (y(), f("div", E, [r[10] ||= p("span", { class: "media-detail__companies-label" }, "Studios", -1), p("div", Oe, [(y(!0), f(c, null, x(B.value, (e) => (y(), u(s, {
					key: e.name,
					size: "sm",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => k("company", e.name)
				}, {
					default: w(() => [e.logoUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ke)) : d("", !0), p("span", null, S(e.name), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])])) : d("", !0),
				p("p", Ae, S(e.item.overview || "No overview available."), 1),
				p("div", je, [
					h(o, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (t) => k("play", e.item)
					}, {
						default: w(() => [...r[11] ||= [m("Play", -1)]]),
						_: 1
					}),
					H.value ? (y(), u(o, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (t) => k("resume", e.item)
					}, {
						default: w(() => [r[12] ||= m(" Resume ", -1), p("span", Me, S(H.value), 1)]),
						_: 1
					})) : d("", !0),
					h(o, {
						variant: "ghost",
						class: _(["media-detail__favorite", { "is-active": M.value }]),
						"left-icon": M.value ? "bookmark" : "bookmark-plus",
						"aria-label": M.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": M.value ? "true" : "false",
						onClick: ut
					}, {
						default: w(() => [m(S(M.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(o, {
						variant: "ghost",
						class: _(["media-detail__watched", { "is-active": P.value }]),
						"left-icon": P.value ? "eye" : "eye-off",
						"aria-label": P.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": P.value ? "true" : "false",
						onClick: F
					}, {
						default: w(() => [m(S(P.value ? "Watched" : "Mark watched"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(re, {
						level: dt.value,
						onCycle: ht
					}, null, 8, ["level"]),
					q.value && !X.value ? (y(), f("div", Ne, [p("button", {
						type: "button",
						class: _(["media-detail__theme-btn", { "is-active": !Y.value }]),
						"aria-label": Et.value,
						"aria-pressed": Y.value ? "false" : "true",
						onClick: Dt
					}, [h(n, { name: Tt.value }, null, 8, ["name"])], 10, Pe), p("button", {
						type: "button",
						class: "media-detail__theme-btn media-detail__theme-stop",
						"aria-label": "Stop theme music",
						onClick: Ot
					}, [h(n, { name: "x" })])])) : d("", !0),
					h(ie, {
						open: L.value,
						"onUpdate:open": r[3] ||= (e) => L.value = e,
						items: pt.value,
						onSelect: mt
					}, {
						default: w(({ toggle: e }) => [p("button", {
							type: "button",
							class: "media-detail__menu-btn",
							"aria-label": "More actions",
							"aria-expanded": L.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: de(e, ["stop", "prevent"])
						}, [h(n, { name: "more" })], 8, Fe)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (y(), u(o, {
						key: 2,
						variant: "ghost",
						"left-icon": "search",
						onClick: r[4] ||= (t) => k("match", e.item)
					}, {
						default: w(() => [...r[13] ||= [m("Match metadata", -1)]]),
						_: 1
					})) : d("", !0)
				]),
				I.value.length ? (y(), f("div", Ie, [r[14] ||= p("span", { class: "media-detail__links-label" }, "Links", -1), p("div", Le, [(y(!0), f(c, null, x(I.value, (e) => (y(), f("a", {
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
				})], 8, Re))), 128))])])) : d("", !0),
				z.value.length || R.value.length ? (y(), f("div", ze, [z.value.length ? (y(), f("section", Be, [r[15] ||= p("h2", { class: "media-detail__credit-heading" }, "Crew", -1), p("ul", Ve, [(y(!0), f(c, null, x(z.value, (e, t) => (y(), f("li", { key: `crew-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => k("actor", e.name)
				}, [
					p("span", Ue, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, We)) : (y(), f("span", Ge, S(V(e.name)), 1))]),
					p("span", Ke, S(e.name), 1),
					e.sub ? (y(), f("span", qe, S(e.sub), 1)) : d("", !0)
				], 8, He)]))), 128))])])) : d("", !0), R.value.length ? (y(), f("section", Je, [r[16] ||= p("h2", { class: "media-detail__credit-heading" }, "Cast", -1), p("ul", D, [(y(!0), f(c, null, x(R.value, (e, t) => (y(), f("li", { key: `cast-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => k("actor", e.name)
				}, [
					p("span", Xe, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ze)) : (y(), f("span", Qe, S(V(e.name)), 1))]),
					p("span", $e, S(e.name), 1),
					e.sub ? (y(), f("span", et, S(e.sub), 1)) : d("", !0)
				], 8, Ye)]))), 128))])])) : d("", !0)])) : d("", !0)
			])]),
			e.item.files?.length ? (y(), f("section", tt, [r[17] ||= p("h2", { class: "media-detail__files-heading" }, "Files", -1), p("ul", nt, [(y(!0), f(c, null, x(e.item.files, (e, t) => (y(), f("li", {
				key: t,
				class: "media-detail__file"
			}, [p("span", rt, S(e.path), 1), p("span", it, [
				e.container ? (y(), f("span", at, S(e.container), 1)) : d("", !0),
				e.resolution ? (y(), f("span", ot, S(e.resolution), 1)) : d("", !0),
				p("span", st, S(_t(e.size_bytes)), 1)
			])]))), 128))])])) : d("", !0),
			e.similarLoading || e.similar.length ? (y(), u(se, {
				key: 4,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: r[5] ||= (e) => k("play", e),
				onWatchlist: r[6] ||= (e) => k("watchlist", e),
				onInfo: r[7] ||= (e) => k("info", e)
			}, null, 8, ["items", "loading"])) : d("", !0)
		]));
	}
}), A = /* @__PURE__ */ e({ default: () => j }), j = /*#__PURE__*/ t(k, [["__scopeId", "data-v-765a2ef3"]]);
//#endregion
export { A as n, j as t };

//# sourceMappingURL=MediaDetail-DBQmn_Oy.js.map