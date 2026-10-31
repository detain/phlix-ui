import { t as e } from "./useMessages-DrceiftD.js";
import { n as t, r as n } from "./useApiBase-DXTBY90j.js";
import { i as r, n as i, r as a, t as ee } from "./MusicAlbumCard-Bt5POXwF.js";
import { t as te } from "./client-57OweUrJ.js";
import { t as ne } from "./useImageSrc-CSM61b-l.js";
import { n as o, t as s } from "./Icon-CIbfiPrs.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createVNode as m, defineComponent as h, onMounted as re, onUnmounted as ie, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b } from "vue";
// src/components/MusicArtistCard.vue?vue&type=script&setup=true&lang.ts
var x = { class: "artist-card__image-wrap" }, S = ["src", "alt"], C = {
	key: 1,
	class: "artist-card__placeholder"
}, w = { class: "artist-card__info" }, T = { class: "artist-card__name" }, E = {
	key: 0,
	class: "artist-card__albums",
	"data-count": "albums"
}, ae = /*#__PURE__*/ o(/* @__PURE__ */ h({
	__name: "MusicArtistCard",
	props: { artist: {} },
	emits: ["click"],
	setup(t) {
		let n = t, { t: r } = e(), { imgSrc: i } = ne(), a = l(() => {
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
}), [["__scopeId", "data-v-79ad5ff9"]]), oe = { class: "music-page" }, se = { class: "music-page__head" }, ce = { class: "music-page__breadcrumb" }, le = ["aria-label"], ue = ["aria-label"], de = { class: "music-page__crumb-current" }, fe = { class: "music-page__title" }, pe = {
	key: 0,
	class: "music-page__count",
	"data-count": "artists",
	role: "status"
}, me = {
	key: 1,
	class: "music-page__count",
	"data-count": "albums",
	role: "status"
}, he = {
	key: 0,
	class: "music-page__error",
	role: "alert"
}, ge = { class: "music-page__error-text" }, _e = {
	id: "music-artists-grid",
	class: "music-page__grid"
}, ve = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, ye = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, D = { class: "music-page__empty-text" }, O = {
	id: "music-albums-grid",
	class: "music-page__grid"
}, k = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, A = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, j = { class: "music-page__empty-text" }, M = { key: 3 }, N = ["aria-label"], P = { class: "music-bar__meta" }, be = { class: "music-bar__title" }, xe = {
	key: 0,
	class: "music-bar__error",
	role: "alert"
}, Se = {
	key: 1,
	class: "music-bar__status",
	role: "status",
	"aria-live": "polite"
}, Ce = { class: "music-bar__controls" }, we = ["disabled", "aria-label"], Te = ["aria-label"], Ee = ["disabled", "aria-label"], De = { class: "music-bar__progress" }, Oe = { class: "music-bar__time" }, ke = [
	"max",
	"value",
	"aria-label"
], F = { class: "music-bar__time" }, I = /*#__PURE__*/ o(/* @__PURE__ */ h({
	__name: "MusicLibraryPage",
	setup(ne) {
		let o = _("artists"), h = _(null), x = _(null), S = 0;
		function C(e) {
			return e === S;
		}
		let w = _([]), T = _([]), E = _([]), I = _(!1), L = _(null), R = _(0), z = _(100), B = _(0), V = _(0), H = _(100), U = _(0), { t: W } = e(), G = t(), Ae = n(), K = r({
			apiBase: () => G.value,
			streamBase: () => Ae.value || G.value
		});
		ie(() => K.dispose());
		let je = l(() => K.playing.value ? K.currentTrack.value?.id ?? null : null);
		function q() {
			return new te({ baseUrl: G.value });
		}
		async function J(e) {
			let t = S;
			I.value = !0, L.value = null;
			try {
				let n = await q().listArtists({
					limit: 100,
					offset: e
				});
				if (!C(t)) return;
				w.value = n.artists, R.value = n.total, z.value = n.limit, B.value = n.offset;
			} catch {
				if (!C(t)) return;
				L.value = W("music.pageLoadFailed");
			} finally {
				I.value = !1;
			}
		}
		async function Y(e, t) {
			let n = S;
			I.value = !0, L.value = null;
			try {
				let r = await q().listAlbums({
					artist: e.name,
					limit: 100,
					offset: t
				});
				if (!C(n)) return;
				T.value = r.albums, V.value = r.total, H.value = r.limit, U.value = r.offset;
			} catch {
				if (!C(n)) return;
				L.value = W("music.pageLoadFailed");
			} finally {
				I.value = !1;
			}
		}
		re(async () => {
			await J(0);
		});
		let X = l(() => o.value === "artists" ? W("music.artists") : o.value === "albums" && h.value ? h.value.name : o.value === "tracks" && x.value ? x.value.title : W("music.title")), Me = l(() => W("music.artistsTotal", { count: R.value.toLocaleString() })), Ne = l(() => W("music.albumsTotal", { count: V.value.toLocaleString() }));
		function Z(e) {
			o.value = e, S += 1, L.value = null;
		}
		async function Pe(e) {
			h.value = e, x.value = null, T.value = [], E.value = [], V.value = 0, U.value = 0, Z("albums"), await Y(e, 0);
		}
		async function Fe(e) {
			e !== B.value && await J(e);
		}
		async function Ie(e) {
			let t = h.value;
			t && e !== U.value && await Y(t, e);
		}
		async function Le(e) {
			x.value = e, Z("tracks");
			let t = e.tracks ?? [];
			if (t.length > 0 && e.tracksTruncated !== !0) {
				E.value = t;
				return;
			}
			E.value = t;
			let n = S;
			I.value = !0;
			try {
				let t = await q().getAlbum(e.title, e.artist ?? h.value?.name);
				if (!C(n)) return;
				t.tracks && t.tracks.length > 0 && (E.value = t.tracks);
			} catch {} finally {
				I.value = !1;
			}
		}
		function Re(e) {
			K.currentTrack.value?.id === e.id && K.playing.value ? K.pause() : K.currentTrack.value?.id === e.id ? K.play() : (K.loadTracks(E.value), K.play(e));
		}
		function Q(e) {
			return !isFinite(e) || e < 0 ? "0:00" : `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
		}
		function ze(e) {
			let t = Number(e.target.value);
			K.seek(t);
		}
		function $() {
			Z("artists"), h.value = null, x.value = null, T.value = [], V.value = 0, U.value = 0;
		}
		function Be() {
			o.value === "tracks" ? (Z("albums"), x.value = null, E.value = []) : o.value === "albums" && $();
		}
		return (e, t) => (g(), f("div", oe, [
			p("header", se, [
				p("div", ce, [o.value === "artists" ? d("", !0) : (g(), f("button", {
					key: 0,
					type: "button",
					class: "music-page__back",
					"aria-label": b(W)("player.back"),
					onClick: Be
				}, [m(s, {
					name: "arrow-left",
					class: "music-page__back-icon"
				})], 8, le)), o.value === "artists" ? d("", !0) : (g(), f("nav", {
					key: 1,
					class: "music-page__crumb-nav",
					"aria-label": b(W)("common.breadcrumb")
				}, [
					p("button", {
						type: "button",
						class: "music-page__crumb",
						onClick: $
					}, y(b(W)("music.artists")), 1),
					m(s, {
						name: "chevron-right",
						class: "music-page__crumb-sep"
					}),
					p("span", de, y(X.value), 1)
				], 8, ue))]),
				p("h1", fe, y(X.value), 1),
				o.value === "artists" ? (g(), f("p", pe, y(Me.value), 1)) : o.value === "albums" ? (g(), f("p", me, y(Ne.value), 1)) : d("", !0)
			]),
			L.value ? (g(), f("div", he, [m(s, {
				name: "alert-circle",
				class: "music-page__error-icon"
			}), p("p", ge, y(L.value), 1)])) : d("", !0),
			o.value === "artists" ? (g(), f(c, { key: 1 }, [p("div", _e, [I.value ? (g(), f("div", ve, [(g(), f(c, null, v(12, (e) => p("div", {
				key: e,
				class: "artist-skel"
			}, [...t[3] ||= [
				p("div", { class: "artist-skel__img" }, null, -1),
				p("div", { class: "artist-skel__name" }, null, -1),
				p("div", { class: "artist-skel__albums" }, null, -1)
			]])), 64))])) : w.value.length === 0 && !L.value ? (g(), f("div", ye, [m(s, {
				name: "music",
				class: "music-page__empty-icon"
			}), p("p", D, y(b(W)("music.noArtists")), 1)])) : (g(!0), f(c, { key: 2 }, v(w.value, (e) => (g(), u(ae, {
				key: e.id,
				artist: e,
				onClick: Pe
			}, null, 8, ["artist"]))), 128))]), m(i, {
				"data-pager": "artists",
				offset: B.value,
				limit: z.value,
				total: R.value,
				disabled: I.value,
				label: b(W)("music.artists"),
				controls: "music-artists-grid",
				onGo: Fe
			}, null, 8, [
				"offset",
				"limit",
				"total",
				"disabled",
				"label"
			])], 64)) : o.value === "albums" ? (g(), f(c, { key: 2 }, [p("div", O, [I.value ? (g(), f("div", k, [(g(), f(c, null, v(8, (e) => p("div", {
				key: e,
				class: "album-skel"
			}, [...t[4] ||= [
				p("div", { class: "album-skel__cover" }, null, -1),
				p("div", { class: "album-skel__title" }, null, -1),
				p("div", { class: "album-skel__meta" }, null, -1)
			]])), 64))])) : T.value.length === 0 && !L.value ? (g(), f("div", A, [m(s, {
				name: "image",
				class: "music-page__empty-icon"
			}), p("p", j, y(b(W)("music.noAlbums")), 1)])) : (g(!0), f(c, { key: 2 }, v(T.value, (e) => (g(), u(ee, {
				key: e.id,
				album: e,
				onClick: Le
			}, null, 8, ["album"]))), 128))]), m(i, {
				"data-pager": "albums",
				offset: U.value,
				limit: H.value,
				total: V.value,
				disabled: I.value,
				label: b(W)("music.albums"),
				controls: "music-albums-grid",
				onGo: Ie
			}, null, 8, [
				"offset",
				"limit",
				"total",
				"disabled",
				"label"
			])], 64)) : o.value === "tracks" ? (g(), f("div", M, [m(a, {
				tracks: E.value,
				"playing-track-id": je.value,
				loading: I.value,
				onPlay: Re
			}, null, 8, [
				"tracks",
				"playing-track-id",
				"loading"
			])])) : d("", !0),
			b(K).currentTrack.value ? (g(), f("footer", {
				key: 4,
				class: "music-bar",
				role: "region",
				"aria-label": b(W)("music.nowPlaying")
			}, [
				p("div", P, [p("span", be, y(b(K).currentTrack.value.title), 1), b(K).error.value ? (g(), f("span", xe, y(b(W)("music.streamError")), 1)) : b(K).loading.value ? (g(), f("span", Se, y(b(W)("music.loading")), 1)) : d("", !0)]),
				p("div", Ce, [
					p("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !b(K).hasPrev.value,
						"aria-label": b(W)("music.previous"),
						onClick: t[0] ||= (e) => b(K).previous()
					}, [m(s, {
						name: "skip-back",
						class: "music-bar__icon"
					})], 8, we),
					p("button", {
						type: "button",
						class: "music-bar__btn music-bar__btn--primary",
						"aria-label": b(K).playing.value ? b(W)("music.pause") : b(W)("music.play"),
						onClick: t[1] ||= (e) => b(K).toggle()
					}, [m(s, {
						name: b(K).playing.value ? "pause" : "play",
						class: "music-bar__icon"
					}, null, 8, ["name"])], 8, Te),
					p("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !b(K).hasNext.value,
						"aria-label": b(W)("music.next"),
						onClick: t[2] ||= (e) => b(K).next()
					}, [m(s, {
						name: "skip-forward",
						class: "music-bar__icon"
					})], 8, Ee)
				]),
				p("div", De, [
					p("span", Oe, y(Q(b(K).position.value)), 1),
					p("input", {
						type: "range",
						class: "music-bar__seek",
						min: "0",
						max: b(K).duration.value || 0,
						value: b(K).position.value,
						"aria-label": b(W)("music.seek"),
						onInput: ze
					}, null, 40, ke),
					p("span", F, y(Q(b(K).duration.value)), 1)
				])
			], 8, N)) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-86b6dc4c"]]);
export { I as default };

//# sourceMappingURL=MusicLibraryPage-CTRBirUk.js.map