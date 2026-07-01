import { n as e, t } from "./Icon-24ngwBUH.js";
import { n, r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-CUoTkm_k.js";
import { n as a, t as ee } from "./ThumbRating-CEhvLFWq.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Button-CInT03Lp.js";
import { t as c } from "./Chip-vZeocErt.js";
import { i as te, o as ne, r as re } from "./MetadataMatchModal-BGNvfEb7.js";
import { t as ie } from "./MediaRow-DvmNntBi.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ae, normalizeClass as v, normalizeStyle as oe, onBeforeUnmount as se, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, watch as w, withCtx as T, withModifiers as ce } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var le = { class: "media-detail" }, ue = {
	key: 0,
	class: "media-detail__backdrop",
	"aria-hidden": "true"
}, de = ["src", "srcset"], fe = ["src"], pe = { class: "media-detail__bar" }, me = { class: "media-detail__hero" }, he = { class: "media-detail__poster" }, ge = ["src", "alt"], _e = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, ve = { class: "media-detail__info" }, ye = { class: "media-detail__title" }, be = { class: "media-detail__meta numeric" }, xe = {
	key: 0,
	class: "media-detail__meta-item"
}, Se = {
	key: 1,
	class: "media-detail__cert"
}, Ce = {
	key: 2,
	class: "media-detail__meta-item"
}, we = { class: "media-detail__type" }, Te = {
	key: 0,
	class: "media-detail__genres"
}, Ee = ["aria-label", "onClick"], De = {
	key: 1,
	class: "media-detail__companies"
}, E = { class: "media-detail__company-list" }, Oe = ["aria-label", "onClick"], ke = ["src", "alt"], Ae = { class: "media-detail__overview" }, je = { class: "media-detail__actions" }, Me = { class: "media-detail__resume-at numeric" }, Ne = {
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
}, Ye = { class: "media-detail__people" }, Xe = ["aria-label", "onClick"], Ze = { class: "media-detail__avatar" }, Qe = ["src", "alt"], $e = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, et = { class: "media-detail__person-name" }, tt = {
	key: 0,
	class: "media-detail__person-sub"
}, nt = {
	key: 3,
	class: "media-detail__files"
}, rt = { class: "media-detail__files-list" }, it = { class: "media-detail__file-path" }, at = { class: "media-detail__file-meta" }, ot = {
	key: 0,
	class: "media-detail__file-container"
}, st = {
	key: 1,
	class: "media-detail__file-resolution"
}, ct = { class: "media-detail__file-size" }, D = "phlix.theme.muted", lt = .35, O = /*#__PURE__*/ e(/* @__PURE__ */ _({
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
		"remove"
	],
	setup(e, { emit: _ }) {
		let O = e, k = _, A = a(), j = ae("phlixConfig", null), ut = i(), M = u(() => A.isFavorite(O.item.id));
		function dt() {
			A.toggleFavorite(O.item.id, j?.apiBase ?? ""), k("watchlist", O.item);
		}
		let ft = u(() => A.likeLevel(O.item.id)), N = u(() => ut.isAdmin), P = u(() => A.isWatched(O.item.id));
		function F() {
			A.toggleWatched(O.item.id, j?.apiBase ?? ""), k("mark-watched", O.item);
		}
		let I = u(() => {
			let e = O.item.external_ids;
			if (!e) return [];
			let t = O.item.type === "movie" ? "movie" : "tv", n = {
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
		}), L = x(!1), pt = u(() => O.item.type === "series" || O.item.type === "season"), mt = u(() => te(O.item, {
			isAdmin: N.value,
			isWatched: P.value,
			isSeriesOrSeason: pt.value,
			canChoosePoster: N.value
		}));
		function ht(e) {
			let t = re;
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					F();
					break;
				case t.like:
					A.setLike(O.item.id, 1, j?.apiBase ?? "");
					break;
				case t.dislike:
					A.setLike(O.item.id, -1, j?.apiBase ?? "");
					break;
				case t.refreshMetadata:
				case t.identify:
					k("refresh", O.item);
					break;
				case t.editImages:
					k("choose-poster", O.item);
					break;
				case t.remove:
					k("remove", O.item);
					break;
				default: o().info(`${e.label} isn't available yet`);
			}
		}
		function gt(e) {
			A.setLike(O.item.id, e, j?.apiBase ?? "");
		}
		let _t = u(() => O.item.type === "audio" ? "music" : O.item.type === "image" ? "image" : O.item.type === "series" ? "tv" : "film"), R = u(() => {
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
		}), B = u(() => {
			let e = O.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : O.item.studio ? [{
				name: O.item.studio,
				logoUrl: null
			}] : [];
		});
		function V(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let H = u(() => {
			let e = O.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function vt(e) {
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
		let U = x(!1), W = x(null);
		function yt() {
			U.value = !0;
		}
		y(() => {
			W.value?.complete && (U.value = !0);
		});
		let G = u(() => O.item.backdrop_url_large || O.item.backdrop_url || null), bt = u(() => O.item.backdrop_srcset || null), K = x(!1);
		function xt() {
			K.value = !0;
		}
		w(G, () => {
			K.value = !1;
		});
		let St = n(), Ct = r(), q = u(() => {
			let e = O.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${Ct.value || St.value || (j?.apiBase ?? "")}${e}` : null;
		});
		function wt() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(D) !== "false";
			} catch {
				return !0;
			}
		}
		function Tt(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(D, e ? "true" : "false");
			} catch {}
		}
		let J = x(null), Y = x(wt()), X = x(!1), Et = u(() => Y.value ? "mute" : "volume"), Dt = u(() => Y.value ? "Unmute theme music" : "Mute theme music");
		function Z() {
			let e = J.value;
			e && (e.muted = Y.value, e.volume = Y.value ? 0 : lt);
		}
		function Q() {
			let e = J.value;
			!e || X.value || (Z(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = J.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function Ot() {
			Y.value = !Y.value, Tt(Y.value), Z(), Y.value || Q();
		}
		function kt() {
			X.value = !0, $();
		}
		return y(() => {
			q.value && Q();
		}), w(q, (e, t) => {
			e !== t && ($(), X.value = !1, e && Q());
		}), se(() => {
			$();
		}), (n, r) => (b(), p("article", le, [
			G.value ? (b(), p("div", ue, [m("img", {
				class: v(["media-detail__backdrop-img", { "is-loaded": K.value }]),
				src: G.value,
				srcset: bt.value || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				onLoad: xt
			}, null, 42, de), r[8] ||= m("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : f("", !0),
			q.value ? (b(), p("audio", {
				key: 1,
				ref_key: "themeAudioEl",
				ref: J,
				src: q.value,
				class: "media-detail__theme-audio",
				loop: "",
				preload: "auto",
				"aria-hidden": "true",
				tabindex: "-1"
			}, null, 8, fe)) : f("", !0),
			e.item.poster_url ? (b(), p("div", {
				key: 2,
				class: "media-detail__ambient",
				style: oe({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : f("", !0),
			m("div", pe, [e.showBack ? (b(), d(s, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => k("back")
			}, {
				default: T(() => [...r[9] ||= [h("Back", -1)]]),
				_: 1
			})) : f("", !0)]),
			m("div", me, [m("div", he, [e.item.poster_url ? (b(), p("img", {
				key: 0,
				ref_key: "imgEl",
				ref: W,
				class: v(["media-detail__img", { "is-loaded": U.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: yt
			}, null, 42, ge)) : (b(), p("div", _e, [g(t, { name: _t.value }, null, 8, ["name"])]))]), m("div", ve, [
				m("h1", ye, C(e.item.name), 1),
				m("div", be, [
					e.item.year ? (b(), p("span", xe, [g(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), h(C(e.item.year), 1)])) : f("", !0),
					e.item.rating ? (b(), p("span", Se, C(e.item.rating), 1)) : f("", !0),
					e.item.runtime ? (b(), p("span", Ce, C(e.item.runtime) + "m", 1)) : f("", !0),
					m("span", we, C(e.item.type), 1)
				]),
				e.item.genres?.length ? (b(), p("div", Te, [(b(!0), p(l, null, S(e.item.genres, (e) => (b(), p("button", {
					key: e,
					type: "button",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => k("genre", e)
				}, [g(c, { size: "sm" }, {
					default: T(() => [h(C(e), 1)]),
					_: 2
				}, 1024)], 8, Ee))), 128))])) : f("", !0),
				B.value.length ? (b(), p("div", De, [r[10] ||= m("span", { class: "media-detail__companies-label" }, "Studios", -1), m("div", E, [(b(!0), p(l, null, S(B.value, (e) => (b(), p("button", {
					key: e.name,
					type: "button",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => k("company", e.name)
				}, [g(c, { size: "sm" }, {
					default: T(() => [e.logoUrl ? (b(), p("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ke)) : f("", !0), m("span", null, C(e.name), 1)]),
					_: 2
				}, 1024)], 8, Oe))), 128))])])) : f("", !0),
				m("p", Ae, C(e.item.overview || "No overview available."), 1),
				m("div", je, [
					g(s, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (t) => k("play", e.item)
					}, {
						default: T(() => [...r[11] ||= [h("Play", -1)]]),
						_: 1
					}),
					H.value ? (b(), d(s, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (t) => k("resume", e.item)
					}, {
						default: T(() => [r[12] ||= h(" Resume ", -1), m("span", Me, C(H.value), 1)]),
						_: 1
					})) : f("", !0),
					g(s, {
						variant: "ghost",
						class: v(["media-detail__favorite", { "is-active": M.value }]),
						"left-icon": M.value ? "bookmark" : "bookmark-plus",
						"aria-label": M.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": M.value ? "true" : "false",
						onClick: dt
					}, {
						default: T(() => [h(C(M.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					g(s, {
						variant: "ghost",
						class: v(["media-detail__watched", { "is-active": P.value }]),
						"left-icon": P.value ? "eye" : "eye-off",
						"aria-label": P.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": P.value ? "true" : "false",
						onClick: F
					}, {
						default: T(() => [h(C(P.value ? "Watched" : "Mark watched"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					g(ee, {
						level: ft.value,
						onCycle: gt
					}, null, 8, ["level"]),
					q.value && !X.value ? (b(), p("div", Ne, [m("button", {
						type: "button",
						class: v(["media-detail__theme-btn", { "is-active": !Y.value }]),
						"aria-label": Dt.value,
						"aria-pressed": Y.value ? "false" : "true",
						onClick: Ot
					}, [g(t, { name: Et.value }, null, 8, ["name"])], 10, Pe), m("button", {
						type: "button",
						class: "media-detail__theme-btn media-detail__theme-stop",
						"aria-label": "Stop theme music",
						onClick: kt
					}, [g(t, { name: "x" })])])) : f("", !0),
					g(ne, {
						open: L.value,
						"onUpdate:open": r[3] ||= (e) => L.value = e,
						items: mt.value,
						onSelect: ht
					}, {
						default: T(({ toggle: e }) => [m("button", {
							type: "button",
							class: "media-detail__menu-btn",
							"aria-label": "More actions",
							"aria-expanded": L.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: ce(e, ["stop", "prevent"])
						}, [g(t, { name: "more" })], 8, Fe)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (b(), d(s, {
						key: 2,
						variant: "ghost",
						"left-icon": "search",
						onClick: r[4] ||= (t) => k("match", e.item)
					}, {
						default: T(() => [...r[13] ||= [h("Match metadata", -1)]]),
						_: 1
					})) : f("", !0)
				]),
				I.value.length ? (b(), p("div", Ie, [r[14] ||= m("span", { class: "media-detail__links-label" }, "Links", -1), m("div", Le, [(b(!0), p(l, null, S(I.value, (e) => (b(), p("a", {
					key: e.key,
					class: "media-detail__link",
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `Open on ${e.label} (opens in a new tab)`
				}, [m("span", null, C(e.label), 1), g(t, {
					name: "arrow-right",
					class: "media-detail__link-icon",
					"aria-hidden": "true"
				})], 8, Re))), 128))])])) : f("", !0),
				z.value.length || R.value.length ? (b(), p("div", ze, [z.value.length ? (b(), p("section", Be, [r[15] ||= m("h2", { class: "media-detail__credit-heading" }, "Crew", -1), m("ul", Ve, [(b(!0), p(l, null, S(z.value, (e, t) => (b(), p("li", { key: `crew-${t}-${e.name}` }, [m("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => k("actor", e.name)
				}, [
					m("span", Ue, [e.profileUrl ? (b(), p("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, We)) : (b(), p("span", Ge, C(V(e.name)), 1))]),
					m("span", Ke, C(e.name), 1),
					e.sub ? (b(), p("span", qe, C(e.sub), 1)) : f("", !0)
				], 8, He)]))), 128))])])) : f("", !0), R.value.length ? (b(), p("section", Je, [r[16] ||= m("h2", { class: "media-detail__credit-heading" }, "Cast", -1), m("ul", Ye, [(b(!0), p(l, null, S(R.value, (e, t) => (b(), p("li", { key: `cast-${t}-${e.name}` }, [m("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => k("actor", e.name)
				}, [
					m("span", Ze, [e.profileUrl ? (b(), p("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Qe)) : (b(), p("span", $e, C(V(e.name)), 1))]),
					m("span", et, C(e.name), 1),
					e.sub ? (b(), p("span", tt, C(e.sub), 1)) : f("", !0)
				], 8, Xe)]))), 128))])])) : f("", !0)])) : f("", !0)
			])]),
			e.item.files?.length ? (b(), p("section", nt, [r[17] ||= m("h2", { class: "media-detail__files-heading" }, "Files", -1), m("ul", rt, [(b(!0), p(l, null, S(e.item.files, (e, t) => (b(), p("li", {
				key: t,
				class: "media-detail__file"
			}, [m("span", it, C(e.path), 1), m("span", at, [
				e.container ? (b(), p("span", ot, C(e.container), 1)) : f("", !0),
				e.resolution ? (b(), p("span", st, C(e.resolution), 1)) : f("", !0),
				m("span", ct, C(vt(e.size_bytes)), 1)
			])]))), 128))])])) : f("", !0),
			e.similarLoading || e.similar.length ? (b(), d(ie, {
				key: 4,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: r[5] ||= (e) => k("play", e),
				onWatchlist: r[6] ||= (e) => k("watchlist", e),
				onInfo: r[7] ||= (e) => k("info", e)
			}, null, 8, ["items", "loading"])) : f("", !0)
		]));
	}
}), [["__scopeId", "data-v-07db9479"]]);
//#endregion
export { O as t };

//# sourceMappingURL=MediaDetail-eAL4HpRw.js.map