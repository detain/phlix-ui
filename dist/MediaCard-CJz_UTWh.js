import { n as e, t } from "./Icon-55iG1rR7.js";
import { n, t as r } from "./ThumbRating-BHpXmeMX.js";
import { t as ee } from "./Menu-D1MRZDZu.js";
import { t as i } from "./Tooltip-CaS-pDMB.js";
import { i as a } from "./usePlayerStore-BpohCwDP.js";
import { t as te } from "./useMessages-skYe1O45.js";
import { n as ne } from "./useApiBase-DXTBY90j.js";
import { t as re } from "./useAuthStore-W5z8oEAk.js";
import { t as ie } from "./useToastStore-CxO_ppM8.js";
import { t as o } from "./mediaTypeIcon-CNNqtg-w.js";
import { t as ae } from "./Modal-C7Pv2vAR.js";
import { t as s } from "./Button-Dfl4y6vO.js";
import { t as oe } from "./Combobox-W8kuvnGW.js";
import { t as c } from "./Spinner-DnXYep7x.js";
import { t as l } from "./EmptyState-DjfWh3kt.js";
import { t as se, x as u } from "./client-BLNUsFSj.js";
import { a as ce } from "./plural-B3O2rVPV.js";
import { t as d } from "./safeHref-Be5nFpx7.js";
import { t as f } from "./useImageSrc-CSM61b-l.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as S, normalizeClass as C, normalizeStyle as w, onMounted as T, openBlock as E, ref as D, renderList as O, renderSlot as k, toDisplayString as A, unref as j, vModelText as M, watch as N, withCtx as P, withDirectives as F, withKeys as I, withModifiers as L } from "vue";
import { RouterLink as le, routerKey as R, useRouter as z } from "vue-router";
// src/composables/usePrefetch.ts
function B() {
	let e = S(R, null), t = /* @__PURE__ */ new WeakSet();
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
// src/components/media-poster.ts
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
function G(e) {
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
function ue(e, t) {
	let n = G(e);
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
// src/components/mediaItemMenu.ts
var K = {
	addToPlaylist: "Add to playlist",
	markWatched: "Mark watched",
	markUnwatched: "Mark unwatched",
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
	let n = K, r = [
		{ label: n.addToPlaylist },
		{ label: t.isWatched ? n.markUnwatched : n.markWatched },
		{ label: n.download }
	];
	return t.isSeriesOrSeason && r.push({ label: n.missingEpisodes }), r.push({ label: n.shuffle }), t.isAdmin && (r.push({ label: n.matchMetadata }), r.push({ label: n.editMetadata }), t.canChoosePoster && r.push({ label: n.editImages }), r.push({ label: n.exploreData }), e.canDelete && r.push({
		label: n.remove,
		danger: !0
	})), r;
}
// src/utils/playlistPermissions.ts
function q(e, t, n) {
	return n ? !0 : t === null || e === null ? !1 : e === t;
}
// src/components/PlaylistPickerModal.vue?vue&type=script&setup=true&lang.ts
var J = { class: "playlist-picker" }, fe = {
	key: 0,
	class: "playlist-picker__target"
}, pe = ["aria-checked", "tabindex"], me = ["aria-checked", "tabindex"], he = {
	key: 1,
	class: "playlist-picker__panel"
}, ge = {
	key: 1,
	class: "playlist-picker__error",
	role: "alert"
}, Y = {
	key: 2,
	class: "playlist-picker__panel"
}, X = {
	key: 0,
	class: "playlist-picker__error",
	role: "alert"
}, _e = {
	key: 1,
	class: "playlist-picker__field"
}, ve = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "PlaylistPickerModal",
	props: {
		modelValue: { type: Boolean },
		item: {},
		client: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, ee = ne(), i = ie(), a = re(), te = z();
		function o(e) {
			return q(e.created_by, a.user?.id ?? null, a.isAdmin);
		}
		let ce = m(() => te?.hasRoute("playlists") === !0);
		function d() {
			return n.client ? n.client : new se({ baseUrl: ee.value });
		}
		let f = D("existing"), p = D(null), x = D(null);
		function S(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), f.value = "existing", p.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), f.value = "new", x.value?.focus();
			}
		}
		let w = D([]), T = D(!1), O = D(null), k = D(null), L = D(""), R = D(!1), B = m(() => typeof n.item?.library_id == "string" && n.item.library_id.trim() !== ""), V = m(() => w.value.map((e) => ({
			value: e.id,
			label: o(e) ? e.name : `${e.name} (shared — read-only)`,
			disabled: !o(e)
		}))), H = m(() => R.value || !n.item ? !1 : f.value === "existing" ? k.value !== null : B.value && L.value.trim() !== "");
		N(() => n.modelValue, (e) => {
			e && (f.value = "existing", k.value = null, L.value = "", U());
		}, { immediate: !0 });
		async function U() {
			T.value = !0, O.value = null;
			try {
				w.value = await d().getPlaylists(), k.value = w.value.find((e) => o(e))?.id ?? null;
			} catch (e) {
				O.value = u(e, "Failed to load playlists.");
			} finally {
				T.value = !1;
			}
		}
		function W() {
			r("update:modelValue", !1);
		}
		async function G() {
			let e = n.item;
			if (e && !R.value) {
				R.value = !0;
				try {
					f.value === "existing" ? await ue(e, k.value) : await K(e, L.value.trim());
				} finally {
					R.value = !1;
				}
			}
		}
		async function ue(e, t) {
			if (!t) return;
			let n = w.value.find((e) => e.id === t);
			if (n && o(n)) try {
				await d().addToPlaylist(t, e.id), i.success(`Added to playlist “${n.name}”.`), W();
			} catch (e) {
				i.error("Failed to add to playlist.", { message: u(e) });
			}
		}
		async function K(e, t) {
			if (!B.value || t === "") return;
			let n = d(), r;
			try {
				r = await n.createPlaylist(t, e.library_id);
			} catch (e) {
				i.error("Failed to create playlist.", { message: u(e) });
				return;
			}
			try {
				await n.addToPlaylist(r.id, e.id), i.success(`Added to playlist “${r.name}”.`), W();
			} catch (e) {
				let t = u(e);
				i.error("Playlist created, but adding the item failed.", {
					message: t,
					duration: 1e4,
					action: {
						label: "Delete empty playlist",
						onClick: () => {
							n.deletePlaylist(r.id).then(() => i.success("Empty playlist deleted.")).catch((e) => i.error("Failed to delete the empty playlist.", { message: u(e) }));
						}
					}
				}), W();
			}
		}
		return (t, n) => (E(), h(ae, {
			"model-value": e.modelValue,
			title: "Add to playlist",
			size: "sm",
			"onUpdate:modelValue": n[5] ||= (e) => r("update:modelValue", e),
			onClose: W
		}, {
			footer: P(() => [
				ce.value ? (E(), h(j(le), {
					key: 0,
					class: "playlist-picker__manage",
					to: { name: "playlists" },
					"data-testid": "picker-manage-playlists",
					onClick: n[4] ||= (e) => W()
				}, {
					default: P(() => [...n[7] ||= [y(" Manage playlists → ", -1)]]),
					_: 1
				})) : g("", !0),
				b(s, {
					variant: "ghost",
					size: "sm",
					onClick: W
				}, {
					default: P(() => [...n[8] ||= [y("Cancel", -1)]]),
					_: 1
				}),
				b(s, {
					variant: "solid",
					size: "sm",
					disabled: !H.value,
					loading: R.value,
					onClick: G
				}, {
					default: P(() => [...n[9] ||= [y(" Add ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])
			]),
			default: P(() => [v("div", J, [
				e.item ? (E(), _("p", fe, A(e.item.name), 1)) : g("", !0),
				v("div", {
					class: "playlist-picker__tabs",
					role: "radiogroup",
					"aria-label": "Playlist choice",
					onKeydown: S
				}, [v("button", {
					ref_key: "existingOptionEl",
					ref: p,
					type: "button",
					role: "radio",
					class: C(["playlist-picker__tab", { "playlist-picker__tab--active": f.value === "existing" }]),
					"aria-checked": f.value === "existing",
					tabindex: f.value === "existing" ? 0 : -1,
					onClick: n[0] ||= (e) => f.value = "existing"
				}, " Existing playlist ", 10, pe), v("button", {
					ref_key: "newOptionEl",
					ref: x,
					type: "button",
					role: "radio",
					class: C(["playlist-picker__tab", { "playlist-picker__tab--active": f.value === "new" }]),
					"aria-checked": f.value === "new",
					tabindex: f.value === "new" ? 0 : -1,
					onClick: n[1] ||= (e) => f.value = "new"
				}, " New playlist ", 10, me)], 32),
				f.value === "existing" ? (E(), _("div", he, [T.value ? (E(), h(c, {
					key: 0,
					label: "Loading playlists…"
				})) : O.value ? (E(), _("p", ge, A(O.value), 1)) : w.value.length === 0 ? (E(), h(l, {
					key: 2,
					icon: "list",
					title: "No playlists yet",
					description: "Switch to “New playlist” to create your first one."
				})) : (E(), h(oe, {
					key: 3,
					modelValue: k.value,
					"onUpdate:modelValue": n[2] ||= (e) => k.value = e,
					options: V.value,
					label: "Playlist",
					placeholder: "Select a playlist…"
				}, null, 8, ["modelValue", "options"]))])) : (E(), _("div", Y, [B.value ? (E(), _("label", _e, [n[6] ||= v("span", { class: "playlist-picker__label" }, "Playlist name", -1), F(v("input", {
					"onUpdate:modelValue": n[3] ||= (e) => L.value = e,
					type: "text",
					class: "playlist-picker__input",
					placeholder: "My playlist",
					autocomplete: "off",
					onKeyup: I(G, ["enter"])
				}, null, 544), [[M, L.value]])])) : (E(), _("p", X, " This item has no owning library id, so a new playlist cannot be created for it. "))]))
			])]),
			_: 1
		}, 8, ["model-value"]));
	}
}), [["__scopeId", "data-v-f2106acc"]]), ye = { class: "media-card__poster" }, be = [
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
}, Be = ["aria-label"], Ve = ["aria-label", "aria-pressed"], He = ["aria-label", "aria-pressed"], Ue = ["aria-label"], We = [
	"aria-label",
	"aria-expanded",
	"onClick"
], Ge = ["aria-label"], Ke = {
	key: 0,
	class: "media-card__caption"
}, qe = ["title"], Je = { class: "media-card__caption-sub numeric" }, Z = /*#__PURE__*/ e(/* @__PURE__ */ x({
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
	setup(e, { emit: ae }) {
		let { imgSrc: s, imgSrcset: oe } = f(), c = e, l = ae, u = a(), x = re(), M = n(), N = ne(), F = null;
		function I() {
			return F ? F.setBaseUrl(N.value) : F = new se({ baseUrl: N.value }), F;
		}
		let z = S(R, null), { t: V } = te(), H = m(() => M.isFavorite(c.item.id)), U = m(() => M.likeLevel(c.item.id)), W = m(() => x.isAdmin), G = m(() => M.isWatched(c.item.id)), q = D(!1), J = D(!1), fe = m(() => c.item.type === "series" || c.item.type === "season"), pe = m(() => (W.value, q.value ? de(c.item, {
			isAdmin: W.value,
			isWatched: G.value,
			isSeriesOrSeason: fe.value,
			canChoosePoster: W.value
		}) : []));
		function me(e) {
			let t = K, n = ie();
			switch (e.label) {
				case t.markWatched:
				case t.markUnwatched:
					Y();
					break;
				case t.addToPlaylist:
					J.value = !0;
					break;
				case t.download:
					n.info("Preparing download…"), I().getDownloadUrl(c.item.id).then(({ url: e }) => {
						let t = d(e);
						t ? (window.open(t, "_blank", "noopener"), n.success("Download started.")) : n.error("Download blocked — unsafe link.");
					}).catch((e) => {
						n.error("Download failed.", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					n.info("Loading…"), I().getMissingEpisodes(c.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success("No missing episodes.") : n.warning(`${ce(t, "episode", "episodes")} missing.`);
					}).catch((e) => {
						n.error("Failed to load missing episodes.", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					I().shufflePlay(c.item.id).then((e) => {
						let t = Array.isArray(e?.shuffled_ids) ? e.shuffled_ids[0] : void 0;
						t ? z?.hasRoute("player") ? z.push({
							name: "player",
							params: { id: t }
						}).catch(() => {}) : n.success("Shuffle queued.") : n.info("Nothing to shuffle-play.");
					}).catch((e) => {
						n.error("Shuffle play failed.", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					l("edit-metadata", c.item);
					break;
				case t.exploreData:
					l("explore-data", c.item);
					break;
				case t.matchMetadata:
					l("refresh", c.item);
					break;
				case t.editImages:
					l("choose-poster", c.item);
					break;
				case t.remove:
					l("remove", c.item);
					break;
				default: n.info(`${e.label} isn’t available yet.`);
			}
		}
		function he(e) {
			M.setLike(c.item.id, e, N.value);
		}
		function ge() {
			M.toggleFavorite(c.item.id, N.value), l("watchlist", c.item);
		}
		function Y() {
			M.toggleWatched(c.item.id, N.value), l("mark-watched", c.item);
		}
		let X = m(() => c.to ?? `/app/media/${c.item.id}`), { prefetch: _e } = B();
		function Z() {
			_e(X.value);
		}
		let Q = D(!1), $ = D(!1), Ye = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, Xe = m(() => !c.hideActions && (Q.value || $.value || Ye));
		function Ze() {
			Q.value = !0, Z();
		}
		function Qe() {
			Q.value = !1;
		}
		function $e() {
			$.value = !0, Z();
		}
		function et(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			t && n && n.contains(t) || ($.value = !1);
		}
		let tt = D(!1), nt = D(null);
		function rt() {
			tt.value = !0;
		}
		T(() => {
			nt.value?.complete && (tt.value = !0);
		});
		let it = m(() => ue(c.posterSrcset ?? c.item.poster_srcset, c.posterSizes)), at = m(() => {
			let e = c.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= c.newWithinDays * 24 * 60 * 60 * 1e3;
		}), ot = m(() => {
			let e = u.resumePositionFor(c.item.id), t = c.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), st = m(() => c.item.genres?.slice(0, 3) ?? []);
		return (n, a) => (E(), _("article", {
			class: "media-card",
			onPointerenter: Ze,
			onPointerleave: Qe,
			onFocusin: $e,
			onFocusout: et
		}, [
			v("div", ye, [
				j(z) ? (E(), h(j(le), {
					key: 0,
					to: X.value,
					custom: ""
				}, {
					default: P(({ navigate: t }) => [v("a", {
						href: X.value,
						class: "media-card__link",
						"aria-label": e.item.name,
						onClick: t
					}, [v("span", xe, A(e.item.name), 1)], 8, be)]),
					_: 1
				}, 8, ["to"])) : (E(), _("a", {
					key: 1,
					href: X.value,
					class: "media-card__link",
					"aria-label": e.item.name
				}, [v("span", Ce, A(e.item.name), 1)], 8, Se)),
				e.item.poster_url ? (E(), _("img", {
					key: 2,
					ref_key: "imgEl",
					ref: nt,
					class: C(["media-card__img", { "is-loaded": tt.value }]),
					src: j(s)(e.item.poster_url),
					srcset: j(oe)(it.value.srcset),
					sizes: it.value.sizes,
					alt: e.item.name,
					loading: e.lazy ? "lazy" : void 0,
					decoding: "async",
					fetchpriority: e.fetchPriority,
					onLoad: rt
				}, null, 42, we)) : (E(), _("div", Te, [b(t, { name: j(o)(e.item.type) }, null, 8, ["name"])])),
				v("div", Ee, [
					at.value ? (E(), _("span", De, "New")) : g("", !0),
					k(n.$slots, "badges", { item: e.item }, void 0, !0),
					e.quality ? (E(), _("span", Oe, A(e.quality), 1)) : g("", !0)
				]),
				ot.value > 0 ? (E(), _("div", {
					key: 4,
					class: "media-card__progress",
					role: "progressbar",
					"aria-valuenow": Math.round(ot.value * 100),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-label": j(V)("itemActions.resumeProgress", { name: e.item.name })
				}, [v("i", { style: w({ width: `${ot.value * 100}%` }) }, null, 4)], 8, ke)) : g("", !0),
				v("div", Ae, [e.hideCaption ? g("", !0) : (E(), _(p, { key: 0 }, [
					v("h3", je, A(e.item.name), 1),
					v("div", Me, [
						e.item.year ? (E(), _("span", Ne, A(e.item.year), 1)) : g("", !0),
						e.item.year && (e.item.rating || e.item.runtime) ? (E(), _("span", Pe)) : g("", !0),
						e.item.rating ? (E(), _("span", Fe, A(e.item.rating), 1)) : g("", !0),
						e.item.rating && e.item.runtime ? (E(), _("span", Ie)) : g("", !0),
						e.item.runtime ? (E(), _("span", Le, A(e.item.runtime) + "m", 1)) : g("", !0)
					]),
					st.value.length ? (E(), _("div", Re, [(E(!0), _(p, null, O(st.value, (e) => (E(), _("span", { key: e }, A(e), 1))), 128))])) : g("", !0)
				], 64)), Xe.value ? (E(), _("div", ze, [b(i, { text: j(V)("player.play") }, {
					default: P(() => [v("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": j(V)("player.play"),
						onClick: a[0] ||= L((t) => l("play", e.item), ["stop", "prevent"])
					}, [b(t, { name: "play" })], 8, Be)]),
					_: 1
				}, 8, ["text"]), e.playOnly ? g("", !0) : (E(), _(p, { key: 0 }, [
					b(r, {
						level: U.value,
						onCycle: he,
						onClick: a[1] ||= L(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					b(i, { text: H.value ? j(V)("itemActions.removeFavorite") : j(V)("itemActions.addFavorite") }, {
						default: P(() => [v("button", {
							type: "button",
							class: C(["media-card__iconbtn", { "is-active": H.value }]),
							"aria-label": H.value ? j(V)("itemActions.removeFavorite") : j(V)("itemActions.addFavorite"),
							"aria-pressed": H.value ? "true" : "false",
							onClick: L(ge, ["stop", "prevent"])
						}, [b(t, { name: H.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Ve)]),
						_: 1
					}, 8, ["text"]),
					b(i, { text: G.value ? j(V)("itemActions.markUnwatchedAria") : j(V)("itemActions.markWatchedAria") }, {
						default: P(() => [v("button", {
							type: "button",
							class: C(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": G.value }]),
							"aria-label": G.value ? j(V)("itemActions.markUnwatchedAria") : j(V)("itemActions.markWatchedAria"),
							"aria-pressed": G.value ? "true" : "false",
							onClick: L(Y, ["stop", "prevent"])
						}, [b(t, { name: G.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, He)]),
						_: 1
					}, 8, ["text"]),
					b(i, { text: j(V)("itemActions.moreInfo") }, {
						default: P(() => [v("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": j(V)("itemActions.moreInfo"),
							onClick: a[2] ||= L((t) => l("info", e.item), ["stop", "prevent"])
						}, [b(t, { name: "info" })], 8, Ue)]),
						_: 1
					}, 8, ["text"]),
					b(ee, {
						open: q.value,
						"onUpdate:open": a[3] ||= (e) => q.value = e,
						items: pe.value,
						onSelect: me
					}, {
						default: P(({ toggle: e }) => [b(i, { text: j(V)("itemActions.moreActions") }, {
							default: P(() => [v("button", {
								type: "button",
								class: "media-card__iconbtn",
								"aria-label": j(V)("itemActions.moreActions"),
								"aria-expanded": q.value ? "true" : "false",
								"aria-haspopup": "menu",
								onClick: L(e, ["stop", "prevent"])
							}, [b(t, { name: "more" })], 8, We)]),
							_: 2
						}, 1032, ["text"])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (E(), h(i, {
						key: 0,
						text: j(V)("itemActions.matchMetadata")
					}, {
						default: P(() => [v("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": j(V)("itemActions.matchMetadata"),
							onClick: a[4] ||= L((t) => l("match", e.item), ["stop", "prevent"])
						}, [b(t, { name: "search" })], 8, Ge)]),
						_: 1
					}, 8, ["text"])) : g("", !0),
					k(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : g("", !0)])
			]),
			e.hideCaption ? g("", !0) : (E(), _("div", Ke, [v("div", {
				class: "media-card__caption-title",
				title: e.item.name
			}, A(e.item.name), 9, qe), v("div", Je, [e.subtitle == null ? (E(), _(p, { key: 1 }, [
				e.item.year ? (E(), _(p, { key: 0 }, [y(A(e.item.year), 1)], 64)) : g("", !0),
				e.item.year && e.item.runtime ? (E(), _(p, { key: 1 }, [y(" · ")], 64)) : g("", !0),
				e.item.runtime ? (E(), _(p, { key: 2 }, [y(A(e.item.runtime) + "m", 1)], 64)) : g("", !0)
			], 64)) : (E(), _(p, { key: 0 }, [y(A(e.subtitle), 1)], 64))])])),
			J.value ? (E(), h(ve, {
				key: 1,
				"model-value": !0,
				item: e.item,
				"onUpdate:modelValue": a[5] ||= (e) => J.value = !1
			}, null, 8, ["item"])) : g("", !0)
		], 32));
	}
}), [["__scopeId", "data-v-37c9f217"]]);
export { de as a, K as i, ve as n, B as o, q as r, Z as t };

//# sourceMappingURL=MediaCard-CJz_UTWh.js.map