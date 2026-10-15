import { n as e, t } from "./Icon-CIwTuFLd.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { i as r, t as i, y as a } from "./client-CRZ_SWB1.js";
import { n as ee } from "./useApiBase-CV_r-Kk4.js";
import { t as te } from "./useAuthStore-BbS6J1QF.js";
import { t as ne } from "./useImageSrc-KnN1T9Ga.js";
import { i as o } from "./usePlayerStore-D8A_gb_c.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { n as s, t as ie } from "./ThumbRating-cLiSk8V_.js";
import { t as c } from "./Tooltip-D_txjC1i.js";
import { t as l } from "./Spinner-DsNwuQoy.js";
import { t as u } from "./EmptyState-BAyOxAcK.js";
import { t as d } from "./Button-BuG0GvCa.js";
import { t as ae } from "./Combobox-DYnJWrUO.js";
import { t as f } from "./Modal-D0CvVyuE.js";
import { t as oe } from "./Menu-Dm56tG4N.js";
import { t as p } from "./mediaTypeIcon-Bde251Qi.js";
import { Fragment as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, inject as C, normalizeClass as w, normalizeStyle as T, onMounted as E, openBlock as D, ref as O, renderList as k, renderSlot as A, toDisplayString as j, unref as M, vModelText as se, watch as N, withCtx as P, withDirectives as ce, withKeys as F, withModifiers as I } from "vue";
import { RouterLink as le, routerKey as L, useRouter as R } from "vue-router";
//#region src/composables/usePrefetch.ts
function z() {
	let e = C(L, null), t = /* @__PURE__ */ new WeakSet();
	function n(n) {
		if (!e) return;
		let r;
		try {
			r = e.resolve(n).matched;
		} catch {
			return;
		}
		for (let e of r) {
			let n = e.components;
			if (n) {
				for (let e of Object.values(n)) if (!(typeof e != "function" || t.has(e))) {
					t.add(e);
					try {
						let t = e();
						t && typeof t.then == "function" && t.catch(() => {});
					} catch {}
				}
			}
		}
	}
	return { prefetch: n };
}
//#endregion
//#region src/components/media-poster.ts
var B = "(max-width: 600px) 45vw, 200px";
function V(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function H(e) {
	return Number(e.toFixed(3)).toString();
}
function U(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${H(e.density)}x` : t;
}
function W(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = U(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function ue(e, t) {
	let n = W(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : V(n) ? {
		srcset: n,
		sizes: B
	} : { srcset: n };
}
//#endregion
//#region src/components/mediaItemMenu.ts
var G = {
	addToPlaylist: "Add to playlist",
	markPlayed: "Mark played",
	markUnplayed: "Mark unplayed",
	download: "Download",
	missingEpisodes: "View missing episodes",
	shuffle: "Shuffle",
	matchMetadata: "Match metadata",
	editMetadata: "Edit metadata",
	editImages: "Edit images",
	exploreData: "Explore item data",
	remove: "Remove"
};
function de(e, t) {
	let n = G, r = [
		{ label: n.addToPlaylist },
		{ label: t.isWatched ? n.markUnplayed : n.markPlayed },
		{ label: n.download }
	];
	return t.isSeriesOrSeason && r.push({ label: n.missingEpisodes }), r.push({ label: n.shuffle }), t.isAdmin && (r.push({ label: n.matchMetadata }), r.push({ label: n.editMetadata }), t.canChoosePoster && r.push({ label: n.editImages }), r.push({ label: n.exploreData }), e.canDelete && r.push({
		label: n.remove,
		danger: !0
	})), r;
}
//#endregion
//#region src/utils/playlistPermissions.ts
function K(e, t, n) {
	return n ? !0 : t === null || e === null ? !1 : e === t;
}
//#endregion
//#region src/components/PlaylistPickerModal.vue?vue&type=script&setup=true&lang.ts
var fe = { class: "playlist-picker" }, q = {
	key: 0,
	class: "playlist-picker__target"
}, J = {
	class: "playlist-picker__tabs",
	role: "tablist",
	"aria-label": "Playlist choice"
}, pe = ["aria-selected"], Y = ["aria-selected"], X = {
	key: 1,
	class: "playlist-picker__panel"
}, Z = {
	key: 1,
	class: "playlist-picker__error",
	role: "alert"
}, me = {
	key: 2,
	class: "playlist-picker__panel"
}, he = {
	key: 0,
	class: "playlist-picker__error",
	role: "alert"
}, ge = {
	key: 1,
	class: "playlist-picker__field"
}, _e = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "PlaylistPickerModal",
	props: {
		modelValue: { type: Boolean },
		item: {},
		client: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, ne = ee(), o = re(), s = te(), ie = R();
		function c(e) {
			return K(e.created_by, s.user?.id ?? null, s.isAdmin);
		}
		let oe = h(() => ie?.hasRoute("playlists") === !0);
		function p() {
			return n.client ? n.client : new i({ baseUrl: ne.value });
		}
		let m = O("existing"), S = O([]), C = O(!1), T = O(null), E = O(null), k = O(""), A = O(!1), I = h(() => typeof n.item?.library_id == "string" && n.item.library_id.trim() !== ""), L = h(() => S.value.map((e) => ({
			value: e.id,
			label: c(e) ? e.name : `${e.name} (shared — read-only)`,
			disabled: !c(e)
		}))), z = h(() => A.value || !n.item ? !1 : m.value === "existing" ? E.value !== null : I.value && k.value.trim() !== "");
		N(() => n.modelValue, (e) => {
			e && (m.value = "existing", E.value = null, k.value = "", B());
		}, { immediate: !0 });
		async function B() {
			C.value = !0, T.value = null;
			try {
				S.value = await p().getPlaylists(), E.value = S.value.find((e) => c(e))?.id ?? null;
			} catch (e) {
				T.value = a(e, "Failed to load playlists.");
			} finally {
				C.value = !1;
			}
		}
		function V() {
			r("update:modelValue", !1);
		}
		async function H() {
			let e = n.item;
			if (!(!e || A.value)) {
				A.value = !0;
				try {
					m.value === "existing" ? await U(e, E.value) : await W(e, k.value.trim());
				} finally {
					A.value = !1;
				}
			}
		}
		async function U(e, t) {
			if (!t) return;
			let n = S.value.find((e) => e.id === t);
			if (!(!n || !c(n))) try {
				await p().addToPlaylist(t, e.id), o.success(`Added to playlist “${n.name}”`), V();
			} catch (e) {
				o.error("Failed to add to playlist", { message: a(e) });
			}
		}
		async function W(e, t) {
			if (!I.value || t === "") return;
			let n = p(), r;
			try {
				r = await n.createPlaylist(t, e.library_id);
			} catch (e) {
				o.error("Failed to create playlist", { message: a(e) });
				return;
			}
			try {
				await n.addToPlaylist(r.id, e.id), o.success(`Added to playlist “${r.name}”`), V();
			} catch (e) {
				let t = a(e);
				o.error("Playlist created, but adding the item failed.", {
					message: t,
					duration: 1e4,
					action: {
						label: "Delete empty playlist",
						onClick: () => {
							n.deletePlaylist(r.id).then(() => o.success("Empty playlist deleted")).catch((e) => o.error("Failed to delete the empty playlist.", { message: a(e) }));
						}
					}
				}), V();
			}
		}
		return (t, n) => (D(), g(f, {
			"model-value": e.modelValue,
			title: "Add to playlist",
			size: "sm",
			"onUpdate:modelValue": n[5] ||= (e) => r("update:modelValue", e),
			onClose: V
		}, {
			footer: P(() => [
				oe.value ? (D(), g(M(le), {
					key: 0,
					class: "playlist-picker__manage",
					to: { name: "playlists" },
					"data-testid": "picker-manage-playlists",
					onClick: n[4] ||= (e) => V()
				}, {
					default: P(() => [...n[7] ||= [b(" Manage playlists → ", -1)]]),
					_: 1
				})) : _("", !0),
				x(d, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: P(() => [...n[8] ||= [b("Cancel", -1)]]),
					_: 1
				}),
				x(d, {
					variant: "solid",
					size: "sm",
					disabled: !z.value,
					loading: A.value,
					onClick: H
				}, {
					default: P(() => [...n[9] ||= [b(" Add ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])
			]),
			default: P(() => [y("div", fe, [
				e.item ? (D(), v("p", q, j(e.item.name), 1)) : _("", !0),
				y("div", J, [y("button", {
					type: "button",
					role: "tab",
					class: w(["playlist-picker__tab", { "playlist-picker__tab--active": m.value === "existing" }]),
					"aria-selected": m.value === "existing",
					onClick: n[0] ||= (e) => m.value = "existing"
				}, " Existing playlist ", 10, pe), y("button", {
					type: "button",
					role: "tab",
					class: w(["playlist-picker__tab", { "playlist-picker__tab--active": m.value === "new" }]),
					"aria-selected": m.value === "new",
					onClick: n[1] ||= (e) => m.value = "new"
				}, " New playlist ", 10, Y)]),
				m.value === "existing" ? (D(), v("div", X, [C.value ? (D(), g(l, {
					key: 0,
					label: "Loading playlists…"
				})) : T.value ? (D(), v("p", Z, j(T.value), 1)) : S.value.length === 0 ? (D(), g(u, {
					key: 2,
					icon: "list",
					title: "No playlists yet",
					description: "Switch to “New playlist” to create your first one."
				})) : (D(), g(ae, {
					key: 3,
					modelValue: E.value,
					"onUpdate:modelValue": n[2] ||= (e) => E.value = e,
					options: L.value,
					label: "Playlist",
					placeholder: "Select a playlist…"
				}, null, 8, ["modelValue", "options"]))])) : (D(), v("div", me, [I.value ? (D(), v("label", ge, [n[6] ||= y("span", { class: "playlist-picker__label" }, "Playlist name", -1), ce(y("input", {
					"onUpdate:modelValue": n[3] ||= (e) => k.value = e,
					type: "text",
					class: "playlist-picker__input",
					placeholder: "My playlist",
					autocomplete: "off",
					onKeyup: F(H, ["enter"])
				}, null, 544), [[se, k.value]])])) : (D(), v("p", he, " This item has no owning library id, so a new playlist cannot be created for it. "))]))
			])]),
			_: 1
		}, 8, ["model-value"]));
	}
}), [["__scopeId", "data-v-e2d21b25"]]), ve = { class: "media-card__poster" }, ye = [
	"href",
	"aria-label",
	"onClick"
], be = { class: "visually-hidden" }, xe = ["href", "aria-label"], Se = { class: "visually-hidden" }, Ce = [
	"src",
	"srcset",
	"sizes",
	"alt",
	"loading",
	"fetchpriority"
], we = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Te = { class: "media-card__badges" }, Ee = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, De = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, Oe = ["aria-valuenow", "aria-label"], ke = { class: "media-card__overlay" }, Ae = { class: "media-card__title" }, je = { class: "media-card__meta" }, Me = {
	key: 0,
	class: "numeric"
}, Ne = {
	key: 1,
	class: "media-card__dot"
}, Pe = {
	key: 2,
	class: "media-card__cert"
}, Fe = {
	key: 3,
	class: "media-card__dot"
}, Ie = {
	key: 4,
	class: "numeric"
}, Le = {
	key: 0,
	class: "media-card__genres"
}, Re = {
	key: 1,
	class: "media-card__actions"
}, ze = ["aria-label", "aria-pressed"], Be = ["aria-label", "aria-pressed"], Ve = ["aria-expanded", "onClick"], He = {
	key: 0,
	class: "media-card__caption"
}, Ue = ["title"], We = { class: "media-card__caption-sub numeric" }, Ge = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 },
		posterSrcset: {},
		posterSizes: {},
		fetchPriority: {},
		canMatch: {
			type: Boolean,
			default: !1
		},
		hideActions: {
			type: Boolean,
			default: !1
		},
		playOnly: {
			type: Boolean,
			default: !1
		},
		subtitle: { default: null },
		hideCaption: {
			type: Boolean,
			default: !1
		},
		lazy: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"match",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove",
		"edit-metadata",
		"explore-data"
	],
	setup(e, { emit: i }) {
		let { imgSrc: a, imgSrcset: ee } = ne(), l = e, u = i, d = o(), ae = te(), f = s(), S = C("phlixConfig", null), se = C(L, null), N = h(() => f.isFavorite(l.item.id)), ce = h(() => f.likeLevel(l.item.id)), F = h(() => ae.isAdmin), R = h(() => f.isWatched(l.item.id)), B = O(!1), V = O(!1), H = h(() => l.item.type === "series" || l.item.type === "season"), U = h(() => (F.value, B.value ? de(l.item, {
			isAdmin: F.value,
			isWatched: R.value,
			isSeriesOrSeason: H.value,
			canChoosePoster: F.value
		}) : []));
		function W(e) {
			let t = G, i = re();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					q();
					break;
				case t.addToPlaylist:
					V.value = !0;
					break;
				case t.download:
					i.info("Preparing download…"), r.getDownloadUrl(l.item.id).then(({ url: e }) => {
						window.open(e, "_blank", "noopener"), i.success("Download started");
					}).catch((e) => {
						i.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					i.info("Loading…"), r.getMissingEpisodes(l.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? i.success("No missing episodes") : i.warning(`${n(t, "episode", "episodes")} missing`);
					}).catch((e) => {
						i.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					r.shufflePlay(l.item.id).then(() => i.success("Shuffle play started")).catch((e) => {
						i.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					u("edit-metadata", l.item);
					break;
				case t.exploreData:
					u("explore-data", l.item);
					break;
				case t.matchMetadata:
					u("refresh", l.item);
					break;
				case t.editImages:
					u("choose-poster", l.item);
					break;
				case t.remove:
					u("remove", l.item);
					break;
				default: i.info(`${e.label} isn't available yet`);
			}
		}
		function K(e) {
			f.setLike(l.item.id, e, S?.apiBase ?? "");
		}
		function fe() {
			f.toggleFavorite(l.item.id, S?.apiBase ?? ""), u("watchlist", l.item);
		}
		function q() {
			f.toggleWatched(l.item.id, S?.apiBase ?? ""), u("mark-watched", l.item);
		}
		let J = h(() => l.to ?? `/app/media/${l.item.id}`), { prefetch: pe } = z();
		function Y() {
			pe(J.value);
		}
		let X = O(!1), Z = O(!1), me = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, he = h(() => !l.hideActions && (X.value || Z.value || me));
		function ge() {
			X.value = !0, Y();
		}
		function Ge() {
			X.value = !1;
		}
		function Ke() {
			Z.value = !0, Y();
		}
		function qe(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			(!t || !n || !n.contains(t)) && (Z.value = !1);
		}
		let Q = O(!1), Je = O(null);
		function Ye() {
			Q.value = !0;
		}
		E(() => {
			Je.value?.complete && (Q.value = !0);
		});
		let Xe = h(() => ue(l.posterSrcset ?? l.item.poster_srcset, l.posterSizes)), Ze = h(() => {
			let e = l.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= l.newWithinDays * 24 * 60 * 60 * 1e3;
		}), $ = h(() => {
			let e = d.resumePositionFor(l.item.id), t = l.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), Qe = h(() => l.item.genres?.slice(0, 3) ?? []);
		return (n, i) => (D(), v("article", {
			class: "media-card",
			onPointerenter: ge,
			onPointerleave: Ge,
			onFocusin: Ke,
			onFocusout: qe
		}, [
			y("div", ve, [
				M(se) ? (D(), g(M(le), {
					key: 0,
					to: J.value,
					custom: ""
				}, {
					default: P(({ navigate: t }) => [y("a", {
						href: J.value,
						class: "media-card__link",
						"aria-label": e.item.name,
						onClick: t
					}, [y("span", be, j(e.item.name), 1)], 8, ye)]),
					_: 1
				}, 8, ["to"])) : (D(), v("a", {
					key: 1,
					href: J.value,
					class: "media-card__link",
					"aria-label": e.item.name
				}, [y("span", Se, j(e.item.name), 1)], 8, xe)),
				e.item.poster_url ? (D(), v("img", {
					key: 2,
					ref_key: "imgEl",
					ref: Je,
					class: w(["media-card__img", { "is-loaded": Q.value }]),
					src: M(a)(e.item.poster_url),
					srcset: M(ee)(Xe.value.srcset),
					sizes: Xe.value.sizes,
					alt: e.item.name,
					loading: e.lazy ? "lazy" : void 0,
					decoding: "async",
					fetchpriority: e.fetchPriority,
					onLoad: Ye
				}, null, 42, Ce)) : (D(), v("div", we, [x(t, { name: M(p)(e.item.type) }, null, 8, ["name"])])),
				y("div", Te, [
					Ze.value ? (D(), v("span", Ee, "New")) : _("", !0),
					A(n.$slots, "badges", { item: e.item }, void 0, !0),
					e.quality ? (D(), v("span", De, j(e.quality), 1)) : _("", !0)
				]),
				$.value > 0 ? (D(), v("div", {
					key: 4,
					class: "media-card__progress",
					role: "progressbar",
					"aria-valuenow": Math.round($.value * 100),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-label": `Resume ${e.item.name}`
				}, [y("i", { style: T({ width: `${$.value * 100}%` }) }, null, 4)], 8, Oe)) : _("", !0),
				y("div", ke, [e.hideCaption ? _("", !0) : (D(), v(m, { key: 0 }, [
					y("h3", Ae, j(e.item.name), 1),
					y("div", je, [
						e.item.year ? (D(), v("span", Me, j(e.item.year), 1)) : _("", !0),
						e.item.year && (e.item.rating || e.item.runtime) ? (D(), v("span", Ne)) : _("", !0),
						e.item.rating ? (D(), v("span", Pe, j(e.item.rating), 1)) : _("", !0),
						e.item.rating && e.item.runtime ? (D(), v("span", Fe)) : _("", !0),
						e.item.runtime ? (D(), v("span", Ie, j(e.item.runtime) + "m", 1)) : _("", !0)
					]),
					Qe.value.length ? (D(), v("div", Le, [(D(!0), v(m, null, k(Qe.value, (e) => (D(), v("span", { key: e }, j(e), 1))), 128))])) : _("", !0)
				], 64)), he.value ? (D(), v("div", Re, [x(c, { text: "Play" }, {
					default: P(() => [y("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: i[0] ||= I((t) => u("play", e.item), ["stop", "prevent"])
					}, [x(t, { name: "play" })])]),
					_: 1
				}), e.playOnly ? _("", !0) : (D(), v(m, { key: 0 }, [
					x(ie, {
						level: ce.value,
						onCycle: K,
						onClick: i[1] ||= I(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					x(c, { text: N.value ? "Remove from favorites" : "Add to favorites" }, {
						default: P(() => [y("button", {
							type: "button",
							class: w(["media-card__iconbtn", { "is-active": N.value }]),
							"aria-label": N.value ? "Remove from favorites" : "Add to favorites",
							"aria-pressed": N.value ? "true" : "false",
							onClick: I(fe, ["stop", "prevent"])
						}, [x(t, { name: N.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ze)]),
						_: 1
					}, 8, ["text"]),
					x(c, { text: R.value ? "Mark as unwatched" : "Mark as watched" }, {
						default: P(() => [y("button", {
							type: "button",
							class: w(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": R.value }]),
							"aria-label": R.value ? "Mark as unwatched" : "Mark as watched",
							"aria-pressed": R.value ? "true" : "false",
							onClick: I(q, ["stop", "prevent"])
						}, [x(t, { name: R.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Be)]),
						_: 1
					}, 8, ["text"]),
					x(c, { text: "More info" }, {
						default: P(() => [y("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More info",
							onClick: i[2] ||= I((t) => u("info", e.item), ["stop", "prevent"])
						}, [x(t, { name: "info" })])]),
						_: 1
					}),
					x(oe, {
						open: B.value,
						"onUpdate:open": i[3] ||= (e) => B.value = e,
						items: U.value,
						onSelect: W
					}, {
						default: P(({ toggle: e }) => [x(c, { text: "More actions" }, {
							default: P(() => [y("button", {
								type: "button",
								class: "media-card__iconbtn",
								"aria-label": "More actions",
								"aria-expanded": B.value ? "true" : "false",
								"aria-haspopup": "menu",
								onClick: I(e, ["stop", "prevent"])
							}, [x(t, { name: "more" })], 8, Ve)]),
							_: 2
						}, 1024)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (D(), g(c, {
						key: 0,
						text: "Match metadata"
					}, {
						default: P(() => [y("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "Match metadata",
							onClick: i[4] ||= I((t) => u("match", e.item), ["stop", "prevent"])
						}, [x(t, { name: "search" })])]),
						_: 1
					})) : _("", !0),
					A(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : _("", !0)])
			]),
			e.hideCaption ? _("", !0) : (D(), v("div", He, [y("div", {
				class: "media-card__caption-title",
				title: e.item.name
			}, j(e.item.name), 9, Ue), y("div", We, [e.subtitle == null ? (D(), v(m, { key: 1 }, [
				e.item.year ? (D(), v(m, { key: 0 }, [b(j(e.item.year), 1)], 64)) : _("", !0),
				e.item.year && e.item.runtime ? (D(), v(m, { key: 1 }, [b(" · ")], 64)) : _("", !0),
				e.item.runtime ? (D(), v(m, { key: 2 }, [b(j(e.item.runtime) + "m", 1)], 64)) : _("", !0)
			], 64)) : (D(), v(m, { key: 0 }, [b(j(e.subtitle), 1)], 64))])])),
			V.value ? (D(), g(_e, {
				key: 1,
				"model-value": !0,
				item: e.item,
				client: M(r),
				"onUpdate:modelValue": i[5] ||= (e) => V.value = !1
			}, null, 8, ["item", "client"])) : _("", !0)
		], 32));
	}
}), [["__scopeId", "data-v-471b0f13"]]);
//#endregion
export { de as a, G as i, _e as n, z as o, K as r, Ge as t };

//# sourceMappingURL=MediaCard-WWns5SxY.js.map