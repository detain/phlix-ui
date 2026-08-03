import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CfPSBsz2.js";
import { t as n } from "./useMessages-BinKgH9r.js";
import { t as r } from "./client-COHWZ2KC.js";
import { n as i, r as a } from "./useApiBase-CV_r-Kk4.js";
import { i as ee, n as o, r as te, t as ne } from "./MusicAlbumCard-CHUyzXrO.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createVNode as p, defineComponent as m, onMounted as re, onUnmounted as ie, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as y } from "vue";
//#region src/components/MusicArtistCard.vue?vue&type=script&setup=true&lang.ts
var b = { class: "artist-card__image-wrap" }, x = ["src", "alt"], S = {
	key: 1,
	class: "artist-card__placeholder"
}, C = { class: "artist-card__info" }, w = { class: "artist-card__name" }, T = {
	key: 0,
	class: "artist-card__albums",
	"data-count": "albums"
}, ae = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "MusicArtistCard",
	props: { artist: {} },
	emits: ["click"],
	setup(e) {
		let r = e, { t: i } = n(), a = c(() => {
			let e = r.artist.albumCount ?? 0;
			return e === 1 ? i("music.albumsTotalOne") : i("music.albumsTotal", { count: e.toLocaleString() });
		});
		return (n, r) => (h(), d("button", {
			type: "button",
			class: "artist-card",
			onClick: r[0] ||= (t) => n.$emit("click", e.artist)
		}, [f("div", b, [e.artist.imageUrl ? (h(), d("img", {
			key: 0,
			src: e.artist.imageUrl,
			alt: e.artist.name,
			class: "artist-card__image",
			loading: "lazy"
		}, null, 8, x)) : (h(), d("div", S, [p(t, {
			name: "music",
			class: "artist-card__placeholder-icon"
		})]))]), f("div", C, [f("span", w, v(e.artist.name), 1), e.artist.albumCount === void 0 ? u("", !0) : (h(), d("span", T, v(a.value), 1))])]));
	}
}), [["__scopeId", "data-v-095193a2"]]), oe = { class: "music-page" }, se = { class: "music-page__head" }, ce = { class: "music-page__breadcrumb" }, le = ["aria-label"], ue = {
	key: 1,
	class: "music-page__crumb-nav",
	"aria-label": "Breadcrumb"
}, de = { class: "music-page__crumb-current" }, fe = { class: "music-page__title" }, pe = {
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
}, be = { class: "music-page__empty-text" }, E = {
	id: "music-albums-grid",
	class: "music-page__grid"
}, D = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, O = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, k = { class: "music-page__empty-text" }, A = { key: 3 }, j = ["aria-label"], M = { class: "music-bar__meta" }, N = { class: "music-bar__title" }, xe = {
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
], P = { class: "music-bar__time" }, F = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "MusicLibraryPage",
	setup(e) {
		let m = g("artists"), b = g(null), x = g(null), S = 0;
		function C(e) {
			return e === S;
		}
		let w = g([]), T = g([]), F = g([]), I = g(!1), L = g(null), R = g(0), z = g(100), B = g(0), V = g(0), H = g(100), U = g(0), { t: W } = n(), G = i(), Ae = a(), K = ee({
			apiBase: () => G.value,
			streamBase: () => Ae.value || G.value
		});
		ie(() => K.dispose());
		let je = c(() => K.playing.value ? K.currentTrack.value?.id ?? null : null);
		function q() {
			return new r({ baseUrl: G.value });
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
		let X = c(() => m.value === "artists" ? W("music.artists") : m.value === "albums" && b.value ? b.value.name : m.value === "tracks" && x.value ? x.value.title : W("music.title")), Me = c(() => R.value === 1 ? W("music.artistsTotalOne") : W("music.artistsTotal", { count: R.value.toLocaleString() })), Ne = c(() => V.value === 1 ? W("music.albumsTotalOne") : W("music.albumsTotal", { count: V.value.toLocaleString() }));
		function Z(e) {
			m.value = e, S += 1, L.value = null;
		}
		async function Pe(e) {
			b.value = e, x.value = null, T.value = [], F.value = [], V.value = 0, U.value = 0, Z("albums"), await Y(e, 0);
		}
		async function Fe(e) {
			e !== B.value && await J(e);
		}
		async function Ie(e) {
			let t = b.value;
			!t || e === U.value || await Y(t, e);
		}
		async function Le(e) {
			x.value = e, Z("tracks");
			let t = e.tracks ?? [];
			if (t.length > 0 && e.tracksTruncated !== !0) {
				F.value = t;
				return;
			}
			F.value = t;
			let n = S;
			I.value = !0;
			try {
				let t = await q().getAlbum(e.title, e.artist ?? b.value?.name);
				if (!C(n)) return;
				t.tracks && t.tracks.length > 0 && (F.value = t.tracks);
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
			K.loadTracks(F.value), K.play(e);
		}
		function Q(e) {
			return !isFinite(e) || e < 0 ? "0:00" : `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
		}
		function ze(e) {
			let t = Number(e.target.value);
			K.seek(t);
		}
		function $() {
			Z("artists"), b.value = null, x.value = null, T.value = [], V.value = 0, U.value = 0;
		}
		function Be() {
			m.value === "tracks" ? (Z("albums"), x.value = null, F.value = []) : m.value === "albums" && $();
		}
		return (e, n) => (h(), d("div", oe, [
			f("header", se, [
				f("div", ce, [m.value === "artists" ? u("", !0) : (h(), d("button", {
					key: 0,
					type: "button",
					class: "music-page__back",
					"aria-label": y(W)("player.back"),
					onClick: Be
				}, [p(t, {
					name: "arrow-left",
					class: "music-page__back-icon"
				})], 8, le)), m.value === "artists" ? u("", !0) : (h(), d("nav", ue, [
					f("button", {
						type: "button",
						class: "music-page__crumb",
						onClick: $
					}, v(y(W)("music.artists")), 1),
					p(t, {
						name: "chevron-right",
						class: "music-page__crumb-sep"
					}),
					f("span", de, v(X.value), 1)
				]))]),
				f("h1", fe, v(X.value), 1),
				m.value === "artists" ? (h(), d("p", pe, v(Me.value), 1)) : m.value === "albums" ? (h(), d("p", me, v(Ne.value), 1)) : u("", !0)
			]),
			L.value ? (h(), d("div", he, [p(t, {
				name: "alert-circle",
				class: "music-page__error-icon"
			}), f("p", ge, v(L.value), 1)])) : u("", !0),
			m.value === "artists" ? (h(), d(s, { key: 1 }, [f("div", _e, [I.value ? (h(), d("div", ve, [(h(), d(s, null, _(12, (e) => f("div", {
				key: e,
				class: "artist-skel"
			}, [...n[3] ||= [
				f("div", { class: "artist-skel__img" }, null, -1),
				f("div", { class: "artist-skel__name" }, null, -1),
				f("div", { class: "artist-skel__albums" }, null, -1)
			]])), 64))])) : w.value.length === 0 && !L.value ? (h(), d("div", ye, [p(t, {
				name: "music",
				class: "music-page__empty-icon"
			}), f("p", be, v(y(W)("music.noArtists")), 1)])) : (h(!0), d(s, { key: 2 }, _(w.value, (e) => (h(), l(ae, {
				key: e.id,
				artist: e,
				onClick: Pe
			}, null, 8, ["artist"]))), 128))]), p(o, {
				"data-pager": "artists",
				offset: B.value,
				limit: z.value,
				total: R.value,
				disabled: I.value,
				label: y(W)("music.artists"),
				controls: "music-artists-grid",
				onGo: Fe
			}, null, 8, [
				"offset",
				"limit",
				"total",
				"disabled",
				"label"
			])], 64)) : m.value === "albums" ? (h(), d(s, { key: 2 }, [f("div", E, [I.value ? (h(), d("div", D, [(h(), d(s, null, _(8, (e) => f("div", {
				key: e,
				class: "album-skel"
			}, [...n[4] ||= [
				f("div", { class: "album-skel__cover" }, null, -1),
				f("div", { class: "album-skel__title" }, null, -1),
				f("div", { class: "album-skel__meta" }, null, -1)
			]])), 64))])) : T.value.length === 0 && !L.value ? (h(), d("div", O, [p(t, {
				name: "image",
				class: "music-page__empty-icon"
			}), f("p", k, v(y(W)("music.noAlbums")), 1)])) : (h(!0), d(s, { key: 2 }, _(T.value, (e) => (h(), l(ne, {
				key: e.id,
				album: e,
				onClick: Le
			}, null, 8, ["album"]))), 128))]), p(o, {
				"data-pager": "albums",
				offset: U.value,
				limit: H.value,
				total: V.value,
				disabled: I.value,
				label: y(W)("music.albums"),
				controls: "music-albums-grid",
				onGo: Ie
			}, null, 8, [
				"offset",
				"limit",
				"total",
				"disabled",
				"label"
			])], 64)) : m.value === "tracks" ? (h(), d("div", A, [p(te, {
				tracks: F.value,
				"playing-track-id": je.value,
				loading: I.value,
				onPlay: Re
			}, null, 8, [
				"tracks",
				"playing-track-id",
				"loading"
			])])) : u("", !0),
			y(K).currentTrack.value ? (h(), d("footer", {
				key: 4,
				class: "music-bar",
				role: "region",
				"aria-label": y(W)("music.nowPlaying")
			}, [
				f("div", M, [f("span", N, v(y(K).currentTrack.value.title), 1), y(K).error.value ? (h(), d("span", xe, v(y(W)("music.streamError")), 1)) : y(K).loading.value ? (h(), d("span", Se, v(y(W)("music.loading")), 1)) : u("", !0)]),
				f("div", Ce, [
					f("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !y(K).hasPrev.value,
						"aria-label": y(W)("music.previous"),
						onClick: n[0] ||= (e) => y(K).previous()
					}, [p(t, {
						name: "skip-back",
						class: "music-bar__icon"
					})], 8, we),
					f("button", {
						type: "button",
						class: "music-bar__btn music-bar__btn--primary",
						"aria-label": y(K).playing.value ? y(W)("music.pause") : y(W)("music.play"),
						onClick: n[1] ||= (e) => y(K).toggle()
					}, [p(t, {
						name: y(K).playing.value ? "pause" : "play",
						class: "music-bar__icon"
					}, null, 8, ["name"])], 8, Te),
					f("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !y(K).hasNext.value,
						"aria-label": y(W)("music.next"),
						onClick: n[2] ||= (e) => y(K).next()
					}, [p(t, {
						name: "skip-forward",
						class: "music-bar__icon"
					})], 8, Ee)
				]),
				f("div", De, [
					f("span", Oe, v(Q(y(K).position.value)), 1),
					f("input", {
						type: "range",
						class: "music-bar__seek",
						min: "0",
						max: y(K).duration.value || 0,
						value: y(K).position.value,
						"aria-label": y(W)("music.seek"),
						onInput: ze
					}, null, 40, ke),
					f("span", P, v(Q(y(K).duration.value)), 1)
				])
			], 8, j)) : u("", !0)
		]));
	}
}), [["__scopeId", "data-v-18c4a029"]]);
//#endregion
export { F as default };

//# sourceMappingURL=MusicLibraryPage-BS_DFZCZ.js.map