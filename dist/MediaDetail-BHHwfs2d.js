import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-Ci10VWtp.js";
import { t as r } from "./Modal-BkHcWnO5.js";
import { r as i } from "./client-D80As4Gx.js";
import { n as a, r as ee } from "./useApiBase-CV_r-Kk4.js";
import { t as te } from "./useAuthStore-D2BCcJAK.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { n as re, t as ie } from "./ThumbRating-DV17BrTc.js";
import { t as o } from "./Button-AW4z0vv0.js";
import { t as s } from "./Chip-Dvxt_LxF.js";
import { t as ae } from "./Menu-DRkKveJV.js";
import { n as oe, r as se } from "./MediaCard-B6hlS1dU.js";
import { t as ce } from "./MediaRow-BOXdHzvB.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as le, normalizeClass as _, normalizeStyle as ue, onBeforeUnmount as de, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, watch as C, withCtx as w, withModifiers as fe } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var pe = { class: "media-detail" }, me = {
	key: 0,
	class: "media-detail__backdrop",
	"aria-hidden": "true"
}, he = ["src", "srcset"], ge = ["src"], _e = { class: "media-detail__bar" }, ve = { class: "media-detail__hero" }, ye = { class: "media-detail__poster" }, be = ["src", "alt"], xe = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, Se = { class: "media-detail__info" }, Ce = ["src", "alt"], we = {
	key: 1,
	class: "media-detail__title"
}, Te = { class: "media-detail__meta numeric" }, Ee = {
	key: 0,
	class: "media-detail__meta-item"
}, De = {
	key: 1,
	class: "media-detail__cert"
}, Oe = {
	key: 2,
	class: "media-detail__meta-item"
}, ke = { class: "media-detail__type" }, Ae = {
	key: 2,
	class: "media-detail__genres"
}, je = {
	key: 3,
	class: "media-detail__companies"
}, Me = { class: "media-detail__company-list" }, Ne = ["src", "alt"], Pe = { class: "media-detail__overview" }, Fe = { class: "media-detail__actions" }, Ie = { class: "media-detail__resume-at numeric" }, Le = {
	key: 2,
	class: "media-detail__theme"
}, Re = ["aria-label", "aria-pressed"], ze = ["aria-expanded", "onClick"], Be = {
	key: 4,
	class: "media-detail__links"
}, Ve = { class: "media-detail__links-list" }, He = ["href", "aria-label"], Ue = {
	key: 5,
	class: "media-detail__credits"
}, We = {
	key: 0,
	class: "media-detail__credit-group"
}, Ge = { class: "media-detail__people" }, Ke = ["aria-label", "onClick"], qe = { class: "media-detail__avatar" }, Je = ["src", "alt"], Ye = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, Xe = { class: "media-detail__person-name" }, Ze = {
	key: 0,
	class: "media-detail__person-sub"
}, Qe = {
	key: 1,
	class: "media-detail__credit-group"
}, $e = { class: "media-detail__people" }, et = ["aria-label", "onClick"], tt = { class: "media-detail__avatar" }, nt = ["src", "alt"], rt = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, it = { class: "media-detail__person-name" }, at = {
	key: 0,
	class: "media-detail__person-sub"
}, ot = {
	key: 3,
	class: "media-detail__files"
}, st = { class: "media-detail__files-list" }, ct = { class: "media-detail__file-path" }, lt = { class: "media-detail__file-meta" }, ut = {
	key: 0,
	class: "media-detail__file-container"
}, dt = {
	key: 1,
	class: "media-detail__file-resolution"
}, ft = { class: "media-detail__file-size" }, pt = { class: "media-detail__trailer-embed" }, mt = ["src", "title"], T = "phlix.theme.muted", ht = .35, E = /*@__PURE__*/ g({
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
		let g = e, E = t, D = re(), O = le("phlixConfig", null), gt = te(), k = l(() => D.isFavorite(g.item.id));
		function _t() {
			D.toggleFavorite(g.item.id, O?.apiBase ?? ""), E("watchlist", g.item);
		}
		let vt = l(() => D.likeLevel(g.item.id)), A = l(() => gt.isAdmin), j = l(() => D.isWatched(g.item.id));
		function M() {
			D.toggleWatched(g.item.id, O?.apiBase ?? ""), E("mark-watched", g.item);
		}
		let N = l(() => {
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
		}), P = b(!1), yt = l(() => g.item.type === "series" || g.item.type === "season"), bt = l(() => se(g.item, {
			isAdmin: A.value,
			isWatched: j.value,
			isSeriesOrSeason: yt.value,
			canChoosePoster: A.value
		}));
		function xt(e) {
			let t = oe, n = ne();
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
					n.info("Creating playlist…"), i.createPlaylist(t, g.item.id).then(() => n.success("Playlist created")).catch((e) => {
						n.error("Failed to create playlist", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				}
				case t.download:
					n.info("Preparing download…"), i.getDownloadUrl(g.item.id).then(({ url: e }) => {
						window.open(e, "_blank", "noopener"), n.success("Download started");
					}).catch((e) => {
						n.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					n.info("Loading…"), i.getMissingEpisodes(g.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success("No missing episodes") : n.warning(`${t} episode${t === 1 ? "" : "s"} missing`);
					}).catch((e) => {
						n.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					i.shufflePlay(g.item.id).then(() => n.success("Shuffle play started")).catch((e) => {
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
		function St(e) {
			D.setLike(g.item.id, e, O?.apiBase ?? "");
		}
		let Ct = l(() => g.item.type === "audio" ? "music" : g.item.type === "image" ? "image" : g.item.type === "series" ? "tv" : "film"), F = l(() => {
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
		function wt(e) {
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
		function Tt() {
			B.value = !0;
		}
		v(() => {
			V.value?.complete && (B.value = !0);
		});
		let H = l(() => g.item.backdrop_url_large || g.item.backdrop_url || null), Et = l(() => g.item.backdrop_srcset || null), U = b(!1);
		function Dt() {
			U.value = !0;
		}
		C(H, () => {
			U.value = !1;
		});
		let Ot = l(() => !!g.item.trailer_url), kt = /^[A-Za-z0-9_-]{1,20}$/, W = l(() => {
			let e = g.item.trailer_site, t = g.item.trailer_key;
			return e !== "YouTube" || !t || !kt.test(t) ? null : `https://www.youtube.com/embed/${t}`;
		}), G = b(!1);
		function At() {
			if (W.value) {
				G.value = !0;
				return;
			}
			let e = g.item.trailer_url;
			e && typeof window < "u" && window.open(e, "_blank", "noopener,noreferrer");
		}
		let K = l(() => g.item.logo_url || null), q = b(!1);
		function jt() {
			q.value = !0;
		}
		let Mt = l(() => !!K.value && !q.value);
		C(K, () => {
			q.value = !1;
		});
		let Nt = a(), Pt = ee(), J = l(() => {
			let e = g.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${Pt.value || Nt.value || (O?.apiBase ?? "")}${e}` : null;
		});
		function Ft() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(T) !== "false";
			} catch {
				return !0;
			}
		}
		function It(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(T, e ? "true" : "false");
			} catch {}
		}
		let Y = b(null), X = b(Ft()), Z = b(!1), Lt = l(() => X.value ? "mute" : "volume"), Rt = l(() => X.value ? "Unmute theme music" : "Mute theme music");
		function zt() {
			let e = Y.value;
			e && (e.muted = X.value, e.volume = X.value ? 0 : ht);
		}
		function Q() {
			let e = Y.value;
			!e || Z.value || (zt(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = Y.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function Bt() {
			X.value = !X.value, It(X.value), zt(), X.value || Q();
		}
		function Vt() {
			Z.value = !0, $();
		}
		return v(() => {
			J.value && Q();
		}), C(J, (e, t) => {
			e !== t && ($(), Z.value = !1, e && Q());
		}), de(() => {
			$();
		}), (t, i) => (y(), f("article", pe, [
			H.value ? (y(), f("div", me, [p("img", {
				class: _(["media-detail__backdrop-img", { "is-loaded": U.value }]),
				src: H.value,
				srcset: Et.value || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				fetchpriority: "high",
				onLoad: Dt
			}, null, 42, he), i[9] ||= p("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : d("", !0),
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
			}, null, 8, ge)) : d("", !0),
			e.item.poster_url ? (y(), f("div", {
				key: 2,
				class: "media-detail__ambient",
				style: ue({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : d("", !0),
			p("div", _e, [e.showBack ? (y(), u(o, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: i[0] ||= (e) => E("back")
			}, {
				default: w(() => [...i[10] ||= [m("Back", -1)]]),
				_: 1
			})) : d("", !0)]),
			p("div", ve, [p("div", ye, [e.item.poster_url ? (y(), f("img", {
				key: 0,
				ref_key: "imgEl",
				ref: V,
				class: _(["media-detail__img", { "is-loaded": B.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				fetchpriority: "high",
				onLoad: Tt
			}, null, 42, be)) : (y(), f("div", xe, [h(n, { name: Ct.value }, null, 8, ["name"])]))]), p("div", Se, [
				Mt.value ? (y(), f("img", {
					key: 0,
					class: "media-detail__logo",
					src: K.value,
					alt: e.item.name,
					decoding: "async",
					onError: jt
				}, null, 40, Ce)) : (y(), f("h1", we, S(e.item.name), 1)),
				p("div", Te, [
					e.item.year ? (y(), f("span", Ee, [h(n, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), m(S(e.item.year), 1)])) : d("", !0),
					e.item.rating ? (y(), f("span", De, S(e.item.rating), 1)) : d("", !0),
					e.item.runtime ? (y(), f("span", Oe, S(e.item.runtime) + "m", 1)) : d("", !0),
					p("span", ke, S(e.item.type), 1)
				]),
				e.item.genres?.length ? (y(), f("div", Ae, [(y(!0), f(c, null, x(e.item.genres, (e) => (y(), u(s, {
					key: e,
					size: "sm",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => E("genre", e)
				}, {
					default: w(() => [m(S(e), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])) : d("", !0),
				L.value.length ? (y(), f("div", je, [i[11] ||= p("span", { class: "media-detail__companies-label" }, "Studios", -1), p("div", Me, [(y(!0), f(c, null, x(L.value, (e) => (y(), u(s, {
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
					}, null, 8, Ne)) : d("", !0), p("span", null, S(e.name), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])])) : d("", !0),
				p("p", Pe, S(e.item.overview || "No overview available."), 1),
				p("div", Fe, [
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
						default: w(() => [i[13] ||= m(" Resume ", -1), p("span", Ie, S(z.value), 1)]),
						_: 1
					})) : d("", !0),
					Ot.value ? (y(), u(o, {
						key: 1,
						variant: "outline",
						"left-icon": "film",
						class: "media-detail__trailer-btn",
						onClick: At
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
						onClick: _t
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
					h(ie, {
						level: vt.value,
						onCycle: St
					}, null, 8, ["level"]),
					J.value && !Z.value ? (y(), f("div", Le, [p("button", {
						type: "button",
						class: _(["media-detail__theme-btn", { "is-active": !X.value }]),
						"aria-label": Rt.value,
						"aria-pressed": X.value ? "false" : "true",
						onClick: Bt
					}, [h(n, { name: Lt.value }, null, 8, ["name"])], 10, Re), p("button", {
						type: "button",
						class: "media-detail__theme-btn media-detail__theme-stop",
						"aria-label": "Stop theme music",
						onClick: Vt
					}, [h(n, { name: "x" })])])) : d("", !0),
					h(ae, {
						open: P.value,
						"onUpdate:open": i[3] ||= (e) => P.value = e,
						items: bt.value,
						onSelect: xt
					}, {
						default: w(({ toggle: e }) => [p("button", {
							type: "button",
							class: "media-detail__menu-btn",
							"aria-label": "More actions",
							"aria-expanded": P.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: fe(e, ["stop", "prevent"])
						}, [h(n, { name: "more" })], 8, ze)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (y(), u(o, {
						key: 3,
						variant: "ghost",
						"left-icon": "search",
						onClick: i[4] ||= (t) => E("match", e.item)
					}, {
						default: w(() => [...i[15] ||= [m("Match metadata", -1)]]),
						_: 1
					})) : d("", !0)
				]),
				N.value.length ? (y(), f("div", Be, [i[16] ||= p("span", { class: "media-detail__links-label" }, "Links", -1), p("div", Ve, [(y(!0), f(c, null, x(N.value, (e) => (y(), f("a", {
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
				})], 8, He))), 128))])])) : d("", !0),
				I.value.length || F.value.length ? (y(), f("div", Ue, [I.value.length ? (y(), f("section", We, [i[17] ||= p("h2", { class: "media-detail__credit-heading" }, "Crew", -1), p("ul", Ge, [(y(!0), f(c, null, x(I.value, (e, t) => (y(), f("li", { key: `crew-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => E("actor", e.name)
				}, [
					p("span", qe, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Je)) : (y(), f("span", Ye, S(R(e.name)), 1))]),
					p("span", Xe, S(e.name), 1),
					e.sub ? (y(), f("span", Ze, S(e.sub), 1)) : d("", !0)
				], 8, Ke)]))), 128))])])) : d("", !0), F.value.length ? (y(), f("section", Qe, [i[18] ||= p("h2", { class: "media-detail__credit-heading" }, "Cast", -1), p("ul", $e, [(y(!0), f(c, null, x(F.value, (e, t) => (y(), f("li", { key: `cast-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => E("actor", e.name)
				}, [
					p("span", tt, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, nt)) : (y(), f("span", rt, S(R(e.name)), 1))]),
					p("span", it, S(e.name), 1),
					e.sub ? (y(), f("span", at, S(e.sub), 1)) : d("", !0)
				], 8, et)]))), 128))])])) : d("", !0)])) : d("", !0)
			])]),
			e.item.files?.length ? (y(), f("section", ot, [i[19] ||= p("h2", { class: "media-detail__files-heading" }, "Files", -1), p("ul", st, [(y(!0), f(c, null, x(e.item.files, (e, t) => (y(), f("li", {
				key: t,
				class: "media-detail__file"
			}, [p("span", ct, S(e.path), 1), p("span", lt, [
				e.container ? (y(), f("span", ut, S(e.container), 1)) : d("", !0),
				e.resolution ? (y(), f("span", dt, S(e.resolution), 1)) : d("", !0),
				p("span", ft, S(wt(e.size_bytes)), 1)
			])]))), 128))])])) : d("", !0),
			e.similarLoading || e.similar.length ? (y(), u(ce, {
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
			W.value ? (y(), u(r, {
				key: 5,
				modelValue: G.value,
				"onUpdate:modelValue": i[8] ||= (e) => G.value = e,
				title: `Trailer — ${e.item.name}`,
				size: "lg"
			}, {
				default: w(() => [p("div", pt, [p("iframe", {
					class: "media-detail__trailer-iframe",
					src: W.value,
					title: `${e.item.name} trailer`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowfullscreen: "",
					referrerpolicy: "strict-origin-when-cross-origin"
				}, null, 8, mt)])]),
				_: 1
			}, 8, ["modelValue", "title"])) : d("", !0)
		]));
	}
}), D = /* @__PURE__ */ e({ default: () => O }), O = /*#__PURE__*/ t(E, [["__scopeId", "data-v-2ef79a2f"]]);
//#endregion
export { D as n, O as t };

//# sourceMappingURL=MediaDetail-BHHwfs2d.js.map