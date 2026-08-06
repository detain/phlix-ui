import { n as e, t } from "./Icon-CkTBN_k5.js";
import { t as n } from "./useMessages-nO4j4SSL.js";
import { t as r } from "./client-COHWZ2KC.js";
import { n as i, r as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useImageSrc-KnN1T9Ga.js";
import { i as s, n as c, r as ee, t as te } from "./MusicAlbumCard-BuTBg6YK.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createVNode as h, defineComponent as g, onMounted as ne, onUnmounted as re, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as x } from "vue";
//#region src/components/MusicArtistCard.vue?vue&type=script&setup=true&lang.ts
var S = { class: "artist-card__image-wrap" }, C = ["src", "alt"], w = {
	key: 1,
	class: "artist-card__placeholder"
}, T = { class: "artist-card__info" }, E = { class: "artist-card__name" }, D = {
	key: 0,
	class: "artist-card__albums",
	"data-count": "albums"
}, ie = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "MusicArtistCard",
	props: { artist: {} },
	emits: ["click"],
	setup(e) {
		let r = e, { t: i } = n(), { imgSrc: a } = o(), s = u(() => {
			let e = r.artist.albumCount ?? 0;
			return e === 1 ? i("music.albumsTotalOne") : i("music.albumsTotal", { count: e.toLocaleString() });
		});
		return (n, r) => (_(), p("button", {
			type: "button",
			class: "artist-card",
			onClick: r[0] ||= (t) => n.$emit("click", e.artist)
		}, [m("div", S, [e.artist.imageUrl ? (_(), p("img", {
			key: 0,
			src: x(a)(e.artist.imageUrl),
			alt: e.artist.name,
			class: "artist-card__image",
			loading: "lazy"
		}, null, 8, C)) : (_(), p("div", w, [h(t, {
			name: "music",
			class: "artist-card__placeholder-icon"
		})]))]), m("div", T, [m("span", E, b(e.artist.name), 1), e.artist.albumCount === void 0 ? f("", !0) : (_(), p("span", D, b(s.value), 1))])]));
	}
}), [["__scopeId", "data-v-3aab451a"]]), ae = { class: "music-page" }, oe = { class: "music-page__head" }, se = { class: "music-page__breadcrumb" }, ce = ["aria-label"], le = {
	key: 1,
	class: "music-page__crumb-nav",
	"aria-label": "Breadcrumb"
}, ue = { class: "music-page__crumb-current" }, de = { class: "music-page__title" }, fe = {
	key: 0,
	class: "music-page__count",
	"data-count": "artists",
	role: "status"
}, pe = {
	key: 1,
	class: "music-page__count",
	"data-count": "albums",
	role: "status"
}, me = {
	key: 0,
	class: "music-page__error",
	role: "alert"
}, he = { class: "music-page__error-text" }, ge = {
	id: "music-artists-grid",
	class: "music-page__grid"
}, _e = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, ve = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, ye = { class: "music-page__empty-text" }, O = {
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
}, Ce = { class: "music-bar__controls" }, we = ["disabled", "aria-label"], Te = ["aria-label"], Ee = ["disabled", "aria-label"], De = { class: "music-bar__progress" }, Oe = { class: "music-bar__time" }, F = [
	"max",
	"value",
	"aria-label"
], ke = { class: "music-bar__time" }, I = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "MusicLibraryPage",
	setup(e) {
		let o = v("artists"), g = v(null), S = v(null), C = 0;
		function w(e) {
			return e === C;
		}
		let T = v([]), E = v([]), D = v([]), I = v(!1), L = v(null), R = v(0), z = v(100), B = v(0), V = v(0), H = v(100), U = v(0), { t: W } = n(), G = i(), Ae = a(), K = s({
			apiBase: () => G.value,
			streamBase: () => Ae.value || G.value
		});
		re(() => K.dispose());
		let je = u(() => K.playing.value ? K.currentTrack.value?.id ?? null : null);
		function q() {
			return new r({ baseUrl: G.value });
		}
		async function J(e) {
			let t = C;
			I.value = !0, L.value = null;
			try {
				let n = await q().listArtists({
					limit: 100,
					offset: e
				});
				if (!w(t)) return;
				T.value = n.artists, R.value = n.total, z.value = n.limit, B.value = n.offset;
			} catch {
				if (!w(t)) return;
				L.value = W("music.pageLoadFailed");
			} finally {
				I.value = !1;
			}
		}
		async function Y(e, t) {
			let n = C;
			I.value = !0, L.value = null;
			try {
				let r = await q().listAlbums({
					artist: e.name,
					limit: 100,
					offset: t
				});
				if (!w(n)) return;
				E.value = r.albums, V.value = r.total, H.value = r.limit, U.value = r.offset;
			} catch {
				if (!w(n)) return;
				L.value = W("music.pageLoadFailed");
			} finally {
				I.value = !1;
			}
		}
		ne(async () => {
			await J(0);
		});
		let X = u(() => o.value === "artists" ? W("music.artists") : o.value === "albums" && g.value ? g.value.name : o.value === "tracks" && S.value ? S.value.title : W("music.title")), Me = u(() => R.value === 1 ? W("music.artistsTotalOne") : W("music.artistsTotal", { count: R.value.toLocaleString() })), Ne = u(() => V.value === 1 ? W("music.albumsTotalOne") : W("music.albumsTotal", { count: V.value.toLocaleString() }));
		function Z(e) {
			o.value = e, C += 1, L.value = null;
		}
		async function Pe(e) {
			g.value = e, S.value = null, E.value = [], D.value = [], V.value = 0, U.value = 0, Z("albums"), await Y(e, 0);
		}
		async function Fe(e) {
			e !== B.value && await J(e);
		}
		async function Ie(e) {
			let t = g.value;
			!t || e === U.value || await Y(t, e);
		}
		async function Le(e) {
			S.value = e, Z("tracks");
			let t = e.tracks ?? [];
			if (t.length > 0 && e.tracksTruncated !== !0) {
				D.value = t;
				return;
			}
			D.value = t;
			let n = C;
			I.value = !0;
			try {
				let t = await q().getAlbum(e.title, e.artist ?? g.value?.name);
				if (!w(n)) return;
				t.tracks && t.tracks.length > 0 && (D.value = t.tracks);
			} catch {} finally {
				I.value = !1;
			}
		}
		function Re(e) {
			if (K.currentTrack.value?.id === e.id && K.playing.value) {
				K.pause();
				return;
			}
			if (K.currentTrack.value?.id === e.id) {
				K.play();
				return;
			}
			K.loadTracks(D.value), K.play(e);
		}
		function Q(e) {
			return !isFinite(e) || e < 0 ? "0:00" : `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
		}
		function ze(e) {
			let t = Number(e.target.value);
			K.seek(t);
		}
		function $() {
			Z("artists"), g.value = null, S.value = null, E.value = [], V.value = 0, U.value = 0;
		}
		function Be() {
			o.value === "tracks" ? (Z("albums"), S.value = null, D.value = []) : o.value === "albums" && $();
		}
		return (e, n) => (_(), p("div", ae, [
			m("header", oe, [
				m("div", se, [o.value === "artists" ? f("", !0) : (_(), p("button", {
					key: 0,
					type: "button",
					class: "music-page__back",
					"aria-label": x(W)("player.back"),
					onClick: Be
				}, [h(t, {
					name: "arrow-left",
					class: "music-page__back-icon"
				})], 8, ce)), o.value === "artists" ? f("", !0) : (_(), p("nav", le, [
					m("button", {
						type: "button",
						class: "music-page__crumb",
						onClick: $
					}, b(x(W)("music.artists")), 1),
					h(t, {
						name: "chevron-right",
						class: "music-page__crumb-sep"
					}),
					m("span", ue, b(X.value), 1)
				]))]),
				m("h1", de, b(X.value), 1),
				o.value === "artists" ? (_(), p("p", fe, b(Me.value), 1)) : o.value === "albums" ? (_(), p("p", pe, b(Ne.value), 1)) : f("", !0)
			]),
			L.value ? (_(), p("div", me, [h(t, {
				name: "alert-circle",
				class: "music-page__error-icon"
			}), m("p", he, b(L.value), 1)])) : f("", !0),
			o.value === "artists" ? (_(), p(l, { key: 1 }, [m("div", ge, [I.value ? (_(), p("div", _e, [(_(), p(l, null, y(12, (e) => m("div", {
				key: e,
				class: "artist-skel"
			}, [...n[3] ||= [
				m("div", { class: "artist-skel__img" }, null, -1),
				m("div", { class: "artist-skel__name" }, null, -1),
				m("div", { class: "artist-skel__albums" }, null, -1)
			]])), 64))])) : T.value.length === 0 && !L.value ? (_(), p("div", ve, [h(t, {
				name: "music",
				class: "music-page__empty-icon"
			}), m("p", ye, b(x(W)("music.noArtists")), 1)])) : (_(!0), p(l, { key: 2 }, y(T.value, (e) => (_(), d(ie, {
				key: e.id,
				artist: e,
				onClick: Pe
			}, null, 8, ["artist"]))), 128))]), h(c, {
				"data-pager": "artists",
				offset: B.value,
				limit: z.value,
				total: R.value,
				disabled: I.value,
				label: x(W)("music.artists"),
				controls: "music-artists-grid",
				onGo: Fe
			}, null, 8, [
				"offset",
				"limit",
				"total",
				"disabled",
				"label"
			])], 64)) : o.value === "albums" ? (_(), p(l, { key: 2 }, [m("div", O, [I.value ? (_(), p("div", k, [(_(), p(l, null, y(8, (e) => m("div", {
				key: e,
				class: "album-skel"
			}, [...n[4] ||= [
				m("div", { class: "album-skel__cover" }, null, -1),
				m("div", { class: "album-skel__title" }, null, -1),
				m("div", { class: "album-skel__meta" }, null, -1)
			]])), 64))])) : E.value.length === 0 && !L.value ? (_(), p("div", A, [h(t, {
				name: "image",
				class: "music-page__empty-icon"
			}), m("p", j, b(x(W)("music.noAlbums")), 1)])) : (_(!0), p(l, { key: 2 }, y(E.value, (e) => (_(), d(te, {
				key: e.id,
				album: e,
				onClick: Le
			}, null, 8, ["album"]))), 128))]), h(c, {
				"data-pager": "albums",
				offset: U.value,
				limit: H.value,
				total: V.value,
				disabled: I.value,
				label: x(W)("music.albums"),
				controls: "music-albums-grid",
				onGo: Ie
			}, null, 8, [
				"offset",
				"limit",
				"total",
				"disabled",
				"label"
			])], 64)) : o.value === "tracks" ? (_(), p("div", M, [h(ee, {
				tracks: D.value,
				"playing-track-id": je.value,
				loading: I.value,
				onPlay: Re
			}, null, 8, [
				"tracks",
				"playing-track-id",
				"loading"
			])])) : f("", !0),
			x(K).currentTrack.value ? (_(), p("footer", {
				key: 4,
				class: "music-bar",
				role: "region",
				"aria-label": x(W)("music.nowPlaying")
			}, [
				m("div", P, [m("span", be, b(x(K).currentTrack.value.title), 1), x(K).error.value ? (_(), p("span", xe, b(x(W)("music.streamError")), 1)) : x(K).loading.value ? (_(), p("span", Se, b(x(W)("music.loading")), 1)) : f("", !0)]),
				m("div", Ce, [
					m("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !x(K).hasPrev.value,
						"aria-label": x(W)("music.previous"),
						onClick: n[0] ||= (e) => x(K).previous()
					}, [h(t, {
						name: "skip-back",
						class: "music-bar__icon"
					})], 8, we),
					m("button", {
						type: "button",
						class: "music-bar__btn music-bar__btn--primary",
						"aria-label": x(K).playing.value ? x(W)("music.pause") : x(W)("music.play"),
						onClick: n[1] ||= (e) => x(K).toggle()
					}, [h(t, {
						name: x(K).playing.value ? "pause" : "play",
						class: "music-bar__icon"
					}, null, 8, ["name"])], 8, Te),
					m("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !x(K).hasNext.value,
						"aria-label": x(W)("music.next"),
						onClick: n[2] ||= (e) => x(K).next()
					}, [h(t, {
						name: "skip-forward",
						class: "music-bar__icon"
					})], 8, Ee)
				]),
				m("div", De, [
					m("span", Oe, b(Q(x(K).position.value)), 1),
					m("input", {
						type: "range",
						class: "music-bar__seek",
						min: "0",
						max: x(K).duration.value || 0,
						value: x(K).position.value,
						"aria-label": x(W)("music.seek"),
						onInput: ze
					}, null, 40, F),
					m("span", ke, b(Q(x(K).duration.value)), 1)
				])
			], 8, N)) : f("", !0)
		]));
	}
}), [["__scopeId", "data-v-18c4a029"]]);
//#endregion
export { I as default };

//# sourceMappingURL=MusicLibraryPage-BBMsOASc.js.map