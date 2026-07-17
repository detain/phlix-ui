import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { a as n } from "./usePreferencesStore-C9GLbD7G.js";
import { t as r } from "./useMessages-Cbrqh0Aa.js";
import { t as i } from "./client-D1nDQ0cP.js";
import { n as a, r as o } from "./useApiBase-CV_r-Kk4.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, normalizeClass as g, onMounted as _, onUnmounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C } from "vue";
//#region src/composables/useMusicPlayer.ts
var w = 20;
function T(e) {
	let t = n(), r = b(null), a = b(null), o = 0, s = /* @__PURE__ */ new WeakMap();
	function l(e, t) {
		e.src = t, e.load(), s.set(e, t);
	}
	function u(e, t) {
		return s.get(e) === t;
	}
	function d() {
		let e = new Audio();
		return e.preload = "none", e.addEventListener("timeupdate", () => N(e)), e.addEventListener("loadedmetadata", () => P(e)), e.addEventListener("ended", () => F(e)), e;
	}
	function f() {
		return r.value ||= d(), r.value;
	}
	function p() {
		return a.value ||= d(), a.value;
	}
	function m() {
		return o === 0 ? f() : p();
	}
	function h() {
		return o === 0 ? p() : f();
	}
	function g() {
		o = +(o === 0);
	}
	let _ = b([]), v = b(null), y = b(-1), x = b(!1), S = b(0), C = b(0), T = b(!1), E = b(null), D = b(!1), O = c(() => y.value >= 0 && y.value < _.value.length - 1), k = c(() => y.value > 0), A = null;
	function j() {
		A !== null && (clearInterval(A), A = null), D.value = !1;
	}
	async function M(t) {
		let n = t.streamUrl;
		if (!n) try {
			n = (await new i({ baseUrl: e.apiBase() }).getTrack(t.id)).streamUrl;
		} catch {
			n = null;
		}
		return n ? /^https?:\/\//.test(n) ? n : `${e.streamBase()}${n}` : "";
	}
	function N(e) {
		if (D.value) {
			e === h() && (S.value = e.currentTime, isFinite(e.duration) && e.duration > 0 && (C.value = e.duration));
			return;
		}
		if (e === m() && (S.value = e.currentTime, t.crossfadeDuration > 0 && O.value && isFinite(e.duration) && e.duration > 0)) {
			let n = e.duration - e.currentTime;
			n > 0 && n <= t.crossfadeDuration && z();
		}
	}
	function P(e) {
		e === m() && isFinite(e.duration) && (C.value = e.duration);
	}
	function F(e) {
		e === m() && (D.value || (O.value ? L(y.value + 1) : x.value = !1));
	}
	async function I(e) {
		let t = _.value[e];
		if (!t) return;
		j();
		let n = m();
		T.value = !0;
		let r = await M(t);
		E.value = r === "" ? "stream-unavailable" : null, l(n, r), n.volume = 1, v.value = t, y.value = e, S.value = 0, C.value = 0, await n.play().catch(() => {}), x.value = !0, T.value = !1, V();
	}
	async function L(e) {
		t.crossfadeDuration > 0 ? await B(e) : await R(e);
	}
	async function R(e) {
		let t = _.value[e];
		if (!t) return;
		j(), T.value = !0;
		let n = await M(t);
		E.value = n === "" ? "stream-unavailable" : null;
		let r = h(), i = m();
		u(r, n) || l(r, n), r.volume = 1, i.pause(), i.currentTime = 0, g(), v.value = t, y.value = e, S.value = 0, C.value = isFinite(r.duration) && r.duration > 0 ? r.duration : 0, await r.play().catch(() => {}), x.value = !0, T.value = !1, V();
	}
	async function z() {
		O.value && await B(y.value + 1);
	}
	async function B(e) {
		let n = _.value[e];
		if (!n || D.value) return;
		A !== null && (clearInterval(A), A = null), D.value = !0;
		let r = m(), i = h();
		T.value = !0;
		let a = await M(n);
		u(i, a) || l(i, a), E.value = a === "" ? "stream-unavailable" : null, i.volume = 0, await i.play().catch(() => {}), T.value = !1, v.value = n, y.value = e, S.value = 0, C.value = isFinite(i.duration) && i.duration > 0 ? i.duration : 0, x.value = !0;
		let o = t.crossfadeDuration, s = Math.max(10, o * 1e3 / w), c = 0;
		A = setInterval(() => {
			c += 1;
			let e = Math.min(1, c / w);
			r.volume = Math.max(0, 1 - e), i.volume = Math.min(1, e), c >= w && (clearInterval(A), A = null, r.pause(), r.currentTime = 0, r.volume = 1, g(), D.value = !1, isFinite(m().duration) && m().duration > 0 && (C.value = m().duration), V());
		}, s);
	}
	async function V() {
		if (!t.gaplessEnabled || !O.value) return;
		let e = _.value[y.value + 1];
		if (!e) return;
		let n = await M(e);
		if (n === "") return;
		let r = h();
		r.preload = "auto", l(r, n);
	}
	function H(e) {
		j(), _.value = [...e], v.value = null, y.value = -1, x.value = !1, S.value = 0, C.value = 0, E.value = null;
	}
	async function U(e) {
		if (e) {
			let t = _.value.findIndex((t) => t.id === e.id);
			if (t === -1) return;
			if (v.value?.id === e.id) {
				await m().play().catch(() => {}), x.value = !0;
				return;
			}
			await I(t);
			return;
		}
		if (v.value) {
			await m().play().catch(() => {}), x.value = !0;
			return;
		}
		_.value.length > 0 && await I(0);
	}
	function W() {
		m().pause(), x.value = !1;
	}
	async function G() {
		x.value ? W() : await U();
	}
	function K() {
		j(), f().pause(), p().pause(), f().src = "", p().src = "", s.set(f(), ""), s.set(p(), ""), x.value = !1, S.value = 0, C.value = 0, v.value = null, y.value = -1;
	}
	async function q() {
		O.value && await L(y.value + 1);
	}
	async function J() {
		k.value && await I(y.value - 1);
	}
	function Y(e) {
		isFinite(e) && e >= 0 && (m().currentTime = e, S.value = e);
	}
	function X() {
		j(), r.value && (r.value.pause(), r.value.src = "", s.set(r.value, "")), a.value && (a.value.pause(), a.value.src = "", s.set(a.value, ""));
	}
	return {
		queue: _,
		currentTrack: v,
		currentIndex: y,
		playing: x,
		position: S,
		duration: C,
		loading: T,
		error: E,
		crossfading: D,
		hasNext: O,
		hasPrev: k,
		loadTracks: H,
		play: U,
		pause: W,
		toggle: G,
		stop: K,
		next: q,
		previous: J,
		seek: Y,
		dispose: X
	};
}
//#endregion
//#region src/components/MusicArtistCard.vue?vue&type=script&setup=true&lang.ts
var E = { class: "artist-card__image-wrap" }, D = ["src", "alt"], O = {
	key: 1,
	class: "artist-card__placeholder"
}, k = { class: "artist-card__info" }, A = { class: "artist-card__name" }, j = {
	key: 0,
	class: "artist-card__albums"
}, M = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "MusicArtistCard",
	props: { artist: {} },
	emits: ["click"],
	setup(e) {
		return (n, r) => (y(), d("button", {
			type: "button",
			class: "artist-card",
			onClick: r[0] ||= (t) => n.$emit("click", e.artist)
		}, [f("div", E, [e.artist.imageUrl ? (y(), d("img", {
			key: 0,
			src: e.artist.imageUrl,
			alt: e.artist.name,
			class: "artist-card__image",
			loading: "lazy"
		}, null, 8, D)) : (y(), d("div", O, [m(t, {
			name: "music",
			class: "artist-card__placeholder-icon"
		})]))]), f("div", k, [f("span", A, S(e.artist.name), 1), e.artist.albumCount === void 0 ? u("", !0) : (y(), d("span", j, S(e.artist.albumCount) + " album" + S(e.artist.albumCount === 1 ? "" : "s"), 1))])]));
	}
}), [["__scopeId", "data-v-ff95deef"]]), N = { class: "album-card__cover-wrap" }, P = ["src", "alt"], F = {
	key: 1,
	class: "album-card__placeholder"
}, I = { class: "album-card__info" }, L = { class: "album-card__title" }, R = { class: "album-card__meta" }, z = { class: "album-card__year" }, B = { class: "album-card__tracks" }, V = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "MusicAlbumCard",
	props: { album: {} },
	emits: ["click"],
	setup(e) {
		function n(e) {
			return e ? String(e) : "—";
		}
		return (r, i) => (y(), d("button", {
			type: "button",
			class: "album-card",
			onClick: i[0] ||= (t) => r.$emit("click", e.album)
		}, [f("div", N, [e.album.albumArtUrl ? (y(), d("img", {
			key: 0,
			src: e.album.albumArtUrl,
			alt: e.album.title,
			class: "album-card__cover",
			loading: "lazy"
		}, null, 8, P)) : (y(), d("div", F, [m(t, {
			name: "image",
			class: "album-card__placeholder-icon"
		})]))]), f("div", I, [f("span", L, S(e.album.title), 1), f("span", R, [
			f("span", z, S(n(e.album.year)), 1),
			i[1] ||= f("span", {
				class: "album-card__dot",
				"aria-hidden": "true"
			}, "·", -1),
			f("span", B, S(e.album.totalTracks) + " track" + S(e.album.totalTracks === 1 ? "" : "s"), 1)
		])])]));
	}
}), [["__scopeId", "data-v-57d859b4"]]), H = {
	class: "track-list",
	role: "list"
}, U = {
	key: 0,
	class: "track-list__loading"
}, W = {
	key: 1,
	class: "track-list__empty",
	role: "status"
}, G = { class: "track-list__empty-text" }, K = ["aria-label", "onClick"], q = { class: "track-row__num" }, J = { class: "track-row__title" }, Y = { class: "track-row__duration" }, X = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "MusicTrackList",
	props: {
		tracks: {},
		playingTrackId: {},
		loading: { type: Boolean }
	},
	emits: ["play"],
	setup(e, { emit: n }) {
		let i = n, { t: a } = r();
		function o(e) {
			return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
		}
		return (n, r) => (y(), d("div", H, [e.loading && e.tracks.length === 0 ? (y(), d("div", U, [(y(), d(s, null, x(8, (e) => f("div", {
			key: e,
			class: "track-skel",
			role: "listitem"
		}, [...r[0] ||= [
			f("div", { class: "track-skel__num" }, null, -1),
			f("div", { class: "track-skel__title" }, null, -1),
			f("div", { class: "track-skel__duration" }, null, -1)
		]])), 64))])) : e.tracks.length === 0 ? (y(), d("div", W, [m(t, {
			name: "music",
			class: "track-list__empty-icon"
		}), f("p", G, S(C(a)("music.noTracks")), 1)])) : (y(!0), d(s, { key: 2 }, x(e.tracks, (n) => (y(), d("div", {
			key: n.id,
			class: g(["track-row", { "is-playing": e.playingTrackId === n.id }]),
			role: "listitem"
		}, [
			f("button", {
				type: "button",
				class: "track-row__play",
				"aria-label": e.playingTrackId === n.id ? C(a)("music.pause") : C(a)("music.play"),
				onClick: (e) => i("play", n)
			}, [m(t, {
				name: e.playingTrackId === n.id ? "pause" : "play",
				class: "track-row__play-icon"
			}, null, 8, ["name"])], 8, K),
			f("span", q, [e.playingTrackId !== n.id && n.trackNumber !== null ? (y(), d(s, { key: 0 }, [p(S(n.trackNumber), 1)], 64)) : u("", !0)]),
			f("span", J, S(n.title), 1),
			f("span", Y, S(o(n.durationSecs)), 1)
		], 2))), 128))]));
	}
}), [["__scopeId", "data-v-780a05e1"]]), ee = { class: "music-page" }, Z = { class: "music-page__head" }, Q = { class: "music-page__breadcrumb" }, te = ["aria-label"], ne = {
	key: 1,
	class: "music-page__crumb-nav",
	"aria-label": "Breadcrumb"
}, re = { class: "music-page__crumb-current" }, ie = { class: "music-page__title" }, ae = {
	key: 0,
	class: "music-page__grid"
}, oe = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, se = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, ce = { class: "music-page__empty-text" }, le = {
	key: 1,
	class: "music-page__grid"
}, ue = {
	key: 0,
	class: "music-page__loading",
	role: "status",
	"aria-busy": "true"
}, de = {
	key: 1,
	class: "music-page__empty",
	role: "status"
}, fe = { class: "music-page__empty-text" }, pe = { key: 2 }, me = ["aria-label"], he = { class: "music-bar__meta" }, ge = { class: "music-bar__title" }, _e = {
	key: 0,
	class: "music-bar__error",
	role: "alert"
}, ve = {
	key: 1,
	class: "music-bar__status",
	role: "status",
	"aria-live": "polite"
}, ye = { class: "music-bar__controls" }, be = ["disabled", "aria-label"], xe = ["aria-label"], Se = ["disabled", "aria-label"], $ = { class: "music-bar__progress" }, Ce = { class: "music-bar__time" }, we = [
	"max",
	"value",
	"aria-label"
], Te = { class: "music-bar__time" }, Ee = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "MusicLibraryPage",
	setup(e) {
		let n = b("artists"), p = b(null), h = b(null), g = b([]), w = b([]), E = b([]), D = b(!1), { t: O } = r(), k = a(), A = o(), j = T({
			apiBase: () => k.value,
			streamBase: () => A.value || k.value
		});
		v(() => j.dispose());
		let N = c(() => j.playing.value ? j.currentTrack.value?.id ?? null : null);
		function P() {
			return new i({ baseUrl: k.value });
		}
		_(async () => {
			D.value = !0;
			try {
				g.value = await P().listArtists();
			} catch {
				g.value = [];
			} finally {
				D.value = !1;
			}
		});
		let F = c(() => n.value === "artists" ? O("music.artists") : n.value === "albums" && p.value ? p.value.name : n.value === "tracks" && h.value ? h.value.title : O("music.title"));
		async function I(e) {
			p.value = e, h.value = null, w.value = [], E.value = [], n.value = "albums", D.value = !0;
			try {
				w.value = await P().listAlbums(e.name);
			} catch {
				w.value = [];
			} finally {
				D.value = !1;
			}
		}
		async function L(e) {
			h.value = e, n.value = "tracks";
			let t = e.tracks ?? [];
			if (t.length > 0) {
				E.value = t;
				return;
			}
			E.value = [], D.value = !0;
			try {
				E.value = await P().listTracks(e.title);
			} catch {
				E.value = [];
			} finally {
				D.value = !1;
			}
		}
		function R(e) {
			if (j.currentTrack.value?.id === e.id && j.playing.value) {
				j.pause();
				return;
			}
			if (j.currentTrack.value?.id === e.id) {
				j.play();
				return;
			}
			j.loadTracks(E.value), j.play(e);
		}
		function z(e) {
			return !isFinite(e) || e < 0 ? "0:00" : `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
		}
		function B(e) {
			let t = Number(e.target.value);
			j.seek(t);
		}
		function H() {
			n.value === "tracks" ? (n.value = "albums", h.value = null, E.value = []) : n.value === "albums" && (n.value = "artists", p.value = null, w.value = []);
		}
		return (e, r) => (y(), d("div", ee, [
			f("header", Z, [f("div", Q, [n.value === "artists" ? u("", !0) : (y(), d("button", {
				key: 0,
				type: "button",
				class: "music-page__back",
				"aria-label": C(O)("player.back"),
				onClick: H
			}, [m(t, {
				name: "arrow-left",
				class: "music-page__back-icon"
			})], 8, te)), n.value === "artists" ? u("", !0) : (y(), d("nav", ne, [
				f("button", {
					type: "button",
					class: "music-page__crumb",
					onClick: r[0] ||= (e) => {
						n.value = "artists", p.value = null, w.value = [];
					}
				}, S(C(O)("music.artists")), 1),
				m(t, {
					name: "chevron-right",
					class: "music-page__crumb-sep"
				}),
				f("span", re, S(F.value), 1)
			]))]), f("h1", ie, S(F.value), 1)]),
			n.value === "artists" ? (y(), d("div", ae, [D.value ? (y(), d("div", oe, [(y(), d(s, null, x(12, (e) => f("div", {
				key: e,
				class: "artist-skel"
			}, [...r[4] ||= [
				f("div", { class: "artist-skel__img" }, null, -1),
				f("div", { class: "artist-skel__name" }, null, -1),
				f("div", { class: "artist-skel__albums" }, null, -1)
			]])), 64))])) : g.value.length === 0 ? (y(), d("div", se, [m(t, {
				name: "music",
				class: "music-page__empty-icon"
			}), f("p", ce, S(C(O)("music.noArtists")), 1)])) : (y(!0), d(s, { key: 2 }, x(g.value, (e) => (y(), l(M, {
				key: e.id,
				artist: e,
				onClick: I
			}, null, 8, ["artist"]))), 128))])) : n.value === "albums" ? (y(), d("div", le, [D.value ? (y(), d("div", ue, [(y(), d(s, null, x(8, (e) => f("div", {
				key: e,
				class: "album-skel"
			}, [...r[5] ||= [
				f("div", { class: "album-skel__cover" }, null, -1),
				f("div", { class: "album-skel__title" }, null, -1),
				f("div", { class: "album-skel__meta" }, null, -1)
			]])), 64))])) : w.value.length === 0 ? (y(), d("div", de, [m(t, {
				name: "image",
				class: "music-page__empty-icon"
			}), f("p", fe, S(C(O)("music.noAlbums")), 1)])) : (y(!0), d(s, { key: 2 }, x(w.value, (e) => (y(), l(V, {
				key: e.id,
				album: e,
				onClick: L
			}, null, 8, ["album"]))), 128))])) : n.value === "tracks" ? (y(), d("div", pe, [m(X, {
				tracks: E.value,
				"playing-track-id": N.value,
				loading: D.value,
				onPlay: R
			}, null, 8, [
				"tracks",
				"playing-track-id",
				"loading"
			])])) : u("", !0),
			C(j).currentTrack.value ? (y(), d("footer", {
				key: 3,
				class: "music-bar",
				role: "region",
				"aria-label": C(O)("music.nowPlaying")
			}, [
				f("div", he, [f("span", ge, S(C(j).currentTrack.value.title), 1), C(j).error.value ? (y(), d("span", _e, S(C(O)("music.streamError")), 1)) : C(j).loading.value ? (y(), d("span", ve, S(C(O)("music.loading")), 1)) : u("", !0)]),
				f("div", ye, [
					f("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !C(j).hasPrev.value,
						"aria-label": C(O)("music.previous"),
						onClick: r[1] ||= (e) => C(j).previous()
					}, [m(t, {
						name: "skip-back",
						class: "music-bar__icon"
					})], 8, be),
					f("button", {
						type: "button",
						class: "music-bar__btn music-bar__btn--primary",
						"aria-label": C(j).playing.value ? C(O)("music.pause") : C(O)("music.play"),
						onClick: r[2] ||= (e) => C(j).toggle()
					}, [m(t, {
						name: C(j).playing.value ? "pause" : "play",
						class: "music-bar__icon"
					}, null, 8, ["name"])], 8, xe),
					f("button", {
						type: "button",
						class: "music-bar__btn",
						disabled: !C(j).hasNext.value,
						"aria-label": C(O)("music.next"),
						onClick: r[3] ||= (e) => C(j).next()
					}, [m(t, {
						name: "skip-forward",
						class: "music-bar__icon"
					})], 8, Se)
				]),
				f("div", $, [
					f("span", Ce, S(z(C(j).position.value)), 1),
					f("input", {
						type: "range",
						class: "music-bar__seek",
						min: "0",
						max: C(j).duration.value || 0,
						value: C(j).position.value,
						"aria-label": C(O)("music.seek"),
						onInput: B
					}, null, 40, we),
					f("span", Te, S(z(C(j).duration.value)), 1)
				])
			], 8, me)) : u("", !0)
		]));
	}
}), [["__scopeId", "data-v-d7af33de"]]);
//#endregion
export { Ee as default };

//# sourceMappingURL=MusicLibraryPage-7OtOwI2f.js.map