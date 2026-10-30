import { n as e, t } from "./Icon-CIwTuFLd.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { i as r, t as i, y as a } from "./client-BUSsKK6G.js";
import { n as ee } from "./useApiBase-CV_r-Kk4.js";
import { t as te } from "./useAuthStore-DVJ7E4Ri.js";
import { t as ne } from "./useImageSrc-KnN1T9Ga.js";
import { i as o } from "./usePlayerStore-D8A_gb_c.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { n as s, t as ie } from "./ThumbRating-CAJtPr7h.js";
import { t as c } from "./Tooltip-D_txjC1i.js";
import { t as l } from "./Spinner-DFw4BJdj.js";
import { t as ae } from "./safeHref-C9H0Sqte.js";
import { t as u } from "./EmptyState-BAyOxAcK.js";
import { t as d } from "./Button-BuG0GvCa.js";
import { t as oe } from "./Combobox-BEPuTDWZ.js";
import { t as f } from "./Modal-eRq9Rw_4.js";
import { t as p } from "./Menu-Dm56tG4N.js";
import { t as m } from "./mediaTypeIcon-Bde251Qi.js";
import { Fragment as h, computed as g, createBlock as _, createCommentVNode as v, createElementBlock as y, createElementVNode as b, createTextVNode as x, createVNode as S, defineComponent as C, inject as w, normalizeClass as T, normalizeStyle as E, onMounted as D, openBlock as O, ref as k, renderList as A, renderSlot as j, toDisplayString as M, unref as N, vModelText as se, watch as P, withCtx as F, withDirectives as ce, withKeys as I, withModifiers as L } from "vue";
import { RouterLink as le, routerKey as R, useRouter as z } from "vue-router";
//#region src/composables/usePrefetch.ts
function B() {
	let e = w(R, null), t = /* @__PURE__ */ new WeakSet();
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
var V = "(max-width: 600px) 45vw, 200px";
function H(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function U(e) {
	return Number(e.toFixed(3)).toString();
}
function W(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${U(e.density)}x` : t;
}
function ue(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = W(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function de(e, t) {
	let n = ue(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : H(n) ? {
		srcset: n,
		sizes: V
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
function fe(e, t) {
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
var pe = { class: "playlist-picker" }, q = {
	key: 0,
	class: "playlist-picker__target"
}, J = {
	class: "playlist-picker__tabs",
	role: "tablist",
	"aria-label": "Playlist choice"
}, me = ["aria-selected"], Y = ["aria-selected"], X = {
	key: 1,
	class: "playlist-picker__panel"
}, Z = {
	key: 1,
	class: "playlist-picker__error",
	role: "alert"
}, he = {
	key: 2,
	class: "playlist-picker__panel"
}, ge = {
	key: 0,
	class: "playlist-picker__error",
	role: "alert"
}, _e = {
	key: 1,
	class: "playlist-picker__field"
}, ve = /*#__PURE__*/ e(/* @__PURE__ */ C({
	__name: "PlaylistPickerModal",
	props: {
		modelValue: { type: Boolean },
		item: {},
		client: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, ne = ee(), o = re(), s = te(), ie = z();
		function c(e) {
			return K(e.created_by, s.user?.id ?? null, s.isAdmin);
		}
		let ae = g(() => ie?.hasRoute("playlists") === !0);
		function p() {
			return n.client ? n.client : new i({ baseUrl: ne.value });
		}
		let m = k("existing"), h = k([]), C = k(!1), w = k(null), E = k(null), D = k(""), A = k(!1), j = g(() => typeof n.item?.library_id == "string" && n.item.library_id.trim() !== ""), L = g(() => h.value.map((e) => ({
			value: e.id,
			label: c(e) ? e.name : `${e.name} (shared — read-only)`,
			disabled: !c(e)
		}))), R = g(() => A.value || !n.item ? !1 : m.value === "existing" ? E.value !== null : j.value && D.value.trim() !== "");
		P(() => n.modelValue, (e) => {
			e && (m.value = "existing", E.value = null, D.value = "", B());
		}, { immediate: !0 });
		async function B() {
			C.value = !0, w.value = null;
			try {
				h.value = await p().getPlaylists(), E.value = h.value.find((e) => c(e))?.id ?? null;
			} catch (e) {
				w.value = a(e, "Failed to load playlists.");
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
					m.value === "existing" ? await U(e, E.value) : await W(e, D.value.trim());
				} finally {
					A.value = !1;
				}
			}
		}
		async function U(e, t) {
			if (!t) return;
			let n = h.value.find((e) => e.id === t);
			if (!(!n || !c(n))) try {
				await p().addToPlaylist(t, e.id), o.success(`Added to playlist “${n.name}”`), V();
			} catch (e) {
				o.error("Failed to add to playlist", { message: a(e) });
			}
		}
		async function W(e, t) {
			if (!j.value || t === "") return;
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
		return (t, n) => (O(), _(f, {
			"model-value": e.modelValue,
			title: "Add to playlist",
			size: "sm",
			"onUpdate:modelValue": n[5] ||= (e) => r("update:modelValue", e),
			onClose: V
		}, {
			footer: F(() => [
				ae.value ? (O(), _(N(le), {
					key: 0,
					class: "playlist-picker__manage",
					to: { name: "playlists" },
					"data-testid": "picker-manage-playlists",
					onClick: n[4] ||= (e) => V()
				}, {
					default: F(() => [...n[7] ||= [x(" Manage playlists → ", -1)]]),
					_: 1
				})) : v("", !0),
				S(d, {
					variant: "ghost",
					size: "sm",
					onClick: V
				}, {
					default: F(() => [...n[8] ||= [x("Cancel", -1)]]),
					_: 1
				}),
				S(d, {
					variant: "solid",
					size: "sm",
					disabled: !R.value,
					loading: A.value,
					onClick: H
				}, {
					default: F(() => [...n[9] ||= [x(" Add ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])
			]),
			default: F(() => [b("div", pe, [
				e.item ? (O(), y("p", q, M(e.item.name), 1)) : v("", !0),
				b("div", J, [b("button", {
					type: "button",
					role: "tab",
					class: T(["playlist-picker__tab", { "playlist-picker__tab--active": m.value === "existing" }]),
					"aria-selected": m.value === "existing",
					onClick: n[0] ||= (e) => m.value = "existing"
				}, " Existing playlist ", 10, me), b("button", {
					type: "button",
					role: "tab",
					class: T(["playlist-picker__tab", { "playlist-picker__tab--active": m.value === "new" }]),
					"aria-selected": m.value === "new",
					onClick: n[1] ||= (e) => m.value = "new"
				}, " New playlist ", 10, Y)]),
				m.value === "existing" ? (O(), y("div", X, [C.value ? (O(), _(l, {
					key: 0,
					label: "Loading playlists…"
				})) : w.value ? (O(), y("p", Z, M(w.value), 1)) : h.value.length === 0 ? (O(), _(u, {
					key: 2,
					icon: "list",
					title: "No playlists yet",
					description: "Switch to “New playlist” to create your first one."
				})) : (O(), _(oe, {
					key: 3,
					modelValue: E.value,
					"onUpdate:modelValue": n[2] ||= (e) => E.value = e,
					options: L.value,
					label: "Playlist",
					placeholder: "Select a playlist…"
				}, null, 8, ["modelValue", "options"]))])) : (O(), y("div", he, [j.value ? (O(), y("label", _e, [n[6] ||= b("span", { class: "playlist-picker__label" }, "Playlist name", -1), ce(b("input", {
					"onUpdate:modelValue": n[3] ||= (e) => D.value = e,
					type: "text",
					class: "playlist-picker__input",
					placeholder: "My playlist",
					autocomplete: "off",
					onKeyup: I(H, ["enter"])
				}, null, 544), [[se, D.value]])])) : (O(), y("p", ge, " This item has no owning library id, so a new playlist cannot be created for it. "))]))
			])]),
			_: 1
		}, 8, ["model-value"]));
	}
}), [["__scopeId", "data-v-e2d21b25"]]), ye = { class: "media-card__poster" }, be = [
	"href",
	"aria-label",
	"onClick"
], xe = { class: "visually-hidden" }, Se = ["href", "aria-label"], Ce = { class: "visually-hidden" }, we = [
	"src",
	"srcset",
	"sizes",
	"alt",
	"loading",
	"fetchpriority"
], Te = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Ee = { class: "media-card__badges" }, De = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Oe = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, ke = ["aria-valuenow", "aria-label"], Ae = { class: "media-card__overlay" }, je = { class: "media-card__title" }, Me = { class: "media-card__meta" }, Ne = {
	key: 0,
	class: "numeric"
}, Pe = {
	key: 1,
	class: "media-card__dot"
}, Fe = {
	key: 2,
	class: "media-card__cert"
}, Ie = {
	key: 3,
	class: "media-card__dot"
}, Le = {
	key: 4,
	class: "numeric"
}, Re = {
	key: 0,
	class: "media-card__genres"
}, ze = {
	key: 1,
	class: "media-card__actions"
}, Be = ["aria-label", "aria-pressed"], Ve = ["aria-label", "aria-pressed"], He = ["aria-expanded", "onClick"], Ue = {
	key: 0,
	class: "media-card__caption"
}, We = ["title"], Ge = { class: "media-card__caption-sub numeric" }, Ke = /*#__PURE__*/ e(/* @__PURE__ */ C({
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
		let { imgSrc: a, imgSrcset: ee } = ne(), l = e, u = i, d = o(), oe = te(), f = s(), C = w("phlixConfig", null), se = w(R, null), P = g(() => f.isFavorite(l.item.id)), ce = g(() => f.likeLevel(l.item.id)), I = g(() => oe.isAdmin), z = g(() => f.isWatched(l.item.id)), V = k(!1), H = k(!1), U = g(() => l.item.type === "series" || l.item.type === "season"), W = g(() => (I.value, V.value ? fe(l.item, {
			isAdmin: I.value,
			isWatched: z.value,
			isSeriesOrSeason: U.value,
			canChoosePoster: I.value
		}) : []));
		function ue(e) {
			let t = G, i = re();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					q();
					break;
				case t.addToPlaylist:
					H.value = !0;
					break;
				case t.download:
					i.info("Preparing download…"), r.getDownloadUrl(l.item.id).then(({ url: e }) => {
						let t = ae(e);
						if (!t) {
							i.error("Download blocked — unsafe link");
							return;
						}
						window.open(t, "_blank", "noopener"), i.success("Download started");
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
			f.setLike(l.item.id, e, C?.apiBase ?? "");
		}
		function pe() {
			f.toggleFavorite(l.item.id, C?.apiBase ?? ""), u("watchlist", l.item);
		}
		function q() {
			f.toggleWatched(l.item.id, C?.apiBase ?? ""), u("mark-watched", l.item);
		}
		let J = g(() => l.to ?? `/app/media/${l.item.id}`), { prefetch: me } = B();
		function Y() {
			me(J.value);
		}
		let X = k(!1), Z = k(!1), he = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, ge = g(() => !l.hideActions && (X.value || Z.value || he));
		function _e() {
			X.value = !0, Y();
		}
		function Ke() {
			X.value = !1;
		}
		function qe() {
			Z.value = !0, Y();
		}
		function Je(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			(!t || !n || !n.contains(t)) && (Z.value = !1);
		}
		let Q = k(!1), Ye = k(null);
		function Xe() {
			Q.value = !0;
		}
		D(() => {
			Ye.value?.complete && (Q.value = !0);
		});
		let Ze = g(() => de(l.posterSrcset ?? l.item.poster_srcset, l.posterSizes)), Qe = g(() => {
			let e = l.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= l.newWithinDays * 24 * 60 * 60 * 1e3;
		}), $ = g(() => {
			let e = d.resumePositionFor(l.item.id), t = l.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), $e = g(() => l.item.genres?.slice(0, 3) ?? []);
		return (n, i) => (O(), y("article", {
			class: "media-card",
			onPointerenter: _e,
			onPointerleave: Ke,
			onFocusin: qe,
			onFocusout: Je
		}, [
			b("div", ye, [
				N(se) ? (O(), _(N(le), {
					key: 0,
					to: J.value,
					custom: ""
				}, {
					default: F(({ navigate: t }) => [b("a", {
						href: J.value,
						class: "media-card__link",
						"aria-label": e.item.name,
						onClick: t
					}, [b("span", xe, M(e.item.name), 1)], 8, be)]),
					_: 1
				}, 8, ["to"])) : (O(), y("a", {
					key: 1,
					href: J.value,
					class: "media-card__link",
					"aria-label": e.item.name
				}, [b("span", Ce, M(e.item.name), 1)], 8, Se)),
				e.item.poster_url ? (O(), y("img", {
					key: 2,
					ref_key: "imgEl",
					ref: Ye,
					class: T(["media-card__img", { "is-loaded": Q.value }]),
					src: N(a)(e.item.poster_url),
					srcset: N(ee)(Ze.value.srcset),
					sizes: Ze.value.sizes,
					alt: e.item.name,
					loading: e.lazy ? "lazy" : void 0,
					decoding: "async",
					fetchpriority: e.fetchPriority,
					onLoad: Xe
				}, null, 42, we)) : (O(), y("div", Te, [S(t, { name: N(m)(e.item.type) }, null, 8, ["name"])])),
				b("div", Ee, [
					Qe.value ? (O(), y("span", De, "New")) : v("", !0),
					j(n.$slots, "badges", { item: e.item }, void 0, !0),
					e.quality ? (O(), y("span", Oe, M(e.quality), 1)) : v("", !0)
				]),
				$.value > 0 ? (O(), y("div", {
					key: 4,
					class: "media-card__progress",
					role: "progressbar",
					"aria-valuenow": Math.round($.value * 100),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-label": `Resume ${e.item.name}`
				}, [b("i", { style: E({ width: `${$.value * 100}%` }) }, null, 4)], 8, ke)) : v("", !0),
				b("div", Ae, [e.hideCaption ? v("", !0) : (O(), y(h, { key: 0 }, [
					b("h3", je, M(e.item.name), 1),
					b("div", Me, [
						e.item.year ? (O(), y("span", Ne, M(e.item.year), 1)) : v("", !0),
						e.item.year && (e.item.rating || e.item.runtime) ? (O(), y("span", Pe)) : v("", !0),
						e.item.rating ? (O(), y("span", Fe, M(e.item.rating), 1)) : v("", !0),
						e.item.rating && e.item.runtime ? (O(), y("span", Ie)) : v("", !0),
						e.item.runtime ? (O(), y("span", Le, M(e.item.runtime) + "m", 1)) : v("", !0)
					]),
					$e.value.length ? (O(), y("div", Re, [(O(!0), y(h, null, A($e.value, (e) => (O(), y("span", { key: e }, M(e), 1))), 128))])) : v("", !0)
				], 64)), ge.value ? (O(), y("div", ze, [S(c, { text: "Play" }, {
					default: F(() => [b("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: i[0] ||= L((t) => u("play", e.item), ["stop", "prevent"])
					}, [S(t, { name: "play" })])]),
					_: 1
				}), e.playOnly ? v("", !0) : (O(), y(h, { key: 0 }, [
					S(ie, {
						level: ce.value,
						onCycle: K,
						onClick: i[1] ||= L(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					S(c, { text: P.value ? "Remove from favorites" : "Add to favorites" }, {
						default: F(() => [b("button", {
							type: "button",
							class: T(["media-card__iconbtn", { "is-active": P.value }]),
							"aria-label": P.value ? "Remove from favorites" : "Add to favorites",
							"aria-pressed": P.value ? "true" : "false",
							onClick: L(pe, ["stop", "prevent"])
						}, [S(t, { name: P.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Be)]),
						_: 1
					}, 8, ["text"]),
					S(c, { text: z.value ? "Mark as unwatched" : "Mark as watched" }, {
						default: F(() => [b("button", {
							type: "button",
							class: T(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": z.value }]),
							"aria-label": z.value ? "Mark as unwatched" : "Mark as watched",
							"aria-pressed": z.value ? "true" : "false",
							onClick: L(q, ["stop", "prevent"])
						}, [S(t, { name: z.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Ve)]),
						_: 1
					}, 8, ["text"]),
					S(c, { text: "More info" }, {
						default: F(() => [b("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More info",
							onClick: i[2] ||= L((t) => u("info", e.item), ["stop", "prevent"])
						}, [S(t, { name: "info" })])]),
						_: 1
					}),
					S(p, {
						open: V.value,
						"onUpdate:open": i[3] ||= (e) => V.value = e,
						items: W.value,
						onSelect: ue
					}, {
						default: F(({ toggle: e }) => [S(c, { text: "More actions" }, {
							default: F(() => [b("button", {
								type: "button",
								class: "media-card__iconbtn",
								"aria-label": "More actions",
								"aria-expanded": V.value ? "true" : "false",
								"aria-haspopup": "menu",
								onClick: L(e, ["stop", "prevent"])
							}, [S(t, { name: "more" })], 8, He)]),
							_: 2
						}, 1024)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (O(), _(c, {
						key: 0,
						text: "Match metadata"
					}, {
						default: F(() => [b("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "Match metadata",
							onClick: i[4] ||= L((t) => u("match", e.item), ["stop", "prevent"])
						}, [S(t, { name: "search" })])]),
						_: 1
					})) : v("", !0),
					j(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : v("", !0)])
			]),
			e.hideCaption ? v("", !0) : (O(), y("div", Ue, [b("div", {
				class: "media-card__caption-title",
				title: e.item.name
			}, M(e.item.name), 9, We), b("div", Ge, [e.subtitle == null ? (O(), y(h, { key: 1 }, [
				e.item.year ? (O(), y(h, { key: 0 }, [x(M(e.item.year), 1)], 64)) : v("", !0),
				e.item.year && e.item.runtime ? (O(), y(h, { key: 1 }, [x(" · ")], 64)) : v("", !0),
				e.item.runtime ? (O(), y(h, { key: 2 }, [x(M(e.item.runtime) + "m", 1)], 64)) : v("", !0)
			], 64)) : (O(), y(h, { key: 0 }, [x(M(e.subtitle), 1)], 64))])])),
			H.value ? (O(), _(ve, {
				key: 1,
				"model-value": !0,
				item: e.item,
				client: N(r),
				"onUpdate:modelValue": i[5] ||= (e) => H.value = !1
			}, null, 8, ["item", "client"])) : v("", !0)
		], 32));
	}
}), [["__scopeId", "data-v-0af202e2"]]);
//#endregion
export { fe as a, G as i, ve as n, B as o, K as r, Ke as t };

//# sourceMappingURL=MediaCard-Cyyng_rh.js.map