import { n as e, t } from "./Icon-24ngwBUH.js";
import { n, r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-CUoTkm_k.js";
import { n as a, t as ee } from "./ThumbRating-CEhvLFWq.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Button-CInT03Lp.js";
import { t as s } from "./Chip-BOj3xRVs.js";
import { i as ne, o as re, r as ie } from "./MetadataMatchModal-Dhi7nqvl.js";
import { t as ae } from "./MediaRow--IE9SzaR.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as oe, normalizeClass as _, normalizeStyle as se, onBeforeUnmount as ce, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, watch as C, withCtx as w, withModifiers as le } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var ue = { class: "media-detail" }, de = {
	key: 0,
	class: "media-detail__backdrop",
	"aria-hidden": "true"
}, fe = ["src", "srcset"], pe = ["src"], me = { class: "media-detail__bar" }, he = { class: "media-detail__hero" }, ge = { class: "media-detail__poster" }, _e = ["src", "alt"], ve = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, ye = { class: "media-detail__info" }, be = { class: "media-detail__title" }, xe = { class: "media-detail__meta numeric" }, Se = {
	key: 0,
	class: "media-detail__meta-item"
}, Ce = {
	key: 1,
	class: "media-detail__cert"
}, we = {
	key: 2,
	class: "media-detail__meta-item"
}, Te = { class: "media-detail__type" }, Ee = {
	key: 0,
	class: "media-detail__genres"
}, De = {
	key: 1,
	class: "media-detail__companies"
}, Oe = { class: "media-detail__company-list" }, T = ["src", "alt"], ke = { class: "media-detail__overview" }, Ae = { class: "media-detail__actions" }, je = { class: "media-detail__resume-at numeric" }, Me = {
	key: 1,
	class: "media-detail__theme"
}, Ne = ["aria-label", "aria-pressed"], Pe = ["aria-expanded", "onClick"], Fe = {
	key: 2,
	class: "media-detail__links"
}, Ie = { class: "media-detail__links-list" }, Le = ["href", "aria-label"], Re = {
	key: 3,
	class: "media-detail__credits"
}, ze = {
	key: 0,
	class: "media-detail__credit-group"
}, Be = { class: "media-detail__people" }, Ve = ["aria-label", "onClick"], He = { class: "media-detail__avatar" }, Ue = ["src", "alt"], We = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, Ge = { class: "media-detail__person-name" }, Ke = {
	key: 0,
	class: "media-detail__person-sub"
}, qe = {
	key: 1,
	class: "media-detail__credit-group"
}, Je = { class: "media-detail__people" }, Ye = ["aria-label", "onClick"], Xe = { class: "media-detail__avatar" }, Ze = ["src", "alt"], Qe = {
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
}, st = { class: "media-detail__file-size" }, E = "phlix.theme.muted", ct = .35, D = /*#__PURE__*/ e(/* @__PURE__ */ g({
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
	setup(e, { emit: g }) {
		let D = e, O = g, k = a(), A = oe("phlixConfig", null), lt = i(), j = l(() => k.isFavorite(D.item.id));
		function ut() {
			k.toggleFavorite(D.item.id, A?.apiBase ?? ""), O("watchlist", D.item);
		}
		let dt = l(() => k.likeLevel(D.item.id)), M = l(() => lt.isAdmin), N = l(() => k.isWatched(D.item.id));
		function P() {
			k.toggleWatched(D.item.id, A?.apiBase ?? ""), O("mark-watched", D.item);
		}
		let F = l(() => {
			let e = D.item.external_ids;
			if (!e) return [];
			let t = D.item.type === "movie" ? "movie" : "tv", n = {
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
		}), I = b(!1), ft = l(() => D.item.type === "series" || D.item.type === "season"), pt = l(() => ne(D.item, {
			isAdmin: M.value,
			isWatched: N.value,
			isSeriesOrSeason: ft.value,
			canChoosePoster: M.value
		}));
		function mt(e) {
			let t = ie;
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					P();
					break;
				case t.like:
					k.setLike(D.item.id, 1, A?.apiBase ?? "");
					break;
				case t.dislike:
					k.setLike(D.item.id, -1, A?.apiBase ?? "");
					break;
				case t.refreshMetadata:
				case t.identify:
					O("refresh", D.item);
					break;
				case t.editImages:
					O("choose-poster", D.item);
					break;
				case t.remove:
					O("remove", D.item);
					break;
				default: te().info(`${e.label} isn't available yet`);
			}
		}
		function ht(e) {
			k.setLike(D.item.id, e, A?.apiBase ?? "");
		}
		let gt = l(() => D.item.type === "audio" ? "music" : D.item.type === "image" ? "image" : D.item.type === "series" ? "tv" : "film"), L = l(() => {
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
		}), R = l(() => {
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
		}), z = l(() => {
			let e = D.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : D.item.studio ? [{
				name: D.item.studio,
				logoUrl: null
			}] : [];
		});
		function B(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let V = l(() => {
			let e = D.resumeSeconds;
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
		let H = b(!1), U = b(null);
		function vt() {
			H.value = !0;
		}
		v(() => {
			U.value?.complete && (H.value = !0);
		});
		let W = l(() => D.item.backdrop_url_large || D.item.backdrop_url || null), yt = l(() => D.item.backdrop_srcset || null), G = b(!1);
		function bt() {
			G.value = !0;
		}
		C(W, () => {
			G.value = !1;
		});
		let xt = n(), St = r(), K = l(() => {
			let e = D.item.theme_audio_url;
			return e ? /^https?:\/\//.test(e) ? e : `${St.value || xt.value || (A?.apiBase ?? "")}${e}` : null;
		});
		function Ct() {
			if (typeof localStorage > "u") return !0;
			try {
				return localStorage.getItem(E) !== "false";
			} catch {
				return !0;
			}
		}
		function wt(e) {
			if (!(typeof localStorage > "u")) try {
				localStorage.setItem(E, e ? "true" : "false");
			} catch {}
		}
		let q = b(null), J = b(Ct()), Y = b(!1), Tt = l(() => J.value ? "mute" : "volume"), X = l(() => J.value ? "Unmute theme music" : "Mute theme music");
		function Z() {
			let e = q.value;
			e && (e.muted = J.value, e.volume = J.value ? 0 : ct);
		}
		function Q() {
			let e = q.value;
			!e || Y.value || (Z(), e.play()?.catch(() => {}));
		}
		function $() {
			let e = q.value;
			e && (e.pause(), e.src = "", e.load());
		}
		function Et() {
			J.value = !J.value, wt(J.value), Z(), J.value || Q();
		}
		function Dt() {
			Y.value = !0, $();
		}
		return v(() => {
			K.value && Q();
		}), C(K, (e, t) => {
			e !== t && ($(), Y.value = !1, e && Q());
		}), ce(() => {
			$();
		}), (n, r) => (y(), f("article", ue, [
			W.value ? (y(), f("div", de, [p("img", {
				class: _(["media-detail__backdrop-img", { "is-loaded": G.value }]),
				src: W.value,
				srcset: yt.value || void 0,
				sizes: "100vw",
				alt: "",
				loading: "lazy",
				decoding: "async",
				onLoad: bt
			}, null, 42, fe), r[8] ||= p("div", { class: "media-detail__backdrop-scrim" }, null, -1)])) : d("", !0),
			K.value ? (y(), f("audio", {
				key: 1,
				ref_key: "themeAudioEl",
				ref: q,
				src: K.value,
				class: "media-detail__theme-audio",
				loop: "",
				preload: "auto",
				"aria-hidden": "true",
				tabindex: "-1"
			}, null, 8, pe)) : d("", !0),
			e.item.poster_url ? (y(), f("div", {
				key: 2,
				class: "media-detail__ambient",
				style: se({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : d("", !0),
			p("div", me, [e.showBack ? (y(), u(o, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => O("back")
			}, {
				default: w(() => [...r[9] ||= [m("Back", -1)]]),
				_: 1
			})) : d("", !0)]),
			p("div", he, [p("div", ge, [e.item.poster_url ? (y(), f("img", {
				key: 0,
				ref_key: "imgEl",
				ref: U,
				class: _(["media-detail__img", { "is-loaded": H.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: vt
			}, null, 42, _e)) : (y(), f("div", ve, [h(t, { name: gt.value }, null, 8, ["name"])]))]), p("div", ye, [
				p("h1", be, S(e.item.name), 1),
				p("div", xe, [
					e.item.year ? (y(), f("span", Se, [h(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), m(S(e.item.year), 1)])) : d("", !0),
					e.item.rating ? (y(), f("span", Ce, S(e.item.rating), 1)) : d("", !0),
					e.item.runtime ? (y(), f("span", we, S(e.item.runtime) + "m", 1)) : d("", !0),
					p("span", Te, S(e.item.type), 1)
				]),
				e.item.genres?.length ? (y(), f("div", Ee, [(y(!0), f(c, null, x(e.item.genres, (e) => (y(), u(s, {
					key: e,
					size: "sm",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => O("genre", e)
				}, {
					default: w(() => [m(S(e), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])) : d("", !0),
				z.value.length ? (y(), f("div", De, [r[10] ||= p("span", { class: "media-detail__companies-label" }, "Studios", -1), p("div", Oe, [(y(!0), f(c, null, x(z.value, (e) => (y(), u(s, {
					key: e.name,
					size: "sm",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => O("company", e.name)
				}, {
					default: w(() => [e.logoUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, T)) : d("", !0), p("span", null, S(e.name), 1)]),
					_: 2
				}, 1032, ["aria-label", "onClick"]))), 128))])])) : d("", !0),
				p("p", ke, S(e.item.overview || "No overview available."), 1),
				p("div", Ae, [
					h(o, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (t) => O("play", e.item)
					}, {
						default: w(() => [...r[11] ||= [m("Play", -1)]]),
						_: 1
					}),
					V.value ? (y(), u(o, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (t) => O("resume", e.item)
					}, {
						default: w(() => [r[12] ||= m(" Resume ", -1), p("span", je, S(V.value), 1)]),
						_: 1
					})) : d("", !0),
					h(o, {
						variant: "ghost",
						class: _(["media-detail__favorite", { "is-active": j.value }]),
						"left-icon": j.value ? "bookmark" : "bookmark-plus",
						"aria-label": j.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": j.value ? "true" : "false",
						onClick: ut
					}, {
						default: w(() => [m(S(j.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(o, {
						variant: "ghost",
						class: _(["media-detail__watched", { "is-active": N.value }]),
						"left-icon": N.value ? "eye" : "eye-off",
						"aria-label": N.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": N.value ? "true" : "false",
						onClick: P
					}, {
						default: w(() => [m(S(N.value ? "Watched" : "Mark watched"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(ee, {
						level: dt.value,
						onCycle: ht
					}, null, 8, ["level"]),
					K.value && !Y.value ? (y(), f("div", Me, [p("button", {
						type: "button",
						class: _(["media-detail__theme-btn", { "is-active": !J.value }]),
						"aria-label": X.value,
						"aria-pressed": J.value ? "false" : "true",
						onClick: Et
					}, [h(t, { name: Tt.value }, null, 8, ["name"])], 10, Ne), p("button", {
						type: "button",
						class: "media-detail__theme-btn media-detail__theme-stop",
						"aria-label": "Stop theme music",
						onClick: Dt
					}, [h(t, { name: "x" })])])) : d("", !0),
					h(re, {
						open: I.value,
						"onUpdate:open": r[3] ||= (e) => I.value = e,
						items: pt.value,
						onSelect: mt
					}, {
						default: w(({ toggle: e }) => [p("button", {
							type: "button",
							class: "media-detail__menu-btn",
							"aria-label": "More actions",
							"aria-expanded": I.value ? "true" : "false",
							"aria-haspopup": "menu",
							onClick: le(e, ["stop", "prevent"])
						}, [h(t, { name: "more" })], 8, Pe)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (y(), u(o, {
						key: 2,
						variant: "ghost",
						"left-icon": "search",
						onClick: r[4] ||= (t) => O("match", e.item)
					}, {
						default: w(() => [...r[13] ||= [m("Match metadata", -1)]]),
						_: 1
					})) : d("", !0)
				]),
				F.value.length ? (y(), f("div", Fe, [r[14] ||= p("span", { class: "media-detail__links-label" }, "Links", -1), p("div", Ie, [(y(!0), f(c, null, x(F.value, (e) => (y(), f("a", {
					key: e.key,
					class: "media-detail__link",
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `Open on ${e.label} (opens in a new tab)`
				}, [p("span", null, S(e.label), 1), h(t, {
					name: "arrow-right",
					class: "media-detail__link-icon",
					"aria-hidden": "true"
				})], 8, Le))), 128))])])) : d("", !0),
				R.value.length || L.value.length ? (y(), f("div", Re, [R.value.length ? (y(), f("section", ze, [r[15] ||= p("h2", { class: "media-detail__credit-heading" }, "Crew", -1), p("ul", Be, [(y(!0), f(c, null, x(R.value, (e, t) => (y(), f("li", { key: `crew-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => O("actor", e.name)
				}, [
					p("span", He, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ue)) : (y(), f("span", We, S(B(e.name)), 1))]),
					p("span", Ge, S(e.name), 1),
					e.sub ? (y(), f("span", Ke, S(e.sub), 1)) : d("", !0)
				], 8, Ve)]))), 128))])])) : d("", !0), L.value.length ? (y(), f("section", qe, [r[16] ||= p("h2", { class: "media-detail__credit-heading" }, "Cast", -1), p("ul", Je, [(y(!0), f(c, null, x(L.value, (e, t) => (y(), f("li", { key: `cast-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => O("actor", e.name)
				}, [
					p("span", Xe, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ze)) : (y(), f("span", Qe, S(B(e.name)), 1))]),
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
			e.similarLoading || e.similar.length ? (y(), u(ae, {
				key: 4,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: r[5] ||= (e) => O("play", e),
				onWatchlist: r[6] ||= (e) => O("watchlist", e),
				onInfo: r[7] ||= (e) => O("info", e)
			}, null, 8, ["items", "loading"])) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-7439d6e9"]]);
//#endregion
export { D as t };

//# sourceMappingURL=MediaDetail-C-REua1O.js.map