import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-C0x49DFi.js";
import { t as n } from "./useMessages-CI_jngTk.js";
import { Fragment as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, normalizeClass as f, openBlock as p, ref as m, renderList as h, toDisplayString as g, unref as _ } from "vue";
//#region src/components/MusicArtistCard.vue?vue&type=script&setup=true&lang.ts
var v = { class: "artist-card__image-wrap" }, y = ["src", "alt"], b = {
	key: 1,
	class: "artist-card__placeholder"
}, x = { class: "artist-card__info" }, S = { class: "artist-card__name" }, C = {
	key: 0,
	class: "artist-card__albums"
}, ee = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "MusicArtistCard",
	props: { artist: {} },
	emits: ["click"],
	setup(e) {
		return (n, r) => (p(), s("button", {
			type: "button",
			class: "artist-card",
			onClick: r[0] ||= (t) => n.$emit("click", e.artist)
		}, [c("div", v, [e.artist.imageUrl ? (p(), s("img", {
			key: 0,
			src: e.artist.imageUrl,
			alt: e.artist.name,
			class: "artist-card__image",
			loading: "lazy"
		}, null, 8, y)) : (p(), s("div", b, [u(t, {
			name: "music",
			class: "artist-card__placeholder-icon"
		})]))]), c("div", x, [c("span", S, g(e.artist.name), 1), e.artist.albumCount === void 0 ? o("", !0) : (p(), s("span", C, g(e.artist.albumCount) + " album" + g(e.artist.albumCount === 1 ? "" : "s"), 1))])]));
	}
}), [["__scopeId", "data-v-ff95deef"]]), w = { class: "album-card__cover-wrap" }, T = ["src", "alt"], E = {
	key: 1,
	class: "album-card__placeholder"
}, D = { class: "album-card__info" }, O = { class: "album-card__title" }, k = { class: "album-card__meta" }, A = { class: "album-card__year" }, j = { class: "album-card__tracks" }, M = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "MusicAlbumCard",
	props: { album: {} },
	emits: ["click"],
	setup(e) {
		function n(e) {
			return e ? String(e) : "—";
		}
		return (r, i) => (p(), s("button", {
			type: "button",
			class: "album-card",
			onClick: i[0] ||= (t) => r.$emit("click", e.album)
		}, [c("div", w, [e.album.albumArtUrl ? (p(), s("img", {
			key: 0,
			src: e.album.albumArtUrl,
			alt: e.album.title,
			class: "album-card__cover",
			loading: "lazy"
		}, null, 8, T)) : (p(), s("div", E, [u(t, {
			name: "image",
			class: "album-card__placeholder-icon"
		})]))]), c("div", D, [c("span", O, g(e.album.title), 1), c("span", k, [
			c("span", A, g(n(e.album.year)), 1),
			i[1] ||= c("span", {
				class: "album-card__dot",
				"aria-hidden": "true"
			}, "·", -1),
			c("span", j, g(e.album.totalTracks) + " track" + g(e.album.totalTracks === 1 ? "" : "s"), 1)
		])])]));
	}
}), [["__scopeId", "data-v-57d859b4"]]), N = {
	class: "track-list",
	role: "list"
}, P = {
	key: 0,
	class: "track-list__loading"
}, F = {
	key: 1,
	class: "track-list__empty",
	role: "status"
}, I = { class: "track-list__empty-text" }, L = ["aria-label", "onClick"], R = { class: "track-row__num" }, z = { class: "track-row__title" }, B = { class: "track-row__duration" }, V = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "MusicTrackList",
	props: {
		tracks: {},
		playingTrackId: {},
		loading: { type: Boolean }
	},
	emits: ["play"],
	setup(e, { emit: i }) {
		let a = i, { t: d } = n();
		function m(e) {
			return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
		}
		return (n, i) => (p(), s("div", N, [e.loading && e.tracks.length === 0 ? (p(), s("div", P, [(p(), s(r, null, h(8, (e) => c("div", {
			key: e,
			class: "track-skel",
			role: "listitem"
		}, [...i[0] ||= [
			c("div", { class: "track-skel__num" }, null, -1),
			c("div", { class: "track-skel__title" }, null, -1),
			c("div", { class: "track-skel__duration" }, null, -1)
		]])), 64))])) : e.tracks.length === 0 ? (p(), s("div", F, [u(t, {
			name: "music",
			class: "track-list__empty-icon"
		}), c("p", I, g(_(d)("music.noTracks")), 1)])) : (p(!0), s(r, { key: 2 }, h(e.tracks, (n) => (p(), s("div", {
			key: n.id,
			class: f(["track-row", { "is-playing": e.playingTrackId === n.id }]),
			role: "listitem"
		}, [
			c("button", {
				type: "button",
				class: "track-row__play",
				"aria-label": e.playingTrackId === n.id ? _(d)("music.pause") : _(d)("music.play"),
				onClick: (e) => a("play", n)
			}, [u(t, {
				name: e.playingTrackId === n.id ? "pause" : "play",
				class: "track-row__play-icon"
			}, null, 8, ["name"])], 8, L),
			c("span", R, [e.playingTrackId !== n.id && n.trackNumber !== null ? (p(), s(r, { key: 0 }, [l(g(n.trackNumber), 1)], 64)) : o("", !0)]),
			c("span", z, g(n.title), 1),
			c("span", B, g(m(n.durationSecs)), 1)
		], 2))), 128))]));
	}
}), [["__scopeId", "data-v-9825385b"]]), H = { class: "music-page" }, U = { class: "music-page__head" }, W = { class: "music-page__breadcrumb" }, G = ["aria-label"], K = {
	key: 1,
	class: "music-page__crumb-nav",
	"aria-label": "Breadcrumb"
}, q = { class: "music-page__crumb-current" }, J = { class: "music-page__title" }, Y = {
	key: 0,
	class: "music-page__grid"
}, X = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, Z = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, Q = { class: "music-page__empty-text" }, $ = {
	key: 1,
	class: "music-page__grid"
}, te = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, ne = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, re = { class: "music-page__empty-text" }, ie = { key: 2 }, ae = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "MusicLibraryPage",
	setup(e) {
		let l = m("artists"), d = m(null), f = m(null), v = m(null), y = m([]), b = m([]), x = m([]), S = m(!1), { t: C } = n(), w = i(() => l.value === "artists" ? C("music.artists") : l.value === "albums" && d.value ? d.value.name : l.value === "tracks" && f.value ? f.value.title : C("music.title"));
		function T(e) {
			d.value = e, f.value = null, b.value = [], x.value = [], l.value = "albums";
		}
		function E(e) {
			f.value = e, x.value = e.tracks ?? [], l.value = "tracks";
		}
		function D(e) {
			v.value === e.id ? v.value = null : v.value = e.id;
		}
		function O() {
			l.value === "tracks" ? (l.value = "albums", f.value = null, x.value = []) : l.value === "albums" && (l.value = "artists", d.value = null, b.value = []);
		}
		return (e, n) => (p(), s("div", H, [c("header", U, [c("div", W, [l.value === "artists" ? o("", !0) : (p(), s("button", {
			key: 0,
			type: "button",
			class: "music-page__back",
			"aria-label": _(C)("player.back"),
			onClick: O
		}, [u(t, {
			name: "arrow-left",
			class: "music-page__back-icon"
		})], 8, G)), l.value === "artists" ? o("", !0) : (p(), s("nav", K, [
			c("button", {
				type: "button",
				class: "music-page__crumb",
				onClick: n[0] ||= (e) => {
					l.value = "artists", d.value = null, b.value = [];
				}
			}, g(_(C)("music.artists")), 1),
			u(t, {
				name: "chevron-right",
				class: "music-page__crumb-sep"
			}),
			c("span", q, g(w.value), 1)
		]))]), c("h1", J, g(w.value), 1)]), l.value === "artists" ? (p(), s("div", Y, [S.value ? (p(), s("div", X, [(p(), s(r, null, h(12, (e) => c("div", {
			key: e,
			class: "artist-skel"
		}, [...n[1] ||= [
			c("div", { class: "artist-skel__img" }, null, -1),
			c("div", { class: "artist-skel__name" }, null, -1),
			c("div", { class: "artist-skel__albums" }, null, -1)
		]])), 64))])) : y.value.length === 0 ? (p(), s("div", Z, [u(t, {
			name: "music",
			class: "music-page__empty-icon"
		}), c("p", Q, g(_(C)("music.noArtists")), 1)])) : (p(!0), s(r, { key: 2 }, h(y.value, (e) => (p(), a(ee, {
			key: e.id,
			artist: e,
			onClick: T
		}, null, 8, ["artist"]))), 128))])) : l.value === "albums" ? (p(), s("div", $, [S.value ? (p(), s("div", te, [(p(), s(r, null, h(8, (e) => c("div", {
			key: e,
			class: "album-skel"
		}, [...n[2] ||= [
			c("div", { class: "album-skel__cover" }, null, -1),
			c("div", { class: "album-skel__title" }, null, -1),
			c("div", { class: "album-skel__meta" }, null, -1)
		]])), 64))])) : b.value.length === 0 ? (p(), s("div", ne, [u(t, {
			name: "image",
			class: "music-page__empty-icon"
		}), c("p", re, g(_(C)("music.noAlbums")), 1)])) : (p(!0), s(r, { key: 2 }, h(b.value, (e) => (p(), a(M, {
			key: e.id,
			album: e,
			onClick: E
		}, null, 8, ["album"]))), 128))])) : l.value === "tracks" ? (p(), s("div", ie, [u(V, {
			tracks: x.value,
			"playing-track-id": v.value,
			loading: S.value,
			onPlay: D
		}, null, 8, [
			"tracks",
			"playing-track-id",
			"loading"
		])])) : o("", !0)]));
	}
}), [["__scopeId", "data-v-c1001e6c"]]);
//#endregion
export { ae as default };

//# sourceMappingURL=MusicLibraryPage-DdeWrQWv.js.map