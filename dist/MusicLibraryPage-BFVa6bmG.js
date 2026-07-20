import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./useMessages-CMPz9FmM.js";
import { t as r } from "./client-D80As4Gx.js";
import { n as ee, r as te } from "./useApiBase-CV_r-Kk4.js";
import { n as i, r as ne, t as re } from "./MusicAlbumCard-yEBlezXn.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createVNode as d, defineComponent as f, onMounted as ie, onUnmounted as ae, openBlock as p, ref as m, renderList as h, toDisplayString as g, unref as _ } from "vue";
//#region src/components/MusicArtistCard.vue?vue&type=script&setup=true&lang.ts
var v = { class: "artist-card__image-wrap" }, y = ["src", "alt"], b = {
	key: 1,
	class: "artist-card__placeholder"
}, x = { class: "artist-card__info" }, S = { class: "artist-card__name" }, C = {
	key: 0,
	class: "artist-card__albums"
}, w = /*#__PURE__*/ e(/* @__PURE__ */ f({
	__name: "MusicArtistCard",
	props: { artist: {} },
	emits: ["click"],
	setup(e) {
		return (n, r) => (p(), l("button", {
			type: "button",
			class: "artist-card",
			onClick: r[0] ||= (t) => n.$emit("click", e.artist)
		}, [u("div", v, [e.artist.imageUrl ? (p(), l("img", {
			key: 0,
			src: e.artist.imageUrl,
			alt: e.artist.name,
			class: "artist-card__image",
			loading: "lazy"
		}, null, 8, y)) : (p(), l("div", b, [d(t, {
			name: "music",
			class: "artist-card__placeholder-icon"
		})]))]), u("div", x, [u("span", S, g(e.artist.name), 1), e.artist.albumCount === void 0 ? c("", !0) : (p(), l("span", C, g(e.artist.albumCount) + " album" + g(e.artist.albumCount === 1 ? "" : "s"), 1))])]));
	}
}), [["__scopeId", "data-v-ff95deef"]]), T = { class: "music-page" }, E = { class: "music-page__head" }, D = { class: "music-page__breadcrumb" }, O = ["aria-label"], k = {
	key: 1,
	class: "music-page__crumb-nav",
	"aria-label": "Breadcrumb"
}, A = { class: "music-page__crumb-current" }, j = { class: "music-page__title" }, M = {
	key: 0,
	class: "music-page__grid"
}, N = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, P = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, F = { class: "music-page__empty-text" }, I = {
	key: 1,
	class: "music-page__grid"
}, L = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, R = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, z = { class: "music-page__empty-text" }, B = { key: 2 }, V = ["aria-label"], H = { class: "music-bar__meta" }, U = { class: "music-bar__title" }, oe = {
	key: 0,
	class: "music-bar__error",
	role: "alert"
}, W = {
	key: 1,
	class: "music-bar__status",
	role: "status",
	"aria-live": "polite"
}, G = { class: "music-bar__controls" }, K = ["disabled", "aria-label"], q = ["aria-label"], se = ["disabled", "aria-label"], ce = { class: "music-bar__progress" }, le = { class: "music-bar__time" }, ue = [
	"max",
	"value",
	"aria-label"
], de = { class: "music-bar__time" }, J = /*#__PURE__*/ e(/* @__PURE__ */ f({
	__name: "MusicLibraryPage",
	setup(e) {
		let f = m("artists"), v = m(null), y = m(null), b = m([]), x = m([]), S = m([]), C = m(!1), { t: J } = n(), Y = ee(), fe = te(), X = ne({
			apiBase: () => Y.value,
			streamBase: () => fe.value || Y.value
		});
		ae(() => X.dispose());
		let pe = o(() => X.playing.value ? X.currentTrack.value?.id ?? null : null);
		function Z() {
			return new r({ baseUrl: Y.value });
		}
		ie(async () => {
			C.value = !0;
			try {
				b.value = await Z().listArtists();
			} catch {
				b.value = [];
			} finally {
				C.value = !1;
			}
		});
		let Q = o(() => f.value === "artists" ? J("music.artists") : f.value === "albums" && v.value ? v.value.name : f.value === "tracks" && y.value ? y.value.title : J("music.title"));
		async function me(e) {
			v.value = e, y.value = null, x.value = [], S.value = [], f.value = "albums", C.value = !0;
			try {
				x.value = await Z().listAlbums(e.name);
			} catch {
				x.value = [];
			} finally {
				C.value = !1;
			}
		}
		async function he(e) {
			y.value = e, f.value = "tracks";
			let t = e.tracks ?? [];
			if (t.length > 0) {
				S.value = t;
				return;
			}
			S.value = [], C.value = !0;
			try {
				S.value = await Z().listTracks(e.title);
			} catch {
				S.value = [];
			} finally {
				C.value = !1;
			}
		}
		function ge(e) {
			if (X.currentTrack.value?.id === e.id && X.playing.value) {
				X.pause();
				return;
			}
			if (X.currentTrack.value?.id === e.id) {
				X.play();
				return;
			}
			X.loadTracks(S.value), X.play(e);
		}
		function $(e) {
			return !isFinite(e) || e < 0 ? "0:00" : `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
		}
		function _e(e) {
			let t = Number(e.target.value);
			X.seek(t);
		}
		function ve() {
			f.value === "tracks" ? (f.value = "albums", y.value = null, S.value = []) : f.value === "albums" && (f.value = "artists", v.value = null, x.value = []);
		}
		return (e, n) => (p(), l("div", T, [
			u("header", E, [u("div", D, [f.value === "artists" ? c("", !0) : (p(), l("button", {
				key: 0,
				type: "button",
				class: "music-page__back",
				"aria-label": _(J)("player.back"),
				onClick: ve
			}, [d(t, {
				name: "arrow-left",
				class: "music-page__back-icon"
			})], 8, O)), f.value === "artists" ? c("", !0) : (p(), l("nav", k, [
				u("button", {
					type: "button",
					class: "music-page__crumb",
					onClick: n[0] ||= (e) => {
						f.value = "artists", v.value = null, x.value = [];
					}
				}, g(_(J)("music.artists")), 1),
				d(t, {
					name: "chevron-right",
					class: "music-page__crumb-sep"
				}),
				u("span", A, g(Q.value), 1)
			]))]), u("h1", j, g(Q.value), 1)]),
			f.value === "artists" ? (p(), l("div", M, [C.value ? (p(), l("div", N, [(p(), l(a, null, h(12, (e) => u("div", {
				key: e,
				class: "artist-skel"
			}, [...n[4] ||= [
				u("div", { class: "artist-skel__img" }, null, -1),
				u("div", { class: "artist-skel__name" }, null, -1),
				u("div", { class: "artist-skel__albums" }, null, -1)
			]])), 64))])) : b.value.length === 0 ? (p(), l("div", P, [d(t, {
				name: "music",
				class: "music-page__empty-icon"
			}), u("p", F, g(_(J)("music.noArtists")), 1)])) : (p(!0), l(a, { key: 2 }, h(b.value, (e) => (p(), s(w, {
				key: e.id,
				artist: e,
				onClick: me
			}, null, 8, ["artist"]))), 128))])) : f.value === "albums" ? (p(), l("div", I, [C.value ? (p(), l("div", L, [(p(), l(a, null, h(8, (e) => u("div", {
				key: e,
				class: "album-skel"
			}, [...n[5] ||= [
				u("div", { class: "album-skel__cover" }, null, -1),
				u("div", { class: "album-skel__title" }, null, -1),
				u("div", { class: "album-skel__meta" }, null, -1)
			]])), 64))])) : x.value.length === 0 ? (p(), l("div", R, [d(t, {
				name: "image",
				class: "music-page__empty-icon"
			}), u("p", z, g(_(J)("music.noAlbums")), 1)])) : (p(!0), l(a, { key: 2 }, h(x.value, (e) => (p(), s(re, {
				key: e.id,
				album: e,
				onClick: he
			}, null, 8, ["album"]))), 128))])) : f.value === "tracks" ? (p(), l("div", B, [d(i, {
				tracks: S.value,
				"playing-track-id": pe.value,
				loading: C.value,
				onPlay: ge
			}, null, 8, [
				"tracks",
				"playing-track-id",
				"loading"
			])])) : c("", !0),
			_(X).currentTrack.value ? (p(), l("footer", {
				key: 3,
				class: "music-bar",
				role: "region",
				"aria-label": _(J)("music.nowPlaying")
			}, [
				u("div", H, [u("span", U, g(_(X).currentTrack.value.title), 1), _(X).error.value ? (p(), l("span", oe, g(_(J)("music.streamError")), 1)) : _(X).loading.value ? (p(), l("span", W, g(_(J)("music.loading")), 1)) : c("", !0)]),
				u("div", G, [
					u("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !_(X).hasPrev.value,
						"aria-label": _(J)("music.previous"),
						onClick: n[1] ||= (e) => _(X).previous()
					}, [d(t, {
						name: "skip-back",
						class: "music-bar__icon"
					})], 8, K),
					u("button", {
						type: "button",
						class: "music-bar__btn music-bar__btn--primary",
						"aria-label": _(X).playing.value ? _(J)("music.pause") : _(J)("music.play"),
						onClick: n[2] ||= (e) => _(X).toggle()
					}, [d(t, {
						name: _(X).playing.value ? "pause" : "play",
						class: "music-bar__icon"
					}, null, 8, ["name"])], 8, q),
					u("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !_(X).hasNext.value,
						"aria-label": _(J)("music.next"),
						onClick: n[3] ||= (e) => _(X).next()
					}, [d(t, {
						name: "skip-forward",
						class: "music-bar__icon"
					})], 8, se)
				]),
				u("div", ce, [
					u("span", le, g($(_(X).position.value)), 1),
					u("input", {
						type: "range",
						class: "music-bar__seek",
						min: "0",
						max: _(X).duration.value || 0,
						value: _(X).position.value,
						"aria-label": _(J)("music.seek"),
						onInput: _e
					}, null, 40, ue),
					u("span", de, g($(_(X).duration.value)), 1)
				])
			], 8, V)) : c("", !0)
		]));
	}
}), [["__scopeId", "data-v-d7af33de"]]);
//#endregion
export { J as default };

//# sourceMappingURL=MusicLibraryPage-BFVa6bmG.js.map