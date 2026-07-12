import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { t as n } from "./useMessages-CI_jngTk.js";
import { t as r } from "./client-C0AMSEun.js";
import { n as i } from "./useApiBase-CV_r-Kk4.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, normalizeClass as m, onMounted as h, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b } from "vue";
//#region src/components/MusicArtistCard.vue?vue&type=script&setup=true&lang.ts
var x = { class: "artist-card__image-wrap" }, S = ["src", "alt"], C = {
	key: 1,
	class: "artist-card__placeholder"
}, w = { class: "artist-card__info" }, T = { class: "artist-card__name" }, E = {
	key: 0,
	class: "artist-card__albums"
}, D = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "MusicArtistCard",
	props: { artist: {} },
	emits: ["click"],
	setup(e) {
		return (n, r) => (g(), l("button", {
			type: "button",
			class: "artist-card",
			onClick: r[0] ||= (t) => n.$emit("click", e.artist)
		}, [u("div", x, [e.artist.imageUrl ? (g(), l("img", {
			key: 0,
			src: e.artist.imageUrl,
			alt: e.artist.name,
			class: "artist-card__image",
			loading: "lazy"
		}, null, 8, S)) : (g(), l("div", C, [f(t, {
			name: "music",
			class: "artist-card__placeholder-icon"
		})]))]), u("div", w, [u("span", T, y(e.artist.name), 1), e.artist.albumCount === void 0 ? c("", !0) : (g(), l("span", E, y(e.artist.albumCount) + " album" + y(e.artist.albumCount === 1 ? "" : "s"), 1))])]));
	}
}), [["__scopeId", "data-v-ff95deef"]]), O = { class: "album-card__cover-wrap" }, k = ["src", "alt"], A = {
	key: 1,
	class: "album-card__placeholder"
}, j = { class: "album-card__info" }, M = { class: "album-card__title" }, N = { class: "album-card__meta" }, P = { class: "album-card__year" }, F = { class: "album-card__tracks" }, I = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "MusicAlbumCard",
	props: { album: {} },
	emits: ["click"],
	setup(e) {
		function n(e) {
			return e ? String(e) : "—";
		}
		return (r, i) => (g(), l("button", {
			type: "button",
			class: "album-card",
			onClick: i[0] ||= (t) => r.$emit("click", e.album)
		}, [u("div", O, [e.album.albumArtUrl ? (g(), l("img", {
			key: 0,
			src: e.album.albumArtUrl,
			alt: e.album.title,
			class: "album-card__cover",
			loading: "lazy"
		}, null, 8, k)) : (g(), l("div", A, [f(t, {
			name: "image",
			class: "album-card__placeholder-icon"
		})]))]), u("div", j, [u("span", M, y(e.album.title), 1), u("span", N, [
			u("span", P, y(n(e.album.year)), 1),
			i[1] ||= u("span", {
				class: "album-card__dot",
				"aria-hidden": "true"
			}, "·", -1),
			u("span", F, y(e.album.totalTracks) + " track" + y(e.album.totalTracks === 1 ? "" : "s"), 1)
		])])]));
	}
}), [["__scopeId", "data-v-57d859b4"]]), L = {
	class: "track-list",
	role: "list"
}, R = {
	key: 0,
	class: "track-list__loading"
}, z = {
	key: 1,
	class: "track-list__empty",
	role: "status"
}, B = { class: "track-list__empty-text" }, V = ["aria-label", "onClick"], H = { class: "track-row__num" }, U = { class: "track-row__title" }, W = { class: "track-row__duration" }, G = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "MusicTrackList",
	props: {
		tracks: {},
		playingTrackId: {},
		loading: { type: Boolean }
	},
	emits: ["play"],
	setup(e, { emit: r }) {
		let i = r, { t: o } = n();
		function s(e) {
			return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
		}
		return (n, r) => (g(), l("div", L, [e.loading && e.tracks.length === 0 ? (g(), l("div", R, [(g(), l(a, null, v(8, (e) => u("div", {
			key: e,
			class: "track-skel",
			role: "listitem"
		}, [...r[0] ||= [
			u("div", { class: "track-skel__num" }, null, -1),
			u("div", { class: "track-skel__title" }, null, -1),
			u("div", { class: "track-skel__duration" }, null, -1)
		]])), 64))])) : e.tracks.length === 0 ? (g(), l("div", z, [f(t, {
			name: "music",
			class: "track-list__empty-icon"
		}), u("p", B, y(b(o)("music.noTracks")), 1)])) : (g(!0), l(a, { key: 2 }, v(e.tracks, (n) => (g(), l("div", {
			key: n.id,
			class: m(["track-row", { "is-playing": e.playingTrackId === n.id }]),
			role: "listitem"
		}, [
			u("button", {
				type: "button",
				class: "track-row__play",
				"aria-label": e.playingTrackId === n.id ? b(o)("music.pause") : b(o)("music.play"),
				onClick: (e) => i("play", n)
			}, [f(t, {
				name: e.playingTrackId === n.id ? "pause" : "play",
				class: "track-row__play-icon"
			}, null, 8, ["name"])], 8, V),
			u("span", H, [e.playingTrackId !== n.id && n.trackNumber !== null ? (g(), l(a, { key: 0 }, [d(y(n.trackNumber), 1)], 64)) : c("", !0)]),
			u("span", U, y(n.title), 1),
			u("span", W, y(s(n.durationSecs)), 1)
		], 2))), 128))]));
	}
}), [["__scopeId", "data-v-780a05e1"]]), K = { class: "music-page" }, q = { class: "music-page__head" }, J = { class: "music-page__breadcrumb" }, Y = ["aria-label"], X = {
	key: 1,
	class: "music-page__crumb-nav",
	"aria-label": "Breadcrumb"
}, Z = { class: "music-page__crumb-current" }, Q = { class: "music-page__title" }, $ = {
	key: 0,
	class: "music-page__grid"
}, ee = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, te = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, ne = { class: "music-page__empty-text" }, re = {
	key: 1,
	class: "music-page__grid"
}, ie = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, ae = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, oe = { class: "music-page__empty-text" }, se = { key: 2 }, ce = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "MusicLibraryPage",
	setup(e) {
		let d = _("artists"), p = _(null), m = _(null), x = _(null), S = _([]), C = _([]), w = _([]), T = _(!1), { t: E } = n(), O = i();
		function k() {
			return new r({ baseUrl: O.value });
		}
		h(async () => {
			T.value = !0;
			try {
				S.value = await k().listArtists();
			} catch {
				S.value = [];
			} finally {
				T.value = !1;
			}
		});
		let A = o(() => d.value === "artists" ? E("music.artists") : d.value === "albums" && p.value ? p.value.name : d.value === "tracks" && m.value ? m.value.title : E("music.title"));
		async function j(e) {
			p.value = e, m.value = null, C.value = [], w.value = [], d.value = "albums", T.value = !0;
			try {
				C.value = await k().listAlbums(e.name);
			} catch {
				C.value = [];
			} finally {
				T.value = !1;
			}
		}
		async function M(e) {
			m.value = e, d.value = "tracks";
			let t = e.tracks ?? [];
			if (t.length > 0) {
				w.value = t;
				return;
			}
			w.value = [], T.value = !0;
			try {
				w.value = await k().listTracks(e.title);
			} catch {
				w.value = [];
			} finally {
				T.value = !1;
			}
		}
		function N(e) {
			x.value === e.id ? x.value = null : x.value = e.id;
		}
		function P() {
			d.value === "tracks" ? (d.value = "albums", m.value = null, w.value = []) : d.value === "albums" && (d.value = "artists", p.value = null, C.value = []);
		}
		return (e, n) => (g(), l("div", K, [u("header", q, [u("div", J, [d.value === "artists" ? c("", !0) : (g(), l("button", {
			key: 0,
			type: "button",
			class: "music-page__back",
			"aria-label": b(E)("player.back"),
			onClick: P
		}, [f(t, {
			name: "arrow-left",
			class: "music-page__back-icon"
		})], 8, Y)), d.value === "artists" ? c("", !0) : (g(), l("nav", X, [
			u("button", {
				type: "button",
				class: "music-page__crumb",
				onClick: n[0] ||= (e) => {
					d.value = "artists", p.value = null, C.value = [];
				}
			}, y(b(E)("music.artists")), 1),
			f(t, {
				name: "chevron-right",
				class: "music-page__crumb-sep"
			}),
			u("span", Z, y(A.value), 1)
		]))]), u("h1", Q, y(A.value), 1)]), d.value === "artists" ? (g(), l("div", $, [T.value ? (g(), l("div", ee, [(g(), l(a, null, v(12, (e) => u("div", {
			key: e,
			class: "artist-skel"
		}, [...n[1] ||= [
			u("div", { class: "artist-skel__img" }, null, -1),
			u("div", { class: "artist-skel__name" }, null, -1),
			u("div", { class: "artist-skel__albums" }, null, -1)
		]])), 64))])) : S.value.length === 0 ? (g(), l("div", te, [f(t, {
			name: "music",
			class: "music-page__empty-icon"
		}), u("p", ne, y(b(E)("music.noArtists")), 1)])) : (g(!0), l(a, { key: 2 }, v(S.value, (e) => (g(), s(D, {
			key: e.id,
			artist: e,
			onClick: j
		}, null, 8, ["artist"]))), 128))])) : d.value === "albums" ? (g(), l("div", re, [T.value ? (g(), l("div", ie, [(g(), l(a, null, v(8, (e) => u("div", {
			key: e,
			class: "album-skel"
		}, [...n[2] ||= [
			u("div", { class: "album-skel__cover" }, null, -1),
			u("div", { class: "album-skel__title" }, null, -1),
			u("div", { class: "album-skel__meta" }, null, -1)
		]])), 64))])) : C.value.length === 0 ? (g(), l("div", ae, [f(t, {
			name: "image",
			class: "music-page__empty-icon"
		}), u("p", oe, y(b(E)("music.noAlbums")), 1)])) : (g(!0), l(a, { key: 2 }, v(C.value, (e) => (g(), s(I, {
			key: e.id,
			album: e,
			onClick: M
		}, null, 8, ["album"]))), 128))])) : d.value === "tracks" ? (g(), l("div", se, [f(G, {
			tracks: w.value,
			"playing-track-id": x.value,
			loading: T.value,
			onPlay: N
		}, null, 8, [
			"tracks",
			"playing-track-id",
			"loading"
		])])) : c("", !0)]));
	}
}), [["__scopeId", "data-v-166606ae"]]);
//#endregion
export { ce as default };

//# sourceMappingURL=MusicLibraryPage-5i0P9v_u.js.map