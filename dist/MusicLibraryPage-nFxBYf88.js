import { t as e } from "./useMessages-BoZa6NgT.js";
import { n as t, r as n } from "./useApiBase-DXTBY90j.js";
import { i as r, n as i, r as a, t as ee } from "./MusicAlbumCard-D5Sictor.js";
import { t as te } from "./client-CdNyEcUJ.js";
import { t as ne } from "./Button-Dfl4y6vO.js";
import { t as re } from "./useImageSrc-CSM61b-l.js";
import { n as o, t as s } from "./Icon-55iG1rR7.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as ie, createVNode as m, defineComponent as h, onMounted as ae, onUnmounted as oe, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, withCtx as se } from "vue";
// src/components/MusicArtistCard.vue?vue&type=script&setup=true&lang.ts
var x = { class: "artist-card__image-wrap" }, S = ["src", "alt"], C = {
	key: 1,
	class: "artist-card__placeholder"
}, w = { class: "artist-card__info" }, T = { class: "artist-card__name" }, E = {
	key: 0,
	class: "artist-card__albums",
	"data-count": "albums"
}, ce = /*#__PURE__*/ o(/* @__PURE__ */ h({
	__name: "MusicArtistCard",
	props: { artist: {} },
	emits: ["click"],
	setup(t) {
		let n = t, { t: r } = e(), { imgSrc: i } = re(), a = l(() => {
			let e = n.artist.albumCount ?? 0;
			return r("music.albumsTotal", { count: e.toLocaleString() });
		});
		return (e, n) => (g(), f("button", {
			type: "button",
			class: "artist-card",
			onClick: n[0] ||= (n) => e.$emit("click", t.artist)
		}, [p("div", x, [t.artist.imageUrl ? (g(), f("img", {
			key: 0,
			src: b(i)(t.artist.imageUrl),
			alt: t.artist.name,
			class: "artist-card__image",
			loading: "lazy"
		}, null, 8, S)) : (g(), f("div", C, [m(s, {
			name: "music",
			class: "artist-card__placeholder-icon"
		})]))]), p("div", w, [p("span", T, y(t.artist.name), 1), t.artist.albumCount === void 0 ? d("", !0) : (g(), f("span", E, y(a.value), 1))])]));
	}
}), [["__scopeId", "data-v-79ad5ff9"]]), le = { class: "music-page" }, ue = { class: "music-page__head" }, de = { class: "music-page__breadcrumb" }, fe = ["aria-label"], pe = ["aria-label"], me = { class: "music-page__crumb-current" }, he = { class: "music-page__title" }, ge = {
	key: 0,
	class: "music-page__count",
	"data-count": "artists",
	role: "status"
}, _e = {
	key: 1,
	class: "music-page__count",
	"data-count": "albums",
	role: "status"
}, ve = {
	key: 0,
	class: "music-page__error",
	role: "alert"
}, ye = { class: "music-page__error-text" }, D = {
	id: "music-artists-grid",
	class: "music-page__grid"
}, O = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, k = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, A = { class: "music-page__empty-text" }, j = {
	id: "music-albums-grid",
	class: "music-page__grid"
}, M = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, N = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, P = { class: "music-page__empty-text" }, be = { key: 3 }, xe = ["aria-label"], Se = { class: "music-bar__meta" }, Ce = { class: "music-bar__title" }, we = {
	key: 0,
	class: "music-bar__error",
	role: "alert"
}, Te = {
	key: 1,
	class: "music-bar__status",
	role: "status",
	"aria-live": "polite"
}, Ee = { class: "music-bar__controls" }, De = ["disabled", "aria-label"], Oe = ["aria-label"], ke = ["disabled", "aria-label"], Ae = { class: "music-bar__progress" }, je = { class: "music-bar__time" }, Me = [
	"max",
	"value",
	"aria-label"
], Ne = { class: "music-bar__time" }, F = /*#__PURE__*/ o(/* @__PURE__ */ h({
	__name: "MusicLibraryPage",
	setup(re) {
		let o = _("artists"), h = _(null), x = _(null), S = 0;
		function C(e) {
			return e === S;
		}
		let w = _([]), T = _([]), E = _([]), F = _(!1), I = _(null), L = _(0), R = _(100), z = _(0), B = _(0), V = _(100), H = _(0), { t: U } = e(), W = t(), Pe = n(), G = r({
			apiBase: () => W.value,
			streamBase: () => Pe.value || W.value
		});
		oe(() => G.dispose());
		let Fe = l(() => G.playing.value ? G.currentTrack.value?.id ?? null : null);
		function K() {
			return new te({ baseUrl: W.value });
		}
		async function q(e) {
			let t = S;
			F.value = !0, I.value = null;
			try {
				let n = await K().listArtists({
					limit: 100,
					offset: e
				});
				if (!C(t)) return;
				w.value = n.artists, L.value = n.total, R.value = n.limit, z.value = n.offset;
			} catch {
				if (!C(t)) return;
				I.value = U("music.pageLoadFailed");
			} finally {
				F.value = !1;
			}
		}
		async function J(e, t) {
			let n = S;
			F.value = !0, I.value = null;
			try {
				let r = await K().listAlbums({
					artist: e.name,
					limit: 100,
					offset: t
				});
				if (!C(n)) return;
				T.value = r.albums, B.value = r.total, V.value = r.limit, H.value = r.offset;
			} catch {
				if (!C(n)) return;
				I.value = U("music.pageLoadFailed");
			} finally {
				F.value = !1;
			}
		}
		function Ie() {
			o.value === "albums" && h.value ? J(h.value, H.value) : q(z.value);
		}
		ae(async () => {
			await q(0);
		});
		let Y = l(() => o.value === "artists" ? U("music.artists") : o.value === "albums" && h.value ? h.value.name : o.value === "tracks" && x.value ? x.value.title : U("music.title")), Le = l(() => U("music.artistsTotal", { count: L.value.toLocaleString() })), Re = l(() => U("music.albumsTotal", { count: B.value.toLocaleString() }));
		function X(e) {
			o.value = e, S += 1, I.value = null;
		}
		async function ze(e) {
			h.value = e, x.value = null, T.value = [], E.value = [], B.value = 0, H.value = 0, X("albums"), await J(e, 0);
		}
		async function Z(e) {
			e !== z.value && await q(e);
		}
		async function Be(e) {
			let t = h.value;
			t && e !== H.value && await J(t, e);
		}
		async function Ve(e) {
			x.value = e, X("tracks");
			let t = e.tracks ?? [];
			if (t.length > 0 && e.tracksTruncated !== !0) {
				E.value = t;
				return;
			}
			E.value = t;
			let n = S;
			F.value = !0;
			try {
				let t = await K().getAlbum(e.title, e.artist ?? h.value?.name);
				if (!C(n)) return;
				t.tracks && t.tracks.length > 0 && (E.value = t.tracks);
			} catch {} finally {
				F.value = !1;
			}
		}
		function He(e) {
			G.currentTrack.value?.id === e.id && G.playing.value ? G.pause() : G.currentTrack.value?.id === e.id ? G.play() : (G.loadTracks(E.value), G.play(e));
		}
		function Q(e) {
			return !isFinite(e) || e < 0 ? "0:00" : `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
		}
		function Ue(e) {
			let t = Number(e.target.value);
			G.seek(t);
		}
		function $() {
			X("artists"), h.value = null, x.value = null, T.value = [], B.value = 0, H.value = 0;
		}
		function We() {
			o.value === "tracks" ? (X("albums"), x.value = null, E.value = []) : o.value === "albums" && $();
		}
		return (e, t) => (g(), f("div", le, [
			p("header", ue, [
				p("div", de, [o.value === "artists" ? d("", !0) : (g(), f("button", {
					key: 0,
					type: "button",
					class: "music-page__back",
					"aria-label": b(U)("player.back"),
					onClick: We
				}, [m(s, {
					name: "arrow-left",
					class: "music-page__back-icon"
				})], 8, fe)), o.value === "artists" ? d("", !0) : (g(), f("nav", {
					key: 1,
					class: "music-page__crumb-nav",
					"aria-label": b(U)("common.breadcrumb")
				}, [
					p("button", {
						type: "button",
						class: "music-page__crumb",
						onClick: $
					}, y(b(U)("music.artists")), 1),
					m(s, {
						name: "chevron-right",
						class: "music-page__crumb-sep"
					}),
					p("span", me, y(Y.value), 1)
				], 8, pe))]),
				p("h1", he, y(Y.value), 1),
				o.value === "artists" ? (g(), f("p", ge, y(Le.value), 1)) : o.value === "albums" ? (g(), f("p", _e, y(Re.value), 1)) : d("", !0)
			]),
			I.value ? (g(), f("div", ve, [
				m(s, {
					name: "alert-circle",
					class: "music-page__error-icon"
				}),
				p("p", ye, y(I.value), 1),
				m(ne, {
					variant: "outline",
					size: "sm",
					"data-testid": "music-retry",
					onClick: Ie
				}, {
					default: se(() => [ie(y(b(U)("common.retry")), 1)]),
					_: 1
				})
			])) : d("", !0),
			o.value === "artists" ? (g(), f(c, { key: 1 }, [p("div", D, [F.value ? (g(), f("div", O, [(g(), f(c, null, v(12, (e) => p("div", {
				key: e,
				class: "artist-skel"
			}, [...t[3] ||= [
				p("div", { class: "artist-skel__img" }, null, -1),
				p("div", { class: "artist-skel__name" }, null, -1),
				p("div", { class: "artist-skel__albums" }, null, -1)
			]])), 64))])) : w.value.length === 0 && !I.value ? (g(), f("div", k, [m(s, {
				name: "music",
				class: "music-page__empty-icon"
			}), p("p", A, y(b(U)("music.noArtists")), 1)])) : (g(!0), f(c, { key: 2 }, v(w.value, (e) => (g(), u(ce, {
				key: e.id,
				artist: e,
				onClick: ze
			}, null, 8, ["artist"]))), 128))]), m(i, {
				"data-pager": "artists",
				offset: z.value,
				limit: R.value,
				total: L.value,
				disabled: F.value,
				label: b(U)("music.artists"),
				controls: "music-artists-grid",
				onGo: Z
			}, null, 8, [
				"offset",
				"limit",
				"total",
				"disabled",
				"label"
			])], 64)) : o.value === "albums" ? (g(), f(c, { key: 2 }, [p("div", j, [F.value ? (g(), f("div", M, [(g(), f(c, null, v(8, (e) => p("div", {
				key: e,
				class: "album-skel"
			}, [...t[4] ||= [
				p("div", { class: "album-skel__cover" }, null, -1),
				p("div", { class: "album-skel__title" }, null, -1),
				p("div", { class: "album-skel__meta" }, null, -1)
			]])), 64))])) : T.value.length === 0 && !I.value ? (g(), f("div", N, [m(s, {
				name: "image",
				class: "music-page__empty-icon"
			}), p("p", P, y(b(U)("music.noAlbums")), 1)])) : (g(!0), f(c, { key: 2 }, v(T.value, (e) => (g(), u(ee, {
				key: e.id,
				album: e,
				onClick: Ve
			}, null, 8, ["album"]))), 128))]), m(i, {
				"data-pager": "albums",
				offset: H.value,
				limit: V.value,
				total: B.value,
				disabled: F.value,
				label: b(U)("music.albums"),
				controls: "music-albums-grid",
				onGo: Be
			}, null, 8, [
				"offset",
				"limit",
				"total",
				"disabled",
				"label"
			])], 64)) : o.value === "tracks" ? (g(), f("div", be, [m(a, {
				tracks: E.value,
				"playing-track-id": Fe.value,
				loading: F.value,
				onPlay: He
			}, null, 8, [
				"tracks",
				"playing-track-id",
				"loading"
			])])) : d("", !0),
			b(G).currentTrack.value ? (g(), f("footer", {
				key: 4,
				class: "music-bar",
				role: "region",
				"aria-label": b(U)("music.nowPlaying")
			}, [
				p("div", Se, [p("span", Ce, y(b(G).currentTrack.value.title), 1), b(G).error.value ? (g(), f("span", we, y(b(U)("music.streamError")), 1)) : b(G).loading.value ? (g(), f("span", Te, y(b(U)("music.loading")), 1)) : d("", !0)]),
				p("div", Ee, [
					p("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !b(G).hasPrev.value,
						"aria-label": b(U)("music.previous"),
						onClick: t[0] ||= (e) => b(G).previous()
					}, [m(s, {
						name: "skip-back",
						class: "music-bar__icon"
					})], 8, De),
					p("button", {
						type: "button",
						class: "music-bar__btn music-bar__btn--primary",
						"aria-label": b(G).playing.value ? b(U)("music.pause") : b(U)("music.play"),
						onClick: t[1] ||= (e) => b(G).toggle()
					}, [m(s, {
						name: b(G).playing.value ? "pause" : "play",
						class: "music-bar__icon"
					}, null, 8, ["name"])], 8, Oe),
					p("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !b(G).hasNext.value,
						"aria-label": b(U)("music.next"),
						onClick: t[2] ||= (e) => b(G).next()
					}, [m(s, {
						name: "skip-forward",
						class: "music-bar__icon"
					})], 8, ke)
				]),
				p("div", Ae, [
					p("span", je, y(Q(b(G).position.value)), 1),
					p("input", {
						type: "range",
						class: "music-bar__seek",
						min: "0",
						max: b(G).duration.value || 0,
						value: b(G).position.value,
						"aria-label": b(U)("music.seek"),
						onInput: Ue
					}, null, 40, Me),
					p("span", Ne, y(Q(b(G).duration.value)), 1)
				])
			], 8, xe)) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-d715a53a"]]);
export { F as default };

//# sourceMappingURL=MusicLibraryPage-nFxBYf88.js.map